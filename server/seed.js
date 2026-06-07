require('dotenv').config();
const pool = require('./db');

async function seed() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      current_location VARCHAR(255),
      latitude VARCHAR(50),
      longitude VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      published_date DATE NOT NULL,
      image_url TEXT,
      featured BOOLEAN DEFAULT FALSE,
      location VARCHAR(255),
      body JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS itinerary (
      id SERIAL PRIMARY KEY,
      order_num INTEGER NOT NULL,
      destination VARCHAR(255) NOT NULL,
      country VARCHAR(100),
      start_date VARCHAR(50),
      end_date VARCHAR(50),
      description TEXT,
      image_url TEXT
    );
  `);

  // Add new columns if upgrading existing DB
  await pool.query(`
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS location VARCHAR(255);
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS body JSONB;
  `);

  await pool.query('TRUNCATE settings, articles, itinerary RESTART IDENTITY CASCADE');

  await pool.query(`
    INSERT INTO settings (current_location, latitude, longitude)
    VALUES ('Dallol, Ethiopia', '14.2417° N', '40.3169° E')
  `);

  const articles = [
    {
      title: "Wild Camping Along Tasmania's East Coast",
      excerpt: "A journey through remote coastlines, dramatic cliffs, and pristine wilderness on Australia's island state.",
      published_date: '2025-10-20',
      image_url: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80',
      featured: true,
      location: 'Tasmania, Australia',
      body: [
        { type: 'p', text: "Tasmania's east coast doesn't greet you gently. The wind comes in off the Tasman Sea with a kind of conviction, and the light — even in summer — shifts fast, from gold to grey in the space of a breath. I arrived with a van, a tent, and a plan I'd abandoned by day two." },
        { type: 'p', text: "Wild camping here means finding a pull-off that feels right and staying until it doesn't. There are no designated sites, no check-in times. Just the rhythm of tide and wind and the occasional ranger who waves and drives on." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=800&q=80', alt: 'Coastal Tasmania' },
        { type: 'p', text: "The cliffs at Cape Hauy were the strangest quiet I'd found. Dolerite columns rising straight out of the ocean, birds circling below the level of your feet. I sat there long enough that the cold stopped bothering me." },
        { type: 'p', text: "On the last night I camped beside a lagoon, freshwater and saltwater separated by a strip of sand. The stars were close enough to feel structural, as if they were holding something up. I didn't sleep much. I didn't want to." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', alt: 'Stars over Tasmania' },
        { type: 'p', text: "When I left, nothing had changed. The coast was exactly as I'd found it. That felt like the whole point." },
      ],
    },
    {
      title: 'Finding Stillness in the Hills of San Cristóbal',
      excerpt: 'Quiet mornings, colonial streets, and the unexpected peace of a highland Mexican city.',
      published_date: '2025-10-10',
      image_url: 'https://images.unsplash.com/photo-1570373733126-d5b9b3a9b74e?w=800&q=80',
      featured: false,
      location: 'Mexico',
      body: [
        { type: 'p', text: "There's a kind of quiet in San Cristóbal that doesn't ask anything of you. No itinerary. No must-see list. Just the low hush of pine trees and the occasional creak of a wooden door left open. I arrived here tired in a way that wasn't entirely physical—worn down by months of motion and noise I'd convinced myself was momentum." },
        { type: 'p', text: "The house I stayed in was the color of clay. Mornings began with the sound of roosters in the valley below, and ended with wine on the porch, watching shadows stretch across the hillside. There wasn't much to do, which turned out to be the point. I read entire books in one sitting. I walked barefoot on tile. I listened to the rain as if it were saying something back." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1558618047-f4e70caa4c4a?w=800&q=80', alt: 'San Cristóbal street' },
        { type: 'img', url: 'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80', alt: 'Landscape' },
        { type: 'p', text: "San Cristóbal has a rhythm that doesn't sync with the outside world. Days moved slowly, punctuated by markets, hand-washed clothes, and the smell of roasted coffee. I wandered cobbled streets without a destination, often turning around just because a corner looked better from the other side. For the first time in a while, I wasn't collecting experiences—I was letting them settle." },
        { type: 'p', text: "Stillness is a strange thing to seek when you're used to going. It feels unproductive, even indulgent. But in San Cristóbal, it felt necessary. Not a pause, but a kind of reset. A reminder that pace and presence are not the same thing—and that one doesn't require the other." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Market' },
        { type: 'p', text: "When I left, nothing had changed, except maybe me. I packed the same bags, took the same roads, and headed toward the next stop. But I carried something new with me: the memory of a quiet place that asked for nothing and gave me everything I didn't know I needed." },
      ],
    },
    {
      title: 'Wandering Through the Streets of Rome',
      excerpt: 'Getting lost in the eternal city, one neighborhood at a time.',
      published_date: '2025-10-02',
      image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
      featured: false,
      location: 'Italy',
      body: [
        { type: 'p', text: "Rome is a city you don't navigate so much as surrender to. Every street leads somewhere surprising, and the fastest route is rarely the right one. I gave up on maps on the second day and simply walked." },
        { type: 'p', text: "The neighborhood of Trastevere moves on its own clock — slower than the tourist center, louder after midnight. Laundry hangs between windows. Cats sleep on warm cobblestones. Old men sit outside bars that haven't changed in thirty years." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80', alt: 'Rome street' },
        { type: 'p', text: "I spent one afternoon in a small church near Campo de' Fiori, not because I'm religious, but because the light through old glass does something to time. It slows it. Bends it. The centuries stack up quietly in places like that." },
        { type: 'p', text: "Evenings I ate late — the Roman way — at a table on the street, watching the city slow down into something softer. No rush. Just wine, bread, and the understanding that some cities are best experienced at night." },
      ],
    },
    {
      title: 'Driving Across Monument Valley',
      excerpt: 'The open road, red sandstone, and a rearview mirror full of wonder.',
      published_date: '2025-09-17',
      image_url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80',
      featured: false,
      location: 'USA',
      body: [
        { type: 'p', text: "There's a moment, driving east on Highway 163, when the buttes appear on the horizon and you understand why this place has been filmed a thousand times. It's not the scale — though the scale is extraordinary. It's the silence. Monument Valley absorbs sound differently." },
        { type: 'p', text: "I drove through at dusk when the mesas go red-orange and the shadows stretch long and dramatic. Pulled over twice just to stand there. Didn't take photos the second time. Some things are better kept in the body, not the camera roll." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Desert landscape' },
        { type: 'p', text: "The Navajo Nation land requires a kind of respect that goes beyond the usual tourist etiquette. This is not a backdrop. It's a home, a living culture, a place where the land itself carries history that predates every road that crosses it." },
        { type: 'p', text: "I camped outside the valley that night, and in the morning the light was different — cooler, bluer — and the whole landscape had shifted. That's the thing about the desert: it reinvents itself daily." },
      ],
    },
    {
      title: 'Walking the Terraces of Northern Vietnam',
      excerpt: 'Harvest season, golden rice, and the warmth of remote hill communities.',
      published_date: '2025-09-02',
      image_url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      featured: false,
      location: 'Vietnam',
      body: [
        { type: 'p', text: "The terraces of Mu Cang Chai are best seen in September, when the rice turns gold. I arrived a week into harvest season, and the hillsides were full of movement — women in indigo, baskets balanced perfectly, a rhythm that looked effortless and was anything but." },
        { type: 'p', text: "I walked for three days through villages that see few outsiders. The paths are narrow and steep and sometimes disappear entirely. You navigate by landmarks — a particular bend of bamboo, a shrine at a fork, the sound of water below." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80', alt: 'Vietnam terraces' },
        { type: 'p', text: "I stayed with a family in a longhouse near the top of a ridge. Dinner was whatever had been grown within walking distance. Sleep came early, and hard, and deep in the way that only altitude and honest tiredness can produce." },
        { type: 'p', text: "What I took home wasn't a photograph, though I took many. It was the understanding that beauty here is functional. The terraces exist to feed people. The aesthetics are a byproduct of precision and tradition, not intention. That made them more beautiful, not less." },
      ],
    },
    {
      title: 'Admiring the Clifftops of the Lycian Coast',
      excerpt: 'Sea cliffs, ancient ruins, and four days on the Lycian Way.',
      published_date: '2025-08-20',
      image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
      featured: false,
      location: 'Turkey',
      body: [
        { type: 'p', text: "The Lycian Way doesn't ask for much — just a pair of good shoes, water, and the willingness to get slightly lost. The trail runs along sea cliffs for much of its length, and the views are the kind that make you stop mid-step." },
        { type: 'p', text: "I joined a group of walkers near Ölüdeniz and spent four days moving east, sleeping in small pensions and once on a flat rock above the sea. The Turkish coast in August is hot in the middle of the day, but the evenings are perfect — cool air off the water, the smell of thyme and pine." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80', alt: 'Turkish coastline' },
        { type: 'p', text: "The ruins along the trail are casual, almost unremarkable by local standards — a carved sarcophagus by the path, a Lycian tomb cut into a cliff face. History here is ordinary, which somehow makes it more interesting." },
      ],
    },
    {
      title: 'Waiting by the Shores of the Red Sea',
      excerpt: 'Three slow days in Aqaba, between borders and salt water.',
      published_date: '2025-08-01',
      image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
      featured: false,
      location: 'Jordan',
      body: [
        { type: 'p', text: "Aqaba is a city between things. Bordered by Saudi Arabia, Israel, and Egypt — all visible from the right hillside — it has the feeling of a place that knows it's on the edge of something. The Red Sea here is impossibly clear and warm even in the shade." },
        { type: 'p', text: "I spent three days not doing much. Mornings at the water. Long lunches of mezze and cold mint tea. Afternoons in the shadow of a hotel balcony, watching ferries move toward the horizon. There was something deeply restful about it — a city with nowhere urgent to be." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Coastal scenery' },
        { type: 'p', text: "The diving is the main event for most visitors. I snorkeled instead — less gear, more time floating — and found coral gardens just twenty meters from shore that felt like a different planet." },
      ],
    },
    {
      title: 'Tracing Trails Through the Dolomite Highlands',
      excerpt: 'A week above the treeline in the Italian Alps.',
      published_date: '2025-07-30',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      featured: false,
      location: 'Italy',
      body: [
        { type: 'p', text: "The Dolomites don't look real. The rock is too vertical, too sharp, the color wrong — pale orange and white in a way that photographs can't quite capture. You have to be there for the light to make sense of it." },
        { type: 'p', text: "I hiked for a week around the Tre Cime, mostly above the treeline, mostly in the company of clouds. The rifugios — mountain huts — are the infrastructure of walking here. Hot soup, a bed, candles on the table. Simple in all the right ways." },
        { type: 'img', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', alt: 'Mountain landscape' },
        { type: 'p', text: "The passes are the hard part. The descent afterward is the reward — long switchbacks dropping back into meadows and the smell of hay. After a week at altitude, returning to the valley felt like entering another country." },
        { type: 'p', text: "I'd go back in winter when the trails are buried. A different mountain, the same rock." },
      ],
    },
  ];

  for (const a of articles) {
    await pool.query(
      `INSERT INTO articles (title, excerpt, published_date, image_url, featured, location, body)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [a.title, a.excerpt, a.published_date, a.image_url, a.featured, a.location, JSON.stringify(a.body)]
    );
  }

  await pool.query(`
    INSERT INTO itinerary (order_num, destination, country, start_date, end_date, description, image_url) VALUES
    (1, 'Oaxaca', 'Mexico', 'March 12', 'March 25', 'For mole, markets, and Monte Albán', 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80'),
    (2, 'Rome', 'Italy', 'June 9', 'June 30', 'Evening walks and neighborhood trattorias', 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80'),
    (3, 'Lofoten', 'Norway', 'October 20', 'October 28', 'Midnight sun, damp air, and drying cod', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80'),
    (4, 'Kagoshima', 'Japan', 'Dec 3', 'Dec 21', 'Admire Sakurajima from the ferry', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80')
  `);

  console.log('Database seeded successfully!');
  await pool.end();
}

seed().catch(console.error);
