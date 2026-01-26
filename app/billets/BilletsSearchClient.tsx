/**
 * PAGE BILLETS - CLIENT COMPONENT
 * Recherche interactive de vols avec API Amadeus
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  Plane, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Info,
  ChevronDown,
  Loader2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';

export default function BilletsSearchClient() {
  const heroImages = [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const [searchData, setSearchData] = useState({
    from: '',
    fromCode: '',
    to: '',
    toCode: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
  });

  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [flights, setFlights] = useState<any[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    maxPrice: 2000000,
    stops: 'all',
    sortBy: 'price',
  });

  const [showDetails, setShowDetails] = useState<number | null>(null);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  // Dates par défaut
  useEffect(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setSearchData(prev => ({
      ...prev,
      departDate: nextWeek.toISOString().split('T')[0],
    }));
  }, []);

  // Recherche d'aéroports/villes
  const searchLocations = async (keyword: string, field: 'from' | 'to') => {
    if (keyword.length < 2) {
      field === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
      return;
    }

    // Fallback manuel pour Dakar
    if (keyword.toLowerCase().includes('dakar')) {
      const dakarSuggestion = {
        iataCode: 'DSS',
        name: 'Aéroport international Blaise Diagne',
        city: 'Dakar',
        country: 'Sénégal',
        fullLabel: 'DSS - Aéroport international Blaise Diagne, Dakar, Sénégal',
      };
      field === 'from' ? setFromSuggestions([dakarSuggestion]) : setToSuggestions([dakarSuggestion]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const res = await fetch(
        `${API_URL}/flights/locations?keyword=${encodeURIComponent(keyword)}&subType=AIRPORT,CITY`
      );
      const data = await res.json();

      if (data.success && data.data) {
        const suggestions = data.data.slice(0, 8).map((loc: any) => ({
          iataCode: loc.iataCode,
          name: loc.name,
          city: loc.address?.cityName || '',
          country: loc.address?.countryName || '',
          fullLabel: `${loc.iataCode} - ${loc.name}, ${loc.address?.cityName}, ${loc.address?.countryName}`,
        }));
        field === 'from' ? setFromSuggestions(suggestions) : setToSuggestions(suggestions);
      } else {
        field === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
      }
    } catch (err) {
      console.error('Erreur autocomplétion:', err);
      field === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const selectLocation = (suggestion: any, field: 'from' | 'to') => {
    if (field === 'from') {
      setSearchData(prev => ({
        ...prev,
        from: suggestion.fullLabel,
        fromCode: suggestion.iataCode,
      }));
      setFromSuggestions([]);
      toInputRef.current?.focus();
    } else {
      setSearchData(prev => ({
        ...prev,
        to: suggestion.fullLabel,
        toCode: suggestion.iataCode,
      }));
      setToSuggestions([]);
    }
  };

  // Recherche des vols
  const handleSearch = async () => {
    if (!searchData.fromCode || !searchData.toCode || !searchData.departDate) {
      toast.error('Informations manquantes', {
        description: 'Veuillez sélectionner un départ et une arrivée valides'
      });
      return;
    }

    if (searchData.fromCode === searchData.toCode) {
      toast.error('Erreur', {
        description: 'Départ et arrivée doivent être différents'
      });
      return;
    }

    setLoadingFlights(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        origin: searchData.fromCode,
        destination: searchData.toCode,
        departureDate: searchData.departDate,
        adults: searchData.passengers.toString(),
      });
      if (searchData.returnDate) params.append('returnDate', searchData.returnDate);

      const res = await fetch(`${API_URL}/flights/search?${params}`);
      const data = await res.json();

      if (data.success && data.data?.length > 0) {
        setFlights(data.data);
        toast.success(`${data.data.length} vol${data.data.length > 1 ? 's' : ''} trouvé${data.data.length > 1 ? 's' : ''} !`);
      } else {
        setFlights([]);
        setError('Aucun vol disponible pour ces critères');
      }
    } catch (err) {
      setError('Impossible de contacter le serveur');
      toast.error('Erreur de recherche');
    } finally {
      setLoadingFlights(false);
    }
  };

  // Filtrage et tri
  const filteredFlights = flights
    .filter(flight => {
      const price = parseFloat(flight.price.total);
      if (price > filters.maxPrice) return false;

      if (filters.stops !== 'all') {
        const stops = flight.itineraries[0].segments.length - 1;
        if (filters.stops === 'direct' && stops !== 0) return false;
        if (filters.stops === 'one' && stops > 1) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price') return parseFloat(a.price.total) - parseFloat(b.price.total);
      if (filters.sortBy === 'duration') return a.itineraries[0].duration.localeCompare(b.itineraries[0].duration);
      return 0;
    });

  const FlightCard = ({ flight, index }: { flight: any; index: number }) => {
    const itinerary = flight.itineraries[0];
    const segments = itinerary.segments;
    const first = segments[0];
    const last = segments[segments.length - 1];
    const price = parseFloat(flight.price.total);
    const duration = itinerary.duration.replace('PT', '').replace('H', 'h ').replace('M', 'min').trim();
    const stops = segments.length - 1;

    const departTime = first.departure.at.split('T')[1].slice(0, 5);
    const arriveTime = last.arrival.at.split('T')[1].slice(0, 5);

    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
      >
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#A11C1C]/10 rounded-full flex items-center justify-center" aria-hidden="true">
                <Plane className="w-8 h-8 text-[#A11C1C]" />
              </div>
              <div>
                <p className="text-xl font-bold">{first.carrierCode} {first.number}</p>
                <p className="text-sm text-gray-600">
                  {stops === 0 ? 'Vol direct' : `${stops} escale${stops > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl md:text-4xl font-bold text-[#A11C1C]">
                {price.toLocaleString()} FCFA
              </p>
              <p className="text-sm text-gray-500">par personne</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mb-6">
            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold">{departTime}</p>
              <p className="text-lg font-medium text-gray-700">{first.departure.iataCode}</p>
            </div>

            <div className="text-center">
              <Clock className="w-6 h-6 text-gray-500 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-700">{duration}</p>
              <div className="w-full h-1 bg-gradient-to-r from-[#A11C1C] to-orange-500 rounded-full my-3 relative">
                <Plane className="w-7 h-7 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rotate-90" aria-hidden="true" />
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-3xl font-bold">{arriveTime}</p>
              <p className="text-lg font-medium text-gray-700">{last.arrival.iataCode}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowDetails(showDetails === index ? null : index)}
              className="py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-[#A11C1C] hover:text-[#A11C1C] flex items-center justify-center gap-2 transition-all"
              aria-label={`${showDetails === index ? 'Masquer' : 'Afficher'} les détails du vol`}
            >
              <Info className="w-5 h-5" aria-hidden="true" />
              Détails du vol
              <ChevronDown className={`w-5 h-5 transition-transform ${showDetails === index ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Réservation en cours', {
                description: 'Vous allez être redirigé vers le paiement'
              })}
              className="py-4 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              aria-label={`Sélectionner le vol ${first.carrierCode} ${first.number}`}
            >
              Sélectionner ce vol
              <ArrowRight className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showDetails === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t-4 border-[#A11C1C]/20 bg-gray-50 px-6 lg:px-8 py-6"
            >
              <h3 className="text-xl font-bold mb-6">Détails de l'itinéraire</h3>
              {segments.map((seg: any, i: number) => (
                <div key={i} className="bg-white rounded-xl p-6 mb-4 shadow-md last:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-6 h-6 text-[#A11C1C]" aria-hidden="true" />
                    <span className="font-bold text-lg">
                      {seg.carrierCode} {seg.number}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Départ</p>
                      <p className="text-xl font-bold">{seg.departure.iataCode}</p>
                      <p className="text-gray-700">
                        {new Date(seg.departure.at).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Arrivée</p>
                      <p className="text-xl font-bold">{seg.arrival.iataCode}</p>
                      <p className="text-gray-700">
                        {new Date(seg.arrival.at).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      {/* Hero Section */}
      <section aria-label="Recherche de vols">
        <HeroCarousel
          images={heroImages}
          height="h-[634px]"
          title="Vols au Meilleur Prix — Réservez en Toute Sérénité"
          subtitle="Comparaison en temps réel de +500 compagnies. Paiement Wave/Orange Money/CB. Support 24/7."
          ctaText="Rechercher un vol"
          ctaTargetId="search-section"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Search Form */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          id="search-section"
          className="bg-white rounded-2xl shadow-2xl p-6 lg:p-10 mb-16"
          aria-label="Formulaire de recherche de vols"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Trouvez Votre Vol Idéal
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* FROM - Départ */}
            <div className="relative">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                Départ
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="from"
                  ref={fromInputRef}
                  type="text"
                  value={searchData.from}
                  onChange={(e) => {
                    setSearchData(prev => ({ ...prev, from: e.target.value, fromCode: '' }));
                    searchLocations(e.target.value, 'from');
                  }}
                  placeholder="Ville ou aéroport"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent"
                  aria-label="Aéroport de départ"
                  autoComplete="off"
                />
              </div>

              <AnimatePresence>
                {fromSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                  >
                    {fromSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => selectLocation(sug, 'from')}
                        className="w-full text-left px-5 py-4 hover:bg-[#A11C1C]/5 transition-colors flex items-center gap-4"
                        type="button"
                      >
                        <Plane className="w-6 h-6 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold">{sug.iataCode} - {sug.name}</p>
                          <p className="text-sm text-gray-600">{sug.city}, {sug.country}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TO - Arrivée */}
            <div className="relative">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                Arrivée
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="to"
                  ref={toInputRef}
                  type="text"
                  value={searchData.to}
                  onChange={(e) => {
                    setSearchData(prev => ({ ...prev, to: e.target.value, toCode: '' }));
                    searchLocations(e.target.value, 'to');
                  }}
                  placeholder="Ville ou aéroport"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent"
                  aria-label="Aéroport d'arrivée"
                  autoComplete="off"
                />
              </div>

              <AnimatePresence>
                {toSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                  >
                    {toSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => selectLocation(sug, 'to')}
                        className="w-full text-left px-5 py-4 hover:bg-[#A11C1C]/5 transition-colors flex items-center gap-4"
                        type="button"
                      >
                        <Plane className="w-6 h-6 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold">{sug.iataCode} - {sug.name}</p>
                          <p className="text-sm text-gray-600">{sug.city}, {sug.country}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dates */}
            <div>
              <label htmlFor="depart-date" className="block text-sm font-medium text-gray-700 mb-2">
                Date aller
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="depart-date"
                  type="date"
                  value={searchData.departDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, departDate: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Date de départ"
                />
              </div>
            </div>

            <div>
              <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-2">
                Date retour (facultatif)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="return-date"
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Date de retour (optionnelle)"
                />
              </div>
            </div>

            {/* Passagers + Bouton */}
            <div className="flex flex-col justify-end gap-4">
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
                  Passagers
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <select
                    id="passengers"
                    value={searchData.passengers}
                    onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] appearance-none"
                    aria-label="Nombre de passagers"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loadingFlights}
                className="py-4 bg-[#A11C1C] text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 hover:bg-red-700 transition-colors"
                aria-label="Rechercher des vols"
              >
                {loadingFlights ? 'Recherche...' : 'Rechercher les vols'}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Results Section */}
        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1" aria-label="Filtres de recherche">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-28">
                <h2 className="text-xl font-bold mb-6">Filtres</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="price-filter" className="block text-sm font-medium mb-2">
                      Prix max : {filters.maxPrice.toLocaleString()} FCFA
                    </label>
                    <input
                      id="price-filter"
                      type="range"
                      min="100000"
                      max="2000000"
                      step="50000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                      className="w-full accent-[#A11C1C]"
                      aria-label="Prix maximum"
                    />
                  </div>

                  <div>
                    <label htmlFor="stops-filter" className="block text-sm font-medium mb-2">
                      Escales
                    </label>
                    <select
                      id="stops-filter"
                      value={filters.stops}
                      onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                      aria-label="Nombre d'escales"
                    >
                      <option value="all">Toutes</option>
                      <option value="direct">Vol direct</option>
                      <option value="one">Max 1 escale</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sort-filter" className="block text-sm font-medium mb-2">
                      Trier par
                    </label>
                    <select
                      id="sort-filter"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                      aria-label="Critère de tri"
                    >
                      <option value="price">Meilleur prix</option>
                      <option value="duration">Durée la plus courte</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Flights List */}
            <main className="lg:col-span-3" aria-label="Liste des vols">
              {loadingFlights ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl">
                  <Loader2 className="w-20 h-20 text-[#A11C1C] animate-spin mb-6" aria-hidden="true" />
                  <p className="text-2xl font-bold">Recherche en cours...</p>
                  <p className="text-gray-600 mt-2">Comparaison de +500 compagnies</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 rounded-2xl p-12 text-center">
                  <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-red-900 mb-2">Aucun résultat</h2>
                  <p className="text-xl text-red-800">{error}</p>
                  <p className="text-gray-600 mt-4">Essayez de modifier vos critères</p>
                </div>
              ) : filteredFlights.length > 0 ? (
                <>
                  <header className="mb-8">
                    <p className="text-lg text-gray-600">
                      <span className="font-bold text-2xl text-gray-900">{filteredFlights.length}</span> vol{filteredFlights.length > 1 ? 's' : ''} trouvé{filteredFlights.length > 1 ? 's' : ''}
                    </p>
                  </header>
                  <div className="space-y-8">
                    {filteredFlights.map((flight, index) => (
                      <FlightCard key={index} flight={flight} index={index} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-16 text-center">
                  <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" aria-hidden="true" />
                  <h2 className="text-2xl font-bold mb-2">Aucun vol trouvé</h2>
                  <p className="text-xl text-gray-700">Aucun vol ne correspond à vos critères</p>
                  <p className="text-gray-600 mt-2">Essayez d'élargir vos filtres</p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}