import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Build kedua: hanya halaman admin.
 *
 * Hasilnya satu file mandiri di `dist-admin/admin.html` yang tidak masuk
 * output statis situs, sehingga tidak bisa diambil pengunjung lewat URL.
 * File itu hanya dikirim oleh `api/admin.ts` setelah password cocok.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist-admin",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "admin.html"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    allowedHosts: true,
  },
});
