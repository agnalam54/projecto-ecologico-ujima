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

  return (
    <div>
      {/* Header */}
      <section
        style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
        className="py-20 px-4 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p style={{ color: 'var(--ujima-yellow-light)' }} className="text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-16">
        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: '📧', label: 'Email', value: 'projecto.ujima@gmail.com' },
            { icon: '📍', label: locale === 'pt' ? 'Endereço' : 'Address', value: 'Luanda, Angola' }
          ].map((item) => (
            <div
              key={item.label}
              style={{ backgroundColor: '#fff', border: '1px solid var(--ujima-green-light)' }}
              className="rounded-2xl p-5 flex items-center gap-4 shadow-sm"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-bold uppercase tracking-wider">{item.label}</p>
                <p style={{ color: 'var(--ujima-dark)' }} className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          style={{ backgroundColor: '#fff', border: '1px solid var(--ujima-green-light)' }}
          className="rounded-2xl p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={{ color: 'var(--ujima-dark)' }} className="block text-sm font-semibold mb-1">
                {t('name')}
              </label>
              <input
                type="text"
                required
                style={{ border: '1px solid var(--ujima-green-light)' }}
                className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label style={{ color: 'var(--ujima-dark)' }} className="block text-sm font-semibold mb-1">
                {t('email')}
              </label>
              <input
                type="email"
                required
                style={{ border: '1px solid var(--ujima-green-light)' }}
                className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label style={{ color: 'var(--ujima-dark)' }} className="block text-sm font-semibold mb-1">
                {t('message')}
              </label>
              <textarea
                required
                rows={5}
                style={{ border: '1px solid var(--ujima-green-light)' }}
                className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            {status === 'success' && (
              <p style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold">{t('success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm font-semibold">{t('error')}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
              className="py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? '...' : t('send')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
