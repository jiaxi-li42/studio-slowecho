/* ============================================================
   CARDS — js/modules/cards.js
   Renders location cards into the grid and handles carousel,
   save-button toggle, expand click, and hover→map events.
   ============================================================ */

import {
  typeLabel,
  trafficClass,
  getImages,
  buildCarouselHtml,
  buildMetaDl,
  initCarouselInteraction,
  icons,
} from './ui.js';

/* ---------------------------------------------------------- */

let _locations = [];

/** Render all cards into #cards-grid */
export function renderCards(locations) {
  _locations = locations;
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';
  locations.forEach(loc => grid.appendChild(createCard(loc)));
  updateNoResults();
}

/** Update a single card's saved visual state */
export function updateCardSaveState(id, saved) {
  const card    = document.querySelector(`.card[data-id="${id}"]`);
  const saveBtn = card?.querySelector('.save-btn');
  if (!card || !saveBtn) return;

  card.classList.toggle('saved', saved);
  saveBtn.classList.toggle('saved', saved);
  saveBtn.setAttribute('aria-pressed', String(saved));
}

/** Show or hide cards based on active filter */
export function applyCardFilter(type) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const match = type === 'all' || card.dataset.type === type;
    card.hidden = !match;
  });
  updateNoResults();
  document.getElementById('cards-panel')?.scrollTo({ top: 0, behavior: 'instant' });
}

/* --- Internal helpers -------------------------------------- */

function createCard(loc) {
  const images  = getImages(loc);
  const article = document.createElement('article');
  article.className   = 'card';
  article.dataset.id   = loc.id;
  article.dataset.type = loc.type;

  article.innerHTML = `
    <div class="card-carousel">
      ${buildCarouselHtml(images)}
    </div>
    <div class="card-body">
      <div class="card-head-row">
        <div>
          <span class="type-badge type-${loc.type}">${typeLabel(loc.type)}</span>
          <h3 class="card-title">${loc.name}</h3>
        </div>
        <button class="save-btn" data-id="${loc.id}"
          aria-label="Save ${loc.name}" aria-pressed="false">
          ${icons.bookmark()}
        </button>
      </div>
      <p class="card-desc">${loc.description}</p>
      ${buildMetaDl(loc)}
    </div>
  `;

  // Carousel interaction
  initCarouselInteraction(article.querySelector('.card-carousel'), images.length);

  // Save button
  article.querySelector('.save-btn').addEventListener('click', e => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('save-toggle-request', { detail: loc.id }));
  });

  // Click body — behaviour differs by viewport:
  //   Mobile: collapse the bottom sheet and fly the map to this location.
  //   Desktop: open the modal overlay AND fly the map to this location.
  article.querySelector('.card-body').addEventListener('click', e => {
    if (e.target.closest('.save-btn')) return;
    if (window.innerWidth <= 767) {
      window.dispatchEvent(new CustomEvent('collapse-sheet'));
      window.dispatchEvent(new CustomEvent('location-focus', { detail: loc.id }));
    } else {
      window.dispatchEvent(new CustomEvent('card-expand',    { detail: loc.id }));
      window.dispatchEvent(new CustomEvent('location-focus', { detail: loc.id }));
    }
  });

  // Hover → highlight map marker
  article.addEventListener('mouseenter', () =>
    window.dispatchEvent(new CustomEvent('card-hover', { detail: loc.id })));
  article.addEventListener('mouseleave', () =>
    window.dispatchEvent(new CustomEvent('card-hover', { detail: null })));

  return article;
}

function updateNoResults() {
  const grid      = document.getElementById('cards-grid');
  const noResults = document.getElementById('no-results');
  if (!noResults) return;
  const visible = [...grid.querySelectorAll('.card')].some(c => !c.hidden);
  noResults.hidden = visible;
}

/** Scroll a card into view and briefly highlight it */
export function scrollToCard(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (!card) return;

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  card.style.outline = `2px solid var(--color-accent)`;
  setTimeout(() => { card.style.outline = ''; }, 1200);
}
