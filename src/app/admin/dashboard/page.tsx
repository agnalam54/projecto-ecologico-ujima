'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'news' | 'events' | 'pages';

interface NewsItem {
  id: number;
  date: string;
  image: string;
  title_pt: string;
  title_en: string;
  summary_pt: string;
  summary_en: string;
  content_pt: string;
  content_en: string;
}

interface EventItem {
  id: number;
  date: string;
  time: string;
  image: string;
  location_pt: string;
  location_en: string;
  title_pt: string;
  title_en: string;
  desc_pt: string;
  desc_en: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editNews, setEditNews] = useState<NewsItem | null>(null);
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const res = await fetch('/api/content');
    if (res.status === 401) { router.push('/pt/admin'); return; }
    const data = await res.json();
    setNews(data.news || []);
    setEvents(data.events || []);
    setLoading(false);
  }

  async function saveContent(type: string, data: unknown[]) {
    setSaving(true);
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data }),
    });
    if (res.ok) {
      setMessage('Guardado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/pt/admin');
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) callback(data.url);
  }

  function newNewsItem(): NewsItem {
    return {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      image: '',
      title_pt: '',
      title_en: '',
      summary_pt: '',
      summary_en: '',
      content_pt: '',
      content_en: ''
    };
  }

  function newEventItem(): EventItem {
    return {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      image: '',
      location_pt: 'Luanda, Angola',
      location_en: 'Luanda, Angola',
      title_pt: '',
      title_en: '',
      desc_pt: '',
      desc_en: ''
    };
  }

  const inputCls = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400';
  const labelCls = 'block text-xs font-semibold text-gray-600 mb-1';

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--ujima-dark)', minHeight: '100vh' }} className="flex items-center justify-center">
        <p style={{ color: 'var(--ujima-cream)' }}>A carregar...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f4f4f0', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ backgroundColor: 'var(--ujima-dark)', color: 'var(--ujima-cream)' }} className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }} className="w-8 h-8 rounded-full flex items-center justify-center font-bold">U</div>
          <span className="font-bold">Painel de Administração</span>
        </div>
        <div className="flex items-center gap-4">
          {message && <span style={{ color: 'var(--ujima-green-light)' }} className="text-sm">{message}</span>}
          <a href="/pt" target="_blank" style={{ color: 'var(--ujima-green-light)' }} className="text-sm hover:opacity-70">Ver site →</a>
          <button onClick={logout} className="text-sm text-red-400 hover:opacity-70">Sair</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['news', 'events', 'pages'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                backgroundColor: tab === t ? 'var(--ujima-green)' : '#fff',
                color: tab === t ? 'var(--ujima-cream)' : 'var(--ujima-dark)',
                border: '1px solid var(--ujima-green-light)'
              }}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              {t === 'news' ? 'Notícias' : t === 'events' ? 'Eventos' : 'Páginas'}
            </button>
          ))}
        </div>

        {/* NEWS TAB */}
        {tab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold">Notícias</h2>
              <button
                onClick={() => setEditNews(newNewsItem())}
                style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
                className="px-4 py-2 rounded-full text-sm font-semibold"
              >
                + Nova Notícia
              </button>
            </div>

            {editNews && (
              <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-green-200">
                <h3 className="font-bold mb-4">{news.find(n => n.id === editNews.id) ? 'Editar' : 'Nova'} Notícia</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Data</label><input className={inputCls} type="date" value={editNews.date} onChange={e => setEditNews({ ...editNews, date: e.target.value })} /></div>
                  <div>
                    <label className={labelCls}>Imagem</label>
                    <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setEditNews({ ...editNews, image: url }))} className="text-xs" />
                    {editNews.image && <img src={editNews.image} className="mt-2 h-16 rounded object-cover" />}
                  </div>
                  <div><label className={labelCls}>Título (PT)</label><input className={inputCls} value={editNews.title_pt} onChange={e => setEditNews({ ...editNews, title_pt: e.target.value })} /></div>
                  <div><label className={labelCls}>Título (EN)</label><input className={inputCls} value={editNews.title_en} onChange={e => setEditNews({ ...editNews, title_en: e.target.value })} /></div>
                  <div><label className={labelCls}>Resumo (PT)</label><textarea className={inputCls} rows={2} value={editNews.summary_pt} onChange={e => setEditNews({ ...editNews, summary_pt: e.target.value })} /></div>
                  <div><label className={labelCls}>Resumo (EN)</label><textarea className={inputCls} rows={2} value={editNews.summary_en} onChange={e => setEditNews({ ...editNews, summary_en: e.target.value })} /></div>
                  <div className="col-span-2"><label className={labelCls}>Conteúdo (PT)</label><textarea className={inputCls} rows={4} value={editNews.content_pt} onChange={e => setEditNews({ ...editNews, content_pt: e.target.value })} /></div>
                  <div className="col-span-2"><label className={labelCls}>Conteúdo (EN)</label><textarea className={inputCls} rows={4} value={editNews.content_en} onChange={e => setEditNews({ ...editNews, content_en: e.target.value })} /></div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      const exists = news.find(n => n.id === editNews.id);
                      const updated = exists ? news.map(n => n.id === editNews.id ? editNews : n) : [...news, editNews];
                      setNews(updated);
                      saveContent('news', updated);
                      setEditNews(null);
                    }}
                    style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }}
                    className="px-5 py-2 rounded-full text-sm font-semibold"
                    disabled={saving}
                  >
                    {saving ? 'A guardar...' : 'Guardar'}
                  </button>
                  <button onClick={() => setEditNews(null)} className="px-5 py-2 rounded-full text-sm border border-gray-300">Cancelar</button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex justify-between items-start">
                  <div>
                    <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-semibold">{item.date}</p>
                    <p className="font-bold mt-1">{item.title_pt}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.summary_pt}</p>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <button onClick={() => setEditNews(item)} style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold hover:opacity-70">Editar</button>
                    <button
                      onClick={() => {
                        const updated = news.filter(n => n.id !== item.id);
                        setNews(updated);
                        saveContent('news', updated);
                      }}
                      className="text-sm text-red-500 font-semibold hover:opacity-70"
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
              {news.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Nenhuma notícia.</p>}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: 'var(--ujima-dark)' }} className="text-xl font-bold">Eventos</h2>
              <button
                onClick={() => setEditEvent(newEventItem())}
                style={{ backgroundColor: 'var(--ujima-green)', color: 'var(--ujima-cream)' }}
                className="px-4 py-2 rounded-full text-sm font-semibold"
              >
                + Novo Evento
              </button>
            </div>

            {editEvent && (
              <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-green-200">
                <h3 className="font-bold mb-4">{events.find(ev => ev.id === editEvent.id) ? 'Editar' : 'Novo'} Evento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Data</label><input className={inputCls} type="date" value={editEvent.date} onChange={e => setEditEvent({ ...editEvent, date: e.target.value })} /></div>
                  <div><label className={labelCls}>Hora</label><input className={inputCls} type="time" value={editEvent.time} onChange={e => setEditEvent({ ...editEvent, time: e.target.value })} /></div>
                  <div><label className={labelCls}>Local (PT)</label><input className={inputCls} value={editEvent.location_pt} onChange={e => setEditEvent({ ...editEvent, location_pt: e.target.value })} /></div>
                  <div><label className={labelCls}>Local (EN)</label><input className={inputCls} value={editEvent.location_en} onChange={e => setEditEvent({ ...editEvent, location_en: e.target.value })} /></div>
                  <div><label className={labelCls}>Título (PT)</label><input className={inputCls} value={editEvent.title_pt} onChange={e => setEditEvent({ ...editEvent, title_pt: e.target.value })} /></div>
                  <div><label className={labelCls}>Título (EN)</label><input className={inputCls} value={editEvent.title_en} onChange={e => setEditEvent({ ...editEvent, title_en: e.target.value })} /></div>
                  <div><label className={labelCls}>Descrição (PT)</label><textarea className={inputCls} rows={3} value={editEvent.desc_pt} onChange={e => setEditEvent({ ...editEvent, desc_pt: e.target.value })} /></div>
                  <div><label className={labelCls}>Descrição (EN)</label><textarea className={inputCls} rows={3} value={editEvent.desc_en} onChange={e => setEditEvent({ ...editEvent, desc_en: e.target.value })} /></div>
                  <div className="col-span-2">
                    <label className={labelCls}>Imagem</label>
                    <input type="file" accept="image/*" onChange={e => handleUpload(e, url => setEditEvent({ ...editEvent, image: url }))} className="text-xs" />
                    {editEvent.image && <img src={editEvent.image} className="mt-2 h-16 rounded object-cover" />}
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      const exists = events.find(ev => ev.id === editEvent.id);
                      const updated = exists ? events.map(ev => ev.id === editEvent.id ? editEvent : ev) : [...events, editEvent];
                      setEvents(updated);
                      saveContent('events', updated);
                      setEditEvent(null);
                    }}
                    style={{ backgroundColor: 'var(--ujima-green)', color: '#fff' }}
                    className="px-5 py-2 rounded-full text-sm font-semibold"
                    disabled={saving}
                  >
                    {saving ? 'A guardar...' : 'Guardar'}
                  </button>
                  <button onClick={() => setEditEvent(null)} className="px-5 py-2 rounded-full text-sm border border-gray-300">Cancelar</button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {events.map((ev) => (
                <div key={ev.id} className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex justify-between items-start">
                  <div>
                    <p style={{ color: 'var(--ujima-green)' }} className="text-xs font-semibold">{ev.date} {ev.time && `• ${ev.time}`} • {ev.location_pt}</p>
                    <p className="font-bold mt-1">{ev.title_pt}</p>
                    <p className="text-sm text-gray-500 mt-1">{ev.desc_pt}</p>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <button onClick={() => setEditEvent(ev)} style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold hover:opacity-70">Editar</button>
                    <button
                      onClick={() => {
                        const updated = events.filter(e => e.id !== ev.id);
                        setEvents(updated);
                        saveContent('events', updated);
                      }}
                      className="text-sm text-red-500 font-semibold hover:opacity-70"
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Nenhum evento.</p>}
            </div>
          </div>
        )}

        {/* PAGES TAB */}
        {tab === 'pages' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <p style={{ color: 'var(--ujima-green)' }} className="text-sm font-semibold mb-4">
              Para editar o conteúdo das páginas (Início, Informação, Sobre Nós, Contacto), pode pedir ao agente Claude ou editar directamente o ficheiro <code className="bg-gray-100 px-1 rounded">content/pages.json</code>.
            </p>
            <p className="text-sm text-gray-500">
              Em breve: editor visual completo para todas as páginas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
