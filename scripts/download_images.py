import os
import re
import urllib.request
from urllib.parse import urlparse

folder = '/Volumes/GXBk/Server/ProyectosIA/compuya'
img_folder = os.path.join(folder, 'img', 'brands')
os.makedirs(img_folder, exist_ok=True)

html_files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Match full URLs pointing to compuya or avicanon images
pattern = re.compile(r'https?://(?:[^/]+\.)?(?:compuya|avicanon)\.[a-z.]+/[^"\' >]+\.(?:jpg|jpeg|png|webp|gif|svg)', re.IGNORECASE)

for html_file in html_files:
    filepath = os.path.join(folder, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    matches = [m.group(0) for m in pattern.finditer(content)]
    
    if not matches:
        continue
        
    print(f"Found {len(matches)} images in {html_file}")
    
    for url in set(matches):
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        
        # Decide subfolder
        if 'wp-content/uploads/2021/11' in url or 'KasperSky' in url:
            local_path = f"img/brands/{filename}"
            save_path = os.path.join(folder, 'img', 'brands', filename)
        else:
            local_path = f"img/{filename}"
            save_path = os.path.join(folder, 'img', filename)
            
        print(f"Downloading {url} to {local_path}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(save_path, 'wb') as out_file:
                out_file.write(response.read())
            
            # Replace in content
            content = content.replace(url, local_path)
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Image localization complete.")
