/* ALFIRDAVS TM — NAMUNA QATLAMI (r16). FAQAT namuna (demo) build'da, panel.html ga js/qatlam.js dan OLDIN ulanadi.
   Haqiqiy panel (sayt/server/panel) fayllari o'zgarmagan holda ishlaydi: bu qatlam panelning `api/…` so'rovlarini shu brauzerda
   ushlab, server o'rniga o'zi javob beradi. Ma'lumot brauzer xotirasida (localStorage) turadi — hech qayerga yuborilmaydi.
   «Сайтга чиқариш» bosilganda ma'lumot namuna sayt o'qiydigan kalitlarga yoziladi (js/data.js: alf_db_r16 / alf_set_r16) —
   shu brauzerda ochilgan namuna sayt yangi ko'rinishda chiqadi.
   Bu yerda HAQIQIY PAROL YO'Q: kirish ma'lumoti ochiq (namuna / namuna) va kirish sahifasining o'zida yozib qo'yilgan.
   Haqiqiy saytga (prod build) va server paketiga bu fayl KIRMAYDI. */
(function () {
  'use strict';
  var ALF = window.ALF;
  var LOGIN = 'namuna', PAROL = 'namuna';                    // ochiq namuna kirish ma'lumoti (sir emas)
  var K = { holat: 'alf_nm_holat', tarix: 'alf_nm_tarix', jurnal: 'alf_nm_jurnal', kirgan: 'alf_nm_kirgan' };
  var SAYT = { db: 'alf_db_r16', set: 'alf_set_r16' };       // namuna sayt o'qiydigan kalitlar (r11/data.tpl.js bilan bir xil bo'lishi shart)
  var TARIX_MAX = 8, JURNAL_MAX = 30;
  var aslMahsulot = ALF.loadProducts, aslSozlama = ALF.loadSettings;   // qatlam.js almashtirishidan oldingi (boshlang'ich ma'lumot)

  function $(s) { return document.querySelector(s); }
  function nusxa(o) { return JSON.parse(JSON.stringify(o)); }
  function ru() { return /(?:^|;\s*)alf_til=ru(?:;|$)/.test(document.cookie || ''); }
  var M = {
    tasma: ['Намуна: ўзгаришлар фақат шу браузерда сақланади', 'Образец: изменения сохраняются только в этом браузере'],
    bosh: ['Бошидан бошлаш', 'Начать заново'],
    'bosh.h': ['Намунани бошидан бошлаш', 'Начать образец заново'],
    'bosh.p': ['Шу браузерда қилинган ҳамма ўзгариш ўчади, намуна сайт ва панел дастлабки ҳолига қайтади.', 'Все изменения, сделанные в этом браузере, удалятся: образец сайта и панель вернутся к исходному виду.'],
    'bosh.ha': ['Бошидан бошлаш', 'Начать заново'],
    'bosh.yoq': ['Қолдириш', 'Оставить'],
    kir: ['Намуна — кириш:', 'Образец — вход:'],
    'kir.izoh': ['Бу ҳақиқий парол эмас. Намунада ҳеч нарса интернетга юборилмайди.', 'Это не настоящий пароль. В образце ничего не отправляется в интернет.'],
    'kir.xato': ['Логин ёки парол нотўғри. Намуна учун: namuna / namuna', 'Неверный логин или пароль. Для образца: namuna / namuna'],
    ochiq: ['Намунада бу ўчирилган — ҳақиқий серверда ишлайди.', 'В образце это отключено — на настоящем сервере работает.'],
    'xavf.izoh': ['Намунада парол алмаштириш ва икки босқичли кириш ўчирилган — улар ҳақиқий серверда ишлайди.', 'В образце смена пароля и двухэтапный вход отключены — на настоящем сервере они работают.'],
    'surat.tur': ['Намунада маҳсулот тури сурати юкланмайди (ҳақиқий серверда ишлайди). Маҳсулотнинг ўз суратини юклаб кўришингиз мумкин.', 'В образце фото вида продукции не загружается (на настоящем сервере работает). Можно попробовать загрузить фото самой позиции.'],
    'surat.rad': ['Бу файлни очиб бўлмади. JPG, PNG ёки WebP сурат танланг.', 'Не удалось открыть этот файл. Выберите фото JPG, PNG или WebP.'],
    pdf: ['Намунада ҳужжат (PDF) юклаш ўчирилган — ҳақиқий серверда ишлайди.', 'В образце загрузка документов (PDF) отключена — на настоящем сервере работает.'],
    xotira: ['Браузер хотираси тўлди. Юкланган суратларни камайтиринг ёки «Бошидан бошлаш»ни босинг.', 'Память браузера заполнена. Уберите часть загруженных фото или нажмите «Начать заново».'],
    xotirayoq: ['Бу браузерда хотира ёпиқ (масалан, махфий ойна) — намуна ўзгаришларни сақлай олмайди.', 'В этом браузере память закрыта (например, приватное окно) — образец не может сохранять изменения.'],
    boshqa: ['Маълумот бошқа ойнада ўзгарган. Саҳифани янгилаб, қайта уриниб кўринг.', 'Данные изменены в другом окне. Обновите страницу и попробуйте ещё раз.'],
    kerak: ['Аввал киринг', 'Сначала войдите'],
    yoq: ['Топилмади', 'Не найдено']
  };
  function m(k) { var x = M[k]; return x ? x[ru() ? 1 : 0] : k; }

  /* ---------- brauzer xotirasi ---------- */
  function ol(k) { try { var s = window.localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function yoz(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function xom(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function ochir(k) { try { window.localStorage.removeItem(k); } catch (e) {} }
  function xotiraBor() { try { window.localStorage.setItem('alf_nm_t', '1'); window.localStorage.removeItem('alf_nm_t'); return true; } catch (e) { return false; } }
  function kirgan() { try { return window.sessionStorage.getItem(K.kirgan) === '1'; } catch (e) { return false; } }
  function kirganQoy(v) { try { if (v) window.sessionStorage.setItem(K.kirgan, '1'); else window.sessionStorage.removeItem(K.kirgan); } catch (e) {} }

  /* ---------- namuna «bazasi» ---------- */
  function boshHujjat() { var d = aslMahsulot(); delete d.v; return { db: d, settings: aslSozlama(), tasdiqlangan: { katalog: false } }; }
  function hujjatmi(h) { return !!h && typeof h === 'object' && !!h.db && Array.isArray(h.db.products) && Array.isArray(h.db.countries) && Array.isArray(h.db.types) && !!h.settings && typeof h.settings === 'object'; }
  var boshVaqt = Date.now();
  function joriy() {
    var h = ol(K.holat);
    if (h && typeof h.id === 'number' && hujjatmi(h.hujjat)) return h;
    return { id: 1, vaqt: boshVaqt, kim: 'намуна', izoh: 'Бошланғич маълумот', hujjat: boshHujjat() };
  }
  function tarix() { var t = ol(K.tarix); return Array.isArray(t) ? t.filter(function (x) { return x && typeof x.id === 'number' && hujjatmi(x.hujjat); }) : []; }
  function jurnal() { var j = ol(K.jurnal); return Array.isArray(j) ? j : []; }
  function jurnalYoz(tur, izoh) { var j = jurnal(); j.unshift({ vaqt: Date.now(), tur: tur, login: LOGIN, ip: 'намуна', izoh: izoh || '' }); yoz(K.jurnal, j.slice(0, JURNAL_MAX)); }
  // server bilan bir xil qisqa izoh (qatlam.js uni ruschaga o'zi o'giradi)
  var BOLIM = { countries: 'ҳудудлар', types: 'турлар', products: 'маҳсулотлар', stats: 'рақамлар', certs: 'сертификатлар', gallery: 'галерея', faq: 'савол-жавоб', terms: 'шартлар' };
  function farq(eski, yangi) {
    var o = [], k;
    for (k in BOLIM) if (JSON.stringify(eski.db[k]) !== JSON.stringify(yangi.db[k])) o.push(BOLIM[k]);
    if (JSON.stringify(eski.settings) !== JSON.stringify(yangi.settings)) o.push('алоқа');
    var a = !!(eski.tasdiqlangan && eski.tasdiqlangan.katalog), b = !!(yangi.tasdiqlangan && yangi.tasdiqlangan.katalog);
    if (a !== b) o.push(b ? 'каталог тасдиқланди' : 'каталог тасдиғи олинди');
    return o.length ? 'Ўзгарди: ' + o.join(', ') : 'Ўзгаришсиз сақланди';
  }
  // yangi holatni saqlaydi va namuna saytga «chiqaradi». Joy yetmasa eng eski tarix yozuvlari tashlab yuboriladi.
  function saqla(hujjat, izoh) {
    var eski = joriy(), t = tarix();
    if (!t.length) t = [{ id: eski.id, vaqt: eski.vaqt, kim: eski.kim, izoh: eski.izoh || 'Бошланғич маълумот', hujjat: eski.hujjat }];
    var yangi = { id: eski.id + 1, vaqt: Date.now(), kim: LOGIN, izoh: izoh || farq(eski.hujjat, hujjat), hujjat: hujjat };
    t.unshift(yangi); t = t.slice(0, TARIX_MAX);
    var d = nusxa(hujjat.db); d.v = 1;
    // yozib bo'lmasa (joy tugagan) — uchala kalit avvalgi holiga qaytariladi: yarim yozilgan holat qolmaydi
    var kal = [K.holat, SAYT.db, SAYT.set], oldin = kal.map(xom);
    if (!yoz(K.holat, yangi) || !yoz(SAYT.db, d) || !yoz(SAYT.set, hujjat.settings)) {
      kal.forEach(function (k, n) { ochir(k); if (oldin[n] != null) { try { window.localStorage.setItem(k, oldin[n]); } catch (e) {} } });
      return null;
    }
    while (t.length > 1 && !yoz(K.tarix, t)) t.pop();
    return yangi;
  }

  /* ---------- surat: brauzerning o'zida kichraytiriladi (hech qayerga yuborilmaydi) ---------- */
  var turSurat = false;
  document.addEventListener('change', function (e) { if (e.target && e.target.id === 'tImg') turSurat = true; }, true);
  function suratKichrayt(fayl) {
    return new Promise(function (ok, rad) {
      if (!fayl || !/^image\/(jpeg|png|webp)$/.test(fayl.type || '')) return rad(new Error('tur'));
      var u = URL.createObjectURL(fayl), im = new Image();
      im.onload = function () {
        try {
          var k = Math.min(1, 800 / Math.max(im.naturalWidth, im.naturalHeight)), w = Math.max(1, Math.round(im.naturalWidth * k)), h = Math.max(1, Math.round(im.naturalHeight * k));
          var c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(im, 0, 0, w, h);
          var d = c.toDataURL('image/webp', 0.78);
          if (!/^data:image\/webp;base64,/.test(d)) d = c.toDataURL('image/jpeg', 0.8);
          URL.revokeObjectURL(u); ok({ yol: d, w: w, h: h });
        } catch (x) { URL.revokeObjectURL(u); rad(x); }
      };
      im.onerror = function () { URL.revokeObjectURL(u); rad(new Error('ochilmadi')); };
      im.src = u;
    });
  }

  /* ---------- «server» ---------- */
  function J(holat, tana) { return { holat: holat, tana: tana }; }
  function api(usul, yol, tana) {
    var q = yol.indexOf('?'), soz = q >= 0 ? yol.slice(q + 1) : ''; if (q >= 0) yol = yol.slice(0, q);
    if (yol === 'men' && usul === 'GET') return J(200, kirgan() ? { kirgan: true, login: LOGIN, csrf: 'namuna', ikki: false } : { kirgan: false });
    if (yol === 'kirish' && usul === 'POST') {
      var o = tana || {};
      if (String(o.login || '').trim().toLowerCase() !== LOGIN || o.parol !== PAROL) return J(401, { xato: m('kir.xato') });
      if (!xotiraBor()) return J(503, { xato: m('xotirayoq') });
      kirganQoy(true); jurnalYoz('kirish');
      return J(200, { login: LOGIN, csrf: 'namuna', ikki: false });
    }
    if (!kirgan()) return J(401, { xato: m('kerak') });
    if (yol === 'chiqish' && usul === 'POST') { jurnalYoz('chiqish'); kirganQoy(false); return J(200, { ok: true }); }
    if (yol === 'holat' && usul === 'GET') { var h = joriy(); return J(200, { id: h.id, vaqt: h.vaqt, kim: h.kim, hujjat: nusxa(h.hujjat), sayt: true }); }
    if (yol === 'holat' && usul === 'PUT') {
      if (!tana || !hujjatmi(tana.hujjat)) return J(400, { xato: m('yoq') });
      if (tana.asos !== joriy().id) return J(409, { xato: m('boshqa') });
      var hj = nusxa(tana.hujjat); if (hj.db && 'v' in hj.db) delete hj.db.v;
      var r = saqla(hj, '');
      if (!r) return J(507, { xato: m('xotira') });
      jurnalYoz('saqlash', r.izoh);
      return J(200, { id: r.id, izoh: r.izoh });
    }
    if (yol === 'korish' && usul === 'POST') {
      if (!tana || !hujjatmi(tana.hujjat)) return J(400, { xato: m('yoq') });
      try {
        var kd = nusxa(tana.hujjat.db); kd.v = 1;
        window.sessionStorage.setItem('kor_' + SAYT.db, JSON.stringify(kd));
        window.sessionStorage.setItem('kor_' + SAYT.set, JSON.stringify(tana.hujjat.settings));
        window.sessionStorage.setItem('alf_korish', '1');
      } catch (e) { return J(507, { xato: m('xotira') }); }
      return J(200, { ok: true, yol: './' });               // namuna saytning o'zi (shu papka) — ichki ramkada ochiladi
    }
    if (yol === 'tarix' && usul === 'GET') {
      var t = tarix(); if (!t.length) { var c = joriy(); t = [c]; }
      return J(200, { tarix: t.map(function (x) { return { id: x.id, vaqt: x.vaqt, kim: x.kim, izoh: x.izoh || '' }; }) });
    }
    if (yol === 'qaytarish' && usul === 'POST') {
      var id = tana && tana.id, e = null; tarix().forEach(function (x) { if (x.id === id) e = x; });
      if (!e) return J(404, { xato: m('yoq') });
      var r2 = saqla(nusxa(e.hujjat), '№' + e.id + ' ҳолатга қайтарилди');
      if (!r2) return J(507, { xato: m('xotira') });
      jurnalYoz('qaytarish', r2.izoh);
      return J(200, { id: r2.id, izoh: r2.izoh });
    }
    if (yol === 'jurnal' && usul === 'GET') return J(200, { jurnal: jurnal() });
    if (yol === 'parol' || yol.indexOf('2fa/') === 0) return J(400, { xato: m('ochiq') });
    if (yol === 'yuklash' && usul === 'POST') {
      if (!/(?:^|&)tur=surat(?:&|$)/.test(soz)) return J(400, { xato: m('pdf') });
      if (turSurat) { turSurat = false; return J(400, { xato: m('surat.tur') }); }
      return suratKichrayt(tana).then(function (r) { return J(200, r); }, function () { return J(400, { xato: m('surat.rad') }); });
    }
    return J(404, { xato: m('yoq') });
  }
  // panelning `api/…` so'rovlari tarmoqqa chiqmaydi; boshqa hamma so'rov (bu sahifada yo'q) o'zgarishsiz o'tadi
  var aslFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (manzil, soz) {
    var u = String(manzil && manzil.url ? manzil.url : manzil);
    if (u.indexOf('api/') !== 0) return aslFetch ? aslFetch(manzil, soz) : Promise.reject(new Error('fetch'));
    soz = soz || {};
    var usul = String(soz.method || 'GET').toUpperCase(), tana = soz.body;
    if (typeof tana === 'string') { try { tana = JSON.parse(tana); } catch (e) { tana = null; } }
    return new Promise(function (ok) {
      setTimeout(function () {
        var r; try { r = api(usul, u.slice(4), tana); } catch (e) { r = J(500, { xato: m('xotira') }); }
        Promise.resolve(r).then(function (r) { ok(new Response(JSON.stringify(r.tana), { status: r.holat, headers: { 'Content-Type': 'application/json; charset=utf-8' } })); });
      }, 90);
    });
  };

  /* ---------- «Бошидан бошлаш» ---------- */
  var tiklanmoqda = false;
  // panelning «chiqarilmagan o'zgarishlar bor» ogohlantirishi tiklash paytida chiqmasin (bu tinglovchi qatlam.js nikidan oldin ro'yxatga olingan)
  window.addEventListener('beforeunload', function (e) { if (tiklanmoqda) e.stopImmediatePropagation(); });
  function tikla() {
    tiklanmoqda = true;
    [K.holat, K.tarix, K.jurnal, SAYT.db, SAYT.set].forEach(ochir);
    try { ['kor_' + SAYT.db, 'kor_' + SAYT.set, 'alf_korish'].forEach(function (k) { window.sessionStorage.removeItem(k); }); } catch (e) {}
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    location.reload();
  }
  function tiklaSora() {
    var S = window.ALFSRV;
    if (S && S.sora) S.sora(m('bosh.h'), m('bosh.p'), m('bosh.ha'), m('bosh.yoq'), tikla); else tikla();
  }

  /* ---------- ko'rinish: tasma, kirish ma'lumoti, izohlar (faqat DOM orqali — inline uslub/skript yo'q) ---------- */
  function el(teg, cls, matn) { var x = document.createElement(teg); if (cls) x.className = cls; if (matn != null) x.textContent = matn; return x; }
  var tasma = el('div', 'nm'), tasmaT = el('span', 'nm__t'), tasmaB = el('button', 'nm__b');
  tasma.setAttribute('role', 'note'); tasmaB.type = 'button'; tasma.appendChild(tasmaT); tasma.appendChild(tasmaB);
  tasmaB.addEventListener('click', tiklaSora);
  var kir = el('p', 'nm-kir'), kirA = el('span'), kirL = el('b', 'num', LOGIN), kirP = el('b', 'num', PAROL), kirI = el('small');
  kir.appendChild(kirA); kir.appendChild(document.createTextNode(' ')); kir.appendChild(kirL); kir.appendChild(document.createTextNode(' / ')); kir.appendChild(kirP); kir.appendChild(kirI);
  var xavf = el('p', 'note nm-izoh');
  function matnlar() {
    tasmaT.textContent = m('tasma'); tasmaB.textContent = m('bosh');
    kirA.textContent = m('kir'); kirI.textContent = m('kir.izoh'); xavf.textContent = m('xavf.izoh');
  }
  function olcham() { try { document.documentElement.style.setProperty('--nm-h', tasma.offsetHeight + 'px'); } catch (e) {} }
  function qur() {
    document.body.insertBefore(tasma, document.body.firstChild);
    var err = $('#lgErr'); if (err && err.parentNode) err.parentNode.insertBefore(kir, err);
    var vs = $('#v-s'), pw = $('#pwForm'); if (vs && pw) vs.insertBefore(xavf, pw);
    var sl = $('#siteLink'); if (sl) sl.setAttribute('href', './');           // «Сайт» — namuna saytning o'zi (shu papka)
    // namuna: kirish maydonlari tayyor to'ldirib qo'yiladi (kirish oynasi har ochilganda; panel uni ochayotganda parolni tozalaydi)
    var lv = $('#loginView');
    var toldir = function () { var l = $('#lgLogin'), p = $('#lgParol'); if (!lv || lv.hidden) return; if (l && !l.value) l.value = LOGIN; if (p && !p.value && !$('#lgErr').textContent) p.value = PAROL; };
    if (lv) { try { new MutationObserver(function () { setTimeout(toldir, 80); }).observe(lv, { attributes: true, attributeFilter: ['hidden'] }); } catch (e) {} }
    matnlar(); olcham();
    try { new ResizeObserver(olcham).observe(tasma); } catch (e) { window.addEventListener('resize', olcham); }
    // «Сайтда қандай кўринади»: ramkada ochilgan namuna sayt sahifasiga «tahrirlash» belgilari (panelning o'z js/korish.js fayli) ulanadi
    var f = $('#korF');
    if (f) f.addEventListener('load', function () {
      try {
        var d = f.contentDocument; if (!d || !d.head || !f.getAttribute('src') || d.getElementById('alf-kor')) return;
        var c = d.createElement('link'); c.rel = 'stylesheet'; c.id = 'alf-kor'; c.href = new URL('css/korish.css', location.href).href; d.head.appendChild(c);
        var s = d.createElement('script'); s.src = new URL('js/korish.js', location.href).href; d.head.appendChild(s);
      } catch (e) {}
    });
  }
  // til almashganda (qatlam.js cookie'ni shu bosishning o'zida yozadi) matnlar yangilanadi
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('[data-til]')) setTimeout(function () { matnlar(); olcham(); }, 0); });
  // chiqishdan keyin (qatlam.js sahifani qayta yuklaydi) parol maydoni yana tayyor turadi — qur() har yuklanishda ishlaydi
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qur); else qur();
  window.ALFNAMUNA = { kalitlar: { sayt: SAYT, panel: K }, tikla: tikla };
})();
