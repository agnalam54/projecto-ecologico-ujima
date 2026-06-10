import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
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
      {/* Hero */}
      <section
        style={{ backgroundColor: 'var(--ujima-dark)' }}
        className="relative py-28 px-4 text-center overflow-hidden"
      >
        <div
          style={{ backgroundColor: 'var(--ujima-green)', opacity: 0.15 }}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto">
          <div
            style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
            className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl mx-auto mb-6 shadow-lg"
          >
            U
          </div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t('hero_title')}
          </h1>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg md:text-xl mb-8 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <Link
            href={`/${locale}/info`}
            style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
            className="inline-block px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            {t('hero_cta')}
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 style={{ color: 'var(--ujima-green)' }} className="text-3xl font-bold text-center mb-12">
          {t('services_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              style={{ border: '1px solid var(--ujima-green-light)', backgroundColor: '#fff' }}
              className="rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold mb-3">
                {locale === 'pt' ? s.title_pt : s.title_en}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'pt' ? s.desc_pt : s.desc_en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{t('events_title')}</h2>
          {events.length === 0 ? (
            <p className="text-center opacity-70">{t('no_events')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                  className="rounded-2xl p-6"
                >
                  <div
                    style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  >
                    {ev.date} {ev.time && `• ${ev.time}`}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {locale === 'pt' ? ev.title_pt : ev.title_en}
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {locale === 'pt' ? ev.desc_pt : ev.desc_en}
                  </p>
                  <p className="text-xs opacity-60 mt-3">
                    📍 {locale === 'pt' ? ev.location_pt : ev.location_en}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 style={{ color: 'var(--ujima-green)' }} className="text-3xl font-bold text-center mb-10">
          {t('news_title')}
        </h2>
        {news.length === 0 ? (
          <p className="text-center opacity-70">{t('no_news')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                style={{ border: '1px solid var(--ujima-green-light)', backgroundColor: '#fff' }}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {item.image && (
                  <img src={item.image} alt="" className="w-full h-44 object-cover" />
                )}
                <div className="p-6">
                  <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-semibold mb-2">{item.date}</p>
                  <h3 style={{ color: 'var(--ujima-dark)' }} className="text-lg font-bold mb-2 leading-snug">
                    {locale === 'pt' ? item.title_pt : item.title_en}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {locale === 'pt' ? item.summary_pt : item.summary_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
