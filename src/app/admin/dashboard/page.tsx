'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'news' | 'events' | 'pages' | 'settings';

interface NewsItem { id: number; date: string; image: string; title_pt: string; title_en: string; summary_pt: string; summary_en: string; content_pt: string; content_en: string; }
interface EventItem { id: number; date: string; time: string; image: string; location_pt: string; location_en: string; title_pt: string; title_en: string; desc_pt: string; desc_en: string; }
interface PagesData { home: { hero_image: string; services: { id: number; icon: string; title_pt: string; title_en: string; desc_pt: string; desc_en: string }[] }; info: { content_pt: string; content_en: string }; about: { content_pt: string; content_en: string; team: unknown[] }; contact: { email: string; phone: string; address_pt: string; address_en: string }; }
interface Settings { logo_url: string; site_name: string; tagline_pt: string; tagline_en: string; }

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [pages, setPages] = useState<PagesData | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editNews, setEditNews] = useState<NewsItem | null>(null);
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);

  useEffect(() => { fetchContent(); }, []);

  async function fetchContent() {
    setLoading(true);
    const res = await fetch('/api/content');
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setNews(data.news || []);
    setEvents(data.events || []);
    setPages(data.pages || null);
    setSettings(data.settings || null);
    setLoading(false);
  }

  async function saveContent(type: string, data: unknown) {
    setSaving(true);
    const res = await fetch('/api/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, data }) });
    if (res.ok) { setMessage('Guardado ✓'); setTimeout(() => setMessage(''), 3000); }
    setSaving(false);
  }

  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/admin'); }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) callback(data.url);
  }

  function newNews(): NewsItem { return { id: Date.now(), date: new Date().toISOString().split('T')[0], image: '', title_pt: '', title_en: '', summary_pt: '', summary_en: '', content_pt: '', content_en: '' }; }
  function newEvent(): EventItem { return { id: Date.now(), date: new Date().toISOString().split('T')[0], time: '09:00', image: '', location_pt: 'Luanda, Angola', location_en: 'Luanda, Angola', title_pt: '', title_en: '', desc_pt: '', desc_en: '' }; }

  const inp = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400';
  const lbl = 'block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider';
  const tabs: { key: Tab; label: string }[] = [{ key: 'news', label: 'Notícias' }, { key: 'events', label: 'Eventos' }, { key: 'pages', label: 'Páginas' }, { key: 'settings', label: 'Definições' }];

  if (loading) return (
    <div style={{ backgroundColor: 'var(--ujima-dark)', minHeight: '100vh' }} className="flex items-center justify-center">
      <div className="text-center">
        <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4 animate-pulse">U</div>
        <p style={{ color: 'var(--ujima-cream)' }}>A carregar...</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Topbar */}
      <div style={{ backgroundColor: 'var(--ujima-dark)', color: 'var(--ujima-cream)' }} className="px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="w-9 h-9 rounded-full flex items-center justify-center font-black text-base">U</div>
          )}
          <div>
            <div className="font-black text-sm">Painel de Administração</div>
            <div style={{ color: 'var(--ujima-green-light)' }} className="text-xs">Projecto Ecológico UJIMA</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {message && <span style={{ color: 'var(--ujima-yellow)' }} className="text-sm font-semibold">{message}</span>}
          <a href="/pt" target="_blank" style={{ color: 'var(--ujima-green-light)' }} className="text-sm hover:opacity-70 hidden sm:block">Ver site →</a>
          <button onClick={logout} className="text-red-400 text-sm hover:opacity-70">Sair</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 border border-gray-200 w-fit">
          {tabs.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ backgroundColor: tab === key ? 'var(--ujima-green)' : 'transparent', color: tab === key ? '#fff' : '#555' }}
              className="px-5 py-2 rounded text-sm font-semibold transition-all"
            >{label}</button>
          ))}
        </div>

        {/* ── NEWS ── */}
        {tab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black">Notícias</h2>
              <button onClick={() => setEditNews(newNews())} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="px-4 py-2 rounded text-sm font-semibold">+ Nova Notícia</button>
            </div>

            {editNews && (
              <div className="bg-white rounded-lg p-6 mb-6 border border-green-200 shadow-sm">
                <h3 className="font-black mb-5">{news.find(n => n.id === editNews.id) ? 'Editar' : 'Nova'} Notícia</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lbl}>Data</label><input className={inp} type="date" value={editNews.date} onChange={e => setEditNews({ ...editNews, date: e.target.value })} /></div>
                  <div>
                    <label className={lbl}>Imagem</label>
                    <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setEditNews({ ...editNews, image: url }))} className="text-xs" />
                    {editNews.image && <img src={editNews.image} className="mt-2 h-16 rounded object-cover" alt="" />}
                  </div>
                  <div><label className={lbl}>Título (PT)</label><input className={inp} value={editNews.title_pt} onChange={e => setEditNews({ ...editNews, title_pt: e.target.value })} /></div>
                  <div><label className={lbl}>Título (EN)</label><input className={inp} value={editNews.title_en} onChange={e => setEditNews({ ...editNews, title_en: e.target.value })} /></div>
                  <div><label className={lbl}>Resumo (PT)</label><textarea className={inp} rows={2} value={editNews.summary_pt} onChange={e => setEditNews({ ...editNews, summary_pt: e.target.value })} /></div>
                  <div><label className={lbl}>Resumo (EN)</label><textarea className={inp} rows={2} value={editNews.summary_en} onChange={e => setEditNews({ ...editNews, summary_en: e.target.value })} /></div>
                  <div className="col-span-2"><label className={lbl}>Conteúdo (PT)</label><textarea className={inp} rows={4} value={editNews.content_pt} onChange={e => setEditNews({ ...editNews, content_pt: e.target.value })} /></div>
                  <div className="col-span-2"><label className={lbl}>Conteúdo (EN)</label><textarea className={inp} rows={4} value={editNews.content_en} onChange={e => setEditNews({ ...editNews, content_en: e.target.value })} /></div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button disabled={saving} onClick={() => { const exists = news.find(n => n.id === editNews.id); const updated = exists ? news.map(n => n.id === editNews.id ? editNews : n) : [...news, editNews]; setNews(updated); saveContent('news', updated); setEditNews(null); }} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="px-5 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
                  <button onClick={() => setEditNews(null)} className="px-5 py-2 rounded text-sm border border-gray-300 text-gray-600">Cancelar</button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {news.map(item => (
                <div key={item.id} className="bg-white rounded-lg p-5 border border-gray-200 flex justify-between items-start gap-4">
                  {item.image && <img src={item.image} className="w-16 h-16 rounded object-cover shrink-0" alt="" />}
                  <div className="flex-1">
                    <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-bold mb-1">{item.date}</p>
                    <p className="font-bold">{item.title_pt}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.summary_pt}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => setEditNews(item)} style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold hover:opacity-70">Editar</button>
                    <button onClick={() => { const u = news.filter(n => n.id !== item.id); setNews(u); saveContent('news', u); }} className="text-sm text-red-500 font-semibold hover:opacity-70">Apagar</button>
                  </div>
                </div>
              ))}
              {news.length === 0 && <p className="text-gray-400 text-sm text-center py-12">Nenhuma notícia ainda.</p>}
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {tab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black">Eventos</h2>
              <button onClick={() => setEditEvent(newEvent())} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="px-4 py-2 rounded text-sm font-semibold">+ Novo Evento</button>
            </div>

            {editEvent && (
              <div className="bg-white rounded-lg p-6 mb-6 border border-green-200 shadow-sm">
                <h3 className="font-black mb-5">{events.find(ev => ev.id === editEvent.id) ? 'Editar' : 'Novo'} Evento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lbl}>Data</label><input className={inp} type="date" value={editEvent.date} onChange={e => setEditEvent({ ...editEvent, date: e.target.value })} /></div>
                  <div><label className={lbl}>Hora</label><input className={inp} type="time" value={editEvent.time} onChange={e => setEditEvent({ ...editEvent, time: e.target.value })} /></div>
                  <div><label className={lbl}>Local (PT)</label><input className={inp} value={editEvent.location_pt} onChange={e => setEditEvent({ ...editEvent, location_pt: e.target.value })} /></div>
                  <div><label className={lbl}>Local (EN)</label><input className={inp} value={editEvent.location_en} onChange={e => setEditEvent({ ...editEvent, location_en: e.target.value })} /></div>
                  <div><label className={lbl}>Título (PT)</label><input className={inp} value={editEvent.title_pt} onChange={e => setEditEvent({ ...editEvent, title_pt: e.target.value })} /></div>
                  <div><label className={lbl}>Título (EN)</label><input className={inp} value={editEvent.title_en} onChange={e => setEditEvent({ ...editEvent, title_en: e.target.value })} /></div>
                  <div><label className={lbl}>Descrição (PT)</label><textarea className={inp} rows={3} value={editEvent.desc_pt} onChange={e => setEditEvent({ ...editEvent, desc_pt: e.target.value })} /></div>
                  <div><label className={lbl}>Descrição (EN)</label><textarea className={inp} rows={3} value={editEvent.desc_en} onChange={e => setEditEvent({ ...editEvent, desc_en: e.target.value })} /></div>
                  <div className="col-span-2">
                    <label className={lbl}>Imagem</label>
                    <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setEditEvent({ ...editEvent, image: url }))} className="text-xs" />
                    {editEvent.image && <img src={editEvent.image} className="mt-2 h-16 rounded object-cover" alt="" />}
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button disabled={saving} onClick={() => { const exists = events.find(ev => ev.id === editEvent.id); const updated = exists ? events.map(ev => ev.id === editEvent.id ? editEvent : ev) : [...events, editEvent]; setEvents(updated); saveContent('events', updated); setEditEvent(null); }} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="px-5 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
                  <button onClick={() => setEditEvent(null)} className="px-5 py-2 rounded text-sm border border-gray-300 text-gray-600">Cancelar</button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {events.map(ev => (
                <div key={ev.id} className="bg-white rounded-lg p-5 border border-gray-200 flex justify-between items-start gap-4">
                  {ev.image && <img src={ev.image} className="w-16 h-16 rounded object-cover shrink-0" alt="" />}
                  <div className="flex-1">
                    <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-bold mb-1">{ev.date} {ev.time && `· ${ev.time}`} · {ev.location_pt}</p>
                    <p className="font-bold">{ev.title_pt}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{ev.desc_pt}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => setEditEvent(ev)} style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold hover:opacity-70">Editar</button>
                    <button onClick={() => { const u = events.filter(e => e.id !== ev.id); setEvents(u); saveContent('events', u); }} className="text-sm text-red-500 font-semibold hover:opacity-70">Apagar</button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-gray-400 text-sm text-center py-12">Nenhum evento ainda.</p>}
            </div>
          </div>
        )}

        {/* ── PAGES ── */}
        {tab === 'pages' && pages && (
          <div className="flex flex-col gap-8">
            <h2 className="text-xl font-black">Editar Páginas</h2>

            {/* Hero image */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">🏠 Imagem de Fundo (Início)</h3>
              <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setPages({ ...pages, home: { ...pages.home, hero_image: url } }))} className="text-sm" />
              {pages.home.hero_image && <img src={pages.home.hero_image} className="mt-3 h-32 rounded object-cover" alt="" />}
              <button onClick={() => saveContent('pages', pages)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="mt-4 px-4 py-2 rounded text-sm font-semibold block disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
            </div>

            {/* Info page */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">ℹ️ Página — Informação</h3>
              <div className="grid grid-cols-1 gap-4">
                <div><label className={lbl}>Conteúdo (PT)</label><textarea className={inp} rows={4} value={pages.info.content_pt} onChange={e => setPages({ ...pages, info: { ...pages.info, content_pt: e.target.value } })} /></div>
                <div><label className={lbl}>Conteúdo (EN)</label><textarea className={inp} rows={4} value={pages.info.content_en} onChange={e => setPages({ ...pages, info: { ...pages.info, content_en: e.target.value } })} /></div>
              </div>
              <button onClick={() => saveContent('pages', pages)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="mt-4 px-4 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
            </div>

            {/* About page */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">👥 Página — Sobre Nós</h3>
              <div className="grid grid-cols-1 gap-4">
                <div><label className={lbl}>Conteúdo (PT)</label><textarea className={inp} rows={4} value={pages.about.content_pt} onChange={e => setPages({ ...pages, about: { ...pages.about, content_pt: e.target.value } })} /></div>
                <div><label className={lbl}>Conteúdo (EN)</label><textarea className={inp} rows={4} value={pages.about.content_en} onChange={e => setPages({ ...pages, about: { ...pages.about, content_en: e.target.value } })} /></div>
              </div>
              <button onClick={() => saveContent('pages', pages)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="mt-4 px-4 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">📧 Página — Contacto</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lbl}>Email</label><input className={inp} value={pages.contact.email} onChange={e => setPages({ ...pages, contact: { ...pages.contact, email: e.target.value } })} /></div>
                <div><label className={lbl}>Telefone</label><input className={inp} value={pages.contact.phone} onChange={e => setPages({ ...pages, contact: { ...pages.contact, phone: e.target.value } })} /></div>
                <div><label className={lbl}>Endereço (PT)</label><input className={inp} value={pages.contact.address_pt} onChange={e => setPages({ ...pages, contact: { ...pages.contact, address_pt: e.target.value } })} /></div>
                <div><label className={lbl}>Endereço (EN)</label><input className={inp} value={pages.contact.address_en} onChange={e => setPages({ ...pages, contact: { ...pages.contact, address_en: e.target.value } })} /></div>
              </div>
              <button onClick={() => saveContent('pages', pages)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="mt-4 px-4 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && settings && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-black">Definições do Site</h2>

            {/* Logo upload */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">🖼️ Logótipo</h3>
              <div className="flex items-center gap-6 mb-4">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="w-20 h-20 rounded-full object-cover border-2 border-green-200" />
                ) : (
                  <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl">U</div>
                )}
                <div>
                  <label className={lbl + ' mb-2'}>Carregar novo logótipo</label>
                  <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setSettings({ ...settings, logo_url: url }))} className="text-sm" />
                  {settings.logo_url && (
                    <button onClick={() => setSettings({ ...settings, logo_url: '' })} className="text-xs text-red-500 mt-2 block hover:opacity-70">Remover logótipo</button>
                  )}
                </div>
              </div>
              <button onClick={() => saveContent('settings', settings)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="px-4 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar Logótipo'}</button>
            </div>

            {/* Site name & tagline */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold mb-4">⚙️ Informações Gerais</h3>
              <div className="grid grid-cols-1 gap-4">
                <div><label className={lbl}>Nome do Site</label><input className={inp} value={settings.site_name} onChange={e => setSettings({ ...settings, site_name: e.target.value })} /></div>
                <div><label className={lbl}>Tagline (PT)</label><input className={inp} value={settings.tagline_pt} onChange={e => setSettings({ ...settings, tagline_pt: e.target.value })} /></div>
                <div><label className={lbl}>Tagline (EN)</label><input className={inp} value={settings.tagline_en} onChange={e => setSettings({ ...settings, tagline_en: e.target.value })} /></div>
              </div>
              <button onClick={() => saveContent('settings', settings)} disabled={saving} style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }} className="mt-4 px-4 py-2 rounded text-sm font-semibold disabled:opacity-60">{saving ? '...' : 'Guardar'}</button>
            </div>

            {/* Credentials reminder */}
            <div style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }} className="rounded-lg p-5 text-sm">
              <p className="font-bold text-amber-800 mb-1">🔑 Credenciais de Acesso</p>
              <p className="text-amber-700">Para alterar a password, peça ao agente Claude para gerar um novo hash e actualizar o ficheiro <code className="bg-amber-100 px-1 rounded">.env.local</code>.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
