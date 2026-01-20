'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
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

export default function GermanyPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NTk0NjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMG9mZmljZXxlbnwxfHx8fDE3NjU5ODk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const stats = [
    { value: '+95%', label: 'Taux d\'obtention de visa', icon: CheckCircle },
    { value: '+300', label: 'Ont déjà appris l\'allemand', icon: Users },
    { value: '+1', label: 'Mois hébergement gratuit', icon: Calendar },
    { value: '+3', label: 'Années d\'expérience', icon: Award },
  ];

  const opportunities = [
    {
      title: 'Études',
      icon: GraduationCap,
      items: [
        'Frais abordables : universités publiques gratuites',
        'Job étudiant : jusqu\'à ~20h/sem → ≈ 900–1 000 € / mois',
        'Diplômes reconnus : excellence académique + recherche de pointe',
      ],
    },
    {
      title: 'Formation professionnelle',
      icon: Briefcase,
      items: [
        'Rémunérée dès le 1er jour : ≈ 1 000–1 300 € / mois',
        'Alternance : école + entreprise',
        'Besoins massifs : ≈ 350 000 postes à pourvoir',
      ],
    },
    {
      title: 'Travailler',
      icon: DollarSign,
      items: [
        'Recrutement annuel : 400 000 travailleurs qualifiés / an',
        'Rémunérations : parmi les plus élevées d\'Europe',
        'Secteurs qui embauchent : santé, industrie, IT, BTP',
      ],
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Prendre rendez-vous',
      description: 'Échangez gratuitement avec un expert pour définir votre projet et vos objectifs en Allemagne.',
    },
    {
      number: 2,
      title: 'Apprendre l\'allemand',
      description: 'Suivez nos cours intensifs (A1–B2) et préparez-vous efficacement à votre départ.',
    },
    {
      number: 3,
      title: 'Demander le visa',
      description: 'Profitez de notre accompagnement complet pour un dossier fiable et sans erreur.',
    },
    {
      number: 4,
      title: 'Arrivée en Allemagne',
      description: 'Accueil à l\'aéroport et 1 mois d\'hébergement offert pour bien démarrer votre nouvelle vie.',
    },
  ];

  const testimonials = [
    {
      name: 'Méda Mopila',
      description: 'Etudie actuellement la médecine en Allemagne.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Lassana Dembele',
      description: 'Poursuit ses cours de langue en Allemagne.',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Fatou Medoune',
      description: 'Fait une formation professionnelle en santé',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
    {
      name: 'Nikola Senghor',
      description: 'Etudie la mécanique en Allemagne',
      image: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyfGVufDF8fHx8MTc2NTk3ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      videoUrl: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-0">
        {/* Hero with Carousel (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <HeroCarousel
            images={heroImages}
            height="h-[634px]"
            title={"L'Allemagne vous ouvre ses portes — études, travail, formation."}
            subtitle={"Diplômes reconnus, opportunités rémunérées et accompagnement complet. Faites le premier pas — on s'occupe du reste."}
            ctaText="Je veux en savoir plus"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent">
            Osez l'aventure. Nous simplifions le voyage.
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Voyager, c'est un acte de courage. C'est choisir de sortir de sa zone de confort pour découvrir, apprendre, et grandir. 
            Chez Eazy-Visa, nous transformons ce courage en expérience fluide.
          </p>
        </motion.div>

        {/* Germany Overview */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  L'Allemagne, le géant de l'Europe
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Véritable moteur de l'Union européenne, l'Allemagne incarne la rigueur, la stabilité et l'innovation. 
                  C'est la 1ère économie européenne et la 3ème puissance mondiale.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Avec un PIB supérieur à 4 000 milliards d'euros et un taux de chômage parmi les plus bas de l'UE (environ 3,2%), 
                  l'Allemagne investit chaque année plus de 110 milliards d'euros dans la recherche et l'innovation.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW55JTIwYmVybGlufGVufDF8fHx8MTc2NTk4NjQ3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Germany"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
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
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ChatGPT Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10 rounded-3xl p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">ChatGPT Challenge</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Vous hésitez encore sur votre destination ? Posez la question à ChatGPT et laissez l'intelligence artificielle trancher. 😅
            </p>
            <div className="bg-white rounded-xl p-6 text-left shadow-xl">
              <p className="text-sm text-gray-600 mb-4 font-semibold">Copier-coller le script ci-dessous dans ChatGPT:</p>
              <code className="block p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                Classe les pays européens selon la combinaison suivante : excellence académique, accessibilité financière, 
                système d'alternance entre études et pratique, facilité d'intégration sur le marché du travail, stabilité économique. 
                Donne ton top 5 et explique pourquoi le premier pays est objectivement le plus avantageux.
              </code>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText('Classe les pays européens selon la combinaison suivante...');
                  toast.success('Texte copié!');
                }}
                className="mt-4 w-full py-3 bg-[#A11C1C] text-white rounded-lg font-semibold"
              >
                Copier le prompt
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Opportunities */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Des opportunités réelles en Allemagne
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
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
                >
                  <opp.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{opp.title}</h3>
                <ul className="space-y-3">
                  {opp.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Étape par étape, votre rêve devient réalité
            </h2>
            <p className="text-xl text-gray-600">
              Car un voyage de mille lieues commence toujours par un premier pas.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#A11C1C] hidden md:block" />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative md:pl-20"
                >
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-[#A11C1C] flex items-center justify-center text-white text-2xl font-bold shadow-xl hidden md:flex">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with Video */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils l'ont fait. Écoutez leur histoire.
            </h2>
            <p className="text-xl text-gray-600">
              Des parcours réels, des rêves devenus réalité avec Eazy-Visa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((person, index) => (
              <motion.div
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
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{person.name}</h3>
                    <p className="text-sm text-gray-200">{person.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#A11C1C] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Et si c'était enfin le bon moment ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            L'aventure commence par un simple clic. En 45 minutes, découvrez vos options d'études, de formation ou de travail.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success('Rendez-vous confirmé!', {
              description: 'Nous vous contacterons bientôt.',
            })}
            className="px-12 py-4 bg-white text-[#A11C1C] rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
          >
            Réserver mon entretien gratuit
          </motion.button>
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