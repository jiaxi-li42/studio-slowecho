/* ============================================================
   SHARED UI UTILITIES — js/modules/ui.js
   Pure functions: icons, labels, HTML helpers.
   Imported by cards.js, modal.js, and export.js.
   ============================================================ */

/* --- Type labels ------------------------------------------- */

const TYPE_LABELS = {
  viewpoint:  'Viewpoint',
  historic:   'Historic',
  park:       'Park / Garden',
  street:     'Street / Architecture',
  waterfront: 'Waterfront',
};

export function typeLabel(type) {
  return TYPE_LABELS[type] ?? type;
}

/** Normalise traffic string to a CSS-safe class segment */
export function trafficClass(traffic) {
  return traffic.toLowerCase().split(' ')[0]; // 'Low' → 'low', 'Moderate' → 'moderate'
}

/** Format a duration in minutes as a human-readable string */
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/* --- Image resolution -------------------------------------- */

const PLACEHOLDERS = [
  'assets/placeholders/placeholder-1.svg',
  'assets/placeholders/placeholder-2.svg',
  'assets/placeholders/placeholder-3.svg',
];

/** Return the array of image src strings for a location */
export function getImages(loc) {
  if (loc.images && loc.images.length > 0) return loc.images;
  const count = loc.imageCount ?? 3;
  return PLACEHOLDERS.slice(0, Math.min(count, PLACEHOLDERS.length));
}

/* --- Inline SVG icons -------------------------------------- */

// Shared X path (reused by close and remove icons)
const _X_LINES = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;

export const icons = {

  bookmark: (cls = 'icon-bookmark') =>
    `<svg class="${cls}" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`,

  close: () =>
    `<svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${_X_LINES}
    </svg>`,

  chevronLeft: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"/>
    </svg>`,

  chevronRight: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"/>
    </svg>`,

  remove: () =>
    `<svg width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${_X_LINES}
    </svg>`,

  sun: () =>
    `<svg width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>`,

  clock: () =>
    `<svg width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,

  people: () =>
    `<svg width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,

  calendar: () =>
    `<svg width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8"  y1="2" x2="8"  y2="6"/>
      <line x1="3"  y1="10" x2="21" y2="10"/>
    </svg>`,
};

/* --- Shared HTML builders ---------------------------------- */

/** Build the carousel HTML string for a given images array */
export function buildCarouselHtml(images) {
  const slides = images
    .map((src, i) =>
      `<img class="carousel-slide${i === 0 ? ' active' : ''}"
        src="${src}" alt="Photo ${i + 1}" loading="lazy">`)
    .join('');

  const controls = images.length > 1 ? `
    <button class="carousel-prev" aria-label="Previous image">${icons.chevronLeft()}</button>
    <button class="carousel-next" aria-label="Next image">${icons.chevronRight()}</button>
    <div class="carousel-dots" aria-hidden="true">
      ${images.map((_, i) =>
        `<button class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`
      ).join('')}
    </div>` : '';

  return `
    <div class="carousel-track">${slides}</div>
    ${controls}
  `;
}

/** Build the metadata <dl> HTML string for a location */
export function buildMetaDl(loc) {
  const tc = trafficClass(loc.traffic);
  return `
    <dl class="card-meta">
      <div class="meta-item">
        <dt>${icons.sun()} Best time</dt>
        <dd>${loc.bestTime}</dd>
      </div>
      <div class="meta-item">
        <dt>${icons.clock()} Duration</dt>
        <dd>~${loc.duration} min</dd>
      </div>
      <div class="meta-item">
        <dt>${icons.people()} Traffic</dt>
        <dd class="traffic-${tc}">${loc.traffic}</dd>
      </div>
      <div class="meta-item">
        <dt>${icons.calendar()} Opening times</dt>
        <dd>${loc.openingTimes}</dd>
      </div>
    </dl>
  `;
}

/** Attach carousel prev/next/dot interaction to a container element */
export function initCarouselInteraction(container, slideCount) {
  if (slideCount <= 1) return;

  const slides = container.querySelectorAll('.carousel-slide');
  const dots   = container.querySelectorAll('.dot');
  let current  = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = ((index % slideCount) + slideCount) % slideCount;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  container.querySelector('.carousel-prev')?.addEventListener('click', e => {
    e.stopPropagation();
    goTo(current - 1);
  });

  container.querySelector('.carousel-next')?.addEventListener('click', e => {
    e.stopPropagation();
    goTo(current + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.stopPropagation();
      goTo(parseInt(dot.dataset.index, 10));
    });
  });
}
