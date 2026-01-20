// src/pages/AboutPage.tsx
"use client";
import { motion } from 'motion/react';
import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import BookingModal from '@/components/BookingModal';
import { 
  Target, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  Globe,
  Shield,
  Clock,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMG9mZmljZXxlbnwxfHx8fDE3NjU5ODk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const values = [
    {
      icon: Target,
      title: 'Vision Claire',
      description: 'Simplifier le voyage pour tous les Africains et leur ouvrir les portes du monde',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'L\'amour du service client et l\'accompagnement humain au cœur de tout ce que nous faisons',
    },
    {
      icon: Users,
      title: 'Équipe Dédiée',
      description: '24/7 à votre service avec une équipe passionnée et formée pour répondre à tous vos besoins',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: '5+ années d\'expérience et un taux de satisfaction de 98% témoignent de notre engagement',
    },
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Création d\'Eazy-Visa',
      description: 'Lancement des services de billetterie et assistance visa à Dakar',
      icon: Zap,
    },
    {
      year: '2020',
      title: 'Expansion des Services',
      description: 'Ajout des réservations d\'hôtels et assurances voyage',
      icon: TrendingUp,
    },
    {
      year: '2021',
      title: 'Partenariat Allemagne',
      description: 'Devenir partenaire officiel pour les visas et études en Allemagne',
      icon: Globe,
    },
    {
      year: '2022',
      title: 'Service 24/7',
      description: 'Mise en place du support client disponible jour et nuit',
      icon: Clock,
    },
    {
      year: '2023',
      title: 'Eazy-Visa Corporate',
      description: 'Lancement de l\'offre dédiée aux entreprises',
      icon: Shield,
    },
    {
      year: '2024',
      title: '10,000+ Clients',
      description: 'Franchissement du cap des 10,000 voyageurs accompagnés',
      icon: Star,
    },
  ];

  const team = [
    {
      name: 'Bertrand Gopele',
      role: 'Manager & Fondateur',
      description: 'Visionnaire passionné par le voyage et l\'innovation, Bertrand a créé Eazy-Visa pour démocratiser l\'accès au voyage en Afrique.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Ndeye Fatou Hann',
      role: 'Responsable Marketing',
      description: 'Experte en communication digitale, Ndeye pilote notre stratégie marketing et notre présence en ligne avec brio.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Khadijatou Kane',
      role: 'Apporteur d\'Affaires',
      description: 'Avec son réseau étendu et son expertise commerciale, Khadijatou développe nos partenariats stratégiques.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const achievements = [
    { number: '10,000+', label: 'Clients accompagnés', icon: Users },
    { number: '98%', label: 'Taux de satisfaction', icon: Star },
    { number: '5+', label: 'Années d\'expérience', icon: Award },
    { number: '24/7', label: 'Support disponible', icon: Clock },
    { number: '1,200+', label: 'Destinations', icon: Globe },
    { number: '95%', label: 'Visas obtenus', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      {/* Hero Carousel */}
      <div className="w-full px-0 mb-12">
        <HeroCarousel
          images={heroImages}
          height="h-[634px]"
          title="Changez de vie en un clic — voyages, études et opportunités simplifiés."
          subtitle="Eazy‑Visa transforme vos projets en réalité : accompagnement expert, tarifs transparents et support 24/7."
          ctaText="Découvrir nos services"
          ctaTargetId="main-content"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent"
          >
            À propos d'Eazy-Visa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Des voyageurs avant d'être entrepreneurs.
          </motion.p>
        </motion.div>

        {/* Mission + Valeurs */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-6"
                >
                  Notre Mission
                </motion.h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Derrière Eazy-Visa, il y a une conviction profonde : <strong className="text-[#A11C1C]">le voyage ne devrait jamais être un luxe, ni un parcours du combattant</strong>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Notre équipe d'experts du voyage, de la technologie et de la mobilité internationale conçoit des solutions adaptées aux réalités africaines — 
                    alliant <strong>innovation, accessibilité et accompagnement humain</strong>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Depuis nos locaux à la Cité Keur Gorgui, nous avons simplifié le voyage pour des milliers de clients : 
                    des tarifs transparents, un accompagnement humain, et une promesse claire — <strong className="text-[#A11C1C]">le meilleur prix, toujours</strong>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold text-[#A11C1C]"
                  >
                    Parce qu'aider les gens à voyager, c'est aussi leur ouvrir de nouvelles opportunités.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-full bg-[#A11C1C] flex items-center justify-center mb-4"
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De 2019 à aujourd'hui, découvrez les moments clés qui ont façonné Eazy-Visa
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#A11C1C] hidden lg:block" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16`}
                >
                  <motion.div
                    className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center mb-8 lg:mb-0`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                      className="inline-block px-6 py-2 bg-[#A11C1C] text-white rounded-full font-bold text-2xl mb-4"
                    >
                      {milestone.year}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#A11C1C] flex items-center justify-center shadow-2xl hidden lg:flex"
                  >
                    <milestone.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="lg:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Réalisations */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nos Réalisations</h2>
            <p className="text-xl text-gray-600">Des chiffres qui parlent d'eux-mêmes</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -10, scale: 1.1 }}
                className="bg-[#A11C1C] rounded-2xl p-6 text-white text-center shadow-xl"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  <achievement.icon className="w-10 h-10 mx-auto mb-3" />
                </motion.div>
                <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                <div className="text-sm opacity-90">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Équipe */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Rencontrez Notre Équipe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés qui travaillent chaque jour pour réaliser vos rêves de voyage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div
                  className="relative h-72 overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </motion.div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#A11C1C] font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#A11C1C] rounded-3xl p-12 text-white text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Rejoignez l'aventure Eazy-Visa
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Que vous soyez un voyageur, un partenaire ou un futur membre de l'équipe, 
              nous serions ravis de collaborer avec vous pour créer des expériences exceptionnelles.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="px-12 py-4 bg-white text-[#A11C1C] rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
            >
              Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* Modal de contact / prise de rendez-vous */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Contactez-nous"
      />
    </div>
  );
}