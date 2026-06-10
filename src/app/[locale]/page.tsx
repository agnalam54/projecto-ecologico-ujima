import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/AnimateOnScroll';
import pagesData  from '../../../content/pages.json';
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
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        aria-label={isPt ? 'Secção principal' : 'Hero section'}
        style={{ background: 'var(--green-900)', minHeight: '88vh', position: 'relative', overflow: 'hidden' }}
        className="flex flex-col justify-center px-6 py-24"
      >
        {/* Decorative blur orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '-15%', right: '-5%', width: 580, height: 580, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-8%', left: '2%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow eyebrow-light" style={{ color: 'var(--green-100)' }}>
              {isPt ? 'Iniciativa Comunitária · Angola' : 'Community Initiative · Angola'}
            </span>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
              {t('hero_title')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,.68)', fontSize: '1.125rem', lineHeight: 1.75, maxWidth: '40ch', marginBottom: '2.5rem' }}>
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/info`} className="btn btn-green" style={{ background: 'var(--green-600)', borderColor: 'var(--green-600)' }}>
                {t('hero_cta')}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn-outline-white">
                {t('hero_cta2')}
              </Link>
            </div>
          </div>

          {/* Hero image slot */}
          <div className="hidden lg:block">
            <div className="photo-slot rounded-2xl" style={{ height: 440 }} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ opacity: .3 }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section aria-label={isPt ? 'Estatísticas' : 'Statistics'} style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
        <dl className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '3+',  label: t('stats_projects')    },
            { num: '100+',label: t('stats_volunteers')  },
            { num: '5+',  label: t('stats_communities') },
            { num: '2+',  label: t('stats_years')       },
          ].map(s => (
            <div key={s.label} className="text-center">
              <dt style={{ color: 'var(--green-700)', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</dt>
              <dd style={{ color: 'var(--gray-500)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="py-24 px-6" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <span className="eyebrow">{t('services_eyebrow')}</span>
                <h2 id="services-heading" className="h-section" style={{ marginTop: '0.375rem' }}>
                  {t('services_title')}
                </h2>
              </div>
              <Link href={`/${locale}/info`} className="arrow-link shrink-0">
                {t('services_more')}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(Math.min(i + 1, 3)) as 1|2|3}>
                <article className="service-card">
                  <div className="photo-slot rounded-xl mb-5" style={{ height: 220 }} aria-hidden="true">
                    <span style={{ fontSize: '3rem', zIndex: 1, position: 'relative' }}>{s.icon}</span>
                  </div>
                  <h3 style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {isPt ? s.title_pt : s.title_en}
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1rem', flex: 1 }}>
                    {isPt ? s.desc_pt : s.desc_en}
                  </p>
                  <Link href={`/${locale}/info`} className="arrow-link" style={{ fontSize: '0.875rem' }}>
                    {isPt ? 'Saber mais' : 'Learn more'}
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION TEASER ────────────────────────────────────────── */}
      <section aria-labelledby="mission-heading" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="eyebrow">{t('mission_eyebrow')}</span>
            <h2 id="mission-heading" className="h-section" style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              {t('mission_title')}
            </h2>
            <p style={{ color: 'var(--gray-700)', lineHeight: 1.8, fontSize: '1.0625rem', marginBottom: '2rem', maxWidth: '48ch' }}>
              {t('mission_body')}
            </p>
            <Link href={`/${locale}/about`} className="btn btn-outline-green">
              {t('mission_cta')}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </Reveal>
          <Reveal delay={2}>
            <div className="photo-slot rounded-2xl" style={{ height: 380 }} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ opacity: .3 }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EVENTS ────────────────────────────────────────────────── */}
      <section aria-labelledby="events-heading" style={{ background: '#fff' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow">{t('events_eyebrow')}</span>
                <h2 id="events-heading" className="h-section" style={{ marginTop: '0.375rem' }}>
                  {t('events_title')}
                </h2>
              </div>
              <Link href={`/${locale}/contact`} className="arrow-link shrink-0">
                {t('events_more')}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </Reveal>

          {events.length === 0
            ? <p style={{ color: 'var(--gray-500)' }}>{t('no_events')}</p>
            : (
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-label={isPt ? 'Lista de eventos' : 'Events list'}>
                {events.map((ev, i) => (
                  <Reveal key={ev.id} delay={(Math.min(i + 1, 3)) as 1|2|3}>
                    <li>
                      <div className="event-row">
                        <div aria-label={`${isPt ? 'Data' : 'Date'}: ${ev.date}`}
                          style={{ background: 'var(--green-800)', color: '#fff', borderRadius: 10, minWidth: 58, textAlign: 'center', padding: '0.625rem 0.375rem', flexShrink: 0 }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{ev.date.split('-')[2]}</div>
                          <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .8, marginTop: 2 }}>
                            {new Date(ev.date + 'T12:00:00').toLocaleString(isPt ? 'pt' : 'en', { month: 'short' })}
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: 'var(--gray-500)', fontSize: '0.75rem', fontWeight: 700, marginBottom: 3, letterSpacing: '.04em' }}>
                            {ev.time && `${ev.time} · `}{isPt ? ev.location_pt : ev.location_en}
                          </p>
                          <p style={{ color: 'var(--gray-900)', fontWeight: 700, fontSize: '1.0625rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isPt ? ev.title_pt : ev.title_en}
                          </p>
                          <p style={{ color: 'var(--gray-700)', fontSize: '0.875rem', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isPt ? ev.desc_pt : ev.desc_en}
                          </p>
                        </div>
                        <svg aria-hidden="true" className="event-arrow hidden md:block" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--green-700)', flexShrink: 0 }}>
                          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            )}
        </div>
      </section>

      {/* ── NEWS ──────────────────────────────────────────────────── */}
      <section aria-labelledby="news-heading" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="eyebrow">{t('news_eyebrow')}</span>
                <h2 id="news-heading" className="h-section" style={{ marginTop: '0.375rem' }}>
                  {t('news_title')}
                </h2>
              </div>
              <Link href={`/${locale}/contact`} className="arrow-link shrink-0">
                {t('news_more')}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </Reveal>

          {news.length === 0
            ? <p style={{ color: 'var(--gray-500)' }}>{t('no_news')}</p>
            : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, i) => (
                  <Reveal key={item.id} delay={(Math.min(i + 1, 3)) as 1|2|3} className={i === 0 ? 'md:col-span-2' : ''}>
                    <article style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div className="photo-slot" style={{ height: i === 0 ? 260 : 180 }} aria-hidden="true">
                        {item.image && <img src={item.image} alt="" />}
                        {!item.image && (
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ opacity: .3 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                          </svg>
                        )}
                      </div>
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <time dateTime={item.date} style={{ color: 'var(--green-700)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                          {new Date(item.date + 'T12:00:00').toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                        <h3 style={{ color: 'var(--gray-900)', fontWeight: 800, fontSize: i === 0 ? '1.25rem' : '1rem', lineHeight: 1.3, margin: '0.5rem 0 0.75rem', flex: 1 }}>
                          {isPt ? item.title_pt : item.title_en}
                        </h3>
                        <p style={{ color: 'var(--gray-700)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                          {isPt ? item.summary_pt : item.summary_en}
                        </p>
                        <span className="arrow-link" style={{ fontSize: '0.875rem' }}>
                          {t('read_more')}
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" style={{ background: 'var(--green-800)' }} className="py-20 px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow" style={{ color: 'var(--green-100)' }}>{isPt ? 'Faça parte' : 'Get involved'}</span>
            <h2 id="cta-heading" className="h-section h-section-light" style={{ marginTop: '0.625rem', marginBottom: '1rem' }}>
              {t('cta_title')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2.25rem' }}>
              {t('cta_body')}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-outline-white">
              {t('cta_btn')}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
