/* app/layout.tsx */
import './globals.css';       // Tailwind + global CSS
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';     // Toast provider

export interface RootLayoutProps {
  children: ReactNode;
}

/*
  Next 13's **app router** renders `RootLayout` *before* every page.
  It is a **server component** by default, so if you need state in a
  child (Navbar, Footer…) just make that child a client component –
  Next will load it automatically.
*/
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {/* Événement global : navigation bar */}
        <Navbar />

        {/* Zone où votre page va « s’injecter » */}
        <main className="flex-1">{children}</main>

        {/* Pied de page commun */}
        <Footer />

        {/* Toast global – ne changez rien ici */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
