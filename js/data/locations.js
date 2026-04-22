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
    description: "Advocate's Close 是隐藏在皇家一英里大道上的一条小巷，狭窄的巷道两侧是高耸的石墙。从巷口眺望，可以看到司各特纪念塔标志性的哥特式尖顶。在蓝调时刻，昏黄的灯光与石墙相映，最能感受到爱丁堡的灵魂。这里的行人来往不息，需要耐心等待才能拍出干净的照片。",
    lat: 55.9498,
    lng: -3.1912,
    bestTime: '蓝调时刻，街灯点亮时',
    duration: 15,
    traffic: '较大',
    openingTimes: '全天开放',
    images: ['assets/advocates-close/advocates_close_1_2x.webp', 'assets/advocates-close/advocates_close_2_2x.webp']
  },

  {
    id: 'calton-hill',
    name: 'Calton Hill',
    type: 'viewpoint',
    types: ['viewpoint', 'greenspace'],
    description: "卡尔顿山是爱丁堡最具标志性、最适合欣赏日落的地点之一。从爱丁堡市中心步行前往大约需要15分钟（需爬5分钟左右台阶，也可乘出租车直达山顶）。从山上可以俯瞰爱丁堡城区、死火山和北海的全景。日出时段的人很少，日落时段则会有不少人前来欣赏日落。",
    lat: 55.9550,
    lng: -3.1827,
    bestTime: '日出或日落前后',
    duration: 60,
    traffic: '较大',
    openingTimes: '全天开放',
    images: ['assets/calton-hill/calton_hill_1_2x.webp', 'assets/calton-hill/calton_hill_2_2x.webp', 'assets/calton-hill/calton_hill_3_2x.webp', 'assets/calton-hill/calton_hill_4_2x.webp']
  },

  {
    id: 'circus-lane',
    name: 'Circus Lane',
    type: 'hidden-gem',
    types: ['historic-street', 'hidden-gem'],
    description: "Circus Lane 是位于爱丁堡新城的一条鹅卵石小巷，从爱丁堡市中心步行前往需要约20分钟。小巷氛围安静优雅，两旁的建筑有攀附的绿植和鲜花作为点缀，在春夏秋季都有不同色彩的美。",
    lat: 55.9581,
    lng: -3.2050,
    bestTime: '适合任何时间，春夏秋季色彩最佳',
    duration: 30,
    traffic: '较小',
    openingTimes: '全天开放',
    images: ['assets/circus-lane/circus_lane_1_2x.webp', 'assets/circus-lane/circus_lane_2_2x.webp', 'assets/circus-lane/circus_lane_3_2x.webp']
  },

  {
    id: 'cockburn-street',
    name: 'Cockburn Street',
    type: 'historic-street',
    types: ['historic-street'],
    description: "Cockburn Street 是一条蜿蜒的街道，从皇家一英里大道向下延伸至 Waverley 火车站街道，一旁还与 Warriston\'s Close 长长的阶梯相连。街道两旁布满了独立酒吧和店铺，层次丰富，是爱丁堡最迷人的街道之一。",
    lat: 55.9506,
    lng: -3.1898,
    bestTime: '适合任何时间',
    duration: 15,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/cockburn-street/cockburn_street_1_2x.webp']
  },

  {
    id: 'dean-village',
    name: 'Dean Village',
    type: 'hidden-gem',
    types: ['greenspace', 'waterside', 'hidden-gem'],
    description: "迪恩村是爱丁堡城中，坐落于利斯河畔的隐秘小村落。从市中心步行前往这里需要约20分钟。这里有英国乡村式的小桥流水景观，非常具有童话感。沿自然步道一路步行，还会经过数个极佳的拍摄地点，最终到达Circus Lane。",
    lat: 55.9517,
    lng: -3.2180,
    bestTime: '上午或下午，阳光充足时最佳',
    duration: 60,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/dean-village/dean_village_1_2x.webp', 'assets/dean-village/dean_village_2_2x.webp', 'assets/dean-village/dean_village_3_2x.webp', 'assets/dean-village/dean_village_4_2x.webp', 'assets/dean-village/dean_village_5_2x.webp']
  },

  {
    id: 'greyfriars-bobby',
    name: 'Greyfriars Bobby',
    type: 'hidden-gem',
    types: ['architecture', 'hidden-gem'],
    description: "Greyfriars Bobby 位于爱丁堡的老城区。Bobby 是一只有着与忠犬八公类似故事的英雄小狗，这座青铜雕像是为了纪念它的故事而立，大家会专程过来摸 Bobby 的鼻子来获得好运。",
    lat: 55.9469,
    lng: -3.1913,
    bestTime: '适合任何时间',
    duration: 15,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/greyfriars-bobby/greyfriars_bobby_1_2x.webp', 'assets/greyfriars-bobby/greyfriars_bobby_2_2x.webp']
  },

  {
    id: 'holyrood-park',
    name: 'Holyrood Park',
    type: 'viewpoint',
    types: ['viewpoint', 'greenspace', 'hidden-gem'],
    description: "Holyrood Park 是爱丁堡市中心的郊野。在这座死火山上，能够欣赏到类似高地风光——壮丽的悬崖（需要爬坡）、开阔的荒原，在断崖边可以俯瞰爱丁堡城区。公园的地形丰富多样，还有大片草地和天鹅湖。",
    lat: 55.9511,
    lng: -3.1695,
    bestTime: '适合任何时间，阳光充足时最佳',
    duration: 120,
    traffic: '较小',
    openingTimes: '全天开放',
    images: ['assets/holyrood-park/holyrood_park_1_2x.webp', 'assets/holyrood-park/holyrood_park_2_2x.webp', 'assets/holyrood-park/holyrood_park_3_2x.webp', 'assets/holyrood-park/holyrood_park_4_2x.webp', 'assets/holyrood-park/holyrood_park_5_2x.webp']
  },

  {
    id: 'new-college',
    name: 'New College',
    type: 'architecture',
    types: ['architecture'],
    description: "新学院是爱丁堡大学神学院的所在地，是爱丁堡最具魔法气息的地点之一。庭院可以拍到气势恢宏的新哥特式风格塔楼，还有拱门和楼梯。这种神秘和优雅的氛围在阴天或小雨天气更为明显。需要注意的是，开放时间在学期外可能会有所不同。",
    lat: 55.9494,
    lng: -3.1952,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '适中',
    openingTimes: '需要提前查询',
    images: ['assets/new-college/new_college_1_2x.webp']
  },

  {
    id: 'old-college',
    name: 'Old College',
    type: 'architecture',
    types: ['architecture'],
    description: "老学院是爱丁堡大学法学院的所在地，位于爱丁堡市中心的南侧，是一座具有标志性的圆顶的新古典主义风格建筑。宽敞且对称的庭院四周环绕着塔楼、拱门和精美的立面，营造出静谧优雅的氛围。",
    lat: 55.9474,
    lng: -3.1872,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '较小',
    openingTimes: '需要提前查询',
    images: ['assets/old-college/old_college_1_2x.webp', 'assets/old-college/old_college_2_2x.webp', 'assets/old-college/old_college_3_2x.webp']
  },

  {
    id: 'portobello-beach',
    name: 'Portobello Beach',
    type: 'waterside',
    types: ['waterside'],
    description: "Portobello Beach 是位于爱丁堡边缘的著名海滩。从市区乘坐公交车前往大约需要20分钟。海滩有很多海鸥驻留，可以拍出很有电影感的照片。居民们下午会带着小狗出来玩水，很有生活气息。天气晴朗时前往更佳，日落后可以在沙滩上架起篝火，欣赏月出景色。",
    lat: 55.9550,
    lng: -3.1106,
    bestTime: '日落前后',
    duration: 120,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/portobello-beach/portobello_beach_1_2x.webp', 'assets/portobello-beach/portobello_beach_2_2x.webp']
  },

  {
    id: 'ross-fountain',
    name: 'Ross Fountain',
    type: 'architecture',
    types: ['architecture', 'greenspace'],
    description: "Ross Fountain 位于西王子街花园的中心，这座装饰华丽的喷泉与上方的爱丁堡城堡可以组成绝佳的拍照地点。喷泉是海鸥的露天浴场，因此会有海鸥出没。",
    lat: 55.9500,
    lng: -3.2030,
    bestTime: '适合任何时间，阳光充足时最佳',
    duration: 30,
    traffic: '适中',
    openingTimes: '早上7点开放，闭园时间全年有所调整',
    images: ['assets/ross-fountain/ross_fountain_1_2x.webp', 'assets/ross-fountain/ross_fountain_2_2x.webp']
  },

  {
    id: 'scott-monument',
    name: 'Scott Monument',
    type: 'architecture',
    types: ['architecture'],
    description: "司各特纪念塔位于东王子街花园中，是一座宏伟的新哥特式建筑，高达61米，纪念塔两侧的楼梯很有特色。拍摄时还可与老城区的建筑和花园中的自然环境相结合。",
    lat: 55.9523,
    lng: -3.1932,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '较大',
    openingTimes: '早上7点开放，闭园时间全年有所调整',
    images: ['assets/scott-monument/scott_monument_1_2x.webp', 'assets/scott-monument/scott_monument_2_2x.webp', 'assets/scott-monument/scott_monument_3_2x.webp']
  },

  {
    id: 'st-giles-cathedral',
    name: "St. Giles' Cathedral",
    type: 'architecture',
    types: ['architecture'],
    description: "圣吉尔斯大教堂是皇家一英里上最引人注目的景点之一。教堂的外墙精美而充满细节，后方还有一个典雅的庭院区，是一个十分浪漫、唯美的拍摄地点。",
    lat: 55.9494,
    lng: -3.1908,
    bestTime: '下午，阳光充足时最佳',
    duration: 45,
    traffic: '较大',
    openingTimes: '外部全天开放',
    images: ['assets/st-giles-cathedral/st_giles_cathedral_1_2x.webp', 'assets/st-giles-cathedral/st_giles_cathedral_2_2x.webp', 'assets/st-giles-cathedral/st_giles_cathedral_3_2x.webp']
  },

  {
    id: 'the-cowgate',
    name: 'The Cowgate',
    type: 'historic-street',
    types: ['historic-street'],
    description: "Cowgate 是爱丁堡最古老的街道之一，街道蜿蜒穿过宏伟的南桥拱门，而在路口则可以看到爱丁堡城堡。这里与爱丁堡其他地方的典雅风格不同，带有一种独特而粗粝的街头氛围。",
    lat: 55.9480,
    lng: -3.1929,
    bestTime: '适合任何时间',
    duration: 15,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/the-cowgate/the_cowgate_1_2x.webp', 'assets/the-cowgate/the_cowgate_2_2x.webp', 'assets/the-cowgate/the_cowgate_3_2x.webp']
  },

  {
    id: 'the-meadows',
    name: 'The Meadows',
    type: 'greenspace',
    types: ['greenspace', 'hidden-gem'],
    description: "The Meadows 是爱丁堡大学旁的一片绿地公园。这里绿树成荫、氛围悠闲，大家在此休息或游戏。春天这里的樱花非常繁盛，是爱丁堡主要的赏樱地点。",
    lat: 55.9413,
    lng: -3.1918,
    bestTime: '适合任何时间，阳光充足时最佳',
    duration: 45,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/the-meadows/the_meadows_1_2x.webp', 'assets/the-meadows/the_meadows_2_2x.webp']
  },

  {
    id: 'the-vennel',
    name: 'The Vennel Viewpoint',
    type: 'viewpoint',
    types: ['viewpoint'],
    description: "The Vennel 是隐藏在建筑物中的一条小巷，由小巷中的楼梯走向顶端，可以到达欣赏爱丁堡城堡的最佳视角之一，是与爱丁堡城堡同框的绝佳取景地。",
    lat: 55.9464,
    lng: -3.1972,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/the-vennel/the_vennel_1_2x.webp', 'assets/the-vennel/the_vennel_2_2x.webp', 'assets/the-vennel/the_vennel_3_2x.webp']
  },

  {
    id: 'the-writers-museum',
    name: "The Writers' Museum",
    type: 'hidden-gem',
    types: ['architecture', 'hidden-gem'],
    description: "作家博物馆位于皇家一英里旁的 Makars' Court 庭院内。这一隐秘的庭院充满了古典和优雅的氛围。当蓝调时刻庭院内的路灯点亮后，会变得更加浪漫。",
    lat: 55.9497,
    lng: -3.1937,
    bestTime: '适合任何时间',
    duration: 15,
    traffic: '适中',
    openingTimes: '外部全天开放',
    images: ['assets/the-writers-museum/the_writers_museum_1_2x.webp', 'assets/the-writers-museum/the_writers_museum_2_2x.webp', 'assets/the-writers-museum/the_writers_museum_3_2x.webp']
  },

  {
    id: 'victoria-street',
    name: 'Victoria Street',
    type: 'historic-street',
    types: ['historic-street'],
    description: "维多利亚街是爱丁堡最具有魔法气息的街道之一，两侧点缀有多彩的店铺。据传言，这里是对角巷的灵感来源。街道分为两层，二层的露台同样适合拍照。白天这里的人流量非常大，往往只有在清晨和傍晚才能拍出干净的照片。",
    lat: 55.9487,
    lng: -3.1932,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '较大',
    openingTimes: '全天开放',
    images: ['assets/victoria-street/victoria_street_1_2x.webp']
  },

  {
    id: 'waverley-bridge',
    name: 'Waverley Bridge',
    type: 'viewpoint',
    types: ['viewpoint'],
    description: "Waverley Bridge 连接着爱丁堡的新城区和老城区，可以将极具层次感的建筑尽收眼底，是拍摄老城区的经典机位。桥上供行人和少量车辆通行，需要稍加注意安全。",
    lat: 55.9518,
    lng: -3.1917,
    bestTime: '适合任何时间',
    duration: 30,
    traffic: '适中',
    openingTimes: '全天开放',
    images: ['assets/waverley-bridge/waverley_bridge_1_2x.webp', 'assets/waverley-bridge/waverley_bridge_2_2x.webp', 'assets/waverley-bridge/waverley_bridge_3_2x.webp']
  },

];
