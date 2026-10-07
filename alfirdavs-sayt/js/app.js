/* ALFIRDAVS TM — sayt mantiqi r7: til, aloqa sozlamalari, katalog filtrlari, xarita, aloqa oynasi, animatsiya */
(function () {
  'use strict';
  var D = window.I18N || {};
  var ALF = window.ALF;
  var LANGS = ['uzc', 'ru', 'en'];
  var HTML_LANG = { uzc: 'uz-Cyrl', ru: 'ru', en: 'en' };
  var OG_LOC = { uzc: 'uz_UZ', ru: 'ru_RU', en: 'en_US' };
  var ORDER = ['pl', 'by', 'ru', 'tr', 'ir', 'in', 'cn'];
  var ST_ORDER = { 'in': 0, way: 1, out: 2 };
  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = !!(mqReduce && mqReduce.matches);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var lang = 'uzc';
  var db = ALF.loadProducts();
  var S = ALF.loadSettings();
  function t(key) { var s = D[lang] && D[lang][key]; return s != null ? s : (D.uzc && D.uzc[key]) || ''; }
  function fill(tpl, o) { return tpl.replace(/\{(\w)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }
  function L(o) { if (!o) return ''; if (typeof o === 'string') return o; return o[lang] || o.uzc || o.ru || o.en || ''; }
  function country(id) { for (var i = 0; i < db.countries.length; i++) if (db.countries[i].id === id) return db.countries[i]; return null; }
  function region(c, id) { if (!c) return null; for (var i = 0; i < c.regions.length; i++) if (c.regions[i].id === id) return c.regions[i]; return null; }
  function type(id) { for (var i = 0; i < db.types.length; i++) if (db.types[i].id === id) return db.types[i]; return null; }
  // nom: shu tildagi nom -> turning shu tildagi nomi -> o'zbekcha nom (A18)
  function pName(p) {
    var tn = (type(p.type) || {}).name || {};
    if (p.name && p.name[lang]) return p.name[lang];
    return tn[lang] || (p.name && L(p.name)) || L(tn);
  }
  function product(id) { for (var i = 0; i < db.products.length; i++) if (db.products[i].id === id) return db.products[i]; return null; }

  /* ---------- aloqa havolalari (sozlamalardan; normallash data.js da) ---------- */
  var C = {};
  function calcContacts() {
    var p1 = ALF.normPhone(S.phone), p2 = ALF.normPhone(S.phone2), wa = ALF.normPhone(S.wa);
    C = {
      tel: p1.ok && !p1.empty ? p1 : null,
      tel2: p2.ok && !p2.empty ? p2 : null,
      tg: ALF.normTg(S.tg),
      wa: wa.ok && !wa.empty ? wa : (p1.ok && !p1.empty ? p1 : null),
      max: ALF.normMax(S.max),
      ig: ALF.normIg(S.instagram),
      map: ALF.safeUrl(S.mapUrl) || ('https://yandex.uz/maps/?text=' + encodeURIComponent(L(S.addr))),
      map2: ALF.safeUrl(S.mapUrl2) || ('https://yandex.uz/maps/?text=' + encodeURIComponent(L(S.addr2)))
    };
  }
  var WRAP = { tel: function () { return C.tel; }, phone2: function () { return C.tel2; }, tg: function () { return C.tg; }, wa: function () { return C.wa; },
    max: function () { return C.max; }, ig: function () { return C.ig; }, addr2: function () { return L(S.addr2); } };
  function applySettings(root, msg) {
    var m = msg ? '?text=' + encodeURIComponent(msg) : '';
    $$('[data-wrap]', root).forEach(function (el) { var f = WRAP[el.getAttribute('data-wrap')]; if (f) el.hidden = !f(); });
    $$('[data-set]', root).forEach(function (el) {
      var k = el.getAttribute('data-set'), withMsg = el.hasAttribute('data-msg') ? m : '';
      var need = { tel: 'tel', tel2: 'tel2', tg: 'tg', wa: 'wa', max: 'max', ig: 'ig' }[k];
      if (need && !el.hasAttribute('data-wrap')) el.hidden = !C[need];   // noto'g'ri/bo'sh aloqa — havola ko'rinmaydi
      if (k === 'tel') { if (C.tel) el.href = 'tel:+' + C.tel.d; }
      else if (k === 'tel2') { if (C.tel2) el.href = 'tel:+' + C.tel2.d; }
      else if (k === 'tg') { if (C.tg) el.href = C.tg.href + withMsg; }
      else if (k === 'wa') { if (C.wa) el.href = 'https://wa.me/' + C.wa.d + withMsg; }
      else if (k === 'map') el.href = C.map;
      else if (k === 'map2') el.href = C.map2;
      else if (k === 'ig') { if (C.ig) el.href = C.ig.href; }
      else if (k === 'max') {
        if (!C.max) return;
        if (C.max.kind === 'url') { el.href = C.max.href; el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); el.removeAttribute('data-copy'); }
        else { el.href = '#'; el.removeAttribute('target'); el.setAttribute('data-copy', '+' + C.max.id); }
      }
      else if (k === 'phoneTxt') el.textContent = C.tel ? C.tel.text : '';
      else if (k === 'phone2Txt') el.textContent = C.tel2 ? C.tel2.text : '';
      else if (k === 'tgTxt') el.textContent = C.tg ? C.tg.text : '';
      else if (k === 'waTxt') el.textContent = C.wa ? C.wa.text : '';
      else if (k === 'maxTxt') el.textContent = C.max ? (C.max.kind === 'url' ? C.max.text : C.max.text + ' · ' + t('con.maxhint')) : '';
      else if (k === 'igTxt') el.textContent = C.ig ? C.ig.text : '';
      else if (k === 'addr') el.textContent = L(S.addr);
      else if (k === 'addr2') el.textContent = L(S.addr2);
      else if (k === 'hours') el.textContent = L(S.hours);
    });
  }
  function applyAllSettings() {
    calcContacts();
    applySettings(document.body, t('msg.hello'));
    var ld = $('#ld');
    if (ld) {
      try {
        var o = JSON.parse(ld.textContent); o.description = t('ld.desc');
        if (C.tel) o.telephone = '+' + C.tel.d; else delete o.telephone;
        o.sameAs = [C.tg && C.tg.href, C.ig && C.ig.href].filter(Boolean);
        ld.textContent = JSON.stringify(o);
      } catch (e) {}
    }
  }
  /* kichik xabar (MAX raqami nusxalanganda) */
  var toastEl = null, toastT = 0;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2600);
  }
  function copyText(txt) {
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt); } catch (e) {}
    return new Promise(function (res) {
      var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); res();
    });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-copy]');
    if (!a) return;
    e.preventDefault();
    var num = a.getAttribute('data-copy');
    Promise.resolve(copyText(num)).catch(function () {}).then(function () { toast(t('con.maxcopy') + ': ' + (C.max ? C.max.text : num)); });
  });

  /* ---------- katalog ---------- */
  var F = { country: '', region: '', type: '', stock: false, more: false };
  var LIMIT = 8;
  var elCountry = $('#fCountry'), elRegion = $('#fRegion'), elRegionRow = $('#fRegionRow'), elType = $('#fType'),
      elStock = $('#fStock'), elCount = $('#fCount'), elCards = $('#cards'), elEmpty = $('#empty');
  function chip(attr, val, label, extra, pressed, disabled) {
    return '<button type="button" class="chip" ' + attr + '="' + esc(val) + '" aria-pressed="' + (pressed ? 'true' : 'false') + '"' + (disabled ? ' disabled' : '') + '>' + (extra && extra.code ? '<i>' + esc(extra.code) + '</i>' : '') +
      '<span>' + esc(label) + '</span>' + (extra && extra.n != null ? '<small class="num">' + extra.n + '</small>' : '') + '</button>';
  }
  function match(p, skip) {
    if (skip !== 'country' && F.country && p.country !== F.country) return false;
    if (skip !== 'country' && skip !== 'region' && F.region && p.region !== F.region) return false;
    if (skip !== 'type' && F.type && p.type !== F.type) return false;
    if (F.stock && p.status !== 'in') return false;
    return true;
  }
  function count(fn) { var n = 0; db.products.forEach(function (p) { if (fn(p)) n++; }); return n; }
  function packTxt(p) { return fill(t('card.pack'), { n: p.kg || 20 }); }
  function altTxt(p) {
    if (p.alt && p.alt[lang]) return p.alt[lang];
    var c = country(p.country), r = region(c, p.region);
    return pName(p) + (c ? ' — ' + L(c.name) + (r ? ', ' + L(r.name) : '') : '');
  }
  function imgHtml(p) {
    var tp = type(p.type) || {};
    var alt = esc(altTxt(p));
    if (p.img) {
      var m = /^(img\/[\w-]+)-800\.webp$/.exec(p.img);
      if (m) return '<img src="' + m[1] + '-480.webp" srcset="' + m[1] + '-480.webp 480w, ' + p.img + ' 800w" sizes="(min-width:1200px) 290px, (min-width:900px) 33vw, (min-width:640px) 50vw, 112px" alt="' + alt + '" loading="lazy" decoding="async" width="480" height="360">';
      return '<img src="' + esc(p.img) + '" alt="' + alt + '" loading="lazy" decoding="async" width="480" height="360">';
    }
    if (tp.img) return '<img src="' + tp.img + '-480.webp" srcset="' + tp.img + '-480.webp 480w, ' + tp.img + '-800.webp 800w" sizes="(min-width:1200px) 290px, (min-width:900px) 33vw, (min-width:640px) 50vw, 112px" alt="' + alt + '" loading="lazy" decoding="async" width="480" height="360">';
    // surat yo'q: karton qutining yon tomoni (hamma kartada bir xil uslub)
    return '<span class="lbl" role="img" aria-label="' + alt + '"><span class="lbl__top"><svg class="lbl__mark" aria-hidden="true"><use href="#i-logo"/></svg><span>ALFIRDAVS TM</span></span>' +
      '<span class="lbl__name">' + esc(pName(p)) + '</span>' +
      '<span class="lbl__row"><span class="lbl__spec"><span><svg class="ic" aria-hidden="true"><use href="#i-snow"/></svg>−18 °C</span><span class="num">' + esc(packTxt(p)) + '</span></span><span class="lbl__bars"></span></span>' +
      '<span class="lbl__note">' + esc(t('card.photo')) + '</span></span>';
  }
  function cardHtml(p) {
    var c = country(p.country), r = region(c, p.region), tp = type(p.type) || {};
    var st = p.status === 'way' ? 'way' : p.status === 'out' ? 'out' : 'in';
    return '<li class="card' + (st === 'out' ? ' is-out' : '') + '" data-id="' + esc(p.id) + '">' +
      '<div class="card__media">' + imgHtml(p) + '<span class="card__code">' + esc(c ? c.code : '') + '</span></div>' +
      '<div class="card__body"><div class="card__top"><span class="st st--' + st + ' card__st">' + esc(t('st.' + st)) + '</span><span class="card__sub">' + esc(L(tp.sub)) + '</span></div>' +
      '<h3>' + esc(pName(p)) + '</h3>' +
      '<p class="card__origin"><svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg><span>' + esc(c ? L(c.name) : '') + (r ? ' · <b>' + esc(L(r.name)) + '</b>' : '') + '</span></p>' +
      '<p class="card__meta"><span><svg class="ic" aria-hidden="true"><use href="#i-snow"/></svg><span class="num">−18 °C</span></span><span><svg class="ic" aria-hidden="true"><use href="#i-box"/></svg><span class="num">' + esc(packTxt(p)) + '</span></span></p>' +
      '<button type="button" class="btn btn--line card__btn" data-ask="' + esc(p.id) + '"><span>' + esc(t('cta.price')) + '</span><svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg></button>' +
      '</div></li>';
  }
  function renderCatalog() {
    if (!elCards) return;
    var h = chip('data-country', '', t('cat.all'), { n: count(function (p) { return match(p, 'country'); }) }, !F.country);
    db.countries.forEach(function (c) {
      var n = count(function (p) { return p.country === c.id && match(p, 'country'); });
      h += chip('data-country', c.id, L(c.name), { code: c.code, n: n }, F.country === c.id, n === 0 && F.country !== c.id);
    });
    elCountry.innerHTML = h;
    var c = country(F.country);
    if (c) {
      var rh = chip('data-region', '', t('cat.all'), null, !F.region);
      c.regions.forEach(function (r) {
        var n = count(function (p) { return p.country === c.id && p.region === r.id && (!F.type || p.type === F.type) && (!F.stock || p.status === 'in'); });
        rh += chip('data-region', r.id, L(r.name), { n: n }, F.region === r.id, n === 0 && F.region !== r.id);
      });
      elRegion.innerHTML = rh; elRegionRow.hidden = false;
    } else { elRegion.innerHTML = ''; elRegionRow.hidden = true; }
    var th = chip('data-type', '', t('cat.all'), null, !F.type);
    db.types.forEach(function (tp) {
      var any = count(function (p) { return p.type === tp.id; });
      if (!any) return;
      var n = count(function (p) { return p.type === tp.id && match(p, 'type'); });
      th += chip('data-type', tp.id, L(tp.name), { n: n }, F.type === tp.id, n === 0 && F.type !== tp.id);
    });
    elType.innerHTML = th;
    var list = db.products.filter(function (p) { return match(p); })
      .map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) { return ((ST_ORDER[a.p.status] || 0) - (ST_ORDER[b.p.status] || 0)) || (a.i - b.i); })
      .map(function (x) { return x.p; });
    var shown = F.more ? list : list.slice(0, LIMIT);
    elCards.innerHTML = shown.map(cardHtml).join('');
    var moreWrap = $('#moreWrap');
    if (!moreWrap) { moreWrap = document.createElement('div'); moreWrap.className = 'more'; moreWrap.id = 'moreWrap'; elCards.parentNode.insertBefore(moreWrap, elCards.nextSibling); }
    if (list.length > shown.length) {
      moreWrap.innerHTML = '<button type="button" class="btn btn--line" id="moreBtn"><span>' + esc(fill(t('cat.more'), { n: list.length - shown.length })) + '</span><svg class="ic" aria-hidden="true"><use href="#i-down"/></svg></button>';
      moreWrap.hidden = false;
    } else { moreWrap.innerHTML = ''; moreWrap.hidden = true; }
    elEmpty.hidden = list.length > 0;
    elCount.textContent = fill(t(list.length === 1 ? 'cat.count1' : 'cat.count'), { n: list.length });
    if (mapCtl) mapCtl.mark(F.country);
  }
  function setFilter(k, v) {
    F[k] = v; F.more = false;
    if (k === 'country') F.region = '';
    renderCatalog();
  }
  if (elCards) {
    $('#filters').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b || b.disabled) return;
      if (b.hasAttribute('data-country')) setFilter('country', b.getAttribute('data-country'));
      else if (b.hasAttribute('data-region')) setFilter('region', b.getAttribute('data-region'));
      else if (b.hasAttribute('data-type')) setFilter('type', b.getAttribute('data-type'));
    });
    elStock.addEventListener('change', function () { setFilter('stock', elStock.checked); });
    $('#fReset').addEventListener('click', function () { F = { country: '', region: '', type: '', stock: false, more: false }; elStock.checked = false; renderCatalog(); });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('#moreBtn')) { F.more = true; renderCatalog(); }
    });
    elCards.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ask]'); if (!b) return;
      if (product(b.getAttribute('data-ask'))) openDlg({ p: b.getAttribute('data-ask') }, b);
    });
  }

  /* ---------- aloqa oynasi ---------- */
  var dlg = $('#dlg'), dlgCtx = null, dlgOpener = null;
  function ctxText(ctx) {
    var p = ctx && ctx.p ? product(ctx.p) : null;
    if (!p) return null;
    var c = country(p.country), r = region(c, p.region);
    return { p: pName(p), c: c ? L(c.name) : '', r: r ? L(r.name) : '' };
  }
  function setDlg(ctx) {
    dlgCtx = ctx;
    var o = ctxText(ctx);
    var msg = o ? fill(t('msg.prod'), o) : t('msg.hello');
    if (o && !o.r) msg = msg.replace(/, (?=[ .б]|$)/, ' ');
    $('#dlgCtx').hidden = !o;
    var ph = $('#dlg .cbtn--phone'), hint = $('#dlgCallHint');
    if (ph && !hint) { hint = document.createElement('p'); hint.id = 'dlgCallHint'; hint.className = 'dlg__callhint'; ph.parentNode.insertBefore(hint, ph.nextSibling); }
    if (hint) { hint.hidden = !o; hint.textContent = o ? fill(t('modal.callabout'), o) : ''; }
    if (o) $('#dlgCtxTxt').textContent = o.c + (o.r ? ', ' + o.r : '') + ' — ' + o.p;
    applySettings(dlg, msg);
  }
  function openDlg(ctx, opener) {
    if (!dlg || typeof dlg.showModal !== 'function') { location.hash = '#aloqa'; return; }
    dlgOpener = opener || null;
    setDlg(ctx || { gen: 1 });
    dlg.showModal();
    try { $('.cbtn', dlg).focus({ preventScroll: true }); } catch (e) {}
  }
  if (dlg) {
    $('#dlgX').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () {
      dlgCtx = null;
      var to = dlgOpener && document.body.contains(dlgOpener) ? dlgOpener : (dlgOpener && dlgOpener.hasAttribute('data-ask') ? $('#cards [data-ask]') || $('#cat-h') : null);
      if (to) {
        if (to.id === 'cat-h') to.setAttribute('tabindex', '-1');
        var go = function () { try { to.focus({ preventScroll: true }); } catch (e) {} };
        go(); setTimeout(go, 0);
        // fokus yopilgan oyna ichida qolib ketmasin
        if (dlg.contains(document.activeElement)) { try { document.activeElement.blur(); } catch (e) {} go(); }
      }
    });
  }
  $$('[data-contact]').forEach(function (a) {
    a.addEventListener('click', function (e) { if (dlg && typeof dlg.showModal === 'function') { e.preventDefault(); openDlg(null, a); } });
  });

  /* ---------- xarita: 7 yoy ketma-ket chiziladi, nuqta har yoy bo'ylab yuradi ---------- */
  var mapCtl = null;
  function initMap() {
    var map = $('#map'); if (!map) return;
    var routes = ORDER.map(function (k) { return $('.m-route[data-c="' + k + '"]', map); });
    var mover = $('#mover'), nameEl = $('#routeName'), steps = $$('#routeSteps i');
    if (!routes[0] || !routes[0].getTotalLength || !mover) return;
    var lens = routes.map(function (r) { return r.getTotalLength(); });
    var MOVE = 3400, HOLD = 900, CYCLE = MOVE + HOLD;
    var cur = 0, shown = -1, t0 = 0, visible = true, raf = 0, running = false, paused = 0, drawn = false;
    function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    function routeTxt(i) { return t('geo.' + ORDER[i]) + ' → ' + t('geo.tas'); }
    function hiMark() {
      var on = running && shown >= 0 ? ORDER[shown] : '';
      $$('.m-hi', map).forEach(function (el) { var c = el.getAttribute('data-c'); el.classList.toggle('on', c === on || c === mapCtl.filter); });
    }
    function setActive(i) {
      shown = i;
      routes.forEach(function (r, j) { r.classList.toggle('on', j === i); });
      steps.forEach(function (s, j) { s.classList.toggle('on', j <= i); });
      hiMark();
      var txt = routeTxt(i);
      nameEl.style.opacity = '0';
      setTimeout(function () { nameEl.textContent = txt; nameEl.style.opacity = '1'; }, 220);
    }
    function staticState() {
      if (raf) cancelAnimationFrame(raf); raf = 0; running = false;
      routes.forEach(function (r) { r.style.strokeDasharray = 'none'; r.style.strokeDashoffset = '0'; r.classList.add('on'); });
      map.classList.remove('is-live');
      steps.forEach(function (s) { s.classList.add('on'); });
      nameEl.textContent = '7 → ' + t('geo.tas');
      hiMark();
    }
    function frame(now) {
      if (document.hidden) { raf = 0; return; }
      raf = requestAnimationFrame(frame);
      if (!t0) t0 = now;
      var el = now - t0;
      if (el >= CYCLE) { cur = (cur + 1) % routes.length; t0 = now; el = 0; }
      if (shown !== cur) setActive(cur);
      var p = Math.min(1, el / MOVE), pt = routes[cur].getPointAtLength(ease(p) * lens[cur]);
      mover.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
      var hide = el > MOVE + HOLD * 0.5;
      if (mover.__h !== hide) { mover.__h = hide; mover.style.opacity = hide ? '0' : '1'; }
    }
    function run() {
      if (reduce) return staticState();
      running = true; map.classList.add('is-live');
      routes.forEach(function (r) { r.style.strokeDasharray = 'none'; });
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }
    function draw() {
      if (drawn || reduce) return; drawn = true;
      routes.forEach(function (r, i) { r.style.strokeDasharray = lens[i] + ' ' + lens[i]; r.style.strokeDashoffset = lens[i]; });
      var stepAt = function (i) { steps.forEach(function (s, j) { s.classList.toggle('on', j <= i); }); };
      if (window.gsap) {
        window.gsap.to(routes, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: { each: 0.26, onStart: function () { stepAt(routes.indexOf(this.targets()[0])); } }, delay: 0.25, onComplete: run });
      } else {
        routes.forEach(function (r, i) {
          r.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1) ' + (0.25 + i * 0.26) + 's, opacity .6s';
          requestAnimationFrame(function () { requestAnimationFrame(function () { r.style.strokeDashoffset = '0'; }); });
          setTimeout(function () { stepAt(i); }, (0.25 + i * 0.26) * 1000);
        });
        setTimeout(run, 3600);
      }
    }
    function pause() { map.classList.add('is-paused'); if (raf) { cancelAnimationFrame(raf); raf = 0; paused = performance.now(); } }
    function resume() { if (document.hidden) return; map.classList.remove('is-paused'); if (running && !raf && !reduce) { if (paused && t0) t0 += performance.now() - paused; raf = requestAnimationFrame(frame); } }
    mapCtl = {
      filter: '',
      relabel: function () { nameEl.textContent = reduce ? '7 → ' + t('geo.tas') : routeTxt(shown >= 0 ? shown : 0); },
      mark: function (c) {
        this.filter = c || '';
        $$('.map__lab', map).forEach(function (b) { var on = b.getAttribute('data-c') === c; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
        hiMark();
      },
      onReduce: function () { if (reduce) staticState(); else { if (!drawn) draw(); else run(); } }
    };
    if (reduce) staticState(); else nameEl.textContent = routeTxt(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible) { draw(); resume(); } else pause();
      }, { threshold: 0.15 }).observe(map);
    } else draw();
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else if (visible) resume(); });
    map.addEventListener('click', function (e) {
      var b = e.target.closest('.map__lab'); if (!b) return;
      var c = b.getAttribute('data-c');
      F.country = c; F.region = ''; F.more = false;
      if (!db.products.some(function (p) { return match(p); })) { F.type = ''; F.stock = false; if (elStock) elStock.checked = false; }
      renderCatalog();
      var cat = $('#katalog');
      if (window.gsap) window.gsap.set($$('[data-r]', cat), { opacity: 1, y: 0, overwrite: true });
      cat.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------- til ---------- */
  function applyLang(l, save) {
    if (LANGS.indexOf(l) < 0) l = 'uzc';
    lang = l;
    document.documentElement.lang = HTML_LANG[l];
    $$('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    $$('[data-th]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-th')); });
    $$('[data-ta]').forEach(function (el) {
      el.getAttribute('data-ta').split(',').forEach(function (pair) {
        var p = pair.split(':'); el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    var og = $('meta[property="og:locale"]'); if (og) og.setAttribute('content', OG_LOC[l]);
    document.documentElement.classList.remove('lp');
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    applyAllSettings();
    renderCatalog();
    if (mapCtl) mapCtl.relabel();
    if (dlgCtx) setDlg(dlgCtx);
    if (save) {
      store('alf_lang6', l);
      try {
        var u = new URL(location.href);
        if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
      } catch (e) {}
    }
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); });
  });

  /* ---------- yuqori panel va pastki panel ---------- */
  var top = $('#top'), bar = $('#bar'), hero = $('#hero'), con = $('#aloqa');
  function onScroll() { top.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (bar) {
    var conIn = false;
    var upd = function () { bar.classList.toggle('is-on', window.scrollY > hero.offsetHeight * 0.7 && !conIn); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { conIn = en[0].isIntersecting; upd(); }, { threshold: 0.2 }).observe(con);
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- panel boshqa varaqda o'zgartirsa — darhol yangilanadi ---------- */
  window.addEventListener('storage', function (e) {
    if (e.key === ALF.KEYS.db || e.key === ALF.KEYS.set || e.key === null) { db = ALF.loadProducts(); S = ALF.loadSettings(); applyAllSettings(); renderCatalog(); }
  });

  /* ---------- boshlash ---------- */
  var q = null, qc = null; try { var sp = new URLSearchParams(location.search); q = sp.get('lang'); qc = sp.get('c'); } catch (e) {}
  initMap();
  if (qc && country(qc)) F.country = qc;
  var start = LANGS.indexOf(q) >= 0 ? q : store('alf_lang6');
  applyLang(LANGS.indexOf(start) >= 0 ? start : 'uzc', LANGS.indexOf(q) >= 0);

  /* ---------- partiya lentasi va faktlar sanog'i (bir marta) ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    $$('.chain').forEach(function (c) {
      if (c.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      c.classList.add('is-pre');
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { c.classList.remove('is-pre'); io.disconnect(); } }, { threshold: 0.35 });
      io.observe(c);
    });
    $$('[data-count]').forEach(function (el) {
      var n = +el.getAttribute('data-count'), t0 = 0;
      function step(now) { if (!t0) t0 = now; var k = Math.min(1, (now - t0) / 1200); el.textContent = String(Math.round(n * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); }
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); requestAnimationFrame(step); } });
      io.observe(el);
    });
  }
  if ('IntersectionObserver' in window) { var mp = $('#map'); if (mp) new IntersectionObserver(function (en) { mp.classList.toggle('is-off', !en[0].isIntersecting); }).observe(mp); }

  /* ---------- skroll animatsiyalari (GSAP lokal) ---------- */
  var gsapCtx = null;
  function initScrollFx() {
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    var g = window.gsap, ST = window.ScrollTrigger; g.registerPlugin(ST);
    gsapCtx = g.context(function () {
      // faqat muhim bloklar paydo bo'ladi (bo'lim sarlavhalari, surat, partiya lentasi, aloqa kartasi) — qolgani darhol ko'rinadi
      var KEY = '.sec__head, .why__photo, .chain, .con__card, .terms__h';
      var els = $$('[data-r]').filter(function (el) { return el.matches(KEY) && !el.closest('.hero') && el.getBoundingClientRect().top > window.innerHeight; });
      g.set(els, { opacity: 0, y: 28 });
      ST.batch(els, {
        start: 'top 90%', once: true,
        onEnter: function (b) { g.to(b, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, overwrite: true, clearProps: 'transform' }); }
      });
      els.forEach(function (el) { el.addEventListener('focusin', function () { g.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true }); }); });
      var wb = $('.why__photo img');
      if (wb) g.fromTo(wb, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.why__photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
  function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  var gsapLoading = null;
  function startFx() {
    if (reduce) return;
    if (window.gsap && window.ScrollTrigger) return initScrollFx();
    if (!gsapLoading) gsapLoading = loadScript('js/vendor/gsap.min.js').then(function () { return loadScript('js/vendor/ScrollTrigger.min.js'); }).then(initScrollFx).catch(function () {});
  }
  startFx();
  // himoya: animatsiya ishlamay qolsa, kontent baribir ko'rinadi
  function safety() {
    $$('[data-r]').forEach(function (el) {
      var cs = getComputedStyle(el);
      if ((cs.visibility === 'hidden' || +cs.opacity === 0) && el.getBoundingClientRect().top < window.innerHeight) { el.style.visibility = 'visible'; el.style.opacity = '1'; el.style.transform = 'none'; }
    });
  }
  setTimeout(safety, 1800);
  window.addEventListener('scroll', function () { clearTimeout(safety.t); safety.t = setTimeout(safety, 1500); }, { passive: true });

  if (mqReduce) {
    var onRM = function () {
      reduce = mqReduce.matches;
      if (mapCtl) mapCtl.onReduce();
      if (reduce && gsapCtx) { gsapCtx.revert(); gsapCtx = null; $$('[data-r]').forEach(function (el) { el.style.opacity = ''; el.style.visibility = ''; el.style.transform = ''; }); }
      if (reduce) $$('.chain').forEach(function (c) { c.classList.remove('is-pre'); });
      else if (!reduce && !gsapCtx) startFx();
    };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onRM); else if (mqReduce.addListener) mqReduce.addListener(onRM);
  }
})();
