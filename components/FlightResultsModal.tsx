// components/FlightResultsModal.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Plane, Clock, Calendar, Users, ArrowRight, ArrowLeft,
  Filter, Loader2, AlertCircle, ChevronDown, Info, Check,
  Luggage, CreditCard, Download, Mail, Phone, User, FileText,
  Shield, ChevronRight, RefreshCw, Ticket, Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ModalStep = 'results' | 'extras' | 'passengers' | 'payment' | 'confirmation';

interface PassengerForm {
  title: string; given_name: string; family_name: string;
  born_on: string; gender: string; email: string; phone_number: string;
  passport_number: string; passport_country: string; passport_expires: string;
}

const EMPTY_PAX: PassengerForm = {
  title: 'mr', given_name: '', family_name: '', born_on: '',
  gender: 'm', email: '', phone_number: '',
  passport_number: '', passport_country: 'SN', passport_expires: '',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = {
  duration: (iso: string) => (iso ?? '').replace('PT','').replace('H','h ').replace('M','min').trim(),
  time:     (dt: string)  => (dt ?? '').split('T')[1]?.slice(0,5) ?? '—',
  date:     (dt: string, opts?: Intl.DateTimeFormatOptions) =>
    dt ? new Date(dt).toLocaleString('fr-FR', opts ?? { dateStyle:'medium', timeStyle:'short' }) : '—',
  price:    (amount: string | number, currency: string) =>
    `${parseFloat(String(amount)).toLocaleString('fr-FR',{minimumFractionDigits:2})} ${currency}`,
};

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────

const STEPS: { key: ModalStep; label: string }[] = [
  { key: 'results',      label: 'Vols'       },
  { key: 'extras',       label: 'Extras'     },
  { key: 'passengers',   label: 'Passagers'  },
  { key: 'payment',      label: 'Paiement'   },
  { key: 'confirmation', label: '✓ Confirmé' },
];

function StepIndicator({ current }: { current: ModalStep }) {
  const idx = STEPS.findIndex(s => s.key === current);
  if (idx < 0) return null;
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-4 flex-wrap border-b border-gray-100 bg-white">
      {STEPS.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all
            ${i < idx  ? 'bg-green-500 text-white'
            : i === idx ? 'bg-[#A11C1C] text-white scale-110 shadow-lg'
            :             'bg-gray-200 text-gray-400'}`}>
            {i < idx ? <Check className="w-3.5 h-3.5" /> : i + 1}
          </div>
          <span className={`hidden sm:block ml-1 text-xs font-medium ${i === idx ? 'text-[#A11C1C]' : 'text-gray-400'}`}>
            {s.label}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`w-3 sm:w-6 h-0.5 mx-1 sm:mx-1.5 rounded-full ${i < idx ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FLIGHT CARD ──────────────────────────────────────────────────────────────

function FlightCard({ offer, index, onSelect, isLoadingThis, showDetails, onToggleDetails }: {
  offer: any; index: number;
  onSelect: (o: any) => void;
  isLoadingThis: boolean;
  showDetails: boolean;
  onToggleDetails: () => void;
}) {
  const slices = offer.slices ?? [];
  const stops = (slices[0]?.segments?.length ?? 1) - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
    >
      <div className="p-5 sm:p-6">
        {/* Header compagnie + prix */}
        <div className="flex justify-between items-start gap-4 mb-5">
          <div className="flex items-center gap-3">
            {offer.owner?.logo_symbol_url
              ? <img src={offer.owner.logo_symbol_url} alt={offer.owner.name} className="w-11 h-11 object-contain" />
              : <div className="w-11 h-11 bg-[#A11C1C]/10 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-[#A11C1C]" />
                </div>}
            <div>
              <p className="font-bold">{offer.owner?.name}</p>
              <p className="text-xs text-gray-500">
                {stops === 0 ? '✈ Direct' : `${stops} escale${stops > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-extrabold text-[#A11C1C]">{fmt.price(offer.total_amount, offer.total_currency)}</p>
            <p className="text-xs text-gray-400">au total</p>
          </div>
        </div>

        {/* Slices */}
        {slices.map((slice: any, si: number) => {
          const seg0 = slice.segments?.[0];
          const segN = slice.segments?.at(-1);
          return (
            <div key={si} className={si > 0 ? 'mt-3 pt-3 border-t border-dashed border-gray-200' : ''}>
              {slices.length > 1 && (
                <span className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                  {si === 0 ? '▶ Aller' : '◀ Retour'}
                </span>
              )}
              <div className="grid grid-cols-3 gap-2 items-center mt-1">
                <div>
                  <p className="text-xl font-bold">{fmt.time(seg0?.departing_at)}</p>
                  <p className="font-semibold text-sm">{seg0?.origin?.iata_code}</p>
                  <p className="text-xs text-gray-400">{seg0?.origin?.city_name}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">{fmt.duration(slice.duration ?? '')}</p>
                  <div className="h-0.5 bg-gradient-to-r from-[#A11C1C] to-orange-400 rounded my-1.5 relative">
                    <Plane className="w-3 h-3 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                  </div>
                  <p className="text-xs text-gray-400">{stops === 0 ? 'Direct' : `${stops} esc.`}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{fmt.time(segN?.arriving_at)}</p>
                  <p className="font-semibold text-sm">{segN?.destination?.iata_code}</p>
                  <p className="text-xs text-gray-400">{segN?.destination?.city_name}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Boutons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button onClick={onToggleDetails}
            className="py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-[#A11C1C] hover:text-[#A11C1C] flex items-center justify-center gap-1.5 transition-all">
            <Info className="w-4 h-4" /> Détails
            <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
          <motion.button whileHover={{ scale: isLoadingThis ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => !isLoadingThis && onSelect(offer)}
            disabled={isLoadingThis}
            className="py-3 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70">
            {isLoadingThis
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</>
              : <>Choisir <ArrowRight className="w-4 h-4" /></>}
          </motion.button>
        </div>
      </div>

      {/* Détails dépliables */}
      <AnimatePresence>
        {showDetails && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="border-t-2 border-gray-100 bg-gray-50 px-5 py-5 overflow-hidden">
            {slices.map((slice: any, si: number) => (
              <div key={si} className={si > 0 ? 'mt-4' : ''}>
                {slices.length > 1 && <h4 className="font-bold text-gray-700 mb-2">{si === 0 ? 'Aller' : 'Retour'}</h4>}
                {slice.segments?.map((seg: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-4 mb-3 shadow-sm text-sm">
                    <p className="font-bold mb-2">
                      {seg.marketing_carrier?.iata_code} {seg.marketing_carrier_flight_number}
                      {seg.aircraft && <span className="text-gray-400 font-normal"> · {seg.aircraft.name}</span>}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Départ</p>
                        <p className="font-bold">{seg.origin?.iata_code}</p>
                        <p className="text-gray-600 text-xs">{fmt.date(seg.departing_at)}</p>
                        {seg.origin?.terminal && <p className="text-xs text-gray-400">Terminal {seg.origin.terminal}</p>}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Arrivée</p>
                        <p className="font-bold">{seg.destination?.iata_code}</p>
                        <p className="text-gray-600 text-xs">{fmt.date(seg.arriving_at)}</p>
                        {seg.destination?.terminal && <p className="text-xs text-gray-400">Terminal {seg.destination.terminal}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* Conditions */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {offer.conditions?.change_before_departure && (
                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${offer.conditions.change_before_departure.allowed ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  <RefreshCw className="w-3 h-3" />
                  Modif. {offer.conditions.change_before_departure.allowed ? 'OK' : 'impossible'}
                </span>
              )}
              {offer.conditions?.refund_before_departure && (
                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${offer.conditions.refund_before_departure.allowed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                  <X className="w-3 h-3" />
                  Remb. {offer.conditions.refund_before_departure.allowed ? 'OK' : 'non remb.'}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

interface SearchParams {
  from: string; fromCode: string;
  to: string;   toCode: string;
  tripType: 'one_way' | 'round_trip';
  departDate: string;
  returnDate: string | null;
  passengers: number;
}

const FlightResultsModal = ({ isOpen, onClose, searchParams }: {
  isOpen: boolean;
  onClose: () => void;
  searchParams: SearchParams | null;
}) => {

  // ── États flow ─────────────────────────────────────────────────────────────
  const [step, setStep]           = useState<ModalStep>('results');
  const [offers, setOffers]       = useState<any[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState<number | null>(null);
  const [filters, setFilters]     = useState({ maxPrice: 99999, stops: 'all', sortBy: 'price' });

  const [selectedOffer, setSelectedOffer]     = useState<any>(null);
  const [loadingOffer, setLoadingOffer]       = useState(false);
  const [selectedServices, setSelectedServices] = useState<Array<{ id: string; quantity: number }>>([]);
  const [passengers, setPassengers]           = useState<PassengerForm[]>([{ ...EMPTY_PAX }]);
  const [paying, setPaying]                   = useState(false);
  const [confirmedOrder, setConfirmedOrder]   = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Recherche vols (Duffel POST) ───────────────────────────────────────────
  // ⚠️  On passe sp en paramètre pour éviter le stale closure du useEffect
  const searchFlights = async (sp: SearchParams) => {
    setLoading(true); setError(null); setOffers([]);

    const slices: any[] = [{
      origin: sp.fromCode,
      destination: sp.toCode,
      departure_date: sp.departDate,
    }];
    if (sp.tripType === 'round_trip' && sp.returnDate) {
      slices.push({ origin: sp.toCode, destination: sp.fromCode, departure_date: sp.returnDate });
    }

    const pax = Array(sp.passengers).fill({ type: 'adult' });

    try {
      const res = await fetch(`${API_URL}/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slices, passengers: pax, cabin_class: 'economy' }),
      });

      // Garde contre les réponses vides / non-JSON (ex : 405, 500 sans body)
      const text = await res.text();
      if (!text) throw new Error(`Réponse vide du serveur (HTTP ${res.status})`);
      const data = JSON.parse(text);

      if (data.success && data.data?.length > 0) {
        setOffers(data.data);
        const maxP = Math.ceil(Math.max(...data.data.map((o: any) => parseFloat(o.total_amount))) * 1.1);
        setFilters(f => ({ ...f, maxPrice: maxP }));
      } else {
        setError(data.error || 'Aucun vol disponible pour ces critères.');
      }
    } catch (err: any) {
      console.error('searchFlights error:', err);
      setError(err.message || 'Impossible de charger les vols.');
      toast.error('Erreur lors de la recherche', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && searchParams) {
      setStep('results'); setOffers([]); setError(null);
      setSelectedOffer(null); setSelectedServices([]);
      setConfirmedOrder(null);
      setPassengers(Array(searchParams.passengers).fill(null).map(() => ({ ...EMPTY_PAX })));
      searchFlights(searchParams); // ← on passe sp directement, pas de stale closure
    }
  }, [isOpen, searchParams]);

  // Sync passagers si count change
  useEffect(() => {
    if (!searchParams) return;
    const n = searchParams.passengers;
    setPassengers(prev =>
      n > prev.length
        ? [...prev, ...Array(n - prev.length).fill(null).map(() => ({ ...EMPTY_PAX }))]
        : prev.slice(0, n)
    );
  }, [searchParams?.passengers]);

  // ── Calcul total ───────────────────────────────────────────────────────────
  const computeTotal = (offer: any) => {
    const base   = parseFloat(offer?.total_amount ?? '0');
    const extras = selectedServices.reduce((acc, ss) => {
      const svc = offer?.available_services?.find((s: any) => s.id === ss.id);
      return acc + (svc ? parseFloat(svc.total_amount) * ss.quantity : 0);
    }, 0);
    return base + extras;
  };

  // ── Filtres ────────────────────────────────────────────────────────────────
  const filteredOffers = offers
    .filter(o => {
      if (parseFloat(o.total_amount) > filters.maxPrice) return false;
      if (filters.stops !== 'all') {
        const s = (o.slices?.[0]?.segments?.length ?? 1) - 1;
        if (filters.stops === 'direct' && s !== 0) return false;
        if (filters.stops === 'one' && s > 1) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price') return parseFloat(a.total_amount) - parseFloat(b.total_amount);
      return (a.slices?.[0]?.duration ?? '').localeCompare(b.slices?.[0]?.duration ?? '');
    });

  // ── Sélection d'une offre : fetch avec services ────────────────────────────
  const handleSelectOffer = async (offer: any) => {
    setLoadingOffer(true);
    setSelectedServices([]);
    try {
      const res  = await fetch(`${API_URL}/flights/offers/${offer.id}?services=true`);
      const data = await res.json();
      setSelectedOffer(data.success && data.data ? data.data : offer);
    } catch {
      setSelectedOffer(offer);
      toast.warning('Impossible de charger les extras');
    } finally {
      setLoadingOffer(false);
      setStep('extras');
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleService = (id: string) =>
    setSelectedServices(prev => prev.some(s => s.id === id) ? prev.filter(s => s.id !== id) : [...prev, { id, quantity: 1 }]);

  const updatePax = (idx: number, field: keyof PassengerForm, val: string) =>
    setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, [field]: val } : p));

  // ── Validation passagers ───────────────────────────────────────────────────
  const validatePassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.given_name || !p.family_name || !p.born_on || !p.phone_number || !p.email) {
        toast.error(`Passager ${i + 1} : informations incomplètes`); return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
        toast.error(`Passager ${i + 1} : email invalide`); return false;
      }
    }
    return true;
  };

  // ── Paiement ───────────────────────────────────────────────────────────────
  const handlePayAndBook = async () => {
    if (!selectedOffer || !validatePassengers()) return;
    setPaying(true);
    try {
      const offerPax: any[] = selectedOffer.passengers ?? [];
      const mappedPax = passengers.map((p, i) => ({
        id: offerPax[i]?.id,
        title: p.title, gender: p.gender,
        given_name: p.given_name.trim(), family_name: p.family_name.trim(),
        born_on: p.born_on,
        email: p.email.trim(),
        phone_number: p.phone_number.trim().startsWith('+') ? p.phone_number.trim() : `+221${p.phone_number.trim()}`,
        ...(p.passport_number?.trim() ? {
          identity_documents: [{
            type: 'passport',
            unique_identifier: p.passport_number.trim(),
            issuing_country_code: (p.passport_country || 'SN').toUpperCase(),
            ...(p.passport_expires ? { expires_on: p.passport_expires } : {}),
          }],
        } : {}),
      }));

      const totalAmount = computeTotal(selectedOffer).toFixed(2);

      const res  = await fetch(`${API_URL}/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedOfferId: selectedOffer.id,
          passengers: mappedPax,
          services: selectedServices,
          amount: totalAmount,
          currency: selectedOffer.total_currency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedOrder(data.data);
        setStep('confirmation');
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success('🎉 Réservation confirmée !');
      } else {
        toast.error(data.error || 'Erreur lors de la réservation');
      }
    } catch {
      toast.error('Erreur réseau — veuillez réessayer');
    } finally {
      setPaying(false);
    }
  };

  const resetToResults = () => {
    setStep('results'); setSelectedOffer(null); setSelectedServices([]);
    setConfirmedOrder(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Sidebar recap ──────────────────────────────────────────────────────────
  const SidebarRecap = () => {
    if (!selectedOffer) return null;
    const currency = selectedOffer.total_currency;
    const base     = parseFloat(selectedOffer.total_amount);
    const total    = computeTotal(selectedOffer);
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sticky top-0">
        <h3 className="font-bold mb-3 text-sm">Votre sélection</h3>
        {selectedOffer.slices?.map((slice: any, i: number) => {
          const s0 = slice.segments?.[0]; const sN = slice.segments?.at(-1);
          return (
            <div key={i} className={`text-sm ${i > 0 ? 'mt-2 pt-2 border-t border-gray-200' : ''}`}>
              <p className="text-xs text-gray-400 uppercase font-semibold">{i === 0 ? 'Aller' : 'Retour'}</p>
              <p className="font-bold">{s0?.origin?.iata_code} → {sN?.destination?.iata_code}</p>
              <p className="text-gray-500 text-xs">{fmt.date(s0?.departing_at, { dateStyle:'medium' })}</p>
            </div>
          );
        })}
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vol</span>
            <span className="font-medium">{fmt.price(base, currency)}</span>
          </div>
          {selectedServices.map(ss => {
            const svc = selectedOffer?.available_services?.find((s: any) => s.id === ss.id);
            if (!svc) return null;
            const label = `${svc.metadata?.maximum_weight_kg ?? ''}kg ${svc.metadata?.type === 'checked' ? 'Soute' : 'Cabine'}`;
            return (
              <div key={ss.id} className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1"><Luggage className="w-3 h-3" /> {label}</span>
                <span className="font-medium text-[#A11C1C]">+{fmt.price(svc.total_amount, currency)}</span>
              </div>
            );
          })}
          <div className="flex justify-between font-bold text-sm pt-1.5 border-t border-gray-200">
            <span>Total</span>
            <span className="text-[#A11C1C]">{fmt.price(total, currency)}</span>
          </div>
          <p className="text-xs text-gray-400">{searchParams?.passengers} passager{(searchParams?.passengers ?? 1) > 1 ? 's' : ''}</p>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden pointer-events-auto flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* ── Header fixe ─────────────────────────────────────────── */}
              <div className="bg-gradient-to-r from-[#A11C1C] to-red-700 text-white flex-shrink-0">
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plane className="w-8 h-8" />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {step === 'confirmation' ? 'Réservation confirmée !' : 'Vols disponibles'}
                      </h2>
                      <p className="text-sm opacity-80">
                        {searchParams?.from} → {searchParams?.to}
                        {searchParams?.tripType === 'round_trip' && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">↩ Aller-retour</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex flex-wrap gap-2 text-xs">
                      <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {searchParams?.departDate}
                      </span>
                      {searchParams?.returnDate && (
                        <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> {searchParams.returnDate}
                        </span>
                      )}
                      <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {searchParams?.passengers} pax
                      </span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors ml-2">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Step indicator (masqué sur results) */}
                {step !== 'results' && <StepIndicator current={step} />}
              </div>

              {/* ── Zone scrollable ────────────────────────────────────── */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-4 sm:p-6">

                  {/* ════ RESULTS ════ */}
                  {step === 'results' && (
                    <>
                      {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                          <Loader2 className="w-16 h-16 text-[#A11C1C] animate-spin mb-4" />
                          <p className="text-xl font-bold text-gray-800">Recherche en cours…</p>
                          <p className="text-gray-500 mt-1">Comparaison des meilleures offres</p>
                        </div>
                      ) : error ? (
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-10 text-center">
                          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-red-800 mb-2">Aucun résultat</h3>
                          <p className="text-red-700 mb-6">{error}</p>
                          <button onClick={() => searchParams && searchFlights(searchParams)} className="px-6 py-3 bg-[#A11C1C] text-white rounded-xl font-bold hover:bg-red-700 transition-all">
                            Réessayer
                          </button>
                        </div>
                      ) : filteredOffers.length > 0 ? (
                        <>
                          {/* Filtres */}
                          <div className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-[#A11C1C]" />
                                <h3 className="font-bold">Filtres</h3>
                              </div>
                              <span className="text-sm text-gray-500">{filteredOffers.length} vol{filteredOffers.length > 1 ? 's' : ''}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                  Prix max : {fmt.price(filters.maxPrice, offers[0]?.total_currency ?? '')}
                                </label>
                                <input type="range"
                                  min={Math.floor(Math.min(...offers.map(o => parseFloat(o.total_amount))))}
                                  max={Math.ceil(Math.max(...offers.map(o => parseFloat(o.total_amount))) * 1.1)}
                                  step={1} value={filters.maxPrice}
                                  onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
                                  className="w-full accent-[#A11C1C]"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Escales</label>
                                <select value={filters.stops} onChange={e => setFilters(f => ({ ...f, stops: e.target.value }))}
                                  className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]">
                                  <option value="all">Toutes</option>
                                  <option value="direct">Direct uniquement</option>
                                  <option value="one">Max 1 escale</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Trier par</label>
                                <select value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}
                                  className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]">
                                  <option value="price">Meilleur prix</option>
                                  <option value="duration">Durée courte</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Liste vols */}
                          <div className="space-y-5">
                            {filteredOffers.map((offer, i) => (
                              <FlightCard key={offer.id} offer={offer} index={i}
                                isLoadingThis={loadingOffer}
                                showDetails={openDetails === i}
                                onToggleDetails={() => setOpenDetails(openDetails === i ? null : i)}
                                onSelect={handleSelectOffer}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-100 rounded-2xl p-14 text-center">
                          <AlertCircle className="w-14 h-14 text-gray-400 mx-auto mb-4" />
                          <p className="font-bold text-xl">Aucun vol avec ces filtres</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* ════ EXTRAS ════ */}
                  {step === 'extras' && selectedOffer && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      <div className="lg:col-span-2 space-y-4">
                        {/* Bagages inclus */}
                        {(() => {
                          const included: string[] = [];
                          selectedOffer.slices?.forEach((slice: any) =>
                            slice.segments?.forEach((seg: any) =>
                              seg.passengers?.forEach((p: any) =>
                                p.baggages?.forEach((b: any) => {
                                  if (b.quantity > 0) {
                                    const lbl = b.type === 'checked'
                                      ? `${b.quantity}x Bagage en soute`
                                      : `${b.quantity}x Bagage cabine`;
                                    if (!included.includes(lbl)) included.push(lbl);
                                  }
                                })
                              )
                            )
                          );
                          return included.length > 0 ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-600" /> Bagages inclus dans votre tarif
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {included.map(lbl => (
                                  <span key={lbl} className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                                    <Luggage className="w-3 h-3" /> {lbl}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* Services payants */}
                        <div className="bg-white rounded-2xl shadow p-5">
                          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Luggage className="w-5 h-5 text-[#A11C1C]" /> Bagages supplémentaires
                          </h2>
                          {(selectedOffer.available_services?.filter((s: any) => s.type === 'baggage') ?? []).length > 0 ? (
                            <div className="space-y-3">
                              {selectedOffer.available_services.filter((s: any) => s.type === 'baggage').map((svc: any) => {
                                const sel = selectedServices.some(s => s.id === svc.id);
                                const isSoute = svc.metadata?.type === 'checked' || svc.metadata?.baggage_type === 'checked_baggage';
                                return (
                                  <button key={svc.id} onClick={() => toggleService(svc.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${sel ? 'border-[#A11C1C] bg-[#A11C1C]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-3">
                                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${sel ? 'bg-[#A11C1C] border-[#A11C1C]' : 'border-gray-300'}`}>
                                        {sel && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      <div>
                                        <p className="font-semibold text-sm">
                                          {svc.metadata?.maximum_weight_kg ? `${svc.metadata.maximum_weight_kg}kg — ` : ''}
                                          {isSoute ? 'Bagage en soute' : 'Bagage cabine'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {svc.passenger_ids?.length ? `Pour ${svc.passenger_ids.length} passager(s)` : 'Par passager'}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="font-bold text-[#A11C1C] text-sm flex-shrink-0 ml-3">
                                      +{fmt.price(svc.total_amount, svc.total_currency)}
                                    </p>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl">
                              <Luggage className="w-10 h-10 mx-auto mb-2 opacity-30" />
                              <p className="text-sm font-medium text-gray-500">Pas de bagage supplémentaire disponible</p>
                              <p className="text-xs mt-1 text-gray-400">Cette compagnie ne propose pas d'extras via Duffel pour ce trajet</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <SidebarRecap />
                        <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setStep('passengers'); scrollRef.current?.scrollTo({ top: 0 }); }}
                          className="w-full mt-4 py-3.5 bg-[#A11C1C] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                          Continuer <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        <button onClick={() => setStep('results')} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                          <ArrowLeft className="w-3.5 h-3.5" /> Retour aux vols
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ════ PASSENGERS ════ */}
                  {step === 'passengers' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      <div className="lg:col-span-2 space-y-5">
                        {passengers.map((p, idx) => (
                          <div key={idx} className="bg-white rounded-2xl shadow p-5">
                            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                              <User className="w-4 h-4 text-[#A11C1C]" />
                              Passager {idx + 1} — <span className="text-[#A11C1C]">Adulte</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label:'Titre', field:'title' as const, type:'select', opts:[['mr','M.'],['ms','Mme'],['mrs','Mme (marié)'],['miss','Mlle'],['dr','Dr']] },
                                { label:'Genre', field:'gender' as const, type:'select', opts:[['m','Masculin'],['f','Féminin']] },
                              ].map(({ label, field, opts }) => (
                                <div key={field}>
                                  <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                                  <select value={p[field]} onChange={e => updatePax(idx, field, e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]">
                                    {opts?.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                                  </select>
                                </div>
                              ))}
                              {[
                                { label:'Prénom *', field:'given_name' as const, type:'text', placeholder:'Comme sur le passeport', col:1 },
                                { label:'Nom *', field:'family_name' as const, type:'text', placeholder:'Comme sur le passeport', col:1 },
                                { label:'Date de naissance *', field:'born_on' as const, type:'date', placeholder:'', col:1 },
                                { label:'Email *', field:'email' as const, type:'email', placeholder:'prenom@exemple.com', col:1 },
                                { label:'Téléphone *', field:'phone_number' as const, type:'tel', placeholder:'+221 77 000 00 00', col:2 },
                              ].map(({ label, field, type, placeholder, col }) => (
                                <div key={field} className={col === 2 ? 'col-span-2' : ''}>
                                  <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                                  <input type={type} value={p[field]} placeholder={placeholder}
                                    onChange={e => updatePax(idx, field, e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]" />
                                </div>
                              ))}
                            </div>
                            {/* Passeport */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" /> Document de voyage (optionnel, recommandé international)
                              </p>
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { label:'N° Passeport', field:'passport_number' as const, type:'text', placeholder:'AB123456' },
                                  { label:'Pays émetteur', field:'passport_country' as const, type:'text', placeholder:'SN' },
                                  { label:'Expiration', field:'passport_expires' as const, type:'date', placeholder:'' },
                                ].map(({ label, field, type, placeholder }) => (
                                  <div key={field}>
                                    <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                                    <input type={type} value={p[field]} placeholder={placeholder}
                                      onChange={e => updatePax(idx, field, e.target.value)}
                                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <SidebarRecap />
                        <motion.button whileHover={{ scale: 1.02 }}
                          onClick={() => { if (validatePassengers()) { setStep('payment'); scrollRef.current?.scrollTo({ top: 0 }); } }}
                          className="w-full mt-4 py-3.5 bg-[#A11C1C] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                          Passer au paiement <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        <button onClick={() => setStep('extras')} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                          <ArrowLeft className="w-3.5 h-3.5" /> Retour aux extras
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ════ PAYMENT ════ */}
                  {step === 'payment' && selectedOffer && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow p-5">
                          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#A11C1C]" /> Paiement sécurisé
                          </h2>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
                            <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                              <Shield className="w-4 h-4" /> Mode test Duffel — aucun débit réel
                            </p>
                            <p className="text-xs text-blue-600 mt-1">Paiement simulé via le solde Duffel Test (illimité).</p>
                          </div>
                          {/* Champs CB décoratifs */}
                          <div className="space-y-4 opacity-50 pointer-events-none select-none">
                            {[
                              { label:'Numéro de carte', val:'4242 4242 4242 4242' },
                              { label:'Expiration', val:'12 / 28' },
                              { label:'CVC', val:'123' },
                            ].map(f => (
                              <div key={f.label}>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{f.label}</label>
                                <input readOnly defaultValue={f.val} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow p-5">
                          <h3 className="font-bold mb-3 flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-green-500" /> Conditions tarifaires
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Confirmation instantanée</li>
                            <li className="flex items-start gap-2">
                              {selectedOffer.conditions?.change_before_departure?.allowed
                                ? <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                : <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                              Modification : {selectedOffer.conditions?.change_before_departure?.allowed ? 'Autorisée' : 'Non autorisée'}
                            </li>
                            <li className="flex items-start gap-2">
                              {selectedOffer.conditions?.refund_before_departure?.allowed
                                ? <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                : <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                              Remboursement : {selectedOffer.conditions?.refund_before_departure?.allowed ? 'Autorisé' : 'Non remboursable'}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <SidebarRecap />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handlePayAndBook} disabled={paying}
                          className="w-full mt-4 py-4 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70">
                          {paying
                            ? <><Loader2 className="w-5 h-5 animate-spin" /> Traitement…</>
                            : <><CreditCard className="w-5 h-5" /> Confirmer et payer</>}
                        </motion.button>
                        <p className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" /> Paiement 100% sécurisé
                        </p>
                        <button onClick={() => setStep('passengers')} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                          <ArrowLeft className="w-3.5 h-3.5" /> Retour
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ════ CONFIRMATION ════ */}
                  {step === 'confirmation' && confirmedOrder && (
                    <div className="space-y-5">
                      {/* Hero succès */}
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Check className="w-8 h-8 text-white" />
                        </motion.div>
                        <h2 className="text-2xl font-extrabold mb-1">Réservation Confirmée !</h2>
                        <div className="mt-4 bg-white/20 rounded-xl px-6 py-3 inline-block">
                          <p className="text-xs opacity-75 mb-0.5">Référence PNR</p>
                          <p className="text-3xl font-mono font-extrabold tracking-widest">{confirmedOrder.bookingReference}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Itinéraire */}
                        <div className="bg-white rounded-2xl shadow p-5">
                          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                            <Ticket className="w-4 h-4 text-[#A11C1C]" /> Itinéraire
                          </h3>
                          {confirmedOrder.slices?.map((slice: any, i: number) => {
                            const s0 = slice.segments?.[0]; const sN = slice.segments?.at(-1);
                            return (
                              <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-dashed border-gray-200' : ''}>
                                {confirmedOrder.slices.length > 1 && <p className="text-xs text-gray-400 uppercase font-semibold mb-2">{i === 0 ? '▶ Aller' : '◀ Retour'}</p>}
                                <div className="flex items-center gap-3">
                                  <div className="text-center">
                                    <p className="text-xl font-bold">{fmt.time(s0?.departing_at)}</p>
                                    <p className="font-semibold text-sm">{s0?.origin?.iata_code}</p>
                                  </div>
                                  <div className="flex-1 h-0.5 bg-gray-200 relative">
                                    <Plane className="w-3 h-3 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xl font-bold">{fmt.time(sN?.arriving_at)}</p>
                                    <p className="font-semibold text-sm">{sN?.destination?.iata_code}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{fmt.date(s0?.departing_at, { dateStyle:'medium' })}</p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Passagers + montant */}
                        <div className="bg-white rounded-2xl shadow p-5">
                          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-[#A11C1C]" /> Passagers
                          </h3>
                          <div className="space-y-2 mb-4">
                            {confirmedOrder.passengers?.map((p: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                                <div className="w-7 h-7 bg-[#A11C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-3.5 h-3.5 text-[#A11C1C]" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">{p.given_name} {p.family_name}</p>
                                  <p className="text-xs text-gray-400 capitalize">{p.type?.replace('_', ' ')}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm">Total payé</span>
                              <span className="text-xl font-extrabold text-[#A11C1C]">
                                {fmt.price(confirmedOrder.totalAmount, confirmedOrder.totalCurrency)}
                              </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Check className="w-3 h-3" /> Paiement confirmé</p>
                          </div>
                        </div>
                      </div>

                      {/* Numéros e-ticket + bouton téléchargement */}
                      <div className="bg-white rounded-2xl shadow p-5">
                        <p className="font-semibold mb-3 flex items-center gap-2 text-sm">
                          <Ticket className="w-4 h-4 text-[#A11C1C]" /> Billet électronique
                        </p>

                        {confirmedOrder.documents?.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3 mb-3">
                            <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wide">N° de billet</p>
                            {confirmedOrder.documents.map((doc: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                                <span className="text-xs bg-[#A11C1C]/10 text-[#A11C1C] px-2 py-0.5 rounded font-semibold">e-Ticket</span>
                                <span className="font-mono font-bold text-sm">{doc.unique_identifier ?? '—'}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Bouton téléchargement billet HTML */}
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={() => window.open(`${API_URL}/bookings/${confirmedOrder.orderId}/ticket`, '_blank')}
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#A11C1C]/5 to-red-50 border-2 border-[#A11C1C]/20 hover:border-[#A11C1C] rounded-xl transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#A11C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                              <Download className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-sm group-hover:text-[#A11C1C] transition-colors">Télécharger le billet électronique</p>
                              <p className="text-xs text-gray-500">Ouvre dans un nouvel onglet → Imprimer → Enregistrer en PDF</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#A11C1C] flex-shrink-0" />
                        </motion.button>

                        <p className="text-xs text-center text-gray-400 mt-2">
                          Réf. commande : <span className="font-mono">{confirmedOrder.orderId}</span>
                        </p>
                      </div>

                      {/* Boutons finaux */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center pb-2">
                        <motion.button whileHover={{ scale: 1.02 }} onClick={resetToResults}
                          className="px-6 py-3 border-2 border-[#A11C1C] text-[#A11C1C] rounded-xl font-semibold flex items-center gap-2 justify-center text-sm">
                          <Plane className="w-4 h-4" /> Nouvelle recherche
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} onClick={onClose}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center gap-2 justify-center text-sm">
                          <X className="w-4 h-4" /> Fermer
                        </motion.button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FlightResultsModal;