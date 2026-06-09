import Footer from "../components/Footer.jsx";

const OLIVE = "#4E5E28";
const ACCENT = "#C8D44A";
const TEXT = "#D4E4A0";
const DIVIDER = "rgba(200,212,74,0.25)";

const WaveBottom = () => (
  <div style={{ lineHeight: 0, marginTop: "-2px" }}>
    <svg
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "90px" }}
    >
      <path
        d="M0,90 L0,45 C150,15 280,65 480,38 C680,12 820,60 1000,32 C1100,18 1160,50 1200,35 L1200,90 Z"
        fill="#F2E8D4"
      />
    </svg>
  </div>
);

const Row = ({ label, children, isLast }) => (
  <>
    <div className="about-row">
      {/* Left: section label */}
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "42px",
          fontWeight: 700,
          fontStyle: "italic",
          color: ACCENT,
          lineHeight: 1,
          margin: 0,
        }}
      >
        {label}
      </h2>

      {/* Right: content */}
      <div>{children}</div>
    </div>

    {/* Dashed divider */}
    {!isLast && (
      <div style={{ borderTop: `1px dashed ${DIVIDER}`, width: "100%" }} />
    )}
  </>
);

export default function AboutPage() {
  return (
    <div style={{ background: "#F2E8D4", minHeight: "100vh" }}>
      {/* Main olive section */}
      <div style={{ background: OLIVE }}>
        {/* Hero: large circle-cropped portrait */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "60px",
          }}
        >
          <div className="about-portrait">
            <img
              src="/images/main.jpeg"
              alt="Jason — The Roam Report"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Text rows */}
        <div className="about-rows">
          <Row label="About">
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "17px",
                color: TEXT,
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Hi, I'm Jason — a slow traveler with a soft spot for train
              stations, street snacks, and places that don't make the
              guidebooks. The Roam Report is my way of remembering: the long
              walks, wrong turns, and all the quiet in-between moments that make
              a place feel real.
            </p>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "17px",
                color: TEXT,
                lineHeight: 1.8,
              }}
            >
              Currently roaming. Eventually home.
            </p>
          </Row>

          <div style={{ borderTop: `1px dashed ${DIVIDER}` }} />

          <Row label="Contact" isLast>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "17px",
                color: TEXT,
                lineHeight: 1.8,
              }}
            >
              Want to collaborate, pitch a trip, or say hi? Send a note to{" "}
              <a
                href="mailto:hwunderstand@gmail.com"
                style={{
                  color: TEXT,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                hwunderstand@gmail.com
              </a>{" "}
              — I check it more often than I check train times.
            </p>
          </Row>

          <div style={{ borderTop: `1px dashed ${DIVIDER}` }} />
        </div>

        {/* Wave transition to cream */}
        <WaveBottom />
      </div>

      {/* Cream footer area */}
      <div style={{ background: "#F2E8D4", paddingTop: "40px" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(44,26,8,0.3)",
            textAlign: "center",
            marginBottom: "40px",
            letterSpacing: "0.5px",
          }}
        >
          End of the trail
        </p>
        <Footer />
      </div>
    </div>
  );
}
