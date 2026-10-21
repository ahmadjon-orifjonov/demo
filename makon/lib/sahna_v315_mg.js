/* MAKON v3.15 — «mg» guruhi sahnalari (matematika 6 + geometriya 5).
   Ulanish: index.html da lib/makon3d_v312.js dan KEYIN. Uslublar shu fayl ichida (id="mgcss"), alohida CSS shart emas.
   Reyestr: window.MAKON_SAHNA['mg_kasr' | 'mg_sonoq' | 'mg_chiziq' | 'mg_tengsiz' | 'mg_trig' | 'mg_hosila' |
            'mg_parallel' | 'mg_pifagor' | 'mg_aylana' | 'mg_kesim' | 'mg_platon'].
   Hodisalar (document 'makon3d'): mg-kasr, mg-son, mg-chiziq, mg-teng, mg-trig, mg-hosila, mg-burchak, mg-pifagor,
   mg-aylana, mg-kesim, mg-platon. Sahnaning o‘zi hech qachon holat() dan hodisa chiqarmaydi — faqat foydalanuvchi amali.
   3D test savolida (.uq-sahna ichida) dars obyektidagi `mgUq` holati qo‘llanadi, aks holda 1-bosqich holati. */
(function(){
'use strict';
const SAHNA = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d || {})}));
const detal = (turD, nom)=>hodisa('detal', {turD, nom});
const son = (v, k)=>{ k = k === undefined ? 2 : k; const p = Math.pow(10, k); let r = Math.round(v * p) / p; if(Object.is(r, -0)) r = 0; return String(r).replace('.', ',').replace('-', '−'); };
const qv = v=>v < 0 ? '(' + son(v) + ')' : son(v);
const PI = Math.PI, RAD = PI / 180;
const cl = (v, a, b)=>Math.max(a, Math.min(b, v));
const yax = (v, q)=>+(Math.round(v / q) * q).toFixed(6);
const ekub = (a, b)=>{ a = Math.abs(a); b = Math.abs(b); while(b){ const t = a % b; a = b; b = t; } return a || 1; };
const R = {vi:'#a996ff', vi2:'#7b63ff', am:'#ffc14d', gr:'#4ee1a0', cy:'#5cc8ff', pk:'#ff6b9a', or:'#ff9f43', oq:'#f1f3ff', xi:'rgba(200,208,240,.55)', qi:'#ff5d73'};

/* ======================= uslublar ======================= */
const CSS = `
.mg-2d{position:absolute;inset:0;z-index:1;overflow:hidden;user-select:none;-webkit-user-select:none}
.mg-2d canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.mg-karta{position:absolute;right:16px;top:16px;z-index:5;width:292px;max-height:calc(100% - 200px);overflow:auto;padding:13px 15px 14px;border-radius:18px;background:linear-gradient(160deg,rgba(26,32,66,.9),rgba(10,13,30,.9));border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#dfe3f3;font-size:12.8px;line-height:1.5;box-shadow:0 18px 44px rgba(0,0,0,.42);scrollbar-width:thin}
.mg-karta .mg-bosh{display:flex;align-items:center;justify-content:space-between;gap:8px}
.mg-karta .ust{font:600 10.5px/1.2 'JetBrains Mono',monospace;letter-spacing:1.4px;color:#8d95b8;text-transform:uppercase}
.mg-karta .mg-yig{width:24px;height:24px;border-radius:7px;background:rgba(255,255,255,.07);color:#cfd4ee;font:700 13px/1 Inter,sans-serif;flex:none;border:0;cursor:pointer}
.mg-karta .mg-yig:hover{background:rgba(255,255,255,.16)}
.mg-karta .fx{font:650 18px/1.3 'JetBrains Mono',monospace;color:#fff;margin:6px 0 9px;letter-spacing:-.2px}
.mg-karta .fx small{font-size:12px;color:#8d95b8;font-weight:500}
.mg-karta .q{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;align-items:baseline}
.mg-karta .q span{color:#8d95b8}
.mg-karta .q b{font:600 12.3px 'JetBrains Mono',monospace;color:#fff;text-align:right}
.mg-karta .y{color:#ffc14d!important}.mg-karta .s{color:#4ee1a0!important}.mg-karta .k{color:#5cc8ff!important}.mg-karta .p{color:#ff6b9a!important}.mg-karta .v{color:#b9a8ff!important}
.mg-karta .iz{margin-top:9px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);color:#b9c0dd;font-size:12.3px}
.mg-karta .iz b{color:#fff}
.mg-karta table{width:100%;border-collapse:collapse;font:600 11.5px 'JetBrains Mono',monospace;margin-top:8px}
.mg-karta td,.mg-karta th{padding:3px 4px;text-align:center;border-bottom:1px solid rgba(255,255,255,.06)}
.mg-karta th{color:#8d95b8;font-weight:600}
.mg-karta tr.joriy td{background:rgba(169,150,255,.18);color:#fff}
.mg-karta.yigiq{width:auto;max-width:260px}
.mg-karta.yigiq .mg-ich{display:none}
.mg-karta.yigiq .fx{margin-bottom:0}
.mg-uch{position:absolute;z-index:6;pointer-events:none;padding:5px 9px;border-radius:8px;background:rgba(10,13,28,.92);border:1px solid rgba(255,255,255,.14);color:#fff;font:600 12px 'JetBrains Mono',monospace;transform:translate(14px,-125%);white-space:nowrap;display:none}
.uq-sahna .mg-karta{display:none}
@media (max-width:700px){.mg-karta{right:8px;top:8px;width:230px;font-size:12px;padding:10px 12px}.mg-karta .fx{font-size:15px}}
@media (max-width:600px){.mg-karta{display:none}}
`;
function uslub(){ if(document.getElementById('mgcss')) return; const s = document.createElement('style'); s.id = 'mgcss'; s.textContent = CSS; document.head.append(s); }
function royxatla(idish, api){ const x = window._sahnalar; const e = x && x.get(idish); if(e && e !== api) e.yopish(); if(x) x.set(idish, api); }

/* karta: yig‘iladigan ma’lumot oynasi */
function kartaQur(ota, uq){
  const k = document.createElement('div'); k.className = 'mg-karta';
  if(!uq) ota.append(k);
  let yig = (ota.clientWidth || 900) < 860, sarlavha = '', fx = '', ichi = '';
  const chiz = ()=>{
    k.classList.toggle('yigiq', yig);
    k.innerHTML = '<div class="mg-bosh"><span class="ust">' + sarlavha + '</span><button class="mg-yig" title="' + (yig ? 'Ochish' : 'Yig‘ish') + '" aria-label="Ma’lumotni yig‘ish yoki ochish">' + (yig ? '+' : '−') + '</button></div><div class="fx">' + fx + '</div><div class="mg-ich">' + ichi + '</div>';
    k.querySelector('.mg-yig').onclick = e=>{ e.stopPropagation(); yig = !yig; chiz(); if(k.ozgardi) k.ozgardi(); };
  };
  k.yoz = (s, f, i)=>{ sarlavha = s; fx = f; ichi = i; chiz(); };
  return k;
}

/* xavfsiz maydon: sahna ustidagi panellar (bosqichlar, boshqaruv, karta) egallamagan to‘rtburchak */
function xavfsizMaydon(sahna, W, H, uq){
  const q = {l:12, r:12, t:12, b:12};
  if(uq) return q;
  const sr = sahna.getBoundingClientRect(), ota = sahna.parentElement;
  const olch = e=>{ if(!e || !e.offsetParent) return null; const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 ? r : null; };
  const toSiq = (r, yon)=>{
    /* to‘siqni chapdan/o‘ngdan yoki tepadan/pastdan chetlab o‘tish — qaysi biri ko‘proq maydon qoldirsa */
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
  const k = olch(sahna.querySelector('.mg-karta')); if(k) toSiq(k, 'rt');
  return q;
}

/* ======================= 2D dvigatel ======================= */
function tekis(sahna, c, o){
  uslub();
  const uq = !!(sahna.closest && sahna.closest('.uq-sahna'));
  const wrap = document.createElement('div'); wrap.className = 'mg-2d';
  const cv = document.createElement('canvas'); wrap.append(cv);
  sahna.append(wrap);
  const karta = kartaQur(sahna, uq);
  const uch = document.createElement('div'); uch.className = 'mg-uch'; sahna.append(uch);
  const cx = cv.getContext('2d');
  const E = {sahna, wrap, cv, cx, karta, uch, uq, W:600, H:400, dpr:1, b:40, cxw:0, cyw:0, sx:300, sy:200, panX:0, panY:0, zoomK:1, iflos:true};
  let tirik = true, kadr = 0, qCache = null, qVaqt = 0, birinchi = true;
  E.X = x=>E.sx + (x - E.cxw) * E.b + E.panX;
  E.Y = y=>E.sy - (y - E.cyw) * E.b + E.panY;
  E.wx = X=>(X - E.sx - E.panX) / E.b + E.cxw;
  E.wy = Y=>-(Y - E.sy - E.panY) / E.b + E.cyw;
  E.korinish = ()=>[E.wx(0), E.wy(E.H), E.wx(E.W), E.wy(0)];
  E.q = ()=>xavfsiz();
  karta.ozgardi = ()=>{ qVaqt = 0; E.iflos = true; };
  function xavfsiz(){ const t = performance.now(); if(qCache && t - qVaqt < 450) return qCache; qVaqt = t; qCache = xavfsizMaydon(sahna, E.W, E.H, uq); return qCache; }
  function joylash(){
    const q = xavfsiz(), bb = o.olam();
    let w = E.W - q.l - q.r, h = E.H - q.t - q.b;
    let l = q.l, t = q.t;
    if(w < E.W * .34){ w = E.W - 24; l = 12; }
    if(h < E.H * .34){ h = E.H - 24; t = 12; }
    const b = Math.min(w / (bb[2] - bb[0]), h / (bb[3] - bb[1]));
    return {b:b * E.zoomK, cxw:(bb[0] + bb[2]) / 2, cyw:(bb[1] + bb[3]) / 2, sx:l + w / 2, sy:t + h / 2};
  }
  function olcham(){
    const r = wrap.getBoundingClientRect(); E.W = r.width || 600; E.H = r.height || 400;
    E.dpr = Math.min(2, window.devicePixelRatio || 1);
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
  /* sichqoncha / barmoq */
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
    },
    qiymat(){ return o.qiymat ? o.qiymat() : null; }
  };
  E.api = api;
  royxatla(sahna, api);
  olcham();
  E.boshla = ()=>{ kadrla(); };
  return E;
}

/* 2D chizish yordamchilari */
function chizgich(E){
  const cx = E.cx;
  E.yumaloq = (x, y, w, h, r)=>{ cx.beginPath(); if(cx.roundRect) cx.roundRect(x, y, w, h, r); else cx.rect(x, y, w, h); };
  E.chiziqS = (X1, Y1, X2, Y2, rang, q, o)=>{
    o = o || {}; cx.save(); cx.strokeStyle = rang; cx.lineWidth = q || 2; cx.lineCap = o.cap || 'round';
    if(o.uzuq) cx.setLineDash(o.uzuq); if(o.soya){ cx.shadowColor = o.soya; cx.shadowBlur = o.blur || 14; } if(o.alfa !== undefined) cx.globalAlpha = o.alfa;
    cx.beginPath(); cx.moveTo(X1, Y1); cx.lineTo(X2, Y2); cx.stroke(); cx.restore();
  };
  E.chiziq = (x1, y1, x2, y2, rang, q, o)=>E.chiziqS(E.X(x1), E.Y(y1), E.X(x2), E.Y(y2), rang, q, o);
  /* cheksiz to‘g‘ri chiziq: nuqta va yo‘nalish */
  E.togri = (x, y, dx, dy, rang, q, o)=>{ const L = 4000 / Math.max(1, E.b); const n = Math.hypot(dx, dy) || 1; E.chiziq(x - dx / n * L, y - dy / n * L, x + dx / n * L, y + dy / n * L, rang, q, o); };
  E.nuqtaS = (X, Y, rang, r, o)=>{
    o = o || {};
    cx.save();
    if(o.nur !== false){ const g = cx.createRadialGradient(X, Y, 0, X, Y, r * 3.2); g.addColorStop(0, rang); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.globalAlpha = .45; cx.fillStyle = g; cx.beginPath(); cx.arc(X, Y, r * 3.2, 0, PI * 2); cx.fill(); cx.globalAlpha = 1; }
    cx.fillStyle = o.ichi || rang; cx.beginPath(); cx.arc(X, Y, r, 0, PI * 2); cx.fill();
    cx.lineWidth = o.q || 2; cx.strokeStyle = o.chet || '#0b0f1f'; cx.stroke();
    if(o.bosh){ cx.fillStyle = '#0b0f1f'; cx.beginPath(); cx.arc(X, Y, Math.max(1.5, r - 3), 0, PI * 2); cx.fill(); }
    cx.restore();
  };
  E.nuqta = (x, y, rang, r, o)=>E.nuqtaS(E.X(x), E.Y(y), rang, r, o);
  E.matn = (X, Y, m, rang, shrift, al, bl)=>{ cx.save(); cx.fillStyle = rang || '#fff'; cx.font = shrift || '600 12px "JetBrains Mono", monospace'; cx.textAlign = al || 'center'; cx.textBaseline = bl || 'middle'; cx.fillText(m, X, Y); cx.restore(); };
  /* yorliq («pill»): pos — 'o' o‘ng, 'c' chap, 't' tepa, 'p' past, 'm' markaz */
  E.teg = (X, Y, m, rang, o)=>{
    o = o || {}; cx.save();
    cx.font = o.shrift || '600 12px "JetBrains Mono", monospace';
    const w = cx.measureText(m).width + 14, h = o.h || 21, pos = o.pos || 'o', off = o.off === undefined ? 10 : o.off;
    let x = pos === 'o' ? X + off : pos === 'c' ? X - off - w : X - w / 2;
    let y = pos === 't' ? Y - off - h : pos === 'p' ? Y + off : Y - h / 2;
    x = cl(x, 4, E.W - w - 4); y = cl(y, 4, E.H - h - 4);
    cx.fillStyle = o.fon || 'rgba(10,13,28,.86)'; cx.strokeStyle = rang; cx.lineWidth = 1;
    E.yumaloq(x, y, w, h, 7); cx.fill(); cx.stroke();
    cx.fillStyle = o.matnRang || '#fff'; cx.textAlign = 'left'; cx.textBaseline = 'middle'; cx.fillText(m, x + 7, y + h / 2 + .5);
    cx.restore();
    return {x, y, w, h};
  };
  /* yoy: markaz (dunyo), radius px, burchaklar radianda (matematik, soat miliga teskari) */
  E.yoy = (x, y, r, a0, a1, rang, o)=>{
    o = o || {}; const X = E.X(x), Y = E.Y(y);
    cx.save();
    if(o.tola){ cx.fillStyle = o.tola; cx.beginPath(); cx.moveTo(X, Y); cx.arc(X, Y, r, -a0, -a1, true); cx.closePath(); cx.fill(); }
    cx.strokeStyle = rang; cx.lineWidth = o.q || 2; if(o.soya){ cx.shadowColor = o.soya; cx.shadowBlur = 12; } if(o.uzuq) cx.setLineDash(o.uzuq);
    cx.beginPath(); cx.arc(X, Y, r, -a0, -a1, true); cx.stroke();
    cx.restore();
  };
  E.poly = (pts, tola, rang, q, o)=>{
    o = o || {}; if(!pts.length) return;
    cx.save(); cx.beginPath(); pts.forEach((p, i)=>{ const X = E.X(p[0]), Y = E.Y(p[1]); if(i) cx.lineTo(X, Y); else cx.moveTo(X, Y); }); cx.closePath();
    if(tola){ cx.fillStyle = tola; cx.fill(); }
    if(rang){ cx.strokeStyle = rang; cx.lineWidth = q || 2; cx.lineJoin = 'round'; if(o.soya){ cx.shadowColor = o.soya; cx.shadowBlur = o.blur || 14; } if(o.uzuq) cx.setLineDash(o.uzuq); cx.stroke(); }
    cx.restore();
  };
  E.egri = (f, rang, q, o)=>{
    o = o || {}; const k = E.korinish(); const x0 = o.x0 !== undefined ? Math.max(o.x0, k[0]) : k[0], x1 = o.x1 !== undefined ? Math.min(o.x1, k[2]) : k[2];
    if(x1 <= x0) return;
    cx.save(); cx.strokeStyle = rang; cx.lineWidth = q || 3; cx.lineJoin = 'round'; cx.lineCap = 'round';
    if(o.soya){ cx.shadowColor = o.soya; cx.shadowBlur = o.blur || 16; } if(o.uzuq) cx.setLineDash(o.uzuq); if(o.alfa !== undefined) cx.globalAlpha = o.alfa;
    cx.beginPath(); let bor = false, oY = 0;
    const qadam = 1.5 / E.b;
    for(let x = x0; x <= x1 + qadam * .5; x += qadam){
      const xx = Math.min(x, x1), y = f(xx); const Y = E.Y(y);
      if(!isFinite(y) || Y < -3000 || Y > E.H + 3000 || (bor && Math.abs(Y - oY) > E.H * 1.5)){ bor = false; continue; }
      if(!bor){ cx.moveTo(E.X(xx), Y); bor = true; } else cx.lineTo(E.X(xx), Y);
      oY = Y;
    }
    cx.stroke(); cx.restore();
  };
  E.strelkaS = (X1, Y1, X2, Y2, rang, q, o)=>{
    o = o || {}; const a = Math.atan2(Y2 - Y1, X2 - X1), u = o.uch || 11;
    E.chiziqS(X1, Y1, X2 - Math.cos(a) * u * .6, Y2 - Math.sin(a) * u * .6, rang, q, o);
    cx.save(); cx.fillStyle = rang; if(o.soya){ cx.shadowColor = o.soya; cx.shadowBlur = 10; }
    cx.beginPath(); cx.moveTo(X2, Y2); cx.lineTo(X2 - Math.cos(a - .42) * u, Y2 - Math.sin(a - .42) * u); cx.lineTo(X2 - Math.cos(a + .42) * u, Y2 - Math.sin(a + .42) * u); cx.closePath(); cx.fill(); cx.restore();
  };
  /* koordinata to‘ri va o‘qlar */
  E.tor = o=>{
    o = o || {}; const k = E.korinish();
    const qad = [.5, 1, 2, 5, 10, 20].find(s=>s * E.b >= 42) || 20;
    cx.save(); cx.lineWidth = 1;
    const x0 = Math.floor(k[0]), x1 = Math.ceil(k[2]), y0 = Math.floor(k[1]), y1 = Math.ceil(k[3]);
    const kichik = E.b >= 26 ? 1 : qad;
    for(let x = Math.ceil(x0 / kichik) * kichik; x <= x1; x += kichik){ const X = Math.round(E.X(x)) + .5; cx.strokeStyle = Math.abs(x % (qad * 5)) < 1e-9 ? 'rgba(255,255,255,.10)' : Math.abs(x % qad) < 1e-9 ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.03)'; cx.beginPath(); cx.moveTo(X, 0); cx.lineTo(X, E.H); cx.stroke(); }
    for(let y = Math.ceil(y0 / kichik) * kichik; y <= y1; y += kichik){ const Y = Math.round(E.Y(y)) + .5; cx.strokeStyle = Math.abs(y % (qad * 5)) < 1e-9 ? 'rgba(255,255,255,.10)' : Math.abs(y % qad) < 1e-9 ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.03)'; cx.beginPath(); cx.moveTo(0, Y); cx.lineTo(E.W, Y); cx.stroke(); }
    const OX = Math.round(E.Y(0)) + .5, OY = Math.round(E.X(0)) + .5;
    cx.strokeStyle = 'rgba(220,226,255,.6)'; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(0, OX); cx.lineTo(E.W, OX); cx.moveTo(OY, 0); cx.lineTo(OY, E.H); cx.stroke();
    cx.fillStyle = 'rgba(220,226,255,.75)';
    cx.beginPath(); cx.moveTo(E.W - 3, OX); cx.lineTo(E.W - 13, OX - 5); cx.lineTo(E.W - 13, OX + 5); cx.fill();
    cx.beginPath(); cx.moveTo(OY, 3); cx.lineTo(OY - 5, 13); cx.lineTo(OY + 5, 13); cx.fill();
    cx.font = 'italic 600 14px Inter, sans-serif'; cx.textAlign = 'left'; cx.fillText(o.xNom || 'x', E.W - 18, OX - 12); cx.fillText(o.yNom || 'y', OY + 9, 16);
    cx.font = '11px "JetBrains Mono", monospace'; cx.fillStyle = 'rgba(190,198,230,.6)';
    cx.textAlign = 'center'; cx.textBaseline = 'top';
    for(let x = Math.ceil(k[0] / qad) * qad; x <= k[2]; x += qad){ if(Math.abs(x) < 1e-9) continue; const X = E.X(x); cx.fillRect(X - .5, OX - 3, 1, 6); cx.fillText(son(x, 1), X, cl(OX + 6, 2, E.H - 14)); }
    cx.textAlign = 'right'; cx.textBaseline = 'middle';
    for(let y = Math.ceil(k[1] / qad) * qad; y <= k[3]; y += qad){ if(Math.abs(y) < 1e-9) continue; const Y = E.Y(y); cx.fillRect(OY - 3, Y - .5, 6, 1); cx.fillText(son(y, 1), cl(OY - 7, 24, E.W - 4), Y); }
    cx.textAlign = 'right'; cx.textBaseline = 'top'; cx.fillText('0', OY - 6, OX + 5);
    cx.restore();
  };
}

/* slayder va tugma satrlari (pastki boshqaruv paneli) */
const SL = (id, nom, min, max, st, v, fmt)=>'<label>' + nom + ' <input type="range" data-p="' + id + '" min="' + min + '" max="' + max + '" step="' + st + '" value="' + v + '" aria-label="' + nom.replace(/<[^>]+>/g, '') + '"><b style="min-width:44px;text-align:right;font-family:\'JetBrains Mono\',monospace">' + (fmt ? fmt(v) : son(v)) + '</b></label>';
const TG = (attr, nom, faol, title)=>'<button ' + attr + ' class="' + (faol ? 'faol' : '') + '"' + (title ? ' title="' + title + '"' : '') + '>' + nom + '</button>';
function slayderBog(tag, fmt, yangi){
  tag.querySelectorAll('[data-p]').forEach(x=>x.oninput = ()=>{ const v = +x.value; x.nextElementSibling.textContent = fmt[x.dataset.p] ? fmt[x.dataset.p](v) : son(v); yangi(x.dataset.p, v); });
}

/* registratsiya: boshlang‘ich holat (test savolida mgUq, aks holda 1-bosqich) */
function reg(nom, fn){
  SAHNA['mg_' + nom] = async (sahna, c)=>{
    const api = await fn(sahna, c);
    const d = c.d || {}, uq = !!(sahna.closest && sahna.closest('.uq-sahna'));
    const bosh = uq && d.mgUq ? d.mgUq : (d.bosqichlar && d.bosqichlar[0] && d.bosqichlar[0].holat);
    if(api && api.holat && bosh) api.holat(bosh);
    return api;
  };
}

/* =====================================================================
   1. MANFIY SONLAR — koordinata to‘g‘ri chizig‘i va termometr (2D)
   ===================================================================== */
reg('sonoq', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {rejim:'nuqta', a:-3, b:5, anim:1};
  const nat = ()=>s.rejim === 'ayir' ? s.a - s.b : s.a + s.b;
  const TX = 13.6, TK = .34; /* termometr: x joyi va 1 °C = 0,34 birlik */
  const E = tekis(sahna, c, {
    olam:()=>[-11.2, -4.6, 15.2, 4.4],
    kadr(dt){ if(s.anim < 1){ s.anim = Math.min(1, s.anim + dt / 1.1); return true; } return false; },
    chiz, bosish, ustida,
    holat(h){
      if(h.rejim) s.rejim = h.rejim;
      if(h.a !== undefined) s.a = cl(Math.round(+h.a), -10, 10);
      if(h.b !== undefined) s.b = cl(Math.round(+h.b), -10, 10);
      tuzat(); s.anim = s.rejim === 'qosh' || s.rejim === 'ayir' ? 0 : 1; tagChiz(); yoz();
    },
    qiymat:()=>Object.assign({}, s, {natija:nat()})
  });
  const cx = E.cx;
  function tuzat(){ /* natija −12…12 oralig‘ida qolsin */ if(s.rejim === 'qosh') s.b = cl(s.b, -12 - s.a, 12 - s.a); if(s.rejim === 'ayir') s.b = cl(s.b, s.a - 12, s.a + 12); s.b = cl(s.b, -10, 10); }
  const iSon = v=>v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '0';
  function qoida(){
    const a = s.a, b = s.rejim === 'ayir' ? -s.b : s.b;
    if(a === 0 || b === 0) return 'Nolni qo‘shganda son o‘zgarmaydi.';
    if(a > 0 && b > 0) return 'Ikkala son musbat: modullar qo‘shiladi, natija musbat.';
    if(a < 0 && b < 0) return 'Ikkala son manfiy: modullar qo‘shiladi (' + Math.abs(a) + ' + ' + Math.abs(b) + ' = ' + (Math.abs(a) + Math.abs(b)) + '), natija oldiga «−» qo‘yiladi.';
    if(Math.abs(a) === Math.abs(b)) return 'Qarama-qarshi sonlar yig‘indisi nolga teng.';
    const k = Math.abs(a) > Math.abs(b) ? a : b;
    return 'Ishoralari har xil: kattasining modulidan kichigining moduli ayiriladi (' + Math.max(Math.abs(a), Math.abs(b)) + ' − ' + Math.min(Math.abs(a), Math.abs(b)) + ' = ' + Math.abs(a + b) + '), moduli katta sonning ishorasi (' + (k > 0 ? '+' : '−') + ') olinadi.';
  }
  function yoz(){
    const a = s.a, r = nat();
    let fx, q, iz;
    if(s.rejim === 'qosh' || s.rejim === 'ayir'){
      const amal = s.rejim === 'ayir' ? ' − ' : ' + ';
      fx = iSon(a) + amal + qv(s.b) + ' = <span class="' + (r < 0 ? 'k' : r > 0 ? 'y' : '') + '">' + iSon(r) + '</span>';
      q = '<span>Boshlanish</span><b>' + iSon(a) + '</b><span>Qadam</span><b class="' + ((s.rejim === 'ayir' ? -s.b : s.b) >= 0 ? 'y' : 'k') + '">' + ((s.rejim === 'ayir' ? -s.b : s.b) >= 0 ? 'o‘ngga ' : 'chapga ') + Math.abs(s.b) + ' birlik</b><span>Natija</span><b>' + iSon(r) + '</b><span>Termometr</span><b>' + iSon(r) + ' °C</b>';
      iz = (s.rejim === 'ayir' ? '<b>Ayirish = qarama-qarshi sonni qo‘shish:</b> ' + iSon(a) + ' − ' + qv(s.b) + ' = ' + iSon(a) + ' + ' + qv(-s.b) + '. ' : '') + qoida();
    } else if(s.rejim === 'modul'){
      fx = '|' + iSon(a) + '| = ' + Math.abs(a);
      q = '<span>Son</span><b>' + iSon(a) + '</b><span>Qarama-qarshisi</span><b class="p">' + iSon(-a) + '</b><span>Moduli</span><b class="s">' + Math.abs(a) + '</b><span>Nolgacha masofa</span><b>' + Math.abs(a) + ' birlik</b>';
      iz = 'Sonning moduli — sonlar o‘qida shu sondan 0 gacha bo‘lgan masofa. Qarama-qarshi sonlar (' + iSon(a) + ' va ' + iSon(-a) + ') 0 dan bir xil uzoqlikda, shuning uchun modullari teng.';
    } else {
      fx = 'A(' + iSon(a) + ')';
      q = '<span>Ishorasi</span><b class="' + (a < 0 ? 'k' : a > 0 ? 'y' : '') + '">' + (a > 0 ? 'musbat' : a < 0 ? 'manfiy' : 'na musbat, na manfiy') + '</b><span>Qarama-qarshisi</span><b class="p">' + iSon(-a) + '</b><span>Moduli</span><b class="s">|' + iSon(a) + '| = ' + Math.abs(a) + '</b><span>Termometr</span><b>' + iSon(a) + ' °C</b>';
      iz = a < 0 ? 'Manfiy son 0 dan <b>chapda</b> turadi. Termometrda — noldan past harorat (sovuq).' : a > 0 ? 'Musbat son 0 dan <b>o‘ngda</b> turadi. Termometrda — noldan yuqori harorat.' : '0 — sanoq boshi; u musbat ham, manfiy ham emas.';
    }
    E.karta.yoz(s.rejim === 'qosh' ? 'Qo‘shish — o‘q bo‘ylab qadam' : s.rejim === 'ayir' ? 'Ayirish' : s.rejim === 'modul' ? 'Modul' : 'Koordinata to‘g‘ri chizig‘i', fx, '<div class="q">' + q + '</div><div class="iz">' + iz + '</div>');
    izoh.innerHTML = s.rejim === 'qosh' || s.rejim === 'ayir' ? '<b>' + iSon(a) + (s.rejim === 'ayir' ? ' − ' : ' + ') + qv(s.b) + ' = ' + iSon(r) + '.</b> ' + qoida() : s.rejim === 'modul' ? '<b>|' + iSon(a) + '| = ' + Math.abs(a) + '.</b> Modul — nolgacha masofa, u hech qachon manfiy bo‘lmaydi.' : '<b>A(' + iSon(a) + ').</b> Sonlar o‘qini bosing — nuqta ko‘chadi. Chapdagi son doim kichik: ' + (a - 2) + ' < ' + a + '.';
    E.iflos = true;
  }
  function tagChiz(){
    const qo = s.rejim === 'qosh' || s.rejim === 'ayir';
    tag.innerHTML = [['nuqta', 'Nuqta'], ['modul', 'Modul'], ['qosh', 'Qo‘shish'], ['ayir', 'Ayirish']].map(r=>TG('data-r="' + r[0] + '"', r[1], s.rejim === r[0])).join('') +
      (qo ? TG('data-x', '▶ Qadamni ko‘rsatish') : '') + '<span class="tag-ajr"></span>' +
      SL('a', qo ? 'Boshlanish a' : 'Son a', -10, 10, 1, s.a, iSon) + (qo ? SL('b', s.rejim === 'ayir' ? 'Ayriluvchi b' : 'Qo‘shiluvchi b', -10, 10, 1, s.b, iSon) : '');
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ s.rejim = b.dataset.r; tuzat(); s.anim = s.rejim === 'qosh' || s.rejim === 'ayir' ? 0 : 1; tagChiz(); yoz(); yubor(); });
    const x = tag.querySelector('[data-x]'); if(x) x.onclick = ()=>{ s.anim = 0; };
    slayderBog(tag, {a:iSon, b:iSon}, (p, v)=>{ s[p] = v; if(p === 'a' || p === 'b'){ const b0 = s.b; tuzat(); if(b0 !== s.b){ const sl = tag.querySelector('[data-p="b"]'); if(sl){ sl.value = s.b; sl.nextElementSibling.textContent = iSon(s.b); } } } s.anim = s.rejim === 'qosh' || s.rejim === 'ayir' ? .55 : 1; yoz(); yubor(); });
  }
  function yubor(ext){ hodisa('mg-son', Object.assign({rejim:s.rejim, a:s.a, b:s.b, natija:nat(), son:s.a}, ext || {})); }
  function bosish(x, y){
    if(Math.abs(y) < 1.3 && x > -11 && x < 11){
      const n = cl(Math.round(x), -10, 10);
      if(s.rejim === 'nuqta' || s.rejim === 'modul'){ s.a = n; tagChiz(); yoz(); }
      yubor({bos:true, son:n});
    } else if(Math.abs(x - TX) < 1 && y > -4.4 && y < 4){
      const v = cl(Math.round(y / TK), -10, 10);
      if(s.rejim === 'nuqta'){ s.a = v; tagChiz(); yoz(); }
      yubor({bos:true, son:v, harorat:true});
    }
  }
  function ustida(x, y){
    if(Math.abs(y) < 1.3 && x > -11 && x < 11){ const n = cl(Math.round(x), -10, 10); return {bos:true, matn:iSon(n) + (n ? ' · |' + iSon(n) + '| = ' + Math.abs(n) : '')}; }
    if(Math.abs(x - TX) < 1 && y > -4.4 && y < 4){ const v = cl(Math.round(y / TK), -10, 10); return {bos:true, matn:iSon(v) + ' °C'}; }
    return null;
  }
  function chiz(E){
    const X0 = E.X(-10.8), X1 = E.X(10.8), Y0 = E.Y(0), b = E.b;
    /* o‘q: manfiy tomon sovuq, musbat tomon iliq */
    const g = cx.createLinearGradient(X0, 0, X1, 0); g.addColorStop(0, '#4d8dff'); g.addColorStop(.5, '#dfe3ff'); g.addColorStop(1, '#ff9f43');
    cx.save(); cx.strokeStyle = g; cx.lineWidth = 4; cx.shadowColor = 'rgba(140,150,255,.5)'; cx.shadowBlur = 12; cx.lineCap = 'round';
    cx.beginPath(); cx.moveTo(X0, Y0); cx.lineTo(X1, Y0); cx.stroke(); cx.restore();
    E.strelkaS(X1 - 4, Y0, X1 + 14, Y0, '#ffb86b', 4, {uch:14});
    E.matn(X1 + 12, Y0 - 18, 'x', '#cfd4ee', 'italic 600 15px Inter, sans-serif');
    for(let n = -10; n <= 10; n++){
      const X = E.X(n), kat = n % 5 === 0;
      E.chiziqS(X, Y0 - (kat ? 9 : 6), X, Y0 + (kat ? 9 : 6), n === 0 ? '#fff' : 'rgba(220,226,255,.75)', n === 0 ? 2.5 : 1.5);
      E.matn(X, Y0 + 22, n > 0 ? '+' + n : n < 0 ? '−' + Math.abs(n) : '0', n === 0 ? '#fff' : n < 0 ? '#8fb6ff' : '#ffc890', (n === 0 ? '700 ' : '600 ') + Math.round(cl(b * .38, 10, 13)) + 'px "JetBrains Mono", monospace');
    }
    E.matn(E.X(-5.5), Y0 + 44, '← manfiy sonlar', 'rgba(143,182,255,.8)', '600 12px Inter, sans-serif');
    E.matn(E.X(5.5), Y0 + 44, 'musbat sonlar →', 'rgba(255,200,144,.85)', '600 12px Inter, sans-serif');
    const t = s.anim, e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    let joriy = s.a;
    if(s.rejim === 'modul'){
      const a = s.a;
      if(a !== 0){
        [a, -a].forEach((v, i)=>{
          const Xa = E.X(v), X0b = E.X(0), yb = Y0 - 34 - i * 0;
          cx.save(); cx.strokeStyle = i ? 'rgba(255,107,154,.8)' : R.gr; cx.lineWidth = 2; cx.setLineDash(i ? [5, 5] : []);
          cx.beginPath(); cx.moveTo(Xa, Y0 - 12); cx.lineTo(Xa, yb); cx.lineTo(X0b, yb); cx.lineTo(X0b, Y0 - 12); cx.stroke(); cx.restore();
          E.teg((Xa + X0b) / 2, yb, Math.abs(a) + ' birlik', i ? R.pk : R.gr, {pos:'t', off:4});
        });
        E.nuqta(-a, 0, R.pk, 7);
        E.teg(E.X(-a), Y0 - 44, 'B(' + iSon(-a) + ')', R.pk, {pos:'t', off:10});
      }
    }
    if(s.rejim === 'qosh' || s.rejim === 'ayir'){
      const qad = s.rejim === 'ayir' ? -s.b : s.b, r = s.a + qad;
      joriy = s.a + qad * e;
      /* yoy-strelka */
      const Xa = E.X(s.a), Xr = E.X(s.a + qad * e), bal = Math.min(110, 26 + Math.abs(qad) * b * .28);
      const rang = qad >= 0 ? R.or : R.cy;
      if(qad !== 0){
        cx.save(); cx.strokeStyle = rang; cx.lineWidth = 3.2; cx.shadowColor = rang; cx.shadowBlur = 14;
        cx.beginPath(); const N = 40;
        for(let i = 0; i <= N; i++){ const u = i / N * e; const X = Xa + (E.X(s.a + qad) - Xa) * u; const Y = Y0 - 16 - Math.sin(PI * u) * bal; if(i) cx.lineTo(X, Y); else cx.moveTo(X, Y); }
        cx.stroke(); cx.restore();
        if(e > .15){ const u = e, Xu = Xa + (E.X(s.a + qad) - Xa) * u, Yu = Y0 - 16 - Math.sin(PI * u) * bal, u2 = Math.max(0, e - .04), X2 = Xa + (E.X(s.a + qad) - Xa) * u2, Y2 = Y0 - 16 - Math.sin(PI * u2) * bal; E.strelkaS(X2, Y2, Xu, Yu, rang, 3, {uch:13}); }
        E.teg((Xa + E.X(s.a + qad)) / 2, Y0 - 16 - bal, (qad > 0 ? '+' : '−') + Math.abs(qad), rang, {pos:'t', off:6, shrift:'700 13px "JetBrains Mono", monospace'});
      }
      E.nuqta(s.a, 0, 'rgba(255,255,255,.9)', 6, {bosh:true, ichi:'#0b0f1f', chet:'#fff'});
      E.teg(Xa, Y0 + 56, 'a = ' + iSon(s.a), '#aab3d8', {pos:'m', off:0});
      if(t >= 1) E.teg(E.X(r), Y0 + 82, 'natija ' + iSon(r), r < 0 ? R.cy : R.am, {pos:'m', off:0, shrift:'700 12.5px "JetBrains Mono", monospace'});
      void Xr;
    }
    const rangA = joriy < 0 ? '#7fb2ff' : joriy > 0 ? '#ffb45c' : '#ffffff';
    E.nuqta(joriy, 0, rangA, 8.5);
    if(s.rejim === 'nuqta' || s.rejim === 'modul') E.teg(E.X(joriy), Y0 - (s.rejim === 'modul' ? 44 : 20), 'A(' + iSon(s.a) + ')', rangA, {pos:'t', off:10, shrift:'700 13px "JetBrains Mono", monospace'});
    termometr(joriy);
  }
  function termometr(v){
    const X = E.X(TX), yT = E.Y(10.8 * TK), yB = E.Y(-10.8 * TK), w = Math.max(12, E.b * .5), br = w * 1.05, yBulb = yB + br * 1.25;
    cx.save();
    /* shisha */
    const sg = cx.createLinearGradient(X - w, 0, X + w, 0); sg.addColorStop(0, 'rgba(255,255,255,.14)'); sg.addColorStop(.35, 'rgba(255,255,255,.05)'); sg.addColorStop(1, 'rgba(255,255,255,.12)');
    cx.fillStyle = sg; cx.strokeStyle = 'rgba(220,228,255,.45)'; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(X - w / 2, yBulb - br * .8); cx.lineTo(X - w / 2, yT); cx.arc(X, yT, w / 2, PI, 0); cx.lineTo(X + w / 2, yBulb - br * .8); cx.arc(X, yBulb, br, -PI / 2 + .55, PI * 1.5 - .55); cx.closePath(); cx.fill(); cx.stroke();
    /* suyuqlik */
    const yv = E.Y(v * TK), lg = cx.createLinearGradient(0, yBulb, 0, yT); lg.addColorStop(0, '#ff3b3b'); lg.addColorStop(1, '#ff8a5c');
    cx.fillStyle = lg; cx.shadowColor = 'rgba(255,70,70,.7)'; cx.shadowBlur = 14;
    cx.beginPath(); cx.arc(X, yBulb, br * .72, 0, PI * 2); cx.fill();
    cx.fillRect(X - w * .22, yv, w * .44, yBulb - yv);
    cx.shadowBlur = 0;
    /* shkala */
    cx.font = '600 10.5px "JetBrains Mono", monospace'; cx.textAlign = 'left'; cx.textBaseline = 'middle';
    for(let d = -10; d <= 10; d++){ const Y = E.Y(d * TK); const kat = d % 5 === 0; cx.fillStyle = d === 0 ? '#fff' : 'rgba(210,216,240,.7)'; cx.fillRect(X + w / 2 + 2, Y - .5, kat ? 10 : 5, 1); if(kat || E.b > 34 && d % 2 === 0) cx.fillText((d > 0 ? '+' : d < 0 ? '−' : '') + Math.abs(d), X + w / 2 + 14, Y); }
    cx.restore();
    E.matn(X, yT - w - 12, '°C', '#dfe3ff', '700 13px Inter, sans-serif');
    E.teg(X - w / 2, yv, iSon(Math.round(v)) + ' °C', v < 0 ? R.cy : R.qi, {pos:'c', off:8});
  }
  yorliq('Matematika · sonlar o‘qi va termometr');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   2. CHIZIQLI FUNKSIYA y = kx + b (2D)
   ===================================================================== */
reg('chiziq', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {k:2, b:-3, ikki:false, k2:2, b2:1, uch:true};
  const f = (x, k, b)=>k * x + b;
  const E = tekis(sahna, c, {
    pan:true,
    olam:()=>[-7, -6, 7, 6],
    chiz, bosish, ustida, tutqich,
    holat(h){
      ['k', 'b', 'k2', 'b2'].forEach(n=>{ if(h[n] !== undefined) s[n] = +h[n]; });
      if(h.ikki !== undefined) s.ikki = !!h.ikki; if(h.uch !== undefined) s.uch = !!h.uch;
      tagChiz(); yoz();
    },
    qiymat:()=>Object.assign({}, s, mal())
  });
  const cx = E.cx;
  const fxT = (k, b)=>{ let t = k === 0 ? '' : (k === 1 ? '' : k === -1 ? '−' : son(k)) + 'x'; if(b !== 0 || !t) t += (t ? (b < 0 ? ' − ' : ' + ') + son(Math.abs(b)) : son(b)); return 'y = ' + t; };
  function mal(){
    const x0 = s.k !== 0 ? -s.b / s.k : null;
    const o = {k:s.k, b:s.b, x0, burchak:Math.round(Math.atan(s.k) / RAD * 10) / 10, osish:s.k > 0 ? 'osuvchi' : s.k < 0 ? 'kamayuvchi' : 'ozgarmas'};
    if(s.ikki){ o.k2 = s.k2; o.b2 = s.b2; o.parallel = s.k === s.k2 && s.b !== s.b2; o.ustma = s.k === s.k2 && s.b === s.b2; if(s.k !== s.k2){ o.kx = (s.b2 - s.b) / (s.k - s.k2); o.ky = f(o.kx, s.k, s.b); } }
    return o;
  }
  function yoz(){
    const m = mal();
    let q = '<span>Burchak koeff.</span><b class="y">k = ' + son(s.k) + '</b><span>Erkin had</span><b class="k">b = ' + son(s.b) + '</b>' +
      '<span>Oy bilan</span><b class="k">(0; ' + son(s.b) + ')</b><span>Ox bilan</span><b class="s">' + (m.x0 !== null ? '(' + son(m.x0) + '; 0)' : s.b === 0 ? 'Ox ning o‘zi' : 'kesishmaydi') + '</b>' +
      '<span>Funksiya</span><b>' + {osuvchi:'o‘suvchi', kamayuvchi:'kamayuvchi', ozgarmas:'o‘zgarmas'}[m.osish] + '</b><span>Ox bilan burchak</span><b>α ≈ ' + son(m.burchak, 1) + '°</b>';
    if(s.ikki) q += '<span>2-chiziq</span><b class="p">' + fxT(s.k2, s.b2) + '</b><span>O‘zaro</span><b class="p">' + (m.ustma ? 'ustma-ust' : m.parallel ? 'parallel (k₁ = k₂)' : 'kesishadi (' + son(m.kx) + '; ' + son(m.ky) + ')') + '</b>';
    const iz = s.k > 0 ? 'k > 0: x 1 ga ortsa, y <b>' + son(s.k) + '</b> ga ortadi — chiziq chapdan o‘ngga ko‘tariladi.' : s.k < 0 ? 'k < 0: x 1 ga ortsa, y <b>' + son(Math.abs(s.k)) + '</b> ga kamayadi — chiziq pastga tushadi.' : 'k = 0: y = b — Ox ga parallel to‘g‘ri chiziq.';
    E.karta.yoz('Chiziqli funksiya', fxT(s.k, s.b), '<div class="q">' + q + '</div><div class="iz">' + iz + ' Sariq nuqtani surib k ni, havorang nuqtani surib b ni o‘zgartiring.</div>');
    izoh.innerHTML = '<b>' + fxT(s.k, s.b) + '.</b> ' + iz + (s.ikki ? ' Ikkinchi chiziq: ' + fxT(s.k2, s.b2) + (m.parallel ? ' — burchak koeffitsiyentlari teng, chiziqlar parallel.' : m.ustma ? ' — ustma-ust tushadi.' : ' — kesishadi.') : '');
    E.iflos = true;
  }
  function yubor(ext){ hodisa('mg-chiziq', Object.assign(mal(), ext || {})); }
  function tagChiz(){
    tag.innerHTML = SL('k', 'k', -4, 4, .5, s.k) + SL('b', 'b', -6, 6, .5, s.b) + '<span class="tag-ajr"></span>' +
      TG('data-u', 'Qiyalik uchburchagi', s.uch) + TG('data-i', 'Ikkinchi chiziq', s.ikki) + (s.ikki ? SL('k2', 'k₂', -4, 4, .5, s.k2) + SL('b2', 'b₂', -6, 6, .5, s.b2) : '');
    slayderBog(tag, {}, (p, v)=>{ s[p] = v; yoz(); yubor(); });
    tag.querySelector('[data-u]').onclick = ()=>{ s.uch = !s.uch; tagChiz(); E.iflos = true; };
    tag.querySelector('[data-i]').onclick = ()=>{ s.ikki = !s.ikki; tagChiz(); yoz(); yubor(); };
  }
  const P1x = 2;
  function tutqich(X, Y){
    if(Math.hypot(X - E.X(0), Y - E.Y(s.b)) < 14) return {sur:(x, y)=>{ s.b = cl(yax(y, .5), -6, 6); yoz(); }, qoy:()=>{ tagChiz(); yubor(); }};
    if(Math.hypot(X - E.X(P1x), Y - E.Y(f(P1x, s.k, s.b))) < 14) return {sur:(x, y)=>{ s.k = cl(yax((y - s.b) / P1x, .5), -4, 4); yoz(); }, qoy:()=>{ tagChiz(); yubor(); }};
    return null;
  }
  function nomla(x, y, X, Y){
    const m = mal();
    if(Math.hypot(X - E.X(0), Y - E.Y(s.b)) < 16) return 'oy';
    if(m.x0 !== null && Math.hypot(X - E.X(m.x0), Y - E.Y(0)) < 16) return 'ox';
    if(s.ikki && m.kx !== undefined && Math.hypot(X - E.X(m.kx), Y - E.Y(m.ky)) < 16) return 'kesishish';
    if(Math.hypot(X - E.X(0), Y - E.Y(0)) < 14) return 'boshi';
    const d = Math.abs(s.k * x - y + s.b) / Math.hypot(s.k, 1) * E.b; if(d < 11) return 'chiziq';
    return 'tekislik';
  }
  function bosish(x, y, X, Y){
    const nom = nomla(x, y, X, Y), xs = yax(x, .5), ys = yax(y, .5);
    yubor({bos:true, nom, x:xs, y:ys, chiziqda:Math.abs(f(xs, s.k, s.b) - ys) < 1e-6});
    belgi = {x:xs, y:ys, t:performance.now(), ok:Math.abs(f(xs, s.k, s.b) - ys) < 1e-6}; E.iflos = true;
    if(nom === 'oy' || nom === 'ox') detal('mg_chiziq', nom);
  }
  let belgi = null;
  function ustida(x, y, X, Y){
    const nom = nomla(x, y, X, Y), xs = yax(x, .5), ys = yax(y, .5);
    const t = {oy:'Oy bilan kesishish (0; ' + son(s.b) + ')', ox:'Ox bilan kesishish', kesishish:'Ikki chiziq kesishgan nuqta', boshi:'Koordinata boshi (0; 0)', chiziq:'Grafik: x = ' + son(xs) + ' da y = ' + son(f(xs, s.k, s.b))};
    return {bos:nom !== 'tekislik', matn:t[nom] || '(' + son(xs) + '; ' + son(ys) + ') — y = ' + son(f(xs, s.k, s.b)) + ' bo‘lganda grafikda yotardi'};
  }
  function chiz(E){
    E.tor();
    const m = mal();
    if(s.ikki){ E.togri(0, s.b2, 1, s.k2, R.pk, 3, {soya:'rgba(255,107,154,.6)', alfa:.95}); }
    const gr = cx.createLinearGradient(0, 0, E.W, 0); gr.addColorStop(0, '#7b63ff'); gr.addColorStop(.5, '#b9a8ff'); gr.addColorStop(1, '#7b63ff');
    E.togri(0, s.b, 1, s.k, gr, 3.6, {soya:'rgba(139,116,255,.85)'});
    /* qiyalik uchburchagi */
    if(s.uch){
      const x1 = 0, y1 = s.b, x2 = P1x, y2 = f(P1x, s.k, s.b);
      E.poly([[x1, y1], [x2, y1], [x2, y2]], 'rgba(255,193,77,.10)', null);
      E.chiziq(x1, y1, x2, y1, R.gr, 2.4, {uzuq:[6, 5]});
      E.chiziq(x2, y1, x2, y2, R.am, 2.4, {uzuq:[6, 5]});
      E.teg((E.X(x1) + E.X(x2)) / 2, E.Y(y1), 'Δx = ' + P1x, R.gr, {pos:s.k >= 0 ? 'p' : 't', off:6});
      if(s.k !== 0) E.teg(E.X(x2), (E.Y(y1) + E.Y(y2)) / 2, 'Δy = ' + son(y2 - y1), R.am, {pos:'o', off:10});
      E.teg(E.X(x2), E.Y(y2), 'k = Δy/Δx = ' + son(s.k), R.am, {pos:s.k >= 0 ? 't' : 'p', off:14});
    }
    if(m.x0 !== null) E.nuqta(m.x0, 0, R.gr, 6);
    if(s.ikki && m.kx !== undefined) E.nuqta(m.kx, m.ky, R.pk, 6);
    E.nuqta(P1x, f(P1x, s.k, s.b), R.am, 8);
    E.nuqta(0, s.b, R.cy, 8);
    E.teg(E.X(0), E.Y(s.b), '(0; ' + son(s.b) + ')', R.cy, {pos:'c', off:12});
    if(m.x0 !== null && Math.abs(m.x0) > .3) E.teg(E.X(m.x0), E.Y(0), '(' + son(m.x0) + '; 0)', R.gr, {pos:s.k > 0 ? 'p' : 't', off:10});
    if(belgi){ const dt = (performance.now() - belgi.t) / 1000; if(dt < 2.2){ E.nuqta(belgi.x, belgi.y, belgi.ok ? R.gr : '#ffffff', 5, {nur:false}); E.iflos = true; } else belgi = null; }
  }
  yorliq('Matematika · chiziqli funksiya');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   3. TENGSIZLIKLARNI GRAFIK USULDA YECHISH (2D)
   ===================================================================== */
const BELGI = ['>', '≥', '<', '≤'];
reg('tengsiz', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {rejim:'kvadrat', a:1, b:-2, c:-3, belgi:'<', l1:{k:1, b:1, belgi:'≤'}, l2:{k:-.5, b:-1, belgi:'>'}, faol:1};
  const f = x=>s.a * x * x + s.b * x + s.c;
  let belgiNuqta = null;
  const E = tekis(sahna, c, {
    pan:true,
    olam:()=>[-6.5, -6, 6.5, 6],
    chiz, bosish, ustida,
    holat(h){
      if(h.rejim) s.rejim = h.rejim;
      ['a', 'b', 'c'].forEach(n=>{ if(h[n] !== undefined) s[n] = +h[n]; }); if(!s.a) s.a = 1;
      if(h.belgi) s.belgi = h.belgi;
      if(h.l1) Object.assign(s.l1, h.l1); if(h.l2) Object.assign(s.l2, h.l2);
      tagChiz(); yoz();
    },
    qiymat:()=>Object.assign({}, s, yech())
  });
  const cx = E.cx;
  const qatiy = b=>b === '>' || b === '<';
  const katta = b=>b === '>' || b === '≥';
  const qanoat = (v, b)=>b === '>' ? v > 1e-12 : b === '≥' ? v >= -1e-12 : b === '<' ? v < -1e-12 : v <= 1e-12;
  function ildizlar(){
    const D = s.b * s.b - 4 * s.a * s.c;
    if(D > 1e-12){ const q = Math.sqrt(D); const r = [(-s.b - q) / (2 * s.a), (-s.b + q) / (2 * s.a)].sort((u, v)=>u - v); return {D, r}; }
    if(Math.abs(D) <= 1e-12) return {D:0, r:[-s.b / (2 * s.a)]};
    return {D, r:[]};
  }
  /* kvadrat tengsizlik yechimi: oraliqlar {l, r, lY, rY} va tur */
  function yech(){
    const {D, r} = ildizlar(), b = s.belgi, yop = !qatiy(b);
    const musbat = katta(b);  /* f > 0 (yoki ≥ 0) kerakmi */
    const tash = (s.a > 0) === musbat; /* kerakli ishora tashqarida (ildizlardan tashqari) */
    let o = [], tur;
    if(r.length === 2){
      if(tash){ o = [{l:-Infinity, r:r[0], rY:yop}, {l:r[1], r:Infinity, lY:yop}]; tur = 'tashqi'; }
      else { o = [{l:r[0], r:r[1], lY:yop, rY:yop}]; tur = 'ichki'; }
    } else if(r.length === 1){
      if(tash){ if(yop){ o = [{l:-Infinity, r:Infinity}]; tur = 'hammasi'; } else { o = [{l:-Infinity, r:r[0]}, {l:r[0], r:Infinity}]; tur = 'teshik'; } }
      else { if(yop){ o = [{l:r[0], r:r[0], lY:true, rY:true}]; tur = 'nuqta'; } else { o = []; tur = 'yoq'; } }
    } else {
      if(tash){ o = [{l:-Infinity, r:Infinity}]; tur = 'hammasi'; } else { o = []; tur = 'yoq'; }
    }
    return {D, ildiz:r, oraliq:o, tur, x1:r[0], x2:r.length === 2 ? r[1] : r[0]};
  }
  const sn = v=>{ const t = Math.round(v * 1000) / 1000; return Math.abs(t - Math.round(t * 2) / 2) < 1e-9 ? son(t) : '≈' + son(v); };
  function javob(y){
    const o = y.oraliq;
    if(y.tur === 'hammasi') return 'x — istalgan son';
    if(y.tur === 'yoq') return 'yechim yo‘q';
    if(y.tur === 'nuqta') return 'x = ' + sn(o[0].l);
    return o.map(i=>(i.l === -Infinity ? '(−∞' : (i.lY ? '[' : '(') + sn(i.l)) + '; ' + (i.r === Infinity ? '+∞)' : sn(i.r) + (i.rY ? ']' : ')'))).join(' ∪ ');
  }
  const fT = ()=>{ const h = []; const add = (v, t)=>{ if(!v) return; const m = Math.abs(v); h.push({z:v < 0 ? '−' : '+', t:(m === 1 && t ? '' : son(m)) + t}); }; add(s.a, 'x²'); add(s.b, 'x'); add(s.c, ''); return h.map((x, i)=>(i ? ' ' + x.z + ' ' : x.z === '−' ? '−' : '') + x.t).join('') || '0'; };
  const lT = L=>'y ' + L.belgi + ' ' + ((L.k === 0 ? '' : (L.k === 1 ? '' : L.k === -1 ? '−' : son(L.k)) + 'x') + (L.b !== 0 || L.k === 0 ? (L.k === 0 ? son(L.b) : (L.b < 0 ? ' − ' : ' + ') + son(Math.abs(L.b))) : ''));
  const lOk = (L, x, y)=>qanoat(y - (L.k * x + L.b), L.belgi);
  function yoz(){
    if(s.rejim === 'kvadrat'){
      const y = yech();
      const ild = y.ildiz.length === 2 ? 'x₁ = ' + sn(y.ildiz[0]) + ', x₂ = ' + sn(y.ildiz[1]) : y.ildiz.length === 1 ? 'x = ' + sn(y.ildiz[0]) : 'yo‘q (D < 0)';
      const q = '<span>Tarmoqlar</span><b>' + (s.a > 0 ? 'yuqoriga' : 'pastga') + '</b><span>D</span><b>' + son(y.D) + '</b><span>Ildizlar</span><b class="s">' + ild + '</b><span>Kerak</span><b class="y">f(x) ' + s.belgi + ' 0 — ' + (katta(s.belgi) ? 'Ox dan yuqori' : 'Ox dan past') + (qatiy(s.belgi) ? '' : ' yoki ustida') + '</b>';
      E.karta.yoz('Kvadrat tengsizlik', fT() + ' ' + s.belgi + ' 0', '<div class="q">' + q + '</div><div class="iz"><b>Javob:</b> ' + javob(y) + '. Yashil qism — parabolaning shartni qanoatlantiruvchi bo‘lagi; uning ostidagi Ox kesmalari — yechim.</div>');
      izoh.innerHTML = '<b>' + fT() + ' ' + s.belgi + ' 0 → ' + javob(y) + '.</b> ' + (y.ildiz.length ? 'Ildizlar parabolani Ox ga nisbatan bo‘laklarga ajratadi; ' + (s.a > 0 ? 'a > 0 — ildizlardan tashqarida f(x) > 0, ular orasida f(x) < 0.' : 'a < 0 — ildizlar orasida f(x) > 0, tashqarida f(x) < 0.') : 'D < 0 — parabola Ox ni kesmaydi, ishorasi hamma joyda a ning ishorasi bilan bir xil.') + (qatiy(s.belgi) ? ' Qat’iy belgi — ildizlar javobga kirmaydi (bo‘sh doiracha).' : ' Noqat’iy belgi — ildizlar ham javobga kiradi (to‘la doiracha).');
    } else {
      const L1 = s.l1, L2 = s.l2, ikki = s.rejim === 'sistema';
      const q = '<span>1-tengsizlik</span><b class="y">' + lT(L1) + '</b>' + (ikki ? '<span>2-tengsizlik</span><b class="k">' + lT(L2) + '</b>' : '') +
        '<span>Chegara</span><b>' + (qatiy(L1.belgi) ? 'uzuq (kirmaydi)' : 'yaxlit (kiradi)') + '</b>';
      const kes = ikki && L1.k !== L2.k ? (()=>{ const x = (L2.b - L1.b) / (L1.k - L2.k); return '(' + son(x) + '; ' + son(L1.k * x + L1.b) + ')'; })() : null;
      E.karta.yoz(ikki ? 'Tengsizliklar sistemasi' : 'Ikki o‘zgaruvchili tengsizlik', ikki ? '{ ' + lT(L1) + '<br>{ ' + lT(L2) : lT(L1),
        '<div class="q">' + q + (kes ? '<span>Chegaralar kesishuvi</span><b class="s">' + kes + '</b>' : ikki ? '<span>Chegaralar</span><b>parallel</b>' : '') + '</div><div class="iz">' + (ikki ? 'Har tengsizlik — yarim tekislik. Sistemaning yechimi — ikkala soha <b>kesishgan</b> qism (yashil).' : 'y ' + (katta(L1.belgi) ? '>' : '<') + ' kx + b — to‘g‘ri chiziqdan ' + (katta(L1.belgi) ? 'yuqoridagi' : 'pastdagi') + ' yarim tekislik.') + ' Istalgan nuqtani bosing — u yechim bo‘ladimi, tekshiriladi.</div>');
      izoh.innerHTML = ikki ? '<b>Sistema:</b> ' + lT(L1) + ' va ' + lT(L2) + '. Yechim — ikkala yarim tekislikning umumiy qismi. Nuqtani bosib tekshiring: uning koordinatalari ikkala tengsizlikni ham qanoatlantirishi kerak.' : '<b>' + lT(L1) + '.</b> Chegara y = kx + b to‘g‘ri chizig‘i; ' + (qatiy(L1.belgi) ? 'belgi qat’iy — chegara uzuq chiziq, uning nuqtalari yechim emas.' : 'belgi noqat’iy — chegara yaxlit chiziq, uning nuqtalari ham yechim.');
    }
    E.iflos = true;
  }
  function yubor(ext){
    let d;
    if(s.rejim === 'kvadrat'){ const y = yech(); d = {rejim:'kvadrat', a:s.a, b:s.b, c:s.c, belgi:s.belgi, D:y.D, tur:y.tur, x1:y.x1, x2:y.x2, javob:javob(y)}; }
    else d = {rejim:s.rejim, k1:s.l1.k, b1:s.l1.b, belgi1:s.l1.belgi, k2:s.l2.k, b2:s.l2.b, belgi2:s.l2.belgi};
    hodisa('mg-teng', Object.assign(d, ext || {}));
  }
  function tagChiz(){
    let h = [['kvadrat', 'Kvadrat tengsizlik'], ['chiziqli', 'y va x li tengsizlik'], ['sistema', 'Sistema']].map(r=>TG('data-r="' + r[0] + '"', r[1], s.rejim === r[0])).join('') + '<span class="tag-ajr"></span>';
    if(s.rejim === 'kvadrat') h += SL('a', 'a', -3, 3, .5, s.a) + SL('b', 'b', -6, 6, 1, s.b) + SL('c', 'c', -6, 6, 1, s.c) + TG('data-b', 'Belgi: ' + s.belgi, true, 'Bosing — belgi almashadi');
    else {
      if(s.rejim === 'sistema') h += TG('data-f="1"', '1-tengsizlik', s.faol === 1) + TG('data-f="2"', '2-tengsizlik', s.faol === 2);
      const L = s.rejim === 'sistema' && s.faol === 2 ? s.l2 : s.l1;
      h += SL('lk', 'k', -3, 3, .5, L.k) + SL('lb', 'b', -5, 5, .5, L.b) + TG('data-b', 'Belgi: y ' + L.belgi, true, 'Bosing — belgi almashadi');
    }
    tag.innerHTML = h;
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ s.rejim = b.dataset.r; if(s.rejim === 'chiziqli') s.faol = 1; tagChiz(); yoz(); yubor(); });
    tag.querySelectorAll('[data-f]').forEach(b=>b.onclick = ()=>{ s.faol = +b.dataset.f; tagChiz(); });
    const bb = tag.querySelector('[data-b]');
    bb.onclick = ()=>{ if(s.rejim === 'kvadrat') s.belgi = BELGI[(BELGI.indexOf(s.belgi) + 1) % 4]; else { const L = s.rejim === 'sistema' && s.faol === 2 ? s.l2 : s.l1; L.belgi = BELGI[(BELGI.indexOf(L.belgi) + 1) % 4]; } tagChiz(); yoz(); yubor(); };
    slayderBog(tag, {}, (p, v)=>{
      if(p === 'a'){ if(v === 0){ v = s.a > 0 ? -.5 : .5; tag.querySelector('[data-p="a"]').value = v; tag.querySelector('[data-p="a"]').nextElementSibling.textContent = son(v); } s.a = v; }
      else if(p === 'b' || p === 'c') s[p] = v;
      else { const L = s.rejim === 'sistema' && s.faol === 2 ? s.l2 : s.l1; if(p === 'lk') L.k = v; else L.b = v; }
      yoz(); yubor();
    });
  }
  function nuqtaYechim(x, y){
    if(s.rejim === 'kvadrat') return qanoat(f(x), s.belgi);
    if(s.rejim === 'chiziqli') return lOk(s.l1, x, y);
    return lOk(s.l1, x, y) && lOk(s.l2, x, y);
  }
  function bosish(x, y){
    const xs = yax(x, .25), ys = yax(y, .25), ok = nuqtaYechim(xs, ys);
    belgiNuqta = {x:xs, y:s.rejim === 'kvadrat' ? 0 : ys, ok, t:performance.now()};
    yubor({bos:true, x:xs, y:ys, yechim:ok});
    izoh.innerHTML = '<b>(' + son(xs) + '; ' + son(ys) + ')</b> — ' + (s.rejim === 'kvadrat' ? 'x = ' + son(xs) + ' da f(x) = ' + son(f(xs)) + (ok ? ' → shart bajariladi, x yechim.' : ' → shart bajarilmaydi.') : ok ? 'tengsizlik' + (s.rejim === 'sistema' ? 'lar sistemasini' : 'ni') + ' qanoatlantiradi — yechim.' : 'yechim emas' + (s.rejim === 'sistema' ? ' (' + (lOk(s.l1, xs, ys) ? '1-si bajariladi, 2-si yo‘q' : lOk(s.l2, xs, ys) ? '2-si bajariladi, 1-si yo‘q' : 'ikkalasi ham bajarilmaydi') + ').' : '.'));
    E.iflos = true;
  }
  function ustida(x, y){ const xs = yax(x, .25), ys = yax(y, .25); return {bos:true, matn:s.rejim === 'kvadrat' ? 'x = ' + son(xs) + ' · f(x) = ' + son(f(xs)) : '(' + son(xs) + '; ' + son(ys) + ')'}; }
  function yarim(L, rang){
    const k = E.korinish(), x0 = k[0] - 1, x1 = k[2] + 1, yuq = katta(L.belgi);
    const Y = yuq ? k[3] + 50 : k[1] - 50;
    return [[x0, L.k * x0 + L.b], [x1, L.k * x1 + L.b], [x1, Y], [x0, Y]];
  }
  function yolChiz(pts){ cx.beginPath(); pts.forEach((p, i)=>{ const X = E.X(p[0]), Yy = E.Y(p[1]); if(i) cx.lineTo(X, Yy); else cx.moveTo(X, Yy); }); cx.closePath(); }
  function chiz(E){
    E.tor();
    if(s.rejim === 'kvadrat'){
      const y = yech(), OX = E.Y(0), k = E.korinish();
      /* yechim oraliqlari ustidagi yengil yo‘lak */
      y.oraliq.forEach(i=>{ const l = Math.max(i.l, k[0] - 1), r = Math.min(i.r, k[2] + 1); if(r - l < 1e-9){ E.chiziqS(E.X(l), 0, E.X(l), E.H, 'rgba(78,225,160,.18)', 6); return; } cx.fillStyle = 'rgba(78,225,160,.07)'; cx.fillRect(E.X(l), 0, E.X(r) - E.X(l), E.H); });
      E.egri(f, 'rgba(169,150,255,.45)', 2.6);
      const ok = x=>qanoat(f(x), s.belgi);
      E.egri(x=>ok(x) ? f(x) : NaN, R.gr, 4, {soya:'rgba(78,225,160,.8)'});
      /* Ox dagi javob kesmalari */
      y.oraliq.forEach(i=>{
        const l = Math.max(i.l, k[0] - 1), r = Math.min(i.r, k[2] + 1);
        E.chiziqS(E.X(l), OX, E.X(r), OX, R.gr, 7, {soya:'rgba(78,225,160,.9)', cap:'butt'});
        if(i.l > -Infinity) E.nuqtaS(E.X(i.l), OX, R.gr, 6.5, {bosh:!i.lY, nur:false, chet:R.gr, ichi:i.lY ? R.gr : '#0b0f1f', q:2.4});
        if(i.r < Infinity && i.r !== i.l) E.nuqtaS(E.X(i.r), OX, R.gr, 6.5, {bosh:!i.rY, nur:false, chet:R.gr, ichi:i.rY ? R.gr : '#0b0f1f', q:2.4});
        if(i.l === -Infinity) E.strelkaS(E.X(Math.min(r, k[0] + 2)), OX, 4, OX, R.gr, 5, {uch:13});
        if(i.r === Infinity) E.strelkaS(E.X(Math.max(l, k[2] - 2)), OX, E.W - 4, OX, R.gr, 5, {uch:13});
      });
      y.ildiz.forEach(r=>{ if(!y.oraliq.some(i=>(i.l === r && i.lY) || (i.r === r && i.rY))) E.nuqtaS(E.X(r), OX, '#ffffff', 6.5, {bosh:true, nur:false, chet:'#fff', q:2.2}); E.teg(E.X(r), OX, sn(r), '#dfe3ff', {pos:'p', off:14}); });
      const xv = -s.b / (2 * s.a); E.nuqta(xv, f(xv), R.am, 5);
      E.teg(E.q().l + 4, E.q().t + 2, fT() + ' ' + s.belgi + ' 0  →  ' + javob(y), R.gr, {pos:'o', off:0, shrift:'700 13px "JetBrains Mono", monospace'});
    } else {
      const ikki = s.rejim === 'sistema';
      const r1 = 'rgba(255,193,77,.13)', r2 = 'rgba(92,200,255,.13)';
      cx.save(); yolChiz(yarim(s.l1)); cx.fillStyle = ikki ? r1 : 'rgba(78,225,160,.16)'; cx.fill(); cx.restore();
      if(ikki){
        cx.save(); yolChiz(yarim(s.l2)); cx.fillStyle = r2; cx.fill(); cx.restore();
        cx.save(); yolChiz(yarim(s.l1)); cx.clip(); yolChiz(yarim(s.l2)); cx.fillStyle = 'rgba(78,225,160,.34)'; cx.fill();
        /* shtrix */
        cx.clip(); cx.strokeStyle = 'rgba(78,225,160,.35)'; cx.lineWidth = 1.2; for(let X = -E.H; X < E.W; X += 14){ cx.beginPath(); cx.moveTo(X, E.H); cx.lineTo(X + E.H, 0); cx.stroke(); }
        cx.restore();
      }
      const chegara = (L, rang)=>E.togri(0, L.b, 1, L.k, rang, 3, {soya:rang, uzuq:qatiy(L.belgi) ? [10, 8] : null});
      chegara(s.l1, ikki ? R.am : R.gr);
      if(ikki) chegara(s.l2, R.cy);
      if(ikki && s.l1.k !== s.l2.k){ const x = (s.l2.b - s.l1.b) / (s.l1.k - s.l2.k); E.nuqta(x, s.l1.k * x + s.l1.b, '#ffffff', 5); }
      const k = E.korinish(), lx = k[2] - (k[2] - k[0]) * .22;
      E.teg(E.X(lx), E.Y(s.l1.k * lx + s.l1.b), lT(s.l1), ikki ? R.am : R.gr, {pos:'t', off:12});
      if(ikki){ const lx2 = k[0] + (k[2] - k[0]) * .2; E.teg(E.X(lx2), E.Y(s.l2.k * lx2 + s.l2.b), lT(s.l2), R.cy, {pos:'t', off:12}); }
    }
    if(belgiNuqta){
      const dt = (performance.now() - belgiNuqta.t) / 1000;
      if(dt < 2.6){ const X = E.X(belgiNuqta.x), Y = E.Y(belgiNuqta.y); E.nuqtaS(X, Y, belgiNuqta.ok ? R.gr : R.qi, 7); E.matn(X, Y - 20, belgiNuqta.ok ? '✓' : '✗', belgiNuqta.ok ? R.gr : R.qi, '800 18px Inter, sans-serif'); E.iflos = true; }
      else belgiNuqta = null;
    }
  }
  yorliq('Matematika · tengsizliklar grafigi');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   4. BIRLIK AYLANA VA TRIGONOMETRIK FUNKSIYALAR (2D)
   ===================================================================== */
const SIN_A = {0:'0', 30:'1/2', 45:'√2/2', 60:'√3/2', 90:'1', 120:'√3/2', 135:'√2/2', 150:'1/2', 180:'0', 210:'−1/2', 225:'−√2/2', 240:'−√3/2', 270:'−1', 300:'−√3/2', 315:'−√2/2', 330:'−1/2'};
const COS_A = {0:'1', 30:'√3/2', 45:'√2/2', 60:'1/2', 90:'0', 120:'−1/2', 135:'−√2/2', 150:'−√3/2', 180:'−1', 210:'−√3/2', 225:'−√2/2', 240:'−1/2', 270:'0', 300:'1/2', 315:'√2/2', 330:'√3/2'};
const TG_A = {0:'0', 30:'√3/3', 45:'1', 60:'√3', 90:'—', 120:'−√3', 135:'−1', 150:'−√3/3', 180:'0', 210:'√3/3', 225:'1', 240:'√3', 270:'—', 300:'−√3', 315:'−1', 330:'−√3/3'};
function radT(g){ g = ((g % 360) + 360) % 360; if(g === 0) return '0'; const e = ekub(g, 180), s = g / e, m = 180 / e; return (s === 1 ? '' : s) + 'π' + (m === 1 ? '' : '/' + m); }
function chorak(g){ g = ((g % 360) + 360) % 360; if(g % 90 === 0) return 0; return Math.floor(g / 90) + 1; }
reg('trig', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const Rr = 2.2, W0 = 3.4, SX = .9; /* aylana radiusi, to‘lqin boshi, 1 radian = 0,9 birlik */
  const s = {al:30, sin:true, cos:false, tg:false, ijro:false};
  const E = tekis(sahna, c, {
    olam:()=>[-2.9, -2.75, W0 + 2 * PI * SX + .5, 2.75],
    kadr(dt){ if(s.ijro){ s.al = (s.al + dt * 45) % 360; if(Math.floor(s.al) !== Math.floor(s.al - dt * 45)) yoz(); return true; } return false; },
    chiz, bosish, ustida, tutqich,
    holat(h){ if(h.burchak !== undefined) s.al = ((+h.burchak % 360) + 360) % 360; ['sin', 'cos', 'tg'].forEach(k=>{ if(h[k] !== undefined) s[k] = !!h[k]; }); s.ijro = !!h.ijro; tagChiz(); yoz(); },
    qiymat:()=>({burchak:s.al, sin:Math.sin(s.al * RAD), cos:Math.cos(s.al * RAD)})
  });
  const cx = E.cx;
  function yoz(){
    const g = Math.round(s.al), si = Math.sin(g * RAD), co = Math.cos(g * RAD), aniq = SIN_A[g % 360] !== undefined;
    const tgv = Math.abs(co) < 1e-9 ? null : si / co, ch = chorak(g);
    const q = '<span>Radian</span><b>' + (g % 15 === 0 ? radT(g) + ' ≈ ' : '') + son(g * RAD, 3) + '</b>' +
      '<span>sin α</span><b class="y">' + (aniq ? SIN_A[g % 360] + (SIN_A[g % 360].includes('√') ? ' ≈ ' + son(si, 3) : '') : son(si, 3)) + '</b>' +
      '<span>cos α</span><b class="k">' + (aniq ? COS_A[g % 360] + (COS_A[g % 360].includes('√') ? ' ≈ ' + son(co, 3) : '') : son(co, 3)) + '</b>' +
      '<span>tg α</span><b class="p">' + (tgv === null ? 'mavjud emas' : aniq ? TG_A[g % 360] + (TG_A[g % 360].includes('√') ? ' ≈ ' + son(tgv, 3) : '') : son(tgv, 3)) + '</b>' +
      '<span>Chorak</span><b>' + (ch ? ['I', 'II', 'III', 'IV'][ch - 1] + ' (sin ' + (si > 0 ? '+' : '−') + ', cos ' + (co > 0 ? '+' : '−') + ')' : 'o‘q ustida') + '</b>' +
      '<span>sin²α + cos²α</span><b class="s">' + son(si * si + co * co, 3) + '</b>';
    E.karta.yoz('Birlik aylana', 'α = ' + g + '°', '<div class="q">' + q + '</div><div class="iz">P nuqtaning koordinatalari: <b>x = cos α, y = sin α</b>. Nuqtani aylana bo‘ylab suring yoki aylanani bosing.</div>');
    izoh.innerHTML = '<b>α = ' + g + '° (' + radT(g) + ' rad): sin α = ' + (aniq ? SIN_A[g % 360] : son(si, 3)) + ', cos α = ' + (aniq ? COS_A[g % 360] : son(co, 3)) + '.</b> Aylanadagi P nuqtaning balandligi sinus to‘lqinining shu burchakdagi balandligiga teng — sariq uzuq chiziq ularni bog‘laydi.';
    E.iflos = true;
  }
  function yubor(ext){ const g = Math.round(s.al); hodisa('mg-trig', Object.assign({burchak:g, chorak:chorak(g), sin:+Math.sin(g * RAD).toFixed(6), cos:+Math.cos(g * RAD).toFixed(6)}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = SL('al', 'α', 0, 360, 1, Math.round(s.al), v=>v + '°') + TG('data-ij', s.ijro ? '❚❚ To‘xtatish' : '▶ Aylantirish', s.ijro) + '<span class="tag-ajr"></span>' +
      TG('data-g="sin"', 'sin', s.sin) + TG('data-g="cos"', 'cos', s.cos) + TG('data-g="tg"', 'tg', s.tg) + '<span class="tag-ajr"></span>' +
      [30, 45, 60, 90, 120, 180, 270].map(g=>TG('data-a="' + g + '"', g + '°', false)).join('');
    slayderBog(tag, {al:v=>v + '°'}, (p, v)=>{ s.al = v; s.ijro = false; const b = tag.querySelector('[data-ij]'); if(b){ b.classList.remove('faol'); b.textContent = '▶ Aylantirish'; } yoz(); yubor(); });
    tag.querySelector('[data-ij]').onclick = ()=>{ s.ijro = !s.ijro; if(!s.ijro) yubor(); tagChiz(); };
    tag.querySelectorAll('[data-g]').forEach(b=>b.onclick = ()=>{ s[b.dataset.g] = !s[b.dataset.g]; tagChiz(); E.iflos = true; });
    tag.querySelectorAll('[data-a]').forEach(b=>b.onclick = ()=>{ s.al = +b.dataset.a; s.ijro = false; tagChiz(); yoz(); yubor(); });
  }
  const sliderYangi = ()=>{ const sl = tag.querySelector('[data-p="al"]'); if(sl){ sl.value = Math.round(s.al); sl.nextElementSibling.textContent = Math.round(s.al) + '°'; } };
  function tutqich(X, Y){
    const px = E.X(Rr * Math.cos(s.al * RAD)), py = E.Y(Rr * Math.sin(s.al * RAD));
    if(Math.hypot(X - px, Y - py) < 16) return {sur:(x, y)=>{ s.ijro = false; let g = Math.atan2(y, x) / RAD; g = (yax(g, 5) + 360) % 360; s.al = g; sliderYangi(); yoz(); }, qoy:()=>{ tagChiz(); yubor(); }};
    return null;
  }
  function nomla(x, y){
    const r = Math.hypot(x, y);
    if(r > Rr * .25 && r < Rr * 1.25) return {tur:'aylana', g:(yax(Math.atan2(y, x) / RAD, 15) + 360) % 360};
    if(x > W0 - .1 && x < W0 + 2 * PI * SX + .1 && Math.abs(y) < Rr * 1.2) return {tur:'tolqin', g:cl(yax((x - W0) / SX / RAD, 15), 0, 360)};
    return null;
  }
  function bosish(x, y){
    const n = nomla(x, y); if(!n) return;
    s.ijro = false; s.al = n.g % 360; tagChiz(); yoz();
    const g = Math.round(s.al);
    yubor({bos:true, joy:n.tur});
    if(chorak(g)) detal('mg_trig', 'chorak' + chorak(g));
  }
  function ustida(x, y){ const n = nomla(x, y); if(!n) return null; const g = n.g % 360; return {bos:true, matn:'α = ' + g + '° · sin = ' + (SIN_A[g] || son(Math.sin(g * RAD), 3)) + ' · cos = ' + (COS_A[g] || son(Math.cos(g * RAD), 3))}; }
  function chiz(E){
    const g = s.al, a = g * RAD, px = Rr * Math.cos(a), py = Rr * Math.sin(a), O = [E.X(0), E.Y(0)], rp = Rr * E.b;
    /* o‘qlar */
    E.chiziq(-2.75, 0, 2.75, 0, 'rgba(220,226,255,.45)', 1.4); E.chiziq(0, -2.65, 0, 2.65, 'rgba(220,226,255,.45)', 1.4);
    E.matn(E.X(2.75) + 2, O[1] - 12, 'x', '#cfd4ee', 'italic 600 13px Inter'); E.matn(O[0] + 12, E.Y(2.6), 'y', '#cfd4ee', 'italic 600 13px Inter');
    /* chorak nomlari */
    [['I', 1, 1], ['II', -1, 1], ['III', -1, -1], ['IV', 1, -1]].forEach(q=>E.matn(E.X(q[1] * Rr * .62), E.Y(q[2] * Rr * .62), q[0], 'rgba(185,168,255,.28)', '800 22px "Plus Jakarta Sans", Inter, sans-serif'));
    /* aylana */
    cx.save(); cx.strokeStyle = 'rgba(169,150,255,.85)'; cx.lineWidth = 2.6; cx.shadowColor = 'rgba(139,116,255,.8)'; cx.shadowBlur = 16; cx.beginPath(); cx.arc(O[0], O[1], rp, 0, PI * 2); cx.stroke(); cx.restore();
    for(let d = 0; d < 360; d += 15){ const kat = d % 45 === 0 || d % 30 === 0; const r1 = rp - (kat ? 7 : 4), r2 = rp + (kat ? 7 : 4); E.chiziqS(O[0] + Math.cos(d * RAD) * r1, O[1] - Math.sin(d * RAD) * r1, O[0] + Math.cos(d * RAD) * r2, O[1] - Math.sin(d * RAD) * r2, kat ? 'rgba(220,226,255,.6)' : 'rgba(220,226,255,.25)', 1.3); }
    [[1, 0, '1'], [-1, 0, '−1'], [0, 1, '1'], [0, -1, '−1']].forEach(p=>E.matn(E.X(p[0] * Rr) + (p[0] ? p[0] * 16 : 12), E.Y(p[1] * Rr) - (p[1] ? p[1] * 12 : 10), p[2], 'rgba(220,226,255,.75)', '600 11px "JetBrains Mono", monospace'));
    /* burchak yoyi */
    E.yoy(0, 0, Math.min(46, rp * .32), 0, a, R.vi, {tola:'rgba(169,150,255,.18)', q:2});
    E.matn(O[0] + Math.cos(a / 2) * Math.min(64, rp * .45), O[1] - Math.sin(a / 2) * Math.min(64, rp * .45), 'α', '#d9d0ff', 'italic 700 14px Inter');
    /* tangens */
    if(s.tg && Math.abs(Math.cos(a)) > .05){
      const t = Math.tan(a); E.chiziq(Rr, -2.65, Rr, 2.65, 'rgba(255,107,154,.35)', 1.4, {uzuq:[4, 5]});
      if(Math.abs(t * Rr) < 2.65){ E.chiziq(0, 0, Rr, t * Rr, 'rgba(255,107,154,.55)', 1.6, {uzuq:[5, 5]}); E.chiziq(Rr, 0, Rr, t * Rr, R.pk, 3.4, {soya:R.pk}); E.nuqta(Rr, t * Rr, R.pk, 5); E.teg(E.X(Rr), E.Y(t * Rr), 'tg α = ' + son(t, 2), R.pk, {pos:'o', off:10}); }
    }
    /* proyeksiyalar */
    if(s.cos) E.chiziq(0, 0, px, 0, R.cy, 4.2, {soya:R.cy});
    if(s.sin) E.chiziq(px, 0, px, py, R.am, 4.2, {soya:R.am});
    if(!s.cos) E.chiziq(0, 0, px, 0, 'rgba(92,200,255,.35)', 1.5, {uzuq:[4, 4]});
    E.chiziq(0, 0, px, py, '#e9e4ff', 2.6);
    if(s.cos) E.teg((O[0] + E.X(px)) / 2, O[1], 'cos α', R.cy, {pos:py >= 0 ? 'p' : 't', off:8});
    if(s.sin) E.teg(E.X(px), (O[1] + E.Y(py)) / 2, 'sin α', R.am, {pos:px >= 0 ? 'o' : 'c', off:8});
    /* to‘lqin */
    const X0 = E.X(W0), X1 = E.X(W0 + 2 * PI * SX);
    E.chiziqS(X0, O[1], X1 + 14, O[1], 'rgba(220,226,255,.45)', 1.4); E.chiziqS(X0, E.Y(2.6), X0, E.Y(-2.6), 'rgba(220,226,255,.45)', 1.4);
    [[.5, 'π/2'], [1, 'π'], [1.5, '3π/2'], [2, '2π']].forEach(p=>{ const X = E.X(W0 + p[0] * PI * SX); E.chiziqS(X, O[1] - 5, X, O[1] + 5, 'rgba(220,226,255,.6)', 1.3); E.matn(X, O[1] + 17, p[1], 'rgba(220,226,255,.7)', '600 11px "JetBrains Mono", monospace'); E.chiziqS(X, E.Y(Rr), X, E.Y(-Rr), 'rgba(255,255,255,.05)', 1); });
    [[Rr, '1'], [-Rr, '−1']].forEach(p=>{ E.chiziqS(X0, E.Y(p[0]), X1, E.Y(p[0]), 'rgba(255,255,255,.06)', 1, {uzuq:[3, 5]}); E.matn(X0 - 12, E.Y(p[0]), p[1], 'rgba(220,226,255,.7)', '600 11px "JetBrains Mono", monospace'); });
    const tol = (fn, rang, qalin, gacha, soya)=>{ cx.save(); cx.strokeStyle = rang; cx.lineWidth = qalin; if(soya){ cx.shadowColor = rang; cx.shadowBlur = 14; } cx.beginPath(); for(let d = 0; d <= gacha + .01; d += 2){ const X = E.X(W0 + d * RAD * SX), Y = E.Y(Rr * fn(d * RAD)); if(d) cx.lineTo(X, Y); else cx.moveTo(X, Y); } cx.stroke(); cx.restore(); };
    if(s.sin){ tol(Math.sin, 'rgba(255,193,77,.25)', 2, 360); tol(Math.sin, R.am, 3.6, g, true); }
    if(s.cos){ tol(Math.cos, 'rgba(92,200,255,.25)', 2, 360); tol(Math.cos, R.cy, 3.6, g, true); }
    const qx = W0 + a * SX;
    if(s.sin){ E.chiziq(px, py, qx, py, 'rgba(255,193,77,.6)', 1.6, {uzuq:[6, 5]}); E.nuqta(qx, py, R.am, 6.5); E.chiziq(qx, 0, qx, py, 'rgba(255,193,77,.45)', 1.4, {uzuq:[3, 4]}); }
    if(s.cos){ E.nuqta(qx, Rr * Math.cos(a), R.cy, 6); }
    E.teg(E.X(W0 + PI * SX), E.Y(2.55), s.sin && s.cos ? 'y = sin x  va  y = cos x' : s.cos ? 'y = cos x' : 'y = sin x', s.cos && !s.sin ? R.cy : R.am, {pos:'m', off:0});
    E.nuqta(px, py, '#ffffff', 8.5);
    E.teg(E.X(px), E.Y(py), 'P(' + son(Math.cos(a), 2) + '; ' + son(Math.sin(a), 2) + ')', '#e9e4ff', {pos:px >= 0 ? 'o' : 'c', off:12});
    E.nuqta(0, 0, '#cfd4ee', 3.5, {nur:false});
  }
  yorliq('Matematika · birlik aylana va sinusoida');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   5. HOSILA VA URINMA (2D)
   ===================================================================== */
const FUNK = {
  x2:{t:'y = x²', d:'y′ = 2x', f:x=>x * x, df:x=>2 * x, st:[0], olam:[-4.5, -2.5, 4.5, 8]},
  kub:{t:'y = x³ − 3x', d:'y′ = 3x² − 3', f:x=>x * x * x - 3 * x, df:x=>3 * x * x - 3, st:[-1, 1], olam:[-4, -5, 4, 5]},
  sin:{t:'y = sin x', d:'y′ = cos x', f:Math.sin, df:Math.cos, st:null, olam:[-5, -2.6, 5, 2.6]},
  exp:{t:'y = eˣ', d:'y′ = eˣ', f:Math.exp, df:Math.exp, st:[], olam:[-4, -1.5, 3, 8]}
};
reg('hosila', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {f:'x2', x0:1, h:1.5, urinma:true, hosila:false, anim:null};
  const F = ()=>FUNK[s.f];
  const E = tekis(sahna, c, {
    pan:true,
    olam:()=>F().olam,
    kadr(dt){ if(s.anim){ s.anim.t += dt; const u = Math.min(1, s.anim.t / 3.2); s.h = Math.max(.001, s.anim.h0 * Math.pow(.001 / s.anim.h0, u)); if(u >= 1){ s.anim = null; s.h = .001; tagChiz(); yubor(); } yoz(); return true; } return false; },
    chiz, bosish, ustida, tutqich,
    holat(h){ if(h.f && FUNK[h.f]) s.f = h.f; if(h.x0 !== undefined) s.x0 = +h.x0; if(h.h !== undefined) s.h = +h.h; if(h.urinma !== undefined) s.urinma = !!h.urinma; if(h.hosila !== undefined) s.hosila = !!h.hosila; s.anim = null; E.panX = E.panY = 0; tagChiz(); yoz(); },
    qiymat:()=>mal()
  });
  const cx = E.cx;
  function mal(){ const Fn = F(), y0 = Fn.f(s.x0), y1 = Fn.f(s.x0 + s.h); return {f:s.f, x0:s.x0, h:s.h, y0, dy:y1 - y0, kesuvchi:(y1 - y0) / s.h, urinma:Fn.df(s.x0)}; }
  const chizT = (k, x0, y0)=>{ const b = y0 - k * x0; const kk = Math.abs(k) < 5e-4 ? 0 : k, bb = Math.abs(b) < 5e-4 ? 0 : b; return 'y = ' + (kk === 0 ? son(bb) : son(kk) + 'x' + (bb === 0 ? '' : (bb < 0 ? ' − ' : ' + ') + son(Math.abs(bb)))); };
  function yoz(){
    const m = mal(), Fn = F();
    const q = '<span>x₀</span><b>' + son(s.x0) + '</b><span>f(x₀)</span><b>' + son(m.y0, 3) + '</b><span>Δx = h</span><b class="y">' + son(s.h, 3) + '</b><span>Δy</span><b class="y">' + son(m.dy, 3) + '</b>' +
      '<span>Kesuvchi Δy/Δx</span><b class="y">' + son(m.kesuvchi, 3) + '</b><span>Urinma f′(x₀)</span><b class="s">' + son(m.urinma, 3) + '</b><span>Urinma</span><b class="s">' + chizT(m.urinma, s.x0, m.y0) + '</b>';
    const jad = [1, .5, .1, .01].map(h=>'<tr' + (Math.abs(s.h - h) < 1e-9 ? ' class="joriy"' : '') + '><td>' + son(h) + '</td><td>' + son((Fn.f(s.x0 + h) - Fn.f(s.x0)) / h, 4) + '</td></tr>').join('');
    E.karta.yoz('Hosila — urinma qiyaligi', Fn.t + ' <small>· ' + Fn.d + '</small>', '<div class="q">' + q + '</div><table><tr><th>h</th><th>Δy/Δx</th></tr>' + jad + '<tr><td>h → 0</td><td class="s">' + son(m.urinma, 4) + '</td></tr></table><div class="iz">h kichraygan sari kesuvchi (sariq) urinmaga (yashil) yaqinlashadi: <b>f′(x₀) = lim Δy/Δx</b>.</div>');
    izoh.innerHTML = '<b>' + Fn.t + ', x₀ = ' + son(s.x0) + ': f′(x₀) = ' + son(m.urinma, 3) + '.</b> Kesuvchi qiyaligi h = ' + son(s.h, 3) + ' da ' + son(m.kesuvchi, 3) + '. ' + (Math.abs(m.urinma) < 1e-9 ? 'f′(x₀) = 0 — urinma gorizontal (statsionar nuqta).' : m.urinma > 0 ? 'f′(x₀) > 0 — funksiya shu nuqtada o‘sadi.' : 'f′(x₀) < 0 — funksiya shu nuqtada kamayadi.');
    E.iflos = true;
  }
  function yubor(ext){ const m = mal(); hodisa('mg-hosila', Object.assign({f:m.f, x0:m.x0, h:+m.h.toFixed(4), kesuvchi:+m.kesuvchi.toFixed(6), urinma:+m.urinma.toFixed(6)}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = Object.keys(FUNK).map(k=>TG('data-f="' + k + '"', FUNK[k].t, s.f === k)).join('') + '<span class="tag-ajr"></span>' +
      SL('x0', 'x₀', -3, 3, .1, s.x0) + SL('h', 'h', .01, 2.5, .01, +s.h.toFixed(2), v=>son(v)) +
      TG('data-a', '▶ h → 0', !!s.anim) + TG('data-u', 'Urinma', s.urinma) + TG('data-d', 'f′(x) grafigi', s.hosila);
    tag.querySelectorAll('[data-f]').forEach(b=>b.onclick = ()=>{ s.f = b.dataset.f; s.anim = null; if(s.f === 'exp' && s.x0 > 2) s.x0 = 1; E.panX = E.panY = 0; tagChiz(); yoz(); yubor(); });
    slayderBog(tag, {}, (p, v)=>{ s.anim = null; if(p === 'x0') s.x0 = +v.toFixed(1); else s.h = v; yoz(); yubor(); });
    tag.querySelector('[data-a]').onclick = ()=>{ s.anim = {t:0, h0:Math.max(.5, Math.min(2.5, s.h < .05 ? 2 : s.h))}; tagChiz(); };
    tag.querySelector('[data-u]').onclick = ()=>{ s.urinma = !s.urinma; tagChiz(); E.iflos = true; };
    tag.querySelector('[data-d]').onclick = ()=>{ s.hosila = !s.hosila; tagChiz(); E.iflos = true; };
  }
  const slYangi = ()=>{ ['x0', 'h'].forEach(p=>{ const sl = tag.querySelector('[data-p="' + p + '"]'); if(sl){ sl.value = p === 'x0' ? s.x0 : s.h; sl.nextElementSibling.textContent = son(p === 'x0' ? s.x0 : s.h); } }); };
  function tutqich(X, Y){
    const Fn = F();
    if(Math.hypot(X - E.X(s.x0), Y - E.Y(Fn.f(s.x0))) < 15) return {sur:x=>{ s.anim = null; s.x0 = cl(yax(x, .1), -3, 3); slYangi(); yoz(); }, qoy:()=>{ tagChiz(); yubor(); }};
    if(Math.hypot(X - E.X(s.x0 + s.h), Y - E.Y(Fn.f(s.x0 + s.h))) < 15) return {sur:x=>{ s.anim = null; s.h = cl(yax(x - s.x0, .01), .01, 2.5); slYangi(); yoz(); }, qoy:()=>{ tagChiz(); yubor(); }};
    return null;
  }
  function statsionar(x){ const st = F().st; if(st === null) return Math.abs(Math.cos(x)) < .3; return st.some(v=>Math.abs(v - x) < .3); }
  function bosish(x, y, X, Y){
    const Fn = F(), yf = Fn.f(x), yaqin = Math.abs(E.Y(yf) - Y) < 26;
    let nom = 'boshqa';
    if(yaqin){ nom = statsionar(x) ? 'statsionar' : Fn.df(x) > 0 ? 'osish' : 'kamayish'; s.anim = null; s.x0 = cl(yax(x, .1), -3, 3); if(statsionar(x) && Fn.st && Fn.st.length){ const t = Fn.st.find(v=>Math.abs(v - x) < .3); if(t !== undefined) s.x0 = t; } else if(statsionar(x) && Fn.st === null){ s.x0 = yax(x, .1); } tagChiz(); yoz(); }
    yubor({bos:true, nom, x:yax(x, .1)});
    if(nom === 'statsionar') detal('mg_hosila', 'statsionar');
  }
  function ustida(x, y, X, Y){ const Fn = F(), yf = Fn.f(x); if(Math.abs(E.Y(yf) - Y) < 26) return {bos:true, matn:'x = ' + son(x, 2) + ' · f′(x) = ' + son(Fn.df(x), 2) + (statsionar(x) ? ' · statsionar' : '')}; return null; }
  function chiz(E){
    E.tor();
    const Fn = F(), m = mal(), x0 = s.x0, y0 = m.y0, x1 = x0 + s.h, y1 = Fn.f(x1);
    if(s.hosila){ E.egri(Fn.df, 'rgba(92,200,255,.8)', 2.4, {uzuq:[8, 6]}); E.nuqta(x0, m.urinma, R.cy, 5); E.chiziq(x0, y0, x0, m.urinma, 'rgba(92,200,255,.35)', 1.2, {uzuq:[3, 4]}); const k = E.korinish(); E.teg(E.X(k[0] + (k[2] - k[0]) * .08), E.Y(Fn.df(k[0] + (k[2] - k[0]) * .08)), Fn.d, R.cy, {pos:'o', off:8}); }
    const gr = cx.createLinearGradient(0, 0, E.W, 0); gr.addColorStop(0, '#7b63ff'); gr.addColorStop(.5, '#c4b6ff'); gr.addColorStop(1, '#7b63ff');
    E.egri(Fn.f, gr, 3.6, {soya:'rgba(139,116,255,.85)'});
    /* kesuvchi */
    E.togri(x0, y0, 1, m.kesuvchi, 'rgba(255,193,77,.85)', 2.4, {soya:'rgba(255,193,77,.6)'});
    E.chiziq(x0, y0, x1, y0, 'rgba(255,193,77,.7)', 1.8, {uzuq:[5, 4]}); E.chiziq(x1, y0, x1, y1, 'rgba(255,193,77,.7)', 1.8, {uzuq:[5, 4]});
    if(s.h > .25){ E.teg((E.X(x0) + E.X(x1)) / 2, E.Y(y0), 'Δx = ' + son(s.h, 2), R.am, {pos:y1 >= y0 ? 'p' : 't', off:6}); E.teg(E.X(x1), (E.Y(y0) + E.Y(y1)) / 2, 'Δy = ' + son(y1 - y0, 2), R.am, {pos:'o', off:8}); }
    if(s.urinma) E.togri(x0, y0, 1, m.urinma, R.gr, 3, {soya:'rgba(78,225,160,.8)'});
    /* statsionar nuqtalar */
    (Fn.st || []).forEach(v=>E.nuqta(v, Fn.f(v), 'rgba(255,255,255,.7)', 3.5, {nur:false}));
    E.nuqta(x1, y1, R.am, 7);
    E.teg(E.X(x1), E.Y(y1), 'B', R.am, {pos:'o', off:10});
    E.nuqta(x0, y0, '#ffffff', 8.5);
    E.teg(E.X(x0), E.Y(y0), 'A(' + son(x0) + '; ' + son(y0, 2) + ')', '#e9e4ff', {pos:'c', off:12});
    const k = E.korinish();
    const q0 = E.q();
    E.teg(q0.l + 4, q0.t + 2, 'kesuvchi: k = ' + son(m.kesuvchi, 3), R.am, {pos:'o', off:0});
    if(s.urinma) E.teg(q0.l + 4, q0.t + 28, 'urinma: f′(x₀) = ' + son(m.urinma, 3), R.gr, {pos:'o', off:0});
    void k;
  }
  yorliq('Matematika · hosila va urinma');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   6. PARALLEL TO‘G‘RI CHIZIQLAR VA KESUVCHI (2D)
   ===================================================================== */
const JUFT = {
  vertikal:{nom:'Vertikal burchaklar', j:[[1, 4], [2, 3], [5, 8], [6, 7]], q:'teng'},
  qoshni:{nom:'Qo‘shni burchaklar', j:[[1, 2], [3, 4], [5, 6], [7, 8], [1, 3], [2, 4], [5, 7], [6, 8]], q:'yig‘indisi 180°'},
  mos:{nom:'Mos burchaklar', j:[[1, 5], [2, 6], [3, 7], [4, 8]], q:'teng (a ∥ b)'},
  ichki_almash:{nom:'Ichki almashinuvchi burchaklar', j:[[3, 6], [4, 5]], q:'teng (a ∥ b)'},
  tashqi_almash:{nom:'Tashqi almashinuvchi burchaklar', j:[[1, 8], [2, 7]], q:'teng (a ∥ b)'},
  ichki_bir:{nom:'Ichki bir tomonli burchaklar', j:[[3, 5], [4, 6]], q:'yig‘indisi 180° (a ∥ b)'}
};
reg('parallel', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {phi:60, beta:0, tanla:null, burchak:null, qiymat:true};
  const YA = 1.7, YB = -1.7;
  const E = tekis(sahna, c, {
    olam:()=>[-6.2, -3.9, 6.2, 3.9],
    chiz, bosish, ustida, tutqich,
    holat(h){ if(h.phi !== undefined) s.phi = cl(+h.phi, 25, 155); if(h.beta !== undefined) s.beta = +h.beta; if(h.tanla !== undefined) s.tanla = h.tanla; if(h.burchak !== undefined) s.burchak = h.burchak; if(h.qiymat !== undefined) s.qiymat = !!h.qiymat; tagChiz(); yoz(); },
    qiymat:()=>({phi:s.phi, beta:s.beta, qiymatlar:qiymatlar()})
  });
  const cx = E.cx;
  /* kesishish nuqtalari: kesuvchi (0,0) dan φ yo‘nalishda; a — y = YA, b — (0, YB) dan β burchak */
  function kes(){
    const d = [Math.cos(s.phi * RAD), Math.sin(s.phi * RAD)];
    const A = [YA / d[1] * d[0], YA];
    const bd = [Math.cos(s.beta * RAD), Math.sin(s.beta * RAD)];
    /* t·d = (0, YB) + u·bd */
    const det = d[0] * (-bd[1]) - d[1] * (-bd[0]);
    const t = (0 * (-bd[1]) - YB * (-bd[0])) / det;
    const B = [t * d[0], t * d[1]];
    return {A, B, d, bd};
  }
  function qiymatlar(){ const a = s.phi, b = s.phi - s.beta; return [0, 180 - a, a, a, 180 - a, 180 - b, b, b, 180 - b]; }
  /* burchak raqamiga mos sektor: [boshi, oxiri] gradusda (matematik) */
  function sektor(n){
    const top = n <= 4, beta = top ? 0 : s.beta, p = s.phi, i = (n - 1) % 4;
    return [[p, beta + 180], [beta, p], [beta + 180, p + 180], [p + 180, beta + 360]][i];
  }
  function yoz(){
    const q = qiymatlar(), par = s.beta === 0;
    let ichi = '<div class="q"><span>∠2 = φ</span><b class="y">' + q[2] + '°</b><span>∠1 = 180° − φ</span><b class="k">' + q[1] + '°</b><span>a va b</span><b class="' + (par ? 's' : 'p') + '">' + (par ? 'parallel' : 'parallel emas (' + Math.abs(s.beta) + '° og‘gan)') + '</b></div>';
    if(s.tanla && JUFT[s.tanla]) ichi += '<div class="iz"><b>' + JUFT[s.tanla].nom + ':</b> ' + JUFT[s.tanla].j.map(j=>'∠' + j[0] + ' va ∠' + j[1] + ' (' + q[j[0]] + '° / ' + q[j[1]] + '°)').join(', ') + ' — ' + JUFT[s.tanla].q + '.' + (!par && ['mos', 'ichki_almash', 'tashqi_almash', 'ichki_bir'].includes(s.tanla) ? ' <b>Chiziqlar parallel emas — tenglik buziladi!</b>' : '') + '</div>';
    else if(s.burchak) ichi += '<div class="iz">' + munosabat(s.burchak) + '</div>';
    else ichi += '<div class="iz">Burchakni bosing — u boshqa burchaklar bilan qanday bog‘langani ko‘rinadi. Kesuvchining yuqori uchidagi nuqtani sudrab, uni aylantiring.</div>';
    E.karta.yoz('Parallel chiziqlar va kesuvchi', 'φ = ' + s.phi + '°', ichi);
    izoh.innerHTML = s.tanla && JUFT[s.tanla] ? '<b>' + JUFT[s.tanla].nom + '</b> — ' + JUFT[s.tanla].q + '. ' + (par ? 'Kesuvchini aylantiring: burchaklar o‘zgaradi, lekin munosabat saqlanadi.' : 'b chiziq og‘dirilgan — endi ∠2 = ' + q[2] + '°, ∠6 = ' + q[6] + '°: mos burchaklar teng emas.') : s.burchak ? munosabat(s.burchak).replace(/<[^>]+>/g, '') : '<b>a ∥ b, c — kesuvchi.</b> Kesishish nuqtalarida 8 ta burchak hosil bo‘ladi; ularning faqat ikki xil qiymati bor: φ = ' + q[2] + '° va 180° − φ = ' + q[1] + '°.';
    E.iflos = true;
  }
  function munosabat(n){
    const q = qiymatlar(), r = [];
    Object.keys(JUFT).forEach(k=>JUFT[k].j.forEach(j=>{ if(j[0] === n || j[1] === n){ const m = j[0] === n ? j[1] : j[0]; r.push(JUFT[k].nom.replace(' burchaklar', '').toLowerCase() + ': ∠' + m + ' (' + q[m] + '°)'); } }));
    return '<b>∠' + n + ' = ' + q[n] + '°.</b> ' + r.join('; ') + '.';
  }
  function yubor(ext){ const q = qiymatlar(); hodisa('mg-burchak', Object.assign({phi:s.phi, parallel:s.beta === 0, b1:q[1], b2:q[2]}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = SL('phi', 'φ (∠2)', 25, 155, 5, s.phi, v=>v + '°') + TG('data-b', s.beta ? 'b ni parallel qilish' : 'b ni og‘dirish', !!s.beta) + TG('data-q', 'Qiymatlar', s.qiymat) + '<span class="tag-ajr"></span>' +
      Object.keys(JUFT).map(k=>TG('data-t="' + k + '"', JUFT[k].nom.replace(' burchaklar', ''), s.tanla === k)).join('');
    slayderBog(tag, {phi:v=>v + '°'}, (p, v)=>{ s.phi = v; yoz(); yubor(); });
    tag.querySelector('[data-b]').onclick = ()=>{ s.beta = s.beta ? 0 : 12; tagChiz(); yoz(); yubor(); };
    tag.querySelector('[data-q]').onclick = ()=>{ s.qiymat = !s.qiymat; tagChiz(); E.iflos = true; };
    tag.querySelectorAll('[data-t]').forEach(b=>b.onclick = ()=>{ s.tanla = s.tanla === b.dataset.t ? null : b.dataset.t; s.burchak = null; tagChiz(); yoz(); yubor({tanla:s.tanla}); });
  }
  function tutqich(X, Y){
    const d = [Math.cos(s.phi * RAD), Math.sin(s.phi * RAD)], L = 3.5;
    if(Math.hypot(X - E.X(d[0] * L), Y - E.Y(d[1] * L)) < 16) return {sur:(x, y)=>{ let g = Math.atan2(y, x) / RAD; if(g < 0) g += 180; s.phi = cl(yax(g, 5), 25, 155); const sl = tag.querySelector('[data-p="phi"]'); if(sl){ sl.value = s.phi; sl.nextElementSibling.textContent = s.phi + '°'; } yoz(); }, qoy:()=>{ yubor(); }};
    return null;
  }
  function qaysi(x, y){
    const k = kes();
    for(const [P, bosh] of [[k.A, 1], [k.B, 5]]){
      const dx = x - P[0], dy = y - P[1], r = Math.hypot(dx, dy) * E.b;
      if(r < 8 || r > 78) continue;
      let g = Math.atan2(dy, dx) / RAD;
      for(let i = 0; i < 4; i++){ const [a0, a1] = sektor(bosh + i); let gg = g; while(gg < a0) gg += 360; while(gg >= a0 + 360) gg -= 360; if(gg <= a1) return bosh + i; }
    }
    return 0;
  }
  function bosish(x, y){
    const n = qaysi(x, y); if(!n) return;
    s.burchak = n; s.tanla = null; tagChiz(); yoz();
    yubor({bos:true, raqam:n, qiymat:qiymatlar()[n]});
    detal('mg_burchak', 'b' + n);
  }
  function ustida(x, y){ const n = qaysi(x, y); return n ? {bos:true, matn:'∠' + n + ' = ' + qiymatlar()[n] + '°'} : null; }
  function chiz(E){
    const k = kes(), q = qiymatlar();
    const ajr = new Set(); if(s.tanla && JUFT[s.tanla]) JUFT[s.tanla].j.forEach(j=>{ ajr.add(j[0]); ajr.add(j[1]); });
    let rel = new Map();
    if(s.burchak){ rel.set(s.burchak, '#ffffff'); Object.keys(JUFT).forEach(kk=>JUFT[kk].j.forEach(j=>{ if(j.includes(s.burchak)){ const m = j[0] === s.burchak ? j[1] : j[0]; if(!rel.has(m)) rel.set(m, q[m] === q[s.burchak] ? R.gr : R.pk); } })); }
    /* chiziqlar */
    const gr = (y1, rang)=>{ const g = cx.createLinearGradient(0, 0, E.W, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.12, rang); g.addColorStop(.88, rang); g.addColorStop(1, 'rgba(0,0,0,0)'); return g; };
    E.togri(0, YA, 1, 0, gr(0, '#b9a8ff'), 3.4, {soya:'rgba(139,116,255,.7)'});
    E.togri(0, YB, Math.cos(s.beta * RAD), Math.sin(s.beta * RAD), gr(0, s.beta ? '#ff8fb0' : '#b9a8ff'), 3.4, {soya:s.beta ? 'rgba(255,107,154,.6)' : 'rgba(139,116,255,.7)'});
    E.togri(0, 0, k.d[0], k.d[1], '#ffd98a', 3, {soya:'rgba(255,193,77,.6)'});
    const kk = E.korinish();
    E.matn(E.X(kk[0]) + 40, E.Y(YA) - 16, 'a', '#d9d0ff', 'italic 700 16px Inter');
    E.matn(E.X(kk[0]) + 40, E.Y(YB + Math.tan(s.beta * RAD) * (kk[0] + 1)) - 16, 'b', s.beta ? '#ffb3c8' : '#d9d0ff', 'italic 700 16px Inter');
    const L = 3.5, ux = k.d[0] * L, uy = k.d[1] * L;
    E.matn(E.X(ux) + 16, E.Y(uy) - 4, 'c', '#ffe2a6', 'italic 700 16px Inter');
    if(!s.beta){ /* parallellik belgisi */ [kk[2] - 1.2].forEach(x=>{ [YA, YB].forEach(y=>{ E.chiziqS(E.X(x) - 5, E.Y(y) - 6, E.X(x) + 3, E.Y(y), '#d9d0ff', 2); E.chiziqS(E.X(x) - 5, E.Y(y) + 6, E.X(x) + 3, E.Y(y), '#d9d0ff', 2); }); }); }
    /* burchaklar */
    for(let n = 1; n <= 8; n++){
      const P = n <= 4 ? k.A : k.B, [a0, a1] = sektor(n);
      const on = ajr.has(n) || rel.has(n);
      const rang = rel.get(n) || (ajr.has(n) ? (q[n] === q[2] ? R.am : R.cy) : (q[n] === q[2] ? 'rgba(255,193,77,.55)' : 'rgba(92,200,255,.5)'));
      const r = on ? 40 : 32;
      E.yoy(P[0], P[1], r, a0 * RAD, a1 * RAD, rang, {tola:on ? (rang === R.pk ? 'rgba(255,107,154,.22)' : rang === R.gr || rang === '#ffffff' ? 'rgba(78,225,160,.22)' : q[n] === q[2] ? 'rgba(255,193,77,.22)' : 'rgba(92,200,255,.2)') : 'rgba(255,255,255,.035)', q:on ? 2.6 : 1.6});
      const o = (a0 + a1) / 2 * RAD, rr = r + 17;
      const X = E.X(P[0]) + Math.cos(o) * rr, Y = E.Y(P[1]) - Math.sin(o) * rr;
      E.matn(X, Y, String(n), on ? '#fff' : 'rgba(230,234,255,.85)', (on ? '800 ' : '700 ') + '14px "Plus Jakarta Sans", Inter, sans-serif');
      if(s.qiymat){ const r2 = r + 37; E.matn(E.X(P[0]) + Math.cos(o) * r2, E.Y(P[1]) - Math.sin(o) * r2, q[n] + '°', on ? '#fff' : 'rgba(200,208,240,.6)', '600 11px "JetBrains Mono", monospace'); }
    }
    E.nuqta(k.A[0], k.A[1], '#ffffff', 5); E.nuqta(k.B[0], k.B[1], '#ffffff', 5);
    E.nuqta(ux, uy, R.am, 8);
  }
  yorliq('Geometriya · parallel to‘g‘ri chiziqlar');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   7. PIFAGOR TEOREMASI (2D) — katetlarga qurilgan kvadratlar va qayta joylash isboti
   ===================================================================== */
reg('pifagor', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const s = {a:3, b:4, rejim:'kvadrat', kat:true, t:0, ijro:false};
  const cc = ()=>Math.hypot(s.a, s.b);
  const E = tekis(sahna, c, {
    olam:()=>{ const a = s.a, b = s.b, q = s.rejim === 'isbot' ? [-.6, -.9, a + b + .6, a + b + .7] : [-b - .6, -a - .8, a + b + .5, a + b + .5]; return q; },
    kadr(dt){ if(s.ijro){ s.t = Math.min(1, s.t + dt / 2.6); if(s.t >= 1){ s.ijro = false; yoz(); tagChiz(); yubor({t:1}); } return true; } return false; },
    chiz, bosish, ustida,
    holat(h){ if(h.a !== undefined) s.a = +h.a; if(h.b !== undefined) s.b = +h.b; if(h.rejim) s.rejim = h.rejim; if(h.t !== undefined) s.t = +h.t; if(h.kat !== undefined) s.kat = !!h.kat; s.ijro = !!h.ijro; tagChiz(); yoz(); },
    qiymat:()=>({a:s.a, b:s.b, c:cc()})
  });
  const cx = E.cx;
  const butun = ()=>Math.abs(cc() - Math.round(cc())) < 1e-9;
  function yoz(){
    const c2 = s.a * s.a + s.b * s.b, cT = butun() ? String(Math.round(cc())) : '√' + son(c2) + ' ≈ ' + son(cc(), 3);
    let ichi = '<div class="q"><span>Katet a</span><b class="y">' + son(s.a) + '</b><span>Katet b</span><b class="k">' + son(s.b) + '</b><span>Gipotenuza c</span><b class="s">' + cT + '</b>' +
      '<span>a²</span><b class="y">' + son(s.a * s.a) + '</b><span>b²</span><b class="k">' + son(s.b * s.b) + '</b><span>c² = a² + b²</span><b class="s">' + son(c2) + '</b></div>';
    ichi += s.rejim === 'isbot' ? '<div class="iz">Katta kvadrat tomoni <b>a + b = ' + son(s.a + s.b) + '</b>. Unda 4 ta bir xil uchburchak bor. Ular qayta joylanganda bo‘sh qolgan yuza o‘zgarmaydi: avval bitta <b>c²</b>, keyin <b>a² + b²</b>.</div>'
      : '<div class="iz">' + (butun() && Number.isInteger(s.a) && Number.isInteger(s.b) ? '<b>' + s.a + ', ' + s.b + ', ' + Math.round(cc()) + '</b> — Pifagor uchligi (hammasi butun son). ' : '') + 'Katakchalarni sanang: katta kvadratdagi kataklar soni ikki kichik kvadratdagilar yig‘indisiga teng.</div>';
    E.karta.yoz('Pifagor teoremasi', 'c² = a² + b²', ichi);
    izoh.innerHTML = '<b>' + son(s.a) + '² + ' + son(s.b) + '² = ' + son(s.a * s.a) + ' + ' + son(s.b * s.b) + ' = ' + son(c2) + ' → c = ' + cT + '.</b> ' + (s.rejim === 'isbot' ? 'Isbot: (a + b)² yuzali kvadratdan 4 ta uchburchak yuzasini ayirsak, har ikki joylashuvda ham bir xil yuza qoladi.' : 'To‘g‘ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig‘indisiga teng.');
    E.iflos = true;
  }
  function yubor(ext){ hodisa('mg-pifagor', Object.assign({a:s.a, b:s.b, c:+cc().toFixed(6), butun:butun(), rejim:s.rejim, t:+s.t.toFixed(3)}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = TG('data-r="kvadrat"', 'Kvadratlar', s.rejim === 'kvadrat') + TG('data-r="isbot"', 'Isbot (qayta joylash)', s.rejim === 'isbot') + (s.rejim === 'isbot' ? TG('data-i', s.t >= 1 ? '↺ Qaytadan' : '▶ Isbotni ko‘rsatish', s.ijro) : TG('data-k', 'Katakchalar', s.kat)) + '<span class="tag-ajr"></span>' +
      SL('a', 'a', 1, 12, 1, s.a) + SL('b', 'b', 1, 12, 1, s.b) + '<span class="tag-ajr"></span>' + [[3, 4], [5, 12], [6, 8], [8, 15]].map(u=>TG('data-u="' + u + '"', u[0] + '–' + u[1] + '–' + Math.round(Math.hypot(u[0], u[1])), s.a === u[0] && s.b === u[1])).join('');
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ s.rejim = b.dataset.r; s.t = 0; s.ijro = false; tagChiz(); yoz(); yubor(); });
    const bi = tag.querySelector('[data-i]'); if(bi) bi.onclick = ()=>{ if(s.t >= 1) s.t = 0; s.ijro = !s.ijro; tagChiz(); };
    const bk = tag.querySelector('[data-k]'); if(bk) bk.onclick = ()=>{ s.kat = !s.kat; tagChiz(); E.iflos = true; };
    tag.querySelectorAll('[data-u]').forEach(b=>b.onclick = ()=>{ const u = b.dataset.u.split(',').map(Number); s.a = u[0]; s.b = u[1]; s.t = 0; tagChiz(); yoz(); yubor(); });
    slayderBog(tag, {}, (p, v)=>{ s[p] = v; s.t = s.rejim === 'isbot' ? 0 : s.t; yoz(); yubor(); });
  }
  /* kvadratlar (dunyo koordinatasi): C(0,0), B(a,0), A(0,b) */
  function shakllar(){
    const a = s.a, b = s.b;
    return {
      uch:[[0, 0], [a, 0], [0, b]],
      a2:[[0, 0], [a, 0], [a, -a], [0, -a]],
      b2:[[0, 0], [0, b], [-b, b], [-b, 0]],
      c2:[[a, 0], [0, b], [b, a + b], [a + b, a]]
    };
  }
  const ichida = (p, pts)=>{ let ic = false; for(let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1]; if(((yi > p[1]) !== (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi)) ic = !ic; } return ic; };
  /* isbot: uchburchak o‘rinlari (t=0: c² bo‘shliq, t=1: a² va b² bo‘shliq) — faqat parallel ko‘chirish */
  function isbotUch(t){
    const a = s.a, b = s.b, S = a + b, e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const T0 = [[0, 0], [a, 0], [0, b]];
    const rot = (p, k)=>{ const r = [[1, 0, 0, 1], [0, -1, 1, 0], [-1, 0, 0, -1], [0, 1, -1, 0]][k]; return [r[0] * p[0] + r[1] * p[1], r[2] * p[0] + r[3] * p[1]]; };
    const juft = [[0, [0, 0], [0, a]], [1, [S, 0], [S, 0]], [2, [S, S], [a, S]], [3, [0, S], [a, a]]];
    return juft.map(([k, p0, p1], i)=>{ const tx = p0[0] + (p1[0] - p0[0]) * (i === 3 || i === 2 || i === 0 ? e : e), ty = p0[1] + (p1[1] - p0[1]) * e; return T0.map(p=>{ const q = rot(p, k); return [q[0] + tx, q[1] + ty]; }); });
  }
  function nomla(x, y){
    if(s.rejim === 'isbot'){
      const us = isbotUch(s.t); if(us.some(u=>ichida([x, y], u))) return 'uchburchak';
      const a = s.a, S = a + s.b;
      if(x < 0 || y < 0 || x > S || y > S) return null;
      if(s.t >= .999){ if(x <= a && y <= a) return 'a2'; if(x >= a && y >= a) return 'b2'; }
      if(s.t <= .001) return 'c2';
      return null;
    }
    const sh = shakllar();
    for(const k of ['uch', 'a2', 'b2', 'c2']) if(ichida([x, y], sh[k])) return k === 'uch' ? 'uchburchak' : k;
    return null;
  }
  const YUZA = n=>({a2:s.a * s.a, b2:s.b * s.b, c2:s.a * s.a + s.b * s.b, uchburchak:s.a * s.b / 2})[n];
  function bosish(x, y){ const n = nomla(x, y); if(!n) return; yubor({bos:true, nom:n, yuza:YUZA(n)}); detal('mg_pifagor', n); flash = {n, t:performance.now()}; E.iflos = true; }
  let flash = null;
  function ustida(x, y){ const n = nomla(x, y); if(!n) return null; return {bos:true, matn:{a2:'a² = ' + son(YUZA('a2')), b2:'b² = ' + son(YUZA('b2')), c2:'c² = ' + son(YUZA('c2')), uchburchak:'uchburchak yuzi ab/2 = ' + son(YUZA('uchburchak'))}[n]}; }
  function katak(pts, qad, rang){
    /* kvadrat ichidagi birlik to‘r (kvadrat tomonlariga parallel) */
    const [p0, p1, , p3] = pts, u = [p1[0] - p0[0], p1[1] - p0[1]], v = [p3[0] - p0[0], p3[1] - p0[1]], L = Math.hypot(u[0], u[1]);
    const n = Math.floor(L / qad + 1e-9);
    cx.save(); cx.strokeStyle = rang; cx.lineWidth = 1;
    for(let i = 1; i < (Math.abs(L / qad - n) < 1e-9 ? n : n + 1); i++){
      const k = i * qad / L; if(k >= 1) break;
      E.chiziqS(E.X(p0[0] + u[0] * k), E.Y(p0[1] + u[1] * k), E.X(p0[0] + u[0] * k + v[0]), E.Y(p0[1] + u[1] * k + v[1]), rang, 1);
      E.chiziqS(E.X(p0[0] + v[0] * k), E.Y(p0[1] + v[1] * k), E.X(p0[0] + v[0] * k + u[0]), E.Y(p0[1] + v[1] * k + u[1]), rang, 1);
    }
    cx.restore();
  }
  function chiz(E){
    const a = s.a, b = s.b, fl = flash && performance.now() - flash.t < 900 ? flash.n : null;
    if(fl) E.iflos = true; else flash = null;
    const markazi = pts=>[pts.reduce((m, p)=>m + p[0], 0) / pts.length, pts.reduce((m, p)=>m + p[1], 0) / pts.length];
    if(s.rejim === 'kvadrat'){
      const sh = shakllar();
      const kv = (k, tola, rang, yoz2)=>{
        E.poly(sh[k], fl === k ? tola.replace(/[\d.]+\)$/, '.5)') : tola, rang, 2.6, {soya:rang, blur:16});
        if(s.kat && a <= 12 && b <= 12) katak(sh[k], 1, 'rgba(255,255,255,.13)');
        const m = markazi(sh[k]); E.matn(E.X(m[0]), E.Y(m[1]) - 9, yoz2, '#fff', '800 ' + Math.round(cl(E.b * .55, 13, 22)) + 'px "Plus Jakarta Sans", Inter, sans-serif');
        E.matn(E.X(m[0]), E.Y(m[1]) + 13, '= ' + son(YUZA(k)), rang, '700 ' + Math.round(cl(E.b * .42, 11, 16)) + 'px "JetBrains Mono", monospace');
      };
      kv('a2', 'rgba(255,193,77,.16)', R.am, 'a²');
      kv('b2', 'rgba(92,200,255,.16)', R.cy, 'b²');
      kv('c2', 'rgba(78,225,160,.14)', R.gr, 'c²');
      E.poly(sh.uch, fl === 'uchburchak' ? 'rgba(169,150,255,.55)' : 'rgba(169,150,255,.3)', '#e9e4ff', 3, {soya:'rgba(169,150,255,.8)'});
      /* to‘g‘ri burchak belgisi */
      const q = Math.min(.5, Math.min(a, b) * .25);
      E.poly([[0, 0], [q, 0], [q, q], [0, q]], null, '#fff', 1.6);
      E.teg(E.X(a / 2), E.Y(0), 'a = ' + son(a), R.am, {pos:'t', off:6});
      E.teg(E.X(0), E.Y(b * .5), 'b = ' + son(b), R.cy, {pos:'c', off:8});
      E.teg(E.X(a / 2) + 10, E.Y(b / 2) + 4, 'c = ' + (butun() ? Math.round(cc()) : son(cc(), 2)), R.gr, {pos:'o', off:6});
    } else {
      const S = a + b;
      E.poly([[0, 0], [S, 0], [S, S], [0, S]], 'rgba(255,255,255,.03)', 'rgba(220,226,255,.75)', 2.4);
      if(s.t <= .02){ E.poly([[a, 0], [S, a], [b, S], [0, b]], 'rgba(78,225,160,.2)', R.gr, 2.4, {soya:R.gr}); const m = [S / 2, S / 2]; E.matn(E.X(m[0]), E.Y(m[1]), 'c²', '#fff', '800 ' + Math.round(cl(E.b * .7, 14, 28)) + 'px "Plus Jakarta Sans", Inter'); }
      if(s.t >= .98){
        E.poly([[0, 0], [a, 0], [a, a], [0, a]], 'rgba(255,193,77,.2)', R.am, 2.4, {soya:R.am}); E.matn(E.X(a / 2), E.Y(a / 2), 'a²', '#fff', '800 ' + Math.round(cl(E.b * .6, 13, 26)) + 'px "Plus Jakarta Sans", Inter');
        E.poly([[a, a], [S, a], [S, S], [a, S]], 'rgba(92,200,255,.2)', R.cy, 2.4, {soya:R.cy}); E.matn(E.X(a + b / 2), E.Y(a + b / 2), 'b²', '#fff', '800 ' + Math.round(cl(E.b * .6, 13, 26)) + 'px "Plus Jakarta Sans", Inter');
      }
      const ranglar = ['rgba(169,150,255,.55)', 'rgba(255,107,154,.5)', 'rgba(255,159,67,.5)', 'rgba(94,234,212,.45)'];
      isbotUch(s.t).forEach((u, i)=>E.poly(u, fl === 'uchburchak' ? 'rgba(255,255,255,.35)' : ranglar[i], '#f1f3ff', 2, {soya:'rgba(169,150,255,.5)', blur:10}));
      E.teg(E.X(S / 2), E.Y(0), 'a + b = ' + son(S), '#dfe3ff', {pos:'p', off:8});
      E.teg(E.X(S / 2), E.Y(S), s.t <= .02 ? '(a + b)² = 4 · ab/2 + c²' : s.t >= .98 ? '(a + b)² = 4 · ab/2 + a² + b²' : 'uchburchaklar ko‘chmoqda…', s.t >= .98 ? R.am : R.gr, {pos:'t', off:8});
    }
  }
  yorliq('Geometriya · Pifagor teoremasi');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* =====================================================================
   8. AYLANA: MARKAZIY VA ICHKI CHIZILGAN BURCHAK (2D)
   ===================================================================== */
reg('aylana', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const Rr = 4;
  const s = {A:200, B:340, C:95, D:40, rejim:'asosiy'};
  const E = tekis(sahna, c, {
    olam:()=>[-5.6, -5.4, 5.6, 5.4],
    chiz, bosish, ustida, tutqich,
    holat(h){ ['A', 'B', 'C', 'D'].forEach(k=>{ if(h[k] !== undefined) s[k] = ((+h[k] % 360) + 360) % 360; }); if(h.rejim) s.rejim = h.rejim; if(s.rejim === 'diametr') s.B = (s.A + 180) % 360; tagChiz(); yoz(); },
    qiymat:()=>mal()
  });
  const cx = E.cx;
  const P = g=>[Rr * Math.cos(g * RAD), Rr * Math.sin(g * RAD)];
  const mod = v=>((v % 360) + 360) % 360;
  /* A→B yoyi (C ni o‘z ichiga olmagan): [boshi, uzunligi] */
  function yoy(X){ const L = mod(s.B - s.A); const ichida = mod(s[X] - s.A) < L; return ichida ? {bosh:s.B, uz:360 - L} : {bosh:s.A, uz:L}; }
  const dBor = ()=>s.rejim === 'bir_yoy' || s.rejim === 'tortburchak';
  function mal(){ const y = yoy('C'), o = {A:s.A, B:s.B, C:s.C, markaziy:y.uz, ichki:y.uz / 2, rejim:s.rejim}; if(dBor()){ const yd = yoy('D'); o.D = s.D; o.ichkiD = yd.uz / 2; o.birYoyda = yd.bosh === y.bosh; } return o; }
  function yoz(){
    const m = mal();
    let q = '<span>◡AB (C siz)</span><b class="s">' + m.markaziy + '°</b><span>Markaziy ∠AOB</span><b class="k">' + m.markaziy + '°' + (m.markaziy > 180 ? ' (> 180°)' : '') + '</b><span>Ichki ∠ACB</span><b class="y">' + son(m.ichki, 1) + '°</b>';
    if(dBor()) q += '<span>Ichki ∠ADB</span><b class="p">' + son(m.ichkiD, 1) + '°</b><span>∠ACB ' + (m.birYoyda ? '= ∠ADB' : '+ ∠ADB') + '</span><b class="p">' + (m.birYoyda ? 'bir yoyga tiralgan' : son(m.ichki + m.ichkiD, 1) + '°') + '</b>';
    const iz = s.rejim === 'diametr' ? '<b>AB — diametr</b>, yoy 180°, shuning uchun ∠ACB = 90° (Fales teoremasi) — C qayerda bo‘lmasin.' : s.rejim === 'bir_yoy' ? 'C va D bir yoyda: bir yoyga tiralgan ichki chizilgan burchaklar <b>teng</b>.' : s.rejim === 'tortburchak' ? 'ACBD — aylanaga ichki chizilgan to‘rtburchak: qarama-qarshi burchaklar yig‘indisi <b>180°</b>.' : 'Ichki chizilgan burchak o‘zi tiralgan yoyning <b>yarmiga</b> teng: ∠ACB = ½·◡AB = ½·∠AOB.';
    E.karta.yoz('Aylana burchaklari', '∠ACB = ½ ∠AOB', '<div class="q">' + q + '</div><div class="iz">' + iz + ' Nuqtalarni aylana bo‘ylab suring.</div>');
    izoh.innerHTML = '<b>∠AOB = ' + m.markaziy + '°, ∠ACB = ' + son(m.ichki, 1) + '°.</b> ' + iz.replace(/<[^>]+>/g, '');
    E.iflos = true;
  }
  function yubor(ext){ const m = mal(); hodisa('mg-aylana', Object.assign({A:m.A, B:m.B, C:m.C, D:m.D, markaziy:m.markaziy, ichki:m.ichki, ichkiD:m.ichkiD, birYoyda:m.birYoyda, rejim:m.rejim}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = [['asosiy', 'Markaziy va ichki'], ['diametr', 'Diametrga tiralgan'], ['bir_yoy', 'Bir yoyga tiralgan'], ['tortburchak', 'Ichki to‘rtburchak']].map(r=>TG('data-r="' + r[0] + '"', r[1], s.rejim === r[0])).join('') +
      '<span class="tag-ajr"></span>' + SL('C', 'C', 0, 355, 5, s.C, v=>v + '°') + SL('AB', '◡AB', 20, 340, 5, mod(s.B - s.A), v=>v + '°');
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{
      s.rejim = b.dataset.r;
      if(s.rejim === 'diametr'){ s.B = mod(s.A + 180); }
      if(s.rejim === 'bir_yoy'){ const y = yoy('C'); s.D = mod(y.bosh + y.uz + (360 - y.uz) * .3); if(yoy('D').bosh !== y.bosh) s.D = mod(y.bosh - 30); }
      if(s.rejim === 'tortburchak'){ const y = yoy('C'); s.D = mod(y.bosh + y.uz / 2); }
      tagChiz(); yoz(); yubor();
    });
    slayderBog(tag, {C:v=>v + '°', AB:v=>v + '°'}, (p, v)=>{
      if(p === 'C'){ if(!ustAB(v)) s.C = v; else { const sl = tag.querySelector('[data-p="C"]'); sl.value = s.C; sl.nextElementSibling.textContent = s.C + '°'; } }
      else { if(s.rejim === 'diametr'){ const sl = tag.querySelector('[data-p="AB"]'); sl.value = 180; sl.nextElementSibling.textContent = '180°'; return; } const eB = s.B; s.B = mod(s.A + v); if(ustAB(s.C) || (dBor() && ustAB(s.D))) s.B = eB; }
      yoz(); yubor();
    });
  }
  const ustAB = g=>[s.A, s.B].some(x=>Math.abs(mod(g - x + 180) - 180) < 5);
  const ustN = (g, k)=>['A', 'B', 'C', 'D'].filter(x=>x !== k && (x !== 'D' || dBor())).some(x=>Math.abs(mod(g - s[x] + 180) - 180) < 5);
  function tutqich(X, Y){
    for(const k of ['A', 'B', 'C', 'D']){
      if(k === 'D' && !dBor()) continue;
      const p = P(s[k]);
      if(Math.hypot(X - E.X(p[0]), Y - E.Y(p[1])) < 16) return {k, sur:(x, y)=>{
        const g = mod(yax(Math.atan2(y, x) / RAD, 5)); if(ustN(g, k)) return;
        if(k === 'A' && s.rejim === 'diametr'){ if(ustN(mod(g + 180), 'B') && !['C', 'D'].every(z=>!ustN(mod(g + 180), z))) return; s.A = g; s.B = mod(g + 180); if(ustAB(s.C)) return; }
        else if(k === 'B' && s.rejim === 'diametr'){ s.B = g; s.A = mod(g + 180); }
        else s[k] = g;
        yoz();
      }, qoy:()=>{ tagChiz(); yubor(); }};
    }
    return null;
  }
  function nomla(x, y, X, Y){
    for(const k of ['A', 'B', 'C', 'D']){ if(k === 'D' && !dBor()) continue; const p = P(s[k]); if(Math.hypot(X - E.X(p[0]), Y - E.Y(p[1])) < 16) return k; }
    if(Math.hypot(X - E.X(0), Y - E.Y(0)) < 14) return 'O';
    const r = Math.hypot(x, y), g = mod(Math.atan2(y, x) / RAD), yC = yoy('C');
    if(r < Rr * .5 && mod(g - yC.bosh) <= yC.uz) return 'markaziy';
    const pc = P(s.C), dc = Math.hypot(x - pc[0], y - pc[1]);
    if(dc < Rr * .45){ const pa = P(s.A), pb = P(s.B); const a1 = Math.atan2(pa[1] - pc[1], pa[0] - pc[0]), a2 = Math.atan2(pb[1] - pc[1], pb[0] - pc[0]), a = Math.atan2(y - pc[1], x - pc[0]); const q = (u, v)=>mod((v - u) / RAD); const w = q(a1, a2); if(w <= 180 ? q(a1, a) <= w : q(a2, a) <= 360 - w) return 'ichki'; }
    if(Math.abs(r - Rr) * E.b < 10) return 'aylana';
    return null;
  }
  function bosish(x, y, X, Y){ const n = nomla(x, y, X, Y); if(!n) return; yubor({bos:true, nom:n}); if(['O', 'markaziy', 'ichki'].includes(n)) detal('mg_aylana', n); }
  function ustida(x, y, X, Y){ const n = nomla(x, y, X, Y); const m = mal(); const t = {O:'O — aylana markazi', markaziy:'Markaziy burchak ∠AOB = ' + m.markaziy + '°', ichki:'Ichki chizilgan ∠ACB = ' + son(m.ichki, 1) + '°', aylana:'Aylana (R = ' + Rr + ')', A:'A nuqta — suring', B:'B nuqta — suring', C:'C — ichki chizilgan burchak uchi', D:'D nuqta — suring'}; return n ? {bos:true, matn:t[n]} : null; }
  function chiz(E){
    const O = [E.X(0), E.Y(0)], rp = Rr * E.b, m = mal(), yC = yoy('C');
    /* aylana */
    cx.save(); cx.strokeStyle = 'rgba(169,150,255,.8)'; cx.lineWidth = 2.6; cx.shadowColor = 'rgba(139,116,255,.8)'; cx.shadowBlur = 18; cx.beginPath(); cx.arc(O[0], O[1], rp, 0, PI * 2); cx.stroke(); cx.restore();
    const ic = cx.createRadialGradient(O[0], O[1], 0, O[0], O[1], rp); ic.addColorStop(0, 'rgba(123,99,255,.10)'); ic.addColorStop(1, 'rgba(123,99,255,.02)'); cx.fillStyle = ic; cx.beginPath(); cx.arc(O[0], O[1], rp, 0, PI * 2); cx.fill();
    /* AB yoyi (C siz) */
    E.yoy(0, 0, rp, yC.bosh * RAD, (yC.bosh + yC.uz) * RAD, R.gr, {q:6, soya:R.gr});
    const ym = (yC.bosh + yC.uz / 2) * RAD;
    E.teg(O[0] + Math.cos(ym) * (rp + 22), O[1] - Math.sin(ym) * (rp + 22), '◡AB = ' + yC.uz + '°', R.gr, {pos:'m', off:0});
    const pA = P(s.A), pB = P(s.B), pC = P(s.C);
    /* markaziy burchak */
    E.yoy(0, 0, Math.min(52, rp * .3), yC.bosh * RAD, (yC.bosh + yC.uz) * RAD, R.cy, {tola:'rgba(92,200,255,.2)', q:2.4});
    E.chiziq(0, 0, pA[0], pA[1], R.cy, 3, {soya:R.cy}); E.chiziq(0, 0, pB[0], pB[1], R.cy, 3, {soya:R.cy});
    E.teg(O[0] + Math.cos(ym) * Math.min(80, rp * .48), O[1] - Math.sin(ym) * Math.min(80, rp * .48), m.markaziy + '°', R.cy, {pos:'m', off:0});
    /* ichki chizilgan burchaklar */
    const ichkiChiz = (pX, rang, tola, qiymat)=>{
      E.chiziq(pX[0], pX[1], pA[0], pA[1], rang, 3, {soya:rang}); E.chiziq(pX[0], pX[1], pB[0], pB[1], rang, 3, {soya:rang});
      const a1 = Math.atan2(pA[1] - pX[1], pA[0] - pX[0]), a2 = Math.atan2(pB[1] - pX[1], pB[0] - pX[0]);
      let d = a2 - a1; while(d <= -PI) d += 2 * PI; while(d > PI) d -= 2 * PI;
      const bosh = d >= 0 ? a1 : a2, uz = Math.abs(d), rr = Math.min(40, rp * .22);
      E.yoy(pX[0], pX[1], rr, bosh, bosh + uz, rang, {tola, q:2.2});
      if(Math.abs(qiymat - 90) < .01){ const u = [Math.cos(bosh), Math.sin(bosh)], v = [Math.cos(bosh + uz), Math.sin(bosh + uz)], k = 14 / E.b; E.poly([[pX[0], pX[1]], [pX[0] + u[0] * k, pX[1] + u[1] * k], [pX[0] + (u[0] + v[0]) * k, pX[1] + (u[1] + v[1]) * k], [pX[0] + v[0] * k, pX[1] + v[1] * k]], tola, '#fff', 1.5); }
      const o = bosh + uz / 2, r2 = rr + 22;
      E.teg(E.X(pX[0]) + Math.cos(o) * r2, E.Y(pX[1]) - Math.sin(o) * r2, son(qiymat, 1) + '°', rang, {pos:'m', off:0});
    };
    ichkiChiz(pC, R.am, 'rgba(255,193,77,.2)', m.ichki);
    if(dBor()) ichkiChiz(P(s.D), R.pk, 'rgba(255,107,154,.2)', m.ichkiD);
    if(s.rejim === 'diametr') E.chiziq(pA[0], pA[1], pB[0], pB[1], 'rgba(255,255,255,.35)', 1.6, {uzuq:[6, 5]});
    /* nuqtalar */
    const nq = (k, rang)=>{ const p = P(s[k]); E.nuqta(p[0], p[1], rang, 8); const g = s[k] * RAD; E.matn(E.X(p[0]) + Math.cos(g) * 24, E.Y(p[1]) - Math.sin(g) * 24, k, '#fff', '800 16px "Plus Jakarta Sans", Inter'); };
    nq('A', '#e9e4ff'); nq('B', '#e9e4ff'); nq('C', R.am); if(dBor()) nq('D', R.pk);
    E.nuqta(0, 0, '#ffffff', 5.5); E.matn(O[0] - 14, O[1] + 14, 'O', '#fff', '800 15px "Plus Jakarta Sans", Inter');
  }
  yorliq('Geometriya · aylana va burchaklar');
  tagChiz(); yoz(); E.boshla();
  return E.api;
});

/* ======================= 3D yordamchilari ======================= */
function uch3(sahna, c, o){
  uslub();
  const uq = !!(sahna.closest && sahna.closest('.uq-sahna'));
  const S = MAKON3D.sahna(sahna, Object.assign({rx:.55, ry:.55, avto:false, fov:30, env:.8, ekspozitsiya:1.12, rxMin:.05, rxMax:1.35}, o));
  const T = S.T;
  S.uq = uq;
  S.ren.localClippingEnabled = true;
  S.sc.add(new T.HemisphereLight(0xcdd6ff, 0x120e1c, .42));
  const kalit = new T.DirectionalLight(0xffe2c4, 1.15); kalit.position.set(5, 9, 7); S.sc.add(kalit);
  const toldir = new T.DirectionalLight(0x86a2ff, .5); toldir.position.set(-7, 3, 2); S.sc.add(toldir);
  const orqa = new T.DirectionalLight(0xc3a8ff, .8); orqa.position.set(-1, 5, -9); S.sc.add(orqa);
  const H = {S, T};
  H.rang = h=>new T.Color(h).convertSRGBToLinear();
  const texKesh = {};
  H.radTex = (i, t, k)=>{ const kk = i + t; if(texKesh[kk]) return texKesh[kk]; const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, i); g.addColorStop(k || 1, t); x.fillStyle = g; x.fillRect(0, 0, 128, 128); const tx = new T.CanvasTexture(cv); texKesh[kk] = tx; return tx; };
  H.soya = (r, y, x, z)=>{ const m = new T.Mesh(new T.PlaneGeometry(r * 2, r * 2), new T.MeshBasicMaterial({map:H.radTex('rgba(0,0,0,.62)', 'rgba(0,0,0,0)'), transparent:true, depthWrite:false})); m.rotation.x = -PI / 2; m.position.set(x || 0, y, z || 0); m.renderOrder = -2; m.material.userData.env = 1; return m; };
  H.halqa = (r, y)=>{ const m = new T.Mesh(new T.RingGeometry(r * .985, r, 96), new T.MeshBasicMaterial({color:H.rang('#7b63ff'), transparent:true, opacity:.35, side:T.DoubleSide, depthWrite:false})); m.rotation.x = -PI / 2; m.position.y = y; m.material.userData.env = 1; return m; };
  H.nur = (hex, olcham)=>{ const sp = new T.Sprite(new T.SpriteMaterial({map:H.radTex('rgba(255,255,255,1)', 'rgba(255,255,255,0)', 1), color:new T.Color(hex), blending:T.AdditiveBlending, depthWrite:false, transparent:true, opacity:.85})); sp.scale.set(olcham, olcham, 1); sp.userData.nur = true; return sp; };
  H.shisha = (hex, op, p)=>{ const m = new T.MeshPhysicalMaterial(Object.assign({color:H.rang(hex), roughness:.14, metalness:.02, clearcoat:1, clearcoatRoughness:.12, transparent:true, opacity:op, side:T.DoubleSide, depthWrite:false}, p || {})); m.userData.env = 1; m.envMapIntensity = 1.1; return m; };
  H.mat = (hex, p)=>{ const m = new T.MeshStandardMaterial(Object.assign({color:H.rang(hex), roughness:.4, metalness:.1}, p || {})); m.userData.env = 1; m.envMapIntensity = .9; return m; };
  const YO = new T.Vector3(0, 1, 0);
  H.tayoq = (a, b, r, mat, seg)=>{ const d = new T.Vector3().subVectors(b, a), L = d.length(); const m = new T.Mesh(new T.CylinderGeometry(r, r, L, seg || 12, 1, false), mat); m.position.copy(a).addScaledVector(d, .5); m.quaternion.setFromUnitVectors(YO, d.normalize()); return m; };
  H.yozuv = (matn, o2)=>{
    o2 = o2 || {}; const cv = document.createElement('canvas'), x = cv.getContext('2d'), sh = o2.shrift || '700 44px "Plus Jakarta Sans", Inter, sans-serif';
    x.font = sh; const w = Math.ceil(x.measureText(matn).width) + 40, h = o2.h || 72; cv.width = w; cv.height = h;
    x.font = sh; if(o2.fon !== false){ x.fillStyle = o2.fon || 'rgba(12,16,34,.82)'; x.strokeStyle = o2.chet || 'rgba(185,168,255,.7)'; x.lineWidth = 3; x.beginPath(); if(x.roundRect) x.roundRect(2, 2, w - 4, h - 4, 18); else x.rect(2, 2, w - 4, h - 4); x.fill(); x.stroke(); }
    x.fillStyle = o2.rang || '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(matn, w / 2, h / 2 + 2);
    const tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding; tx.anisotropy = 4;
    const sp = new T.Sprite(new T.SpriteMaterial({map:tx, transparent:true, depthWrite:false, depthTest:o2.depthTest !== false})); const k = o2.k || .5; sp.scale.set(k * w / h, k, 1); sp.renderOrder = 20; return sp;
  };
  H.tozala = g=>{ while(g.children.length){ const ch = g.children.pop(); ch.traverse(ob=>{ if(ob.geometry && !ob.geometry.userData.umumiy) ob.geometry.dispose(); if(ob.material){ (Array.isArray(ob.material) ? ob.material : [ob.material]).forEach(m=>{ if(m.userData.umumiy) return; if(m.map && !Object.values(texKesh).includes(m.map)) m.map.dispose(); m.dispose(); }); } }); } };
  /* karta va ustida-yorliq */
  H.karta = kartaQur(sahna, uq);
  H.uch = document.createElement('div'); H.uch.className = 'mg-uch'; sahna.append(H.uch);
  S.el.addEventListener('pointermove', e=>{ const r = sahna.getBoundingClientRect(); H.uch.style.left = (e.clientX - r.left) + 'px'; H.uch.style.top = (e.clientY - r.top) + 'px'; });
  S.el.addEventListener('pointerleave', ()=>{ H.uch.style.display = 'none'; });
  /* xavfsiz maydonga moslash: kamera markazini surish (setViewOffset) va masofani moslash */
  let qV = 0, oldQ = '', fR = 0, fK = 0, fM = new T.Vector3();
  H.joy = (radius, markaz, kenglik)=>{ const m = markaz || new T.Vector3(); if(radius === fR && m.equals(fM) && (kenglik || 0) === fK) return; fR = radius; fK = kenglik || 0; fM.copy(m); oldQ = ''; moslash(true); };
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
  const eskiKadr = S.kadrda;
  H.kadr = null;
  S.kadrda = (dt, t)=>{ if(eskiKadr) eskiKadr(dt, t); if(t - qV > .5){ qV = t; moslash(false); } if(H.kadr) H.kadr(dt, t); };
  const yopAsl = S.yopish;
  S.yopish = ()=>{ H.karta.remove(); H.uch.remove(); Object.values(texKesh).forEach(t=>t.dispose()); yopAsl(); };
  return H;
}

/* =====================================================================
   9. ODDIY KASRLAR — 3D pitsa va chiziqli (shokolad) model
   ===================================================================== */
reg('kasr', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.78, ry:0, ryMin:-.7, ryMax:.7, rxMin:.35, rxMax:1.2, fov:32});
  const {S, T} = H;
  const s = {rejim:'kasr', n:8, k:3, bol:null, a:1, b:2, m:2, c1:3, d1:4, qa:2, qb:3, qn:8, variant:[[2, 5], [3, 6], [3, 4]]};
  const g = S.g, ild = new T.Group(); g.add(ild);
  const Rp = 1.25, HP = .2;
  const M = {
    tarelka:H.mat('#1d2340', {roughness:.35, metalness:.25}), chet:H.mat('#8f7dff', {roughness:.3, metalness:.6, emissive:H.rang('#2a1f66')}),
    pishloq:H.mat('#ffb547', {roughness:.38, metalness:0}), pishloq2:H.mat('#3fd4b0', {roughness:.38}), qobiq:H.mat('#d9a066', {roughness:.6}), qobiq2:H.mat('#8fe8d4', {roughness:.6}),
    kolbasa:H.mat('#b8322b', {roughness:.45}), bosh:H.shisha('#8fa0ff', .22), chiziq:new T.LineBasicMaterial({color:H.rang('#c9c2ff'), transparent:true, opacity:.55}),
    shokolad:H.mat('#7a4a2a', {roughness:.35}), shokolad2:H.mat('#2fae95', {roughness:.35})
  };
  Object.values(M).forEach(m=>m.userData.umumiy = true);
  /* pitsa bo‘lagi (ekstruziya) keshlanadi */
  const kesh = {};
  function bolakGeo(n){
    if(kesh[n]) return kesh[n];
    const a = 2 * PI / n, sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(Rp, 0); sh.absarc(0, 0, Rp, 0, a, false); sh.lineTo(0, 0);
    const G = new T.ExtrudeGeometry(sh, {depth:HP, bevelEnabled:true, bevelThickness:.03, bevelSize:.025, bevelSegments:2, curveSegments:Math.max(3, Math.round(64 / n))});
    G.rotateX(-PI / 2);
    const tor = new T.TorusGeometry(Rp - .07, .075, 8, Math.max(4, Math.round(64 / n)), a); tor.rotateX(-PI / 2); tor.translate(0, HP + .03, 0);
    const kolb = new T.CylinderGeometry(.11, .11, .035, 20);
    const r = {G, E:new T.EdgesGeometry(G, 25), tor, kolb}; Object.values(r).forEach(x=>x.userData.umumiy = true);
    return (kesh[n] = r);
  }
  function pitsa(n, toldi, x, z, p){
    /* toldi[i]: 0 — bo‘sh, 1 — 1-rang, 2 — 2-rang */
    const gp = new T.Group(); gp.position.set(x, 0, z);
    const tr = new T.Mesh(new T.CylinderGeometry(Rp * 1.14, Rp * 1.08, .07, 72), M.tarelka); tr.position.y = -.04; gp.add(tr);
    const hq = new T.Mesh(new T.TorusGeometry(Rp * 1.13, .022, 8, 96), M.chet); hq.rotation.x = PI / 2; hq.position.y = -.005; gp.add(hq);
    gp.add(H.soya(Rp * 1.7, -.075));
    const bg = bolakGeo(n), a = 2 * PI / n;
    for(let i = 0; i < n; i++){
      const t0 = PI / 2 - (i + 1) * a, ort = t0 + a / 2, bo = new T.Group();
      bo.rotation.y = t0; /* shakl 0..a burchakda; Y o‘qi atrofida burish = matematik burchak (tepadan qaralganda soat miliga teskari) */
      bo.position.set(Math.cos(ort) * .035, 0, -Math.sin(ort) * .035);
      const tur = toldi[i];
      const m = new T.Mesh(bg.G, tur === 2 ? M.pishloq2 : tur ? M.pishloq : M.bosh); m.userData = {nom:'bolak', p, i}; bo.add(m);
      if(tur){
        const tq = new T.Mesh(bg.tor, tur === 2 ? M.qobiq2 : M.qobiq); tq.userData = {nom:'bolak', p, i}; bo.add(tq);
        const soni = n <= 4 ? 3 : n <= 8 ? 2 : 1;
        for(let j = 0; j < soni; j++){
          const rr = Rp * (.36 + .38 * ((j * 37 + i * 13) % 10) / 10), aa = a * (.25 + .5 * ((j * 53 + i * 29) % 10) / 10);
          const k = new T.Mesh(bg.kolb, M.kolbasa); k.position.set(Math.cos(aa) * rr, HP + .045, -Math.sin(aa) * rr); k.userData = {nom:'bolak', p, i}; bo.add(k);
        }
      } else bo.add(new T.LineSegments(bg.E, M.chiziq));
      gp.add(bo);
    }
    return gp;
  }
  function shokolad(n, toldi, x, z, p, uzun){
    const gp = new T.Group(); gp.position.set(x, 0, z);
    const L = uzun || 3.1, w = L / n;
    for(let i = 0; i < n; i++){
      const tur = toldi[i];
      const G = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w - .045, .24, .5, 2, .05) : new T.BoxGeometry(w - .045, .24, .5);
      const m = new T.Mesh(G, tur === 2 ? M.shokolad2 : tur ? M.shokolad : M.bosh); m.position.set(-L / 2 + w * (i + .5), .12, 0); m.userData = {nom:'bolak', p, i};
      gp.add(m);
      if(!tur){ const e = new T.LineSegments(new T.EdgesGeometry(G, 30), M.chiziq); e.position.copy(m.position); gp.add(e); }
    }
    gp.add(H.soya(L * .75, -.01));
    return gp;
  }
  function kasrYozuv(sur, mah, x, y, z, rang){
    const cv = document.createElement('canvas'); cv.width = 160; cv.height = 200; const q = cv.getContext('2d');
    q.fillStyle = 'rgba(12,16,34,.84)'; q.strokeStyle = rang || 'rgba(185,168,255,.8)'; q.lineWidth = 4; q.beginPath(); if(q.roundRect) q.roundRect(4, 4, 152, 192, 26); else q.rect(4, 4, 152, 192); q.fill(); q.stroke();
    q.fillStyle = '#fff'; q.font = '800 72px "Plus Jakarta Sans", Inter, sans-serif'; q.textAlign = 'center'; q.textBaseline = 'middle';
    q.fillText(String(sur), 80, 56); q.fillRect(34, 98, 92, 7); q.fillText(String(mah), 80, 148);
    const tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding;
    const sp = new T.Sprite(new T.SpriteMaterial({map:tx, transparent:true, depthWrite:false})); sp.scale.set(.62, .78, 1); sp.position.set(x, y, z); sp.renderOrder = 20; return sp;
  }
  const belgiY = (m, x, z)=>{ const sp = H.yozuv(m, {fon:false, shrift:'800 80px "Plus Jakarta Sans", Inter, sans-serif', rang:'#ffd98a', k:.7, h:100}); sp.position.set(x, .45, z); return sp; };
  const ketma = (n, k)=>Array.from({length:n}, (_, i)=>i < k ? 1 : 0);
  function toldiKasr(){ if(!s.bol || s.bol.length !== s.n) s.bol = ketma(s.n, s.k); return s.bol; }
  function qur(){
    H.tozala(ild);
    const r = s.rejim;
    if(r === 'kasr'){
      const t = toldiKasr();
      ild.add(pitsa(s.n, t, 0, -.45, 0)); ild.add(shokolad(s.n, t, 0, 1.75, 0));
      ild.add(kasrYozuv(s.k, s.n, 2.15, .75, -.45));
      H.joy(2.2, new T.Vector3(0, 0, .45), 2.9);
    } else if(r === 'teng' || r === 'taqqos'){
      const [a, b, cc, d] = r === 'teng' ? [s.a, s.b, s.a * s.m, s.b * s.m] : [s.a, s.b, s.c1, s.d1];
      ild.add(pitsa(b, ketma(b, a), -1.75, -.45, 0)); ild.add(pitsa(d, ketma(d, cc), 1.75, -.45, 1));
      ild.add(shokolad(b, ketma(b, a), -1.75, 1.75, 0, 3.1)); ild.add(shokolad(d, ketma(d, cc), 1.75, 1.75, 1, 3.1));
      ild.add(kasrYozuv(a, b, -1.75, 1.05, -2.1)); ild.add(kasrYozuv(cc, d, 1.75, 1.05, -2.1));
      const q = a * d - cc * b; ild.add(belgiY(q === 0 ? '=' : q > 0 ? '>' : '<', 0, -.45));
      H.joy(2.3, new T.Vector3(0, 0, .35), 3.8);
    } else if(r === 'qosh'){
      const n = s.qn, A = s.qa, B = s.qb;
      ild.add(pitsa(n, ketma(n, A), -3.2, -.45, 0)); ild.add(pitsa(n, Array.from({length:n}, (_, i)=>i < B ? 2 : 0), 0, -.45, 1));
      ild.add(pitsa(n, Array.from({length:n}, (_, i)=>i < A ? 1 : i < A + B ? 2 : 0), 3.2, -.45, 2));
      ild.add(shokolad(n, ketma(n, A), -3.2, 1.75, 0, 2.9)); ild.add(shokolad(n, Array.from({length:n}, (_, i)=>i < B ? 2 : 0), 0, 1.75, 1, 2.9)); ild.add(shokolad(n, Array.from({length:n}, (_, i)=>i < A ? 1 : i < A + B ? 2 : 0), 3.2, 1.75, 2, 2.9));
      ild.add(belgiY('+', -1.6, -.45)); ild.add(belgiY('=', 1.6, -.45));
      ild.add(kasrYozuv(A, n, -3.2, 1.05, -2.1)); ild.add(kasrYozuv(B, n, 0, 1.05, -2.1, 'rgba(63,212,176,.8)')); ild.add(kasrYozuv(A + B, n, 3.2, 1.05, -2.1, 'rgba(255,217,138,.9)'));
      H.joy(2.3, new T.Vector3(0, 0, .35), 5.1);
    } else {
      s.variant.forEach((v, i)=>{ ild.add(pitsa(v[1], ketma(v[1], v[0]), (i - 1) * 3.2, -.45, i)); ild.add(shokolad(v[1], ketma(v[1], v[0]), (i - 1) * 3.2, 1.75, i, 2.9)); ild.add(kasrYozuv(v[0], v[1], (i - 1) * 3.2, 1.05, -2.1)); });
      H.joy(2.3, new T.Vector3(0, 0, .35), 5.1);
    }
  }
  const SOZ = ['nol', 'bir', 'ikki', 'uch', 'to‘rt', 'besh', 'olti', 'yetti', 'sakkiz', 'to‘qqiz', 'o‘n', 'o‘n bir', 'o‘n ikki'];
  const oqi = (k, n)=>SOZ[n] + (/[aeiouo‘]$/.test(SOZ[n]) ? 'dan ' : 'dan ') + SOZ[k];
  const qisqa = (a, b)=>{ const e = ekub(a, b); return e > 1 ? a / e + '/' + b / e : null; };
  const ONLIK = (a, b)=>son(a / b, 3);
  function yoz(){
    let sar, fx, ichi, iz;
    if(s.rejim === 'kasr'){
      const k = s.k, n = s.n, q = qisqa(k, n);
      sar = 'Oddiy kasr'; fx = k + '/' + n + ' <small>· ' + (k === 0 ? 'nol' : k === n ? 'butun' : oqi(k, n)) + '</small>';
      ichi = '<div class="q"><span>Surat</span><b class="y">' + k + ' — olingan bo‘lak</b><span>Maxraj</span><b class="k">' + n + ' — teng bo‘laklar</b><span>O‘nli kasr</span><b>' + ONLIK(k, n) + '</b><span>Foiz</span><b>' + son(k / n * 100, 1) + ' %</b>' + (q ? '<span>Qisqartirilgan</span><b class="s">' + q + '</b>' : '') + '<span>Qolgan qism</span><b>' + (n - k) + '/' + n + '</b></div><div class="iz">Bo‘lakni bosing — bo‘yaladi yoki bo‘shaydi. ' + (k < n ? 'To‘g‘ri kasr: surat maxrajdan kichik (' + k + ' < ' + n + ').' : 'Surat maxrajga teng: ' + n + '/' + n + ' = 1.') + '</div>';
      iz = '<b>' + k + '/' + n + '</b> — butun ' + n + ' ta teng bo‘lakka bo‘lingan, ulardan ' + k + ' tasi olingan.' + (q ? ' Qisqartirilsa: ' + k + '/' + n + ' = ' + q + ' (surat va maxraj ' + ekub(k, n) + ' ga bo‘lindi).' : '');
    } else if(s.rejim === 'teng'){
      const {a, b, m} = s; sar = 'Teng kasrlar'; fx = a + '/' + b + ' = ' + a * m + '/' + b * m;
      ichi = '<div class="q"><span>Ko‘paytuvchi</span><b class="y">× ' + m + '</b><span>Chap</span><b>' + a + '/' + b + ' = ' + ONLIK(a, b) + '</b><span>O‘ng</span><b>' + a * m + '/' + b * m + ' = ' + ONLIK(a * m, b * m) + '</b></div><div class="iz"><b>Kasrning asosiy xossasi:</b> surat va maxrajni bir xil songa ko‘paytirsak (yoki bo‘lsak), kasr qiymati o‘zgarmaydi. Bo‘laklar ' + m + ' marta maydalandi, lekin bo‘yalgan yuza bir xil.</div>';
      iz = '<b>' + a + '/' + b + ' = ' + a * m + '/' + b * m + '.</b> Surat ham, maxraj ham ' + m + ' ga ko‘paytirildi — pitsaning bo‘yalgan qismi o‘zgarmadi.';
    } else if(s.rejim === 'taqqos'){
      const {a, b, c1, d1} = s, q = a * d1 - c1 * b, bel = q === 0 ? '=' : q > 0 ? '>' : '<';
      const umumiy = b * d1 / ekub(b, d1);
      sar = 'Kasrlarni taqqoslash'; fx = a + '/' + b + ' ' + bel + ' ' + c1 + '/' + d1;
      ichi = '<div class="q"><span>Umumiy maxraj</span><b class="k">' + umumiy + '</b><span>1-kasr</span><b>' + a + '/' + b + ' = ' + a * umumiy / b + '/' + umumiy + '</b><span>2-kasr</span><b>' + c1 + '/' + d1 + ' = ' + c1 * umumiy / d1 + '/' + umumiy + '</b></div><div class="iz">Kasrlarni umumiy maxrajga keltirib, suratlarini solishtiramiz: ' + a * umumiy / b + ' ' + bel + ' ' + c1 * umumiy / d1 + '.</div>';
      iz = '<b>' + a + '/' + b + ' ' + bel + ' ' + c1 + '/' + d1 + '.</b> Umumiy maxraj ' + umumiy + ': ' + a * umumiy / b + '/' + umumiy + ' va ' + c1 * umumiy / d1 + '/' + umumiy + '.';
    } else if(s.rejim === 'qosh'){
      const {qa, qb, qn} = s, q = qisqa(qa + qb, qn);
      sar = 'Kasrlarni qo‘shish'; fx = qa + '/' + qn + ' + ' + qb + '/' + qn + ' = ' + (qa + qb) + '/' + qn;
      ichi = '<div class="q"><span>Maxraj</span><b class="k">' + qn + ' (o‘zgarmaydi)</b><span>Suratlar</span><b class="y">' + qa + ' + ' + qb + ' = ' + (qa + qb) + '</b>' + (q ? '<span>Qisqartirilgan</span><b class="s">' + q + '</b>' : '') + (qa + qb === qn ? '<span>Natija</span><b class="s">1 (butun)</b>' : '') + '</div><div class="iz"><b>Maxrajlari bir xil kasrlarni qo‘shishda</b> suratlar qo‘shiladi, maxraj o‘zgarmaydi. Uchinchi pitsada ikkala rangdagi bo‘laklar birga.</div>';
      iz = '<b>' + qa + '/' + qn + ' + ' + qb + '/' + qn + ' = ' + (qa + qb) + '/' + qn + (q ? ' = ' + q : '') + '.</b> Bir xil kattalikdagi bo‘laklarni sanaymiz: ' + qa + ' ta + ' + qb + ' ta = ' + (qa + qb) + ' ta.';
    } else {
      sar = 'Qaysi kasr?'; fx = s.variant.map(v=>v[0] + '/' + v[1]).join('  ·  ');
      ichi = '<div class="iz">Pitsani bosing. Teng kasrlarni topish uchun ularni qisqartiring yoki umumiy maxrajga keltiring.</div>';
      iz = 'Uchta pitsa: ' + s.variant.map(v=>v[0] + '/' + v[1]).join(', ') + '. Kerakli kasrni ko‘rsatgan pitsani bosing.';
    }
    H.karta.yoz(sar, fx, ichi); izoh.innerHTML = iz;
  }
  function yubor(ext){
    const d = {rejim:s.rejim};
    if(s.rejim === 'kasr') Object.assign(d, {k:s.k, n:s.n});
    else if(s.rejim === 'teng') Object.assign(d, {a:s.a, b:s.b, m:s.m});
    else if(s.rejim === 'taqqos') Object.assign(d, {a:s.a, b:s.b, c:s.c1, d:s.d1, belgi:s.a * s.d1 === s.c1 * s.b ? '=' : s.a * s.d1 > s.c1 * s.b ? '>' : '<'});
    else if(s.rejim === 'qosh') Object.assign(d, {a:s.qa, b:s.qb, n:s.qn, s:s.qa + s.qb});
    hodisa('mg-kasr', Object.assign(d, ext || {}));
  }
  function tagChiz(){
    let h = [['kasr', 'Kasr'], ['teng', 'Teng kasrlar'], ['taqqos', 'Taqqoslash'], ['qosh', 'Qo‘shish']].map(r=>TG('data-r="' + r[0] + '"', r[1], s.rejim === r[0])).join('') + '<span class="tag-ajr"></span>';
    if(s.rejim === 'kasr') h += SL('n', 'Maxraj', 2, 12, 1, s.n) + SL('k', 'Surat', 0, s.n, 1, s.k);
    else if(s.rejim === 'teng') h += SL('b', 'Maxraj', 2, 6, 1, s.b) + SL('a', 'Surat', 1, s.b, 1, s.a) + SL('m', '× son', 2, Math.max(2, Math.floor(12 / s.b)), 1, s.m);
    else if(s.rejim === 'taqqos') h += SL('b', '1-maxraj', 2, 12, 1, s.b) + SL('a', '1-surat', 1, s.b, 1, s.a) + SL('d1', '2-maxraj', 2, 12, 1, s.d1) + SL('c1', '2-surat', 1, s.d1, 1, s.c1);
    else if(s.rejim === 'qosh') h += SL('qn', 'Maxraj', 2, 12, 1, s.qn) + SL('qa', '1-surat', 0, s.qn, 1, s.qa) + SL('qb', '2-surat', 0, s.qn - s.qa, 1, s.qb);
    tag.innerHTML = h;
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ s.rejim = b.dataset.r; tagChiz(); qur(); yoz(); yubor(); });
    slayderBog(tag, {}, (p, v)=>{
      s[p] = v;
      if(p === 'n'){ s.k = Math.min(s.k, s.n); s.bol = null; }
      if(p === 'k') s.bol = null;
      if(p === 'b'){ s.a = Math.min(s.a, s.b); s.m = Math.min(s.m, Math.max(2, Math.floor(12 / s.b))); }
      if(p === 'd1') s.c1 = Math.min(s.c1, s.d1);
      if(p === 'qn'){ s.qa = Math.min(s.qa, s.qn); s.qb = Math.min(s.qb, s.qn - s.qa); }
      if(p === 'qa') s.qb = Math.min(s.qb, s.qn - s.qa);
      if(['n', 'b', 'd1', 'qn', 'qa'].includes(p)) tagChiz();
      qur(); yoz(); yubor();
    });
  }
  S.bosish = d=>{
    if(d.nom !== 'bolak') return;
    if(s.rejim === 'kasr'){ const t = toldiKasr(); t[d.i] = t[d.i] ? 0 : 1; s.k = t.reduce((m, v)=>m + (v ? 1 : 0), 0); const sl = tag.querySelector('[data-p="k"]'); if(sl){ sl.value = s.k; sl.nextElementSibling.textContent = s.k; } qur(); yoz(); yubor({bos:true}); return; }
    if(s.rejim === 'tanlov'){ const v = s.variant[d.p]; if(v) hodisa('mg-kasr', {rejim:'tanlov', bos:true, kasr:v[0] + '/' + v[1], k:v[0], n:v[1], qiymat:v[0] / v[1]}); return; }
    yubor({bos:true, p:d.p});
  };
  S.ustida = d=>{ if(d && d.nom === 'bolak'){ H.uch.style.display = 'block'; const n = s.rejim === 'kasr' ? s.n : null; H.uch.textContent = n ? (d.i + 1) + '-bo‘lak · 1/' + n : 'Pitsani bosing'; } else H.uch.style.display = 'none'; };
  S.holat = h=>{
    if(!h) return;
    if(h.rejim) s.rejim = h.rejim;
    ['n', 'k', 'a', 'b', 'm', 'c1', 'd1', 'qa', 'qb', 'qn'].forEach(k=>{ if(h[k] !== undefined) s[k] = +h[k]; });
    if(h.variantlar) s.variant = h.variantlar;
    s.k = Math.min(s.k, s.n); s.bol = null;
    tagChiz(); qur(); yoz();
  };
  S.qiymat = ()=>Object.assign({}, s);
  yorliq('Matematika · kasrlar: pitsa va shokolad modeli');
  qur(); tagChiz(); yoz();
  return S;
});

/* =====================================================================
   10. JISMLARNING KESIMLARI (3D)
   ===================================================================== */
const JISM = {
  kub:{nom:'Kub', v:[[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], f:[[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 4, 7, 3]]},
  prizma:{nom:'Uchburchakli prizma', v:(()=>{ const r = 1.3, a = [90, 210, 330].map(g=>[r * Math.cos(g * RAD), -r * Math.sin(g * RAD)]); return a.map(p=>[p[0], -1, p[1]]).concat(a.map(p=>[p[0], 1, p[1]])); })(), f:[[0, 1, 2], [3, 5, 4], [0, 3, 4, 1], [1, 4, 5, 2], [2, 5, 3, 0]]},
  piramida:{nom:'To‘rtburchakli piramida', v:[[-1.1, -1, -1.1], [1.1, -1, -1.1], [1.1, -1, 1.1], [-1.1, -1, 1.1], [0, 1.3, 0]], f:[[0, 1, 2, 3], [0, 4, 1], [1, 4, 2], [2, 4, 3], [3, 4, 0]]},
  tetraedr:{nom:'Tetraedr', v:[[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(p=>p.map(x=>x * .95)), f:[[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]]}
};
const KPRESET = {
  gorizontal:{nom:'Gorizontal', th:0, ps:0, t:.5},
  qiya:{nom:'Qiya', th:35, ps:0, t:.5},
  vertikal:{nom:'Vertikal', th:90, ps:0, t:.5},
  uch:{nom:'Uchburchak', th:Math.acos(1 / Math.sqrt(3)) / RAD, ps:45, t:.2, faqat:'kub'},
  besh:{nom:'Beshburchak', th:Math.acos(2 / Math.sqrt(6)) / RAD, ps:45, t:.625, faqat:'kub'},
  olti:{nom:'Oltiburchak', th:Math.acos(1 / Math.sqrt(3)) / RAD, ps:45, t:.5, faqat:'kub'}
};
const KNOM = {3:'uchburchak', 4:'to‘rtburchak', 5:'beshburchak', 6:'oltiburchak'};
reg('kesim', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.42, ry:.62, avto:false, fov:30, rxMin:-.2, rxMax:1.3});
  const {S, T} = H;
  const s = {jism:'kub', th:0, ps:0, t:.5, kes:false, ijro:false};
  const g = S.g, jg = new T.Group(), kg = new T.Group(), tg = new T.Group(); g.add(jg, tg, kg);
  g.add(H.soya(4.2, -1.08)); g.add(H.halqa(2.1, -1.06));
  const M = {
    yoq:H.shisha('#8f7dff', .2, {emissive:H.rang('#1a1240')}), qirra:H.mat('#e9e4ff', {emissive:H.rang('#5b45e6'), emissiveIntensity:.45, metalness:.35, roughness:.3}),
    uch:H.mat('#ffd27a', {emissive:H.rang('#ff9f1a'), emissiveIntensity:.8}), kesim:H.mat('#ffb547', {emissive:H.rang('#c26a00'), emissiveIntensity:.55, transparent:true, opacity:.9, side:T.DoubleSide, roughness:.3, polygonOffset:true, polygonOffsetFactor:-2, polygonOffsetUnits:-2}),
    kChet:H.mat('#fff2cf', {emissive:H.rang('#ffb000'), emissiveIntensity:.9}), tek:H.shisha('#5cc8ff', .12, {emissive:H.rang('#0a3b58')}), tChet:new T.LineBasicMaterial({color:H.rang('#8fdcff'), transparent:true, opacity:.8}), tTor:new T.LineBasicMaterial({color:H.rang('#8fdcff'), transparent:true, opacity:.18})
  };
  Object.values(M).forEach(m=>m.userData.umumiy = true);
  const kesTek = new T.Plane(), kesAsl = new T.Plane();
  [M.yoq, M.qirra, M.uch].forEach(m=>{ m.clippingPlanes = []; });
  const V3 = a=>new T.Vector3(a[0], a[1], a[2]);
  function normal(){ return new T.Vector3(Math.sin(s.th * RAD) * Math.cos(s.ps * RAD), Math.cos(s.th * RAD), Math.sin(s.th * RAD) * Math.sin(s.ps * RAD)).normalize(); }
  function qirralar(J){ const set = new Map(); J.f.forEach(f=>f.forEach((a, i)=>{ const b = f[(i + 1) % f.length]; const k = Math.min(a, b) + '-' + Math.max(a, b); if(!set.has(k)) set.set(k, [a, b]); })); return [...set.values()]; }
  function jismQur(){
    H.tozala(jg);
    const J = JISM[s.jism], pos = [];
    J.f.forEach(f=>{ for(let i = 1; i < f.length - 1; i++) [f[0], f[i], f[i + 1]].forEach(k=>pos.push(...J.v[k])); });
    const G = new T.BufferGeometry(); G.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); G.computeVertexNormals();
    const m = new T.Mesh(G, M.yoq); m.renderOrder = 2; jg.add(m);
    qirralar(J).forEach(([a, b])=>{ const t = H.tayoq(V3(J.v[a]), V3(J.v[b]), .035, M.qirra); t.userData = {nom:'qirra'}; jg.add(t); });
    J.v.forEach(p=>{ const u = new T.Mesh(new T.SphereGeometry(.075, 18, 14), M.uch); u.position.set(p[0], p[1], p[2]); u.userData = {nom:'uch'}; jg.add(u); const n = H.nur('#ffc14d', .55); n.position.copy(u.position); jg.add(n); });
  }
  function hisob(){
    const J = JISM[s.jism], n = normal();
    const d0 = Math.min(...J.v.map(p=>n.dot(V3(p)))), d1 = Math.max(...J.v.map(p=>n.dot(V3(p))));
    const tt = cl(s.t, .02, .98), d = d0 + (d1 - d0) * tt;
    const nuq = [];
    const qo = p=>{ if(!nuq.some(q=>q.distanceTo(p) < 1e-6)) nuq.push(p); };
    qirralar(J).forEach(([a, b])=>{
      const A = V3(J.v[a]), B = V3(J.v[b]), sa = n.dot(A) - d, sb = n.dot(B) - d;
      if(Math.abs(sa) < 1e-9) qo(A); if(Math.abs(sb) < 1e-9) qo(B);
      if(sa * sb < 0) qo(A.clone().lerp(B, sa / (sa - sb)));
    });
    let tomon = 0, poly = [], yuza = 0, shakl = '';
    if(nuq.length >= 3){
      const m = nuq.reduce((s2, p)=>s2.add(p), new T.Vector3()).multiplyScalar(1 / nuq.length);
      const u = new T.Vector3().subVectors(nuq[0], m).normalize(), v = new T.Vector3().crossVectors(n, u).normalize();
      poly = nuq.map(p=>({p, a:Math.atan2(new T.Vector3().subVectors(p, m).dot(v), new T.Vector3().subVectors(p, m).dot(u))})).sort((x, y)=>x.a - y.a).map(x=>x.p);
      tomon = poly.length;
      const uv = poly.map(p=>[new T.Vector3().subVectors(p, m).dot(u), new T.Vector3().subVectors(p, m).dot(v)]);
      for(let i = 0; i < uv.length; i++){ const j = (i + 1) % uv.length; yuza += uv[i][0] * uv[j][1] - uv[j][0] * uv[i][1]; }
      yuza = Math.abs(yuza) / 2;
      shakl = shaklNom(poly);
    }
    return {n, d, d0, d1, poly, tomon, yuza, shakl};
  }
  function shaklNom(p){
    const k = p.length, L = p.map((q, i)=>q.distanceTo(p[(i + 1) % k])), teng = (x, y)=>Math.abs(x - y) < 1e-3 * Math.max(1, x);
    const barcha = L.every(x=>teng(x, L[0]));
    if(k === 3){ if(barcha) return 'teng tomonli uchburchak'; if(teng(L[0], L[1]) || teng(L[1], L[2]) || teng(L[0], L[2])) return 'teng yonli uchburchak'; return 'uchburchak'; }
    if(k === 4){
      const e = i=>new T.Vector3().subVectors(p[(i + 1) % 4], p[i]).normalize();
      const par = (i, j)=>Math.abs(Math.abs(e(i).dot(e(j))) - 1) < 1e-4;
      const pc = (par(0, 2) ? 1 : 0) + (par(1, 3) ? 1 : 0);
      const dia = teng(p[0].distanceTo(p[2]), p[1].distanceTo(p[3]));
      if(pc === 2){ if(dia && barcha) return 'kvadrat'; if(dia) return 'to‘g‘ri to‘rtburchak'; if(barcha) return 'romb'; return 'parallelogramm'; }
      if(pc === 1) return 'trapetsiya';
      return 'to‘rtburchak';
    }
    if(k === 6 && barcha) return 'muntazam oltiburchak';
    return KNOM[k] || k + 'burchak';
  }
  let oxirgi = null;
  function kesimQur(){
    H.tozala(kg); H.tozala(tg);
    const h = hisob(); oxirgi = h;
    /* tekislik */
    const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 0, 1), h.n);
    const pl = new T.Mesh(new T.PlaneGeometry(4.6, 4.6), M.tek); pl.quaternion.copy(q); pl.position.copy(h.n).multiplyScalar(h.d); pl.renderOrder = 3; tg.add(pl);
    const ch = new T.LineLoop(new T.BufferGeometry().setFromPoints([[-2.3, -2.3], [2.3, -2.3], [2.3, 2.3], [-2.3, 2.3]].map(p=>new T.Vector3(p[0], p[1], 0))), M.tChet); ch.quaternion.copy(q); ch.position.copy(pl.position); tg.add(ch);
    const tp = []; for(let i = -2; i <= 2; i += .5){ tp.push(new T.Vector3(i, -2.3, 0), new T.Vector3(i, 2.3, 0), new T.Vector3(-2.3, i, 0), new T.Vector3(2.3, i, 0)); }
    const tl = new T.LineSegments(new T.BufferGeometry().setFromPoints(tp), M.tTor); tl.quaternion.copy(q); tl.position.copy(pl.position); tg.add(tl);
    /* kesim ko‘pburchagi */
    if(h.tomon >= 3){
      const pos = []; for(let i = 1; i < h.poly.length - 1; i++) [h.poly[0], h.poly[i], h.poly[i + 1]].forEach(p=>pos.push(p.x, p.y, p.z));
      const G = new T.BufferGeometry(); G.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); G.computeVertexNormals();
      const m = new T.Mesh(G, M.kesim); m.userData = {nom:'kesim'}; m.renderOrder = 5; kg.add(m);
      h.poly.forEach((p, i)=>{ const t = H.tayoq(p, h.poly[(i + 1) % h.poly.length], .045, M.kChet); t.userData = {nom:'kesim'}; kg.add(t); const u = new T.Mesh(new T.SphereGeometry(.06, 14, 10), M.kChet); u.position.copy(p); u.userData = {nom:'kesim'}; kg.add(u); const nn = H.nur('#ffb000', .5); nn.position.copy(p); kg.add(nn); });
      const nomS = H.yozuv(h.shakl, {shrift:'700 40px "Plus Jakarta Sans", Inter, sans-serif', k:.34, chet:'rgba(255,193,77,.8)', depthTest:false});
      const mk = h.poly.reduce((a, p)=>a.add(p), new T.Vector3()).multiplyScalar(1 / h.poly.length); nomS.position.copy(mk).addScaledVector(h.n, .45); kg.add(nomS);
    }
    kesAsl.set(h.n.clone().negate(), h.d);
    [M.yoq, M.qirra, M.uch].forEach(m=>{ m.clippingPlanes = s.kes ? [kesTek] : []; m.needsUpdate = true; });
  }
  function yoz(){
    const h = oxirgi || hisob(), J = JISM[s.jism];
    const q = '<span>Jism</span><b>' + J.nom + '</b><span>Kesim</span><b class="y">' + (h.tomon >= 3 ? h.shakl : 'yo‘q') + '</b><span>Tomonlar soni</span><b class="y">' + (h.tomon || 0) + '</b><span>Kesim yuzi</span><b>≈ ' + son(h.yuza, 2) + ' kv. b.</b><span>Qiyalik θ</span><b class="k">' + Math.round(s.th) + '°</b><span>Burilish ψ</span><b class="k">' + Math.round(s.ps) + '°</b><span>Joyi</span><b class="k">' + Math.round(s.t * 100) + ' %</b>';
    const J2 = {kub:'Kub kesimi 3, 4, 5 yoki 6 burchakli bo‘lishi mumkin — kubning 6 ta yog‘i bor, kesim tomoni har yoqda ko‘pi bilan bitta.', prizma:'Uchburchakli prizmaning 5 ta yog‘i bor: kesim 3, 4 yoki 5 burchakli bo‘ladi.', piramida:'To‘rtburchakli piramidaning 5 ta yog‘i bor: kesim 3, 4 yoki 5 burchakli bo‘ladi.', tetraedr:'Tetraedrning 4 ta yog‘i bor: kesim faqat uchburchak yoki to‘rtburchak bo‘ladi.'}[s.jism];
    H.karta.yoz('Jism kesimi', h.tomon >= 3 ? KNOM[h.tomon] || h.tomon + 'burchak' : 'kesim yo‘q', '<div class="q">' + q + '</div><div class="iz">' + J2 + ' Kesim tomonlari — tekislikning jism yoqlari bilan kesishgan kesmalari.</div>');
    izoh.innerHTML = '<b>' + J.nom + ' · kesim — ' + (h.tomon >= 3 ? h.shakl : 'yo‘q') + '.</b> ' + J2;
  }
  function yubor(ext){ const h = oxirgi || hisob(); hodisa('mg-kesim', Object.assign({jism:s.jism, tomon:h.tomon, shakl:h.shakl, th:Math.round(s.th), ps:Math.round(s.ps), t:+s.t.toFixed(3), yuza:+h.yuza.toFixed(4)}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = Object.keys(JISM).map(k=>TG('data-j="' + k + '"', JISM[k].nom.split(' ').pop().replace(/^./, x=>x.toUpperCase()), s.jism === k)).join('') + '<span class="tag-ajr"></span>' +
      Object.keys(KPRESET).filter(k=>!KPRESET[k].faqat || KPRESET[k].faqat === s.jism).map(k=>TG('data-k="' + k + '"', KPRESET[k].nom, false)).join('') + TG('data-x', 'Yuqori qismini olib tashlash', s.kes) + '<span class="tag-ajr"></span>' +
      SL('th', 'Qiyalik θ', 0, 90, 1, Math.round(s.th), v=>v + '°') + SL('ps', 'Burilish ψ', 0, 345, 15, Math.round(s.ps / 15) * 15, v=>v + '°') + SL('t', 'Siljish', 2, 98, 1, Math.round(s.t * 100), v=>v + '%');
    tag.querySelectorAll('[data-j]').forEach(b=>b.onclick = ()=>{ s.jism = b.dataset.j; tagChiz(); jismQur(); kesimQur(); yoz(); yubor(); });
    tag.querySelectorAll('[data-k]').forEach(b=>b.onclick = ()=>{ const p = KPRESET[b.dataset.k]; s.th = p.th; s.ps = p.ps; s.t = p.t; tagChiz(); kesimQur(); yoz(); yubor(); });
    tag.querySelector('[data-x]').onclick = ()=>{ s.kes = !s.kes; tagChiz(); kesimQur(); };
    slayderBog(tag, {th:v=>v + '°', ps:v=>v + '°', t:v=>v + '%'}, (p, v)=>{ if(p === 't') s.t = v / 100; else s[p] = v; kesimQur(); yoz(); yubor(); });
  }
  S.bosish = d=>{
    if(d.nom === 'kesim'){ const h = oxirgi; hodisa('mg-kesim', {bos:true, nom:'kesim', jism:s.jism, tomon:h.tomon, shakl:h.shakl}); detal('mg_kesim', 'kesim'); }
    else if(d.nom === 'qirra' || d.nom === 'uch'){ hodisa('mg-kesim', {bos:true, nom:d.nom, jism:s.jism}); detal('mg_kesim', s.jism); }
  };
  S.ustida = d=>{ if(d && d.nom){ H.uch.style.display = 'block'; H.uch.textContent = d.nom === 'kesim' ? 'Kesim: ' + (oxirgi ? oxirgi.shakl : '') : d.nom === 'qirra' ? JISM[s.jism].nom + ' qirrasi' : JISM[s.jism].nom + ' uchi'; } else H.uch.style.display = 'none'; };
  H.kadr = ()=>{ if(s.kes){ g.updateMatrixWorld(); kesTek.copy(kesAsl).applyMatrix4(g.matrixWorld); } };
  S.holat = h=>{
    if(!h) return;
    if(h.jism && JISM[h.jism]) s.jism = h.jism;
    if(h.kesim && KPRESET[h.kesim]){ const p = KPRESET[h.kesim]; s.th = p.th; s.ps = p.ps; s.t = p.t; }
    if(h.th !== undefined) s.th = +h.th; if(h.ps !== undefined) s.ps = +h.ps; if(h.t !== undefined) s.t = +h.t; if(h.kes !== undefined) s.kes = !!h.kes;
    tagChiz(); jismQur(); kesimQur(); yoz();
  };
  S.qiymat = ()=>Object.assign({}, s, {tomon:oxirgi && oxirgi.tomon, shakl:oxirgi && oxirgi.shakl});
  yorliq('Geometriya · jismlarning kesimlari');
  jismQur(); kesimQur(); tagChiz(); yoz();
  H.joy(2.6, new T.Vector3(0, -.1, 0), 2.6);
  return S;
});

/* =====================================================================
   11. MUNTAZAM KO‘PYOQLAR — 5 ta Platon jismi (3D)
   ===================================================================== */
const PLATON = [
  {k:'tetraedr', nom:'Tetraedr', yoq:'uchburchak', uchda:3, rang:'#ff7a45', unsur:'olov', dual:'tetraedr', U:4, Q:6, Y:4},
  {k:'kub', nom:'Kub (geksaedr)', yoq:'kvadrat', uchda:3, rang:'#9bd35a', unsur:'yer', dual:'oktaedr', U:8, Q:12, Y:6},
  {k:'oktaedr', nom:'Oktaedr', yoq:'uchburchak', uchda:4, rang:'#7fd8ff', unsur:'havo', dual:'kub', U:6, Q:12, Y:8},
  {k:'dodekaedr', nom:'Dodekaedr', yoq:'beshburchak', uchda:3, rang:'#c58cff', unsur:'koinot (osmon)', dual:'ikosaedr', U:20, Q:30, Y:12},
  {k:'ikosaedr', nom:'Ikosaedr', yoq:'uchburchak', uchda:5, rang:'#4f8dff', unsur:'suv', dual:'dodekaedr', U:12, Q:30, Y:20}
];
function platonGeo(T, k){
  if(k === 'tetraedr') return new T.TetrahedronGeometry(1);
  if(k === 'kub'){ const a = 2 / Math.sqrt(3); return new T.BoxGeometry(a, a, a).toNonIndexed(); }
  if(k === 'oktaedr') return new T.OctahedronGeometry(1);
  if(k === 'dodekaedr') return new T.DodecahedronGeometry(1);
  return new T.IcosahedronGeometry(1);
}
/* uchlar, qirralar (eng qisqa masofali juftlar), yoqlar (bir tekislikdagi uchburchaklar) */
function tahlil(T, G){
  const P = G.attributes.position, uch = [], ix = [];
  const kalit = (x, y, z)=>[x, y, z].map(v=>Math.round(v * 1e4)).join();
  const map = new Map();
  for(let i = 0; i < P.count; i++){ const x = P.getX(i), y = P.getY(i), z = P.getZ(i), k = kalit(x, y, z); if(!map.has(k)){ map.set(k, uch.length); uch.push(new T.Vector3(x, y, z)); } ix.push(map.get(k)); }
  let min = Infinity; for(let i = 0; i < uch.length; i++) for(let j = i + 1; j < uch.length; j++) min = Math.min(min, uch[i].distanceTo(uch[j]));
  const qir = []; for(let i = 0; i < uch.length; i++) for(let j = i + 1; j < uch.length; j++) if(uch[i].distanceTo(uch[j]) < min * 1.001) qir.push([i, j]);
  const yoqlar = new Map();
  for(let t = 0; t < ix.length; t += 3){
    const a = uch[ix[t]], b = uch[ix[t + 1]], c2 = uch[ix[t + 2]];
    const n = new T.Vector3().subVectors(b, a).cross(new T.Vector3().subVectors(c2, a)).normalize();
    const k = kalit(Math.round(n.x * 100) / 100, Math.round(n.y * 100) / 100, Math.round(n.z * 100) / 100);
    if(!yoqlar.has(k)) yoqlar.set(k, {n, u:new Set(), tri:[]});
    const Y = yoqlar.get(k); [ix[t], ix[t + 1], ix[t + 2]].forEach(v=>Y.u.add(v)); Y.tri.push([ix[t], ix[t + 1], ix[t + 2]]);
  }
  const yq = [...yoqlar.values()].map(Y=>{ const m = new T.Vector3(); Y.u.forEach(v=>m.add(uch[v])); m.multiplyScalar(1 / Y.u.size); return {n:Y.n, markaz:m, u:[...Y.u], tri:Y.tri}; });
  return {uch, qir, yoq:yq, U:uch.length, Q:qir.length, Y:yq.length};
}
reg('platon', (sahna, c)=>{
  const {tag, izoh, yorliq} = c;
  const H = uch3(sahna, c, {rx:.28, ry:0, avto:false, fov:30, rxMin:-.3, rxMax:1.25});
  const {S, T} = H;
  const s = {rejim:'hammasi', tanl:'ikosaedr', dual:false, ajrat:false, aylan:true};
  const g = S.g, ild = new T.Group(); g.add(ild);
  const TAH = {}; PLATON.forEach(p=>{ const G = platonGeo(T, p.k); TAH[p.k] = tahlil(T, G); G.dispose(); });
  const M = {
    qirra:H.mat('#f1edff', {emissive:H.rang('#5b45e6'), emissiveIntensity:.5, metalness:.4, roughness:.28}),
    uch:H.mat('#ffe2a6', {emissive:H.rang('#ffa31a'), emissiveIntensity:.85}),
    dual:H.mat('#8ff0ff', {emissive:H.rang('#00a3c7'), emissiveIntensity:.8, roughness:.3}),
    taglik:H.mat('#232a52', {roughness:.55, metalness:0, envMapIntensity:.3}), taglikChet:H.mat('#7b63ff', {emissive:H.rang('#3a24b8'), emissiveIntensity:.8, metalness:.6, roughness:.25})
  };
  Object.values(M).forEach(m=>m.userData.umumiy = true);
  M.taglik.envMapIntensity = .15; M.taglik.color = H.rang('#1a1f3e');
  const yoqMat = {}; PLATON.forEach(p=>{ yoqMat[p.k] = H.shisha(p.rang, .42, {emissive:H.rang(p.rang), emissiveIntensity:.12}); yoqMat[p.k].userData.umumiy = true; });
  const jismlar = {};
  function jism(p, olcham){
    const A = TAH[p.k], gp = new T.Group();
    const faces = new T.Group(); gp.add(faces);
    A.yoq.forEach(Y=>{
      const pos = []; Y.tri.forEach(t=>t.forEach(v=>{ const q = A.uch[v]; pos.push(q.x, q.y, q.z); }));
      const G = new T.BufferGeometry(); G.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); G.computeVertexNormals();
      const m = new T.Mesh(G, yoqMat[p.k]); m.userData = {nom:p.k, yoqN:Y.n.clone()}; faces.add(m);
    });
    const qg = new T.Group(); gp.add(qg);
    A.qir.forEach(([a, b])=>{ const t = H.tayoq(A.uch[a], A.uch[b], .028, M.qirra, 10); t.userData = {nom:p.k}; qg.add(t); });
    A.uch.forEach(q=>{ const u = new T.Mesh(new T.SphereGeometry(.055, 16, 12), M.uch); u.position.copy(q); u.userData = {nom:p.k}; qg.add(u); const n = H.nur('#ffc14d', .38); n.position.copy(q); qg.add(n); });
    const dg = new T.Group(); dg.visible = false; gp.add(dg);
    /* dual: yoq markazlari, qo‘shni yoqlar (2 ta umumiy uch) tutashtiriladi */
    A.yoq.forEach((Y, i)=>{ const u = new T.Mesh(new T.SphereGeometry(.05, 14, 10), M.dual); u.position.copy(Y.markaz); dg.add(u); A.yoq.forEach((Z, j)=>{ if(j <= i) return; const um = Y.u.filter(v=>Z.u.includes(v)).length; if(um >= 2) dg.add(H.tayoq(Y.markaz, Z.markaz, .02, M.dual, 8)); }); });
    gp.scale.setScalar(olcham);
    gp.userData = {faces, qg, dg};
    return gp;
  }
  function qur(){
    H.tozala(ild);
    Object.keys(jismlar).forEach(k=>delete jismlar[k]);
    if(s.rejim === 'hammasi'){
      PLATON.forEach((p, i)=>{
        const x = (i - 2) * 2.3, z = 0;
        const tg2 = new T.Mesh(new T.CylinderGeometry(.8, .88, .16, 64), M.taglik); tg2.position.set(x, -1.18, z); ild.add(tg2);
        const tc = new T.Mesh(new T.TorusGeometry(.8, .018, 8, 80), M.taglikChet); tc.rotation.x = PI / 2; tc.position.set(x, -1.1, z); ild.add(tc);
        ild.add(H.soya(1.9, -1.265, x, z));
        const j = jism(p, .78); j.position.set(x, 0, z); ild.add(j); jismlar[p.k] = j;
        const y = H.yozuv(p.nom.split(' ')[0], {k:.36, shrift:'700 40px "Plus Jakarta Sans", Inter, sans-serif', chet:p.rang}); y.position.set(x, -1.55, z + .3); ild.add(y);
      });
      H.joy(2.1, new T.Vector3(0, -.35, 0), 5.9);
    } else {
      const p = PLATON.find(x=>x.k === s.tanl);
      const j = jism(p, 1.45); ild.add(j); jismlar[p.k] = j;
      j.userData.dg.visible = s.dual;
      ild.add(H.soya(3.4, -1.62)); ild.add(H.halqa(1.9, -1.6));
      H.joy(2.1, new T.Vector3(0, -.1, 0), 2.1);
    }
    tanlaKor();
  }
  function tanlaKor(){ PLATON.forEach(p=>{ const j = jismlar[p.k]; if(!j) return; const on = p.k === s.tanl; j.userData.faces.children.forEach(m=>{ m.material = yoqMat[p.k]; }); j.userData.hl = on; }); }
  function yoz(){
    const p = PLATON.find(x=>x.k === s.tanl), A = TAH[p.k];
    const jad = '<table><tr><th></th><th>U</th><th>Q</th><th>Y</th><th>U−Q+Y</th></tr>' + PLATON.map(x=>'<tr' + (x.k === s.tanl ? ' class="joriy"' : '') + '><td style="text-align:left">' + x.nom.split(' ')[0] + '</td><td>' + TAH[x.k].U + '</td><td>' + TAH[x.k].Q + '</td><td>' + TAH[x.k].Y + '</td><td>' + (TAH[x.k].U - TAH[x.k].Q + TAH[x.k].Y) + '</td></tr>').join('') + '</table>';
    const q = '<span>Yoqlari</span><b class="y">' + A.Y + ' ta ' + p.yoq + '</b><span>Har uchda</span><b>' + p.uchda + ' ta yoq</b><span>Dual jism</span><b class="k">' + PLATON.find(x=>x.k === p.dual).nom.split(' ')[0] + '</b><span>Platon unsuri</span><b class="p">' + p.unsur + '</b>';
    H.karta.yoz('Platon jismlari', p.nom.split(' ')[0] + ' <small>· ' + A.U + ' − ' + A.Q + ' + ' + A.Y + ' = ' + (A.U - A.Q + A.Y) + '</small>', '<div class="q">' + q + '</div>' + jad + '<div class="iz">Eyler formulasi <b>U − Q + Y = 2</b> barcha qavariq ko‘pyoqlar uchun to‘g‘ri. Jismni bosing — ma’lumot kartasi ochiladi.</div>');
    izoh.innerHTML = '<b>' + p.nom + ':</b> ' + A.U + ' ta uch, ' + A.Q + ' ta qirra, ' + A.Y + ' ta ' + p.yoq + ' yoq; har bir uchida ' + p.uchda + ' ta yoq uchrashadi. ' + A.U + ' − ' + A.Q + ' + ' + A.Y + ' = 2.' + (s.dual && s.rejim === 'bitta' ? ' Havorang — dual jism (' + PLATON.find(x=>x.k === p.dual).nom.split(' ')[0].toLowerCase() + '): uchlari yoqlar markazida.' : '');
  }
  function yubor(ext){ const A = TAH[s.tanl]; hodisa('mg-platon', Object.assign({nom:s.tanl, U:A.U, Q:A.Q, Y:A.Y, rejim:s.rejim, dual:s.dual}, ext || {})); }
  function tagChiz(){
    tag.innerHTML = TG('data-r="hammasi"', 'Beshtasi', s.rejim === 'hammasi') + TG('data-r="bitta"', 'Bittasi yaqindan', s.rejim === 'bitta') + '<span class="tag-ajr"></span>' +
      PLATON.map(p=>TG('data-p="' + p.k + '"', p.nom.split(' ')[0], s.tanl === p.k)).join('') + '<span class="tag-ajr"></span>' +
      TG('data-d', 'Dual jism', s.dual) + TG('data-a', 'Yoqlarni ajratish', s.ajrat) + TG('data-y', 'Aylanish', s.aylan);
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ s.rejim = b.dataset.r; tagChiz(); qur(); yoz(); yubor(); });
    tag.querySelectorAll('[data-p]').forEach(b=>b.onclick = ()=>{ s.tanl = b.dataset.p; if(s.rejim === 'bitta') qur(); else tanlaKor(); tagChiz(); yoz(); yubor(); });
    tag.querySelector('[data-d]').onclick = ()=>{ s.dual = !s.dual; if(s.dual && s.rejim !== 'bitta'){ s.rejim = 'bitta'; qur(); } else Object.values(jismlar).forEach(j=>{ j.userData.dg.visible = s.dual; }); tagChiz(); yoz(); yubor(); };
    tag.querySelector('[data-a]').onclick = ()=>{ s.ajrat = !s.ajrat; tagChiz(); };
    tag.querySelector('[data-y]').onclick = ()=>{ s.aylan = !s.aylan; tagChiz(); };
  }
  let ajr = 0;
  H.kadr = (dt, t)=>{
    ajr += ((s.ajrat ? 1 : 0) - ajr) * Math.min(1, dt * 4);
    Object.keys(jismlar).forEach((k, i)=>{
      const j = jismlar[k];
      if(s.aylan) j.rotation.y += dt * (.35 + i * .02);
      const hl = j.userData.hl && s.rejim === 'hammasi';
      const sk = (s.rejim === 'hammasi' ? .78 : 1.45) * (hl ? 1.12 + Math.sin(t * 3) * .02 : 1);
      j.scale.setScalar(j.scale.x + (sk - j.scale.x) * Math.min(1, dt * 6));
      j.position.y = s.rejim === 'hammasi' ? (hl ? .12 : 0) : 0;
      j.userData.faces.children.forEach(m=>m.position.copy(m.userData.yoqN).multiplyScalar(ajr * .45));
      j.userData.qg.visible = ajr < .05;
    });
  };
  S.bosish = d=>{ const p = PLATON.find(x=>x.k === d.nom); if(!p) return; s.tanl = p.k; tanlaKor(); tagChiz(); yoz(); yubor({bos:true}); detal('mg_platon', p.k); };
  S.ustida = d=>{ const p = d && PLATON.find(x=>x.k === d.nom); if(p){ H.uch.style.display = 'block'; H.uch.textContent = p.nom + ' · ' + p.Y + ' yoq'; } else H.uch.style.display = 'none'; };
  S.holat = h=>{ if(!h) return; if(h.rejim) s.rejim = h.rejim; if(h.tanl && TAH[h.tanl]) s.tanl = h.tanl; if(h.dual !== undefined) s.dual = !!h.dual; if(h.ajrat !== undefined) s.ajrat = !!h.ajrat; tagChiz(); qur(); yoz(); };
  S.qiymat = ()=>({rejim:s.rejim, tanl:s.tanl, tahlil:Object.fromEntries(PLATON.map(p=>[p.k, [TAH[p.k].U, TAH[p.k].Q, TAH[p.k].Y]]))});
  yorliq('Geometriya · muntazam ko‘pyoqlar');
  qur(); tagChiz(); yoz();
  return S;
});

window.MAKON3D = Object.assign(window.MAKON3D || {}, {mgTekis:tekis, mgTahlil:tahlil, mgXavfsiz:xavfsizMaydon});
})();
