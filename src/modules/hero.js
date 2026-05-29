// ============================================================
// Hero — minimal serif name + scroll parallax
// ============================================================
// Title parallaxes up at 0.18× scroll, the background grid drifts
// at 0.4×, and the bottom row (scroll cue + location) fades out as
// the hero leaves the viewport. Split-text reveal is driven by the
// shared `.reveal` mechanism.
// ============================================================
import { splitLine, clamp } from '../utils/dom.js';

export function initHero(siteData) {
  const section = document.getElementById('index');
  if (!section) return;
  const { personal } = siteData;
  const { nameParts } = personal;

  // Append the live hero as direct children of <section>, preserving the
  // <noscript> SEO fallback that's already inside it.
  section.insertAdjacentHTML(
    'beforeend',
    `
    <div class="hero-grid-bg" id="hero-grid-bg" aria-hidden="true"></div>
    <div class="wrap">
      <div class="hero-top">
        <span class="hero-availability"><span class="led" aria-hidden="true"></span> ${personal.available}</span>
        <span class="hero-coords">${personal.coords}</span>
      </div>

      <div class="hero-parallax" id="hero-parallax">
        <div class="hero-center reveal">
          <div class="hero-portrait">
            <div class="portrait-glow"></div>
            <img src="/saransh.webp" alt="Saransh Mittal" class="portrait-img" />
          </div>
          <h1 class="hero-title">
            <span class="sub-line">${splitLine(nameParts.pre)}</span>
            <span class="sub-line"><span class="it">${splitLine(nameParts.it)}</span></span>
          </h1>
          <div class="hero-role">${personal.roleLine}</div>
        </div>
      </div>

      <div class="hero-bottom" id="hero-bottom">
        <div class="scroll-cue reveal"><span>Scroll</span><span class="line" aria-hidden="true"></span></div>
        <div class="hero-coords reveal">${personal.location}</div>
      </div>
    </div>
  `
  );

  const parallax = section.querySelector('#hero-parallax');
  const grid = section.querySelector('#hero-grid-bg');
  const bottom = section.querySelector('#hero-bottom');

  // ─── Scroll parallax ──────────────────────────────────────
  let raf = 0;
  const update = () => {
    raf = 0;
    const y = window.scrollY;
    parallax.style.transform = `translate3d(0, ${-y * 0.18}px, 0)`;
    grid.style.transform = `translate3d(0, ${-y * 0.4}px, 0)`;
    bottom.style.opacity = clamp(1 - y / 600, 0, 1);
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
