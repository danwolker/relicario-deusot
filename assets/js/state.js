// assets/js/state.js
// Estado global simples (Zustand feelings, sem Zustand).
// A página (upgrade.js) e os componentes conversam por eventos globais.

export const AppState = {
  // caminho do JSON (pode sobrescrever em upgrade.js se quiser)
  JSON_URL: "./itens.json",

  // dados
  LEVELS: [],        // simplificado (para cards + busca)
  LEVELS_FULL: [],   // completo (com price/qty/wiki/droppedBy)
  QTY_PER_ITEM: 25,
  COSTS: { acumulados: [], intervalos: [] },

  // UI
  activeLevel: 1,
  activeSearch: "",

  // controle de expansão dos drops (por item)
  dropsExpanded: new Set(), // key: `${level}:${wikiSlug||name}`
};

// Helpers de mutação (pra manter padrão e evitar bagunça no resto do app)
export function setActiveLevel(levelNumber) {
  AppState.activeLevel = Number(levelNumber || 1);
}

export function setActiveSearch(value) {
  AppState.activeSearch = String(value ?? "");
}

export function clearSearch() {
  AppState.activeSearch = "";
}

export function setData({ levels, levelsFull, qtyPerItem, costs }) {
  AppState.LEVELS = Array.isArray(levels) ? levels : [];
  AppState.LEVELS_FULL = Array.isArray(levelsFull) ? levelsFull : [];
  AppState.QTY_PER_ITEM = Number(qtyPerItem ?? 25) || 25;
  AppState.COSTS = costs || { acumulados: [], intervalos: [] };

  // escolhe o primeiro nível como ativo, se existir
  const first = AppState.LEVELS[0]?.level ?? 1;
  AppState.activeLevel = Number(first || 1);
}

export function toggleDropsExpanded(key) {
  if (!key) return;
  if (AppState.dropsExpanded.has(key)) AppState.dropsExpanded.delete(key);
  else AppState.dropsExpanded.add(key);
}

export function isDropsExpanded(key) {
  return AppState.dropsExpanded.has(key);
}
