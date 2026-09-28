#!/usr/bin/env bash
# Separa HTML/CSS/JS de index.html en archivos externos (css/ y js/).
# Rangos de líneas verificados (1-indexados, inclusive) sobre el index.html ORIGINAL (15,971 líneas).
# Es un script de migración de un solo uso: se niega a correr si ya no hay bloques inline.
set -euo pipefail
cd "$(dirname "$0")/.."

IN=index.html

if ! grep -q '<style' "$IN"; then
  echo "index.html ya no contiene bloques <style> inline; nada que hacer." >&2
  exit 1
fi

mkdir -p css js/vendor

# ===== CSS (rangos incluyen la etiqueta <style>; se recortan 1a/última línea) =====
sed -n '84,8973p'     "$IN" > css/fontawesome.css      # Font Awesome 6.5.2 completo
sed -n '8975,12828p'  "$IN" > css/tailwind.css         # Tailwind v4.2.1 compilado
sed -n '12842,13715p' "$IN" > css/styles.css           # CSS principal del sitio
sed -n '13716,13728p' "$IN" > css/preloader.css        # Ocultar scrollbar (Wix/iframe)
sed -n '13815,13914p' "$IN" > css/preloader-body.css   # Animaciones del preloader (estaba en <body>)
# Fuentes embebidas (Inter + Material Symbols), sin etiquetas
sed -n '11,57p'  "$IN" >  css/fonts.css
sed -n '61,80p'  "$IN" >> css/fonts.css

# Quitar etiquetas <style> y </style> de los bordes
for f in css/fontawesome.css css/tailwind.css css/styles.css css/preloader.css css/preloader-body.css; do
  sed -i '1d;$d' "$f"
done

# ===== JS =====
# GSAP 3.13.0: el "/*!" original comparte línea con <script>, se reinserta como comentario válido
sed -n '12830,12839p' "$IN" > js/vendor/gsap.min.js
sed -i '1i /*!' js/vendor/gsap.min.js
sed -n '13917,13947p'  "$IN" > js/preloader.js         # Lógica de ocultado del preloader
sed -n '15519,15967p'  "$IN" > js/main.js              # JS principal del sitio

# ===== Nuevo index.html con referencias externas (mismo orden de ejecución) =====
{
  sed -n '1,9p' "$IN"   # <!DOCTYPE> ... <head> + meta/title/preconnect
  echo '    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>'
  echo '    <link rel="stylesheet" href="css/fonts.css">'
  echo '    <link rel="stylesheet" href="css/fontawesome.css">'
  echo '    <link rel="stylesheet" href="css/tailwind.css">'
  echo '    <link rel="stylesheet" href="css/styles.css">'
  echo '    <link rel="stylesheet" href="css/preloader.css">'
  echo '    <link rel="stylesheet" href="css/preloader-body.css">'
  echo '    <script src="js/vendor/gsap.min.js"></script>'
  echo '</head>'
  echo ''
  sed -n '13731,13814p' "$IN"   # <body> ... markup preloader (hasta antes del <style> inline)
  echo ''
  echo '    <script src="js/preloader.js"></script>'
  echo ''
  sed -n '13949,15517p' "$IN"   # resto del markup
  echo ''
  echo '    <script src="js/main.js"></script>'
  sed -n '15969,$p' "$IN"       # </body> </html>
} > index.new.html

mv index.new.html "$IN"

echo "== Resumen =="
wc -l "$IN" css/*.css js/*.js js/vendor/*.js
