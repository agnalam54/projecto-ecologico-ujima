import { getTranslations, getLocale } from 'next-intl/server';
import pagesData from '../../../../content/pages.json';

export default async function InfoPage() {
  const locale = await getLocale();
  const t = await getTranslations('info');
  const { services } = pagesData.home;
  const content = locale === 'pt' ? pagesData.info.content_pt : pagesData.info.content_en;

  return (
    <div>
      <section style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }} className="py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p style={{ color: 'var(--ujima-yellow-light)' }} className="text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div
          style={{ backgroundColor: '#fff', border: '1px solid var(--ujima-green-light)' }}
          className="rounded-2xl p-8 mb-12 shadow-sm"
        >
          <p style={{ color: 'var(--ujima-dark)' }} className="text-lg leading-relaxed">{content}</p>
        </div>

        <h2 style={{ color: 'var(--ujima-green)' }} className="text-2xl font-bold mb-8">
          {locale === 'pt' ? 'Os Nossos Serviços' : 'Our Services'}
        </h2>
        <div className="flex flex-col gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              style={{ border: '1px solid var(--ujima-green-light)', backgroundColor: '#fff' }}
              className="rounded-2xl p-6 flex gap-6 items-start shadow-sm"
            >
              <div className="text-4xl">{s.icon}</div>
              <div>
                <h3 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold mb-2">
                  {locale === 'pt' ? s.title_pt : s.title_en}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {locale === 'pt' ? s.desc_pt : s.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
