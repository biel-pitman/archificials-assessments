(function(){
  var el = document.getElementById('baker-matthews-report');
  if (!el) return;

  // Walk up to find first ancestor with a real rendered width
  var ref = el.parentElement;
  while (ref && ref !== document.body && ref.offsetWidth === 0) {
    ref = ref.parentElement;
  }
  var w = (ref && ref.offsetWidth > 0) ? ref.offsetWidth : window.innerWidth;

  el.style.cssText = 'display:block;width:' + w + 'px;padding:0;margin:0;';

  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'display:block;width:' + w + 'px;height:100vh;border:none;';
  iframe.setAttribute('frameborder','0');
  el.appendChild(iframe);

  fetch('https://cdn.jsdelivr.net/gh/biel-pitman/archificials-assessments@v4.2.1/reports/law-firm/BakerMatthews_AIReadinessReport_v1.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      var blob = new Blob([html], {type:'text/html'});
      iframe.src = URL.createObjectURL(blob);
    });
})();
