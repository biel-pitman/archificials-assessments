/* Archificials law-firm AI Readiness Assessment v2 | archificials.com */
var ArchificialsAssessmentV2=(()=>{var ve=[],n={phase:"CORE",slideIndex:0,slides:[],selectedModule:null,moduleName:"",moduleIPrimary:null,moduleISecondary:null,answers:{},scores:null,error:null,slideOffset:0,totalAllSlides:0,isSubmitting:!1};function c(e){Object.assign(n,e),ve.forEach(t=>t(n))}function g(e,t){n.answers={...n.answers,[e]:t}}function y(){return n.totalAllSlides}function E(){return n.slideOffset+n.slideIndex}function O(){return n.slides[n.slideIndex]}function S(){let e=y();return e?Math.round(E()/e*100):0}var _=null;function A(e){_=e}function q(){if(document.getElementById("af-v2-styles"))return;let e=_,t=e.BRAND.color,i=document.createElement("style");i.id="af-v2-styles",i.textContent=`
    #${e.ROOT_ID} {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 720px;
      margin: 0 auto;
      padding: 0 20px;
      color: ${t.text};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    #${e.ROOT_ID} * { box-sizing: border-box; }

    /* Header */
    .af-header {
      text-align: center;
      padding: 32px 0 24px;
    }
    .af-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${t.primary};
      margin: 0 0 4px;
    }
    .af-header p {
      font-size: 15px;
      color: ${t.textLight};
      margin: 0;
    }

    /* Progress bar */
    .af-progress-wrap {
      background: ${t.progressBg};
      border-radius: 8px;
      height: 8px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .af-progress-bar {
      height: 100%;
      background: ${t.accent};
      border-radius: 8px;
      transition: width 0.4s ease;
    }
    .af-progress-text {
      text-align: right;
      font-size: 13px;
      color: ${t.textLight};
      margin-bottom: 8px;
    }

    /* Card */
    .af-card {
      background: ${t.card};
      border: 1px solid ${t.border};
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    /* Category label */
    .af-category {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: ${t.accent};
      margin-bottom: 12px;
    }

    /* Question */
    .af-question {
      font-size: 20px;
      font-weight: 600;
      color: ${t.primary};
      margin: 0 0 8px;
    }
    .af-subtitle {
      font-size: 14px;
      color: ${t.textLight};
      margin: 0 0 24px;
    }

    /* Text input */
    .af-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${t.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${t.text};
    }
    .af-input:focus {
      border-color: ${t.accent};
    }
    .af-input::placeholder {
      color: #adb5bd;
    }

    /* Textarea */
    .af-textarea {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${t.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${t.text};
      min-height: 120px;
      resize: vertical;
    }
    .af-textarea:focus {
      border-color: ${t.accent};
    }

    /* Option buttons (single-select) */
    .af-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .af-option {
      padding: 14px 18px;
      border: 2px solid ${t.border};
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
      transition: all 0.2s;
      background: ${t.card};
      text-align: left;
      line-height: 1.4;
    }
    .af-option:hover {
      border-color: ${t.accent};
      background: #fff8f0;
    }
    .af-option.selected {
      border-color: ${t.accent};
      background: #fff0e0;
      font-weight: 600;
    }

    /* Scale (1-5) */
    .af-scale {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 12px;
    }
    .af-scale-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid ${t.border};
      background: ${t.card};
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .af-scale-btn:hover {
      border-color: ${t.accent};
      background: #fff8f0;
    }
    .af-scale-btn.selected {
      border-color: ${t.accent};
      background: ${t.accent};
      color: #fff;
    }
    .af-scale-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: ${t.textLight};
    }

    /* Navigation */
    .af-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0 32px;
    }
    .af-btn {
      padding: 12px 28px;
      font-size: 15px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .af-btn-primary {
      background: ${t.accent};
      color: #fff;
    }
    .af-btn-primary:hover {
      background: ${t.accentHover};
    }
    .af-btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .af-btn-secondary {
      background: transparent;
      color: ${t.textLight};
      border: 1px solid ${t.border};
    }
    .af-btn-secondary:hover {
      background: ${t.bg};
    }

    /* Submit button */
    .af-btn-submit {
      background: ${t.primary};
      color: #fff;
      padding: 16px 40px;
      font-size: 17px;
    }
    .af-btn-submit:hover {
      opacity: 0.9;
    }
    .af-btn-submit:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    /* Submitting state */
    .af-submitting {
      text-align: center;
      padding: 60px 0;
    }
    .af-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid ${t.border};
      border-top-color: ${t.accent};
      border-radius: 50%;
      animation: af-spin 0.8s linear infinite;
      margin: 0 auto 24px;
    }
    @keyframes af-spin {
      to { transform: rotate(360deg); }
    }

    /* Results */
    .af-results {
      text-align: center;
    }

    /* Dimension scores */
    .af-dimensions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;
      text-align: left;
    }
    .af-dim-card {
      background: ${t.bg};
      border-radius: 10px;
      padding: 20px;
    }
    .af-dim-img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .af-dim-pct {
      font-size: 18px;
      font-weight: 600;
      margin-left: 1px;
    }
    .af-dim-name {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      color: ${t.textLight};
      margin-bottom: 8px;
    }
    .af-dim-score {
      font-size: 32px;
      font-weight: 800;
      color: ${t.primary};
      margin-bottom: 4px;
    }
    .af-dim-bar {
      height: 6px;
      background: ${t.progressBg};
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .af-dim-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }
    .af-dim-insight {
      font-size: 13px;
      color: ${t.textLight};
      line-height: 1.5;
    }

    /* Summary / opportunities */
    .af-summary-section {
      text-align: left;
      margin-bottom: 24px;
    }
    .af-summary-section h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 8px;
      color: ${t.primary};
    }
    .af-summary-section p, .af-summary-section li {
      font-size: 14px;
      color: ${t.textLight};
      line-height: 1.6;
    }
    .af-summary-section ol {
      padding-left: 20px;
    }
    .af-summary-section li {
      margin-bottom: 8px;
    }

    /* CTA */
    .af-cta {
      text-align: center;
      padding: 24px 0 16px;
    }
    .af-cta-line {
      font-size: 15px;
      color: ${t.text};
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .af-cta p {
      font-size: 14px;
      color: ${t.textLight};
      margin: 12px 0 0;
    }

    /* Footer */
    .af-footer {
      text-align: center;
      padding: 16px 0 32px;
      font-size: 12px;
      color: #adb5bd;
    }

    /* Module I Picker */
    .af-picker-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 24px;
    }
    .af-picker-btn {
      padding: 14px 16px;
      border: 2px solid ${t.border};
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background: ${t.card};
      text-align: left;
      line-height: 1.3;
    }
    .af-picker-btn:hover {
      border-color: ${t.accent};
      background: #fff8f0;
    }
    .af-picker-btn.selected {
      border-color: ${t.accent};
      background: #fff0e0;
      font-weight: 600;
    }
    .af-picker-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .af-card { padding: 24px 20px; }
      .af-question { font-size: 18px; }
      .af-header h1 { font-size: 24px; }
      .af-dimensions { grid-template-columns: 1fr; }
      .af-score-big { font-size: 56px; }
      .af-scale-btn { width: 48px; height: 48px; font-size: 18px; }
      .af-picker-grid { grid-template-columns: 1fr; }
    }
  `,document.head.appendChild(i)}var f={},k="H";function N(e,t){f=e,k=t||"H"}function h(e){return f[e]||f[k]}function T(){return Object.values(f).filter(e=>e.key!=="I")}function x(e,t){let i=f[e],a=f[t];if(!i||!a)return[];let o=i.questions.slice(0,4),r=a.questions.slice(0,4);return[...o,...r]}var d=null,I={},s=null;function R(e,t){d=e,I=t||{}}function C(e){s=e}function p(){let e=O();if(!e)return;let t=S(),i=E(),a=y(),o=n.answers[e.id]??"",r=n.phase!=="CORE";s.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${d.BRAND.tagline}</p>
    </div>
    ${r?`
      <div class="af-progress-text">Question ${i} of ${a}</div>
      <div class="af-progress-wrap">
        <div class="af-progress-bar" style="width:${t}%"></div>
      </div>
    `:""}
    <div class="af-card">
      ${e.category?`<span class="af-category">${e.category}</span>`:""}
      <h2 class="af-question">${e.question}</h2>
      ${e.subtitle?`<p class="af-subtitle">${e.subtitle}</p>`:""}
      <div class="af-answer-area">${we(e,o)}</div>
    </div>
    <div class="af-nav">
      ${i>1?'<button class="af-btn af-btn-secondary" data-action="prev">Back</button>':"<span></span>"}
      ${Ie(e,o)}
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
  `,Oe(e)}function we(e,t){switch(e.type){case"text":case"email":return`<input class="af-input" type="${e.type==="email"?"email":"text"}"
        placeholder="${e.placeholder||""}" value="${u(t)}" data-id="${e.id}" autocomplete="off">`;case"textarea":return`<textarea class="af-textarea" placeholder="${e.placeholder||""}"
        data-id="${e.id}">${u(t)}</textarea>`;case"single-select":return Ee(e,t);case"scale":return xe(e,t);default:return""}}function Ee(e,t){return`<div class="af-options">${e.options.map(a=>{let o=typeof a=="string"?a:a.label;return`<button class="af-option ${t===o?"selected":""}" data-value="${u(o)}">${u(o)}</button>`}).join("")}</div>`}function xe(e,t){let i=[];for(let a=e.min;a<=e.max;a++){let o=t===String(a)?"selected":"";i.push(`<button class="af-scale-btn ${o}" data-value="${a}">${a}</button>`)}return`
    <div class="af-scale">${i.join("")}</div>
    <div class="af-scale-labels">
      <span>${e.minLabel||""}</span>
      <span>${e.maxLabel||""}</span>
    </div>
  `}function Ie(e,t){if(e.type==="single-select"&&e.autoAdvance)return"<span></span>";let o=e.required&&!(t!==""&&t!==void 0&&t!==null)?"disabled":"",r=n.slideIndex===y()-1?"Submit":"Next";return`<button class="${r==="Submit"?"af-btn af-btn-submit":"af-btn af-btn-primary"}" data-action="next" ${o}>${r}</button>`}function Oe(e){let t=s.querySelector(".af-input");t&&(t.addEventListener("input",()=>{g(e.id,t.value.trim()),b(e)}),t.focus());let i=s.querySelector(".af-textarea");i&&(i.addEventListener("input",()=>{g(e.id,i.value.trim()),b(e)}),i.focus()),s.querySelectorAll(".af-option").forEach(a=>{a.addEventListener("click",()=>{let o=a.getAttribute("data-value");g(e.id,o),s.querySelectorAll(".af-option").forEach(r=>r.classList.remove("selected")),a.classList.add("selected"),e.autoAdvance?setTimeout(()=>{let r=new CustomEvent("af-navigate",{detail:{action:"next"}});s.dispatchEvent(r)},250):b(e)})}),s.querySelectorAll(".af-scale-btn").forEach(a=>{a.addEventListener("click",()=>{let o=a.getAttribute("data-value");g(e.id,o),s.querySelectorAll(".af-scale-btn").forEach(r=>r.classList.remove("selected")),a.classList.add("selected"),b(e)})}),s.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",()=>{let o=a.getAttribute("data-action");s.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:o}}))})}),t&&t.addEventListener("keydown",a=>{a.key==="Enter"&&t.value.trim()&&s.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"next"}}))})}function b(e){let t=s.querySelector("[data-action='next']");if(!t)return;let i=n.answers[e.id]??"",a=i!==""&&i!==void 0;t.disabled=e.required&&!a}function L(){s.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${d.BRAND.tagline}</p>
    </div>
    <div class="af-progress-wrap">
      <div class="af-progress-bar" style="width:100%"></div>
    </div>
    <div class="af-card af-submitting">
      <div class="af-spinner"></div>
      <h2 class="af-question">Analyzing your responses</h2>
      <p class="af-subtitle">We're building your personalized readiness report. This typically takes 15-30 seconds.</p>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
  `}function M(e){if(!e||e.fallback||!e.overall_score){s.innerHTML=`
      <div class="af-header">
        <h1>Thank You!</h1>
        <p>${n.answers.firm_name||"Your Firm"} &middot; ${n.moduleName||"Assessment"}</p>
      </div>
      <div class="af-card">
        <h2>Your Assessment Has Been Received</h2>
        <p>We're preparing your personalized AI Readiness Report. You'll receive a detailed analysis at <strong>${n.answers.contact_email||"your email"}</strong> shortly.</p>
        <div class="af-cta">
          <a href="${d.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
            Schedule Your Strategy Session
          </a>
        </div>
      </div>
      <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
    `;return}s.innerHTML=`
    <div class="af-header">
      <h1>Your AI Readiness Report</h1>
      <p>${n.answers.firm_name||"Your Firm"} &middot; ${n.moduleName||"Assessment"}</p>
    </div>
    <div class="af-card af-results">
      <div class="af-dimensions">
        ${v("Operational Efficiency",e.operational,"operational")}
        ${v("Client Acquisition",e.acquisition,"acquisition")}
        ${v("Digital Visibility",e.digital,"digital")}
        ${v("Practice Readiness",e.practice_readiness,"practice_readiness")}
      </div>

      ${e.executive_summary?`
        <div class="af-summary-section">
          <h3>Executive Summary</h3>
          <p>${u(e.executive_summary)}</p>
        </div>
      `:""}

      ${e.top_opportunities&&e.top_opportunities.length?`
        <div class="af-summary-section">
          <h3>Top Opportunities</h3>
          <ol>${e.top_opportunities.map(t=>`<li>${u(t)}</li>`).join("")}</ol>
        </div>
      `:""}

      ${e.recommended_next_steps&&e.recommended_next_steps.length?`
        <div class="af-summary-section">
          <h3>Recommended Next Steps</h3>
          <ol>${e.recommended_next_steps.map(t=>`<li>${u(t)}</li>`).join("")}</ol>
        </div>
      `:""}

      <div class="af-cta">
        ${e.cta_line?`<p class="af-cta-line">${u(e.cta_line)}</p>`:""}
        <a href="${d.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
          Schedule Your Strategy Session
        </a>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
  `}function Se(e){return e<30?"#f4c089":e<50?"#f0a050":e<70?"#e27308":e<85?"#c96407":"#a85206"}function v(e,t,i){if(!t)return"";let a=t.score??0,o=t.insight||"",r=Se(a);return`
    <div class="af-dim-card">
      ${I[i]?`<img class="af-dim-img" src="${I[i]}" alt="${e}">`:""}
      <div class="af-dim-name">${e}</div>
      <div class="af-dim-score">${a}<span class="af-dim-pct">%</span></div>
      <div class="af-dim-bar">
        <div class="af-dim-fill" style="width:${a}%; background:${r}"></div>
      </div>
      ${o?`<div class="af-dim-insight">${u(o)}</div>`:""}
    </div>
  `}function P(e){s.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${d.BRAND.tagline}</p>
    </div>
    <div class="af-progress-text">Customizing your assessment</div>
    <div class="af-progress-wrap">
      <div class="af-progress-bar" style="width:28%"></div>
    </div>
    <div class="af-card">
      <span class="af-category">MULTI-PRACTICE</span>
      <h2 class="af-question">Select your top two practice areas</h2>
      <p class="af-subtitle">We'll tailor the remaining questions to your two strongest areas. Pick exactly two.</p>
      <div class="af-options">
        ${e.map(a=>`<button class="af-option" data-key="${a.key}">${u(a.name)}</button>`).join("")}
      </div>
    </div>
    <div class="af-nav">
      <button class="af-btn af-btn-secondary" data-action="prev">Back</button>
      <button class="af-btn af-btn-primary" data-action="confirm-module-i" disabled>Continue</button>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
  `;let t=new Set,i=s.querySelector("[data-action='confirm-module-i']");s.querySelectorAll(".af-option").forEach(a=>{a.addEventListener("click",()=>{let o=a.getAttribute("data-key");if(t.has(o))t.delete(o),a.classList.remove("selected");else{if(t.size>=2)return;t.add(o),a.classList.add("selected")}i.disabled=t.size!==2})}),i.addEventListener("click",()=>{let a=Array.from(t);s.dispatchEvent(new CustomEvent("af-module-i-selected",{detail:{primary:a[0],secondary:a[1]}}))}),s.querySelector("[data-action='prev']")?.addEventListener("click",()=>{s.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"prev"}}))})}function $(e){s.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${d.BRAND.tagline}</p>
    </div>
    <div class="af-card" style="text-align:center">
      <h2 class="af-question">Something went wrong</h2>
      <p class="af-subtitle">${u(e)}</p>
      <div style="padding-top:16px">
        <button class="af-btn af-btn-primary" data-action="retry">Try Again</button>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${d.BRAND.name}</div>
  `,s.querySelector("[data-action='retry']")?.addEventListener("click",()=>{s.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"retry"}}))})}function u(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}var l=null;function Q(e){l=e,A(l.CONFIG),N(l.MODULES,l.fallbackModule||"H"),R(l.CONFIG,l.DIM_IMAGES),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",D):D()}function D(){let e=document.getElementById(l.CONFIG.ROOT_ID);if(!e){console.warn(`[Archificials V2] Mount element #${l.CONFIG.ROOT_ID} not found.`);return}q(),C(e),c({phase:"CORE",slideIndex:0,slides:l.CORE_QUESTIONS,slideOffset:0,totalAllSlides:0}),p(),_e(e)}function _e(e){e.addEventListener("af-navigate",t=>{let{action:i}=t.detail;i==="next"?Ae(e):i==="prev"?qe(e):i==="retry"&&ke(e)}),e.addEventListener("af-module-i-selected",t=>{let{primary:i,secondary:a}=t.detail;Te(e,i,a)})}function Ae(e){let t=n.slides[n.slideIndex];if(t&&t.required){let i=n.answers[t.id];if(!i||i==="")return}if(t&&t.type==="email"){let i=n.answers[t.id]||"";if(!Le(i))return}if(n.slideIndex>=n.slides.length-1){Ne(e);return}c({slideIndex:n.slideIndex+1}),p(),m()}function qe(e){if(n.slideIndex>0)c({slideIndex:n.slideIndex-1}),p(),m();else if(n.phase==="CLOSING"){let t=h(n.selectedModule),i;l.hasModuleIPicker&&n.selectedModule==="I"&&n.moduleIPrimary?i=x(n.moduleIPrimary,n.moduleISecondary):i=t.questions,c({phase:"MODULE",slides:i,slideIndex:i.length-1,slideOffset:0}),p(),m()}else n.phase==="MODULE"&&(c({phase:"CORE",slides:l.CORE_QUESTIONS,slideIndex:l.CORE_QUESTIONS.length-1,slideOffset:0}),p(),m())}function ke(e){c({error:null,isSubmitting:!1}),c({phase:"CLOSING",slides:l.CLOSING_QUESTIONS,slideIndex:l.CLOSING_QUESTIONS.length-1}),p()}function Ne(e){if(n.phase==="CORE"){let t=l.CONFIG.routingFieldId||"firm_type",i=n.answers[t],a=Re(i,t);if(c({selectedModule:a,moduleName:h(a).name}),l.hasModuleIPicker&&a==="I"){c({phase:"MODULE_I_PICKER"}),P(T()),m();return}let o=h(a),r=o.questions.length+l.CLOSING_QUESTIONS.length;c({phase:"MODULE",slides:o.questions,slideIndex:0,slideOffset:0,totalAllSlides:r}),p(),m()}else n.phase==="MODULE"?(c({phase:"CLOSING",slides:l.CLOSING_QUESTIONS,slideIndex:0,slideOffset:n.slides.length}),p(),m()):n.phase==="CLOSING"&&Ce(e)}function Te(e,t,i){c({moduleIPrimary:t,moduleISecondary:i}),g("module_i_primary",t),g("module_i_secondary",i);let a=x(t,i),o=a.length+l.CLOSING_QUESTIONS.length;c({phase:"MODULE",slides:a,slideIndex:0,slideOffset:0,totalAllSlides:o}),p(),m()}function Re(e,t){let i=l.CORE_QUESTIONS.find(r=>r.id===t),a=l.fallbackModule||"H";if(!i)return a;let o=i.options.find(r=>(typeof r=="string"?r:r.label)===e);return o&&o.route?o.route:a}async function Ce(e){c({phase:"SUBMITTING",isSubmitting:!0}),L(),m();try{let t=l.CONFIG.payloadFieldName||"firm_type",i={...n.answers,version:l.CONFIG.VERSION,[t]:n.moduleName,module_key:n.selectedModule,timestamp:new Date().toISOString()},a=await fetch(l.CONFIG.WORKER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!a.ok){let r=await a.text();throw new Error(`Server error (${a.status}): ${r}`)}let o=await a.json();if(o.error)throw new Error(o.error);c({phase:"RESULTS",scores:o.scores||o,isSubmitting:!1}),M(n.scores),m()}catch(t){console.error("[Archificials V2] Submission error:",t),c({phase:"CLOSING",error:t.message,isSubmitting:!1}),$(t.message||"We were unable to process your assessment. Please try again.")}}function Le(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function m(){let e=document.getElementById(l.CONFIG.ROOT_ID);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}var U={VERSION:"2.0.0",WORKER_URL:"https://law-firm-ai-scorer-v2.law-firm-ai-scorer.workers.dev",ROOT_ID:"ach-af-v2",routingFieldId:"practice_area",payloadFieldName:"practice_area",BRAND:{name:"Archificials",tagline:"Powered by Archificials",website:"https://www.archificials.com",color:{primary:"#1a1a2e",accent:"#e27308",accentHover:"#c96407",bg:"#f8f9fa",card:"#ffffff",text:"#1a1a2e",textLight:"#6c757d",border:"#e0e0e0",success:"#28a745",progressBg:"#e9ecef"}},TIERS:[{max:25,label:"Getting Started",color:"#f4c089"},{max:50,label:"Building Foundations",color:"#f0a050"},{max:75,label:"Accelerating",color:"#e27308"},{max:101,label:"Leading",color:"#a85206"}],WEIGHTS:{operational:.35,acquisition:.25,digital:.2,practice_readiness:.2}};var W=[{id:"firm_name",label:"Q1",category:"FIRM PROFILE",question:"What is the name of your firm?",type:"text",required:!0,placeholder:""},{id:"contact_name",label:"Q2",category:"FIRM PROFILE",question:"Your name and title",type:"text",required:!0,placeholder:"e.g. Jane Smith, Managing Partner"},{id:"contact_email",label:"Q3",category:"FIRM PROFILE",question:"Your email address",subtitle:"We'll send your personalized readiness report here.",type:"email",required:!0,placeholder:""},{id:"firm_size",label:"Q4",category:"FIRM PROFILE",question:"How many attorneys are at your firm?",type:"single-select",required:!0,options:["Solo (1)","Small (2-5)","Mid-size (6-20)","Large (21-50)","Enterprise (51+)"]},{id:"practice_area",label:"Q5",category:"ROUTING",question:"What best describes your firm's primary area of practice?",subtitle:"If your firm spans more than one, select the area that generates most of your work.",type:"single-select",required:!0,autoAdvance:!0,options:[{label:"Personal injury, wrongful death, or mass tort",route:"A"},{label:"Criminal defense, DWI, or civil rights",route:"B"},{label:"Commercial litigation or business disputes",route:"C"},{label:"Intellectual property, technology, or data privacy",route:"D"},{label:"Employment law, labor, or workplace disputes",route:"E"},{label:"Estate planning, trusts, wills, or probate",route:"F"},{label:"Real estate, property transactions, or eminent domain",route:"G"},{label:"Family law, divorce, or custody matters",route:"H"},{label:"We have a mixed or multi-practice firm",route:"I"}]}];var H=[{id:"after_hours",label:"CL1",category:"CLIENT RESPONSIVENESS",question:"When someone contacts your firm outside of business hours, what happens?",type:"single-select",required:!0,options:["They wait until the next business day (voicemail or form submission)","A third-party answering service takes the call","We have an after-hours emergency line handled by staff","We do not have a consistent process for after-hours contact"]},{id:"intake_speed",label:"CL2",category:"CLIENT RESPONSIVENESS",question:"From the moment someone first contacts your firm to a signed engagement agreement, how long does intake typically take?",type:"single-select",required:!0,options:["Same day or next day","2-5 business days","About a week","More than a week","We do not have a consistent intake process"]},{id:"urgency",label:"CL3",category:"INVESTMENT APPETITE",question:"How urgently does your firm need to address the gaps you've identified through this assessment?",type:"scale",required:!0,min:1,max:5,minLabel:"Exploring options",maxLabel:"This needs to move now"},{id:"investment",label:"CL4",category:"INVESTMENT APPETITE",question:"What investment level feels proportionate for acting on this?",type:"single-select",required:!0,options:["Under $5K: start with a targeted pilot","$5K-$25K: a meaningful engagement","$25K-$75K: we are serious about this","$75K+: committed to real transformation","Depends on what you show us"]},{id:"success_vision",label:"OPT1",category:"OPEN RESPONSE",question:"What would success look like for your firm 12 months from now?",subtitle:"Optional \u2014 but the more specific you are, the more targeted your report will be.",type:"textarea",required:!1},{id:"anything_else",label:"OPT2",category:"OPEN RESPONSE",question:"Anything else you would like us to know before we prepare your report?",subtitle:"A specific challenge, competitive pressure, or context that would be useful to know.",type:"textarea",required:!1}];var F="A",z="Personal Injury & Mass Tort",B=[{id:"case_mix_pi",label:"QA1",category:"CASE PROFILE",question:"What types of cases make up the majority of your docket?",type:"single-select",required:!0,options:["Auto accidents and general negligence","Catastrophic or traumatic injury (brain, spine, burn)","Medical malpractice or pharmaceutical liability","Premises liability or product defects","Mass tort or multi-district litigation","A mix across several case types"]},{id:"medical_records_pi",label:"QA2",category:"OPERATIONS",question:"How does your team currently handle medical record and evidence review?",subtitle:"This is typically one of the most time-consuming tasks in PI practice.",type:"single-select",required:!0,options:["An attorney reviews every record personally","Paralegals create summaries for attorney review","We use an outside vendor to organize and summarize records","We have a tool or system that assists with summaries","We don't have a consistent process"]},{id:"case_timeline_pi",label:"QA3",category:"OPERATIONS",question:"From the date a case is retained to a demand package or court filing, what is your typical timeline?",type:"single-select",required:!0,options:["Fast: most cases wrapped within 6 months","Moderate: 6-18 months depending on injury complexity","Extended: most cases run longer than 18 months","Our case timelines vary significantly with no consistent pattern"]},{id:"case_status_pi",label:"QA4",category:"OPERATIONS",question:"How do you keep clients informed during the lifecycle of their case?",subtitle:"Contingency clients are often anxious and have long wait times between updates.",type:"single-select",required:!0,options:["Attorneys call or email clients directly, as needed","Paralegals handle routine updates and status calls","We use a client portal or software that sends automated status updates","Client communication is a known gap for our firm"]},{id:"client_source_pi",label:"QA5",category:"CLIENT ACQUISITION",question:"Where do most of your new cases come from today?",type:"single-select",required:!0,options:["Referrals from other attorneys (primary)","Past client referrals and word of mouth","Medical providers, clinics, or healthcare networks","Google search, paid ads, or digital marketing","A consistent mix of referral and digital sources"]},{id:"demand_letters_pi",label:"QA6",category:"CLIENT ACQUISITION",question:"How do you evaluate case value and advise clients on settlement vs. going to trial?",type:"single-select",required:!0,options:["Attorney judgment based on experience and gut instinct","We review comparable verdicts in our jurisdiction informally","We analyze comparable verdicts, medical costs, and economic loss systematically","We rely heavily on expert recommendations to guide this decision"]},{id:"digital_presence_pi",label:"QA7",category:"DIGITAL VISIBILITY",question:"Does your firm publish verdicts, settlements, or notable case results publicly?",subtitle:"Published results help search engines and AI tools surface your firm to prospective clients.",type:"single-select",required:!0,options:["Yes: we have a dedicated results page with specific figures","We mention outcomes in attorney bios or a news section","Press has covered our cases but we have not published our own","No: results are not published anywhere"]},{id:"bottleneck_pi",label:"QA8",category:"OPERATIONS",question:"What is the biggest obstacle to handling more cases or resolving them faster?",type:"single-select",required:!0,options:["Not enough qualified intake leads coming through","Medical record and evidence review takes too long","Drafting demands, motions, and briefs is a bottleneck","Client communication volume overwhelms the team","Case management and deadline tracking is inconsistent"]}];var G="B",Y="Criminal Defense & Civil Rights",K=[{id:"case_mix_crim",label:"QB1",category:"CASE PROFILE",question:"What types of matters make up most of your caseload?",type:"single-select",required:!0,options:["Felony criminal defense (state and federal courts)","DWI, DUI, or traffic-related criminal offenses","Sex offense or Title IX defense","White collar crime or financial fraud defense","Civil rights and Section 1983 claims","A mix across criminal defense categories"]},{id:"intake_speed_crim",label:"QB2",category:"OPERATIONS",question:"When a new criminal matter comes in, how quickly can your team assess whether and how to help?",subtitle:"Clients facing criminal charges need a fast response. Speed of triage matters significantly to case outcomes and client trust.",type:"single-select",required:!0,options:["Same day: we assess and advise immediately","Within 24-48 hours","Within the week","It varies depending on attorney availability"]},{id:"discovery_crim",label:"QB3",category:"OPERATIONS",question:"How does your team handle discovery review for a complex matter?",subtitle:"Criminal discovery can include police reports, body camera footage, forensic evidence, and witness statements.",type:"single-select",required:!0,options:["The lead attorney reviews all discovery personally","A paralegal does the initial review; attorney reviews flagged items","We use technology or tools to organize and index materials","We don't have a consistent process for discovery organization"]},{id:"sentencing_research_crim",label:"QB4",category:"OPERATIONS",question:"How do you research sentencing ranges, comparable cases, or local jury patterns?",type:"single-select",required:!0,options:["Through Westlaw, LexisNexis, or a formal research service","Through our network of local practitioners who share this knowledge","Relying on attorney experience and professional judgment","We don't have a systematic approach to this research"]},{id:"client_comm_crim",label:"QB5",category:"OPERATIONS",question:"How do you keep clients informed through long proceedings?",subtitle:"Criminal defense clients face immense anxiety and need regular contact to maintain trust in their representation.",type:"single-select",required:!0,options:["Direct attorney communication at all key stages","Paralegals or staff handle routine status communication","We have a structured communication schedule from the start","Client communication is ad hoc \u2014 clients reach out when they need to"]},{id:"client_source_crim",label:"QB6",category:"CLIENT ACQUISITION",question:"Where do most of your new clients come from?",type:"single-select",required:!0,options:["Attorney referrals and professional networks (primary)","Past client referrals and word of mouth","Online reviews, Google search, or legal directories","A consistent mix of referral and digital sources"]},{id:"digital_presence_crim",label:"QB7",category:"DIGITAL VISIBILITY",question:"How would you describe your firm's online reputation and public-facing presence?",subtitle:"Criminal defense clients often search online during high-stress moments. First impressions matter enormously.",type:"single-select",required:!0,options:["Strong: we have reviews, case mentions, and active directory profiles","Moderate: we are listed but profiles are not fully built out","Minimal: basic website, limited reviews, little directory presence","We haven't focused on our online reputation yet"]},{id:"bottleneck_crim",label:"QB8",category:"OPERATIONS",question:"What is the primary bottleneck in your caseload today?",type:"single-select",required:!0,options:["Initial case evaluation and intake decision-making","Reviewing and organizing discovery materials efficiently","Legal research, brief writing, and motion practice","Managing client communication and expectations","Court filings, deadline tracking, and calendar management"]}];var j="C",V="Business & Commercial Litigation",X=[{id:"case_mix_comm",label:"QC1",category:"CASE PROFILE",question:"What types of commercial disputes make up most of your work?",type:"single-select",required:!0,options:["Breach of contract and business tort claims","Shareholder, partnership, or internal business disputes","Employment and workplace litigation","Real estate or construction disputes","IP, trade secret, or technology-related disputes","Government or regulatory enforcement matters","A mix across commercial litigation categories"]},{id:"discovery_comm",label:"QC2",category:"OPERATIONS",question:"How does your team handle large document productions in discovery?",subtitle:"Commercial litigation often involves high document volume. Review process significantly affects matter economics.",type:"single-select",required:!0,options:["Attorneys and paralegals review all documents manually","We use an outside vendor for large-volume document review","We have software tools that help organize and categorize documents","We haven't had to handle large-volume discovery recently"]},{id:"research_comm",label:"QC3",category:"OPERATIONS",question:"How do you develop legal theory and build the research strategy for a new matter?",type:"single-select",required:!0,options:["The lead partner researches and builds the theory personally","Associates research and draft; partners review and direct","We use a combination of research services and internal research","We leverage our experience in similar matters and supplement with research"]},{id:"client_comm_comm",label:"QC4",category:"OPERATIONS",question:"How do you keep business clients informed on complex matters?",subtitle:"Business clients expect regular updates and are often reporting to boards or leadership internally.",type:"single-select",required:!0,options:["Regular written status reports and strategy memos","Periodic calls or meetings as milestones arise","A client portal where they can access matter information","Attorney-driven updates on an ad hoc basis"]},{id:"drafting_comm",label:"QC5",category:"OPERATIONS",question:"How do you develop and produce motions, briefs, and client correspondence?",type:"single-select",required:!0,options:["Partners draft most substantive work directly","Associates draft; partners review, edit, and finalize","We use templates for routine documents; custom work for complex matters","Each attorney has their own drafting workflow"]},{id:"client_source_comm",label:"QC6",category:"CLIENT ACQUISITION",question:"How do most of your new matters originate?",type:"single-select",required:!0,options:["Attorney referrals from other firms (primary)","Business client referrals from existing relationships","In-house counsel recommendations and referrals","Digital visibility, directories, and online reputation"]},{id:"budget_tracking_comm",label:"QC7",category:"OPERATIONS",question:"How do you track matter budgets, billing, and profitability by client?",type:"single-select",required:!0,options:["We track this carefully in our billing software with matter-level reporting","We have general oversight but limited granularity per matter","Attorneys track their own matters independently","Matter budget tracking is an area we know needs improvement"]},{id:"bottleneck_comm",label:"QC8",category:"OPERATIONS",question:"What is the most significant constraint on growing or improving your commercial practice?",type:"single-select",required:!0,options:["Business development and bringing in new matters","Managing multiple complex matters simultaneously","Associate leverage, quality supervision, and output consistency","Administrative overhead, billing, and collection efficiency","Keeping up with legal research across evolving areas of law"]}];var J="D",Z="IP & Technology Law",ee=[{id:"case_mix_ip",label:"QD1",category:"CASE PROFILE",question:"What best describes your IP and technology practice?",type:"single-select",required:!0,options:["IP litigation (patent, trademark, copyright enforcement and defense)","IP prosecution and portfolio management (filings, registrations, strategy)","Technology transactions (SaaS agreements, licensing, development contracts)","Outside general counsel for technology companies and startups","Data privacy, cybersecurity compliance, and breach response","A combination of IP advisory and litigation work"]},{id:"research_ip",label:"QD2",category:"OPERATIONS",question:"How does your team handle prior art searches, trademark clearance, or freedom-to-operate analysis?",subtitle:"Research-intensive tasks that are often bottlenecks in IP prosecution and litigation.",type:"single-select",required:!0,options:["Manually through patent databases, trademark registers, and research tools","Through specialized outside research vendors","Using technology tools integrated into our research workflow","Relying primarily on attorney expertise and judgment","Each matter is handled differently depending on client and complexity"]},{id:"portfolio_ip",label:"QD3",category:"OPERATIONS",question:"How do you manage IP portfolios for clients with many patents, trademarks, or copyrights?",type:"single-select",required:!0,options:["Through dedicated IP portfolio management software","In spreadsheets or custom internal tracking systems","Within our case or matter management software","Portfolio management at this scale is not a major need for us currently"]},{id:"contracts_ip",label:"QD4",category:"OPERATIONS",question:"How do you draft and review technology contracts, licensing agreements, and privacy policies?",type:"single-select",required:!0,options:["From scratch, relying on attorney knowledge and prior work product","Using templates that attorneys customize for each matter","Using contract review tools to flag key terms and deviations","Associates draft; partners review and finalize"]},{id:"regulatory_ip",label:"QD5",category:"OPERATIONS",question:"How do you track regulatory developments in privacy law, cybersecurity standards, and technology legislation?",subtitle:"This area changes faster than any other. Staying current is a core competency for IP and tech firms.",type:"single-select",required:!0,options:["Through dedicated legal news subscriptions and regulatory alert services","Through bar association and industry group involvement","Relying on existing expertise and informal monitoring","Tracking regulatory changes systematically is a gap for us"]},{id:"ogc_delivery_ip",label:"QD6",category:"CLIENT ACQUISITION",question:"For clients you serve as outside general counsel, how do you communicate and deliver advice efficiently?",type:"single-select",required:!0,options:["We have a dedicated matter management and reporting system","Regular check-ins and formal written advice memos","Primarily through email and calls as matters arise","We are building out this service capability"]},{id:"digital_presence_ip",label:"QD7",category:"DIGITAL VISIBILITY",question:"How visible is your firm in the technology and IP legal market?",type:"single-select",required:!0,options:["Well recognized: ranked, awarded, and cited in our target market","Visible through some directories and peer recognition","We have a website and basic directory listings but limited active visibility","Digital visibility is not a current priority for our practice"]},{id:"bottleneck_ip",label:"QD8",category:"OPERATIONS",question:"What is the biggest constraint on your IP or technology practice right now?",type:"single-select",required:!0,options:["Keeping up with the pace of legal change in tech, privacy, and AI law","Managing research and analysis efficiently across many matters","Capacity constraints \u2014 too much work, not enough hours","Client business development in a competitive market","Expanding the team's knowledge base in emerging technology law"]}];var te="E",ae="Employment & Labor Law",ie=[{id:"practice_model_emp",label:"QE1",category:"CASE PROFILE",question:"How would you describe your employment practice model?",type:"single-select",required:!0,options:["Primarily plaintiff-side: representing employees and workers","Primarily defense-side: representing employers and companies","Both plaintiff and defense, depending on the matter","Primarily Title IX investigations and institutional compliance"]},{id:"case_mix_emp",label:"QE2",category:"CASE PROFILE",question:"What types of employment matters make up the majority of your work?",type:"single-select",required:!0,options:["Wrongful termination, retaliation, and discrimination claims","Sexual harassment and hostile workplace claims","Wage and hour disputes and class actions","Trade secret misappropriation and non-compete enforcement","FMLA, ADA, and leave law compliance and disputes","Title IX investigations and institutional defense","A mix across employment law categories"]},{id:"doc_review_emp",label:"QE3",category:"OPERATIONS",question:"When you take on a new matter, how do you review communications, emails, or documents for evidence?",subtitle:"Employment cases are often won or lost on documentary evidence.",type:"single-select",required:!0,options:["Attorneys manually review all relevant communications and documents","Paralegals do an initial review and flag items for attorney attention","We use tools that help organize and search through large document sets","Our document review process varies and is not standardized"]},{id:"drafting_emp",label:"QE4",category:"OPERATIONS",question:"How do you handle demand letters, EEOC responses, and administrative agency filings?",type:"single-select",required:!0,options:["Primarily from scratch, drawing on attorney knowledge and experience","Using templates that attorneys customize for each matter","Associates draft; partners review and finalize","Process varies by attorney and matter type"]},{id:"regulatory_emp",label:"QE5",category:"OPERATIONS",question:"How do you stay current on employment law changes at federal, state, and local levels?",subtitle:"Employment law changes frequently and varies by jurisdiction.",type:"single-select",required:!0,options:["Dedicated legal news and regulatory alert subscriptions","Active bar association and employment law group involvement","Relying on our existing expertise and practitioner network","Tracking employment law changes across jurisdictions is challenging for us"]},{id:"client_comm_emp",label:"QE6",category:"OPERATIONS",question:"How do you communicate with clients through emotionally complex and lengthy proceedings?",type:"single-select",required:!0,options:["Direct attorney communication at all key stages","Regular updates via email, portal, or structured check-ins","Staff or paralegals handle routine client contact","Client communication is ad hoc and varies by matter"]},{id:"preventive_emp",label:"QE7",category:"CLIENT ACQUISITION",question:"Do you provide preventive services to employer clients \u2014 training, handbook review, compliance audits?",type:"single-select",required:!0,options:["Yes, preventive services are a significant part of our practice","We offer this occasionally but it is not a core service","We provide informal advice but do not formalize training or audits","No: we focus on dispute resolution, not prevention"]},{id:"bottleneck_emp",label:"QE8",category:"OPERATIONS",question:"What is the primary bottleneck in your employment practice today?",type:"single-select",required:!0,options:["Managing high volumes of documents and communications evidence","Keeping pace with regulatory complexity across jurisdictions","Client communication and expectation management","Business development and new matter intake","Drafting quality briefs, motions, and correspondence efficiently"]}];var ne="F",oe="Estate Planning, Trusts & Probate",re=[{id:"case_mix_estate",label:"QF1",category:"CASE PROFILE",question:"What types of matters make up the majority of your estate planning work?",type:"single-select",required:!0,options:["Estate planning: wills, trusts, and powers of attorney","Trust administration and probate proceedings","Estate and gift tax planning and optimization","Business succession and ownership transition planning","Charitable giving and foundation formation","Pre- and post-marital agreements","A mix across estate planning and related areas"]},{id:"intake_estate",label:"QF2",category:"OPERATIONS",question:"How do you conduct the initial estate planning interview with a new client?",subtitle:"The quality of intake directly affects how quickly you can produce accurate documents.",type:"single-select",required:!0,options:["Attorney meets with the client and takes manual notes","We send a written questionnaire before the first meeting","We have a structured intake interview that feeds directly into document drafting","Process varies by attorney and client situation"]},{id:"doc_drafting_estate",label:"QF3",category:"OPERATIONS",question:"How do you produce estate planning documents \u2014 wills, trusts, and powers of attorney?",type:"single-select",required:!0,options:["Largely from scratch, based on interview notes and attorney knowledge","Using templates that attorneys populate and customize by client","Using specialized estate planning document drafting software","Associates draft; partners review and finalize"]},{id:"plan_review_estate",label:"QF4",category:"OPERATIONS",question:"When a client's estate plan needs to be reviewed or updated, how does that happen?",subtitle:"Estate plans can quickly become outdated after life events, tax law changes, or asset changes.",type:"single-select",required:!0,options:["We proactively reach out to clients at regular intervals","We contact clients after significant tax law changes","Clients contact us when a life event occurs \u2014 we respond reactively","We do not have a structured ongoing client relationship process"]},{id:"advisor_coord_estate",label:"QF5",category:"OPERATIONS",question:"How do you coordinate with a client's other advisors: CPA, financial planner, wealth manager?",type:"single-select",required:!0,options:["Formal advisor coordination meetings with shared documentation","Ad hoc calls and emails as matters require","We work independently \u2014 the client handles advisor coordination","Cross-advisor coordination is an area we want to improve"]},{id:"client_source_estate",label:"QF6",category:"CLIENT ACQUISITION",question:"How do most of your new estate planning clients find you?",type:"single-select",required:!0,options:["Referrals from other advisors (CPAs, financial planners, wealth managers)","Past client referrals and word of mouth","Bar association and community involvement","Online search, directories, or digital presence"]},{id:"client_education_estate",label:"QF7",category:"OPERATIONS",question:"How do you help clients understand complex structures like irrevocable trusts, FLPs, or charitable vehicles?",subtitle:"Estate planning clients are often highly educated but unfamiliar with legal and tax structure terminology.",type:"single-select",required:!0,options:["In-depth attorney explanation during meetings","We use written summaries, diagrams, or visual aids","We provide educational materials along with the documents","We rely on the client's financial advisor to explain tax implications"]},{id:"bottleneck_estate",label:"QF8",category:"OPERATIONS",question:"What is the biggest operational challenge in your estate planning practice?",type:"single-select",required:!0,options:["Producing complex documents consistently and efficiently","Staying current on estate and tax law changes","Educating clients on complex planning structures","Coordinating across CPAs, financial advisors, and family members","Building ongoing relationships that bring clients back through life events"]}];var se="G",le="Real Estate & Transactional",ce=[{id:"case_mix_re",label:"QG1",category:"CASE PROFILE",question:"What types of real estate or transactional work does your firm primarily handle?",type:"single-select",required:!0,options:["Commercial property acquisition, sale, and leasing","Residential real estate closings and transactions","Real estate development, land use, and entitlements","Eminent domain, condemnation, or government taking defense","Renewable energy leasing (wind, solar) or conservation easements","HOA, condominium, or community association law","A mix across real estate categories"]},{id:"title_review_re",label:"QG2",category:"OPERATIONS",question:"How does your team handle title examination and transaction due diligence?",type:"single-select",required:!0,options:["Attorney personally reviews title commitments and due diligence materials","Paralegals do the initial review; attorney reviews identified issues","A title company handles examination; we review the commitment for legal issues","We use tools or checklists to standardize the due diligence process"]},{id:"contract_drafting_re",label:"QG3",category:"OPERATIONS",question:"How do you draft and review contracts, purchase agreements, and commercial leases?",type:"single-select",required:!0,options:["From prior matter templates that attorneys update for each deal","From scratch based on the specific terms and deal structure","Associates draft; partners review and negotiate","We use contract management tools to track key terms and deadlines"]},{id:"concurrent_mgmt_re",label:"QG4",category:"OPERATIONS",question:"How do you manage multiple transactions or closings running simultaneously?",type:"single-select",required:!0,options:["Through our case or matter management software with deadline tracking","Through a shared firm calendar and standardized checklists","Through individual attorney tracking \u2014 no firm-wide system","Managing concurrent transactions is an area where we want better process"]},{id:"party_coord_re",label:"QG5",category:"OPERATIONS",question:"How do you coordinate communication between clients, lenders, title companies, and other parties?",type:"single-select",required:!0,options:["Primarily by direct email and phone with all parties","Through a deal room or shared document portal","Our paralegal team manages day-to-day communication","Communication is attorney-managed and varies by deal"]},{id:"client_source_re",label:"QG6",category:"CLIENT ACQUISITION",question:"How do most new matters originate for your firm?",type:"single-select",required:!0,options:["Referrals from real estate brokers, developers, or lenders","Past client referrals and repeat business","Attorney and professional network referrals","Online visibility and directory presence"]},{id:"regulatory_re",label:"QG7",category:"OPERATIONS",question:"How do you stay current on zoning, entitlement regulations, and market changes in your area?",type:"single-select",required:!0,options:["Through active monitoring of local planning boards and government filings","Through bar association and real estate law group involvement","Through our existing local knowledge and professional network","Tracking these changes proactively is a challenge for us"]},{id:"bottleneck_re",label:"QG8",category:"OPERATIONS",question:"What is the biggest constraint on your real estate or transactional practice right now?",type:"single-select",required:!0,options:["Transaction volume and capacity during peak cycles","Contract drafting, review, and negotiation speed","Title and due diligence work on complex or high-volume matters","Multi-party communication and coordination across a deal","Regulatory research and staying current on market changes"]}];var de="H",ue="Family Law & Domestic Relations",pe=[{id:"case_mix_family",label:"QH1",category:"CASE PROFILE",question:"What types of family law matters make up the majority of your caseload?",type:"single-select",required:!0,options:["Divorce and property division (primary focus)","Child custody and parenting plan disputes","Child support and spousal maintenance matters","Protective orders and domestic violence matters","Post-decree modifications and enforcement","Prenuptial or postnuptial agreements","A mix across family law categories"]},{id:"financial_gathering_family",label:"QH2",category:"OPERATIONS",question:"How do you gather and organize financial information from clients in divorce matters?",subtitle:"Financial disclosure is one of the most time-consuming phases of a divorce matter.",type:"single-select",required:!0,options:["The client provides documents and the attorney or paralegal organizes them","We send clients a structured financial questionnaire before the first meeting","We use a client portal for document collection and organization","Our financial document process could be significantly more consistent"]},{id:"doc_drafting_family",label:"QH3",category:"OPERATIONS",question:"How do you draft parenting plans, settlement agreements, and proposed orders?",type:"single-select",required:!0,options:["From scratch, based on client and case facts each time","Using templates that attorneys customize for each matter","Associates draft; partners review and finalize","Process varies significantly by attorney"]},{id:"client_comm_family",label:"QH4",category:"OPERATIONS",question:"How do you manage client communication through emotionally intense and lengthy proceedings?",subtitle:"Family law clients often contact the office frequently and may have unrealistic timeline expectations.",type:"single-select",required:!0,options:["Direct attorney communication throughout the matter","Paralegals handle day-to-day client questions","We set clear communication expectations and schedules at intake","Client communication volume is a significant time demand on attorneys"]},{id:"mediation_family",label:"QH5",category:"OPERATIONS",question:"How does your firm approach mediation and alternative dispute resolution?",type:"single-select",required:!0,options:["Most matters go through mediation as standard practice","We use mediation selectively based on the dynamics of each case","We prefer to resolve matters through negotiation before court","We refer mediation to outside neutrals when it is required"]},{id:"client_source_family",label:"QH6",category:"CLIENT ACQUISITION",question:"How do most of your family law clients find you?",type:"single-select",required:!0,options:["Past client referrals and word of mouth","Attorney referrals from other practices","Online reviews, Google search, or legal directories","Community involvement and local reputation"]},{id:"digital_presence_family",label:"QH7",category:"DIGITAL VISIBILITY",question:"How would you describe your firm's online presence and reputation in your market?",type:"single-select",required:!0,options:["Strong: active reviews, attorney profiles, and clear messaging by case type","Moderate: listed on directories but profiles are not fully developed","Minimal: basic website, few reviews, limited visibility","Digital presence is not something we have focused on yet"]},{id:"bottleneck_family",label:"QH8",category:"OPERATIONS",question:"What is the biggest operational challenge in your family law practice today?",type:"single-select",required:!0,options:["Managing high client contact volume and emotional intensity","Financial analysis and document gathering in complex divorces","Drafting agreements, parenting plans, and court documents efficiently","Managing case timelines and court deadlines across a full docket","Keeping billing efficient when client needs vary widely"]}];var me="I",ge="Multi-Practice & General Counsel",fe=[{id:"case_mix_multi",label:"QI1",category:"CASE PROFILE",question:"Which practice areas generate the most work at your firm?",type:"single-select",required:!0,options:["Business formation, transactions, and corporate governance","Civil litigation: commercial, employment, or property disputes","Estate planning, probate, and wealth transfer","Real estate and development","Government, regulatory, or administrative matters","A roughly equal mix across all practice areas"]},{id:"matter_mgmt_multi",label:"QI2",category:"OPERATIONS",question:"How do you manage matters across different practice areas within the same firm?",type:"single-select",required:!0,options:["Each attorney manages their own matters independently","We have a shared matter management system used firm-wide","We cross-refer between practice groups with a coordinating attorney","Matter management consistency across practice areas is a known challenge"]},{id:"cross_practice_multi",label:"QI3",category:"OPERATIONS",question:"When a client brings a matter involving multiple practice areas, how do you coordinate internally?",type:"single-select",required:!0,options:["Formal internal collaboration with a designated lead attorney","Informal coordination through email and calls between attorneys","We assign it to the most senior relevant attorney","We refer out to specialists for areas outside our strongest competencies"]},{id:"client_comm_multi",label:"QI4",category:"OPERATIONS",question:"How do you keep clients informed when matters span long periods or multiple practice areas?",type:"single-select",required:!0,options:["Comprehensive status reports and regular scheduled check-ins","Updates provided when there is something material to report","Each attorney manages their own client relationships independently","Client communication quality is inconsistent across the firm"]},{id:"billing_multi",label:"QI5",category:"OPERATIONS",question:"How do you track time, billing, and profitability across different matter types?",type:"single-select",required:!0,options:["We track carefully with matter-level reporting in our billing system","We have general oversight but limited granularity per matter or practice area","Attorneys track their own matters without firm-wide visibility","Billing and profitability tracking is an area that needs improvement"]},{id:"client_source_multi",label:"QI6",category:"CLIENT ACQUISITION",question:"How do most of your new clients and matters originate?",type:"single-select",required:!0,options:["Referrals from existing clients and professional networks","Reputation and word of mouth in our local market","Attorney referrals across practice areas","Online visibility and directory presence"]},{id:"knowledge_mgmt_multi",label:"QI7",category:"OPERATIONS",question:"How do attorneys stay current across multiple areas of law simultaneously?",subtitle:"In multi-practice firms, knowledge management is a significant challenge.",type:"single-select",required:!0,options:["We have formal knowledge management systems or practice libraries","We rely on individual attorney expertise and peer consultation","We use external research services when a matter requires it","Knowledge management is an area we know we need to invest in"]},{id:"bottleneck_multi",label:"QI8",category:"OPERATIONS",question:"What is the biggest operational challenge in running a multi-practice firm?",type:"single-select",required:!0,options:["Coordinating across practice areas without matters falling through gaps","Keeping attorneys current across multiple legal areas simultaneously","Business development across a diverse range of practice types","Billing and matter management consistency across the firm","Client communication quality across different matter types and attorneys"]}];var ye={A:{key:F,name:z,questions:B},B:{key:G,name:Y,questions:K},C:{key:j,name:V,questions:X},D:{key:J,name:Z,questions:ee},E:{key:te,name:ae,questions:ie},F:{key:ne,name:oe,questions:re},G:{key:se,name:le,questions:ce},H:{key:de,name:ue,questions:pe},I:{key:me,name:ge,questions:fe}};var w="https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v3.0.0/verticals/law-firm/images",he={operational:`${w}/operational.webp`,acquisition:`${w}/acquisition.webp`,digital:`${w}/digital.webp`,practice_readiness:`${w}/practice_readiness.webp`};Q({CONFIG:U,CORE_QUESTIONS:W,CLOSING_QUESTIONS:H,MODULES:ye,DIM_IMAGES:he,hasModuleIPicker:!0,fallbackModule:"I"});})();
