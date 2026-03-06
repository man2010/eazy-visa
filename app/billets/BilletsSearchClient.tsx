/**
 * PAGE BILLETS — CLIENT COMPONENT
 * Flow complet A → Z via Duffel API
 * Étapes : Recherche → Résultats → Extras → Passagers → Paiement → Confirmation
 *
 * FIXES v2 :
 *  - Autocomplétion par nom de ville (Dakar, Paris, New York…)
 *  - fromCode / toCode stockés en useRef pour éviter le stale closure dans handleSearch
 *  - Meilleur affichage suggestions : icône ville vs aéroport
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HeroCarousel from '@/components/HeroCarousel';
import {
  Plane, Calendar, MapPin, Users, Clock, Info,
  ChevronDown, Loader2, AlertCircle, ArrowRight,
  ArrowLeft, Check, Luggage, CreditCard, Download,
  Mail, Phone, User, FileText, Shield,
  ChevronRight, X, RefreshCw, Ticket, Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type TripType = 'one_way' | 'round_trip';
type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';
type Step = 'search' | 'results' | 'extras' | 'passengers' | 'payment' | 'confirmation';

interface PlaceSuggestion {
  iata_code: string;
  name: string;
  city_name: string;
  country_code: string;
  type: string; // 'airport' | 'city'
  label: string;
}

interface PassengerForm {
  title: string;
  given_name: string;
  family_name: string;
  born_on: string;
  gender: string;
  email: string;
  phone_number: string;
  passport_number: string;
  passport_country: string;
  passport_expires: string;
}

const EMPTY_PASSENGER: PassengerForm = {
  title: 'mr', given_name: '', family_name: '', born_on: '',
  gender: 'm', email: '', phone_number: '',
  passport_number: '', passport_country: 'SN', passport_expires: '',
};

const CABIN_LABELS: Record<CabinClass, string> = {
  economy: 'Économique', premium_economy: 'Premium Éco',
  business: 'Affaires', first: 'Première',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = {
  duration: (iso: string) => iso.replace('PT','').replace('H','h ').replace('M','min').trim(),
  time: (dt: string) => (dt ?? '').split('T')[1]?.slice(0,5) ?? '—',
  date: (dt: string, opts?: Intl.DateTimeFormatOptions) =>
    new Date(dt).toLocaleString('fr-FR', opts),
  price: (amount: string | number, currency: string) =>
    `${parseFloat(String(amount)).toLocaleString('fr-FR',{minimumFractionDigits:2})} ${currency}`,
};

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────

const STEPS: { key: Step; label: string }[] = [
  { key: 'results', label: 'Vols' },
  { key: 'extras', label: 'Extras' },
  { key: 'passengers', label: 'Passagers' },
  { key: 'payment', label: 'Paiement' },
  { key: 'confirmation', label: '✓ Confirmé' },
];

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.key === current);
  if (idx < 0) return null;
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 flex-wrap">
      {STEPS.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all
            ${i < idx ? 'bg-green-500 text-white' :
              i === idx ? 'bg-[#A11C1C] text-white scale-110 shadow-lg' :
              'bg-gray-200 text-gray-400'}`}
          >
            {i < idx ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`hidden sm:block ml-1.5 text-xs font-medium ${i === idx ? 'text-[#A11C1C]' : 'text-gray-400'}`}>
            {s.label}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`w-4 sm:w-8 h-0.5 mx-1.5 sm:mx-2 rounded-full ${i < idx ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FLIGHT CARD ──────────────────────────────────────────────────────────────

function FlightCard({ offer, index, onSelect, showDetails, onToggleDetails, loadingOffer }: {
  offer: any; index: number;
  onSelect: (o: any) => void;
  showDetails: boolean;
  onToggleDetails: () => void;
  loadingOffer?: boolean;
}) {
  const slices = offer.slices ?? [];
  const stops = (slices[0]?.segments?.length ?? 1) - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }} whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
    >
      <div className="p-5 lg:p-7">
        {/* Header compagnie + prix */}
        <div className="flex justify-between items-start gap-4 mb-5">
          <div className="flex items-center gap-3">
            {offer.owner?.logo_symbol_url
              ? <img src={offer.owner.logo_symbol_url} alt={offer.owner.name} className="w-11 h-11 object-contain" />
              : <div className="w-11 h-11 bg-[#A11C1C]/10 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-[#A11C1C]" />
                </div>
            }
            <div>
              <p className="font-bold">{offer.owner?.name}</p>
              <p className="text-xs text-gray-500">
                {stops === 0 ? '✈ Direct' : `${stops} escale${stops > 1 ? 's' : ''}`} ·{' '}
                {CABIN_LABELS[offer.cabin_class as CabinClass] ?? offer.cabin_class}
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
            <div key={si} className={`${si > 0 ? 'mt-3 pt-3 border-t border-dashed border-gray-200' : ''}`}>
              {slices.length > 1 && (
                <span className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                  {si === 0 ? '▶ Aller' : '◀ Retour'}
                </span>
              )}
              <div className="grid grid-cols-3 gap-2 items-center mt-1">
                <div>
                  <p className="text-xl font-bold">{fmt.time(seg0?.departing_at)}</p>
                  <p className="font-semibold text-gray-700 text-sm">{seg0?.origin?.iata_code}</p>
                  <p className="text-xs text-gray-400">{seg0?.origin?.city_name}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">{fmt.duration(slice.duration ?? '')}</p>
                  <div className="relative h-0.5 bg-gradient-to-r from-[#A11C1C] to-orange-400 rounded my-1.5">
                    <Plane className="w-3 h-3 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                  </div>
                  <p className="text-xs text-gray-400">{stops === 0 ? 'Direct' : `${stops} esc.`}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{fmt.time(segN?.arriving_at)}</p>
                  <p className="font-semibold text-gray-700 text-sm">{segN?.destination?.iata_code}</p>
                  <p className="text-xs text-gray-400">{segN?.destination?.city_name}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button onClick={onToggleDetails}
            className="py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-[#A11C1C] hover:text-[#A11C1C] flex items-center justify-center gap-1.5 transition-all"
          >
            <Info className="w-4 h-4" /> Détails
            <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
          <motion.button whileHover={{ scale: loadingOffer ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => !loadingOffer && onSelect(offer)}
            disabled={loadingOffer}
            className="py-3 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loadingOffer
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</>
              : <>Choisir <ArrowRight className="w-4 h-4" /></>}
          </motion.button>
        </div>
      </div>

      {/* Détails dépliables */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="border-t-2 border-gray-100 bg-gray-50 px-5 lg:px-7 py-5 overflow-hidden"
          >
            {slices.map((slice: any, si: number) => (
              <div key={si} className={si > 0 ? 'mt-4' : ''}>
                {slices.length > 1 && <h4 className="font-bold text-gray-700 mb-2">{si === 0 ? 'Aller' : 'Retour'}</h4>}
                {slice.segments?.map((seg: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-4 mb-3 shadow-sm last:mb-0 text-sm">
                    <p className="font-bold mb-2">{seg.marketing_carrier?.iata_code} {seg.marketing_carrier_flight_number}
                      {seg.aircraft && <span className="text-gray-400 font-normal"> · {seg.aircraft.name}</span>}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Départ</p>
                        <p className="font-bold">{seg.origin?.iata_code}</p>
                        <p className="text-gray-600 text-xs">{fmt.date(seg.departing_at, { dateStyle:'medium', timeStyle:'short' })}</p>
                        {seg.origin?.terminal && <p className="text-xs text-gray-400">Terminal {seg.origin.terminal}</p>}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Arrivée</p>
                        <p className="font-bold">{seg.destination?.iata_code}</p>
                        <p className="text-gray-600 text-xs">{fmt.date(seg.arriving_at, { dateStyle:'medium', timeStyle:'short' })}</p>
                        {seg.destination?.terminal && <p className="text-xs text-gray-400">Terminal {seg.destination.terminal}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Conditions tarifaires */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {offer.conditions?.change_before_departure && (
                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                  offer.conditions.change_before_departure.allowed ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  <RefreshCw className="w-3 h-3" />
                  Modif. {offer.conditions.change_before_departure.allowed ? 'OK' : 'impossible'}
                  {offer.conditions.change_before_departure.penalty_amount &&
                    ` (${fmt.price(offer.conditions.change_before_departure.penalty_amount, offer.total_currency)})`}
                </span>
              )}
              {offer.conditions?.refund_before_departure && (
                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                  offer.conditions.refund_before_departure.allowed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'
                }`}>
                  <X className="w-3 h-3" />
                  Remb. {offer.conditions.refund_before_departure.allowed ? 'OK' : 'non remb.'}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ─── COMPOSANT : CHAMP DE LIEU (réutilisable) ──────────────────────────────────

function PlaceInput({
  label, placeholder, value, codeRef,
  onChange, onSelect,
}: {
  label: string;
  placeholder: string;
  value: string;
  codeRef: React.MutableRefObject<string>;
  onChange: (val: string) => void;
  onSelect: (sug: PlaceSuggestion) => void;
}) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ferme dropdown au click extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/flights/locations?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setSuggestions(data.data);
        setOpen(true);
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (val: string) => {
    onChange(val);
    codeRef.current = ''; // invalide la sélection précédente
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchSuggestions(val), 280);
  };

  const handleSelect = (sug: PlaceSuggestion) => {
    onChange(`${sug.city_name} (${sug.iata_code})`);
    codeRef.current = sug.iata_code;
    setSuggestions([]);
    setOpen(false);
    onSelect(sug);
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full pl-10 pr-10 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent text-sm transition-colors
            ${codeRef.current ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
        />
        {/* Indicateur : code sélectionné */}
        {codeRef.current && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md">
            {codeRef.current}
          </span>
        )}
        {loading && !codeRef.current && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Dropdown suggestions */}
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-72 overflow-y-auto"
          >
            {suggestions.map((sug, i) => (
              <li key={`${sug.iata_code}-${i}`}>
                <button
                  type="button"
                  onMouseDown={e => { e.preventDefault(); handleSelect(sug); }}
                  className="w-full text-left px-4 py-3 hover:bg-[#A11C1C]/5 transition-colors flex items-center gap-3 group"
                >
                  {/* Icône : ville vs aéroport */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    sug.type === 'city' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {sug.type === 'city'
                      ? <Building2 className="w-4 h-4" />
                      : <Plane className="w-4 h-4" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Nom ville en gras + IATA */}
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm truncate">{sug.city_name}</p>
                      <span className="text-xs font-mono font-bold text-[#A11C1C] bg-[#A11C1C]/10 px-1.5 py-0.5 rounded flex-shrink-0">
                        {sug.iata_code}
                      </span>
                    </div>
                    {/* Nom aéroport + pays */}
                    <p className="text-xs text-gray-400 truncate">
                      {sug.type === 'city' ? 'Tous les aéroports' : sug.name} · {sug.country_code}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Message si pas de résultats après frappe */}
      <AnimatePresence>
        {open && suggestions.length === 0 && !loading && value.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-lg border border-gray-100 z-50 px-4 py-3 text-sm text-gray-500 text-center"
          >
            Aucun résultat pour « {value} »
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

export default function BilletsSearchClient() {
  const heroImages = ['/EVBilleterie.jpg', '/EVServices1.png', '/EVBilleterie1.png'];

  // ── Étape
  const [step, setStep] = useState<Step>('search');

  // ── Champs recherche
  const [tripType, setTripType] = useState<TripType>('one_way');
  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  // !! REFS pour les codes IATA — jamais périmés dans les closures !!
  const fromCodeRef = useRef('');
  const toCodeRef = useRef('');

  // ── Résultats
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flightError, setFlightError] = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState<number | null>(null);
  const [filters, setFilters] = useState({ maxPrice: 99999, stops: 'all', sort: 'price' });

  // ── Sélection & flow
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [loadingOffer, setLoadingOffer] = useState(false);  // fetch single offer avec services
  const [selectedServices, setSelectedServices] = useState<Array<{ id: string; quantity: number }>>([]);
  const [passengers, setPassengers] = useState<PassengerForm[]>([{ ...EMPTY_PASSENGER }]);
  const [paying, setPaying] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Dates par défaut
  useEffect(() => {
    const d = new Date(); d.setDate(d.getDate() + 14);
    setDepartDate(d.toISOString().split('T')[0]);
    const r = new Date(d); r.setDate(r.getDate() + 7);
    setReturnDate(r.toISOString().split('T')[0]);
  }, []);

  // Sync passagers count
  useEffect(() => {
    const total = adultsCount + childrenCount + infantsCount;
    setPassengers(prev => {
      if (total > prev.length) return [...prev, ...Array(total - prev.length).fill(null).map(() => ({ ...EMPTY_PASSENGER }))];
      return prev.slice(0, total);
    });
  }, [adultsCount, childrenCount, infantsCount]);

  // ── Recherche vols — lit les REFs, pas le state
  const handleSearch = async () => {
    const fromCode = fromCodeRef.current;
    const toCode = toCodeRef.current;

    if (!fromCode || !toCode) {
      toast.error('Veuillez sélectionner une ville/aéroport dans la liste déroulante', {
        description: !fromCode
          ? 'Le champ "Départ" ne contient pas de sélection valide'
          : 'Le champ "Arrivée" ne contient pas de sélection valide',
      });
      return;
    }
    if (fromCode === toCode) { toast.error('Départ et arrivée doivent être différents'); return; }
    if (!departDate) { toast.error('Sélectionnez une date de départ'); return; }
    if (tripType === 'round_trip' && !returnDate) { toast.error('Sélectionnez une date de retour'); return; }

    setLoadingFlights(true);
    setFlightError(null);
    setOffers([]);

    const slices: any[] = [{ origin: fromCode, destination: toCode, departure_date: departDate }];
    if (tripType === 'round_trip') slices.push({ origin: toCode, destination: fromCode, departure_date: returnDate });

    const pax: any[] = [
      ...Array(adultsCount).fill({ type: 'adult' }),
      ...Array(childrenCount).fill({ type: 'child' }),
      ...Array(infantsCount).fill({ type: 'infant_without_seat' }),
    ];

    try {
      const res = await fetch(`${API_URL}/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slices, passengers: pax, cabin_class: cabinClass }),
      });
      const data = await res.json();

      if (data.success && data.data?.length > 0) {
        setOffers(data.data);
        const maxP = Math.ceil(Math.max(...data.data.map((o: any) => parseFloat(o.total_amount))) * 1.1);
        setFilters(prev => ({ ...prev, maxPrice: maxP }));
        setStep('results');
        toast.success(`${data.data.length} offre${data.data.length > 1 ? 's' : ''} trouvée${data.data.length > 1 ? 's' : ''} !`);
      } else {
        setFlightError(data.error || 'Aucun vol disponible pour ces critères');
        setStep('results');
      }
    } catch {
      setFlightError('Impossible de joindre le serveur. Vérifiez votre connexion.');
    } finally {
      setLoadingFlights(false);
    }
  };

  // Filtrage
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
      if (filters.sort === 'price') return parseFloat(a.total_amount) - parseFloat(b.total_amount);
      if (filters.sort === 'duration') return (a.slices?.[0]?.duration ?? '').localeCompare(b.slices?.[0]?.duration ?? '');
      return 0;
    });

  const handleSelectOffer = async (offer: any) => {
    setLoadingOffer(true);
    setSelectedServices([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // ⚠️  available_services n'existe PAS dans la liste de recherche.
      //     On doit fetcher l'offre individuelle avec ?services=true
      const res = await fetch(`${API_URL}/flights/offers/${offer.id}?services=true`);
      const data = await res.json();

      if (data.success && data.data) {
        setSelectedOffer(data.data);  // offre enrichie avec available_services
      } else {
        // Si le fetch échoue (offre expirée, etc.) on garde l'offre de base sans services
        setSelectedOffer(offer);
        toast.warning('Impossible de charger les extras pour ce vol');
      }
    } catch {
      setSelectedOffer(offer);
      toast.warning('Impossible de charger les extras pour ce vol');
    } finally {
      setLoadingOffer(false);
      setStep('extras');
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.some(s => s.id === serviceId)
        ? prev.filter(s => s.id !== serviceId)
        : [...prev, { id: serviceId, quantity: 1 }]
    );
  };

  const updatePassenger = (idx: number, field: keyof PassengerForm, value: string) =>
    setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));

  const validatePassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      const isAdult = i < adultsCount;
      if (!p.given_name || !p.family_name || !p.born_on || !p.phone_number || (isAdult && !p.email)) {
        toast.error(`Passager ${i + 1} : informations incomplètes`);
        return false;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (isAdult && !emailRe.test(p.email)) {
        toast.error(`Passager ${i + 1} : email invalide`);
        return false;
      }
    }
    return true;
  };

  const handlePayAndBook = async () => {
    if (!selectedOffer || !validatePassengers()) return;
    setPaying(true);
    try {
      const offerPassengers: any[] = selectedOffer.passengers ?? [];
      const mappedPax = passengers.map((p, i) => ({
        id: offerPassengers[i]?.id,
        title: p.title,
        gender: p.gender,
        given_name: p.given_name.trim(),
        family_name: p.family_name.trim(),
        born_on: p.born_on,
        email: p.email.trim(),
        phone_number: p.phone_number.trim().startsWith('+') ? p.phone_number.trim() : `+221${p.phone_number.trim()}`,
        ...(p.passport_number?.trim() ? {
          identity_documents: [{
            type: 'passport',
            unique_identifier: p.passport_number.trim(), // Duffel: unique_identifier pas "number"
            issuing_country_code: (p.passport_country || 'SN').toUpperCase(),
            expires_on: p.passport_expires || undefined,
          }],
        } : {}),
      }));

      // ── Calculer le vrai total : vol + services sélectionnés ──────────────
      const totalAmount = computeTotal(selectedOffer).toFixed(2);

      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedOfferId: selectedOffer.id,
          passengers: mappedPax,
          services: selectedServices,
          amount: totalAmount,        // ← total réel incluant les extras
          currency: selectedOffer.total_currency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedOrder(data.data);
        setStep('confirmation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const resetAll = () => {
    setStep('search'); setOffers([]); setSelectedOffer(null);
    setSelectedServices([]); setPassengers([{ ...EMPTY_PASSENGER }]);
    setConfirmedOrder(null); setFlightError(null);
    setFromValue(''); setToValue('');
    fromCodeRef.current = ''; toCodeRef.current = '';
  };

  // ── Résumé pour sidebar
  // ── Calcule le total réel : vol + services sélectionnés ──────────────────────
  const computeTotal = (offer: any): number => {
    const base = parseFloat(offer?.total_amount ?? '0');
    const extras = selectedServices.reduce((acc, ss) => {
      const svc = offer?.available_services?.find((s: any) => s.id === ss.id);
      return acc + (svc ? parseFloat(svc.total_amount) * ss.quantity : 0);
    }, 0);
    return base + extras;
  };

  const SidebarRecap = ({ offer }: { offer: any }) => {
    const currency = offer?.total_currency ?? '';
    const total = computeTotal(offer);
    const base = parseFloat(offer?.total_amount ?? '0');
    const extrasTotal = total - base;

    return (
      <div className="bg-white rounded-2xl shadow p-5 sticky top-24">
        <h3 className="font-bold mb-3">Votre sélection</h3>

        {/* Itinéraire */}
        {offer?.slices?.map((slice: any, i: number) => {
          const s0 = slice.segments?.[0]; const sN = slice.segments?.at(-1);
          return (
            <div key={i} className={`text-sm ${i > 0 ? 'mt-2 pt-2 border-t border-gray-100' : ''}`}>
              <p className="text-xs text-gray-400 uppercase font-semibold">{i === 0 ? 'Aller' : 'Retour'}</p>
              <p className="font-bold">{s0?.origin?.iata_code} → {sN?.destination?.iata_code}</p>
              <p className="text-gray-500 text-xs">{fmt.date(s0?.departing_at, { dateStyle: 'medium' })}</p>
            </div>
          );
        })}

        {/* Détail prix */}
        <div className="border-t mt-3 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vol</span>
            <span className="font-medium">{fmt.price(base, currency)}</span>
          </div>

          {/* Ligne par service sélectionné */}
          {selectedServices.map(ss => {
            const svc = offer?.available_services?.find((s: any) => s.id === ss.id);
            if (!svc) return null;
            const isSoute = svc.metadata?.type === 'checked' || svc.metadata?.baggage_type === 'checked_baggage';
            const label = `${svc.metadata?.maximum_weight_kg ? svc.metadata.maximum_weight_kg + 'kg ' : ''}${isSoute ? 'Soute' : 'Cabine'}`;
            return (
              <div key={ss.id} className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <Luggage className="w-3 h-3" /> {label}
                </span>
                <span className="font-medium text-[#A11C1C]">
                  +{fmt.price(parseFloat(svc.total_amount) * ss.quantity, currency)}
                </span>
              </div>
            );
          })}

          {/* Ligne total */}
          <div className="flex justify-between font-bold text-base pt-2 mt-1 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[#A11C1C]">{fmt.price(total, currency)}</span>
          </div>

          {extrasTotal > 0 && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Check className="w-3 h-3" /> Bagages inclus dans ce total
            </p>
          )}

          <p className="text-xs text-gray-400">
            {adultsCount + childrenCount + infantsCount} passager{adultsCount + childrenCount + infantsCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-15 pb-20 bg-gray-50">
      <section>
        <HeroCarousel
          images={heroImages} height="h-[670px]"
          title="Vols au Meilleur Prix — Réservez en Toute Sérénité"
          subtitle="Tapez le nom de votre ville · Paiement sécurisé · Support 24/7"
          ctaText="Rechercher un vol" ctaTargetId="main-content"
        />
      </section>

      <div id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <AnimatePresence mode="wait">

          {/* ════════ ÉTAPE : SEARCH ════════ */}
          {step === 'search' && (
            <motion.section key="search"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 lg:p-10 mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">Trouvez Votre Vol</h1>
              <p className="text-center text-gray-400 text-sm mb-7">Entrez une ville : Dakar, Paris, New York…</p>

              {/* Type de voyage */}
              <div className="flex gap-3 justify-center mb-6">
                {(['one_way', 'round_trip'] as const).map(t => (
                  <button key={t} onClick={() => setTripType(t)}
                    className={`px-5 py-2.5 rounded-full font-semibold border-2 text-sm transition-all ${
                      tripType === t ? 'bg-[#A11C1C] border-[#A11C1C] text-white' : 'border-gray-300 text-gray-600 hover:border-[#A11C1C]'
                    }`}
                  >
                    {t === 'one_way' ? '✈ Aller simple' : '↩ Aller-retour'}
                  </button>
                ))}
              </div>

              {/* Classe cabine */}
              <div className="flex gap-2 justify-center flex-wrap mb-7">
                {(Object.keys(CABIN_LABELS) as CabinClass[]).map(c => (
                  <button key={c} onClick={() => setCabinClass(c)}
                    className={`px-4 py-1.5 rounded-full text-xs border transition-all font-medium ${
                      cabinClass === c ? 'bg-[#A11C1C]/10 border-[#A11C1C] text-[#A11C1C] font-semibold' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {CABIN_LABELS[c]}
                  </button>
                ))}
              </div>

              {/* Départ / Arrivée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <PlaceInput
                  label="Ville / Aéroport de départ"
                  placeholder="Ex : Dakar, Paris, New York…"
                  value={fromValue}
                  codeRef={fromCodeRef}
                  onChange={setFromValue}
                  onSelect={() => {}}
                />
                <PlaceInput
                  label="Ville / Aéroport d'arrivée"
                  placeholder="Ex : Paris, Abidjan, Dubaï…"
                  value={toValue}
                  codeRef={toCodeRef}
                  onChange={setToValue}
                  onSelect={() => {}}
                />
              </div>

              {/* Dates */}
              <div className={`grid gap-4 mb-4 ${tripType === 'round_trip' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="date" value={departDate} min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDepartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] text-sm"
                    />
                  </div>
                </div>
                {tripType === 'round_trip' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de retour</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="date" value={returnDate} min={departDate}
                        onChange={e => setReturnDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Passagers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Adultes (12+)', val: adultsCount, set: setAdultsCount, min: 1, max: 9 },
                  { label: 'Enfants (2–11)', val: childrenCount, set: setChildrenCount, min: 0, max: 9 },
                  { label: 'Bébés (< 2 ans)', val: infantsCount, set: setInfantsCount, min: 0, max: adultsCount },
                ].map(({ label, val, set, min, max }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button onClick={() => set(Math.max(min, val - 1))} className="px-5 py-3 text-xl font-bold text-gray-600 hover:bg-gray-100">−</button>
                      <span className="flex-1 text-center font-bold">{val}</span>
                      <button onClick={() => set(Math.min(max, val + 1))} className="px-5 py-3 text-xl font-bold text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleSearch} disabled={loadingFlights}
                className="w-full py-4 bg-[#A11C1C] text-white text-lg font-bold rounded-xl shadow-lg hover:bg-red-700 disabled:opacity-70 flex items-center justify-center gap-3 transition-colors"
              >
                {loadingFlights
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Recherche en cours…</>
                  : <><Plane className="w-5 h-5" /> Rechercher les vols</>}
              </motion.button>
            </motion.section>
          )}

          {/* ════════ ÉTAPE : RESULTS ════════ */}
          {step === 'results' && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setStep('search')} className="flex items-center gap-2 text-gray-500 hover:text-[#A11C1C] mb-5 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" /> Modifier la recherche
              </button>
              <StepIndicator current="results" />

              {loadingFlights ? (
                <div className="bg-white rounded-2xl shadow p-20 text-center">
                  <Loader2 className="w-14 h-14 text-[#A11C1C] animate-spin mx-auto mb-4" />
                  <p className="text-xl font-bold">Comparaison en cours…</p>
                </div>
              ) : flightError ? (
                <div className="bg-red-50 rounded-2xl p-16 text-center">
                  <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-red-900 mb-2">Aucun résultat</h2>
                  <p className="text-red-700">{flightError}</p>
                  <button onClick={() => setStep('search')} className="mt-6 px-6 py-3 bg-[#A11C1C] text-white rounded-xl font-semibold text-sm">
                    Modifier la recherche
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Filtres */}
                  <aside className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow p-5 sticky top-24">
                      <h2 className="font-bold mb-4">Filtres</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Prix max</label>
                          <p className="text-xs text-[#A11C1C] font-bold mb-1">{fmt.price(filters.maxPrice, offers[0]?.total_currency ?? '')}</p>
                          <input type="range"
                            min={Math.floor(Math.min(...offers.map(o => parseFloat(o.total_amount))))}
                            max={Math.ceil(Math.max(...offers.map(o => parseFloat(o.total_amount))) * 1.1)}
                            step={1} value={filters.maxPrice}
                            onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
                            className="w-full accent-[#A11C1C]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Escales</label>
                          <select value={filters.stops} onChange={e => setFilters(f => ({ ...f, stops: e.target.value }))}
                            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                          >
                            <option value="all">Toutes</option>
                            <option value="direct">Direct uniquement</option>
                            <option value="one">Max 1 escale</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Trier par</label>
                          <select value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
                            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                          >
                            <option value="price">Meilleur prix</option>
                            <option value="duration">Durée courte</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </aside>

                  {/* Liste vols */}
                  <main className="lg:col-span-3 space-y-5">
                    <p className="text-sm text-gray-500">
                      <strong className="text-xl text-gray-900">{filteredOffers.length}</strong>{' '}
                      offre{filteredOffers.length > 1 ? 's' : ''} trouvée{filteredOffers.length > 1 ? 's' : ''}
                    </p>
                    {filteredOffers.map((offer, i) => (
                      <FlightCard key={offer.id} offer={offer} index={i}
                        showDetails={openDetails === i}
                        onToggleDetails={() => setOpenDetails(openDetails === i ? null : i)}
                        onSelect={handleSelectOffer}
                        loadingOffer={loadingOffer}
                      />
                    ))}
                    {filteredOffers.length === 0 && (
                      <div className="bg-gray-100 rounded-2xl p-14 text-center">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="font-bold">Aucun vol avec ces filtres</p>
                        <p className="text-sm text-gray-500 mt-1">Essayez d'élargir vos critères</p>
                      </div>
                    )}
                  </main>
                </div>
              )}
            </motion.div>
          )}

          {/* ════════ ÉTAPE : EXTRAS ════════ */}
          {step === 'extras' && selectedOffer && (
            <motion.div key="extras" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setStep('results')} className="flex items-center gap-2 text-gray-500 hover:text-[#A11C1C] mb-5 text-sm">
                <ArrowLeft className="w-4 h-4" /> Retour aux vols
              </button>
              <StepIndicator current="extras" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">

                  {/* ── Bagages inclus ───────────────────────────────── */}
                  {(() => {
                    // Récupérer tous les bagages inclus depuis les segments
                    const included: string[] = [];
                    selectedOffer.slices?.forEach((slice: any) => {
                      slice.segments?.forEach((seg: any) => {
                        seg.passengers?.forEach((pax: any) => {
                          pax.baggages?.forEach((b: any) => {
                            if (b.quantity > 0) {
                              const label = b.type === 'checked'
                                ? `${b.quantity}x Bagage en soute${b.quantity > 1 ? 's' : ''}`
                                : `${b.quantity}x Bagage cabine`;
                              if (!included.includes(label)) included.push(label);
                            }
                          });
                        });
                      });
                    });
                    if (included.length === 0) return null;
                    return (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                        <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" /> Bagages inclus dans votre tarif
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {included.map(label => (
                            <span key={label} className="bg-green-100 text-green-700 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                              <Luggage className="w-3.5 h-3.5" /> {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* ── Services payants ─────────────────────────────── */}
                  <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                      <Luggage className="w-5 h-5 text-[#A11C1C]" /> Bagages supplémentaires
                    </h2>

                    {(selectedOffer.available_services?.filter((s: any) => s.type === 'baggage') ?? []).length > 0 ? (
                      <div className="space-y-3">
                        {selectedOffer.available_services
                          .filter((s: any) => s.type === 'baggage')
                          .map((svc: any) => {
                            const selected = selectedServices.some(s => s.id === svc.id);
                            const isSoute = svc.metadata?.type === 'checked' || svc.metadata?.baggage_type === 'checked_baggage';
                            return (
                              <button key={svc.id} onClick={() => toggleService(svc.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                                  selected ? 'border-[#A11C1C] bg-[#A11C1C]/5' : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'bg-[#A11C1C] border-[#A11C1C]' : 'border-gray-300'}`}>
                                    {selected && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm">
                                      {svc.metadata?.maximum_weight_kg ? `${svc.metadata.maximum_weight_kg}kg — ` : ''}
                                      {isSoute ? 'Bagage en soute' : 'Bagage cabine'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {svc.passenger_ids?.length ? `Pour ${svc.passenger_ids.length} passager(s)` : 'Par passager'}
                                      {svc.metadata?.maximum_length_cm
                                        ? ` · ${svc.metadata.maximum_length_cm}×${svc.metadata.maximum_width_cm}×${svc.metadata.maximum_depth_cm} cm`
                                        : ''}
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
                        <p className="text-sm font-medium text-gray-500">
                          Pas de bagage supplémentaire disponible pour ce vol
                        </p>
                        <p className="text-xs mt-1 text-gray-400">
                          Cette compagnie ne propose pas d'extras via Duffel pour ce trajet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <SidebarRecap offer={selectedOffer} />
                  <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep('passengers')}
                    className="w-full mt-4 py-3.5 bg-[#A11C1C] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ ÉTAPE : PASSENGERS ════════ */}
          {step === 'passengers' && (
            <motion.div key="passengers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setStep('extras')} className="flex items-center gap-2 text-gray-500 hover:text-[#A11C1C] mb-5 text-sm">
                <ArrowLeft className="w-4 h-4" /> Retour aux extras
              </button>
              <StepIndicator current="passengers" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  {passengers.map((p, idx) => {
                    const isAdult = idx < adultsCount;
                    const label = isAdult ? 'Adulte' : idx < adultsCount + childrenCount ? 'Enfant' : 'Bébé';
                    return (
                      <div key={idx} className="bg-white rounded-2xl shadow p-6">
                        <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                          <User className="w-5 h-5 text-[#A11C1C]" />
                          Passager {idx + 1} — <span className="text-[#A11C1C] font-bold">{label}</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Titre</label>
                            <select value={p.title} onChange={e => updatePassenger(idx, 'title', e.target.value)}
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            >
                              <option value="mr">M.</option><option value="ms">Mme</option>
                              <option value="mrs">Mme (marié)</option><option value="miss">Mlle</option><option value="dr">Dr</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Genre</label>
                            <select value={p.gender} onChange={e => updatePassenger(idx, 'gender', e.target.value)}
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            >
                              <option value="m">Masculin</option><option value="f">Féminin</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Prénom *</label>
                            <input value={p.given_name} onChange={e => updatePassenger(idx, 'given_name', e.target.value)}
                              placeholder="Comme sur le passeport"
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Nom *</label>
                            <input value={p.family_name} onChange={e => updatePassenger(idx, 'family_name', e.target.value)}
                              placeholder="Comme sur le passeport"
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Date de naissance *</label>
                            <input type="date" value={p.born_on} onChange={e => updatePassenger(idx, 'born_on', e.target.value)}
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            />
                          </div>
                          {isAdult && (
                            <div>
                              <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1"><Mail className="w-3 h-3" /> Email *</label>
                              <input type="email" value={p.email} onChange={e => updatePassenger(idx, 'email', e.target.value)}
                                placeholder="prenom@exemple.com"
                                className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                              />
                            </div>
                          )}
                          <div className={!isAdult ? 'col-span-2' : ''}>
                            <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1"><Phone className="w-3 h-3" /> Téléphone *</label>
                            <input type="tel" value={p.phone_number} onChange={e => updatePassenger(idx, 'phone_number', e.target.value)}
                              placeholder="+221 77 000 00 00"
                              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                            />
                          </div>
                        </div>

                        {/* Passeport */}
                        <div className="mt-5 pt-4 border-t border-gray-100">
                          <p className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
                            <FileText className="w-4 h-4" /> Document de voyage (recommandé pour les vols internationaux)
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'N° Passeport', field: 'passport_number' as const, placeholder: 'AB123456', type: 'text' },
                              { label: 'Pays émetteur', field: 'passport_country' as const, placeholder: 'SN', type: 'text' },
                              { label: 'Expiration', field: 'passport_expires' as const, placeholder: '', type: 'date' },
                            ].map(({ label, field, placeholder, type }) => (
                              <div key={field}>
                                <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                                <input type={type} value={p[field]} placeholder={placeholder}
                                  onChange={e => updatePassenger(idx, field, e.target.value)}
                                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#A11C1C]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <SidebarRecap offer={selectedOffer} />
                  <motion.button whileHover={{ scale: 1.02 }}
                    onClick={() => { if (validatePassengers()) setStep('payment'); }}
                    className="w-full mt-4 py-3.5 bg-[#A11C1C] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Passer au paiement <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ ÉTAPE : PAYMENT ════════ */}
          {step === 'payment' && selectedOffer && (
            <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setStep('passengers')} className="flex items-center gap-2 text-gray-500 hover:text-[#A11C1C] mb-5 text-sm">
                <ArrowLeft className="w-4 h-4" /> Retour aux passagers
              </button>
              <StepIndicator current="payment" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#A11C1C]" /> Paiement sécurisé</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
                      <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Mode test Duffel — aucun débit réel
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Le paiement est simulé via le solde Duffel Test (illimité).</p>
                    </div>
                    {/* Champs CB décoratifs (mode test) */}
                    <div className="space-y-4 opacity-50 pointer-events-none select-none">
                      {[
                        { label: 'Numéro de carte', val: '4242 4242 4242 4242' },
                        { label: 'Expiration', val: '12 / 28' },
                        { label: 'CVC', val: '123' },
                      ].map(f => (
                        <div key={f.label}>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">{f.label}</label>
                          <input readOnly defaultValue={f.val} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Conditions tarifaires</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Confirmation instantanée</li>
                      <li className="flex items-start gap-2">
                        {selectedOffer.conditions?.change_before_departure?.allowed
                          ? <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          : <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                        Modification avant départ : {selectedOffer.conditions?.change_before_departure?.allowed ? 'Autorisée' : 'Non autorisée'}
                      </li>
                      <li className="flex items-start gap-2">
                        {selectedOffer.conditions?.refund_before_departure?.allowed
                          ? <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          : <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                        Remboursement avant départ : {selectedOffer.conditions?.refund_before_departure?.allowed ? 'Autorisé' : 'Non autorisé'}
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <SidebarRecap offer={selectedOffer} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handlePayAndBook} disabled={paying}
                    className="w-full mt-4 py-4 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {paying
                      ? <><Loader2 className="w-5 h-5 animate-spin" /> Traitement…</>
                      : <><CreditCard className="w-5 h-5" /> Confirmer et payer</>}
                  </motion.button>
                  <p className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Paiement 100 % sécurisé
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ ÉTAPE : CONFIRMATION ════════ */}
          {step === 'confirmation' && confirmedOrder && (
            <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <StepIndicator current="confirmation" />

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-6 text-white text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-extrabold mb-2">Réservation Confirmée !</h1>
                <p className="text-green-100">Votre billet a été émis avec succès</p>
                <div className="mt-5 bg-white/20 rounded-xl px-8 py-4 inline-block">
                  <p className="text-xs opacity-70 mb-0.5">Référence de réservation</p>
                  <p className="text-3xl font-mono font-extrabold tracking-widest">{confirmedOrder.bookingReference}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Itinéraire */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Ticket className="w-5 h-5 text-[#A11C1C]" /> Itinéraire</h2>
                  {confirmedOrder.slices?.map((slice: any, i: number) => {
                    const s0 = slice.segments?.[0]; const sN = slice.segments?.at(-1);
                    return (
                      <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-dashed border-gray-200' : ''}>
                        {confirmedOrder.slices.length > 1 && (
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-2">{i === 0 ? '▶ Aller' : '◀ Retour'}</p>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{fmt.time(s0?.departing_at)}</p>
                            <p className="font-semibold text-sm">{s0?.origin?.iata_code}</p>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="w-full h-0.5 bg-gray-200 relative">
                              <Plane className="w-3 h-3 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{fmt.time(sN?.arriving_at)}</p>
                            <p className="font-semibold text-sm">{sN?.destination?.iata_code}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">{fmt.date(s0?.departing_at, { dateStyle: 'full' })}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Passagers + montant */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-[#A11C1C]" /> Passagers</h2>
                  <div className="space-y-2 mb-4">
                    {confirmedOrder.passengers?.map((p: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-[#A11C1C]/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-[#A11C1C]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{p.given_name} {p.family_name}</p>
                          <p className="text-xs text-gray-400 capitalize">{p.type?.replace('_', ' ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Montant payé</span>
                      <span className="text-2xl font-extrabold text-[#A11C1C]">
                        {fmt.price(confirmedOrder.totalAmount, confirmedOrder.totalCurrency)}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Check className="w-3 h-3" /> Paiement confirmé</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    { icon: <Mail className="w-7 h-7 text-blue-600" />, bg: 'bg-blue-50', title: 'Email de confirmation', desc: `Envoyé à ${passengers[0]?.email || '…'}` },
                    { icon: <Ticket className="w-7 h-7 text-green-600" />, bg: 'bg-green-50', title: 'Référence', desc: confirmedOrder.bookingReference },
                    { icon: <Clock className="w-7 h-7 text-orange-600" />, bg: 'bg-orange-50', title: 'Check-in', desc: '24–48h avant départ' },
                  ].map(({ icon, bg, title, desc }) => (
                    <div key={title} className={`flex flex-col items-center text-center p-4 ${bg} rounded-xl`}>
                      {icon}
                      <p className="font-semibold text-sm mt-2">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-mono">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* ── Billet électronique ─────────────────────────── */}
                <div className="mb-5">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#A11C1C]" /> Billet électronique
                  </p>

                  {/* Numéros e-ticket Duffel si présents */}
                  {confirmedOrder.documents?.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-3">
                      <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wide">N° de billet</p>
                      {confirmedOrder.documents.map((doc: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                          <span className="text-xs bg-[#A11C1C]/10 text-[#A11C1C] px-2 py-0.5 rounded font-semibold">
                            {doc.type === 'electronic_ticket' ? 'e-Ticket' : doc.type}
                          </span>
                          <span className="font-mono font-bold text-sm">{doc.unique_identifier ?? '—'}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bouton téléchargement billet généré */}
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      // Ouvre le billet HTML dans un nouvel onglet → l'user fait Ctrl+P → Enregistrer PDF
                      window.open(`${API_URL}/bookings/${confirmedOrder.orderId}/ticket`, '_blank');
                    }}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#A11C1C]/5 to-red-50 border-2 border-[#A11C1C]/20 hover:border-[#A11C1C] rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#A11C1C] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm group-hover:text-[#A11C1C] transition-colors">
                          Télécharger le billet électronique
                        </p>
                        <p className="text-xs text-gray-500">
                          Ouvre dans un nouvel onglet → Imprimer → Enregistrer en PDF
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#A11C1C] transition-colors flex-shrink-0" />
                  </motion.button>

                  {confirmedOrder.orderId && (
                    <p className="text-xs text-center text-gray-400 mt-2">
                      Référence commande : <span className="font-mono">{confirmedOrder.orderId}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.02 }} onClick={resetAll}
                    className="px-6 py-3 bg-[#A11C1C] text-white rounded-xl font-semibold flex items-center gap-2 justify-center text-sm"
                  >
                    <Plane className="w-4 h-4" /> Nouvelle recherche
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}