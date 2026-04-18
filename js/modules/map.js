/* ============================================================
   MAP — js/modules/map.js
   Leaflet map initialisation, custom markers,
   card ↔ marker synchronisation, and location focus.
   ============================================================ */

import { typeLabels } from './ui.js';
import { isSaved } from './shortlist.js';

let _map       = null;
let _markers   = {}; // id → { marker, el }
let _locations = [];

/* ---------------------------------------------------------- */

export function initMap(locations) {
  _locations = locations;
  _map = L.map('map', {
    center: [55.9533, -3.1883],
    zoom: 13,
    zoomControl: false,
  });

  L.control.zoom({ position: 'topright' }).addTo(_map);

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
        'contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }
  ).addTo(_map);

  locations.forEach(loc => addMarker(loc));

  window.addEventListener('save-toggled',   e => updateMarkerSavedState(e.detail));
  window.addEventListener('filter-changed', e => updateMarkerFilter(e.detail));

  window.addEventListener('card-hover', e => {
    e.detail ? highlightMarker(e.detail) : resetHighlights();
  });

  // Focus map when a location-focus event is fired (desktop card click, mobile popup detail)
  window.addEventListener('location-focus', e => focusLocation(e.detail));

  // Event delegation for popup buttons — robust against popup re-renders and
  // avoids the "needs click elsewhere after modal close" bug that plagued
  // per-open listener attachment.
  document.getElementById('map')?.addEventListener('click', e => {
    const saveBtn = e.target.closest('.marker-popup-save');
    if (saveBtn) {
      const id = saveBtn.dataset.id;
      if (id) window.dispatchEvent(new CustomEvent('save-toggle-request', { detail: id }));
      return;
    }

    const detailBtn = e.target.closest('.marker-popup-detail');
    if (detailBtn) {
      const id = detailBtn.dataset.id;
      if (id) window.dispatchEvent(new CustomEvent('card-expand', { detail: id }));
    }
  });
}

/* --- Focus on a location ----------------------------------- */

/** Fly the map to a location and open its popup */
export function focusLocation(id) {
  if (!_map) return;
  const entry = _markers[id];
  if (!entry) return;
  const latlng = entry.marker.getLatLng();
  _map.flyTo(latlng, 15, { animate: true, duration: 0.7 });
  // Open popup after fly (slight delay for smoothness)
  setTimeout(() => entry.marker.openPopup(), 400);
}

/* --- Markers ----------------------------------------------- */

function addMarker(loc) {
  const el = document.createElement('div');
  el.className = 'map-marker';
  el.setAttribute('title', loc.name);

  const icon = L.divIcon({
    className:  '',
    html:       el,
    iconSize:   [14, 14],
    iconAnchor: [7, 7],
    popupAnchor:[0, -12],
  });

  const marker = L.marker([loc.lat, loc.lng], { icon })
    .addTo(_map)
    .bindPopup(() => buildPopup(loc), {
      maxWidth: 220,
      className: 'custom-popup',
    });

  // Highlight marker while popup is open; restore on close
  marker.on('popupopen', () => {
    updatePopupSaveState(marker, loc.id);
    el.classList.add('highlighted');
  });

  marker.on('popupclose', () => {
    el.classList.remove('highlighted');
  });

  marker.on('click', () => {
    window.dispatchEvent(new CustomEvent('marker-click', { detail: loc.id }));
  });

  _markers[loc.id] = { marker, el };
}

function buildPopup(loc) {
  const div = document.createElement('div');
  div.className = 'marker-popup';
  div.innerHTML = `
    <div class="popup-info">
      <p class="popup-name">${loc.name}</p>
      <p class="popup-type">${typeLabels(loc)}</p>
    </div>
    <div class="popup-actions">
      <button class="marker-popup-detail" data-id="${loc.id}">View</button>
      <button class="marker-popup-save" data-id="${loc.id}">${isSaved(loc.id) ? 'Remove from Shortlist' : 'Add to Shortlist'}</button>
      </div>
    </div>
  `;
  return div;
}

/* --- State sync -------------------------------------------- */

function updateMarkerSavedState(id) {
  const entry = _markers[id];
  if (!entry) return;
  entry.el.classList.toggle('saved', isSaved(id));
  updatePopupSaveState(entry.marker, id); // getElement() is null-safe when popup is closed
}

function updatePopupSaveState(marker, id) {
  const btn = marker.getPopup()?.getElement()?.querySelector('.marker-popup-save');
  if (btn) btn.textContent = isSaved(id) ? 'Remove from Shortlist' : 'Add to Shortlist';
}

export function highlightMarker(id) {
  resetHighlights();
  const entry = _markers[id];
  if (entry) entry.el.classList.add('highlighted');
}

export function resetHighlights() {
  Object.values(_markers).forEach(({ el }) => el.classList.remove('highlighted'));
}

function updateMarkerFilter(type) {
  Object.entries(_markers).forEach(([id, { el }]) => {
    const loc   = _locations.find(l => l.id === id);
    const types = loc?.types ?? (loc?.type ? [loc.type] : []);
    const show  = type === 'all' || types.includes(type);
    el.style.opacity       = show ? '1'  : '0.18';
    el.style.pointerEvents = show ? ''   : 'none';
  });
}
