'use client';
import Link  from 'next/link';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div {...fadeIn} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A11C1C] to-[#A11C1C] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EV</span>
              </div>
              <span className="font-bold text-xl">Eazy-Visa</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour tous vos besoins de voyage. 
              Le meilleur prix, toujours.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <h3 className="font-bold text-lg mb-4">Nos services</h3>
            <ul className="space-y-2">
              {[
                'Demande de visa pour l\'Allemagne',
                'Vente de billets d\'avions',
                'Assurance voyage',
                'Réservation hôtel',
              ].map((service) => (
                <li key={service}>
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer inline-block text-sm"
                  >
                    {service}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <h3 className="font-bold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              {[
                { to: '/cgu', label: 'CGU' },
                { to: '/carrieres', label: 'Carrières' },
                { to: '/partenariat', label: 'Partenariat' },
                { to: '/investissement', label: 'Investissement' },
                { to: '/a-propos', label: 'À propos' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>Cité Keur Gorgui</p>
                  <p>Immeuble Keur Mbaye Lô</p>
                  <p>Villa Nr 12, Dakar</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">+221 XX XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">contact@eazy-visa.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Clock className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p className="font-medium text-white">24/24 & 7j/7</p>
                  <p className="text-xs">Le monde ne dort pas, nous non plus 😅</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400"
        >
          <p>
            Copyright © 2025 Eazy-visa site web officiel | Made with ❤️ in Dakar
          </p>
        </motion.div>
      </div>
    </footer>
  );
}