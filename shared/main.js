/**
 * Shared assessment engine.
 * Each vertical calls boot(verticalConfig) to start.
 *
 * verticalConfig shape:
 *   CONFIG          - vertical config (WORKER_URL, ROOT_ID, BRAND, TIERS, WEIGHTS, routingFieldId, payloadFieldName)
 *   CORE_QUESTIONS  - array of core questions
 *   CLOSING_QUESTIONS - array of closing questions
 *   MODULES         - { A: { key, name, questions }, B: ... }
 *   DIM_IMAGES      - { operational, acquisition, digital, practice_readiness }
 *   hasModuleIPicker - (optional) true if vertical has Module I hybrid picker
 *   fallbackModule  - (optional) fallback module key, default "H"
 */
import { state, updateState, setAnswer } from "./state.js";
import { setStyleConfig, injectStyles } from "./styles.js";
import { setRouterConfig, getModule, getModuleOptions, buildHybridModule } from "./router.js";
import {
  setUIConfig,
  setRoot,
  renderSlide,
  renderSubmitting,
  renderResults,
  renderError,
  renderModuleIPicker,
} from "./ui.js";

let V = null; // vertical config

export function boot(verticalConfig) {
  V = verticalConfig;

  // Wire shared modules with vertical-specific data
  setStyleConfig(V.CONFIG);
  setRouterConfig(V.MODULES, V.fallbackModule || "H");
  setUIConfig(V.CONFIG, V.DIM_IMAGES);

  // Auto-mount
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
}

function mount() {
  const root = document.getElementById(V.CONFIG.ROOT_ID);
  if (!root) {
    console.warn(`[Archificials V2] Mount element #${V.CONFIG.ROOT_ID} not found.`);
    return;
  }

  injectStyles();
  setRoot(root);

  updateState({
    phase: "CORE",
    slideIndex: 0,
    slides: V.CORE_QUESTIONS,
    slideOffset: 0,
    totalAllSlides: 0,
  });

  renderSlide();
  bindNavigation(root);
}

// ─── Navigation controller ──────────────────────────────────────

function bindNavigation(root) {
  root.addEventListener("af-navigate", (e) => {
    const { action } = e.detail;
    if (action === "next") handleNext(root);
    else if (action === "prev") handlePrev(root);
    else if (action === "retry") handleRetry(root);
  });

  // Module I picker event (only fires for verticals with hasModuleIPicker)
  root.addEventListener("af-module-i-selected", (e) => {
    const { primary, secondary } = e.detail;
    handleModuleISelection(root, primary, secondary);
  });
}

function handleNext(root) {
  const slide = state.slides[state.slideIndex];

  if (slide && slide.required) {
    const answer = state.answers[slide.id];
    if (!answer || answer === "") return;
  }

  if (slide && slide.type === "email") {
    const email = state.answers[slide.id] || "";
    if (!isValidEmail(email)) return;
  }

  if (state.slideIndex >= state.slides.length - 1) {
    advancePhase(root);
    return;
  }

  updateState({ slideIndex: state.slideIndex + 1 });
  renderSlide();
  scrollToTop();
}

function handlePrev(root) {
  if (state.slideIndex > 0) {
    updateState({ slideIndex: state.slideIndex - 1 });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "CLOSING") {
    const mod = getModule(state.selectedModule);
    let moduleQs;
    if (V.hasModuleIPicker && state.selectedModule === "I" && state.moduleIPrimary) {
      moduleQs = buildHybridModule(state.moduleIPrimary, state.moduleISecondary);
    } else {
      moduleQs = mod.questions;
    }
    updateState({
      phase: "MODULE",
      slides: moduleQs,
      slideIndex: moduleQs.length - 1,
      slideOffset: 0,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "MODULE") {
    updateState({
      phase: "CORE",
      slides: V.CORE_QUESTIONS,
      slideIndex: V.CORE_QUESTIONS.length - 1,
      slideOffset: 0,
    });
    renderSlide();
    scrollToTop();
  }
}

function handleRetry(root) {
  updateState({ error: null, isSubmitting: false });
  updateState({
    phase: "CLOSING",
    slides: V.CLOSING_QUESTIONS,
    slideIndex: V.CLOSING_QUESTIONS.length - 1,
  });
  renderSlide();
}

// ─── Phase transitions ──────────────────────────────────────────

function advancePhase(root) {
  if (state.phase === "CORE") {
    const routingFieldId = V.CONFIG.routingFieldId || "firm_type";
    const routingAnswer = state.answers[routingFieldId];
    const routeKey = getRouteKey(routingAnswer, routingFieldId);

    updateState({
      selectedModule: routeKey,
      moduleName: getModule(routeKey).name,
    });

    // Module I needs secondary picker (law firm vertical)
    if (V.hasModuleIPicker && routeKey === "I") {
      updateState({ phase: "MODULE_I_PICKER" });
      renderModuleIPicker(getModuleOptions());
      scrollToTop();
      return;
    }

    const mod = getModule(routeKey);
    const totalAll = mod.questions.length + V.CLOSING_QUESTIONS.length;
    updateState({
      phase: "MODULE",
      slides: mod.questions,
      slideIndex: 0,
      slideOffset: 0,
      totalAllSlides: totalAll,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "MODULE") {
    updateState({
      phase: "CLOSING",
      slides: V.CLOSING_QUESTIONS,
      slideIndex: 0,
      slideOffset: state.slides.length,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "CLOSING") {
    submitAssessment(root);
  }
}

function handleModuleISelection(root, primaryKey, secondaryKey) {
  updateState({ moduleIPrimary: primaryKey, moduleISecondary: secondaryKey });
  setAnswer("module_i_primary", primaryKey);
  setAnswer("module_i_secondary", secondaryKey);

  const hybridQs = buildHybridModule(primaryKey, secondaryKey);
  const totalAll = hybridQs.length + V.CLOSING_QUESTIONS.length;
  updateState({
    phase: "MODULE",
    slides: hybridQs,
    slideIndex: 0,
    slideOffset: 0,
    totalAllSlides: totalAll,
  });
  renderSlide();
  scrollToTop();
}

// ─── Route key extraction ───────────────────────────────────────

function getRouteKey(answer, routingFieldId) {
  const q5 = V.CORE_QUESTIONS.find((q) => q.id === routingFieldId);
  const fallback = V.fallbackModule || "H";
  if (!q5) return fallback;

  const match = q5.options.find((opt) => {
    const label = typeof opt === "string" ? opt : opt.label;
    return label === answer;
  });

  return match && match.route ? match.route : fallback;
}

// ─── Submission ─────────────────────────────────────────────────

async function submitAssessment(root) {
  updateState({ phase: "SUBMITTING", isSubmitting: true });
  renderSubmitting();
  scrollToTop();

  try {
    const payloadFieldName = V.CONFIG.payloadFieldName || "firm_type";
    const payload = {
      ...state.answers,
      version: V.CONFIG.VERSION,
      [payloadFieldName]: state.moduleName,
      module_key: state.selectedModule,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(V.CONFIG.WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error (${res.status}): ${text}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    updateState({ phase: "RESULTS", scores: data.scores || data, isSubmitting: false });
    renderResults(state.scores);
    scrollToTop();
  } catch (err) {
    console.error("[Archificials V2] Submission error:", err);
    updateState({ phase: "CLOSING", error: err.message, isSubmitting: false });
    renderError(err.message || "We were unable to process your assessment. Please try again.");
  }
}

// ─── Helpers ────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function scrollToTop() {
  const el = document.getElementById(V.CONFIG.ROOT_ID);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
