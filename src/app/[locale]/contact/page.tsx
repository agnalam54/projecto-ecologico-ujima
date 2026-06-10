'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  const contactItems = [
    { icon: '📧', label: 'Email', value: 'projecto.ujima@gmail.com' },
    { icon: '📞', label: locale === 'pt' ? 'Telefone' : 'Phone', value: '+244 900 000 000' },
    { icon: '📍', label: locale === 'pt' ? 'Localização' : 'Location', value: 'Luanda, Angola' },
  ];

  return (
    <div>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--ujima-dark)' }} className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 img-placeholder opacity-20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(19,31,20,0.95), rgba(19,31,20,0.85))' }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="section-label mb-5">{locale === 'pt' ? 'Fale Connosco' : 'Reach Out'}</div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-5xl md:text-6xl font-black mb-5 leading-tight">{t('title')}</h1>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="md:col-span-2">
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-2xl font-black mb-8">
              {locale === 'pt' ? 'Informação de Contacto' : 'Contact Information'}
            </h2>
            <div className="flex flex-col gap-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)', minWidth: 44, height: 44 }}
                    className="rounded flex items-center justify-center text-xl shrink-0"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p style={{ color: 'var(--ujima-dark)' }} className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="img-placeholder h-48 w-full rounded-lg mt-10 flex items-center justify-center">
              <span style={{ color: 'rgba(249,247,240,0.5)' }} className="text-sm font-semibold relative z-10">
                📍 Luanda, Angola
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-2xl font-black mb-8">
              {locale === 'pt' ? 'Envie-nos uma Mensagem' : 'Send us a Message'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={{ color: 'var(--ujima-gray)' }} className="block text-xs font-bold uppercase tracking-widest mb-2">{t('name')}</label>
                  <input
                    type="text"
                    required
                    style={{ border: '1px solid #d1d5db', borderRadius: 4 }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={locale === 'pt' ? 'O seu nome' : 'Your name'}
                  />
                </div>
                <div>
                  <label style={{ color: 'var(--ujima-gray)' }} className="block text-xs font-bold uppercase tracking-widest mb-2">{t('email')}</label>
                  <input
                    type="email"
                    required
                    style={{ border: '1px solid #d1d5db', borderRadius: 4 }}
                    className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={locale === 'pt' ? 'o.seu@email.com' : 'your@email.com'}
                  />
                </div>
              </div>
              <div>
                <label style={{ color: 'var(--ujima-gray)' }} className="block text-xs font-bold uppercase tracking-widest mb-2">{t('message')}</label>
                <textarea
                  required
                  rows={6}
                  style={{ border: '1px solid #d1d5db', borderRadius: 4 }}
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  placeholder={locale === 'pt' ? 'A sua mensagem...' : 'Your message...'}
                />
              </div>

              {status === 'success' && (
                <div style={{ backgroundColor: '#d1fae5', borderLeft: '4px solid var(--ujima-green)' }} className="p-4 rounded text-sm font-semibold text-green-800">
                  ✓ {t('success')}
                </div>
              )}
              {status === 'error' && (
                <div style={{ backgroundColor: '#fee2e2', borderLeft: '4px solid #ef4444' }} className="p-4 rounded text-sm font-semibold text-red-800">
                  {t('error')}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary self-start"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? '...' : `${t('send')} →`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
