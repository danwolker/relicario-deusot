// assets/js/pages/router.js
import { on } from "../utils.js";

const routes = {
  home: () => import("./home.js"),
  relicario: () => import("./relicario.js"),
  "server-info": () => import("./server-info.js"),
};

let currentPage = null;

async function renderPage(key) {
  const app = document.getElementById("app");
  if (!app) return;

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
    return;
  }

  const mod = await loader();
  if (!mod?.render) {
    app.innerHTML = `<div class="hint">Página inválida.</div>`;
    return;
  }

  mod.render(app);
  currentPage = key;
}

// Escuta sidebar
on("relicario:nav", (e) => {
  renderPage(e.detail.key);
});

// Inicial
document.addEventListener("DOMContentLoaded", () => {
  renderPage("home");
});
