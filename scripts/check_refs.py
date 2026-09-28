import os
import re
import json

# Check the exact filenames in img_productos
files_on_disk = os.listdir('img_productos')
print("Files on disk with special chars:")
for f in files_on_disk:
    if 'borgo' in f or 'mueco' in f or 'muñeco' in f:
        print(f"File on disk: {repr(f)}")

with open('src/data/productsData.js', 'r', encoding='utf-8') as f:
    prod_data = f.read()

# Let's find all image references in productsData.js
images_in_code = re.findall(r'/img_productos/([^"]+)', prod_data)
print(f"\nTotal image references in productsData.js: {len(images_in_code)}")
unique_refs = set(images_in_code)
print(f"Unique image references: {len(unique_refs)}")

for ref in sorted(unique_refs):
    # Check if this exact file exists on disk
    if ref not in files_on_disk:
        print(f"NOT FOUND ON DISK: {repr(ref)}")
