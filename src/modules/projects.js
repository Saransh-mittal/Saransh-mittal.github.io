// ============================================================
// Projects — Selected Work rows
// ============================================================
// Each row: sticky info column + a device frame that floats up,
// rotates (+2.5° → −1.5°) and scales (0.95 → 1) as it crosses the
// viewport. Device frames are placeholders until screenshots are
// dropped into framesPath (frameCount > 0), then the frame engine
// renders them scrubbed to scroll.
// ============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initFrameEngine } from '../utils/frameEngine.js';
import { clamp, lerp } from '../utils/dom.js';

export function initProjects(siteData) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const total = String(siteData.projects.length).padStart(2, '0');

  siteData.projects.forEach((p, idx) => {
    const flip = idx % 2 === 1;
    const hasFrames = p.frameCount > 0;

    const frameInner = hasFrames
      ? `<canvas class="frame-canvas" id="canvas-${p.id}"></canvas>`
      : `<div class="placeholder">
           <span class="label">${p.name}</span>
           <span class="ratio">/frames/${p.id}/*.webp</span>
         </div>`;

    const device =
      p.device === 'laptop'
        ? `<div class="device laptop">
             <div class="chrome">
               <span></span><span></span><span></span>
               <span class="url">${p.url}</span>
             </div>
             ${frameInner}
           </div>`
        : `<div class="device phone">${frameInner}</div>`;

    const article = document.createElement('article');
    article.className = 'project';
    article.id = `project-${p.id}`;
    article.style.setProperty('--accent-color', p.accent);
    article.setAttribute('aria-label', `Project: ${p.name}`);
    article.innerHTML = `
      <div class="wrap">
        <div class="project-row">
          <div class="project-info reveal" style="order:${flip ? 2 : 1}">
            <div class="project-num">
              <span class="accent-dot" aria-hidden="true"></span>
              <span>${p.num} / ${total}</span>
              <span style="margin-left:auto">${p.year}</span>
            </div>
            <h3 class="project-name">
              <span>${p.nameParts.pre}</span><span class="it">${p.nameParts.it}</span><span>${p.nameParts.post}</span>
            </h3>
            <div class="project-tagline">${p.shortTagline}</div>
            <p class="project-desc">${p.shortDesc}</p>
            <div class="project-stack">
              ${p.stack.slice(0, 5).map((s) => `<span class="chip">${s}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="case-study.html#${p.id}" class="btn primary">Case study <span class="arr">↗</span></a>
              ${p.links.code && p.links.code !== '#'
                ? `<a href="${p.links.code}" target="_blank" rel="noopener" class="btn">Code <span class="arr">↗</span></a>`
                : ''
              }
              ${p.links.live && p.links.live !== '#'
                ? `<a href="${p.links.live}" target="_blank" rel="noopener" class="btn">Live <span class="arr">↗</span></a>`
                : ''
              }
            </div>
          </div>
          <div class="device-stack" id="device-${p.id}" style="order:${flip ? 1 : 2}">
            ${device}
          </div>
        </div>
      </div>
    `;
    container.appendChild(article);

    const deviceStack = article.querySelector(`#device-${p.id}`);

    // Frame engine (no-op while frameCount === 0)
    let engine = null;
    if (hasFrames) {
      const canvas = document.getElementById(`canvas-${p.id}`);
      engine = initFrameEngine(canvas, p, null);
    }

    // Entrance fade for the device
    gsap.set(deviceStack, { opacity: 0, y: 60, rotate: 2.5, scale: 0.95 });
    gsap.to(deviceStack, {
      opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: article, start: 'top 85%', toggleActions: 'play none none none' },
    });

    // Scroll-tied tilt / lift / scale + frame scrub
    ScrollTrigger.create({
      trigger: article,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const t = clamp((self.progress - 0.15) / 0.7, 0, 1);
        gsap.set(deviceStack, {
          y: lerp(60, -30, t),
          rotate: lerp(2.5, -1.5, t),
          scale: lerp(0.95, 1, clamp(t * 1.4, 0, 1)),
        });
        if (engine?.update) engine.update(self.progress);
      },
    });
  });
}
