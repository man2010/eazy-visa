/**
 * HOME CLIENT COMPONENT
 * Version optimisée SEO du composant d'accueil
 */

'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

// Composants privés
import HeroCarousel from '@/components/HeroCarousel';
import FlightResultsModal from '@/components/FlightResultsModal';

// Icônes
import {
  Search, Calendar, Users, MapPin,
  Plane, Clock, Shield,
  CreditCard, Headphones,
  CheckCircle, Star, TrendingUp,
  Building2, ArrowRight, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

// Utils / config
import { API_URL } from '@/lib/config';

export default function HomeClient() {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getNextWeekDate = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  };

  const [flightData, setFlightData] = useState({
    from: 'DSS - Blaise Diagne International Airport',
    to: 'CDG - Charles de Gaulle',
    departDate: getNextWeekDate(),
    returnDate: '',
    passengers: 1,
  });

  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    departDate: string;
    returnDate: string | null;
    passengers: number;
  } | null>(null);

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
    { name: 'Bertrand Gopele', role: 'Manager' },
    { name: 'Ndeye Fatou Hann', role: 'Responsable Marketing' },
    { name: 'Khadijatou Kane', role: 'Apporteur d\'affaires' },
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

  const handleSearch = () => {
    if (!flightData.from || !flightData.to || !flightData.departDate) {
      toast.error('Informations manquantes', {
        description: 'Veuillez remplir tous les champs obligatoires',
      });
      return;
    }

    const departDate = new Date(flightData.departDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (departDate < today) {
      toast.error('Date invalide', {
        description: 'La date de départ doit être dans le futur',
      });
      return;
    }

    if (flightData.returnDate) {
      const returnDate = new Date(flightData.returnDate);
      if (returnDate < departDate) {
        toast.error('Date invalide', {
          description: 'La date de retour doit être après la date de départ',
        });
        return;
      }
    }

    setSearchParams({
      from: flightData.from,
      to: flightData.to,
      departDate: flightData.departDate,
      returnDate: flightData.returnDate || null,
      passengers: flightData.passengers,
    });

    setIsFlightModalOpen(true);
    
    toast.success('Recherche lancée !', {
      description: 'Chargement des vols disponibles...',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative pt-15 pb-12" aria-label="Billetterie et agence de voyage Dakar">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title="Meilleure Billetterie à Dakar — Prix Imbattables 24/7"
            subtitle="Billets d'avion 40% moins cher que les agences. Paiement Wave, Orange Money, CB. Agence de voyage complète + Visa Allemagne. Support immédiat."
            ctaText="Réserver un vol maintenant"
            ctaTargetId="main-content"
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
                  Réservez votre billet d'avion en 3 minutes
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Meilleure billetterie au Sénégal. Prix garanti le plus bas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="departure-input">
                      Départ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                      <input
                        id="departure-input"
                        type="text"
                        value={flightData.from}
                        onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
                        placeholder="Ex: Dakar (DSS)"
                        aria-label="Ville de départ"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="arrival-input">
                      Arrivée
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                      <input
                        id="arrival-input"
                        type="text"
                        value={flightData.to}
                        onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
                        placeholder="Ex: Paris (CDG)"
                        aria-label="Ville d'arrivée"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="depart-date-input">
                      Date de départ
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                      <input
                        id="depart-date-input"
                        type="date"
                        value={flightData.departDate}
                        onChange={(e) => setFlightData({ ...flightData, departDate: e.target.value })}
                        aria-label="Date de départ"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="return-date-input">
                      Date de retour
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                      <input
                        id="return-date-input"
                        type="date"
                        value={flightData.returnDate}
                        onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
                        aria-label="Date de retour (optionnel)"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="passengers-select">
                      Passagers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                      <select
                        id="passengers-select"
                        value={flightData.passengers}
                        onChange={(e) => setFlightData({ ...flightData, passengers: parseInt(e.target.value) })}
                        aria-label="Nombre de passagers"
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
                    aria-label="Rechercher des vols disponibles"
                  >
                    Rechercher les vols
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2 sm:py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-[#A11C1C] hover:text-[#A11C1C] transition-all text-sm sm:text-base"
                    aria-label="Voir les hôtels disponibles"
                  >
                    Afficher les hôtels
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section - Texte enrichi pour robots */}
      <section className="py-12 bg-white" aria-label="Billetterie Dakar - Pourquoi choisir Eazy-Visa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              La Meilleure Billetterie à Dakar : Eazy-Visa, Votre Agence de Voyage de Confiance
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#A11C1C]">Billetterie en ligne 24/7 au Sénégal</h3>
                <p className="mb-4">
                  Vous cherchez une <strong>billetterie à Dakar</strong> ouverte 24h/24 avec les prix les plus bas du marché ? Eazy-Visa est la <strong>meilleure agence de voyage au Sénégal</strong> pour réserver vos <strong>billets d'avion pas cher</strong>. Notre service de billetterie en ligne vous permet d'acheter vos billets à tout moment, avec des <strong>tarifs jusqu'à 40% moins chers</strong> que les agences traditionnelles.
                </p>
                <p className="mb-4">
                  Contrairement aux autres billetteries de Dakar qui ferment à 18h, notre <strong>service client est disponible 24/7</strong> pour répondre à toutes vos questions et gérer les urgences. Besoin d'un billet pour Paris, New York, Dubaï ou Casablanca ? Notre comparateur de vols trouve le meilleur prix en quelques secondes.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#A11C1C]">Agence de Voyage Complète à Keur Gorgui</h3>
                <p className="mb-4">
                  Eazy-Visa n'est pas qu'une simple billetterie — c'est votre <strong>agence de voyage complète à Dakar</strong>. Nous offrons : réservation de billets d'avion, réservation d'hôtels dans le monde entier, assurance voyage, visa pour l'Allemagne, cours d'allemand certifiés Goethe Institut, et accompagnement personnalisé pour vos projets d'études ou de travail à l'étranger.
                </p>
                <p className="mb-4">
                  Notre siège à <strong>Keur Gorgui, Dakar</strong> est facilement accessible. Vous pouvez payer en cash, par <strong>Wave, Orange Money ou carte bancaire</strong>. Nous sommes la seule agence de voyage au Sénégal à offrir autant de flexibilité dans les paiements.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-[#A11C1C]/5 to-[#A11C1C]/10 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Visa Allemagne depuis le Sénégal — 95% de Réussite</h3>
              <p className="mb-4 text-gray-700">
                Eazy-Visa est spécialisée dans l'<strong>obtention de visa pour l'Allemagne depuis le Sénégal</strong>. Que vous souhaitiez <strong>étudier en Allemagne gratuitement</strong>, suivre une <strong>formation professionnelle rémunérée (Ausbildung)</strong> ou travailler en Allemagne, notre équipe vous accompagne de A à Z avec un <strong>taux de réussite de 95%</strong>.
              </p>
              <p className="text-gray-700">
                Nos services incluent : constitution complète du dossier de visa, préparation à l'entretien consulaire, cours d'allemand (A1 à B2), accompagnement pour l'installation en Allemagne, et même 1 mois d'hébergement offert à votre arrivée. Contactez notre agence visa Allemagne à Dakar au <strong className="text-[#A11C1C]">+221 76 948 60 60</strong>.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10" aria-label="Statistiques Eazy-Visa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              7/24 — Notre promesse, pas un slogan
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
                  aria-hidden="true"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-[#A11C1C] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-20" aria-label="Comment réserver avec Eazy-Visa">
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
                  aria-hidden="true"
                >
                  <step.icon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  {step.tip && (
                    <p className="text-[#A11C1C] font-medium">{step.tip}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white" aria-label="Eazy-Visa Corporate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-[#A11C1C]/20 rounded-full text-[#A11C1C] mb-4">
                <Building2 className="w-5 h-5 inline mr-2" aria-hidden="true" />
                Corporate
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Eazy-Visa Corporate
              </h2>
              <p className="text-xl mb-4 text-gray-300">
                Le futur du voyage d'affaires made in Africa.
              </p>
              <p className="text-gray-400 mb-8">
                Une plateforme tout-en-un pour gérer vos déplacements, maîtriser vos coûts et garantir la sécurité de vos collaborateurs. Pensée pour les PME, ONG et groupes internationaux présents en Afrique.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#A11C1C] rounded-lg font-semibold inline-flex items-center gap-2"
                aria-label="En savoir plus sur Eazy-Visa Corporate"
              >
                En savoir plus
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: 'Gestion centralisée', icon: Building2 },
                { title: 'Suivi & optimisation des coûts', icon: TrendingUp },
                { title: 'Paiements flexibles & locaux', icon: CreditCard },
                { title: 'Transparence & sécurité totale', icon: Shield },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <feature.icon className="w-10 h-10 mx-auto mb-3 text-[#A11C1C]" aria-hidden="true" />
                  <p className="text-sm">{feature.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50" aria-label="L'équipe Eazy-Visa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Des voyageurs avant d'être entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Derrière Eazy-Visa, il y a une conviction : le voyage ne devrait jamais être un luxe, ni un parcours du combattant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="h-64 bg-[#A11C1C]" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20" aria-label="Destinations populaires">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Destinations favorites de nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Billets d'avion aux meilleurs prix pour ces destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={dest.image}
                  alt={`Billets d'avion pour ${dest.name}, ${dest.country}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  fill
                  loading="lazy"
                />
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10" aria-label="Témoignages clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils ont voyagé avec notre agence
            </h2>
            <p className="text-xl text-gray-600">
              et ils en parlent mieux que nous
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization" style={{display: 'none'}}>
                  <meta itemProp="name" content="Eazy-Visa" />
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={`Photo de ${testimonial.name}`}
                    className="rounded-full object-cover"
                    width={64}
                    height={64}
                  />
                  <div>
                    <div itemProp="author" itemScope itemType="https://schema.org/Person">
                      <h4 className="font-bold text-lg" itemProp="name">{testimonial.name}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4" itemProp="reviewBody">"{testimonial.content}"</p>
                <div className="flex gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" aria-label="Contact Eazy-Visa Dakar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#A11C1C] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Une question sur nos services ?
                </h2>
                <p className="text-xl mb-8 text-red-100">
                  Billetterie, visa Allemagne, réservation hôtel : parlons-en.
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
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
                        toast.success('Message envoyé avec succès !', {
                          description: 'Nous vous répondrons très bientôt.',
                        });
                        form.reset();
                      } else {
                        throw new Error(result.error);
                      }
                    } catch (err) {
                      toast.error('Erreur lors de l\'envoi', {
                        description: 'Vérifiez votre connexion et réessayez.',
                      });
                    }
                  }}
                  className="space-y-4"
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="Votre nom"
                    required
                    aria-label="Votre nom complet"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Votre adresse email"
                    required
                    aria-label="Votre adresse email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    name="subject"
                    type="text"
                    placeholder="Sujet (billet, visa, hôtel...)"
                    aria-label="Sujet de votre demande"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Votre message"
                    required
                    aria-label="Votre message détaillé"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-white text-[#A11C1C] rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                    aria-label="Envoyer votre message"
                  >
                    ENVOYER LE MESSAGE
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Gagnez du temps avec notre FAQ
                </h3>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.details
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer group"
                    >
                      <summary className="font-semibold flex items-center justify-between">
                        {item.question}
                        <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" aria-hidden="true" />
                      </summary>
                      <p className="mt-4 text-red-100 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.details>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Results Modal */}
      <FlightResultsModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        searchParams={searchParams}
      />
    </div>
  );
}