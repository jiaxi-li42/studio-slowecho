/* ============================================================
   MAIN — js/main.js
   App bootstrap and cross-module event wiring.
   ============================================================ */

import { locations }   from './data/locations.js';
import { renderCards, applyCardFilter, updateCardSaveState, scrollToCard }
                       from './modules/cards.js';
import { initFilters } from './modules/filters.js';
import { initShortlist, isSaved } from './modules/shortlist.js';
import { initModal }   from './modules/modal.js';
import { initMap, highlightMarker, resetHighlights } from './modules/map.js';
import { initExport }  from './modules/export.js';

/* ---------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  renderCards(locations);
  initFilters();
  initShortlist(locations);
  initModal(locations);
  initExport();
  initMap(locations);
  initBottomSheet();

  // ── Cross-module event wiring ────────────────────────────

  window.addEventListener('filter-changed', e => applyCardFilter(e.detail));

  window.addEventListener('save-toggled',   e =>
    updateCardSaveState(e.detail, isSaved(e.detail))
  );

  // Desktop: scroll the matching card into view when a marker is tapped.
  // Mobile: marker tap just shows the popup — no card/sheet interaction.
  window.addEventListener('marker-click', e => {
    if (window.innerWidth > 767) scrollToCard(e.detail);
  });

  window.addEventListener('card-hover', e => {
    e.detail ? highlightMarker(e.detail) : resetHighlights();
  });

});

/* ============================================================
   BOTTOM SHEET  (mobile only)
   Google Maps-style pull-up panel.
   ============================================================ */

function initBottomSheet() {
  const panel = document.getElementById('location-panel');
  const grip  = document.getElementById('panel-grip');
  if (!panel || !grip) return;

  // Only active on mobile — re-check on resize
  let active = isMobile();
  window.addEventListener('resize', () => {
    const wasMobile = active;
    active = isMobile();
    if (wasMobile && !active) {
      // Switched to desktop — clear inline transform so panel sits at top
      panel.style.transform = '';
      panel.style.transition = '';
      isOpen = false;
    } else if (!wasMobile && active) {
      // Switched to mobile — start collapsed
      snapTo(false, true);
    }
  });

  const PEEK = () => parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--peek-height') || '136'
  );

  let isOpen    = false;
  let dragState = null; // { startY, startPanelY }

  /* ── Snap helpers ───────────────────────────────────── */

  function closedY()  { return panel.offsetHeight - PEEK(); }
  function currentY() { return new DOMMatrix(getComputedStyle(panel).transform).m42; }

  function snapTo(open, skipTransition = false) {
    isOpen = open;
    if (skipTransition) panel.style.transition = 'none';
    else                panel.style.transition = '';      // restore CSS value
    panel.style.transform = `translateY(${open ? 0 : closedY()}px)`;
    if (skipTransition) {
      // Re-enable transition after the paint
      requestAnimationFrame(() => { panel.style.transition = ''; });
    }
  }

  /* Start collapsed — mobile only; desktop has no transform */
  if (active) snapTo(false, true);

  /* ── Tap on grip to toggle ──────────────────────────── */

  grip.addEventListener('click', () => {
    if (!active) return;
    snapTo(!isOpen);
  });

  /* ── Touch drag ─────────────────────────────────────── */

  grip.addEventListener('touchstart', e => {
    if (!active) return;
    dragState = { startY: e.touches[0].clientY, startPanelY: currentY() };
    panel.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!dragState || !active) return;
    const deltaY = e.touches[0].clientY - dragState.startY;
    const newY   = Math.max(0, Math.min(closedY(), dragState.startPanelY + deltaY));
    panel.style.transform = `translateY(${newY}px)`;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (!dragState || !active) return;
    const deltaY = e.changedTouches[0].clientY - dragState.startY;
    dragState    = null;
    snapTo(deltaY < -40 ? true : deltaY > 40 ? false : isOpen);
  }, { passive: true });

  /* ── External triggers ─────────────────────────────── */

  // Mobile card tap collapses the sheet so the map is visible
  window.addEventListener('collapse-sheet', () => {
    if (active) snapTo(false);
  });
}

function isMobile() {
  return window.innerWidth <= 767;
}
