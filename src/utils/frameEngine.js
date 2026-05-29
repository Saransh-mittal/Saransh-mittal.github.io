// ============================================================
// Frame Engine — Scroll-driven frame-by-frame renderer
// ============================================================
// Renders pre-extracted frames onto a <canvas> based on scroll
// position. The canvas bitmap is sized to the frames' natural
// pixel dimensions (read off the first loaded frame), so any
// aspect ratio — landscape laptop captures or portrait phone
// shots — renders crisp; CSS `object-fit: cover` handles the
// display fit. A single frame (frameCount === 1) just renders a
// static image.
// ============================================================

/**
 * Initialize the frame engine for a project.
 * @param {HTMLCanvasElement} canvas
 * @param {object} project - Project data from SSOT (framesPath, frameCount, frameExtension)
 * @param {HTMLElement} [progressBar] - Optional progress bar element
 * @returns {{ update?: Function, destroy: Function }} Cleanup handle
 */
export function initFrameEngine(canvas, project, progressBar) {
  if (!canvas || project.frameCount <= 0) return { destroy: () => {} };

  const ctx = canvas.getContext('2d');
  const frames = [];
  let currentFrame = -1;
  let sized = false;

  // Placeholder bitmap until the first real frame reports its natural size
  // (avoids a 0×0 canvas flash).
  canvas.width = 1280;
  canvas.height = 800;

  // Match the canvas bitmap to the source frame's natural size so the image
  // is drawn 1:1 — CSS object-fit then fits it to the device frame.
  function sizeFromImage(img) {
    if (sized || !img.naturalWidth) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    sized = true;
  }

  // Preload all frames
  for (let i = 1; i <= project.frameCount; i++) {
    const img = new Image();
    const pad = String(i).padStart(4, '0');
    img.src = `${project.framesPath}frame_${pad}.${project.frameExtension}`;
    frames.push(img);
  }

  /** Render a specific frame index on the canvas. */
  function renderFrame(index) {
    if (index < 0 || index >= frames.length) return;
    const img = frames[index];
    if (!img.complete || !img.naturalWidth) return;
    sizeFromImage(img);
    if (index === currentFrame) return;
    currentFrame = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  /** Update based on scroll progress (0 → 1). */
  function update(progress) {
    const clamped = Math.max(0, Math.min(1, progress));
    const index = Math.floor(clamped * (project.frameCount - 1));
    renderFrame(index);
    if (progressBar) progressBar.style.width = `${clamped * 100}%`;
  }

  // Render the first frame as soon as it decodes.
  const checkFirst = setInterval(() => {
    if (frames[0]?.complete && frames[0]?.naturalWidth) {
      renderFrame(0);
      clearInterval(checkFirst);
    }
  }, 80);

  function destroy() {
    clearInterval(checkFirst);
    frames.length = 0;
  }

  return { update, destroy };
}
