/* ============================================================
   SHORTLIST — js/modules/shortlist.js
   Manages saved locations, the drawer panel, and
   the total shoot duration display.
   ============================================================ */

import { typeLabels, formatDuration } from './ui.js';

/* Shared state */
const _savedIds   = new Set();
let   _locations  = [];

/* ---------------------------------------------------------- */

export function initShortlist(locations) {
  _locations = locations;

  // Drawer open/close
  document.getElementById('shortlist-toggle')
    ?.addEventListener('click', openDrawer);
  document.getElementById('drawer-close')
    ?.addEventListener('click', closeDrawer);

  // Listen for save toggle requests
  window.addEventListener('save-toggle-request', e => toggleSave(e.detail));

  // Initial badge state
  updateBadge();
}

/* --- Toggle save ------------------------------------------- */

function toggleSave(id) {
  if (_savedIds.has(id)) {
    _savedIds.delete(id);
  } else {
    _savedIds.add(id);
  }

  // Notify all subscribers
  window.dispatchEvent(new CustomEvent('save-toggled', { detail: id }));

  updateBadge();
  refreshDrawerList();
}

export function isSaved(id) {
  return _savedIds.has(id);
}

/* --- Drawer ------------------------------------------------ */

function openDrawer() {
  refreshDrawerList();
  document.getElementById('shortlist-drawer')?.classList.add('open');
}

function closeDrawer() {
  document.getElementById('shortlist-drawer')?.classList.remove('open');
}

/* --- List rendering ---------------------------------------- */

function refreshDrawerList() {
  const list       = document.getElementById('shortlist-list');
  const emptyMsg   = document.getElementById('drawer-empty');
  const durationEl = document.getElementById('duration-total');
  const exportBtn  = document.getElementById('export-btn');
  if (!list) return;

  const saved = _locations.filter(l => _savedIds.has(l.id));

  // Empty state
  if (emptyMsg) emptyMsg.hidden = saved.length > 0;
  if (exportBtn) exportBtn.disabled = saved.length === 0;

  // Duration total
  const totalMin = saved.reduce((sum, l) => sum + l.duration, 0);
  if (durationEl) {
    durationEl.textContent = saved.length > 0 ? formatDuration(totalMin) : '—';
  }

  // Build list
  list.innerHTML = '';
  saved.forEach(loc => {
    const li = document.createElement('li');
    li.className    = 'shortlist-item';
    li.dataset.id   = loc.id;
    li.innerHTML = `
      <div class="shortlist-item-info">
        <span class="shortlist-item-name">${loc.name}</span>
        <span class="shortlist-item-type">${typeLabels(loc)}</span>
      </div>
      <button class="shortlist-remove" data-id="${loc.id}" aria-label="Remove ${loc.name}">移除</button>
    `;
    li.querySelector('.shortlist-remove').addEventListener('click', e => {
      e.stopPropagation();
      toggleSave(loc.id);
    });
    list.appendChild(li);
  });
}

/* --- Badge ------------------------------------------------- */

function updateBadge() {
  const count = _savedIds.size;
  const countEl = document.getElementById('shortlist-count');
  if (countEl) countEl.textContent = count;
  const countDrawerEl = document.getElementById('shortlist-count-drawer');
  if (countDrawerEl) countDrawerEl.textContent = count;
}

/** Returns the array of currently saved location objects */
export function getSavedLocations() {
  return _locations.filter(l => _savedIds.has(l.id));
}
