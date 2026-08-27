import os

folder = '/Volumes/GXBk/Server/ProyectosIA/compuya'
old_num = '593992292199'
new_num = '593992292199'

for root, dirs, files in os.walk(folder):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_num in content:
                content = content.replace(old_num, new_num)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {filepath}')
print('Done')
