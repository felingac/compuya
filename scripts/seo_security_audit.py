import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll use a regex replacement function for consistency
def update_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update text "computadores seminuevos" to "computadoras nuevas y seminuevas" in title and meta tags
    content = re.sub(r'computadores seminuevos', 'computadoras nuevas y seminuevas', content, flags=re.IGNORECASE)
    content = re.sub(r'computadoras seminuevas', 'computadoras nuevas y seminuevas', content, flags=re.IGNORECASE)
    
    # 2. Update 8 años to 15 años
    content = re.sub(r'8 años', '15 años', content, flags=re.IGNORECASE)

    # 3. Add OG Tags if missing, or update them. Actually, simpler to just let the above Regex handle the description updates.
    # We will ensure Open Graph has consistent descriptions since we just updated the text.

    # 4. Form Security: Remove inline onsubmit="sendWhatsApp(event)"
    content = re.sub(r'\s*onsubmit="sendWhatsApp\(event\)"', '', content)
    
    # 5. Form Security: Add honeypot field right after <form id="contact-form">
    # We look for <form id="contact-form"...>
    if '<form id="contact-form"' in content and '_honeypot' not in content:
        honeypot_html = '\n              <!-- Anti-spam Honeypot -->\n              <input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off">\n'
        content = re.sub(r'(<form id="contact-form"[^>]*>)', r'\1' + honeypot_html, content)
    
    # 6. Form Security: Remove inline <script> defining sendWhatsApp in contacto.html
    # We can match the exact function definition block
    script_block = re.search(r'<script>\s*function sendWhatsApp\(e\) \{.*?</script>', content, flags=re.DOTALL)
    if script_block:
        content = content.replace(script_block.group(0), '')
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filename}")

for html_file in html_files:
    update_file(html_file)

print("SEO & Security updates applied to HTML files.")
