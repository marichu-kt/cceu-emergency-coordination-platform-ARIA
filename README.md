# CCEU (Coordinación de Emergencias) — React + TypeScript + Vite

Aplicación web **CCEU** para coordinación de emergencias, con pantallas para **Sala** (dashboard + filtros + mapa) y **Campo** (flujo móvil de misión, navegación, evidencias y cierre).

---

## Requisitos

- **Node.js 18+ (recomendado 20 LTS)**
- **npm** (viene con Node)

> Consejo: si no sabes tu versión: `node -v` y `npm -v`

---

## Instalación y ejecución (rápido)

1. **Descomprime** el ZIP en una carpeta.
2. Abre una terminal dentro de la carpeta del proyecto (donde está `package.json`).
3. Ejecuta:

```bash
npm install
npm run dev
```

4. Abre en el navegador:

- http://localhost:5173

---

## Scripts disponibles

```bash
npm run dev       # servidor de desarrollo (Vite)
npm run build     # compila para producción (carpeta dist/)
npm run preview   # sirve la build localmente para probarla
```

---

## Estructura principal

- `src/`
  - `App.tsx` — navegación por pantallas (state)
  - `components/`
    - `screens/` — pantallas (Sala/Campo)
    - `design-system/` — componentes UI (Button, Modal, InputText, etc.)
    - `TTSReaderBridge.tsx` — “puente” para el plugin de lectura
  - `styles/` — estilos globales
  - `utils/` — helpers + API mock/local

---

## Accesibilidad (resumen)

Este proyecto incluye mejoras de accesibilidad (a11y) como:
- **Labels reales** en inputs y controles.
- **Botones de icono** con `aria-label`.
- **Foco visible** (`focus-visible:ring...`) en controles interactivos.
- Ajustes de **contraste** para cumplir WCAG AA en elementos clave (chips/estados).

> Para revisar: usa WAVE o Lighthouse (Accessibility).

---

## Lectura en voz alta (TTSReader Plugin)

Este proyecto integra un plugin de terceros para lectura en voz alta.
Se carga desde CDN y se refresca automáticamente al cambiar de pantalla o cuando una vista termina de cargar datos.

### Dónde está integrado
- `index.html` (carga del script)
- `src/components/TTSReaderBridge.tsx` (control de refresco + parche a11y)
- `src/utils/patchTTSReaderA11y.ts` (parches de accesibilidad del UI del plugin)

> Nota: el plugin usa voces del sistema (Web Speech API). La disponibilidad y el idioma dependen del navegador/SO.

### Si no quieres el plugin
Quita (o comenta) la línea del `<script>` en `index.html` y elimina el componente `TTSReaderBridge` del árbol de React.

---

## Problemas comunes

### “No se abre en el navegador”
- Asegúrate de estar en la carpeta correcta (la que tiene `package.json`).
- Prueba borrar dependencias y reinstalar:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### “El plugin no lee en una pantalla concreta”
- En pantallas con carga asíncrona, se dispara un refresh manual del plugin.
- Si añades nuevas pantallas con carga async, puedes emitir:

```js
window.dispatchEvent(new Event("ttsreader:refresh"));
```
