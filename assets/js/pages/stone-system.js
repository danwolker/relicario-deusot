// assets/js/pages/stone-system.js
import { emit } from "../utils.js";
import {
  ELEMENTS_WEAPONS,
  ELEMENTS_ARMORS,
  HELMET_STATS,
  HELMET_STONE_ELEMENT_BY_STAT,
  getStoneGif,
  getUpgradePriceRows,
  WEAPON_LEVEL_VALUES,
  ARMOR_LEVEL_VALUES,
  HELMET_LEVEL_VALUES,
  normalizeLevel,
  mult3,
} from "../data/stone-weapons.data.js";

const STONE_SYSTEM_VERSION = "stone-system@palette-upgrade-v1";

function ensureCssLoaded() {
  const id = "css-page-stone-system";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "./assets/css/pages/stone-system.css";
  document.head.appendChild(link);
}

/** =========================
 *  CARDS (Informações Gerais)
 *  ========================= */

const generalInfo = [
  {
    tone: "gold",
    title: "Jewelled Pouch ao criar personagem",
    html: `
      Todo personagem criado no servidor <b>Saturno</b> receberá uma
      <img class="stone-inline-gif" src="https://i.imgur.com/pM1ziYS.gif" alt="1 Stone">
      <b>Jewelled Pouch</b> em sua <b>Store Inbox</b>.
    `,
    foot: `A pouch chega automaticamente ao personagem.`,
  },
  {
    tone: "paper",
    title: "Slots gratuitos",
    html: `
      Cada personagem ganhará <b>1 slot gratuito</b> para:
      <br><i>(Arma, Armadura e Capacete)</i>.
    `,
  },
  {
    tone: "emerald",
    title: "VIP desbloqueia slot extra",
    html: `
      Se sua conta for uma <b class="stone-green">VIP Account</b>,
      você desbloqueará <b>1 slot adicional</b> para cada equipamento automaticamente,
      totalizando <b>2 slots</b> por equipamento.
    `,
  },
  {
    tone: "paper",
    title: "3 slots permanentes",
    html: `
      Para liberar os <b>3 slots permanentes</b> de pedras para o seu personagem,
      adquira na Store a oferta:
      <b><i>Permanent Stones Slots</i></b>.
    `,
  },
  {
    tone: "gold",
    title: "Como obter a primeira Stone (nível 1)",
    html: `
      Para obter a primeira pedra nível 1 do sistema, adquira caçando nos respawns:
      <br><i>(Soul War, Gnomprona, Rotten Blood, Livrarias e Hunts/Quests Customs)</i>
      <br>ou compre na Store a oferta: <b><i>Stone Bag</i></b>.
    `,
  },
  {
    tone: "paper",
    title: "Como evoluir",
    html: `
      Para evoluir uma pedra, combine <b class="stone-green">3 iguais</b> e use (<b class="stone-green">"USE"</b>)
      em uma delas.
      <br><b>Algumas evoluções têm chance de falhar</b>. Se falhar, o gasto é perdido e as pedras permanecem no mesmo nível.
    `,
  },
];

function infoCard(c) {
  return `
    <article class="stone-card stone-${c.tone}">
      <header class="stone-card-head">
        <h3>${c.title}</h3>
      </header>
      <div class="stone-card-body">
        <p>${c.html}</p>
        ${c.foot ? `<div class="stone-footnote">${c.foot}</div>` : ""}
      </div>
    </article>
  `;
}

/** =========================
 *  TABELA DE PREÇOS (Upgrade)
 *  - usa exatamente o CSS do projeto (.stone-price-*)
 *  - sempre death stone (pretanv0..pretanv9)
 *  ========================= */

function chanceClass(chanceText) {
  // chanceText vem tipo "100%", "90%"...
  const n = Number(String(chanceText).replace("%", "").trim());
  if (!Number.isFinite(n)) return "is-good";
  if (n >= 70) return "is-good";
  if (n >= 45) return "is-warn";
  return "is-bad";
}

function renderPriceTable() {
  const rows = getUpgradePriceRows();
  const element = "death";

  const body = rows
    .map((r) => {
      const fromGif = getStoneGif(element, r.from);
      const toGif = getStoneGif(element, r.to);

      return `
        <div class="stone-price-row">
          <div class="stone-price-cell">
            <div class="stone-price-level">
              <img class="stone-price-gif" src="${fromGif}" alt="pretanv${r.from}">
              <span><b>Nível ${r.from}</b> para <b>Nível ${r.to}</b></span>
              <img class="stone-price-gif" src="${toGif}" alt="pretanv${r.to}">
            </div>
          </div>

          <div class="stone-price-cell">
            <div class="stone-price-cost">
              <span class="stone-val">${r.cost}</span>
              <span class="stone-price-arrow">+</span>
              <span><b>3x</b></span>
              <img class="stone-price-gif" src="${fromGif}" alt="3x stone nv${r.from}">
            </div>
          </div>

          <div class="stone-price-cell">
            <span class="stone-chance ${chanceClass(r.chance)}"><b>${r.chance}</b></span>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="stone-price-wrap">
      <div class="stone-price-head">
        <div class="stone-price-hcell">Níveis:</div>
        <div class="stone-price-hcell">Custo:</div>
        <div class="stone-price-hcell">Chance:</div>
      </div>

      <div class="stone-price-body">
        ${body}
      </div>
    </div>
  `;
}

/** =========================
 *  PORCENTAGENS (Tabela)
 *  ========================= */

const categoryMeta = {
  weapons: { title: "Porcentagens para Armas", icon: "https://www.tibiawiki.com.br/images/f/fd/Magic_Sword.gif" },
  armors: { title: "Porcentagens para Armaduras", icon: "https://www.tibiawiki.com.br/images/5/5f/Armor.gif" },
  helmets: { title: "Porcentagens para Capacetes", icon: "https://www.tibiawiki.com.br/images/6/6b/Helmet.gif" },
};

function normalizeCategory(cat) {
  if (cat === "weapons" || cat === "armors" || cat === "helmets") return cat;
  return "weapons";
}

function getRows(cat, lvl) {
  const category = normalizeCategory(cat);
  const level = normalizeLevel(lvl);

  if (category === "weapons") {
    const values = WEAPON_LEVEL_VALUES[level] || WEAPON_LEVEL_VALUES[1];
    return ELEMENTS_WEAPONS.map((el) => ({
      stoneGif: getStoneGif(el.key, level),
      effectIcon: el.effectIcon,
      label: el.label,
      v1: values.v1,
      v2: values.v2,
      v3: values.v3,
    }));
  }

  if (category === "armors") {
    const values = ARMOR_LEVEL_VALUES[level] || ARMOR_LEVEL_VALUES[1];
    return ELEMENTS_ARMORS.map((el) => ({
      stoneGif: getStoneGif(el.key, level),
      effectIcon: el.effectIcon,
      label: el.label,
      v1: values.v1,
      v2: values.v2,
      v3: values.v3,
    }));
  }

  // HELMETS: stone por atributo + effectIcon por atributo
  const base = HELMET_LEVEL_VALUES[level] || HELMET_LEVEL_VALUES[1];

  return HELMET_STATS.map((st) => {
    const val = base[st.key];
    const { v1, v2, v3 } = mult3(val, st.kind);

    const elementForStone = HELMET_STONE_ELEMENT_BY_STAT?.[st.key] || "death";
    const stoneGif = getStoneGif(elementForStone, level);

    return {
      stoneGif,
      effectIcon: st.effectIcon || "",
      label: st.label,
      v1,
      v2,
      v3,
      isHelmet: true,
    };
  });
}

function stoneCell(url) {
  if (url) return `<img class="stone-gif" src="${url}" alt="Stone">`;
  return `
    <div class="stone-gif-placeholder" aria-label="Stone (imagem pendente)">
      <span>Stone</span>
      <small>URL pendente</small>
    </div>
  `;
}

function renderHeader(cat) {
  const meta = categoryMeta[cat] || categoryMeta.weapons;
  return `
    <div class="stone-percent-title">
      <img class="stone-title-ico" src="${meta.icon}" alt="">
      <h3>${meta.title}</h3>
      <img class="stone-title-ico" src="${meta.icon}" alt="">
    </div>
  `;
}

function renderLevels(lvl) {
  const active = normalizeLevel(lvl);
  return Array.from({ length: 9 }, (_, i) => i + 1)
    .map((n) => {
      const cls = n === active ? "stone-lvl is-active" : "stone-lvl";
      return `<button class="${cls}" type="button" data-level="${n}">${n}</button>`;
    })
    .join("");
}

function renderTabs(cat) {
  const c = normalizeCategory(cat);
  const tab = (key, label) => {
    const cls = key === c ? "stone-tab is-active" : "stone-tab";
    return `<button class="${cls}" type="button" data-cat="${key}">${label}</button>`;
  };

  return `
    <div class="stone-tabs" role="tablist" aria-label="Categorias">
      ${tab("weapons", "Armas")}
      ${tab("armors", "Armaduras")}
      ${tab("helmets", "Capacetes")}
    </div>
  `;
}

function renderTable(cat, lvl) {
  const rows = getRows(cat, lvl);

  const head = `
    <div class="stone-matrix-head">
      <div class="stone-matrix-cell head">Stone</div>
      <div class="stone-matrix-cell head">1 Stone</div>
      <div class="stone-matrix-cell head">2 Stones</div>
      <div class="stone-matrix-cell head">3 Stones</div>
    </div>
  `;

  const body = rows
    .map((r, idx) => {
      const zebra = idx % 2 === 0 ? "zebra-a" : "zebra-b";
      const iconHtml = r.effectIcon
        ? `<img class="stone-eff-ico" src="${r.effectIcon}" alt="">`
        : `<div class="stone-eff-ico placeholder" aria-hidden="true"></div>`;

      return `
        <div class="stone-matrix-row ${zebra}">
          <div class="stone-matrix-cell">${stoneCell(r.stoneGif)}</div>

          <div class="stone-matrix-cell">
            <div class="stone-eff">
              ${iconHtml}
              <div class="stone-eff-txt">
                <span class="stone-val">${r.v1}</span>
                <span class="stone-eff-name">${r.label}</span>
              </div>
            </div>
          </div>

          <div class="stone-matrix-cell">
            <div class="stone-eff">
              ${iconHtml}
              <div class="stone-eff-txt">
                <span class="stone-val">${r.v2}</span>
                <span class="stone-eff-name">${r.label}</span>
              </div>
            </div>
          </div>

          <div class="stone-matrix-cell">
            <div class="stone-eff">
              ${iconHtml}
              <div class="stone-eff-txt">
                <span class="stone-val">${r.v3}</span>
                <span class="stone-eff-name">${r.label}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="stone-matrix" role="table" aria-label="Porcentagens por nível">
      ${head}
      <div class="stone-matrix-body">${body}</div>
    </div>
  `;
}

/** =========================
 *  PAGE RENDER
 *  ========================= */

export function render(app) {
  console.log("[stone-system] loaded:", STONE_SYSTEM_VERSION);
  ensureCssLoaded();

  let state = { cat: "weapons", lvl: 1 };

  function paint() {
    const cat = normalizeCategory(state.cat);
    const lvl = normalizeLevel(state.lvl);

    app.innerHTML = `
      <main class="stone-page" id="stone-top">
        <header class="stone-hero">
          <div class="stone-hero-inner">
            <div class="stone-title">
              <h1>Stone System <span class="stone-brand">DeusOT</span></h1>
              <p>Sistema de slots e progressão por stones, com evolução por combinação.</p>
            </div>

            <div class="stone-actions">
              <button class="stone-btn" type="button" data-nav="vip-system">VIP</button>
              <button class="stone-btn stone-btn-ghost" type="button" data-nav="home">Voltar</button>
            </div>
          </div>
        </header>

        <section class="stone-section">
          <div class="stone-block">
            <div class="stone-block-head">
              <h2>Informações Gerais</h2>
              <p class="stone-muted">Regras e pontos fundamentais do sistema.</p>
            </div>

            <div class="stone-grid">
              ${generalInfo.map(infoCard).join("")}
            </div>

            <div class="stone-sign">
              <span>Este sistema é exclusivamente desenvolvido pela equipe <b>DeusOT</b>.</span>
            </div>
          </div>
        </section>

        <section class="stone-section">
          <div class="stone-block stone-percent" id="stonePercentSection">
            <div class="stone-block-head">
              <h2>Porcentagens</h2>
              <p class="stone-muted">Selecione a categoria e o nível.</p>
            </div>

            <div class="stone-toolbar">
              ${renderTabs(cat)}

              <div class="stone-levels">
                <div class="stone-levels-label">Nível</div>
                <div class="stone-levels-chips">${renderLevels(lvl)}</div>
              </div>
            </div>

            <div class="stone-percent-wrap">
              <div id="stonePercentHeader">${renderHeader(cat)}</div>

              <div class="stone-percent-scroll">
                <div id="stonePercentTable">${renderTable(cat, lvl)}</div>
              </div>
            </div>

            <div class="stone-hint">
              Armas/Armaduras: a stone muda pelo elemento. Capacetes: a stone muda pelo atributo (skill/momentum/etc.).
            </div>
          </div>
        </section>

        <!-- ✅ TABELA DE UPGRADE seguindo seu CSS e sempre por último -->
        <section class="stone-section">
          <div class="stone-block">
            <div class="stone-block-head">
              <h2>Valores</h2>
              <p class="stone-muted">Tabela de custo e chance para evoluir a Stone (exemplo: Death).</p>
            </div>
            ${renderPriceTable()}
          </div>
        </section>
      </main>
    `;
  }

  if (window.__stoneHandler) {
    app.removeEventListener("click", window.__stoneHandler);
  }

  window.__stoneHandler = (e) => {
    const t = e.target instanceof Element ? e.target : null;
    if (!t) return;

    const nav = t.closest("[data-nav]");
    if (nav) {
      e.preventDefault();
      emit("relicario:nav", { key: nav.getAttribute("data-nav") });
      return;
    }

    const catBtn = t.closest("[data-cat]");
    if (catBtn) {
      e.preventDefault();
      state.cat = normalizeCategory(catBtn.getAttribute("data-cat"));
      paint();
      return;
    }

    const lvlBtn = t.closest("[data-level]");
    if (lvlBtn) {
      e.preventDefault();
      state.lvl = normalizeLevel(lvlBtn.getAttribute("data-level"));
      paint();
      return;
    }
  };

  app.addEventListener("click", window.__stoneHandler);
  paint();
}
