import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/cceu-emergency-coordination/",
  plugins: [react()],
  build: {
    cssMinify: false,
  },
});
