<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="Google Maps" width="128" height="128" />
</p>

<h1 align="center">Google Maps Lab</h1>

<p align="center">
  Lab de pruebas frontend para embeber mapas de Google vía <code>&lt;iframe&gt;</code>, sin Maps JavaScript API ni API key.
</p>

<p align="center">
  <a href="https://github.com/yeremitantaraico/google-maps-lab">
    <img src="https://img.shields.io/badge/repo-google--maps--lab-181717?style=flat&logo=github&logoColor=white" alt="Repositorio" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black" alt="React 19" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript 6" />
  </a>
  <a href="https://vite.dev/">
    <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite 8" />
  </a>
  <a href="https://pnpm.io/">
    <img src="https://img.shields.io/badge/pnpm-9+-F69220?style=flat&logo=pnpm&logoColor=white" alt="pnpm 9+" />
  </a>
  <a href="https://www.google.com/maps">
    <img src="https://img.shields.io/badge/Google_Maps-Embed-4285F4?style=flat&logo=googlemaps&logoColor=white" alt="Google Maps Embed" />
  </a>
  <a href="https://eslint.org/">
    <img src="https://img.shields.io/badge/ESLint-10-4B32C3?style=flat&logo=eslint&logoColor=white" alt="ESLint 10" />
  </a>
</p>

<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=yeremitantaraico.google-maps-lab" alt="Visitas al repositorio" />
</p>

---

## 📋 Descripción

**Google Maps Lab** es un entorno de experimentación **solo frontend** para probar mapas embebidos de Google sin depender de la Maps JavaScript API. El mapa se carga en un `<iframe>` apuntando a `maps.google.com` con `output=embed`.

**Capacidades actuales:**

- Mapa embebido a **pantalla completa**
- Búsqueda por **dirección**, **coordenadas** (`lat,lng`) o **URL de Google Maps**
- Panel flotante **arrastrable** (esquina superior derecha) con botón **Marcar**
- Resolución de URLs con `@lat,lng,zoom` o parámetro `?q=`

> [!NOTE]
> Este proyecto **no usa API key** ni backend. Todo el procesamiento de búsqueda ocurre en el cliente antes de construir la URL del iframe.

> [!IMPORTANT]
> El zoom dentro del iframe requiere **Ctrl + rueda del ratón** (modo cooperativo de Google Maps embebido). Las capas (satélite, tráfico, etc.) se controlan con el botón **Capas** nativo del iframe.

## 📦 Requisitos

- **Node.js** 20+
- **pnpm** 9+

## ⚙️ Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19, TypeScript 6 |
| Build | Vite 8 |
| Estilos | CSS plano (sin Tailwind ni CSS Modules) |
| Mapa | Google Maps Embed (`maps.google.com`, sin API key) |
| Calidad | ESLint 10 + typescript-eslint |
| Paquetes | pnpm 9+ |

## 📄 Licencia

Proyecto público desarrollado exclusivamente con fines educativos y de demostración. Su propósito es apoyar la resolución de ejercicios y actividades prácticas de carácter académico.