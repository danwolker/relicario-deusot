// assets/js/pages/router.js
import { on } from "../utils.js";

const routes = {
  home: () => import("./home.js"),
  relicario: () => import("./relicario.js"),
  "server-info": () => import("./server-info.js"),
  roulette: () => import("./roulette.js"),
  fendas: () => import("./fendas.js"),
  outfitbonus: () => import("./outfitbonus.js"),
  "mount-bonus": () => import("./mount-bonus.js"),
  "vip-system": () => import("./vip-system.js"),
  loyalty: () => import("./loyalty.js"),
  "stone-system": () => import("./stone-system.js"),

  // novas páginas do sidebar
  "passe-de-batalha": () => import("./passe-de-batalha.js"),
  tasks: () => import("./tasks.js"),
  "forge-system": () => import("./forge-system.js"),
  "daily-boss": () => import("./daily-boss.js"),
  "new-warzones": () => import("./new-warzones.js"),
  "castle-war": () => import("./castle-war.js"),
  "rune-system": () => import("./rune-system.js"),
};

let currentPage = null;

function normalizeKey(input) {
  const raw = String(input || "").trim();
  return raw.replace(/^#/, "").replace(/^\/+/, "") || "home";
}

function getKeyFromHash() {
  return normalizeKey(location.hash);
}

function setHash(key) {
  const safe = normalizeKey(key);
  const next = `#/${safe}`;
  if (location.hash !== next) location.hash = next;
}

async function renderPage(key) {
  const app = document.getElementById("app");
  if (!app) return;

  const safeKey = normalizeKey(key);
  if (currentPage === safeKey) return;

  app.innerHTML = `
    <section class="panel">
      <div class="details-body">
        <div class="hint">Carregando…</div>
      </div>
    </section>
  `;

  const loader = routes[safeKey];
  if (!loader) {
    app.innerHTML = `
      <section class="panel">
        <div class="details-body">
          <div class="hint">Seção em construção.</div>
        </div>
      </section>
    `;
    currentPage = safeKey;
    return;
  }

  try {
    const mod = await loader();
    if (!mod?.render) {
      app.innerHTML = `
        <section class="panel">
          <div class="details-body">
            <div class="hint">Página inválida.</div>
          </div>
        </section>
      `;
      currentPage = safeKey;
      return;
    }

    mod.render(app);
    currentPage = safeKey;
  } catch (err) {
    console.error("[router] erro ao carregar rota:", safeKey, err);
    app.innerHTML = `
      <section class="panel">
        <div class="details-body">
          <div class="hint">Erro ao abrir esta página. Verifique o console.</div>
        </div>
      </section>
    `;
    currentPage = safeKey;
  }
}

on("relicario:nav", (e) => {
  const key = e?.detail?.key || "home";
  setHash(key);
  renderPage(key);
});

window.addEventListener("hashchange", () => {
  renderPage(getKeyFromHash());
});

document.addEventListener("DOMContentLoaded", () => {
  const k = getKeyFromHash();
  setHash(k);
  renderPage(k);
});
