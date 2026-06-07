import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

const API = import.meta.env.VITE_API_URL || '/api';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '로그인 실패');
      login(data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: '#F2E8D4',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '360px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#2C1A08',
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          관리자 로그인
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#999',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          The Roam Report
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: error ? '1px solid #e00' : '1px solid #ddd',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#1a1208',
              background: 'white',
              boxSizing: 'border-box',
              marginBottom: '12px',
              outline: 'none',
            }}
          />

          {error && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#c00',
                marginBottom: '12px',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: '#2C1A08',
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              opacity: loading || !password ? 0.5 : 1,
            }}
          >
            {loading ? '확인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
