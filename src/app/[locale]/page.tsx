import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/AnimateOnScroll';
import pagesData  from '../../../content/pages.json';
import newsData   from '../../../content/news.json';
import eventsData from '../../../content/events.json';

/* ── Shared style objects ──────────────────────────────────── */
const S = {
  eyebrow: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#15803D', marginBottom:'.5rem' },
  eyebrowLight: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#DCFCE7', marginBottom:'.5rem' },
  h1Hero: { color:'#ffffff', fontSize:'clamp(2.75rem,6.5vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginTop:'0.5rem', marginBottom:'1.5rem' },
  hSection: { fontSize:'clamp(1.75rem,4vw,2.75rem)', fontWeight:900, lineHeight:1.1, letterSpacing:'-.02em', color:'#111827' },
  btnGreen: { display:'inline-flex', alignItems:'center', gap:'.5rem', background:'#15803D', color:'#ffffff', border:'2px solid #15803D', borderRadius:100, padding:'.75rem 1.75rem', fontWeight:700, fontSize:'.9375rem', textDecoration:'none', whiteSpace:'nowrap' as const, cursor:'pointer' },
  btnOutlineWhite: { display:'inline-flex', alignItems:'center', gap:'.5rem', background:'transparent', color:'#ffffff', border:'2px solid rgba(255,255,255,.75)', borderRadius:100, padding:'.75rem 1.75rem', fontWeight:700, fontSize:'.9375rem', textDecoration:'none', whiteSpace:'nowrap' as const, cursor:'pointer' },
  btnOutlineGreen: { display:'inline-flex', alignItems:'center', gap:'.5rem', background:'transparent', color:'#15803D', border:'2px solid #15803D', borderRadius:100, padding:'.75rem 1.75rem', fontWeight:700, fontSize:'.9375rem', textDecoration:'none', whiteSpace:'nowrap' as const, cursor:'pointer' },
  arrowLink: { display:'inline-flex', alignItems:'center', gap:'.375rem', color:'#15803D', fontWeight:600, fontSize:'.9375rem', textDecoration:'none' },
  photoSlot: { background:'#EBF5EC', border:'2px dashed #A7D7AC', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:'.625rem', color:'#4B8454', fontSize:'.8125rem', fontWeight:600, position:'relative' as const, overflow:'hidden' as const },
};

const ARROW = (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IMG_ICON = (
  <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4B8454" strokeWidth="1.5" style={{ opacity:.55 }}>
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
  </svg>
);

export default async function HomePage() {
  const locale   = await getLocale();
  const t        = await getTranslations('home');
  const services = pagesData.home.services;
  const news     = newsData.slice(0, 3);
  const events   = eventsData.slice(0, 3);
  const isPt     = locale === 'pt';

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        aria-label={isPt ? 'Secção principal' : 'Hero section'}
        style={{ background:'#052E16', minHeight:'88vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'5rem 1.5rem', position:'relative', overflow:'hidden' }}
      >
        <div aria-hidden="true" style={{ position:'absolute', top:'-15%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(22,163,74,.2) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div aria-hidden="true" style={{ position:'absolute', bottom:'-8%', left:'2%', width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(234,179,8,.12) 0%,transparent 65%)', pointerEvents:'none' }} />

        <div className="relative max-w-7xl mx-auto w-full" style={{ display:'grid', gridTemplateColumns:'1fr', gap:'4rem', alignItems:'center' }}>
          <div>
            <span style={S.eyebrowLight}>{isPt ? 'Iniciativa Comunitária · Angola' : 'Community Initiative · Angola'}</span>
            <h1 style={S.h1Hero}>{t('hero_title')}</h1>
            <p style={{ color:'rgba(255,255,255,.75)', fontSize:'1.125rem', lineHeight:1.75, maxWidth:'42ch', marginBottom:'2.5rem' }}>
              {t('hero_subtitle')}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
              <Link href={`/${locale}/info`} style={S.btnGreen}>{t('hero_cta')} {ARROW}</Link>
              <Link href={`/${locale}/contact`} style={S.btnOutlineWhite}>{t('hero_cta2')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section aria-label={isPt ? 'Estatísticas' : 'Statistics'} style={{ background:'#F9FAFB', borderBottom:'1px solid #E5E7EB' }}>
        <dl className="max-w-7xl mx-auto px-6 py-10" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2rem' }}>
          {[
            { num:'3+',  label: t('stats_projects')    },
            { num:'100+',label: t('stats_volunteers')  },
            { num:'5+',  label: t('stats_communities') },
            { num:'2+',  label: t('stats_years')       },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <dt style={{ color:'#15803D', fontSize:'clamp(1.75rem,4vw,2.5rem)', fontWeight:900, lineHeight:1, letterSpacing:'-0.02em' }}>{s.num}</dt>
              <dd style={{ color:'#6B7280', fontSize:'0.75rem', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginTop:6 }}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="py-24 px-6" style={{ background:'#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', marginBottom:'3.5rem' }}>
              <div>
                <span style={S.eyebrow}>{t('services_eyebrow')}</span>
                <h2 id="services-heading" style={S.hSection}>{t('services_title')}</h2>
              </div>
              <Link href={`/${locale}/info`} style={S.arrowLink}>{t('services_more')} {ARROW}</Link>
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'2rem' }}>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(Math.min(i+1,3)) as 1|2|3}>
                <article style={{ display:'flex', flexDirection:'column', transition:'transform .25s ease' }}>
                  <div style={{ ...S.photoSlot, borderRadius:12, height:220, marginBottom:'1.25rem' }}>
                    {IMG_ICON}
                    <span>{isPt ? 'Foto em breve' : 'Coming soon'}</span>
                  </div>
                  <h3 style={{ color:'#111827', fontWeight:800, fontSize:'1.125rem', marginBottom:'0.5rem' }}>
                    {isPt ? s.title_pt : s.title_en}
                  </h3>
                  <p style={{ color:'#374151', fontSize:'0.9375rem', lineHeight:1.7, marginBottom:'1rem', flex:1 }}>
                    {isPt ? s.desc_pt : s.desc_en}
                  </p>
                  <Link href={`/${locale}/info`} style={{ ...S.arrowLink, fontSize:'0.875rem' }}>
                    {isPt ? 'Saber mais' : 'Learn more'} {ARROW}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION TEASER ──────────────────────────────────── */}
      <section aria-labelledby="mission-heading" style={{ background:'#F9FAFB', borderTop:'1px solid #E5E7EB', borderBottom:'1px solid #E5E7EB' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'center' }}>
          <Reveal>
            <span style={S.eyebrow}>{t('mission_eyebrow')}</span>
            <h2 id="mission-heading" style={{ ...S.hSection, marginBottom:'1.25rem' }}>{t('mission_title')}</h2>
            <p style={{ color:'#374151', lineHeight:1.8, fontSize:'1.0625rem', marginBottom:'2rem', maxWidth:'48ch' }}>
              {t('mission_body')}
            </p>
            <Link href={`/${locale}/about`} style={S.btnOutlineGreen}>{t('mission_cta')} {ARROW}</Link>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ ...S.photoSlot, borderRadius:16, height:380 }}>
              {IMG_ICON}<span>{isPt ? 'Foto em breve' : 'Coming soon'}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EVENTS ──────────────────────────────────────────── */}
      <section aria-labelledby="events-heading" style={{ background:'#ffffff' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', marginBottom:'2.5rem' }}>
              <div>
                <span style={S.eyebrow}>{t('events_eyebrow')}</span>
                <h2 id="events-heading" style={S.hSection}>{t('events_title')}</h2>
              </div>
              <Link href={`/${locale}/contact`} style={S.arrowLink}>{t('events_more')} {ARROW}</Link>
            </div>
          </Reveal>

          {events.length === 0
            ? <p style={{ color:'#6B7280' }}>{t('no_events')}</p>
            : (
              <ol style={{ listStyle:'none', padding:0, margin:0 }}>
                {events.map((ev, i) => (
                  <Reveal key={ev.id} delay={(Math.min(i+1,3)) as 1|2|3}>
                    <li style={{ borderBottom:'1px solid #E5E7EB' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1.25rem .75rem' }}>
                        {/* Date badge */}
                        <div aria-label={`${isPt ? 'Data' : 'Date'}: ${ev.date}`}
                          style={{ background:'#14532D', color:'#ffffff', borderRadius:10, minWidth:60, width:60, textAlign:'center', padding:'.625rem .375rem', flexShrink:0 }}>
                          <div style={{ fontSize:'1.5rem', fontWeight:900, lineHeight:1 }}>{ev.date.split('-')[2]}</div>
                          <div style={{ fontSize:'.625rem', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', opacity:.85, marginTop:2 }}>
                            {new Date(ev.date+'T12:00:00').toLocaleString(isPt ? 'pt' : 'en', { month:'short' })}
                          </div>
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ color:'#6B7280', fontSize:'.75rem', fontWeight:700, marginBottom:3, letterSpacing:'.04em' }}>
                            {ev.time && `${ev.time} · `}{isPt ? ev.location_pt : ev.location_en}
                          </p>
                          <p style={{ color:'#111827', fontWeight:700, fontSize:'1.0625rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {isPt ? ev.title_pt : ev.title_en}
                          </p>
                          <p style={{ color:'#374151', fontSize:'.875rem', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {isPt ? ev.desc_pt : ev.desc_en}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            )}
        </div>
      </section>

      {/* ── NEWS ────────────────────────────────────────────── */}
      <section aria-labelledby="news-heading" style={{ background:'#F9FAFB', borderTop:'1px solid #E5E7EB' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', marginBottom:'3rem' }}>
              <div>
                <span style={S.eyebrow}>{t('news_eyebrow')}</span>
                <h2 id="news-heading" style={S.hSection}>{t('news_title')}</h2>
              </div>
              <Link href={`/${locale}/contact`} style={S.arrowLink}>{t('news_more')} {ARROW}</Link>
            </div>
          </Reveal>

          {news.length === 0
            ? <p style={{ color:'#6B7280' }}>{t('no_news')}</p>
            : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem' }}>
                {news.map((item, i) => (
                  <Reveal key={item.id} delay={(Math.min(i+1,3)) as 1|2|3}>
                    <article style={{ background:'#ffffff', borderRadius:16, overflow:'hidden', display:'flex', flexDirection:'column', border:'1px solid #E5E7EB' }}>
                      <div style={{ ...S.photoSlot, height: i === 0 ? 240 : 180 }}>
                        {item.image ? <img src={item.image} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} /> : <>{IMG_ICON}<span>{isPt ? 'Foto em breve' : 'Coming soon'}</span></>}
                      </div>
                      <div style={{ padding:'1.5rem', flex:1, display:'flex', flexDirection:'column' }}>
                        <time dateTime={item.date} style={{ color:'#15803D', fontSize:'.75rem', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' }}>
                          {new Date(item.date+'T12:00:00').toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', { day:'numeric', month:'long', year:'numeric' })}
                        </time>
                        <h3 style={{ color:'#111827', fontWeight:800, fontSize: i === 0 ? '1.25rem' : '1rem', lineHeight:1.3, margin:'.5rem 0 .75rem', flex:1 }}>
                          {isPt ? item.title_pt : item.title_en}
                        </h3>
                        <p style={{ color:'#374151', fontSize:'.9rem', lineHeight:1.65, marginBottom:'1rem' }}>
                          {isPt ? item.summary_pt : item.summary_en}
                        </p>
                        <span style={S.arrowLink}>{t('read_more')} {ARROW}</span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" style={{ background:'#14532D' }} className="py-20 px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto" style={{ textAlign:'center' }}>
            <span style={S.eyebrowLight}>{isPt ? 'Faça parte' : 'Get involved'}</span>
            <h2 id="cta-heading" style={{ ...S.hSection, color:'#ffffff', marginTop:'.625rem', marginBottom:'1rem' }}>{t('cta_title')}</h2>
            <p style={{ color:'rgba(255,255,255,.7)', fontSize:'1.0625rem', lineHeight:1.7, marginBottom:'2.25rem' }}>{t('cta_body')}</p>
            <Link href={`/${locale}/contact`} style={S.btnOutlineWhite}>{t('cta_btn')} {ARROW}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
