export function patchTTSReaderA11y() {
  // Selector de idioma del plugin
  document.querySelectorAll<HTMLSelectElement>("select.Language-selector").forEach((sel) => {
    const hasName =
      sel.getAttribute("aria-label") ||
      sel.getAttribute("aria-labelledby") ||
      sel.getAttribute("title");

    if (!hasName) {
      sel.setAttribute("aria-label", "Idioma de la lectura");
      sel.setAttribute("title", "Idioma de la lectura");
    }
  });

  // Slider de velocidad del plugin
  document
    .querySelectorAll<HTMLInputElement>('input[type="range"][data-ws-oninput="onRateChange"]')
    .forEach((inp) => {
      const hasName =
        inp.getAttribute("aria-label") ||
        inp.getAttribute("aria-labelledby") ||
        inp.getAttribute("title");

      if (!hasName) {
        inp.setAttribute("aria-label", "Velocidad de lectura");
        inp.setAttribute("title", "Velocidad de lectura");
      }
    });

  // Botones icon-only del plugin (por si WAVE marca alguno)
  document.querySelectorAll<HTMLButtonElement>('[class*="TTSPlugin"] button').forEach((btn) => {
    const hasName =
      btn.textContent?.trim() ||
      btn.getAttribute("aria-label") ||
      btn.getAttribute("aria-labelledby") ||
      btn.getAttribute("title");
    if (hasName) return;

    btn.setAttribute("aria-label", "Control de lectura en voz alta");
    btn.setAttribute("title", "Control de lectura en voz alta");
  });
}
