/* ALFIRDAVS TM — birinchi skript (sahifa chizilishidan oldin): JS borligini belgilaydi (.no-js -> .js)
   va eski «?lang=ru» ko'rinishidagi havolalarni shu sahifaning til papkasiga yo'naltiradi. */
(function () {
  var d = document.documentElement;
  d.className = d.className.replace(/\bno-js\b/, 'js');
  // r19 — qorong'u rejim: foydalanuvchi tugma bilan tanlagan bo'lsa (brauzer xotirasida alf_tema = 'tun'), sahifa chizilishidan OLDIN qo'yiladi —
  // oq chaqnash bo'lmaydi. Standart — yorug'; qurilma sozlamasiga qarab o'zi yoqilmaydi.
  try {
    if (window.localStorage.getItem('alf_tema') === 'tun') {
      d.setAttribute('data-tema', 'tun');
      var tm = document.querySelector('meta[name="theme-color"]'); if (tm) tm.setAttribute('content', '#171312');
    }
  } catch (e) {}
  try {
    var q = new URLSearchParams(location.search).get('lang'), cur = d.getAttribute('data-lang'), DIR = { uzc: '', ru: 'ru/', en: 'en/' };
    if (q && Object.prototype.hasOwnProperty.call(DIR, q) && q !== cur && d.getAttribute('data-page') !== '404') {
      location.replace(((d.getAttribute('data-root') || '') + DIR[q] + (d.getAttribute('data-path') || '')) || './');
    }
  } catch (e) {}
})();
