import { useEffect } from "react";
import { patchTTSReaderA11y } from "../utils/patchTTSReaderA11y";

const PLUGIN_SRC = "https://unpkg.com/ttsreader-plugin/main.js";
const SCRIPT_ATTR = "data-ttsreader-plugin";

let observer: MutationObserver | null = null;

function removeExistingPlugin() {
  document.querySelectorAll(`script[${SCRIPT_ATTR}="1"]`).forEach((s) => s.remove());
  document.querySelectorAll('[class*="TTSPlugin"]').forEach((n) => n.remove());
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();

  observer?.disconnect();
  observer = null;
}

function loadPlugin() {
  const s = document.createElement("script");
  s.src = PLUGIN_SRC;
  s.defer = true;
  s.setAttribute(SCRIPT_ATTR, "1");
  document.head.appendChild(s);
}

function patchPluginUIForA11y() {
  patchTTSReaderA11y();

  observer?.disconnect();
  observer = new MutationObserver(() => patchTTSReaderA11y());
  observer.observe(document.body, { childList: true, subtree: true });

  // corta el observer a los 5s (para no observar toda la vida)
  window.setTimeout(() => {
    observer?.disconnect();
    observer = null;
  }, 5000);
}

export function TTSReaderBridge({ screenKey }: { screenKey: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      removeExistingPlugin();
      loadPlugin();

      // da tiempo a que el plugin cree el UI y luego parchea
      window.setTimeout(() => patchPluginUIForA11y(), 400);
    }, 250);

    return () => window.clearTimeout(t);
  }, [screenKey]);

  return null;
}
