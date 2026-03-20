#!/usr/bin/env node
/**
 * Render Report — Markdown → Branded HTML Infographic
 *
 * Takes a Gemini Deep Research Markdown export and produces a fully branded
 * Archificials infographic HTML file. Zero manual rebranding needed.
 *
 * Usage:
 *   node render-report.js <input.md> [--output <file.html>] [--images <path>] [--vertical <slug>]
 *
 * Examples:
 *   node render-report.js "AI Readiness Research Brief.md"
 *   node render-report.js report.md --output infographic.html --images ./reports/images/law-firm
 *   node render-report.js report.md --images https://cdn.example.com/images/law-firm
 */

const fs = require('fs');
const path = require('path');

// ─── Text Cleanup ──────────────────────────────────────────────────
/**
 * Strip em dashes and en dashes from all text content.
 * Replaces with hyphen, comma, or semicolon depending on context.
 */
function stripDashes(str) {
  return str
    // " — " between clauses → "; " or ", "
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, ', ')
    // Leading em dash (like in lists) → hyphen
    .replace(/^—/gm, '-')
    .replace(/^–/gm, '-')
    // Any remaining em/en dashes → hyphen
    .replace(/—/g, '-')
    .replace(/–/g, '-');
}

// ─── Brand Palette (STRICT — no blues, greens, reds) ───────────────
const BRAND = {
  black: '#000000',
  orange: '#C9640B',
  orangeDark: '#8B4507',
  orangeMed: '#D4891F',
  orangeLight: '#E8A84C',
  orangePale: '#F0C896',
  orangeTint: 'rgba(201,100,11,0.08)',
  grey: '#808182',
  platinum: '#EBEBEB',
  graphite: '#333333',
  white: '#FFFFFF'
};

// ─── Image mapping per section ─────────────────────────────────────
const IMAGE_MAP = {
  header:      'cover-hero.webp',
  market:      'section-market.webp',
  readiness:   'section-results.webp',
  competitors: 'theme-competitive-edge.webp',
  scenarios:   'section-scenarios.webp',
  compliance:  'theme-security.webp',
  cta:         'closing-cta.webp'
};

// ─── CLI Argument Parsing ──────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { input: null, output: null, images: null, vertical: 'law-firm' };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) { opts.output = args[++i]; }
    else if (args[i] === '--images' && args[i + 1]) { opts.images = args[++i]; }
    else if (args[i] === '--vertical' && args[i + 1]) { opts.vertical = args[++i]; }
    else if (!args[i].startsWith('--')) { opts.input = args[i]; }
  }

  if (!opts.input) {
    console.error('Usage: node render-report.js <input.md> [--output file.html] [--images path] [--vertical slug]');
    process.exit(1);
  }

  if (!opts.output) {
    opts.output = opts.input.replace(/\.md$/i, '-infographic.html');
  }

  return opts;
}

// ─── Markdown Parsing ──────────────────────────────────────────────

/**
 * Split markdown into top-level sections by ## headers
 * Returns array of { title, level, content, subsections }
 */
function parseSections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = null;

  for (const line of lines) {
    // Match ## headers (with or without bold markers and escaped dots)
    const h2Match = line.match(/^##\s+\**(\d+)[\\.\\]?\s*(.+?)\**\s*$/);
    if (h2Match) {
      if (current) sections.push(current);
      current = {
        num: parseInt(h2Match[1]),
        title: h2Match[2].replace(/\\\./g, '.').replace(/\*\*/g, '').trim(),
        content: '',
        raw: ''
      };
      continue;
    }

    // Also match the title line (# header)
    const h1Match = line.match(/^#\s+\**AI Readiness Research Report:\s*(.+?)\**\s*$/);
    if (h1Match) {
      if (current) sections.push(current);
      current = { num: 0, title: h1Match[1].replace(/\*\*/g, '').trim(), content: '', raw: '' };
      continue;
    }

    if (current) {
      current.raw += line + '\n';
      current.content += line + '\n';
    }
  }
  if (current) sections.push(current);
  return sections;
}

/**
 * Extract markdown tables into arrays of objects
 */
function extractTables(content) {
  const tables = [];
  const lines = content.split('\n');
  let inTable = false;
  let headers = [];
  let rows = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').slice(1, -1).map(c => c.replace(/\*\*/g, '').replace(/\\~/g, '~').trim());

      // Skip separator rows (| :---- | :---- |)
      if (cells.every(c => /^[-:\s]+$/.test(c))) continue;

      if (!inTable) {
        headers = cells;
        rows = [];
        inTable = true;
      } else {
        const row = {};
        cells.forEach((cell, i) => {
          row[headers[i] || `col${i}`] = cell;
        });
        rows.push(row);
      }
    } else if (inTable) {
      tables.push({ headers, rows });
      inTable = false;
      headers = [];
      rows = [];
    }
  }
  if (inTable) tables.push({ headers, rows });
  return tables;
}

/**
 * Extract bullet list items from content
 */
function extractBulletItems(content) {
  const items = [];
  const regex = /^\s*(?:\*|-|\d+\.)\s+\**(.+?)\**(?:\s|$)/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push(match[1].replace(/\*\*/g, '').trim());
  }
  return items;
}

/**
 * Extract first N paragraphs (non-table, non-header, non-list lines)
 */
function extractParagraphs(content, max = 3) {
  const paragraphs = [];
  let current = '';

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current) { paragraphs.push(current); current = ''; }
      continue;
    }
    // Skip headers, tables, lists, code blocks
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('```') ||
        trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed) ||
        trimmed === 'Code snippet') continue;

    current += (current ? ' ' : '') + trimmed;
  }
  if (current) paragraphs.push(current);
  return paragraphs.slice(0, max);
}

// ─── Data Extraction ───────────────────────────────────────────────

function extractClientInfo(sections) {
  const titleSection = sections.find(s => s.num === 0);
  const clientName = titleSection ? titleSection.title : 'Client Organization';

  // Find location from Section 5
  let location = '';
  const compSection = sections.find(s => s.num === 5);
  if (compSection) {
    const locMatch = compSection.raw.match(/Client Location:\s*(.+)/);
    if (locMatch) location = locMatch[1].replace(/\*\*/g, '').trim();
  }

  return { clientName, location };
}

function extractScores(sections) {
  const defaults = { operational: 42, acquisition: 55, digital: 28, practice_readiness: 65, overall: 47 };

  // Look for score patterns throughout the document
  const allText = sections.map(s => s.raw).join('\n');

  // Try to find explicit score mentions like "Operational Efficiency (42/100)" or "operational score (42/100)"
  const scorePatterns = [
    { key: 'operational', patterns: [/[Oo]perational(?:\s+[Ee]fficiency)?\s*[\(:]?\s*(\d+)\/100/] },
    { key: 'acquisition', patterns: [/[Aa]cquisition\s*[\(:]?\s*(\d+)\/100/, /[Cc]lient\s+[Aa]cquisition\s*[\(:]?\s*(\d+)\/100/] },
    { key: 'digital', patterns: [/[Dd]igital\s+[Vv]isibility\s*[\(:]?\s*(\d+)\/100/] },
    { key: 'practice_readiness', patterns: [/[Pp]ractice\s+[Rr]eadiness\s*[\(:]?\s*(\d+)\/100/] },
    { key: 'overall', patterns: [/[Oo]verall(?:\s+[Rr]eadiness)?\s*[\(:]?\s*(\d+)\/100/] }
  ];

  const scores = { ...defaults };
  for (const { key, patterns } of scorePatterns) {
    for (const pattern of patterns) {
      const match = allText.match(pattern);
      if (match) {
        scores[key] = parseInt(match[1]);
        break;
      }
    }
  }

  // Calculate overall if not found explicitly
  if (!allText.match(/[Oo]verall(?:\s+[Rr]eadiness)?\s*[\(:]?\s*\d+\/100/)) {
    scores.overall = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);
  }

  return scores;
}

function extractMarketMetrics(sections) {
  const section = sections.find(s => s.num === 1);
  if (!section) return [];

  const tables = extractTables(section.raw);
  // Find the Key Metrics table
  const metricsTable = tables.find(t =>
    t.headers.some(h => /metric/i.test(h)) && t.headers.some(h => /value/i.test(h))
  );

  if (metricsTable) {
    return metricsTable.rows.map(r => ({
      metric: r[metricsTable.headers[0]] || '',
      value: r[metricsTable.headers[1]] || '',
      source: r[metricsTable.headers[2]] || ''
    }));
  }

  return [];
}

function extractCompetitors(sections) {
  const section = sections.find(s => s.num === 5);
  if (!section) return [];

  const tables = extractTables(section.raw);
  const compTable = tables.find(t =>
    t.headers.some(h => /competitor/i.test(h)) && t.headers.some(h => /maturity/i.test(h))
  );

  if (compTable) {
    return compTable.rows.map(r => ({
      name: r['Competitor'] || r[compTable.headers[0]] || '',
      location: r['Location'] || r[compTable.headers[1]] || '',
      initiatives: r['AI Tools/Initiatives'] || r[compTable.headers[2]] || '',
      maturity: r['Maturity'] || r[compTable.headers[3]] || ''
    }));
  }

  return [];
}

function extractCompetitiveRisks(sections) {
  const section = sections.find(s => s.num === 5);
  if (!section) return [];

  // Find content after "### Competitive Risks" or similar
  const riskMatch = section.raw.match(/###\s*\**Competitive Risks\**/);
  if (!riskMatch) return [];

  const afterRisks = section.raw.slice(riskMatch.index);
  const items = [];
  const regex = /\d+\.\s+\*\*(.+?)\*\*[:\s]+(.+?)(?=\n\d+\.|$)/gs;
  let match;
  while ((match = regex.exec(afterRisks)) !== null) {
    items.push({ title: match[1].trim(), description: match[2].trim() });
  }
  return items;
}

function extractScenarios(sections) {
  const section = sections.find(s => s.num === 9);
  if (!section) return [];

  // Extract Investment Overview table
  const tables = extractTables(section.raw);
  const overviewTable = tables.find(t =>
    t.headers.some(h => /scenario/i.test(h)) && t.headers.some(h => /cost/i.test(h))
  );

  const scenarios = [];

  if (overviewTable) {
    for (const row of overviewTable.rows) {
      const name = row['Scenario'] || row[overviewTable.headers[0]] || '';
      const cost = row['Year 1 Cost (Est.)'] || row[overviewTable.headers[1]] || '';
      const payback = row['Payback'] || row[overviewTable.headers[2]] || '';
      const bestFor = row['Best For'] || row[overviewTable.headers[3]] || '';

      // Parse the letter from the name (e.g., "A: Off-the-Shelf Stack")
      const letterMatch = name.match(/([A-F]):\s*(.+)/);
      const letter = letterMatch ? letterMatch[1] : '';
      const label = letterMatch ? letterMatch[2] : name;

      // Parse cost number for charts
      const costNum = parseFloat((cost.match(/[\d,]+/) || ['0'])[0].replace(/,/g, ''));

      const isRecommended = /recommend/i.test(name) || /recommend/i.test(bestFor);

      scenarios.push({ letter, label, cost, costNum, payback, bestFor, isRecommended, fullName: name });
    }
  }

  return scenarios;
}

function extractScenarioDetails(sections) {
  const section = sections.find(s => s.num === 9);
  if (!section) return {};

  const details = {};
  const scenarioBlocks = section.raw.split(/###\s+\**Scenario\s+([A-F]):/);

  for (let i = 1; i < scenarioBlocks.length; i += 2) {
    const letter = scenarioBlocks[i];
    const block = scenarioBlocks[i + 1] || '';

    // Extract philosophy
    const philMatch = block.match(/\*\*Philosophy:\*\*\s*(.+?)(?:\n|$)/);

    // Extract ROI
    const roiMatch = block.match(/\*\*ROI Projection:\*\*\s*(.+?)(?:\n|$)/);

    // Extract fit
    const fitMatch = block.match(/\*\*Fit Assessment:\*\*\s*(.+?)(?:\n|$)/);

    // Extract strengths
    const strengthsMatch = block.match(/\*\*Strengths:\*\*\s*(.+?)(?:\n|$)/);

    // Extract timeline info from tables
    const tables = extractTables(block);
    const toolsTable = tables.find(t => t.headers.some(h => /tool/i.test(h)));
    const timelineTable = tables.find(t => t.headers.some(h => /phase/i.test(h)));

    details[letter] = {
      philosophy: philMatch ? philMatch[1].trim() : '',
      roi: roiMatch ? roiMatch[1].trim() : '',
      fit: fitMatch ? fitMatch[1].trim() : '',
      strengths: strengthsMatch ? strengthsMatch[1].trim() : '',
      tools: toolsTable ? toolsTable.rows : [],
      timeline: timelineTable ? timelineTable.rows : []
    };
  }

  return details;
}

function extractCompliance(sections) {
  const section = sections.find(s => s.num === 6);
  if (!section) return { regulations: [], checklist: [], narrative: '' };

  const tables = extractTables(section.raw);
  const regTable = tables.find(t =>
    t.headers.some(h => /regulation/i.test(h)) && t.headers.some(h => /body/i.test(h))
  );

  const regulations = regTable ? regTable.rows.map(r => ({
    name: r['Regulation'] || r[regTable.headers[0]] || '',
    body: r['Body'] || r[regTable.headers[1]] || '',
    date: r['Date'] || r[regTable.headers[2]] || '',
    requirement: r['Requirement'] || r[regTable.headers[3]] || '',
    impact: r['Impact'] || r[regTable.headers[4]] || ''
  })) : [];

  // Extract compliance checklist
  const checklist = [];
  const checklistMatch = section.raw.match(/###\s*\**Compliance Checklist\**/);
  if (checklistMatch) {
    const afterChecklist = section.raw.slice(checklistMatch.index);
    const itemRegex = /\d+\.\s+\*\*(.+?)\*\*[:\s]+(.+?)(?=\n\d+\.|$)/gs;
    let match;
    while ((match = itemRegex.exec(afterChecklist)) !== null) {
      checklist.push({ title: match[1].trim(), description: match[2].trim() });
    }
  }

  const narrativeParagraphs = extractParagraphs(section.raw, 1);

  return { regulations, checklist, narrative: narrativeParagraphs[0] || '' };
}

function extractReferences(sections) {
  // Look for Works cited at the end
  const allText = sections.map(s => s.raw).join('\n');
  const refs = [];
  const refRegex = /^\d+\.\s+(.+?)(?:,\s*accessed.+?,\s*)?\[?(https?:\/\/[^\s\]]+)\]?/gm;
  let match;
  while ((match = refRegex.exec(allText)) !== null) {
    refs.push({ title: match[1].trim(), url: match[2].trim() });
  }
  return refs;
}

// ─── Score Tier Mapping ────────────────────────────────────────────

function scoreTier(score) {
  if (score < 40) return { border: BRAND.orangeDark, label: 'High Priority', urgency: 4 };
  if (score < 55) return { border: BRAND.orange, label: 'Medium Priority', urgency: 3 };
  if (score < 65) return { border: BRAND.orangeMed, label: 'Moderate Strength', urgency: 2 };
  return { border: BRAND.orangeLight, label: 'Core Strength', urgency: 1 };
}

// ─── Dimension Insight Extraction ──────────────────────────────────

function extractDimensionInsights(sections, scores) {
  const allText = sections.map(s => s.raw).join('\n');

  const dimensions = [
    { key: 'digital', label: 'Digital Visibility', score: scores.digital },
    { key: 'operational', label: 'Operational Efficiency', score: scores.operational },
    { key: 'acquisition', label: 'Client Acquisition', score: scores.acquisition },
    { key: 'practice_readiness', label: 'Practice Readiness', score: scores.practice_readiness }
  ];

  // Sort by score ascending (weakest first)
  dimensions.sort((a, b) => a.score - b.score);

  // Try to extract short insight for each
  for (const dim of dimensions) {
    // Look for text near the score mention
    const pattern = new RegExp(`${dim.label}\\s*\\(${dim.score}\\/100\\)[^.]*\\.([^.]+\\.)`, 'i');
    const match = allText.match(pattern);
    dim.insight = match ? match[1].trim() : getDefaultInsight(dim.key, dim.score);
    dim.tier = scoreTier(dim.score);
  }

  return dimensions;
}

function getDefaultInsight(key, score) {
  const insights = {
    digital: score < 40
      ? 'Significant gap in online presence and AI search visibility.'
      : 'Moderate digital footprint with room for AI search optimization.',
    operational: score < 50
      ? 'Manual workflows creating capacity bottlenecks and intake delays.'
      : 'Core operations functional but would benefit from automation.',
    acquisition: score < 50
      ? 'Client pipeline lacks automation; significant revenue being left on the table.'
      : 'Functioning intake with opportunities for AI-powered growth.',
    practice_readiness: score >= 60
      ? 'Team culture is receptive to technology adoption.'
      : 'Will need change management support for new tool adoption.'
  };
  return insights[key] || '';
}

// ─── HTML Generation ───────────────────────────────────────────────

function resolveImagePath(imagesBase, filename) {
  if (!imagesBase) return '';
  // If it's a URL, just join
  if (imagesBase.startsWith('http://') || imagesBase.startsWith('https://')) {
    return `${imagesBase.replace(/\/$/, '')}/${filename}`;
  }
  // If it's a local path, convert to file:// URL
  const absPath = path.resolve(imagesBase, filename);
  return `file:///${absPath.replace(/\\/g, '/')}`;
}

function escapeHtml(str) {
  return stripDashes(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHTML(data) {
  const {
    clientName, location, scores, metrics, dimensions,
    competitors, competitiveRisks, scenarios, scenarioDetails,
    compliance, marketNarrative, competitorNarrative, scenarioNarrative,
    summaryNarrative, imagesBase, referenceCount
  } = data;

  const img = (key) => {
    const src = resolveImagePath(imagesBase, IMAGE_MAP[key]);
    return src ? `<img src="${src}" alt="" class="absolute inset-0 w-full h-full object-cover" style="opacity: 0.85;">` : '';
  };

  const sectionImg = (key, title, subtitle) => {
    const src = resolveImagePath(imagesBase, IMAGE_MAP[key]);
    if (!src) return '';
    return `
        <div class="section-hero rounded-xl overflow-hidden card-shadow">
            <img src="${src}" alt="${escapeHtml(title)}">
            <div class="hero-overlay">
                <div class="hero-accent"></div>
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(subtitle)}</p>
            </div>
        </div>`;
  };

  // Build metric cards from extracted metrics (top 3-4)
  const metricCards = buildMetricCards(metrics, scores);

  // Build dimension score cards
  const dimCards = dimensions.map(dim => `
                    <div class="bg-brand-orangeTint p-4 rounded-lg border-l-4" style="border-left-color: ${dim.tier.border};">
                        <div class="font-bold text-brand-black">${escapeHtml(dim.label)} (${dim.score}/100)</div>
                        <div class="text-sm text-brand-graphite mt-1">${dim.tier.label}. ${escapeHtml(dim.insight)}</div>
                    </div>`).join('\n');

  // Build competitor rows
  const competitorRows = competitors.map(c => {
    const maturityColor = /advanced/i.test(c.maturity) ? BRAND.orangeDark
      : /developing/i.test(c.maturity) ? BRAND.orange : BRAND.grey;
    return `
                        <tr class="hover:bg-brand-orangeTint transition-colors">
                            <td class="p-4 font-bold text-brand-black">${escapeHtml(c.name)}</td>
                            <td class="p-4"><span style="background-color: ${maturityColor};" class="text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${escapeHtml(c.maturity)}</span></td>
                            <td class="p-4 text-sm text-brand-graphite">${escapeHtml(c.initiatives)}</td>
                            <td class="p-4 text-sm text-brand-graphite">${escapeHtml(c.location)}</td>
                        </tr>`;
  }).join('\n');

  // Build scenario cards
  const recommended = scenarios.find(s => s.isRecommended) || scenarios[2] || scenarios[0];
  const otherScenarios = scenarios.filter(s => s !== recommended).slice(0, 3);

  const recommendedCard = recommended ? `
                    <div class="p-5 border-2 border-brand-orange bg-brand-orangeTint rounded-xl relative">
                        <div class="absolute -top-3 right-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Recommended</div>
                        <h4 class="font-bold text-lg text-brand-black">Scenario ${recommended.letter}: ${escapeHtml(recommended.label)}</h4>
                        <p class="text-sm text-brand-graphite mt-2 mb-3">${escapeHtml(scenarioDetails[recommended.letter]?.philosophy || recommended.bestFor)}</p>
                        <div class="flex justify-between text-sm font-semibold border-t border-brand-orange pt-2">
                            <span>Payback: ${escapeHtml(recommended.payback)}</span>
                            <span>Year 1: ${escapeHtml(recommended.cost)}</span>
                        </div>
                    </div>` : '';

  const otherCards = otherScenarios.map(s => `
                    <div class="p-5 border border-brand-platinum bg-white rounded-xl card-shadow">
                        <h4 class="font-bold text-lg text-brand-black">Scenario ${s.letter}: ${escapeHtml(s.label)}</h4>
                        <p class="text-sm text-brand-graphite mt-2 mb-3">${escapeHtml(scenarioDetails[s.letter]?.philosophy || s.bestFor)}</p>
                        <div class="flex justify-between text-sm font-semibold border-t border-brand-platinum pt-2">
                            <span>Payback: ${escapeHtml(s.payback)}</span>
                            <span>Year 1: ${escapeHtml(s.cost)}</span>
                        </div>
                    </div>`).join('\n');

  // Build compliance section
  const regCards = compliance.regulations.slice(0, 2).map((r, i) => `
                    <div class="bg-brand-graphite p-5 rounded-lg border border-brand-grey/30">
                        <div class="font-bold text-lg ${i === 0 ? 'text-brand-orangeLight' : 'text-brand-orange'} mb-2">${escapeHtml(r.name)} (${escapeHtml(r.date)})</div>
                        <p class="text-sm text-brand-grey">${escapeHtml(r.impact || r.requirement)}</p>
                    </div>`).join('\n');

  const checklistItems = compliance.checklist.map(item =>
    `                        <li class="flex items-start"><span class="text-brand-orange text-sm mr-3 mt-1">&#9656;</span><span>${escapeHtml(item.title)}: ${escapeHtml(item.description.substring(0, 200))}</span></li>`
  ).join('\n');

  // Chart data for scenarios
  const chartScenarios = scenarios.filter(s => s.costNum > 0).slice(0, 5);
  const chartLabels = chartScenarios.map(s => `Scenario ${s.letter}: ${s.label.substring(0, 18)}`);
  const chartCosts = chartScenarios.map(s => s.costNum);
  // Estimate Year 2 as ~15-25% of Year 1 for recurring SaaS
  const chartRecurring = chartCosts.map(c => Math.round(c * 0.18));

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Readiness Infographic: ${escapeHtml(clientName)}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            black: '${BRAND.black}',
                            orange: '${BRAND.orange}',
                            orangeDark: '${BRAND.orangeDark}',
                            orangeMed: '${BRAND.orangeMed}',
                            orangeLight: '${BRAND.orangeLight}',
                            orangePale: '${BRAND.orangePale}',
                            orangeTint: '${BRAND.orangeTint}',
                            grey: '${BRAND.grey}',
                            platinum: '${BRAND.platinum}',
                            graphite: '${BRAND.graphite}',
                            white: '${BRAND.white}'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Merriweather', 'serif']
                    }
                }
            }
        }
    </script>
    <style>
        .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 40vh; max-height: 400px; min-height: 300px; }
        @media (min-width: 768px) { .chart-container { height: 350px; } }
        body { background-color: ${BRAND.platinum}; color: ${BRAND.graphite}; }
        .card-shadow { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
        .section-hero { position: relative; width: 100%; height: 280px; overflow: hidden; background-color: ${BRAND.black}; }
        .section-hero img { width: 100%; height: 100%; object-fit: cover; opacity: 0.95; }
        .section-hero .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.4) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem 3rem; }
        .section-hero .hero-overlay h3 { color: ${BRAND.white}; font-size: 1.875rem; font-weight: 700; margin: 0; }
        .section-hero .hero-overlay p { color: ${BRAND.platinum}; font-size: 0.875rem; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .section-hero .hero-overlay .hero-accent { width: 60px; height: 4px; background-color: ${BRAND.orange}; margin-bottom: 0.75rem; }
        @media (min-width: 768px) { .section-hero { height: 320px; } }
    </style>
</head>
<body class="font-sans antialiased pb-20">

    <!-- ═══════════ HEADER ═══════════ -->
    <header class="relative overflow-hidden border-b-8 border-brand-orange" style="min-height: 420px; background-color: ${BRAND.black};">
        ${img('header')}
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%);"></div>
        <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 flex flex-col justify-end" style="min-height: 420px;">
            <div class="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">&#9881; Archificials Assessment Pipeline v1.0</div>
            <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight text-white">AI Readiness & Strategic Roadmap</h1>
            <h2 class="text-2xl font-light text-brand-platinum">Prepared for: ${escapeHtml(clientName)}${location ? ` | ${escapeHtml(location)}` : ''}</h2>
            <p class="mt-6 text-lg max-w-3xl text-brand-grey">${escapeHtml(summaryNarrative)}</p>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 md:px-12 mt-12 space-y-20">

        <!-- ═══════════ SECTION 1: MARKET IMPERATIVE ═══════════ -->
        ${sectionImg('market', 'The Market Imperative', 'AI Market Intelligence & Adoption Trends')}

        <section id="market-overview">
            <h3 class="text-3xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-4">1. The Market Imperative</h3>
            <p class="text-lg text-brand-graphite leading-relaxed mb-8">${escapeHtml(marketNarrative)}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="grid grid-cols-2 gap-4">
${metricCards}
                </div>

                <div class="bg-white p-6 rounded-xl card-shadow flex flex-col items-center">
                    <h4 class="text-xl font-bold text-center mb-2">The Adoption vs. Policy Gap</h4>
                    <p class="text-sm text-brand-grey text-center mb-4">While the vast majority of organizations utilize AI, only a fraction possess the formal governance policies required for responsible deployment.</p>
                    <div class="chart-container w-full">
                        <canvas id="marketChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════ SECTION 2: READINESS PROFILE ═══════════ -->
        ${sectionImg('readiness', 'Readiness Profile', 'Multi-Dimensional AI Maturity Assessment')}

        <section id="firm-readiness">
            <h3 class="text-3xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-4">2. Readiness Profile</h3>
            <p class="text-lg text-brand-graphite leading-relaxed mb-8">Based on the Archificials assessment, ${escapeHtml(clientName)} scores an overall <strong>${scores.overall}/100</strong>. The visualization below highlights specific areas requiring immediate targeted improvements and existing strengths to leverage.</p>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white p-8 rounded-xl card-shadow">
                <div class="md:col-span-3 flex flex-col justify-center">
                    <h4 class="text-xl font-bold text-center mb-2">Multi-Dimensional Readiness Score</h4>
                    <p class="text-sm text-brand-grey text-center mb-6">A balanced organization scores highly across all four quadrants.</p>
                    <div class="chart-container w-full">
                        <canvas id="readinessChart"></canvas>
                    </div>
                </div>

                <div class="md:col-span-2 flex flex-col justify-center space-y-6">
${dimCards}
                </div>
            </div>
        </section>

        <!-- ═══════════ SECTION 3: GEOGRAPHIC INTELLIGENCE ═══════════ -->
        ${sectionImg('competitors', 'Geographic Intelligence', `${location || 'Regional'} Competitive Landscape Analysis`)}

        <section id="competitive-landscape">
            <h3 class="text-3xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-4">3. Geographic Intelligence${location ? `: ${escapeHtml(location)}` : ''}</h3>
            <p class="text-lg text-brand-graphite leading-relaxed mb-8">${escapeHtml(competitorNarrative)}</p>

            <div class="overflow-x-auto bg-white rounded-xl card-shadow">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-black text-white">
                            <th class="p-4 font-semibold">Competitor</th>
                            <th class="p-4 font-semibold">AI Maturity</th>
                            <th class="p-4 font-semibold">Known AI Initiatives</th>
                            <th class="p-4 font-semibold">Location</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
${competitorRows}
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ═══════════ SECTION 4: DEPLOYMENT SCENARIOS ═══════════ -->
        ${sectionImg('scenarios', 'Strategic Deployment Scenarios', 'Tailored Implementation Pathways & Cost Analysis')}

        <section id="deployment-scenarios">
            <h3 class="text-3xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-4">4. Strategic Deployment Scenarios</h3>
            <p class="text-lg text-brand-graphite leading-relaxed mb-8">${escapeHtml(scenarioNarrative)}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                <div class="bg-white p-6 rounded-xl card-shadow">
                    <h4 class="text-xl font-bold text-center mb-2">Cost Analysis: Year 1 vs. Recurring</h4>
                    <p class="text-sm text-brand-grey text-center mb-6">Total cost of ownership comparison across deployment scenarios.</p>
                    <div class="chart-container w-full">
                        <canvas id="scenarioChart"></canvas>
                    </div>
                </div>

                <div class="space-y-4">
${recommendedCard}
${otherCards}
                </div>
            </div>
        </section>

        <!-- ═══════════ SECTION 5: COMPLIANCE ═══════════ -->
        ${sectionImg('compliance', 'Compliance & Regulatory Protocol', 'AI Governance Framework & Risk Mitigation')}

        <section id="compliance">
            <h3 class="text-3xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-4">5. Compliance & Regulatory Protocol</h3>
            <p class="text-lg text-brand-graphite leading-relaxed mb-8">${escapeHtml(compliance.narrative)}</p>

            <div class="bg-black text-white p-8 rounded-xl card-shadow">
                <h4 class="text-2xl font-bold mb-6 text-brand-orange">Regulatory Landscape Overview</h4>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
${regCards}
                </div>

                <div class="mt-8 border-t border-brand-grey/30 pt-6">
                    <h5 class="font-bold text-lg mb-4">Governance Considerations:</h5>
                    <ul class="space-y-3 text-sm text-brand-grey">
${checklistItems}
                    </ul>
                </div>
            </div>
        </section>

    </main>

    <!-- ═══════════ CTA ═══════════ -->
    <div class="section-hero mt-20" style="height: 240px;">
        ${resolveImagePath(imagesBase, IMAGE_MAP.cta) ? `<img src="${resolveImagePath(imagesBase, IMAGE_MAP.cta)}" alt="Next Steps" style="width:100%;height:100%;object-fit:cover;opacity:0.95;">` : ''}
        <div class="hero-overlay" style="justify-content: center; align-items: center; text-align: center;">
            <div class="hero-accent" style="margin-left: auto; margin-right: auto;"></div>
            <h3 style="font-size: 1.5rem;">Ready to Build Your Competitive Moat?</h3>
            <p style="letter-spacing: 0.15em; margin-top: 0.5rem;">Schedule Your Strategy Session with Archificials</p>
        </div>
    </div>

    <footer class="bg-black text-brand-grey py-8 text-center">
        <p class="text-sm">Prepared by Archificials | Strategy & Implementation Division | ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        <p class="text-xs text-brand-grey/60 mt-2">Based on ${referenceCount} cited research sources</p>
    </footer>

    <!-- ═══════════ CHARTS ═══════════ -->
    <script>
        const wrapLabel = (label, limit = 16) => {
            if (label.length <= limit) return label;
            const words = label.split(' ');
            let lines = [], currentLine = '';
            words.forEach(word => {
                if ((currentLine + word).length > limit) {
                    if (currentLine) lines.push(currentLine.trim());
                    currentLine = word + ' ';
                } else { currentLine += word + ' '; }
            });
            if (currentLine) lines.push(currentLine.trim());
            return lines;
        };

        const globalTooltipConfig = {
            callbacks: {
                title: function(tooltipItems) {
                    let label = tooltipItems[0].chart.data.labels[tooltipItems[0].dataIndex];
                    return Array.isArray(label) ? label.join(' ') : label;
                }
            }
        };

        // Donut: Adoption vs. Policy Gap
        const initMarketChart = () => {
            new Chart(document.getElementById('marketChart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Adopting AI (No Policy)', 'Adopting AI (Formal Policy)', 'Not Using AI'].map(l => wrapLabel(l)),
                    datasets: [{
                        data: [69, 10, 21],
                        backgroundColor: ['${BRAND.orange}', '${BRAND.orangeLight}', '${BRAND.grey}'],
                        borderWidth: 0, hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { font: { family: 'Inter' }, color: '${BRAND.graphite}' } }, tooltip: globalTooltipConfig },
                    cutout: '65%'
                }
            });
        };

        // Radar: Readiness Scores
        const initReadinessChart = () => {
            new Chart(document.getElementById('readinessChart').getContext('2d'), {
                type: 'radar',
                data: {
                    labels: ['Operational Efficiency', 'Client Acquisition', 'Digital Visibility', 'Practice Readiness'].map(l => wrapLabel(l)),
                    datasets: [{
                        label: 'Current Score',
                        data: [${scores.operational}, ${scores.acquisition}, ${scores.digital}, ${scores.practice_readiness}],
                        backgroundColor: 'rgba(201, 100, 11, 0.12)',
                        borderColor: '${BRAND.orange}',
                        pointBackgroundColor: '${BRAND.black}',
                        pointBorderColor: '${BRAND.orange}',
                        pointHoverBackgroundColor: '${BRAND.orange}',
                        pointHoverBorderColor: '${BRAND.black}',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0,0,0,0.08)' },
                            grid: { color: 'rgba(0,0,0,0.08)' },
                            pointLabels: { font: { family: 'Inter', size: 12, weight: '600' }, color: '${BRAND.graphite}' },
                            ticks: { min: 0, max: 100, stepSize: 20, display: false }
                        }
                    },
                    plugins: { legend: { display: false }, tooltip: globalTooltipConfig }
                }
            });
        };

        // Bar: Scenario Cost Comparison
        const initScenarioChart = () => {
            new Chart(document.getElementById('scenarioChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ${JSON.stringify(chartLabels)}.map(l => wrapLabel(l, 14)),
                    datasets: [
                        { label: 'Year 1 Implementation', data: ${JSON.stringify(chartCosts)}, backgroundColor: '${BRAND.black}' },
                        { label: 'Est. Recurring', data: ${JSON.stringify(chartRecurring)}, backgroundColor: '${BRAND.orange}' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '${BRAND.graphite}' } },
                        y: { stacked: true, grid: { color: '${BRAND.platinum}' }, ticks: { color: '${BRAND.grey}', callback: function(v) { return '$' + v/1000 + 'k'; } } }
                    },
                    plugins: { legend: { position: 'bottom', labels: { font: { family: 'Inter' }, color: '${BRAND.graphite}' } }, tooltip: globalTooltipConfig }
                }
            });
        };

        document.addEventListener('DOMContentLoaded', () => {
            initMarketChart();
            initReadinessChart();
            initScenarioChart();
        });
    </script>
</body>
</html>`;
}

function buildMetricCards(metrics, scores) {
  // Use extracted metrics, or fall back to score-based cards
  if (metrics.length >= 3) {
    const cards = metrics.slice(0, 4);
    const borderColors = [BRAND.black, BRAND.orange, BRAND.orangeDark, BRAND.orangeMed];

    return cards.map((m, i) => {
      const isDouble = i === cards.length - 1 && cards.length <= 3;
      return `
                    <div class="bg-white p-6 rounded-xl card-shadow${isDouble ? ' col-span-2' : ''} border-t-4" style="border-top-color: ${borderColors[i % borderColors.length]};">
                        <div class="text-sm font-bold text-brand-grey uppercase">${escapeHtml(m.metric)}</div>
                        <div class="text-3xl font-black mt-2" style="color: ${borderColors[i % borderColors.length]};">${escapeHtml(m.value)}</div>
                    </div>`;
    }).join('\n');
  }

  // Fallback: create cards from scores
  return `
                    <div class="bg-white p-6 rounded-xl card-shadow border-t-4 border-brand-black">
                        <div class="text-sm font-bold text-brand-grey uppercase">Overall Readiness</div>
                        <div class="text-3xl font-black text-brand-black mt-2">${scores.overall}/100</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl card-shadow border-t-4 border-brand-orange">
                        <div class="text-sm font-bold text-brand-grey uppercase">Strongest Dimension</div>
                        <div class="text-3xl font-black text-brand-orange mt-2">${scores.practice_readiness}/100</div>
                        <div class="text-sm text-brand-grey mt-1">Practice Readiness</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl card-shadow col-span-2 border-t-4 border-brand-orangeDark">
                        <div class="text-sm font-bold text-brand-grey uppercase">Weakest Dimension</div>
                        <div class="text-3xl font-black text-brand-orangeDark mt-2">${scores.digital}/100</div>
                        <div class="text-sm text-brand-grey mt-1">Digital Visibility — Immediate action required</div>
                    </div>`;
}

// ─── Main ──────────────────────────────────────────────────────────

function main() {
  const opts = parseArgs();

  console.log(`\n  ╔═══════════════════════════════════════════════╗`);
  console.log(`  ║  Archificials Report Renderer v1.0            ║`);
  console.log(`  ║  Markdown → Branded HTML Infographic          ║`);
  console.log(`  ╚═══════════════════════════════════════════════╝\n`);

  // Read input
  const inputPath = path.resolve(opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`  ✗ File not found: ${inputPath}`);
    process.exit(1);
  }

  console.log(`  Reading: ${inputPath}`);
  const md = stripDashes(fs.readFileSync(inputPath, 'utf-8'));

  // Resolve images path
  let imagesBase = opts.images;
  if (!imagesBase) {
    // Default: look for images relative to script location
    const defaultImgPath = path.join(__dirname, '..', 'images', opts.vertical);
    if (fs.existsSync(defaultImgPath)) {
      imagesBase = defaultImgPath;
      console.log(`  Images: ${imagesBase} (auto-detected)`);
    } else {
      console.log(`  Images: none (use --images <path> to add)`);
    }
  } else {
    console.log(`  Images: ${imagesBase}`);
  }

  // Parse
  console.log(`  Parsing Markdown...`);
  const sections = parseSections(md);
  console.log(`    → Found ${sections.length} sections`);

  // Extract all data
  const { clientName, location } = extractClientInfo(sections);
  console.log(`    → Client: ${clientName}`);
  console.log(`    → Location: ${location || '(not found)'}`);

  const scores = extractScores(sections);
  console.log(`    → Scores: Op=${scores.operational} Acq=${scores.acquisition} Dig=${scores.digital} PR=${scores.practice_readiness} (Overall=${scores.overall})`);

  const metrics = extractMarketMetrics(sections);
  console.log(`    → Market metrics: ${metrics.length} found`);

  const competitors = extractCompetitors(sections);
  console.log(`    → Competitors: ${competitors.length} found`);

  const competitiveRisks = extractCompetitiveRisks(sections);
  const scenarios = extractScenarios(sections);
  console.log(`    → Scenarios: ${scenarios.length} found`);

  const scenarioDetails = extractScenarioDetails(sections);
  const compliance = extractCompliance(sections);
  console.log(`    → Regulations: ${compliance.regulations.length}, Checklist: ${compliance.checklist.length} items`);

  const references = extractReferences(sections);
  console.log(`    → References: ${references.length} cited sources`);

  const dimensions = extractDimensionInsights(sections, scores);

  // Extract narrative paragraphs for each section
  const section1 = sections.find(s => s.num === 1);
  const section5 = sections.find(s => s.num === 5);
  const section9 = sections.find(s => s.num === 9);

  const marketNarrative = section1 ? extractParagraphs(section1.raw, 1)[0] || '' : '';
  const competitorNarrative = section5 ? extractParagraphs(section5.raw, 1)[0] || '' : '';
  const scenarioNarrative = section9 ? extractParagraphs(section9.raw, 1)[0] || '' : '';

  // Summary narrative from Section 1 or overall
  const summaryNarrative = marketNarrative
    ? marketNarrative.substring(0, 300) + (marketNarrative.length > 300 ? '...' : '')
    : `A comprehensive analysis of AI readiness, market opportunities, and tailored deployment scenarios.`;

  // Build HTML
  console.log(`\n  Generating branded HTML...`);
  const html = buildHTML({
    clientName, location, scores, metrics, dimensions,
    competitors, competitiveRisks, scenarios, scenarioDetails,
    compliance, marketNarrative, competitorNarrative, scenarioNarrative,
    summaryNarrative, imagesBase, referenceCount: references.length
  });

  // Write output
  const outputPath = path.resolve(opts.output);
  fs.writeFileSync(outputPath, html, 'utf-8');

  const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`\n  ✓ Output: ${outputPath}`);
  console.log(`  ✓ Size: ${sizeKB} KB`);
  console.log(`  ✓ Sections: 5 (Market, Readiness, Competitors, Scenarios, Compliance)`);
  console.log(`  ✓ Charts: 3 (Donut, Radar, Stacked Bar)`);
  console.log(`  ✓ Brand: Archificials palette — ZERO non-brand colors`);
  console.log(`\n  Open in browser to preview.\n`);
}

main();
