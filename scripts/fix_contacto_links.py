import os

filepath = '/Volumes/GXBk/Server/ProyectosIA/compuya/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content_updated = content.replace('href="#contacto"', 'href="contacto.html"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content_updated)

print("Updated links to contacto.html in index.html")
