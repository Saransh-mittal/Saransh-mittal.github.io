// ============================================================
// Reveal — scroll-triggered entrance for .reveal / .reveal-stagger
// ============================================================
// Adds the `in` class as elements enter the viewport, which drives
// the CSS transitions (opacity / translateY / split-word slide-up).
// Elements already in view at boot reveal immediately.
// ============================================================

export function initReveal(root = document, { immediate = false } = {}) {
  const els = root.querySelectorAll('.reveal, .reveal-stagger');
  if (!els.length) return;

  // Returning visitors (e.g. coming back from a case study) have already
  // seen the entrance — reveal everything at once instead of replaying it.
  if (immediate) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const inViewNow = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.95 && r.bottom > 0;
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  els.forEach((el) => {
    if (inViewNow(el)) {
      requestAnimationFrame(() => el.classList.add('in'));
    } else {
      obs.observe(el);
    }
  });
}
