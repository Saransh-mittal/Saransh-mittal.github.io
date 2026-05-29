// ============================================================
// Main Entry — Orchestrates all modules
// Engineering-log portfolio · Vite + GSAP/ScrollTrigger + Lenis
// ============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { siteData } from './data/siteData.js';
import { initPreloader } from './modules/preloader.js';
import { initChrome } from './modules/chrome.js';
import { initNav } from './modules/nav.js';
import { initHero } from './modules/hero.js';
import { initProjects } from './modules/projects.js';
import { initSkills } from './modules/skills.js';
import { initTimeline } from './modules/timeline.js';
import { initStats } from './modules/stats.js';
import { initContact } from './modules/contact.js';
import { initCursor } from './modules/cursor.js';
import { initReveal } from './modules/reveal.js';

gsap.registerPlugin(ScrollTrigger);

// ─── Smooth Scroll ──────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ─── Scroll position persistence ────────────────────────────
// Remember where the visitor was so returning from a case study lands them
// back at the same spot instead of the top. We manage this ourselves, so
// turn off the browser's own (conflicting) scroll restoration.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const SCROLL_KEY = 'sm:portfolioScroll';

function cameFromCaseStudy() {
  try {
    if (!document.referrer) return false;
    const u = new URL(document.referrer);
    return u.host === location.host && /\/case-study\.html$/.test(u.pathname);
  } catch (e) { return false; }
}

// Persist scroll when navigating away (into a case study, etc.)
window.addEventListener('pagehide', () => {
  try { sessionStorage.setItem(SCROLL_KEY, String(window.scrollY)); } catch (e) { /* private mode */ }
});

// ─── Boot ───────────────────────────────────────────────────
async function boot() {
  // Build DOM + behaviours from the single source of truth
  initChrome(siteData);          // clock, scroll-progress bar, footer links
  initNav(siteData, lenis);      // right-edge dot index + smooth anchors
  initHero(siteData);            // hero markup + scroll parallax
  initProjects(siteData);        // pinned-feel project rows + device tilt
  initSkills(siteData);          // capabilities matrix
  initTimeline(siteData);        // scroll-synced journey
  initStats(siteData);           // count-up receipts
  initContact(siteData);         // contact outro
  initCursor();                  // magnetic cursor

  // Run preloader, then reveal
  await initPreloader(siteData);

  const main = document.getElementById('main-content');

  // If we're returning from a case study, skip the entrance animation and
  // restore the previous scroll position so it feels continuous.
  const returning = cameFromCaseStudy();
  initReveal(document, { immediate: returning });
  ScrollTrigger.refresh();

  let restoreY = 0;
  if (returning) {
    try { restoreY = parseInt(sessionStorage.getItem(SCROLL_KEY) || '0', 10) || 0; } catch (e) { /* private mode */ }
    // Jump to the saved spot while still hidden (layout is already computed),
    // so there's no flash at the top before the restore.
    if (restoreY > 0) lenis.scrollTo(restoreY, { immediate: true, force: true });
  }

  main.style.visibility = 'visible';

  // Re-sync triggers after the jump (transforms depend on final scroll pos).
  if (restoreY > 0) {
    requestAnimationFrame(() => { lenis.scrollTo(restoreY, { immediate: true, force: true }); ScrollTrigger.refresh(); });
  }
}

boot();
