import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import pagesData from '../../../content/pages.json';
import newsData from '../../../content/news.json';
import eventsData from '../../../content/events.json';

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const services = pagesData.home.services;
  const news = newsData.slice(0, 3);
  const events = eventsData.slice(0, 3);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background */}
        {pagesData.home.hero_image ? (
          <img src={pagesData.home.hero_image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 img-placeholder" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(19,31,20,0.95) 0%, rgba(19,31,20,0.5) 50%, rgba(19,31,20,0.2) 100%)' }} />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 1px, transparent 120px, rgba(255,255,255,0.1) 121px)', backgroundSize: '120px 100%' }} />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="section-label mb-5">🌿 {locale === 'pt' ? 'Iniciativa Comunitária · Angola' : 'Community Initiative · Angola'}</div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-5xl md:text-7xl font-black leading-none mb-6 max-w-3xl">
            {t('hero_title')}
          </h1>
          <p style={{ color: 'rgba(249,247,240,0.75)' }} className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/info`} className="btn-primary">
              {t('hero_cta')} →
            </Link>
            <Link href={`/${locale}/contact`} className="btn-outline">
              {locale === 'pt' ? 'Contacte-nos' : 'Get in touch'}
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-yellow-400">
            {[
              { num: '3+', label: locale === 'pt' ? 'Serviços Activos' : 'Active Services' },
              { num: '100+', label: locale === 'pt' ? 'Voluntários' : 'Volunteers' },
              { num: '2024', label: locale === 'pt' ? 'Fundado em' : 'Founded in' },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="text-2xl md:text-3xl font-black">{s.num}</div>
                <div className="text-xs font-semibold uppercase tracking-widest mt-0.5 opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="section-label mb-4">{locale === 'pt' ? 'O Que Fazemos' : 'What We Do'}</div>
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-4xl md:text-5xl font-black mb-16 max-w-xl leading-tight">
              {t('services_title')}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} delay={(i + 1) as 1 | 2 | 3}>
                <div className="card-hover group cursor-default h-full">
                  {/* Image placeholder */}
                  <div className="img-placeholder h-52 w-full rounded-t-lg flex items-end p-5">
                    <span className="text-4xl relative z-10">{s.icon}</span>
                  </div>
                  <div
                    style={{ border: '1px solid #e5e7eb', borderTop: 'none' }}
                    className="rounded-b-lg p-6"
                  >
                    <h3 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold mb-3">
                      {locale === 'pt' ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color: 'var(--ujima-gray)' }} className="text-sm leading-relaxed">
                      {locale === 'pt' ? s.desc_pt : s.desc_en}
                    </p>
                    <div
                      style={{ color: 'var(--ujima-green)', borderTop: '1px solid #e5e7eb' }}
                      className="mt-5 pt-4 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      {locale === 'pt' ? 'Saber mais' : 'Learn more'} →
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ backgroundColor: 'var(--ujima-dark)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="section-label mb-4">{locale === 'pt' ? 'Agenda' : 'Agenda'}</div>
            <h2 style={{ color: 'var(--ujima-cream)' }} className="text-4xl md:text-5xl font-black mb-16 leading-tight">
              {t('events_title')}
            </h2>
          </AnimateOnScroll>

          {events.length === 0 ? (
            <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg">{t('no_events')}</p>
          ) : (
            <div className="flex flex-col gap-px" style={{ borderTop: '1px solid rgba(82,183,136,0.2)' }}>
              {events.map((ev, i) => (
                <AnimateOnScroll key={ev.id} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <div
                    style={{ borderBottom: '1px solid rgba(82,183,136,0.2)' }}
                    className="group flex flex-col md:flex-row md:items-center gap-6 py-8 hover:bg-white/5 transition-colors px-2 -mx-2 rounded cursor-default"
                  >
                    {/* Date badge */}
                    <div
                      style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)', minWidth: 80 }}
                      className="text-center py-3 px-4 rounded font-black text-sm self-start"
                    >
                      <div className="text-2xl font-black">{ev.date.split('-')[2]}</div>
                      <div className="text-xs uppercase tracking-widest">{new Date(ev.date).toLocaleString(locale === 'pt' ? 'pt' : 'en', { month: 'short' })}</div>
                    </div>

                    {/* Image placeholder */}
                    <div className="img-placeholder w-full md:w-32 h-20 rounded shrink-0" />

                    {/* Content */}
                    <div className="flex-1">
                      <p style={{ color: 'var(--ujima-green-light)' }} className="text-xs font-semibold uppercase tracking-widest mb-1">
                        {ev.time && `${ev.time} · `}{locale === 'pt' ? ev.location_pt : ev.location_en}
                      </p>
                      <h3 style={{ color: 'var(--ujima-cream)' }} className="text-xl font-bold group-hover:text-yellow-300 transition-colors">
                        {locale === 'pt' ? ev.title_pt : ev.title_en}
                      </h3>
                      <p style={{ color: 'rgba(249,247,240,0.6)' }} className="text-sm mt-1 leading-relaxed">
                        {locale === 'pt' ? ev.desc_pt : ev.desc_en}
                      </p>
                    </div>
                    <div style={{ color: 'var(--ujima-yellow)' }} className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">→</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--ujima-cream)' }}>
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="section-label mb-4">{locale === 'pt' ? 'Notícias' : 'News'}</div>
                <h2 style={{ color: 'var(--ujima-dark)' }} className="text-4xl md:text-5xl font-black leading-tight">
                  {t('news_title')}
                </h2>
              </div>
            </div>
          </AnimateOnScroll>

          {news.length === 0 ? (
            <p style={{ color: 'var(--ujima-gray)' }}>{t('no_news')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <AnimateOnScroll key={item.id} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <div className={`card-hover bg-white rounded-lg overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <div className={`img-placeholder ${i === 0 ? 'h-64 md:h-72' : 'h-44'} w-full`}>
                      {item.image && <img src={item.image} alt="" className="w-full h-full object-cover absolute inset-0" />}
                    </div>
                    <div className="p-6">
                      <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-bold uppercase tracking-widest mb-2">{item.date}</p>
                      <h3 style={{ color: 'var(--ujima-dark)' }} className={`font-bold leading-snug mb-3 ${i === 0 ? 'text-2xl' : 'text-base'}`}>
                        {locale === 'pt' ? item.title_pt : item.title_en}
                      </h3>
                      <p style={{ color: 'var(--ujima-gray)' }} className="text-sm leading-relaxed">
                        {locale === 'pt' ? item.summary_pt : item.summary_en}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ backgroundColor: 'var(--ujima-green)' }} className="py-20 px-6 text-center">
        <AnimateOnScroll>
          <p style={{ color: 'var(--ujima-yellow)' }} className="section-label mb-4">
            {locale === 'pt' ? 'Faça Parte' : 'Get Involved'}
          </p>
          <h2 style={{ color: 'var(--ujima-cream)' }} className="text-4xl md:text-5xl font-black mb-6 max-w-2xl mx-auto leading-tight">
            {locale === 'pt' ? 'Juntos construímos um futuro mais verde' : 'Together we build a greener future'}
          </h2>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {locale === 'pt' ? 'Contacte-nos' : 'Contact us'} →
          </Link>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
