import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { browserslistToTargets } from "lightningcss";
import react from "@vitejs/plugin-react-swc";
import browserslist from "browserslist";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist(">=0.25%")),
      cssModules: {},
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [
    react(),
    VitePWA({ registerType: "autoUpdate", devOptions: { enabled: true } }),
  ],
});
