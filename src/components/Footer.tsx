'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  const links = [
    { href: `/${locale}`,         label: tn('home')    },
    { href: `/${locale}/info`,    label: tn('info')    },
    { href: `/${locale}/about`,   label: tn('about')   },
    { href: `/${locale}/contact`, label: tn('contact') },
  ];

  return (
    <footer style={{ background: 'var(--green-900)', color: 'rgba(255,255,255,.8)' }} aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div aria-hidden="true" style={{ background: 'var(--yellow)', color: 'var(--gray-900)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>U</div>
            <div className="leading-none">
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.45)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Projecto Ecológico</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '.04em' }}>UJIMA</div>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,.55)', maxWidth: 220 }}>
            {t('tagline')}
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '1rem' }}>
            {t('links')}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.65)'; }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '1rem' }}>
            {t('contact_heading')}
          </h3>
          <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '.75rem', fontSize: '0.9375rem', color: 'rgba(255,255,255,.65)' }}>
            <div style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: 3, flexShrink: 0, opacity: .5 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Luanda, Angola
            </div>
            <a href="mailto:projecto.ujima@gmail.com"
              style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'none', display: 'flex', gap: '.5rem', alignItems: 'center', transition: 'color .15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.65)'; }}
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, opacity: .5 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              projecto.ujima@gmail.com
            </a>
          </address>
        </div>

        {/* Mission */}
        <div>
          <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '1rem' }}>
            {t('mission_heading')}
          </h3>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>
            {t('mission_text')}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,.35)' }}>
          <span>© {new Date().getFullYear()} Projecto Ecológico UJIMA. {t('rights')}</span>
          <Link href="/admin"
            style={{ color: 'rgba(255,255,255,.25)', textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.25)'; }}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
