/* Archificials | Baker Matthews AI Readiness Report | archificials.com */
(function () {
  var ROOT_ID = 'baker-matthews-report';
  var CDN_BASE = 'https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v4.2.1';
  var HTML_URL = CDN_BASE + '/reports/law-firm/BakerMatthews_AIReadinessReport_v1.html';

  function init() {
    var target = document.getElementById(ROOT_ID);
    if (!target) { console.warn('[baker-matthews-report] No element with id="' + ROOT_ID + '" found.'); return; }

    // Break out of Webflow container to fill full viewport width
    target.style.cssText = 'position:relative;width:100vw;left:50%;transform:translateX(-50%);display:block;';

    var iframe = document.createElement('iframe');
    iframe.title = 'Baker Matthews Law Collective AI Readiness Report';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    iframe.style.cssText = 'width:100%;min-height:900px;border:none;display:block;';

    // Fetch HTML and inject via srcdoc to bypass CDN content-type restrictions
    fetch(HTML_URL)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        iframe.srcdoc = html;
        target.appendChild(iframe);

        iframe.onload = function () {
          try {
            var h = iframe.contentDocument.body.scrollHeight;
            if (h > 200) iframe.style.height = h + 'px';
          } catch (e) {
            iframe.style.height = '4800px';
          }
        };
      })
      .catch(function (e) {
        console.error('[baker-matthews-report] Failed to load report:', e);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
