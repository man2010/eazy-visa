// app/destinations/dakar-new-york/DakarNewYorkClient.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { toast } from 'sonner';
import HeroCarousel from '@/components/HeroCarousel';
import FlightResultsModal from '@/components/FlightResultsModal';
import {
  Plane,
  Clock,
  MapPin,
  CreditCard,
  Star,
  ShieldCheck,
  Users,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { API_URL } from '@/lib/config';

export default function DakarNewYorkClient() {
  // ── Dates helpers ─────────────────────────────────────────────────────────
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getNextWeekDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  // ── Flight form state ──────────────────────────────────────────────────────
  const [flightData, setFlightData] = useState({
    tripType: 'one_way' as 'one_way' | 'round_trip',
    from: '',
    fromCode: '',
    to: '',
    toCode: '',
    departDate: getNextWeekDate(),
    returnDate: '',
    passengers: 1,
  });

  // ── Autocompletion ─────────────────────────────────────────────────────────
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions]     = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef   = useRef<HTMLInputElement>(null);
  const fromTimer    = useRef<ReturnType<typeof setTimeout>>();
  const toTimer      = useRef<ReturnType<typeof setTimeout>>();

  const searchLocations = (keyword: string, field: 'from' | 'to') => {
    const setList = field === 'from' ? setFromSuggestions : setToSuggestions;
    if (keyword.trim().length < 2) { setList([]); return; }

    clearTimeout(field === 'from' ? fromTimer.current : toTimer.current);
    const t = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res  = await fetch(`${API_URL}/flights/locations?query=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        setList(data.success && data.data?.length ? data.data : []);
      } catch {
        setList([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 280);

    if (field === 'from') fromTimer.current = t;
    else toTimer.current = t;
  };

  const selectLocation = (sug: any, field: 'from' | 'to') => {
    const label = `${sug.city_name} (${sug.iata_code})`;
    if (field === 'from') {
      setFlightData(prev => ({ ...prev, from: label, fromCode: sug.iata_code }));
      setFromSuggestions([]);
      toInputRef.current?.focus();
    } else {
      setFlightData(prev => ({ ...prev, to: label, toCode: sug.iata_code }));
      setToSuggestions([]);
    }
  };

  // ── Modal state ────────────────────────────────────────────────────────────
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    tripType: 'one_way' | 'round_trip';
    departDate: string;
    returnDate: string | null;
    passengers: number;
  } | null>(null);

  // ── Validation + search ────────────────────────────────────────────────────
  const handleSearch = () => {
    if (!flightData.fromCode || !flightData.toCode) {
      toast.error('Veuillez sélectionner les villes dans la liste déroulante', {
        description: !flightData.fromCode
          ? 'Choisissez une ville de départ dans les suggestions'
          : 'Choisissez une ville d\'arrivée dans les suggestions',
      });
      return;
    }
    if (!flightData.departDate) {
      toast.error('Sélectionnez une date de départ');
      return;
    }
    if (flightData.tripType === 'round_trip' && !flightData.returnDate) {
      toast.error('Sélectionnez une date de retour');
      return;
    }

    const departDate = new Date(flightData.departDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (departDate < today) {
      toast.error('Date invalide', { description: 'La date de départ doit être dans le futur' });
      return;
    }
    if (flightData.returnDate) {
      const returnDate = new Date(flightData.returnDate);
      if (returnDate < departDate) {
        toast.error('Date invalide', { description: 'La date de retour doit être après la date de départ' });
        return;
      }
    }

    setSearchParams({
      from:       flightData.from,
      fromCode:   flightData.fromCode,
      to:         flightData.to,
      toCode:     flightData.toCode,
      tripType:   flightData.tripType,
      departDate: flightData.departDate,
      returnDate: flightData.tripType === 'round_trip' ? (flightData.returnDate || null) : null,
      passengers: flightData.passengers,
    });
    setIsFlightModalOpen(true);
    toast.success('Recherche lancée !', { description: 'Chargement des vols disponibles Dakar → New York...' });
  };

  // ── Static content (unchanged) ─────────────────────────────────────────────
  const heroImages = [
    'https://images.unsplash.com/photo-1543716091-a840c05249ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
  ];

  const flightInfos = [
    { title: 'Durée moyenne', value: '11h – 15h (avec escale)', icon: Clock },
    { title: 'Prix dès', value: '550 000 FCFA', icon: MapPin },
    { title: 'Compagnies principales', value: 'Delta, Air France, TAP Air Portugal, Turkish Airlines', icon: Plane },
    { title: 'Paiement accepté', value: 'Wave, Orange Money, Carte, Cash agence', icon: CreditCard },
  ];

  const advantages = [
    {
      icon: ShieldCheck,
      title: 'Réservation sécurisée',
      desc: 'Confirmation immédiate – e-ticket envoyé par email & WhatsApp',
    },
    {
      icon: Users,
      title: 'Support local 24/7',
      desc: 'Équipe basée à Dakar – appel, WhatsApp ou visite en agence',
    },
    {
      icon: Star,
      title: 'Meilleur prix garanti',
      desc: 'Nous égalons ou battons tout tarif équivalent – sinon on rembourse la différence',
    },
  ];

  const testimonials = [
    {
      name: 'Sokhna Mbengue',
      role: 'Étudiante aux USA',
      content:
        'Mon billet Dakar-New York pour 580 000 FCFA aller simple via Paris. Paiement en 3 fois avec Orange Money. L\'équipe m\'a aidée pour les formalités ESTA. Vraiment parfait !',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Mamadou Ba',
      role: 'Consultant',
      content:
        'Voyages fréquents vers New York pour le travail. Les prix sont toujours très compétitifs et le suivi est exceptionnel. Je ne change plus de prestataire.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
  ];

  const faqItems = [
    {
      question: 'Y a-t-il des vols directs Dakar-New York ?',
      answer:
        'Non, pas de vol direct actuellement. Les meilleures options passent par Paris (Air France), Lisbonne (TAP), Istanbul (Turkish) ou Casablanca. Durée totale entre 11h et 15h selon l\'escale.',
    },
    {
      question: 'Quel visa ou autorisation pour les États-Unis depuis le Sénégal ?',
      answer:
        'Un visa B1/B2 ou ESTA (si éligible) est obligatoire. Nous pouvons vous orienter vers les démarches ou vous accompagner pour la prise de rendez-vous à l\'ambassade.',
    },
    {
      question: 'Quand réserver pour obtenir le meilleur prix ?',
      answer:
        'Idéalement 3 à 6 mois à l\'avance. Les mois de janvier à avril et septembre à novembre sont souvent les plus avantageux.',
    },
    {
      question: 'Comment recevoir mon billet électronique ?',
      answer:
        'Immédiatement après paiement : e-ticket + instructions envoyés par email et WhatsApp. Possibilité de récupérer une version imprimée en agence si vous le souhaitez.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="relative">
        <HeroCarousel
          images={heroImages}
          height="h-[730px]"
          title="Dakar → New York"
          subtitle="Vols dès 550 000 FCFA – Meilleures escales – Paiement Wave, Orange Money ou en agence"
          ctaText="Rechercher un vol maintenant"
          ctaTargetId="search-section"
        />
      </section>

      {/* ── Search form (identical to homepage) ── */}
      <section id="search-section" className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-4 sm:mb-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent">
                Trouvez votre vol Dakar – New York
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Le meilleur prix, toujours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* ── Trip type selector ── */}
              <div className="flex items-center gap-2">
                {[
                  { key: 'one_way',    label: '✈ Aller simple'  },
                  { key: 'round_trip', label: '↩ Aller-retour'  },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFlightData(prev => ({
                      ...prev,
                      tripType: opt.key as 'one_way' | 'round_trip',
                      returnDate: opt.key === 'one_way' ? '' : prev.returnDate,
                    }))}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border-2 ${
                      flightData.tripType === opt.key
                        ? 'bg-[#A11C1C] text-white border-[#A11C1C] shadow'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#A11C1C] hover:text-[#A11C1C]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                {/* ── FROM ── */}
                <div className="lg:col-span-1 relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="dny-departure-input">
                    Départ
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="dny-departure-input"
                      ref={fromInputRef}
                      type="text"
                      value={flightData.from}
                      onChange={(e) => {
                        setFlightData(prev => ({ ...prev, from: e.target.value, fromCode: '' }));
                        searchLocations(e.target.value, 'from');
                      }}
                      placeholder="Ex: Dakar, Paris…"
                      autoComplete="off"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all ${
                        flightData.fromCode ? 'border-green-400 bg-green-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {fromSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-72 overflow-y-auto"
                      >
                        {fromSuggestions.map((sug, i) => (
                          <button
                            key={`from-${sug.iata_code}-${i}`}
                            onMouseDown={(e) => { e.preventDefault(); selectLocation(sug, 'from'); }}
                            className="w-full text-left px-4 py-3 hover:bg-[#A11C1C]/5 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                            type="button"
                          >
                            <Plane className="w-4 h-4 text-[#A11C1C] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {sug.city_name}
                                <span className="ml-2 text-xs font-mono font-bold text-[#A11C1C] bg-[#A11C1C]/10 px-1.5 py-0.5 rounded">
                                  {sug.iata_code}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {sug.type === 'city' ? 'Tous les aéroports' : sug.name} · {sug.country_code}
                              </p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── TO ── */}
                <div className="lg:col-span-1 relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="dny-arrival-input">
                    Arrivée
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="dny-arrival-input"
                      ref={toInputRef}
                      type="text"
                      value={flightData.to}
                      onChange={(e) => {
                        setFlightData(prev => ({ ...prev, to: e.target.value, toCode: '' }));
                        searchLocations(e.target.value, 'to');
                      }}
                      placeholder="Ex: New York, Los Angeles…"
                      autoComplete="off"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all ${
                        flightData.toCode ? 'border-green-400 bg-green-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {toSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-72 overflow-y-auto"
                      >
                        {toSuggestions.map((sug, i) => (
                          <button
                            key={`to-${sug.iata_code}-${i}`}
                            onMouseDown={(e) => { e.preventDefault(); selectLocation(sug, 'to'); }}
                            className="w-full text-left px-4 py-3 hover:bg-[#A11C1C]/5 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                            type="button"
                          >
                            <Plane className="w-4 h-4 text-[#A11C1C] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {sug.city_name}
                                <span className="ml-2 text-xs font-mono font-bold text-[#A11C1C] bg-[#A11C1C]/10 px-1.5 py-0.5 rounded">
                                  {sug.iata_code}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {sug.type === 'city' ? 'Tous les aéroports' : sug.name} · {sug.country_code}
                              </p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Depart date ── */}
                <div className="lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Date de départ
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="date"
                      value={flightData.departDate}
                      min={getTodayDate()}
                      onChange={(e) => setFlightData({ ...flightData, departDate: e.target.value })}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* ── Return date ── */}
                <div className={`lg:col-span-1 transition-all ${flightData.tripType === 'one_way' ? 'opacity-40 pointer-events-none' : ''}`}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Date de retour {flightData.tripType === 'round_trip' && <span className="text-[#A11C1C]">*</span>}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="date"
                      value={flightData.returnDate}
                      min={flightData.departDate}
                      disabled={flightData.tripType === 'one_way'}
                      onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* ── Passengers + buttons ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Passagers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      value={flightData.passengers}
                      onChange={(e) => setFlightData({ ...flightData, passengers: parseInt(e.target.value) })}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} passager{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="py-2 sm:py-3 bg-[#A11C1C] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                >
                  Rechercher
                </motion.button>

                {/* ── WhatsApp devis button ── */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const tripLabel = flightData.tripType === 'round_trip' ? 'Aller-retour' : 'Aller simple';
                    const from   = flightData.from || 'Non renseigné';
                    const to     = flightData.to   || 'Non renseigné';
                    const depart = flightData.departDate || 'Non renseignée';
                    const retour = flightData.tripType === 'round_trip' && flightData.returnDate
                      ? flightData.returnDate : null;
                    const pax = flightData.passengers;

                    const msg = [
                      `Bonjour Eazy-Visa 👋, je souhaite obtenir un devis pour le vol suivant :`,
                      ``,
                      `✈️ *Type de trajet :* ${tripLabel}`,
                      `🛫 *Départ :* ${from}`,
                      `🛬 *Arrivée :* ${to}`,
                      `📅 *Date de départ :* ${depart}`,
                      retour ? `📅 *Date de retour :* ${retour}` : null,
                      `👥 *Nombre de passagers :* ${pax}`,
                      ``,
                      `Merci de me faire une offre au meilleur prix 🙏`,
                    ].filter(Boolean).join('\n');

                    window.open(`https://wa.me/221767673838?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="py-2 sm:py-3 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                  aria-label="Demander un devis par WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Demande de devis
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Infos vol clés */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">Vols Dakar - New York</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16">
          Trouvez les meilleurs vols Dakar - New York avec Eazy-Visa. Des tarifs compétitifs, des compagnies aériennes fiables, et un service client 24/7.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {flightInfos.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md text-center border border-gray-100"
            >
              <item.icon className="w-9 h-9 md:w-10 md:h-10 text-[#A11C1C] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-gradient-to-br from-[#A11C1C]/5 to-[#f8f1f1] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Pourquoi réserver Dakar-New York avec Eazy-Visa ?
          </h2>
          <div className="grid md:grid-cols-3 gap-7 md:gap-9">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-7 md:p-9 shadow-lg text-center"
              >
                <adv.icon className="w-12 h-12 md:w-14 md:h-14 text-[#A11C1C] mx-auto mb-5" />
                <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                <p className="text-gray-600 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
          Nos voyageurs vers New York témoignent
        </h2>
        <div className="grid md:grid-cols-2 gap-7 md:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-2xl p-7 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src={t.image}
                  alt={t.name}
                  className="rounded-full object-cover border-2 border-[#A11C1C]/20"
                  width={56}
                  height={56}
                />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">"{t.content}"</p>
              <div className="flex">
                {Array(5).fill(0).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Questions fréquentes – Vols Dakar New York
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-sm group"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg">
                  {item.question}
                  <ChevronRight className="w-6 h-6 transition-transform group-open:rotate-90 text-[#A11C1C]" />
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">{item.answer}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#A11C1C] to-[#c0392b] rounded-3xl p-10 md:p-16 text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à découvrir New York ?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95">
            Meilleurs tarifs via Paris/Lisbonne/Istanbul, paiement local, assistance 24/7
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 md:px-14 py-5 bg-white text-[#A11C1C] rounded-xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Rechercher mon vol maintenant
          </button>
        </motion.div>
      </section>

      <FlightResultsModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        searchParams={searchParams}
      />
    </div>
  );
}