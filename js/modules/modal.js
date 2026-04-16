/* ============================================================
   MODAL — js/modules/modal.js
   Expanded card overlay. Also triggers map focus on open.
   ============================================================ */

import {
  typeLabel,
  getImages,
  buildCarouselHtml,
  buildMetaDl,
  initCarouselInteraction,
  icons,
} from './ui.js';

import { isSaved } from './shortlist.js';

let _locations = [];

/* ---------------------------------------------------------- */

export function initModal(locations) {
  _locations = locations;

  window.addEventListener('card-expand', e => openModal(e.detail));

  const overlay = document.getElementById('modal-overlay');
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  window.addEventListener('save-toggled', e => {
    const saveBtn = document.querySelector('.modal-inner .save-btn');
    if (saveBtn?.dataset.id === e.detail) {
      applySaveBtnState(saveBtn, isSaved(e.detail));
    }
  });
}

/* --- Open / close ----------------------------------------- */

function openModal(id) {
  const loc     = _locations.find(l => l.id === id);
  const overlay = document.getElementById('modal-overlay');
  const inner   = document.getElementById('modal-inner');
  if (!loc || !overlay || !inner) return;

  inner.innerHTML = buildModalHtml(loc);

  initCarouselInteraction(
    inner.querySelector('.modal-carousel'),
    getImages(loc).length
  );

  inner.querySelector('.modal-close')?.addEventListener('click', closeModal);

  const saveBtn = inner.querySelector('.save-btn');
  applySaveBtnState(saveBtn, isSaved(id));
  saveBtn?.addEventListener('click', () =>
    window.dispatchEvent(new CustomEvent('save-toggle-request', { detail: id }))
  );

  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
}

/* --- HTML -------------------------------------------------- */

function buildModalHtml(loc) {
  const images = getImages(loc);
  return `
    <button class="modal-close" aria-label="Close">${icons.close()}</button>

    <div class="modal-carousel">
      ${buildCarouselHtml(images)}
    </div>

    <div class="modal-content">
      <div class="modal-head-row">
        <div>
          <span class="type-badge type-${loc.type}">${typeLabel(loc.type)}</span>
          <h2 class="modal-title">${loc.name}</h2>
        </div>
        <button class="save-btn" data-id="${loc.id}"
          aria-label="Save ${loc.name}" aria-pressed="false">
          ${icons.bookmark()}
        </button>
      </div>
      <p class="modal-description">${loc.description}</p>
      ${buildMetaDl(loc)}
    </div>
  `;
}

function applySaveBtnState(btn, saved) {
  if (!btn) return;
  btn.classList.toggle('saved', saved);
  btn.setAttribute('aria-pressed', String(saved));
}
