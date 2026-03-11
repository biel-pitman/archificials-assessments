/**
 * Law Firm Assessment v2 — entry point.
 * Wires vertical-specific config into the shared engine.
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
  hasModuleIPicker: true,
  fallbackModule: "I",
});
