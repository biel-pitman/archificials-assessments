/**
 * Archificials Plotly Chart Utilities
 * 7 chart types for AI readiness presentations
 * Uses Archificials brand colors and typography
 */

export const ARCHIFICIALS_COLORS = {
    primary: '#1a1a2e',
    accent: '#e27308',
    accentHover: '#c96407',
    bgLight: '#f8f9fa',
    card: '#ffffff',
    text: '#1a1a2e',
    textLight: '#6c757d',
    border: '#e0e0e0',
    success: '#28a745',
    
    // Tier colors
    tier1: '#f4c089',  // Getting Started
    tier2: '#f0a050',  // Building Foundations
    tier3: '#e27308',  // Accelerating
    tier4: '#a85206',  // Leading
};

export const PLOTLY_LAYOUT_DEFAULTS = {
    font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: ARCHIFICIALS_COLORS.text,
        size: 12
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { l: 60, r: 40, t: 40, b: 60 },
    showlegend: true,
    legend: {
        orientation: 'h',
        y: -0.15,
        x: 0.5,
        xanchor: 'center'
    },
    hovermode: 'closest'
};

export const PLOTLY_CONFIG = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d']
};

/**
 * 1. Dimension Score Radar Chart
 * Shows 4 dimension scores in a spider/radar chart
 */
export function createDimensionRadarChart(data) {
    // data = { operational: 68, acquisition: 52, digital: 45, readiness: 71 }
    
    const dimensions = [
        'Operational\nEfficiency',
        'Client/Student\nAcquisition',
        'Digital\nVisibility',
        'Practice/Institutional\nReadiness'
    ];
    
    const values = [
        data.operational || 68,
        data.acquisition || 52,
        data.digital || 45,
        data.readiness || 71
    ];
    
    const plotData = [
        {
            type: 'scatterpolar',
            r: values,
            theta: dimensions,
            fill: 'toself',
            name: 'Current Score',
            line: { color: ARCHIFICIALS_COLORS.accent },
            fillcolor: 'rgba(226, 115, 8, 0.2)',
            marker: { size: 8, color: ARCHIFICIALS_COLORS.accent }
        },
        {
            type: 'scatterpolar',
            r: [100, 100, 100, 100],
            theta: dimensions,
            fill: 'toself',
            name: 'Target Score',
            line: { color: ARCHIFICIALS_COLORS.textLight, dash: 'dash' },
            fillcolor: 'transparent',
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

/**
 * 2. Dimension Score Bar Chart
 * Horizontal bars with tier color coding
 */
export function createDimensionBarChart(data) {
    const dimensions = ['Operational Efficiency', 'Client/Student Acquisition', 'Digital Visibility', 'Practice/Institutional Readiness'];
    const values = [data.operational || 68, data.acquisition || 52, data.digital || 45, data.readiness || 71];
    
    // Determine tier colors based on value
    const tierThresholds = {
        1: { max: 24, color: ARCHIFICIALS_COLORS.tier1 },
        2: { max: 49, color: ARCHIFICIALS_COLORS.tier2 },
        3: { max: 74, color: ARCHIFICIALS_COLORS.tier3 },
        4: { max: 100, color: ARCHIFICIALS_COLORS.tier4 }
    };
    
    const colors = values.map(v => {
        if (v <= 24) return tierThresholds[1].color;
        if (v <= 49) return tierThresholds[2].color;
        if (v <= 74) return tierThresholds[3].color;
        return tierThresholds[4].color;
    });
    
    const plotData = [
        {
            type: 'bar',
            orientation: 'h',
            y: dimensions,
            x: values,
            marker: { color: colors },
            text: values.map(v => `${v}/100`),
            textposition: 'outside',
            textfont: { color: ARCHIFICIALS_COLORS.text, weight: 'bold' },
            hovertemplate: '<b>%{y}</b><br>Score: %{x}/100<extra></extra>'
        }
    ];
    
    const layout = {
        ...PLOTLY_LAYOUT_DEFAULTS,
        xaxis: {
            title: 'Score',
            range: [0, 100],
            gridcolor: ARCHIFICIALS_COLORS.border
        },
        yaxis: {
            title: ''
        },
        height: 350,
        margin: { l: 250, r: 80, t: 20, b: 60 }
    };
    
    return { data: plotData, layout, config: PLOTLY_CONFIG };
}

/**
 * 3. Tier Gauge Chart
 * Overall score gauge with tier zones
 */
export function createTierGaugeChart(data) {
    const overallScore = Math.round(
        (data.operational + data.acquisition + data.digital + data.readiness) / 4
    );
    
    // Determine tier label
    let tierLabel = 'Getting Started';
    let tierColor = ARCHIFICIALS_COLORS.tier1;
    if (overallScore > 24) tierLabel = 'Building Foundations';
    tierColor = ARCHIFICIALS_COLORS.tier2;
    if (overallScore > 49) tierLabel = 'Accelerating';
    tierColor = ARCHIFICIALS_COLORS.tier3;
    if (overallScore > 74) tierLabel = 'Leading';
    tierColor = ARCHIFICIALS_COLORS.tier4;
    
    const plotData = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: overallScore,
            title: { text: 'Overall AI Readiness Score', font: { size: 16 } },
            gauge: {
                axis: { range: [0, 100], tickwidth: 2, tickcolor: ARCHIFICIALS_COLORS.border },
                bar: { color: tierColor, thickness: 20 },
                bgcolor: ARCHIFICIALS_COLORS.bgLight,
                borderwidth: 2,
                bordercolor: ARCHIFICIALS_COLORS.border,
                steps: [
                    { range: [0, 24], color: 'rgba(244, 192, 137, 0.2)' },
                    { range: [24, 49], color: 'rgba(240, 160, 80, 0.2)' },
                    { range: [49, 74], color: 'rgba(226, 115, 8, 0.2)' },
                    { range: [74, 100], color: 'rgba(168, 82, 6, 0.2)' }
                ],
                threshold: {
                    line: { color: 'red', width: 0 },
                    thickness: 0.75,
                    value: 90
                }
            },
            number: {
                font: { size: 40, color: tierColor, family: '-apple-system, sans-serif' }
            },
            suffix: ' / 100',
            textfont: { size: 14 }
        }
    ];
    
    const layout = {
        ...PLOTLY_LAYOUT_DEFAULTS,
        height: 400,
        margin: { l: 20, r: 20, t: 80, b: 20 }
    };
    
    // Add annotation for tier label
    layout.annotations = [
        {
            text: `<b>Tier: ${tierLabel}</b>`,
            xref: 'paper',
            yref: 'paper',
            x: 0.5,
            y: -0.1,
            showarrow: false,
            font: { size: 14, color: tierColor }
        }
    ];
    
    return { data: plotData, layout, config: PLOTLY_CONFIG };
}

/**
 * 4. Market Comparison Bar Chart
 * Compare client's capabilities vs industry average
 */
export function createMarketComparisonChart(data) {
    // data = { categories: [...], clientScores: [...], industryAverage: [...] }
    const categories = data.categories || [
        'Platform Maturity',
        'Data Integration',
        'AI Capability',
        'Team Readiness',
        'Investment Level'
    ];
    
    const clientScores = data.clientScores || [62, 48, 55, 71, 38];
    const industryAverage = data.industryAverage || [72, 65, 68, 64, 55];
    
    const plotData = [
        {
            name: '{{CLIENT_NAME}}',
            x: categories,
            y: clientScores,
            type: 'bar',
            marker: { color: ARCHIFICIALS_COLORS.accent }
        },
        {
            name: 'Industry Average',
            x: categories,
            y: industryAverage,
            type: 'bar',
            marker: { color: ARCHIFICIALS_COLORS.textLight, opacity: 0.5 }
        }
    ];
    
    const layout = {
        ...PLOTLY_LAYOUT_DEFAULTS,
        barmode: 'group',
        xaxis: { title: '' },
        yaxis: {
            title: 'Score',
            range: [0, 100],
            gridcolor: ARCHIFICIALS_COLORS.border
        },
        height: 400,
        hovermode: 'x unified'
    };
    
    return { data: plotData, layout, config: PLOTLY_CONFIG };
}

/**
 * 5. ROI Projection Line Chart
 * Projected value over time for deployment scenarios
 */
export function createROIProjectionChart(data) {
    // data = { scenario: 'A', months: [...], roi: [...], investment: [...] }
    const months = data.months || ['Month 0', 'Month 3', 'Month 6', 'Month 12', 'Month 18', 'Month 24'];
    const roiValues = data.roi || [-100, -60, -20, 150, 350, 600];  // In thousands
    const investmentLine = data.investment || [-100, -100, -100, -100, -100, -100];
    
    const plotData = [
        {
            name: 'Cumulative ROI',
            x: months,
            y: roiValues,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: ARCHIFICIALS_COLORS.success, width: 3 },
            marker: { size: 8, color: ARCHIFICIALS_COLORS.success }
        },
        {
            name: 'Investment Level',
            x: months,
            y: investmentLine,
            type: 'scatter',
            mode: 'lines',
            line: { color: ARCHIFICIALS_COLORS.textLight, width: 2, dash: 'dash' },
            marker: { size: 0 }
        }
    ];
    
    const layout = {
        ...PLOTLY_LAYOUT_DEFAULTS,
        xaxis: { title: 'Timeline' },
        yaxis: {
            title: 'Value ($K)',
            gridcolor: ARCHIFICIALS_COLORS.border,
            zeroline: true,
            zerolinecolor: ARCHIFICIALS_COLORS.border
        },
        height: 400,
        hovermode: 'x unified'
    };
    
    return { data: plotData, layout, config: PLOTLY_CONFIG };
}

/**
 * 6. Implementation Timeline Gantt
 * Phase-based timeline for deployment scenarios
 */
export function createImplementationGanttChart(data) {
    // data = { phases: [...], startDates: [...], durations: [...] }
    const phases = data.phases || [
        'Requirements & Planning',
        'Infrastructure Setup',
        'Core Integration',
        'Testing & QA',
        'Deployment',
        'Training & Support'
    ];
    
    const startDates = data.startDates || [
        '2026-04-01',
        '2026-05-01',
        '2026-06-01',
        '2026-08-01',
        '2026-09-01',
        '2026-10-01'
    ];
    
    const endDates = data.endDates || [
        '2026-04-30',
        '2026-05-31',
        '2026-07-31',
        '2026-08-31',
        '2026-09-30',
        '2026-11-30'
    ];
    
    // Create Gantt-like visualization using scatter chart
    const plotData = [];
    phases.forEach((phase, idx) => {
        const start = new Date(startDates[idx]);
        const end = new Date(endDates[idx]);
        const duration = (end - start) / (1000 * 60 * 60 * 24);
        
        plotData.push({
            x: [start, end],
            y: [phase, phase],
            mode: 'lines',
            line: { color: ARCHIFICIALS_COLORS.accent, width: 20 },
            hovertemplate: `<b>${phase}</b><br>Start: ${startDates[idx]}<br>End: ${endDates[idx]}<br>Duration: ${duration} days<extra></extra>`,
            showlegend: false
        });
    });
    
    const layout = {
        ...PLOTLY_LAYOUT_DEFAULTS,
        xaxis: {
            title: 'Timeline',
            type: 'date',
            gridcolor: ARCHIFICIALS_COLORS.border
        },
        yaxis: {
            title: ''
        },
        height: 400,
        margin: { l: 200, r: 40, t: 20, b: 60 }
    };
    
    return { data: plotData, layout, config: PLOTLY_CONFIG };
}

/**
 * 7. Cost Comparison Table Chart
 * Off-the-shelf vs custom vs hybrid costs
 * Rendered as an HTML table (not Plotly, for simplicity)
 */
export function createCostComparisonChart(data) {
    // data = { scenarios: { A: {...}, B: {...}, C: {...}, D: {...} } }
    const scenarios = data.scenarios || {
        A: { label: 'Rapid MVP', cost: 35000, timeline: '3 months', roi_month: 9 },
        B: { label: 'Balanced Growth', cost: 75000, timeline: '6 months', roi_month: 12 },
        C: { label: 'Enterprise Scale', cost: 150000, timeline: '12 months', roi_month: 15 },
        D: { label: 'Custom Build', cost: 200000, timeline: '18 months', roi_month: 18 }
    };
    
    // Return HTML table wrapped in a container for Plotly compatibility
    let tableHTML = `
        <table style="width: 100%; border-collapse: collapse; font-family: -apple-system, sans-serif;">
            <thead>
                <tr style="background: #1a1a2e; color: white;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Scenario</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">Investment</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Timeline</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">ROI Month</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(scenarios).forEach(key => {
        const scenario = scenarios[key];
        tableHTML += `
            <tr style="background: ${key === 'B' ? 'rgba(226, 115, 8, 0.05)' : 'transparent'}; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: 600;">${scenario.label}</td>
                <td style="padding: 12px; text-align: right;">$${(scenario.cost / 1000).toFixed(0)}K</td>
                <td style="padding: 12px;">${scenario.timeline}</td>
                <td style="padding: 12px; text-align: right; color: #28a745; font-weight: 600;">Month ${scenario.roi_month}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    // Return empty Plotly data since we'll render the HTML directly
    return {
        type: 'html',
        html: tableHTML
    };
}

/**
 * Master function to initialize all charts
 * Called in the template with {{CHARTS_JSON}} token
 */
function initializeCharts() {
    // Sample data - will be replaced by assembler in Session 3
    const chartData = {
        operational: 68,
        acquisition: 52,
        digital: 45,
        readiness: 71
    };
    
    // 1. Dimension Radar
    if (document.getElementById('dimension-radar')) {
        const radarChart = createDimensionRadarChart(chartData);
        Plotly.newPlot('dimension-radar', radarChart.data, radarChart.layout, radarChart.config);
    }
    
    // 2. Market Comparison
    if (document.getElementById('market-comparison')) {
        const marketChart = createMarketComparisonChart({});
        Plotly.newPlot('market-comparison', marketChart.data, marketChart.layout, marketChart.config);
    }
    
    // 3. Implementation Gantt
    if (document.getElementById('implementation-gantt')) {
        const ganttChart = createImplementationGanttChart({});
        Plotly.newPlot('implementation-gantt', ganttChart.data, ganttChart.layout, ganttChart.config);
    }
}

// Auto-initialize charts when DOM is ready (browser only)
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCharts);
    } else {
        initializeCharts();
    }
}
