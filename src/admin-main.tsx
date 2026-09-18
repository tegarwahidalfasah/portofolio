import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CmsProvider } from "./cms/store";
import { ThemeProvider } from "./cms/theme";
import { Admin } from "./cms/Admin";

/* Entry khusus halaman admin.
   Dibuild terpisah (vite.config.admin.ts) menjadi dist-admin/admin.html
   dan TIDAK pernah disajikan sebagai file statis — hanya dikirim oleh
   api/admin.ts setelah password diverifikasi di server. */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CmsProvider>
      <ThemeProvider>
        <Admin />
      </ThemeProvider>
    </CmsProvider>
  </StrictMode>
);
