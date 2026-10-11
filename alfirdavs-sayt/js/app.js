/* ALFIRDAVS TM — sayt mantiqi. Sahifa matni va katalog HTML'da tayyor keladi;
   bu fayl faqat jonlantiradi: filtrlar, aloqa oynasi, xarita, menyu, animatsiya.
   Namuna (demo) saytda panel shu qurilmada ma'lumotni o'zgartirgan bo'lsa, bo'limlarni render.js orqali qayta chizadi;
   haqiqiy (prod) saytda brauzer xotirasi o'qilmaydi. */
(function () {
  'use strict';
  var ALF = window.ALF, html = document.documentElement;
  if (!ALF || !window.ALFR) return;
  var LANGS = ['uzc', 'ru', 'en'];
  var ORDER = ['pl', 'by', 'ru', 'tr', 'ir', 'in', 'cn'];
  var lang = LANGS.indexOf(html.getAttribute('data-lang')) >= 0 ? html.getAttribute('data-lang') : 'uzc';
  var PAGE = html.getAttribute('data-page') || '';
  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = !!(mqReduce && mqReduce.matches);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  // birinchi kadr chizilgandan keyin bajarish: skript ishga tushganda o'lcham o'qilsa, brauzer butun sahifani
  // shu zahoti joylashtirishga majbur bo'ladi (uzun vazifa) — shuning uchun o'lcham o'qiydigan ishlar keyinga qoldiriladi
  function afterPaint(fn) { requestAnimationFrame(function () { setTimeout(fn, 0); }); }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var sp = null; try { sp = new URLSearchParams(location.search); } catch (e) {}

  var ctx = { ALF: ALF, D: window.I18N || {}, lang: lang, mode: html.getAttribute('data-mode') === 'prod' ? 'prod' : 'demo',
    root: html.getAttribute('data-root') || '', lroot: html.getAttribute('data-lroot') || '', avail: html.getAttribute('data-avail') !== '0', db: null, S: null };
  var R, db, S, C;
  function reload() { db = ctx.db = ALF.loadProducts(); S = ctx.S = ALF.loadSettings(); R = window.ALFR(ctx); C = R.contacts(); }
  reload();
  var t = function (k) { return R.t(k); };

  /* ---------- aloqa havolalari (sozlamalardan) ---------- */
  var WRAP = { tel: function () { return C.tel; }, phone2: function () { return C.tel2; }, tg: function () { return C.tg; }, wa: function () { return C.wa; },
    max: function () { return C.max; }, ig: function () { return C.ig; }, addr2: function () { return C.addr2; }, hours: function () { return C.hours; },
    email: function () { return C.email; }, legal: function () { return C.legal; }, inn: function () { return C.inn; } };
  function applySettings(root, msg) {
    var m = msg ? '?text=' + encodeURIComponent(msg) : '';
    $$('[data-wrap]', root).forEach(function (el) { var f = WRAP[el.getAttribute('data-wrap')]; if (f) el.hidden = !f(); });
    $$('[data-set]', root).forEach(function (el) {
      var k = el.getAttribute('data-set'), withMsg = el.hasAttribute('data-msg') ? (el.getAttribute('data-msg') ? '?text=' + encodeURIComponent(el.getAttribute('data-msg')) : m) : '';
      var need = { tel: 'tel', tel2: 'tel2', tg: 'tg', wa: 'wa', max: 'max', ig: 'ig' }[k];
      if (need && !el.hasAttribute('data-wrap')) el.hidden = !C[need];
      if (k === 'tel') { if (C.tel) el.href = 'tel:+' + C.tel.d; }
      else if (k === 'tel2') { if (C.tel2) el.href = 'tel:+' + C.tel2.d; }
      else if (k === 'tg') { if (C.tg) el.href = C.tg.href + withMsg; }
      else if (k === 'wa') { if (C.wa) el.href = 'https://wa.me/' + C.wa.d + withMsg; }
      else if (k === 'map') el.href = C.map;
      else if (k === 'map2') el.href = C.map2;
      else if (k === 'ig') { if (C.ig) el.href = C.ig.href; }
      else if (k === 'max') {
        if (!C.max) return;
        var mb = el.querySelector('.cbtn__t b'); if (mb) mb.textContent = C.max.kind === 'url' ? t('con.max') : t('con.maxnum');
        if (C.max.kind === 'url') { el.href = C.max.href; el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); el.removeAttribute('data-copy'); }
        else { el.href = 'tel:+' + C.max.id; el.removeAttribute('target'); el.removeAttribute('rel'); el.setAttribute('data-copy', '+' + C.max.id); }
      }
      else if (k === 'phoneTxt') el.textContent = C.tel ? C.tel.text : '';
      else if (k === 'phone2Txt') el.textContent = C.tel2 ? C.tel2.text : '';
      else if (k === 'tgTxt') el.textContent = C.tg ? C.tg.text : '';
      else if (k === 'waTxt') el.textContent = C.wa ? C.wa.text : '';
      else if (k === 'maxTxt') el.textContent = R.maxTxt(C);
      else if (k === 'igTxt') el.textContent = C.ig ? C.ig.text : '';
      else if (k === 'addr') el.textContent = C.addr;
      else if (k === 'addr2') el.textContent = C.addr2;
      else if (k === 'hours') el.textContent = C.hours;
      else if (k === 'email') { if (C.email) el.href = 'mailto:' + C.email; }
      else if (k === 'emailTxt') el.textContent = C.email;
      else if (k === 'legal') el.textContent = C.legal;
      else if (k === 'inn') el.textContent = C.inn;
    });
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
      var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.className = 'vh';
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
  var LIMIT = PAGE === 'home' ? 8 : 0;
  var elCountry = $('#fCountry'), elRegion = $('#fRegion'), elRegionRow = $('#fRegionRow'), elType = $('#fType'),
      elStock = $('#fStock'), elCount = $('#fCount'), elCards = $('#cards'), elEmpty = $('#empty'), elMore = $('#moreWrap');
  var mapCtl = null;
  function cleanF() {
    var c = R.country(F.country);
    if (!c) { F.country = ''; F.region = ''; } else if (F.region && !R.region(c, F.region)) F.region = '';
    if (F.type && !R.type(F.type)) F.type = '';
  }
  function renderCatalog() {
    if (!elCards) return;
    cleanF();
    var o = R.catalog(F, F.more ? 0 : LIMIT);
    elCountry.innerHTML = o.country;
    elRegion.innerHTML = o.region; elRegionRow.hidden = !o.region;
    elType.innerHTML = o.type;
    elCards.innerHTML = o.cards;
    if (elMore) { elMore.innerHTML = R.more(o); elMore.hidden = !(o.rest > 0); }
    elEmpty.hidden = o.total > 0;
    elCount.textContent = o.countTxt;
    if (mapCtl) mapCtl.mark(F.country);
    if (PAGE === 'catalog') {
      try {
        var u = new URL(location.href), q = u.searchParams;
        ['c', 'r', 't', 'stock'].forEach(function (k) { q.delete(k); });
        if (F.country) q.set('c', F.country); if (F.region) q.set('r', F.region); if (F.type) q.set('t', F.type); if (F.stock) q.set('stock', '1');
        history.replaceState(null, '', u);
      } catch (e) {}
    }
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
    if (elMore) elMore.addEventListener('click', function (e) {
      if (e.target.closest('#moreBtn')) { e.preventDefault(); F.more = true; renderCatalog(); var f = $('#cards .card:nth-child(' + (LIMIT + 1) + ') a'); if (f) try { f.focus({ preventScroll: true }); } catch (x) {} }
    });
  }
  /* «narxni bilish» (kartada, hududlar ro'yxatida) */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-ask]'); if (!b) return;
    if (!dlg || typeof dlg.showModal !== 'function' || !R.product(b.getAttribute('data-ask'))) return;
    e.preventDefault(); openDlg({ p: b.getAttribute('data-ask') }, b);
  });

  /* ---------- aloqa oynasi ---------- */
  var dlg = $('#dlg'), dlgCtx = null, dlgOpener = null;
  var pageType = PAGE === 'type' ? html.getAttribute('data-type') : '';
  function typeMsg() { var tp = pageType && R.type(pageType); return tp ? R.fill(t('msg.type'), { p: R.L(tp.name) }) : t('msg.hello'); }
  function ctxText(c) {
    var p = c && c.p ? R.product(c.p) : null;
    if (!p) return null;
    var co = R.country(p.country), r = R.region(co, p.region);
    return { p: R.pName(p), c: co ? R.L(co.name) : '', r: r ? R.L(r.name) : '' };
  }
  function setDlg(c) {
    dlgCtx = c;
    var o = ctxText(c), tp = !o && c && c.type ? R.type(c.type) : null;
    var msg = o ? R.fill(t('msg.prod'), o) : tp ? R.fill(t('msg.type'), { p: R.L(tp.name) }) : t('msg.hello');
    if (o && !o.r) msg = msg.replace(/, (?=[ .б]|$)/, ' ');
    $('#dlgCtx').hidden = !(o || tp);
    var ph = $('.cbtn--phone', dlg), hint = $('#dlgCallHint');
    if (ph && !hint) { hint = document.createElement('p'); hint.id = 'dlgCallHint'; hint.className = 'dlg__callhint'; ph.parentNode.insertBefore(hint, ph.nextSibling); }
    if (hint) { hint.hidden = !o; hint.textContent = o ? R.fill(t('modal.callabout'), o) : ''; }
    if (o) $('#dlgCtxTxt').textContent = o.c + (o.r ? ', ' + o.r : '') + ' — ' + o.p;
    else if (tp) $('#dlgCtxTxt').textContent = R.L(tp.name);
    $$('[data-msg]', dlg).forEach(function (a) { a.setAttribute('data-msg', msg); });
    applySettings(dlg, msg);
  }
  function openDlg(c, opener) {
    dlgOpener = opener || null;
    setDlg(c || (pageType ? { type: pageType } : { gen: 1 }));
    dlg.showModal();
    try { $('.cbtn:not([hidden])', dlg).focus({ preventScroll: true }); } catch (e) {}
  }
  if (dlg) {
    $('#dlgX').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () {
      dlgCtx = null;
      var to = dlgOpener && document.body.contains(dlgOpener) ? dlgOpener : (dlgOpener && dlgOpener.hasAttribute('data-ask') ? $('#cards [data-ask]') : null);
      if (to) { var go = function () { try { to.focus({ preventScroll: true }); } catch (e) {} }; go(); setTimeout(go, 0); }
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-contact]'); if (!a || typeof dlg.showModal !== 'function') return;
      e.preventDefault();
      var m = $('#menu'), inMenu = m && m.open; if (inMenu) m.close();
      openDlg(null, inMenu ? burger : a);
    });
  }

  /* ---------- menyu (telefon) ---------- */
  var menu = $('#menu'), burger = $('#burger');
  if (menu && burger && typeof menu.showModal === 'function') {
    burger.addEventListener('click', function () { menu.showModal(); burger.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', function () { burger.setAttribute('aria-expanded', 'false'); try { burger.focus({ preventScroll: true }); } catch (e) {} });
    menu.addEventListener('click', function (e) { if (e.target === menu || e.target.closest('#menuX')) menu.close(); });
  }

  /* ---------- surat oynasi (sertifikat, galereya) ---------- */
  var lb = null;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-zoom]'); if (!a) return;
    if (!lb) {
      lb = document.createElement('dialog'); lb.className = 'lb';
      var fig = document.createElement('figure'), im = document.createElement('img'), cap = document.createElement('figcaption'), x = document.createElement('button');
      x.type = 'button'; x.className = 'dlg__x'; x.setAttribute('aria-label', t('a11y.close'));
      var sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), us = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      sv.setAttribute('class', 'ic'); sv.setAttribute('aria-hidden', 'true'); us.setAttribute('href', '#i-x'); sv.appendChild(us); x.appendChild(sv);
      fig.appendChild(im); fig.appendChild(cap); lb.appendChild(fig); lb.appendChild(x); document.body.appendChild(lb);
      x.addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (ev) { if (ev.target === lb) lb.close(); });
    }
    if (typeof lb.showModal !== 'function') return;
    e.preventDefault();
    var img = $('img', lb); img.src = a.href; img.alt = a.getAttribute('data-cap') || '';
    $('figcaption', lb).textContent = a.getAttribute('data-cap') || '';
    lb.showModal();
  });

  /* ---------- chop etish ---------- */
  $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  /* ---------- xarita: 7 yoy ketma-ket chiziladi, nuqta har yoy bo'ylab yuradi ---------- */
  function initMap() {
    var map = $('#map'); if (!map) return;
    var routes = ORDER.map(function (k) { return $('.m-route[data-c="' + k + '"]', map); });
    var mover = $('#mover'), nameEl = $('#routeName'), steps = $$('#routeSteps i');
    // himoya: biror yo'l yoki element topilmasa xarita qotgan holda qoladi, skriptning qolgani ishlayveradi
    if (routes.some(function (r) { return !r || !r.getTotalLength; }) || !mover || !nameEl) return;
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
      routes.forEach(function (r) { r.style.strokeDasharray = 'none'; r.style.transition = ''; });
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }
    function draw() {
      if (drawn || reduce) return; drawn = true;
      routes.forEach(function (r, i) { r.style.strokeDasharray = lens[i] + ' ' + lens[i]; r.style.strokeDashoffset = lens[i]; });
      var stepAt = function (i) { steps.forEach(function (s, j) { s.classList.toggle('on', j <= i); }); };
      routes.forEach(function (r, i) {
        r.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1) ' + (0.25 + i * 0.26) + 's, opacity .6s';
        requestAnimationFrame(function () { requestAnimationFrame(function () { r.style.strokeDashoffset = '0'; }); });
        setTimeout(function () { stepAt(i); }, (0.25 + i * 0.26) * 1000);
      });
      setTimeout(run, 3600);
    }
    function pause() { map.classList.add('is-paused'); if (raf) { cancelAnimationFrame(raf); raf = 0; paused = performance.now(); } }
    function resume() { if (document.hidden) return; map.classList.remove('is-paused'); if (running && !raf && !reduce) { if (paused && t0) t0 += performance.now() - paused; raf = requestAnimationFrame(frame); } }
    mapCtl = {
      filter: '',
      mark: function (c) {
        this.filter = c || '';
        $$('.map__lab', map).forEach(function (b) { var on = b.getAttribute('data-c') === c; b.classList.toggle('on', on); if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
        hiMark();
      },
      onReduce: function () { if (reduce) staticState(); else { if (!drawn) draw(); else run(); } }
    };
    if (reduce) staticState(); else nameEl.textContent = routeTxt(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        map.classList.toggle('is-off', !visible);
        if (visible) { draw(); resume(); } else pause();
      }, { threshold: 0.15 }).observe(map);
    } else draw();
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else if (visible) resume(); });
    map.addEventListener('click', function (e) {
      var b = e.target.closest('.map__lab'); if (!b || !elCards) return;
      e.preventDefault();
      F.country = b.getAttribute('data-c'); F.region = ''; F.more = false;
      if (!db.products.some(function (p) { return R.match(F, p); })) { F.type = ''; F.stock = false; if (elStock) elStock.checked = false; }
      renderCatalog();
      var cat = $('#katalog');
      $$('.rv', cat).forEach(function (el) { el.classList.add('is-in'); });
      cat.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------- yuqori panel va pastki panel ---------- */
  var top = $('#top'), bar = $('#bar'), hero = $('#hero') || $('.phead'), con = $('.con');
  function onScroll() { if (top) top.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); afterPaint(onScroll);
  if (bar) {
    var conIn = false;
    var upd = function () { bar.classList.toggle('is-on', window.scrollY > (hero ? hero.offsetHeight * 0.7 : 300) && !conIn); };
    if (con && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { conIn = en[0].isIntersecting; upd(); }, { threshold: 0.2 }).observe(con);
    window.addEventListener('scroll', upd, { passive: true }); afterPaint(upd);
  }

  /* ---------- panel o'zgartirgan bo'limlarni qayta chizish ---------- */
  var DYN = { stats: function () { return R.stats(); }, certs: function () { return R.certs(); }, gallery: function () { return R.gallery(); }, faq: function () { return R.faq(); }, terms: function () { return R.terms(); },
    tiles: function (el) { return R.tiles(el.getAttribute('data-skip') || ''); },
    spec: function (el) { var tp = R.type(el.getAttribute('data-type')); return tp ? R.spec(tp) : null; },
    orig: function (el) { var tp = R.type(el.getAttribute('data-type')); return tp ? R.origins(tp) : null; },
    termOne: function () { return R.termOne(); } };
  function renderDynamic() {
    $$('[data-dyn]').forEach(function (el) {
      var f = DYN[el.getAttribute('data-dyn')]; if (!f) return;
      var h = f(el); if (h == null) return;
      el.innerHTML = h;
      var w = el.closest('[data-dynwrap]'); if (w) w.hidden = !h;
    });
    var ph = $('[data-dyn-photo]');
    if (ph) { var g = R.photo(), im = $('img', ph); ph.hidden = !g; if (g && im && !/^img\//.test(g.src)) { im.removeAttribute('srcset'); im.src = R.asset(g.src); im.alt = g.t; } }
  }
  function renderAll() {
    applySettings(document.body, pageType ? typeMsg() : t('msg.hello'));
    renderCatalog(); renderDynamic();
    if (dlgCtx) setDlg(dlgCtx);
  }
  if (ALF.panel) window.addEventListener('storage', function (e) {
    if (e.key === ALF.KEYS.db || e.key === ALF.KEYS.set || e.key === null) { reload(); renderAll(); observe(); }
  });

  /* ---------- ochilish animatsiyasi: bir xil uslub, faqat ekrandan pastdagi bloklar ---------- */
  var io = null;
  function observe() {
    if (reduce || !('IntersectionObserver' in window)) return;
    // o'lcham o'qilmaydi: kuzatuvchining birinchi xabari har blok qayerdaligini aytadi.
    // Ekrandan pastdagilar yashiriladi (.rv) va ko'ringanda ochiladi; ekrandagilarga tegilmaydi.
    if (!io) io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        var el = x.target;
        if (x.isIntersecting) { if (el.classList.contains('rv')) el.classList.add('is-in'); io.unobserve(el); return; }
        if (el.classList.contains('rv')) return;
        if (x.boundingClientRect.top < (x.rootBounds ? x.rootBounds.height : window.innerHeight)) { io.unobserve(el); return; }   // ekrandan yuqorida qolgan — animatsiyasiz
        var sib = el.parentNode ? Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-r'); }) : [];
        var i = sib.indexOf(el); if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.07 + 's');
        el.classList.add('rv');
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-r]:not(.rv):not([data-rv])').forEach(function (el) {
      el.setAttribute('data-rv', '');
      io.observe(el);
      el.addEventListener('focusin', function () { el.classList.add('is-in'); });
    });
  }
  function unobserve() { $$('.rv').forEach(function (el) { el.classList.add('is-in'); }); }
  // himoya: nima bo'lganda ham ekrandagi kontent ko'rinadi
  function safety() { $$('.rv:not(.is-in)').forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight * 0.8) el.classList.add('is-in'); }); }
  window.addEventListener('scroll', function () { clearTimeout(safety.t); safety.t = setTimeout(safety, 900); }, { passive: true });
  window.addEventListener('beforeprint', unobserve);
  var cold = $$('.cold');
  if (cold.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (en) { en.forEach(function (x) { x.target.classList.toggle('is-run', x.isIntersecting && !document.hidden); }); }, { threshold: 0.2 });
    cold.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- boshlash ---------- */
  afterPaint(function () { try { initMap(); } catch (e) { mapCtl = null; } if (mapCtl) mapCtl.mark(F.country); });
  var hasQ = false;
  if (elCards && sp) {
    if (R.country(sp.get('c'))) { F.country = sp.get('c'); hasQ = true; if (sp.get('r')) F.region = sp.get('r'); }
    if (PAGE === 'catalog') { if (R.type(sp.get('t'))) { F.type = sp.get('t'); hasQ = true; } if (sp.get('stock') === '1') { F.stock = true; elStock.checked = true; hasQ = true; } }
  }
  if (ALF.hasOverride()) renderAll();
  else { if (hasQ) renderCatalog(); else if (mapCtl) mapCtl.mark(''); if (elStock && elStock.checked && !F.stock) setFilter('stock', true); }
  observe();

  if (mqReduce) {
    var onRM = function () { reduce = mqReduce.matches; if (mapCtl) mapCtl.onReduce(); if (reduce) unobserve(); else observe(); };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onRM); else if (mqReduce.addListener) mqReduce.addListener(onRM);
  }
})();
