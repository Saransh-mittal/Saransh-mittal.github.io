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
  main.style.visibility = 'visible';

  // Trigger entrance reveals once the page is visible
  initReveal();

  ScrollTrigger.refresh();
}

boot();
