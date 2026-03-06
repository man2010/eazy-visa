/**
 * GET /api/flights/locations?query=paris
 * Autocomplétion villes ET aéroports via Duffel Places API
 * 
 * Duffel retourne des objets de type "airport" ou "city"
 * Pour les villes, on développe les aéroports qu'elles contiennent
 * → l'utilisateur peut taper "Dakar", "Paris", "New York" etc.
 */

import { NextRequest, NextResponse } from 'next/server';

const DUFFEL_BASE = 'https://api.duffel.com';

function getHeaders() {
  const key = process.env.DUFFEL_API_KEY;
  if (!key) throw new Error('DUFFEL_API_KEY manquant dans .env');
  return {
    Authorization: `Bearer ${key}`,
    'Duffel-Version': 'v2',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('query') ?? '';
    if (query.trim().length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    const res = await fetch(
      `${DUFFEL_BASE}/places/suggestions?query=${encodeURIComponent(query)}`,
      { headers: getHeaders() }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.errors?.[0]?.message || `Duffel error ${res.status}`);
    }

    const json = await res.json();
    const raw: any[] = json.data ?? [];

    /**
     * Normalise un item Duffel en objet uniforme pour le front
     * { iata_code, name, city_name, country_code, type, label }
     */
    const normalise = (item: any, overrideCity?: string): {
      iata_code: string;
      name: string;
      city_name: string;
      country_code: string;
      type: string;
      label: string;
    } | null => {
      const iata = item.iata_code ?? item.iataCode;
      if (!iata) return null; // Sans code IATA on ne peut pas réserver

      const name = item.name ?? '';
      const city =
        overrideCity ??
        item.city_name ??
        item.city?.name ??
        item.address?.cityName ??
        name;
      const country =
        item.iata_country_code ??
        item.countryCode ??
        item.address?.countryCode ??
        '';
      const type = item.type ?? 'airport';

      return {
        iata_code: iata,
        name,
        city_name: city,
        country_code: country,
        type,
        label: `${iata} — ${name}, ${city}`,
      };
    };

    const results: ReturnType<typeof normalise>[] = [];

    for (const item of raw) {
      if (item.type === 'airport') {
        // Résultat direct : aéroport
        const n = normalise(item);
        if (n) results.push(n);
      } else if (item.type === 'city') {
        // Ville : on ajoute d'abord la ville elle-même (code IATA de la ville)
        // puis ses aéroports individuels
        const cityName = item.name ?? item.city_name ?? '';
        const cityNorm = normalise(item, cityName);
        if (cityNorm) results.push({ ...cityNorm, type: 'city' });

        // Développer les aéroports de la ville
        const airports: any[] = item.airports ?? [];
        for (const apt of airports) {
          const n = normalise(apt, cityName);
          if (n) results.push(n);
        }
      }
    }

    // Dédoublonner par iata_code, limiter à 10
    const seen = new Set<string>();
    const deduped = results.filter(r => {
      if (!r || seen.has(r.iata_code)) return false;
      seen.add(r.iata_code);
      return true;
    });

    return NextResponse.json({ success: true, data: deduped.slice(0, 10) });
  } catch (error: any) {
    console.error('❌ Erreur locations Duffel:', error.message);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur recherche lieux' },
      { status: 500 }
    );
  }
}