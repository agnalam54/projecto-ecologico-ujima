'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

const INP: React.CSSProperties = {
  width: '100%',
  border: '1.5px solid var(--gray-200)',
  borderRadius: 10,
  padding: '0.875rem 1rem',
  fontSize: '0.9375rem',
  color: 'var(--gray-900)',
  background: '#fff',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'inherit',
};

export default function ContactPage() {
  const t      = useTranslations('contact');
  const locale = useLocale();
  const isPt   = locale === 'pt';
  const [status,  setStatus]  = useState<'idle'|'success'|'error'>('idle');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  const contactItems = [
    {
      icon: (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      ),
      label: 'Email',
      value: 'projecto.ujima@gmail.com',
      href: 'mailto:projecto.ujima@gmail.com',
    },
    {
      icon: (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .02h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/></svg>
      ),
      label: isPt ? 'Telefone' : 'Phone',
      value: '+244 900 000 000',
      href: 'tel:+244900000000',
    },
    {
      icon: (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
      label: isPt ? 'Localização' : 'Location',
      value: 'Luanda, Angola',
    },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section aria-labelledby="contact-heading" style={{ background: 'var(--green-900)', padding: '5rem 1.5rem 4.5rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto relative">
          <span className="eyebrow" style={{ color: 'var(--green-100)' }}>{t('eyebrow')}</span>
          <h1 id="contact-heading" style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: '0.625rem', maxWidth: '18ch' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', marginTop: '1.25rem', fontSize: '1.125rem', maxWidth: '46ch', lineHeight: 1.75 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Sidebar — contact info */}
          <aside aria-label={t('info_heading')} className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.75rem' }}>
                {t('info_heading')}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {contactItems.map(item => (
                  <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ background: 'var(--green-50)', color: 'var(--green-700)', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: 'var(--gray-500)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {item.label}
                      </p>
                      {item.href
                        ? <a href={item.href} style={{ color: 'var(--gray-900)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ color: 'var(--gray-900)', fontWeight: 600, fontSize: '0.9375rem' }}>{item.value}</p>
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <div
              className="photo-slot rounded-xl"
              style={{ height: 200, flexShrink: 0 }}
              aria-label="Luanda, Angola — localização"
              role="img"
            >
              <div style={{ textAlign: 'center', zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: .5 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.875rem' }}>Luanda, Angola</span>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,.07), 0 8px 24px rgba(0,0,0,.05)' }}>
              <h2 style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.75rem' }}>
                {isPt ? 'Envie-nos uma Mensagem' : 'Send us a Message'}
              </h2>

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" style={{ color: 'var(--gray-700)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                      {t('name')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input id="name" type="text" name="name" required autoComplete="name" style={INP}
                      placeholder={isPt ? 'O seu nome' : 'Your name'}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--green-600)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,.12)'; }}
                      onBlur={e  => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ color: 'var(--gray-700)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                      {t('email')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input id="email" type="email" name="email" required autoComplete="email" style={INP}
                      placeholder="email@exemplo.com"
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--green-600)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,.12)'; }}
                      onBlur={e  => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={{ color: 'var(--gray-700)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                    {t('message')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea id="message" name="message" required rows={6}
                    style={{ ...INP, resize: 'none' }}
                    placeholder={isPt ? 'A sua mensagem...' : 'Your message...'}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--green-600)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,.12)'; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                {status === 'success' && (
                  <div role="alert" style={{ background: 'var(--green-50)', border: '1.5px solid var(--green-100)', borderRadius: 10, padding: '0.875rem 1.125rem', color: 'var(--green-800)', fontWeight: 600, fontSize: '0.9375rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {t('success')}
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '0.875rem 1.125rem', color: '#991B1B', fontWeight: 600, fontSize: '0.9375rem' }}>
                    {t('error')}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn btn-green" style={{ opacity: loading ? .7 : 1, alignSelf: 'flex-start' }}>
                  {loading
                    ? (isPt ? 'A enviar…' : 'Sending…')
                    : (
                      <>
                        {t('send')}
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </>
                    )
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
