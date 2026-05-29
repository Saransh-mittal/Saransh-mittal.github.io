// ============================================================
// Capabilities — 2×2 matrix (rendered into #capabilities-grid)
// ============================================================
// Cards reveal on scroll via the shared `.reveal` mechanism.
// ============================================================

export function initSkills(siteData) {
  const grid = document.getElementById('capabilities-grid');
  if (!grid) return;

  const n = siteData.capabilities.length;

  grid.innerHTML = siteData.capabilities
    .map(
      (c) => `
        <div class="cap-card reveal" role="listitem" aria-label="${c.title} ${c.it}">
          <div class="num">${c.n} / 0${n}</div>
          <h3 class="title">${c.title} <span class="it">${c.it}</span></h3>
          <ul>
            ${c.items.map((it) => `<li>${it}</li>`).join('')}
          </ul>
        </div>`
    )
    .join('');
}
