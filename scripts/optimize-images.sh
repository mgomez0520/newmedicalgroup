#!/usr/bin/env bash
# Script simple para generar versiones WebP de las imágenes del sitio.
# Requiere `cwebp` (paquete libwebp). En macOS: `brew install webp`

set -e
SRC_DIR="assets/images"
find "$SRC_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while read -r img; do
  out="${img%.*}.webp"
  echo "Generando $out"
  cwebp -q 80 "$img" -o "$out" >/dev/null 2>&1 || { echo "cwebp falló para $img"; }
done

echo "Hecho. Revisa $SRC_DIR para los .webp generados. Añade y commitea los nuevos archivos al repo."
