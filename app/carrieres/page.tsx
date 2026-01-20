"use client";
import { motion } from 'motion/react';
import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  Briefcase, 
  TrendingUp, 
  Heart, 
  Coffee,
  Users,
  Award,
  Globe,
  Zap,
  Target,
  Smile,
  CheckCircle,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMG9mZmljZXxlbnwxfHx8fDE3NjU5ODk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Évolution Rapide',
      description: 'Des opportunités de progression de carrière dans une entreprise en pleine croissance',
    },
    {
      icon: Heart,
      title: 'Culture Bienveillante',
      description: 'Un environnement de travail positif où chacun est valorisé et écouté',
    },
    {
      icon: Coffee,
      title: 'Environnement Stimulant',
      description: 'Des bureaux modernes, café/thé illimités et espace détente',
    },
    {
      icon: Award,
      title: 'Formation Continue',
      description: 'Accès à des formations professionnelles et développement de compétences',
    },
    {
      icon: Users,
      title: 'Équipe Solidaire',
      description: 'Travailler avec des collègues passionnés et bienveillants',
    },
    {
      icon: Globe,
      title: 'Impact International',
      description: 'Contribuer à changer la vie de milliers de voyageurs',
    },
  ];

  const positions = [
    {
      title: 'Agent de Billetterie Senior',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Commercial',
      description: 'Nous recherchons un(e) agent de billetterie expérimenté(e) pour rejoindre notre équipe. Vous serez en charge de conseiller nos clients, rechercher les meilleures offres de vols et gérer les réservations.',
      responsibilities: [
        'Conseiller et accompagner les clients dans leurs projets de voyage',
        'Rechercher et comparer les offres de vols',
        'Gérer les réservations, modifications et annulations',
        'Développer un portefeuille clients',
        'Atteindre les objectifs commerciaux fixés',
      ],
      requirements: [
        'Expérience min. 2 ans en billetterie ou tourisme',
        'Maîtrise d\'Amadeus ou Sabre',
        'Excellente communication et sens du service',
        'Bilingue français/anglais souhaité',
        'Capacité à travailler sous pression',
      ],
      salary: '250,000 - 400,000 FCFA/mois + commissions',
    },
    {
      title: 'Conseiller Visa Allemagne',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Services Visa',
      description: 'Accompagnez les candidats dans leurs démarches pour étudier ou travailler en Allemagne. Poste clé nécessitant rigueur, empathie et connaissance des procédures consulaires.',
      responsibilities: [
        'Accompagner les clients dans la constitution de dossiers visa',
        'Vérifier la conformité des documents',
        'Prendre les rendez-vous consulaires',
        'Assurer le suivi jusqu\'à l\'obtention du visa',
        'Former et orienter les candidats',
      ],
      requirements: [
        'Bac+3 minimum en droit, relations internationales ou équivalent',
        'Connaissance des procédures de visa Schengen',
        'Allemand niveau B1 minimum (formation possible)',
        'Organisation et attention aux détails',
        'Patience et pédagogie',
      ],
      salary: '300,000 - 450,000 FCFA/mois',
    },
    {
      title: 'Responsable Marketing Digital',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Marketing',
      description: 'Développez notre présence en ligne et créez des campagnes marketing innovantes pour atteindre plus de voyageurs. Poste stratégique au sein d\'une équipe dynamique.',
      responsibilities: [
        'Élaborer et déployer la stratégie marketing digitale',
        'Gérer les réseaux sociaux et créer du contenu engageant',
        'Piloter les campagnes publicitaires (Google Ads, Facebook Ads)',
        'Analyser les performances et optimiser le ROI',
        'Collaborer avec les partenaires et influenceurs',
      ],
      requirements: [
        'Bac+4/5 en Marketing Digital ou équivalent',
        'Expérience min. 3 ans en marketing digital',
        'Maîtrise des outils (Google Analytics, Meta Business, etc.)',
        'Créativité et sens de l\'analyse',
        'Portfolio de campagnes réussies',
      ],
      salary: '400,000 - 600,000 FCFA/mois',
    },
    {
      title: 'Développeur Full Stack',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Technologie',
      description: 'Rejoignez notre équipe tech pour développer et améliorer notre plateforme de réservation. Contribuez à l\'innovation dans le secteur du voyage en Afrique.',
      responsibilities: [
        'Développer de nouvelles fonctionnalités web et mobile',
        'Maintenir et optimiser la plateforme existante',
        'Intégrer des APIs tierces (compagnies aériennes, paiement)',
        'Assurer la sécurité et la performance du système',
        'Participer aux choix techniques et architecturaux',
      ],
      requirements: [
        'Bac+3 minimum en informatique',
        'Maîtrise de React, Node.js, PostgreSQL',
        'Expérience avec les APIs RESTful',
        'Connaissance des bonnes pratiques de sécurité',
        'Autonomie et esprit d\'équipe',
      ],
      salary: '500,000 - 800,000 FCFA/mois',
    },
    {
      title: 'Customer Success Manager',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Support Client',
      description: 'Soyez le garant de la satisfaction client et gérez notre service support 24/7. Poste essentiel pour maintenir notre taux de satisfaction de 98%.',
      responsibilities: [
        'Gérer l\'équipe de support client (5-7 personnes)',
        'Assurer la qualité du service 24/7',
        'Traiter les réclamations complexes',
        'Mettre en place des procédures d\'amélioration',
        'Former et coacher l\'équipe',
      ],
      requirements: [
        'Bac+3 en commerce, gestion ou équivalent',
        'Expérience min. 3 ans en service client',
        'Leadership naturel et empathie',
        'Excellente gestion du stress',
        'Disponibilité pour astreintes',
      ],
      salary: '350,000 - 500,000 FCFA/mois',
    },
    {
      title: 'Comptable',
      type: 'CDI',
      location: 'Dakar, Sénégal',
      department: 'Finance',
      description: 'Gérez la comptabilité de notre agence en forte croissance. Poste clé pour assurer la santé financière de l\'entreprise.',
      responsibilities: [
        'Tenir la comptabilité générale',
        'Gérer la trésorerie et les paiements',
        'Préparer les déclarations fiscales et sociales',
        'Établir les rapports financiers mensuels',
        'Collaborer avec l\'expert-comptable externe',
      ],
      requirements: [
        'Bac+3 en comptabilité ou finance',
        'Expérience min. 2 ans en cabinet ou entreprise',
        'Maîtrise d\'un logiciel de comptabilité',
        'Rigueur et discrétion absolues',
        'Connaissance fiscalité sénégalaise',
      ],
      salary: '300,000 - 450,000 FCFA/mois',
    },
  ];

  const handleApply = (jobIndex: number) => {
    setSelectedJob(jobIndex);
    toast.success('Candidature en cours...', {
      description: `Pour le poste de ${positions[jobIndex].title}`,
    });
    setTimeout(() => {
      toast.success('Candidature envoyée avec succès! 🎉', {
        description: 'Nous vous contacterons sous 48h.',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Carousel - Full Width */}
      <div className="w-full px-0 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HeroCarousel 
            images={heroImages} 
            height="h-[634px]"
            title="Rejoignez l'Aventure. Construisez l'Avenir du Voyage."
            subtitle="Des opportunités uniques, une équipe passionnée et une mission inspirante. Votre carrière commence ici — postulez dès maintenant."
            ctaText="Voir nos postes"
            ctaTargetId="main-content"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent"
          >
            Rejoignez l'équipe Eazy-Visa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Construisons ensemble l'avenir du voyage en Afrique
          </motion.p>
        </motion.div>

        {/* Why Join Us */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Pourquoi Nous Rejoindre ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bien plus qu'un job, une aventure entrepreneuriale et humaine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-[#A11C1C] flex items-center justify-center mb-6"
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Postes Disponibles</h2>
            <p className="text-xl text-gray-600">
              {positions.length} opportunités pour faire la différence
            </p>
          </motion.div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold">{position.title}</h3>
                        <span className="px-3 py-1 bg-[#A11C1C] text-white rounded-full text-sm font-semibold">
                          {position.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1 text-[#A11C1C] font-semibold">
                          <Zap className="w-4 h-4" />
                          {position.salary}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{position.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#A11C1C]" />
                            Responsabilités
                          </h4>
                          <ul className="space-y-2">
                            {position.responsibilities.map((resp, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-[#A11C1C] mt-1">•</span>
                                <span>{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#A11C1C]" />
                            Profil Recherché
                          </h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-[#A11C1C] mt-1">•</span>
                                <span>{req}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApply(index)}
                      className="flex-1 py-3 bg-[#A11C1C] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Postuler Maintenant
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toast.info('Plus d\'informations disponibles bientôt')}
                      className="px-6 py-3 border-2 border-[#A11C1C] text-[#A11C1C] rounded-lg font-semibold hover:bg-[#A11C1C]/5 transition-all"
                    >
                      Plus d'infos
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Spontaneous Application */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#A11C1C] rounded-3xl p-12 text-white text-center relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Smile className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Candidature Spontanée</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Vous ne trouvez pas le poste idéal mais êtes convaincu(e) de pouvoir contribuer à notre mission ? 
              Envoyez-nous votre CV !
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.success('CV envoyé!', {
                  description: 'Nous examinerons votre profil avec attention.',
                });
              }}
              className="px-12 py-4 bg-white text-[#A11C1C] rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
            >
              <Send className="w-6 h-6" />
              Envoyer mon CV
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}