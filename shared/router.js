/**
 * Shared module router.
 * Receives MODULES map from vertical config via setModules().
 */

let _modules = {};
let _fallbackKey = "H";

export function setRouterConfig(modules, fallbackKey) {
  _modules = modules;
  _fallbackKey = fallbackKey || "H";
}

export function getModule(routeKey) {
  return _modules[routeKey] || _modules[_fallbackKey];
}

/**
 * Returns module options for multi-practice picker (Module I).
 * Excludes Module I itself from the list.
 */
export function getModuleOptions() {
  return Object.values(_modules).filter((m) => m.key !== "I");
}

/**
 * Builds a hybrid question set from two modules (4 questions from each).
 * Used for Module I (multi-practice) verticals.
 */
export function buildHybridModule(primaryKey, secondaryKey) {
  const primary = _modules[primaryKey];
  const secondary = _modules[secondaryKey];
  if (!primary || !secondary) return [];

  const pQs = primary.questions.slice(0, 4);
  const sQs = secondary.questions.slice(0, 4);
  return [...pQs, ...sQs];
}
