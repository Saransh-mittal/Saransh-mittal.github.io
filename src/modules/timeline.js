// ============================================================
// Journey — vertical, scroll-synced timeline
// ============================================================
// The accent line fills top→bottom as the section scrolls past a
// 50%-from-top reference line; each item lights up once its dot
// crosses that same line (and dims again when scrolled back).
// ============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initTimeline(siteData) {
  const timeline = document.getElementById('timeline');
  const fill = document.getElementById('tl-line-fill');
  if (!timeline) return;

  siteData.timeline.forEach((t) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.setAttribute('role', 'listitem');
    item.innerHTML = `
      <div class="when">
        <span class="yr">${t.yr}</span>
        <span>${t.mo}</span>
      </div>
      <div class="body">
        <h4>${t.title}</h4>
        <p>${t.desc}</p>
      </div>
    `;
    timeline.appendChild(item);
  });

  const items = timeline.querySelectorAll('.tl-item');

  // Accent line fills as the section passes the 50% reference line
  if (fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );
  }

  // Each item activates when its dot (≈42px below its top) crosses the line
  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top+=42 50%',
      end: 'bottom top',
      onEnter: () => item.classList.add('is-active'),
      onLeaveBack: () => item.classList.remove('is-active'),
    });
  });
}
