/* ALFIRDAVS TM — r11: ma'lumotdan HTML bo'laklarini yasovchi yagona kod.
   Ikki joyda ishlaydi: (1) build11.mjs — tayyor HTML sahifalarga; (2) brauzerda — filtr va panel o'zgarishlarida.
   XAVFSIZLIK: ma'lumotdagi har bir matn esc() orqali, har bir manzil safeUrl/safeImg/safeFile orqali o'tadi. */
(function (G) {
  'use strict';
  var ST_ORDER = { 'in': 0, way: 1, out: 2 };
  var EXT = ' target="_blank" rel="noopener noreferrer"';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fill(tpl, o) { return String(tpl).replace(/\{(\w)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }
  function ic(n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  G.ALFR = function (ctx) {
    var ALF = ctx.ALF, lang = ctx.lang, demo = ctx.mode === 'demo';
    // avail: mahsulot holati («bor/yo'lda/tugagan») ko'rsatiladimi. Tasdiqlanmagan ma'lumot bilan yasalgan prod'da — yo'q.
    var avail = ctx.avail !== false;
    var db = ctx.db, S = ctx.S;
    function t(key) { var s = ctx.D[key]; return s != null ? s : ''; }
    function L(o) { if (!o) return ''; if (typeof o === 'string') return o; return o[lang] || o.uzc || o.ru || o.en || ''; }
    function country(id) { for (var i = 0; i < db.countries.length; i++) if (db.countries[i].id === id) return db.countries[i]; return null; }
    function region(c, id) { if (!c) return null; for (var i = 0; i < c.regions.length; i++) if (c.regions[i].id === id) return c.regions[i]; return null; }
    function type(id) { for (var i = 0; i < db.types.length; i++) if (db.types[i].id === id) return db.types[i]; return null; }
    function product(id) { for (var i = 0; i < db.products.length; i++) if (db.products[i].id === id) return db.products[i]; return null; }
    // nom: shu tildagi nom -> turning shu tildagi nomi -> o'zbekcha nom
    function pName(p) {
      var tn = (type(p.type) || {}).name || {};
      if (p.name && p.name[lang]) return p.name[lang];
      return tn[lang] || (p.name && L(p.name)) || L(tn);
    }
    // ko'plik: kalit.1 / kalit.2 / kalit.5 (ruscha: 1 регион, 2–4 региона, 5+ регионов; 11–14 — 5-shakl)
    function plural(key, n) {
      var a = Math.abs(n) % 100, b = a % 10, f = (a > 10 && a < 20) ? '5' : b === 1 ? '1' : (b >= 2 && b <= 4) ? '2' : '5';
      if (lang === 'en') f = n === 1 ? '1' : '5'; else if (lang !== 'ru') f = '5';
      return fill(t(key + '.' + f), { n: n });
    }
    function url(p) { return ctx.lroot + p; }
    function asset(src) { return /^(data:|https:)/.test(src) ? src : ctx.root + src; }
    function tag() { return demo ? ' <span class="badge badge--s">' + esc(t('badge')) + '</span>' : ''; }
    /*DEMO-START*/
    // r16 — FAQAT namuna build: bepul stok suratlar (img/s/… va eski img/fura-…) kompaniyaning o'z surati emas — ustida «Намуна сурат» belgisi
    function isStock(src) { return demo && /^img\/(s\/|fura-)/.test(src || ''); }
    function smp(on) { return on ? '<span class="smp">' + esc(t('smp.foto')) + '</span>' : ''; }
    function smpTag() { return ' <span class="badge badge--s">' + esc(t('smp.foto')) + '</span>'; }
    // kartada qaysi surat chiqishini imgHtml() bilan bir xil tartibda aniqlaydi: mahsulotning o'z surati -> tur surati -> karton yorliq
    function cardSmp(p) {
      var tp = type(p.type) || {}, src = ALF.safeImg(p.img), m = /^(img\/[\w\/-]+)-800\.webp$/.exec(src || '');
      if (src && (m ? ALF.hasFile(src) : (/^data:/.test(src) || ALF.hasFile(src)))) return smp(isStock(src));
      return smp(!!tp.img && /^img\/[\w\/-]+$/.test(tp.img) && ALF.hasFile(tp.img + '-800.webp') && isStock(tp.img));
    }
    /*DEMO-END*/
    function vis(o) { return demo || !o.sample; }
    function typeUrl(tp) { return tp && tp.slug && ALF.slugs.indexOf(tp.slug) >= 0 ? url('catalog/' + tp.slug + '/') : ''; }
    function stOf(p) { return !avail ? 'ask' : p.status === 'way' ? 'way' : p.status === 'out' ? 'out' : 'in'; }
    function packTxt(kg) { var n = parseInt(kg, 10); return fill(t('card.pack'), { n: n > 0 && n <= 1000 ? n : 20 }); }
    function byStatus(list) {
      if (!avail) return list.slice();
      return list.map(function (p, i) { return { p: p, i: i }; })
        .sort(function (a, b) { return ((ST_ORDER[a.p.status] || 0) - (ST_ORDER[b.p.status] || 0)) || (a.i - b.i); })
        .map(function (x) { return x.p; });
    }

    /* ---------- aloqa ---------- */
    function contacts() {
      var p1 = ALF.normPhone(S.phone), p2 = ALF.normPhone(S.phone2), wa = ALF.normPhone(S.wa);
      return {
        tel: p1.ok && !p1.empty ? p1 : null,
        tel2: p2.ok && !p2.empty ? p2 : null,
        tg: ALF.normTg(S.tg),
        wa: wa.ok && !wa.empty ? wa : (p1.ok && !p1.empty ? p1 : null),
        max: ALF.normMax(S.max),
        ig: ALF.normIg(S.instagram),
        map: ALF.safeUrl(S.mapUrl) || ('https://yandex.uz/maps/?text=' + encodeURIComponent(L(S.addr))),
        map2: ALF.safeUrl(S.mapUrl2) || ('https://yandex.uz/maps/?text=' + encodeURIComponent(L(S.addr2))),
        addr: L(S.addr), addr2: L(S.addr2), hours: (demo || !S.hoursSample) ? L(S.hours) : '',
        email: ALF.safeEmail(S.email), legal: String(S.legal == null ? '' : S.legal).trim().slice(0, 120), inn: ALF.normInn(S.inn)
      };
    }
    function maxTxt(C) { return C.max ? (C.max.kind === 'url' ? C.max.text : C.max.text + ' · ' + t('con.maxhint')) : ''; }
    // 4 ta aloqa tugmasi (data-set — brauzerda panel o'zgarishini qo'yish uchun)
    function cbtns(msg) {
      var C = contacts(), m = msg ? '?text=' + encodeURIComponent(msg) : '';
      var DM = ' data-msg="' + esc(msg || '') + '"';
      function b(cls, href, set, icon, title, txtSet, txt, extra, go, on) {
        return '<a class="cbtn cbtn--' + cls + '" href="' + esc(href) + '" data-set="' + set + '" data-wrap="' + set + '"' + extra + (on ? '' : ' hidden') + '><span class="cbtn__ic">' + ic(icon) + '</span>' +
          '<span class="cbtn__t"><b>' + esc(title) + '</b><small class="num" data-set="' + txtSet + '">' + esc(txt) + '</small></span>' + ic(go, 'cbtn__go') + '</a>';
      }
      var maxUrl = C.max && C.max.kind === 'url';
      return b('phone', C.tel ? 'tel:+' + C.tel.d : '#', 'tel', 'phone', t('con.phone'), 'phoneTxt', C.tel ? C.tel.text : '', '', 'arrow', !!C.tel) +
        b('tg', C.tg ? C.tg.href + m : '#', 'tg', 'send', t('con.tg'), 'tgTxt', C.tg ? C.tg.text : '', EXT + DM, 'arrow', !!C.tg) +
        b('wa', C.wa ? 'https://wa.me/' + C.wa.d + m : '#', 'wa', 'wa', t('con.wa'), 'waTxt', C.wa ? C.wa.text : '', EXT + DM, 'arrow', !!C.wa) +
        b('max', maxUrl ? C.max.href : (C.max ? 'tel:+' + C.max.id : '#'), 'max', 'max', maxUrl || !C.max ? t('con.max') : t('con.maxnum'), 'maxTxt', maxTxt(C), maxUrl ? EXT : (C.max ? ' data-copy="+' + esc(C.max.id) + '"' : ''), maxUrl ? 'arrow' : 'copy', !!C.max);
    }

    /* ---------- katalog ---------- */
    function altTxt(p) {
      if (p.alt && p.alt[lang]) return p.alt[lang];
      var c = country(p.country), r = region(c, p.region);
      return pName(p) + (c ? ' — ' + L(c.name) + (r ? ', ' + L(r.name) : '') : '');
    }
    var SIZES = '(min-width:1200px) 290px, (min-width:900px) 33vw, (min-width:640px) 50vw, 112px';
    // surati yo'q karta: karton yorliq. Guruhga qarab (parranda / mol / submahsulot) tusi va kichik chiziqli belgisi farq qiladi
    function guruh(tp) { return tp && (tp.g === 'm' || tp.g === 's') ? tp.g : 'p'; }
    function label(name, kg, alt, tp) {
      var g = guruh(tp);
      return '<span class="lbl lbl--' + g + '" role="img" aria-label="' + esc(alt) + '"><span class="lbl__top">' + '<svg class="lbl__mark" aria-hidden="true"><use href="#i-logo"/></svg><span>ALFIRDAVS TM</span><i class="lbl__g" title="' + esc(t('lbl.g.' + g)) + '">' + ic('g-' + g) + '</i></span>' +
        '<span class="lbl__name">' + esc(name) + '</span>' +
        '<span class="lbl__row"><span class="lbl__spec"><span>' + ic('snow') + '−18 °C</span><span class="num">' + esc(packTxt(kg)) + '</span></span><span class="lbl__bars"></span></span></span>';
    }
    // srcset faqat saytda haqiqatan bor o'lchamlardan tuziladi (data: suratda srcset yo'q)
    function pic(base, alt, attrs) {
      var big = base + '-800.webp', small = base + '-480.webp';
      if (!ALF.hasFile(big)) return '';
      if (ALF.hasFile(small)) return '<img src="' + esc(asset(small)) + '" srcset="' + esc(asset(small)) + ' 480w, ' + esc(asset(big)) + ' 800w" sizes="' + SIZES + '"' + attrs;
      return '<img src="' + esc(asset(big)) + '"' + attrs;
    }
    function imgHtml(p) {
      var tp = type(p.type) || {}, alt = altTxt(p), src = ALF.safeImg(p.img), attrs = ' alt="' + esc(alt) + '" loading="lazy" decoding="async" width="480" height="360">', h = '';
      if (src) {
        var m = /^(img\/[\w\/-]+)-800\.webp$/.exec(src);
        if (m) h = pic(m[1], alt, attrs);
        else if (/^data:/.test(src) || ALF.hasFile(src)) h = '<img src="' + esc(asset(src)) + '"' + attrs;
        if (h) return h;
      }
      if (tp.img && /^img\/[\w\/-]+$/.test(tp.img)) { h = pic(tp.img, alt, attrs); if (h) return h; }
      return label(pName(p), p.kg, alt, tp);
    }
    function card(p) {
      var c = country(p.country), r = region(c, p.region), tp = type(p.type) || {}, st = stOf(p), tu = typeUrl(tp), nm = esc(pName(p));
      return '<li class="card' + (st === 'out' ? ' is-out' : '') + '" data-id="' + esc(p.id) + '">' +
        '<div class="card__media">' + imgHtml(p) + /*DEMO-START*/cardSmp(p) + /*DEMO-END*/'<span class="card__code">' + esc(c ? c.code : '') + '</span></div>' +
        '<div class="card__body"><div class="card__top"><span class="st st--' + st + ' card__st">' + esc(t('st.' + st)) + '</span><span class="card__sub">' + esc(L(tp.sub)) + '</span></div>' +
        '<h3>' + (tu ? '<a href="' + esc(tu) + '">' + nm + '</a>' : nm) + '</h3>' +
        '<p class="card__origin">' + ic('pin') + '<span>' + esc(c ? L(c.name) : '') + (r ? ' · <b>' + esc(L(r.name)) + '</b>' : '') + '</span></p>' +
        '<p class="card__meta"><span>' + ic('snow') + '<span class="num">−18 °C</span></span><span>' + ic('box') + '<span class="num">' + esc(packTxt(p.kg)) + '</span></span></p>' +
        '<a class="btn btn--line card__btn" href="' + esc(url('contacts/')) + '" data-ask="' + esc(p.id) + '"><span>' + esc(t('cta.price')) + '</span>' + ic('arrow') + '</a>' +
        '</div></li>';
    }
    function chip(attr, val, lab, extra, pressed, disabled) {
      return '<button type="button" class="chip" ' + attr + '="' + esc(val) + '" aria-pressed="' + (pressed ? 'true' : 'false') + '"' + (disabled ? ' disabled' : '') + '>' + (extra && extra.code ? '<i>' + esc(extra.code) + '</i>' : '') +
        '<span>' + esc(lab) + '</span>' + (extra && extra.n != null ? '<small class="num">' + extra.n + '</small>' : '') + '</button>';
    }
    function match(F, p, skip) {
      if (skip !== 'country' && F.country && p.country !== F.country) return false;
      if (skip !== 'country' && skip !== 'region' && F.region && p.region !== F.region) return false;
      if (skip !== 'type' && F.type && p.type !== F.type) return false;
      if (avail && F.stock && p.status !== 'in') return false;
      return true;
    }
    function count(fn) { var n = 0; db.products.forEach(function (p) { if (fn(p)) n++; }); return n; }
    // F: {country, region, type, stock}; limit: 0 = hammasi
    function catalog(F, limit) {
      var o = {};
      var h = chip('data-country', '', t('cat.all'), { n: count(function (p) { return match(F, p, 'country'); }) }, !F.country);
      db.countries.forEach(function (c) {
        var n = count(function (p) { return p.country === c.id && match(F, p, 'country'); });
        h += chip('data-country', c.id, L(c.name), { code: c.code, n: n }, F.country === c.id, n === 0 && F.country !== c.id);
      });
      o.country = h;
      var c = country(F.country);
      o.region = '';
      if (c) {
        var rh = chip('data-region', '', t('cat.all'), null, !F.region);
        c.regions.forEach(function (r) {
          var n = count(function (p) { return p.country === c.id && p.region === r.id && (!F.type || p.type === F.type) && (!avail || !F.stock || p.status === 'in'); });
          rh += chip('data-region', r.id, L(r.name), { n: n }, F.region === r.id, n === 0 && F.region !== r.id);
        });
        o.region = rh;
      }
      var th = chip('data-type', '', t('cat.all'), null, !F.type);
      db.types.forEach(function (tp) {
        if (!count(function (p) { return p.type === tp.id; })) return;
        var n = count(function (p) { return p.type === tp.id && match(F, p, 'type'); });
        th += chip('data-type', tp.id, L(tp.name), { n: n }, F.type === tp.id, n === 0 && F.type !== tp.id);
      });
      o.type = th;
      var list = byStatus(db.products.filter(function (p) { return match(F, p); }));
      var shown = limit ? list.slice(0, limit) : list;
      o.total = list.length; o.rest = list.length - shown.length;
      o.cards = shown.map(card).join('');
      o.countTxt = plural('cat.count', list.length);
      o.moreTxt = o.rest > 0 ? fill(t('cat.more'), { n: o.rest }) : '';
      return o;
    }
    // «yana ko'rsatish»: JS'siz — butun katalogga havola
    function more(o) {
      return o.rest > 0 ? '<a class="btn btn--line" id="moreBtn" href="' + esc(url('catalog/')) + '"><span>' + esc(o.moreTxt) + '</span>' + ic('down') + '</a>' : '';
    }
    function typeStat(tp) {
      var list = db.products.filter(function (p) { return p.type === tp.id; }), seen = {}, regs = 0, inn = 0;
      list.forEach(function (p) { var k = p.country + '/' + p.region; if (!seen[k]) { seen[k] = 1; regs++; } if (p.status === 'in') inn++; });
      return { n: list.length, regs: regs, inn: inn };
    }
    // mahsulot turlari plitkalari (skip — joriy sahifadagi tur)
    function tiles(skip) {
      return db.types.filter(function (tp) { return typeUrl(tp) && tp.id !== skip; }).map(function (tp) {
        var s = typeStat(tp);
        return '<li><a class="tile" href="' + esc(typeUrl(tp)) + '"><span class="tile__sub">' + esc(L(tp.sub)) + '</span><b class="tile__name">' + esc(L(tp.name)) + '</b>' +
          '<span class="tile__meta">' + (!avail ? '' : s.inn ? '<span class="st st--in">' + esc(fill(t('tile.in'), { n: s.inn })) + '</span>' : '<span class="st st--out">' + esc(t('tile.none')) + '</span>') +
          '<span class="num">' + esc(plural('tile.regions', s.regs)) + '</span></span>' + ic('arrow', 'tile__go') + '</a></li>';
      }).join('') + (skip ? '<li><a class="tile tile--all" href="' + esc(url('catalog/')) + '"><span class="tile__sub">' + esc(t('nav.catalog')) + '</span><b class="tile__name">' + esc(t('cat.full')) + '</b>' + ic('arrow', 'tile__go') + '</a></li>' : '');
    }

    /* ---------- mahsulot turi sahifasi ---------- */
    function originTxt(tp) {
      var by = {}, order = [];
      db.products.forEach(function (p) {
        if (p.type !== tp.id) return;
        var c = country(p.country), r = region(c, p.region); if (!c) return;
        if (!by[c.id]) { by[c.id] = { n: L(c.name), r: [] }; order.push(c.id); }
        if (r && by[c.id].r.indexOf(L(r.name)) < 0) by[c.id].r.push(L(r.name));
      });
      return { full: order.map(function (k) { return by[k].n + (by[k].r.length ? ' (' + by[k].r.join(', ') + ')' : ''); }).join('; '), short: order.map(function (k) { return by[k].n; }).join(', ') };
    }
    function packsTxt(tp) {
      var kg = [];
      db.products.forEach(function (p) { if (p.type === tp.id) { var n = parseInt(p.kg, 10) || 20; if (kg.indexOf(n) < 0) kg.push(n); } });
      kg.sort(function (a, b) { return a - b; });
      return kg.map(packTxt).join(', ');
    }
    function spec(tp) {
      var rows = [], o = originTxt(tp), pk = packsTxt(tp);
      function row(k, v, cls, extra) { rows.push('<tr' + (cls ? ' class="' + cls + '"' : '') + '><th scope="row">' + esc(k) + '</th><td>' + esc(v) + (extra || '') + '</td></tr>'); }
      if (L(tp.sub)) row(t('spec.form'), L(tp.sub));
      if (pk) row(t('spec.pack'), pk);
      row(t('spec.temp'), t('spec.tempv'));
      if (o.full) row(t('spec.origin'), o.full);
      row(t('spec.docs'), t('spec.docsv'));
      (tp.spec || []).forEach(function (r) {
        var k = L(r.k), v = L(r.v); if (!k) return;
        if (v && vis(r)) row(k, v, r.sample ? 'is-sample' : '', r.sample ? tag() : '');
        else if (!v && demo) row(k, t('spec.empty'), 'is-sample is-empty', tag());
      });
      return '<table class="spec"><caption class="vh">' + esc(t('spec.h')) + ' — ' + esc(L(tp.name)) + '</caption><tbody>' + rows.join('') + '</tbody></table>';
    }
    function origins(tp) {
      var list = byStatus(db.products.filter(function (p) { return p.type === tp.id; }));
      if (!list.length) return '<li class="orig__none">' + esc(t('orig.none')) + '</li>';
      return list.map(function (p) {
        var c = country(p.country), r = region(c, p.region), st = stOf(p), nm = pName(p), own = nm !== L(tp.name);
        return '<li class="orig__it' + (st === 'out' ? ' is-out' : '') + '" data-id="' + esc(p.id) + '"><span class="orig__code">' + esc(c ? c.code : '') + '</span>' +
          '<span class="orig__t"><b>' + esc(c ? L(c.name) : '') + (r ? ' · ' + esc(L(r.name)) : '') + '</b>' + (own ? '<small>' + esc(nm) + '</small>' : '') + '</span>' +
          '<span class="st st--' + st + '">' + esc(t('st.' + st)) + '</span><span class="orig__pack num">' + esc(packTxt(p.kg)) + '</span>' +
          '<a class="btn btn--line btn--sm orig__btn" href="' + esc(url('contacts/')) + '" data-ask="' + esc(p.id) + '"><span>' + esc(t('cta.price')) + '</span>' + ic('arrow') + '</a></li>';
      }).join('');
    }

    /* ---------- ishonch bo'limlari (bo'sh bo'lsa '' qaytadi — bo'lim yashiriladi) ---------- */
    function stats() {
      var h = '', real = 0;
      (db.stats || []).forEach(function (s) {
        var v = String(L(s.v)).trim(), ph = String(L(s.ph)).trim(), l = L(s.l); if (!l) return;
        if (v && vis(s)) { real++; h += '<li class="num-c' + (s.sample ? ' is-sample' : '') + '"><b class="num">' + esc(v) + '</b><span>' + esc(l) + (s.sample ? tag() : '') + '</span></li>'; }
        else if (!v && demo && ph) h += '<li class="num-c is-sample is-empty"><b class="num">' + esc(ph) + '</b><span>' + esc(l) + tag() + '</span></li>';
      });
      // haqiqiy saytda bo'lim kamida 3 ta tasdiqlangan raqam bo'lganda chiqadi (2 ta raqam — «7 davlat», «2022» — bosh sahifada allaqachon bor)
      return (demo ? h : (real >= 3 ? h : ''));
    }
    function fileLink(f) {
      var u = ALF.safeFile(f); if (!u) return '';
      var ext = /^https:/.test(u);
      return '<a class="cert__dl" href="' + esc(asset(u)) + '"' + (ext ? EXT : ' download') + '>' + ic('down') + '<span>' + esc(t('cert.dl')) + '</span></a>';
    }
    function certs() {
      var h = '';
      (db.certs || []).forEach(function (c) {
        var title = L(c.t), src = ALF.safeImg(c.img), dl = fileLink(c.file); if (!title) return;
        if ((src || dl) && vis(c)) {
          h += '<li class="cert' + (c.sample ? ' is-sample' : '') + '">' +
            (src ? '<a class="cert__open" href="' + esc(asset(src)) + '" data-zoom data-cap="' + esc(title) + '" aria-label="' + esc(t('cert.zoom') + ': ' + title) + '"><img src="' + esc(asset(src)) + '" alt="' + esc(title) + '" loading="lazy" decoding="async" width="600" height="800">' + ic('zoom', 'cert__z') + '</a>'
              : '<span class="cert__ph">' + ic('doc') + '</span>') +
            '<div class="cert__b"><b>' + esc(title) + (c.sample ? tag() : '') + '</b>' + dl + '</div></li>';
        } else if (demo && !src && !dl) {
          h += '<li class="cert is-sample is-empty"><span class="cert__ph">' + ic('doc') + '<small>' + esc(t('cert.ph')) + '</small></span><div class="cert__b"><b>' + esc(title) + tag() + '</b></div></li>';
        }
      });
      return h;
    }
    function gallery() {
      var h = '';
      (db.gallery || []).forEach(function (g) {
        var title = L(g.t), src = ALF.safeImg(g.img);
        if (src && vis(g)) {
          var m = /^(img\/[\w\/-]+)-800\.webp$/.exec(src), big = m && ALF.hasFile(m[1] + '-1600.webp') ? asset(m[1] + '-1600.webp') : asset(src);
          h += '<li class="gal__it' + (g.sample ? ' is-sample' : '') + '"><a class="gal__open" href="' + esc(big) + '" data-zoom data-cap="' + esc(title) + '" aria-label="' + esc(t('cert.zoom') + ': ' + title) + '"><img src="' + esc(asset(src)) + '" alt="' + esc(title) + '" loading="lazy" decoding="async" width="800" height="450"></a>' +
            '<p>' + esc(title) + (g.sample ? /*DEMO-START*/isStock(src) ? smpTag() : /*DEMO-END*/tag() : '') + '</p></li>';
        } else if (demo && !src && title) {
          h += '<li class="gal__it is-sample is-empty"><span class="gal__ph">' + ic('img') + '<small>' + esc(t('gal.ph')) + '</small></span><p>' + esc(title) + tag() + '</p></li>';
        }
      });
      return h;
    }
    // suratli (haqiqiy yoki namuna) birinchi galereya elementi — bosh sahifadagi surat uchun
    function photo() {
      var g = null;
      (db.gallery || []).forEach(function (x) { if (!g && ALF.safeImg(x.img) && vis(x) && L(x.t)) g = x; });
      return g ? { src: ALF.safeImg(g.img), t: L(g.t), sample: !!g.sample } : null;
    }
    function faq() {
      var h = '';
      (db.faq || []).forEach(function (f) {
        var q = L(f.q), a = L(f.a); if (!q || !a || !vis(f)) return;
        h += '<details class="faq__it' + (f.sample ? ' is-sample' : '') + '"><summary><span>' + esc(q) + (f.sample ? tag() : '') + '</span><i aria-hidden="true"></i></summary><div class="faq__a"><p>' + esc(a) + '</p></div></details>';
      });
      return h;
    }
    function faqList() { // JSON-LD uchun (faqat tasdiqlangan savollar)
      return (db.faq || []).filter(function (f) { return !f.sample && L(f.q) && L(f.a); }).map(function (f) { return { q: L(f.q), a: L(f.a) }; });
    }
    function termList() {
      return (db.terms || []).filter(function (x) { return L(x.t) && L(x.d) && vis(x); });
    }
    // 2 va undan ko'p shart — kartalar; aks holda '' (bo'lim yashirin)
    function terms() {
      var list = termList(); if (list.length < 2) return '';
      return list.map(function (x, i) {
        return '<li' + (x.sample ? ' class="is-sample"' : '') + '><span class="terms__n num">' + pad2(i + 1) + '</span><h3>' + esc(L(x.t)) + (x.sample ? tag() : '') + '</h3><p>' + esc(L(x.d)) + '</p></li>';
      }).join('');
    }
    // aynan 1 ta shart — yolg'iz karta emas, oddiy matn qatori
    function termOne() {
      var list = termList(); if (list.length !== 1) return '';
      return '<b>' + esc(L(list[0].t)) + '.</b> ' + esc(L(list[0].d));
    }
    // to'lov haqida ko'rinadigan ma'lumot bormi (sahifa nomi shunga qarab: «Yetkazib berish [va to'lov]»)
    function hasPay() {
      return termList().some(function (x) { return x.pay; }) || (db.faq || []).some(function (f) { return f.pay && L(f.q) && L(f.a) && vis(f); });
    }

    return {
      t: t, L: L, esc: esc, fill: fill, plural: plural, ic: ic, url: url, asset: asset, tag: tag, demo: demo,
      /*DEMO-START*/isStock: isStock, smp: smp, smpTag: smpTag, /*DEMO-END*/
      country: country, region: region, type: type, product: product, pName: pName, typeUrl: typeUrl, typeStat: typeStat,
      contacts: contacts, maxTxt: maxTxt, cbtns: cbtns, match: match,
      label: label, pic: pic, card: card, catalog: catalog, more: more, tiles: tiles, spec: spec, origins: origins, originTxt: originTxt, packsTxt: packsTxt,
      stats: stats, certs: certs, gallery: gallery, photo: photo, faq: faq, faqList: faqList, terms: terms, termOne: termOne, hasPay: hasPay, avail: avail
    };
  };
  G.ALFR.esc = esc;
})(typeof window !== 'undefined' ? window : globalThis);
