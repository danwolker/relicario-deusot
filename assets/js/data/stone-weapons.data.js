// assets/js/data/stone-weapons.data.js

/**
 * Dataset do Stone System (DeusOT)
 * - Armas: níveis 1–9 (1/2/3 stones)
 * - Armaduras: níveis 1–9 (1/2/3 stones) -> mesma regra do dobro/triplo
 * - Capacetes: níveis 1–9 com stats diferentes (skill = inteiro, demais = %)
 * 
 * Imagens das stones (GIFs) por elemento: você preenche depois em stoneGifByElement.
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

/**
 * URLs dos GIFs das stones por elemento (placeholder por enquanto).
 * Você vai mandar uma a uma depois — é só preencher aqui.
 */
export const stoneGifByElement = {
  death: "",
  energy: "",
  fire: "",
  physical: "",
  holy: "",
  earth: "",
  ice: "",
};

/**
 * Percentuais por nível para Armas
 */
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

/**
 * Percentuais por nível para Armaduras
 * (seguindo a mesma regra numérica das armas, só muda o texto "Protection")
 */
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
 *  ========================= */

/**
 * Ordem/definição dos stats do capacete (rótulo para a UI)
 */
export const HELMET_STATS = [
  { key: "skill", label: "Skill Increase", kind: "int", effectIcon: "" },
  { key: "momentum", label: "Momentum Increase", kind: "pct", effectIcon: "" },
  { key: "ruse", label: "Ruse Increase", kind: "pct", effectIcon: "" },
  { key: "criticalDamage", label: "Critical Damage Increase", kind: "pct", effectIcon: "" },
  { key: "onslaught", label: "Onslaught Increase", kind: "pct", effectIcon: "" },
  { key: "criticalChance", label: "Critical Chance Increase", kind: "pct", effectIcon: "" },
  { key: "transcendence", label: "Transcendence Increase", kind: "pct", effectIcon: "" },
];

/**
 * Valores base (1 stone) por nível para Capacetes
 * A UI aplica regra:
 * 2 stones = dobro, 3 stones = triplo
 */
export const HELMET_LEVEL_VALUES = {
  1: {
    skill: 0,
    momentum: 2.0,
    ruse: 1.0,
    criticalDamage: 2.0,
    onslaught: 1.0,
    criticalChance: 1.0,
    transcendence: 1.0,
  },
  2: {
    skill: 1,
    momentum: 2.8,
    ruse: 1.4,
    criticalDamage: 2.8,
    onslaught: 1.4,
    criticalChance: 1.4,
    transcendence: 1.4,
  },
  3: {
    skill: 1,
    momentum: 4.0,
    ruse: 2.0,
    criticalDamage: 4.0,
    onslaught: 2.0,
    criticalChance: 2.0,
    transcendence: 2.0,
  },
  4: {
    skill: 2,
    momentum: 5.5,
    ruse: 2.75,
    criticalDamage: 5.5,
    onslaught: 2.75,
    criticalChance: 2.75,
    transcendence: 2.75,
  },
  5: {
    skill: 3,
    momentum: 8.0,
    ruse: 4.0,
    criticalDamage: 8.0,
    onslaught: 4.0,
    criticalChance: 4.0,
    transcendence: 4.0,
  },
  6: {
    skill: 4,
    momentum: 12.0,
    ruse: 6.0,
    criticalDamage: 12.0,
    onslaught: 6.0,
    criticalChance: 6.0,
    transcendence: 6.0,
  },
  7: {
    skill: 5,
    momentum: 20.0,
    ruse: 10.0,
    criticalDamage: 20.0,
    onslaught: 10.0,
    criticalChance: 10.0,
    transcendence: 10.0,
  },
  8: {
    skill: 10,
    momentum: 32.0,
    ruse: 16.0,
    criticalDamage: 32.0,
    onslaught: 16.0,
    criticalChance: 16.0,
    transcendence: 16.0,
  },
  9: {
    skill: 16,
    momentum: 40.0,
    ruse: 28.0,
    criticalDamage: 40.0,
    onslaught: 28.0,
    criticalChance: 28.0,
    transcendence: 28.0,
  },
};

/** =========================
 *  Helpers
 *  ========================= */

export function normalizeLevel(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 1;
  if (v < 1) return 1;
  if (v > 9) return 9;
  return v;
}

export function mult3(val, kind) {
  // kind: "pct" | "int"
  const n = Number(val) || 0;
  const v1 = n;
  const v2 = n * 2;
  const v3 = n * 3;

  if (kind === "int") {
    return {
      v1: `+${Math.round(v1)}`,
      v2: `+${Math.round(v2)}`,
      v3: `+${Math.round(v3)}`,
    };
  }

  const fmt = (x) => `+${Number(x).toFixed(2)}%`;
  return { v1: fmt(v1), v2: fmt(v2), v3: fmt(v3) };
}
