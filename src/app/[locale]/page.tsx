import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Anim from '@/components/AnimateOnScroll';
import pagesData from '../../../content/pages.json';
import newsData   from '../../../content/news.json';
import eventsData from '../../../content/events.json';

export default async function HomePage() {
  const locale   = await getLocale();
  const t        = await getTranslations('home');
  const services = pagesData.home.services;
  const news     = newsData.slice(0, 3);
  const events   = eventsData.slice(0, 3);
  const isPt     = locale === 'pt';

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        aria-label={isPt ? 'Secção principal' : 'Hero section'}
        style={{ background: 'linear-gradient(160deg, var(--g-900) 0%, var(--g-800) 100%)', minHeight: '92vh' }}
        className="relative flex flex-col justify-center px-6 py-24 overflow-hidden"
      >
        {/* Decorative circle — purely visual */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <span aria-hidden="true" className="eyebrow on-dark">
              🌿 {isPt ? 'Iniciativa Comunitária · Angola' : 'Community Initiative · Angola'}
            </span>

            <h1
              style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em' }}
              className="mt-3 mb-6"
            >
              {t('hero_title')}
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.125rem', lineHeight: 1.75, maxWidth: '38ch' }} className="mb-10">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/info`} className="btn btn-yellow">
                {t('hero_cta')}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn-outline">
                {isPt ? 'Contacte-nos' : 'Get in touch'}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          aria-label={isPt ? 'Estatísticas' : 'Statistics'}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="px-6 py-5"
        >
          <dl className="max-w-7xl mx-auto grid grid-cols-3 gap-4 text-center">
            {[
              { num: '3+',   label: isPt ? 'Serviços Activos' : 'Active Services' },
              { num: '100+', label: isPt ? 'Voluntários'      : 'Volunteers'      },
              { num: '2024', label: isPt ? 'Fundado em'       : 'Founded in'      },
            ].map(s => (
              <div key={s.label}>
                <dt style={{ color: 'var(--y-400)', fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 900, lineHeight: 1 }}>{s.num}</dt>
                <dd style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="py-24 px-6" style={{ background: 'var(--s-white)' }}>
        <div className="max-w-7xl mx-auto">
          <Anim>
            <span className="eyebrow">{isPt ? 'O que fazemos' : 'What we do'}</span>
            <h2 id="services-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: '18ch', marginTop: '0.25rem', marginBottom: '3rem' }}>
              {t('services_title')}
            </h2>
          </Anim>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Anim key={s.id} delay={(i + 1) as 1|2|3}>
                <article className="card h-full flex flex-col overflow-hidden">
                  {/* Placeholder image */}
                  <div className="img-ph h-44 w-full" aria-hidden="true">
                    <span style={{ fontSize: '3rem' }}>{s.icon}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                      {isPt ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color: 'var(--t-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, flex: 1 }}>
                      {isPt ? s.desc_pt : s.desc_en}
                    </p>
                    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--s-border)' }}>
                      <Link
                        href={`/${locale}/info`}
                        style={{ color: 'var(--g-700)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: 3 }}
                      >
                        {isPt ? 'Saber mais' : 'Learn more'} →
                      </Link>
                    </div>
                  </div>
                </article>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION TEASER ─────────────────────────────────────── */}
      <section aria-labelledby="mission-heading" style={{ background: 'var(--g-50)', borderTop: '1px solid var(--s-border)', borderBottom: '1px solid var(--s-border)' }} className="py-20 px-6">
        <Anim>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="eyebrow">{isPt ? 'A nossa missão' : 'Our mission'}</span>
              <h2 id="mission-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, lineHeight: 1.15, marginTop: '0.25rem', marginBottom: '1rem' }}>
                {isPt ? 'UJIMA — trabalho colectivo e responsabilidade partilhada'
                       : 'UJIMA — collective work and shared responsibility'}
              </h2>
              <p style={{ color: 'var(--t-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '50ch' }}>
                {isPt ? 'Nascemos da necessidade de proteger o ambiente angolano para as gerações futuras, unindo comunidades em torno de um propósito comum.'
                       : 'We were born from the need to protect the Angolan environment for future generations, uniting communities around a common purpose.'}
              </p>
              <Link href={`/${locale}/about`} className="btn btn-yellow">
                {isPt ? 'Sobre nós' : 'About us'} →
              </Link>
            </div>
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="img-ph rounded-xl h-56 w-full" aria-hidden="true">
                <span style={{ fontSize: '4rem' }}>🌿</span>
              </div>
            </div>
          </div>
        </Anim>
      </section>

      {/* ── EVENTS ─────────────────────────────────────────────── */}
      <section aria-labelledby="events-heading" style={{ background: 'var(--s-white)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Anim>
            <span className="eyebrow">{isPt ? 'Agenda' : 'Agenda'}</span>
            <h2 id="events-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.25rem', marginBottom: '2.5rem' }}>
              {t('events_title')}
            </h2>
          </Anim>

          {events.length === 0
            ? <p style={{ color: 'var(--t-muted)' }}>{t('no_events')}</p>
            : (
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--s-border)', border: '1px solid var(--s-border)', borderRadius: 12, overflow: 'hidden' }}>
                {events.map((ev) => (
                  <li key={ev.id} style={{ background: 'var(--s-white)' }} className="group">
                    <div className="event-row" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'var(--s-white)' }}>
                      {/* Date badge */}
                      <div
                        aria-label={`${isPt ? 'Data' : 'Date'}: ${ev.date}`}
                        style={{ background: 'var(--g-800)', color: '#fff', borderRadius: 8, minWidth: 56, textAlign: 'center', padding: '0.5rem 0.25rem', flexShrink: 0 }}
                      >
                        <div style={{ fontSize: '1.375rem', fontWeight: 900, lineHeight: 1 }}>{ev.date.split('-')[2]}</div>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8, marginTop: 2 }}>
                          {new Date(ev.date + 'T12:00:00').toLocaleString(isPt ? 'pt' : 'en', { month: 'short' })}
                        </div>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: 'var(--t-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: 2 }}>
                          {ev.time && `${ev.time} · `}{isPt ? ev.location_pt : ev.location_en}
                        </p>
                        <p style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {isPt ? ev.title_pt : ev.title_en}
                        </p>
                        <p style={{ color: 'var(--t-secondary)', fontSize: '0.875rem', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {isPt ? ev.desc_pt : ev.desc_en}
                        </p>
                      </div>

                      <svg aria-hidden="true" style={{ color: 'var(--g-500)', flexShrink: 0 }} className="event-arrow hidden md:block" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </li>
                ))}
              </ol>
            )}
        </div>
      </section>

      {/* ── NEWS ───────────────────────────────────────────────── */}
      <section aria-labelledby="news-heading" style={{ background: 'var(--s-subtle)', borderTop: '1px solid var(--s-border)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Anim>
            <span className="eyebrow">{isPt ? 'Notícias' : 'News'}</span>
            <h2 id="news-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.25rem', marginBottom: '2.5rem' }}>
              {t('news_title')}
            </h2>
          </Anim>

          {news.length === 0
            ? <p style={{ color: 'var(--t-muted)' }}>{t('no_news')}</p>
            : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, i) => (
                  <Anim key={item.id} delay={(Math.min(i + 1, 3)) as 1|2|3}>
                    <article className={`card overflow-hidden h-full flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}>
                      {/* Image */}
                      <div className={`img-ph ${i === 0 ? 'h-56' : 'h-36'} w-full shrink-0`} aria-hidden="true">
                        {item.image && <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ position: 'absolute' }} />}
                        {!item.image && <span style={{ fontSize: '2rem' }}>📰</span>}
                      </div>
                      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <time dateTime={item.date} style={{ color: 'var(--g-700)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                          {item.date}
                        </time>
                        <h3 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: i === 0 ? '1.25rem' : '1rem', lineHeight: 1.3, margin: '0.4rem 0 0.5rem', flex: 1 }}>
                          {isPt ? item.title_pt : item.title_en}
                        </h3>
                        <p style={{ color: 'var(--t-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                          {isPt ? item.summary_pt : item.summary_en}
                        </p>
                      </div>
                    </article>
                  </Anim>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" style={{ background: 'var(--g-800)' }} className="py-20 px-6 on-dark">
        <Anim>
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">{isPt ? 'Faça parte' : 'Get involved'}</span>
            <h2 id="cta-heading" style={{ color: '#fff', fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, lineHeight: 1.15, marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              {isPt ? 'Juntos construímos um futuro mais verde' : 'Together we build a greener future'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', lineHeight: 1.7 }}>
              {isPt ? 'Contacte-nos para saber como pode participar nas nossas iniciativas ambientais.'
                     : 'Contact us to learn how you can participate in our environmental initiatives.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-yellow">
              {isPt ? 'Contacte-nos' : 'Contact us'}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Anim>
      </section>
    </>
  );
}
