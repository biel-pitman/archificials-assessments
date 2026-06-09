(function(){
  var el = document.getElementById('baker-matthews-report');
  if (!el) return;
  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:99999;background:#EBEBEB;';
  iframe.setAttribute('frameborder','0');
  fetch('https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v4.2.1/reports/law-firm/BakerMatthews_AIReadinessReport_v1.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      var blob = new Blob([html], {type:'text/html'});
      iframe.src = URL.createObjectURL(blob);
      document.body.appendChild(iframe);
      document.body.style.overflow = 'hidden';
    });
})();
