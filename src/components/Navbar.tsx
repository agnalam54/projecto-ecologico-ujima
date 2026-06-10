'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/info`, label: t('info') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav style={{ backgroundColor: 'var(--ujima-dark)' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div
            style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
          >
            U
          </div>
          <span style={{ color: 'var(--ujima-cream)' }} className="font-bold text-lg hidden sm:block leading-tight">
            Projecto Ecológico<br />
            <span style={{ color: 'var(--ujima-yellow)' }}>UJIMA</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: isActive ? 'var(--ujima-yellow)' : 'var(--ujima-cream)',
                  borderBottom: isActive ? '2px solid var(--ujima-yellow)' : '2px solid transparent',
                }}
                className="pb-1 text-sm font-medium transition-colors hover:opacity-80"
              >
                {label}
              </Link>
            );
          })}

          {/* Language switcher */}
          <Link
            href={switchPath}
            style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            {otherLocale === 'pt' ? 'PT' : 'EN'}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={switchPath}
            style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase"
          >
            {otherLocale === 'pt' ? 'PT' : 'EN'}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--ujima-cream)' }}
            className="p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: 'var(--ujima-dark)', borderTop: '1px solid var(--ujima-green)' }} className="md:hidden px-4 pb-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: 'var(--ujima-cream)' }}
              className="block py-2 text-sm font-medium hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
