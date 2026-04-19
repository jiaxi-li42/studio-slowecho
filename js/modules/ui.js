/* ============================================================
   SHARED UI UTILITIES — js/modules/ui.js
   Pure helpers for labels, durations, and image resolution.
   ============================================================ */

/* --- Type labels ------------------------------------------- */

const TYPE_LABELS = {
  viewpoint:         'Viewpoint',
  'historic-street': 'Historic Street',
  architecture:      'Architecture',
  greenspace:        'Green Space',
  waterside:         'Waterside',
  'hidden-gem':      'Hidden Gem',
};

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
