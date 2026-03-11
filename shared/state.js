/**
 * Shared reactive state manager.
 * Identical across all verticals — no vertical-specific logic.
 */

const listeners = [];

export const state = {
  phase: "CORE",
  slideIndex: 0,
  slides: [],
  selectedModule: null,
  moduleName: "",
  moduleIPrimary: null,
  moduleISecondary: null,
  answers: {},
  scores: null,
  error: null,
  slideOffset: 0,
  totalAllSlides: 0,
  isSubmitting: false,
};

export function updateState(partial) {
  Object.assign(state, partial);
  listeners.forEach((fn) => fn(state));
}

export function onStateChange(fn) {
  listeners.push(fn);
}

export function setAnswer(id, value) {
  state.answers = { ...state.answers, [id]: value };
}

export function getTotalSlides() {
  return state.totalAllSlides;
}

export function getGlobalIndex() {
  return state.slideOffset + state.slideIndex;
}

export function getCurrentSlide() {
  return state.slides[state.slideIndex];
}

export function getProgress() {
  const total = getTotalSlides();
  if (!total) return 0;
  return Math.round((getGlobalIndex() / total) * 100);
}
