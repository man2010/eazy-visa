// app/destinations/dakar-paris/DakarParisClient.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import HeroCarousel from '@/components/HeroCarousel';
import FlightResultsModal from '@/components/FlightResultsModal';
import Footer from '@/components/Footer';
import {
  Plane,
  Clock,
  MapPin,
  CreditCard,
  Star,
  ShieldCheck,
  Users,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export default function DakarParisClient() {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    departDate: string;
    returnDate: string | null;
    passengers: number;
  } | null>(null);

  // Valeurs par défaut pour le formulaire pré-rempli
  const defaultFlightData = {
    from: 'DSS - Blaise Diagne International Airport',
    to: 'CDG - Charles de Gaulle',
    departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    returnDate: '',
    passengers: 1,
  };

  const handleSearch = (data = defaultFlightData) => {
    const departDateObj = new Date(data.departDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (departDateObj < today) {
      toast.error('Date invalide', {
        description: 'La date de départ doit être dans le futur',
      });
      return;
    }

    if (data.returnDate) {
      const returnDateObj = new Date(data.returnDate);
      if (returnDateObj < departDateObj) {
        toast.error('Date invalide', {
          description: 'La date de retour doit être après la date de départ',
        });
        return;
      }
    }

    setSearchParams({
      from: data.from,
      to: data.to,
      departDate: data.departDate,
      returnDate: data.returnDate || null,
      passengers: data.passengers,
    });

    setIsFlightModalOpen(true);
    toast.success('Recherche lancée !', {
      description: 'Chargement des vols disponibles Dakar → Paris...',
    });
  };

  // Images pour le HeroCarousel – ambiance Paris
  const heroImages = [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', // Tour Eiffel coucher de soleil
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', // Seine & Notre-Dame
    'https://images.unsplash.com/photo-1549144511-4e6f8b3295d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', // Arc de Triomphe avenue
    'https://images.unsplash.com/photo-1511739000-8b00d7142a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', // Paris vue panoramique
    'https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', // Champs-Élysées nuit
  ];

  const flightInfos = [
    { title: 'Durée moyenne', value: '6h45 – 8h', icon: Clock },
    { title: 'Prix dès', value: '400 000 FCFA', icon: MapPin },
    { title: 'Compagnies principales', value: 'Air France, Brussels Airlines, TAP Air Portugal', icon: Plane },
    { title: 'Paiement accepté', value: 'Wave, Orange Money, Carte, Cash agence', icon: CreditCard },
  ];

  const advantages = [
    {
      icon: ShieldCheck,
      title: 'Réservation sécurisée',
      desc: 'Paiement protégé – confirmation immédiate par e-mail et WhatsApp',
    },
    {
      icon: Users,
      title: 'Support local 24/7',
      desc: 'Équipe basée à Dakar – appel, WhatsApp ou passage en agence',
    },
    {
      icon: Star,
      title: 'Meilleur prix garanti',
      desc: 'Nous battons tous les prix équivalents ou on vous rembourse la différence',
    },
  ];

  const testimonials = [
    {
      name: 'Awa Ndiaye',
      role: 'Étudiante en master',
      content:
        'J’ai eu mon billet Dakar-Paris à 420 000 FCFA aller-retour avec paiement Wave. Service ultra rapide et l’équipe m’a appelée pour confirmer. Vraiment top !',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Moussa Diallo',
      role: 'Commerçant',
      content:
        'J’ai réservé pour toute la famille. Le prix était imbattable et j’ai pu payer en plusieurs fois via Orange Money. Merci Eazy-Visa !',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
  ];

  const faqItems = [
    {
      question: 'Y a-t-il des vols directs Dakar-Paris ?',
      answer:
        'Oui, Air France propose des vols directs (environ 6h45). Sinon, Brussels Airlines et TAP offrent des escales courtes (Bruxelles ou Lisbonne) souvent moins chères.',
    },
    {
      question: 'Quel est le meilleur moment pour réserver ?',
      answer:
        'Idéalement 2 à 4 mois à l’avance pour les meilleurs tarifs. Juillet-août et décembre sont les périodes les plus chères.',
    },
    {
      question: 'Puis-je modifier ou annuler mon billet ?',
      answer:
        'Cela dépend de la compagnie et du tarif choisi. Nous vous expliquons toutes les conditions avant paiement et nous gérons les modifications pour vous.',
    },
    {
      question: 'Comment recevoir mon billet électronique ?',
      answer:
        'Immédiatement après paiement : e-mail + WhatsApp avec le e-ticket et les instructions d’enregistrement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="relative">
        <HeroCarousel
          images={heroImages}
          height="h-[480px] md:h-[620px] lg:h-[680px]"
          title="Dakar → Paris"
          subtitle="Vols dès 400 000 FCFA – Réservation instantanée – Paiement Wave, Orange Money ou en agence"
          ctaText="Rechercher un vol maintenant"
          ctaTargetId="search-section"
        />
      </section>

      {/* Quick search section */}
      <section id="search-section" className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Trouvez votre vol Dakar – Paris
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
              <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                {defaultFlightData.from}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                {defaultFlightData.to}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aller</label>
              <input
                type="date"
                defaultValue={defaultFlightData.departDate}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A11C1C] focus:border-[#A11C1C]"
                onChange={(e) => {
                  // Optionnel : mise à jour en temps réel si besoin
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleSearch()}
              className="px-10 py-4 bg-[#A11C1C] hover:bg-[#8e1a1a] text-white rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Rechercher les vols <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Infos vol clés */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">Vols Dakar - Paris</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16">
          Trouvez les meilleurs vols Dakar - Paris avec Eazy-Visa. Des tarifs compétitifs, des compagnies aériennes fiables, et un service client 24/7.
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
            Pourquoi réserver Dakar-Paris avec Eazy-Visa ?
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
          Ce que disent nos voyageurs vers Paris
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
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#A11C1C]/20"
                />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">"{t.content}"</p>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
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
            Questions fréquentes – Vols Dakar Paris
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
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
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
            Prêt à partir pour Paris ?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95">
            Meilleurs prix, paiement local sécurisé, assistance 24/7 – réservez maintenant !
          </p>

          <button
            onClick={() => handleSearch()}
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