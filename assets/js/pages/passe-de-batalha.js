// assets/js/pages/passe-de-batalha.js
import { emit } from "../utils.js";

const PAGE_KEY = "passe-de-batalha";
const CSS_PATH = "/assets/css/pages/passe-de-batalha.css";
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

export function render(app) {
  ensurePageCss();

  const imageUrl = `${BASE_ORIGIN}/images/passee.png`;

  app.innerHTML = `
    <main class="pb-page">
      <header class="pb-hero">
        <div class="pb-hero__top">
          <div class="pb-hero__titles">
            <p class="pb-kicker">Guia • DeusOT</p>
            <h1 class="pb-title">Passe de Batalha</h1>
            <p class="pb-subtitle">
              Duas trilhas de recompensas — <strong>Grátis</strong> e <strong>Premium</strong> — que avançam diariamente.
              Complete as <em>missões do dia</em> e libere o resgate.
            </p>
          </div>

          <div class="pb-hero__actions" role="group" aria-label="Ações">
            <button class="pb-btn pb-btn--ghost" type="button" data-action="back">Voltar</button>
            <button class="pb-btn" type="button" data-action="open-ref">Ver referência</button>
          </div>
        </div>

        <figure class="pb-figure" aria-label="Imagem de referência da interface">
          <div class="pb-figure__frame">
            <img class="pb-figure__img" src="${escapeHtml(imageUrl)}" alt="Interface do Passe de Batalha (referência)" loading="lazy" />
          </div>
          <figcaption class="pb-figure__caption">
            Imagem carregada diretamente de ${escapeHtml(BASE_ORIGIN)}.
          </figcaption>
        </figure>
      </header>

      <section class="pb-grid" aria-label="Explicação da interface">
        <article class="pb-card">
          <h2 class="pb-card__title">Visão Geral</h2>
          <p class="pb-card__text">
            O <strong>Passe de Batalha</strong> oferece uma trilha de recompensas que progride diariamente.
            Existem duas camadas de prêmios: <strong>Grátis</strong> e <strong>Premium</strong>.
            Ao cumprir as <em>Missões do dia</em>, você libera o resgate das recompensas daquele dia.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">📌 Interface do Passe</h3>
          <p class="pb-card__text">
            A trilha progride por <strong>dias</strong>. Você alterna entre as camadas pelo topo (“Grátis”/“Premium”),
            e a lista de recompensas do dia aparece ao lado, junto dos botões de resgate.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Abas “Grátis” e “Premium”</h3>
          <p class="pb-card__text">
            Alterna a visualização entre prêmios gratuitos e prêmios premium. A aba selecionada define quais recompensas
            aparecem para o dia atual.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Painel lateral (Tier / Progresso)</h3>
          <p class="pb-card__text">
            Exibe o tier atual (ex.: <em>Ouro I</em>), o total de recompensas obtidas (ex.: 1/7) e o tempo restante da temporada.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Lista de recompensas por dia</h3>
          <p class="pb-card__text">
            Para o dia selecionado, mostra itens/benefícios disponíveis em cada camada.
          </p>
          <ul class="pb-list">
            <li><strong>Dia X – Premium</strong>: recompensas do passe pago</li>
            <li><strong>Dia X – Grátis</strong>: recompensas para todos</li>
          </ul>
          <p class="pb-card__text">
            Quando as condições do dia são atendidas, o resgate é habilitado.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Seletor de Dia (setas)</h3>
          <p class="pb-card__text">
            Botões para avançar/retroceder o dia da temporada e visualizar as recompensas referentes a cada um.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Missões do Dia</h3>
          <p class="pb-card__text">
            Lista os objetivos para liberar o resgate do dia. A barra indica porcentagem de conclusão; ao completar, o resgate é liberado.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Resgatar Premium</h3>
          <p class="pb-card__text">
            Resgata a camada Premium do dia selecionado. Pode ficar desabilitado se as missões não foram concluídas ou se o passe não está ativo.
          </p>
        </article>

        <article class="pb-card">
          <h3 class="pb-card__title">Resgatar Free</h3>
          <p class="pb-card__text">
            Resgata a camada Grátis do dia selecionado. Fica disponível após concluir as missões do dia.
          </p>
        </article>
      </section>

      <section class="pb-two" aria-label="Como funciona e observações">
        <article class="pb-card pb-card--wide">
          <h2 class="pb-card__title">⚙️ Como funciona na prática</h2>
          <ol class="pb-steps">
            <li>Escolha o <strong>Dia</strong> usando as setas.</li>
            <li>Conclua as <strong>Missões do Dia</strong> (progresso chega a 100%).</li>
            <li>Resgate as recompensas: <strong>Grátis</strong> e, se tiver o passe, também <strong>Premium</strong>.</li>
            <li>Acompanhe seu avanço no painel lateral (tier, recompensas obtidas e dias restantes).</li>
          </ol>
        </article>

        <article class="pb-card pb-card--wide">
          <h2 class="pb-card__title">📎 Observações importantes</h2>
          <ul class="pb-list">
            <li>Recompensas <strong>Premium</strong> exigem passe ativo; as <strong>Grátis</strong> estão disponíveis a todos.</li>
            <li>O desbloqueio do resgate é por dia e depende do cumprimento das missões.</li>
            <li>O tempo restante indica quando a temporada se encerra; após isso, recompensas não recolhidas podem expirar conforme regras do servidor.</li>
          </ul>
        </article>
      </section>
    </main>
  `;

  // Delegação de clique (sem <a href="pagina.html">)
  app.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");
      if (action === "back") emit("relicario:nav", { key: "home" });

      if (action === "open-ref") {
        window.open("https://deusot.com/?subtopic=passedebatalha", "_blank", "noopener,noreferrer");
      }
    },
    { passive: true }
  );
}
