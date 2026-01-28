const EXP_RATE = [
  { from: 1, to: 8, mult: "100x" },
  { from: 9, to: 50, mult: "100x" },
  { from: 51, to: 100, mult: "90x" },
  { from: 101, to: 150, mult: "80x" },
  { from: 151, to: 200, mult: "70x" },
  { from: 201, to: 250, mult: "60x" },
  { from: 251, to: 300, mult: "45x" },
  { from: 301, to: 350, mult: "35x" },
  { from: 351, to: 400, mult: "25x" },
  { from: 401, to: 450, mult: "17x" },
  { from: 451, to: 500, mult: "13x" },
  { from: 501, to: 550, mult: "10x" },
  { from: 551, to: 600, mult: "8x" },
  { from: 601, to: 700, mult: "6x" },
  { from: 701, to: 800, mult: "4x" },
  { from: 801, to: 850, mult: "2.5x" },
  { from: 851, to: 900, mult: "2x" },
  { from: 901, to: 1000, mult: "1.5x" },
  { from: 1001, to: 1100, mult: "1.25x" },
  { from: 1101, to: "?", mult: "1.1x" },
];

const SKILL_RATE = [
  { from: 10, to: 80, mult: "15x" },
  { from: 81, to: 100, mult: "7x" },
  { from: 101, to: 120, mult: "4x" },
  { from: 121, to: 130, mult: "3x" },
  { from: 131, to: "?", mult: "2x" },
];

const MAGIC_RATE_EK = [
  { from: 0, to: 7, mult: "8x" },
  { from: 8, to: 9, mult: "3x" },
  { from: 10, to: 11, mult: "2x" },
  { from: 12, to: "?", mult: "1.5x" },
];

const MAGIC_RATE_RP = [
  { from: 0, to: 20, mult: "8x" },
  { from: 21, to: 25, mult: "5x" },
  { from: 26, to: 30, mult: "3x" },
  { from: 31, to: 34, mult: "2x" },
  { from: 35, to: "?", mult: "1.5x" },
];

const MAGIC_RATE_ED_MS = [
  { from: 0, to: 80, mult: "15x" },
  { from: 81, to: 100, mult: "7x" },
  { from: 101, to: 120, mult: "4x" },
  { from: 121, to: 130, mult: "3x" },
  { from: 131, to: "?", mult: "2x" },
];

const FRAGS = { redSkull: 10, blackSkull: 16 };

const COMMANDS = [
  { cmd: "!pix", desc: "Possibilita comprar coins de dentro do jogo com pix. O QR-CODE do pix aparece na sua tela!" },
  { cmd: "!pacote", desc: "Possibilita comprar pacotes de itens de dentro do jogo com pix. O QR-CODE do pix aparece na sua tela!" },
  { cmd: "!online", desc: "Mostra a quantidade de players online" },
  { cmd: "!emote", desc: "Desabilita e Habilita as spells em laranja" },
  { cmd: "!carpet", desc: "Ao utilizar o comando, o carpet deve estar na sua backpack e voce deve estar olhando para o local que deseja colocar o carpet. Com esse comando é possivel colocar carpets em baixo de portas e paredes." },
  { cmd: "!flask", desc: "Desabilita e Habilita as flaks vazias" },
  { cmd: "!frags", desc: "Mostra quantos frags você possui" },
  { cmd: "!cast", desc: "Desabilita e Habilita o cast. Para abrir o cat com senha digite !cast senha. Ex: !cast 12345" },
  { cmd: "/war", desc: "Cria uma warmode, mais detalhes em: Warmode" },
  { cmd: "!war", desc: "Cria uma warmode dentro de uma área anti entrosa. Mais detalhes em: War Anti-Entrosa" },
  { cmd: "!go", desc: "Modifica o outfit dos membros da sua guild" },
  { cmd: "!automaticloot", desc: "Desabilita e Habilita o quickloot automatico para a backpack, caso o player seja VIP." },
];

const PARTY_SYSTEM = "Party System: 100% up to 5 Players, after that party will lose XP.";

const OTHER_INFOS = [
  { label: "Loot Rate", value: "2X" },
  { label: "Bestiary Rate", value: "2X" },
  { label: "Host Location", value: "São Paulo, BRASIL" },
  { label: "Clients Versions", value: "Only 13.34" },
  { label: "Free Bless", value: "Until level 50" },
  { label: "PVP Protection", value: "to 8 level" },
];

/** ---------- helpers ---------- */

function ensureCss() {
  if (document.getElementById("server-info-css")) return;
  const link = document.createElement("link");
  link.id = "server-info-css";
  link.rel = "stylesheet";
  link.href = "/assets/css/pages/server-info.css";
  document.head.appendChild(link);
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function section(title, subtitle) {
  const wrap = el("section", "si-section");
  const head = el("div", "si-section__head");
  head.appendChild(el("h2", "si-section__title", escapeHtml(title)));
  if (subtitle) head.appendChild(el("p", "si-section__sub", escapeHtml(subtitle)));
  const body = el("div", "si-section__body");
  wrap.appendChild(head);
  wrap.appendChild(body);
  return { wrap, body };
}

function panel(title, subtitle, colClass) {
  const wrap = el("div", `si-panel ${colClass || ""}`.trim());
  const head = el("div", "si-panel__head");
  head.appendChild(el("h3", "si-panel__title", escapeHtml(title)));
  if (subtitle) head.appendChild(el("p", "si-panel__subtitle", escapeHtml(subtitle)));
  const body = el("div", "si-panel__body");
  wrap.appendChild(head);
  wrap.appendChild(body);
  return { wrap, body };
}

function makeTable(columns, rows, opts = {}) {
  const cls = [
    "si-table",
    opts.compact ? "is-compact" : "",
    opts.scrollX ? "is-scroll-x" : "",
  ].filter(Boolean).join(" ");

  const tableWrap = el("div", cls);
  const table = el("table", "si-table__table");

  const thead = el("thead");
  const trh = el("tr");
  columns.forEach((c, idx) => {
    const th = el("th", idx === columns.length - 1 ? "is-right" : "", escapeHtml(c));
    trh.appendChild(th);
  });
  thead.appendChild(trh);

  const tbody = el("tbody");
  rows.forEach((r) => {
    const tr = el("tr");
    r.forEach((cell, idx) => {
      const td = el("td", idx === r.length - 1 ? "is-right" : "", escapeHtml(cell));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  return tableWrap;
}

function rateRows(list) {
  return list.map((x) => [String(x.from), String(x.to), String(x.mult)]);
}

function makeKpi(label, value) {
  const card = el("div", "si-kpi");
  card.appendChild(el("div", "si-kpi__label", escapeHtml(label)));
  card.appendChild(el("div", "si-kpi__value", escapeHtml(value)));
  return card;
}

function makeCommandRow(cmd, desc) {
  const row = el("div", "si-command");
  row.appendChild(el("div", "si-command__cmd", escapeHtml(cmd)));
  row.appendChild(el("div", "si-command__desc", escapeHtml(desc)));
  return row;
}

function makeInfoRow(label, value) {
  const row = el("div", "si-info");
  row.appendChild(el("div", "si-info__label", escapeHtml(label)));
  row.appendChild(el("div", "si-info__value", escapeHtml(value)));
  return row;
}

function makeChip(k, v) {
  const chip = el("div", "si-chip");
  chip.appendChild(el("div", "si-chip__k", escapeHtml(k)));
  chip.appendChild(el("div", "si-chip__v", escapeHtml(v)));
  return chip;
}

/** ---------- page render ---------- */

export function render(container) {
  if (!container) return;

  ensureCss();
  container.innerHTML = "";

  const page = el("div", "server-info-page");
  const wrap = el("div", "si-wrap");

  // HERO
  const top = el("div", "si-hero");
  top.appendChild(el("h1", "si-hero__title", "Server Informations"));
  top.appendChild(
    el("p", "si-hero__lead",
      "Tudo o que você precisa saber — taxas, frags, comandos e regras — organizado em blocos claros e fáceis de consultar."
    )
  );

  const summary = el("div", "si-summary");
  const map = Object.fromEntries(OTHER_INFOS.map((x) => [x.label, x.value]));
  summary.appendChild(makeChip("Loot", map["Loot Rate"] || "—"));
  summary.appendChild(makeChip("Bestiary", map["Bestiary Rate"] || "—"));
  summary.appendChild(makeChip("Host", map["Host Location"] || "—"));
  summary.appendChild(makeChip("Client", map["Clients Versions"] || "—"));
  summary.appendChild(makeChip("Free Bless", map["Free Bless"] || "—"));
  summary.appendChild(makeChip("PVP Protect", map["PVP Protection"] || "—"));
  top.appendChild(summary);

  wrap.appendChild(top);

  const sections = el("div", "si-sections");

  // ====== RATES ======
  {
    const { wrap: sec, body } = section(
      "Rates",
      "Taxas principais do servidor. EXP fica compacto com scroll; Magic rates ficam em abas para reduzir ruído."
    );

    const grid = el("div", "si-grid");

    // EXP (5 col)
    {
      const { wrap: p, body: pb } = panel("EXP RATE", "Tabela compacta (scroll).", "si-col-5");
      pb.appendChild(makeTable(["From level", "To level", "Multiplier"], rateRows(EXP_RATE), { compact: true }));
      grid.appendChild(p);
    }

    // SKILL (4 col)
    {
      const { wrap: p, body: pb } = panel("SKILL RATE", null, "si-col-4");
      pb.appendChild(makeTable(["From level", "To level", "Multiplier"], rateRows(SKILL_RATE)));
      grid.appendChild(p);
    }

    {
      const { wrap: p, body: pb } = panel("MAGIC RATE", "Escolha a vocação.", "si-col-4");
      p.classList.add("is-magic");

      const tabs = el("div", "si-tabs");
      const btnEK = el("button", "si-tab is-active", "EK");
      const btnRP = el("button", "si-tab", "RP");
      const btnED = el("button", "si-tab", "ED/MS");
      btnEK.type = btnRP.type = btnED.type = "button";

      tabs.appendChild(btnEK);
      tabs.appendChild(btnRP);
      tabs.appendChild(btnED);

      const slot = el("div");

      const renderMagic = (key) => {
        slot.innerHTML = "";
        if (key === "EK") slot.appendChild(makeTable(["From level", "To level", "Multiplier"], rateRows(MAGIC_RATE_EK), { scrollX: true }));
        if (key === "RP") slot.appendChild(makeTable(["From level", "To level", "Multiplier"], rateRows(MAGIC_RATE_RP), { scrollX: true }));
        if (key === "ED") slot.appendChild(makeTable(["From level", "To level", "Multiplier"], rateRows(MAGIC_RATE_ED_MS), { scrollX: true }));
      };

      const setActive = (which) => {
        [btnEK, btnRP, btnED].forEach((b) => b.classList.remove("is-active"));
        if (which === "EK") btnEK.classList.add("is-active");
        if (which === "RP") btnRP.classList.add("is-active");
        if (which === "ED") btnED.classList.add("is-active");
      };

      btnEK.addEventListener("click", () => { setActive("EK"); renderMagic("EK"); });
      btnRP.addEventListener("click", () => { setActive("RP"); renderMagic("RP"); });
      btnED.addEventListener("click", () => { setActive("ED"); renderMagic("ED"); });

      pb.appendChild(tabs);
      pb.appendChild(slot);
      renderMagic("EK");

      grid.appendChild(p);
    }

    body.appendChild(grid);
    sections.appendChild(sec);
  }

  // ====== RULES ======
  {
    const { wrap: sec, body } = section("Rules", "Informações rápidas e regras que você consulta com frequência.");
    const grid = el("div", "si-grid");

    {
      const { wrap: p, body: pb } = panel("Frags", "Limites de frags para skulls.", "si-col-6");
      const kpis = el("div", "si-kpis");
      kpis.appendChild(makeKpi("Kills to RedSkull", String(FRAGS.redSkull)));
      kpis.appendChild(makeKpi("Kills to BlackSkull", String(FRAGS.blackSkull)));
      pb.appendChild(kpis);
      grid.appendChild(p);
    }

    {
      const { wrap: p, body: pb } = panel("Party System", null, "si-col-6");
      pb.appendChild(el("div", "si-note", escapeHtml(PARTY_SYSTEM)));
      grid.appendChild(p);
    }

    {
      const { wrap: p, body: pb } = panel("Other Infos", "Detalhes adicionais do servidor.", "si-col-12");
      const list = el("div", "si-info-list");
      OTHER_INFOS.forEach((x) => list.appendChild(makeInfoRow(x.label, x.value)));
      pb.appendChild(list);
      grid.appendChild(p);
    }

    body.appendChild(grid);
    sections.appendChild(sec);
  }

  // ====== COMMANDS ======
  {
    const { wrap: sec, body } = section("Commands", "Comandos disponíveis e o que cada um faz.");
    const grid = el("div", "si-grid");

    const { wrap: p, body: pb } = panel("Commands", null, "si-panel is-wide");
    const list = el("div", "si-commands");
    COMMANDS.forEach((c) => list.appendChild(makeCommandRow(c.cmd, c.desc)));
    pb.appendChild(list);

    grid.appendChild(p);
    body.appendChild(grid);
    sections.appendChild(sec);
  }

  wrap.appendChild(sections);
  page.appendChild(wrap);
  container.appendChild(page);
}

export default { render };
