// Built in Session 3: Research data → reveal.js slide HTML mapper
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
    
    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    
    <style>
        /* ============================================
           Archificials Brand Color Palette
           ============================================ */
        :root {
            --primary: #1a1a2e;
            --accent: #e27308;
            --accent-hover: #c96407;
            --bg-light: #f8f9fa;
            --card: #ffffff;
            --text: #1a1a2e;
            --text-light: #6c757d;
            --border: #e0e0e0;
            --success: #28a745;
            
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--text);
            color: var(--text);
        }
        
        /* ============================================
           Reveal.js Overrides
           ============================================ */
        .reveal {
            width: 100% !important;
            height: 100% !important;
        }
        
        .reveal .slides {
            width: 100%;
            height: 100%;
        }
        
        .reveal section {
            padding: 60px !important;
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
            background: var(--bg-light);
            color: var(--text);
            padding: 60px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 1200px;
            width: 100%;
        }
        
        .slide-divider {
            background: linear-gradient(135deg, var(--primary) 0%, var(--text) 100%) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .slide-divider h1 {
            color: var(--card);
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 30px;
        }
        
        .slide-divider h1::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: var(--accent);
            border-radius: 2px;
        }
        
        .slide-divider p {
            color: rgba(255,255,255,0.8);
            font-size: 20px;
            max-width: 600px;
            text-align: center;
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
        }
        
        .slide-title-content {
            text-align: center;
            color: var(--card);
            width: 100%;
        }
        
        .logo-anchor {
            font-size: 14px;
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .slide-title h1 {
            font-size: 56px;
            font-weight: 700;
            margin: 20px 0;
            color: var(--card);
        }
        
        .slide-title .subtitle {
            font-size: 28px;
            color: rgba(255,255,255,0.8);
            margin: 20px 0;
            font-weight: 300;
        }
        
        .slide-title .meta {
            font-size: 16px;
            color: rgba(255,255,255,0.6);
            margin-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 20px;
        }
        
        .slide-title .meta-item {
            margin: 10px 0;
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
            margin-bottom: 30px;
        }
        
        .slide-content h1 {
            font-size: 44px;
        }
        
        .slide-content h2 {
            font-size: 32px;
        }
        
        .slide-content h3 {
            color: var(--accent);
            font-size: 22px;
            font-weight: 600;
            margin: 20px 0 15px 0;
        }
        
        .slide-content p,
        .slide-content li {
            color: var(--text);
            font-size: 20px;
            line-height: 1.6;
            margin: 15px 0;
        }
        
        .slide-content ul,
        .slide-content ol {
            margin-left: 30px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        .slide-content li {
            margin-bottom: 12px;
        }
        
        .slide-content li::marker {
            color: var(--accent);
            font-weight: 600;
        }
        
        /* ============================================
           Chart Container
           ============================================ */
        .chart-container {
            margin: 30px 0;
            padding: 20px;
            background: var(--card);
            border-radius: 8px;
            border: 1px solid var(--border);
            width: 100%;
        }
        
        .chart-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .plotly-graph-div {
            width: 100% !important;
            height: 500px !important;
        }
        
        .chart-source {
            font-size: 14px;
            color: var(--text-light);
            margin-top: 12px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
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
            border: 2px solid var(--border);
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
            flex: 1;
            min-width: 200px;
        }
        
        .score-card.tier-1 {
            border-color: var(--tier-1);
            background: rgba(244, 192, 137, 0.08);
        }
        
        .score-card.tier-2 {
            border-color: var(--tier-2);
            background: rgba(240, 160, 80, 0.08);
        }
        
        .score-card.tier-3 {
            border-color: var(--tier-3);
            background: rgba(226, 115, 8, 0.08);
        }
        
        .score-card.tier-4 {
            border-color: var(--tier-4);
            background: rgba(168, 82, 6, 0.08);
        }
        
        .score-label {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .score-value {
            font-size: 36px;
            font-weight: 700;
            color: var(--primary);
            margin: 10px 0;
        }
        
        .score-tier {
            font-size: 14px;
            font-weight: 600;
            color: var(--accent);
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
            gap: 20px;
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
        }
        
        .slide-content th {
            background: var(--primary);
            color: var(--card);
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 16px;
        }
        
        .slide-content td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .slide-content tr:nth-child(even) {
            background: rgba(248, 249, 250, 0.5);
        }
        
        /* ============================================
           CTA & Buttons
           ============================================ */
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: var(--card);
            padding: 12px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            margin: 15px 5px;
            transition: background 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .cta-button:hover {
            background: var(--accent-hover);
            text-decoration: none;
        }
        
        .cta-button.secondary {
            background: transparent;
            color: var(--accent);
            border: 2px solid var(--accent);
        }
        
        .cta-button.secondary:hover {
            background: rgba(226, 115, 8, 0.1);
        }
        
        /* ============================================
           Footer (Per-Slide)
           ============================================ */
        .reveal .slide-number {
            background: transparent;
            color: var(--text-light);
            font-size: 12px;
        }
        
        .slide-footer {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: var(--text-light);
            pointer-events: none;
        }
        
        .slide-footer-text {
            font-weight: 500;
        }
        
        /* ============================================
           Header Logo (Top-Right)
           ============================================ */
        .slide-header {
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 12px;
            font-weight: 700;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 10;
        }
        
        /* ============================================
           Reveal.js Print/PDF Overrides
           ============================================ */
        @media print {
            .reveal section {
                page-break-after: always;
                padding: 40px !important;
            }
            
            .slide-footer,
            .slide-header {
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
            <!-- TITLE SLIDE -->
            <section class="slide-title">
                <div class="slide-title-content">
                    <div class="logo-anchor">ARCHIFICIALS</div>
                    <h1>AI Readiness Assessment</h1>
                    <p class="subtitle">{{CLIENT_NAME}}</p>
                    <div class="meta">
                        <div class="meta-item">
                            <span class="meta-label">Report Generated:</span> {{DATE}}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Status:</span> Confidential
                        </div>
                    </div>
                </div>
                <aside class="notes">
                    Title slide. {{CLIENT_NAME}} AI readiness assessment report.
                </aside>
            </section>
            
            <!-- ASSESSMENT OVERVIEW DIVIDER -->
            <section class="slide-divider">
                <h1>Assessment Overview</h1>
                <p>Your current AI readiness across 4 strategic dimensions</p>
            </section>
            
            <!-- DIMENSION RADAR CHART -->
            <section class="slide-content">
                <h2>AI Readiness Dimensions</h2>
                <div class="chart-container">
                    <div id="dimension-radar" class="plotly-graph-div"></div>
                    <div class="chart-source">Data source: Assessment questionnaire analysis</div>
                </div>
            </section>
            
            <!-- DIMENSION SCORES DETAIL -->
            <section class="slide-content">
                <h2>Dimensional Breakdown</h2>
                <div class="grid-2">
                    <div class="score-card">
                        <div class="score-label">Operational Efficiency</div>
                        <div class="score-value" id="score-operational">68</div>
                        <div class="score-tier">Building Foundations</div>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Client/Student Acquisition</div>
                        <div class="score-value" id="score-acquisition">52</div>
                        <div class="score-tier">Building Foundations</div>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Digital Visibility</div>
                        <div class="score-value" id="score-digital">45</div>
                        <div class="score-tier">Building Foundations</div>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Practice/Institutional Readiness</div>
                        <div class="score-value" id="score-readiness">71</div>
                        <div class="score-tier">Accelerating</div>
                    </div>
                </div>
            </section>
            
            <!-- MARKET ANALYSIS DIVIDER -->
            <section class="slide-divider">
                <h1>Market Context</h1>
                <p>Industry trends and competitive landscape analysis</p>
            </section>
            
            <!-- MARKET ANALYSIS PLACEHOLDER -->
            <section class="slide-content">
                <h2>Market Opportunity</h2>
                <p>Placeholder: Market analysis research from Session 2.</p>
                <div class="chart-container">
                    <div id="market-comparison" class="plotly-graph-div"></div>
                    <div class="chart-source">Data source: {{DATE}} market research</div>
                </div>
            </section>
            
            <!-- DEPLOYMENT SCENARIOS DIVIDER -->
            <section class="slide-divider">
                <h1>Implementation Roadmap</h1>
                <p>4 deployment scenarios tailored to your needs</p>
            </section>
            
            <!-- SCENARIOS OVERVIEW -->
            <section class="slide-content">
                <h2>Deployment Scenarios</h2>
                <p>We've developed 4 implementation approaches based on your readiness profile:</p>
                <div class="grid-2">
                    <div class="score-card">
                        <div class="score-label">Scenario A</div>
                        <p><strong>Rapid MVP</strong></p>
                        <p style="font-size: 16px; color: var(--text-light);">Fast market entry, minimal overhead</p>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Scenario B</div>
                        <p><strong>Balanced Growth</strong></p>
                        <p style="font-size: 16px; color: var(--text-light);">Moderate scope, measured scaling</p>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Scenario C</div>
                        <p><strong>Enterprise Scale</strong></p>
                        <p style="font-size: 16px; color: var(--text-light);">Full integration, comprehensive platform</p>
                    </div>
                    <div class="score-card">
                        <div class="score-label">Scenario D</div>
                        <p><strong>Custom Build</strong></p>
                        <p style="font-size: 16px; color: var(--text-light);">Fully tailored to your vision</p>
                    </div>
                </div>
            </section>
            
            <!-- SESSION-2+ PLACEHOLDER SLIDES -->
            {{SLIDES_HTML}}
        </div>
    </div>
    
    <!-- Reveal.js -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5"></script>
    
    <!-- Archificials Plotly Chart Utilities -->
    <script>
        {{CHARTS_UTILITIES}}
    </script>
    
    <!-- Initialize Reveal.js -->
    <script>
        Reveal.initialize({
            width: 1920,
            height: 1080,
            margin: 0.1,
            minScale: 0.2,
            maxScale: 2.0,
            hash: true,
            keyboard: true,
            center: true,
            transition: 'fade',
            transitionSpeed: 'default',
            slideNumber: true,
            overview: true
        });
        
        // Show slide number in corner
        document.querySelector('.slide-number').style.display = 'block';
    </script>
    
    <!-- Chart Data & Population -->
    <script>
        {{CHARTS_JSON}}
    </script>
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
// Slide generator helpers
// ---------------------------------------------------------------------------

function titleSlide(text, subtext) {
    return `
<section class="slide-title">
    <div class="slide-title-content">
        <div class="logo-anchor">ARCHIFICIALS</div>
        <h1>${text}</h1>
        ${subtext ? `<p class="subtitle">${subtext}</p>` : ''}
    </div>
</section>
`;
}

function dividerSlide(title, subtitle = '', bgUrl = '') {
    const style = bgUrl ? ` style="background-image:url('${bgUrl}');background-size:cover;background-position:center;"` : '';
    return `
<section class="slide-divider"${style}>
    <h1>${title}</h1>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
</section>
`;
}

function contentSlide(title, bullets = [], sources = []) {
    const items = bullets.slice(0, 6).map(b => `<li>${b}</li>`).join('');
    const sourcesHtml = sources.length
        ? `<div class="chart-source">${sources.join(' | ')}</div>`
        : '';

    return `
<section class="slide-content">
    <h2>${title}</h2>
    <ul>
        ${items}
    </ul>
    ${sourcesHtml}
</section>
`;
}

function chartSlide(title, chartId, description = '', sources = []) {
    const sourcesHtml = sources.length
        ? `<div class="chart-source">${sources.join(' | ')}</div>`
        : '';

    return `
<section class="slide-content">
    <h2>${title}</h2>
    <div class="chart-container">
        <div id="${chartId}" class="plotly-graph-div"></div>
        ${description ? `<p>${description}</p>` : ''}
        ${sourcesHtml}
    </div>
</section>
`;
}

function splitSlide(title, leftHtml, rightHtml) {
    return `
<section class="slide-content">
    <h2>${title}</h2>
    <div class="grid-2">
        <div>${leftHtml}</div>
        <div>${rightHtml}</div>
    </div>
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
 * assemblePresentation(data) → string (complete HTML)
 *
 * @param {Object} data
 * @param {Object} data.assessment — Raw assessment answers
 * @param {Object} data.scores — Claude scoring results (dimensions, overall, tier)
 * @param {Object} data.marketAnalysis — From research pipeline
 * @param {Object} data.deploymentScenarios — From research pipeline
 * @param {Object} data.meetingBrief — From research pipeline
 * @param {string} data.vertical — Vertical slug (higher-ed, law-firm, architecture)
 * @param {string} data.clientName — Institution/firm name
 * @param {string} data.date — Generation date
 * @returns {string} Complete self-contained HTML string
 */
function assemblePresentation(data) {
    const {
        assessment,
        scores = {},
        marketAnalysis = {},
        deploymentScenarios = {},
        meetingBrief = {},
        vertical,
        clientName,
        date
    } = data;

    // base URL for presentation images (tag should match released git tag)
    const IMAGE_BASE = `https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v3.2.0/reports/images/${vertical}/`;

    // build bullets from executive summary
    const execBullets = meetingBrief.executiveSummary
        ? meetingBrief.executiveSummary
              .split(/\.(?!\d)/)
              .map(s => s.trim())
              .filter(Boolean)
              .slice(0, 6)
        : [];

    const opportunityBullets = marketAnalysis.gapsOpportunities || [];

    // simple tier calculation (mirror charts.js logic)
    const overallScore = scores.operational && scores.acquisition && scores.digital && scores.readiness
        ? Math.round((scores.operational + scores.acquisition + scores.digital + scores.readiness) / 4)
        : 0;
    let tierLabel = 'Getting Started';
    if (overallScore > 24) tierLabel = 'Building Foundations';
    if (overallScore > 49) tierLabel = 'Accelerating';
    if (overallScore > 74) tierLabel = 'Leading';

    // begin assembling slides
    const slides = [];

    slides.push(titleSlide('AI Readiness Assessment Report', clientName));
    slides.push(dividerSlide('Executive Summary'));
    slides.push(contentSlide('Key Findings', execBullets));

    slides.push(dividerSlide('Assessment Results', '', `${IMAGE_BASE}section-results.webp`));
    slides.push(chartSlide('Overall Score', 'overall-gauge', '', []));
    slides.push(chartSlide('Dimension Scores', 'dimension-radar', '', []));

    slides.push(splitSlide(
        'Operational Efficiency',
        `<p><strong>${scores.operational || 0}/100</strong><br>Tier: ${tierLabel}</p>`,
        `<div style="width:100%;height:200px;
                    background:url('${IMAGE_BASE}dim-operational.webp') center/cover no-repeat;
                    "></div>`
    ));
    slides.push(splitSlide(
        'Client/Student Acquisition',
        `<p><strong>${scores.acquisition || 0}/100</strong><br>Tier: ${tierLabel}</p>`,
        `<div style="width:100%;height:200px;
                    background:url('${IMAGE_BASE}dim-acquisition.webp') center/cover no-repeat;
                    "></div>`
    ));
    slides.push(splitSlide(
        'Digital Visibility',
        `<p><strong>${scores.digital || 0}/100</strong><br>Tier: ${tierLabel}</p>`,
        `<div style="width:100%;height:200px;
                    background:url('${IMAGE_BASE}dim-digital.webp') center/cover no-repeat;
                    "></div>`
    ));
    slides.push(splitSlide(
        'Practice/Institutional Readiness',
        `<p><strong>${scores.readiness || 0}/100</strong><br>Tier: ${tierLabel}</p>`,
        `<div style="width:100%;height:200px;
                    background:url('${IMAGE_BASE}dim-readiness.webp') center/cover no-repeat;
                    "></div>`
    ));

    slides.push(contentSlide('Top Opportunities', opportunityBullets));

    slides.push(dividerSlide(
        'Market Landscape',
        'Industry trends and competitive landscape analysis',
        `${IMAGE_BASE}section-market.webp`
    ));
    slides.push(contentSlide('Industry AI Adoption', [marketAnalysis.industryOverview?.summary || ''], []));
    slides.push(contentSlide('Competitive Landscape', [marketAnalysis.competitorLandscape?.summary || ''], []));
    slides.push(contentSlide('Tool Landscape', [marketAnalysis.toolLandscape?.summary || ''], []));
    slides.push(contentSlide('Gaps & Opportunities', opportunityBullets));

    slides.push(dividerSlide('Deployment Scenarios', '', `${IMAGE_BASE}section-scenarios.webp`));

    ['A', 'B', 'C', 'D'].forEach(letter => {
        const scenario = deploymentScenarios[`scenario${letter}`];
        if (scenario) {
            slides.push(
                splitSlide(
                    `Scenario ${letter}: ${scenario.label || ''}`,
                    `<p>${scenario.philosophy || ''}</p>`,
                    `<p>Cost estimate: ${scenario.costs?.totalYear1 || ''}</p>`
                )
            );
        }
    });

    slides.push(chartSlide('Cost Comparison', 'cost-comparison', '', []));
    slides.push(chartSlide('ROI Projection', 'roi-projection', '', []));
    slides.push(chartSlide('Implementation Timeline', 'implementation-gantt', '', []));

    slides.push(dividerSlide(
        'Recommended Path Forward',
        '',
        `${IMAGE_BASE}section-nextsteps.webp`
    ));
    slides.push(contentSlide(
        `Why Scenario ${meetingBrief.recommendedScenario?.scenario || 'C'}`,
        [meetingBrief.recommendedScenario?.reasoning || '']
    ));
    slides.push(contentSlide('Immediate Next Steps', (meetingBrief.meetingAgenda || []).map(i => i.topic)));
    slides.push(contentSlide('What Archificials Delivers', [
        'AI strategy consulting',
        'Custom platform development',
        'Ongoing training & support'
    ]));

    slides.push(titleSlide('Ready to Transform Your Operations?', clientName));

    const slidesHtml = slides.join('\n');

    // prepare chart configurations
    const chartConfigs = {
        'overall-gauge': createTierGaugeChart(scores),
        'dimension-radar': createDimensionRadarChart(scores),
        'cost-comparison': createCostComparisonChart({ scenarios: deploymentScenarios }),
        'roi-projection': createROIProjectionChart({
            months: deploymentScenarios.scenarioC?.timeline?.map(t => t.phase) || [],
            roi: deploymentScenarios.scenarioC?.roiProjection ? [parseFloat(deploymentScenarios.scenarioC.roiProjection.estimate) || 0] : [],
            investment: deploymentScenarios.scenarioC?.costs ? [parseFloat(deploymentScenarios.scenarioC.costs.totalYear1) || 0] : []
        }),
        'implementation-gantt': createImplementationGanttChart({
            phases: deploymentScenarios.scenarioC?.timeline?.map(t => t.phase) || [],
            startDates: deploymentScenarios.scenarioC?.timeline?.map(t => t.start) || [],
            endDates: deploymentScenarios.scenarioC?.timeline?.map(t => t.end) || []
        })
    };

    const chartsJsonScript = `(function(){
        const charts = ${JSON.stringify(chartConfigs)};
        Object.entries(charts).forEach(([id,cfg])=>{
            const el=document.getElementById(id);
            if(el && cfg){
                Plotly.newPlot(id,cfg.data,cfg.layout,cfg.config);
            }
        });
    })();`;

    const chartsUtilities = generateChartsUtilities();

    let html = TEMPLATE_HTML
        .replace(/{{CLIENT_NAME}}/g, clientName)
        .replace(/{{DATE}}/g, date)
        .replace('{{SLIDES_HTML}}', slidesHtml)
        .replace('{{CHARTS_UTILITIES}}', chartsUtilities)
        .replace('{{CHARTS_JSON}}', chartsJsonScript);

    return html;
}

export { assemblePresentation };
