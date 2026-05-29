// ============================================================
// Preloader — Giant counter + wipe transition
// ============================================================

export function initPreloader(siteData) {
  return new Promise((resolve) => {
    const el = document.getElementById('preloader');
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
