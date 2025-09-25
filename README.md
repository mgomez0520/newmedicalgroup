# Sitio web — New Medical Group

Estructura mínima generada:

- `index.html` — página principal
- `assets/styles.css` — estilos
- `assets/script.js` — pequeñas interacciones (formulario falso, año dinámico)

Cómo usar

1. Abrir `index.html` en un navegador.
2. Personalizar textos, números de teléfono, logo e imágenes.
3. Para enviar el formulario, integrar un backend o servicio (Formspree, Netlify Forms, etc.).

Siguientes pasos sugeridos

- Añadir imágenes reales y logo.
- Conectar un endpoint para recibir solicitudes.
- Optimizar SEO y accesibilidad.

Identidad visual (colores y tipografías)

- Colores principales (HEX):
	- Blanco: `#FDFDFD`
	- Verde brillante: `#2BA763`
	- Verde oliva suave: `#7E9D54`
	- Azul turquesa: `#0594C4`
	- Azul más intenso (degradado): `#006EB3`
	- Negro/café oscuro (texto): `#372D2A`

- Tipografías:
	- Nombre de marca (`New Medical Group`): tipografía script/caligráfica (similar a `Great Vibes`, `Allura` o `Great Vibes`).
	- Texto secundario (`INTEGRADOR DE SERVICIOS DE SALUD`): tipografía sans serif recta (similar a `Montserrat Light`, `Arial` o `Helvetica`).

Estas variables ya se añadieron a `assets/styles.css` y la página incluye la carga de `Great Vibes` y `Montserrat` desde Google Fonts para facilitar la personalización.

## Servidor de desarrollo (opcional)

He incluido un servidor Express mínimo en `server/index.js` y un `package.json` para probar el envío del formulario localmente.

Pasos:

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor:

```bash
npm start
```

3. Abre en el navegador: `http://localhost:3000`

El endpoint `/api/contact` recibe POST con { name, contact, message } y responde con JSON. Es solo para desarrollo; integra un servicio real para producción.

## Optimizar imágenes (WebP)

Hay un script `scripts/optimize-images.sh` que convierte JPG/PNG a WebP usando `cwebp` de libwebp.

Instalación (macOS):

```bash
brew install webp
```

Generar webp:

```bash
cd "/Users/alejandro/Desktop/NEW MEDICAL"
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
git add assets/images/*.webp
git commit -m "Generar WebP optimizadas"
git push
```

En `index.html` las imágenes principales ya usan `<picture>` con fallback a JPG/PNG y `loading="lazy"`.

## Configurar envío de formularios (SendGrid o SMTP)

El servidor acepta dos métodos para enviar emails desde `/api/contact`:

- SendGrid (preferido): configura `SENDGRID_API_KEY` en las variables de entorno y opcionalmente `CONTACT_TO_EMAIL` y `EMAIL_FROM`.
- SMTP (fallback): configura `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`.

En Render: ve a tu servicio -> Environment -> Environment Variables y añade las variables necesarias (no subas claves al repo).

Ejemplo de variables (Render):

SENDGRID_API_KEY = <tu_key>
CONTACT_TO_EMAIL = Newmedicalgroup2021@gmail.com
EMAIL_FROM = Newmedicalgroup2021@gmail.com

Si no se configura ningún proveedor el servidor solo registrará los mensajes en logs.
