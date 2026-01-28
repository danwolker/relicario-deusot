// assets/js/pages/upgrade.js
import { normalize, money, escapeHtml, on } from "../utils.js";
import {
  AppState,
  setData,
  setActiveLevel,
  setActiveSearch,
  clearSearch,
  toggleDropsExpanded,
  isDropsExpanded,
} from "../state.js";
import {
  fetchItemsJson,
  buildFromJson,
  calcCostsFromJson,
  getDropKey,
  errorPanelHtml,
} from "../api.js";
import { renderCosts } from "../components/costs.js";

/**
 * IMPORTANTE:
 * - Este módulo é cacheado pelo browser (ESM).
 * - Então NÃO podemos capturar DOM no topo do arquivo.
 * - Precisamos "montar" pegando os elementos sempre que o Relicário entrar.
 */

let els = null;
let headerListenersBound = false;
let dataLoaded = false;

function getEls() {
  return {
    grid: document.querySelector("#levelsGrid"),
    levelsMeta: document.querySelector("#levelsMeta"),
    title: document.querySelector("#detailsTitle"),
    meta: document.querySelector("#detailsMeta"),
    body: document.querySelector("#detailsBody"),
    brandSubtitle: document.querySelector("#brandSubtitle"),
  };
}

// ---------- lógica de busca por nível ----------
function levelHasMatch(levelObj, q) {
  if (!q) return false;
  const nq = normalize(q);
  return (levelObj?.items || []).some((it) => normalize(it).includes(nq));
}

function countMatches(levelObj, q) {
  if (!q) return 0;
  const nq = normalize(q);
  return (levelObj?.items || []).filter((it) => normalize(it).includes(nq)).length;
}

// ---------- render cards ----------
function renderCards() {
  if (!els?.grid) return;

  els.grid.innerHTML = "";

  AppState.LEVELS.forEach((lvl) => {
    const has = levelHasMatch(lvl, AppState.activeSearch);
    const hits = countMatches(lvl, AppState.activeSearch);

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.level = String(lvl.level);

    if (AppState.activeLevel === lvl.level) card.classList.add("active");

    card.innerHTML = `
      <div class="lvl">Nível ${escapeHtml(lvl.level)}</div>
      <div class="sub">${(lvl.items || []).length} itens • ${AppState.QTY_PER_ITEM} un. cada</div>
      ${AppState.activeSearch ? `<div class="badge">${hits ? `${hits} match` : "0 match"}</div>` : ""}
      ${has ? `<div class="here">aqui</div>` : ""}
    `;

    if (AppState.activeSearch && has) {
      card.style.borderColor = "rgba(43, 228, 198, 0.35)";
    }

    card.addEventListener("click", () => {
      setActiveLevel(lvl.level);
      highlightActive();
      renderDetails(AppState.activeLevel);
    });

    els.grid.appendChild(card);
  });

  if (els.levelsMeta) {
    els.levelsMeta.textContent = `${AppState.LEVELS.length} níveis`;
  }
}

function highlightActive() {
  document.querySelectorAll(".card").forEach((c) => c.classList.remove("active"));
  const el = document.querySelector(`.card[data-level="${AppState.activeLevel}"]`);
  if (el) el.classList.add("active");
}

// ---------- render detalhes ----------
function renderDetails(levelNumber) {
  if (!els?.title || !els?.meta || !els?.body) return;

  const lvlSimple = AppState.LEVELS.find((x) => x.level === levelNumber);
  const lvlFull = AppState.LEVELS_FULL.find((x) => x.level === levelNumber);
  if (!lvlSimple || !lvlFull) return;

  const filteredFull = AppState.activeSearch
    ? (lvlFull.items || []).filter((it) =>
        normalize(it._displayName).includes(normalize(AppState.activeSearch))
      )
    : (lvlFull.items || []);

  els.title.textContent = `Nível ${lvlSimple.level}`;

  els.meta.textContent = AppState.activeSearch
    ? `Mostrando ${filteredFull.length} de ${(lvlFull.items || []).length} itens (filtro ativo)`
    : `${(lvlFull.items || []).length} itens`;

  const sumLevel = filteredFull.reduce((acc, it) => {
    const price = it._price ?? 0;
    const qty = it._qty ?? AppState.QTY_PER_ITEM;
    return acc + price * qty;
  }, 0);

  els.body.innerHTML = `
    <div class="items">
      ${filteredFull
        .map((it) => {
          const name = it._displayName;
          const qty = it._qty ?? AppState.QTY_PER_ITEM;
          const price = it._price; // pode ser null
          const total = (price ?? 0) * qty;

          const priceText =
            price === null
              ? `<b>preço:</b> <span style="opacity:.8">não definido</span>`
              : `<b>preço:</b> ${money(price)} gp`;

          const totalText =
            price === null
              ? `<b>total:</b> <span style="opacity:.8">—</span>`
              : `<b>total:</b> ${money(total)} gp`;

          const wikiBtn = it._wikiUrl
            ? `<a class="wiki" href="${escapeHtml(
                it._wikiUrl
              )}" target="_blank" rel="noopener noreferrer">Wiki</a>`
            : "";

          const drops = Array.isArray(it._droppedBy) ? it._droppedBy : [];
          const hasDrops = drops.length > 0;

          const key = getDropKey(levelNumber, it);
          const expanded = isDropsExpanded(key);

          const dropsBlock = (() => {
            if (!hasDrops) {
              return `
                <div class="drops">
                  <div class="drops-head">
                    <div><b>Dropa de:</b> <span style="color: rgba(168,179,199,.92);">não informado</span></div>
                    <div class="count">0</div>
                  </div>
                </div>
              `;
            }

            const previewCount = 10;
            const list = expanded ? drops : drops.slice(0, previewCount);
            const hidden = Math.max(0, drops.length - list.length);

            const toggle =
              drops.length > previewCount
                ? `<button class="dropsToggle" type="button" data-action="toggleDrops" data-key="${escapeHtml(
                    key
                  )}">
                    ${expanded ? "Recolher" : "Ver tudo"}${
                    hidden && !expanded ? ` (+${hidden})` : ""
                  }
                  </button>`
                : "";

            return `
              <div class="drops">
                <div class="drops-head">
                  <div><b>Dropa de:</b></div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    ${toggle}
                    <div class="count">${drops.length}</div>
                  </div>
                </div>

                <div class="chipsWrap">
                  ${list
                    .map(
                      (m) => `
                    <span class="dropchip" title="${escapeHtml(m)}"><span>${escapeHtml(
                        m
                      )}</span></span>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `;
          })();

          return `
            <div class="item">
              <div class="nameRow">
                <div class="name">${escapeHtml(name)}</div>
                ${wikiBtn}
              </div>
              <div class="qty">${qty} un.</div>

              <div class="subline">${priceText} • ${totalText}</div>

              ${dropsBlock}
            </div>
          `;
        })
        .join("")}
    </div>

    <div class="note">
      ${
        AppState.activeSearch
          ? `Filtro atual: <b>${escapeHtml(
              AppState.activeSearch
            )}</b>. Cards com o item exibem o marcador <b>“aqui”</b>.`
          : `Use a busca para localizar rapidamente em quais níveis um item aparece.`
      }
      <br/>
      <span style="opacity:.9">Total deste nível (considerando itens listados acima): <b>${money(
        sumLevel
      )} gp</b>.</span>
    </div>
  `;

  // delegation: toggle drops
  els.body.querySelectorAll('[data-action="toggleDrops"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const k = e.currentTarget.getAttribute("data-key");
      if (!k) return;
      toggleDropsExpanded(k);
      renderDetails(levelNumber);
    });
  });
}

function bindHeaderListenersOnce() {
  if (headerListenersBound) return;
  headerListenersBound = true;

  // Eventos vindos do header (header.js emite)
  on("relicario:search", (e) => {
    setActiveSearch(e?.detail?.value ?? "");
    renderCards();
    renderDetails(AppState.activeLevel);
  });

  on("relicario:clear", () => {
    clearSearch();
    renderCards();
    renderDetails(AppState.activeLevel);
  });

  // Se você quiser: aqui pode reagir ao menu, mas o router já cuida disso.
  on("relicario:nav", (e) => {
    const key = e?.detail?.key || "";
    console.log("[nav]", key);
  });
}

async function loadDataOnce() {
  if (dataLoaded) return;

  const json = await fetchItemsJson(AppState.JSON_URL);
  const built = buildFromJson(json);
  const costs = calcCostsFromJson(built.levelsFull, built.qtyPerItem);

  setData({
    levels: built.levels,
    levelsFull: built.levelsFull,
    qtyPerItem: built.qtyPerItem,
    costs,
  });

  // subtitle do header (pode demorar por causa do componente)
  const trySetSubtitle = () => {
    const el = document.getElementById("brandSubtitle");
    if (el) el.textContent = built.subtitle;
    return !!el;
  };

  if (!trySetSubtitle()) {
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (trySetSubtitle() || tries > 20) clearInterval(t);
    }, 60);
  }

  dataLoaded = true;
}

function renderAll() {
  // (re)pega o DOM atual
  els = getEls();

  // se a view ainda não tem os elementos, não quebra
  if (!els?.grid || !els?.body) return;

  renderCosts(AppState.COSTS);
  renderCards();
  highlightActive();

  // se não tiver level ativo, pega o primeiro
  if (!AppState.activeLevel && AppState.LEVELS?.length) {
    setActiveLevel(AppState.LEVELS[0].level);
  }

  renderDetails(AppState.activeLevel);
}

/**
 * FUNÇÃO PÚBLICA: chamada SEMPRE que a página Relicário abrir.
 */
export async function mountUpgrade() {
  try {
    bindHeaderListenersOnce();
    await loadDataOnce();
    renderAll();
  } catch (err) {
    console.error(err);

    // tenta escrever erro na UI atual (se existir)
    els = getEls();

    const sub = document.getElementById("brandSubtitle");
    if (sub) sub.textContent = "Erro ao carregar itens.json";

    const chips = document.getElementById("costChips");
    if (chips) {
      chips.innerHTML = `
        <div class="chip">
          <span class="tag">erro</span>
          <b>JSON não carregou</b>
          <span>— verifique servidor local e caminho</span>
        </div>
      `;
    }

    if (els?.title) els.title.textContent = "Erro ao carregar itens.json";
    if (els?.meta) els.meta.textContent = "";
    if (els?.body) {
      els.body.innerHTML = errorPanelHtml(AppState.JSON_URL, String(err?.message || err));
    }
  }
}
