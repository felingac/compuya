import os
import re

filepath = '/Volumes/GXBk/Server/ProyectosIA/compuya/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to remove the CONTACTO / COTIZACIÓN section
pattern = r'(\s*<!-- \S*={20,}.*?CONTACTO / COTIZACIÓN.*?={20,} -->\s*<section class="section section-lg contact-section" id="contacto" aria-labelledby="contacto-title">.*?</section>)'

content_updated = re.sub(pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content_updated)

print("Removed contact section from index.html")
