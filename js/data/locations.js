/* ============================================================
   LOCATION DATA — js/data/locations.js
   ============================================================
   To add a location: copy one object, fill in all fields, save.
   To add real images: add an `images` array of file paths.
     e.g.  images: ['assets/calton-hill-1.jpg', 'assets/calton-hill-2.jpg']
   If `images` is omitted, placeholder SVGs are used automatically.

   Field reference:
   ─────────────────────────────────────────────────────────────
   id           string   URL-safe slug (unique)
   name         string   Display name
   type         string   'viewpoint' | 'historic' | 'park' | 'street' | 'waterfront'
   description  string   Short description shown on the card
   lat          number   Latitude  (WGS 84)
   lng          number   Longitude (WGS 84)
   bestTime     string   Recommended time of day / light condition
   duration     number   Estimated shoot duration in minutes
   traffic      string   'Low' | 'Moderate' | 'High'
   openingTimes string   Access hours or notes
   imageCount   number   How many placeholder slides to show (1–3)
   images       string[] Optional — paths to real images (overrides placeholders)
   ============================================================ */

export const locations = [

  {
    id: 'calton-hill',
    name: 'Calton Hill',
    type: 'viewpoint',
    description: 'Panoramic views over the Old Town skyline, the Firth of Forth, and beyond. Home to the National Monument and Nelson\'s Monument, with open grassy slopes perfect for lifestyle and portrait work.',
    lat: 55.9554,
    lng: -3.1820,
    bestTime: 'Sunrise or sunset (golden hour)',
    duration: 60,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
    imageCount: 3,
  },

  {
    id: 'arthurs-seat',
    name: "Arthur's Seat",
    type: 'viewpoint',
    description: "Edinburgh's ancient volcano offers sweeping 360° views of the city and coast. The summit and surrounding Holyrood Park deliver dramatic, rugged backdrops — from heathered slopes to rocky outcrops.",
    lat: 55.9443,
    lng: -3.1614,
    bestTime: 'Sunrise for mist and solitude',
    duration: 90,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
    imageCount: 3,
  },

  {
    id: 'edinburgh-castle',
    name: 'Edinburgh Castle',
    type: 'historic',
    description: 'The iconic fortress dominates the skyline from its volcanic crag. The esplanade and surrounding closes offer grand architectural backdrops ideal for editorial, bridal, and heritage shoots.',
    lat: 55.9486,
    lng: -3.1999,
    bestTime: 'Early morning before crowds arrive',
    duration: 45,
    traffic: 'High',
    openingTimes: '09:30–18:00 (Apr–Oct), 09:30–17:00 (Nov–Mar)',
    imageCount: 3,
  },

  {
    id: 'greyfriars-kirkyard',
    name: 'Greyfriars Kirkyard',
    type: 'historic',
    description: 'One of Edinburgh\'s most atmospheric churchyards — draped in moss-covered stones and ancient yew trees. Beautifully moody in overcast light, ideal for editorial, fine-art, and gothic-inspired portraits.',
    lat: 55.9466,
    lng: -3.1907,
    bestTime: 'Overcast mornings or blue hour',
    duration: 30,
    traffic: 'Low',
    openingTimes: 'Mon–Fri 10:00–16:30, Sat 10:00–14:30',
    imageCount: 2,
  },

  {
    id: 'victoria-street',
    name: 'Victoria Street',
    type: 'street',
    description: "Edinburgh's most photogenic cobbled street curves gently between pastel shopfronts and wrought-iron railings. A versatile urban setting for fashion, lifestyle, and couple sessions.",
    lat: 55.9474,
    lng: -3.1937,
    bestTime: 'Early morning (empty streets before 08:30)',
    duration: 30,
    traffic: 'High',
    openingTimes: 'Open 24 hours (quietest before 09:00)',
    imageCount: 3,
  },

  {
    id: 'dean-village',
    name: 'Dean Village',
    type: 'street',
    description: 'A hidden riverside hamlet tucked below street level, with stone mill buildings and the Water of Leith winding through. A tranquil, storybook setting just minutes from the city centre.',
    lat: 55.9519,
    lng: -3.2142,
    bestTime: 'Mid-morning with dappled riverside light',
    duration: 45,
    traffic: 'Low',
    openingTimes: 'Open 24 hours',
    imageCount: 3,
  },

  {
    id: 'stockbridge',
    name: 'Stockbridge',
    type: 'street',
    description: "Edinburgh's most charming village neighbourhood — Georgian townhouses, independent boutiques, and the Water of Leith walkway. Natural and candid street portraits thrive in this relaxed setting.",
    lat: 55.9567,
    lng: -3.2063,
    bestTime: 'Late morning or weekend afternoons',
    duration: 45,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
    imageCount: 3,
  },

  {
    id: 'royal-botanic-garden',
    name: 'Royal Botanic Garden',
    type: 'park',
    description: '72 acres of curated landscapes including glasshouses, a rock garden, and ancient woodland paths. Seasonal colour year-round — from spring blossom to the deep reds and golds of autumn.',
    lat: 55.9622,
    lng: -3.2094,
    bestTime: 'Late morning or early afternoon',
    duration: 60,
    traffic: 'Moderate',
    openingTimes: '10:00–18:00 (summer), 10:00–16:00 (winter)',
    imageCount: 3,
  },

  {
    id: 'holyrood-park',
    name: 'Holyrood Park',
    type: 'park',
    description: 'A wild Highland landscape within the city — home to dramatic cliffs, St Margaret\'s Loch, and open heathland. Exceptional variety of terrain for adventurous, romantic, or fine-art shoots.',
    lat: 55.9421,
    lng: -3.1706,
    bestTime: 'Golden hour; any time for overcast drama',
    duration: 75,
    traffic: 'Moderate',
    openingTimes: 'Open 24 hours',
    imageCount: 3,
  },

  {
    id: 'cramond-island',
    name: 'Cramond Island',
    type: 'waterfront',
    description: 'Walk the tidal causeway to a secluded island studded with WWII ruins and open sea views. Vast skies, salt flats, and dramatic isolation make this one of the most striking locations near Edinburgh.',
    lat: 55.9797,
    lng: -3.2987,
    bestTime: 'Low tide, late afternoon (check tide tables)',
    duration: 90,
    traffic: 'Low',
    openingTimes: 'Accessible ~2 hours either side of low tide',
    imageCount: 3,
  },

];
