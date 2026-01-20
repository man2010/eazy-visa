'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import BookingModal from './BookingModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const pathname = usePathname();

  /* ---- les effets ---- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile à chaque changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ----- Liens de navigation ----- */
  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/billets', label: 'Billets d\'avion' },
    { to: '/hotels', label: 'Hôtels' },
    { to: '/voyager-en-allemagne', label: 'Voyager en Allemagne' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 w-full">
            <Link href="/" className="flex items-center">
              <img src="/Logo.png" alt="Eazy-Visa logo" className="w-28 sm:w-32 md:w-36 h-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="relative group"
                >
                  <span className={`transition-colors ${
                    pathname === link.to
                      ? 'text-red-600'
                      : 'text-gray-700 hover:text-red-600'
                  }`}>
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600 transition-all group-hover:w-full ${
                      pathname === link.to ? 'w-full' : ''
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href="tel:+221123456789"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#A11C1C] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+221 XX XXX XX XX</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Réserver RV
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.to}
                    className={`block py-4 border-b border-gray-100 transition-colors ${
                      pathname === link.to
                        ? 'text-red-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-4"
              >
                
                <a  href="tel:+221123456789"
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Phone className="w-5 h-5" />
                  <span>+221 XX XXX XX XX</span>
                </a>
                
                <a  href="#"
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Cité Keur Gorgui, Dakar</span>
                </a>
                <button
                  onClick={() => {
                    setIsBookingModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] text-white rounded-lg shadow-lg"
                >
                  Réserver RV
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}