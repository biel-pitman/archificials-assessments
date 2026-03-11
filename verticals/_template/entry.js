/**
 * ─── TEMPLATE ───
 * TODO: Update imports and boot() options for your vertical.
 */
import { boot } from "../../shared/main.js";
import { CONFIG } from "./config.js";
import { CORE_QUESTIONS } from "./questions/core.js";
import { CLOSING_QUESTIONS } from "./questions/closing.js";
import { MODULES } from "./modules.js";
import { DIM_IMAGES } from "./dimImages.js";

boot({
  CONFIG,
  CORE_QUESTIONS,
  CLOSING_QUESTIONS,
  MODULES,
  DIM_IMAGES,
  hasModuleIPicker: false,   // set true only if this vertical needs a Module I hybrid picker
  fallbackModule: "H",       // default module if routing answer doesn't match any option
});
