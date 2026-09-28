import re
import json

with open('src/data/productsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse products
product_blocks = text.split('"id":')
print(f"Total product chunks: {len(product_blocks)-1}")

parsed_prods = []
for block in product_blocks[1:]:
    sku_match = re.search(r'"sku":\s*"([^"]+)"', block)
    name_match = re.search(r'"nombre":\s*"([^"]+)"', block)
    cat_match = re.search(r'"categoria":\s*"([^"]+)"', block)
    img_match = re.search(r'"imagenes":\s*\[([^\]]+)\]', block)
    
    sku = sku_match.group(1) if sku_match else ""
    nombre = name_match.group(1) if name_match else ""
    cat = cat_match.group(1) if cat_match else ""
    imgs = re.findall(r'"/img_productos/([^"]+)"', img_match.group(1)) if img_match else []
    
    parsed_prods.append({
        "sku": sku,
        "nombre": nombre,
        "categoria": cat,
        "imagenes": imgs
    })

print(f"Parsed {len(parsed_prods)} products from productsData.js")

# Let's inspect products by category and their images
for p in parsed_prods:
    img_str = ", ".join(p['imagenes'])
    print(f"[{p['sku']}] {p['nombre']} ({p['categoria']}) -> {img_str}")
