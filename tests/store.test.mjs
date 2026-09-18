import { ok, section, result, reset } from "./assert.mjs";
import { makeDom, makeStorageThrow, restoreStorage } from "./dom.mjs";

export async function run() {
  reset();
  section("store.tsx — saveDraft melaporkan kegagalan");

  const { w } = makeDom("http://localhost:5174/");
  const { React, act, createRoot, CmsProvider, useCms } = await import(
    process.env.TEST_UI_BUNDLE
  );
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  let api;
  function Grab() {
    api = useCms();
    return null;
  }
  const root = createRoot(w.document.getElementById("root"));
  act(() => {
    root.render(React.createElement(CmsProvider, null, React.createElement(Grab)));
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 40));
  });

  // ── jalur normal ──
  let res;
  act(() => {
    res = api.saveDraft({ id: { profile: { name: "Aman" } }, en: {} });
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 20));
  });
  ok("kuota tersedia -> ok:true", res.ok === true);
  ok("ok:true membawa ukuran byte", typeof res.bytes === "number" && res.bytes > 0);
  ok("draft benar-benar masuk localStorage", !!w.localStorage.getItem("portfolio-cms-draft-v1"));
  ok("hasDraft jadi true", api.hasDraft === true);

  // ── kuota penuh ──
  makeStorageThrow(w, "QuotaExceededError");
  try {
    w.localStorage.setItem("probe", "x");
    ok("sanity: simulasi kuota aktif", false);
  } catch (e) {
    ok("sanity: simulasi kuota aktif", e.name === "QuotaExceededError");
  }

  let res2;
  act(() => {
    res2 = api.saveDraft({ id: { profile: { name: "Besar" } }, en: {} });
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 20));
  });
  ok("kuota penuh -> ok:false", res2.ok === false);
  ok("alasannya 'quota'", res2.reason === "quota");
  ok("ukuran tetap dilaporkan", typeof res2.bytes === "number" && res2.bytes > 0);

  // ── kegagalan non-kuota (mis. mode privat) ──
  makeStorageThrow(w, "SecurityError");
  let res3;
  act(() => {
    res3 = api.saveDraft({ id: { profile: { name: "X" } }, en: {} });
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 20));
  });
  ok("error lain -> ok:false", res3.ok === false);
  ok("alasannya 'unavailable'", res3.reason === "unavailable");

  restoreStorage(w);
  act(() => root.unmount());
  return result();
}
