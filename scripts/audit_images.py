import os
import re
import json

img_dir = 'img_productos'
img_files = set(os.listdir(img_dir))
print(f"Total files in {img_dir}: {len(img_files)}")

with open('src/data/productsData.js', 'r', encoding='utf-8') as f:
    prod_content = f.read()

with open('src/data/amazonikData.js', 'r', encoding='utf-8') as f:
    amz_content = f.read()

used_imgs_prod = set(re.findall(r'/img_productos/([^"\'`\s]+)', prod_content))
used_imgs_amz = set(re.findall(r'/img_productos/([^"\'`\s]+)', amz_content))
all_used = used_imgs_prod | used_imgs_amz

print(f"Total unique images referenced in data: {len(all_used)}")

unused = img_files - all_used
print(f"\nUnused images ({len(unused)}):")
for u in sorted(unused):
    print(f"  - {u}")

missing_files = all_used - img_files
print(f"\nMissing files (referenced in data but not in img_productos) ({len(missing_files)}):")
for m in sorted(missing_files):
    print(f"  - {m}")
