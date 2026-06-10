import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

export default async function InfoPage() {
  const locale   = await getLocale();
  const t        = await getTranslations('info');
  const isPt     = locale === 'pt';
  const services = pagesData.home.services;
  const content  = isPt ? pagesData.info.content_pt : pagesData.info.content_en;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section aria-labelledby="info-heading" style={{ background: 'var(--green-900)', padding: '5rem 1.5rem 4.5rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto relative">
          <span className="eyebrow" style={{ color: 'var(--green-100)' }}>{t('eyebrow')}</span>
          <h1 id="info-heading" style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: '0.625rem', maxWidth: '22ch' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', marginTop: '1.25rem', fontSize: '1.125rem', maxWidth: '46ch', lineHeight: 1.75 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--gray-200)' }} className="py-16 px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <p style={{ color: 'var(--gray-700)', fontSize: '1.125rem', lineHeight: 1.85 }}>{content}</p>
          </div>
        </Reveal>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" style={{ background: 'var(--gray-50)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="eyebrow">{t('services_eyebrow')}</span>
            <h2 id="services-heading" className="h-section" style={{ marginTop: '0.375rem', marginBottom: '3rem' }}>
              {t('services_title')}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-6">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(Math.min(i + 1, 3)) as 1|2|3}>
                <article style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }} className="flex-col sm:flex-row">
                  {/* Image */}
                  <div className="photo-slot shrink-0" style={{ width: '100%', maxWidth: 280, minHeight: 200 }} aria-hidden="true">
                    <span style={{ fontSize: '3.5rem', zIndex: 1, position: 'relative' }}>{s.icon}</span>
                  </div>
                  {/* Text */}
                  <div style={{ padding: '2.5rem 2.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                    <h3 style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: '1.375rem', marginBottom: '0.75rem' }}>
                      {isPt ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color: 'var(--gray-700)', lineHeight: 1.8, fontSize: '1.0rem', marginBottom: '1.5rem' }}>
                      {isPt ? s.desc_pt : s.desc_en}
                    </p>
                    <Link href={`/${locale}/contact`} className="arrow-link">
                      {isPt ? 'Entrar em contacto' : 'Get in touch'}
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--yellow)', padding: '3.5rem 1.5rem' }}>
        <Reveal>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <p style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: 'clamp(1.125rem,2.5vw,1.5rem)', lineHeight: 1.3 }}>
              {isPt ? 'Tem alguma questão sobre os nossos serviços?' : 'Have a question about our services?'}
            </p>
            <Link href={`/${locale}/contact`} className="btn shrink-0" style={{ background: 'var(--gray-900)', color: '#fff', borderColor: 'var(--gray-900)' }}>
              {isPt ? 'Fale Connosco' : 'Contact Us'}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
