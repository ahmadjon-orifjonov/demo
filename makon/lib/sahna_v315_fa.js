/* MAKON v3.15 — «fa» guruhi sahnalari: fizika (molekula, Nyuton, magnit induksiya, yadro) va astronomiya
   (yulduz osmoni, tutilishlar, Quyosh tuzilishi, Somon yo‘li, Kepler qonunlari).
   Reyestr: window.MAKON_SAHNA['fa_*'] = async (sahna, {tag, izoh, yorliq}) => api. three.js r128, faqat protsedurali.
   Hodisalar: document 'makon3d' CustomEvent — tur: 'fa-...'; detal kartalari MAKON_DETAL['fa_*'] (darslar_v315_fa.js).
   Yulduz koordinatalari: Wikipedia «List of stars in …» jadvallari (Hipparcos, J2000). */
(function(){
'use strict';
if(typeof THREE === 'undefined') return;
const T = THREE;
const REG = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d||{})}));
const son = (v, k)=>{ k = k === undefined ? 1 : k; if(!isFinite(v)) return '—'; let r = (Math.round(v * Math.pow(10, k)) / Math.pow(10, k)).toFixed(k); if(/^-0(\.0+)?$/.test(r)) r = r.slice(1); return r.replace('.', ',').replace('-', '−'); };
const mingli = v=>String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const cheg = (x, a, b)=>Math.max(a, Math.min(b, x));
const TEJ = ()=>!!(window.MAKON_SIFAT && window.MAKON_SIFAT.tejam);
const RAD = Math.PI / 180;

/* ---------- umumiy yordamchilar ---------- */
function korinadi(ob){ while(ob){ if(!ob.visible) return false; ob = ob.parent; } return true; }
function tayyorla(sahna, o){
  const S = window.MAKON3D.sahna(sahna, o);
  const toza = [];
  S.toza = f=>toza.push(f);
  S.yopilganda = ()=>{ toza.splice(0).forEach(f=>{ try{ f(); }catch(e){} }); };
  return S;
}
function chiroqlar(S, k){
  k = k || 1;
  S.sc.add(new T.HemisphereLight(0xc4d2ff, 0x1a1420, .38 * k));
  const a = new T.DirectionalLight(0xffe0bc, 1.2 * k); a.position.set(5, 8, 6); S.sc.add(a);
  const b = new T.DirectionalLight(0x8fb0ff, .42 * k); b.position.set(-7, 3, 2); S.sc.add(b);
  const c = new T.DirectionalLight(0xa9c6ff, .7 * k); c.position.set(-2, 5, -8); S.sc.add(c);
}
function kanvas(w, h){ const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function tex(c, srgb){ const t = new T.CanvasTexture(c); if(srgb !== false) t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; }
function nurTex(stops){
  const [c, x] = kanvas(128, 128);
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  (stops || [[0, 'rgba(255,255,255,1)'], [.16, 'rgba(255,255,255,.85)'], [.4, 'rgba(255,255,255,.22)'], [.7, 'rgba(255,255,255,.05)'], [1, 'rgba(255,255,255,0)']]).forEach(s=>g.addColorStop(s[0], s[1]));
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  return tex(c, false);
}
function nur(t, rang, s, op, oddiy){
  const m = new T.SpriteMaterial({map:t, color:rang, transparent:true, opacity:op === undefined ? 1 : op, blending:oddiy ? T.NormalBlending : T.AdditiveBlending, depthWrite:false, toneMapped:false});
  const sp = new T.Sprite(m); sp.scale.setScalar(s); return sp;
}
function soya(w, h, op){
  const [c, x] = kanvas(256, 256);
  const g = x.createRadialGradient(128, 128, 8, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(.55, 'rgba(0,0,0,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({map:tex(c, false), transparent:true, opacity:op || .8, depthWrite:false}));
  m.rotation.x = -Math.PI / 2; return m;
}
function belgilar(S, sahna){
  const qat = document.createElement('div'); qat.className = 'fa-belgilar'; sahna.append(qat);
  const r = []; const v = new T.Vector3();
  S.toza(()=>qat.remove());
  const api = {
    korin:true, qat,
    qosh(ob, html, cls, o){ o = o || {}; const e = document.createElement('div'); e.className = 'fa-bel ' + (cls || ''); e.innerHTML = html; qat.append(e); const x = {ob, e, dx:o.dx || 0, dy:o.dy || 0, kor:true}; r.push(x); return x; },
    yangila(){
      qat.style.display = api.korin ? '' : 'none'; if(!api.korin) return;
      const w = sahna.clientWidth, h = sahna.clientHeight;
      for(const x of r){
        let ok = x.kor;
        if(ok){ if(x.ob.isObject3D){ if(!korinadi(x.ob)) ok = false; else x.ob.getWorldPosition(v); } else { v.copy(x.ob); S.g.localToWorld(v); } }
        if(ok){ v.project(S.cam); if(v.z > 1 || v.z < -1 || Math.abs(v.x) > 1.1 || Math.abs(v.y) > 1.1) ok = false; }
        if(!ok){ if(x.e.style.display !== 'none') x.e.style.display = 'none'; continue; }
        if(x.e.style.display === 'none') x.e.style.display = '';
        x.e.style.transform = 'translate(' + ((v.x + 1) / 2 * w + x.dx).toFixed(1) + 'px,' + ((1 - v.y) / 2 * h + x.dy).toFixed(1) + 'px) translate(-50%,-50%)';
      }
    }
  };
  return api;
}
function bosishUlash(S, fn){
  const ray = new T.Raycaster(), n = new T.Vector2(); let bx = null, by = null; const el = S.el;
  const nish = e=>{
    const r = el.getBoundingClientRect();
    n.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(n, S.cam);
    const h = ray.intersectObjects(S.g.children, true).filter(x=>x.object.userData.nom && !x.object.isPoints && !x.object.isLine && korinadi(x.object));
    if(!h.length) return null;
    h.sort((a, b)=>((b.object.userData.p || 0) - (a.object.userData.p || 0)) || (a.distance - b.distance));
    return h[0];
  };
  el.addEventListener('pointerdown', e=>{ bx = e.clientX; by = e.clientY; });
  el.addEventListener('click', e=>{ if(bx === null || Math.abs(e.clientX - bx) + Math.abs(e.clientY - by) > 6) return; const h = nish(e); if(h) fn(h.object.userData, h.object, h); });
  let tq = 0;
  el.addEventListener('pointermove', e=>{ if(e.buttons) return; const t = performance.now(); if(t - tq < 90) return; tq = t; const h = nish(e); el.style.cursor = h ? 'pointer' : 'grab'; });
  S.bosNom = nom=>{ let ob = null; S.g.traverse(x=>{ if(!ob && x.userData && x.userData.nom === nom) ob = x; }); if(ob) fn(ob.userData, ob, null); return !!ob; };
}
function karta(S, sahna, cls){ const k = document.createElement('div'); k.className = 'fa-karta ' + (cls || ''); sahna.append(k); S.toza(()=>k.remove()); return k; }
function UI(tag){
  return {
    tugmalar(royxat, fn, faol){
      const bs = royxat.map(([k, nom])=>{ const b = document.createElement('button'); b.innerHTML = nom; b.dataset.k = k; b.onclick = ()=>fn(k, b); tag.append(b); return b; });
      const f = k=>bs.forEach(b=>b.classList.toggle('faol', b.dataset.k === String(k)));
      if(faol !== undefined) f(faol);
      return {f, bs};
    },
    tugma(nom, fn){ const b = document.createElement('button'); b.innerHTML = nom; b.onclick = ()=>fn(b); tag.append(b); return b; },
    slayder(nom, min, max, step, val, fmt, fn){
      const l = document.createElement('label'); l.className = 'fa-sl';
      l.innerHTML = nom + ' <input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"><b></b>';
      const i = l.querySelector('input'), b = l.querySelector('b'); b.innerHTML = fmt(val);
      i.oninput = ()=>{ b.innerHTML = fmt(+i.value); fn(+i.value); };
      tag.append(l);
      return {i, qoy(v){ i.value = v; b.innerHTML = fmt(+i.value); }};
    },
    ajr(){ const s = document.createElement('span'); s.className = 'fa-ajr'; tag.append(s); }
  };
}
function strelka(rang, r){
  r = r || .055;
  const g = new T.Group();
  const m = new T.MeshStandardMaterial({color:rang, emissive:rang, emissiveIntensity:.5, roughness:.35, metalness:.1, depthTest:false});
  const sh = new T.Mesh(new T.CylinderGeometry(r, r, 1, 14), m), bo = new T.Mesh(new T.ConeGeometry(r * 2.6, r * 6, 20), m);
  sh.renderOrder = bo.renderOrder = 20;
  g.add(sh, bo); g.m = m; g.qismlar = [sh, bo];
  g.qoy = uz=>{ const k = Math.max(uz, .001); const hl = Math.min(r * 6, k * .5); sh.scale.y = Math.max(k - hl, .001); sh.position.y = (k - hl) / 2; bo.scale.y = hl / (r * 6); bo.position.y = k - hl / 2; g.visible = uz > .03; };
  g.yon = d=>{ g.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize()); };
  g.nom = nom=>{ g.qismlar.forEach(q=>{ q.userData = {nom, p:3}; }); };
  return g;
}
function yogochTex(a, b){
  const [c, x] = kanvas(512, 128);
  x.fillStyle = a; x.fillRect(0, 0, 512, 128);
  for(let i = 0; i < 60; i++){
    x.strokeStyle = 'rgba(' + b + ',' + (.08 + Math.random() * .2) + ')'; x.lineWidth = .6 + Math.random() * 2;
    x.beginPath(); let y = Math.random() * 128; x.moveTo(0, y);
    for(let k = 0; k <= 512; k += 16){ y += (Math.random() - .5) * 3; x.lineTo(k, y + Math.sin(k / 60 + i) * 2.5); }
    x.stroke();
  }
  const t = tex(c); t.wrapS = t.wrapT = T.RepeatWrapping; return t;
}
function yozuvTex(matn, o){
  o = o || {};
  const [c, x] = kanvas(o.w || 128, o.h || 128);
  if(o.fon){ x.fillStyle = o.fon; x.fillRect(0, 0, c.width, c.height); }
  x.fillStyle = o.rang || '#fff'; x.font = o.shrift || '800 88px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(matn, c.width / 2, c.height / 2 + 4);
  return tex(c);
}
function kadrUlash(S, L, fn){ S.kadrda = (dt, t)=>{ dt = Math.max(0, Math.min(.05, dt || 0)); if(fn) fn(dt, t); if(L) L.yangila(); }; }
/* oddiy psevdotasodifiy (sahna har ochilganda bir xil ko‘rinsin) */
function rng(seed){ let s = seed >>> 0 || 1; return ()=>{ s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function gauss(r){ let u = 0, v = 0; while(u === 0) u = r(); while(v === 0) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const noop = ()=>{};

/* =====================================================================
   1. MODDANING MOLEKULYAR TUZILISHI (6-sinf) — fa_molekula
   ===================================================================== */
REG.fa_molekula = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Fizika · moddaning tuzilishi · sxematik model (zarralar kattalashtirilgan)');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:.3, ry:-.3, avto:false, fov:30, zoom:1.02, rxMin:-.05, rxMax:1.25, env:.5});
  const g = S.g; chiroqlar(S);
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const B = 1.05, R = .1;
  const HOL = ['qattiq', 'suyuq', 'gaz'];
  const NOM = {qattiq:'Qattiq holat', suyuq:'Suyuq holat', gaz:'Gaz holat', diffuziya:'Diffuziya'};
  const XS = {qattiq:-2.9, suyuq:0, gaz:2.9};
  const sfera = new T.SphereGeometry(R, tejam ? 10 : 18, tejam ? 8 : 14);
  const shishaMat = new T.MeshStandardMaterial({color:0xa8c8ff, transparent:true, opacity:.07, roughness:.08, metalness:0, depthWrite:false, side:T.DoubleSide});
  const qirraMat = new T.LineBasicMaterial({color:0x8d9ee0, transparent:true, opacity:.55});
  const asosMat = new T.MeshStandardMaterial({color:0x1b2136, roughness:.55, metalness:.35});
  const polMat = new T.MeshBasicMaterial({map:nurTex([[0, 'rgba(34,40,70,1)'], [.6, 'rgba(18,22,42,1)'], [1, 'rgba(10,13,26,0)']]), transparent:true, depthWrite:false});
  const pol = new T.Mesh(new T.CircleGeometry(9, 48), polMat); pol.rotation.x = -Math.PI / 2; pol.position.y = -.2; g.add(pol);
  const zMat = new T.MeshStandardMaterial({color:0xffffff, roughness:.28, metalness:.05});
  function idish(k, x, w){
    const gr = new T.Group(); gr.position.x = x; g.add(gr);
    const kub = new T.Mesh(new T.BoxGeometry(w * 2 + .06, B * 2 + .06, B * 2 + .06), shishaMat); kub.position.y = B; kub.userData = {nom:k, p:0}; gr.add(kub);
    const q = new T.LineSegments(new T.EdgesGeometry(kub.geometry), qirraMat); q.position.y = B; gr.add(q);
    const asos = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w * 2 + .5, .18, B * 2 + .5, 3, .06) : new T.BoxGeometry(w * 2 + .5, .18, B * 2 + .5), asosMat); asos.position.y = -.1; asos.userData = {nom:k, p:0}; gr.add(asos);
    const s = soya(w * 2 + 1.6, B * 2 + 1.6, .7); s.position.y = -.195; gr.add(s);
    return gr;
  }
  function zarralar(n, rang, gr){
    const m = new T.InstancedMesh(sfera, zMat, n); m.instanceMatrix.setUsage(T.DynamicDrawUsage);
    const c = new T.Color(); for(let i = 0; i < n; i++){ c.setHex(typeof rang === 'function' ? rang(i) : rang).convertSRGBToLinear(); m.setColorAt(i, c); }
    gr.add(m); return m;
  }
  /* uch idish */
  const I = {}, Z = {};
  HOL.forEach(k=>{ I[k] = idish(k, XS[k], B); });
  L.qosh(new T.Vector3(XS.qattiq, -.45, B + .3), 'Qattiq', 'pill');
  L.qosh(new T.Vector3(XS.suyuq, -.45, B + .3), 'Suyuq', 'pill');
  L.qosh(new T.Vector3(XS.gaz, -.45, B + .3), 'Gaz', 'pill');
  const r0 = rng(7);
  /* qattiq: kristall panjara 4×4×4 */
  const panj = [], sp = 2 * R * 1.12;
  for(let i = 0; i < 4; i++) for(let j = 0; j < 4; j++) for(let k = 0; k < 4; k++) panj.push({x:(i - 1.5) * sp, y:R + .004 + j * sp, z:(k - 1.5) * sp, f:[r0() * 6.3, r0() * 6.3, r0() * 6.3]});
  Z.qattiq = zarralar(panj.length, 0x8fd3ff, I.qattiq);
  /* suyuq */
  const NS = tejam ? 46 : 64, suy = [];
  for(let i = 0; i < NS; i++) suy.push({x:(r0() - .5) * 1.8, y:R + r0() * .9, z:(r0() - .5) * 1.8, vx:gauss(r0) * .4, vy:gauss(r0) * .4, vz:gauss(r0) * .4});
  Z.suyuq = zarralar(NS, 0x3fa2ff, I.suyuq);
  /* gaz */
  const NG = tejam ? 20 : 28, gaz = [];
  for(let i = 0; i < NG; i++) gaz.push({x:(r0() - .5) * 1.8, y:R + r0() * 1.8, z:(r0() - .5) * 1.8, vx:gauss(r0), vy:gauss(r0), vz:gauss(r0)});
  Z.gaz = zarralar(NG, 0xc9ecff, I.gaz);
  /* diffuziya idishi */
  const DW = 2.3;
  const Dg = idish('diffuziya', 0, DW); Dg.visible = false;
  const tosiqMat = new T.MeshStandardMaterial({color:0xd8dff5, roughness:.3, metalness:.6, transparent:true, opacity:.85});
  const tosiq = new T.Mesh(new T.BoxGeometry(.05, B * 2, B * 2), tosiqMat); tosiq.position.y = B; tosiq.userData = {nom:'tosiq', p:2}; Dg.add(tosiq);
  const ND = tejam ? 30 : 42, dif = [];
  for(let i = 0; i < ND * 2; i++){ const qiz = i < ND; dif.push({q:qiz, x:(qiz ? -1 : 1) * (R + .05 + r0() * (DW - R * 2 - .1)), y:R + r0() * (B * 2 - R * 2), z:(r0() - .5) * (B * 2 - R * 2), vx:gauss(r0), vy:gauss(r0), vz:gauss(r0)}); }
  Z.dif = zarralar(ND * 2, i=>i < ND ? 0xff6b5e : 0x46a8ff, Dg);
  L.qosh(new T.Vector3(-DW / 2, -.45, B + .3), '<i style="background:#ff6b5e"></i>1-modda', 'pill');
  L.qosh(new T.Vector3(DW / 2, -.45, B + .3), '<i style="background:#46a8ff"></i>2-modda', 'pill');

  let harorat = 20, rejim = 'uch', muhit = 'gaz', tosiqBor = true, tosiqY = 0, aralash = 0, emitT = 0, oldAr = -1;
  const f = ()=>Math.sqrt((harorat + 273.15) / 293.15);
  const vrms = ()=>Math.sqrt(3 * 8.314 * (harorat + 273.15) / 0.028);
  const mx = new T.Matrix4();
  function devor(p, w){
    const xm = w - R, ym = B * 2 - R, zm = B - R;
    if(p.x < -xm){ p.x = -xm; p.vx = Math.abs(p.vx); } else if(p.x > xm){ p.x = xm; p.vx = -Math.abs(p.vx); }
    if(p.y < R){ p.y = R; p.vy = Math.abs(p.vy); } else if(p.y > ym){ p.y = ym; p.vy = -Math.abs(p.vy); }
    if(p.z < -zm){ p.z = -zm; p.vz = Math.abs(p.vz); } else if(p.z > zm){ p.z = zm; p.vz = -Math.abs(p.vz); }
  }
  function termostat(arr, vt, k){
    let s = 0; arr.forEach(p=>{ s += Math.hypot(p.vx, p.vy, p.vz); }); s /= arr.length || 1;
    const q = 1 + k * (vt / Math.max(s, 1e-4) - 1); arr.forEach(p=>{ p.vx *= q; p.vy *= q; p.vz *= q; });
  }
  function toqnash(arr, rest){
    const d2 = 4 * R * R;
    for(let i = 0; i < arr.length; i++) for(let j = i + 1; j < arr.length; j++){
      const a = arr[i], b = arr[j]; const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z; const q = dx * dx + dy * dy + dz * dz;
      if(q < d2 && q > 1e-9){
        const d = Math.sqrt(q), nx = dx / d, ny = dy / d, nz = dz / d, o = (2 * R - d) / 2;
        a.x -= nx * o; a.y -= ny * o; a.z -= nz * o; b.x += nx * o; b.y += ny * o; b.z += nz * o;
        const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny + (b.vz - a.vz) * nz;
        if(rv < 0){ const j2 = -(1 + rest) * rv / 2; a.vx -= j2 * nx; a.vy -= j2 * ny; a.vz -= j2 * nz; b.vx += j2 * nx; b.vy += j2 * ny; b.vz += j2 * nz; }
      } else if(rest < .95 && q < d2 * 1.8 && q > d2){
        const d = Math.sqrt(q), c = .9 * (1 / 60); a.vx += dx / d * c; a.vy += dy / d * c; a.vz += dz / d * c; b.vx -= dx / d * c; b.vy -= dy / d * c; b.vz -= dz / d * c;
      }
    }
  }
  function qadam(h, t){
    const F = f();
    if(rejim !== 'diffuziya'){
      /* qattiq */
      const A = .012 + .02 * F, w = 9 * F;
      panj.forEach((p, i)=>{ mx.makeTranslation(p.x + A * Math.sin(w * t + p.f[0]), p.y + A * Math.sin(w * 1.13 * t + p.f[1]), p.z + A * Math.sin(w * .91 * t + p.f[2])); Z.qattiq.setMatrixAt(i, mx); });
      Z.qattiq.instanceMatrix.needsUpdate = true;
      /* suyuq */
      suy.forEach(p=>{ p.vy -= 2.2 * h; p.vx += gauss(Math.random) * .6 * F * Math.sqrt(h); p.vz += gauss(Math.random) * .6 * F * Math.sqrt(h); p.x += p.vx * h; p.y += p.vy * h; p.z += p.vz * h; devor(p, B); });
      toqnash(suy, .6); termostat(suy, .5 * F, .06);
      suy.forEach((p, i)=>{ mx.makeTranslation(p.x, p.y, p.z); Z.suyuq.setMatrixAt(i, mx); }); Z.suyuq.instanceMatrix.needsUpdate = true;
      /* gaz */
      gaz.forEach(p=>{ p.x += p.vx * h; p.y += p.vy * h; p.z += p.vz * h; devor(p, B); });
      toqnash(gaz, 1); termostat(gaz, 1.9 * F, .05);
      gaz.forEach((p, i)=>{ mx.makeTranslation(p.x, p.y, p.z); Z.gaz.setMatrixAt(i, mx); }); Z.gaz.instanceMatrix.needsUpdate = true;
    } else {
      const suyuq = muhit === 'suyuq';
      dif.forEach(p=>{
        if(suyuq){ const k = .9 * F * Math.sqrt(h); p.vx = p.vx * .6 + gauss(Math.random) * k * 3; p.vy = p.vy * .6 + gauss(Math.random) * k * 3; p.vz = p.vz * .6 + gauss(Math.random) * k * 3; }
        const ox = p.x; p.x += p.vx * h; p.y += p.vy * h; p.z += p.vz * h; devor(p, DW);
        if(p.y > tosiqY - R){ if(ox < 0 && p.x > -R){ p.x = -R; p.vx = -Math.abs(p.vx); } else if(ox > 0 && p.x < R){ p.x = R; p.vx = Math.abs(p.vx); } }
      });
      if(!suyuq){ toqnash(dif, 1); termostat(dif, 1.9 * F, .05); }
      let qo = 0, ko = 0;
      dif.forEach((p, i)=>{ if(p.q && p.x > 0) qo++; if(!p.q && p.x < 0) ko++; mx.makeTranslation(p.x, p.y, p.z); Z.dif.setMatrixAt(i, mx); });
      Z.dif.instanceMatrix.needsUpdate = true;
      aralash = Math.min(100, Math.round((qo + ko) / ND * 100));
    }
  }
  function kartaYoz(){
    const F = f();
    let h = '<span class="ust">' + NOM[rejim === 'uch' ? 'qattiq' : rejim].replace(/ holat$/, '') + (rejim === 'uch' ? ' · suyuq · gaz' : '') + '</span>';
    h += '<div class="q"><span>Harorat</span><b class="y">' + son(harorat, 0) + ' °C</b><span>Mutlaq harorat</span><b>' + son(harorat + 273.15, 0) + ' K</b><span>Zarralar tezligi (model)</span><b class="s">×' + son(F, 2) + '</b><span>Azot (N₂) molekulasi*</span><b class="k">≈ ' + mingli(vrms()) + ' m/s</b>';
    if(rejim === 'diffuziya') h += '<span>Muhit</span><b>' + (muhit === 'gaz' ? 'gaz' : 'suyuqlik') + '</b><span>Aralashish</span><b class="r">' + aralash + ' %</b>';
    h += '</div><p class="iz">* o‘rtacha kvadratik tezlik v = √(3RT/M), ideal gaz uchun. Model tezligi √(T / 293 K) ga mutanosib.</p>';
    K.innerHTML = h;
  }
  function izohYoz(){
    const m = {
      uch:'<b>Uch holat.</b> Qattiq jismda zarralar joyida tebranadi, suyuqlikda bir-biriga tegib siljiydi, gazda esa uzoq masofalarga erkin uchadi. Haroratni o‘zgartirib, zarralar tezligini kuzating.',
      qattiq:'<b>Qattiq holat.</b> Zarralar tartibli (kristall panjara) joylashgan va faqat o‘z o‘rni atrofida tebranadi — shuning uchun qattiq jism shaklini va hajmini saqlaydi.',
      suyuq:'<b>Suyuq holat.</b> Zarralar zich, lekin bir-biriga nisbatan siljiy oladi — suyuqlik oquvchan, hajmini saqlaydi, shaklini esa idishdan oladi.',
      gaz:'<b>Gaz holat.</b> Zarralar orasidagi masofa ularning o‘lchamidan ancha katta, ular tez va tartibsiz harakatlanib, butun idishni egallaydi.',
      diffuziya:'<b>Diffuziya.</b> To‘siqni oling — zarralarning tartibsiz harakati tufayli ikki modda o‘z-o‘zidan aralashadi. Gazda tez, suyuqlikda sekin; harorat ortsa — tezroq.'
    };
    izoh.innerHTML = m[rejim] || '';
  }
  let dT = 0;
  function xabar(){ clearTimeout(dT); dT = setTimeout(()=>sahna.isConnected && hodisa('fa-molekula', {rejim, harorat, tezlik:Math.round(vrms()), muhit}), 180); }
  const rejT = U.tugmalar([['uch', 'Uch holat'], ['qattiq', 'Qattiq'], ['suyuq', 'Suyuq'], ['gaz', 'Gaz'], ['diffuziya', 'Diffuziya']], k=>S.holat({rejim:k}), 'uch');
  U.ajr();
  const tosT = U.tugma('To‘siqni olish', ()=>S.holat({tosiq:!tosiqBor}));
  const muhT = U.tugmalar([['gaz', 'Gazda'], ['suyuq', 'Suyuqlikda']], k=>S.holat({muhit:k, tosiq:true}), 'gaz');
  const hSl = U.slayder('Harorat', -200, 300, 10, 20, v=>son(v, 0) + ' °C', v=>{ harorat = v; kartaYoz(); xabar(); });
  function difTugmalar(){ const d = rejim === 'diffuziya'; tosT.style.display = d ? '' : 'none'; muhT.bs.forEach(b=>b.style.display = d ? '' : 'none'); tosT.textContent = tosiqBor ? 'To‘siqni olish' : 'To‘siqni qo‘yish'; }
  function difQayta(){ const rr = rng(11); dif.forEach(p=>{ p.x = (p.q ? -1 : 1) * (R + .05 + rr() * (DW - R * 2 - .1)); p.y = R + rr() * (B * 2 - R * 2); p.z = (rr() - .5) * (B * 2 - R * 2); p.vx = gauss(rr); p.vy = gauss(rr); p.vz = gauss(rr); }); aralash = 0; oldAr = -1; }
  S.holat = h=>{
    if(!h) return;
    if(h.harorat !== undefined){ harorat = cheg(+h.harorat, -200, 300); hSl.qoy(harorat); }
    if(h.muhit && h.muhit !== muhit){ muhit = h.muhit === 'suyuq' ? 'suyuq' : 'gaz'; muhT.f(muhit); difQayta(); tosiqBor = true; }
    if(h.rejim && (NOM[h.rejim] || h.rejim === 'uch')){
      const eski = rejim; rejim = h.rejim; rejT.f(rejim);
      const d = rejim === 'diffuziya';
      HOL.forEach(k=>{ I[k].visible = !d; }); Dg.visible = d;
      if(d && eski !== 'diffuziya'){ difQayta(); tosiqBor = true; }
      if(d || rejim === 'uch') S.fokus(4.4, new T.Vector3(0, 1, 0), true);
      else S.fokus(2.1, new T.Vector3(XS[rejim], 1, 0), true);
      izohYoz();
    }
    if(h.tosiq !== undefined){ if(rejim !== 'diffuziya') S.holat({rejim:'diffuziya'}); tosiqBor = !!h.tosiq; if(tosiqBor){ difQayta(); } }
    difTugmalar(); kartaYoz(); xabar();
  };
  /* yorliqlar ko‘rinishi rejimga bog‘liq */
  const yl = L.qat.children;
  bosishUlash(S, d=>{
    const k = d.nom === 'tosiq' ? 'diffuziya' : d.nom;
    hodisa('detal', {turD:'fa_modda', nom:k});
    hodisa('fa-holat', {nom:k});
    if(HOL.includes(k)) izoh.innerHTML = ({qattiq:'<b>Qattiq holat</b> — zarralar joyida tebranadi.', suyuq:'<b>Suyuq holat</b> — zarralar zich, lekin siljiydi.', gaz:'<b>Gaz holat</b> — zarralar erkin uchadi.'})[k];
  });
  S.joyla(4.4, new T.Vector3(0, 1, 0));
  let jami = 0;
  kadrUlash(S, L, (dt, t)=>{
    const d = rejim === 'diffuziya';
    for(let i = 0; i < 3; i++) yl[i] && (yl[i].style.visibility = d ? 'hidden' : '');
    for(let i = 3; i < 5; i++) yl[i] && (yl[i].style.visibility = d ? '' : 'hidden');
    const sp = (S.tezlik || 1) * dt; const n = sp > .03 ? 3 : 2;
    for(let i = 0; i < n; i++) qadam(sp / n, t);
    const ty = tosiqBor ? 0 : B * 2 + .4; tosiqY += (ty - tosiqY) * Math.min(1, dt * 4); tosiq.position.y = B + tosiqY; tosiq.visible = tosiqY < B * 2 + .3;
    jami += dt;
    if(d && jami - emitT > .5){ emitT = jami; if(aralash !== oldAr){ oldAr = aralash; hodisa('fa-diffuziya', {aralash, harorat, muhit, tosiq:tosiqBor}); kartaYoz(); } }
  });
  izohYoz(); difTugmalar(); kartaYoz();
  return S;
};

/* =====================================================================
   2. NYUTON QONUNLARI VA ISHQALANISH (7-sinf) — fa_nyuton
   ===================================================================== */
REG.fa_nyuton = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Fizika · Nyuton qonunlari · virtual o‘lchov (1 bo‘lak = 1 m)');
  const S = tayyorla(sahna, {rx:.32, ry:-.18, avto:false, fov:30, zoom:.95, rxMin:-.05, rxMax:1.2, env:.55});
  const g = S.g; chiroqlar(S);
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const G = 9.8, M2U = 2.5; /* 1 m = 2,5 sahna birligi */
  const SIRT = {havo:{nom:'Havo yostiqli yo‘l', mu:0, rang:0xa9b3c9}, muz:{nom:'Muz', mu:.05, rang:0xcdeaff}, yogoch:{nom:'Yog‘och', mu:.3, rang:0xffffff}, rezina:{nom:'Rezina gilam', mu:.6, rang:0x2a2d33}};
  /* stol */
  const stol = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(10, .3, 4, 3, .08) : new T.BoxGeometry(10, .3, 4), new T.MeshStandardMaterial({color:0xffffff, map:yogochTex('#3b2416', '20,8,2'), roughness:.6}));
  stol.material.map.repeat.set(2, 1); stol.position.y = -.35; g.add(stol);
  const sy = soya(11, 5.5, .6); sy.position.y = -.51; g.add(sy);
  /* trek (qiya bo‘lishi mumkin) — burilish nuqtasi chap uchida */
  const PX = -3.4;
  const pivot = new T.Group(); pivot.position.set(PX, 0, 0); g.add(pivot);
  const trek = new T.Group(); trek.position.x = -PX; pivot.add(trek);
  const alMat = new T.MeshStandardMaterial({color:0xc3c9d6, metalness:.9, roughness:.28});
  const profil = new T.Mesh(new T.BoxGeometry(6.9, .16, .9), alMat); profil.position.y = -.08; trek.add(profil);
  const yon1 = new T.Mesh(new T.BoxGeometry(6.9, .12, .05), alMat); yon1.position.set(0, .02, .47); trek.add(yon1);
  const yon2 = yon1.clone(); yon2.position.z = -.47; trek.add(yon2);
  /* sirt materiallari */
  const [hc, hx] = kanvas(512, 64); hx.fillStyle = '#9aa5bd'; hx.fillRect(0, 0, 512, 64); hx.fillStyle = '#4b5366'; for(let i = 0; i < 64; i++) for(let j = 0; j < 4; j++){ hx.beginPath(); hx.arc(4 + i * 8, 8 + j * 16, 1.6, 0, 7); hx.fill(); }
  const havoT = tex(hc); havoT.wrapS = T.RepeatWrapping; havoT.repeat.set(3, 1);
  const [rc, rx2] = kanvas(256, 64); rx2.fillStyle = '#26292f'; rx2.fillRect(0, 0, 256, 64); rx2.strokeStyle = '#34373f'; rx2.lineWidth = 3; for(let i = 0; i < 64; i++){ rx2.beginPath(); rx2.moveTo(i * 4, 0); rx2.lineTo(i * 4, 64); rx2.stroke(); }
  const rezT = tex(rc); rezT.wrapS = T.RepeatWrapping; rezT.repeat.set(6, 1);
  const SM = {
    havo:new T.MeshStandardMaterial({color:0xffffff, map:havoT, metalness:.7, roughness:.35}),
    muz:new T.MeshStandardMaterial({color:0xcdeaff, roughness:.05, metalness:.1, transparent:true, opacity:.92}),
    yogoch:new T.MeshStandardMaterial({color:0xffffff, map:yogochTex('#b88455', '90,50,20'), roughness:.55}),
    rezina:new T.MeshStandardMaterial({color:0xffffff, map:rezT, roughness:.95})
  };
  SM.yogoch.map.repeat.set(3, 1);
  const sirt = new T.Mesh(new T.BoxGeometry(6.8, .03, .86), SM.yogoch); sirt.position.y = .015; sirt.userData = {nom:'sirt', p:1}; trek.add(sirt);
  const tirgak = new T.Mesh(new T.BoxGeometry(.12, .4, .9), new T.MeshStandardMaterial({color:0x3a4155, roughness:.4, metalness:.6})); tirgak.position.set(3.44, .2, 0); trek.add(tirgak);
  /* oyoqlar: chapda past, o‘ngda balandlik o‘zgaradi */
  const oyoqMat = new T.MeshStandardMaterial({color:0x2c3246, metalness:.7, roughness:.35});
  const oyoqL = new T.Mesh(new T.CylinderGeometry(.06, .06, .2, 16), oyoqMat); oyoqL.position.set(PX + .2, -.17, 0); g.add(oyoqL);
  const oyoqR = new T.Mesh(new T.CylinderGeometry(.06, .06, 1, 16), oyoqMat); g.add(oyoqR);
  /* fotodarvozalar */
  const darvozaMat = new T.MeshStandardMaterial({color:0x1d2233, metalness:.5, roughness:.4});
  const ledMat1 = new T.MeshBasicMaterial({color:0xff3b3b, toneMapped:false}), ledMat2 = new T.MeshBasicMaterial({color:0xff3b3b, toneMapped:false});
  function darvoza(ledM){
    const d = new T.Group();
    [-.55, .55].forEach(z=>{ const u = new T.Mesh(new T.BoxGeometry(.08, 1.05, .08), darvozaMat); u.position.set(0, .52, z); d.add(u); });
    const t = new T.Mesh(new T.BoxGeometry(.08, .08, 1.18), darvozaMat); t.position.y = 1.06; d.add(t);
    const led = new T.Mesh(new T.SphereGeometry(.035, 10, 8), ledM); led.position.set(0, .5, .5); d.add(led);
    d.userData.led = ledM; trek.add(d); return d;
  }
  const dv1 = darvoza(ledMat1), dv2 = darvoza(ledMat2);
  L.qosh(dv1.children[2], 'start', 'kichik', {dy:-12}); L.qosh(dv2.children[2], '1 m', 'kichik', {dy:-12});
  /* brusok + yuklar */
  const jism = new T.Group(); trek.add(jism);
  const brusok = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.8, .42, .56, 3, .03) : new T.BoxGeometry(.8, .42, .56), new T.MeshStandardMaterial({color:0xffffff, map:yogochTex('#c9955f', '110,60,25'), roughness:.5}));
  brusok.position.y = .21; brusok.userData = {nom:'jism', p:1}; jism.add(brusok);
  const ilgak = new T.Mesh(new T.TorusGeometry(.06, .015, 8, 20), alMat); ilgak.position.set(.43, .2, 0); ilgak.rotation.y = Math.PI / 2; jism.add(ilgak);
  const yukMat = new T.MeshStandardMaterial({color:0xd4a94c, metalness:.95, roughness:.25});
  const yuklar = []; for(let i = 0; i < 9; i++){ const y = new T.Mesh(new T.CylinderGeometry(.17, .17, .07, 28), yukMat); y.position.y = .455 + i * .075; y.userData = {nom:'jism', p:1}; jism.add(y); yuklar.push(y); }
  /* kuch strelkalari */
  const sF = strelka(0xffc14d), sI = strelka(0xff5a4a), sN = strelka(0x4ee1a0), sG = strelka(0x5aa8ff);
  sF.nom('kuch'); sI.nom('ishqalanish'); sN.nom('tayanch'); sG.nom('ogirlik');
  jism.add(sF, sI, sN); g.add(sG);
  const lF = L.qosh(sF.qismlar[1], 'F', 'pill sariq'), lI = L.qosh(sI.qismlar[1], 'F<sub>ishq</sub>', 'pill qizil'), lN = L.qosh(sN.qismlar[1], 'N', 'pill yashil'), lG = L.qosh(sG.qismlar[1], 'mg', 'pill kok');

  let rejim = 'gorizontal', F = 8, m = 2, sirtK = 'yogoch', burchak = 0, burchakK = 0;
  let yur = null; /* {a, yon, t, s, olch} */
  const jadval = [];
  function kuchlar(){
    const mu = SIRT[sirtK].mu, al = (rejim === 'qiya' ? burchak : 0) * RAD;
    const N = m * G * Math.cos(al), Gx = m * G * Math.sin(al), D = F - Gx, Fmax = mu * N;
    let a = 0, fi, yon = 0;
    if(Math.abs(D) <= Fmax + 1e-9){ fi = -D; a = 0; } else { yon = Math.sign(D); fi = -yon * Fmax; a = (D + fi) / m; }
    return {mu, al, N, Gx, D, Fmax, a, fi, yon};
  }
  function joylashtir(){
    const k = kuchlar();
    yuklar.forEach((y, i)=>{ y.visible = i < Math.round((m - .5) / .5); });
    const tepa = .455 + Math.max(0, Math.round((m - .5) / .5)) * .075;
    const mx = Math.max(F, m * G, k.N, Math.abs(k.fi), .1), sk = 1.5 / mx;
    sF.position.set(.46, .2, 0); sF.yon(new T.Vector3(1, 0, 0)); sF.qoy(F * sk);
    const fy = k.fi >= 0 ? 1 : -1;
    sI.position.set(fy > 0 ? .1 : -.1, .03, .32); sI.yon(new T.Vector3(fy, 0, 0)); sI.qoy(Math.abs(k.fi) * sk);
    sN.position.set(0, tepa, 0); sN.yon(new T.Vector3(0, 1, 0)); sN.qoy(k.N * sk);
    sG.userData.uz = m * G * sk;
    lF.e.innerHTML = 'F = ' + son(F, 1) + ' N'; lI.e.innerHTML = 'F<sub>ishq</sub> = ' + son(Math.abs(k.fi), 2) + ' N'; lN.e.innerHTML = 'N = ' + son(k.N, 1) + ' N'; lG.e.innerHTML = 'mg = ' + son(m * G, 1) + ' N';
    return k;
  }
  function boshJoy(){ const k = kuchlar(); return (k.yon < 0 || (rejim === 'qiya' && k.D < 0)) ? 2.7 : -2.7; }
  function darvozalar(){ const x0 = boshJoy(), y = x0 > 0 ? -1 : 1; dv1.position.x = x0; dv2.position.x = x0 + y * M2U; }
  function kartaYoz(){
    const k = kuchlar();
    let h = '<span class="ust">' + (rejim === 'qiya' ? 'Qiya tekislik · α = ' + burchak + '°' : 'Gorizontal sirt') + ' · ' + SIRT[sirtK].nom + '</span>';
    h += '<div class="fx">a = ' + (rejim === 'qiya' ? '(F − mg·sinα − F<sub>ishq</sub>) / m' : '(F − F<sub>ishq</sub>) / m') + '</div>';
    h += '<div class="q"><span>F (tortish)</span><b class="y">' + son(F, 1) + ' N</b><span>m</span><b>' + son(m, 1) + ' kg</b><span>μ (taxminiy)</span><b>' + son(k.mu, 2) + '</b>';
    if(rejim === 'qiya') h += '<span>mg·sinα</span><b>' + son(k.Gx, 2) + ' N</b>';
    h += '<span>F<sub>ishq</sub> = μN (maks.)</span><b class="r">' + son(k.Fmax, 2) + ' N</b><span>a (hisob)</span><b class="s">' + son(Math.abs(k.a), 2) + ' m/s²</b></div>';
    if(jadval.length) h += '<table><tr><th>F, N</th><th>m, kg</th><th>μ</th><th>t, s</th><th>a, m/s²</th></tr>' + jadval.slice(-4).map((r, i, a)=>'<tr class="' + (i === a.length - 1 ? 'faol' : '') + '"><td>' + son(r.F, 1) + '</td><td>' + son(r.m, 1) + '</td><td>' + son(r.mu, 2) + '</td><td>' + (r.t ? son(r.t, 2) : '—') + '</td><td>' + (r.t ? son(r.a, 2) : '0') + '</td></tr>').join('') + '</table>';
    h += '<p class="iz">Vaqt 1 m masofada o‘lchanadi: a = 2s / t². g = 9,8 m/s².</p>';
    K.innerHTML = h;
  }
  function izohYoz(k){
    if(yur && yur.qozg === false) izoh.innerHTML = '<b>Jism qo‘zg‘almadi.</b> Tortish kuchi tinch holatdagi ishqalanish kuchidan oshmadi: F<sub>ishq</sub> = F. Kuchni oshiring yoki silliqroq sirt tanlang.';
    else izoh.innerHTML = rejim === 'qiya' ? '<b>Qiya tekislik.</b> Og‘irlik kuchining tekislik bo‘ylab tashkil etuvchisi mg·sinα jismni pastga tortadi, tayanch reaksiya kuchi N = mg·cosα.' : '<b>Nyutonning II qonuni:</b> jism tezlanishi unga ta’sir qiluvchi teng ta’sir etuvchi kuchga to‘g‘ri, massasiga teskari proporsional: a = F / m.';
  }
  function yangila(){ if(!yur || !yur.yuryapti){ yur = null; jism.position.x = boshJoy(); } darvozalar(); joylashtir(); kartaYoz(); izohYoz(); }
  function boshla(){
    const k = kuchlar(); jism.position.x = boshJoy(); darvozalar();
    ledMat1.color.setHex(0xff3b3b); ledMat2.color.setHex(0xff3b3b);
    const ev = {rejim, F, m, mu:k.mu, sirt:sirtK, burchak:rejim === 'qiya' ? burchak : 0};
    if(k.yon === 0){
      yur = {qozg:false}; jadval.push({F, m, mu:k.mu, t:0, a:0}); kartaYoz(); izohYoz();
      hodisa('fa-nyuton', Object.assign(ev, {olchandi:false, qozgalmadi:true, a:0}));
      return;
    }
    yur = {yuryapti:true, a:k.a, yon:k.yon, t:0, x0:jism.position.x, olch:false, ev};
    izohYoz();
  }
  const rejT = U.tugmalar([['gorizontal', 'Gorizontal'], ['qiya', 'Qiya tekislik']], k=>S.holat({rejim:k}), 'gorizontal');
  const sirtT = U.tugmalar(Object.keys(SIRT).map(k=>[k, SIRT[k].nom.replace(' yostiqli yo‘l', ' yo‘li')]), k=>S.holat({sirt:k}), sirtK);
  U.ajr();
  const fSl = U.slayder('F', 0, 20, .5, F, v=>son(v, 1) + ' N', v=>{ F = v; yangila(); });
  const mSl = U.slayder('m', .5, 5, .5, m, v=>son(v, 1) + ' kg', v=>{ m = v; yangila(); });
  const aSl = U.slayder('α', 0, 45, 5, 0, v=>v + '°', v=>{ burchak = v; if(rejim !== 'qiya') S.holat({rejim:'qiya'}); else yangila(); });
  U.tugma('▶ Boshlash', ()=>boshla());
  S.holat = h=>{
    if(!h) return;
    if(h.rejim){ rejim = h.rejim === 'qiya' ? 'qiya' : 'gorizontal'; rejT.f(rejim); if(rejim === 'gorizontal'){ burchak = 0; aSl.qoy(0); } else if(!burchak){ burchak = 30; aSl.qoy(30); } }
    if(h.sirt && SIRT[h.sirt]){ sirtK = h.sirt; sirtT.f(sirtK); sirt.material = SM[sirtK]; }
    if(h.F !== undefined){ F = cheg(+h.F, 0, 20); fSl.qoy(F); }
    if(h.m !== undefined){ m = cheg(+h.m, .5, 5); mSl.qoy(m); }
    if(h.burchak !== undefined){ burchak = cheg(+h.burchak, 0, 45); aSl.qoy(burchak); if(burchak > 0){ rejim = 'qiya'; rejT.f(rejim); } }
    yur = null; yangila();
    if(h.boshla) boshla();
  };
  const NOMLAR = {kuch:'tortish kuchi F', ishqalanish:'ishqalanish kuchi', tayanch:'tayanch reaksiya kuchi N', ogirlik:'og‘irlik kuchi mg', jism:'brusok', sirt:'sirt'};
  bosishUlash(S, d=>{ hodisa('detal', {turD:'fa_nyuton', nom:d.nom}); hodisa('fa-kuch', {nom:d.nom}); });
  S.joyla(4.3, new T.Vector3(0, .5, 0));
  const vq = new T.Vector3();
  kadrUlash(S, L, dt=>{
    burchakK += (burchak * RAD * (rejim === 'qiya' ? 1 : 0) - burchakK) * Math.min(1, dt * 6);
    pivot.rotation.z = burchakK;
    const hR = Math.tan(burchakK) * 6.8; oyoqR.scale.y = Math.max(.2, hR + .2); oyoqR.position.set(PX + 6.6, (hR + .2) / 2 - .27, 0);
    if(yur && yur.yuryapti){
      yur.t += dt * (S.tezlik || 1);
      const s = .5 * Math.abs(yur.a) * yur.t * yur.t;
      let x = yur.x0 + yur.yon * s * M2U;
      if(!yur.olch && s >= 1){
        yur.olch = true; const t1 = Math.sqrt(2 / Math.abs(yur.a)), ao = Math.round(2 / (t1 * t1) * 100) / 100;
        ledMat2.color.setHex(0x3dff8a);
        jadval.push({F, m, mu:SIRT[sirtK].mu, t:t1, a:ao}); kartaYoz();
        hodisa('fa-nyuton', Object.assign({}, yur.ev, {olchandi:true, a:ao, t:Math.round(t1 * 1000) / 1000}));
      }
      if(yur.t > .02) ledMat1.color.setHex(0x3dff8a);
      if(Math.abs(x) >= 2.95){ x = Math.sign(x) * 2.95; yur.yuryapti = false; }
      jism.position.x = x;
    }
    /* og‘irlik strelkasi — dunyo bo‘yicha pastga */
    brusok.getWorldPosition(vq); S.g.worldToLocal(vq); sG.position.copy(vq); sG.yon(new T.Vector3(0, -1, 0)); sG.qoy(sG.userData.uz || 1);
  });
  yangila();
  return S;
};

/* =====================================================================
   3. MAGNIT MAYDON VA ELEKTROMAGNIT INDUKSIYA (9-sinf) — fa_magnit
   ===================================================================== */
REG.fa_magnit = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Fizika · elektromagnit induksiya · Faradey tajribasi (sxematik)');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:.36, ry:-.28, avto:false, fov:30, zoom:.95, rxMin:-.1, rxMax:1.25, env:.6});
  const g = S.g; chiroqlar(S);
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const XC = 1.5, LC = 2.3, RC = .62;
  /* taglik */
  const taxta = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(10.5, .22, 5.2, 3, .06) : new T.BoxGeometry(10.5, .22, 5.2), new T.MeshStandardMaterial({color:0xffffff, map:yogochTex('#2f1f14', '15,6,2'), roughness:.6}));
  taxta.position.set(0, -.11 - .9, -.6); g.add(taxta);
  const sy = soya(12, 6.5, .6); sy.position.set(0, -1.23, -.6); g.add(sy);
  /* g‘altak */
  const galtak = new T.Group(); galtak.position.set(XC, 0, 0); g.add(galtak);
  const karkasMat = new T.MeshStandardMaterial({color:0x2a3350, roughness:.45, metalness:.15, transparent:true, opacity:.55, side:T.DoubleSide});
  const karkas = new T.Mesh(new T.CylinderGeometry(RC - .06, RC - .06, LC + .1, 40, 1, true), karkasMat); karkas.rotation.z = Math.PI / 2; karkas.userData = {nom:'galtak', p:1}; galtak.add(karkas);
  [-1, 1].forEach(s=>{ const fl = new T.Mesh(new T.CylinderGeometry(RC + .18, RC + .18, .06, 40), new T.MeshStandardMaterial({color:0x1f2640, roughness:.4, metalness:.3})); fl.rotation.z = Math.PI / 2; fl.position.x = s * (LC / 2 + .06); fl.userData = {nom:'galtak', p:1}; galtak.add(fl); });
  const misMat = new T.MeshStandardMaterial({color:0xd9844a, metalness:1, roughness:.3});
  const ORAM = 24;
  class Spiral extends T.Curve{ getPoint(t){ const a = t * Math.PI * 2 * ORAM; return new T.Vector3(-LC / 2 + t * LC, Math.cos(a) * RC, Math.sin(a) * RC); } }
  const sim = new T.Mesh(new T.TubeGeometry(new Spiral(), ORAM * (tejam ? 24 : 40), .045, tejam ? 6 : 8, false), misMat); sim.userData = {nom:'galtak', p:1}; galtak.add(sim);
  const tayanchMat = new T.MeshStandardMaterial({color:0x3a4158, metalness:.6, roughness:.35});
  [-1, 1].forEach(s=>{ const t = new T.Mesh(new T.BoxGeometry(.12, .95, .9), tayanchMat); t.position.set(XC + s * (LC / 2 + .06), -.5, 0); g.add(t); });
  /* galvanometr */
  const GV = new T.Group(); GV.position.set(XC - .2, -.3, -2.35); g.add(GV);
  const gq = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(2.1, 1.55, .6, 4, .1) : new T.BoxGeometry(2.1, 1.55, .6), new T.MeshStandardMaterial({color:0x151a2b, roughness:.35, metalness:.4})); gq.position.y = .78; gq.userData = {nom:'galvanometr', p:1}; GV.add(gq);
  const [dc, dx] = kanvas(512, 320);
  dx.fillStyle = '#f3efe2'; dx.fillRect(0, 0, 512, 320);
  dx.strokeStyle = '#1b1b1b'; dx.lineWidth = 3; dx.beginPath(); dx.arc(256, 300, 230, Math.PI * 1.25, Math.PI * 1.75); dx.stroke();
  for(let i = -10; i <= 10; i++){ const a = -Math.PI / 2 + i * (Math.PI / 4) / 10, r1 = 230, r2 = i % 5 === 0 ? 196 : 212; dx.lineWidth = i % 5 === 0 ? 4 : 2; dx.beginPath(); dx.moveTo(256 + Math.cos(a) * r1, 300 + Math.sin(a) * r1); dx.lineTo(256 + Math.cos(a) * r2, 300 + Math.sin(a) * r2); dx.stroke(); }
  dx.fillStyle = '#1b1b1b'; dx.font = '700 34px Inter, sans-serif'; dx.textAlign = 'center';
  dx.fillText('0', 256, 58); dx.fillText('−', 256 - 150, 128); dx.fillText('+', 256 + 150, 128); dx.font = '800 54px Inter, sans-serif'; dx.fillText('G', 256, 250);
  const siferblat = new T.Mesh(new T.PlaneGeometry(1.7, 1.06), new T.MeshBasicMaterial({map:tex(dc), toneMapped:false})); siferblat.position.set(0, .86, .305); siferblat.userData = {nom:'galvanometr', p:2}; GV.add(siferblat);
  const strGr = new T.Group(); strGr.position.set(0, .86 - .53 + .05, .315); GV.add(strGr);
  const strel = new T.Mesh(new T.BoxGeometry(.018, .74, .01), new T.MeshBasicMaterial({color:0xd4271e})); strel.position.y = .37; strGr.add(strel);
  const oq = new T.Mesh(new T.CylinderGeometry(.04, .04, .03, 16), new T.MeshStandardMaterial({color:0x222, metalness:.8, roughness:.3})); oq.rotation.x = Math.PI / 2; strGr.add(oq);
  const klemMat = [new T.MeshStandardMaterial({color:0xc23b30, roughness:.4}), new T.MeshStandardMaterial({color:0x202226, roughness:.4})];
  const klem = [-.65, .65].map((x, i)=>{ const k = new T.Mesh(new T.CylinderGeometry(.08, .08, .16, 20), klemMat[i]); k.position.set(x, 1.62, .1); GV.add(k); return k; });
  /* simlar */
  const v1 = new T.Vector3(XC - LC / 2 - .05, RC, 0), v2 = new T.Vector3(XC + LC / 2 + .05, RC, 0);
  const kl = klem.map(k=>{ const v = new T.Vector3(); k.getWorldPosition(v); return v; });
  GV.updateMatrixWorld(true);
  const kW = klem.map(k=>{ const v = k.position.clone(); v.y += .06; return GV.localToWorld(v); }); kl.length = 0;
  const egri = [
    new T.CatmullRomCurve3([v1, new T.Vector3(v1.x - .3, 1.1, -.4), new T.Vector3(kW[0].x - .5, 1.25, -1.6), kW[0]]),
    new T.CatmullRomCurve3([v2, new T.Vector3(v2.x + .3, 1.1, -.4), new T.Vector3(kW[1].x + .5, 1.25, -1.6), kW[1]])
  ];
  egri.forEach((c, i)=>{ const m = new T.Mesh(new T.TubeGeometry(c, 60, .03, 8, false), klemMat[i]); g.add(m); });
  const tokMat = new T.MeshBasicMaterial({color:0xffe066, toneMapped:false, transparent:true, opacity:.95});
  const tokStr = []; egri.forEach((c, ci)=>{ for(let i = 0; i < 5; i++){ const s = new T.Mesh(new T.ConeGeometry(.055, .16, 12), tokMat); s.userData.u = i / 5; s.userData.c = ci; g.add(s); tokStr.push(s); } });
  /* magnit */
  const mg = new T.Group(); g.add(mg);
  const LM = 2.2, WM = .42;
  const nMat = new T.MeshStandardMaterial({color:0xd8332a, roughness:.35, metalness:.25}), sMat = new T.MeshStandardMaterial({color:0x2a64d8, roughness:.35, metalness:.25});
  const nQ = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(LM / 2, WM, WM, 3, .04) : new T.BoxGeometry(LM / 2, WM, WM), nMat); nQ.position.x = LM / 4; nQ.userData = {nom:'magnit', p:2}; mg.add(nQ);
  const sQ = new T.Mesh(nQ.geometry, sMat); sQ.position.x = -LM / 4; sQ.userData = {nom:'magnit', p:2}; mg.add(sQ);
  [['N', LM / 4], ['S', -LM / 4]].forEach(([h, x])=>{ const p = new T.Mesh(new T.PlaneGeometry(.32, .32), new T.MeshBasicMaterial({map:yozuvTex(h), transparent:true, toneMapped:false})); p.position.set(x, WM / 2 + .005, 0); p.rotation.x = -Math.PI / 2; mg.add(p); const p2 = p.clone(); p2.position.set(x, 0, WM / 2 + .005); p2.rotation.set(0, 0, 0); mg.add(p2); });
  /* maydon chiziqlari (ikki qutbli model), magnit bilan birga harakatlanadi */
  const qN = new T.Vector3(.95, 0, 0), qS = new T.Vector3(-.95, 0, 0);
  const chiziqMat = new T.LineBasicMaterial({color:0x7cc4ff, transparent:true, opacity:.36, depthWrite:false});
  const chiziqG = new T.Group(); mg.add(chiziqG);
  const Bm = p=>{ const a = p.clone().sub(qN), b = p.clone().sub(qS); return a.multiplyScalar(1 / Math.pow(a.length(), 3)).sub(b.multiplyScalar(1 / Math.pow(b.length(), 3))); };
  const burch = tejam ? [0, Math.PI / 2] : [0, Math.PI / 3, 2 * Math.PI / 3];
  const bosh = [25, 45, 65, 85, 110, 135, 155];
  const uchlar = [];
  burch.forEach(ph=>{
    [1, -1].forEach(sg=>{
      bosh.forEach((d, bi)=>{
        const a = d * RAD; let p = new T.Vector3(qN.x + Math.cos(a) * .12, Math.sin(a) * .12 * sg, 0);
        const pts = [p.clone()];
        for(let i = 0; i < 400; i++){ const b = Bm(p).normalize(); p = p.clone().addScaledVector(b, .05); pts.push(p); if(p.distanceTo(qS) < .12 || p.length() > 5) break; }
        const geo = new T.BufferGeometry().setFromPoints(pts);
        const ln = new T.Line(geo, chiziqMat); ln.rotation.x = ph; chiziqG.add(ln);
        if(ph === 0 && sg === 1 && bi % 2 === 0 && pts.length > 20){
          const k = Math.floor(pts.length / 2), q = pts[k], d2 = pts[k + 1].clone().sub(q).normalize();
          const c = new T.Mesh(new T.ConeGeometry(.06, .18, 10), new T.MeshBasicMaterial({color:0x7cc4ff, transparent:true, opacity:.8})); c.position.copy(q); c.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d2); chiziqG.add(c); uchlar.push(c);
        }
      });
    });
  });
  const lMag = L.qosh(nQ, 'Doimiy magnit', 'pill', {dy:-36});
  const lGal = L.qosh(new T.Vector3(XC, -.95, .95), 'G‘altak', 'pill');
  const lGv = L.qosh(new T.Vector3(XC - .2, 1.55, -2.35), 'Galvanometr', 'pill');
  const qutbL = L.qosh(new T.Vector3(XC - LC / 2 - .15, -.05, .75), '', 'pill'), qutbR = L.qosh(new T.Vector3(XC + LC / 2 + .15, -.05, .75), '', 'pill');

  let pik = 0, orom = 200, qutb = 'N', avto = false, tez = 'sekin', xm = -3.6, xmMaqsad = -3.6, fazaT = 0, lambdaOld = null, I = 0, Is = 0, xOld = xm, v = 0, tinchT = 0, tinchYubordi = true, emitT = 0, emitI = 0, oldHar = '';
  const X0 = -3.9, X1 = XC;
  function oqim(){
    const s = qutb === 'N' ? 1 : -1; const pN = xm + s * .95, pS = xm - s * .95;
    let t = 0; const K2 = 16;
    for(let i = 0; i < K2; i++){ const x = XC - LC / 2 + (i + .5) * LC / K2; const dN = x - pN, dS = x - pS; t += .5 * (-dN / Math.sqrt(dN * dN + RC * RC) + dS / Math.sqrt(dS * dS + RC * RC)); }
    return t / K2 * orom;
  }
  function kartaYoz(){
    const ichida = Math.abs(xm - XC) < LC / 2;
    let h = '<span class="ust">Faradey qonuni · Lens qoidasi</span><div class="fx">ε = −N · ΔΦ / Δt</div>';
    h += '<div class="q"><span>O‘ramlar soni N</span><b class="y">' + orom + '</b><span>G‘altakka qaragan qutb</span><b>' + qutb + '</b><span>Magnit harakati</span><b>' + (Math.abs(v) < .05 ? 'tinch' : ((XC - xm) * v > 0 ? 'kirmoqda' : 'chiqmoqda')) + '</b><span>Induksion tok (nisbiy)</span><b class="' + (Is > 0.02 ? 's' : Is < -0.02 ? 'r' : '') + '">' + son(Is, 2) + '</b></div>';
    h += '<p class="iz">' + (Math.abs(Is) < .03 ? (ichida && Math.abs(v) < .05 ? 'Magnit g‘altak ichida, lekin tinch — magnit oqimi o‘zgarmaydi, tok yo‘q.' : 'Magnit oqimi o‘zgarmayapti — tok yo‘q.') : 'Induksion tok magnit oqimining o‘zgarishiga qarshilik qiladi (Lens qoidasi): g‘altak uchida ' + (Is > 0 ? 'chapda N' : 'chapda S') + ' qutb hosil bo‘ldi.') + '</p>';
    K.innerHTML = h;
  }
  const harT = U.tugmalar([['avto', '▶ Avto: kiritish–chiqarish'], ['toxta', '■ To‘xtatish']], k=>S.holat({harakat:k}));
  const tezT = U.tugmalar([['sekin', 'Sekin'], ['tez', 'Tez']], k=>S.holat({tez:k}), tez);
  U.ajr();
  const oromT = U.tugmalar([['100', '100 o‘ram'], ['200', '200'], ['400', '400']], k=>S.holat({orom:+k}), String(orom));
  U.tugma('Qutbni almashtirish', ()=>S.holat({qutb:qutb === 'N' ? 'S' : 'N'}));
  const xSl = U.slayder('Magnit o‘rni', 0, 100, 1, 0, v2=>v2 + ' %', v2=>{ avto = false; harT.f(''); xmMaqsad = X0 + (X1 - X0) * v2 / 100; });
  S.holat = h=>{
    if(!h) return;
    if(h.orom){ orom = [100, 200, 400].includes(+h.orom) ? +h.orom : 200; oromT.f(String(orom)); lambdaOld = null; }
    if(h.qutb){ qutb = h.qutb === 'S' ? 'S' : 'N'; lambdaOld = null; }
    if(h.tez){ tez = h.tez === 'tez' ? 'tez' : 'sekin'; tezT.f(tez); }
    if(h.harakat === 'avto'){ avto = true; harT.f('avto'); fazaT = Math.acos(cheg((xm - (X0 + X1) / 2) / ((X1 - X0) / 2), -1, 1)); }
    if(h.harakat === 'toxta'){ avto = false; harT.f(''); xmMaqsad = xm; }
    if(h.orin !== undefined){ avto = false; harT.f(''); xmMaqsad = X0 + (X1 - X0) * cheg(+h.orin, 0, 100) / 100; xSl.qoy(+h.orin); }
    kartaYoz();
  };
  S.aylanish = vv=>{ if(vv !== undefined) S.holat({harakat:vv ? 'avto' : 'toxta'}); return avto; };
  S._holat = ()=>({xm, Is, I, v, avto, orom, tez});
  bosishUlash(S, d=>{ hodisa('detal', {turD:'fa_magnit', nom:d.nom}); hodisa('fa-magnit-qism', {nom:d.nom}); });
  S.joyla(4.6, new T.Vector3(-.3, .2, -.7));
  const eW = new T.Vector3(), tq = new T.Vector3(), up = new T.Vector3(0, 1, 0);
  let kT = 0;
  kadrUlash(S, L, (dt0)=>{
    const dt = dt0 * (S.tezlik || 1); if(dt <= 0) return;
    if(avto){ fazaT += dt * (tez === 'tez' ? 2.8 : 1.15); xmMaqsad = (X0 + X1) / 2 + (X1 - X0) / 2 * Math.cos(fazaT + Math.PI); xSl.qoy(Math.round((xmMaqsad - X0) / (X1 - X0) * 100)); }
    const k = avto ? 1 : Math.min(1, dt * (tez === 'tez' ? 9 : 4));
    xm += (xmMaqsad - xm) * k;
    v = (xm - xOld) / dt; xOld = xm;
    mg.position.set(xm, 0, 0); mg.rotation.y = qutb === 'N' ? 0 : Math.PI;
    const lam = oqim();
    const dl = lambdaOld === null ? 0 : (lam - lambdaOld) / dt; lambdaOld = lam;
    I = cheg(dl / 400, -1, 1);
    Is += (I - Is) * Math.min(1, dt * 10);
    strGr.rotation.z = -Is * 45 * RAD;
    /* tok strelkalari: + da chap sim → galvanometr */
    tokStr.forEach(s=>{ const c = egri[s.userData.c]; const yon = (s.userData.c === 0 ? 1 : -1) * Math.sign(Is); s.userData.u = (s.userData.u + dt * Is * 1.6 * (s.userData.c === 0 ? 1 : -1) + 1) % 1; const u = s.userData.u; c.getPoint(u, eW); c.getTangent(u, tq); s.position.copy(eW); s.quaternion.setFromUnitVectors(up, tq.multiplyScalar(yon || 1)); s.visible = Math.abs(Is) > .03; });
    const kuchli = Math.abs(Is) > .06;
    qutbL.e.style.visibility = qutbR.e.style.visibility = kuchli ? '' : 'hidden';
    if(kuchli){ const chapN = Is > 0; qutbL.e.innerHTML = chapN ? '<i style="background:#e0453a"></i>N' : '<i style="background:#3a74e0"></i>S'; qutbR.e.innerHTML = chapN ? '<i style="background:#3a74e0"></i>S' : '<i style="background:#e0453a"></i>N'; }
    kT += dt0; emitT += dt0; if(Math.abs(Is) > Math.abs(pik)) pik = Is;
    if(kT > .25){ kT = 0; kartaYoz(); }
    const ichida = Math.abs(xm - XC) < LC / 2 + .2;
    const har = Math.abs(v) < .05 ? 'tinch' : ((XC - xm) * v > 0 ? 'kirish' : 'chiqish');
    if(har === 'tinch'){ tinchT += dt0; if(tinchT > .4 && !tinchYubordi){ tinchYubordi = true; hodisa('fa-induksiya', {I:0, harakat:'tinch', orom, qutb, ichida}); kartaYoz(); } }
    else { tinchT = 0; tinchYubordi = false; if(emitT > .2 && (Math.abs(pik) > .05 || har !== oldHar)){ emitT = 0; hodisa('fa-induksiya', {I:Math.round(pik * 100) / 100, harakat:har, orom, qutb, ichida}); pik = 0; } }
    oldHar = har;
    izoh.innerHTML = '<b>Elektromagnit induksiya.</b> G‘altak orqali o‘tuvchi magnit oqimi o‘zgarganda unda induksion tok hosil bo‘ladi. Magnit ' + (har === 'tinch' ? 'tinch turibdi — tok yo‘q.' : har === 'kirish' ? 'g‘altakka kirmoqda — strelka bir tomonga og‘adi.' : 'g‘altakdan chiqmoqda — strelka teskari tomonga og‘adi.');
  });
  kartaYoz();
  return S;
};

/* =====================================================================
   4. ATOM YADROSI VA RADIOAKTIVLIK (11-sinf) — fa_yadro
   ===================================================================== */
REG.fa_yadro = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Fizika · atom yadrosi va radioaktivlik · sxematik (yadro atomdan ~10⁵ marta kichik)');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:.3, ry:-.22, avto:false, fov:30, zoom:.95, rxMin:-.1, rxMax:1.3, env:.6});
  const g = S.g; chiroqlar(S);
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const glow = nurTex();
  const pol = new T.Mesh(new T.CircleGeometry(10, 48), new T.MeshBasicMaterial({map:nurTex([[0, 'rgba(34,40,70,1)'], [.6, 'rgba(18,22,42,1)'], [1, 'rgba(10,13,26,0)']]), transparent:true, depthWrite:false})); pol.rotation.x = -Math.PI / 2; pol.position.y = -.6; g.add(pol);
  /* ---- yadro ---- */
  const NX = -3.2, NY = .9;
  const yadroG = new T.Group(); yadroG.position.set(NX, NY, 0); g.add(yadroG);
  const rn = .19, nGeo = new T.SphereGeometry(rn, tejam ? 14 : 22, tejam ? 10 : 16);
  const pMat = new T.MeshPhysicalMaterial({color:0xff4d42, roughness:.3, clearcoat:.6, metalness:0});
  const nMat = new T.MeshPhysicalMaterial({color:0x9aa7cc, roughness:.3, clearcoat:.6, metalness:0});
  const nurYadro = nur(glow, 0xff9b6b, 3.2, .35); yadroG.add(nurYadro);
  const syYadro = soya(3, 3, .6); syYadro.position.set(NX, -.595, 0); g.add(syYadro);
  let nuklon = [];
  function yadroQur(){
    nuklon.forEach(n=>yadroG.remove(n)); nuklon = [];
    const pts = [], a = rn * 2 * 1.02 / Math.SQRT2;
    for(let i = -4; i <= 4; i++) for(let j = -4; j <= 4; j++) for(let k = -4; k <= 4; k++) if((i + j + k) % 2 === 0) pts.push(new T.Vector3(i * a, j * a, k * a));
    pts.sort((p, q)=>p.length() - q.length());
    const r = rng(5), N = 40;
    for(let i = 0; i < N; i++){ const pr = r() < .45; const m = new T.Mesh(nGeo, pr ? pMat : nMat); m.position.copy(pts[i]); m.userData = {nom:pr ? 'proton' : 'neytron', p:1, asl:pts[i].clone(), f:r() * 6.3}; yadroG.add(m); nuklon.push(m); }
  }
  yadroQur();
  const lYadro = L.qosh(new T.Vector3(NX, NY + 1.25, 0), 'Yadro (sxematik)', 'pill');
  L.qosh(new T.Vector3(NX - .9, NY - 1.1, .6), '<i style="background:#ff4d42"></i>proton', 'pill kichik');
  L.qosh(new T.Vector3(NX + .7, NY - 1.1, .6), '<i style="background:#9aa7cc"></i>neytron', 'pill kichik');
  /* ---- to‘siqlar ---- */
  const tosiqG = new T.Group(); g.add(tosiqG);
  const qogoz = new T.Mesh(new T.BoxGeometry(.02, 1.9, 1.5), new T.MeshStandardMaterial({color:0xf4f1ea, roughness:.95})); qogoz.position.set(-.4, NY, 0); qogoz.userData = {nom:'qogoz', p:2}; tosiqG.add(qogoz);
  const alyum = new T.Mesh(new T.BoxGeometry(.12, 1.9, 1.5), new T.MeshStandardMaterial({color:0xc9ced8, metalness:.95, roughness:.25})); alyum.position.set(1.1, NY, 0); alyum.userData = {nom:'alyuminiy', p:2}; tosiqG.add(alyum);
  const qorg = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.7, 1.9, 1.5, 2, .04) : new T.BoxGeometry(.7, 1.9, 1.5), new T.MeshStandardMaterial({color:0x4a4f5c, metalness:.75, roughness:.45})); qorg.position.set(2.9, NY, 0); qorg.userData = {nom:'qorgoshin', p:2}; tosiqG.add(qorg);
  [[-.4, .12], [1.1, .2], [2.9, .45]].forEach(([x, w])=>{ const t = new T.Mesh(new T.BoxGeometry(w + .3, .12, 1.7), new T.MeshStandardMaterial({color:0x252b3d, metalness:.5, roughness:.4})); t.position.set(x, -.06 - .48, 0); tosiqG.add(t); const s = soya(w + 1.4, 2.6, .5); s.position.set(x, -.595, 0); tosiqG.add(s); });
  L.qosh(new T.Vector3(-.4, NY + 1.15, 0), 'Qog‘oz', 'pill');
  L.qosh(new T.Vector3(1.1, NY + 1.15, 0), 'Alyuminiy (bir necha mm)', 'pill');
  L.qosh(new T.Vector3(2.9, NY + 1.15, 0), 'Qo‘rg‘oshin (bir necha sm)', 'pill');
  /* ---- nurlanish zarralari ---- */
  const nurlar = [];
  const alfaG = new T.Group(); [[.08, .08, 0, pMat], [-.08, -.08, 0, pMat], [.08, -.08, .06, nMat], [-.08, .08, -.06, nMat]].forEach(([x, y, z, m])=>{ const s = new T.Mesh(new T.SphereGeometry(.1, 16, 12), m); s.position.set(x, y, z); s.userData = {nom:'alfa', p:3}; alfaG.add(s); }); alfaG.add(nur(glow, 0xff6a3d, 1, .7)); alfaG.visible = false; g.add(alfaG);
  const betaG = new T.Group(); betaG.add(new T.Mesh(new T.SphereGeometry(.06, 14, 10), new T.MeshBasicMaterial({color:0x7fe8ff, toneMapped:false}))); betaG.add(nur(glow, 0x3ad0ff, .7, .9)); betaG.children[0].userData = {nom:'beta', p:3}; betaG.visible = false; g.add(betaG);
  const antiG = nur(glow, 0xd9d0ff, .35, .5); antiG.visible = false; g.add(antiG);
  const gPts = []; for(let i = 0; i <= 80; i++) gPts.push(new T.Vector3(i / 80 * 1.2 - .6, 0, 0));
  const gGeo = new T.BufferGeometry().setFromPoints(gPts);
  const gammaG = new T.Group(); const gl = new T.Line(gGeo, new T.LineBasicMaterial({color:0xb6ff5c, transparent:true, opacity:1})); gammaG.add(gl); gammaG.add(nur(glow, 0x9dff4a, .9, .6)); gammaG.visible = false; g.add(gammaG);
  const chaqnash = nur(glow, 0xffffff, .1, 0); g.add(chaqnash);
  const yadroChaq = nur(glow, 0xfff1c2, .1, 0); yadroG.add(yadroChaq);
  /* ---- yarim yemirilish rejimi ---- */
  const YR = new T.Group(); YR.visible = false; g.add(YR);
  const NN = 400, yGeo = new T.SphereGeometry(.085, tejam ? 8 : 12, tejam ? 6 : 8);
  const yM = new T.InstancedMesh(yGeo, new T.MeshStandardMaterial({color:0xffffff, roughness:.35, metalness:.1, emissive:0x111111}), NN);
  const faolC = new T.Color(0xb8ff4a).convertSRGBToLinear(), qizC = new T.Color(0x3b3350).convertSRGBToLinear();
  const mx = new T.Matrix4();
  for(let i = 0; i < NN; i++){ mx.makeTranslation((i % 20 - 9.5) * .27, .09, (Math.floor(i / 20) - 9.5) * .27); yM.setMatrixAt(i, mx); yM.setColorAt(i, faolC); }
  yM.userData = {nom:'namuna', p:1}; YR.add(yM);
  const plita = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(5.9, .12, 5.9, 3, .05) : new T.BoxGeometry(5.9, .12, 5.9), new T.MeshStandardMaterial({color:0x1a2034, metalness:.4, roughness:.5})); plita.position.y = -.06; plita.userData = {nom:'namuna', p:0}; YR.add(plita);
  YR.position.set(0, -.5, 0);
  const IZOTOP = {i131:{nom:'Yod-131', T:8.02, bir:'kun', qiz:'Ksenon-131'}, rn222:{nom:'Radon-222', T:3.82, bir:'kun', qiz:'Poloniy-218'}, c14:{nom:'Uglerod-14', T:5730, bir:'yil', qiz:'Azot-14'}};
  let rejim = 'yadro', izotop = 'i131', faol = new Uint8Array(NN).fill(1), qolgan = NN, tY = 0, yur = false, davr = 0, nuqta = [[0, NN]];
  const [gc, gx] = kanvas(460, 200);
  function grafik(){
    gx.fillStyle = '#070a16'; gx.fillRect(0, 0, 460, 200);
    const X = t=>30 + t / 5 * 420, Y = n=>180 - n / NN * 165;
    gx.strokeStyle = 'rgba(255,255,255,.1)'; gx.lineWidth = 1; for(let i = 0; i <= 5; i++){ gx.beginPath(); gx.moveTo(X(i), 12); gx.lineTo(X(i), 180); gx.stroke(); }
    [NN, NN / 2, NN / 4, NN / 8].forEach(n=>{ gx.beginPath(); gx.moveTo(30, Y(n)); gx.lineTo(450, Y(n)); gx.stroke(); });
    gx.fillStyle = '#8d95b8'; gx.font = '600 16px JetBrains Mono, monospace'; for(let i = 0; i <= 5; i++) gx.fillText(i + 'T', X(i) - (i ? 10 : 0), 198);
    gx.strokeStyle = '#ffc14d'; gx.lineWidth = 2; gx.beginPath(); for(let i = 0; i <= 100; i++){ const t = i / 20; const y = Y(NN * Math.pow(.5, t)); i ? gx.lineTo(X(t), y) : gx.moveTo(X(t), y); } gx.stroke();
    gx.fillStyle = '#b8ff4a'; nuqta.forEach(([t, n])=>{ if(t <= 5){ gx.beginPath(); gx.arc(X(t), Y(n), 3.2, 0, 7); gx.fill(); } });
  }
  let oxirgi = null;
  const MISOL = {
    alfa:{nom:'Alfa-yemirilish', t:'²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He', q:'Z − 2, A − 4', tosiq:'qogoz', iz:'geliy yadrosi (2p + 2n); qog‘oz varag‘i yoki havoning bir necha sm qatlami to‘xtatadi'},
    beta:{nom:'Beta-yemirilish (β⁻)', t:'¹⁴₆C → ¹⁴₇N + e⁻ + ν̃', q:'Z + 1, A o‘zgarmaydi', tosiq:'alyuminiy', iz:'yadrodagi neytron protonga aylanib, elektron va antineytrino chiqaradi; bir necha mm alyuminiy to‘xtatadi'},
    gamma:{nom:'Gamma-nurlanish', t:'⁶⁰₂₈Ni* → ⁶⁰₂₈Ni + γ', q:'Z va A o‘zgarmaydi', tosiq:'qorgoshin', iz:'yuqori energiyali foton; qalin qo‘rg‘oshin yoki beton kuchsizlantiradi (to‘liq to‘xtatib bo‘lmaydi)'}
  };
  function kartaYoz(){
    if(rejim === 'yarim'){
      const iz = IZOTOP[izotop], t = tY / 3 * iz.T;
      K.innerHTML = '<span class="ust">Yarim yemirilish davri · ' + iz.nom + '</span><div class="fx">N = N₀ · (½)<sup>t/T</sup></div>' +
        '<div class="q"><span>T (yarim yemirilish)</span><b class="y">' + son(iz.T, iz.T > 100 ? 0 : 2) + ' ' + iz.bir + '</b><span>O‘tgan vaqt</span><b>' + (iz.T > 100 ? mingli(t) : son(t, 1)) + ' ' + iz.bir + '</b><span>O‘tgan davrlar</span><b>' + son(tY / 3, 2) + ' T</b>' +
        '<span>Qolgan yadrolar</span><b class="s">' + qolgan + ' / ' + NN + '</b><span>Nazariya bo‘yicha</span><b class="k">' + son(NN * Math.pow(.5, tY / 3), 0) + '</b></div><canvas width="460" height="200"></canvas>' +
        '<p class="iz">Har bir yadro qachon yemirilishini oldindan aytib bo‘lmaydi — faqat ko‘p yadrolar uchun statistik qonun bajariladi.</p>';
      grafik(); const c = K.querySelector('canvas'); c.getContext('2d').drawImage(gc, 0, 0);
      return;
    }
    const m = oxirgi && MISOL[oxirgi];
    K.innerHTML = '<span class="ust">Radioaktiv yemirilish turlari</span>' + (m ? '<div class="fx" style="font-size:14px">' + m.t + '</div><div class="q"><span>Tur</span><b class="y">' + m.nom.replace(/ \(.*/, '') + '</b><span>Siljish qoidasi</span><b>' + m.q + '</b><span>To‘xtatadi</span><b class="s">' + ({qogoz:'qog‘oz', alyuminiy:'alyuminiy', qorgoshin:'qo‘rg‘oshin'})[m.tosiq] + '</b></div><p class="iz">' + m.iz + '.</p>' : '<p class="iz" style="margin-top:0">α, β yoki γ tugmasini bosing: nurlanish yadrodan chiqib, to‘siqlar orqali o‘tadi. To‘siqni bosib ma’lumot oling.</p><div class="q"><span>α</span><b class="r">⁴₂He yadrosi</b><span>β⁻</span><b class="k">elektron</b><span>γ</span><b class="s">foton</b></div>');
  }
  const uchish = []; /* {g, x, v, toxta, tur} */
  function chiqar(tur){
    if(rejim !== 'yadro') S.holat({rejim:'yadro'});
    oxirgi = tur; kartaYoz();
    yadroChaq.material.opacity = 1; yadroChaq.scale.setScalar(2.2);
    const ob = tur === 'alfa' ? alfaG : tur === 'beta' ? betaG : gammaG;
    ob.visible = true; ob.position.set(NX + .9, NY, 0); ob.scale.setScalar(1);
    if(tur === 'alfa'){ const yuz = nuklon.filter(n=>n.visible).sort((a, b)=>b.position.x - a.position.x); let p = 0, q = 0; yuz.forEach(n=>{ if(n.userData.nom === 'proton' && p < 2){ n.visible = false; p++; } else if(n.userData.nom === 'neytron' && q < 2){ n.visible = false; q++; } }); if(nuklon.filter(n=>n.visible).length < 12) yadroQur(); }
    if(tur === 'beta'){ const n = nuklon.find(x=>x.visible && x.userData.nom === 'neytron'); if(n){ n.material = pMat; n.userData.nom = 'proton'; } antiG.visible = true; antiG.position.set(NX + .5, NY + .3, .3); antiG.userData.v = new T.Vector3(2.2, 1.6, 1.4); }
    const u = {g:ob, tur, v:tur === 'alfa' ? 2.4 : tur === 'beta' ? 4.2 : 6.5, toxta:tur === 'alfa' ? -.45 : tur === 'beta' ? 1.02 : 2.95, t:0, tosiq:MISOL[tur].tosiq, tugadi:false};
    for(let i = uchish.length - 1; i >= 0; i--) if(uchish[i].g === ob) uchish.splice(i, 1);
    uchish.push(u);
    izoh.innerHTML = '<b>' + MISOL[tur].nom + '.</b> ' + MISOL[tur].iz.charAt(0).toUpperCase() + MISOL[tur].iz.slice(1) + '. Misol: ' + MISOL[tur].t + '.';
  }
  function yarimQayta(){ faol.fill(1); qolgan = NN; tY = 0; davr = 0; nuqta = [[0, NN]]; for(let i = 0; i < NN; i++) yM.setColorAt(i, faolC); yM.instanceColor.needsUpdate = true; kartaYoz(); }
  const rejT = U.tugmalar([['yadro', 'Yadro va nurlar'], ['yarim', 'Yarim yemirilish']], k=>S.holat({rejim:k}), 'yadro');
  U.ajr();
  const nurT = U.tugmalar([['alfa', 'α-yemirilish'], ['beta', 'β-yemirilish'], ['gamma', 'γ-nurlanish']], k=>chiqar(k));
  const izT = U.tugmalar(Object.keys(IZOTOP).map(k=>[k, IZOTOP[k].nom]), k=>S.holat({izotop:k}), izotop);
  const yurT = U.tugma('▶ Boshlash', ()=>S.holat({yur:!yur}));
  const qT = U.tugma('Qaytadan', ()=>{ if(rejim === 'yarim'){ yur = false; yarimQayta(); tugmaYoz(); } else { yadroQur(); oxirgi = null; kartaYoz(); } });
  function tugmaYoz(){ const y = rejim === 'yarim'; nurT.bs.forEach(b=>b.style.display = y ? 'none' : ''); izT.bs.forEach(b=>b.style.display = y ? '' : 'none'); yurT.style.display = y ? '' : 'none'; yurT.textContent = yur ? '❚❚ Pauza' : '▶ Boshlash'; }
  S.holat = h=>{
    if(!h) return;
    if(h.rejim){ rejim = h.rejim === 'yarim' ? 'yarim' : 'yadro'; rejT.f(rejim); const y = rejim === 'yarim'; YR.visible = y; yadroG.visible = !y; tosiqG.visible = !y; syYadro.visible = !y; lYadro.kor = !y; L.qat.querySelectorAll('.fa-bel').forEach((e, i)=>{ if(i < 6) e.style.visibility = y ? 'hidden' : ''; }); if(y){ S.fokus(3.6, new T.Vector3(0, -.3, 0), true); } else S.fokus(4.4, new T.Vector3(0, .6, 0), true); izoh.innerHTML = y ? '<b>Yarim yemirilish davri</b> — radioaktiv yadrolarning yarmi yemiriladigan vaqt. 400 ta yadroni kuzating: har T vaqtda qolganlarning taxminan yarmi yemiriladi.' : '<b>Atom yadrosi</b> protonlar va neytronlardan (nuklonlardan) tuzilgan. Beqaror yadrolar o‘z-o‘zidan α, β yoki γ nurlanish chiqaradi.'; }
    if(h.izotop && IZOTOP[h.izotop]){ izotop = h.izotop; izT.f(izotop); yur = false; yarimQayta(); }
    if(h.yur !== undefined){ if(rejim !== 'yarim') S.holat({rejim:'yarim'}); yur = !!h.yur; if(yur && qolgan === 0) yarimQayta(); }
    if(h.nur && MISOL[h.nur]) chiqar(h.nur);
    tugmaYoz(); kartaYoz();
  };
  bosishUlash(S, d=>{ const nom = d.nom === 'namuna' ? izotop : d.nom; hodisa('detal', {turD:'fa_yadro', nom}); hodisa('fa-yadro-qism', {nom}); });
  S.joyla(4.4, new T.Vector3(0, .6, 0));
  let jt = 0;
  kadrUlash(S, L, (dt0, t)=>{
    const dt = dt0 * (S.tezlik || 1);
    nuklon.forEach(n=>{ const a = n.userData.asl, f = n.userData.f; n.position.set(a.x + .012 * Math.sin(t * 7 + f), a.y + .012 * Math.sin(t * 6.1 + f * 2), a.z + .012 * Math.sin(t * 5.3 + f * 3)); });
    yadroG.rotation.y += dt0 * .25;
    yadroChaq.material.opacity = Math.max(0, yadroChaq.material.opacity - dt * 2.2);
    chaqnash.material.opacity = Math.max(0, chaqnash.material.opacity - dt * 2.5);
    for(const u of uchish){
      if(u.tugadi) continue;
      u.t += dt; const x = u.g.position.x + u.v * dt;
      if(u.tur === 'gamma'){ const p = gGeo.attributes.position; for(let i = 0; i <= 80; i++) p.setY(i, Math.sin(i / 80 * Math.PI * 8 - u.t * 30) * .12 * Math.sin(i / 80 * Math.PI)); p.needsUpdate = true; }
      if(u.tur === 'alfa') u.g.rotation.x += dt * 4;
      if(x >= u.toxta){
        u.g.position.x = u.toxta; u.tugadi = true;
        chaqnash.position.set(u.toxta - .05, NY, 0); chaqnash.material.color.setHex(u.tur === 'alfa' ? 0xff7a4a : u.tur === 'beta' ? 0x5ad8ff : 0xb6ff5c); chaqnash.material.opacity = 1; chaqnash.scale.setScalar(1.4);
        setTimeout(()=>{ u.g.visible = false; }, 250);
        hodisa('fa-yemirilish', {nur:u.tur, tosiq:u.tosiq});
      } else u.g.position.x = x;
    }
    if(antiG.visible){ antiG.position.addScaledVector(antiG.userData.v, dt); if(antiG.position.length() > 9) antiG.visible = false; }
    if(rejim === 'yarim' && yur){
      const iz = IZOTOP[izotop]; const qd = dt / 3; tY += dt;
      const p = 1 - Math.pow(.5, qd); let o = 0;
      for(let i = 0; i < NN; i++) if(faol[i] && Math.random() < p){ faol[i] = 0; o++; yM.setColorAt(i, qizC); }
      if(o){ qolgan -= o; yM.instanceColor.needsUpdate = true; }
      jt += dt0; if(jt > .2){ jt = 0; nuqta.push([tY / 3, qolgan]); kartaYoz(); }
      const d = Math.floor(tY / 3 + 1e-9);
      if(d > davr){ davr = d; hodisa('fa-yarim', {davr, qolgan, foiz:Math.round(qolgan / NN * 100), izotop}); }
      if(tY / 3 >= 6 || qolgan === 0){ yur = false; tugmaYoz(); }
    }
  });
  S.holat({rejim:'yadro'}); kartaYoz();
  return S;
};

/* =====================================================================
   5. YULDUZLAR VA YULDUZ TURKUMLARI — fa_yulduzlar (osmon gumbazi, Toshkent kengligi)
   ===================================================================== */
const HMS = (h, m, s)=>(h + m / 60 + s / 3600) * 15 * RAD;
const DMS = (d, m, s)=>(Math.sign(d) || 1) * (Math.abs(d) + m / 60 + s / 3600) * RAD;
/* [kalit, nom, turkum, RA, Dec, kattalik, masofa (y.y.), spektr] — Wikipedia «List of stars in …» (Hipparcos) */
const YULDUZ = [
  ['dubhe', 'Dubhe (α Katta Ayiq)', 'katta_ayiq', HMS(11, 3, 43.84), DMS(61, 45, 4.0), 1.79, 124, 'K0 III'],
  ['merak', 'Merak (β Katta Ayiq)', 'katta_ayiq', HMS(11, 1, 50.39), DMS(56, 22, 56.4), 2.37, 79, 'A1 V'],
  ['phecda', 'Fekda (γ Katta Ayiq)', 'katta_ayiq', HMS(11, 53, 49.74), DMS(53, 41, 41.0), 2.44, 84, 'A0 V'],
  ['megrez', 'Megrets (δ Katta Ayiq)', 'katta_ayiq', HMS(12, 15, 25.45), DMS(57, 1, 57.4), 3.31, 81, 'A3 V'],
  ['alioth', 'Aliot (ε Katta Ayiq)', 'katta_ayiq', HMS(12, 54, 1.63), DMS(55, 57, 35.4), 1.77, 81, 'A0p'],
  ['mizar', 'Mitsar (ζ Katta Ayiq)', 'katta_ayiq', HMS(13, 23, 55.54), DMS(54, 55, 31.3), 2.23, 83, 'A2 V'],
  ['alkaid', 'Alkaid (η Katta Ayiq)', 'katta_ayiq', HMS(13, 47, 32.55), DMS(49, 18, 47.9), 1.86, 101, 'B3 V'],
  ['polaris', 'Qutb yulduzi (α Kichik Ayiq)', 'kichik_ayiq', HMS(2, 31, 47.08), DMS(89, 15, 50.9), 1.97, 431, 'F7 Ib'],
  ['kochab', 'Koxab (β Kichik Ayiq)', 'kichik_ayiq', HMS(14, 50, 42.40), DMS(74, 9, 19.7), 2.07, 126, 'K4 III'],
  ['pherkad', 'Ferkad (γ Kichik Ayiq)', 'kichik_ayiq', HMS(15, 20, 43.75), DMS(71, 50, 2.3), 3.04, 480, 'A3 II–III'],
  ['yildun', 'Yildun (δ Kichik Ayiq)', 'kichik_ayiq', HMS(17, 32, 12.90), DMS(86, 35, 10.8), 4.35, 183, 'A1 V'],
  ['eps_umi', 'ε Kichik Ayiq', 'kichik_ayiq', HMS(16, 45, 58.16), DMS(82, 2, 14.1), 4.21, 346, 'G5 III'],
  ['zet_umi', 'ζ Kichik Ayiq', 'kichik_ayiq', HMS(15, 44, 3.46), DMS(77, 47, 40.2), 4.29, 376, 'A3 V'],
  ['eta_umi', 'η Kichik Ayiq', 'kichik_ayiq', HMS(16, 17, 30.50), DMS(75, 45, 16.9), 4.95, 97, 'F5 V'],
  ['schedar', 'Shedar (α Kassiopeya)', 'kassiopeya', HMS(0, 40, 30.39), DMS(56, 32, 14.7), 2.24, 228, 'K0 II–III'],
  ['caph', 'Kaf (β Kassiopeya)', 'kassiopeya', HMS(0, 9, 10.09), DMS(59, 9, 0.8), 2.28, 54, 'F2 III–IV'],
  ['gam_cas', 'γ Kassiopeya', 'kassiopeya', HMS(0, 56, 42.50), DMS(60, 43, 0.3), 2.47, 613, 'B0 IV'],
  ['ruchbah', 'Rukbax (δ Kassiopeya)', 'kassiopeya', HMS(1, 25, 48.60), DMS(60, 14, 7.5), 2.68, 99, 'A5 V'],
  ['segin', 'Segin (ε Kassiopeya)', 'kassiopeya', HMS(1, 54, 23.68), DMS(63, 40, 12.5), 3.35, 442, 'B2'],
  ['betelgeuse', 'Betelgeyze (α Orion)', 'orion', HMS(5, 55, 10.29), DMS(7, 24, 25.3), 0.42, 643, 'M2 Ib'],
  ['rigel', 'Rigel (β Orion)', 'orion', HMS(5, 14, 32.27), DMS(-8, 12, 5.9), 0.18, 773, 'B8 Ia'],
  ['bellatrix', 'Bellatriks (γ Orion)', 'orion', HMS(5, 25, 7.87), DMS(6, 20, 59.0), 1.64, 243, 'B2 III'],
  ['mintaka', 'Mintaka (δ Orion)', 'orion', HMS(5, 32, 0.40), DMS(-0, 17, 56.7), 2.20, 916, 'B0 III + O9 V'],
  ['alnilam', 'Alnilam (ε Orion)', 'orion', HMS(5, 36, 12.81), DMS(-1, 12, 6.9), 1.69, 1342, 'B0 Ia'],
  ['alnitak', 'Alnitak (ζ Orion)', 'orion', HMS(5, 40, 45.52), DMS(-1, 56, 33.3), 1.88, 817, 'O9.7 Ib'],
  ['saiph', 'Sayf (κ Orion)', 'orion', HMS(5, 47, 45.39), DMS(-9, 40, 10.6), 2.07, 721, 'B0.5 Ia'],
  ['meissa', 'Meyssa (λ Orion)', 'orion', HMS(5, 35, 8.28), DMS(9, 56, 3.0), 3.47, 1055, 'O8 III'],
  ['vega', 'Vega (α Lira)', 'uchburchak', HMS(18, 36, 56.34), DMS(38, 47, 1.3), 0.03, 25, 'A0 V'],
  ['deneb', 'Deneb (α Oqqush)', 'uchburchak', HMS(20, 41, 25.9), DMS(45, 16, 49), 1.25, 2600, 'A2 Ia'],
  ['altair', 'Altair (α Burgut)', 'uchburchak', HMS(19, 50, 47.0), DMS(8, 52, 6), 0.77, 17, 'A7 V'],
  ['sirius', 'Sirius (α Katta It)', 'katta_it', HMS(6, 45, 8.92), DMS(-16, 42, 58.0), -1.46, 8.6, 'A1 V']
];
const CHIZIQ = {
  katta_ayiq:[['dubhe','merak'],['merak','phecda'],['phecda','megrez'],['megrez','dubhe'],['megrez','alioth'],['alioth','mizar'],['mizar','alkaid']],
  kichik_ayiq:[['polaris','yildun'],['yildun','eps_umi'],['eps_umi','zet_umi'],['zet_umi','kochab'],['kochab','pherkad'],['pherkad','eta_umi'],['eta_umi','zet_umi']],
  kassiopeya:[['caph','schedar'],['schedar','gam_cas'],['gam_cas','ruchbah'],['ruchbah','segin']],
  orion:[['meissa','betelgeuse'],['meissa','bellatrix'],['betelgeuse','bellatrix'],['betelgeuse','alnitak'],['bellatrix','mintaka'],['mintaka','alnilam'],['alnilam','alnitak'],['alnitak','saiph'],['mintaka','rigel']],
  uchburchak:[['vega','deneb'],['deneb','altair'],['altair','vega']]
};
const TURKUM = {
  katta_ayiq:{nom:'Katta Ayiq', lst:11, az:0, alt:62, vaqt:'bahor oqshomlarida (aprel, ~21:00) — deyarli tepada'},
  kichik_ayiq:{nom:'Kichik Ayiq', lst:20.6, az:0, alt:48, vaqt:'yil bo‘yi — shimolda, Qutb yulduzi atrofida'},
  kassiopeya:{nom:'Kassiopeya', lst:1, az:0, alt:66, vaqt:'kuz va qish oqshomlarida (noyabr–dekabr, ~21:00) — shimolda baland'},
  orion:{nom:'Orion', lst:5.6, az:180, alt:36, vaqt:'qish oqshomlarida (yanvar–fevral, ~21:00) — janubda'},
  uchburchak:{nom:'Yozgi uchburchak', lst:19.6, az:180, alt:66, vaqt:'yoz oxiri va kuz oqshomlarida (avgust–sentabr) — boshning ustida'},
  katta_it:{nom:'Katta It (Sirius)', lst:6.8, az:180, alt:24, vaqt:'qish oqshomlarida (fevral) — janubda past'}
};
const RANG = sp=>{ const c = sp[0]; return {O:0x9bb0ff, B:0xaabfff, A:0xe4ecff, F:0xfff4e8, G:0xffe9b0, K:0xffc27a, M:0xff9360}[c] || 0xffffff; };
REG.fa_yulduzlar = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Astronomiya · yulduzli osmon · Toshkent (41,3° sh.k.) · yulduzlar joyi haqiqiy (J2000)');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:0, ry:0, avto:false, fov:74, zoom:1, env:0});
  const g = S.g;
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const FI = 41.3 * RAD, RS = 50;
  const Q = new T.Vector3(0, Math.cos(FI), Math.sin(FI)), E = new T.Vector3(1, 0, 0), P = new T.Vector3(0, Math.sin(FI), -Math.cos(FI));
  const baza = new T.Matrix4().makeBasis(Q, E, P);
  const qutbG = new T.Group(); qutbG.matrixAutoUpdate = false; qutbG.matrix.copy(baza); g.add(qutbG);
  const osmonG = new T.Group(); qutbG.add(osmonG);
  const eqv = (ra, dec, r)=>new T.Vector3(Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)).multiplyScalar(r || RS);
  const glow = nurTex([[0, 'rgba(255,255,255,1)'], [.08, 'rgba(255,255,255,.95)'], [.22, 'rgba(255,255,255,.35)'], [.5, 'rgba(255,255,255,.07)'], [1, 'rgba(255,255,255,0)']]);
  const nuqtaT = nurTex([[0, 'rgba(255,255,255,1)'], [.35, 'rgba(255,255,255,.6)'], [1, 'rgba(255,255,255,0)']]);
  /* fon yulduzlari va Somon yo‘li (dekorativ, tasodifiy — sxematik) */
  const r = rng(2024);
  const fonN = tejam ? 900 : 1600, smN = tejam ? 1600 : 3200;
  const pos = [], col = [];
  for(let i = 0; i < fonN; i++){ const z = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - z * z); pos.push(s * Math.cos(a) * 52, s * Math.sin(a) * 52, z * 52); const b = .18 + Math.pow(r(), 3) * .75, t = r(); col.push(b * (t < .2 ? 1 : .85), b * .92, b * (t > .75 ? 1 : .82)); }
  const A = [[-0.0548755604, -0.8734370902, -0.4838350155], [0.4941094279, -0.4448296300, 0.7469822445], [-0.8676661490, -0.1980763734, 0.4559837762]];
  for(let i = 0; i < smN; i++){
    const l = r() * Math.PI * 2, b = gauss(r) * (6 + 4 * Math.pow(Math.cos(l / 2), 2)) * RAD;
    const gv = [Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)];
    const x = A[0][0] * gv[0] + A[1][0] * gv[1] + A[2][0] * gv[2], y = A[0][1] * gv[0] + A[1][1] * gv[1] + A[2][1] * gv[2], z = A[0][2] * gv[0] + A[1][2] * gv[1] + A[2][2] * gv[2];
    pos.push(x * 53, y * 53, z * 53);
    const k = (.05 + r() * .14) * (1 + 1.2 * Math.pow(Math.max(0, Math.cos(l)), 3));
    col.push(k * .9, k * .92, k);
  }
  const fg = new T.BufferGeometry(); fg.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); fg.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  const fon = new T.Points(fg, new T.PointsMaterial({size:2.4, sizeAttenuation:false, map:nuqtaT, vertexColors:true, transparent:true, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false}));
  fon.renderOrder = 1; osmonG.add(fon);
  /* nomli yulduzlar */
  const YJ = {};
  YULDUZ.forEach(([k, nom, tk, ra, dec, mag, mas, sp])=>{
    const p = eqv(ra, dec);
    const s = nur(glow, RANG(sp), 3.9 * Math.pow(10, -.12 * mag), 1); s.position.copy(p); s.renderOrder = 2; osmonG.add(s);
    const hit = new T.Mesh(new T.SphereGeometry(1.1, 8, 6), new T.MeshBasicMaterial({colorWrite:false, depthWrite:false, transparent:true, opacity:.3})); hit.position.copy(p); hit.userData = {nom:k, p:2, turkum:tk}; osmonG.add(hit);
    const lb = L.qosh(s, /^(eps|zet|eta|gam)_/.test(k) ? nom.split(' ')[0] : nom.replace(/ \(.*/, ''), 'kichik', {dy:16});
    YJ[k] = {k, nom, tk, ra, dec, mag, mas, sp, s, hit, lb, p};
  });
  const chMat = new T.LineBasicMaterial({color:0x7b8ce6, transparent:true, opacity:.55, depthWrite:false});
  const chizG = {};
  Object.keys(CHIZIQ).forEach(tk=>{
    const pts = []; CHIZIQ[tk].forEach(([a, b])=>{ const pa = YJ[a].p.clone(), pb = YJ[b].p.clone(); const d = pb.clone().sub(pa).normalize(); pts.push(pa.addScaledVector(d, .9), pb.addScaledVector(d, -.9)); });
    const ls = new T.LineSegments(new T.BufferGeometry().setFromPoints(pts), tk === 'uchburchak' ? new T.LineBasicMaterial({color:0xffc86b, transparent:true, opacity:.35, depthWrite:false}) : chMat); ls.renderOrder = 3; osmonG.add(ls); chizG[tk] = ls;
  });
  const TLB = {};
  Object.keys(TURKUM).forEach(tk=>{ const ys = YULDUZ.filter(y=>y[2] === tk).map(y=>YJ[y[0]].p); const c = ys.reduce((a, b)=>a.add(b), new T.Vector3()).multiplyScalar(1 / ys.length).setLength(RS - 1); const o = new T.Object3D(); o.position.copy(c); osmonG.add(o); TLB[tk] = L.qosh(o, TURKUM[tk].nom, 'turkum', {dy:tk === 'kichik_ayiq' ? 34 : -22}); });
  /* Qutb yulduzini topish: Merak → Dubhe davomi */
  const qutbYolPts = []; { const a = YJ.merak.p.clone().normalize(), b = YJ.polaris.p.clone().normalize(); for(let i = 0; i <= 40; i++){ const t = i / 40; qutbYolPts.push(new T.Vector3().copy(a).multiplyScalar(Math.sin((1 - t) * a.angleTo(b))).add(b.clone().multiplyScalar(Math.sin(t * a.angleTo(b)))).normalize().multiplyScalar(RS - .5)); } }
  const qutbYol = new T.Line(new T.BufferGeometry().setFromPoints(qutbYolPts), new T.LineDashedMaterial({color:0xffd57f, dashSize:.9, gapSize:.6, transparent:true, opacity:.8, depthWrite:false})); qutbYol.computeLineDistances(); qutbYol.visible = false; qutbYol.renderOrder = 3; osmonG.add(qutbYol);
  /* dunyo o‘qi va osmon ekvatori */
  const ekvPts = []; for(let i = 0; i <= 128; i++){ const a = i / 128 * Math.PI * 2; ekvPts.push(new T.Vector3(Math.cos(a) * (RS - .3), Math.sin(a) * (RS - .3), 0)); }
  const ekv = new T.Line(new T.BufferGeometry().setFromPoints(ekvPts), new T.LineDashedMaterial({color:0x4fb3ff, dashSize:1.2, gapSize:1, transparent:true, opacity:.35, depthWrite:false})); ekv.computeLineDistances(); ekv.visible = false; qutbG.add(ekv);
  /* ufq: yer, tog‘ siluetlari, shafaq */
  const yer = new T.Mesh(new T.SphereGeometry(45, 48, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), new T.MeshBasicMaterial({color:0x070a12, side:T.BackSide})); yer.renderOrder = 0; g.add(yer);
  const [uc, ux] = kanvas(2048, 256);
  const ug = ux.createLinearGradient(0, 0, 0, 256); ug.addColorStop(0, 'rgba(40,70,140,0)'); ug.addColorStop(.62, 'rgba(46,78,150,.28)'); ug.addColorStop(1, 'rgba(70,100,170,.5)'); ux.fillStyle = ug; ux.fillRect(0, 0, 2048, 256);
  ux.fillStyle = '#05070e'; ux.beginPath(); ux.moveTo(0, 256); let hy = 226;
  for(let x = 0; x <= 2048; x += 8){ const az = x / 2048 * 360; const tog = (az > 40 && az < 130) ? 55 * Math.max(0, Math.sin((az - 40) / 90 * Math.PI)) : 0; hy = 238 - tog - 10 * Math.sin(x * .013) * Math.sin(x * .0041) - 6 * Math.sin(x * .05) * Math.sin(x * .007); ux.lineTo(x, hy); }
  ux.lineTo(2048, 256); ux.fill();
  const ufqT = tex(uc);
  const ufq = new T.Mesh(new T.CylinderGeometry(44, 44, 7, 96, 1, true), new T.MeshBasicMaterial({map:ufqT, transparent:true, side:T.BackSide, depthWrite:false, toneMapped:false}));
  ufq.position.y = 2.6; ufq.renderOrder = 5; g.add(ufq);
  /* silindr UV: u=0 +z dan boshlanadi; teksturadagi az (shimoldan sharqqa) mosligi taxminiy — tog‘lar sharq tomonda */
  ufq.rotation.y = Math.PI;
  [['Shimol', 0, 0, -1], ['Sharq', 1, 0, 0], ['Janub', 0, 0, 1], ['G‘arb', -1, 0, 0]].forEach(([n, x, y, z])=>L.qosh(new T.Vector3(x * 40, .9, z * 40), n, 'pill'));
  const zenit = L.qosh(new T.Vector3(0, 40, 0), 'Zenit', 'kichik');
  /* holat */
  let lst = 20.6, lstM = 20.6, yaw = 0, pitch = -30 * RAD, yawM = 0, pitchM = -30 * RAD, fov = 74, fovM = 74, aylanish = false, tanlangan = null, turkum = null;
  const lstIzoh = ()=>{ const s = ((lst % 24) + 24) % 24; return String(Math.floor(s)).padStart(2, '0') + ':' + String(Math.floor((s % 1) * 60)).padStart(2, '0'); };
  function yonalish(v){ const x = v.x, y = v.y, z = v.z; yawM = Math.atan2(x, -z); pitchM = -Math.atan2(y, Math.hypot(x, z)); }
  function azAlt(az, alt){ return new T.Vector3(Math.sin(az * RAD) * Math.cos(alt * RAD), Math.sin(alt * RAD), -Math.cos(az * RAD) * Math.cos(alt * RAD)); }
  function gYon(y){ return y.p.clone().applyAxisAngle(new T.Vector3(0, 0, 1), -lst * 15 * RAD).applyMatrix4(baza); }
  function kartaYoz(){
    let h = '';
    if(tanlangan){ const y = YJ[tanlangan]; const v = gYon(y); const alt = Math.asin(v.y / RS) / RAD;
      h = '<span class="ust">' + (TURKUM[y.tk] ? TURKUM[y.tk].nom : 'Yulduz') + '</span><div class="fx" style="font-size:14px">' + y.nom + '</div><div class="q"><span>Ko‘rinma kattalik</span><b class="y">' + son(y.mag, 2) + '<sup>m</sup></b><span>Masofa</span><b>' + (y.mas >= 1000 ? mingli(y.mas) : son(y.mas, y.mas < 10 ? 1 : 0)) + ' y.y.' + (y.k === 'deneb' ? '*' : '') + '</b><span>Spektral sinf</span><b>' + y.sp + '</b><span>Hozir balandligi</span><b class="' + (alt > 0 ? 's' : 'r') + '">' + son(alt, 0) + '°</b></div>' + (y.k === 'deneb' ? '<p class="iz">* Deneb masofasi taxminiy (baholar ≈1 500–2 600 y.y.).</p>' : '');
    } else if(turkum){ const t = TURKUM[turkum]; h = '<span class="ust">Yulduz turkumi</span><div class="fx">' + t.nom + '</div><p class="iz" style="margin-top:0">Yaxshi ko‘rinadi: ' + t.vaqt + ' (taxminan).</p>'; }
    else h = '<span class="ust">Yulduzli osmon · Toshkent</span><p class="iz" style="margin-top:0">Shimolga qarab turibmiz. Qutb yulduzi ufqdan ≈41° balandda — bu joyning geografik kengligiga teng. Yulduzni bosing.</p>';
    h += '<div class="q" style="margin-top:8px"><span>Yulduz vaqti (taxminiy)</span><b>' + lstIzoh() + '</b></div>';
    K.innerHTML = h;
  }
  const tkT = U.tugmalar(Object.keys(TURKUM).map(k=>[k, TURKUM[k].nom.replace(' (Sirius)', '')]), k=>S.holat({turkum:k}));
  U.ajr();
  const qT = U.tugma('Qutb yulduzini topish', ()=>S.holat({qutb:!qutbYol.visible}));
  const aT = U.tugma('▶ Osmon aylanishi', ()=>S.holat({aylanish:!aylanishOl()}));
  const ekT = U.tugma('Osmon ekvatori', b=>{ ekv.visible = !ekv.visible; b.classList.toggle('faol', ekv.visible); });
  const aylanishOl = ()=>aylanish;
  S.holat = h=>{
    if(!h) return;
    if(h.turkum && TURKUM[h.turkum]){ turkum = h.turkum; tanlangan = null; tkT.f(turkum); const t = TURKUM[turkum]; lstM = t.lst; if(Math.abs(lstM - lst) > 12) lst += 24 * Math.sign(lstM - lst); aylanish = false; aT.classList.remove('faol'); yonalish(azAlt(t.az, t.alt)); fovM = turkum === 'uchburchak' ? 80 : turkum === 'orion' || turkum === 'katta_it' ? 62 : 66; Object.keys(chizG).forEach(k=>chizG[k].material.opacity = k === turkum ? .95 : .4); hodisa('fa-turkum', {nom:turkum}); izoh.innerHTML = '<b>' + t.nom + '.</b> Osmon ' + t.vaqt + ' qanday ko‘rinishi ko‘rsatildi (taxminiy vaqt).'; }
    if(h.qutb !== undefined){ qutbYol.visible = !!h.qutb; qT.classList.toggle('faol', qutbYol.visible); if(qutbYol.visible){ turkum = null; tkT.f(''); lstM = 20.6; if(Math.abs(lstM - lst) > 12) lst += 24 * Math.sign(lstM - lst); yonalish(azAlt(345, 40)); fovM = 78; izoh.innerHTML = '<b>Qutb yulduzini topish.</b> Katta Ayiq «cho‘mich»ining chetidagi ikki yulduz — Merak va Dubhe orqali to‘g‘ri chiziq o‘tkazing: ular orasidagi masofani taxminan 5 marta qo‘ysangiz, Qutb yulduziga yetasiz.'; hodisa('fa-qutb', {}); } }
    if(h.aylanish !== undefined){ aylanish = !!h.aylanish; aT.classList.toggle('faol', aylanish); aT.innerHTML = aylanish ? '❚❚ To‘xtatish' : '▶ Osmon aylanishi'; if(aylanish){ yonalish(azAlt(0, 42)); fovM = 90; izoh.innerHTML = '<b>Osmonning sutkalik aylanishi.</b> Yer o‘z o‘qi atrofida aylangani uchun yulduzlar Qutb yulduzi atrofida soat miliga teskari (shimolga qaraganda) aylanadi; ba’zilari ufqqa botmaydi.'; hodisa('fa-aylanish', {}); } }
    if(h.yulduz && YJ[h.yulduz]){ tanlangan = h.yulduz; yonalish(gYon(YJ[h.yulduz])); }
    kartaYoz();
  };
  S.aylanish = v=>{ if(v !== undefined) S.holat({aylanish:v}); return aylanish; };
  S.zoomla = k=>{ fovM = cheg(fovM * k, 25, 100); };
  S.tikla = ()=>{ turkum = null; tanlangan = null; tkT.f(''); lstM = 20.6; if(Math.abs(lstM - lst) > 12) lst += 24 * Math.sign(lstM - lst); yawM = 0; pitchM = -30 * RAD; fovM = 74; kartaYoz(); };
  S.qotir = ()=>{ S.aylanish(false); };
  bosishUlash(S, d=>{ tanlangan = d.nom; hodisa('detal', {turD:'fa_yulduz', nom:d.nom}); hodisa('fa-yulduz', {nom:d.nom, turkum:d.turkum}); izoh.innerHTML = '<b>' + YJ[d.nom].nom + '.</b> ' + (TURKUM[d.turkum] ? TURKUM[d.turkum].nom + ' turkumi.' : ''); kartaYoz(); });
  /* sudrash — osmonni aylantirish */
  let bos = false, px = 0, py = 0;
  const el = S.el;
  el.addEventListener('pointerdown', e=>{ bos = true; px = e.clientX; py = e.clientY; });
  const qoy = ()=>{ bos = false; };
  el.addEventListener('pointerup', qoy); el.addEventListener('pointercancel', qoy); el.addEventListener('pointerleave', qoy);
  el.addEventListener('pointermove', e=>{ if(!bos) return; const k = fov / 74 * .0045; yawM -= (e.clientX - px) * k; pitchM = cheg(pitchM - (e.clientY - py) * k, -Math.PI / 2 + .02, .3); yaw = yawM; pitch = pitchM; px = e.clientX; py = e.clientY; });
  el.addEventListener('wheel', e=>{ e.preventDefault(); S.zoomla(e.deltaY > 0 ? 1.1 : 1 / 1.1); }, {passive:false});
  S.joyla(.001, new T.Vector3());
  S.cam.near = .01; S.cam.far = 200; S.cam.updateProjectionMatrix();
  let kt = 0;
  kadrUlash(S, L, (dt)=>{
    if(aylanish){ lst += dt * (S.tezlik || 1) * .8; lstM = lst; }
    else lst += (lstM - lst) * Math.min(1, dt * 2.5);
    osmonG.rotation.z = -lst * 15 * RAD;
    let dy = yawM - yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); yaw += dy * Math.min(1, dt * 4); pitch += (pitchM - pitch) * Math.min(1, dt * 4);
    S.aylan.rotation.set(pitch, yaw, 0, 'XYZ');
    fov += (fovM - fov) * Math.min(1, dt * 4);
    if(Math.abs(S.cam.fov - fov) > .01){ S.cam.fov = fov; S.cam.updateProjectionMatrix(); }
    S.cam.position.set(0, 0, 0); S.g.position.set(0, 0, 0);
    kt += dt; if(kt > .5){ kt = 0; kartaYoz(); Object.values(YJ).forEach(y=>{ const up = gYon(y).y > 0; y.lb.kor = up; y.hit.visible = up; }); Object.keys(TLB).forEach(tk=>{ const ys = YULDUZ.filter(q=>q[2] === tk); TLB[tk].kor = ys.some(q=>gYon(YJ[q[0]]).y > 0); }); }
  });
  S.aylan.rotation.order = 'XYZ';
  kartaYoz();
  izoh.innerHTML = '<b>Yulduzli osmon.</b> Sentabr oqshomi, Toshkent, shimolga qarab turibmiz. Sichqoncha bilan osmonni suring, g‘ildirakcha bilan yaqinlashtiring, yulduzni bosing.';
  return S;
};

/* =====================================================================
   6. QUYOSH VA OY TUTILISHLARI — fa_tutilish
   ===================================================================== */
function oyTex(){
  const [c, x] = kanvas(512, 256); const r = rng(33);
  x.fillStyle = '#9a978f'; x.fillRect(0, 0, 512, 256);
  for(let i = 0; i < 14; i++){ x.fillStyle = 'rgba(60,60,64,' + (.25 + r() * .3) + ')'; x.beginPath(); x.ellipse(r() * 512, 60 + r() * 140, 20 + r() * 60, 12 + r() * 40, r() * 3, 0, 7); x.fill(); }
  for(let i = 0; i < 220; i++){ const cx = r() * 512, cy = r() * 256, rr = 1 + Math.pow(r(), 3) * 12; x.strokeStyle = 'rgba(40,40,44,.35)'; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, rr, 0, 7); x.stroke(); x.fillStyle = 'rgba(230,230,225,.12)'; x.beginPath(); x.arc(cx - rr * .3, cy - rr * .3, rr * .6, 0, 7); x.fill(); }
  return tex(c);
}
REG.fa_tutilish = async (sahna, {tag, izoh, yorliq, skriptYukla})=>{
  yorliq('Astronomiya · Quyosh va Oy tutilishlari · masshtab siqilgan, og‘ish kattalashtirilgan');
  try{ if(skriptYukla) await skriptYukla('lib/sayyoralar.js', ()=>window.MAKON_SAYYORA_RASM); }catch(e){}
  if(!sahna.isConnected) return null;
  const S = tayyorla(sahna, {rx:.42, ry:-.5, avto:false, fov:30, zoom:1, rxMin:-.3, rxMax:1.5, env:.1});
  const g = S.g;
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const glow = nurTex();
  const RR = window.MAKON_SAYYORA_RASM || {};
  const tl = new T.TextureLoader();
  S.sc.add(new T.AmbientLight(0x2a3050, .35));
  const kun = new T.DirectionalLight(0xfff2de, 1.7); kun.position.set(-20, 0, 0); S.sc.add(kun);
  const SX = -8.5, RO = 3.3, RE = .9, RM = .27;
  /* Quyosh */
  const [qc, qx] = kanvas(512, 256); { const r5 = rng(21); qx.fillStyle = '#ffd35a'; qx.fillRect(0, 0, 512, 256); for(let i = 0; i < 2600; i++){ qx.fillStyle = 'rgba(255,' + (215 + Math.floor(r5() * 40)) + ',' + (120 + Math.floor(r5() * 100)) + ',' + (.3 + r5() * .4) + ')'; qx.beginPath(); qx.arc(r5() * 512, r5() * 256, 1 + r5() * 2.5, 0, 7); qx.fill(); } }
  const quyosh = new T.Mesh(new T.SphereGeometry(1.5, 48, 32), new T.MeshBasicMaterial({color:0xffffff, map:tex(qc), toneMapped:false})); quyosh.position.set(SX, 0, 0); quyosh.userData = {nom:'quyosh', p:1}; g.add(quyosh);
  const qGlow = nurTex([[0, 'rgba(255,255,255,1)'], [.3, 'rgba(255,255,255,.9)'], [.45, 'rgba(255,255,255,.5)'], [.7, 'rgba(255,255,255,.14)'], [1, 'rgba(255,255,255,0)']]);
  const qn1 = nur(qGlow, 0xff9a30, 7, .75, true), qn2 = nur(qGlow, 0xffe9a8, 4.4, .8, true); qn1.position.copy(quyosh.position); qn2.position.copy(quyosh.position); g.add(qn1, qn2);
  /* Yer */
  const yT = RR.yer ? tl.load(RR.yer) : null; if(yT) yT.encoding = T.sRGBEncoding;
  const yer = new T.Mesh(new T.SphereGeometry(RE, 48, 32), new T.MeshStandardMaterial({color:yT ? 0xffffff : 0x3a78c8, map:yT, roughness:.8})); yer.userData = {nom:'yer', p:1}; g.add(yer);
  const atm = nur(glow, 0x5aa8ff, 2.3, .25); g.add(atm);
  /* Oy */
  const oyMat = new T.MeshStandardMaterial({color:0xffffff, map:oyTex(), roughness:.95});
  const oy = new T.Mesh(new T.SphereGeometry(RM, 40, 28), oyMat); oy.userData = {nom:'oy', p:2}; g.add(oy);
  const oyNur = nur(glow, 0xff5a2a, .9, 0); g.add(oyNur);
  /* ekliptika tekisligi */
  const ek = new T.Mesh(new T.RingGeometry(RO - .8, RO + .8, 96), new T.MeshBasicMaterial({color:0x6a79b8, transparent:true, opacity:.07, side:T.DoubleSide, depthWrite:false})); ek.rotation.x = -Math.PI / 2; g.add(ek);
  const ekRing = new T.Mesh(new T.RingGeometry(RO - .01, RO + .01, 160), new T.MeshBasicMaterial({color:0x8d95b8, transparent:true, opacity:.35, side:T.DoubleSide})); ekRing.rotation.x = -Math.PI / 2; g.add(ekRing);
  /* Oy orbitasi (og‘ma) */
  const orbG = new T.Group(); g.add(orbG);
  const orbT = new T.Group(); orbG.add(orbT);
  const orbit = new T.Mesh(new T.TorusGeometry(RO, .018, 8, 200), new T.MeshBasicMaterial({color:0x9d8cff, toneMapped:false})); orbit.rotation.x = Math.PI / 2; orbT.add(orbit);
  const tugunMat = new T.MeshBasicMaterial({color:0xffc14d, toneMapped:false});
  const tugunA = new T.Mesh(new T.SphereGeometry(.08, 16, 12), tugunMat), tugunB = tugunA.clone(); tugunA.userData = {nom:'tugun', p:2}; tugunB.userData = {nom:'tugun', p:2}; orbG.add(tugunA, tugunB);
  const tugunChiz = new T.Mesh(new T.CylinderGeometry(.008, .008, RO * 2, 6), new T.MeshBasicMaterial({color:0xffc14d, transparent:true, opacity:.5})); tugunChiz.rotation.z = Math.PI / 2; orbG.add(tugunChiz);
  L.qosh(tugunA, 'tugun', 'kichik sariq', {dy:-14}); L.qosh(tugunB, 'tugun', 'kichik sariq', {dy:-14});
  /* soyalar */
  const umbMat = new T.MeshBasicMaterial({color:0x020309, transparent:true, opacity:.55, side:T.DoubleSide, depthWrite:false});
  const penMat = new T.MeshBasicMaterial({color:0x1e2a55, transparent:true, opacity:.2, side:T.DoubleSide, depthWrite:false});
  const UL = 6.2;
  const yUmb = new T.Mesh(new T.ConeGeometry(RE, UL, 48, 1, true), umbMat); yUmb.rotation.z = -Math.PI / 2; yUmb.position.x = UL / 2; yUmb.userData = {nom:'umbra', p:3}; g.add(yUmb);
  const penGeo = new T.CylinderGeometry(RE, RE + 1.25, 5.2, 48, 1, true);
  const yPen = new T.Mesh(penGeo, penMat); yPen.rotation.z = Math.PI / 2; yPen.position.x = 2.6; yPen.userData = {nom:'penumbra', p:1}; g.add(yPen);
  const oySoyaG = new T.Group(); g.add(oySoyaG);
  const oUmb = new T.Mesh(new T.ConeGeometry(RM, 3.25, 32, 1, true), umbMat); oUmb.rotation.z = -Math.PI / 2; oUmb.position.x = 3.25 / 2; oUmb.userData = {nom:'oy_soyasi', p:3}; oySoyaG.add(oUmb);
  const oPen = new T.Mesh(new T.CylinderGeometry(RM, RM + .9, 3.3, 32, 1, true), penMat); oPen.rotation.z = Math.PI / 2; oPen.position.x = 1.65; oPen.userData = {nom:'oy_penumbra', p:1}; oySoyaG.add(oPen);
  const dog = new T.Mesh(new T.CircleGeometry(.12, 32), new T.MeshBasicMaterial({color:0x000000, transparent:true, opacity:.85, depthWrite:false})), dogP = new T.Mesh(new T.CircleGeometry(.5, 32), new T.MeshBasicMaterial({color:0x000000, transparent:true, opacity:.3, depthWrite:false}));
  g.add(dog, dogP);
  L.qosh(quyosh, 'Quyosh', 'pill sariq', {dy:-70});
  L.qosh(yer, 'Yer', 'pill', {dy:-40});
  const lOy = L.qosh(oy, 'Oy', 'pill', {dy:-22});
  const lUmb = L.qosh(new T.Vector3(RO + 1.4, .55, 0), 'to‘liq soya (umbra)', 'kichik');
  const lPen = L.qosh(new T.Vector3(RO + .3, 1.55, 0), 'yarim soya (penumbra)', 'kichik');
  const IR = 5.145;
  let rejim = 'oy', E = 180, nu = 0, kat = true, yur = false, tur = null, daraja = 'yoq', faza = 'tolin', eskiKey = '', sanoq = {yangi:0, tolin:0, quyosh:0, oyT:0, kun:0};
  const [vc, vx] = kanvas(300, 300);
  function tasnif(){
    const u = (E - nu) * RAD; const beta = IR * Math.sin(u);
    const e = ((E % 360) + 360) % 360; let t = null, d = 'yoq', f = null;
    if(e < 2.5 || e > 357.5){ f = 'yangi'; if(Math.abs(beta) < .9) d = 'tola'; else if(Math.abs(beta) < 1.5) d = 'qisman'; if(d !== 'yoq') t = 'quyosh'; }
    else if(Math.abs(e - 180) < 2.5){ f = 'tolin'; if(Math.abs(beta) < .4) d = 'tola'; else if(Math.abs(beta) < 1.0) d = 'qisman'; else if(Math.abs(beta) < 1.55) d = 'yarim'; if(d !== 'yoq') t = 'oy'; }
    return {beta, t, d, f, e};
  }
  function korinish(k){
    vx.fillStyle = '#060913'; vx.fillRect(0, 0, 300, 300);
    const c = 150;
    if(k.e < 30 || k.e > 330){
      /* Yerdan Quyosh tomon: Oy diski Quyosh ustidan o‘tadi */
      const dx = (k.e > 180 ? k.e - 360 : k.e) * 9, dy = -k.beta * 60;
      if(k.d === 'tola'){ const gr = vx.createRadialGradient(c, c, 50, c, c, 140); gr.addColorStop(0, 'rgba(220,230,255,.8)'); gr.addColorStop(1, 'rgba(220,230,255,0)'); vx.fillStyle = gr; vx.fillRect(0, 0, 300, 300); }
      vx.fillStyle = '#ffd36b'; vx.beginPath(); vx.arc(c, c, 56, 0, 7); vx.fill();
      vx.fillStyle = k.d === 'tola' ? '#05060c' : '#1a1e2c'; vx.beginPath(); vx.arc(c + dx, c + dy, 58, 0, 7); vx.fill();
      return 'Quyosh tomonga qarasak';
    }
    if(Math.abs(k.e - 180) < 30){
      const dx = (k.e - 180) * 9, dy = k.beta * 60;
      vx.fillStyle = 'rgba(40,10,5,.55)'; vx.beginPath(); vx.arc(c - dx, c - dy, 118, 0, 7); vx.fill();
      const ich = Math.hypot(dx, dy);
      const moon = ich < 60 ? '#a3391c' : ich < 175 ? '#6f6a64' : '#e9e4d6';
      vx.fillStyle = moon; vx.beginPath(); vx.arc(c, c, 44, 0, 7); vx.fill();
      if(ich >= 60 && ich < 175){ vx.save(); vx.beginPath(); vx.arc(c, c, 44, 0, 7); vx.clip(); vx.fillStyle = '#e9e4d6'; vx.beginPath(); vx.arc(c, c, 44, 0, 7); vx.fill(); vx.fillStyle = 'rgba(120,30,15,.95)'; vx.beginPath(); vx.arc(c - dx, c - dy, 118, 0, 7); vx.fill(); vx.restore(); }
      return 'Oyga qarasak';
    }
    vx.fillStyle = '#e9e4d6'; vx.beginPath(); vx.arc(c, c, 44, 0, 7); vx.fill();
    return 'Oy (tutilish yo‘q)';
  }
  const DN = {tola:'to‘liq', qisman:'xususiy (qisman)', yarim:'yarim soyali', yoq:'yo‘q'};
  function kartaYoz(k){
    const sar = korinish(k);
    let h = '<span class="ust">' + sar + '</span><canvas width="300" height="300" style="width:150px;margin:0 auto 6px"></canvas>';
    h += '<div class="q"><span>Faza</span><b>' + (k.f === 'yangi' ? 'yangi oy' : k.f === 'tolin' ? 'to‘lin oy' : son(k.e, 0) + '°') + '</b><span>Oy ekliptikadan</span><b class="k">' + son(k.beta, 2) + '°</b><span>Tutilish</span><b class="' + (k.t ? 's' : 'r') + '">' + (k.t ? (k.t === 'quyosh' ? 'Quyosh — ' : 'Oy — ') + DN[k.d] : 'yo‘q') + '</b>';
    if(rejim === 'yil') h += '<span>Kun</span><b>' + Math.floor(sanoq.kun) + '</b><span>Yangi / to‘lin oylar</span><b>' + sanoq.yangi + ' / ' + sanoq.tolin + '</b><span>Tutilishlar Q / O</span><b class="y">' + sanoq.quyosh + ' / ' + sanoq.oyT + '</b>';
    h += '</div><p class="iz">Oy orbitasi ekliptikaga ≈5,1° og‘gan. Tutilish faqat yangi yoki to‘lin oy tugunlar yaqinida bo‘lganda sodir bo‘ladi (chegaralar taxminiy).</p>';
    K.innerHTML = h; const cv = K.querySelector('canvas'); cv.getContext('2d').drawImage(vc, 0, 0);
  }
  const rejT = U.tugmalar([['quyosh', 'Quyosh tutilishi'], ['oy', 'Oy tutilishi'], ['yil', 'Nega har oy emas?']], k=>S.holat({rejim:k}), rejim);
  U.ajr();
  const eSl = U.slayder('Oy o‘rni', 0, 359, 1, E, v=>v + '°', v=>{ E = v; yur = false; });
  const nSl = U.slayder('Tugunlar', 0, 180, 1, nu, v=>v + '°', v=>{ nu = v; yur = false; });
  const katT = U.tugma('Og‘ish ×3', b=>{ kat = !kat; b.classList.toggle('faol', kat); });
  katT.classList.add('faol');
  const yurT = U.tugma('▶ Harakat', ()=>S.holat({yur:!yur}));
  S.holat = h=>{
    if(!h) return;
    if(h.rejim){ rejim = ['quyosh', 'oy', 'yil'].includes(h.rejim) ? h.rejim : 'oy'; rejT.f(rejim);
      if(rejim === 'quyosh'){ E = 0; nu = 0; yur = false; izoh.innerHTML = '<b>Quyosh tutilishi</b> — yangi oyda Oy Quyosh va Yer orasiga tushib, Yer yuzasiga soya tashlaydi. To‘liq soya (umbra) tushgan tor yo‘lakda Quyosh to‘liq to‘siladi.'; }
      if(rejim === 'oy'){ E = 180; nu = 0; yur = false; izoh.innerHTML = '<b>Oy tutilishi</b> — to‘lin oyda Oy Yerning soyasiga kiradi. Yer atmosferasi sindirgan qizil nurlar tufayli Oy qo‘ng‘ir-qizil tusga kiradi.'; }
      if(rejim === 'yil'){ E = 0; nu = 60; yur = true; sanoq = {yangi:0, tolin:0, quyosh:0, oyT:0, kun:0}; izoh.innerHTML = '<b>Nega tutilish har oy bo‘lmaydi?</b> Oy orbitasi og‘gan: ko‘pincha yangi oyda Oy Quyoshdan biroz yuqoridan yoki pastdan o‘tadi. Tutilish faqat tugunlar chizig‘i Quyoshga qaraganda — yiliga taxminan ikki marta (tutilish mavsumi) bo‘ladi.'; }
      eSl.qoy(E); nSl.qoy(nu); }
    if(h.E !== undefined){ E = +h.E; eSl.qoy(E); }
    if(h.tugun !== undefined){ nu = +h.tugun; nSl.qoy(nu); }
    if(h.yur !== undefined) yur = !!h.yur;
    yurT.innerHTML = yur ? '❚❚ Pauza' : '▶ Harakat';
  };
  S.aylanish = v=>{ if(v !== undefined) S.holat({yur:v}); return yur; };
  bosishUlash(S, d=>{ hodisa('detal', {turD:'fa_tutilish', nom:d.nom}); hodisa('fa-tutilish-qism', {nom:d.nom}); });
  S.joyla(6.4, new T.Vector3(-1.4, 0, 0));
  const vM = new T.Vector3(), vS = new T.Vector3(), tmp = new T.Vector3(), oyAsl = new T.Color(0xffffff), oyQiz = new T.Color(0xc0502a);
  let kt = 0, eOld = E;
  kadrUlash(S, L, (dt0)=>{
    const dt = dt0 * (S.tezlik || 1);
    if(yur){ const kunlar = dt * 8; sanoq.kun += kunlar; E = (E + 12.1907 * kunlar) % 360; nu = (nu + 1.0386 * kunlar) % 360; eSl.qoy(Math.round(E)); nSl.qoy(Math.round(nu % 180)); }
    const ivis = (kat ? IR * 3 : IR) * RAD;
    /* tugunlar chizig‘i: Quyosh yo‘nalishiga (−x) nisbatan nu burchakda */
    const lamN = (180 + nu) * RAD;
    orbG.rotation.y = lamN;
    orbT.rotation.x = ivis;
    tugunA.position.set(RO, 0, 0); tugunB.position.set(-RO, 0, 0);
    const lam = (180 + E) * RAD, u = lam - lamN;
    const bet = Math.asin(Math.sin(ivis) * Math.sin(u));
    oy.position.set(Math.cos(lam) * Math.cos(bet) * RO, Math.sin(bet) * RO, -Math.sin(lam) * Math.cos(bet) * RO);
    /* ko‘rinish uchun orbitaning og‘ishini to‘g‘ri yo‘nalishda */
    yer.rotation.y += dt0 * .15;
    /* Oy soyasi: Quyoshdan teskari yo‘nalishda */
    oySoyaG.position.copy(oy.position); vS.set(1, 0, 0).applyAxisAngle(new T.Vector3(0, 0, 1), 0); tmp.copy(oy.position).sub(quyosh.position).normalize(); oySoyaG.quaternion.setFromUnitVectors(new T.Vector3(1, 0, 0), tmp);
    /* Yerdagi dog‘: Quyosh–Oy chizig‘ining Yer bilan kesishishi */
    const o = oy.position, d = tmp; const b = o.dot(d), c = o.lengthSq() - RE * RE, disk = b * b - c;
    if(disk > 0 && b < 0){ const tt = -b - Math.sqrt(disk); vM.copy(o).addScaledVector(d, tt); dog.position.copy(vM).multiplyScalar(1.003); dog.lookAt(vM.clone().multiplyScalar(2)); dogP.position.copy(vM).multiplyScalar(1.002); dogP.lookAt(vM.clone().multiplyScalar(2)); dog.visible = dogP.visible = true; }
    else { dog.visible = dogP.visible = false; }
    /* Oyning Yer soyasiga kirishi */
    const ichUmb = Math.hypot(o.y, o.z) < RE * (1 - o.x / UL) - RM * .2 && o.x > 0;
    const ichPen = Math.hypot(o.y, o.z) < RE + o.x / 5.2 * 1.25 && o.x > 0;
    const k = ichUmb ? 1 : ichPen ? .35 : 0;
    oyMat.color.copy(oyAsl).lerp(oyQiz, k * .9); oyMat.emissive.setRGB(k * .25, k * .05, 0); oyNur.material.opacity = ichUmb ? .55 : 0; oyNur.position.copy(o);
    const kk = tasnif();
    /* yil rejimida sanash */
    if(yur){ const e0 = ((eOld % 360) + 360) % 360, e1 = ((E % 360) + 360) % 360;
      if(e1 < e0){ sanoq.yangi++; const b0 = IR * Math.sin(-nu * RAD); if(Math.abs(b0) < 1.5) sanoq.quyosh++; hodisa('fa-tutilish', {tip:Math.abs(b0) < 1.5 ? 'quyosh' : null, daraja:Math.abs(b0) < .9 ? 'tola' : Math.abs(b0) < 1.5 ? 'qisman' : 'yoq', faza:'yangi', yil:true}); }
      if(e0 < 180 && e1 >= 180){ sanoq.tolin++; const b1 = IR * Math.sin((180 - nu) * RAD); if(Math.abs(b1) < 1.0) sanoq.oyT++; hodisa('fa-tutilish', {tip:Math.abs(b1) < 1.0 ? 'oy' : null, daraja:Math.abs(b1) < .4 ? 'tola' : Math.abs(b1) < 1.0 ? 'qisman' : 'yoq', faza:'tolin', yil:true}); }
      if(sanoq.kun >= 365 && !sanoq.yubor){ sanoq.yubor = 1; hodisa('fa-tutilish-yil', {oylar:sanoq.yangi, quyosh:sanoq.quyosh, oy:sanoq.oyT}); }
    }
    eOld = E;
    const key = kk.t + '|' + kk.d + '|' + kk.f;
    if(!yur && key !== eskiKey){ eskiKey = key; hodisa('fa-tutilish', {tip:kk.t, daraja:kk.d, faza:kk.f, E:Math.round(E), tugun:Math.round(nu)}); }
    lUmb.kor = lPen.kor = rejim !== 'quyosh';
    kt += dt0; if(kt > .2){ kt = 0; kartaYoz(kk); }
  });
  S.holat({rejim:'oy'});
  kartaYoz(tasnif());
  return S;
};

/* =====================================================================
   7. QUYOSHNING TUZILISHI — fa_quyosh (kesim)
   ===================================================================== */
REG.fa_quyosh = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Astronomiya · Quyoshning tuzilishi · kesim (qatlamlar qalinligi sxematik) · NASA');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:.3, ry:2.36, avto:false, fov:30, zoom:1.05, rxMin:-1, rxMax:1.2, env:0});
  const g = S.g;
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const R = 2.6, PH0 = 0, PHL = Math.PI * 1.5;
  const QAT = [
    {k:'yadro', nom:'Yadro', r0:0, r1:.25, rang:'#fff6d8'},
    {k:'nurlanish', nom:'Nurlanish zonasi', r0:.25, r1:.7, rang:'#ffb347'},
    {k:'konveksiya', nom:'Konveksiya zonasi', r0:.7, r1:1, rang:'#f0642a'},
    {k:'fotosfera', nom:'Fotosfera', r0:1, r1:1, rang:'#ffcf6b'},
    {k:'xromosfera', nom:'Xromosfera', r0:1, r1:1.02, rang:'#ff5a7a'},
    {k:'toj', nom:'Toj (korona)', r0:1.02, r1:3, rang:'#cfe0ff'},
    {k:'dog', nom:'Quyosh dog‘lari', r0:1, r1:1, rang:'#3a1a08'}
  ];
  /* kesim yuzasi teksturasi */
  const N = 1024; const [kc, kx] = kanvas(N, N); const c = N / 2, px = c * .985; const r = rng(9);
  const gr = kx.createRadialGradient(c, c, 0, c, c, px);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(.12, '#fff3c4'); gr.addColorStop(.25, '#ffd680'); gr.addColorStop(.2501, '#ffbf5a'); gr.addColorStop(.7, '#ff8a33'); gr.addColorStop(.7001, '#f06a2a'); gr.addColorStop(.97, '#d9481c'); gr.addColorStop(1, '#ffcf6b');
  kx.fillStyle = gr; kx.beginPath(); kx.arc(c, c, px, 0, 7); kx.fill();
  /* nurlanish zonasi: fotonlarning tasodifiy yo‘li */
  kx.strokeStyle = 'rgba(255,248,220,.35)'; kx.lineWidth = 1.2;
  for(let k = 0; k < 7; k++){ let a = r() * 7, rr = .27 * px; kx.beginPath(); let x = c + Math.cos(a) * rr, y = c + Math.sin(a) * rr; kx.moveTo(x, y); for(let i = 0; i < 90; i++){ const b = r() * 7; x += Math.cos(b) * 7; y += Math.sin(b) * 7; const d = Math.hypot(x - c, y - c); if(d < .26 * px || d > .69 * px){ x -= Math.cos(b) * 14; y -= Math.sin(b) * 14; } kx.lineTo(x, y); } kx.stroke(); }
  /* konveksiya yacheykalari */
  for(let i = 0; i < 26; i++){ const a = i / 26 * Math.PI * 2, rm = .85 * px, x = c + Math.cos(a) * rm, y = c + Math.sin(a) * rm; kx.strokeStyle = 'rgba(255,220,160,.45)'; kx.lineWidth = 3; kx.beginPath(); kx.ellipse(x, y, .12 * px, .045 * px * 2.2, a, 0, Math.PI * 1.7, i % 2 === 1); kx.stroke(); }
  kx.strokeStyle = 'rgba(0,0,0,.25)'; kx.lineWidth = 3; [.25, .7].forEach(f=>{ kx.beginPath(); kx.arc(c, c, f * px, 0, 7); kx.stroke(); });
  const kesT = tex(kc);
  const kesMat = new T.MeshBasicMaterial({map:kesT, side:T.DoubleSide, toneMapped:false});
  const yuzalar = [PH0, PH0 + PHL].map(ph=>{ const m = new T.Mesh(new T.RingGeometry(.0001, R, 128, 1, -Math.PI / 2, Math.PI), kesMat); m.rotation.y = Math.PI + ph; m.userData = {nom:'kesim', p:2}; g.add(m); return m; });
  /* fotosfera: granulyatsiya + dog‘lar */
  const W2 = tejam ? 1024 : 2048, H2 = W2 / 2; const [fc, fx] = kanvas(W2, H2);
  fx.fillStyle = '#ffb040'; fx.fillRect(0, 0, W2, H2);
  for(let i = 0; i < (tejam ? 9000 : 26000); i++){ const x = r() * W2, y = r() * H2, s = 1.5 + r() * 3.5; fx.fillStyle = 'rgba(255,' + (200 + Math.floor(r() * 50)) + ',' + (110 + Math.floor(r() * 80)) + ',' + (.25 + r() * .4) + ')'; fx.beginPath(); fx.arc(x, y, s, 0, 7); fx.fill(); }
  const DOG = [[.86, .38, 1], [.89, .41, .6], [.12, .6, 1.2], [.15, .57, .7], [.9, .66, .8]];
  const dogPoz = DOG.map(([u, th, s])=>{ const x = u * W2, y = th * H2; const pr = 14 * s * W2 / 2048; fx.fillStyle = 'rgba(120,50,10,.8)'; fx.beginPath(); fx.arc(x, y, pr * 2, 0, 7); fx.fill(); fx.fillStyle = '#2a1206'; fx.beginPath(); fx.arc(x, y, pr, 0, 7); fx.fill(); const phi = PH0 + u * PHL, the = th * Math.PI; return new T.Vector3(-R * Math.cos(phi) * Math.sin(the), R * Math.cos(the), R * Math.sin(phi) * Math.sin(the)); });
  const fotT = tex(fc, false); S.toza(()=>fotT.dispose());
  const fotMat = new T.ShaderMaterial({uniforms:{map:{value:fotT}, t:{value:0}}, vertexShader:'varying vec2 vU; varying vec3 vN; varying vec3 vV; void main(){ vU = uv; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader:'uniform sampler2D map; varying vec2 vU; varying vec3 vN; varying vec3 vV; void main(){ vec3 c = texture2D(map, vU).rgb; float mu = clamp(dot(vN, vV), 0.0, 1.0); float ld = 0.42 + 0.58 * pow(mu, 0.55); gl_FragColor = vec4(c * ld * 1.08, 1.0); }'});
  const fot = new T.Mesh(new T.SphereGeometry(R, 96, 64, PH0, PHL), fotMat); fot.userData = {nom:'fotosfera', p:1}; g.add(fot);
  dogPoz.forEach(p=>{ const h = new T.Mesh(new T.SphereGeometry(.13, 10, 8), new T.MeshBasicMaterial({colorWrite:false, depthWrite:false, transparent:true, opacity:.3})); h.position.copy(p); h.userData = {nom:'dog', p:3}; g.add(h); });
  /* xromosfera (qizg‘ish chekka) */
  const xrMat = new T.ShaderMaterial({transparent:true, depthWrite:false, blending:T.AdditiveBlending, side:T.FrontSide, uniforms:{}, vertexShader:'varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader:'varying vec3 vN; varying vec3 vV; void main(){ float f = 1.0 - clamp(dot(vN, vV), 0.0, 1.0); f = pow(f, 3.0); gl_FragColor = vec4(1.0, 0.32, 0.42, f * 0.9); }'});
  const xr = new T.Mesh(new T.SphereGeometry(R * 1.03, 64, 48, PH0, PHL), xrMat); xr.userData = {nom:'xromosfera', p:0}; g.add(xr);
  /* toj: nurli oreol + nurlar */
  const [tc, tx] = kanvas(512, 512);
  const tg = tx.createRadialGradient(256, 256, 60, 256, 256, 256); tg.addColorStop(0, 'rgba(255,245,225,.9)'); tg.addColorStop(.25, 'rgba(230,236,255,.35)'); tg.addColorStop(.55, 'rgba(200,215,255,.08)'); tg.addColorStop(1, 'rgba(200,215,255,0)'); tx.fillStyle = tg; tx.fillRect(0, 0, 512, 512);
  tx.globalCompositeOperation = 'lighter';
  for(let i = 0; i < 40; i++){ const a = r() * Math.PI * 2, l = 120 + r() * 130, w = .02 + r() * .06; const grd = tx.createLinearGradient(256, 256, 256 + Math.cos(a) * l, 256 + Math.sin(a) * l); grd.addColorStop(0, 'rgba(230,238,255,.22)'); grd.addColorStop(1, 'rgba(230,238,255,0)'); tx.fillStyle = grd; tx.beginPath(); tx.moveTo(256, 256); tx.arc(256, 256, l, a - w, a + w); tx.fill(); }
  const toj = new T.Sprite(new T.SpriteMaterial({map:tex(tc, false), transparent:true, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false, opacity:.85})); toj.scale.setScalar(R * 5.2); g.add(toj);
  const tojHit = new T.Mesh(new T.SphereGeometry(R * 1.9, 24, 16), new T.MeshBasicMaterial({colorWrite:false, depthWrite:false, transparent:true, opacity:.3})); tojHit.userData = {nom:'toj', p:-1}; g.add(tojHit);
  /* protuberanslar */
  const promMat = new T.MeshBasicMaterial({color:0xff6a3a, transparent:true, opacity:.75, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false});
  [[.8, 1.9, .5], [3.9, .9, .35], [3.95, 2.3, .42]].forEach(([phi, the, h])=>{
    const n = new T.Vector3(-Math.cos(phi) * Math.sin(the), Math.cos(the), Math.sin(phi) * Math.sin(the)).normalize();
    const t1 = new T.Vector3().crossVectors(n, new T.Vector3(0, 1, 0)).normalize();
    const a = n.clone().multiplyScalar(R).addScaledVector(t1, -.25), b = n.clone().multiplyScalar(R).addScaledVector(t1, .25);
    const crv = new T.QuadraticBezierCurve3(a, n.clone().multiplyScalar(R + h * 2), b);
    const m = new T.Mesh(new T.TubeGeometry(crv, 30, .05, 8, false), promMat); m.userData = {nom:'protuberanes', p:1}; g.add(m);
  });
  /* yadro nuri */
  const glow = nurTex();
  /* belgilash halqalari */
  const belgiMat = new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0, side:T.DoubleSide, depthWrite:false, toneMapped:false, blending:T.AdditiveBlending});
  const belgi = yuzalar.map(y=>{ const m = new T.Mesh(new T.RingGeometry(0, 1, 96, 1, -Math.PI / 2, Math.PI), belgiMat); m.rotation.copy(y.rotation); m.position.copy(y.position); g.add(m); return m; });
  /* yorliqlar (birinchi kesim yuzasida) */
  const yuzaNuqta = (f, th)=>{ const ph = PH0 + PHL; const rr = f * R; return new T.Vector3(-rr * Math.cos(ph) * Math.sin(th), rr * Math.cos(th), rr * Math.sin(ph) * Math.sin(th)); };
  L.qosh(yuzaNuqta(.08, Math.PI / 2), 'Yadro', 'pill');
  L.qosh(yuzaNuqta(.48, Math.PI * .62), 'Nurlanish zonasi', 'pill');
  L.qosh(yuzaNuqta(.85, Math.PI * .8), 'Konveksiya zonasi', 'pill');
  L.qosh(dogPoz[2], 'Dog‘lar', 'pill', {dy:-18});
  L.qosh(new T.Vector3(0, R * 1.08, 0), 'Fotosfera · xromosfera', 'pill', {dy:-10});
  L.qosh(new T.Vector3(R * 1.25, R * 1.25, 0), 'Toj', 'pill');
  /* energiya yo‘li animatsiyasi (kesim yuzasida) */
  const foton = nur(glow, 0xfffbe0, .45, 0); g.add(foton);
  const yol = [];
  { const r2 = rng(4); let x = .05, y = 0; const push = (xx, yy)=>yol.push(yuzaNuqta(Math.hypot(xx, yy), Math.PI / 2 - Math.atan2(yy, xx))); push(x, y);
    for(let i = 0; i < 140; i++){ const b = r2() * Math.PI * 2; x += Math.cos(b) * .045 + .006; y += Math.sin(b) * .045; if(Math.hypot(x, y) > .69) break; push(Math.max(0.01, x), y); }
    for(let i = 0; i < 40; i++){ const a = i / 40 * Math.PI; const f = .7 + .15 * (1 - Math.cos(a)); push(f * Math.cos(.1 + .12 * Math.sin(a)), f * Math.sin(.1 + .12 * Math.sin(a))); }
    for(let i = 0; i < 20; i++) push(1 + i * .08, .02);
  }
  const MAL = {
    yadro:{r:'0–0,25 R', t:'≈ 15 mln °C', m:'Termoyadro sintez: vodorod geliyga aylanadi — Quyosh energiyasining manbai.'},
    nurlanish:{r:'0,25–0,7 R', t:'7 → 2 mln °C', m:'Energiya fotonlar yutilib-chiqarilib, «tasodifiy yo‘l» bilan sekin tashqariga siljiydi: taxminan 10 ming – 170 ming yil (baholar turlicha).'},
    konveksiya:{r:'0,7–1 R', t:'< 2 mln °C', m:'Issiq plazma qaynayotgan suvdek ko‘tariladi, soviganlari cho‘kadi — energiyani sirtga olib chiqadi.'},
    fotosfera:{r:'sirt, yuzlab km', t:'≈ 5 500 °C', m:'Biz ko‘radigan «yuza». Granulyatsiya — konveksiya yacheykalarining uchlari.'},
    xromosfera:{r:'≈ 2 000 km qatlam', t:'4 000–20 000 K', m:'Qizg‘ish qatlam; to‘liq Quyosh tutilishida qisqa vaqt ko‘rinadi.'},
    toj:{r:'bir necha R', t:'1–2 mln °C', m:'Juda siyrak va juda issiq tashqi atmosfera; quyosh shamoli shu yerdan boshlanadi.'},
    dog:{r:'fotosferada', t:'≈ 3 000–4 500 K', m:'Kuchli magnit maydon issiqlik oqimini to‘sgan joylar; soni ≈ 11 yillik sikl bilan o‘zgaradi.'}
  };
  let tanlangan = null, yolT = -1;
  function kartaYoz(){
    const q = QAT.find(x=>x.k === tanlangan), m = tanlangan && MAL[tanlangan];
    K.innerHTML = m ? '<span class="ust">Quyosh qatlami</span><div class="fx" style="color:' + q.rang + '">' + q.nom + '</div><div class="q"><span>Joyi</span><b>' + m.r + '</b><span>Harorat</span><b class="y">' + m.t + '</b></div><p class="iz">' + m.m + '</p>'
      : '<span class="ust">Quyosh · NASA</span><div class="q"><span>Radius</span><b>≈ 696 000 km</b><span>Massa</span><b>≈ 2·10³⁰ kg</b><span>Yadro harorati</span><b class="y">≈ 15 mln °C</b><span>Sirt harorati</span><b class="y">≈ 5 500 °C</b><span>Yoshi</span><b>≈ 4,6 mlrd yil</b><span>Nur Yergacha</span><b class="k">≈ 8 daq 19 s</b></div><p class="iz">Qatlamni bosing yoki pastdagi tugmalardan tanlang.</p>';
  }
  function belgila(k){
    tanlangan = k; qT.f(k || '');
    const q = QAT.find(x=>x.k === k);
    if(q && q.r1 > q.r0 && q.r1 <= 1){ belgi.forEach(b=>{ b.geometry.dispose(); b.geometry = new T.RingGeometry(Math.max(.0001, q.r0 * R), q.r1 * R, 96, 1, -Math.PI / 2, Math.PI); }); belgiMat.opacity = .28; }
    else belgiMat.opacity = 0;
    kartaYoz();
    if(q) izoh.innerHTML = '<b>' + q.nom + '.</b> ' + MAL[k].m;
  }
  const qT = U.tugmalar(QAT.map(q=>[q.k, q.nom.replace(' (korona)', '').replace('Quyosh dog‘lari', 'Dog‘lar')]), k=>{ belgila(k); hodisa('fa-quyosh-qatlam', {nom:k}); hodisa('detal', {turD:'fa_quyosh', nom:k}); });
  U.ajr();
  const yT = U.tugma('▶ Energiya yo‘li', ()=>S.holat({energiya:true}));
  S.holat = h=>{
    if(!h) return;
    if(h.qatlam !== undefined) belgila(h.qatlam || null);
    if(h.energiya){ yolT = 0; foton.material.opacity = 1; izoh.innerHTML = '<b>Energiya yo‘li.</b> Yadroda hosil bo‘lgan energiya nurlanish zonasida minglab yillar davomida «adashib» yuradi, konveksiya zonasida oqim bilan ko‘tariladi va fotosferadan yorug‘lik bo‘lib chiqadi. Yergacha esa ≈ 8 daqiqa 19 soniyada yetadi.'; hodisa('fa-quyosh-energiya', {}); }
  };
  bosishUlash(S, (d, ob, h)=>{
    let k = d.nom;
    if(k === 'kesim' && h){ const p = S.g.worldToLocal(h.point.clone()); const f = p.length() / R; k = f < .25 ? 'yadro' : f < .7 ? 'nurlanish' : 'konveksiya'; }
    if(k === 'kesim') k = 'konveksiya';
    if(k === 'protuberanes'){ hodisa('detal', {turD:'fa_quyosh', nom:k}); hodisa('fa-quyosh-qatlam', {nom:k}); return; }
    belgila(k); hodisa('detal', {turD:'fa_quyosh', nom:k}); hodisa('fa-quyosh-qatlam', {nom:k});
  });
  { const eskiBos = S.bosNom; S.bosNom = nom=>{ if(MAL[nom]){ belgila(nom); hodisa('detal', {turD:'fa_quyosh', nom}); hodisa('fa-quyosh-qatlam', {nom}); return true; } return eskiBos(nom); }; }
  S.joyla(R * 1.55, new T.Vector3(0, 0, 0));
  kadrUlash(S, L, (dt0, t)=>{
    const dt = dt0 * (S.tezlik || 1);
    toj.material.rotation += dt0 * .01;
    { const kv = S.g.worldToLocal(S.cam.position.clone()).normalize(); toj.position.copy(kv).multiplyScalar(-R * 1.25); }
    if(yolT >= 0){ yolT += dt * 22; const i = Math.floor(yolT); if(i >= yol.length - 1){ yolT = -1; foton.material.opacity = 0; } else { foton.position.copy(yol[i]).lerp(yol[i + 1], yolT - i); foton.position.multiplyScalar(1.001); } }
  });
  kartaYoz();
  izoh.innerHTML = '<b>Quyosh</b> — o‘rtacha kattalikdagi yulduz, qizigan plazma shari. Kesimda ichki qatlamlarni ko‘ring va bosing.';
  return S;
};

/* =====================================================================
   8. SOMON YO‘LI GALAKTIKASI — fa_galaktika
   ===================================================================== */
REG.fa_galaktika = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Astronomiya · Somon yo‘li · sxematik model (1 birlik = 1 000 yorug‘lik yili)');
  const tejam = TEJ();
  const S = tayyorla(sahna, {rx:.18, ry:0, avto:false, fov:34, zoom:1.02, rxMin:-.9, rxMax:.9, env:0});
  const g = S.g;
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const galG = new T.Group(); g.add(galG);
  const ichG = new T.Group(); galG.add(ichG);
  const r = rng(77);
  const nuqT = nurTex([[0, 'rgba(255,255,255,1)'], [.3, 'rgba(255,255,255,.5)'], [1, 'rgba(255,255,255,0)']]);
  const glow = nurTex();
  const PITCH = 12 * RAD, KK = Math.tan(PITCH);
  const RSUN = 26.7, R_SAG = 24.5;
  /* Quyosh azimuti: pastda (kameraga yaqin, +z) */
  const PHS = -Math.PI / 2;
  const TH0 = PHS - Math.log(R_SAG / 10) / KK; /* Sagittarius yengi r=10 da boshlanadigan burchak */
  const YENG = [
    {k:'sagittarius', nom:'Qavs (Sagittarius) yengi', dt:0, rang:[.75, .82, 1]},
    {k:'perseus', nom:'Persey yengi', dt:-Math.PI / 2, rang:[.72, .8, 1]},
    {k:'norma', nom:'Go‘niya (Norma) yengi', dt:Math.PI, rang:[.75, .82, 1]},
    {k:'scutum', nom:'Qalqon–Sentavr yengi', dt:Math.PI / 2, rang:[.72, .8, 1]}
  ];
  /* Persey: Sagittariusdan tashqarida (sun azimutida r≈34), Scutum ichkarida (r≈17,5) */
  const yengR = (y, th)=>10 * Math.exp(KK * (th - TH0 - y.dt));
  const pos = [], col = [];
  const N1 = tejam ? 9000 : 22000;
  for(let i = 0; i < N1; i++){
    const y = YENG[i % 4];
    const th = TH0 + y.dt + r() * 2.9 * Math.PI;
    let rr = yengR(y, th); if(rr > 52) continue;
    const w = .45 + rr * .032;
    const rr2 = rr + gauss(r) * w, a2 = th + gauss(r) * .04;
    const x = rr2 * Math.cos(a2), z = -rr2 * Math.sin(a2), yy = gauss(r) * .35 * (1 + rr2 / 60);
    pos.push(x, yy, z);
    const pushti = r() < .05; const b = .45 + r() * .55;
    if(pushti) col.push(1 * b, .45 * b, .6 * b); else col.push(y.rang[0] * b, y.rang[1] * b, y.rang[2] * b);
  }
  /* yenglar orasidagi disk yulduzlari */
  for(let i = 0; i < (tejam ? 3000 : 7000); i++){ const rr = 4 + Math.pow(r(), .9) * 46, a = r() * Math.PI * 2; pos.push(rr * Math.cos(a), gauss(r) * .45, -rr * Math.sin(a)); const b = .1 + r() * .18; col.push(b * 1, b * .9, b * .75); }
  /* bar va bo‘rtma (bulge) */
  const BAR = 27 * RAD;
  for(let i = 0; i < (tejam ? 4000 : 9000); i++){ const u = gauss(r) * 4.2, v = gauss(r) * 1.6, h = gauss(r) * 1.2; const ca = Math.cos(PHS + Math.PI - BAR), sa = Math.sin(PHS + Math.PI - BAR); const x = u * ca - v * sa, z = -(u * sa + v * ca); pos.push(x, h, z); const b = .6 + r() * .4; col.push(b, b * .85, b * .6); }
  for(let i = 0; i < (tejam ? 2000 : 5000); i++){ const rr = Math.abs(gauss(r)) * 2.6, a = r() * Math.PI * 2, e = gauss(r) * .9; pos.push(rr * Math.cos(a), e * 1.3, -rr * Math.sin(a)); const b = .7 + r() * .3; col.push(b, b * .82, b * .55); }
  const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  const nuqtalar = new T.Points(geo, new T.PointsMaterial({size:.85, sizeAttenuation:true, map:nuqT, vertexColors:true, transparent:true, opacity:.9, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false}));
  ichG.add(nuqtalar);
  const markazNur = nur(glow, 0xffd79a, 20, .55), markazNur2 = nur(glow, 0xfff1d0, 8, .75); ichG.add(markazNur, markazNur2);
  const diskNur = new T.Mesh(new T.CircleGeometry(50, 64), new T.MeshBasicMaterial({map:nurTex([[0, 'rgba(120,130,190,.35)'], [.5, 'rgba(70,80,140,.12)'], [1, 'rgba(40,50,100,0)']]), transparent:true, blending:T.AdditiveBlending, depthWrite:false, side:T.DoubleSide, toneMapped:false})); diskNur.rotation.x = -Math.PI / 2; ichG.add(diskNur);
  /* bosiladigan zonalar */
  const hitMat = new T.MeshBasicMaterial({colorWrite:false, depthWrite:false, transparent:true, opacity:.3});
  const mk = new T.Mesh(new T.SphereGeometry(3.2, 16, 12), hitMat); mk.userData = {nom:'markaz', p:2}; ichG.add(mk);
  const sgr = new T.Mesh(new T.SphereGeometry(.35, 16, 12), new T.MeshBasicMaterial({color:0x000000})); ichG.add(sgr);
  const sgrH = new T.Mesh(new T.RingGeometry(.4, .55, 32), new T.MeshBasicMaterial({color:0xffb86b, transparent:true, opacity:.9, side:T.DoubleSide, toneMapped:false})); sgrH.rotation.x = -Math.PI / 2; ichG.add(sgrH);
  YENG.forEach(y=>{
    const pts = []; for(let i = 0; i <= 60; i++){ const th = TH0 + y.dt + i / 60 * 2.9 * Math.PI; const rr = yengR(y, th); if(rr > 50) break; pts.push(new T.Vector3(rr * Math.cos(th), 0, -rr * Math.sin(th))); }
    const m = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 120, 2.2, 6, false), hitMat); m.userData = {nom:y.k, p:1}; ichG.add(m);
    const k = Math.floor(pts.length * .62); const an = new T.Object3D(); an.position.copy(pts[Math.min(k, pts.length - 1)]); ichG.add(an); y.lb = L.qosh(an, y.nom, 'kichik kok');
  });
  /* Orion tarmog‘i va Quyosh */
  const sunP = new T.Vector3(RSUN * Math.cos(PHS), 0, -RSUN * Math.sin(PHS));
  const orion = []; for(let i = 0; i < (tejam ? 600 : 1400); i++){ const t = (r() - .5) * 11; const a = PHS + t / RSUN; const rr = RSUN + t * .25 + gauss(r) * .7; pos.length; orion.push(rr * Math.cos(a), gauss(r) * .3, -rr * Math.sin(a)); }
  const oGeo = new T.BufferGeometry(); oGeo.setAttribute('position', new T.Float32BufferAttribute(orion, 3));
  const oPts = new T.Points(oGeo, new T.PointsMaterial({size:.5, map:nuqT, color:0xbfd4ff, transparent:true, opacity:.8, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false})); ichG.add(oPts);
  const orionHit = new T.Mesh(new T.BoxGeometry(12, 2, 3), hitMat); orionHit.position.copy(sunP); orionHit.rotation.y = PHS + Math.PI / 2 + .25; orionHit.userData = {nom:'orion', p:1.5}; ichG.add(orionHit);
  const sunG = new T.Group(); sunG.position.copy(sunP); ichG.add(sunG);
  const sunNur = nur(glow, 0xffe27a, 2.6, 1); sunG.add(sunNur);
  const sunHalqa = new T.Mesh(new T.RingGeometry(1.1, 1.25, 48), new T.MeshBasicMaterial({color:0xffd24a, side:T.DoubleSide, toneMapped:false, transparent:true, opacity:.95})); sunHalqa.rotation.x = -Math.PI / 2; sunG.add(sunHalqa);
  const sunHit = new T.Mesh(new T.SphereGeometry(1.6, 16, 12), hitMat); sunHit.userData = {nom:'quyosh', p:3}; sunG.add(sunHit);
  const orbPts = []; for(let i = 0; i <= 180; i++){ const a = i / 180 * Math.PI * 2; orbPts.push(new T.Vector3(RSUN * Math.cos(a), 0, -RSUN * Math.sin(a))); }
  const sunOrb = new T.Line(new T.BufferGeometry().setFromPoints(orbPts), new T.LineDashedMaterial({color:0xffd24a, dashSize:1.2, gapSize:1, transparent:true, opacity:.4})); sunOrb.computeLineDistances(); ichG.add(sunOrb);
  const mas = new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(0, .05, 0), sunP.clone().setY(.05)]), new T.LineDashedMaterial({color:0xffffff, dashSize:.6, gapSize:.5, transparent:true, opacity:.6})); mas.computeLineDistances(); ichG.add(mas);
  L.qosh(sunG, 'Quyosh — siz shu yerdasiz', 'pill sariq', {dy:-26});
  const anc = v=>{ const o = new T.Object3D(); o.position.copy(v); ichG.add(o); return o; };
  L.qosh(sgr, 'Markaz · Sgr A*', 'pill', {dy:-30});
  const lMas = L.qosh(anc(sunP.clone().multiplyScalar(.5)), '≈ 26 700 y.y.', 'kichik', {dy:-12});
  L.qosh(anc(new T.Vector3(RSUN * Math.cos(PHS + .28), 0, -RSUN * Math.sin(PHS + .28))), 'Orion tarmog‘i', 'kichik', {dy:14});
  /* masshtab chizg‘ichi */
  const chz = new T.Group(); chz.position.set(26, 0, 42); ichG.add(chz);
  const chMat = new T.MeshBasicMaterial({color:0xdfe3f3});
  const ch = new T.Mesh(new T.BoxGeometry(10, .06, .25), chMat); ch.position.x = 5; chz.add(ch);
  [0, 10].forEach(x=>{ const t = new T.Mesh(new T.BoxGeometry(.12, .06, 1), chMat); t.position.x = x; chz.add(t); });
  L.qosh(anc(new T.Vector3(31, 0, 45)), '10 000 yorug‘lik yili', 'kichik');
  const KOR = {qiya:{t:.95, z:50}, yuqori:{t:Math.PI / 2 - .001, z:50}, yon:{t:.02, z:48}, quyosh:{t:1.1, z:14}};
  let kor = 'qiya', tilt = .95, tiltM = .95, aylan = false, yil = 0;
  const MAL = {
    markaz:['Markaz · Sagittarius A*', 'Markazdagi o‘ta massiv qora tuynuk: ≈ 4 mln Quyosh massasi (4,1–4,3 mln, o‘lchovlarga qarab).'],
    quyosh:['Quyosh sistemasi', 'Markazdan ≈ 26 700 y.y. (baholar 26–27 ming), Orion tarmog‘ining ichki chetida. Galaktika atrofida ≈ 220–230 km/s tezlikda aylanadi.'],
    orion:['Orion tarmog‘i', 'Qavs va Persey yenglari orasidagi kichik tarmoq; Quyosh shu yerda joylashgan.'],
    perseus:['Persey yengi', 'Quyoshdan tashqarida joylashgan yirik yeng.'], sagittarius:['Qavs (Sagittarius) yengi', 'Quyoshga nisbatan ichkaridagi eng yaqin yeng.'],
    scutum:['Qalqon–Sentavr yengi', 'Bardan boshlanadigan ikkita yirik yengdan biri.'], norma:['Go‘niya (Norma) yengi', 'Ichki yeng; bar yaqinidan boshlanadi.']
  };
  let tanlangan = null;
  function kartaYoz(){
    const m = tanlangan && MAL[tanlangan];
    K.innerHTML = '<span class="ust">Somon yo‘li</span>' + (m ? '<div class="fx" style="font-size:14px">' + m[0] + '</div><p class="iz" style="margin-top:0">' + m[1] + '</p>' : '') +
      '<div class="q"><span>Turi</span><b>to‘siqli spiral</b><span>Diametri</span><b class="k">87–100 ming y.y.</b><span>Yulduzlar</span><b>100–400 mlrd</b><span>Markazgacha</span><b class="y">≈ 26 700 y.y.</b><span>Galaktik yil</span><b>225–250 mln yil</b>' + (aylan ? '<span>Model vaqti</span><b class="s">' + son(yil, 0) + ' mln yil</b>' : '') + '</div>';
  }
  const korT = U.tugmalar([['qiya', 'Qiyadan'], ['yuqori', 'Yuqoridan'], ['yon', 'Yondan'], ['quyosh', 'Quyosh atrofi']], k=>S.holat({korinish:k}), kor);
  U.ajr();
  const aT = U.tugma('▶ Galaktik aylanish', ()=>S.holat({aylanish:!aylan}));
  S.holat = h=>{
    if(!h) return;
    if(h.korinish && KOR[h.korinish]){ kor = h.korinish; korT.f(kor); tiltM = KOR[kor].t; if(kor === 'quyosh') S.fokus(9, sunP.clone().applyAxisAngle(new T.Vector3(0, 1, 0), ichG.rotation.y).applyAxisAngle(new T.Vector3(1, 0, 0), KOR.quyosh.t), true); else S.fokus(KOR[kor].z, new T.Vector3(), true); hodisa('fa-korinish', {k:kor});
      izoh.innerHTML = kor === 'yon' ? '<b>Yondan ko‘rinish.</b> Galaktika yupqa disk: disk qalinligi ≈ 1 000 y.y. atrofida, markazda esa qalin bo‘rtma (bulge). Tunda osmonda ko‘rinadigan «Somon yo‘li» yo‘lagi — shu diskni ichidan ko‘rishimiz.' : kor === 'yuqori' ? '<b>Yuqoridan ko‘rinish.</b> Markazdagi bar (to‘siq) va undan chiqqan spiral yenglar. Rasm sxematik: Galaktikani tashqaridan hech kim suratga olmagan.' : kor === 'quyosh' ? '<b>Quyosh atrofi.</b> Quyosh sistemasi Orion tarmog‘ida, markazdan ≈ 26 700 yorug‘lik yili uzoqlikda.' : '<b>Somon yo‘li</b> — Quyosh sistemasi joylashgan galaktika. Yulduzlar, gaz va chang ulkan aylanuvchi diskni tashkil qiladi.'; }
    if(h.aylanish !== undefined){ aylan = !!h.aylanish; aT.classList.toggle('faol', aylan); aT.innerHTML = aylan ? '❚❚ To‘xtatish' : '▶ Galaktik aylanish'; if(aylan){ yil = 0; hodisa('fa-galaktika-aylanish', {}); } }
    kartaYoz();
  };
  S.aylanish = v=>{ if(v !== undefined) S.holat({aylanish:v}); return aylan; };
  bosishUlash(S, d=>{ tanlangan = d.nom; kartaYoz(); hodisa('detal', {turD:'fa_galaktika', nom:d.nom}); hodisa('fa-galaktika', {nom:d.nom}); if(MAL[d.nom]) izoh.innerHTML = '<b>' + MAL[d.nom][0] + '.</b> ' + MAL[d.nom][1]; });
  S.joyla(50, new T.Vector3());
  kadrUlash(S, L, (dt0)=>{
    tilt += (tiltM - tilt) * Math.min(1, dt0 * 3);
    galG.rotation.x = tilt;
    if(aylan){ const d = dt0 * (S.tezlik || 1) * .12; ichG.rotation.y -= d; yil += d / (Math.PI * 2) * 230; }
    sunHalqa.material.opacity = .6 + .35 * Math.sin(performance.now() / 300);
    lMas.kor = kor !== 'yon';
  });
  S.holat({korinish:'qiya'});
  return S;
};

/* =====================================================================
   9. KEPLER QONUNLARI — fa_kepler
   ===================================================================== */
const SAYYORA_K = [
  ['merkuriy', 'Merkuriy', .38710, 87.9693, .2056, 0xb9b2a8],
  ['venera', 'Venera', .72333, 224.7008, .0068, 0xf0d6a0],
  ['yer', 'Yer', 1, 365.2564, .0167, 0x4f9dff],
  ['mars', 'Mars', 1.52366, 686.9796, .0934, 0xe0663c],
  ['yupiter', 'Yupiter', 5.20336, 4332.8201, .0484, 0xd9b38c],
  ['saturn', 'Saturn', 9.53707, 10775.599, .0539, 0xe8d49a]
];
REG.fa_kepler = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Astronomiya · Kepler qonunlari · ekssentrisitet kattalashtirilishi mumkin');
  const S = tayyorla(sahna, {rx:.95, ry:0, avto:false, fov:32, zoom:1.05, rxMin:.1, rxMax:1.5, env:0});
  const g = S.g;
  const L = belgilar(S, sahna), K = karta(S, sahna), U = UI(tag);
  const glow = nurTex();
  S.sc.add(new T.AmbientLight(0x404a70, .5));
  const pl = new T.PointLight(0xfff1d6, 2.2, 0, 0); g.add(pl);
  const A = 4;
  const quyosh = new T.Mesh(new T.SphereGeometry(.34, 40, 28), new T.MeshBasicMaterial({color:0xfff1c4, toneMapped:false})); quyosh.userData = {nom:'quyosh', p:2}; g.add(quyosh);
  const qGlow = nurTex([[0, 'rgba(255,255,255,1)'], [.3, 'rgba(255,255,255,.9)'], [.45, 'rgba(255,255,255,.45)'], [.7, 'rgba(255,255,255,.12)'], [1, 'rgba(255,255,255,0)']]);
  const qn = nur(qGlow, 0xffa640, 2.6, .85, true); g.add(qn);
  const ellG = new T.Group(); g.add(ellG);
  const ellMat = new T.MeshBasicMaterial({color:0x9d8cff, toneMapped:false});
  let ellLine = new T.Mesh(new T.BufferGeometry(), ellMat); ellG.add(ellLine);
  const oqMat = new T.LineDashedMaterial({color:0x8d95b8, dashSize:.15, gapSize:.12, transparent:true, opacity:.5});
  let oqLine = new T.Line(new T.BufferGeometry(), oqMat); ellG.add(oqLine);
  const fokus2 = new T.Mesh(new T.TorusGeometry(.12, .025, 8, 32), new T.MeshBasicMaterial({color:0xdfe3f3})); fokus2.rotation.x = Math.PI / 2; fokus2.userData = {nom:'fokus', p:2}; ellG.add(fokus2);
  const fokHit = new T.Mesh(new T.SphereGeometry(.25, 12, 8), new T.MeshBasicMaterial({colorWrite:false, depthWrite:false, transparent:true, opacity:.3})); fokHit.userData = {nom:'fokus', p:2}; ellG.add(fokHit);
  const peri = new T.Mesh(new T.SphereGeometry(.1, 16, 12), new T.MeshBasicMaterial({color:0xff7a6b})); peri.userData = {nom:'perigeliy', p:3}; ellG.add(peri);
  const afe = new T.Mesh(new T.SphereGeometry(.1, 16, 12), new T.MeshBasicMaterial({color:0x5cc8ff})); afe.userData = {nom:'afeliy', p:3}; ellG.add(afe);
  const periH = new T.Mesh(new T.SphereGeometry(.35, 12, 8), fokHit.material); periH.userData = {nom:'perigeliy', p:3}; ellG.add(periH);
  const afeH = new T.Mesh(new T.SphereGeometry(.35, 12, 8), fokHit.material); afeH.userData = {nom:'afeliy', p:3}; ellG.add(afeH);
  const lP = L.qosh(peri, 'Perigeliy', 'pill qizil', {dy:-20}), lA = L.qosh(afe, 'Afeliy', 'pill kok', {dy:-20}), lF = L.qosh(fokus2, 'ikkinchi fokus', 'kichik', {dy:16});
  L.qosh(quyosh, 'Quyosh (fokusda)', 'pill sariq', {dy:30});
  const sayMat = new T.MeshStandardMaterial({color:0x4f9dff, roughness:.6});
  const sayyora = new T.Mesh(new T.SphereGeometry(.2, 32, 24), sayMat); sayyora.userData = {nom:'sayyora', p:2}; g.add(sayyora);
  const sNur = nur(glow, 0x6fb4ff, .9, .5); sayyora.add(sNur);
  const radV = new T.Mesh(new T.CylinderGeometry(.015, .015, 1, 6), new T.MeshBasicMaterial({color:0xffe08a, transparent:true, opacity:.7})); g.add(radV);
  const vStr = strelka(0x4ee1a0, .035); g.add(vStr);
  const lV = L.qosh(vStr.qismlar[1], 'v', 'pill yashil', {dy:-14});
  /* teng yuzalar sektorlari */
  const SEK = 8;
  const sekMat = [new T.MeshBasicMaterial({color:0xffc14d, transparent:true, opacity:.28, side:T.DoubleSide, depthWrite:false}), new T.MeshBasicMaterial({color:0x5cc8ff, transparent:true, opacity:.28, side:T.DoubleSide, depthWrite:false})];
  const sekG = new T.Group(); g.add(sekG);
  const faolSek = new T.Mesh(new T.BufferGeometry(), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.25, side:T.DoubleSide, depthWrite:false})); g.add(faolSek);
  /* 3-qonun rejimi: haqiqiy sayyoralar */
  const uchG = new T.Group(); uchG.visible = false; g.add(uchG);
  const KS = .82;
  const UCH = SAYYORA_K.map(([k, nom, a, Td, e, rang])=>{
    const pts = []; const b = a * Math.sqrt(1 - e * e);
    for(let i = 0; i <= 200; i++){ const E = i / 200 * Math.PI * 2; pts.push(new T.Vector3((Math.cos(E) - e) * a * KS, 0, -Math.sin(E) * b * KS)); }
    const ln = new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({color:rang, transparent:true, opacity:.45})); uchG.add(ln);
    const m = new T.Mesh(new T.SphereGeometry(k === 'yupiter' || k === 'saturn' ? .22 : .12, 20, 14), new T.MeshStandardMaterial({color:rang, roughness:.6})); m.userData = {nom:k, p:3}; uchG.add(m);
    const h = new T.Mesh(new T.SphereGeometry(.35, 10, 8), fokHit.material); h.userData = {nom:k, p:3}; m.add(h);
    const lb = L.qosh(m, nom, 'kichik', {dy:-14});
    return {k, nom, a, Td, e, m, lb, M:Math.random() * 6.3};
  });
  let e = .5, rejim = 'ellips', M = 0, tDavr = 12, yuzaSoni = 0, tanlSay = null, oldSek = -1;
  const keplerE = (Mv, ev)=>{ let E = Mv; for(let i = 0; i < 12; i++) E -= (E - ev * Math.sin(E) - Mv) / (1 - ev * Math.cos(E)); return E; };
  const pozE = (E, a, ev)=>new T.Vector3(a * (Math.cos(E) - ev), 0, -a * Math.sqrt(1 - ev * ev) * Math.sin(E));
  function ellipsQur(){
    const pts = []; for(let i = 0; i <= 256; i++) pts.push(pozE(i / 256 * Math.PI * 2, A, e));
    ellLine.geometry.dispose(); ellLine.geometry = new T.TubeGeometry(new T.CatmullRomCurve3(pts.slice(0, 256), true), 256, .025, 6, true);
    oqLine.geometry.dispose(); oqLine.geometry = new T.BufferGeometry().setFromPoints([pozE(0, A, e), pozE(Math.PI, A, e)]); oqLine.computeLineDistances();
    peri.position.copy(pozE(0, A, e)); afe.position.copy(pozE(Math.PI, A, e)); periH.position.copy(peri.position); afeH.position.copy(afe.position);
    fokus2.position.set(-2 * A * e, 0, 0); fokHit.position.copy(fokus2.position); fokus2.visible = e > .02;
    lF.kor = e > .05;
    while(sekG.children.length){ const c = sekG.children.pop(); c.geometry.dispose(); }
    for(let s = 0; s < SEK; s++){ const v = [0, 0, 0]; const n = 40; for(let i = 0; i <= n; i++){ const Mv = (s + i / n) / SEK * Math.PI * 2; const p = pozE(keplerE(Mv, e), A, e); v.push(p.x, 0, p.z); } const idx = []; for(let i = 1; i <= n; i++) idx.push(0, i, i + 1); const gg = new T.BufferGeometry(); gg.setAttribute('position', new T.Float32BufferAttribute(v, 3)); gg.setIndex(idx); const m = new T.Mesh(gg, sekMat[s % 2]); sekG.add(m); }
  }
  function kartaYoz(){
    const vp = Math.sqrt((1 + e) / (1 - e)), rp = 1 - e, ra = 1 + e;
    if(rejim === 'uchinchi'){
      K.innerHTML = '<span class="ust">Keplerning III qonuni · T² / a³ = const</span><table><tr><th>Sayyora</th><th>a, a.b.</th><th>T, yil</th><th>T²/a³</th></tr>' + UCH.map(p=>{ const Ty = p.Td / 365.2564; return '<tr class="' + (tanlSay === p.k ? 'faol' : '') + '"><td>' + p.nom + '</td><td>' + son(p.a, 3) + '</td><td>' + son(Ty, Ty < 2 ? 3 : 2) + '</td><td>' + son(Ty * Ty / Math.pow(p.a, 3), 3) + '</td></tr>'; }).join('') + '</table><p class="iz">Yil va astronomik birlikda (a.b.) T²/a³ ≈ 1. Ma’lumot: Wikipedia «Kepler’s laws», J2000 elementlari. Orbitalar haqiqiy nisbatda, tezliklar T ∝ a<sup>3/2</sup> bo‘yicha.</p>';
      return;
    }
    const S0 = Math.PI * A * A * Math.sqrt(1 - e * e);
    K.innerHTML = '<span class="ust">' + (rejim === 'yuza' ? 'II qonun · teng yuzalar' : 'I qonun · ellips orbita') + '</span><div class="q"><span>Ekssentrisitet e</span><b class="y">' + son(e, 3) + '</b><span>Perigeliy a(1 − e)</span><b class="r">' + son(rp, 2) + '·a</b><span>Afeliy a(1 + e)</span><b class="k">' + son(ra, 2) + '·a</b><span>v<sub>p</sub> / v<sub>a</sub></span><b class="s">' + son(vp * vp, 2) + '</b>' + (rejim === 'yuza' ? '<span>Har sektor vaqti</span><b>T / ' + SEK + '</b><span>Har sektor yuzasi</span><b>πab / ' + SEK + ' (teng)</b>' : '') + '</div><p class="iz">' + (rejim === 'yuza' ? 'Radius-vektor teng vaqtlarda teng yuzalar chizadi: Quyoshga yaqin sektorlar kalta, lekin keng.' : 'Quyosh ellipsning markazida emas, fokuslaridan birida turadi. v<sub>p</sub>/v<sub>a</sub> = (1 + e)/(1 − e).') + '</p>';
  }
  const rejT = U.tugmalar([['ellips', 'I qonun: ellips'], ['yuza', 'II qonun: yuzalar'], ['uchinchi', 'III qonun: T² ∝ a³']], k=>S.holat({rejim:k}), rejim);
  U.ajr();
  const eSl = U.slayder('e', 0, .97, .01, e, v=>son(v, 2), v=>{ e = v; ellipsQur(); kartaYoz(); xabar(); });
  const tanT = U.tugmalar([['yer', 'Yer'], ['merkuriy', 'Merkuriy'], ['galley', 'Galley kometasi']], k=>S.holat({e:{yer:.0167, merkuriy:.2056, galley:.967}[k], rejim:rejim === 'uchinchi' ? 'ellips' : rejim, obyekt:k}));
  let dX = 0; function xabar(){ clearTimeout(dX); dX = setTimeout(()=>sahna.isConnected && hodisa('fa-kepler', {e:Math.round(e * 1000) / 1000, rejim, vNisbat:Math.round((1 + e) / (1 - e) * 100) / 100}), 200); }
  S.holat = h=>{
    if(!h) return;
    if(h.e !== undefined && h.e !== null && isFinite(+h.e)){ e = cheg(+h.e, 0, .97); eSl.qoy(e); ellipsQur(); }
    if(h.rejim){ rejim = ['ellips', 'yuza', 'uchinchi'].includes(h.rejim) ? h.rejim : 'ellips'; rejT.f(rejim);
      const u = rejim === 'uchinchi'; uchG.visible = u; ellG.visible = !u; sayyora.visible = !u; radV.visible = !u; vStr.visible = !u; sekG.visible = rejim === 'yuza'; faolSek.visible = rejim === 'yuza';
      lP.kor = lA.kor = !u; lV.kor = !u; UCH.forEach(p=>p.lb.kor = u); eSl.i.parentNode.style.display = u ? 'none' : ''; tanT.bs.forEach(b=>b.style.display = u ? 'none' : '');
      if(u) S.fokus(8.6, new T.Vector3(0, 0, 0), true); else S.fokus(5.2, new T.Vector3(-A * e, 0, 0), true);
      izoh.innerHTML = rejim === 'ellips' ? '<b>Keplerning I qonuni.</b> Har bir sayyora ellips bo‘ylab aylanadi, Quyosh ellipsning fokuslaridan birida turadi.' : rejim === 'yuza' ? '<b>Keplerning II qonuni.</b> Sayyorani Quyosh bilan tutashtiruvchi radius-vektor teng vaqt oraliqlarida teng yuzalar chizadi — shuning uchun perigeliyda sayyora tezroq, afeliyda sekinroq harakatlanadi.' : '<b>Keplerning III qonuni.</b> Sayyoralar aylanish davrlarining kvadratlari orbitalar katta yarim o‘qlarining kublari kabi nisbatda: T² ∝ a³.';
    }
    if(h.obyekt) tanT.f(h.obyekt);
    kartaYoz(); xabar();
  };
  bosishUlash(S, d=>{
    if(SAYYORA_K.some(p=>p[0] === d.nom)){ tanlSay = d.nom; kartaYoz(); hodisa('fa-sayyora', {nom:d.nom}); hodisa('detal', {turD:'fa_kepler', nom:d.nom}); return; }
    hodisa('fa-kepler-nuqta', {nom:d.nom, e}); hodisa('detal', {turD:'fa_kepler', nom:d.nom});
  });
  ellipsQur();
  S.joyla(5.2, new T.Vector3(-A * e, 0, 0));
  const up = new T.Vector3(0, 1, 0);
  let kt = 0;
  kadrUlash(S, L, (dt0)=>{
    const dt = dt0 * (S.tezlik || 1);
    if(rejim !== 'uchinchi'){
      M = (M + dt / tDavr * Math.PI * 2) % (Math.PI * 2);
      const E = keplerE(M, e), p = pozE(E, A, e);
      sayyora.position.copy(p);
      const rl = p.length(); radV.scale.y = rl; radV.position.copy(p).multiplyScalar(.5); radV.quaternion.setFromUnitVectors(up, p.clone().normalize());
      const vv = Math.sqrt(2 / rl - 1 / A); const dir = new T.Vector3(-A * Math.sin(E), 0, -A * Math.sqrt(1 - e * e) * Math.cos(E)).normalize();
      vStr.position.copy(p); vStr.yon(dir); vStr.qoy(Math.min(3.2, vv * 1.6));
      if(rejim === 'yuza'){
        const s = Math.floor(M / (Math.PI * 2) * SEK); const n = 30;
        /* v3.15: bufer bir marta yaratiladi, har kadrda faqat nuqtalar yangilanadi (zaif kompyuter) */
        if(!faolSek.userData.buf){ faolSek.geometry.dispose(); const gg = new T.BufferGeometry(); gg.setAttribute('position', new T.BufferAttribute(new Float32Array((n + 2) * 3), 3)); const idx = []; for(let i = 1; i <= n; i++) idx.push(0, i, i + 1); gg.setIndex(idx); faolSek.geometry = gg; faolSek.userData.buf = gg.attributes.position; }
        const pb = faolSek.userData.buf; pb.setXYZ(0, 0, 0, 0);
        for(let i = 0; i <= n; i++){ const Mv = s / SEK * Math.PI * 2 + (M - s / SEK * Math.PI * 2) * i / n; const q = pozE(keplerE(Mv, e), A, e); pb.setXYZ(i + 1, q.x, .01, q.z); }
        pb.needsUpdate = true; faolSek.geometry.computeBoundingSphere();
        if(s !== oldSek){ if(oldSek === SEK - 1 && s === 0){ yuzaSoni++; hodisa('fa-kepler-yuza', {aylanish:yuzaSoni, e}); } oldSek = s; }
      }
      kt += dt0; if(kt > .3){ kt = 0; lV.e.innerHTML = 'v = ' + son(vv / Math.sqrt(1 / A), 2) + '·v<sub>o‘rt</sub>'; }
    } else {
      UCH.forEach(p=>{ const Ty = p.Td / 365.2564; p.M = (p.M + dt / (6 * Ty) * Math.PI * 2) % (Math.PI * 2); const E = keplerE(p.M, p.e); p.m.position.set((Math.cos(E) - p.e) * p.a * KS, 0, -Math.sin(E) * p.a * Math.sqrt(1 - p.e * p.e) * KS); });
    }
  });
  S.holat({rejim:'ellips'});
  return S;
};

})();
