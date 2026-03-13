// Built in Session 3: Research data -> reveal.js slide HTML mapper
// This module transforms JSON research output into ~30 presentation slides

// NOTE: to keep the Cloudflare Worker runtime clean we inline the template and
// chart utilities text here as constants. These were copied from
// template.html and charts.js respectively during development. No filesystem
// operations occur at runtime.

// ---------------------------------------------------------------------------
// Constants (inline HTML and JS)
// ---------------------------------------------------------------------------

const TEMPLATE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{CLIENT_NAME}} — AI Readiness Assessment Report</title>
    <meta name="description" content="Confidential AI readiness assessment and recommendations for {{CLIENT_NAME}}">

    <!-- reveal.js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/black.css">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"><\/script>

    <style>
        /* ============================================
           Archificials Brand Color Palette
           ============================================ */
        :root {
            --primary: #1a1a2e;
            --primary-light: #2d2d4a;
            --accent: #e27308;
            --accent-hover: #c96407;
            --accent-light: rgba(226, 115, 8, 0.12);
            --bg-light: #f8f9fa;
            --bg-warm: #fefcf9;
            --card: #ffffff;
            --text: #1a1a2e;
            --text-body: #333333;
            --text-light: #6c757d;
            --border: #e0e0e0;
            --border-light: #f0f0f0;
            --success: #28a745;
            --info: #3498db;

            /* Tier Colors */
            --tier-1: #f4c089;
            --tier-2: #f0a050;
            --tier-3: #e27308;
            --tier-4: #a85206;
        }

        /* ============================================
           Base Typography & Layout
           ============================================ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--primary);
            color: var(--text-body);
        }

        /* ============================================
           Reveal.js Overrides
           ============================================ */
        .reveal {
            width: 100% !important;
            height: 100% !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .reveal .slides {
            width: 100%;
            height: 100%;
            text-align: left;
        }

        .reveal section {
            padding: 50px 60px !important;
            height: 100% !important;
            width: 100% !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        /* ============================================
           Slide Backgrounds & Layouts
           ============================================ */
        .slide-content {
            background: var(--card);
            color: var(--text-body);
            padding: 50px 60px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            max-width: 1200px;
            width: 100%;
            position: relative;
            text-align: left;
        }

        .slide-content::before {
            content: 'ARCHIFICIALS';
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 11px;
            font-weight: 700;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.7;
        }

        .slide-divider {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 60%, #16213e 100%) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .slide-divider::before {
            content: '';
            position: absolute;
            top: -30%;
            right: -10%;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(226,115,8,0.08) 0%, transparent 70%);
            pointer-events: none;
        }

        .slide-divider h1 {
            color: var(--card);
            font-size: 52px;
            font-weight: 800;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 30px;
            letter-spacing: -0.5px;
        }

        .slide-divider h1::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: var(--accent);
            border-radius: 2px;
        }

        .slide-divider p {
            color: rgba(255,255,255,0.7);
            font-size: 20px;
            max-width: 600px;
            text-align: center;
            font-weight: 300;
            line-height: 1.5;
        }

        .slide-divider .section-number {
            position: absolute;
            top: 40px;
            left: 60px;
            font-size: 13px;
            font-weight: 600;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        /* ============================================
           Title Slide
           ============================================ */
        .slide-title {
            background: linear-gradient(135deg, var(--primary) 0%, #0f0f1f 100%) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .slide-title::after {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -20%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(226,115,8,0.06) 0%, transparent 70%);
            pointer-events: none;
        }

        .slide-title-content {
            text-align: center;
            color: var(--card);
            width: 100%;
            position: relative;
            z-index: 1;
        }

        .logo-anchor {
            font-size: 13px;
            color: var(--accent);
            font-weight: 700;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 4px;
        }

        .slide-title h1 {
            font-size: 54px;
            font-weight: 800;
            margin: 20px 0;
            color: var(--card);
            letter-spacing: -1px;
            line-height: 1.1;
        }

        .slide-title .subtitle {
            font-size: 26px;
            color: rgba(255,255,255,0.85);
            margin: 20px 0;
            font-weight: 300;
        }

        .slide-title .meta {
            font-size: 15px;
            color: rgba(255,255,255,0.5);
            margin-top: 50px;
            border-top: 1px solid rgba(255,255,255,0.15);
            padding-top: 25px;
            display: flex;
            justify-content: center;
            gap: 40px;
        }

        .slide-title .meta-item {
            margin: 0;
        }

        .slide-title .meta-label {
            color: var(--accent);
            font-weight: 600;
        }

        /* ============================================
           Content Slide Styles
           ============================================ */
        .slide-content h1,
        .slide-content h2 {
            color: var(--primary);
            font-weight: 700;
            margin-bottom: 24px;
            letter-spacing: -0.3px;
        }

        .slide-content h1 {
            font-size: 38px;
        }

        .slide-content h2 {
            font-size: 30px;
            position: relative;
            padding-bottom: 16px;
        }

        .slide-content h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: var(--accent);
            border-radius: 2px;
        }

        .slide-content h3 {
            color: var(--accent);
            font-size: 20px;
            font-weight: 600;
            margin: 20px 0 12px 0;
        }

        .slide-content p {
            color: var(--text-body);
            font-size: 18px;
            line-height: 1.7;
            margin: 12px 0;
        }

        .slide-content li {
            color: var(--text-body);
            font-size: 18px;
            line-height: 1.6;
            margin: 10px 0;
        }

        .slide-content ul,
        .slide-content ol {
            margin-left: 24px;
            margin-top: 16px;
            margin-bottom: 16px;
        }

        .slide-content li {
            margin-bottom: 10px;
            padding-left: 8px;
        }

        .slide-content li::marker {
            color: var(--accent);
            font-weight: 700;
        }

        /* ============================================
           Chart Container
           ============================================ */
        .chart-container {
            margin: 24px 0;
            padding: 24px;
            background: var(--bg-warm);
            border-radius: 10px;
            border: 1px solid var(--border-light);
            width: 100%;
        }

        .chart-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 12px;
        }

        .plotly-graph-div {
            width: 100% !important;
            height: 450px !important;
        }

        .chart-source {
            font-size: 13px;
            color: var(--text-light);
            margin-top: 12px;
            border-top: 1px solid var(--border-light);
            padding-top: 10px;
            font-style: italic;
        }

        .source-link {
            color: var(--accent);
            text-decoration: none;
        }

        .source-link:hover {
            color: var(--accent-hover);
            text-decoration: underline;
        }

        /* ============================================
           Data Display Cards
           ============================================ */
        .score-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 24px 20px;
            margin: 0;
            text-align: center;
            flex: 1;
            min-width: 200px;
            transition: box-shadow 0.2s ease;
            position: relative;
            overflow: hidden;
        }

        .score-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--border);
        }

        .score-card.tier-1::before { background: var(--tier-1); }
        .score-card.tier-2::before { background: var(--tier-2); }
        .score-card.tier-3::before { background: var(--tier-3); }
        .score-card.tier-4::before { background: var(--tier-4); }

        .score-card.tier-1 { border-color: var(--tier-1); }
        .score-card.tier-2 { border-color: var(--tier-2); }
        .score-card.tier-3 { border-color: var(--tier-3); }
        .score-card.tier-4 { border-color: var(--tier-4); }

        .score-label {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 10px;
        }

        .score-value {
            font-size: 42px;
            font-weight: 800;
            color: var(--primary);
            margin: 8px 0;
            letter-spacing: -1px;
        }

        .score-tier {
            font-size: 13px;
            font-weight: 600;
            color: var(--accent);
            margin-top: 4px;
        }

        .score-suffix {
            font-size: 18px;
            font-weight: 400;
            color: var(--text-light);
        }

        /* ============================================
           Grid & Flex Utilities
           ============================================ */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .grid-4 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 16px;
            margin: 20px 0;
        }

        .flex-row {
            display: flex;
            gap: 15px;
            margin: 15px 0;
        }

        /* ============================================
           Table Styles
           ============================================ */
        .slide-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: var(--card);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--border);
        }

        .slide-content th {
            background: var(--primary);
            color: var(--card);
            padding: 14px 16px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .slide-content td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-light);
            font-size: 15px;
        }

        .slide-content tr:nth-child(even) {
            background: var(--bg-light);
        }

        /* ============================================
           CTA & Buttons
           ============================================ */
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: var(--card);
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            margin: 15px 8px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            letter-spacing: 0.3px;
        }

        .cta-button:hover {
            background: var(--accent-hover);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(226, 115, 8, 0.3);
        }

        .cta-button.secondary {
            background: transparent;
            color: var(--accent);
            border: 2px solid var(--accent);
        }

        .cta-button.secondary:hover {
            background: var(--accent-light);
        }

        /* ============================================
           Scenario Card (special layout)
           ============================================ */
        .scenario-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 24px;
            text-align: left;
        }

        .scenario-card h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
        }

        .scenario-card p {
            font-size: 15px;
            line-height: 1.5;
            margin: 6px 0;
        }

        .scenario-card .cost {
            font-size: 14px;
            font-weight: 600;
            color: var(--accent);
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--border-light);
        }

        .scenario-card.recommended {
            border-color: var(--accent);
            box-shadow: 0 2px 12px rgba(226, 115, 8, 0.1);
        }

        .scenario-card.recommended::before {
            content: 'RECOMMENDED';
            display: block;
            font-size: 10px;
            font-weight: 700;
            color: var(--card);
            background: var(--accent);
            padding: 3px 10px;
            border-radius: 4px;
            margin-bottom: 12px;
            width: fit-content;
            letter-spacing: 1px;
        }

        /* ============================================
           Slide Footer & Header
           ============================================ */
        .reveal .slide-number {
            background: transparent;
            color: rgba(255,255,255,0.3);
            font-size: 12px;
            font-family: 'Inter', sans-serif;
        }

        .slide-footer {
            position: absolute;
            bottom: 16px;
            left: 60px;
            right: 60px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: var(--text-light);
            pointer-events: none;
            opacity: 0.6;
        }

        /* ============================================
           Insight/Quote Block
           ============================================ */
        .insight-block {
            background: var(--accent-light);
            border-left: 4px solid var(--accent);
            padding: 16px 20px;
            border-radius: 0 8px 8px 0;
            margin: 16px 0;
        }

        .insight-block p {
            font-size: 16px;
            font-style: italic;
            color: var(--text-body);
            margin: 0;
        }

        /* ============================================
           Key Metric Row
           ============================================ */
        .metric-row {
            display: flex;
            gap: 24px;
            margin: 16px 0;
        }

        .metric-item {
            flex: 1;
            text-align: center;
            padding: 16px;
            background: var(--bg-light);
            border-radius: 8px;
        }

        .metric-item .value {
            font-size: 28px;
            font-weight: 800;
            color: var(--primary);
        }

        .metric-item .label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }

        /* ============================================
           Reveal.js Print/PDF Overrides
           ============================================ */
        @media print {
            .reveal section {
                page-break-after: always;
                padding: 40px !important;
            }

            .slide-footer {
                display: none;
            }

            .chart-container {
                page-break-inside: avoid;
            }
        }

        /* ============================================
           Reveal.js Speaker Notes (Hidden)
           ============================================ */
        .notes {
            display: none;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            {{SLIDES_HTML}}
        </div>
    </div>

    <!-- Reveal.js -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5"><\/script>

    <!-- Archificials Plotly Chart Utilities -->
    <script>
        {{CHARTS_UTILITIES}}
    <\/script>

    <!-- Initialize Reveal.js -->
    <script>
        Reveal.initialize({
            width: 1920,
            height: 1080,
            margin: 0.04,
            minScale: 0.2,
            maxScale: 2.0,
            hash: true,
            keyboard: true,
            center: true,
            transition: 'slide',
            transitionSpeed: 'default',
            slideNumber: 'c/t',
            overview: true
        });
    <\/script>

    <!-- Chart Data & Population -->
    <script>
        {{CHARTS_JSON}}
    <\/script>
</body>
</html>`;

// placeholder for chart utilities

const CHARTS_UTILITIES = '';

function generateChartsUtilities() {
    const parts = [];
    parts.push('const ARCHIFICIALS_COLORS = ' + JSON.stringify(ARCHIFICIALS_COLORS) + ';');
    parts.push('const PLOTLY_LAYOUT_DEFAULTS = ' + JSON.stringify(PLOTLY_LAYOUT_DEFAULTS) + ';');
    parts.push('const PLOTLY_CONFIG = ' + JSON.stringify(PLOTLY_CONFIG) + ';');
    parts.push(createDimensionRadarChart.toString());
    parts.push(createDimensionBarChart.toString());
    parts.push(createTierGaugeChart.toString());
    parts.push(createMarketComparisonChart.toString());
    parts.push(createROIProjectionChart.toString());
    parts.push(createImplementationGanttChart.toString());
    parts.push(createCostComparisonChart.toString());
    parts.push(`
function initializeCharts(){
    document.querySelectorAll('[data-chart]').forEach(el=>{
        try{
            const cfg = JSON.parse(el.getAttribute('data-chart'));
            Plotly.newPlot(el.id, cfg.data, cfg.layout, cfg.config);
        }catch(e){console.error('Chart init error',e);}
    });
}
if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initializeCharts);
}else{
    initializeCharts();
}
`);
    return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Data normalization (handle Claude API { raw: content } fallback)
// ---------------------------------------------------------------------------

function normalizeClaudeResponse(response) {
    if (!response) return {};
    if (response.raw) {
        // Try to extract JSON from markdown code blocks
        const match = response.raw.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
            try { return JSON.parse(match[1]); } catch(e) { /* fall through */ }
        }
        // Try to parse the entire raw content as JSON
        try { return JSON.parse(response.raw); } catch(e) { /* fall through */ }
        return {};
    }
    return response;
}

// ---------------------------------------------------------------------------
// Slide generator helpers
// ---------------------------------------------------------------------------

function esc(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function titleSlide(text, subtext, date) {
    return `
<section class="slide-title">
    <div class="slide-title-content">
        <div class="logo-anchor">ARCHIFICIALS</div>
        <h1>${esc(text)}</h1>
        ${subtext ? `<p class="subtitle">${esc(subtext)}</p>` : ''}
        ${date ? `<div class="meta">
            <div class="meta-item"><span class="meta-label">Report Generated:</span> ${esc(date)}</div>
            <div class="meta-item"><span class="meta-label">Status:</span> Confidential</div>
        </div>` : ''}
    </div>
</section>
`;
}

function dividerSlide(title, subtitle = '', sectionNum = '') {
    return `
<section class="slide-divider">
    ${sectionNum ? `<div class="section-number">${esc(sectionNum)}</div>` : ''}
    <h1>${esc(title)}</h1>
    ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
</section>
`;
}

function contentSlide(title, bullets = [], description = '') {
    // Filter out empty bullets
    const validBullets = bullets.filter(b => b && String(b).trim());

    let bodyHtml = '';
    if (description) {
        bodyHtml += `<p>${description}</p>`;
    }
    if (validBullets.length === 1) {
        // Single item: render as paragraph
        bodyHtml += `<p>${validBullets[0]}</p>`;
    } else if (validBullets.length > 1) {
        bodyHtml += `<ul>${validBullets.slice(0, 8).map(b => `<li>${b}</li>`).join('')}</ul>`;
    }

    if (!bodyHtml) {
        bodyHtml = '<p style="color: var(--text-light); font-style: italic;">Content pending research data.</p>';
    }

    return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    ${bodyHtml}
</section>
`;
}

function chartSlide(title, chartId, description = '') {
    return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="chart-container">
        <div id="${chartId}" class="plotly-graph-div"></div>
        ${description ? `<div class="chart-source">${esc(description)}</div>` : ''}
    </div>
</section>
`;
}

function splitSlide(title, leftHtml, rightHtml) {
    return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="grid-2">
        <div>${leftHtml}</div>
        <div>${rightHtml}</div>
    </div>
</section>
`;
}

function scoreCardsSlide(title, cards) {
    const cardsHtml = cards.map(c => {
        const tierClass = c.score <= 24 ? 'tier-1' : c.score <= 49 ? 'tier-2' : c.score <= 74 ? 'tier-3' : 'tier-4';
        return `<div class="score-card ${tierClass}">
            <div class="score-label">${esc(c.label)}</div>
            <div class="score-value">${c.score}<span class="score-suffix">/100</span></div>
            <div class="score-tier">${esc(c.tier)}</div>
        </div>`;
    }).join('');

    return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="grid-${Math.min(cards.length, 4)}">
        ${cardsHtml}
    </div>
</section>
`;
}

function scenarioSlide(letter, scenario) {
    if (!scenario) return '';

    const isRecommended = letter === 'C';

    // Handle both tools-based (A-D) and tracks-based (E-F) scenarios
    const tools = scenario.recommendedTools || scenario.tools || [];
    const toolsList = Array.isArray(tools)
        ? tools.map(t => typeof t === 'string' ? t : t.name || t.tool || '').filter(Boolean).slice(0, 4)
        : [];

    const tracks = scenario.tracks || [];
    const tracksList = Array.isArray(tracks)
        ? tracks.map(t => typeof t === 'string' ? t : t.name || t.track || '').filter(Boolean).slice(0, 4)
        : [];

    let detailHtml = '';
    if (tracksList.length) {
        detailHtml = `<h3 style="margin-top:16px;">Implementation Tracks</h3><ul>${tracksList.map(t => `<li>${t}</li>`).join('')}</ul>`;
    } else if (toolsList.length) {
        detailHtml = `<h3 style="margin-top:16px;">Key Tools</h3><ul>${toolsList.map(t => `<li>${t}</li>`).join('')}</ul>`;
    }

    const leftHtml = `
        <div>
            <h3>Philosophy</h3>
            <p>${scenario.philosophy || scenario.description || ''}</p>
            ${scenario.bestFor ? `<p style="margin-top:12px;"><strong>Best for:</strong> ${scenario.bestFor}</p>` : ''}
            ${detailHtml}
        </div>`;

    const rightHtml = `
        <div class="scenario-card${isRecommended ? ' recommended' : ''}">
            <h3>Scenario ${letter}: ${scenario.label || ''}</h3>
            ${scenario.timeline ? `<p><strong>Timeline:</strong> ${typeof scenario.timeline === 'string' ? scenario.timeline : (scenario.timeline.total || scenario.timeline.length + ' phases')}</p>` : ''}
            ${scenario.strengths ? `<p><strong>Strengths:</strong> ${Array.isArray(scenario.strengths) ? scenario.strengths.slice(0,2).join(', ') : scenario.strengths}</p>` : ''}
            ${scenario.weaknesses ? `<p><strong>Considerations:</strong> ${Array.isArray(scenario.weaknesses) ? scenario.weaknesses.slice(0,2).join(', ') : scenario.weaknesses}</p>` : ''}
            ${scenario.canBundleWith ? `<p style="font-size:14px; color:var(--accent);"><strong>Bundles with:</strong> ${scenario.canBundleWith}</p>` : ''}
            <div class="cost">${scenario.costs?.totalYear1 || scenario.costs?.total || scenario.cost || 'Contact for pricing'}</div>
        </div>`;

    return splitSlide(`Scenario ${letter}: ${scenario.label || ''}`, leftHtml, rightHtml);
}

function insightSlide(title, text, attribution = '') {
    return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="insight-block">
        <p>${text}</p>
    </div>
    ${attribution ? `<p style="font-size:14px; color:var(--text-light); margin-top:8px;">${esc(attribution)}</p>` : ''}
</section>
`;
}

// ---------------------------------------------------------------------------
// Main assembly function
// ---------------------------------------------------------------------------

import {
    createTierGaugeChart,
    createDimensionRadarChart,
    createDimensionBarChart,
    createMarketComparisonChart,
    createROIProjectionChart,
    createImplementationGanttChart,
    createCostComparisonChart,
    ARCHIFICIALS_COLORS,
    PLOTLY_LAYOUT_DEFAULTS,
    PLOTLY_CONFIG
} from './charts.js';

/**
 * assemblePresentation(data) -> string (complete HTML)
 *
 * @param {Object} data
 * @param {Object} data.assessment - Raw assessment answers
 * @param {Object} data.scores - Claude scoring results (dimensions, overall, tier)
 * @param {Object} data.marketAnalysis - From research pipeline
 * @param {Object} data.deploymentScenarios - From research pipeline
 * @param {Object} data.meetingBrief - From research pipeline
 * @param {string} data.vertical - Vertical slug (higher-ed, law-firm, architecture)
 * @param {string} data.clientName - Institution/firm name
 * @param {string} data.date - Generation date
 * @returns {string} Complete self-contained HTML string
 */
function assemblePresentation(data) {
    const {
        assessment,
        scores = {},
        vertical,
        clientName,
        date
    } = data;

    // Normalize Claude API responses (handle { raw: content } fallback)
    const marketAnalysis = normalizeClaudeResponse(data.marketAnalysis);
    const deploymentScenarios = normalizeClaudeResponse(data.deploymentScenarios);
    const meetingBrief = normalizeClaudeResponse(data.meetingBrief);

    // Tier calculation helper
    function getTierLabel(score) {
        if (score > 74) return 'Leading';
        if (score > 49) return 'Accelerating';
        if (score > 24) return 'Building Foundations';
        return 'Getting Started';
    }

    // Calculate overall
    const overallScore = scores.operational && scores.acquisition && scores.digital && scores.practice_readiness
        ? Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4)
        : scores.overall || 0;

    // Build executive summary bullets from meeting brief
    const execBullets = [];
    if (meetingBrief.executiveSummary) {
        meetingBrief.executiveSummary
            .split(/\.(?!\d)/)
            .map(s => s.trim())
            .filter(s => s.length > 10)
            .slice(0, 6)
            .forEach(s => execBullets.push(s + '.'));
    }

    // Opportunity bullets
    const opportunityBullets = (marketAnalysis.gapsOpportunities || []).map(
        item => typeof item === 'string' ? item : (item.opportunity || item.description || item.gap || JSON.stringify(item))
    );

    // -----------------------------------------------------------------------
    // Assemble slides
    // -----------------------------------------------------------------------
    const slides = [];

    // --- TITLE ---
    slides.push(titleSlide('AI Readiness Assessment', clientName, date));

    // --- SECTION 1: EXECUTIVE SUMMARY ---
    slides.push(dividerSlide('Executive Summary', 'Key findings from your AI readiness assessment', 'Section 01'));

    if (execBullets.length > 0) {
        slides.push(contentSlide('Key Findings', execBullets));
    } else {
        // Fallback: generate summary from scores
        slides.push(contentSlide('Key Findings', [
            `Overall AI readiness score: ${overallScore}/100 (${getTierLabel(overallScore)})`,
            `Strongest dimension: ${scores.operational >= scores.acquisition && scores.operational >= scores.digital && scores.operational >= scores.practice_readiness ? 'Operational Efficiency' : scores.practice_readiness >= scores.acquisition && scores.practice_readiness >= scores.digital ? 'Practice Readiness' : scores.acquisition >= scores.digital ? 'Client Acquisition' : 'Digital Visibility'}`,
            `Primary opportunity area identified for immediate improvement`,
            `Custom deployment scenarios developed based on your profile`
        ]));
    }

    // --- SECTION 2: ASSESSMENT RESULTS ---
    slides.push(dividerSlide('Assessment Results', 'Your current AI readiness across 4 strategic dimensions', 'Section 02'));

    // Overall gauge chart
    slides.push(chartSlide('Overall AI Readiness', 'overall-gauge', 'Based on assessment questionnaire analysis'));

    // Radar chart
    slides.push(chartSlide('Dimension Scores', 'dimension-radar', 'Assessment across 4 strategic dimensions'));

    // Score cards
    slides.push(scoreCardsSlide('Dimensional Breakdown', [
        { label: 'Operational Efficiency', score: scores.operational || 0, tier: getTierLabel(scores.operational || 0) },
        { label: 'Client/Student Acquisition', score: scores.acquisition || 0, tier: getTierLabel(scores.acquisition || 0) },
        { label: 'Digital Visibility', score: scores.digital || 0, tier: getTierLabel(scores.digital || 0) },
        { label: 'Practice/Institutional Readiness', score: scores.practice_readiness || 0, tier: getTierLabel(scores.practice_readiness || 0) }
    ]));

    // Dimension insights (if available from scores)
    if (scores.insight_operational || scores.insight_acquisition) {
        const dimInsights = [
            scores.insight_operational,
            scores.insight_acquisition,
            scores.insight_digital,
            scores.insight_practice_readiness
        ].filter(Boolean);
        if (dimInsights.length > 0) {
            slides.push(contentSlide('Dimension Insights', dimInsights));
        }
    }

    // Top opportunities
    if (opportunityBullets.length > 0) {
        slides.push(contentSlide('Top Opportunities', opportunityBullets));
    } else if (scores.top_opportunities && Array.isArray(scores.top_opportunities) && scores.top_opportunities.length > 0) {
        slides.push(contentSlide('Top Opportunities', scores.top_opportunities.map(
            o => typeof o === 'string' ? o : (o.opportunity || o.description || JSON.stringify(o))
        )));
    }

    // --- SECTION 3: MARKET LANDSCAPE ---
    slides.push(dividerSlide('Market Landscape', 'Industry trends and competitive landscape analysis', 'Section 03'));

    // Industry overview
    const industryContent = marketAnalysis.industryOverview?.summary
        || marketAnalysis.industryOverview?.overview
        || (typeof marketAnalysis.industryOverview === 'string' ? marketAnalysis.industryOverview : '');
    slides.push(contentSlide('Industry AI Adoption', industryContent ? [industryContent] : ['AI adoption trends analysis based on current market research']));

    // Competitor landscape
    const competitorContent = marketAnalysis.competitorLandscape?.summary
        || marketAnalysis.competitorLandscape?.overview
        || (typeof marketAnalysis.competitorLandscape === 'string' ? marketAnalysis.competitorLandscape : '');
    if (competitorContent) {
        slides.push(contentSlide('Competitive Landscape', [competitorContent]));
    }

    // Tool landscape
    const toolContent = marketAnalysis.toolLandscape?.summary
        || marketAnalysis.toolLandscape?.overview
        || (typeof marketAnalysis.toolLandscape === 'string' ? marketAnalysis.toolLandscape : '');
    if (toolContent) {
        slides.push(contentSlide('AI Tool Landscape', [toolContent]));
    }

    // Market tools list
    if (marketAnalysis.toolLandscape?.tools && Array.isArray(marketAnalysis.toolLandscape.tools)) {
        const toolBullets = marketAnalysis.toolLandscape.tools.slice(0, 6).map(t =>
            typeof t === 'string' ? t : `<strong>${t.name || t.tool}</strong> — ${t.description || t.use || t.category || ''}`
        );
        if (toolBullets.length > 0) {
            slides.push(contentSlide('Key AI Tools in Market', toolBullets));
        }
    }

    // Regulatory considerations
    if (marketAnalysis.regulatoryCompliance) {
        const regContent = marketAnalysis.regulatoryCompliance.summary
            || (typeof marketAnalysis.regulatoryCompliance === 'string' ? marketAnalysis.regulatoryCompliance : '');
        if (regContent) {
            slides.push(contentSlide('Regulatory & Compliance', [regContent]));
        }
    }

    // --- SECTION 4: DEPLOYMENT SCENARIOS ---
    slides.push(dividerSlide('Deployment Scenarios', '6 implementation pathways tailored to your needs', 'Section 04'));

    // Scenario overview cards
    const scenarioLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const scenarioKeys = ['scenarioA', 'scenarioB', 'scenarioC', 'scenarioD', 'scenarioE', 'scenarioF'];
    const hasScenarios = scenarioKeys.some(k => deploymentScenarios[k]);

    if (hasScenarios) {
        // Individual scenario slides
        scenarioLetters.forEach((letter, idx) => {
            const scenario = deploymentScenarios[scenarioKeys[idx]];
            if (scenario) {
                slides.push(scenarioSlide(letter, scenario));
            }
        });

        // Cost comparison chart
        slides.push(chartSlide('Investment Comparison', 'cost-comparison', 'Estimated first-year investment across scenarios'));

        // ROI projection
        slides.push(chartSlide('ROI Projection', 'roi-projection', 'Projected return on investment over 24 months'));

        // Implementation timeline
        slides.push(chartSlide('Implementation Timeline', 'implementation-gantt', 'Phased implementation roadmap'));
    } else {
        slides.push(contentSlide('Deployment Scenarios', [
            'Scenario A: Off-the-Shelf AI Stack — Quick wins with proven tools',
            'Scenario B: Custom AI Platform — Tailored solution built by Archificials',
            'Scenario C: Hybrid Approach — Balanced blend of speed and customization',
            'Scenario D: AI-First Transformation — Full organizational transformation',
            'Scenario E: AI-Powered Client Acquisition & SEO — External growth focus',
            'Scenario F: AEO & GEO Infrastructure — Own AI-mediated search'
        ], 'Detailed scenarios with timelines and costs will be presented during consultation.'));
    }

    // --- SECTION 5: RECOMMENDED PATH ---
    slides.push(dividerSlide('Recommended Path Forward', 'Our recommendation based on your assessment profile', 'Section 05'));

    // Recommended scenario
    const recScenario = meetingBrief.recommendedScenario || {};
    if (recScenario.scenario || recScenario.reasoning) {
        slides.push(contentSlide(
            `Recommended: Scenario ${recScenario.scenario || 'C'}`,
            [recScenario.reasoning || 'Based on your assessment profile, we recommend a balanced approach combining quick wins with strategic custom development.']
        ));
    } else {
        slides.push(contentSlide(
            'Recommended Approach',
            ['Based on your assessment results, we recommend starting with a balanced approach that combines proven tools with targeted custom development to maximize ROI while managing risk.']
        ));
    }

    // Next steps / meeting agenda
    const agenda = meetingBrief.meetingAgenda || [];
    if (agenda.length > 0) {
        slides.push(contentSlide(
            'Immediate Next Steps',
            agenda.map(item => typeof item === 'string' ? item : (item.topic || item.step || item.action || JSON.stringify(item)))
        ));
    } else {
        slides.push(contentSlide('Immediate Next Steps', [
            'Schedule a strategy session with our team',
            'Review detailed proposal document',
            'Define success metrics and milestones',
            'Begin phased implementation'
        ]));
    }

    // What Archificials delivers
    slides.push(contentSlide('What Archificials Delivers', [
        'AI strategy consulting tailored to your industry',
        'Custom platform development and integration',
        'Data pipeline architecture and optimization',
        'Ongoing training, support, and performance monitoring',
        'Measurable ROI tracking and continuous improvement'
    ]));

    // --- CLOSING ---
    slides.push(`
<section class="slide-title">
    <div class="slide-title-content">
        <div class="logo-anchor">ARCHIFICIALS</div>
        <h1>Ready to Transform?</h1>
        <p class="subtitle">Let's discuss which pathway aligns with your vision</p>
        <div class="meta">
            <div class="meta-item"><span class="meta-label">Email:</span> hello@archificials.com</div>
            <div class="meta-item"><span class="meta-label">Web:</span> archificials.com</div>
        </div>
        <div style="margin-top: 40px;">
            <span style="font-size: 13px; color: rgba(255,255,255,0.4);">Confidential — Prepared for ${esc(clientName)}</span>
        </div>
    </div>
</section>
`);

    const slidesHtml = slides.join('\n');

    // -----------------------------------------------------------------------
    // Chart configurations
    // -----------------------------------------------------------------------
    const chartConfigs = {
        'overall-gauge': createTierGaugeChart(scores),
        'dimension-radar': createDimensionRadarChart(scores)
    };

    // Only add scenario charts if we have data
    if (hasScenarios) {
        chartConfigs['cost-comparison'] = createCostComparisonChart({ scenarios: deploymentScenarios });

        const scenarioC = deploymentScenarios.scenarioC || deploymentScenarios.scenarioB || {};
        chartConfigs['roi-projection'] = createROIProjectionChart({
            months: scenarioC.timeline?.map?.(t => t.phase) || [],
            roi: scenarioC.roiProjection ? [parseFloat(scenarioC.roiProjection.estimate || scenarioC.roiProjection) || 0] : [],
            investment: scenarioC.costs ? [parseFloat(scenarioC.costs.totalYear1 || scenarioC.costs.total || 0) || 0] : []
        });

        chartConfigs['implementation-gantt'] = createImplementationGanttChart({
            phases: scenarioC.timeline?.map?.(t => t.phase) || [],
            startDates: scenarioC.timeline?.map?.(t => t.start) || [],
            endDates: scenarioC.timeline?.map?.(t => t.end) || []
        });
    }

    const chartsJsonScript = `(function(){
        var charts = ${JSON.stringify(chartConfigs)};
        Object.entries(charts).forEach(function(entry){
            var id = entry[0], cfg = entry[1];
            var el = document.getElementById(id);
            if(!el || !cfg) return;
            if(cfg.type === 'html' && cfg.html){
                el.innerHTML = cfg.html;
                el.style.overflow = 'auto';
            } else if(cfg.data){
                Plotly.newPlot(id, cfg.data, cfg.layout, cfg.config);
            }
        });
    })();`;

    const chartsUtilities = generateChartsUtilities();

    let html = TEMPLATE_HTML
        .replace(/\{\{CLIENT_NAME\}\}/g, esc(clientName))
        .replace(/\{\{DATE\}\}/g, esc(date))
        .replace('{{SLIDES_HTML}}', slidesHtml)
        .replace('{{CHARTS_UTILITIES}}', chartsUtilities)
        .replace('{{CHARTS_JSON}}', chartsJsonScript);

    return html;
}

export { assemblePresentation };
