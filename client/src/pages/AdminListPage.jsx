import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, authHeaders } from '../auth.jsx';

const API = import.meta.env.VITE_API_URL || '/api';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function AdminListPage() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch(`${API}/articles`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setArticles(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(article) {
    if (!window.confirm(`"${article.title}" 을(를) 삭제할까요?`)) return;
    setDeletingId(article.id);
    try {
      await fetch(`${API}/articles/${article.id}`, { method: 'DELETE', headers: authHeaders(token) });
      setArticles(prev => prev.filter(a => a.id !== article.id));
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ background: '#F2E8D4', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 700, color: '#2C1A08' }}>
            글 관리
          </h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link
              to="/admin/new"
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                background: '#2C1A08',
                color: 'white',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              + 새 글 작성
            </Link>
            <button
              onClick={logout}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                border: '1px solid #ccc',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#888',
                cursor: 'pointer',
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <p style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>불러오는 중…</p>
        ) : articles.length === 0 ? (
          <p style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>아직 글이 없습니다.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {articles.map(article => (
              <div
                key={article.id}
                style={{
                  background: 'white',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {/* Thumbnail */}
                {article.image_url ? (
                  <div style={{ width: '72px', height: '52px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={article.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: '72px', height: '52px', flexShrink: 0, borderRadius: '8px', background: '#eee' }} />
                )}

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {article.featured && (
                      <span style={{ color: '#c9a227', display: 'flex', alignItems: 'center' }}>
                        <StarIcon filled />
                      </span>
                    )}
                    <Link
                      to={`/articles/${article.id}`}
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#1a1208',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.title}
                    </Link>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#999' }}>
                    <span>{formatDate(article.published_date)}</span>
                    {article.location && <span>· {article.location}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => navigate(`/admin/edit/${article.id}`)}
                    title="수정"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      background: 'white',
                      color: '#444',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <PencilIcon /> 수정
                  </button>
                  <button
                    onClick={() => handleDelete(article)}
                    disabled={deletingId === article.id}
                    title="삭제"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid #fcc',
                      background: 'white',
                      color: '#c00',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      cursor: deletingId === article.id ? 'not-allowed' : 'pointer',
                      opacity: deletingId === article.id ? 0.5 : 1,
                    }}
                  >
                    <TrashIcon /> 삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
