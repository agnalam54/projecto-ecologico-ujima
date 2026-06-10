'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t    = useTranslations('contact');
  const locale = useLocale();
  const isPt = locale === 'pt';
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

  const contactInfo = [
    { icon: '✉️', label: 'Email',                             value: 'projecto.ujima@gmail.com'  },
    { icon: '📞', label: isPt ? 'Telefone' : 'Phone',         value: '+244 900 000 000'          },
    { icon: '📍', label: isPt ? 'Localização' : 'Location',   value: 'Luanda, Angola'            },
  ];

  const inp = {
    width: '100%',
    border: '1px solid var(--s-border)',
    borderRadius: 8,
    padding: '0.75rem 1rem',
    fontSize: '0.9375rem',
    color: 'var(--t-primary)',
    background: 'var(--s-white)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  } as React.CSSProperties;

  return (
    <>
      {/* Header */}
      <section aria-labelledby="contact-heading" style={{ background: 'linear-gradient(160deg, var(--g-900), var(--g-800))', padding: '5rem 1.5rem 4rem' }} className="on-dark">
        <div className="max-w-7xl mx-auto">
          <span className="eyebrow">{isPt ? 'Fale connosco' : 'Reach out'}</span>
          <h1 id="contact-heading" style={{ color: '#fff', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.5rem' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '1rem', fontSize: '1.125rem', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--s-white)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">

          {/* Left — info */}
          <aside aria-label={isPt ? 'Informações de contacto' : 'Contact information'} className="md:col-span-2">
            <h2 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.75rem' }}>
              {isPt ? 'Informação de Contacto' : 'Contact Information'}
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {contactInfo.map(item => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <span
                    aria-hidden="true"
                    style={{ background: 'var(--g-50)', border: '1px solid var(--s-border)', borderRadius: 8, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', flexShrink: 0 }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p style={{ color: 'var(--t-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                      {item.label}
                    </p>
                    <p style={{ color: 'var(--t-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map placeholder */}
            <div
              className="img-ph rounded-xl mt-10"
              style={{ height: 180 }}
              aria-label="Luanda, Angola — localização no mapa"
              role="img"
            >
              <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                <div style={{ fontSize: '2rem', marginBottom: 6 }}>📍</div>
                <p style={{ color: 'var(--g-700)', fontWeight: 600, fontSize: '0.875rem' }}>Luanda, Angola</p>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <div className="md:col-span-3">
            <h2 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.75rem' }}>
              {isPt ? 'Envie-nos uma Mensagem' : 'Send us a Message'}
            </h2>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" style={{ color: 'var(--t-secondary)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                    {t('name')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input id="name" type="text" required style={inp}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--g-500)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = 'var(--s-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder={isPt ? 'O seu nome' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ color: 'var(--t-secondary)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                    {t('email')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input id="email" type="email" required style={inp}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--g-500)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = 'var(--s-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" style={{ color: 'var(--t-secondary)', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                  {t('message')} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea id="message" required rows={6}
                  style={{ ...inp, resize: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--g-500)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; }}
                  onBlur={e  => { e.currentTarget.style.borderColor = 'var(--s-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  placeholder={isPt ? 'A sua mensagem...' : 'Your message...'}
                />
              </div>

              {status === 'success' && (
                <div role="alert" style={{ background: 'var(--g-50)', border: '1px solid var(--g-200)', borderRadius: 8, padding: '0.875rem 1rem', color: 'var(--g-700)', fontWeight: 600, fontSize: '0.9375rem' }}>
                  ✓ {t('success')}
                </div>
              )}
              {status === 'error' && (
                <div role="alert" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '0.875rem 1rem', color: '#991B1B', fontWeight: 600, fontSize: '0.9375rem' }}>
                  {t('error')}
                </div>
              )}

              <div>
                <button type="submit" disabled={loading} className="btn btn-yellow" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? (isPt ? 'A enviar…' : 'Sending…') : `${t('send')} →`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
