// FlightResultsModal.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plane, 
  Clock, 
  Calendar, 
  Users,
  ArrowRight,
  Filter,
  Loader2,
  AlertCircle,
  ChevronDown,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';

const FlightResultsModal = ({ isOpen, onClose, searchParams }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    maxPrice: 2000000,
    stops: 'all',
    sortBy: 'price',
  });
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (isOpen && searchParams) {
      searchFlights();
    }
  }, [isOpen, searchParams]);

  const searchFlights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        origin: searchParams.from.split(' - ')[0],
        destination: searchParams.to.split(' - ')[0],
        departureDate: searchParams.departDate,
        adults: searchParams.passengers.toString(),
      });

      if (searchParams.returnDate) {
        params.append('returnDate', searchParams.returnDate);
      }

      const response = await fetch(`${API_URL}/flights/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setFlights(data.data || []);
        if (data.data.length === 0) {
          setError('Aucun vol trouvé pour ces critères.');
        }
      } else {
        throw new Error(data.error || 'Erreur lors de la recherche');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Impossible de charger les vols.');
      toast.error('Erreur de connexion', {
        description: 'Vérifiez que le backend est démarré sur le port 3000',
      });
    } finally {
      setLoading(false);
    }
  };

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
      if (filters.sortBy === 'price') {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      } else if (filters.sortBy === 'duration') {
        return a.itineraries[0].duration.localeCompare(b.itineraries[0].duration);
      }
      return 0;
    });

  const handleSelectFlight = (flight) => {
    toast.success('Vol sélectionné !', {
      description: 'Vous pouvez maintenant passer à la réservation.',
    });
    // TODO: Rediriger vers la page de réservation
  };

  const FlightCard = ({ flight, index }) => {
    const itinerary = flight.itineraries[0];
    const segments = itinerary.segments;
    const firstSeg = segments[0];
    const lastSeg = segments[segments.length - 1];
    
    const price = parseFloat(flight.price.total);
    const duration = itinerary.duration
      .replace('PT', '')
      .replace('H', 'h ')
      .replace('M', 'min')
      .trim();
    const stops = segments.length - 1;

    const departTime = firstSeg.departure.at.split('T')[1].slice(0, 5);
    const arriveTime = lastSeg.arrival.at.split('T')[1].slice(0, 5);
    const departDate = new Date(firstSeg.departure.at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    const arriveDate = new Date(lastSeg.arrival.at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });

    const isExpanded = showDetails === index;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="p-5 sm:p-6 lg:p-8">
          {/* Header : Compagnie + Prix */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#A11C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-[#A11C1C]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {firstSeg.carrierCode} {firstSeg.number}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {stops === 0 ? (
                    <span className="text-green-700 font-semibold">Vol direct</span>
                  ) : (
                    <span className="text-orange-600 font-semibold">
                      {stops} escale{stops > 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="text-right lg:text-left">
              <p className="text-3xl sm:text-4xl font-bold text-[#A11C1C]">
                {price.toLocaleString('fr-FR')} FCFA
              </p>
              <p className="text-sm text-gray-500">par personne</p>
            </div>
          </div>

          {/* Trajet principal - Ultra responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center mb-6">
            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{departTime}</p>
              <p className="text-lg font-semibold text-gray-700">{firstSeg.departure.iataCode}</p>
              <p className="text-sm text-gray-500">{departDate}</p>
            </div>

            <div className="hidden sm:flex flex-col items-center gap-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">{duration}</p>
              <div className="w-full h-1 bg-gradient-to-r from-[#A11C1C] to-orange-500 rounded-full relative">
                <Plane className="w-7 h-7 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rotate-90" />
              </div>
            </div>

            {/* Version mobile du trajet */}
            <div className="sm:hidden flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xl font-bold">{departTime}</p>
                <p className="text-base font-medium">{firstSeg.departure.iataCode}</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-gray-500 mb-1" />
                <p className="text-xs text-gray-600">{duration}</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-[#A11C1C] to-orange-500 my-1 relative">
                  <Plane className="w-5 h-5 text-[#A11C1C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rotate-90" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{arriveTime}</p>
                <p className="text-base font-medium">{lastSeg.arrival.iataCode}</p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{arriveTime}</p>
              <p className="text-lg font-semibold text-gray-700">{lastSeg.arrival.iataCode}</p>
              <p className="text-sm text-gray-500">{arriveDate}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
            </span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              {flight.numberOfBookableSeats} places
            </span>
          </div>

          {/* Boutons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowDetails(isExpanded ? null : index)}
              className="py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-[#A11C1C] hover:text-[#A11C1C] transition-all flex items-center justify-center gap-2"
            >
              <Info className="w-5 h-5" />
              Détails du vol
              <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectFlight(flight)}
              className="py-4 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              Sélectionner
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Détails expandables */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border-t-4 border-[#A11C1C]/20 bg-gray-50"
            >
              <div className="p-5 sm:p-6 lg:p-8 space-y-6">
                <h4 className="text-xl font-bold text-gray-900">Détails de l'itinéraire</h4>
                {segments.map((seg, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Plane className="w-6 h-6 text-[#A11C1C]" />
                      <span className="text-lg font-bold">
                        {seg.carrierCode} {seg.number} • Segment {i + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Départ</p>
                        <p className="text-xl font-bold">{seg.departure.iataCode}</p>
                        <p className="text-gray-700 mt-1">
                          {new Date(seg.departure.at).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Arrivée</p>
                        <p className="text-xl font-bold">{seg.arrival.iataCode}</p>
                        <p className="text-gray-700 mt-1">
                          {new Date(seg.arrival.at).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header fixe */}
              <div className="p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Plane className="w-9 h-9 sm:w-10 sm:h-10" />
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Vols disponibles</h2>
                      <p className="text-base sm:text-lg opacity-90">
                        {searchParams?.from.split(' - ')[1]} → {searchParams?.to.split(' - ')[1]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Calendar className="w-5 h-5" />
                    <span>{searchParams?.departDate}</span>
                  </div>
                  {searchParams?.returnDate && (
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                      <Calendar className="w-5 h-5" />
                      <span>{searchParams.returnDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Users className="w-5 h-5" />
                    <span>{searchParams?.passengers} passager{searchParams?.passengers > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Zone scrollable : filtres + résultats */}
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-5 sm:p-6 lg:p-8">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                      <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#A11C1C] animate-spin mb-6" />
                      <p className="text-2xl font-bold text-gray-800">Recherche en cours...</p>
                      <p className="text-gray-600 mt-2">Comparaison des meilleures offres</p>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                      <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-red-800 mb-3">Aucun résultat</h3>
                      <p className="text-red-700 mb-6 max-w-md mx-auto">{error}</p>
                      <button
                        onClick={searchFlights}
                        className="px-8 py-4 bg-[#A11C1C] text-white rounded-xl font-bold hover:bg-red-700 transition-all"
                      >
                        Réessayer
                      </button>
                    </div>
                  ) : filteredFlights.length > 0 ? (
                    <>
                      {/* Filtres */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 mb-8"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                          <div className="flex items-center gap-3">
                            <Filter className="w-6 h-6 text-[#A11C1C]" />
                            <h3 className="text-xl font-bold">Filtres</h3>
                          </div>
                          <span className="text-gray-600 font-medium">
                            {filteredFlights.length} vol{filteredFlights.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Prix max : {filters.maxPrice.toLocaleString()} FCFA
                            </label>
                            <input
                              type="range"
                              min="100000"
                              max="2000000"
                              step="50000"
                              value={filters.maxPrice}
                              onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                              className="w-full h-3 rounded-lg cursor-pointer accent-[#A11C1C]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Escales</label>
                            <select
                              value={filters.stops}
                              onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                            >
                              <option value="all">Toutes</option>
                              <option value="direct">Vol direct</option>
                              <option value="one">Max 1 escale</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Trier par</label>
                            <select
                              value={filters.sortBy}
                              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                            >
                              <option value="price">Meilleur prix</option>
                              <option value="duration">Plus court</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>

                      {/* Liste des vols */}
                      <div className="space-y-8">
                        {filteredFlights.map((flight, index) => (
                          <FlightCard key={flight.id || index} flight={flight} index={index} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-100 rounded-2xl p-12 text-center">
                      <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-700 mb-3">Aucun vol trouvé</h3>
                      <p className="text-gray-600 text-lg">Essayez d'élargir vos critères de recherche</p>
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