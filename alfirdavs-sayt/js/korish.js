/* ALFIRDAVS TM — «Сайтда қандай кўринади»: ko'rib chiqish sahifasidagi «tahrirlash» belgilari.
   Bu skript OMMAVIY SAYTDA YO'Q. U faqat panel serveri sessiya bilan beradigan ko'rib chiqish nusxasiga (…/korish/…) ulanadi
   va shu sahifa panel ichidagi ramkada ochilgandagina ishlaydi. Belgi bosilganda ota oynaga (panelga) qaysi joyni ochish
   kerakligi aytiladi — xabar faqat o'z manzilimizga yuboriladi. Sayt ma'lumotiga hech narsa yozmaydi. */
(function () {
  'use strict';
  if (window.parent === window) return;                       // ramka ichida emas — hech narsa qilinmaydi
  var ru = /(?:^|;\s*)alf_til=ru(?:;|$)/.test(document.cookie || '');
  var NOM = ru ? 'Изменить' : 'Таҳрирлаш';
  var NS = 'http://www.w3.org/2000/svg';
  function belgi(nima, id, izoh, qisqa) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'alf-tm' + (qisqa ? ' alf-tm--q' : '');
    b.setAttribute('aria-label', NOM + (izoh ? ': ' + izoh : ''));
    var s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    ['M12 20h9', 'M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z'].forEach(function (d) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); s.appendChild(p); });
    b.appendChild(s);
    if (!qisqa) { var sp = document.createElement('span'); sp.textContent = NOM; b.appendChild(sp); }
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      window.parent.postMessage({ alf: 'tahrir', nima: nima, id: id || '' }, window.location.origin);
    });
    return b;
  }
  function qoy(el, b) { if (!el || el.querySelector(':scope > .alf-tm')) return; el.classList.add('alf-tj'); el.appendChild(b); }
  function chiz() {
    var d = document, html = d.documentElement, tur = html.getAttribute('data-type') || '';
    // mahsulot kartalari va kelib chiqish qatorlari -> shu mahsulotning oynasi
    [].forEach.call(d.querySelectorAll('.card[data-id]'), function (c) { qoy(c.querySelector('.card__media') || c, belgi('mahsulot', c.getAttribute('data-id'), (c.querySelector('h3') || {}).textContent, true)); });
    [].forEach.call(d.querySelectorAll('.orig__it[data-id]'), function (c) { qoy(c, belgi('mahsulot', c.getAttribute('data-id'), '', true)); });
    // sahifa qismlari -> «Саҳифа матнлари»ning shu qismi
    var QISM = { stats: 'stats', gallery: 'gallery', certs: 'certs', terms: 'terms', termOne: 'terms', faq: 'faq' };
    [].forEach.call(d.querySelectorAll('[data-dyn]'), function (el) {
      var k = el.getAttribute('data-dyn'), sec = el.closest('section');
      if (!sec || sec.hidden) return;
      var bosh = sec.querySelector('.sec__head') || sec.querySelector('.wrap') || sec;
      if (QISM[k]) qoy(bosh, belgi('qism', QISM[k]));
      else if (k === 'spec' && tur) qoy(bosh, belgi('spec', tur));
    });
    // aloqa bo'limi -> «Алоқа маълумотлари»
    [].forEach.call(d.querySelectorAll('section.con'), function (sec) { qoy(sec.querySelector('.sec__head') || sec.querySelector('.wrap') || sec, belgi('aloqa', '')); });
    // mahsulot turi sahifasining boshi -> shu turning nomi, izohi, surati
    if (tur) { var ph = d.querySelector('section.phead .wrap') || d.querySelector('section.phead'); qoy(ph, belgi('tur', tur)); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chiz); else chiz();
  // sayt o'z skripti bilan ro'yxatni qayta chizganda (filtr, «yana ko'rsatish») belgilar yana qo'yiladi
  var kut = 0;
  try { new MutationObserver(function () { clearTimeout(kut); kut = setTimeout(chiz, 120); }).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
