import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "/api";

/* ── Train illustration SVG ─────────────────────────────────────────────── */
const TrainEnd = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "32px 0 48px",
    }}
  >
    <svg
      width="140"
      height="100"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple hand-drawn style train illustration */}
      <path
        d="M637.69 789c46.82-14.7 73.85 24.35 135.43-22.21s71.34-128.41 63.08-153.2c-16.52-64.58-60.08-84.11-63-125.54-3-41.93 41.23-57.69 20.65-120.95-26.45-81.3-65.48-61.71-71.49-70.72s15.32-27-19.83-97.32c-24.78-49.56-41.3-36-57.82-54.07s-4.5-27.36-21.78-39c-25.53-17.27-18.77 3.75-60.08-9C527.56 86 505 54.15 469.74 66.91c-82.17 29.72-55.73 87.7-72.25 105.72s-43.39 14.43-58.41 31-30 61.58-30 76.6 3 52.57 0 61.58-26.13-2.1-44.16 15.92-5.42 29.74-21.92 53.77-57.4 30.89-57.73 92.5c-0.4 75.85 33.41 81.6 26.69 111.23-7.56 33.32-35.1 84-6.56 136.59S282 840.4 340.57 838.9s39-19.53 75.1-19.53 73.59 24 139.68 10.51 53.33-31.75 82.34-40.88z"
        fill="#00757F"
      />
      <path
        d="M646 604.6c5.32 0 16.52 1.5 18 20.53a39.16 39.16 0 0 1-10.26 30.16s-9.26-10.14-11.26-20.15c-3.03-15.71 4.52-23.78 3.52-30.54zM754 688.08c-2.75-4.55-7.27-14.91 8.23-26a39.16 39.16 0 0 1 31.12-6.84s-3.88 13.17-11.41 20.07c-11.87 10.69-22.67 8.41-27.94 12.77zM398.35 593.07c5 1.94 14.84 7.42 9.3 25.68a39.16 39.16 0 0 1-20.55 24.35s-4.93-12.82-3.15-22.87c2.93-15.72 12.87-20.5 14.4-27.16zM331.52 535.27c5.25-0.87 16.54-1.22 21.13 17.31a39.16 39.16 0 0 1-5.2 31.43s-10.79-8.49-14.41-18c-5.52-15.01 0.57-24.23-1.52-30.74zM248.41 711.5c5.25-0.87 16.54-1.22 21.13 17.31a39.16 39.16 0 0 1-5.2 31.43s-10.79-8.49-14.41-18c-5.52-15.05 0.57-24.24-1.52-30.74zM465.43 430.07c5.29 0.56 16.27 3.23 15.76 22.31a39.16 39.16 0 0 1-13.38 28.92s-8.14-11.06-9.08-21.22c-1.33-15.95 6.99-23.18 6.7-30.01zM380.65 327.94c5.29 0.56 16.27 3.23 15.76 22.31A39.16 39.16 0 0 1 383 379.16s-8.14-11.06-9.08-21.22c-1.31-15.94 7.01-23.17 6.73-30zM481.56 223.27c5.32 0.1 16.49 1.82 17.63 20.87a39.16 39.16 0 0 1-10.84 30s-9.07-10.31-10.88-20.36c-2.7-15.78 4.96-23.78 4.09-30.51zM538 278.32c5.28-0.67 16.58-0.59 20.46 18.1a39.16 39.16 0 0 1-6.39 31.21s-10.46-8.89-13.71-18.58c-4.93-15.2 1.5-24.15-0.36-30.73zM614.89 179.31c5.29 0.55 16.28 3.2 15.81 22.27a39.16 39.16 0 0 1-13.32 28.95s-8.17-11-9.13-21.2c-1.36-15.94 6.94-23.2 6.64-30.02zM665 230.53c5.29 0.55 16.28 3.2 15.81 22.27a39.16 39.16 0 0 1-13.32 28.95s-8.17-11-9.13-21.2c-1.36-15.94 6.89-23.2 6.64-30.02zM698.68 321.54c5.31-0.36 16.58 0.39 19.35 19.28a39.16 39.16 0 0 1-8.22 30.78s-9.92-9.5-12.59-19.35c-4.04-15.48 2.91-24.04 1.46-30.71zM637.09 346.12c4.72-2.46 15.35-6.3 25.47 9.88a39.16 39.16 0 0 1 4.83 31.49s-12.9-4.71-19.3-12.67c-9.92-12.54-6.99-23.16-11-28.7zM679.4 451.67c4.5 0.29 13.89 2.17 14.13 18.34a33.19 33.19 0 0 1-10.32 25s-7.28-9.08-8.43-17.65c-1.69-13.5 5.1-19.92 4.62-25.69zM736.92 372.89c4.17-1.7 13.44-4.11 20.71 10.34a33.19 33.19 0 0 1 1.6 27s-10.51-5-15.29-12.2c-7.38-11.42-4.07-20.16-7.02-25.14zM491.11 328.54c4.17-1.7 13.44-4.11 20.71 10.34a33.19 33.19 0 0 1 1.6 27s-10.51-5-15.29-12.2c-7.38-11.42-4.07-20.16-7.02-25.14zM259.52 495.22c-4.29-1.39-12.92-5.53-9.16-21.26a33.19 33.19 0 0 1 16.16-21.63s4.81 10.59 3.81 19.19c-1.68 13.48-9.85 17.99-10.81 23.7zM244.43 584c-3.22-2.06-9.43-7.3-3-19.41a28.15 28.15 0 0 1 17.89-14.3s1.69 9.73-1 16.57c-4.21 10.69-11.88 12.67-13.89 17.14zM296.62 602.79c-3.22-2.06-9.43-7.3-3-19.41a28.15 28.15 0 0 1 17.89-14.3s1.69 9.73-1 16.57c-4.21 10.67-11.88 12.66-13.89 17.14zM332 342.07c-2.4-3-6.61-9.93 3.36-19.35a28.15 28.15 0 0 1 21.52-7.86s-1.5 9.76-6.2 15.39c-7.46 8.75-15.36 8.22-18.68 11.82zM365.78 269.79c-2.4-3-6.61-9.93 3.36-19.35a28.15 28.15 0 0 1 21.52-7.86s-1.5 9.76-6.2 15.39c-7.46 8.77-15.35 8.21-18.68 11.82zM444.16 258.72c-3.79 0.48-11.92 0.42-14.71-13a28.15 28.15 0 0 1 4.55-22.45s7.52 6.39 9.86 13.35c3.6 10.93-1.02 17.38 0.3 22.1zM448.46 318c-3.54 1.45-11.39 3.52-17.59-8.72a28.15 28.15 0 0 1-1.42-22.86s8.93 4.21 13 10.32c6.28 9.65 3.5 17.07 6.01 21.26zM491.38 196.75c-3.77 0.63-11.89 0.88-15.2-12.44a28.15 28.15 0 0 1 3.73-22.6s7.76 6.1 10.36 13c3.98 10.76-0.39 17.36 1.11 22.04zM575.77 176.12c2.87 2.52 8.21 8.65 0 19.64a28.15 28.15 0 0 1-19.86 11.42s-0.19-9.87 3.48-16.23c5.83-9.95 13.72-10.71 16.38-14.83zM620.08 293.21c-3.81 0.37-11.93 0.08-14.33-13.42a28.15 28.15 0 0 1 5.23-22.3s7.34 6.6 9.47 13.63c3.25 11.02-1.56 17.32-0.37 22.09zM603.76 397c-3.81 0.37-11.93 0.08-14.33-13.42a28.15 28.15 0 0 1 5.23-22.3s7.34 6.6 9.47 13.63c3.25 11.01-1.56 17.31-0.37 22.09z"
        fill="#5CB087"
      />
      <path
        d="M515.53 671.23s24.08-63.58 20.94-102.15-10.33-139-10.33-139h27.21l13 129.42 27-129.42 20 12.32s-22 86.09-31.06 150.68-17.77 129.68-17.9 146.7c0 0 29.24-14.12 57.11-28.59s59.93-56.09 71.94-56.81 20 18.31 20 22.31-57.79 53.07-76.46 63.08-41.7 14-58.72 36S546.48 839.9 547.91 892s4.43 68.09 4.43 68.09H469.9s0.34-111.14-4.67-157.2-5-83.36-12-114.77-39.48-106.62-56.79-128.59S309 475.82 296 430.07c-10-19.89 6-27.08 12-19.89s53.07 102.3 93.12 118.33c-10.49-41.05-56.07-101.13-52.07-109.14s25.91-13 34.48-5 1.56 22.72 29.6 59.42 40.34 47.93 63.73 93.38 38.67 104.06 38.67 104.06z"
        fill="#005866"
      />
    </svg>
  </div>
);

/* ── "Latest stories" bottom section ────────────────────────────────────── */
function LatestCard({ article }) {
  function formatDate(d) {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
    <Link to={`/articles/${article.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "white",
          borderRadius: "14px",
          overflow: "hidden",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-4px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <div style={{ height: "220px", overflow: "hidden" }}>
          <img
            src={article.image_url}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ padding: "20px 24px 28px", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#999",
              marginBottom: "10px",
            }}
          >
            {formatDate(article.published_date)}
          </p>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "19px",
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

function LatestStories({ currentId }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API}/articles`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setArticles(d.filter((a) => a.id !== Number(currentId)).slice(0, 4));
        }
      })
      .catch(() => {});
  }, [currentId]);

  if (!articles.length) return null;

  return (
    <div style={{ background: "#4E5E28", padding: "60px 60px 80px" }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "42px",
          fontWeight: 700,
          color: "#F2E8D4",
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        Latest travel stories
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {articles.map((a) => (
          <LatestCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}

/* ── Main page component ─────────────────────────────────────────────────── */
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("main")?.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API}/articles/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d && d.id) setArticle(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          background: "#F2E8D4",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "20px",
            color: "#2C1A08",
          }}
        >
          Loading…
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div
        style={{
          background: "#F2E8D4",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "24px",
            color: "#2C1A08",
          }}
        >
          Article not found.
        </p>
      </div>
    );
  }

  const body = Array.isArray(article.body) ? article.body : [];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Hero image */}
      <div
        style={{
          width: "100%",
          height: "65vh",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        <img
          src={article.image_url}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title + meta */}
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          padding: "52px 40px 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "42px",
            fontWeight: 700,
            color: "#1a1208",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          {article.title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            color: "#999",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "40px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CalIcon /> {formatDate(article.published_date)}
          </span>
          {article.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <PinIcon /> {article.location}
            </span>
          )}
        </div>

        <div
          style={{
            borderTop: "1px dashed rgba(0,0,0,0.15)",
            marginBottom: "44px",
          }}
        />
      </div>

      {/* Article body */}
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "0 40px" }}>
        {body.map((block, i) => {
          if (block.type === "p") {
            return (
              <p
                key={i}
                style={{
                  fontFamily: "paperlogy",
                  fontWeight: 300,
                  fontSize: "17px",
                  color: "#1a1208",
                  lineHeight: 1.85,
                  marginBottom: "28px",
                }}
              >
                {block.text}
              </p>
            );
          }
          if (block.type === "img") {
            return (
              <div key={i} style={{ margin: "40px 0" }}>
                <img
                  src={block.url}
                  alt={block.alt}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "4px",
                  }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* End decoration */}
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            borderTop: "1px dashed rgba(0,0,0,0.15)",
            marginTop: "16px",
          }}
        />
        <TrainEnd />
      </div>

      {/* Latest travel stories */}
      <LatestStories currentId={id} />
    </div>
  );
}
