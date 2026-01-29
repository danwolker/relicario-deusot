// assets/js/pages/vip-system.js
import { emit } from "../utils.js";

const REF_ORIGIN = "https://deusot.com/";

const ICONS = {
  tick: "https://www.tibiawiki.com.br/images/2/29/Tick.png",
  cross: "https://www.tibiawiki.com.br/images/4/4e/Cross.png",
};

const MOUNT_GIF = "https://www.tibiawiki.com.br/images/c/c7/Prismatic_Unicorn.gif";

const vipRows = [
  {
    benefit: `Regeneração de <span class="vip-accent vip-red">Vida</span>`,
    free: { icon: "cross", text: "Sem Regeneração" },
    vip: { icon: "tick", text: "<b>+20</b> Vida a cada 2 segundos." },
  },
  {
    benefit: `Regeneração de <span class="vip-accent vip-blue">Mana</span>`,
    free: { icon: "cross", text: "Sem Regeneração" },
    vip: { icon: "tick", text: "<b>+40</b> de Mana a cada 2 segundos." },
  },
  {
    benefit: `Redução na Morte`,
    free: { icon: "cross", text: "Sem Redução" },
    vip: { icon: "tick", text: "<b>-20</b> perda de exp/skills." },
  },
  {
    benefit: `Loot Automático`,
    free: { icon: "cross", text: "Não Automático" },
    vip: { icon: "tick", text: "<b>Automático.</b>" },
  },
  {
    benefit: `Bônus de Experiencia`,
    free: { icon: "cross", text: "Sem Bônus" },
    vip: { icon: "tick", text: "<b>+10%</b> de cada monstro derrotado." },
  },
  {
    benefit: `Montarias`,
    free: { icon: "cross", text: "Nenhuma" },
    vip: { icon: "tick", text: "<b>1x</b> Prismatic Unicorn." },
  },
  {
    benefit: `Chance de Criticos`,
    free: { icon: "cross", text: "Sem Critíco Adicional" },
    vip: { icon: "tick", text: "<b>5%</b> de Critíco Adicional." },
  },
  {
    benefit: `Prioridade na Fila`,
    free: { icon: "cross", text: "Sem Prioridade" },
    vip: { icon: "tick", text: "Tem Prioridade." },
  },
  {
    benefit: `Bless Henricus`,
    free: { icon: "tick", text: "<b>5</b> Blessings" },
    vip: { icon: "tick", text: "<b>7</b> Blessings." },
  },
  {
    benefit: `Online Points`,
    free: { icon: "tick", text: "<b>5</b> Online Points" },
    vip: { icon: "tick", text: "<b>10</b> Online Points." },
  },
];

/**
 * Converte URL relativa para absoluta usando a origem do site referência.
 */
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
  const id = "css-page-vip-system";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";

  // ✅ sem depender de "/" (melhor pra subpasta / GitHub Pages)
  link.href = "assets/css/pages/vip-system.css";

  document.head.appendChild(link);
}

function rowTemplate(r) {
  const freeIcon = ICONS[r.free.icon] ?? ICONS.cross;
  const vipIcon = ICONS[r.vip.icon] ?? ICONS.tick;

  return `
    <div class="vip-row">
      <div class="vip-cell vip-benefit">
        <span class="vip-label">${r.benefit}</span>
      </div>

      <div class="vip-cell vip-col">
        <span class="vip-pill vip-free">
          <img class="vip-icon" alt="Free" src="${freeIcon}">
          <span class="vip-text">${r.free.text}</span>
        </span>
      </div>

      <div class="vip-cell vip-col">
        <span class="vip-pill vip-vip">
          <img class="vip-icon" alt="VIP" src="${vipIcon}">
          <span class="vip-text">${r.vip.text}</span>
        </span>
      </div>
    </div>
  `;
}

export function render(app) {
  ensureCssLoaded();

  const scrollBg = absolutizeAssetUrl("./layouts/tibiacom/images/content/scroll.png", REF_ORIGIN);

  app.innerHTML = `
    <main class="vip-page">
      <header class="vip-hero" style="--vip-scroll-bg: url('${scrollBg}')">
        <div class="vip-hero-inner">
          <div class="vip-title">
            <h1>Informações VIP</h1>
            <p>
              Nosso servidor é único em vários aspectos e a VIP foi adicionada para oferecer algumas vantagens básicas.
              Preferimos isso a encher a loja de itens que quebram o RPG — e, ao mesmo tempo, manter o servidor de pé.
            </p>
          </div>

          <div class="vip-hero-actions">
            <button class="vip-btn" type="button" data-nav="home">Voltar</button>
            <button class="vip-btn vip-btn-ghost" type="button" data-nav="loyalty">Ir para Loyalty</button>
          </div>
        </div>
      </header>

      <section class="vip-section">
        <div class="vip-card vip-warning">
          <div class="vip-warning-badge">Atenção</div>
          <p>
            As vantagens dos jogadores VIP podem mudar com o tempo de acordo com as necessidades do servidor.
          </p>
        </div>
      </section>

      <section class="vip-section">
        <div class="vip-card">
          <div class="vip-card-header">
            <h2>Benefícios</h2>
            <p class="vip-muted">Comparativo entre Free Accounts e VIP Accounts.</p>
          </div>

          <div class="vip-grid">
            <div class="vip-row vip-head">
              <div class="vip-cell vip-benefit"><span>Benefícios</span></div>
              <div class="vip-cell vip-col"><span>Free Accounts</span></div>
              <div class="vip-cell vip-col"><span>VIP Accounts</span></div>
            </div>

            ${vipRows.map(rowTemplate).join("")}
          </div>
        </div>
      </section>

      <section class="vip-section">
        <div class="vip-card">
          <div class="vip-card-header vip-center">
            <h2>Montaria para VIP Accounts</h2>
            <p class="vip-muted">Prismatic Unicorn</p>
          </div>

          <div class="vip-mount">
            <img class="vip-mount-gif" src="${MOUNT_GIF}" alt="Prismatic Unicorn">
          </div>
        </div>
      </section>
    </main>
  `;

  // ✅ evita empilhar listeners toda vez que renderizar
  app.onclick = (e) => {
    const el = e.target.closest("[data-nav]");
    if (!el) return;
    e.preventDefault();
    const key = el.getAttribute("data-nav");
    emit("relicario:nav", { key });
  };
}
