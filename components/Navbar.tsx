'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import BookingModal from './BookingModal';

const PHONE_NUMBER = '+221 33 844 12 12';
const PHONE_HREF = '+221338441212';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/billets', label: 'Billets d\'avion' },
  { to: '/hotels', label: 'Hôtels' },
  { to: '/voyager-en-allemagne', label: 'Procedure en Allemagne' },
  { to: '/destinations', label: 'Destinations' },
];

const DESTINATIONS_SUBMENU = [
  { to: '/destinations/dakar-paris', label: 'Paris' },
  { to: '/destinations/dakar-istanbul', label: 'Istanbul' },
  { to: '/destinations/dakar-casablanca', label: 'Casablanca' },
  { to: '/destinations/dakar-montreal', label: 'Montréal' },
  { to: '/destinations/dakar-dubai', label: 'Dubaï' },
  { to: '/destinations/dakar-new-york', label: 'New York' },
  { to: '/destinations/dakar-madrid', label: 'Madrid' },
  { to: '/destinations/dakar-rome', label: 'Rome' },
  { to: '/destinations/dakar-bruxelles', label: 'Bruxelles' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDestinationsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="Eazy-Visa - Accueil">
              <Image
                src="/Logo.png"
                alt="Eazy-Visa - Agence de voyage Dakar"
                width={144}
                height={40}
                priority
                className="w-28 sm:w-32 md:w-36 h-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Navigation principale">
              {NAV_LINKS.map((link) => {
                if (link.to === '/destinations') {
                  return (
                    <div
                      key={link.to}
                      className="relative group"
                      onMouseEnter={() => setIsDestinationsOpen(true)}
                      onMouseLeave={() => setIsDestinationsOpen(false)}
                    >
                      <button
                        className={`flex items-center font-medium transition-colors ${
                          pathname.startsWith('/destinations')
                            ? 'text-[#A11C1C]'
                            : 'text-gray-700 hover:text-[#A11C1C]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {isDestinationsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50"
                          >
                            {DESTINATIONS_SUBMENU.map((sub) => (
                              <Link
                                key={sub.to}
                                href={sub.to}
                                className={`block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#A11C1C] transition-colors ${
                                  pathname === sub.to ? 'bg-gray-50 text-[#A11C1C]' : ''
                                }`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`relative group font-medium ${
                      pathname === link.to
                        ? 'text-[#A11C1C]'
                        : 'text-gray-700 hover:text-[#A11C1C]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#A11C1C] to-orange-600 transition-all ${
                        pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center space-x-5">
              <motion.a
                href={`tel:${PHONE_HREF}`}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#A11C1C]"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">{PHONE_NUMBER}</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-2.5 bg-[#A11C1C] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Réserver RV
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label={isMobileMenuOpen ? 'Fermer menu' : 'Ouvrir menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-4/5 max-w-sm bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-24 pb-10 px-6">
                {NAV_LINKS.map((link, index) => {
                  if (link.to === '/destinations') {
                    return (
                      <div key={link.to}>
                        <button
                          onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                          className="flex items-center justify-between w-full py-4 border-b border-gray-100 font-medium text-gray-800"
                        >
                          {link.label}
                          <ChevronDown className={`w-5 h-5 transition-transform ${isDestinationsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isDestinationsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {DESTINATIONS_SUBMENU.map((sub) => (
                                  <Link
                                    key={sub.to}
                                    href={sub.to}
                                    className={`block py-2 text-gray-600 hover:text-[#A11C1C] ${
                                      pathname === sub.to ? 'text-[#A11C1C] font-medium' : ''
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.to}
                      href={link.to}
                      className={`py-4 border-b border-gray-100 font-medium ${
                        pathname === link.to ? 'text-[#A11C1C]' : 'text-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="mt-auto space-y-6 pt-8">
                  <a
                    href={`tel:${PHONE_HREF}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-[#A11C1C]"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{PHONE_NUMBER}</span>
                  </a>

                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <span>Cité Keur Gorgui, Dakar</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsBookingModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 bg-[#A11C1C] text-white rounded-lg font-semibold shadow-md"
                  >
                    Réserver un rendez-vous
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}