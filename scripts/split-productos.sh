#!/usr/bin/env bash
# Separa HTML/CSS/JS de productos.html en archivos externos (css/ y js/),
# reutilizando los assets compartidos con index.html cuando son idénticos.
# Rangos de líneas verificados (1-indexados, inclusive) sobre el productos.html ORIGINAL (15,525 líneas).
# Es un script de migración de un solo uso: se niega a correr si ya no hay bloques inline.
set -euo pipefail
cd "$(dirname "$0")/.."

IN=productos.html

if ! grep -q '<style' "$IN"; then
  echo "productos.html ya no contiene bloques <style> inline; nada que hacer." >&2
  exit 1
fi

mkdir -p css js/vendor
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# ===== CSS =====
# Fuentes embebidas: Inter (11-57) + Material Symbols (60-79), sin etiquetas
sed -n '11,57p'  "$IN" >  "$TMP/fonts.new.css"
sed -n '61,79p'  "$IN" >> "$TMP/fonts.new.css"

extract_css() { sed -n "$2p" "$IN" > "$1" && sed -i '1d;$d' "$1"; }  # $2 = rango con etiquetas -> recortar bordes

extract_css "$TMP/tailwind.new.css"        82,4159
extract_css "$TMP/catalogo.new.css"      4160,5815   # :root/catálogo propio de la página
extract_css "$TMP/floating-actions.new.css" 5817,6131
extract_css "$TMP/preloader.new.css"     6132,6144
extract_css "$TMP/preloader-body.new.css" 6229,6327

# ===== JS =====
sed -n '6330,6360p' "$IN" > "$TMP/preloader.new.js"
sed -n '6979,10726p' "$IN" > "$TMP/products-data.new.js"   # window.PRODUCTS_DATA
sed -n '10729,15282p' "$IN" > "$TMP/products.new.js"        # lógica principal (render, lightbox, filtros)
sed -n '15307,15325p' "$IN" > "$TMP/floating.new.js"        # botones flotantes (wa/scroll)
sed -n '15328,15520p' "$IN" > "$TMP/navbar.new.js"          # navbar compartido

# ===== Decidir: reutilizar existente o escribir nuevo =====
adopt() { # $1 tmp, $2 final
  if [ -f "$2" ] && cmp -s "$1" "$2"; then
    echo "reutiliza  $2"
  else
    mv "$1" "$2"
    echo "nuevo      $2"
  fi
}

echo "== Resultado de adopción =="
adopt "$TMP/fonts.new.css"             css/fonts.css
adopt "$TMP/tailwind.new.css"          css/tailwind.css
adopt "$TMP/catalogo.new.css"          css/catalogo.css
adopt "$TMP/floating-actions.new.css"  css/floating-actions.css
adopt "$TMP/preloader.new.css"         css/preloader.css
adopt "$TMP/preloader-body.new.css"    css/preloader-body.css
adopt "$TMP/preloader.new.js"          js/preloader.js
adopt "$TMP/products-data.new.js"      js/products-data.js
adopt "$TMP/products.new.js"           js/products.js
adopt "$TMP/floating.new.js"           js/floating.js
adopt "$TMP/navbar.new.js"             js/navbar.js

# ===== Nuevo productos.html con referencias externas (mismo orden de ejecución) =====
{
  sed -n '1,10p' "$IN"          # <!doctype> ... <head> + preconnects
  echo '    <link rel="stylesheet" href="css/fonts.css">'
  echo '    <link rel="stylesheet" href="css/tailwind.css">'
  echo '    <link rel="stylesheet" href="css/catalogo.css">'
  echo '    <link rel="stylesheet" href="css/floating-actions.css">'
  echo '    <link rel="stylesheet" href="css/preloader.css">'
  echo '    <link rel="stylesheet" href="css/preloader-body.css">'
  echo '</head>'
  echo ''
  echo '<body>'
  sed -n '6148,6227p' "$IN"     # markup preloader (de <body> al <style> inline)
  echo ''
  echo '    <script src="js/preloader.js"></script>'
  echo ''
  sed -n '6362,6978p' "$IN"     # resto del markup (navbar, catálogo, lightbox, wa-wrap)
  echo ''
  echo '    <script src="js/products-data.js"></script>'
  echo '    <script src="js/products.js"></script>'
  echo ''
  sed -n '15283,15306p' "$IN"   # markup botones flotantes + scroll-top
  echo '    <script src="js/floating.js"></script>'
  echo '    <!-- INSTEIP_SHARED_NAVBAR_SCRIPT -->'
  echo '    <script src="js/navbar.js"></script>'
  echo '    <!-- /INSTEIP_SHARED_NAVBAR_SCRIPT -->'
  echo '</body>'
  echo ''
  echo '</html>'
} > productos.new.html

mv productos.new.html "$IN"

echo "== Resumen =="
wc -l "$IN" css/*.css js/*.js
