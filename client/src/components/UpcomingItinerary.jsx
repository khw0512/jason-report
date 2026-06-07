const SECTION_BG = '#4E5E28';
const ACCENT = '#C8D44A';
const TEXT_LIGHT = '#D4E070';
const DIVIDER = 'rgba(200,212,74,0.3)';

const DEFAULT_ITEMS = [
  {
    id: 1, order_num: 1,
    destination: 'Oaxaca', country: 'Mexico',
    start_date: 'March 12', end_date: 'March 25',
    description: 'For mole, markets, and Monte Albán',
    image_url: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=300&q=80',
  },
  {
    id: 2, order_num: 2,
    destination: 'Rome', country: 'Italy',
    start_date: 'June 9', end_date: 'June 30',
    description: 'Evening walks and neighborhood trattorias',
    image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=80',
  },
  {
    id: 3, order_num: 3,
    destination: 'Lofoten', country: 'Norway',
    start_date: 'October 20', end_date: 'October 28',
    description: 'Midnight sun, damp air, and drying cod',
    image_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&q=80',
  },
  {
    id: 4, order_num: 4,
    destination: 'Kagoshima', country: 'Japan',
    start_date: 'Dec 3', end_date: 'Dec 21',
    description: 'Admire Sakurajima from the ferry',
    image_url: 'https://images.unsplash.com/photo-1580956284941-8e0f7e4a0290?w=300&q=80',
  },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function ItineraryItem({ item, isLast }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '32px 0',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '72px',
            fontWeight: 300,
            color: ACCENT,
            opacity: 0.6,
            lineHeight: 1,
            minWidth: '90px',
          }}
        >
          {pad(item.order_num)}
        </span>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: ACCENT,
              marginBottom: '6px',
            }}
          >
            {item.destination}, {item.country}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: TEXT_LIGHT,
              marginBottom: '4px',
            }}
          >
            {item.start_date} – {item.end_date}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: TEXT_LIGHT,
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Image */}
        <div
          style={{
            width: '140px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={item.image_url}
            alt={item.destination}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {!isLast && (
        <div
          style={{
            borderTop: `1px dashed ${DIVIDER}`,
          }}
        />
      )}
    </>
  );
}

const WaveTop = () => (
  <div style={{ marginBottom: '-2px', lineHeight: 0 }}>
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
      <path
        d="M0,80 L0,40 C150,10 250,60 400,35 C550,10 650,55 800,30 C950,5 1050,50 1200,25 L1200,80 Z"
        fill={SECTION_BG}
      />
    </svg>
  </div>
);

export default function UpcomingItinerary({ items }) {
  const list = items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <>
      <WaveTop />
      <section style={{ background: SECTION_BG, padding: '20px 60px 80px' }}>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '48px',
            fontWeight: 700,
            fontStyle: 'italic',
            color: ACCENT,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Upcoming itinerary
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {list.map((item, i) => (
            <ItineraryItem key={item.id} item={item} isLast={i === list.length - 1} />
          ))}
        </div>
      </section>
    </>
  );
}
