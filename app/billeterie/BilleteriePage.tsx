/**
 * app/billetterie/BilletteriePage.tsx
 * ─────────────────────────────────────────────────────────────
 *  ✅ Utilise HeroCarousel (même que la home)
 *  ✅ Pas de Navbar / Footer (gérés par layout.tsx)
 *  ✅ Même design system : #A11C1C, motion/react, Tailwind
 *  ✅ Toutes réservations → WhatsApp +221 767 673 838
 * ─────────────────────────────────────────────────────────────
 */
'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

// ── Composants partagés du projet
import HeroCarousel from '@/components/HeroCarousel';

// ── Icônes (même set que la home)
import {
  Search, Calendar, Users, MapPin,
  Plane, Clock, Shield,
  CreditCard, Headphones, Star,
  ArrowRight, ChevronRight,
  MessageCircle, Phone, Globe, Hotel,
  Car, Zap, Award, CheckCircle,
} from 'lucide-react';

import { toast } from 'sonner';

// ─── Constantes WhatsApp ─────────────────────────────────────
const WA_NUMBER = '221767673838';
const wa = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── Données ─────────────────────────────────────────────────

const heroImages = ['/image2.jpg', '/image4.jpg', '/image5.webp'];

const stats = [
  { label: 'Clients servis',            value: '10 000+', icon: Users },
  { label: 'Clients satisfaits',         value: '98%',     icon: Star },
  { label: 'Destinations couvertes',     value: '1 200+',  icon: MapPin },
  { label: 'Support',                    value: '24/7',    icon: Clock },
];

const services = [
  {
    icon: Plane,
    label: 'Billets Avion',
    description: 'Toutes compagnies, toutes destinations. Prix GDS en temps réel via Amadeus, Sabre & Galileo.',
    waMsg: 'Bonjour Eazy-Visa ! Je souhaite réserver un billet avion. Pouvez-vous me faire un devis ?',
  },
  {
    icon: Hotel,
    label: 'Réservation Hôtel',
    description: 'Hôtels 1★ à 5★ dans le monde entier. Meilleur tarif garanti.',
    waMsg: "Bonjour Eazy-Visa ! Je souhaite réserver un hôtel. Pouvez-vous m'aider ?",
  },
  {
    icon: Car,
    label: 'Transport',
    description: 'Transfert aéroport, location voiture, navettes privées.',
    waMsg: 'Bonjour Eazy-Visa ! Je cherche un service de transport/transfert. Quelles sont vos offres ?',
  },
  {
    icon: Shield,
    label: 'Assurance Voyage',
    description: 'Couverture médicale, annulation, bagages perdus. Voyagez l\'esprit tranquille.',
    waMsg: 'Bonjour Eazy-Visa ! Je souhaite souscrire une assurance voyage. Quelles sont vos formules ?',
  },
];

const gds = [
  { name: 'Amadeus',  emoji: '✈️', detail: '500+ compagnies connectées — leader mondial' },
  { name: 'Sabre',    emoji: '🌐', detail: '400+ compagnies — plateforme nord-américaine' },
  { name: 'Galileo',  emoji: '🛩️', detail: '350+ compagnies — réseau Travelport mondial' },
];

const destinations = [
  { name: 'Paris',      code: 'CDG', flag: '🇫🇷', price: 'Dès 320 000 FCFA', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&q=80' },
  { name: 'Dubaï',      code: 'DXB', flag: '🇦🇪', price: 'Dès 280 000 FCFA', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { name: 'New York',   code: 'JFK', flag: '🇺🇸', price: 'Dès 450 000 FCFA', image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=600&q=80' },
  { name: 'Rome',       code: 'FCO', flag: '🇮🇹', price: 'Dès 295 000 FCFA', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
  { name: 'Istanbul',   code: 'IST', flag: '🇹🇷', price: 'Dès 260 000 FCFA', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80' },
  { name: 'Casablanca', code: 'CMN', flag: '🇲🇦', price: 'Dès 120 000 FCFA', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { name: 'Montréal',   code: 'YUL', flag: '🇨🇦', price: 'Dès 480 000 FCFA', image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=600&q=80' },
  { name: 'Madrid',     code: 'MAD', flag: '🇪🇸', price: 'Dès 290 000 FCFA', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80' },
];

const avantages = [
  { icon: Zap,         title: 'Devis en 5 minutes',    desc: 'Réponse immédiate via WhatsApp. Nos conseillers sont disponibles 24h/24.' },
  { icon: Award,       title: '3 GDS connectés',        desc: 'Amadeus, Sabre et Galileo : accès aux meilleurs tarifs de toutes compagnies.' },
  { icon: CheckCircle, title: 'Meilleur prix garanti',  desc: 'Comparaison en temps réel — nous vous proposons toujours le tarif le plus bas.' },
  { icon: Clock,       title: 'Service 24/7',           desc: 'Disponibles à toute heure, weekends et jours fériés compris.' },
  { icon: CreditCard,  title: 'Paiement flexible',      desc: 'Wave, Orange Money, carte bancaire ou espèces à notre agence Keur Gorgui.' },
  { icon: Headphones,  title: 'Accompagnement complet', desc: "De la recherche à l'embarquement, un seul interlocuteur gère tout." },
];

const faqItems = [
  {
    question: 'Comment réserver un billet avion depuis Dakar ?',
    answer: "Contactez-nous sur WhatsApp au +221 76 767 67 38 ou remplissez le formulaire ci-dessus. Nos conseillers utilisent les GDS Amadeus, Sabre et Galileo pour vous trouver le meilleur tarif en temps réel.",
  },
  {
    question: 'Quelles destinations couvrez-vous depuis Dakar ?',
    answer: "Toutes les destinations mondiales : Europe (Paris, Rome, Madrid, Berlin…), Amérique (New York, Montréal…), Moyen-Orient (Dubai, Istanbul…), Asie, Afrique (Abidjan, Lagos, Casablanca…) — plus de 1 200 destinations.",
  },
  {
    question: "Qu'est-ce qu'un GDS et pourquoi est-ce important ?",
    answer: "Un GDS (Global Distribution System) est un réseau informatisé connectant les agences aux compagnies aériennes en temps réel. Avoir accès à Amadeus, Sabre ET Galileo simultanément nous permet de comparer des millions de tarifs pour vous garantir le meilleur prix.",
  },
  {
    question: "Proposez-vous des services hôtel et assurance voyage ?",
    answer: "Oui ! Notre concept \"One Stop Shop\" inclut : billets avion, réservation hôtels (1★ à 5★), transferts aéroport et assurance voyage tous risques. Un seul interlocuteur pour tout organiser.",
  },
  {
    question: 'Quels modes de paiement acceptez-vous ?',
    answer: "Nous acceptons Wave, Orange Money, carte bancaire Visa/Mastercard, et le paiement en espèces directement à notre agence de Keur Gorgui à Dakar. Transactions 100% sécurisées.",
  },
];

// ─── Composant principal ─────────────────────────────────────
export default function BilletteriePage() {
  const getNextWeekDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [flightData, setFlightData] = useState({
    from: 'DSS - Blaise Diagne International Airport',
    to: '',
    departDate: getNextWeekDate(),
    returnDate: '',
    passengers: 1,
    service: 'Billet avion',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Construit le message et redirige vers WhatsApp
  const handleSearch = () => {
    if (!flightData.to || !flightData.departDate) {
      toast.error('Informations manquantes', {
        description: 'Veuillez renseigner la destination et la date.',
      });
      return;
    }

    const msg =
      `Bonjour Eazy-Visa 👋\n\n` +
      `📌 Service : ${flightData.service}\n` +
      `✈️ Départ : ${flightData.from}\n` +
      `🏁 Destination : ${flightData.to}\n` +
      `📅 Date départ : ${flightData.departDate}` +
      (flightData.returnDate ? `\n🔄 Retour : ${flightData.returnDate}` : '') +
      `\n👥 Passagers : ${flightData.passengers}\n\n` +
      `Merci de me contacter pour un devis.`;

    window.open(wa(msg), '_blank');

    toast.success('Redirection WhatsApp…', {
      description: "Votre demande de devis est en cours d'envoi.",
    });
  };

  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          HERO — HeroCarousel (identique à la home)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-15 pb-12" aria-label="Billetterie Eazy-Visa Dakar">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title="Billetterie Dakar — Tous vos billets, un seul appel."
            subtitle="Amadeus · Sabre · Galileo. Meilleur prix garanti sur toutes destinations. Billets avion, hôtels, transport & assurance. Service 24/7."
            ctaText="Demander un devis"
            ctaTargetId="#devis"
          />

          {/* Formulaire flottant — même pattern que la home */}
          <motion.div
            id="devis"
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
                  Billetterie — Devis gratuit en 5 min.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Votre demande est transmise directement à nos agents via WhatsApp.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Ligne 1 : service + départ + destination + date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Service
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <select
                        value={flightData.service}
                        onChange={(e) => setFlightData({ ...flightData, service: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option>Billet avion</option>
                        <option>Réservation hôtel</option>
                        <option>Transport / transfert</option>
                        <option>Assurance voyage</option>
                        <option>Package complet</option>
                      </select>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Départ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        value={flightData.from}
                        onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
                        placeholder="ex: Dakar"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        value={flightData.to}
                        onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
                        placeholder="ex: Paris, Dubai…"
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Date de départ
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="date"
                        value={flightData.departDate}
                        onChange={(e) => setFlightData({ ...flightData, departDate: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Ligne 2 : retour + passagers + bouton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end">

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Date de retour (optionnel)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="date"
                        value={flightData.returnDate}
                        onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

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
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2 py-2 sm:py-3 bg-[#A11C1C] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    aria-label="Envoyer ma demande de devis via WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    Obtenir mon devis WhatsApp
                  </motion.button>
                </div>

                {/* Badges confiance */}
                <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> Gratuit & sans engagement
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> Réponse en moins de 5 min
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> Prix GDS en temps réel
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> Paiement Wave / Orange Money
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS — même style que la home
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10"
        aria-label="Chiffres clés billetterie Eazy-Visa"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              La billetterie n°1 à Dakar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5+ années d'expérience. Amadeus, Sabre et Galileo.
              Ce n'est pas qu'une billetterie — c'est une passerelle vers le monde.
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

      {/* ═══════════════════════════════════════════════════════
          SERVICES — One Stop Shop
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white"
        aria-label="Services de billetterie Eazy-Visa Dakar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tous vos besoins voyage en un seul endroit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre concept <strong>"One Stop Shop"</strong> : billets avion, hôtels, transport
              et assurance — un seul interlocuteur pour tout organiser.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, index) => {
              const Icon = svc.icon;
              return (
                <motion.article
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-xl text-center flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-4"
                  >
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{svc.label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {svc.description}
                  </p>
                  <motion.a
                    href={wa(svc.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#A11C1C] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow hover:shadow-lg transition-all"
                    aria-label={`Demander un devis ${svc.label} sur WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Demander un devis
                  </motion.a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GDS — Notre avantage concurrentiel
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10"
        aria-label="Systèmes GDS Amadeus Sabre Galileo Dakar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre avantage : les 3 GDS mondiaux
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rares sont les agences de Dakar connectées à Amadeus, Sabre <em>et</em> Galileo
              simultanément. C'est notre garantie du meilleur prix, toujours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {gds.map((g, index) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <div className="text-5xl mb-4">{g.emoji}</div>
                <h3 className="text-2xl font-bold text-[#A11C1C] mb-2">{g.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{g.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA bloc GDS — même style que la home */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#A11C1C] rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Accès aux meilleurs tarifs en temps réel
            </h3>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
              Nos agents comparent des millions de tarifs simultanément pour vous proposer
              le prix le plus bas disponible au monde, depuis Dakar.
            </p>
            <motion.a
              href={wa('Bonjour ! Je voudrais obtenir le meilleur tarif pour un billet avion. Pouvez-vous me faire un devis ?')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-[#A11C1C] font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg"
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
              Obtenir le meilleur tarif maintenant
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESTINATIONS — même style cartes que la home
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white"
        aria-label="Destinations vols depuis Dakar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Destinations populaires depuis Dakar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plus de 1 200 destinations dans le monde. Cliquez sur une carte pour
              demander votre devis instantanément.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <motion.article
                key={dest.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-all"
                onClick={() =>
                  window.open(
                    wa(`Bonjour Eazy-Visa ! Je voudrais un billet avion Dakar → ${dest.name} (${dest.code}). Pouvez-vous me faire un devis ?`),
                    '_blank'
                  )
                }
                role="button"
                tabIndex={0}
                aria-label={`Demander un devis billet avion Dakar - ${dest.name}`}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  window.open(wa(`Bonjour ! Je veux un billet Dakar → ${dest.name}.`), '_blank')
                }
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`Vol Dakar ${dest.name} – billet avion pas cher`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold">
                    {dest.flag} {dest.code}
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{dest.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A11C1C] font-bold text-sm">{dest.price}</span>
                    <span className="text-[#25D366] text-xs font-semibold flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> Devis rapide
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a
              href={wa("Bonjour Eazy-Visa ! Je cherche un billet avion et j'aimerais connaître vos tarifs et disponibilités pour ma destination.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#A11C1C] text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Globe className="w-5 h-5" aria-hidden="true" />
              Voir toutes les destinations (1 200+)
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AVANTAGES — même style grille que les steps home
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10"
        aria-label="Pourquoi choisir Eazy-Visa pour votre billetterie"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi choisir Eazy-Visa ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              6 raisons qui font de nous l'agence de billetterie préférée des Sénégalais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {avantages.map((av, index) => {
              const Icon = av.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#A11C1C] mb-5">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{av.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{av.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TEXTE RICHE SEO
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-label="Billetterie aérienne à Dakar Sénégal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              La billetterie aérienne à Dakar : tout ce que vous devez savoir
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              La <strong>billetterie aérienne à Dakar</strong> a considérablement évolué ces dernières
              années. Pour obtenir les meilleurs tarifs, il est indispensable de s'adresser à une agence
              accréditée IATA, disposant d'un accès aux principaux <strong>systèmes GDS</strong>.
              Eazy-Visa est l'une des rares agences de Dakar connectée simultanément à
              <strong> Amadeus</strong>, <strong>Sabre</strong> et <strong>Galileo</strong>.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Billet avion pas cher depuis Dakar : comment ça fonctionne ?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Obtenir un <strong>billet d'avion pas cher depuis Dakar</strong> nécessite une comparaison
              en temps réel des disponibilités de toutes les compagnies. Depuis notre agence de
              <strong> Keur Gorgui à Dakar</strong>, nos agents interrogent simultanément les trois GDS
              pour vous garantir le tarif le plus bas disponible, que vous voyagiez vers
              <strong> Paris, Dubai, New York, Rome, Istanbul</strong> ou toute autre destination.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Paiement flexible adapté au marché sénégalais
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Nous acceptons <strong>Wave</strong>, <strong>Orange Money</strong>, carte bancaire
              Visa/Mastercard, ainsi que le paiement en espèces à notre agence de Keur Gorgui.
              Transactions 100% sécurisées.
            </p>
          </motion.article>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT + FAQ — EXACTEMENT le même bloc que la home
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20"
        aria-label="Contact et FAQ billetterie Eazy-Visa"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#A11C1C] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">

              {/* Colonne gauche : CTA contact WhatsApp */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Une question sur la billetterie ?
                </h2>
                <p className="text-xl mb-8 text-red-100">
                  Billets avion, hôtels, transport, assurance : parlons-en directement.
                </p>

                <div className="space-y-4">
                  <motion.a
                    href={wa("Bonjour Eazy-Visa ! J'ai une question sur vos services de billetterie. Pouvez-vous m'aider ?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                    aria-label="Contacter Eazy-Visa sur WhatsApp"
                  >
                    <MessageCircle className="w-7 h-7 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div>WhatsApp — Réponse immédiate</div>
                      <div className="text-sm font-normal opacity-90">+221 76 767 67 38</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+221767673838"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                    aria-label="Appeler Eazy-Visa billetterie"
                  >
                    <Phone className="w-7 h-7 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div>Appel téléphonique</div>
                      <div className="text-sm font-normal opacity-90">Lun–Dim · 24h/24</div>
                    </div>
                  </motion.a>
                </div>

                <div className="mt-8 space-y-2 text-red-100 text-sm">
                  <p>📍 Cité Keur Gorgui, Immeuble R98, Lot 12 — Dakar</p>
                  <p>🕐 Ouvert 7j/7 · 24h/24</p>
                  <p>💳 Wave · Orange Money · Carte bancaire · Espèces</p>
                </div>
              </motion.div>

              {/* Colonne droite : FAQ — même style details/summary que la home */}
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
                      <summary
                        className="font-semibold flex items-center justify-between"
                      >
                        {item.question}
                        <ChevronRight
                          className="w-5 h-5 transition-transform group-open:rotate-90 flex-shrink-0 ml-2"
                          aria-hidden="true"
                        />
                      </summary>
                      <p
                        className="mt-4 text-red-100 text-sm leading-relaxed"
                      >
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

    </div>
  );
}