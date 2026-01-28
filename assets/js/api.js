// assets/js/api.js
import { escapeHtml } from "./utils.js";

/**
 * Utilidades ligadas ao JSON e transformação dos dados.
 * - buildFromJson: prepara LEVELS/LEVELS_FULL/QTY_PER_ITEM
 * - calcCostsFromJson: calcula custos acumulados/intervalos
 */

export function getDisplayName(item) {
  if (item?.aliases?.length) return item.aliases[0];
  return item?.name ?? "";
}

export function getItemPrice(item) {
  const p = item?.npcBuy?.price;
  if (p === null || p === undefined) return null;
  const num = Number(p);
  return Number.isFinite(num) ? num : null;
}

export function getWikiUrl(item) {
  if (item?.wikiUrl) return String(item.wikiUrl);
  if (item?.wikiSlug) {
    return `https://www.tibiawiki.com.br/wiki/${encodeURIComponent(String(item.wikiSlug))}`;
  }
  return null;
}

export function getDropKey(levelNumber, item) {
  return `${levelNumber}:${String(item?.wikiSlug || item?.name || item?._displayName || "item")}`;
}

/**
 * Constrói a estrutura usada na UI a partir do JSON.
 * Retorna:
 * - qtyPerItem
 * - levelsFull (com campos normalizados)
 * - levels (versão simples pra cards/busca)
 * - subtitle (texto pro header)
 */
export function buildFromJson(json) {
  const qtyPerItem = Number(json?.meta?.qtyPerItem ?? 25) || 25;

  const levelsFull = (json?.levels || []).map((l) => ({
    level: l.level,
    items: (l.items || []).map((it) => {
      const display = getDisplayName(it);
      const price = getItemPrice(it);
      const qty = Number(it?.qty ?? qtyPerItem) || qtyPerItem;

      return {
        ...it,
        _displayName: display,
        _price: price,          // null = não definido
        _qty: qty,
        _wikiUrl: getWikiUrl(it),
        _droppedBy: Array.isArray(it?.droppedBy) ? it.droppedBy.filter(Boolean) : [],
      };
    }),
  }));

  const levels = levelsFull.map((l) => ({
    level: l.level,
    items: l.items.map((it) => it._displayName),
  }));

  const totalLevels = levels.length;
  const subtitle = `${totalLevels} níveis • 5 itens por nível • ${qtyPerItem} unidades por item`;

  return { qtyPerItem, levelsFull, levels, subtitle };
}

/**
 * Calcula custos a partir de levelsFull.
 * Mantém lógica equivalente ao seu arquivo antigo.
 */
export function calcCostsFromJson(levelsFull, qtyPerItem) {
  const perLevel = (levelsFull || []).map((lvl) => {
    const total = (lvl.items || []).reduce((acc, it) => {
      const price = it._price ?? 0; // null vira 0
      const qty = it._qty ?? qtyPerItem;
      return acc + price * qty;
    }, 0);

    return { level: lvl.level, total };
  });

  if (!perLevel.length) return { acumulados: [], intervalos: [] };

  const maxLevel = Math.max(...perLevel.map((x) => x.level));

  const sumRange = (a, b) =>
    perLevel
      .filter((x) => x.level >= a && x.level <= b)
      .reduce((acc, x) => acc + x.total, 0);

  const acumulados = [
    { label: `1 → 5 (acumulado)`, value: sumRange(1, Math.min(5, maxLevel)) },
    { label: `1 → 10 (acumulado)`, value: sumRange(1, Math.min(10, maxLevel)) },
    { label: `1 → 15 (acumulado)`, value: sumRange(1, Math.min(15, maxLevel)) },
    { label: `1 → 20 (acumulado)`, value: sumRange(1, Math.min(20, maxLevel)) },
    { label: `1 → ${maxLevel} (acumulado)`, value: sumRange(1, maxLevel) },
  ].filter((c) => c.value > 0);

  const intervalos = [
    { label: `5 → 10 (intervalo)`, value: sumRange(6, Math.min(10, maxLevel)) },
    { label: `10 → 15 (intervalo)`, value: sumRange(11, Math.min(15, maxLevel)) },
    { label: `15 → 20 (intervalo)`, value: sumRange(16, Math.min(20, maxLevel)) },
    { label: `20 → ${maxLevel} (intervalo)`, value: sumRange(21, maxLevel) },
  ].filter((c) => c.value > 0);

  return { acumulados, intervalos };
}

/**
 * Carrega o JSON (itens.json) e retorna os dados já prontos pra state.
 */
export async function fetchItemsJson(jsonUrl) {
  const res = await fetch(jsonUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Falha ao carregar JSON (${res.status})`);
  return await res.json();
}

/**
 * HTML de fallback padronizado (usado em caso de erro)
 */
export function errorPanelHtml(jsonUrl, errMsg = "") {
  const safeUrl = escapeHtml(jsonUrl);
  const safeErr = escapeHtml(errMsg);

  return `
    <div class="hint">
      Não consegui carregar <b>${safeUrl}</b>.<br/><br/>
      ${safeErr ? `<div style="opacity:.9; margin-bottom:10px;"><b>Detalhe:</b> ${safeErr}</div>` : ""}

      <b>Checklist rápido:</b><br/>
      • Coloque <b>itens.json</b> na mesma pasta do <b>index.html</b><br/>
      • Rode por servidor local (ex: <b>npx live-server</b>) — não abre com duplo clique<br/>
      • Abra pelo endereço do servidor (ex: http://127.0.0.1:8080)<br/>
    </div>
  `;
}
