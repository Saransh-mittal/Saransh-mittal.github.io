// ============================================================
// Case Study page entry — hash-routed per-project deep dive
// ============================================================
// Mirrors the portfolio's stack: Lenis smooth scroll, scroll
// progress bar, reveal-on-scroll, and the magnetic cursor.
// Routed by location.hash (#disciplog, #quick-clash, …); the
// per-project accent flows through the whole page via --cs-accent.
// ============================================================
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { siteData } from './data/siteData.js';
import { caseStudies } from './data/caseStudies.js';
import { initCursor } from './modules/cursor.js';
import { initReveal } from './modules/reveal.js';

const root = document.getElementById('cs-root');
const FALLBACK = 'disciplog';

// ─── Smooth scroll ──────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ─── Scroll progress bar ────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  let pending = 0;
  const update = () => {
    pending = 0;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  };
  const onScroll = () => { if (!pending) pending = requestAnimationFrame(update); };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

// ─── Render helpers ─────────────────────────────────────────
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

function renderCaseStudy(cs) {
  const next = caseStudies[cs.next] || caseStudies[FALLBACK];
  const { personal } = siteData;

  // Mobile-only projects show a portrait hero frame instead of being
  // stretched into the 16:9 landscape capture frame.
  const project = siteData.projects.find((p) => p.id === cs.id);
  const isPhone = (project?.device || 'laptop') === 'phone';

  return `
    <nav class="cs-nav">
      <a href="/index.html" class="back">
        <span class="arr" aria-hidden="true">←</span>
        <span>Back to portfolio</span>
      </a>
      <div class="crumb">Case study · <b>${esc(cs.name)}</b></div>
    </nav>

    <header class="cs-hero">
      <div class="cs-tag reveal">${esc(cs.tagline)}</div>
      <h1 class="cs-title reveal">
        <span>${esc(cs.nameParts.pre)}</span><span class="it">${esc(cs.nameParts.it)}</span><span>${esc(cs.nameParts.post)}</span>
      </h1>
      <p class="cs-summary reveal">${esc(cs.summary)}</p>
      <div class="cs-meta reveal">
        ${cs.meta
          .map((m) => `<div><span class="k">${esc(m.k)}</span><span class="v">${esc(m.v)}</span></div>`)
          .join('')}
      </div>
    </header>

    <div class="cs-hero-img reveal${isPhone ? ' is-phone' : ''}">
      <div class="frame">
        <img
          class="cs-hero-shot"
          src="/frames/${esc(cs.id)}/frame_0001.webp"
          alt="${esc(cs.name)} — product screen capture"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="placeholder" style="position:absolute;inset:0;display:none">
          <span class="label">${esc(cs.name)} · hero capture</span>
          <span class="ratio">/frames/${esc(cs.id)}/frame_0001.webp</span>
        </div>
      </div>
    </div>

    <section class="cs-overview">
      <div class="label reveal">Overview</div>
      <div class="body">
        ${cs.overview.map((p) => `<p class="reveal">${esc(p)}</p>`).join('')}
      </div>
    </section>

    <section class="cs-pull">
      <div class="cs-pull-label reveal">In one line</div>
      <div>
        <q class="reveal">${esc(cs.pull.quote)}</q>
        <div class="attr reveal">${esc(cs.pull.attribution)}</div>
      </div>
    </section>

    <div class="cs-sections">
      ${cs.sections
        .map(
          (s) => `
        <article class="cs-section">
          <div class="side reveal">
            <span class="n">${esc(s.n)}</span>
            <span>Section</span>
          </div>
          <div>
            <h3 class="reveal">${esc(s.title)}</h3>
            <div class="body reveal">
              <p>${esc(s.body)}</p>
              <ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
            </div>
          </div>
        </article>`
        )
        .join('')}
    </div>

    <section class="cs-numbers">
      <div class="cs-numbers-grid reveal">
        ${cs.numbers
          .map((n) => `<div><div class="v">${esc(n.v)}</div><div class="label">${esc(n.label)}</div></div>`)
          .join('')}
      </div>
    </section>

    <section class="cs-lessons">
      <div class="head-block">
        <div class="head-label reveal">06 — What stuck</div>
        <div class="head reveal">Lessons <span class="it">learned.</span></div>
      </div>
      <ol class="reveal">
        ${cs.lessons.map((l) => `<li>${esc(l)}</li>`).join('')}
      </ol>
    </section>

    <section class="cs-next" style="--cs-next-accent:${esc(next.accent)}">
      <div class="label reveal">Next case study</div>
      <div class="reveal">
        <a href="#${esc(next.id)}">
          <span>
            <span>${esc(next.nameParts.pre)}</span><span style="font-style:italic;color:${esc(next.accent)}">${esc(next.nameParts.it)}</span><span>${esc(next.nameParts.post)}</span>
          </span>
          <span class="arr" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <footer class="cs-footer">
      <div>© 2026 · Saransh Mittal</div>
      <div class="links">
        <a href="/index.html">Portfolio</a>
        <a href="${esc(personal.links.github)}" target="_blank" rel="noopener">GitHub</a>
        <a href="${esc(personal.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:${esc(personal.email)}">Email</a>
      </div>
    </footer>
  `;
}

// ─── Route ──────────────────────────────────────────────────
function route() {
  const id = window.location.hash.slice(1) || FALLBACK;
  const cs = caseStudies[id] || caseStudies[FALLBACK];

  document.documentElement.style.setProperty('--cs-accent', cs.accent);
  document.title = `${cs.name} · Case Study — Saransh Mittal`;

  root.innerHTML = renderCaseStudy(cs);

  // Re-init scroll-triggered reveals for the freshly rendered DOM
  initReveal(root);
  lenis.scrollTo(0, { immediate: true });
}

window.addEventListener('hashchange', route);
route();
initScrollProgress();
initCursor();
