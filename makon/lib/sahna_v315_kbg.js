/* MAKON v3.15 — «kbg» guruhi sahnalari: kimyo (kislota-asos, oksidlanish-qaytarilish), biologiya (fotosintez, hujayra, DNK),
   geografiya (relyef, vulqon va zilzila, suv aylanishi, iqlim mintaqalari, O‘zbekiston relyef xaritasi).
   Hammasi protsedurali (three.js r128, MIT); tashqi model yo‘q. O‘zbekiston xaritasi: NOAA ETOPO1 + Natural Earth (jamoat mulki).
   Ro‘yxat: window.MAKON_SAHNA['kbg_*'] = async (sahna, {tag, izoh, yorliq, o, d, skriptYukla}) => api (window._sahnalar ga yozilgan).
   Ushbu fayl ekran\v315_kbg\sahna\*.js bo‘laklaridan yig‘ilgan (yig.py). */
(function(){
'use strict';
if(!window.THREE) return;
const T = window.THREE;
const R = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d || {})}));
const TEJAM = !!(window.MAKON_SIFAT && window.MAKON_SIFAT.tejam);
const son = (x, k)=>(+x).toFixed(k === undefined ? 1 : k).replace('.', ',').replace('-', '−');
const cl = (x, a, b)=>Math.max(a, Math.min(b, x));
const lerp = (a, b, t)=>a + (b - a) * t;
const silliq = t=>t * t * (3 - 2 * t);

/* ---------- uslub (CSS) ---------- */
const CSS = `
.kbg-ust{position:absolute;z-index:6;pointer-events:none;transform:translate(14px,-50%);padding:5px 9px;border-radius:8px;background:rgba(9,12,26,.88);border:1px solid rgba(255,255,255,.14);color:#eef1fb;font:600 12px Inter,sans-serif;white-space:nowrap;display:none;box-shadow:0 8px 22px rgba(0,0,0,.4)}
.kbg-hud{position:absolute;right:16px;top:14px;z-index:5;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;max-width:min(430px,calc(100% - 300px));pointer-events:none}
.kbg-hud>div{padding:7px 11px;border-radius:11px;background:rgba(10,14,30,.78);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);color:#c9d0ea;font:500 11.5px Inter,sans-serif;line-height:1.3}
.kbg-hud b{display:block;color:#fff;font:700 17px 'Plus Jakarta Sans',Inter,sans-serif;letter-spacing:.01em}
.kbg-hud i{font-style:normal;color:#8f98bd;font-size:10.5px}
.kbg-graf{position:absolute;right:18px;bottom:78px;z-index:5;padding:9px 10px 7px;border-radius:13px;background:rgba(10,14,30,.8);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);color:#c9d0ea;font:500 11px Inter,sans-serif;pointer-events:none}
.kbg-graf canvas{display:block}
.kbg-graf .sar{font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#9aa3c7;margin-bottom:4px}
.kbg-leg{position:absolute;left:50%;transform:translateX(-50%);top:12px;z-index:4;display:flex;flex-wrap:wrap;justify-content:center;gap:5px;width:max-content;max-width:min(560px,calc(100% - 330px));pointer-events:none}
.kbg-leg span{display:flex;align-items:center;gap:5px;height:22px;padding:0 8px;border-radius:7px;background:rgba(10,13,28,.72);border:1px solid rgba(255,255,255,.1);color:#dfe3f3;font:600 11px Inter,sans-serif}
.kbg-leg span i{width:10px;height:10px;border-radius:50%}
.sahna-tag .kbg-guruh{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
.sahna-tag .kbg-guruh em{font-style:normal;font:600 10.5px 'JetBrains Mono',monospace;color:#8f98bd;text-transform:uppercase;letter-spacing:.05em;margin-right:2px}
.sahna-tag .kbg-ajr{width:1px;height:22px;background:rgba(255,255,255,.14);margin:0 3px}
.sahna-tag label.kbg-sl{min-width:210px;max-width:320px}
.sahna-tag label.kbg-sl b{min-width:52px;text-align:right;color:#fff;font:700 12.5px 'JetBrains Mono',monospace}
.uq-sahna .kbg-graf,.uq-sahna .kbg-hud,.uq-sahna .kbg-leg{display:none}
/* bosqich matnidagi <b> satr ichida qolsin (app3.css da .xronologiya li b — display:block) */
.xronologiya li .m b{display:inline;font-size:inherit;padding-top:0;line-height:inherit;color:#eef1fb;font-weight:650}
@media (max-width:1100px){.kbg-hud{max-width:calc(100% - 32px)}.kbg-leg{max-width:calc(100% - 28px);top:auto;bottom:140px}}
@media (max-width:700px){.kbg-graf{display:none}.kbg-hud{top:auto;bottom:170px;right:10px;left:10px;justify-content:center;max-width:none}.kbg-hud b{font-size:14px}.kbg-leg{display:none}}
`;
function uslub(){ if(document.getElementById('kbg-css')) return; const s = document.createElement('style'); s.id = 'kbg-css'; s.textContent = CSS; document.head.append(s); }

/* ---------- materiallar va yordamchilar ---------- */
const rang = h=>new T.Color(h).convertSRGBToLinear();
function mat(h, p){
  const m = new T.MeshStandardMaterial(Object.assign({color:rang(h), roughness:.55, metalness:0}, p || {}));
  if(p && p.emissive !== undefined) m.emissive = rang(p.emissive);
  m.userData.env = 1; m.envMapIntensity = p && p.env !== undefined ? p.env : .75; return m;
}
function fmat(h, p){
  const m = new T.MeshPhysicalMaterial(Object.assign({color:rang(h), roughness:.3, metalness:0, clearcoat:.6, clearcoatRoughness:.25}, p || {}));
  if(p && p.emissive !== undefined) m.emissive = rang(p.emissive);
  m.userData.env = 1; m.envMapIntensity = .9; return m;
}
function shisha(h, op){
  const m = new T.MeshPhysicalMaterial({color:rang(h || '#dff3ff'), roughness:.06, metalness:0, transparent:true, opacity:op || .22, clearcoat:1, clearcoatRoughness:.05, side:T.DoubleSide, depthWrite:false});
  m.userData.env = 1; m.envMapIntensity = 1.4; return m;
}
function nurli(h, op){ const m = new T.MeshBasicMaterial({color:rang(h), transparent:op !== undefined, opacity:op === undefined ? 1 : op, depthWrite:op === undefined}); m.userData.env = 1; return m; }
function kanvas(w, h, f){ const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; }
/* yumshoq soya: radial gradient tekislik */
function soya(S, r, y, kuch, x, z){
  const t = kanvas(128, 128, (c)=>{ const g = c.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, 'rgba(0,0,0,' + (kuch || .55) + ')'); g.addColorStop(.55, 'rgba(0,0,0,' + (kuch || .55) * .45 + ')'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, 128, 128); });
  const m = new T.Mesh(new T.PlaneGeometry(r * 2, r * 2), new T.MeshBasicMaterial({map:t, transparent:true, depthWrite:false}));
  m.material.userData.env = 1; m.rotation.x = -Math.PI / 2; m.position.set(x || 0, y || 0, z || 0); m.renderOrder = -1; S.g.add(m); return m;
}
/* matn yorlig‘i (sprite) */
function yozuv(matn, o){
  o = o || {};
  const px = o.px || 44, pad = o.pad === undefined ? 16 : o.pad;
  const c = document.createElement('canvas'), x = c.getContext('2d');
  const shrift = (o.qalin || 700) + ' ' + px + 'px Inter, "Segoe UI", Arial, sans-serif';
  x.font = shrift; const qator = String(matn).split('\n');
  const w = Math.ceil(Math.max(...qator.map(q=>x.measureText(q).width)) * 1.04) + pad * 2, h = Math.ceil(px * 1.25 * qator.length) + pad * 1.2;
  c.width = w; c.height = h;
  const chiz = ()=>{
    x.clearRect(0, 0, w, h);
    if(o.fon !== false){ x.fillStyle = o.fon || 'rgba(9,12,28,.78)'; const r = Math.min(h / 2, 22); x.beginPath(); x.moveTo(r, 0); x.arcTo(w, 0, w, h, r); x.arcTo(w, h, 0, h, r); x.arcTo(0, h, 0, 0, r); x.arcTo(0, 0, w, 0, r); x.fill(); if(o.chet){ x.strokeStyle = o.chet; x.lineWidth = 3; x.stroke(); } }
    x.font = shrift; x.fillStyle = o.rang || '#eef2ff'; x.textAlign = 'center'; x.textBaseline = 'middle';
    qator.forEach((q, i)=>x.fillText(q, w / 2, pad * .6 + px * 1.25 * (i + .5) + 1));
  };
  chiz();
  const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4;
  /* shrift keyin yuklansa — qayta chizish */
  if(document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(()=>{ chiz(); t.needsUpdate = true; });
  const m = new T.SpriteMaterial({map:t, transparent:true, depthTest:o.chuqur === true, depthWrite:false}); m.userData.env = 1;
  const sp = new T.Sprite(m); const k = (o.olcham || .32) / px; sp.scale.set(w * k, h * k, 1); sp.renderOrder = o.tartib || 20;
  if(o.markaz) sp.center.set(o.markaz[0], o.markaz[1]);
  return sp;
}
/* 3D strelka (a → b) */
function strelka(a, b, h, o){
  o = o || {};
  const r = o.r || .05, uch = o.uch || r * 3.6, m = o.mat || nurli(h, o.op);
  const g = new T.Group(); const d = new T.Vector3().subVectors(b, a), L = d.length();
  const dasta = new T.Mesh(new T.CylinderGeometry(r, r, Math.max(.001, L - uch), 14), m); dasta.position.y = (L - uch) / 2;
  const kon = new T.Mesh(new T.ConeGeometry(r * 2.3, uch, 18), m); kon.position.y = L - uch / 2;
  g.add(dasta, kon); g.position.copy(a); g.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
  g.userData.mat = m; return g;
}
/* egri trubka (yo‘l bo‘ylab) */
function trubka(nuq, r, m, seg){ const eg = new T.CatmullRomCurve3(nuq); return new T.Mesh(new T.TubeGeometry(eg, seg || 64, r, 12, false), m); }
function nomla(ob, nom, qo){ ob.traverse(x=>{ if(x.isMesh) Object.assign(x.userData, {nom}, qo || {}); }); return ob; }

/* ---------- asosiy sahna: yorug‘lik + boshqaruv yordamchilari ---------- */
function asos(sahna, ctx, o){
  uslub();
  const S = window.MAKON3D.sahna(sahna, Object.assign({avto:false, fov:32, env:.6, ekspozitsiya:1.08}, o || {}));
  S.sc.add(new T.HemisphereLight(0xcfdcff, 0x1c1812, .42));
  const kalit = new T.DirectionalLight(0xffe2bd, 1.0); kalit.position.set(-5, 8, 6); S.sc.add(kalit);
  const tol = new T.DirectionalLight(0x86a8ff, .38); tol.position.set(6, 2.5, 5); S.sc.add(tol);
  const orqa = new T.DirectionalLight(0xb9c9ff, .55); orqa.position.set(1, 5, -8); S.sc.add(orqa);
  S.chiroq = {kalit, tol, orqa};
  const tozalash = [];
  S.qosh = f=>tozalash.push(f);
  const {tag, izoh} = ctx;
  /* ustida yorlig‘i */
  const ust = document.createElement('div'); ust.className = 'kbg-ust'; sahna.append(ust); tozalash.push(()=>ust.remove());
  S.nomlar = {};
  /* 3D test savoli ichida (tag DOM ga ulanmagan) — yozuvlar va nom ko‘rsatkichi yashiriladi */
  S.test = !!(ctx.tag && !ctx.tag.isConnected);
  S.ustida = S.test ? null : (d)=>{ const n = d && d.nom && (S.nomlar[d.nom] || null); if(n){ ust.textContent = n; ust.style.display = 'block'; } else ust.style.display = 'none'; };
  const kuz = e=>{ const r = sahna.getBoundingClientRect(); ust.style.left = (e.clientX - r.left) + 'px'; ust.style.top = (e.clientY - r.top) + 'px'; };
  S.el.addEventListener('pointermove', kuz); S.el.addEventListener('pointerleave', ()=>{ ust.style.display = 'none'; });
  /* DOM elementlari */
  S.dom = (cls, html)=>{ const e = document.createElement('div'); e.className = cls; if(html) e.innerHTML = html; sahna.append(e); tozalash.push(()=>e.remove()); return e; };
  S.tag = tag; S.izoh = izoh;
  S.guruh = (sar, royxat, faol, f)=>{
    const q = document.createElement('div'); q.className = 'kbg-guruh';
    q.innerHTML = (sar ? '<em>' + sar + '</em>' : '') + royxat.map(([k, m])=>'<button data-k="' + k + '"' + (String(k) === String(faol) ? ' class="faol"' : '') + '>' + m + '</button>').join('');
    q.querySelectorAll('button').forEach(b=>b.onclick = ()=>f(b.dataset.k, b));
    q.faol = k=>q.querySelectorAll('button').forEach(b=>b.classList.toggle('faol', String(b.dataset.k) === String(k)));
    tag.append(q); return q;
  };
  S.tugma = (m, f)=>{ const b = document.createElement('button'); b.innerHTML = m; b.onclick = ()=>f(b); tag.append(b); return b; };
  S.ajr = ()=>{ const s = document.createElement('span'); s.className = 'kbg-ajr'; tag.append(s); };
  S.slayder = (nom, min, max, qadam, v, fmt, f)=>{
    const l = document.createElement('label'); l.className = 'kbg-sl';
    l.innerHTML = '<span>' + nom + '</span><input type="range" min="' + min + '" max="' + max + '" step="' + qadam + '" value="' + v + '" aria-label="' + nom + '"><b></b>';
    const inp = l.querySelector('input'), b = l.querySelector('b');
    const yoz = ()=>{ b.innerHTML = fmt(+inp.value); };
    inp.oninput = ()=>{ yoz(); f(+inp.value); }; yoz();
    l.qoy = (x, jim)=>{ inp.value = x; yoz(); if(!jim) f(+inp.value); };
    tag.append(l); return l;
  };
  /* ajratish (emissive) */
  const asl = new Map(); let ajratilgan = null;
  S.ajrat = nom=>{
    ajratilgan = nom || null; const on = new Set();
    S.g.traverse(x=>{
      if(!x.isMesh || !x.material) return;
      (Array.isArray(x.material) ? x.material : [x.material]).forEach(m=>{
        if(!m.emissive) return;
        if(!asl.has(m)) asl.set(m, m.emissive.clone());
        if(ajratilgan && x.userData.nom === ajratilgan) on.add(m);
      });
    });
    asl.forEach((e, m)=>{ m.userData.ajr = on.has(m) ? 1 : 0; if(!on.has(m)) m.emissive.copy(e); });
  };
  S.ajratKadr = t=>{ if(!ajratilgan) return; const k = .22 + .18 * Math.sin(t * 5); asl.forEach((e, m)=>{ if(m.userData.ajr) m.emissive.setRGB(e.r + k * .9, e.g + k * .85, e.b + k * .5); }); };
  /* yopish */
  const yopAsl = S.yopish;
  S.yopish = ()=>{ tozalash.splice(0).forEach(f=>{ try{ f(); }catch(e){} }); yopAsl(); };
  S.qatlam = (k, v)=>{ if(S.holat) S.holat({[k]:v}); };
  S.yorliq = ctx.yorliq;
  return S;
}
/* bosishni ulash: detal + guruh hodisasi */
function bosishUla(S, turD, evTur, qosh){
  S.bosish = d=>{
    if(!d || !d.nom) return;
    S.ajrat(d.nom);
    hodisa('detal', {turD, nom:d.nom});
    hodisa(evTur, Object.assign({nom:d.nom}, qosh ? qosh(d) : {}));
    if(S.izoh && S.nomlar[d.nom] && S.izohFn) S.izoh.innerHTML = S.izohFn(d.nom);
  };
}
/* kadr aylanasi: bir nechta funksiya */
/* yashirin guruh ichidagi obyektlar bosilmasin: three.js Raycaster ota-ona ko‘rinmasligini tekshirmaydi */
const _oralgan = new WeakSet();
function rayTuzat(S){ S.g.traverse(o=>{ if(!o.raycast || _oralgan.has(o)) return; _oralgan.add(o); const r0 = o.raycast; o.raycast = function(rc, arr){ let p = this; while(p){ if(!p.visible) return; p = p.parent; } return r0.call(this, rc, arr); }; }); }
function kadrUla(S, f){ let n = 0; S.el.addEventListener('pointerdown', ()=>rayTuzat(S)); S.kadrda = (dt, t)=>{ if(n++ % 20 === 0) rayTuzat(S); f(Math.max(0, dt), t); S.ajratKadr(t); }; }
/* yumshoq zarracha sharchalar (instanced) */
function sharlar(n, r, m){ const im = new T.InstancedMesh(new T.SphereGeometry(r, 14, 10), m, n); im.instanceMatrix.setUsage(T.DynamicDrawUsage); im.frustumCulled = false; return im; }
const _m4 = new T.Matrix4(), _q = new T.Quaternion(), _s = new T.Vector3(), _p = new T.Vector3();
function joyQoy(im, i, x, y, z, k){ _p.set(x, y, z); _s.setScalar(k === undefined ? 1 : k); _m4.compose(_p, _q.set(0, 0, 0, 1), _s); im.setMatrixAt(i, _m4); }
/* tasodifiy (takrorlanuvchi) */
function tasodif(urug){ let s = urug || 1; return ()=>{ s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
/* shovqin (qiymat shovqini, 2D) */
function shovqin2(urug){
  const r = tasodif(urug), P = []; for(let i = 0; i < 256; i++) P.push(r());
  const h = (x, y)=>P[((x * 73856093) ^ (y * 19349663)) & 255];
  return (x, y)=>{ const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = silliq(xf), v = silliq(yf);
    return lerp(lerp(h(xi, yi), h(xi + 1, yi), u), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), u), v) * 2 - 1; };
}


/* ================= 1. KIMYO — kislota, asos, pH, neytrallanish ================= */
const IND = {
  universal:{nom:'Universal indikator'},
  fenolftalein:{nom:'Fenolftalein'},
  metilzargaldoq:{nom:'Metilzarg‘aldoq'},
  lakmus:{nom:'Lakmus'}
};
const UNI = [[0,'#d3222d'],[2,'#e23b2a'],[3,'#ee6d26'],[4,'#f39a25'],[5,'#f2cf2c'],[6,'#c4d443'],[7,'#3fae4e'],[8,'#2a9a93'],[9,'#2c6fd0'],[10,'#2c4fc4'],[11,'#4b3fb2'],[12,'#5d2f9f'],[14,'#4a1d78']];
function uniRang(ph){ ph = cl(ph, 0, 14); for(let i = 1; i < UNI.length; i++){ if(ph <= UNI[i][0]){ const a = UNI[i-1], b = UNI[i], t = (ph - a[0]) / (b[0] - a[0]); return new T.Color(a[1]).lerp(new T.Color(b[1]), t); } } return new T.Color(UNI[UNI.length-1][1]); }
function uniNom(ph){ const p = Math.round(cl(ph, 0, 14)); return p <= 2 ? 'qizil' : p <= 4 ? 'to‘q sariq' : p <= 6 ? 'sariq' : p === 7 ? 'yashil' : p <= 10 ? 'ko‘k' : 'binafsha'; }
/* indikator rangi: {c: Color, op: shaffoflik, nom} */
function indRang(ind, ph){
  const suv = new T.Color('#d7ecff');
  if(ind === 'fenolftalein'){ const t = cl((ph - 8.2) / 1.6, 0, 1); return ph < 8.2 ? {c:suv, op:.28, nom:'rangsiz'} : {c:suv.clone().lerp(new T.Color('#e1257c'), .45 + .55 * t), op:.5 + .3 * t, nom:'malina'}; }
  if(ind === 'metilzargaldoq'){ if(ph < 3.1) return {c:new T.Color('#d8263b'), op:.78, nom:'qizil'}; if(ph <= 4.4){ const t = (ph - 3.1) / 1.3; return {c:new T.Color('#e8502c').lerp(new T.Color('#f49a22'), t), op:.76, nom:'to‘q sariq'}; } return {c:new T.Color('#f3c52e'), op:.7, nom:'sariq'}; }
  if(ind === 'lakmus'){ if(ph < 5) return {c:new T.Color('#c62e4a'), op:.78, nom:'qizil'}; if(ph <= 8) return {c:new T.Color('#7a3d9e'), op:.78, nom:'binafsha'}; return {c:new T.Color('#2f4fc0'), op:.78, nom:'ko‘k'}; }
  return {c:uniRang(ph), op:.78, nom:uniNom(ph)};
}
/* kuchli kislota + kuchli ishqor aralashmasi (25 °C, Kw = 1e−14) */
function phHisob(a, b){ const V = 50 + a + b, c = .1 * (a - b) / V; const h = (c + Math.sqrt(c * c + 4e-14)) / 2; return -Math.log10(h); }

R.kbg_kislota = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.34, ry:-.12, rxMin:.02, rxMax:1.05, ryMin:-1.3, ryMax:1.3, zoom:1.02});
  const g = S.g;
  S.nomlar = {stakan:'Stakan (kimyoviy stakan)', phmetr:'pH-metr', tomizgich_kislota:'Tomizgich: HCl 0,1 M', tomizgich_ishqor:'Tomizgich: NaOH 0,1 M', H:'H⁺ ioni (aslida H₃O⁺)', OH:'OH⁻ — gidroksid ioni', Na:'Na⁺ — natriy ioni', Cl:'Cl⁻ — xlorid ioni', H2O:'H₂O — neytrallanishda hosil bo‘lgan suv'};
  for(let i = 0; i <= 14; i++) S.nomlar['ph' + i] = 'pH ' + i + (i < 7 ? ' — kislotali' : i === 7 ? ' — neytral' : ' — ishqoriy');
  /* stol */
  const stol = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(8.4, .3, 5.2, 4, .08) : new T.BoxGeometry(8.4, .3, 5.2), mat('#1c212d', {roughness:.6, metalness:.1}));
  stol.position.set(0, -.15, -.5); g.add(stol);
  const ustS = new T.Mesh(new T.PlaneGeometry(8.2, 5), mat('#232a38', {roughness:.8})); ustS.rotation.x = -Math.PI / 2; ustS.position.set(0, .002, -.5); g.add(ustS);
  soya(S, 1.55, .006, .6);
  /* stakan (Lathe) */
  const RI = .92, HB = 2.35;
  const pr = [[0, .02], [RI - .06, .02], [RI, .08], [RI, HB], [RI + .05, HB + .06], [RI + .1, HB + .08]].map(p=>new T.Vector2(p[0], p[1]));
  const stakanM = shisha('#e7f5ff', .2);
  const stakan = new T.Mesh(new T.LatheGeometry(pr, 64), stakanM); stakan.raycast = ()=>{}; g.add(stakan);
  const tub = new T.Mesh(new T.CylinderGeometry(RI + .03, RI + .03, .05, 64), fmat('#dff1ff', {transparent:true, opacity:.45, roughness:.1})); tub.position.y = .025; tub.userData.nom = 'stakan'; g.add(tub);
  const gardish = new T.Mesh(new T.TorusGeometry(RI + .06, .03, 10, 72), fmat('#eaf6ff', {transparent:true, opacity:.55, roughness:.08})); gardish.rotation.x = Math.PI / 2; gardish.position.y = HB + .06; gardish.userData.nom = 'stakan'; g.add(gardish);
  /* o‘lchov chiziqlari */
  const shk = kanvas(512, 512, (c, w, h)=>{ c.clearRect(0, 0, w, h); c.strokeStyle = 'rgba(255,255,255,.85)'; c.fillStyle = 'rgba(255,255,255,.9)'; c.font = '600 30px Inter, sans-serif';
    for(let v = 25; v <= 150; v += 25){ const y = h - (v / 150) * (h * .86) - h * .04; c.lineWidth = 4; c.beginPath(); c.moveTo(20, y); c.lineTo(v % 50 === 0 ? 120 : 80, y); c.stroke(); if(v % 50 === 0) c.fillText(v + ' mL', 130, y + 10); } });
  const belgiM = new T.MeshBasicMaterial({map:shk, transparent:true, depthWrite:false, side:T.FrontSide}); belgiM.userData.env = 1;
  const belgi = new T.Mesh(new T.CylinderGeometry(RI + .012, RI + .012, HB * .98, 64, 1, true, -.55, .85), belgiM); belgi.position.y = HB * .49 + .03; belgi.raycast = ()=>{}; g.add(belgi);
  /* suyuqlik */
  const suyM = new T.MeshPhysicalMaterial({color:rang('#d7ecff'), roughness:.12, metalness:0, transparent:true, opacity:.3, clearcoat:.8, depthWrite:false}); suyM.userData.env = 1; suyM.envMapIntensity = 1;
  const suyuq = new T.Mesh(new T.CylinderGeometry(RI - .035, RI - .06, 1, 64), suyM); suyuq.raycast = ()=>{}; g.add(suyuq);
  const yuzM = new T.MeshPhysicalMaterial({color:rang('#e6f4ff'), roughness:.05, transparent:true, opacity:.35, clearcoat:1, depthWrite:false}); yuzM.userData.env = 1;
  const yuza = new T.Mesh(new T.CircleGeometry(RI - .035, 64), yuzM); yuza.rotation.x = -Math.PI / 2; yuza.raycast = ()=>{}; g.add(yuza);
  const halqa = new T.Mesh(new T.RingGeometry(.02, .08, 32), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0, depthWrite:false})); halqa.rotation.x = -Math.PI / 2; halqa.material.userData.env = 1; g.add(halqa);
  const sathi = V=>.08 + V / 150 * (HB * .86);
  /* tomizgichlar */
  function tomizgich(x, rezRang, nom, matn){
    const t = new T.Group(); t.position.set(x, 2.62, .05); t.rotation.z = x < 0 ? -.16 : .16;
    const naycha = new T.Mesh(new T.CylinderGeometry(.07, .07, 1.25, 24), shisha('#eef8ff', .35)); naycha.position.y = .62; t.add(naycha);
    const ichi = new T.Mesh(new T.CylinderGeometry(.05, .05, .9, 18), fmat('#e8f4ff', {transparent:true, opacity:.4})); ichi.position.y = .5; t.add(ichi);
    const uch = new T.Mesh(new T.ConeGeometry(.07, .28, 24), shisha('#eef8ff', .4)); uch.rotation.x = Math.PI; uch.position.y = -.13; t.add(uch);
    const bosh = new T.Mesh(new T.SphereGeometry(.16, 28, 20), fmat(rezRang, {roughness:.45, clearcoat:.3})); bosh.scale.y = 1.45; bosh.position.y = 1.42; t.add(bosh);
    const bo = new T.Mesh(new T.CylinderGeometry(.1, .085, .16, 24), fmat(rezRang, {roughness:.5})); bo.position.y = 1.23; t.add(bo);
    nomla(t, nom); g.add(t);
    const y = yozuv(matn, {px:34, olcham:.2}); y.position.set(x * 1.9, 4.35, .05); g.add(y);
    return t;
  }
  const tK = tomizgich(-.42, '#c7343d', 'tomizgich_kislota', 'HCl 0,1 M');
  const tI = tomizgich(.42, '#2f5fd0', 'tomizgich_ishqor', 'NaOH 0,1 M');
  /* pH-metr */
  const pm = new T.Group(); pm.position.set(2.25, 0, .35); pm.rotation.y = -.45;
  const tana = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(1.15, .42, .82, 4, .08) : new T.BoxGeometry(1.15, .42, .82), mat('#dfe3ea', {roughness:.42})); tana.position.y = .21; pm.add(tana);
  const panelM = mat('#1b2130', {roughness:.35}); const pnl = new T.Mesh(new T.BoxGeometry(.98, .04, .62), panelM); pnl.position.set(0, .43, 0); pm.add(pnl);
  const ekC = document.createElement('canvas'); ekC.width = 256; ekC.height = 112; const ekX = ekC.getContext('2d');
  const ekT = new T.CanvasTexture(ekC); ekT.encoding = T.sRGBEncoding;
  const ekran = new T.Mesh(new T.PlaneGeometry(.7, .3), new T.MeshBasicMaterial({map:ekT})); ekran.material.userData.env = 1; ekran.rotation.x = -Math.PI / 2 + .0; ekran.position.set(-.05, .453, -.05); pm.add(ekran);
  [[-.32, .2], [-.12, .2], [.08, .2]].forEach(([x, z])=>{ const b = new T.Mesh(new T.CylinderGeometry(.045, .045, .03, 20), mat('#3fae8f', {roughness:.4})); b.position.set(x, .45, z); pm.add(b); });
  nomla(pm, 'phmetr'); g.add(pm);
  soya(S, .85, .005, .45, 2.25, .35);
  const elektrod = new T.Group(); elektrod.position.set(.52, 0, -.35);
  const el1 = new T.Mesh(new T.CylinderGeometry(.06, .06, 2.1, 24), fmat('#2a303c', {roughness:.35})); el1.position.y = 1.6; elektrod.add(el1);
  const el2 = new T.Mesh(new T.CylinderGeometry(.055, .045, .5, 24), shisha('#e9f6ff', .5)); el2.position.y = .35; elektrod.add(el2);
  const el3 = new T.Mesh(new T.SphereGeometry(.05, 20, 14), shisha('#f3fbff', .6)); el3.position.y = .1; elektrod.add(el3);
  nomla(elektrod, 'phmetr'); g.add(elektrod);
  const kabel = trubka([new T.Vector3(.52, 2.65, -.35), new T.Vector3(.8, 3.05, -.3), new T.Vector3(1.6, 2.4, 0), new T.Vector3(2.0, .8, .2), new T.Vector3(2.05, .4, .25)], .025, mat('#1a1f29', {roughness:.6}));
  kabel.userData.nom = 'phmetr'; g.add(kabel);
  function ekranYoz(ph){
    ekX.fillStyle = '#0d1a14'; ekX.fillRect(0, 0, 256, 112);
    ekX.fillStyle = 'rgba(125,255,178,.12)'; ekX.fillRect(6, 6, 244, 100);
    ekX.fillStyle = '#7dffb2'; ekX.font = '600 22px "JetBrains Mono", monospace'; ekX.textBaseline = 'top'; ekX.fillText('pH', 14, 12);
    ekX.font = '700 62px "JetBrains Mono", monospace'; ekX.textAlign = 'right'; ekX.fillText(son(ph, 2), 244, 34); ekX.textAlign = 'left';
    ekX.font = '500 16px "JetBrains Mono", monospace'; ekX.fillText('25 °C', 14, 86);
    ekT.needsUpdate = true;
  }
  /* pH shkalasi (0–14) */
  const shkala = [];
  const blokG = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.38, .3, .42, 3, .05) : new T.BoxGeometry(.38, .3, .42);
  for(let i = 0; i <= 14; i++){
    const x = (i - 7) * .44, z = -2.25 + Math.abs(i - 7) * .025;
    const c = uniRang(i);
    const ust = kanvas(128, 128, (cx)=>{ cx.fillStyle = '#' + c.getHexString(); cx.fillRect(0, 0, 128, 128); const gr = cx.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, 'rgba(255,255,255,.25)'); gr.addColorStop(1, 'rgba(0,0,0,.12)'); cx.fillStyle = gr; cx.fillRect(0, 0, 128, 128); cx.fillStyle = i >= 9 || i <= 1 ? '#fff' : '#101521'; cx.font = '800 64px "Plus Jakarta Sans", Inter, sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(i, 64, 70); });
    const yon = mat('#' + c.getHexString(), {roughness:.4}); yon.color.copy(c).convertSRGBToLinear();
    const um = new T.MeshStandardMaterial({map:ust, roughness:.45}); um.userData.env = 1;
    const m = new T.Mesh(blokG, [yon, yon, um, yon, yon, yon]); m.position.set(x, .15, z); m.userData.nom = 'ph' + i;
    um.emissive = new T.Color(0); g.add(m); shkala.push(m);
  }
  const shTag = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(6.9, .08, .7, 3, .03) : new T.BoxGeometry(6.9, .08, .7), mat('#1b2030', {roughness:.6})); shTag.position.set(0, .01, -2.2); g.add(shTag);
  const yK = yozuv('kislotali', {px:30, olcham:.16, rang:'#ff9a8f', chuqur:true}); yK.position.set(-2.4, .02, -1.72); yK.center.set(.5, 1); g.add(yK);
  const yN = yozuv('neytral', {px:30, olcham:.16, rang:'#9ff0a8', chuqur:true}); yN.position.set(0, .02, -1.72); yN.center.set(.5, 1); g.add(yN);
  const yI = yozuv('ishqoriy', {px:30, olcham:.16, rang:'#a9b8ff', chuqur:true}); yI.position.set(2.4, .02, -1.72); yI.center.set(.5, 1); g.add(yI);
  const korsat = new T.Mesh(new T.ConeGeometry(.12, .3, 24), mat('#ffffff', {emissive:'#6b6b6b', roughness:.3})); korsat.rotation.x = Math.PI; korsat.position.set(0, .62, -2.25); g.add(korsat);
  /* ionlar */
  const ionM = {H:fmat('#ff4d4d', {emissive:'#3a0808', roughness:.25}), OH:fmat('#3d7bff', {emissive:'#081a3a', roughness:.25}), Na:fmat('#b77cff', {roughness:.3}), Cl:fmat('#39d17c', {roughness:.3})};
  const MAX = 40;
  const ion = {H:sharlar(MAX, .055, ionM.H), OH:sharlar(MAX, .07, ionM.OH), Na:sharlar(MAX, .065, ionM.Na), Cl:sharlar(MAX, .08, ionM.Cl)};
  const iz = {};
  const rnd = tasodif(7);
  Object.keys(ion).forEach(k=>{ ion[k].userData.nom = k; ion[k].count = 0; g.add(ion[k]); iz[k] = []; for(let i = 0; i < MAX; i++){ const a = rnd() * 6.283, r = Math.sqrt(rnd()) * (RI - .16); iz[k].push({x:Math.cos(a) * r, y:.2 + rnd() * .9, z:Math.sin(a) * r, vx:(rnd() - .5) * .3, vy:(rnd() - .5) * .3, vz:(rnd() - .5) * .3}); } });
  /* neytrallanish: H⁺ + OH⁻ → H₂O animatsiyasi */
  const suvlar = [];
  const oM = fmat('#ff5b4a', {roughness:.3}), hM = fmat('#f4f7ff', {roughness:.3});
  for(let i = 0; i < 8; i++){
    const m = new T.Group();
    const o = new T.Mesh(new T.SphereGeometry(.07, 18, 12), oM); m.add(o);
    [[-.6, .45], [.6, .45]].forEach(([x, y])=>{ const h = new T.Mesh(new T.SphereGeometry(.045, 14, 10), hM); h.position.set(x * .09, y * .09, 0); m.add(h); });
    const hI = new T.Mesh(new T.SphereGeometry(.055, 14, 10), ionM.H), oI = new T.Mesh(new T.SphereGeometry(.07, 14, 10), ionM.OH);
    nomla(m, 'H2O'); m.visible = false; g.add(m); g.add(hI); g.add(oI); hI.visible = oI.visible = false; hI.raycast = oI.raycast = ()=>{};
    suvlar.push({m, hI, oI, t:-1});
  }
  function neytrallash(k){
    let n = 0;
    suvlar.forEach(s=>{ if(n >= k || s.t >= 0) return; n++; const a = rnd() * 6.283, r = rnd() * .5; s.c = new T.Vector3(Math.cos(a) * r, .35 + rnd() * .5, Math.sin(a) * r); s.d = new T.Vector3(rnd() - .5, rnd() - .5, rnd() - .5).normalize().multiplyScalar(.45); s.t = 0; s.kech = n * .18; });
  }
  /* tomchilar */
  const tomchi = [];
  for(let i = 0; i < 6; i++){ const m = new T.Mesh(new T.SphereGeometry(.05, 16, 12), fmat('#eaf6ff', {transparent:true, opacity:.75, roughness:.05})); m.scale.y = 1.35; m.visible = false; m.raycast = ()=>{}; g.add(m); tomchi.push({m, t:-1}); }
  /* HUD va grafik */
  const hud = S.dom('kbg-hud', '<div><i>pH</i><b data-h="ph">7,00</b></div><div><i>Muhit</i><b data-h="mu">neytral</b></div><div><i>Qo‘shildi</i><b data-h="ml" style="font-size:13px">HCl 0 · NaOH 0 mL</b></div>');
  const hq = k=>hud.querySelector('[data-h="' + k + '"]');
  const gr = S.dom('kbg-graf', '<div class="sar">Titrlash egri chizig‘i</div><canvas width="230" height="138"></canvas>');
  const gc = gr.querySelector('canvas'), gx = gc.getContext('2d');
  function grafik(a, b, ph){
    const W = 230, H = 138, L = 26, B = 18; gx.clearRect(0, 0, W, H);
    gx.strokeStyle = 'rgba(255,255,255,.1)'; gx.lineWidth = 1; gx.font = '10px Inter, sans-serif'; gx.fillStyle = '#8f98bd';
    [0, 7, 14].forEach(p=>{ const y = H - B - p / 14 * (H - B - 6); gx.beginPath(); gx.moveTo(L, y); gx.lineTo(W - 4, y); gx.stroke(); gx.fillText(String(p), 6, y + 3); });
    gx.fillText('← HCl', L, H - 4); gx.fillText('NaOH →', W - 46, H - 4);
    const X = n=>L + (n + 30) / 60 * (W - L - 6), Y = p=>H - B - p / 14 * (H - B - 6);
    gx.strokeStyle = '#6fd3ff'; gx.lineWidth = 2; gx.beginPath();
    for(let n = -30; n <= 30; n += .25){ const p = n < 0 ? phHisob(-n, 0) : phHisob(0, n); n === -30 ? gx.moveTo(X(n), Y(p)) : gx.lineTo(X(n), Y(p)); }
    gx.stroke();
    const n = cl(b - a, -30, 30); gx.fillStyle = '#fff'; gx.beginPath(); gx.arc(X(n), Y(ph), 4.5, 0, 6.3); gx.fill();
    gx.fillStyle = '#8f98bd'; gx.fillText('x: NaOH − HCl, mL', L + 60, H - 4);
  }
  /* holat */
  let A = 0, B = 0, ind = 'universal', ionlar = true, ph = 7, phKor = 7;
  const joriyC = new T.Color('#d7ecff'); let joriyOp = .3, maqC = joriyC.clone(), maqOp = .3;
  function hisobla(ogoh){
    ph = phHisob(A, B);
    const ir = indRang(ind, ph); maqC = ir.c.clone(); maqOp = ir.op;
    const mu = ph < 6.5 ? 'kislotali' : ph > 7.5 ? 'ishqoriy' : 'neytral';
    hq('ph').textContent = son(ph, 2); hq('mu').textContent = mu; hq('ml').textContent = 'HCl ' + son(A, A % 1 ? 1 : 0) + ' · NaOH ' + son(B, B % 1 ? 1 : 0) + ' mL';
    ekranYoz(ph); grafik(A, B, ph);
    const nH = ph < 7 ? 2 + Math.round(34 * cl((7 - ph) / 6, 0, 1)) : Math.max(0, Math.round(2 - (ph - 7) * 1.2));
    const nO = ph > 7 ? 2 + Math.round(34 * cl((ph - 7) / 6, 0, 1)) : Math.max(0, Math.round(2 - (7 - ph) * 1.2));
    ion.H.count = ionlar ? nH : 0; ion.OH.count = ionlar ? nO : 0;
    ion.Cl.count = ionlar ? Math.min(MAX, Math.round(A * 1.4)) : 0; ion.Na.count = ionlar ? Math.min(MAX, Math.round(B * 1.4)) : 0;
    S.izoh.innerHTML = '<b>pH = ' + son(ph, 2) + '</b> — muhit <b>' + mu + '</b>. ' + IND[ind].nom + ': <b>' + ir.nom + '</b>. ' + (A && B ? 'HCl + NaOH → NaCl + H₂O: H⁺ va OH⁻ ionlari birikib suv hosil qiladi.' : A ? 'HCl suvda H⁺ va Cl⁻ ionlariga ajraladi — H⁺ ko‘paydi.' : B ? 'NaOH suvda Na⁺ va OH⁻ ionlariga ajraladi — OH⁻ ko‘paydi.' : 'Distillangan suv (ideal holat): [H⁺] = [OH⁻] = 10⁻⁷ mol/L.') + (ogoh ? ' <span class="xat">' + ogoh + '</span>' : '');
    return {ph:Math.round(ph * 100) / 100, muhit:mu, indikator:ind, rang:ir.nom, kislota:A, ishqor:B};
  }
  function yubor(){ const h = hisobla(); hodisa('kbg-ph', h); }
  function qosh(tur, ml){
    if(A + B + ml > 100){ hisobla('Stakan to‘ldi — «Qaytadan» bosing.'); return; }
    const oldPh = ph;
    if(tur === 'k') A += ml; else B += ml;
    const t = tomchi.find(x=>x.t < 0); if(t){ t.t = 0; t.x = tur === 'k' ? -.63 : .63; t.m.position.set(t.x, 2.45, .05); t.m.visible = true; }
    const neyt = (tur === 'k' && oldPh > 7.2) || (tur === 'i' && oldPh < 6.8);
    if(neyt && ionlar) neytrallash(Math.min(8, 2 + Math.round(ml)));
    (tur === 'k' ? tK : tI).userData.silk = .35;
    yubor();
  }
  function qayta(jim){ A = 0; B = 0; if(jim) hisobla(); else yubor(); }
  const r1 = S.guruh('HCl', [['1', '+1 mL'], ['5', '+5 mL']], null, k=>qosh('k', +k));
  const r2 = S.guruh('NaOH', [['1', '+1 mL'], ['5', '+5 mL']], null, k=>qosh('i', +k));
  S.tugma('Qaytadan', ()=>qayta());
  S.ajr();
  const ig = S.guruh('Indikator', [['universal', 'Universal'], ['fenolftalein', 'Fenolftalein'], ['metilzargaldoq', 'Metilzarg‘aldoq'], ['lakmus', 'Lakmus']], ind, k=>{ ind = k; ig.faol(k); yubor(); });
  const ib = S.tugma('Ionlar', b=>{ ionlar = !ionlar; b.classList.toggle('faol', ionlar); yubor(); }); ib.classList.add('faol');
  r1.querySelectorAll('button').forEach(b=>b.style.borderColor = 'rgba(255,90,90,.45)'); r2.querySelectorAll('button').forEach(b=>b.style.borderColor = 'rgba(90,140,255,.45)');
  bosishUla(S, 'kbg_kislota', 'kbg-kislota');
  S.izohFn = null;
  S.holat = h=>{
    if(!h) return;
    if(h.qayta) qayta(true);
    if(h.indikator && IND[h.indikator]){ ind = h.indikator; ig.faol(ind); }
    if(h.ionlar !== undefined){ ionlar = !!h.ionlar; ib.classList.toggle('faol', ionlar); }
    if(h.ph !== undefined){
      const p = cl(+h.ph, 1.5, 12.5); A = 0; B = 0;
      if(p < 6.99){ const c = Math.pow(10, -p) - Math.pow(10, p - 14); A = Math.round(c * 50 / (.1 - c) * 100) / 100; }
      else if(p > 7.01){ const c = Math.pow(10, p - 14) - Math.pow(10, -p); B = Math.round(c * 50 / (.1 - c) * 100) / 100; }
    }
    hisobla(); joriyC.copy(maqC); joriyOp = maqOp; phKor = ph;
    if(h.tanla !== undefined) S.ajrat(h.tanla);
  };
  S.qiymat = ()=>({ph, A, B, ind, ionlar});
  kadrUla(S, (dt, t)=>{
    phKor += (ph - phKor) * Math.min(1, dt * 3);
    joriyC.lerp(maqC, Math.min(1, dt * 2.2)); joriyOp += (maqOp - joriyOp) * Math.min(1, dt * 2.2);
    suyM.color.copy(joriyC).convertSRGBToLinear(); suyM.opacity = joriyOp; yuzM.color.copy(joriyC).lerp(new T.Color('#ffffff'), .35).convertSRGBToLinear(); yuzM.opacity = Math.min(.85, joriyOp * .8);
    const lv = sathi(50 + A + B); suyuq.scale.y = lv - .06; suyuq.position.y = .06 + (lv - .06) / 2; yuza.position.y = lv + .001;
    korsat.position.x = (cl(phKor, 0, 14) - 7) * .44; korsat.position.y = .62 + Math.sin(t * 3) * .04;
    [tK, tI].forEach(tt=>{ const s = tt.userData.silk || 0; if(s > 0){ tt.userData.silk = Math.max(0, s - dt); tt.children[3].scale.set(1 - s * .4, 1.45 * (1 - s * .25), 1 - s * .4); } });
    tomchi.forEach(d=>{ if(d.t < 0) return; d.t += dt; d.m.position.y = 2.45 - 4.9 * d.t * d.t * 1.6; if(d.m.position.y <= lv){ d.m.visible = false; d.t = -1; halqa.position.set(d.x * .75, lv + .004, .05); halqa.material.opacity = .8; halqa.scale.setScalar(1); } });
    if(halqa.material.opacity > 0){ halqa.material.opacity = Math.max(0, halqa.material.opacity - dt * 1.4); halqa.scale.multiplyScalar(1 + dt * 3.2); }
    const top = lv - .08;
    Object.keys(ion).forEach(k=>{ const im = ion[k], P = iz[k];
      for(let i = 0; i < im.count; i++){ const p = P[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        p.vx += (Math.random() - .5) * dt * 1.2; p.vy += (Math.random() - .5) * dt * 1.2; p.vz += (Math.random() - .5) * dt * 1.2;
        const sp = Math.hypot(p.vx, p.vy, p.vz); if(sp > .35){ p.vx *= .35 / sp; p.vy *= .35 / sp; p.vz *= .35 / sp; }
        const r = Math.hypot(p.x, p.z), rm = RI - .16; if(r > rm){ p.x *= rm / r; p.z *= rm / r; p.vx *= -1; p.vz *= -1; }
        if(p.y < .16){ p.y = .16; p.vy = Math.abs(p.vy); } if(p.y > top){ p.y = top; p.vy = -Math.abs(p.vy); }
        joyQoy(im, i, p.x, p.y, p.z); }
      im.instanceMatrix.needsUpdate = true; });
    suvlar.forEach(s=>{ if(s.t < 0) return; s.t += dt; const u = s.t - s.kech; if(u < 0) return;
      if(u < .9){ const k = 1 - silliq(u / .9); s.hI.visible = s.oI.visible = true; s.m.visible = false; s.hI.position.copy(s.c).addScaledVector(s.d, k); s.oI.position.copy(s.c).addScaledVector(s.d, -k); }
      else if(u < 3){ s.hI.visible = s.oI.visible = false; s.m.visible = true; s.m.position.copy(s.c); s.m.position.y += (u - .9) * .12; s.m.rotation.y += dt * 2; const k = u < 1.1 ? (u - .9) * 5 : u > 2.6 ? (3 - u) * 2.5 : 1; s.m.scale.setScalar(Math.max(.01, k)); }
      else { s.m.visible = false; s.t = -1; } });
  });
  ekranYoz(7); grafik(0, 0, 7); hisobla();
  S.joyla(3.9, new T.Vector3(0, 1.25, -.55));
  S.yorliq('Kimyo · pH, indikatorlar va neytrallanish');
  return S;
};


/* ================= 2. KIMYO — oksidlanish-qaytarilish: Zn + CuSO₄, Daniell elementi ================= */
/* shisha stakan + suyuqlik (suyuqlik bosilmaydi) */
function stakanQur(g, x, z, Rr, Hh, suyRang, suyOp, sath, nom){
  const pr = [[0, .02], [Rr - .05, .02], [Rr, .07], [Rr, Hh], [Rr + .04, Hh + .05], [Rr + .08, Hh + .06]].map(p=>new T.Vector2(p[0], p[1]));
  const st = new T.Mesh(new T.LatheGeometry(pr, 56), shisha('#e7f5ff', .2)); st.position.set(x, 0, z); st.raycast = ()=>{}; g.add(st);
  const tub = new T.Mesh(new T.CylinderGeometry(Rr + .02, Rr + .02, .04, 56), fmat('#dff1ff', {transparent:true, opacity:.45, roughness:.1})); tub.position.set(x, .02, z); g.add(tub);
  const gar = new T.Mesh(new T.TorusGeometry(Rr + .05, .026, 10, 64), fmat('#eaf6ff', {transparent:true, opacity:.55, roughness:.08})); gar.rotation.x = Math.PI / 2; gar.position.set(x, Hh + .05, z); g.add(gar);
  if(nom){ tub.userData.nom = nom; gar.userData.nom = nom; }
  const sm = new T.MeshPhysicalMaterial({color:rang(suyRang), roughness:.12, transparent:true, opacity:suyOp, clearcoat:.8, depthWrite:false}); sm.userData.env = 1;
  const su = new T.Mesh(new T.CylinderGeometry(Rr - .03, Rr - .05, sath - .05, 56), sm); su.position.set(x, .05 + (sath - .05) / 2, z); su.raycast = ()=>{}; g.add(su);
  const ym = new T.MeshPhysicalMaterial({color:rang(suyRang), roughness:.05, transparent:true, opacity:Math.min(.8, suyOp + .1), clearcoat:1, depthWrite:false}); ym.userData.env = 1;
  const yu = new T.Mesh(new T.CircleGeometry(Rr - .03, 56), ym); yu.rotation.x = -Math.PI / 2; yu.position.set(x, sath, z); yu.raycast = ()=>{}; g.add(yu);
  return {sm, ym};
}
/* siniq chiziqli sim: silindrlar + bo‘g‘imlar */
function simQur(nuq, r, m){
  const gr = new T.Group();
  for(let i = 1; i < nuq.length; i++){
    const a = nuq[i-1], b = nuq[i], d = new T.Vector3().subVectors(b, a), L = d.length();
    const c = new T.Mesh(new T.CylinderGeometry(r, r, L, 12), m); c.position.copy(a).addScaledVector(d, .5); c.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize()); gr.add(c);
    const s = new T.Mesh(new T.SphereGeometry(r * 1.02, 12, 8), m); s.position.copy(b); gr.add(s);
  }
  return gr;
}
function yolNuqta(nuq, u, out){
  const L = []; let jami = 0; for(let i = 1; i < nuq.length; i++){ const l = nuq[i].distanceTo(nuq[i-1]); L.push(l); jami += l; }
  let s = cl(u, 0, 1) * jami; for(let i = 0; i < L.length; i++){ if(s <= L[i]) return out.copy(nuq[i]).lerp(nuq[i+1], s / L[i]); s -= L[i]; }
  return out.copy(nuq[nuq.length - 1]);
}

R.kbg_oksidlanish = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.26, ry:0, rxMin:-.1, rxMax:1.0, ryMin:-1.2, ryMax:1.2, zoom:1.0});
  const g = S.g;
  S.nomlar = {zn:'Rux (Zn⁰) — qaytaruvchi', zn2:'Zn²⁺ ioni — oksidlangan rux', cu2:'Cu²⁺ ioni — oksidlovchi', cu:'Mis (Cu⁰) — qaytarilgan', elektron:'Elektron (e⁻)', so4:'SO₄²⁻ — sulfat ioni (o‘zgarmaydi)', eritma:'CuSO₄ eritmasi',
    anod:'Anod (−): Zn elektrod — oksidlanish', katod:'Katod (+): Cu elektrod — qaytarilish', kopri:'Tuz ko‘prigi (KNO₃)', voltmetr:'Voltmetr', kalit:'Kalit (bosing — ulash/uzish)', ampermetr:'Ampermetr (galvanometr)', znso4:'ZnSO₄ eritmasi', cuso4:'CuSO₄ eritmasi'};
  /* stol */
  const stol = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(8.2, .3, 4.4, 4, .08) : new T.BoxGeometry(8.2, .3, 4.4), mat('#1c212d', {roughness:.6, metalness:.1})); stol.position.set(0, -.15, .2); g.add(stol);
  const gP = new T.Group(), gE = new T.Group(); g.add(gP, gE);
  const znM = ()=>mat('#9aa3ad', {roughness:.38, metalness:.85, env:1.1});
  const cuM = ()=>mat('#c8743f', {roughness:.32, metalness:.9, env:1.1});
  const eM = fmat('#ffd84a', {emissive:'#6a5200', roughness:.2});
  /* ---------- PLASTINKA ---------- */
  const sP = soya(S, 1.2, .006, .55, -1.5, 0); g.remove(sP); gP.add(sP);
  const eritmaP = stakanQur(gP, -1.5, 0, .82, 2.1, '#2f7fd8', .62, 1.5, 'eritma');
  const plast = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.56, 2.2, .06, 2, .02) : new T.BoxGeometry(.56, 2.2, .06), znM()); plast.position.set(-1.5, 1.3, 0); plast.rotation.y = .5; plast.userData.nom = 'zn'; gP.add(plast);
  const qopM = cuM(); qopM.transparent = true; qopM.opacity = 0;
  const qop = new T.Mesh(new T.BoxGeometry(.575, 1.28, .075), qopM); qop.position.set(-1.5, .83, 0); qop.rotation.y = .5; qop.userData.nom = 'cu'; gP.add(qop);
  const donM = cuM(); const donlar = sharlar(60, .035, donM); donlar.userData.nom = 'cu'; donlar.count = 0; gP.add(donlar);
  const rn = tasodif(11); const donJoy = [];
  for(let i = 0; i < 60; i++){ const s = rn() < .5 ? -1 : 1, u = (rn() - .5) * .5, y = .25 + rn() * 1.2; donJoy.push([-1.5 + Math.cos(.5) * u + Math.sin(.5) * .04 * s, y, -Math.sin(.5) * u + Math.cos(.5) * .04 * s, .6 + rn() * .8]); }
  donJoy.forEach((d, i)=>joyQoy(donlar, i, d[0], d[1], d[2], d[3]));
  const lE = yozuv('CuSO₄ eritmasi', {px:30, olcham:.17}); lE.position.set(-1.5, -.02, 1.05); lE.center.set(.5, 1); lE.userData.nom = 'eritma'; gP.add(lE);
  const lZ = yozuv('Zn plastinka', {px:30, olcham:.17}); lZ.position.set(-1.25, 2.65, 0); gP.add(lZ);
  /* lupa: mikro-ko‘rinish */
  const LP = new T.Group(); LP.position.set(1.55, 1.45, .1); gP.add(LP);
  const ramka = new T.Mesh(new T.TorusGeometry(1.32, .06, 16, 96), mat('#2b3345', {roughness:.3, metalness:.7})); LP.add(ramka);
  const fonM = new T.MeshBasicMaterial({color:rang('#0b1a33'), transparent:true, opacity:.82, depthWrite:false}); fonM.userData.env = 1;
  const fon = new T.Mesh(new T.CircleGeometry(1.3, 72), fonM); fon.position.z = -.25; fon.raycast = ()=>{}; LP.add(fon);
  const fon2 = new T.Mesh(new T.CircleGeometry(1.3, 72, Math.PI * .5, Math.PI), new T.MeshBasicMaterial({color:rang('#1b2230'), transparent:true, opacity:.9, depthWrite:false})); fon2.material.userData.env = 1; fon2.position.set(-.55, 0, -.24); fon2.scale.x = .35; fon2.raycast = ()=>{}; LP.add(fon2);
  const lL = yozuv('×10⁸ marta kattalashtirilgan (sxematik)', {px:26, olcham:.13, rang:'#aab4d8'}); lL.position.set(0, -1.52, 0); LP.add(lL);
  /* lupaga bog‘lovchi chiziqlar */
  const chM = new T.LineBasicMaterial({color:0x7f8db8, transparent:true, opacity:.45}); chM.userData.env = 1;
  const chG = new T.BufferGeometry().setFromPoints([new T.Vector3(-1.42, 1.0, .06), new T.Vector3(1.55 - .9, 1.45 + .95, .1), new T.Vector3(-1.42, .7, .06), new T.Vector3(1.55 - .9, 1.45 - .95, .1)]);
  gP.add(new T.LineSegments(chG, chM));
  /* sirt atomlari */
  const ZN = [], MAXZ = 14;
  for(let i = 0; i < MAXZ; i++){ const col = i % 2, row = Math.floor(i / 2); const m = new T.Mesh(new T.SphereGeometry(.13, 22, 16), znM()); m.position.set(-.95 + col * .24, -.85 + row * .28, col * .02); m.userData.nom = 'zn'; m.userData.znMat = m.material; LP.add(m); ZN.push(m); }
  const cuAtomM = cuM();
  const ionCu = [], ionSO4 = [], ionZn = [];
  const cu2M = fmat('#3d8bff', {emissive:'#0a2350', roughness:.25}), zn2M = fmat('#dfe6ef', {emissive:'#2a3040', roughness:.25});
  for(let i = 0; i < 5; i++){ const m = new T.Mesh(new T.SphereGeometry(.12, 20, 14), cu2M); m.userData.nom = 'cu2'; m.position.set(.1 + rn() * .9, (rn() - .5) * 1.8, .05); m.userData.v = [(rn() - .5) * .2, (rn() - .5) * .2]; LP.add(m); ionCu.push(m); }
  for(let i = 0; i < 4; i++){ const s = new T.Group(); const c = new T.Mesh(new T.SphereGeometry(.07, 14, 10), fmat('#f2d23a')); s.add(c);
    [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].forEach(v=>{ const o = new T.Mesh(new T.SphereGeometry(.055, 12, 8), fmat('#ff5a48')); o.position.set(v[0] * .07, v[1] * .07, v[2] * .07); s.add(o); });
    nomla(s, 'so4'); s.position.set(.2 + rn() * .8, (rn() - .5) * 1.8, 0); s.userData.v = [(rn() - .5) * .2, (rn() - .5) * .2]; LP.add(s); ionSO4.push(s); }
  for(let i = 0; i < 3; i++){ const m = new T.Mesh(new T.SphereGeometry(.11, 20, 14), zn2M); m.userData.nom = 'zn2'; m.position.set(.4 + rn() * .6, (rn() - .5) * 1.6, .05); m.userData.v = [(rn() - .5) * .2, (rn() - .5) * .2]; m.visible = false; LP.add(m); ionZn.push(m); }
  /* faol sikl ishtirokchilari */
  const aZn = new T.Mesh(new T.SphereGeometry(.13, 22, 16), zn2M); aZn.userData.nom = 'zn2'; aZn.visible = false; LP.add(aZn);
  const aCu = new T.Mesh(new T.SphereGeometry(.12, 22, 16), cu2M); aCu.userData.nom = 'cu2'; LP.add(aCu);
  const eP = [0, 1].map(()=>{ const m = new T.Mesh(new T.SphereGeometry(.05, 14, 10), eM); m.userData.nom = 'elektron'; m.visible = false; LP.add(m); return m; });
  const bZn = yozuv('Zn⁰', {px:30, olcham:.15, rang:'#e8edf5'}), bCu = yozuv('Cu⁺²', {px:30, olcham:.15, rang:'#9cc4ff'});
  LP.add(bZn, bCu);
  const tengP = yozuv('Zn⁰ + Cu⁺²SO₄ → Zn⁺²SO₄ + Cu⁰', {px:34, olcham:.2, rang:'#ffe7a8'}); tengP.position.set(0, 3.45, 0); gP.add(tengP);
  const qoidaP = yozuv('Zn: 0 → +2 (oksidlanadi, 2e⁻ beradi)   ·   Cu: +2 → 0 (qaytariladi, 2e⁻ oladi)', {px:24, olcham:.13, rang:'#c9d2f0'}); qoidaP.position.set(0, 3.12, 0); gP.add(qoidaP);

  /* ---------- DANIELL ELEMENTI ---------- */
  const XL = -1.75, XR = 1.75;
  const sE1 = soya(S, 1.1, .006, .5, XL, 0); g.remove(sE1); gE.add(sE1);
  const sE2 = soya(S, 1.1, .006, .5, XR, 0); g.remove(sE2); gE.add(sE2);
  stakanQur(gE, XL, 0, .78, 1.95, '#dfe9f5', .3, 1.4, 'znso4');
  const eritR = stakanQur(gE, XR, 0, .78, 1.95, '#2f7fd8', .62, 1.4, 'cuso4');
  const anod = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.5, 2.05, .06, 2, .02) : new T.BoxGeometry(.5, 2.05, .06), znM()); anod.position.set(XL, 1.23, -.15); anod.userData.nom = 'anod'; gE.add(anod);
  const katod = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.5, 2.05, .06, 2, .02) : new T.BoxGeometry(.5, 2.05, .06), cuM()); katod.position.set(XR, 1.23, -.15); katod.userData.nom = 'katod'; gE.add(katod);
  [XL, XR].forEach(x=>{ const q = new T.Mesh(new T.CylinderGeometry(.07, .07, .14, 16), mat('#c9a13a', {metalness:.9, roughness:.3})); q.position.set(x, 2.3, -.15); gE.add(q); });
  /* tuz ko‘prigi */
  const kG = new T.Group(); gE.add(kG);
  const kNuq = [new T.Vector3(XL + .38, .55, .28), new T.Vector3(XL + .38, 2.2, .28), new T.Vector3(XL + .75, 2.62, .28), new T.Vector3(XR - .75, 2.62, .28), new T.Vector3(XR - .38, 2.2, .28), new T.Vector3(XR - .38, .55, .28)];
  const kEg = new T.CatmullRomCurve3(kNuq, false, 'catmullrom', .2);
  const kShM = shisha('#e9f6ff', .28); const kSh = new T.Mesh(new T.TubeGeometry(kEg, 80, .12, 16, false), kShM); kSh.raycast = ()=>{}; kG.add(kSh);
  const gelM = fmat('#f4f1e6', {transparent:true, opacity:.55, roughness:.6}); const gel = new T.Mesh(new T.TubeGeometry(kEg, 80, .095, 14, false), gelM); gel.userData.nom = 'kopri'; kG.add(gel);
  [kNuq[0], kNuq[5]].forEach(p=>{ const pa = new T.Mesh(new T.CylinderGeometry(.11, .11, .1, 16), mat('#f7f3ea', {roughness:.95})); pa.position.copy(p); pa.userData.nom = 'kopri'; kG.add(pa); });
  const lK = yozuv('Tuz ko‘prigi (KNO₃)', {px:28, olcham:.15}); lK.position.set(0, 2.98, .28); lK.userData.nom = 'kopri'; kG.add(lK);
  const kIon = [];
  for(let i = 0; i < 8; i++){ const an = i % 2 === 0; const m = new T.Mesh(new T.SphereGeometry(.05, 12, 8), an ? fmat('#40d6b4', {roughness:.3}) : fmat('#b27cff', {roughness:.3})); m.userData.nom = 'kopri'; m.userData.an = an; m.userData.u = i / 8; kG.add(m); kIon.push(m); }
  /* tashqi zanjir: Zn → kalit → ampermetr → Cu */
  const YS = 3.55;
  const simM = mat('#d97b3a', {metalness:.6, roughness:.35});
  const zNuq = [new T.Vector3(XL, 2.36, -.15), new T.Vector3(XL, YS, -.15), new T.Vector3(-.95, YS, -.15)];
  const zNuq2 = [new T.Vector3(-.35, YS, -.15), new T.Vector3(.25, YS, -.15)];
  const zNuq3 = [new T.Vector3(1.05, YS, -.15), new T.Vector3(XR, YS, -.15), new T.Vector3(XR, 2.36, -.15)];
  gE.add(simQur(zNuq, .028, simM), simQur(zNuq2, .028, simM), simQur(zNuq3, .028, simM));
  const eYol = [...zNuq, ...zNuq2, new T.Vector3(.65, YS, -.15), ...zNuq3];
  /* kalit */
  const kalitG = new T.Group(); kalitG.position.set(-.65, YS, -.15); gE.add(kalitG);
  const kTag = new T.Mesh(new T.BoxGeometry(.8, .06, .32), mat('#2a2f3b', {roughness:.5})); kTag.position.y = -.08; kalitG.add(kTag);
  [-.3, .3].forEach(x=>{ const k = new T.Mesh(new T.CylinderGeometry(.05, .05, .12, 14), mat('#c9a13a', {metalness:.9, roughness:.3})); k.position.set(x, 0, 0); kalitG.add(k); });
  const richag = new T.Group(); richag.position.set(-.3, .05, 0); kalitG.add(richag);
  const rch = new T.Mesh(new T.BoxGeometry(.62, .035, .06), mat('#d7dbe3', {metalness:.9, roughness:.25})); rch.position.x = .31; richag.add(rch);
  const dasta = new T.Mesh(new T.CylinderGeometry(.045, .045, .2, 14), mat('#1b1f28', {roughness:.5})); dasta.position.set(.62, .08, 0); richag.add(dasta);
  nomla(kalitG, 'kalit');
  /* ampermetr */
  const amG = new T.Group(); amG.position.set(.65, YS, -.15); gE.add(amG);
  const amT = new T.Mesh(new T.CylinderGeometry(.36, .36, .14, 40), mat('#20252f', {roughness:.4})); amT.rotation.x = Math.PI / 2; amG.add(amT);
  const amF = kanvas(256, 256, (c)=>{ c.fillStyle = '#f2efe6'; c.beginPath(); c.arc(128, 128, 124, 0, 6.3); c.fill(); c.strokeStyle = '#222'; c.lineWidth = 3; for(let i = 0; i <= 10; i++){ const a = Math.PI * (1.2 + .6 * i / 10); c.beginPath(); c.moveTo(128 + Math.cos(a) * 100, 150 + Math.sin(a) * 100); c.lineTo(128 + Math.cos(a) * (i % 5 ? 88 : 80), 150 + Math.sin(a) * (i % 5 ? 88 : 80)); c.stroke(); } c.fillStyle = '#222'; c.font = '700 34px Inter, sans-serif'; c.textAlign = 'center'; c.fillText('mA', 128, 205); });
  const amY = new T.Mesh(new T.CircleGeometry(.32, 40), new T.MeshBasicMaterial({map:amF})); amY.material.userData.env = 1; amY.position.z = .075; amG.add(amY);
  const strel = new T.Mesh(new T.BoxGeometry(.012, .26, .01), nurli('#c62828')); strel.geometry.translate(0, .13, 0); strel.position.set(0, -.07, .085); amG.add(strel);
  nomla(amG, 'ampermetr');
  /* voltmetr (old tomonda) */
  const vG = new T.Group(); vG.position.set(0, 0, 1.45); gE.add(vG);
  const vT = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(1.1, .5, .7, 4, .07) : new T.BoxGeometry(1.1, .5, .7), mat('#e3e6ec', {roughness:.4})); vT.position.y = .25; vG.add(vT);
  const vC = document.createElement('canvas'); vC.width = 256; vC.height = 110; const vX = vC.getContext('2d'); const vTx = new T.CanvasTexture(vC); vTx.encoding = T.sRGBEncoding;
  const vE = new T.Mesh(new T.PlaneGeometry(.78, .32), new T.MeshBasicMaterial({map:vTx})); vE.material.userData.env = 1; vE.position.set(0, .3, .352); vG.add(vE);
  const vL = yozuv('V', {px:30, olcham:.12, fon:false, rang:'#1b2030'}); vL.position.set(.45, .45, .36); vG.add(vL);
  nomla(vG, 'voltmetr');
  const vSim1 = trubka([new T.Vector3(XL - .12, 2.36, -.15), new T.Vector3(XL - .6, 2.6, .2), new T.Vector3(XL - 1.1, .3, 1.2), new T.Vector3(-.5, .12, 1.45), new T.Vector3(-.3, .3, 1.45)], .022, mat('#1d1f24', {roughness:.5}));
  const vSim2 = trubka([new T.Vector3(XR + .12, 2.36, -.15), new T.Vector3(XR + .6, 2.6, .2), new T.Vector3(XR + 1.1, .3, 1.2), new T.Vector3(.5, .12, 1.45), new T.Vector3(.3, .3, 1.45)], .022, mat('#b3261e', {roughness:.5}));
  vSim1.raycast = vSim2.raycast = ()=>{}; gE.add(vSim1, vSim2);
  function vYoz(U){ vX.fillStyle = '#0d1a14'; vX.fillRect(0, 0, 256, 110); vX.fillStyle = '#7dffb2'; vX.font = '700 60px "JetBrains Mono", monospace'; vX.textAlign = 'right'; vX.textBaseline = 'middle'; vX.fillText(son(U, 2), 200, 58); vX.font = '600 30px "JetBrains Mono", monospace'; vX.fillText('V', 240, 62); vTx.needsUpdate = true; }
  /* elektronlar simda, ionlar eritmada */
  const eE = []; for(let i = 0; i < 14; i++){ const m = new T.Mesh(new T.SphereGeometry(.055, 14, 10), eM); m.userData.nom = 'elektron'; m.userData.u = i / 14; gE.add(m); eE.push(m); }
  const znIon = [], cuIon = [];
  for(let i = 0; i < 6; i++){ const m = new T.Mesh(new T.SphereGeometry(.07, 14, 10), zn2M); m.userData.nom = 'znso4'; m.userData.u = i / 6; gE.add(m); znIon.push(m); }
  for(let i = 0; i < 6; i++){ const m = new T.Mesh(new T.SphereGeometry(.07, 14, 10), cu2M); m.userData.nom = 'cuso4'; m.userData.u = i / 6; gE.add(m); cuIon.push(m); }
  const bA = yozuv('Anod (−)\nZn⁰ − 2e⁻ → Zn⁺²\noksidlanish', {px:26, olcham:.14, rang:'#e3e9f5', chet:'rgba(160,170,190,.6)'}); bA.position.set(XL - 1.25, 1.7, 0); gE.add(bA);
  const bK = yozuv('Katod (+)\nCu⁺² + 2e⁻ → Cu⁰\nqaytarilish', {px:26, olcham:.14, rang:'#ffd3b0', chet:'rgba(220,140,90,.6)'}); bK.position.set(XR + 1.25, 1.7, 0); gE.add(bK);
  const bE = yozuv('e⁻ →', {px:30, olcham:.14, rang:'#ffe27a'}); bE.position.set(-1.25, YS + .35, -.15); gE.add(bE);
  const bE2 = yozuv('e⁻ →', {px:30, olcham:.14, rang:'#ffe27a'}); bE2.position.set(1.3, YS + .35, -.15); gE.add(bE2);
  const tengE = yozuv('Zn + Cu²⁺ → Zn²⁺ + Cu     E = 0,34 − (−0,76) = 1,10 V', {px:30, olcham:.17, rang:'#ffe7a8'}); tengE.position.set(0, 4.35, -.15); gE.add(tengE);
  /* HUD */
  const hud = S.dom('kbg-hud');
  /* holat */
  let rejim = 'plastinka', p = .15, avto = false, yopiq = false, kopri = true, belgi = !S.test, sikl = 0, kAn = 0, rAm = 0;
  const tok = ()=>yopiq && kopri;
  function hudYoz(){
    hud.innerHTML = rejim === 'plastinka'
      ? '<div><i>Jarayon</i><b>' + Math.round(p * 100) + ' %</b></div><div><i>Eritma</i><b style="font-size:13px">' + (p < .35 ? 'ko‘k (Cu²⁺ ko‘p)' : p < .8 ? 'och ko‘k' : 'deyarli rangsiz') + '</b></div>'
      : '<div><i>Voltmetr</i><b>' + son(kopri ? 1.1 : 0, 2) + ' V</b></div><div><i>Tok</i><b>' + (tok() ? 'bor' : 'yo‘q') + '</b></div><div><i>Tuz ko‘prigi</i><b style="font-size:13px">' + (kopri ? 'o‘rnida' : 'olingan') + '</b></div>';
  }
  function izohYoz(){
    S.izoh.innerHTML = rejim === 'plastinka'
      ? '<b>Zn + CuSO₄ → ZnSO₄ + Cu.</b> Rux atomi 2 ta elektron beradi (oksidlanadi, qaytaruvchi), mis ioni Cu²⁺ ularni oladi (qaytariladi, oksidlovchi). Eritma rangsizlanadi, plastinka qizg‘ish mis bilan qoplanadi. Jarayon: <b>' + Math.round(p * 100) + ' %</b>.'
      : '<b>Daniell elementi.</b> ' + (tok() ? 'Zanjir yopiq: elektronlar simda <b>Zn (−, anod) dan Cu (+, katod) ga</b> oqadi; ko‘prikda anionlar anodga, kationlar katodga siljiydi.' : !kopri ? '<span class="xat">Tuz ko‘prigi olingan — ichki zanjir uzildi, tok yo‘q, voltmetr 0 V.</span>' : 'Kalit ochiq — tok yo‘q, lekin voltmetr elementning EYuK ini ko‘rsatadi: <b>1,10 V</b> (standart sharoit: 1 M eritmalar, 25 °C).');
  }
  function yubor(){ hodisa('kbg-oks-holat', {rejim, p:Math.round(p * 100) / 100, yopiq, kopri, tok:tok(), U:kopri ? 1.1 : 0}); }
  let slP = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    S.guruh('Tajriba', [['plastinka', 'Zn + CuSO₄'], ['element', 'Daniell elementi']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    S.ajr();
    if(rejim === 'plastinka'){
      slP = S.slayder('Jarayon', 0, 100, 1, Math.round(p * 100), v=>v + ' %', v=>{ p = v / 100; avto = false; ab.classList.remove('faol'); hudYoz(); izohYoz(); yubor(); });
      const ab = S.tugma('Avto', b=>{ avto = !avto; if(avto && p >= 1) p = 0; b.classList.toggle('faol', avto); }); ab.classList.toggle('faol', avto);
    } else {
      S.tugma(yopiq ? 'Kalitni uzish' : 'Kalitni ulash', b=>{ yopiq = !yopiq; b.textContent = yopiq ? 'Kalitni uzish' : 'Kalitni ulash'; hudYoz(); izohYoz(); yubor(); });
      S.tugma(kopri ? 'Ko‘prikni olish' : 'Ko‘prikni qo‘yish', b=>{ kopri = !kopri; b.textContent = kopri ? 'Ko‘prikni olish' : 'Ko‘prikni qo‘yish'; hudYoz(); izohYoz(); yubor(); });
    }
    S.ajr();
    const bb = S.tugma('Oksidlanish darajalari', ()=>{ belgi = !belgi; bb.classList.toggle('faol', belgi); belgiQoll(); }); bb.classList.toggle('faol', belgi);
  }
  function belgiQoll(){ [bZn, bCu, tengP, qoidaP, bA, bK, tengE].forEach(s=>s.visible = belgi); }
  function qoll(){
    gP.visible = rejim === 'plastinka'; gE.visible = rejim === 'element';
    tagChiz(); hudYoz(); izohYoz(); belgiQoll();
    if(rejim === 'plastinka') S.fokus(3.6, new T.Vector3(0, 1.55, 0), true); else S.fokus(4.0, new T.Vector3(0, 1.9, 0), true);
  }
  /* kalitni sahnada bosish */
  bosishUla(S, 'kbg_oksidlanish', 'kbg-oks', ()=>({rejim}));
  const bosAsl = S.bosish;
  S.bosish = d=>{ bosAsl(d); if(d && d.nom === 'kalit'){ yopiq = !yopiq; tagChiz(); hudYoz(); izohYoz(); yubor(); } };
  S.holat = h=>{
    if(!h) return;
    if(h.rejim === 'plastinka' || h.rejim === 'element') rejim = h.rejim;
    if(h.p !== undefined){ p = cl(+h.p, 0, 1); avto = false; }
    if(h.yoq !== undefined) yopiq = !!h.yoq;
    if(h.kopri !== undefined) kopri = !!h.kopri;
    if(h.belgi !== undefined) belgi = !!h.belgi;
    qoll();
  };
  const v3 = new T.Vector3();
  kadrUla(S, (dt, t)=>{
    if(gP.visible){
      if(avto){ p = Math.min(1, p + dt * .06); const pr = Math.round(p * 100); if(pr !== S._avtoPr || p >= 1){ S._avtoPr = pr; if(slP) slP.qoy(pr, true); hudYoz(); izohYoz(); } if(p >= 1){ avto = false; tagChiz(); } }
      const pc = new T.Color('#2f7fd8').lerp(new T.Color('#e4eef8'), silliq(p));
      eritmaP.sm.color.copy(pc).convertSRGBToLinear(); eritmaP.sm.opacity = .62 - .34 * p; eritmaP.ym.color.copy(eritmaP.sm.color); eritmaP.ym.opacity = eritmaP.sm.opacity + .1;
      qopM.opacity = Math.min(.92, p * 1.1); donlar.count = Math.round(p * 60);
      /* mikro: sirtdagi Cu soni */
      const nCu = Math.round(p * (MAXZ - 2));
      ZN.forEach((m, i)=>{ const cu = i < nCu && i % 2 === 0 || i < nCu - 6; m.material = cu ? cuAtomM : m.userData.znMat; m.userData.nom = cu ? 'cu' : 'zn'; });
      ionZn.forEach((m, i)=>m.visible = p > (i + 1) * .25);
      ionCu.forEach((m, i)=>m.visible = p < 1 - i * .18);
      [...ionCu, ...ionSO4, ...ionZn].forEach(m=>{ const v = m.userData.v; m.position.x += v[0] * dt; m.position.y += v[1] * dt; if(m.position.x < .05 || m.position.x > 1.05) v[0] *= -1; if(Math.abs(m.position.y) > .95) v[1] *= -1; m.position.x = cl(m.position.x, .05, 1.05); m.position.y = cl(m.position.y, -.95, .95); m.rotation.y += dt; });
      /* faol sikl (3,2 s): Cu²⁺ yaqinlashadi → 2e⁻ o‘tadi → Cu o‘tiradi, Zn²⁺ ketadi */
      const faol = p < 1;
      sikl = (sikl + dt / 3.2) % 1;
      const k = 13 - (Math.floor(t / 3.2) % 3) * 2, sZn = ZN[Math.min(MAXZ - 1, k)];
      const q = faol ? sikl : 0;
      const zPos = sZn.position, joy = new T.Vector3(zPos.x + .27, zPos.y - .02, .05);
      aCu.visible = faol; aZn.visible = faol && q > .55;
      if(q < .3) aCu.position.set(lerp(.9, joy.x, silliq(q / .3)), lerp(zPos.y + .5, joy.y, silliq(q / .3)), .05);
      else aCu.position.copy(joy);
      aCu.material = q > .6 ? cuAtomM : cu2M; aCu.userData.nom = q > .6 ? 'cu' : 'cu2';
      eP.forEach((e, i)=>{ const u = (q - .32 - i * .08) / .22; e.visible = faol && u > 0 && u < 1; if(e.visible){ e.position.set(lerp(zPos.x, joy.x, u), lerp(zPos.y, joy.y, u) + Math.sin(u * Math.PI) * .22 + (i ? .05 : -.05), .2); } });
      sZn.visible = !(faol && q > .55);
      if(q > .55){ const u = silliq((q - .55) / .45); aZn.position.set(lerp(zPos.x, .75, u), lerp(zPos.y, zPos.y + .35, u), .08); }
      bZn.position.set(zPos.x - .05, zPos.y + .24, .3); bZn.visible = belgi && faol;
      bCu.position.copy(aCu.position).add(v3.set(.12, .22, .25)); bCu.visible = belgi && faol;
      const yangiZ = q > .55 ? 'Zn⁺²' : 'Zn⁰', yangiC = q > .6 ? 'Cu⁰' : 'Cu⁺²';
      if(bZn.userData.m !== yangiZ){ bZn.userData.m = yangiZ; spriteYoz(bZn, yangiZ, '#e8edf5'); }
      if(bCu.userData.m !== yangiC){ bCu.userData.m = yangiC; spriteYoz(bCu, yangiC, q > .6 ? '#ffc79a' : '#9cc4ff'); }
      if(q > .55) bZn.position.copy(aZn.position).add(v3.set(0, .24, .25));
    }
    if(gE.visible){
      const on = tok();
      richag.rotation.z += ((yopiq ? 0 : .75) - richag.rotation.z) * Math.min(1, dt * 6);
      kG.position.y += ((kopri ? 0 : 1.6) - kG.position.y) * Math.min(1, dt * 4);
      gelM.opacity = kopri ? .55 : .3; kShM.opacity = kopri ? .28 : .15;
      rAm += ((on ? .55 : 0) - rAm) * Math.min(1, dt * 3);
      strel.rotation.z = .6 - rAm * 2.2;
      if(vX.userData !== kopri){ vX.userData = kopri; vYoz(kopri ? 1.1 : 0); }
      eE.forEach(e=>{ e.visible = on; if(on){ e.userData.u = (e.userData.u + dt * .12) % 1; yolNuqta(eYol, e.userData.u, e.position); } });
      kIon.forEach(m=>{ m.visible = on; if(on){ m.userData.u = (m.userData.u + dt * .1) % 1; const u = m.userData.an ? 1 - m.userData.u : m.userData.u; m.position.copy(kEg.getPointAt(cl(u, 0, 1))); m.position.z += m.userData.an ? .04 : -.04; } });
      znIon.forEach((m, i)=>{ m.visible = on; if(on){ m.userData.u = (m.userData.u + dt * .15) % 1; const u = m.userData.u; m.position.set(XL + .1 + u * .45, .35 + i * .17, -.08 + Math.sin(u * 6 + i) * .12); } });
      cuIon.forEach((m, i)=>{ m.visible = on; if(on){ m.userData.u = (m.userData.u + dt * .15) % 1; const u = m.userData.u; m.position.set(XR + .6 - u * .55, .35 + i * .17, -.08 + Math.sin(u * 6 + i) * .12); m.scale.setScalar(u > .9 ? (1 - u) * 10 : 1); } });
      if(on){ const pp = (Math.sin(t * 2) + 1) / 2; bE.material.opacity = .6 + .4 * pp; bE2.material.opacity = .6 + .4 * (1 - pp); }
    }
  });
  /* sprite matnini almashtirish */
  function spriteYoz(sp, matn, rangM){ const yangi = yozuv(matn, {px:30, olcham:.15, rang:rangM}); sp.material.map.dispose(); sp.material.map = yangi.material.map; sp.scale.copy(yangi.scale); sp.material.needsUpdate = true; yangi.material.dispose(); }
  vYoz(1.1); vX.userData = true;
  S.joyla(3.6, new T.Vector3(0, 1.55, 0));
  qoll();
  S.yorliq('Kimyo · oksidlanish-qaytarilish');
  return S;
};


/* ================= 3. BIOLOGIYA — barg tuzilishi va fotosintez ================= */
function kapsula(r, h, seg){
  const p = []; const n = 10;
  for(let i = 0; i <= n; i++){ const a = -Math.PI / 2 + i / n * Math.PI / 2; p.push(new T.Vector2(Math.cos(a) * r + .0001, -h / 2 + r + Math.sin(a) * r)); }
  for(let i = 0; i <= n; i++){ const a = i / n * Math.PI / 2; p.push(new T.Vector2(Math.cos(a) * r + .0001, h / 2 - r + Math.sin(a) * r)); }
  return new T.LatheGeometry(p, seg || 16);
}
const FOTO_CO2 = {past:.5, normal:1, yuqori:1.3};
function fotoTezlik(L, co2, ogiz){ if(L <= 0) return 0; return 70 * (1.25 * L / (L + 25)) * (FOTO_CO2[co2] || 1) * (ogiz ? 1 : .15); }

R.kbg_fotosintez = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.32, ry:-.42, rxMin:-.4, rxMax:1.2, zoom:1.0});
  const g = S.g;
  S.nomlar = {kutikula:'Kutikula (mumsimon parda)', ust_epiderma:'Ustki epiderma', ustunsimon:'Ustunsimon (palisad) to‘qima', bulutsimon:'Bulutsimon (g‘ovak) to‘qima', havo:'Havo bo‘shlig‘i', ksilema:'Ksilema (suv yo‘li)', floema:'Floema (qand yo‘li)', ost_epiderma:'Ostki epiderma', ogizcha:'Og‘izcha (ustitsa) teshigi', qoriqlovchi:'Qo‘riqlovchi (tutashtiruvchi) hujayra', xloroplast:'Xloroplast', yoruglik:'Quyosh nuri (yorug‘lik energiyasi)', co2:'CO₂ — karbonat angidrid kiradi', o2:'O₂ — kislorod chiqadi', h2o:'H₂O — suv ildizdan keladi', qand:'Qand (glyukoza) — floema orqali tarqaladi',
    xl_membrana:'Xloroplastning qo‘sh membranasi', grana:'Grana (tilakoidlar ustuni)', tilakoid:'Tilakoid', stroma:'Stroma', kraxmal:'Kraxmal donasi'};
  const gB = new T.Group(), gX = new T.Group(); g.add(gB, gX);
  const X0 = -3, X1 = 3, Z0 = -1.3, Z1 = 1.3;
  const rn = tasodif(5);
  /* taglik soyasi */
  const sB = soya(S, 3.8, -1.9, .5); g.remove(sB); gB.add(sB);
  /* kutikula */
  const kutM = fmat('#e8f5b0', {transparent:true, opacity:.34, roughness:.12, clearcoat:1, depthWrite:false});
  const kut = new T.Mesh(new T.BoxGeometry(X1 - X0, .07, Z1 - Z0), kutM); kut.position.set(0, 1.54, 0); kut.userData.nom = 'kutikula'; gB.add(kut);
  const kut2 = new T.Mesh(new T.BoxGeometry(X1 - X0, .05, Z1 - Z0), kutM); kut2.position.set(0, -1.0, 0); kut2.userData.nom = 'kutikula'; gB.add(kut2);
  /* epiderma hujayralari (instanced) */
  const epG = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.4, .19, .4, 2, .05) : new T.BoxGeometry(.4, .19, .4);
  const epM = fmat('#dff3cf', {transparent:true, opacity:.42, roughness:.35, depthWrite:false});
  const epM2 = fmat('#d6eec4', {transparent:true, opacity:.42, roughness:.35, depthWrite:false});
  const STX = -1.0, STZ = .15;           // og‘izcha joyi
  const epU = [], epL = [];
  for(let x = X0 + .21; x < X1 - .1; x += .42) for(let z = Z0 + .21; z < Z1 - .1; z += .42){ epU.push([x, z]); if(!(Math.abs(x - STX) < .5 && Math.abs(z - STZ) < .3)) epL.push([x, z]); }
  const eU = new T.InstancedMesh(epG, epM, epU.length); epU.forEach((p, i)=>joyQoy(eU, i, p[0], 1.4, p[1])); eU.userData.nom = 'ust_epiderma'; gB.add(eU);
  const eL = new T.InstancedMesh(epG, epM2, epL.length); epL.forEach((p, i)=>joyQoy(eL, i, p[0], -.86, p[1])); eL.userData.nom = 'ost_epiderma'; gB.add(eL);
  /* ustunsimon hujayralar */
  const palG = kapsula(.125, .8, 14);
  const palM = fmat('#8fd46a', {transparent:true, opacity:.4, roughness:.35, depthWrite:false});
  const palJ = [];
  for(let x = X0 + .16; x < X1 - .1; x += .29) for(let z = Z0 + .16; z < Z1 - .1; z += .29) palJ.push([x + (rn() - .5) * .03, z + (rn() - .5) * .03]);
  const pal = new T.InstancedMesh(palG, palM, palJ.length); palJ.forEach((p, i)=>joyQoy(pal, i, p[0], .84, p[1])); pal.userData.nom = 'ustunsimon'; gB.add(pal);
  /* o‘tkazuvchi tutam (tomir) */
  const VX = 1.25, VY = -.12;
  /* bulutsimon hujayralar */
  const spJ = [];
  for(let k = 0; k < 900 && spJ.length < 150; k++){
    const x = X0 + .2 + rn() * (X1 - X0 - .4), y = -.62 + rn() * .92, z = Z0 + .2 + rn() * (Z1 - Z0 - .4), r = .14 + rn() * .08;
    if(Math.hypot(x - VX, y - VY) < .62) continue;
    if(Math.hypot(x - STX, y + .45, z - STZ) < .45) continue;
    if(spJ.some(q=>Math.hypot(q[0] - x, q[1] - y, q[2] - z) < (q[3] + r) * .95)) continue;
    spJ.push([x, y, z, r]);
  }
  const spG = new T.SphereGeometry(1, 16, 12);
  const spM = fmat('#a6dc7e', {transparent:true, opacity:.4, roughness:.35, depthWrite:false});
  const spo = new T.InstancedMesh(spG, spM, spJ.length);
  const _mm = new T.Matrix4();
  spJ.forEach((p, i)=>{ _mm.compose(new T.Vector3(p[0], p[1], p[2]), new T.Quaternion().setFromEuler(new T.Euler(rn() * 3, rn() * 3, 0)), new T.Vector3(p[3] * 1.25, p[3], p[3] * .95)); spo.setMatrixAt(i, _mm); });
  spo.userData.nom = 'bulutsimon'; gB.add(spo);
  /* xloroplastlar */
  const xlJ = [];
  palJ.forEach(p=>{ for(let k = 0; k < 7; k++){ const a = rn() * 6.283; xlJ.push([p[0] + Math.cos(a) * .085, .5 + rn() * .68, p[1] + Math.sin(a) * .085, a]); } });
  spJ.forEach(p=>{ for(let k = 0; k < 3; k++){ const a = rn() * 6.283, b = (rn() - .5) * 2; xlJ.push([p[0] + Math.cos(a) * p[3] * .75, p[1] + b * p[3] * .5, p[2] + Math.sin(a) * p[3] * .75, a]); } });
  const xlM = fmat('#2e9a38', {roughness:.35, emissive:'#062a08'});
  const xl = new T.InstancedMesh(new T.SphereGeometry(1, 12, 8), xlM, xlJ.length);
  xlJ.forEach((p, i)=>{ _mm.compose(new T.Vector3(p[0], p[1], p[2]), new T.Quaternion().setFromEuler(new T.Euler(0, -p[3], 0)), new T.Vector3(.028, .05, .042)); xl.setMatrixAt(i, _mm); });
  xl.userData.nom = 'xloroplast'; gB.add(xl);
  /* havo bo‘shlig‘i (og‘izcha usti) */
  const havo = new T.Mesh(new T.SphereGeometry(.34, 24, 16), fmat('#cfe8ff', {transparent:true, opacity:.24, roughness:.1, depthWrite:false})); havo.scale.set(1.15, .8, 1); havo.position.set(STX, -.47, STZ); havo.userData.nom = 'havo'; gB.add(havo);
  /* tomir: g‘ilof, ksilema, floema */
  const gilofM = fmat('#c7e59a', {transparent:true, opacity:.4, roughness:.35, depthWrite:false});
  const gil = new T.InstancedMesh(new T.CylinderGeometry(.075, .075, Z1 - Z0 - .05, 12), gilofM, 18);
  for(let i = 0; i < 18; i++){ const a = i / 18 * 6.283; _mm.compose(new T.Vector3(VX + Math.cos(a) * .48, VY + Math.sin(a) * .44, 0), new T.Quaternion().setFromEuler(new T.Euler(Math.PI / 2, 0, 0)), new T.Vector3(1, 1, 1)); gil.setMatrixAt(i, _mm); }
  gB.add(gil);
  const ksM = fmat('#b0587a', {roughness:.35, transparent:true, opacity:.75}), flM = fmat('#e9a23b', {roughness:.35, transparent:true, opacity:.72});
  const ksJ = [[-.18, .12, .1], [.02, .16, .09], [.2, .1, .08], [-.08, -.02, .065], [.12, -.03, .06]];
  const flJ = [[-.2, -.2, .05], [-.08, -.24, .045], [.05, -.25, .05], [.18, -.19, .045], [-.02, -.13, .04], [.12, -.12, .04]];
  ksJ.forEach(p=>{ const m = new T.Mesh(new T.CylinderGeometry(p[2], p[2], Z1 - Z0 + .02, 16, 1, true), ksM); m.material.side = T.DoubleSide; m.rotation.x = Math.PI / 2; m.position.set(VX + p[0], VY + p[1], 0); m.userData.nom = 'ksilema'; gB.add(m);
    const h = new T.Mesh(new T.TorusGeometry(p[2], .012, 6, 20), ksM); h.position.set(VX + p[0], VY + p[1], Z1 + .01); h.userData.nom = 'ksilema'; gB.add(h); });
  flJ.forEach(p=>{ const m = new T.Mesh(new T.CylinderGeometry(p[2], p[2], Z1 - Z0 + .02, 12), flM); m.rotation.x = Math.PI / 2; m.position.set(VX + p[0], VY + p[1], 0); m.userData.nom = 'floema'; gB.add(m); });
  /* og‘izcha: ikki qo‘riqlovchi hujayra */
  const qM = fmat('#5fbf4a', {roughness:.3});
  const qor = [-1, 1].map(s=>{ const m = new T.Mesh(new T.TorusGeometry(.2, .075, 14, 28, Math.PI), qM); m.rotation.x = -Math.PI / 2; m.rotation.z = s > 0 ? -Math.PI / 2 : Math.PI / 2; m.scale.set(1.35, 1, 1); m.position.set(STX, -.9, STZ); m.userData.nom = 'qoriqlovchi'; m.userData.s = s; gB.add(m); return m; });
  const qXl = new T.InstancedMesh(new T.SphereGeometry(.03, 8, 6), xlM, 10); for(let i = 0; i < 10; i++){ const s = i < 5 ? -1 : 1, a = (i % 5) / 4 * Math.PI - Math.PI / 2; joyQoy(qXl, i, STX + s * .21 * Math.cos(a), -.84, STZ + Math.sin(a) * .27); } qXl.userData.nom = 'qoriqlovchi'; gB.add(qXl);
  const teshik = new T.Mesh(new T.CircleGeometry(1, 32), new T.MeshBasicMaterial({color:rang('#0b0f14'), transparent:true, opacity:.85})); teshik.material.userData.env = 1; teshik.rotation.x = Math.PI / 2; teshik.position.set(STX, -.93, STZ); teshik.userData.nom = 'ogizcha'; gB.add(teshik);
  /* strelkalar */
  const sM = nurli('#ffd84a', .92);
  const nurlar = new T.Group(); gB.add(nurlar);
  [[-2.2, -.4], [-.6, .3], [1.0, -.2], [2.4, .4]].forEach(([x, z])=>{ const a = strelka(new T.Vector3(x - .5, 3.3, z), new T.Vector3(x, 1.72, z), null, {r:.045, mat:sM}); nomla(a, 'yoruglik'); nurlar.add(a); });
  const quyosh = new T.Mesh(new T.SphereGeometry(.32, 32, 20), nurli('#ffe27a')); quyosh.position.set(-1.6, 3.95, -.3); quyosh.userData.nom = 'yoruglik'; nurlar.add(quyosh);
  const co2A = strelka(new T.Vector3(STX - .55, -2.1, STZ), new T.Vector3(STX - .08, -1.1, STZ), null, {r:.05, mat:nurli('#9aa4b5', .95)}); nomla(co2A, 'co2'); gB.add(co2A);
  const o2A = strelka(new T.Vector3(STX + .08, -1.1, STZ), new T.Vector3(STX + .6, -2.1, STZ), null, {r:.05, mat:nurli('#79d8ff', .95)}); nomla(o2A, 'o2'); gB.add(o2A);
  const h2oA = strelka(new T.Vector3(VX - .02, VY + .72, Z0 - .9), new T.Vector3(VX - .02, VY + .72, Z0 + .2), null, {r:.05, mat:nurli('#4d8dff', .95)}); nomla(h2oA, 'h2o'); gB.add(h2oA);
  const qA = strelka(new T.Vector3(VX + .05, VY - .75, Z0 + .2), new T.Vector3(VX + .05, VY - .75, Z0 - .9), null, {r:.05, mat:nurli('#ffa640', .95)}); nomla(qA, 'qand'); gB.add(qA);
  /* yozuvlar */
  const Y = (m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:28, olcham:.15}, o || {})); s.position.set(x, y, z); if(nom) s.userData.nom = nom; gB.add(s); return s; };
  const yoz = [
    Y('Kutikula', X0 - .45, 1.95, Z1, 'kutikula'), Y('Ustki epiderma', X0 - .75, 1.42, Z1, 'ust_epiderma'), Y('Ustunsimon to‘qima', X0 - .9, .85, Z1, 'ustunsimon'),
    Y('Bulutsimon to‘qima', X0 - .9, -.2, Z1, 'bulutsimon'), Y('Ostki epiderma', X0 - .75, -.86, Z1, 'ost_epiderma'), Y('Og‘izcha', STX - .9, -1.45, STZ + .6, 'ogizcha'),
    Y('Ksilema', X1 + .75, VY + .3, Z1, 'ksilema'), Y('Floema', X1 + .7, VY - .35, Z1, 'floema'),
    Y('Yorug‘lik', -2.9, 3.3, -.4, 'yoruglik', {rang:'#ffe27a'}), Y('CO₂', STX - .75, -2.25, STZ, 'co2', {rang:'#d0d6e2'}), Y('O₂', STX + .8, -2.25, STZ, 'o2', {rang:'#9fe6ff'}),
    Y('H₂O', VX - .05, VY + 1.0, Z0 - 1.05, 'h2o', {rang:'#9cc2ff'}), Y('Qand', VX + .05, VY - 1.02, Z0 - 1.05, 'qand', {rang:'#ffc27a'})
  ];
  if(S.test) yoz.forEach(y=>y.visible = false);
  /* zarrachalar */
  const cM = fmat('#2a2d33', {roughness:.4}), oM = fmat('#ff4d3d', {roughness:.3}), hM = fmat('#eef3ff', {roughness:.3}), gM = fmat('#ffb347', {roughness:.3});
  const N = 16;
  const pCO2c = sharlar(N, .045, cM), pCO2o = sharlar(N * 2, .035, oM), pO2 = sharlar(N * 2, .038, fmat('#79d8ff', {roughness:.3, emissive:'#0b3a4a'})), pH2Oo = sharlar(N, .042, fmat('#4d8dff', {roughness:.3})), pH2Oh = sharlar(N * 2, .026, hM), pQ = sharlar(N, .05, gM);
  [[pCO2c, 'co2'], [pCO2o, 'co2'], [pO2, 'o2'], [pH2Oo, 'h2o'], [pH2Oh, 'h2o'], [pQ, 'qand']].forEach(([m, n])=>{ m.userData.nom = n; gB.add(m); });
  const zar = []; for(let i = 0; i < N; i++) zar.push({u:rn(), tx:X0 + .4 + rn() * (X1 - X0 - .8), tz:Z0 + .3 + rn() * (Z1 - Z0 - .6), ty:.6 + rn() * .5, s:rn()});
  /* ---------- XLOROPLAST (kattalashtirilgan) ---------- */
  const sX = soya(S, 3.2, -1.6, .5); g.remove(sX); gX.add(sX);
  const kesAsl = new T.Plane(new T.Vector3(0, 0, -1), 0), kes = kesAsl.clone();
  const kesM = (h, o, p)=>{ const m = fmat(h, Object.assign({transparent:o < 1, opacity:o, side:T.DoubleSide, depthWrite:o >= 1}, p || {})); m.clippingPlanes = [kes]; return m; };
  const tash = new T.Mesh(new T.SphereGeometry(1, 64, 40), kesM('#7cc45a', .42)); tash.scale.set(3, 1.35, 1.35); tash.userData.nom = 'xl_membrana'; gX.add(tash);
  const ich = new T.Mesh(new T.SphereGeometry(1, 64, 40), kesM('#5aa843', .5)); ich.scale.set(2.9, 1.27, 1.27); ich.userData.nom = 'xl_membrana'; gX.add(ich);
  const strM = kesM('#bfe6a0', .28, {depthWrite:false});
  const str = new T.Mesh(new T.SphereGeometry(1, 48, 32), strM); str.scale.set(2.84, 1.22, 1.22); str.userData.nom = 'stroma'; gX.add(str);
  const kesYuz = new T.Mesh(new T.CircleGeometry(1, 64), fmat('#cdeeb2', {transparent:true, opacity:.32, depthWrite:false})); kesYuz.scale.set(2.84, 1.22, 1); kesYuz.userData.nom = 'stroma'; gX.add(kesYuz);
  const granM = fmat('#1f8a2e', {roughness:.3, emissive:'#062a08'}), tilM = fmat('#3fbf4f', {roughness:.3, emissive:'#0a3a10'});
  const granJ = [[-1.9, .1, -.35], [-1.25, -.35, -.6], [-.6, .25, -.4], [0, -.3, -.7], [.65, .2, -.45], [1.3, -.25, -.55], [1.9, .15, -.4], [-.3, .05, .1], [.9, -.05, .05]];
  granJ.forEach(([x, y, z], k)=>{ const st = new T.Group(); const n = 6 + (k % 4); for(let i = 0; i < n; i++){ const d = new T.Mesh(new T.CylinderGeometry(.26, .26, .05, 28), granM); d.position.y = i * .068 - n * .034; st.add(d); } st.position.set(x, y, z); st.rotation.z = (rn() - .5) * .3; nomla(st, 'grana'); gX.add(st); });
  for(let i = 0; i < granJ.length - 1; i++){ const a = granJ[i], b = granJ[i + 1]; const d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const m = new T.Mesh(new T.BoxGeometry(d.length(), .025, .16), tilM); m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); m.rotation.z = Math.atan2(d.y, d.x); m.rotation.y = -Math.atan2(d.z, Math.hypot(d.x, d.y)); m.userData.nom = 'tilakoid'; gX.add(m); }
  const tilY = new T.Mesh(new T.CylinderGeometry(.42, .42, .09, 36), tilM); tilY.position.set(2.2, 1.9, .6); tilY.rotation.x = .5; tilY.userData.nom = 'tilakoid'; gX.add(tilY);
  const krx = new T.Mesh(new T.SphereGeometry(.34, 28, 18), fmat('#f4f1e4', {roughness:.6})); krx.scale.set(1.3, .8, .9); krx.position.set(.3, -.55, .15); krx.userData.nom = 'kraxmal'; gX.add(krx);
  const ribo = sharlar(80, .022, fmat('#caa15a')); for(let i = 0; i < 80; i++){ const a = rn() * 6.283, r = rn(); joyQoy(ribo, i, (rn() - .5) * 5, Math.cos(a) * r * .9, -Math.abs(Math.sin(a)) * r * .9); } ribo.userData.nom = 'stroma'; gX.add(ribo);
  const YX = (m, x, y, z, nom)=>{ const s = yozuv(m, {px:28, olcham:.16}); s.position.set(x, y, z); s.userData.nom = nom; gX.add(s); return s; };
  YX('Tashqi va ichki membrana', -2.2, 1.65, 0, 'xl_membrana'); YX('Grana (tilakoidlar ustuni)', -.6, .95, .2, 'grana'); YX('Stroma', 1.5, -1.0, .6, 'stroma'); YX('Kraxmal donasi', .4, -1.35, .9, 'kraxmal'); YX('Tilakoid', 2.2, 2.4, .6, 'tilakoid');
  const tengX = yozuv('6CO₂ + 6H₂O  —(yorug‘lik, xlorofill)→  C₆H₁₂O₆ + 6O₂', {px:32, olcham:.2, rang:'#ffe7a8'}); tengX.position.set(0, 2.65, 0); gX.add(tengX);
  [[-1.2, .3], [0, -.2], [1.2, .4]].forEach(([x, z])=>{ const a = strelka(new T.Vector3(x - .4, 3.1, z), new T.Vector3(x, 1.5, z), null, {r:.04, mat:sM}); gX.add(a); });
  /* HUD + grafik */
  const hud = S.dom('kbg-hud');
  const gr = S.dom('kbg-graf', '<div class="sar">Tezlik ↔ yorug‘lik (nisbiy)</div><canvas width="230" height="130"></canvas>');
  const gx = gr.querySelector('canvas').getContext('2d');
  /* holat */
  let rejim = 'barg', L = 70, co2 = 'normal', ogiz = true, oqim = true, tez = fotoTezlik(70, 'normal', true), och = 1;
  function grafik(){
    const W = 230, H = 130, Lm = 26, B = 18; gx.clearRect(0, 0, W, H);
    gx.strokeStyle = 'rgba(255,255,255,.1)'; gx.fillStyle = '#8f98bd'; gx.font = '10px Inter, sans-serif';
    [0, 50, 100].forEach(v=>{ const y = H - B - v / 100 * (H - B - 8); gx.beginPath(); gx.moveTo(Lm, y); gx.lineTo(W - 4, y); gx.stroke(); gx.fillText(String(v), 4, y + 3); });
    gx.fillText('0', Lm - 3, H - 4); gx.fillText('yorug‘lik, %', W - 70, H - 4);
    const X = l=>Lm + l / 100 * (W - Lm - 8), Yy = v=>H - B - v / 100 * (H - B - 8);
    [['past', 'rgba(111,211,255,.35)'], ['yuqori', 'rgba(111,211,255,.35)'], [co2, '#6fd3ff']].forEach(([c, s], k)=>{ gx.strokeStyle = s; gx.lineWidth = k === 2 ? 2 : 1; gx.setLineDash(k === 2 ? [] : [3, 3]); gx.beginPath(); for(let l = 0; l <= 100; l += 2){ const v = fotoTezlik(l, c, ogiz); l ? gx.lineTo(X(l), Yy(v)) : gx.moveTo(X(l), Yy(v)); } gx.stroke(); });
    gx.setLineDash([]); gx.fillStyle = '#fff'; gx.beginPath(); gx.arc(X(L), Yy(tez), 4.5, 0, 6.3); gx.fill();
  }
  function yangila(){
    tez = fotoTezlik(L, co2, ogiz);
    hud.innerHTML = '<div><i>Fotosintez tezligi</i><b>' + Math.round(tez) + ' <span style="font-size:11px;color:#8f98bd">nisbiy</span></b></div><div><i>Yorug‘lik · CO₂</i><b style="font-size:13px">' + L + ' % · ' + co2 + '</b></div><div><i>Og‘izcha</i><b style="font-size:13px">' + (ogiz ? 'ochiq' : 'yopiq') + '</b></div>';
    grafik();
    S.izoh.innerHTML = rejim === 'xloroplast'
      ? '<b>Xloroplast.</b> Yorug‘lik bosqichi tilakoid membranalarida (granalarda) boradi: suv parchalanadi, O₂ ajraladi. Qorong‘ilik (Kalvin) sikli stromada: CO₂ dan glyukoza hosil bo‘ladi. <i>Sxematik model.</i>'
      : (L === 0 ? '<b>Yorug‘lik yo‘q</b> — fotosintez to‘xtaydi (nafas olish esa davom etadi).' : !ogiz ? '<b>Og‘izchalar yopiq</b> — CO₂ bargga deyarli kirmaydi, fotosintez keskin sekinlashadi (masalan, jazirama issiqda suvni tejash uchun).' : '<b>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.</b> Yorug‘lik ' + L + ' %, CO₂ ' + co2 + ': tezlik ≈ <b>' + Math.round(tez) + '</b> (nisbiy birlik, sxematik model). Yorug‘lik ortgan sari tezlik avval tez, keyin sekin o‘sadi — boshqa omil cheklaydi.');
  }
  function yubor(){ hodisa('kbg-foto-tezlik', {rejim, yoruglik:L, co2, ogiz, tezlik:Math.round(tez)}); }
  let slL, cg, og, ob;
  function tagChiz(){
    S.tag.innerHTML = '';
    S.guruh('Ko‘rinish', [['barg', 'Barg kesimi'], ['xloroplast', 'Xloroplast']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    S.ajr();
    slL = S.slayder('Yorug‘lik', 0, 100, 5, L, v=>v + ' %', v=>{ L = v; yangila(); yubor(); });
    cg = S.guruh('CO₂', [['past', 'past'], ['normal', 'normal'], ['yuqori', 'yuqori']], co2, k=>{ co2 = k; cg.faol(k); yangila(); yubor(); });
    og = S.tugma(ogiz ? 'Og‘izcha: ochiq' : 'Og‘izcha: yopiq', b=>{ ogiz = !ogiz; b.textContent = ogiz ? 'Og‘izcha: ochiq' : 'Og‘izcha: yopiq'; b.classList.toggle('faol', ogiz); yangila(); yubor(); }); og.classList.toggle('faol', ogiz);
    ob = S.tugma('Oqim', b=>{ oqim = !oqim; b.classList.toggle('faol', oqim); }); ob.classList.toggle('faol', oqim);
  }
  function qoll(){
    gB.visible = rejim === 'barg'; gX.visible = rejim === 'xloroplast';
    S.ren.localClippingEnabled = rejim === 'xloroplast';
    tagChiz(); yangila();
    if(rejim === 'barg') S.fokus(3.7, new T.Vector3(-.2, -.1, 0), true); else S.fokus(3.3, new T.Vector3(0, .5, 0), true);
  }
  bosishUla(S, 'kbg_fotosintez', 'kbg-foto');
  S.holat = h=>{
    if(!h) return;
    if(h.rejim === 'barg' || h.rejim === 'xloroplast') rejim = h.rejim;
    if(h.yoruglik !== undefined) L = cl(Math.round(+h.yoruglik), 0, 100);
    if(h.co2 && FOTO_CO2[h.co2]) co2 = h.co2;
    if(h.ogiz !== undefined) ogiz = !!h.ogiz;
    if(h.oqim !== undefined) oqim = !!h.oqim;
    qoll();
  };
  const v = new T.Vector3();
  kadrUla(S, (dt, t)=>{
    och += ((ogiz ? 1 : 0) - och) * Math.min(1, dt * 3);
    qor.forEach(m=>{ m.position.x = STX + m.userData.s * (.02 + .06 * och); });
    teshik.scale.set(.02 + .06 * och, .26, 1);
    const k = tez / 70;
    nurlar.children.forEach((a, i)=>{ if(a.userData.mat) a.visible = L > 0; });
    sM.opacity = L > 0 ? .35 + .6 * L / 100 : .1; quyosh.material.color.setRGB(.4 + .6 * L / 100, .35 + .5 * L / 100, .1 + .2 * L / 100);
    if(gX.visible){ gX.updateMatrixWorld(); kes.copy(kesAsl).applyMatrix4(gX.matrixWorld); }
    if(!gB.visible) return;
    const faol = oqim && tez > .5;
    [pCO2c, pCO2o, pO2, pH2Oo, pH2Oh, pQ].forEach(m=>m.visible = faol);
    if(!faol) return;
    const sp = .05 + .22 * k;
    zar.forEach((z, i)=>{
      z.u = (z.u + dt * sp) % 1;
      /* CO₂: pastdan og‘izchaga, so‘ng hujayraga */
      const u = z.u;
      if(u < .45){ const w = u / .45; v.set(lerp(STX - .5, STX, w), lerp(-2.0, -.95, w), STZ); }
      else if(!ogiz){ v.set(STX - .1 + Math.sin(i + t) * .05, -1.05, STZ + (i % 3 - 1) * .08); }
      else { const w = silliq((u - .45) / .55); v.set(lerp(STX, z.tx, w), lerp(-.95, z.ty, w), lerp(STZ, z.tz, w)); }
      joyQoy(pCO2c, i, v.x, v.y, v.z); joyQoy(pCO2o, i * 2, v.x - .06, v.y, v.z); joyQoy(pCO2o, i * 2 + 1, v.x + .06, v.y, v.z);
      /* O₂: hujayradan og‘izchaga, pastga */
      const u2 = (z.u + .5) % 1;
      if(u2 < .55){ const w = silliq(u2 / .55); v.set(lerp(z.tx, STX, w), lerp(z.ty, -.95, w), lerp(z.tz, STZ, w)); } else { const w = (u2 - .55) / .45; v.set(lerp(STX, STX + .55, w), lerp(-.95, -2.0, w), STZ); }
      if(!ogiz && u2 > .55) v.set(STX + .1, -1.0, STZ);
      joyQoy(pO2, i * 2, v.x - .035, v.y, v.z); joyQoy(pO2, i * 2 + 1, v.x + .035, v.y, v.z);
      /* H₂O: ksilema bo‘ylab */
      const ks = ksJ[i % ksJ.length], zz = lerp(Z0 - .8, Z1, (z.u * 1.3 + z.s) % 1);
      joyQoy(pH2Oo, i, VX + ks[0], VY + ks[1], zz); joyQoy(pH2Oh, i * 2, VX + ks[0] - .035, VY + ks[1] + .03, zz); joyQoy(pH2Oh, i * 2 + 1, VX + ks[0] + .035, VY + ks[1] + .03, zz);
      const fl = flJ[i % flJ.length]; joyQoy(pQ, i, VX + fl[0], VY + fl[1], lerp(Z1, Z0 - .8, (z.u * 1.1 + z.s) % 1));
    });
    [pCO2c, pCO2o, pO2, pH2Oo, pH2Oh, pQ].forEach(m=>m.instanceMatrix.needsUpdate = true);
  });
  S.joyla(3.7, new T.Vector3(-.2, -.1, 0));
  qoll();
  S.yorliq('Biologiya · barg kesimi va fotosintez (sxematik model)');
  const yopA = S.yopish; S.yopish = ()=>{ S.ren.localClippingEnabled = false; yopA(); };
  return S;
};


/* ================= 4. BIOLOGIYA — hayvon va o‘simlik hujayrasi (1/4 kesim) ================= */
R.kbg_hujayra = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.36, ry:-.72, rxMin:-.5, rxMax:1.2, zoom:1.0});
  const g = S.g;
  S.ren.localClippingEnabled = true;
  S.nomlar = {membrana:'Hujayra (plazmatik) membranasi', sitoplazma:'Sitoplazma', yadro:'Yadro', yadrocha:'Yadrocha', mitoxondriya:'Mitoxondriya', ribosoma:'Ribosoma', ept_donador:'Donador EPT (ribosomali)', ept_silliq:'Silliq EPT', golji:'Golji apparati', lizosoma:'Lizosoma', sentriola:'Sentriolalar (hujayra markazi)', devor:'Hujayra devori (sellyuloza)', vakuola:'Markaziy vakuola', xloroplast:'Xloroplast'};
  /* chorak kesim: x>0 va z>0 qism olib tashlanadi */
  const pAsl = [new T.Plane(new T.Vector3(-1, 0, 0), 0), new T.Plane(new T.Vector3(0, 0, -1), 0)];
  const pl = pAsl.map(p=>p.clone());
  let kesim = true;
  const kM = (m)=>{ m.clippingPlanes = pl; m.clipIntersection = true; m.side = T.DoubleSide; return m; };
  const rn = tasodif(21);
  const gH = new T.Group(), gO = new T.Group(); g.add(gH, gO);
  soya(S, 2.7, -2.35, .5);
  /* --- umumiy organoid yasovchilar --- */
  function mitoxondriya(uz, r){
    const m = new T.Group();
    const tash = new T.Mesh(kapsula(r, uz, 20), fmat('#f07f45', {transparent:true, opacity:.5, roughness:.35, depthWrite:false})); tash.rotation.z = Math.PI / 2; m.add(tash);
    const ich = new T.Mesh(kapsula(r * .8, uz * .9, 16), fmat('#ffb07a', {transparent:true, opacity:.55, roughness:.4})); ich.rotation.z = Math.PI / 2; m.add(ich);
    const krM = fmat('#ffd2a8', {roughness:.45});
    for(let i = 0; i < 6; i++){ const x = -uz / 2 + r * 1.1 + i * (uz - r * 2.2) / 5; const k = new T.Mesh(new T.BoxGeometry(.018, r * 1.1, r * 1.3), krM); k.position.set(x, (i % 2 ? 1 : -1) * r * .3, 0); m.add(k); }
    return nomla(m, 'mitoxondriya');
  }
  function golji(){
    const m = new T.Group(); const gm = fmat('#f2c14e', {roughness:.35});
    for(let i = 0; i < 5; i++){
      const w = .95 - i * .1, geo = new T.BoxGeometry(w, .045, .34, 16, 1, 4); const p = geo.attributes.position;
      for(let k = 0; k < p.count; k++){ const x = p.getX(k); p.setY(k, p.getY(k) + x * x * .55); }
      geo.computeVertexNormals(); const c = new T.Mesh(geo, gm); c.position.y = i * .085; m.add(c);
      [-1, 1].forEach(s=>{ const v = new T.Mesh(new T.SphereGeometry(.045, 12, 8), gm); v.position.set(s * (w / 2 + .07), i * .085 + (w / 2) * (w / 2) * .55 + .04, (rn() - .5) * .2); m.add(v); });
    }
    return nomla(m, 'golji');
  }
  function eptDonador(markaz, r0, burchak, soni){
    const m = new T.Group(); const em = fmat('#6f9fff', {transparent:true, opacity:.78, roughness:.35}); em.side = T.DoubleSide;
    const rb = [];
    for(let s = 0; s < soni; s++){
      const r = r0 + s * .14, geo = new T.PlaneGeometry(1, 1, 28, 6), p = geo.attributes.position;
      for(let k = 0; k < p.count; k++){ const u = p.getX(k) + .5, v = p.getY(k); const a = burchak[0] + u * (burchak[1] - burchak[0]); const rr = r + Math.sin(u * 18 + s) * .035; p.setXYZ(k, Math.cos(a) * rr, v * .55 + Math.sin(u * 9) * .05, Math.sin(a) * rr); if(k % 5 === 0) rb.push([Math.cos(a) * (rr + .03), v * .55 + Math.sin(u * 9) * .05, Math.sin(a) * (rr + .03)]); }
      geo.computeVertexNormals(); m.add(new T.Mesh(geo, em));
    }
    nomla(m, 'ept_donador');
    const ribo = sharlar(rb.length, .026, fmat('#2b3a9e', {roughness:.4})); rb.forEach((q, i)=>joyQoy(ribo, i, q[0], q[1], q[2])); ribo.userData.nom = 'ribosoma'; m.add(ribo);
    m.position.copy(markaz); return m;
  }
  function eptSilliq(markaz){
    const m = new T.Group(); const em = fmat('#8fd6ff', {roughness:.35});
    for(let i = 0; i < 5; i++){ const nuq = []; let p = new T.Vector3((rn() - .5) * .3, (rn() - .5) * .4, (rn() - .5) * .3); for(let k = 0; k < 6; k++){ nuq.push(p.clone()); p.add(new T.Vector3((rn() - .5) * .35, (rn() - .5) * .35, (rn() - .5) * .35)); } m.add(trubka(nuq, .035, em, 40)); }
    nomla(m, 'ept_silliq'); m.position.copy(markaz); return m;
  }
  function lizosoma(r){ const m = new T.Group(); const s = new T.Mesh(new T.SphereGeometry(r, 20, 14), fmat('#b06cf0', {transparent:true, opacity:.8, roughness:.3})); m.add(s); for(let i = 0; i < 5; i++){ const d = new T.Mesh(new T.SphereGeometry(r * .18, 8, 6), fmat('#5a2a8f')); d.position.set((rn() - .5) * r, (rn() - .5) * r, (rn() - .5) * r); m.add(d); } return nomla(m, 'lizosoma'); }
  function sentriola(){
    const m = new T.Group(); const sm = fmat('#e8e2ff', {roughness:.35});
    [0, 1].forEach(j=>{ const c = new T.Group(); for(let i = 0; i < 9; i++){ const a = i / 9 * 6.283; for(let t = 0; t < 3; t++){ const tb = new T.Mesh(new T.CylinderGeometry(.018, .018, .32, 8), sm); tb.position.set(Math.cos(a + t * .12) * (.09 + t * .02), 0, Math.sin(a + t * .12) * (.09 + t * .02)); c.add(tb); } } if(j) { c.rotation.z = Math.PI / 2; c.position.x = .26; } m.add(c); });
    return nomla(m, 'sentriola');
  }
  function yadro(r){
    const m = new T.Group();
    const q1 = new T.Mesh(new T.SphereGeometry(r, 48, 32), kM(fmat('#9c7be0', {roughness:.4, clearcoat:.4}))); q1.userData.nom = 'yadro'; m.add(q1);
    const q2 = new T.Mesh(new T.SphereGeometry(r * .94, 48, 32), kM(fmat('#c8b3f5', {roughness:.5}))); q2.material.side = T.BackSide; q2.userData.nom = 'yadro'; m.add(q2);
    const pr = fmat('#5e3fb0'); for(let i = 0; i < 40; i++){ const v = new T.Vector3(rn() - .5, rn() - .5, rn() - .5).normalize().multiplyScalar(r * 1.0); const t = new T.Mesh(new T.TorusGeometry(.04, .012, 6, 14), kM(pr.clone())); t.position.copy(v); t.lookAt(0, 0, 0); t.userData.nom = 'yadro'; m.add(t); }
    const xm = fmat('#6b3fc4', {roughness:.5});
    for(let i = 0; i < 7; i++){ const nuq = []; for(let k = 0; k < 7; k++) nuq.push(new T.Vector3(rn() - .5, rn() - .5, rn() - .5).multiplyScalar(r * 1.2)); const tb = trubka(nuq, .022, xm, 50); tb.userData.nom = 'yadro'; m.add(tb); }
    const yc = new T.Mesh(new T.SphereGeometry(r * .3, 32, 22), fmat('#3d2275', {roughness:.45})); yc.position.set(r * .25, r * .1, r * .3); yc.userData.nom = 'yadrocha'; m.add(yc);
    return m;
  }
  /* ================= HAYVON ================= */
  const RH = 2.15;
  const blobG = new T.SphereGeometry(RH, 96, 64); { const p = blobG.attributes.position, nz = shovqin2(3); for(let k = 0; k < p.count; k++){ const v = new T.Vector3(p.getX(k), p.getY(k), p.getZ(k)); const f = 1 + nz(v.x * .9 + v.z * .5 + 3, v.y * .9 - v.z * .6 + 7) * .05; v.multiplyScalar(f); v.y *= .9; p.setXYZ(k, v.x, v.y, v.z); } blobG.computeVertexNormals(); }
  const memH = new T.Mesh(blobG, kM(fmat('#f3a6b8', {roughness:.35, clearcoat:.7, transparent:true, opacity:.96}))); memH.userData.nom = 'membrana'; gH.add(memH);
  const sitH = new T.Mesh(blobG, kM(fmat('#fbe3e8', {roughness:.6}))); sitH.material.side = T.BackSide; sitH.scale.setScalar(.975); sitH.userData.nom = 'sitoplazma'; gH.add(sitH);
  const yH = yadro(.78); yH.position.set(-.05, .15, -.05); gH.add(yH);
  gH.add(eptDonador(new T.Vector3(-.05, .15, -.05), 1.0, [.15, 1.45], 3));
  const eS1 = eptSilliq(new T.Vector3(1.25, -.85, .55)); gH.add(eS1);
  const gJ = golji(); gJ.position.set(.75, .95, 1.0); gJ.rotation.set(.4, -.7, .2); gH.add(gJ);
  [[1.35, .1, .45, .2], [.45, -.9, 1.35, -.6], [1.55, .55, 1.05, .9], [.35, .55, 1.6, .3], [1.0, -1.25, .35, 1.1]].forEach(([x, y, z, a])=>{ const m = mitoxondriya(.62, .15); m.position.set(x, y, z); m.rotation.set(a, a * 1.3, a * .5); gH.add(m); });
  [[1.55, -.45, 1.0], [.9, .1, 1.55], [1.7, .75, .3]].forEach(([x, y, z])=>{ const l = lizosoma(.12); l.position.set(x, y, z); gH.add(l); });
  const sn = sentriola(); sn.position.set(.95, -.25, 1.0); sn.rotation.set(.3, .5, 0); gH.add(sn);
  const rbH = sharlar(160, .024, fmat('#2b3a9e', {roughness:.4})); { let i = 0; while(i < 160){ const v = new T.Vector3(rn() * 2, (rn() - .5) * 3.4, rn() * 2); if(v.length() < RH * .9 && v.distanceTo(yH.position) > .95){ joyQoy(rbH, i, v.x, v.y, v.z); i++; } } } rbH.userData.nom = 'ribosoma'; gH.add(rbH);
  /* ================= O‘SIMLIK ================= */
  const BW = 4.6, BH = 3.1, BD = 3.3;
  const qutiG = (w, h, d, r)=>T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, h, d, 6, r) : new T.BoxGeometry(w, h, d);
  const devT = new T.Mesh(qutiG(BW, BH, BD, .35), kM(fmat('#86b95a', {roughness:.75, clearcoat:.2}))); devT.userData.nom = 'devor'; gO.add(devT);
  const devI = new T.Mesh(qutiG(BW - .22, BH - .22, BD - .22, .3), kM(fmat('#b7dc8f', {roughness:.7}))); devI.material.side = T.BackSide; devI.userData.nom = 'devor'; gO.add(devI);
  const memO = new T.Mesh(qutiG(BW - .3, BH - .3, BD - .3, .28), kM(fmat('#f0d9a0', {roughness:.5, transparent:true, opacity:.35, depthWrite:false}))); memO.userData.nom = 'membrana'; gO.add(memO);
  const sitO = new T.Mesh(qutiG(BW - .34, BH - .34, BD - .34, .26), kM(fmat('#eef7df', {roughness:.6}))); sitO.material.side = T.BackSide; sitO.userData.nom = 'sitoplazma'; gO.add(sitO);
  const vakG = new T.SphereGeometry(1, 64, 40); { const p = vakG.attributes.position, nz = shovqin2(9); for(let k = 0; k < p.count; k++){ const x = p.getX(k), y = p.getY(k), z = p.getZ(k); const f = 1 + nz(x * 2 + 5, y * 2 + z) * .06; p.setXYZ(k, x * f, y * f, z * f); } vakG.computeVertexNormals(); }
  const vak = new T.Mesh(vakG, kM(fmat('#8fc9ff', {transparent:true, opacity:.45, roughness:.1, clearcoat:1, depthWrite:false}))); vak.scale.set(1.55, 1.05, 1.1); vak.position.set(-.35, -.05, -.2); vak.userData.nom = 'vakuola'; gO.add(vak);
  const yO = yadro(.55); yO.position.set(1.35, .6, .75); gO.add(yO);
  const xlT = kanvas(128, 64, (c)=>{ c.fillStyle = '#3a9a3a'; c.fillRect(0, 0, 128, 64); c.fillStyle = '#1f6b24'; for(let i = 0; i < 7; i++){ c.fillRect(8 + i * 17, 14 + (i % 2) * 6, 10, 30); } });
  const xlMat = new T.MeshStandardMaterial({map:xlT, roughness:.4}); xlMat.userData.env = 1; xlMat.emissive = new T.Color(0);
  [[1.9, 1.15, .4], [1.2, 1.2, 1.3], [.4, 1.2, 1.35], [1.95, -1.15, .6], [1.1, -1.2, 1.35], [.3, -1.18, .9], [1.95, 0, 1.2], [.6, .2, 1.45], [1.95, -.4, .2], [1.5, -.2, 1.45]].forEach(([x, y, z], i)=>{ const m = new T.Mesh(new T.SphereGeometry(1, 24, 16), xlMat); m.scale.set(.3, .13, .18); m.position.set(x, y, z); m.rotation.set(i * .7, i * 1.1, i * .3); m.userData.nom = 'xloroplast'; gO.add(m); });
  gO.add(eptDonador(new T.Vector3(1.35, .6, .75), .72, [.9, 2.4], 2));
  const gJO = golji(); gJO.position.set(1.4, -.55, 1.05); gJO.rotation.set(.3, -.8, .1); gJO.scale.setScalar(.8); gO.add(gJO);
  [[.85, -.85, 1.3, .4], [1.85, .55, 1.25, 1.2], [.2, .75, 1.4, -.5]].forEach(([x, y, z, a])=>{ const m = mitoxondriya(.5, .12); m.position.set(x, y, z); m.rotation.set(a, a * 1.3, 0); gO.add(m); });
  const eS2 = eptSilliq(new T.Vector3(1.8, -.75, .35)); eS2.scale.setScalar(.8); gO.add(eS2);
  const lO = lizosoma(.1); lO.position.set(.7, -1.1, .45); gO.add(lO);
  const rbO = sharlar(100, .022, fmat('#2b3a9e', {roughness:.4})); { let i = 0; while(i < 100){ const v = new T.Vector3(rn() * 2, (rn() - .5) * 2.6, rn() * 1.45); if(v.distanceTo(yO.position) > .7 && Math.hypot((v.x + .35) / 1.55, (v.y + .05) / 1.05, (v.z + .2) / 1.1) > 1.05){ joyQoy(rbO, i, v.x, v.y, v.z); i++; } } } rbO.userData.nom = 'ribosoma'; gO.add(rbO);
  /* yozuvlar */
  const yz = (gr, m, x, y, z, nom)=>{ const s = yozuv(m, {px:26, olcham:.105}); s.position.set(x, y, z); s.userData.nom = nom; gr.add(s); return s; };
  const yH1 = [yz(gH, 'Membrana', 1.9, 1.7, -.6, 'membrana'), yz(gH, 'Yadro', -.75, .95, .75, 'yadro'), yz(gH, 'Yadrocha', .3, .1, .75, 'yadrocha'), yz(gH, 'Donador EPT', -.6, .85, 1.35, 'ept_donador'), yz(gH, 'Golji apparati', 1.1, 1.6, 1.25, 'golji'), yz(gH, 'Mitoxondriya', 1.55, .15, 1.2, 'mitoxondriya'), yz(gH, 'Silliq EPT', 1.6, -1.25, .75, 'ept_silliq'), yz(gH, 'Lizosoma', 2.0, -.55, 1.3, 'lizosoma'), yz(gH, 'Sentriolalar', .95, -.55, 1.5, 'sentriola'), yz(gH, 'Ribosomalar', .3, -1.5, 1.2, 'ribosoma'), yz(gH, 'Sitoplazma', -1.2, -1.2, 1.2, 'sitoplazma')];
  const yO1 = [yz(gO, 'Hujayra devori', -1.6, 1.85, 1.0, 'devor'), yz(gO, 'Markaziy vakuola', -.3, .1, 1.0, 'vakuola'), yz(gO, 'Yadro', 1.35, 1.35, .9, 'yadro'), yz(gO, 'Xloroplast', 2.3, 1.45, .9, 'xloroplast'), yz(gO, 'Mitoxondriya', .3, -1.0, 1.9, 'mitoxondriya'), yz(gO, 'Golji apparati', 1.9, -.45, 1.75, 'golji'), yz(gO, 'Membrana', 2.45, .2, -.9, 'membrana'), yz(gO, 'Sitoplazma', .9, -1.4, 1.75, 'sitoplazma')];
  let yozuvlar = !S.test;
  /* holat */
  let tur = 'hayvon';
  function qoll(){
    gH.visible = tur === 'hayvon'; gO.visible = tur === 'osimlik';
    [...yH1, ...yO1].forEach(s=>s.visible = yozuvlar);
    S.tag.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('faol', b.dataset.k === tur));
    S.izoh.innerHTML = tur === 'hayvon'
      ? '<b>Hayvon hujayrasi.</b> Hujayra devori, xloroplast va katta markaziy vakuola yo‘q; sentriolalar bor. Organoidni bosing — ma’lumot kartasi chiqadi. <i>Sxematik model: o‘lchamlar nisbati haqiqiy emas.</i>'
      : '<b>O‘simlik hujayrasi.</b> Sellyulozali devor, xloroplastlar va katta markaziy vakuola bor; sentriolalar odatda yo‘q. <i>Sxematik model.</i>';
  }
  S.guruh('Hujayra', [['hayvon', 'Hayvon'], ['osimlik', 'O‘simlik']], tur, k=>{ tur = k; qoll(); hodisa('kbg-hujayra-tur', {hujayra:tur}); });
  S.ajr();
  const kb = S.tugma('Kesim', b=>{ kesim = !kesim; b.classList.toggle('faol', kesim); }); kb.classList.add('faol');
  const yb = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); qoll(); }); yb.classList.toggle('faol', yozuvlar);
  bosishUla(S, 'kbg_hujayra', 'kbg-hujayra', ()=>({hujayra:tur}));
  S.izohFn = n=>'<b>' + S.nomlar[n] + '.</b> ' + (tur === 'hayvon' ? 'Hayvon hujayrasi.' : 'O‘simlik hujayrasi.') + ' Batafsil — ma’lumot kartasida.';
  S.holat = h=>{
    if(!h) return;
    if(h.tur === 'hayvon' || h.tur === 'osimlik') tur = h.tur;
    if(h.kesim !== undefined){ kesim = !!h.kesim; kb.classList.toggle('faol', kesim); }
    qoll();
    if(h.organoid !== undefined){ S.ajrat(h.organoid); if(h.organoid && S.nomlar[h.organoid]) S.izoh.innerHTML = S.izohFn(h.organoid); }
  };
  const uzoq = new T.Plane(new T.Vector3(0, 0, -1), -99);
  kadrUla(S, ()=>{
    g.updateMatrixWorld();
    if(kesim) pl.forEach((p, i)=>p.copy(pAsl[i]).applyMatrix4(g.matrixWorld));
    else pl.forEach(p=>p.copy(uzoq));
  });
  S.joyla(3.35, new T.Vector3(0, -.25, 0));
  qoll();
  S.yorliq('Biologiya · hujayra tuzilishi (sxematik)');
  const yopA = S.yopish; S.yopish = ()=>{ S.ren.localClippingEnabled = false; yopA(); };
  return S;
};


/* ================= 5. BIOLOGIYA — DNK tuzilishi va replikatsiya ================= */
const DNK_RANG = {A:'#ff5d5d', T:'#ffd34d', G:'#4cd26b', C:'#4d8dff'};
const DNK_JUFT = {A:'T', T:'A', G:'C', C:'G'};
const DNK_NOM = {A:'Adenin (A)', T:'Timin (T)', G:'Guanin (G)', C:'Sitozin (C)'};
function tayoqQoy(m, a, b, r){ const d = new T.Vector3().subVectors(b, a); const L = d.length(); m.position.copy(a).addScaledVector(d, .5); m.scale.set(r || 1, Math.max(.0001, L), r || 1); if(L > 1e-6) m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.multiplyScalar(1 / L)); }

R.kbg_dnk = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.12, ry:0, rxMin:-.8, rxMax:.9, zoom:1.0});
  const g = S.g;
  S.nomlar = {A:'Adenin (A) — juftlashadi: T', T:'Timin (T) — juftlashadi: A', G:'Guanin (G) — juftlashadi: C', C:'Sitozin (C) — juftlashadi: G', fosfat:'Fosfat qoldig‘i', dezoksiriboza:'Dezoksiriboza (qand)', vodorod:'Vodorod bog‘lar', helikaza:'Helikaza fermenti', polimeraza:'DNK polimeraza', ona_zanjir:'Ona (andoza) zanjir', yangi_zanjir:'Yangi (qiz) zanjir'};
  const KET = 'ATGCGTACCTGAGCATTGCA'.split(''), N = KET.length;
  const RAD = 1.0, QAD = .34, BUR = 2 * Math.PI / 10.5, OFS = 2.45; // 1 birlik = 1 nm
  const Y0 = (N - 1) * QAD / 2;
  const gS = new T.Group(), gN = new T.Group(); g.add(gS, gN);
  soya(S, 2.2, -Y0 - .9, .45);
  /* materiallar */
  const fosM = fmat('#f2a93b', {roughness:.3}), qandM = fmat('#c9d3ea', {roughness:.35}), qandY = fmat('#bff3de', {roughness:.35});
  const bogOna = fmat('#9fb0d6', {roughness:.35, metalness:.2}), bogYangi = fmat('#62e0b8', {roughness:.35, metalness:.1});
  const asosM = {}; Object.keys(DNK_RANG).forEach(k=>asosM[k] = fmat(DNK_RANG[k], {roughness:.3, clearcoat:.5}));
  const vodM = nurli('#ffffff', .85);
  const silG = new T.CylinderGeometry(1, 1, 1, 14); silG.translate(0, 0, 0);
  const pentG = new T.CylinderGeometry(.13, .13, .06, 5);
  /* nukleotid yasash: {fos, qand, asos, bog} */
  function nukleotid(harf, yangi, zanjir){
    const n = {harf, yangi};
    n.fos = new T.Mesh(new T.SphereGeometry(.11, 18, 12), fosM); n.fos.userData.nom = 'fosfat';
    n.qand = new T.Mesh(pentG, yangi ? qandY : qandM); n.qand.userData.nom = 'dezoksiriboza';
    n.asos = new T.Mesh(silG, asosM[harf]); n.asos.userData = {nom:harf, juft:DNK_JUFT[harf]};
    n.bog = new T.Mesh(silG, yangi ? bogYangi : bogOna); n.bog.userData.nom = yangi ? 'yangi_zanjir' : 'ona_zanjir';
    n.harfS = yozuv(harf, {px:30, olcham:.13, fon:'rgba(8,10,20,.6)', rang:DNK_RANG[harf]});
    [n.fos, n.qand, n.asos, n.bog, n.harfS].forEach(m=>gS.add(m));
    n.p = new T.Vector3(); n.zanjir = zanjir; return n;
  }
  const S1 = KET.map(h=>nukleotid(h, false, 's1')), S2 = KET.map(h=>nukleotid(DNK_JUFT[h], false, 's2'));
  const N1 = KET.map(h=>nukleotid(DNK_JUFT[h], true, 'n1')), N2 = KET.map(h=>nukleotid(h, true, 'n2'));
  /* vodorod bog‘lari: har juft uchun uchta to‘plam (asl, chap qiz, o‘ng qiz) */
  function hbog(k){ const gr = new T.Group(); for(let i = 0; i < k; i++){ const m = new T.Mesh(silG, vodM); m.userData.nom = 'vodorod'; gr.add(m); } gS.add(gr); return gr; }
  const HB = KET.map(h=>({o:hbog(h === 'A' || h === 'T' ? 2 : 3), l:hbog(h === 'A' || h === 'T' ? 2 : 3), r:hbog(h === 'A' || h === 'T' ? 2 : 3)}));
  /* fermentlar */
  const hel = new T.Mesh(new T.TorusGeometry(.62, .2, 20, 48), fmat('#c77dff', {roughness:.3, clearcoat:.8, emissive:'#2a0a45'})); hel.rotation.x = Math.PI / 2; hel.userData.nom = 'helikaza'; gS.add(hel);
  const polG = new T.SphereGeometry(.5, 32, 22); { const p = polG.attributes.position, nz = shovqin2(4); for(let k = 0; k < p.count; k++){ const x = p.getX(k), y = p.getY(k), z = p.getZ(k); const f = 1 + nz(x * 3 + 2, y * 3 + z * 2) * .12; p.setXYZ(k, x * f * 1.1, y * f * .9, z * f); } polG.computeVertexNormals(); }
  const pol = [0, 1].map(()=>{ const m = new T.Mesh(polG, fmat('#4fc3c9', {transparent:true, opacity:.72, roughness:.4, depthWrite:false})); m.userData.nom = 'polimeraza'; gS.add(m); return m; });
  const yHel = yozuv('Helikaza', {px:26, olcham:.13}), yPol = yozuv('DNK polimeraza', {px:26, olcham:.13});
  const yOna = yozuv('ona zanjir', {px:24, olcham:.12, rang:'#c8d4f2'}), yYan = yozuv('yangi zanjir', {px:24, olcham:.12, rang:'#8ff0d0'});
  yOna.userData.nom = 'ona_zanjir'; yYan.userData.nom = 'yangi_zanjir';
  gS.add(yHel, yPol, yOna, yYan);
  const y53a = yozuv('5′', {px:28, olcham:.12, rang:'#aab4d8'}), y53b = yozuv('3′', {px:28, olcham:.12, rang:'#aab4d8'}), y53c = yozuv('3′', {px:28, olcham:.12, rang:'#aab4d8'}), y53d = yozuv('5′', {px:28, olcham:.12, rang:'#aab4d8'});
  gS.add(y53a, y53b, y53c, y53d);
  const oYoz = yozuv('d ≈ 2 nm · 10,5 juft/o‘ram · qadam ≈ 3,4 nm', {px:26, olcham:.13, rang:'#aab4d8'}); oYoz.position.set(0, -Y0 - 1.25, 0); gS.add(oYoz);
  /* ---------- NUKLEOTID (kattalashtirilgan) ---------- */
  const atomM = {C:fmat('#59627a', {roughness:.35}), O:fmat('#ff4b39', {roughness:.3}), N:fmat('#4a6dff', {roughness:.3}), P:fmat('#f2a93b', {roughness:.3}), H:fmat('#f2f6ff', {roughness:.3})};
  const atomR = {C:.2, O:.19, N:.19, P:.26, H:.12};
  function atom(e, x, y, z, nom){ const m = new T.Mesh(new T.SphereGeometry(atomR[e], 24, 16), atomM[e]); m.position.set(x, y, z || 0); m.userData.nom = nom; gN.add(m); return m.position; }
  const bogM = fmat('#c9cfdf', {roughness:.4});
  function bog(a, b, nom){ const m = new T.Mesh(silG, bogM); tayoqQoy(m, a, b, .055); m.userData.nom = nom; gN.add(m); }
  /* fosfat */
  const P = atom('P', -3.4, 1.3, 0, 'fosfat');
  const O1 = atom('O', -3.4, 2.05, 0, 'fosfat'), O2 = atom('O', -4.1, 1.0, .3, 'fosfat'), O3 = atom('O', -3.0, 1.0, -.6, 'fosfat'), O5 = atom('O', -2.7, .9, .35, 'fosfat');
  [O1, O2, O3, O5].forEach(o=>bog(P, o, 'fosfat'));
  /* dezoksiriboza: C5′–C4′, halqa C4′ O4′ C1′ C2′ C3′ */
  const C5 = atom('C', -2.0, .95, 0, 'dezoksiriboza'); bog(O5, C5, 'dezoksiriboza');
  const hq = [];
  for(let i = 0; i < 5; i++){ const a = Math.PI / 2 + i * 2 * Math.PI / 5 + .3; hq.push(new T.Vector3(-1.2 + Math.cos(a) * .72, -.1 + Math.sin(a) * .72, 0)); }
  const C4 = atom('C', hq[0].x, hq[0].y, 0, 'dezoksiriboza'), O4 = atom('O', hq[4].x, hq[4].y, 0, 'dezoksiriboza'), C1 = atom('C', hq[3].x, hq[3].y, 0, 'dezoksiriboza'), C2 = atom('C', hq[2].x, hq[2].y, 0, 'dezoksiriboza'), C3 = atom('C', hq[1].x, hq[1].y, 0, 'dezoksiriboza');
  bog(C5, C4, 'dezoksiriboza'); bog(C4, O4, 'dezoksiriboza'); bog(O4, C1, 'dezoksiriboza'); bog(C1, C2, 'dezoksiriboza'); bog(C2, C3, 'dezoksiriboza'); bog(C3, C4, 'dezoksiriboza');
  const O3p = atom('O', C3.x - .55, C3.y - .55, .2, 'dezoksiriboza'); bog(C3, O3p, 'dezoksiriboza');
  const H2 = atom('H', C2.x + .15, C2.y - .6, .3, 'dezoksiriboza'); bog(C2, H2, 'dezoksiriboza');
  /* adenin: purin (6 + 5 halqa) */
  const A0 = new T.Vector3(1.55, .0, 0);
  const olti = []; for(let i = 0; i < 6; i++){ const a = i * Math.PI / 3 + Math.PI / 6; olti.push(new T.Vector3(A0.x + .95 + Math.cos(a) * .7, A0.y + Math.sin(a) * .7, 0)); }
  const e1 = olti[2], e2 = olti[3];
  const besh = [e1, e2];
  const mid = e1.clone().add(e2).multiplyScalar(.5), yo = mid.clone().sub(new T.Vector3(A0.x + .95, A0.y, 0)).normalize();
  const ch = new T.Vector3(-yo.y, yo.x, 0);
  besh.push(mid.clone().addScaledVector(yo, 1.05).addScaledVector(ch, .0));
  const pb1 = e2.clone().addScaledVector(yo, .66).addScaledVector(ch, -.18), pb2 = e1.clone().addScaledVector(yo, .66).addScaledVector(ch, .18);
  const ELh = ['N', 'C', 'C', 'C', 'N', 'C'];
  const aH = olti.map((p, i)=>atom(ELh[i], p.x, p.y, 0, 'A'));
  const n9 = atom('N', pb1.x, pb1.y, 0, 'A'), c8 = atom('C', besh[2].x, besh[2].y, 0, 'A'), n7 = atom('N', pb2.x, pb2.y, 0, 'A');
  for(let i = 0; i < 6; i++) bog(aH[i], aH[(i + 1) % 6], 'A');
  bog(aH[3], n9, 'A'); bog(n9, c8, 'A'); bog(c8, n7, 'A'); bog(n7, aH[2], 'A');
  const c6 = olti[1], nhY = c6.clone().sub(new T.Vector3(A0.x + .95, A0.y, 0)).normalize(); const nh = atom('N', c6.x + nhY.x * .7, c6.y + nhY.y * .7, 0, 'A'); bog(aH[1], nh, 'A');
  bog(C1, n9, 'dezoksiriboza');
  /* guruh fonlari */
  const zona = (x, y, w, h, rangZ, nom)=>{ const m = new T.Mesh(new T.CircleGeometry(1, 48), new T.MeshBasicMaterial({color:rang(rangZ), transparent:true, opacity:.22, depthWrite:false})); m.material.userData.env = 1; m.scale.set(w, h, 1); m.position.set(x, y, -.45); m.userData.nom = nom; gN.add(m); };
  zona(-3.35, 1.4, 1.2, 1.1, '#f2a93b', 'fosfat'); zona(-1.45, .15, 1.35, 1.25, '#9fb0d6', 'dezoksiriboza'); zona(2.35, .1, 1.75, 1.25, DNK_RANG.A, 'A');
  const yN = (m, x, y, nom, r)=>{ const s = yozuv(m, {px:28, olcham:.16, rang:r}); s.position.set(x, y, .3); s.userData.nom = nom; gN.add(s); };
  yN('Fosfat qoldig‘i', -3.4, 2.9, 'fosfat', '#ffd08a'); yN('Dezoksiriboza (5 C)', -1.3, 1.7, 'dezoksiriboza', '#d6def5'); yN('Azotli asos: adenin (A)', 2.4, 1.75, 'A', '#ff9d9d');
  yN('Nukleotid = fosfat + qand + azotli asos', 0, -1.75, null, '#aab4d8');
  /* to‘rt asos namunasi */
  [['A', 2], ['G', 2], ['T', 1], ['C', 1]].forEach(([h, n], i)=>{
    const gr = new T.Group(); gr.position.set(-2.7 + i * 1.8, -2.75, 0);
    const hm = fmat(DNK_RANG[h], {roughness:.35});
    const hx = new T.Mesh(new T.CylinderGeometry(.34, .34, .12, 6), hm); hx.rotation.x = Math.PI / 2; hx.userData.nom = h; gr.add(hx);
    if(n === 2){ const pn = new T.Mesh(new T.CylinderGeometry(.28, .28, .12, 5), hm); pn.rotation.x = Math.PI / 2; pn.rotation.y = Math.PI / 2; pn.position.x = -.52; pn.userData.nom = h; gr.add(pn); }
    const y = yozuv(h + (n === 2 ? ' — purin' : ' — pirimidin'), {px:24, olcham:.12, rang:DNK_RANG[h]}); y.position.set(n === 2 ? -.25 : 0, -.6, 0); y.userData.nom = h; gr.add(y);
    gN.add(gr);
  });
  /* ---------- holat ---------- */
  let rejim = 'spiral', p = 0, belgi = true, avto = false, burch = 0;
  const hud = S.dom('kbg-hud');
  const va = new T.Vector3(), vb = new T.Vector3(), vm = new T.Vector3(), vd = new T.Vector3();
  function joy(i, zanjir, dx){ const a = i * BUR + burch + (zanjir === 2 ? OFS : 0); return new T.Vector3(Math.cos(a) * RAD + dx, Y0 - i * QAD, Math.sin(a) * RAD); }
  function nukQoy(n, pos, sherik, ko, i, arr){
    n.p.copy(pos);
    const ich = vm.copy(sherik).sub(pos); const L = ich.length(); ich.multiplyScalar(1 / L);
    n.qand.position.copy(pos).addScaledVector(ich, .14); n.qand.lookAt(n.qand.position.clone().add(new T.Vector3(0, 1, 0)));
    n.fos.position.copy(pos).addScaledVector(ich, -.08); n.fos.position.y += QAD / 2;
    const bosh = vb.copy(pos).addScaledVector(ich, .26), oxir = vd.copy(pos).addScaledVector(ich, L / 2 - .09);
    tayoqQoy(n.asos, bosh, oxir, .085);
    n.harfS.position.copy(pos).addScaledVector(ich, L * .3); n.harfS.position.y += .12;
    [n.fos, n.qand, n.asos, n.bog, n.harfS].forEach(m=>{ m.visible = ko; }); n.harfS.visible = ko && belgi;
    n.fos.scale.setScalar(ko ? 1 : .001);
  }
  function hbQoy(gr, a, b, ko){
    gr.visible = ko; if(!ko) return;
    const d = vm.copy(b).sub(a); const L = d.length(); d.multiplyScalar(1 / L);
    const o1 = a.clone().addScaledVector(d, L / 2 - .09), o2 = a.clone().addScaledVector(d, L / 2 + .09);
    const yon = new T.Vector3(0, 1, 0);
    gr.children.forEach((m, k)=>{ const s = (k - (gr.children.length - 1) / 2) * .045; tayoqQoy(m, o1.clone().addScaledVector(yon, s), o2.clone().addScaledVector(yon, s), .012); });
  }
  function bogla(arr, ko){ for(let i = 0; i < N; i++){ const n = arr[i]; if(i < N - 1 && ko[i] && ko[i + 1]){ n.bog.visible = true; tayoqQoy(n.bog, n.p, arr[i + 1].p, .045); } else n.bog.visible = false; } }
  function qur(){
    const rep = rejim === 'replikatsiya';
    const kf = rep ? p * (N + 1.5) : -1;
    const ko1 = [], ko2 = [], kn1 = [], kn2 = [];
    for(let i = 0; i < N; i++){
      const f = rep ? cl(kf - i, 0, 1) : 0;
      const d = rep ? 1.25 * silliq(f) + .06 * Math.max(0, kf - i - 1) : 0;
      const a1 = joy(i, 1, -d), a2 = joy(i, 2, d);
      if(!rep || f <= 0){
        nukQoy(S1[i], a1, a2, true); nukQoy(S2[i], a2, a1, true); nukQoy(N1[i], a1, a2, false); nukQoy(N2[i], a2, a1, false);
        hbQoy(HB[i].o, a1, a2, true); hbQoy(HB[i].l, a1, a2, false); hbQoy(HB[i].r, a1, a2, false);
        ko1.push(1); ko2.push(1); kn1.push(0); kn2.push(0);
      } else {
        const b1 = joy(i, 2, -d), b2 = joy(i, 1, d);           // yangi zanjirlar
        const k = silliq(cl((f - .35) / .65, 0, 1));
        const kel1 = b1.clone().add(new T.Vector3(-1.6 * (1 - k), .5 * (1 - k), 1.2 * (1 - k))), kel2 = b2.clone().add(new T.Vector3(1.6 * (1 - k), .5 * (1 - k), 1.2 * (1 - k)));
        nukQoy(S1[i], a1, b1, true); nukQoy(S2[i], a2, b2, true);
        nukQoy(N1[i], kel1, a1, f > .35); nukQoy(N2[i], kel2, a2, f > .35);
        hbQoy(HB[i].o, a1, a2, false); hbQoy(HB[i].l, a1, kel1, k > .95); hbQoy(HB[i].r, a2, kel2, k > .95);
        ko1.push(1); ko2.push(1); kn1.push(k > .95 ? 1 : 0); kn2.push(k > .95 ? 1 : 0);
      }
    }
    bogla(S1, ko1); bogla(S2, ko2); bogla(N1, kn1); bogla(N2, kn2);
    [S1, S2].forEach(arr=>arr.forEach(n=>n.bog.userData.nom = rep ? 'ona_zanjir' : null));
    /* fermentlar */
    const yf = Y0 - cl(kf, 0, N) * QAD + .1;
    hel.visible = rep && kf > -.5 && kf < N + .5; hel.position.set(0, yf, 0);
    pol.forEach((m, j)=>{ m.visible = hel.visible && kf > 1; m.position.set(j ? 1.45 : -1.45, yf + .75, .25); });
    yHel.visible = hel.visible; yHel.position.set(1.15, yf, .6); yPol.visible = pol[0].visible; yPol.position.set(-2.55, yf + 1.05, .3);
    yOna.visible = yYan.visible = rep && kf > 3; yOna.position.set(-2.9, Y0 - .2, 0); yYan.position.set(-.35, Y0 - .2, 0);
    y53a.position.copy(joy(0, 1, rep && kf > 0 ? -1.3 : 0)).add(new T.Vector3(0, .35, 0)); y53b.position.copy(joy(N - 1, 1, 0)).add(new T.Vector3(0, -.35, 0));
    y53c.position.copy(joy(0, 2, rep && kf > 0 ? 1.3 : 0)).add(new T.Vector3(0, .35, 0)); y53d.position.copy(joy(N - 1, 2, 0)).add(new T.Vector3(0, -.35, 0));
    [y53a, y53b, y53c, y53d].forEach(s=>s.visible = belgi);
  }
  function hudYoz(){
    hud.innerHTML = rejim === 'replikatsiya' ? '<div><i>Replikatsiya</i><b>' + Math.round(p * 100) + ' %</b></div><div><i>Juftlar</i><b>' + N + '</b></div>'
      : rejim === 'nukleotid' ? '<div><i>Nukleotid</i><b style="font-size:13px">dAMP (adenin)</b></div>'
      : '<div><i>Ketma-ketlik (5′→3′)</i><b style="font-size:12.5px;font-family:\'JetBrains Mono\',monospace">' + KET.join('') + '</b></div><div><i>A=T · G≡C</i><b style="font-size:13px">A ' + KET.filter(h=>h === 'A' || h === 'T').length + ' juft · G ' + KET.filter(h=>h === 'G' || h === 'C').length + ' juft</b></div>';
    S.izoh.innerHTML = rejim === 'replikatsiya'
      ? '<b>Replikatsiya (yarim konservativ).</b> Helikaza vodorod bog‘larni uzib, zanjirlarni ajratadi; DNK polimeraza har ona zanjirga komplementar nukleotidlarni qo‘shadi (A–T, G–C). Natijada ikkita bir xil molekula — har birida bitta ona va bitta yangi zanjir. <i>Sxematik: haqiqatda bir zanjir uzluksiz, ikkinchisi Okazaki bo‘laklari bilan sintezlanadi.</i>'
      : rejim === 'nukleotid' ? '<b>Nukleotid</b> uch qismdan iborat: fosfat qoldig‘i, dezoksiriboza (5 uglerodli qand) va azotli asos. A va G — purinlar (ikki halqa), T va C — pirimidinlar (bir halqa).'
      : '<b>DNK qo‘sh spirali</b> (B-shakl): ikki zanjir antiparallel (5′→3′ va 3′→5′), asoslar ichkarida juftlashadi: <b>A–T (2 vodorod bog‘)</b>, <b>G–C (3 vodorod bog‘)</b>. Asosni bosing — juftini ko‘rasiz.';
  }
  function yubor(){ hodisa('kbg-dnk-holat', {rejim, p:Math.round(p * 100) / 100}); }
  let slP = null, ab = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    S.guruh('Ko‘rinish', [['spiral', 'Qo‘sh spiral'], ['nukleotid', 'Nukleotid'], ['replikatsiya', 'Replikatsiya']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    if(rejim === 'replikatsiya'){
      S.ajr();
      slP = S.slayder('Jarayon', 0, 100, 1, Math.round(p * 100), v=>v + ' %', v=>{ p = v / 100; avto = false; if(ab) ab.classList.remove('faol'); qur(); hudYoz(); yubor(); });
      ab = S.tugma('Avto', b=>{ avto = !avto; if(avto && p >= 1) p = 0; b.classList.toggle('faol', avto); }); ab.classList.toggle('faol', avto);
    }
    S.ajr();
    const bb = S.tugma('Harflar', ()=>{ belgi = !belgi; bb.classList.toggle('faol', belgi); qur(); }); bb.classList.toggle('faol', belgi);
  }
  function qoll(){
    gS.visible = rejim !== 'nukleotid'; gN.visible = rejim === 'nukleotid';
    tagChiz(); qur(); hudYoz();
    if(rejim === 'nukleotid') S.fokus(4.4, new T.Vector3(-.4, -.75, 0), true);
    else if(rejim === 'replikatsiya') S.fokus(5.0, new T.Vector3(0, -.1, 0), true);
    else S.fokus(4.7, new T.Vector3(0, -.2, 0), true);
  }
  bosishUla(S, 'kbg_dnk', 'kbg-dnk', d=>({juft:d.juft || null}));
  S.izohFn = n=>DNK_JUFT[n] ? '<b>' + DNK_NOM[n] + '</b> — komplementar jufti: <b>' + DNK_NOM[DNK_JUFT[n]] + '</b>, ' + (n === 'A' || n === 'T' ? '2 ta' : '3 ta') + ' vodorod bog‘ bilan.' : '<b>' + S.nomlar[n] + '.</b>';
  S.holat = h=>{
    if(!h) return;
    if(['spiral', 'nukleotid', 'replikatsiya'].includes(h.rejim)) rejim = h.rejim;
    if(h.p !== undefined){ p = cl(+h.p, 0, 1); avto = false; }
    if(h.belgi !== undefined) belgi = !!h.belgi;
    qoll();
  };
  kadrUla(S, (dt, t)=>{
    if(!gS.visible) return;
    let yangi = false;
    if(rejim === 'spiral'){ burch += dt * .35; yangi = true; }
    if(rejim === 'replikatsiya' && avto){ p = Math.min(1, p + dt * .045); if(slP) slP.qoy(Math.round(p * 100), true); if(p >= 1){ avto = false; if(ab) ab.classList.remove('faol'); } hudYoz(); yangi = true; }
    if(yangi) qur();
    hel.rotation.z += dt * 2;
  });
  S.joyla(4.7, new T.Vector3(0, -.2, 0));
  qoll();
  S.yorliq('Biologiya · DNK: qo‘sh spiral va replikatsiya (sxematik)');
  return S;
};


/* ================= 6. GEOGRAFIYA — relyef va tog‘ hosil bo‘lishi (blok-diagramma) ================= */
/* qatlamli blok: chegaralar funksiyasi f(k, x, z) → y; har qatlam yon devori alohida mesh */
function qatlamBlok(gr, o){
  const {nx, nz, x0, x1, z0, z1, qat} = o, K = qat.length;
  const topG = new T.PlaneGeometry(1, 1, nx, nz); topG.rotateX(-Math.PI / 2);
  const rangA = new Float32Array(topG.attributes.position.count * 3); topG.setAttribute('color', new T.BufferAttribute(rangA, 3));
  const topM = new T.MeshStandardMaterial({vertexColors:true, roughness:.85, metalness:0, flatShading:false}); topM.userData.env = 1; topM.envMapIntensity = .5;
  const ust = new T.Mesh(topG, topM); gr.add(ust);
  /* yon devorlar: 4 tomon × K qatlam */
  const n = Math.max(nx, nz);
  const yon = qat.map(q=>{
    const cnt = 4 * (n + 1) * 2; const pos = new Float32Array(cnt * 3); const idx = [];
    for(let s = 0; s < 4; s++) for(let i = 0; i < n; i++){ const a = (s * (n + 1) + i) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setIndex(idx);
    const m = new T.Mesh(geo, q.mat); m.material.side = T.DoubleSide; m.userData.nom = q.nom; gr.add(m); return m;
  });
  const qirra = (s, u)=>{ /* tomon s bo‘yicha (x, z) */
    if(s === 0) return [x0 + (x1 - x0) * u, z1]; if(s === 1) return [x1, z1 - (z1 - z0) * u];
    if(s === 2) return [x1 - (x1 - x0) * u, z0]; return [x0, z0 + (z1 - z0) * u];
  };
  function yangila(f, rangF){
    const p = topG.attributes.position; const c = new T.Color();
    for(let j = 0; j <= nz; j++) for(let i = 0; i <= nx; i++){
      const k = j * (nx + 1) + i, x = x0 + i / nx * (x1 - x0), z = z0 + j / nz * (z1 - z0), y = f(0, x, z);
      p.setXYZ(k, x, y, z); rangF(x, z, y, c); rangA[k * 3] = c.r; rangA[k * 3 + 1] = c.g; rangA[k * 3 + 2] = c.b;
    }
    p.needsUpdate = true; topG.attributes.color.needsUpdate = true; topG.computeVertexNormals(); topG.computeBoundingSphere(); topG.computeBoundingBox();
    yon.forEach((m, q)=>{ const pp = m.geometry.attributes.position;
      for(let s = 0; s < 4; s++) for(let i = 0; i <= n; i++){ const [x, z] = qirra(s, i / n); const a = (s * (n + 1) + i) * 2; pp.setXYZ(a, x, f(q, x, z), z); pp.setXYZ(a + 1, x, f(q + 1, x, z), z); }
      pp.needsUpdate = true; m.geometry.computeVertexNormals(); m.geometry.computeBoundingSphere(); m.geometry.computeBoundingBox(); });
  }
  return {ust, yon, yangila};
}
/* gorizontallar (marching squares) → LineSegments pozitsiyalari */
function gorizontallar(H, nx, nz, x0, x1, z0, z1, oraliq, yF){
  const a = [], ind = [];
  const X = i=>x0 + i / nx * (x1 - x0), Z = j=>z0 + j / nz * (z1 - z0);
  let hmax = -1e9; for(let k = 0; k < H.length; k++) hmax = Math.max(hmax, H[k]);
  for(let L = oraliq; L < hmax; L += oraliq){
    const bosh = a.length, ak = Math.round(L / oraliq) % 5 === 0;
    for(let j = 0; j < nz; j++) for(let i = 0; i < nx; i++){
      const h00 = H[j * (nx + 1) + i], h10 = H[j * (nx + 1) + i + 1], h01 = H[(j + 1) * (nx + 1) + i], h11 = H[(j + 1) * (nx + 1) + i + 1];
      const nuq = [];
      const kes = (ha, hb, xa, za, xb, zb)=>{ if((ha < L) !== (hb < L)){ const t = (L - ha) / (hb - ha); nuq.push([xa + (xb - xa) * t, za + (zb - za) * t]); } };
      kes(h00, h10, X(i), Z(j), X(i + 1), Z(j)); kes(h10, h11, X(i + 1), Z(j), X(i + 1), Z(j + 1)); kes(h11, h01, X(i + 1), Z(j + 1), X(i), Z(j + 1)); kes(h01, h00, X(i), Z(j + 1), X(i), Z(j));
      for(let q = 0; q + 1 < nuq.length; q += 2){ a.push(nuq[q][0], yF(L) + .012, nuq[q][1], nuq[q + 1][0], yF(L) + .012, nuq[q + 1][1]); }
    }
    ind.push([bosh / 3, a.length / 3, ak, L]);
  }
  return {a, ind};
}

R.kbg_relyef = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.42, ry:-.5, rxMin:-.2, rxMax:1.45, zoom:1.0});
  const g = S.g;
  S.nomlar = {plita:'Litosfera plitasi (materik po‘sti)', antiklinal:'Antiklinal — yuqoriga bukilgan burma', sinklinal:'Sinklinal — pastga bukilgan burma', choqqi:'Cho‘qqi', qatlam:'Cho‘kindi tog‘ jinslari qatlamlari', astenosfera:'Astenosfera', okean_plita:'Okean plitasi', materik_plita:'Materik plitasi', novi:'Chuqur okean novi', vulqon:'Vulqon', magma:'Magma', vodiy:'Vodiy', gorizontal:'Gorizontal (bir xil balandlik chizig‘i)', tik:'Tik yonbag‘ir — gorizontallar zich', qiya:'Qiya (yotiq) yonbag‘ir — gorizontallar siyrak'};
  const gT = new T.Group(), gSb = new T.Group(), gG = new T.Group(); g.add(gT, gSb, gG);
  const nz2 = shovqin2(17), nz3 = shovqin2(29);
  const rn = tasodif(3);
  /* ================= TO‘QNASHUV ================= */
  const TQ = [
    {nom:'qatlam', rang:'#d9b36a', h:.22}, {nom:'qatlam', rang:'#b8614a', h:.22}, {nom:'qatlam', rang:'#7f9a7a', h:.22}, {nom:'qatlam', rang:'#cfc2a0', h:.22},
    {nom:'plita', rang:'#9a8f98', h:.9}, {nom:'plita', rang:'#626d5d', h:.5}, {nom:'astenosfera', rang:'#c4552e', h:.55}
  ];
  TQ.forEach(q=>q.mat = mat(q.rang, {roughness:.8}));
  const bazaT = [0]; TQ.forEach(q=>bazaT.push(bazaT[bazaT.length - 1] - q.h));
  let t = 1;
  const LAM = 1.6;
  const fold = x=>.5 * Math.exp(-((x / 2.3) ** 2)) * Math.cos(2 * Math.PI * x / LAM);
  const kot = x=>1.15 * Math.exp(-((x / 1.55) ** 2));
  function fT(k, x, z){
    const b = bazaT[k];
    if(k <= 4){ const nq = k === 0 ? .22 * nz2(x * 1.6 + 4, z * 1.6) * Math.exp(-((x / 1.9) ** 2)) + .05 * nz3(x * 4, z * 4) : 0; return b + t * (kot(x) + fold(x) * (1 - k * .12) + nq); }
    if(k === 5) return b - t * .95 * Math.exp(-((x / 1.4) ** 2)) + t * fold(x) * .3;
    if(k === 6) return b - t * .45 * Math.exp(-((x / 1.7) ** 2));
    return b - .05;
  }
  const bT = qatlamBlok(gT, {nx:140, nz:30, x0:-4.2, x1:4.2, z0:-1.4, z1:1.4, qat:TQ});
  bT.ust.userData.nom = 'qatlam';
  const cT = new T.Color();
  const rangTop = (x, z, y, c)=>{ const h = y; if(h > 1.35) c.set('#f1f4f8'); else if(h > .95) c.set('#8c7a6a'); else if(h > .45) c.set('#7c8a55'); else c.set('#6f9a4f'); c.lerp(cT.set('#d9b36a'), .08).convertSRGBToLinear(); };
  const strT = [strelka(new T.Vector3(-4.9, -.4, 0), new T.Vector3(-4.3, -.4, 0), null, {r:.07, mat:nurli('#ffcf5a')}), strelka(new T.Vector3(4.9, -.4, 0), new T.Vector3(4.3, -.4, 0), null, {r:.07, mat:nurli('#ffcf5a')})];
  strT.forEach(a=>gT.add(a));
  const Y = (gr, m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:26, olcham:.14}, o || {})); s.position.set(x, y, z); if(nom) s.userData.nom = nom; gr.add(s); return s; };
  const yT = [Y(gT, 'Plita harakati', -4.6, -.85, 0, null, {rang:'#ffe08a'}), Y(gT, 'Plita harakati', 4.6, -.85, 0, null, {rang:'#ffe08a'}),
    Y(gT, 'Antiklinal', 0, .6, 1.75, 'antiklinal'), Y(gT, 'Sinklinal', -.8, -.2, 1.75, 'sinklinal'), Y(gT, 'Cho‘qqi', 0, 2.35, 0, 'choqqi'),
    Y(gT, 'Cho‘kindi qatlamlar', -3.4, .5, 1.6, 'qatlam'), Y(gT, 'Materik po‘sti (plita)', -3.2, -1.35, 1.6, 'plita'), Y(gT, 'Astenosfera', -3.2, -2.55, 1.6, 'astenosfera')];
  /* ================= SUBDUKSIYA ================= */
  const D = 2.8;
  const okeanTepa = -.45, BUK = -.55, BURCH = .62;
  let tS = 1;
  function slabTepa(x){ if(x < BUK) return okeanTepa; const d = x - BUK; return okeanTepa - d * d * .35 - d * Math.tan(BURCH) * Math.min(1, d / 1.2); }
  function ekstr(nuq, m, nom){ const sh = new T.Shape(nuq.map(p=>new T.Vector2(p[0], p[1]))); const geo = new T.ExtrudeGeometry(sh, {depth:D, bevelEnabled:false, steps:1}); geo.translate(0, 0, -D / 2); const me = new T.Mesh(geo, m); me.userData.nom = nom; return me; }
  const okM = mat('#364457', {roughness:.8}), okM2 = mat('#56657a', {roughness:.8}), matM = mat('#9a8f98', {roughness:.8}), matM2 = mat('#6b8c52', {roughness:.85}), astM = mat('#c4552e', {roughness:.75, emissive:'#2a0800'});
  let slab = null, slabUst = null, mater = null, aste = null, aste2 = null, qopq = null;
  function subQur(){
    [slab, slabUst, mater, aste, aste2].forEach(m=>{ if(m){ gSb.remove(m); m.geometry.dispose(); } });
    const oxir = BUK + 1.2 + 3.2 * tS;               // plita uchi
    const qis = y=>Math.max(y, -3.4);
    const tepa = [], past = [];
    for(let x = -4.2; x <= Math.min(4.2, oxir) + 1e-6; x += .1) tepa.push([x, slabTepa(x)]);
    for(let i = tepa.length - 1; i >= 0; i--){ const [x, y] = tepa[i]; const eg = (slabTepa(x + .05) - slabTepa(x - .05)) / .1; past.push([x - (x < BUK ? 0 : Math.sin(Math.atan(-eg)) * .7), y - .7 * Math.cos(Math.atan(-eg))]); }
    slab = ekstr(tepa.concat(past).map(p=>[p[0], qis(p[1])]), okM, 'okean_plita'); gSb.add(slab);
    slabUst = ekstr(tepa.map(p=>[p[0], qis(p[1] + .06)]).concat(tepa.slice().reverse().map(p=>[p[0], qis(p[1] - .05)])), okM2, 'okean_plita'); gSb.add(slabUst);
    /* materik plitasi */
    const mt = []; const x0 = -.25;
    for(let x = x0; x <= 4.2 + 1e-6; x += .1){ const tog = .35 + .9 * Math.exp(-(((x - 1.7) / 1.1) ** 2)) + .1 * Math.sin(x * 3.1); mt.push([x, x < x0 + .2 ? .05 + (x - x0) * 1.2 : tog]); }
    const mp = []; for(let x = 4.2; x >= x0 - 1e-6; x -= .1){ const sy = x <= oxir ? slabTepa(x) + .02 : -2.2; mp.push([x, Math.min(Math.max(sy, -2.2), -.02)]); }
    mater = ekstr(mt.concat(mp), matM, 'materik_plita'); gSb.add(mater);
    if(qopq){ gSb.remove(qopq); qopq.geometry.dispose(); }
    qopq = ekstr(mt.map(p=>[p[0], p[1] + .015]).concat(mt.slice().reverse().map(p=>[p[0], p[1] - .14])), matM2, 'materik_plita'); gSb.add(qopq);
    /* astenosfera: plitalar ostida + mantiya xanjari */
    const at = []; for(let x = -4.2; x <= 4.2 + 1e-6; x += .1){ const y = x <= oxir ? Math.min(-1.15, slabTepa(x) - .72) : -2.2; at.push([x, qis(y)]); }
    aste = ekstr(at.concat([[4.2, -3.45], [-4.2, -3.45]]), astM, 'astenosfera'); gSb.add(aste);
    const xan = []; let xc = null; for(let x = -.2; x <= Math.min(4.2, oxir) + 1e-6; x += .1){ if(slabTepa(x) < -2.25){ if(xc === null) xc = x; xan.push([x, qis(slabTepa(x))]); } }
    aste2 = null;
    if(xan.length > 1){ const ust = xan.map(p=>[p[0], -2.2]); const xE = xan[xan.length - 1][0]; if(xE < 4.19){ ust.push([4.2, -2.2]); xan.push([4.2, -2.2]); } aste2 = ekstr(ust.concat(xan.slice().reverse()), astM, 'astenosfera'); gSb.add(aste2); }
    vulqon.scale.y = .25 + .75 * tS; vulqon.position.y = 1.1;
  }
  const suvM = new T.MeshPhysicalMaterial({color:rang('#2d6fb3'), transparent:true, opacity:.5, roughness:.15, clearcoat:1, depthWrite:false}); suvM.userData.env = 1;
  const suv = new T.Mesh(new T.BoxGeometry(3.95, .5, D), suvM); suv.position.set(-2.27, okeanTepa + .25, 0); suv.raycast = ()=>{}; gSb.add(suv);
  const novi = new T.Mesh(new T.BoxGeometry(.5, .55, D * 1.001), new T.MeshBasicMaterial({color:rang('#0a1a33'), transparent:true, opacity:.35, depthWrite:false})); novi.material.userData.env = 1; novi.position.set(-.35, okeanTepa - .05, 0); novi.userData.nom = 'novi'; gSb.add(novi);
  const vPr = [[0, 0], [.95, 0], [.6, .45], [.28, .9], [.14, 1.0], [.1, .92], [0, .9]].map(p=>new T.Vector2(p[0], p[1]));
  const vulqon = new T.Mesh(new T.LatheGeometry(vPr, 40), mat('#5b4a44', {roughness:.85})); vulqon.position.set(1.7, 1.12, 0); vulqon.userData.nom = 'vulqon'; gSb.add(vulqon);
  const kraterN = new T.Mesh(new T.CircleGeometry(.12, 20), nurli('#ff7a2a')); kraterN.rotation.x = -Math.PI / 2; kraterN.position.set(0, .905, 0); kraterN.userData.nom = 'magma'; vulqon.add(kraterN);
  const magM = fmat('#ff6a1a', {emissive:'#ff4a00', roughness:.35});
  const kamera = new T.Mesh(new T.SphereGeometry(.4, 24, 16), magM); kamera.scale.set(1.3, .6, 1); kamera.position.set(1.7, -.75, D / 2 + .02); kamera.scale.z = .15; kamera.userData.nom = 'magma'; gSb.add(kamera);
  const tomchiM = []; for(let i = 0; i < 9; i++){ const m = new T.Mesh(new T.SphereGeometry(.1 + rn() * .06, 16, 10), magM); m.userData.nom = 'magma'; m.userData.u = i / 9; gSb.add(m); tomchiM.push(m); }
  const ZF = D / 2 + .03; const magYol = new T.CatmullRomCurve3([new T.Vector3(2.35, -2.05, ZF), new T.Vector3(2.1, -1.5, ZF), new T.Vector3(1.85, -1.0, ZF), new T.Vector3(1.7, -.75, ZF), new T.Vector3(1.7, .3, ZF), new T.Vector3(1.7, 1.05, ZF), new T.Vector3(1.7, 1.2, .9), new T.Vector3(1.7, 1.95, 0)]);
  const kanal = new T.Mesh(new T.TubeGeometry(magYol, 60, .05, 10, false), magM); kanal.userData.nom = 'magma'; gSb.add(kanal);
  const strS = strelka(new T.Vector3(-4.0, okeanTepa + .35, 1.55), new T.Vector3(-2.6, okeanTepa + .35, 1.55), null, {r:.06, mat:nurli('#ffcf5a')}); gSb.add(strS);
  const yS = [Y(gSb, 'Okean plitasi', -3.2, -1.0, 1.6, 'okean_plita'), Y(gSb, 'Materik plitasi', 3.3, -.4, 1.6, 'materik_plita'), Y(gSb, 'Chuqur novi', -.35, .35, 1.5, 'novi'), Y(gSb, 'Vulqon', 1.7, 2.45, 0, 'vulqon'), Y(gSb, 'Magma', 2.75, -1.35, 1.6, 'magma'), Y(gSb, 'Astenosfera', 0, -3.0, 1.6, 'astenosfera'), Y(gSb, 'Okean', -2.6, .25, 0, null, {rang:'#9cd0ff'})];
  /* ================= GORIZONTALLAR ================= */
  const GX0 = -3.6, GX1 = 3.6, GZ0 = -2.3, GZ1 = 2.3, GNX = 150, GNZ = 96, VK = 1.45 / 2500;
  const cho = [[-.9, -.35, 2400, .95, 1.25, 2.2], [1.7, .7, 1700, .9, .8, 1]];   // x, z, h, sx_w, sx_e, sz
  const vodiyZ = x=>.9 * Math.sin(x * .8 + .6) - .2;
  function Hm(x, z){
    let h = 260;
    cho.forEach(([cx, cz, ch, sw, se, sz])=>{ const dx = x - cx, sx = dx < 0 ? sw : se * (cx < 0 ? .42 : 1); h += ch * Math.exp(-((dx / sx) ** 2 + ((z - cz) / sz) ** 2)); });
    h -= 220 * Math.exp(-(((z - vodiyZ(x)) / .35) ** 2)) * (x > .2 ? 1 : .4);
    h += 70 * nz2(x * 1.4 + 9, z * 1.4 + 2) + 25 * nz3(x * 3.5, z * 3.5);
    return Math.max(40, h);
  }
  const GQ = [{nom:'qiya', rang:'#8a6a4a', h:.25}, {nom:'qiya', rang:'#6b5642', h:.35}];
  GQ.forEach(q=>q.mat = mat(q.rang, {roughness:.9}));
  const bG = qatlamBlok(gG, {nx:GNX, nz:GNZ, x0:GX0, x1:GX1, z0:GZ0, z1:GZ1, qat:GQ});
  bG.ust.userData.nom = 'gorizontal_ust';
  const HG = new Float32Array((GNX + 1) * (GNZ + 1));
  for(let j = 0; j <= GNZ; j++) for(let i = 0; i <= GNX; i++) HG[j * (GNX + 1) + i] = Hm(GX0 + i / GNX * (GX1 - GX0), GZ0 + j / GNZ * (GZ1 - GZ0));
  const fG = (k, x, z)=>k === 0 ? Hm(x, z) * VK : k === 1 ? -.25 : -.6;
  const GIPS = [[0, '#3f8f4a'], [400, '#7fb15a'], [900, '#d8c96a'], [1400, '#d19a55'], [1900, '#a8704c'], [2250, '#e9edf2']];
  const rangG = (x, z, y, c)=>{ const h = y / VK; let a = GIPS[0], b = GIPS[GIPS.length - 1]; for(let i = 1; i < GIPS.length; i++){ if(h <= GIPS[i][0]){ a = GIPS[i - 1]; b = GIPS[i]; break; } } const tt = b === a ? 0 : cl((h - a[0]) / (b[0] - a[0]), 0, 1); c.set(a[1]).lerp(cT.set(b[1]), tt).convertSRGBToLinear(); };
  bG.yangila(fG, rangG);
  const daryoNuq = []; for(let x = .1; x <= GX1; x += .1) daryoNuq.push(new T.Vector3(x, Hm(x, vodiyZ(x)) * VK + .02, vodiyZ(x)));
  const daryo = trubka(daryoNuq, .035, nurli('#4aa3ff'), 80); daryo.userData.nom = 'vodiy'; gG.add(daryo);
  const gorM = new T.LineBasicMaterial({color:0x3a2412, transparent:true, opacity:.75}); gorM.userData.env = 1;
  const gorM2 = new T.LineBasicMaterial({color:0x1a0c04, transparent:true, opacity:.95}); gorM2.userData.env = 1;
  let gorL = null, gorL2 = null, gorYoz = [];
  let oraliq = 200, yuqoridan = false, qiyA = 0;
  function gorQur(){
    [gorL, gorL2].forEach(l=>{ if(l){ gG.remove(l); l.geometry.dispose(); } }); gorYoz.forEach(s=>{ gG.remove(s); s.material.map.dispose(); s.material.dispose(); }); gorYoz = [];
    const r = gorizontallar(HG, GNX, GNZ, GX0, GX1, GZ0, GZ1, oraliq, L=>L * VK);
    const oddiy = [], qalin = [];
    r.ind.forEach(([a, b, ak, L])=>{ const arr = (ak || oraliq === 500) ? qalin : oddiy; for(let k = a * 3; k < b * 3; k++) arr.push(r.a[k]);
      if((ak || oraliq === 500) && b > a){ const m = Math.floor((a + b) / 2 / 2) * 2 * 3; const s = yozuv(String(L), {px:24, olcham:.1, fon:'rgba(250,245,235,.82)', rang:'#3a2412', pad:6, chuqur:true}); s.position.set(r.a[m], r.a[m + 1] + .1, r.a[m + 2]); gG.add(s); gorYoz.push(s); } });
    const g1 = new T.BufferGeometry(); g1.setAttribute('position', new T.Float32BufferAttribute(oddiy, 3)); gorL = new T.LineSegments(g1, gorM); gorL.raycast = ()=>{}; gG.add(gorL);
    const g2 = new T.BufferGeometry(); g2.setAttribute('position', new T.Float32BufferAttribute(qalin, 3)); gorL2 = new T.LineSegments(g2, gorM2); gorL2.raycast = ()=>{}; gG.add(gorL2);
  }
  const yG = [Y(gG, 'Cho‘qqi · 2 400 m (sxematik)', -.9, 2.05, -.35, 'choqqi'), Y(gG, 'Vodiy', 2.6, .55, vodiyZ(2.6), 'vodiy'), Y(gG, 'Tik yonbag‘ir', -.1, 1.35, -1.6, 'tik'), Y(gG, 'Qiya yonbag‘ir', -2.6, .95, .9, 'qiya')];
  const shimol = Y(gG, 'Sh ↑', GX1 - .25, .15, GZ0 - .15, null, {rang:'#ffe08a'});
  /* ---------- nuqtani aniqlash (bosilgan joy) ---------- */
  let pX = 0, pY = 0; S.el.addEventListener('pointerdown', e=>{ pX = e.clientX; pY = e.clientY; });
  const ray = new T.Raycaster(), v2 = new T.Vector2();
  function nuqta(obs){ const r = S.el.getBoundingClientRect(); v2.set((pX - r.left) / r.width * 2 - 1, -(pY - r.top) / r.height * 2 + 1); ray.setFromCamera(v2, S.cam); const h = ray.intersectObjects(obs, false); return h.length ? h[0].point.clone() : null; }
  function tasnif(nom, gr, obs){
    const p = nuqta(obs); if(!p) return nom; gr.worldToLocal(p);
    if(rejim === 'toqnash' && (nom === 'qatlam') && t > .3){
      const x = p.x, w = Math.exp(-((x / 2.3) ** 2)), c = Math.cos(2 * Math.PI * x / LAM) * w;
      if(Math.abs(x) < .45 && p.y > fT(0, x, p.z) - .08 && t > .6) return 'choqqi';
      if(c > .35) return 'antiklinal'; if(c < -.35) return 'sinklinal';
    }
    if(rejim === 'gorizontal' && nom === 'gorizontal_ust'){
      const h = Hm(p.x, p.z), e = .05; const gx = (Hm(p.x + e, p.z) - Hm(p.x - e, p.z)) / (2 * e), gz = (Hm(p.x, p.z + e) - Hm(p.x, p.z - e)) / (2 * e); const qiyalik = Math.hypot(gx, gz);
      if(h > 2150) return 'choqqi';
      const qol = h % oraliq; if(Math.min(qol, oraliq - qol) < oraliq * .06) return 'gorizontal';
      if(Math.abs(p.z - vodiyZ(p.x)) < .3 && p.x > .1 && h < 900) return 'vodiy';
      return qiyalik > 1150 ? 'tik' : qiyalik < 650 ? 'qiya' : (qiyalik > 900 ? 'tik' : 'qiya');
    }
    return nom === 'gorizontal_ust' ? 'qiya' : nom;
  }
  /* ---------- holat ---------- */
  let rejim = 'toqnash', avto = false, yozuvlar = !S.test;
  const hud = S.dom('kbg-hud');
  function qurT(){ bT.yangila(fT, rangTop); }
  function hudYoz(){
    hud.innerHTML = rejim === 'gorizontal' ? '<div><i>Gorizontallar oralig‘i</i><b>' + oraliq + ' m</b></div><div><i>Eng baland nuqta</i><b>≈ 2 400 m</b></div>'
      : '<div><i>' + (rejim === 'toqnash' ? 'To‘qnashuv' : 'Subduksiya') + '</i><b>' + Math.round((rejim === 'toqnash' ? t : tS) * 100) + ' %</b></div><div><i>Vaqt (sxematik)</i><b style="font-size:13px">' + (rejim === 'toqnash' ? '≈ ' + Math.round(t * 50) + ' mln yil' : 'mln yillar') + '</b></div>';
    S.izoh.innerHTML = rejim === 'toqnash'
      ? '<b>Materik plitalari to‘qnashuvi.</b> Ikki plita bir-biriga siljiydi (yiliga bir necha sm), cho‘kindi qatlamlar siqilib <b>burmalanadi</b>: yuqoriga bukilgani — antiklinal, pastga — sinklinal. Po‘st qalinlashadi, burmali tog‘lar ko‘tariladi (masalan, Himolay). <i>Sxematik model.</i>'
      : rejim === 'subduksiya' ? '<b>Subduksiya.</b> Og‘irroq okean plitasi materik plitasi ostiga botadi: chegarada <b>chuqur novi</b> hosil bo‘ladi, chuqurlikda jinslar eriydi, <b>magma</b> ko‘tarilib vulqonli tog‘lar yuzaga keladi (masalan, And tog‘lari). <i>Sxematik model.</i>'
      : '<b>Gorizontallar</b> — bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziqlar. Oraliq: <b>' + oraliq + ' m</b>. Chiziqlar zich joy — <b>tik</b> yonbag‘ir, siyrak joy — <b>qiya</b>. Qalin chiziqlar — har ' + (oraliq === 500 ? '500' : oraliq * 5) + ' m. <i>Sxematik relyef.</i>';
  }
  function yubor(){ hodisa('kbg-relyef-holat', {rejim, t:Math.round((rejim === 'subduksiya' ? tS : t) * 100) / 100, oraliq, yuqoridan}); }
  let slT = null, ab = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    S.guruh('Jarayon', [['toqnash', 'Plitalar to‘qnashuvi'], ['subduksiya', 'Subduksiya'], ['gorizontal', 'Gorizontallar']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    S.ajr();
    if(rejim !== 'gorizontal'){
      const q = rejim === 'toqnash' ? t : tS;
      slT = S.slayder('Vaqt', 0, 100, 1, Math.round(q * 100), v=>v + ' %', v=>{ if(rejim === 'toqnash'){ t = v / 100; qurT(); } else { tS = v / 100; subQur(); } avto = false; if(ab) ab.classList.remove('faol'); hudYoz(); yubor(); });
      ab = S.tugma('Avto', b=>{ avto = !avto; if(avto){ if(rejim === 'toqnash' && t >= 1) t = 0; if(rejim === 'subduksiya' && tS >= 1) tS = 0; } b.classList.toggle('faol', avto); }); ab.classList.toggle('faol', avto);
    } else {
      const og = S.guruh('Oraliq', [['100', '100 m'], ['200', '200 m'], ['500', '500 m']], String(oraliq), k=>{ oraliq = +k; og.faol(k); gorQur(); hudYoz(); yubor(); });
      const yb = S.tugma(yuqoridan ? '3D ko‘rinish' : 'Yuqoridan (xarita)', b=>{ yuqoridan = !yuqoridan; b.textContent = yuqoridan ? '3D ko‘rinish' : 'Yuqoridan (xarita)'; hudYoz(); yubor(); });
    }
    S.ajr();
    const yz = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); yozQoll(); }); yz.classList.toggle('faol', yozuvlar);
  }
  function yozQoll(){ [...yT, ...yS, ...yG].forEach(s=>s.visible = yozuvlar); }
  function qoll(){
    gT.visible = rejim === 'toqnash'; gSb.visible = rejim === 'subduksiya'; gG.visible = rejim === 'gorizontal';
    if(rejim === 'gorizontal' && !gorL) gorQur();
    if(rejim !== 'gorizontal') yuqoridan = false;
    tagChiz(); hudYoz(); yozQoll();
    S.fokus(rejim === 'gorizontal' ? 3.9 : 4.7, new T.Vector3(0, rejim === 'gorizontal' ? .2 : -.95, 0), true);
  }
  bosishUla(S, 'kbg_relyef', 'kbg-relyef', ()=>({rejim}));
  const bosA = S.bosish;
  S.bosish = d=>{
    if(!d || !d.nom) return;
    let nom = d.nom;
    if(nom === 'qatlam' && gT.visible) nom = tasnif(nom, gT, [bT.ust, ...bT.yon]);
    else if(nom === 'gorizontal_ust') nom = tasnif(nom, gG, [bG.ust]);
    bosA({nom});
  };
  S.holat = h=>{
    if(!h) return;
    if(['toqnash', 'subduksiya', 'gorizontal'].includes(h.rejim)) rejim = h.rejim;
    if(h.t !== undefined){ const v = cl(+h.t, 0, 1); if(rejim === 'subduksiya') tS = v; else t = v; avto = false; }
    if(h.oraliq && [100, 200, 500].includes(+h.oraliq)){ oraliq = +h.oraliq; if(gorL) gorQur(); }
    if(h.yuqoridan !== undefined) yuqoridan = !!h.yuqoridan && rejim === 'gorizontal';
    qurT(); subQur(); qoll();
  };
  kadrUla(S, (dt, tt)=>{
    /* v3.15: avto rejimda geometriya ~15 marta/s qayta quriladi (zaif kompyuter) */
    S._avtoV = (S._avtoV || 0) + dt; const qayta = S._avtoV > .066; if(qayta) S._avtoV = 0;
    if(avto){
      if(rejim === 'toqnash'){ t = Math.min(1, t + dt * .08); if(qayta || t >= 1) qurT(); if(slT) slT.qoy(Math.round(t * 100), true); if(t >= 1){ avto = false; if(ab) ab.classList.remove('faol'); } }
      else if(rejim === 'subduksiya'){ tS = Math.min(1, tS + dt * .08); if(qayta || tS >= 1) subQur(); if(slT) slT.qoy(Math.round(tS * 100), true); if(tS >= 1){ avto = false; if(ab) ab.classList.remove('faol'); } }
      if(qayta) hudYoz();
    }
    if(gSb.visible){ tomchiM.forEach(m=>{ m.userData.u = (m.userData.u + dt * .12) % 1; m.position.copy(magYol.getPointAt(m.userData.u)); const s = .6 + .4 * Math.sin(m.userData.u * Math.PI); m.scale.setScalar(s); m.visible = tS > .3; }); magM.emissiveIntensity = .7 + .3 * Math.sin(tt * 3); kamera.visible = kanal.visible = tS > .3; }
    qiyA += ((yuqoridan ? Math.PI / 2 - .42 : 0) - qiyA) * Math.min(1, dt * 4); gG.rotation.x = qiyA;
    strT[0].position.x = -4.9 + .15 * Math.sin(tt * 2); strT[1].position.x = 4.9 - .15 * Math.sin(tt * 2);
  });
  qurT(); subQur();
  if(S.test) yozuvlar = false;
  S.joyla(4.7, new T.Vector3(0, -.95, 0));
  qoll();
  S.yorliq('Geografiya · relyef va tog‘ hosil bo‘lishi (sxematik blok-diagramma)');
  return S;
};


/* ================= 7. GEOGRAFIYA — vulqon va zilzila (kesilgan model) ================= */
/* kesim yuzasi uchun: shakl geometriyasiga dunyo koordinatasidan UV */
function uvQoy(geo, x0, x1, y0, y1){
  const p = geo.attributes.position, uv = new Float32Array(p.count * 2);
  for(let i = 0; i < p.count; i++){ uv[i * 2] = (p.getX(i) - x0) / (x1 - x0); uv[i * 2 + 1] = (p.getY(i) - y0) / (y1 - y0); }
  geo.setAttribute('uv', new T.BufferAttribute(uv, 2)); return geo;
}
const kesMasofa = (px, py, ax, ay, bx, by)=>{ const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy; const t = L ? cl(((px - ax) * dx + (py - ay) * dy) / L, 0, 1) : 0; return Math.hypot(px - ax - dx * t, py - ay - dy * t); };

R.kbg_vulqon = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.3, ry:-.42, rxMin:-.25, rxMax:1.3, zoom:1.0});
  const g = S.g;
  S.nomlar = {magma_ochogi:'Magma o‘chog‘i', jerlo:'Bosh jerlo (magma kanali)', krater:'Krater', konus:'Vulqon konusi', lava:'Lava (qotgan lava qatlami / oqimi)', kul:'Vulqon kuli va piroklastlar', yon_krater:'Yon (parazit) krater', dayka:'Dayka — yoriqda qotgan magma',
    gipotsentr:'Gipotsentr (zilzila o‘chog‘i)', epitsentr:'Epitsentr', yoriq:'Tektonik yoriq (uzilma)', p_tolqin:'P-to‘lqin (bo‘ylama)', s_tolqin:'S-to‘lqin (ko‘ndalang)', sirt_tolqin:'Sirt to‘lqinlari', seysmograf:'Seysmograf stansiyasi'};
  const gV = new T.Group(), gZ = new T.Group(); g.add(gV, gZ);
  const nz = shovqin2(41), rn = tasodif(7);
  const Y = (gr, m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:26, olcham:.14}, o || {})); s.position.set(x, y, z); if(nom) s.userData.nom = nom; gr.add(s); return s; };

  /* ================= VULQON ================= */
  const RB = 2.6, RT = .38, HT = 2.0, KT = 1.75;
  const rP = y=>RT + (RB - RT) * Math.pow(1 - y / HT, 1.6);
  const X0 = -3.6, X1 = 3.6, Y0 = -2.4, Y1 = 2.2, BZ = 3.0;
  /* profil (tashqi → krater ichi) */
  const prof = [];
  for(let i = 0; i <= 40; i++){ const y = HT * i / 40; prof.push(new T.Vector2(rP(y), y)); }
  prof.push(new T.Vector2(.26, 1.88), new T.Vector2(.14, KT), new T.Vector2(0.001, KT));
  const konG = new T.LatheGeometry(prof, 96, Math.PI / 2, Math.PI);
  { const p = konG.attributes.position, c = new Float32Array(p.count * 3), col = new T.Color(), c2 = new T.Color();
    for(let i = 0; i < p.count; i++){
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z), f = Math.atan2(x, z);
      const w = Math.max(0, Math.sin(f < 0 ? f + Math.PI * 2 - Math.PI / 2 : f - Math.PI / 2));
      const ichki = y > KT - .01 && r < RT - .02;
      if(!ichki && r > .05){ const k = 1 + w * (.045 * nz(f * 9, y * 3.2) + .02 * nz(f * 30, y * 9)); p.setX(i, x * k); p.setZ(i, z * k); }
      const n = .5 + .5 * nz(f * 14 + 3, y * 5);
      if(ichki) col.set('#2a1712'); else if(y > 1.58) col.set('#e9edf2').lerp(c2.set('#6d625c'), n * .45);
      else if(y > .9) col.set('#4d3f3a').lerp(c2.set('#6e5a4c'), n);
      else if(y > .3) col.set('#5a4a3e').lerp(c2.set('#6f6a45'), n);
      else col.set('#5c6b3c').lerp(c2.set('#7a6a4a'), n);
      col.convertSRGBToLinear(); c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    konG.setAttribute('color', new T.BufferAttribute(c, 3)); konG.computeVertexNormals(); }
  const konM = new T.MeshStandardMaterial({vertexColors:true, roughness:.92, metalness:0}); konM.userData.env = 1; konM.envMapIntensity = .5;
  const konus = new T.Mesh(konG, konM); konus.userData.nom = 'konus'; gV.add(konus);
  /* yer bloki (orqa yarmi) */
  const yerM = [mat('#5a4636', {roughness:.9}), mat('#5a4636', {roughness:.9}), mat('#6b7a45', {roughness:.95}), mat('#3a2c22', {roughness:.9}), mat('#5a4636'), mat('#5a4636', {roughness:.9})];
  const blok = new T.Mesh(new T.BoxGeometry(X1 - X0, -Y0, BZ), yerM); blok.position.set(0, Y0 / 2 - .001, -BZ / 2); blok.userData.nom = 'yer_v'; gV.add(blok);
  /* kesim yuzasi — kanvas teksturasi */
  const KW = 1024, KH = Math.round(KW * (Y1 - Y0) / (X1 - X0));
  const PX = x=>(x - X0) / (X1 - X0) * KW, PY = y=>(Y1 - y) / (Y1 - Y0) * KH;
  const CH = {x:0, y:-1.55, rx:1.45, ry:.52};
  const DAY = [-.55, -1.12, -1.25, .55], YON = [0, .3, 1.24, .9];
  const QAL = .13;
  const kesTex = kanvas(KW, KH, (c)=>{
    /* yer qatlamlari */
    const yq = ['#6a5140', '#7d6450', '#5d4a3c', '#8a7358', '#54443a', '#6e5a48', '#4b3d33'];
    for(let k = 0; k < 7; k++){ c.fillStyle = yq[k]; c.beginPath(); c.moveTo(0, PY(-k * .34)); for(let x = X0; x <= X1 + .01; x += .1) c.lineTo(PX(x), PY(-k * .34 + .05 * Math.sin(x * 1.7 + k))); c.lineTo(KW, KH); c.lineTo(0, KH); c.fill(); }
    /* konus qatlamlari: lava (to‘q) va kul (och) navbatma-navbat */
    const qR = ['#3d302c', '#b3a184', '#4b2c24', '#c2b196', '#3a2d2a', '#a8977a', '#51342a', '#bba98c', '#403230', '#ad9c80', '#4a2e26', '#b7a58a', '#3c2f2c', '#a6957a', '#4f3228', '#b09e82'];
    for(let k = 0; k < 16; k++){
      const d = k * QAL; c.fillStyle = qR[k]; c.beginPath();
      let bor = false;
      for(let i = 0; i <= 60; i++){ const y = HT * i / 60, r = rP(y) - d * 1.25; if(r < .02) break; const px = PX(-r), py = PY(Math.min(y, HT)); if(!bor){ c.moveTo(px, PY(0)); bor = true; } c.lineTo(px, py); }
      for(let i = 60; i >= 0; i--){ const y = HT * i / 60, r = rP(y) - d * 1.25; if(r < .02) continue; c.lineTo(PX(r), PY(Math.min(y, HT))); }
      c.closePath(); c.fill();
    }
    /* krater chuqurchasi */
    c.fillStyle = '#1a0f0c'; c.beginPath(); c.moveTo(PX(-RT), PY(HT)); c.lineTo(PX(-.26), PY(1.88)); c.lineTo(PX(-.14), PY(KT)); c.lineTo(PX(.14), PY(KT)); c.lineTo(PX(.26), PY(1.88)); c.lineTo(PX(RT), PY(HT)); c.lineTo(PX(RT), PY(Y1)); c.lineTo(PX(-RT), PY(Y1)); c.fill();
    /* magma yo‘llari */
    const kanal = (a, b, w)=>{ c.lineCap = 'round'; c.strokeStyle = '#7a1c08'; c.lineWidth = w * 1.9; c.beginPath(); c.moveTo(PX(a[0]), PY(a[1])); c.lineTo(PX(b[0]), PY(b[1])); c.stroke();
      c.strokeStyle = '#ff5a14'; c.lineWidth = w * 1.25; c.stroke(); c.strokeStyle = '#ffc34a'; c.lineWidth = w * .45; c.stroke(); };
    const s = KW / (X1 - X0);
    kanal([0, -1.1], [0, KT + .02], .15 * s); kanal([YON[0], YON[1]], [YON[2], YON[3]], .08 * s); kanal([DAY[0], DAY[1]], [DAY[2], DAY[3]], .07 * s);
    /* magma o‘chog‘i */
    const gr = c.createRadialGradient(PX(CH.x), PY(CH.y + .1), 4, PX(CH.x), PY(CH.y), CH.rx * s);
    gr.addColorStop(0, '#ffe07a'); gr.addColorStop(.35, '#ff8a1e'); gr.addColorStop(.8, '#c42a08'); gr.addColorStop(1, '#5a1004');
    c.fillStyle = gr; c.beginPath(); c.ellipse(PX(CH.x), PY(CH.y), CH.rx * s, CH.ry * s, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,8,0,.7)'; c.lineWidth = 3; c.stroke();
  });
  const kShape = new T.Shape(); kShape.moveTo(X0, Y0); kShape.lineTo(X1, Y0); kShape.lineTo(X1, 0); kShape.lineTo(RB, 0);
  for(let i = 1; i <= 40; i++){ const y = HT * i / 40; kShape.lineTo(rP(y), y); }
  kShape.lineTo(.26, 1.88); kShape.lineTo(.14, KT); kShape.lineTo(-.14, KT); kShape.lineTo(-.26, 1.88);
  for(let i = 40; i >= 1; i--){ const y = HT * i / 40; kShape.lineTo(-rP(y), y); }
  kShape.lineTo(-RB, 0); kShape.lineTo(X0, 0); kShape.lineTo(X0, Y0);
  const kesG = uvQoy(new T.ShapeGeometry(kShape), X0, X1, Y0, Y1);
  const kesM = new T.MeshStandardMaterial({map:kesTex, roughness:.85, metalness:0, emissive:rang('#000000')}); kesM.userData.env = 1; kesM.envMapIntensity = .45;
  const kes = new T.Mesh(kesG, kesM); kes.position.z = .003; kes.userData.nom = 'kesim_v'; gV.add(kes);
  /* nur chiqaruvchi qismlar: magma o‘chog‘i (bo‘rtib chiqqan), krater tubi */
  const magM = fmat('#ff6a1a', {emissive:'#ff4a00', roughness:.35});
  const ochoq = new T.Mesh(new T.SphereGeometry(1, 40, 20, 0, Math.PI), magM); ochoq.scale.set(CH.rx * .96, CH.ry * .92, .16); ochoq.position.set(CH.x, CH.y, 0); ochoq.userData.nom = 'magma_ochogi'; gV.add(ochoq);
  const kraterD = new T.Mesh(new T.CircleGeometry(.15, 24, 0, Math.PI), magM); kraterD.rotation.x = -Math.PI / 2; kraterD.position.set(0, KT + .01, 0); kraterD.userData.nom = 'krater'; gV.add(kraterD);
  const jerloM = new T.Mesh(new T.CylinderGeometry(.06, .06, KT + 1.1, 12, 1, true, -Math.PI / 2, Math.PI), magM); jerloM.position.set(0, (KT - 1.1) / 2, 0); jerloM.userData.nom = 'jerlo'; gV.add(jerloM);
  /* yon krater (konus yonbag‘rida) */
  const ykPr = [[0, 0], [.3, 0], [.2, .16], [.12, .2], [.08, .12], [0, .1]].map(p=>new T.Vector2(p[0], p[1]));
  const yk = new T.Mesh(new T.LatheGeometry(ykPr, 28), mat('#4a3a34', {roughness:.9})); yk.userData.nom = 'yon_krater';
  const ykF = Math.PI / 2 + .32, ykY = .88; yk.position.set(rP(ykY) * Math.sin(ykF) * .98, ykY - .04, rP(ykY) * Math.cos(ykF) * .98);
  yk.lookAt(yk.position.clone().add(new T.Vector3(Math.sin(ykF), 1.1, Math.cos(ykF)))); yk.rotateX(Math.PI / 2); gV.add(yk);
  const ykNur = new T.Mesh(new T.CircleGeometry(.08, 16), magM); ykNur.position.y = .125; ykNur.rotation.x = -Math.PI / 2; ykNur.userData.nom = 'yon_krater'; yk.add(ykNur);
  /* lava oqimi (otilishda o‘sadi) — konusning o‘ng yonbag‘ri bo‘ylab */
  const lavaNuq = []; for(let i = 0; i <= 30; i++){ const y = HT - .02 - (HT - .02) * i / 30; const f = Math.PI / 2 + .55 + .12 * Math.sin(i * .5); const r = rP(y) * (1.03 + .01 * Math.sin(i)); lavaNuq.push(new T.Vector3(r * Math.sin(f), y + .02, r * Math.cos(f))); }
  const lavaEg = new T.CatmullRomCurve3(lavaNuq);
  const lavaG = new T.TubeGeometry(lavaEg, 120, .06, 10, false);
  const lavaM = fmat('#ff5a14', {emissive:'#ff3a00', roughness:.5});
  const lava = new T.Mesh(lavaG, lavaM); lava.userData.nom = 'lava'; lava.scale.set(1, 1, 1); gV.add(lava);
  const lavaJami = lavaG.index.count; lavaG.setDrawRange(0, 0);
  /* kul buluti (instanced) */
  const KN = TEJAM ? 40 : 80;
  const kulM = new T.MeshStandardMaterial({color:rang('#8d8782'), roughness:1, transparent:true, opacity:.9, depthWrite:false}); kulM.userData.env = 1; kulM.envMapIntensity = .3;
  const kulIM = new T.InstancedMesh(new T.IcosahedronGeometry(.22, 2), kulM, KN); kulIM.instanceMatrix.setUsage(T.DynamicDrawUsage); kulIM.frustumCulled = false; kulIM.userData.nom = 'kul'; gV.add(kulIM);
  const kul = []; for(let i = 0; i < KN; i++) kul.push({u:rn(), a:rn() * Math.PI * 2, s:.6 + rn() * .8, dx:(rn() - .5), dz:(rn() - .5)});
  /* vulqon bombalari */
  const bombM = fmat('#3a2620', {emissive:'#ff3a00', roughness:.6}); bombM.emissiveIntensity = .6;
  const bombs = []; for(let i = 0; i < 12; i++){ const m = new T.Mesh(new T.DodecahedronGeometry(.045 + rn() * .03, 0), bombM); m.userData.nom = 'lava'; m.visible = false; gV.add(m); bombs.push({m, t:rn() * 2, vx:(rn() - .5) * 2.2, vz:-rn() * 1.2, vy:2.6 + rn() * 1.3}); }
  const kraterNur = new T.PointLight(0xff7a2a, 0, 6, 2); kraterNur.position.set(0, KT + .3, -.2); gV.add(kraterNur);
  /* archa va uychalar — masshtab uchun */
  const archaM = mat('#2f5a36', {roughness:.85}), tanaM = mat('#4a3526');
  const archaG = new T.ConeGeometry(.09, .3, 8); archaG.translate(0, .19, 0);
  const archa = new T.InstancedMesh(archaG, archaM, 36); let ai = 0;
  for(let i = 0; i < 60 && ai < 36; i++){ const f = Math.PI / 2 + rn() * Math.PI, r = RB + .15 + rn() * .75, x = r * Math.sin(f), z = r * Math.cos(f); if(Math.abs(x) > 3.4 || z < -2.9) continue; joyQoy(archa, ai++, x, 0, z, .7 + rn() * .6); }
  archa.count = ai; gV.add(archa);
  gV.add(soya(S, 5.2, Y0 - .02, .6, 0, -1.4));
  const yV = [Y(gV, 'Magma o‘chog‘i', 1.9, -1.55, .4, 'magma_ochogi'), Y(gV, 'Bosh jerlo', .55, 1.25, .4, 'jerlo'), Y(gV, 'Krater', 0, 2.45, 0, 'krater'), Y(gV, 'Yon krater', 1.75, 1.3, -.3, 'yon_krater'),
    Y(gV, 'Dayka', -1.45, .35, .4, 'dayka'), Y(gV, 'Lava va kul qatlamlari', -1.2, 1.45, .4, 'konus'), Y(gV, 'Tog‘ jinslari', -2.9, -.75, .4, null, {rang:'#d8c9b0'})];

  /* ================= ZILZILA ================= */
  const ZX0 = -3.4, ZX1 = 3.4, ZD = 2.6, ZZ = 2.4;
  const HIP = new T.Vector3(-.78, -1.7, 0), FA = [-1.3, -ZD], FB = [.02, 0];
  const EPI = new T.Vector3(HIP.x, 0, 0);
  /* ustki yuza (to‘lqin bilan tebranadi) */
  const ustG = new T.PlaneGeometry(ZX1 - ZX0, ZZ, 96, 36); ustG.rotateX(-Math.PI / 2); ustG.translate(0, 0, -ZZ / 2);
  const ustAsl = ustG.attributes.position.array.slice();
  { const p = ustG.attributes.position, c = new Float32Array(p.count * 3), col = new T.Color(), c2 = new T.Color();
    for(let i = 0; i < p.count; i++){ const n = .5 + .5 * nz(p.getX(i) * 2 + 20, p.getZ(i) * 2); col.set('#6f8a4a').lerp(c2.set('#9a8a5a'), n * .7).convertSRGBToLinear(); c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; }
    ustG.setAttribute('color', new T.BufferAttribute(c, 3)); }
  const ustZ = new T.Mesh(ustG, new T.MeshStandardMaterial({vertexColors:true, roughness:.95})); ustZ.material.userData.env = 1; ustZ.material.envMapIntensity = .4; ustZ.userData.nom = 'yer_z'; gZ.add(ustZ);
  const zBlok = new T.Mesh(new T.BoxGeometry(ZX1 - ZX0, ZD, ZZ), [mat('#5a4636'), mat('#5a4636'), mat('#6f8a4a'), mat('#3a2c22'), mat('#5a4636'), mat('#5a4636')]);
  zBlok.position.set(0, -ZD / 2 - .01, -ZZ / 2); zBlok.userData.nom = 'yer_z'; gZ.add(zBlok);
  const ZKW = 1024, ZKH = Math.round(ZKW * ZD / (ZX1 - ZX0));
  const ZPX = x=>(x - ZX0) / (ZX1 - ZX0) * ZKW, ZPY = y=>-y / ZD * ZKH;
  const zTex = kanvas(ZKW, ZKH, (c)=>{
    const yq = ['#8a7358', '#6e5a48', '#7d6450', '#5d4a3c', '#6a5140', '#54443a', '#4b3d33'];
    /* qatlamlar yoriqda siljigan (o‘ng tomon pastga) */
    const fx = y=>FA[0] + (FB[0] - FA[0]) * (y - FA[1]) / (FB[1] - FA[1]);
    for(let k = 0; k < 7; k++){ const y0 = -k * .38; c.fillStyle = yq[k]; c.beginPath(); c.moveTo(0, ZPY(y0));
      for(let x = ZX0; x <= ZX1 + .01; x += .05){ const sil = x > fx(y0) ? -.14 : 0; c.lineTo(ZPX(x), ZPY(Math.min(0, y0 + sil + .03 * Math.sin(x * 2.1 + k)))); }
      c.lineTo(ZKW, ZKH); c.lineTo(0, ZKH); c.fill(); }
    c.strokeStyle = '#2a0d06'; c.lineWidth = 7; c.beginPath(); c.moveTo(ZPX(FA[0]), ZPY(FA[1])); c.lineTo(ZPX(FB[0]), ZPY(FB[1])); c.stroke();
    c.strokeStyle = '#ff6a3a'; c.lineWidth = 2.5; c.setLineDash([14, 9]); c.stroke(); c.setLineDash([]);
    /* siljish strelkalari */
    c.fillStyle = '#ffd36a'; const st = (x, y, a)=>{ c.save(); c.translate(ZPX(x), ZPY(y)); c.rotate(a); c.beginPath(); c.moveTo(0, -24); c.lineTo(9, -6); c.lineTo(3, -6); c.lineTo(3, 20); c.lineTo(-3, 20); c.lineTo(-3, -6); c.lineTo(-9, -6); c.fill(); c.restore(); };
    const ang = Math.atan2(FB[0] - FA[0], FB[1] - FA[1]);
    st(-.95, -1.0, ang); st(-.35, -1.3, ang + Math.PI);
  });
  const zKes = new T.Mesh(uvQoy(new T.PlaneGeometry(ZX1 - ZX0, ZD).translate(0, -ZD / 2, 0), ZX0, ZX1, -ZD, 0), new T.MeshStandardMaterial({map:zTex, roughness:.85}));
  zKes.material.userData.env = 1; zKes.material.envMapIntensity = .45; zKes.position.z = .003; zKes.userData.nom = 'kesim_z'; gZ.add(zKes);
  /* yoriq tekisligi */
  const fL = Math.hypot(FB[0] - FA[0], FB[1] - FA[1]);
  const yoriqM = new T.MeshStandardMaterial({color:rang('#8a2a14'), roughness:.6, transparent:true, opacity:.5, side:T.DoubleSide, depthWrite:false, emissive:rang('#2a0500')}); yoriqM.userData.env = 1;
  const yoriq = new T.Mesh(new T.PlaneGeometry(ZZ, fL), yoriqM); yoriq.rotation.order = 'YXZ'; yoriq.rotation.y = Math.PI / 2; yoriq.rotation.x = 0;
  yoriq.rotation.z = 0; yoriq.position.set((FA[0] + FB[0]) / 2, (FA[1] + FB[1]) / 2, -ZZ / 2);
  { const q = new T.Group(); q.position.copy(yoriq.position); yoriq.position.set(0, 0, 0); q.add(yoriq); q.rotation.z = -Math.atan2(FB[0] - FA[0], FB[1] - FA[1]); gZ.add(q); }
  yoriq.userData.nom = 'yoriq';
  const hipM = fmat('#ffcf4a', {emissive:'#ff8a00', roughness:.3});
  const hip = new T.Mesh(new T.SphereGeometry(.13, 24, 16), hipM); hip.position.copy(HIP); hip.userData.nom = 'gipotsentr'; gZ.add(hip);
  const hipHalo = new T.Mesh(new T.SphereGeometry(.22, 20, 14), nurli('#ffb14a', .25)); hipHalo.position.copy(HIP); hipHalo.raycast = ()=>{}; gZ.add(hipHalo);
  const epiM = fmat('#ff4a5a', {emissive:'#b0102a', roughness:.3});
  const epi = new T.Group(); epi.position.copy(EPI); gZ.add(epi);
  const epiKon = new T.Mesh(new T.ConeGeometry(.1, .32, 20), epiM); epiKon.rotation.x = Math.PI; epiKon.position.y = .3; epi.add(epiKon);
  const epiShar = new T.Mesh(new T.SphereGeometry(.1, 18, 12), epiM); epiShar.position.y = .52; epi.add(epiShar);
  const epiHalqa = new T.Mesh(new T.RingGeometry(.16, .22, 40, 1, 0, Math.PI), nurli('#ff4a5a', .6)); epiHalqa.rotation.x = -Math.PI / 2; epiHalqa.position.y = .02; epi.add(epiHalqa);
  nomla(epi, 'epitsentr');
  const vert = new T.Mesh(new T.CylinderGeometry(.012, .012, -HIP.y, 6), nurli('#ffe08a', .7)); vert.position.set(HIP.x, HIP.y / 2, .03); vert.raycast = ()=>{}; gZ.add(vert);
  /* to‘lqinlar: kesish tekisliklari bilan blok ichida */
  S.ren.localClippingEnabled = true;
  const lokT = [new T.Plane(new T.Vector3(0, -1, 0), .015), new T.Plane(new T.Vector3(0, 1, 0), ZD), new T.Plane(new T.Vector3(1, 0, 0), -ZX0), new T.Plane(new T.Vector3(-1, 0, 0), ZX1), new T.Plane(new T.Vector3(0, 0, 1), ZZ), new T.Plane(new T.Vector3(0, 0, -1), .01)];
  const dunT = lokT.map(p=>p.clone());
  const pM = new T.MeshBasicMaterial({color:rang('#5ab0ff'), transparent:true, opacity:.3, side:T.DoubleSide, depthWrite:false, clippingPlanes:dunT}); pM.userData.env = 1;
  const sM = new T.MeshBasicMaterial({color:rang('#ff5a6a'), transparent:true, opacity:.3, side:T.DoubleSide, depthWrite:false, clippingPlanes:dunT}); sM.userData.env = 1;
  const pSh = new T.Mesh(new T.SphereGeometry(1, 48, 24), pM); pSh.position.copy(HIP); pSh.userData.nom = 'p_tolqin'; gZ.add(pSh);
  const sSh = new T.Mesh(new T.SphereGeometry(1, 48, 24), sM); sSh.position.copy(HIP); sSh.userData.nom = 's_tolqin'; gZ.add(sSh);
  const sirtM = new T.MeshBasicMaterial({color:rang('#ffb13a'), transparent:true, opacity:.75, side:T.DoubleSide, depthWrite:false, clippingPlanes:dunT.slice(1)}); sirtM.userData.env = 1;
  const sirtH = []; for(let i = 0; i < 3; i++){ const m = new T.Mesh(new T.RingGeometry(.94, 1, 64, 1, 0, Math.PI), sirtM); m.rotation.x = -Math.PI / 2; m.position.set(EPI.x, .035, 0); m.userData.nom = 'sirt_tolqin'; m.visible = false; gZ.add(m); sirtH.push(m); }
  /* uychalar */
  const uylar = [];
  const devM = mat('#d9cbb2', {roughness:.8}), tomM = mat('#9a3a2a', {roughness:.7});
  [[-2.6, -.6], [-1.9, -1.7], [.6, -.5], [1.3, -1.6], [2.0, -.9], [-.2, -1.9], [-2.9, -1.9]].forEach(([x, z])=>{
    const u = new T.Group(); const d = new T.Mesh(new T.BoxGeometry(.28, .2, .22), devM); d.position.y = .1; u.add(d);
    const tm = new T.Mesh(new T.ConeGeometry(.23, .15, 4), tomM); tm.rotation.y = Math.PI / 4; tm.position.y = .27; u.add(tm);
    u.position.set(x, 0, z); u.rotation.y = rn() * 1.5; gZ.add(u); uylar.push(u); });
  /* seysmograf stansiyasi */
  const STA = new T.Vector3(2.7, 0, -.5);
  const sta = new T.Group(); sta.position.copy(STA); gZ.add(sta);
  const staB = new T.Mesh(new T.BoxGeometry(.42, .26, .34), mat('#c8ccd4', {roughness:.5, metalness:.2})); staB.position.y = .13; sta.add(staB);
  const staT = new T.Mesh(new T.CylinderGeometry(.08, .08, .3, 16), mat('#2c3140', {metalness:.5, roughness:.35})); staT.rotation.z = Math.PI / 2; staT.position.set(0, .33, 0); sta.add(staT);
  const anten = new T.Mesh(new T.CylinderGeometry(.01, .01, .5, 6), mat('#9aa3b5', {metalness:.7, roughness:.3})); anten.position.set(.15, .5, .1); sta.add(anten);
  const staCh = new T.Mesh(new T.SphereGeometry(.03, 10, 8), nurli('#6aff9a')); staCh.position.set(.15, .76, .1); sta.add(staCh);
  nomla(sta, 'seysmograf');
  gZ.add(soya(S, 4.9, -ZD - .03, .6, 0, -1.2));
  const yZ = [Y(gZ, 'Gipotsentr (o‘choq)', -1.9, -1.95, .4, 'gipotsentr'), Y(gZ, 'Epitsentr', EPI.x, .95, 0, 'epitsentr'), Y(gZ, 'Yoriq (uzilma)', .55, -.55, .4, 'yoriq'), Y(gZ, 'Seysmograf', STA.x, .95, STA.z, 'seysmograf'),
    Y(gZ, 'P-to‘lqin', 1.6, -2.25, .4, 'p_tolqin', {rang:'#9fd0ff'}), Y(gZ, 'S-to‘lqin', 1.6, -1.9, .4, 's_tolqin', {rang:'#ffb0b8'})];
  const yP = yZ[4], yS2 = yZ[5];
  /* seysmogramma (DOM kanvas) */
  const graf = S.dom('kbg-graf', '<div class="sar">Seysmogramma (sxematik)</div><canvas width="300" height="96"></canvas>');
  graf.style.bottom = '132px'; const gc = graf.querySelector('canvas'), gx = gc.getContext('2d');
  const leg = S.dom('kbg-leg', '<span><i style="background:#5ab0ff"></i>P-to‘lqin — tezroq</span><span><i style="background:#ff5a6a"></i>S-to‘lqin — sekinroq</span><span><i style="background:#ffb13a"></i>Sirt to‘lqinlari</span>');
  const VP = 1.7, VS = 1.0, VR = .85;
  const dSta = STA.distanceTo(HIP), tP = dSta / VP, tS = dSta / VS, tR0 = -HIP.y / VS, tR = tR0 + STA.distanceTo(EPI) / VR;
  const TMAX = tR + 2.6;
  let tz = -1, M = 5, izlar = [];
  const amp = ()=>cl(.18 + (M - 3) / 6 * .82, .1, 1);
  function seys(t){ /* stansiyadagi tebranish (sxematik) */
    let v = (Math.sin(t * 91) + Math.sin(t * 57)) * .015;
    if(t > tP) v += .28 * amp() * Math.exp(-(t - tP) * 1.8) * Math.sin((t - tP) * 55);
    if(t > tS) v += .6 * amp() * Math.exp(-(t - tS) * 1.3) * Math.sin((t - tS) * 32);
    if(t > tR) v += amp() * Math.exp(-(t - tR) * .9) * Math.sin((t - tR) * 16) * Math.min(1, (t - tR) * 4);
    return v;
  }
  function grafChiz(){
    const W = gc.width, H = gc.height; gx.clearRect(0, 0, W, H);
    gx.strokeStyle = 'rgba(255,255,255,.08)'; gx.lineWidth = 1; for(let i = 1; i < 6; i++){ gx.beginPath(); gx.moveTo(i * W / 6, 0); gx.lineTo(i * W / 6, H); gx.stroke(); }
    gx.strokeStyle = 'rgba(255,255,255,.18)'; gx.beginPath(); gx.moveTo(0, H / 2); gx.lineTo(W, H / 2); gx.stroke();
    const tt = tz < 0 ? 0 : Math.min(tz, TMAX);
    gx.strokeStyle = '#9ff0c0'; gx.lineWidth = 1.3; gx.beginPath();
    for(let px = 0; px <= W; px++){ const t = px / W * TMAX; if(t > tt) break; const y = H / 2 - seys(t) * H * .46; if(px === 0) gx.moveTo(px, y); else gx.lineTo(px, y); }
    gx.stroke();
    gx.font = '600 10px JetBrains Mono, monospace';
    [[tP, 'P', '#5ab0ff'], [tS, 'S', '#ff5a6a'], [tR, 'Sirt', '#ffb13a']].forEach(([t, m, r])=>{ if(tt < t) return; const x = t / TMAX * W; gx.strokeStyle = r; gx.setLineDash([3, 3]); gx.beginPath(); gx.moveTo(x, 12); gx.lineTo(x, H); gx.stroke(); gx.setLineDash([]); gx.fillStyle = r; gx.fillText(m, x + 3, 11); });
  }
  /* ---------- holat va boshqaruv ---------- */
  let rejim = 'vulqon', otilish = false, te = 0, yozuvlar = !S.test;
  const hud = S.dom('kbg-hud');
  const energiya = m=>{ const e = Math.pow(10, 1.5 * (m - 5)); return e >= 1 ? '× ' + (e >= 100 ? Math.round(e).toLocaleString('ru-RU').replace(/ /g, ' ') : son(e, 1)) : '× ' + son(e, 3); };
  function hudYoz(){
    if(rejim === 'vulqon'){
      hud.innerHTML = '<div><i>Holati</i><b>' + (otilish ? 'Otilmoqda' : 'Tinch') + '</b></div><div><i>Turi</i><b style="font-size:13px">Stratovulqon</b></div>';
      S.izoh.innerHTML = otilish ? '<b>Otilish.</b> Magma o‘chog‘idagi bosim oshib, magma <b>jerlo</b> orqali kraterga ko‘tariladi: gazlar kul bulutini osmonga otadi, <b>vulqon bombalari</b> uchadi, <b>lava</b> yonbag‘ir bo‘ylab oqadi. Qotgan lava va kul qatlamlari konusni o‘stiradi. <i>Sxematik model.</i>'
        : '<b>Stratovulqon kesimi.</b> Chuqurlikda — <b>magma o‘chog‘i</b>, undan <b>jerlo</b> (kanal) tepadagi <b>kraterga</b> olib chiqadi. Konus navbatma-navbat qotgan <b>lava</b> va <b>kul</b> qatlamlaridan tuzilgan; yon tarmoq — <b>yon krater</b>, yoriqda qotgan magma — <b>dayka</b>. Qismni bosing. <i>Sxematik model.</i>';
    } else {
      hud.innerHTML = '<div><i>Magnituda</i><b>M ' + son(M, 1) + '</b></div><div><i>Energiya (M 5 ga nisbatan)</i><b style="font-size:14px">' + energiya(M) + '</b></div>';
      S.izoh.innerHTML = '<b>Zilzila.</b> Yoriq bo‘ylab tog‘ jinslari keskin siljiydi. Siljish boshlangan joy — <b>gipotsentr</b>, uning ustidagi yer yuzasi nuqtasi — <b>epitsentr</b>. Avval tezroq <b>P-to‘lqin</b> (bo‘ylama), keyin <b>S-to‘lqin</b> (ko‘ndalang), so‘ng eng vayronkor <b>sirt to‘lqinlari</b> yetib keladi. Magnituda 1 birlikka oshsa, amplituda ≈ 10 marta, energiya ≈ 32 marta ortadi. <i>Tezliklar sxematik.</i>';
    }
  }
  function yubor(){ hodisa('kbg-vulqon-holat', {rejim, otilish, magnituda:Math.round(M * 10) / 10}); }
  function zilzila(){ tz = 0; hodisa('kbg-zilzila', {magnituda:Math.round(M * 10) / 10}); }
  let otB = null, slM = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    S.guruh('Rejim', [['vulqon', 'Vulqon'], ['zilzila', 'Zilzila']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    S.ajr();
    if(rejim === 'vulqon'){
      otB = S.tugma(otilish ? 'To‘xtatish' : 'Otilish', b=>{ otilish = !otilish; if(otilish) te = 0; b.textContent = otilish ? 'To‘xtatish' : 'Otilish'; b.classList.toggle('faol', otilish); hudYoz(); yubor(); S.fokus(otilish ? 4.5 : 3.9, new T.Vector3(0, otilish ? .75 : .05, -.6), true); }); otB.classList.toggle('faol', otilish);
    } else {
      slM = S.slayder('Magnituda', 3, 9, .1, M, v=>son(v, 1), v=>{ M = v; hudYoz(); yubor(); });
      S.tugma('Zilzila!', ()=>{ zilzila(); });
    }
    S.ajr();
    const yz = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); yozQoll(); }); yz.classList.toggle('faol', yozuvlar);
  }
  function yozQoll(){ [...yV, ...yZ].forEach(s=>s.visible = yozuvlar); }
  function qoll(){
    gV.visible = rejim === 'vulqon'; gZ.visible = rejim === 'zilzila';
    graf.style.display = rejim === 'zilzila' ? '' : 'none'; leg.style.display = rejim === 'zilzila' ? '' : 'none';
    tagChiz(); hudYoz(); yozQoll(); grafChiz();
    S.fokus(rejim === 'vulqon' ? (otilish ? 4.5 : 3.9) : 3.8, new T.Vector3(0, rejim === 'vulqon' ? (otilish ? .75 : .05) : -.85, -.6), true);
  }
  S.izohFn = null;
  bosishUla(S, 'kbg_vulqon', 'kbg-vulqon', ()=>({rejim}));
  /* kesim yuzasini tasniflash */
  let pX = 0, pY = 0; S.el.addEventListener('pointerdown', e=>{ pX = e.clientX; pY = e.clientY; });
  let hX = 0, hY = 0; S.el.addEventListener('pointermove', e=>{ hX = e.clientX; hY = e.clientY; });
  const ray = new T.Raycaster(), v2 = new T.Vector2();
  function nuqta(ob, x, y){ const r = S.el.getBoundingClientRect(); v2.set((x - r.left) / r.width * 2 - 1, -(y - r.top) / r.height * 2 + 1); ray.setFromCamera(v2, S.cam); const h = ray.intersectObject(ob, false); return h.length ? ob.worldToLocal(h[0].point.clone()) : null; }
  function tasnifV(p){
    const x = p.x, y = p.y;
    if(((x - CH.x) / CH.rx) ** 2 + ((y - CH.y) / CH.ry) ** 2 <= 1) return 'magma_ochogi';
    if(y > KT - .05 && Math.abs(x) < RT + .05) return 'krater';
    if(Math.abs(x) < .1 && y > -1.1 && y < KT) return 'jerlo';
    if(kesMasofa(x, y, YON[0], YON[1], YON[2], YON[3]) < .07) return 'yon_krater';
    if(kesMasofa(x, y, DAY[0], DAY[1], DAY[2], DAY[3]) < .07) return 'dayka';
    if(y >= 0 && Math.abs(x) <= rP(y)){ const d = (rP(y) - Math.abs(x)) / 1.25; if(d < .05) return 'konus'; return Math.floor(d / QAL) % 2 === 0 ? 'lava' : 'kul'; }
    return null;
  }
  function tasnifZ(p){
    if(p.distanceTo(HIP) < .3) return 'gipotsentr';
    if(kesMasofa(p.x, p.y, FA[0], FA[1], FB[0], FB[1]) < .1) return 'yoriq';
    return null;
  }
  const tanla = (d, x, y)=>{
    if(!d || !d.nom) return null;
    if(d.nom === 'kesim_v'){ const p = nuqta(kes, x, y); return p ? tasnifV(p) : null; }
    if(d.nom === 'kesim_z'){ const p = nuqta(zKes, x, y); return p ? tasnifZ(p) : null; }
    if(d.nom === 'yer_v' || d.nom === 'yer_z') return null;
    return d.nom;
  };
  const bosA = S.bosish;
  S.bosish = d=>{ const nom = tanla(d, pX, pY); if(nom) bosA({nom}); };
  if(S.ustida){ const us = S.ustida; S.ustida = d=>us(d ? {nom:tanla(d, hX, hY)} : null); }
  S.holat = h=>{
    if(!h) return;
    if(h.rejim === 'vulqon' || h.rejim === 'zilzila') rejim = h.rejim;
    if(h.otilish !== undefined){ otilish = !!h.otilish; te = 0; if(!otilish) lavaG.setDrawRange(0, 0); }
    if(h.magnituda !== undefined) M = cl(+h.magnituda, 3, 9);
    qoll();
    if(h.tolqin){ rejim = 'zilzila'; qoll(); zilzila(); }
    yubor();
  };
  const _pl = new T.Matrix4();
  kadrUla(S, (dt, tt)=>{
    if(gV.visible){
      magM.emissiveIntensity = (otilish ? 1.1 : .75) + .25 * Math.sin(tt * 3);
      kesM.emissive.setRGB(0, 0, 0);
      if(otilish){ te += dt; lavaG.setDrawRange(0, Math.floor(Math.min(1, te / 5) * lavaJami / 3) * 3); }
      kraterNur.intensity += ((otilish ? 2.2 + .6 * Math.sin(tt * 9) : 0) - kraterNur.intensity) * Math.min(1, dt * 4);
      lavaM.emissiveIntensity = .8 + .3 * Math.sin(tt * 2.3);
      for(let i = 0; i < KN; i++){
        const k = kul[i];
        if(otilish || k.u < .999) k.u = otilish ? (k.u + dt * .16 * k.s) % 1 : Math.min(1, k.u + dt * .3);
        const u = k.u, fade = otilish ? 1 : 0;
        const y = KT + .2 + u * 2.5, r = .15 + u * 1.7;
        const s = fade ? (.35 + u * 2.2) * k.s * Math.sin(Math.min(1, u * 6) * Math.PI / 2) : 0.0001;
        joyQoy(kulIM, i, Math.cos(k.a) * r * k.dx * 1.4 + u * .6, y, Math.sin(k.a) * r * .5 - .3 + k.dz * .3, s);
      }
      kulIM.instanceMatrix.needsUpdate = true;
      bombs.forEach(b=>{ b.m.visible = otilish; if(!otilish) return; b.t += dt; if(b.t > 1.9){ b.t = 0; } const t = b.t; b.m.position.set(b.vx * t, KT + .1 + b.vy * t - 2.2 * t * t, b.vz * t - .1); b.m.rotation.x += dt * 4; if(b.m.position.y < rP(Math.max(0, b.m.position.y)) * 0 + .05) b.t = 0; });
    }
    if(gZ.visible){
      gZ.updateMatrixWorld(true);
      lokT.forEach((p, i)=>dunT[i].copy(p).applyMatrix4(gZ.matrixWorld));
      const faol = tz >= 0 && tz < TMAX;
      if(faol) tz += dt * .9;
      const rP_ = faol ? VP * tz : 0, rS_ = faol ? VS * tz : 0;
      pSh.visible = faol && rP_ > .05 && rP_ < 5; sSh.visible = faol && rS_ > .05 && rS_ < 5;
      pSh.scale.setScalar(Math.max(.01, rP_)); sSh.scale.setScalar(Math.max(.01, rS_));
      pM.opacity = .32 * (1 - cl(rP_ / 5.5, 0, 1)) + .08; sM.opacity = .32 * (1 - cl(rS_ / 5.5, 0, 1)) + .08;
      const tr = tz - tR0;
      sirtH.forEach((m, i)=>{ const r = (tr - i * .35) * VR; m.visible = faol && r > .05; m.scale.setScalar(Math.max(.01, r)); });
      /* yuza tebranishi */
      const p = ustG.attributes.position, A = amp() * .07;
      if(faol && tr > 0){
        for(let i = 0; i < p.count; i++){ const x = ustAsl[i * 3], z = ustAsl[i * 3 + 2]; const r = Math.hypot(x - EPI.x, z); const f = tr * VR - r; const e = f > 0 ? Math.exp(-f * 1.2) * Math.sin(f * 7) : 0; p.setY(i, e * A); }
        p.needsUpdate = true; ustG.computeVertexNormals();
      } else if(!faol && p.getY(0) !== 0){ for(let i = 0; i < p.count; i++) p.setY(i, 0); p.needsUpdate = true; ustG.computeVertexNormals(); }
      uylar.forEach(u=>{ const r = Math.hypot(u.position.x - EPI.x, u.position.z); const f = tr * VR - r; const e = faol && f > 0 ? Math.exp(-f * 1.2) * Math.sin(f * 7) : 0; u.rotation.z = e * amp() * .35; u.position.y = Math.max(0, e * A); });
      hipM.emissiveIntensity = faol && tz < 1 ? 2 : .8 + .2 * Math.sin(tt * 4);
      epiHalqa.scale.setScalar(1 + .25 * Math.sin(tt * 4));
      staCh.visible = Math.sin(tt * 6) > 0;
      if(faol || tz >= TMAX){ grafChiz(); if(tz >= TMAX) tz = TMAX + 1e-3; }
      yP.position.x = cl(HIP.x + rP_ * .75, -2.6, 2.6); yS2.position.x = cl(HIP.x + rS_ * .75, -2.6, 2.6);
      yP.visible = yozuvlar && pSh.visible; yS2.visible = yozuvlar && sSh.visible;
    }
  });
  if(S.test) yozuvlar = false;
  S.joyla(3.9, new T.Vector3(0, .05, -.6));
  qoll();
  S.yorliq('Geografiya · vulqon va zilzila (sxematik kesim)');
  return S;
};


/* ================= 8. GEOGRAFIYA — tabiatda suvning aylanishi (diorama) ================= */
R.kbg_suv = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.38, ry:-.38, rxMin:-.15, rxMax:1.3, zoom:1.0});
  const g = S.g;
  S.nomlar = {okean:'Okean (dengiz)', bulut:'Bulut — kondensatsiya natijasi', yomgir:'Yog‘in (yomg‘ir, qor)', muzlik:'Tog‘ muzligi va qor', daryo:'Daryo — yer usti oqimi', kol:'Ko‘l', yer_osti:'Yer osti suvlari (suvli qatlam)', daraxt:'O‘simliklar — transpiratsiya', quyosh:'Quyosh — aylanishning energiya manbai'};
  const nz = shovqin2(53), nz2 = shovqin2(71), rn = tasodif(11);
  const Y = (m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:26, olcham:.14}, o || {})); s.position.set(x, y, z); if(nom) s.userData.nom = nom; g.add(s); return s; };
  const X0 = -4, X1 = 4, Z0 = -2.2, Z1 = 2.2, SUV = 0, KOL = .2, KOLM = [-.2, .6];
  const qirgoq = 1.5;
  const zr = x=>-.15 + .45 * Math.sin(x * .9 + .3);
  function H(x, z){
    let h = .28 - .8 * silliq(cl((x - qirgoq + .4) / 1.4, 0, 1));
    h += 1.75 * Math.exp(-(((x + 2.9) / 1.05) ** 2 + ((z + .5) / 1.25) ** 2)) + 1.1 * Math.exp(-(((x + 2.3) / .8) ** 2 + ((z - 1.1) / .8) ** 2));
    h += .09 * nz(x * 1.7 + 5, z * 1.7) + .03 * nz2(x * 5, z * 5);
    h -= .38 * Math.exp(-((Math.hypot(x - KOLM[0], z - KOLM[1]) / .45) ** 2));
    if(x > -2.5 && x < qirgoq + .6) h -= .13 * Math.exp(-(((z - zr(x)) / .13) ** 2)) * cl((x + 2.5) / .6, 0, 1);
    return h;
  }
  const QAT = [{nom:null, rang:'#6b4f37'}, {nom:'yer_osti', rang:'#3f6f96'}, {nom:null, rang:'#4a4038'}];
  QAT.forEach(q=>q.mat = mat(q.rang, {roughness:.85}));
  QAT[1].mat.emissive = rang('#08182a');
  const blok = qatlamBlok(g, {nx:160, nz:88, x0:X0, x1:X1, z0:Z0, z1:Z1, qat:QAT});
  const f = (k, x, z)=>{ const h = H(x, z); if(k === 0) return h; const k1 = h - .24; if(k === 1) return k1; const k2 = Math.min(k1 - .05, -.78 + .06 * Math.sin(x * 1.3)); if(k === 2) return k2; return -1.3; };
  const cC = new T.Color();
  const orm = (x, z)=>x > -1.9 && x < .9 && z < -.25 && Math.hypot(x - KOLM[0], z - KOLM[1]) > .7;
  blok.yangila(f, (x, z, y, c)=>{
    const n = .5 + .5 * nz2(x * 3 + 7, z * 3);
    if(y < -.06) c.set('#3f5a66').lerp(cC.set('#556b62'), n * .6);
    else if(y < .07) c.set('#e0cf9a');
    else if(y > 1.22) c.set('#f2f6fa').lerp(cC.set('#c9d4e2'), n * .4);
    else if(y > .8) c.set('#7a6c5c').lerp(cC.set('#8e8474'), n);
    else if(y > .5) c.set('#6b7a4a').lerp(cC.set('#7a6c5c'), (y - .5) / .3);
    else if(orm(x, z)) c.set('#3f6a33').lerp(cC.set('#4f7a3c'), n);
    else c.set('#6f9a4f').lerp(cC.set('#8aa65a'), n);
    c.convertSRGBToLinear();
  });
  blok.ust.userData.nom = 'yer_ust';
  /* okean */
  const okM = new T.MeshPhysicalMaterial({color:rang('#0f4a86'), roughness:.25, transparent:true, opacity:.82, clearcoat:.5, clearcoatRoughness:.2, depthWrite:false, emissive:rang('#05264a')}); okM.userData.env = 1; okM.envMapIntensity = .55;
  const okean = new T.Mesh(new T.BoxGeometry(X1 - qirgoq + .3, .56, Z1 - Z0), okM); okean.position.set((X1 + qirgoq - .3) / 2, SUV - .28, 0); okean.userData.nom = 'okean'; g.add(okean);
  const kolM = new T.MeshStandardMaterial({color:rang('#1f6fae'), roughness:.3, transparent:true, opacity:.9, emissive:rang('#06284a')}); kolM.userData.env = 1; kolM.envMapIntensity = .4;
  const kol = new T.Mesh(new T.CircleGeometry(.6, 40), kolM); kol.rotation.x = -Math.PI / 2; kol.position.set(KOLM[0], KOL, KOLM[1]); kol.userData.nom = 'kol'; g.add(kol);
  /* daryo */
  const dN = []; for(let x = -2.35; x <= qirgoq + .5; x += .08){ const z = zr(x); dN.push(new T.Vector3(x, Math.max(H(x, z) + .025, SUV + .01), z)); }
  const dM = fmat('#2f8fe0', {emissive:'#08305a', roughness:.15});
  const daryo = trubka(dN, .045, dM, 140); daryo.userData.nom = 'daryo'; g.add(daryo);
  /* daraxtlar */
  const tojM = mat('#2e5a2c', {roughness:.8, emissive:'#000000'}), tanaM = mat('#4a3526', {roughness:.9});
  const tojG = new T.ConeGeometry(.1, .32, 8); tojG.translate(0, .26, 0);
  const tanaG = new T.CylinderGeometry(.018, .022, .12, 6); tanaG.translate(0, .06, 0);
  const DN = TEJAM ? 40 : 70; const toj = new T.InstancedMesh(tojG, tojM, DN), tana = new T.InstancedMesh(tanaG, tanaM, DN);
  let di = 0; for(let i = 0; i < 400 && di < DN; i++){ const x = -1.9 + rn() * 2.8, z = -2.1 + rn() * 1.85; if(!orm(x, z) || Math.abs(z - zr(x)) < .25) continue; const y = H(x, z); if(y < .1 || y > .75) continue; const k = .75 + rn() * .6; joyQoy(toj, di, x, y, z, k); joyQoy(tana, di, x, y, z, k); di++; }
  toj.count = tana.count = di; toj.userData.nom = tana.userData.nom = 'daraxt'; g.add(toj, tana);
  /* quyosh */
  const QP = new T.Vector3(3.3, 3.6, -1.6);
  const quyosh = new T.Mesh(new T.SphereGeometry(.34, 32, 20), new T.MeshBasicMaterial({color:rang('#ffd76a')})); quyosh.material.userData.env = 1; quyosh.position.copy(QP); quyosh.userData.nom = 'quyosh'; g.add(quyosh);
  const nurT = kanvas(128, 128, c=>{ const gr = c.createRadialGradient(64, 64, 8, 64, 64, 64); gr.addColorStop(0, 'rgba(255,220,120,.9)'); gr.addColorStop(.4, 'rgba(255,190,80,.35)'); gr.addColorStop(1, 'rgba(255,170,60,0)'); c.fillStyle = gr; c.fillRect(0, 0, 128, 128); });
  const nurS = new T.Sprite(new T.SpriteMaterial({map:nurT, transparent:true, depthWrite:false, blending:T.AdditiveBlending})); nurS.material.userData.env = 1; nurS.scale.set(2.2, 2.2, 1); nurS.position.copy(QP); nurS.raycast = ()=>{}; g.add(nurS);
  /* bulutlar */
  const bulM = new T.MeshStandardMaterial({color:rang('#f4f6fb'), roughness:1, emissive:rang('#1a1d26')}); bulM.userData.env = 1; bulM.envMapIntensity = .6;
  const bulM2 = new T.MeshStandardMaterial({color:rang('#aab2c2'), roughness:1, emissive:rang('#10131a')}); bulM2.userData.env = 1; bulM2.envMapIntensity = .5;
  function bulut(x, y, z, k, m){ const b = new T.Group(); for(let i = 0; i < 9; i++){ const s = new T.Mesh(new T.IcosahedronGeometry(.28 + rn() * .2, 2), m); s.position.set((rn() - .5) * 1.3, (rn() - .3) * .25, (rn() - .5) * .6); s.scale.y = .75; b.add(s); } b.position.set(x, y, z); b.scale.setScalar(k); nomla(b, 'bulut'); g.add(b); return b; }
  const bulA = bulut(-1.75, 2.75, -.1, 1.05, bulM2), bulB = bulut(2.5, 2.45, -.2, .75, bulM);
  /* yog‘in: yomg‘ir tomchilari va qor */
  const YN = TEJAM ? 50 : 110;
  const yomM = nurli('#9fd0ff', .75);
  const yomIM = new T.InstancedMesh(new T.CylinderGeometry(.008, .008, .12, 4), yomM, YN); yomIM.instanceMatrix.setUsage(T.DynamicDrawUsage); yomIM.frustumCulled = false; yomIM.userData.nom = 'yomgir'; g.add(yomIM);
  const yom = []; for(let i = 0; i < YN; i++) yom.push({x:-2.4 + rn() * 1.3, z:-.5 + rn() * .8, u:rn(), s:.8 + rn() * .5, qor:rn() < .35});
  /* jarayon strelkalari (egri + zarrachalar) */
  const JR = {
    buglanish:{nom:'Bug‘lanish', rang:'#ffb74a', yol:[[2.7, .12, .5], [2.8, 1.0, .3], [2.6, 1.8, 0], [2.5, 2.2, -.2]]},
    transpiratsiya:{nom:'Transpiratsiya', rang:'#8fe07a', yol:[[-.6, .75, -1.1], [-.8, 1.4, -.9], [-1.1, 2.0, -.5], [-1.2, 2.45, -.3]]},
    kondensatsiya:{nom:'Kondensatsiya', rang:'#e6ecff', yol:[[2.0, 2.75, -.2], [.9, 3.05, -.2], [-.1, 3.0, -.1], [-.8, 2.9, -.1]]},
    yogin:{nom:'Yog‘in', rang:'#6ab8ff', yol:[[-1.75, 2.4, .35], [-1.85, 1.9, .4], [-1.95, 1.35, .45]]},
    oqim:{nom:'Yer usti oqimi', rang:'#3aa0ff', yol:null},
    sizilish:{nom:'Sizilish (infiltratsiya)', rang:'#c79cff', yol:[[-1.3, .45, Z1 + .05], [-1.3, 0, Z1 + .05], [-1.3, -.5, Z1 + .05]]},
    yer_osti:{nom:'Yer osti oqimi', rang:'#4ae0d0', yol:[[-1.1, -.58, Z1 + .05], [0, -.62, Z1 + .05], [1.0, -.62, Z1 + .05], [1.9, -.5, Z1 + .05]]}
  };
  { const o = []; for(let x = -1.9; x <= qirgoq + .4; x += .35){ const z = zr(x); o.push([x, Math.max(H(x, z), SUV) + .22, z]); } JR.oqim.yol = o; }
  const JK = Object.keys(JR);
  JK.forEach(k=>{
    const j = JR[k]; const nuq = j.yol.map(p=>new T.Vector3(p[0], p[1], p[2]));
    const eg = new T.CatmullRomCurve3(nuq); j.eg = eg;
    j.m = nurli(j.rang, .9);
    const L = eg.getLength(), uch = .2;
    const tr = new T.Mesh(new T.TubeGeometry(eg, 60, .035, 8, false), j.m); tr.raycast = ()=>{};
    const oxir = eg.getPointAt(1), yo = eg.getTangentAt(1);
    const kon = new T.Mesh(new T.ConeGeometry(.09, uch, 16), j.m); kon.position.copy(oxir).addScaledVector(yo, uch * .35); kon.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), yo); kon.raycast = ()=>{};
    j.gr = new T.Group(); j.gr.add(tr, kon); g.add(j.gr);
    j.zar = sharlar(8, .045, nurli(j.rang)); j.zar.raycast = ()=>{}; g.add(j.zar); j.L = L;
    const o = eg.getPointAt(.5); const s = yozuv(j.nom, {px:26, olcham:.14, rang:j.rang});
    s.position.set(o.x + (k === 'sizilish' ? .95 : k === 'yer_osti' ? 0 : .15), o.y + (k === 'yer_osti' ? -.22 : .22), o.z + (k === 'sizilish' || k === 'yer_osti' ? .05 : 0)); g.add(s); j.yoz = s;
  });
  /* bug‘ zarrachalari (haroratga bog‘liq) */
  const BN = 60;
  const bugM = new T.MeshBasicMaterial({color:rang('#e8f2ff'), transparent:true, opacity:.55, depthWrite:false}); bugM.userData.env = 1;
  const bugIM = new T.InstancedMesh(new T.SphereGeometry(.035, 8, 6), bugM, BN); bugIM.instanceMatrix.setUsage(T.DynamicDrawUsage); bugIM.frustumCulled = false; bugIM.raycast = ()=>{}; g.add(bugIM);
  const bug = []; for(let i = 0; i < BN; i++){ const tr = i % 3 === 0; bug.push({tr, x:tr ? -1.7 + rn() * 2.4 : 1.9 + rn() * 1.9, z:tr ? -2 + rn() * 1.6 : -1.8 + rn() * 3.6, u:rn(), s:.6 + rn() * .6}); }
  const yS = [Y('Okean', 3.2, .35, 1.3, 'okean', {rang:'#9cd0ff'}), Y('Ko‘l', KOLM[0], .55, KOLM[1] + .1, 'kol'), Y('Daryo', .9, .5, zr(.9) + .2, 'daryo'), Y('Muzlik', -3.1, 2.05, -.3, 'muzlik'), Y('Bulut', 2.5, 3.0, -.2, 'bulut'),
    Y('O‘rmon', -.6, 1.0, -1.7, 'daraxt'), Y('Suvli qatlam', 2.9, -.75, Z1 + .05, 'yer_osti', {rang:'#9fe0ff'}), Y('Quyosh', QP.x, QP.y + .55, QP.z, 'quyosh', {rang:'#ffe08a'})];
  soya(S, 5.6, -1.33, .6, 0, 0);
  /* ---------- holat ---------- */
  let jarayon = null, harorat = 20, yozuvlar = !S.test;
  const hud = S.dom('kbg-hud');
  const es = t=>6.112 * Math.exp(17.62 * t / (243.12 + t));
  const nisbiy = ()=>es(harorat) / es(20);
  const IZ = {
    null:'<b>Suvning tabiatdagi aylanishi.</b> Quyosh energiyasi ta’sirida suv okean va quruqlikdan <b>bug‘lanadi</b>, o‘simliklar barglaridan <b>transpiratsiya</b> bilan chiqadi. Bug‘ yuqorida sovib <b>kondensatsiyalanadi</b> — bulut hosil bo‘ladi, so‘ng <b>yog‘in</b> tushadi. Suv daryolar orqali oqadi, yerga <b>siziladi</b> va <b>yer osti oqimi</b> bilan yana okeanga qaytadi. Jarayon tugmasini bosing.',
    buglanish:'<b>Bug‘lanish.</b> Quyosh isitgan suv yuzasidan molekulalar bug‘ holatida havoga ko‘tariladi. Harorat qancha yuqori bo‘lsa, bug‘lanish shuncha kuchli. Atmosferaga tushadigan namlikning asosiy qismi okeanlardan bug‘lanadi.',
    transpiratsiya:'<b>Transpiratsiya.</b> O‘simliklar ildiz orqali suv so‘radi va uni barg og‘izchalari orqali bug‘ ko‘rinishida chiqaradi. O‘rmonlar havoni namlab, mahalliy iqlimni yumshatadi.',
    kondensatsiya:'<b>Kondensatsiya.</b> Ko‘tarilgan nam havo sovib, bug‘ mayda suv tomchilari va muz kristallariga aylanadi — <b>bulut</b> hosil bo‘ladi. Shamol bulutlarni quruqlik ustiga olib keladi.',
    yogin:'<b>Yog‘in.</b> Bulutdagi tomchilar yiriklashib og‘irlashadi va yomg‘ir, qor yoki do‘l bo‘lib yerga tushadi. Tog‘larda qor to‘planib <b>muzliklar</b> hosil bo‘ladi — ular chuchuk suv zaxirasi.',
    oqim:'<b>Yer usti oqimi.</b> Yog‘in va erigan qor-muz suvi yonbag‘irlardan pastga oqib, soylar va <b>daryolarga</b> qo‘shiladi, ko‘llarni to‘ldiradi va oxiri dengiz yoki okeanga quyiladi (O‘rta Osiyoda — berk havzalarga, masalan Orolga).',
    sizilish:'<b>Sizilish (infiltratsiya).</b> Suvning bir qismi tuproq va g‘ovak jinslar orqali pastga sizib o‘tadi. U suv o‘tkazmaydigan qatlam ustida to‘planib <b>suvli qatlam</b> hosil qiladi.',
    yer_osti:'<b>Yer osti oqimi.</b> Suvli qatlamdagi suv juda sekin past tomonga — daryo, ko‘l yoki dengizga siljiydi. Buloqlar va quduqlar shu suvdan to‘yinadi.'
  };
  function hudYoz(){
    hud.innerHTML = '<div><i>Harorat</i><b>' + harorat + ' °C</b></div><div><i>Bug‘lanish (20 °C = 1, taxminiy)</i><b>× ' + son(nisbiy(), 2) + '</b></div><div><i>Jarayon</i><b style="font-size:13px">' + (jarayon ? JR[jarayon].nom : 'Hammasi') + '</b></div>';
    S.izoh.innerHTML = IZ[jarayon === null ? 'null' : jarayon] + ' <i>Sxematik model.</i>';
  }
  function yubor(){ hodisa('kbg-suv-holat', {jarayon, harorat}); }
  let jg = null, slH = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    jg = S.guruh('Jarayon', [['hammasi', 'Hammasi'], ...JK.map(k=>[k, JR[k].nom.replace(' (infiltratsiya)', '')])], jarayon || 'hammasi', k=>{ jarayon = k === 'hammasi' ? null : k; jg.faol(k); qoll(); yubor(); });
    S.ajr();
    slH = S.slayder('Harorat', 0, 40, 1, harorat, v=>v + ' °C', v=>{ harorat = v; hudYoz(); yubor(); });
    S.ajr();
    const yz = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); yozQoll(); }); yz.classList.toggle('faol', yozuvlar);
  }
  function yozQoll(){ yS.forEach(s=>s.visible = yozuvlar); JK.forEach(k=>{ JR[k].yoz.visible = yozuvlar && (jarayon === null || jarayon === k); }); }
  function qoll(){
    JK.forEach(k=>{ const on = jarayon === null || jarayon === k; JR[k].gr.visible = JR[k].zar.visible = on; });
    hudYoz(); yozQoll();
  }
  bosishUla(S, 'kbg_suv', 'kbg-suv');
  let pX = 0, pY = 0; S.el.addEventListener('pointerdown', e=>{ pX = e.clientX; pY = e.clientY; });
  let hX = 0, hY = 0; S.el.addEventListener('pointermove', e=>{ hX = e.clientX; hY = e.clientY; });
  const ray = new T.Raycaster(), v2 = new T.Vector2();
  function tasnif(x0, y0){
    const r = S.el.getBoundingClientRect(); v2.set((x0 - r.left) / r.width * 2 - 1, -(y0 - r.top) / r.height * 2 + 1); ray.setFromCamera(v2, S.cam);
    const h = ray.intersectObject(blok.ust, false); if(!h.length) return null;
    const p = g.worldToLocal(h[0].point.clone());
    if(p.y > 1.2) return 'muzlik';
    if(Math.hypot(p.x - KOLM[0], p.z - KOLM[1]) < .6) return 'kol';
    if(p.x > -2.4 && p.x < qirgoq + .5 && Math.abs(p.z - zr(p.x)) < .13) return 'daryo';
    if(orm(p.x, p.z) && p.y < .8) return 'daraxt';
    return null;
  }
  const tanla = (d, x, y)=>!d || !d.nom ? null : d.nom === 'yer_ust' ? tasnif(x, y) : d.nom;
  const bosA = S.bosish;
  S.bosish = d=>{ const nom = tanla(d, pX, pY); if(nom) bosA({nom}); };
  if(S.ustida){ const us = S.ustida; S.ustida = d=>us(d ? {nom:tanla(d, hX, hY)} : null); }
  S.holat = h=>{
    if(!h) return;
    if(h.jarayon !== undefined){ jarayon = JR[h.jarayon] ? h.jarayon : null; if(jg) jg.faol(jarayon || 'hammasi'); }
    if(h.harorat !== undefined){ harorat = Math.round(cl(+h.harorat, 0, 40)); if(slH) slH.qoy(harorat, true); }
    qoll(); yubor();
  };
  kadrUla(S, (dt, tt)=>{
    JK.forEach(k=>{
      const j = JR[k]; if(!j.gr.visible) return;
      j.m.opacity = jarayon === k ? .75 + .25 * Math.sin(tt * 5) : .55;
      const tez = k === 'buglanish' ? .12 + .12 * nisbiy() : k === 'yer_osti' ? .06 : .22;
      for(let i = 0; i < 8; i++){ const u = (tt * tez / Math.max(.5, j.L) * 3 + i / 8) % 1; const p = j.eg.getPointAt(u); joyQoy(j.zar, i, p.x, p.y, p.z, jarayon === k ? 1.2 : .8); }
      j.zar.instanceMatrix.needsUpdate = true;
    });
    const kuch = nisbiy();
    const bugOn = jarayon === null || jarayon === 'buglanish' || jarayon === 'transpiratsiya';
    for(let i = 0; i < BN; i++){
      const b = bug[i]; const faol = bugOn && (b.tr ? jarayon !== 'buglanish' : jarayon !== 'transpiratsiya') && (i / BN) < cl(.15 + .5 * kuch, .1, 1);
      b.u = (b.u + dt * .18 * b.s * (b.tr ? .8 : .6 + .5 * kuch)) % 1;
      const y0 = b.tr ? H(b.x, b.z) + .4 : .05;
      joyQoy(bugIM, i, b.x + .15 * Math.sin(tt + i), y0 + b.u * 1.9, b.z, faol ? (1 - b.u) * 1.3 + .2 : .0001);
    }
    bugIM.instanceMatrix.needsUpdate = true;
    const yOn = jarayon === null || jarayon === 'yogin';
    for(let i = 0; i < YN; i++){
      const y = yom[i]; y.u = (y.u + dt * (y.qor ? .35 : 1.1) * y.s) % 1;
      const yy = 2.5 - y.u * 2.2, x = y.x + (y.qor ? .05 * Math.sin(tt * 2 + i) : 0);
      const ko = yOn && yy > H(x, y.z) + .02;
      _p.set(x, yy, y.z);
      if(y.qor) _s.set(ko ? 2.2 : .0001, ko ? .25 : .0001, ko ? 2.2 : .0001); else _s.setScalar(ko ? 1 : .0001);
      _m4.compose(_p, _q.set(0, 0, 0, 1), _s); yomIM.setMatrixAt(i, _m4);
    }
    yomIM.instanceMatrix.needsUpdate = true;
    bulB.scale.setScalar(jarayon === 'kondensatsiya' ? .75 + .12 * (1 + Math.sin(tt * 1.5)) : .75); bulB.position.x = 2.5 + .08 * Math.sin(tt * .4);
    bulA.position.x = -1.75 + .06 * Math.sin(tt * .5 + 1);
    nurS.material.opacity = .8 + .2 * Math.sin(tt * 2);
    okM.emissiveIntensity = jarayon === 'buglanish' ? 1 + .6 * Math.sin(tt * 4) : 1;
  });
  if(S.test) yozuvlar = false;
  S.joyla(4.6, new T.Vector3(0, .6, 0));
  tagChiz(); qoll();
  S.yorliq('Geografiya · tabiatda suvning aylanishi (sxematik diorama)');
  return S;
};


/* ================= 9. GEOGRAFIYA — iqlim mintaqalari (globus, Quyosh nurlari) ================= */
R.kbg_iqlim = async (sahna, ctx)=>{
  try{ if(ctx.skriptYukla) await ctx.skriptYukla('lib/yer_teksturasi.js', ()=>window.MAKON_YER_TEKSTURA); }catch(e){}
  if(!sahna.isConnected) return null;
  const S = asos(sahna, ctx, {rx:.2, ry:-1.0, rxMin:-1.2, rxMax:1.2, zoom:1.0});
  const g = S.g;
  S.chiroq.kalit.intensity = .32; S.chiroq.tol.intensity = .18;
  S.nomlar = {ekvatorial:'Ekvatorial mintaqa', subekvatorial:'Subekvatorial mintaqa', tropik:'Tropik mintaqa', subtropik:'Subtropik mintaqa', motadil:'Mo‘tadil mintaqa', subarktik:'Subarktik mintaqa', arktik:'Arktika mintaqasi', subantarktik:'Subantarktik mintaqa', antarktik:'Antarktika mintaqasi'};
  const RG = 1.6, D2R = Math.PI / 180, TOSH = [41.3, 69.3];
  const OY = {mart:{d:0, nom:'21-mart'}, iyun:{d:23.44, nom:'22-iyun'}, sentabr:{d:0, nom:'23-sentabr'}, dekabr:{d:-23.44, nom:'22-dekabr'}};
  /* globus */
  const yerM = new T.MeshStandardMaterial({color:0xffffff, roughness:.85, metalness:0}); yerM.userData.env = 1; yerM.envMapIntensity = .25;
  if(window.MAKON_YER_TEKSTURA){ new T.TextureLoader().load(window.MAKON_YER_TEKSTURA, t=>{ t.encoding = T.sRGBEncoding; t.anisotropy = 4; yerM.map = t; yerM.needsUpdate = true; }); } else yerM.color = rang('#2d5a8a');
  const yer = new T.Mesh(new T.SphereGeometry(RG, 96, 64), yerM); yer.rotation.y = -TOSH[1] * D2R; g.add(yer);
  const atmM = new T.MeshBasicMaterial({color:rang('#6fb4ff'), transparent:true, opacity:.08, side:T.BackSide, depthWrite:false}); atmM.userData.env = 1;
  const atm = new T.Mesh(new T.SphereGeometry(RG * 1.06, 64, 32), atmM); atm.raycast = ()=>{}; g.add(atm);
  /* mintaqa belbog‘lari (sxematik kengliklar) */
  const MZ = [
    ['ekvatorial', -5, 5, null, '#1f9d55'], ['subekvatorial', 5, 20, 'sh', '#7cc242'], ['subekvatorial', -20, -5, 'j', '#7cc242'],
    ['tropik', 20, 30, 'sh', '#f2c14e'], ['tropik', -30, -20, 'j', '#f2c14e'], ['subtropik', 30, 40, 'sh', '#f08a3c'], ['subtropik', -40, -30, 'j', '#f08a3c'],
    ['motadil', 40, 65, 'sh', '#4fb3d9'], ['motadil', -65, -40, 'j', '#4fb3d9'], ['subarktik', 65, 70, 'sh', '#7b8ff0'], ['subantarktik', -70, -65, 'j', '#7b8ff0'],
    ['arktik', 70, 90, 'sh', '#e8f1ff'], ['antarktik', -90, -70, 'j', '#e8f1ff']];
  const belM = [];
  MZ.forEach(([nom, a, b, yarim, rg])=>{
    const m = new T.MeshStandardMaterial({color:rang(rg), transparent:true, opacity:.3, roughness:.6, depthWrite:false, emissive:rang(rg).multiplyScalar(.25)}); m.userData.env = 1;
    const bel = new T.Mesh(new T.SphereGeometry(RG * 1.008, 96, 12, 0, Math.PI * 2, (90 - b) * D2R, (b - a) * D2R), m);
    bel.userData.nom = nom; bel.userData.yarim = yarim; g.add(bel); belM.push({bel, m, nom});
  });
  /* chegara va maxsus chiziqlar */
  const halqa = (lat, r, h, op)=>{ const t = new T.Mesh(new T.TorusGeometry(RG * 1.012 * Math.cos(lat * D2R), r, 6, 128), nurli(h, op)); t.rotation.x = Math.PI / 2; t.position.y = RG * 1.012 * Math.sin(lat * D2R); t.raycast = ()=>{}; g.add(t); return t; };
  [5, 20, 30, 40, 65, 70].forEach(l=>{ halqa(l, .004, '#ffffff', .45); halqa(-l, .004, '#ffffff', .45); });
  halqa(0, .009, '#ffe066', .95); halqa(23.44, .007, '#ff9a4a', .9); halqa(-23.44, .007, '#ff9a4a', .9); halqa(66.56, .007, '#8fd8ff', .9); halqa(-66.56, .007, '#8fd8ff', .9);
  const oq = new T.Mesh(new T.CylinderGeometry(.012, .012, RG * 2.5, 8), nurli('#dfe6ff', .8)); oq.raycast = ()=>{}; g.add(oq);
  const Y = (m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:24, olcham:.075}, o || {})); s.position.set(x, y, z); if(nom) s.userData.nom = nom; g.add(s); return s; };
  const yoz = [Y('Shimoliy qutb', 0, RG * 1.3, 0, null, {rang:'#dfe6ff'}), Y('Janubiy qutb', 0, -RG * 1.3, 0, null, {rang:'#dfe6ff'}),
    Y('Ekvator', -RG * .72, 0, RG * .75, null, {rang:'#ffe066'}), Y('Shimoliy tropik 23,44°', -RG * .7, RG * .42, RG * .62, null, {rang:'#ffb37a'}), Y('Janubiy tropik', -RG * .7, -RG * .42, RG * .62, null, {rang:'#ffb37a'}),
    Y('Shimoliy qutb doirasi 66,56°', -RG * .45, RG * .95, RG * .35, null, {rang:'#9fe0ff'})];
  /* Toshkent belgisi */
  const nuqta = (lat, lon, r)=>new T.Vector3(Math.cos(lat * D2R) * Math.cos(lon * D2R), Math.sin(lat * D2R), -Math.cos(lat * D2R) * Math.sin(lon * D2R)).multiplyScalar(r || RG);
  const toshM = fmat('#ff4a6a', {emissive:'#a0102a'});
  const tosh = new T.Mesh(new T.SphereGeometry(.035, 14, 10), toshM); tosh.position.copy(nuqta(TOSH[0], 0, RG * 1.015)); tosh.raycast = ()=>{}; g.add(tosh);
  const toshY = Y('Toshkent 41,3° sh.k.', 0, 0, 0, null, {rang:'#ffb0c0'}); toshY.position.copy(nuqta(TOSH[0] - 6, -20, RG * 1.1));
  /* tanlangan kenglik: nuqta + mahalliy gorizont + Quyosh yo‘nalishi */
  const pinM = fmat('#ffd24a', {emissive:'#8a5a00'});
  const pin = new T.Group(); g.add(pin);
  const pinS = new T.Mesh(new T.SphereGeometry(.05, 16, 12), pinM); pinS.raycast = ()=>{}; pin.add(pinS);
  const gorz = new T.Mesh(new T.CircleGeometry(.22, 40), new T.MeshBasicMaterial({color:rang('#ffd24a'), transparent:true, opacity:.35, side:T.DoubleSide, depthWrite:false})); gorz.material.userData.env = 1; gorz.raycast = ()=>{}; pin.add(gorz);
  const vertik = new T.Mesh(new T.CylinderGeometry(.006, .006, .3, 6), nurli('#ffffff', .8)); vertik.raycast = ()=>{}; pin.add(vertik);
  let nurP = null;
  /* Quyosh nurlari */
  const nurG = new T.Group(); g.add(nurG);
  const nurM = nurli('#ffd76a', .85);
  const quyoshNur = new T.DirectionalLight(0xfff1d8, 1.35); g.add(quyoshNur); g.add(quyoshNur.target);
  const subM = new T.Mesh(new T.SphereGeometry(.045, 14, 10), nurli('#fff4b0')); subM.raycast = ()=>{}; g.add(subM);
  const subY = Y('Quyosh tik (zenit)', 0, 0, 0, null, {rang:'#fff0a0'});
  function nurQur(d){
    while(nurG.children.length){ const c = nurG.children.pop(); c.traverse(x=>{ if(x.geometry) x.geometry.dispose(); }); }
    const dir = new T.Vector3(-Math.cos(d * D2R), -Math.sin(d * D2R), 0);
    const per = new T.Vector3(-dir.y, dir.x, 0);
    for(let i = -4; i <= 4; i++) for(let j = -1; j <= 1; j++){
      const off = i * .36, zz = j * .7;
      if(Math.hypot(off, zz) > RG * .98) continue;
      const bosh = per.clone().multiplyScalar(off).add(new T.Vector3(0, 0, zz)).addScaledVector(dir, -3.0);
      /* sfera bilan kesishish */
      const b = bosh.dot(dir), c = bosh.lengthSq() - RG * RG * 1.02, D = b * b - c; if(D < 0) continue;
      const tt = -b - Math.sqrt(D); const oxir = bosh.clone().addScaledVector(dir, tt);
      if(bosh.distanceTo(oxir) < .4) continue;
      const s = strelka(bosh, oxir, null, {r:.012, uch:.09, mat:nurM}); s.traverse(x=>{ if(x.isMesh) x.raycast = ()=>{}; }); nurG.add(s);
    }
    quyoshNur.position.copy(dir).multiplyScalar(-6); quyoshNur.target.position.set(0, 0, 0);
    subM.position.copy(nuqta(d, 0, RG * 1.012)); subY.position.copy(nuqta(d, 0, RG * 1.3)).add(new T.Vector3(.35, 0, 0));
  }
  /* yon diagramma */
  const graf = S.dom('kbg-graf', '<div class="sar">Peshin paytidagi nur burchagi</div><canvas width="270" height="140"></canvas>');
  graf.style.bottom = '132px'; const gc = graf.querySelector('canvas'), gx = gc.getContext('2d');
  const leg = S.dom('kbg-leg', [['#1f9d55', 'Ekvatorial'], ['#7cc242', 'Subekvatorial'], ['#f2c14e', 'Tropik'], ['#f08a3c', 'Subtropik'], ['#4fb3d9', 'Mo‘tadil'], ['#7b8ff0', 'Subarktik'], ['#e8f1ff', 'Arktika']].map(([r, m])=>'<span><i style="background:' + r + '"></i>' + m + '</span>').join(''));
  leg.style.top = 'auto'; leg.style.bottom = '132px';
  /* ---------- holat ---------- */
  let kenglik = TOSH[0], oy = 'iyun', mintaqa = null, yozuvlar = !S.test;
  const hBal = ()=>{ const h = 90 - Math.abs(kenglik - OY[oy].d); return Math.max(0, h); };
  const kFmt = v=>son(Math.abs(v), 1) + '° ' + (v > 0 ? 'sh.k.' : v < 0 ? 'j.k.' : '');
  const zonaNom = v=>{ const a = Math.abs(v); const z = MZ.find(([n, lo, hi])=>v >= lo && v <= hi); return z ? S.nomlar[z[0]] : ''; };
  function grafChiz(){
    const W = gc.width, H = gc.height, h = hBal(); gx.clearRect(0, 0, W, H);
    const yer0 = H - 26; gx.fillStyle = '#3a4a2a'; gx.fillRect(0, yer0, W, H - yer0); gx.fillStyle = '#6f9a4f'; gx.fillRect(0, yer0, W, 3);
    gx.font = '600 11px Inter, sans-serif'; gx.fillStyle = '#e9edf8';
    if(h <= 0){ gx.fillStyle = '#9fb0e0'; gx.fillText('Qutb tuni — Quyosh ufqdan chiqmaydi', 12, 40); return; }
    const cx = W * .42, w = 34, a = h * D2R, L = 150;
    const dx = Math.cos(a), dy = -Math.sin(a);
    const iz = w / Math.sin(a);
    const x1 = cx - iz / 2, x2 = cx + iz / 2;
    const gr = gx.createLinearGradient(x1 - dx * L, yer0 - dy * L, cx, yer0); gr.addColorStop(0, 'rgba(255,215,106,.05)'); gr.addColorStop(1, 'rgba(255,215,106,.75)');
    gx.save(); gx.beginPath(); gx.rect(0, 0, W, yer0); gx.clip();
    gx.beginPath(); gx.moveTo(x1, yer0); gx.lineTo(x1 - dx * 400, yer0 + dy * 400); gx.lineTo(x2 - dx * 400, yer0 + dy * 400); gx.lineTo(x2, yer0); gx.closePath(); gx.fillStyle = gr; gx.fill(); gx.restore();
    gx.strokeStyle = '#ffd76a'; gx.lineWidth = 3; gx.beginPath(); gx.moveTo(Math.max(0, x1), yer0 + 1); gx.lineTo(Math.min(W, x2), yer0 + 1); gx.stroke();
    gx.strokeStyle = 'rgba(255,255,255,.6)'; gx.lineWidth = 1; gx.beginPath(); gx.arc(x2, yer0, 22, Math.PI, Math.PI + a, false); gx.stroke();
    gx.fillStyle = '#fff'; gx.fillText('h = ' + son(h, 1) + '°', Math.min(W - 70, x2 + 6), yer0 - 8);
    gx.textAlign = 'right'; gx.fillStyle = '#ffe9a8'; gx.fillText('Yuza: × ' + son(1 / Math.sin(a), 2), W - 8, 16);
    gx.fillStyle = '#9aa3c7'; gx.font = '500 10px Inter, sans-serif'; gx.fillText('(bir xil nur dastasi yoyiladigan yuza)', W - 8, 30); gx.textAlign = 'left';
  }
  function pinQoy(){
    const p = nuqta(kenglik, 0, RG * 1.01); pin.position.copy(p);
    const n = p.clone().normalize(); pin.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), n);
    gorz.rotation.x = -Math.PI / 2; vertik.position.y = .15;
    if(nurP){ pin.remove(nurP); nurP.traverse(x=>{ if(x.geometry) x.geometry.dispose(); if(x.material) (Array.isArray(x.material) ? x.material : [x.material]).forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); }); }); nurP = null; }
    const h = hBal();
    if(h > 0){
      /* mahalliy koordinatada Quyosh yo‘nalishi: janub/shimol tomonga h burchak */
      const d = OY[oy].d; const tomon = d > kenglik ? -1 : 1;
      const loc = new T.Vector3(tomon * Math.cos(h * D2R), Math.sin(h * D2R), 0);
      /* pin mahalliy o‘qlari: y — vertikal, x — globusda shimolga qarab (buriluvchi) */
      nurP = strelka(loc.clone().multiplyScalar(.42), new T.Vector3(0, .02, 0), null, {r:.01, uch:.06, mat:nurli('#ffb13a', .95)}); nurP.traverse(x=>{ if(x.isMesh) x.raycast = ()=>{}; });
      /* mahalliy x o‘qini shimol yo‘nalishiga to‘g‘rilash */
      pin.add(nurP);
    }
  }
  let pinYoz = null;
  function pinYozQoy(){
    if(pinYoz){ g.remove(pinYoz); pinYoz.material.map.dispose(); pinYoz.material.dispose(); }
    pinYoz = yozuv(kFmt(kenglik) + ' · h = ' + son(hBal(), 1) + '°', {px:24, olcham:.08, rang:'#ffe08a'}); pinYoz.position.copy(nuqta(kenglik, 0, RG * 1.34)).add(new T.Vector3(.2, 0, 0)); pinYoz.visible = yozuvlar; g.add(pinYoz);
  }
  const hud = S.dom('kbg-hud');
  function hudYoz(){
    const h = hBal();
    hud.innerHTML = '<div><i>Kenglik</i><b>' + kFmt(kenglik) + '</b></div><div><i>' + OY[oy].nom + ' · Quyosh og‘ishi</i><b>' + (OY[oy].d > 0 ? '+' : '') + son(OY[oy].d, 2) + '°</b></div><div><i>Peshin balandligi h</i><b>' + (h > 0 ? son(h, 1) + '°' : 'qutb tuni') + '</b></div>';
    S.izoh.innerHTML = '<b>Iqlim mintaqalari</b> (B. P. Alisov tasnifi) Quyosh nurlarining tushish burchagiga bog‘liq. Peshin balandligi <b>h = 90° − |φ − δ|</b>: ' + kFmt(kenglik) + ' da ' + OY[oy].nom + ' kuni h = <b>' + (h > 0 ? son(h, 1) + '°' : '0° (qutb tuni)') + '</b>. Nur qanchalik qiya tushsa, bir xil energiya shunchalik katta yuzaga (×1/sin h) tarqaladi — joy sovuqroq. Bu nuqta: <b>' + zonaNom(kenglik) + '</b>. <i>Mintaqa chegaralari sxematik (kengliklar bo‘yicha ideallashtirilgan).</i>';
  }
  function yubor(){ hodisa('kbg-iqlim-holat', {kenglik:Math.round(kenglik * 100) / 100, oy, h:Math.round(hBal() * 10) / 10}); }
  function mintaqaQoll(){ belM.forEach(b=>{ b.m.opacity = mintaqa ? (b.nom === mintaqa ? .72 : .21) : .3; }); S.ajrat(mintaqa); }
  let og = null, slK = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    og = S.guruh('Sana', Object.keys(OY).map(k=>[k, OY[k].nom]), oy, k=>{ oy = k; og.faol(k); yangila(); yubor(); });
    S.ajr();
    slK = S.slayder('Kenglik', -90, 90, .1, kenglik, v=>kFmt(v), v=>{ kenglik = v; yangila(); yubor(); });
    S.tugma('Toshkent', ()=>{ kenglik = TOSH[0]; slK.qoy(kenglik, true); yangila(); yubor(); });
    S.ajr();
    const yz = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); yozQoll(); }); yz.classList.toggle('faol', yozuvlar);
  }
  function yozQoll(){ [...yoz, toshY, subY].forEach(s=>s.visible = yozuvlar); if(pinYoz) pinYoz.visible = yozuvlar; }
  function yangila(){ nurQur(OY[oy].d); pinQoy(); pinYozQoy(); hudYoz(); grafChiz(); yozQoll(); }
  bosishUla(S, 'kbg_iqlim', 'kbg-iqlim', d=>({yarim:d.yarim || null}));
  const bosA = S.bosish;
  S.bosish = d=>{ if(!d || !d.nom) return; bosA(d); mintaqa = d.nom; mintaqaQoll(); };
  S.holat = h=>{
    if(!h) return;
    if(OY[h.oy]) oy = h.oy;
    if(h.kenglik !== undefined && isFinite(+h.kenglik)) kenglik = cl(+h.kenglik, -90, 90);
    if(h.mintaqa !== undefined) mintaqa = S.nomlar[h.mintaqa] ? h.mintaqa : null;
    if(og) og.faol(oy); if(slK) slK.qoy(kenglik, true);
    yangila(); mintaqaQoll(); yubor();
  };
  kadrUla(S, (dt, tt)=>{
    pinM.emissiveIntensity = .8 + .4 * Math.sin(tt * 4);
    atmM.opacity = .07 + .02 * Math.sin(tt);
  });
  if(S.test) yozuvlar = false;
  S.joyla(2.9, new T.Vector3(0, 0, 0));
  tagChiz(); yangila(); mintaqaQoll();
  if(S.test){ graf.style.display = 'none'; leg.style.display = 'none'; }
  S.yorliq('Geografiya · iqlim mintaqalari va Quyosh nurlari (sxematik)');
  return S;
};


/* ================= 10. GEOGRAFIYA — O‘zbekiston 3D relyef xaritasi ================= */
/* O‘zbekiston xaritasi ma’lumoti (uz_yig.py): balandlik — NOAA ETOPO1 (jamoat mulki), 0,1° to‘r, int16 m, shimoldan janubga;
   chegara/daryo/ko‘l — Natural Earth 50m va 10m historic (jamoat mulki). */
const UZ_DATA = {"nx":191,"ny":111,"lon0":55.0,"lon1":74.0,"lat0":36.0,"lat1":47.0,"dav":{"uz":[[[70.947,42.249],[71.036,42.285],[71.213,42.206],[71.232,42.186],[71.229,42.163],[71.032,42.078],[70.857,42.031],[70.803,41.923],[70.631,41.875],[70.563,41.831],[70.455,41.725],[70.181,41.571],[70.177,41.54],[70.201,41.514],[70.29,41.497],[70.471,41.413],[70.646,41.46],[70.689,41.45],[70.734,41.401],[70.782,41.263],[70.86,41.225],[71.111,41.153],[71.223,41.14],[71.299,41.152],[71.393,41.123],[71.408,41.136],[71.421,41.342],[71.5,41.307],[71.546,41.308],[71.586,41.333],[71.62,41.435],[71.602,41.503],[71.665,41.541],[71.697,41.516],[71.701,41.454],[71.792,41.413],[71.858,41.311],[71.879,41.195],[72.052,41.165],[72.115,41.187],[72.164,41.174],[72.187,41.026],[72.213,41.014],[72.364,41.043],[72.506,40.982],[72.62,40.884],[72.658,40.87],[72.831,40.862],[72.867,40.842],[72.99,40.86],[73.132,40.829],[73.137,40.811],[73.113,40.786],[72.774,40.65],[72.749,40.609],[72.68,40.556],[72.604,40.525],[72.567,40.524],[72.402,40.578],[72.369,40.543],[72.37,40.52],[72.406,40.463],[72.358,40.402],[72.254,40.424],[72.233,40.454],[72.131,40.439],[72.013,40.341],[71.956,40.259],[71.845,40.234],[71.692,40.152],[71.63,40.217],[71.52,40.209],[71.376,40.275],[71.305,40.287],[71.095,40.271],[70.958,40.239],[70.653,40.201],[70.603,40.214],[70.534,40.325],[70.398,40.361],[70.372,40.384],[70.377,40.439],[70.712,40.669],[70.751,40.74],[70.639,40.779],[70.657,40.84],[70.442,41.023],[70.402,41.035],[70.373,41.028],[70.292,40.892],[69.713,40.657],[69.628,40.679],[69.498,40.767],[69.414,40.797],[69.309,40.724],[69.314,40.635],[69.26,40.588],[69.206,40.567],[69.304,40.327],[69.294,40.297],[69.22,40.288],[69.275,40.198],[69.228,40.188],[68.952,40.223],[68.653,40.183],[68.631,40.167],[68.622,40.147],[68.64,40.129],[68.927,40.136],[68.966,40.12],[68.972,40.09],[68.956,40.071],[68.805,40.05],[68.789,40.013],[68.869,39.907],[68.832,39.884],[68.798,39.909],[68.778,39.904],[68.735,39.836],[68.639,39.839],[68.586,39.635],[68.507,39.563],[68.463,39.537],[68.399,39.529],[67.719,39.621],[67.542,39.558],[67.426,39.466],[67.35,39.242],[67.358,39.217],[67.648,39.131],[67.667,39.109],[67.677,39.008],[67.694,38.995],[67.769,38.982],[68.044,38.984],[68.104,38.962],[68.133,38.928],[68.149,38.891],[68.048,38.669],[68.087,38.474],[68.144,38.383],[68.35,38.211],[68.341,38.117],[68.294,38.033],[68.237,37.96],[68.174,37.928],[68.088,37.835],[68.011,37.721],[67.864,37.571],[67.814,37.487],[67.798,37.245],[67.759,37.172],[67.753,37.2],[67.7,37.227],[67.546,37.236],[67.517,37.267],[67.442,37.258],[67.32,37.21],[67.196,37.235],[67.069,37.335],[66.828,37.371],[66.522,37.348],[66.511,37.599],[66.526,37.786],[66.629,37.932],[66.626,37.96],[66.575,38.011],[66.39,38.051],[66.173,38.167],[65.971,38.244],[65.857,38.269],[65.729,38.226],[65.613,38.239],[65.077,38.539],[64.622,38.756],[64.31,38.977],[64.163,38.954],[63.764,39.161],[63.506,39.377],[62.651,39.858],[62.483,39.976],[62.442,40.036],[62.375,40.332],[62.298,40.467],[62.188,40.541],[62.095,40.683],[61.954,41.031],[61.903,41.094],[61.8,41.163],[61.645,41.24],[61.497,41.276],[61.388,41.252],[61.329,41.195],[61.242,41.189],[60.867,41.249],[60.455,41.222],[60.09,41.399],[60.067,41.427],[60.069,41.476],[60.138,41.594],[60.124,41.645],[60.076,41.701],[60.076,41.76],[60.109,41.793],[60.176,41.782],[60.201,41.803],[60.192,41.834],[60.107,41.907],[59.963,41.954],[59.942,41.974],[59.974,42.019],[59.982,42.132],[60.006,42.191],[59.985,42.212],[59.858,42.295],[59.451,42.3],[59.354,42.323],[59.277,42.356],[59.199,42.482],[59.16,42.511],[58.931,42.54],[58.877,42.561],[58.589,42.778],[58.532,42.682],[58.477,42.663],[58.26,42.688],[58.152,42.628],[58.162,42.603],[58.289,42.527],[58.418,42.407],[58.477,42.34],[58.486,42.317],[58.474,42.299],[58.397,42.292],[58.327,42.399],[58.283,42.429],[58.029,42.488],[57.946,42.42],[57.923,42.335],[57.814,42.19],[57.686,42.165],[57.382,42.156],[57.291,42.124],[57.229,42.084],[57.114,41.957],[56.964,41.857],[57.018,41.451],[57.114,41.372],[57.119,41.35],[57.018,41.263],[56.774,41.288],[55.977,41.322],[55.976,44.995],[57.477,45.337],[58.555,45.555],[61.008,44.394],[61.065,44.348],[61.097,44.248],[61.161,44.169],[61.99,43.492],[62.072,43.489],[63.207,43.628],[64.443,43.551],[64.812,43.694],[64.905,43.715],[65.003,43.649],[65.271,43.418],[65.496,43.311],[65.803,42.877],[66.1,42.991],[66.05,42.473],[66.016,42.315],[66.01,42.005],[66.499,41.995],[66.538,41.741],[66.602,41.494],[66.71,41.179],[66.814,41.142],[67.735,41.187],[67.805,41.164],[67.936,41.197],[68.02,41.096],[68.113,41.029],[68.048,40.809],[68.16,40.722],[68.292,40.656],[68.415,40.619],[68.496,40.609],[68.573,40.623],[68.601,40.66],[68.594,40.711],[68.557,40.765],[68.559,40.829],[68.584,40.876],[68.737,41.042],[68.987,41.205],[69.043,41.264],[69.065,41.367],[69.154,41.425],[69.368,41.491],[69.401,41.542],[69.664,41.672],[69.96,41.754],[70.096,41.821],[70.226,41.946],[70.416,42.079],[70.489,42.08],[70.54,42.039],[70.584,42.036],[70.715,42.169],[70.765,42.194],[70.86,42.207]],[[71.206,39.893],[71.012,39.895],[71.045,39.993],[70.974,40.039],[70.961,40.088],[70.976,40.133],[71.024,40.149],[71.08,40.08],[71.229,40.048],[71.179,39.98],[71.216,39.907]],[[71.78,39.95],[71.753,39.907],[71.706,39.917],[71.669,39.946],[71.681,39.969],[71.79,39.995]]],"tm":[[[55.977,41.322],[57.018,41.263],[57.119,41.35],[57.018,41.451],[56.964,41.857],[57.291,42.124],[57.814,42.19],[58.029,42.488],[58.283,42.429],[58.397,42.292],[58.474,42.299],[58.418,42.407],[58.152,42.628],[58.26,42.688],[58.477,42.663],[58.589,42.778],[58.877,42.561],[59.16,42.511],[59.277,42.356],[59.354,42.323],[59.858,42.295],[59.985,42.212],[59.942,41.974],[60.107,41.907],[60.201,41.803],[60.076,41.76],[60.138,41.594],[60.069,41.476],[60.09,41.399],[60.455,41.222],[60.867,41.249],[61.242,41.189],[61.497,41.276],[61.903,41.094],[62.095,40.683],[62.375,40.332],[62.483,39.976],[63.506,39.377],[63.764,39.161],[64.163,38.954],[64.31,38.977],[64.622,38.756],[65.613,38.239],[65.971,38.244],[66.575,38.011],[66.629,37.932],[66.526,37.786],[66.522,37.348],[66.108,37.415],[65.765,37.569],[65.641,37.468],[65.555,37.251],[65.09,37.238],[64.816,37.132],[64.511,36.341],[64.092,36.113],[64.01,36.012],[63.13,35.846],[63.17,35.678],[63.057,35.446],[62.688,35.255],[62.463,35.251],[62.308,35.171],[62.213,35.29],[61.984,35.444],[61.621,35.432],[61.345,35.629],[61.262,35.62],[61.252,35.868],[61.153,35.977],[61.212,36.191],[61.17,36.572],[61.12,36.643],[60.341,36.638],[60.063,36.963],[59.455,37.253],[59.367,37.334],[59.302,37.511],[58.815,37.683],[58.65,37.652],[58.55,37.688],[58.387,37.635],[58.262,37.666],[57.981,37.83],[57.354,37.973],[57.308,38.13],[57.194,38.216],[56.441,38.249],[56.324,38.191],[56.272,38.08],[55.578,38.1],[55.381,38.051],[54.9,37.778],[54.699,37.47],[54.192,37.332],[53.914,37.344],[53.824,37.928],[53.869,38.949],[53.724,39.103],[53.705,39.21],[53.336,39.341],[53.157,39.265],[53.125,39.432],[53.236,39.609],[53.39,39.536],[53.603,39.547],[53.582,39.607],[53.472,39.669],[53.487,39.909],[53.404,39.96],[52.987,39.988],[52.952,39.895],[53.036,39.774],[52.805,40.054],[52.734,40.399],[52.943,41.038],[53.145,40.825],[53.333,40.783],[53.615,40.819],[53.764,40.666],[53.87,40.649],[54.193,40.72],[54.377,40.693],[54.319,40.835],[54.374,40.871],[54.547,40.832],[54.685,40.873],[54.723,40.951],[54.704,41.071],[54.592,41.194],[54.095,41.519],[53.805,42.118],[53.164,42.094],[52.97,41.976],[52.815,41.712],[52.883,41.653],[52.83,41.342],[52.85,41.2],[52.609,41.529],[52.494,41.78],[53.056,42.148],[53.685,42.297],[54.121,42.335],[54.854,41.965],[55.25,41.458],[55.434,41.296],[55.545,41.263]]],"tj":[[[67.759,37.172],[67.814,37.487],[68.294,38.033],[68.35,38.211],[68.087,38.474],[68.048,38.669],[68.133,38.928],[68.044,38.984],[67.694,38.995],[67.648,39.131],[67.358,39.217],[67.426,39.466],[67.719,39.621],[68.463,39.537],[68.586,39.635],[68.639,39.839],[68.735,39.836],[68.778,39.904],[68.869,39.907],[68.805,40.05],[68.972,40.09],[68.927,40.136],[68.64,40.129],[68.631,40.167],[68.952,40.223],[69.275,40.198],[69.22,40.288],[69.304,40.327],[69.206,40.567],[69.314,40.635],[69.309,40.724],[69.357,40.767],[69.414,40.797],[69.713,40.657],[70.292,40.892],[70.402,41.035],[70.657,40.84],[70.639,40.779],[70.751,40.722],[70.383,40.454],[70.372,40.384],[70.534,40.325],[70.603,40.214],[70.958,40.239],[70.946,40.188],[70.644,40.083],[70.624,39.999],[70.515,39.95],[70.451,40.049],[69.967,40.202],[69.53,40.097],[69.469,40.021],[69.476,39.92],[69.307,39.969],[69.279,39.918],[69.229,39.761],[69.298,39.525],[69.599,39.574],[70.171,39.584],[70.245,39.543],[70.501,39.587],[70.608,39.564],[70.733,39.413],[70.799,39.395],[71.005,39.412],[71.065,39.493],[71.47,39.604],[71.517,39.554],[71.503,39.479],[71.732,39.423],[71.726,39.307],[71.779,39.278],[72.043,39.352],[72.23,39.208],[72.358,39.337],[72.563,39.377],[73.109,39.362],[73.47,39.461],[73.632,39.449],[73.607,39.229],[73.805,38.969],[73.696,38.854],[73.802,38.607],[74.026,38.54],[74.131,38.661],[74.277,38.66],[74.812,38.46],[74.836,38.404],[74.775,38.192],[74.938,37.773],[74.894,37.601],[75.097,37.451],[75.119,37.386],[74.891,37.232],[74.659,37.394],[74.349,37.419],[74.26,37.415],[74.167,37.329],[73.75,37.232],[73.628,37.262],[73.717,37.329],[73.721,37.419],[73.383,37.462],[72.896,37.268],[72.757,37.173],[72.657,37.029],[72.359,36.983],[71.802,36.694],[71.666,36.697],[71.531,36.845],[71.433,37.128],[71.582,37.91],[71.279,37.918],[71.333,38.17],[71.256,38.307],[70.879,38.456],[70.616,38.334],[70.418,38.075],[70.215,37.924],[70.251,37.664],[70.189,37.582],[70.045,37.547],[69.821,37.61],[69.492,37.553],[69.399,37.399],[69.414,37.208],[69.304,37.117],[68.912,37.334],[68.387,37.138],[68.261,37.013],[68.068,36.95],[67.958,36.972]],[[70.653,40.937],[70.55,41.015],[70.618,41.002]],[[70.702,39.825],[70.56,39.791],[70.483,39.883]]],"kg":[[[70.958,40.239],[71.305,40.287],[71.52,40.209],[71.63,40.217],[71.692,40.152],[71.956,40.259],[72.131,40.439],[72.233,40.454],[72.358,40.402],[72.406,40.463],[72.37,40.52],[72.402,40.578],[72.604,40.525],[72.774,40.65],[73.137,40.811],[72.99,40.86],[72.658,40.87],[72.364,41.043],[72.187,41.026],[72.164,41.174],[71.879,41.195],[71.858,41.311],[71.665,41.541],[71.602,41.503],[71.586,41.333],[71.5,41.307],[71.421,41.342],[71.393,41.123],[70.86,41.225],[70.782,41.263],[70.689,41.45],[70.471,41.413],[70.177,41.54],[70.631,41.875],[70.803,41.923],[70.857,42.031],[71.229,42.163],[71.036,42.285],[70.947,42.249],[70.893,42.34],[71.167,42.667],[71.422,42.783],[71.817,42.822],[72.276,42.758],[72.753,42.638],[72.855,42.561],[73.283,42.504],[73.493,42.409],[73.422,42.594],[73.556,43.003],[73.949,43.195],[74.146,43.194],[74.209,43.24],[74.818,42.978],[75.366,42.837],[75.636,42.815],[75.84,42.938],[76.509,42.919],[76.988,42.974],[77.236,42.913],[78.524,42.865],[78.885,42.775],[79.127,42.776],[79.428,42.483],[79.921,42.413],[80.209,42.19],[80.246,42.06],[79.84,41.996],[79.766,41.899],[79.294,41.783],[78.743,41.56],[78.362,41.372],[78.346,41.281],[78.123,41.076],[77.582,40.993],[76.908,41.024],[76.661,40.78],[76.48,40.45],[76.319,40.352],[76.258,40.431],[75.872,40.303],[75.677,40.306],[75.556,40.625],[75.111,40.454],[74.835,40.483],[74.801,40.429],[74.83,40.329],[74.68,40.311],[74.412,40.137],[73.992,40.043],[73.835,39.8],[73.907,39.579],[73.823,39.489],[73.716,39.462],[73.47,39.461],[73.109,39.362],[72.563,39.377],[72.358,39.337],[72.23,39.208],[72.043,39.352],[71.779,39.278],[71.726,39.307],[71.732,39.423],[71.503,39.479],[71.517,39.554],[71.47,39.604],[71.065,39.493],[71.005,39.412],[70.799,39.395],[70.733,39.413],[70.608,39.564],[70.501,39.587],[70.245,39.543],[70.171,39.584],[69.599,39.574],[69.298,39.525],[69.229,39.761],[69.279,39.918],[69.307,39.969],[69.476,39.92],[69.469,40.021],[69.53,40.097],[69.967,40.202],[70.451,40.049],[70.515,39.95],[70.624,39.999],[70.644,40.083],[70.946,40.188]]],"kz":[[[70.947,42.249],[70.715,42.169],[70.584,42.036],[70.416,42.079],[70.096,41.821],[69.664,41.672],[69.368,41.491],[69.154,41.425],[69.065,41.367],[68.987,41.205],[68.737,41.042],[68.584,40.876],[68.573,40.623],[68.415,40.619],[68.048,40.809],[68.113,41.029],[67.936,41.197],[66.814,41.142],[66.71,41.179],[66.499,41.995],[66.01,42.005],[66.1,42.991],[65.803,42.877],[65.496,43.311],[65.271,43.418],[64.905,43.715],[64.443,43.551],[63.207,43.628],[61.99,43.492],[61.161,44.169],[61.008,44.394],[58.555,45.555],[55.976,44.995],[55.977,41.322],[55.545,41.263],[55.434,41.296],[55.25,41.458],[54.854,41.965],[54.121,42.335],[53.685,42.297],[53.056,42.148],[52.494,41.78],[52.462,42.101],[52.618,42.428],[52.597,42.76],[52.494,42.82],[52.273,42.8],[52.184,42.869],[51.898,42.87],[51.616,43.158],[51.295,43.174],[51.302,43.482],[51.065,43.75],[50.831,44.193],[50.685,44.265],[50.331,44.325],[50.276,44.355],[50.253,44.462],[50.297,44.582],[50.409,44.624],[50.86,44.629],[51.177,44.501],[51.544,44.531],[51.31,44.619],[51.058,44.812],[51.009,44.922],[51.25,45.122],[51.416,45.358],[52.427,45.405],[52.911,45.32],[53.2,45.332],[52.837,45.497],[52.774,45.573],[53.042,45.968],[53.135,46.192],[53.064,46.475],[53.17,46.669],[53.069,46.856],[52.916,46.954],[52.483,46.991],[52.138,46.829],[52.011,46.902],[51.745,46.934],[51.615,47.03],[51.178,47.11],[50.583,46.882],[50.419,46.879],[49.886,46.596],[49.347,46.519],[49.362,46.41],[49.286,46.437],[49.206,46.386],[49.232,46.337],[48.61,46.566],[48.509,46.65],[48.519,46.734],[48.605,46.766],[48.884,46.705],[48.959,46.775],[48.553,47.321],[48.167,47.709],[47.482,47.804],[47.292,47.741],[47.093,47.948],[47.119,48.127],[47.065,48.232],[46.661,48.412],[46.609,48.574],[46.703,48.806],[47.031,49.15],[46.802,49.367],[46.823,49.502],[46.992,49.853],[47.248,50.001],[47.326,50.274],[47.504,50.403],[47.706,50.378],[48.335,49.858],[48.434,49.829],[48.759,49.928],[48.843,50.013],[48.625,50.613],[48.808,50.601],[49.323,50.852],[49.498,51.084],[49.822,51.132],[50.309,51.322],[50.794,51.729],[51.163,51.647],[51.27,51.594],[51.345,51.475],[51.609,51.484],[52.007,51.673],[52.219,51.709],[52.331,51.681],[52.571,51.482],[53.338,51.482],[53.535,51.4],[53.688,51.252],[53.957,51.161],[54.14,51.041],[54.421,50.78],[54.471,50.584],[54.555,50.536],[54.636,50.592],[54.65,50.66],[54.606,50.88],[54.546,50.946],[54.642,51.012],[54.868,50.941],[55.361,50.665],[55.686,50.583],[56.05,50.714],[56.144,50.845],[56.491,51.02],[56.62,50.981],[57.012,51.065],[57.179,51.036],[57.442,50.889],[57.654,50.925],[57.839,51.092],[58.359,51.064],[58.547,50.971],[58.884,50.694],[59.452,50.62],[59.524,50.583],[59.523,50.493],[59.812,50.582],[59.955,50.799],[60.059,50.85],[60.288,50.704],[60.425,50.679],[60.942,50.696],[61.389,50.861],[61.585,51.23],[61.555,51.325],[61.363,51.442],[60.465,51.651],[60.388,51.773],[60.03,51.933],[60.425,52.126],[60.67,52.151],[60.995,52.337],[60.774,52.676],[61.047,52.972],[61.401,52.996],[61.974,52.944],[62.083,53.005],[62.015,53.108],[61.66,53.228],[61.199,53.287],[61.163,53.337],[61.229,53.446],[61.401,53.456],[61.535,53.523],[61.474,53.58],[61.248,53.551],[60.979,53.622],[61.113,53.753],[61.144,53.964],[61.231,54.019],[61.334,54.049],[61.929,53.946],[62.04,54.003],[62.499,54.013],[62.633,54.069],[63.074,54.105],[63.191,54.171],[63.847,54.236],[64.461,54.384],[64.65,54.352],[64.927,54.397],[65.088,54.34],[65.158,54.364],[65.237,54.516],[65.477,54.623],[65.708,54.619],[65.914,54.693],[65.955,54.66],[66.223,54.667],[68.156,54.977],[68.244,55.052],[68.206,55.161],[68.525,55.205],[68.977,55.39],[69.493,55.357],[70.182,55.162],[70.486,55.282],[70.738,55.305],[70.91,55.128],[71.186,54.599],[71.152,54.364],[71.053,54.26],[71.093,54.212],[71.336,54.158],[72.004,54.206],[72.105,54.308],[72.186,54.326],[72.387,54.123],[72.404,53.964],[72.447,53.942],[72.586,53.996],[72.564,54.09],[72.622,54.134],[72.914,54.107],[73.23,53.958],[73.381,53.963],[73.666,54.063],[73.712,54.042],[73.679,53.929],[73.399,53.811],[73.306,53.707],[73.286,53.598],[73.407,53.448],[73.643,53.576],[73.859,53.62],[74.21,53.576],[74.352,53.488],[74.403,53.504],[74.452,53.647],[74.834,53.826],[75.052,53.827],[75.22,53.894],[75.377,53.97],[75.437,54.09],[75.693,54.115],[76.267,54.312],[76.837,54.442],[76.655,54.145],[76.422,54.152],[76.485,54.023],[77.86,53.269],[78.475,52.638],[79.469,51.493],[79.986,50.775],[80.066,50.758],[80.086,50.84],[80.22,50.912],[80.424,50.946],[80.448,51.183],[80.735,51.293],[80.877,51.281],[80.966,51.19],[81.127,51.191],[81.071,50.969],[81.388,50.956],[81.466,50.74],[81.934,50.766],[82.098,50.711],[82.494,50.728],[82.761,50.893],[83.019,50.897],[83.16,50.989],[83.357,50.995],[83.945,50.775],[84.176,50.521],[84.258,50.288],[84.323,50.239],[84.607,50.202],[84.989,50.061],[85.001,49.894],[85.233,49.616],[86.181,49.499],[86.675,49.777],[86.731,49.696],[86.614,49.61],[86.626,49.563],[86.812,49.488],[87.001,49.287],[87.234,49.216],[87.323,49.086],[87.049,49.11],[86.808,49.05],[86.729,48.939],[86.758,48.861],[86.718,48.697],[86.549,48.529],[85.749,48.385],[85.626,48.204],[85.526,47.916],[85.657,47.255],[85.485,47.064],[85.233,47.036],[84.786,46.831],[84.667,46.972],[84.016,46.971],[83.09,47.209],[83.029,47.186],[82.975,46.966],[82.315,45.595],[82.327,45.52],[82.612,45.424],[82.621,45.293],[82.521,45.125],[82.267,45.219],[81.945,45.161],[81.79,45.226],[81.692,45.349],[80.853,45.129],[80.635,45.127],[80.059,45.006],[79.872,44.884],[79.997,44.797],[80.255,44.808],[80.482,44.715],[80.381,44.655],[80.355,44.552],[80.355,44.097],[80.651,43.564],[80.704,43.427],[80.668,43.31],[80.786,43.162],[80.751,43.102],[80.617,43.128],[80.39,43.043],[80.383,42.974],[80.544,42.912],[80.539,42.873],[80.25,42.797],[80.202,42.734],[80.162,42.626],[80.259,42.235],[80.209,42.19],[79.921,42.413],[79.428,42.483],[79.127,42.776],[78.885,42.775],[78.524,42.865],[77.236,42.913],[76.988,42.974],[76.509,42.919],[75.84,42.938],[75.636,42.815],[75.366,42.837],[74.818,42.978],[74.209,43.24],[74.146,43.194],[73.949,43.195],[73.556,43.003],[73.422,42.594],[73.493,42.409],[73.283,42.504],[72.855,42.561],[72.753,42.638],[72.276,42.758],[71.761,42.821],[71.257,42.734],[71.023,42.535],[70.893,42.34]]],"ir":[[[53.914,37.344],[54.192,37.332],[54.699,37.47],[54.9,37.778],[55.381,38.051],[55.578,38.1],[56.272,38.08],[56.324,38.191],[56.441,38.249],[57.194,38.216],[57.308,38.13],[57.354,37.973],[57.981,37.83],[58.262,37.666],[58.387,37.635],[58.55,37.688],[58.65,37.652],[58.815,37.683],[59.302,37.511],[59.367,37.334],[59.455,37.253],[60.063,36.963],[60.341,36.638],[61.12,36.643],[61.17,36.572],[61.212,36.099],[61.153,35.977],[61.252,35.868],[61.279,35.514],[61.189,35.312],[61.1,35.272],[61.15,35.094],[61.08,34.856],[60.951,34.654],[60.726,34.518],[60.889,34.319],[60.643,34.307],[60.486,34.095],[60.527,33.842],[60.486,33.712],[60.574,33.588],[60.907,33.539],[60.917,33.505],[60.561,33.138],[60.829,32.249],[60.788,31.877],[60.821,31.495],[61.66,31.382],[61.755,31.285],[61.811,30.913],[61.784,30.832],[60.843,29.859],[61.318,29.373],[61.338,29.265],[61.623,28.792],[61.89,28.547],[62.353,28.415],[62.565,28.235],[62.758,28.244],[62.74,28.002],[62.812,27.497],[62.753,27.266],[62.915,27.218],[63.167,27.252],[63.305,27.125],[63.242,27.078],[63.25,26.879],[63.186,26.838],[63.158,26.65],[62.787,26.644],[62.439,26.561],[62.312,26.491],[62.239,26.357],[62.126,26.369],[61.842,26.226],[61.754,25.843],[61.662,25.751],[61.588,25.202],[61.412,25.102],[60.664,25.282],[60.587,25.414],[60.511,25.437],[60.4,25.312],[59.616,25.403],[59.456,25.481],[59.046,25.417],[58.798,25.555],[58.203,25.592],[57.937,25.692],[57.796,25.653],[57.733,25.725],[57.335,25.792],[57.104,26.371],[57.036,26.801],[56.91,26.995],[56.728,27.128],[56.356,27.2],[56.118,27.143],[55.941,27.038],[55.65,26.978],[55.424,26.771],[55.294,26.786],[54.896,26.557],[54.645,26.509],[54.247,26.697],[53.706,26.726],[53.507,26.852],[53.455,26.943],[52.983,27.142],[52.692,27.323],[52.476,27.617],[52.031,27.824],[51.589,27.864],[51.279,28.131],[51.276,28.219],[51.094,28.512],[51.062,28.726],[50.867,28.87],[50.876,29.063],[50.675,29.147],[50.65,29.42],[50.169,29.921],[50.072,30.199],[49.983,30.209],[49.555,30.029],[49.028,30.333],[49.002,30.374],[49.049,30.397],[49.19,30.375],[49.247,30.413],[49.225,30.472],[49.002,30.507],[49.037,30.45],[48.917,30.397],[48.891,30.328],[48.919,30.121],[48.87,30.062],[48.546,29.962],[48.435,30.038],[48.331,30.285],[48.015,30.466],[48.011,30.99],[47.679,31.002],[47.679,31.401],[47.83,31.794],[47.512,32.151],[47.371,32.424],[47.285,32.474],[47.121,32.467],[46.377,32.929],[46.113,32.958],[46.081,33.087],[46.146,33.23],[46.02,33.416],[45.981,33.47],[45.873,33.492],[45.879,33.61],[45.738,33.603],[45.397,33.971],[45.543,34.216],[45.438,34.415],[45.501,34.582],[45.638,34.574],[45.678,34.798],[45.921,35.029],[46.134,35.128],[46.112,35.322],[45.975,35.477],[45.995,35.608],[46.037,35.673],[46.273,35.773],[46.167,35.821],[45.776,35.822],[45.562,35.977],[45.362,36.015],[45.241,36.356],[45.084,36.43],[45.019,36.698],[44.881,36.799],[44.765,37.135],[44.794,37.29],[44.574,37.435],[44.545,37.658],[44.59,37.71],[44.336,37.872],[44.223,37.88],[44.229,37.967],[44.45,38.334],[44.299,38.386],[44.272,38.836],[44.171,38.934],[44.178,39.145],[44.079,39.218],[44.023,39.377],[44.389,39.422],[44.456,39.667],[44.587,39.769],[44.817,39.65],[45.141,39.254],[45.48,39.006],[46.17,38.869],[46.555,38.904],[46.853,39.148],[46.989,39.18],[47.338,39.424],[47.773,39.649],[47.996,39.684],[48.322,39.399],[48.136,39.312],[48.104,39.241],[48.125,39.172],[48.274,39.099],[48.292,39.019],[48.05,38.935],[47.996,38.854],[48.306,38.613],[48.417,38.586],[48.593,38.411],[48.869,38.435],[48.925,38.015],[49.081,37.668],[49.372,37.52],[50.13,37.407],[50.338,37.149],[50.533,37.014],[51.119,36.743],[51.762,36.615],[52.19,36.622],[53.768,36.93],[53.915,36.93],[53.679,36.853],[53.97,36.818],[54.024,36.901]]],"af":[[[66.522,37.348],[66.828,37.371],[67.069,37.335],[67.196,37.235],[67.32,37.21],[67.517,37.267],[67.7,37.227],[67.834,37.064],[68.068,36.95],[68.261,37.013],[68.387,37.138],[68.912,37.334],[69.304,37.117],[69.414,37.208],[69.399,37.399],[69.492,37.553],[69.821,37.61],[70.045,37.547],[70.189,37.582],[70.251,37.664],[70.215,37.924],[70.418,38.075],[70.616,38.334],[70.879,38.456],[71.256,38.307],[71.333,38.17],[71.279,37.918],[71.582,37.91],[71.433,37.128],[71.531,36.845],[71.666,36.697],[71.802,36.694],[72.359,36.983],[72.657,37.029],[72.757,37.173],[72.896,37.268],[73.383,37.462],[73.721,37.419],[73.717,37.329],[73.628,37.262],[73.654,37.239],[74.167,37.329],[74.26,37.415],[74.349,37.419],[74.659,37.394],[74.891,37.232],[74.727,37.291],[74.372,37.158],[74.541,37.022],[74.039,36.826],[73.769,36.888],[73.117,36.869],[72.623,36.83],[72.25,36.735],[71.773,36.432],[71.621,36.436],[71.233,36.122],[71.185,36.042],[71.398,35.88],[71.572,35.547],[71.601,35.408],[71.546,35.289],[71.621,35.183],[71.455,34.967],[71.294,34.868],[70.966,34.53],[71.096,34.369],[71.052,34.05],[70.654,33.952],[70.326,33.961],[69.995,34.052],[69.89,34.007],[69.868,33.898],[70.134,33.621],[70.284,33.369],[70.261,33.289],[69.92,33.112],[69.502,33.02],[69.405,32.683],[69.241,32.434],[69.279,31.937],[69.083,31.738],[68.869,31.634],[68.782,31.646],[68.598,31.803],[68.443,31.754],[68.161,31.803],[68.017,31.678],[67.578,31.506],[67.738,31.344],[67.453,31.235],[67.287,31.218],[66.924,31.306],[66.829,31.264],[66.596,31.02],[66.397,30.912],[66.347,30.803],[66.287,30.608],[66.305,30.321],[66.238,30.11],[66.313,29.969],[66.177,29.836],[65.096,29.559],[64.394,29.544],[64.099,29.392],[63.568,29.498],[62.477,29.408],[60.843,29.859],[61.784,30.832],[61.811,30.913],[61.755,31.285],[61.66,31.382],[60.821,31.495],[60.788,31.877],[60.829,32.249],[60.562,33.059],[60.561,33.138],[60.917,33.505],[60.511,33.639],[60.486,34.095],[60.643,34.307],[60.889,34.319],[60.726,34.518],[60.951,34.654],[61.08,34.856],[61.15,35.094],[61.1,35.272],[61.189,35.312],[61.279,35.514],[61.262,35.62],[61.345,35.629],[61.621,35.432],[61.984,35.444],[62.213,35.29],[62.308,35.171],[62.463,35.251],[62.688,35.255],[63.057,35.446],[63.17,35.678],[63.13,35.846],[64.01,36.012],[64.092,36.113],[64.511,36.341],[64.816,37.132],[65.09,37.238],[65.555,37.251],[65.641,37.468],[65.765,37.569],[66.108,37.415]]]},"daryo":{"norin":[[[73.3,41.776],[72.932,41.79],[72.771,41.762],[72.654,41.667]],[[72.654,41.667],[72.349,41.497],[72.222,41.376],[72.171,41.246],[72.053,41.117],[71.87,40.988],[71.597,40.907],[71.234,40.872],[70.965,40.796],[70.863,40.756],[70.698,40.661],[70.355,40.435]],[[77.737,41.88],[77.978,41.869],[78.019,41.836],[77.763,41.624],[77.673,41.567],[77.586,41.536],[76.388,41.492],[76.092,41.449],[75.882,41.459],[75.747,41.442],[75.617,41.4],[75.478,41.397],[75.33,41.431],[75.066,41.446],[74.436,41.424],[74.317,41.39],[74.18,41.4],[74.025,41.456],[73.946,41.519],[73.922,41.649],[73.886,41.696],[73.797,41.74],[73.655,41.783],[73.513,41.797],[73.298,41.776]]],"sirdaryo":[[[70.355,40.435],[70.319,40.371],[70.186,40.331],[69.827,40.273]],[[68.456,41.107],[68.173,41.13],[68.05,41.165],[68.003,41.212],[67.991,41.255]],[[61.76,46.021],[61.562,46.11]],[[69.827,40.273],[69.684,40.302],[69.563,40.286],[69.414,40.234],[69.299,40.225],[69.218,40.259],[69.152,40.338],[69.101,40.461],[69.082,40.599],[68.702,40.898],[68.675,40.962],[68.61,41.022],[68.456,41.107]],[[67.991,41.255],[68.069,41.336],[68.087,41.463],[68.051,41.658],[68.067,41.834],[68.134,41.991],[68.201,42.099],[68.207,42.132],[68.188,42.182],[68.255,42.237],[68.285,42.302],[68.253,42.443],[68.211,42.501],[68.208,42.554],[68.243,42.603],[68.255,42.663],[68.245,42.735],[68.2,42.825],[68.135,42.866],[68.119,42.908],[68.129,42.947],[68.089,42.991],[67.929,43.031],[67.838,43.121],[67.818,43.26],[67.789,43.341],[67.751,43.365],[67.72,43.358],[67.693,43.331],[67.66,43.343],[67.646,43.389],[67.605,43.418],[67.548,43.421],[67.514,43.459],[67.504,43.534],[67.444,43.631],[67.259,43.811],[67.222,43.812],[67.195,43.839],[67.176,43.894],[67.107,43.949],[66.988,44.003],[66.902,44.009],[66.85,43.967],[66.771,43.959],[66.561,44.009],[66.533,44.102],[66.494,44.152],[66.442,44.158],[66.418,44.181],[66.422,44.218],[66.382,44.268],[66.188,44.425],[66.019,44.457],[65.916,44.584],[65.833,44.64],[65.794,44.687],[65.791,44.723],[65.738,44.748],[65.616,44.756],[65.493,44.816],[65.37,44.927],[65.23,44.993],[65.072,45.014],[64.964,45.012],[64.904,44.989],[64.784,45.002],[64.602,45.052],[64.466,45.113],[64.375,45.187],[64.318,45.27],[64.261,45.281],[64.221,45.322],[64.198,45.394],[64.112,45.446],[63.883,45.511],[63.869,45.539],[63.907,45.595],[63.876,45.632],[63.784,45.68],[63.752,45.713],[63.7,45.718],[63.336,45.635],[63.124,45.633],[63.005,45.7],[62.9,45.719],[62.809,45.691],[62.733,45.691],[62.673,45.72],[62.634,45.759],[62.616,45.809],[62.565,45.813],[62.483,45.772],[62.376,45.758],[62.246,45.772],[62.127,45.751],[62.019,45.696],[61.897,45.705],[61.76,45.776],[61.703,45.833],[61.725,45.875],[61.817,45.918],[61.823,45.949],[61.76,46.021]],[[61.562,46.11],[61.264,46.051],[61.093,46.058],[60.878,46.137]]],"amudaryo":[[[68.212,37.022],[68.068,36.95],[67.958,36.972],[67.834,37.064],[67.766,37.14],[67.753,37.2],[67.7,37.227],[67.547,37.236],[67.517,37.267],[67.442,37.258],[67.32,37.21],[67.195,37.235],[67.069,37.335],[66.828,37.371],[66.472,37.345],[66.108,37.415],[65.737,37.582],[65.48,37.68],[65.337,37.712],[65.22,37.797],[65.131,37.938],[64.907,38.088],[64.549,38.247],[64.272,38.432],[64.076,38.642],[63.953,38.8],[63.904,38.904],[63.724,39.049],[63.413,39.232],[63.198,39.33],[63.081,39.344],[63.014,39.4],[62.998,39.5],[62.897,39.608],[62.71,39.723],[62.573,39.845],[62.442,40.036],[62.375,40.332],[62.298,40.468],[62.188,40.541],[62.095,40.683],[61.954,41.031],[61.903,41.094],[61.645,41.24],[61.497,41.276],[61.357,41.272],[61.263,41.3],[61.215,41.36],[60.71,41.68],[60.527,41.825],[60.482,41.919],[60.42,41.978],[60.343,42.0],[60.291,42.04],[60.266,42.1],[60.102,42.232],[59.95,42.291],[59.745,42.341],[59.587,42.416],[59.387,42.574],[59.322,42.591],[59.3,42.632],[59.319,42.697],[59.298,42.744],[59.236,42.772],[59.21,42.808],[59.222,42.852],[59.204,42.904],[59.156,42.966],[59.139,43.026],[59.153,43.084],[59.141,43.152],[59.103,43.23],[59.097,43.294]],[[59.099,43.292],[59.097,43.294]],[[59.097,43.294],[59.112,43.326],[59.036,43.498],[59.05,43.533],[59.204,43.581],[59.255,43.633],[59.26,43.716],[59.211,43.805],[59.107,43.901],[59.082,43.971],[59.134,44.016],[59.255,44.066],[59.541,44.148]],[[59.097,43.294],[59.005,43.423],[58.993,43.526],[59.032,43.643],[59.019,43.732],[58.952,43.792],[58.831,43.839],[58.655,43.872],[58.57,43.948],[58.575,44.067],[58.512,44.202],[58.316,44.426]]],"panj":[[[72.657,37.029],[72.359,36.983],[72.154,36.901],[71.802,36.694],[71.734,36.684],[71.666,36.697],[71.598,36.733],[71.531,36.845],[71.433,37.128],[71.505,37.603],[71.582,37.91],[71.552,37.933],[71.32,37.902],[71.279,37.918],[71.283,38.008],[71.333,38.17],[71.256,38.307],[71.052,38.418],[70.879,38.456],[70.736,38.423],[70.616,38.334],[70.418,38.075],[70.313,37.985],[70.215,37.924],[70.199,37.886],[70.255,37.765],[70.251,37.664],[70.189,37.582],[70.12,37.543],[70.045,37.547],[69.985,37.566],[69.941,37.6],[69.821,37.61],[69.626,37.594],[69.492,37.553],[69.42,37.487],[69.399,37.399],[69.43,37.291],[69.415,37.208],[69.304,37.117],[69.265,37.108],[68.96,37.325],[68.912,37.334],[68.855,37.317],[68.824,37.271],[68.669,37.258],[68.637,37.224],[68.547,37.183],[68.387,37.137],[68.3,37.088],[68.285,37.036],[68.261,37.013],[68.212,37.022]]]},"kol":{"sariqamish":[[[57.865,41.773],[57.818,41.7],[57.685,41.636],[57.527,41.594],[57.346,41.573],[57.247,41.653],[57.174,41.735],[57.062,41.725],[57.053,41.773],[57.094,41.968],[57.183,42.185],[57.273,42.303],[57.392,42.335],[57.55,42.261],[57.627,42.15],[57.613,42.105],[57.632,42.066],[57.682,42.01],[57.7,41.913],[57.845,41.838]]],"orol":[[[58.312,45.062],[58.372,45.131],[58.417,45.291],[58.549,45.408],[58.574,45.532],[58.638,45.59],[58.653,45.722],[58.712,45.835],[58.838,45.834],[58.814,45.882],[58.849,45.918],[59.06,45.895],[59.079,45.943],[59.179,45.926],[59.24,45.994],[59.303,46.002],[59.244,45.892],[59.105,45.897],[58.914,45.795],[58.869,45.596],[58.766,45.563],[58.672,45.46],[58.629,45.264],[58.682,45.13],[58.547,45.008],[58.588,44.99],[58.567,44.915],[58.624,44.818],[58.563,44.772],[58.524,44.569],[58.483,44.504],[58.364,44.425],[58.26,44.431],[58.235,44.461],[58.237,44.524],[58.321,44.603],[58.221,44.847]],[[60.783,46.086],[60.752,46.118],[60.825,46.201],[60.722,46.374],[60.58,46.293],[60.348,46.403],[60.133,46.357],[59.988,46.438],[60.002,46.572],[60.287,46.7],[60.368,46.617],[60.41,46.504],[60.459,46.623],[60.58,46.563],[60.741,46.627],[60.746,46.639],[60.745,46.653],[60.526,46.751],[60.525,46.777],[60.58,46.784],[60.811,46.747],[60.776,46.581],[60.892,46.473],[61.134,46.45],[61.264,46.5],[61.265,46.513],[61.203,46.577],[61.297,46.611],[61.315,46.648],[61.528,46.677],[61.45,46.584],[61.283,46.448],[61.3,46.385],[61.217,46.237],[60.977,46.17],[60.862,46.09]],[[59.729,46.083],[59.592,46.209],[59.504,46.319],[59.731,46.322],[59.785,46.284],[59.813,46.124]]],"chordara":[[[67.991,41.255],[68.162,41.2],[68.393,41.161],[68.456,41.107],[68.403,41.078],[68.28,41.052],[68.135,41.048],[68.024,41.099],[67.933,41.225]]],"orol1960":[[[60.941,43.643],[60.864,43.675],[60.852,43.663],[60.861,43.597],[60.812,43.589],[60.775,43.61],[60.784,43.635],[60.773,43.66],[60.722,43.59],[60.712,43.609],[60.689,43.611],[60.588,43.591],[60.551,43.567],[60.53,43.568],[60.501,43.624],[60.488,43.602],[60.446,43.603],[60.435,43.577],[60.397,43.591],[60.388,43.633],[60.373,43.633],[60.33,43.589],[60.324,43.6],[60.195,43.569],[60.166,43.582],[60.152,43.564],[60.144,43.484],[60.129,43.474],[60.079,43.475],[60.063,43.503],[59.98,43.497],[59.935,43.471],[59.888,43.471],[59.805,43.443],[59.762,43.396],[59.738,43.393],[59.722,43.443],[59.696,43.455],[59.674,43.493],[59.65,43.599],[59.658,43.617],[59.756,43.641],[59.741,43.653],[59.577,43.686],[59.506,43.721],[59.47,43.773],[59.429,43.785],[59.383,43.756],[59.337,43.755],[59.235,43.798],[59.167,43.799],[59.138,43.786],[59.137,43.731],[59.086,43.699],[58.958,43.843],[58.887,43.899],[58.746,43.941],[58.712,43.938],[58.848,43.884],[58.811,43.877],[58.799,43.84],[58.958,43.78],[58.98,43.751],[58.955,43.701],[58.924,43.694],[58.927,43.736],[58.897,43.747],[58.829,43.743],[58.695,43.691],[58.676,43.691],[58.698,43.715],[58.68,43.721],[58.598,43.71],[58.548,43.68],[58.401,43.639],[58.379,43.683],[58.324,43.732],[58.314,43.858],[58.349,44.059],[58.328,44.187],[58.21,44.282],[58.199,44.308],[58.172,44.472],[58.192,44.545],[58.242,44.59],[58.253,44.63],[58.212,44.663],[58.181,44.723],[58.158,44.809],[58.174,44.907],[58.265,45.078],[58.288,45.096],[58.331,45.218],[58.492,45.447],[58.511,45.514],[58.557,45.584],[58.625,45.798],[58.672,45.868],[58.759,45.929],[58.981,46.008],[59.04,46.014],[59.065,46.006],[59.057,45.99],[59.074,45.978],[59.117,45.974],[59.314,46.032],[59.365,46.028],[59.409,45.982],[59.4,45.958],[59.283,45.876],[59.258,45.831],[59.255,45.785],[59.269,45.774],[59.348,45.809],[59.415,45.809],[59.462,45.855],[59.5,46.004],[59.483,46.036],[59.464,46.028],[59.465,46.05],[59.505,46.126],[59.521,46.122],[59.537,46.141],[59.504,46.231],[59.419,46.299],[59.426,46.324],[59.488,46.348],[59.688,46.352],[59.759,46.337],[59.801,46.309],[59.829,46.198],[59.852,46.176],[59.838,46.108],[59.859,46.101],[59.93,46.152],[59.947,46.188],[60.081,46.241],[60.058,46.3],[60.012,46.351],[59.847,46.445],[59.844,46.458],[59.892,46.497],[59.887,46.512],[59.78,46.537],[59.816,46.552],[59.861,46.545],[59.888,46.576],[59.937,46.598],[60.023,46.617],[60.225,46.713],[60.292,46.723],[60.366,46.711],[60.404,46.625],[60.426,46.609],[60.45,46.636],[60.482,46.636],[60.555,46.586],[60.622,46.597],[60.666,46.635],[60.656,46.671],[60.593,46.706],[60.449,46.74],[60.423,46.759],[60.444,46.787],[60.495,46.772],[60.582,46.806],[60.79,46.776],[60.872,46.744],[60.878,46.718],[60.813,46.647],[60.808,46.607],[60.829,46.561],[60.875,46.522],[60.947,46.5],[61.117,46.495],[61.152,46.506],[61.166,46.528],[61.162,46.592],[61.18,46.62],[61.173,46.635],[61.124,46.644],[61.121,46.658],[61.228,46.672],[61.267,46.693],[61.274,46.731],[61.474,46.811],[61.474,46.832],[61.513,46.866],[61.551,46.837],[61.53,46.79],[61.642,46.766],[61.677,46.729],[61.676,46.707],[61.637,46.699],[61.592,46.651],[61.468,46.476],[61.418,46.455],[61.376,46.479],[61.333,46.308],[61.317,46.299],[61.276,46.314],[61.255,46.289],[61.25,46.249],[61.22,46.224],[61.225,46.188],[61.21,46.167],[61.132,46.118],[60.969,46.127],[60.899,46.114],[60.888,46.098],[60.935,46.082],[60.999,46.021],[61.023,46.023],[61.013,45.983],[61.042,45.927],[61.015,45.914],[61.094,45.894],[61.071,45.869],[60.989,45.862],[60.977,45.847],[61.001,45.812],[60.996,45.78],[60.962,45.75],[60.912,45.739],[60.885,45.7],[60.923,45.635],[60.952,45.639],[61.005,45.706],[61.038,45.717],[61.035,45.73],[61.08,45.725],[61.114,45.751],[61.126,45.744],[61.139,45.71],[61.249,45.658],[61.266,45.634],[61.262,45.573],[61.218,45.551],[61.209,45.505],[61.448,45.322],[61.48,45.272],[61.49,45.158],[61.565,45.172],[61.624,45.144],[61.679,45.209],[61.707,45.163],[61.756,45.179],[61.804,45.154],[61.749,45.156],[61.707,45.097],[61.678,45.083],[61.705,45.037],[61.703,44.996],[61.771,45.08],[61.796,45.091],[61.799,45.049],[61.834,45.032],[61.9,45.04],[61.939,45.028],[61.916,45.017],[61.906,44.968],[61.834,44.992],[61.82,44.958],[61.736,44.917],[61.716,44.867],[61.686,44.856],[61.645,44.879],[61.616,44.828],[61.521,44.807],[61.457,44.743],[61.446,44.755],[61.356,44.687],[61.266,44.658],[61.254,44.634],[61.221,44.663],[61.18,44.67],[61.117,44.655],[61.111,44.642],[61.175,44.621],[61.135,44.599],[61.131,44.578],[61.08,44.59],[61.055,44.567],[61.064,44.538],[61.108,44.503],[61.122,44.466],[61.107,44.427],[61.126,44.415],[61.202,44.425],[61.2,44.398],[61.156,44.39],[61.146,44.367],[61.152,44.303],[61.12,44.339],[61.107,44.334],[61.104,44.215],[61.086,44.216],[61.026,44.372],[61.008,44.362],[61.049,44.166],[61.046,44.147],[61.001,44.166],[60.973,44.299],[60.937,44.329],[60.949,44.21],[60.94,44.191],[60.886,44.205],[60.867,44.174],[60.853,44.063],[60.839,44.065],[60.81,44.018],[60.784,44.019],[60.77,44.003],[60.719,44.025],[60.7,44.026],[60.692,44.006],[60.73,43.881],[60.763,43.874],[60.818,43.925],[60.837,43.889],[60.86,43.891],[60.845,43.84],[60.859,43.819],[60.911,43.842],[60.918,43.828],[60.973,43.827],[60.982,43.795],[61.002,43.802],[60.965,43.717],[60.964,43.679],[60.989,43.642]]]}};
UZ_DATA.h64 = "PwA2ACEAMgA4AEAAQQBLAFAAZgBWAFYAVwBQAG0AawBlAGYAZABpAGMAYgBUAH8AiwB8AHcAaABjAG8AdQDiAMkAtQCyAMYAowCeAJ4AnACgAKsAugDDAKwA1gDzAN0AsADUANcA2AC8AK0AbwBTAGgAlACTAF8AZABTAFcAVQBNAEUAUQBVAFsAXwBxADYAQwBLAEwATQBIADEANQBFAFAAXABoAF4AagBuAHEAaQBtAHYAfAB1AHsAbQBRAFQAcgCOAHMAgACNALIAtgC0ALgAtgC7ANoA8ADfAPYA5ADuAPsA9QA6ATgBNwFoAV0BOQE5ATMBHwEkAT0BUgEaAQABGwEhASUBIAEgATcBIwEoAR8BKwEzAT4BQQFxAV8BTQFYAWoBXgGCAV0BawF7AYoBjwGdAbABwwHcAfwBKQIiAhwCCQIKAvEB+AETAggCDgIZAicCKQIxAjcCRgJSAlQCbwK6AlICRgI+Ah4CEwIFAvwB/QHvAe4B3gG/ATMALQBAAFgAPgBDAEEAQQA5AEwASABdAFYATQBLAFwAXABcAGEAXABPAEgATwBfAEQAnwBkAFwAWgBZAH8A3gDPAMoAvgCpAJ0AlwCYAKAAoQClAK4AvwDgABAB8wCzAMcAxwDjAP8AsAB6AJIARgBqAKIAngC7AGAAhQBzAGcAaQBUAD0ATQBPAIgAMAAxAEIARgA7AE4AOwBHAEoAVwBcAGMAaQBpAGcAagBkAGUAXQBfAGEAdABwAHEAcABHAEUAWgBNAFMAZgCaAMkAzADOAMsA0gDVANgA3QDuAA4BKgEgAS8BKQFTAWEBYwFgATQBJwEsAQwBIQFAAT0BDAEDASABPQFAATMBFAEyAR4BGgEUASIBNwE9AWYBnAGBAVQBbQF0AVUBegFwAYYBmwGuAbEBpAHJAdsB3gHmAe4BCAIpAigC7wHkAewB9AH7AQECDAITAhoCGQIOAg8CJwI8AlACYQJDAh0CFAIHAicC+AHjAd0BwwHMAbQBvwEgACsAMQAtADUAOgBKAEwATQBSAGMAYABXAFYATgBMAEgARQBAAC8APwA6ADgANwA0ADwA7gDtAOwA5QDbAMUAtwCzAKIAkACVAJcAmACXAKEAkgCTAJgApADFAAkBtQCEAIcAtAC2AIgAdQBKAD8ArADFAMAASABGAI0AbwBKAJYANwA+ADoARwA0ADQAOgBHAD4APABNAEAAPQBNAFgAYwBkAGgAZQBhAF8AdQCDAIQAbgBzAHQAbABZAFoAVABGAE0ARgBLAGkAewCnANIA1gDWAOEA6AD7ANoAzQDaAPAAAAEUARABIgFbAS4BKAEkASYBKAEeAU4BQAEQAfQAGgFAAToBQAEjAQwBFAEUAQYBPwFqAWUBUgFgAVoBTgFkAVsBYgFbAX4BeQGAAZ8BxwHaAe0B1wHxAfAB8AH6ARUC/AHjAdYB3QEKAgsCMQImAjoCJQI8AjMCRgIkAjICSAI5AiICGQIVAvwB9AEBAuwBzQHNAbwBtgG2AakBGwAaADAAJABBACwANwA9AEgARgBKAEkAPQBIADwAPQA6ADoAJgAgACYAJwAkACYAKADPANIAugCjAKMAnQCxAJ0AigBvAGcAWwBrAIMAkQCEAIgAiQCAAIIAuwC9AIMAggCYAFcAnQCIAC8ANwBIAEgAJwAnADUAQgBfAG8APAArAC4ALwA3AEkANwA9ADwASABEAEoARQBEAEoAWABlAGIAWgBtAGAAlACXALMAjwCbALEAsACNAIwAgQB/AHkAaQBUAE4ASQBaAGQAfACnAM0A2gDhANIAnwCwALcAuQDNANAA8gAEAQ4BFgEXAREBHAEUAR0BTwE5AQ8B/gAEAQgBEwElAQ4BEQEQAREBDAENAR4BKAEwAUABPQE+AWoBXwFSAWEBeQF1AWcBhAGeAbMBzAHUAeEB4gHrATACAQL6AfEBywHTAdkBBAIOAicCmwJQAj0CUQIUAioCTwI8AlwCMwIsAhUCFgLvAdgBygHdAcMBswHJAZwBkQGKAQ4AIQApADEAXAAlAB0AGgAmADMAOgA3AC4AHAAZABkAGQAPABIAKAAkACAAHQAgACEAHwBvAIsAjgCBAHIAbAByAF4ATwBUAGMAdwBzAHcAdgBsAGgAYQBxALIAywB3AEUANgA3ACcAJwAnADAAMgB4ACcANABQAEIAPAA0ACkAKgAtADkATgBAAEYAPABBAEYAQgBPAEoASQBSAF4AXABnAJEAfgBqAKsA0QC3AKYA7QDWANAAsgCxALEAugCUAGUAVQBDAEIATQBUAE0AXgB3AOMAjgB8AIAAlQCfAKoAuQDUAOEA+ADgAAYBCAH9ABwBKAFQASEBHwHmAOkA/wD9AA4BRAEiAQ8BDAENAQgBCAENAQ0BEgEmAT0BUAE8AWIBfAFsAWoBYwFyAXsBigGeAawBtgHPAd4B5gEaAvYBzgG7AcAB8QHuAfwBHwIdAh4CFwIcAgQCGwIcAhUCPwJcAjICEQLyAfkB1gHRAbUBqgGiAZMBqwGbAXwBcwH4/wYAFQBEACwAywDSANUAdABGAEIAPwAmAA4ADgAOABsAoQAvAGsAFgAcACYAHQAcACwAhwCXAJEAgQB7AHgAcACWAHEAZwB5AH4AewB3AHgAXQBTAE4ATwBJAI8AZgA/ADoAJwAnACcAJwAqACcAJwAnACcAlACmADkAMwAnADUANABDAC4ANAA3ADoAQABCAEcAUABBAEoAWgBUAFIAUgBhAHMAYgBkAHcAnQChAKMApwCwALQAuADTAMoAlwByAFkARgBGAGMAUABxANQA4ACNAHkAcwB6AIgAjQCQAKQAqQCzAMUA3AD6AAIBAgEZARQBCQEPAdwA4gD9AO0AMQEHAQgB/QD/AP0ABgH9AP4A9QDyAAMBGQFMAUMBVgFNAVEBTgFdAXIBegGFAYUBnQG2Ab8BuAGzAcEBtwHRAdsBzgHlAQ0C2wHmAfAB9QEIAuoBCQIbAiYCJQI4Ak0CQgIeAvwB6wG6Aa0BoAGYAa8BmQGFAaIBcwF6AWABDAAbACEAFwCSAH4AZgBVAFAAUwBIACgADgB3ALQApQCpAKEAuQDLANIA0gC3AMUAwAC2AMEAvQC0AK8AtgCyAKcAiwCdAG4AcAB8AIQAiAB3AGgAaQBVAFEAdwCpAIYAdgBDAC8AJwAnACcAJwAnACcAJwAnACcAJwAnACcAKwA8ADkARQBYADcAOgA+ADcASABGAEMARgBMAFYAUwBVAGQAaQByAG4AYwBrAHUAfACFALEAyADDANcA3wDDALcAowB1AFcAaQBzAIMAzADfAKIAewBlAGcAXQBsAHwAhwCeAK4AuwC/ANgA1ADxAP0ACgEeAQAB2ADiAOoA7gDwAPAA8AD1APMA8ADwAPUA8gDvAOsA2QDeAP0ABQEQARwBOwE/AW8BagFyAX0BgwGhAaQBlgGrAaUBsgGsAaIBogG0AboBwwHWAcUBxgHPAdAB2QHrAd4B7QECAg4CLAInAicCBALuAfEBzAHFAbIBmgGDAXcBgwFzAWABWAFoAQcAEgAOAA4AowBgAFQAUQBJAD0AMQALAAYAuACpAKwAnACjAKgArgDDAMEAuwCuAKgAowClAKEAqACmAKoAtQCsAJUApACyAG0AgQB5AH4AdwB7AHYAbABJACAAHQAdAGEAcQBcADIAPgAuAC4ALQAqADIAJwAnACcAJwAnADkAPQA/AEgAWABFADYAQQBEAEAARwBHAEcATgBOAFAAUQBgAGEAWgBmAGMAYwBmAGcAfACYALgAxADDAKEAhgCZAHEA1QCYALUA3wDgANUA1ACZAIAAbgBbAFgAXABwAG8AgACLAJ8AswC9AM4A5AD2AAsB/QDXANcA2gDqAN4A2ADdAN8A2gDgAOEA5ADkAOAA3gDcANEA4wDXANwA6QAOAQcBJQFMAWsBYAFvAX8BdwGCAZoBjwGYAZcBkAGWAbAB0AHAAbkBogGyAb8B0QHmAREC9AH8ARsCDgIPAhAC+QEIAhMCOAI0AgIC0AGoAZgBsAGJAXMBXQFfAWMBUgEBAAkACgAJAAYADgAqAD8ASgA6AEUA/v+QAI8AlACkAJIApACaAJ4AtQCqAJ0AmgCQAI0AhACRAJwAnwCoAKwApwClAJEAtACYAHEAgwCDAIwAhAB+AHYAWQA+AB4AHQAdAKIAMQAxADcATQBYADYARQBeAC4AJwAnACsAMwA2AD8ARwBTADkANwA3AFkAPwBKAEkAQQBPAFMATgBbAFgAWABYAFwAWgBhAFwAXABZAFsAXQBYAJUAkACmAHwAYwCEANMA1ADTANMA1QDTAMgAxwB+AHcAXwBSAEcAXABdAFkAYwCBAJIAqgDIANsADAHpAOcAyQDOAOEA2gDVAOEAzQDNAM8A1QDVANMA6wDXAMIAugDEANIA1ADWAOMAAQEhAT4BQAFBAVkBZgFxAWQBbwFzAXwBhAF7AYkBnwGkAZsBmgGSAZQBoQGuAbEBywEDAtsB9QH5AQECIQL+AQgCDAL9Af4B8wHSAbEBmwGeAbIBogF7AWMBWAFSAV4BAwD9/+P/4v/i//b/BQAXAB4ASwAtAAMAbgBFAIEAkAB6AHsAigCWAJsAkAB/AHMAegBvAHcAcQCHAJ0ApQCrAKEAtAC+ALEAkgCJAH0AdACIAI0AegB/AFcAPAAqAB0AIAAqACAAIAAhACMAIwAlACgAKAAoADMANAA1AD0APgA7ADoAOQA4AEcAQQByADsARwA+AEcATgBRAFMAUABgAGsAYQBiAFoAWwBaAFoAWgBcAFsAWwBbAFoAXABcAF4AbgDIAMgAygDJAMgAxQDCALwAgQB5AG4AUwBGAEcASABFAFIAXgBiAIYApgC9AMcA3ADbAMMA1gDSAM8AzgDIANAA9gDJAMMAwADQAOIA4wDJAL0ADwERARUBGQEbAR4BJgFAAUABOAFEAVsBWAFiAXABaQFwAXwBdgGLAYcBewF7AYABgwGJAZEBvQHWAeUB6AHwARICPwLyAd8B8QH1AfUB6gHaAcwB1QHOAYcBogG0AX0BYgFSAVIBUgFSAdz/5f/u/4IAewA+AD4AIwAlACMAJAAhAAMAOgAfAHwAcABkAIEAbgBoAF8AUQBPAFgAWwBkAFQAWwB2AIgAmAClAL0AzADRAMgAmACVAIkATQA6AGkAHQApADkAJAAdAB4AHQAfACEAIgAiACQAJAAlACYAJgAoADEANAA1ADcAPwBFADoAOQBKAEUAVQA6AEEAQABHAEwATwBPAFcAWQBjAGgAagBoAGQAWQBZAF8AZABaAGAAaQBgAF0AXgBfAGEAuQC9AJ4AqAC6ALcAtQCzAK8AggB3AGgAXABKAD8APAA6AEcAUgB2AJgAqQDAAM8AzADAAMoAtwC4ALEAqgCyANoA3QDvAMcA0gDbAN0A9wAJAQwBEwEUARYBFgEaAR4BKAE0ATIBPwFNAU8BXwE/AVEBawFnAYIBdAFlAXIBgQGQAa4BoQF/AYkBnAG3Ad4B3QHvARkC+AHPAeAB7QHXAdgB0QG5AbEBwwFbAXkBoQF9AWUBVgFSAVIBUgHR/4wAkQAYABwAXQBRAA4AawAuABkAIgAOADcAEwD+/00AbABXAF0AZwBnAGMASwBOAEsARgBFAGkAbwB1AIQAlgCkAKwAsgC4ALQAHQAdAB0AHQAdACIAXwA/ACkAHQAdAB0AHwAhACAAIQAjACQAJQAmACcAKgAzADMANAA3AEIAQgBFADsAOgA6AD0APQA/AEMASQBPAEsAUABMAGwAVABjAGQAZABnAGMAYwBdAHsAfgBtAH4AgACEAKYAYQBiAHMAhgBgAF0AdQCrAKgAqQCnAIoAfwB0AG0AWwBXAEQANQA3AEoAbQB/ALoArwC1AK8AsACsAKgArAChAKAAAAEdASUBKAEbASABIQEfASEBIgEGAQkBDgETAQ8BEwEZASQBKAE5AUABJwE8AVgBWAFbAVMBZQFcAVgBaQF2AYQBqgGzAboBvQGXAZoBpQHCAcwB6AHdAfEB0gHZAd8B+wHwAecBzQGrAZ8BfwGCAWkBagFgAVIBUgFSAVIByf/O/5EAiABHAHwAbQByAIUAfgA8ABIAJQAPACIASAA3AGoAUgBEAHoAeQB3AHAAaABKAEkARQBFAGgAcQB+AI8AngCjAKsAuwAdAB0AHQAdAB0AHQAyACYAJAAdAB0AHQAdAB0AHQAdACAAIwAjACYAKQAtADAAMgA0ADUAOwA5ADsAOgA8ADoAOwA+AEAAQgBEAEgASQBKAFQAXABfAGQAWwBVAGEAaABhAGEAZgBnAF4AXABeAGQAYQBiAGQAYwBqAI4AjACcAKAAnwCbAJgAmgCAAHYAaABoAGkAWQBRADgAPABXAJUAiwCsALEApwCrAK0AqACjALsA8AD8AP8ACQEgASQBHwEZARoBGAEbARgBGQECAQIBBgEIAQ8BFgEWASIBKgE0ASEBMgE4AUIBRgFQAVMBSAFeAYQBrQG8Aa4BvwG8AasBmQGGAY0BigG5Ac4BtwHKAcAB0gHlAQQCFALgAcUBwAGoAaIBeQFVAVIBUgFSAVIBUgFSAeH/1P/I/9L/FQCCAIIAhQB7AHYAcgB0AHEAawA2ABsAIwBsAGAAUgBSAD4APwBWAFQAWwBeAGAAXwBsAHoAiACPAJQAnACpAKQAHQAdAB0AHQAdAB0AHQAdAB0AHQAdACcAKgA3AC0AIwAgACIAIwAkACcAKwAzADIAMwA3ADgAOAA6ADkAOwA8AD8AQABBAEIARwBIAEoATwBNAE4AXABUAF8AZgBjAFcAWgBfAGIAXgBeAGEAXgBhAGQAbABlAGcAZwBrAGsAawBrAG0AawBvAHkAfQCPAJkAlACZAKIApABUAEQAqwCmAKAAogCfAJ8AogCeAJ4A4wD6APQA7AD5APAA9AD2AAABCQEMAQ8BDgEPAREBDAHyAO4A/wAGAQoBEQEZAR4BJAEsATEBOwE5ATkBRAFgAUUBcwGCAYcBjgGbAaABtAGWAaYBmQGIAZEBewGVAZgBuQHUAegB8AHnAfkB7wHpAcwB0wHHAZ8BcQFlAVIBUgFSAVIBUgEBAPr/3v/K/8L/ggBqAGYAWwBdAFwAZABUAGIAawBkAF4AWABUAEkAQgA+AD4APgA+AEQASwBVAFoAZABvAHwAigCYAJ8AswBUAB0AHQAdAB0AIAAeAB0AHQAdAB0AHQBHACkAIAAdAB0AIAAfACIAIQAlACgALgAyADIAMwA0ADYAOQA6ADoAOgA9AD0AQABFAEcARwBIAFAAVQBSAFUAWABaAFoAVwBeAFoAcwBvAGYAXwB0AJsAdABiAGQAZABoAGYAagBrAGkAawBuAG4AcAB8AI0AkQCVAJkAnQCeAKAAogCkAKYAowCYAJsAmQCaAJoAmQCYAO8A5gDoAOUA5wDvAOwA7gDzAAUB/AD+AAcBCgETARgBAAHrAPYAAAEGAQwBCAESARkBJQEqASkBLgEmASIBPgFsAUgBVAFYAYABnQGkAZ8BfAFuAYkBfAFvAZsB2AG7AeUB3QHNAd4BAAL5AeQB5gHdAacBkAFuAVYBUgFSAVIBUgFSAVIBBQAGAPj/VgBvAGAAVQBoAFgAZABgAFcATQBKAE8ASgBEAEIATQBKAEcASgBOAEkASgBKAFYAYwBrAHkAegCCAIwAmgCkALYAHQAdAB8AJQAoAC0AJwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AIAAfACQAJgApACoAMgAyADMANgA3ADwAPAA4ADoAOgA7AD8AQwBFAEoATABQAFEAUwBVAFYAVwBYAFwAWwBdAGYAXABfAGAAYABjAGMAZQBkAGUAZgBpAGwAawBsAG0AbgBvAHEAdAB+AIcAfQB6AHoAlACXAJkAmgCcAJgAkQCRAJMAkwCUAJQAlACSAN4A0gDYANwA3QDfAOUA9ADwAPAA8gD4AAABBAECAekA5QD5AAMBDQESARABCwEZARQBGwEiASMBKQEZATYBTgFhAWoBXgFlAWgBYgGCAW8BagGeAYIBjwGpAakBsQGsAasB3gHpAdkB4gH4AeQB2wHIAdIBwAGTAbkBbAFTAVIBUgFSAQYACQD4/xgAbQBrAGgAaABgAFIATgBTAFIATgBRAFAASQBOAEkATQBUAF8AZABrAHMAagBzAHcAeACCAIkAjwCbAKgAuQCGAB0AHQAiACUAKwAuACYAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AIgAiACUAKQApACwAMwAyADAANgA4ADcANwA5ADsAPABAAEUARQBJAE0ATgBNAFMAVwBWAFgAWQBZAFsAWwBdAF8AXwBgAGMAZABlAGYAZgBmAGkAawBtAG8AbwBwAHEAcwB0AHQAdAB2AIEAhQCGAIcAhQCNAI8AgACKAIoAjACMAI0AjgCNAIsAjwC3ALwAygDHAMgAzgDeAOMA4gDkAOoA7QDcAAMB/wAGAQQBDAELAQkBBwEGAQkBCAENARMBKQE5ATABLgERAS0BQAFOAVYBaQFCAUYBXgGMAVsBbAGhAaoBrAGbAbIBkQHBAbkB3QEgAhoCDwL6AdAB2wHuAeABuAGbAX0BUwFSAVMBUgEFAAgABwAEAFoAUgBCAEYAUQBWAFgAUwBQAFAASwBUAFYAYgBcAGEAZwB0AHwAeAB+AGwAeACFAIgAhgCIAJQApwCvAJEAHQAdAB0AIwAmAC4AMAAtACQAHwAdAB0AHQAdAB0AHQAdAB0AHQAeAB8AIwAlACgAKgArAC4ALwAwADEANAA0ADcAOQA6AD8AQABBAEUASABMAFAAUABTAFcAVgBZAFkAWgBcAF8AYABeAF8AYQBkAGUAZgBoAGcAaQBpAGsAbABsAG4AcABwAHIAdAB2AHYAdwB3AHkAeQB6AHoAfAB9AIEAgwCFAIQAhgCHAIgAigCHAJIApQDDALoAswCsAKwAsgDCAMYAyADMAN0A1wD3AAAB/gAAARABFgH/ABABCgELARMBGwEUAQkBFwEZASIBLQEoATIBNQE7AVUBXgFpAYcBgQFpAUMBbQGDAXEBmAGLAZ4BnAHcAd4B3wH6AQwCGwL6ARcC8AHbAdMBxwG1AWwBWwFSAVIBaQAqACQALgA6ADsAPAA+AEIARwBMAE8AUQBPAFgAYwBoAHUAewCFAIMAhgCGAIEAgwB9AHoAggCHAI4AjQCSAKUAuAAdAB0AHQAdACAAKQApACoAMAA3ACgAHQAdAB0AHQAdAB0AHQAdABoAHgAhACMAIwAmACgAKgAsADAALwAyADMAMwA0AD0APQBCAEMAQwBJAEQATwBSAFMAUwBaAFoAWABZAFoAXQBeAGAAXwBgAGEAYwBkAGUAZwBqAGkAagBsAGsAbgBuAHIAdAByAHQAdQB1AHgAeQB5AHoAfAB8AHwAfgB9AH0AfgCAAIEAgQCBAIEAfgCEAIwAnwCTAIwAhwCLAI0AlgCmALEAuADIANoA6ADxAP4A/wDeAPkA7wD8AP0A7QDoAOcABwH/APcA9gDrABABGgEkASABMwE7ASoBXQFqAW8BWwFjAUwBYwF2AVABagGCAYwByAH3AcUB9wEYAgYC5wHsAegBBgIKAtkBtwGVAY0BaAFVAUwAVABJAEoAQgBDAD8AQgBGAEUARwBNAEMASgBXAGkAdQCHAIwAdwCDAIwAkgCVAJoAmgCYAJYAkwCUAJUAnQClALIAHQAdAB0AHQAkACYAJgAsADEAUwAfAB0AHQAdAB0AHQAdAB0AHQAdABsAIAAkACMAIwAoACkAKwAuAC4AMAAwADEAMgA0ADwAPQA/AEcASgBKAE8AUQBUAFgAVwBZAFcAWQBbAF0AXQBgAGIAYwBiAGQAZABnAGgAaQBsAG0AbABwAHMAcQB0AHYAdgB2AHYAdwB4AHoAewB8AH4AfgB/AIAAgACAAIAAgAB9AH8AfQB9AHwAfAB9AH0AgQCCAIMAgwCsAK8ApwCpAKsAuADNAN8A5ADxAPIA3gDoAPYABgEMAQwBBwHaAOUA8QD4APMACQHtAAwBHQEaARQBEwEiATkBGwEzAS4BYAGMAUIBPQFEATwBQgFdAXoBjAGdAcsB+QHVAdwBBQIVAhACDwL0Ac0BsAHBAXgBUwEzADIANAA7AEcAVQBYAFcAUgBLAEYARgBIAE4AVgBmAHYAhQCCAHcAhQCaAKUArQCtALMAsACyALkAuwC6ALoAuwAdAB0AHQAdACMAHQAkACgALwAhACoAHQAdAB0AHQAdAB0AHQAdAB0AHQAdABwAIQAhACQAJgAoACwALQAxAC8AMAAwADIAMAAzADUAQQBEAEgATQBPAE8ATgBaAFgAWgBbAFsAWgBaAFwAXQBhAGAAYQBiAGQAZgBpAGsAawBtAHAAcgB0AHYAdgB5AHkAeAB2AHcAegB7AH0AfgCAAIAAggCCAIMAgwCDAIEAggCCAIAAfgB+AH0AfQB/AH0AgwCFAIcAiQCLAKYApgCjAKUArwC3AMsA1gDTANwA2QDeAOcA8ADzANQA0ADTAOUA2ADXAM8A2ADtABABJQEkASsBHQEZAREBIwFCATQBLQExAS8BMAEwASgBMAE6AVUBbwFzAdkByQHXAfUB8gENAgMCCALYAcABuwGWAVkBRwBCAD4ASQBMAFEAVgBfAGEAUgBSAFgAXQBeAGgAcgB4AIMAiwCLAIgAjQCdAKcArwC3ALsAwQDHAM0A1gDjAHYAHQAdAB0AHQAdACIAJAAsACkAIgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACEAIQAiACYAJwAoACwALQAuADAALwAwADgAOgA/AEIASABKAE4ATQBNAFQAVABZAFoAZABbAFkAWgBZAFwAXwBiAGEAYwBlAGgAagBrAGwAbgBvAHQAdAB1AHkAeAB6AHsAegB8AHwAfAB+AH8AggCDAIQAhQCGAIUAhQCGAIMAggCAAIAAgAB9AHwAfAB8AIAAgACGAI4AjQCSAJUAmACcAJ0AngDGALsAuwC+AMMAvQDMAMoA0QDPANUA1QDZAN8A4ADkAOsA8ADyAAIBCwH6AP8AFgEnARQBFQEOAREBGAEZARsBHwEiASYBKAExATwBXAGXAfMBAQIDAhMCFAIaAgQC6wHCAZMBdAFgAWUAXwBVAEwATABFAEUATQBpAHIAYwBoAHcAfQCDAIsAkACQAJ4AoACgAKIApwCuALEAswC3AL8AyQDUAOAA7QBgAB0AHQAdAB0AHQAdACcAJwAoACwAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AIQAeACAAIQAjACYAKQApACsALQAtADQAOAA+AD4AQABCAEUASwBLAFAAVQBLAFQAWABWAFkAWQBaAFoAWwBcAF0AXwBlAGQAZgBnAGkAagBrAG8AcABxAHMAdAB2AHoAfQB8AH4AfQCAAIAAgACCAIMAhACGAIcAiACIAIYArwDRAIoApQCVAJsAqwCQAIIAfQCGAHoAgwCJAJMAkQCTAJoAnwCkAKcArQCvALQAuADBAMgAxgDGAMsAzwDTANMA3gDTAO0A8gD6APsA8wD6AAEBCwENAQgBBwEIASEBCQE4ATYBQAE8AT0BQAEnASsBLgE+AUEBPAFDAaMCYQJGAjsCHwILAuwBzwGSAYEBeAFmAGQAWABYAEsATABMAGQAZgB4AHAAeQCDAI4AmwCkAKoArgC1ALUAtQC2ALcAuAC5ALoAwQDDAMYAxgDNAN4A9AAdAB0AHQAeAB0AHQAkACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHwAgACEAIwAlACkAMgAxAC8ANwA7AD4APwBBAEIAQgBDAEkATABMAFEAUgBWAFUAWQBXAFgAWABaAFsAXQBdAGAAZABlAGgAaQBoAG0AbgBwAHEAcgB0AHUAeAB4AHoAfgB/AIAAgQCCAIMAgwCEAIUAhgCIAIkAigCJAIsAhgDcAOYA2gDZAO8AxwCpAHYAewB9AH8AhgCOAJIAkwCaAJ8AowCmAKoArwCyALIAsQCzAL0AwwDSANUA5ADlAPkAAwEPARABHQEeARgBGQEZARgBFgEZAR4BIAEPARQBMwE/ASYBIgEjASYBKgEuATMBNgE9AT8BQAFEAYkBmgE4Ah0CAgIJAuYBpQG3AbUBYQBaAFIAVQBZAFgAWgBkAHEAggB9AIoAmwCmALAAvADCAMQAyADBAMEAwADDAMQAxgDJAMsAzQDLAMsAzADSANsAIQAdAB0AHQAdACUAKAArACkAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACAAJAAmACsALgAzADMANQA4ADkAPAA8AEEARABBAD4ARQBHAEoATwBRAFEAUwBVAFYAVwBZAFgAWwBcAF8AXwBgAGYAZwBpAGkAbABqAGwAbQByAHMAdAB2AHgAewB8AH0AgACCAIIAhQCFAIcAhgCIAIYAiACJAIsAjACMAKEA9ACPAZIBmAFOAR4BvAC3ALwArAB7AIYAggCdAJkAoACjAKoArwCxALUAvgC/ALgAxgDgAOgA+gAJARoBMwFBAUsBTwFZAU0BUgFUAVYBTQFDAUABNwEyAS8BKwEsASgBJwElAR0BKAEpAS0BMAE2ATkBPQFCAUkBSgFPAVcBXgG6Af4B6QHlAe0B6gHoAWYAaABkAF8AZgB0AHEAfwCcAKcAmgCrALAAtwC6AMEAwgDGAMIAvwC/AL8AxADJAMkAyQDFAMgAxgDNAM8A0AB2AB0AHQAdAB0AHQAlAC4AHQAiAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AIAAiACMAKwAtADEAMgA2ADUAOAA6ADoAOQA/AEAAPwBCAEcARwBJAE8ATQBQAFEAVgBXAFcAWABYAFoAXwBgAGAAYwBlAGYAaABpAGsAbABuAHAAcABzAHUAdgB4AHkAfAB+AH8AgwCEAIQAhwCJAIoAiQCLAIwAjQCNAI0AjgCLANMAagGDAS0C1AIqAQwB1gDHAKwAhACEAJEAmQCjALQAzwDSANsA3QDmAO4A8gD5AP8ACAESASEBKQFeAV0BZgFbAVwBaQFcAV4BWgFkAV4BWAFTAU4BSQFAATwBOAE3ATUBMwEzATUBNAEzATUBOAE9AUIBRwFMAVIBVgFaAWABZQG5AS0CAwIcAh0CKAJ4AH0AfgCCAJUAjQCCAJYApACfAJoAoACiAKYAqACqAKoApwCpAK4AtgC5AL4AuwC7AL0AuwC8ALwAvwDCAMgAswAdAB0AHQAdAB4AJAAjACIAIgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACIAJQApACoALAAvAC4ANwA3ADoANgA8AD8APwBCAD4ARABIAEsASgBPAE8ATgBTAFIAVwBWAFoAbgBbAF4AYQBiAGQAZQBmAGcAaABqAGsAbgBwAHIAdAB2AHkAewB7AH8AgQCDAIMAhACHAIoAigCMAIwAjgCNAI4AkACQAJIAjAEGAb4ADwECApICfAGsAewAtgClALQAxwC9AL8AuQC/AMUAzQDsAPYAGgEgAU4BHQEzAT0BUQFRAWsBZAFaAVYBXwFcAWQBZAFoAWoBYwFmAWMBXgFXAVUBTwFMAUIBQAFAAT4BPwFBAUABQAE/AT0BQQFFAUwBUgFaAV8BZAFoAWwBeAGjAfYBGAJzApMCjACPAIQAkgCXAIsAjQCfAJUAkACSAJgAnACeAJ8AoAChAJ4AmACdAJ0AnACbAJ0AnwCkAK8AtACzALMAuAC9AMwAJQAiACAAIQAiACAAIAAiAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACEAIgAnACsALQAvAC4ANAAyADYANAA5ADoAPQBAAEAAPwBBAD4ARABEAE4ASgBLAE4AUgBVAFcAWQBaAFoAXQBfAGAAYQBiAGQAZABnAGQAbQBvAG4AcQByAHUAeAB5AHsAfACAAH8AgQCHAIwAjQCMAI0AkgCOAIwAjwCQAJEAkgCUAJsAlQCgANYAOgEdAgACpAK9Ai4BJgEoARQBBAH6AOoA4gDeANwA4AD5ACkBLgFlAVQBWgFbAVgBeAFcAVEBWAFSAU0BUQFaAV8BVAFWAWMBYQFhAWABYgFkAV8BYAFbAVkBSwFIAUgBSAFJAUkBSwFMAUwBTgFSAVcBXgFmAW0BcwF0AXoBhAHDAUsCygIlA5wAjgCQAJ0AnQCHAJgAmQCNAIkAjgCTAJQAlACSAJMAlACRAJIAkACOAIsAigCNAIkAiACJAI0AkQCZAKIArwDAAM0AKAAkACMAIwAoACgAIgAhAB0AHQAdAB0AHQAdAB0AHQAdAB0AIQAkACgAMQAsAC4AMgA2ADgANgA1ADkAOAA5AD4AQQBBAEEARQBEAEcARQBHAEoASwBOAFAAVABXAFkAWgBZAF4AXgBfAF4AXwBiAGYAYwBuAGwAbQBrAHIAcwB2AHoAfAB+AH8AfQCAAIMAhwCIAIgAiwCQAJEAkACRAJAAkQCTAJUAlgCXAJgAmQC0AAIBJwGsAfQBWwJDAywCpgGDAWcBSwEsARMB/wD2APUACQEdAVYBcwGDAYABdAFdAVwBPQE6AToBPAE+AUEBQgFNAVYBVgFmAVYBXQFmAV4BYgFnAWsBbwFvAWwBbAFuAWoBZgFeAV4BWwFbAWEBYwFlAWgBbAF0AXkBgQGFAYgBmgEMAsYC1wObAJwApACoAJMAkQCaAJUAmACUAJAAiwCNAJEAjwCOAIwAiACKAIgAhwCCAH8AfQB/AHwAhQCIAI4AlACXAJsApwC0ACwAJwAmACYAJgAkACMAIgAhAB8AHQAdAB0AHQAdAB0AHwAiACUAKAApACwALwA0ADQANwA3ADcAOQA9ADoAPQBAAEAAQgBCAEMARQBEAEcASgBKAE0ATgBSAFQAVABbAFkAWgBdAFwAXQBcAF4AZABpAGgAbABuAHAAdgB1AHcAeQB+AH4AfwCDAIIAhQCIAIMAjwCKAJAAjACTAJAAkgCTAJMAlQCVAJgAmgCaAJwAsgDWABEBcQHFAY0C9wIQBFoERALfAbEBbgFXAUoBNQEhARwBLAFjAXoBdgFQAVcBOAE1ATUBOQE7ATwBPwFAAUYBSQFOAVMBVwFkAVsBYwFmAW8BcAFyAXMBdQF8AXwBfAF9AX0BfgF0AXQBdQF2AXkBegF8AYABhQGLAYwBjwGTAZQBuAEKAkICqgCmAKwArACnAKEAoQCiAKEAnACYAJUAlACSAJMAkQCOAIwAhgCBAH8AfAB4AHkAewCAAH8AhACIAIsAkgCWAJkAoQArACkAKQArACkAKAAmACYAJgAkACMAJAAlACUAJQAkACcAKwAqACsAKwArADIANwA4ADkAOQA5ADoAPAA6ADsAPAA/AEEAQwBCAEUARQBHAEkASwBMAE4AUABSAFQAVgBfAFoAWgBcAF0AXQBeAGYAYgBwAG0AdQBvAHIAdQB7AIUAgwCDAIYAhQCJAIwAiwCFAI4AiwCPAJAAkwCUAI8AkwCXAJYAmQCbAJwAngCfAKYAtgDgAEsBwQFMAj8CkQJIA4wEBANsAvsBxgHAAbYBlAFjAWIBTwFNAUABPQE0AS0BLgErATgBOgE8AUABRAFGAUwBUAFVAVwBYgFoAWoBbgFwAXsBeAF9AYQBiAGNAYsBkwGUAZYBkgGQAY8BjwGQAZEBkgGTAZYBlQGYAZoBngGiAaoBywH+AbYAtAC2ALIAsACuAKwArACfAKkAowCgAJoAmQCWAJYAjwCJAIcAgwB+AH0AeAB2AHsAfAB+AH4AgQCEAIEAkQCYAJ0AKwAqACsALgAtADQAKgArACoAKgAqAC4AKQAqACoAKgArACwALgAuAC8AMwA5ADMANwA3ADcAOQA6ADoAOwA6ADsAPAA/ADwAQgBLAEYARwBIAEsATgBPAE4ATgBSAFsAYgBfAGAAXgBhAGYAYQBsAG4AbwBwAHMAdwB+AIMAgACBAIcAiQCEAIwAjwCMAI4AlACOAI4AlACTAJQAlgCRAJQAlgCYAJkAmgCbAJ4AnwCgAKEA3QD+AEkB0QGUAnACigImA60DUAWJBMMCxwLHAkQC9AG4AY8BagFaAU8BRgFCATEBMAE3ATgBPAFGAUcBSgFQAVQBXQFkAXABbwF0AXoBdQGFAYIBjAGUAZgBogGgAacBrwGvAbMBrgGuAawBqgGqAaoBqgGpAagBpgGnAacBrgG0AcoB/QHGAMMAvwC/AL8AwAC5AKsAqgCyAKYApgClAJ4AmgCXAJIAjQCJAIUAgQB8AHwAdABrAHMAfQB5AH4AfQCCAIoAlACaACwAKwAsAC0ALgAyAD0AMgA0ADQAMgAwACoAKwAsACwALQAuAC8AMAAxADMAMQA4ADQAOAA1ADcANwA6ADsAOwA7ADsAOAA+AEEARQBDAEUASABLAE4ATgBRAFcAXABjAGQAZQBrAGoAawByAHIAcgBzAHIAdQB7AIQAggCGAIIAhwCKAJAAlQCPAI8AkwCVAI8AlACYAJUAlACYAJUAlQCWAJgAmgCaAJoAnACfAKIApACoAL0AwwAZAT4B5gE7AuUC0wIKA3QDEwSeBTwH7QaAA38COALkAbMBigF5AV8BRAE3ATkBRAFNAWUBVwFxAX4BWQFaAWIBbgFwAXYBfAGBAYYBhAGRAZkBnQGlAbABtQG+AcQByAHMAdEBywHHAcUBxwHIAcQBxQG6AbYBtQG1AbUBuwHRAfwB0QDRANAAzQDQAMsAvQC+AMAAuACgAK8ArQCpAJ8AnACYAJIAiwCGAH8AeQB5AHUAYwBhAHkAdgB4AHsAgACLAJIAlAAyADAAMgAyADIAMgAzADIAMwA1ADQANQAxAC8ALgAvAC4AMAAxADEALwAxADQANgA1ADUANwA3ADgAOgA8ADwAOwA8AD0APQBCAEIAQgBGAEgARwBSAFQAYgBfAGsAcQB7AHcAdwB2AHQAegB6AHwAfQCHAIAAhgCNAIcAiQCQAIwAkgCRAJMAmgCTAJkAmQCaAJgAlACVAJoAnACXAKIAnACXAJ0AnACcAJ4AoQCjAKQApgCpAMEA/gAwAVIBQAGeAS4CygItA8wDtAMvBNwE3gOJA44CMAL0AcEBugG0AXQBbgFaAV0BZQF0AXcBnwGdAZ8BkAGZAZMBtgGkAYMBkwGRAZMBmQGjAa4BswG+AcoB1QHbAd8B4gHnAeYB5QHkAeEB6wHoAfIB2AHGAcMBwwHFAccB6AEpAuQA5ADfANwA2gDWANMAzwDNAMMAuQC4ALoArAClAJgAmQCUAIwAhgB+AHcAawBzAGEATQBdAF0AXwBjAIQAkQCWAJIAkQByADMANAA0ADMANwA2ADUANQA0ADYANQAyADMAMgAxADEANQAyADQANgA1ADUAOAA2ADkAOQA6ADsAOwA+AD0APQA9AD4APgBBAEgARABIAFAAXABdAGoAdgB6AH8AgwCHAIoAiwCAAIcAhQCJAIsAjACQAJIAlgCQAJQAlgCWAJgAlgCfAKEAowCiAKUAogCkAKEAnwCfAKEAngCfAKkAnQCcAJ4AnwChAKIApQCmAKgAqQCvANAA7gD1AAgBYwFxAawBBwJfApYCwQIIA3YDLARxA6cCPAJAAh4CcwIyAg4C4AHiAZ8BgwFkAYQBvwG4AdYBqAGBAZMByAGYAZIBlwGcAaUBrwG7AcYB0QHaAeIB7AH1AfoBAAIBAgMCCAIbAjACOAIyAiUCEALhAdIB0QHTAeoBMQL0APYA7wDiAOYA5gDiAN4A1gDTAMkAxwC/ALYArQCmAJUAmACRAIYAfgByAH4AeQBxAEUAWQBBAEAAPgCEAJEAlQCOADIAMwAzADQANgA1ADgANgA2ADgANgA1ADUANAAyADMAMwAzADYANgA2ADoAPwA9AEEANwA5ADsAPAA5ADwAOwA8AD0APgA9AEAAQgBJAEEAUgBVAF8AaQB1AIAAgwCJAJAAnwCTAIwAjwCQAJMAlwCaAKoAsgCpAKAAlwCcAKAAmACdAJ4ApACpAKkArwCqAKkApwCrAKgApQCoAKYApwClAKcApwCoAKgApwCmAKcAqACqAKsAqACzAMMAzQDeAAQBIAEzAWcBfQGRAXECiwIyAw4DagO8A/YCbwJsAmACqwLvAm8CewJQAvABrgGJAacBiwF1AYABigGSAZgBmQGcAaEBpQGzAbwBygHUAeMB7gH3AQQCCgIrAjACOwJAAj8CRwJOAlcCXwJgAlECMALsAfAB4gH0AVkC+QD9AO0A7AD1APsA/gDzAOEA2ADVANAAzADFALoAsACpAJUAiwCIAIsAgAB8AFYAVQBCAD0APgA9AD8AbACPAJEAegA1ADQAMwA0ADYANgA4ADgANwA5ADgANgA1ADQANAA0ADUANgA4AD4APAA/AEMAPwBFADsAPwA9AEQAPQA+AD4APAA+AD8ARwBMAEsATwA+AFMAXQBqAHoAfQCIAIkAjwCMAJEAlwCWAJgAmACeAKMAogCpAKMAogCuAKUAowCmAKUAogCkAKcAtQC0ALIAtACyALEArwCuAKwAsgCtALIArwCuALAAsgCvAKwArgCrAKgAqQCtAK0ArgCzALwAyQDXAN8A4QD/ADYBQwFkAZgBsAHwATcCfALUAiYDegKMAgUDQgNdA2wDmwLjAiECxgHQAckBmQGTAccBsQGjAagBqgGuAbEBuAHKAdwB7AH0AQQCFQIoAjwCUQJVAlsCXwJiAmoCawJwAnICdgJtAlcC/QE5AiwC/wEqAv8ABQHyAOYA5ADsAPIABAEGAekAxADRAN8A1QDMAMIAuQCrAJ0AjgCGAIAAdABbAFkARwA9AD0AOgA9AD4AewB+AEQANQA0ADYANQA3ADkAOQA8ADoAOQA4ADgAOAA2ADUANwA3ADcAOgBOAGsAcABPAFUATABWAFcAYgA6ADwAPgA/AD4APgBCAEIAQwBPAFEARgBXAGIAbwBzAIMAiACZALAAuwCjAJ8AqACiAK4ArgCtALIArgCsAK8AwQCtALEAsAC0ALIArgC3ALUAtgC+AL8AuwC2ALsAuAC1ALcAtgCzALUAtAC3ALcAtwC0ALAArgCuAKwArgCwALAAsACzALcAwQDHAM8A2ADhAAUBJAE9AXkBfQF7AY0BvgEUAlgC/QGzAqgDQAT7A+kDZwPwAkIC+QHqAdsB8AGoAcQBuAG6AbsBvwHBAcAB0QHxAfwBFAIcAisCSAJQAmICYAJrAm8CeQJ2AnQCcgJ0AmQCMwIOAhUCSwIiAjUCDQIIAQ0BAQHrAN8A4ADWANgA3ADaAOsA9QAIAQ8BBgHkANMAwgCyAKIAkQCHAH4AegB2AHIAWgA9AD8APgBoAHoAfgB4ADUANgA2ADcAOAA4ADsAPAA6ADwAOgA7ADoAOQA4ADgAOAA6ADwAOABMAIMATQA7ADoAPAA9ADwAPQA+AD8AQQBCAEUARABHAE0ATQBWAFIAWwBkAHAAfACJALMAnwC8AJAAoACrALcAswC9AMMAxwDDALwAuwDMALoAugC/AL8AxADBAL4AwgC8AL0AvgDAAMEAwQC8AL0AugC/ALcAvAC7ALoAvAC9ALsAtgC0ALEAsQCuALEAsgCyALUAtQC1ALUAuQC/AMQAwgDNAOIABwElAS4BMQFFAYEBpQGYASgCGQK5ApUD8gOsBPED9AI7AysC+AHKAbUBswG3AccB0AHVAdoB3AHXAdcB+gEQAiYCMQJEAlkCZAJqAm8CdgJ3AnECXgJSAkUCMwI8AkICUQJCAksCRQJAAiUCMgEVAf8A/QDsAN8A1QDPAMcAygDKANQA1gDjAO8A/AAHAQ0B9wDOALMAmwCRAI4AhQB8AGsAZAA+AC0AeQB8AHwANgBpAGcAcgA5ADoAOwA7ADwAPgA8AD0APQA9ADsAOwA5ADoAOwA6ADoAOQA5ADsAOwA8AD0APwA/AEAAQgBCAEQATgBFAEYASwBPAEwAWgBQAFwAaQB0AH0AfACDAJkAmACdALIAwwDSANwA2ADWAM8A2QDZANAAxwDNAM0AzgDeANAA0QDKAMsAxQDDANAAygC7AMQAxQC+AMUAvQDCAL0AuwC7AL8AugC4ALYAtACxALEAswCzALUAtAC1ALYAtwC4ALgAuAC6ALoAvwDEANsA9AD7AAoBJAExAV8BmwGqASYC9AI0A/ID3gOwBCsETQPpAhECwQG0Ab8BygHgAekB8QH2AfsB9wHsAfsBFwItAkYCWQJiAoIClAKYApYChQJ6AmwCYgJhAmcCXwJXAlECVQJUAlECTgJGAhcBIAEFAfEA3wDnAMsA0gDsAOQA1QDLALcAtwC/AMgA0wDnAAcBCwHgALYAowCtAK4AlQCHAIAAcQBRAHIAfAB9AH8AfABnAHIAOgA4AD0APAA+AEAAPwA+AD0APwA8AD0APQA8ADwAPQA8ADkAOAA8AD4APgBBAEAAQQBCAEEARABOAEYARwBFAE0AUwBZAF0AWgBjAG0AdgB6AIcAkACuAMIAzADHANsA5wD3APIA7gD4AOoA3QDfAOkA3gDrAN0A2gDlAOEA2ADVANIA1QDUANAAzQDGAMcAyQDBAMQAwwDBAL8AwAC+ALsAtQC0ALUAtACyALQAtgC5ALUAtwC5ALgAvAC8ALwAvAC7ALwAvwDHANMA4AD0ACgBSgF+AYEBdQHBAS8CegIGA4MDAQRQBGMEfwTPAsgBtAG+AcwB4wH4ARMCKQI0AicCaQKGAkkCTQJaAnMCkgLBAt8C5ALHAqgCkgKWAosCfwJ9AnkCdAJ0AngCeAJ1AmwCaQLhAOcA/wD3AOUAyAC5AKoAwwDVANQAxgCvAJsAnACfAKcAuwDcAAEB4gC+AKkAogCqAKgAowCeAI4AgQB4AH8AgwCEAIMAggB8AD4APQA9AD8APwBBAD8APwA+AD4APwA+AD4APgBBAEEAPQA7ADkAOwBCAEQAQABCAEEARwBPAEcASQBHAEsAUABPAE0AXQBfAGAAaABtAHgAfwCTAKEAqwDBANAA3wDYAOoAAQH4APoA9AAFAegA+gDvAOIA8wDtAO0A+QDtAPYA6gDrAN8A3ADTANEAyADNAMYAxwDGAMgAvwC/AL4AvAC1ALwAtAC4ALQAtQC0ALcAuAC4ALkAuwC6ALoAvgDAAL8AvwC9AMIAygDVAOEA8AAHAR0BOQFGAV8BigHZAUICIgMEBOwCPwPrAxoEjQWYBDEDOQI6AuICpAOJAnACbwKRAu4DjAR5BHMDJQMLAw8DhANdAzQD/wLUAtAC5gLCAq4CqQKfApkCmwKkAq4CqgKnAqQCyAC/ALUAswDuAOoA1ACYAL0AtAC4AKEAmgCSAJIAlACcAJIAkwChALkA1QDGALAArQCoAMcAyQDDALQAmwCUAJEAiwCLAIsAfAA+AD4AQABBAEIAQgBBAEEAQABBAEIAQABBAEIARABJAEUASwBBAEYATABSAFIASQBGAEoASgBJAEkASQBOAFEAUgBWAFwAYABnAGsAcwB6AIkAoACuALsAxgDVANcA7gD6AA0BHAEKAQQB8wADAfEA/gAAAfYA+AD/AP4A+QDyAPUA7ADmAPEA4ADeANQA0gDPAMgAzADGAMEAvwC7ALgAugCyALMAswC2ALcAuAC6ALsAugC6AL0AvwDAAL8AwQDEAMIAxADJANMA2wDkAPEAFAEMASwBWwGKAewB7gEQA6cELQXJBf4DOAWOBF0EuwT9BNkEtwPAArYC0ALJAq8CvgIOAywEsgXqCGgJeAeACLsIrgbrBdsE6wSyBDUEuwO5A1wDXwP6AhsD6gL4AhgDNANCA8wAyACsAJQAowC1ALQAowCbAI0AngCgAKMApACfAG4AgAB8AG0AYQB1AIcAnwCtALIAxAC/AMwA+gDwAM8AsgCwAKAAlwCQAH0AOwA/AEAARABCAEQARABDAEMARABCAEMARABHAEsATABNAFAAUQBZAFoAdgBoAFIAUwBPAEkASQBKAEwAUABVAFcAXgBfAGYAaQBvAHYAgACQAKAAswDwAAUBIQEoAWcBmQFeAUkBKAENAQEB+AAHAQsBAQH9AAAB/gAIAQcBDAEDAf4A7gDoAO8A4QDfANcAzADMAMgAwgC9ALwAuwC0ALQAtwCwALQAtwC4ALsAvAC8AL4AvwDAAMIAwgDDAMIAwQDJAMoAzgDTAN0A+wAGARABNAFUAW4BlwHcAfYBRgJPA/ICJgOfA3MFwgQaBO4D0gPaA7QDWgTKBFoDYQNrA2IDGwM+A6sDwQXhB/gIKgl7Cq8MsgomCpcJ7Qe+BmoJCgvyB4sK5AeyBoEFYwQHBCIESATAANUAuACTAJAAkgCLAIAAbwB8AGcAhwBxADUAiwCKAGsAbQBhAFUATABDAFwAawCHALAAxgDLAMAA3ACXAI0AOgA7ADsAOwA8AD4AQABBAEMAQwBFAEYARgBHAEYARwBFAFAATgBSAFQAUwBmAGMAZAB9AGIAYQBYAFkAVgBRAFEATABUAFQAXwBdAGUAYgBpAGoAbgB4AHwAjQCDANYAGQFlAWEBxQFKAjQC/QGuAVcBMQENAREBEQEVARIBDgEfARQBCQEJAR4B+QD9APUA9QDxAOcA4gDVANYAzgDGAMAAvwC6ALcAuACyALUAtwC1ALYAuQC6AL0AvgDBAMMAwwDEAMUAxADGAMUAyADPANUA2QDqAO0AJAEfASwBKQE+AVoBdAHBAewBDAIyAogC4AJPA9sD5QQFBCsEdwRxBDME+wPmAxQEDATLA7sDiAMGBJ8FeQcRBXsGhwd4BvsHywfqCUUKpQdyB7oKrQwoCQ8KXQvPCpIKxwlYB3oGtwDGALIAmwB5AG8AbQCBAF4AZgBQADMAOAAmAEIAOQBDAD0AHwAfAEYANQAjADwAVAB4ALUA0wCuAIYAYgBQAHQAegA9AD0APwA/AD8AQABCAEIAQwBGAEgASQBLAE0AVQBYAFwAWwBfAG4AcAB5AHAAcQB0AGsAYgBkAF8AVABVAE8AUQBhAGAAZABlAGUAbABtAHIAcgB6AIAAjgDPAPUA2QDhADYBmwHTAQcCYwKZAWIBLwEiAR0BJQEuASQBKAEpASkBLwEIAQ8BCQH/APYA8QDnAOEA3QDWAMwAxwDAAL0AugC5ALYAtQCzALIAuACyALQAtgC9AMAAwgDHAMYAxgDHAMcAyQDIAMwA0ADVAOIA4wAGAfIABQEvAUkBbQGpAbIB4AEFAnUCmAIZBDQDBwOFA+kDVwQ6BR0GHAYHBgAFUgUqBcMFcQUpBZME9wR7BIUEjgTYBAgFWgX0BRgGMweFB7MH1wiJCFsKdwwwDRQOvw2JDNILzgsTCrkAwACzAJYAigBmAF8AZgBbAE8ANAAsACEAHAAoAC8ALQAhACAAIQAsACwAGgA6ADEATgA0AMEAyACBADYAOQA4ADkAVgA/AEAAQABBAEEAQwBEAEUARQBJAEoATABVAGkAWwB2AHYAdgB+AIgAkwCUAJQAhgBvAGkAaQBcAFkAWABRAFcAWwBhAGQAaABoAG4AbQB0AHkAggCCAHUAegCUAHsAtAD6ACwBVAF+AeoBxgGbAXwBOAE4AToBRwE4ATQBPwEyASoBHwESARIBCQECAfkA7ADkAN8A0gDOAMgAwQDCALsAuAC9ALwAuQC4ALgAvQDAAMMAyADLAMcA4QDIAMoAywDJAMsAywDJAM0AzwDvAPEAEAEHASYBJgFkAXoBqwHdATYCfQLMAk0D0ANMBBQF5QVuB9wHlQyaDAIK/we5B2wI6Qg7CFYHjgZfCvEHeAdcBgsGswdnBo8HvQgkCB0I1AjMCPUHkwmiC20KYA3SDSYO7w1iCcENaA3GALsAuAClAJMAdQBlAGcAXwBXADQAJwAlACMALAAmACgAKwAmAC0ANAA0AAoAAgACAAIAQwCdAJYAVwA3ADkAOwA+AE8AUgBAAEEAQQBDAEQARQBHAEYASABKAE0ATgBQAFMAUQBjAJcAmQCmAK0AqACjAJkAhgBwAGcAYwBcAFgAYABfAGEAYwBiAGgAaABtAHMAhQCNAI8AigBtAG4AeQBRALoA3gD0AAwBRwGxAcYBZAFCAW4BhwGYAXwBYAFYAVMBVQE/AS8BJQERARMBDAH/APAA5ADeANQA1QDOANcAvwC+AL0AvQC/AL4AvADFAMYAzgDVANMA3QDpAAAB2ADMAM0A0ADMAM4AzADKAOYAAQEQARABLQFUAW8BmAGxAb4BBgJYAr0CIgOoAzgE1QSNBR4HOwn4CfYLZwwODFcNVg0KDfUNkAolDOIInwm/DB0KvAeJCHQIMQsXDKsLCA0xDiIMWwukDIYMlwzoDG4NFA5eDtYM6wqzCYsJpAC8ANcA0gCrAJkAhwB+AF4AVwBPAFQANwAuADUAMABKAEAAMwA0ADwAIAACAAIAAgACAAIAfwCAADAAOQBVADkAOwA+AD0APgBAAEEAQwBEAEUARgBIAEoASQBLAE0ATQBOAFAAUgBSALQA5ADfAM0AzwCxAJIAggBwAGUAZQBfAF8AXwBjAGQAZwBsAG4AeAB9AJIAmwCuAIkAYQAWAEgAZACPAKcAwADmADIBKQEPAdsAIwEHAWYBgQFeAWMBlgFxAYcBZgFZATQBKgE3ASoBDAH0AOgA8QDWANUAzgDHAMMAxQDGAMMAxADHAMYAzgDYANgA5gDpAA8BEAHxANAAzwDRANAA0ADTAOAA9QAXATkBSwF1AVIBfgGbAekBwAHiAUACcAKuAk8DBwSgBDMFsQUCB2EMuwzHCjgNeAoFDO8Mgg37DZMOfw1TDLINNAsaCtUN5QuECr0MGg01DFIMdQppC0kMngrlDAYLHwqVCUwJLQm8CPUITgilCKEAtADFANAAywC6AKwAjABuAGIAZQBkAF8ATABLAEsATgBaAEwAQgBLAAUAAgACAAIAAgAKACcAMAA0AEYARAA7ADwAPQA9AD4APwBBAEMARQBFAEYASABJAEsATABNAE0AUABUAFIAVQBsAOoAMwEwAQ8BBgG6AHQAcwBvAGsAcgBWAFsAYwBnAG0AbwBwAIEApgCzAJ8AWwCCAFAAPQAGAPP/aQB5AIMAiACQAIkAlQCGAHUAowDZAOAA7ADiAAwBRwFUAWoBVAFQAVQBcwFGARkB+QDUAM4A7QDSAPUAAwHMANAAywDOANEA1ADXAN8A4wDuAO0A7wDmANoA0ADTANQA1ADUANQA6AADARgBOQFcAWEBawFvAZ0BtwH2AUACXAKvArwDxQNzA34EiAnUCiYMcwonDvELlgmaDGkNrAyQDhkO6QpKDLkKnwoyC8wKnQs7DgEO7wwpB/wIiwhcCzANAwfKDXkMVA0lDVsNcQznC9kMrwuYCuUIBQmoALUAugC/AMUArgCwAJ0AkACAAIIAgQB3AGUAWgBeAFwAXwBBAFAASwACAAIAAgACAAIAAgACADUANQA3ADoAPAA7AD0APgA/AEAAUQBCAEQARgBHAEgASgBMAE4ATgBPAFIAVABUAFUAWABYAGEAcACuAMcAZABdAFsAWwBgAGQAVgBZAF4AagBuAHAAcwB1AJ8AdgB+AGIAXgByAGkAWAAZADwAOgBbAFsANgBJAFsAYQB8AJwAtQDCANgA8gDgALQAAgEEAc4A+wAeASsB4QDGALgAxADFAMsAzgDQAMkA0gDaAOEA2gDfAN8A4ADnAOwA8QDzAPMA6gDXANQA1ADYANgA1gDnAPsAKQE1AVoBagGOAZ4BqwEAAgsCMgJqAjIDAwSOAysEjgS4B8AGugYDCZ8KgAhSCoIJfA3NC5UMaAv4DNALGglqCLAJaAsVDCsOfwwaCO8LqA3iCBoG1geXCEIKFAjFCfIJfAi6CoAM/wxTDVwN6QyzCyYOxwDKAMgAxQC9ALQAqwCcAI4AmgCbAKYAhAB2AGoAXgBhAGkAWwBkABYAAgACAAIAAgACAAIAAgASADIAMwA4ADoAPAA+AD0APgBAAEAAQQBDAEQARgBJAEoASwBNAE8AUQBTAFQAVgBVAFgAWQBaAFoAWQBaAF0AWgBcAFsAWgBXAFsAYgBnAG8AcgB1AH4AgQB3AIkAagB6AHgAdgByAHMATAB2AE4ASgA5AFIAZQB+AH4AfQCJAIkAkwDEANcAyQC3AK4AlwCvAKUAogCmAKwAuQC/AMcAzQDQANkA1gDUANkA4ADcAOYA6wDtAOwA8QD0APkA/QD8APIA4gDYANkA2gDaANoA+gAnATQBhAF/AXgBnwHGAQoCjAI9ArQCpALkAi4DbgMqBEMGzQRwB38MygcUBqMLPQxnDcwNuwv9CIUL6AqXB6UIzgr+DOwOxQoQCsUKagzKC2cJsweDBbAEIQSWBNMDtwRbBcgEzgVaBxAHsgV/CuYLEgxyDNQA0gDeAOMA4QDWAL0AngCPAI8AngCzAKkAiQB8AGsAbgCAAH0AbgAVAAMAAgACAAIAAgACAAIAAgAaADMANgA5ADsAPQBPAFgAQQBBAEIAQwBHAEcASgBLAE0ATQBRAFMAVABWAFYAWABYAFoAXQBdAF0AXQBdAF8AXwBdAFwAZABnAGcAhQBzAHcAfgCFAIkAlwDLAJcAgwCDAIMAdgBiAFcARgA4AIMAfAB3AIoAjgCRAJEAnwCdAKEAnwCsAPEAFgH8AL4AtgC5AL4AswC5AMUAyQDSANQA2gDaAN8A3gDkAOkA6ADyAPEA9QD6APsA/gD+AAMBBQH4AOsA5QDhAN0A3QDbAAYBRQGBAXoBowG+AdYBCQLdAecBQQIUA1QC1wJAA00EeQXUB/cG/QjpB8sIiQyPCuwKIgomCBgHkAvwB/MHvwrjC+ELWA53Cl8IpAe1Bt8GqAgwCIAKBQ2oCMMFZwNnA2cD8AO+A6QEoAY6BO8EbwkACmoH0gnOAMgA8gAGAfAA4QDkAMIApgCiAI4AsQDDAJwAmwCOAHEAeQCOAIkAIQAKAAYAAgACAAIAAgACAAIAFgA0ADYANgBbAD0APQA/AEAAQQBDAEYARgBGAEoATQBNAE4AUgBTAFQAVgBXAFgAWgBcAF4AYQBhAGIAYQBgAGIAXgBjAFQAaABtAHMAdQBuAJAAnQCRAHcAbgBvAJIAkwCQAJYAjwCDAG0AcgDIAJYAnQCmALkAuACyANoAGAEuAS8BPQGLAZcBJgHtAMcAxwDSAMAAxADLANAA1gDdAOAA4gDmAOcA6QDuAPIA9gD7AP8AAgECAQcBDgETAQ8BDQH5AO4A6gDiAN8ACQEhATkBMgFKAY8BmQGbAZoBmQEqAj8CTwIyArICmQTWBo0ImwZeBQ0EWQj6CzEIIwnmBc0FuwZVBmoHCwpMC6oNHgudDHoIwQeZBikFSATwBrAG+gcwCroHRwSzAxkINwWLB5EGuwSNBcUFAAgCCJwJuAjlBRYI7wDgAPYAHQH/AOYA4wDhAMEAsACuAKIAuwDKALQAowCEAH0AigCOAHwAEQALAAMAAwADAAMABwAMACIANQA1ADMAXAA6AD4APwBQAEAASQBNAFMASwBRAFYAUQBPAFEAUABUAFYAWABbAFoAXQBfAGEAYwBiAGMAZgBlAGMAaABvAHkAeACJAH8AegB+AIAAgQB+AHgAhwCWAJEAjwCXAI0AngCKAKgAtgDCAMcA3wDkANIA9wBBAYUBPwKfApQC9QGGASsB3QDYANEA4QDZANMA2ADbAOAA5QDlAOgA7ADvAPAA8wD4APoAAQEIAQgBDgEQARgBHAEYARABDgH7APEA7gDhAPwAJAExAUsBlAF6AWQBdQF6AcYB3AExAvIBJAKIAhEEPgM2A98DcgSrAyoJewY5B+YKowuVB5sJ3gycDWcKvwlkDc4Ixwd2ByoHugUvBT4FswNsBOgGvggQBTAF3QTTCSsLJwtdCqQImApACZIMlQyCDHUJbQnJCCkBGAEMARUBEQH8AO0A6QDDALQAogCiAK4AwADSAOIAtQCLAJEAjgBuACoAGwATABEAFQAQABoALQAvADkANwA5ADoAVQBCAD0AQQBMAFgATQBQAFMAXwBXAFgAVgBVAFYAWABXAFYAWwBcAF0AYQBiAGMAZQBmAGkAZwBpAGgAbgBsAG8AaQBtAIAAhQCDAIkAfgCLAJcAmwChAKYAowCqALQAtQC7AN4A8wADAQoBFAHmAD8BsAFYAjsCZAIwAhQCpwEsAQgB2QD5AAEB/wDqAOUA5wDpAOwA7QDvAPEA9AD1APgA+wAAAQYBCgESARgBGgEiASQBIAEdARUBCwH+APgA5QD9AA4BGwFLAWEBXQFGAVsBZgGUAY4B9gHsATUClwKOAiYDhAO/BC8HpAlFBqsIQAzoCfEKqQr2Ci4J3Af6BiQIOAmaBncGHAYyBeUFNgrZBmAE2wMrBK4D7gZTBpMIQgsIDu4Jdgs7CygNWAvADNMJZQudCkQIaAlEAToBKwHxAPoA/QDwAN8AxQCwAKkAbgCYAMkA0QC8AN8AuACTAIIAbwAlADIALAAmACIALQArACwAMAA7AEAANwA7ADoAOABDAEoAVABQAFIAVgBZAGAAYQBiAF0AYABhAGAAXQBdAF0AXQBgAGEAYwBlAGYAaABpAGsAbQBwAHoAfgCEAIMAgwCNAJ0AowCJAIkAiQCgAKkAqACtALQAtgC+AOIA+AALARwBNAFCAUcBFgFHAYIBtwGqAZcBmAGCAVABOgFQAU8BIwEfARMBCAH2APMA8QDvAPQA9AD0APcA+gD4AAABAQEJAREBGgEiASIBIwEsAS4BKwEhARoBEAH5AOgA5gAIASwBPgFEAUgBQQE9AVIBbwGbAboB1QEHAhwCbAJGA8gEuwQyCKUJ/wWjB8gIcA3xC2kLrguCCwQNvAhhBx0F1gTYBK4EaATkA1wEEwW4A7gCOwTvCDYIXwcDCw4LwQ07CSMG/AeLCIcJ2woECPcHqAY9BTIFxgBbAUYB9ACsAOQA6gDgABcA7//g/28ApQDAANwA1wDsAMMAmgB9AGUARQAuADsALAAoACwALQAuADgAOQAkADAAHQBAAEgASgBTAFUAUgBdAF0AXwBfAGIAZgBjAGgAZwBiAGQAYgBjAGIAXwBfAGEAZABmAGcAaQBsAG8AdgCKAJsAoACUAIwAjwB6AIoAkACRAKkApQCfALMAswDCAMkA7QABARMBGwEkAUYBVQF0AVUBSgHTAY8BcAE3ASoBHgGOAfEBfgE0AZgBWwEvARQBCwH+APwA+AD5APgA+gD6APsA/AD/AAMBEwEXAR0BJQEpAS0BMwEvATEBJgEkARYB+wDnAPMAMAESASwBVQEzASYBRQFSAWkBkgGmAb0B1gHtAVQCNgN5BHkHcgk2CE4H0AkbDiQJdQmLCqcLhgrZDa0I/QbDBXYERAT8A6IDdgPLA50D4gNIAvIDegW/BHkImgfaBqIGNAWJBYYHSAnzCQ0MEwoDCQEHgwYfBwcBDAEQATMB9ABjADMAHAAaABQA7P/c/x4AlwDDANMAFAH2AKUAcwBXADwAPgA+ADgAMQAxADgANAA4AEAAVwBhAHEAUgBSAE8AXABhAF0AYgBgAGEAZgBnAGYAaQBnAGgAaABpAGYAZgBmAGoAWgBjAGUAZwBsAG0AbgBtAHEAdQB/AIAAfgCiAI8AgwCNAJEAlgCbAKkAqgCqALwAwADuAOkA8gAWAUoBsQEGAhwC/AG/AXwB6AE5ARwB9wDSAOoAEAHyANQA1AAUATIBWwEuASABDQEBAQABAAH8APoA/gD6APwA/gD/AAIBCwESAR0BJQEtAS4BLwEuASsBJwEcAQ0B+AALAfgAFQE9ATUBEQE+ATQBZwF3AXABgAGWAawBwwF3AmEDlAQqB+cHBQi4CNIIRweMBv0JCgxIDFoHZQbdBhYFWwS7Az4DdwPxAuYCAwOpAngCXwKyA3wD3gTxBOYEwgR+BDsGRwWVBZkGMQaDCP8HEglhCw4JWwzcAOMA9AAfAS4B5gCLAHIAYQBMACgA/v9uAG0AcQDw/7MAHgG4AH0AYQBSAEwARAA7ADcANQA4ADwAOQBCAOn/wf94AAwATABfAFcAYABnAGQAZQBpAGsAawBsAGsAaABtAG0AbQBsAG4AbwBwAGQAagBqAG0AbwBzAHMAeAB2AHoAfgB5AIwAhQCBAJ0AkACXAJgAngChAKMAqQCqAJgAqQCwAI4A7wA4AXEBoAGvAXABNAFFAToBCQHJALoAoACJAHQAeQCGAJcArQDFAPMAFgEgARABEQEHAQMB/QD5APUA9gD1APcA9wADAQABBAEJAQwBHgEgASUBJwEpASABGgEPAfgA+AD4APgA+AD5ACABHAE3ATsBaAFXAWcBegGRAewBdgIiBIYGXAZfBpAFIwbaBawGWwhZCBgH+ArzBnwFsgM4AzgDCwPwApUClwJKAgoC8wHxASUCRAPsA0oDMQNGAy8DfgRBBAMEfwRpB6oGeAduB/sJHgt8Co4KmACiAJ8AwwD0ALcA3gBwAFIALAAWAFgAXQAmAFUAJgDl/wYA2wCPAGUAXQBJAD0AOwA4ADwALwA+ADUAQQBHADoAAABQAFAATgBcAFkAbABqAG4AbgBwAG4AbwBsAHAAcgBwAHMAcABxAHIAbwBpAHEAbwBzAHEAdAB6AHwAfQB9AIMAgwCEAJUAgwCRAJIAlAChAKoAqwCnAMEAsQClAKUArACXALgA6AAJASsBJAEwAfEA2QDiAMIACQFzAGAAkABwAHAAegCHAJ0AsQDJAOIA/gAQARoBBgEMAfEA8QDxAPEA8QDxAPEA8gDyAPkA9AD5AAIBEQEXARkBGwEaAQkBAwH0APkA/wACAfkA+wD8ABkBKAE7ATIBQwFVAYcBmwHDAcECQgNyBEsF8wOUA1IFUgbOB9AIZgb8BakFdQRSA7EC2AKSAjoCMAL4AbABqwGvAb8BygHVAS4CLAIbAlYCoALQAiwEUwNdBLIGzAYKB8cH3AeiB2EKxAwbDeYAZQB/AFgA1QCyALsAzQBTAB8ANAATABMANwAYAGYA7P/n/9sAowB1AE8ATQBBADUAPAA6AEMASQBZAFoAYABAAF8ARQBfAHAAdQBsAHAAdQB0AHMAdQB0AHAAcQBwAHUAdgBzAHQAeAB2AHYAcwB2AHcAdgB4AH0AgwCBAIUAhgCFAJAAigCpAJAAgwCZAKIAmQCaAKkAtgCvALYAuACrADUBtwBRAUsBYQGPAZwBjwFxATIBJAH6AJcAsQC0AKUAigCNAJwAnwCwAMQA4AACARoBKQE6ATIBSwH2APEA8QDzAPgA+ADxAPEA8QDxAPEA8wDxAPMA+gAMAQkBAgH1APUA+wD/AAUBCAEDAQQBAQH+AAkBFwEjAUMBbwGTAa4B0gEMAlkChgLHArcDZwUZBocKtQo6BmcE1ANMA+ACJQLxAdABwgGcAZ4BiwGOAZcBogGoAbABugHRAeEBCgJbAiUD2wPSAuYCxgNpBKgEGgWdBe4Fjgc/B1sKcgqzAKIAmwB6AGoApQCgAPYAtAAmAEoATwA4ADUAKAAkAE8A6//y/68AgABgAEoANQA5ADYAPgBZAFoAWwBYAGEAWwBuAF0AbwBnAG0AcwB0AH8AegB9AHoAdgB5AH0AfQB5AHoAeQB8AHsAfAB+AHkAewB+AIAAgACCAIMAhwCKAI0AigCMAIgAgACbAIcAlgCeAJ4AogCvAKgArgCuAKwApACrAKUArQDqAE8BpgETAjYCZgJFAq8BKQH/ADgB1ADTAM0ArAC9AMQAxQDeAPIAHwE8AVIBbAFoAUwBQQErAR0BGwEeAQ4BDAEbARAB/QDxAPEA8QDxAPEA8QD1APYA9gD3APsA/wAFAQgBCQEHAQcBBwEFARYBIgE9AVQBgQHDARsCEwPHAy8E8gSbBQAHjgmkCZUHjgSFA1QCKwKtAXIBcwF3AXoBfwGDAYsBlAGeAacBsAG2Ab0B1AE0AocC7QKoApUCzwIhA4MEoQPBA58E0QS7BesIhgpBCogIbAAiAfgAxwCnAMAA6gDYAN8AtwBzAGgAbgBvAFAAMgAVABYA8//MAJEAWwBEAC8AMwA5AEYAYABfAGAAZQBwAHAAZABdAGgAdAB5AHoAfQB8AIAAfQB/AH8AfwB9AIIAgACBAIIAfgCBAIEAhAB9AIEAgwCHAIUAiQCMAI8AjgCSAJIAkACRAHwAlwCOAJ4AnACgAKYApQCsAK8ArwCvAKoArgCvAK8AuADfABIBNwFaAWwBbgFGAfcAwQDCAMsABwEVASgBAQHuAAkBoAFfAXQBawF+AZoB1QFnAkwCEQPbA/EC5gEYArEBgwFfASUBDAEKAQQB8QDxAPEA9AD2APwA/gABAQUBBQEHAQkBCQELAQcBCwEIARYBNAFQAXEBLgItA2MEPQVMCP0HiQdSCY4FXQR5A50CyAGiAW0BcgF0AXYBdgF6AYABiwGTAZsBowGrAbgBygHXAfgByQKYApcC1gLuAvwCWAPpA7QDugV1BNUFngb5ByMKdQskDuoABwH+AAIB6QDGAO0A6wCmAN0ArgCVAG4AggB0AEwASQAuAAMA/P+uAG0ASQBLAD8APgBKAGYAZAByAGoAbQBnAGcAZABvAHAAeAB+AIAAgwCFAIUAhwCGAIkAiQCJAIgAhACHAIgAhwCEAIYAigCKAIkAiACLAIwAkACUAJUAlwCUAJYAlACSAJYAmgCRAKQAoACmAKoAsQC0ALAArwCtAK4AsQCyALQAuQDLANoA7ADsAPMA1gDFAMcAvwCXAJcAAQHhAAwB+AAxAUwBcQGeAfkB7AHJAdsBDQKwAqwDtgMtBEoEigXnBO0DTQKeAT0BHQEPAfwA8QDxAPEA+AD/AAYBCAELAQoBCQEHAQcBCQEMAQsBDwEPAQ4BPAFgAe4BpASwBpIFCgYgBkYGlQQ7A04CFwK0AXQBawF5AYIBiQGLAYYBggGKAZkBpwGyAb0BvgHDAdUB/AFOAkoCiALQAkQDgAOsAyEEggTQBUAHIQaNBUMF7QZJCmsLEg5OAUsBjQEYARgByAD4AC8BwgDoAOEAxAChAIQAiABmAF8ATwA8AAUA/v+CAEIAOwBEAEkAVABhAHEAagBrAHgAZwBsAH0AhAB6AH8AhACFAIgAjACKAIsAiACNAIsAjACNAIoAigCMAIsAjgCPAIsAjQCRAI0AkQCUAJMAlgCaAJsAmgCeAJgAlgCbAJsAnwCOAKQApgCpAK4ArwCvALEAsQCxALIAsgC2ALcAuAC6ALwAvwDDAMcAzQDRANcA0QDXAAkBCQH5ABIBSwGzAcYBwgH1AXsCyQImAj4CeQJ/AqYC4QKEA88EsgenBqQEDwZbArkBbwGPATwBCAHxAP4AAwEKAQ8BEgERAREBDwEIAQkBDAEQARIBEwEQARYBLwHeAZcCPAPbA/YEvwXwA28DjAIgAu8BaAFzAXgBjgGnAbwBrQGYAYsBlQGmAbgB1QHfAecB3wEUAl0CWwKZAggDJAT0AyUEzwRJBXgGLwVxB0kJPAg0B7EJ9gd3DVAKqQCZAXQBPAE7AcgA3wBLAQkBiAAFAeoAyQC3AIcAgABvAFwATQArAAgArABGADoAPwBGAF4AagBuAHQAewB0AHEAbwB+AIQAhAB+AIoAiQCRAI8AjwCQAJEAkgCTAJQAkACPAJAAkwCTAJIAkQCTAJQAlACaAJUAmwCaAJ0AmwCeAJ4AngCeAJsAnwCgAKEAoACiAKkApgCrAK8AsQCxALEAsACzALEAtgC5ALoAvAC+AMQAyQDNANEA1wDeAOMA8QARAQsBHwEgAU4BuAEgAm0CrQLHAjgDowTjBAwFxgPYAvoCiQN7BOcExwS4BMMEjwXiA1UCHgLnAWwBLgEQARIBGgEcAR0BHAEbARgBEAEMAQkBFAEcASMBFAEcATABigGOAigDOwKSAkYClAJlAlsBWwFfAYoBmwGSAaYB9wE6AhsCwQGxAbYBxwHcATACPQKXAvECigIrA00EXgSaBBgEAAWiBbwFgQbCBmkIFQh2Bv0H9whTCjQJyAscChgASAB6AIcAywDNADIBIQEJAcwAmAANAecAyACpAIQAewBhAFYAQAA3AFMAdwA0AEUAQgBDAG0AbQBvAHgAbwBxAHwAZABvAH8AiwCCAIcAjgCKAI8AlQCVAJEAlgCVAJUAkwCSAJYAlwCVAJcAnACbAJoAmwCdAJ4ApACkAKgAqACkAKcAoQChAKQAqACkAKcAogCfAKwArgCyALIAsQCuALQAtQC3ALgAuwC8AL4AwQDEAMgAzQDSANoA4QDpAPMA/wAYARMBIwFCAV4BfgHPASoCmwLCA8ADPwNyA7IDNARqBdUEgAMtA10DdwNeA40D0wNXBWUGmAMPAk8BMAEtATMBLwEuASsBJQEtASMBJgEqASUBLwEyARoBIgEnAa0CqAN/AUwBWAFjAVkBWQFZAVoBbAH7AZAC+gLdAgwDKwP6AjQCGwI9AkgCiALZAqQC3gJ5AwAECQStBPoENwZgBf8ERweTB4kFiwdiCMkIwwebB88Iews+DrEOEgxLADoAAgBcAIcAWADrACUBtgHrAIkAFAHxAO0AxgCkAHoAXgBSAD0ANAA7AIMAOwA8AEIARwBpAGQAZQBsAFYAXgBkAGIAaQB5AGcAfQB2AHYAiACTAJQAlwCWAJYAlACZAJUAnACbAJwAnACeAJ4AoACfAJ4ApgCkAKUArwCzAKsArACpAKsAqACpAKwArACsAK8AmgCvALAAsACzAK4AsQCzAK8AtgC4ALoAvgDCAMQAxwDKAM4A0wDaAOMA7QD2AAIBDQEdATcBQAE7AUkBVgGdAaEB+wEyAjkCRgJqAqIC3QJJA2wDQQM4A9QC4gIpAx4DaAMNBC8EzgP6AUwBTAFTAUQBTgFUAVEBTwFRAVsBXgFuAYIBmgGAAYABPwFAAVwBqgHIAYQBpQE6AmECJwInAuECRANqA94D+gNQA8QD1gPLA90DiwNiAy4DVQNVA5wDeAS7BPwEfQZ0B/8HrAfSBvQH0QrBCGoMnwl+CSoIwAcPCpgM+wwAEH0OdgBZAEQAHAAKADIAKQBgAK0AlQCFALQABQHrAN0AwACOAD4ARAA4ADYAMwAzADQANAA+AEMAWABYAEEAPABBAFEAYABhAF4ARABYAF0AYgBWAIIAlACXAJMAngCZAJwAnwCbAJsAnQCeAKAAowCjAKcApwCnAKkAqwCuALMAtQCxALAAsQCvAK0ArwCuAK8AtwCwAJkAswCyAK8AsACvAK8AsgCzALQAuAC7AL4AwwDFAMgAywDPANcA3wDmAPAA9gADAQsBIQE6AVUBZgFvAXMBfQGIAX4BnwGmAc0B7AEdAj4CagJZAncCUwLIAl8DmQPGAtQC8gIUA8oCpAKeArMBaAFhAXoBjAGbAaQBpwG1Ad0BBAIpAoECcgJnAmICDgITAlQC0gK2A5EEfQUyBb4E5QU5Br4E2wPEA7QD/QPuBOYDtAXMBcgGOgeXB0IFHAe6Bq4GEQUjCl0M5gpvCbMIvAydDUcMKwmVC1IL2g3oCVcLcgr4Ci4QJhA4ELEApgBwADwAOwAuAAwAAgCAAGYAUgD1AAsBBQHxAGcAJgAlADkAJgA2ADkAOwA4AD0APQA8AEEARABHAEgASQBLAE0AUgBSAFUAXABfAGMAZQBcAJQAlACUAJ8AnQCcAJ8AnQCkAKgAngCfAKgAqACqAKsAsgC5ALYAugC6ALUAswC1ALYAuAC4ALoAtwCzALQAtwCtALgAtACyALIArgCxALIAtAC1ALcAwQDAAMMAxgDJAM0A0ADYAN4A5gDrAPIA+gD/ADMBWwG5AdYBEwIoAtACZgKZAZoBmwGlAbgBzAHXAekBBgIVAi4CUgJvAncCxwIRAz0DxAJsAksCEgMZA9sBpQGbAb4B7gEzAvQBSwKXAtkC3gIYAxkDDwNKA88DMgQzBCsEHgSgBJ0F1gbfCKkHVgWZBBcEhgRmBPMEywV0BPgF+wncCOYHKAfnBpAFNgruB2wGXgqRC7UMgw1wDO8Pwg7VCNEJ4wvhDAwPTA0SCd4NRQ2VDh8O9Q+QAIUAdABnAFMANwAlAP//HAAPACsADwAQABMAFwAtACYALwAqADMANQA1ADcAPAA+AEAAQABCAEQARQBJAEwASwBOAFEAUgBVAFUAZABeAGAAXwBoAJAAkACXAJ8AoAChAKIApgCsAKcArQCtALEAtAC2ALsAtgC3ALUAuwC+AMMAvQC+AMAAvwC/AL4AugC2ALkAuACdALQAsACxALEAsQCnALMAtAC2ALoAvgDAAMQAyQDOANUA2wDfAN8A6ADrAPoA7gDcAO4AEwFGAYcBCQLNAQ4C7gHoAe0B7gEMAuYBAwILAgUCHAI0AkcCaQKaAjkDlQRBBeQD5wLzAsYDxQSVA4gD6wK0AiADWgMyA44D+AMJBN0D9AN7BNcE2QS6BJgEZwYuCKMGUgS2BVoGgAYTBxgIRAUsCmcKNwibB04H8wSABssHMQlHDN0L2A1xDrYKOgy3CTMLXw1NEDwQyhD1C40MUA4QDNULdRBmC7cJNQwZD7cORg1oD2ENSQBEAEQAPQArAB0A+/8pADEAOAAsACoAKwAsADIAMQAzADYANgA3ADgAOQA6ADwAPwBAAEEAQQBEAEcASABKAE4ATwBQAFQAVABXAFkAWgBeAGEAZABnAJEAiQCYAKUApACpAKsArQC1ALUAtwC3ALkAtAC7ALgAtwC6ALwAxADKAMIAxQDCAMYAygDMAMUAwgC6ALgArwCtALEAsQCxALEAswCzALMAtQC5AMEAxgDHAMgAygDQANYA1wDeAOMA4QDdANwA4QAdAQ4BHQE3AVoBlgEYAtsCOwMiBPwCOAIHAv0BLAJEAj8CPgJcAnQCkgKoAtgC+QIMAzMDeAO7A/UDQgX2Bj0H1QTiA18EYgWtBTIFYQUfBeQEeQV9BSkFwQXcBZcG+gZdCE0GGQdyCO4LRgwwCW0HgAqLCawMNQxZCwcIHQxXD6MP/Q3BDIgQIRHqDfIJ0gh6DYgQ/A0GEWkRshB8EX8Q3Q7MDtgM8QzuDZoOCw9sDTwNRQ2GC6gAGQANAAsAEQAVACQAKAAtAC0AMQAwADEAMwAzADMANAA2ADQANQA5ADkAPAA+AD4APwBBAEMARgBGAEgATABOAFAAUQBTAFUAVwBaAFwAXQBhAGQAYwBoAGwAgQCLAKEArgCsALIAvAC+ALQAtQC0ALYAtQC5ALoAvAC9AMQAywDIAMoAygDNAM4A1ADSAMsAqwCuAK4ApQCmALIAsQCyALQAtAC2ALgAuAC2AMgAyADJAM0AzwDRANEA2QDaANgA6ADjAO4A9gAeARMBHgEwAVEBjQHjATUCBgNNAjECIQInAkECdAJtAn0CjwKUAqUCyALoAv0CFANtA30EQAfwB94FjwU/BvsGHQjjBYAIYAnmB0sHFgevBtwGVwc5B+0I7whvCjwKwAsKDPULgAwUDKMK7ApVDjkQTw7aCjoIwgqSDLYPggwSDYsRdQ92DWYOBhCoD0YPzRCZD+AObQ8vEM0M1gv4C+cLTAweDFAMhgznDPkNTxD6DIALnAxHAPP/9P8KABkAGAAaAB4AIQAkACsAKAAqACsAKwAsADMAMwA2ADUANwA4ADsAPQA+AD8AQgBDAEUASQBKAEsATgBQAFEAVABWAFcAWgBcAF0AYABiAGUAZwBpAGsAcgB4AGwAowCyAG8AiAC0ALYAtwC4ALoAuwC9AL8AwwDHAMwAzgDRANIA0gDSANQA2QDBALQAsQCwALAArwCvAK4AsgCzALUAuQC4ALgAuAC+AMcAzQDPAM4AzwDQANMA2ADaANkA5gDyACQBDgEHARIBIAE6AVkBhQGUAasByAE3AgYC8wFFApUCpgLFAugC/gLuAuUCBAMtA24D8AQUCLcIVAftCZ0KHwneCZoKeQgnC4YLuwm5DA4OZAzCCGQK7gguCt8LdhCUECkPsA/HD8oQURJaDWUQvxHaD2MRNw/8DAEIpwnUDmYNIg5SERcRJQ6gDoQMkws8D+gMwQy/CsoK5ApMC7gLQQwSDFoMngyyDHQNKQ4xDtoNlAzSD7kPCwApAEMALQAXABsAGgAbACIAGgAkACYAKQAqAC4AMQAtADEAMQA1ADYAOAA6ADwAPgBAAEEARABFAEcASgBKAE0AUABSAFQAVwBYAFoAXABdAF8AYgBjAGYAaABrAG4AcwB1AHYAeQB9AIwAtgC8ALwAvAC6ALkAvAC1AMIAyQDJANEAyADOANYA1wDZAKYAsAC0ALYAsgCxALAArwCuAMkAtQC0ALYAtwC5ALkAvwDCANUAxQDEAMcAyADfAOEA5wD0APkANwEsAQkBDgEWAR0BKgFHAUwBXQFqAYMBrAHKARUCWwIZAwQEOQVrBC4EZQMiAxMDOwOHA6gD0gPnAyEE8QS+BcEIeApRCmMJ3AlZDugNSQ+PDhgNHQ7hDbsLNQ5fDjEOHg9+CxwM8RAADOMNZxCDDrcNxw04DyoO3QxtETYSfBCwDyEQnA3lDCQLiglsCboJiwk3ChQK5QpUC90LnAw1DTAOEQ77DukOZhAlEFoSkxDgEc0OmBDAEikAXwBHABYAEwAUABoAHwAiACIAGwAgACcAJQAiACkALwAyADYANQA0ADgAOQA6ADwAPwBDAEMARQBHAEkATABNAFAAUgBVAFYAWABbAF0AXwBhAGMAZQBkAGoAbABxAHIAcwB3AHYAfQB8AGkAbwCGAJwAngC2AJ8ApgCwAL0AmACiAKAAqgDUAL8AqwCxALMAvgC4ALQArwCwAK0ArgCtANAAugC1ALcAuAC6ALwAwAC+AMEA2wDUANIA1wDiAOoA8AD4AAIBCQERARgBHwEnASUBMQFHAWABbQGSAa8B1QEeAqECbwP9BEgEKgavBrkD2QMRBAUEXwS3BeAFyAWGBeQG1ga8BwoH/AjzB14H0wb6BhwIHgdaB7EHzAllCfwISwydC4IKBQ5kCzYMig/vDgoOvA/9D38N2Q0uELsP/w5LDX4KCQ63DoMPsgz2CGkOiQ2FEGMQORBHDxcQ/g4zEMcSuBC5EgQTZhICEFgQ4RCjEScTXxISEdEQgw/2AGwAGgASAA8AFgAmADAAMQArACkALQAtACsAKQAxAC4AMAAtADEANAA5ADsAOgA+AEEAQgBEAEUASABJAEwAUABRAFMAVwBZAFsAWwBeAF8AYgBlAGcAawBsAG0AbwBxAHQAdgB3AHoAgAB/AIUAhQCFAIkAhwCLAIwAkQCbAJcAmACcAJ4AoACkAKoAsAC2ALgAvAC4AK8ArwCtAKwArQCwALMAtgC5ALsAuwC8ALwAuwC+APEA8QDvAOoA4wD5APUA/gAGARABGQEfASoBMAE0ATcBUwFuAYwBkQGdAcUB8AFkAvECwAIeA2EE9AblBfwFiAeGCDkIIQmlCEoHGQbwCgsLdAo3DioOExB2CdYMfAynCUYNRwqqDKoN+wsMDdAO4xHFEG8NJQ9gDCsNqQ2XCIwOew7gC1IK0wyFDAMOgQpICssKfQnDB5UKaw7FD+AQhBAvEqERmBFNE6QPkBLQE6YVhxaNE0wVahIkEQwR/RGXEmsS8hDpD+ISEwATADQAWQCHAOUBQwFaAFgAVABEADwAOwA1ADAALAAuAC8ALQA1ADYAOQA5AD0APgBBAEIARABGAEcASgBNAE8AUgBUAFUAWABYAFwAXQBfAGEAZQBpAGwAbQBuAHAAcwB1AHcAeQB7AH8AgACDAIMAhgCJAIQAlQCTAJIAlQCTAJsAnACdAJ8AogCsALMAtQC2ALoAtQCyAK0ArQCuAK8AsgC0ALYAuQC6ALsAvgC7ALgAuAC0APwA+gDyAPsABAEBAQMBCgEUAR4BKAEvATcBPgFJAVIBdQGNAZYBsgHNAewBGQJiAoECeQKnAgIDJAP3A70EngUfB0cJGQrOCaAIrgtICv0MiREYDvsL7gm7B0gKfQ8rC3cNTQrEDcMLggzFDbkM8w2LDakLFw0WC0AHCgogCfsLTwsyCuMItAhHDT8J2gaRBxMMpwnYDFoRrBG+EDAOvgr1DBEOCRGjE0QPMRVPE9ERrRISEmASBxA9ECMROxIDEqAS0xByDg8AagDQAB4BMQGAAegA9gAAAZgAcgBRAEoAQAA6ADEAMAAsAC0AMAAzADoAOgA9AD8AQQBCAEMARgBJAEoASgBPAFAAUgBVAFcAWQBcAF4AYQBlAGcAaQBrAG0AcQBxAHMAdgB4AHwAfgCAAIIAgwCGAIgAiwCMAI8AkgCVAJUAmACYAJ4AoQChAKYArAC1ALUAtAC0ALUArwCwAK4AsQCzAL0AuAC7ALkAuwC+AMoAvAC7ALUAuwC0ABABIgEBAQwB+AAXAREBGQEjAS0BNQE/AUcBTwFjAXgBjQG1AbwByQHyAQcCJwIoAjgCWAKWAvQCjgVlBpcHPQcKChMLPA1XD0UOCw5JC/AN4w3sCHsKdgsMDMcOBw/cDXkNBg0hDzMJ3AxuDRQPTgyGC1ILOwd5BQENgApNBk0GUQc+Bz4HFwuwCwQNgw0XDmEN7A7PCo4M9A3wEP8O1hIMDJ4RfRK/EcESHBSdETkSOxIHFLEPSw9LD9oPbRTjEAQTkBFmAO4AJQFGAbwB4AFeAh4ChQKfAT4CaABcAFAAPQAzACsAKAA1ADUAOAA2ADgAPAA+AD4APgBDAEcASABKAEsATgBRAFIAVABXAFoAXABgAGIAYwBmAGoAawBsAG4AcgBzAHYAeAB6AH4AggCDAIYAiACKAI0AjwCOAJEAkwCVAJgAnwCfAJ8AoQClAKoArwCwAK4AsACxAK8AsAC1ALgAtgC8AL0AvQC/AL4AvwDAAMMAwwDAAMYAsgC9ALYACgEtASYBKwEVARwBJgExATwBRgFSAXcBYwF5AZwBuAG/AdAB2QHxAf0BHAI/Am0CsgJVA7UE0QTyBVEK1wznDUMO3gzZDbALBw07DsUN8QwfEA4MFQ45DMYM4A1oDjINGwiADD8NdAqdC/0LjA6pCGEG8QQoBYkHgAlUCxcLRAwIDl0NaAxfDW4O8w5DEqAPuRFYFDkRyBKtFpYQNg3mEpoSgxJgD/QSRhSVExsRSxNVD9YPSw/AD3AQWhEvEjISaQCmANcASQERAqsBvwGRAdkBJAG4AMkAOQMPAWcBNQAsACcAIwA5ADIANQA2ADoAPQBAAEIAQwBGAEgASgBNAE4AUgBSAFUAVwBaAFsAYQBgAGQAZgBqAG0AbgBvAHQAdAB5AHkAfgB/AH8AgQCJAIwAjwCOAIwAkQCUAJUAmACaAJ4AnQCeAKIApgCpAKcAtQCvAK0ArACyALMAtQC7ALkAvADBAMAAxADBAMQAwwDEAMYA2QDLANIA9wAqARAB8wDvAB8BFgEdASYBMAE5AUQBTwFfAWwBeQGTAagBwgHDAdMB5wEDAjACdQLsAp8DNASABDEG1AemDA0OxwypBx4L/QzQB7YJuA8uCu0KYw5rDi8NywdgCR0JnAtjC38H4goCCIQH4w3VCSEH5gbdBIAKMgsJCyELNQwSDagLYgoiCEkLwxB9EDgOhQ7DEBoPGhI7EiYUsBE3Ew0TyxS/EwISVhITE7oRvRNoE50Qaw/2D3EPvhEFEwoSsxDyD3MAngD/ACsBfAFXAYkBfQEvARsBCAFXASABtAEhA9kBcwA0ACgAJgA2ACsAOQA6AD8APwA7AEMAQwBMAEsATgBQAFEAUwBXAFoAWABcAGAAYgBjAGQAaABsAG4AcQBxAHQAdwB4AHsAfACAAIIAgwCHAIoAigCOAJEAkwCWAJcAnACdAJ8AowCjAKQApwCpAKoAqQCsALAAswC4ALcAuAC8ALoAwADCAMYAyADGAMYAxwDHAMgA2gDLANoAywD0APQAGAEGARgBHAEkASwBNgFBAUkBWAFoAXkBiwGdAagBvAHEAd4BFAKRAkYDWAS0BvQIDQeoCbgIegoCDIsK5wfVBhIGLgz2DBMJ3QnMCpELMwkgB2cGPgiNCyoLsgqzCLsHKAgvCzwIagdfBW4IvwnRBp4G7wqDDjwLIgd7CWkL4Q7eCvULow1GENEOxgsqEbQPpw6MEwcUcxGpFMAUXhOVE50TkhPqE5sSABEZEmgPtg92EUgTExLjE+cSfBCDAMIA6gAQAVgB5AGZAYEB0wFZAYABeAFoAZQB0wE4ArMDjwGXADwAPAAxADwAPQA+ADsAQQBEAEMAQQBJAEwAUQBUAFQAVgBaAF0AYABjAGEAYgBkAGcAaQBuAG8AcgB1AHYAewB6AH0AggCEAIcAiQCHAIoAiwCNAJYAlgCYAJkAmgCdAKEApACmAKcAqQCpALEArgCuALUAtAC5ALoAwgC9AL4AwADGAMYAyADJAM0AzADKANEA0ADuAOUA6gD/AB4BAAEPATkBHgEmAS4BOQFAAU8BYgGBAZwBqgHLAdcB2AEDApwCaQOOBAYIcAmiCVAJUwnVC3QMNw8ACFoHqQQSBwoJowhHCHAINgVNCYEFgwXFBPYGQQcGB4QGvAVwCFkLVAeABlAF4wo4B0EJpgokCWoJwQaTCG0J6guOCgQP/g6aDOUMfQxfEeMQSRDPEbEOCA8qCyITghMQEwUQbw/0DnURmRHfEl4QrA9gEk0RShFpEeUQpxHvEBoQeACcANIAewGXARgCCAKuAQwC6AEiAlkBXgHkAYUCmQL4Au8DiAV5AfUAVgA/AEYARwBIAEMARgBAAE0AQgBOAE4AVwBVAFgAXABhAGAAZgBjAGcAaABrAG8AcABvAHQAdQB3AHkAfQB/AIQAhACDAIgAigCOAI8AlACWAJUAmQCdAJwApACmAKYApwCrAK4ArQCuALAAswCyALcAvAC6AMEAwADGAMMAxgDIAMcAzADOANAAzgDQANQA0gDcAOsA3QAtAR0BHAETARsBIgErATUBRwFfAWMBfAGhAcUB5gH4AUECpgLUA68DBgRGBboFowaeB4EJ5gpGCLcJ4wg2B8oDxgbgBVgENQQFBEYEWATTBAUEqgP8A/4DqgMBBckG9QXsB5YIFgQZCqgGVQbwB4wJnwgdCaIL4AtrDZwNdw1XD88PxxBuDscQFg8QESgQAQt7DNgQuw7ZEJUTlBS6E8MRohLaDHYR0A5aDyUPkBFoE30RNxPcEcwSNRJwEIsAzADmABEBLAFlAXgBUAEvAXEBKwHMAQQC3QImA4YDjQM9BHkESwaZBdIBywCFAHcAZwBeAFUARwBLAEsAUQBUAFYAUwBVAFoAWwBfAGEAZwBpAGwAbABuAHMAdQB3AHkAfgB9AIEAgQCHAIUAhwCLAI4AlACVAJcAmgCcAJ8AoACnAKcAqQCuAK0ArgCsALMAsQCzALUAuQC1AL4AvAC9AMIAxQDIAMYAygDKAM4A0ADRANEA0QDRANUA3ADqAOoA/AAxAQcBDAEZAR8BJAE3AUgBZQF8Ab0BzAHpAVwCjALnAuECMQMcBKkEfQeuCN0JUAl/CMoIwww1B6oGBwVzBEwD5QKpAqwC0ALNAz0D5wLXAt0CIQNYA/8DTwTIBQAHXQcnBAMHDgUqB40H8gccCfcI/wxqC9INAQ5TBkgLKAjgDSUN6hDOESoQ5gr9Ck8OIRLjEbsP4ROdFXAXWBWeEOAO3RHGEjARmA8qE4ESFBN2FHITqhC4EG4Q/xFyAJIAzwB7AWQBJwFAASsB6AARAQQBGgFaAWsBqwECAhkDMwNWBLgEfAWPBpMErgLwAIQAewBxAGMAXwBkAGEAXwBeAFcAUABZAFwAXwBkAGUAagBuAG4AbwBxAHYAewB9AHwAgACEAIMAhgCHAIoAjACTAJcAmgCcAJ4AoACjAKYAqQCtAK4AsACxALQAtAC1ALcAuQC4ALgAuQC9AL0AvwDCAMQAxwDIAMsAzQDOANEA1ADUANUA0wDWANcA9wDlAOUA+QADATIBDQEYAT4BSwF8AYUBrwGlARACBwKLAp8C/QJWBNwDGATbBGIFCgZ4BlEI1wccDCoHNQmVCQMFNwNXAjcCPQLiAuADEQTtA1QENAM3BEEFjQSgA38E6AKmBfwEYAcvBKgFVgY5BvUFIQinCn8Kcw24DF4H9wpXDDcLxQeJC8EPWA7WBxIQ1BCvDXwK0w0FEqIPNxFVEFwQrQsdDhwRchCtEhkRtRPGEywTEBN9EzITrhMTERkPfwC3AMUAzgDKAMgA8gC3AMsANAGQAYoCLQMLA8ADUwOnAy4E7QNBBaEGkAWHBVoEgAXSAdMAmwCAAIIAfAB3AHIAcQBnAF8AXwBeAF8AZgBpAGsAcABzAHQAdgB6AHoAfQCAAIEAgwCIAIkAiACNAJAAlQCZAJ8AogChAKYAqQCsALAArgCyALQAtgC4ALoAugC6ALcAuwC8ALoAvAC9AL8AwgDEAMcAxADKAM0A0ADRANMA1gDYANkA2gDZANsA6QDrAO0ACgEJARwBYAEpAUkBZgGAAccB6gEzAn8CUQPvAk4D1APVA0wE7AQHBlIGSgWpCScK4gaiBYUHQQWhA28CEgL+AZACZwNCBE8FtwX3BFkE2AQxA3YCTgWVBZoDFwR1BPQESAT7BPoEjQUKBugIXghuC+QHmgVEDm8L0gd6DVISkQgJCAgJSBDqDXAM8hBxE8gQ5A4MEO8LcQr+DMkQ1hHVE4MTFg+PDtgNlxK/ERQSLRBGEUIS/BKDEXUAhgCGALkAiQCOAIwAnwDRAFEBBQIMAi0CfgIMA/0CcAMgBBEEpwQvBOoEOgb9BqQE+QP+Ak4C+wChAKYAmwCRAIEAdAB1AHEAagBmAGUAagBtAHAAdAB2AHsAewB9AH0AggCDAIYAiACOAI4AkQCUAJgAnQCgAKMAqQCrAK0ArwCzALUAtwC5ALwAvwDAAMIAvAC6AL0AwADBAL0AvwDDAMIAxADJAMoAzgDTANMA0wDWANcA2ADcANwA3wDeAN4A4QDtAPAA+gAnAQABFAE6AV8BbQGNAaoBGAKFAogCWwODA3gEAQXrBT8HUAcBBUcElwXBBI0EJgXuA/QCYgIaAvUBIQLmAoUD+QRiAhMEJgVKA4UDUAJQAqQDcQT3BL4FxgPzA5MEIgUVBdUF/wZFCsQIYws+B64KZg8aDSUKNw3vEGQQyQtBCN0LPA2YEPcPLA4rDLcRZA7jDMAPVhPsEIMNwgxiEqITCRMoE+kQNhBSEIwSBxKuEFgRfQ5ZAFsAYwBhAF4AuADdASgBRwElAn0BNQJ1AkUDnAOyBFAElwS/BOsEWwWaBFgFBAbPBfgFRQTaA28CtAHbAMQAwwCsAJcAjQCBAHwAewB0AGwAbQBzAHgAeQB7AH0AgACCAIIAhwCJAIsAjgCTAJIAlgCcAKAApACnAKwAsACyALQAuAC5ALwAwADEAMQAxQDIANMA0wDIAMIAwwC9AL4AwgDEAMcAygDMAM8A0QDSANcA1wDYANoA3ADeAOAA4gDlAOQA5ADlAOYA6AADARsBHwEvAUIBWwGOAekBMwKlAu4CPwMrBGYFMwV/BxoHhgfXA8oDpAMxAyUDBwNfAggC4AHSAYwC0wM2BKkEvwKlBWEDSgI2AuUBOAXaBVgDsAI+AxIE3AKWBC8EHQWkBPoH+AegCpYJkQdJDBQMfA/qDOYPeRLaDqYKdA0QDh4NGxC8DggL4w9BCsYOwAxWEdcRQBTXEnkUUg9jEp8T5BGhE1URLRGXD8sQcBBTDuUQPwBHAEsATABPAGcAewCUACEB3gGrAVECmQJSAmgDGAPKA+kDCAR2BREFOQZ6BUQGSwbCBY8EKgQfBNgDGQJTAxQB1wDBALQApQCWAJAAgwBzAHcAewB+AH4AfgCAAIMAhACHAIoAjgCSAJIAlgCYAJ4AogChAKYAqwCuALMAuAC6ALwAwADCAMQAyQDPAM8AzwDPAMwAzQDKAMwAyQDNAMkAxgDIAMsAxwDRANIA1QDWANsA2QDcAN8A4ADiAOQA5gDpAOkA6gDsAOoA8gAFAREBHgEwAXUBoQESAhgCFQPrAyUEJAScBN4FowXcBxsEOAOLA9sDrAJwAxgC4gHYAb0BJwIHA9oEewUxAtwDYAaWA8IBngETAjIElgLyAmkCKgQBBJkCFQO1AlMEuwXpB9oEfgVACjcHUg1GDWEM3A4GEQUN+AyNClMPmA5JEA8J7gi7EUIPwBKoDrMSeBPZE8wRoRNyExcSFBLdEIETGhIrEzkSixLtECcRtw+6DzUAOQBOAGIAcACCAI8AlgDsAMYA+QBIAXwBhAHwAs8CvQLxAjsE7wS1BJIFVgWiBPcE3QUfB5AGZwi7Bt0ERwONAlQBHAHqANQAzwCxAJ4AhwCBAIUAiQCJAIgAiACHAIgAjACOAJMAlQCaAJsAnACfAKMApgCqAKwArwC1ALoAvwDBAMYAxgDJAM0A1QDYANYA0QDWANQA2ADZANUA1gDXANYAzADKAM0A0ADUANYA2wDdAN8A2wDdAOEA5wDkAOcA6gDrAOwA7wDwAO0ADgEEARABGgFlAXAByQG9ATkCsQJ1A3YDzASqCLUH6gRxAwQDwwJMAqEC6gHOAdABoQEUAlMCQAPkBAADeQLxBo8EPwKVAakBbAJ6A9QCMQOKAugE2gISAmMCmgL+A4cHOQa5A8ULQQwSDFIMJAy2DSYQAxC2D0QMtQjkCIENMwq4EGgRZQ0pDicSKhJnEwYTfBKTEksQxRBJEAATCRRwE4wR+xGMEFcRMRHiEA8RixE/AFYAcgCGALAAEgEOAgUBFgGCARcCigNsBBkC6QHNAXECYQMlBDcDnwNYBDwEYgSEBEMF4AXHBQkHJgkrCewK4gdjBFkClQHBASgB6wC9AKQAkQCTAJcAlwCVAJQAkwCQAJEAkwCYAJsAnQCgAKEApACnAKoArQCvALIAuAC8AMEAxwDIAM4AzwDTANYA3gDbANwA3ADcANwA6ADpAOQA4QDgAN4A3gDTANQA1gDaAN8A4ADiAOQA5QDmAOcA6ADoAOoA6wDvAPEA8wDxAPEAKAEBATEBzQGWAc8B0QE0Ag0C8QJFAlUHPwixBLkDIwNPAqQC2QGqAbYB0gGEAQ8CGwKpAqEDhwTyAT8D/wXkA4oBkwGpAdoBewK9ArMCiQICA1YC2QEGAv4ChgYBCF0I/wNFBzQL1wtXDdkNeBASEVQNlAstENMNfhF1Dr4IxgwnEyUTgg8BEIoQZBKlE/EQiA7IDsMPLBDxD/UPjhC9D2UPSA+TD8YPjxBaECMSUwCAAB8BfgFhAWsBfwHYAeABjAOcBGwEIQNQAocCagI/A/QBGQInAqICxwJFA2UEmwX8BREGywZuBjkH7gZeCH8JKwl0BH0DZwOwAjAE7wEhAbIArACwAKsApACkAKAAmwCVAJgAmwCeAKIApgCmAKgAqwCvALIAsgC0ALkAvgDCAMgAzgDTANcA2ADeAOQA5QDhAOUA5QD6AAUBCAELAQIB7gDpAO4A7ADtAOQA3QDiAOcA6ADqAO0A7gDuAOwA7QDsAO4A7wDxAPQA9gDyAPQA9wATAUABhgERASABWgHvAaQB3gO9Bx4FmgMlAxcC8AGAAYUBjQHJAXoBxAHxAT8CvgJ9BlMCHANJA2ECNANxAYgBjgESAs4BZAJ1AvMBUgLMAQYC4wK8BMsFfAbtCHYHSwOCCWALBg26Cn4NTAs1C1YLIREjDwcR1wo5DWwR1w76CmEP7w/GC1cN/gy9EHcRVhMjEQARrg+BD/MOvw8qEX8TaBFmEMsQ1hDYEFMAYwDsABsBXAHqABIB2gFwAikDAwS2AwsDBwN1A1cDNgRTA1EDwAPoAoEDzQUrBJMDVQXzBAQFegVGBnUGXgfKB6gImwaMBrwFmwRyA+IDWQJNAvAA0ADHAL8AtgCwAKgAnwCcAKAApACnAKoArgCvALMAtAC1ALgAuQC7AL8AxADKANAA1QDbAN0A4QDmAO0A7ADuAPcACgEYARwBIwEiARwBDwH3AAcB9wDqAO8A6ADrAO4A8gD0APYA9QD0APYA8gDwAO0A7wDxAPcA9gD7APwA/QALAQMBCAEMARYBYwFKAWgBtwT7AqYCDgJ6AWgBYAFoAb0BgAFuAdkBTgLyAXsCSwPoAZQCSQOiAQECcAHeAZUB3gHYAYcCDANkAhgCJALmAQECqgJ0AqkDtAcGBFUGaggYCpEKVQsmDboJVBC7DOoPqAyrD4sIFhCvDgwRJg4pDy4RaBNhE5cS1BDxEZURfRF5EeoQow96D74QZRI3EucSihF9EXcRbhEzAEcAbgDgAI8AqgCGAaICAQVHBaIEjQRQBA8FfAXBBXMEbQNeA2MEaQRxBDwFKwQ2BcwDkgS/BdEEHgVeBV8IkQZ6CAsHTgdcB+MF/wPuAlUCQwJuAR8B6ADfANIAxAC4AK4ApACkAKgArQCxALMAtgC3ALoAvQC/AL8AvgDAAMQAygDOANUA2QDcAOUA6wDxAPgA9QAIAR4BKQE1ATwBMQE7AToBKgEVAQ0BCQH7APkA8QDxAPgA+QD7AP0A/QD+APoA+gDzAPMA8QD1APYA+AD9AAIB/gABAQQBAwEKARcBIgFTAVYCjALJAV8BRgFCAUIBTgHjAV8BnQFPAo4B7AFYAn0CMQLfATwC1QFaAYIB7gGxAcoB6gJkBvkC5gHMAccB1gFbAuADBQWbBo8EdAXPCbwJOwhsCugK5QxVCuANagx1DVkRqhCoCOoIowzZDycQORKAEdMRFBADEDIRaBHdD24RkRE+EscQWxKDEcIR9xH8EZEReRFMElYRHAAlADwATwBkAMcA5gK6AiECJgSdB8sGoAbzBjQG1wU/Bt4GfQdIB/MH8AdzBdkEpwXTBQUF5AU6BDQEVwS3BIIF1AUaCBcHCAiICLAFswOxAjYC+gEDAlQBJQH8AOkA2gDGALkAsgCvALIAtQC6ALsAvgDBAMIAxgDFAMQAwgDEAMoA1QDaANwA4wDqAPEA9gD6AP4AEQEpAUABRQFTAVEBWwFdAVABOwEoARcBGQERAQkB+gD4AAABAQEGAQQBAwEFAf8A+gD5APEA8ADzAPUA+gD7AP4ABgEEAQYBBAEIARIB1gFHARkBHwEZARgBGwEwATsBSQFEAVwB3gF4AbABhgJ8AfwBlgFwAsoCTQFyAaQBJQLKAUoCXwIfA2wCrQG0AcsB4AP1AyYGYQhzCKUH/Aq2CqkMOwteCh8NSAqoC0QOBg93DdMMownzDBQPlxFMEdcPChGDENMOSw+KEIsR4RGVE6ASTxNOEGIPJBABETMQkRD1EDsRixEsEhIAHwApAEEAfgDAAZYEbwa0BGYF8AO/BPgEBgYpBicF/QQFBbkEeQW5BpwI/AVxBoIHqwgyB2AG6QW8BJoEjwSZBAQFvAbnBmsHpgcnBwQH1APQArQCDgM3ApUBawE3AQYB5wDVAMsAvwC6ALoAvQDCAMQAxQDJAMoAzADJAMcAyQDdAOAA6ADvAPQA9wD7APoA/gAAAQ4BNAFLAVgBZAF2AX8BdwFzAXABXAFNAT8BNwEnARsBDgEFAQoBCgEQARABDgEGAQQB/gD9AP0A/wABAQYBBgEJAQABBgEPAQwBDAENAQ0BEQETARYBGwEdASQBIwE9ATgBQAEuAVABOQHuAU0ChQGjAZEBsAFTAUsBeAFaAVMBUAFWAWQBegJFA6UBswFeAswDdATpBlUIgwaPB70HOwaHCB0JYgsxDYEKwQqYDMkNRw8iEXkJcRFAD7YMRBKUDfMNOhClDzIQ+A8FEIESjxD2D5kO5g9WEAISoRJxE74TFRNvEKsSwxIaACIALgBPACgB3wKcA2cEtwWWBrwFYAU2BqwFHQbmBbYGyQa4BMcEIAe2BzoG7QUYBsMGOgmKCOYH4wWpBQQF0ASyBCIF+AUFBz8GNQdLBzAFXwX0A1wD6gKfAiAC1AF1ARcB/QDpAM4AxQDEAMMAyADKAMwAzQDTANMA0ADQANcA5ADvAPkAAAEEAQsBDQEPAQwBCQEfATIBTwFnAXgBhgGYAaEBmgGQAYoBcwFgAWIBTgE9ASwBHgEUARMBFgEZARgBEgELAQcBAwEDAQMBBAEIAQwBDQELAQ4BEAESARYBFAEYARoBGgEdASABIQEjASUBJwElASsBNgEwAS8BUwEjAnABZgFuAVIBSQFEAWEBSQFUAV0BZwFrAaEBbAIXArwBeANhBN8EkQYqB6gF7QSBBpsGygTtBuII4wpkCzwMYw27D28P+A6cDAIO4Q8gD40M5gt5DVAObw8pEqoSMBVoEgYPFxGoEkATPRQBFKoUWRRlEgIS9xFEEzUSJABJAI8A3AH7A4YEfgUVB/IFuAUxBsoFGwUDBecEFQXLBT4EzAPEA/ID/wMIBCYEdwRtBVcGdwZACTYJ7geuBo8F1wU5BR0FYAUoBmUIighzCaAHQAYcBjAFqQM0A70CngIAAkYBAgHiANMA1wDRAM4A0QDUANUA2wDbANgA1ADaAO8A+QAKARsBGwEdAR0BIQEiAR4BHQE6AVgBcQGLAZwBrQG3AbgBuQG5AawBngGLAXwBcQFZAUMBNwE0AR4BIQEjAR8BGAEUAQ4BEAEJAQsBDwEQARABEgERAREBFgEVARgBHAEeAR8BJQEnASMBJAEoASkBKQE5ATIBOgE4ATYBtwH+Ak0BYQE+AUABYAFuAXcB2wE0AiUDgQGIAaQB9gEBAvkCiQRNBWEGSggIBc0EdAe0ByYFNwWMB3UH2grEDPMMUA/8DU8N7A6KEZISkA6bEYUOlxCrE80ULxWoFXYSOw7pEicRihFvFI0VVRSMEhYR1w8YE+cRcRMlEioAbQJpA2kDfwabBtoGYAZIBm0F/AQWBX4ENAS5A5EDjAOWA6IDKwTWA9YD9wM8BJMEqwQVBaIHDwj8COcIgwgLBz8HyQc+Bj0FawVlB0gH5gd5CXQK1wqrCHwGDwbLBLYDCQObAsgBGAHsAPEA6QDgANwA3ADeAOMA4wDiAN8A2wDzAAoBFwEkAS8BLwE6ATcBPAE3ARgBTAFWAYABoQG6AcwB2wHfAeEB4gHYAdMBywG7AawBkgGCAW0BVgFKAUsBLwE0ASoBJQEjAR0BDwESARUBGAEYARgBGAEXARoBGwEdASEBJwEsATEBNAE0ATQBMwExATEBLQEvATMBPAFEAUgBVwFHATsBSAFOAU8BawGKAaMBIAI5A8EBpAETAm4CaANPAsEE8AY2CLIEigPGBa8GOQjGCO0JbgnRBf4FRgpiDU4P3g/oDv0NzhAgFCoS6xBtFNsTag9RDsoK1wr6C3sLMBBsEesSahO5DdQMrwzcEC8OGQ+TEM8QUhTiA5ME6gU0BScGIQaEByQGJAW9BLQE8gR/BagDgwN9A5YDywPGAwkEUwQaBPsD/gNCBJkEMAVgBcAFFgaSBlMHnwcqB5IHsAd3BfsE1QRyBdkFJwfrB3gIxAioCaYJ6waVBTcEqgTNAjsCOAEXAQIB9wDuAOQA5wDqAO4A6gDmAOMA+AANASQBMQE8AUEBSQFXAVkBTgEkAVgBbgGCAasBzQHmAfsBAAIKAg0CBgINAg0CAALuAeMBzwGjAaIBkQF6AWEBXQFBAUIBPQFdARQBLgEhASEBJgEnASQBIAEiASYBKAEqAS0BOAE8AT4BQQE/ATgBNQE4ATYBNAE8AUABRQFMAUcBSAFQAbEBbgFgAVwBhgGaAfUBBQIsAvMBiATYAv8DawRVA28DCgQnBE0EMwbnBoEHYArTCqYKIQitB/EMJwppDmkQvxHvCa0P3BFyFCYOPRK/DwQL2Q6FEtkRaxGDEd4QXRIzE64SQhT3ErwOCBOrE6AT7RIvFB4Q8gTsBKYK3gdRBxMGRAVRBfYEWgV2BCgExQNzA3ID3gPHA+UDwAPdA+gD+wMHBFkEeARPBFkEfgTtBNsF8QVKB/MGlgaMBiUGwwVeBdQEmASrBNQE4wXSBmsGzgc6B+oI/AVtBVYDFgNQAuIBMgEgAQ4B/wDwAO4A8wD2APQA7wDoAPUAFQEsAT8BTwFYAWMBbwFxAWIBMgFmAYsBogG4Ad4B/AEUAiUCPAI7AjwCTwJVAlYCZgJUAjICRgL/AdwB9QHgAX0BbAFYAU4BRgFEAXcBcAE3ATgBOwE2ASwBQAE6ATQBNQE4AT4BRgFLAU0BSQFFAUEBRwFGAUsBWQFrAWABWAFNAVkBVgF0AdcBrgJxAW4BdgF+AcMB8QLcA/8FuAIpA8ME9wQhBC4GkAXvA+oGsQjCCE8K3grfC9EJ9wlIC9kLrA/cEKYQmQ6BDBgUJhL6D90Khw3DEvwV+hJSEy4Q8hHaD7MT7w4sD8IONg5LEr4PcBDlEEcUcxOLDm8JYgZjBvcFlAUqBa8EaQQNBPEDuAOaA4kDdQNyA4wDswM0BKoEtARmBGwEWgROBDYEKQRiBHYEfQS3BHcF8gWsBdoFGgZQBmsJdgeBBugEqwRxBFgEtAT5BLUF9wX1Bn0IjQYvBB0DxQLuAt0BYAEmASQBCAH4APwAAQEAAfkA8AD7ACgBOQFMAVoBZwF3AYkBjQGAAV4BdgGyAdUB8QH6ARgCKQIwAm0CcAKSAn4CdAKJAoYCngJ6AsICdwJkAjACPQLyAXMB8QGeAQsCXAGuAZsBYQFYAVkBkwH1AZ0BbAFQAU8BSAFUAVABXgF2AXABcgGJAasBrAJCAgsCvgGQAWQBVgEGAnMBewEcAk8C3AOLAX8BmAGrAeQBoALaAh8DKwNgA7IFcwZ3CIEJfAZWBZoL3gxdCccNDRBMCkYKcAmsDZAObw+BDZUMsAqGDdQMPAwaEY8RGxTfEbwQkhN3DWkSHhGxD50QFhTNFSgU7A3UEYAVOhSiE0MRMA0DBowF0AZdBeEEjwQ3BPMDzAPXA/8DKAT0A3wD6QN0BJkEpQUnBiEHoweNBTUF8QS/BHYEUQRIBH4EvAS4BDsFgQX7BUgGHQa+B2YIsQiWB0cG2gSOBD0EWwRNBKwELwXVBa8GJQWkA6ECcgLPAkICGQLxAaYBHwEDAQkBEAEHAQABBAEjAUwBXQFkAXQBjAGmAa8BqwElAeIBFAL0AUECUwKVAo0ChQKZApECqgLYAsAC3gK+As4CtQLKAk8CZgJXAh0C7wF9AXYB1wG4AY4BrQGmAcwBogF4AYEBlgEBArIB7gEnAigEmwN3BCMEkQL3AXICswNfBUcH6QaEBT8D9QWSBcMCCQJuAxYCDwIbAggD7gLEAZ4B/wGKAhgExwSeA5QFkAY8BkYG/AZzCBgONwrWCVIK4Az6EKUMEwleDCEMCw/XCqkQKQvHEAMRyhKXEdkUXRSwF7IQ2Q6AC8YNig9bEYMN7Ap1DtwU9xCVEmoSERJHEucRyw3ND1QPhwV0BVAF+gSvBHAEXwT6A/YDLwTvBEcFVAXGA2MD/QMOBG8ECwXcBsQHCQiwBlwGzgVLBQMFzwSXBHcEkwSiBNMEngXWBp4FrwbHBrcJiwgUBo4FGQWPBCsE7QMuBFQE5gRqBUUGnwRAA5QCugMCA90B3QHLAcoBQAEWAR0BEwEIASIBMAFdAXABegGIAaoBugHRAcoBrQEtAcUBVQLcAo8CCAO6AsgCGAO1AvMC1QIqA+wCJQP4AgIDyAKYAmECJgL/AaoBigH4ATICzwH3AewB/QEdAuYBpAGMAmQChAIyAk8C3AI4A3EEVwNeAhYCQwLIBQAGNgk5B3IFBQRgAwYD6gL9AikDYgNKAg8CzQJFAjoDWgOzAQwDcgMJBTcFowSCBJMGLAm0CZsHoAmzDvEIOwviDdEMYw+rDFQItQwICxcQWBHRDdwP9BFHEQETVhRTFk8VgRMcFpcNmQ3AC2IPdw09DpoRdhJzDgQNzg4VCs8O4hLFEUsNgQk4EB0F/QSFBdEFVwWrBIgEnAS/BJ4E/wTyBGIEgATQA0gDawOeBA4EEwS9BGYFgwhRCu8HuAYsBy0G8QUbBeUEywTUBN8E4gZeBWAFmQZbCVQKtAjTB3cGUgV4BAUExQPrA5gEhQSRBFkFsQXHAxIDKQOLAjUCrAGGAXABLwEtAToBKAFOAVcBbQGKAZYBpAG3AdwB4wHWAboBUQH7ASgC2QLyAhED+gIeA+8C5AIuAyEDKQNlAzADAAMXA4ICfAJpAgwCEAK7AaUB8AHpAf8BOQIqAh8C/QH0ARQCGAJXAnYCsQLgArsCBQRkA8MCmgIaAusCkQW3CH4JkAipB74FUQQaBDED7gWnBDEFDATSA+oCmwIbAlMC7wE1BL4EMQVuBJ8E6AYbCoINuQvZCAMN7QxTD+EN1w9ZEzkSGg0KDTMQiQ3IEk8SPw5CD/ERJRLLEPwWCxi8EuATmgstD3oKsw+sC0cQlBGNEW4SOxKiDPsKow3ADQ8QqxCvDfcOWhLrBKAFoAZhBicHUwYRBzAGRQWcBEkExARhBJgDHwMhAx8DIAM2A1wDlwPlAzwEvQQ7BecEngTtBEkFhQUZBUgF5gWdBdMEeASeBMIEOAUbB2gLNgsnCFcG8wReBNgDowOPA+oDfwT2BIYEzQR/BHEDlgJDAskBggFuAU4BpQFaAWwBgAGBAX4BrgGhAcEB3gHqAQIC6QHhAW8B2gFPArQC4ALQAkcDHQM6AxsDPQNSAyIDLwM3A7cCiQJsAloCSgIqAiMCJgIBAmwCfgJrAmcCiwJqAjICZgJQAioCUgLQAhIE+ATxBEkE+QMBA/oCdwIiBN8EkAU1B7wH2gZaBlwFFgS/A64D1QY3Bg8FXQTvAxADLAL4AeQCngRKBGIFZgWzB8ANNgjrDqIRQg1ICF8OJxC0DTgTWxJsDR0MQwsEFMYP8hInDg0T9A7ZEkQPTA3XFLoULhGYENsIpQhHDcsMpw6eDxsSsA5IEQ4TFBK8EQkKNBHmDu0QAgh3DdERoAUSBksGuQUpBrQG1AbmBcQERAT/A74DtQM/AxwDGgMdAyMDKAMtA0MDaQNqA38DhQOMA7EDvAPCA+IDCARdBHoF+wUWBXgEWQR2BKUE+wQmBssHrAr3B5gGXAU4BNIDwQN2A1UDhQPXA/8DjgMaBKwDqQJYAuEB0gGdAVMB6wFmAuYBtgGUAbYBwgEsAuoBGwIiAroB1AGXAXMBSQILAjgCtAIWA6cCDQNjA6ADJwMVA2cDLwOhAnUCaAIpAhQCfgIAAqUCygJRBI8EDAPkAvAC5wLnAuoCBwOqAnsDbQP/BFkFnwQVBDAEjgTeA74CZQOFBBAFsgX7BZIGxQZYBeUFSgXqBRIFugRABb4D7wXbAgwCLAJEA+4FxQRmBQwHkgtSCX8Jqg7ADJsJBQjPCM0LlhEJE3ATkA+SE3YKNhErE/0Q+Q4eE4wSSRE6EWML/BEmEycNeAl+C1sOphGOC+QRtxFGECYSKQ03DigNLQ4VDmkLNxA/Cm0LExHuDWwEkgTiBFoF0gWLBg8GFQVlBAUE6APqA6wDfgMXA1IDIQMlAyoDOAM0AzwDRQNPA18DdQOUA7kD2QM5BP4D/AMMBHYEiwROBEcEVARpBJ0E3wRaBaYHbggoCPkFEAUeBN8D1gOJAz0DEwMXA/ICzQJSA/4CqQJHAnACCgJsAf0BbgLhAfcByAHOAcwB8gH4AQoC9QELAtcBxAFPAfIB6gFCAmoCnALKAmQC8gLfAtEC8AIgA/8CRAMVA+4CXAONAlcCmwLmAs8CJAM6A7EDeAObA/oDbwQ4BCUE8wO6A7sDbgOrA+0DEwR0BMEDbgNGBMIDSwSqBJsF9wY4BycHgQeqB1sHtQiTBlQG5QYvBkMDngLGAocDmASkA8QEBQizCHkKMAczByEKwA+VEL0KJBGbDhoOqxJSEyMRPw7LEocP4hBTEvoPSRA+DggSYRA0DfsN5hD9DYALlA+jEVsOoQ9XDzcRQxDEDswLAxOgEgkNWhGiEaIRwxHTD1wITQcuBFAEiATpBJIFgQapBfAEmQTABAgFrAR2Aw4DIQOXA4EDXANqA2oDeANZA2MDgQO8A8sExASsBJgEjASBBG0EPwQ4BEcEYARzBIIEjgSQBJcExARQBcoF2gWlBRgFswRCBPYDvAOEA40DigNlAxkD6QIaA0YDrAL8AekBMwKcAdoBKAIJAgIC+QH1AQsCrAIUAmYC/AGjAcYBZgFLAbUBPQI9ApgClAKrAosCyQLbArgC7gIVAzED/AL0AqwCyALLAtwCZgP1AssDxAQHBT4FuwUzBzgHrAerBgEIQAWqA0cEeAR9BIcESASYBJEE5gUyBpgFTQWmBswGygerCNgIiQmnCZcHywZyBx4J5ghWBEYCHwMwBf4EWQTHBMgGZgjgCsUGXAecCewLjxHUDW4RvA86ED8ToA+xC40M/w23C2QR1RAIEQsShg9fC3YJKQtQB2oOLQn2DncQuhLwErwSaBDbEW0TIBPsEJES+xBzERIRpg+iEQEREw6gEPcP";

R.kbg_ozbekiston = async (sahna, ctx)=>{
  const S = asos(sahna, ctx, {rx:.78, ry:0, rxMin:.15, rxMax:1.45, zoom:1.0});
  const g = S.g;
  const U = UZ_DATA;
  S.nomlar = {qizilqum:'Qizilqum cho‘li', ustyurt:'Ustyurt platosi', fargona:'Farg‘ona vodiysi', turon:'Turon pasttekisligi', tyanshan:'G‘arbiy Tyanshan tog‘lari', hisor:'Hisor tizmasi', zarafshon_t:'Zarafshon tizmasi', turkiston_t:'Turkiston tizmasi', nurota:'Nurota tog‘lari',
    hazrati_sulton:'Hazrati Sulton cho‘qqisi (4 643 m)', mingbuloq:'Mingbuloq botig‘i (−12 m)', amudaryo:'Amudaryo', sirdaryo:'Sirdaryo', zarafshon:'Zarafshon daryosi', orol:'Orol dengizi', toshkent:'Toshkent', samarqand:'Samarqand', buxoro:'Buxoro', nukus:'Nukus', termiz:'Termiz'};
  const CX = 64.5, CY = 41.5, K = .42, KC = Math.cos(41.5 * Math.PI / 180), VK = .00011;
  const X = lon=>(lon - CX) * K * KC, Z = lat=>-(lat - CY) * K;
  const LON = x=>x / (K * KC) + CX, LAT = z=>-z / K + CY;
  /* balandlik to‘ri */
  const bin = atob(U.h64), NX = U.nx, NY = U.ny, HM = new Int16Array(NX * NY);
  for(let i = 0; i < NX * NY; i++){ const v = bin.charCodeAt(i * 2) | (bin.charCodeAt(i * 2 + 1) << 8); HM[i] = v > 32767 ? v - 65536 : v; }
  const dLon = (U.lon1 - U.lon0) / (NX - 1), dLat = (U.lat1 - U.lat0) / (NY - 1);
  function hS(lon, lat){
    const fi = cl((lon - U.lon0) / dLon, 0, NX - 1.001), fj = cl((U.lat1 - lat) / dLat, 0, NY - 1.001);
    const i = Math.floor(fi), j = Math.floor(fj), a = fi - i, b = fj - j;
    const h00 = HM[j * NX + i], h10 = HM[j * NX + i + 1], h01 = HM[(j + 1) * NX + i], h11 = HM[(j + 1) * NX + i + 1];
    return (h00 * (1 - a) + h10 * a) * (1 - b) + (h01 * (1 - a) + h11 * a) * b;
  }
  const yH = h=>Math.max(-.02, h) * VK;
  function pip(x, y, p){ let c = false; for(let i = 0, j = p.length - 1; i < p.length; j = i++){ const xi = p[i][0], yi = p[i][1], xj = p[j][0], yj = p[j][1]; if((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }
  /* niqoblar: O‘zbekiston ichi, Orol tubi (1960) */
  const ICH = new Uint8Array(NX * NY), TUB = new Uint8Array(NX * NY);
  for(let j = 0; j < NY; j++) for(let i = 0; i < NX; i++){
    const lon = U.lon0 + i * dLon, lat = U.lat1 - j * dLat, k = j * NX + i;
    ICH[k] = U.dav.uz.some(p=>pip(lon, lat, p)) ? 1 : 0;
    TUB[k] = pip(lon, lat, U.kol.orol1960[0]) && !U.kol.orol.some(p=>pip(lon, lat, p)) ? 1 : 0;
  }
  const W = X(U.lon1) - X(U.lon0), Dd = Z(U.lat0) - Z(U.lat1);
  const blok = qatlamBlok(g, {nx:NX - 1, nz:NY - 1, x0:X(U.lon0), x1:X(U.lon1), z0:Z(U.lat1), z1:Z(U.lat0), qat:[{nom:null, mat:mat('#2b2622', {roughness:.9})}]});
  blok.ust.userData.nom = 'yer_uz';
  const GIPS = [[-50, '#2e7d5b'], [0, '#3f8f4a'], [150, '#7fae5a'], [300, '#c9c07a'], [600, '#d9b06a'], [1200, '#c28950'], [2200, '#9a6446'], [3200, '#8a7a72'], [4300, '#eef1f5']];
  const cA = new T.Color(), cB = new T.Color(), KUL = new T.Color('#4b505a');
  let rejim = 'relyef', orolH = 'hozir', belgi = null, yozuvlar = !S.test;
  const idx = (x, z)=>{ const i = Math.round((LON(x) - U.lon0) / dLon), j = Math.round((U.lat1 - LAT(z)) / dLat); return cl(j, 0, NY - 1) * NX + cl(i, 0, NX - 1); };
  function rangF(x, z, y, c){
    const k = idx(x, z), h = HM[k];
    let a = GIPS[0], b = GIPS[GIPS.length - 1];
    for(let i = 1; i < GIPS.length; i++){ if(h <= GIPS[i][0]){ a = GIPS[i - 1]; b = GIPS[i]; break; } }
    const t = b === a ? 0 : cl((h - a[0]) / (b[0] - a[0]), 0, 1);
    c.set(a[1]).lerp(cB.set(b[1]), t);
    if(TUB[k]) c.set('#d9d3bf');
    if(rejim === 'suvlar') c.lerp(KUL, .55);
    if(!ICH[k]) c.lerp(cA.set('#262a36'), rejim === 'orol' ? .35 : .64);
    c.convertSRGBToLinear();
  }
  const fH = (k, x, z)=>k === 0 ? yH(HM[idx(x, z)]) : -.18;
  function qur(){ blok.yangila(fH, rangF); }
  /* chiziqni yuzaga yotqizish */
  function yotqiz(pts, qadam, dy){
    const o = [];
    for(let i = 0; i < pts.length - 1; i++){ const [a0, a1] = pts[i], [b0, b1] = pts[i + 1]; const n = Math.max(1, Math.ceil(Math.hypot(b0 - a0, b1 - a1) / qadam));
      for(let s = 0; s < n; s++){ const t = s / n, lo = a0 + (b0 - a0) * t, la = a1 + (b1 - a1) * t; o.push(new T.Vector3(X(lo), yH(hS(lo, la)) + dy, Z(la))); } }
    const l = pts[pts.length - 1]; o.push(new T.Vector3(X(l[0]), yH(hS(l[0], l[1])) + dy, Z(l[1]))); return o;
  }
  /* chegaralar */
  const chegM = fmat('#ffd36a', {emissive:'#b07a00', roughness:.4});
  U.dav.uz.forEach(p=>{ const v = yotqiz(p.concat([p[0]]), .04, .012); const c = new T.CatmullRomCurve3(v, true); const m = new T.Mesh(new T.TubeGeometry(c, v.length * 2, .013, 6, true), chegM); m.raycast = ()=>{}; g.add(m); });
  const qoshM = new T.LineBasicMaterial({color:0xc8d0e8, transparent:true, opacity:.55}); qoshM.userData.env = 1;
  Object.keys(U.dav).filter(k=>k !== 'uz').forEach(k=>U.dav[k].forEach(p=>{
    const v = yotqiz(p.concat([p[0]]), .06, .01).filter(q=>q.x >= X(U.lon0) - .001 && q.x <= X(U.lon1) + .001 && q.z >= Z(U.lat1) - .001 && q.z <= Z(U.lat0) + .001);
    if(v.length < 2) return; const geo = new T.BufferGeometry().setFromPoints(v); const l = new T.Line(geo, qoshM); l.raycast = ()=>{}; g.add(l);
  }));
  /* daryolar */
  const suvM = fmat('#3aa0ff', {emissive:'#0a3a7a', roughness:.2});
  const daryolar = [];
  const daryoQur = (pts, nom, r)=>{ pts = pts.filter(q=>q[0] >= U.lon0 && q[0] <= U.lon1 && q[1] >= U.lat0 && q[1] <= U.lat1); if(pts.length < 2) return; const v = yotqiz(pts, .04, .014); if(v.length < 2) return; const m = trubka(v, r || .013, suvM, Math.max(8, v.length * 2)); m.userData.nom = nom; g.add(m); daryolar.push(m); };
  (U.daryo.amudaryo || []).forEach(l=>daryoQur(l, 'amudaryo')); (U.daryo.panj || []).forEach(l=>daryoQur(l, 'amudaryo'));
  (U.daryo.sirdaryo || []).forEach(l=>daryoQur(l, 'sirdaryo')); (U.daryo.norin || []).forEach(l=>daryoQur(l, 'sirdaryo'));
  const ZAR = [[70.6, 39.28], [69.9, 39.33], [69.1, 39.38], [68.3, 39.45], [67.6, 39.52], [67.0, 39.68], [66.4, 39.88], [65.7, 40.05], [65.2, 40.08], [64.8, 39.95], [64.4, 39.82], [64.0, 39.62], [63.75, 39.45]];
  daryoQur(ZAR, 'zarafshon', .011);
  /* ko‘llar */
  const kolYasa = (p, m, y, nom)=>{ const sh = new T.Shape(p.map(q=>new T.Vector2(X(q[0]), (q[1] - CY) * K))); const geo = new T.ShapeGeometry(sh); geo.rotateX(-Math.PI / 2); const me = new T.Mesh(geo, m); me.position.y = y; if(nom) me.userData.nom = nom; g.add(me); return me; };
  const kolM = new T.MeshStandardMaterial({color:rang('#1d5f9e'), roughness:.4, metalness:0, emissive:rang('#0a2c52'), polygonOffset:true, polygonOffsetFactor:-2, polygonOffsetUnits:-2}); kolM.userData.env = 1; kolM.envMapIntensity = .25;
  const orol60 = kolYasa(U.kol.orol1960[0], kolM, yH(53) + .004, 'orol');
  const orolH_ = U.kol.orol.map(p=>kolYasa(p, kolM, yH(53) + .004, 'orol'));
  ['sariqamish', 'chordara'].forEach(k=>(U.kol[k] || []).forEach(p=>kolYasa(p, kolM, yH(hS(p[0][0], p[0][1])) + .01, null)));
  /* 1960 qirg‘oq chizig‘i (hozir holatida ko‘rsatiladi) */
  const q60 = new T.LineLoop(new T.BufferGeometry().setFromPoints(U.kol.orol1960[0].map(q=>new T.Vector3(X(q[0]), yH(53) + .012, Z(q[1])))), new T.LineDashedMaterial({color:0x9fd0ff, dashSize:.04, gapSize:.03, transparent:true, opacity:.9}));
  q60.computeLineDistances(); q60.material.userData.env = 1; q60.raycast = ()=>{}; g.add(q60);
  /* shaharlar */
  const SH = {toshkent:[69.24, 41.31, 'Toshkent'], samarqand:[66.96, 39.65, 'Samarqand'], buxoro:[64.42, 39.77, 'Buxoro'], nukus:[59.61, 42.46, 'Nukus'], termiz:[67.28, 37.22, 'Termiz']};
  const shM = fmat('#ff4a6a', {emissive:'#8a0a22', roughness:.3});
  const yozlar = [];
  /* ustun: 0 — shahar va nuqtalar, 1 — suvlar, 2 — yirik hududlar, 3 — tizmalar, 4 — qo‘shni davlatlar (to‘qnashsa kichigi yashiriladi) */
  const USTUN = {toshkent:0, samarqand:0, buxoro:0, nukus:0, termiz:0, hazrati_sulton:0, mingbuloq:0, amudaryo:1, sirdaryo:1, zarafshon:1, orol:1, fargona:2, qizilqum:2, ustyurt:2, turon:2, tyanshan:2, nurota:3, turkiston_t:3, zarafshon_t:3, hisor:3};
  const Y = (m, x, y, z, nom, o)=>{ const s = yozuv(m, Object.assign({px:24, olcham:.092}, o || {})); s.position.set(x, y, z); s.userData.k0 = s.scale.clone(); s.userData.ustun = nom && USTUN[nom] !== undefined ? USTUN[nom] : 4; s.userData.op = 1; if(nom) s.userData.nom = nom; g.add(s); yozlar.push(s); return s; };
  Object.keys(SH).forEach(k=>{ const [lo, la, nm] = SH[k]; const y = yH(hS(lo, la)); const gr = new T.Group(); gr.position.set(X(lo), y, Z(la));
    const st = new T.Mesh(new T.CylinderGeometry(.006, .006, .12, 6), mat('#e8ecf5')); st.position.y = .06; gr.add(st);
    const sh = new T.Mesh(new T.SphereGeometry(.03, 14, 10), shM); sh.position.y = .13; gr.add(sh); nomla(gr, k); g.add(gr);
    Y(nm, X(lo) + (k === 'samarqand' ? -.2 : .02), y + .2, Z(la) + (k === 'samarqand' ? .04 : 0), k, {rang:'#ffd0da'}); });
  /* relyef obyektlari: [lon, lat, rx°, ry°, yozuv] */
  const OB = {hazrati_sulton:[68.17, 38.95, .18, .14, 'Hazrati Sulton ▲', 69.0, 38.95], mingbuloq:[63.1, 42.1, .25, .2, 'Mingbuloq ▼', 62.7, 42.35], fargona:[71.6, 40.75, .9, .35, 'Farg‘ona vodiysi'], nurota:[66.2, 40.55, .55, .22, 'Nurota tog‘lari', 66.0, 40.85],
    turkiston_t:[68.6, 39.72, .5, .14, 'Turkiston tizmasi', 69.2, 40.0], zarafshon_t:[67.4, 39.3, .55, .15, 'Zarafshon tizmasi', 66.5, 38.9], hisor:[67.9, 38.62, .45, .3, 'Hisor tizmasi', 67.25, 38.2], tyanshan:[70.3, 41.75, .6, .45, 'G‘arbiy Tyanshan'],
    ustyurt:[57.3, 43.7, 1.2, 1.0, 'Ustyurt platosi'], qizilqum:[63.8, 41.9, 1.8, 1.0, 'Qizilqum', 64.4, 41.45], turon:[61.6, 43.3, 1.2, .6, 'Turon pasttekisligi']};
  const OBT = ['hazrati_sulton', 'mingbuloq', 'fargona', 'nurota', 'turkiston_t', 'zarafshon_t', 'hisor', 'tyanshan', 'ustyurt', 'turon', 'qizilqum'];
  OBT.forEach(k=>{ const [lo0, la0, , , m, lo1, la1] = OB[k]; const lo = lo1 || lo0, la = la1 || la0; const y = yH(hS(lo, la)); Y(m, X(lo), y + (k === 'hazrati_sulton' ? .14 : .13), Z(la), k, {rang:k === 'hazrati_sulton' || k === 'mingbuloq' ? '#ffe08a' : '#eef2ff', fon:'rgba(9,12,28,.62)'}); });
  const choq = new T.Mesh(new T.ConeGeometry(.03, .08, 12), fmat('#ffe08a', {emissive:'#6a4a00'})); choq.position.set(X(68.17), yH(hS(68.17, 38.95)) + .06, Z(38.95)); choq.userData.nom = 'hazrati_sulton'; g.add(choq);
  const past = new T.Mesh(new T.ConeGeometry(.03, .08, 12), fmat('#8fd0ff', {emissive:'#0a3a6a'})); past.rotation.x = Math.PI; past.position.set(X(63.1), yH(hS(63.1, 42.1)) + .06, Z(42.1)); past.userData.nom = 'mingbuloq'; g.add(past);
  const dY = [Y('Amudaryo', X(61.6), .08, Z(41.6), 'amudaryo', {rang:'#9fd0ff'}), Y('Sirdaryo', X(66.9), .1, Z(43.5), 'sirdaryo', {rang:'#9fd0ff'}), Y('Zarafshon', X(65.1), .12, Z(40.4), 'zarafshon', {rang:'#9fd0ff'}), Y('Orol dengizi', X(59.8), .08, Z(45.0), 'orol', {rang:'#9fd0ff'})];
  const davY = [['QOZOG‘ISTON', 66.8, 45.7], ['TURKMANISTON', 59.6, 38.9], ['TOJIKISTON', 70.2, 38.2], ['QIRG‘IZISTON', 73.4, 41.8], ['AFG‘ONISTON', 66.8, 36.55]].map(([m, lo, la])=>Y(m, X(lo), .12, Z(la), null, {rang:'#aab3cf', fon:false, px:22, olcham:.07}));
  /* belgi halqasi */
  const halqaM = nurli('#ffe08a', .9);
  const halqa = new T.Mesh(new T.BufferGeometry(), halqaM); halqa.visible = false; halqa.raycast = ()=>{}; g.add(halqa);
  soya(S, 4.2, -.2, .55, 0, 0).scale.set(1.5, 1, 1.1);
  /* ---------- tasniflash ---------- */
  let pX = 0, pY = 0; S.el.addEventListener('pointerdown', e=>{ pX = e.clientX; pY = e.clientY; });
  let hX = 0, hY = 0; S.el.addEventListener('pointermove', e=>{ hX = e.clientX; hY = e.clientY; });
  const ray = new T.Raycaster(), v2 = new T.Vector2();
  function tasnif(x0, y0){
    const r = S.el.getBoundingClientRect(); v2.set((x0 - r.left) / r.width * 2 - 1, -(y0 - r.top) / r.height * 2 + 1); ray.setFromCamera(v2, S.cam);
    const h = ray.intersectObject(blok.ust, false); if(!h.length) return null;
    const p = g.worldToLocal(h[0].point.clone()); const lo = LON(p.x), la = LAT(p.z);
    for(const k of OBT){ const [a, b, rx, ry] = OB[k]; if(((lo - a) / rx) ** 2 + ((la - b) / ry) ** 2 <= 1) return k; }
    return null;
  }
  const tanla = (d, x, y)=>!d || !d.nom ? null : d.nom === 'yer_uz' ? tasnif(x, y) : d.nom;
  bosishUla(S, 'kbg_ozbekiston', 'kbg-uz');
  const bosA = S.bosish;
  S.bosish = d=>{ const nom = tanla(d, pX, pY); if(nom){ bosA({nom}); belgi = nom; belgiQoll(); } };
  if(S.ustida){ const us = S.ustida; S.ustida = d=>us(d ? {nom:tanla(d, hX, hY)} : null); }
  function belgiQoll(){
    S.ajrat(belgi);
    const o = belgi && (OB[belgi] || SH[belgi]);
    if(o){ const ax = OB[belgi] ? Math.max(.09, OB[belgi][2] * K * KC) : .08, az = OB[belgi] ? Math.max(.07, OB[belgi][3] * K) : .08;
      const cx = X(o[0]), cz = Z(o[1]), nq = [];
      for(let i = 0; i < 64; i++){ const a = i / 64 * Math.PI * 2, x = cx + ax * Math.cos(a), z = cz + az * Math.sin(a); nq.push(new T.Vector3(x, yH(hS(LON(x), LAT(z))) + .02, z)); }
      halqa.geometry.dispose(); halqa.geometry = new T.TubeGeometry(new T.CatmullRomCurve3(nq, true), 128, .012, 6, true); halqa.visible = true; }
    else halqa.visible = false;
  }
  /* ---------- holat ---------- */
  const hud = S.dom('kbg-hud');
  const leg = S.dom('kbg-leg', [['#3f8f4a', '0–150 m'], ['#c9c07a', '300'], ['#d9b06a', '600'], ['#c28950', '1 200'], ['#9a6446', '2 200'], ['#eef1f5', '4 000+ m'], ['#d9d3bf', 'Orolning qurigan tubi']].map(([r, m])=>'<span><i style="background:' + r + '"></i>' + m + '</span>').join(''));
  function hudYoz(){
    if(rejim === 'orol'){
      hud.innerHTML = orolH === '1960' ? '<div><i>Orol dengizi, 1960</i><b>≈ 68 ming km²</b></div><div><i>Sath</i><b>53,4 m</b></div>' : '<div><i>Orol, 2018</i><b style="font-size:14px">≈ 3,1 + 5,2 ming km²</b></div><div><i>1960 ga nisbatan</i><b>≈ 12 %</b></div>';
      S.izoh.innerHTML = orolH === '1960' ? '<b>Orol dengizi, 1960-yillar.</b> Maydoni 68 ming km² — dunyodagi 4-katta ko‘l. Amudaryo va Sirdaryo suvi unga yetib borardi. Qirg‘oq chizig‘i — Natural Earth «historic» ma’lumoti.'
        : '<b>Orol dengizi hozir.</b> Daryo suvlari sug‘orishga olingach, dengiz keskin qisqardi: 1987-yili ikkiga bo‘lindi, 2014-yili Katta Orolning sharqiy havzasi to‘liq qurigan. 2018: Kichik Orol ≈ 3,1, Katta Orol ≈ 5,2 ming km². Och rang — qurigan tub (Orolqum), punktir — 1960-yil qirg‘og‘i.';
    } else {
      hud.innerHTML = '<div><i>Eng baland nuqta</i><b style="font-size:14px">Hazrati Sulton 4 643 m</b></div><div><i>Eng past nuqta</i><b style="font-size:14px">Mingbuloq −12 m</b></div>';
      S.izoh.innerHTML = rejim === 'suvlar' ? '<b>Suvlar.</b> Asosiy daryolar — <b>Amudaryo</b> va <b>Sirdaryo</b> (tog‘lardan boshlanib Orol havzasiga oqadi), <b>Zarafshon</b> Samarqand va Buxoro vohalarini suv bilan ta’minlaydi (chizig‘i sxematik). Ko‘llar va suv omborlari ko‘k rangda.'
        : '<b>O‘zbekiston relyefi.</b> Hududning katta qismi — <b>Turon pasttekisligi</b> (Qizilqum, Ustyurt), sharqi va janubi-sharqi — tog‘lar (G‘arbiy Tyanshan, Hisor-Oloy tizimi), ular orasida vodiylar (Farg‘ona). Balandlik ≈ 30 marta bo‘rttirilgan; ETOPO1, 0,1° to‘r — sxematik.';
    }
  }
  function yubor(){ hodisa('kbg-uz-holat', {rejim, orol:orolH}); }
  let rg = null;
  function tagChiz(){
    S.tag.innerHTML = '';
    rg = S.guruh('Xarita', [['relyef', 'Relyef'], ['suvlar', 'Suvlar'], ['orol', 'Orol dengizi']], rejim, k=>{ rejim = k; qoll(); yubor(); });
    if(rejim === 'orol'){ S.ajr(); const og = S.guruh('Yil', [['1960', '1960'], ['hozir', 'Hozir']], orolH, k=>{ orolH = k; og.faol(k); orolQoll(); hudYoz(); yubor(); }); }
    S.ajr();
    const yz = S.tugma('Yozuvlar', b=>{ yozuvlar = !yozuvlar; b.classList.toggle('faol', yozuvlar); yozQoll(); }); yz.classList.toggle('faol', yozuvlar);
  }
  /* yozuvlar to‘qnashuvi: ekrandagi to‘rtburchaklar; muhimi (ustun kichik) qoladi, ustiga tushgani so‘nadi */
  const _v = new T.Vector3(), _o = new T.Vector3(), _u = new T.Vector3(), _ws = new T.Vector3();
  function yozJoy(){
    if(!yozuvlar) return;
    const r = S.el.getBoundingClientRect(); if(!r.width || !r.height) return;
    S.cam.updateMatrixWorld(); _o.setFromMatrixColumn(S.cam.matrixWorld, 0); _u.setFromMatrixColumn(S.cam.matrixWorld, 1);
    const qut = [];
    yozlar.forEach(s=>{
      s.getWorldPosition(_v); s.getWorldScale(_ws);
      const p = _v.clone().project(S.cam);
      if(p.z > 1 || Math.abs(p.x) > 1.2 || Math.abs(p.y) > 1.2){ s.userData.maqsad = 0; return; }
      const a = _v.clone().addScaledVector(_o, _ws.x / 2).project(S.cam), b = _v.clone().addScaledVector(_u, _ws.y / 2).project(S.cam);
      const cx = (p.x + 1) / 2 * r.width, cy = (1 - p.y) / 2 * r.height;
      const hw = Math.abs(a.x - p.x) / 2 * r.width, hh = Math.abs(b.y - p.y) / 2 * r.height;
      qut.push({s, x0:cx - hw, x1:cx + hw, y0:cy - hh, y1:cy + hh, u:s.userData.ustun});
    });
    qut.sort((a, b)=>a.u - b.u);
    const qabul = [];
    qut.forEach(q=>{ const ol = qabul.some(k=>q.x0 < k.x1 + 3 && q.x1 > k.x0 - 3 && q.y0 < k.y1 + 2 && q.y1 > k.y0 - 2); q.s.userData.maqsad = ol ? 0 : 1; if(!ol) qabul.push(q); });
  }
  function yozSondir(dt){
    yozlar.forEach(s=>{ const m = s.userData.maqsad === undefined ? 1 : s.userData.maqsad; let op = s.userData.op; op += (m - op) * Math.min(1, dt * 10); if(Math.abs(m - op) < .01) op = m; s.userData.op = op; s.material.opacity = op; s.visible = yozuvlar && op > .02; });
  }
  /* yaqinlashganda yozuv ekranda kattalashib ketmasin: o‘lcham kamera masofasiga mos (3,05 — boshlang‘ich masofa) */
  let yozF = -1, yozD0 = 0;
  function yozOlcham(){
    if(!yozD0) return; const f = cl(S.cam.position.length() / yozD0, .42, 1);
    if(Math.abs(f - yozF) < .004) return; yozF = f;
    yozlar.forEach(s=>s.scale.copy(s.userData.k0).multiplyScalar(f));
  }
  let yozN = 0;
  function yozQoll(){ if(yozuvlar){ yozJoy(); yozlar.forEach(s=>{ s.userData.op = s.userData.maqsad === undefined ? 1 : s.userData.maqsad; }); } yozSondir(1); }
  function orolQoll(){ orol60.visible = orolH === '1960'; orolH_.forEach(m=>m.visible = orolH !== '1960'); q60.visible = orolH !== '1960'; }
  function qoll(){
    qur(); orolQoll(); tagChiz(); hudYoz(); yozQoll();
    yozOlcham();
    suvM.emissiveIntensity = rejim === 'suvlar' ? 2.4 : 1;
    if(rejim === 'orol') S.fokus(1.45, new T.Vector3(X(60.4), 0, Z(44.9)), true); else S.fokus(3.05, new T.Vector3(-.4, 0, .1), true);
  }
  S.holat = h=>{
    if(!h) return;
    if(['relyef', 'suvlar', 'orol'].includes(h.rejim)) rejim = h.rejim;
    if(h.orol === '1960' || h.orol === 'hozir') orolH = h.orol;
    if(h.belgi !== undefined) belgi = S.nomlar[h.belgi] ? h.belgi : null;
    qoll(); belgiQoll(); yubor();
  };
  kadrUla(S, (dt, tt)=>{ if(yozuvlar){ yozOlcham(); if(yozN++ % 6 === 0) yozJoy(); yozSondir(dt); } if(halqa.visible){ halqaM.opacity = .55 + .4 * Math.sin(tt * 4); } chegM.emissiveIntensity = .9 + .2 * Math.sin(tt * 2); });
  if(S.test) yozuvlar = false;
  S.joyla(3.05, new T.Vector3(-.4, 0, .1)); yozD0 = S.cam.position.length();
  qoll();
  if(S.test) leg.style.display = 'none';
  S.yorliq('Geografiya · O‘zbekiston relyef xaritasi (ETOPO1, Natural Earth — sxematik)');
  return S;
};


})();
