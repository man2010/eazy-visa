'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
// ── composants privés
import HeroCarousel from '@/components/HeroCarousel';
import FlightResultsModal from '@/components/FlightResultsModal';
import CorporateDevisModal from '@/components/CorporateDevisModal';

// ── icônes
import {
  Search, Calendar, Users, MapPin,
  Plane, Clock, Shield,
  CreditCard, Headphones,
  CheckCircle, Star, TrendingUp,
  Building2, ArrowRight, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
// ── utils / config
import { API_URL } from '@/lib/config';

export default function HomePage() {

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getNextWeekDate = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  };

  const router = useRouter();

  const [flightData, setFlightData] = useState({
    tripType: 'one_way' as 'one_way' | 'round_trip',
    from: '',
    fromCode: '',   // code IATA sélectionné via dropdown
    to: '',
    toCode: '',     // code IATA sélectionné via dropdown
    departDate: getNextWeekDate(),
    returnDate: '',
    passengers: 1,
  });

  // ── Autocomplétion ────────────────────────────────────────────────────────────
  // Format retourné par /api/flights/locations (Duffel) :
  //   { iata_code, name, city_name, country_code, type, label }
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef   = useRef<HTMLInputElement>(null);
  const fromTimer    = useRef<ReturnType<typeof setTimeout>>();
  const toTimer      = useRef<ReturnType<typeof setTimeout>>();

  // Recherche avec debounce 280ms — appel vers notre route Duffel
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

  // Sélection d'une suggestion : stocke le label lisible ET le code IATA
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

  // ── Modal ─────────────────────────────────────────────────────────────────────
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
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

  // ── Contenu statique (inchangé) ───────────────────────────────────────────────
  const heroImages = [
    '/image2.jpg',
    '/image4.jpg',
    '/image5.webp',
  ];

  const stats = [
    { label: 'Clients servis', value: '10,000+', icon: Users },
    { label: 'Clients satisfaits', value: '98%', icon: Star },
    { label: 'Destinations', value: '1,200+', icon: MapPin },
    { label: 'Support 24/7', value: '7j/7', icon: Clock },
  ];

  const steps = [
    {
      icon: Search,
      title: 'Recherche en 10s',
      description: 'Compare les meilleures offres en ligne ou avec un conseiller. Les prix sont transparents, mis à jour en temps réel, sans frais cachés.',
      tip: '💡 Notre promesse : toujours moins cher, toujours clair.'
    },
    {
      icon: Calendar,
      title: 'Réservation',
      description: 'Bloque ton tarif en quelques clics, 24h/24, 7j/7. Pas besoin d\'attendre qu\'une agence ouvre.',
      tip: ''
    },
    {
      icon: CreditCard,
      title: 'Paiement Flexible',
      description: 'Tu choisis comment régler : en ligne par Wave, Orange Money, carte bancaire, ou directement à notre siège à Keur Gorgui.',
      tip: '🔒 Toutes les transactions sont 100% sécurisées.'
    },
    {
      icon: Headphones,
      title: 'Assistance H24',
      description: 'La plupart des agences ferment à 18h. Nous, non. Quand ton vol change, s\'annule ou que tu paniques à 23h, nous sommes là.',
      tip: '🕓 Le monde ne dort pas — nous non plus.'
    },
    {
      icon: Plane,
      title: 'Embarquement — L\'esprit tranquille',
      description: 'Tu voyages sereinement, avec la certitude d\'avoir obtenu le meilleur prix avec un service premium.',
      tip: ''
    },
    {
      icon: Star,
      title: 'Expérience — Voyage, partage et gagne',
      description: 'Télécharge notre application et cumule des points de fidélité à chaque vol. Partage ton expérience et gagne des réductions.',
      tip: ''
    },
  ];

  const testimonials = [
    {
      name: 'Thierno Abdoul Kamim Ba',
      role: 'Logisticien',
      content: 'J\'ai beaucoup apprécié la disponibilité et les conseils sincères de l\'équipe, qui m\'ont vraiment poussé à m\'engager avec Eazy-Visa. Je recommande les yeux fermés. J\'en ai déjà parlé à plusieurs amis !',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Adrienne Gomis',
      role: 'Etudiante',
      content: 'Bonjour tout le monde. J\'ai reçu mon visa aujourd\'hui. Je rends grâce à Dieu à lui toute la gloire. Mes sincères remerciements à mr Diallo et à toute l\'équipe easy visa. Et souhaite une bonne chance aux autres',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Sofie Diagne',
      role: 'Infirmière',
      content: 'Je devais voyager pour mes études et j\'étais perdue avec toutes les démarches. Eazy-Visa m\'a accompagnée à chaque étape, avec patience et bienveillance. Franchement, je me suis sentie entre de bonnes mains.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Mohamed Sarr',
      role: 'Infirmier',
      content: 'Je devais voyager pour mes études et j\'étais perdu avec toutes les démarches. Eazy-Visa m\'a accompagné à chaque étape, avec patience et bienveillance. Franchement, je me suis senti entre de bonnes mains.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const destinations = [
    { name: 'Dubaï', country: 'Émirats arabes unis', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzY1OTUxOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2NTkzMzgxMnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eXxlbnwxfHx8fDE3NjU5NDg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NTk0NjgwNnww&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const team = [
    {
      name: 'Bertrand Gopele',
      role: 'Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Ndeye Fatou Hann',
      role: 'Responsable Marketing',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Khadijatou Kane',
      role: 'Apporteur d\'affaires',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
  ];

  const faqItems = [
    {
      question: 'Que signifie notre concept "One Stop Shop" ?',
      answer: 'C\'est simple : un guichet unique pour tous vos besoins liés au voyage. Chez Eazy-Visa, vous pouvez : faire la copie ou impression de vos documents 📄, prendre une photo d\'identité professionnelle 📸, réserver votre hôtel et assurance voyage 🏨, payer en cash grâce à notre partenariat avec Wave 💸, et bien sûr, acheter votre billet d\'avion au meilleur prix, avec un service premium et personnalisé.'
    },
    {
      question: 'Quels sont nos autres services?',
      answer: 'Nous offrons une gamme complète de services : demande de visa pour l\'Allemagne, vente de billets d\'avions, assurance voyage, réservation d\'hôtels, cours d\'allemand, et accompagnement complet pour votre installation en Allemagne.'
    },
    {
      question: 'Pourquoi nous choisir ?',
      answer: '5+ années d\'expérience, prix transparents et compétitifs, service client 24/7, paiement flexible (Wave, Orange Money, carte bancaire), et un accompagnement personnalisé de A à Z.'
    },
  ];

  // ── Validation + ouverture du modal ──────────────────────────────────────────
  const [isSending, setIsSending] = useState(false);
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
    toast.success('Recherche lancée !', { description: 'Chargement des vols disponibles...' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative pt-15 pb-12">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title={"Arrêtez de Payer Trop Cher. Voyagez Plus."}
            subtitle={"Le meilleur prix garanti, un service 24/7, et des milliers de voyageurs satisfaits. Votre prochaine aventure commence ici."}
            ctaText="En savoir plus"
            ctaTargetId="/a-propos"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-4 sm:mb-6"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent">
                  Ton voyage commence ici.
                </h1>
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
                {/* ── Sélecteur type de trajet ── */}
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

                  {/* ── FROM : Départ avec autocomplétion Duffel ── */}
                  <div className="lg:col-span-1 relative">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="departure-input">
                      Départ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                      <input
                        id="departure-input"
                        ref={fromInputRef}
                        type="text"
                        value={flightData.from}
                        onChange={(e) => {
                          setFlightData(prev => ({ ...prev, from: e.target.value, fromCode: '' }));
                          searchLocations(e.target.value, 'from');
                        }}
                        placeholder="Ex: Dakar, Paris…"
                        aria-label="Ville de départ"
                        autoComplete="off"
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all ${
                          flightData.fromCode ? 'border-green-400 bg-green-50' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    {/* Dropdown suggestions FROM */}
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
                              <Plane className="w-4 h-4 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
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

                  {/* ── TO : Arrivée avec autocomplétion Duffel ── */}
                  <div className="lg:col-span-1 relative">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="arrival-input">
                      Arrivée
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                      <input
                        id="arrival-input"
                        ref={toInputRef}
                        type="text"
                        value={flightData.to}
                        onChange={(e) => {
                          setFlightData(prev => ({ ...prev, to: e.target.value, toCode: '' }));
                          searchLocations(e.target.value, 'to');
                        }}
                        placeholder="Ex: Paris, Dubai…"
                        aria-label="Ville d'arrivée"
                        autoComplete="off"
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all ${
                          flightData.toCode ? 'border-green-400 bg-green-50' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    {/* Dropdown suggestions TO */}
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
                              <Plane className="w-4 h-4 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
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

                  {/* ── Date départ (inchangé) ── */}
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

                  {/* ── Date retour : visible seulement si aller-retour ── */}
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

                {/* ── Passagers + boutons ── */}
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

                  {/* ── BOUTON DEMANDE DE DEVIS WHATSAPP ── */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const tripLabel = flightData.tripType === 'round_trip' ? 'Aller-retour' : 'Aller simple';
                      const from = flightData.from || 'Non renseigné';
                      const to = flightData.to || 'Non renseigné';
                      const depart = flightData.departDate || 'Non renseignée';
                      const retour = flightData.tripType === 'round_trip' && flightData.returnDate
                        ? flightData.returnDate
                        : null;
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

                      const url = `https://wa.me/221767673838?text=${encodeURIComponent(msg)}`;
                      window.open(url, '_blank');
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
        </div>
      </section>

      {/* ════ Stats Section (inchangé) ════ */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              7/24 — notre promesse, pas un slogan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5+ années d'expérience dans la billetterie. Ce n'est pas qu'une billetterie, c'est une passerelle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-4"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-[#A11C1C] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Journey Steps (inchangé) ════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              L'expérience de voyage la plus simple du Sénégal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Réserver un vol devrait être simple, rapide et abordable. Avec nous, tu compares, réserves et voyages — sans jamais payer pour une simple réservation.
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 w-24 h-24 rounded-full bg-[#A11C1C] flex items-center justify-center"
                >
                  <step.icon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  {step.tip && <p className="text-[#A11C1C] font-medium">{step.tip}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Corporate Section (inchangé) ════ */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-block px-4 py-2 bg-[#A11C1C]/20 rounded-full text-[#A11C1C] mb-4">
                <Building2 className="w-5 h-5 inline mr-2" />Corporate
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Eazy-Visa Corporate</h2>
              <p className="text-xl mb-4 text-gray-300">Le futur du voyage d'affaires made in Africa.</p>
              <p className="text-gray-400 mb-8">
                Une plateforme tout-en-un pour gérer vos déplacements, maîtriser vos coûts et garantir la sécurité de vos collaborateurs. Pensée pour les PME, ONG et groupes internationaux présents en Afrique.
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsCorporateModalOpen(true)}
                className="px-8 py-4 bg-[#A11C1C] rounded-lg font-semibold inline-flex items-center gap-2">
                En savoir plus <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-6">
              {[
                { title: 'Gestion centralisée', icon: Building2 },
                { title: 'Suivi & optimisation des coûts', icon: TrendingUp },
                { title: 'Paiements flexibles & locaux', icon: CreditCard },
                { title: 'Transparence & sécurité totale', icon: Shield },
              ].map((feature, index) => (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <feature.icon className="w-10 h-10 mx-auto mb-3 text-[#A11C1C]" />
                  <p className="text-sm">{feature.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ Team Section ════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Des voyageurs avant d'être entrepreneurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Derrière Eazy-Visa, il y a une conviction : le voyage ne devrait jamais être un luxe, ni un parcours du combattant.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl group">
                {/* Photo — remplace le div coloré par une vraie image */}
                <div className="relative h-64 overflow-hidden bg-[#A11C1C]/10">
                  <Image
                    src={member.image}
                    alt={`Photo de ${member.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Dégradé bas pour lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#A11C1C] font-medium text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Destinations (inchangé) ════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos clients ont adoré</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <motion.div key={dest.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.05 }}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
                <Image src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-gray-200">{dest.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Testimonials (inchangé) ════ */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils ont voyagé avec nous</h2>
            <p className="text-xl text-gray-600">et ils en parlent mieux que nous</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Image src={testimonial.image} alt={testimonial.name} className="rounded-full object-cover" width={64} height={64} />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Contact + FAQ ════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#A11C1C] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Une question ?</h2>
                <p className="text-xl mb-8 text-red-100">Particuliers, entreprises ou partenaires : parlons-en.</p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // ── Protection anti double-envoi ──
                    if (isSending) return;
                    setIsSending(true);

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = {
                      name:    formData.get('name')    as string,
                      email:   formData.get('email')   as string,
                      phone:   formData.get('phone')   as string,
                      subject: formData.get('subject') as string,
                      message: formData.get('message') as string,
                    };
                    try {
                      const res = await fetch(`${API_URL}/contact`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                      });
                      const result = await res.json();
                      if (result.success) {
                        toast.success('Message envoyé avec succès !', { description: 'Nous vous répondrons très bientôt.' });
                        form.reset();
                      } else {
                        throw new Error(result.error);
                      }
                    } catch {
                      toast.error('Erreur lors de l\'envoi', { description: 'Vérifiez votre connexion et réessayez.' });
                    } finally {
                      // ── Réactive le bouton après réponse (succès ou erreur) ──
                      setIsSending(false);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* Ligne nom + téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="name" type="text" placeholder="Votre nom *" required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      name="phone" type="tel" placeholder="Téléphone (ex: +221 77…)"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <input
                    name="email" type="email" placeholder="Votre adresse email *" required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    name="subject" type="text" placeholder="Sujet"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <textarea
                    name="message" rows={4} placeholder="Votre message *" required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ scale: isSending ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-white text-[#A11C1C] rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Envoi en cours…
                      </>
                    ) : 'ENVOYER LE MESSAGE'}
                  </motion.button>
                </form>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="text-white">
                <h3 className="text-2xl font-bold mb-6">Gagner du temps grâce à notre FAQ</h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.details key={index}
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer group">
                      <summary className="font-semibold flex items-center justify-between">
                        {item.question}
                        <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-4 text-red-100 text-sm leading-relaxed">{item.answer}</p>
                    </motion.details>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Modal vols ════ */}
      <FlightResultsModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        searchParams={searchParams}
      />

      {/* ════ Modal Corporate ════ */}
      <CorporateDevisModal
        isOpen={isCorporateModalOpen}
        onClose={() => setIsCorporateModalOpen(false)}
      />
    </div>
  );
}