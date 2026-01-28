// assets/js/components/header.js
// Carrega o header como componente e publica eventos desacoplados
// para a página (ex.: upgrade.js) controlar busca/navegação sem acoplar tudo.

const HEADER_URL = "./components/header.html";

function mountHeader(html) {
  const root = document.getElementById("app-header");
  if (!root) return;

  root.innerHTML = html;

  // ---------- Navegação ----------
  const nav = root.querySelector(".main-nav");
  if (nav) {
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-nav]");
      if (!a) return;
      e.preventDefault();

      // estado visual do menu
      nav.querySelectorAll(".nav-item").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");

      // evento global para a página reagir
      window.dispatchEvent(
        new CustomEvent("relicario:nav", {
          detail: { key: a.getAttribute("data-nav") || "" },
        })
      );
    });
  }

  // ---------- Busca ----------
  const input = root.querySelector("#search");
  const clear = root.querySelector("#clear");

  if (input) {
    input.addEventListener("input", () => {
      window.dispatchEvent(
        new CustomEvent("relicario:search", {
          detail: { value: input.value || "" },
        })
      );
    });

    // Enter não faz submit/refresh acidental
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") ev.preventDefault();
    });
  }

  if (clear) {
    clear.addEventListener("click", () => {
      if (input) input.value = "";
      window.dispatchEvent(new CustomEvent("relicario:clear"));
      // foco amigável
      if (input) input.focus();
    });
  }
}

async function loadHeader() {
  try {
    const res = await fetch(HEADER_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Falha ao carregar header (${res.status})`);
    const html = await res.text();
    mountHeader(html);
  } catch (err) {
    console.error(err);
    const root = document.getElementById("app-header");
    if (root) {
      root.innerHTML = `
        <div class="panel" style="margin:16px; padding:14px;">
          <div class="kicker">Erro</div>
          <div style="margin-top:8px; color: rgba(233,238,247,.92);">
            Não consegui carregar <b>${HEADER_URL}</b>.
          </div>
        </div>
      `;
    }
  }
}

// init
loadHeader();
