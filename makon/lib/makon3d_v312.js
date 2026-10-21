/* MAKON v3.12 — yangi sahnalar: funksiya grafigi (matematika), bitlar va mantiqiy elementlar (informatika),
   3D davriy jadval (kimyo). makon3d.js dan keyin ulanadi va window.MAKON3D ga qo'shiladi. */
(function(){
'use strict';

const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d||{})}));
const son = (v, k)=>{ k = k === undefined ? 2 : k; const p = Math.pow(10, k); let r = Math.round(v * p) / p; if(Object.is(r, -0)) r = 0; return String(r).replace('.', ',').replace('-', '−'); };

const CSS = `
.m2d{position:absolute;inset:0;z-index:1;overflow:hidden;user-select:none}
.m2d canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab}
.m2d canvas:active{cursor:grabbing}
.fn-karta{position:absolute;right:18px;top:18px;z-index:3;min-width:250px;max-width:330px;padding:14px 16px;border-radius:16px;background:rgba(12,16,34,.82);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px);color:#dfe3f3;font-size:13px;line-height:1.55;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.fn-karta .fx{font:600 19px/1.3 'JetBrains Mono',monospace;color:#fff;margin:2px 0 10px;letter-spacing:-.2px}
.fn-karta .fx i{font-style:normal;color:#a996ff}
.fn-karta .q{display:grid;grid-template-columns:auto 1fr;gap:3px 12px}
.fn-karta .q span{color:#8d95b8}
.fn-karta .q b{font-weight:600;color:#fff;font-family:'JetBrains Mono',monospace;font-size:12.5px}
.fn-karta .q b.y{color:#ffc14d}.fn-karta .q b.s{color:#4ee1a0}.fn-karta .q b.k{color:#5cc8ff}
.fn-karta .ust{font:600 10.5px/1 'JetBrains Mono',monospace;letter-spacing:1.6px;color:#8d95b8;text-transform:uppercase}
.fn-uch{position:absolute;z-index:3;pointer-events:none;padding:5px 9px;border-radius:8px;background:rgba(10,13,28,.9);border:1px solid rgba(255,255,255,.14);color:#fff;font:600 12px 'JetBrains Mono',monospace;transform:translate(12px,-120%);white-space:nowrap}
.mq2d{position:absolute;inset:0;z-index:1;display:flex;gap:14px;padding:70px 18px 150px;overflow:auto;align-items:flex-start;justify-content:center;flex-wrap:wrap;color:#dfe3f3}
.mq-p{flex:1 1 360px;max-width:600px;padding:16px 18px;border-radius:20px;background:linear-gradient(160deg,rgba(24,30,60,.85),rgba(12,16,34,.85));border:1px solid rgba(255,255,255,.09);box-shadow:0 20px 50px rgba(0,0,0,.35)}
.mq-p h4{margin:0 0 4px;font:700 16px/1.3 'Plus Jakarta Sans',Inter,sans-serif;color:#fff}
.mq-p .ust{font:600 10.5px/1 'JetBrains Mono',monospace;letter-spacing:1.6px;color:#8d95b8;text-transform:uppercase}
.mq-bitlar{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin:14px 0 10px}
.mq-bit{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 0 8px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:.18s;color:#8d95b8;font:600 11px 'JetBrains Mono',monospace}
.mq-bit:hover{border-color:rgba(169,150,255,.6)}
.mq-bit .l{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3a4163,#1a1f36);border:2px solid #2c3355;display:grid;place-items:center;color:#6e769a;font:700 16px 'JetBrains Mono',monospace;transition:.18s}
.mq-bit.on{background:rgba(255,193,77,.08);border-color:rgba(255,193,77,.45);color:#ffd57f}
.mq-bit.on .l{background:radial-gradient(circle at 35% 30%,#fff3c4,#ffb938 55%,#d98a00);border-color:#ffd57f;color:#3b2600;box-shadow:0 0 18px rgba(255,185,56,.7)}
.mq-bit sup{font-size:9px}
.mq-son{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mq-son div{padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}
.mq-son span{display:block;font-size:11px;color:#8d95b8}
.mq-son b{font:700 20px 'JetBrains Mono',monospace;color:#fff}
.mq-yig{margin-top:10px;font:500 13px 'JetBrains Mono',monospace;color:#b9c0dd;min-height:20px}
.mq-yig em{font-style:normal;color:#ffd57f}
.mq-darv{display:flex;align-items:center;gap:10px;margin:12px 0}
.mq-kir{display:flex;flex-direction:column;gap:26px}
.mq-sw{display:flex;align-items:center;gap:8px;cursor:pointer;font:700 14px 'JetBrains Mono',monospace;color:#fff}
.mq-sw i{width:46px;height:26px;border-radius:13px;background:#262c4a;position:relative;transition:.2s;border:1px solid rgba(255,255,255,.12)}
.mq-sw i:after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#8d95b8;transition:.2s}
.mq-sw.on i{background:#ffb938}.mq-sw.on i:after{left:23px;background:#fff}
.mq-sw.yoq{opacity:.25;pointer-events:none}
.mq-svg{flex:1;min-width:200px}
.mq-chiq{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;font:800 20px 'JetBrains Mono',monospace;background:radial-gradient(circle at 35% 30%,#3a4163,#1a1f36);border:2px solid #2c3355;color:#6e769a;transition:.2s;flex:none}
.mq-chiq.on{background:radial-gradient(circle at 35% 30%,#e6fff2,#4ee1a0 55%,#16a36a);border-color:#9ff0c9;color:#053a24;box-shadow:0 0 26px rgba(78,225,160,.75)}
.mq-jad{width:100%;border-collapse:collapse;font:600 13px 'JetBrains Mono',monospace;margin-top:6px}
.mq-jad th,.mq-jad td{padding:6px 8px;text-align:center;border-bottom:1px solid rgba(255,255,255,.06)}
.mq-jad th{color:#8d95b8;font-weight:600}
.mq-jad tr.joriy td{background:rgba(169,150,255,.16);color:#fff}
.mq-jad td.y1{color:#4ee1a0}
.mq-fx{margin-top:8px;font-size:13px;color:#b9c0dd}
.dj-leg{position:absolute;left:50%;transform:translateX(-50%);top:12px;z-index:3;display:flex;flex-wrap:wrap;justify-content:center;gap:5px;width:max-content;max-width:min(470px,calc(100% - 28px))}
.dj-leg button{display:flex;align-items:center;gap:5px;height:24px;padding:0 8px;border-radius:8px;background:rgba(10,13,28,.72);border:1px solid rgba(255,255,255,.1);color:#dfe3f3;font-size:11.5px;font-weight:600;backdrop-filter:blur(6px)}
.dj-leg button i{width:10px;height:10px;border-radius:3px}
.dj-leg button.faol{border-color:#fff;background:rgba(255,255,255,.14)}
.dj-kar{position:absolute;right:14px;top:62px;z-index:3;width:250px;padding:14px 16px;border-radius:16px;background:rgba(12,16,34,.86);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px);color:#dfe3f3;font-size:12.5px;line-height:1.5;display:none}
.dj-kar.on{display:block}
.dj-kar .bosh{display:flex;gap:12px;align-items:center;margin-bottom:8px}
.dj-kar .bl{width:58px;height:58px;border-radius:12px;display:grid;place-items:center;font:800 24px 'Plus Jakarta Sans',Inter,sans-serif;color:#0b0f1f;position:relative;flex:none}
.dj-kar .bl small{position:absolute;top:3px;left:6px;font:700 10px 'JetBrains Mono',monospace}
.dj-kar h5{margin:0;font:700 16px 'Plus Jakarta Sans',Inter,sans-serif;color:#fff}
.dj-kar .t{font-size:11.5px;color:#8d95b8}
.dj-kar table{width:100%;border-collapse:collapse;font-size:12px}
.dj-kar td{padding:3px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.dj-kar td:last-child{text-align:right;font-family:'JetBrains Mono',monospace;color:#fff}
.dj-kar p{margin:8px 0 0;color:#b9c0dd}
.dj-kar .x{position:absolute;top:8px;right:8px;width:24px;height:24px;border-radius:7px;background:rgba(255,255,255,.07);color:#dfe3f3;font-size:15px;line-height:1}
.dj-kar .x:hover{background:rgba(255,255,255,.16)}
.dj-ust{position:absolute;z-index:3;pointer-events:none;padding:4px 8px;border-radius:7px;background:rgba(10,13,28,.9);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:12px;font-weight:600;transform:translate(12px,-120%);white-space:nowrap;display:none}
@media (max-width:700px){.fn-karta{right:10px;top:10px;min-width:0;max-width:calc(100% - 20px);font-size:12px;padding:10px 12px}.fn-karta .fx{font-size:15px}.mq2d{padding:62px 10px 180px}.mq-bit .l{width:26px;height:26px;font-size:13px}.mq-bitlar{gap:4px}.dj-kar{width:auto;left:10px;right:10px;top:auto;bottom:100px}}
`;
function uslub(){ if(document.getElementById('m312css')) return; const s = document.createElement('style'); s.id = 'm312css'; s.textContent = CSS; document.head.append(s); }
function royxatla(idish, api){ const x = window._sahnalar; const e = x && x.get(idish); if(e && e !== api) e.yopish(); if(x) x.set(idish, api); }

/* ==================== 1. Kvadrat funksiya grafigi (2D) ==================== */
function funksiya2D(sahna, tag, izoh, yorliq, o){
  uslub();
  const wrap = document.createElement('div'); wrap.className = 'm2d';
  const cv = document.createElement('canvas'); wrap.append(cv);
  const karta = document.createElement('div'); karta.className = 'fn-karta'; wrap.append(karta);
  const uch = document.createElement('div'); uch.className = 'fn-uch'; uch.style.display = 'none'; wrap.append(uch);
  sahna.append(wrap);
  const cx = cv.getContext('2d');
  const lin = !!(o && o.chiziqli), fk = (o && o.funk) || {}; /* lin: y = kx + b (ichkarida a = 0, b = k, c = b) */
  const bosh = lin ? {a:0, b:fk.k !== undefined ? +fk.k : 1, c:fk.b !== undefined ? +fk.b : 0} : Object.assign({a:1, b:-2, c:-3}, fk);
  const tgt = {a:bosh.a, b:bosh.b, c:bosh.c}, cur = {a:bosh.a, b:bosh.b, c:bosh.c};
  let W = 0, H = 0, dpr = 1, birlik = 40, bosBirlik = 40, mx = 0, my = 1, sich = null, arvoh = false, kanon = false, kadr = 0, iflos = true, tirik = true;
  const api = {};
  function olcham(){
    const r = wrap.getBoundingClientRect(); W = r.width || 600; H = r.height || 400;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    bosBirlik = Math.max(18, Math.min(W / 24, H / 15));
    if(!api._olchandi){ birlik = bosBirlik; api._olchandi = 1; }
    iflos = true;
  }
  const ex = x=>W / 2 + (x - mx) * birlik, ey = y=>H / 2 - (y - my) * birlik;
  const fx = (p, x)=>p.a * x * x + p.b * x + p.c;
  function malumot(p){
    if(p.a === 0){ const x0 = p.b ? -p.c / p.b : null; return {D:0, x0, y0:null, ild:x0 === null ? [] : [x0]}; }
    const D = p.b * p.b - 4 * p.a * p.c, x0 = -p.b / (2 * p.a), y0 = fx(p, x0);
    let ild = [];
    if(D > 1e-9){ const q = Math.sqrt(D); ild = [(-p.b - q) / (2 * p.a), (-p.b + q) / (2 * p.a)].sort((u, v)=>u - v); }
    else if(Math.abs(D) <= 1e-9) ild = [x0];
    return {D, x0, y0, ild};
  }
  function formula(p){
    const had = [];
    const k = (v, s, bir)=>{ if(v === 0) return; const m = Math.abs(v); const kk = (m === 1 && s) ? '' : son(m); had.push({z:v < 0 ? '−' : '+', t:kk + s}); };
    k(p.a, 'x²'); k(p.b, 'x'); k(p.c, '');
    return had.map((h, i)=>(i === 0 ? (h.z === '−' ? '−' : '') : ' ' + h.z + ' ') + h.t).join('') || '0';
  }
  const qv = v=>v < 0 ? '(' + son(v) + ')' : son(v);
  const linMal = p=>{ const k = p.b, b = p.c, x0 = k ? -b / k : null; return {k, b, x0, osish:k > 0 ? 'osuvchi' : k < 0 ? 'kamayuvchi' : 'ozgarmas', burchak:Math.round(Math.atan(k) * 1800 / Math.PI) / 10}; };
  function kartaYozLin(){
    const L2 = linMal(tgt);
    karta.innerHTML = '<span class="ust">Chiziqli funksiya</span><div class="fx">y = ' + formula(tgt) + '</div>' +
      '<div class="q"><span>Burchak koeff.</span><b>k = ' + son(L2.k) + '</b>' +
      '<span>Erkin had</span><b>b = ' + son(L2.b) + '</b>' +
      '<span>Ox bilan</span><b class="s">' + (L2.x0 !== null ? '(' + son(L2.x0) + '; 0)' : L2.b === 0 ? 'ustma-ust (y = 0)' : 'kesishmaydi (Ox ga parallel)') + '</b>' +
      '<span>Oy bilan</span><b class="k">(0; ' + son(L2.b) + ')</b>' +
      '<span>Funksiya</span><b>' + {osuvchi:'o‘suvchi (k > 0)', kamayuvchi:'kamayuvchi (k < 0)', ozgarmas:'o‘zgarmas (k = 0)'}[L2.osish] + '</b>' +
      '<span>Ox bilan burchak</span><b class="y">α = arctg ' + qv(L2.k) + ' ≈ ' + son(L2.burchak, 1) + '°</b></div>';
    izoh.innerHTML = '<b>y = ' + formula(tgt) + '.</b> ' + (L2.k > 0 ? 'k > 0 — x ortganda y ham ortadi (o‘suvchi).' : L2.k < 0 ? 'k < 0 — x ortganda y kamayadi (kamayuvchi).' : 'k = 0 — grafik Ox ga parallel to‘g‘ri chiziq.') + ' Har 1 birlik o‘ngga siljiganda y ' + son(Math.abs(L2.k)) + ' birlik ' + (L2.k >= 0 ? 'ortadi' : 'kamayadi') + '.';
  }
  function kartaYoz(){
    if(lin) return kartaYozLin();
    const p = tgt, m = malumot(p);
    const ildT = m.ild.length === 2 ? 'x₁ = ' + son(m.ild[0]) + ', x₂ = ' + son(m.ild[1]) : m.ild.length === 1 ? 'x = ' + son(m.ild[0]) + ' (bitta)' : 'yo‘q (D < 0)';
    const kanonT = 'y = ' + (p.a === 1 ? '' : p.a === -1 ? '−' : son(p.a)) + '(x ' + (m.x0 >= 0 ? '− ' + son(m.x0) : '+ ' + son(-m.x0)) + ')² ' + (m.y0 >= 0 ? '+ ' + son(m.y0) : '− ' + son(-m.y0));
    karta.innerHTML = '<span class="ust">Kvadrat funksiya</span><div class="fx">y = ' + formula(p).replace(/x²/g, '<i>x²</i>') + '</div>' +
      (kanon ? '<div class="fx" style="font-size:14px;margin-top:-6px;color:#ffd57f">' + kanonT + '</div>' : '') +
      '<div class="q"><span>Tarmoqlar</span><b>' + (p.a > 0 ? 'yuqoriga (a > 0)' : 'pastga (a < 0)') + '</b>' +
      '<span>Diskriminant</span><b>D = ' + qv(p.b) + '² − 4·' + qv(p.a) + '·' + qv(p.c) + ' = ' + son(m.D) + '</b>' +
      '<span>Ildizlar</span><b class="s">' + ildT + '</b>' +
      '<span>Uchi</span><b class="y">(' + son(m.x0) + '; ' + son(m.y0) + ')</b>' +
      '<span>Simmetriya o‘qi</span><b class="y">x = ' + son(m.x0) + '</b>' +
      '<span>Oy bilan</span><b class="k">(0; ' + son(p.c) + ')</b>' +
      '<span>Qiymatlar</span><b>' + (p.a > 0 ? 'y ≥ ' + son(m.y0) : 'y ≤ ' + son(m.y0)) + '</b></div>';
    izoh.innerHTML = '<b>y = ' + formula(p) + '.</b> ' + (p.a > 0 ? 'a > 0 — tarmoqlar yuqoriga, uchi eng kichik qiymat.' : 'a < 0 — tarmoqlar pastga, uchi eng katta qiymat.') + ' ' + (m.D > 0 ? 'D > 0 — parabola Ox o‘qini ikki nuqtada kesadi.' : m.D === 0 ? 'D = 0 — parabola Ox o‘qiga uchida urinadi.' : 'D < 0 — parabola Ox o‘qini kesmaydi.');
  }
  function yubor(){ if(lin){ hodisa('funksiya', linMal(tgt)); return; } const m = malumot(tgt); hodisa('funksiya', {a:tgt.a, b:tgt.b, c:tgt.c, D:m.D, x0:m.x0, y0:m.y0, ildiz:m.ild.length}); }
  function qadam(){
    const x0 = mx - W / 2 / birlik, x1 = mx + W / 2 / birlik;
    let s = 1; const piks = birlik;
    if(piks < 14) s = 5; else if(piks < 28) s = 2;
    return {x0, x1, y0:my - H / 2 / birlik, y1:my + H / 2 / birlik, s};
  }
  function chiz(){
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, W, H);
    const q = qadam();
    // to'r
    cx.lineWidth = 1;
    for(let x = Math.ceil(q.x0); x <= q.x1; x++){ cx.strokeStyle = x % 5 === 0 ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.035)'; const X = Math.round(ex(x)) + .5; cx.beginPath(); cx.moveTo(X, 0); cx.lineTo(X, H); cx.stroke(); }
    for(let y = Math.ceil(q.y0); y <= q.y1; y++){ cx.strokeStyle = y % 5 === 0 ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.035)'; const Y = Math.round(ey(y)) + .5; cx.beginPath(); cx.moveTo(0, Y); cx.lineTo(W, Y); cx.stroke(); }
    // o'qlar
    const ox = Math.round(ey(0)) + .5, oy = Math.round(ex(0)) + .5;
    cx.strokeStyle = 'rgba(220,226,255,.55)'; cx.lineWidth = 1.4;
    cx.beginPath(); cx.moveTo(0, ox); cx.lineTo(W, ox); cx.moveTo(oy, 0); cx.lineTo(oy, H); cx.stroke();
    cx.fillStyle = 'rgba(220,226,255,.7)';
    cx.beginPath(); cx.moveTo(W - 2, ox); cx.lineTo(W - 12, ox - 5); cx.lineTo(W - 12, ox + 5); cx.fill();
    cx.beginPath(); cx.moveTo(oy, 2); cx.lineTo(oy - 5, 12); cx.lineTo(oy + 5, 12); cx.fill();
    cx.font = '600 13px Inter, sans-serif'; cx.fillText('x', W - 16, ox - 10); cx.fillText('y', oy + 10, 16);
    cx.font = '11px "JetBrains Mono", monospace'; cx.fillStyle = 'rgba(190,198,230,.55)';
    cx.textAlign = 'center'; cx.textBaseline = 'top';
    for(let x = Math.ceil(q.x0 / q.s) * q.s; x <= q.x1; x += q.s){ if(x === 0) continue; const X = ex(x); cx.fillRect(X - .5, ox - 3, 1, 6); cx.fillText(String(x).replace('-', '−'), X, Math.min(H - 14, Math.max(2, ox + 6))); }
    cx.textAlign = 'right'; cx.textBaseline = 'middle';
    for(let y = Math.ceil(q.y0 / q.s) * q.s; y <= q.y1; y += q.s){ if(y === 0) continue; const Y = ey(y); cx.fillRect(oy - 3, Y - .5, 6, 1); cx.fillText(String(y).replace('-', '−'), Math.max(22, Math.min(W - 4, oy - 7)), Y); }
    cx.textAlign = 'right'; cx.textBaseline = 'top'; cx.fillText('0', oy - 6, ox + 5);
    // y = x² arvohi
    const egri = (p, rang, qalin, soya, uzuq)=>{
      cx.save(); cx.strokeStyle = rang; cx.lineWidth = qalin; cx.lineJoin = 'round';
      if(soya){ cx.shadowColor = soya; cx.shadowBlur = 16; }
      if(uzuq) cx.setLineDash(uzuq);
      cx.beginPath(); let bor = false;
      for(let X = -2; X <= W + 2; X += 2){ const x = mx + (X - W / 2) / birlik, Y = ey(fx(p, x)); if(Y < -2000 || Y > H + 2000){ bor = false; continue; } if(!bor){ cx.moveTo(X, Y); bor = true; } else cx.lineTo(X, Y); }
      cx.stroke(); cx.restore();
    };
    if(arvoh) egri(lin ? {a:0, b:1, c:0} : {a:1, b:0, c:0}, 'rgba(200,205,230,.45)', 2, null, [7, 6]);
    const m = malumot(cur);
    // simmetriya o'qi
    if(!lin){ cx.save(); cx.strokeStyle = 'rgba(255,193,77,.55)'; cx.setLineDash([6, 6]); cx.lineWidth = 1.3; cx.beginPath(); cx.moveTo(ex(m.x0), 0); cx.lineTo(ex(m.x0), H); cx.stroke(); cx.restore(); }
    // parabola
    const gr = cx.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, '#6d52ff'); gr.addColorStop(.5, '#a996ff'); gr.addColorStop(1, '#6d52ff');
    egri(cur, gr, 3.6, 'rgba(139,116,255,.85)');
    const nuqta = (x, y, rang, r, matn, pos)=>{
      const X = ex(x), Y = ey(y);
      cx.save(); cx.fillStyle = rang; cx.shadowColor = rang; cx.shadowBlur = 12; cx.beginPath(); cx.arc(X, Y, r, 0, Math.PI * 2); cx.fill(); cx.restore();
      cx.strokeStyle = '#0b0f1f'; cx.lineWidth = 2; cx.beginPath(); cx.arc(X, Y, r, 0, Math.PI * 2); cx.stroke();
      if(matn){
        cx.font = '600 12px "JetBrains Mono", monospace'; const w = cx.measureText(matn).width + 12;
        let lx = X + 10, ly = Y + (pos === 'yuqori' ? -30 : 10); if(lx + w > W - 6) lx = X - w - 10; if(ly < 4) ly = Y + 10; if(ly > H - 26) ly = Y - 30;
        cx.fillStyle = 'rgba(10,13,28,.85)'; cx.strokeStyle = rang; cx.lineWidth = 1; cx.beginPath(); cx.roundRect ? cx.roundRect(lx, ly, w, 20, 6) : cx.rect(lx, ly, w, 20); cx.fill(); cx.stroke();
        cx.fillStyle = '#fff'; cx.textAlign = 'left'; cx.textBaseline = 'middle'; cx.fillText(matn, lx + 6, ly + 10);
      }
    };
    nuqta(0, cur.c, '#5cc8ff', 5, m.ild.some(x=>Math.abs(x) < .05) ? '' : '(0; ' + son(cur.c) + ')', 'yuqori');
    m.ild.forEach((x, i)=>nuqta(x, 0, '#4ee1a0', 6, lin ? '(' + son(x) + '; 0)' : m.ild.length === 1 ? '' : (i ? 'x₂ = ' : 'x₁ = ') + son(x), cur.a > 0 ? 'yuqori' : 'past'));
    if(!lin) nuqta(m.x0, m.y0, '#ffc14d', 7, 'uchi (' + son(m.x0) + '; ' + son(m.y0) + ')' + (m.ild.length === 1 ? ' — yagona ildiz' : ''), cur.a > 0 ? 'past' : 'yuqori');
    // sichqoncha nuqtasi
    if(sich){
      const x = mx + (sich.x - W / 2) / birlik, y = fx(cur, x), Y = ey(y);
      if(Math.abs(Y - sich.y) < 60){
        cx.save(); cx.strokeStyle = 'rgba(255,255,255,.25)'; cx.setLineDash([3, 4]); cx.beginPath(); cx.moveTo(sich.x, Y); cx.lineTo(sich.x, ey(0)); cx.moveTo(sich.x, Y); cx.lineTo(ex(0), Y); cx.stroke(); cx.restore();
        cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(sich.x, Y, 4.5, 0, Math.PI * 2); cx.fill();
        uch.style.display = ''; uch.style.left = sich.x + 'px'; uch.style.top = Y + 'px'; uch.textContent = 'x = ' + son(x) + '  y = ' + son(y);
      } else uch.style.display = 'none';
    } else uch.style.display = 'none';
  }
  let oxirgi = performance.now();
  function kadrla(t){
    if(!tirik) return;
    kadr = requestAnimationFrame(kadrla);
    const dt = Math.min(1, Math.max(0, ((t || performance.now()) - oxirgi) / 1000)); oxirgi = t || performance.now();
    const kk = 1 - Math.exp(-12 * dt); /* vaqtga bog'liq: sekin kompyuterda ham tez yetib boradi */
    let ozg = false;
    for(const k of ['a', 'b', 'c']){ const d = tgt[k] - cur[k]; if(Math.abs(d) > 1e-4){ cur[k] += d * kk; ozg = true; } else if(cur[k] !== tgt[k]){ cur[k] = tgt[k]; ozg = true; } }
    if(ozg || iflos){ iflos = false; chiz(); }
  }
  // boshqaruv
  const L = (id, nom, min, max, st, v)=>'<label>' + nom + ' <input type="range" data-p="' + id + '" min="' + min + '" max="' + max + '" step="' + st + '" value="' + v + '"><b style="min-width:30px">' + son(v) + '</b></label>';
  function tagChiz(){
    tag.innerHTML = (lin ? L('b', 'k', -4, 4, .5, tgt.b) + L('c', 'b', -6, 6, 1, tgt.c) + '<button data-g class="' + (arvoh ? 'faol' : '') + '">y = x bilan solishtirish</button>'
      : L('a', 'a', -3, 3, .5, tgt.a) + L('b', 'b', -6, 6, 1, tgt.b) + L('c', 'c', -6, 6, 1, tgt.c) +
      '<button data-g class="' + (arvoh ? 'faol' : '') + '">y = x² bilan solishtirish</button><button data-k class="' + (kanon ? 'faol' : '') + '">To‘la kvadrat ko‘rinishi</button>');
    tag.querySelectorAll('[data-p]').forEach(x=>x.oninput = ()=>{
      let v = +x.value; if(x.dataset.p === 'a' && v === 0) v = tgt.a > 0 ? -.5 : .5, x.value = v;
      tgt[x.dataset.p] = v; x.nextSibling.textContent = son(v); kartaYoz(); yubor();
    });
    tag.querySelector('[data-g]').onclick = e=>{ arvoh = !arvoh; e.currentTarget.classList.toggle('faol', arvoh); iflos = true; };
    if(!lin) tag.querySelector('[data-k]').onclick = e=>{ kanon = !kanon; e.currentTarget.classList.toggle('faol', kanon); kartaYoz(); };
  }
  // sichqoncha: surish, g'ildirak
  let bos = null;
  cv.addEventListener('pointerdown', e=>{ bos = {x:e.clientX, y:e.clientY, mx, my}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e=>{
    const r = cv.getBoundingClientRect(); sich = {x:e.clientX - r.left, y:e.clientY - r.top};
    if(bos){ mx = bos.mx - (e.clientX - bos.x) / birlik; my = bos.my + (e.clientY - bos.y) / birlik; }
    iflos = true;
  });
  ['pointerup', 'pointercancel'].forEach(t=>cv.addEventListener(t, ()=>{ bos = null; }));
  cv.addEventListener('pointerleave', ()=>{ sich = null; iflos = true; });
  cv.addEventListener('wheel', e=>{ e.preventDefault(); api.zoomla(e.deltaY > 0 ? 1.12 : 1 / 1.12); }, {passive:false});
  const ro = window.ResizeObserver ? new ResizeObserver(olcham) : null; if(ro) ro.observe(wrap); else window.addEventListener('resize', olcham);
  Object.assign(api, {
    holat(h){
      if(h && h.funk){ if(lin){ if(h.funk.k !== undefined) tgt.b = +h.funk.k; if(h.funk.b !== undefined) tgt.c = +h.funk.b; } else { ['a', 'b', 'c'].forEach(k=>{ if(h.funk[k] !== undefined) tgt[k] = +h.funk[k]; }); if(!tgt.a) tgt.a = 1; } tagChiz(); kartaYoz(); yubor(); }
    },
    zoomla(k){ birlik = Math.max(8, Math.min(160, birlik / k)); iflos = true; },
    tikla(){ birlik = bosBirlik; mx = 0; my = 1; iflos = true; },
    qotir(){},
    yopish(){ tirik = false; cancelAnimationFrame(kadr); if(ro) ro.disconnect(); else window.removeEventListener('resize', olcham); wrap.remove(); const x = window._sahnalar; if(x && x.get(sahna) === api) x.delete(sahna); },
    qiymat(){ return lin ? linMal(tgt) : Object.assign({}, tgt, malumot(tgt)); }
  });
  royxatla(sahna, api);
  yorliq('Matematika · koordinata tekisligi');
  olcham(); tagChiz(); kartaYoz(); kadrla();
  return api;
}

/* ==================== 2. Bitlar va mantiqiy elementlar ==================== */
const DARVOZA = {
  AND:{nom:'VA (AND)', uz:'kon’yunksiya', f:(a, b)=>a & b, belgi:'A ∧ B'},
  OR:{nom:'YOKI (OR)', uz:'diz’yunksiya', f:(a, b)=>a | b, belgi:'A ∨ B'},
  NOT:{nom:'EMAS (NOT)', uz:'inkor', f:a=>a ? 0 : 1, belgi:'¬A', bir:true},
  XOR:{nom:'XOR', uz:'istisno qiluvchi YOKI', f:(a, b)=>a ^ b, belgi:'A ⊕ B'}
};
function darvozaSvg(tur, a, b, y){
  const on = '#ffb938', off = '#3a4266', yon = y ? '#4ee1a0' : off;
  const sim = v=>v ? on : off;
  let shakl = '';
  if(tur === 'AND') shakl = '<path d="M70 20 H115 A40 40 0 0 1 115 100 H70 Z"/>';
  else if(tur === 'OR' || tur === 'XOR') shakl = (tur === 'XOR' ? '<path d="M58 20 Q80 60 58 100" fill="none"/>' : '') + '<path d="M68 20 Q140 20 165 60 Q140 100 68 100 Q92 60 68 20 Z"/>';
  else shakl = '<path d="M72 22 L150 60 L72 98 Z"/><circle cx="158" cy="60" r="8"/>';
  const bir = tur === 'NOT';
  const kirish = bir ? '<path d="M0 60 H72" stroke="' + sim(a) + '"/>'
    : '<path d="M0 40 H' + (tur === 'AND' ? 70 : 78) + '" stroke="' + sim(a) + '"/><path d="M0 80 H' + (tur === 'AND' ? 70 : 78) + '" stroke="' + sim(b) + '"/>';
  const chiqX = tur === 'AND' ? 155 : tur === 'NOT' ? 166 : 165;
  return '<svg class="mq-svg" viewBox="0 0 230 120" width="100%" height="120"><g stroke-width="5" stroke-linecap="round" fill="none">' + kirish +
    '<path d="M' + chiqX + ' 60 H230" stroke="' + yon + '"' + (y ? ' style="filter:drop-shadow(0 0 6px #4ee1a0)"' : '') + '/></g>' +
    '<g fill="#1b2140" stroke="#a996ff" stroke-width="3.5" stroke-linejoin="round">' + shakl + '</g>' +
    '<text x="' + (tur === 'NOT' ? 98 : 108) + '" y="66" fill="#fff" font-family="JetBrains Mono,monospace" font-weight="700" font-size="15" text-anchor="middle">' + (tur === 'AND' ? '&amp;' : tur === 'OR' ? '≥1' : tur === 'XOR' ? '=1' : '1') + '</text></svg>';
}
function mantiq2D(sahna, tag, izoh, yorliq, o){
  uslub();
  const wrap = document.createElement('div'); wrap.className = 'mq2d';
  sahna.append(wrap);
  let sonQ = (o && o.son) || 0, tur = (o && o.darvoza) || 'AND', A = 0, B = 0;
  wrap.innerHTML = '<div class="mq-p"><span class="ust">1-qism · ikkilik son</span><h4>8 bit = 1 bayt</h4><div class="mq-bitlar"></div><div class="mq-son"></div><div class="mq-yig"></div></div>' +
    '<div class="mq-p"><span class="ust">2-qism · mantiqiy element</span><h4 class="mq-dn"></h4><div class="mq-darv"><div class="mq-kir"><span class="mq-sw" data-k="A"><i></i>A</span><span class="mq-sw" data-k="B"><i></i>B</span></div><div class="mq-rasm" style="flex:1"></div><div class="mq-chiq"></div></div><table class="mq-jad"></table><div class="mq-fx"></div></div>';
  const bitlar = wrap.querySelector('.mq-bitlar');
  for(let i = 7; i >= 0; i--){ const b = document.createElement('div'); b.className = 'mq-bit'; b.dataset.i = i; b.innerHTML = '<span>2<sup>' + i + '</sup></span><div class="l">0</div><span>' + (1 << i) + '</span>'; b.onclick = ()=>{ sonQ ^= (1 << i); bitYoz(true); }; bitlar.append(b); }
  function bitYoz(yub){
    wrap.querySelectorAll('.mq-bit').forEach(b=>{ const on = (sonQ >> +b.dataset.i) & 1; b.classList.toggle('on', !!on); b.querySelector('.l').textContent = on; });
    const ikk = sonQ.toString(2).padStart(8, '0');
    wrap.querySelector('.mq-son').innerHTML = '<div><span>O‘nlik</span><b>' + sonQ + '</b></div><div><span>Ikkilik</span><b style="font-size:16px">' + ikk.slice(0, 4) + ' ' + ikk.slice(4) + '</b></div><div><span>O‘n oltilik</span><b>' + sonQ.toString(16).toUpperCase().padStart(2, '0') + '</b></div>';
    const q = []; for(let i = 7; i >= 0; i--) if((sonQ >> i) & 1) q.push(1 << i);
    wrap.querySelector('.mq-yig').innerHTML = q.length ? q.join(' + ') + ' = <em>' + sonQ + '</em>' : 'Barcha bitlar 0 → son 0. Chiroqni bosing.';
    izoh.innerHTML = '<b>' + sonQ + ' = ' + ikk.replace(/^0+(?=.)/, '') + '₂.</b> Har bir bit o‘z o‘rnining og‘irligiga (2 ning darajasi) ega; yoniq bitlar og‘irliklari yig‘indisi — o‘nlik son. 8 bit bilan 0 dan 255 gacha — 256 ta son yoziladi.';
    if(yub) hodisa('bit', {son:sonQ});
  }
  function darvYoz(yub){
    const d = DARVOZA[tur], y = d.bir ? d.f(A) : d.f(A, B);
    wrap.querySelector('.mq-dn').textContent = d.nom + ' — ' + d.uz;
    wrap.querySelectorAll('.mq-sw').forEach(s=>{ const v = s.dataset.k === 'A' ? A : B; s.classList.toggle('on', !!v); s.classList.toggle('yoq', d.bir && s.dataset.k === 'B'); s.lastChild.textContent = s.dataset.k + ' = ' + v; });
    wrap.querySelector('.mq-rasm').innerHTML = darvozaSvg(tur, A, B, y);
    const ch = wrap.querySelector('.mq-chiq'); ch.classList.toggle('on', !!y); ch.textContent = y;
    const qator = d.bir ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
    wrap.querySelector('.mq-jad').innerHTML = '<tr>' + (d.bir ? '<th>A</th>' : '<th>A</th><th>B</th>') + '<th>' + d.belgi + '</th></tr>' +
      qator.map(r=>{ const v = d.bir ? d.f(r[0]) : d.f(r[0], r[1]); const j = d.bir ? r[0] === A : (r[0] === A && r[1] === B); return '<tr class="' + (j ? 'joriy' : '') + '">' + r.map(x=>'<td>' + x + '</td>').join('') + '<td class="' + (v ? 'y1' : '') + '">' + v + '</td></tr>'; }).join('');
    wrap.querySelector('.mq-fx').innerHTML = {AND:'Chiqish 1 bo‘ladi, faqat <b>ikkala</b> kirish 1 bo‘lsa. Ketma-ket ulangan ikki kalit kabi.', OR:'Chiqish 1 bo‘ladi, <b>kamida bitta</b> kirish 1 bo‘lsa. Parallel ulangan ikki kalit kabi.', NOT:'Chiqish kirishning <b>teskarisi</b>: 1 → 0, 0 → 1.', XOR:'Chiqish 1 bo‘ladi, kirishlar <b>har xil</b> bo‘lsa. Ikkilik sonlarni qo‘shishda (yarim qo‘shuvchi) ishlatiladi.'}[tur];
    tag.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('faol', b.dataset.d === tur));
    if(yub) hodisa('darvoza', {darvoza:tur, a:A, b:d.bir ? 0 : B, y});
  }
  wrap.querySelectorAll('.mq-sw').forEach(s=>s.onclick = ()=>{ if(s.dataset.k === 'A') A ^= 1; else B ^= 1; darvYoz(true); });
  /* klaviatura: Tab bilan tanlab, Enter/Probel bilan bosiladi */
  wrap.querySelectorAll('.mq-bit,.mq-sw').forEach(x=>{ x.setAttribute('role', 'button'); x.tabIndex = 0; if(x.dataset.i) x.setAttribute('aria-label', (1 << +x.dataset.i) + ' og‘irlikli bit'); x.onkeydown = e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); x.click(); } }; });
  tag.innerHTML = Object.keys(DARVOZA).map(k=>'<button data-d="' + k + '">' + DARVOZA[k].nom + '</button>').join('') + '<span class="tag-ajr"></span><button data-s="-1">−1</button><button data-s="1">+1</button><button data-s="0">0</button><button data-s="r">Tasodifiy son</button>';
  tag.querySelectorAll('[data-d]').forEach(b=>b.onclick = ()=>{ tur = b.dataset.d; darvYoz(true); });
  tag.querySelectorAll('[data-s]').forEach(b=>b.onclick = ()=>{ const s = b.dataset.s; sonQ = s === '0' ? 0 : s === 'r' ? Math.floor(Math.random() * 256) : (sonQ + +s + 256) % 256; bitYoz(true); });
  const api = {
    holat(h){ if(!h) return; if(h.son !== undefined){ sonQ = Math.max(0, Math.min(255, +h.son | 0)); bitYoz(false); } if(h.darvoza && DARVOZA[h.darvoza]){ tur = h.darvoza; darvYoz(false); } },
    tikla(){ sonQ = 0; A = B = 0; bitYoz(false); darvYoz(false); },
    qotir(){},
    yopish(){ wrap.remove(); const x = window._sahnalar; if(x && x.get(sahna) === api) x.delete(sahna); },
    qiymat(){ return {son:sonQ, tur, A, B}; }
  };
  royxatla(sahna, api);
  yorliq('Informatika · raqamli mantiq');
  bitYoz(false); darvYoz(false);
  return api;
}

/* ==================== 3. 3D davriy jadval ==================== */
const TURKUM = {
  ishqoriy:['Ishqoriy metallar', '#ff7a6b'], ishqoriy_yer:['Ishqoriy-yer metallar', '#ffb24d'], otish:['O‘tish metallari', '#e7c95a'],
  boshqa_metall:['Boshqa metallar', '#8fd18a'], yarimmetall:['Yarim metallar', '#4fd1c5'], nometall:['Nometallar', '#5cc8ff'],
  galogen:['Galogenlar', '#8f9dff'], inert:['Inert (nodir) gazlar', '#c58cff'], lantanoid:['Lantanoidlar', '#ff8fc7'], aktinoid:['Aktinoidlar', '#ff9e9e']
};
function elJoy(e){
  if(e.t === 'lantanoid' && e.z >= 57 && e.z <= 71) return {x:2 + (e.z - 57), y:8.6};
  if(e.t === 'aktinoid' && e.z >= 89 && e.z <= 103) return {x:2 + (e.z - 89), y:9.6};
  return {x:e.g - 1, y:e.p - 1};
}
function davriy3D(sahna, tag, izoh, yorliq, o){
  uslub();
  const EL = window.MAKON_ELEMENT || [];
  const T = THREE;
  const S = window.MAKON3D.sahna(sahna, {rx:.62, ry:0, avto:false, fov:30, env:.6, rxMin:.05, rxMax:1.3, ryMin:-.9, ryMax:.9, zoom:1.02});
  const g = S.g;
  S.sc.add(new T.AmbientLight(0xffffff, .35));
  const kun = new T.DirectionalLight(0xffffff, 1.1); kun.position.set(-6, 14, 10); S.sc.add(kun);
  const kun2 = new T.DirectionalLight(0x9fb4ff, .45); kun2.position.set(8, 6, -6); S.sc.add(kun2);
  const OX = -8.5, OZ = -4.6;
  // taglik
  const taglik = new T.Mesh(new T.BoxGeometry(19.6, .12, 11.8), new T.MeshStandardMaterial({color:0x121833, roughness:.9, metalness:.1}));
  taglik.position.set(0, -.08, .45); g.add(taglik);
  const qopqoq = [];
  const yuzT = e=>{
    const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
    x.fillStyle = TURKUM[e.t] ? TURKUM[e.t][1] : '#9aa3c7'; x.fillRect(0, 0, 128, 128);
    const gr = x.createLinearGradient(0, 0, 128, 128); gr.addColorStop(0, 'rgba(255,255,255,.28)'); gr.addColorStop(1, 'rgba(0,0,0,.18)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    x.fillStyle = '#0b0f1f'; x.font = '700 22px Inter, sans-serif'; x.textBaseline = 'top'; x.fillText(e.z, 9, 8);
    x.font = '800 ' + (e.b.length > 2 ? 40 : 52) + 'px "Plus Jakarta Sans", Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(e.b, 64, 68);
    x.font = '600 14px Inter, sans-serif'; x.fillText(String(e.m).replace('.', ','), 64, 110);
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t;
  };
  const BOX = new T.BoxGeometry(.9, 1, .9); BOX.translate(0, .5, 0);
  EL.forEach(e=>{
    const j = elJoy(e); const rang = new T.Color(TURKUM[e.t] ? TURKUM[e.t][1] : '#9aa3c7').convertSRGBToLinear();
    const yon = new T.MeshStandardMaterial({color:rang, roughness:.45, metalness:.15});
    const ust = new T.MeshStandardMaterial({map:yuzT(e), roughness:.5, metalness:.05});
    yon.userData.env = ust.userData.env = 1;
    const m = new T.Mesh(BOX, [yon, yon, ust, yon, yon, yon]);
    m.position.set(OX + j.x, 0, OZ + j.y); m.scale.y = .22;
    m.userData = {nom:e.b, el:e, h:.22, hk:.22, asl:rang.clone()};
    g.add(m); qopqoq.push(m);
  });
  // yorliqlar: davr va guruh raqamlari
  const matnSprite = (s, rang)=>{ const k = s.length > 3 ? 3 : 1; const c = document.createElement('canvas'); c.width = 64 * k; c.height = 64; const x = c.getContext('2d'); x.fillStyle = rang || 'rgba(200,208,240,.75)'; x.font = '700 30px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 32 * k, 34); const t = new T.CanvasTexture(c); const sp = new T.Sprite(new T.SpriteMaterial({map:t, transparent:true, depthWrite:false})); sp.scale.set(.55 * k, .55, 1); return sp; };
  for(let p = 1; p <= 7; p++){ const s = matnSprite(String(p)); s.position.set(OX - .95, .15, OZ + p - 1); g.add(s); }
  for(let gg = 1; gg <= 18; gg++){ const s = matnSprite(String(gg)); const minY = gg === 1 ? 0 : gg === 2 || gg >= 13 ? (gg === 18 ? 0 : 1) : 3; s.position.set(OX + gg - 1, .15, OZ + minY - .95); g.add(s); }
  const ll = matnSprite('La–Lu', '#ff8fc7'); ll.position.set(OX + .55, .15, OZ + 8.6); g.add(ll);
  const aa = matnSprite('Ac–Lr', '#ff9e9e'); aa.position.set(OX + .55, .15, OZ + 9.6); g.add(aa);
  // DOM: legenda, karta, ustida
  const leg = document.createElement('div'); leg.className = 'dj-leg'; sahna.append(leg);
  const QISQA_T = {ishqoriy:'Ishqoriy', ishqoriy_yer:'Ishqoriy-yer', otish:'O‘tish', boshqa_metall:'Boshqa metall', yarimmetall:'Yarim metall', nometall:'Nometall', galogen:'Galogen', inert:'Inert gaz', lantanoid:'Lantanoid', aktinoid:'Aktinoid'};
  leg.innerHTML = Object.keys(TURKUM).map(k=>'<button data-o="' + k + '" title="' + TURKUM[k][0] + '"><i style="background:' + TURKUM[k][1] + '"></i>' + QISQA_T[k] + '</button>').join('');
  const kar = document.createElement('div'); kar.className = 'dj-kar'; sahna.append(kar);
  const ust = document.createElement('div'); ust.className = 'dj-ust'; sahna.append(ust);
  let rejim = (o && o.rejim) || 'turkum', oila = null, tanl = null;
  const REJIM = {turkum:'Turkumlar', massa:'Atom massasi', em:'Elektromanfiylik'};
  function balandlik(e){
    if(rejim === 'massa') return .22 + (+e.m || 0) / 300 * 3.2;
    if(rejim === 'em') return e.em == null ? .08 : .22 + e.em / 4 * 3;
    return .22;
  }
  function yangila(){
    qopqoq.forEach(m=>{
      const e = m.userData.el; let h = balandlik(e);
      const xira = oila && e.t !== oila;
      if(tanl === e.b) h += .5;
      m.userData.hk = h;
      m.material.forEach(mt=>{ mt.transparent = !!xira; mt.opacity = xira ? .18 : 1; mt.depthWrite = !xira; });
      m.material[0].emissive = m.material[0].emissive || new T.Color();
      m.material[0].emissive.setHex(tanl === e.b ? 0x333344 : 0);
    });
    leg.querySelectorAll('button').forEach(b=>b.classList.toggle('faol', b.dataset.o === oila));
    tag.querySelectorAll('[data-r]').forEach(b=>b.classList.toggle('faol', b.dataset.r === rejim));
  }
  function kartaYoz(e){
    if(!e){ kar.classList.remove('on'); return; }
    const tk = TURKUM[e.t] || ['—', '#9aa3c7'];
    kar.innerHTML = '<div class="bosh"><div class="bl" style="background:' + tk[1] + '"><small>' + e.z + '</small>' + e.b + '</div><div><h5>' + e.n + '</h5><div class="t">' + tk[0] + '</div></div></div>' +
      '<table><tr><td>Tartib raqami (Z)</td><td>' + e.z + '</td></tr><tr><td>Atom massasi</td><td>' + String(e.m).replace('.', ',') + '</td></tr><tr><td>Davr · guruh</td><td>' + e.p + ' · ' + (e.t === 'lantanoid' || e.t === 'aktinoid' ? '3 (f-blok)' : e.g) + '</td></tr>' +
      '<tr><td>Elektron konfig.</td><td>' + (e.e || '—') + '</td></tr><tr><td>Elektromanfiylik</td><td>' + (e.em == null ? '—' : String(e.em).replace('.', ',')) + '</td></tr><tr><td>25 °C da</td><td>' + (e.h || '—') + '</td></tr><tr><td>Kashf etilgan</td><td>' + (e.y || 'qadimdan') + '</td></tr></table>' +
      (e.q ? '<p>' + e.q + '</p>' : '') + '<button class="x" aria-label="Yopish">×</button>';
    kar.querySelector('.x').onclick = ()=>{ tanl = null; kartaYoz(null); yangila(); };
    kar.classList.add('on');
  }
  function tanla(b, yub){
    const e = EL.find(x=>x.b === b); tanl = e ? e.b : null; kartaYoz(e); yangila();
    if(e){
      izoh.innerHTML = '<b>' + e.n + ' (' + e.b + ')</b> — Z = ' + e.z + ', ' + e.p + '-davr, ' + (TURKUM[e.t] ? TURKUM[e.t][0].toLowerCase() : '') + '. Proton soni = Z = ' + e.z + '; neytronlar soni ≈ A − Z (eng ko‘p tarqalgan izotop uchun).';
      if(yub) hodisa('element', {b:e.b, z:e.z, g:e.g, p:e.p, t:e.t, m:e.m, em:e.em, h:e.h});
    }
  }
  function tagChiz(){
    tag.innerHTML = Object.keys(REJIM).map(k=>'<button data-r="' + k + '">' + REJIM[k] + '</button>').join('') + '<span class="tag-ajr"></span><button data-x>Tanlovni tozalash</button>';
    tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ rejim = b.dataset.r; yangila(); izoh.innerHTML = {turkum:'Rang — element turkumi. Oila tugmasini bosing — shu oila ajratiladi.', massa:'Ustun balandligi — atom massasi. Davr bo‘ylab chapdan o‘ngga va yuqoridan pastga massa ortadi.', em:'Ustun balandligi — Pauling elektromanfiyligi. Eng balandi — ftor (3,98), o‘ng yuqori burchak; inert gazlarning ko‘pida qiymat yo‘q (past kulrang).'}[rejim]; });
    tag.querySelector('[data-x]').onclick = ()=>{ oila = null; tanl = null; kartaYoz(null); yangila(); };
  }
  leg.querySelectorAll('button').forEach(b=>b.onclick = ()=>{ oila = oila === b.dataset.o ? null : b.dataset.o; yangila(); hodisa('oila', {t:oila}); });
  S.bosish = d=>{ if(d.el) tanla(d.el.b, true); };
  S.ustida = (d, ob)=>{
    if(d && d.el){ ust.style.display = 'block'; ust.textContent = d.el.z + ' · ' + d.el.b + ' — ' + d.el.n; }
    else ust.style.display = 'none';
  };
  S.el.addEventListener('pointermove', e=>{ const r = sahna.getBoundingClientRect(); ust.style.left = (e.clientX - r.left) + 'px'; ust.style.top = (e.clientY - r.top) + 'px'; });
  S.el.addEventListener('pointerleave', ()=>{ ust.style.display = 'none'; });
  S.holat = h=>{
    if(!h) return;
    if(h.rejim && REJIM[h.rejim]) rejim = h.rejim;
    if(h.oila !== undefined) oila = TURKUM[h.oila] ? h.oila : null;
    if(h.element) tanla(h.element, false); else yangila();
  };
  S.kadrda = dt=>{
    qopqoq.forEach(m=>{ const d = m.userData.hk - m.scale.y; if(Math.abs(d) > .002) m.scale.y += d * Math.min(1, dt * 8); });
  };
  S.qiymat = ()=>({rejim, oila, tanl});
  const yopAsl = S.yopish; S.yopish = ()=>{ leg.remove(); kar.remove(); ust.remove(); yopAsl(); };
  S.joyla(8.6, new T.Vector3(0, 0, .3));
  yorliq('Kimyo · 3D davriy jadval (' + EL.length + ' element)');
  tagChiz(); yangila();
  izoh.innerHTML = 'Elementni bosing — ma’lumot kartasi chiqadi. Yuqoridagi rejimlar: turkum, atom massasi, elektromanfiylik. Sichqoncha bilan aylantiring.';
  if(o && (o.element || o.oila)) S.holat(o);
  return S;
}

window.MAKON3D = Object.assign(window.MAKON3D || {}, {funksiya2D, mantiq2D, davriy3D, TURKUM});
})();
