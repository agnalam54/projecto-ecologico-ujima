import { getTranslations, getLocale } from 'next-intl/server';
import pagesData from '../../../../content/pages.json';

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations('about');
  const content = locale === 'pt' ? pagesData.about.content_pt : pagesData.about.content_en;

  const values = [
    {
      icon: '🤝',
      title_pt: 'Comunidade', title_en: 'Community',
      desc_pt: 'Acreditamos no poder colectivo das comunidades para criar mudança positiva.',
      desc_en: 'We believe in the collective power of communities to create positive change.'
    },
    {
      icon: '🌍',
      title_pt: 'Sustentabilidade', title_en: 'Sustainability',
      desc_pt: 'Todas as nossas acções são guiadas pelo princípio da sustentabilidade ambiental.',
      desc_en: 'All our actions are guided by the principle of environmental sustainability.'
    },
    {
      icon: '💡',
      title_pt: 'Inovação', title_en: 'Innovation',
      desc_pt: 'Buscamos soluções criativas e inovadoras para os desafios ambientais de Angola.',
      desc_en: "We seek creative and innovative solutions to Angola's environmental challenges."
    }
  ];

  return (
    <div>
      <section style={{ backgroundColor: 'var(--ujima-dark)', color: 'var(--ujima-cream)' }} className="py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p style={{ color: 'var(--ujima-green-light)' }} className="text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div
          style={{ backgroundColor: '#fff', border: '1px solid var(--ujima-green-light)' }}
          className="rounded-2xl p-8 mb-12 shadow-sm"
        >
          <h2 style={{ color: 'var(--ujima-green)' }} className="text-2xl font-bold mb-4">
            {locale === 'pt' ? 'A Nossa Missão' : 'Our Mission'}
          </h2>
          <p style={{ color: 'var(--ujima-dark)' }} className="text-lg leading-relaxed">{content}</p>
        </div>

        <h2 style={{ color: 'var(--ujima-green)' }} className="text-2xl font-bold mb-8">
          {locale === 'pt' ? 'Os Nossos Valores' : 'Our Values'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              style={{ border: '1px solid var(--ujima-green-light)', backgroundColor: '#fff' }}
              className="rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 style={{ color: 'var(--ujima-dark)' }} className="text-lg font-bold mb-2">
                {locale === 'pt' ? v.title_pt : v.title_en}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === 'pt' ? v.desc_pt : v.desc_en}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
