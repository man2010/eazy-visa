'use client';

import Link from 'next/link';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icône */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <WifiOff className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Vous êtes hors ligne
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Il semblerait que vous n'ayez pas de connexion internet. Veuillez vérifier votre connexion et réessayer.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleReload}
            className="w-full bg-[#A11C1C] hover:bg-[#8B0000] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>

          <Link
            href="/"
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>💡 Astuce :</strong> Certaines pages que vous avez déjà visitées peuvent être disponibles hors ligne grâce à notre application.
          </p>
        </div>
      </div>
    </div>
  );
}