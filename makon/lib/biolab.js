/* MAKON — virtual biologiya laboratoriyasi: yorug‘lik mikroskopi (v3.19, guruh bl).
   2D canvas: okulyar ×10, obyektivlar ×4/×10/×40, makro/mikro-vint (xiralik), yorug‘lik, diafragma,
   preparatlar javoni (protsedurali chizmalar, o‘lchamlar mkm da — lib/biolab_malumot.js).
   Boshqaruv: chapda javon (preparatni bosing → stolchaga), o‘ngda amallar paneli, pastda yo‘riq qatori.
   Natija: localStorage makon:biolab {kashf:{'preparat:qism':1, 'mikroskop:qism':1}, top:{id:1}, yordam, xato}.
   Sinov API: window._biolab. Eksport: window.MAKON_BIOLAB = {och(idish, preparatId), yopish()}. */
(function(){
'use strict';
const D = window.MAKON_BIOLAB_MALUMOT;
const KALIT = 'makon:biolab';
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const son = (x, k)=>(Math.round(x * Math.pow(10, k)) / Math.pow(10, k)).toFixed(k).replace('.', ',');
const cheg = (x, a, b)=>Math.max(a, Math.min(b, x));
const holatOl = ()=>{ let s = {}; try{ s = JSON.parse(localStorage.getItem(KALIT) || '{}'); }catch(e){} return {kashf:s.kashf || {}, top:s.top || {}, yordam:s.yordam || 0, xato:s.xato || 0}; };
const holatYoz = s=>{ try{ localStorage.setItem(KALIT, JSON.stringify(s)); }catch(e){} };
/* takrorlanuvchi tasodif (mulberry32) — chizma har safar bir xil */
function rng(seed){ let a = seed >>> 0; return ()=>{ a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const IK = {
  javon:'<path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/>', mikroskop:'<path d="M9 3h4l1 9h-6z"/><path d="M12 12v4"/><path d="M6 20h12"/><path d="M8 20a5 5 0 0 1 9-3"/><circle cx="12" cy="17" r="1"/>',
  daftar:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>', yordam:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
  ekran:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', yop:'<path d="M6 6l12 12M18 6L6 18"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  ok:'<path d="M5 12l4 4L19 6"/>', ogoh:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>'
};
const ui = (n, w)=>`<svg viewBox="0 0 24 24" width="${w || 18}" height="${w || 18}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IK[n] || ''}</svg>`;

/* ================= preparat chizmalari (koordinata mkm) ================= */
/* har biri: {tile, chiz(ctx, t, obj, st), qism(lx, ly, obj, st) → id|null, dinamik} — tile koordinatasida [0,tile) */
const CHIZMA = {
  piyoz(){
    const T = 1000, r = rng(11), katak = [];
    for(let row = 0; row < 10; row++){
      const x0 = (row % 2) * 120, n = 4, b = [x0];
      for(let k = 1; k < n; k++) b.push(x0 + k * 250 + (r() - .5) * 60);
      b.push(x0 + T);
      for(let k = 0; k < n; k++){ const w = b[k + 1] - b[k]; katak.push({x:b[k], y:row * 100, w, h:100, nx:b[k] + w * (.3 + r() * .4), ny:row * 100 + 30 + r() * 40, nr:9 + r() * 3, nk:r() * 6.28, d:r()}); }
    }
    function hujayra(ctx, c, obj, st, dx){
      const x = c.x + dx, boy = st.boyalgan;
      ctx.fillStyle = boy ? 'rgba(214,176,90,.16)' : 'rgba(222,214,180,.07)'; ctx.fillRect(x, c.y, c.w, c.h);
      /* vakuola — biroz ochroq o‘rta qism */
      ctx.fillStyle = boy ? 'rgba(255,240,200,.14)' : 'rgba(255,255,255,.05)'; ctx.fillRect(x + 12, c.y + 12, c.w - 24, c.h - 24);
      if(obj >= 10){ /* sitoplazma donachalari */
        const g = rng(Math.round(c.d * 1e6));
        ctx.fillStyle = boy ? 'rgba(150,100,30,.35)' : 'rgba(120,120,110,.18)';
        for(let i = 0; i < 14; i++){ const px = x + 4 + g() * (c.w - 8), py = c.y + 4 + g() * (c.h - 8); if(px - x > 10 && x + c.w - px > 10 && py - c.y > 10 && c.y + c.h - py > 10) continue; ctx.beginPath(); ctx.arc(px, py, 1.3, 0, 7); ctx.fill(); }
      }
      /* yadro */
      ctx.save(); ctx.translate(c.nx + dx, c.ny); ctx.rotate(c.nk);
      ctx.fillStyle = boy ? 'rgba(184,134,42,.9)' : 'rgba(200,200,190,.1)'; ctx.beginPath(); ctx.ellipse(0, 0, c.nr, c.nr * .78, 0, 0, 7); ctx.fill();
      if(boy){ ctx.fillStyle = 'rgba(120,80,20,.9)'; ctx.beginPath(); ctx.arc(c.nr * .25, -c.nr * .1, 2.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(-c.nr * .3, c.nr * .2, 1.6, 0, 7); ctx.fill(); }
      else if(obj >= 10){ ctx.strokeStyle = 'rgba(180,180,170,.22)'; ctx.lineWidth = 1; ctx.stroke(); }
      ctx.restore();
      /* devor */
      ctx.strokeStyle = boy ? 'rgba(120,85,30,.85)' : 'rgba(130,120,90,.7)'; ctx.lineWidth = 3; ctx.strokeRect(x, c.y, c.w, c.h);
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1; ctx.strokeRect(x + 1.5, c.y + 1.5, c.w - 3, c.h - 3);
    }
    return {tile:T, dinamik:false,
      chiz(ctx, t, obj, st){ katak.forEach(c=>{ hujayra(ctx, c, obj, st, 0); if(c.x + c.w > T) hujayra(ctx, c, obj, st, -T); }); },
      qism(lx, ly, obj, st){
        const c = katak.find(c=>ly >= c.y && ly < c.y + c.h && ((lx >= c.x && lx < c.x + c.w) || (lx + T >= c.x && lx + T < c.x + c.w)));
        if(!c) return null; const x = lx >= c.x ? lx : lx + T;
        const dk = Math.min(x - c.x, c.x + c.w - x, ly - c.y, c.y + c.h - ly);
        if(dk < 6) return 'devor';
        const dx = x - c.nx, dy = ly - c.ny; if(dx * dx + dy * dy < (c.nr + 5) * (c.nr + 5)) return st.boyalgan ? 'yadro' : 'yadro?';
        if(dk < 16) return 'sitoplazma';
        return 'vakuola';
      }};
  },
  qon(){
    const T = 200, r = rng(23), el = [];
    const bosh = (x, y, rad)=>el.every(e=>{ const dx = e.x - x, dy = e.y - y; return dx * dx + dy * dy > (e.r + rad + 1) * (e.r + rad + 1); });
    for(let i = 0; i < 2500 && el.filter(e=>e.t === 'eritrotsit').length < 190; i++){ const x = r() * T, y = r() * T; if(bosh(x, y, 3.8)) el.push({t:'eritrotsit', x, y, r:3.8, k:r()}); }
    for(let i = 0; i < 60 && el.filter(e=>e.t === 'leykotsit').length < 1; i++){ const x = 30 + r() * (T - 60), y = 30 + r() * (T - 60); if(bosh(x, y, 6.5)) el.push({t:'leykotsit', x, y, r:6.5, k:r()}); }
    for(let i = 0; i < 400 && el.filter(e=>e.t === 'trombotsit').length < 14; i++){ const x = r() * T, y = r() * T; if(bosh(x, y, 1.5)) el.push({t:'trombotsit', x, y, r:1.5, k:r()}); }
    return {tile:T, dinamik:false,
      chiz(ctx, t, obj){
        if(obj <= 4){ /* ×4 da alohida hujayra ajralmaydi — surtma bir tekis qizg‘ish */ ctx.fillStyle = 'rgba(226,120,115,.55)'; ctx.fillRect(0, 0, T, T); ctx.fillStyle = 'rgba(120,70,160,.5)'; el.filter(e=>e.t === 'leykotsit').forEach(e=>ctx.fillRect(e.x - 4, e.y - 4, 8, 8)); return; }
        el.forEach(e=>{
          if(e.t === 'eritrotsit'){
            ctx.fillStyle = '#d9666a'; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 7); ctx.fill();
            ctx.fillStyle = 'rgba(245,170,165,.85)'; ctx.beginPath(); ctx.arc(e.x, e.y, e.r * .5, 0, 7); ctx.fill();
            ctx.strokeStyle = 'rgba(170,50,60,.5)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 7); ctx.stroke();
          } else if(e.t === 'leykotsit'){
            ctx.fillStyle = 'rgba(214,200,235,.9)'; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 7); ctx.fill();
            ctx.fillStyle = '#5b3a8c';
            for(let i = 0; i < 3; i++){ const a = e.k * 6.28 + i * 2.1; ctx.beginPath(); ctx.ellipse(e.x + Math.cos(a) * 2.6, e.y + Math.sin(a) * 2.6, 2.6, 2, a, 0, 7); ctx.fill(); }
            if(obj >= 40){ ctx.fillStyle = 'rgba(120,60,160,.35)'; for(let i = 0; i < 12; i++){ const a = i * .52 + e.k, rr = 3 + (i % 3); ctx.beginPath(); ctx.arc(e.x + Math.cos(a) * rr, e.y + Math.sin(a) * rr, .5, 0, 7); ctx.fill(); } }
          } else { ctx.fillStyle = 'rgba(130,80,170,.85)'; ctx.beginPath(); ctx.ellipse(e.x, e.y, 1.5, 1.1, e.k * 3, 0, 7); ctx.fill(); }
        });
      },
      qism(lx, ly, obj){
        let eng = null, dm = 1e9; el.forEach(e=>{ const dx = e.x - lx, dy = e.y - ly, d = Math.sqrt(dx * dx + dy * dy) - e.r; if(d < dm){ dm = d; eng = e; } });
        if(!eng || dm > (obj >= 40 ? 3 : 8)) return null;
        if(eng.t === 'trombotsit' && obj < 40) return null;
        return eng.t;
      }, el};
  },
  ogizcha(){
    const T = 500, r = rng(37), og = [];
    for(let i = 0; i < 4; i++) og.push({x:60 + (i % 2) * 250 + r() * 130, y:60 + Math.floor(i / 2) * 250 + r() * 130, a:r() * 3.14, ochiq:.6 + r() * .4});
    const w = (v, k)=>10 * Math.sin(v * 6.283 * k / T);
    return {tile:T, dinamik:false,
      chiz(ctx, t, obj){
        ctx.fillStyle = 'rgba(190,220,170,.08)'; ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = 'rgba(70,110,60,.7)'; ctx.lineWidth = 2.2;
        for(let i = 0; i <= 5; i++){
          ctx.beginPath(); for(let x = 0; x <= T; x += 6){ const y = i * 100 + w(x, 6) + w(x, 2) * .5; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
          ctx.beginPath(); for(let y = 0; y <= T; y += 6){ const x = i * 100 + w(y, 5) - w(y, 3) * .5; y ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        }
        og.forEach(o=>{
          ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.a);
          /* atrofidagi epidermisni tozalash */
          ctx.fillStyle = 'rgba(205,228,190,.9)'; ctx.beginPath(); ctx.ellipse(0, 0, 32, 26, 0, 0, 7); ctx.fill();
          /* yopuvchi hujayralar (loviyasimon) */
          [-1, 1].forEach(s=>{ ctx.fillStyle = 'rgba(120,190,110,.85)'; ctx.beginPath(); ctx.ellipse(0, s * 9 * o.ochiq, 22, 8.5, 0, 0, 7); ctx.fill();
            ctx.strokeStyle = 'rgba(40,90,40,.8)'; ctx.lineWidth = 1.6; ctx.stroke();
            if(obj >= 10){ ctx.fillStyle = 'rgba(30,120,40,.9)'; for(let i = 0; i < 7; i++){ ctx.beginPath(); ctx.arc(-15 + i * 5, s * 9 * o.ochiq + (i % 2 ? 2 : -2), 1.6, 0, 7); ctx.fill(); } } });
          /* yoriq */
          ctx.fillStyle = 'rgba(40,60,40,.75)'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 3.2 * o.ochiq, 0, 0, 7); ctx.fill();
          ctx.restore();
        });
      },
      qism(lx, ly, obj){
        for(const o of og){ const dx = lx - o.x, dy = ly - o.y, c = Math.cos(-o.a), s = Math.sin(-o.a), x = dx * c - dy * s, y = dx * s + dy * c;
          if((x / 15) ** 2 + (y / (3.5 * o.ochiq + 1.5)) ** 2 < 1) return 'yoriq';
          if(Math.abs(x) < 24 && Math.abs(y) < 20) return 'yopuvchi'; }
        return obj >= 10 ? 'epidermis' : null;
      }};
  },
  elodeya(){
    const T = 600, CW = 120, CH = 30, r = rng(53), hj = [];
    for(let c = 0; c < 5; c++) for(let row = 0; row < 20; row++){
      const x = c * CW, y = row * CH, n = 16 + Math.floor(r() * 6), xl = [], yon = r() < .5 ? 1 : -1, P = 2 * (CW - 10) + 2 * (CH - 10);
      for(let i = 0; i < n; i++) xl.push({s:r() * P, v:(14 + r() * 10) * yon, rr:2.4 + r() * .6});
      hj.push({x, y, xl, P});
    }
    const joy = (h, s)=>{ const a = CW - 10, b = CH - 10; s = ((s % h.P) + h.P) % h.P; let px, py;
      if(s < a){ px = s; py = 0; } else if(s < a + b){ px = a; py = s - a; } else if(s < 2 * a + b){ px = a - (s - a - b); py = b; } else { px = 0; py = b - (s - 2 * a - b); }
      return [h.x + 5 + px, h.y + 5 + py]; };
    return {tile:T, dinamik:true,
      chiz(ctx, t, obj, st){
        hj.forEach(h=>{
          ctx.fillStyle = obj <= 4 ? 'rgba(90,170,80,.55)' : 'rgba(170,215,150,.22)'; ctx.fillRect(h.x, h.y, CW, CH);
          ctx.strokeStyle = 'rgba(60,110,50,.8)'; ctx.lineWidth = 1.8; ctx.strokeRect(h.x, h.y, CW, CH);
          if(obj <= 4) return;
          const oq = st.oqim ? t : 0;
          ctx.fillStyle = 'rgba(40,150,60,.95)';
          h.xl.forEach(x=>{ const [px, py] = joy(h, x.s + x.v * oq); ctx.beginPath(); ctx.ellipse(px, py, x.rr, x.rr * .75, 0, 0, 7); ctx.fill(); });
        });
      },
      qism(lx, ly, obj, st, t){
        const h = hj.find(h=>lx >= h.x && lx < h.x + CW && ly >= h.y && ly < h.y + CH); if(!h) return null;
        const dk = Math.min(lx - h.x, h.x + CW - lx, ly - h.y, h.y + CH - ly);
        if(obj >= 10){ const oq = st.oqim ? t : 0; for(const x of h.xl){ const [px, py] = joy(h, x.s + x.v * oq); const dx = px - lx, dy = py - ly; if(dx * dx + dy * dy < (x.rr + 2.5) ** 2) return 'xloroplast'; } }
        if(dk < 3) return 'devor';
        return obj >= 40 ? 'oqim' : null;
      }};
  },
  tufelka(){
    const r = rng(71), R = 2300, tf = [];
    for(let i = 0; i < 8; i++) tf.push({x:(r() - .5) * 3000, y:(r() - .5) * 3000, a:r() * 6.28, v:45 + r() * 40, L:100 + r() * 50, w:.3 + r() * .1, f:r() * 6.28, bur:0});
    const chang = []; for(let i = 0; i < 300; i++) chang.push([(r() - .5) * 5000, (r() - .5) * 5000, 1 + r() * 3]);
    function tana(ctx, p, obj, t){
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      const L = p.L, W = L * p.w;
      if(obj >= 10){ /* kiprikchalar */
        ctx.strokeStyle = 'rgba(120,150,190,.55)'; ctx.lineWidth = 1;
        for(let i = 0; i < 44; i++){ const th = i / 44 * 6.283, ex = Math.cos(th) * L, ey = Math.sin(th) * W, nx = Math.cos(th) * W, ny = Math.sin(th) * L, nl = Math.hypot(nx, ny), s = 10 + 3 * Math.sin(t * 9 + i * .7); ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + nx / nl * s, ey + ny / nl * s); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(190,210,235,.55)'; ctx.beginPath(); ctx.ellipse(0, 0, L, W, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(90,120,160,.9)'; ctx.lineWidth = 2; ctx.stroke();
      /* og‘iz chuqurchasi */
      ctx.strokeStyle = 'rgba(80,100,140,.8)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-L * .3, W * .95); ctx.quadraticCurveTo(L * .1, W * .4, L * .25, W * .1); ctx.stroke();
      if(obj >= 10){
        /* katta yadro */
        ctx.fillStyle = 'rgba(110,100,170,.8)'; ctx.beginPath(); ctx.ellipse(-L * .05, -W * .1, L * .22, W * .42, .4, 0, 7); ctx.fill();
        ctx.fillStyle = 'rgba(70,60,130,.9)'; ctx.beginPath(); ctx.arc(L * .12, -W * .35, 5, 0, 7); ctx.fill();
        /* qisqaruvchi vakuolalar (pulslanadi) */
        [[-L * .62, 0], [L * .6, 0]].forEach(([vx, vy], k)=>{ const pz = .5 + .5 * Math.sin(t * .9 + k * 2 + p.f), rr = 5 + pz * 7; ctx.strokeStyle = 'rgba(60,90,140,.9)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(vx, vy, rr, 0, 7); ctx.stroke();
          ctx.fillStyle = 'rgba(230,240,255,.9)'; ctx.fill();
          for(let i = 0; i < 6; i++){ const a = i * 1.047; ctx.beginPath(); ctx.moveTo(vx + Math.cos(a) * rr, vy + Math.sin(a) * rr); ctx.lineTo(vx + Math.cos(a) * (rr + 9), vy + Math.sin(a) * (rr + 9)); ctx.stroke(); } });
        /* hazm vakuolalari */
        ctx.fillStyle = 'rgba(150,160,120,.7)'; for(let i = 0; i < 5; i++){ ctx.beginPath(); ctx.arc(-L * .4 + i * L * .2, (i % 2 ? .5 : -.55) * W, 5, 0, 7); ctx.fill(); }
      }
      ctx.restore();
    }
    return {tile:0, dinamik:true, tf,
      yangila(dt){ tf.forEach(p=>{ p.bur += (Math.random() - .5) * .12; p.bur *= .9; p.a += p.bur * dt * 3; p.x += Math.cos(p.a) * p.v * dt; p.y += Math.sin(p.a) * p.v * dt; if(Math.hypot(p.x, p.y) > R){ p.a = Math.atan2(-p.y, -p.x) + (Math.random() - .5); } }); },
      chiz(ctx, t, obj){
        ctx.fillStyle = 'rgba(150,140,110,.45)'; chang.forEach(c=>{ ctx.beginPath(); ctx.arc(c[0], c[1], c[2], 0, 7); ctx.fill(); });
        tf.forEach(p=>tana(ctx, p, obj, t));
      },
      qism(lx, ly, obj){
        for(const p of tf){ const dx = lx - p.x, dy = ly - p.y, c = Math.cos(-p.a), s = Math.sin(-p.a), x = dx * c - dy * s, y = dx * s + dy * c, L = p.L, W = L * p.w;
          const u = (x / L) ** 2 + (y / W) ** 2; if(u > 1.35) continue;
          if(u > .8) return 'kiprik';
          if(obj < 10) return 'tana';
          if(Math.hypot(x + L * .62, y) < 18 || Math.hypot(x - L * .6, y) < 18) return 'qvakuola';
          if(((x + L * .05) / (L * .24)) ** 2 + ((y + W * .1) / (W * .46)) ** 2 < 1) return 'yadro';
          if(y > W * .25 && x > -L * .35 && x < L * .3) return 'ogiz';
          return 'tana'; }
        return null;
      }};
  },
  bakteriya(){
    const T = 100, r = rng(91), b = [];
    for(let i = 0; i < 26; i++) b.push({t:'tayoqcha', x:r() * T, y:r() * T, a:r() * 3.14, l:1.6 + r() * 1.2});
    for(let i = 0; i < 4; i++){ const x = r() * T, y = r() * T, a = r() * 3.14; for(let k = 0; k < 5; k++) b.push({t:'kokk', x:x + Math.cos(a) * k * 1.05, y:y + Math.sin(a) * k * 1.05}); }
    return {tile:T, dinamik:false,
      chiz(ctx, t, obj){
        if(obj < 10) return;
        ctx.fillStyle = 'rgba(40,70,170,.85)'; ctx.strokeStyle = 'rgba(20,40,120,.9)'; ctx.lineWidth = .15;
        b.forEach(e=>{ if(e.t === 'tayoqcha'){ ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.a); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-e.l / 2, -.25, e.l, .5, .25) : ctx.rect(-e.l / 2, -.25, e.l, .5); ctx.fill(); ctx.restore(); } else { ctx.beginPath(); ctx.arc(e.x, e.y, .5, 0, 7); ctx.fill(); } });
      },
      qism(lx, ly, obj){ if(obj < 40) return null; let eng = null, dm = 9; b.forEach(e=>{ const d = Math.hypot(e.x - lx, e.y - ly); if(d < dm){ dm = d; eng = e; } }); return eng && dm < 2.2 ? eng.t : null; }};
  }
};

/* ================= mikroskop sxemasi (SVG) ================= */
function mikroskopSVG(){
  return `<svg viewBox="0 0 380 520" class="bl-msvg" role="img" aria-label="Yorug‘lik mikroskopi sxemasi">
    <defs><linearGradient id="blMet" x1="0" x2="1"><stop offset="0" stop-color="#5c6472"/><stop offset=".5" stop-color="#b9c1cc"/><stop offset="1" stop-color="#4f5664"/></linearGradient>
    <linearGradient id="blQora" x1="0" x2="1"><stop offset="0" stop-color="#1c2030"/><stop offset=".5" stop-color="#3a4052"/><stop offset="1" stop-color="#181c28"/></linearGradient></defs>
    <g data-q="asos"><path d="M60 470 h200 a18 18 0 0 1 18 18 v12 h-236 v-12 a18 18 0 0 1 18 -18z" fill="url(#blQora)" stroke="#8d95a5" stroke-width="2"/><text x="300" y="498" class="bl-my">Asos</text></g>
    <g data-q="shtativ"><path d="M250 470 v-80 c0 -60 -20 -100 -50 -140 c-20 -28 -30 -60 -30 -90 v-30 h34 v30 c0 22 10 48 28 72 c38 50 52 92 52 158 v80z" fill="url(#blQora)" stroke="#8d95a5" stroke-width="2"/><text x="300" y="250" class="bl-my">Shtativ</text></g>
    <g data-q="kozgu"><ellipse cx="150" cy="430" rx="34" ry="12" fill="#dfe8f5" stroke="#8d95a5" stroke-width="2" transform="rotate(-18 150 430)"/><path d="M150 442 v22" stroke="#8d95a5" stroke-width="3"/><text x="40" y="455" class="bl-my">Ko‘zgu</text></g>
    <g data-q="diafragma"><circle cx="150" cy="372" r="22" fill="#2b3142" stroke="#8d95a5" stroke-width="2"/><circle cx="150" cy="372" r="8" fill="#0b0e18"/><path d="M150 350 l0 -8" stroke="#8d95a5" stroke-width="3"/><text x="40" y="392" class="bl-my">Diafragma</text></g>
    <g data-q="stolcha"><rect x="60" y="318" width="190" height="16" rx="4" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><rect x="138" y="314" width="24" height="24" rx="3" fill="#0b0e18"/><path d="M80 318 v-10 h40 M180 318 v-10 h40" fill="none" stroke="#c9d0da" stroke-width="3"/><rect x="100" y="312" width="100" height="6" rx="2" fill="#e8f1ff" opacity=".85"/><text x="20" y="312" class="bl-my">Predmet stolchasi</text></g>
    <g data-q="obyektiv"><path d="M150 232 l-34 20 v30 h16 v-24z" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><path d="M150 232 l34 20 v30 h-16 v-24z" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><rect x="140" y="240" width="20" height="64" rx="4" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><rect x="142" y="262" width="16" height="4" fill="#d63a2f"/><rect x="120" y="258" width="12" height="3" fill="#f2c230" transform="rotate(-30 126 259)"/><rect x="168" y="258" width="12" height="3" fill="#2f9e4f" transform="rotate(30 174 259)"/><text x="196" y="300" class="bl-my">Obyektivlar ×4 ×10 ×40</text></g>
    <g data-q="revolver"><ellipse cx="150" cy="228" rx="52" ry="14" fill="url(#blQora)" stroke="#8d95a5" stroke-width="2"/><text x="212" y="226" class="bl-my">Revolver</text></g>
    <g data-q="tubus"><rect x="132" y="70" width="36" height="150" rx="6" fill="url(#blQora)" stroke="#8d95a5" stroke-width="2"/><text x="60" y="150" class="bl-my">Tubus</text></g>
    <g data-q="okulyar"><rect x="126" y="34" width="48" height="40" rx="8" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><ellipse cx="150" cy="34" rx="20" ry="5" fill="#dfe8f5"/><text x="60" y="56" class="bl-my">Okulyar ×10</text></g>
    <g data-q="makro"><circle cx="262" cy="330" r="26" fill="url(#blQora)" stroke="#8d95a5" stroke-width="2"/><text x="296" y="320" class="bl-my">Makro-vint</text></g>
    <g data-q="mikro"><circle cx="262" cy="330" r="11" fill="url(#blMet)" stroke="#8d95a5" stroke-width="2"/><text x="296" y="346" class="bl-my">Mikro-vint</text></g>
  </svg>`;
}

/* ================= asosiy ================= */
function och(idish, boshId){
  const xar = window._sahnalar; const eski = xar && xar.get(idish); if(eski) eski.yopish();
  idish.innerHTML = `<div class="bl">
    <div class="bl-tepa">
      <div class="bl-tc">
        <button class="bl-t" data-a="javon">${ui('javon')}<span>Preparatlar</span></button>
        <button class="bl-t asosiy" data-a="mikroskop">${ui('mikroskop')}<span>Mikroskop qismlari</span></button>
        <button class="bl-t" data-a="daftar">${ui('daftar')}<span>Daftar</span><em class="bl-kashf"></em></button>
      </div>
      <div class="bl-jami" title="Bajarilgan topshiriqlar"></div>
      <div class="bl-to">
        <button class="bl-t ik" data-a="yordam" title="Yordam">${ui('yordam')}</button>
        <button class="bl-t ik" data-a="ekran" title="To‘liq ekran">${ui('ekran')}</button>
      </div>
    </div>
    <div class="bl-asosiy">
      <aside class="bl-javon">
        <div class="bj-bosh"><b>Preparatlar javoni</b><span>Bosing → stolchaga qo‘yiladi</span></div>
        <div class="bj-royxat"></div>
        <p class="bj-maslahat"><b>i</b> — preparat haqida va o‘lchamlar · ${ui('ogoh', 12)} chizma sxematik, o‘lchamlar manbaga yaqin</p>
      </aside>
      <div class="bl-sahna">
        <div class="bl-korish"><canvas class="bl-canvas" aria-label="Mikroskop ko‘rish maydoni"></canvas><svg class="bl-mikrometr" viewBox="0 0 1000 1000" aria-hidden="true"></svg><div class="bl-bosh-yoz"></div></div>
        <div class="bl-surish" role="group" aria-label="Preparatni surish"><button data-s="0,-1" aria-label="Yuqoriga">▲</button><button data-s="-1,0" aria-label="Chapga">◀</button><button data-s="1,0" aria-label="O‘ngga">▶</button><button data-s="0,1" aria-label="Pastga">▼</button></div>
        <div class="bl-korsat"></div>
        <div class="bl-xabar" role="status" aria-live="polite"></div>
        <div class="bl-rejim"></div>
      </div>
      <aside class="bl-panel">
        <section class="bl-q bl-boshq"></section>
        <section class="bl-q bl-karta"></section>
        <section class="bl-q bl-top"></section>
        <section class="bl-q bl-xavf"><h4>Xavfsizlik</h4>${D.XAVFSIZLIK.map(x=>'<p>' + x + '</p>').join('')}<small>${esc(D.QOIDA_MANBA)}</small></section>
      </aside>
    </div>
    <div class="bl-qoplama"></div>
  </div>`;
  const ildiz = idish.firstElementChild, $ = s=>ildiz.querySelector(s), $$ = s=>[...ildiz.querySelectorAll(s)];
  const holat = holatOl();
  const st = {prep:null, chizma:null, obj:4, makro:30, mikro:50, yorug:60, diaf:3, sx:0, sy:0, boyalgan:false, oqim:true, mikrometr:false, tayyor:{}, makro40:false, tegdi:false, elodeyaT:0, t:0, sessiya:{qism:{}}};
  let yopildi = false, xabarT = 0, kadr = 0, oldin = performance.now(), tinglovchi = [];
  const hodisa = h=>tinglovchi.forEach(f=>{ try{ f(h); }catch(e){} });
  const saqla = ()=>holatYoz(holat);
  const tor = ()=>ildiz.clientWidth <= 1000;
  const xabar = (m, tur)=>{ const x = $('.bl-xabar'); x.innerHTML = m; x.className = 'bl-xabar kor ' + (tur || ''); clearTimeout(xabarT); xabarT = setTimeout(()=>x.classList.remove('kor'), 4200); };
  const FOK = ()=>D.FOKUS[st.obj];
  const z = ()=>st.makro + st.mikro / 10;
  const tiniqlik = ()=>{ const f = FOK(), d = Math.max(0, Math.abs(z() - f.nuqta) - f.chuqur * .5); return cheg(1 - d / (f.chuqur * 3), 0, 1); };
  const fov = ()=>D.FN * 1000 / st.obj;        /* mkm */
  const bolinma = ()=>D.MIKROMETR.uzunlik * 1000 / D.MIKROMETR.bolinma / st.obj;   /* mkm / bo‘linma */
  const yorugK = ()=>st.yorug / 100 * Math.sqrt(st.diaf / 3) * (st.obj === 40 ? .8 : st.obj === 10 ? 1 : 1.2);
  const yorugHolat = ()=>{ const k = yorugK(); return k < .3 ? 'qorong‘i' : k > .95 ? 'juda yorug‘' : 'yaxshi'; };

  /* ---------- canvas ---------- */
  const cv = $('.bl-canvas'), cx = cv.getContext('2d'), bufer = document.createElement('canvas'), bx = bufer.getContext('2d');
  let W = 0, dpr = 1, kir = true;
  function olcham(){
    const sh = $('.bl-sahna'), cs = getComputedStyle(sh), pw = sh.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), ph = sh.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const s = Math.max(120, Math.round(Math.min(pw, tor() ? window.innerHeight * .7 : ph, 640)));
    $('.bl-korish').style.width = s + 'px';
    dpr = Math.min(2, window.devicePixelRatio || 1); W = Math.round(s * dpr); cv.width = bufer.width = W; cv.height = bufer.height = W; cv.style.width = cv.style.height = s + 'px'; kir = true; }
  function chiz(){
    if(!W) return;
    const k = yorugK(), g = cheg(k, 0, 1);
    bx.setTransform(1, 0, 0, 1, 0, 0); bx.clearRect(0, 0, W, W);
    bx.fillStyle = `rgb(${Math.round(60 + 195 * g)},${Math.round(58 + 192 * g)},${Math.round(50 + 180 * g)})`; bx.fillRect(0, 0, W, W);
    if(st.prep && st.chizma){
      const s = W / fov(), ch = st.chizma;
      bx.save(); bx.translate(W / 2, W / 2); bx.scale(s, s); bx.translate(-st.sx, -st.sy);
      bx.globalAlpha = cheg(.35 + g * .8, 0, 1);
      if(ch.tile){
        const T = ch.tile, half = fov() / 2, i0 = Math.floor((st.sx - half) / T), i1 = Math.floor((st.sx + half) / T), j0 = Math.floor((st.sy - half) / T), j1 = Math.floor((st.sy + half) / T);
        for(let i = i0; i <= i1; i++) for(let j = j0; j <= j1; j++){ bx.save(); bx.translate(i * T, j * T); ch.chiz(bx, st.t, st.obj, st); bx.restore(); }
      } else ch.chiz(bx, st.t, st.obj, st);
      bx.restore();
    }
    /* juda yorug‘ — oqarib ketadi */
    if(k > .95){ bx.fillStyle = `rgba(255,255,250,${cheg((k - .95) * 4, 0, .85)})`; bx.fillRect(0, 0, W, W); }
    /* diafragma qisilganda chetlar qorayadi */
    const vg = bx.createRadialGradient(W / 2, W / 2, W * (.25 + st.diaf * .08), W / 2, W / 2, W * .5); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${cheg(.75 - st.diaf * .14, .05, .7)})`);
    bx.fillStyle = vg; bx.fillRect(0, 0, W, W);
    cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, W, W);
    cx.save(); cx.beginPath(); cx.arc(W / 2, W / 2, W / 2 - 1, 0, 7); cx.clip();
    const b = (1 - tiniqlik()) * 16 * dpr; cx.filter = b > .3 ? `blur(${b.toFixed(1)}px)` : 'none';
    cx.drawImage(bufer, 0, 0); cx.filter = 'none'; cx.restore();
    kir = false;
  }
  function mikrometrChiz(){
    const sv = $('.bl-mikrometr'); if(!st.mikrometr || !st.prep){ sv.innerHTML = ''; sv.style.display = 'none'; return; }
    sv.style.display = '';
    const L = 1000 * D.MIKROMETR.uzunlik / D.FN, x0 = 500 - L / 2, n = D.MIKROMETR.bolinma;
    let s = `<line x1="${x0}" y1="500" x2="${x0 + L}" y2="500" class="mk-l"/>`;
    for(let i = 0; i <= n; i++){ const x = x0 + L * i / n, h = i % 10 ? (i % 5 ? 10 : 16) : 26; s += `<line x1="${x}" y1="${500 - h}" x2="${x}" y2="500" class="mk-l"/>`; if(i % 10 === 0) s += `<text x="${x}" y="${500 - h - 8}" class="mk-t">${i}</text>`; }
    s += `<text x="${x0 + L}" y="540" class="mk-t mk-i">1 bo‘linma = ${son(bolinma(), 1)} mkm (×${st.obj})</text>`;
    sv.innerHTML = s;
  }

  /* ---------- ko‘rsatkichlar, yo‘riq ---------- */
  function korsat(){
    const q = $('.bl-korsat'), tn = Math.round(tiniqlik() * 100), yh = yorugHolat();
    q.innerHTML = `<div><span>Kattalashtirish</span><b>×${D.OKULYAR} · ×${st.obj} = ×${D.OKULYAR * st.obj}</b></div>
      <div><span>Ko‘rish maydoni</span><b>${son(fov() / 1000, 2)} mm</b></div>
      <div class="${tn >= 90 ? 'ok' : ''}"><span>Tiniqlik</span><b>${st.prep ? tn + ' %' : '—'}</b></div>
      <div class="${yh === 'yaxshi' ? 'ok' : 'xavf'}"><span>Yorug‘lik</span><b>${yh}</b></div>`;
    $('.bl-bosh-yoz').textContent = st.prep ? '' : 'Preparat qo‘yilmagan — ko‘rish maydoni bo‘sh';
  }
  function rejim(){
    const q = $('.bl-rejim'); let m;
    const tn = tiniqlik(), yh = yorugHolat();
    if(!st.prep) m = 'Boshlash: chapdagi <b>javondan preparatni bosing</b> — u stolchaga qo‘yiladi. Yoki yuqoridagi <b>Mikroskop qismlari</b>ni o‘rganing.';
    else if(yh !== 'yaxshi') m = yh === 'qorong‘i' ? 'Ko‘rish maydoni qorong‘i — o‘ngda <b>yorug‘lik</b>ni oshiring yoki diafragmani oching.' : 'Juda yorug‘ — tasvir oqarib ketadi: <b>yorug‘lik</b>ni kamaytiring yoki diafragmani qising.';
    else if(tn < .9) m = st.obj === 40 ? 'Xira. ×40 da faqat <b>mikro-vint</b> bilan fokuslang (makro-vint — xavfli).' : `Xira. <b>Makro-vint</b> bilan fokus nuqtasiga yaqinlashing${st.obj === 10 ? ', so‘ng mikro-vint bilan aniqlang' : ''}.`;
    else m = `Tiniq. <b>Qismlarni bosing</b> — karta ochiladi; tasvirni sudrab preparatni suring. ${st.obj < 40 ? 'Batafsil ko‘rish uchun <b>×' + (st.obj === 4 ? 10 : 40) + '</b> ga o‘ting.' : 'Okulyar mikrometr bilan o‘lchang.'}`;
    q.innerHTML = '<span>' + m + '</span>';
  }
  function jami(){
    const n = D.TOPSHIRIQ.filter(t=>holat.top[t.id]).length;
    $('.bl-jami').innerHTML = `<b>${n}</b>/${D.TOPSHIRIQ.length}<small>topshiriq</small>`;
    $('.bl-kashf').textContent = Object.keys(holat.kashf).length;
  }
  function topChiz(){
    $('.bl-top').innerHTML = `<h4>Topshiriqlar <span>${D.TOPSHIRIQ.filter(t=>holat.top[t.id]).length}/${D.TOPSHIRIQ.length}</span></h4>` +
      D.TOPSHIRIQ.map((t, i)=>`<div class="bl-tp ${holat.top[t.id] ? 'ok' : ''}"><i>${holat.top[t.id] ? '✓' : i + 1}</i><span><b>${t.nom}</b> · <small>${t.sinf}</small><br>${t.matn}</span></div>`).join('');
  }
  function bajar(id){
    const t = D.TOPSHIRIQ.find(x=>x.id === id); if(!t || holat.top[id] || yopildi) return;
    holat.top[id] = 1; saqla(); topChiz(); jami();
    xabar('✓ Topshiriq bajarildi: <b>' + t.nom + '</b>', 'yaxshi'); hodisa({tur:'topshiriq', id});
  }
  const xato = m=>{ holat.xato = (holat.xato || 0) + 1; saqla(); if(m) xabar(m, 'xavf'); };

  /* ---------- karta ---------- */
  function karta(k, manzil, sur){
    const q = $('.bl-karta'); if(!k){ q.innerHTML = ''; return; }
    q.innerHTML = `<span class="bk-ustki">${esc(manzil || '')}</span><h4>${esc(k.nom)}</h4>${k.sarlavha2 ? '<p class="bk-s2">' + esc(k.sarlavha2) + '</p>' : ''}
      ${k.jadval && k.jadval.length ? '<table>' + k.jadval.map(r=>'<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>').join('') + '</table>' : ''}
      <p>${k.matn}</p>${k.manba ? '<small>Manba: ' + esc(k.manba) + '</small>' : ''}`;
    if(sur && tor()) q.scrollIntoView({behavior:'smooth', block:'nearest'});
  }
  function kashf(kalit){ const yangi = !holat.kashf[kalit]; holat.kashf[kalit] = 1; saqla(); jami(); return yangi; }

  /* ---------- boshqaruv paneli ---------- */
  let makroSl, mikroSl, yorugSl, diafSl;
  function slayder(ota, nom, min, max, qadam, qiymat, fmt, yangi){
    const q = document.createElement('div'); q.className = 'bl-sl';
    q.innerHTML = `<label><span>${nom}</span><b></b></label><input type="range" min="${min}" max="${max}" step="${qadam}" value="${qiymat}" aria-label="${esc(nom.replace(/<[^>]+>/g, ''))}">`;
    const inp = q.querySelector('input'), b = q.querySelector('b'), yoz = ()=>{ b.innerHTML = fmt(+inp.value); };
    inp.oninput = ()=>{ yoz(); yangi(+inp.value); }; yoz(); ota.append(q);
    q.qoy = v=>{ inp.value = v; yoz(); yangi(+inp.value); }; q.inp = inp; return q;
  }
  function boshqQur(){
    const q = $('.bl-boshq'); q.innerHTML = '<h4>Boshqaruv</h4>';
    const ob = document.createElement('div'); ob.className = 'bl-ch';
    ob.innerHTML = `<label>Obyektiv (revolver)</label><div>${D.OBYEKTIV.map(o=>`<button data-o="${o}" class="${o === st.obj ? 'faol' : ''}">×${o}<small>×${o * D.OKULYAR}</small></button>`).join('')}</div>`;
    ob.querySelectorAll('button').forEach(b=>b.onclick = ()=>obyektiv(+b.dataset.o)); q.append(ob);
    makroSl = slayder(q, 'Makro-vint (qo‘pol fokus)', 0, 100, 1, st.makro, v=>v, v=>{ st.makro = v; if(st.obj === 40){ st.makro40 = true; if(!st.sessiya.makroOgoh){ st.sessiya.makroOgoh = 1; xato('⚠ ×40 da makro-vint ishlatilmaydi — obyektiv shishaga urilishi mumkin. Mikro-vintdan foydalaning.'); } } tegdiTekshir(); yangilandi(); });
    mikroSl = slayder(q, 'Mikro-vint (aniq fokus)', 0, 100, 1, st.mikro, v=>v, v=>{ st.mikro = v; tegdiTekshir(); yangilandi(); });
    yorugSl = slayder(q, 'Yorug‘lik (ko‘zgu / yoritgich)', 0, 100, 1, st.yorug, v=>v + ' %', v=>{ st.yorug = v; yangilandi(); });
    diafSl = slayder(q, 'Diafragma', 1, 5, 1, st.diaf, v=>['', 'eng tor', 'tor', 'o‘rta', 'keng', 'to‘liq ochiq'][v], v=>{ st.diaf = v; yangilandi(); });
    const tg = document.createElement('div'); tg.className = 'bl-tg';
    tg.innerHTML = `<button class="tg kichik o" data-a="boya">Yod tomizish</button><button class="tg kichik o" data-a="mikrometr">Okulyar mikrometr</button><button class="tg kichik o" data-a="oqim">Oqimni to‘xtatish</button><button class="tg kichik o" data-a="markaz">Markazga</button>`;
    tg.querySelector('[data-a="boya"]').onclick = boya;
    tg.querySelector('[data-a="mikrometr"]').onclick = ()=>{ st.mikrometr = !st.mikrometr; tg.querySelector('[data-a="mikrometr"]').classList.toggle('faol', st.mikrometr); mikrometrChiz(); if(st.mikrometr) xabar('Okulyar mikrometr: 100 bo‘linmali shkala. Obyektning necha bo‘linmani egallaganini sanab, «O‘lchash» qatoriga yozing.'); };
    tg.querySelector('[data-a="oqim"]').onclick = ()=>{ st.oqim = !st.oqim; tg.querySelector('[data-a="oqim"]').textContent = st.oqim ? 'Oqimni to‘xtatish' : 'Oqimni yurgizish'; xabar(st.oqim ? 'Sitoplazma oqimi (iliq, yorug‘ sharoit).' : 'Oqim to‘xtadi — sovuq yoki qorong‘i sharoitda shunday bo‘ladi.'); };
    tg.querySelector('[data-a="markaz"]').onclick = ()=>{ st.sx = st.sy = 0; yangilandi(); };
    q.append(tg);
    const ol = document.createElement('div'); ol.className = 'bl-kir';
    ol.innerHTML = `<label for="blOlch">O‘lchash: obyekt necha bo‘linma?</label><div><input id="blOlch" type="number" min="0" step="1" inputmode="numeric" placeholder="bo‘linma"><button class="tg o kichik">O‘lchash</button></div><p class="bl-kn"></p>`;
    ol.querySelector('button').onclick = ()=>olchash(parseFloat(ol.querySelector('input').value.replace(',', '.')));
    q.append(ol);
    const hs = document.createElement('div'); hs.className = 'bl-kir';
    hs.innerHTML = `<label for="blHisob">Hisob: javobni yozing (topshiriq 5, 12)</label><div><input id="blHisob" type="text" inputmode="decimal" placeholder="masalan 400 yoki 0,45"><button class="tg o kichik">Tekshirish</button></div><p class="bl-kn"></p>`;
    hs.querySelector('button').onclick = ()=>hisob(hs.querySelector('input').value);
    q.append(hs);
    tugmaHolat();
  }
  function tugmaHolat(){
    const q = $('.bl-boshq'); if(!q.children.length) return;
    const p = st.prep;
    q.querySelector('[data-a="boya"]').style.display = p && p.boyash === 'yod' && !st.boyalgan ? '' : 'none';
    q.querySelector('[data-a="oqim"]').style.display = p && p.id === 'elodeya' ? '' : 'none';
    q.querySelectorAll('.bl-kir').forEach(x=>x.style.display = p ? '' : 'none');
    q.querySelector('[data-a="mikrometr"]').style.display = p ? '' : 'none';
    q.querySelector('[data-a="markaz"]').style.display = p ? '' : 'none';
  }
  function obyektiv(o){
    if(o === st.obj) return;
    if(o === 40 && st.obj === 4) xabar('Maslahat: ×4 dan to‘g‘ri ×40 ga o‘tmang — avval ×10 da obyektni markazga keltiring. (Ilovada ruxsat etiladi.)');
    st.obj = o; st.makro40 = false;
    if(o === 40) st.sessiya.oqimT = 0;
    $$('.bl-ch [data-o]').forEach(b=>b.classList.toggle('faol', +b.dataset.o === o));
    tegdiTekshir(); mikrometrChiz(); yangilandi();
    hodisa({tur:'obyektiv', obj:o});
  }
  function tegdiTekshir(){
    const chegara = st.obj === 40 ? 70 : st.obj === 10 ? 82 : 101;
    if(z() > chegara){ if(!st.tegdi){ st.tegdi = true; xato('⚠ Obyektiv preparatga TEGDI — haqiqiy mikroskopda qoplag‘ich oynacha sinadi va linza shikastlanadi! Tubusni ko‘taring (makro-vintni kamaytiring).'); $('.bl-korish').classList.add('tegdi'); } }
    else if(st.tegdi){ st.tegdi = false; $('.bl-korish').classList.remove('tegdi'); }
  }
  function boya(){
    if(!st.prep || st.prep.boyash !== 'yod' || st.boyalgan) return;
    st.boyalgan = true; tugmaHolat(); yangilandi();
    xabar('Yod eritmasi tomizildi: yadro va sitoplazma sariq-jigarrang bo‘yaldi — endi yadro ko‘rinadi. (Yod terini bo‘yaydi — tomchi bilan ishlang.)', 'yaxshi');
    hodisa({tur:'boyash', preparat:st.prep.id});
  }
  function olchash(n){
    const p = $('.bl-boshq .bl-kir .bl-kn');
    if(!st.prep){ xabar('Avval preparat qo‘ying.'); return; }
    if(!st.mikrometr){ xabar('Avval «Okulyar mikrometr»ni yoqing.'); return; }
    if(!isFinite(n) || n <= 0){ xabar('Bo‘linmalar sonini kiriting (masalan 25).'); return; }
    const mkm = n * bolinma();
    p.innerHTML = `${n} bo‘linma × ${son(bolinma(), 1)} mkm = <b>${son(mkm, 1)} mkm</b> (×${st.obj})`;
    hodisa({tur:'olchov', preparat:st.prep.id, mkm, obj:st.obj});
    if(tiniqlik() < .7){ xabar('Tasvir xira — o‘lchov ishonchsiz. Avval fokuslang.'); return; }
    if(st.prep.id === 'piyoz' && st.obj === 10){ if(mkm >= 170 && mkm <= 330){ bajar('b6'); xabar(`Hujayra uzunligi ≈ <b>${son(mkm, 0)} mkm</b> — manbadagi 200–300 mkm bilan mos.`, 'yaxshi'); } else { xato(`Natija ${son(mkm, 0)} mkm — piyoz hujayrasi odatda 200–300 mkm. Bitta hujayraning ikki uzun devori orasini sanang.`); } }
    else if(st.prep.id === 'qon' && st.obj === 40){ if(mkm >= 5 && mkm <= 10){ bajar('b7'); xabar(`Eritrotsit diametri ≈ <b>${son(mkm, 1)} mkm</b> — manbadagi 7–8 mkm bilan mos.`, 'yaxshi'); } else { xato(`Natija ${son(mkm, 1)} mkm — eritrotsit 7–8 mkm. Bitta eritrotsit ≈ 3 bo‘linma (×40 da 1 bo‘linma = 2,5 mkm).`); } }
    else xabar(`O‘lchov yozildi: ${son(mkm, 1)} mkm.`);
  }
  function hisob(v){
    const p = $$('.bl-boshq .bl-kir .bl-kn')[1], x = parseFloat(String(v).replace(',', '.'));
    if(!isFinite(x)){ xabar('Son kiriting.'); return; }
    const H = D.HISOB;
    if(Math.abs(x - H.b5.javob) <= H.b5.chegara){ p.innerHTML = '<b>To‘g‘ri:</b> ' + H.b5.izoh; bajar('b5'); return; }
    if(Math.abs(x - H.b12.javob) <= H.b12.chegara){
      if(st.prep && st.prep.id === 'bakteriya' && st.obj === 40 && tiniqlik() >= .85){ p.innerHTML = '<b>To‘g‘ri:</b> ' + H.b12.izoh; bajar('b12'); }
      else { p.innerHTML = 'Hisob to‘g‘ri (' + H.b12.izoh + '), lekin 12-topshiriq uchun avval <b>bakteriya</b> preparatini ×40 da tiniq fokuslang.'; }
      return;
    }
    xato('Javob mos kelmadi. Umumiy kattalashtirish = okulyar × obyektiv; ko‘rish maydoni = 18 mm / obyektiv.');
    p.innerHTML = 'Mos kelmadi — qayta hisoblang.';
  }

  /* ---------- javon ---------- */
  function javonChiz(){
    $('.bj-royxat').innerHTML = D.PREPARAT.map(p=>`<div class="bj-k ${st.prep && st.prep.id === p.id ? 'faol' : ''}" data-p="${p.id}" tabindex="0" role="button">
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><rect x="3" y="12" width="34" height="16" rx="2" fill="#dfe8f5" opacity=".85"/><rect x="12" y="10" width="16" height="20" rx="1" fill="${p.rang}" opacity=".8"/><rect x="5" y="14" width="8" height="12" fill="#fff" opacity=".5"/></svg>
      <div class="bj-n"><b>${esc(p.nom)}</b><small>${esc(p.sinf)} · ${esc(p.qisqa)}</small></div>
      <button class="bj-i" data-i="${p.id}" title="Batafsil" aria-label="${esc(p.nom)} haqida">i</button>
      ${st.tayyor[p.id] || p.tayyor ? '<span class="bj-ok" title="Tayyor">✓</span>' : ''}</div>`).join('');
    $$('.bj-k').forEach(k=>{ k.onclick = e=>{ if(e.target.closest('.bj-i')) return; preparatTanla(k.dataset.p); }; k.onkeydown = e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); preparatTanla(k.dataset.p); } }; });
    $$('.bj-i').forEach(b=>b.onclick = ()=>{ const p = D.PREPARAT.find(x=>x.id === b.dataset.i); karta({nom:p.nom + ' (' + p.lotin + ')', sarlavha2:p.qisqa, jadval:p.olcham, matn:p.tavsif, manba:p.manba}, 'Preparat · ' + p.sinf); });
  }
  function preparatTanla(id){
    const p = D.PREPARAT.find(x=>x.id === id); if(!p) return;
    if(p.tayyor || st.tayyor[id]) { preparatQoy(p); return; }
    tayyorlashOch(p);
  }
  function preparatQoy(p){
    st.prep = p; st.chizma = CHIZMA[p.id](); st.sx = st.sy = 0; st.boyalgan = false; st.tegdi = false; st.sessiya.oqimT = 0;
    $('.bl-korish').classList.remove('tegdi');
    if(st.obj !== 4){ st.obj = 4; $$('.bl-ch [data-o]').forEach(b=>b.classList.toggle('faol', +b.dataset.o === 4)); }
    javonChiz(); tugmaHolat(); mikrometrChiz(); yangilandi();
    karta({nom:p.nom, sarlavha2:p.qisqa, jadval:p.olcham, matn:p.tavsif, manba:p.manba}, 'Stolchada · ' + p.sinf);
    xabar(`<b>${esc(p.nom)}</b> stolchaga qo‘yildi. ×4 dan boshlang: makro-vint bilan fokuslang.`);
    hodisa({tur:'preparat', id:p.id});
    try{ history.replaceState(null, '', '#/biolab/' + p.id); }catch(e){}
    tekshirJavon();
  }
  function javonOchYop(){ if(tor()){ $('.bl-javon').scrollIntoView({behavior:'smooth', block:'start'}); return; } ildiz.classList.toggle('javon-yopiq'); setTimeout(olchamYangila, 300); }

  /* ---------- qoplama: tayyorlash (tartib), mikroskop, daftar, yordam ---------- */
  const qop = $('.bl-qoplama');
  function qoplamaYop(){ qop.classList.remove('kor'); qop.innerHTML = ''; }
  qop.onclick = e=>{ if(e.target === qop) qoplamaYop(); };
  function tayyorlashOch(p){
    const togri = p.tayyorlash, r = rng(Date.now() & 0xffff), aralash = togri.map((m, i)=>({m, i})).sort(()=>r() - .5);
    let keyingi = 0, xatolar = 0;
    qop.classList.add('kor');
    qop.innerHTML = `<div class="bl-oyna shisha" role="dialog" aria-label="Preparat tayyorlash"><button class="bl-yop" aria-label="Yopish">${ui('yop')}</button><span class="ustki">Preparat tayyorlash · ${esc(p.sinf)}</span><h2>${esc(p.nom)}</h2>
      <p class="bl-oi">Qadamlarni <b>to‘g‘ri tartibda</b> bosing. Xato bosilsa — sanaladi, lekin davom etasiz.</p>
      <div class="bl-tartib"><div class="bt-qol">${aralash.map(a=>`<button data-i="${a.i}">${esc(a.m)}</button>`).join('')}</div><ol class="bt-tayyor"></ol></div>
      <div class="bl-oyna-tg"><button class="tg a bt-qoy" disabled>Stolchaga qo‘yish</button></div></div>`;
    qop.querySelector('.bl-yop').onclick = qoplamaYop;
    const qol = qop.querySelector('.bt-qol'), tay = qop.querySelector('.bt-tayyor'), qoy = qop.querySelector('.bt-qoy');
    qol.querySelectorAll('button').forEach(b=>b.onclick = ()=>{
      if(+b.dataset.i === keyingi){ b.remove(); const li = document.createElement('li'); li.textContent = togri[keyingi]; tay.append(li); keyingi++;
        if(keyingi === togri.length){ st.tayyor[p.id] = 1; qoy.disabled = false; qoy.focus(); if(p.id === 'piyoz') bajar('b2'); xabar(xatolar ? `Preparat tayyor (${xatolar} ta xato bilan).` : 'Preparat tayyor — xatosiz!', xatolar ? '' : 'yaxshi'); hodisa({tur:'tayyor', id:p.id, xato:xatolar}); } }
      else { xatolar++; b.classList.add('xato'); setTimeout(()=>b.classList.remove('xato'), 500); xato(`Bu qadam hali emas. Keyingi qadam: «${togri[keyingi]}».`); }
    });
    qoy.onclick = ()=>{ qoplamaYop(); preparatQoy(p); };
  }
  function mikroskopOch(){
    qop.classList.add('kor');
    qop.innerHTML = `<div class="bl-oyna shisha bl-mik" role="dialog" aria-label="Mikroskop qismlari"><button class="bl-yop" aria-label="Yopish">${ui('yop')}</button><span class="ustki">Yorug‘lik mikroskopi</span><h2>Qismlarni bosing</h2>
      <div class="bl-mik-ich">${mikroskopSVG()}<div class="bl-mik-k"><p class="bl-oi">Sxematik chizma. Umumiy kattalashtirish = okulyar × obyektiv. Ko‘rish maydoni = 18 mm / obyektiv.</p><div class="bl-mik-karta"><p class="bl-oi">Qismni bosing — ma’lumot shu yerda chiqadi.</p></div><div class="bl-mik-top"></div></div></div></div>`;
    qop.querySelector('.bl-yop').onclick = qoplamaYop;
    const kj = qop.querySelector('.bl-mik-karta'), tp = qop.querySelector('.bl-mik-top');
    const B1 = ['okulyar', 'obyektiv', 'stolcha', 'makro', 'kozgu'];
    const topYoz = ()=>{ tp.innerHTML = '1-topshiriq: ' + B1.map(k=>`<span class="${holat.kashf['mikroskop:' + k] ? 'ok' : ''}">${D.QISM[k].nom.split(' (')[0]}</span>`).join(' · '); };
    topYoz();
    qop.querySelectorAll('[data-q]').forEach(g=>{ g.setAttribute('tabindex', 0); g.setAttribute('role', 'button');
      const bos = ()=>{ const k = D.QISM[g.dataset.q]; qop.querySelectorAll('[data-q]').forEach(x=>x.classList.toggle('faol', x === g));
        kj.innerHTML = `<h4>${esc(k.nom)}</h4><p class="bk-s2">${esc(k.sarlavha2)}</p>${k.jadval.length ? '<table>' + k.jadval.map(r=>'<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>').join('') + '</table>' : ''}<p>${k.matn}</p><small>Manba: ${esc(k.manba)}</small>`;
        kashf('mikroskop:' + g.dataset.q); karta(k, 'Mikroskop qismi'); topYoz();
        if(B1.every(x=>holat.kashf['mikroskop:' + x])) bajar('b1');
        hodisa({tur:'qism', manzil:'mikroskop', id:g.dataset.q}); };
      g.onclick = bos; g.onkeydown = e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); bos(); } }; });
  }
  function daftarOch(){
    qop.classList.add('kor');
    const k = Object.keys(holat.kashf), prep = D.PREPARAT.filter(p=>k.some(x=>x.startsWith(p.id + ':')));
    qop.innerHTML = `<div class="bl-oyna shisha" role="dialog" aria-label="Daftar"><button class="bl-yop" aria-label="Yopish">${ui('yop')}</button><span class="ustki">Laboratoriya daftari</span><h2>Kashfiyotlar va natija</h2>
      <div class="bl-kpi"><div><b>${D.TOPSHIRIQ.filter(t=>holat.top[t.id]).length}<small>/${D.TOPSHIRIQ.length}</small></b><span>topshiriq</span></div><div><b>${k.length}</b><span>kashf etilgan qism</span></div><div><b>${prep.length}<small>/${D.PREPARAT.length}</small></b><span>preparat o‘rganildi</span></div><div><b>${holat.xato || 0}</b><span>xato</span></div></div>
      ${prep.map(p=>`<div class="bl-df"><b>${esc(p.nom)}</b><span>${Object.keys(p.qismlar).filter(q=>holat.kashf[p.id + ':' + q]).map(q=>esc(p.qismlar[q].nom)).join(' · ') || '—'}</span></div>`).join('')}
      <div class="bl-df"><b>Mikroskop qismlari</b><span>${Object.keys(D.QISM).filter(q=>holat.kashf['mikroskop:' + q]).map(q=>esc(D.QISM[q].nom.split(' (')[0])).join(' · ') || '—'}</span></div>
      <p class="bl-oi">Natija shu kompyuterda saqlanadi (o‘qituvchi paneli o‘qiydi). <button class="tg o kichik bl-toz">Natijani tozalash</button></p></div>`;
    qop.querySelector('.bl-yop').onclick = qoplamaYop;
    qop.querySelector('.bl-toz').onclick = ()=>{ holat.kashf = {}; holat.top = {}; holat.xato = 0; saqla(); topChiz(); jami(); qoplamaYop(); xabar('Natija tozalandi.'); };
  }
  function yordamOch(){
    qop.classList.add('kor');
    qop.innerHTML = `<div class="bl-oyna shisha" role="dialog"><button class="bl-yop" aria-label="Yopish">${ui('yop')}</button><span class="ustki">MAKON · virtual biologiya laboratoriyasi</span><h2>Mikroskop bilan uch qadamda</h2>
      <div class="y-qadam"><div><i>1</i><b>Preparat qo‘ying</b><span>Chapdagi javondan preparatni bosing. Piyoz, barg, elodeya, tufelka — avval tayyorlash qadamlarini to‘g‘ri tartibda bosasiz; qon va bakteriya — tayyor preparat.</span></div>
      <div><i>2</i><b>Fokuslang</b><span>×4 dan boshlang: makro-vint bilan tiniq qiling, yorug‘likni sozlang. ×10 ga, so‘ng ×40 ga o‘ting — ×40 da faqat mikro-vint! Tasvirni sudrab preparatni suring.</span></div>
      <div><i>3</i><b>O‘rganing</b><span>Tiniq tasvirda qismlarni bosing — karta ochiladi. Okulyar mikrometr bilan o‘lchang, «Hisob» qatoriga javob yozing. O‘ngdagi topshiriqlar ro‘yxati o‘zi belgilanadi.</span></div></div>
      <p class="y-bosh">Haqiqiy mikroskopda preparatni o‘ngga sursangiz tasvir <b>chapga</b> ketadi va tasvir teskari ko‘rinadi — ilovada qulaylik uchun to‘g‘ri yo‘nalishda. Chizmalar sxematik, o‘lchamlar manbalardagi diapazonga yaqin. Pastdagi qator doim keyingi qadamni aytadi.</p>
      <button class="b-ol">Boshlash</button></div>`;
    const yop = ()=>{ holat.yordam = 1; saqla(); qoplamaYop(); };
    qop.querySelector('.b-ol').onclick = yop; qop.querySelector('.bl-yop').onclick = yop;
  }

  /* ---------- bosish va sudrash ---------- */
  let sudr = null;
  cv.addEventListener('pointerdown', e=>{ sudr = {x:e.clientX, y:e.clientY, sx:st.sx, sy:st.sy, yurdi:false}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e=>{ if(!sudr) return; const dx = e.clientX - sudr.x, dy = e.clientY - sudr.y; if(Math.hypot(dx, dy) > 4) sudr.yurdi = true; if(sudr.yurdi && st.prep){ const s = (W / dpr) / fov(); st.sx = sudr.sx - dx / s; st.sy = sudr.sy - dy / s; yangilandi(); } });
  cv.addEventListener('pointerup', e=>{ if(!sudr) return; const y = sudr.yurdi; sudr = null; if(!y) bosish(e); });
  cv.addEventListener('pointercancel', ()=>{ sudr = null; });
  $$('.bl-surish button').forEach(b=>b.onclick = ()=>{ const [dx, dy] = b.dataset.s.split(',').map(Number); st.sx += dx * fov() * .25; st.sy += dy * fov() * .25; yangilandi(); });
  function bosish(e){
    if(!st.prep) { xabar('Avval javondan preparat qo‘ying.'); return; }
    const r = cv.getBoundingClientRect(), s = r.width / fov();
    const wx = st.sx + (e.clientX - r.left - r.width / 2) / s, wy = st.sy + (e.clientY - r.top - r.height / 2) / s;
    bos(wx, wy);
  }
  function bos(wx, wy){
    if(!st.prep) return null;
    if(tiniqlik() < .7){ xabar('Tasvir xira — avval fokuslang, keyin qismlarni bosing.'); return null; }
    if(yorugHolat() !== 'yaxshi'){ xabar('Yorug‘likni sozlang — qismlar ko‘rinmayapti.'); return null; }
    const ch = st.chizma, T = ch.tile || 0, lx = T ? ((wx % T) + T) % T : wx, ly = T ? ((wy % T) + T) % T : wy;
    const id = ch.qism(lx, ly, st.obj, st, st.t), p = st.prep;
    if(!id){ xabar(st.obj < 40 && p.id !== 'piyoz' ? 'Bu yerda ajratib bo‘ladigan qism yo‘q — kattaroq obyektivga o‘ting yoki boshqa joyni bosing.' : 'Bu yerda ajratib bo‘ladigan qism yo‘q.'); return null; }
    if(id === 'yadro?'){ xato('Yadro ko‘rinmayapti — bo‘yalmagan preparatda u shaffof. «Yod tomizish»ni bosing.'); return id; }
    if(id === 'tana'){ xabar('Tufelka tanasi. Ichki qismlarini ko‘rish uchun ×10/×40 ga o‘ting.'); return id; }
    const k = p.qismlar[id]; if(!k) return id;
    const yangi = kashf(p.id + ':' + id);
    karta(k, p.nom, true);
    if(yangi) xabar('Topildi: <b>' + esc(k.nom) + '</b>', 'yaxshi');
    hodisa({tur:'qism', manzil:p.id, id, obj:st.obj});
    /* topshiriqlar */
    if(p.id === 'piyoz' && id === 'yadro' && st.boyalgan && st.obj >= 10) bajar('b4');
    if(p.id === 'qon' && ['eritrotsit', 'leykotsit', 'trombotsit'].every(q=>holat.kashf['qon:' + q])) bajar('b8');
    if(p.id === 'ogizcha' && st.obj === 40 && holat.kashf['ogizcha:yopuvchi'] && holat.kashf['ogizcha:yoriq']) bajar('b9');
    if(p.id === 'elodeya' && id === 'xloroplast' && st.obj === 40 && st.oqim && st.sessiya.oqimT >= 10) bajar('b10');
    else if(p.id === 'elodeya' && id === 'xloroplast' && st.obj === 40 && st.sessiya.oqimT < 10) xabar(`Xloroplast topildi. 10-topshiriq uchun ×40 da tiniq holda kamida 10 s kuzating (hozir ${Math.round(st.sessiya.oqimT)} s).`);
    if(p.id === 'tufelka' && (id === 'qvakuola' || id === 'yadro') && st.obj === 40) bajar('b11');
    if(D.PREPARAT.filter(x=>Object.keys(x.qismlar).some(q=>holat.kashf[x.id + ':' + q])).length >= 3) bajar('b14');
    return id;
  }

  /* ---------- holat tekshiruvi (fokus topshiriqlari) ---------- */
  let tekT = 0;
  function tekshirJavon(){
    clearTimeout(tekT); tekT = setTimeout(()=>{
      if(yopildi || !st.prep) return;
      const tn = tiniqlik(), ok = tn >= .9 && yorugHolat() === 'yaxshi';
      if(ok && st.prep.id === 'piyoz' && st.obj === 4) bajar('b3');
      if(ok && st.obj === 40 && !st.makro40 && !st.tegdi) bajar('b13');
      if(ok && st.sessiya.birinchiTiniq !== st.prep.id){ st.sessiya.birinchiTiniq = st.prep.id; hodisa({tur:'tiniq', preparat:st.prep.id, obj:st.obj}); }
    }, 400);
  }
  function yangilandi(){ kir = true; korsat(); rejim(); tekshirJavon(); }

  /* ---------- kadr ---------- */
  function tik(tm){
    if(yopildi) return; kadr = requestAnimationFrame(tik);
    const dt = Math.min(.1, (tm - oldin) / 1000) * (api.tezlik || 1); oldin = tm; st.t += dt;
    const ch = st.chizma, din = ch && ch.dinamik && st.obj >= 10;
    if(din && ch.yangila) ch.yangila(dt);
    if(st.prep && st.prep.id === 'elodeya' && st.obj === 40 && st.oqim && tiniqlik() >= .85 && yorugHolat() === 'yaxshi'){ const e = st.sessiya.oqimT; st.sessiya.oqimT = e + dt; if(e < 10 && st.sessiya.oqimT >= 10) xabar('10 s kuzatildi — endi harakatlanayotgan xloroplastni bosing.', 'yaxshi'); }
    if(kir || din) chiz();
  }

  /* ---------- tepa tugmalar ---------- */
  $$('.bl-tepa [data-a]').forEach(b=>b.onclick = ()=>{ const a = b.dataset.a;
    if(a === 'javon') javonOchYop(); else if(a === 'mikroskop') mikroskopOch(); else if(a === 'daftar') daftarOch(); else if(a === 'yordam') yordamOch();
    else if(a === 'ekran'){ if(document.fullscreenElement) document.exitFullscreen(); else if(ildiz.requestFullscreen) ildiz.requestFullscreen(); } });
  document.addEventListener('keydown', escYop);
  function escYop(e){ if(e.key === 'Escape' && qop.classList.contains('kor')) qoplamaYop(); }
  let olchamT = 0; const olchamYangila = ()=>{ clearTimeout(olchamT); olchamT = setTimeout(()=>{ olcham(); chiz(); }, 60); };
  window.addEventListener('resize', olchamYangila);
  const ro = window.ResizeObserver ? new ResizeObserver(olchamYangila) : null; if(ro) ro.observe($('.bl-korish'));

  /* ---------- api ---------- */
  const api = {
    st, holat, tezlik:1, D,
    tinglash(f){ tinglovchi.push(f); },
    preparatQoy(id){ const p = D.PREPARAT.find(x=>x.id === id); if(p){ st.tayyor[id] = 1; preparatQoy(p); } },
    tayyorlashOch(id){ const p = D.PREPARAT.find(x=>x.id === id); if(p) tayyorlashOch(p); },
    obyektiv, makro(v){ makroSl.qoy(v); }, mikro(v){ mikroSl.qoy(v); }, yoruglik(v){ yorugSl.qoy(v); }, diafragma(v){ diafSl.qoy(v); },
    boya, mikrometr(v){ if(!!v !== st.mikrometr) $('.bl-boshq [data-a="mikrometr"]').click(); }, olchash, hisob, bos, surish(dx, dy){ st.sx += dx; st.sy += dy; yangilandi(); },
    mikroskopOch, daftarOch, yordamOch, qoplamaYop, tiniqlik, fov, bolinma, yorugHolat, chiz,
    qismBos(q){ mikroskopOch(); const g = qop.querySelector(`[data-q="${q}"]`); if(g) g.onclick(); },
    zoomla(){}, tikla(){ st.sx = st.sy = 0; yangilandi(); }, qotir(){},
    yopish(){ if(yopildi) return; yopildi = true; cancelAnimationFrame(kadr); clearTimeout(tekT); clearTimeout(xabarT); clearTimeout(olchamT); if(ro) ro.disconnect(); window.removeEventListener('resize', olchamYangila); document.removeEventListener('keydown', escYop); if(xar && xar.get(idish) === api) xar.delete(idish); if(window._biolab === api) delete window._biolab; idish.innerHTML = ''; }
  };
  if(xar) xar.set(idish, api);
  window._biolab = api;

  /* ---------- boshlash ---------- */
  boshqQur(); javonChiz(); topChiz(); jami(); korsat(); rejim(); mikrometrChiz();
  olcham(); chiz(); kadr = requestAnimationFrame(tik);
  if(boshId && D.PREPARAT.some(p=>p.id === boshId)){ st.tayyor[boshId] = 1; preparatQoy(D.PREPARAT.find(p=>p.id === boshId)); }
  try{ history.replaceState(null, '', '#/biolab' + (st.prep ? '/' + st.prep.id : '')); }catch(e){}
  if(!holat.yordam) yordamOch();
  return api;
}
window.MAKON_BIOLAB = {och, yopish(){ if(window._biolab) window._biolab.yopish(); }};
})();
