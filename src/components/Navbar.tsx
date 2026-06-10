'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: `/${locale}`,         label: t('home') },
    { href: `/${locale}/info`,    label: t('info') },
    { href: `/${locale}/about`,   label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];
  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const switchPath  = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header
      role="banner"
      style={{
        backgroundColor: scrolled ? 'rgba(13,51,32,0.97)' : 'var(--g-900)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(187,247,208,0.1)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
      className="sticky top-0 z-50"
    >
      {/* Skip link — WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        {locale === 'pt' ? 'Saltar para o conteúdo' : 'Skip to content'}
      </a>

      <nav aria-label="Primary navigation" className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          aria-label="Projecto Ecológico UJIMA — página inicial"
          className="flex items-center gap-3 shrink-0 group"
        >
          {logoUrl ? (
            <img src={logoUrl} alt="" aria-hidden="true" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div
              aria-hidden="true"
              style={{ background: 'var(--y-400)', color: 'var(--t-primary)' }}
              className="w-9 h-9 rounded-full flex items-center justify-center font-black text-base transition-transform group-hover:scale-105"
            >
              U
            </div>
          )}
          <span className="hidden sm:flex flex-col leading-none">
            <span style={{ color: 'var(--g-200)', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>
              Projecto Ecológico
            </span>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 900, letterSpacing: '0.08em' }}>
              UJIMA
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                style={{
                  color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRadius: 8,
                }}
                className="px-4 py-2 text-sm font-medium transition-all hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <Link
            href={switchPath}
            aria-label={`Switch to ${otherLocale === 'pt' ? 'Portuguese' : 'English'}`}
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 6 }}
            className="hidden md:flex px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
          >
            {otherLocale.toUpperCase()}
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            style={{ color: '#fff' }}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        style={{ borderTop: '1px solid rgba(187,247,208,0.1)', background: 'var(--g-900)' }}
        className="md:hidden px-6 pb-4 pt-2"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{ color: 'rgba(255,255,255,0.85)', display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {label}
          </Link>
        ))}
        <Link
          href={switchPath}
          onClick={() => setOpen(false)}
          style={{ color: 'var(--g-200)', display: 'block', paddingTop: 12, fontSize: 13, fontWeight: 700 }}
        >
          {otherLocale.toUpperCase()} — {otherLocale === 'en' ? 'English' : 'Português'}
        </Link>
      </div>
    </header>
  );
}
