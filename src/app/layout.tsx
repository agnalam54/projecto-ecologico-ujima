import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Projecto Ecológico UJIMA',
  description: 'Uma iniciativa comunitária pelo ambiente e pelo futuro de Angola',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
