/**
 * PAGE HÔTELS - CLIENT COMPONENT
 * Composant interactif avec recherche et réservation
 */

'use client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { motion } from 'motion/react';
import { 
  Hotel, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Coffee,
  Loader2,
  AlertCircle,
  Bed,
  Dumbbell,
  Waves,
  Utensils,
  X,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import HeroCarousel from '@/components/HeroCarousel';
import { API_URL } from '@/lib/config';

function HotelsPageContent() {
  const heroImages = [
    '/EVHotels1.jpg',
    '/EVHotels3.jpg',
    '/EVHotels4.jpg',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjU5MTA2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const [searchData, setSearchData] = useState({
    city: 'PAR',
    cityName: 'Paris, France',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });

  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    maxPrice: 500000,
    minRating: 0,
    amenities: [] as string[],
  });

  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

  const getDefaultDates = () => {
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + 3);

    setSearchData(prev => ({
      ...prev,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
    }));
  };

  useEffect(() => {
    getDefaultDates();
  }, []);

  const handleSearch = async () => {
    if (!searchData.city || !searchData.checkIn || !searchData.checkOut) {
      toast.error('Informations manquantes', {
        description: 'Veuillez remplir tous les champs'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const cityRes = await fetch(`${API_URL}/hotels/search?cityCode=${searchData.city}`);
      const cityData = await cityRes.json();

      if (!cityData.success || cityData.data.length === 0) {
        setError('Aucun hôtel trouvé dans cette ville');
        setHotels([]);
        setLoading(false);
        return;
      }

      const hotelIds = cityData.data.slice(0, 20).map((h: any) => h.hotelId);

      const offersRes = await fetch(`${API_URL}/hotels/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelIds,
          checkInDate: searchData.checkIn,
          checkOutDate: searchData.checkOut,
          adults: searchData.guests,
        }),
      });

      const offersData = await offersRes.json();

      if (offersData.success && offersData.data.length > 0) {
        const hotelsWithImages = offersData.data.map((h: any) => ({
          ...h,
          image: `https://source.unsplash.com/featured/?hotel,${encodeURIComponent(h.hotel.name)}`
        }));
        setHotels(hotelsWithImages);
        toast.success(`${offersData.data.length} hôtel(s) trouvé(s) !`);
      } else {
        setError('Aucune offre disponible pour ces dates');
        setHotels([]);
      }
    } catch (err: any) {
      setError('Erreur de connexion au serveur');
      toast.error('Erreur lors de la recherche');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const price = parseFloat(hotel.offers[0]?.price?.total || '0');
    const rating = parseFloat(hotel.hotel?.rating || '0');

    if (price > filters.maxPrice) return false;
    if (rating < filters.minRating) return false;

    if (filters.amenities.length > 0) {
      const hotelAmenities = hotel.hotel?.amenities || [];
      return filters.amenities.every(a => hotelAmenities.includes(a));
    }

    return true;
  });

  const getAmenityIcon = (amenity: string) => {
    const map: Record<string, any> = {
      WIFI: Wifi,
      PARKING: Car,
      RESTAURANT: Utensils,
      SWIMMING_POOL: Waves,
      GYM: Dumbbell,
      SPA: Coffee,
      ROOM_SERVICE: Bed,
    };
    return map[amenity] || Hotel;
  };

  const handleSelectOffer = (hotel: any) => {
    setSelectedHotel(hotel);
  };

  const CFA_CONVERSION = {
    'EUR': 655.957,
    'USD': 700,
  };

  const formatPrice = (price: number, currency: string) => {
    let converted = price;
    if (currency !== 'XOF' && CFA_CONVERSION[currency as keyof typeof CFA_CONVERSION]) {
      converted *= CFA_CONVERSION[currency as keyof typeof CFA_CONVERSION];
    }
    return converted.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' FCFA';
  };

  return (
    <div className="min-h-screen pt-15 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section aria-label="Réservation d'hôtels">
        <HeroCarousel
          images={heroImages}
          height="h-[670px]"
          title="Hôtels d'Exception — Confort, Emplacement, Valeur"
          subtitle="Comparez 2 millions d'hôtels dans 190 pays. Réservation simple, paiement flexible, meilleur prix garanti."
          ctaText="Rechercher un hôtel"
          ctaTargetId="search-section"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          id="search-section"
          className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 mb-12"
          aria-label="Formulaire de recherche d'hôtels"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Trouvez Votre Hôtel Idéal au Meilleur Prix
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="destination"
                  type="text"
                  value={searchData.cityName}
                  onChange={(e) => {
                    const codeMap: Record<string, string> = {
                      'Paris, France': 'PAR',
                      'Dakar, Sénégal': 'DKR',
                      'New York, USA': 'NYC',
                      'Londres, UK': 'LON',
                      'Dubaï, UAE': 'DXB',
                    };
                    const newCity = e.target.value;
                    setSearchData({ ...searchData, cityName: newCity, city: codeMap[newCity] || 'PAR' });
                  }}
                  placeholder="Ex: Paris, France"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Ville de destination"
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkin" className="block text-sm font-medium mb-2">
                Date d'arrivée
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="checkin"
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Date d'arrivée à l'hôtel"
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkout" className="block text-sm font-medium mb-2">
                Date de départ
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="checkout"
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Date de départ de l'hôtel"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2">
              <label htmlFor="guests" className="block text-sm font-medium">
                Voyageurs
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <select
                  id="guests"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A11C1C]"
                  aria-label="Nombre de voyageurs"
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} adulte{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loading}
                className="mt-4 py-3 bg-[#A11C1C] text-white font-bold rounded-lg shadow-lg disabled:opacity-70 hover:bg-red-700 transition-colors"
                aria-label="Rechercher des hôtels"
              >
                {loading ? 'Recherche en cours...' : 'Rechercher'}
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
                    <label htmlFor="price-range" className="block text-sm font-medium mb-2">
                      Prix max/nuit : {filters.maxPrice.toLocaleString()} FCFA
                    </label>
                    <input
                      id="price-range"
                      type="range"
                      min="50000"
                      max="500000"
                      step="25000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                      className="w-full accent-[#A11C1C]"
                      aria-label="Prix maximum par nuit"
                    />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium mb-2">
                      Étoiles minimum
                    </label>
                    <select
                      id="rating"
                      value={filters.minRating}
                      onChange={(e) => setFilters({ ...filters, minRating: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#A11C1C]"
                      aria-label="Note minimum de l'hôtel"
                    >
                      <option value="0">Toutes catégories</option>
                      <option value="3">3+ étoiles</option>
                      <option value="4">4+ étoiles</option>
                      <option value="5">5 étoiles</option>
                    </select>
                  </div>

                  <div>
                    <p className="block text-sm font-medium mb-2">Équipements</p>
                    <div className="space-y-2">
                      {[
                        { value: 'WIFI', label: 'WiFi gratuit' },
                        { value: 'PARKING', label: 'Parking' },
                        { value: 'RESTAURANT', label: 'Restaurant' },
                        { value: 'SWIMMING_POOL', label: 'Piscine' },
                        { value: 'GYM', label: 'Salle de sport' },
                        { value: 'SPA', label: 'Spa' },
                      ].map(amenity => (
                        <label key={amenity.value} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity.value)}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...filters.amenities, amenity.value]
                                : filters.amenities.filter(am => am !== amenity.value);
                              setFilters({ ...filters, amenities: newAmenities });
                            }}
                            className="accent-[#A11C1C]"
                            aria-label={amenity.label}
                          />
                          {amenity.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Hotels List */}
            <main className="lg:col-span-3" aria-label="Liste des hôtels">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2 className="w-20 h-20 text-[#A11C1C] animate-spin mb-6" aria-hidden="true" />
                  <p className="text-2xl font-bold">Recherche des meilleurs hôtels...</p>
                  <p className="text-gray-600 mt-2">Comparaison de milliers d'offres en cours</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 rounded-2xl p-12 text-center">
                  <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-red-900 mb-2">Aucun résultat</h2>
                  <p className="text-xl text-red-800">{error}</p>
                  <p className="text-gray-600 mt-4">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : filteredHotels.length > 0 ? (
                <>
                  <header className="mb-8">
                    <h2 className="text-lg text-gray-600">
                      <span className="font-bold text-2xl text-gray-900">{filteredHotels.length}</span> hôtel{filteredHotels.length > 1 ? 's' : ''} disponible{filteredHotels.length > 1 ? 's' : ''}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {searchData.cityName} • {new Date(searchData.checkIn).toLocaleDateString('fr-FR')} - {new Date(searchData.checkOut).toLocaleDateString('fr-FR')}
                    </p>
                  </header>
                  <div className="grid grid-cols-1 gap-8">
                    {filteredHotels.map((hotelOffer, index) => {
                      const hotel = hotelOffer.hotel;
                      const offer = hotelOffer.offers[0];
                      const price = parseFloat(offer.price.total);
                      const currency = offer.price.currency;
                      const formattedPrice = formatPrice(price, currency);

                      return (
                        <motion.article
                          key={hotel.hotelId}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -10 }}
                          className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row"
                        >
                          <div className="lg:w-96 h-64 lg:h-auto relative">
                            <img
                              src={hotelOffer.image || 'https://source.unsplash.com/featured/?hotel,luxury'}
                              alt={`${hotel.name} - Photo de l'hôtel`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = 'https://source.unsplash.com/featured/?hotel';
                              }}
                            />
                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                              <span className="font-bold">{hotel.rating || 'N/A'}</span>
                            </div>
                          </div>

                          <div className="flex-1 p-6 lg:p-8 flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                              <span>{hotel.address?.lines?.[0] || 'Centre-ville'}</span>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                              {(hotel.amenities || []).slice(0, 5).map((a: string) => {
                                const Icon = getAmenityIcon(a);
                                return (
                                  <span key={a} className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                                    <Icon className="w-4 h-4" aria-hidden="true" />
                                    {a.replace(/_/g, ' ')}
                                  </span>
                                );
                              })}
                            </div>

                            <div className="flex items-end justify-between mt-auto flex-wrap gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Prix total séjour</p>
                                <p className="text-3xl md:text-4xl font-bold text-[#A11C1C]">
                                  {formattedPrice}
                                </p>
                                <p className="text-sm text-gray-500">
                                  pour {searchData.guests} adulte{searchData.guests > 1 ? 's' : ''}
                                </p>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSelectOffer(hotelOffer)}
                                className="px-8 py-4 bg-[#A11C1C] text-white rounded-xl font-bold shadow-lg hover:shadow-xl flex items-center gap-3"
                                aria-label={`Voir l'offre pour ${hotel.name}`}
                              >
                                Voir l'offre
                                <ArrowRight className="w-6 h-6" aria-hidden="true" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-16 text-center">
                  <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" aria-hidden="true" />
                  <h2 className="text-2xl font-bold mb-2">Aucun hôtel trouvé</h2>
                  <p className="text-xl text-gray-700">Aucun hôtel ne correspond à vos critères</p>
                  <p className="text-gray-600 mt-2">Essayez d'ajuster vos filtres</p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Hotel Details Modal */}
      <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden rounded-2xl">
          {selectedHotel && (
            <div className="flex flex-col h-full">
              <header className="p-6 bg-gradient-to-r from-[#A11C1C] to-red-700 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">{selectedHotel.hotel.name}</h2>
                  <button 
                    onClick={() => setSelectedHotel(null)} 
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer la fenêtre"
                  >
                    <X className="w-7 h-7" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-lg opacity-90 mt-2">
                  {selectedHotel.hotel.address?.lines?.join(', ') || 'Centre-ville'}
                </p>
              </header>

              <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50">
                <h3 className="text-2xl font-bold mb-6">Offres Disponibles</h3>
                <div className="space-y-6">
                  {selectedHotel.offers.map((offer: any, i: number) => {
                    const price = parseFloat(offer.price.total);
                    const currency = offer.price.currency;
                    const formattedPrice = formatPrice(price, currency);

                    return (
                      <article key={i} className="bg-white rounded-2xl p-6 shadow-xl">
                        <h4 className="text-xl font-bold mb-4">
                          Chambre {i + 1} - {offer.room?.typeEstimated?.category || 'Standard'}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {offer.room?.description?.text || 'Chambre confortable avec tous les équipements nécessaires'}
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Prix total</p>
                            <p className="text-3xl font-bold text-[#A11C1C]">{formattedPrice}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              toast.success('Réservation en cours', {
                                description: 'Vous allez être redirigé vers le paiement'
                              });
                            }}
                            className="px-8 py-4 bg-[#A11C1C] text-white rounded-xl font-bold shadow-lg hover:shadow-xl"
                            aria-label={`Réserver la chambre ${i + 1}`}
                          >
                            Réserver Maintenant
                          </motion.button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function HotelsClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-[#A11C1C] animate-spin" />
      </div>
    }>
      <HotelsPageContent />
    </Suspense>
  );
}