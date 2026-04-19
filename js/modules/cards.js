/* ============================================================
   CARDS — js/modules/cards.js
   Renders location cards. No carousel on cards (static first
   image only). Carousel exists only in the modal.
   ============================================================ */

import { typeLabels, getImages } from './ui.js';

/* ---------------------------------------------------------- */

/** Render all cards into #cards-grid */
export function renderCards(locations) {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';
  locations.forEach(loc => grid.appendChild(createCard(loc)));
  updateNoResults();
}

/** Update a single card's saved visual state */
export function updateCardSaveState(id, saved) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  const btn  = card?.querySelector('.card-shortlist-btn');
  if (!card || !btn) return;
  card.classList.toggle('saved', saved);
  btn.textContent = saved ? '移出收藏夹' : '加入收藏夹';
}

/** Show or hide cards based on active filter */
export function applyCardFilter(type) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const match = type === 'all' || card.dataset.types?.split(' ').includes(type);
    card.hidden = !match;
  });
  updateNoResults();
  document.getElementById('cards-panel')?.scrollTo({ top: 0, behavior: 'instant' });
}

/* --- Internal helpers -------------------------------------- */

function createCard(loc) {
  const images  = getImages(loc);
  const article = document.createElement('article');
  const locTypes = loc.types ?? [loc.type];
  article.className     = 'card';
  article.dataset.id    = loc.id;
  article.dataset.types = locTypes.join(' ');

  article.innerHTML = `
    <div class="card-image">
      <img src="${images[0]}" alt="${loc.name}" loading="lazy">
    </div>
    <div class="card-info">
      <p class="card-name">${loc.name}</p>
      <p class="card-type">${typeLabels(loc)}</p>
      <button class="card-shortlist-btn" data-id="${loc.id}">加入收藏夹</button>
    </div>
  `;

  // Shortlist text button
  article.querySelector('.card-shortlist-btn').addEventListener('click', e => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('save-toggle-request', { detail: loc.id }));
  });

  // Click card → desktop: open modal + focus map; mobile: collapse sheet + focus map
  article.addEventListener('click', e => {
    if (e.target.closest('.card-shortlist-btn')) return;
    if (window.innerWidth <= 767) {
      window.dispatchEvent(new CustomEvent('collapse-sheet'));
      window.dispatchEvent(new CustomEvent('location-focus', { detail: loc.id }));
    } else {
      window.dispatchEvent(new CustomEvent('card-expand',    { detail: loc.id }));
      window.dispatchEvent(new CustomEvent('location-focus', { detail: loc.id }));
    }
  });

  // Hover → highlight map marker (desktop only)
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

/** Scroll a card into view (desktop only) */
export function scrollToCard(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
