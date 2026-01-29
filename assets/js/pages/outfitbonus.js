// assets/js/pages/outfitbonus.js

const PAGE_KEY = "outfitbonus";
const ORIGIN = "https://deusot.com";

/**
 * Base dinâmica para CSS/arquivos do seu projeto:
 * - local: "/"
 * - GitHub Pages project page: "/relicario-deusot/"
 *
 * Recomendado no HTML:
 * <meta name="app-base" content="/relicario-deusot/">
 */
function getBasePath() {
  const meta = document.querySelector('meta[name="app-base"]');
  if (meta?.content) return String(meta.content).replace(/\/+$/, "") + "/";

  const { hostname, pathname } = window.location;
  if (hostname.endsWith("github.io")) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
  }
  return "/";
}

/**
 * Resolve URL para imagens/links.
 * Regra: outfits SEMPRE vêm do ORIGIN (deusot.com), a menos que já seja http(s).
 */
export function toAbsUrl(url, origin = ORIGIN) {
  if (!url) return "";
  const s = String(url).trim();
  if (!s) return "";

  if (/^https?:\/\//i.test(s)) return s;

  if (/^(data:|mailto:|tel:|javascript:)/i.test(s) || s.startsWith("#")) return s;

  const noDot = s.replace(/^\.\//, "");
  const cleaned = noDot.replace(/^\/+/, "");
  return `${origin}/${cleaned}`;
}

/**
 * Para quando você colar HTML bruto no futuro: converte src/href relativos para absolutos no ORIGIN.
 */
export function normalizeRelativeUrlsInHtml(html, origin = ORIGIN) {
  if (!html) return "";
  return String(html).replace(
    /(src|href)\s*=\s*("([^"]+)"|'([^']+)')/gi,
    (m, attr, quoted, dq, sq) => {
      const raw = dq ?? sq ?? "";
      const v = raw.trim();

      if (
        !v ||
        /^https?:\/\//i.test(v) ||
        /^data:/i.test(v) ||
        /^mailto:/i.test(v) ||
        /^tel:/i.test(v) ||
        /^javascript:/i.test(v) ||
        v.startsWith("#")
      ) {
        return m;
      }

      const abs = toAbsUrl(v, origin);
      const quote = quoted.startsWith("'") ? "'" : '"';
      return `${attr}=${quote}${abs}${quote}`;
    }
  );
}

function ensurePageStyles() {
  const id = `page-css-${PAGE_KEY}`;
  if (document.getElementById(id)) return;

  const base = getBasePath();
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `${base}assets/css/pages/${PAGE_KEY}.css`;
  document.head.appendChild(link);
}

/**
 * ✅ Outfits
 * - Você pediu: imagens “male” e caminhos diretos do deusot.com
 * - Então a gente usa as URLs exatas aqui (sem depender de ./images do repo).
 */
const OUTFITS = [
  {
    name: "Future Warrior Outfit",
    maleImg: "https://deusot.com/images/outfits/Outfit_Future_Warrior_DeusOT.gif",
    bonuses: ["Onslaught: +0.10%", "Transcendence: +0.05%"],
  },
  {
    name: "Blood Lover Outfit",
    maleImg: "https://deusot.com/images/outfits/Outfit_Blood_Lover.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Moonmaster Outfit",
    maleImg: "https://deusot.com/images/outfits/Outfit_Moonmaster.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Hefesto Outfit",
    maleImg: "https://deusot.com/images/outfits/Outfit_Hefesto.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +0.50%",
    ],
  },

  // ✅ lista que você mandou (todas do deusot.com / male)
  {
    name: "Hades Outfit",
    maleImg: "https://deusot.com/images/outfits/hades_outfit.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Nattank",
    maleImg: "https://deusot.com/images/outfits/nattank_outfit.gif",
    bonuses: [
      "Skill: +2",
      "Transcendence: +0.15%",
      "Onslaught: +0.10%",
      "Critical Chance: +0.25%",
      "Critical Damage: +1%",
      "Momentum: +0.50%",
      "Ruse: +0.50%",
    ],
  },
  {
    name: "Diogo",
    maleImg: "https://deusot.com/images/outfits/diogo_outfit.gif",
    bonuses: [
      "Skill: +2",
      "Transcendence: +0.15%",
      "Onslaught: +0.10%",
      "Critical Chance: +0.25%",
      "Critical Damage: +1%",
      "Momentum: +0.50%",
      "Ruse: +0.50%",
    ],
  },
  {
    name: "DDD",
    maleImg: "https://deusot.com/images/outfits/ddd_outfit.gif",
    bonuses: [
      "Skill: +2",
      "Transcendence: +0.15%",
      "Onslaught: +0.10%",
      "Critical Chance: +0.25%",
      "Critical Damage: +1%",
      "Momentum: +0.50%",
      "Ruse: +0.50%",
    ],
  },
  {
    name: "Bugado",
    maleImg: "https://deusot.com/images/outfits/bugado_outfit.gif",
    bonuses: [
      "Skill: +2",
      "Transcendence: +0.15%",
      "Onslaught: +0.10%",
      "Critical Chance: +0.25%",
      "Critical Damage: +1%",
      "Momentum: +0.50%",
      "Ruse: +0.50%",
    ],
  },
  {
    name: "Bigodezerah",
    maleImg: "https://deusot.com/images/outfits/bigodezerah_outfit.gif",
    bonuses: ["Onslaught: +0.10%", "Critical Chance: +0.20%"],
  },
  {
    name: "Julio Skeletin",
    maleImg: "https://deusot.com/images/outfits/julioskeletin_outfit.gif",
    bonuses: [
      "Critical Chance: +0.05%",
      "Critical Damage: +1%",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Momentum: +0.50%",
      "Ruse: +0.50%",
    ],
  },
  {
    name: "Archer",
    maleImg: "https://deusot.com/images/outfits/archer_outfit.gif",
    bonuses: ["Critical Chance: +0.05%"],
  },
  {
    name: "Angel",
    maleImg: "https://deusot.com/images/outfits/angel_outfit.gif",
    bonuses: ["Skill: +2", "Transcendence: +0.25%", "Onslaught: +0.50%"],
  },
  {
    name: "Diamond Outfit",
    maleImg: "https://deusot.com/images/outfits/diamond_outfit.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Platinum Outfit",
    maleImg: "https://deusot.com/images/outfits/platinum_outfit.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Silver Outfit",
    maleImg: "https://deusot.com/images/outfits/silver_outfit.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Ruby Outfit",
    maleImg: "https://deusot.com/images/outfits/ruby_outfit.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Guardian Of Nature",
    maleImg: "https://deusot.com/images/outfits/Guardian_Of_Nature_Male.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Elemental Spykes",
    maleImg: "https://deusot.com/images/outfits/Elemental_Spykes_Male.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Aegis Aurora",
    maleImg: "https://deusot.com/images/outfits/Aegis_Valor.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Ultimate God",
    maleImg: "https://deusot.com/images/outfits/Ultimate_Gods_Male.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Polar King and Queen",
    maleImg: "https://deusot.com/images/outfits/Polar_King.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },
  {
    name: "Shocksmith",
    maleImg: "https://deusot.com/images/outfits/Shocksmith_Male.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +1",
      "Onslaught: +0.10%",
      "Transcendence: +0.25%",
      "Critical Damage: +0.50%",
    ],
  },

  // Mantidos (tibiawiki), porque são outfits oficiais com diferenças por gênero
  {
    name: "Golden Outfit",
    link: "https://www.tibiawiki.com.br/wiki/Golden_Outfit_Outfits",
    maleImg: "https://www.tibiawiki.com.br/images/4/48/Outfit_Golden_Male_Addon_3.gif",
    bonuses: [
      "Critical Chance: +0.10%",
      "Skill: +2",
      "Onslaught: +0.10%",
      "Transcendence: +0.05%",
      "Critical Damage: +1%",
    ],
  },
  {
    name: "Mage",
    link: "https://www.tibiawiki.com.br/wiki/Mage_Outfits",
    maleImg: "https://www.tibiawiki.com.br/images/d/da/Outfit_Mage_Male_Addon_3.gif",
    notes: [
      { who: "Female", text: "Nenhum bônus" },
      {
        who: "Male",
        text:
          "Critical Chance: +0.10% • Skill: +2 • Onslaught: +0.10% • Transcendence: +0.05% • Critical Damage: +1%",
      },
    ],
  },
  {
    name: "Summoner",
    link: "https://www.tibiawiki.com.br/wiki/Summoner_Outfits",
    maleImg: "https://www.tibiawiki.com.br/images/8/8a/Outfit_Summoner_Male_Addon_3.gif",
    notes: [
      {
        who: "Female",
        text:
          "Critical Chance: +0.10% • Skill: +2 • Onslaught: +0.10% • Transcendence: +0.05% • Critical Damage: +1%",
      },
      { who: "Male", text: "Nenhum bônus" },
    ],
  },
  {
    name: "Royal Costume",
    link: "https://www.tibiawiki.com.br/wiki/Formal_Dress_Outfits",
    maleImg: "https://www.tibiawiki.com.br/images/8/81/Outfit_Royal_Costume_Male_Addon_3.gif",
    bonuses: ["Critical Chance: +0.05%", "Skill: +1", "Onslaught: +0.10%", "Critical Damage: +1%"],
  },
];

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ============================
   SOMA TOTAL DOS ATRIBUTOS
============================ */

function canonicalStatName(raw) {
  const k = normalizeText(raw).replace(/\s+/g, " ").trim();

  if (k.startsWith("crit chance") || k === "critical chance") return "Critical Chance";
  if (k.startsWith("crit damage") || k === "critical damage") return "Critical Damage";
  if (k === "skill" || k === "skills") return "Skill";
  if (k === "onslaught") return "Onslaught";
  if (k === "transcendence") return "Transcendence";
  if (k === "momentum") return "Momentum";
  if (k === "ruse") return "Ruse";

  const trimmed = String(raw || "").trim();
  return trimmed ? trimmed : "Other";
}

function parseStatPiece(piece) {
  const s = String(piece || "").trim();
  if (!s) return null;
  if (/nenhum\s*b[oô]nus/i.test(s)) return null;

  const idx = s.indexOf(":");
  if (idx === -1) return null;

  const nameRaw = s.slice(0, idx).trim();
  const valRaw = s.slice(idx + 1).trim();
  const stat = canonicalStatName(nameRaw);

  const numMatch = valRaw.match(/([+-]\s*\d+(?:[.,]\d+)?)/);
  if (!numMatch) return null;

  const num = Number(numMatch[1].replace(/\s+/g, "").replace(",", "."));
  if (!Number.isFinite(num)) return null;

  const isPercent = /%/.test(valRaw);
  return { stat, value: num, isPercent };
}

function pushStatSum(store, parsed) {
  if (!parsed) return;
  const { stat, value, isPercent } = parsed;
  const key = `${stat}__${isPercent ? "pct" : "flat"}`;
  store[key] = (store[key] ?? 0) + value;
}

function computeTotals(outfits) {
  const sums = Object.create(null);

  for (const o of outfits) {
    for (const b of o.bonuses || []) pushStatSum(sums, parseStatPiece(b));

    for (const n of o.notes || []) {
      const txt = String(n?.text || "");
      if (!txt) continue;

      const parts = txt.split("•").map((p) => p.trim()).filter(Boolean);
      for (const p of parts) pushStatSum(sums, parseStatPiece(p));
    }
  }

  const getPct = (stat) => sums[`${stat}__pct`] ?? 0;
  const getFlat = (stat) => sums[`${stat}__flat`] ?? 0;

  return {
    Skill: getFlat("Skill"),
    "Critical Chance": getPct("Critical Chance"),
    "Critical Damage": getPct("Critical Damage"),
    Onslaught: getPct("Onslaught"),
    Transcendence: getPct("Transcendence"),
    Momentum: getPct("Momentum"),
    Ruse: getPct("Ruse"),
  };
}

function formatPct(n) {
  const v = Math.round(n * 100) / 100;
  return `${v.toFixed(2)}%`;
}

function formatInt(n) {
  return String(Math.round(n));
}

function renderTotalsCard(totals) {
  const hasAnything =
    (totals.Skill || 0) !== 0 ||
    (totals["Critical Chance"] || 0) !== 0 ||
    (totals["Critical Damage"] || 0) !== 0 ||
    (totals.Onslaught || 0) !== 0 ||
    (totals.Transcendence || 0) !== 0 ||
    (totals.Momentum || 0) !== 0 ||
    (totals.Ruse || 0) !== 0;

  const summaryLine = hasAnything
    ? `Ao completar <strong>todos</strong> os outfits, você empilha um pacote permanente de poder que muda o ritmo das lutas — mais consistência no dano, mais explosão crítica e mais “sobra” pra errar menos.`
    : `Ainda não há bônus suficientes para somar — mas assim que você preencher os outfits, esse painel vira seu “placar de poder total”.`;

  return `
    <aside class="ob-totalCard" aria-label="Soma total de bônus">
      <div class="ob-totalHead">
        <div class="ob-totalTitle">
          <span class="ob-totalCrown">◆</span>
          Bônus Total (coleção completa)
        </div>
        <div class="ob-totalSub">
          ${OUTFITS.length} outfits no sistema
        </div>
      </div>

      <div class="ob-totalGrid">
        <div class="ob-totalStat">
          <div class="ob-totalKey">Skill</div>
          <div class="ob-totalVal is-green">+${formatInt(totals.Skill || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Critical Chance</div>
          <div class="ob-totalVal is-green">+${formatPct(totals["Critical Chance"] || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Critical Damage</div>
          <div class="ob-totalVal is-green">+${formatPct(totals["Critical Damage"] || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Onslaught</div>
          <div class="ob-totalVal is-green">+${formatPct(totals.Onslaught || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Transcendence</div>
          <div class="ob-totalVal is-green">+${formatPct(totals.Transcendence || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Momentum</div>
          <div class="ob-totalVal is-green">+${formatPct(totals.Momentum || 0)}</div>
        </div>

        <div class="ob-totalStat">
          <div class="ob-totalKey">Ruse</div>
          <div class="ob-totalVal is-green">+${formatPct(totals.Ruse || 0)}</div>
        </div>
      </div>

      <p class="ob-totalText">${summaryLine}</p>

      <div class="ob-totalHint">
        <span class="ob-totalHintPill">Dica:</span>
        como os bônus são acumulativos, cada outfit concluído é um “upgrade invisível” que você carrega sem trocar nada no visual.
      </div>
    </aside>
  `;
}

/* ============================
   RENDER NOTES (Mage/Summoner)
============================ */

function splitNotePieces(text) {
  const t = String(text || "").trim();
  if (!t) return [];
  if (/nenhum\s*b[oô]nus/i.test(t)) return [];
  return t.split("•").map((p) => p.trim()).filter(Boolean);
}

function renderNotesBlocks(notes) {
  if (!notes?.length) return "";

  return `
    <div class="ob-notes">
      ${notes
        .map((n) => {
          const who = escapeHtml(n?.who || "");
          const txt = String(n?.text || "").trim();

          if (/nenhum\s*b[oô]nus/i.test(txt)) {
            return `
              <div class="ob-noteBlock">
                <div class="ob-noteHead">
                  <span class="ob-noteTag">${who}</span>
                  <span class="ob-noteEmpty">Nenhum bônus</span>
                </div>
              </div>
            `;
          }

          const pieces = splitNotePieces(txt);
          const listHtml = pieces.length
            ? `<ul class="ob-noteList">
                ${pieces
                  .map((p) => `<li class="ob-noteItem"><span class="ob-bullet">♦</span>${escapeHtml(p)}</li>`)
                  .join("")}
              </ul>`
            : `<div class="ob-noteEmpty">Nenhum bônus</div>`;

          return `
            <div class="ob-noteBlock">
              <div class="ob-noteHead">
                <span class="ob-noteTag">${who}</span>
                <span class="ob-noteCaption">Bônus do gênero</span>
              </div>
              ${listHtml}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

/* ============================
   CARDS / LISTAGEM
   (✅ 1 sprite só, “male”)
============================ */

function renderCard(o) {
  const title = o.link
    ? `<a class="ob-titleLink" href="${escapeHtml(o.link)}" target="_blank" rel="noreferrer">${escapeHtml(o.name)}</a>`
    : `<span class="ob-title">${escapeHtml(o.name)}</span>`;

  const maleImg = toAbsUrl(o.maleImg);

  const bonusesHtml = o.bonuses?.length
    ? `<ul class="ob-bonusList">
        ${o.bonuses
          .map((b) => `<li class="ob-bonusItem"><span class="ob-bullet">♦</span>${escapeHtml(b)}</li>`)
          .join("")}
      </ul>`
    : "";

  const notesHtml = renderNotesBlocks(o.notes);
  const hasAnyBonus = (o.bonuses?.length || 0) > 0 || (o.notes?.length || 0) > 0;

  return `
    <article class="ob-card">
      <header class="ob-cardHead">
        ${title}
      </header>

      <div class="ob-sprites">
        <figure class="ob-sprite">
          <figcaption>Outfit</figcaption>
          <img
            loading="lazy"
            referrerpolicy="no-referrer"
            src="${escapeHtml(maleImg)}"
            alt="${escapeHtml(o.name)}"
          />
        </figure>
      </div>

      <div class="ob-cardBody">
        ${bonusesHtml}
        ${notesHtml}
        ${!hasAnyBonus ? `<p class="ob-empty">Nenhum bônus informado.</p>` : ""}
      </div>
    </article>
  `;
}

export function render(app) {
  ensurePageStyles();

  const totals = computeTotals(OUTFITS);

  app.innerHTML = `
    <main class="ob-page">
      <header class="ob-hero">
        <div class="ob-heroInner">

          <div class="ob-titleBlock">
            <h1>System Bonuses — Outfits</h1>
            <p>
              Aqui os outfits acumulados no personagem viram progresso real:
              bônus como <strong>Critical Chance</strong>, <strong>Skills</strong> e outros
              vão empilhando conforme você completa os addons.
            </p>
            <p class="ob-tip">
              <span class="ob-tipMark">Nota:</span> não precisa estar usando o outfit — basta ter <strong>Addon 1 e 2</strong>.
            </p>
          </div>

          <aside class="ob-side" aria-label="Bônus total">
            ${renderTotalsCard(totals)}
          </aside>

        </div>
      </header>

      <section class="ob-gridWrap" aria-label="Lista de outfits">
        <div class="ob-grid">
          ${OUTFITS.map(renderCard).join("")}
        </div>
      </section>

      <footer class="ob-foot">
        <p>
          Fonte do conteúdo: página de referência do servidor (subtopic <em>outfitbonus</em>).
        </p>
      </footer>
    </main>
  `;
}

export default { render };
