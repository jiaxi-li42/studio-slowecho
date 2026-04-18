/* ============================================================
   EXPORT — js/modules/export.js
   Generates a JPEG of the shortlist using html2canvas.
   Builds a self-contained off-screen element for a clean render.
   ============================================================ */

import { typeLabels, formatDuration } from './ui.js';
import { getSavedLocations } from './shortlist.js';

/* ---------------------------------------------------------- */

export function initExport() {
  document.getElementById('export-btn')
    ?.addEventListener('click', exportShortlist);
}

async function exportShortlist() {
  const exportBtn = document.getElementById('export-btn');
  const spinner   = document.getElementById('export-spinner');

  exportBtn.hidden = true;
  if (spinner) spinner.hidden = false;

  try {
    const saved = getSavedLocations();

    if (saved.length === 0) {
      alert('Add some locations to your shortlist first.');
      return;
    }

    const el = buildExportElement(saved);
    document.body.appendChild(el);

    const canvas = await html2canvas(el, {
      backgroundColor: '#FEFAD7',
      scale:            3,
      useCORS:          true,
      logging:          false,
    });

    document.body.removeChild(el);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Your Shortlist — Studio Slowecho</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #1a1a1a; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 40px 20px; }
      img { max-width: 100%; height: auto; display: block; }
    </style>
  </head>
  <body><img src="${dataUrl}"></body>
</html>`);
      win.document.close();
    }

  } catch (err) {
    console.error('[export] Failed:', err);
    alert('Export failed — please try again.');
  } finally {
    exportBtn.hidden = false;
    if (spinner) spinner.hidden = true;
  }
}

/* --- Off-screen export element ----------------------------- */

function buildExportElement(saved) {
  const totalMin = saved.reduce((sum, l) => sum + l.duration, 0);
  const totalStr = formatDuration(totalMin);

  const BG      = '#FEFAD7';
  const DIVIDER = '#E5DDB9';
  const TEXT    = '#2d2d2d';
  const MUTED   = '#9a9585';
  const FH      = "'EB Garamond', Georgia, serif";
  const FB      = "'DM Sans', system-ui, sans-serif";
  const PAD     = '64px';

  // Inline styles — html2canvas cannot resolve CSS custom properties
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;left:-9999px;top:0;
    width:560px;
    background:${BG};
    color:${TEXT};
    font-family:${FB};
    padding:${PAD};
    box-sizing:border-box;
  `;

  const rows = saved.map(loc => `
    <div style="
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:20px 0;
      border-bottom:1px solid ${DIVIDER};
    ">
      <span style="
        font-family:${FB};
        font-size:11px;
        font-weight:600;
        letter-spacing:0.1em;
        text-transform:uppercase;
        color:${TEXT};
      ">${loc.name}</span>
      <span style="
        font-family:${FB};
        font-size:13px;
        color:${MUTED};
        white-space:nowrap;
        margin-left:16px;
      ">${typeLabels(loc)}</span>
    </div>
  `).join('');

  el.innerHTML = `
    <!-- Heading -->
    <div style="margin-bottom:56px;">
      <div style="font-family:${FH};font-size:72px;font-weight:700;line-height:1;color:${TEXT};">Your</div>
      <div style="font-family:${FH};font-size:72px;font-weight:400;font-style:italic;line-height:1;color:${TEXT};">Shortlist</div>
    </div>

    <!-- Location rows -->
    <div>${rows}</div>

    <!-- Footer -->
    <div style="
      margin-top:48px;
      padding-top:20px;
      display:flex;
      align-items:center;
      justify-content:space-between;
    ">
      <span style="font-family:${FB};font-size:13px;color:${TEXT};font-weight:500;">
        Estimated Duration (Commute Time Excl.)
      </span>
      <span style="font-family:${FB};font-size:14px;color:${TEXT};font-weight:500;white-space:nowrap;margin-left:16px;">
        ${totalStr}
      </span>
    </div>
  `;

  return el;
}

/* --- Fix text offset downwards ----------------------------- */
const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
    