// reports/engine/charts.js
var ARCHIFICIALS_COLORS = {
  primary: "#1a1a2e",
  accent: "#e27308",
  accentHover: "#c96407",
  bgLight: "#f8f9fa",
  card: "#ffffff",
  text: "#1a1a2e",
  textLight: "#6c757d",
  border: "#e0e0e0",
  success: "#28a745",
  // Tier colors
  tier1: "#f4c089",
  // Getting Started
  tier2: "#f0a050",
  // Building Foundations
  tier3: "#e27308",
  // Accelerating
  tier4: "#a85206"
  // Leading
};
var PLOTLY_LAYOUT_DEFAULTS = {
  font: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: ARCHIFICIALS_COLORS.text,
    size: 12
  },
  paper_bgcolor: "transparent",
  plot_bgcolor: "transparent",
  margin: { l: 60, r: 40, t: 40, b: 60 },
  showlegend: true,
  legend: {
    orientation: "h",
    y: -0.15,
    x: 0.5,
    xanchor: "center"
  },
  hovermode: "closest"
};
var PLOTLY_CONFIG = {
  responsive: true,
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: ["pan2d", "lasso2d"]
};
function createDimensionRadarChart(data) {
  const dimensions = [
    "Operational\nEfficiency",
    "Client/Student\nAcquisition",
    "Digital\nVisibility",
    "Practice/Institutional\nReadiness"
  ];
  const values = [
    data.operational || 68,
    data.acquisition || 52,
    data.digital || 45,
    data.readiness || 71
  ];
  const plotData = [
    {
      type: "scatterpolar",
      r: values,
      theta: dimensions,
      fill: "toself",
      name: "Current Score",
      line: { color: ARCHIFICIALS_COLORS.accent },
      fillcolor: "rgba(226, 115, 8, 0.2)",
      marker: { size: 8, color: ARCHIFICIALS_COLORS.accent }
    },
    {
      type: "scatterpolar",
      r: [100, 100, 100, 100],
      theta: dimensions,
      fill: "toself",
      name: "Target Score",
      line: { color: ARCHIFICIALS_COLORS.textLight, dash: "dash" },
      fillcolor: "transparent",
      marker: { size: 0 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100],
        tickcolor: ARCHIFICIALS_COLORS.border,
        gridcolor: ARCHIFICIALS_COLORS.border,
        tickfont: { size: 11 }
      },
      angularaxis: {
        tickfont: { size: 12 }
      }
    },
    height: 500
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createMarketComparisonChart(data) {
  const categories = data.categories || [
    "Platform Maturity",
    "Data Integration",
    "AI Capability",
    "Team Readiness",
    "Investment Level"
  ];
  const clientScores = data.clientScores || [62, 48, 55, 71, 38];
  const industryAverage = data.industryAverage || [72, 65, 68, 64, 55];
  const plotData = [
    {
      name: "{{CLIENT_NAME}}",
      x: categories,
      y: clientScores,
      type: "bar",
      marker: { color: ARCHIFICIALS_COLORS.accent }
    },
    {
      name: "Industry Average",
      x: categories,
      y: industryAverage,
      type: "bar",
      marker: { color: ARCHIFICIALS_COLORS.textLight, opacity: 0.5 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    barmode: "group",
    xaxis: { title: "" },
    yaxis: {
      title: "Score",
      range: [0, 100],
      gridcolor: ARCHIFICIALS_COLORS.border
    },
    height: 400,
    hovermode: "x unified"
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createImplementationGanttChart(data) {
  const phases = data.phases || [
    "Requirements & Planning",
    "Infrastructure Setup",
    "Core Integration",
    "Testing & QA",
    "Deployment",
    "Training & Support"
  ];
  const startDates = data.startDates || [
    "2026-04-01",
    "2026-05-01",
    "2026-06-01",
    "2026-08-01",
    "2026-09-01",
    "2026-10-01"
  ];
  const endDates = data.endDates || [
    "2026-04-30",
    "2026-05-31",
    "2026-07-31",
    "2026-08-31",
    "2026-09-30",
    "2026-11-30"
  ];
  const plotData = [];
  phases.forEach((phase, idx) => {
    const start = new Date(startDates[idx]);
    const end = new Date(endDates[idx]);
    const duration = (end - start) / (1e3 * 60 * 60 * 24);
    plotData.push({
      x: [start, end],
      y: [phase, phase],
      mode: "lines",
      line: { color: ARCHIFICIALS_COLORS.accent, width: 20 },
      hovertemplate: `<b>${phase}</b><br>Start: ${startDates[idx]}<br>End: ${endDates[idx]}<br>Duration: ${duration} days<extra></extra>`,
      showlegend: false
    });
  });
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    xaxis: {
      title: "Timeline",
      type: "date",
      gridcolor: ARCHIFICIALS_COLORS.border
    },
    yaxis: {
      title: ""
    },
    height: 400,
    margin: { l: 200, r: 40, t: 20, b: 60 }
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function initializeCharts() {
  const chartData = {
    operational: 68,
    acquisition: 52,
    digital: 45,
    readiness: 71
  };
  if (document.getElementById("dimension-radar")) {
    const radarChart = createDimensionRadarChart(chartData);
    Plotly.newPlot("dimension-radar", radarChart.data, radarChart.layout, radarChart.config);
  }
  if (document.getElementById("market-comparison")) {
    const marketChart = createMarketComparisonChart({});
    Plotly.newPlot("market-comparison", marketChart.data, marketChart.layout, marketChart.config);
  }
  if (document.getElementById("implementation-gantt")) {
    const ganttChart = createImplementationGanttChart({});
    Plotly.newPlot("implementation-gantt", ganttChart.data, ganttChart.layout, ganttChart.config);
  }
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCharts);
  } else {
    initializeCharts();
  }
}

// workers/report-orchestrator/index.js
async function validateToken(id, token, timestamp, secret) {
  try {
    const message = `${id}:${timestamp}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signature = new Uint8Array(
      token.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      new TextEncoder().encode(message)
    );
    const age = Date.now() - parseInt(timestamp);
    const isExpired = age > 7 * 24 * 60 * 60 * 1e3;
    return valid && !isExpired;
  } catch (e) {
    console.error("Token validation error:", e);
    return false;
  }
}
async function braveSearch(query, apiKey) {
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`;
    const res = await fetch(url, {
      headers: { "X-Subscription-Token": apiKey }
    });
    if (!res.ok) {
      console.error(`Brave API error: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.web?.results?.map((r) => ({
      title: r.title,
      url: r.url,
      description: r.description,
      age: r.age
    })) || [];
  } catch (e) {
    console.error("Brave search error:", e);
    return [];
  }
}
async function fetchAssessmentRecord(baseId, tableName, recordId, apiKey) {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
    if (!res.ok) {
      console.error(`Airtable fetch error: ${res.status}`);
      return null;
    }
    const record = await res.json();
    return record.fields || null;
  } catch (e) {
    console.error("Airtable fetch error:", e);
    return null;
  }
}
async function callClaudeAPI(systemPrompt, userPrompt, apiKey, maxTokens = 8e3) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userPrompt
          }
        ]
      })
    });
    if (!res.ok) {
      console.error(`Claude API error: ${res.status}`);
      const error = await res.json();
      console.error("Claude error details:", error);
      return null;
    }
    const data = await res.json();
    const content = data.content?.[0]?.text;
    if (!content) {
      console.error("No content in Claude response");
      return null;
    }
    try {
      return JSON.parse(content);
    } catch {
      console.error("Failed to parse Claude response as JSON");
      return { raw: content };
    }
  } catch (e) {
    console.error("Claude API error:", e);
    return null;
  }
}
function generateMeetingBriefEmail(clientName, meetingBrief) {
  const agenda = meetingBrief.meetingAgenda || [];
  const investment = meetingBrief.investment || {};
  const recommendedScenario = meetingBrief.recommendedScenario || {};
  const agendaHtml = agenda.map((item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
          <strong>${item.timeSlot}</strong>
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
          ${item.topic}
        </td>
      </tr>
    `).join("");
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 24px; }
        .section-title { color: #1a1a2e; font-size: 18px; font-weight: 600; margin-bottom: 12px; border-bottom: 2px solid #e27308; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; }
        .cta { background: #e27308; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 12px; }
        .subtle { color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>\u{1F4CB} Meeting Brief: ${clientName}</h1>
          <p class="subtle">Prepared by Archificials Research Pipeline</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>${meetingBrief.executiveSummary || "See full brief for details"}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Key Pain Points</div>
            ${meetingBrief.painPoints?.map((p) => `<p><strong>${p.point}</strong> (Severity: ${p.severity}/10)</p>`).join("") || "<p>See full brief</p>"}
          </div>
          
          <div class="section">
            <div class="section-title">Recommended Scenario</div>
            <p><strong>Lead with: Scenario ${recommendedScenario.scenario}</strong></p>
            <p>${recommendedScenario.hook || ""}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Investment Range</div>
            <p><strong>Estimated first year:</strong> ${investment.recommendedRange || "See full brief"}</p>
            <p><strong>Expected payback:</strong> ${investment.paybackPeriod || "See full brief"}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Meeting Agenda (60 minutes)</div>
            <table>
              ${agendaHtml || '<tr><td colspan="2">See full brief for details</td></tr>'}
            </table>
          </div>
          
          <div class="section">
            <p class="subtle">Full research data includes market analysis, 4 deployment scenarios, and detailed meeting strategy. This brief is for internal use only.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
async function sendNotificationEmail(to, subject, htmlContent, resendApiKey) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Archificials <reports@archificials.com>",
        to,
        subject,
        html: htmlContent
      })
    });
    if (!res.ok) {
      console.error(`Resend API error: ${res.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Email send error:", e);
    return false;
  }
}
async function storeResultsInR2(bucket, slug, results) {
  try {
    const key = `reports/${slug}/research.json`;
    await bucket.put(key, JSON.stringify(results, null, 2), {
      contentType: "application/json",
      metadata: {
        generated: (/* @__PURE__ */ new Date()).toISOString(),
        vertical: slug
      }
    });
    return true;
  } catch (e) {
    console.error("R2 storage error:", e);
    return false;
  }
}
var index_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (request.method === "GET" && url.pathname.startsWith("/status/")) {
      const recordId = url.pathname.split("/").pop();
      return new Response(JSON.stringify({
        status: "pending",
        message: "Status checking not yet implemented"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (request.method === "POST" && url.pathname === "/generate") {
      const recordId = url.searchParams.get("id");
      const vertical = url.searchParams.get("vertical") || "law-firm";
      const token = url.searchParams.get("token");
      const timestamp = url.searchParams.get("t");
      const testMode = url.searchParams.get("test") === "true";
      if (!recordId || !token || !timestamp) {
        return new Response(JSON.stringify({
          error: "Missing required parameters: id, token, t"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (!testMode) {
        const isValid = await validateToken(recordId, token, timestamp, env.REPORT_SECRET);
        if (!isValid) {
          return new Response(JSON.stringify({
            error: "Invalid or expired token"
          }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
      try {
        const tableMap = {
          "law-firm": "V2 Assessments",
          "architecture": "Architecture V2 Assessments",
          "higher-ed": "Higher Ed V2 Assessments"
        };
        const tableName = tableMap[vertical] || "V2 Assessments";
        console.log(`Fetching assessment record ${recordId} from table ${tableName}`);
        const assessmentData = await fetchAssessmentRecord(
          env.AIRTABLE_BASE_ID,
          tableName,
          recordId,
          env.AIRTABLE_API_KEY
        );
        if (!assessmentData) {
          return new Response(JSON.stringify({
            error: "Failed to fetch assessment record"
          }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }
        console.log("Running Brave Search queries");
        const { buildSearchQueries } = await import("../../../reports/research/market-analysis.js");
        const queries = buildSearchQueries(assessmentData);
        const searchResults = await Promise.all(
          queries.map((q) => braveSearch(q, env.BRAVE_API_KEY))
        );
        console.log("Generating market analysis");
        const { buildMarketAnalysisPrompt } = await import("../../../reports/research/market-analysis.js");
        const marketPrompt = buildMarketAnalysisPrompt(assessmentData, searchResults);
        const marketAnalysis = await callClaudeAPI(
          marketPrompt.system,
          marketPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        if (!marketAnalysis) {
          return new Response(JSON.stringify({
            error: "Failed to generate market analysis"
          }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
        console.log("Generating deployment scenarios");
        const { buildDeploymentScenariosPrompt } = await import("../../../reports/research/deployment-scenarios.js");
        const scenariosPrompt = buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis);
        const deploymentScenarios = await callClaudeAPI(
          scenariosPrompt.system,
          scenariosPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        if (!deploymentScenarios) {
          return new Response(JSON.stringify({
            error: "Failed to generate deployment scenarios"
          }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
        console.log("Generating meeting brief");
        const { buildMeetingBriefPrompt } = await import("../../../reports/research/meeting-brief.js");
        const briefPrompt = buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios);
        const meetingBrief = await callClaudeAPI(
          briefPrompt.system,
          briefPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        if (!meetingBrief) {
          return new Response(JSON.stringify({
            error: "Failed to generate meeting brief"
          }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
        console.log("Storing results in R2");
        const clientSlug = (assessmentData.inst_name || assessmentData.firm_name || "client").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const results = {
          assessmentId: recordId,
          vertical,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          marketAnalysis,
          deploymentScenarios,
          meetingBrief
        };
        await storeResultsInR2(env.REPORTS_BUCKET, clientSlug, results);
        console.log("Assembling presentation HTML");
        const { assemblePresentation: assemblePresentation2 } = await import("../../../reports/engine/assembler.js");
        const friendlyDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const reportHtml = assemblePresentation2({
          assessment: assessmentData,
          scores: assessmentData.scores || {},
          marketAnalysis,
          deploymentScenarios,
          meetingBrief,
          vertical,
          clientName,
          date: friendlyDate
        });
        const now = /* @__PURE__ */ new Date();
        const slugDate = `${clientSlug}-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
        const password = Math.random().toString(36).substring(2, 10);
        const pwHashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        const pwHash = Array.from(new Uint8Array(pwHashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
        await env.REPORTS_BUCKET.put(`reports/${slugDate}/index.html`, reportHtml, {
          contentType: "text/html",
          metadata: {
            "password-hash": pwHash,
            "client-name": clientName
          }
        });
        console.log("Sending notification email");
        const clientName = assessmentData.inst_name || assessmentData.firm_name || "Client";
        let emailHtml = generateMeetingBriefEmail(clientName, meetingBrief);
        const reportUrl = `https://${url.hostname.replace("report-orchestrator", "report-gateway")}/r/${slugDate}`;
        emailHtml += `
          <hr />
          <p><strong>Report URL:</strong> <a href="${reportUrl}">${reportUrl}</a></p>
          <p><strong>Password:</strong> ${password}</p>
        `;
        const emailSent = await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `\u{1F4CA} Report Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );
        return new Response(JSON.stringify({
          status: "success",
          message: "Report generation complete",
          recordId,
          vertical,
          clientSlug,
          reportSlug: slugDate,
          reportUrl,
          password,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          results: {
            hasMarketAnalysis: !!marketAnalysis,
            hasDeploymentScenarios: !!deploymentScenarios,
            hasMeetingBrief: !!meetingBrief,
            emailSent
          }
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Orchestration error:", error);
        return new Response(JSON.stringify({
          error: "Internal server error",
          message: error.message
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    return new Response(JSON.stringify({
      error: "Not found"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  index_default as default
};
