import re
import os

index_path = '/Volumes/GXBk/Server/ProyectosIA/compuya/index.html'
contact_path = '/Volumes/GXBk/Server/ProyectosIA/compuya/contacto.html'

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

with open(contact_path, 'r', encoding='utf-8') as f:
    contact_html = f.read()

# 1. Update Hero Subtitle
index_html = index_html.replace(
    'Computadores seminuevos de marcas reconocidas',
    'Computadoras nuevas y seminuevas de marcas reconocidas'
)

# 2. Update Years of experience to 15+
index_html = index_html.replace(
    '<div class="hero__stat-number" data-count="8+">0</div>',
    '<div class="hero__stat-number" data-count="15+">0</div>'
)
index_html = index_html.replace(
    '<div class="hero__stat-number" data-count="10+">0</div>',
    '<div class="hero__stat-number" data-count="15+">0</div>'
) # Just in case it was 10+ somewhere else

# 3. Extract the contact form section from contacto.html
# The section in contacto.html starts with <section class="section"> and ends with </section>
# It contains 'class="contact-grid reveal"'
match = re.search(r'(<section class="section">\s*<div class="container">\s*<div class="contact-grid reveal">.*?</form>\s*</div>\s*</div>\s*</div>\s*</section>)', contact_html, flags=re.DOTALL)
if match:
    contact_section_html = match.group(1)
    
    # Modify the extracted section slightly to add an ID and match the home page style if needed
    contact_section_html = contact_section_html.replace('<section class="section">', '<!-- ══════════════════════════════════════\n         CONTACTO\n    ══════════════════════════════════════ -->\n    <section class="section section-surface" id="contacto">')
    
    # Find where to insert it in index.html (before the FOOTER)
    footer_comment = r'<!-- ══════════════════════════════════════\n       FOOTER\n  ══════════════════════════════════════ -->'
    
    if footer_comment in index_html and 'id="contacto"' not in index_html:
        index_html = index_html.replace(footer_comment, contact_section_html + '\n\n  ' + footer_comment)
        print("Successfully injected contact form into index.html")
    elif 'id="contacto"' in index_html:
        print("id='contacto' already present. Maybe form already exists?")
else:
    print("Could not extract contact form from contacto.html")

# Write changes back
with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_html)
