import { JSDOM } from "jsdom";

const GLOBALS = [
  "window", "document", "navigator", "HTMLElement", "HTMLInputElement",
  "Element", "Node", "Event", "MouseEvent", "KeyboardEvent",
  "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame",
  "localStorage", "Blob", "TextEncoder", "FileReader", "File",
];

/**
 * Siapkan jsdom + global yang dibutuhkan React.
 * `fetch` di-stub agar store tidak benar-benar meminta cms-content.json.
 */
export function makeDom(url = "http://localhost:5174/admin.html") {
  const dom = new JSDOM(
    `<!doctype html><html><body><div id="root"></div></body></html>`,
    { url, pretendToBeVisual: true }
  );
  const w = dom.window;

  for (const k of GLOBALS) {
    if (w[k] === undefined) continue;
    try {
      globalThis[k] = w[k];
    } catch {
      Object.defineProperty(globalThis, k, {
        value: w[k],
        configurable: true,
        writable: true,
      });
    }
  }

  w.matchMedia = () => ({
    matches: false,
    addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  });
  w.scrollTo = () => {};
  globalThis.fetch = () =>
    Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) });

  return { dom, w };
}

/**
 * Buat localStorage melempar seperti browser yang kehabisan kuota.
 *
 * PENTING: Storage jsdom adalah Proxy, sehingga `localStorage.setItem = fn`
 * justru menyimpan ITEM bernama "setItem" dan tidak menimpa methodnya.
 * Override harus dipasang di prototype.
 */
export function makeStorageThrow(w, errName = "QuotaExceededError") {
  const proto = Object.getPrototypeOf(w.localStorage);
  Object.defineProperty(proto, "setItem", {
    configurable: true,
    value: () => {
      const e = new Error(errName);
      e.name = errName;
      throw e;
    },
  });
}

export function restoreStorage(w) {
  const proto = Object.getPrototypeOf(w.localStorage);
  delete proto.setItem;
}
