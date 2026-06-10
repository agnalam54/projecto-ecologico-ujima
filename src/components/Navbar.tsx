'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/info`, label: t('info') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? 'rgba(19,31,20,0.96)' : 'var(--ujima-dark)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          {logoUrl ? (
            <Image src={logoUrl} alt="Logo" width={40} height={40} className="rounded-full object-cover w-10 h-10" />
          ) : (
            <div
              style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 transition-transform group-hover:scale-105"
            >
              U
            </div>
          )}
          <div className="hidden sm:block">
            <div style={{ color: 'var(--ujima-cream)' }} className="font-bold text-sm leading-tight tracking-wide">
              Projecto Ecológico
            </div>
            <div style={{ color: 'var(--ujima-yellow)' }} className="font-black text-base leading-tight tracking-wider uppercase">
              UJIMA
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{ color: isActive ? 'var(--ujima-yellow)' : 'var(--ujima-cream)' }}
                className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity relative group"
              >
                {label}
                <span
                  style={{ backgroundColor: 'var(--ujima-yellow)' }}
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}

          <Link
            href={switchPath}
            style={{ color: 'var(--ujima-dark)', backgroundColor: 'var(--ujima-yellow)' }}
            className="px-4 py-1.5 rounded text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={switchPath}
            style={{ color: 'var(--ujima-dark)', backgroundColor: 'var(--ujima-yellow)' }}
            className="px-3 py-1 rounded text-xs font-black uppercase"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--ujima-cream)' }} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          borderTop: menuOpen ? '1px solid rgba(82,183,136,0.2)' : 'none',
        }}
      >
        <div style={{ backgroundColor: 'var(--ujima-dark)' }} className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: 'var(--ujima-cream)' }}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
