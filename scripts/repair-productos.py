#!/usr/bin/env python3
"""Valida el estado de productos.html y sus recursos asociados."""
import io, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ok = True

def check(cond, msg):
    global ok
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        ok = False

# ---------- 1. JS: quitar primera linea "<script>" ----------
for name in ["products-data", "products", "floating", "navbar"]:
    p = ROOT / "js" / f"{name}.js"
    text = p.read_text(encoding="utf-8")
    lines = text.split("\n")
    if lines[0].strip() == "<script>":
        body = "\n".join(lines[1:])
        body = body.replace("</script>", "")
        p.write_text(body, encoding="utf-8", newline="\n")
        print(f"OK   js/{name}.js: linea '<script>' eliminada")
    else:
        print(f"--   js/{name}.js: sin etiqueta residual (1a linea: {lines[0][:40]!r})")

# ---------- 2. css/fonts.css: restaurar "@font-face {" si faltara ----------
p = ROOT / "css" / "fonts.css"
text = p.read_text(encoding="utf-8")
if re.search(r"^\s*@\s*font-face\s*\{", text, re.M) is None:
    text = text.replace(
        "            font-family: 'Material Symbols Outlined';",
        "        @font-face {\n            font-family: 'Material Symbols Outlined';",
        1,
    )
    p.write_text(text, encoding="utf-8", newline="\n")
    print("OK   css/fonts.css: '@font-face {' restaurado")
o = text.count("{"); c = text.count("}")
check(o == c == 8, f"css/fonts.css llaves balanceadas {{ {o} }} {c}")

# ---------- 3. css/floating-actions.css: restaurar ".wa-wrap {" si faltara ----------
p = ROOT / "css" / "floating-actions.css"
text = p.read_text(encoding="utf-8")
if ".wa-wrap {" not in text:
    text = ".wa-wrap {\n" + text
    p.write_text(text, encoding="utf-8", newline="\n")
    print("OK   css/floating-actions.css: '.wa-wrap {' restaurado")
o = text.count("{"); c = text.count("}")
check(o == c, f"css/floating-actions.css llaves balanceadas {{ {o} }} {c}")

# ---------- 4. productos.html: verificaciones ----------
h = (ROOT / "productos.html").read_text(encoding="utf-8")
lines_now = h.count("\n") + 1
print(f"--   productos.html: {lines_now} lineas")

for token in ['<script src="js/preloader.js">', '<script src="js/products-data.js">',
              '<script src="js/products.js">', '<script src="js/floating.js">',
              '<script src="js/navbar.js">', 'id="preloader"', 'id="navbar"',
              'id="waWrap"', 'id="scrollTopBtn"']:
    check(token in h, f"productos.html contiene {token}")
check("PRODUCTS_DATA" in (ROOT / "js" / "products-data.js").read_text(encoding="utf-8"), "js/products-data.js contiene PRODUCTS_DATA")
check("< !--" not in h, "productos.html sin comentarios rotos")
check(h.count("<script src=") == 5, f"exactamente 5 script tags ({h.count('<script src=')})")

# CSS/JS sintaxis
for f in sorted((ROOT / "css").glob("*.css")):
    t = f.read_text(encoding="utf-8")
    check(t.count("{") == t.count("}"), f"{f.name}: llaves {{ {t.count('{')} }} {t.count('}')}")
for f in sorted((ROOT / "js").glob("*.js")):
    check("<script>" not in f.read_text(encoding="utf-8"), f"{f.name}: sin etiquetas script")

print("\nRESULTADO:", "OK" if ok else "CON FALLOS")
sys.exit(0 if ok else 1)
