/* Archificials higher-ed AI Readiness Assessment v2 | archificials.com */
var ArchificialsAssessmentV2=(()=>{var he=[],n={phase:"CORE",slideIndex:0,slides:[],selectedModule:null,moduleName:"",moduleIPrimary:null,moduleISecondary:null,answers:{},scores:null,error:null,slideOffset:0,totalAllSlides:0,isSubmitting:!1};function d(e){Object.assign(n,e),he.forEach(t=>t(n))}function g(e,t){n.answers={...n.answers,[e]:t}}function h(){return n.totalAllSlides}function I(){return n.slideOffset+n.slideIndex}function x(){return n.slides[n.slideIndex]}function _(){let e=h();return e?Math.round(I()/e*100):0}var O=null;function q(e){O=e}function k(){if(document.getElementById("af-v2-styles"))return;let e=O,t=e.BRAND.color,a=document.createElement("style");a.id="af-v2-styles",a.textContent=`
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
  `,document.head.appendChild(a)}var f={},A="H";function N(e,t){f=e,A=t||"H"}function y(e){return f[e]||f[A]}function T(){return Object.values(f).filter(e=>e.key!=="I")}function E(e,t){let a=f[e],i=f[t];if(!a||!i)return[];let o=a.questions.slice(0,4),s=i.questions.slice(0,4);return[...o,...s]}var c=null,S={},r=null;function C(e,t){c=e,S=t||{}}function D(e){r=e}function p(){let e=x();if(!e)return;let t=_(),a=I(),i=h(),o=n.answers[e.id]??"",s=n.phase!=="CORE";r.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${c.BRAND.tagline}</p>
    </div>
    ${s?`
      <div class="af-progress-text">Question ${a} of ${i}</div>
      <div class="af-progress-wrap">
        <div class="af-progress-bar" style="width:${t}%"></div>
      </div>
    `:""}
    <div class="af-card">
      ${e.category?`<span class="af-category">${e.category}</span>`:""}
      <h2 class="af-question">${e.question}</h2>
      ${e.subtitle?`<p class="af-subtitle">${e.subtitle}</p>`:""}
      <div class="af-answer-area">${ye(e,o)}</div>
    </div>
    <div class="af-nav">
      ${a>1?'<button class="af-btn af-btn-secondary" data-action="prev">Back</button>':"<span></span>"}
      ${we(e,o)}
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
  `,Ie(e)}function ye(e,t){switch(e.type){case"text":case"email":return`<input class="af-input" type="${e.type==="email"?"email":"text"}"
        placeholder="${e.placeholder||""}" value="${u(t)}" data-id="${e.id}" autocomplete="off">`;case"textarea":return`<textarea class="af-textarea" placeholder="${e.placeholder||""}"
        data-id="${e.id}">${u(t)}</textarea>`;case"single-select":return be(e,t);case"scale":return ve(e,t);default:return""}}function be(e,t){return`<div class="af-options">${e.options.map(i=>{let o=typeof i=="string"?i:i.label;return`<button class="af-option ${t===o?"selected":""}" data-value="${u(o)}">${u(o)}</button>`}).join("")}</div>`}function ve(e,t){let a=[];for(let i=e.min;i<=e.max;i++){let o=t===String(i)?"selected":"";a.push(`<button class="af-scale-btn ${o}" data-value="${i}">${i}</button>`)}return`
    <div class="af-scale">${a.join("")}</div>
    <div class="af-scale-labels">
      <span>${e.minLabel||""}</span>
      <span>${e.maxLabel||""}</span>
    </div>
  `}function we(e,t){if(e.type==="single-select"&&e.autoAdvance)return"<span></span>";let o=e.required&&!(t!==""&&t!==void 0&&t!==null)?"disabled":"",s=n.slideIndex===h()-1?"Submit":"Next";return`<button class="${s==="Submit"?"af-btn af-btn-submit":"af-btn af-btn-primary"}" data-action="next" ${o}>${s}</button>`}function Ie(e){let t=r.querySelector(".af-input");t&&(t.addEventListener("input",()=>{g(e.id,t.value.trim()),b(e)}),t.focus());let a=r.querySelector(".af-textarea");a&&(a.addEventListener("input",()=>{g(e.id,a.value.trim()),b(e)}),a.focus()),r.querySelectorAll(".af-option").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-value");g(e.id,o),r.querySelectorAll(".af-option").forEach(s=>s.classList.remove("selected")),i.classList.add("selected"),e.autoAdvance?setTimeout(()=>{let s=new CustomEvent("af-navigate",{detail:{action:"next"}});r.dispatchEvent(s)},250):b(e)})}),r.querySelectorAll(".af-scale-btn").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-value");g(e.id,o),r.querySelectorAll(".af-scale-btn").forEach(s=>s.classList.remove("selected")),i.classList.add("selected"),b(e)})}),r.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-action");r.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:o}}))})}),t&&t.addEventListener("keydown",i=>{i.key==="Enter"&&t.value.trim()&&r.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"next"}}))})}function b(e){let t=r.querySelector("[data-action='next']");if(!t)return;let a=n.answers[e.id]??"",i=a!==""&&a!==void 0;t.disabled=e.required&&!i}function R(){r.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${c.BRAND.tagline}</p>
    </div>
    <div class="af-progress-wrap">
      <div class="af-progress-bar" style="width:100%"></div>
    </div>
    <div class="af-card af-submitting">
      <div class="af-spinner"></div>
      <h2 class="af-question">Analyzing your responses</h2>
      <p class="af-subtitle">We're building your personalized readiness report. This typically takes 15-30 seconds.</p>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
  `}function L(e){if(!e||e.fallback||!e.overall_score){r.innerHTML=`
      <div class="af-header">
        <h1>Thank You!</h1>
        <p>${n.answers.firm_name||"Your Firm"} &middot; ${n.moduleName||"Assessment"}</p>
      </div>
      <div class="af-card">
        <h2>Your Assessment Has Been Received</h2>
        <p>We're preparing your personalized AI Readiness Report. You'll receive a detailed analysis at <strong>${n.answers.contact_email||"your email"}</strong> shortly.</p>
        <div class="af-cta">
          <a href="${c.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
            Schedule Your Strategy Session
          </a>
        </div>
      </div>
      <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
    `;return}r.innerHTML=`
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
        <a href="${c.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
          Schedule Your Strategy Session
        </a>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
  `}function Ee(e){return e<30?"#f4c089":e<50?"#f0a050":e<70?"#e27308":e<85?"#c96407":"#a85206"}function v(e,t,a){if(!t)return"";let i=t.score??0,o=t.insight||"",s=Ee(i);return`
    <div class="af-dim-card">
      ${S[a]?`<img class="af-dim-img" src="${S[a]}" alt="${e}">`:""}
      <div class="af-dim-name">${e}</div>
      <div class="af-dim-score">${i}<span class="af-dim-pct">%</span></div>
      <div class="af-dim-bar">
        <div class="af-dim-fill" style="width:${i}%; background:${s}"></div>
      </div>
      ${o?`<div class="af-dim-insight">${u(o)}</div>`:""}
    </div>
  `}function $(e){r.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${c.BRAND.tagline}</p>
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
        ${e.map(i=>`<button class="af-option" data-key="${i.key}">${u(i.name)}</button>`).join("")}
      </div>
    </div>
    <div class="af-nav">
      <button class="af-btn af-btn-secondary" data-action="prev">Back</button>
      <button class="af-btn af-btn-primary" data-action="confirm-module-i" disabled>Continue</button>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
  `;let t=new Set,a=r.querySelector("[data-action='confirm-module-i']");r.querySelectorAll(".af-option").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-key");if(t.has(o))t.delete(o),i.classList.remove("selected");else{if(t.size>=2)return;t.add(o),i.classList.add("selected")}a.disabled=t.size!==2})}),a.addEventListener("click",()=>{let i=Array.from(t);r.dispatchEvent(new CustomEvent("af-module-i-selected",{detail:{primary:i[0],secondary:i[1]}}))}),r.querySelector("[data-action='prev']")?.addEventListener("click",()=>{r.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"prev"}}))})}function M(e){r.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${c.BRAND.tagline}</p>
    </div>
    <div class="af-card" style="text-align:center">
      <h2 class="af-question">Something went wrong</h2>
      <p class="af-subtitle">${u(e)}</p>
      <div style="padding-top:16px">
        <button class="af-btn af-btn-primary" data-action="retry">Try Again</button>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${c.BRAND.name}</div>
  `,r.querySelector("[data-action='retry']")?.addEventListener("click",()=>{r.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"retry"}}))})}function u(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}var l=null;function P(e){l=e,q(l.CONFIG),N(l.MODULES,l.fallbackModule||"H"),C(l.CONFIG,l.DIM_IMAGES),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",U):U()}function U(){let e=document.getElementById(l.CONFIG.ROOT_ID);if(!e){console.warn(`[Archificials V2] Mount element #${l.CONFIG.ROOT_ID} not found.`);return}k(),D(e),d({phase:"CORE",slideIndex:0,slides:l.CORE_QUESTIONS,slideOffset:0,totalAllSlides:0}),p(),Se(e)}function Se(e){e.addEventListener("af-navigate",t=>{let{action:a}=t.detail;a==="next"?xe(e):a==="prev"?_e(e):a==="retry"&&Oe(e)}),e.addEventListener("af-module-i-selected",t=>{let{primary:a,secondary:i}=t.detail;ke(e,a,i)})}function xe(e){let t=n.slides[n.slideIndex];if(t&&t.required){let a=n.answers[t.id];if(!a||a==="")return}if(t&&t.type==="email"){let a=n.answers[t.id]||"";if(!Te(a))return}if(n.slideIndex>=n.slides.length-1){qe(e);return}d({slideIndex:n.slideIndex+1}),p(),m()}function _e(e){if(n.slideIndex>0)d({slideIndex:n.slideIndex-1}),p(),m();else if(n.phase==="CLOSING"){let t=y(n.selectedModule),a;l.hasModuleIPicker&&n.selectedModule==="I"&&n.moduleIPrimary?a=E(n.moduleIPrimary,n.moduleISecondary):a=t.questions,d({phase:"MODULE",slides:a,slideIndex:a.length-1,slideOffset:0}),p(),m()}else n.phase==="MODULE"&&(d({phase:"CORE",slides:l.CORE_QUESTIONS,slideIndex:l.CORE_QUESTIONS.length-1,slideOffset:0}),p(),m())}function Oe(e){d({error:null,isSubmitting:!1}),d({phase:"CLOSING",slides:l.CLOSING_QUESTIONS,slideIndex:l.CLOSING_QUESTIONS.length-1}),p()}function qe(e){if(n.phase==="CORE"){let t=l.CONFIG.routingFieldId||"firm_type",a=n.answers[t],i=Ae(a,t);if(d({selectedModule:i,moduleName:y(i).name}),l.hasModuleIPicker&&i==="I"){d({phase:"MODULE_I_PICKER"}),$(T()),m();return}let o=y(i),s=o.questions.length+l.CLOSING_QUESTIONS.length;d({phase:"MODULE",slides:o.questions,slideIndex:0,slideOffset:0,totalAllSlides:s}),p(),m()}else n.phase==="MODULE"?(d({phase:"CLOSING",slides:l.CLOSING_QUESTIONS,slideIndex:0,slideOffset:n.slides.length}),p(),m()):n.phase==="CLOSING"&&Ne(e)}function ke(e,t,a){d({moduleIPrimary:t,moduleISecondary:a}),g("module_i_primary",t),g("module_i_secondary",a);let i=E(t,a),o=i.length+l.CLOSING_QUESTIONS.length;d({phase:"MODULE",slides:i,slideIndex:0,slideOffset:0,totalAllSlides:o}),p(),m()}function Ae(e,t){let a=l.CORE_QUESTIONS.find(s=>s.id===t),i=l.fallbackModule||"H";if(!a)return i;let o=a.options.find(s=>(typeof s=="string"?s:s.label)===e);return o&&o.route?o.route:i}async function Ne(e){d({phase:"SUBMITTING",isSubmitting:!0}),R(),m();try{let t=l.CONFIG.payloadFieldName||"firm_type",a={...n.answers,version:l.CONFIG.VERSION,[t]:n.moduleName,module_key:n.selectedModule,timestamp:new Date().toISOString()},i=await fetch(l.CONFIG.WORKER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok){let s=await i.text();throw new Error(`Server error (${i.status}): ${s}`)}let o=await i.json();if(o.error)throw new Error(o.error);d({phase:"RESULTS",scores:o.scores||o,isSubmitting:!1}),L(n.scores),m()}catch(t){console.error("[Archificials V2] Submission error:",t),d({phase:"CLOSING",error:t.message,isSubmitting:!1}),M(t.message||"We were unable to process your assessment. Please try again.")}}function Te(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function m(){let e=document.getElementById(l.CONFIG.ROOT_ID);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}var Q={VERSION:"2.0.0",WORKER_URL:"https://higher-ed-ai-scorer-v2.law-firm-ai-scorer.workers.dev",ROOT_ID:"ach-af-v2",routingFieldId:"inst_type",payloadFieldName:"inst_type",BRAND:{name:"Archificials",tagline:"Powered by Archificials",website:"https://www.archificials.com",color:{primary:"#1a1a2e",accent:"#e27308",accentHover:"#c96407",bg:"#f8f9fa",card:"#ffffff",text:"#1a1a2e",textLight:"#6c757d",border:"#e0e0e0",success:"#28a745",progressBg:"#e9ecef"}},TIERS:[{max:25,label:"Getting Started",color:"#f4c089"},{max:50,label:"Building Foundations",color:"#f0a050"},{max:75,label:"Accelerating",color:"#e27308"},{max:101,label:"Leading",color:"#a85206"}],WEIGHTS:{operational:.35,acquisition:.25,digital:.2,practice_readiness:.2}};var H=[{id:"inst_name",label:"Q1",question:"What is the name of your institution?",type:"text",required:!0,placeholder:"e.g. Lakewood State University"},{id:"contact_name",label:"Q2",question:"Your name and title",type:"text",required:!0,placeholder:"e.g. Dr. Maria Lopez, Provost / e.g. James Park, CIO"},{id:"contact_email",label:"Q3",question:"Your email address",subtitle:"We'll send your AI Readiness Report here.",type:"email",required:!0,placeholder:"you@institution.edu"},{id:"inst_size",label:"Q4",question:"How many students does your institution serve (total headcount, including part-time)?",type:"single-select",required:!0,options:["Fewer than 1,000 students","1,000 to 5,000 students","5,000 to 15,000 students","15,000 to 30,000 students","More than 30,000 students"]},{id:"inst_type",label:"Q5",question:"Which best describes your institution?",subtitle:"Pick the closest match. This determines which questions come next.",type:"single-select",required:!0,autoAdvance:!0,options:[{label:"Research university (R1 or R2, public or private, doctoral-granting)",route:"A"},{label:"Regional public university (state system, primarily master's-granting)",route:"B"},{label:"Private comprehensive university (nonprofit, multiple programs, undergraduate through graduate)",route:"C"},{label:"Liberal arts college (small, primarily undergraduate, residential)",route:"D"},{label:"Community or technical college (2-year, open admission)",route:"E"},{label:"For-profit or career-focused institution",route:"F"},{label:"Online or distance-first institution (primarily serves non-traditional students)",route:"G"},{label:"Specialized professional school (medical, law, art/design, engineering, theology)",route:"H"}]}];var z=[{id:"after_hours",label:"CL1",category:"STUDENT RESPONSIVENESS",question:"When a prospective student or applicant contacts your institution outside of business hours, what happens?",type:"single-select",required:!0,options:["The inquiry waits until the next business day","An auto-reply confirms receipt, and someone follows up during business hours","Basic information is provided through a website FAQ or chatbot, with complex questions queued for staff","Intelligent response system handles common inquiries (program info, deadlines, next steps) with seamless handoff to staff for complex questions"]},{id:"intake_speed",label:"CL2",category:"STUDENT RESPONSIVENESS",question:"From a prospective student's first inquiry to their enrollment, how long does the typical process take?",type:"single-select",required:!0,options:["Several months or longer","4 to 8 weeks","2 to 4 weeks","1 to 2 weeks","A few days or less (for open-admission or rolling enrollment)"]},{id:"urgency",label:"CL3",category:"INVESTMENT APPETITE",question:"How urgently does your institution need to address operational gaps and adopt new tools?",type:"scale",required:!0,min:1,max:5,minLabel:"No urgency",maxLabel:"Critical priority"},{id:"investment",label:"CL4",category:"INVESTMENT APPETITE",question:"If an outside partner could measurably improve your institution's operational efficiency and enrollment outcomes, what level of annual investment would feel proportionate?",type:"single-select",required:!0,options:["Under $10,000","$10,000 to $25,000","$25,000 to $75,000","$75,000 to $150,000","Over $150,000"]},{id:"success_vision",label:"OPT1",category:"OPEN RESPONSE",question:"If you could wave a wand and fix one operational challenge at your institution in the next 12 months, what would it be?",type:"textarea",required:!1},{id:"anything_else",label:"OPT2",category:"OPEN RESPONSE",question:"Is there anything else about your institution's situation that would help us provide a more useful assessment?",subtitle:"A specific challenge, enrollment concern, or context that would be useful to know.",type:"textarea",required:!1}];var B="A",G="Research University (R1/R2)",F=[{id:"research_data_integration_r1",label:"QA1",category:"OPERATIONS",question:"How does your institution connect data across admissions, student records, financial aid, and advancement?",type:"single-select",required:!0,options:["Each office maintains its own records with no shared system","Some systems share data through manual exports or batch uploads","We have a data warehouse that pulls from most major systems, but real-time access is limited","Enterprise data platform with dashboards accessible to leadership across divisions","Integrated data ecosystem with predictive models informing decisions across the student lifecycle"]},{id:"research_grant_admin_r1",label:"QA2",category:"OPERATIONS",question:"How does your institution manage the pre-award and post-award research administration process?",type:"single-select",required:!0,options:["Faculty handle most grant preparation and compliance tracking themselves","Central office manages submissions but post-award monitoring is largely manual","Grant management system (Cayuse, Kuali) handles submissions and basic compliance tracking","Integrated research administration with automated compliance checks and reporting","End-to-end research management with automated effort reporting, cost allocation, and sponsor compliance"]},{id:"research_advising_load_r1",label:"QA3",category:"OPERATIONS",question:"How are academic advising assignments managed for your undergraduate population?",type:"single-select",required:!0,options:["Advisors are assigned by alphabet or department with no workload balancing","Assignments are reviewed periodically, but caseloads vary significantly","Advising platform (EAB Navigate, Starfish) tracks assignments and basic student interactions","Caseload balancing with early alert flags and advisor dashboards","Predictive advising model that routes students to specialized support based on risk factors and academic trajectory"]},{id:"research_enrollment_forecast_r1",label:"QA4",category:"OPERATIONS",question:"How does your enrollment management team forecast enrollment and tuition revenue?",type:"single-select",required:!0,options:["Projections are based on prior year trends and leadership judgment","Spreadsheet models with historical data and basic demographic inputs","Statistical models incorporating admit rate, yield rate, and retention data","Multi-variable forecasting with scenario modeling for financial aid strategies","Real-time enrollment dashboards with predictive models that adjust weekly based on application and deposit behavior"]},{id:"research_compliance_r1",label:"QA5",category:"OPERATIONS",question:"How does your institution track and prepare for compliance requirements (FERPA, Title IV, accreditation, research protocols)?",type:"single-select",required:!0,options:["Compliance is tracked by individual offices with no centralized view","Shared calendar of deadlines with manual tracking of deliverables","Compliance management system with assigned owners and status tracking","Integrated compliance platform with automated reminders, document collection, and audit trails","Proactive compliance monitoring with automated policy checks and continuous readiness assessment"]},{id:"research_prospect_engagement_r1",label:"QA6",category:"STUDENT ACQUISITION",question:"How does your admissions office engage prospective students from first inquiry through enrollment?",type:"single-select",required:!0,options:["Counselors manage communication individually using email and phone","CRM (Slate) tracks inquiries but outreach sequences are largely manual","Automated communication flows in Slate with basic segmentation by program interest","Personalized multi-channel campaigns with behavior-triggered messaging and yield prediction","Dynamic engagement engine that adapts messaging based on student interaction patterns, competitive set, and financial aid modeling"]},{id:"research_digital_presence_r1",label:"QA7",category:"DIGITAL VISIBILITY",question:"How does your institution present its academic programs, research impact, and campus life online?",type:"single-select",required:!0,options:["Department websites are maintained independently with inconsistent quality and outdated content","Central marketing team manages the main website, but program pages are maintained by departments","Unified web platform with content management system, regular updates, and basic analytics","Data-driven web presence with program-specific landing pages, SEO strategy, and conversion tracking","Integrated digital ecosystem with personalized content, virtual campus experiences, and real-time program outcome data"]},{id:"research_change_readiness_r1",label:"QA8",category:"INSTITUTIONAL READINESS",question:"When your institution last rolled out a major enterprise system (SIS migration, new LMS, ERP upgrade), how did the process go?",type:"single-select",required:!0,options:["We have not undertaken a major system change in recent memory","It was significantly over timeline and budget, with ongoing adoption challenges","Completed on a reasonable timeline but required extensive workarounds and manual processes","Generally successful with strong project management, though some departments lagged in adoption","Smooth rollout with clear governance, faculty/staff training, and measurable adoption targets met on schedule"]}];var j="B",Y="Regional Public University",W=[{id:"regional_advising_capacity_reg",label:"QB1",category:"OPERATIONS",question:"How does your institution handle academic advising given current staffing levels?",type:"single-select",required:!0,options:["Advisors carry caseloads of 500+ students and primarily handle registration holds","Caseloads are high but advisors try to do proactive outreach for at-risk students","Advising platform helps prioritize outreach, but capacity still limits depth of engagement","Tiered advising model with technology-assisted triage for routine questions and human advisors for complex needs","Integrated student success platform where advisors focus on high-impact conversations while routine guidance is handled by self-service tools"]},{id:"regional_transfer_eval_reg",label:"QB2",category:"OPERATIONS",question:"How does your institution evaluate transfer credits from community colleges and other institutions?",type:"single-select",required:!0,options:["Each transcript is reviewed manually by the registrar or department chair","We have articulation agreements on file but still review most transcripts case-by-case","Transfer equivalency database covers common courses; unusual transfers are reviewed manually","Automated credit evaluation for courses covered by articulation agreements, with exceptions flagged for review","Comprehensive transfer portal where students can see credit equivalencies before applying, with automated evaluation upon enrollment"]},{id:"regional_state_reporting_reg",label:"QB3",category:"OPERATIONS",question:"How does your institution prepare required reports for your state system or governing board?",type:"single-select",required:!0,options:["Reports are assembled manually from multiple sources before each deadline","Institutional research office pulls data from the SIS and formats reports, but it takes significant time","Reporting templates are pre-built but data validation and reconciliation are still manual","Automated data pulls with standardized report generation, requiring only review and sign-off","Continuous reporting dashboard that state system can access directly, with automated data quality checks"]},{id:"regional_course_scheduling_reg",label:"QB4",category:"OPERATIONS",question:"How does your institution build the course schedule each term?",type:"single-select",required:!0,options:["Department chairs propose sections based on historical patterns and faculty preferences","Centralized scheduling office coordinates, but the process is negotiation-heavy and time-consuming","Scheduling software (Ad Astra, CollegeNET) optimizes room assignments, but section offerings are still manually determined","Data-informed scheduling that analyzes enrollment patterns, waitlist data, and student demand to recommend section counts","Dynamic scheduling model that adjusts section offerings based on real-time registration data and student degree pathway analysis"]},{id:"regional_retention_tracking_reg",label:"QB5",category:"OPERATIONS",question:"How does your institution identify students who are at risk of dropping out or stopping out?",type:"single-select",required:!0,options:["We learn about struggling students when they miss registration or fail courses","Faculty can submit early alerts, but the process is inconsistent and follow-up varies","Early alert system with defined triggers (missed classes, low midterm grades) and assigned follow-up","Predictive model using multiple data points (grades, engagement, financial aid status) to identify risk before performance declines","Integrated student success ecosystem where risk indicators trigger coordinated outreach from advising, financial aid, and student life"]},{id:"regional_recruitment_reach_reg",label:"QB6",category:"STUDENT ACQUISITION",question:"How does your institution attract students beyond your traditional geographic service area?",type:"single-select",required:!0,options:["We primarily serve students from our immediate region through local reputation","Some targeted recruitment in neighboring states or for specific programs","Digital marketing campaigns for high-demand programs with geographic targeting","Multi-channel recruitment with program-specific landing pages, virtual events, and yield optimization by market","Strategic enrollment management with market analysis, program-market fit assessment, and personalized digital engagement by prospect segment"]},{id:"regional_program_visibility_reg",label:"QB7",category:"DIGITAL VISIBILITY",question:"How easy is it for a prospective student to find your institution's programs, costs, and outcomes online?",type:"single-select",required:!0,options:["Basic website with program listings, but detailed information requires contacting the admissions office","Program pages exist with descriptions, but cost calculators and outcome data are not prominently featured","Net price calculator, program pages with career outcomes, and clear application pathways","SEO-optimized program pages with cost transparency, graduate outcomes, student testimonials, and comparison tools","Personalized digital experience where prospective students see relevant programs, financial scenarios, and career pathways based on their profile"]},{id:"regional_change_capacity_reg",label:"QB8",category:"INSTITUTIONAL READINESS",question:"How does your institution typically handle the introduction of new technology or operational processes?",type:"single-select",required:!0,options:["Changes happen when forced (vendor sunsets a product, state mandates a system)","We adopt new tools when budget allows, but training is limited and adoption is uneven","IT leads implementation with a project plan, but competing priorities slow rollout","Cross-functional implementation teams with defined timelines, training, and success metrics","Established change management framework with pilot programs, faculty/staff input, and post-implementation review"]}];var K="C",V="Private Comprehensive University",J=[{id:"private_net_revenue_comp",label:"QC1",category:"OPERATIONS",question:"How does your institution model the relationship between tuition discounting, enrollment, and net revenue?",type:"single-select",required:!0,options:["Financial aid decisions are made by the aid office; enrollment and finance teams see results after the fact","We track discount rate and net revenue, but financial aid strategy is not tightly integrated with enrollment goals","Enrollment and financial aid collaborate on merit aid strategy using historical yield and discount data","Predictive financial aid modeling that optimizes net revenue by simulating discount scenarios against enrollment targets","Real-time enrollment and revenue dashboard where financial aid, admissions, and finance jointly manage toward net revenue goals with weekly adjustments"]},{id:"private_grad_enrollment_comp",label:"QC2",category:"OPERATIONS",question:"How does your institution manage enrollment for graduate and professional programs (MBA, nursing, education, etc.)?",type:"single-select",required:!0,options:["Each program handles its own recruitment with minimal central coordination","Central marketing supports programs, but recruitment strategy and pipeline management vary by program","Unified CRM for graduate programs with shared inquiry management and communication workflows","Centralized graduate enrollment team with program-specific strategies, yield tracking, and ROI analysis by program","Integrated graduate enrollment operation with market demand analysis, program pricing optimization, and lifetime value modeling"]},{id:"private_accreditation_prep_comp",label:"QC3",category:"OPERATIONS",question:"How does your institution prepare for accreditation reviews (regional and programmatic)?",type:"single-select",required:!0,options:["Preparation begins 6-12 months before the visit with manual data collection across departments","Self-study committee assembles evidence from various offices, but it is a time-intensive manual process","Institutional effectiveness office maintains an evidence repository, but updates are periodic","Continuous improvement framework with ongoing evidence collection, assessment tracking, and dashboard visibility","Integrated institutional effectiveness platform with automated data feeds, ongoing assessment cycles, and accreditation-ready reporting at any time"]},{id:"private_alumni_engagement_comp",label:"QC4",category:"OPERATIONS",question:"How does your institution track and engage alumni for fundraising, mentoring, and career networking?",type:"single-select",required:!0,options:["Alumni records exist but engagement is limited to annual fund mailings and homecoming","Advancement office uses a CRM (Raiser's Edge, Salesforce) for donor tracking, but alumni engagement beyond giving is minimal","Segmented alumni communications with event-based engagement and giving history analytics","Multi-channel alumni engagement with career networking, mentoring programs, and donor pipeline management","Data-driven alumni lifecycle strategy with predictive giving models, engagement scoring, and personalized outreach based on affinity and capacity"]},{id:"private_faculty_workload_comp",label:"QC5",category:"OPERATIONS",question:"How does your institution manage faculty workload across teaching, scholarship, and service obligations?",type:"single-select",required:!0,options:["Workload is determined by department norms with no centralized tracking","Course assignments are tracked centrally, but advising, committee work, and scholarship expectations are informal","Workload policy defines expectations, and dean's offices monitor compliance at the department level","Workload management system that tracks all components and flags imbalances","Dynamic workload modeling that factors in class size, modality, student support needs, and scholarly output to optimize faculty allocation"]},{id:"private_prospect_conversion_comp",label:"QC6",category:"STUDENT ACQUISITION",question:"How effectively does your institution convert admitted students into enrolled students?",type:"single-select",required:!0,options:["Yield management relies on admitted student events and counselor follow-up calls","Admitted student communication plan with timed emails and campus visit invitations","Yield campaigns segmented by program, geography, and financial need with A/B tested messaging","Predictive yield modeling that identifies high-risk admits and triggers personalized interventions","Dynamic yield management with real-time deposit tracking, competitive intelligence, and personalized content delivery based on student engagement signals"]},{id:"private_online_reputation_comp",label:"QC7",category:"DIGITAL VISIBILITY",question:"How does your institution manage its online reputation and digital presence for prospective students and families?",type:"single-select",required:!0,options:["Website is maintained by marketing, but social media and review sites are not actively managed","Social media presence with regular posting, but review sites (Niche, Google) are monitored reactively","Proactive reputation management with monitoring tools, response protocols, and student testimonial strategy","Integrated digital marketing with SEO, paid search, social media, and content marketing aligned to enrollment goals","Comprehensive digital ecosystem with personalized web experiences, attribution tracking, and real-time content optimization based on conversion data"]},{id:"private_tech_governance_comp",label:"QC8",category:"INSTITUTIONAL READINESS",question:"How does your institution make decisions about adopting new technology?",type:"single-select",required:!0,options:["Department heads or individual offices acquire tools independently based on immediate needs","IT reviews requests but approval is largely budget-driven with limited strategic evaluation","Technology committee evaluates proposals against institutional priorities, but timelines are long","Governance framework with intake process, pilot protocols, integration requirements, and cost-benefit analysis","Strategic technology roadmap aligned to institutional plan with annual review, vendor assessment, and measurable adoption goals"]}];var X="D",Z="Liberal Arts College",ee=[{id:"lac_small_team_ops_lib",label:"QD1",category:"OPERATIONS",question:"With a small administrative team, how does your college handle routine operational tasks (transcript requests, enrollment verifications, form processing)?",type:"single-select",required:!0,options:["Staff handle each request manually; during peak periods, backlogs are common","Some forms are digitized, but most processing still requires staff intervention","Student-facing portal handles common requests, with staff reviewing exceptions","Automated workflows for routine requests, freeing staff for complex cases and student interaction","Self-service systems handle the majority of routine operations, with staff focused entirely on high-value work and student support"]},{id:"lac_financial_aid_modeling_lib",label:"QD2",category:"OPERATIONS",question:"How does your financial aid office balance institutional aid (merit and need-based) against net revenue targets?",type:"single-select",required:!0,options:["Aid decisions follow standard formulas with limited consideration of institutional revenue impact","The CFO and aid director discuss targets annually, but in-cycle adjustments are rare","Aid leveraging model estimates yield and net revenue impact of different packaging strategies","Scenario modeling with multiple financial aid strategies tested against enrollment and revenue goals before awards go out","Continuous optimization where deposit behavior and competitive offers inform real-time aid adjustments within the cycle"]},{id:"lac_faculty_support_lib",label:"QD3",category:"OPERATIONS",question:"How does your college support faculty in incorporating new teaching tools and approaches?",type:"single-select",required:!0,options:["Faculty are largely self-directed; support is available on request from IT","Center for teaching and learning offers occasional workshops, but attendance varies","Regular professional development programming with peer mentoring and course design support","Structured onboarding for new tools with faculty champions, release time for innovation, and assessment of impact","Embedded instructional design support with ongoing faculty collaboration, learning analytics, and evidence-based iteration on teaching practices"]},{id:"lac_student_engagement_lib",label:"QD4",category:"OPERATIONS",question:"How does your college track student engagement beyond the classroom (advising, co-curricular, wellness)?",type:"single-select",required:!0,options:["Faculty and staff notice disengaged students through personal observation","Advisors track meeting attendance; student life tracks event participation, but systems are not connected","Early alert system allows faculty and staff to flag concerns, with coordinated follow-up","Integrated student engagement platform that connects academic, social, and wellness indicators","Holistic student success model where academic advisors, student life, and counseling share a unified view and collaborate on interventions"]},{id:"lac_donor_pipeline_lib",label:"QD5",category:"OPERATIONS",question:"How does your advancement office identify and cultivate potential major gift donors from your alumni base?",type:"single-select",required:!0,options:["Advancement officers rely on personal relationships and reunion attendance to identify prospects","Donor database tracks giving history, but prospect research is largely manual","Wealth screening tools identify capacity, and giving patterns inform outreach timing","Prospect scoring model that combines capacity, affinity, and engagement data to prioritize cultivation","Predictive giving model integrated with engagement data that identifies emerging prospects and recommends cultivation strategies"]},{id:"lac_applicant_reach_lib",label:"QD6",category:"STUDENT ACQUISITION",question:"How does your college reach prospective students who may not already know your institution?",type:"single-select",required:!0,options:["Recruitment relies on college fairs, high school visits, and word-of-mouth from current families","Digital advertising supplements traditional outreach, primarily through search ads and social media","Targeted digital campaigns using purchased prospect lists with segmentation by academic interest and geography","Multi-channel prospect engagement with content marketing, virtual events, and data-driven targeting","Strategic market expansion with new geographic and demographic markets identified through data analysis, with personalized digital pathways for each segment"]},{id:"lac_web_storytelling_lib",label:"QD7",category:"DIGITAL VISIBILITY",question:"How effectively does your college's website tell the story of its academic programs and student outcomes?",type:"single-select",required:!0,options:["Website has basic program descriptions with limited outcome data or student perspectives","Program pages include some testimonials and career pathway information","Rich content with student stories, outcome statistics, and faculty profiles organized by program","Dynamic content with video, interactive features, and clear pathways from exploration to application","Personalized web experience where prospective students see relevant content based on their interests, with transparent outcome data and financial planning tools"]},{id:"lac_pilot_willingness_lib",label:"QD8",category:"INSTITUTIONAL READINESS",question:"How open is your campus community (faculty, staff, students) to trying new approaches to how the college operates?",type:"single-select",required:!0,options:["Community is skeptical of change and prefers established processes","Openness varies; some faculty and staff are enthusiastic, but institutional inertia is strong","Leadership supports innovation, and pilot projects are welcomed as long as they are faculty-involved","Culture of experimentation with defined pilot frameworks, low-risk testing environments, and regular review","Innovation is embedded in institutional culture with designated time, funding, and recognition for trying new approaches"]}];var te="E",ie="Community or Technical College",ae=[{id:"cc_student_services_access_cc",label:"QE1",category:"OPERATIONS",question:"How do students at your college access advising, financial aid, and registration services?",type:"single-select",required:!0,options:["Students must visit campus during business hours for most services","Some services are available online (registration), but advising and financial aid require in-person or phone contact","Student portal handles routine transactions, with online scheduling for advising appointments","Comprehensive online services with virtual advising, chatbot for common questions, and mobile-friendly access","24/7 digital student services with proactive outreach (registration reminders, financial aid deadlines, course recommendations) complementing in-person support"]},{id:"cc_workforce_alignment_cc",label:"QE2",category:"OPERATIONS",question:"How does your college align its program offerings with local employer needs?",type:"single-select",required:!0,options:["Program development is faculty-driven based on disciplinary expertise","Advisory boards meet periodically, but translating employer input into curriculum changes is slow","Regular labor market analysis informs new program proposals, with employer advisory input","Active employer partnerships with co-developed curricula, work-based learning placements, and shared outcome data","Real-time labor market intelligence platform that informs program development, credential stacking, and student career advising"]},{id:"cc_enrollment_tracking_cc",label:"QE3",category:"OPERATIONS",question:"How does your college track students who stop attending before completing a credential?",type:"single-select",required:!0,options:["We know students have left when they do not register for the next term","Attendance and grade data flag non-returning students, but outreach is inconsistent","Re-enrollment campaigns target recent stop-outs with financial aid and program information","Predictive model identifies students at risk of stopping out before they leave, triggering proactive intervention","Comprehensive student persistence system that monitors engagement indicators, coordinates outreach across departments, and tracks re-enrollment outcomes"]},{id:"cc_dual_enrollment_cc",label:"QE4",category:"OPERATIONS",question:"How does your college manage dual enrollment partnerships with local high schools?",type:"single-select",required:!0,options:["Dual enrollment is managed on a case-by-case basis with individual high schools","Standard agreements exist, but registration, advising, and transcript sharing are largely manual","Centralized dual enrollment office with streamlined registration and academic support for high school students","Integrated dual enrollment platform with automated registration, academic progress monitoring, and pathway advising","Strategic dual enrollment program with data-driven high school partnerships, embedded advising, and seamless transition to full enrollment"]},{id:"cc_adjunct_coordination_cc",label:"QE5",category:"OPERATIONS",question:"How does your college coordinate with adjunct faculty, who may teach at multiple institutions?",type:"single-select",required:!0,options:["Adjuncts receive a syllabus and access to the LMS; ongoing support is minimal","Department chairs check in periodically, but adjuncts are largely self-directed","Structured onboarding for new adjuncts with teaching resources and a faculty mentor","Regular professional development, shared teaching materials, and inclusion in department planning","Adjunct engagement program with ongoing training, curriculum input opportunities, and recognition that builds connection to the institution"]},{id:"cc_community_awareness_cc",label:"QE6",category:"STUDENT ACQUISITION",question:"How does your community know about the programs and services your college offers?",type:"single-select",required:!0,options:["Community awareness comes primarily from being the local college; active marketing is limited","Basic website, social media, and seasonal advertising for registration periods","Targeted outreach for specific programs (nursing, trades, IT) with employer and community partnerships","Multi-channel marketing with program-specific campaigns, community events, and clear career pathway messaging","Data-driven community engagement with neighborhood-level targeting, multilingual outreach, and personalized program recommendations based on career interest assessments"]},{id:"cc_program_findability_cc",label:"QE7",category:"DIGITAL VISIBILITY",question:"How easy is it for someone in your community to find information about your programs, costs, and how to enroll?",type:"single-select",required:!0,options:["Website exists but navigation is confusing and information is buried in multiple clicks","Program pages are available with basic information, but the enrollment process is not clearly explained","Clear program pages with costs, schedules, career outcomes, and a straightforward application link","Streamlined digital enrollment pathway from program discovery to class registration with progress tracking","Fully guided digital experience with program finder tools, cost estimators, enrollment checklists, and support chat at every step"]},{id:"cc_resource_readiness_cc",label:"QE8",category:"INSTITUTIONAL READINESS",question:"Given your college's current budget and staffing, how realistic is it to take on new operational tools or processes in the next 12 months?",type:"single-select",required:!0,options:["Budget is fully committed; any new initiative would require cutting something else","Small discretionary budget exists, but staffing capacity to implement changes is the real constraint","Leadership has identified operational improvement as a priority and allocated some resources","Dedicated budget and a point person for operational technology projects, with pilot-before-commit approach","Innovation fund with cross-functional team empowered to evaluate, pilot, and scale new approaches"]}];var ne="F",oe="For-Profit or Career-Focused Institution",se=[{id:"fp_enrollment_funnel_fp",label:"QF1",category:"OPERATIONS",question:"How does your institution manage the enrollment funnel from lead to enrolled student?",type:"single-select",required:!0,options:["Enrollment counselors manage inquiries individually with basic CRM tracking","CRM automates initial follow-up, but conversion management is largely manual","Structured enrollment funnel with defined stages, conversion metrics, and counselor performance tracking","Data-driven enrollment operation with lead scoring, automated nurture sequences, and conversion optimization","Predictive enrollment engine that scores leads, optimizes counselor assignment, and dynamically adjusts outreach cadence based on prospect behavior"]},{id:"fp_student_completion_fp",label:"QF2",category:"OPERATIONS",question:"How does your institution track and support students toward program completion?",type:"single-select",required:!0,options:["Completion is tracked at term end; students who fall behind are counseled reactively","Academic advisors monitor grades and attendance, reaching out when problems appear","Early alert system flags at-risk students based on attendance, grades, and engagement","Proactive student success model with dedicated support staff, milestone tracking, and intervention protocols","Predictive completion model that identifies risk factors at enrollment and provides personalized support plans throughout the student journey"]},{id:"fp_career_placement_fp",label:"QF3",category:"OPERATIONS",question:"How does your institution connect graduates with employment opportunities?",type:"single-select",required:!0,options:["Career services maintains a job board and offers resume help upon request","Program-specific employer relationships provide some placement pathways","Structured career services with employer partnerships, interview preparation, and placement tracking","Integrated career outcomes operation with employer advisory input, job matching, and tracked placement rates by program","Career success platform with labor market intelligence, employer matching algorithms, and longitudinal outcome tracking that feeds back into program design"]},{id:"fp_compliance_audit_fp",label:"QF4",category:"OPERATIONS",question:"How does your institution prepare for Title IV audits and gainful employment reporting?",type:"single-select",required:!0,options:["Compliance documentation is assembled when audits are announced","Compliance officer maintains records, but pulling together audit packages is time-intensive","Compliance management system tracks requirements with assigned owners and deadline monitoring","Automated compliance reporting with data feeds from SIS, financial aid, and career services","Continuous compliance monitoring with real-time dashboards, automated document assembly, and proactive issue identification"]},{id:"fp_program_roi_fp",label:"QF5",category:"OPERATIONS",question:"How does your institution evaluate the return on investment of its academic programs?",type:"single-select",required:!0,options:["Program viability is assessed based on enrollment numbers and tuition revenue","Basic cost-per-student and revenue analysis by program","Program review includes enrollment trends, completion rates, placement rates, and student satisfaction","Comprehensive program ROI model incorporating marketing cost, student lifetime value, placement outcomes, and alumni earning data","Dynamic program portfolio management with real-time ROI dashboards, labor market alignment scoring, and automated recommendations for program investment or sunset"]},{id:"fp_lead_generation_fp",label:"QF6",category:"STUDENT ACQUISITION",question:"How does your institution generate and qualify prospective student inquiries?",type:"single-select",required:!0,options:["Leads come primarily from paid digital advertising with basic demographic targeting","Multi-channel lead generation with landing pages, social media, and search, tracked by source","Lead scoring model prioritizes inquiries based on program fit, engagement signals, and likelihood to enroll","Integrated demand generation with content marketing, programmatic advertising, and attribution modeling","Predictive lead generation with lookalike modeling, dynamic budget allocation by channel ROI, and automated qualification based on behavioral scoring"]},{id:"fp_outcomes_transparency_fp",label:"QF7",category:"DIGITAL VISIBILITY",question:"How does your institution present program outcomes (completion rates, job placement, earnings) to prospective students?",type:"single-select",required:!0,options:["Outcomes data is available in disclosures but not prominently featured in marketing","Program pages include basic outcome statistics (completion rate, placement rate)","Detailed outcome dashboards by program with comparison to industry benchmarks","Transparent outcomes with graduate testimonials, employer endorsements, and third-party validated data","Interactive outcomes explorer where prospective students can see results by program, cohort, and career pathway, with salary projections based on labor market data"]},{id:"fp_speed_to_change_fp",label:"QF8",category:"INSTITUTIONAL READINESS",question:"How quickly can your institution implement operational changes when a business need is identified?",type:"single-select",required:!0,options:["Changes require multi-level approval and typically take 6+ months to implement","Urgent changes can be fast-tracked, but routine improvements move slowly","Standard implementation timeline of 2-3 months for most operational changes","Agile operational model with rapid prototyping, pilot testing, and iterative improvement","Continuous improvement culture with empowered teams, rapid deployment capability, and data-driven decision-making at every level"]}];var re="G",le="Online or Distance-First Institution",de=[{id:"online_student_support_online",label:"QG1",category:"OPERATIONS",question:"How does your institution provide student support (advising, tutoring, counseling) to a distributed student body?",type:"single-select",required:!0,options:["Support services are available during business hours via phone and email","Online scheduling for virtual advising with some self-service resources","Multi-channel support with chat, video, phone, and a knowledge base for common questions","Tiered support model with self-service for routine needs, live agents for complex issues, and proactive outreach for at-risk students","24/7 intelligent support ecosystem with instant responses for common questions, seamless escalation to human advisors, and proactive interventions based on student engagement data"]},{id:"online_course_quality_online",label:"QG2",category:"OPERATIONS",question:"How does your institution ensure consistent course quality across sections and instructors?",type:"single-select",required:!0,options:["Course design is left to individual instructors with general guidelines","Master course templates exist, but instructors have significant latitude to modify","Standardized course shells with quality rubric review, but updates happen on a fixed schedule","Continuous course improvement with student feedback, learning analytics, and regular design reviews","Data-driven quality assurance with automated analysis of student outcomes by section, engagement metrics, and peer review integrated into course iteration cycles"]},{id:"online_engagement_monitoring_online",label:"QG3",category:"OPERATIONS",question:"How does your institution monitor whether online students are actively engaged in their coursework?",type:"single-select",required:!0,options:["Engagement is measured by assignment submission; students who stop submitting are contacted","LMS login frequency and assignment completion are tracked, with manual follow-up for disengaged students","Learning analytics dashboard tracks multiple engagement indicators (login patterns, discussion participation, time-on-task)","Automated alerts when engagement drops below thresholds, triggering coordinated outreach","Predictive engagement model that identifies disengagement patterns early and initiates personalized re-engagement before students fall behind"]},{id:"online_assessment_integrity_online",label:"QG4",category:"OPERATIONS",question:"How does your institution approach assessment integrity in a fully online environment?",type:"single-select",required:!0,options:["Standard academic integrity policy with honor code; detection relies on instructor judgment","Proctoring for high-stakes exams (ProctorU, Examity) with Turnitin for written assignments","Varied assessment design (authentic assessments, portfolios, oral exams) to reduce reliance on proctoring","Multi-modal assessment strategy with design-level integrity (unique prompts, application-based questions) and targeted proctoring","Comprehensive integrity framework combining assessment design, learning analytics, and process-based evaluation that minimizes opportunities for dishonesty without over-surveilling students"]},{id:"online_content_accessibility_online",label:"QG5",category:"OPERATIONS",question:"How does your institution ensure course content meets accessibility standards (ADA, Section 508)?",type:"single-select",required:!0,options:["Accessibility is addressed when students request accommodations","Guidelines exist for accessible content creation, but compliance varies by instructor","Centralized accessibility review for new courses with remediation support","Automated accessibility checking integrated into course development with training for all content creators","Universal design for learning (UDL) embedded in course development process, with automated compliance monitoring and continuous improvement"]},{id:"online_student_acquisition_online",label:"QG6",category:"STUDENT ACQUISITION",question:"How does your institution attract and enroll new students in a competitive online education market?",type:"single-select",required:!0,options:["Paid search and display advertising drive most inquiries","Multi-channel digital marketing with organic content, social media, and employer partnerships","Targeted campaigns with persona-based messaging, landing page optimization, and conversion tracking","Data-driven enrollment marketing with attribution modeling, lifetime value analysis, and channel ROI optimization","Integrated demand engine with personalized prospect journeys, predictive enrollment modeling, and continuous creative optimization based on enrollment outcomes"]},{id:"online_findability_online",label:"QG7",category:"DIGITAL VISIBILITY",question:"How do prospective students find and evaluate your institution's programs compared to competitors?",type:"single-select",required:!0,options:["Website ranks for branded search terms, but organic visibility for program-specific searches is limited","SEO strategy exists with program pages optimized for key terms","Strong organic search presence with comparison tools, outcome data, and student reviews prominently featured","Multi-platform visibility with organic search, review sites, employer directories, and content marketing","Dominant digital presence in target program categories with personalized content, social proof, and seamless application pathways from every touchpoint"]},{id:"online_scalability_online",label:"QG8",category:"INSTITUTIONAL READINESS",question:"How well does your institution's current technology infrastructure support growth?",type:"single-select",required:!0,options:["Current systems are near capacity; significant growth would require major investment","Systems can handle moderate growth, but manual processes would become bottlenecks","Cloud-based infrastructure scales well, though some support processes are still manual","Scalable platform with automated processes for most student-facing and administrative functions","Fully elastic infrastructure with automated scaling, real-time monitoring, and continuous capacity planning integrated into growth strategy"]}];var ce="H",ue="Specialized Professional School",pe=[{id:"spec_clinical_placement_spec",label:"QH1",category:"OPERATIONS",question:"How does your school coordinate clinical rotations, practicum placements, or studio/field assignments?",type:"single-select",required:!0,options:["Placements are arranged individually by faculty or a coordinator using spreadsheets and phone calls","Central office manages site relationships, but scheduling and matching are manual","Placement management system tracks sites, preceptors, and student assignments with conflict checking","Automated matching that considers student preferences, site capacity, geographic constraints, and learning objectives","Intelligent placement platform with real-time site availability, competency-based matching, and automated compliance documentation"]},{id:"spec_accreditation_compliance_spec",label:"QH2",category:"OPERATIONS",question:"How does your school maintain compliance with your discipline-specific accreditor (LCME, ABA, ABET, NASAD, etc.)?",type:"single-select",required:!0,options:["Compliance is addressed during self-study years with intensive data collection efforts","Accreditation liaison maintains documentation, but evidence gathering is still a major effort each cycle","Ongoing assessment tracking with data collection calendar and assigned responsibilities","Continuous accreditation readiness with automated data feeds, outcome tracking, and real-time compliance dashboards","Embedded quality assurance where accreditation standards are integrated into daily operations, with automated reporting and continuous improvement cycles"]},{id:"spec_outcomes_tracking_spec",label:"QH3",category:"OPERATIONS",question:"How does your school track graduate outcomes (licensure pass rates, board scores, employment, career progression)?",type:"single-select",required:!0,options:["We track what accreditors require (pass rates, placement) but do not analyze patterns","Outcome data is collected and reported; some analysis of trends over time","Outcome analytics with cohort comparison, program-level analysis, and identification of at-risk students","Predictive outcome modeling that identifies students unlikely to pass licensure or secure placement, triggering targeted support","Comprehensive outcome intelligence platform with longitudinal tracking, employer feedback integration, and program improvement recommendations based on outcome data"]},{id:"spec_simulation_lab_spec",label:"QH4",category:"OPERATIONS",question:"How does your school use simulation, case-based learning, or studio critique in its curriculum?",type:"single-select",required:!0,options:["Experiential learning is instructor-designed and delivered without centralized support","Simulation/studio resources exist, but scheduling and assessment are managed informally","Centralized experiential learning center with dedicated staff, equipment, and scheduling system","Integrated experiential curriculum with standardized assessment rubrics, debrief protocols, and outcome tracking","Advanced experiential learning program with scenario libraries, competency mapping, and data-driven iteration on simulation/studio experiences"]},{id:"spec_faculty_practice_spec",label:"QH5",category:"OPERATIONS",question:"How does your school balance faculty members' teaching responsibilities with their professional practice obligations?",type:"single-select",required:!0,options:["Balance is managed individually; some faculty prioritize practice, others teaching","Department policies define expectations, but actual balance varies","Workload framework accounts for clinical/practice time with adjusted teaching loads","Integrated faculty activity system that tracks teaching, practice, scholarship, and service with transparent reporting","Dynamic workload model that optimizes faculty allocation based on student needs, practice commitments, and institutional priorities"]},{id:"spec_applicant_selection_spec",label:"QH6",category:"STUDENT ACQUISITION",question:"How does your school identify and select the most promising applicants from your candidate pool?",type:"single-select",required:!0,options:["Committee review of applications using standardized scores and subjective assessment","Structured rubric with defined criteria, but holistic review is still highly manual","Multi-stage selection process with scored criteria, interview protocols, and inter-rater reliability checks","Data-informed selection with historical performance analysis by applicant profile, predicting student success","Comprehensive admissions intelligence that combines academic indicators, non-cognitive assessment, and predictive models validated against graduate outcomes"]},{id:"spec_reputation_visibility_spec",label:"QH7",category:"DIGITAL VISIBILITY",question:"How visible is your school's reputation, program quality, and graduate outcomes to prospective students and employers?",type:"single-select",required:!0,options:["Reputation is primarily word-of-mouth within the profession","Website and professional association presence with basic program information","Active digital presence with outcome data, faculty profiles, and alumni success stories","Multi-platform visibility with rankings engagement, media relations, and employer partnership showcases","Comprehensive reputation platform with interactive outcome data, employer testimonials, student journey content, and strategic rankings optimization"]},{id:"spec_innovation_capacity_spec",label:"QH8",category:"INSTITUTIONAL READINESS",question:"How does your school evaluate and adopt innovations in teaching, clinical practice, or professional preparation?",type:"single-select",required:!0,options:["Curriculum changes require formal committee approval and typically take 1-2 years","Individual faculty innovate within their courses, but institutional adoption is slow","Curriculum committee is open to evidence-based innovations with defined proposal and pilot processes","Innovation pipeline with pilot funding, assessment framework, and pathway from experiment to standard practice","Culture of continuous improvement with designated innovation time, cross-disciplinary collaboration, and rapid curriculum iteration informed by practice trends and outcome data"]}];var me={A:{key:B,name:G,questions:F},B:{key:j,name:Y,questions:W},C:{key:K,name:V,questions:J},D:{key:X,name:Z,questions:ee},E:{key:te,name:ie,questions:ae},F:{key:ne,name:oe,questions:se},G:{key:re,name:le,questions:de},H:{key:ce,name:ue,questions:pe}};var w="https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v3.1.0/verticals/higher-ed/images",ge={operational:`${w}/operational.webp`,acquisition:`${w}/acquisition.webp`,digital:`${w}/digital.webp`,practice_readiness:`${w}/practice_readiness.webp`};P({CONFIG:Q,CORE_QUESTIONS:H,CLOSING_QUESTIONS:z,MODULES:me,DIM_IMAGES:ge,hasModuleIPicker:!1,fallbackModule:"H"});})();
