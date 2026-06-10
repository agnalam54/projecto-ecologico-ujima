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
    <div style={{ backgroundColor: 'var(--ujima-dark)', minHeight: '100vh' }} className="flex items-center justify-center px-4">
      <div style={{ backgroundColor: '#1e2e1f', border: '1px solid var(--ujima-green)' }} className="w-full max-w-sm rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div
            style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4"
          >
            U
          </div>
          <h1 style={{ color: 'var(--ujima-cream)' }} className="text-xl font-bold">Admin</h1>
          <p style={{ color: 'var(--ujima-green-light)' }} className="text-sm mt-1">Projecto Ecológico UJIMA</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label style={{ color: 'var(--ujima-green-light)' }} className="block text-xs font-semibold mb-1 uppercase tracking-wider">
              Utilizador
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ backgroundColor: '#131F14', border: '1px solid var(--ujima-green)', color: 'var(--ujima-cream)' }}
              className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label style={{ color: 'var(--ujima-green-light)' }} className="block text-xs font-semibold mb-1 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: '#131F14', border: '1px solid var(--ujima-green)', color: 'var(--ujima-cream)' }}
              className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: 'var(--ujima-yellow)', color: 'var(--ujima-dark)' }}
            className="py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
