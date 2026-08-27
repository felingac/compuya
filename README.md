# CompuYá — Guía de Edición de Productos

## Cómo agregar, editar o eliminar productos

Los productos se gestionan desde un solo archivo JSON:

```
js/data/products.json
```

### Agregar un producto nuevo

1. Abre `js/data/products.json` en cualquier editor de texto
2. Copia un producto existente como plantilla
3. Cambia los valores y asígnale un `id` único (incremental)
4. Guarda el archivo

**Plantilla:**
```json
{
  "id": 9,
  "name": "Tu Nuevo Producto",
  "slug": "tu-nuevo-producto",
  "category": "colegio",
  "subcategory": "Colegio Avanzada",
  "price": 250.00,
  "originalPrice": null,
  "currency": "USD",
  "image": "https://tuservidor.com/ruta/imagen.jpg",
  "specs": ["Intel Core i5", "8GB RAM", "256GB SSD", "Windows 10"],
  "description": "Descripción del producto",
  "featured": false,
  "onSale": false,
  "inStock": true
}
```

### Campos explicados

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | número | Identificador único (no repetir) |
| `name` | texto | Nombre del producto |
| `slug` | texto | URL amigable (sin espacios, usar guiones) |
| `category` | texto | Categoría: `oferta`, `escuela`, `colegio` |
| `subcategory` | texto | Subcategoría visible en la tarjeta |
| `price` | número | Precio actual en USD |
| `originalPrice` | número o null | Precio original (si hay descuento). Usar `null` si no hay |
| `image` | URL | Ruta a la imagen del producto (650x650px recomendado) |
| `specs` | lista | Lista de especificaciones técnicas (máximo 4) |
| `description` | texto | Descripción SEO del producto |
| `featured` | true/false | ¿Mostrar en sección de ofertas destacadas? |
| `onSale` | true/false | ¿Tiene descuento? |
| `inStock` | true/false | ¿Está disponible? |

### Poner un producto en oferta

1. Cambia `"onSale": true`
2. Agrega el precio original: `"originalPrice": 300.00`
3. Pon el precio con descuento: `"price": 249.99`
4. Si quieres que aparezca en la sección de ofertas: `"featured": true`

### Agregar una nueva categoría

Las categorías disponibles se definen en `js/products.js` en el objeto `CATEGORIES`:

```javascript
const CATEGORIES = {
  todos: { label: 'Todos', icon: '🖥️' },
  oferta: { label: '🔥 Ofertas', icon: '🔥' },
  escuela: { label: 'Escuela', icon: '📚' },
  colegio: { label: 'Colegio', icon: '🎓' },
  // Agregar nueva:
  oficina: { label: 'Oficina', icon: '🏢' }
};
```

Luego usa `"category": "oficina"` en tus productos.

### Eliminar un producto

Simplemente borra el bloque JSON completo del producto (desde `{` hasta `}`).
Asegúrate de que las comas entre productos estén correctas.

---

## Subir al hosting cPanel

1. Ingresa a tu cPanel → **Administrador de archivos**
2. Navega a `public_html`
3. Sube todos los archivos y carpetas del proyecto
4. Verifica que el sitio carga en tu dominio

## Estructura de archivos

```
├── index.html          ← Página principal
├── css/                ← Estilos (no modificar)
├── js/
│   ├── app.js          ← Lógica (no modificar)
│   ├── products.js     ← Motor de productos (solo para categorías)
│   └── data/
│       └── products.json  ← ✅ EDITAR AQUÍ los productos
├── .htaccess           ← Config del servidor
├── robots.txt          ← SEO
├── sitemap.xml         ← Mapa del sitio
└── README.md           ← Esta guía
```
