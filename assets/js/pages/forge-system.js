// assets/js/pages/forge-system.js
import { emit } from "../utils.js";

const PAGE_KEY = "forge-system";
const CSS_PATH = "/assets/css/pages/forge-system.css";
const BASE_ORIGIN = "https://deusot.com";

function ensurePageCss(href = CSS_PATH) {
  const id = `page-css:${PAGE_KEY}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const abilities = [
  {
    key: "onslaught",
    name: "Onslaught",
    slot: "Armas",
    icon: "https://www.tibiawiki.com.br/images/4/4a/Onslaught.gif",
    desc:
      "funciona como o Crítico do sistema de Imbuement, podendo adicionar 60% de dano extra ao seu ataque, cumulativo com o crítico.",
  },
  {
    key: "ruse",
    name: "Ruse",
    slot: "Armaduras",
    icon: "https://www.tibiawiki.com.br/images/5/59/Ruse.gif",
    desc: "funciona como Dodge do sistema de Charms, sem restrições de alvo.",
  },
  {
    key: "momentum",
    name: "Momentum",
    slot: "Capacetes",
    icon: "https://www.tibiawiki.com.br/images/2/28/Momentum.gif",
    desc:
      "permite usar 2 magias de ataque consecutivas do grupo secundário em até 2 segundos, sem conjurar magias de cura nesse tempo.",
  },
  {
    key: "transcendence",
    name: "Transcendence",
    slot: "Calças",
    icon: "https://www.tibiawiki.com.br/images/a/a1/Transcendence.gif",
    desc: "ativa o avatar da sua vocação nível 3 por um período menor.",
  },
  {
    key: "amplification",
    name: "Amplification",
    slot: "Botas",
    icon: "https://www.tibiawiki.com.br/images/1/1a/Boots_of_Haste.gif",
    desc:
      "amplifica o efeito dos itens com tiers que você está usando, aumentando a chance de ativação passiva.",
  },
];

const tierRows = [
  { tier: "Tier 1", on: "1,50%", ru: "1,50%", mo: "3,00%", tr: "1,00%", am: "3,50%" },
  { tier: "Tier 2", on: "3,00%", ru: "3,00%", mo: "6,00%", tr: "1,50%", am: "6,40%" },
  { tier: "Tier 3", on: "4,50%", ru: "4,50%", mo: "9,00%", tr: "2,50%", am: "10,10%" },
  { tier: "Tier 4", on: "6,00%", ru: "6,00%", mo: "12,00%", tr: "3,50%", am: "14,60%" },
  { tier: "Tier 5", on: "7,50%", ru: "7,50%", mo: "15,00%", tr: "5,00%", am: "20,90%" },
  { tier: "Tier 6", on: "9,00%", ru: "9,00%", mo: "18,00%", tr: "7,00%", am: "30,00%" },
  { tier: "Tier 7", on: "10,50%", ru: "10,50%", mo: "21,00%", tr: "9,00%", am: "37,90%" },
  { tier: "Tier 8", on: "12,00%", ru: "12,00%", mo: "24,00%", tr: "12,00%", am: "45,60%" },
  { tier: "Tier 9", on: "13,50%", ru: "13,50%", mo: "27,00%", tr: "16,00%", am: "51,10%" },
  { tier: "Tier 10", on: "15,00%", ru: "15,00%", mo: "30,00%", tr: "18,00%", am: "65,40%" },
];

function renderAbilityCard(a) {
  return `
    <article class="fs-ability" data-key="${escapeHtml(a.key)}">
      <div class="fs-ability__icon" aria-hidden="true">
        <img src="${escapeHtml(a.icon)}" alt="" loading="lazy" />
      </div>

      <div class="fs-ability__body">
        <h3 class="fs-ability__title">
          <span class="fs-ability__name">${escapeHtml(a.name)}</span>
          <span class="fs-ability__dash">—</span>
          <span class="fs-ability__slot">para ${escapeHtml(a.slot)}</span>
        </h3>
        <p class="fs-ability__desc">${escapeHtml(a.desc)}</p>
      </div>
    </article>
  `;
}

export function render(app) {
  ensurePageCss();

  const separator = `${BASE_ORIGIN}/images/separador.png`;
  const refUrl = `${BASE_ORIGIN}/?subtopic=forgesystem`;

  app.innerHTML = `
    <main class="fs-page">
      <!-- Cabeçalho como na referência: título central + separador -->
      <header class="fs-hero" aria-label="Forge System">
        <div class="fs-hero__inner">
          <h1 class="fs-title">Forge System</h1>
          <img class="fs-sep" src="${escapeHtml(separator)}" alt="" loading="lazy" />
          <div class="fs-hero__actions" role="group" aria-label="Ações">

          </div>
        </div>
      </header>

      <!-- “Headline” (equivalente ao caption azul da referência, mas no seu padrão) -->
      <section class="fs-section" aria-label="Informações necessárias">
        <div class="fs-headline">
         
          <div class="fs-headline__text">Algumas informações necessárias para Forge System</div>
        </div>

        <div class="fs-card">
          <ul class="fs-bullets">
            <li>Essas 5 habilidades citadas acima podem ser usadas em apenas 5 categorias de item: <strong>Armas</strong>, <strong>Armaduras</strong>, <strong>Capacetes</strong>, <strong>Calças</strong> e <strong>Botas</strong>.</li>
          </ul>

          <div class="fs-abilities" aria-label="Habilidades do Forge System">
            ${abilities.map(renderAbilityCard).join("")}
          </div>

          <ul class="fs-bullets fs-bullets--spaced">
            <li>O efeito de cada habilidade é o mesmo em todos os seus níveis. A chance de ativação aumenta conforme o <strong>tier</strong> do item:</li>
          </ul>

          <div class="fs-tablewrap" aria-label="Tabela de tiers">
            <table class="fs-table">
              <thead>
                <tr>
                  <th>Tier / % de Ativação</th>
                  <th>Onslaught (Armas)</th>
                  <th>Ruse (Armaduras)</th>
                  <th>Momentum (Capacetes)</th>
                  <th>Transcendence (Calças)</th>
                  <th>Amplification (Botas)</th>
                </tr>
              </thead>
              <tbody>
                ${tierRows
                  .map(
                    (r) => `
                    <tr>
                      <td><strong>${escapeHtml(r.tier)}</strong></td>
                      <td>${escapeHtml(r.on)}</td>
                      <td>${escapeHtml(r.ru)}</td>
                      <td>${escapeHtml(r.mo)}</td>
                      <td>${escapeHtml(r.tr)}</td>
                      <td>${escapeHtml(r.am)}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="fs-foot">
            <div class="fs-foot__note">
            </div>
            <div class="fs-foot__actions">
            </div>
          </div>
        </div>
      </section>
    </main>
  `;

  app.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      if (action === "back") emit("relicario:nav", { key: "home" });
      if (action === "open-ref") window.open(refUrl, "_blank", "noopener,noreferrer");
    },
    { passive: true }
  );
}
