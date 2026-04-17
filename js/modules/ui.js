/* ============================================================
   SHARED UI UTILITIES — js/modules/ui.js
   Pure functions: icons, labels, HTML helpers.
   ============================================================ */

/* --- Type labels ------------------------------------------- */

const TYPE_LABELS = {
  viewpoint:  'Viewpoint',
  historic:   'Historic',
  greenspace: 'Greenspace',
  street:     'Street',
  waterfront: 'Waterfront',
};

export function typeLabel(type) {
  return TYPE_LABELS[type] ?? type;
}

/** Normalise traffic string to a CSS-safe class segment */
export function trafficClass(traffic) {
  return traffic.toLowerCase().split(' ')[0];
}

/** Format a duration in minutes as a human-readable string */
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
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

/* --- Material Symbols icons -------------------------------- */

/** Render a Material Symbols Outlined icon */
function msIcon(name, opts = '') {
  return `<span class="material-symbols-outlined"${opts ? ' style="' + opts + '"' : ''}>${name}</span>`;
}

export const icons = {
  chevronLeft:  () => msIcon('chevron_left'),
  chevronRight: () => msIcon('chevron_right'),
};
