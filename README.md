# Google Maps Lab

Lab de pruebas con mapa de Google embebido (`<iframe>`), sin API key.

## Qué incluye

- Mapa embebido a pantalla completa (`maps.google.com/maps?q=lat,lng&output=embed`)
- Panel flotante de búsqueda (esquina superior derecha, blanco y azul)
- Presets con coordenadas y búsqueda por `lat,lng`

## Requisitos

- Node.js 18+
- pnpm

## Uso

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:5173`.

## Notas del embed

- Zoom: usa **Ctrl + rueda del mouse** (comportamiento cooperativo de Google en iframe).
- Capas: botón **Capas** nativo dentro del mapa embebido.
- Avisos de consola tipo *Tracking Prevention* son del navegador al cargar Google; no afectan el lab.
