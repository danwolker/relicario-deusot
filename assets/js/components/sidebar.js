import { injectComponent, emit } from "../utils.js";

const SIDEBAR_URL = "./components/sidebar.html";

async function initSidebar() {
  const root = await injectComponent({
    url: SIDEBAR_URL,
    mountId: "app-sidebar",
  });

  if (!root) return;

  root.addEventListener("click", (e) => {
    const a = e.target.closest("[data-nav]");
    if (!a) return;

    e.preventDefault();

    root.querySelectorAll(".side-item").forEach(i =>
      i.classList.remove("active")
    );

    a.classList.add("active");
    emit("relicario:nav", { key: a.dataset.nav });
  });

  // default: Home
  const home = root.querySelector('[data-nav="home"]');
  if (home) home.classList.add("active");
}

initSidebar();
