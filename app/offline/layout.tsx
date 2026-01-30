import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hors ligne - Eazy-Visa',
  description: 'Vous êtes actuellement hors ligne',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}