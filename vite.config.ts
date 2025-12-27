import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/cceu-emergency-coordination-platform-ARIA/",
  plugins: [react(), tailwindcss()],
});
