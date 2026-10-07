/* ALFIRDAVS TM — sayt mantiqi (til, xarita, 3D quti, forma, panel, animatsiya) */
(function () {
  'use strict';
  var D = window.I18N || {};
  var LANGS = ['uz', 'uzc', 'ru'];
  var HTML_LANG = { uz: 'uz-Latn', uzc: 'uz-Cyrl', ru: 'ru' };
  var OG_LOC = { uz: 'uz_UZ', uzc: 'uz_UZ', ru: 'ru_RU' };
  var TG = 'https://t.me/firdavs2310';
  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = !!(mqReduce && mqReduce.matches);
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- til ---------- */
  var lang = 'uz';
  var stageIdx = null, segKey = null, ctxKey = null, lastLead = null;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function t(key) { var s = D[lang] && D[lang][key]; return s != null ? s : (D.uz && D.uz[key]) || ''; }
  function fill(tpl, o) { return tpl.replace(/\{(\w)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }

  function applyLang(l, save) {
    if (LANGS.indexOf(l) < 0) l = 'uz';
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
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    var hello = TG + '?text=' + encodeURIComponent(t('tg.hello'));
    $$('[data-tg]').forEach(function (a) { a.href = hello; });
    var ml = $('#mapLink'); if (ml) ml.href = 'https://yandex.uz/maps/?text=' + encodeURIComponent(t('map.q'));
    if (stageIdx != null) setStage(stageIdx, true);
    renderCtx();
    var ld = $('#ld');
    if (ld) { try { var o = JSON.parse(ld.textContent); o.description = t('ld.desc'); ld.textContent = JSON.stringify(o); } catch (e) {} }
    $$('.err').forEach(function (e) { var k = e.getAttribute('data-k'); if (k) e.textContent = t(k); });
    if (lastLead) renderDone();
    if (save) {
      store('alf_lang', l);
      try {
        var u = new URL(location.href);
        if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
      } catch (e) {}
    }
  }

  /* ---------- xarita ---------- */
  var stageEl = $('#stageName');
  var stepEls = $$('.map__steps i');
  function setStage(i, force) {
    if (!stageEl || (i === stageIdx && !force)) return;
    var first = stageIdx === null;
    stageIdx = i;
    stepEls.forEach(function (s, k) { s.classList.toggle('on', k <= i); });
    if (force || first || reduce) { stageEl.textContent = t('stage.' + i); return; }
    stageEl.style.opacity = '0';
    setTimeout(function () { stageEl.textContent = t('stage.' + i); stageEl.style.opacity = '1'; }, 260);
  }

  var mapCtl = null;
  function initMap() {
    var map = $('#map'); if (!map) return;
    var routes = [$('#routePl'), $('#routeRu')].filter(Boolean);
    var truck = $('#truck');
    if (!routes.length || !truck || !routes[0].getTotalLength) return;
    var lens = routes.map(function (r) { return r.getTotalLength(); });
    var MOVE = 6400, HOLD1 = 1200, HOLD2 = 1400, CYCLE = MOVE + HOLD1 + HOLD2;
    var route = -1, cur = 0, t0 = 0, visible = true, raf = 0, running = false, paused = 0, drawn = false;
    function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    function staticState() {
      if (raf) cancelAnimationFrame(raf); raf = 0; running = false;
      routes.forEach(function (r) { r.style.strokeDasharray = 'none'; r.style.strokeDashoffset = '0'; r.style.opacity = '1'; });
      map.classList.remove('is-live'); setStage(3, true);
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!t0) t0 = now;
      var el = now - t0;
      if (el >= CYCLE) { cur = (cur + 1) % routes.length; t0 = now; el = 0; }
      if (route !== cur) { route = cur; routes.forEach(function (r, i) { r.style.opacity = i === cur ? '1' : '.4'; }); }
      var p = Math.min(1, el / MOVE), pt = routes[cur].getPointAtLength(ease(p) * lens[cur]);
      truck.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
      var hide = el > MOVE + HOLD1 + HOLD2 * 0.6;
      if (truck.__h !== hide) { truck.__h = hide; truck.style.opacity = hide ? '0' : '1'; }
      setStage(el < MOVE ? (p < 0.16 ? 0 : p < 0.5 ? 1 : 2) : (el < MOVE + HOLD1 ? 3 : 4));
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
      if (window.gsap) {
        window.gsap.to(routes, { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut', stagger: 0.5, delay: 0.2, onComplete: run });
      } else {
        routes.forEach(function (r, i) {
          r.style.transition = 'stroke-dashoffset 2s cubic-bezier(.65,0,.35,1) ' + (0.2 + i * 0.5) + 's, opacity .6s';
          requestAnimationFrame(function () { requestAnimationFrame(function () { r.style.strokeDashoffset = '0'; }); });
        });
        setTimeout(run, 2800);
      }
    }
    function pause() { if (raf) { cancelAnimationFrame(raf); raf = 0; paused = performance.now(); } }
    function resume() { if (running && !raf && !reduce) { if (paused && t0) t0 += performance.now() - paused; raf = requestAnimationFrame(frame); } }
    if (reduce) staticState(); else setStage(0, true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible) { draw(); resume(); } else pause();
      }, { threshold: 0.15 }).observe(map);
    } else draw();
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else if (visible) resume(); });
    mapCtl = { onReduce: function () { if (reduce) staticState(); else { if (!drawn) draw(); else run(); } } };
  }

  /* ---------- 3D qutilar: sichqoncha + skroll bilan og'ish ---------- */
  function initBoxes() {
    var boxes = $$('[data-box]'); if (!boxes.length) return;
    var items = boxes.map(function (b, i) {
      return { el: b, rot: b.querySelector('.box3d__rot'), card: b.closest('.prod'), base: i ? -26 : -34, mx: 0, my: 0, rx: -16, ry: i ? -26 : -34, on: false };
    });
    var raf = 0;
    function tick() {
      raf = 0; var vh = window.innerHeight, again = false;
      items.forEach(function (it) {
        if (!it.on) return;
        var r = it.el.getBoundingClientRect();
        var prog = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / (vh / 2)));
        var tx = reduce ? -16 : -16 + prog * 6 + it.my * -10;
        var ty = reduce ? it.base : it.base - prog * 14 + it.mx * 18;
        it.rx += (tx - it.rx) * 0.12; it.ry += (ty - it.ry) * 0.12;
        var fy = reduce ? 0 : Math.sin(performance.now() / 1100 + it.base) * 6; // sekin suzish
        if (!reduce) again = true;
        it.rot.style.transform = 'translateY(' + fy.toFixed(2) + 'px) rotateX(' + it.rx.toFixed(2) + 'deg) rotateY(' + it.ry.toFixed(2) + 'deg)';
      });
      if (again && !document.hidden) req();
    }
    function req() { if (!raf) raf = requestAnimationFrame(tick); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) req(); });
    items.forEach(function (it) {
      if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { it.on = en[0].isIntersecting; if (it.on) req(); }).observe(it.el);
      else it.on = true;
      if (finePointer && it.card) {
        it.card.addEventListener('pointermove', function (e) {
          var r = it.card.getBoundingClientRect();
          it.mx = (e.clientX - r.left) / r.width - 0.5; it.my = (e.clientY - r.top) / r.height - 0.5; req();
        });
        it.card.addEventListener('pointerleave', function () { it.mx = 0; it.my = 0; req(); });
      }
    });
    window.addEventListener('scroll', req, { passive: true });
    req();
  }

  /* ---------- forma ---------- */
  var form = $('#leadForm'), done = $('#formDone');
  var fName = $('#fName'), fPhone = $('#fPhone');
  function digits(v) { return (v || '').replace(/\D/g, ''); }
  function fmtPhone(d) {
    d = d.slice(0, 9);
    var o = d.slice(0, 2);
    if (d.length > 2) o += ' ' + d.slice(2, 5);
    if (d.length > 5) o += ' ' + d.slice(5, 7);
    if (d.length > 7) o += ' ' + d.slice(7, 9);
    return o;
  }
  function phoneDigits() {
    var d = digits(fPhone.value);
    if (d.length > 9 && d.indexOf('998') === 0) d = d.slice(3);
    return d.slice(0, 9);
  }
  function setErr(id, key) {
    var e = $('#' + id); var f = e.closest('.field');
    if (key) { e.setAttribute('data-k', key); e.textContent = t(key); f.classList.add('is-bad'); }
    else { e.removeAttribute('data-k'); e.textContent = ''; f.classList.remove('is-bad'); }
  }
  function radio(name) { var r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; }
  function setRadio(name, v) { var r = form.querySelector('input[name="' + name + '"][value="' + v + '"]'); if (r) r.checked = true; }
  /* kontekst belgisi: har bir tugma formaga nima tanlanganini ko'rsatadi */
  var ctxView = null; // {kind:'book'|'seg'|'prod'|'gen', key}
  function renderCtx() {
    var tag = $('#ctxTag'); if (!tag) return;
    if (!ctxView || ctxView.kind === 'gen') { tag.hidden = true; $('.tags-ctx').classList.remove('has-tag'); return; }
    var v = ctxView, txt;
    if (v.kind === 'book') txt = t('ctx.' + v.key);
    else if (v.kind === 'seg') txt = t('form.chosen') + ' ' + t('seg.' + v.key);
    else if (v.kind === 'prod') txt = t('form.chosen') + ' ' + t(v.key === 'mmo' ? 'prod.mmo.name' : 'prod.skin.name');
    else txt = t('form.chosen') + ' ' + t('ctx.gen');
    $('#ctxName').textContent = txt; tag.hidden = false; $('.tags-ctx').classList.add('has-tag');
  }
  function setSeg(k) { segKey = k || null; }
  function setCtx(k) { ctxKey = k || null; }
  function setView(v) { ctxView = v; renderCtx(); }
  function volLabel(v) { return t(v === '0.5' ? 'vol.05' : 'vol.' + v); }
  function renderDone() {
    var L = lastLead;
    var pName = L.product ? t(L.product === 'mmo' ? 'prod.mmo.name' : 'prod.skin.name') : t('ctx.gen');
    var vName = L.vol ? volLabel(L.vol) : '';
    $('#doneSum').textContent = [pName, vName, L.seg ? t('seg.' + L.seg) : ''].filter(Boolean).join(' · ');
    var msg = fill(t('tg.order'), {
      p: vName ? pName + ', ' + vName : pName,
      c: L.ctx ? ' ' + t('ctx.' + L.ctx) + '.' : '',
      s: L.seg ? fill(t('tg.seg'), { s: t('seg.' + L.seg) }) : '',
      n: L.name, t: '+998 ' + fmtPhone(L.phone)
    });
    $('#doneTg').href = TG + '?text=' + encodeURIComponent(msg);
  }
  function showForm() { lastLead = null; done.hidden = true; form.hidden = false; }

  if (form) {
    fPhone.addEventListener('input', function () {
      var d = phoneDigits(); fPhone.value = fmtPhone(d);
      if (d.length === 9) setErr('ePhone');
    });
    fName.addEventListener('input', function () { if (fName.value.trim().length >= 2) setErr('eName'); });
    $('#ctxClear').addEventListener('click', function () { setSeg(null); setCtx(null); setView(null); fName.focus(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = fName.value.trim(), ph = phoneDigits(), pr = radio('product'), vol = radio('vol'), bad = [];
      if (name.length < 2) { setErr('eName', 'err.name'); bad.push(fName); } else setErr('eName');
      if (ph.length !== 9) { setErr('ePhone', 'err.phone'); bad.push(fPhone); } else setErr('ePhone');
      fName.setAttribute('aria-invalid', String(name.length < 2));
      fPhone.setAttribute('aria-invalid', String(ph.length !== 9));
      if (bad.length) { bad[0].focus(); return; }
      lastLead = { name: name, phone: ph, product: pr, vol: vol, seg: segKey, ctx: ctxKey };
      renderDone();
      form.hidden = true; done.hidden = false; done.focus();
    });
    $('#doneNew').addEventListener('click', function () {
      showForm(); form.reset(); setSeg(null); setCtx(null); setView(null); fName.focus();
    });
  }

  /* ---------- "Narxni bilish" / "Band qilish" -> forma ---------- */
  $$('[data-cta]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!form) return;
      e.preventDefault();
      if (!done.hidden) showForm();
      var p = a.getAttribute('data-product'), v = a.getAttribute('data-vol'), s = a.getAttribute('data-seg'), c = a.getAttribute('data-ctx');
      if (p) setRadio('product', p);
      if (v) setRadio('vol', v);
      setSeg(s); setCtx(c);
      setView(c ? { kind: 'book', key: c } : s ? { kind: 'seg', key: s } : p ? { kind: 'prod', key: p } : { kind: 'gen' });
      // forma hali skroll-animatsiyasida yashirin bo'lsa — darhol ko'rsatamiz (aks holda fokus tushmaydi)
      var hid = $$('#ariza [data-r]');
      if (window.gsap) window.gsap.set(hid, { autoAlpha: 1, y: 0, overwrite: true });
      $('#ariza').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () { try { fName.focus({ preventScroll: true }); } catch (x) { fName.focus(); } }, reduce ? 0 : 250);
    });
  });

  /* ---------- til tugmalari ---------- */
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); });
  });

  /* ---------- yuqori panel va pastki panel ---------- */
  var top = $('#top'), bar = $('#bar'), hero = $('#hero'), order = $('#ariza');
  function onScroll() { top.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (bar) {
    var orderIn = false;
    var upd = function () { bar.classList.toggle('is-on', window.scrollY > hero.offsetHeight * 0.6 && !orderIn); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { orderIn = en[0].isIntersecting; upd(); }, { threshold: 0.12 }).observe(order);
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- boshlash ---------- */
  var q = null; try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  var start = LANGS.indexOf(q) >= 0 ? q : store('alf_lang');
  applyLang(LANGS.indexOf(start) >= 0 ? start : 'uz', LANGS.indexOf(q) >= 0);
  initMap();
  if ('IntersectionObserver' in window) $$('.marquee, #map').forEach(function (el) {
    new IntersectionObserver(function (en) { el.classList.toggle('is-off', !en[0].isIntersecting); }).observe(el);
  });
  initBoxes();

  /* ---------- skroll animatsiyalari (GSAP bo'lsa) ---------- */
  var gsapCtx = null;
  function initScrollFx() {
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    var g = window.gsap, ST = window.ScrollTrigger; g.registerPlugin(ST);
    gsapCtx = g.context(function () {
      var els = $$('[data-r]').filter(function (el) { return !el.closest('.hero') && el.getBoundingClientRect().top > window.innerHeight; });
      g.set(els, { autoAlpha: 0, y: 40 });
      ST.batch(els, {
        start: 'top 88%', once: true,
        onEnter: function (b) { g.to(b, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true, clearProps: 'transform' }); }
      });
      var wb = $('.why__photo img');
      if (wb) g.fromTo(wb, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.why__photo', start: 'top bottom', end: 'bottom top', scrub: true } });
      $$('.tile img').forEach(function (im) {
        g.fromTo(im, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: im.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      var mp = $('#map');
      if (mp) g.to(mp, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
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
  // himoya: skroll-animatsiya ishlamay qolsa, kontent 1,5 s da baribir ko'rinadi
  function safety() {
    $$('[data-r]').forEach(function (el) {
      var cs = getComputedStyle(el);
      if ((cs.visibility === 'hidden' || +cs.opacity === 0) && el.getBoundingClientRect().top < window.innerHeight) { el.style.visibility = 'visible'; el.style.opacity = '1'; el.style.transform = 'none'; }
    });
  }
  setTimeout(safety, 1500);
  window.addEventListener('scroll', function () { clearTimeout(safety.t); safety.t = setTimeout(safety, 1500); }, { passive: true });

  /* reduced-motion sozlamasi o'zgarsa */
  if (mqReduce) {
    var onRM = function () {
      reduce = mqReduce.matches;
      if (mapCtl) mapCtl.onReduce();
      if (reduce && gsapCtx) { gsapCtx.revert(); gsapCtx = null; $$('[data-r]').forEach(function (el) { el.style.opacity = ''; el.style.visibility = ''; el.style.transform = ''; }); }
      else if (!reduce && !gsapCtx) startFx();
    };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onRM); else if (mqReduce.addListener) mqReduce.addListener(onRM);
  }
})();
