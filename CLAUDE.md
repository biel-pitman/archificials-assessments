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

**Current tag:** `v3.2.0` — bump the tag when adding new verticals or making changes.

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
- Branch: `master` (not main)
- Tag releases with semver: `git tag v{x.y.z} && git push origin master --tags`
- jsDelivr caches by tag, so a new tag = instant CDN update

---

## Report Generation Pipeline

Post-assessment pipeline that generates branded AI readiness presentations and service proposals. Built across 5 separate sessions.

### Architecture Overview

```
Assessment Worker → Email with [Generate Report] button
  → Report Orchestrator Worker (validates HMAC, fetches Airtable, runs Brave Search + Claude API)
    → Research outputs: market analysis, deployment scenarios, meeting brief
    → Assembler: research JSON → reveal.js HTML presentation
    → Upload to R2 bucket
    → Report Gateway Worker serves password-protected presentation
  → Biel receives: report URL + password + meeting brief via email
  → After client meeting: CLI generates branded DOCX proposal
```

### Directory Structure (New)

```
reports/
├── engine/                # Session 1 ✓ COMPLETE
│   ├── template.html      # reveal.js 5.x template (16:9, self-contained, branded)
│   ├── charts.js          # 7 Plotly chart utility functions
│   └── assembler.js       # Maps research JSON → reveal.js slides (Session 3)
├── research/              # Session 2
│   ├── market-analysis.js # Brave Search + Claude prompt builder
│   ├── deployment-scenarios.js # 4 scenario prompt builder
│   └── meeting-brief.js   # Internal meeting prep prompt builder
├── proposal/              # Session 5
│   ├── template.js        # Branded DOCX template (docx-js)
│   ├── generator.js       # Content → DOCX assembly
│   └── cli.js             # CLI tool for proposal generation
├── test-report.html       # Test demo report (for gateway verification)
└── images/                # Session 3+
    ├── higher-ed/         # 18 presentation images per vertical
    └── law-firm/

workers/
├── report-gateway/        # Session 1 ✓ COMPLETE
│   ├── index.js          # Password-protected report serving from R2
│   └── wrangler.toml     # Cloudflare config
├── report-orchestrator/   # Session 2
│   ├── index.js
│   └── wrangler.toml
└── (assessment workers)   # Existing — Modified in Session 4 only
```

### Workers (New)

| Worker | Purpose | URL |
|--------|---------|-----|
| `report-gateway` | Serves password-protected reports from R2 | Set after deploy |
| `report-orchestrator` | Brain of the pipeline: research + assembly | Set after deploy |

### Report Gateway Worker
- Serves HTML presentations from R2 bucket `archificials-reports`
- Password protection: checks SHA-256 hash stored in R2 object metadata
- Session: sets `report_auth` cookie (24h) after correct password
- Routes: `GET /r/{slug}` → password page or presentation
- Password form: branded Archificials UI (navy/orange)
- **Status:** ✓ Built and ready to deploy (see DEPLOYMENT.md)

### Report Orchestrator Worker
- Trigger: `POST /generate?id=RECORD_ID&vertical=SLUG&t=TIMESTAMP&token=HMAC`
- HMAC validation: SHA-256 of `{id}:{timestamp}` with shared REPORT_SECRET (7-day expiry)
- Pipeline: validate → fetch Airtable → Brave Search (5 queries) → Claude API (3 calls) → assemble HTML → upload R2 → email
- Claude model: `claude-sonnet-4-20250514` (research quality)
- Brave Search: free tier, 1000 queries/month

### Secrets Required

| Secret | Workers |
|--------|---------|
| `ANTHROPIC_API_KEY` | All assessment workers + report-orchestrator |
| `AIRTABLE_API_KEY` | All assessment workers + report-orchestrator |
| `RESEND_API_KEY` | All assessment workers + report-orchestrator |
| `BRAVE_API_KEY` | report-orchestrator only |
| `REPORT_SECRET` | All assessment workers + report-orchestrator (must be identical) |

### Presentation Specs
- **Engine:** reveal.js 5.x, 16:9 aspect ratio
- **Charts:** Plotly.js (7 types: radar, bar, gauge, comparison, ROI line, Gantt, cost table)
- **Slides:** ~30 per report (title, divider, content, chart, split layouts)
- **Sources:** Every data claim must have a `[Source: URL]` citation
- **PDF export:** Append `?print-pdf` to report URL, browser Print → Save as PDF
- **Images:** 18 per vertical, served via jsDelivr CDN

### Proposal Generator
- **Format:** Branded DOCX (US Letter, docx-js)
- **Structure:** Cover, TOC, executive summary, about Archificials, assessment results, chosen deployment scenario, pricing, terms, appendices
- **CLI:** `npm run generate:proposal -- --report-slug=CLIENT --scenario=C --output=./proposal.docx`
- **Input:** Research data from R2 + chosen scenario letter (A/B/C/D)

### Brand Guidelines (Report Pipeline)
- Primary: `#1a1a2e` (navy) — headings, headers, table headers
- Accent: `#e27308` (orange) — buttons, highlights, chart accents, bullet markers
- Background: `#f8f9fa` (light gray) — content slide backgrounds
- Text: `#333333` (dark gray) — body text
- Divider slides: dark navy background with orange accents
- Content slides: light background with navy headings

### Planning Documents

All session instructions and specifications are stored at:
`C:\Users\aponw\OneDrive\Documentos\Claude Workspace\projects\client-c\`

| Document | Purpose |
|----------|---------|
| `report-pipeline-roadmap.md` | Master architecture, tech stack, brand specs, security model |
| `report-pipeline-session-1.md` | Infrastructure & brand template |
| `report-pipeline-session-2.md` | Research pipeline (Brave + Claude) |
| `report-pipeline-session-3.md` | Presentation assembly & deployment |
| `report-pipeline-session-4.md` | Trigger integration & E2E testing |
| `report-pipeline-session-5.md` | Proposal document generator |
| `report-pipeline-images.md` | 18 image specifications per vertical |

### Pipeline Status
- [x] Session 1: Infrastructure & brand template
- [x] Session 2: Research pipeline
- [x] Session 3: Presentation assembly
- [ ] Session 4: Trigger integration
- [ ] Session 5: Proposal generator

### Session 1 Deliverables (COMPLETE)

✓ **reveal.js Template** (`reports/engine/template.html`)
- 16:9 aspect ratio (1920x1080)
- Archificials brand colors and typography
- Keyboard navigation (arrows, ESC for overview)
- Hash-based slide URLs for direct linking
- Print-friendly CSS for PDF export (`?print-pdf`)
- Placeholder tokens for assembler: `{{CLIENT_NAME}}`, `{{DATE}}`, `{{SLIDES_HTML}}`, `{{CHARTS_JSON}}`
- Sample branded slides showing title, divider, content, and CTA layouts
- Slide footer with "Confidential — Prepared for {{CLIENT_NAME}} by Archificials"

✓ **Plotly Chart Utilities** (`reports/engine/charts.js`)
- 7 chart functions for data visualization
  1. Dimension Radar Chart — Spider plot of 4 AI readiness dimensions
  2. Dimension Bar Chart — Horizontal bars with tier color coding
  3. Tier Gauge Chart — Overall score gauge (0-100) with color zones
  4. Market Comparison Chart — Client vs industry average (5 categories)
  5. ROI Projection Chart — Cumulative value over time (24 months)
  6. Implementation Timeline — Gantt chart for 4 deployment phases
  7. Cost Comparison Table — Scenario costs and timelines
- All charts use Archificials brand colors (navy primary, orange accent)
- Plotly layout defaults with transparent backgrounds
- Auto-initialization on DOM ready

✓ **Report Gateway Worker** (`workers/report-gateway/`)
- Cloudflare Worker for password-protected report serving
- Routes: `GET /r/:slug`, `POST /r/:slug/auth`, `GET /r/:slug/pdf`, `GET /health`
- Password validation via SHA-256 hashes stored in R2 metadata
- Auth cookies (24-hour expiry, HTTPOnly, Secure, SameSite=Strict)
- Branded password form (Archificials colors, mobile-friendly)
- PDF export support (reveal.js `?print-pdf` parameter)
- R2 bucket integration via wrangler config
- Ready to deploy to Cloudflare

✓ **Deployment Guide** (`DEPLOYMENT.md`)
- Prerequisites (Wrangler CLI, Cloudflare account)
- Step-by-step deployment instructions
- R2 bucket creation commands
- Test report upload with password hashing
- Gateway verification tests
- Custom domain setup (optional)
- Troubleshooting guide
- Session 2 integration notes

✓ **Test Report** (`reports/test-report.html`)
- Minimal 5-slide reveal.js presentation
- Title, overview, score card, CTA, and closing slides
- Plotly bar chart example
- Fully functional for gateway verification

### Session 2 Deliverables (COMPLETE)

✓ **Market Analysis Prompt Builder** (`reports/research/market-analysis.js`)
- `buildSearchQueries(assessmentData)` — Generates 5 Brave Search queries tailored to industry and organization
- `buildMarketAnalysisPrompt(assessmentData, searchResults)` — Constructs Claude prompt for market analysis
- Outputs: Industry overview, competitor landscape, market size, tool landscape, gaps/opportunities, regulatory compliance
- All claims cited with `[Source: URL]`
- Returns structured JSON with industry trends, adoption rates, competitive examples, market tools

✓ **Deployment Scenarios Prompt Builder** (`reports/research/deployment-scenarios.js`)
- `buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis)` — Generates 4 deployment scenarios
- Scenario A: Off-the-Shelf AI Stack (quick wins, lowest risk)
- Scenario B: Custom AI Platform (Archificials-built, highest long-term ROI)
- Scenario C: Hybrid Approach (RECOMMENDED — balance of speed and customization)
- Scenario D: AI-First Transformation (maximum competitive advantage)
- Each scenario includes tools, timeline, costs, strengths/weaknesses, ROI projections
- Returns structured JSON with implementation phases and cost breakdowns

✓ **Meeting Brief Prompt Builder** (`reports/research/meeting-brief.js`)
- `buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios)` — Internal prep document for Biel
- Includes: Executive summary, pain points, competitive context, recommended scenario, objection handling, budget positioning, staffing analysis, meeting agenda
- Strategic and tactical guidance (not client-facing)
- Returns structured JSON with conversation starters, objection responses, scenario recommendation rationale

✓ **Report Orchestrator Worker** (`workers/report-orchestrator/`)
- Cloudflare Worker that orchestrates the entire research pipeline
- **Routes:**
  - `POST /generate?id=RECORD_ID&vertical=SLUG&t=TIMESTAMP&token=HMAC` — Main orchestration endpoint
  - `GET /status/:id` — Check generation status (placeholder for KV store)
  - `GET /health` — Health check
- **Flow:**
  1. Validates HMAC-SHA256 token (7-day expiry)
  2. Fetches assessment record from Airtable based on vertical
  3. Runs 5 Brave Search queries in parallel
  4. Calls Claude API (claude-sonnet-4-20250514) for market analysis
  5. Calls Claude API for deployment scenarios
  6. Calls Claude API for meeting brief
  7. Stores all results in R2 as `/reports/{slug}/research.json`
  8. Sends notification email with meeting brief HTML + research summary
  9. Returns success JSON to client
- Error handling for all external API failures
- Test mode flag (`?test=true`) for development without HMAC validation

✓ **wrangler.toml Configuration** (`workers/report-orchestrator/wrangler.toml`)
- R2 bucket binding: `REPORTS_BUCKET` → `archificials-reports`
- Environment variables: `AIRTABLE_BASE_ID`, `NOTIFY_EMAIL`, `CLAUDE_MODEL`, `MAX_TOKENS`
- Secrets to set: `ANTHROPIC_API_KEY`, `AIRTABLE_API_KEY`, `BRAVE_API_KEY`, `RESEND_API_KEY`, `REPORT_SECRET`

✓ **Test Report** (`reports/test-report.html`)
- Minimal 5-slide reveal.js presentation
- Title, overview, score card, CTA, and closing slides
- Plotly bar chart example
- Fully functional for gateway verification

### Deployment Instructions

**Next steps for deployment:**

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install -g wrangler@latest
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler login
   # or set CLOUDFLARE_API_TOKEN environment variable
   ```

3. **Create R2 Bucket**:
   ```bash
   wrangler r2 bucket create archificials-reports
   ```

4. **Deploy Report Gateway Worker**:
   ```bash
   cd workers/report-gateway
   wrangler deploy
   ```

5. **Test with Demo Report**:
   - Follow instructions in `DEPLOYMENT.md` under "Step 4: Upload Test Report"
   - Password: `test-password123`
   - Test URL: `https://report-gateway.<account>.workers.dev/r/test-demo`

**Full instructions:** See [DEPLOYMENT.md](DEPLOYMENT.md)

### Session 3 Deliverables (COMPLETE)

✓ **Presentation Assembler** (`reports/engine/assembler.js`)
- Transforms market analysis, deployment scenarios, meeting brief, and assessment answers into a full reveal.js presentation
- Includes slide generator helpers, content/slide templates, and dynamic chart configuration logic
- Avoids inlining large JS by generating chart utilities at runtime via `generateChartsUtilities()`
- Replaces template tokens: `{{CLIENT_NAME}}`, `{{DATE}}`, `{{SLIDES_HTML}}`, `{{CHARTS_UTILITIES}}`, `{{CHARTS_JSON}}`
- Self‑contained output suitable for R2 storage and gateway serving

✓ **Orchestrator Integration** (`workers/report-orchestrator/index.js`)
- Imports and invokes `assemblePresentation()` after research steps
- Generates slug and password, uploads HTML to R2 with metadata
- Includes link/password in notification email to Biel
- Updated build script and `wrangler.toml` to bundle assembler code

✓ **Build & Packaging**
- Added `npm run build:report-orchestrator` script
- Fixed earlier bundling errors by exporting chart functions and avoiding unescaped literals
- Worker now compiles cleanly without warnings


### Handoff to Session 4

Session 4 will integrate the orchestrator endpoint with the assessment worker trigger, perform end‑to‑end testing, and handle status tracking. The fully assembled presentation HTML and metadata generated in Session 3 will be consumed by the gateway and later the proposal generator.

The research outputs from this session feed directly into Session 3's assembly pipeline.

### Trigger Integration
- All 3 assessment workers now include [Generate Report] button in notification emails
- Button URL contains HMAC-signed token (7-day expiry)
- REPORT_SECRET must be identical across all assessment workers + report-orchestrator

### Image Assets
- `reports/images/{vertical}/` — Presentation images per vertical
- Served via jsDelivr CDN at @v3.2.0 tag

### Current Tag: v3.2.0

### End-to-End Flow (Production)
1. Client submits assessment on Webflow
2. Scoring worker processes, stores in Airtable, emails Biel
3. Biel clicks [Generate Report] in email
4. Report orchestrator: validates → searches → researches → assembles → uploads
5. Biel receives URL + password + meeting brief
6. Client views presentation at password-protected URL
7. PDF downloadable via ?print-pdf

### Status
- [x] Session 1: Infrastructure & brand template
- [x] Session 2: Research pipeline
- [x] Session 3: Presentation assembly
- [x] Session 4: Trigger integration
- [ ] Session 5: Proposal generator
