/**
 * app/billet-avion-dakar/BilletAvionPage.tsx
 * ─────────────────────────────────────────────────────────────
 *  Page ultra-transactionnelle "Billet Avion Dakar"
 *  Objectif : #1 sur "acheter billet avion dakar" et variantes
 * ─────────────────────────────────────────────────────────────
 */
'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

// ── Composants projet
import HeroCarousel from '@/components/HeroCarousel';

// ── Icônes
import {
  Plane, Clock, Shield, Globe, TrendingUp,
  CheckCircle, Award, Zap, CreditCard, Users,
  MapPin, Calendar, MessageCircle, Phone, 
  ArrowRight, ChevronRight, Star, Headphones,
} from 'lucide-react';

import { toast } from 'sonner';

// ─── Constantes ──────────────────────────────────────────────
const WA_NUMBER = '221767673838';
const wa = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const heroImages = ['/image2.jpg', '/image4.jpg', '/image5.webp'];

const stats = [
  { value: '2 847',   label: 'Billets vendus/mois', icon: Plane },
  { value: '98%',     label: 'Clients satisfaits',  icon: Star },
  { value: '-30%',    label: 'vs prix en ligne',    icon: TrendingUp },
  { value: '< 5 min', label: 'Émission e-ticket',   icon: Zap },
];

const destinations = [
  { 
    name: 'Paris', 
    code: 'CDG', 
    country: 'France', 
    flag: '🇫🇷', 
    price: 'Dès 320 000 FCFA',
    priceValue: 320000,
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600',
    popular: true,
  },
  { 
    name: 'Dubaï', 
    code: 'DXB', 
    country: 'Émirats', 
    flag: '🇦🇪', 
    price: 'Dès 280 000 FCFA',
    priceValue: 280000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
    popular: true,
  },
  { 
    name: 'Casablanca', 
    code: 'CMN', 
    country: 'Maroc', 
    flag: '🇲🇦', 
    price: 'Dès 120 000 FCFA',
    priceValue: 120000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    popular: true,
  },
  { 
    name: 'New York', 
    code: 'JFK', 
    country: 'USA', 
    flag: '🇺🇸', 
    price: 'Dès 450 000 FCFA',
    priceValue: 450000,
    image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=600',
  },
  { 
    name: 'Rome', 
    code: 'FCO', 
    country: 'Italie', 
    flag: '🇮🇹', 
    price: 'Dès 295 000 FCFA',
    priceValue: 295000,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600',
  },
  { 
    name: 'Istanbul', 
    code: 'IST', 
    country: 'Turquie', 
    flag: '🇹🇷', 
    price: 'Dès 260 000 FCFA',
    priceValue: 260000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600',
  },
  { 
    name: 'Abidjan', 
    code: 'ABJ', 
    country: 'Côte d\'Ivoire', 
    flag: '🇨🇮', 
    price: 'Dès 95 000 FCFA',
    priceValue: 95000,
    image: 'https://images.unsplash.com/photo-1580656449346-a9cb6f7f569b?w=600',
    popular: true,
  },
  { 
    name: 'Madrid', 
    code: 'MAD', 
    country: 'Espagne', 
    flag: '🇪🇸', 
    price: 'Dès 290 000 FCFA',
    priceValue: 290000,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600',
  },
];

const garanties = [
  {
    icon: TrendingUp,
    title: 'Meilleur Prix Garanti',
    desc: 'Si vous trouvez moins cher ailleurs avec les mêmes conditions, nous alignons le prix ou vous remboursons la différence.',
  },
  {
    icon: Zap,
    title: 'Émission Immédiate',
    desc: 'Votre e-ticket par email en moins de 5 minutes après confirmation du paiement. Pas d\'attente.',
  },
  {
    icon: Shield,
    title: 'Paiement 100% Sécurisé',
    desc: 'Wave, Orange Money, carte bancaire ou espèces. Toutes vos transactions sont cryptées et protégées.',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    desc: 'Modification, annulation, vol retardé ? Nous sommes joignables à tout moment, même à 3h du matin.',
  },
  {
    icon: CheckCircle,
    title: 'Sans Frais Cachés',
    desc: 'Le prix affiché est le prix final. Zéro surprise au moment du paiement. Transparence totale.',
  },
  {
    icon: Award,
    title: 'Expertise 5+ Ans',
    desc: 'Plus de 30 000 billets vendus, 98% de satisfaction client. Nous connaissons notre métier.',
  },
];

const avantagesGDS = [
  {
    title: 'Accès aux Tarifs Négociés',
    desc: 'Nos accords avec les compagnies nous donnent accès à des tarifs confidentiels impossibles à trouver en ligne.',
  },
  {
    title: 'Comparaison en Temps Réel',
    desc: '3 GDS = 3 fois plus de chances de trouver le tarif le plus bas. Nous interrogeons Amadeus, Sabre ET Galileo simultanément.',
  },
  {
    title: 'Disponibilité Réelle',
    desc: 'Fini les « ce tarif n\'est plus disponible » après 30 min de recherche. Nos tarifs sont confirmés en direct.',
  },
];

const processAchat = [
  { 
    num: '1', 
    title: 'Contactez-nous', 
    desc: 'WhatsApp, téléphone ou visite en agence. Donnez-nous votre destination, dates et nombre de passagers.',
    icon: MessageCircle,
  },
  { 
    num: '2', 
    title: 'Devis instantané', 
    desc: 'Nous interrogeons nos 3 GDS et vous présentons le meilleur tarif disponible en moins de 5 minutes.',
    icon: Zap,
  },
  { 
    num: '3', 
    title: 'Confirmation', 
    desc: 'Vous validez le tarif, les horaires et les conditions. Nous bloquons la réservation.',
    icon: CheckCircle,
  },
  { 
    num: '4', 
    title: 'Paiement sécurisé', 
    desc: 'Wave, Orange Money, CB ou espèces. Simple, rapide et 100% protégé.',
    icon: CreditCard,
  },
  { 
    num: '5', 
    title: 'Réception e-ticket', 
    desc: 'Votre billet électronique arrive par email. Imprimez-le ou gardez-le sur votre téléphone. C\'est fait !',
    icon: Plane,
  },
];

const testimonials = [
  {
    name: 'Khady Ndiaye',
    text: 'J\'ai acheté mon billet Paris chez Eazy-Visa à 315 000 FCFA alors que partout ailleurs c\'était minimum 380 000 FCFA. Service impeccable, billet reçu en 3 minutes. Je recommande à 100% !',
    rating: 5,
  },
  {
    name: 'Mamadou Fall',
    text: 'Vol de dernière minute pour Dubai. Ils m\'ont trouvé un billet à un prix incroyable en pleine haute saison. Franchement, je ne sais pas comment ils font mais c\'est magique.',
    rating: 5,
  },
  {
    name: 'Aissatou Diallo',
    text: 'Première fois que j\'achète un billet avion et l\'équipe Eazy-Visa m\'a tout expliqué. Prix très correct, paiement Wave accepté, et billet reçu immédiatement. Parfait.',
    rating: 5,
  },
];

const faqItems = [
  {
    q: 'Comment acheter un billet avion pas cher à Dakar ?',
    a: 'Contactez Eazy-Visa au +221 76 767 67 38. Nous avons accès aux 3 GDS mondiaux (Amadeus, Sabre, Galileo) pour comparer des millions de tarifs et vous garantir le meilleur prix.',
  },
  {
    q: 'Où acheter un billet avion à Dakar ?',
    a: 'Chez Eazy-Visa, Keur Gorgui (Cité Keur Gorgui, Immeuble R98, Lot 12). Réservation également par WhatsApp au +221 76 767 67 38 avec émission immédiate.',
  },
  {
    q: 'Quel est le prix d\'un billet avion depuis Dakar ?',
    a: 'Prix variables : Casablanca dès 120 000 FCFA, Paris dès 320 000 FCFA, Dubai dès 280 000 FCFA, New York dès 450 000 FCFA. Contactez-nous pour un devis gratuit en temps réel.',
  },
  {
    q: 'Comment payer mon billet avion à Dakar ?',
    a: 'Wave, Orange Money, carte bancaire Visa/Mastercard, ou espèces à notre agence. Paiement 100% sécurisé, émission immédiate.',
  },
  {
    q: 'Puis-je modifier ou annuler mon billet avion ?',
    a: 'Oui, selon les conditions tarifaires. Contactez-nous dès que possible. Notre service client 24/7 vous assiste.',
  },
];

// ─── Composant ───────────────────────────────────────────────
export default function BilletAvionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getNextWeekDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [searchForm, setSearchForm] = useState({
    from: 'Dakar (DSS)',
    to: '',
    date: getNextWeekDate(),
    pax: 1,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchForm.to || !searchForm.date) {
      toast.error('Informations manquantes', {
        description: 'Veuillez renseigner la destination et la date.',
      });
      return;
    }

    const msg =
      `Bonjour Eazy-Visa 👋\n\n` +
      `Je souhaite acheter un billet avion :\n` +
      `✈️ Départ : ${searchForm.from}\n` +
      `🏁 Destination : ${searchForm.to}\n` +
      `📅 Date : ${searchForm.date}\n` +
      `👥 Passagers : ${searchForm.pax}\n\n` +
      `Pouvez-vous me faire un devis au meilleur prix ?`;

    window.open(wa(msg), '_blank');
    toast.success('Redirection WhatsApp…', {
      description: 'Votre demande de devis est en cours d\'envoi.',
    });
  };

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
            title="Billet Avion Dakar — Meilleur Prix Garanti ou Remboursé"
            subtitle="Amadeus · Sabre · Galileo. Émission immédiate. Paiement Wave/Orange Money. 2 847 billets vendus/mois. Prix jusqu'à -30% vs sites en ligne."
            ctaText="Acheter mon billet maintenant"
            ctaTargetId="#achat"
          />

          {/* Formulaire recherche billet */}
          <motion.div
            id="achat"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  Achetez votre billet avion au meilleur prix
                </h1>
                <p className="text-base md:text-lg text-gray-600">
                  <strong className="text-[#A11C1C]">Meilleur prix garanti</strong> grâce à nos 3 GDS.
                  Devis gratuit en moins de 5 minutes.
                </p>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Départ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchForm.from}
                        onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchForm.to}
                        onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                        placeholder="ex: Paris, Dubai..."
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de départ
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchForm.date}
                        onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Passagers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={searchForm.pax}
                        onChange={(e) => setSearchForm({ ...searchForm, pax: parseInt(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A11C1C] focus:border-transparent appearance-none cursor-pointer"
                      >
                        {[1,2,3,4,5,6,7,8,9].map(n => (
                          <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#A11C1C] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Obtenir le meilleur prix maintenant
                </motion.button>
              </form>

              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" /> Devis gratuit
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" /> Prix GDS temps réel
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" /> Émission en 5 min
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-[#A11C1C]" />
                  <div className="text-3xl font-extrabold text-[#A11C1C] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESTINATIONS + PRIX
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
              Prix billets avion depuis Dakar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tarifs indicatifs mis à jour quotidiennement. Cliquez pour obtenir un devis précis
              selon vos dates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    wa(`Bonjour ! Je voudrais acheter un billet avion Dakar → ${dest.name} (${dest.code}). Quel est votre meilleur prix ?`),
                    '_blank'
                  )
                }
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer relative"
              >
                {dest.popular && (
                  <div className="absolute top-3 left-3 bg-[#A11C1C] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    POPULAIRE
                  </div>
                )}
                <div className="relative h-48">
                  <Image
                    src={dest.image}
                    alt={`Billet avion Dakar ${dest.name} pas cher`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                    {dest.flag} {dest.code}
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{dest.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A11C1C] font-extrabold text-lg">{dest.price}</span>
                    <span className="text-[#25D366] text-xs font-semibold flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> Acheter
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={wa('Bonjour ! Je cherche un billet avion depuis Dakar. Pouvez-vous me donner vos meilleurs tarifs ?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#A11C1C] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              <Globe className="w-5 h-5" />
              Voir tous les prix (1 200+ destinations)
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GARANTIES
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
              Nos garanties : achetez en toute confiance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {garanties.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="w-14 h-14 bg-[#A11C1C]/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#A11C1C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{g.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{g.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AVANTAGE GDS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-[#A11C1C]/10 text-[#A11C1C] text-sm font-bold px-4 py-2 rounded-full mb-4">
                Notre secret : les 3 GDS
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Pourquoi nos billets avion sont moins chers ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Eazy-Visa est la seule agence de Dakar avec accès simultané à
                <strong> Amadeus</strong>, <strong>Sabre</strong> et <strong>Galileo</strong> —
                les 3 systèmes GDS mondiaux. C'est simple : plus de systèmes = plus de tarifs
                comparés = meilleur prix pour vous.
              </p>

              <div className="space-y-4">
                {avantagesGDS.map((av, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{av.title}</h4>
                      <p className="text-gray-600 text-sm">{av.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#A11C1C] to-[#8b1515] rounded-3xl p-10 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Comparaison Prix Moyen</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Sites de réservation en ligne</span>
                    <span className="font-bold">450 000 FCFA</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="flex items-center gap-2">
                      Eazy-Visa (avec GDS)
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">-30%</span>
                    </span>
                    <span className="font-bold">315 000 FCFA</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-red-100 mt-6">
                * Prix moyens constatés sur Paris. Économies variables selon destination et période.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESSUS D'ACHAT
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
              Comment acheter votre billet avion ?
            </h2>
            <p className="text-xl text-gray-600">
              5 étapes simples. Tout est fait en moins de 10 minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processAchat.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="relative inline-flex flex-col items-center mb-4">
                    <div className="w-16 h-16 bg-[#A11C1C] rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-gray-900 text-sm font-extrabold rounded-full flex items-center justify-center z-20">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TÉMOIGNAGES
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
              Ils ont acheté leur billet chez nous
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="font-bold text-gray-900">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TEXTE RICHE SEO — 900+ mots
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Acheter un billet avion à Dakar : guide complet 2025
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Acheter un <strong>billet avion à Dakar</strong> peut sembler simple, mais obtenir le
              <strong> meilleur prix</strong> nécessite expertise et accès aux bons outils. Ce guide
              vous explique comment acheter votre <strong>billet d'avion pas cher depuis Dakar</strong>,
              quels pièges éviter, et pourquoi passer par une agence spécialisée comme Eazy-Visa
              vous fait économiser jusqu'à 30%.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Où acheter un billet avion à Dakar ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Pour <strong>acheter un billet avion à Dakar</strong>, vous avez plusieurs options :
              sites de réservation en ligne, compagnies aériennes directement, ou agences de voyage
              physiques. Chaque option a ses avantages et inconvénients.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Les <strong>sites de réservation en ligne</strong> (Kayak, Skyscanner, etc.) sont pratiques
              mais affichent rarement les tarifs les plus bas. Pourquoi ? Parce qu'ils n'ont pas accès
              aux tarifs négociés réservés aux agences accréditées IATA. De plus, en cas de problème
              (vol annulé, modification), leur support client est souvent inexistant ou payant.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Acheter directement auprès de la <strong>compagnie aérienne</strong> semble logique,
              mais vous ne comparez qu'une seule offre. Or, pour le même trajet, les tarifs varient
              énormément entre compagnies. Sans comparaison multi-compagnies, vous payez souvent trop cher.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              L'option optimale reste une <strong>agence de voyage spécialisée en billetterie</strong>
              comme <strong>Eazy-Visa</strong>. Nous avons accès aux 3 systèmes GDS mondiaux (Amadeus,
              Sabre, Galileo), ce qui nous permet de comparer des millions de tarifs en temps réel et
              vous garantir le meilleur prix du marché. Notre commission est minime, souvent compensée
              par les économies réalisées sur le tarif.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Prix billet avion depuis Dakar : à quoi s'attendre ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Le <strong>prix d'un billet avion depuis Dakar</strong> varie considérablement selon
              la destination, la période, la compagnie et surtout le canal d'achat. Voici quelques
              repères de prix pour des destinations populaires (tarifs indicatifs aller-retour) :
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Dakar - Casablanca :</strong> à partir de 120 000 FCFA</li>
              <li><strong>Dakar - Abidjan :</strong> à partir de 95 000 FCFA</li>
              <li><strong>Dakar - Paris :</strong> à partir de 320 000 FCFA</li>
              <li><strong>Dakar - Dubai :</strong> à partir de 280 000 FCFA</li>
              <li><strong>Dakar - New York :</strong> à partir de 450 000 FCFA</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              Ces tarifs sont ceux que nous proposons chez Eazy-Visa grâce à nos accès GDS. Sur les
              sites en ligne grand public, vous trouverez souvent ces mêmes billets à 20-40% plus cher.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Comment obtenir un billet avion pas cher à Dakar ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Pour obtenir un <strong>billet avion pas cher depuis Dakar</strong>, suivez ces conseils :
            </p>

            <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
              <li>
                <strong>Réservez à l'avance :</strong> les meilleurs tarifs sont disponibles 2-3 mois
                avant le départ. Les réservations de dernière minute sont toujours plus chères.
              </li>
              <li>
                <strong>Soyez flexible sur les dates :</strong> décaler votre départ de quelques jours
                peut diviser le prix par deux. Voyager en milieu de semaine est généralement moins cher.
              </li>
              <li>
                <strong>Évitez les périodes de pointe :</strong> vacances scolaires, fêtes religieuses,
                haute saison touristique = prix élevés. Privilégiez les périodes creuses.
              </li>
              <li>
                <strong>Passez par une agence avec accès GDS :</strong> c'est le point le plus important.
                Seules les agences accréditées IATA avec accès GDS ont les vrais meilleurs tarifs.
              </li>
              <li>
                <strong>Considérez les escales :</strong> un vol direct est confortable, mais un vol avec
                escale peut coûter 30-50% moins cher.
              </li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Pourquoi Eazy-Visa pour votre billet avion à Dakar ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Eazy-Visa</strong> n'est pas une agence de voyage ordinaire. Nous sommes
              spécialisés en billetterie internationale avec un track record de plus de 30 000 billets
              vendus et un taux de satisfaction client de 98%.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Notre force principale : l'accès <strong>simultané aux 3 GDS mondiaux</strong>
              (Amadeus, Sabre, Galileo). Cette triple connexion est rare même parmi les agences
              professionnelles. Elle nous permet de comparer des millions de combinaisons tarifaires
              et vous garantir le meilleur prix absolu.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Concrètement, quand vous nous contactez pour <strong>acheter un billet avion</strong>,
              nous interrogeons les 3 systèmes simultanément, comparons tous les tarifs disponibles
              pour votre trajet, et vous proposons l'option optimale en moins de 5 minutes. Si vous
              trouvez moins cher ailleurs avec les mêmes conditions, nous alignons le prix ou vous
              remboursons la différence — c'est notre garantie meilleur prix.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Réserver un billet avion à Dakar : le processus
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Réserver votre billet avion</strong> chez Eazy-Visa est simple :
            </p>

            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              <li>Contactez-nous par WhatsApp (+221 76 767 67 38), téléphone, ou visite en agence</li>
              <li>Donnez-nous votre destination, vos dates et le nombre de passagers</li>
              <li>Nous interrogeons nos GDS et vous présentons le meilleur tarif en moins de 5 minutes</li>
              <li>Vous validez la réservation</li>
              <li>Vous payez (Wave, Orange Money, CB ou espèces)</li>
              <li>Nous émettons votre e-ticket immédiatement et vous l'envoyons par email</li>
            </ol>

            <p className="text-gray-700 leading-relaxed">
              Tout est fait en moins de 10 minutes. Votre billet est émis, payé, et dans votre boîte
              mail. Simple, rapide, et au meilleur prix. C'est ça, l'expérience Eazy-Visa.
            </p>
          </motion.article>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Questions fréquentes
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
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
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
      

    </div>
  );
}