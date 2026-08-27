import os
import re

filepath = '/Volumes/GXBk/Server/ProyectosIA/compuya/avilchat.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_main = """  <main>
    <section class="page-hero">
      <div class="container">
        <span class="overline" style="display:block;margin-bottom:var(--space-3);">BOT DE VENTAS POR WHATSAPP</span>
        <h1 class="service-hero__title hero-text-enter" style="max-width: 800px; margin: 0 auto;">Tus clientes escriben a las 11 de la noche.<br> <span class="highlight">Alguien les va a contestar.</span></h1>
        <p class="lead" style="max-width:700px;margin:var(--space-4) auto var(--space-8);">Avilchat responde por tu WhatsApp en segundos, resuelve las dudas, cierra la venta y te deja el pedido armado. Tú duermes.</p>
        <div class="flex gap-4 justify-center flex-wrap">
          <a href="https://avilchat.com" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Visitar Avilchat.com</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="badge badge--primary" style="margin-bottom:var(--space-3);">Funcionalidades</span>
          <h2 class="section-header__title">Lo que hace mientras no estás</h2>
          <p class="section-header__desc">No es un menú de opciones. Es un vendedor que entiende lo que le escriben.</p>
        </div>

        <div class="grid grid-3 gap-6 stagger">
          <div class="reason-card reveal">
            <div class="reason-card__icon" style="background:rgba(255,107,53,.14)">⚡</div>
            <h4 class="reason-card__title">Atención 24/7</h4>
            <p class="reason-card__desc">Responde a tus clientes en 2,4 segundos, sin importar la hora.</p>
          </div>
          <div class="reason-card reveal">
            <div class="reason-card__icon">🧾</div>
            <h4 class="reason-card__title">Cobra y verifica</h4>
            <p class="reason-card__desc">Manda tu medio de pago, recibe el comprobante y lee el monto para que tú solo apruebes.</p>
          </div>
          <div class="reason-card reveal">
            <div class="reason-card__icon">📇</div>
            <h4 class="reason-card__title">CRM Integrado</h4>
            <p class="reason-card__desc">Cada persona con su estado, su ciudad, su producto y su conversación completa.</p>
          </div>
          <div class="reason-card reveal">
            <div class="reason-card__icon">📦</div>
            <h4 class="reason-card__title">Pedidos en Dropi, solos</h4>
            <p class="reason-card__desc">Toma los datos, valida la ciudad y deja la orden puesta en Dropi sin que tú intervengas.</p>
          </div>
          <div class="reason-card reveal">
            <div class="reason-card__icon">🔁</div>
            <h4 class="reason-card__title">Vuelve por el que se enfrió</h4>
            <p class="reason-card__desc">Al que dejó de responder le escribe otra vez para retomar lo que estaban hablando.</p>
          </div>
          <div class="reason-card reveal">
            <div class="reason-card__icon">💬</div>
            <h4 class="reason-card__title">Entra tú cuando quieras</h4>
            <p class="reason-card__desc">Cuando el cliente pide una persona, el bot se calla y te reenvía la conversación.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cierre" style="padding: var(--space-12) 0; text-align: center; background: var(--bg-surface);">
      <div class="container">
        <h2 style="margin-bottom: var(--space-4);">El bot que vende por tu WhatsApp mientras duermes</h2>
        <p class="lead" style="margin-bottom: var(--space-8); max-width: 700px; margin-left: auto; margin-right: auto;">Conecta tu WhatsApp y deja que el bot venda. Planes desde $14 al mes con 300 respuestas gratis para probar.</p>
        <a href="https://avilchat.com" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Más detalles y precios en Avilchat.com →</a>
      </div>
    </section>
  </main>"""

content_updated = re.sub(r'<main>.*?</main>', new_main, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content_updated)

print("Updated avilchat.html")
