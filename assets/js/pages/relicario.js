// assets/js/pages/relicario.js

export async function render(container) {
  container.innerHTML = "";

  // CSS do upgrade
  if (!document.getElementById("upgrade-css")) {
    const link = document.createElement("link");
    link.id = "upgrade-css";
    link.rel = "stylesheet";
    link.href = "/assets/css/pages/upgrade.css";
    document.head.appendChild(link);
  }

  // HTML base esperado pelo upgrade
  container.innerHTML = `
    <div id="upgrade-root">
      <div class="layout">
        <section class="panel">
          <div class="costs">
            <div class="kicker">CUSTOS DE UPGRADES (CALCULADO DO JSON)</div>
            <p class="lead">
              Regras: cada nível pede <b>5 itens</b>, e cada item pede <b>25 unidades</b>.
              Se um item estiver com <b>preço v</b>, ele é considerado como <b>0</b> no cálculo.
            </p>
            <div class="chips" id="costChips"></div>
          </div>
        </section>

        <section class="row-grid">
          <section class="panel">
            <div class="levels-wrap">
              <div class="panel-title">
                <span>Níveis</span>
                <span class="muted" id="levelsMeta">—</span>
              </div>
              <div id="levelsGrid" class="grid-levels"></div>
            </div>
          </section>

          <section class="panel">
            <div class="details-header">
              <h3 id="detailsTitle">Clique em um nível</h3>
              <span id="detailsMeta" class="meta"></span>
            </div>

            <div id="detailsBody" class="details-body">
              <div class="hint">
                Clique em um card para ver os itens do nível. Se você usar a busca,
                os cards dos níveis que contêm o item vão mostrar um marcador <b>“aqui”</b>.
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  `;

  // garante deps carregadas (cache ok)
  await import("../state.js");
  await import("../api.js");
  await import("../components/costs.js");

  // importa o upgrade e monta sempre
  const mod = await import("./upgrade.js");
  await mod.mountUpgrade();
}

export default { render };
