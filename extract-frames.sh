#!/bin/zsh
# ============================================================
# Frame Extraction Script — Run after recording all 4 demos
# Place raw videos in ./raw-videos/ directory first
# ============================================================

set -e
cd "$(dirname "$0")"

echo ""
echo "══════════════════════════════════════════════"
echo "  🎬  FRAME EXTRACTION PIPELINE"
echo "══════════════════════════════════════════════"
echo ""

# Check ffmpeg
if ! command -v ffmpeg &>/dev/null; then
  echo "❌ ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

# Check raw videos exist
MISSING=0
for f in disciplog quick-clash rapid-recap ai-yoga; do
  # Support both .mov and .mp4
  if [[ ! -f "raw-videos/${f}.mov" && ! -f "raw-videos/${f}.mp4" ]]; then
    echo "⚠️  Missing: raw-videos/${f}.mov (or .mp4)"
    MISSING=1
  fi
done

if [[ $MISSING -eq 1 ]]; then
  echo ""
  echo "Place your recordings in ./raw-videos/ with these names:"
  echo "  disciplog.mov    (or .mp4)"
  echo "  quick-clash.mov  (or .mp4)"
  echo "  rapid-recap.mov  (or .mp4)"
  echo "  ai-yoga.mov      (or .mp4)"
  echo ""
  echo "Only extracting frames for videos that exist..."
  echo ""
fi

# Helper: find video file (.mov or .mp4)
find_video() {
  if [[ -f "raw-videos/${1}.mov" ]]; then echo "raw-videos/${1}.mov"
  elif [[ -f "raw-videos/${1}.mp4" ]]; then echo "raw-videos/${1}.mp4"
  else echo ""
  fi
}

# ── Extract: DiscipLog (laptop 1280px) ──
VID=$(find_video "disciplog")
if [[ -n "$VID" ]]; then
  echo "🎬 [1/4] Extracting DiscipLog frames..."
  rm -f public/frames/disciplog/frame_*.webp
  ffmpeg -y -loglevel warning -i "$VID" \
    -vf "fps=4,scale=1280:-1:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 \
    public/frames/disciplog/frame_%04d.webp
  echo "   ✅ $(ls -1 public/frames/disciplog/frame_*.webp | wc -l | tr -d ' ') frames"
fi

# ── Extract: Quick Clash (phone 390px) ──
VID=$(find_video "quick-clash")
if [[ -n "$VID" ]]; then
  echo "🎬 [2/4] Extracting Quick Clash frames..."
  rm -f public/frames/quick-clash/frame_*.webp
  ffmpeg -y -loglevel warning -i "$VID" \
    -vf "fps=4,scale=390:-1:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 \
    public/frames/quick-clash/frame_%04d.webp
  echo "   ✅ $(ls -1 public/frames/quick-clash/frame_*.webp | wc -l | tr -d ' ') frames"
fi

# ── Extract: Rapid Recap AI (laptop 1280px) ──
VID=$(find_video "rapid-recap")
if [[ -n "$VID" ]]; then
  echo "🎬 [3/4] Extracting Rapid Recap frames..."
  rm -f public/frames/rapid-recap/frame_*.webp
  ffmpeg -y -loglevel warning -i "$VID" \
    -vf "fps=4,scale=1280:-1:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 \
    public/frames/rapid-recap/frame_%04d.webp
  echo "   ✅ $(ls -1 public/frames/rapid-recap/frame_*.webp | wc -l | tr -d ' ') frames"
fi

# ── Extract: AI Yoga Guide (phone 390px) ──
VID=$(find_video "ai-yoga")
if [[ -n "$VID" ]]; then
  echo "🎬 [4/4] Extracting AI Yoga Guide frames..."
  rm -f public/frames/ai-yoga/frame_*.webp
  ffmpeg -y -loglevel warning -i "$VID" \
    -vf "fps=4,scale=390:-1:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 \
    public/frames/ai-yoga/frame_%04d.webp
  echo "   ✅ $(ls -1 public/frames/ai-yoga/frame_*.webp | wc -l | tr -d ' ') frames"
fi

# ── Summary ──
echo ""
echo "══════════════════════════════════════════════"
echo "  📊  RESULTS"
echo "══════════════════════════════════════════════"
echo ""

for proj in disciplog quick-clash rapid-recap ai-yoga; do
  COUNT=$(ls -1 "public/frames/${proj}/frame_"*.webp 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$COUNT" -gt 0 ]]; then
    SIZE=$(du -sh "public/frames/${proj}/" | cut -f1)
    echo "  ${proj}: ${COUNT} frames (${SIZE})"
  else
    echo "  ${proj}: — no frames —"
  fi
done

TOTAL=$(du -sh public/frames/ 2>/dev/null | cut -f1)
echo ""
echo "  Total: ${TOTAL}"
echo ""
echo "══════════════════════════════════════════════"
echo ""
echo "📝 Next: Update frameCount in src/data/siteData.js"
echo "   with the numbers above, then refresh localhost:3000"
echo ""
