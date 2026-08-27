import os
import re

folder = '/Volumes/GXBk/Server/ProyectosIA/compuya'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

unified_header = """  <header class="header" id="header" role="banner">
    <div class="container header__inner">
      <a href="index.html" class="header__logo" aria-label="CompuYá - Inicio">
        <img src="img/logo.png" alt="CompuYá Logo">
      </a>

      <nav class="nav" aria-label="Navegación principal">
        <a href="index.html" class="nav__link">Inicio</a>
        <a href="index.html#destacados" class="nav__link">Destacados</a>
        <a href="index.html#computadores" class="nav__link">Computadores</a>
        <div class="nav__dropdown">
          <a href="index.html#servicios" class="nav__link">Servicios <svg width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" style="margin-top: 2px;">
              <path d="M6 9l6 6 6-6" />
            </svg></a>
          <div class="nav__dropdown-content">
            <a href="diseno-web.html">Diseño Web</a>
            <a href="redes-sociales.html">Redes Sociales</a>
            <a href="creamos-tu-marca.html">Creación de Marca</a>
            <a href="avilchat.html">Avilchat (Bot IA)</a>
          </div>
        </div>
        <a href="index.html#marcas" class="nav__link">Marcas</a>
        <a href="contacto.html" class="nav__link">Contacto</a>
      </nav>

      <div class="header__cta">
        <a href="contacto.html" class="btn btn-primary btn-sm">Cotizar ahora</a>
        <button class="mobile-toggle" aria-label="Abrir menú" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <div class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Menú móvil">
    <a href="index.html" class="mobile-nav__link">Inicio</a>
    <a href="index.html#destacados" class="mobile-nav__link">Destacados</a>
    <a href="index.html#computadores" class="mobile-nav__link">Computadores</a>
    <a href="index.html#servicios" class="mobile-nav__link">Servicios</a>
    <a href="diseno-web.html" class="mobile-nav__link" style="padding-left: 2rem; font-size: 0.9em;">- Diseño Web</a>
    <a href="redes-sociales.html" class="mobile-nav__link" style="padding-left: 2rem; font-size: 0.9em;">- Redes Sociales</a>
    <a href="creamos-tu-marca.html" class="mobile-nav__link" style="padding-left: 2rem; font-size: 0.9em;">- Creación de Marca</a>
    <a href="avilchat.html" class="mobile-nav__link" style="padding-left: 2rem; font-size: 0.9em;">- Avilchat (Bot IA)</a>
    <a href="index.html#marcas" class="mobile-nav__link">Marcas</a>
    <a href="contacto.html" class="mobile-nav__link">Contacto</a>
    <a href="contacto.html" class="btn btn-primary btn-lg" style="margin-top: var(--space-4);">Cotizar ahora</a>
  </div>"""

header_pattern = re.compile(r'<header class="header".*?</header>', re.DOTALL)
mobile_nav_pattern = re.compile(r'(?:<!--\s*Mobile Navigation\s*-->\s*)?<div class="mobile-nav" id="mobile-nav".*?</div>', re.DOTALL)

for file in files:
    filepath = os.path.join(folder, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Remove the existing mobile nav
    content_no_nav = mobile_nav_pattern.sub('', content)
    
    # Step 2: Replace header and append mobile nav immediately after it
    if header_pattern.search(content_no_nav):
        content_updated = header_pattern.sub(unified_header, content_no_nav)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_updated)
        print(f"Updated {file}")
    else:
        print(f"Header not found in {file}")

print("Done")
