/**
 * app/agence-voyage-dakar-senegal/AgenceVoyagePage.tsx
 * ─────────────────────────────────────────────────────────────
 *  Page SEO ultra-optimisée "Agence de Voyage Dakar"
 *  Objectif : ranking #1 sur toutes requêtes "agence voyage"
 * ─────────────────────────────────────────────────────────────
 */
'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

// ── Composants projet
import HeroCarousel from '@/components/HeroCarousel';

// ── Icônes
import {
  Plane, Hotel, FileText, Shield, Globe, Users,
  Clock, Star, CheckCircle, Award, TrendingUp,
  Zap, Headphones, CreditCard, MapPin, Calendar,
  MessageCircle, Phone, ArrowRight, ChevronRight,
} from 'lucide-react';

import { toast } from 'sonner';

// ─── Constantes ──────────────────────────────────────────────
const WA_NUMBER = '221767673838';
const wa = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const heroImages = ['/image2.jpg', '/image4.jpg', '/image5.webp'];

const stats = [
  { value: '10 000+', label: 'Clients satisfaits',    icon: Users,     color: 'text-blue-600' },
  { value: '98%',     label: 'Taux satisfaction',     icon: Star,      color: 'text-yellow-500' },
  { value: '5+ ans',  label: "D'expérience",           icon: Award,     color: 'text-purple-600' },
  { value: '24/7',    label: 'Service disponible',    icon: Clock,     color: 'text-green-600' },
  { value: '1 200+',  label: 'Destinations',          icon: MapPin,    color: 'text-red-600' },
  { value: '3 GDS',   label: 'Amadeus·Sabre·Galileo', icon: Globe,     color: 'text-indigo-600' },
];

const services = [
  {
    icon: Plane,
    title: 'Billetterie Aérienne',
    desc: 'Billets avion toutes compagnies, toutes destinations. Accès GDS Amadeus, Sabre et Galileo pour les meilleurs tarifs du marché.',
    features: ['Prix GDS temps réel', 'Toutes compagnies', 'Émission immédiate', 'Modification gratuite'],
  },
  {
    icon: FileText,
    title: 'Visa & Formalités',
    desc: "Obtention visa Allemagne express (48h), Schengen, USA. Accompagnement complet dans toutes démarches administratives.",
    features: ['Visa Allemagne 48h', 'Dossier clé en main', 'Suivi personnalisé', 'Taux succès 98%'],
  },
  {
    icon: Hotel,
    title: 'Réservation Hôtels',
    desc: 'Hôtels 1★ à 5★ dans le monde entier. Partenariats directs pour tarifs préférentiels. Annulation flexible.',
    features: ['Prix négociés', '200 000+ hôtels', 'Annulation flexible', 'Confirmation immédiate'],
  },
  {
    icon: Globe,
    title: 'Circuits & Excursions',
    desc: 'Circuits touristiques Sénégal et international. Packages sur mesure : désert, plages, safaris, culture.',
    features: ['Sur mesure', 'Guides experts', 'Groupes ou privé', 'Toutes thématiques'],
  },
  {
    icon: Shield,
    title: 'Assurance Voyage',
    desc: 'Couverture médicale internationale, annulation, rapatriement, bagages perdus. Voyagez protégé.',
    features: ['Médicale 100K€', 'Annulation', 'Rapatriement', 'Bagages'],
  },
  {
    icon: Users,
    title: 'Groupes & Entreprises',
    desc: "Organisation voyages d'affaires, séminaires, incentives, congrès. Solutions B2B clé en main.",
    features: ['Devis sur mesure', 'Facturation entreprise', 'Gestionnaire dédié', 'Reporting complet'],
  },
];

const whyAgency = [
  {
    icon: TrendingUp,
    title: 'Meilleurs Prix Garantis',
    desc: "Grâce à nos accords avec les compagnies aériennes et nos accès GDS, nos tarifs sont souvent moins chers que la réservation directe en ligne.",
  },
  {
    icon: Clock,
    title: 'Gain de Temps Massif',
    desc: "Plus besoin de comparer 50 sites. Nous trouvons la meilleure option en quelques minutes et gérons tout pour vous.",
  },
  {
    icon: Headphones,
    title: 'Accompagnement Humain 24/7',
    desc: "Contrairement aux plateformes en ligne, vous avez un interlocuteur disponible en cas d'imprévu (vol annulé, changement urgente, etc.).",
  },
  {
    icon: Shield,
    title: 'Sécurité & Fiabilité',
    desc: "Agence accréditée IATA. Vos paiements sont sécurisés. En cas de faillite d'une compagnie, nous vous protégeons.",
  },
  {
    icon: FileText,
    title: 'Gestion des Formalités',
    desc: "Visa, assurance, formalités douanières : nous gérons tout. Vous voyagez l'esprit tranquille.",
  },
  {
    icon: Award,
    title: 'Expertise Locale & Internationale',
    desc: "5+ années d'expérience, connaissance approfondie des destinations, conseils personnalisés basés sur votre profil.",
  },
];

const destinations = [
  { name: 'Paris',      code: 'CDG', country: 'France',        flag: '🇫🇷', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600' },
  { name: 'Dubaï',      code: 'DXB', country: 'Émirats',       flag: '🇦🇪', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600' },
  { name: 'New York',   code: 'JFK', country: 'USA',           flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=600' },
  { name: 'Rome',       code: 'FCO', country: 'Italie',        flag: '🇮🇹', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600' },
  { name: 'Istanbul',   code: 'IST', country: 'Turquie',       flag: '🇹🇷', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600' },
  { name: 'Barcelone',  code: 'BCN', country: 'Espagne',       flag: '🇪🇸', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600' },
  { name: 'Londres',    code: 'LHR', country: 'Royaume-Uni',   flag: '🇬🇧', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600' },
  { name: 'Le Caire',   code: 'CAI', country: 'Égypte',        flag: '🇪🇬', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600' },
];

const testimonials = [
  {
    name: 'Aminata Diop',
    role: 'Entrepreneure',
    text: "J'organise mes voyages d'affaires avec Eazy-Visa depuis 3 ans. Service impeccable, prix imbattables, réactivité incroyable. C'est simple : je ne passe plus par personne d'autre.",
    rating: 5,
  },
  {
    name: 'Moussa Seck',
    role: 'Famille (4 personnes)',
    text: "Première expérience avec une agence de voyage et je ne regrette rien. Ils ont géré notre voyage en Europe de A à Z : billets, hôtels, visa Schengen, assurance. Tout était parfait. Merci Eazy-Visa !",
    rating: 5,
  },
  {
    name: 'Fatoumata Kane',
    role: 'Étudiante',
    text: "Budget serré d'étudiante, et Eazy-Visa m'a trouvé un billet Paris à un prix que je n'aurais jamais trouvé seule. En plus, ils m'ont aidée gratuitement pour mon dossier visa. Une équipe en or.",
    rating: 5,
  },
];

const faqItems = [
  {
    q: 'Pourquoi choisir une agence de voyage à Dakar ?',
    a: "Une agence de voyage professionnelle vous fait gagner du temps et de l'argent. Eazy-Visa négocie les meilleurs tarifs grâce à ses accès GDS, gère toutes vos démarches, et vous accompagne 24/7 en cas d'imprévu.",
  },
  {
    q: 'Quelle est la meilleure agence de voyage à Dakar ?',
    a: "Eazy-Visa est l'agence #1 à Dakar avec 10 000+ clients satisfaits, un taux de satisfaction de 98%, accès aux 3 GDS mondiaux (Amadeus, Sabre, Galileo), et un service 24/7.",
  },
  {
    q: "Quels services propose une agence de voyage complète ?",
    a: "Une agence complète comme Eazy-Visa propose : billetterie aérienne, visas, hôtels, circuits, assurance voyage, transferts, et assistance 24/7. Concept One Stop Shop.",
  },
  {
    q: 'Combien coûte une agence de voyage à Dakar ?',
    a: "Consultation et devis gratuits chez Eazy-Visa. Tarifs transparents, souvent moins chers que la réservation directe. Commission raisonnable, zéro frais cachés.",
  },
  {
    q: 'Comment contacter une agence de voyage à Dakar ?',
    a: "WhatsApp +221 76 767 67 38 (réponse immédiate), téléphone, ou visite à notre agence Keur Gorgui. Disponibles 7j/7, 24h/24.",
  },
];

// ─── Composant ───────────────────────────────────────────────
export default function AgenceVoyagePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-15 pb-12">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title="Agence de Voyage #1 à Dakar — Votre Partenaire Voyage de Confiance"
            subtitle="Billets avion, visa, hôtels, circuits. Amadeus, Sabre, Galileo. 10 000+ clients satisfaits. Service 24/7. Prix imbattables garantis."
            ctaText="Demander un devis gratuit"
            ctaTargetId="#devis"
          />

          {/* CTA flottant */}
          <motion.div
            id="devis"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                <span className="text-[#A11C1C]">Eazy-Visa</span> — L'agence de voyage qui change tout
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Plus besoin de perdre des heures à comparer. Nous trouvons <strong>le meilleur prix</strong>,
                gérons <strong>toutes vos démarches</strong>, et restons disponibles <strong>24h/24</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={wa('Bonjour Eazy-Visa ! Je souhaite organiser un voyage. Pouvez-vous m\'aider ?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Devis gratuit WhatsApp
                </motion.a>

                <motion.a
                  href="tel:+221767673838"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A11C1C] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  <Phone className="w-6 h-6" />
                  +221 76 767 67 38
                </motion.a>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Devis gratuit
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Sans engagement
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Réponse immédiate
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              L'agence de voyage de référence à Dakar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chiffres clés qui font d'Eazy-Visa votre meilleur choix pour voyager sereinement.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                  <div className={`text-3xl font-extrabold mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          POURQUOI AGENCE DE VOYAGE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Pourquoi passer par une agence de voyage ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La réservation en ligne semble pratique... jusqu'à ce que quelque chose tourne mal.
              Voici pourquoi une agence professionnelle change tout.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyAgency.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-[#A11C1C]/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#A11C1C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES COMPLETS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Services complets d'agence de voyage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la réservation à l'atterrissage, nous gérons <strong>absolument tout</strong>.
              C'est ça, le concept <em>One Stop Shop</em>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-[#A11C1C] rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{svc.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{svc.desc}</p>
                  <ul className="space-y-2">
                    {svc.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={wa('Bonjour ! Je voudrais en savoir plus sur vos services d\'agence de voyage. Pouvez-vous me renseigner ?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#A11C1C] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Parler à un conseiller voyage maintenant
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESTINATIONS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Destinations populaires depuis Dakar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre agence de voyage couvre plus de 1 200 destinations dans le monde.
              Cliquez pour obtenir un devis instantané.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                onClick={() =>
                  window.open(
                    wa(`Bonjour Eazy-Visa ! Je souhaite voyager à ${dest.name}. Pouvez-vous me faire un devis ?`),
                    '_blank'
                  )
                }
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={dest.image}
                    alt={`Voyage ${dest.name} avec agence Eazy-Visa Dakar`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                    {dest.flag} {dest.code}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{dest.name}</h3>
                    <p className="text-sm opacity-90">{dest.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TÉMOIGNAGES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ce que nos clients disent de nous
            </h2>
            <p className="text-xl text-gray-600">
              10 000+ voyageurs nous font confiance. Voici pourquoi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TEXTE RICHE SEO — 800+ mots
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Agence de voyage à Dakar : le guide complet 2025
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Choisir une <strong>agence de voyage à Dakar</strong> peut sembler compliqué face à la multiplication
              des acteurs du secteur. Pourtant, passer par une <strong>agence de voyage professionnelle</strong> reste
              la meilleure décision pour voyager sereinement, obtenir les meilleurs tarifs, et bénéficier d'un
              accompagnement de A à Z.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Qu'est-ce qu'une agence de voyage et pourquoi en avoir besoin ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Une <strong>agence de voyage</strong> est un intermédiaire professionnel entre vous et les prestataires
              de services touristiques (compagnies aériennes, hôtels, compagnies d'assurance, administrations consulaires).
              Contrairement à ce que beaucoup pensent, une <strong>bonne agence de voyage</strong> ne coûte pas plus cher
              que la réservation directe — elle coûte souvent <em>moins cher</em> grâce à ses accords commerciaux et accès
              privilégiés aux systèmes GDS.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              À Dakar, <strong>Eazy-Visa</strong> se distingue comme l'<strong>agence de voyage de référence</strong>
              avec plus de 10 000 clients satisfaits, un taux de satisfaction de 98%, et un accès simultané aux trois
              principaux GDS mondiaux : <strong>Amadeus</strong>, <strong>Sabre</strong> et <strong>Galileo</strong>.
              Cette triple connexion nous permet de comparer des millions de tarifs en temps réel pour vous garantir
              le meilleur prix disponible.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Les services d'une agence de voyage complète au Sénégal
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Une <strong>agence de voyage complète</strong> comme Eazy-Visa ne se limite pas à la vente de billets d'avion.
              Nos services couvrent l'intégralité de votre expérience voyage :
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>Billetterie aérienne internationale :</strong> accès aux tarifs GDS de toutes les compagnies,
                émission immédiate, modification et annulation flexible
              </li>
              <li>
                <strong>Obtention de visa :</strong> visa Allemagne express en 48h, visa Schengen, accompagnement
                complet dans les démarches administratives
              </li>
              <li>
                <strong>Réservation hôtelière :</strong> de 1 à 5 étoiles, partout dans le monde, tarifs négociés,
                annulation flexible
              </li>
              <li>
                <strong>Circuits touristiques :</strong> packages sur mesure au Sénégal et à l'international, groupes
                ou privés
              </li>
              <li>
                <strong>Assurance voyage :</strong> couverture médicale internationale, rapatriement, annulation,
                bagages perdus
              </li>
              <li>
                <strong>Services entreprises :</strong> organisation voyages d'affaires, séminaires, incentives
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Agence de voyage vs réservation en ligne : le vrai comparatif
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Les plateformes de réservation en ligne ont démocratisé l'accès aux voyages, mais elles présentent des
              limites majeures que seule une <strong>agence de voyage physique</strong> peut compenser :
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Prix :</strong> contrairement aux idées reçues, les <strong>agences de voyage accréditées IATA</strong>
              comme Eazy-Visa ont accès à des tarifs que les particuliers ne peuvent pas obtenir en ligne. Nos accords
              avec les compagnies aériennes et notre accès aux GDS nous permettent souvent de proposer des prix
              <em> inférieurs</em> à ceux affichés sur les sites de réservation.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Assistance :</strong> quand votre vol est annulé à 23h ou que vous êtes bloqué à l'aéroport,
              les plateformes en ligne ne répondent pas. Une <strong>agence de voyage avec service 24/7</strong> comme
              la nôtre reste joignable et résout votre problème en temps réel.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Expertise :</strong> nos conseillers voyages connaissent les destinations, les compagnies fiables,
              les meilleures périodes de voyage, les formalités administratives. Cette expertise humaine est irremplaçable.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Comment choisir la meilleure agence de voyage à Dakar ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Face à la multitude d'<strong>agences de voyage à Dakar</strong>, voici les critères essentiels pour
              faire le bon choix :
            </p>

            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>Accréditation IATA :</strong> garantie de sérieux et accès aux tarifs professionnels
              </li>
              <li>
                <strong>Accès aux GDS :</strong> Amadeus, Sabre ou Galileo (idéalement les trois comme Eazy-Visa)
              </li>
              <li>
                <strong>Ancienneté et réputation :</strong> minimum 5 ans d'expérience, avis clients vérifiables
              </li>
              <li>
                <strong>Transparence tarifaire :</strong> devis détaillés, aucun frais caché
              </li>
              <li>
                <strong>Disponibilité :</strong> service client joignable 7j/7, idéalement 24h/24
              </li>
              <li>
                <strong>Localisation :</strong> agence physique facilement accessible (nous sommes à Keur Gorgui)
              </li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Eazy-Visa : votre agence de voyage de confiance à Dakar
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Depuis plus de 5 ans, <strong>Eazy-Visa</strong> accompagne les voyageurs sénégalais dans leurs projets
              de voyage. Notre force ? Un service irréprochable, des tarifs imbattables, et une disponibilité totale.
              Que vous partiez pour des vacances en famille, un voyage d'affaires, des études à l'étranger ou un
              pèlerinage, notre équipe gère tout de A à Z.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Contactez-nous dès aujourd'hui pour un <strong>devis gratuit et sans engagement</strong>. Notre promesse :
              vous proposer la meilleure solution au meilleur prix, avec un accompagnement humain incomparable.
            </p>
          </motion.article>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Questions fréquentes sur les agences de voyage
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight className="w-5 h-5 text-[#A11C1C]" />
                  </motion.div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#A11C1C] rounded-3xl overflow-hidden p-12 md:p-16 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                Prêt à voyager avec la meilleure agence de Dakar ?
              </h2>
              <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                Devis gratuit en moins de 5 minutes. Nos conseillers voyage sont disponibles
                <strong> 24h/24, 7j/7</strong> pour vous accompagner.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={wa('Bonjour Eazy-Visa ! Je souhaite organiser un voyage. Pouvez-vous m\'aider ?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white font-extrabold rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-xl"
                >
                  <MessageCircle className="w-7 h-7" />
                  WhatsApp — Devis immédiat
                </motion.a>

                <motion.a
                  href="tel:+221767673838"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#A11C1C] font-extrabold rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-xl"
                >
                  <Phone className="w-7 h-7" />
                  +221 76 767 67 38
                </motion.a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-red-200 text-sm">
                <span>📍 Keur Gorgui, Dakar</span>
                <span>🕐 Lun–Dim · 24h/24</span>
                <span>💳 Wave · Orange Money · CB · Espèces</span>
                <span>✅ 10 000+ clients satisfaits</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}