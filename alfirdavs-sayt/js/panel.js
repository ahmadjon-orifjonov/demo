/* ALFIRDAVS TM — boshqaruv paneli (SERVERLI): mahsulotlar, hududlar, turlar, sahifa matnlari, aloqa.
   Kirish, til va bo'limlar orasida yurish — qatlam.js da. Ma'lumot ALF.load… va ALF.save… funksiyalari orqali xotiradagi
   qoralamaga yoziladi va «Сайтга чиқариш» bosilganda serverga ketadi; surat brauzerda emas, serverda qayta kodlanadi.
   Ekranga chiqadigan har bir qiymat esc() orqali o'tadi. Matnlar — qatlam.js dagi lug'atdan (t), ikki tilda.
   r15: bosh ekran — faqat mahsulotlar va holati; matn maydonlarida avval bitta til (panel tili), qolganlari «Бошқа тиллар» ostida. */
(function () {
  'use strict';
  var ALF = window.ALF, SRV = window.ALFSRV, TIL = window.ALFTIL, t = TIL.t;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ic(n) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }

  var db = ALF.loadProducts();
  var S = ALF.loadSettings();
  var fCountry = '', tartib = false;
  // nom panel tilida ko'rsatiladi (bo'lmasa — bor tilda)
  function L(o) { return o ? (o[TIL.til()] || o.uzc || o.ru || o.en || '') : ''; }
  function country(d, id) { return d.countries.filter(function (c) { return c.id === id; })[0] || null; }
  function region(c, id) { return c ? c.regions.filter(function (r) { return r.id === id; })[0] || null : null; }
  function type(id) { return db.types.filter(function (x) { return x.id === id; })[0] || null; }
  function prod(d, id) { return d.products.filter(function (p) { return p.id === id; })[0] || null; }
  function pName(p) { var tn = (type(p.type) || {}).name || {}, l = TIL.til(); return (p.name && p.name[l]) || tn[l] || L(p.name) || L(tn); }
  function joyNomi(p) { var c = country(db, p.country), r = region(c, p.region), mk = String(L(p.maker) || '').trim(); return (c ? L(c.name) : '—') + (r ? ' · ' + L(r.name) : '') + (mk ? ' · ' + mk : ''); }
  function uid(pre) { return pre + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function norm(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
  function toast(m, bad) { SRV.toast(m, bad); }
  function tanlang() { return '<option value="">' + esc(t('tanlang')) + '</option>'; }

  /* o'zgarish: eng yangi holat ustida; saqlanmasa — orqaga qaytariladi */
  function commit(fn, okMsg) {
    var fresh = ALF.loadProducts();
    var r = fn(fresh);
    if (r === false) return false;
    if (ALF.saveProducts(fresh)) { db = fresh; if (okMsg) toast(okMsg); renderData(); return true; }
    db = ALF.loadProducts(); renderData();
    return false;
  }

  /* ---------- matn maydonlari: avval bitta til (panel tili), qolganlari «Бошқа тиллар» ostida ----------
     Har guruh: <fieldset class="tg" data-tg="kalit"> ichida uchta .tg__row[data-l=uzc|ru|en]. Yopiq holatda faqat panel
     tilidagi qator ko'rinadi; pastida qolgan tillar to'ldirilgan yoki BO'SH ekani yozib turadi. */
  var TG_NOM = { uzc: 'ЎЗ', ru: 'RU', en: 'EN' }, tgOchiq = {};
  function tgChiz(g) {
    var kalit = g.getAttribute('data-tg'), ochiq = !!tgOchiq[kalit], asosiy = TIL.til(), st = '';
    var foot = $('.tg__foot', g);
    if (!foot) { foot = document.createElement('div'); foot.className = 'tg__foot'; foot.innerHTML = '<span class="tg__st"></span><button type="button" class="linkbtn tg__more"></button>'; g.appendChild(foot); }
    $$('.tg__row', g).forEach(function (r) {
      var l = r.getAttribute('data-l'), el = $('input,textarea', r), bosh = !String(el.value || '').trim();
      r.hidden = !ochiq && l !== asosiy; r.classList.toggle('is-asosiy', l === asosiy);
      if (l !== asosiy) st += '<span class="tg__b' + (bosh ? ' is-bosh' : '') + '">' + TG_NOM[l] + ': ' + esc(t(bosh ? 'tg.bosh' : 'tg.bor')) + '</span>';
    });
    $('.tg__st', g).innerHTML = st;
    var b = $('.tg__more', g); b.textContent = t(ochiq ? 'tg.yashir' : 'tg.boshqa'); b.setAttribute('aria-expanded', String(ochiq));
    g.classList.toggle('is-open', ochiq);
  }
  function tgHammasi(root) { $$('[data-tg]', root).forEach(tgChiz); }
  function tgYop(prefiks) { Object.keys(tgOchiq).forEach(function (k) { if (k.indexOf(prefiks) === 0) delete tgOchiq[k]; }); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.tg__more'); if (!b) return;
    var g = b.closest('[data-tg]'), k = g.getAttribute('data-tg');
    tgOchiq[k] = !tgOchiq[k]; tgChiz(g);
    if (tgOchiq[k]) { var q = $('.tg__row:not(.is-asosiy) input, .tg__row:not(.is-asosiy) textarea', g); if (q) q.focus(); }
  });
  document.addEventListener('input', function (e) { var r = e.target.closest ? e.target.closest('.tg__row') : null; if (r) tgChiz(r.closest('[data-tg]')); });
  // uch tildagi qiymat; birortasi ham yozilmagan bo'lsa null
  function uchTil(uzc, ru, en) { var o = { uzc: String(uzc || '').trim(), ru: String(ru || '').trim(), en: String(en || '').trim() }; return o.uzc || o.ru || o.en ? o : null; }
  function birinchi(o) { return o[TIL.til()] || o.uzc || o.ru || o.en || ''; }

  function enter() { $('#app').hidden = false; tgHammasi(document); renderData(); renderContact(); }

  /* ---------- mahsulotlar ro'yxati (bosh ekran) ---------- */
  var ST = ['in', 'way', 'out'];
  function thumb(p) {
    var tp = type(p.type) || {};
    var src = ALF.safeImg(p.img);
    if (src) return '<img src="' + esc(src) + '" alt="">';
    if (tp.img && /^img\/[\w\/-]+$/.test(tp.img)) return '<img src="' + esc(tp.img) + '-480.webp" alt="">';
    return ic('box');
  }
  function visible() { return db.products.filter(function (p) { return !fCountry || p.country === fCountry; }); }
  function renderFilter() {
    var h = '<button type="button" class="chip" data-c="" aria-pressed="' + (!fCountry) + '"><span>' + esc(t('p.hammasi')) + '</span><small class="num">' + db.products.length + '</small></button>';
    db.countries.forEach(function (c) {
      var n = db.products.filter(function (p) { return p.country === c.id; }).length;
      h += '<button type="button" class="chip" data-c="' + esc(c.id) + '" aria-pressed="' + (fCountry === c.id) + '"><i>' + esc(c.code) + '</i><span>' + esc(L(c.name)) + '</span><small class="num">' + n + '</small></button>';
    });
    $('#pFilter').innerHTML = h;
  }
  function renderList() {
    var list = visible();
    $('#pCount').textContent = db.products.length;
    $('#pList').classList.toggle('is-ord', tartib);
    $('#pOrd').setAttribute('aria-pressed', String(tartib)); $('#pOrd span').textContent = t(tartib ? 'p.ord2' : 'p.ord');
    $('#pList').innerHTML = list.map(function (p, vi) {
      var nm = esc(pName(p));
      return '<li class="pitem" data-id="' + esc(p.id) + '">' +
        '<span class="pitem__img">' + thumb(p) + '</span>' +
        '<span class="pitem__t"><b title="' + nm + '">' + nm + '</b><small>' + ic('pin') + '<span class="pitem__o">' + esc(joyNomi(p)) + '</span></small></span>' +
        '<span class="pitem__e"><button type="button" class="btn btn--line btn--sm" data-act="edit" aria-label="' + esc(t('tahrir')) + ': ' + nm + '">' + ic('edit') + '<span>' + esc(t('tahrir')) + '</span></button></span>' +
        '<span class="pitem__ord"><button type="button" class="iconbtn" data-act="up" aria-label="' + esc(t('p.yuqoriga')) + ': ' + nm + '"' + (vi === 0 ? ' disabled' : '') + '>' + ic('up') + '</button>' +
        '<button type="button" class="iconbtn" data-act="down" aria-label="' + esc(t('p.pastga')) + ': ' + nm + '"' + (vi === list.length - 1 ? ' disabled' : '') + '>' + ic('down') + '</button></span>' +
        '<span class="pitem__row"><span class="seg" role="group" aria-label="' + esc(t('p.holat')) + ': ' + nm + '">' + ST.map(function (s) {
          return '<button type="button" class="s-' + s + '" data-st="' + s + '" aria-pressed="' + (p.status === s) + '">' + esc(t('st.' + s)) + '</button>';
        }).join('') + '</span></span>' +
        '</li>';
    }).join('') || '<li class="xempty">' + esc(t('p.bosh')) + '</li>';
  }
  $('#pFilter').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    fCountry = b.getAttribute('data-c'); renderFilter(); renderList();
  });
  $('#pOrd').addEventListener('click', function () { tartib = !tartib; renderList(); });
  $('#pList').addEventListener('click', function (e) {
    var li = e.target.closest('.pitem'); if (!li) return;
    var id = li.getAttribute('data-id'), p = prod(db, id); if (!p) return;
    var st = e.target.closest('[data-st]');
    if (st) {
      var v = st.getAttribute('data-st');
      if (p.status === v) return;
      commit(function (d) { var x = prod(d, id); if (!x) return false; x.status = v; }, t('p.holatok', { n: pName(p) + ' — ' + t('st.' + v) }));
      var nb = $('.pitem[data-id="' + id + '"] [data-st="' + v + '"]'); if (nb) nb.focus();
      return;
    }
    var act = e.target.closest('[data-act]'); if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'edit') { openSheet(p); return; }
    // tartib: ko'rinib turgan ro'yxat ichida qo'shni bilan almashadi
    var vis = visible(), vi = vis.indexOf(p), nbP = vis[a === 'up' ? vi - 1 : vi + 1];
    if (!nbP) return;
    commit(function (d) {
      var i = d.products.indexOf(prod(d, id)), j = d.products.indexOf(prod(d, nbP.id));
      if (i < 0 || j < 0) return false;
      var x = d.products[i]; d.products[i] = d.products[j]; d.products[j] = x;
    }, t('p.tartibok'));
    var fb = $('.pitem[data-id="' + id + '"] [data-act="' + a + '"]');
    if (fb && !fb.disabled) fb.focus(); else { fb = $('.pitem[data-id="' + id + '"] [data-act="' + (a === 'up' ? 'down' : 'up') + '"]'); if (fb) fb.focus(); }
  });
  $('#pAdd').addEventListener('click', function () { openSheet(null); });

  /* ---------- mahsulot oynasi ---------- */
  var sheet = $('#sheet'), curId = null, isNew = false, curImg = '', nameTouched = false, delArmed = false, pendingReg = null;
  function fillTypes(bosh) { $('#fType').innerHTML = (bosh ? tanlang() : '') + db.types.map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(L(x.name)) + '</option>'; }).join(''); }
  function fillCountries(sel, bosh) { sel.innerHTML = (bosh ? tanlang() : '') + db.countries.map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(L(c.name)) + ' (' + esc(c.code) + ')</option>'; }).join(''); }
  function fillRegions(cid, val, bosh) {
    var c = country(db, cid), regs = c ? c.regions.slice() : [];
    if (pendingReg && pendingReg.country === cid) regs.push(pendingReg.r);
    $('#fRegion').innerHTML = (bosh || !c ? tanlang() : '') + regs.map(function (r) { return '<option value="' + esc(r.id) + '">' + esc(L(r.name)) + (pendingReg && r === pendingReg.r ? ' (' + esc(t('yangi')) + ')' : '') + '</option>'; }).join('');
    if (val) $('#fRegion').value = val;
    $('#nrOpen').hidden = !c;
  }
  function setNamesFromType() {
    var x = type($('#fType').value) || { name: {} };
    $('#fNameUzc').value = x.name.uzc || ''; $('#fNameRu').value = x.name.ru || ''; $('#fNameEn').value = x.name.en || '';
    tgChiz($('[data-tg="fName"]'));
  }
  function showImg() {
    var prev = $('#fImgPrev'), tp = type($('#fType').value) || {};
    var src = ALF.safeImg(curImg) || (tp.img && /^img\/[\w\/-]+$/.test(tp.img) ? tp.img + '-800.webp' : '');
    if (src) { prev.innerHTML = '<img src="' + esc(src) + '" alt="">'; prev.classList.add('has'); }
    else { prev.innerHTML = '<span>' + esc(t('f.suratyoq')) + '</span>'; prev.classList.remove('has'); }
    $('#fImgDel').hidden = !curImg;
    $('label[for="fImg"] span').textContent = t(curImg ? 'f.suratalm' : 'f.surat');
  }
  function delMatn() { $('#pDel span').textContent = t(delArmed ? 'tasdiqlash' : 'ochirish'); }
  function openSheet(p) {
    isNew = !p; curId = p ? p.id : uid('p'); delArmed = false; nameTouched = !!(p && p.name); pendingReg = null;
    var pd = $('#pDel'); pd.classList.remove('is-confirm'); delMatn(); pd.hidden = !p;
    $('#sheet-h').textContent = t(p ? 'f.tahrir' : 'f.yangi');
    // yangi mahsulot: tur, davlat va hudud ATAYLAB bo'sh — tanlanmaguncha saqlanmaydi (bo'sh forma bilan mahsulot qo'shilmaydi)
    fillTypes(!p); fillCountries($('#fCountry'), !p);
    $('#fType').value = p ? p.type : '';
    $('#fCountry').value = p ? p.country : (fCountry || '');
    fillRegions($('#fCountry').value, p ? p.region : '', !p);
    if (p) {
      var x = type(p.type) || { name: {} }, n = p.name || {};
      $('#fNameUzc').value = n.uzc || x.name.uzc || ''; $('#fNameRu').value = n.ru || ''; $('#fNameEn').value = n.en || '';
      if (!p.name) { $('#fNameRu').value = x.name.ru || ''; $('#fNameEn').value = x.name.en || ''; }
    } else { $('#fNameUzc').value = ''; $('#fNameRu').value = ''; $('#fNameEn').value = ''; }
    var st = p ? p.status : 'in';
    $$('#fStatus input').forEach(function (r) { r.checked = r.value === st; });
    $('#fKg').value = p ? (p.kg || 20) : 20;
    curImg = p ? (p.img || '') : '';
    $('#fMaker').value = p ? String(L(p.maker) || '').trim() : '';
    var al = (p && p.alt) || {}; $('#fAltUzc').value = al.uzc || ''; $('#fAltRu').value = al.ru || ''; $('#fAltEn').value = al.en || '';
    $('#fImgInfo').textContent = ''; $('#fErr').textContent = '';
    $('#newReg').hidden = true;
    tgYop('fName'); tgYop('fAlt'); tgHammasi(sheet);
    showImg();
    sheet.showModal();
    try { $('#sheetX').focus({ preventScroll: true }); } catch (e) {}
    $('.sheet__body').scrollTop = 0;
  }
  sheet.addEventListener('close', function () { pendingReg = null; }); // saqlanmagan yangi hudud tashlanadi
  $('#sheetX').addEventListener('click', function () { sheet.close(); });
  $('#fType').addEventListener('change', function () { if (!nameTouched) setNamesFromType(); showImg(); });
  ['#fNameUzc', '#fNameRu', '#fNameEn'].forEach(function (s) { $(s).addEventListener('input', function () { nameTouched = true; }); });
  $('#fCountry').addEventListener('change', function () { fillRegions($('#fCountry').value, '', isNew); });
  $('#nrOpen').addEventListener('click', function () { $('#newReg').hidden = false; $('#nrName').value = ''; $('#nrName').focus(); });
  $('#nrNo').addEventListener('click', function () { $('#newReg').hidden = true; });
  function regionExists(c, name) {
    var n = norm(name);
    return c.regions.some(function (r) { return norm(r.name.uzc) === n || norm(r.name.ru) === n || norm(r.name.en) === n; });
  }
  $('#nrOk').addEventListener('click', function () {
    var name = $('#nrName').value.trim(); if (!name) { $('#nrName').focus(); return; }
    var c = country(db, $('#fCountry').value); if (!c) return;
    if (regionExists(c, name) || (pendingReg && pendingReg.country === c.id && norm(L(pendingReg.r.name)) === norm(name))) { $('#fErr').textContent = t('f.e.hududbor', { n: name }); $('#nrName').focus(); return; }
    // hudud mahsulot saqlanganda birga yoziladi; oyna yopilsa — qo'shilmaydi
    pendingReg = { country: c.id, r: { id: uid('r'), name: { uzc: name, ru: name, en: name } } };
    fillRegions(c.id, pendingReg.r.id); $('#newReg').hidden = true; $('#fErr').textContent = '';
  });
  // surat serverga yuboriladi: u yerda turi tekshiriladi va webp qilib qayta kodlanadi
  function compress(file) { return SRV.yukla(file, 'surat').then(function (r) { return { data: r.yol, w: r.w, h: r.h }; }); }
  $('#fImg').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    $('#fImgInfo').textContent = t('f.tayyor');
    compress(f).then(function (r) {
      curImg = r.data; showImg();
      $('#fImgInfo').textContent = t('f.yuklandi', { w: r.w, h: r.h });
    }).catch(function (e) { $('#fImgInfo').textContent = (e && e.message) || t('f.ochilmadi'); });
    e.target.value = '';
  });
  $('#fImgDel').addEventListener('click', function () { curImg = ''; $('#fImgInfo').textContent = ''; showImg(); });
  $('#pForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var xato = function (k, el) { $('#fErr').textContent = t(k); el.focus(); if (el.scrollIntoView) el.scrollIntoView({ block: 'center' }); };
    var tp = $('#fType').value, cid = $('#fCountry').value, rid = $('#fRegion').value;
    if (!type(tp)) return xato('f.e.tur', $('#fType'));
    if (!country(db, cid)) return xato('f.e.davlat', $('#fCountry'));
    if (!rid) return xato('f.e.hudud', $('#fRegion'));
    var kgRaw = $('#fKg').value.trim();
    if (!/^\d{1,4}$/.test(kgRaw) || +kgRaw < 1 || +kgRaw > 1000) return xato('f.e.kg', $('#fKg'));
    var st = ($('#fStatus input:checked') || {}).value || 'in';
    var x = type(tp);
    // nom: bo'sh til saytda turning shu tildagi nomi bilan chiqadi; uchalasi ham bo'sh yoki tur nomi bilan bir xil bo'lsa — alohida nom saqlanmaydi
    var nm = uchTil($('#fNameUzc').value, $('#fNameRu').value, $('#fNameEn').value);
    if (nm && !nm.uzc) nm.uzc = x.name.uzc;
    var same = !nm || (nm.uzc === x.name.uzc && (!nm.ru || nm.ru === x.name.ru) && (!nm.en || nm.en === x.name.en));
    var pr = pendingReg, id = curId, neu = isNew, img = curImg;
    var alt = uchTil($('#fAltUzc').value, $('#fAltRu').value, $('#fAltEn').value);
    // ishlab chiqaruvchi / zavod: ixtiyoriy, bitta yozuv (firma nomi tarjima qilinmaydi — uch tilga bir xil yoziladi); bo'sh bo'lsa saqlanmaydi
    var mkv = $('#fMaker').value.replace(/\s+/g, ' ').trim().slice(0, 60), eskiMk = (prod(db, curId) || {}).maker || null;
    var mk = !mkv ? null : (eskiMk && L(eskiMk) === mkv ? eskiMk : { uzc: mkv, ru: mkv, en: mkv });
    function yoz() {
      var ok = commit(function (d) {
        if (pr && pr.country === cid && rid === pr.r.id) {
          var c = country(d, cid); if (!c) return false;
          if (!region(c, pr.r.id)) c.regions.push(pr.r);
        }
        var o = prod(d, id);
        if (!o) { if (!neu) { toast(t('f.yoqolgan'), true); return false; } o = { id: id }; d.products.unshift(o); }
        o.type = tp; o.name = same ? null : nm; o.country = cid; o.region = rid; o.status = st; o.kg = +kgRaw; o.img = img; o.alt = alt;
        if (mk) o.maker = mk; else delete o.maker;
      }, t(neu ? 'f.qoshildi' : 'f.saqlandi'));
      if (ok) { pendingReg = null; isNew = false; sheet.close(); renderRegions(); }
    }
    // takror: yangi mahsulot aynan bor mahsulotning nusxasi bo'lsa (tur + davlat + hudud bir xil) — avval so'raladi
    var bor = neu ? db.products.filter(function (p) { return p.type === tp && p.country === cid && p.region === rid && norm(L(p.maker)) === norm(mkv); })[0] : null;
    if (bor) SRV.sora(t('f.takror.h'), t('f.takror.p', { n: pName(bor) + ' — ' + joyNomi(bor) }), t('f.takror.ha'), t('f.takror.yoq'), yoz);
    else yoz();
  });
  $('#pDel').addEventListener('click', function () {
    var b = $('#pDel');
    if (!delArmed) { delArmed = true; b.classList.add('is-confirm'); delMatn(); return; }
    var id = curId;
    if (commit(function (d) { d.products = d.products.filter(function (x) { return x.id !== id; }); }, t('f.ochirildi'))) sheet.close();
  });

  /* ---------- hududlar ---------- */
  function soni(n) { return n ? t('n.mahsulot', { n: n }) : t('n.yoq'); }
  function renderRegions() {
    var keep = $('#rCountry').value;
    fillCountries($('#rCountry')); if (keep) $('#rCountry').value = keep;
    $('#rList').innerHTML = db.countries.map(function (c) {
      return '<div class="rgroup"><h3><i>' + esc(c.code) + '</i>' + esc(L(c.name)) + '</h3><ul>' + c.regions.map(function (r) {
        var n = db.products.filter(function (p) { return p.country === c.id && p.region === r.id; }).length;
        return '<li><span>' + esc(L(r.name)) + '<small>' + esc(soni(n)) + '</small></span>' +
          (n ? '' : '<button type="button" class="iconbtn" data-c="' + esc(c.id) + '" data-r="' + esc(r.id) + '" aria-label="' + esc(t('ochirish')) + ': ' + esc(L(r.name)) + '">' + ic('trash') + '</button>') + '</li>';
      }).join('') + '</ul></div>';
    }).join('');
  }
  $('#rForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var o = uchTil($('#rUzc').value, $('#rRu').value, $('#rEn').value);
    if (!o) { $('#rErr').textContent = t('r.e.nom'); $('.tg__row.is-asosiy input', $('#rForm')).focus(); return; }
    // joy nomi: yozilmagan tillarga yozilgani qo'yiladi (shahar/viloyat nomi tarjima qilinmaydi)
    var asos = birinchi(o); o.uzc = o.uzc || asos; o.ru = o.ru || asos; o.en = o.en || asos;
    var cid = $('#rCountry').value, c0 = country(db, cid); if (!c0) return;
    if (regionExists(c0, o.uzc) || regionExists(c0, o.ru) || regionExists(c0, o.en)) { $('#rErr').textContent = t('r.bor', { n: asos }); return; }
    $('#rErr').textContent = '';
    if (commit(function (d) { var c = country(d, cid); if (!c || regionExists(c, o.uzc)) return false; c.regions.push({ id: uid('r'), name: o }); }, t('r.qoshildi', { n: asos }))) {
      $('#rUzc').value = ''; $('#rRu').value = ''; $('#rEn').value = ''; $('#rCountry').value = cid; tgChiz($('[data-tg="r"]'));
    }
  });
  $('#rList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-r]'); if (!b) return;
    var cid = b.getAttribute('data-c'), rid = b.getAttribute('data-r');
    commit(function (d) {
      var c = country(d, cid); if (!c) return false;
      if (d.products.some(function (p) { return p.country === cid && p.region === rid; })) { toast(t('r.band'), true); return false; }
      c.regions = c.regions.filter(function (r) { return r.id !== rid; });
    }, t('r.ochirildi'));
  });

  /* ---------- r17: davlat ichidagi ro'yxat saytda nima deb ataladi (hudud / ishlab chiqaruvchi / zavod / o'z so'zi) ---------- */
  function l2Chiz() {
    var v = S.l2 === 'maker' || S.l2 === 'plant' || S.l2 === 'own' ? S.l2 : 'region', n = S.l2name || {};
    $$('#l2Opts input').forEach(function (r) { r.checked = r.value === v; });
    $('#l2Uzc').value = n.uzc || ''; $('#l2Ru').value = n.ru || ''; $('#l2En').value = n.en || '';
    $('#l2W').hidden = v !== 'own'; $('#l2Err').textContent = '';
    tgChiz($('[data-tg="l2w"]'));
  }
  $('#l2Opts').addEventListener('change', function () { var own = ($('#l2Opts input:checked') || {}).value === 'own'; $('#l2W').hidden = !own; $('#l2Err').textContent = ''; if (own) { tgChiz($('[data-tg="l2w"]')); var q = $('.tg__row.is-asosiy input', $('#l2W')); if (q) q.focus(); } });
  $('#l2Form').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = ($('#l2Opts input:checked') || {}).value || 'region', o = uchTil($('#l2Uzc').value, $('#l2Ru').value, $('#l2En').value);
    if (v === 'own' && !o) { $('#l2Err').textContent = t('l2.e.oz'); var q = $('.tg__row.is-asosiy input', $('#l2W')); if (q) q.focus(); return; }
    if (o) { var asos = birinchi(o); o.uzc = (o.uzc || asos).slice(0, 30); o.ru = (o.ru || asos).slice(0, 30); o.en = (o.en || asos).slice(0, 30); }
    var next = ALF.loadSettings(); next.l2 = v; next.l2name = o || { uzc: '', ru: '', en: '' };
    if (ALF.saveSettings(next)) { S = next; TIL.yangila(); l2Chiz(); toast(t('l2.ok')); }
  });

  /* ---------- aloqa (tekshiruv bilan) ---------- */
  var CL = { cAddrUzc: ['addr', 'uzc'], cAddrRu: ['addr', 'ru'], cAddrEn: ['addr', 'en'], cAddr2Uzc: ['addr2', 'uzc'], cAddr2Ru: ['addr2', 'ru'], cAddr2En: ['addr2', 'en'],
    cHrsUzc: ['hours', 'uzc'], cHrsRu: ['hours', 'ru'], cHrsEn: ['hours', 'en'] };
  var CF = { cPhone: 'phone', cPhone2: 'phone2', cTg: 'tg', cWa: 'wa', cMax: 'max', cIg: 'instagram', cMap: 'mapUrl', cMap2: 'mapUrl2', cEmail: 'email', cLegal: 'legal', cInn: 'inn' };
  function renderContact() {
    Object.keys(CF).forEach(function (id) { $('#' + id).value = S[CF[id]] || ''; });
    Object.keys(CL).forEach(function (id) { $('#' + id).value = (S[CL[id][0]] || {})[CL[id][1]] || ''; });
    $('#cHrsSample').checked = !!S.hoursSample;
    $$('#cForm .ferr').forEach(function (e) { e.textContent = ''; });
    tgHammasi($('#cForm'));
  }
  function fErr(id, msg) { var e = $('#e-' + id); if (e) e.textContent = msg || ''; $('#' + id).setAttribute('aria-invalid', String(!!msg)); return !msg; }
  $('#cForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = {}; Object.keys(CF).forEach(function (id) { v[id] = $('#' + id).value.trim(); });
    var ok = true, out = {};
    var p1 = ALF.normPhone(v.cPhone);
    if (p1.empty) ok = fErr('cPhone', t('c.e.shart')) && ok;
    else if (!p1.ok) ok = fErr('cPhone', t('c.e.tel')) && ok;
    else { fErr('cPhone'); out.phone = p1.text; }
    var p2 = ALF.normPhone(v.cPhone2);
    if (!p2.ok) ok = fErr('cPhone2', t('c.e.tel')) && ok; else { fErr('cPhone2'); out.phone2 = p2.empty ? '' : p2.text; }
    var wa = ALF.normPhone(v.cWa);
    if (!wa.ok) ok = fErr('cWa', t('c.e.tel')) && ok; else { fErr('cWa'); out.wa = wa.empty ? '' : wa.d; }
    if (v.cTg) { var tg = ALF.normTg(v.cTg); if (!tg) ok = fErr('cTg', t('c.e.tg')) && ok; else { fErr('cTg'); out.tg = tg.kind === 'phone' ? '+' + tg.id : tg.id; } } else { fErr('cTg'); out.tg = ''; }
    if (v.cMax) { var mx = ALF.normMax(v.cMax); if (!mx) ok = fErr('cMax', t('c.e.max')) && ok; else { fErr('cMax'); out.max = mx.kind === 'phone' ? '+' + mx.id : mx.href; } } else { fErr('cMax'); out.max = ''; }
    if (v.cIg) { var ig = ALF.normIg(v.cIg); if (!ig) ok = fErr('cIg', t('c.e.ig')) && ok; else { fErr('cIg'); out.instagram = ig.text.slice(1); } } else { fErr('cIg'); out.instagram = ''; }
    if (v.cEmail) { var em = ALF.safeEmail(v.cEmail); if (!em) ok = fErr('cEmail', t('c.e.email')) && ok; else { fErr('cEmail'); out.email = em; } } else { fErr('cEmail'); out.email = ''; }
    if (v.cInn) { var inn = ALF.normInn(v.cInn); if (!inn) ok = fErr('cInn', t('c.e.inn')) && ok; else { fErr('cInn'); out.inn = inn; } } else { fErr('cInn'); out.inn = ''; }
    out.legal = v.cLegal.slice(0, 120);
    ['cMap', 'cMap2'].forEach(function (id) {
      if (!v[id]) { fErr(id); out[CF[id]] = ''; return; }
      var u = ALF.safeUrl(v[id]); if (!u) ok = fErr(id, t('c.e.url')) && ok; else { fErr(id); out[CF[id]] = u; }
    });
    var next = JSON.parse(JSON.stringify(S));
    Object.keys(CL).forEach(function (id) { var k = CL[id]; next[k[0]] = next[k[0]] || {}; next[k[0]][k[1]] = $('#' + id).value.trim(); });
    // 1-manzil majburiy: o'zbekchasi yozilmagan bo'lsa, yozilgan tildagisi qo'yiladi (sayt bo'sh qolmasin)
    if (!next.addr.uzc) next.addr.uzc = next.addr.ru || next.addr.en || '';
    if (!next.addr.uzc) { ok = false; $('#cErr').textContent = t('c.e.addr'); tgOchiq.cAddr = false; tgChiz($('[data-tg="cAddr"]')); $('.tg__row.is-asosiy input', $('[data-tg="cAddr"]')).focus(); return; }
    if (!ok) { $('#cErr').textContent = t('c.e.jami'); var f = $('#cForm [aria-invalid="true"]'); if (f) f.focus(); return; }
    $('#cErr').textContent = '';
    Object.keys(out).forEach(function (k) { next[k] = out[k]; });
    next.hoursSample = $('#cHrsSample').checked;
    if (ALF.saveSettings(next)) { S = next; renderContact(); toast(t('c.ok')); }
  });

  /* ---------- sahifa matnlari: raqamlar, sertifikatlar, suratlar, savol-javob, shartlar, mahsulot tavsifi ----------
     Bitta umumiy tahrirchi. Ishchi nusxa (xItems) xotirada; «Сақлаш» bosilganda butun ro'yxat yoziladi.
     Hamma qiymat ekranga esc() orqali chiqadi; fayl havolasi ALF.safeFile, surat faqat serverda yuklangan. */
  var XD = {
    stats: { fields: [{ k: 'v', label: 'x.f.v', i18n: true, max: 16 }, { k: 'l', label: 'x.f.l', i18n: true, max: 40 }], blank: function () { return { v: i3(), ph: i3(), l: i3(), sample: false }; } },
    certs: { fields: [{ k: 't', label: 'x.f.cert', i18n: true, max: 70 }, { k: 'img', img: true }, { k: 'file', label: 'x.f.pdf', max: 300, file: true }], blank: function () { return { t: i3(), img: '', file: '', sample: false }; } },
    gallery: { fields: [{ k: 't', label: 'x.f.gal', i18n: true, max: 60 }, { k: 'img', img: true }], blank: function () { return { t: i3(), img: '', sample: false }; } },
    faq: { fields: [{ k: 'q', label: 'x.f.q', i18n: true, max: 140 }, { k: 'a', label: 'x.f.a', i18n: true, area: true, max: 500 }], blank: function () { return { q: i3(), a: i3(), sample: false }; } },
    terms: { fields: [{ k: 't', label: 'x.f.t', i18n: true, max: 40 }, { k: 'd', label: 'x.f.d', i18n: true, area: true, max: 240 }], blank: function () { return { t: i3(), d: i3(), sample: false }; } },
    spec: { fields: [{ k: 'k', label: 'x.f.k', i18n: true, max: 50 }, { k: 'v', label: 'x.f.sv', i18n: true, max: 160 }], blank: function () { return { k: i3(), v: i3(), sample: false }; } }
  };
  var XL = [['uzc', 'ЎЗ'], ['ru', 'RU'], ['en', 'EN']];
  var xItems = [], xDirty = false;
  function i3() { return { uzc: '', ru: '', en: '' }; }
  function xSec() { return $('#xSec').value; }
  function xSource(d) {
    if (xSec() === 'spec') { var tp = d.types.filter(function (x) { return x.id === $('#xType').value; })[0]; return tp ? (tp.spec || (tp.spec = [])) : null; }
    return d[xSec()] || (d[xSec()] = []);
  }
  function xLoad() {
    var sec = xSec();
    $('#xTypeRow').hidden = sec !== 'spec';
    if (sec === 'spec') { var keep = $('#xType').value; $('#xType').innerHTML = db.types.map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(L(x.name)) + '</option>'; }).join(''); if (keep && type(keep)) $('#xType').value = keep; }
    xItems = JSON.parse(JSON.stringify(xSource(db) || [])); xDirty = false; $('#xErr').textContent = '';
    tgYop('x:');
    xRender();
  }
  function xRender() {
    var def = XD[xSec()];
    if (!xItems.length) { $('#xList').innerHTML = '<p class="xempty">' + esc(t('x.bosh')) + '</p>'; return; }
    $('#xList').innerHTML = xItems.map(function (it, i) {
      var h = '<div class="xitem' + (it.sample ? ' is-sample' : '') + '" data-i="' + i + '"><div class="xitem__top"><span class="xitem__n num">' + (i + 1) + '</span>' +
        '<button type="button" class="iconbtn" data-xdel aria-label="' + esc(t('x.ochir', { n: i + 1 })) + '">' + ic('trash') + '</button></div>';
      def.fields.forEach(function (f) {
        if (f.img) {
          var src = ALF.safeImg(it[f.k]);
          h += '<div class="ximg">' + (src ? '<img src="' + esc(src) + '" alt="">' : '') + '<input type="file" class="vh" id="xf' + i + '" accept="image/*" data-ximg="' + f.k + '"><label class="btn btn--line btn--sm" for="xf' + i + '">' + ic('img') + '<span>' + esc(t(src ? 'f.suratalm' : 'f.surat')) + '</span></label>' +
            (src ? '<button type="button" class="btn btn--line btn--sm" data-ximgdel="' + f.k + '"><span>' + esc(t('olib')) + '</span></button>' : '') + '</div>';
        } else if (f.i18n) {
          h += '<fieldset class="tg" data-tg="x:' + i + ':' + f.k + '"><legend>' + esc(t(f.label)) + '</legend>' + XL.map(function (l) {
            var id = 'x' + i + f.k + l[0], v = esc((it[f.k] || {})[l[0]] || '');
            return '<div class="tg__row" data-l="' + l[0] + '"><label for="' + id + '">' + l[1] + '</label>' + (f.area ? '<textarea id="' + id + '" maxlength="' + f.max + '" data-k="' + f.k + '" data-l="' + l[0] + '">' + v + '</textarea>' : '<input id="' + id + '" type="text" maxlength="' + f.max + '" value="' + v + '" data-k="' + f.k + '" data-l="' + l[0] + '">') + '</div>';
          }).join('') + '</fieldset>';
        } else {
          h += '<div class="fld"><label for="x' + i + f.k + '">' + esc(t(f.label)) + '</label><input id="x' + i + f.k + '" type="text" maxlength="' + f.max + '" value="' + esc(it[f.k] || '') + '" data-k="' + f.k + '"></div>';
          if (f.file) h += '<div class="ximg"><input type="file" class="vh" id="xp' + i + '" accept="application/pdf" data-xfile="' + f.k + '"><label class="btn btn--line btn--sm" for="xp' + i + '"><span>' + esc(t('x.pdfbtn')) + '</span></label></div>';
        }
      });
      return h + '<label class="chk"><input type="checkbox" data-xsample' + (it.sample ? ' checked' : '') + '><span>' + esc(t('x.namuna')) + '</span></label></div>';
    }).join('');
    tgHammasi($('#xList'));
  }
  function xIdx(el) { var b = el.closest('.xitem'); return b ? +b.getAttribute('data-i') : -1; }
  $('#xSec').addEventListener('change', xLoad);
  $('#xType').addEventListener('change', xLoad);
  $('#xList').addEventListener('input', function (e) {
    var el = e.target, i = xIdx(el), it = xItems[i]; if (!it) return;
    var k = el.getAttribute('data-k'); if (!k) return;
    if (el.hasAttribute('data-l')) { if (!it[k] || typeof it[k] !== 'object') it[k] = i3(); it[k][el.getAttribute('data-l')] = el.value; } else it[k] = el.value;
    xDirty = true;
  });
  $('#xList').addEventListener('change', function (e) {
    var el = e.target, i = xIdx(el), it = xItems[i]; if (!it) return;
    if (el.hasAttribute('data-xsample')) { it.sample = el.checked; xDirty = true; el.closest('.xitem').classList.toggle('is-sample', el.checked); return; }
    if (el.hasAttribute('data-xfile')) {
      var pf = el.files && el.files[0], pk = el.getAttribute('data-xfile'); if (!pf) return;
      SRV.yukla(pf, 'hujjat').then(function (r) { it[pk] = r.yol; xDirty = true; xRender(); toast(t('x.pdfok')); }).catch(function (e) { toast((e && e.message) || t('x.rad'), true); });
      return;
    }
    if (el.hasAttribute('data-ximg')) {
      var f = el.files && el.files[0], k = el.getAttribute('data-ximg'); if (!f) return;
      compress(f).then(function (r) { it[k] = r.data; xDirty = true; xRender(); toast(t('x.suratok', { w: r.w, h: r.h })); }).catch(function (e) { toast((e && e.message) || t('f.ochilmadi'), true); });
    }
  });
  $('#xList').addEventListener('click', function (e) {
    var i = xIdx(e.target), it = xItems[i]; if (!it) return;
    var d = e.target.closest('[data-ximgdel]');
    if (d) { it[d.getAttribute('data-ximgdel')] = ''; xDirty = true; xRender(); return; }
    if (e.target.closest('[data-xdel]')) { xItems.splice(i, 1); xDirty = true; tgYop('x:'); xRender(); }
  });
  $('#xAdd').addEventListener('click', function () {
    if (xItems.length >= 30) { toast(t('x.kop'), true); return; }
    xItems.push(XD[xSec()].blank()); xDirty = true; xRender();
    var f = $('#xList .xitem:last-child .tg__row.is-asosiy input, #xList .xitem:last-child .tg__row.is-asosiy textarea'); if (f) f.focus();
  });
  $('#xSave').addEventListener('click', function () {
    var bad = '';
    var clean = xItems.map(function (it, n) {
      var o = JSON.parse(JSON.stringify(it));
      Object.keys(o).forEach(function (k) {
        if (o[k] && typeof o[k] === 'object') XL.forEach(function (l) { o[k][l[0]] = String(o[k][l[0]] || '').trim(); });
        else if (typeof o[k] === 'string' && k !== 'img') o[k] = o[k].trim();
      });
      if ('img' in o) o.img = ALF.safeImg(o.img);
      if ('file' in o && o.file) { var u = ALF.safeFile(o.file); if (!u) bad = t('x.e.havola', { n: n + 1 }); else o.file = u; }
      o.sample = !!o.sample;
      return o;
    });
    if (bad) { $('#xErr').textContent = bad; return; }
    $('#xErr').textContent = '';
    var sec = xSec(), tid = $('#xType').value;
    xDirty = false;
    var ok = commit(function (d) {
      if (sec === 'spec') { var tp = d.types.filter(function (x) { return x.id === tid; })[0]; if (!tp) return false; tp.spec = clean; }
      else d[sec] = clean;
    }, t('f.saqlandi'));
    if (!ok) xDirty = true;
  });
  $('#exportAll').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify({ db: ALF.loadProducts(), settings: ALF.loadSettings() }, null, 1)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'alfirdavs-malumot.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  /* ---------- mahsulot turlari: qo'shish, o'zgartirish, o'chirish — sahifasi sayt qayta yasalganda paydo bo'ladi ---------- */
  var tCur = null, tDel = '', tImgCur = '';
  function tImgChiz() { $('#tImgPrev').innerHTML = /^img\/u\/[a-f0-9]{24}$/.test(tImgCur) ? '<img src="' + esc(tImgCur) + '-480.webp" alt="">' : ''; $('#tImgDel').hidden = !tImgCur; $('#tImgL').textContent = t(tImgCur ? 'f.suratalm' : 't.img'); }
  var TQ = [['Name', 'name'], ['Sub', 'sub'], ['Desc', 'desc']], TL = [['Uzc', 'uzc'], ['Ru', 'ru'], ['En', 'en']];
  function slugify(v) { return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60); }
  function renderTypes() {
    $('#tList').innerHTML = db.types.map(function (x) {
      var n = db.products.filter(function (p) { return p.type === x.id; }).length, arm = tDel === x.id;
      return '<li class="titem" data-id="' + esc(x.id) + '"><span class="titem__t"><b>' + esc(L(x.name)) + '</b><small>/catalog/' + esc(x.slug) + '/ · ' + esc(soni(n)) + '</small></span>' +
        '<span class="titem__b"><button type="button" class="btn btn--line btn--sm" data-tact="edit">' + ic('edit') + '<span>' + esc(t('tahrir')) + '</span></button>' +
        (n ? '' : '<button type="button" class="btn btn--line btn--sm' + (arm ? ' is-confirm' : '') + '" data-tact="del">' + ic('trash') + '<span>' + esc(t(arm ? 'tasdiqlash' : 'ochirish')) + '</span></button>') + '</span></li>';
    }).join('');
    if (!$('#tForm').hidden) { $('#tFormH').textContent = t(tCur ? 't.tahrir' : 't.yangi'); tImgChiz(); }
  }
  function tOpen(x) {
    tCur = x ? x.id : null;
    $('#tFormH').textContent = t(x ? 't.tahrir' : 't.yangi');
    TQ.forEach(function (q) { TL.forEach(function (l) { $('#t' + q[0] + l[0]).value = x ? ((x[q[1]] || {})[l[1]] || '') : ''; }); });
    $('#tG').value = x && x.g ? x.g : 'p'; tImgCur = x ? (x.img || '') : ''; tImgChiz();
    $('#tSlug').value = x ? x.slug : ''; $('#tSlug').disabled = !!x; $('#tSlugP').textContent = x ? x.slug : '…';
    $('#tErr').textContent = ''; $('#tForm').hidden = false;
    tgYop('tName'); tgYop('tSub'); tgYop('tDesc'); tgHammasi($('#tForm'));
    $('#tForm').scrollIntoView({ block: 'start' }); $('.tg__row.is-asosiy input', $('[data-tg="tName"]')).focus();
  }
  $('#tAdd').addEventListener('click', function () { tOpen(null); });
  $('#tImg').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    compress(f).then(function (r) { tImgCur = String(r.data).replace(/-800\.webp$/, ''); tImgChiz(); }).catch(function (x) { toast((x && x.message) || t('f.ochilmadi'), true); });
    e.target.value = '';
  });
  $('#tImgDel').addEventListener('click', function () { tImgCur = ''; tImgChiz(); });
  $('#tNo').addEventListener('click', function () { $('#tForm').hidden = true; });
  $('#tNameEn').addEventListener('input', function () { if (!tCur && !$('#tSlug').dataset.qol) { $('#tSlug').value = slugify($('#tNameEn').value); $('#tSlugP').textContent = $('#tSlug').value || '…'; } });
  $('#tSlug').addEventListener('input', function () { $('#tSlug').dataset.qol = '1'; $('#tSlugP').textContent = slugify($('#tSlug').value) || '…'; });
  $('#tList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-tact]'), li = e.target.closest('.titem'); if (!b || !li) return;
    var id = li.getAttribute('data-id'), x = type(id); if (!x) return;
    if (b.getAttribute('data-tact') === 'edit') { tDel = ''; tOpen(x); return; }
    if (tDel !== id) { tDel = id; renderTypes(); return; }
    tDel = '';
    commit(function (d) {
      if (d.products.some(function (p) { return p.type === id; })) { toast(t('t.band'), true); return false; }
      d.types = d.types.filter(function (y) { return y.id !== id; });
    }, t('t.ochirildi'));
  });
  $('#tForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var o = {}; TQ.forEach(function (q) { o[q[1]] = {}; TL.forEach(function (l) { o[q[1]][l[1]] = $('#t' + q[0] + l[0]).value.trim(); }); });
    var asos = birinchi(o.name);
    if (!asos) { $('#tErr').textContent = t('t.e.nom'); $('.tg__row.is-asosiy input', $('[data-tg="tName"]')).focus(); return; }
    // nom: yozilmagan tilga yozilgani qo'yiladi (sahifa sarlavhasi bo'sh qolmasin)
    o.name.uzc = o.name.uzc || asos; o.name.ru = o.name.ru || asos; o.name.en = o.name.en || asos;
    var slug = tCur ? (type(tCur) || {}).slug : slugify($('#tSlug').value), id = tCur, tg = $('#tG').value, timg = tImgCur;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug || '')) { $('#tErr').textContent = t('t.e.slug'); $('#tSlug').focus(); return; }
    if (db.types.some(function (x) { return x.slug === slug && x.id !== id; })) { $('#tErr').textContent = t('t.e.slugbor'); $('#tSlug').focus(); return; }
    if (!id && db.types.length >= 60) { $('#tErr').textContent = t('t.e.kop'); return; }
    var ok = commit(function (d) {
      var x = id ? d.types.filter(function (y) { return y.id === id; })[0] : null;
      if (id && !x) return false;
      if (!x) { if (d.types.some(function (y) { return y.slug === slug; })) return false; x = { id: uid('t'), slug: slug, img: '', spec: [] }; d.types.push(x); }
      x.name = o.name; x.sub = o.sub; x.desc = o.desc; x.g = tg; x.img = timg;
    }, t(id ? 't.saqlandi' : 't.qoshildi'));
    if (ok) { $('#tForm').hidden = true; delete $('#tSlug').dataset.qol; }
  });

  function renderData() { renderFilter(); renderList(); renderRegions(); renderTypes(); if (!xDirty) xLoad(); l2Chiz(); }
  // qatlam.js uchun: serverdan yangi holat kelganda (bekor qilish, tarixdan qaytarish), til almashganda va ko'rib chiqishdagi
  // «tahrirlash» belgisi bosilganda
  window.ALFPANEL = {
    qayta: function () { db = ALF.loadProducts(); S = ALF.loadSettings(); xDirty = false; tDel = ''; $('#tForm').hidden = true; if (sheet.open) sheet.close(); renderData(); renderContact(); },
    til: function () {
      renderFilter(); renderList(); renderRegions(); renderTypes();
      if (xDirty) xRender(); else xLoad();
      tgHammasi(document);
      if (sheet.open) { $('#sheet-h').textContent = t(isNew ? 'f.yangi' : 'f.tahrir'); delMatn(); showImg(); }
    },
    joy: function (nima, id) {
      if (nima === 'mahsulot') { SRV.och('p'); var p = prod(db, id); if (p) openSheet(p); }
      else if (nima === 'aloqa') SRV.och('c');
      else if (nima === 'qism' && XD[id] && id !== 'spec') { SRV.och('x'); $('#xSec').value = id; xLoad(); }
      else if (nima === 'spec' && type(id)) { SRV.och('x'); $('#xSec').value = 'spec'; xLoad(); $('#xType').value = id; xLoad(); }
      else if (nima === 'tur' && type(id)) { SRV.och('t'); tOpen(type(id)); }
      else if (nima === 'tasdiq') SRV.och('m', 'sTasdiqBox');
    }
  };
  enter();
})();
