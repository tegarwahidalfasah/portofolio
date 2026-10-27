import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    /* Dulu seluruh situs digabung jadi SATU dist/index.html (1,1 MB) —
       foto profil dan font ikut jadi base64 di dalam HTML, sehingga
       tidak bisa dicache terpisah dan harus diunduh ulang tiap kali
       markup berubah. Sekarang JS/CSS/gambar jadi berkas terpisah yang
       punya hash & cache jangka panjang.
       Halaman admin TETAP single-file (lihat vite.config.admin.ts),
       karena ia dikirim api/admin.ts sebagai satu respons. */
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
              return "vendor-motion";
            }
            if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) {
              return "vendor-react";
            }
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
});
