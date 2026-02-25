/**
 * BLOG CLIENT COMPONENT - EAZY-VISA DESIGN
 * Respecte le design du projet : HeroCarousel, animations, couleurs, style
 */

'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

// Composants du projet
import HeroCarousel from '@/components/HeroCarousel';

// Icônes
import {
  Plane, MapPin, Calendar, Clock, TrendingUp, 
  ArrowRight, Search, Star, Eye,
  Globe, CheckCircle, ChevronRight, Users,
  BookOpen, Filter, Heart
} from 'lucide-react';

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Images pour HeroCarousel (même style que HomePage)
  const heroImages = [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25888?q=80&w=2400',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2400',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2400',
  ];

  // Catégories avec icônes (style cohérent avec le projet)
  const categories = [
    { id: 'all', name: 'Tous les articles', icon: Globe, count: 24 },
    { id: 'billets', name: 'Billets d\'avion', icon: Plane, count: 8 },
    { id: 'destinations', name: 'Destinations', icon: MapPin, count: 12 },
    { id: 'guides', name: 'Guides pratiques', icon: BookOpen, count: 6 },
    { id: 'astuces', name: 'Astuces voyage', icon: TrendingUp, count: 5 },
  ];

  // Articles en vedette
  const featuredArticles = [
    {
      id: 1,
      slug: 'guide-complet-billets-avion-pas-cher-dakar-2025',
      title: 'Guide Ultime 2025 : Trouver des Billets d\'Avion Pas Cher depuis Dakar',
      excerpt: 'Découvrez les 15 astuces infaillibles pour économiser jusqu\'à 60% sur vos billets d\'avion. Comparateurs, périodes idéales, erreurs à éviter : tout ce que vous devez savoir.',
      category: 'billets',
      author: 'Aminata Diallo',
      authorRole: 'Experte Billetterie',
      date: '2025-02-07',
      readTime: '12 min',
      views: '15.2k',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2400',
      tags: ['billets pas cher', 'astuces', 'économies'],
    },
    {
      id: 2,
      slug: 'top-20-destinations-depuis-dakar-2025',
      title: 'Top 20 Destinations Incontournables depuis Dakar en 2025',
      excerpt: 'Paris, Dubai, Istanbul, New York... Explorez les destinations les plus prisées par les Sénégalais. Prix moyens, meilleure période, visas.',
      category: 'destinations',
      author: 'Moussa Sarr',
      authorRole: 'Travel Writer',
      date: '2025-02-05',
      readTime: '18 min',
      views: '23.5k',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25888?q=80&w=2400',
      tags: ['destinations', 'top 2025', 'guides'],
    },
    {
      id: 3,
      slug: 'billet-avion-dakar-paris-tout-savoir',
      title: 'Dakar-Paris : Le Guide Complet du Billet d\'Avion',
      excerpt: 'La destination #1 des Sénégalais décryptée : prix moyens, meilleures compagnies, astuces pour payer moins cher.',
      category: 'billets',
      author: 'Fatou Kane',
      authorRole: 'Spécialiste Europe',
      date: '2025-02-03',
      readTime: '15 min',
      views: '31.8k',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2400',
      tags: ['Dakar Paris', 'billets', 'France'],
    },
  ];

  // Tous les articles
  const allArticles = [
    {
      id: 4,
      slug: 'visa-schengen-senegal-guide-2025',
      title: 'Visa Schengen depuis le Sénégal : Guide Complet 2025',
      excerpt: 'Documents nécessaires, délais, coûts, taux de réussite : tout pour obtenir votre visa Schengen.',
      category: 'guides',
      author: 'Bertrand Gopele',
      date: '2025-02-01',
      readTime: '10 min',
      views: '12.3k',
      image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1200',
      tags: ['visa', 'Schengen', 'Europe'],
    },
    {
      id: 5,
      slug: '10-erreurs-eviter-achat-billet-avion',
      title: '10 Erreurs Fatales à Éviter lors de l\'Achat d\'un Billet d\'Avion',
      excerpt: 'Ces erreurs vous coûtent des milliers de francs. Découvrez comment les éviter et voyager malin.',
      category: 'astuces',
      author: 'Aminata Diallo',
      date: '2025-01-30',
      readTime: '8 min',
      views: '18.7k',
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1200',
      tags: ['astuces', 'erreurs', 'économies'],
    },
    {
      id: 6,
      slug: 'dubai-depuis-dakar-guide-complet',
      title: 'Dubai depuis Dakar : Le Guide Ultime',
      excerpt: 'Préparez votre voyage à Dubai : billets pas chers, hébergement, visites incontournables, budget.',
      category: 'destinations',
      author: 'Moussa Sarr',
      date: '2025-01-28',
      readTime: '20 min',
      views: '9.2k',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      tags: ['Dubai', 'destinations', 'guide'],
    },
    {
      id: 7,
      slug: 'meilleure-periode-acheter-billet-avion',
      title: 'Quelle est la Meilleure Période pour Acheter un Billet d\'Avion ?',
      excerpt: 'Science des prix aériens : quand réserver pour payer moins cher selon votre destination.',
      category: 'billets',
      author: 'Fatou Kane',
      date: '2025-01-25',
      readTime: '9 min',
      views: '14.1k',
      image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200',
      tags: ['timing', 'prix', 'astuces'],
    },
    {
      id: 8,
      slug: 'payer-billet-avion-wave-orange-money',
      title: 'Payer son Billet d\'Avion avec Wave ou Orange Money',
      excerpt: 'Tout sur les paiements mobiles pour billets d\'avion au Sénégal : avantages, limites, sécurité.',
      category: 'guides',
      author: 'Bertrand Gopele',
      date: '2025-01-22',
      readTime: '7 min',
      views: '11.5k',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200',
      tags: ['paiement', 'Wave', 'Orange Money'],
    },
    {
      id: 9,
      slug: 'new-york-depuis-dakar-tout-savoir',
      title: 'New York depuis Dakar : Vol, Visa, Budget & Itinéraire',
      excerpt: 'Réalisez votre rêve américain : guide complet pour un voyage inoubliable à New York depuis Dakar.',
      category: 'destinations',
      author: 'Moussa Sarr',
      date: '2025-01-20',
      readTime: '22 min',
      views: '7.8k',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200',
      tags: ['New York', 'USA', 'guide complet'],
    },
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  const stats = [
    { label: 'Articles publiés', value: '50+', icon: BookOpen },
    { label: 'Lecteurs mensuels', value: '100k+', icon: Users },
    { label: 'Note moyenne', value: '4.9/5', icon: Star },
    { label: 'Destinations couvertes', value: '1,200+', icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section avec HeroCarousel (même style que HomePage) */}
      <section className="relative pt-15 pb-12">
        <div className="w-full px-0">
          <HeroCarousel
            images={heroImages}
            height="h-[670px]"
            title="Blog Voyage Eazy-Visa"
            subtitle="Guides complets, billets d'avion pas cher, destinations de rêve, astuces d'experts. Tout pour voyager malin depuis Dakar."
            ctaText="Explorer les articles"
            ctaTargetId="blog-content"
          />
        </div>
      </section>

      {/* Section SEO - Texte enrichi */}
      <section id="blog-content" className="py-12 bg-white" aria-label="Billets d'avion Dakar - Introduction Blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Le Meilleur Blog Voyage du Sénégal : Billets d'Avion, Destinations & Astuces
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bienvenue sur le <strong>blog voyage référence du Sénégal</strong>. Depuis 2020, nous aidons des milliers de voyageurs sénégalais à <strong>économiser jusqu'à 60% sur leurs billets d'avion</strong> grâce à nos guides détaillés, astuces d'experts et analyses de prix en temps réel. Que vous cherchiez un <strong>billet d'avion Dakar-Paris pas cher</strong>, des conseils pour voyager vers <strong>Dubai, New York ou Istanbul</strong>, ou des guides pratiques sur les visas, vous êtes au bon endroit.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section (même style que HomePage) */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Votre source #1 d'informations voyage
            </h2>
            <p className="text-xl text-gray-600">
              Des guides fiables, des conseils pratiques, des astuces qui fonctionnent
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
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white" aria-label="Catégories d'articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explorez par thématique
            </h2>
            <p className="text-xl text-gray-600">Trouvez exactement ce que vous cherchez</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#A11C1C] text-white shadow-2xl'
                    : 'bg-white text-gray-800 hover:shadow-xl border-2 border-gray-200'
                }`}
              >
                <category.icon className={`w-10 h-10 mx-auto mb-3 ${
                  selectedCategory === category.id ? 'text-white' : 'text-[#A11C1C]'
                }`} />
                <div className={`text-sm font-semibold mb-2 ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.name}
                </div>
                <div className={`text-xs ${
                  selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {category.count} articles
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-20 bg-gray-50" aria-label="Articles en vedette">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Articles vedettes
                </h2>
                <p className="text-xl text-gray-600">Les plus lus cette semaine</p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="hidden md:flex items-center gap-2 text-[#A11C1C] font-semibold cursor-pointer"
              >
                Voir tous
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  <Link href={`/blog/${article.slug}`}>
                    <div className="relative h-64">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-[#A11C1C] text-white text-xs font-semibold rounded-full">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-3 mb-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#A11C1C] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200" />
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{article.author}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tous les articles */}
      <section className="py-20 bg-white" aria-label="Tous les articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Tous les articles
                </h2>
                <p className="text-gray-600">
                  {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Barre de recherche */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full md:w-80 border-2 border-gray-200 rounded-full focus:border-[#A11C1C] focus:outline-none transition-colors"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative h-56">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#A11C1C] text-white text-xs font-semibold rounded-full">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long'
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 leading-tight hover:text-[#A11C1C] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="text-sm font-medium text-gray-900">
                          {article.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-[#A11C1C] text-white rounded-lg font-semibold inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
            >
              Charger plus d'articles
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Final (même style que HomePage) */}
      <section className="py-20 bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#A11C1C] to-red-800 rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à réserver votre prochain voyage ?
              </h2>
              
              <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                Trouvez les meilleurs billets d'avion depuis Dakar en quelques clics. 
                Prix imbattables garantis.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-[#A11C1C] rounded-lg font-bold inline-flex items-center justify-center gap-3 shadow-2xl"
                >
                  <Plane className="w-6 h-6" />
                  Rechercher un vol
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-lg font-bold hover:bg-white/30 transition-colors"
                >
                  Contacter un expert
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}