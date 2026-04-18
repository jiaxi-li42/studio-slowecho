/* ============================================================
   LOCATION DATA — js/data/locations.js
   ============================================================
   To add a location: copy one object, fill in all fields, save.
   To add real images: add an `images` array of file paths.
     e.g.  images: ['assets/calton-hill-1.jpg', ...]
   If `images` is omitted, the placeholder SVG is used.

   Field reference:
   ─────────────────────────────────────────────────────────────
   id           string   URL-safe slug (unique)
   name         string   Display name
   type         string   Primary type (first entry of `types`)
   types        string[] All applicable filter categories
   description  string   Short description shown on the card
   lat          number   Latitude  (WGS 84)
   lng          number   Longitude (WGS 84)
   bestTime     string   Recommended time of day / light condition
   duration     number   Estimated shoot duration in minutes
   traffic      string   'Low' | 'Moderate' | 'High'
   openingTimes string   Access hours or notes
   images       string[] Optional — paths to real images (overrides placeholder)
   ============================================================ */

export const locations = [

  {
    id: 'advocates-close',
    name: "Advocate's Close",
    type: 'historic-street',
    types: ['historic-street'],
    description: "A steep, atmospheric close off the Royal Mile with dramatic stone stairways and framed city views. One of Edinburgh's most character-rich alleyways — narrow, layered, and full of texture.",
    lat: 55.9496,
    lng: -3.1912,
    bestTime: 'Morning for shafts of directional light',
    duration: 20,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'calton-hill',
    name: 'Calton Hill',
    type: 'viewpoint',
    types: ['viewpoint', 'greenspace'],
    description: 'Panoramic views over the Old Town skyline, the Firth of Forth, and beyond. Home to the National Monument and Nelson\'s Monument, with open grassy slopes perfect for lifestyle and portrait work.',
    lat: 55.9554,
    lng: -3.1820,
    bestTime: 'Sunrise or sunset (golden hour)',
    duration: 60,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'circus-lane',
    name: 'Circus Lane',
    type: 'hidden-gem',
    types: ['historic-street', 'hidden-gem'],
    description: 'A hidden cobbled mews in Stockbridge, lined with pastel-painted cottages and climbing greenery. One of Edinburgh\'s most charming and lesser-known backstreets.',
    lat: 55.9574,
    lng: -3.2053,
    bestTime: 'Morning with dappled light',
    duration: 20,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'cockburn-street',
    name: 'Cockburn Street',
    type: 'historic-street',
    types: ['historic-street'],
    description: 'A curving Victorian street winding from the Royal Mile down to Waverley, lined with independent boutiques and mosaic pavements. Colourful, layered, and full of urban character.',
    lat: 55.9490,
    lng: -3.1910,
    bestTime: 'Early morning before shops open',
    duration: 30,
    traffic: 'High',
    openingTimes: 'Open 24 hours (quietest before 09:00)',
  },

  {
    id: 'dean-village',
    name: 'Dean Village',
    type: 'hidden-gem',
    types: ['greenspace', 'waterside', 'hidden-gem'],
    description: 'A hidden riverside hamlet tucked below street level, with stone mill buildings and the Water of Leith winding through. A tranquil, storybook setting just minutes from the city centre.',
    lat: 55.9549,
    lng: -3.2131,
    bestTime: 'Mid-morning with dappled riverside light',
    duration: 45,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'greyfriars-bobby',
    name: 'Greyfriars Bobby',
    type: 'hidden-gem',
    types: ['architecture', 'hidden-gem'],
    description: "The iconic bronze terrier and surrounding Greyfriars Kirk churchyard. Atmospheric stonework, moss-covered monuments, and rich history make this a compact but deeply evocative location.",
    lat: 55.9471,
    lng: -3.1927,
    bestTime: 'Overcast mornings or blue hour',
    duration: 20,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'holyrood-park',
    name: 'Holyrood Park',
    type: 'viewpoint',
    types: ['viewpoint', 'greenspace', 'hidden-gem'],
    description: "A wild Highland landscape within the city — dramatic cliffs, St Margaret's Loch, and open heathland. Exceptional variety of terrain for adventurous, romantic, or fine-art shoots.",
    lat: 55.9421,
    lng: -3.1706,
    bestTime: 'Golden hour; any time for overcast drama',
    duration: 75,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'new-college',
    name: 'New College',
    type: 'architecture',
    types: ['architecture'],
    description: 'The neo-gothic twin spires of New College rise dramatically from The Mound, framing a courtyard of worn stone and ecclesiastical detail. Striking in any light.',
    lat: 55.9504,
    lng: -3.1953,
    bestTime: 'Overcast for even light on stonework',
    duration: 25,
    traffic: 'Low',
    openingTimes: 'Exterior accessible 24 hours',
  },

  {
    id: 'old-college',
    name: 'Old College',
    type: 'architecture',
    types: ['architecture'],
    description: "Robert Adam's grand neoclassical quadrangle at the heart of Edinburgh University. Stately columns, cobbled courtyards, and the iconic dome make for an elegant architectural backdrop.",
    lat: 55.9474,
    lng: -3.1851,
    bestTime: 'Early morning before students arrive',
    duration: 30,
    traffic: 'Low',
    openingTimes: 'Courtyard open Mon–Fri 08:00–18:00',
  },

  {
    id: 'portobello-beach',
    name: 'Portobello Beach',
    type: 'waterside',
    types: ['waterside'],
    description: "Edinburgh's seaside escape — wide sandy beach, a Victorian promenade, and open skies that stretch to the Firth of Forth. Perfect for natural light portraits and relaxed coastal lifestyle work.",
    lat: 55.9569,
    lng: -3.1082,
    bestTime: 'Golden hour or overcast for soft, even light',
    duration: 60,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'ross-fountain',
    name: 'Ross Fountain',
    type: 'architecture',
    types: ['architecture', 'greenspace'],
    description: 'The ornate Victorian fountain at the heart of Princes Street Gardens, with Edinburgh Castle rising as a backdrop. A compact, painterly setting rich in detail and grandeur.',
    lat: 55.9510,
    lng: -3.2023,
    bestTime: 'Mid-morning for castle backdrop in full light',
    duration: 20,
    traffic: 'Moderate',
    openingTimes: 'Gardens open 24 hours',
  },

  {
    id: 'scott-monument',
    name: 'Scott Monument',
    type: 'architecture',
    types: ['architecture'],
    description: 'The towering Victorian gothic spire on Princes Street, rising 61 metres above the gardens. A dramatic architectural anchor for city portraits — best viewed from East Princes Street Gardens.',
    lat: 55.9519,
    lng: -3.1936,
    bestTime: 'Early morning or blue hour',
    duration: 30,
    traffic: 'High',
    openingTimes: 'Monument 10:00–18:00; exterior 24 hours',
  },

  {
    id: 'st-giles-cathedral',
    name: "St. Giles' Cathedral",
    type: 'architecture',
    types: ['architecture'],
    description: 'The High Kirk of Edinburgh dominates the Royal Mile with its ornate crown spire and medieval stonework. Magnificent in any light — exterior details reward close attention.',
    lat: 55.9496,
    lng: -3.1925,
    bestTime: 'Overcast for even stone tones',
    duration: 30,
    traffic: 'High',
    openingTimes: 'Mon–Fri 09:00–19:00, Sat 09:00–17:00, Sun 13:00–17:00',
  },

  {
    id: 'the-cowgate',
    name: 'The Cowgate',
    type: 'historic-street',
    types: ['historic-street'],
    description: 'A sunken medieval street running beneath the South Bridge arches — raw stone, dramatic vaults, and a gritty urban atmosphere unlike anywhere else in the city.',
    lat: 55.9480,
    lng: -3.1900,
    bestTime: 'Blue hour or night for dramatic uplighting',
    duration: 25,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'the-meadows',
    name: 'The Meadows',
    type: 'greenspace',
    types: ['greenspace', 'hidden-gem'],
    description: 'Open parkland just south of the Old Town, with long tree-lined paths and open views back to the skyline. Spacious, unhurried, and beautiful in spring blossom and autumn colour.',
    lat: 55.9406,
    lng: -3.1864,
    bestTime: 'Late morning or afternoon in good light',
    duration: 45,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'the-vennel',
    name: 'The Vennel Viewpoint',
    type: 'viewpoint',
    types: ['viewpoint'],
    description: 'A stepped close off the Grassmarket offering one of the best framed views of Edinburgh Castle, captured between old tenement walls. Small, accessible, and endlessly photogenic.',
    lat: 55.9461,
    lng: -3.1969,
    bestTime: 'Any time; overcast flatters the stonework',
    duration: 15,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
  },

  {
    id: 'the-writers-museum',
    name: "The Writers' Museum",
    type: 'hidden-gem',
    types: ['architecture', 'hidden-gem'],
    description: "Tucked within Lady Stair's Close, a 17th-century townhouse surrounded by worn flagstones and literary history. Intimate, atmospheric, and largely overlooked by tourists.",
    lat: 55.9499,
    lng: -3.1944,
    bestTime: 'Overcast mornings for soft, even light',
    duration: 20,
    traffic: 'Low',
    openingTimes: 'Close open 24 hours; museum Tue–Sat 10:00–17:00',
  },

  {
    id: 'victoria-street',
    name: 'Victoria Street',
    type: 'historic-street',
    types: ['historic-street'],
    description: "Edinburgh's most photogenic cobbled street curves gently between pastel shopfronts and wrought-iron railings. A versatile urban setting for fashion, lifestyle, and couple sessions.",
    lat: 55.9474,
    lng: -3.1937,
    bestTime: 'Early morning (empty streets before 08:30)',
    duration: 30,
    traffic: 'High',
    openingTimes: 'Open 24 hours (quietest before 09:00)',
  },

  {
    id: 'waverley-bridge',
    name: 'Waverley Bridge',
    type: 'viewpoint',
    types: ['viewpoint'],
    description: 'The bridge spanning Waverley station offers panoramic views of the Old Town skyline and the Scott Monument rising above the gardens. Central, dramatic, and always active.',
    lat: 55.9508,
    lng: -3.1885,
    bestTime: 'Golden hour or blue hour for skyline drama',
    duration: 20,
    traffic: 'High',
    openingTimes: 'Open 24 hours',
  },

];
