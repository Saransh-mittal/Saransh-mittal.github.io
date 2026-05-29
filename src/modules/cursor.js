// ============================================================
// Cursor — magnetic ring + dot (mix-blend difference)
// ============================================================
// Dot tracks the pointer 1:1; ring eases behind it and expands
// over interactive elements. Disabled on touch / small screens.
// ============================================================

export function initCursor() {
  if (window.matchMedia('(max-width: 900px)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!dot.classList.contains('ready')) {
      dot.classList.add('ready');
      ring.classList.add('ready');
    }
  };

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', onMove);

  // Expand the ring over interactive targets (event-delegated so it
  // covers nodes added after init).
  const selector = 'a, button, .device, .tl-item, .cap-card, .stat';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(selector)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(selector)) ring.classList.remove('hover');
  });

  requestAnimationFrame(loop);
}
