(function(){
  var el = document.getElementById('baker-matthews-report');
  if (!el) return;
  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:100%;height:100vh;border:none;display:block;';
  iframe.setAttribute('frameborder','0');
  fetch('https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v4.2.1/reports/law-firm/BakerMatthews_AIReadinessReport_v1.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      var blob = new Blob([html], {type:'text/html'});
      iframe.src = URL.createObjectURL(blob);
      el.appendChild(iframe);
    });
})();
