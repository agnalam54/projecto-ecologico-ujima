'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const locale = useLocale();
  const isPt   = locale === 'pt';

  const links = [
    { href: `/${locale}`,         pt: 'Início',     en: 'Home'        },
    { href: `/${locale}/info`,    pt: 'Informação', en: 'Information' },
    { href: `/${locale}/about`,   pt: 'Sobre Nós',  en: 'About Us'    },
    { href: `/${locale}/contact`, pt: 'Contacto',   en: 'Contact'     },
  ];

  return (
    <footer role="contentinfo" style={{ background: 'var(--g-900)', color: '#fff' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div aria-hidden="true" style={{ background: 'var(--y-400)', color: 'var(--t-primary)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1rem', flexShrink: 0 }}>U</div>
              <div>
                <div style={{ color: 'var(--g-200)', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>Projecto Ecológico</div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 900, letterSpacing: '0.08em' }}>UJIMA</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '32ch' }}>
              {isPt ? 'Uma iniciativa comunitária dedicada à preservação ambiental e ao desenvolvimento sustentável em Angola.'
                     : 'A community initiative dedicated to environmental preservation and sustainable development in Angola.'}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label={isPt ? 'Navegação do rodapé' : 'Footer navigation'}>
            <h2 style={{ color: 'var(--g-200)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {isPt ? 'Navegação' : 'Navigation'}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {isPt ? l.pt : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 style={{ color: 'var(--g-200)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {isPt ? 'Contacto' : 'Contact'}
            </h2>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:projecto.ujima@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                projecto.ujima@gmail.com
              </a>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem' }}>Luanda, Angola</span>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>
            © {new Date().getFullYear()} Projecto Ecológico UJIMA. {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <Link href="/admin" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
