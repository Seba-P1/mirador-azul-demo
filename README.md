# Complejo Mirador Azul — Sitio web demo

Página one-page para el **Complejo Mirador Azul** (Av. Costanera 844 · Peatonal Viedma 840, 2.ª Bajada, Las Grutas, Río Negro): departamentos frente al mar con reservas directas por WhatsApp.

Diseño premium con animaciones de scroll (GSAP + ScrollTrigger), hero cinematográfico con la foto del atardecer del complejo y contenido 100% real (tipos de departamento, amenities, reseñas de Booking).

## Estructura

```
├── index.html    → toda la página (español)
├── styles.css    → estilos + responsive
├── script.js     → animaciones y formulario → WhatsApp
└── assets/
    ├── hero-edificio.webp          → foto del atardecer (desktop)
    ├── hero-edificio-mobile.webp   → foto del atardecer (móvil)
    ├── projects/                   → fotos de los departamentos
    └── vendor/                     → GSAP + ScrollTrigger (local, sin CDN)
```

## Ver la demo

Opción 1 — local: abrir `index.html` con doble clic (funciona sin internet).

Opción 2 — online con GitHub Pages:
1. En este repo: **Settings → Pages**
2. Source: **Deploy from a branch** → rama `main`, carpeta `/ (root)`
3. Save → en 1-2 minutos queda pública en `https://seba-p1.github.io/mirador-azul-demo/`

Opción 3 — Netlify: entrar a [netlify.com/drop](https://netlify.com/drop) y arrastrar la carpeta completa.

## Cambiar el número de WhatsApp

El número actual es el del complejo: **+54 9 2934 46-1718**.

- En `script.js`: buscar `5492934461718` (línea del `window.open`).
- En `index.html`: los enlaces `wa.me` (aparece 3 veces).

## Tecnologías

HTML + CSS + JavaScript vanilla (sin frameworks, sin build). GSAP 3 y ScrollTrigger incluidos localmente en `assets/vendor/`. Optimizada para Lighthouse: imágenes WebP, preload del hero, `prefers-reduced-motion` respetado.
