// assets/js/pages/fendas.js

const VIDEO = {
  title: "Sistema de Fendas",
  // embed direto (mais estável e sem precisar “converter” URL)
  embedUrl: "https://www.youtube.com/embed/_yOMjhjFlcc",
};

const CONTENT = {
  intro: [
    "Este sistema é inspirado em Dungeons, mas aqui as chamamos de Fendas.",
    "Para acessar o portal das fendas é necessário ter level 600.",
    "Ao iniciar uma Fenda, você terá exatamente 900 segundos, que serão exibidos ao lado do seu personagem para concluír a fenda.",
    "Ressaltamos que, ao morrer dentro de uma fenda, será aplicada a penalidade de morte padrão.",
    "Ao entrar em uma Fenda, você precisará derrotar todas as criaturas dos mapas chegando em 100% de progresso para concluir o nível.",
    "O jogador terá liberdade para explorar as fendas sem limitações de cooldown até obter sua proxima recompensa.",
    "Os monstros se tornam progressivamente mais fortes à medida que os níveis aumentam.",
  ],
  prices: [
    { range: "Do nível 1 ao 15", price: "2.500.000" },
    { range: "Do nível 16 ao 30", price: "3.300.000" },
    { range: "Do nível 31 ao 45", price: "4.100.000" },
    { range: "Do nível 46 ao 60", price: "5.000.000" },
    { range: "Do nível 61 ao 75", price: "5.800.000" },
    { range: "Acima do nível 75", price: "6.800.000" },
  ],
  scaling: {
    headline:
      "Para cada 5 níveis de fenda, serão requeridos 20 níveis adicionais no personagem somando os 600 leveis iniciais do teleporte da fenda.",
    formula: "Level requerido = 600 + (FENDA / 5) * 20",
    examples: [
      "Exemplo 1: Para acessar a Fenda Nível 50, o personagem deverá estar no Nível 700.",
      "Exemplo 2: Para acessar a Fenda Nível 100, o personagem deverá estar no Nível 800.",
      "Exemplo 3: Para acessar a Fenda Nível 150, o personagem deverá estar no Nível 1200.",
      "Exemplo 4: Para acessar a Fenda Nível 200, o personagem deverá estar no Nível 1400.",
      "Exemplo 5: Para acessar a Fenda Nível 250, o personagem deverá estar no Nível 1600.",
    ],
  },
  infoCards: [
    {
      title: "Totem",
      img: "https://i.imgur.com/zrDqgz1.gif",
      desc:
        "No mapa poderá aparecer um totem de boost que ao clicar ativará aleatoriamente um dos seguintes bonus por 30 segundos:",
      table: {
        headLeft: "Bônus",
        headRight: "Porcentagem",
        rows: [
          { left: "Defesa em todos elementos:", right: "100%" },
          { left: "Ataque para todos elementos:", right: "100%" },
          { left: "Momentum:", right: "100%" },
          { left: "Fatal:", right: "100%" },
          { left: "Transcendence:", right: "100%" },
        ],
      },
    },
    {
      title: "Blue Portal",
      img: "https://www.tibiawiki.com.br/images/1/1d/Magic_Forcefield_%28Azul%29.gif",
      desc:
        "Este teleport é usado para avançar de mapa, mas continuará no mesmo nível.",
    },
    {
      title: "Red Portal",
      img: "https://www.tibiawiki.com.br/images/1/1a/Magic_Forcefield_%28Laranja%29.gif",
      desc:
        "Este teleport é usado para sair da fenda, se você sair, só poderá voltar pagando novamente!",
    },
  ],
  rewards: {
    chest: {
      title: "Reward Chest",
      img: "https://www.tibiawiki.com.br/images/e/e3/Gnomevil_Treasure_Chest.gif",
      desc: "O jogador deverá completar 3 níveis para receber as recompensas.",
    },
    sections: [
      {
        title: "Entre o nível 0 até o nível 20 de FENDA:",
        items: [
          { img: "https://deusot.com/images/outfits/ddd_outfit.gif", label: "Obelix Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/dukoth_outfit.gif", label: "Bruteforce Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/7/77/Death_Phoenix.gif", label: "Death Phoenix Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/2/2d/Soul_Phoenix.gif", label: "Soul Phoenix Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/roulettesystem/others/Double_Task_DeusOT.gif", label: "Double Task Potion", rarity: "Raro", color: "darkorange" },
          { img: "https://deusot.com/images/roulettesystem/custom_bags/supreme_mistery_bag.gif", label: "Supreme Mistery Bag", rarity: "Dificil", color: "blue" },
          { img: "https://deusot.com/images/upgradesystem/Mystic_Core.gif", label: "Mystic Core", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/Stone_Bag.gif", label: "Stone Bag", rarity: "Comun", color: "green" },
          { img: "https://i.imgur.com/41GwJc2.gif", label: "Warzone Token", rarity: "Soulbound - Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/roulette_ticket.gif", label: "Roulette Ticket", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/roulette_coin.gif", label: "Roulette Coin", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/upgradesystem/light_matter.gif", label: "Light Matter", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/More_Points_Wheel.gif", label: "More Wheel Points", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/custom_bags/Mistery_Bag.gif", label: "Mistery Bag", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/2Experience_Scroll(15m).gif", label: "Experience Scroll", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/1Experience_Scroll(15M).gif", label: "Experience Scroll", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/1Damage_Boost_Scroll.gif", label: "Damage Scroll", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/Defense_Scroll(30m).gif", label: "Defense Boost", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/store/64/XP_Boost.png", label: "Um level e meio!", rarity: "", color: "green" },
        ],
      },
      {
        title: "Entre o nível 21 até o nível 40 de FENDA:",
        preface: "Todas as recompensas dos niveis acima!",
        items: [
          { img: "https://deusot.com/images/outfits/Outfit_Future_Warrior_DeusOT.gif", label: "Future Warrior Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/bugado_outfit.gif", label: "Astral Seer Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/julioskeletin_outfit.gif", label: "Skeleton Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/bigodezerah_outfit.gif", label: "Mustached Porter Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/a/af/Night_Locust.gif", label: "Night Locust Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/c/c3/Leaf_Locust.gif", label: "Leaf Locust Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/1/11/Pearl_Locust.gif", label: "Pearl Locust Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/f/f0/Satin_Moth.gif", label: "Satin Moth Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/b/bb/Corpse_Phoenix.gif", label: "Corpse Phoenix Mount", rarity: "Muito Raro", color: "purple" },
        ],
      },
      {
        title: "Entre o nível 41 até o nível 60 de FENDA:",
        preface: "Todas as recompensas dos niveis acima!",
        items: [
          { img: "https://deusot.com/images/outfits/Outfit_Blood_Lover.gif", label: "Blood Lover Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Outfit_Moonmaster.gif", label: "Moonmaster Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Outfit_Hefesto.gif", label: "Hefesto Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Magic_Broom.gif", label: "Magic Broom Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/2/2c/Pallbearer.gif", label: "Pallbearer Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/3/34/Hell_Demonosaur.gif", label: "Hell Demonosaur Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://www.tibiawiki.com.br/images/d/da/Alpha_Demonosaur.gif", label: "Alpha Demonosaur Mount", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/upgradesystem/dark_matter.gif", label: "Dark Matter", rarity: "Comun", color: "green" },
        ],
      },
      {
        title: "Entre o nível 61 até o nível 80 de FENDA:",
        preface: "Todas as recompensas dos niveis acima!",
        items: [
          { img: "https://deusot.com/images/outfits/Outfit_Polar_Queen.gif", label: "Polar Queen/King Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Outfit_Guardion_of_Nature.gif", label: "Guardian of Nature Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Outfit_Shocksmith.gif", label: "Shocksmith Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Draptor_archer.gif", label: "Mount Draptor Archer", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Void_Scorpion.gif", label: "Mount Void Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Venomous_Scorpion.gif", label: "Mount Venomous Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Infernal_Scorpion.gif", label: "Mount Infernal Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/roulettesystem/others/Stone_Bag_Nivel_2_DeusOT.gif", label: "Stone Bag Nivel 2", rarity: "Comun", color: "green" },
        ],
      },
      {
        title: "Entre o nível 81 até o nível 100 de FENDA:",
        preface: "Todas as recompensas dos niveis acima!",
        items: [
          { img: "https://deusot.com/images/outfits/Elemental_Spykes_Male.gif", label: "Elemental Spykes Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Aegis_Valor.gif", label: "Aegis Aurora/Valor Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/Ultimate_Gods_Male.gif", label: "Ultimate Gods Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Red_Scorpion.gif", label: "Mount Red Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Purple_Scorpion.gif", label: "Mount Purple Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Black_Scorpion.gif", label: "Mount Black Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_White_Scorpion.gif", label: "Mount White Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/mounts/Mount_Rainbow_Scorpion.gif", label: "Mount Rainbow Scorpion", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/roulettesystem/others/Prision_Scroll_DeusOT.gif", label: "Prision Scroll", rarity: "Muito Raro", color: "purple" },
        ],
      },
      {
        title: "Acima do nível 100 de FENDA:",
        preface: "Todas as recompensas dos niveis acima!",
        items: [
          { img: "https://deusot.com/images/outfits/nattank_outfit.gif", label: "Nattank Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/diogo_outfit.gif", label: "Diogo Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/angel_outfit.gif", label: "Angel Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/archer_outfit.gif", label: "Archer Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/diamond_outfit.gif", label: "Diamond Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/platinum_outfit.gif", label: "Platinum Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/silver_outfit.gif", label: "Silver Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com/images/outfits/ruby_outfit.gif", label: "Ruby Outfit", rarity: "Muito Raro", color: "purple" },
          { img: "https://deusot.com./images/roulettesystem/others/Stone_Bag_3_DeusOT.gif", label: "Stone Bag Nivel 3", rarity: "Comun", color: "green" },
          { img: "https://deusot.com/images/roulettesystem/valuables/Ferumbras_Hat.gif", label: "Ferumbras Hat", rarity: "Mitico", color: "#ffe354", glow: true },
        ],
      },
    ],
  },
};

function ensureCss() {
  const href = "./assets/css/pages/fendas.css";
  const exists = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .some((l) => l.getAttribute("href") === href);

  if (!exists) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

function section(title, innerHtml) {
  return `
    <section class="panel fendas-section">
      <div class="panel-head">
        <h2 class="panel-title">${title}</h2>
      </div>
      <div class="panel-body">
        ${innerHtml}
      </div>
    </section>
  `;
}

function zebraList(items) {
  return `
    <div class="fendas-zebra">
      ${items
        .map(
          (t, idx) => `
            <div class="fendas-zebra-row ${idx % 2 === 0 ? "is-even" : "is-odd"}">
              <p>${t}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function pricesTable(rows) {
  return `
    <div class="fendas-table-wrap">
      <div class="fendas-note">Aqui está as informações de preço para entrar nas fendas:</div>

      <table class="fendas-table" role="table" aria-label="Preço das Fendas">
        <thead>
          <tr>
            <th>Níveis</th>
            <th>Gold Coins</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r, idx) => `
                <tr class="${idx % 2 === 0 ? "is-even" : "is-odd"}">
                  <td>${r.range}</td>
                  <td class="is-green"><b>${r.price}</b></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function scalingBlock(s) {
  return `
    <div class="fendas-scaling">
      <div class="fendas-banner is-green">
        ${s.headline}
      </div>

      <div class="fendas-formula">
        <b>${s.formula}</b>
      </div>

      <div class="fendas-examples">
        ${s.examples
          .map(
            (ex, idx) => `
              <div class="fendas-example ${idx % 2 === 0 ? "is-even" : "is-odd"}">
                ${ex}
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function infoCards(cards) {
  return `
    <div class="fendas-cards">
      ${cards
        .map((c) => {
          const hasTable = !!c.table;
          return `
            <article class="fendas-card">
              <div class="fendas-card-aside">
                <img class="fendas-card-img" src="${c.img}" alt="${c.title}">
                <div class="fendas-card-title"><b>${c.title}</b></div>
              </div>

              <div class="fendas-card-main">
                <div class="fendas-card-desc">${c.desc}</div>

                ${
                  hasTable
                    ? `
                      <table class="fendas-mini-table" role="table" aria-label="Totem bônus">
                        <thead>
                          <tr>
                            <th>${c.table.headLeft}</th>
                            <th>${c.table.headRight}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${c.table.rows
                            .map(
                              (r, idx) => `
                                <tr class="${idx % 2 === 0 ? "is-even" : "is-odd"}">
                                  <td>${r.left}</td>
                                  <td class="is-green"><b>${r.right}</b></td>
                                </tr>
                              `
                            )
                            .join("")}
                        </tbody>
                      </table>
                    `
                    : ""
                }
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function raritySpan(item) {
  if (!item.rarity) return "";
  const color = item.color || "green";

  // “Mitico” com brilho (Ferumbras Hat)
  if (item.glow) {
    return ` <span class="rarity rarity-glow" style="--rarity:${color};">(${item.rarity})</span>`;
  }

  return ` <span class="rarity" style="--rarity:${color};">(${item.rarity})</span>`;
}

function rewardsBlock(rewards) {
  return `
    <div class="fendas-rewards">
      <div class="fendas-reward-head">
        <img class="fendas-reward-img" src="${rewards.chest.img}" alt="${rewards.chest.title}">
        <div class="fendas-reward-meta">
          <div class="fendas-reward-title"><b>${rewards.chest.title}</b></div>
          <div class="fendas-reward-desc">${rewards.chest.desc}</div>
        </div>
      </div>

      ${rewards.sections
        .map((sec) => {
          return `
            <div class="fendas-reward-section">
              <div class="fendas-reward-section-title">${sec.title}</div>
              ${
                sec.preface
                  ? `<div class="fendas-banner is-green"><b>${sec.preface}</b></div>`
                  : ""
              }

              <div class="fendas-reward-grid">
                ${sec.items
                  .map(
                    (it, idx) => `
                      <div class="fendas-reward-item ${idx % 2 === 0 ? "is-even" : "is-odd"}">
                        <img class="fendas-reward-item-img" src="${it.img}" alt="${it.label}">
                        <div class="fendas-reward-item-text">
                          <b>${it.label}</b>${raritySpan(it)}
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function videoBlock(video) {
  return `
    <div class="fendas-video">
      <h1 class="fendas-h1">Fenda System <b>DeusOT</b></h1>

      <div class="fendas-video-frame" aria-label="${video.title}">
        <iframe
          src="${video.embedUrl}"
          title="${video.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;
}

export function render(app) {
  ensureCss();

  app.innerHTML = `
    <div class="page fendas-page">
      ${section("Fenda System", videoBlock(VIDEO))}

      ${section("Informações Gerais", zebraList(CONTENT.intro))}

      ${section("Preço Das Fendas", pricesTable(CONTENT.prices))}

      ${section("Escalonamento de Níveis", scalingBlock(CONTENT.scaling))}

      ${section("Informações", infoCards(CONTENT.infoCards))}

      ${section("Recompensas", rewardsBlock(CONTENT.rewards))}
    </div>
  `;
}
