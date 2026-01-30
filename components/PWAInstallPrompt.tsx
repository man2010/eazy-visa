'use client';

import { useState, useEffect } from 'react';
import { X, Download, Apple, Chrome } from 'lucide-react';

// Interface pour l'événement beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Vérifier si c'est iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iOS);

    // Vérifier si déjà installé (mode standalone)
    const standalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    // Vérifier si déjà refusé dans cette session
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');
    setHasBeenDismissed(dismissed === 'true');

    // Gérer l'événement beforeinstallprompt (Chrome, Edge, Samsung Internet)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Attendre 3 secondes avant d'afficher la bannière
      setTimeout(() => {
        if (!dismissed) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Pour iOS, afficher après 5 secondes si non installé
    if (iOS && !standalone && !dismissed) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt && !isIOS) return;

    if (deferredPrompt) {
      // Pour Chrome/Edge/Samsung
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installée avec succès');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setHasBeenDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Ne rien afficher si déjà installé ou si refusé
  if (isStandalone || !showInstallPrompt || hasBeenDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up md:left-auto md:right-4 md:max-w-md">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        {/* Bouton fermer */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenu */}
        <div className="flex items-start gap-3 pr-6">
          <div className="flex-shrink-0 w-12 h-12 bg-[#A11C1C] rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Installer Eazy-Visa
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {isIOS 
                ? "Accédez plus rapidement à nos services en ajoutant l'app à votre écran d'accueil"
                : "Installez notre application pour un accès rapide et des fonctionnalités hors ligne"
              }
            </p>

            {isIOS ? (
              // Instructions pour iOS
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 space-y-2">
                <p className="text-xs text-blue-900 dark:text-blue-200 font-medium">
                  Comment installer sur iOS :
                </p>
                <ol className="text-xs text-blue-800 dark:text-blue-300 space-y-1.5 list-decimal list-inside">
                  <li>Appuyez sur le bouton Partager <span className="inline-block">⎋</span></li>
                  <li>Sélectionnez "Sur l'écran d'accueil"</li>
                  <li>Appuyez sur "Ajouter"</li>
                </ol>
              </div>
            ) : (
              // Bouton d'installation pour Chrome/Edge/Samsung
              <button
                onClick={handleInstallClick}
                className="w-full bg-[#A11C1C] hover:bg-[#8B0000] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Installer l'application
              </button>
            )}
          </div>
        </div>

        {/* Badge navigateur */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {isIOS ? (
              <>
                <Apple className="w-4 h-4" />
                <span>Safari sur iOS</span>
              </>
            ) : (
              <>
                <Chrome className="w-4 h-4" />
                <span>Compatible Chrome, Edge, Samsung Internet</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}