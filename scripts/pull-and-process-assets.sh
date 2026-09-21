#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p /tmp/fb public/media

BASE="https://raw.githubusercontent.com/Kirans0615/Flat-Bridge/main"
echo "== pulling source assets =="
curl -sL -o /tmp/fb/bridge_src.mp4 "$BASE/bridge_8s_4k.mp4"
curl -sL -o /tmp/fb/logo1.png "$BASE/logo1.png"
curl -sL -o /tmp/fb/logo2.png "$BASE/logo2.png"
curl -sL -o /tmp/fb/team-flatbridge.png "$BASE/1%20(1).png"
curl -sL -o /tmp/fb/culture-stock.jpg "$BASE/employees-selfie-and-business-people-with-diversity-happiness-and-profile-picture-for-about-us-p.jpg"
curl -sL -o /tmp/fb/port-golden-hour.jpg "$BASE/pexels-tomfisk-3338019.jpg"
curl -sL -o /tmp/fb/container-yard.jpg "$BASE/pexels-jan-van-der-wolf-11680885-33537946.jpg"
curl -sL -o /tmp/fb/caribbean-pier.jpg "$BASE/pexels-dirk-schuneman-113939707-9720445.jpg"
ls -la /tmp/fb

for f in /tmp/fb/*; do
  sz=$(wc -c < "$f")
  if [ "$sz" -lt 2000 ]; then
    echo "WARNING: $f is suspiciously small ($sz bytes) — may be an HTML error page, not the real asset" >&2
  fi
done

echo "== video: seamless loop =="
ffmpeg -y -i /tmp/fb/bridge_src.mp4 -an -filter_complex \
 "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" \
 -c:v libx264 -crf 18 -preset slow /tmp/fb/bridge_loop.mp4

echo "== video: 1080p mp4/webm =="
ffmpeg -y -i /tmp/fb/bridge_loop.mp4 -an -vf "scale=1920:-2:flags=lanczos" \
 -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p \
 -movflags +faststart -g 60 public/media/hero-1080.mp4
ffmpeg -y -i /tmp/fb/bridge_loop.mp4 -an -vf "scale=1920:-2:flags=lanczos" \
 -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
 public/media/hero-1080.webm

echo "== video: 720p mp4/webm =="
ffmpeg -y -i /tmp/fb/bridge_loop.mp4 -an -vf "scale=1280:-2:flags=lanczos" \
 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart \
 public/media/hero-720.mp4
ffmpeg -y -i /tmp/fb/bridge_loop.mp4 -an -vf "scale=1280:-2:flags=lanczos" \
 -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 public/media/hero-720.webm

echo "== poster =="
ffmpeg -y -i /tmp/fb/bridge_loop.mp4 -vf "select=eq(n\,0),scale=1920:-2" -frames:v 1 -q:v 2 /tmp/fb/poster.jpg
cwebp -q 72 /tmp/fb/poster.jpg -o public/media/hero-poster.webp
ffmpeg -y -i /tmp/fb/poster.jpg -vf scale=32:-2 -q:v 12 /tmp/fb/blur.jpg

echo "== images: convert to webp at multiple widths =="
for name in team-flatbridge culture-stock port-golden-hour container-yard caribbean-pier; do
  src="/tmp/fb/${name}.jpg"
  [ -f "/tmp/fb/${name}.png" ] && src="/tmp/fb/${name}.png"
  for w in 2400 1600 900 480; do
    cwebp -q 82 -resize "$w" 0 "$src" -o "public/media/${name}-${w}.webp" 2>/dev/null || true
  done
done

echo "== logos =="
cp /tmp/fb/logo1.png public/media/logo-black-green.png
cp /tmp/fb/logo2.png public/media/logo-green.png

echo "== byte sizes =="
ls -la public/media/
echo "DONE"
