// assets/js/pages/roulette.js

/**
 * Roulette — versão “premium” no padrão do seu layout.
 * Hotlink por URL direta: https://deusot.com/...
 * Se um asset falhar, entra placeholder sem quebrar o grid.
 */

const BASE = "https://deusot.com";

// Imagens/gifs principais (do HTML de referência)
const ASSETS = {
  coin: `${BASE}/images/roulettesystem/valuables/roulette_coin.gif`,
  ticket: `${BASE}/images/roulettesystem/valuables/roulette_ticket.gif`,
  gifMain: `${BASE}/images/roulettesystem/others/Roleta_DeusOT.gif`,
  gifSlot: `${BASE}/images/roulettesystem/others/Roletinha_DeusOT.gif`,
};

// Itens (convertidos do seu HTML colado)
// Você pode ir adicionando aqui sem dor.
const ITEMS = [
  { name: "Ferumbras Hat", img: `${BASE}/images/roulettesystem/valuables/Ferumbras_Hat.gif` },
  { name: "Bag You Covet", img: `${BASE}/images/roulettesystem/valuables/Bag_You_Covet.gif` },
  { name: "Primal Bag", img: `${BASE}/images/roulettesystem/valuables/Primal_Bag.gif` },
  { name: "Bag You Desire", img: `${BASE}/images/roulettesystem/valuables/Bag_You_Desire.gif` },
  { name: "Cobra Bag", img: `${BASE}/images/roulettesystem/custom_bags/Scarlett_Bag.gif` },
  { name: "Brainstealer Bag", img: `${BASE}/images/roulettesystem/custom_bags/Brainstealer_Bag.gif` },

  { name: "Drume Bag", img: `${BASE}/images/roulettesystem/custom_bags/Drume_Bag.gif` },
  { name: "Oberon Bag", img: `${BASE}/images/roulettesystem/custom_bags/Oberon_Bag.gif` },
  { name: "Timira Bag", img: `${BASE}/images/roulettesystem/custom_bags/Timira_Bag.gif` },
  { name: "Monster Bag", img: `${BASE}/images/roulettesystem/custom_bags/Monster_Bag.gif` },
  { name: "Supreme Mistery Bag", img: `${BASE}/images/roulettesystem/custom_bags/supreme_mistery_bag.gif` },
  { name: "Mistery Bag", img: `${BASE}/images/roulettesystem/custom_bags/Mistery_Bag.gif` },

  { name: "Ratmiral Bag", img: `${BASE}/images/roulettesystem/custom_bags/Ratmiral_Bag.gif` },
  { name: "Golden Outfit Chest", img: `${BASE}/images/roulettesystem/valuables/golden_outfit_chest.gif` },
  { name: "100 Tibia Coins", img: `${BASE}/images/roulettesystem/valuables/Tibia_Coin.gif` },
  { name: "Roulette Coin", img: `${BASE}/images/roulettesystem/valuables/roulette_coin.gif` },
  { name: "Roulette Ticket", img: `${BASE}/images/roulettesystem/valuables/roulette_ticket.gif` },
  { name: "20x Prey Cards", img: `${BASE}/images/roulettesystem/valuables/20x%20Prey_Cards.gif` },

  { name: "10x Prey Cards", img: `${BASE}/images/roulettesystem/valuables/10x%20Prey_Cards.gif` },
  { name: "5x Prey Cards", img: `${BASE}/images/roulettesystem/valuables/5x%20Prey_Cards.gif` },
  { name: "Amplification Full", img: `${BASE}/images/roulettesystem/valuables/potions/Amplification_rgb.gif` },
  { name: "Resilience Full", img: `${BASE}/images/roulettesystem/valuables/potions/Resilience_rgb.gif` },
  { name: "Mystic Cupcake", img: `${BASE}/images/roulettesystem/valuables/Mystic_Cupcake.gif` },
  { name: "Mystic Strawberry", img: `${BASE}/images/roulettesystem/valuables/Mystic_Strawberry.gif` },

  { name: "50x Crystal Coin", img: `${BASE}/images/roulettesystem/valuables/Crystal_Coin.gif` },
  { name: "Bag of Dusts", img: `${BASE}/images/roulettesystem/valuables/Bag_of_Dust.gif` },
  { name: "Kooldown of Avatar", img: `${BASE}/images/roulettesystem/valuables/potions/Kooldown_Of_Avatar.gif` },
  { name: "Food Skill", img: `${BASE}/images/roulettesystem/valuables/Food_Skill.gif` },
  { name: "Mistery Epic Exercise", img: `${BASE}/images/roulettesystem/valuables/Mistery_Epic_Exercise.gif` },
  { name: "Mistery Mystic Exercise", img: `${BASE}/images/roulettesystem/valuables/Mistery_Mystic_Exercise.gif` },

  { name: "Mistery Legend Exercise", img: `${BASE}/images/roulettesystem/valuables/Mistery_Legend_Exercise.gif` },
  { name: "Medkit Scroll", img: `${BASE}/images/roulettesystem/valuables/Medkit_Scroll.gif` },
  { name: "Gift Of Life Scroll", img: `${BASE}/images/roulettesystem/valuables/Gif_of_Life_Scroll.gif` },
  { name: "20% Damage Boost Scroll (15M)", img: `${BASE}/images/roulettesystem/valuables/1Damage_Boost_Scroll.gif` },
  { name: "10% Damage Boost Scroll (30M)", img: `${BASE}/images/roulettesystem/valuables/1Damage_Boost_Scroll(30m).gif` },
  { name: "10% Damage Boost Scroll (15M)", img: `${BASE}/images/roulettesystem/valuables/1Damage_Boost_Scroll(15m).gif` },

  { name: "20% Experience Scroll (15M)", img: `${BASE}/images/roulettesystem/valuables/2Experience_Scroll(15m).gif` },
  { name: "10% Experience Scroll (15M)", img: `${BASE}/images/roulettesystem/valuables/1Experience_Scroll(15M).gif` },
  { name: "Bag Of Imbuements", img: `${BASE}/images/roulettesystem/valuables/Bag_Of_Imbuements.gif` },
  { name: "Special Wealth Duplex", img: `${BASE}/images/roulettesystem/valuables/potions/Special_Wealth_Duplex.gif` },
  { name: "Stone Bag", img: `${BASE}/images/roulettesystem/valuables/Stone_Bag.gif` },
  { name: "More Points Wheel", img: `${BASE}/images/roulettesystem/valuables/More_Points_Wheel.gif` },

  { name: "Red Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Red_Stone_nv1.gif` },
  { name: "Green Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Green_Stone_nv1.gif` },
  { name: "Purple Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Purple_Stone_nv1.gif` },
  { name: "White Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/White_Stone_nv1.gif` },
  { name: "Blue Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Blue_Stone_nv1.gif` },
  { name: "Yellow Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Yellow_Stone_nv1.gif` },

  { name: "Black Stone Nv1", img: `${BASE}/images/roulettesystem/valuables/Black_Stone_nv1.gif` },
  { name: "Defense Scroll (30M)", img: `${BASE}/images/roulettesystem/valuables/Defense_Scroll(30m).gif` },
  { name: "Defense Scroll (15M)", img: `${BASE}/images/roulettesystem/valuables/Defense_Scroll(15m).gif` },
  { name: "Charm Upgrade", img: `${BASE}/images/roulettesystem/valuables/potions/Charm_Upgrade.gif` },
  { name: "Remove Frags", img: `${BASE}/images/roulettesystem/valuables/Red_Skull.gif` },
  { name: "Squeezing Gear of Girlpower", img: `${BASE}/images/roulettesystem/valuables/Squeezing_Gear_of_Girlpower.gif` },

  { name: "Zaoan Chess Box", img: `${BASE}/images/roulettesystem/valuables/Zaoan_Chess_Box.gif` },
  { name: "Exalted Core", img: `${BASE}/images/roulettesystem/valuables/Exalted_Core.gif` },
  { name: "Physical Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Physical_Resilience.gif` },
  { name: "Energy Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Energy_Resilience.gif` },
  { name: "Earth Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Earth_Resilience.gif` },
  { name: "Fire Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Fire_Resilience.gif` },

  { name: "Ice Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Ice_Resilience.gif` },
  { name: "Holy Resilience", img: `${BASE}/images/roulettesystem/valuables/potions/Holy_Resilience.gif` },
  { name: "Death Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Death_Amplification.gif` },
  { name: "Physical Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Physical_Amplification.gif` },
  { name: "Energy Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Energy_Amplification.gif` },
  { name: "Earth Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Earth_Amplification.gif` },

  { name: "Fire Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Fire_Amplification.gif` },
  { name: "Ice Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Ice_Amplification.gif` },
  { name: "Holy Amplification", img: `${BASE}/images/roulettesystem/valuables/potions/Holy_Amplification.gif` },
  { name: "Strike Enhancement", img: `${BASE}/images/roulettesystem/valuables/potions/Strike_Enhancement.gif` },
  { name: "Strawberry Cupcake", img: `${BASE}/images/roulettesystem/valuables/Strawberry_Cupcake.gif` },
  { name: "Blueberry Cupcake", img: `${BASE}/images/roulettesystem/valuables/Blueberry_Cupcake.gif` },

  { name: "Rotworm Stew", img: `${BASE}/images/roulettesystem/valuables/Rotworm_Stew.gif` },
  { name: "5x Gold Token", img: `${BASE}/images/roulettesystem/valuables/Gold_Token.gif` },
  { name: "5x Silver Token", img: `${BASE}/images/roulettesystem/valuables/Silver_Token.gif` },
  { name: "25x Crystal Coin", img: `${BASE}/images/roulettesystem/valuables/Crystal_Coin.gif` },
  { name: "1x Blood Herb", img: `${BASE}/images/roulettesystem/valuables/Blood_Herb.gif` },
];

// ---------- helpers ----------
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

function ensureCss() {
  if (document.getElementById("roulette-css")) return;

  const link = document.createElement("link");
  link.id = "roulette-css";
  link.rel = "stylesheet";
  link.href = "/assets/css/pages/roulette.css";
  document.head.appendChild(link);
}

/** img com fallback (sem quebrar layout) */
function imgSafe(src, alt, className) {
  const img = document.createElement("img");
  if (className) img.className = className;
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = alt ? String(alt) : "";
  img.src = src;

  img.addEventListener("error", () => {
    // placeholder minimalista (sem depender de arquivo externo)
    // (apenas some com a imagem e deixa um “vazio elegante”)
    img.style.display = "none";
    img.setAttribute("data-broken", "1");
  });

  return img;
}

function buildRouletteCard({
  title,
  hint,
  costImg,
  costValue,
  costText,
  gif,
  gifWidth,
}) {
  const card = el("div", "roulette-card");
  const top = el("div", "roulette-card__top");

  const left = el("div");
  left.appendChild(el("h3", "roulette-card__title", escapeHtml(title)));
  if (hint) left.appendChild(el("div", "roulette-card__hint", escapeHtml(hint)));

  const cost = el("div", "roulette-cost");
  cost.appendChild(imgSafe(costImg, "Cost", "roulette-cost__img"));

  const meta = el("div", "roulette-cost__meta");
  meta.appendChild(el("div", "roulette-cost__label", "Custo"));
  meta.appendChild(el("div", "roulette-cost__value", escapeHtml(costValue)));
  meta.appendChild(el("div", "", `<div style="opacity:.72; font-size:12px; line-height:1.35;">${escapeHtml(costText)}</div>`));
  cost.appendChild(meta);

  top.appendChild(left);
  top.appendChild(cost);

  const body = el("div", "roulette-card__body");
  const media = el("div", "roulette-media");

  const gifImg = imgSafe(gif, title, "");
  if (gifWidth) gifImg.style.maxWidth = gifWidth;
  media.appendChild(gifImg);

  body.appendChild(media);

  card.appendChild(top);
  card.appendChild(body);

  return card;
}

function renderItemsGrid(container, items, query) {
  const q = (query || "").trim().toLowerCase();

  const filtered = q
    ? items.filter((it) => it.name.toLowerCase().includes(q))
    : items.slice();

  container.innerHTML = "";

  const meta = el(
    "div",
    "roulette-items-meta",
    q
      ? `Mostrando <b>${filtered.length}</b> de <b>${items.length}</b> itens (filtro ativo).`
      : `Total de <b>${items.length}</b> itens listados.`
  );
  container.appendChild(meta);

  if (!filtered.length) {
    container.appendChild(
      el(
        "div",
        "roulette-empty",
        `Nada encontrado para <b>${escapeHtml(query)}</b>. Tente outro termo (ex.: “Bag”, “Scroll”, “Stone”).`
      )
    );
    return;
  }

  const grid = el("div", "roulette-items-grid");
  filtered.forEach((it) => {
    const card = el("div", "roulette-item");

    const imgWrap = el("div", "roulette-item__imgwrap");
    imgWrap.appendChild(imgSafe(it.img, it.name, ""));
    card.appendChild(imgWrap);

    card.appendChild(el("div", "roulette-item__name", escapeHtml(it.name)));

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ---------- page render ----------
export function render(container) {
  if (!container) return;
  ensureCss();

  container.innerHTML = "";

  const page = el("div", "roulette-page");
  const wrap = el("div", "roulette-wrap");

  // HERO
  const hero = el("div", "roulette-hero");
  hero.appendChild(el("h1", "roulette-hero__title", "Roulette"));
  hero.appendChild(
    el(
      "p",
      "roulette-hero__lead",
      "Um guia direto, bonito e consultável: como funciona, quanto custa, e quais itens podem aparecer. Sem tabelas antigas, sem bagunça — só informação rápida e clara."
    )
  );
  wrap.appendChild(hero);

  // COMO FUNCIONA
  {
    const sec = el("section", "roulette-section");
    const head = el("div", "roulette-section__head");

    const titleWrap = el("div");
    titleWrap.appendChild(el("h2", "roulette-section__title", "Como funciona"));
    titleWrap.appendChild(
      el(
        "p",
        "roulette-section__subtitle",
        "A roleta serve para testar a sorte: você usa um item de custo e recebe uma recompensa aleatória. As recompensas podem mudar ao longo do tempo."
      )
    );

    head.appendChild(titleWrap);

    sec.appendChild(head);

    const body = el("div", "roulette-section__body");
    const notes = el("div", "roulette-notes");

    notes.appendChild(
      el(
        "div",
        "roulette-note",
        `
          <div class="roulette-note__title">Sorte</div>
          <div class="roulette-note__text">
            Ao jogar uma vez, você pode obter diversos itens. O foco é diversão e chance — não garantia.
          </div>
        `
      )
    );

    notes.appendChild(
      el(
        "div",
        "roulette-note",
        `
          <div class="roulette-note__title">Recompensas</div>
          <div class="roulette-note__text">
            O servidor pode alterar as recompensas a qualquer momento, sem aviso prévio.
          </div>
        `
      )
    );

    notes.appendChild(
      el(
        "div",
        "roulette-note",
        `
          <div class="roulette-note__title">Diferença</div>
          <div class="roulette-note__text">
            As roletas podem ter as mesmas recompensas, mas chances diferentes — ou seja: estratégia muda.
          </div>
        `
      )
    );

    body.appendChild(notes);
    sec.appendChild(body);
    wrap.appendChild(sec);
  }

  // ROLETAS (2 cards)
  {
    const sec = el("section", "roulette-section");
    const head = el("div", "roulette-section__head");

    const titleWrap = el("div");
    titleWrap.appendChild(el("h2", "roulette-section__title", "Roletas"));
    titleWrap.appendChild(
      el(
        "p",
        "roulette-section__subtitle",
        "Aqui ficam os dois formatos: a roleta principal (Coin) e a versão Slot (Ticket)."
      )
    );

    head.appendChild(titleWrap);
    sec.appendChild(head);

    const body = el("div", "roulette-section__body");
    const grid = el("div", "roulette-roletas");

    grid.appendChild(
      buildRouletteCard({
        title: "Roleta — DeusOT",
        hint: "A roleta principal. Visual maior.",
        costImg: ASSETS.coin,
        costValue: "1 Roulette Coin",
        costText: "Você obtém pela store, pacotes, eventos ou loot de bosses especiais.",
        gif: ASSETS.gifMain,
        gifWidth: "100%",
      })
    );

    grid.appendChild(
      buildRouletteCard({
        title: "Roleta Slot",
        hint: "Versão compacta.",
        costImg: ASSETS.ticket,
        costValue: "1 Roulette Ticket",
        costText: "Você obtém pela store, pacotes, eventos ou loot de bosses especiais.",
        gif: ASSETS.gifSlot,
        gifWidth: "520px",
      })
    );

    body.appendChild(grid);
    sec.appendChild(body);
    wrap.appendChild(sec);
  }

  // ITENS POSSÍVEIS
  {
    const sec = el("section", "roulette-section");
    const head = el("div", "roulette-section__head");

    const left = el("div");
    left.appendChild(el("h2", "roulette-section__title", "Itens possíveis"));
    left.appendChild(
      el(
        "p",
        "roulette-section__subtitle",
        "Lista visual dos itens que podem aparecer. Use a busca para localizar rápido sem ficar rolando eternamente."
      )
    );

    const right = el("div", "roulette-items-head");
    const search = el("div", "roulette-search");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Buscar item (ex.: Bag, Scroll, Stone, Resilience...)";
    input.autocomplete = "off";
    input.spellcheck = false;

    const btnClear = el("button", "roulette-pill", "Limpar");
    btnClear.type = "button";

    search.appendChild(input);
    search.appendChild(btnClear);

    right.appendChild(search);

    head.appendChild(left);
    head.appendChild(right);

    const body = el("div", "roulette-section__body");
    const itemsMount = el("div");

    const doRender = () => renderItemsGrid(itemsMount, ITEMS, input.value);

    input.addEventListener("input", () => doRender());
    btnClear.addEventListener("click", () => {
      input.value = "";
      input.focus();
      doRender();
    });

    doRender();

    sec.appendChild(head);
    body.appendChild(itemsMount);
    sec.appendChild(body);
    wrap.appendChild(sec);
  }

  page.appendChild(wrap);
  container.appendChild(page);
}

export default { render };
