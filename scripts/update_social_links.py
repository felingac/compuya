import os
import re

folder = '/Volumes/GXBk/Server/ProyectosIA/compuya'
html_files = [f for f in os.listdir(folder) if f.endswith('.html')]

# We want to replace exactly `<a href="#" aria-label="Network">`
# with `<a href="URL" target="_blank" rel="noopener" aria-label="Network">`

fb_url = "https://www.facebook.com/share/1ExBYpU1x3/?mibextid=wwXIfr"
ig_url = "https://www.instagram.com/compuya_ec?igsi=a3N1Z2F3ODg2bHVi"
tk_url = "https://www.tiktok.com/@compuya.guayaquil?_r=1&_t=ZS-99EzkdgoQxp"

for html_file in html_files:
    filepath = os.path.join(folder, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Facebook
    content = content.replace(
        '<a href="#" aria-label="Facebook">',
        f'<a href="{fb_url}" target="_blank" rel="noopener" aria-label="Facebook">'
    )
    # Instagram
    content = content.replace(
        '<a href="#" aria-label="Instagram">',
        f'<a href="{ig_url}" target="_blank" rel="noopener" aria-label="Instagram">'
    )
    # TikTok
    content = content.replace(
        '<a href="#" aria-label="TikTok">',
        f'<a href="{tk_url}" target="_blank" rel="noopener" aria-label="TikTok">'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated social links in all HTML files.")
