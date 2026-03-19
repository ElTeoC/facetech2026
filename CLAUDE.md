# FACETECH 2026 — Instrucciones para Claude Code

## Qué es este proyecto

Landing page de venta para **FACETECH 2026**, un congreso médico internacional de cirugía facial integrada. El evento es 100% virtual, se realiza el 5–8 de agosto de 2026, y está dirigido a cirujanos especializados de iberoamérica. Hay dos paquetes: USD 2,500 y USD 3,000. El pago se procesa con Stripe.

El objetivo de la página es **convertir visitas en inscripciones**. Cada decisión de diseño y animación debe reforzar credibilidad, exclusividad y urgencia.

---

## Estructura de carpetas

```
FACETECH/
├── CLAUDE.md              ← este archivo
├── fotos/                 ← todas las imágenes del congreso
├── videos/                ← videos del congreso
└── landing/
    └── index.html         ← la página actual (base para editar)
```

La página final debe quedar en `landing/index.html`. Todos los assets se referencian con rutas relativas desde ahí: `../fotos/nombre.jpg`, `../videos/nombre.mp4`.

---

## Stack técnico

- HTML + CSS + JavaScript vanilla en un solo archivo (`landing/index.html`)
- **No usar frameworks** (no React, no Vue, no npm)
- Cargar librerías desde CDN dentro del mismo HTML:
  - **GSAP 3** + ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  - **GSAP ScrollTrigger**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
  - **Lenis** (smooth scroll): `https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js`
  - **Splitting.js**: `https://unpkg.com/splitting/dist/splitting.min.js` + su CSS
  - **Swiper.js**: para la galería rotante
- Fuentes: Google Fonts — Cormorant Garamond + Outfit (ya están en el HTML base)

---

## Diseño visual — NO cambiar estos valores

```css
--black:      #06080d
--navy:       #0b0f1c
--gold:       #C8A96E
--gold-light: #E4CC9A
--gold-dim:   #5c4a2a
--cream:      #EDE8DF
--cream-dim:  #9a9088
```

- Tipografía display: **Cormorant Garamond** (serif, elegante, médico/luxury)
- Tipografía cuerpo: **Outfit** (sans-serif limpio)
- Estética general: **dark luxury** — oscuro, dorado, cinematográfico
- Nunca usar fondos blancos, nunca usar colores brillantes que no sean el gold

---

## Mapa de assets — dónde va cada archivo

### VIDEOS (`../videos/`)

| Asset | Uso en la página | Instrucciones |
|-------|-----------------|---------------|
| El video disponible en `/videos/` | **Fondo del Hero** (loop, muted, autoplay) | Reproducir en loop sin audio. Si hay solo un video, usarlo aquí. Agregar poster frame oscuro como fallback. |
| *(pendiente — 1 video)* | **Video de Bienvenida con Voz** (sección Welcome) | Cuando llegue: embed en la sección #welcome con controles visibles. Por ahora dejar el placeholder del play con un `TODO` en comentario. |

### FOTOS (`../fotos/`)

Analizar los archivos disponibles en `/fotos/` y asignar cada uno al slot que mejor corresponda según el contenido visual. La tabla de referencia es:

| Slot | Sección | Qué debe mostrar |
|------|---------|-----------------|
| **hero-bg** | Fondo del Hero (detrás del video, como poster/fallback) | Quirófano oscuro, atmosférico |
| **gallery-1** | Galería rotante — slide 1 | Manos del cirujano con instrumental, plano cercano |
| **gallery-2** | Galería rotante — slide 2 | Doctor explicando / cátedra |
| **gallery-3** | Galería rotante — slide 3 | Sala de transmisión o pantallas |
| **gallery-4** | Galería rotante — slide 4 | Grupo de médicos observando |
| **gallery-5** | Galería rotante — slide 5 | Tecnología láser / equipo |
| **audience** | Sección "Para quién es" | Médicos en uniforme quirúrgico |
| **day1** | Programa — Día 1 | Cátedra o teoría |
| **day2** | Programa — Día 2 | Cirugía nasal / rinoplastia |
| **day3** | Programa — Día 3 | Blefaroplastia / oculoplástica |
| **speaker-bareno** | Card del Dr. John Bareño | Foto profesional del doctor |
| **speaker-froilan** | Card del Dr. Froilán Páez | Foto profesional del doctor |
| **speaker-daniel** | Card del Dr. Daniel Páez | Foto profesional del doctor |
| **urgency-bg** | Fondo sección CTA final | Muy oscura, impactante |

**Si una foto no está disponible aún:** dejar el placeholder existente con un comentario HTML `<!-- TODO: reemplazar con ../fotos/nombre.jpg -->`. No inventar rutas.

**Si hay más fotos de las que hay slots:** usar las mejores para la galería (puede tener hasta 8 slides).

---

## Animaciones a implementar

### 1. Smooth scroll — Lenis
Inicializar Lenis al cargar la página. Todo el scroll debe ser suave y con inercia. Conectar con GSAP ScrollTrigger usando el ticker de Lenis.

### 2. Hero — entrada cinematográfica
- El título "FACETECH 2026" entra letra por letra con Splitting.js + GSAP stagger (delay entre letras: 0.04s, duración por letra: 0.6s, ease: power3.out)
- El badge, subtítulo, pillars, meta y botón entran de abajo hacia arriba en cascada (stagger 0.15s)
- El video de fondo hace fade-in desde opacity 0 en 1.2s

### 3. Parallax en el Hero
- El video de fondo hace parallax vertical suave mientras se hace scroll (yPercent de 0 a -20 con ScrollTrigger)

### 4. Reveal al scroll — todas las secciones
- Cualquier elemento con clase `.reveal` entra con `opacity: 0 → 1` + `y: 30 → 0` usando GSAP ScrollTrigger
- `start: "top 85%"`, `ease: power2.out`, `duration: 0.8`
- Eliminar el sistema CSS `.reveal` actual y reemplazarlo con GSAP

### 5. Títulos de sección — split por palabras
- Los `<h2>` de cada sección entran palabra por palabra con stagger 0.1s

### 6. Contadores animados (Stats)
- Los números animan de 0 al valor final cuando entran en viewport
- Usar GSAP `{ value: target }` con `onUpdate`
- Duración: 1.5s, ease: power2.out

### 7. Galería — Swiper.js
- Reemplazar la galería manual con Swiper
- Modo: `slidesPerView: 1.3`, `centeredSlides: true`, `loop: true`, autoplay cada 3.5s
- Transición: fade o slide con `speed: 700`
- En desktop: `slidesPerView: 2.5`

### 8. Cards de ponentes — hover
- Al hacer hover sobre cada `.speaker-card`: la foto hace scale(1.04) y la border cambia a gold
- Transición suave con GSAP `mouseenter`/`mouseleave`

### 9. Cursor personalizado (solo desktop)
- Un punto pequeño dorado (8px, `background: #C8A96E`, `border-radius: 50%`) que sigue el mouse con GSAP `quickTo` para suavidad
- Se escala a 2x al pasar sobre links y botones
- Solo visible en `@media (hover: hover)` — no en móvil

### 10. Línea de progreso de scroll
- Barra fina dorada en la parte superior (fixed, z-index alto) que crece de 0% a 100% de ancho conforme baja el scroll

---

## Botones de pago — Stripe

Los dos botones de inscripción tienen comentarios `<!-- Reemplazar href con Payment Link de Stripe -->`. Cuando el cliente proporcione los links:
- Paquete USD 2,500 → botón con clase `.btn-outline`
- Paquete USD 3,000 → botón con clase `.btn-solid`

Por ahora dejar `href="#pricing"` como placeholder.

---

## SEO y meta básicos

Agregar en el `<head>`:
```html
<meta name="description" content="FACETECH 2026 — Congreso Internacional de Cirugía Facial Integrada. 5-8 agosto 2026. 100% virtual. Cirugía en vivo, teoría avanzada, 3 especialidades. Desde USD 2,500.">
<meta property="og:title" content="FACETECH 2026 — Cirugía · Tecnología · Función">
<meta property="og:description" content="Congreso internacional de cirugía facial integrada. Virtual, iberoamérica, agosto 2026.">
<meta property="og:image" content="../fotos/[mejor foto disponible]">
<meta name="theme-color" content="#06080d">
```

---

## Cómo publicar en GitHub Pages

Una vez que la página esté lista:

```bash
# 1. Inicializar git en la carpeta FACETECH (si no está ya)
git init
git add .
git commit -m "FACETECH 2026 landing page"

# 2. Crear repo en github.com (nombre: facetech2026)
#    Luego conectar y subir:
git remote add origin https://github.com/TU_USUARIO/facetech2026.git
git branch -M main
git push -u origin main

# 3. En GitHub: Settings → Pages → Source: Deploy from branch → main → /landing
#    El sitio queda en: https://TU_USUARIO.github.io/facetech2026/

# 4. Para dominio personalizado (facetech2026.com):
#    En GitHub Pages Settings → Custom domain → escribir facetech2026.com
#    En Namecheap/GoDaddy DNS → agregar CNAME: www → TU_USUARIO.github.io
```

---

## Prioridades de trabajo

1. **Primero:** Analizar fotos disponibles y asignarlas a sus slots. Integrar el video como fondo del hero.
2. **Segundo:** Implementar todas las animaciones GSAP/Lenis listadas arriba.
3. **Tercero:** Verificar que en móvil todo se ve bien (el diseño base ya es responsive).
4. **Cuarto:** Agregar meta tags SEO.
5. **Quinto:** Dejar comentarios `TODO` claros para los 3 assets faltantes (fotos) y el video de bienvenida.

---

## Qué NO hacer

- No cambiar la paleta de colores
- No cambiar las fuentes
- No simplificar el diseño — si algo parece "demasiado" es porque está bien
- No agregar imágenes de stock genéricas — solo los assets de las carpetas del proyecto
- No usar jQuery
- No crear archivos CSS o JS separados — todo en el mismo `index.html`
- No usar `alert()` ni `console.log()` en el código final
