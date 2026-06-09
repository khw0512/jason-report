import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const API = import.meta.env.VITE_API_URL || "/api";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-4px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        {/* Image — fills top of card, no padding */}
        <div style={{ height: "280px", overflow: "hidden" }}>
          <img
            src={article.image_url}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Text block */}
        <div style={{ padding: "24px 28px 32px", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#999",
              marginBottom: "12px",
            }}
          >
            {formatDate(article.published_date)}
          </p>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "21px",
              fontWeight: 700,
              color: "#1a1208",
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

const FooterPhoto = () => (
  <div style={{ position: "relative", marginTop: "80px" }}>
    {/* Wave cutout on top */}
    <div
      style={{
        position: "absolute",
        top: -1,
        left: 0,
        right: 0,
        zIndex: 1,
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <path
          d="M0,0 L0,50 C200,80 350,20 550,50 C750,80 900,20 1200,45 L1200,0 Z"
          fill="#F2E8D4"
        />
      </svg>
    </div>

    <div style={{ height: "480px", overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
        alt="Mediterranean landscape"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>

    {/* Wave cutout on bottom */}
    <div
      style={{
        position: "absolute",
        bottom: -1,
        left: 0,
        right: 0,
        zIndex: 1,
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <path
          d="M0,80 L0,40 C150,10 300,60 500,35 C700,10 900,55 1200,25 L1200,80 Z"
          fill="#F2E8D4"
        />
      </svg>
    </div>
  </div>
);

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API}/articles`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length) setArticles(d);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ background: "#F2E8D4", minHeight: "100vh" }}>
      {/* Title */}
      <div className="articles-header">
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "44px",
            fontWeight: "normal",
            color: "#2C1A08",
          }}
        >
          All travel stories
        </h1>
      </div>

      {/* 2-column article grid */}
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Large footer photo with wave transitions */}
      <FooterPhoto />

      <Footer />
    </div>
  );
}
