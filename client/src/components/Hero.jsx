import { Link } from 'react-router-dom';

const HERO_BG = 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=80';

const DEFAULT_ARTICLE = {
  title: "Wild Camping Along Tasmania's East Coast",
  image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
};

const ArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

export default function Hero({ article }) {
  const a = article || DEFAULT_ARTICLE;

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Featured article card */}
      <Link to={`/articles/${a.id || 1}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '320px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div style={{ height: '220px', overflow: 'hidden' }}>
          <img
            src={a.image_url}
            alt={a.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px 12px 0 0',
            }}
          />
        </div>
        <div style={{ padding: '24px 28px 28px' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#888',
              letterSpacing: '0.5px',
              marginBottom: '10px',
            }}
          >
            Featured article
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.3,
            }}
          >
            {a.title}
          </h2>
        </div>
      </div>
      </Link>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', letterSpacing: '0.5px' }}>
          Scroll for more
        </span>
        <ArrowDown />
      </div>
    </section>
  );
}
