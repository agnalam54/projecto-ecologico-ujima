import { getTranslations, getLocale } from 'next-intl/server';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations('about');
  const content = locale === 'pt' ? pagesData.about.content_pt : pagesData.about.content_en;

  const values = [
    { icon: '🤝', title_pt: 'Comunidade', title_en: 'Community', desc_pt: 'Acreditamos no poder colectivo das comunidades para criar mudança positiva.', desc_en: 'We believe in the collective power of communities to create positive change.' },
    { icon: '🌍', title_pt: 'Sustentabilidade', title_en: 'Sustainability', desc_pt: 'Todas as nossas acções são guiadas pelo princípio da sustentabilidade ambiental.', desc_en: 'All our actions are guided by the principle of environmental sustainability.' },
    { icon: '💡', title_pt: 'Inovação', title_en: 'Innovation', desc_pt: 'Buscamos soluções criativas para os desafios ambientais de Angola.', desc_en: "We seek creative solutions to Angola's environmental challenges." },
  ];

  return (
    <div>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--ujima-dark)' }} className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 img-placeholder opacity-20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,31,20,0.98) 0%, rgba(45,106,79,0.7) 100%)' }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="section-label mb-5">UJIMA</div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-5xl md:text-6xl font-black mb-5 max-w-2xl leading-tight">{t('title')}</h1>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div className="section-label mb-4">{locale === 'pt' ? 'A Nossa Missão' : 'Our Mission'}</div>
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-4xl font-black mb-6 leading-tight">
              {locale === 'pt' ? 'O espírito de UJIMA em cada acção' : 'The spirit of UJIMA in every action'}
            </h2>
            <p style={{ color: 'var(--ujima-gray)', lineHeight: 1.9, fontSize: 17 }}>{content}</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={2}>
            <div className="img-placeholder h-80 w-full rounded-lg" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: 'var(--ujima-cream)' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="section-label mb-4">{locale === 'pt' ? 'Os Nossos Valores' : 'Our Values'}</div>
            <h2 style={{ color: 'var(--ujima-dark)' }} className="text-4xl font-black mb-16 leading-tight">
              {locale === 'pt' ? 'O que nos guia' : 'What guides us'}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title_en} delay={(i + 1) as 1 | 2 | 3}>
                <div className="card-hover bg-white rounded-lg p-8" style={{ border: '1px solid #e5e7eb' }}>
                  <div className="text-5xl mb-5">{v.icon}</div>
                  <h3 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold mb-3">
                    {locale === 'pt' ? v.title_pt : v.title_en}
                  </h3>
                  <p style={{ color: 'var(--ujima-gray)', lineHeight: 1.7 }} className="text-sm">
                    {locale === 'pt' ? v.desc_pt : v.desc_en}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quote strip */}
      <section style={{ backgroundColor: 'var(--ujima-green)' }} className="py-16 px-6">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <p style={{ color: 'var(--ujima-yellow)', fontSize: 28, fontWeight: 900, lineHeight: 1.4 }} className="mb-4">
              "{locale === 'pt' ? 'UJIMA — trabalho colectivo e responsabilidade partilhada' : 'UJIMA — collective work and shared responsibility'}"
            </p>
            <p style={{ color: 'rgba(249,247,240,0.6)' }} className="text-sm uppercase tracking-widest">
              {locale === 'pt' ? 'Princípio Fundador' : 'Founding Principle'}
            </p>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
