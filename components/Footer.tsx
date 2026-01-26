'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const COMPANY_NAME = 'Eazy-Visa';
const PHONE_NUMBER = '+221 76 948 60 60';
const PHONE_HREF = '+221769486060';
const EMAIL = 'contact@eazy-visa.com';

const SERVICES = [
  'Visa pour l\'Allemagne',
  'Billets d\'avion',
  'Assurance voyage',
  'Réservation hôtel',
];

const FOOTER_LINKS = [
  { to: '/cgu', label: 'Conditions Générales' },
  { to: '/carrieres', label: 'Carrières' },
  { to: '/partenariat', label: 'Partenariat' },
  { to: '/investissement', label: 'Investissement' },
  { to: '/a-propos', label: 'À propos' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/eazy.visa' },
  { name: 'Twitter', url: 'https://twitter.com/EazyVisa' },
  { name: 'Instagram', url: 'https://instagram.com/eazy.visa' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/eazy-visa' },
];

export default function Footer() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <footer 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info - SEO Optimized */}
          <motion.div {...fadeIn} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A11C1C] to-[#A11C1C] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EV</span>
              </div>
              <span className="font-bold text-xl">{COMPANY_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Agence voyage Dakar - Billets avion pas cher, visa Allemagne express, réservation hôtels. Service client 24/7.
            </p>
            <nav className="flex space-x-4" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all"
                  aria-label={`Suivre ${COMPANY_NAME} sur ${social.name}`}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <h3 className="font-bold text-lg mb-4">Nos services</h3>
            <ul className="space-y-2" role="list">
              {SERVICES.map((service) => (
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
          <motion.nav {...fadeIn} transition={{ delay: 0.2 }} aria-label="Liens de la société">
            <h3 className="font-bold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.map((link) => (
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
          </motion.nav>

          {/* Contact - Local SEO */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <h3 className="font-bold text-lg mb-4">Contact & Horaires</h3>
            <div className="space-y-3">
              <address className="not-italic">
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#A11C1C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-gray-400">
                    <p>Cité Keur Gorgui</p>
                    <p>Immeuble R98, Lot 12</p>
                    <p>Dakar, Sénégal</p>
                  </div>
                </div>
              </address>

              <a 
                href={`tel:${PHONE_HREF}`}
                className="flex items-center space-x-3 text-sm hover:text-white transition-colors"
                aria-label={`Appeler Eazy-Visa: ${PHONE_NUMBER}`}
              >
                <Phone className="w-5 h-5 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400">{PHONE_NUMBER}</span>
              </a>

              <a 
                href={`mailto:${EMAIL}`}
                className="flex items-center space-x-3 text-sm hover:text-white transition-colors"
                aria-label={`Envoyer un email à ${EMAIL}`}
              >
                <Mail className="w-5 h-5 text-[#A11C1C] flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400">{EMAIL}</span>
              </a>

              <div className="flex items-start space-x-3 text-sm">
                <Clock className="w-5 h-5 text-[#A11C1C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-gray-400">
                  <p className="font-medium text-white">24/7 - 7j/7</p>
                  <p className="text-xs">Service client toujours disponible</p>
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
            &copy; 2019-2025 {COMPANY_NAME} - Agence de voyages Dakar, Sénégal | 
            <a href="https://www.eazy-visa.com" className="hover:text-white transition-colors"> www.eazy-visa.com</a>
          </p>
          <p className="mt-2 text-xs">
            Service client 24/7 | Tel: <a href={`tel:${PHONE_HREF}`} className="hover:text-white">{PHONE_NUMBER}</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}