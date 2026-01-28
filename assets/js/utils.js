// assets/js/utils.js
// Utilitários pequenos, sem framework, para manter o projeto modular e limpo.

export function normalize(s) {
  return String(s ?? "").toLowerCase().trim();
}

export function money(n) {
  const s = Math.round(Number(n || 0)).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Injetor de componentes HTML:
 * - fetch do arquivo
 * - injeta no container
 * - retorna o root (elemento container) para quem quiser bindar eventos
 */
export async function injectComponent({
  url,
  mountId,
  cache = "no-store",
  onErrorHtml = "",
} = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return null;

  try {
    const res = await fetch(url, { cache });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    mount.innerHTML = html;
    return mount;
  } catch (err) {
    console.error(`[injectComponent] ${url}`, err);
    mount.innerHTML =
      onErrorHtml ||
      `
      <div class="panel" style="margin:16px; padding:14px;">
        <div class="kicker">Erro</div>
        <div style="margin-top:8px; color: rgba(233,238,247,.92);">
          Não consegui carregar <b>${escapeHtml(url)}</b>.
        </div>
      </div>
      `;
    return mount;
  }
}

/**
 * Emite eventos globais padronizados do app
 */
export function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/**
 * Faz subscribe em evento global e retorna função de unsubscribe
 */
export function on(name, handler) {
  window.addEventListener(name, handler);
  return () => window.removeEventListener(name, handler);
}
