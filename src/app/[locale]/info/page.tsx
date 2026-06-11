import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

const S = {
  eyebrow: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#15803D', marginBottom:'.5rem' },
  eyebrowLight: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#DCFCE7', marginBottom:'.5rem' },
  hSection: { fontSize:'clamp(1.75rem,4vw,2.75rem)', fontWeight:900, lineHeight:1.1, letterSpacing:'-.02em', color:'#111827' },
  arrowLink: { display:'inline-flex', alignItems:'center', gap:'.375rem', color:'#15803D', fontWeight:600, fontSize:'.9375rem', textDecoration:'none' },
  photoSlot: { background:'#EBF5EC', border:'2px dashed #A7D7AC', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:'.625rem', color:'#4B8454', fontSize:'.8125rem', fontWeight:600, position:'relative' as const, overflow:'hidden' as const },
};
const ARROW = <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IMG_ICON = (size=40) => <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4B8454" strokeWidth="1.5" style={{ opacity:.55 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>;

export default async function InfoPage() {
  const locale   = await getLocale();
  const t        = await getTranslations('info');
  const isPt     = locale === 'pt';
  const services = pagesData.home.services;
  const content  = isPt ? pagesData.info.content_pt : pagesData.info.content_en;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section aria-labelledby="info-heading"
        style={{ background:'#052E16', padding:'5rem 1.5rem 4.5rem', position:'relative', overflow:'hidden' }}>
        <div aria-hidden="true" style={{ position:'absolute', top:'-20%', right:'-5%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(22,163,74,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div className="max-w-7xl mx-auto" style={{ position:'relative' }}>
          <span style={S.eyebrowLight}>{t('eyebrow')}</span>
          <h1 id="info-heading" style={{ color:'#ffffff', fontSize:'clamp(2.25rem,5.5vw,4rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', marginTop:'.5rem', maxWidth:'22ch' }}>
            {t('title')}
          </h1>
          <p style={{ color:'rgba(255,255,255,.72)', marginTop:'1.25rem', fontSize:'1.125rem', maxWidth:'46ch', lineHeight:1.75 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO ───────────────────────────────────────────── */}
      <section style={{ background:'#ffffff', borderBottom:'1px solid #E5E7EB' }} className="py-16 px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <p style={{ color:'#374151', fontSize:'1.125rem', lineHeight:1.85 }}>{content}</p>
          </div>
        </Reveal>
      </section>

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" style={{ background:'#F9FAFB' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span style={S.eyebrow}>{t('services_eyebrow')}</span>
            <h2 id="services-heading" style={{ ...S.hSection, marginBottom:'3rem' }}>{t('services_title')}</h2>
          </Reveal>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(Math.min(i+1,3)) as 1|2|3}>
                <article style={{ background:'#ffffff', borderRadius:16, overflow:'hidden', border:'1px solid #E5E7EB', display:'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                  <div style={{ ...S.photoSlot, flexShrink:0, width:240, minHeight:200 }}>
                    {IMG_ICON(36)}<span style={{ fontSize:'.75rem' }}>{isPt ? 'Foto em breve' : 'Coming soon'}</span>
                  </div>
                  <div style={{ padding:'2rem 2.5rem', display:'flex', flexDirection:'column', justifyContent:'center', flex:1 }}>
                    <h3 style={{ color:'#111827', fontWeight:800, fontSize:'1.375rem', marginBottom:'.75rem' }}>
                      {isPt ? s.title_pt : s.title_en}
                    </h3>
                    <p style={{ color:'#374151', lineHeight:1.8, fontSize:'1rem', marginBottom:'1.5rem' }}>
                      {isPt ? s.desc_pt : s.desc_en}
                    </p>
                    <Link href={`/${locale}/contact`} style={S.arrowLink}>
                      {isPt ? 'Entrar em contacto' : 'Get in touch'} {ARROW}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────────── */}
      <section style={{ background:'#EAB308', padding:'3.5rem 1.5rem' }}>
        <Reveal>
          <div className="max-w-4xl mx-auto" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1.5rem' }}>
            <p style={{ color:'#111827', fontWeight:800, fontSize:'clamp(1.125rem,2.5vw,1.5rem)', lineHeight:1.3 }}>
              {isPt ? 'Tem alguma questão sobre os nossos serviços?' : 'Have a question about our services?'}
            </p>
            <Link href={`/${locale}/contact`} style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'#111827', color:'#ffffff', border:'2px solid #111827', borderRadius:100, padding:'.75rem 1.75rem', fontWeight:700, fontSize:'.9375rem', textDecoration:'none', whiteSpace:'nowrap' }}>
              {isPt ? 'Fale Connosco' : 'Contact Us'} {ARROW}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
