'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Building2, Users, Plane, MapPin,
  Mail, Phone, User, Briefcase,
  TrendingUp, Globe, CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';

interface CorporateDevisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTEURS = [
  'BTP / Construction',
  'Commerce & Distribution',
  'Éducation & Formation',
  'Énergie & Mines',
  'Finance & Banque',
  'Industrie & Manufacturing',
  'ONG / Association',
  'Santé & Pharmaceutique',
  'Services & Conseil',
  'Technologie & Télécoms',
  'Transport & Logistique',
  'Autre',
];

const TAILLES = [
  '1 – 10 employés',
  '11 – 50 employés',
  '51 – 200 employés',
  '201 – 500 employés',
  '500+ employés',
];

const VOLUMES = [
  'Moins de 10 voyages / an',
  '10 – 50 voyages / an',
  '51 – 100 voyages / an',
  '101 – 300 voyages / an',
  '300+ voyages / an',
];

export default function CorporateDevisModal({ isOpen, onClose }: CorporateDevisModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    // Entreprise
    companyName: '',
    sector: '',
    companySize: '',
    annualTrips: '',
    mainDestinations: '',
    // Contact
    contactName: '',
    contactRole: '',
    email: '',
    phone: '',
    // Besoins
    services: [] as string[],
    message: '',
  });

  const serviceOptions = [
    { key: 'flights', label: '✈️ Billets d\'avion' },
    { key: 'hotels', label: '🏨 Hébergements' },
    { key: 'visa', label: '📋 Visas & démarches' },
    { key: 'insurance', label: '🛡️ Assurances voyage' },
    { key: 'transfers', label: '🚗 Transferts & mobilité' },
    { key: 'reporting', label: '📊 Reporting & gestion des coûts' },
  ];

  const toggleService = (key: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(key)
        ? prev.services.filter(s => s !== key)
        : [...prev.services, key],
    }));
  };

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (!form.companyName || !form.sector || !form.companySize || !form.annualTrips) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!form.contactName || !form.email) {
      toast.error('Nom du contact et email sont obligatoires');
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch(`${API_URL}/b2b`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        throw new Error(data.error);
      }
    } catch {
      toast.error('Erreur lors de l\'envoi', { description: 'Vérifiez votre connexion et réessayez.' });
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSent(false);
      setForm({
        companyName: '', sector: '', companySize: '', annualTrips: '',
        mainDestinations: '', contactName: '', contactRole: '',
        email: '', phone: '', services: [], message: '',
      });
    }, 300);
  };

  const inputCls = 'w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A11C1C]/30 focus:border-[#A11C1C] outline-none transition-all bg-white';
  const selectCls = 'w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A11C1C]/30 focus:border-[#A11C1C] outline-none transition-all bg-white appearance-none cursor-pointer';
  const labelCls = 'block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl bg-white flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 flex-shrink-0">
              {/* Décoration */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#A11C1C]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#A11C1C]/10 rounded-full blur-xl" />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A11C1C] flex items-center justify-center shadow-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#A11C1C] text-xs font-bold uppercase tracking-widest">Eazy-Visa</p>
                    <h2 className="text-white text-xl font-bold">Corporate — Demande de devis</h2>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Steps indicator */}
              {!sent && (
                <div className="relative flex items-center gap-2 mt-5">
                  {[1, 2].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s ? 'bg-[#A11C1C] text-white' : 'bg-white/20 text-white/50'
                      }`}>
                        {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                      </div>
                      <span className={`text-xs font-medium transition-colors ${step >= s ? 'text-white' : 'text-white/40'}`}>
                        {s === 1 ? 'Votre entreprise' : 'Contact & besoins'}
                      </span>
                      {s < 2 && <div className={`h-px w-8 transition-colors ${step > s ? 'bg-[#A11C1C]' : 'bg-white/20'}`} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">

                {/* ── SUCCESS ── */}
                {sent && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900">Demande envoyée !</h3>
                    <p className="text-gray-500 max-w-sm">
                      Notre équipe Corporate vous contactera sous <strong>24 heures ouvrables</strong> avec une offre personnalisée.
                    </p>
                    <div className="bg-[#A11C1C]/5 border border-[#A11C1C]/20 rounded-2xl p-4 w-full mt-2">
                      <p className="text-sm text-gray-600">
                        📧 Une confirmation a été envoyée à <strong>{form.email}</strong>
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      className="mt-2 px-8 py-3 bg-[#A11C1C] text-white rounded-xl font-semibold shadow-lg"
                    >
                      Fermer
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEP 1 : Entreprise ── */}
                {!sent && step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="text-sm text-gray-500 mb-6">
                        Dites-nous en plus sur votre entreprise pour que nous puissions vous proposer l'offre la plus adaptée.
                      </p>
                    </div>

                    {/* Nom entreprise */}
                    <div>
                      <label className={labelCls}>Nom de l'entreprise *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.companyName}
                          onChange={e => set('companyName', e.target.value)}
                          placeholder="Ex: Groupe Bolloré Africa"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Secteur */}
                    <div>
                      <label className={labelCls}>Secteur d'activité *</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                        <select value={form.sector} onChange={e => set('sector', e.target.value)} className={selectCls}>
                          <option value="">Choisir un secteur…</option>
                          {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Taille + Volume sur 2 colonnes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nombre d'employés *</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                          <select value={form.companySize} onChange={e => set('companySize', e.target.value)} className={selectCls}>
                            <option value="">Sélectionner…</option>
                            {TAILLES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Voyages par an *</label>
                        <div className="relative">
                          <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                          <select value={form.annualTrips} onChange={e => set('annualTrips', e.target.value)} className={selectCls}>
                            <option value="">Sélectionner…</option>
                            {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Destinations */}
                    <div>
                      <label className={labelCls}>Destinations fréquentes</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.mainDestinations}
                          onChange={e => set('mainDestinations', e.target.value)}
                          placeholder="Ex: Paris, Dubaï, New York…"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="w-full py-3.5 bg-[#A11C1C] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mt-2"
                    >
                      Continuer →
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEP 2 : Contact + Besoins ── */}
                {!sent && step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {/* Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nom complet *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={form.contactName} onChange={e => set('contactName', e.target.value)}
                            placeholder="Prénom Nom" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Fonction</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={form.contactRole} onChange={e => set('contactRole', e.target.value)}
                            placeholder="Ex: Directeur Administratif" className={inputCls} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Email professionnel *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                            placeholder="contact@entreprise.com" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Téléphone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                            placeholder="+221 77 000 00 00" className={inputCls} />
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <label className={labelCls}>Services souhaités</label>
                      <div className="grid grid-cols-2 gap-2">
                        {serviceOptions.map(opt => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => toggleService(opt.key)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border-2 transition-all ${
                              form.services.includes(opt.key)
                                ? 'bg-[#A11C1C]/10 border-[#A11C1C] text-[#A11C1C]'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelCls}>Besoins spécifiques</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Décrivez vos besoins, contraintes ou questions particulières…"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A11C1C]/30 focus:border-[#A11C1C] outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 transition-all text-sm"
                      >
                        ← Retour
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSending}
                        className="flex-1 py-3.5 bg-[#A11C1C] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSending ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            <Building2 className="w-4 h-4" />
                            Envoyer ma demande
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}