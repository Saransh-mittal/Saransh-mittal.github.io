// ============================================================
// Frame Engine — Scroll-driven frame-by-frame video renderer
// ============================================================
// Uses <canvas> to render pre-extracted video frames based on
// scroll position. Falls back to a styled placeholder if no
// frames are available (frameCount === 0).
// ============================================================

/**
 * Initialize the frame engine for a project.
 * @param {HTMLCanvasElement} canvas
 * @param {object} project - Project data from SSOT
 * @param {HTMLElement} progressBar - Progress bar element
 * @returns {{ destroy: Function }} Cleanup handle
 */
export function initFrameEngine(canvas, project, progressBar) {
  if (!canvas || project.frameCount <= 0) return { destroy: () => {} };

  const ctx = canvas.getContext('2d');
  const frames = [];
  let loaded = 0;
  let currentFrame = -1;

  // Determine canvas size based on device frame type
  const isPhone = project.device === 'phone' || project.deviceFrame === 'phone';
  const width = isPhone ? 390 : 1280;
  const height = isPhone ? 844 : 800;
  canvas.width = width;
  canvas.height = height;

  // Preload all frames
  for (let i = 1; i <= project.frameCount; i++) {
    const img = new Image();
    const pad = String(i).padStart(4, '0');
    img.src = `${project.framesPath}frame_${pad}.${project.frameExtension}`;
    img.onload = () => {
      loaded++;
    };
    frames.push(img);
  }

  /**
   * Render a specific frame index on the canvas.
   */
  function renderFrame(index) {
    if (index === currentFrame) return;
    if (index < 0 || index >= frames.length) return;
    const img = frames[index];
    if (!img.complete || !img.naturalWidth) return;

    currentFrame = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  /**
   * Update based on scroll progress (0 → 1).
   */
  function update(progress) {
    const clamped = Math.max(0, Math.min(1, progress));
    const index = Math.floor(clamped * (project.frameCount - 1));
    renderFrame(index);

    if (progressBar) {
      progressBar.style.width = `${clamped * 100}%`;
    }
  }

  // Render first frame when loaded
  const checkFirst = setInterval(() => {
    if (frames[0]?.complete && frames[0]?.naturalWidth) {
      renderFrame(0);
      clearInterval(checkFirst);
    }
  }, 100);

  function destroy() {
    clearInterval(checkFirst);
    frames.length = 0;
  }

  return { update, destroy };
}
