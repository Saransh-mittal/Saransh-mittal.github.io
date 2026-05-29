// ============================================================
// Chrome — header clock (IST), scroll-progress bar, footer links
// ============================================================

function fmtIST(d) {
  const opts = {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: 'Asia/Kolkata',
  };
  return new Intl.DateTimeFormat('en-GB', opts).format(d) + ' IST';
}

export function initChrome(siteData) {
  const { personal } = siteData;

  // ─── Live IST clock ───────────────────────────────────────
  const clock = document.getElementById('clock');
  if (clock) {
    const tick = () => { clock.textContent = fmtIST(new Date()); };
    tick();
    setInterval(tick, 1000);
  }

  // ─── Scroll-progress bar ──────────────────────────────────
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  // ─── Footer links ─────────────────────────────────────────
  const footer = document.getElementById('footer-links');
  if (footer) {
    const links = [
      { label: 'GitHub', href: personal.links.github },
      { label: 'LinkedIn', href: personal.links.linkedin },
      { label: 'LeetCode', href: personal.links.leetcode },
      { label: 'Email', href: `mailto:${personal.email}` },
    ];
    footer.innerHTML = links
      .map((l) => {
        const ext = l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${l.href}"${ext}>${l.label}</a>`;
      })
      .join('');
  }
}
