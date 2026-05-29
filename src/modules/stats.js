// ============================================================
// Ledger / Receipts — stat cells with count-up numbers
// ============================================================
// Each value's numeric prefix counts up (ease-out) when the
// section enters view; leading zeros are preserved (e.g. "04"),
// trailing literals ("k") and the italic accent suffix stay put.
// ============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Split "10k" → { numeric: 10, literal: "k", pad: 0 }; "04" → { 4, "", 2 }
function parseValue(v) {
  const m = String(v).match(/^(\d+)(.*)$/) || ['', v, ''];
  const digits = m[1] || '0';
  return {
    numeric: parseInt(digits, 10),
    literal: m[2] || '',
    pad: digits.startsWith('0') ? digits.length : 0,
  };
}

export function initStats(siteData) {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;

  const parsed = siteData.stats.map((s) => ({ ...s, ...parseValue(s.v) }));

  grid.innerHTML = parsed
    .map(
      (s) => `
        <div class="stat" role="listitem">
          <div class="value">
            <span class="num">${s.pad ? String(0).padStart(s.pad, '0') : '0'}</span>${s.literal}<span class="it">${s.it}</span>
          </div>
          <div class="label">${s.label}</div>
        </div>`
    )
    .join('');

  const numEls = Array.from(grid.querySelectorAll('.num'));

  ScrollTrigger.create({
    trigger: grid,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      parsed.forEach((s, i) => {
        const el = numEls[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: s.numeric,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            const v = Math.floor(obj.val);
            el.textContent = s.pad ? String(v).padStart(s.pad, '0') : String(v);
          },
        });
      });
    },
  });
}
