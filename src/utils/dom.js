// ============================================================
// DOM / math helpers shared across modules
// ============================================================

export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Split a line into per-word wrappers for the slide-up reveal.
 * Produces:  <span class="split-word"><span>Word </span></span> ...
 * The CSS reveals each inner span when an ancestor `.reveal` gains `.in`.
 * @param {string} text
 * @returns {string} HTML string
 */
export function splitLine(text) {
  const words = String(text == null ? '' : text).split(' ');
  return words
    .map((w, i) => {
      const trailing = i < words.length - 1 ? ' ' : '';
      return `<span class="split-word"><span>${w}${trailing}</span></span>`;
    })
    .join('');
}
