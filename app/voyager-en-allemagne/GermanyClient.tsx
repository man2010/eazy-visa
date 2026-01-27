/**
 * PAGE VOYAGER EN ALLEMAGNE - CLIENT COMPONENT
 * Composant interactif optimisé pour le SEO et l'accessibilité
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  TrendingUp, 
  GraduationCap, 
  Briefcase, 
  DollarSign,
  PlayCircle,
  CheckCircle,
  Calendar,
  Globe,
  Users,
  Award,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function GermanyClient() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const heroImages = [
    '/EVAllemagne1.jpg',
    '/EVAllemagne2.jpg',
    '/EVAllemagne3.jpg',
  ];

  const stats = [
    { value: '+95%', label: 'Taux d\'obtention de visa', icon: CheckCircle },
    { value: '+300', label: 'Ont déjà appris l\'allemand', icon: Users },
    { value: '+1', label: 'Mois hébergement gratuit', icon: Calendar },
    { value: '+3', label: 'Années d\'expérience', icon: Award },
  ];

  const opportunities = [
    {
      title: 'Études en Allemagne',
      icon: GraduationCap,
      items: [
        'Universités publiques gratuites ou frais très abordables',
        'Job étudiant autorisé : jusqu\'à 20h/semaine → 900-1000€/mois',
        'Diplômes reconnus mondialement : excellence académique garantie',
      ],
    },
    {
      title: 'Formation Professionnelle (Ausbildung)',
      icon: Briefcase,
      items: [
        'Formation rémunérée dès le 1er jour : 1000-1300€/mois',
        'Système d\'alternance : théorie en école + pratique en entreprise',
        '350 000 postes disponibles chaque année en Allemagne',
      ],
    },
    {
      title: 'Travail Qualifié',
      icon: DollarSign,
      items: [
        'Recrutement massif : 400 000 travailleurs qualifiés/an recherchés',
        'Salaires parmi les plus élevés d\'Europe',
        'Secteurs qui embauchent : santé, industrie, IT, construction',
      ],
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Entretien Gratuit',
      description: 'Échangez avec un expert Eazy-Visa pour définir votre projet professionnel et vos objectifs en Allemagne. Consultation gratuite de 45 minutes.',
    },
    {
      number: 2,
      title: 'Formation en Allemand',
      description: 'Suivez nos cours intensifs (niveau A1 à B2) avec professeurs certifiés. Préparation aux examens Goethe-Institut. Taux de réussite : 92%.',
    },
    {
      number: 3,
      title: 'Demande de Visa Allemagne',
      description: 'Accompagnement complet pour votre dossier visa : constitution documents, rendez-vous ambassade, préparation entretien. 95% de réussite.',
    },
    {
      number: 4,
      title: 'Arrivée en Allemagne',
      description: 'Accueil personnalisé à l\'aéroport + 1 mois d\'hébergement offert pour faciliter votre installation. Aide administrative complète.',
    },
  ];

  const testimonials = [
    {
      name: 'Méda Mopila',
      description: 'Étudie actuellement la médecine en Allemagne',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Lassana Dembele',
      description: 'Poursuit ses cours de langue en Allemagne',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Fatou Medoune',
      description: 'Formation professionnelle en santé (Ausbildung)',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Nikola Senghor',
      description: 'Étudie la mécanique automobile en Allemagne',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section aria-label="Visa Allemagne - Introduction">
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <HeroCarousel
              images={heroImages}
              height="h-[634px]"
              title="L'Allemagne vous ouvre ses portes — études, formation, travail"
              subtitle="Diplômes reconnus, formations rémunérées et accompagnement complet. Obtenez votre visa Allemagne avec 95% de réussite."
              ctaText="Je veux partir en Allemagne"
              ctaTargetId="main-content"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent">
            Visa Allemagne : Votre Nouvelle Vie Commence Ici
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Voyager en Allemagne, c'est choisir l'excellence, la stabilité et les opportunités. 
            Chez Eazy-Visa, nous transformons votre projet en réalité avec un accompagnement de A à Z.
          </p>
        </motion.header>

        {/* Germany Overview */}
        <section className="mb-20" aria-labelledby="germany-overview">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="germany-overview" className="text-3xl md:text-4xl font-bold mb-6">
                  L'Allemagne : 1ère Puissance Économique Européenne
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Moteur de l'Union européenne, l'Allemagne incarne la rigueur, la stabilité et l'innovation. 
                  C'est la 1ère économie européenne et la 3ème puissance mondiale.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  PIB supérieur à 4 000 milliards d'euros, taux de chômage très bas (3,2%), 
                  et plus de 110 milliards d'euros investis chaque année dans la recherche et l'innovation.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Berlin Allemagne - Porte de Brandebourg"
                  className="rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="mb-20" aria-label="Statistiques Eazy-Visa Allemagne">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-[#A11C1C] rounded-2xl p-8 text-white text-center shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"
                  aria-hidden="true"
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-90">{stat.label}</div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ChatGPT Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10 rounded-3xl p-12"
          aria-labelledby="chatgpt-challenge"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="chatgpt-challenge" className="text-3xl font-bold mb-6">
              Challenge ChatGPT : Pourquoi l'Allemagne ?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Vous hésitez encore sur votre destination d'études ? Posez la question à ChatGPT et laissez l'IA trancher. 😅
            </p>
            <div className="bg-white rounded-xl p-6 text-left shadow-xl">
              <p className="text-sm text-gray-600 mb-4 font-semibold">
                Copiez-collez ce prompt dans ChatGPT :
              </p>
              <code className="block p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                Classe les pays européens selon la combinaison suivante : excellence académique, accessibilité financière, 
                système d'alternance entre études et pratique, facilité d'intégration sur le marché du travail, stabilité économique. 
                Donne ton top 5 et explique pourquoi le premier pays est objectivement le plus avantageux.
              </code>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText('Classe les pays européens selon la combinaison suivante : excellence académique, accessibilité financière, système d\'alternance entre études et pratique, facilité d\'intégration sur le marché du travail, stabilité économique. Donne ton top 5 et explique pourquoi le premier pays est objectivement le plus avantageux.');
                  toast.success('Texte copié !', {
                    description: 'Collez-le maintenant dans ChatGPT'
                  });
                }}
                className="mt-4 w-full py-3 bg-[#A11C1C] text-white rounded-lg font-semibold"
                aria-label="Copier le prompt ChatGPT"
              >
                Copier le prompt
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Opportunities */}
        <section className="mb-20" aria-labelledby="opportunities-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="opportunities-heading" className="text-3xl md:text-4xl font-bold mb-4">
              Opportunités Réelles en Allemagne
            </h2>
            <p className="text-xl text-gray-600">
              Études gratuites, formations rémunérées, emplois qualifiés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp, index) => (
              <motion.article
                key={opp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A11C1C] mb-6"
                  aria-hidden="true"
                >
                  <opp.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{opp.title}</h3>
                <ul className="space-y-3">
                  {opp.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-20" aria-labelledby="steps-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="steps-heading" className="text-3xl md:text-4xl font-bold mb-4">
              4 Étapes Pour Obtenir Votre Visa Allemagne
            </h2>
            <p className="text-xl text-gray-600">
              Un accompagnement complet de la demande à l'installation
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#A11C1C] hidden md:block" aria-hidden="true" />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative md:pl-20"
                >
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-[#A11C1C] flex items-center justify-center text-white text-2xl font-bold shadow-xl hidden md:flex" aria-hidden="true">
                    {step.number}
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                    <h3 className="text-2xl font-bold mb-3">
                      <span className="md:hidden inline-block w-10 h-10 rounded-full bg-[#A11C1C] text-white text-center leading-10 mr-3">
                        {step.number}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with Video */}
        <section className="mb-20" aria-labelledby="testimonials-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold mb-4">
              Ils l'ont Fait : Témoignages Vidéo
            </h2>
            <p className="text-xl text-gray-600">
              Des Sénégalais qui ont obtenu leur visa Allemagne avec Eazy-Visa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((person, index) => (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedVideo(person.name)}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  <img
                    src={person.image}
                    alt={`Témoignage ${person.name} - Visa Allemagne Eazy-Visa`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{person.name}</h3>
                    <p className="text-sm text-gray-200">{person.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#A11C1C] rounded-3xl p-12 text-center text-white"
          aria-label="Réserver votre entretien"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Partir en Allemagne ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Réservez votre entretien gratuit de 45 minutes. Découvrez vos options d'études, de formation professionnelle ou de travail en Allemagne.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success('Demande envoyée !', {
              description: 'Nous vous contacterons dans les 24h pour fixer votre rendez-vous.',
            })}
            className="px-12 py-4 bg-white text-[#A11C1C] rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            aria-label="Réserver mon entretien gratuit pour visa Allemagne"
          >
            Réserver mon Entretien Gratuit
          </motion.button>
          <p className="mt-6 text-sm opacity-75">
            ✅ Sans engagement • ✅ Réponse sous 24h • ✅ Conseils personnalisés
          </p>
        </motion.section>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Vidéo de {selectedVideo}</h3>
              <p className="text-gray-400">
                La vidéo sera ajoutée prochainement
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}