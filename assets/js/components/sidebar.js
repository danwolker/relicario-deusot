// assets/js/components/sidebar.js
import { injectComponent, emit } from "../utils.js";

const SIDEBAR_URL = "./components/sidebar.html";

function getKeyFromHash() {
  const raw = (location.hash || "").replace("#", "").trim();
  return raw || "home";
}

function setActive(root, key) {
  root.querySelectorAll(".side-item").forEach((i) => i.classList.remove("active"));
  const link = root.querySelector(`[data-nav="${key}"]`);
  if (link) link.classList.add("active");
}

async function initSidebar() {
  const root = await injectComponent({
    url: SIDEBAR_URL,
    mountId: "app-sidebar",
  });

  if (!root) return;

  // marca ativo baseado no hash ao abrir
  setActive(root, getKeyFromHash());

  root.addEventListener("click", (e) => {
    const a = e.target.closest("[data-nav]");
    if (!a) return;

    e.preventDefault();

    const key = a.dataset.nav || "home";
    setActive(root, key);
    emit("relicario:nav", { key });
  });

  // se mudar hash por qualquer motivo, atualiza o menu
  window.addEventListener("hashchange", () => {
    setActive(root, getKeyFromHash());
  });
}

initSidebar();
