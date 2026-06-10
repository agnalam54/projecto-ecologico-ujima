import { getTranslations, getLocale } from 'next-intl/server';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

export default async function InfoPage() {
  const locale = await getLocale();
  const t = await getTranslations('info');
  const { services } = pagesData.home;
  const content = locale === 'pt' ? pagesData.info.content_pt : pagesData.info.content_en;

  return (
    <div>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--ujima-dark)' }} className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 img-placeholder opacity-30" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,31,20,0.98) 40%, rgba(19,31,20,0.6) 100%)' }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="section-label mb-5">{locale === 'pt' ? 'Serviços & Programas' : 'Services & Programmes'}</div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-5xl md:text-6xl font-black mb-5 max-w-2xl leading-tight">{t('title')}</h1>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg max-w-xl leading-relaxed">{t('subtitle')}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <p style={{ color: 'var(--ujima-dark)', fontSize: 20, lineHeight: 1.8 }}>{content}</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: 'var(--ujima-cream)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="section-label mb-4">{locale === 'pt' ? 'O Que Fazemos' : 'What We Do'}</div>
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-4xl font-black mb-16 leading-tight">
              {locale === 'pt' ? 'Os Nossos Serviços' : 'Our Services'}
            </h2>
          </AnimateOnScroll>

          <div className="flex flex-col gap-8">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                <div
                  className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row card-hover"
                  style={{ border: '1px solid #e5e7eb' }}
                >
                  <div className="img-placeholder w-full md:w-64 h-48 md:h-auto shrink-0 flex items-center justify-center">
                    <span className="text-6xl relative z-10">{s.icon}</span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 style={{ color: 'var(--ujima-dark)' }} className="text-2xl font-bold mb-3">
                      {locale === 'pt' ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color: 'var(--ujima-gray)', lineHeight: 1.8 }}>
                      {locale === 'pt' ? s.desc_pt : s.desc_en}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
