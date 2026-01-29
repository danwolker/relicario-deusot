// assets/js/pages/loyalty.js
import { emit } from "../utils.js";

const REF_ORIGIN = "https://deusot.com/";

const ranks = [
  { name: "Scout of DeusOT", points: 0, bonus: 0 },
  { name: "Sentinel of DeusOT", points: 200, bonus: 1 },
  { name: "Steward of DeusOT", points: 400, bonus: 2 },
  { name: "Warden of DeusOT", points: 600, bonus: 3 },
  { name: "Squire of DeusOT", points: 800, bonus: 4 },
  { name: "Warrior of DeusOT", points: 1000, bonus: 5 },
  { name: "Keeper of DeusOT", points: 1200, bonus: 6 },
  { name: "Guardian of DeusOT", points: 1400, bonus: 7 },
  { name: "Sage of DeusOT", points: 1600, bonus: 8 },
  { name: "Savant of DeusOT", points: 1800, bonus: 9 },
  { name: "Enlightened of DeusOT", points: 2000, bonus: 10 },
];

const vocationRules = [
  {
    tag: "Druids",
    tone: "druid",
    text: "ganham o bônus skill de magic level.",
  },
  {
    tag: "Sorcerers",
    tone: "sorc",
    text: "ganham o bônus skill de magic level.",
  },
  {
    tag: "Knights",
    tone: "knight",
    text: "ganham o bônus skills de axe, sword, club e shielding.",
  },
  {
    tag: "Paladins",
    tone: "pala",
    text: "ganham o bônus skills de distance e shielding.",
  },
];

function absolutizeAssetUrl(inputUrl, baseOrigin = REF_ORIGIN) {
  if (!inputUrl) return inputUrl;

  if (/^(https?:)?\/\//i.test(inputUrl) || /^(data:|blob:)/i.test(inputUrl)) {
    return inputUrl.startsWith("//") ? `https:${inputUrl}` : inputUrl;
  }

  if (inputUrl.startsWith("#") || inputUrl.toLowerCase().startsWith("javascript:")) {
    return inputUrl;
  }

  try {
    return new URL(inputUrl, baseOrigin).toString();
  } catch {
    return inputUrl;
  }
}

function ensureCssLoaded() {
  const id = "css-page-loyalty";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "assets/css/pages/loyalty.css";
  document.head.appendChild(link);
}

function rankRow(r, idx) {
  const bonus = r.bonus === 0 ? `<span class="loy-bonus loy-zero">0</span>` : `<span class="loy-bonus loy-plus">+${r.bonus}</span>`;
  const zebra = idx % 2 === 0 ? "loy-zebra-a" : "loy-zebra-b";

  return `
    <div class="loy-row ${zebra}">
      <div class="loy-cell loy-rank">
        <span class="loy-dot"></span>
        <span>${r.name}</span>
      </div>
      <div class="loy-cell loy-points">${r.points}</div>
      <div class="loy-cell loy-skill">${bonus}</div>
    </div>
  `;
}

function vocationCard(v) {
  return `
    <div class="loy-voc-card loy-${v.tone}">
      <div class="loy-voc-title">
        <span class="loy-voc-tag">[${v.tag}]</span>
      </div>
      <p class="loy-voc-text">${v.text}</p>
    </div>
  `;
}

export function render(app) {
  ensureCssLoaded();

  const scrollPng = absolutizeAssetUrl("./layouts/tibiacom/images/content/scroll.png", REF_ORIGIN);
  const scrollGif = absolutizeAssetUrl("./layouts/tibiacom/images/content/scroll.gif", REF_ORIGIN);
  const backToTop = absolutizeAssetUrl("./layouts/tibiacom/images/content/back-to-top.png", REF_ORIGIN);

  app.innerHTML = `
    <main class="loy-page" id="loy-top">
      <header class="loy-hero" style="--loy-scroll-a: url('${scrollPng}'); --loy-scroll-b: url('${scrollGif}')">
        <div class="loy-hero-inner">
          <div class="loy-title">
            <h1>Loyalty</h1>
            <p>
              Um bônus atrelado à sua <b>conta</b>. Compra, acumula, sobe de rank — e todos os personagens da conta
              recebem o bônus de skills conforme o seu nível de Loyalty.
            </p>
          </div>

          <div class="loy-actions">
            <button class="loy-btn" type="button" data-nav="vip-system">Ver VIP</button>
            <button class="loy-btn loy-btn-ghost" type="button" data-nav="home">Voltar</button>
          </div>
        </div>
      </header>

      <section class="loy-section">
        <div class="loy-card">
          <div class="loy-card-head">
            <h2>Informações</h2>
            <p class="loy-muted">Regras rápidas pra você não ficar no “achismo”.</p>
          </div>

          <div class="loy-bullets">
            <div class="loy-bullet">
              <span class="loy-badge">Conta</span>
              <p>Esse <b>bônus</b> está associado à sua <b>conta</b>, portanto, não pode ser transferido.</p>
            </div>

            <div class="loy-bullet">
              <span class="loy-badge loy-badge-green">Shop</span>
              <p>
                Caso você compre pontos no Shop, você recebe <b>Loyalty Points</b> referente ao valor da compra.
                <button class="loy-link" type="button" data-nav="shop">Abrir Shop</button>
              </p>
            </div>

            <div class="loy-bullet">
              <span class="loy-badge">Todos</span>
              <p>
                <u>Todos</u> os personagens da conta recebem o bônus de skills referente ao Ranking de Loyalty.
              </p>
            </div>

            <div class="loy-bullet">
              <span class="loy-badge loy-badge-blue">Look</span>
              <p>Para saber seu nível de Loyalty basta dar <i>look</i> em seu personagem.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="loy-section">
        <div class="loy-card">
          <div class="loy-card-head">
            <h2>Ranking de Loyalty</h2>
            <p class="loy-muted">Ranks, pontos necessários e bônus adicional de skill.</p>
          </div>

          <div class="loy-table">
            <div class="loy-row loy-head">
              <div class="loy-cell">Loyalty Ranks</div>
              <div class="loy-cell loy-center">Loyalty Points</div>
              <div class="loy-cell loy-center">Skill Adicional</div>
            </div>

            ${ranks.map(rankRow).join("")}
          </div>
        </div>
      </section>

      <section class="loy-section">
        <div class="loy-card">
          <div class="loy-card-head">
            <h2>Como o bônus aplica por vocação</h2>
            <p class="loy-muted">O mesmo rank, efeitos diferentes dependendo do seu caminho.</p>
          </div>

          <div class="loy-voc-grid">
            ${vocationRules.map(vocationCard).join("")}
          </div>
        </div>
      </section>

      <section class="loy-section">
        <div class="loy-card loy-formula">
          <div class="loy-card-head">
            <h2>Fórmula</h2>
            <p class="loy-muted">Simples e direta: investimento → pontos → rank → skills.</p>
          </div>

          <div class="loy-formula-body">
            <p>
              Os pontos de loyalty são referentes a pontos comprados em sua <b>CONTA</b>.
              A cada <b>R$1,00</b> investido, você recebe <b>1 Loyalty Point</b>.
            </p>

            <div class="loy-highlight">
              <div class="loy-highlight-line">
                <span class="loy-k">Máximo por conta</span>
                <span class="loy-v">2000 Loyalty Points</span>
              </div>
              <div class="loy-highlight-line">
                <span class="loy-k">Bônus máximo</span>
                <span class="loy-v loy-plus">+10 skills</span>
              </div>
            </div>

            <div class="loy-backtop">
              <button class="loy-backbtn" type="button" data-scrolltop="1">
                <img alt="Back to top" src="${backToTop}">
                <span>Voltar ao topo</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;

  app.onclick = (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) {
      e.preventDefault();
      emit("relicario:nav", { key: nav.getAttribute("data-nav") });
      return;
    }

    const top = e.target.closest("[data-scrolltop]");
    if (top) {
      e.preventDefault();
      const el = document.getElementById("loy-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}
