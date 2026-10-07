/* ALFIRDAVS TM — boshqaruv paneli (namuna) r7: PIN, mahsulotlar, hududlar, aloqa.
   Ma'lumot faqat ALF.loadProducts/saveProducts va ALF.loadSettings/saveSettings orqali (data.js).
   Har o'zgarish: eng so'nggi saqlangan holat olinadi -> o'zgartiriladi -> saqlanadi; saqlanmasa hech narsa o'zgarmaydi. */
(function () {
  'use strict';
  var ALF = window.ALF;
  var PIN = '1111'; // namuna
  var IMG_MAX = 200 * 1024; // siqilgan surat chegarasi (~200 KB)
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { return null; } }

  var db = ALF.loadProducts();
  var S = ALF.loadSettings();
  var fCountry = '';
  function L(o) { return o ? (o.uzc || o.ru || o.en || '') : ''; }
  function country(d, id) { return d.countries.filter(function (c) { return c.id === id; })[0] || null; }
  function region(c, id) { return c ? c.regions.filter(function (r) { return r.id === id; })[0] || null : null; }
  function type(id) { return db.types.filter(function (t) { return t.id === id; })[0] || null; }
  function prod(d, id) { return d.products.filter(function (p) { return p.id === id; })[0] || null; }
  function pName(p) { return (p.name && p.name.uzc) || L((type(p.type) || {}).name); }
  function uid(pre) { return pre + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function norm(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }

  var toastT = 0;
  function toast(msg, bad) { var t = $('#toast'); t.textContent = msg; t.classList.toggle('is-bad', !!bad); t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, bad ? 4200 : 2200); }
  function errMsg() {
    return ALF.lastError() === 'quota'
      ? 'Сақланмади: қурилма хотираси тўлган. Суратни олиб ташланг ёки кичикроғини юкланг.'
      : 'Сақланмади: браузер хотирага ёзишни тақиқлаган (махфий режим ёки сайт маълумотлари ўчирилган).';
  }
  /* o'zgarish: eng yangi holat ustida (ikki varaq bir-birini o'chirmaydi), saqlanmasa — orqaga qaytariladi */
  function commit(fn, okMsg) {
    var fresh = ALF.loadProducts();
    var r = fn(fresh);
    if (r === false) return false;
    if (ALF.saveProducts(fresh)) { db = fresh; if (okMsg) toast(okMsg); renderData(); return true; }
    toast(errMsg(), true);
    db = ALF.loadProducts(); renderData();
    return false;
  }

  /* ---------- PIN ---------- */
  function enter() {
    $('#pinView').hidden = true; $('#app').hidden = false;
    if (!ALF.storageOk()) { var n = $('#note'); n.classList.add('note--bad'); n.innerHTML = '<b>Диққат:</b> бу браузерда хотирага ёзиш тақиқланган — ўзгаришлар сақланмайди. Оддий (махфий бўлмаган) ойнада очинг.'; }
    renderData(); renderContact();
  }
  $('#pinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#pinIn').value.trim();
    if (v === PIN) { ss('alf_pin', '1'); $('#pinErr').textContent = ''; enter(); }
    else { $('#pinErr').textContent = 'PIN нотўғри'; $('#pinIn').value = ''; $('#pinIn').focus(); }
  });
  $('#logout').addEventListener('click', function () { ss('alf_pin', null); location.reload(); });

  /* ---------- tablar ---------- */
  $$('.tabs [role="tab"]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.tabs [role="tab"]').forEach(function (x) { var on = x === b; x.setAttribute('aria-selected', String(on)); $('#' + x.getAttribute('aria-controls')).hidden = !on; });
    });
  });

  /* ---------- mahsulotlar ro'yxati ---------- */
  var ST = [['in', 'Бор'], ['way', 'Йўлда'], ['out', 'Тугаган']];
  function thumb(p) {
    var tp = type(p.type) || {};
    if (p.img) return '<img src="' + esc(p.img) + '" alt="">';
    if (tp.img) return '<img src="' + tp.img + '-480.webp" alt="">';
    return '<svg class="ic" aria-hidden="true"><use href="#i-box"/></svg>';
  }
  function visible() { return db.products.filter(function (p) { return !fCountry || p.country === fCountry; }); }
  function renderFilter() {
    var h = '<button type="button" class="chip" data-c="" aria-pressed="' + (!fCountry) + '"><span>Ҳаммаси</span><small class="num">' + db.products.length + '</small></button>';
    db.countries.forEach(function (c) {
      var n = db.products.filter(function (p) { return p.country === c.id; }).length;
      h += '<button type="button" class="chip" data-c="' + c.id + '" aria-pressed="' + (fCountry === c.id) + '"><i>' + esc(c.code) + '</i><span>' + esc(L(c.name)) + '</span><small class="num">' + n + '</small></button>';
    });
    $('#pFilter').innerHTML = h;
  }
  function renderList() {
    var list = visible();
    $('#pCount').textContent = db.products.length;
    $('#pList').innerHTML = list.map(function (p, vi) {
      var c = country(db, p.country), r = region(c, p.region);
      return '<li class="pitem" data-id="' + esc(p.id) + '">' +
        '<span class="pitem__img">' + thumb(p) + '</span>' +
        '<span class="pitem__t"><b title="' + esc(pName(p)) + '">' + esc(pName(p)) + '</b><small><svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg><span class="pitem__o">' + esc(c ? L(c.name) : '—') + (r ? ' · ' + esc(L(r.name)) : '') + '</span></small></span>' +
        '<span class="pitem__ord"><button type="button" class="iconbtn" data-act="up" aria-label="Юқорига: ' + esc(pName(p)) + '"' + (vi === 0 ? ' disabled' : '') + '><svg class="ic" aria-hidden="true"><use href="#i-up"/></svg></button>' +
        '<button type="button" class="iconbtn" data-act="down" aria-label="Пастга: ' + esc(pName(p)) + '"' + (vi === list.length - 1 ? ' disabled' : '') + '><svg class="ic" aria-hidden="true"><use href="#i-down"/></svg></button></span>' +
        '<span class="pitem__row"><span class="seg" role="group" aria-label="Ҳолати">' + ST.map(function (s) {
          return '<button type="button" class="s-' + s[0] + '" data-st="' + s[0] + '" aria-pressed="' + (p.status === s[0]) + '">' + s[1] + '</button>';
        }).join('') + '</span><button type="button" class="btn btn--line" data-act="edit"><svg class="ic" aria-hidden="true"><use href="#i-edit"/></svg><span>Таҳрир</span></button></span>' +
        '</li>';
    }).join('');
  }
  $('#pFilter').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    fCountry = b.getAttribute('data-c'); renderFilter(); renderList();
  });
  $('#pList').addEventListener('click', function (e) {
    var li = e.target.closest('.pitem'); if (!li) return;
    var id = li.getAttribute('data-id'), p = prod(db, id); if (!p) return;
    var st = e.target.closest('[data-st]');
    if (st) {
      var v = st.getAttribute('data-st');
      commit(function (d) { var x = prod(d, id); if (!x) return false; x.status = v; }, 'Ҳолат сақланди: ' + pName(p));
      var nb = $('.pitem[data-id="' + id + '"] [data-st="' + v + '"]'); if (nb) nb.focus();
      return;
    }
    var act = e.target.closest('[data-act]'); if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'edit') { openSheet(p); return; }
    // tartib: ko'rinib turgan ro'yxat ichida qo'shni bilan almashadi (A3)
    var vis = visible(), vi = vis.indexOf(p), nbP = vis[a === 'up' ? vi - 1 : vi + 1];
    if (!nbP) return;
    commit(function (d) {
      var i = d.products.indexOf(prod(d, id)), j = d.products.indexOf(prod(d, nbP.id));
      if (i < 0 || j < 0) return false;
      var t = d.products[i]; d.products[i] = d.products[j]; d.products[j] = t;
    }, 'Тартиб ўзгарди');
    var fb = $('.pitem[data-id="' + id + '"] [data-act="' + a + '"]');
    if (fb && !fb.disabled) fb.focus(); else { fb = $('.pitem[data-id="' + id + '"] [data-act="' + (a === 'up' ? 'down' : 'up') + '"]'); if (fb) fb.focus(); }
  });
  $('#pAdd').addEventListener('click', function () { openSheet(null); });

  /* ---------- tahrirlash oynasi ---------- */
  var sheet = $('#sheet'), curId = null, isNew = false, curImg = '', nameTouched = false, delArmed = false, pendingReg = null;
  function fillTypes() { $('#fType').innerHTML = db.types.map(function (t) { return '<option value="' + t.id + '">' + esc(L(t.name)) + '</option>'; }).join(''); }
  function fillCountries(sel) { sel.innerHTML = db.countries.map(function (c) { return '<option value="' + c.id + '">' + esc(L(c.name)) + ' (' + c.code + ')</option>'; }).join(''); }
  function fillRegions(cid, val) {
    var c = country(db, cid), regs = c ? c.regions.slice() : [];
    if (pendingReg && pendingReg.country === cid) regs.push(pendingReg.r);
    $('#fRegion').innerHTML = regs.map(function (r) { return '<option value="' + esc(r.id) + '">' + esc(L(r.name)) + (pendingReg && r === pendingReg.r ? ' (янги)' : '') + '</option>'; }).join('');
    if (val) $('#fRegion').value = val;
  }
  function setNamesFromType() {
    var t = type($('#fType').value); if (!t) return;
    $('#fNameUzc').value = t.name.uzc; $('#fNameRu').value = t.name.ru; $('#fNameEn').value = t.name.en;
  }
  function showImg() {
    var prev = $('#fImgPrev'), tp = type($('#fType').value) || {};
    var src = curImg || (tp.img ? tp.img + '-800.webp' : '');
    if (src) { prev.innerHTML = '<img src="' + esc(src) + '" alt="">'; prev.classList.add('has'); }
    else { prev.innerHTML = '<span>Сурат йўқ — сайтда намунавий картон қути кўринади</span>'; prev.classList.remove('has'); }
    $('#fImgDel').hidden = !curImg;
  }
  function openSheet(p) {
    isNew = !p; curId = p ? p.id : uid('p'); delArmed = false; nameTouched = !!(p && p.name); pendingReg = null;
    var pd = $('#pDel'); pd.classList.remove('is-confirm'); $('span', pd).textContent = 'Ўчириш'; pd.hidden = !p;
    $('#sheet-h').textContent = p ? 'Маҳсулотни таҳрирлаш' : 'Янги маҳсулот';
    fillTypes(); fillCountries($('#fCountry'));
    $('#fType').value = p ? p.type : 'mmo';
    $('#fCountry').value = p ? p.country : (fCountry || 'tr');
    fillRegions($('#fCountry').value, p ? p.region : '');
    if (p) {
      var t = type(p.type) || { name: {} }, n = p.name || {};
      $('#fNameUzc').value = n.uzc || t.name.uzc || ''; $('#fNameRu').value = n.ru || ''; $('#fNameEn').value = n.en || '';
      if (!p.name) { $('#fNameRu').value = t.name.ru || ''; $('#fNameEn').value = t.name.en || ''; }
    } else setNamesFromType();
    var st = p ? p.status : 'in';
    $$('#fStatus input').forEach(function (r) { r.checked = r.value === st; });
    $('#fKg').value = p ? (p.kg || 20) : 20;
    curImg = p ? (p.img || '') : '';
    var al = (p && p.alt) || {}; $('#fAltUzc').value = al.uzc || ''; $('#fAltRu').value = al.ru || ''; $('#fAltEn').value = al.en || '';
    $('#fImgInfo').textContent = ''; $('#fErr').textContent = '';
    $('#newReg').hidden = true;
    showImg();
    sheet.showModal();
    try { $('#sheetX').focus({ preventScroll: true }); } catch (e) {}
    $('.sheet__body').scrollTop = 0;
  }
  sheet.addEventListener('close', function () { pendingReg = null; }); // saqlanmagan yangi hudud tashlanadi (A11)
  $('#sheetX').addEventListener('click', function () { sheet.close(); });
  $('#fType').addEventListener('change', function () { if (!nameTouched) setNamesFromType(); showImg(); });
  ['#fNameUzc', '#fNameRu', '#fNameEn'].forEach(function (s) { $(s).addEventListener('input', function () { nameTouched = true; }); });
  $('#fCountry').addEventListener('change', function () { fillRegions($('#fCountry').value); });
  $('#nrOpen').addEventListener('click', function () { $('#newReg').hidden = false; $('#nrName').value = ''; $('#nrName').focus(); });
  $('#nrNo').addEventListener('click', function () { $('#newReg').hidden = true; });
  function regionExists(c, name) {
    var n = norm(name);
    return c.regions.some(function (r) { return norm(r.name.uzc) === n || norm(r.name.ru) === n || norm(r.name.en) === n; });
  }
  $('#nrOk').addEventListener('click', function () {
    var name = $('#nrName').value.trim(); if (!name) { $('#nrName').focus(); return; }
    var c = country(db, $('#fCountry').value); if (!c) return;
    if (regionExists(c, name) || (pendingReg && pendingReg.country === c.id && norm(L(pendingReg.r.name)) === norm(name))) { $('#fErr').textContent = 'Бу ҳудуд аллақачон бор: ' + name; $('#nrName').focus(); return; }
    // hudud mahsulot saqlanganda birga yoziladi; oyna yopilsa — qo'shilmaydi
    pendingReg = { country: c.id, r: { id: uid('r'), name: { uzc: name, ru: name, en: name } } };
    fillRegions(c.id, pendingReg.r.id); $('#newReg').hidden = true; $('#fErr').textContent = '';
  });
  /* rasm: brauzerda siqiladi; ~200 KB dan oshsa sifat va o'lcham kamaytiriladi (A16) */
  function compress(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var max = 1000, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h));
        var cv = document.createElement('canvas'), q = 0.78, d = '', tries = 0;
        var webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        do {
          cv.width = Math.max(1, Math.round(w * k)); cv.height = Math.max(1, Math.round(h * k));
          var g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.drawImage(img, 0, 0, cv.width, cv.height);
          d = cv.toDataURL(webp ? 'image/webp' : 'image/jpeg', q);
          if (d.length * 0.75 <= IMG_MAX) break;
          if (q > 0.5) q -= 0.12; else k *= 0.8;
        } while (++tries < 12);
        res({ data: d, w: cv.width, h: cv.height });
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('img')); };
      img.src = url;
    });
  }
  $('#fImg').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    $('#fImgInfo').textContent = 'Сурат тайёрланмоқда…';
    compress(f).then(function (r) {
      curImg = r.data; showImg();
      $('#fImgInfo').textContent = 'Сиқилди: ' + r.w + '×' + r.h + ', ~' + Math.round(r.data.length * 0.75 / 1024) + ' КБ';
    }).catch(function () { $('#fImgInfo').textContent = 'Бу файлни очиб бўлмади'; });
    e.target.value = '';
  });
  $('#fImgDel').addEventListener('click', function () { curImg = ''; $('#fImgInfo').textContent = ''; showImg(); });
  $('#pForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var uzc = $('#fNameUzc').value.trim();
    if (!uzc) { $('#fErr').textContent = 'Номини ёзинг (ЎЗ)'; $('#fNameUzc').focus(); return; }
    if (!$('#fRegion').value) { $('#fErr').textContent = 'Ҳудудни танланг ёки янгисини қўшинг'; $('#fRegion').focus(); return; }
    var kgRaw = $('#fKg').value.trim();
    if (!/^\d{1,4}$/.test(kgRaw) || +kgRaw < 1 || +kgRaw > 1000) { $('#fErr').textContent = 'Қути оғирлиги 1 дан 1000 кг гача бутун сон бўлсин'; $('#fKg').focus(); return; }
    var st = ($('#fStatus input:checked') || {}).value || 'in';
    var tp = $('#fType').value, t = type(tp) || { name: {} };
    // RU/EN bo'sh bo'lsa saytda turning shu tildagi nomi chiqadi (A18)
    var nm = { uzc: uzc, ru: $('#fNameRu').value.trim(), en: $('#fNameEn').value.trim() };
    var same = nm.uzc === t.name.uzc && (!nm.ru || nm.ru === t.name.ru) && (!nm.en || nm.en === t.name.en);
    var cid = $('#fCountry').value, rid = $('#fRegion').value, pr = pendingReg, id = curId, neu = isNew, img = curImg;
    var alt = { uzc: $('#fAltUzc').value.trim(), ru: $('#fAltRu').value.trim(), en: $('#fAltEn').value.trim() };
    if (!alt.uzc && !alt.ru && !alt.en) alt = null;
    var ok = commit(function (d) {
      if (pr && pr.country === cid && rid === pr.r.id) {
        var c = country(d, cid); if (!c) return false;
        if (!region(c, pr.r.id)) c.regions.push(pr.r);
      }
      var o = prod(d, id);
      if (!o) { if (!neu) { toast('Бу маҳсулот бошқа ойнада ўчирилган', true); return false; } o = { id: id }; d.products.unshift(o); }
      o.type = tp; o.name = same ? null : nm; o.country = cid; o.region = rid; o.status = st; o.kg = +kgRaw; o.img = img; o.alt = alt;
    }, neu ? 'Маҳсулот қўшилди' : 'Сақланди');
    if (ok) { pendingReg = null; isNew = false; sheet.close(); renderRegions(); }
  });
  $('#pDel').addEventListener('click', function () {
    var b = $('#pDel');
    if (!delArmed) { delArmed = true; b.classList.add('is-confirm'); $('span', b).textContent = 'Тасдиқлаш'; return; }
    var id = curId;
    if (commit(function (d) { d.products = d.products.filter(function (x) { return x.id !== id; }); }, 'Ўчирилди')) sheet.close();
  });

  /* ---------- hududlar ---------- */
  function renderRegions() {
    var keep = $('#rCountry').value;
    fillCountries($('#rCountry')); if (keep) $('#rCountry').value = keep;
    $('#rList').innerHTML = db.countries.map(function (c) {
      return '<div class="rgroup"><h3><i>' + esc(c.code) + '</i>' + esc(L(c.name)) + '</h3><ul>' + c.regions.map(function (r) {
        var n = db.products.filter(function (p) { return p.country === c.id && p.region === r.id; }).length;
        return '<li><span>' + esc(L(r.name)) + '<small>' + (n ? n + ' та маҳсулот' : 'маҳсулот йўқ') + '</small></span>' +
          (n ? '' : '<button type="button" class="iconbtn" data-c="' + c.id + '" data-r="' + esc(r.id) + '" aria-label="Ўчириш: ' + esc(L(r.name)) + '"><svg class="ic" aria-hidden="true"><use href="#i-trash"/></svg></button>') + '</li>';
      }).join('') + '</ul></div>';
    }).join('');
  }
  $('#rForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var uzc = $('#rUzc').value.trim(); if (!uzc) { $('#rUzc').focus(); return; }
    var cid = $('#rCountry').value, c0 = country(db, cid); if (!c0) return;
    var ru = $('#rRu').value.trim() || uzc, en = $('#rEn').value.trim() || uzc;
    if (regionExists(c0, uzc) || regionExists(c0, ru) || regionExists(c0, en)) { toast('Бу ҳудуд ' + L(c0.name) + ' да аллақачон бор', true); $('#rUzc').focus(); return; }
    if (commit(function (d) { var c = country(d, cid); if (!c || regionExists(c, uzc)) return false; c.regions.push({ id: uid('r'), name: { uzc: uzc, ru: ru, en: en } }); }, 'Ҳудуд қўшилди: ' + uzc)) {
      $('#rUzc').value = ''; $('#rRu').value = ''; $('#rEn').value = ''; $('#rCountry').value = cid;
    }
  });
  $('#rList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-r]'); if (!b) return;
    var cid = b.getAttribute('data-c'), rid = b.getAttribute('data-r');
    commit(function (d) {
      var c = country(d, cid); if (!c) return false;
      if (d.products.some(function (p) { return p.country === cid && p.region === rid; })) { toast('Бу ҳудудда маҳсулот бор — аввал уни ўзгартиринг', true); return false; }
      c.regions = c.regions.filter(function (r) { return r.id !== rid; });
    }, 'Ҳудуд ўчирилди');
  });

  /* ---------- aloqa (tekshiruv bilan: A4–A7) ---------- */
  var CL = { cAddrUzc: ['addr', 'uzc'], cAddrRu: ['addr', 'ru'], cAddrEn: ['addr', 'en'], cAddr2Uzc: ['addr2', 'uzc'], cAddr2Ru: ['addr2', 'ru'], cAddr2En: ['addr2', 'en'],
    cHrsUzc: ['hours', 'uzc'], cHrsRu: ['hours', 'ru'], cHrsEn: ['hours', 'en'] };
  var CF = { cPhone: 'phone', cPhone2: 'phone2', cTg: 'tg', cWa: 'wa', cMax: 'max', cIg: 'instagram', cMap: 'mapUrl', cMap2: 'mapUrl2' };
  function renderContact() {
    Object.keys(CF).forEach(function (id) { $('#' + id).value = S[CF[id]] || ''; });
    Object.keys(CL).forEach(function (id) { $('#' + id).value = (S[CL[id][0]] || {})[CL[id][1]] || ''; });
    $$('#cForm .ferr').forEach(function (e) { e.textContent = ''; });
  }
  function fErr(id, msg) { var e = $('#e-' + id); if (e) e.textContent = msg || ''; $('#' + id).setAttribute('aria-invalid', String(!!msg)); return !msg; }
  $('#cForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = {}; Object.keys(CF).forEach(function (id) { v[id] = $('#' + id).value.trim(); });
    var ok = true, out = {};
    var p1 = ALF.normPhone(v.cPhone);
    if (p1.empty) ok = fErr('cPhone', 'Асосий телефон шарт') && ok;
    else if (!p1.ok) ok = fErr('cPhone', 'Рақам нотўғри: +998 XX XXX XX XX') && ok;
    else { fErr('cPhone'); out.phone = p1.text; }
    var p2 = ALF.normPhone(v.cPhone2);
    if (!p2.ok) ok = fErr('cPhone2', 'Рақам нотўғри: +998 XX XXX XX XX') && ok; else { fErr('cPhone2'); out.phone2 = p2.empty ? '' : p2.text; }
    var wa = ALF.normPhone(v.cWa);
    if (!wa.ok) ok = fErr('cWa', 'Рақам нотўғри') && ok; else { fErr('cWa'); out.wa = wa.empty ? '' : wa.d; }
    if (v.cTg) { var tg = ALF.normTg(v.cTg); if (!tg) ok = fErr('cTg', 'Username (@...), t.me ҳавола ёки рақам ёзинг') && ok; else { fErr('cTg'); out.tg = tg.kind === 'phone' ? '+' + tg.id : tg.id; } } else { fErr('cTg'); out.tg = ''; }
    if (v.cMax) { var mx = ALF.normMax(v.cMax); if (!mx) ok = fErr('cMax', 'Рақам ёки https:// билан бошланадиган ҳавола ёзинг') && ok; else { fErr('cMax'); out.max = mx.kind === 'phone' ? '+' + mx.id : mx.href; } } else { fErr('cMax'); out.max = ''; }
    if (v.cIg) { var ig = ALF.normIg(v.cIg); if (!ig) ok = fErr('cIg', 'Instagram username ёки ҳавола ёзинг') && ok; else { fErr('cIg'); out.instagram = ig.text.slice(1); } } else { fErr('cIg'); out.instagram = ''; }
    ['cMap', 'cMap2'].forEach(function (id) {
      if (!v[id]) { fErr(id); out[CF[id]] = ''; return; }
      var u = ALF.safeUrl(v[id]); if (!u) ok = fErr(id, 'Фақат https:// ҳавола') && ok; else { fErr(id); out[CF[id]] = u; }
    });
    if (!ok) { $('#cErr').textContent = 'Хатоларни тузатинг — ҳеч нарса сақланмади.'; var f = $('#cForm [aria-invalid="true"]'); if (f) f.focus(); return; }
    $('#cErr').textContent = '';
    var next = JSON.parse(JSON.stringify(S));
    Object.keys(out).forEach(function (k) { next[k] = out[k]; });
    Object.keys(CL).forEach(function (id) { var k = CL[id]; next[k[0]] = next[k[0]] || {}; next[k[0]][k[1]] = $('#' + id).value.trim(); });
    if (ALF.saveSettings(next)) { S = next; renderContact(); toast('Алоқа маълумотлари сақланди'); } else toast(errMsg(), true);
  });

  /* ---------- boshqa varaq o'zgartirsa (A2) ---------- */
  window.addEventListener('storage', function (e) {
    if (e.key === ALF.KEYS.db || e.key === null) { db = ALF.loadProducts(); renderData(); if (sheet.open && !isNew && !prod(db, curId)) toast('Бу маҳсулот бошқа ойнада ўчирилди', true); }
    if (e.key === ALF.KEYS.set || e.key === null) { S = ALF.loadSettings(); renderContact(); }
  });

  /* ---------- namunaga qaytarish ---------- */
  var resetArmed = false, resetT = 0;
  $('#resetAll').addEventListener('click', function () {
    var b = $('#resetAll');
    if (!resetArmed) { resetArmed = true; b.classList.add('is-confirm'); $('span', b).textContent = 'Ҳаммаси ўчади — тасдиқлаш'; resetT = setTimeout(function () { resetArmed = false; b.classList.remove('is-confirm'); $('span', b).textContent = 'Намунага қайтариш'; }, 5000); return; }
    clearTimeout(resetT);
    db = ALF.resetProducts(); S = ALF.resetSettings(); resetArmed = false;
    b.classList.remove('is-confirm'); $('span', b).textContent = 'Намунага қайтариш';
    renderData(); renderContact(); toast('Намуна маълумотлари тикланди');
  });

  function renderData() { renderFilter(); renderList(); renderRegions(); }
  if (ss('alf_pin') === '1') enter(); else setTimeout(function () { $('#pinIn').focus(); }, 50);
})();
