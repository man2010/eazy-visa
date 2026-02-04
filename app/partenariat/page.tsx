'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  Handshake, 
  TrendingUp, 
  Globe, 
  Users,
  Building2,
  Plane,
  Hotel,
  CreditCard,
  Shield,
  Target,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner';

export default function PartnershipPage() {
  const heroImages = [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  ];

  const stats = [
    { label: 'Collaboration', value: 'Win-Win', icon: Handshake },
    { label: 'Croissance', value: 'Mutuelle', icon: TrendingUp },
    { label: 'Réseau', value: 'International', icon: Globe },
    { label: 'Clients', value: '10,000+', icon: Users },
  ];

  const partnerTypes = [
    {
      icon: Plane,
      title: 'Compagnies Aériennes',
      description: 'Développez votre présence sur le marché africain avec un partenaire de confiance. Nous offrons à vos vols une visibilité exceptionnelle auprès de milliers de voyageurs.',
      benefits: [
        'Distribution optimale de vos vols',
        'Accès à notre réseau de clients fidèles',
        'Support marketing personnalisé',
        'Statistiques et reporting détaillés',
      ],
    },
    {
      icon: Hotel,
      title: 'Hôtels & Hébergements',
      description: 'Augmentez votre taux d\'occupation avec notre plateforme de réservation. Nous connectons votre établissement à des voyageurs qualifiés.',
      benefits: [
        'Zéro commission sur les premières réservations',
        'Gestion simplifiée des disponibilités',
        'Paiements sécurisés et rapides',
        'Visibilité maximale auprès de nos clients',
      ],
    },
    {
      icon: Building2,
      title: 'Agences de Voyage',
      description: 'Rejoignez notre réseau de partenaires et bénéficiez de nos tarifs préférentiels. Ensemble, offrons le meilleur service à nos clients.',
      benefits: [
        'Accès aux meilleurs tarifs du marché',
        'Formation continue de vos équipes',
        'Support technique 24/7',
        'Outils de gestion performants',
      ],
    },
    {
      icon: CreditCard,
      title: 'Fournisseurs de Services',
      description: 'Assurances voyage, transferts, location de voiture... Intégrez votre service à notre écosystème et touchez une nouvelle clientèle.',
      benefits: [
        'Intégration technique simplifiée',
        'Commissions attractives',
        'Exposition à 10,000+ voyageurs',
        'Opportunités de co-marketing',
      ],
    },
  ];

  const advantages = [
    {
      title: 'Réseau Établi',
      description: '10,000+ clients actifs et une croissance de +200% par an',
      icon: Users,
    },
    {
      title: 'Technologie de Pointe',
      description: 'Plateforme moderne avec intégration API simple et rapide',
      icon: Target,
    },
    {
      title: 'Support Dédié',
      description: 'Une équipe dédiée à votre succès, disponible 24/7',
      icon: Shield,
    },
    {
      title: 'Transparence Totale',
      description: 'Reporting en temps réel et conditions claires',
      icon: CheckCircle,
    },
  ];

  const faqItems = [
    {
      question: 'Quels sont les critères pour devenir partenaire ?',
      answer: 'Nous recherchons des partenaires sérieux, fiables et partageant nos valeurs. Que vous soyez une compagnie aérienne, un hôtel, une agence de voyage ou un fournisseur de services, nous sommes ouverts à toute collaboration mutuellement bénéfique.',
    },
    {
      question: 'Quel est le processus d\'intégration ?',
      answer: 'Le processus est simple : 1) Soumission du formulaire, 2) Appel découverte sous 48h, 3) Signature du partenariat, 4) Intégration technique (1-2 semaines), 5) Formation et lancement. Notre équipe vous accompagne à chaque étape.',
    },
    {
      question: 'Y a-t-il des frais d\'intégration ?',
      answer: 'Non, l\'intégration est totalement gratuite. Nous travaillons sur un modèle de commission uniquement sur les ventes réalisées. Pas de frais cachés, pas de minimum garanti - seulement du win-win.',
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
            title={"Partenaires stratégiques — développons ensemble votre activité."}
            subtitle={"Optimisez vos ventes, accédez à un réseau international et bénéficiez d'un accompagnement sur-mesure. Transformons chaque opportunité en succès."}
            ctaText="Je veux devenir partenaire"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-4">
              Un Partenariat Gagnant-Gagnant
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensemble, créons de la valeur pour nos clients
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
                <div className="text-3xl font-bold text-[#A11C1C] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Qui Peut Devenir Partenaire ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec différents types de partenaires
            </p>
          </motion.div>

          <div className="space-y-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
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
                  <partner.icon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{partner.title}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <ul className="space-y-2">
                    {partner.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#A11C1C] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi Choisir Eazy-Visa ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les avantages de notre partenariat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-6"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-[#A11C1C]/20 rounded-full text-[#A11C1C] mb-4">
                <Building2 className="w-5 h-5 inline mr-2" />
                Témoignage Partenaire
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ce Que Disent Nos Partenaires
              </h2>
              <p className="text-xl mb-4 text-gray-300">
                "En un an, notre collaboration avec Eazy-Visa a augmenté nos réservations de 45%."
              </p>
              <p className="text-gray-400 mb-6">
                Grâce à leur plateforme intuitive et leur équipe réactive, nous avons pu développer notre présence sur le marché sénégalais bien au-delà de nos attentes initiales.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#A11C1C]" />
                <div>
                  <p className="font-bold">Marie Diop</p>
                  <p className="text-gray-400 text-sm">Directrice Marketing, Atlantic Hotels</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: 'Intégration rapide', value: '1-2 sem', icon: Target },
                { title: 'Support 24/7', value: 'Disponible', icon: Shield },
                { title: 'Commission', value: 'Compétitive', icon: TrendingUp },
                { title: 'Reporting', value: 'Temps réel', icon: BarChart3 },
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
                  <feature.icon className="w-10 h-10 mx-auto mb-3 text-[#A11C1C]" />
                  <p className="text-sm mb-1 text-gray-300">{feature.title}</p>
                  <p className="font-bold">{feature.value}</p>
                </motion.div>
              ))}
            </motion.div>
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
                  Devenez Partenaire
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Remplissez le formulaire et notre équipe vous contactera sous 48h
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Email professionnel"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option className="text-gray-900">Type de partenariat</option>
                    <option className="text-gray-900">Compagnie Aérienne</option>
                    <option className="text-gray-900">Hôtel / Hébergement</option>
                    <option className="text-gray-900">Agence de Voyage</option>
                    <option className="text-gray-900">Fournisseur de Services</option>
                    <option className="text-gray-900">Autre</option>
                  </select>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre projet de partenariat"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success('Demande envoyée! Nous vous contacterons sous 48h.')}
                    className="w-full py-3 bg-white text-[#A11C1C] rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    ENVOYER LA DEMANDE
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
                  <h4 className="font-bold text-lg mb-3">💼 Pourquoi Nous Choisir ?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Intégration gratuite et accompagnement complet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Commissions attractives et paiements rapides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Support technique disponible 24/7</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}