# Archificials AI Readiness Assessment Platform

Multi-vertical monorepo that powers embedded AI readiness assessments for different industries. Each vertical is a self-contained question set + scoring worker that gets bundled into a single IIFE script and embedded on Webflow pages.

## Repository Structure

```
archificials-assessments/
├── build.js                    # esbuild bundler (auto-discovers verticals)
├── package.json                # Build scripts per vertical
├── shared/                     # Vertical-agnostic assessment engine
│   ├── main.js                 # Boot, navigation, phase transitions, submission
│   ├── router.js               # Module routing from Q5 answer
│   ├── state.js                # Reactive state (phase, answers, scores)
│   ├── styles.js               # CSS injection (branded via CONFIG.BRAND.color)
│   └── ui.js                   # Rendering: slides, results, picker, spinner
├── verticals/
│   ├── _template/              # Copy this to start a new vertical
│   ├── law-firm/               # 9 modules (A-I), has Module I hybrid picker
│   ├── architecture/           # 8 modules (A-H), no picker
│   └── higher-ed/              # 8 modules (A-H), no picker
├── workers/                    # Cloudflare Workers (one per vertical)
│   ├── law-firm/index.js
│   ├── architecture/index.js
│   └── higher-ed/index.js
├── dist/                       # Build output (committed, served via CDN)
│   ├── law-firm-v2.js
│   ├── architecture-v2.js
│   └── higher-ed-v2.js
└── scripts/
    └── create-airtable-table.js
```

## Build System

- **Bundler:** esbuild, IIFE format, globalName `ArchificialsAssessmentV2`
- **Entry point:** `verticals/{slug}/entry.js` (each calls `boot()` from shared/main.js)
- **Output:** `dist/{slug}-v2.js`
- **Commands:**
  - `npm run build:{slug}` — production build (minified, no sourcemap)
  - `npm run watch:{slug}` — dev mode (inline sourcemap, not minified)
  - `npm run build:all` — all verticals
- **Under the hood:** `node build.js --vertical={slug}` or `node build.js --vertical={slug} --watch`

## CDN Delivery

Bundles are served via jsDelivr from git tags:
```
https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v{tag}/dist/{slug}-v2.js
```

Images (dimension icons) are also served from the same CDN:
```
https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v{tag}/verticals/{slug}/images/
```

**Current tag:** `v3.1.0` — bump the tag when adding new verticals or making changes.

## Assessment Flow (Phases)

1. **CORE** (Q1-Q5): Institution/firm name, contact info, size, type (Q5 routes to module)
2. **MODULE_I_PICKER** (law-firm only): Select 2 practice areas for hybrid module
3. **MODULE** (8 questions): Industry-specific questions based on Q5 routing
4. **CLOSING** (CL1-CL4 + OPT1-OPT2): Urgency, investment, open-ended
5. **SUBMITTING**: POST to Cloudflare Worker
6. **RESULTS**: Dimension scores, executive summary, opportunities

## Scoring Dimensions (All Verticals)

| Dimension | Weight | Config Key |
|-----------|--------|------------|
| Operational Efficiency | 0.35 | `operational` |
| Client/Student Acquisition | 0.25 | `acquisition` |
| Digital Visibility | 0.20 | `digital` |
| Practice/Institutional Readiness | 0.20 | `practice_readiness` |

## Score Tiers

All verticals use four tiers. Thresholds may vary per vertical:

| Tier | Architecture/Higher-Ed | Law Firm |
|------|----------------------|----------|
| Getting Started | 0-24 | 0-39 |
| Building Foundations | 25-49 | 40-64 |
| Accelerating | 50-74 | 65-79 |
| Leading | 75-100 | 80-100 |

## Vertical-Specific Configuration

Each vertical's `config.js` defines:
- `WORKER_URL` — Cloudflare Worker endpoint
- `ROOT_ID` — always `"ach-af-v2"` (mount point div ID)
- `routingFieldId` — Q5 field ID that determines module routing
- `payloadFieldName` — same as routingFieldId (sent in POST payload)
- `BRAND` — colors (same across verticals currently)
- `TIERS` — score tier thresholds and labels
- `WEIGHTS` — dimension weight allocation

### Routing Field IDs Per Vertical

| Vertical | routingFieldId | Q5 Options Route To |
|----------|---------------|-------------------|
| law-firm | `practice_area` | A-I (9 modules) |
| architecture | `firm_type` | A-H (8 modules) |
| higher-ed | `inst_type` | A-H (8 modules) |

### Entity Naming Conventions

| Concept | law-firm | architecture | higher-ed |
|---------|----------|-------------|-----------|
| Entity name field | `firm_name` | `firm_name` | `inst_name` |
| Entity type field | `practice_area` | `firm_type` | `inst_type` |
| Entity size field | `firm_size` | `firm_size` | `inst_size` |
| Worker validates | `firm_name` | `firm_name` | `inst_name` |

## Cloudflare Workers

Each worker at `workers/{slug}/index.js` handles:
1. CORS preflight
2. Validate required field (firm_name or inst_name)
3. POST answers to Airtable (creates record)
4. Send answers to Claude API (claude-haiku-4-5-20251001) for scoring
5. PATCH Airtable record with scores
6. Send notification email via Resend API
7. Return scores to frontend

### Worker Environment

**wrangler.toml vars:**
- `AIRTABLE_BASE_ID` — `appB7PmFnNvV3085q` (shared across verticals)
- `AIRTABLE_TABLE` — table name (e.g., "V2 Assessments", "Higher Ed V2 Assessments")
- `NOTIFY_EMAIL` — `biel@archificials.com`

**Secrets (set via `wrangler secret put`):**
- `ANTHROPIC_API_KEY`
- `AIRTABLE_API_KEY`
- `RESEND_API_KEY`

**Worker URLs:**
- law-firm: `https://law-firm-ai-scorer-v2.law-firm-ai-scorer.workers.dev`
- architecture: `https://architecture-ai-scorer-v2.law-firm-ai-scorer.workers.dev`
- higher-ed: `https://higher-ed-ai-scorer-v2.law-firm-ai-scorer.workers.dev`

**Deploy:** `cd workers/{slug} && wrangler deploy`

## Adding a New Vertical

Follow the implementation guide at:
`C:\Users\aponw\OneDrive\Documentos\Claude Workspace\projects\client-c\claude-code-vertical-implementation.md`

The master design document for each vertical (questions, modules, scoring) lives in:
`C:\Users\aponw\OneDrive\Documentos\Claude Workspace\projects\client-c\`

### Quick Checklist

1. Copy `verticals/_template/` to `verticals/{slug}/`
2. Create `config.js` — set routingFieldId, WORKER_URL, tier thresholds
3. Create `questions/core.js` — Q1-Q5, Q5 must have `autoAdvance: true` and route options matching module keys
4. Create `questions/moduleA.js` through `moduleH.js` (or I) — 8 questions each, IDs globally unique
5. Create `questions/closing.js` — CL1-CL4 + OPT1-OPT2
6. Create `modules.js` — import and wire all module files
7. Create `entry.js` — boot() call with all config
8. Create `dimImages.js` — CDN image paths with correct tag
9. Copy images from existing vertical to `images/`
10. Create `webflow_loader.html` and `test.html`
11. Add `build:{slug}` and `watch:{slug}` to package.json
12. Build: `npm run build:{slug}`, verify `dist/{slug}-v2.js`
13. Create worker at `workers/{slug}/index.js` + `wrangler.toml`
14. Create Airtable table in base `appB7PmFnNvV3085q`
15. Deploy worker: `wrangler deploy` + set 3 secrets
16. Bump git tag, push with `--tags`
17. Embed CDN script on Webflow page

### Critical Rules

- **Question IDs must be globally unique** across all modules within a vertical
- **Q5 `id` must exactly match `config.js → routingFieldId`**
- **Q5 option `route` values must match module keys in `modules.js`**
- **Module files export `{ label, questions }` where questions is an array**
- **`hasModuleIPicker: true`** only for verticals with Module I (currently law-firm only)
- **`fallbackModule`** is the default module if routing fails (typically "H")

## Shared Engine Notes

- `shared/main.js` — Do not modify per-vertical. All vertical differences come from config/questions.
- `shared/ui.js` — Renders results using `CONFIG.TIERS`, `CONFIG.WEIGHTS`, `DIM_IMAGES`
- `shared/router.js` — `buildHybridModule()` only used when `hasModuleIPicker: true`
- `shared/state.js` — Reactive; UI re-renders on any state change via `onStateChange()`
- `shared/styles.js` — CSS uses `CONFIG.BRAND.color` values; change brand colors in config.js

## Webflow Embedding

Add an HTML Embed block on the assessment page:
```html
<div id="ach-af-v2"></div>
<script src="https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v{tag}/dist/{slug}-v2.js"></script>
```

## Git Workflow

- All source + built dist files are committed (dist is needed for CDN)
- Tag releases with semver: `git tag v{x.y.z} && git push origin main --tags`
- jsDelivr caches by tag, so a new tag = instant CDN update
