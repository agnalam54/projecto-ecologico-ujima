'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label_pt: 'Início', label_en: 'Home' },
    { href: `/${locale}/info`, label_pt: 'Informação', label_en: 'Information' },
    { href: `/${locale}/about`, label_pt: 'Sobre Nós', label_en: 'About Us' },
    { href: `/${locale}/contact`, label_pt: 'Contacto', label_en: 'Contact' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--ujima-dark)', color: 'var(--ujima-cream)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg">U</div>
            <div>
              <div className="font-bold text-sm leading-tight">Projecto Ecológico</div>
              <div style={{ color: 'var(--ujima-yellow)' }} className="font-black text-base uppercase tracking-wider">UJIMA</div>
            </div>
          </div>
          <p style={{ color: 'rgba(249,247,240,0.6)' }} className="text-sm leading-relaxed max-w-xs">
            {locale === 'pt' ? 'Uma iniciativa comunitária dedicada à preservação ambiental e ao desenvolvimento sustentável em Angola.' : 'A community initiative dedicated to environmental preservation and sustainable development in Angola.'}
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: 'var(--ujima-yellow)' }} className="text-xs font-black uppercase tracking-widest mb-4">
            {locale === 'pt' ? 'Navegação' : 'Navigation'}
          </h4>
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'rgba(249,247,240,0.7)' }} className="text-sm hover:opacity-100 transition-opacity hover:text-yellow-300">
                {locale === 'pt' ? l.label_pt : l.label_en}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'var(--ujima-yellow)' }} className="text-xs font-black uppercase tracking-widest mb-4">
            {locale === 'pt' ? 'Contacto' : 'Contact'}
          </h4>
          <div className="flex flex-col gap-3 text-sm" style={{ color: 'rgba(249,247,240,0.7)' }}>
            <span>📧 projecto.ujima@gmail.com</span>
            <span>📍 Luanda, Angola</span>
          </div>
          <Link href={`/${locale}/contact`} className="btn-primary mt-6 text-xs px-4 py-2 inline-flex" style={{ fontSize: 12, padding: '8px 20px' }}>
            {locale === 'pt' ? 'Contacte-nos' : 'Contact us'} →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(82,183,136,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ color: 'rgba(249,247,240,0.4)' }} className="text-xs">
            © {new Date().getFullYear()} Projecto Ecológico UJIMA. {locale === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <Link href="/admin" style={{ color: 'rgba(249,247,240,0.3)' }} className="text-xs hover:opacity-70 transition-opacity">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
