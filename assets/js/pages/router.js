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
};

let currentPage = null;

function getKeyFromHash() {
  const raw = (location.hash || "").replace("#", "").trim();
  return raw || "home";
}

function setHash(key) {
  const safe = key || "home";
  if (location.hash.replace("#", "") !== safe) {
    location.hash = safe;
  }
}

async function renderPage(key) {
  const app = document.getElementById("app");
  if (!app) return;

  if (currentPage === key) return;

  app.innerHTML = `
    <section class="panel">
      <div class="details-body">
        <div class="hint">Carregando…</div>
      </div>
    </section>
  `;

  const loader = routes[key];
  if (!loader) {
    app.innerHTML = `
      <section class="panel">
        <div class="details-body">
          <div class="hint">Seção em construção.</div>
        </div>
      </section>
    `;
    currentPage = key;
    return;
  }

  try {
    const mod = await loader();
    if (!mod?.render) {
      app.innerHTML = `<div class="hint">Página inválida.</div>`;
      currentPage = key;
      return;
    }

    mod.render(app);
    currentPage = key;
  } catch (err) {
    console.error("[router] erro ao carregar rota:", key, err);
    app.innerHTML = `
      <section class="panel">
        <div class="details-body">
          <div class="hint">Erro ao abrir esta página. Verifique o console.</div>
        </div>
      </section>
    `;
    currentPage = key;
  }
}

on("relicario:nav", (e) => {
  const key = e?.detail?.key || "home";
  setHash(key);
  renderPage(key);
});

window.addEventListener("hashchange", () => {
  const key = getKeyFromHash();
  renderPage(key);
});

document.addEventListener("DOMContentLoaded", () => {
  const key = getKeyFromHash();
  renderPage(key);
});
