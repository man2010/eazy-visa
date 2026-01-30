/**
 * PAGE SERVICES - CLIENT COMPONENT
 * Composant interactif avec modal et animations
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  Plane, 
  Hotel, 
  FileText, 
  Shield, 
  GraduationCap, 
  Headphones,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Award,
  Users,
  Zap,
  Heart,
  Target,
  Phone,
  Mail,
  X
} from 'lucide-react';

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroImages = [
    '/EVServices3.jpg',
    '/EVServices1.png',
    '/image5.webp',
  ];

  const services = [
    {
      id: 'billet',
      icon: Plane,
      title: 'Billets d\'avion',
      subtitle: 'Le meilleur prix, garanti.',
      description: 'Comparez et réservez vos vols aux tarifs les plus compétitifs du marché. Notre technologie scanne des milliers d\'offres en temps réel pour vous garantir le meilleur rapport qualité-prix.',
      features: [
        'Comparaison en temps réel de +500 compagnies',
        'Prix transparents, aucun frais caché',
        'Modification et annulation flexibles',
        'Support 24/7 en cas de changement de vol',
        'Paiement sécurisé (Wave, Orange Money, CB)',
        'Confirmation instantanée par email & SMS'
      ],
      benefits: [
        'Économisez jusqu\'à 40% vs agences traditionnelles',
        'Réservation en moins de 3 minutes',
        'Accompagnement de A à Z',
        'Programme de fidélité : cumulez des points'
      ],
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjU4Njc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Rechercher un vol'
    },
    {
      id: 'hotel',
      icon: Hotel,
      title: 'Réservation d\'hôtels',
      subtitle: 'Confort et sérénité, partout.',
      description: 'Des auberges économiques aux palaces 5 étoiles, trouvez l\'hébergement parfait pour chaque budget et chaque occasion. Plus de 2 millions d\'établissements dans le monde.',
      features: [
        'Accès à +2M d\'hôtels dans 190 pays',
        'Photos réelles et avis clients vérifiés',
        'Meilleur prix garanti ou remboursement',
        'Annulation gratuite sur la plupart des offres',
        'Options de paiement flexibles',
        'Service client multilingue 24/7'
      ],
      benefits: [
        'Réductions exclusives jusqu\'à 50%',
        'Programme de fidélité : 1 nuit offerte tous les 10 séjours',
        'Surclassement gratuit selon disponibilité',
        'Petit-déjeuner offert sur certains hôtels'
      ],
      color: 'from-purple-600 to-purple-800',
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjU5MTA2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Trouver un hôtel'
    },
    {
      id: 'visa',
      icon: FileText,
      title: 'Visa Allemagne',
      subtitle: 'Votre passeport pour l\'Europe.',
      description: 'Spécialistes du visa allemand depuis 5 ans. Nous maîtrisons toutes les procédures : études, formation professionnelle, travail, regroupement familial. Taux de réussite de 95%.',
      features: [
        'Accompagnement personnalisé par un expert',
        'Constitution complète du dossier',
        'Vérification méticuleuse des documents',
        'Prise de rendez-vous à l\'ambassade',
        'Préparation à l\'entretien consulaire',
        'Suivi jusqu\'à l\'obtention du visa'
      ],
      benefits: [
        'Taux de réussite : 95%',
        'Délai moyen : 4-6 semaines',
        'Garantie satisfaction ou remboursement',
        'Accompagnement post-visa (logement, intégration)'
      ],
      color: 'from-red-600 to-red-800',
      image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Commencer ma demande'
    },
    {
      id: 'assurance',
      icon: Shield,
      title: 'Assurance voyage',
      subtitle: 'Voyagez l\'esprit tranquille.',
      description: 'Protection complète pour tous vos déplacements : frais médicaux, rapatriement, annulation, perte de bagages. Couverture mondiale adaptée à vos besoins.',
      features: [
        'Couverture médicale jusqu\'à 500 000€',
        'Rapatriement médical d\'urgence inclus',
        'Assistance juridique 24/7',
        'Couverture bagages perdus/volés/endommagés',
        'Annulation voyage toutes causes',
        'Responsabilité civile à l\'étranger'
      ],
      benefits: [
        'Tarifs 30% moins chers que la concurrence',
        'Activation immédiate en ligne',
        'Aucune franchise sur frais médicaux',
        'Extension possible pour famille'
      ],
      color: 'from-green-600 to-green-800',
      image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwYXNzcG9ydHxlbnwxfHx8fDE3NjU5ODk3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Obtenir un devis'
    },
    {
      id: 'formation',
      icon: GraduationCap,
      title: 'Formation en allemand',
      subtitle: 'Parlez, réussissez, intégrez-vous.',
      description: 'Cours intensifs d\'allemand (A1 à B2) avec des professeurs natifs certifiés. Méthode immersive, groupes réduits, préparation aux examens officiels (Goethe-Institut).',
      features: [
        'Cours en présentiel ou en ligne',
        'Groupes de 6-10 personnes maximum',
        'Professeurs germanophones certifiés',
        'Matériel pédagogique inclus',
        'Préparation aux examens Goethe A1-B2',
        'Certificat de fin de formation'
      ],
      benefits: [
        'Progression rapide : A1→B1 en 6 mois',
        'Taux de réussite aux examens : 92%',
        'Tarifs dégressifs si inscription en groupe',
        'Stage linguistique en Allemagne possible'
      ],
      color: 'from-orange-600 to-orange-800',
      image: 'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMG9mZmljZXxlbnwxfHx8fDE3NjU5ODk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Découvrir nos cours'
    },
    {
      id: 'autre',
      icon: Headphones,
      title: 'Services sur mesure',
      subtitle: 'Parce que chaque voyage est unique.',
      description: 'Besoin d\'un accompagnement spécifique ? Transferts aéroport, location de voiture, guides touristiques, organisation d\'événements... Nous créons des solutions personnalisées.',
      features: [
        'Transferts aéroport VIP',
        'Location de voiture avec chauffeur',
        'Organisation de circuits touristiques',
        'Assistance pour événements (mariages, séminaires)',
        'Conciergerie voyage (restaurants, spectacles)',
        'Services d\'interprétation'
      ],
      benefits: [
        'Devis gratuit sous 24h',
        'Tarifs négociés avec nos partenaires',
        'Service premium personnalisé',
        'Disponibilité 24/7'
      ],
      color: 'from-indigo-600 to-indigo-800',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Contactez-nous'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Clients satisfaits' },
    { icon: Star, value: '98%', label: 'Taux de satisfaction' },
    { icon: Globe, value: '1,200+', label: 'Destinations' },
    { icon: Clock, value: '24/7', label: 'Support client' }
  ];

  const whyUs = [
    {
      icon: Target,
      title: 'Expertise reconnue',
      description: '5+ années d\'expérience dans le voyage et l\'accompagnement visa'
    },
    {
      icon: Heart,
      title: 'Accompagnement humain',
      description: 'Une équipe dédiée qui vous écoute et comprend vos besoins'
    },
    {
      icon: Shield,
      title: 'Garantie meilleur prix',
      description: 'Trouvé moins cher ailleurs ? On vous rembourse la différence'
    },
    {
      icon: Zap,
      title: 'Rapidité et efficacité',
      description: 'Réponses sous 2h, confirmation instantanée, zéro perte de temps'
    }
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      service: 'Visa Allemagne',
      text: 'Grâce à Eazy-Visa, j\'ai obtenu mon visa en 5 semaines. L\'équipe était disponible à chaque étape !',
      rating: 5
    },
    {
      name: 'Moussa Sarr',
      service: 'Billets d\'avion',
      text: 'J\'ai économisé 150 000 FCFA sur mes billets pour Paris. Service rapide et efficace !',
      rating: 5
    },
    {
      name: 'Fatou Kane',
      service: 'Formation allemand',
      text: 'En 6 mois, je suis passée de A1 à B1. Les professeurs sont excellents et très pédagogues.',
      rating: 5
    }
  ];

  // Modal Component
  const ServiceModal = () => {
    if (!selectedService || !isModalOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className={`relative h-64 bg-gradient-to-r ${selectedService.color} text-white p-8 flex items-end`}>
            <div className="absolute inset-0 opacity-20">
              <img 
                src={selectedService.image} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer le modal"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="relative z-10">
              <selectedService.icon className="w-16 h-16 mb-4" aria-hidden="true" />
              <h2 id="service-modal-title" className="text-4xl font-bold mb-2">
                {selectedService.title}
              </h2>
              <p className="text-xl opacity-90">{selectedService.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {selectedService.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-green-600" aria-hidden="true" />
                  Ce qui est inclus
                </h3>
                <ul className="space-y-4">
                  {selectedService.features.map((feature: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[#A11C1C] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Star className="w-7 h-7 text-yellow-500" aria-hidden="true" />
                  Vos avantages
                </h3>
                <ul className="space-y-4">
                  {selectedService.benefits.map((benefit: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-4 bg-gradient-to-r ${selectedService.color} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3`}
              >
                {selectedService.cta}
                <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-[#A11C1C] hover:text-[#A11C1C] transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Nous appeler
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-15 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section aria-label="Présentation des services">
        <div className="w-full px-0 mb-20">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title="Nos Services"
            subtitle="Tout pour voyager sereinement, en un seul endroit. Support 24/7, paiement sécurisé, 5+ ans d'expérience."
            ctaText="Découvrir nos services"
            ctaTargetId="services-content"
          />
        </div>
      </section>

      <div id="services-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <section className="mb-24" aria-label="Statistiques Eazy-Visa">
            <h1 className="text-4xl font-bold text-center mb-4">Nos Services Voyage & Visa depuis Dakar</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
              Découvrez notre gamme complète de services conçus pour rendre votre expérience de voyage fluide et agréable. Chez Eazy-Visa, nous nous engageons à vous offrir des solutions personnalisées, un support dédié et une expertise reconnue pour tous vos besoins </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-4"
                  aria-hidden="true"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-[#A11C1C] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-24" aria-labelledby="services-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="services-heading" className="text-4xl md:text-5xl font-bold mb-4">
              Explorez nos services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins de voyage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => {
                  setSelectedService(service);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={service.image}
                    alt={`${service.title} - Eazy-Visa Dakar`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
                  <div className="absolute top-6 left-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl"
                      aria-hidden="true"
                    >
                      <service.icon className="w-8 h-8 text-[#A11C1C]" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description.substring(0, 120)}...
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-[#A11C1C] font-semibold group-hover:gap-4 transition-all"
                    aria-label={`En savoir plus sur ${service.title}`}
                  >
                    En savoir plus
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-24" aria-labelledby="why-us-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="why-us-heading" className="text-4xl md:text-5xl font-bold mb-4">
              Pourquoi choisir Eazy-Visa ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui nous différencie et fait notre force
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#A11C1C] to-red-700 mb-6 shadow-xl"
                  aria-hidden="true"
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#A11C1C] to-red-800 rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden mb-24"
          aria-label="Contactez-nous"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
            aria-hidden="true"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Prêt à partir ?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            >
              Notre équipe est disponible 24/7 pour répondre à toutes vos questions et vous accompagner dans vos projets de voyage.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-[#A11C1C] rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
                aria-label="Appeler Eazy-Visa"
              >
                <Phone className="w-6 h-6" aria-hidden="true" />
                +221 76 948 60 60
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all flex items-center gap-3"
                aria-label="Envoyer un email à Eazy-Visa"
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
                Envoyer un email
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
                Réponse sous 2h
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
                Devis gratuit
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
                Sans engagement
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <section className="mb-0" aria-labelledby="testimonials-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Témoignages de nos clients satisfaits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                  <meta itemProp="bestRating" content="5" />
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic" itemProp="reviewBody">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900" itemProp="author">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && <ServiceModal />}
    </div>
  );
}