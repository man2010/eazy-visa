// app/destinations/DestinationsClient.tsx
/**
 * HUB DESTINATIONS - CLIENT COMPONENT
 * Page interactive avec HeroCarousel, liste des destinations et CTA
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel'; // Assumé existant (import depuis components)
import Footer from '@/components/Footer';
import { 
  Plane, 
  MapPin, 
  Star, 
  Clock, 
  CreditCard, 
  ArrowRight 
} from 'lucide-react';

const destinations = [
  { 
    slug: 'dakar-paris', 
    name: 'Paris', 
    country: 'France', 
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NTk0NjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '400 000 FCFA',
    duration: '7h',
    companies: 'Air France, Brussels Airlines'
  },
  { 
    slug: 'dakar-istanbul', 
    name: 'Istanbul', 
    country: 'Turquie', 
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWJ1bCUyMGJvc3Bob3J1c3xlbnwxfHx8fDE3NjU5ODk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '350 000 FCFA',
    duration: '6h',
    companies: 'Turkish Airlines'
  },
  { 
    slug: 'dakar-casablanca', 
    name: 'Casablanca', 
    country: 'Maroc', 
    image: 'https://images.unsplash.com/photo-1579169256999-2a18e3003680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNhYmxhbmNhJTIwbW9zcXVlZWxlbnwxfHx8fDE3NjU5OTAwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '250 000 FCFA',
    duration: '4h',
    companies: 'Royal Air Maroc'
  },
  { 
    slug: 'dakar-montreal', 
    name: 'Montréal', 
    country: 'Canada', 
    image: 'https://images.unsplash.com/photo-1517935706619-2735e2dc7c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb250cmVhJTIwc2t5bGluZWxlbnwxfHx8fDE3NjU5OTAwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '600 000 FCFA',
    duration: '10h',
    companies: 'Air Canada, via escale'
  },
  { 
    slug: 'dakar-dubai', 
    name: 'Dubaï', 
    country: 'Émirats Arabes Unis', 
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzY1OTUxOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '450 000 FCFA',
    duration: '8h',
    companies: 'Emirates'
  },
  { 
    slug: 'dakar-new-york', 
    name: 'New York', 
    country: 'USA', 
    image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eXxlbnwxfHx8fDE3NjU5NDg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '550 000 FCFA',
    duration: '9h',
    companies: 'Delta, via escale'
  },
  { 
    slug: 'dakar-madrid', 
    name: 'Madrid', 
    country: 'Espagne', 
    image: 'https://images.unsplash.com/photo-1543783200-8694dba04a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWRyaWQlMjBwbGF6YSUyMG1heW9yfGVufDF8fHx8MTc2NTk5MDAzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '300 000 FCFA',
    duration: '5h',
    companies: 'Iberia'
  },
  { 
    slug: 'dakar-rome', 
    name: 'Rome', 
    country: 'Italie', 
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2NTkzMzgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '350 000 FCFA',
    duration: '6h',
    companies: 'Alitalia, via escale'
  },
  { 
    slug: 'dakar-bruxelles', 
    name: 'Bruxelles', 
    country: 'Belgique', 
    image: 'https://images.unsplash.com/photo-1549823084-3c98cec07e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV4ZWxsZXMlMjBncmFuZCUyMHBsYWNlfGVufDF8fHx8MTc2NTk5MDA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    priceFrom: '400 000 FCFA',
    duration: '6h',
    companies: 'Brussels Airlines'
  },
];

// Images pour le HeroCarousel – orientées voyage / vols / destinations internationales depuis l'Afrique
const heroImages = [
  'https://images.unsplash.com/photo-1436491865338-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000', // avion au décollage coucher de soleil
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000', // ambiance voyage – plage / horizon (représente départ vers ailleurs)
  'https://images.unsplash.com/photo-1527631746610-b47e8f0e2d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000', // aéroport international animé
  'https://images.unsplash.com/photo-1559523195-5b2c5e0d3c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000', // skyline mixte (Paris / Dubaï / NY vibe)
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000', // avion survolant paysage
];

export default function DestinationsClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel – placé en tout premier */}
      <section className="relative">
        <HeroCarousel
          images={heroImages}
          height="h-[500px] md:h-[620px]"
          title="Découvrez le Monde depuis Dakar"
          subtitle="Vols pas chers vers Paris, Istanbul, Casablanca, Dubaï et bien plus. Paiement Wave, Orange Money, carte ou cash – Réservez 24/7 !"
          ctaText="Voir toutes les destinations"
          ctaTargetId="destinations-list"
        />
      </section>

      {/* Contenu principal */}
      <section id="destinations-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 bg-gradient-to-r from-[#A11C1C] to-[#c0392b] bg-clip-text text-transparent">
            Destinations Populaires depuis Dakar
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Comparez et réservez vos vols au meilleur prix. Paiement local sécurisé – Wave, Orange Money, carte bancaire ou en agence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ scale: 1.04, y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-48 md:h-56">
                <img 
                  src={dest.image} 
                  alt={`Vol pas cher Dakar vers ${dest.name} – ${dest.country}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white drop-shadow-md">
                  <h3 className="text-2xl md:text-3xl font-bold">{dest.name}</h3>
                  <p className="text-base opacity-90">{dest.country}</p>
                </div>
              </div>

              <div className="p-6 md:p-7 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2.5">
                    <Plane className="w-5 h-5 text-[#A11C1C]" />
                    <span>{dest.companies}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-[#A11C1C]" />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-[#A11C1C]" />
                    <span>Dès {dest.priceFrom}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-[#A11C1C]" />
                    <span>Wave / OM / CB</span>
                  </div>
                </div>

                <Link 
                  href={`/destinations/${dest.slug}`}
                  className="mt-3 w-full flex items-center justify-center py-3.5 bg-[#A11C1C] hover:bg-[#8e1a1a] text-white rounded-xl font-semibold text-base transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Réserver ce vol <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Autres Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Autres Destinations</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Plus de 1 200 destinations mondiales accessibles depuis Dakar Blaise Diagne (DSS)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#A11C1C] to-[#c0392b] text-white rounded-3xl p-10 md:p-12 text-center shadow-2xl"
        >
          <p className="text-xl md:text-2xl mb-8 font-medium">
            Vous ne trouvez pas votre destination ? Nous pouvons trouver le meilleur vol pour vous !
          </p>
          <button 
            onClick={() => {
              // TODO: ouvrir modal contact / WhatsApp / formulaire devis
              window.open('https://wa.me/221769486060', '_blank');
            }}
            className="px-10 py-4 bg-white text-[#A11C1C] rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Demander un devis personnalisé
          </button>
        </motion.div>
      </section>

      {/* Avantages */}
      <section className="bg-gradient-to-br from-[#A11C1C]/5 via-white to-[#A11C1C]/5 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-gray-800">
              Pourquoi réserver vos vols avec Eazy-Visa ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { icon: Star, title: 'Meilleurs Prix Garantis', desc: 'Prix transparents, pas de frais cachés, alertes promo' },
              { icon: Clock, title: 'Support 24/7 Local', desc: 'Équipe à Dakar – WhatsApp, appel, agence physique' },
              { icon: CreditCard, title: 'Paiements 100% Locaux', desc: 'Wave, Orange Money, CB, cash en agence Keur Gorgui' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-xl text-center border border-gray-100 hover:border-[#A11C1C]/30 transition-all"
              >
                <item.icon className="w-14 h-14 md:w-16 md:h-16 text-[#A11C1C] mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}