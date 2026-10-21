/* MAKON v3.19 — guruh «ts» sahnalari (lib/sahna_v319_ts.js): Texnologiya (7) va Tasviriy san’at (7).
   Ulanish: index.html da lib/sahna_v315_kbg.js dan KEYIN; CSS lib/sahna_v319_ts.css — lib/sahna_v315_tr.css dan keyin.
   Reyestr: window.MAKON_SAHNA['ts_yogoch' | 'ts_elektr' | 'ts_uzatma' | 'ts_tikuv' | 'ts_qurish' | 'ts_robot' | 'ts_loyiha' |
            'ts_rang' | 'ts_persp' | 'ts_yorug' | 'ts_komp' | 'ts_girih' | 'ts_portret' | 'ts_behzod'].
   Hodisalar (document 'makon3d'): ts-yogoch, ts-elektr, ts-uzatma, ts-tikuv, ts-qurish, ts-robot, ts-loyiha,
            ts-rang, ts-persp, ts-yorug, ts-komp, ts-girih, ts-portret, ts-behzod (+ 'detal' kartalar: turD 'ts_*').
   Sahna holat() dan hodisa chiqarmaydi — faqat foydalanuvchi amali. 3D test savolida (.uq-sahna) dars obyektidagi `tsUq`
   holati qo‘llanadi, aks holda 1-bosqich holati. Faqat protsedurali geometriya/teksturalar — tashqi fayl yuklanmaydi.
   Manba bo‘laklari: ekran\v319_ts\s1.js … s4.js, yig‘ish: node ekran\v319_ts\yig.cjs */
(function(){
'use strict';
const SAHNA = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({}, d || {}, {tur})})); /* tur doim hodisa turi */
const detal = (turD, nom)=>hodisa('detal', {turD, nom});
const son = (v, k)=>{ k = k === undefined ? 2 : k; const p = Math.pow(10, k); let r = Math.round(v * p) / p; if(Object.is(r, -0)) r = 0; return String(r).replace('.', ',').replace('-', '−'); };
const PI = Math.PI, RAD = PI / 180;
const cl = (v, a, b)=>Math.max(a, Math.min(b, v));
const lerp = (a, b, t)=>a + (b - a) * t;
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R = {vi:'#a996ff', vi2:'#7b63ff', am:'#ffc14d', gr:'#4ee1a0', cy:'#5cc8ff', pk:'#ff6b9a', or:'#ff9f43', oq:'#f1f3ff', xi:'rgba(200,208,240,.55)', qi:'#ff5d73', yn:'#1fd9c9'};
const TEJAM = !!(window.MAKON_SIFAT && window.MAKON_SIFAT.tejam);

function royxatla(idish, api){ const x = window._sahnalar; const e = x && x.get(idish); if(e && e !== api) e.yopish(); if(x) x.set(idish, api); }
const uqMi = sahna=>!!(sahna.closest && sahna.closest('.uq-sahna'));

/* ---------- yig‘iladigan ma’lumot kartasi (o‘ng yuqori) ---------- */
function kartaQur(ota, uq){
  const k = document.createElement('div'); k.className = 'ts-karta';
  if(!uq) ota.append(k);
  let yig = (ota.clientWidth || 900) < 860, sar = '', fx = '', ichi = '';
  const chiz = ()=>{
    k.classList.toggle('yigiq', yig);
    k.innerHTML = '<div class="ts-bosh"><span class="ust">' + sar + '</span><button class="ts-yig" aria-label="Ma’lumotni yig‘ish yoki ochish">' + (yig ? '+' : '−') + '</button></div><div class="fx">' + fx + '</div><div class="ts-ich">' + ichi + '</div>';
    k.querySelector('.ts-yig').onclick = e=>{ e.stopPropagation(); yig = !yig; chiz(); if(k.ozgardi) k.ozgardi(); };
  };
  k.yoz = (s, f, i)=>{ sar = s; fx = f; ichi = i || ''; chiz(); };
  return k;
}

/* ---------- xavfsiz maydon: bosqichlar/boshqaruv/karta egallamagan to‘rtburchak ---------- */
function xavfsizMaydon(sahna, W, H, uq){
  const q = {l:12, r:12, t:12, b:12};
  if(uq) return q;
  const sr = sahna.getBoundingClientRect(), ota = sahna.parentElement;
  const olch = e=>{ if(!e || !e.offsetParent) return null; const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 ? r : null; };
  const toSiq = (r, yon)=>{
    const v = [];
    if(yon.includes('l')) v.push(Object.assign({}, q, {l:Math.max(q.l, r.right - sr.left + 12)}));
    if(yon.includes('r')) v.push(Object.assign({}, q, {r:Math.max(q.r, sr.right - r.left + 12)}));
    if(yon.includes('t')) v.push(Object.assign({}, q, {t:Math.max(q.t, r.bottom - sr.top + 8)}));
    if(yon.includes('b')) v.push(Object.assign({}, q, {b:Math.max(q.b, sr.bottom - r.top + 10)}));
    let eng = v[0], em = -1;
    v.forEach(x=>{ const m = Math.max(0, W - x.l - x.r) * Math.max(0, H - x.t - x.b); if(m > em){ em = m; eng = x; } });
    Object.assign(q, eng);
  };
  const xr = ota && olch(ota.querySelector('.xronologiya')); if(xr) toSiq(xr, 'lt');
  const bp = ota && olch(ota.querySelector('.boshq-panel:not(.bosh)')); if(bp) toSiq(bp, 'b');
  const ab = ota && olch(ota.querySelector('.asboblar')); if(ab) toSiq(ab, 'b');
  const k = olch(sahna.querySelector('.ts-karta')); if(k) toSiq(k, 'rt');
  return q;
}

/* ======================= 2D dvigatel (canvas) =======================
   o: olam()→[x1,y1,x2,y2] (dunyo koordinatalari, y yuqoriga), chiz(E), bosish(x,y,X,Y,h), tutqich(X,Y,x,y)→{sur(x,y),qoy()},
      ustida(x,y,X,Y)→{matn,bos}, holat(h), kadr(dt,t)→bool, pan, tikla(), yopish() */
function tekis(sahna, c, o){
  const uq = uqMi(sahna);
  const wrap = document.createElement('div'); wrap.className = 'ts-2d';
  const cv = document.createElement('canvas'); wrap.append(cv);
  sahna.append(wrap);
  const karta = kartaQur(sahna, uq);
  const uch = document.createElement('div'); uch.className = 'ts-uch'; sahna.append(uch);
  const cx = cv.getContext('2d');
  const E = {sahna, wrap, cv, cx, karta, uch, uq, W:600, H:400, dpr:1, b:40, cxw:0, cyw:0, sx:300, sy:200, panX:0, panY:0, zoomK:1, iflos:true};
  let tirik = true, kadr = 0, qCache = null, qVaqt = 0, birinchi = true;
  E.X = x=>E.sx + (x - E.cxw) * E.b + E.panX;
  E.Y = y=>E.sy - (y - E.cyw) * E.b + E.panY;
  E.wx = X=>(X - E.sx - E.panX) / E.b + E.cxw;
  E.wy = Y=>-(Y - E.sy - E.panY) / E.b + E.cyw;
  E.q = ()=>xavfsiz();
  karta.ozgardi = ()=>{ qVaqt = 0; E.iflos = true; };
  function xavfsiz(){ const t = performance.now(); if(qCache && t - qVaqt < 450) return qCache; qVaqt = t; qCache = xavfsizMaydon(sahna, E.W, E.H, uq); return qCache; }
  function joylash(){
    const q = xavfsiz(), bb = o.olam();
    let w = E.W - q.l - q.r, h = E.H - q.t - q.b, l = q.l, t = q.t;
    if(w < E.W * .34){ w = E.W - 24; l = 12; }
    if(h < E.H * .34){ h = E.H - 24; t = 12; }
    const b = Math.min(w / (bb[2] - bb[0]), h / (bb[3] - bb[1]));
    return {b:b * E.zoomK, cxw:(bb[0] + bb[2]) / 2, cyw:(bb[1] + bb[3]) / 2, sx:l + w / 2, sy:t + h / 2};
  }
  function olcham(){
    const r = wrap.getBoundingClientRect(); E.W = r.width || 600; E.H = r.height || 400;
    E.dpr = TEJAM ? 1 : Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(E.W * E.dpr); cv.height = Math.round(E.H * E.dpr);
    qVaqt = 0; E.iflos = true;
  }
  let oldingi = performance.now();
  function kadrla(t){
    if(!tirik) return;
    kadr = requestAnimationFrame(kadrla);
    t = t || performance.now();
    const dt = Math.min(.1, Math.max(0, (t - oldingi) / 1000)); oldingi = t;
    let ozg = o.kadr ? !!o.kadr(dt, t / 1000) : false;
    const j = joylash(), k = birinchi ? 1 : 1 - Math.exp(-9 * dt);
    birinchi = false;
    ['b', 'cxw', 'cyw', 'sx', 'sy'].forEach(n=>{ const d = j[n] - E[n]; if(Math.abs(d) > (n === 'b' ? .002 : .003)){ E[n] += d * k; ozg = true; } else if(E[n] !== j[n]){ E[n] = j[n]; ozg = true; } });
    if(ozg || E.iflos){ E.iflos = false; cx.setTransform(E.dpr, 0, 0, E.dpr, 0, 0); cx.clearRect(0, 0, E.W, E.H); o.chiz(E); }
  }
  const nuq = e=>{ const r = cv.getBoundingClientRect(); return {X:e.clientX - r.left, Y:e.clientY - r.top}; };
  let sur = null;
  cv.addEventListener('pointerdown', e=>{
    const p = nuq(e), h = o.tutqich ? o.tutqich(p.X, p.Y, E.wx(p.X), E.wy(p.Y)) : null;
    sur = {x0:e.clientX, y0:e.clientY, h, px:E.panX, py:E.panY, yur:0};
    try{ cv.setPointerCapture(e.pointerId); }catch(_){}
    uch.style.display = 'none';
  });
  cv.addEventListener('pointermove', e=>{
    const p = nuq(e);
    if(sur){
      sur.yur = Math.max(sur.yur, Math.abs(e.clientX - sur.x0) + Math.abs(e.clientY - sur.y0));
      if(sur.h){ if(sur.yur > 3){ sur.h.sur(E.wx(p.X), E.wy(p.Y), p.X, p.Y); E.iflos = true; } }
      else if(o.pan){ E.panX = sur.px + e.clientX - sur.x0; E.panY = sur.py + e.clientY - sur.y0; E.iflos = true; }
      return;
    }
    const h = o.tutqich ? o.tutqich(p.X, p.Y, E.wx(p.X), E.wy(p.Y)) : null;
    const u = o.ustida ? o.ustida(E.wx(p.X), E.wy(p.Y), p.X, p.Y) : null;
    cv.style.cursor = h ? 'grab' : (u && u.bos) ? 'pointer' : o.pan ? 'move' : 'default';
    if(u && u.matn){ uch.style.display = 'block'; uch.style.left = p.X + 'px'; uch.style.top = p.Y + 'px'; uch.innerHTML = u.matn; } else uch.style.display = 'none';
  });
  const tugat = e=>{
    if(!sur) return; const s = sur; sur = null;
    const p = nuq(e);
    if(s.yur < 7){ if(o.bosish) o.bosish(E.wx(p.X), E.wy(p.Y), p.X, p.Y, s.h); }
    else if(s.h && s.h.qoy) s.h.qoy();
    E.iflos = true;
  };
  cv.addEventListener('pointerup', tugat);
  cv.addEventListener('pointercancel', ()=>{ if(sur && sur.h && sur.h.qoy && sur.yur >= 7) sur.h.qoy(); sur = null; });
  cv.addEventListener('pointerleave', ()=>{ uch.style.display = 'none'; });
  cv.addEventListener('wheel', e=>{ if(!o.pan) return; e.preventDefault(); api.zoomla(e.deltaY > 0 ? 1.12 : 1 / 1.12); }, {passive:false});
  const ro = window.ResizeObserver ? new ResizeObserver(olcham) : null;
  if(ro) ro.observe(wrap); else window.addEventListener('resize', olcham);
  chizgich(E);
  const api = {
    holat(h){ if(h && o.holat) o.holat(h); qVaqt = 0; E.iflos = true; },
    zoomla(k){ E.zoomK = cl(E.zoomK / k, .3, 4); },
    tikla(){ E.zoomK = 1; E.panX = E.panY = 0; if(o.tikla) o.tikla(); E.iflos = true; },
    qotir(){},
    yopish(){
      tirik = false; cancelAnimationFrame(kadr);
      if(ro) ro.disconnect(); else window.removeEventListener('resize', olcham);
      if(o.yopish) o.yopish();
      wrap.remove(); karta.remove(); uch.remove();
      const x = window._sahnalar; if(x && x.get(sahna) === api) x.delete(sahna);
    }
  };
  E.api = api; api.E = E; /* sinov uchun: koordinata funksiyalari */
  royxatla(sahna, api);
  olcham();
  E.boshla = ()=>{ kadrla(); };
  return E;
}
/* 2D chizish yordamchilari (ekran koordinatalarida) */
function chizgich(E){
  const cx = E.cx;
  E.yumaloq = (x, y, w, h, r)=>{ cx.beginPath(); if(cx.roundRect) cx.roundRect(x, y, w, h, r); else cx.rect(x, y, w, h); };
  E.chiziq = (X1, Y1, X2, Y2, rang, q, o)=>{ o = o || {}; cx.save(); cx.strokeStyle = rang; cx.lineWidth = q || 2; cx.lineCap = o.cap || 'round'; if(o.dash) cx.setLineDash(o.dash); cx.beginPath(); cx.moveTo(X1, Y1); cx.lineTo(X2, Y2); cx.stroke(); cx.restore(); };
  E.doira = (X, Y, r, fill, stroke, q)=>{ cx.beginPath(); cx.arc(X, Y, r, 0, PI * 2); if(fill){ cx.fillStyle = fill; cx.fill(); } if(stroke){ cx.strokeStyle = stroke; cx.lineWidth = q || 1.5; cx.stroke(); } };
  E.matn = (t, X, Y, o)=>{ o = o || {}; cx.save(); cx.font = o.font || '600 12px Inter, sans-serif'; cx.fillStyle = o.rang || '#dfe3f3'; cx.textAlign = o.al || 'center'; cx.textBaseline = o.bl || 'middle'; if(o.fon){ const w = cx.measureText(t).width + 12; const x0 = o.al === 'left' ? X - 6 : o.al === 'right' ? X - w + 6 : X - w / 2; E.yumaloq(x0, Y - 10, w, 20, 6); cx.fillStyle = o.fon; cx.fill(); cx.fillStyle = o.rang || '#fff'; } cx.fillText(t, X, Y); cx.restore(); };
  E.kopburchak = (nuqtalar, fill, stroke, q)=>{ cx.beginPath(); nuqtalar.forEach((p, i)=>i ? cx.lineTo(p[0], p[1]) : cx.moveTo(p[0], p[1])); cx.closePath(); if(fill){ cx.fillStyle = fill; cx.fill(); } if(stroke){ cx.strokeStyle = stroke; cx.lineWidth = q || 1.5; cx.stroke(); } };
  E.strelka = (X1, Y1, X2, Y2, rang, q)=>{ E.chiziq(X1, Y1, X2, Y2, rang, q); const a = Math.atan2(Y2 - Y1, X2 - X1), s = 9; cx.beginPath(); cx.moveTo(X2, Y2); cx.lineTo(X2 - s * Math.cos(a - .5), Y2 - s * Math.sin(a - .5)); cx.lineTo(X2 - s * Math.cos(a + .5), Y2 - s * Math.sin(a + .5)); cx.closePath(); cx.fillStyle = rang; cx.fill(); };
}

/* ======================= 3D asos (MAKON3D.sahna ustida) ======================= */
function uch3(sahna, c, o){
  const uq = uqMi(sahna);
  const S = MAKON3D.sahna(sahna, Object.assign({rx:.5, ry:.6, avto:false, fov:30, env:.75, ekspozitsiya:1.1, rxMin:-.1, rxMax:1.35}, o));
  const T = S.T;
  S.uq = uq;
  S.sc.add(new T.HemisphereLight(0xcdd6ff, 0x16121f, .45));
  const kalit = new T.DirectionalLight(0xffe0bf, 1.2); kalit.position.set(5, 9, 6); S.sc.add(kalit);
  const toldir = new T.DirectionalLight(0x8aa6ff, .5); toldir.position.set(-7, 4, 3); S.sc.add(toldir);
  const orqa = new T.DirectionalLight(0xc8b0ff, .75); orqa.position.set(-2, 6, -9); S.sc.add(orqa);
  const H = {S, T, kalit, toldir, orqa, uq};
  H.rang = h=>new T.Color(h).convertSRGBToLinear();
  const texKesh = {};
  H.radTex = (i, t, k)=>{ const kk = i + t + (k || ''); if(texKesh[kk]) return texKesh[kk]; const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, i); g.addColorStop(k || 1, t); x.fillStyle = g; x.fillRect(0, 0, 128, 128); const tx = new T.CanvasTexture(cv); texKesh[kk] = tx; return tx; };
  H.soya = (r, y, x, z, kuch)=>{ const m = new T.Mesh(new T.PlaneGeometry(r * 2, r * 2), new T.MeshBasicMaterial({map:H.radTex('rgba(0,0,0,' + (kuch || .62) + ')', 'rgba(0,0,0,0)'), transparent:true, depthWrite:false})); m.rotation.x = -PI / 2; m.position.set(x || 0, y, z || 0); m.renderOrder = -2; m.material.userData.env = 1; m.userData.rentgenYoq = true; return m; };
  H.halqa = (r, y, hex)=>{ const m = new T.Mesh(new T.RingGeometry(r * .985, r, 96), new T.MeshBasicMaterial({color:H.rang(hex || '#7b63ff'), transparent:true, opacity:.35, side:T.DoubleSide, depthWrite:false})); m.rotation.x = -PI / 2; m.position.y = y; m.material.userData.env = 1; return m; };
  H.poydevor = (r, y, hex)=>{ const g = new T.Group(); const d = new T.Mesh(new T.CylinderGeometry(r, r * 1.04, .08, 64), H.mat(hex || '#1a1f3a', {roughness:.7, metalness:.25})); d.position.y = y - .04; g.add(d); g.add(H.soya(r * 1.35, y - .079)); g.add(H.halqa(r * 1.02, y + .002)); return g; };
  H.nur = (hex, olcham)=>{ const sp = new T.Sprite(new T.SpriteMaterial({map:H.radTex('rgba(255,255,255,1)', 'rgba(255,255,255,0)', 1), color:new T.Color(hex), blending:T.AdditiveBlending, depthWrite:false, transparent:true, opacity:.85})); sp.scale.set(olcham, olcham, 1); sp.userData.nur = true; return sp; };
  H.shisha = (hex, op, p)=>{ const m = new T.MeshPhysicalMaterial(Object.assign({color:H.rang(hex), roughness:.14, metalness:.02, clearcoat:1, clearcoatRoughness:.12, transparent:true, opacity:op, side:T.DoubleSide, depthWrite:false}, p || {})); m.userData.env = 1; m.envMapIntensity = 1.1; return m; };
  H.mat = (hex, p)=>{ const m = new T.MeshStandardMaterial(Object.assign({color:H.rang(hex), roughness:.42, metalness:.1}, p || {})); m.userData.env = 1; m.envMapIntensity = .9; return m; };
  H.metall = (hex, p)=>H.mat(hex || '#b9bfcc', Object.assign({roughness:.3, metalness:.85}, p || {}));
  H.plast = (hex, p)=>H.mat(hex, Object.assign({roughness:.55, metalness:0}, p || {}));
  H.quti = (w, h, d, m, r)=>new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, h, d, 3, r !== undefined ? r : Math.min(w, h, d) * .12) : new T.BoxGeometry(w, h, d), m);
  H.sil = (r1, r2, h, m, s, ochiq)=>new T.Mesh(new T.CylinderGeometry(r1, r2, h, s || 40, 1, !!ochiq), m);
  H.shar = (r, m, s)=>new T.Mesh(new T.SphereGeometry(r, s || 40, s ? Math.round(s * .6) : 26), m);
  H.tor = (r, t, m)=>new T.Mesh(new T.TorusGeometry(r, t, 14, 56), m);
  const YO = new T.Vector3(0, 1, 0);
  H.tayoq = (a, b, r, mat, seg)=>{ const d = new T.Vector3().subVectors(b, a), L = d.length(); const m = new T.Mesh(new T.CylinderGeometry(r, r, L, seg || 12, 1, false), mat); m.position.copy(a).addScaledVector(d, .5); m.quaternion.setFromUnitVectors(YO, d.normalize()); return m; };
  H.yozuv = (matn, o2)=>{
    o2 = o2 || {}; const cv = document.createElement('canvas'), x = cv.getContext('2d'), sh = o2.shrift || '700 42px "Plus Jakarta Sans", Inter, sans-serif';
    x.font = sh; const w = Math.ceil(x.measureText(matn).width) + 40, h = o2.h || 70; cv.width = w; cv.height = h;
    x.font = sh; if(o2.fon !== false){ x.fillStyle = o2.fon || 'rgba(12,16,34,.82)'; x.strokeStyle = o2.chet || 'rgba(185,168,255,.7)'; x.lineWidth = 3; x.beginPath(); if(x.roundRect) x.roundRect(2, 2, w - 4, h - 4, 18); else x.rect(2, 2, w - 4, h - 4); x.fill(); x.stroke(); }
    x.fillStyle = o2.rang || '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(matn, w / 2, h / 2 + 2);
    const tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding; tx.anisotropy = 4;
    const sp = new T.Sprite(new T.SpriteMaterial({map:tx, transparent:true, depthWrite:false, depthTest:o2.depthTest !== false})); const k = o2.k || .5; sp.scale.set(k * w / h, k, 1); sp.renderOrder = 20; sp.userData.yozuv = true; return sp;
  };
  H.tozala = g=>{ while(g.children.length){ const ch = g.children.pop(); ch.traverse(ob=>{ if(ob.geometry && !ob.geometry.userData.umumiy) ob.geometry.dispose(); if(ob.material){ (Array.isArray(ob.material) ? ob.material : [ob.material]).forEach(m=>{ if(m.userData.umumiy) return; if(m.map && !Object.values(texKesh).includes(m.map)) m.map.dispose(); m.dispose(); }); } }); } };
  /* canvas tekstura yordamchisi (protsedurali) */
  H.tex = (w, h, fn, takror)=>{ const cv = document.createElement('canvas'); cv.width = w; cv.height = h; fn(cv.getContext('2d'), w, h); const tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding; tx.anisotropy = 4; if(takror){ tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(takror[0], takror[1]); } return tx; };
  /* karta va ustida-yorliq */
  H.karta = kartaQur(sahna, uq);
  H.uch = document.createElement('div'); H.uch.className = 'ts-uch'; sahna.append(H.uch);
  S.el.addEventListener('pointermove', e=>{ const r = sahna.getBoundingClientRect(); H.uch.style.left = (e.clientX - r.left) + 'px'; H.uch.style.top = (e.clientY - r.top) + 'px'; });
  S.el.addEventListener('pointerleave', ()=>{ H.uch.style.display = 'none'; });
  H.uchYoz = (d)=>{ if(d && d.nom && !uq){ H.uch.style.display = 'block'; H.uch.textContent = H.nomlar && H.nomlar[d.nom] ? H.nomlar[d.nom] : d.nom; } else H.uch.style.display = 'none'; };
  S.ustida = d=>H.uchYoz(d);
  /* xavfsiz maydonga moslash: kamera markazini surish (setViewOffset) */
  let qV = 0, oldQ = '', fR = 0, fK = 0, fM = new T.Vector3();
  H.joy = (radius, markaz, kenglik)=>{ const m = markaz || new T.Vector3(); fR = radius; fK = kenglik || 0; fM.copy(m); oldQ = ''; moslash(true); };
  function moslash(snap){
    if(!fR) return;
    const W = sahna.clientWidth || 600, Hh = sahna.clientHeight || 400;
    const q = xavfsizMaydon(sahna, W, Hh, uq);
    let w = W - q.l - q.r, h = Hh - q.t - q.b, l = q.l, t = q.t;
    if(w < W * .38){ w = W - 24; l = 12; } if(h < Hh * .38){ h = Hh - 24; t = 12; }
    const kalitQ = [W, Hh, Math.round(l / 8), Math.round(t / 8), Math.round(w / 8), Math.round(h / 8)].join();
    if(kalitQ === oldQ) return; oldQ = kalitQ;
    const scx = l + w / 2, scy = t + h / 2;
    S.cam.aspect = W / Hh; S.cam.setViewOffset(W, Hh, W / 2 - scx, Hh / 2 - scy, W, Hh); S.cam.updateProjectionMatrix();
    const Re = Math.max(fR * Hh / Math.max(h, Hh * .42), fK * Hh / Math.max(w, W * .3));
    if(snap) S.joyla(Re, fM); else S.fokus(Re, fM, true);
  }
  H.kadr = null;
  S.kadrda = (dt, t)=>{ if(t - qV > .5){ qV = t; moslash(false); } if(H.kadr) H.kadr(dt, t); };
  const yopAsl = S.yopish;
  S.yopish = ()=>{ H.karta.remove(); H.uch.remove(); if(H.yopish) H.yopish(); Object.values(texKesh).forEach(t=>t.dispose()); yopAsl(); };
  return H;
}

/* ---------- boshqaruv paneli yordamchilari ---------- */
const SL = (id, nom, min, max, st, v, fmt)=>'<label>' + nom + ' <input type="range" data-p="' + id + '" min="' + min + '" max="' + max + '" step="' + st + '" value="' + v + '" aria-label="' + nom.replace(/<[^>]+>/g, '') + '"><b style="min-width:46px;text-align:right;font-family:\'JetBrains Mono\',monospace">' + (fmt ? fmt(v) : son(v)) + '</b></label>';
const TG = (attr, nom, faol, title)=>'<button ' + attr + ' class="' + (faol ? 'faol' : '') + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + nom + '</button>';
function slayderBog(tag, fmt, yangi){
  tag.querySelectorAll('[data-p]').forEach(x=>x.oninput = ()=>{ const v = +x.value; x.nextElementSibling.textContent = fmt[x.dataset.p] ? fmt[x.dataset.p](v) : son(v); yangi(x.dataset.p, v); });
}
function tugmaBog(tag, attr, fn){ tag.querySelectorAll('[' + attr + ']').forEach(b=>b.onclick = ()=>fn(b.getAttribute(attr), b)); }

/* registratsiya: boshlang‘ich holat (test savolida tsUq, aks holda 1-bosqich) */
function reg(nom, fn){
  SAHNA['ts_' + nom] = async (sahna, c)=>{
    const api = await fn(sahna, c);
    const d = c.d || {}, uq = uqMi(sahna);
    const bosh = uq && d.tsUq ? d.tsUq : (d.bosqichlar && d.bosqichlar[0] && d.bosqichlar[0].holat);
    if(api && api.holat && bosh) api.holat(bosh);
    return api;
  };
}


/* =====================================================================
   1. YOG‘OCH MATERIALLAR — 3D kesim, taxta, fanera, DSP, birikmalar
   ===================================================================== */
reg('yogoch', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.42, ry:.55, fov:30});
  const {S, T} = H;
  const s = {korinish:'kesim', birikma:'mix', ajrat:false, t:0};
  const G = new T.Group(); S.g.add(G);
  H.nomlar = {ozak:'O‘zak', halqa:'Yillik halqalar', postloq:'Po‘stloq', kambiy:'Kambiy (po‘stloq ostidagi yupqa qatlam)', taxta:'Taxta', brus:'Brus', qatlam:'Fanera qatlami (shpon)', dsp:'DSP — yog‘och-qirindili plita', laminat:'Laminat qoplama', mix:'Mix', shurup:'Shurup', yelim:'Yelim qatlami', shponka:'Shkant (dumaloq shponka)', tirnoq:'Tirnoqli birikma'};
  /* teksturalar */
  const halqaTex = H.tex(512, 512, (x, w, h)=>{
    x.fillStyle = '#d9b27a'; x.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    for(let r = 250; r > 0; r -= 1){
      const k = (r / 9) % 1, erta = k < .62;
      x.beginPath(); x.arc(cx + Math.sin(r * .13) * 2.5, cy + Math.cos(r * .11) * 2.5, r, 0, PI * 2);
      x.fillStyle = erta ? (r % 3 ? '#dcb77f' : '#d7b078') : '#9d6a3c'; x.fill();
    }
    x.fillStyle = '#6e4423'; x.beginPath(); x.arc(cx, cy, 7, 0, PI * 2); x.fill();
    x.strokeStyle = 'rgba(70,40,15,.35)'; x.lineWidth = 2;
    for(let i = 0; i < 7; i++){ const a = i * .9 + .3; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 248, cy + Math.sin(a) * 248); x.stroke(); }
  });
  const postloqTex = H.tex(256, 256, (x, w, h)=>{
    x.fillStyle = '#4a3220'; x.fillRect(0, 0, w, h);
    for(let i = 0; i < 260; i++){ x.fillStyle = 'rgba(' + (30 + Math.random() * 60 | 0) + ',' + (18 + Math.random() * 30 | 0) + ',10,.7)'; x.fillRect(Math.random() * w, Math.random() * h, 3 + Math.random() * 9, 14 + Math.random() * 60); }
  }, [3, 1]);
  const tolaTex = H.tex(512, 128, (x, w, h)=>{
    x.fillStyle = '#c9a26b'; x.fillRect(0, 0, w, h);
    for(let i = 0; i < 70; i++){ x.strokeStyle = 'rgba(120,75,35,' + (.15 + Math.random() * .35) + ')'; x.lineWidth = 1 + Math.random() * 2.5; x.beginPath(); const y = Math.random() * h; x.moveTo(0, y); for(let X = 0; X <= w; X += 32) x.lineTo(X, y + Math.sin(X * .02 + i) * 4); x.stroke(); }
  }, [1, 1]);
  const dspTex = H.tex(256, 256, (x, w, h)=>{
    x.fillStyle = '#b89468'; x.fillRect(0, 0, w, h);
    for(let i = 0; i < 700; i++){ x.save(); x.translate(Math.random() * w, Math.random() * h); x.rotate(Math.random() * PI); x.fillStyle = 'rgba(' + (90 + Math.random() * 120 | 0) + ',' + (60 + Math.random() * 80 | 0) + ',' + (25 + Math.random() * 40 | 0) + ',.85)'; x.fillRect(-6 - Math.random() * 10, -1, 12 + Math.random() * 20, 2 + Math.random() * 2); x.restore(); }
  }, [2, 2]);
  const yogM = (tex, p)=>{ const m = H.mat('#ffffff', Object.assign({map:tex, roughness:.72, metalness:0}, p || {})); return m; };
  const nomla = (m, nom)=>{ m.traverse ? m.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; }) : (m.userData.nom = nom); return m; };
  const yoz = (t, p, k)=>{ const sp = H.yozuv(t, {k:k || .34}); sp.position.copy(p); return sp; };

  function qur(){
    H.tozala(G);
    const K = s.korinish;
    if(K === 'kesim'){
      const r = 1.15, L = 1.9;
      const yon = new T.Mesh(new T.CylinderGeometry(r, r, L, 64, 1, true), yogM(postloqTex, {roughness:.95})); yon.rotation.z = PI / 2; nomla(yon, 'postloq'); G.add(yon);
      const qop = new T.Mesh(new T.CircleGeometry(r, 64), yogM(halqaTex)); qop.position.x = L / 2 + .001; qop.rotation.y = PI / 2; nomla(qop, 'halqa'); G.add(qop);
      const qop2 = qop.clone(); qop2.position.x = -L / 2 - .001; qop2.rotation.y = -PI / 2; G.add(qop2);
      const kam = new T.Mesh(new T.RingGeometry(r * .94, r * .975, 64), H.mat('#8fd36b', {transparent:true, opacity:.9, side:T.DoubleSide})); kam.position.x = L / 2 + .004; kam.rotation.y = PI / 2; nomla(kam, 'kambiy'); G.add(kam);
      const oz = new T.Mesh(new T.CircleGeometry(.06, 24), H.mat('#5a3516')); oz.position.x = L / 2 + .004; oz.rotation.y = PI / 2; nomla(oz, 'ozak'); G.add(oz);
      G.add(H.poydevor(2.1, -r - .02));
      G.add(yoz('po‘stloq', new T.Vector3(.2, r + .35, 0)), yoz('yillik halqalar', new T.Vector3(L / 2 + .3, .55, .5)), yoz('o‘zak', new T.Vector3(L / 2 + .35, -.1, -.55)), yoz('kambiy', new T.Vector3(L / 2 + .25, r * .95 + .22, .2)));
      G.rotation.y = .75;
      H.joy(2.1, new T.Vector3(0, 0, 0), 2.6);
      H.karta.yoz('Texnologiya · yog‘och kesimi', 'Yillik halqalar', '<div class="q"><span>Och qatlam</span><b class="y">bahor–yoz yog‘ochi</b><span>To‘q qatlam</span><b class="k">kuz yog‘ochi</b><span>1 halqa</span><b>1 yil</b></div><div class="iz">Halqalarni sanab daraxt yoshini bilish mumkin. Qismlarni bosing.</div>');
    } else if(K === 'taxta'){
      const t = new T.Mesh(new T.BoxGeometry(3, .22, .9), yogM(tolaTex)); t.position.set(0, -.6, .3); nomla(t, 'taxta'); G.add(t);
      const b = new T.Mesh(new T.BoxGeometry(2.6, .5, .5), yogM(tolaTex)); b.position.set(-.2, .25, -.7); nomla(b, 'brus'); G.add(b);
      const r = new T.Mesh(new T.BoxGeometry(2.4, .12, .35), yogM(tolaTex)); r.position.set(.3, .96, -.1); nomla(r, 'reyka'); G.add(r);
      G.add(H.poydevor(2.2, -.72));
      G.add(yoz('taxta', new T.Vector3(1.2, -.2, .9)), yoz('brus', new T.Vector3(-1.4, .8, -.7)), yoz('reyka', new T.Vector3(1.5, 1.3, -.1)));
      H.nomlar.reyka = 'Reyka';
      H.joy(2.2, new T.Vector3(0, .1, 0), 3.1);
      H.karta.yoz('Texnologiya · tilingan materiallar', 'Taxta · brus · reyka', '<div class="q"><span>Taxta</span><b>kenglik &gt; 2·qalinlik</b><span>Brus</span><b>kenglik ≤ 2·qalinlik</b><span>Reyka</span><b>yupqa, tor</b></div><div class="iz">Tilingan material — g‘o‘lani uzunasiga arralash natijasi. Yuzadagi tolalar — yog‘och tolalari yo‘nalishi.</div>');
    } else if(K === 'fanera'){
      const n = 5, qal = .14;
      for(let i = 0; i < n; i++){
        const q = new T.Mesh(new T.BoxGeometry(2.6, qal, 1.8), yogM(tolaTex, {color:H.rang(i % 2 ? '#e3c594' : '#c9a26b')}));
        q.position.y = -.4 + i * (qal + (s.ajrat ? .22 : .004)); if(i % 2) q.rotation.y = PI / 2, q.scale.set(1.8 / 2.6, 1, 2.6 / 1.8);
        nomla(q, 'qatlam'); q.userData.qatlam = i + 1; G.add(q);
      }
      G.add(H.poydevor(2.1, -.5));
      G.add(yoz('5 qatlam, tolalar ko‘ndalang', new T.Vector3(0, s.ajrat ? 1.5 : .45, 0)));
      H.joy(2, new T.Vector3(0, s.ajrat ? .4 : 0, 0), 2.9);
      H.karta.yoz('Texnologiya · fanera', 'Qatlamlar soni — toq', '<div class="q"><span>Qatlam</span><b>shpon ≈ 1–3 mm</b><span>Yo‘nalish</span><b>har qatlam 90° burilgan</b><span>Yelim</span><b>qatlamlar orasida</b></div><div class="iz">Toq son (3, 5, 7…) — tashqi qatlamlar tolalari bir yo‘nalishda bo‘lib, plita qiyshaymaydi.</div>');
    } else if(K === 'dsp'){
      const d = new T.Mesh(new T.BoxGeometry(2.6, .36, 1.8), yogM(dspTex, {roughness:.9})); d.position.y = -.2; nomla(d, 'dsp'); G.add(d);
      const l = new T.Mesh(new T.BoxGeometry(2.62, .03, 1.82), H.mat('#e9dcc8', {roughness:.35})); l.position.y = -.2 + .195; nomla(l, 'laminat'); G.add(l);
      const kes = new T.Mesh(new T.PlaneGeometry(1.8, .36), yogM(dspTex, {roughness:.95})); kes.position.set(1.301, -.2, 0); kes.rotation.y = PI / 2; nomla(kes, 'dsp'); G.add(kes);
      G.add(H.poydevor(2.1, -.4));
      G.add(yoz('qirindi + yelim, presslangan', new T.Vector3(0, .45, .2)), yoz('laminat', new T.Vector3(1.0, .25, -.9)));
      H.joy(2, new T.Vector3(0, 0, 0), 2.9);
      H.karta.yoz('Texnologiya · DSP', 'Yog‘och-qirindili plita', '<div class="q"><span>Tarkib</span><b>qirindi + smola</b><span>Qoplama</span><b>laminat / shpon</b><span>Kamchilik</span><b>nam va shurupga chidamsiz</b></div><div class="iz">Mebelda eng ko‘p ishlatiladigan plita; formaldegid chiqishi bo‘yicha E1 sinfi tanlanadi.</div>');
    } else {
      const a = new T.Mesh(new T.BoxGeometry(2.2, .28, 1.2), yogM(tolaTex)); a.position.set(0, -.5, 0); nomla(a, 'taxta'); G.add(a);
      const b = new T.Mesh(new T.BoxGeometry(1.2, .28, 1.2), yogM(tolaTex)); b.position.set(-.5, -.5 + .28, 0); b.rotation.z = 0; nomla(b, 'taxta'); G.add(b);
      /* ikkinchi taxta tik: burchakli birikma */
      b.geometry.dispose(); b.geometry = new T.BoxGeometry(.28, 1.3, 1.2); b.position.set(-.96, .29, 0);
      const BR = s.birikma;
      if(BR === 'mix'){
        [-.35, .35].forEach(z=>{ const m = H.tayoq(new T.Vector3(-1.35, .35, z), new T.Vector3(-.35, .35, z), .025, H.metall('#c9ced8')); nomla(m, 'mix'); G.add(m); const bosh = H.sil(.07, .07, .02, H.metall('#c9ced8')); bosh.rotation.z = PI / 2; bosh.position.set(-1.12, .35, z); nomla(bosh, 'mix'); G.add(bosh); });
        G.add(yoz('mix — bolg‘a bilan qoqiladi', new T.Vector3(-1.2, 1.25, 0)));
      } else if(BR === 'shurup'){
        [-.35, .35].forEach(z=>{ const m = H.tayoq(new T.Vector3(-1.3, .35, z), new T.Vector3(-.3, .35, z), .03, H.metall('#d8c48a')); nomla(m, 'shurup'); G.add(m); for(let i = 0; i < 9; i++){ const t = H.tor(.045, .008, H.metall('#d8c48a')); t.rotation.y = PI / 2; t.position.set(-1.05 + i * .085, .35, z); nomla(t, 'shurup'); G.add(t); } const bosh = H.sil(.075, .04, .04, H.metall('#d8c48a')); bosh.rotation.z = PI / 2; bosh.position.set(-1.12, .35, z); nomla(bosh, 'shurup'); G.add(bosh); const kes = new T.Mesh(new T.BoxGeometry(.012, .1, .02), H.mat('#2a2a2a')); kes.position.set(-1.145, .35, z); G.add(kes); const kes2 = kes.clone(); kes2.rotation.x = PI / 2; G.add(kes2); });
        G.add(yoz('shurup — rezbali, buraladi', new T.Vector3(-1.2, 1.25, 0)));
      } else if(BR === 'yelim'){
        const y = new T.Mesh(new T.BoxGeometry(.03, 1.28, 1.18), H.mat('#ffd36b', {transparent:true, opacity:.85, emissive:H.rang('#7a5a10')})); y.position.set(-.805, .29, 0); nomla(y, 'yelim'); G.add(y);
        const qis = new T.Mesh(new T.TorusGeometry(.5, .05, 10, 30, PI), H.metall('#7a8190')); qis.position.set(-.75, 1.0, .0); qis.rotation.y = PI / 2; qis.rotation.z = PI; G.add(qis);
        G.add(yoz('yelim — PVA, qisqichda quritiladi', new T.Vector3(-1.1, 1.45, 0)));
      } else if(BR === 'shponka'){
        [-.3, .3].forEach(z=>{ const m = H.tayoq(new T.Vector3(-1.1, .35, z), new T.Vector3(-.45, .35, z), .045, yogM(tolaTex, {color:H.rang('#e8cfa0')})); nomla(m, 'shponka'); G.add(m); });
        b.position.x = -1.05; b.material = yogM(tolaTex, {transparent:true, opacity:.55});
        G.add(yoz('shkant — teshikka yelim bilan kiritiladi', new T.Vector3(-1.1, 1.25, 0)));
      } else {
        b.position.set(-.96, .29, 0);
        for(let i = 0; i < 3; i++){ const tish = new T.Mesh(new T.BoxGeometry(.28, .2, .36), yogM(tolaTex, {color:H.rang('#b98a55')})); tish.position.set(-.96, -.46 + i * .0 , -.4 + i * .4); nomla(tish, 'tirnoq'); G.add(tish); }
        G.add(yoz('tirnoqli (shipli) birikma', new T.Vector3(-1.1, 1.25, 0)));
      }
      G.add(H.poydevor(2.1, -.66));
      H.joy(2, new T.Vector3(-.4, .1, 0), 3);
      const IZ = {mix:'Mix tez va arzon, lekin tolalar bo‘ylab yorishi mumkin — chetdan kamida 10–15 mm masofa qoldiriladi.', shurup:'Shurup mixdan mustahkam ushlaydi, qayta ajratish mumkin; qattiq yog‘ochda avval ingichka teshik ochiladi.', yelim:'PVA yelim yuzalarni tozalab surtiladi, qisqichda 20–30 daqiqa qisib, to‘liq quritiladi (tayyorlovchi ko‘rsatmasi).', shponka:'Shkant — dumaloq yog‘och tayoqcha; ikki detaldagi teshikka yelim bilan kiritiladi, mebelda eng ko‘p ishlatiladi.', tirnoq:'Tirnoqlar (shiplar) bir-biriga kiradi — yuza katta, yelim bilan juda mustahkam. Qutilar, tortmalar uchun.'};
      H.karta.yoz('Texnologiya · birikma', {mix:'Mixli', shurup:'Shurupli', yelim:'Yelimli', shponka:'Shkantli', tirnoq:'Tirnoqli'}[BR] + ' birikma', '<div class="iz">' + IZ[BR] + '</div>');
    }
  }
  const tagChiz = ()=>{
    tag.innerHTML = [['kesim', 'G‘o‘la kesimi'], ['taxta', 'Taxta va brus'], ['fanera', 'Fanera'], ['dsp', 'DSP'], ['birikma', 'Birikmalar']].map(([k, n])=>TG('data-k="' + k + '"', n, s.korinish === k)).join('') +
      (s.korinish === 'fanera' ? TG('data-aj="1"', s.ajrat ? 'Yig‘ish' : 'Qatlamlarga ajratish', s.ajrat) : '') +
      (s.korinish === 'birikma' ? '<span class="ts-ajr"></span>' + [['mix', 'Mix'], ['shurup', 'Shurup'], ['yelim', 'Yelim'], ['shponka', 'Shkant'], ['tirnoq', 'Tirnoq']].map(([k, n])=>TG('data-b="' + k + '"', n, s.birikma === k)).join('') : '');
    tugmaBog(tag, 'data-k', k=>{ s.korinish = k; qur(); tagChiz(); hodisa('ts-yogoch', {korinish:k, birikma:s.birikma}); });
    tugmaBog(tag, 'data-aj', ()=>{ s.ajrat = !s.ajrat; qur(); tagChiz(); hodisa('ts-yogoch', {korinish:s.korinish, ajrat:s.ajrat}); });
    tugmaBog(tag, 'data-b', k=>{ s.birikma = k; qur(); tagChiz(); hodisa('ts-yogoch', {korinish:'birikma', birikma:k}); });
  };
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-yogoch', {bos:d.nom, korinish:s.korinish, birikma:s.birikma, qatlam:d.qatlam}); detal('ts_yogoch', d.nom); };
  H.kadr = dt=>{ s.t += dt; if(s.korinish === 'kesim') G.rotation.y = .75 + Math.sin(s.t * .4) * .12; else G.rotation.y = 0; };
  S.holat = h=>{ if(!h) return; if(h.korinish) s.korinish = h.korinish; if(h.birikma) s.birikma = h.birikma; if(h.ajrat !== undefined) s.ajrat = !!h.ajrat; qur(); tagChiz(); };
  yorliq('Texnologiya · yog‘och materiallar (protsedurali 3D)');
  izoh.innerHTML = 'Qismlarni bosing — ma’lumot kartasi chiqadi. Pastdagi tugmalar bilan materialni almashtiring.';
  qur(); tagChiz();
  return S;
});

/* =====================================================================
   2. UY ELEKTR JIHOZLARI VA XAVFSIZLIK — vilka, rozetka, avtomat
   ===================================================================== */
reg('elektr', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.22, ry:-.35, fov:30, rxMin:-.2, rxMax:.9});
  const {S, T} = H;
  const s = {rejim:'vilka', tok:5, nominal:16, uzildi:false, yoqiq:true, t:0, qadam:0, uchqun:0};
  H.nomlar = {vilka:'Vilka (shtepsel)', rozetka:'Rozetka', avtomat:'Avtomatik o‘chirgich (saqlagich)', bimetall:'Bimetall plastina (issiqlik ajratgich)', magnit:'Elektromagnit ajratgich', yer:'Yerga ulash kontakti (PE)', kabel:'Kabel', lampa:'Iste’molchi (chiroq)', richag:'Avtomat richagi', faza:'Faza simi (L)', nol:'Nol simi (N)'};
  const G = new T.Group(); S.g.add(G);
  const nomla = (m, nom)=>{ m.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; }); return m; };
  const yoz = (t, x, y, z, k)=>{ const sp = H.yozuv(t, {k:k || .3}); sp.position.set(x, y, z); G.add(sp); return sp; };
  /* devor */
  const devor = new T.Mesh(new T.BoxGeometry(6.2, 3.2, .12), H.mat('#2a2f4e', {roughness:.85})); devor.position.set(0, .6, -1.2); G.add(devor);
  G.add(H.poydevor(3.4, -1.0, '#161a30'));
  /* avtomat (chapda), kesimli */
  const AV = new T.Group(); AV.position.set(-2.1, .9, -1.05); G.add(AV);
  const korp = H.quti(.7, 1.1, .28, H.plast('#e9ecf3'), .03); nomla(korp, 'avtomat'); AV.add(korp);
  const ich = new T.Mesh(new T.BoxGeometry(.6, .95, .08), H.mat('#1d2238')); ich.position.z = .11; AV.add(ich);
  const bim = new T.Mesh(new T.BoxGeometry(.08, .45, .03), H.metall('#d0a35b')); bim.position.set(-.14, -.12, .15); nomla(bim, 'bimetall'); AV.add(bim);
  const mag = new T.Group(); for(let i = 0; i < 7; i++){ const t = H.tor(.07, .014, H.metall('#c47a3a')); t.position.set(.14, -.3 + i * .055, .15); mag.add(t); } nomla(mag, 'magnit'); AV.add(mag);
  const yadro = H.sil(.035, .035, .5, H.metall('#8e949f')); yadro.position.set(.14, -.1, .15); nomla(yadro, 'magnit'); AV.add(yadro);
  const kontakt = new T.Mesh(new T.BoxGeometry(.2, .05, .04), H.metall('#d9dde6')); kontakt.position.set(0, .32, .15); nomla(kontakt, 'avtomat'); AV.add(kontakt);
  const richag = new T.Group(); const rg = H.quti(.16, .3, .08, H.plast('#2a7bff'), .02); rg.position.y = .12; richag.add(rg); richag.position.set(0, .35, .2); nomla(richag, 'richag'); AV.add(richag);
  const yozAv = yoz('avtomat 16 A', -2.1, 1.75, -1.0, .3);
  /* rozetka (devorda) */
  const RZ = new T.Group(); RZ.position.set(.55, .55, -1.12); G.add(RZ);
  const ramka = H.quti(.95, .95, .06, H.plast('#f2f3f7'), .04); nomla(ramka, 'rozetka'); RZ.add(ramka);
  const chuq = H.sil(.33, .33, .08, H.plast('#dfe2ea'), 48); chuq.rotation.x = PI / 2; chuq.position.z = .02; nomla(chuq, 'rozetka'); RZ.add(chuq);
  [-.095, .095].forEach(x=>{ const t = H.sil(.035, .035, .1, H.mat('#0a0c16')); t.rotation.x = PI / 2; t.position.set(x, 0, .04); nomla(t, 'rozetka'); RZ.add(t); });
  const yerK = []; [-.34, .34].forEach(y=>{ const k = new T.Mesh(new T.BoxGeometry(.1, .05, .06), H.metall('#d9b35a')); k.position.set(0, y * .9, .06); nomla(k, 'yer'); RZ.add(k); yerK.push(k); });
  /* vilka (F turi) */
  const VL = new T.Group(); G.add(VL);
  const vk = H.quti(.5, .5, .45, H.plast('#2b2f45'), .08); nomla(vk, 'vilka'); VL.add(vk);
  [-.095, .095].forEach(x=>{ const p = H.sil(.033, .033, .36, H.metall('#c9ced8')); p.rotation.x = PI / 2; p.position.set(x, 0, -.36); nomla(p, 'vilka'); VL.add(p); });
  const vyer = []; [-.27, .27].forEach(y=>{ const k = new T.Mesh(new T.BoxGeometry(.12, .04, .18), H.metall('#d9b35a')); k.position.set(0, y, -.1); nomla(k, 'yer'); VL.add(k); vyer.push(k); });
  /* kabel: vilkadan chiroqqa */
  const kabelM = H.plast('#1b1f33');
  const yol = new T.CatmullRomCurve3([new T.Vector3(.55, .55, -.55), new T.Vector3(1.0, .4, 0), new T.Vector3(1.6, -.2, .5), new T.Vector3(2.2, -.6, .4), new T.Vector3(2.5, -.4, 0)]);
  const kabel = new T.Mesh(new T.TubeGeometry(yol, 60, .035, 10, false), kabelM); nomla(kabel, 'kabel'); G.add(kabel);
  /* chiroq (iste'molchi) */
  const LM = new T.Group(); LM.position.set(2.5, -.4, 0); G.add(LM);
  const taglik = H.sil(.35, .4, .12, H.metall('#6b7180')); nomla(taglik, 'lampa'); LM.add(taglik);
  const ust = H.sil(.03, .03, 1.0, H.metall('#8e949f')); ust.position.y = .55; LM.add(ust);
  const qalpoq = H.sil(.12, .4, .45, H.plast('#d8c7a6'), 40, true); qalpoq.position.y = 1.15; qalpoq.material.side = T.DoubleSide; nomla(qalpoq, 'lampa'); LM.add(qalpoq);
  const lampaM = new T.MeshStandardMaterial({color:H.rang('#fff2c7'), emissive:H.rang('#ffd27a'), emissiveIntensity:1.4, roughness:.3}); lampaM.userData.env = 1;
  const lamp = H.shar(.11, lampaM, 24); lamp.position.y = 1.0; nomla(lamp, 'lampa'); LM.add(lamp);
  const nurS = H.nur('#ffd98a', 1.6); nurS.position.y = 1.0; LM.add(nurS);
  /* avtomatdan rozetkagacha devor ichidagi simlar (L, N, PE) */
  const simYol = (y, hex, z)=>{ const cv = new T.CatmullRomCurve3([new T.Vector3(-1.75, y, z), new T.Vector3(-.6, y, z), new T.Vector3(.1, .55 + (y - .9) * .4, z), new T.Vector3(.4, .55, z)]); const m = new T.Mesh(new T.TubeGeometry(cv, 40, .022, 8, false), H.plast(hex)); return {m, cv}; };
  const L = simYol(1.0, '#c9742c', -1.05), N = simYol(.9, '#3a7bd5', -1.08), PE = simYol(.8, '#d3d61e', -1.11);
  nomla(L.m, 'faza'); nomla(N.m, 'nol'); nomla(PE.m, 'yer'); G.add(L.m, N.m, PE.m);
  PE.m.material.color = H.rang('#b8d13a');
  /* tok zarrachalari */
  const zar = new T.Group(); G.add(zar);
  const zarM = new T.MeshBasicMaterial({color:H.rang('#ffe28a')}); zarM.userData.env = 1;
  const Z = []; for(let i = 0; i < 26; i++){ const m = H.shar(.03, zarM, 8); m.userData.f = i / 26; m.userData.yol = i < 13 ? L.cv : yol; zar.add(m); Z.push(m); }
  const uchqun = H.nur('#9fd0ff', 1.2); uchqun.position.set(.55, .55, -.7); uchqun.visible = false; G.add(uchqun);
  const yozT = yoz('tok: 5 A', .55, 1.45, -1.0, .3);
  const yozlar = {vilka:yoz('vilka', .55, -.35, .2, .26), rozetka:yoz('rozetka', 1.35, .95, -1.0, .26), avtomat:yoz('bimetall · elektromagnit', -2.1, .05, -.8, .24), yer:yoz('PE — yerga ulash', -.4, .35, -.9, .24), lampa:yoz('iste’molchi', 2.5, 1.85, 0, .26)};

  const hisob = ()=>{
    const qisqa = s.rejim === 'qisqa';
    const I = qisqa ? 500 : s.tok;
    s.uzildi = s.uzildi || I > s.nominal * 1.45 || qisqa;
    s.yoqiq = !s.uzildi && I > 0;
    richag.rotation.x = s.uzildi ? .9 : -.2;
    lampaM.emissiveIntensity = s.yoqiq ? 1.4 : 0; nurS.visible = s.yoqiq;
    uchqun.visible = qisqa && !s.uzildi;
    const nominalDan = s.tok > s.nominal && !qisqa;
    bim.material.color = H.rang(nominalDan || s.uzildi && !qisqa ? '#ff7a4d' : '#d0a35b');
    bim.rotation.z = s.uzildi && !qisqa ? -.25 : (nominalDan ? -.12 : 0);
    yozT.material.map.dispose(); const yangi = H.yozuv(qisqa ? 'QISQA TUTASHUV — avtomat uzdi' : 'tok: ' + son(s.tok, 1) + ' A · avtomat ' + s.nominal + ' A' + (s.uzildi ? ' · UZILDI' : ''), {k:.3, chet:s.uzildi ? 'rgba(255,90,90,.9)' : undefined}); yozT.material = yangi.material; yozT.scale.copy(yangi.scale);
    yerK.concat(vyer).forEach(k=>{ k.material.emissive = H.rang(s.rejim === 'yerga' ? '#6a5a10' : '#000'); });
    Object.keys(yozlar).forEach(k=>yozlar[k].visible = !H.uq); yozAv.visible = yozT.visible = !H.uq;
    H.karta.yoz('Texnologiya · uy elektr tarmog‘i', (qisqa ? 'I → juda katta' : 'I = ' + son(s.tok, 1) + ' A') + (s.uzildi ? ' <small>avtomat uzdi</small>' : ''),
      '<div class="q"><span>Tarmoq</span><b>220/230 V, 50 Hz</b><span>Avtomat</span><b>' + s.nominal + ' A</b><span>Holat</span><b class="' + (s.uzildi ? 'p' : 's') + '">' + (s.uzildi ? 'uzilgan' : 'ulangan') + '</b></div><div class="iz">' +
      ({vilka:'Vilka pinlari rozetka kontaktlariga kiradi; F turida yon tomonda yerga ulash (PE) kontaktlari bor.', rozetka:'Rozetka devor ichidagi L (faza), N (nol) va PE simlariga ulanadi. Himoya qopqoqli (bolalar uchun) rozetkalar tavsiya etiladi.', avtomat:'Avtomat ikki ajratgichli: bimetall plastina ortiqcha yuklanishda sekin qiziydi va egiladi; elektromagnit qisqa tutashuvda bir zumda uzadi.', qisqa:'Qisqa tutashuv — L va N bevosita tutashdi: tok yuzlab amperga oshadi, elektromagnit ajratgich millisekundlarda uzadi.', yerga:'Korpusga faza tegib qolsa, tok PE sim orqali yerga oqadi va avtomat/UZO uzadi — odam emas, sim «yo‘l» bo‘ladi.'}[s.rejim]) + '</div>');
  };
  const tagChiz = ()=>{
    tag.innerHTML = [['vilka', 'Vilka'], ['rozetka', 'Rozetka'], ['avtomat', 'Avtomat'], ['qisqa', 'Qisqa tutashuv'], ['yerga', 'Yerga ulash']].map(([k, n])=>TG('data-r="' + k + '"', n, s.rejim === k)).join('') +
      SL('tok', 'Tok, A', 0, 30, .5, s.tok, v=>son(v, 1) + ' A') + TG('data-t="1"', 'Avtomatni qayta yoqish', false);
    tugmaBog(tag, 'data-r', k=>{ s.rejim = k; if(k !== 'qisqa') uchqun.visible = false; if(k === 'qisqa') s.uchqun = 0; hisob(); tagChiz(); hodisa('ts-elektr', {rejim:k, tok:s.tok, uzildi:s.uzildi}); });
    tugmaBog(tag, 'data-t', ()=>{ if(s.rejim === 'qisqa') s.rejim = 'avtomat'; s.uzildi = false; hisob(); tagChiz(); hodisa('ts-elektr', {rejim:s.rejim, tok:s.tok, uzildi:s.uzildi, qaytaYoq:true}); });
    slayderBog(tag, {tok:v=>son(v, 1) + ' A'}, (k, v)=>{ s.tok = v; hisob(); hodisa('ts-elektr', {rejim:s.rejim, tok:s.tok, uzildi:s.uzildi}); });
  };
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-elektr', {bos:d.nom, rejim:s.rejim, tok:s.tok, uzildi:s.uzildi}); detal('ts_elektr', d.nom); };
  /* tartib amaliyoti: qadamni ajratib ko‘rsatish */
  const QAD = {1:[richag, AV], 2:[VL], 3:[kabel], 4:[LM], 5:[RZ], 6:[AV]};
  S.ajratQism = (n, v)=>{ Object.keys(QAD).forEach(k=>QAD[k].forEach(o=>o.traverse(m=>{ if(m.isMesh && m.material && m.material.emissive !== undefined && m !== lamp) m.material.emissive = H.rang('#000'); }))); if(v && QAD[n]) QAD[n].forEach(o=>o.traverse(m=>{ if(m.isMesh && m.material && m.material.emissive !== undefined && m !== lamp) m.material.emissive = H.rang('#5a3fcf'); })); };
  H.kadr = (dt, t)=>{
    s.t += dt;
    const I = s.rejim === 'qisqa' && !s.uzildi ? 60 : (s.yoqiq ? s.tok : 0);
    const tez = cl(I / 8, 0, 3);
    Z.forEach(m=>{ m.visible = I > 0; if(I <= 0) return; m.userData.f = (m.userData.f + dt * .18 * tez) % 1; const p = m.userData.yol.getPointAt(cl(m.userData.f, 0, .999)); m.position.copy(p); if(m.userData.yol === L.cv) m.position.z += .03; else m.position.y += .045; });
    if(s.rejim === 'qisqa' && !s.uzildi){ s.uchqun += dt; uchqun.scale.setScalar(1 + Math.sin(s.t * 40) * .3); if(s.uchqun > 1.1){ s.uzildi = true; hisob(); hodisa('ts-elektr', {rejim:'qisqa', uzildi:true, avto:true}); } }
    VL.position.set(.55, .55, s.rejim === 'vilka' ? -.55 + Math.sin(s.t * 1.2) * .12 + .12 : -.52);
    VL.rotation.y = 0;
    const zoom = {vilka:[1.6, new T.Vector3(.6, .5, -.4)], rozetka:[1.5, new T.Vector3(.6, .55, -.9)], avtomat:[1.4, new T.Vector3(-2.0, .85, -.9)], qisqa:[2.6, new T.Vector3(-.3, .5, -.5)], yerga:[2.6, new T.Vector3(-.3, .5, -.5)]}[s.rejim];
    H.joy(zoom[0], zoom[1], zoom[0] * 1.5);
  };
  S.holat = h=>{ if(!h) return; if(h.rejim) s.rejim = h.rejim; if(h.tok !== undefined) s.tok = cl(+h.tok, 0, 30); if(h.nominal !== undefined) s.nominal = +h.nominal; if(h.uzildi !== undefined) s.uzildi = !!h.uzildi; else if(h.rejim && h.rejim !== 'qisqa') s.uzildi = false; s.uchqun = 0; hisob(); tagChiz(); };
  yorliq('Texnologiya · uy elektr jihozlari (sxematik 3D)');
  izoh.innerHTML = 'Tok slayderini 16 A dan oshiring — bimetall plastina qizib avtomatni uzadi. Qismlarni bosing.';
  hisob(); tagChiz();
  return S;
});

/* =====================================================================
   3. MEXANIK UZATMALAR — tishli g‘ildirak, tasma, zanjir (3D, animatsiya)
   ===================================================================== */
reg('uzatma', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.35, ry:.0, fov:30, rxMin:-.3, rxMax:1.2});
  const {S, T} = H;
  const s = {rejim:'tishli', z1:12, z2:36, n1:60, ijro:true, th:0, t:0};
  const M = .11; /* modul (sahna birligida) */
  H.nomlar = {g1:'Yetaklovchi g‘ildirak (z₁)', g2:'Yetaklanuvchi g‘ildirak (z₂)', tasma:'Tasma', zanjir:'Zanjir', shkiv1:'Yetaklovchi shkiv (D₁)', shkiv2:'Yetaklanuvchi shkiv (D₂)', val:'Val', yulduz1:'Yetaklovchi yulduzcha (z₁)', yulduz2:'Yetaklanuvchi yulduzcha (z₂)'};
  const G = new T.Group(); S.g.add(G);
  const nomla = (m, nom)=>{ m.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; }); return m; };
  function tishliGeo(z, m, qal){
    const r = m * z / 2, ra = r + m, rf = r - 1.25 * m, sh = new T.Shape(), n = z * 4;
    for(let i = 0; i < n; i++){
      const a = i / n * PI * 2, k = i % 4, rr = k === 0 || k === 3 ? rf : ra, a2 = a + (k === 0 ? .2 : k === 1 ? -.05 : k === 2 ? .05 : -.2) * PI * 2 / z;
      const x = Math.cos(a2) * rr, y = Math.sin(a2) * rr; if(i) sh.lineTo(x, y); else sh.moveTo(x, y);
    }
    sh.closePath();
    const teshik = new T.Path(); teshik.absarc(0, 0, Math.max(.12, r * .22), 0, PI * 2, true); sh.holes.push(teshik);
    const g = new T.ExtrudeGeometry(sh, {depth:qal, bevelEnabled:true, bevelThickness:.015, bevelSize:.012, bevelSegments:2}); g.translate(0, 0, -qal / 2); return g;
  }
  function gildirak(z, hex, nom, qal){
    const gg = new T.Group();
    const m = new T.Mesh(tishliGeo(z, M, qal || .32), H.metall(hex, {roughness:.35})); nomla(m, nom); gg.add(m);
    const r = M * z / 2;
    const val = H.sil(Math.max(.11, r * .2), Math.max(.11, r * .2), (qal || .32) + .5, H.metall('#6c7384')); val.rotation.x = PI / 2; nomla(val, 'val'); gg.add(val);
    if(z > 18){ for(let i = 0; i < 5; i++){ const t = H.sil(.07, .07, r * .55, H.mat('#1a1e33')); t.rotation.x = PI / 2; t.position.set(Math.cos(i / 5 * PI * 2) * r * .58, Math.sin(i / 5 * PI * 2) * r * .58, 0); t.scale.set(1, 1, (qal || .32) * 3.4); nomla(t, nom); gg.add(t); } }
    const belgi = new T.Mesh(new T.BoxGeometry(.06, r * .9, .02), new T.MeshBasicMaterial({color:H.rang('#fff')})); belgi.position.set(0, r * .5, (qal || .32) / 2 + .02); belgi.material.userData.env = 1; gg.add(belgi);
    gg.userData.r = r; return gg;
  }
  function shkiv(D, hex, nom){
    const gg = new T.Group(); const r = D / 2;
    const d = H.sil(r, r, .3, H.metall(hex, {roughness:.4}), 56); d.rotation.x = PI / 2; nomla(d, nom); gg.add(d);
    const ariq = H.sil(r * .93, r * .93, .32, H.mat('#1f2438'), 56); ariq.rotation.x = PI / 2; nomla(ariq, nom); gg.add(ariq);
    const val = H.sil(.1, .1, .8, H.metall('#6c7384')); val.rotation.x = PI / 2; nomla(val, 'val'); gg.add(val);
    const belgi = new T.Mesh(new T.BoxGeometry(.06, r * .8, .02), new T.MeshBasicMaterial({color:H.rang('#fff')})); belgi.position.set(0, r * .5, .17); belgi.material.userData.env = 1; gg.add(belgi);
    gg.userData.r = r; return gg;
  }
  let g1, g2, bogl = null, link = [];
  function qur(){
    H.tozala(G); link = []; bogl = null;
    const R1 = M * s.z1 / 2, R2 = M * s.z2 / 2;
    if(s.rejim === 'tishli'){
      g1 = gildirak(s.z1, '#c9ced8', 'g1'); g2 = gildirak(s.z2, '#d9b35a', 'g2');
      g1.position.x = -(R1 + R2) / 2 - .0; g2.position.x = (R1 + R2) / 2; g1.position.x = -(R1 + R2) / 2;
      g1.position.x = -R2 ; g2.position.x = R1; /* markazlar masofasi R1+R2 */
      G.add(g1, g2);
    } else {
      const or = s.rejim === 'tasma'; const ms = R1 + R2 + 1.6;
      g1 = or ? shkiv(R1 * 2, '#c9ced8', 'shkiv1') : gildirak(s.z1, '#c9ced8', 'yulduz1', .18);
      g2 = or ? shkiv(R2 * 2, '#d9b35a', 'shkiv2') : gildirak(s.z2, '#d9b35a', 'yulduz2', .18);
      g1.position.x = -ms / 2; g2.position.x = ms / 2; G.add(g1, g2);
      /* tasma/zanjir yo‘li: ikki aylana atrofidagi tashqi urinma */
      const r1 = or ? R1 : R1 + M * .3, r2 = or ? R2 : R2 + M * .3, dx = ms, al = Math.asin((r2 - r1) / dx);
      const pts = [];
      const yoy = (cx, r, a0, a1, n)=>{ for(let i = 0; i <= n; i++){ const a = a0 + (a1 - a0) * i / n; pts.push(new T.Vector3(cx + Math.cos(a) * r, Math.sin(a) * r, 0)); } };
      yoy(g2.position.x, r2, PI / 2 - al, -PI / 2 + al, 24);
      yoy(g1.position.x, r1, -PI / 2 + al, -3 * PI / 2 + al, 24);
      const cv = new T.CatmullRomCurve3(pts, true, 'catmullrom', .0);
      if(or){ bogl = new T.Mesh(new T.TubeGeometry(cv, 120, .045, 8, true), H.plast('#2b2b2b', {roughness:.8})); bogl.scale.z = 2.6; nomla(bogl, 'tasma'); G.add(bogl); }
      else { const L = cv.getLength(), n = Math.round(L / .16); for(let i = 0; i < n; i++){ const b = H.quti(.12, .05, .14, H.metall('#9aa0ad', {roughness:.5}), .01); b.userData.f = i / n; nomla(b, 'zanjir'); G.add(b); link.push(b); } bogl = {cv}; }
    }
    G.add(H.poydevor(Math.max(2.2, (R1 + R2) * 1.5 + .8), -Math.max(R1, R2) - .55));
    H.joy(Math.max(R1, R2) + .9, new T.Vector3((g1.position.x + g2.position.x) / 2, 0, 0), (g2.position.x - g1.position.x) / 2 + Math.max(R1, R2) + .6);
    yoz();
  }
  const i_ = ()=>s.z2 / s.z1;
  function yoz(){
    const i = i_(), n2 = s.n1 / i, nom = s.rejim === 'tishli' ? 'z' : s.rejim === 'tasma' ? 'D' : 'z';
    const yon = s.rejim === 'tishli' ? 'qarama-qarshi' : 'bir xil';
    H.karta.yoz('Texnologiya · ' + {tishli:'tishli uzatma', tasma:'tasmali uzatma', zanjir:'zanjirli uzatma'}[s.rejim], 'i = ' + nom + '₂ / ' + nom + '₁ = ' + s.z2 + ' / ' + s.z1 + ' = ' + son(i, 2),
      '<div class="q"><span>n₁ (yetaklovchi)</span><b class="y">' + s.n1 + ' ayl/min</b><span>n₂ (yetaklanuvchi)</span><b class="k">' + son(n2, 1) + ' ayl/min</b><span>Aylanish</span><b>' + yon + '</b><span>i &gt; 1</span><b>' + (i > 1 ? 'tezlik kamayadi, moment ortadi' : i < 1 ? 'tezlik ortadi' : 'o‘zgarmaydi') + '</b></div><div class="iz">i = n₁/n₂ = z₂/z₁ (tishli, zanjirli), i = D₂/D₁ (tasmali, sirpanishsiz).</div>');
  }
  const tagChiz = ()=>{
    const or = s.rejim === 'tasma';
    tag.innerHTML = [['tishli', 'Tishli'], ['tasma', 'Tasmali'], ['zanjir', 'Zanjirli']].map(([k, n])=>TG('data-r="' + k + '"', n, s.rejim === k)).join('') +
      SL('z1', or ? 'D₁' : 'z₁', 8, 40, 1, s.z1, v=>or ? son(v * M * 100, 0) + ' mm' : v) + SL('z2', or ? 'D₂' : 'z₂', 8, 40, 1, s.z2, v=>or ? son(v * M * 100, 0) + ' mm' : v) + SL('n1', 'n₁', 10, 120, 5, s.n1, v=>v + ' ayl/min') +
      TG('data-ij="1"', s.ijro ? 'To‘xtatish' : 'Aylantirish', s.ijro);
    tugmaBog(tag, 'data-r', k=>{ s.rejim = k; qur(); tagChiz(); hodisa('ts-uzatma', ev()); });
    tugmaBog(tag, 'data-ij', ()=>{ s.ijro = !s.ijro; tagChiz(); });
    slayderBog(tag, {z1:v=>or ? son(v * M * 100, 0) + ' mm' : v, z2:v=>or ? son(v * M * 100, 0) + ' mm' : v, n1:v=>v + ' ayl/min'}, (k, v)=>{ s[k] = v; if(k !== 'n1') qur(); else yoz(); hodisa('ts-uzatma', ev()); });
  };
  const ev = (q)=>Object.assign({rejim:s.rejim, z1:s.z1, z2:s.z2, i:+i_().toFixed(3), n1:s.n1, n2:+(s.n1 / i_()).toFixed(2)}, q || {});
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-uzatma', ev({bos:d.nom})); detal('ts_uzatma', d.nom); };
  H.kadr = dt=>{
    if(s.ijro) s.th += dt * s.n1 / 60 * PI * 2 * .35;
    const i = i_();
    if(s.rejim === 'tishli'){ g1.rotation.z = s.th; g2.rotation.z = -s.th / i + (s.z2 % 2 === 0 ? PI / s.z2 : 0); }
    else { g1.rotation.z = s.th; g2.rotation.z = s.th / i; if(bogl && bogl.cv){ const L = bogl.cv.getLength(), f0 = (s.th * (M * s.z1 / 2) / L) % 1; link.forEach(b=>{ const f = cl(((b.userData.f - f0) % 1 + 1) % 1, 0, .999); const p = bogl.cv.getPointAt(f), tn = bogl.cv.getTangentAt(f); b.position.copy(p); b.rotation.z = Math.atan2(tn.y, tn.x); }); } }
  };
  S.holat = h=>{ if(!h) return; if(h.rejim) s.rejim = h.rejim; if(h.z1 !== undefined) s.z1 = cl(Math.round(+h.z1), 8, 40); if(h.z2 !== undefined) s.z2 = cl(Math.round(+h.z2), 8, 40); if(h.n1 !== undefined) s.n1 = cl(+h.n1, 10, 120); if(h.ijro !== undefined) s.ijro = !!h.ijro; qur(); tagChiz(); };
  yorliq('Texnologiya · mexanik uzatmalar (3D animatsiya)');
  izoh.innerHTML = 'Tishlar sonini o‘zgartiring — uzatish nisbati i = z₂/z₁ va aylanish tezligi n₂ qayta hisoblanadi. Oq belgi — bir aylanishni sanash uchun.';
  qur(); tagChiz();
  return S;
});

/* =====================================================================
   4. TIKUV MASHINASI — tuzilishi va yuqori ip yo‘li (3D)
   ===================================================================== */
reg('tikuv', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.3, ry:.55, fov:30, rxMin:-.6, rxMax:1.2});
  const {S, T} = H;
  const s = {qadam:0, korinish:'butun', ish:true, t:0};
  H.nomlar = {galtak:'G‘altak (yuqori ip)', yonaltirgich:'Ip yo‘naltirgich', regulyator:'Ip tortilishi regulyatori (tarelkalar)', richag:'Ip tortuvchi richag', igna:'Igna va igna bardagi yo‘naltirgich', pana:'Bosim panjasi (lapka)', moki:'Moki (ilgak) va g‘altakcha (shpulka)', gildirak:'Qo‘l g‘ildiragi (maxovik)', plastina:'Igna plastinasi va matoni surgich', korpus:'Korpus (yeng)', motor:'Pedal / yuritma'};
  const G = new T.Group(); S.g.add(G);
  const nomla = (m, nom)=>{ m.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; }); return m; };
  const korM = H.plast('#e9ecf3', {roughness:.45}), korM2 = H.plast('#cfd5e3');
  /* asos va korpus */
  const asos = H.quti(3.4, .22, 1.3, korM, .04); asos.position.y = -.11; nomla(asos, 'korpus'); G.add(asos);
  const plat = new T.Mesh(new T.BoxGeometry(.9, .02, .6), H.metall('#aeb5c2')); plat.position.set(-1.0, .011, .2); nomla(plat, 'plastina'); G.add(plat);
  const tish = new T.Mesh(new T.BoxGeometry(.22, .03, .14), H.metall('#8e949f')); tish.position.set(-1.0, .02, .25); nomla(tish, 'plastina'); G.add(tish);
  const ustun = H.quti(.7, 1.9, .9, korM, .06); ustun.position.set(1.25, .9, 0); nomla(ustun, 'korpus'); G.add(ustun);
  const yeng = H.quti(2.6, .55, .62, korM, .08); yeng.position.set(.2, 1.65, 0); nomla(yeng, 'korpus'); G.add(yeng);
  const bosh = H.quti(.75, 1.05, .7, korM, .07); bosh.position.set(-1.05, 1.45, 0); nomla(bosh, 'korpus'); G.add(bosh);
  /* qo‘l g‘ildiragi */
  const gil = H.sil(.42, .42, .14, H.metall('#2f3446', {roughness:.5}), 48); gil.rotation.z = PI / 2; gil.position.set(1.68, 1.55, 0); nomla(gil, 'gildirak'); G.add(gil);
  const gilIch = H.sil(.33, .33, .16, korM2, 48); gilIch.rotation.z = PI / 2; gilIch.position.set(1.69, 1.55, 0); nomla(gilIch, 'gildirak'); G.add(gilIch);
  const gilBelgi = new T.Mesh(new T.BoxGeometry(.02, .25, .05), H.mat('#ff6b6b')); gilBelgi.position.set(1.78, 1.68, 0); G.add(gilBelgi);
  /* g‘altak ustuni va g‘altak */
  const gUst = H.sil(.025, .025, .45, H.metall('#8e949f')); gUst.position.set(.75, 2.1, -.05); G.add(gUst);
  const galt = H.sil(.14, .14, .3, H.plast('#2a7bff')); galt.position.set(.75, 2.15, -.05); nomla(galt, 'galtak'); G.add(galt);
  [2.0, 2.3].forEach(y=>{ const f = H.sil(.17, .17, .02, H.plast('#1c2a48')); f.position.set(.75, y, -.05); nomla(f, 'galtak'); G.add(f); });
  /* yo‘naltirgichlar */
  const yon1 = H.tor(.05, .012, H.metall('#8e949f')); yon1.position.set(.1, 1.98, .32); nomla(yon1, 'yonaltirgich'); G.add(yon1);
  const yon2 = H.tor(.04, .012, H.metall('#8e949f')); yon2.position.set(-1.05, 1.0, .36); nomla(yon2, 'yonaltirgich'); G.add(yon2);
  /* tortish regulyatori: ikki tarelka + tugma */
  const regG = new T.Group(); regG.position.set(-.55, 1.5, .37); G.add(regG);
  [0, .045].forEach(z=>{ const t = H.sil(.11, .11, .015, H.metall('#c9ced8'), 40); t.rotation.x = PI / 2; t.position.z = z; regG.add(t); });
  const regT = H.sil(.07, .07, .06, H.plast('#2a7bff'), 32); regT.rotation.x = PI / 2; regT.position.z = .08; regG.add(regT); nomla(regG, 'regulyator');
  /* ip tortuvchi richag */
  const rich = new T.Group(); rich.position.set(-.8, 1.72, .36); G.add(rich);
  const richM = new T.Mesh(new T.BoxGeometry(.06, .5, .04), H.metall('#8e949f')); richM.position.y = .25; rich.add(richM);
  const richKoz = H.tor(.035, .01, H.metall('#8e949f')); richKoz.position.y = .52; rich.add(richKoz); nomla(rich, 'richag');
  /* igna bar, igna, panja */
  const ignaBar = new T.Group(); ignaBar.position.set(-1.05, .9, .2); G.add(ignaBar);
  const bar = H.sil(.035, .035, .6, H.metall('#aeb5c2')); bar.position.y = .3; ignaBar.add(bar);
  const igna = H.sil(.012, .006, .42, H.metall('#e8ecf3')); igna.position.y = -.2; ignaBar.add(igna);
  const ignaKoz = H.tor(.016, .005, H.metall('#e8ecf3')); ignaKoz.position.y = -.33; ignaKoz.rotation.y = PI / 2; ignaBar.add(ignaKoz); nomla(ignaBar, 'igna');
  const panja = new T.Group(); panja.position.set(-1.0, .04, .2); G.add(panja);
  const pTag = new T.Mesh(new T.BoxGeometry(.26, .03, .34), H.metall('#c9ced8')); pTag.position.y = .015; panja.add(pTag);
  const pUst = H.sil(.025, .025, .5, H.metall('#aeb5c2')); pUst.position.set(.08, .28, 0); panja.add(pUst); nomla(panja, 'pana');
  /* moki (asos ostida, ko‘rinish 'moki' da asos shaffof) */
  const mokiG = new T.Group(); mokiG.position.set(-1.0, -.12, .2); G.add(mokiG);
  const ilgak = new T.Mesh(new T.TorusGeometry(.17, .025, 10, 40, PI * 1.6), H.metall('#d9b35a')); ilgak.rotation.x = PI / 2; mokiG.add(ilgak);
  const shp = H.sil(.09, .09, .07, H.plast('#ff6b9a')); mokiG.add(shp); const shpF = H.sil(.11, .11, .01, H.plast('#1c2a48')); shpF.position.y = .04; mokiG.add(shpF); nomla(mokiG, 'moki');
  const pedal = H.quti(.7, .08, .4, H.plast('#1f2438'), .02); pedal.position.set(.9, -.18, .9); nomla(pedal, 'motor'); G.add(pedal);
  /* mato */
  const mato = new T.Mesh(new T.PlaneGeometry(1.1, .7), H.mat('#7fd1b9', {roughness:.95, side:T.DoubleSide})); mato.rotation.x = -PI / 2; mato.position.set(-.9, .03, .25); G.add(mato);
  /* ip yo‘li (yuqori ip): 6 qadam */
  const IP = [new T.Vector3(.75, 2.35, .08), new T.Vector3(.1, 1.98, .36), new T.Vector3(-.55, 1.5, .5), new T.Vector3(-.8, 2.24, .4), new T.Vector3(-1.05, 1.0, .42), new T.Vector3(-1.05, .57, .24)];
  const ipG = new T.Group(); G.add(ipG);
  const ipM = [], ipRang = '#ff3d6e';
  for(let i = 0; i < IP.length - 1; i++){ const cv = new T.CatmullRomCurve3([IP[i], IP[i + 1]]); const m = new T.Mesh(new T.TubeGeometry(cv, 12, .012, 6, false), H.plast(ipRang, {emissive:H.rang('#5a0a1e')})); ipG.add(m); ipM.push(m); }
  const QNOM = ['', '1 · g‘altak', '2 · yo‘naltirgich', '3 · tortish regulyatori', '4 · ip tortuvchi richag', '5 · igna bardagi yo‘naltirgich', '6 · igna ko‘zi (olddan orqaga)'];
  const raqamlar = IP.map((p, i)=>{ const sp = H.yozuv(String(i + 1), {k:.26, fon:'rgba(255,61,110,.9)', chet:'rgba(255,255,255,.8)'}); sp.position.copy(p).add(new T.Vector3(.16, .12, .2)); G.add(sp); return sp; });
  G.add(H.poydevor(2.4, -.23, '#161a30'));
  const yozlar = [['g‘altak', .75, 2.7, 0], ['regulyator', -.55, 1.2, .9], ['richag', -.8, 2.5, .5], ['igna va panja', -1.05, -.3, .9], ['qo‘l g‘ildiragi', 1.7, 2.2, 0], ['moki (ostida)', -1.0, -.5, .2]].map(([t, x, y, z])=>{ const sp = H.yozuv(t, {k:.26}); sp.position.set(x, y, z); G.add(sp); return sp; });
  function yangila(){
    const k = s.qadam;
    ipM.forEach((m, i)=>{ const faol = i < k; m.material.color = H.rang(faol ? ipRang : '#5a2a38'); m.material.emissive = H.rang(faol ? '#7a1030' : '#000'); m.material.transparent = !faol; m.material.opacity = faol ? 1 : .55; });
    raqamlar.forEach((r, i)=>{ r.visible = !H.uq; r.material.opacity = i < k ? 1 : .45; });
    const moki = s.korinish === 'moki';
    [asos, plat].forEach(m=>{ m.material.transparent = moki; m.material.opacity = moki ? .25 : 1; m.material.depthWrite = !moki; m.material.needsUpdate = true; });
    mato.visible = !moki;
    yozlar.forEach(y=>y.visible = !H.uq);
    H.karta.yoz('Texnologiya · tikuv mashinasi', k ? QNOM[k] : (moki ? 'Moki va g‘altakcha' : 'Yuqori ip yo‘li — 6 qadam'),
      '<div class="q"><span>Chok turi</span><b>ikki ipli (chelnok)</b><span>Yuqori ip</span><b class="p">g‘altakdan</b><span>Pastki ip</span><b class="y">shpulkadan</b></div><div class="iz">' + (moki ? 'Igna yuqori ipni mato ostiga olib tushadi, aylanuvchi moki ilgagi halqani ilib, shpulkadagi pastki ip atrofidan o‘tkazadi — ikki ip o‘zaro bog‘lanadi.' : 'Ip g‘altakdan yo‘naltirgich, tortish tarelkalari, ip tortuvchi richag orqali ignaga keladi. Igna ko‘ziga ip oldindan orqaga o‘tkaziladi (ko‘p uy mashinalarida; modelga qarang).') + '</div>');
    H.joy(moki ? 1.0 : 2.1, moki ? new T.Vector3(-1.0, .1, .2) : new T.Vector3(.2, 1.1, 0), moki ? 1.4 : 2.6);
  }
  const tagChiz = ()=>{
    tag.innerHTML = TG('data-k="butun"', 'Mashina', s.korinish === 'butun') + TG('data-k="moki"', 'Moki (ostidan)', s.korinish === 'moki') + '<span class="ts-ajr"></span>' +
      [1, 2, 3, 4, 5, 6].map(i=>TG('data-q="' + i + '"', String(i), s.qadam === i, QNOM[i])).join('') + TG('data-q="0"', 'Tozalash', false) + TG('data-ish="1"', s.ish ? 'To‘xtatish' : 'Ishlatish', s.ish);
    tugmaBog(tag, 'data-k', k=>{ s.korinish = k; yangila(); tagChiz(); hodisa('ts-tikuv', {korinish:k, qadam:s.qadam}); });
    tugmaBog(tag, 'data-q', q=>{ s.qadam = +q; yangila(); tagChiz(); hodisa('ts-tikuv', {qadam:s.qadam, korinish:s.korinish}); });
    tugmaBog(tag, 'data-ish', ()=>{ s.ish = !s.ish; tagChiz(); });
  };
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-tikuv', {bos:d.nom, qadam:s.qadam, korinish:s.korinish}); detal('ts_tikuv', d.nom); };
  S.ajratQism = (n, v)=>{ s.qadam = v ? n : Math.max(0, n - 1); yangila(); };
  H.kadr = dt=>{
    if(!s.ish) return; s.t += dt;
    const f = s.t * 3.2;
    ignaBar.position.y = .9 + Math.sin(f) * .22;
    rich.rotation.z = Math.sin(f + .8) * .35;
    gil.rotation.x = gilIch.rotation.x = f; gilBelgi.position.set(1.78, 1.55 + Math.cos(f) * .13, Math.sin(f) * .13);
    ilgak.rotation.z = -f * 2;
    tish.position.z = .25 + Math.sin(f) * .03; tish.position.y = .02 + Math.max(0, Math.cos(f)) * .02;
    mato.position.z = .25 + (s.t * .05) % .3 - .15;
  };
  S.holat = h=>{ if(!h) return; if(h.qadam !== undefined) s.qadam = cl(+h.qadam, 0, 6); if(h.korinish) s.korinish = h.korinish; if(h.ish !== undefined) s.ish = !!h.ish; yangila(); tagChiz(); };
  yorliq('Texnologiya · tikuv mashinasi (soddalashtirilgan 3D)');
  izoh.innerHTML = 'Qadamlar 1–6 ni bosing: yuqori ip yo‘li ketma-ket yoritiladi. «Moki (ostidan)» — asos shaffof, ilgak aylanishi ko‘rinadi.';
  yangila(); tagChiz();
  return S;
});


/* =====================================================================
   5. 3D MODELLASHTIRISH — primitivlardan qurish + 3D printer tamoyili
   ===================================================================== */
reg('qurish', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.5, ry:.7, fov:30, rxMin:-.1, rxMax:1.3});
  const {S, T} = H;
  const s = {rejim:'qur', det:[], tanl:-1, pr:0, t:0, prIsh:true};
  const G = new T.Group(); S.g.add(G); const PR = new T.Group(); S.g.add(PR);
  const RANG = ['#7fd1b9', '#ffc14d', '#5cc8ff', '#ff6b9a', '#a996ff', '#ff9f43'];
  H.nomlar = {quti:'Quti (parallelepiped)', sil:'Silindr', shar:'Shar', ekstruder:'Ekstruder (qizdirilgan nozul)', stol:'Ish stoli (platforma)', qatlam:'Qatlamlar', plastik:'Filament (PLA plastik)'};
  const asos = H.poydevor(2.6, 0, '#161a30'); G.add(asos);
  /* to‘r (mm shkalasi: 1 birlik = 10 mm) */
  const grid = new T.GridHelper(4, 8, H.rang('#4a4f78'), H.rang('#2c3154')); grid.position.y = .003; grid.material.transparent = true; grid.material.opacity = .55; grid.material.userData.env = 1; G.add(grid);
  const mesh = [];
  function qayta(){
    mesh.forEach(m=>{ G.remove(m); m.geometry.dispose(); m.material.dispose(); }); mesh.length = 0;
    s.det.forEach((d, i)=>{
      const mat = H.mat(RANG[i % RANG.length], {roughness:.45, metalness:.1, emissive:H.rang(i === s.tanl ? '#3a2a8a' : '#000')});
      let g; if(d.tur === 'quti') g = new T.BoxGeometry(d.w, d.h, d.d); else if(d.tur === 'sil') g = new T.CylinderGeometry(d.w / 2, d.w / 2, d.h, 40); else g = new T.SphereGeometry(d.w / 2, 32, 20);
      const m = new T.Mesh(g, mat); m.position.set(d.x, d.y + (d.tur === 'shar' ? d.w / 2 : d.h / 2), d.z); m.userData.nom = d.tur; m.userData.i = i; G.add(m); mesh.push(m);
    });
    yoz();
  }
  const ev = q=>{ const turlar = {quti:0, sil:0, shar:0}; s.det.forEach(d=>turlar[d.tur]++); return Object.assign({rejim:s.rejim, soni:s.det.length, turlar, detallar:s.det.map(d=>({tur:d.tur, w:+d.w.toFixed(2), h:+d.h.toFixed(2), d:+d.d.toFixed(2), x:+d.x.toFixed(2), y:+d.y.toFixed(2), z:+d.z.toFixed(2)}))}, q || {}); };
  function yoz(){
    if(s.rejim === 'printer'){ H.karta.yoz('Texnologiya · 3D printer (FDM)', 'Qatlam ' + Math.min(40, Math.floor(s.pr)) + ' / 40', '<div class="q"><span>Usul</span><b>FDM — eritib yotqizish</b><span>Qatlam</span><b>0,1–0,3 mm</b><span>Material</span><b>PLA, ~190–220 °C</b></div><div class="iz">Model dasturda qatlamlarga «kesiladi» (slicing), printer ularni pastdan yuqoriga navbatma-navbat yotqizadi.</div>'); return; }
    const d = s.det[s.tanl];
    H.karta.yoz('Texnologiya · 3D modellashtirish', s.det.length ? s.det.length + ' ta detal' : 'Bo‘sh sahna', (d ? '<div class="q"><span>Tanlangan</span><b class="y">' + H.nomlar[d.tur] + '</b><span>O‘lcham</span><b>' + son(d.w * 10, 0) + ' × ' + son(d.h * 10, 0) + ' × ' + son(d.d * 10, 0) + ' mm</b><span>Joy (x; y; z)</span><b>' + son(d.x * 10, 0) + '; ' + son(d.y * 10, 0) + '; ' + son(d.z * 10, 0) + ' mm</b></div>' : '') + '<div class="iz">1 katak = 5 mm · Detalni bosib tanlang, pastdagi slayderlar bilan o‘lcham va joyini o‘zgartiring.</div>');
  }
  const qosh = tur=>{ s.det.push({tur, w:tur === 'shar' ? 1 : 1.2, h:1, d:1.2, x:(s.det.length % 3 - 1) * 1.3, y:0, z:0}); s.tanl = s.det.length - 1; qayta(); tagChiz(); hodisa('ts-qurish', ev({amal:'qosh', tur})); };
  const tagChiz = ()=>{
    if(s.rejim === 'printer'){ tag.innerHTML = TG('data-rj="qur"', 'Qurish', false) + TG('data-rj="printer"', '3D printer', true) + TG('data-pr="1"', s.prIsh ? 'To‘xtatish' : 'Chop etish', s.prIsh) + TG('data-pr0="1"', 'Boshidan', false); }
    else {
      const d = s.det[s.tanl];
      tag.innerHTML = TG('data-rj="qur"', 'Qurish', true) + TG('data-rj="printer"', '3D printer', false) + '<span class="ts-ajr"></span>' + TG('data-q="quti"', '+ Quti', false) + TG('data-q="sil"', '+ Silindr', false) + TG('data-q="shar"', '+ Shar', false) +
        (d ? TG('data-och="1"', 'O‘chirish', false) + SL('w', d.tur === 'shar' ? 'Diametr' : 'Kenglik', .2, 3, .1, d.w, v=>son(v * 10, 0) + ' mm') + (d.tur === 'shar' ? '' : SL('h', 'Balandlik', .1, 3, .1, d.h, v=>son(v * 10, 0) + ' mm')) + (d.tur === 'quti' ? SL('d', 'Chuqurlik', .2, 3, .1, d.d, v=>son(v * 10, 0) + ' mm') : '') + SL('x', 'x', -1.8, 1.8, .1, d.x, v=>son(v * 10, 0)) + SL('y', 'y (baland)', 0, 2.5, .1, d.y, v=>son(v * 10, 0)) + SL('z', 'z', -1.8, 1.8, .1, d.z, v=>son(v * 10, 0)) : '') + TG('data-toz="1"', 'Tozalash', false);
    }
    tugmaBog(tag, 'data-rj', k=>{ s.rejim = k; rejim(); tagChiz(); hodisa('ts-qurish', ev()); });
    tugmaBog(tag, 'data-q', qosh);
    tugmaBog(tag, 'data-och', ()=>{ if(s.tanl >= 0){ s.det.splice(s.tanl, 1); s.tanl = s.det.length - 1; qayta(); tagChiz(); hodisa('ts-qurish', ev({amal:'och'})); } });
    tugmaBog(tag, 'data-toz', ()=>{ s.det = []; s.tanl = -1; qayta(); tagChiz(); hodisa('ts-qurish', ev({amal:'toz'})); });
    tugmaBog(tag, 'data-pr', ()=>{ s.prIsh = !s.prIsh; tagChiz(); });
    tugmaBog(tag, 'data-pr0', ()=>{ s.pr = 0; s.prIsh = true; tagChiz(); });
    slayderBog(tag, {w:v=>son(v * 10, 0) + ' mm', h:v=>son(v * 10, 0) + ' mm', d:v=>son(v * 10, 0) + ' mm', x:v=>son(v * 10, 0), y:v=>son(v * 10, 0), z:v=>son(v * 10, 0)}, (k, v)=>{ const d = s.det[s.tanl]; if(!d) return; d[k] = v; if(d.tur === 'sil') d.d = d.w; if(d.tur === 'shar') d.d = d.h = d.w; qayta(); hodisa('ts-qurish', ev({amal:'olcham'})); });
  };
  /* 3D printer: qatlamma-qatlam «stakan» */
  const prQ = [];
  function printerQur(){
    H.tozala(PR); prQ.length = 0;
    const stol = new T.Mesh(new T.BoxGeometry(3, .1, 3), H.metall('#3a4058', {roughness:.6})); stol.position.y = -.05; stol.userData.nom = 'stol'; PR.add(stol);
    const ramka = H.metall('#8e949f'); [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].forEach(([x, z])=>{ const u = H.sil(.04, .04, 3, ramka); u.position.set(x, 1.5, z); PR.add(u); });
    const port = new T.Mesh(new T.BoxGeometry(3.1, .08, .08), ramka); port.position.set(0, 2.2, 0); PR.add(port); PR.userData.port = port;
    const ekst = new T.Group(); const korpus = H.quti(.3, .36, .3, H.plast('#2a2f45'), .03); ekst.add(korpus); const nozul = H.sil(.02, .07, .14, H.metall('#d9b35a')); nozul.position.y = -.25; ekst.add(nozul); const nurS = H.nur('#ffb06b', .5); nurS.position.y = -.33; ekst.add(nurS); ekst.traverse(o=>{ if(o.isMesh) o.userData.nom = 'ekstruder'; }); PR.add(ekst); PR.userData.ekst = ekst;
    const fil = H.tayoq(new T.Vector3(1.2, 3.1, 0), new T.Vector3(0, 2.45, 0), .02, H.plast('#7fd1b9')); fil.userData.nom = 'plastik'; PR.add(fil);
    const galt = H.sil(.35, .35, .15, H.plast('#7fd1b9')); galt.rotation.z = PI / 2; galt.position.set(1.4, 3.1, 0); galt.userData.nom = 'plastik'; PR.add(galt);
    for(let i = 0; i < 40; i++){ const r = i < 4 ? .62 : .62 + i * .004, ichki = i < 4 ? .0 : .5 + i * .004; const g = i < 4 ? new T.CylinderGeometry(r, r, .05, 40) : new T.RingGeometry(ichki, r, 40); const m = new T.Mesh(g, H.plast('#7fd1b9', {roughness:.5})); if(i >= 4){ m.rotation.x = -PI / 2; m.material.side = T.DoubleSide; m.geometry = new T.CylinderGeometry(r, r, .05, 40, 1, true); m.rotation.x = 0; } m.position.y = .025 + i * .05; m.userData.nom = 'qatlam'; m.visible = false; PR.add(m); prQ.push(m); }
    PR.add(H.soya(2.2, -.099));
  }
  function rejim(){
    const pr = s.rejim === 'printer'; G.visible = !pr; PR.visible = pr;
    if(pr && !PR.children.length) printerQur();
    H.joy(pr ? 2.2 : 2.3, new T.Vector3(0, pr ? 1.2 : .6, 0), pr ? 2.4 : 2.6);
    yoz();
  }
  S.bosish = d=>{ if(!d || !d.nom) return; if(s.rejim === 'qur' && d.i !== undefined){ s.tanl = d.i; qayta(); tagChiz(); } hodisa('ts-qurish', ev({bos:d.nom})); detal('ts_qurish', d.nom); };
  H.kadr = dt=>{
    if(s.rejim !== 'printer') return; s.t += dt;
    if(s.prIsh) s.pr = Math.min(40.99, s.pr + dt * 2.2);
    const k = Math.floor(s.pr);
    prQ.forEach((m, i)=>m.visible = i < k);
    const ekst = PR.userData.ekst, port = PR.userData.port; if(!ekst) return;
    const a = s.t * 6, r = k < 4 ? (s.pr % 1) * .6 : .6; ekst.position.set(Math.cos(a) * r, .25 + .05 * k + .36, Math.sin(a) * r); port.position.y = ekst.position.y + .1;
    if(k >= 40 && s.prIsh){ s.prIsh = false; tagChiz(); hodisa('ts-qurish', ev({amal:'chop', tayyor:true})); }
    if(Math.floor(s.pr) !== Math.floor(s.pr - dt * 2.2)) yoz();
  };
  S.holat = h=>{ if(!h) return; if(h.rejim) s.rejim = h.rejim; if(h.det){ s.det = h.det.map(d=>Object.assign({x:0, y:0, z:0, w:1, h:1, d:1}, d)); s.tanl = s.det.length - 1; } if(h.toza) { s.det = []; s.tanl = -1; } if(h.pr !== undefined){ s.pr = +h.pr; } if(h.prIsh !== undefined) s.prIsh = !!h.prIsh; qayta(); rejim(); tagChiz(); };
  yorliq('Texnologiya · 3D modellashtirish (brauzerda quruvchi)');
  izoh.innerHTML = '«+ Quti / Silindr / Shar» bilan detal qo‘shing, o‘lcham va joyini slayderlar bilan bering. «3D printer» — qatlamma-qatlam chop etish tamoyili.';
  qayta(); rejim(); tagChiz();
  return S;
});

/* =====================================================================
   6. ROBOTOTEXNIKA — robot qo‘l (3 servo) + masofa sensori mantiqi
   ===================================================================== */
reg('robot', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.4, ry:.6, fov:30, rxMin:-.1, rxMax:1.3});
  const {S, T} = H;
  const s = {s1:90, s2:60, s3:90, qisqich:30, masofa:25, chegara:10, avto:false, t:0, ot:0};
  H.nomlar = {asos:'Asos (platforma)', servo1:'Servo 1 — asos burilishi (0–180°)', servo2:'Servo 2 — yelka', servo3:'Servo 3 — tirsak', qisqich:'Qisqich (gripper)', sensor:'Ultratovush masofa sensori (HC-SR04 turi)', led:'Holat indikatori (LED)', plata:'Boshqaruv platasi (mikrokontroller)', tosiq:'To‘siq'};
  const G = new T.Group(); S.g.add(G);
  const nomla = (m, nom)=>{ m.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; }); return m; };
  const servoM = H.plast('#2a7bff'), bogM = H.plast('#e9ecf3', {roughness:.4}), qoraM = H.plast('#1f2438');
  const servo = (nom)=>{ const g = new T.Group(); const k = H.quti(.34, .3, .26, servoM, .03); g.add(k); const qul = [H.quti(.12, .06, .06, qoraM, .01), H.quti(.12, .06, .06, qoraM, .01)]; qul[0].position.set(-.22, .1, 0); qul[1].position.set(.22, .1, 0); g.add(qul[0], qul[1]); const oq = H.sil(.05, .05, .08, H.metall('#d9d9d9')); oq.rotation.x = PI / 2; oq.position.set(0, .05, .17); g.add(oq); nomla(g, nom); return g; };
  G.add(H.poydevor(2.4, -.02, '#161a30'));
  const plat = H.quti(1.3, .08, .9, H.plast('#1d5c3a'), .02); plat.position.set(-1.1, .04, -.6); nomla(plat, 'plata'); G.add(plat);
  const chip = H.quti(.32, .06, .32, qoraM, .01); chip.position.set(-1.1, .11, -.6); nomla(chip, 'plata'); G.add(chip);
  const led = H.shar(.07, new T.MeshStandardMaterial({color:H.rang('#4ee1a0'), emissive:H.rang('#2ea36a'), emissiveIntensity:1.2}), 16); led.material.userData.env = 1; led.position.set(-.6, .14, -.4); nomla(led, 'led'); G.add(led);
  const ledNur = H.nur('#4ee1a0', .5); ledNur.position.copy(led.position); G.add(ledNur);
  const asos = H.sil(.6, .68, .14, qoraM, 48); asos.position.y = .07; nomla(asos, 'asos'); G.add(asos);
  /* bo‘g‘in 1: asos burilishi */
  const B1 = new T.Group(); B1.position.y = .14; G.add(B1);
  const sv1 = servo('servo1'); sv1.rotation.x = -PI / 2; sv1.position.y = .13; B1.add(sv1);
  const disk = H.sil(.3, .3, .08, bogM, 40); disk.position.y = .33; nomla(disk, 'asos'); B1.add(disk);
  /* bo‘g‘in 2: yelka */
  const B2 = new T.Group(); B2.position.set(0, .4, 0); B1.add(B2);
  const sv2 = servo('servo2'); sv2.rotation.y = PI / 2; sv2.position.set(0, .15, 0); B2.add(sv2);
  const yelka = new T.Group(); B2.add(yelka); yelka.position.set(0, .15, 0);
  const yl = H.quti(.14, 1.1, .36, bogM, .03); yl.position.y = .55; nomla(yl, 'servo2'); yelka.add(yl);
  const yl2 = yl.clone(); yl2.position.z = 0; yl.position.z = .22; yl2.position.z = -.22; yelka.add(yl2);
  /* bo‘g‘in 3: tirsak */
  const B3 = new T.Group(); B3.position.y = 1.1; yelka.add(B3);
  const sv3 = servo('servo3'); sv3.rotation.y = PI / 2; B3.add(sv3);
  const bilak = new T.Group(); B3.add(bilak);
  const bl = H.quti(.12, .95, .3, bogM, .03); bl.position.y = .48; nomla(bl, 'servo3'); bilak.add(bl);
  /* qisqich */
  const Q = new T.Group(); Q.position.y = .95; bilak.add(Q);
  const qk = H.quti(.22, .18, .34, qoraM, .02); nomla(qk, 'qisqich'); Q.add(qk);
  const barm = [0, 1].map(i=>{ const b = H.quti(.06, .34, .08, H.metall('#aeb5c2'), .01); b.position.set(0, .22, (i ? 1 : -1) * .1); nomla(b, 'qisqich'); Q.add(b); return b; });
  /* sensor (qisqich ustida) */
  const sens = new T.Group(); sens.position.set(.14, .02, 0); Q.add(sens);
  const sp = H.quti(.06, .16, .34, H.plast('#1d5c3a'), .01); sens.add(sp); [-.09, .09].forEach(z=>{ const k = H.sil(.06, .06, .08, H.metall('#c9ced8')); k.rotation.z = PI / 2; k.position.set(.05, 0, z); sens.add(k); }); nomla(sens, 'sensor');
  /* to‘siq va nur */
  const tosiq = H.quti(.12, .9, .7, H.plast('#ff6b9a'), .02); nomla(tosiq, 'tosiq'); G.add(tosiq);
  const nurM = new T.MeshBasicMaterial({color:H.rang('#5cc8ff'), transparent:true, opacity:.35, depthWrite:false}); nurM.userData.env = 1;
  const nur = new T.Mesh(new T.ConeGeometry(.25, 1, 20, 1, true), nurM); nur.rotation.z = -PI / 2; G.add(nur);
  const yozM = H.yozuv('masofa', {k:.28}); G.add(yozM);
  const uchi = new T.Vector3(), yon = new T.Vector3();
  function hisob(){
    B1.rotation.y = (s.s1 - 90) * RAD;
    yelka.rotation.z = -(s.s2 - 90) * RAD;
    bilak.rotation.z = -(s.s3 - 90) * RAD;
    barm.forEach((b, i)=>b.position.z = (i ? 1 : -1) * (.05 + s.qisqich / 180 * .14));
    S.g.updateMatrixWorld(true);
    sens.getWorldPosition(uchi); yon.set(1, 0, 0).applyQuaternion(sens.getWorldQuaternion(new T.Quaternion()));
    const d = s.masofa / 10; /* 10 sm = 1 birlik */
    tosiq.position.copy(uchi).addScaledVector(yon, d + .06); tosiq.quaternion.copy(sens.getWorldQuaternion(new T.Quaternion()));
    nur.position.copy(uchi).addScaledVector(yon, d / 2); nur.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), yon.clone()); nur.scale.set(1, d, 1);
    yozM.position.copy(uchi).addScaledVector(yon, d / 2).add(new T.Vector3(0, .3, 0));
    const toxta = s.masofa < s.chegara;
    nurM.color = H.rang(toxta ? '#ff5d73' : '#5cc8ff');
    led.material.color = H.rang(toxta ? '#ff5d73' : '#4ee1a0'); led.material.emissive = H.rang(toxta ? '#b2203a' : '#2ea36a'); ledNur.material.color = new T.Color(toxta ? '#ff5d73' : '#4ee1a0');
    const yangi = H.yozuv(son(s.masofa, 0) + ' sm' + (toxta ? ' — TO‘XTA' : ''), {k:.28, chet:toxta ? 'rgba(255,90,90,.9)' : undefined}); yozM.material.map.dispose(); yozM.material = yangi.material; yozM.scale.copy(yangi.scale);
    yozM.visible = !H.uq;
    H.karta.yoz('Texnologiya · robot qo‘l', toxta ? '<span class="p">masofa &lt; ' + s.chegara + ' sm → to‘xta</span>' : '<span class="s">yo‘l ochiq</span>',
      '<div class="q"><span>Servo 1 (asos)</span><b class="k">' + s.s1 + '°</b><span>Servo 2 (yelka)</span><b class="k">' + s.s2 + '°</b><span>Servo 3 (tirsak)</span><b class="k">' + s.s3 + '°</b><span>Sensor</span><b class="' + (toxta ? 'p' : 's') + '">' + son(s.masofa, 0) + ' sm</b></div><div class="iz"><code>agar masofa &lt; ' + s.chegara + ' sm: to‘xta; aks holda: harakat</code> — sensor tovush impulsi qaytish vaqtidan masofani hisoblaydi: s = t·v/2.</div>');
  }
  const evD = q=>Object.assign({s1:s.s1, s2:s.s2, s3:s.s3, qisqich:s.qisqich, masofa:s.masofa, chegara:s.chegara, toxta:s.masofa < s.chegara, avto:s.avto}, q || {});
  const tagChiz = ()=>{
    tag.innerHTML = SL('s1', 'Servo 1', 0, 180, 1, s.s1, v=>v + '°') + SL('s2', 'Servo 2', 0, 180, 1, s.s2, v=>v + '°') + SL('s3', 'Servo 3', 0, 180, 1, s.s3, v=>v + '°') + SL('qisqich', 'Qisqich', 0, 180, 1, s.qisqich, v=>v + '°') + SL('masofa', 'To‘siq', 2, 60, 1, s.masofa, v=>v + ' sm') + TG('data-a="1"', s.avto ? 'Avto: yoqiq' : 'Avto rejim', s.avto);
    slayderBog(tag, {s1:v=>v + '°', s2:v=>v + '°', s3:v=>v + '°', qisqich:v=>v + '°', masofa:v=>v + ' sm'}, (k, v)=>{ s[k] = v; hisob(); hodisa('ts-robot', evD()); });
    tugmaBog(tag, 'data-a', ()=>{ s.avto = !s.avto; tagChiz(); hodisa('ts-robot', evD()); });
  };
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-robot', evD({bos:d.nom})); detal('ts_robot', d.nom); };
  H.kadr = dt=>{
    s.t += dt;
    if(s.avto){ const toxta = s.masofa < s.chegara; if(!toxta){ s.s1 = 90 + Math.sin(s.t * .7) * 60; s.s2 = 70 + Math.sin(s.t * .9) * 25; s.s3 = 90 + Math.cos(s.t * .9) * 30; s.ot += dt; if(s.ot > .12){ s.ot = 0; tag.querySelectorAll('[data-p]').forEach(x=>{ if(s[x.dataset.p] !== undefined && x.dataset.p !== 'masofa'){ x.value = s[x.dataset.p]; x.nextElementSibling.textContent = Math.round(s[x.dataset.p]) + '°'; } }); } } s.s1 = Math.round(s.s1); s.s2 = Math.round(s.s2); s.s3 = Math.round(s.s3); hisob(); }
    nurM.opacity = .25 + Math.sin(s.t * 8) * .1;
  };
  S.holat = h=>{ if(!h) return; ['s1', 's2', 's3', 'qisqich'].forEach(k=>{ if(h[k] !== undefined) s[k] = cl(Math.round(+h[k]), 0, 180); }); if(h.masofa !== undefined) s.masofa = cl(+h.masofa, 2, 60); if(h.chegara !== undefined) s.chegara = +h.chegara; if(h.avto !== undefined) s.avto = !!h.avto; hisob(); tagChiz(); };
  H.joy(1.9, new T.Vector3(0, 1.0, 0), 2.6);
  yorliq('Texnologiya · robototexnika (sxematik 3D)');
  izoh.innerHTML = 'Servo burchaklarini suring — qo‘l bo‘g‘inlari buriladi. «To‘siq» slayderi sensor oldidagi masofa: 10 sm dan kam bo‘lsa, dastur «to‘xta» beradi.';
  hisob(); tagChiz();
  return S;
});

/* =====================================================================
   7. LOYIHA: UY ELEKTR TARMOG‘I REJASI — 2D plan
   ===================================================================== */
const XONA = [
  {id:'yotoq', nom:'Yotoqxona', x:0, y:0, w:4, h:3.6},
  {id:'mehmon', nom:'Mehmonxona', x:4, y:0, w:5, h:3.6},
  {id:'oshxona', nom:'Oshxona', x:0, y:3.6, w:3.4, h:3},
  {id:'yolak', nom:'Yo‘lak', x:3.4, y:3.6, w:2.6, h:3},
  {id:'hammom', nom:'Hammom', x:6, y:3.6, w:3, h:3}
];
const ASBOB = {rozetka:{nom:'Rozetka', rang:'#ffc14d', b:'R'}, chiroq:{nom:'Chiroq', rang:'#fff2a8', b:'C'}, kalit:{nom:'Kalit', rang:'#5cc8ff', b:'K'}, plita:{nom:'Elektr plita', rang:'#ff6b9a', b:'P'}, shit:{nom:'Taqsimlash shchiti', rang:'#a996ff', b:'Sh'}};
reg('loyiha', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {asbob:'rozetka', el:[], qatlam:'reja', ochir:false};
  const vanna = {x:6.2, y:3.8, w:.8, h:1.8};
  const E = tekis(sahna, c, {
    olam:()=>[-.6, -.5, 9.6, 7.3],
    chiz, bosish, ustida,
    holat(h){ if(h.asbob) s.asbob = h.asbob; if(h.el) s.el = h.el.map(e=>Object.assign({}, e)); if(h.toza) s.el = []; if(h.qatlam) s.qatlam = h.qatlam; if(h.namuna) s.el = NAMUNA.map(e=>Object.assign({}, e)); tagChiz(); yoz(); },
    tikla(){}
  });
  const NAMUNA = [{t:'shit', x:3.8, y:6.3}, {t:'rozetka', x:.3, y:1.8}, {t:'rozetka', x:3.7, y:1.0}, {t:'chiroq', x:2, y:1.8}, {t:'kalit', x:3.7, y:3.3}, {t:'rozetka', x:4.3, y:1.8}, {t:'rozetka', x:8.7, y:1.8}, {t:'chiroq', x:6.5, y:1.8}, {t:'kalit', x:4.3, y:3.3}, {t:'plita', x:.6, y:6.2}, {t:'rozetka', x:1.8, y:6.3}, {t:'rozetka', x:3.1, y:4.2}, {t:'chiroq', x:1.7, y:5.1}, {t:'kalit', x:3.1, y:3.9}, {t:'chiroq', x:4.7, y:5.1}, {t:'kalit', x:5.7, y:3.9}, {t:'chiroq', x:7.5, y:5.1}, {t:'kalit', x:5.7, y:4.0}, {t:'rozetka', x:8.7, y:5.5}];
  const Y = y=>7 - y; /* plan yuqoridan: y pastga o‘sadi → dunyo y ga aylantirish */
  const xonaOf = (x, y)=>XONA.find(r=>x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h);
  const vannaMasofa = (x, y)=>{ const dx = Math.max(vanna.x - x, 0, x - vanna.x - vanna.w), dy = Math.max(vanna.y - y, 0, y - vanna.y - vanna.h); return Math.hypot(dx, dy); };
  const ogoh = e=>{ const r = xonaOf(e.x, e.y); if(!r) return 'devor tashqarisida'; if(r.id === 'hammom' && (e.t === 'rozetka' || e.t === 'kalit') && vannaMasofa(e.x, e.y) < .6) return 'vannadan 0,6 m dan yaqin (2-zona)'; if(e.t === 'plita' && r.id !== 'oshxona') return 'plita faqat oshxonada'; return ''; };
  function chiz(E){
    const cx = E.cx;
    /* devorlar */
    XONA.forEach(r=>{ const X = E.X(r.x), Yy = E.Y(Y(r.y)), W = r.w * E.b, Hh = r.h * E.b; cx.fillStyle = r.id === 'hammom' ? 'rgba(92,200,255,.08)' : r.id === 'oshxona' ? 'rgba(255,193,77,.07)' : 'rgba(255,255,255,.035)'; cx.fillRect(X, Yy, W, Hh); cx.strokeStyle = 'rgba(220,226,255,.85)'; cx.lineWidth = 4; cx.strokeRect(X, Yy, W, Hh); E.matn(r.nom, X + W / 2, Yy + 16, {font:'600 12px Inter, sans-serif', rang:'#9aa3c7'}); E.matn(son(r.w, 1) + ' × ' + son(r.h, 1) + ' m', X + W / 2, Yy + 31, {font:'500 10.5px "JetBrains Mono", monospace', rang:'#6e769a'}); });
    /* eshiklar */
    [[4, 1.2, 'v'], [3.4, 4.2, 'v'], [6, 4.2, 'v'], [4.6, 3.6, 'h'], [4.6, 6.6, 'h']].forEach(([x, y, d])=>{ const X = E.X(x), Yy = E.Y(Y(y)); cx.strokeStyle = '#ffc14d'; cx.lineWidth = 3; cx.beginPath(); if(d === 'v'){ cx.moveTo(X, Yy); cx.lineTo(X, Yy + .8 * E.b); cx.moveTo(X, Yy); cx.arc(X, Yy, .8 * E.b, 0, PI / 2); } else { cx.moveTo(X, Yy); cx.lineTo(X + .8 * E.b, Yy); cx.moveTo(X, Yy); cx.arc(X, Yy, .8 * E.b, -PI / 2, 0); } cx.stroke(); });
    /* vanna va zona */
    { const X = E.X(vanna.x), Yy = E.Y(Y(vanna.y)); E.yumaloq(X, Yy, vanna.w * E.b, vanna.h * E.b, 10); cx.fillStyle = 'rgba(92,200,255,.25)'; cx.fill(); cx.strokeStyle = '#5cc8ff'; cx.lineWidth = 2; cx.stroke(); E.matn('vanna', X + vanna.w * E.b / 2, Yy + vanna.h * E.b / 2, {font:'600 11px Inter, sans-serif', rang:'#bfe8ff'});
      if(s.qatlam === 'zona'){ cx.save(); cx.setLineDash([6, 5]); cx.strokeStyle = 'rgba(255,93,115,.9)'; cx.lineWidth = 1.5; cx.strokeRect(X - .6 * E.b, Yy - .6 * E.b, (vanna.w + 1.2) * E.b, (vanna.h + 1.2) * E.b); cx.restore(); E.matn('2-zona: 0,6 m — rozetka/kalit yo‘q', X + vanna.w * E.b / 2, Yy + vanna.h * E.b + .75 * E.b, {font:'600 10.5px Inter, sans-serif', rang:'#ff8fa3'}); } }
    /* simlar: shchitdan har asbobga */
    const shit = s.el.find(e=>e.t === 'shit');
    if(s.qatlam === 'sim' && shit){ s.el.forEach(e=>{ if(e === shit) return; const q = e.t === 'plita' ? 3 : e.t === 'rozetka' ? 2.2 : 1.4; const rang = e.t === 'plita' ? '#ff6b9a' : e.t === 'rozetka' ? '#ffc14d' : '#fff2a8'; cx.save(); cx.strokeStyle = rang; cx.globalAlpha = .75; cx.lineWidth = q; cx.beginPath(); cx.moveTo(E.X(shit.x), E.Y(Y(shit.y))); cx.lineTo(E.X(e.x), E.Y(Y(shit.y))); cx.lineTo(E.X(e.x), E.Y(Y(e.y))); cx.stroke(); cx.restore(); }); }
    /* asboblar */
    s.el.forEach((e, i)=>{ const X = E.X(e.x), Yy = E.Y(Y(e.y)), A = ASBOB[e.t], og = ogoh(e); const r = e.t === 'shit' || e.t === 'plita' ? 13 : 10; E.doira(X, Yy, r, og ? 'rgba(255,93,115,.9)' : A.rang, '#0b0e1c', 2); E.matn(A.b, X, Yy + 1, {font:'700 11px "JetBrains Mono", monospace', rang:'#0b0e1c'}); if(og) E.matn('!', X + 11, Yy - 11, {font:'800 12px Inter, sans-serif', rang:'#fff', fon:'rgba(255,93,115,.95)'}); });
    /* masshtab */
    E.chiziq(E.X(0), E.Y(Y(-.3)), E.X(1), E.Y(Y(-.3)), '#9aa3c7', 2); E.matn('1 m', E.X(.5), E.Y(Y(-.3)) - 10, {font:'600 10.5px "JetBrains Mono", monospace', rang:'#9aa3c7'});
  }
  function bosish(x, y){
    const wy = Y(y);
    if(s.ochir){ const i = s.el.findIndex(e=>Math.hypot(e.x - x, e.y - wy) * E.b < 14); if(i >= 0){ const e = s.el.splice(i, 1)[0]; hodisa('ts-loyiha', evD({amal:'och', t:e.t})); E.iflos = true; yoz(); } return; }
    const r = xonaOf(x, wy); if(!r) return;
    if(s.asbob === 'shit' && s.el.some(e=>e.t === 'shit')) { s.el = s.el.filter(e=>e.t !== 'shit'); }
    const e = {t:s.asbob, x:+x.toFixed(2), y:+wy.toFixed(2)}; s.el.push(e);
    E.iflos = true; yoz();
    hodisa('ts-loyiha', evD({amal:'qoy', t:e.t, xona:r.id, ogoh:ogoh(e), masofaVanna:+vannaMasofa(e.x, e.y).toFixed(2)}));
  }
  function ustida(x, y){ const wy = Y(y); const e = s.el.find(e=>Math.hypot(e.x - x, e.y - wy) * E.b < 14); if(e){ const r = xonaOf(e.x, e.y); return {matn:ASBOB[e.t].nom + (r ? ' · ' + r.nom : '') + (ogoh(e) ? ' · <span style="color:#ff8fa3">' + ogoh(e) + '</span>' : ''), bos:true}; } const r = xonaOf(x, wy); return r ? {matn:r.nom + ' — ' + ASBOB[s.asbob].nom + ' qo‘yish', bos:true} : null; }
  const evD = q=>{ const soni = {}; Object.keys(ASBOB).forEach(k=>soni[k] = s.el.filter(e=>e.t === k).length); const xonalar = {}; XONA.forEach(r=>{ xonalar[r.id] = {}; Object.keys(ASBOB).forEach(k=>xonalar[r.id][k] = s.el.filter(e=>e.t === k && xonaOf(e.x, e.y) === r).length); }); return Object.assign({asbob:s.asbob, soni, xonalar, ogohlar:s.el.filter(e=>ogoh(e)).length, el:s.el.slice()}, q || {}); };
  function yoz(){
    const n = evD(); const og = s.el.filter(e=>ogoh(e));
    E.karta.yoz('Texnologiya · elektr tarmog‘i rejasi', s.el.length + ' ta element' + (og.length ? ' · <span class="p">' + og.length + ' ogohlantirish</span>' : ''),
      '<div class="q"><span>Rozetka</span><b class="y">' + n.soni.rozetka + '</b><span>Chiroq / kalit</span><b>' + n.soni.chiroq + ' / ' + n.soni.kalit + '</b><span>Plita</span><b class="p">' + n.soni.plita + '</b></div><table><tr><th>Guruh</th><th>Mis sim</th><th>Avtomat</th></tr><tr><td>yoritish</td><td>1,5 mm²</td><td>10 A</td></tr><tr><td>rozetkalar</td><td>2,5 mm²</td><td>16 A</td></tr><tr><td>plita</td><td>6 mm²</td><td>32 A</td></tr></table><div class="iz">Hammomdagi rozetka/kalit vannadan kamida 0,6 m (2-zonadan tashqari), 30 mA UZO orqali.</div>');
  }
  const tagChiz = ()=>{
    tag.innerHTML = Object.keys(ASBOB).map(k=>TG('data-as="' + k + '"', ASBOB[k].nom, s.asbob === k && !s.ochir)).join('') + TG('data-och="1"', 'O‘chirgich', s.ochir) + '<span class="ts-ajr"></span>' + [['reja', 'Reja'], ['sim', 'Simlar'], ['zona', 'Hammom zonalari']].map(([k, n])=>TG('data-q="' + k + '"', n, s.qatlam === k)).join('') + TG('data-t="1"', 'Tozalash', false);
    tugmaBog(tag, 'data-as', k=>{ s.asbob = k; s.ochir = false; tagChiz(); });
    tugmaBog(tag, 'data-och', ()=>{ s.ochir = !s.ochir; tagChiz(); });
    tugmaBog(tag, 'data-q', k=>{ s.qatlam = k; E.iflos = true; tagChiz(); hodisa('ts-loyiha', evD({amal:'qatlam', qatlam:k})); });
    tugmaBog(tag, 'data-t', ()=>{ s.el = []; E.iflos = true; yoz(); tagChiz(); hodisa('ts-loyiha', evD({amal:'toz'})); });
  };
  yorliq('Texnologiya · uy elektr tarmog‘i rejasi (2D)');
  izoh.innerHTML = 'Asbobni tanlab, xonaga bosing. Qizil «!» — qoida buzilgan (masalan, vannaga yaqin rozetka). «Simlar» — shchitdan tarmoq chiziqlari.';
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   8. RANG DOIRASI VA ARALASHTIRISH — Itten 12 rang (RYB) va RGB (2D)
   ===================================================================== */
const ITTEN = [
  {k:'sariq', n:'Sariq', h:'#ffe600', t:'asosiy'}, {k:'sariq-tosariq', n:'Sariq-to‘q sariq', h:'#ffb400', t:'uchinchi'}, {k:'tosariq', n:'To‘q sariq', h:'#ff7a00', t:'hosila'},
  {k:'qizil-tosariq', n:'Qizil-to‘q sariq', h:'#ff3d00', t:'uchinchi'}, {k:'qizil', n:'Qizil', h:'#e3001b', t:'asosiy'}, {k:'qizil-binafsha', n:'Qizil-binafsha', h:'#a4005f', t:'uchinchi'},
  {k:'binafsha', n:'Binafsha', h:'#5a1a8c', t:'hosila'}, {k:'kok-binafsha', n:'Ko‘k-binafsha', h:'#2f2f9e', t:'uchinchi'}, {k:'kok', n:'Ko‘k', h:'#0047ab', t:'asosiy'},
  {k:'kok-yashil', n:'Ko‘k-yashil', h:'#008a8a', t:'uchinchi'}, {k:'yashil', n:'Yashil', h:'#1f9d3a', t:'hosila'}, {k:'sariq-yashil', n:'Sariq-yashil', h:'#9bcf1e', t:'uchinchi'}
];
const RYB_ARAL = {'sariq+qizil':'tosariq', 'qizil+kok':'binafsha', 'kok+sariq':'yashil', 'sariq+tosariq':'sariq-tosariq', 'qizil+tosariq':'qizil-tosariq', 'qizil+binafsha':'qizil-binafsha', 'kok+binafsha':'kok-binafsha', 'kok+yashil':'kok-yashil', 'sariq+yashil':'sariq-yashil'};
const hex2rgb = h=>[parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const rgb2hex = c=>'#' + c.map(v=>Math.round(cl(v, 0, 255)).toString(16).padStart(2, '0')).join('');
reg('rang', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {rejim:'doira', a:null, b:null, tanl:null, qatlam:'hammasi', rgb:{r:255, g:0, b:0, r2:0, g2:0, b2:255}};
  const E = tekis(sahna, c, {
    olam:()=>{ const dar = E.W < 640; return s.rejim === 'rgb' ? (dar ? [-4.2, -5.8, 1.2, 3.2] : [-5.2, -3.6, 5.2, 3.6]) : (dar ? [-4.9, -6.6, 2.5, 3.7] : [-5.6, -3.7, 6.4, 3.7]); },
    chiz, bosish, ustida,
    holat(h){ if(h.rejim) s.rejim = h.rejim; if(h.qatlam) s.qatlam = h.qatlam; if(h.a !== undefined) s.a = h.a; if(h.b !== undefined) s.b = h.b; if(h.tanl !== undefined) s.tanl = h.tanl; if(h.rgb) Object.assign(s.rgb, h.rgb); tagChiz(); yoz(); }
  });
  const sek = i=>{ const a0 = -PI / 2 - PI / 12 + i * PI / 6; return [a0, a0 + PI / 6]; };
  const aralRYB = ()=>{ if(!s.a || !s.b) return null; if(s.a === s.b) return s.a; const k = RYB_ARAL[s.a + '+' + s.b] || RYB_ARAL[s.b + '+' + s.a]; if(k) return k; /* boshqa juftlik: pigmentlar o‘rtacha, ko‘pincha xira/qo‘ng‘ir */ const A = hex2rgb(ITTEN.find(x=>x.k === s.a).h), B = hex2rgb(ITTEN.find(x=>x.k === s.b).h); const i1 = ITTEN.findIndex(x=>x.k === s.a), i2 = ITTEN.findIndex(x=>x.k === s.b), far = Math.min((i1 - i2 + 12) % 12, (i2 - i1 + 12) % 12); const q = far >= 5 ? .55 : .85; return rgb2hex([0, 1, 2].map(j=>((A[j] + B[j]) / 2) * q)); };
  const rangHex = k=>k && k[0] === '#' ? k : (ITTEN.find(x=>x.k === k) || {}).h;
  function chiz(E){
    const cx = E.cx;
    if(s.rejim === 'rgb'){ chizRGB(E); return; }
    const cX = E.X(-1.2), cY = E.Y(0), R = 2.9 * E.b, r0 = 1.25 * E.b;
    ITTEN.forEach((rg, i)=>{
      const [a0, a1] = sek(i); const korin = s.qatlam === 'hammasi' || (s.qatlam === 'asosiy' && rg.t === 'asosiy') || (s.qatlam === 'hosila' && rg.t !== 'uchinchi') || (s.qatlam === 'issiq' && i <= 5) || (s.qatlam === 'sovuq' && i >= 6);
      cx.beginPath(); cx.arc(cX, cY, R, a0, a1); cx.arc(cX, cY, r0, a1, a0, true); cx.closePath();
      cx.fillStyle = korin ? rg.h : 'rgba(255,255,255,.06)'; cx.fill(); cx.strokeStyle = '#0b0e1c'; cx.lineWidth = 2.5; cx.stroke();
      const tanl = s.tanl === rg.k || s.a === rg.k || s.b === rg.k;
      if(tanl){ cx.save(); cx.strokeStyle = '#fff'; cx.lineWidth = 3.5; cx.beginPath(); cx.arc(cX, cY, R + 4, a0, a1); cx.stroke(); cx.restore(); }
      const am = (a0 + a1) / 2, rr = (R + r0) / 2;
      if(korin && rg.t !== 'uchinchi') E.matn(rg.t === 'asosiy' ? '●' : '○', cX + Math.cos(am) * rr, cY + Math.sin(am) * rr, {font:'700 14px Inter, sans-serif', rang:'rgba(0,0,0,.55)'});
      if(E.b > 44 && korin) E.matn(rg.n, cX + Math.cos(am) * (R + 16), cY + Math.sin(am) * (R + 16), {font:'600 10.5px Inter, sans-serif', rang:'#c5cbe3', al:Math.cos(am) > .2 ? 'left' : Math.cos(am) < -.2 ? 'right' : 'center'});
    });
    /* markaz: asosiy uchburchak */
    const uch = [0, 4, 8].map(i=>{ const am = (sek(i)[0] + sek(i)[1]) / 2; return [cX + Math.cos(am) * r0 * .82, cY + Math.sin(am) * r0 * .82]; });
    E.kopburchak(uch, 'rgba(255,255,255,.05)', 'rgba(255,255,255,.35)', 1.5);
    [0, 4, 8].forEach((i, j)=>{ E.doira(uch[j][0], uch[j][1], 11, ITTEN[i].h, '#0b0e1c', 2); });
    if(s.qatlam === 'issiq' || s.qatlam === 'sovuq'){ E.chiziq(cX + Math.cos(sek(0)[0]) * R, cY + Math.sin(sek(0)[0]) * R, cX + Math.cos(sek(6)[0]) * R, cY + Math.sin(sek(6)[0]) * R, 'rgba(255,255,255,.6)', 2, {dash:[6, 5]}); E.matn('issiq', cX + R * .55, cY - R * .95, {font:'700 12px Inter, sans-serif', rang:'#ffc14d'}); E.matn('sovuq', cX - R * .55, cY + R * .95, {font:'700 12px Inter, sans-serif', rang:'#5cc8ff'}); }
    if(s.tanl){ const i = ITTEN.findIndex(x=>x.k === s.tanl); const j = (i + 6) % 12; const a1 = (sek(i)[0] + sek(i)[1]) / 2, a2 = (sek(j)[0] + sek(j)[1]) / 2; const rr = (R + r0) / 2; E.chiziq(cX + Math.cos(a1) * rr, cY + Math.sin(a1) * rr, cX + Math.cos(a2) * rr, cY + Math.sin(a2) * rr, '#fff', 2, {dash:[5, 4]}); }
    /* aralashtirish paneli (o‘ngda) */
    const dar = E.W < 640, pX = dar ? E.X(-1.2) : E.X(4.3), pY = dar ? E.Y(-4.9) : E.Y(1.6);
    E.matn('Aralashtirish (bo‘yoq, RYB)', pX, pY - 58, {font:'700 12px Inter, sans-serif', rang:'#dfe3f3'});
    const A = rangHex(s.a), B = rangHex(s.b), N = aralRYB();
    E.doira(pX - 46, pY, 24, A || 'rgba(255,255,255,.08)', '#fff', A ? 1.5 : 1); E.matn('1', pX - 46, pY + 40, {font:'600 11px Inter, sans-serif', rang:'#9aa3c7'});
    E.matn('+', pX - 11, pY, {font:'700 16px Inter, sans-serif', rang:'#9aa3c7'});
    E.doira(pX + 24, pY, 24, B || 'rgba(255,255,255,.08)', '#fff', B ? 1.5 : 1); E.matn('2', pX + 24, pY + 40, {font:'600 11px Inter, sans-serif', rang:'#9aa3c7'});
    E.matn('=', pX + 60, pY, {font:'700 16px Inter, sans-serif', rang:'#9aa3c7'});
    E.doira(pX + 98, pY, 28, rangHex(N) || 'rgba(255,255,255,.08)', '#fff', 2); E.matn(N ? (N[0] === '#' ? 'xira' : ITTEN.find(x=>x.k === N).n) : '?', pX + 98, pY + 44, {font:'600 11px Inter, sans-serif', rang:'#dfe3f3'});
    E.matn(s.a && s.b ? '' : 'doirada 1-, so‘ng 2-rangni bosing', pX + 26, pY + 72, {font:'500 11px Inter, sans-serif', rang:'#9aa3c7'});
  }
  function chizRGB(E){
    const cx = E.cx, cX = E.X(-1.6), cY = E.Y(.3), r = 1.5 * E.b;
    cx.save(); cx.globalCompositeOperation = 'lighter';
    [['#ff0000', 0], ['#00ff00', 1], ['#0000ff', 2]].forEach(([h, i])=>{ const a = -PI / 2 + i * PI * 2 / 3; E.doira(cX + Math.cos(a) * r * .55, cY + Math.sin(a) * r * .55, r, h); });
    cx.restore();
    E.matn('R', cX, cY - r * .95, {font:'800 16px Inter, sans-serif', rang:'#fff'}); E.matn('G', cX + r * .83, cY + r * .5, {font:'800 16px Inter, sans-serif', rang:'#fff'}); E.matn('B', cX - r * .83, cY + r * .5, {font:'800 16px Inter, sans-serif', rang:'#fff'});
    E.matn('Yorug‘lik qo‘shiladi: R+G = sariq, G+B = moviy (cyan), R+B = pushti (magenta), R+G+B = oq', cX, cY + r * 1.75, {font:'500 11px Inter, sans-serif', rang:'#c5cbe3'});
    /* o‘ngda: RGB aralashtirgich */
    const dar = E.W < 640, pX = dar ? E.X(-1.6) : E.X(3.2), pY = dar ? E.Y(-3.9) : E.Y(.6), g = s.rgb;
    const A = rgb2hex([g.r, g.g, g.b]), B = rgb2hex([g.r2, g.g2, g.b2]), N = rgb2hex([g.r + g.r2, g.g + g.g2, g.b + g.b2]);
    E.matn('Ikki yorug‘lik manbai (RGB)', pX, pY - 70, {font:'700 12px Inter, sans-serif', rang:'#dfe3f3'});
    E.doira(pX - 50, pY, 26, A, '#fff', 1.5); E.matn('+', pX - 12, pY, {font:'700 16px Inter, sans-serif', rang:'#9aa3c7'}); E.doira(pX + 26, pY, 26, B, '#fff', 1.5); E.matn('=', pX + 64, pY, {font:'700 16px Inter, sans-serif', rang:'#9aa3c7'}); E.doira(pX + 104, pY, 30, N, '#fff', 2);
    E.matn(A.toUpperCase(), pX - 50, pY + 42, {font:'600 10.5px "JetBrains Mono", monospace', rang:'#9aa3c7'}); E.matn(B.toUpperCase(), pX + 26, pY + 42, {font:'600 10.5px "JetBrains Mono", monospace', rang:'#9aa3c7'}); E.matn(N.toUpperCase(), pX + 104, pY + 46, {font:'600 10.5px "JetBrains Mono", monospace', rang:'#fff'});
    E.matn('Ekran piksellari shunday ishlaydi: qizil, yashil, ko‘k nurlar yig‘indisi', pX + 20, pY + 80, {font:'500 11px Inter, sans-serif', rang:'#9aa3c7'});
  }
  function doiraNom(x, y){ if(s.rejim === 'rgb') return null; const dx = x - (-1.2), dy = y - 0, d = Math.hypot(dx, dy); if(d < 1.25 || d > 2.9) return null; let a = Math.atan2(dy, dx); /* dunyo y yuqoriga: ekran burchagi teskari */ a = -a; let i = Math.round((a + PI / 2) / (PI / 6)); i = ((i % 12) + 12) % 12; return ITTEN[i]; }
  function bosish(x, y){
    const rg = doiraNom(x, y); if(!rg) return;
    if(s.rejim === 'aral'){ if(!s.a || (s.a && s.b)){ s.a = rg.k; s.b = null; } else s.b = rg.k; const n = aralRYB(); hodisa('ts-rang', {rejim:'aral', a:s.a, b:s.b, natija:n, bos:rg.k}); }
    else { s.tanl = rg.k; hodisa('ts-rang', {rejim:s.rejim, bos:rg.k, turi:rg.t, issiq:ITTEN.indexOf(rg) <= 5, qarama:ITTEN[(ITTEN.indexOf(rg) + 6) % 12].k}); detal('ts_rang', rg.k); }
    E.iflos = true; yoz();
  }
  function ustida(x, y){ const rg = doiraNom(x, y); return rg ? {matn:rg.n + ' · ' + rg.t + ' rang', bos:true} : null; }
  function yoz(){
    if(s.rejim === 'rgb'){ E.karta.yoz('San’at · RGB — additiv', 'Nur qo‘shiladi', '<div class="q"><span>Asosiy</span><b>qizil, yashil, ko‘k</b><span>Hammasi</span><b>oq</b><span>Qayerda</span><b>ekran, proyektor</b></div><div class="iz">Bo‘yoqda (RYB/CMY) ranglar nur yutib «ayiriladi», shuning uchun uchala asosiy bo‘yoq qo‘ng‘ir-qora beradi, uchala nur esa — oq.</div>'); return; }
    const t = ITTEN.find(x=>x.k === s.tanl); const i = t ? ITTEN.indexOf(t) : -1;
    E.karta.yoz('San’at · Itten rang doirasi', t ? t.n : '12 rang', (t ? '<div class="q"><span>Turi</span><b class="y">' + t.t + '</b><span>Guruh</span><b>' + (i <= 5 ? 'issiq' : 'sovuq') + '</b><span>Qarama-qarshi</span><b>' + ITTEN[(i + 6) % 12].n + '</b></div>' : '<div class="q"><span>●</span><b>asosiy: sariq, qizil, ko‘k</b><span>○</span><b>hosila: to‘q sariq, yashil, binafsha</b><span>qolgan 6</span><b>uchinchi darajali</b></div>') + '<div class="iz">Bo‘yoq uchun RYB doirasi (Itten). Ekran uchun RGB — «RGB» tugmasini bosing.</div>');
  }
  const tagChiz = ()=>{
    tag.innerHTML = [['doira', 'Doira'], ['aral', 'Aralashtirish'], ['rgb', 'RGB (nur)']].map(([k, n])=>TG('data-r="' + k + '"', n, s.rejim === k)).join('') +
      (s.rejim !== 'rgb' ? '<span class="ts-ajr"></span>' + [['hammasi', 'Hammasi'], ['asosiy', 'Asosiy'], ['hosila', 'Asosiy + hosila'], ['issiq', 'Issiq'], ['sovuq', 'Sovuq']].map(([k, n])=>TG('data-q="' + k + '"', n, s.qatlam === k)).join('') : SL('r', 'R₁', 0, 255, 5, s.rgb.r, v=>v) + SL('g', 'G₁', 0, 255, 5, s.rgb.g, v=>v) + SL('b', 'B₁', 0, 255, 5, s.rgb.b, v=>v) + SL('r2', 'R₂', 0, 255, 5, s.rgb.r2, v=>v) + SL('g2', 'G₂', 0, 255, 5, s.rgb.g2, v=>v) + SL('b2', 'B₂', 0, 255, 5, s.rgb.b2, v=>v));
    tugmaBog(tag, 'data-r', k=>{ s.rejim = k; if(k === 'aral'){ s.a = s.b = null; } E.iflos = true; tagChiz(); yoz(); hodisa('ts-rang', {rejim:k}); });
    tugmaBog(tag, 'data-q', k=>{ s.qatlam = k; E.iflos = true; tagChiz(); hodisa('ts-rang', {rejim:s.rejim, qatlam:k}); });
    slayderBog(tag, {}, (k, v)=>{ s.rgb[k] = v; E.iflos = true; const g = s.rgb; hodisa('ts-rang', {rejim:'rgb', rgb:Object.assign({}, g), natija:rgb2hex([g.r + g.r2, g.g + g.g2, g.b + g.b2])}); });
  };
  yorliq('San’at · rang doirasi (Itten, RYB) va RGB');
  izoh.innerHTML = 'Doirada rangni bosing — turi va qarama-qarshi rangi chiqadi. «Aralashtirish» — ikki bo‘yoqni tanlang; «RGB» — nur aralashuvi, ekran kabi.';
  tagChiz(); yoz(); E.boshla();
  return E.api;
});


/* =====================================================================
   9. CHIZIQLI PERSPEKTIVA — 3D ko‘cha + ufq va yo‘qolish nuqtalari (2D ustma-ust)
   ===================================================================== */
reg('persp', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:0, ry:0, fov:50, rxMin:-.5, rxMax:.8, zoom:1});
  const {S, T} = H;
  const s = {rejim:'bir', ufq:'orta', chiziq:true, t:0};
  H.nomlar = {bino1:'Yaqin bino (chap)', bino2:'O‘rta bino (chap)', bino3:'Uzoq bino (chap)', bino4:'Yaqin bino (o‘ng)', bino5:'O‘rta bino (o‘ng)', bino6:'Uzoq bino (o‘ng)', yol:'Yo‘l (parallel chiziqlar)', daraxt:'Daraxt'};
  const G = new T.Group(); S.g.add(G);
  const BIN = [];
  const binoM = i=>H.mat(['#5a6aa8', '#7b63ff', '#4e9fd0', '#8a7bd8', '#3f7fb8', '#6c5fc0'][i % 6], {roughness:.6});
  const derazaTex = H.tex(128, 256, (x, w, h)=>{ x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h); for(let r = 0; r < 8; r++) for(let k = 0; k < 3; k++){ x.fillStyle = Math.random() > .3 ? 'rgba(255,228,160,.85)' : 'rgba(20,24,50,.8)'; x.fillRect(14 + k * 36, 12 + r * 30, 24, 18); } }, [1, 1]);
  const yer = new T.Mesh(new T.PlaneGeometry(60, 80), H.mat('#1a1f3a', {roughness:.95})); yer.rotation.x = -PI / 2; yer.position.set(0, 0, -20); G.add(yer);
  const yol = new T.Mesh(new T.PlaneGeometry(4.2, 80), H.mat('#2c3150', {roughness:.9})); yol.rotation.x = -PI / 2; yol.position.set(0, .005, -20); yol.userData.nom = 'yol'; G.add(yol);
  for(let i = 0; i < 14; i++){ const b = new T.Mesh(new T.PlaneGeometry(.18, 1.6), H.mat('#e9ecf3', {emissive:H.rang('#444')})); b.rotation.x = -PI / 2; b.position.set(0, .01, -i * 4 - 1); b.userData.nom = 'yol'; G.add(b); }
  [[-4.2, -3, 2.4, 3.2, 'bino1'], [-4.2, -9, 2.4, 4.6, 'bino2'], [-4.2, -16, 2.4, 2.8, 'bino3'], [4.2, -4, 2.4, 2.6, 'bino4'], [4.2, -10.5, 2.4, 5.2, 'bino5'], [4.2, -18, 2.4, 3.4, 'bino6']].forEach(([x, z, w, h, nom], i)=>{
    const b = new T.Mesh(new T.BoxGeometry(w, h, 3.6), binoM(i)); b.position.set(x, h / 2, z); b.userData.nom = nom; b.userData.joy = nom === 'bino1' || nom === 'bino4' ? 'yaqin' : nom === 'bino2' || nom === 'bino5' ? 'orta' : 'uzoq'; G.add(b); BIN.push(b);
    const d = new T.Mesh(new T.PlaneGeometry(w * .9, h * .9), new T.MeshBasicMaterial({map:derazaTex, transparent:true})); d.material.userData.env = 1; d.position.set(x + (x < 0 ? w / 2 + .01 : -w / 2 - .01), h / 2, z); d.rotation.y = x < 0 ? PI / 2 : -PI / 2; d.userData.nom = nom; d.userData.joy = b.userData.joy; G.add(d);
  });
  for(let i = 0; i < 6; i++){ const t = new T.Group(); const tana = H.sil(.08, .1, 1.1, H.plast('#6b4a2a')); tana.position.y = .55; t.add(tana); const barg = H.shar(.55, H.plast('#2e8b57'), 16); barg.position.y = 1.4; t.add(barg); t.position.set(i % 2 ? 2.6 : -2.6, 0, -i * 5 - 2.5); t.traverse(o=>{ if(o.isMesh) o.userData.nom = 'daraxt'; }); G.add(t); }
  /* ustma-ust 2D qatlam: ufq va yo‘qolish chiziqlari */
  const ov = document.createElement('canvas'); ov.className = 'ts-ustqat'; sahna.append(ov);
  const ox = ov.getContext('2d');
  const UFQ = {past:[.5, .05], orta:[1.65, 0], baland:[5.5, .22]};
  const proj = v=>{ const p = v.clone().applyMatrix4(S.aylan.matrixWorld).project(S.cam); return [(p.x + 1) / 2 * ov.width / E_dpr(), (1 - p.y) / 2 * ov.height / E_dpr(), p.z]; };
  const E_dpr = ()=>TEJAM ? 1 : Math.min(2, window.devicePixelRatio || 1);
  function overlay(){
    const W = sahna.clientWidth || 600, Hh = sahna.clientHeight || 400, dpr = E_dpr();
    if(ov.width !== Math.round(W * dpr) || ov.height !== Math.round(Hh * dpr)){ ov.width = Math.round(W * dpr); ov.height = Math.round(Hh * dpr); }
    ox.setTransform(dpr, 0, 0, dpr, 0, 0); ox.clearRect(0, 0, W, Hh);
    if(!s.chiziq || H.uq) return;
    const ry = s.rejim === 'ikki' ? .62 : 0;
    const dirs = s.rejim === 'ikki' ? [new T.Vector3(Math.sin(ry), 0, -Math.cos(ry)), new T.Vector3(-Math.cos(ry), 0, -Math.sin(ry))] : [new T.Vector3(0, 0, -1)];
    /* yo‘qolish nuqtalari: juda uzoq nuqtalar proyeksiyasi (kamera balandligida) */
    const camY = UFQ[s.ufq][0];
    const vps = dirs.map(d=>proj(new T.Vector3(0, camY, 0).addScaledVector(d, 4000)));
    /* ufq */
    const yU = vps[0][1];
    ox.save(); ox.strokeStyle = 'rgba(255,193,77,.9)'; ox.lineWidth = 1.5; ox.setLineDash([8, 6]); ox.beginPath(); ox.moveTo(0, yU); ox.lineTo(W, yU); ox.stroke(); ox.restore();
    ox.font = '600 11px Inter, sans-serif'; ox.fillStyle = '#ffc14d'; ox.textAlign = 'left'; ox.fillText('ufq chizig‘i (ko‘z balandligi)', 12, yU - 7);
    /* binolar qirralaridan yo‘qolish nuqtasiga chiziqlar */
    const rang = ['rgba(92,200,255,.75)', 'rgba(255,107,154,.75)'];
    ox.lineWidth = 1;
    BIN.forEach(b=>{
      const w = b.geometry.parameters.width / 2, h = b.geometry.parameters.height, d = b.geometry.parameters.depth / 2;
      const yaq = s.rejim === 'ikki' ? [[-w, 0, d], [-w, h, d], [w, 0, d], [w, h, d]] : [[-w, 0, d], [-w, h, d], [w, 0, d], [w, h, d]];
      yaq.forEach(([x, y, z])=>{ const p = proj(new T.Vector3(x, y, z).applyMatrix4(b.matrixWorld)); if(p[2] > 1) return; dirs.forEach((dd, k)=>{ const vp = vps[k]; ox.strokeStyle = rang[k]; ox.beginPath(); ox.moveTo(p[0], p[1]); ox.lineTo(vp[0], vp[1]); ox.stroke(); }); });
    });
    vps.forEach((vp, k)=>{ ox.fillStyle = k ? '#ff6b9a' : '#5cc8ff'; ox.beginPath(); ox.arc(vp[0], vp[1], 6, 0, PI * 2); ox.fill(); ox.strokeStyle = '#fff'; ox.lineWidth = 2; ox.stroke(); ox.fillStyle = '#fff'; ox.font = '700 11px Inter, sans-serif'; ox.textAlign = 'center'; ox.fillText(s.rejim === 'ikki' ? (k ? 'YN₂' : 'YN₁') : 'yo‘qolish nuqtasi', cl(vp[0], 60, W - 60), cl(vp[1] + 22, 16, Hh - 8)); });
  }
  const yoz = ()=>H.karta.yoz('San’at · chiziqli perspektiva', s.rejim === 'bir' ? '1 nuqtali (frontal)' : '2 nuqtali (burchakli)', '<div class="q"><span>Ufq</span><b class="y">ko‘z balandligida</b><span>Nuqta</span><b class="k">' + (s.rejim === 'bir' ? '1 ta — qarshida' : '2 ta — ufqda, chap va o‘ngda') + '</b><span>Qoida</span><b>uzoqlashgan sari kichrayadi</b></div><div class="iz">' + (s.ufq === 'past' ? 'Past ufq — «qurbaqa nuqtai nazari»: binolar ulkan ko‘rinadi.' : s.ufq === 'baland' ? 'Baland ufq — «qush nuqtai nazari»: yo‘l va tomlar ko‘proq ko‘rinadi.' : 'O‘rta ufq — odam ko‘zi balandligi (≈ 1,6 m).') + '</div>');
  const tagChiz = ()=>{
    tag.innerHTML = TG('data-r="bir"', '1 nuqtali', s.rejim === 'bir') + TG('data-r="ikki"', '2 nuqtali', s.rejim === 'ikki') + '<span class="ts-ajr"></span>' + [['past', 'Past ufq'], ['orta', 'O‘rta ufq'], ['baland', 'Baland ufq']].map(([k, n])=>TG('data-u="' + k + '"', n, s.ufq === k)).join('') + TG('data-ch="1"', s.chiziq ? 'Chiziqlar: yoqiq' : 'Chiziqlar', s.chiziq);
    tugmaBog(tag, 'data-r', k=>{ s.rejim = k; yoz(); tagChiz(); hodisa('ts-persp', ev()); });
    tugmaBog(tag, 'data-u', k=>{ s.ufq = k; yoz(); tagChiz(); hodisa('ts-persp', ev()); });
    tugmaBog(tag, 'data-ch', ()=>{ s.chiziq = !s.chiziq; tagChiz(); hodisa('ts-persp', ev()); });
  };
  const ev = q=>Object.assign({rejim:s.rejim, ufq:s.ufq, chiziq:s.chiziq, nuqtalar:s.rejim === 'bir' ? 1 : 2}, q || {});
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-persp', ev({bos:d.nom, joy:d.joy})); detal('ts_persp', d.nom); };
  S.joyla(6, new T.Vector3(0, 0, 0));
  H.kadr = (dt, t)=>{
    s.t += dt;
    const [camY, pitch] = UFQ[s.ufq], ry = s.rejim === 'ikki' ? .62 : 0;
    S.aylan.rotation.set(pitch, ry, 0);
    /* kamera dunyoda (0, camY, 4) nuqtada: guruhni teskari suramiz */
    const C = new T.Vector3(s.rejim === 'ikki' ? 1.2 : 0, camY, 4.5);
    S.g.position.set(-C.x, -C.y, -C.z);
    S.cam.position.set(0, 0, 0); S.cam.lookAt(0, 0, -1);
    S.aylan.updateMatrixWorld(true);
    overlay();
  };
  S.zoomla = ()=>{}; S.tikla = ()=>{};
  const yopAsl = H.yopish; H.yopish = ()=>{ ov.remove(); if(yopAsl) yopAsl(); };
  S.holat = h=>{ if(!h) return; if(h.rejim) s.rejim = h.rejim; if(h.ufq) s.ufq = h.ufq; if(h.chiziq !== undefined) s.chiziq = !!h.chiziq; yoz(); tagChiz(); };
  yorliq('San’at · chiziqli perspektiva (3D ko‘cha + chiziqlar)');
  izoh.innerHTML = 'Sariq punktir — ufq (ko‘z balandligi). Ko‘k/pushti chiziqlar bino qirralaridan yo‘qolish nuqtasiga boradi. Ufq balandligini o‘zgartirib ko‘ring.';
  yoz(); tagChiz();
  return S;
});

/* =====================================================================
   10. YORUG‘LIK, SOYA VA HAJM — 3D shar/kub/silindr, soya xaritasi
   ===================================================================== */
reg('yorug', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.38, ry:.5, fov:30, rxMin:.05, rxMax:1.3});
  const {S, T} = H;
  const s = {shakl:'shar', az:40, bal:45, kuch:1.3, yorliq:true, t:0};
  H.nomlar = {yorug:'Yorug‘ (nur to‘g‘ri tushgan yuza)', blik:'Blik (eng yorug‘ nuqta)', yarim:'Yarim soya (penumbra — yuza buriladi)', soya:'Shaxsiy soya (nur tushmaydigan yuza)', refleks:'Refleks (atrofdan qaytgan nur)', tushuvchi:'Tushuvchi soya (buyum atrofidagi yuzada)', buyum:'Buyum', manba:'Yorug‘lik manbai'};
  S.ren.shadowMap.enabled = true; S.ren.shadowMap.type = T.PCFSoftShadowMap;
  H.kalit.intensity = .25; H.toldir.intensity = .25; H.orqa.intensity = .3;
  const G = new T.Group(); S.g.add(G);
  const pol = new T.Mesh(new T.PlaneGeometry(9, 9), H.mat('#555c78', {roughness:.95})); pol.rotation.x = -PI / 2; pol.receiveShadow = true; pol.userData.nom = 'tushuvchi'; G.add(pol);
  const devor = new T.Mesh(new T.PlaneGeometry(9, 4), H.mat('#3a3f5c', {roughness:.95})); devor.position.set(0, 2, -3.2); devor.receiveShadow = true; G.add(devor);
  /* protsedurali yumshoq tushuvchi soya (soya xaritasi ishlamagan muhitlarda ham ko‘rinsin) */
  const soyaEl = H.soya(1.1, .012, 0, 0, .7); soyaEl.userData.rentgenYoq = true; G.add(soyaEl);
  const buyumM = H.mat('#d9c9a8', {roughness:.55, metalness:.02});
  let buyum = null;
  const spot = new T.SpotLight(0xfff1dc, 1.3, 30, .55, .5, 1); spot.castShadow = true; spot.shadow.mapSize.set(TEJAM ? 1024 : 2048, TEJAM ? 1024 : 2048); spot.shadow.bias = -.0006; S.g.add(spot); S.g.add(spot.target);
  const lampa = H.shar(.14, new T.MeshBasicMaterial({color:H.rang('#fff2c7')}), 16); lampa.material.userData.env = 1; lampa.userData.nom = 'manba'; G.add(lampa);
  const nurS = H.nur('#ffd98a', 1.4); G.add(nurS);
  const sim = H.tayoq(new T.Vector3(0, 0, 0), new T.Vector3(0, 1, 0), .012, H.metall('#555')); G.add(sim);
  const nuqtaM = hex=>{ const m = new T.MeshBasicMaterial({color:H.rang(hex), transparent:true, opacity:.9, depthTest:false}); m.userData.env = 1; return m; };
  const ZON = ['yorug', 'blik', 'yarim', 'soya', 'refleks', 'tushuvchi'].map(nom=>{ const g = new T.Group(); const m = H.shar(.07, nuqtaM({yorug:'#fff2a8', blik:'#ffffff', yarim:'#ffb86b', soya:'#5a4a8a', refleks:'#7fd1b9', tushuvchi:'#5cc8ff'}[nom]), 12); m.renderOrder = 30; m.userData.nom = nom; g.add(m); const h = H.tor(.11, .012, nuqtaM('#ffffff')); h.renderOrder = 30; h.userData.nom = nom; g.add(h); const y = H.yozuv(H.nomlar[nom].split(' (')[0], {k:.3}); y.position.y = .28; g.add(y); g.userData.yoz = y; g.userData.h = h; G.add(g); return g; });
  function shaklQur(){
    if(buyum){ G.remove(buyum); buyum.geometry.dispose(); }
    const g = s.shakl === 'shar' ? new T.SphereGeometry(1, 64, 40) : s.shakl === 'kub' ? new T.BoxGeometry(1.7, 1.7, 1.7) : new T.CylinderGeometry(.85, .85, 1.9, 56);
    buyum = new T.Mesh(g, buyumM); buyum.castShadow = true; buyum.receiveShadow = true; buyum.position.y = s.shakl === 'shar' ? 1 : s.shakl === 'kub' ? .85 : .95; if(s.shakl === 'kub') buyum.rotation.y = .35; buyum.userData.nom = 'buyum'; G.add(buyum);
  }
  const L = new T.Vector3();
  function hisob(){
    const a = s.az * RAD, b = s.bal * RAD, r = 4.2;
    L.set(Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a));
    const P = L.clone().multiplyScalar(r).add(new T.Vector3(0, 1, 0));
    spot.position.copy(P); spot.target.position.set(0, .9, 0); spot.intensity = s.kuch; lampa.position.copy(P); nurS.position.copy(P); nurS.scale.setScalar(1 + s.kuch * .5);
    sim.position.set(P.x, P.y, P.z); sim.scale.y = 4.5 - P.y > 0 ? 4.5 - P.y : .1;
    const markaz = new T.Vector3(0, buyum.position.y, 0), R = s.shakl === 'shar' ? 1.02 : s.shakl === 'kub' ? 1.0 : .88;
    const Lh = new T.Vector3(L.x, 0, L.z).normalize(), yon = new T.Vector3().crossVectors(new T.Vector3(0, 1, 0), L).normalize();
    const joy = {
      yorug:markaz.clone().addScaledVector(L, R), blik:markaz.clone().addScaledVector(L.clone().add(new T.Vector3(0, 0, 1).normalize()).normalize(), R * 1.01),
      yarim:markaz.clone().addScaledVector(yon, R), soya:markaz.clone().addScaledVector(L.clone().multiplyScalar(-1).add(yon.clone().multiplyScalar(.4)).normalize(), R),
      refleks:markaz.clone().addScaledVector(new T.Vector3(-Lh.x, -.75, -Lh.z).normalize(), R), tushuvchi:new T.Vector3(0, .02, 0).addScaledVector(Lh, -(1.2 + 1.6 / Math.max(.35, Math.tan(b))))
    };
    ZON.forEach(z=>{ const nom = z.children[0].userData.nom; z.position.copy(joy[nom]); z.visible = s.yorliq && !H.uq; z.userData.yoz.visible = s.yorliq && !H.uq; });
    { const uz = 1.1 + 1.6 / Math.max(.35, Math.tan(b)); soyaEl.position.set(-Lh.x * uz * .5, .012, -Lh.z * uz * .5); soyaEl.rotation.z = -Math.atan2(Lh.z, Lh.x); soyaEl.scale.set(uz / 1.1 * .55, 1, 1); soyaEl.material.opacity = cl(.35 + s.kuch * .25, .3, .9); }
    if(H.uq) ZON.forEach(z=>{ z.visible = true; z.userData.yoz.visible = false; });
    H.karta.yoz('San’at · yorug‘lik va soya', {shar:'Shar', kub:'Kub', silindr:'Silindr'}[s.shakl] + ' · manba ' + s.az + '° / ' + s.bal + '°',
      '<div class="q"><span>Yorug‘ → yarim soya → soya</span><b class="y">yuza buriladi</b><span>Refleks</span><b class="s">soyada, atrofdan qaytgan nur</b><span>Tushuvchi soya</span><b class="k">manbaga qarama-qarshi tomonda</b></div><div class="iz">Manba pastroq bo‘lsa — tushuvchi soya uzayadi; balandroq bo‘lsa — qisqaradi. Belgilarni bosing.</div>');
  }
  const tagChiz = ()=>{
    tag.innerHTML = [['shar', 'Shar'], ['kub', 'Kub'], ['silindr', 'Silindr']].map(([k, n])=>TG('data-s="' + k + '"', n, s.shakl === k)).join('') + SL('az', 'Yo‘nalish', 0, 360, 5, s.az, v=>v + '°') + SL('bal', 'Balandlik', 10, 80, 5, s.bal, v=>v + '°') + SL('kuch', 'Kuch', .3, 2.5, .1, s.kuch, v=>son(v, 1)) + TG('data-y="1"', s.yorliq ? 'Belgilar: yoqiq' : 'Belgilar', s.yorliq);
    tugmaBog(tag, 'data-s', k=>{ s.shakl = k; shaklQur(); hisob(); tagChiz(); hodisa('ts-yorug', ev()); });
    tugmaBog(tag, 'data-y', ()=>{ s.yorliq = !s.yorliq; hisob(); tagChiz(); });
    slayderBog(tag, {az:v=>v + '°', bal:v=>v + '°', kuch:v=>son(v, 1)}, (k, v)=>{ s[k] = v; hisob(); hodisa('ts-yorug', ev()); });
  };
  const ev = q=>Object.assign({shakl:s.shakl, az:s.az, bal:s.bal, kuch:s.kuch, soyaUzun:+(1.6 / Math.max(.35, Math.tan(s.bal * RAD))).toFixed(2)}, q || {});
  S.bosish = d=>{ if(!d || !d.nom) return; hodisa('ts-yorug', ev({bos:d.nom})); detal('ts_yorug', d.nom); };
  S.holat = h=>{ if(!h) return; if(h.shakl) s.shakl = h.shakl; if(h.az !== undefined) s.az = cl(+h.az, 0, 360); if(h.bal !== undefined) s.bal = cl(+h.bal, 10, 80); if(h.kuch !== undefined) s.kuch = cl(+h.kuch, .3, 2.5); if(h.yorliq !== undefined) s.yorliq = !!h.yorliq; shaklQur(); hisob(); tagChiz(); };
  H.joy(2.3, new T.Vector3(0, 1.0, 0), 2.6);
  yorliq('San’at · yorug‘lik, soya va hajm (3D, soya xaritasi)');
  izoh.innerHTML = 'Manba yo‘nalishi va balandligini suring — shaxsiy va tushuvchi soya o‘zgaradi. Rangli belgilar — tonal zonalar, bosing.';
  shaklQur(); hisob(); tagChiz();
  return S;
});

/* =====================================================================
   11. KOMPOZITSIYA VA OLTIN KESIM — 2D kadr, sudraladigan obyektlar
   ===================================================================== */
const PHI = (1 + Math.sqrt(5)) / 2;
reg('komp', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const KW = 9, KH = 6;
  const s = {tor:'uchdan', ufq:.5, ob:[{k:'quyosh', x:.5, y:.72, r:.55, rang:'#ffd36b'}, {k:'daraxt', x:.2, y:.5, r:.7, rang:'#2e8b57'}, {k:'qayiq', x:.68, y:.33, r:.6, rang:'#d9b35a'}, {k:'odam', x:.85, y:.3, r:.5, rang:'#ff6b9a'}]};
  const NOM = {quyosh:'Quyosh', daraxt:'Daraxt', qayiq:'Qayiq', odam:'Odam', ufq:'Ufq chizig‘i'};
  const E = tekis(sahna, c, {
    olam:()=>[-.5, -.5, KW + 1.7, KH + .5],
    chiz, bosish, tutqich, ustida,
    holat(h){ if(h.tor) s.tor = h.tor; if(h.ufq !== undefined) s.ufq = cl(+h.ufq, .1, .9); if(h.ob) h.ob.forEach(o=>{ const q = s.ob.find(z=>z.k === o.k); if(q){ q.x = o.x; q.y = o.y; } }); tagChiz(); yoz(); }
  });
  const NUQ = {uchdan:[[1 / 3, 1 / 3], [2 / 3, 1 / 3], [1 / 3, 2 / 3], [2 / 3, 2 / 3]], oltin:[[1 / PHI - .5 + .5 - (1 / PHI - .5), 0]]};
  const a = 1 - 1 / PHI; /* 0,382 */
  NUQ.oltin = [[a, a], [1 - a, a], [a, 1 - a], [1 - a, 1 - a]];
  const kuchNuq = (x, y, tur)=>{ const n = NUQ[tur] || []; let eng = null, ed = 9; n.forEach(p=>{ const d = Math.hypot((p[0] - x) * KW, (p[1] - y) * KH); if(d < ed){ ed = d; eng = p; } }); return {yaqin:ed < .55, d:ed, p:eng}; };
  function chiz(E){
    const cx = E.cx, X0 = E.X(0), Y0 = E.Y(KH), W = KW * E.b, Hh = KH * E.b;
    /* osmon va yer (ufq bo‘yicha) */
    const yU = E.Y(s.ufq * KH);
    const gr = cx.createLinearGradient(0, Y0, 0, yU); gr.addColorStop(0, '#1a2a6b'); gr.addColorStop(1, '#5f7fd6'); cx.fillStyle = gr; cx.fillRect(X0, Y0, W, yU - Y0);
    const gr2 = cx.createLinearGradient(0, yU, 0, Y0 + Hh); gr2.addColorStop(0, '#2f6b4f'); gr2.addColorStop(1, '#17352a'); cx.fillStyle = gr2; cx.fillRect(X0, yU, W, Y0 + Hh - yU);
    /* tog‘lar (fon) */
    E.kopburchak([[X0, yU], [X0 + W * .18, yU - Hh * .14], [X0 + W * .32, yU - Hh * .04], [X0 + W * .5, yU - Hh * .18], [X0 + W * .7, yU - Hh * .06], [X0 + W * .86, yU - Hh * .12], [X0 + W, yU]], 'rgba(60,80,140,.7)');
    /* obyektlar */
    s.ob.forEach(o=>{ const X = E.X(o.x * KW), Y = E.Y(o.y * KH), r = o.r * E.b;
      if(o.k === 'quyosh'){ E.doira(X, Y, r * .55, o.rang); cx.save(); cx.globalAlpha = .25; E.doira(X, Y, r * .95, o.rang); cx.restore(); }
      else if(o.k === 'daraxt'){ cx.fillStyle = '#5a3a1e'; cx.fillRect(X - r * .08, Y - r * .1, r * .16, r * 1.0); E.kopburchak([[X, Y - r * 1.2], [X - r * .6, Y + r * .1], [X + r * .6, Y + r * .1]], o.rang); E.kopburchak([[X, Y - r * .8], [X - r * .5, Y + r * .4], [X + r * .5, Y + r * .4]], '#3aa36a'); }
      else if(o.k === 'qayiq'){ E.kopburchak([[X - r * .7, Y], [X + r * .7, Y], [X + r * .5, Y + r * .32], [X - r * .5, Y + r * .32]], o.rang); E.kopburchak([[X - r * .05, Y - r * .05], [X - r * .05, Y - r * .9], [X + r * .45, Y - r * .1]], '#f1f3ff'); }
      else { E.doira(X, Y - r * .62, r * .2, o.rang); E.kopburchak([[X - r * .22, Y - r * .4], [X + r * .22, Y - r * .4], [X + r * .18, Y + r * .5], [X - r * .18, Y + r * .5]], o.rang); }
      const kn = kuchNuq(o.x, o.y, s.tor);
      if(kn.yaqin){ E.doira(X, Y, 9, null, '#fff', 2); }
    });
    /* kadr ramkasi */
    cx.strokeStyle = '#f1f3ff'; cx.lineWidth = 3; cx.strokeRect(X0, Y0, W, Hh);
    /* to‘r */
    cx.save(); cx.setLineDash([7, 5]); cx.lineWidth = 1.5;
    if(s.tor === 'uchdan'){ cx.strokeStyle = 'rgba(255,255,255,.75)'; [1 / 3, 2 / 3].forEach(k=>{ cx.beginPath(); cx.moveTo(X0 + W * k, Y0); cx.lineTo(X0 + W * k, Y0 + Hh); cx.moveTo(X0, Y0 + Hh * k); cx.lineTo(X0 + W, Y0 + Hh * k); cx.stroke(); }); }
    else if(s.tor === 'oltin'){ cx.strokeStyle = 'rgba(255,193,77,.9)'; [a, 1 - a].forEach(k=>{ cx.beginPath(); cx.moveTo(X0 + W * k, Y0); cx.lineTo(X0 + W * k, Y0 + Hh); cx.moveTo(X0, Y0 + Hh * k); cx.lineTo(X0 + W, Y0 + Hh * k); cx.stroke(); }); }
    else if(s.tor === 'spiral'){ cx.strokeStyle = 'rgba(255,193,77,.9)'; cx.setLineDash([]); let x = X0, y = Y0, w = W, h = Hh, yon = 0; cx.beginPath(); for(let i = 0; i < 9; i++){ const kat = Math.min(w, h); const b = i % 4; /* kvadratni ajratib, chorak yoy chizish */ let cxx, cyy, a0; if(b === 0){ cxx = x + kat; cyy = y + kat; a0 = PI; cx.arc(cxx, cyy, kat, PI, 1.5 * PI); x += kat; w -= kat; } else if(b === 1){ cxx = x; cyy = y + kat; cx.arc(cxx, cyy, kat, 1.5 * PI, 2 * PI); y += kat; h -= kat; } else if(b === 2){ cxx = x + w - kat; cyy = y; cx.arc(cxx, cyy, kat, 0, .5 * PI); w -= kat; } else { cxx = x + w; cyy = y + h - kat; cx.arc(cxx, cyy, kat, .5 * PI, PI); h -= kat; } if(w <= 2 || h <= 2) break; } cx.lineWidth = 2; cx.stroke(); }
    cx.restore();
    const nq = NUQ[s.tor] || []; nq.forEach(p=>{ E.doira(X0 + W * p[0], Y0 + Hh * p[1], 5, s.tor === 'uchdan' ? '#fff' : '#ffc14d'); });
    /* ufq tutqichi */
    E.chiziq(X0, yU, X0 + W, yU, 'rgba(255,255,255,.55)', 1); E.doira(X0 + W + 14, yU, 7, '#ffc14d', '#0b0e1c', 1.5);
    E.matn('ufq ' + son(s.ufq, 2), X0 + W + 30, yU, {font:'600 10.5px "JetBrains Mono", monospace', rang:'#ffc14d', al:'left'});
  }
  const topOb = (x, y)=>{ const nx = x / KW, ny = y / KH; return s.ob.find(o=>Math.hypot((o.x - nx) * KW, (o.y - ny) * KH) < o.r * .9); };
  function tutqich(X, Y, x, y){
    const yU = E.Y(s.ufq * KH); if(Math.abs(Y - yU) < 10 && X > E.X(KW) - 6) return {sur:(wx, wy)=>{ s.ufq = cl(wy / KH, .1, .9); }, qoy:()=>{ yoz(); hodisa('ts-komp', ev({amal:'ufq'})); }};
    const o = topOb(x, y); if(!o) return null;
    return {sur:(wx, wy)=>{ o.x = cl(wx / KW, .03, .97); o.y = cl(wy / KH, .03, .97); }, qoy:()=>{ yoz(); hodisa('ts-komp', ev({amal:'sur', obyekt:o.k, x:+o.x.toFixed(3), y:+o.y.toFixed(3), uchdanNuqta:kuchNuq(o.x, o.y, 'uchdan').yaqin, oltinNuqta:kuchNuq(o.x, o.y, 'oltin').yaqin})); }};
  }
  function bosish(x, y){ const o = topOb(x, y); if(o){ hodisa('ts-komp', ev({bos:o.k, obyekt:o.k, x:+o.x.toFixed(3), y:+o.y.toFixed(3), uchdanNuqta:kuchNuq(o.x, o.y, 'uchdan').yaqin, oltinNuqta:kuchNuq(o.x, o.y, 'oltin').yaqin})); detal('ts_komp', o.k); } }
  function ustida(x, y){ const o = topOb(x, y); return o ? {matn:NOM[o.k] + ' — sudrang', bos:true} : null; }
  const ev = q=>Object.assign({tor:s.tor, ufq:+s.ufq.toFixed(3), ufqUchdan:Math.abs(s.ufq - 1 / 3) < .05 || Math.abs(s.ufq - 2 / 3) < .05, ob:s.ob.map(o=>({k:o.k, x:+o.x.toFixed(3), y:+o.y.toFixed(3), uchdan:kuchNuq(o.x, o.y, 'uchdan').yaqin, oltin:kuchNuq(o.x, o.y, 'oltin').yaqin}))}, q || {});
  function yoz(){ const n = ev(); E.karta.yoz('San’at · kompozitsiya', {uchdan:'Uchdan bir qoidasi', oltin:'Oltin kesim ≈ 0,618', spiral:'Oltin spiral', yoq:'To‘rsiz'}[s.tor], '<div class="q"><span>Kuchli nuqtalarda</span><b class="y">' + n.ob.filter(o=>s.tor === 'oltin' ? o.oltin : o.uchdan).map(o=>NOM[o.k]).join(', ') + (n.ob.some(o=>s.tor === 'oltin' ? o.oltin : o.uchdan) ? '' : '—') + '</b><span>Ufq</span><b>' + son(s.ufq, 2) + (n.ufqUchdan ? ' ✓ uchdan birda' : '') + '</b></div><div class="iz">Asosiy obyekt kadr markazida emas, chiziqlar kesishgan nuqtalarda — ko‘z «sayr qiladi». Ufqni markazdan siljiting.</div>'); }
  const tagChiz = ()=>{ tag.innerHTML = [['uchdan', 'Uchdan bir'], ['oltin', 'Oltin kesim'], ['spiral', 'Oltin spiral'], ['yoq', 'To‘rsiz']].map(([k, n])=>TG('data-t="' + k + '"', n, s.tor === k)).join('') + TG('data-m="1"', 'Markazga yig‘ish', false); tugmaBog(tag, 'data-t', k=>{ s.tor = k; E.iflos = true; tagChiz(); yoz(); hodisa('ts-komp', ev({amal:'tor'})); }); tugmaBog(tag, 'data-m', ()=>{ s.ob.forEach((o, i)=>{ o.x = .5 + (i - 1.5) * .06; o.y = .5; }); s.ufq = .5; E.iflos = true; yoz(); hodisa('ts-komp', ev({amal:'markaz'})); }); };
  yorliq('San’at · kompozitsiya va oltin kesim (2D)');
  izoh.innerHTML = 'Obyektlarni sudrab kuchli nuqtalarga qo‘ying; ufq tutqichi (o‘ngda) balandlikni o‘zgartiradi. Oq halqa — obyekt kuchli nuqtada.';
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   12. GIRIH VA ISLIMIY NAQSH — yulduz generatori (6/8/10/12), simmetriya
   ===================================================================== */
const GPAL = {registon:['#1b3a8a', '#2aa7a0', '#d9b35a', '#f1ecd9'], shohizinda:['#0f6f8f', '#45c3d0', '#e8dcc0', '#8a4b2a'], terrakota:['#8a4b2a', '#d9b35a', '#f1ecd9', '#1b3a8a']};
reg('girih', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {n:8, k:.55, takror:false, sim:false, pal:'registon', bur:0, anim:false, t:0};
  const E = tekis(sahna, c, {
    olam:()=>s.takror ? [-6.2, -4.1, 6.2, 4.1] : [-4.6, -3.4, 4.6, 3.4],
    chiz, bosish, ustida,
    kadr(dt){ if(s.anim){ s.bur += dt * .25; return true; } return false; },
    holat(h){ if(h.n) s.n = +h.n; if(h.k !== undefined) s.k = cl(+h.k, .25, .85); if(h.takror !== undefined) s.takror = !!h.takror; if(h.sim !== undefined) s.sim = !!h.sim; if(h.pal) s.pal = h.pal; if(h.anim !== undefined) s.anim = !!h.anim; tagChiz(); yoz(); }
  });
  function yulduz(E, X, Y, Rr, n, k, pal, bur){
    const cx = E.cx, p = [];
    for(let i = 0; i < n * 2; i++){ const a = bur + i * PI / n - PI / 2, r = i % 2 ? Rr * k : Rr; p.push([X + Math.cos(a) * r, Y + Math.sin(a) * r]); }
    /* atrof «gul yaproqlari» */
    for(let i = 0; i < n; i++){ const a0 = bur + i * 2 * PI / n - PI / 2, a1 = a0 + 2 * PI / n, am = (a0 + a1) / 2; const ich = [X + Math.cos(a0) * Rr, Y + Math.sin(a0) * Rr], ich2 = [X + Math.cos(a1) * Rr, Y + Math.sin(a1) * Rr], tash = [X + Math.cos(am) * Rr * 1.55, Y + Math.sin(am) * Rr * 1.55], o = [X + Math.cos(am) * Rr * k, Y + Math.sin(am) * Rr * k]; E.kopburchak([o, ich, tash, ich2], pal[1], '#0b0e1c', 1.5); }
    E.kopburchak(p, pal[0], pal[2], 2);
    /* ichki ko‘pburchak */
    const ich = []; for(let i = 0; i < n; i++){ const a = bur + i * 2 * PI / n - PI / 2 + PI / n; ich.push([X + Math.cos(a) * Rr * k, Y + Math.sin(a) * Rr * k]); }
    E.kopburchak(ich, pal[2], null);
    E.doira(X, Y, Rr * k * .35, pal[3] || '#fff');
  }
  function chiz(E){
    const cx = E.cx, pal = GPAL[s.pal], n = s.n;
    cx.fillStyle = '#0b1230'; cx.fillRect(0, 0, E.W, E.H);
    if(!s.takror){
      const X = E.X(0), Y = E.Y(0), Rr = 2.1 * E.b;
      yulduz(E, X, Y, Rr, n, s.k, pal, s.bur);
      if(s.sim){ cx.save(); cx.strokeStyle = 'rgba(255,255,255,.55)'; cx.setLineDash([6, 5]); cx.lineWidth = 1; for(let i = 0; i < n; i++){ const a = s.bur + i * PI / n - PI / 2; cx.beginPath(); cx.moveTo(X - Math.cos(a) * Rr * 1.7, Y - Math.sin(a) * Rr * 1.7); cx.lineTo(X + Math.cos(a) * Rr * 1.7, Y + Math.sin(a) * Rr * 1.7); cx.stroke(); } cx.restore(); E.matn(n + ' ta simmetriya o‘qi · ' + son(360 / n, 0) + '° burilish', X, Y + Rr * 1.72 + 16, {font:'600 11.5px Inter, sans-serif', rang:'#dfe3f3'}); }
    } else {
      const Rr = .95 * E.b;
      if(n === 10){ const X = E.X(0), Y = E.Y(0); yulduz(E, X, Y, Rr * 1.5, 10, s.k, pal, s.bur); for(let i = 0; i < 10; i++){ const a = s.bur + i * 2 * PI / 10 - PI / 2; yulduz(E, X + Math.cos(a) * Rr * 3.1, Y + Math.sin(a) * Rr * 3.1, Rr * .9, 10, s.k, pal, s.bur + a); } E.matn('10 burchakli yulduz tekislikni davriy to‘ldirmaydi — rozetkalar «girih» kesishmalari bilan ulanadi', E.W / 2, E.H - 14, {font:'600 11px Inter, sans-serif', rang:'#c5cbe3'}); }
      else if(n === 6 || n === 12){ const d = Rr * 3.05, dy = d * Math.sqrt(3) / 2; for(let j = -3; j <= 3; j++) for(let i = -4; i <= 4; i++){ const X = E.X(0) + (i + (j % 2 ? .5 : 0)) * d, Y = E.Y(0) + j * dy; if(X < -Rr * 2 || X > E.W + Rr * 2 || Y < -Rr * 2 || Y > E.H + Rr * 2) continue; yulduz(E, X, Y, Rr, n, s.k, pal, s.bur); } }
      else { const d = Rr * 3.1; for(let j = -3; j <= 3; j++) for(let i = -5; i <= 5; i++){ const X = E.X(0) + i * d, Y = E.Y(0) + j * d; if(X < -Rr * 2 || X > E.W + Rr * 2 || Y < -Rr * 2 || Y > E.H + Rr * 2) continue; yulduz(E, X, Y, Rr, n, s.k, pal, s.bur); const X2 = X + d / 2, Y2 = Y + d / 2; E.kopburchak([[X2, Y2 - Rr * .75], [X2 + Rr * .75, Y2], [X2, Y2 + Rr * .75], [X2 - Rr * .75, Y2]], pal[3], '#0b0e1c', 1.5); } }
    }
  }
  function bosish(x, y){ if(Math.hypot(x, y) < 2.3 || s.takror){ hodisa('ts-girih', ev({bos:'yulduz' + s.n})); detal('ts_girih', 'yulduz' + s.n); } }
  function ustida(x, y){ return Math.hypot(x, y) < 2.3 ? {matn:s.n + ' burchakli yulduz — bosing', bos:true} : null; }
  const ev = q=>Object.assign({n:s.n, k:+s.k.toFixed(2), takror:s.takror, sim:s.sim, pal:s.pal, burchak:+(360 / s.n).toFixed(1)}, q || {});
  function yoz(){ E.karta.yoz('San’at · girih', s.n + ' burchakli yulduz', '<div class="q"><span>Simmetriya</span><b class="y">' + s.n + ' o‘q, ' + son(360 / s.n, 0) + '° burilish</b><span>Ichki radius</span><b>' + son(s.k * 100, 0) + ' %</b><span>Davriy to‘ldirish</span><b class="' + (s.n === 10 ? 'p' : 's') + '">' + (s.n === 10 ? 'yo‘q (aperiodik)' : 'ha') + '</b></div><div class="iz">Girih — chiziqlar to‘ri; islimiy — o‘simlik naqshi. Ranglar: Registon lojuvard ko‘k, feruza, oltin.</div>'); }
  const tagChiz = ()=>{
    tag.innerHTML = [6, 8, 10, 12].map(n=>TG('data-n="' + n + '"', n + ' burchak', s.n === n)).join('') + SL('k', 'Ichki radius', .25, .85, .01, s.k, v=>son(v * 100, 0) + ' %') + TG('data-tk="1"', s.takror ? 'Takror: yoqiq' : 'Takrorlash', s.takror) + TG('data-sm="1"', s.sim ? 'Simmetriya: yoqiq' : 'Simmetriya o‘qlari', s.sim) + TG('data-an="1"', s.anim ? 'Aylanish: yoqiq' : 'Aylantirish', s.anim) + '<span class="ts-ajr"></span>' + Object.keys(GPAL).map(p=>TG('data-pl="' + p + '"', {registon:'Registon', shohizinda:'Shohi Zinda', terrakota:'Terrakota'}[p], s.pal === p)).join('');
    tugmaBog(tag, 'data-n', n=>{ s.n = +n; E.iflos = true; tagChiz(); yoz(); hodisa('ts-girih', ev()); });
    tugmaBog(tag, 'data-tk', ()=>{ s.takror = !s.takror; E.iflos = true; tagChiz(); yoz(); hodisa('ts-girih', ev()); });
    tugmaBog(tag, 'data-sm', ()=>{ s.sim = !s.sim; E.iflos = true; tagChiz(); hodisa('ts-girih', ev()); });
    tugmaBog(tag, 'data-an', ()=>{ s.anim = !s.anim; tagChiz(); });
    tugmaBog(tag, 'data-pl', p=>{ s.pal = p; E.iflos = true; tagChiz(); hodisa('ts-girih', ev()); });
    slayderBog(tag, {k:v=>son(v * 100, 0) + ' %'}, (k, v)=>{ s.k = v; E.iflos = true; yoz(); hodisa('ts-girih', ev()); });
  };
  yorliq('San’at · girih naqsh generatori (2D)');
  izoh.innerHTML = 'Burchaklar sonini tanlang, ichki radiusni suring. «Takrorlash» — naqsh tekislikni qanday to‘ldirishini ko‘rsatadi; 10 burchakli — davriy emas.';
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   13. PORTRET PROPORSIYALARI — 3D soddalashtirilgan bosh (akademik taxminiy)
   ===================================================================== */
reg('portret', (sahna, c)=>{
  /* v3.20: 2D akademik chizma (old / ¾ / yon) — canvas tekstura varaqda; protsedurali 3D bosh olib tashlandi (foydalanuvchi: «dabdala») */
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.04, ry:0, fov:28, rxMin:-.25, rxMax:.35});
  const {S, T} = H;
  const s = {korinish:'old', chiziq:true, bolim:'koz', t:0};
  H.nomlar = {bosh:'Bosh (kalla)', koz:'Ko‘z — bosh balandligining yarmida', qosh:'Qosh — yuz yuqori uchdan biri chegarasi', burun:'Burun — asosi yuzning ikkinchi uchdan birida', ogiz:'Og‘iz — burun va iyak orasining yuqori uchdan birida', quloq:'Quloq — qosh va burun asosi orasida', boyin:'Bo‘yin', soch:'Soch chizig‘i — yuqori uchdan bir boshlanadi', iyak:'Iyak — bosh balandligining pastki chegarasi'};
  const G = new T.Group(); S.g.add(G);
  /* ---- chizma: birlik koordinatalar — bosh balandligi 2,56 (y: −1,28 … 1,28), kenglik 2,0 = 5 ko‘z ---- */
  const W = 1120, Hh = 1440, KK = 400, OX = 560, OY = 640;
  const px = x=>OX + x * KK, py = y=>OY - y * KK;
  const RANG = {qogoz:'#f3eee4', chiziq:'#34241c', teri:'#ebc9a6', soya:'#d9ab85', soch:'#2a1c15', sochY:'#4a3426', lab:'#c4736a', lab2:'#b05e57', ko:'#f8f5f1', iris:'#4b6a4c', iris2:'#2f4a31', qora:'#161010', kiyim:'#3b4a8a', kiyim2:'#2c3868'};
  function chizma(korinish){
    const cv = document.createElement('canvas'); cv.width = W; cv.height = Hh; const x = cv.getContext('2d');
    /* qog‘oz */
    const gr = x.createRadialGradient(W * .5, Hh * .42, 80, W * .5, Hh * .42, Hh * .85); gr.addColorStop(0, '#f8f4ec'); gr.addColorStop(1, '#e6dfd2'); x.fillStyle = gr; x.fillRect(0, 0, W, Hh);
    x.strokeStyle = 'rgba(60,40,30,.07)'; x.lineWidth = 2; for(let i = 1; i < 8; i++){ x.beginPath(); x.moveTo(0, i * Hh / 8); x.lineTo(W, i * Hh / 8); x.stroke(); }
    x.lineJoin = 'round'; x.lineCap = 'round';
    const M = (a, b)=>x.moveTo(px(a), py(b)), L = (a, b)=>x.lineTo(px(a), py(b)), Q = (c1, c2, a, b)=>x.quadraticCurveTo(px(c1), py(c2), px(a), py(b)), B = (c1, c2, c3, c4, a, b)=>x.bezierCurveTo(px(c1), py(c2), px(c3), py(c4), px(a), py(b));
    const chiz = (rang, kenglik)=>{ x.strokeStyle = rang || RANG.chiziq; x.lineWidth = kenglik || 3.5; x.stroke(); };
    const tol = rang=>{ x.fillStyle = rang; x.fill(); };
    const ellipse = (cx, cy, rx, ry, rot)=>{ x.beginPath(); x.ellipse(px(cx), py(cy), rx * KK, ry * KK, rot || 0, 0, PI * 2); };
    const soyaTeri = (cx, cy, r, kuch)=>{ const g2 = x.createRadialGradient(px(cx), py(cy), 0, px(cx), py(cy), r * KK); g2.addColorStop(0, 'rgba(190,120,80,' + (kuch || .22) + ')'); g2.addColorStop(1, 'rgba(190,120,80,0)'); x.fillStyle = g2; x.beginPath(); x.arc(px(cx), py(cy), r * KK, 0, PI * 2); x.fill(); };
    if(korinish === 'old'){
      /* bo‘yin va yelka */
      x.beginPath(); M(-.46, -1.05); L(-.5, -1.75); B(-.9, -1.78, -1.45, -1.72, -1.5, -2.05); L(1.5, -2.05); B(1.45, -1.72, .9, -1.78, .5, -1.75); L(.46, -1.05); x.closePath(); tol(RANG.kiyim); chiz(RANG.kiyim2, 3);
      x.beginPath(); M(-.46, -1.05); L(-.5, -1.72); Q(0, -1.95, .5, -1.72); L(.46, -1.05); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 3);
      soyaTeri(0, -1.3, .5, .35);
      /* bosh konturi */
      x.beginPath(); M(-1.0, .3); B(-1.02, -.35, -.8, -.95, -.32, -1.2); Q(0, -1.31, .32, -1.2); B(.8, -.95, 1.02, -.35, 1.0, .3); B(1.0, .95, .58, 1.3, 0, 1.3); B(-.58, 1.3, -1.0, .95, -1.0, .3); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 4);
      soyaTeri(-.72, -.5, .4, .18); soyaTeri(.72, -.5, .4, .18); soyaTeri(0, .55, .5, .1);
      /* quloqlar */
      [-1, 1].forEach(sg=>{ ellipse(sg * 1.04, -.18, .11, .33); tol(RANG.teri); chiz(RANG.chiziq, 3); x.beginPath(); M(sg * 1.02, .05); Q(sg * 1.12, -.1, sg * 1.03, -.3); chiz(RANG.chiziq, 2.5); });
      /* soch */
      x.beginPath(); M(-1.0, .42); B(-1.08, 1.0, -.62, 1.44, 0, 1.43); B(.62, 1.44, 1.08, 1.0, 1.0, .42); B(.96, .7, .8, .9, .5, .95); Q(.2, .9, .02, .96); Q(-.2, .9, -.5, .95); B(-.8, .9, -.96, .7, -1.0, .42); x.closePath(); tol(RANG.soch); chiz(RANG.chiziq, 3);
      [[-.6, 1.25, -.3, .98], [-.2, 1.33, -.05, 1.0], [.25, 1.32, .4, 1.02], [.62, 1.2, .75, .95]].forEach(([a1, b1, a2, b2])=>{ x.beginPath(); M(a1, b1); Q((a1 + a2) / 2 - .08, (b1 + b2) / 2, a2, b2); chiz(RANG.sochY, 2.5); });
      /* qoshlar */
      [-1, 1].forEach(sg=>{ x.beginPath(); M(sg * .13, .15); Q(sg * .42, .33, sg * .74, .21); Q(sg * .45, .24, sg * .14, .13); x.closePath(); tol(RANG.soch); });
      /* ko‘zlar */
      [-1, 1].forEach(sg=>{
        const cx = sg * .4;
        x.beginPath(); M(cx - .2, 0); Q(cx, .14, cx + .2, 0); Q(cx, -.1, cx - .2, 0); x.closePath(); tol(RANG.ko); chiz(RANG.chiziq, 3);
        x.save(); x.beginPath(); M(cx - .2, 0); Q(cx, .14, cx + .2, 0); Q(cx, -.1, cx - .2, 0); x.closePath(); x.clip();
        ellipse(cx + sg * .005, -.005, .095, .095); tol(RANG.iris); chiz(RANG.iris2, 2); ellipse(cx + sg * .005, -.005, .042, .042); tol(RANG.qora); ellipse(cx - .035 + sg * .005, .035, .02, .02); tol('#fff');
        x.restore();
        x.beginPath(); M(cx - .2, 0); Q(cx, .15, cx + .2, 0); chiz(RANG.chiziq, 5);
        x.beginPath(); M(cx - .17, .07); Q(cx, .2, cx + .17, .07); chiz('rgba(52,36,28,.55)', 2);
      });
      /* burun */
      x.beginPath(); M(-.1, .12); B(-.12, -.1, -.15, -.3, -.17, -.4); chiz('rgba(52,36,28,.5)', 2.5);
      x.beginPath(); M(.1, .12); B(.12, -.1, .15, -.3, .17, -.4); chiz('rgba(52,36,28,.5)', 2.5);
      x.beginPath(); x.arc(px(0), py(-.46), .13 * KK, PI * .15, PI * .85); chiz(RANG.chiziq, 3);
      [-1, 1].forEach(sg=>{ x.beginPath(); x.arc(px(sg * .2), py(-.49), .085 * KK, sg > 0 ? -PI * .55 : PI * .45, sg > 0 ? PI * .55 : PI * 1.55); chiz(RANG.chiziq, 3); ellipse(sg * .1, -.56, .045, .022); tol('rgba(52,36,28,.75)'); });
      soyaTeri(0, -.4, .22, .18);
      /* og‘iz */
      x.beginPath(); M(-.4, -.79); Q(-.2, -.68, -.07, -.7); Q(0, -.73, .07, -.7); Q(.2, -.68, .4, -.79); Q(.2, -.76, .07, -.77); Q(0, -.79, -.07, -.77); Q(-.2, -.76, -.4, -.79); x.closePath(); tol(RANG.lab2);
      x.beginPath(); M(-.4, -.79); Q(-.2, -.77, 0, -.79); Q(.2, -.77, .4, -.79); Q(.2, -.98, 0, -.97); Q(-.2, -.98, -.4, -.79); x.closePath(); tol(RANG.lab);
      x.beginPath(); M(-.4, -.79); Q(-.15, -.76, 0, -.785); Q(.15, -.76, .4, -.79); chiz(RANG.chiziq, 3.5);
      x.beginPath(); M(-.14, -1.08); Q(0, -1.13, .14, -1.08); chiz('rgba(52,36,28,.4)', 2.5);
    } else if(korinish === 'yon'){
      /* yondan — chapga qaragan profil */
      x.beginPath(); M(-.45, -1.12); L(-.35, -1.78); B(-.7, -1.8, -1.3, -1.75, -1.45, -2.05); L(1.45, -2.05); B(1.3, -1.75, .9, -1.78, .62, -1.72); L(.55, -1.0); x.closePath(); tol(RANG.kiyim); chiz(RANG.kiyim2, 3);
      x.beginPath(); M(-.45, -1.12); L(-.36, -1.74); Q(.1, -1.9, .62, -1.72); L(.55, -1.0); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 3);
      /* bosh: kalla + yuz profili */
      x.beginPath(); M(-.86, .86); B(-.95, .6, -1.0, .35, -.96, .2); Q(-.9, .1, -.84, .02); B(-.86, -.1, -1.0, -.25, -1.17, -.42); Q(-1.2, -.5, -1.1, -.55); Q(-.98, -.58, -.92, -.6); Q(-.9, -.68, -.97, -.73); Q(-1.0, -.78, -.92, -.8); Q(-1.0, -.86, -.97, -.93); B(-.95, -1.02, -.9, -1.15, -.82, -1.22); Q(-.72, -1.3, -.55, -1.28); B(-.2, -1.22, .3, -1.1, .62, -.9); B(.9, -.7, 1.12, -.3, 1.1, .3); B(1.08, .95, .6, 1.3, .1, 1.3); B(-.4, 1.3, -.78, 1.08, -.86, .86); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 4);
      soyaTeri(-.55, -.5, .4, .18); soyaTeri(.4, -.6, .45, .14);
      /* soch (ensa va tepa) */
      x.beginPath(); M(-.86, .86); B(-.75, 1.05, -.5, 1.35, .1, 1.42); B(.75, 1.4, 1.2, 1.0, 1.17, .3); B(1.16, -.1, 1.1, -.35, .95, -.5); Q(.8, -.45, .7, -.35); B(.9, -.15, 1.0, .3, .92, .6); Q(.6, .95, .1, .95); Q(-.4, .95, -.86, .86); x.closePath(); tol(RANG.soch); chiz(RANG.chiziq, 3);
      [[-.6, 1.2, -.25, .97], [.0, 1.3, .3, 1.0], [.55, 1.2, .8, .8], [.95, .7, 1.0, .1]].forEach(([a1, b1, a2, b2])=>{ x.beginPath(); M(a1, b1); Q((a1 + a2) / 2 + .06, (b1 + b2) / 2, a2, b2); chiz(RANG.sochY, 2.5); });
      /* quloq (markazdan biroz orqada, qosh va burun asosi orasida) */
      ellipse(.2, -.18, .14, .34, -.12); tol(RANG.teri); chiz(RANG.chiziq, 3);
      x.beginPath(); M(.14, .08); B(.3, .0, .3, -.25, .18, -.4); chiz(RANG.chiziq, 2.5); x.beginPath(); M(.12, -.05); Q(.22, -.15, .14, -.3); chiz('rgba(52,36,28,.5)', 2);
      /* qosh va ko‘z */
      x.beginPath(); M(-.95, .17); Q(-.75, .3, -.5, .24); Q(-.72, .22, -.93, .13); x.closePath(); tol(RANG.soch);
      x.beginPath(); M(-.86, .0); Q(-.72, .12, -.56, .02); Q(-.7, -.08, -.86, .0); x.closePath(); tol(RANG.ko); chiz(RANG.chiziq, 3);
      ellipse(-.76, .01, .035, .07); tol(RANG.iris); ellipse(-.77, .01, .016, .04); tol(RANG.qora);
      x.beginPath(); M(-.86, .0); Q(-.72, .13, -.56, .02); chiz(RANG.chiziq, 5);
      /* burun teshigi, lab chizig‘i, jag‘ */
      ellipse(-.98, -.56, .05, .03); tol('rgba(52,36,28,.7)');
      x.beginPath(); M(-.92, -.8); L(-.7, -.79); chiz(RANG.chiziq, 3.5);
      x.beginPath(); M(-.97, -.73); Q(-.88, -.7, -.8, -.74); chiz(RANG.lab2, 4); x.beginPath(); M(-.97, -.93); Q(-.86, -.9, -.8, -.84); chiz(RANG.lab, 4);
      x.beginPath(); M(-.3, -1.05); Q(-.55, -1.0, -.7, -1.05); chiz('rgba(52,36,28,.35)', 2.5);
    } else {
      /* ¾ burilish — chapga qaragan; o‘rta chiziq egri, uzoq (o‘ng) ko‘z torroq */
      x.beginPath(); M(-.5, -1.1); L(-.55, -1.76); B(-.9, -1.8, -1.45, -1.72, -1.5, -2.05); L(1.5, -2.05); B(1.45, -1.72, .95, -1.78, .55, -1.74); L(.42, -1.05); x.closePath(); tol(RANG.kiyim); chiz(RANG.kiyim2, 3);
      x.beginPath(); M(-.5, -1.1); L(-.55, -1.74); Q(0, -1.92, .55, -1.72); L(.42, -1.05); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 3);
      x.beginPath(); M(-.98, .3); B(-1.02, -.3, -.9, -.9, -.55, -1.18); Q(-.3, -1.3, -.05, -1.22); B(.45, -1.05, .9, -.6, 1.0, .3); B(1.02, .95, .6, 1.3, .0, 1.3); B(-.6, 1.3, -.98, .95, -.98, .3); x.closePath(); tol(RANG.teri); chiz(RANG.chiziq, 4);
      soyaTeri(.45, -.45, .5, .22); soyaTeri(-.75, -.4, .3, .12);
      ellipse(1.0, -.18, .12, .33, .1); tol(RANG.teri); chiz(RANG.chiziq, 3); x.beginPath(); M(.96, .05); Q(1.08, -.1, .99, -.3); chiz(RANG.chiziq, 2.5);
      x.beginPath(); M(-.98, .42); B(-1.06, 1.0, -.6, 1.44, .0, 1.43); B(.62, 1.44, 1.06, 1.0, 1.0, .42); B(.97, .7, .85, .9, .6, .94); Q(.3, .9, -.1, .95); Q(-.45, .92, -.7, .95); B(-.9, .9, -.96, .7, -.98, .42); x.closePath(); tol(RANG.soch); chiz(RANG.chiziq, 3);
      [[-.5, 1.25, -.35, .98], [-.05, 1.33, .05, 1.0], [.4, 1.3, .55, 1.0], [.75, 1.15, .85, .9]].forEach(([a1, b1, a2, b2])=>{ x.beginPath(); M(a1, b1); Q((a1 + a2) / 2 - .06, (b1 + b2) / 2, a2, b2); chiz(RANG.sochY, 2.5); });
      /* qoshlar */
      x.beginPath(); M(-.96, .17); Q(-.7, .32, -.42, .24); Q(-.7, .24, -.95, .13); x.closePath(); tol(RANG.soch);
      x.beginPath(); M(-.12, .22); Q(.1, .32, .32, .2); Q(.1, .25, -.12, .19); x.closePath(); tol(RANG.soch);
      /* ko‘zlar: yaqin (chap) keng, uzoq (o‘ng) tor */
      [[-.7, .21, 1], [.08, .15, -1]].forEach(([cx, w, sg])=>{
        x.beginPath(); M(cx - w, 0); Q(cx, .13, cx + w, 0); Q(cx, -.09, cx - w, 0); x.closePath(); tol(RANG.ko); chiz(RANG.chiziq, 3);
        x.save(); x.beginPath(); M(cx - w, 0); Q(cx, .13, cx + w, 0); Q(cx, -.09, cx - w, 0); x.closePath(); x.clip();
        ellipse(cx - .02, 0, w * .42, .09); tol(RANG.iris); chiz(RANG.iris2, 2); ellipse(cx - .02, 0, w * .19, .042); tol(RANG.qora); ellipse(cx - .05, .035, .018, .018); tol('#fff');
        x.restore(); x.beginPath(); M(cx - w, 0); Q(cx, .14, cx + w, 0); chiz(RANG.chiziq, 5);
      });
      /* burun (bir yonboshi ko‘rinadi) */
      x.beginPath(); M(-.3, .12); B(-.36, -.1, -.46, -.3, -.55, -.42); chiz('rgba(52,36,28,.5)', 2.5);
      x.beginPath(); M(-.58, -.4); Q(-.6, -.55, -.45, -.56); Q(-.3, -.57, -.2, -.5); chiz(RANG.chiziq, 3);
      x.beginPath(); x.arc(px(-.17), py(-.49), .08 * KK, -PI * .55, PI * .55); chiz(RANG.chiziq, 3); ellipse(-.33, -.56, .045, .022); tol('rgba(52,36,28,.75)');
      /* og‘iz (markaz −0,3) */
      x.beginPath(); M(-.64, -.8); Q(-.5, -.68, -.37, -.71); Q(-.3, -.74, -.24, -.71); Q(-.12, -.69, .02, -.78); Q(-.12, -.76, -.24, -.78); Q(-.3, -.8, -.37, -.78); Q(-.5, -.77, -.64, -.8); x.closePath(); tol(RANG.lab2);
      x.beginPath(); M(-.64, -.8); Q(-.45, -.78, -.3, -.8); Q(-.15, -.78, .02, -.78); Q(-.12, -.97, -.3, -.97); Q(-.5, -.98, -.64, -.8); x.closePath(); tol(RANG.lab);
      x.beginPath(); M(-.64, -.8); Q(-.45, -.77, -.3, -.795); Q(-.15, -.77, .02, -.78); chiz(RANG.chiziq, 3.5);
      x.beginPath(); M(-.45, -1.08); Q(-.3, -1.13, -.15, -1.08); chiz('rgba(52,36,28,.4)', 2.5);
      /* o‘rta chiziq (egri) */
      x.setLineDash([10, 10]); x.beginPath(); M(-.18, 1.3); B(-.42, .6, -.45, -.4, -.3, -1.3); chiz('rgba(255,120,60,.55)', 3); x.setLineDash([]);
    }
    return cv;
  }
  /* ---- varaq (tekstura) va bosiladigan hududlar ---- */
  const VW = 2.8, VH = 3.6, VZ = 1.0, VY = -.5;
  const taxta = new T.Mesh(new T.PlaneGeometry(VW + .16, VH + .16), H.mat('#1b2140', {roughness:.8, metalness:.1})); taxta.position.set(0, VY, VZ - .03); G.add(taxta);
  const varaqM = new T.MeshBasicMaterial({toneMapped:false}); varaqM.userData.env = 1;
  const varaq = new T.Mesh(new T.PlaneGeometry(VW, VH), varaqM); varaq.position.set(0, VY, VZ); varaq.userData.nom = 'bosh'; G.add(varaq);
  const texKesh = {};
  function teksturala(k){ if(!texKesh[k]){ const t = new T.CanvasTexture(chizma(k)); t.encoding = T.sRGBEncoding; t.anisotropy = 8; texKesh[k] = t; } varaqM.map = texKesh[k]; varaqM.needsUpdate = true; }
  const HUD = {
    old:[['koz', -.4, 0, .5, .3], ['koz', .4, 0, .5, .3], ['qosh', -.42, .2, .62, .17], ['qosh', .42, .2, .62, .17], ['burun', 0, -.22, .42, .62], ['ogiz', 0, -.81, .9, .32], ['quloq', -1.05, -.18, .26, .7], ['quloq', 1.05, -.18, .26, .7], ['soch', 0, 1.17, 2.14, .52], ['iyak', 0, -1.15, .95, .3]],
    yon:[['koz', -.7, .02, .36, .26], ['qosh', -.72, .2, .48, .17], ['burun', -1.0, -.3, .42, .55], ['ogiz', -.88, -.8, .32, .3], ['quloq', .2, -.18, .34, .72], ['soch', .15, 1.15, 2.2, .55], ['soch', 1.02, .25, .34, 1.2], ['iyak', -.72, -1.15, .55, .3]],
    yarim:[['koz', -.7, 0, .48, .3], ['koz', .08, 0, .36, .3], ['qosh', -.7, .22, .58, .17], ['qosh', .1, .24, .48, .17], ['burun', -.4, -.24, .46, .62], ['ogiz', -.31, -.81, .74, .32], ['quloq', 1.0, -.18, .26, .7], ['soch', 0, 1.17, 2.1, .52], ['iyak', -.3, -1.15, .9, .3]]
  };
  const hudG = new T.Group(); G.add(hudG);
  const hudM = ()=>new T.MeshBasicMaterial({color:H.rang('#ff6b9a'), transparent:true, opacity:.25, colorWrite:false, depthWrite:false, toneMapped:false}); /* opacity > .2 — makon3d nishon() filtri; ko‘rinmasligi colorWrite bilan */
  function hudlar(){
    H.tozala(hudG);
    HUD[s.korinish].forEach(([nom, cx, cy, w, h])=>{ const m = new T.Mesh(new T.PlaneGeometry(w, h), hudM()); m.position.set(cx, cy, VZ + .02); m.userData.nom = nom; m.renderOrder = 30; hudG.add(m); });
  }
  /* ---- yo‘l-yo‘riq chiziqlari (3D qatlam, varaq ustida) ---- */
  const CH = new T.Group(); G.add(CH);
  const chiziqM = new T.MeshBasicMaterial({color:H.rang('#ffc14d'), transparent:true, opacity:.85, depthTest:false}); chiziqM.userData.env = 1;
  const DAR = [['soch', .91, 'soch chizig‘i'], ['qosh', .18, 'qosh — 1/3'], ['koz', 0, 'ko‘z — yarmi (1/2)'], ['burun', -.55, 'burun asosi — 2/3'], ['ogiz', -.79, 'og‘iz'], ['iyak', -1.28, 'iyak']];
  DAR.forEach(([k, y, nom])=>{ const l = new T.Mesh(new T.BoxGeometry(3.0, .012, .012), chiziqM); l.position.set(0, y, VZ + .05); l.renderOrder = 40; l.userData.dar = k; CH.add(l); const t = H.yozuv(nom, {k:.24}); t.position.set(1.9, y, VZ + .06); t.userData.dar = k; CH.add(t); });
  const ust = new T.Mesh(new T.BoxGeometry(.012, 2.56, .012), chiziqM); ust.position.set(0, 0, VZ + .05); ust.renderOrder = 40; CH.add(ust);
  const kozT = new T.Group(); CH.add(kozT); for(let i = 0; i <= 5; i++){ const b2 = new T.Mesh(new T.BoxGeometry(.012, .3, .012), chiziqM); b2.position.set(-1 + i * .4, 0, VZ + .05); b2.renderOrder = 40; kozT.add(b2); } const kt = H.yozuv('5 ko‘z kengligi', {k:.24}); kt.position.set(0, .34, VZ + .06); kozT.add(kt);
  const taxm = H.yozuv('akademik taxminiy proporsiyalar', {k:.26, chet:'rgba(255,193,77,.8)'}); taxm.position.set(0, 1.62, VZ + .1); G.add(taxm);
  const IZ = {koz:'Ko‘z chizig‘i bosh balandligining o‘rtasida (yuqori va pastdan teng). Eng ko‘p uchraydigan xato — ko‘zni juda yuqoriga chizish.', qosh:'Soch chizig‘idan qoshgacha, qoshdan burun asosigacha va burun asosidan iyakgacha — taxminan teng uch qism.', burun:'Burun asosi yuzning pastki uchdan biri boshlanadigan joyda; kengligi taxminan bir ko‘z.', ogiz:'Og‘iz burun asosi va iyak orasining yuqori uchdan birida; burchaklari qorachiqlar ostida.', quloq:'Quloq qosh chizig‘i va burun asosi orasida — yondan qaraganda boshning o‘rta chizig‘idan biroz orqada.', soch:'Soch chizig‘i bosh tepasidan taxminan uchdan bir pastda — peshona shu yerdan boshlanadi.', iyak:'Iyak — bosh balandligining pastki chegarasi; ¾ burilishda o‘rta chiziq egri bo‘ladi.', bosh:'Bosh balandligi ≈ 2,5 bosh kengligi emas — kengligi ≈ 5 ko‘z, balandligi ≈ 1,3 kenglik.'};
  function yangila(){
    teksturala(s.korinish); hudlar();
    CH.visible = s.chiziq && !H.uq; taxm.visible = !H.uq;
    CH.children.forEach(o=>{ if(o.userData.dar !== undefined){ const faol = o.userData.dar === s.bolim; if(o.isSprite) o.material.opacity = faol ? 1 : .5; else o.material = faol ? new T.MeshBasicMaterial({color:H.rang('#ff6b9a'), depthTest:false}) : chiziqM; } });
    kozT.visible = s.korinish === 'old' && s.chiziq && !H.uq;
    ust.visible = s.korinish === 'old' && s.chiziq && !H.uq;
    hudG.children.forEach(m=>{ m.material.colorWrite = m.userData.nom === s.bolim && !H.uq; m.material.opacity = m.material.colorWrite ? .14 + .11 : .25; });
    H.karta.yoz('San’at · portret proporsiyalari', H.nomlar[s.bolim].split(' — ')[0], '<div class="q"><span>Ko‘z chizig‘i</span><b class="y">bosh balandligining ½</b><span>Bosh kengligi</span><b>≈ 5 ko‘z</b><span>Ko‘zlar orasi</span><b>1 ko‘z</b><span>Yuz</span><b>3 teng qism (soch–qosh–burun–iyak)</b></div><p>' + (IZ[s.bolim] || '') + ' <i>Bu akademik taxminiy qoidalar — har bir odam yuzi farq qiladi.</i></p>');
  }
  const tagChiz = ()=>{
    tag.innerHTML = [['old', 'Olddan'], ['yarim', '¾ burilish'], ['yon', 'Yondan']].map(([k, n])=>TG('data-k="' + k + '"', n, s.korinish === k)).join('') + TG('data-ch="1"', s.chiziq ? 'Chiziqlar: yoqiq' : 'Chiziqlar', s.chiziq) + '<span class="ts-ajr"></span>' + [['koz', 'Ko‘z'], ['qosh', 'Qosh'], ['burun', 'Burun'], ['ogiz', 'Og‘iz'], ['quloq', 'Quloq'], ['soch', 'Soch chizig‘i']].map(([k, n])=>TG('data-b="' + k + '"', n, s.bolim === k)).join('');
    tugmaBog(tag, 'data-k', k=>{ s.korinish = k; yangila(); tagChiz(); hodisa('ts-portret', ev()); });
    tugmaBog(tag, 'data-ch', ()=>{ s.chiziq = !s.chiziq; yangila(); tagChiz(); });
    tugmaBog(tag, 'data-b', k=>{ s.bolim = k; yangila(); tagChiz(); hodisa('ts-portret', ev()); });
  };
  const ev = q=>Object.assign({korinish:s.korinish, bolim:s.bolim, chiziq:s.chiziq}, q || {});
  S.bosish = d=>{ if(!d || !d.nom) return; if(H.nomlar[d.nom] && ['koz', 'qosh', 'burun', 'ogiz', 'quloq', 'soch', 'iyak', 'bosh'].includes(d.nom)){ s.bolim = d.nom; yangila(); tagChiz(); } hodisa('ts-portret', ev({bos:d.nom})); detal('ts_portret', d.nom); };
  H.kadr = dt=>{ s.t += dt; };
  S.holat = h=>{ if(!h) return; if(h.korinish) s.korinish = h.korinish; if(h.chiziq !== undefined) s.chiziq = !!h.chiziq; if(h.bolim) s.bolim = h.bolim; yangila(); tagChiz(); };
  H.joy(1.7, new T.Vector3(0, -.3, VZ), 2.3);
  yorliq('San’at · portret proporsiyalari (akademik chizma, 2D — taxminiy qoidalar)');
  izoh.innerHTML = 'Sariq chiziqlar — akademik taxminiy proporsiyalar: ko‘z — yarmida, yuz — 3 teng qism. Chizmadagi qismlarni bosing; «¾ burilish» va «Yondan» ko‘rinishlarini solishtiring.';
  yangila(); tagChiz();
  return S;
});

reg('behzod', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {rejim:'sxema', tanl:null};
  const E = tekis(sahna, c, {
    olam:()=>s.rejim === 'tarix' ? [-.5, -.5, 12.5, 10.8] : [-1.5, -1.0, 11.5, 10.8],
    chiz, bosish, ustida,
    holat(h){ if(h.rejim) s.rejim = h.rejim; if(h.tanl !== undefined) s.tanl = h.tanl; tagChiz(); yoz(); }
  });
  const PAL = [['lojuvard (lapis)', '#1b3a8a'], ['feruza', '#2aa7a0'], ['oltin (zarhal)', '#d9b35a'], ['kinovar (qizil)', '#c8453a'], ['malaxit yashil', '#3f8f4a'], ['oq qo‘rg‘oshin', '#f1ecd9']];
  function chiz(E){
    const cx = E.cx;
    if(s.rejim === 'tarix'){ tarix(E); return; }
    /* sahifa */
    const X0 = E.X(0), Y0 = E.Y(10.4), W = 8 * E.b, Hh = 11 * E.b;
    E.yumaloq(X0, Y0, W, Hh, 4); cx.fillStyle = '#efe4c8'; cx.fill(); cx.strokeStyle = '#8a6a3a'; cx.lineWidth = 3; cx.stroke();
    cx.strokeStyle = '#b08a4a'; cx.lineWidth = 1.5; cx.strokeRect(X0 + .35 * E.b, Y0 + .35 * E.b, W - .7 * E.b, Hh - .7 * E.b);
    E.matn('sxematik qayta chizma — asl asar nusxasi emas', X0 + W / 2, Y0 + Hh - 12, {font:'600 10.5px Inter, sans-serif', rang:'#7a5a2a'});
    BBLOK.forEach(b=>{
      const X = E.X(b.x), Y = E.Y(b.y + b.h), w = b.w * E.b, h = b.h * E.b, tanl = s.tanl === b.k;
      cx.save(); cx.globalAlpha = s.rejim === 'rang' ? .95 : .55;
      if(b.k === 'bino'){ E.yumaloq(X, Y, w, h, 6); cx.fillStyle = b.r; cx.fill(); cx.fillStyle = '#1b3a8a'; cx.beginPath(); cx.moveTo(X + w * .2, Y + h); cx.lineTo(X + w * .2, Y + h * .45); cx.arc(X + w / 2, Y + h * .45, w * .3, PI, 0); cx.lineTo(X + w * .8, Y + h); cx.closePath(); cx.fill(); }
      else if(b.k === 'figuralar'){ for(let i = 0; i < 6; i++){ const fx = X + w * (.12 + (i % 3) * .34), fy = Y + h * (i < 3 ? .3 : .7); E.doira(fx, fy - h * .14, h * .07, b.r); E.kopburchak([[fx - h * .1, fy - h * .05], [fx + h * .1, fy - h * .05], [fx + h * .12, fy + h * .25], [fx - h * .12, fy + h * .25]], i % 2 ? '#1b3a8a' : b.r); } }
      else if(b.k === 'daraxt'){ cx.fillStyle = '#6b4a2a'; cx.fillRect(X + w * .45, Y + h * .4, w * .1, h * .6); E.doira(X + w / 2, Y + h * .3, w * .5, '#5a8f3a'); for(let i = 0; i < 9; i++) E.doira(X + w * (.2 + ((i * 37) % 60) / 100), Y + h * (.1 + ((i * 53) % 40) / 100), 3, '#f1cfe0'); }
      else if(b.k === 'osmon'){ cx.fillStyle = b.r; cx.fillRect(X, Y, w, h); cx.strokeStyle = 'rgba(255,255,255,.5)'; cx.lineWidth = 1.5; for(let i = 0; i < 5; i++){ cx.beginPath(); cx.arc(X + w * (.1 + i * .2), Y + h * .5, h * .25, PI, 2 * PI); cx.stroke(); } }
      else if(b.k === 'hovuz'){ E.yumaloq(X, Y, w, h, 10); cx.fillStyle = b.r; cx.fill(); cx.strokeStyle = '#d9b35a'; cx.lineWidth = 2; cx.stroke(); }
      else { E.yumaloq(X, Y, w, h, 8); cx.fillStyle = b.r; cx.fill(); cx.strokeStyle = '#b08a4a'; cx.lineWidth = 1.5; cx.stroke(); for(let i = 0; i < 3; i++) E.chiziq(X + 10, Y + h * (.3 + i * .2), X + w - 10, Y + h * (.3 + i * .2), '#4a3a2a', 1.2); }
      cx.restore();
      if(tanl){ cx.strokeStyle = '#ff6b9a'; cx.lineWidth = 3; cx.strokeRect(X - 3, Y - 3, w + 6, h + 6); }
      if(s.rejim === 'sxema') E.matn(b.nom, X + w / 2, Y + h / 2, {font:'600 11px Inter, sans-serif', rang:'#fff', fon:'rgba(20,16,30,.78)'});
    });
    if(s.rejim === 'oqim'){
      const yol = [[2.0, 1.4], [3.4, 3.4], [5.8, 5.9], [4.0, 8.0], [1.5, 5.5]].map(p=>[E.X(p[0]), E.Y(p[1])]);
      for(let i = 0; i < yol.length - 1; i++) E.strelka(yol[i][0], yol[i][1], yol[i + 1][0], yol[i + 1][1], '#ff6b9a', 3);
      E.chiziq(E.X(0), E.Y(0), E.X(8), E.Y(10.4), 'rgba(255,255,255,.55)', 1.5, {dash:[8, 6]});
      E.matn('diagonal — ko‘z harakati pastdan yuqoriga', E.X(4), E.Y(10.9), {font:'600 11.5px Inter, sans-serif', rang:'#dfe3f3'});
      E.matn('ko‘p nuqtali perspektiva: tekis, «yuqoridan» qarash', E.X(4), E.Y(-.9), {font:'600 11px Inter, sans-serif', rang:'#c5cbe3'});
    }
    if(s.rejim === 'rang'){
      PAL.forEach(([n, h], i)=>{ const X = E.X(8.9), Y = E.Y(9.4 - i * 1.5); E.yumaloq(X, Y, 1.0 * E.b, 1.0 * E.b, 8); cx.fillStyle = h; cx.fill(); cx.strokeStyle = '#fff'; cx.lineWidth = 1.5; cx.stroke(); E.matn(n, X + 1.2 * E.b, Y + .5 * E.b, {font:'600 11px Inter, sans-serif', rang:'#dfe3f3', al:'left'}); });
      E.matn('mineral pigmentlar + oltin', E.X(8.9), E.Y(10.2), {font:'600 10.5px "JetBrains Mono", monospace', rang:'#9aa3c7', al:'left'});
    }
  }
  function tarix(E){
    const cx = E.cx, X0 = E.X(.5), X1 = E.X(11.5), Y = E.Y(5.2);
    E.chiziq(X0, Y, X1, Y, '#d9b35a', 3);
    BTAR.forEach(([sana, matn], i)=>{ const X = X0 + (X1 - X0) * i / (BTAR.length - 1), yuq = i % 2 === 0; E.doira(X, Y, 7, '#ff6b9a', '#fff', 2); E.chiziq(X, Y, X, Y + (yuq ? -34 : 34), 'rgba(255,255,255,.5)', 1); E.matn(sana, X, Y + (yuq ? -48 : 48), {font:'700 11.5px "JetBrains Mono", monospace', rang:'#ffc14d'}); const soz = matn.split(' '); let qator = [], q = ''; soz.forEach(w=>{ if((q + ' ' + w).length > 22){ qator.push(q.trim()); q = w; } else q += ' ' + w; }); qator.push(q.trim()); qator.forEach((t, j)=>E.matn(t, X, Y + (yuq ? -66 - (qator.length - 1 - j) * 14 : 66 + j * 14), {font:'500 11px Inter, sans-serif', rang:'#dfe3f3'})); });
    E.matn('Kamoliddin Behzod — hayot yo‘li (sanalar manbalarda farq qiladi; «taxm.» — taxminiy)', E.X(6), E.Y(9.8), {font:'700 12px Inter, sans-serif', rang:'#dfe3f3'});
    E.matn('Hirot miniatyura maktabi — XV asr, Temuriylar davri', E.X(6), E.Y(.6), {font:'600 11px Inter, sans-serif', rang:'#9aa3c7'});
  }
  const blokOf = (x, y)=>s.rejim === 'tarix' ? null : BBLOK.slice().reverse().find(b=>x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h);
  function bosish(x, y){ const b = blokOf(x, y); if(!b) return; s.tanl = b.k; E.iflos = true; yoz(); hodisa('ts-behzod', {rejim:s.rejim, bos:b.k}); detal('ts_behzod', b.k); }
  function ustida(x, y){ const b = blokOf(x, y); return b ? {matn:b.nom, bos:true} : null; }
  function yoz(){ const b = BBLOK.find(z=>z.k === s.tanl); E.karta.yoz('San’at · Behzod va miniatyura', {sxema:'Kompozitsiya sxemasi', oqim:'Ko‘z harakati', rang:'Rang palitrasi', tarix:'Hayot yo‘li'}[s.rejim], (b ? '<div class="q"><span>Tanlangan</span><b class="y">' + b.nom + '</b></div>' : '') + '<div class="iz">' + {sxema:'Miniatyura — qo‘lyozma kitob sahifasidagi rasm. Matn kartushlari rasm bilan bir butun; me’morchilik, daraxt, odamlar guruhi va osmon tekis «qatlamlar» sifatida joylashadi.', oqim:'Hirot maktabida hajm soyasiz, ranglar tekis; chuqurlik yuqoriga ko‘tarilgan rejalar bilan beriladi. Ko‘z diagonal bo‘ylab yuradi.', rang:'Mineral bo‘yoqlar: lojuvard (lazurit), kinovar, malaxit, zarhal oltin. Behzod asarlarida ranglar tiniq, kontrastli va tartibli.', tarix:'Behzod Hirotda Mirak Naqqosh ustaxonasida yetishgan, Alisher Navoiy va Husayn Boyqaro homiyligida ishlagan; keyinchalik Tabrizda shoh kitobxonasini boshqargan.'}[s.rejim] + '</div>'); }
  const tagChiz = ()=>{ tag.innerHTML = [['sxema', 'Sxema'], ['oqim', 'Ko‘z harakati'], ['rang', 'Ranglar'], ['tarix', 'Hayot yo‘li']].map(([k, n])=>TG('data-r="' + k + '"', n, s.rejim === k)).join(''); tugmaBog(tag, 'data-r', k=>{ s.rejim = k; E.iflos = true; tagChiz(); yoz(); hodisa('ts-behzod', {rejim:k}); }); };
  yorliq('San’at · Behzod — sxematik kompozitsiya tahlili (2D)');
  izoh.innerHTML = 'Bu — sxematik qayta chizma (asl asar ko‘chirilmagan). Bloklarni bosing; «Ko‘z harakati» — diagonal kompozitsiya; «Hayot yo‘li» — sanalar.';
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

})();
