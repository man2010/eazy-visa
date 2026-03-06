/**
 * GET /api/bookings/[id]/ticket
 *
 * Génère un billet électronique HTML complet à partir des données Duffel.
 * Le client l'ouvre dans un nouvel onglet → impression → "Enregistrer en PDF".
 *
 * Pourquoi HTML et pas PDF directement ?
 *  - Duffel ne fournit aucun PDF ni URL de document téléchargeable en test mode.
 *  - Générer un PDF serveur (puppeteer, etc.) requiert des dépendances lourdes.
 *  - Un HTML print-optimisé produit un PDF parfait via window.print().
 */

import { NextRequest, NextResponse } from 'next/server';

const DUFFEL_BASE = 'https://api.duffel.com';

function getHeaders() {
  const key = process.env.DUFFEL_API_KEY;
  if (!key) throw new Error('DUFFEL_API_KEY manquant');
  return {
    Authorization: `Bearer ${key}`,
    'Duffel-Version': 'v2',
    Accept: 'application/json',
  };
}

function fmt(dt: string | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('fr-FR', opts ?? { dateStyle: 'long', timeStyle: 'short' });
}

function fmtTime(dt: string | undefined): string {
  if (!dt) return '—';
  return dt.split('T')[1]?.slice(0, 5) ?? '—';
}

function fmtPrice(amount: string | number, currency: string): string {
  return `${parseFloat(String(amount)).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ${currency}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch de la commande depuis Duffel
    const res = await fetch(`${DUFFEL_BASE}/air/orders/${id}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      return new NextResponse('Commande introuvable', { status: 404 });
    }
    const json = await res.json();
    const order = json.data;

    // ── Extraire les données utiles ──────────────────────────────────────────
    const bookingRef: string = order.booking_reference ?? '—';
    const orderId: string = order.id;
    const createdAt: string = order.created_at;
    const totalAmount: string = order.total_amount;
    const totalCurrency: string = order.total_currency;
    const owner = order.owner ?? {};
    const passengers: any[] = order.passengers ?? [];
    const slices: any[] = order.slices ?? [];
    const documents: any[] = order.documents ?? [];
    const conditions = order.conditions ?? {};

    // ── Générer les lignes passagers ─────────────────────────────────────────
    const passengersHTML = passengers.map((p: any) => `
      <tr>
        <td>${p.title?.toUpperCase() ?? ''} ${p.given_name} ${p.family_name}</td>
        <td>${p.type === 'adult' ? 'Adulte' : p.type === 'child' ? 'Enfant' : 'Bébé'}</td>
        <td>${p.born_on ? new Date(p.born_on).toLocaleDateString('fr-FR') : '—'}</td>
        <td>${documents.find((d: any) => d.passenger_ids?.includes(p.id))?.unique_identifier ?? '—'}</td>
      </tr>
    `).join('');

    // ── Générer les segments par slice ────────────────────────────────────────
    const slicesHTML = slices.map((slice: any, si: number) => {
      const label = slices.length > 1 ? `<h3 class="slice-label">${si === 0 ? '✈ Aller' : '↩ Retour'}</h3>` : '';
      const segments = (slice.segments ?? []).map((seg: any) => `
        <div class="segment">
          <div class="seg-header">
            ${seg.marketing_carrier?.logo_symbol_url
              ? `<img src="${seg.marketing_carrier.logo_symbol_url}" class="airline-logo" alt="${seg.marketing_carrier?.name ?? ''}" />`
              : ''}
            <span class="carrier">${seg.marketing_carrier?.name ?? seg.marketing_carrier?.iata_code ?? ''}</span>
            <span class="flight-number">Vol ${seg.marketing_carrier?.iata_code ?? ''}${seg.marketing_carrier_flight_number ?? ''}</span>
            ${seg.aircraft ? `<span class="aircraft">${seg.aircraft.name}</span>` : ''}
          </div>
          <div class="seg-route">
            <div class="seg-city">
              <p class="city-code">${seg.origin?.iata_code ?? '—'}</p>
              <p class="city-name">${seg.origin?.city_name ?? ''}</p>
              <p class="city-country">${seg.origin?.country_name ?? ''}</p>
              <p class="time">${fmtTime(seg.departing_at)}</p>
              <p class="date">${fmt(seg.departing_at, { dateStyle: 'medium' })}</p>
              ${seg.origin?.terminal ? `<p class="terminal">Terminal ${seg.origin.terminal}</p>` : ''}
            </div>
            <div class="seg-arrow">
              <div class="arrow-line"></div>
              <p class="duration">${(seg.duration ?? '').replace('PT','').replace('H','h ').replace('M','min').trim()}</p>
            </div>
            <div class="seg-city right">
              <p class="city-code">${seg.destination?.iata_code ?? '—'}</p>
              <p class="city-name">${seg.destination?.city_name ?? ''}</p>
              <p class="city-country">${seg.destination?.country_name ?? ''}</p>
              <p class="time">${fmtTime(seg.arriving_at)}</p>
              <p class="date">${fmt(seg.arriving_at, { dateStyle: 'medium' })}</p>
              ${seg.destination?.terminal ? `<p class="terminal">Terminal ${seg.destination.terminal}</p>` : ''}
            </div>
          </div>
        </div>
      `).join('');
      return `${label}${segments}`;
    }).join('<hr class="slice-divider" />');

    // ── Conditions ────────────────────────────────────────────────────────────
    const changeAllowed = conditions.change_before_departure?.allowed;
    const refundAllowed = conditions.refund_before_departure?.allowed;

    // ── HTML complet ──────────────────────────────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Billet électronique — ${bookingRef}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #f4f6f8;
      color: #1a1a1a;
      font-size: 13px;
    }
    .page {
      max-width: 780px;
      margin: 24px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.10);
    }

    /* ── HEADER ── */
    .header {
      background: linear-gradient(135deg, #A11C1C 0%, #c0392b 100%);
      color: white;
      padding: 28px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-left h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header-left p { font-size: 12px; opacity: 0.8; margin-top: 2px; }
    .booking-ref-box {
      background: rgba(255,255,255,0.18);
      border: 1.5px solid rgba(255,255,255,0.4);
      border-radius: 10px;
      padding: 12px 20px;
      text-align: center;
    }
    .booking-ref-box .label { font-size: 10px; opacity: 0.75; text-transform: uppercase; letter-spacing: 1px; }
    .booking-ref-box .ref { font-size: 26px; font-weight: 900; font-family: monospace; letter-spacing: 4px; margin-top: 2px; }

    /* ── STATUS BADGE ── */
    .status-bar {
      background: #f0fdf4;
      border-bottom: 1px solid #bbf7d0;
      padding: 10px 32px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #16a34a;
      font-weight: 600;
      font-size: 12px;
    }
    .status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; flex-shrink: 0; }

    /* ── SECTIONS ── */
    .section { padding: 24px 32px; border-bottom: 1px solid #f0f0f0; }
    .section:last-child { border-bottom: none; }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #A11C1C;
      margin-bottom: 16px;
    }

    /* ── SLICE LABEL ── */
    .slice-label {
      font-size: 13px;
      font-weight: 700;
      color: #555;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px dashed #e5e7eb;
    }
    .slice-divider { border: none; border-top: 2px dashed #e5e7eb; margin: 20px 0; }

    /* ── SEGMENT ── */
    .segment { margin-bottom: 16px; }
    .seg-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .airline-logo { width: 28px; height: 28px; object-fit: contain; }
    .carrier { font-weight: 700; font-size: 14px; }
    .flight-number {
      background: #f3f4f6;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 12px;
      font-weight: 600;
      color: #374151;
    }
    .aircraft { color: #9ca3af; font-size: 11px; }

    .seg-route {
      display: grid;
      grid-template-columns: 1fr 80px 1fr;
      align-items: center;
      gap: 8px;
    }
    .seg-city { }
    .seg-city.right { text-align: right; }
    .city-code { font-size: 30px; font-weight: 900; color: #1a1a1a; line-height: 1; }
    .city-name { font-size: 13px; font-weight: 600; color: #374151; margin-top: 2px; }
    .city-country { font-size: 11px; color: #9ca3af; }
    .time { font-size: 20px; font-weight: 800; color: #A11C1C; margin-top: 8px; }
    .date { font-size: 11px; color: #6b7280; margin-top: 1px; }
    .terminal {
      display: inline-block;
      background: #fef3c7;
      color: #92400e;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 600;
      margin-top: 4px;
    }
    .seg-arrow { text-align: center; }
    .arrow-line {
      height: 2px;
      background: linear-gradient(90deg, #A11C1C, #ef4444);
      border-radius: 2px;
      position: relative;
      margin-bottom: 4px;
    }
    .arrow-line::after {
      content: '✈';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 0 4px;
      color: #A11C1C;
      font-size: 14px;
    }
    .duration { font-size: 10px; color: #6b7280; font-weight: 500; }

    /* ── PASSAGERS ── */
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #6b7280;
      padding: 8px 10px;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 13px;
    }
    tr:last-child td { border-bottom: none; }
    td:last-child { font-family: monospace; font-weight: 700; color: #1a1a1a; }

    /* ── RÉSUMÉ PRIX ── */
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .price-row:last-child { border-bottom: none; }
    .price-label { color: #6b7280; }
    .price-value { font-weight: 700; }
    .price-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0 0;
    }
    .price-total .label { font-size: 15px; font-weight: 700; }
    .price-total .value { font-size: 22px; font-weight: 900; color: #A11C1C; }

    /* ── CONDITIONS ── */
    .conditions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .condition-item {
      background: #f9fafb;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .condition-icon { font-size: 16px; flex-shrink: 0; }
    .condition-label { font-size: 11px; color: #6b7280; }
    .condition-value { font-weight: 600; font-size: 12px; margin-top: 2px; }
    .ok { color: #16a34a; }
    .nok { color: #dc2626; }

    /* ── FOOTER ── */
    .footer {
      background: #f9fafb;
      padding: 16px 32px;
      text-align: center;
      font-size: 10px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
    }
    .footer strong { color: #6b7280; }

    /* ── QR CODE zone (décoratif en test) ── */
    .qr-zone {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #f9fafb;
      border-radius: 10px;
      padding: 16px;
      margin-top: 16px;
    }
    .qr-placeholder {
      width: 72px;
      height: 72px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }
    .qr-info p { font-size: 11px; color: #6b7280; }
    .qr-info strong { display: block; font-size: 15px; font-family: monospace; letter-spacing: 2px; color: #1a1a1a; margin-bottom: 2px; }

    /* ── PRINT ── */
    @media print {
      body { background: white; }
      .page { margin: 0; border-radius: 0; box-shadow: none; }
      .no-print { display: none !important; }
      @page { margin: 10mm; }
    }
  </style>
</head>
<body>
  <!-- Bouton impression (masqué à l'impression) -->
  <div class="no-print" style="max-width:780px;margin:16px auto 0;padding:0 16px;display:flex;justify-content:flex-end;gap:10px;">
    <button onclick="window.print()" style="background:#A11C1C;color:white;border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">
      ⬇ Télécharger / Imprimer
    </button>
    <button onclick="window.close()" style="background:#f3f4f6;color:#374151;border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">
      ✕ Fermer
    </button>
  </div>

  <div class="page">

    <!-- HEADER -->
    <div class="header">
      <div class="header-left">
        <h1>Billet Électronique</h1>
        <p>Eazy-Visa · ${owner?.name ?? 'Vol confirmé'} · Émis le ${fmt(createdAt, { dateStyle: 'medium' })}</p>
      </div>
      <div class="booking-ref-box">
        <p class="label">Référence PNR</p>
        <p class="ref">${bookingRef}</p>
      </div>
    </div>

    <!-- STATUS -->
    <div class="status-bar">
      <div class="status-dot"></div>
      Réservation confirmée · Paiement reçu · Billet émis
    </div>

    <!-- ITINÉRAIRE -->
    <div class="section">
      <p class="section-title">✈ Itinéraire</p>
      ${slicesHTML}
    </div>

    <!-- PASSAGERS + NUMÉROS BILLET -->
    <div class="section">
      <p class="section-title">👤 Passagers & Numéros de billet</p>
      <table>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Type</th>
            <th>Date de naissance</th>
            <th>N° e-Ticket</th>
          </tr>
        </thead>
        <tbody>
          ${passengersHTML}
        </tbody>
      </table>
    </div>

    <!-- QR + BOARDING INFO -->
    <div class="section">
      <p class="section-title">📱 Check-in & Embarquement</p>
      <div class="qr-zone">
        <div class="qr-placeholder">📲</div>
        <div class="qr-info">
          <strong>${bookingRef}</strong>
          <p>Utilisez cette référence pour vous enregistrer en ligne sur le site de la compagnie</p>
          <p style="margin-top:6px;">Le check-in en ligne est généralement disponible <strong>24 à 48h</strong> avant le départ.</p>
          <p style="margin-top:4px;">Présentez ce billet <strong>imprimé ou sur votre mobile</strong> à l'aéroport.</p>
        </div>
      </div>
    </div>

    <!-- CONDITIONS TARIFAIRES -->
    <div class="section">
      <p class="section-title">📋 Conditions tarifaires</p>
      <div class="conditions-grid">
        <div class="condition-item">
          <span class="condition-icon">${changeAllowed ? '✅' : '❌'}</span>
          <div>
            <p class="condition-label">Modification avant départ</p>
            <p class="condition-value ${changeAllowed ? 'ok' : 'nok'}">
              ${changeAllowed ? 'Autorisée' : 'Non autorisée'}
              ${conditions.change_before_departure?.penalty_amount
                ? ` · Frais : ${fmtPrice(conditions.change_before_departure.penalty_amount, conditions.change_before_departure.penalty_currency)}`
                : ''}
            </p>
          </div>
        </div>
        <div class="condition-item">
          <span class="condition-icon">${refundAllowed ? '✅' : '❌'}</span>
          <div>
            <p class="condition-label">Remboursement avant départ</p>
            <p class="condition-value ${refundAllowed ? 'ok' : 'nok'}">
              ${refundAllowed ? 'Autorisé' : 'Non remboursable'}
              ${conditions.refund_before_departure?.penalty_amount
                ? ` · Frais : ${fmtPrice(conditions.refund_before_departure.penalty_amount, conditions.refund_before_departure.penalty_currency)}`
                : ''}
            </p>
          </div>
        </div>
        ${order.conditions_of_carriage_url ? `
        <div class="condition-item" style="grid-column: 1/-1;">
          <span class="condition-icon">📄</span>
          <div>
            <p class="condition-label">Conditions générales de transport</p>
            <p class="condition-value"><a href="${order.conditions_of_carriage_url}" target="_blank" style="color:#A11C1C;">Consulter les CGT</a></p>
          </div>
        </div>` : ''}
      </div>
    </div>

    <!-- PRIX -->
    <div class="section">
      <p class="section-title">💳 Récapitulatif tarifaire</p>
      <div class="price-row">
        <span class="price-label">Tarif de base</span>
        <span class="price-value">${order.base_amount ? fmtPrice(order.base_amount, totalCurrency) : '—'}</span>
      </div>
      <div class="price-row">
        <span class="price-label">Taxes & frais</span>
        <span class="price-value">${order.tax_amount ? fmtPrice(order.tax_amount, totalCurrency) : '—'}</span>
      </div>
      <div class="price-total">
        <span class="label">Total payé</span>
        <span class="value">${fmtPrice(totalAmount, totalCurrency)}</span>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p>
        <strong>Référence commande Eazy-Visa :</strong> ${orderId} ·
        <strong>Émis le :</strong> ${fmt(createdAt, { dateStyle: 'full' })}
      </p>
      <p style="margin-top:4px;">
        Ce billet électronique fait foi de votre réservation. Conservez-le jusqu'à la fin de votre voyage.
        En cas de problème, contactez-nous avec votre référence PNR : <strong>${bookingRef}</strong>
      </p>
      ${order.live_mode === false ? '<p style="margin-top:6px;color:#f59e0b;font-weight:600;">⚠ BILLET DE TEST — Mode sandbox Duffel — Non valable pour un vrai voyage</p>' : ''}
    </div>

  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Force téléchargement en PDF si l'utilisateur le préfère
        // (commenté car on préfère ouvrir dans le navigateur pour imprimer)
        // 'Content-Disposition': `attachment; filename="billet-${bookingRef}.html"`,
      },
    });
  } catch (error: any) {
    console.error('❌ Erreur génération billet:', error);
    return new NextResponse('Erreur lors de la génération du billet', { status: 500 });
  }
}