// assets/js/components/costs.js
import { money, escapeHtml } from "../utils.js";

/**
 * Renderiza os chips de custos no container #costChips
 * Espera COSTS no formato: { acumulados: [{label,value}], intervalos: [...] }
 */
export function renderCosts(COSTS) {
  const el = document.querySelector("#costChips");
  if (!el) return;

  const parts = [];

  (COSTS?.acumulados || []).forEach((c) => {
    parts.push(`
      <div class="chip">
        <span class="tag">acumulado</span>
        <b>${escapeHtml(c.label)}</b>
        <span>— ${money(c.value)}</span>
      </div>
    `);
  });

  (COSTS?.intervalos || []).forEach((c) => {
    parts.push(`
      <div class="chip">
        <span class="tag">intervalo</span>
        <b>${escapeHtml(c.label)}</b>
        <span>— ${money(c.value)}</span>
      </div>
    `);
  });

  el.innerHTML =
    parts.join("") ||
    `
    <div class="chip">
      <span class="tag">info</span>
      <b>Sem custos</b>
      <span>— (verifique se npcBuy.price está preenchido no JSON)</span>
    </div>
  `;
}
