'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const t      = useTranslations('nav');
  const locale = useLocale();
  const path   = usePathname();
  const [open,  setOpen]  = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: `/${locale}`,         label: t('home')    },
    { href: `/${locale}/info`,    label: t('info')    },
    { href: `/${locale}/about`,   label: t('about')   },
    { href: `/${locale}/contact`, label: t('contact') },
  ];
  const other    = locale === 'pt' ? 'en' : 'pt';
  const switchTo = path.replace(`/${locale}`, `/${other}`);

  return (
    <header
      role="banner"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: solid ? '0 1px 12px rgba(0,0,0,.08)' : 'none',
        transition: 'box-shadow .3s',
      }}
      className="sticky top-0 z-50"
    >
      <a href="#main-content" className="skip-link">
        {locale === 'pt' ? 'Saltar para conteúdo' : 'Skip to content'}
      </a>

      <nav aria-label="Primary" className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href={`/${locale}`} aria-label="UJIMA — página inicial" className="flex items-center gap-2.5 shrink-0">
          {logoUrl
            ? <img src={logoUrl} alt="" aria-hidden="true" className="w-8 h-8 rounded-full object-cover" />
            : (
              <div aria-hidden="true" style={{ background: '#EAB308', color: '#111827', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>
                U
              </div>
            )
          }
          <div className="leading-none">
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Projecto Ecológico
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#111827', letterSpacing: '.04em' }}>
              UJIMA
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = path === href || (href !== `/${locale}` && path.startsWith(href));
            return (
              <Link key={href} href={href} aria-current={active ? 'page' : undefined}
                style={{
                  color: active ? '#15803D' : '#374151',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.9375rem',
                  padding: '0.5rem 0.875rem',
                  borderRadius: 8,
                  textDecoration: 'none',
                  background: active ? '#F0FDF4' : 'transparent',
                  transition: 'background .15s, color .15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.color = '#111827'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; } }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Lang switcher */}
          <Link href={switchTo} aria-label={`Switch to ${other === 'en' ? 'English' : 'Português'}`}
            className="hidden md:flex"
            style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803D', border: '1.5px solid #15803D', borderRadius: 100, padding: '0.3rem 0.75rem', textDecoration: 'none', transition: 'background .15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F0FDF4'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {other.toUpperCase()}
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu"
            style={{ color: '#374151', padding: '0.375rem', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer' }}
            className="md:hidden"
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open
                ? <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>
                : <><line x1="3" y1="7" x2="19" y2="7"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="17" x2="19" y2="17"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open}
        style={{ borderTop: '1px solid #E5E7EB', background: '#ffffff', padding: '0.75rem 1.5rem 1.25rem' }}
        className="md:hidden"
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '0.75rem 0', borderBottom: '1px solid #F3F4F6', color: '#111827', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}
          >
            {label}
          </Link>
        ))}
        <Link href={switchTo} onClick={() => setOpen(false)}
          style={{ display: 'block', paddingTop: '1rem', color: '#15803D', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
        >
          {other.toUpperCase()} — {other === 'en' ? 'English' : 'Português'}
        </Link>
      </div>
    </header>
  );
}
