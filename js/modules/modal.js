/* ============================================================
   MODAL — js/modules/modal.js
   Expanded location overlay with numbered carousel pagination.
   ============================================================ */

import { typeLabels, getImages } from './ui.js';
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
    const btn = document.querySelector('.modal-shortlist-btn');
    if (btn?.dataset.id === e.detail) {
      const saved = isSaved(e.detail);
      btn.textContent = saved ? '移出收藏夹' : '加入收藏夹';
      btn.classList.toggle('saved', saved);
    }
  });
}

/* --- Open / close ----------------------------------------- */

function openModal(id) {
  const loc     = _locations.find(l => l.id === id);
  const overlay = document.getElementById('modal-overlay');
  const inner   = document.getElementById('modal-inner');
  if (!loc || !overlay || !inner) return;

  const images = getImages(loc);
  inner.innerHTML = buildModalHtml(loc, images);

  // Carousel
  initModalCarousel(inner, images.length);

  // Close button
  inner.querySelector('.modal-close')?.addEventListener('click', closeModal);

  // Shortlist button
  inner.querySelector('.modal-shortlist-btn')?.addEventListener('click', () =>
    window.dispatchEvent(new CustomEvent('save-toggle-request', { detail: id }))
  );

  inner.scrollTop = 0;
  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
}

/* --- Carousel interaction ---------------------------------- */

function initModalCarousel(inner, slideCount) {
  if (slideCount <= 1) return;

  const slides   = inner.querySelectorAll('.carousel-slide');
  const pageNums = inner.querySelectorAll('.modal-page-num');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    pageNums[current]?.classList.remove('active');
    current = ((index % slideCount) + slideCount) % slideCount;
    slides[current].classList.add('active');
    pageNums[current]?.classList.add('active');
  }

  inner.querySelector('.modal-pagination-prev')?.addEventListener('click', () => goTo(current - 1));
  inner.querySelector('.modal-pagination-next')?.addEventListener('click', () => goTo(current + 1));
  pageNums.forEach(btn =>
    btn.addEventListener('click', () => goTo(parseInt(btn.dataset.index, 10)))
  );

  // Swipe / drag navigation (touch + mouse)
  const track = inner.querySelector('.carousel-track');
  if (!track) return;
  let dragStartX = 0;
  let isDragging = false;

  // Touch
  track.addEventListener('touchstart', e => {
    dragStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(dx) < 40) return;
    goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Mouse — mouseup on document so it fires even outside the track
  track.addEventListener('mousedown', e => {
    dragStartX = e.clientX;
    isDragging = true;
    track.style.cursor = 'grabbing';
    e.preventDefault(); // block native image drag
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = '';
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) < 40) return;
    goTo(dx < 0 ? current + 1 : current - 1);
  });
}

/* --- HTML builder ------------------------------------------ */

function buildModalHtml(loc, images) {
  const saved = isSaved(loc.id);

  const slides = images
    .map((src, i) =>
      `<img class="carousel-slide${i === 0 ? ' active' : ''}" src="${src}" alt="Photo ${i + 1}" loading="lazy">`)
    .join('');

  const pagination = images.length > 1 ? `
    <div class="modal-pagination">
      <button class="modal-pagination-prev" aria-label="Previous">chevron_left</button>
      <div class="modal-page-nums">
        ${images.map((_, i) =>
          `<button class="modal-page-num${i === 0 ? ' active' : ''}" data-index="${i}">${i + 1}</button>`
        ).join('')}
      </div>
      <button class="modal-pagination-next" aria-label="Next">chevron_right</button>
    </div>
  ` : '';

  return `
    <button class="modal-close" aria-label="Close">关闭</button>

    <div class="modal-carousel">
      <div class="carousel-track">${slides}</div>
    </div>

    ${pagination}

    <div class="modal-content">
      <div class="modal-head">
        <h2 class="modal-title">${loc.name}</h2>
        <p class="modal-type">${typeLabels(loc)}</p>
      </div>
      <p class="modal-description">${loc.description}</p>
    </div>

    <div class="modal-details">
      <dl class="modal-detail-grid">
        <div class="modal-detail-item">
          <dt>最佳时段</dt>
          <dd>${loc.bestTime}</dd>
        </div>
        <div class="modal-detail-item">
          <dt>人流量</dt>
          <dd>${loc.traffic}</dd>
        </div>
        <div class="modal-detail-item">
          <dt>建议拍摄时长</dt>
          <dd>~${loc.duration} min</dd>
        </div>
        <div class="modal-detail-item">
          <dt>开放时间</dt>
          <dd>${loc.openingTimes}</dd>
        </div>
      </dl>
    </div>

    <div class="modal-footer">
      <button class="modal-shortlist-btn${saved ? ' saved' : ''}" data-id="${loc.id}">
        ${saved ? '移出收藏夹' : '加入收藏夹'}
      </button>
    </div>
  `;
}
