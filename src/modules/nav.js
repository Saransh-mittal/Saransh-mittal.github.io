// ============================================================
// Nav — slim right-edge dot index
// ============================================================
// • Renders one dot per section from the SSOT
// • Fades in only after the hero is scrolled past
// • Active dot = the section whose top most recently crossed a
//   35%-from-top reference line (robust for variable heights)
// • Smooth in-page anchor scrolling delegated through Lenis
// ============================================================

export function initNav(siteData, lenis) {
  const nav = document.getElementById('side-nav');
  if (!nav) return;

  const items = siteData.nav;
  const ids = items.map((i) => i.id);

  // Build dots
  nav.innerHTML = items
    .map(
      (it) => `
        <a href="#${it.id}" class="row" data-id="${it.id}">
          <span class="label">${it.label}</span>
          <span class="dot" aria-hidden="true"></span>
        </a>`
    )
    .join('');
  const rows = Array.from(nav.querySelectorAll('.row'));

  // ─── Active section + visibility ──────────────────────────
  const REF = 0.35; // reference line, 35% from top
  let raf = 0;
  const compute = () => {
    raf = 0;
    const refY = window.innerHeight * REF;
    let best = ids[0];
    let bestDist = Infinity;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      const dist = refY - top;
      if (dist >= 0 && dist < bestDist) {
        bestDist = dist;
        best = id;
      }
    }
    rows.forEach((r) => r.classList.toggle('active', r.dataset.id === best));
    nav.classList.toggle('visible', window.scrollY > window.innerHeight * 0.7);
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
  compute();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // ─── Smooth in-page anchor scrolling (all #anchors) ───────
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; } // placeholder links
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
