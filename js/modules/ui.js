/* ============================================================
   SHARED UI UTILITIES — js/modules/ui.js
   Pure functions: icons, labels, HTML helpers.
   ============================================================ */

/* --- Type labels ------------------------------------------- */

const TYPE_LABELS = {
  viewpoint:       'Viewpoint',
  'historic-street': 'Historic Street',
  architecture:    'Architecture',
  greenspace:      'Green Space',
  waterside:       'Waterside',
  'hidden-gem':    'Hidden Gem',
};

export function typeLabel(type) {
  return TYPE_LABELS[type] ?? type;
}

/** Returns a comma-separated label string for all of a location's types */
export function typeLabels(loc) {
  const types = loc.types ?? [loc.type];
  return types.map(t => TYPE_LABELS[t] ?? t).join(', ');
}

/** Format a duration in minutes as a human-readable string */
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

/* --- Image resolution -------------------------------------- */

const PLACEHOLDER = 'assets/placeholders/placeholder.svg';

/** Return the array of image src strings for a location */
export function getImages(loc) {
  if (loc.images && loc.images.length > 0) return loc.images;
  return [PLACEHOLDER];
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
