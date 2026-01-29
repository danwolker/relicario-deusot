// assets/js/components/sidebar.js
import { injectComponent, emit } from "../utils.js";

const SIDEBAR_URL = "./components/sidebar.html";

function getKeyFromHash() {
  const raw = String(location.hash || "")
    .replace(/^#/, "")
    .replace(/^\/+/, "")
    .trim();

  return raw || "home";
}

function setActive(root, key) {
  if (!root) return;

  root.querySelectorAll(".side-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === key);
  });
}

async function initSidebar() {
  const root = await injectComponent({
    url: SIDEBAR_URL,
    mountId: "app-sidebar",
  });

  if (!root) return;

  setActive(root, getKeyFromHash());

  root.addEventListener("click", (e) => {
    const link = e.target.closest(".side-item[data-nav]");
    if (!link) return;

    e.preventDefault();

    const key = link.dataset.nav || "home";
    if (key === getKeyFromHash()) return;

    setActive(root, key);
    emit("relicario:nav", { key });
  });

  window.addEventListener("hashchange", () => {
    setActive(root, getKeyFromHash());
  });
}

initSidebar();
