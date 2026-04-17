/* ============================================================
   FILTERS — js/modules/filters.js
   Manages filter button state and fires events so cards
   and map can update their visible state in real time.
   ============================================================ */

let _activeFilter = 'all';

/** Attach click handlers to all .filter-item elements */
export function initFilters() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-item');
    if (!btn) return;

    const type = btn.dataset.filter;
    if (type === _activeFilter) return;

    // Update active button
    bar.querySelectorAll('.filter-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    _activeFilter = type;

    // Broadcast to cards + map
    window.dispatchEvent(new CustomEvent('filter-changed', { detail: type }));
  });
}

export function getActiveFilter() {
  return _activeFilter;
}
