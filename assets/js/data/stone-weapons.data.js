// assets/js/data/stone-weapons.data.js

/**
 * Dataset do Stone System (DeusOT)
 * - Armas: níveis 1–9 (1/2/3 stones)
 * - Armaduras: níveis 1–9 (1/2/3 stones)
 * - Capacetes: níveis 1–9
 *   - skill = inteiro (+0, +1, etc.)
 *   - demais = porcentagem
 *
 * GIFs das stones:
 * - Por elemento e por nível (nv0..nv9 para Death no upgrade, demais 1..9)
 */

/** =========================
 *  ARMAS
 *  ========================= */

export const ELEMENTS_WEAPONS = [
  { key: "death", label: "Death Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/9/9c/Cursed_Icon.gif" },
  { key: "energy", label: "Energy Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/3/30/Electrified_Icon.gif" },
  { key: "fire", label: "Fire Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/f/fb/Burning_Icon.gif" },
  { key: "physical", label: "Physical Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/7/74/F%C3%ADsico.png" },
  { key: "holy", label: "Holy Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/3/38/Dazzled_Icon.gif" },
  { key: "earth", label: "Earth Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/5/5e/Poisoned_Icon.gif" },
  { key: "ice", label: "Ice Extra Damage", effectIcon: "https://www.tibiawiki.com.br/images/8/88/Freezing_Icon.gif" },
];

/** =========================
 *  ARMADURAS
 *  ========================= */

export const ELEMENTS_ARMORS = [
  { key: "death", label: "Death Protection", effectIcon: "https://www.tibiawiki.com.br/images/9/9c/Cursed_Icon.gif" },
  { key: "energy", label: "Energy Protection", effectIcon: "https://www.tibiawiki.com.br/images/3/30/Electrified_Icon.gif" },
  { key: "fire", label: "Fire Protection", effectIcon: "https://www.tibiawiki.com.br/images/f/fb/Burning_Icon.gif" },
  { key: "physical", label: "Physical Protection", effectIcon: "https://www.tibiawiki.com.br/images/7/74/F%C3%ADsico.png" },
  { key: "holy", label: "Holy Protection", effectIcon: "https://www.tibiawiki.com.br/images/3/38/Dazzled_Icon.gif" },
  { key: "earth", label: "Earth Protection", effectIcon: "https://www.tibiawiki.com.br/images/5/5e/Poisoned_Icon.gif" },
  { key: "ice", label: "Ice Protection", effectIcon: "https://www.tibiawiki.com.br/images/8/88/Freezing_Icon.gif" },
];

/** =========================
 *  GIFs por nível (stones)
 *  ========================= */

export const stoneGifByElement = {
  death: {
    0: "/assets/img/pretanv0.gif",
    1: "/assets/img/pretanv1.gif",
    2: "/assets/img/pretanv2.gif",
    3: "/assets/img/pretanv3.gif",
    4: "/assets/img/pretanv4.gif",
    5: "/assets/img/pretanv5.gif",
    6: "/assets/img/pretanv6.gif",
    7: "/assets/img/pretanv7.gif",
    8: "/assets/img/pretanv8.gif",
    9: "/assets/img/pretanv9.gif",
  },
  energy: {
    1: "/assets/img/roxanv1.gif",
    2: "/assets/img/roxanv2.gif",
    3: "/assets/img/roxanv3.gif",
    4: "/assets/img/roxanv4.gif",
    5: "/assets/img/roxanv5.gif",
    6: "/assets/img/roxanv6.gif",
    7: "/assets/img/roxanv7.gif",
    8: "/assets/img/roxanv8.gif",
    9: "/assets/img/roxanv9.gif",
  },
  fire: {
    1: "/assets/img/vermelhanv1.gif",
    2: "/assets/img/vermelhanv2.gif",
    3: "/assets/img/vermelhanv3.gif",
    4: "/assets/img/vermelhanv4.gif",
    5: "/assets/img/vermelhanv5.gif",
    6: "/assets/img/vermelhanv6.gif",
    7: "/assets/img/vermelhanv7.gif",
    8: "/assets/img/vermelhanv8.gif",
    9: "/assets/img/vermelhanv9.gif",
  },
  physical: {
    1: "/assets/img/brancanv1.gif",
    2: "/assets/img/brancanv2.gif",
    3: "/assets/img/brancanv3.gif",
    4: "/assets/img/brancanv4.gif",
    5: "/assets/img/brancanv5.gif",
    6: "/assets/img/brancanv6.gif",
    7: "/assets/img/brancanv7.gif",
    8: "/assets/img/brancanv8.gif",
    9: "/assets/img/brancanv9.gif",
  },
  holy: {
    1: "/assets/img/amarelanv1.gif",
    2: "/assets/img/amarelanv2.gif",
    3: "/assets/img/amarelanv3.gif",
    4: "/assets/img/amarelanv4.gif",
    5: "/assets/img/amarelanv5.gif",
    6: "/assets/img/amarelanv6.gif",
    7: "/assets/img/amarelanv7.gif",
    8: "/assets/img/amarelanv8.gif",
    9: "/assets/img/amarelanv9.gif",
  },
  earth: {
    1: "/assets/img/verdenv1.gif",
    2: "/assets/img/verdenv2.gif",
    3: "/assets/img/verdenv3.gif",
    4: "/assets/img/verdenv4.gif",
    5: "/assets/img/verdenv5.gif",
    6: "/assets/img/verdenv6.gif",
    7: "/assets/img/verdenv7.gif",
    8: "/assets/img/verdenv8.gif",
    9: "/assets/img/verdenv9.gif",
  },
  ice: {
    1: "/assets/img/azulnv1.gif",
    2: "/assets/img/azulnv2.gif",
    3: "/assets/img/azulnv3.gif",
    4: "/assets/img/azulnv4.gif",
    5: "/assets/img/azulnv5.gif",
    6: "/assets/img/azulnv6.gif",
    7: "/assets/img/azulnv7.gif",
    8: "/assets/img/azulnv8.gif",
    9: "/assets/img/azulnv9.gif",
  },
};

/** =========================
 *  Normalizadores
 *  ========================= */

// (Porcentagens: 1..9)
export function normalizeLevel(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 1;
  if (v < 1) return 1;
  if (v > 9) return 9;
  return v;
}

// (Upgrade: 0..9)
export function normalizeStoneLevel(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  if (v > 9) return 9;
  return v;
}

/**
 * Helper: gif do elemento por nível (0..9 quando existir).
 */
export function getStoneGif(elementKey, level) {
  const lvl = normalizeStoneLevel(level);
  const map = stoneGifByElement?.[elementKey];
  if (!map) return "";

  if (map[lvl]) return map[lvl];
  if (lvl === 0 && map[1]) return map[1];
  return "";
}

/** =========================
 *  TABELA DE PREÇOS (UPGRADE)
 *  ========================= */

export const STONE_UPGRADE_PRICES = [
  { from: 0, to: 1, cost: "1kk + 3x", chance: "100%" },
  { from: 1, to: 2, cost: "2kk + 3x", chance: "90%" },
  { from: 2, to: 3, cost: "5kk + 3x", chance: "80%" },
  { from: 3, to: 4, cost: "10kk + 3x", chance: "60%" },
  { from: 4, to: 5, cost: "20kk + 3x", chance: "55%" },
  { from: 5, to: 6, cost: "40kk + 3x", chance: "50%" },
  { from: 6, to: 7, cost: "75kk + 3x", chance: "45%" },
  { from: 7, to: 8, cost: "200kk + 3x", chance: "40%" },
  { from: 8, to: 9, cost: "600kk + 3x", chance: "35%" },
];

export function getUpgradePriceRows() {
  return STONE_UPGRADE_PRICES.map((r) => {
    const chanceStr = (r.chance ?? "").toString().trim();

    const pct = Number(chanceStr.replace("%", "").trim());
    let tone = "is-warn";
    if (Number.isFinite(pct)) {
      if (pct >= 80) tone = "is-good";
      else if (pct >= 40) tone = "is-warn";
      else tone = "is-bad";
    }

    return {
      from: normalizeStoneLevel(r.from),
      to: normalizeStoneLevel(r.to),
      cost: (r.cost || "—").trim(),
      chance: chanceStr || "—",
      tone,
    };
  });
}

/** =========================
 *  Percentuais por nível
 *  ========================= */

export const WEAPON_LEVEL_VALUES = {
  1: { v1: "1.00%", v2: "+2.00%", v3: "+3.00%" },
  2: { v1: "+1.40%", v2: "+2.80%", v3: "+4.20%" },
  3: { v1: "+2.00%", v2: "+4.00%", v3: "+6.00%" },
  4: { v1: "+2.75%", v2: "+5.50%", v3: "+8.25%" },
  5: { v1: "+4.00%", v2: "+8.00%", v3: "+12.00%" },
  6: { v1: "+6.00%", v2: "+12.00%", v3: "+18.00%" },
  7: { v1: "+10.00%", v2: "+20.00%", v3: "+30.00%" },
  8: { v1: "+16.00%", v2: "+32.00%", v3: "+48.00%" },
  9: { v1: "+28.00%", v2: "+56.00%", v3: "+112.00%" },
};

export const ARMOR_LEVEL_VALUES = {
  1: { v1: "1.00%", v2: "+2.00%", v3: "+3.00%" },
  2: { v1: "+1.40%", v2: "+2.80%", v3: "+4.20%" },
  3: { v1: "+2.00%", v2: "+4.00%", v3: "+6.00%" },
  4: { v1: "+2.75%", v2: "+5.50%", v3: "+8.25%" },
  5: { v1: "+4.00%", v2: "+8.00%", v3: "+12.00%" },
  6: { v1: "+6.00%", v2: "+12.00%", v3: "+18.00%" },
  7: { v1: "+10.00%", v2: "+20.00%", v3: "+30.00%" },
  8: { v1: "+16.00%", v2: "+32.00%", v3: "+48.00%" },
  9: { v1: "+28.00%", v2: "+56.00%", v3: "+112.00%" },
};

/** =========================
 *  CAPACETES
 *  - agora com effectIcon + stone correta por atributo
 *  ========================= */

// Stat -> elemento/stone (cor) conforme sua regra
export const HELMET_STONE_ELEMENT_BY_STAT = {
  skill: "death",            // preta
  momentum: "energy",        // roxa
  ruse: "fire",              // vermelha
  criticalDamage: "physical",// branca
  onslaught: "holy",         // amarela
  criticalChance: "earth",   // verde
  transcendence: "ice",      // azul
};

export const HELMET_STATS = [
  {
    key: "skill",
    label: "Skill Increase",
    kind: "int",
    effectIcon: "https://www.tibiawiki.com.br/images/7/79/Strengthened_Flash_Icon.gif",
  },
  {
    key: "momentum",
    label: "Momentum Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/2/28/Momentum.gif",
  },
  {
    key: "ruse",
    label: "Ruse Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/5/59/Ruse.gif",
  },
  {
    key: "criticalDamage",
    label: "Critical Damage Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/3/39/Ray_Guild.gif",
  },
  {
    key: "onslaught",
    label: "Onslaught Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/4/4a/Onslaught.gif",
  },
  {
    key: "criticalChance",
    label: "Critical Chance Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/3/39/Ray_Guild.gif",
  },
  {
    key: "transcendence",
    label: "Transcendence Increase",
    kind: "pct",
    effectIcon: "https://www.tibiawiki.com.br/images/2/29/Tick.png",
  },
];

export const HELMET_LEVEL_VALUES = {
  1: { skill: 0, momentum: 2.0, ruse: 1.0, criticalDamage: 2.0, onslaught: 1.0, criticalChance: 1.0, transcendence: 1.0 },
  2: { skill: 1, momentum: 2.8, ruse: 1.4, criticalDamage: 2.8, onslaught: 1.4, criticalChance: 1.4, transcendence: 1.4 },
  3: { skill: 1, momentum: 4.0, ruse: 2.0, criticalDamage: 4.0, onslaught: 2.0, criticalChance: 2.0, transcendence: 2.0 },
  4: { skill: 2, momentum: 5.5, ruse: 2.75, criticalDamage: 5.5, onslaught: 2.75, criticalChance: 2.75, transcendence: 2.75 },
  5: { skill: 3, momentum: 8.0, ruse: 4.0, criticalDamage: 8.0, onslaught: 4.0, criticalChance: 4.0, transcendence: 4.0 },
  6: { skill: 4, momentum: 12.0, ruse: 6.0, criticalDamage: 12.0, onslaught: 6.0, criticalChance: 6.0, transcendence: 6.0 },
  7: { skill: 5, momentum: 20.0, ruse: 10.0, criticalDamage: 20.0, onslaught: 10.0, criticalChance: 10.0, transcendence: 10.0 },
  8: { skill: 10, momentum: 32.0, ruse: 16.0, criticalDamage: 32.0, onslaught: 16.0, criticalChance: 16.0, transcendence: 16.0 },
  9: { skill: 16, momentum: 40.0, ruse: 28.0, criticalDamage: 40.0, onslaught: 28.0, criticalChance: 28.0, transcendence: 28.0 },
};

export function mult3(val, kind) {
  const n = Number(val) || 0;
  const v1 = n;
  const v2 = n * 2;
  const v3 = n * 3;

  if (kind === "int") {
    return { v1: `+${Math.round(v1)}`, v2: `+${Math.round(v2)}`, v3: `+${Math.round(v3)}` };
  }

  const fmt = (x) => `+${Number(x).toFixed(2)}%`;
  return { v1: fmt(v1), v2: fmt(v2), v3: fmt(v3) };
}
