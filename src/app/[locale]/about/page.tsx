import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/AnimateOnScroll';
import pagesData from '../../../../content/pages.json';

const S = {
  eyebrow: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#15803D', marginBottom:'.5rem' },
  eyebrowLight: { display:'block', fontSize:'.6875rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#DCFCE7', marginBottom:'.5rem' },
  hSection: { fontSize:'clamp(1.75rem,4vw,2.75rem)', fontWeight:900, lineHeight:1.1, letterSpacing:'-.02em', color:'#111827' },
  btnGreen: { display:'inline-flex', alignItems:'center', gap:'.5rem', background:'#15803D', color:'#ffffff', border:'2px solid #15803D', borderRadius:100, padding:'.75rem 1.75rem', fontWeight:700, fontSize:'.9375rem', textDecoration:'none', whiteSpace:'nowrap' as const },
  photoSlot: { background:'#EBF5EC', border:'2px dashed #A7D7AC', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:'.625rem', color:'#4B8454', fontSize:'.8125rem', fontWeight:600, position:'relative' as const, overflow:'hidden' as const },
};
const ARROW = <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IMG_ICON = <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4B8454" strokeWidth="1.5" style={{ opacity:.55 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>;

const VALUES = [
  { icon: <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, pt:'Comunidade', en:'Community', dpt:'Acreditamos no poder colectivo das comunidades para criar mudança positiva e duradoura em Angola.', den:'We believe in the collective power of communities to create lasting positive change in Angola.' },
  { icon: <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, pt:'Sustentabilidade', en:'Sustainability', dpt:'Todas as nossas acções são guiadas pelo princípio da sustentabilidade ambiental e social.', den:'All our actions are guided by the principle of environmental and social sustainability.' },
  { icon: <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, pt:'Inovação', en:'Innovation', dpt:'Buscamos soluções criativas e inovadoras para os desafios ambientais de Angola.', den:"We seek creative and innovative solutions to Angola's environmental challenges." },
];

export default async function AboutPage() {
  const locale  = await getLocale();
  const t       = await getTranslations('about');
  const isPt    = locale === 'pt';
  const content = isPt ? pagesData.about.content_pt : pagesData.about.content_en;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section aria-labelledby="about-heading"
        style={{ background:'#052E16', padding:'5rem 1.5rem 4.5rem', position:'relative', overflow:'hidden' }}>
        <div aria-hidden="true" style={{ position:'absolute', top:'-20%', right:'-5%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(22,163,74,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div className="max-w-7xl mx-auto" style={{ position:'relative' }}>
          <span style={S.eyebrowLight}>UJIMA</span>
          <h1 id="about-heading" style={{ color:'#ffffff', fontSize:'clamp(2.25rem,5.5vw,4rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', marginTop:'.5rem', maxWidth:'18ch' }}>
            {t('title')}
          </h1>
          <p style={{ color:'rgba(255,255,255,.72)', marginTop:'1.25rem', fontSize:'1.125rem', maxWidth:'46ch', lineHeight:1.75 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section aria-labelledby="mission-heading" style={{ background:'#ffffff' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'center' }}>
          <Reveal>
            <span style={S.eyebrow}>{t('mission_eyebrow')}</span>
            <h2 id="mission-heading" style={{ ...S.hSection, marginBottom:'1.25rem' }}>{t('mission_title')}</h2>
            <p style={{ color:'#374151', lineHeight:1.85, fontSize:'1.0625rem', marginBottom:'2rem' }}>{content}</p>
            <Link href={`/${locale}/contact`} style={S.btnGreen}>{isPt ? 'Junte-se a nós' : 'Join us'} {ARROW}</Link>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ ...S.photoSlot, borderRadius:16, height:420 }}>
              {IMG_ICON}<span>{isPt ? 'Foto em breve' : 'Photo coming soon'}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────── */}
      <section aria-labelledby="values-heading" style={{ background:'#F9FAFB', borderTop:'1px solid #E5E7EB', borderBottom:'1px solid #E5E7EB' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span style={S.eyebrow}>{t('values_eyebrow')}</span>
            <h2 id="values-heading" style={{ ...S.hSection, marginBottom:'3rem' }}>{t('values_title')}</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'2rem' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.en} delay={(i+1) as 1|2|3}>
                <div style={{ background:'#ffffff', borderRadius:16, padding:'2rem', border:'1px solid #E5E7EB', height:'100%' }}>
                  <div style={{ color:'#15803D', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.625rem' }}>
                    {v.icon}
                    <span style={{ fontWeight:800, fontSize:'1.125rem', color:'#111827' }}>{isPt ? v.pt : v.en}</span>
                  </div>
                  <p style={{ color:'#374151', lineHeight:1.75, fontSize:'.9375rem' }}>{isPt ? v.dpt : v.den}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ──────────────────────────────────────────── */}
      <section style={{ background:'#ffffff' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'center' }}>
          <Reveal>
            <div style={{ ...S.photoSlot, borderRadius:16, height:360 }}>
              {IMG_ICON}<span>{isPt ? 'Foto em breve' : 'Photo coming soon'}</span>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <span style={S.eyebrow}>{t('vision_eyebrow')}</span>
            <h2 style={{ ...S.hSection, marginBottom:'1.25rem' }}>{t('vision_title')}</h2>
            <p style={{ color:'#374151', lineHeight:1.85, fontSize:'1.0625rem' }}>
              {isPt ? 'Imaginamos um Angola onde as comunidades vivem em harmonia com a natureza — onde os recursos naturais são valorizados, protegidos e geridos de forma sustentável para as gerações futuras.' : 'We envision an Angola where communities live in harmony with nature — where natural resources are valued, protected, and managed sustainably for future generations.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── QUOTE ───────────────────────────────────────────── */}
      <section style={{ background:'#052E16' }} className="py-20 px-6">
        <Reveal>
          <blockquote className="max-w-3xl mx-auto" style={{ textAlign:'center' }}>
            <p style={{ color:'#ffffff', fontSize:'clamp(1.375rem,3vw,2rem)', fontWeight:800, lineHeight:1.45, fontStyle:'italic', marginBottom:'1.25rem' }}>
              &ldquo;{isPt ? 'UJIMA — trabalho colectivo e responsabilidade partilhada pela nossa comunidade.' : 'UJIMA — collective work and shared responsibility for our community.'}&rdquo;
            </p>
            <footer>
              <span style={{ color:'#DCFCE7', fontSize:'.8125rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>
                {isPt ? 'Princípio Fundador · Projecto Ecológico UJIMA' : 'Founding Principle · Projecto Ecológico UJIMA'}
              </span>
            </footer>
          </blockquote>
        </Reveal>
      </section>
    </>
  );
}
