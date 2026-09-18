/* Entry yang di-bundle esbuild untuk tes UI.
   Mengekspor React dari bundle yang sama agar tidak ada dua salinan React
   (penyebab "Invalid hook call"). */
import * as React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CmsProvider, useCms } from "../src/cms/store";
import { ThemeProvider } from "../src/cms/theme";
import { Admin } from "../src/cms/Admin";

export { React, act, createRoot, CmsProvider, ThemeProvider, Admin, useCms };
