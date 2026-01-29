// assets/js/components/sidebar.js
import { injectComponent, emit } from "../utils.js";

const SIDEBAR_URL = "./components/sidebar.html";

/**
 * Normaliza o hash para obter apenas a key da rota.
 * Exemplos aceitos:
 *   "#/relicario" → "relicario"
 *   "#relicario"  → "relicario"
 *   "/relicario"  → "relicario"
 *   ""            → "home"
 */
function getKeyFromHash() {
  const raw = String(location.hash || "")
    .replace(/^#/, "")
    .replace(/^\/+/, "")
    .trim();

  return raw || "home";
}

/**
 * Marca visualmente o item ativo do sidebar
 */
function setActive(root, key) {
  if (!root) return;

  root.querySelectorAll(".side-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === key);
  });
}

/**
 * Inicializa o sidebar:
 * - injeta HTML
 * - liga eventos de navegação
 * - sincroniza estado com hash
 */
async function initSidebar() {
  const root = await injectComponent({
    url: SIDEBAR_URL,
    mountId: "app-sidebar",
  });

  if (!root) return;

  // 🔹 marca ativo ao carregar (ex: reload, deep link)
  setActive(root, getKeyFromHash());

  // 🔹 clique nos itens do menu
  root.addEventListener("click", (e) => {
    const link = e.target.closest(".side-item[data-nav]");
    if (!link) return;

    e.preventDefault();

    const key = link.dataset.nav || "home";

    // evita trabalho duplicado se já estiver ativo
    if (key === getKeyFromHash()) return;

    setActive(root, key);
    emit("relicario:nav", { key });
  });

  // 🔹 se o hash mudar por qualquer motivo (back/forward/manual)
  window.addEventListener("hashchange", () => {
    setActive(root, getKeyFromHash());
  });
}

// 🔹 bootstrap
initSidebar();
