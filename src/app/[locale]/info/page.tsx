import { getTranslations, getLocale } from 'next-intl/server';
import Anim from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

export default async function InfoPage() {
  const locale = await getLocale();
  const t      = await getTranslations('info');
  const isPt   = locale === 'pt';
  const { services } = pagesData.home;
  const content = isPt ? pagesData.info.content_pt : pagesData.info.content_en;

  return (
    <>
      {/* Header */}
      <section aria-labelledby="info-heading" style={{ background: 'linear-gradient(160deg, var(--g-900), var(--g-800))', padding: '5rem 1.5rem 4rem' }} className="on-dark">
        <div className="max-w-7xl mx-auto">
          <span className="eyebrow">{isPt ? 'Serviços & Programas' : 'Services & Programmes'}</span>
          <h1 id="info-heading" style={{ color: '#fff', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.5rem', maxWidth: '20ch' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '1rem', fontSize: '1.125rem', maxWidth: '45ch', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: 'var(--s-white)', borderBottom: '1px solid var(--s-border)' }} className="py-16 px-6">
        <Anim>
          <div className="max-w-3xl mx-auto">
            <p style={{ color: 'var(--t-secondary)', fontSize: '1.125rem', lineHeight: 1.85 }}>{content}</p>
          </div>
        </Anim>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" style={{ background: 'var(--s-subtle)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Anim>
            <span className="eyebrow">{isPt ? 'O que fazemos' : 'What we do'}</span>
            <h2 id="services-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, marginTop: '0.25rem', marginBottom: '2.5rem' }}>
              {isPt ? 'Os Nossos Serviços' : 'Our Services'}
            </h2>
          </Anim>

          <div className="flex flex-col gap-5">
            {services.map((s, i) => (
              <Anim key={s.id} delay={(Math.min(i + 1, 3)) as 1|2|3}>
                <div className="card flex flex-col sm:flex-row overflow-hidden">
                  <div className="img-ph w-full sm:w-48 h-40 sm:h-auto shrink-0" aria-hidden="true">
                    <span style={{ fontSize: '2.75rem' }}>{s.icon}</span>
                  </div>
                  <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                      {isPt ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color: 'var(--t-secondary)', lineHeight: 1.75 }}>
                      {isPt ? s.desc_pt : s.desc_en}
                    </p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
