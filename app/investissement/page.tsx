"use client";
import { motion } from 'motion/react';
import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Target,
  Rocket, 
  Globe, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Star,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

export default function InvestmentPage() {
  const heroImages = [
    'https://images.unsplash.com/photo-1560472355-536de3962603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  ];

  const stats = [
    { label: 'Croissance', value: '+200%', desc: 'en 2 ans', icon: TrendingUp },
    { label: 'CA 2024', value: '2M+', desc: 'FCFA', icon: DollarSign },
    { label: 'Clients actifs', value: '10K+', desc: 'clients', icon: BarChart3 },
    { label: 'Objectif 2026', value: '50K+', desc: 'clients', icon: Target },
  ];

  const strengths = [
    {
      icon: Rocket,
      title: 'Marché en Croissance Explosive',
      description: 'Le marché du voyage en Afrique de l\'Ouest connaît une croissance annuelle de 15%. La classe moyenne africaine devrait atteindre 1,1 milliard de personnes d\'ici 2060. Nous sommes positionnés pour capturer cette opportunité historique.',
    },
    {
      icon: Award,
      title: 'Modèle Économique Éprouvé',
      description: '5+ années d\'expérience, 10,000+ clients satisfaits, et un taux de satisfaction de 98%. Notre modèle génère des revenus récurrents avec des marges supérieures à 25% sur la billetterie et les services visa.',
    },
    {
      icon: Globe,
      title: 'Expansion Régionale Stratégique',
      description: 'Plans d\'expansion vers la Côte d\'Ivoire, le Mali et le Burkina Faso en 2026. Potentiel de 100M d\'habitants dans notre zone d\'expansion. Partenariats stratégiques déjà établis.',
    },
    {
      icon: Users,
      title: 'Équipe Expérimentée & Passionnée',
      description: 'Fondateurs avec 10+ ans d\'expérience combinée dans le voyage et la tech. Équipe de 15+ personnes dévouées. Vision claire et exécution sans faille.',
    },
  ];

  const financials = [
    { label: 'Chiffre d\'affaires 2024', value: '2.5M FCFA', growth: '+180%' },
    { label: 'Marge brute', value: '28%', growth: '+5pts' },
    { label: 'Clients actifs', value: '10,247', growth: '+210%' },
    { label: 'Ticket moyen', value: '245K FCFA', growth: '+15%' },
  ];

  const useCases = [
    {
      title: 'Billetterie Nouvelle Génération',
      points: [
        'Plateforme 100% digitale 24/7',
        'Paiements mobiles intégrés (Wave, Orange Money)',
        'Prix transparents sans frais cachés',
        'Support client réactif H24',
      ],
    },
    {
      title: 'Services Visa Premium',
      points: [
        'Accompagnement complet A-Z',
        'Taux d\'acceptation de 95%+',
        'Traitement accéléré disponible',
        'Formation linguistique incluse',
      ],
    },
    {
      title: 'Corporate Travel Management',
      points: [
        'Solution B2B pour entreprises',
        'Gestion centralisée des voyages',
        'Reporting et analytics détaillés',
        'Support dédié pour grandes équipes',
      ],
    },
  ];

  const milestones = [
    { year: '2020', event: 'Lancement d\'Eazy-Visa', metric: '500 clients' },
    { year: '2022', event: 'Plateforme digitale lancée', metric: '3,000 clients' },
    { year: '2024', event: 'Levée de fonds Seed', metric: '10,000+ clients' },
    { year: '2026', event: 'Expansion régionale (CI, ML, BF)', metric: 'Objectif 50K clients' },
    { year: '2028', event: 'Leader Afrique de l\'Ouest', metric: 'Objectif 200K clients' },
  ];

  const faqItems = [
    {
      question: 'Quel est le montant recherché pour cette levée de fonds ?',
      answer: 'Nous recherchons actuellement 500M FCFA (≈750K€) pour financer notre expansion régionale, renforcer notre équipe tech et marketing, et développer notre offre Corporate. Cette levée nous permettra d\'atteindre nos objectifs de 50K clients d\'ici 2026.',
    },
    {
      question: 'Quelle est votre stratégie de croissance ?',
      answer: 'Notre stratégie repose sur 3 piliers : 1) Expansion géographique (Côte d\'Ivoire, Mali, Burkina Faso), 2) Diversification de l\'offre (Corporate, packages vacances), 3) Digitalisation complète avec une app mobile de nouvelle génération.',
    },
    {
      question: 'Qui sont vos principaux concurrents ?',
      answer: 'Nos concurrents directs sont les agences de voyage traditionnelles et quelques startups émergentes. Notre avantage : une plateforme 100% digitale, des prix transparents, et un service client 24/7. Nous sommes les seuls à offrir cette combinaison en Afrique de l\'Ouest.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative pt-24 pb-12">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[634px]"
            title={"Investissez dans le voyage de demain — une opportunité africaine unique."}
            subtitle={"Croissance explosive, modèle éprouvé, expansion régionale. Rejoignez-nous pour transformer le voyage en Afrique de l'Ouest et générer des retours exceptionnels."}
            ctaText="Découvrir l'opportunité"
            ctaTargetId="main-content"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Une Croissance Exceptionnelle
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats qui parlent d'eux-mêmes
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
                <div className="text-4xl font-bold text-[#A11C1C] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi investir dans Eazy-Visa ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une opportunité unique dans un secteur en pleine expansion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-6"
                >
                  <strength.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{strength.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Performance */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Performance Financière 2024
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financials.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div className="text-sm text-gray-300 mb-2">{item.label}</div>
                <div className="text-3xl font-bold mb-2">{item.value}</div>
                <div className="text-green-400 text-sm font-semibold">↗ {item.growth}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre Offre de Services
            </h2>
            <p className="text-xl text-gray-600">
              Un écosystème complet pour tous les besoins de voyage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10 rounded-2xl p-8 shadow-xl border-2 border-[#A11C1C]/20"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{useCase.title}</h3>
                <ul className="space-y-3">
                  {useCase.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#A11C1C] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre Roadmap de Croissance
            </h2>
            <p className="text-xl text-gray-600">
              De la startup au leader régional
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 w-24 h-24 rounded-full bg-[#A11C1C] flex items-center justify-center text-white text-xl font-bold"
                >
                  {milestone.year}
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{milestone.event}</h3>
                  <p className="text-[#A11C1C] font-semibold text-lg">{milestone.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
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
                  Parlons de votre investissement
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Particuliers, fonds d'investissement ou business angels : contactez-nous.
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option className="text-gray-900">Type d'investisseur</option>
                    <option className="text-gray-900">Investisseur Individuel</option>
                    <option className="text-gray-900">Fonds d'Investissement</option>
                    <option className="text-gray-900">Business Angel</option>
                    <option className="text-gray-900">Venture Capital</option>
                    <option className="text-gray-900">Family Office</option>
                  </select>
                  <textarea
                    rows={4}
                    placeholder="Parlez-nous de votre intérêt..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success('Message envoyé! Nous vous contacterons sous 48h.')}
                    className="w-full py-3 bg-white text-[#A11C1C] rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    ENVOYER LE MESSAGE
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Questions Fréquentes
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
                        <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-4 opacity-90 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.details>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <h4 className="font-bold text-lg mb-4">Documents Disponibles</h4>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.success('Pitch Deck téléchargé!')}
                      className="w-full py-2 px-4 bg-white text-[#A11C1C] rounded-lg font-semibold text-sm"
                    >
                      📊 Pitch Deck (PDF)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.success('États Financiers téléchargés!')}
                      className="w-full py-2 px-4 bg-white text-[#A11C1C] rounded-lg font-semibold text-sm"
                    >
                      💰 États Financiers (PDF)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.success('Étude de Marché téléchargée!')}
                      className="w-full py-2 px-4 bg-white text-[#A11C1C] rounded-lg font-semibold text-sm"
                    >
                      📈 Étude de Marché (PDF)
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}