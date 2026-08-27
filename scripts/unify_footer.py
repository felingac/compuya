import os
import re

folder = '/Volumes/GXBk/Server/ProyectosIA/compuya'
html_files = [f for f in os.listdir(folder) if f.endswith('.html') and f != 'index.html']

# Read index.html to extract the footer
index_path = os.path.join(folder, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Use regex to extract the footer from index.html
footer_pattern = re.compile(r'<footer class="footer".*?</footer>', re.DOTALL)
footer_match = footer_pattern.search(index_content)

if not footer_match:
    print("Could not find footer in index.html")
    exit(1)

unified_footer = footer_match.group(0)

# Replace footer in all other html files
for file in html_files:
    filepath = os.path.join(folder, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if footer_pattern.search(content):
        content_updated = footer_pattern.sub(unified_footer, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_updated)
        print(f"Updated {file}")
    else:
        print(f"Footer not found in {file}")

print("Footer unification complete.")
