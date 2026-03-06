/**
 * DUFFEL SERVICE
 * Remplace complètement amadeus.service.ts
 * Doc : https://duffel.com/docs/api
 */

const DUFFEL_BASE = 'https://api.duffel.com';
const DUFFEL_VERSION = 'v2';

function getHeaders() {
  const key = process.env.DUFFEL_API_KEY;
  if (!key) throw new Error('DUFFEL_API_KEY manquant dans .env');
  return {
    Authorization: `Bearer ${key}`,
    'Duffel-Version': DUFFEL_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function duffelFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${DUFFEL_BASE}${path}`, {
    ...options,
    headers: { ...getHeaders(), ...(options?.headers || {}) },
  });
  const json = await res.json();
  if (!res.ok) {
    const errMsg = json?.errors?.[0]?.message || json?.error || `Duffel API error ${res.status}`;
    throw new Error(errMsg);
  }
  return json;
}

class DuffelService {
  // ─── LIEUX ──────────────────────────────────────────────────────────────────
  async searchLocations(query: string) {
    const data = await duffelFetch(
      `/places/suggestions?query=${encodeURIComponent(query)}`
    );
    return { success: true, data: data.data };
  }

  // ─── RECHERCHE DE VOLS ──────────────────────────────────────────────────────
  /**
   * Crée une offer_request et retourne les offres directement.
   * slices : 1 slice = aller simple, 2 slices = aller-retour
   */
  async searchFlights(params: {
    slices: Array<{ origin: string; destination: string; departure_date: string }>;
    passengers: Array<{ type: 'adult' | 'child' | 'infant_without_seat' }>;
    cabin_class?: 'economy' | 'premium_economy' | 'business' | 'first';
    max_connections?: number;
  }) {
    // 1. Créer l'offer_request
    const offerReqBody = {
      data: {
        slices: params.slices,
        passengers: params.passengers,
        cabin_class: params.cabin_class || 'economy',
        return_offers: false,
      },
    };
    const offerReqRes = await duffelFetch('/air/offer_requests', {
      method: 'POST',
      body: JSON.stringify(offerReqBody),
    });
    const offerRequestId: string = offerReqRes.data.id;

    // 2. Récupérer les offres
    const offersUrl = new URL(`${DUFFEL_BASE}/air/offers`);
    offersUrl.searchParams.set('offer_request_id', offerRequestId);
    offersUrl.searchParams.set('sort', 'total_amount');
    if (params.max_connections !== undefined) {
      offersUrl.searchParams.set('max_connections', String(params.max_connections));
    }
    // Inclure les services disponibles (bagages, sièges…)
    offersUrl.searchParams.set('expand[]', 'passengers');

    const offersRes = await duffelFetch(
      offersUrl.pathname + offersUrl.search
    );

    return {
      success: true,
      data: offersRes.data,
      meta: offersRes.meta,
      offerRequestId,
    };
  }

  // ─── DÉTAIL D'UNE OFFRE ──────────────────────────────────────────────────────
  // ─── DÉTAIL D'UNE OFFRE ──────────────────────────────────────────────────────
  /**
   * Récupère l'offre complète et à jour.
   * returnAvailableServices=true → inclut les bagages/extras disponibles.
   * ⚠️  available_services n'est JAMAIS dans la liste de recherche, seulement ici.
   */
  async getOffer(offerId: string, returnAvailableServices = false) {
    const qs = returnAvailableServices ? '?return_available_services=true' : '';
    const data = await duffelFetch(`/air/offers/${offerId}${qs}`);
    return { success: true, data: data.data };
  }

  // ─── SEAT MAPS ───────────────────────────────────────────────────────────────
  async getSeatMaps(offerId: string) {
    const data = await duffelFetch(`/air/seat_maps?offer_id=${offerId}`);
    return { success: true, data: data.data };
  }

  // ─── CRÉER UNE COMMANDE (BOOKING) ────────────────────────────────────────────
  /**
   * Crée et paie la commande en une seule étape (mode test : balance Duffel).
   *
   * ⚠️  Duffel v2 : le numéro de document s'appelle `unique_identifier` (pas `number`).
   *      On sanitize ici pour accepter les deux noms et supprimer les docs incomplets.
   */
  async createOrder(params: {
    selectedOfferId: string;
    passengers: Array<{
      id: string;
      title: string;
      gender: string;
      given_name: string;
      family_name: string;
      born_on: string;
      email: string;
      phone_number: string;
      identity_documents?: Array<{
        type: string;
        unique_identifier?: string; // nom officiel Duffel v2
        number?: string;            // alias accepté ici, converti ci-dessous
        issuing_country_code: string;
        expires_on?: string;
      }>;
    }>;
    services?: Array<{ id: string; quantity: number }>;
    amount: string;
    currency: string;
    metadata?: Record<string, string>;
  }) {

    // ── Nettoyage des passagers avant envoi à Duffel ──────────────────────────
    const cleanPassengers = params.passengers.map(p => {
      // Convertir number → unique_identifier et filtrer les docs vides
      const validDocs = (p.identity_documents ?? [])
        .map(doc => ({
          type: doc.type,
          unique_identifier: doc.unique_identifier || doc.number || '',
          issuing_country_code: doc.issuing_country_code || '',
          ...(doc.expires_on ? { expires_on: doc.expires_on } : {}),
        }))
        .filter(doc =>
          doc.unique_identifier.trim() !== '' &&
          doc.issuing_country_code.trim() !== ''
        );

      const pax: Record<string, any> = {
        id:           p.id,
        title:        p.title,
        gender:       p.gender,
        given_name:   p.given_name.trim(),
        family_name:  p.family_name.trim(),
        born_on:      p.born_on,
        email:        p.email?.trim() || undefined,
        phone_number: p.phone_number?.trim() || undefined,
      };

      // N'inclure identity_documents que s'il y en a au moins un valide
      if (validDocs.length > 0) {
        pax.identity_documents = validDocs;
      }

      // Retirer les clés undefined pour ne pas polluer le payload
      return Object.fromEntries(
        Object.entries(pax).filter(([, v]) => v !== undefined && v !== '')
      );
    });

    const body = {
      data: {
        type: 'instant',
        selected_offers: [params.selectedOfferId],
        passengers: cleanPassengers,
        services: (params.services ?? []).filter(s => s.id),
        payments: [
          {
            type: 'balance',
            amount: params.amount,
            currency: params.currency,
          },
        ],
        metadata: params.metadata || {},
      },
    };

    console.log('📦 Duffel createOrder payload:', JSON.stringify(body, null, 2));

    const data = await duffelFetch('/air/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return { success: true, data: data.data };
  }

  // ─── RÉCUPÉRER UNE COMMANDE ──────────────────────────────────────────────────
  async getOrder(orderId: string) {
    const data = await duffelFetch(`/air/orders/${orderId}`);
    return { success: true, data: data.data };
  }

  // ─── ANNULER UNE COMMANDE ────────────────────────────────────────────────────
  async cancelOrder(orderId: string) {
    // Créer un order_cancellation
    const cancellation = await duffelFetch('/air/order_cancellations', {
      method: 'POST',
      body: JSON.stringify({ data: { order_id: orderId } }),
    });
    // Confirmer l'annulation
    const confirmed = await duffelFetch(
      `/air/order_cancellations/${cancellation.data.id}/actions/confirm`,
      { method: 'POST' }
    );
    return { success: true, data: confirmed.data };
  }
}

export default new DuffelService();