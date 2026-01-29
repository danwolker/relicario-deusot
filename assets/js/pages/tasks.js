// assets/js/pages/tasks.js
import { emit } from "../utils.js";

const PAGE_KEY = "tasks";
const BASE_ORIGIN = "https://deusot.com";

/**
 * Carrega o CSS da página usando caminho relativo ao próprio módulo.
 * Isso remove o problema clássico do GitHub Pages tentar buscar em:
 *   https://danwolker.github.io/assets/...
 * em vez de:
 *   https://danwolker.github.io/relicario-deusot/assets/...
 */
function ensurePageCss() {
  const id = `page-css:${PAGE_KEY}`;
  if (document.getElementById(id)) return;

  // ✅ O JS está em /assets/js/pages/tasks.js
  // então "../../css/pages/tasks.css" resolve certinho para /assets/css/pages/tasks.css
  const href = new URL(`../../css/pages/${PAGE_KEY}.css`, import.meta.url).href;

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

/**
 * Utilitário opcional para colagens futuras:
 * converte src/href relativos em URL absoluta do domínio de referência.
 */
export function normalizeRelativeUrls(rawHtml, baseOrigin = BASE_ORIGIN) {
  if (!rawHtml || typeof rawHtml !== "string") return "";

  const isSkippable = (v) => {
    if (!v) return true;
    const s = String(v).trim();
    return (
      s.startsWith("#") ||
      s.startsWith("data:") ||
      s.startsWith("mailto:") ||
      s.startsWith("tel:") ||
      s.startsWith("javascript:") ||
      s.startsWith("http://") ||
      s.startsWith("https://") ||
      s.startsWith("//")
    );
  };

  const toAbs = (v) => {
    const s = String(v || "").trim();
    if (isSkippable(s)) return s;

    const cleaned = s.replace(/^\.\//, "");
    if (cleaned.startsWith("/")) return `${baseOrigin}${cleaned}`;
    return `${baseOrigin}/${cleaned}`;
  };

  const doc = new DOMParser().parseFromString(rawHtml, "text/html");

  doc.querySelectorAll("img[src], script[src], source[src]").forEach((el) => {
    const src = el.getAttribute("src");
    if (!isSkippable(src)) el.setAttribute("src", toAbs(src));
  });

  doc.querySelectorAll("a[href], link[href]").forEach((el) => {
    const href = el.getAttribute("href");
    if (!isSkippable(href)) el.setAttribute("href", toAbs(href));
  });

  return doc.body.innerHTML || "";
}

export function render(app) {
  ensurePageCss();

  const imgOverview = `${BASE_ORIGIN}/images/tasks.png`;
  const imgDetails = `${BASE_ORIGIN}/images/tasks1.png`;
  const downloadUrl = `${BASE_ORIGIN}/?subtopic=download`;

  app.innerHTML = `
    <main class="tk-page">
      <header class="tk-hero">
        <div class="tk-hero__row">
          <div class="tk-hero__text">
            <p class="tk-kicker">Guia • DeusOT</p>
            <h1 class="tk-title">Tasks</h1>
            <p class="tk-subtitle">
              Escolha sua task preferida, conclua um número específico de criaturas e receba recompensas exclusivas.
              Abaixo você encontra a explicação detalhada de cada parte da interface — na mesma ordem em que ela aparece in-game.
            </p>
          </div>

          <div class="tk-hero__actions" role="group" aria-label="Ações">
            <!-- se quiser botões depois, coloque aqui -->
          </div>
        </div>
      </header>

      <!-- 1) VISÃO GERAL -->
      <section class="tk-section" aria-label="Visão Geral">
        <div class="tk-card tk-card--lead">
          <h2 class="tk-h2">Visão Geral</h2>
          <p class="tk-text">
            O sistema de <strong>Tasks</strong> permite que jogadores escolham a task preferida para concluir um número
            específico de criaturas e receber recompensas exclusivas. Ele foi feito para incentivar progressão,
            variedade de hunts e aquela sensação de “só mais uma task” antes de sair do jogo.
          </p>
        </div>
      </section>

      <!-- 2-3) JANELA INICIAL (IMAGEM + EXPLICAÇÃO) -->
      <section class="tk-section" aria-label="Janela Inicial das Tasks">
        <div class="tk-section__head">
          <h2 class="tk-h2">📌 Janela Inicial das Tasks</h2>
          <p class="tk-muted">
            Categorias, filtros, dificuldade, lista e busca — tudo começa aqui.
          </p>
        </div>

        <div class="tk-split">
          <figure class="tk-figure">
            <div class="tk-frame">
              <img
                src="${escapeHtml(imgOverview)}"
                alt="Janela inicial das Tasks (referência)"
                loading="lazy"
                referrerpolicy="no-referrer"
              />
            </div>
            <figcaption>
              Janela inicial das tasks: categorias, filtros, busca e listagem.
            </figcaption>
          </figure>

          <article class="tk-card tk-card--stack">
            <ul class="tk-bullets">
              <li>
                <strong>Área de Categoria (Novato, Destemido, Veterano, Gladiador e Soberano)</strong>
                <span> — Indica a quantidade de tasks disponíveis. À medida que você conclui tasks, seu nível no sistema sobe e libera novas.</span>
              </li>

              <li>
                <strong>Informação dos níveis</strong>
                <span> — Para avançar para o próximo nível, é necessário concluir todas as tasks da categoria atual.</span>
              </li>

              <li>
                <strong>Filtros (Finalizados, Bloqueados, Disponíveis, Ativos)</strong>
                <span> — Permitem selecionar quais tasks aparecem na lista (ex.: mostrar apenas as disponíveis).</span>
              </li>

              <li>
                <strong>Dificuldades (0 a 5 Estrelas)</strong>
                <span> — Define o nível de desafio. Quanto mais estrelas, mais difícil (e geralmente mais recompensador).</span>
              </li>

              <li>
                <strong>Lista de Tasks</strong>
                <span> — Cada “quadrado” exibe:</span>
                <ul class="tk-subbullets">
                  <li>Imagem ilustrativa do monstro da task</li>
                  <li>Nome da criatura (ex.: Goblin, Troll, Minotaur…)</li>
                  <li>Quantidade necessária de abates (Kills)</li>
                  <li>Status da task (Disponível, Em andamento, Concluída)</li>
                </ul>
              </li>

              <li>
                <strong>Campo de Busca</strong>
                <span> — Permite procurar uma task pelo nome.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- 4-5) INFORMAÇÕES DE UMA TASK (IMAGEM + EXPLICAÇÃO) -->
      <section class="tk-section" aria-label="Informações de uma Task">
        <div class="tk-section__head">
          <h2 class="tk-h2">📌 Informações de uma Task</h2>
          <p class="tk-muted">
            Quando você entra em uma task específica, esse painel explica “onde”, “o quê” e “o que você ganha”.
          </p>
        </div>

        <div class="tk-split tk-split--reverse">
          <figure class="tk-figure">
            <div class="tk-frame">
              <img
                src="${escapeHtml(imgDetails)}"
                alt="Detalhes de uma Task (referência)"
                loading="lazy"
                referrerpolicy="no-referrer"
              />
            </div>
            <figcaption>
              Detalhes de uma task: hunts recomendadas, recompensas, monstros e iniciar.
            </figcaption>
          </figure>

          <article class="tk-card tk-card--stack">
            <ul class="tk-bullets">
              <li>
                <strong>Hunts Recomendadas</strong>
                <span> — Lista locais sugeridos para caçar a criatura (ex.: Yalahar Foreigner Quarter, Beregar Mines, Fields of Glory…).</span>
              </li>

              <li>
                <strong>Informações de Recompensa</strong>
                <span> — Mostra os prêmios ao concluir a task, como experiência (XP) e itens.</span>
              </li>

              <li>
                <strong>Monstros para Matar</strong>
                <span> — Lista os monstros que contam para a task atual (ex.: apenas <u>Goblin</u> conta na task de Goblins).</span>
              </li>

              <li>
                <strong>Botão Iniciar</strong>
                <span> — Começa oficialmente a task e ativa a contagem de criaturas mortas.</span>
              </li>

              <li class="tk-highlight">
                <strong>Regra de repetição</strong>
                <span> — Quem já concluiu uma vez a task consegue repetir apenas <strong>1 vez</strong>, mas com recompensas diferentes.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- 6) CONCLUSÃO + CTA -->
      <section class="tk-section" aria-label="Conclusão">
        <div class="tk-card tk-card--wide">
          <h2 class="tk-h2">🔎 Conclusão</h2>
          <p class="tk-text">
            O sistema de <strong>Tasks</strong> foi criado para motivar exploração e variedade: você escolhe objetivos,
            alterna dificuldades, filtra o que está disponível e progride por categorias. No fim, a interface vira um “mapa”
            do seu progresso — o tipo de coisa que transforma grind em meta.
          </p>

          <div class="tk-cta">
            <div class="tk-cta__text">
              <strong>Para mais informações</strong>, faça download do jogo e veja tudo in-game.
            </div>

            <div class="tk-cta__actions">
              <button class="tk-btn" type="button" data-action="open-download">Abrir página de download</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;

  // Ações
  app.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest("[data-action]");
      if (!el) return;

      const action = el.getAttribute("data-action");

      if (action === "back") emit("relicario:nav", { key: "home" });

      if (action === "open-ref") {
        window.open("https://deusot.com/?subtopic=tasks", "_blank", "noopener,noreferrer");
      }

      if (action === "open-download") {
        window.open(downloadUrl, "_blank", "noopener,noreferrer");
      }
    },
    { passive: true }
  );
}

export default { render };
