const CSS_HREF = "assets/css/pages/mount-bonus.css";

function ensureCss(href) {
  const id = `page-css:${href}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseBonus(lines) {
  return lines.map((t) => {
    const idx = t.indexOf(":");
    if (idx === -1) return { label: t.trim(), value: "" };
    return {
      label: t.slice(0, idx).trim(),
      value: t.slice(idx + 1).trim(),
    };
  });
}

const MOUNTS = [
  {
    name: "Nova Horse",
    image: "https://deusot.com/images/mounts/Nova_Horse_Mount.gif",
    bonus: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.10%",
      "Critical Damage: +1%",
      "Momentum: +1%",
      "Ruse: +1%",
    ],
  },
  {
    name: "Red Scorpion",
    image: "https://deusot.com/images/mounts/redscorpion_mount.gif",
    bonus: ["Onslaught: +0.50%", "Transcendence: +0.25%"],
  },
  {
    name: "Purple Scorpion",
    image: "https://deusot.com/images/mounts/purplescorpion_mount.gif",
    bonus: ["Onslaught: +0.50%", "Transcendence: +0.25%"],
  },
  {
    name: "Black Scorpion",
    image: "https://deusot.com/images/mounts/blackscorpion_mount.gif",
    bonus: ["Onslaught: +0.50%", "Transcendence: +0.25%"],
  },
  {
    name: "White Scorpion",
    image: "https://deusot.com/images/mounts/whitescorpion_mount.gif",
    bonus: ["Onslaught: +0.50%", "Transcendence: +0.25%"],
  },
  {
    name: "Rainbow Scorpion",
    image: "https://deusot.com/images/mounts/rainbowscorpion_mount.gif",
    bonus: ["Onslaught: +0.50%", "Transcendence: +0.25%"],
  },
  {
    name: "Neon Sparkid",
    image: "https://www.tibiawiki.com.br/images/3/30/Neon_Sparkid.gif",
    bonus: [
      "Critical Damage: +0.10%",
      "Skill: +1",
      "Critical Chance: +0.30%",
      "Onslaught: +0.10%",
    ],
  },
  {
    name: "Vortexion",
    image: "https://www.tibiawiki.com.br/images/4/4d/Vortexion.gif",
    bonus: [
      "Critical Damage: +0.10%",
      "Skill: +1",
      "Critical Chance: +0.30%",
      "Onslaught: +0.10%",
    ],
  },
  {
    name: "Phantasmal Jade",
    image: "https://www.tibiawiki.com.br/images/7/7f/Phantasmal_Jade.gif",
    bonus: ["Critical Damage: +0.10%", "Skill: +1"],
  },
  {
    name: "Singeing Steed",
    image: "https://www.tibiawiki.com.br/images/5/5f/Singeing_Steed.gif",
    bonus: ["Critical Damage: +0.10%", "Skill: +1"],
  },
];

/* =======================
   Soma de bônus
======================= */

function normalizeKey(label) {
  const k = String(label || "").trim().toLowerCase();

  if (k.includes("critical chance")) return "Critical Chance";
  if (k.includes("critical damage")) return "Critical Damage";
  if (k.includes("skill")) return "Skill";
  if (k.includes("onslaught")) return "Onslaught";
  if (k.includes("transcendence")) return "Transcendence";
  if (k.includes("momentum")) return "Momentum";
  if (k.includes("ruse")) return "Ruse";

  return label
    .split(" ")
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ""))
    .join(" ");
}

function parseValueUnit(raw) {
  const s = String(raw || "").trim();
  const isPercent = s.includes("%");

  const cleaned = s.replace("%", "").replace(",", ".").replace(/[^\d.+-]/g, "");
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return { num: 0, unit: isPercent ? "%" : "pt" };

  return { num, unit: isPercent ? "%" : "pt" };
}

function computeTotals(mounts) {
  const totals = {};

  for (const m of mounts) {
    const parsed = parseBonus(m.bonus);

    for (const it of parsed) {
      const key = normalizeKey(it.label);
      const { num, unit } = parseValueUnit(it.value);

      if (!totals[key]) totals[key] = { unit, sum: 0 };
      if (totals[key].unit !== unit) continue;

      totals[key].sum += num;
    }
  }

  return totals;
}

function formatTotal(sum, unit) {
  if (unit === "%") return `${sum.toFixed(2)}%`;

  const isIntish = Math.abs(sum - Math.round(sum)) < 1e-9;
  return isIntish ? `+${Math.round(sum)}` : `+${sum.toFixed(2)}`;
}

function renderTotalsCardHtml(totals, totalMounts) {
  const entries = Object.entries(totals);

  const priority = (k) => {
    if (k === "Skill") return 0;
    if (k.includes("Critical")) return 1;
    if (k === "Onslaught") return 2;
    if (k === "Transcendence") return 3;
    if (k === "Momentum") return 4;
    if (k === "Ruse") return 5;
    return 10;
  };

  entries.sort((a, b) => priority(a[0]) - priority(b[0]));

  const chips = entries
    .map(([k, v]) => {
      const val = formatTotal(v.sum, v.unit);
      return `
        <div class="mb-total-chip">
          <div class="mb-total-chip__k">${esc(k)}</div>
          <div class="mb-total-chip__v">${esc(val)}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="mb-totals">
      <div class="mb-totals__head">
        <h2 class="mb-totals__title">Resumo dos bônus acumulados (${esc(totalMounts)})</h2>
        <p class="mb-totals__desc">
          Aqui está o “pacote total” somando todas as montarias desta lista.
          A vantagem de comprar todas é que cada mount vira um upgrade permanente: os bônus empilham,
          funcionam juntos e você ganha poder constante sem precisar estar montado.
        </p>
      </div>

      <div class="mb-totals__grid">
        ${chips}
      </div>

      <div class="mb-totals__footer">
        <div class="mb-totals__note">
          <span class="mb-totals__spark">✦</span>
          <span>
            Quanto mais mounts no personagem, mais forte fica o conjunto. É progressão “passiva”:
            você compra/coleciona e o ganho fica lá, somando pra sempre.
          </span>
        </div>
      </div>
    </div>
  `;
}

/* =======================
   Cards + Grid
======================= */

function mountCard(m) {
  const items = parseBonus(m.bonus);
  const search = (m.name + " " + m.bonus.join(" ")).toLowerCase();

  return `
    <article class="mb-card" data-search="${esc(search)}">
      <div class="mb-card__media">
        <img class="mb-mount" src="${esc(m.image)}" alt="${esc(m.name)}" loading="lazy" />
      </div>

      <div class="mb-card__body">
        <header class="mb-card__head">
          <h3 class="mb-card__title">${esc(m.name)}</h3>
          <span class="mb-chip">Bonus</span>
        </header>

        <ul class="mb-bonus">
          ${items
            .map(
              (it) => `
              <li class="mb-bonus__item">
                <span class="mb-bonus__dot">♦</span>
                <span class="mb-bonus__label">${esc(it.label)}</span>
                ${it.value ? `<span class="mb-bonus__value">${esc(it.value)}</span>` : ""}
              </li>
            `
            )
            .join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderGrid(app, query) {
  const q = (query ?? "").trim().toLowerCase();

  const grid = app.querySelector("[data-mb-grid]");
  const empty = app.querySelector("[data-mb-empty]");
  const count = app.querySelector("[data-mb-count]");

  const filtered = !q
    ? MOUNTS
    : MOUNTS.filter((m) =>
        (m.name + " " + m.bonus.join(" ")).toLowerCase().includes(q)
      );

  grid.innerHTML = filtered.map(mountCard).join("");
  count.textContent = String(filtered.length);
  empty.hidden = filtered.length > 0;
}

export function render(app) {
  ensureCss(CSS_HREF);

  const totals = computeTotals(MOUNTS);

  app.innerHTML = `
    <section class="panel mb-panel">
      <header class="mb-head">
        <div class="mb-head__titles">
          <div class="mb-kicker">System</div>

          <div class="mb-titlebar">
            <h1 class="mb-title">Mount Bonus</h1>

            <label class="mb-search mb-search--compact" aria-label="Buscar mounts">
              <span class="mb-search__icon">⌕</span>
              <input class="mb-search__input" type="search" placeholder="Buscar..." data-mb-search />
            </label>
          </div>

          <p class="mb-subtitle">
            Bônus acumulativos por mounts no personagem — você não precisa estar montado para ativar.
          </p>
        </div>

        <div class="mb-meta">
          <div class="mb-counter">
            <div class="mb-counter__label">Resultados</div>
            <div class="mb-counter__value" data-mb-count>0</div>
          </div>
        </div>
      </header>

      <div class="mb-hero">
        <div class="mb-hero__card">
          <h2 class="mb-hero__title">Bem-vindo ao Sistema de Mounts Bonus!</h2>
          <p class="mb-hero__text">
            A proposta é premiar colecionadores: cada mount obtida soma ao seu progresso e pode render
            recompensas como <strong>+Health</strong>, <strong>+Mana</strong>, <strong>+Capacity</strong>,
            <strong>+Skills</strong> e outros atributos.
          </p>
          <p class="mb-hero__text mb-hero__note">
            Os bônus são <strong>acumulativos</strong> e não dependem de estar usando a montaria — basta ter no personagem.
          </p>
        </div>

        <div class="mb-hero__totals">
          ${renderTotalsCardHtml(totals, MOUNTS.length)}
        </div>

        <div class="mb-tools mb-tools--mini">
          <div class="mb-actions">
    
          </div>
        </div>
      </div>

      <div class="mb-section" id="mb-list">
        <div class="mb-section__head">
          <h2 class="mb-section__title">Outros Bônus de Mounts</h2>
          <p class="mb-section__desc">Cards responsivos, leitura rápida, sem tabela infinita.</p>
        </div>

        <div class="mb-grid" data-mb-grid></div>

        <div class="mb-empty" data-mb-empty hidden>
          <div class="mb-empty__card">
            <h3 class="mb-empty__title">Nenhum resultado</h3>
            <p class="mb-empty__text">
              Tente algo mais curto: <strong>crit</strong>, <strong>skill</strong>, <strong>onslaught</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Init
  renderGrid(app, "");

  const input = app.querySelector("[data-mb-search]");
  input.addEventListener("input", () => renderGrid(app, input.value));

  app.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");

    if (action === "clear") {
      input.value = "";
      input.focus();
      renderGrid(app, "");
      return;
    }

    if (action === "focus") {
      app
        .querySelector("#mb-list")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  });
}
