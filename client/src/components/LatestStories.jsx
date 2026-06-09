import { Link } from 'react-router-dom';

const SECTION_BG = '#F2E8D4';


function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ height: '220px', overflow: 'hidden' }}>
        <img
          src={article.image_url}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '20px 24px 28px' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#999',
            marginBottom: '10px',
          }}
        >
          {formatDate(article.published_date)}
        </p>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '20px',
            fontWeight: 700,
            color: '#1a1208',
            lineHeight: 1.35,
          }}
        >
          {article.title}
        </h3>
      </div>
    </div>
    </Link>
  );
}

export default function LatestStories({ articles }) {
  const list = articles;

  return (
    <section className="section-latest" style={{ background: SECTION_BG }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '42px',
          fontWeight: 700,
          color: '#2C1A08',
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        Latest travel stories
      </h2>

      <div className="latest-grid">
        {list.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link
          to="/articles"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: '#2C1A08',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          View all articles
        </Link>
      </div>
    </section>
  );
}
