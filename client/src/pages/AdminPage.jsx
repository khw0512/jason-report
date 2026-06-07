import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth, authHeaders } from '../auth.jsx';

const API = import.meta.env.VITE_API_URL || '/api';

const INPUT_STYLE = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  color: '#1a1208',
  background: 'white',
  boxSizing: 'border-box',
};

const LABEL_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: '#555',
  marginBottom: '6px',
  display: 'block',
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

function BlockEditor({ blocks, onChange }) {
  function update(i, patch) {
    onChange(blocks.map((b, idx) => idx === i ? { ...b, ...patch } : b));
  }

  function remove(i) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  function move(i, dir) {
    const next = [...blocks];
    const swap = i + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[i], next[swap]] = [next[swap], next[i]];
    onChange(next);
  }

  return (
    <div>
      {blocks.map((block, i) => (
        <div
          key={i}
          style={{
            background: '#fafafa',
            border: '1px solid #e8e8e8',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {block.type === 'p' ? '문단' : '이미지'}
            </span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={arrowBtnStyle}>↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} style={arrowBtnStyle}>↓</button>
              <button type="button" onClick={() => remove(i)} style={{ ...arrowBtnStyle, color: '#bbb', fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>
          </div>

          {block.type === 'p' && (
            <textarea
              value={block.text}
              onChange={e => update(i, { text: e.target.value })}
              placeholder="본문 내용을 입력하세요…"
              rows={4}
              style={{ ...INPUT_STYLE, resize: 'vertical' }}
            />
          )}

          {block.type === 'img' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                value={block.url}
                onChange={e => update(i, { url: e.target.value })}
                placeholder="이미지 URL"
                style={INPUT_STYLE}
              />
              <input
                value={block.alt}
                onChange={e => update(i, { alt: e.target.value })}
                placeholder="이미지 설명 (alt)"
                style={INPUT_STYLE}
              />
              {block.url && (
                <img src={block.url} alt={block.alt} style={{ maxHeight: '160px', objectFit: 'cover', borderRadius: '6px', marginTop: '4px' }} />
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={() => onChange([...blocks, { type: 'p', text: '' }])}
          style={addBtnStyle}
        >
          + 문단 추가
        </button>
        <button
          type="button"
          onClick={() => onChange([...blocks, { type: 'img', url: '', alt: '' }])}
          style={addBtnStyle}
        >
          + 이미지 추가
        </button>
      </div>
    </div>
  );
}

const arrowBtnStyle = {
  background: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  color: '#666',
  cursor: 'pointer',
  fontSize: '13px',
  padding: '2px 7px',
  lineHeight: '1.4',
};

const addBtnStyle = {
  padding: '8px 16px',
  borderRadius: '8px',
  border: '1px dashed #ccc',
  background: 'white',
  fontFamily: "'Inter', sans-serif",
  fontSize: '13px',
  color: '#555',
  cursor: 'pointer',
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAuth();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(isEdit);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    location: '',
    published_date: new Date().toISOString().slice(0, 10),
    image_url: '',
    featured: false,
  });
  const [blocks, setBlocks] = useState([{ type: 'p', text: '' }]);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API}/articles/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d && d.id) {
          setForm({
            title: d.title || '',
            excerpt: d.excerpt || '',
            location: d.location || '',
            published_date: d.published_date ? d.published_date.slice(0, 10) : '',
            image_url: d.image_url || '',
            featured: d.featured || false,
          });
          setBlocks(Array.isArray(d.body) && d.body.length ? d.body : [{ type: 'p', text: '' }]);
        }
        setLoadingArticle(false);
      })
      .catch(() => setLoadingArticle(false));
  }, [id, isEdit]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.published_date) {
      setError('제목과 날짜는 필수입니다.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const url = isEdit ? `${API}/articles/${id}` : `${API}/articles`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
        body: JSON.stringify({ ...form, body: blocks }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      navigate(`/articles/${data.id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loadingArticle) {
    return (
      <div style={{ background: '#F2E8D4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', color: '#2C1A08' }}>불러오는 중…</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#F2E8D4', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <Link
            to="/admin"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#888', textDecoration: 'none' }}
          >
            ← 글 목록
          </Link>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 700, color: '#2C1A08', margin: 0 }}>
            {isEdit ? '글 수정' : '새 글 작성'}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic info */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
            <Field label="제목 *">
              <input
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="글 제목"
                style={INPUT_STYLE}
              />
            </Field>

            <Field label="요약 (excerpt)">
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                placeholder="목록 페이지에 표시될 짧은 요약"
                rows={2}
                style={{ ...INPUT_STYLE, resize: 'vertical' }}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="위치">
                <input
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  placeholder="예: Seoul, Korea"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field label="발행일 *">
                <input
                  type="date"
                  value={form.published_date}
                  onChange={e => set('published_date', e.target.value)}
                  style={INPUT_STYLE}
                />
              </Field>
            </div>

            <Field label="대표 이미지 URL">
              <input
                value={form.image_url}
                onChange={e => set('image_url', e.target.value)}
                placeholder="https://..."
                style={INPUT_STYLE}
              />
              {form.image_url && (
                <div style={{ marginTop: '10px', height: '160px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={form.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </Field>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#555' }}>
                대표(featured) 글로 설정
              </span>
            </label>
          </div>

          {/* Body blocks */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
            <label style={{ ...LABEL_STYLE, marginBottom: '16px' }}>본문</label>
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>

          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#c00', marginBottom: '16px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '12px 32px',
                borderRadius: '999px',
                border: 'none',
                background: '#2C1A08',
                color: 'white',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? '저장 중…' : isEdit ? '수정 완료' : '발행하기'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid #ccc',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#555',
                cursor: 'pointer',
              }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
