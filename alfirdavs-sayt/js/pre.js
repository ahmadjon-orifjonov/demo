/* ALFIRDAVS TM — birinchi skript (sahifa chizilishidan oldin): JS borligini belgilaydi (.no-js -> .js)
   va eski «?lang=ru» ko'rinishidagi havolalarni shu sahifaning til papkasiga yo'naltiradi. */
(function () {
  var d = document.documentElement;
  d.className = d.className.replace(/\bno-js\b/, 'js');
  try {
    var q = new URLSearchParams(location.search).get('lang'), cur = d.getAttribute('data-lang'), DIR = { uzc: '', ru: 'ru/', en: 'en/' };
    if (q && Object.prototype.hasOwnProperty.call(DIR, q) && q !== cur && d.getAttribute('data-page') !== '404') {
      location.replace(((d.getAttribute('data-root') || '') + DIR[q] + (d.getAttribute('data-path') || '')) || './');
    }
  } catch (e) {}
})();
