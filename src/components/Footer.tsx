'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer style={{ backgroundColor: 'var(--ujima-dark)', color: 'var(--ujima-cream)' }} className="py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div
              style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              U
            </div>
            <span className="font-bold">Projecto Ecológico UJIMA</span>
          </div>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-sm">{t('tagline')}</p>
        </div>

        <div>
          <h4 style={{ color: 'var(--ujima-yellow)' }} className="font-semibold mb-3">Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href={`/${locale}`} className="hover:opacity-70 transition-opacity">{locale === 'pt' ? 'Início' : 'Home'}</Link>
            <Link href={`/${locale}/info`} className="hover:opacity-70 transition-opacity">{locale === 'pt' ? 'Informação' : 'Information'}</Link>
            <Link href={`/${locale}/about`} className="hover:opacity-70 transition-opacity">{locale === 'pt' ? 'Sobre Nós' : 'About Us'}</Link>
            <Link href={`/${locale}/contact`} className="hover:opacity-70 transition-opacity">{locale === 'pt' ? 'Contacto' : 'Contact'}</Link>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'var(--ujima-yellow)' }} className="font-semibold mb-3">Contacto</h4>
          <p className="text-sm">projecto.ujima@gmail.com</p>
          <p className="text-sm mt-1">Luanda, Angola</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--ujima-green)' }} className="max-w-6xl mx-auto px-4 mt-8 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Projecto Ecológico UJIMA. {t('rights')}.
      </div>
    </footer>
  );
}
