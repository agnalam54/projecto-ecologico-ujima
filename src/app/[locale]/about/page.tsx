import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Anim from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

export default async function AboutPage() {
  const locale  = await getLocale();
  const t       = await getTranslations('about');
  const isPt    = locale === 'pt';
  const content = isPt ? pagesData.about.content_pt : pagesData.about.content_en;

  const values = [
    { icon: '🤝', pt: 'Comunidade',      en: 'Community',      dpt: 'Acreditamos no poder colectivo das comunidades para criar mudança positiva e duradoura.',        den: 'We believe in the collective power of communities to create lasting positive change.' },
    { icon: '🌍', pt: 'Sustentabilidade', en: 'Sustainability', dpt: 'Todas as nossas acções são guiadas pelo princípio da sustentabilidade ambiental e social.', den: 'All our actions are guided by the principle of environmental and social sustainability.' },
    { icon: '💡', pt: 'Inovação',         en: 'Innovation',     dpt: 'Buscamos soluções criativas e inovadoras para os desafios ambientais de Angola.',              den: "We seek creative and innovative solutions to Angola's environmental challenges." },
  ];

  return (
    <>
      {/* Header */}
      <section aria-labelledby="about-heading" style={{ background: 'linear-gradient(160deg, var(--g-900), var(--g-800))', padding: '5rem 1.5rem 4rem' }} className="on-dark">
        <div className="max-w-7xl mx-auto">
          <span className="eyebrow">UJIMA</span>
          <h1 id="about-heading" style={{ color: '#fff', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.5rem', maxWidth: '16ch' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '1rem', fontSize: '1.125rem', maxWidth: '45ch', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading" style={{ background: 'var(--s-white)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Anim>
            <span className="eyebrow">{isPt ? 'A nossa missão' : 'Our mission'}</span>
            <h2 id="mission-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, lineHeight: 1.15, marginTop: '0.25rem', marginBottom: '1.25rem' }}>
              {isPt ? 'O espírito de UJIMA em cada acção' : 'The spirit of UJIMA in every action'}
            </h2>
            <p style={{ color: 'var(--t-secondary)', lineHeight: 1.85, fontSize: '1.0625rem', marginBottom: '1.75rem' }}>
              {content}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-yellow">
              {isPt ? 'Junte-se a nós' : 'Join us'} →
            </Link>
          </Anim>

          <Anim delay={2}>
            <div className="img-ph rounded-2xl h-72 w-full" aria-hidden="true">
              <span style={{ fontSize: '5rem' }}>🌱</span>
            </div>
          </Anim>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" style={{ background: 'var(--s-subtle)', borderTop: '1px solid var(--s-border)', borderBottom: '1px solid var(--s-border)' }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Anim>
            <span className="eyebrow">{isPt ? 'Os nossos valores' : 'Our values'}</span>
            <h2 id="values-heading" style={{ color: 'var(--t-primary)', fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, lineHeight: 1.1, marginTop: '0.25rem', marginBottom: '2.5rem' }}>
              {isPt ? 'O que nos guia' : 'What guides us'}
            </h2>
          </Anim>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Anim key={v.en} delay={(i + 1) as 1|2|3}>
                <div className="card p-7 h-full">
                  <div aria-hidden="true" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{v.icon}</div>
                  <h3 style={{ color: 'var(--t-primary)', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {isPt ? v.pt : v.en}
                  </h3>
                  <p style={{ color: 'var(--t-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                    {isPt ? v.dpt : v.den}
                  </p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ background: 'var(--g-800)' }} className="py-16 px-6 on-dark">
        <Anim>
          <blockquote className="max-w-3xl mx-auto text-center">
            <p style={{ color: '#fff', fontSize: 'clamp(1.25rem,3vw,1.75rem)', fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '1rem' }}>
              "{isPt ? 'UJIMA — trabalho colectivo e responsabilidade partilhada pela nossa comunidade.'
                      : 'UJIMA — collective work and shared responsibility for our community.'}"
            </p>
            <footer style={{ color: 'var(--g-200)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {isPt ? 'Princípio Fundador' : 'Founding Principle'}
            </footer>
          </blockquote>
        </Anim>
      </section>
    </>
  );
}
