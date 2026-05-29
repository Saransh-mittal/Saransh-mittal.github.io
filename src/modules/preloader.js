// ============================================================
// Preloader — Giant counter + wipe transition
// ============================================================

// Play the intro preloader once per browser session. Subsequent loads in the
// same session — e.g. returning to the portfolio from a case study — skip it
// and reveal the site immediately.
const SEEN_KEY = 'sm:preloaderSeen';

export function initPreloader(siteData) {
  return new Promise((resolve) => {
    const el = document.getElementById('preloader');

    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* private mode */ }

    if (seen) {
      // Skip straight to the revealed site.
      if (el) el.style.display = 'none';
      resolve();
      return;
    }

    const num = document.getElementById('preloader-num');
    const fill = document.getElementById('preloader-line-fill');
    const word = document.getElementById('preloader-word');

    word.textContent = 'Loading portfolio';

    let progress = 0;
    const duration = 1600;
    const start = Date.now();

    function tick() {
      const elapsed = Date.now() - start;
      progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const pct = Math.round(eased * 100);

      num.textContent = pct;
      fill.style.width = `${pct}%`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* private mode */ }
        setTimeout(() => {
          el.classList.add('done');
          setTimeout(() => {
            el.style.display = 'none';
            resolve();
          }, 800);
        }, 200);
      }
    }

    requestAnimationFrame(tick);
  });
}
