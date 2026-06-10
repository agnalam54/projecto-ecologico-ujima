'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Credenciais inválidas');
    }
    setLoading(false);
  }

  return (
    <html lang="pt">
      <body style={{ margin: 0, backgroundColor: '#131F14', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#1e2e1f', border: '1px solid #2D6A4F', borderRadius: 16, padding: 32, width: '100%', maxWidth: 360, boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ backgroundColor: '#F4C430', color: '#131F14', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 24, margin: '0 auto 12px' }}>U</div>
            <h1 style={{ color: '#F9F7F0', margin: 0, fontSize: 20, fontWeight: 700 }}>Admin</h1>
            <p style={{ color: '#52B788', margin: '4px 0 0', fontSize: 13 }}>Projecto Ecológico UJIMA</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ color: '#52B788', display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Utilizador</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ backgroundColor: '#131F14', border: '1px solid #2D6A4F', color: '#F9F7F0', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ color: '#52B788', display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: '#131F14', border: '1px solid #2D6A4F', color: '#F9F7F0', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0, textAlign: 'center' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#F4C430', color: '#131F14', border: 'none', borderRadius: 24, padding: '12px 0', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 4, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'A entrar...' : 'Entrar'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12 }}>
            <a href="/pt" style={{ color: '#52B788', textDecoration: 'none' }}>← Voltar ao site</a>
          </p>
        </div>
      </body>
    </html>
  );
}
