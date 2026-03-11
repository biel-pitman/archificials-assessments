/**
 * ─── TEMPLATE ───
 * Copy this entire _template folder to verticals/<your-vertical>/
 * Then update every field marked with TODO.
 */
export const CONFIG = {
  /** TODO: Set your Cloudflare Worker URL */
  WORKER_URL: "https://YOUR-VERTICAL-ai-scorer-v2.YOUR-ACCOUNT.workers.dev",

  /** Root mount element ID (usually keep as-is) */
  ROOT_ID: "ach-af-v2",

  /** Version string sent with each submission */
  VERSION: "2.0.0",

  /**
   * TODO: The question ID used to route into the correct module.
   * Must match an `id` in your core.js questions.
   */
  routingFieldId: "firm_type",

  /**
   * TODO: The payload key sent to the worker for the selected module name.
   * Often the same as routingFieldId.
   */
  payloadFieldName: "firm_type",

  /** Brand colours — adjust to match the vertical's palette */
  BRAND: {
    color: {
      primary:    "#1a2b4a",
      accent:     "#e8722a",
      accentHover:"#d4621f",
      bg:         "#f8f9fa",
      card:       "#ffffff",
      border:     "#e9ecef",
      text:       "#2d3748",
      textLight:  "#6c757d",
      progressBg: "#e9ecef",
    },
  },

  /** Scoring tier boundaries and labels (match your worker's logic) */
  TIERS: [
    { min: 0,  max: 25,  label: "Nascent",    color: "#e74c3c" },
    { min: 26, max: 50,  label: "Developing",  color: "#e67e22" },
    { min: 51, max: 75,  label: "Advancing",   color: "#f1c40f" },
    { min: 76, max: 100, label: "Leading",     color: "#27ae60" },
  ],

  /** Dimension weights (must sum to 1.0) */
  WEIGHTS: {
    operational:        0.25,
    acquisition:        0.25,
    digital:            0.25,
    practice_readiness: 0.25,
  },
};
