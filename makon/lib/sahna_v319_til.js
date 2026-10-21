/* MAKON v3.19 — guruh «til»: INGLIZ TILI (7 ta 3D sahna, til_en_*) va ONA TILI VA ADABIYOT (7 ta 2D/SVG sahna, til_ot_*).
   Reyestr: window.MAKON_SAHNA['til_…'] = async (sahna, {tag, izoh, yorliq, o, d}) => api (3D — M3sahna window._sahnalar ga o‘zi yozadi; 2D — sahna2d yozadi).
   index.html da lib/sahna_v315_kbg.js dan KEYIN ulanadi; CSS — lib/sahna_v319_til.css (klasslar til-).
   Hamma model protsedurali (three.js r128); internetdan hech narsa yuklanmaydi; ovoz fayli yo‘q.
   Talaffuz: faqat brauzerning speechSynthesis (en-US/en-GB ovozi bo‘lsa) — bo‘lmasa «ovoz mavjud emas» yozuvi.
   So‘z lug‘atlari window.MAKON_TIL_SOZ ga eksport qilinadi (darslar_v319_til.js detal kartalarni shundan yasaydi).
   Manba: ekran\v319_til\sahna\p*.js — yig‘ish: node ekran\v319_til\yig.cjs */
(function(){
'use strict';
const R = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d || {})}));
const detal = (turD, nom)=>hodisa('detal', {turD, nom});
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]));
const el = (teg, cls, html)=>{ const e = document.createElement(teg); if(cls) e.className = cls; if(html !== undefined) e.innerHTML = html; return e; };
const SOZ = window.MAKON_TIL_SOZ = window.MAKON_TIL_SOZ || {};
const OVOZ_IK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';

/* ---------- talaffuz: brauzer speechSynthesis (faqat bosilganda) ---------- */
function enOvoz(){
  if(!('speechSynthesis' in window)) return {holat:'yoq'};
  let v = [];
  try{ v = speechSynthesis.getVoices() || []; }catch(e){ return {holat:'yoq'}; }
  if(!v.length) return {holat:'nomalum'};                /* ro‘yxat hali yuklanmagan — baribir urinib ko‘ramiz */
  const en = v.find(x=>/^en[-_](US|GB)/i.test(x.lang)) || v.find(x=>/^en/i.test(x.lang));
  return en ? {holat:'bor', ovoz:en} : {holat:'yoq'};
}
if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', ()=>{ try{ speechSynthesis.getVoices(); }catch(e){} }); }catch(e){} }
function talaffuz(matn, tugma){
  const o = enOvoz();
  const yoq = ()=>{ if(tugma){ tugma.innerHTML = OVOZ_IK + ' ovoz mavjud emas'; tugma.classList.add('yoq'); } };
  if(o.holat === 'yoq'){ yoq(); return false; }
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(matn);
    if(o.ovoz){ u.voice = o.ovoz; u.lang = o.ovoz.lang; } else u.lang = 'en-US';
    u.rate = .88; u.pitch = 1;
    if(tugma){ tugma.classList.add('faol'); u.onend = u.onerror = ()=>tugma.classList.remove('faol'); }
    speechSynthesis.speak(u);
    return true;
  }catch(e){ yoq(); return false; }
}
const ovozTugma = matn=>{ const b = el('button', 'til-ovoz', OVOZ_IK + ' Talaffuz'); b.title = 'Brauzer ovozi bilan o‘qish'; b.onclick = e=>{ e.stopPropagation(); talaffuz(matn, b); }; return b; };

/* ---------- so‘z kartasi (3D sahna ustida) ---------- */
function sozKarta(sahna, p){
  let q = sahna.querySelector('.til-p');
  if(!q){ q = el('div', 'til-q til-p'); sahna.append(q); }
  q.innerHTML = '<button class="til-yop" aria-label="Yopish">×</button><span class="til-ust">' + esc(p.ust || 'So‘z') + '</span><h4>' + esc(p.en) + '</h4>' +
    (p.ipa ? '<div class="til-ipa">' + esc(p.ipa) + '</div>' : '') +
    '<div class="til-uz">' + esc(p.uz) + '</div>' +
    (p.misol ? '<div class="til-misol">' + p.misol + '</div>' : '') +
    (p.qosh ? '<div class="til-qosh">' + p.qosh + '</div>' : '') +
    '<div class="til-qator"></div>';
  q.querySelector('.til-qator').append(ovozTugma(p.oqi || p.en));
  if(p.misolOqi){ const b2 = ovozTugma(p.misolOqi); b2.innerHTML = OVOZ_IK + ' Gapni o‘qish'; q.querySelector('.til-qator').append(b2); }
  q.querySelector('.til-yop').onclick = ()=>q.remove();
  return q;
}

/* ---------- umumiy 3D asos (yorug‘lik, materiallar, soya, yozuv) ---------- */
let soyaTex = null;
function asos(sahna, o){
  o = o || {};
  const S = MAKON3D.sahna(sahna, Object.assign({avto:false, fov:32, env:.6, ekspozitsiya:1.08}, o));
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x141020, .24));
  const asosiy = new T.DirectionalLight(0xffe1bf, .95); asosiy.position.set(4, 6, 7); S.sc.add(asosiy);
  const toldir = new T.DirectionalLight(0x8fb0ff, .42); toldir.position.set(-6, 3, 3); S.sc.add(toldir);
  const orqa = new T.DirectionalLight(0xb7a2ff, .7); orqa.position.set(-1, 5, -7); S.sc.add(orqa);
  const rang = h=>new T.Color(h).convertSRGBToLinear();
  const mat = (h, p)=>{ const m = new T.MeshStandardMaterial(Object.assign({color:rang(h), roughness:.55, metalness:0}, p || {})); m.userData.env = 1; m.envMapIntensity = p && p.env !== undefined ? p.env : .32; return m; };
  const fiz = (h, p)=>{ const m = new T.MeshPhysicalMaterial(Object.assign({color:rang(h), roughness:.35, metalness:0, clearcoat:.6, clearcoatRoughness:.2}, p || {})); m.userData.env = 1; m.envMapIntensity = p && p.env !== undefined ? p.env : .42; return m; };
  const quti = (w, h, d, m, r)=>new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, h, d, 3, r !== undefined ? r : Math.min(w, h, d) * .12) : new T.BoxGeometry(w, h, d), m);
  const silindr = (r1, r2, h, m, s)=>new T.Mesh(new T.CylinderGeometry(r1, r2, h, s || 32), m);
  const shar = (r, m, s)=>new T.Mesh(new T.SphereGeometry(r, s || 28, s ? Math.round(s * .7) : 20), m);
  function soya(w, d, x, z, y, kuch){
    if(!soyaTex){
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x2 = c.getContext('2d'), gr = x2.createRadialGradient(64, 64, 4, 64, 64, 64);
      gr.addColorStop(0, 'rgba(0,0,0,.62)'); gr.addColorStop(.55, 'rgba(0,0,0,.28)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      x2.fillStyle = gr; x2.fillRect(0, 0, 128, 128);
      soyaTex = c;
    }
    const t = new T.CanvasTexture(soyaTex);
    const m = new T.Mesh(new T.PlaneGeometry(w, d), new T.MeshBasicMaterial({map:t, transparent:true, depthWrite:false, opacity:kuch === undefined ? 1 : kuch}));
    m.rotation.x = -Math.PI / 2; m.position.set(x || 0, (y || 0) + .004, z || 0); m.renderOrder = 1; m.userData.rentgenYoq = true; g.add(m); return m;
  }
  function podium(r, y, rangH){
    const p = new T.Group();
    const disk = silindr(r, r * 1.02, .18, fiz('#161b2e', {roughness:.32, metalness:.25, clearcoat:.8}), 96); disk.position.y = -.09; p.add(disk);
    const ust = new T.Mesh(new T.CircleGeometry(r * .985, 96), mat('#151a2c', {roughness:.92, metalness:0, env:.08})); ust.rotation.x = -Math.PI / 2; ust.position.y = .002; p.add(ust);
    const halqa = new T.Mesh(new T.TorusGeometry(r * 1.005, .018, 8, 128), new T.MeshBasicMaterial({color:rang(rangH || '#d78cff'), toneMapped:false, transparent:true, opacity:.75}));
    halqa.rotation.x = Math.PI / 2; halqa.position.y = -.01; p.add(halqa);
    for(let i = 1; i <= 3; i++){ const h2 = new T.Mesh(new T.RingGeometry(r * i / 4 - .004, r * i / 4 + .004, 128), new T.MeshBasicMaterial({color:0x8f9bd6, transparent:true, opacity:.07})); h2.rotation.x = -Math.PI / 2; h2.position.y = .004; p.add(h2); }
    p.position.y = y || 0; g.add(p); return p;
  }
  function yozuv(matn, p){
    p = p || {};
    const c = document.createElement('canvas'), W = p.w || 512, H = p.h || 128; c.width = W; c.height = H;
    const x = c.getContext('2d');
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4;
    const m = new T.SpriteMaterial({map:t, transparent:true, depthTest:p.chuqurlik !== undefined ? p.chuqurlik : true, depthWrite:false, toneMapped:false});
    const s = new T.Sprite(m); const bal = p.bal || .5; s.scale.set(bal * W / H, bal, 1);
    s.yoz = (mt, rg)=>{
      x.clearRect(0, 0, W, H);
      if(p.fon !== false){
        x.fillStyle = p.fon || 'rgba(12,16,34,.82)'; x.strokeStyle = rg || p.chegara || 'rgba(255,255,255,.18)'; x.lineWidth = 4;
        const r = H * .28, pad = 6; x.beginPath(); x.moveTo(pad + r, pad); x.arcTo(W - pad, pad, W - pad, H - pad, r); x.arcTo(W - pad, H - pad, pad, H - pad, r); x.arcTo(pad, H - pad, pad, pad, r); x.arcTo(pad, pad, W - pad, pad, r); x.closePath(); x.fill(); x.stroke();
      }
      x.fillStyle = p.rang || '#eef1fb'; x.font = p.shrift || '600 56px Inter, "Segoe UI", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(mt, W / 2, H / 2 + 3); t.needsUpdate = true;
    };
    s.yoz(matn); s.renderOrder = p.tartib || 20; return s;
  }
  function matnTex(w, h, chiz){
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4;
    t.chiz = ()=>{ x.clearRect(0, 0, w, h); chiz(x, w, h); t.needsUpdate = true; }; t.chiz(); t.x = x; return t;
  }
  const qismlar = new Map();
  function bosiladigan(ob, nom, qosh){
    const royxat = [];
    ob.traverse(m=>{ if(m.isMesh){ m.userData.nom = nom; if(qosh) Object.assign(m.userData, qosh); if(!m.userData.klon){ m.material = Array.isArray(m.material) ? m.material.map(x=>x.clone()) : m.material.clone(); m.userData.klon = 1; } royxat.push(m); } });
    qismlar.set(nom, (qismlar.get(nom) || []).concat(royxat));
    return ob;
  }
  let ustidaNom = null; const tanlangan = new Set();
  function yorit(nom, kuch, rangH){
    (qismlar.get(nom) || []).forEach(m=>(Array.isArray(m.material) ? m.material : [m.material]).forEach(mm=>{ if(!mm.emissive) return; if(!mm.userData.aslE){ mm.userData.aslE = mm.emissive.clone(); mm.userData.aslEI = mm.emissiveIntensity; }
      if(kuch > 0){ mm.emissive.copy(rang(rangH || '#d78cff')); mm.emissiveIntensity = kuch; } else { mm.emissive.copy(mm.userData.aslE); mm.emissiveIntensity = mm.userData.aslEI; } }));
  }
  function belgila(nomlar, rangH, kuch){
    tanlangan.forEach(n=>yorit(n, 0)); tanlangan.clear();
    (nomlar || []).forEach(n=>{ tanlangan.add(n); yorit(n, kuch || .5, rangH || '#ffb347'); });
    if(ustidaNom && !tanlangan.has(ustidaNom)) yorit(ustidaNom, .3);
  }
  S.ustida = ud=>{
    const n = ud ? ud.nom : null; if(n === ustidaNom) return;
    if(ustidaNom && !tanlangan.has(ustidaNom)) yorit(ustidaNom, 0);
    ustidaNom = n;
    if(n && !tanlangan.has(n)) yorit(n, .3);
  };
  const testda = !!(sahna.closest && sahna.closest('.uq-sahna'));
  function qatlam(cls){ const q = el('div', 'til-q ' + (cls || '')); sahna.append(q); return q; }
  const taymer = new Set();
  const kut = (f, ms)=>{ const t = setTimeout(()=>{ taymer.delete(t); f(); }, ms); taymer.add(t); return t; };
  const tozalash = [];
  const eskiYop = S.yopish.bind(S);
  S.yopish = ()=>{ taymer.forEach(clearTimeout); taymer.clear(); tozalash.forEach(f=>{ try{ f(); }catch(e){} }); sahna.querySelectorAll('.til-q').forEach(x=>x.remove()); try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(e){} eskiYop(); };
  /* so‘z kartasi + hodisa (testda karta chiqmaydi, hodisa chiqadi) */
  const karta = p=>{ if(!testda) sozKarta(sahna, p); };
  return {S, T, g, rang, mat, fiz, quti, silindr, shar, soya, podium, yozuv, matnTex, bosiladigan, belgila, yorit, qismlar, testda, qatlam, kut, taymer, tozalash, asosiy, toldir, orqa, karta};
}
function tugmalar(tag, royxat){
  tag.innerHTML = '';
  const b = {};
  royxat.forEach(r=>{
    if(r === '|'){ tag.append(el('span', 'tag-ajr')); return; }
    if(r.html){ const w = el('label', r.cls || '', r.html); tag.append(w); if(r.k) b[r.k] = w; return; }
    const t = el('button', r.cls || '', r.m); if(r.t) t.title = r.t; t.onclick = ()=>r.f(t); tag.append(t); if(r.k) b[r.k] = t;
  });
  return b;
}
const faolQil = (tag, sel, b)=>tag.querySelectorAll(sel).forEach(x=>x.classList.toggle('faol', x === b));

/* ---------- 2D sahna asosi (DOM/SVG) — window._sahnalar ga o‘zi yozadi ---------- */
function sahna2d(sahna, o){
  o = o || {};
  const xar = window._sahnalar;
  const eski = xar && xar.get(sahna); if(eski) eski.yopish();
  sahna.querySelectorAll('.til-2d').forEach(x=>x.remove());
  const wrap = el('div', 'til-2d ' + (o.cls || '')), ichi = el('div', 'til-2d-ichi'); wrap.append(ichi); sahna.append(wrap);
  const testda = !!(sahna.closest && sahna.closest('.uq-sahna'));
  if(testda) wrap.classList.add('testda');
  let k = 1;
  const tozalash = [];
  const api = {
    holat(){},
    zoomla(z){ k = Math.max(.6, Math.min(2.2, k / z)); ichi.style.transform = 'scale(' + k + ')'; },
    tikla(){ k = 1; ichi.style.transform = ''; wrap.scrollTop = 0; wrap.scrollLeft = 0; if(api.boshla) api.boshla(); },
    qotir(){},
    yopish(){ tozalash.forEach(f=>{ try{ f(); }catch(e){} }); wrap.remove(); if(xar && xar.get(sahna) === api) xar.delete(sahna); }
  };
  if(xar) xar.set(sahna, api);
  const karta = p=>{ if(testda) return; let q = wrap.querySelector('.til-2k'); if(!q){ q = el('div', 'til-2k'); wrap.append(q); }
    q.innerHTML = '<button class="til-yop" aria-label="Yopish">×</button>' + (p.ust ? '<span class="til-ust">' + esc(p.ust) + '</span>' : '') + '<h4>' + p.nom + '</h4>' + (p.matn ? '<p>' + p.matn + '</p>' : '') + (p.qosh ? '<div class="til-qosh">' + p.qosh + '</div>' : '');
    q.querySelector('.til-yop').onclick = ()=>q.remove(); return q; };
  return {wrap, ichi, api, tozalash, testda, karta};
}
const svgEl = (n, at)=>{ const e = document.createElementNS('http://www.w3.org/2000/svg', n); Object.keys(at || {}).forEach(k=>e.setAttribute(k, at[k])); return e; };


/* ================= 1. MY ROOM (til_en_xona) — 5-sinf ================= */
/* IPA — Cambridge Dictionary (UK talaffuzi), tarjima — o‘zbekcha darslik lug‘ati */
SOZ.xona = {
  bed:{en:'bed', ipa:'/bed/', uz:'karavot', g:'furniture', misol:'There is a bed in my room.'},
  pillow:{en:'pillow', ipa:'/ˈpɪl.əʊ/', uz:'yostiq', g:'textiles', misol:'The pillow is on the bed.'},
  blanket:{en:'blanket', ipa:'/ˈblæŋ.kɪt/', uz:'ko‘rpa, adyol', g:'textiles', misol:'My blanket is blue.'},
  desk:{en:'desk', ipa:'/desk/', uz:'yozuv stoli', g:'furniture', misol:'I do my homework at the desk.'},
  chair:{en:'chair', ipa:'/tʃeər/', uz:'stul', g:'furniture', misol:'There is a chair next to the desk.'},
  lamp:{en:'lamp', ipa:'/læmp/', uz:'chiroq (stol chirog‘i)', g:'electronics', misol:'The lamp is on the desk.'},
  computer:{en:'computer', ipa:'/kəmˈpjuː.tər/', uz:'kompyuter', g:'electronics', misol:'I have got a computer.'},
  window:{en:'window', ipa:'/ˈwɪn.dəʊ/', uz:'deraza', g:'room', misol:'The window is big.'},
  curtain:{en:'curtain', ipa:'/ˈkɜː.tən/', uz:'parda', g:'textiles', misol:'The curtains are green.'},
  door:{en:'door', ipa:'/dɔːr/', uz:'eshik', g:'room', misol:'Please close the door.'},
  bookshelf:{en:'bookshelf', ipa:'/ˈbʊk.ʃelf/', uz:'kitob javoni', g:'furniture', misol:'There are many books on the bookshelf.'},
  book:{en:'book', ipa:'/bʊk/', uz:'kitob', g:'things', misol:'This is my favourite book.'},
  clock:{en:'clock', ipa:'/klɒk/', uz:'soat (devor soati)', g:'things', misol:'The clock is on the wall.'},
  carpet:{en:'carpet', ipa:'/ˈkɑː.pɪt/', uz:'gilam', g:'textiles', misol:'There is a carpet on the floor.'},
  picture:{en:'picture', ipa:'/ˈpɪk.tʃər/', uz:'rasm, surat', g:'things', misol:'There is a picture on the wall.'},
  plant:{en:'plant', ipa:'/plɑːnt/', uz:'o‘simlik, gul (tuvakdagi)', g:'things', misol:'The plant is near the window.'},
  wardrobe:{en:'wardrobe', ipa:'/ˈwɔː.drəʊb/', uz:'kiyim javoni, shkaf', g:'furniture', misol:'My clothes are in the wardrobe.'},
  mirror:{en:'mirror', ipa:'/ˈmɪr.ər/', uz:'ko‘zgu, oyna', g:'things', misol:'I look in the mirror.'},
  wall:{en:'wall', ipa:'/wɔːl/', uz:'devor', g:'room', misol:'The walls are white.'},
  floor:{en:'floor', ipa:'/flɔːr/', uz:'pol', g:'room', misol:'The ball is on the floor.'}
};
const XONA_GURUH = {furniture:'Furniture — mebel', textiles:'Textiles — gazlama buyumlar', electronics:'Electronics — elektr jihozlar', room:'Room — xona qismlari', things:'Things — boshqa narsalar'};
R.til_en_xona = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · My room · bosib so‘zni eshiting');
  const A = asos(sahna, {rx:.42, ry:.62, rxMin:.05, rxMax:1.1, ryMin:-.2, ryMax:1.45, zoom:1.02});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, yozuv, matnTex, bosiladigan, belgila, karta} = A;
  const X = SOZ.xona;
  /* xona: pol, orqa va chap devor */
  const polT = matnTex(512, 512, (x, w, h)=>{ x.fillStyle = '#6b4a2e'; x.fillRect(0, 0, w, h); for(let i = 0; i < 8; i++){ x.fillStyle = ['#7a563a', '#6f4d31', '#80603f', '#6a4a2d'][i % 4]; x.fillRect(0, i * 64 + 2, w, 60); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(((i * 170) % 400), i * 64 + 2, 3, 60); } });
  polT.wrapS = polT.wrapT = T.RepeatWrapping; polT.repeat.set(2, 2);
  const pol = new T.Mesh(new T.PlaneGeometry(8, 6), mat('#ffffff', {map:polT, roughness:.7, env:.15})); pol.rotation.x = -Math.PI / 2; pol.position.set(0, 0, 0); g.add(pol); bosiladigan(pol, 'floor');
  const devorM = mat('#e3dccf', {roughness:.95, env:.1});
  const orqa = quti(8, 3, .12, devorM, .02); orqa.position.set(0, 1.5, -3.06); g.add(orqa); bosiladigan(orqa, 'wall');
  const chap = quti(.12, 3, 6, devorM.clone(), .02); chap.position.set(-4.06, 1.5, 0); g.add(chap); bosiladigan(chap, 'wall');
  const plintus = mat('#b89a7a', {roughness:.6});
  const pl1 = quti(8, .12, .06, plintus, .01); pl1.position.set(0, .06, -2.97); g.add(pl1);
  const pl2 = quti(.06, .12, 6, plintus, .01); pl2.position.set(-3.97, .06, 0); g.add(pl2);
  /* karavot */
  const bed = new T.Group(); bed.position.set(-2.55, 0, -1.6); g.add(bed);
  const yog = mat('#8a5a35', {roughness:.5});
  const ram = quti(2.1, .36, 1.3, yog, .05); ram.position.y = .25; bed.add(ram);
  const bosh = quti(.12, .9, 1.3, yog, .03); bosh.position.set(-1.05, .5, 0); bed.add(bosh);
  [[-.95, -.55], [-.95, .55], [.95, -.55], [.95, .55]].forEach(([x, z])=>{ const o = silindr(.05, .05, .14, yog, 12); o.position.set(x, .07, z); bed.add(o); });
  bosiladigan(bed, 'bed');
  const matras = quti(2.0, .22, 1.22, fiz('#f2efe6', {roughness:.8, clearcoat:.05}), .06); matras.position.set(-2.55, .54, -1.6); g.add(matras); bosiladigan(matras, 'bed');
  const korpa = quti(1.3, .14, 1.24, fiz('#4a74c9', {roughness:.75, clearcoat:.1}), .06); korpa.position.set(-2.2, .72, -1.6); g.add(korpa); bosiladigan(korpa, 'blanket');
  const yostiq = quti(.42, .14, .6, fiz('#ffffff', {roughness:.85}), .06); yostiq.position.set(-3.25, .72, -1.6); yostiq.rotation.y = .06; g.add(yostiq); bosiladigan(yostiq, 'pillow');
  soya(2.6, 1.8, -2.55, -1.6, 0, .55);
  /* yozuv stoli + stul */
  const desk = new T.Group(); desk.position.set(1.9, 0, -2.4); g.add(desk);
  const oqYog = mat('#c9a071', {roughness:.45});
  const ust = quti(1.9, .07, .85, oqYog, .02); ust.position.y = .76; desk.add(ust);
  [[-.88, -.35], [-.88, .35], [.88, -.35], [.88, .35]].forEach(([x, z])=>{ const o = quti(.07, .74, .07, mat('#3a3f52', {metalness:.6, roughness:.35}), .01); o.position.set(x, .37, z); desk.add(o); });
  const tort = quti(.6, .3, .7, oqYog, .02); tort.position.set(.6, .58, 0); desk.add(tort);
  const dasta = quti(.2, .03, .03, mat('#cfd3dc', {metalness:.9, roughness:.3})); dasta.position.set(.6, .6, .36); desk.add(dasta);
  bosiladigan(desk, 'desk'); soya(2.2, 1.2, 1.9, -2.4, 0, .45);
  const chair = new T.Group(); chair.position.set(1.7, 0, -1.45); g.add(chair);
  const stulM = fiz('#2c3350', {roughness:.5, clearcoat:.3});
  const otir = quti(.5, .06, .5, stulM, .03); otir.position.y = .46; chair.add(otir);
  const suyan = quti(.5, .5, .06, stulM, .03); suyan.position.set(0, .74, -.24); chair.add(suyan);
  [[-.2, -.2], [-.2, .2], [.2, -.2], [.2, .2]].forEach(([x, z])=>{ const o = silindr(.022, .022, .44, mat('#9aa0ab', {metalness:.9, roughness:.3}), 10); o.position.set(x, .22, z); chair.add(o); });
  bosiladigan(chair, 'chair');
  /* kompyuter */
  const pc = new T.Group(); pc.position.set(1.55, .8, -2.55); g.add(pc);
  const ekranT = matnTex(256, 160, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#1b2f6e'); gr.addColorStop(1, '#0e7a8a'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '700 28px Inter, sans-serif'; x.fillText('MY ROOM', 16, 44); x.fillStyle = 'rgba(255,255,255,.35)'; for(let i = 0; i < 3; i++) x.fillRect(16, 66 + i * 24, 100 + (i * 50) % 90, 10); });
  const mon = quti(.74, .46, .04, mat('#20242f', {roughness:.3}), .02); mon.position.y = .42; pc.add(mon);
  const ekran = new T.Mesh(new T.PlaneGeometry(.66, .38), new T.MeshBasicMaterial({map:ekranT, toneMapped:false})); ekran.position.set(0, .42, .025); pc.add(ekran);
  const tirg = silindr(.05, .09, .18, mat('#20242f'), 16); tirg.position.y = .09; pc.add(tirg);
  const taglik = quti(.3, .02, .18, mat('#20242f'), .01); taglik.position.y = .01; pc.add(taglik);
  const klav = quti(.6, .025, .2, mat('#2b3040', {roughness:.5}), .01); klav.position.set(.0, .012, .42); pc.add(klav);
  bosiladigan(pc, 'computer');
  /* stol chirog‘i (issiq nur) */
  const lamp = new T.Group(); lamp.position.set(2.55, .8, -2.6); g.add(lamp);
  const lTag = silindr(.11, .13, .03, mat('#3a3f52', {metalness:.6, roughness:.4}), 24); lamp.add(lTag);
  const lTay = silindr(.015, .015, .5, mat('#9aa0ab', {metalness:.9, roughness:.3}), 8); lTay.position.set(0, .25, 0); lTay.rotation.z = .25; lamp.add(lTay);
  const lBosh = silindr(.09, .18, .22, fiz('#f0b86b', {roughness:.5, side:T.DoubleSide}), 28); lBosh.position.set(-.1, .55, 0); lBosh.rotation.z = .35; lamp.add(lBosh);
  const lNur = shar(.05, new T.MeshBasicMaterial({color:0xfff1c4, toneMapped:false}), 10); lNur.position.set(-.1, .5, 0); lamp.add(lNur);
  const pLight = new T.PointLight(0xffd59a, .9, 4, 2); pLight.position.set(-.1, .5, 0); lamp.add(pLight);
  bosiladigan(lamp, 'lamp');
  /* deraza + parda (orqa devorda) */
  const win = new T.Group(); win.position.set(1.7, 1.75, -2.98); g.add(win);
  const ramM = mat('#f7f5f0', {roughness:.5});
  const oyna = new T.Mesh(new T.PlaneGeometry(1.5, 1.1), new T.MeshBasicMaterial({color:new T.Color('#8fd3ff').convertSRGBToLinear(), toneMapped:false})); win.add(oyna);
  const osmonT = matnTex(256, 192, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#4f9ff0'); gr.addColorStop(1, '#c9ecff'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,.85)'; [[50, 50, 26], [80, 44, 20], [180, 90, 22], [205, 84, 16]].forEach(([cx, cy, r])=>{ x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); }); x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(215, 36, 18, 0, 7); x.fill(); });
  oyna.material = new T.MeshBasicMaterial({map:osmonT, toneMapped:false});
  [[0, .58, 1.62, .07], [0, -.58, 1.62, .07], [-.78, 0, .07, 1.2], [.78, 0, .07, 1.2], [0, 0, .05, 1.1], [0, 0, 1.5, .05]].forEach(([x, y, w, h])=>{ const r = quti(w, h, .08, ramM, .01); r.position.set(x, y, .03); win.add(r); });
  bosiladigan(win, 'window');
  const pardaM = fiz('#4caf7d', {roughness:.85, side:T.DoubleSide});
  const parda = new T.Group(); g.add(parda);
  [-.95, .95].forEach(dx=>{ const pr = new T.Mesh(new T.CylinderGeometry(.16, .18, 1.45, 10, 1, true), pardaM); pr.scale.z = .5; pr.position.set(1.7 + dx, 1.72, -2.86); parda.add(pr); });
  const karniz = silindr(.02, .02, 2.3, mat('#cfd3dc', {metalness:.9, roughness:.3}), 8); karniz.rotation.z = Math.PI / 2; karniz.position.set(1.7, 2.45, -2.84); parda.add(karniz);
  bosiladigan(parda, 'curtain');
  /* eshik (chap devorda) */
  const door = new T.Group(); door.position.set(-3.98, 1.05, 1.5); g.add(door);
  const eshM = mat('#8a5a35', {roughness:.5});
  const esh = quti(.08, 2.1, .95, eshM, .01); door.add(esh);
  [[.55, .62], [-.45, .62]].forEach(([y, h])=>{ const p = quti(.03, h, .62, mat('#7a4c2c'), .005); p.position.set(.05, y, 0); door.add(p); });
  const tutqich = shar(.045, mat('#e0c070', {metalness:.9, roughness:.25}), 12); tutqich.position.set(.09, 0, .36); door.add(tutqich);
  bosiladigan(door, 'door');
  /* kitob javoni + kitoblar (orqa devorda) */
  const shelf = new T.Group(); shelf.position.set(-.7, 0, -2.75); g.add(shelf);
  const jav = mat('#5c3b22', {roughness:.5});
  const yon1 = quti(.06, 1.9, .5, jav, .01); yon1.position.set(-.65, .95, 0); shelf.add(yon1);
  const yon2 = yon1.clone(); yon2.position.x = .65; shelf.add(yon2);
  [0.05, .65, 1.25, 1.85].forEach(y=>{ const t = quti(1.3, .05, .5, jav, .01); t.position.set(0, y, 0); shelf.add(t); });
  const orq = quti(1.3, 1.9, .03, mat('#4a2e1a'), .005); orq.position.set(0, .95, -.24); shelf.add(orq);
  bosiladigan(shelf, 'bookshelf'); soya(1.6, .9, -.7, -2.7, 0, .4);
  const books = new T.Group(); g.add(books);
  const KR = ['#d9534f', '#3f7fc9', '#4caf7d', '#f0b429', '#8e5bd6', '#e07b39', '#2fb8b1', '#c94f8a'];
  [0.08, .68, 1.28].forEach((y, r)=>{ let x = -.58; let i = 0; while(x < .55){ const w = .07 + ((i * 7 + r * 3) % 4) * .02, h = .36 + ((i * 5 + r) % 3) * .07; const b = quti(w, h, .36, fiz(KR[(i + r * 3) % KR.length], {roughness:.6, clearcoat:.2}), .005); b.position.set(-.7 + x + w / 2, y + h / 2, -2.72); books.add(b); x += w + .012; i++; if(i > 9) break; } });
  bosiladigan(books, 'book');
  /* devor soati */
  const clock = new T.Group(); clock.position.set(-.7, 2.45, -2.95); g.add(clock);
  const sTana = silindr(.3, .3, .06, mat('#2a2f44', {metalness:.3, roughness:.4}), 40); sTana.rotation.x = Math.PI / 2; clock.add(sTana);
  const sYuz = matnTex(256, 256, (x, w, h)=>{ x.fillStyle = '#f7f5f0'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.fillStyle = '#1c2033'; for(let i = 0; i < 12; i++){ const a = i * Math.PI / 6; x.fillRect(128 + Math.cos(a) * 100 - 3, 128 + Math.sin(a) * 100 - 3, 6, 6); } x.strokeStyle = '#1c2033'; x.lineWidth = 8; x.beginPath(); x.moveTo(128, 128); x.lineTo(128, 60); x.stroke(); x.lineWidth = 6; x.beginPath(); x.moveTo(128, 128); x.lineTo(186, 150); x.stroke(); });
  const yuz = new T.Mesh(new T.CircleGeometry(.26, 40), new T.MeshBasicMaterial({map:sYuz, toneMapped:false})); yuz.position.z = .035; clock.add(yuz);
  bosiladigan(clock, 'clock');
  /* gilam */
  const carpT = matnTex(256, 256, (x, w, h)=>{ x.fillStyle = '#9b2f3a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#e8c372'; x.lineWidth = 6; x.strokeRect(14, 14, w - 28, h - 28); x.strokeRect(34, 34, w - 68, h - 68); x.fillStyle = '#e8c372'; for(let i = 0; i < 4; i++) for(let j = 0; j < 4; j++){ x.beginPath(); x.moveTo(64 + i * 44, 68 + j * 44); x.lineTo(76 + i * 44, 80 + j * 44); x.lineTo(64 + i * 44, 92 + j * 44); x.lineTo(52 + i * 44, 80 + j * 44); x.closePath(); x.fill(); } });
  const carpet = quti(2.6, .03, 1.7, mat('#ffffff', {map:carpT, roughness:.95, env:.05}), .005); carpet.position.set(.4, .015, .4); g.add(carpet); bosiladigan(carpet, 'carpet');
  /* rasm (chap devorda) */
  const pic = new T.Group(); pic.position.set(-3.96, 1.8, -1.4); g.add(pic);
  const rT = matnTex(256, 192, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#2d4b8f'); gr.addColorStop(.6, '#f2b56b'); gr.addColorStop(1, '#4b7f4b'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = '#20314f'; x.beginPath(); x.moveTo(0, 150); x.lineTo(70, 70); x.lineTo(120, 130); x.lineTo(170, 60); x.lineTo(256, 150); x.closePath(); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(200, 40, 16, 0, 7); x.fill(); });
  const rRam = quti(.06, .8, 1.05, mat('#e0c070', {metalness:.7, roughness:.3}), .01); pic.add(rRam);
  const rPl = new T.Mesh(new T.PlaneGeometry(.9, .66), new T.MeshBasicMaterial({map:rT, toneMapped:false})); rPl.rotation.y = Math.PI / 2; rPl.position.x = .035; pic.add(rPl);
  bosiladigan(pic, 'picture');
  /* o‘simlik (burchak) */
  const plant = new T.Group(); plant.position.set(3.4, 0, -2.5); g.add(plant);
  const tuvak = silindr(.2, .15, .36, fiz('#c9683a', {roughness:.6}), 24); tuvak.position.y = .18; plant.add(tuvak);
  const tuproq = silindr(.18, .18, .03, mat('#3a2a1c'), 24); tuproq.position.y = .36; plant.add(tuproq);
  const bargM = fiz('#3f9a4f', {roughness:.5, side:T.DoubleSide});
  for(let i = 0; i < 9; i++){ const a = i * .7 + .3, b = new T.Mesh(new T.SphereGeometry(.17, 14, 10), bargM); b.scale.set(1, .35, .55); b.position.set(Math.cos(a) * .17, .55 + (i % 3) * .14, Math.sin(a) * .17); b.rotation.set(.5 - (i % 3) * .3, -a, 0); plant.add(b); const sh = silindr(.012, .012, .45, mat('#2f6b36'), 6); sh.position.set(Math.cos(a) * .08, .5, Math.sin(a) * .08); sh.rotation.z = Math.cos(a) * .4; sh.rotation.x = -Math.sin(a) * .4; plant.add(sh); }
  bosiladigan(plant, 'plant'); soya(.7, .7, 3.4, -2.5, 0, .5);
  /* kiyim javoni (chap devor) */
  const ward = new T.Group(); ward.position.set(-3.55, 0, -.1); g.add(ward);
  const wM = mat('#d8c9b2', {roughness:.6});
  const wT = quti(.8, 2.1, 1.3, wM, .02); wT.position.y = 1.05; ward.add(wT);
  [-.32, .32].forEach(z=>{ const e = quti(.03, 1.95, .6, mat('#cbbba3'), .005); e.position.set(.42, 1.05, z); ward.add(e); const t = silindr(.012, .012, .18, mat('#9aa0ab', {metalness:.9, roughness:.3}), 8); t.position.set(.45, 1.05, z + (z < 0 ? .22 : -.22)); ward.add(t); });
  bosiladigan(ward, 'wardrobe'); soya(1.2, 1.6, -3.55, -.1, 0, .45);
  /* ko‘zgu (chap devor, eshik oldida) */
  const mir = new T.Group(); mir.position.set(-3.95, 1.55, 2.5); g.add(mir);
  const mRam = new T.Mesh(new T.TorusGeometry(.42, .04, 10, 48), mat('#e0c070', {metalness:.8, roughness:.3})); mRam.rotation.y = Math.PI / 2; mir.add(mRam);
  const mSh = new T.Mesh(new T.CircleGeometry(.4, 48), fiz('#dfe8ff', {metalness:1, roughness:.04, env:1.6})); mSh.rotation.y = Math.PI / 2; mSh.position.x = .02; mir.add(mSh);
  mir.scale.y = 1.25; bosiladigan(mir, 'mirror');
  /* yozuvlar (ingliz so‘zlari) — holat bilan yoqiladi */
  const YOZ = {}; const yozG = new T.Group(); g.add(yozG);
  const JOY = {bed:[-2.55, 1.3, -1.6], desk:[1.9, 1.15, -2.4], chair:[1.7, 1.05, -1.45], lamp:[2.55, 1.7, -2.6], computer:[1.55, 1.5, -2.55], window:[1.7, 2.55, -2.9], door:[-3.9, 2.4, 1.5], bookshelf:[-.7, 2.1, -2.7], clock:[-.7, 2.9, -2.9], carpet:[.4, .3, .9], picture:[-3.9, 2.4, -1.4], plant:[3.4, 1.35, -2.5], wardrobe:[-3.55, 2.4, -.1], mirror:[-3.9, 2.35, 2.5], pillow:[-3.25, 1.05, -1.0], blanket:[-2.0, 1.05, -1.0], curtain:[.75, 2.55, -2.9], book:[-.7, 1.75, -2.5]};
  Object.keys(JOY).forEach(k=>{ const s = yozuv(X[k].en, {bal:.3, w:320, h:96, shrift:'700 46px Inter, sans-serif', chuqurlik:false}); s.position.set(...JOY[k]); s.visible = false; yozG.add(s); YOZ[k] = s; });
  let yozKor = false;
  function korsat(k){
    const x = X[k]; if(!x) return;
    belgila([k]);
    karta({ust:XONA_GURUH[x.g] || 'So‘z', en:x.en, ipa:x.ipa, uz:x.uz, misol:'<i>' + esc(x.misol) + '</i>', misolOqi:x.misol});
    izoh.innerHTML = '<b>' + esc(x.en) + '</b> ' + esc(x.ipa) + ' — ' + esc(x.uz) + '. <i>' + esc(x.misol) + '</i>';
    detal('til_xona', k); hodisa('til-soz', {nom:k, en:x.en, uz:x.uz, guruh:x.g, sahna:'xona'});
  }
  S.bosish = ud=>{ if(ud && ud.nom) korsat(ud.nom); };
  S.holat = h=>{
    if(!h) return;
    if(h.yozuv !== undefined){ yozKor = !!h.yozuv; Object.values(YOZ).forEach(s=>s.visible = yozKor); }
    if(h.guruh){ const ns = Object.keys(X).filter(k=>X[k].g === h.guruh); belgila(ns, '#ffb347', .45); Object.keys(YOZ).forEach(k=>YOZ[k].visible = yozKor || ns.includes(k)); izoh.innerHTML = '<b>' + esc(XONA_GURUH[h.guruh] || h.guruh) + ':</b> ' + ns.map(k=>'<i>' + esc(X[k].en) + '</i>').join(', ') + '.'; }
    if(h.predmet && X[h.predmet]){ korsat(h.predmet); if(YOZ[h.predmet]) YOZ[h.predmet].visible = true; }
    if(h.hamma){ belgila([]); Object.keys(YOZ).forEach(k=>YOZ[k].visible = yozKor); }
  };
  const tb = tugmalar(tag, [
    {m:'Yozuvlar', k:'yoz', f:b=>{ yozKor = !yozKor; b.classList.toggle('faol', yozKor); Object.values(YOZ).forEach(s=>s.visible = yozKor); }}, '|',
    ...Object.keys(XONA_GURUH).map(gk=>({m:XONA_GURUH[gk].split(' — ')[0], f:b=>{ faolQil(tag, '[data-g]', b); S.holat({guruh:gk}); }, k:gk}))
  ]);
  Object.keys(XONA_GURUH).forEach(gk=>{ tb[gk].dataset.g = gk; });
  S.kadrda = (dt, t)=>{ pLight.intensity = .85 + Math.sin(t * 7) * .05; };
  S.joyla(4.3, new T.Vector3(-.2, 1.1, -.6));
  izoh.innerHTML = 'Xonadagi narsani <b>bosing</b> — inglizcha so‘z, transkripsiya, tarjima va talaffuz tugmasi chiqadi.';
  return S;
};

/* ================= 2. COLOURS AND NUMBERS (til_en_ranglar) — 5-sinf ================= */
SOZ.rang = {
  red:{en:'red', ipa:'/red/', uz:'qizil', hex:'#e0312f'}, blue:{en:'blue', ipa:'/bluː/', uz:'ko‘k', hex:'#2f6fe0'}, green:{en:'green', ipa:'/ɡriːn/', uz:'yashil', hex:'#2faa52'},
  yellow:{en:'yellow', ipa:'/ˈjel.əʊ/', uz:'sariq', hex:'#f5d33a'}, orange:{en:'orange', ipa:'/ˈɒr.ɪndʒ/', uz:'to‘q sariq (apelsin rang)', hex:'#f28c1e'}, purple:{en:'purple', ipa:'/ˈpɜː.pəl/', uz:'binafsha', hex:'#8a46d6'},
  pink:{en:'pink', ipa:'/pɪŋk/', uz:'pushti', hex:'#f27ab0'}, brown:{en:'brown', ipa:'/braʊn/', uz:'jigarrang', hex:'#8a5a35'}, black:{en:'black', ipa:'/blæk/', uz:'qora', hex:'#1a1b22'},
  white:{en:'white', ipa:'/waɪt/', uz:'oq', hex:'#f4f4f0'}, grey:{en:'grey', ipa:'/ɡreɪ/', uz:'kulrang', hex:'#8c93a3'}
};
SOZ.shakl = {ball:{en:'ball', ipa:'/bɔːl/', uz:'to‘p, shar'}, box:{en:'box', ipa:'/bɒks/', uz:'quti'}, star:{en:'star', ipa:'/stɑːr/', uz:'yulduz'}, heart:{en:'heart', ipa:'/hɑːt/', uz:'yurak'}};
/* sonlar: 1–100 so‘z bilan (Cambridge/Oxford lug‘atlari; 21–99 defis bilan: twenty-one) */
const BIR = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const ONL = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const sonSoz = n=>{ n = Math.max(0, Math.min(100, Math.round(n))); if(n === 0) return 'zero'; if(n === 100) return 'one hundred'; if(n < 20) return BIR[n]; return ONL[Math.floor(n / 10)] + (n % 10 ? '-' + BIR[n % 10] : ''); };
SOZ.sonSoz = sonSoz;
R.til_en_ranglar = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · Colours and numbers · rang va sonni bosing');
  const A = asos(sahna, {rx:.3, ry:-.35, rxMin:-.1, rxMax:1.1, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, podium, yozuv, matnTex, bosiladigan, belgila, karta} = A;
  podium(5.4, 0, '#d78cff');
  const RK = Object.keys(SOZ.rang);
  /* rang kubchalari — yoy bo‘ylab */
  const kubG = new T.Group(); g.add(kubG);
  RK.forEach((k, i)=>{
    const a = -Math.PI * .72 + i * (Math.PI * 1.44 / (RK.length - 1));
    const x = Math.sin(a) * 3.9, z = -Math.cos(a) * 3.9 + 1.2;
    const c = quti(.62, .62, .62, fiz(SOZ.rang[k].hex, {roughness:.3, clearcoat:.7, metalness:0}), .08); c.position.set(x, .31, z); c.rotation.y = -a; kubG.add(c);
    bosiladigan(c, k, {rang:k}); soya(.95, .95, x, z, 0, .55);
    const y = yozuv(SOZ.rang[k].en, {bal:.26, w:300, h:96, shrift:'700 46px Inter, sans-serif', chuqurlik:false}); y.position.set(x, .95, z); kubG.add(y);
  });
  /* markazdagi shakl (bo‘yaladi) */
  let joriyRang = 'red', joriyShakl = 'ball';
  const shaklM = fiz(SOZ.rang.red.hex, {roughness:.25, clearcoat:.8});
  const shG = new T.Group(); shG.position.set(-1.3, .9, -.2); g.add(shG);
  let shMesh = null;
  function yulduz(){ const s = new T.Shape(); for(let i = 0; i < 10; i++){ const r = i % 2 ? .38 : .85, a = i * Math.PI / 5 - Math.PI / 2; i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r); } s.closePath(); return s; }
  function yurak(){ const s = new T.Shape(); s.moveTo(0, -.75); s.bezierCurveTo(-1.0, .1, -.6, .85, 0, .35); s.bezierCurveTo(.6, .85, 1.0, .1, 0, -.75); return s; }
  function shaklQur(k){
    if(shMesh){ shG.remove(shMesh); shMesh.geometry.dispose(); }
    let geo;
    if(k === 'ball') geo = new T.SphereGeometry(.75, 48, 32);
    else if(k === 'box') geo = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(1.25, 1.25, 1.25, 4, .12) : new T.BoxGeometry(1.25, 1.25, 1.25);
    else { geo = new T.ExtrudeGeometry(k === 'star' ? yulduz() : yurak(), {depth:.4, bevelEnabled:true, bevelThickness:.06, bevelSize:.06, bevelSegments:4, curveSegments:28}); geo.center(); }
    shMesh = new T.Mesh(geo, shaklM); shG.add(shMesh); bosiladigan(shMesh, 'shakl', {shakl:k}); joriyShakl = k;
  }
  shaklQur('ball'); soya(2.2, 2.2, -1.3, -.2, 0, .6);
  const shYoz = yozuv('a red ball', {bal:.42, w:640, h:128, shrift:'700 56px Inter, sans-serif', chuqurlik:false}); shYoz.position.set(-1.3, 2.05, -.2); g.add(shYoz);
  /* son taxtasi */
  const taxta = new T.Group(); taxta.position.set(1.9, 1.1, -.4); g.add(taxta);
  const tx = quti(2.4, 1.7, .16, fiz('#141a30', {roughness:.3, metalness:.2, clearcoat:.6}), .06); taxta.add(tx);
  const txQ = quti(2.5, 1.8, .06, new T.MeshBasicMaterial({color:new T.Color('#d78cff').convertSRGBToLinear(), toneMapped:false, transparent:true, opacity:.55})); txQ.position.z = -.06; taxta.add(txQ);
  let son = 7;
  const sonT = matnTex(512, 360, (x, w, h)=>{ x.fillStyle = '#ffd24a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '800 180px "JetBrains Mono", Inter, monospace'; x.fillText(String(son), w / 2, 130); x.fillStyle = '#eef1fb'; x.font = '700 ' + (sonSoz(son).length > 11 ? 48 : 60) + 'px Inter, sans-serif'; x.fillText(sonSoz(son), w / 2, 280); });
  const sonPl = new T.Mesh(new T.PlaneGeometry(2.2, 1.55), new T.MeshBasicMaterial({map:sonT, transparent:true, toneMapped:false})); sonPl.position.z = .09; taxta.add(sonPl);
  bosiladigan(taxta, 'son'); soya(2.8, 1.2, 1.9, -.4, 0, .5);
  /* sanash sharchalari (son ≤ 10 bo‘lsa) */
  const sharG = new T.Group(); g.add(sharG); const sharlar = [];
  for(let i = 0; i < 10; i++){ const s = shar(.13, fiz('#ffd24a', {roughness:.3, clearcoat:.8}), 18); s.position.set(1.0 + (i % 5) * .45, .14, .9 + Math.floor(i / 5) * .45); s.visible = false; sharG.add(s); sharlar.push(s); }
  function sonYoz(yubor){
    son = Math.max(1, Math.min(100, son)); sonT.chiz();
    sharlar.forEach((s, i)=>s.visible = i < son && son <= 10);
    if(tb && tb.slayder) tb.slayder.querySelector('input').value = son;
    if(yubor !== false) hodisa('til-son', {son, soz:sonSoz(son)});
  }
  function rangKorsat(k, bosildi){
    const r = SOZ.rang[k]; joriyRang = k;
    shaklM.color.copy(new T.Color(r.hex).convertSRGBToLinear());
    const art = /^[aeiou]/.test(r.en) ? 'an' : 'a';
    shYoz.yoz(art + ' ' + r.en + ' ' + SOZ.shakl[joriyShakl].en);
    belgila([k]);
    karta({ust:'Colour — rang', en:r.en, ipa:r.ipa, uz:r.uz, misol:'<i>What colour is it? — It’s ' + esc(r.en) + '.</i>', misolOqi:'What colour is it? It is ' + r.en + '.'});
    izoh.innerHTML = '<b>' + r.en + '</b> ' + r.ipa + ' — ' + r.uz + '. <i>It’s ' + art + ' ' + r.en + ' ' + SOZ.shakl[joriyShakl].en + '.</i>';
    detal('til_rang', k); hodisa('til-rang', {nom:k, en:r.en, uz:r.uz, shakl:joriyShakl, bosildi:!!bosildi});
  }
  S.bosish = ud=>{
    if(ud.rang) rangKorsat(ud.rang, true);
    else if(ud.nom === 'shakl'){ const s = SOZ.shakl[joriyShakl]; karta({ust:'Shape — shakl', en:s.en, ipa:s.ipa, uz:s.uz, misol:'<i>It’s a ' + SOZ.rang[joriyRang].en + ' ' + s.en + '.</i>', misolOqi:'It is a ' + SOZ.rang[joriyRang].en + ' ' + s.en + '.'}); detal('til_rang', 'shakl_' + joriyShakl); hodisa('til-shakl', {nom:joriyShakl}); }
    else if(ud.nom === 'son'){ karta({ust:'Number — son', en:sonSoz(son), ipa:'', uz:String(son), misol:'<i>How many? — ' + sonSoz(son) + '.</i>', oqi:sonSoz(son)}); hodisa('til-son', {son, soz:sonSoz(son), bosildi:true}); }
  };
  S.holat = h=>{
    if(!h) return;
    if(h.shakl && SOZ.shakl[h.shakl]){ shaklQur(h.shakl); faolQil(tag, '[data-sh]', tb['sh_' + h.shakl]); }
    if(h.rang && SOZ.rang[h.rang]) rangKorsat(h.rang);
    if(h.son !== undefined){ son = +h.son; sonYoz(); }
    if(h.rejim === 'sonlar'){ S.fokus(2.2, new T.Vector3(1.9, 1.0, -.2), true); } else if(h.rejim === 'ranglar'){ S.fokus(3.6, new T.Vector3(-.6, .8, .4), true); } else if(h.rejim === 'hamma') S.tikla();
  };
  const tb = tugmalar(tag, [
    ...Object.keys(SOZ.shakl).map(k=>({m:SOZ.shakl[k].en, k:'sh_' + k, cls:k === 'ball' ? 'faol' : '', f:b=>{ faolQil(tag, '[data-sh]', b); shaklQur(k); rangKorsat(joriyRang); }})), '|',
    {m:'−1', f:()=>{ son--; sonYoz(); }},
    {html:'<input type="range" min="1" max="100" value="7" aria-label="Son">', k:'slayder'},
    {m:'+1', f:()=>{ son++; sonYoz(); }},
    {m:'+10', f:()=>{ son += 10; sonYoz(); }}
  ]);
  Object.keys(SOZ.shakl).forEach(k=>{ tb['sh_' + k].dataset.sh = k; });
  tb.slayder.querySelector('input').oninput = e=>{ son = +e.target.value; sonYoz(); };
  S.kadrda = (dt, t)=>{ shG.rotation.y += dt * .5; shG.position.y = .9 + Math.sin(t * 1.6) * .06; };
  sonYoz(false); rangKorsat('red');
  S.joyla(4.4, new T.Vector3(.2, .8, .3));
  return S;
};


/* ================= 3. AT THE MARKET (til_en_bozor) — 6-sinf ================= */
/* Narxlar — NAMUNA (o‘quv maqsadida, dollar/funt o‘rniga «$» shartli). sanaladi: countable (a/an, many, How many?), sanalmaydi: uncountable (some, much, How much?) */
SOZ.bozor = {
  apples:{en:'apples', bir:'an apple', ipa:'/ˈæp.əlz/', uz:'olma', san:true, narx:'$2 a kilo', rang:'#d9403a'},
  bananas:{en:'bananas', bir:'a banana', ipa:'/bəˈnɑː.nəz/', uz:'banan', san:true, narx:'$1.50 a kilo', rang:'#f2d03a'},
  oranges:{en:'oranges', bir:'an orange', ipa:'/ˈɒr.ɪn.dʒɪz/', uz:'apelsin', san:true, narx:'$3 a kilo', rang:'#f28c1e'},
  tomatoes:{en:'tomatoes', bir:'a tomato', ipa:'/təˈmɑː.təʊz/', uz:'pomidor', san:true, narx:'$1 a kilo', rang:'#e03a2f'},
  potatoes:{en:'potatoes', bir:'a potato', ipa:'/pəˈteɪ.təʊz/', uz:'kartoshka', san:true, narx:'$0.80 a kilo', rang:'#c4a06a'},
  carrots:{en:'carrots', bir:'a carrot', ipa:'/ˈkær.əts/', uz:'sabzi', san:true, narx:'$1 a kilo', rang:'#f07a1a'},
  onions:{en:'onions', bir:'an onion', ipa:'/ˈʌn.jənz/', uz:'piyoz', san:true, narx:'$0.70 a kilo', rang:'#e8d7b0'},
  eggs:{en:'eggs', bir:'an egg', ipa:'/eɡz/', uz:'tuxum', san:true, narx:'$2 for ten', rang:'#f5efe2'},
  watermelons:{en:'watermelons', bir:'a watermelon', ipa:'/ˈwɔː.təˌmel.ənz/', uz:'tarvuz', san:true, narx:'$4 each', rang:'#2f8a45'},
  grapes:{en:'grapes', bir:'a grape', ipa:'/ɡreɪps/', uz:'uzum', san:true, narx:'$3 a kilo', rang:'#7a3fb0'},
  bread:{en:'bread', ipa:'/bred/', uz:'non', san:false, narx:'$1 a loaf', rang:'#c98a4b'},
  cheese:{en:'cheese', ipa:'/tʃiːz/', uz:'pishloq', san:false, narx:'$8 a kilo', rang:'#f2c94c'},
  milk:{en:'milk', ipa:'/mɪlk/', uz:'sut', san:false, narx:'$1.20 a litre', rang:'#f7f7fb'},
  rice:{en:'rice', ipa:'/raɪs/', uz:'guruch', san:false, narx:'$2 a kilo', rang:'#efe7d2'},
  honey:{en:'honey', ipa:'/ˈhʌn.i/', uz:'asal', san:false, narx:'$6 a jar', rang:'#e8a21c'}
};
R.til_en_bozor = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · At the market · narxlar namuna');
  const A = asos(sahna, {rx:.5, ry:.0, rxMin:.1, rxMax:1.1, ryMin:-1.1, ryMax:1.1, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, podium, yozuv, matnTex, bosiladigan, belgila, karta} = A;
  podium(5.6, 0, '#ffb86b');
  const B = SOZ.bozor;
  /* rasta: stol + ustunlar + chiziqli soyabon */
  const yog = mat('#8a5a35', {roughness:.55});
  const stol = quti(5.2, .12, 1.9, yog, .02); stol.position.set(0, .86, 0); g.add(stol);
  [[-2.5, -.85], [2.5, -.85], [-2.5, .85], [2.5, .85]].forEach(([x, z])=>{ const o = quti(.1, .8, .1, yog, .01); o.position.set(x, .4, z); g.add(o); });
  const oldT = matnTex(512, 128, (x, w, h)=>{ x.fillStyle = '#2f6b4a'; x.fillRect(0, 0, w, h); x.fillStyle = '#f4efe2'; x.font = '800 64px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRESH MARKET', w / 2, h / 2 + 4); });
  const old = new T.Mesh(new T.PlaneGeometry(5.2, .74), new T.MeshBasicMaterial({map:oldT, toneMapped:false})); old.position.set(0, .43, .96); g.add(old);
  [-2.7, 2.7].forEach(x=>{ const u = silindr(.05, .05, 2.6, mat('#d9dde6', {metalness:.8, roughness:.3}), 12); u.position.set(x, 1.3, -.95); g.add(u); });
  const soyT = matnTex(512, 256, (x, w, h)=>{ for(let i = 0; i < 8; i++){ x.fillStyle = i % 2 ? '#e8e2d2' : '#d9403a'; x.fillRect(i * 64, 0, 64, h); } });
  soyT.wrapS = T.RepeatWrapping; soyT.repeat.set(2, 1);
  const soyabon = new T.Mesh(new T.PlaneGeometry(5.6, 2.3), mat('#ffffff', {map:soyT, roughness:.9, side:T.DoubleSide, env:.1})); soyabon.rotation.x = -Math.PI / 2 + .35; soyabon.position.set(0, 2.75, 0.05); g.add(soyabon);
  const soyUch = new T.Mesh(new T.PlaneGeometry(5.6, .32), mat('#ffffff', {map:soyT, roughness:.9, side:T.DoubleSide, env:.1})); soyUch.position.set(0, 2.23, 1.1); g.add(soyUch);
  soya(5.8, 2.4, 0, 0, 0, .55);
  /* yashiklar va mahsulotlar */
  const yashikM = mat('#b9926a', {roughness:.7});
  const JOY = {}; const KEYS = Object.keys(B);
  const sat = [[-2.05, .95, .55], [-1.2, .95, .55], [-.35, .95, .55], [.5, .95, .55], [1.35, .95, .55], [2.2, .95, .55], [-2.05, .95, -.45], [-1.2, .95, -.45], [-.35, .95, -.45], [.5, .95, -.45], [1.35, .95, -.45], [2.2, .95, -.45], [-1.6, 1.0, -1.35], [-.4, 1.0, -1.35], [.9, 1.0, -1.35]];
  function yashik(x, y, z){ const q = new T.Group(); q.position.set(x, y, z); const tag2 = quti(.74, .05, .74, yashikM, .01); tag2.position.y = .02; q.add(tag2); [[0, -.36], [0, .36]].forEach(([dx, dz])=>{ const d = quti(.76, .24, .04, yashikM, .01); d.position.set(dx, .12, dz); q.add(d); }); [[-.36, 0], [.36, 0]].forEach(([dx, dz])=>{ const d = quti(.04, .24, .76, yashikM, .01); d.position.set(dx, .12, dz); q.add(d); }); g.add(q); return q; }
  function toplam(k, q){
    const b = B[k], M = fiz(b.rang, {roughness:.4, clearcoat:.5});
    const r = n=>((n * 9301 + 49297) % 233280) / 233280;
    if(['apples', 'oranges', 'tomatoes', 'onions', 'potatoes'].includes(k)){ for(let i = 0; i < 9; i++){ const s = shar(k === 'potatoes' ? .1 : .11, M, 16); s.position.set(-.22 + (i % 3) * .22, .14 + Math.floor(i / 3) * 0 + (i > 5 ? .1 : 0), -.22 + Math.floor(i / 3) * .22); if(k === 'potatoes') s.scale.set(1.2, .8, 1); if(k === 'onions') s.scale.set(1, 1.1, 1); q.add(s); } }
    else if(k === 'bananas'){ for(let i = 0; i < 5; i++){ const t = new T.Mesh(new T.TorusGeometry(.25, .045, 8, 14, Math.PI * .8), M); t.position.set(-.15 + i * .08, .18, 0); t.rotation.set(Math.PI / 2, 0, .3 + i * .05); q.add(t); } }
    else if(k === 'carrots'){ for(let i = 0; i < 7; i++){ const c = silindr(.045, .005, .5, M, 10); c.rotation.z = Math.PI / 2 + .1; c.rotation.y = i * .2 - .6; c.position.set(0, .12 + (i % 2) * .07, -.24 + i * .08); q.add(c); const barg = silindr(.02, .0, .12, mat('#3f9a4f'), 6); barg.rotation.z = Math.PI / 2; barg.position.set(-.3, .12 + (i % 2) * .07, -.24 + i * .08); q.add(barg); } }
    else if(k === 'eggs'){ const lot = quti(.66, .05, .5, mat('#c9c3b2'), .01); lot.position.y = .08; q.add(lot); for(let i = 0; i < 10; i++){ const e = shar(.065, M, 14); e.scale.y = 1.25; e.position.set(-.26 + (i % 5) * .13, .17, -.1 + Math.floor(i / 5) * .2); q.add(e); } }
    else if(k === 'watermelons'){ const tT = matnTex(128, 128, (x, w, h)=>{ x.fillStyle = '#2f8a45'; x.fillRect(0, 0, w, h); x.fillStyle = '#1d5c2c'; for(let i = 0; i < 6; i++) x.fillRect(i * 22, 0, 8, h); }); const wm = new T.Mesh(new T.SphereGeometry(.3, 24, 18), mat('#ffffff', {map:tT, roughness:.4})); wm.position.set(0, .34, 0); wm.rotation.z = .4; q.add(wm); const wm2 = wm.clone(); wm2.scale.setScalar(.75); wm2.position.set(.28, .26, .2); q.add(wm2); }
    else if(k === 'grapes'){ for(let i = 0; i < 18; i++){ const s = shar(.06, M, 12); const r2 = i < 10 ? .17 : .1, a = i * 1.3; s.position.set(Math.cos(a) * r2 * (i < 10 ? 1 : .8), .1 + (i < 10 ? 0 : .09) + (i % 3) * .03, Math.sin(a) * r2); q.add(s); } }
    else if(k === 'bread'){ for(let i = 0; i < 3; i++){ const n = shar(.2, fiz(b.rang, {roughness:.75}), 18); n.scale.set(1.4, .55, 1); n.position.set(0, .14, -.22 + i * .22); n.rotation.y = .2; q.add(n); const t = new T.Mesh(new T.TorusGeometry(.12, .02, 6, 20), mat('#a8672f')); t.rotation.x = Math.PI / 2; t.position.set(0, .22, -.22 + i * .22); q.add(t); } }
    else if(k === 'cheese'){ const sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(.5, 0); sh.absarc(0, 0, .5, 0, Math.PI / 3, false); sh.lineTo(0, 0); const geo = new T.ExtrudeGeometry(sh, {depth:.22, bevelEnabled:true, bevelThickness:.02, bevelSize:.02, bevelSegments:2}); const c = new T.Mesh(geo, fiz(b.rang, {roughness:.5})); c.rotation.x = -Math.PI / 2; c.position.set(-.2, .07, .25); q.add(c); for(let i = 0; i < 6; i++){ const t = silindr(.035, .035, .25, mat('#e0b23c'), 10); t.rotation.z = Math.PI / 2; t.position.set(.12, .1, -.15 + i * .018 - i * .03); q.add(t); } }
    else if(k === 'milk'){ for(let i = 0; i < 3; i++){ const kart = quti(.2, .42, .2, fiz('#f7f7fb', {roughness:.6}), .02); kart.position.set(-.22 + i * .22, .27, 0); q.add(kart); const ust = quti(.2, .08, .2, fiz('#3f7fc9', {roughness:.6}), .02); ust.position.set(-.22 + i * .22, .5, 0); q.add(ust); const yoz = quti(.18, .12, .005, mat('#3f7fc9'), .005); yoz.position.set(-.22 + i * .22, .25, .103); q.add(yoz); } }
    else if(k === 'rice'){ const qop = quti(.6, .42, .5, fiz('#e8dcc0', {roughness:.9}), .08); qop.position.y = .24; q.add(qop); const og = silindr(.2, .2, .08, mat(b.rang, {roughness:1}), 18); og.position.set(0, .47, 0); q.add(og); const lenta = quti(.62, .06, .52, mat('#c0392b'), .01); lenta.position.y = .2; q.add(lenta); }
    else if(k === 'honey'){ for(let i = 0; i < 3; i++){ const j = silindr(.12, .12, .3, new T.MeshPhysicalMaterial({color:new T.Color(b.rang).convertSRGBToLinear(), roughness:.1, transmission:.5, thickness:.3, clearcoat:1}), 20); j.position.set(-.24 + i * .24, .2, 0); q.add(j); const qop = silindr(.13, .13, .05, mat('#5a3a1a'), 20); qop.position.set(-.24 + i * .24, .37, 0); q.add(qop); } }
  }
  KEYS.forEach((k, i)=>{
    const [x, y, z] = sat[i]; const q = yashik(x, y, z);
    const t = new T.Group(); t.position.set(x, y + .05, z); g.add(t); toplam(k, t);
    bosiladigan(t, k, {predmet:k}); bosiladigan(q, k, {predmet:k});
    JOY[k] = [x, y + .62, z];
    const n = yozuv(B[k].narx, {bal:.2, w:360, h:96, shrift:'700 44px Inter, sans-serif', rang:'#1c2033', fon:'rgba(255,241,200,.94)', chegara:'#c9a24a', chuqurlik:false}); n.position.set(x + .22, y + .3, z + .42); g.add(n);
    const y2 = yozuv(B[k].en, {bal:.27, w:360, h:96, shrift:'700 44px Inter, sans-serif', chuqurlik:false}); y2.position.set(x, y + .66, z); y2.visible = false; g.add(y2); JOY[k].yoz = y2;
  });
  let yozKor = false;
  function korsat(k, bosildi){
    const b = B[k]; belgila([k]);
    const savol = b.san ? 'How much are the ' + b.en + '? — They’re ' + b.narx + '.' : 'How much is the ' + b.en + '? — It’s ' + b.narx + '.';
    karta({ust:(b.san ? 'Countable — sanaladi' : 'Uncountable — sanalmaydi'), en:b.en + (b.bir ? ' · ' + b.bir : ''), ipa:b.ipa, uz:b.uz, misol:'<i>' + esc(savol) + '</i>', qosh:b.san ? 'a/an, two, many, <b>How many?</b>' : 'some, a little, much, <b>How much?</b> (a loaf of / a litre of / a jar of …)', misolOqi:savol, oqi:b.en});
    izoh.innerHTML = '<b>' + b.en + '</b> ' + b.ipa + ' — ' + b.uz + ' (' + (b.san ? 'sanaladi' : 'sanalmaydi') + '). <i>' + esc(savol) + '</i>';
    detal('til_bozor', k); hodisa('til-soz', {nom:k, en:b.en, uz:b.uz, sanaladi:b.san, narx:b.narx, sahna:'bozor', bosildi:!!bosildi});
  }
  S.bosish = ud=>{ if(ud.predmet) korsat(ud.predmet, true); };
  S.holat = h=>{
    if(!h) return;
    if(h.yozuv !== undefined){ yozKor = !!h.yozuv; KEYS.forEach(k=>JOY[k].yoz.visible = yozKor); }
    if(h.filtr){ const ns = KEYS.filter(k=>(h.filtr === 'countable') === !!B[k].san); belgila(ns, h.filtr === 'countable' ? '#5cc8ff' : '#ffb347', .45); KEYS.forEach(k=>JOY[k].yoz.visible = yozKor || ns.includes(k)); izoh.innerHTML = (h.filtr === 'countable' ? '<b>Countable (sanaladi):</b> ' : '<b>Uncountable (sanalmaydi):</b> ') + ns.map(k=>'<i>' + B[k].en + '</i>').join(', ') + '.'; faolQil(tag, '[data-f]', tb[h.filtr]); }
    if(h.predmet && B[h.predmet]){ korsat(h.predmet); JOY[h.predmet].yoz.visible = true; }
    if(h.hamma){ belgila([]); KEYS.forEach(k=>JOY[k].yoz.visible = yozKor); faolQil(tag, '[data-f]', null); }
  };
  const tb = tugmalar(tag, [
    {m:'Yozuvlar', f:b=>{ yozKor = !yozKor; b.classList.toggle('faol', yozKor); KEYS.forEach(k=>JOY[k].yoz.visible = yozKor); }}, '|',
    {m:'Countable', k:'countable', f:()=>S.holat({filtr:'countable'})},
    {m:'Uncountable', k:'uncountable', f:()=>S.holat({filtr:'uncountable'})},
    {m:'Hammasi', f:()=>S.holat({hamma:true})}
  ]);
  tb.countable.dataset.f = 'countable'; tb.uncountable.dataset.f = 'uncountable';
  S.joyla(3.4, new T.Vector3(0, 1.1, 0));
  izoh.innerHTML = 'Rastadagi mahsulotni <b>bosing</b>: so‘z, transkripsiya, tarjima, narx va «How much / How many?» savoli.';
  return S;
};

/* ================= 4. DAILY ROUTINE AND TELLING THE TIME (til_en_vaqt) — 6-sinf ================= */
SOZ.vaqt = {
  get_up:{en:'get up', ipa:'/ɡet ʌp/', uz:'uyg‘onmoq, turmoq', s:7, d:0, misol:'I get up at seven o’clock.'},
  brush_teeth:{en:'brush my teeth', ipa:'/brʌʃ maɪ tiːθ/', uz:'tishimni yuvmoq', s:7, d:15, misol:'I brush my teeth at quarter past seven.'},
  have_breakfast:{en:'have breakfast', ipa:'/hæv ˈbrek.fəst/', uz:'nonushta qilmoq', s:7, d:30, misol:'I have breakfast at half past seven.'},
  go_to_school:{en:'go to school', ipa:'/ɡəʊ tə skuːl/', uz:'maktabga bormoq', s:8, d:0, misol:'I go to school at eight o’clock.'},
  have_lunch:{en:'have lunch', ipa:'/hæv lʌntʃ/', uz:'tushlik qilmoq', s:13, d:0, misol:'I have lunch at one o’clock.'},
  do_homework:{en:'do my homework', ipa:'/duː maɪ ˈhəʊm.wɜːk/', uz:'uy vazifasini bajarmoq', s:15, d:30, misol:'I do my homework at half past three.'},
  play_football:{en:'play football', ipa:'/pleɪ ˈfʊt.bɔːl/', uz:'futbol o‘ynamoq', s:17, d:0, misol:'I play football at five o’clock.'},
  have_dinner:{en:'have dinner', ipa:'/hæv ˈdɪn.ər/', uz:'kechki ovqat qilmoq', s:19, d:0, misol:'We have dinner at seven o’clock.'},
  go_to_bed:{en:'go to bed', ipa:'/ɡəʊ tə bed/', uz:'uxlashga yotmoq', s:21, d:30, misol:'I go to bed at half past nine.'}
};
/* soatni so‘z bilan aytish (British uslubi: past / to; 15 — quarter, 30 — half) */
function vaqtSoz(s, d){
  const S12 = h=>BIR[((h + 11) % 12) + 1];
  const h = s % 12 === 0 ? 12 : s % 12, kn = h % 12 + 1;
  const hw = BIR[h], nw = BIR[kn === 13 ? 1 : kn];
  let t;
  if(d === 0) t = hw + ' o’clock';
  else if(d === 15) t = 'quarter past ' + hw;
  else if(d === 30) t = 'half past ' + hw;
  else if(d === 45) t = 'quarter to ' + nw;
  else if(d < 30) t = sonSoz(d) + (d === 5 || d === 10 || d === 20 || d === 25 ? ' past ' : ' minutes past ') + hw;
  else t = sonSoz(60 - d) + ((60 - d) % 5 === 0 ? ' to ' : ' minutes to ') + nw;
  const kun = s < 12 ? 'in the morning' : s < 17 ? 'in the afternoon' : s < 21 ? 'in the evening' : 'at night';
  return {matn:'It’s ' + t + '.', qisqa:t, kun, raqam:String(h) + ':' + String(d).padStart(2, '0'), am:s < 12 ? 'a.m.' : 'p.m.'};
}
SOZ.vaqtSoz = vaqtSoz;
R.til_en_vaqt = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · Daily routine · telling the time');
  const A = asos(sahna, {rx:.18, ry:-.15, rxMin:-.2, rxMax:.9, ryMin:-1.0, ryMax:1.0, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, podium, yozuv, matnTex, bosiladigan, belgila, karta} = A;
  podium(5.2, 0, '#5cc8ff');
  const V = SOZ.vaqt;
  /* soat */
  const soat = new T.Group(); soat.position.set(0, 2.1, -.6); g.add(soat);
  const halqa = new T.Mesh(new T.TorusGeometry(1.62, .09, 14, 72), fiz('#2b3350', {metalness:.5, roughness:.3, clearcoat:.8})); soat.add(halqa);
  const tana = silindr(1.62, 1.62, .18, mat('#1b2033', {roughness:.5}), 72); tana.rotation.x = Math.PI / 2; tana.position.z = -.1; soat.add(tana);
  const yuzT = matnTex(512, 512, (x, w, h)=>{ x.fillStyle = '#f7f5f0'; x.beginPath(); x.arc(256, 256, 250, 0, 7); x.fill(); x.fillStyle = '#1c2033'; x.textAlign = 'center'; x.textBaseline = 'middle'; for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6 - Math.PI / 2; x.font = '700 44px Inter, sans-serif'; x.fillText(String(i), 256 + Math.cos(a) * 200, 256 + Math.sin(a) * 200 + 2); } for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30; const L = i % 5 ? 10 : 22; x.strokeStyle = i % 5 ? '#8c93a3' : '#1c2033'; x.lineWidth = i % 5 ? 2 : 5; x.beginPath(); x.moveTo(256 + Math.cos(a) * 236, 256 + Math.sin(a) * 236); x.lineTo(256 + Math.cos(a) * (236 - L), 256 + Math.sin(a) * (236 - L)); x.stroke(); } x.fillStyle = '#8c93a3'; x.font = '600 20px Inter, sans-serif'; x.fillText('past  ◂   ▸  to', 256, 330); });
  const yuz = new T.Mesh(new T.CircleGeometry(1.55, 72), new T.MeshBasicMaterial({map:yuzT, toneMapped:false})); yuz.position.z = .0; soat.add(yuz);
  bosiladigan(yuz, 'face', {qism:'face'});
  const soatStr = new T.Group(), daqStr = new T.Group(); soat.add(soatStr); soat.add(daqStr);
  const sS = quti(.11, .95, .05, mat('#1c2033', {roughness:.4}), .02); sS.position.y = .4; soatStr.add(sS); soatStr.position.z = .06;
  const dS = quti(.08, 1.35, .05, mat('#d9403a', {roughness:.4}), .02); dS.position.y = .6; daqStr.add(dS); daqStr.position.z = .1;
  bosiladigan(soatStr, 'hour_hand', {qism:'hour_hand'}); bosiladigan(daqStr, 'minute_hand', {qism:'minute_hand'});
  const markaz = silindr(.09, .09, .08, mat('#e0c070', {metalness:.9, roughness:.25}), 24); markaz.rotation.x = Math.PI / 2; markaz.position.z = .14; soat.add(markaz);
  soya(3.8, 1.2, 0, -.6, 0, .5);
  const oyoq = quti(1.4, .25, .5, fiz('#2b3350', {metalness:.4, roughness:.3}), .05); oyoq.position.set(0, .13, -.6); g.add(oyoq);
  const ustun = quti(.3, .5, .3, mat('#2b3350'), .03); ustun.position.set(0, .4, -.6); g.add(ustun);
  const vaqtYoz = yozuv('', {bal:.5, w:900, h:128, shrift:'700 58px Inter, sans-serif', chuqurlik:false}); vaqtYoz.position.set(0, 4.15, -.6); g.add(vaqtYoz);
  const raqamYoz = yozuv('', {bal:.34, w:360, h:110, shrift:'800 62px "JetBrains Mono", monospace', rang:'#ffd57f', chuqurlik:false}); raqamYoz.position.set(0, .45, .5); g.add(raqamYoz);
  /* kundalik ishlar: mini-modellar yarim doira bo‘ylab */
  const ISH = Object.keys(V); const ishG = {};
  const IK = {
    get_up(q){ const b = quti(.5, .12, .36, mat('#8a5a35'), .02); b.position.y = .12; q.add(b); const m = quti(.48, .08, .34, fiz('#f2efe6'), .02); m.position.y = .22; q.add(m); const y = quti(.14, .06, .2, fiz('#fff'), .02); y.position.set(-.16, .29, 0); q.add(y); const quyosh = shar(.1, new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false}), 12); quyosh.position.set(.2, .5, 0); q.add(quyosh); },
    brush_teeth(q){ const d = silindr(.03, .03, .5, fiz('#3f7fc9'), 10); d.rotation.z = .9; d.position.set(0, .3, 0); q.add(d); const ch = quti(.14, .06, .06, fiz('#fff'), .01); ch.position.set(.19, .48, 0); ch.rotation.z = .9; q.add(ch); },
    have_breakfast(q){ const t = silindr(.24, .18, .1, fiz('#f2efe6'), 28); t.position.y = .06; q.add(t); const n = shar(.1, fiz('#c98a4b', {roughness:.8}), 12); n.scale.y = .5; n.position.set(0, .13, 0); q.add(n); const ch = silindr(.07, .05, .16, fiz('#fff'), 16); ch.position.set(.3, .1, .05); q.add(ch); },
    go_to_school(q){ const s = quti(.34, .42, .16, fiz('#d9403a', {roughness:.5}), .04); s.position.y = .24; q.add(s); const c = quti(.3, .18, .17, fiz('#b82f2a'), .03); c.position.set(0, .14, .0); q.add(c); const r = new T.Mesh(new T.TorusGeometry(.09, .02, 6, 16, Math.PI), mat('#3a2a1c')); r.position.set(0, .45, 0); q.add(r); },
    have_lunch(q){ const t = silindr(.26, .2, .08, fiz('#f2efe6'), 28); t.position.y = .05; q.add(t); for(let i = 0; i < 6; i++){ const g2 = shar(.05, fiz(i % 2 ? '#e8a21c' : '#2faa52'), 8); g2.position.set(Math.cos(i) * .12, .12, Math.sin(i) * .12); q.add(g2); } },
    do_homework(q){ const k = quti(.42, .05, .3, fiz('#3f7fc9'), .01); k.position.y = .03; q.add(k); const v = quti(.38, .02, .26, fiz('#fff'), .005); v.position.y = .065; q.add(v); const qalam = silindr(.02, .02, .32, fiz('#ffd24a'), 8); qalam.rotation.z = 1.2; qalam.position.set(.12, .12, .08); q.add(qalam); },
    play_football(q){ const fT = A.matnTex(128, 128, (x, w, h)=>{ x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#111'; [[30, 30], [95, 40], [60, 90], [20, 100], [100, 100]].forEach(([cx, cy])=>{ x.beginPath(); for(let i = 0; i < 5; i++){ const a = i * 1.2566; x.lineTo(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16); } x.closePath(); x.fill(); }); }); const b = new T.Mesh(new T.SphereGeometry(.22, 20, 14), mat('#fff', {map:fT, roughness:.5})); b.position.y = .22; q.add(b); },
    have_dinner(q){ const t = silindr(.26, .2, .08, fiz('#f2efe6'), 28); t.position.y = .05; q.add(t); const o = shar(.16, fiz('#c98a4b'), 12); o.scale.y = .5; o.position.y = .12; q.add(o); const sh = silindr(.02, .02, .3, mat('#cfd3dc', {metalness:.9, roughness:.3}), 6); sh.position.set(-.3, .06, 0); q.add(sh); const sham = silindr(.03, .03, .3, fiz('#fff'), 10); sham.position.set(.36, .15, 0); q.add(sham); const alanga = shar(.04, new T.MeshBasicMaterial({color:0xffb347, toneMapped:false}), 8); alanga.position.set(.36, .34, 0); q.add(alanga); },
    go_to_bed(q){ const b = quti(.5, .12, .36, mat('#8a5a35'), .02); b.position.y = .12; q.add(b); const m = quti(.48, .1, .34, fiz('#4a74c9'), .02); m.position.y = .23; q.add(m); const oy = new T.Mesh(new T.TorusGeometry(.1, .04, 8, 20, Math.PI * 1.2), new T.MeshBasicMaterial({color:0xffe9a0, toneMapped:false})); oy.position.set(.2, .5, 0); oy.rotation.z = .6; q.add(oy); }
  };
  ISH.forEach((k, i)=>{
    const a = -Math.PI * .78 + i * (Math.PI * 1.56 / (ISH.length - 1));
    const x = Math.sin(a) * 4.1, z = -Math.cos(a) * 4.1 + 2.6;
    const q = new T.Group(); q.position.set(x, 0, z); q.rotation.y = -a; g.add(q);
    const p = silindr(.44, .5, .1, fiz('#202845', {roughness:.35, metalness:.2, clearcoat:.6}), 36); p.position.y = .05; q.add(p);
    IK[k](q); bosiladigan(q, k, {ish:k}); soya(1.1, 1.1, x, z, 0, .5);
    const y = yozuv(V[k].en, {bal:.26, w:420, h:96, shrift:'700 44px Inter, sans-serif', chuqurlik:false}); y.position.set(x, 1.05, z); g.add(y);
    const y2 = yozuv(String(V[k].s > 12 ? V[k].s - 12 : V[k].s) + ':' + String(V[k].d).padStart(2, '0'), {bal:.2, w:200, h:90, shrift:'700 50px "JetBrains Mono", monospace', rang:'#ffd57f', fon:false, chuqurlik:false}); y2.position.set(x, 1.32, z); g.add(y2);
    ishG[k] = q;
  });
  let soatN = 7, daqN = 0, sTg = 0, dTg = 0, joriyIsh = null;
  function yangila(yubor){
    daqN = ((Math.round(daqN / 5) * 5) % 60 + 60) % 60; soatN = ((soatN % 24) + 24) % 24;
    sTg = -((soatN % 12) + daqN / 60) * Math.PI / 6; dTg = -daqN * Math.PI / 30;
    const vs = vaqtSoz(soatN, daqN);
    vaqtYoz.yoz(vs.matn); raqamYoz.yoz(vs.raqam + ' ' + vs.am);
    if(yubor !== false) hodisa('til-vaqt', {soat:soatN, daqiqa:daqN, matn:vs.matn, soz:vs.qisqa, ish:joriyIsh});
    return vs;
  }
  function ishKorsat(k, bosildi){
    const v = V[k]; joriyIsh = k; soatN = v.s; daqN = v.d; const vs = yangila(false);
    belgila([k]);
    karta({ust:'Daily routine — kundalik ish', en:v.en, ipa:v.ipa, uz:v.uz, misol:'<i>' + esc(v.misol) + '</i> (' + vs.raqam + ' ' + vs.am + ', ' + vs.kun + ')', misolOqi:v.misol, oqi:v.en});
    izoh.innerHTML = '<b>' + v.en + '</b> — ' + v.uz + '. <i>' + esc(v.misol) + '</i> ' + vs.matn;
    detal('til_vaqt', k); hodisa('til-vaqt', {soat:soatN, daqiqa:daqN, matn:vs.matn, soz:vs.qisqa, ish:k, bosildi:!!bosildi});
  }
  const QISM = {face:['clock face', '/klɒk feɪs/', 'soat siferblati — 1 dan 12 gacha raqamlar; 60 ta kichik chiziq — daqiqalar'], hour_hand:['hour hand', '/aʊər hænd/', 'soat strelkasi (kalta) — soatni ko‘rsatadi'], minute_hand:['minute hand', '/ˈmɪn.ɪt hænd/', 'daqiqa strelkasi (uzun) — daqiqani ko‘rsatadi']};
  S.bosish = ud=>{
    if(ud.ish) ishKorsat(ud.ish, true);
    else if(ud.qism && QISM[ud.qism]){ const q = QISM[ud.qism]; belgila([ud.qism]); karta({ust:'Clock — soat', en:q[0], ipa:q[1], uz:q[2], oqi:q[0]}); detal('til_vaqt', ud.qism); hodisa('til-soat-qism', {nom:ud.qism}); }
  };
  S.holat = h=>{
    if(!h) return;
    if(h.ish && V[h.ish]) ishKorsat(h.ish);
    if(h.soat !== undefined){ soatN = +h.soat; joriyIsh = null; belgila([]); }
    if(h.daqiqa !== undefined){ daqN = +h.daqiqa; joriyIsh = null; }
    if(h.soat !== undefined || h.daqiqa !== undefined){ const vs = yangila(false); izoh.innerHTML = '<b>' + vs.raqam + ' ' + vs.am + '</b> — ' + vs.matn + ' (' + vs.kun + ')'; }
  };
  tugmalar(tag, [
    {m:'− 1 h', f:()=>{ soatN--; joriyIsh = null; belgila([]); yangila(); }},
    {m:'+ 1 h', f:()=>{ soatN++; joriyIsh = null; belgila([]); yangila(); }}, '|',
    {m:'− 5 min', f:()=>{ daqN -= 5; if(daqN < 0) soatN--; joriyIsh = null; belgila([]); yangila(); }},
    {m:'+ 5 min', f:()=>{ daqN += 5; if(daqN >= 60) soatN++; joriyIsh = null; belgila([]); yangila(); }}, '|',
    {m:OVOZ_IK + ' Say the time', f:b=>talaffuz(vaqtSoz(soatN, daqN).matn, b)}
  ]);
  let sJ = sTg, dJ = dTg;
  S.kadrda = (dt, t)=>{
    const yaqin = (a, b)=>{ let d = b - a; while(d > Math.PI) d -= Math.PI * 2; while(d < -Math.PI) d += Math.PI * 2; return a + d * Math.min(1, dt * 6); };
    sJ = yaqin(sJ, sTg); dJ = yaqin(dJ, dTg); soatStr.rotation.z = sJ; daqStr.rotation.z = dJ;
    if(joriyIsh && ishG[joriyIsh]) ishG[joriyIsh].position.y = Math.abs(Math.sin(t * 3)) * .08;
  };
  yangila(false); sJ = sTg; dJ = dTg;
  S.joyla(4.4, new T.Vector3(0, 1.7, .4));
  izoh.innerHTML = 'Kundalik ishni <b>bosing</b> — soat o‘sha vaqtni ko‘rsatadi va gap inglizcha aytiladi. Pastdagi tugmalar bilan vaqtni o‘zgartiring.';
  return S;
};


/* ================= 5. PREPOSITIONS OF PLACE (til_en_joy) — 7-sinf ================= */
SOZ.joy = {
  in:{en:'in', ipa:'/ɪn/', uz:'ichida', gap:'The ball is in the box.'},
  on:{en:'on', ipa:'/ɒn/', uz:'ustida (tegib turgan)', gap:'The ball is on the box.'},
  under:{en:'under', ipa:'/ˈʌn.dər/', uz:'ostida, tagida', gap:'The ball is under the table.'},
  next_to:{en:'next to', ipa:'/nekst tuː/', uz:'yonida', gap:'The ball is next to the box.'},
  between:{en:'between', ipa:'/bɪˈtwiːn/', uz:'orasida (ikki narsa)', gap:'The ball is between the box and the table.'},
  in_front_of:{en:'in front of', ipa:'/ɪn frʌnt əv/', uz:'oldida, qarshisida', gap:'The ball is in front of the box.'},
  behind:{en:'behind', ipa:'/bɪˈhaɪnd/', uz:'orqasida', gap:'The ball is behind the box.'},
  above:{en:'above', ipa:'/əˈbʌv/', uz:'tepasida (tegmasdan)', gap:'The ball is above the box.'}
};
R.til_en_joy = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · Prepositions of place · to‘p qayerda?');
  const A = asos(sahna, {rx:.42, ry:.55, rxMin:.05, rxMax:1.1, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, podium, yozuv, matnTex, bosiladigan, belgila, karta} = A;
  podium(4.6, 0, '#a996ff');
  const J = SOZ.joy;
  /* karton quti (qopqoqlari ochiladi) */
  const box = new T.Group(); box.position.set(-1.25, 0, 0); g.add(box);
  const kT = matnTex(256, 256, (x, w, h)=>{ x.fillStyle = '#c9a071'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(0,0,0,.12)'; x.lineWidth = 2; for(let i = 0; i < 24; i++){ x.beginPath(); x.moveTo(0, i * 11); x.lineTo(w, i * 11); x.stroke(); } x.fillStyle = '#8a6a44'; x.font = '700 40px Inter, sans-serif'; x.textAlign = 'center'; x.fillText('BOX', 128, 150); });
  const kM = mat('#ffffff', {map:kT, roughness:.85, env:.1});
  const B = 1.0;
  const tagl = quti(B, .04, B, kM, .005); tagl.position.y = .02; box.add(tagl);
  [[0, -B / 2 + .02, B, .04], [0, B / 2 - .02, B, .04]].forEach(([x, z, w, d])=>{ const m = quti(w, .72, d, kM, .005); m.position.set(x, .38, z); box.add(m); });
  [[-B / 2 + .02, 0], [B / 2 - .02, 0]].forEach(([x, z])=>{ const m = quti(.04, .72, B, kM, .005); m.position.set(x, .38, z); box.add(m); });
  const qop1 = new T.Group(), qop2 = new T.Group(); qop1.position.set(0, .74, -B / 2); qop2.position.set(0, .74, B / 2); box.add(qop1); box.add(qop2);
  const q1 = quti(B, .035, B / 2, kM, .005); q1.position.z = B / 4; qop1.add(q1);
  const q2 = quti(B, .035, B / 2, kM, .005); q2.position.z = -B / 4; qop2.add(q2);
  const lenta = quti(.14, .005, B + .01, mat('#b58a4e', {roughness:.6}), .001); lenta.position.y = .775; box.add(lenta);
  bosiladigan(box, 'box'); soya(1.5, 1.5, -1.25, 0, 0, .55);
  /* stol */
  const table = new T.Group(); table.position.set(1.4, 0, 0); g.add(table);
  const yog = mat('#8a5a35', {roughness:.5});
  const ust = quti(1.5, .07, 1.0, yog, .02); ust.position.y = 1.0; table.add(ust);
  [[-.65, -.4], [.65, -.4], [-.65, .4], [.65, .4]].forEach(([x, z])=>{ const o = quti(.08, .97, .08, yog, .01); o.position.set(x, .48, z); table.add(o); });
  bosiladigan(table, 'table'); soya(2.0, 1.4, 1.4, 0, 0, .5);
  /* to‘p */
  const fT = matnTex(256, 256, (x, w, h)=>{ x.fillStyle = '#f7f7fb'; x.fillRect(0, 0, w, h); x.fillStyle = '#1b1d24'; [[40, 40], [150, 30], [220, 110], [90, 130], [30, 210], [170, 200]].forEach(([cx, cy])=>{ x.beginPath(); for(let i = 0; i < 5; i++){ const a = i * 1.2566 - .3; x.lineTo(cx + Math.cos(a) * 28, cy + Math.sin(a) * 28); } x.closePath(); x.fill(); }); });
  const ball = new T.Mesh(new T.SphereGeometry(.3, 36, 24), fiz('#ffffff', {map:fT, roughness:.35, clearcoat:.5})); g.add(ball); bosiladigan(ball, 'ball');
  const bSoya = soya(.9, .9, 0, 0, 0, .6);
  const ip = silindr(.006, .006, 1, mat('#cfd3dc'), 6); ip.visible = false; g.add(ip);
  const gapYoz = yozuv('', {bal:.5, w:1000, h:128, shrift:'700 56px Inter, sans-serif', chuqurlik:false}); gapYoz.position.set(0, 2.9, 0); g.add(gapYoz);
  const JOYLAR = {in:[-1.25, .36, 0], on:[-1.25, 1.07, 0], under:[1.4, .3, 0], next_to:[-2.45, .3, 0], between:[.15, .3, 0], in_front_of:[-1.25, .3, 1.05], behind:[-1.25, .3, -1.05], above:[-1.25, 1.95, 0]};
  let joriy = 'on', maqsad = new T.Vector3(...JOYLAR.on), qopT = 0, qopJ = 0;
  function korsat(k, bosildi, yashir){
    const j = J[k]; if(!j) return; joriy = k; maqsad.set(...JOYLAR[k]); qopT = k === 'in' ? 1 : 0;
    gapYoz.yoz(j.gap); gapYoz.visible = !yashir;
    faolQil(tag, '[data-j]', yashir ? null : tb[k]);
    if(yashir){ sahna.querySelectorAll('.til-p').forEach(x=>x.remove()); izoh.innerHTML = 'Sahnaga qarang: to‘p qayerda? Javobni o‘ng paneldagi variantlardan tanlang.'; hodisa('til-joy', {joy:k, en:j.en, gap:j.gap, yashirin:true}); return; }
    karta({ust:'Preposition of place — o‘rin predlogi', en:j.en, ipa:j.ipa, uz:j.uz, misol:'<i>' + esc(j.gap) + '</i>', misolOqi:j.gap, oqi:j.en});
    izoh.innerHTML = '<b>' + j.en + '</b> ' + j.ipa + ' — ' + j.uz + '. <i>' + esc(j.gap) + '</i>';
    detal('til_joy', k); hodisa('til-joy', {joy:k, en:j.en, gap:j.gap, bosildi:!!bosildi});
  }
  const NARSA = {ball:['ball', '/bɔːl/', 'to‘p', 'Where is the ball?'], box:['box', '/bɒks/', 'quti', 'The box is next to the table.'], table:['table', '/ˈteɪ.bəl/', 'stol', 'The table is big.']};
  S.bosish = ud=>{ const n = NARSA[ud.nom]; if(!n) return; belgila([ud.nom]); karta({ust:'Thing — narsa', en:n[0], ipa:n[1], uz:n[2], misol:'<i>' + n[3] + '</i>', misolOqi:n[3], oqi:n[0]}); detal('til_joy', ud.nom); hodisa('til-narsa', {nom:ud.nom}); if(ud.nom === 'ball') hodisa('til-joy', {joy:joriy, en:J[joriy].en, gap:J[joriy].gap, bosildi:true}); };
  S.holat = h=>{ if(h && h.joy && J[h.joy]) korsat(h.joy, false, !!h.yashir); else if(h && h.yashir !== undefined) gapYoz.visible = !h.yashir; };
  const tb = tugmalar(tag, Object.keys(J).map(k=>({m:J[k].en, k, f:()=>korsat(k, true)})));
  Object.keys(J).forEach(k=>{ tb[k].dataset.j = k; });
  ball.position.copy(maqsad);
  S.kadrda = (dt, t)=>{
    ball.position.lerp(maqsad, Math.min(1, dt * 4));
    if(joriy === 'above') ball.position.y = maqsad.y + Math.sin(t * 2) * .06;
    ball.rotation.y += dt * .6;
    bSoya.position.set(ball.position.x, .005, ball.position.z); bSoya.material.opacity = joriy === 'above' ? .25 : joriy === 'in' ? 0 : .6;
    ip.visible = joriy === 'above'; if(ip.visible){ ip.position.set(ball.position.x, ball.position.y + .8, ball.position.z); }
    qopJ += (qopT - qopJ) * Math.min(1, dt * 5); qop1.rotation.x = -qopJ * 2.4; qop2.rotation.x = qopJ * 2.4;
  };
  korsat('on');
  S.joyla(3.3, new T.Vector3(0, .9, 0));
  return S;
};

/* ================= 6. PARTS OF THE BODY AND HEALTH (til_en_tana) — 8-sinf ================= */
SOZ.tana = {
  head:{en:'head', ipa:'/hed/', uz:'bosh', dard:'I have a headache.', dardUz:'Boshim og‘riyapti.', maslahat:'You should take a painkiller and have a rest.'},
  hair:{en:'hair', ipa:'/heər/', uz:'soch', dard:'', maslahat:''},
  eye:{en:'eye', ipa:'/aɪ/', uz:'ko‘z', dard:'My eyes hurt.', dardUz:'Ko‘zlarim og‘riyapti.', maslahat:'You should stop looking at the screen and rest your eyes.'},
  ear:{en:'ear', ipa:'/ɪər/', uz:'quloq', dard:'I have an earache.', dardUz:'Qulog‘im og‘riyapti.', maslahat:'You should see a doctor.'},
  nose:{en:'nose', ipa:'/nəʊz/', uz:'burun', dard:'I have a cold. My nose is running.', dardUz:'Shamollaganman, burnim oqyapti.', maslahat:'You should drink hot tea and stay at home.'},
  mouth:{en:'mouth', ipa:'/maʊθ/', uz:'og‘iz', dard:'I have a toothache.', dardUz:'Tishim og‘riyapti.', maslahat:'You should go to the dentist.'},
  neck:{en:'neck', ipa:'/nek/', uz:'bo‘yin', dard:'I have a sore throat.', dardUz:'Tomog‘im og‘riyapti.', maslahat:'You should drink warm water with honey.'},
  shoulder:{en:'shoulder', ipa:'/ˈʃəʊl.dər/', uz:'yelka', dard:'My shoulder hurts.', dardUz:'Yelkam og‘riyapti.', maslahat:'You shouldn’t carry heavy bags.'},
  chest:{en:'chest', ipa:'/tʃest/', uz:'ko‘krak', dard:'I have a cough.', dardUz:'Yo‘talyapman.', maslahat:'You should take some cough syrup.'},
  stomach:{en:'stomach', ipa:'/ˈstʌm.ək/', uz:'qorin, oshqozon', dard:'I have a stomach ache.', dardUz:'Qornim og‘riyapti.', maslahat:'You shouldn’t eat fast food.'},
  back:{en:'back', ipa:'/bæk/', uz:'bel, orqa', dard:'I have a backache.', dardUz:'Belim og‘riyapti.', maslahat:'You should sit straight and do exercises.'},
  arm:{en:'arm', ipa:'/ɑːm/', uz:'qo‘l (yelkadan bilakkacha)', dard:'I have hurt my arm.', dardUz:'Qo‘limni lat yedim.', maslahat:'You should put some ice on it.'},
  elbow:{en:'elbow', ipa:'/ˈel.bəʊ/', uz:'tirsak', dard:'', maslahat:''},
  hand:{en:'hand', ipa:'/hænd/', uz:'qo‘l (panja)', dard:'I have cut my hand.', dardUz:'Qo‘limni kesib oldim.', maslahat:'You should wash it and put a plaster on it.'},
  finger:{en:'finger', ipa:'/ˈfɪŋ.ɡər/', uz:'barmoq', dard:'I have cut my finger.', dardUz:'Barmog‘imni kesib oldim.', maslahat:'You should put a plaster on it.'},
  leg:{en:'leg', ipa:'/leɡ/', uz:'oyoq (son va boldir)', dard:'I have broken my leg.', dardUz:'Oyog‘imni sindirdim.', maslahat:'You must go to the hospital.'},
  knee:{en:'knee', ipa:'/niː/', uz:'tizza', dard:'My knee hurts.', dardUz:'Tizzam og‘riyapti.', maslahat:'You shouldn’t run today.'},
  foot:{en:'foot', ipa:'/fʊt/', uz:'oyoq panjasi (ko‘plik: feet)', dard:'My feet hurt.', dardUz:'Oyoqlarim og‘riyapti.', maslahat:'You should wear comfortable shoes.'}
};
R.til_en_tana = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · Parts of the body · soddalashtirilgan figura');
  const A = asos(sahna, {rx:.1, ry:.25, rxMin:-.3, rxMax:.8, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, podium, yozuv, bosiladigan, belgila, karta} = A;
  podium(2.2, 0, '#ff8fab');
  const TN = SOZ.tana;
  const teri = fiz('#e8b894', {roughness:.55, clearcoat:.15}), kiyim = fiz('#3f7fc9', {roughness:.6}), shim = fiz('#2b3350', {roughness:.7}), poy = fiz('#1b1d24', {roughness:.5});
  const F = new T.Group(); g.add(F);
  const qism = (m, nom)=>{ bosiladigan(m, nom, {qism:nom}); return m; };
  /* bosh */
  const head = shar(.3, teri, 32); head.position.y = 2.42; head.scale.set(.92, 1.05, .92); F.add(qism(head, 'head'));
  const hair = new T.Mesh(new T.SphereGeometry(.31, 32, 16, 0, Math.PI * 2, 0, Math.PI * .55), fiz('#3a2a1c', {roughness:.8})); hair.position.y = 2.47; hair.scale.set(.95, 1.0, .95); F.add(qism(hair, 'hair'));
  [-.1, .1].forEach(x=>{ const e = shar(.045, fiz('#ffffff', {roughness:.3}), 12); e.position.set(x, 2.46, .26); F.add(qism(e, 'eye')); const q = shar(.022, mat('#1b1d24'), 8); q.position.set(x, 2.46, .3); F.add(qism(q, 'eye')); });
  [-.28, .28].forEach(x=>{ const e = shar(.06, teri, 12); e.scale.set(.5, 1, .8); e.position.set(x, 2.42, .02); F.add(qism(e, 'ear')); });
  const nose = new T.Mesh(new T.ConeGeometry(.045, .12, 10), teri); nose.rotation.x = Math.PI / 2; nose.position.set(0, 2.38, .3); F.add(qism(nose, 'nose'));
  const mouth = new T.Mesh(new T.TorusGeometry(.07, .018, 8, 16, Math.PI), fiz('#c0392b', {roughness:.5})); mouth.rotation.z = Math.PI; mouth.position.set(0, 2.29, .27); F.add(qism(mouth, 'mouth'));
  const neck = silindr(.1, .11, .18, teri, 20); neck.position.y = 2.1; F.add(qism(neck, 'neck'));
  /* tana */
  const chest = quti(.7, .55, .36, kiyim, .12); chest.position.y = 1.78; F.add(qism(chest, 'chest'));
  const stomach = quti(.62, .36, .33, kiyim, .1); stomach.position.y = 1.34; F.add(qism(stomach, 'stomach'));
  const back = quti(.66, .8, .06, kiyim, .02); back.position.set(0, 1.58, -.17); F.add(qism(back, 'back'));
  [-.42, .42].forEach(x=>{ const sh = shar(.12, kiyim, 16); sh.position.set(x, 1.98, 0); F.add(qism(sh, 'shoulder')); });
  /* qo‘llar */
  [-1, 1].forEach(s=>{
    const qol = new T.Group(); qol.position.set(s * .44, 1.98, 0); F.add(qol);
    const ust = silindr(.085, .075, .5, kiyim, 16); ust.position.y = -.27; qol.add(qism(ust, 'arm'));
    const elb = shar(.08, teri, 14); elb.position.y = -.55; qol.add(qism(elb, 'elbow'));
    const bil = silindr(.07, .06, .48, teri, 16); bil.position.y = -.82; qol.add(qism(bil, 'arm'));
    const hand = quti(.14, .18, .08, teri, .03); hand.position.y = -1.14; qol.add(qism(hand, 'hand'));
    for(let i = 0; i < 4; i++){ const f = silindr(.016, .014, .12, teri, 8); f.position.set(-.05 + i * .033, -1.29, 0); qol.add(qism(f, 'finger')); }
    const bosh2 = silindr(.018, .015, .09, teri, 8); bosh2.position.set(s * .085, -1.14, .02); bosh2.rotation.z = -s * .6; qol.add(qism(bosh2, 'finger'));
    qol.rotation.z = s * .14; qol.userData.s = s;
  });
  /* oyoqlar */
  [-1, 1].forEach(s=>{
    const oy = new T.Group(); oy.position.set(s * .17, 1.16, 0); F.add(oy);
    const son = silindr(.12, .1, .55, shim, 16); son.position.y = -.28; oy.add(qism(son, 'leg'));
    const knee = shar(.1, shim, 14); knee.position.y = -.57; oy.add(qism(knee, 'knee'));
    const bol = silindr(.095, .08, .5, shim, 16); bol.position.y = -.84; oy.add(qism(bol, 'leg'));
    const foot = quti(.18, .1, .34, poy, .03); foot.position.set(0, -1.12, .07); oy.add(qism(foot, 'foot'));
  });
  soya(1.6, 1.0, 0, .05, 0, .6);
  const yoz = yozuv('', {bal:.3, w:640, h:120, shrift:'700 52px Inter, sans-serif', chuqurlik:false}); yoz.position.set(1.4, 2.95, 0); yoz.visible = false; g.add(yoz);
  const dardYoz = yozuv('', {bal:.44, w:1100, h:120, shrift:'600 50px Inter, sans-serif', rang:'#ffd57f', chuqurlik:false}); dardYoz.position.set(0, 3.35, 0); dardYoz.visible = false; g.add(dardYoz);
  let yozKor = false; const yozlar = [];
  const JOY = {head:[-.62, 2.66, .2], hair:[.0, 2.92, 0], eye:[.52, 2.52, .25], ear:[-.58, 2.34, .05], nose:[.0, 2.4, .42], mouth:[.0, 2.18, .4], neck:[.5, 2.08, .12], shoulder:[-.62, 1.98, .05], chest:[0, 1.78, .22], stomach:[0, 1.34, .2], back:[.6, 1.58, -.22], arm:[-.62, 1.6, .05], elbow:[.62, 1.43, .05], hand:[-.62, .9, .06], finger:[.62, .66, .04], leg:[-.3, 1.0, .14], knee:[.32, .62, .14], foot:[-.32, .18, .34]};
  Object.keys(JOY).forEach(k=>{ const s = yozuv(TN[k].en, {bal:.19, w:260, h:90, shrift:'700 44px Inter, sans-serif', chuqurlik:false}); s.position.set(...JOY[k]); s.visible = false; g.add(s); yozlar.push(s); });
  let joriy = null;
  function korsat(k, bosildi, dardRejim){
    const t = TN[k]; if(!t) return; joriy = k;
    belgila([k], '#ff6f5c', .6);
    const dard = dardRejim && t.dard;
    yoz.visible = true; yoz.yoz(t.en); yoz.position.set(JOY[k][0] < 0 ? -1.45 : 1.45, Math.max(.6, Math.min(2.7, JOY[k][1])), .3);
    dardYoz.visible = !!dard; if(dard) dardYoz.yoz(t.dard);
    karta({ust:dard ? 'Health — salomatlik' : 'Body — tana a’zosi', en:dard ? t.dard : t.en, ipa:t.ipa, uz:dard ? t.dardUz + ' (' + t.uz + ')' : t.uz, misol:dard ? '<i>A: What’s the matter? B: ' + esc(t.dard) + '<br>A: ' + esc(t.maslahat) + '</i>' : (t.dard ? '<i>' + esc(t.dard) + '</i>' : ''), misolOqi:dard ? 'What is the matter? ' + t.dard + ' ' + t.maslahat : (t.dard || undefined), oqi:t.en});
    izoh.innerHTML = '<b>' + t.en + '</b> ' + t.ipa + ' — ' + t.uz + (t.dard ? '. <i>' + esc(t.dard) + '</i> — ' + esc(t.dardUz) + (dard ? ' <b>Maslahat:</b> <i>' + esc(t.maslahat) + '</i>' : '') : '.');
    detal('til_tana', k); hodisa('til-soz', {nom:k, en:t.en, uz:t.uz, sahna:'tana', dard:t.dard, bosildi:!!bosildi});
  }
  S.bosish = ud=>{ if(ud.qism) korsat(ud.qism, true, dardRej); };
  let dardRej = false;
  S.holat = h=>{
    if(!h) return;
    if(h.yozuv !== undefined){ yozKor = !!h.yozuv; yozlar.forEach(s=>s.visible = yozKor); }
    if(h.dard !== undefined){ dardRej = !!h.dard; faolQil(tag, '[data-d]', dardRej ? tb.dard : null); }
    if(h.qism && TN[h.qism]) korsat(h.qism, false, dardRej);
    if(h.guruh === 'bosh'){ const ns = ['head', 'hair', 'eye', 'ear', 'nose', 'mouth']; belgila(ns, '#ffb347', .45); izoh.innerHTML = '<b>Head (bosh qismlari):</b> ' + ns.map(k=>'<i>' + TN[k].en + '</i>').join(', ') + '.'; }
    if(h.guruh === 'tana'){ const ns = ['neck', 'shoulder', 'chest', 'stomach', 'back']; belgila(ns, '#ffb347', .45); izoh.innerHTML = '<b>Body (tana):</b> ' + ns.map(k=>'<i>' + TN[k].en + '</i>').join(', ') + '.'; }
    if(h.guruh === 'qol'){ const ns = ['arm', 'elbow', 'hand', 'finger']; belgila(ns, '#ffb347', .45); izoh.innerHTML = '<b>Arm (qo‘l):</b> ' + ns.map(k=>'<i>' + TN[k].en + '</i>').join(', ') + '.'; }
    if(h.guruh === 'oyoq'){ const ns = ['leg', 'knee', 'foot']; belgila(ns, '#ffb347', .45); izoh.innerHTML = '<b>Leg (oyoq):</b> ' + ns.map(k=>'<i>' + TN[k].en + '</i>').join(', ') + ' (foot → feet).'; }
  };
  const tb = tugmalar(tag, [
    {m:'Yozuvlar', f:b=>{ yozKor = !yozKor; b.classList.toggle('faol', yozKor); yozlar.forEach(s=>s.visible = yozKor); }}, '|',
    {m:'Head', f:()=>S.holat({guruh:'bosh'})}, {m:'Body', f:()=>S.holat({guruh:'tana'})}, {m:'Arm', f:()=>S.holat({guruh:'qol'})}, {m:'Leg', f:()=>S.holat({guruh:'oyoq'})}, '|',
    {m:'What’s the matter?', k:'dard', t:'Salomatlik rejimi: a’zoni bosganda dialog chiqadi', f:b=>{ dardRej = !dardRej; b.classList.toggle('faol', dardRej); if(joriy) korsat(joriy, false, dardRej); }}
  ]);
  tb.dard.dataset.d = 1;
  S.kadrda = (dt, t)=>{ F.position.y = Math.sin(t * 1.4) * .012; F.children.forEach(c=>{ if(c.userData.s) c.rotation.z = c.userData.s * (.14 + Math.sin(t * 1.4) * .02); }); chest.scale.x = 1 + Math.sin(t * 1.4) * .012; };
  S.joyla(1.85, new T.Vector3(0, 1.45, 0));
  izoh.innerHTML = 'Tana a’zosini <b>bosing</b> — so‘z, transkripsiya, tarjima. «What’s the matter?» rejimida — «I have a headache» kabi dialog.';
  return S;
};

/* ================= 7. IN THE CITY: ASKING FOR DIRECTIONS (til_en_shahar) — 9-sinf ================= */
SOZ.shahar = {
  bank:{en:'bank', ipa:'/bæŋk/', uz:'bank', rang:'#3f7fc9'},
  post_office:{en:'post office', ipa:'/ˈpəʊst ˌɒf.ɪs/', uz:'pochta', rang:'#d9403a'},
  hospital:{en:'hospital', ipa:'/ˈhɒs.pɪ.təl/', uz:'kasalxona', rang:'#f2efe6'},
  school:{en:'school', ipa:'/skuːl/', uz:'maktab', rang:'#e8a21c'},
  cafe:{en:'café', ipa:'/ˈkæf.eɪ/', uz:'kafe', rang:'#c98a4b'},
  library:{en:'library', ipa:'/ˈlaɪ.brər.i/', uz:'kutubxona', rang:'#8a46d6'},
  cinema:{en:'cinema', ipa:'/ˈsɪn.ə.mə/', uz:'kinoteatr', rang:'#2b3350'},
  supermarket:{en:'supermarket', ipa:'/ˈsuː.pəˌmɑː.kɪt/', uz:'supermarket', rang:'#2faa52'},
  park:{en:'park', ipa:'/pɑːk/', uz:'bog‘, park', rang:'#3f9a4f'},
  bus_stop:{en:'bus stop', ipa:'/ˈbʌs ˌstɒp/', uz:'avtobus bekati', rang:'#ffd24a'},
  police_station:{en:'police station', ipa:'/pəˈliːs ˌsteɪ.ʃən/', uz:'politsiya bo‘limi', rang:'#4a5a8a'},
  pharmacy:{en:'pharmacy', ipa:'/ˈfɑː.mə.si/', uz:'dorixona', rang:'#36d6a0'}
};
SOZ.yonalish = {
  go_straight:{en:'Go straight on.', ipa:'/ɡəʊ streɪt ɒn/', uz:'To‘g‘riga yuring.'},
  turn_left:{en:'Turn left.', ipa:'/tɜːn left/', uz:'Chapga buriling.'},
  turn_right:{en:'Turn right.', ipa:'/tɜːn raɪt/', uz:'O‘ngga buriling.'},
  on_the_left:{en:'It’s on the left.', ipa:'/ɒn ðə left/', uz:'U chap tomonda.'},
  on_the_right:{en:'It’s on the right.', ipa:'/ɒn ðə raɪt/', uz:'U o‘ng tomonda.'},
  excuse_me:{en:'Excuse me, how do I get to the bank?', ipa:'/ɪkˈskjuːz miː, haʊ duː aɪ ɡet tə ðə bæŋk/', uz:'Kechirasiz, bankka qanday boraman?'}
};
R.til_en_shahar = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('English · In the city · asking for directions');
  const A = asos(sahna, {rx:.78, ry:.0, rxMin:.25, rxMax:1.25, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, shar, soya, yozuv, matnTex, bosiladigan, belgila, karta, kut} = A;
  const SH = SOZ.shahar;
  /* ko‘chalar 4×4 chorraha (x: 0..3, z: 0..3), katak kattaligi 2.6 */
  const K = 2.6, N = 4, X0 = -K * 1.5, Z0 = -K * 1.5;
  const px = i=>X0 + i * K, pz = j=>Z0 + j * K;
  const yer = new T.Mesh(new T.PlaneGeometry(K * 4.6, K * 4.6), mat('#223126', {roughness:.95, env:.05})); yer.rotation.x = -Math.PI / 2; yer.position.y = -.01; g.add(yer);
  const yolM = mat('#2a2d3a', {roughness:.9, env:.05}), chiz = new T.MeshBasicMaterial({color:0xd9dde6, toneMapped:false});
  for(let i = 0; i < N; i++){
    const y1 = new T.Mesh(new T.PlaneGeometry(.7, K * 3.6), yolM); y1.rotation.x = -Math.PI / 2; y1.position.set(px(i), 0, 0); g.add(y1);
    const y2 = new T.Mesh(new T.PlaneGeometry(K * 3.6, .7), yolM); y2.rotation.x = -Math.PI / 2; y2.position.set(0, 0, pz(i)); g.add(y2);
    for(let s = -K * 1.7; s < K * 1.7; s += .5){ const c = new T.Mesh(new T.PlaneGeometry(.04, .22), chiz); c.rotation.x = -Math.PI / 2; c.position.set(px(i), .003, s); g.add(c); const c2 = new T.Mesh(new T.PlaneGeometry(.22, .04), chiz); c2.rotation.x = -Math.PI / 2; c2.position.set(s, .003, pz(i)); g.add(c2); }
  }
  /* binolar: katak (i,j) = chorrahalar (i..i+1, j..j+1) orasi; kirish — chorraha [ex, ez] */
  const BIN = [
    {k:'bank', i:0, j:0, ex:1, ez:0, h:1.2, tur:'ustun'}, {k:'post_office', i:1, j:0, ex:2, ez:0, h:.9}, {k:'hospital', i:2, j:0, ex:3, ez:1, h:1.6, tur:'xoch'},
    {k:'school', i:0, j:1, ex:0, ez:2, h:1.0}, {k:'park', i:1, j:1, ex:1, ez:1, h:0, tur:'park'}, {k:'cafe', i:2, j:1, ex:2, ez:2, h:.7, tur:'soyabon'},
    {k:'library', i:0, j:2, ex:1, ez:3, h:1.1}, {k:'cinema', i:1, j:2, ex:2, ez:3, h:1.3, tur:'kino'}, {k:'supermarket', i:2, j:2, ex:3, ez:2, h:.8, tur:'keng'},
    {k:'bus_stop', i:-1, j:1, ex:0, ez:1, h:0, tur:'bekat'}, {k:'police_station', i:3, j:1, ex:3, ez:1, h:1.0, tur:'politsiya'}, {k:'pharmacy', i:1, j:-1, ex:2, ez:0, h:.7, tur:'kichik'}
  ];
  const binoM = {}; const binoG = {};
  const oynaT = matnTex(128, 128, (x, w, h)=>{ x.fillStyle = '#d7dbe8'; x.fillRect(0, 0, w, h); x.fillStyle = '#4a74c9'; for(let r = 0; r < 4; r++) for(let c = 0; c < 4; c++) x.fillRect(10 + c * 30, 10 + r * 30, 18, 20); });
  oynaT.wrapS = oynaT.wrapT = T.RepeatWrapping;
  BIN.forEach(b=>{
    const cx = px(b.i) + K / 2, cz = pz(b.j) + K / 2;
    const q = new T.Group(); q.position.set(cx, 0, cz); g.add(q); binoG[b.k] = q;
    const w = b.tur === 'keng' ? 1.9 : b.tur === 'kichik' || b.tur === 'soyabon' ? 1.2 : 1.6, d = b.tur === 'keng' ? 1.6 : 1.4;
    if(b.tur === 'park'){
      const ot = new T.Mesh(new T.CircleGeometry(1.1, 36), mat('#3f9a4f', {roughness:1, env:.02})); ot.rotation.x = -Math.PI / 2; ot.position.y = .005; q.add(ot);
      for(let i = 0; i < 5; i++){ const a = i * 1.3; const tn = silindr(.05, .07, .5, mat('#5a3a1a'), 8); tn.position.set(Math.cos(a) * .7, .25, Math.sin(a) * .7); q.add(tn); const bar = shar(.3, fiz('#2f8a45', {roughness:.8}), 12); bar.position.set(Math.cos(a) * .7, .62, Math.sin(a) * .7); q.add(bar); }
      const sk = quti(.6, .06, .2, mat('#8a5a35'), .01); sk.position.set(0, .25, 0); q.add(sk);
    } else if(b.tur === 'bekat'){
      const t = quti(1.0, .05, .5, mat('#d9dde6', {metalness:.6, roughness:.4}), .01); t.position.set(0, .95, 0); q.add(t);
      [[-.45, -.2], [.45, -.2]].forEach(([x, z])=>{ const u = silindr(.03, .03, .95, mat('#9aa0ab', {metalness:.9, roughness:.3}), 8); u.position.set(x, .47, z); q.add(u); });
      const sk = quti(.8, .06, .25, mat('#3f7fc9'), .01); sk.position.set(0, .4, 0); q.add(sk);
      const bel = quti(.3, .3, .03, fiz('#ffd24a'), .02); bel.position.set(.6, 1.1, 0); q.add(bel);
    } else {
      const bm = fiz(SH[b.k].rang, {roughness:.5, clearcoat:.2});
      const tana = quti(w, b.h, d, bm, .04); tana.position.y = b.h / 2; q.add(tana);
      const oyna = new T.Mesh(new T.PlaneGeometry(w * .9, b.h * .7), new T.MeshBasicMaterial({map:oynaT, toneMapped:false})); oyna.position.set(0, b.h * .52, d / 2 + .002); q.add(oyna);
      const tom = quti(w + .12, .1, d + .12, mat('#2b3350'), .02); tom.position.y = b.h + .05; q.add(tom);
      const esh = quti(.3, .42, .03, mat('#3a2a1c'), .01); esh.position.set(0, .21, d / 2 + .01); q.add(esh);
      if(b.tur === 'ustun') [-.5, -.17, .17, .5].forEach(x=>{ const u = silindr(.06, .06, b.h, fiz('#f2efe6'), 10); u.position.set(x, b.h / 2, d / 2 + .12); q.add(u); });
      if(b.tur === 'xoch'){ const x1 = quti(.5, .14, .04, new T.MeshBasicMaterial({color:0xd9403a, toneMapped:false}), .01); x1.position.set(0, b.h * .85, d / 2 + .03); q.add(x1); const x2 = quti(.14, .5, .04, new T.MeshBasicMaterial({color:0xd9403a, toneMapped:false}), .01); x2.position.set(0, b.h * .85, d / 2 + .03); q.add(x2); }
      if(b.tur === 'soyabon'){ const s = new T.Mesh(new T.ConeGeometry(.6, .3, 8), fiz('#d9403a')); s.position.set(0, b.h + .25, d / 2 + .2); q.add(s); }
      if(b.tur === 'kino'){ const m = quti(w * .9, .32, .08, new T.MeshBasicMaterial({color:0xffe9a0, toneMapped:false}), .02); m.position.set(0, b.h * .78, d / 2 + .05); q.add(m); }
      if(b.tur === 'politsiya'){ const l = quti(.5, .12, .12, new T.MeshBasicMaterial({color:0x4aa3ff, toneMapped:false}), .03); l.position.set(0, b.h + .16, 0); q.add(l); }
      if(b.tur === 'kichik'){ const x1 = quti(.3, .08, .04, new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false}), .01); x1.position.set(0, b.h + .18, d / 2); q.add(x1); const x2 = quti(.08, .3, .04, new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false}), .01); x2.position.set(0, b.h + .18, d / 2); q.add(x2); }
      soya(w + .6, d + .6, cx, cz, 0, .5);
    }
    bosiladigan(q, b.k, {bino:b.k});
    const y = yozuv(SH[b.k].en, {bal:.3, w:420, h:96, shrift:'700 44px Inter, sans-serif', chuqurlik:false}); y.position.set(cx, (b.h || .6) + .55, cz); g.add(y);
    /* kirish belgisi (yo‘lda) */
    const kir = new T.Mesh(new T.CircleGeometry(.14, 18), new T.MeshBasicMaterial({color:new T.Color(SH[b.k].rang).convertSRGBToLinear(), toneMapped:false, transparent:true, opacity:.8})); kir.rotation.x = -Math.PI / 2; kir.position.set(px(b.ex) + (cx > px(b.ex) ? .25 : cx < px(b.ex) ? -.25 : 0), .006, pz(b.ez) + (cz > pz(b.ez) ? .25 : cz < pz(b.ez) ? -.25 : 0)); g.add(kir);
  });
  /* yo‘lovchi (siz): tana + strelka */
  const odam = new T.Group(); g.add(odam);
  const tn = silindr(.14, .17, .5, fiz('#ff6f5c', {roughness:.5}), 16); tn.position.y = .35; odam.add(tn);
  const bsh = shar(.13, fiz('#e8b894'), 16); bsh.position.y = .72; odam.add(bsh);
  const strelka = new T.Mesh(new T.ConeGeometry(.16, .4, 4), new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false})); strelka.rotation.x = Math.PI / 2; strelka.rotation.y = Math.PI / 4; strelka.position.set(0, .12, .4); odam.add(strelka);
  const halo = new T.Mesh(new T.RingGeometry(.3, .36, 32), new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false, transparent:true, opacity:.8})); halo.rotation.x = -Math.PI / 2; halo.position.y = .01; odam.add(halo);
  bosiladigan(odam, 'you');
  /* yo‘l izi */
  const izG = new T.Group(); g.add(izG);
  const YON = ['north', 'east', 'south', 'west'], YON_V = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let pos = {i:0, j:3}, yon = 0, start = {i:0, j:3, yon:0}, maqsad = null, buyruqlar = [], harakat = null;
  const yetdiYoz = yozuv('', {bal:.5, w:900, h:120, shrift:'700 54px Inter, sans-serif', rang:'#7dffc9', chuqurlik:false}); yetdiYoz.visible = false; yetdiYoz.position.set(0, 2.9, 0); g.add(yetdiYoz);
  function joy(){ odam.position.set(px(pos.i), 0, pz(pos.j)); odam.rotation.y = -yon * Math.PI / 2; }
  function yonida(){ return BIN.filter(b=>b.ex === pos.i && b.ez === pos.j).map(b=>b.k); }
  function xabar(buyruq){
    const y = yonida();
    const yetdi = maqsad && y.includes(maqsad);
    if(y.length){ yetdiYoz.visible = true; yetdiYoz.yoz((yetdi ? 'You are at the ' : 'Here: the ') + y.map(k=>SH[k].en).join(', ') + (yetdi ? '!' : '')); }
    else yetdiYoz.visible = false;
    hodisa('til-yol', {buyruq, x:pos.i, z:pos.j, yon:YON[yon], yonida:y, joy:yetdi ? maqsad : (y[0] || null), yetdi:!!yetdi, maqsad, qadamlar:buyruqlar.length});
    izoh.innerHTML = (buyruq ? '<b>' + {go_straight:'Go straight on.', turn_left:'Turn left.', turn_right:'Turn right.'}[buyruq] + '</b> ' : '') + 'You are facing <b>' + YON[yon] + '</b>' + (y.length ? '. ' + (yetdi ? '<b>You are at the ' + SH[maqsad].en + '!</b>' : 'Next to you: ' + y.map(k=>SH[k].en).join(', ') + '.') : '.') + (maqsad && !yetdi ? ' Target: <b>' + SH[maqsad].en + '</b>.' : '');
  }
  const navbat = [];
  function buyruq(b){
    if(harakat){ if(navbat.length < 12) navbat.push(b); return; }   /* animatsiya paytida bosilgan buyruq yo‘qolmaydi — navbatga */
    buyruqlar.push(b);
    if(b === 'turn_left'){ yon = (yon + 3) % 4; harakat = {t:0, tur:'bur', a0:odam.rotation.y, a1:-yon * Math.PI / 2}; }
    else if(b === 'turn_right'){ yon = (yon + 1) % 4; harakat = {t:0, tur:'bur', a0:odam.rotation.y, a1:-yon * Math.PI / 2}; }
    else {
      const ni = pos.i + YON_V[yon][0], nj = pos.j + YON_V[yon][1];
      if(ni < 0 || ni >= N || nj < 0 || nj >= N){ izoh.innerHTML = '<b>You can’t go that way</b> — the street ends here. Turn left or right.'; hodisa('til-yol', {buyruq:'blocked', x:pos.i, z:pos.j, yon:YON[yon]}); buyruqlar.pop(); return; }
      const iz = new T.Mesh(new T.PlaneGeometry(yon % 2 ? K : .12, yon % 2 ? .12 : K), new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false, transparent:true, opacity:.5})); iz.rotation.x = -Math.PI / 2; iz.position.set((px(pos.i) + px(ni)) / 2, .008, (pz(pos.j) + pz(nj)) / 2); izG.add(iz);
      harakat = {t:0, tur:'yur', p0:odam.position.clone(), p1:new T.Vector3(px(ni), 0, pz(nj))}; pos = {i:ni, j:nj};
    }
    harakat.b = b;
  }
  function qayta(){ pos = {i:start.i, j:start.j}; yon = start.yon; buyruqlar = []; harakat = null; navbat.length = 0; izG.children.slice().forEach(c=>{ izG.remove(c); c.geometry.dispose(); }); joy(); xabar(null); }
  function binoKorsat(k, bosildi){
    const b = SH[k]; belgila([k]);
    const savol = 'Excuse me, where is the ' + b.en + '?';
    karta({ust:'Place in the city — shahardagi joy', en:b.en, ipa:b.ipa, uz:b.uz, misol:'<i>' + esc(savol) + '</i>', misolOqi:savol, oqi:b.en});
    detal('til_shahar', k); hodisa('til-soz', {nom:k, en:b.en, uz:b.uz, sahna:'shahar', bosildi:!!bosildi});
  }
  S.bosish = ud=>{ if(ud.bino) binoKorsat(ud.bino, true); else if(ud.nom === 'you'){ izoh.innerHTML = '<b>You are here.</b> Use the buttons: <i>Go straight on</i>, <i>Turn left</i>, <i>Turn right</i>.'; hodisa('til-you', {x:pos.i, z:pos.j}); } };
  S.holat = h=>{
    if(!h) return;
    if(h.start){ start = {i:+h.start[0], j:+h.start[1], yon:YON.indexOf(h.start[2]) >= 0 ? YON.indexOf(h.start[2]) : 0}; qayta(); }
    if(h.maqsad !== undefined){ maqsad = h.maqsad && SH[h.maqsad] ? h.maqsad : null; belgila(maqsad ? [maqsad] : []); xabar(null); }
    if(h.bino && SH[h.bino]){ binoKorsat(h.bino); S.fokus(2.6, binoG[h.bino].position.clone().setY(.5), true); }
    if(h.buyruq){ [].concat(h.buyruq).forEach((b, i)=>kut(()=>buyruq(b), i * 650)); }
    if(h.qayta) qayta();
  };
  tugmalar(tag, [
    {m:'Go straight on', f:()=>buyruq('go_straight')}, {m:'Turn left', f:()=>buyruq('turn_left')}, {m:'Turn right', f:()=>buyruq('turn_right')}, '|',
    {m:'Start again', f:()=>qayta()}
  ]);
  S.kadrda = (dt, t)=>{
    halo.scale.setScalar(1 + Math.sin(t * 3) * .08);
    if(harakat){
      harakat.t = Math.min(1, harakat.t + dt * (harakat.tur === 'bur' ? 3.2 : 1.8));
      const e = harakat.t < .5 ? 2 * harakat.t * harakat.t : 1 - Math.pow(-2 * harakat.t + 2, 2) / 2;
      if(harakat.tur === 'bur'){ let d = harakat.a1 - harakat.a0; while(d > Math.PI) d -= Math.PI * 2; while(d < -Math.PI) d += Math.PI * 2; odam.rotation.y = harakat.a0 + d * e; }
      else { odam.position.lerpVectors(harakat.p0, harakat.p1, e); odam.position.y = Math.abs(Math.sin(harakat.t * 12)) * .05; }
      if(harakat.t >= 1){ const b = harakat.b; harakat = null; joy(); xabar(b); if(navbat.length) buyruq(navbat.shift()); }
    }
  };
  joy(); xabar(null);
  S.joyla(5.3, new T.Vector3(0, .3, 0));
  izoh.innerHTML = 'Binoni <b>bosing</b> — so‘z va savol. Tugmalar bilan yuring: <i>Go straight on · Turn left · Turn right</i>. Siz pastki chap burchakda, shimolga qaragansiz.';
  return S;
};


/* ================= 8. SO‘Z TURKUMLARI (til_ot_turkum) — 5-sinf, 2D ================= */
const TURKUM = {
  ot:{nom:'Ot', savol:'kim? nima? qayer?', rang:'#5cc8ff', izoh:'Shaxs, narsa, joy, hodisa nomini bildiradi.'},
  sifat:{nom:'Sifat', savol:'qanday? qanaqa?', rang:'#ffb347', izoh:'Narsaning belgisini (rang, hajm, xususiyat) bildiradi.'},
  son:{nom:'Son', savol:'nechta? qancha? nechanchi?', rang:'#a996ff', izoh:'Narsaning sanog‘i yoki tartibini bildiradi.'},
  olmosh:{nom:'Olmosh', savol:'ot, sifat, son o‘rnida', rang:'#ff8fab', izoh:'Narsani nomlamay, unga ishora qiladi: men, u, bu, kim.'},
  fel:{nom:'Fe’l', savol:'nima qildi? nima qilyapti?', rang:'#36d6a0', izoh:'Harakat yoki holatni bildiradi.'},
  ravish:{nom:'Ravish', savol:'qanday? qachon? qayerda?', rang:'#ffd24a', izoh:'Harakatning belgisini (holat, payt, o‘rin, daraja) bildiradi.'},
  boglovchi:{nom:'Bog‘lovchi', savol:'yordamchi so‘z', rang:'#9aa3c7', izoh:'So‘z va gaplarni bog‘laydi: va, ammo, lekin, yoki.'},
  komakchi:{nom:'Ko‘makchi', savol:'yordamchi so‘z', rang:'#c9b48f', izoh:'Ot bilan kelib, uni boshqa so‘zga bog‘laydi: bilan, uchun, kabi.'},
  undov:{nom:'Undov', savol:'his-tuyg‘u', rang:'#ff6f5c', izoh:'His-hayajon yoki undashni bildiradi: eh, oh, uraa.'}
};
const TURKUM_GAP = [
  {m:'Kichkina Ali bugun maktabda beshta kitobni o‘qidi.', s:[['Kichkina', 'sifat'], ['Ali', 'ot'], ['bugun', 'ravish'], ['maktabda', 'ot'], ['beshta', 'son'], ['kitobni', 'ot'], ['o‘qidi', 'fel']]},
  {m:'U kecha yangi do‘sti bilan tez yugurdi.', s:[['U', 'olmosh'], ['kecha', 'ravish'], ['yangi', 'sifat'], ['do‘sti', 'ot'], ['bilan', 'komakchi'], ['tez', 'ravish'], ['yugurdi', 'fel']]},
  {m:'Ikki bola va bir qiz bog‘da sekin yurishdi, ammo charchashmadi.', s:[['Ikki', 'son'], ['bola', 'ot'], ['va', 'boglovchi'], ['bir', 'son'], ['qiz', 'ot'], ['bog‘da', 'ot'], ['sekin', 'ravish'], ['yurishdi', 'fel'], ['ammo', 'boglovchi'], ['charchashmadi', 'fel']]},
  {m:'Eh, biz bu go‘zal shaharni juda sevamiz!', s:[['Eh', 'undov'], ['biz', 'olmosh'], ['bu', 'olmosh'], ['go‘zal', 'sifat'], ['shaharni', 'ot'], ['juda', 'ravish'], ['sevamiz', 'fel']]}
];
SOZ.turkum = TURKUM; SOZ.turkumGap = TURKUM_GAP;
R.til_ot_turkum = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili · so‘z turkumlari · so‘zni bosing');
  const Z = sahna2d(sahna, {cls:'til-turkum'}), {ichi, api, karta} = Z;
  let gapI = 0, ochiq = new Set(), hammasi = false;
  const bosh = el('div', 'til-sar', '<span class="til-ust">So‘z turkumlari</span><h3>Gapdagi so‘zni bosing — qaysi turkumga kirishi ochiladi</h3>');
  const gapQ = el('div', 'til-gap'); const legenda = el('div', 'til-legenda');
  Object.keys(TURKUM).forEach(k=>{ const t = TURKUM[k]; const b = el('button', 'til-chip', '<i style="background:' + t.rang + '"></i>' + t.nom + ' <small>' + t.savol + '</small>'); b.dataset.t = k; b.onclick = ()=>api.holat({turkum:k}); legenda.append(b); });
  ichi.append(bosh, gapQ, legenda);
  function chiz(){
    const gp = TURKUM_GAP[gapI]; gapQ.innerHTML = '';
    gp.s.forEach(([soz, t], i)=>{
      const b = el('button', 'til-soz' + (ochiq.has(i) || hammasi ? ' ochiq' : ''), '<span>' + esc(soz) + '</span><small>' + (ochiq.has(i) || hammasi ? TURKUM[t].nom : '?') + '</small>');
      if(ochiq.has(i) || hammasi){ b.style.setProperty('--r', TURKUM[t].rang); }
      b.onclick = ()=>{ ochiq.add(i); chiz(); const T2 = TURKUM[t]; karta({ust:'So‘z turkumi', nom:esc(soz) + ' — <span style="color:' + T2.rang + '">' + T2.nom + '</span>', matn:'<b>Savoli:</b> ' + T2.savol + '. ' + T2.izoh, qosh:'Gap: <i>' + esc(gp.m) + '</i>'}); izoh.innerHTML = '<b>' + esc(soz) + '</b> — ' + T2.nom.toLowerCase() + ' (' + T2.savol + '). ' + T2.izoh; detal('til_turkum', t); hodisa('til-soz', {soz, turkum:t, gap:gapI, bosildi:true}); };
      gapQ.append(b);
      if(i < gp.s.length - 1) gapQ.append(document.createTextNode(' '));
    });
    const tin = gp.m.slice(-1); const tinQ = el('span', 'til-tinish', tin); gapQ.append(tinQ);
    legenda.querySelectorAll('.til-chip').forEach(c=>c.classList.remove('faol'));
  }
  api.holat = h=>{
    if(!h) return;
    if(h.gap !== undefined && TURKUM_GAP[h.gap]){ gapI = +h.gap; ochiq = new Set(); hammasi = false; faolQil(tag, '[data-g]', tb['g' + gapI]); chiz(); }
    if(h.hamma !== undefined){ hammasi = !!h.hamma; chiz(); }
    if(h.turkum && TURKUM[h.turkum]){
      const gp = TURKUM_GAP[gapI]; const t = TURKUM[h.turkum];
      gp.s.forEach(([s, tk], i)=>{ if(tk === h.turkum) ochiq.add(i); }); chiz();
      legenda.querySelectorAll('.til-chip').forEach(c=>c.classList.toggle('faol', c.dataset.t === h.turkum));
      gapQ.querySelectorAll('.til-soz').forEach((b, i)=>b.classList.toggle('faol', gp.s[i][1] === h.turkum));
      const sozlar = gp.s.filter(x=>x[1] === h.turkum).map(x=>'<i>' + esc(x[0]) + '</i>');
      izoh.innerHTML = '<b style="color:' + t.rang + '">' + t.nom + '</b> (' + t.savol + '): ' + (sozlar.length ? sozlar.join(', ') : 'bu gapda yo‘q') + '. ' + t.izoh;
      hodisa('til-turkum', {turkum:h.turkum, gap:gapI, soni:sozlar.length});
    }
  };
  api.boshla = ()=>{ ochiq = new Set(); hammasi = false; chiz(); };
  const tb = tugmalar(tag, [
    ...TURKUM_GAP.map((gp, i)=>({m:(i + 1) + '-gap', k:'g' + i, cls:i === 0 ? 'faol' : '', f:()=>api.holat({gap:i})})), '|',
    {m:'Hammasini ko‘rsat', f:b=>{ hammasi = !hammasi; b.classList.toggle('faol', hammasi); chiz(); }},
    {m:'Tozalash', f:()=>{ ochiq = new Set(); hammasi = false; chiz(); }}
  ]);
  TURKUM_GAP.forEach((gp, i)=>{ tb['g' + i].dataset.g = i; });
  chiz();
  izoh.innerHTML = 'So‘zni <b>bosing</b> — turkumi rang bilan ochiladi. Pastdagi rangli yorliqlar bilan butun gapdagi bir turkumni belgilang.';
  return api;
};

/* ================= 9. GAP BO‘LAKLARI (til_ot_gap) — 6-sinf, 2D ================= */
const BOLAK = {
  ega:{nom:'Ega', bosh:true, savol:'kim? nima?', rang:'#5cc8ff', chiziq:'bir', izoh:'Gapda ish-harakatning bajaruvchisini bildiradi; bosh kelishikda bo‘ladi.'},
  kesim:{nom:'Kesim', bosh:true, savol:'nima qildi? nima qilyapti? qanday?', rang:'#36d6a0', chiziq:'ikki', izoh:'Eganing harakati yoki holatini bildiradi; shaxs-sonda ega bilan mos keladi.'},
  aniqlovchi:{nom:'Aniqlovchi', bosh:false, savol:'qanday? qaysi? nechta? kimning?', rang:'#ffb347', chiziq:'tolqin', izoh:'Otni (narsani) belgisi, miqdori yoki egasiga ko‘ra aniqlaydi.'},
  toldiruvchi:{nom:'To‘ldiruvchi', bosh:false, savol:'kimni? nimani? kimga? nimadan?', rang:'#a996ff', chiziq:'uzuq', izoh:'Harakat qaratilgan narsa yoki shaxsni bildiradi; tushum, jo‘nalish, chiqish kelishiklarida.'},
  hol:{nom:'Hol', bosh:false, savol:'qachon? qayerda? qanday? nega?', rang:'#ffd24a', chiziq:'nuqta', izoh:'Harakatning payti, o‘rni, tarzi yoki sababini bildiradi.'}
};
const BOLAK_GAP = [
  {m:'Bolalar maktabga bordi.', s:[['Bolalar', 'ega'], ['maktabga', 'hol'], ['bordi', 'kesim']]},
  {m:'Shirin olmalarni men kecha bozordan sotib oldim.', s:[['Shirin', 'aniqlovchi'], ['olmalarni', 'toldiruvchi'], ['men', 'ega'], ['kecha', 'hol'], ['bozordan', 'hol'], ['sotib oldim', 'kesim']]},
  {m:'Ustozimiz bizga qiziqarli kitoblarni ko‘rsatdi.', s:[['Ustozimiz', 'ega'], ['bizga', 'toldiruvchi'], ['qiziqarli', 'aniqlovchi'], ['kitoblarni', 'toldiruvchi'], ['ko‘rsatdi', 'kesim']]},
  {m:'Ertalab quyosh tog‘lar ortidan sekin ko‘tarildi.', s:[['Ertalab', 'hol'], ['quyosh', 'ega'], ['tog‘lar ortidan', 'hol'], ['sekin', 'hol'], ['ko‘tarildi', 'kesim']]}
];
SOZ.bolak = BOLAK; SOZ.bolakGap = BOLAK_GAP;
R.til_ot_gap = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili · gap bo‘laklari · tagiga chizish va daraxt');
  const Z = sahna2d(sahna, {cls:'til-gapb'}), {ichi, api, karta} = Z;
  let gapI = 0, ochiq = new Set(), hammasi = false, tanl = null;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Gap bo‘laklari</span><h3>So‘zni bosing — qaysi bo‘lak ekani tagiga chiziladi va daraxtda yonadi</h3>'));
  const gapQ = el('div', 'til-gap til-gap-b'); const svgQ = el('div', 'til-daraxt'); const legenda = el('div', 'til-legenda');
  Object.keys(BOLAK).forEach(k=>{ const t = BOLAK[k]; const b = el('button', 'til-chip', '<i style="background:' + t.rang + '"></i>' + t.nom + ' <small>' + t.savol + '</small>'); b.dataset.t = k; b.onclick = ()=>api.holat({bolak:k}); legenda.append(b); });
  ichi.append(gapQ, svgQ, legenda);
  const chiziqHTML = (t, rang)=>{ const c = BOLAK[t].chiziq; if(c === 'bir') return '<i class="c1" style="background:' + rang + '"></i>'; if(c === 'ikki') return '<i class="c1" style="background:' + rang + '"></i><i class="c2" style="background:' + rang + '"></i>'; if(c === 'tolqin') return '<svg class="cw" viewBox="0 0 40 6" preserveAspectRatio="none"><path d="M0 3 Q5 0 10 3 T20 3 T30 3 T40 3" fill="none" stroke="' + rang + '" stroke-width="2"/></svg>'; if(c === 'uzuq') return '<i class="c1 cu" style="border-color:' + rang + '"></i>'; return '<i class="c1 cn" style="border-color:' + rang + '"></i>'; };
  function daraxt(){
    const gp = BOLAK_GAP[gapI]; const W = 760, H = 300;
    const tugun = (x, y, w, matn, rang, k, kichik)=>'<g class="tg' + (tanl === k ? ' faol' : '') + '" data-k="' + k + '"><rect x="' + (x - w / 2) + '" y="' + (y - 18) + '" width="' + w + '" height="36" rx="10" fill="rgba(12,16,34,.9)" stroke="' + rang + '" stroke-width="' + (tanl === k ? 3 : 1.6) + '"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" fill="#eef1fb" font-size="' + (kichik ? 12 : 14) + '" font-weight="700" font-family="Inter,sans-serif">' + esc(matn) + '</text></g>';
    const yol = (x1, y1, x2, y2, rang)=>'<path d="M' + x1 + ' ' + y1 + ' C ' + x1 + ' ' + ((y1 + y2) / 2) + ', ' + x2 + ' ' + ((y1 + y2) / 2) + ', ' + x2 + ' ' + y2 + '" fill="none" stroke="' + (rang || '#4a5278') + '" stroke-width="1.6"/>';
    let s = '';
    s += yol(380, 40, 200, 110) + yol(380, 40, 560, 110);
    s += tugun(380, 40, 110, gp.m.replace(/\.$/, ''), '#d78cff', 'gap');
    s += tugun(200, 110, 150, 'Bosh bo‘laklar', '#8c93a3', 'bosh', true) + tugun(560, 110, 200, 'Ikkinchi darajali bo‘laklar', '#8c93a3', 'ikkinchi', true);
    const ust = {ega:120, kesim:280, aniqlovchi:440, toldiruvchi:580, hol:720};
    Object.keys(BOLAK).forEach(k=>{ const b = BOLAK[k]; s += yol(b.bosh ? 200 : 560, 128, ust[k], 172, b.rang) + tugun(ust[k], 190, 120, b.nom, b.rang, k); });
    const sanoq = {};
    gp.s.forEach(([soz, k], i)=>{ sanoq[k] = (sanoq[k] || 0); const kor = ochiq.has(i) || hammasi; const x = ust[k], y = 250 + sanoq[k] * 36; sanoq[k]++; s += yol(x, 208, x, y - 18, kor ? BOLAK[k].rang : '#2b3350') + tugun(x, y, 118, kor ? soz : '?', kor ? BOLAK[k].rang : '#2b3350', 'soz' + i, true); });
    const hMax = 250 + Math.max(...Object.values(sanoq).concat([1])) * 36 + 20;
    svgQ.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + hMax + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto">' + s + '</svg>';
    svgQ.querySelectorAll('.tg[data-k]').forEach(gq=>{ gq.style.cursor = 'pointer'; gq.onclick = ()=>{ const k = gq.dataset.k; if(BOLAK[k]) api.holat({bolak:k}); else if(/^soz/.test(k)) bos(+k.slice(3)); }; });
  }
  function bos(i){
    const gp = BOLAK_GAP[gapI]; const [soz, k] = gp.s[i]; ochiq.add(i); tanl = k; chiz();
    const b = BOLAK[k];
    karta({ust:(b.bosh ? 'Bosh bo‘lak' : 'Ikkinchi darajali bo‘lak'), nom:esc(soz) + ' — <span style="color:' + b.rang + '">' + b.nom + '</span>', matn:'<b>Savoli:</b> ' + b.savol + '. ' + b.izoh, qosh:'Tagiga chizish: ' + {bir:'bir chiziq', ikki:'ikki chiziq', tolqin:'to‘lqinli chiziq', uzuq:'uzuq chiziq', nuqta:'nuqta-chiziq'}[b.chiziq]});
    izoh.innerHTML = '<b>' + esc(soz) + '</b> — ' + b.nom.toLowerCase() + ' (' + b.savol + '). ' + b.izoh;
    detal('til_bolak', k); hodisa('til-bolak', {soz, bolak:k, gap:gapI, bosildi:true});
  }
  function chiz(){
    const gp = BOLAK_GAP[gapI]; gapQ.innerHTML = '';
    gp.s.forEach(([soz, k], i)=>{
      const kor = ochiq.has(i) || hammasi;
      const b = el('button', 'til-soz' + (kor ? ' ochiq' : '') + (tanl === k && kor ? ' faol' : ''), '<span>' + esc(soz) + '</span>' + (kor ? '<b class="til-chz">' + chiziqHTML(k, BOLAK[k].rang) + '</b><small>' + BOLAK[k].nom + '</small>' : '<small>?</small>'));
      if(kor) b.style.setProperty('--r', BOLAK[k].rang);
      b.onclick = ()=>bos(i); gapQ.append(b); if(i < gp.s.length - 1) gapQ.append(document.createTextNode(' '));
    });
    gapQ.append(el('span', 'til-tinish', gp.m.slice(-1)));
    legenda.querySelectorAll('.til-chip').forEach(c=>c.classList.toggle('faol', c.dataset.t === tanl));
    daraxt();
  }
  api.holat = h=>{
    if(!h) return;
    if(h.gap !== undefined && BOLAK_GAP[h.gap]){ gapI = +h.gap; ochiq = new Set(); hammasi = false; tanl = null; faolQil(tag, '[data-g]', tb['g' + gapI]); chiz(); }
    if(h.hamma !== undefined){ hammasi = !!h.hamma; chiz(); }
    if(h.bolak && BOLAK[h.bolak]){ const gp = BOLAK_GAP[gapI]; gp.s.forEach(([s, k], i)=>{ if(k === h.bolak) ochiq.add(i); }); tanl = h.bolak; chiz(); const b = BOLAK[h.bolak]; const sozlar = gp.s.filter(x=>x[1] === h.bolak).map(x=>'<i>' + esc(x[0]) + '</i>'); izoh.innerHTML = '<b style="color:' + b.rang + '">' + b.nom + '</b> (' + b.savol + '): ' + (sozlar.length ? sozlar.join(', ') : 'bu gapda yo‘q') + '. ' + b.izoh; hodisa('til-bolak-tur', {bolak:h.bolak, gap:gapI, soni:sozlar.length}); }
  };
  api.boshla = ()=>{ ochiq = new Set(); hammasi = false; tanl = null; chiz(); };
  const tb = tugmalar(tag, [
    ...BOLAK_GAP.map((gp, i)=>({m:(i + 1) + '-gap', k:'g' + i, cls:i === 0 ? 'faol' : '', f:()=>api.holat({gap:i})})), '|',
    {m:'Hammasini ko‘rsat', f:b=>{ hammasi = !hammasi; b.classList.toggle('faol', hammasi); chiz(); }},
    {m:'Tozalash', f:()=>{ ochiq = new Set(); hammasi = false; tanl = null; chiz(); }}
  ]);
  BOLAK_GAP.forEach((gp, i)=>{ tb['g' + i].dataset.g = i; });
  chiz();
  izoh.innerHTML = 'So‘zni <b>bosing</b> — bo‘lagi tagiga chiziladi (ega — bir, kesim — ikki chiziq) va daraxtda yonadi.';
  return api;
};

/* ================= 11. QO‘SHMA GAPLAR (til_ot_qoshma) — 8-sinf, 2D ================= */
const QOSHMA = {
  va:{b:'va', tur:'boglangan', mano:'biriktiruv', gap:'Havo ochildi va bolalar ko‘chaga chiqdi.', q1:'Havo ochildi', q2:'bolalar ko‘chaga chiqdi', izoh:'Teng huquqli ikki sodda gap biriktiruv bog‘lovchisi bilan bog‘langan.'},
  lekin:{b:'lekin', tur:'boglangan', mano:'zidlov', gap:'Havo sovuq edi, lekin bolalar ko‘chaga chiqdi.', q1:'Havo sovuq edi', q2:'bolalar ko‘chaga chiqdi', izoh:'Ikkinchi gap birinchisiga zid: zidlov bog‘lovchisi (lekin, ammo, biroq). Vergul qo‘yiladi.'},
  yoki:{b:'yoki', tur:'boglangan', mano:'ayiruv', gap:'Bolalar ko‘chaga chiqadi yoki uyda o‘tiradi.', q1:'Bolalar ko‘chaga chiqadi', q2:'uyda o‘tiradi', izoh:'Ikki holatdan biri: ayiruv bog‘lovchisi (yoki, yo, goh … goh).'},
  chunki:{b:'chunki', tur:'ergash', mano:'sabab', gap:'Bolalar ko‘chaga chiqmadi, chunki havo sovuq edi.', q1:'Bolalar ko‘chaga chiqmadi', q2:'havo sovuq edi', izoh:'Ergash gap bosh gapdagi voqeaning sababini bildiradi: sabab ergash gap.'},
  shuning_uchun:{b:'shuning uchun', tur:'ergash', mano:'natija', gap:'Havo sovuq edi, shuning uchun bolalar ko‘chaga chiqmadi.', q1:'Havo sovuq edi', q2:'bolalar ko‘chaga chiqmadi', izoh:'Ikkinchi gap birinchisining natijasi: natija ergash gap.'},
  agar:{b:'agar … -sa', tur:'ergash', mano:'shart', gap:'Agar havo ochilsa, bolalar ko‘chaga chiqadi.', q1:'Agar havo ochilsa', q2:'bolalar ko‘chaga chiqadi', izoh:'Ergash gap bosh gapdagi harakatning shartini bildiradi: shart ergash gap (-sa shakli).'},
  gach:{b:'-gach', tur:'ergash', mano:'payt', gap:'Havo ochilgach, bolalar ko‘chaga chiqdi.', q1:'Havo ochilgach', q2:'bolalar ko‘chaga chiqdi', izoh:'Ergash gap bosh gapdagi harakat paytini bildiradi: payt ergash gap (-gach, -ganda).'},
  sa_ham:{b:'-sa ham', tur:'ergash', mano:'to‘siqsiz', gap:'Havo sovuq bo‘lsa ham, bolalar ko‘chaga chiqdi.', q1:'Havo sovuq bo‘lsa ham', q2:'bolalar ko‘chaga chiqdi', izoh:'Ergash gapdagi to‘siqqa qaramay bosh gapdagi harakat bajariladi: to‘siqsiz ergash gap.'},
  vergul:{b:', (bog‘lovchisiz)', tur:'boglovchisiz', mano:'ohang', gap:'Havo ochildi, bolalar ko‘chaga chiqdi.', q1:'Havo ochildi', q2:'bolalar ko‘chaga chiqdi', izoh:'Qismlar faqat ohang (intonatsiya) va vergul bilan bog‘langan: bog‘lovchisiz qo‘shma gap.'}
};
const QOSHMA_TUR = {boglangan:{nom:'Bog‘langan qo‘shma gap', rang:'#5cc8ff'}, ergash:{nom:'Ergash gapli qo‘shma gap', rang:'#ffb347'}, boglovchisiz:{nom:'Bog‘lovchisiz qo‘shma gap', rang:'#a996ff'}};
SOZ.qoshma = QOSHMA; SOZ.qoshmaTur = QOSHMA_TUR;
R.til_ot_qoshma = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili · qo‘shma gaplar · bog‘lovchini tanlang');
  const Z = sahna2d(sahna, {cls:'til-qoshma'}), {ichi, api, karta} = Z;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Qo‘shma gap yig‘ish</span><h3>Ikki sodda gap — bog‘lovchini tanlang, qo‘shma gap turi aniqlanadi</h3>'));
  const yig = el('div', 'til-yig'); const turQ = el('div', 'til-tur'); const chips = el('div', 'til-legenda til-bog');
  ichi.append(yig, turQ, chips);
  Object.keys(QOSHMA).forEach(k=>{ const q = QOSHMA[k]; const b = el('button', 'til-chip', '<i style="background:' + QOSHMA_TUR[q.tur].rang + '"></i>' + esc(q.b)); b.dataset.k = k; b.onclick = ()=>korsat(k, true); chips.append(b); });
  let joriy = null;
  function korsat(k, bosildi){
    const q = QOSHMA[k]; if(!q) return; joriy = k; const t = QOSHMA_TUR[q.tur];
    const birinchiBosh = ['chunki', 'shuning_uchun'].includes(k);
    const q1cls = q.tur === 'ergash' ? (birinchiBosh ? 'bosh' : 'ergash') : 'teng';
    const q2cls = q.tur === 'ergash' ? (birinchiBosh ? 'ergash' : 'bosh') : 'teng';
    const vergul = ['lekin', 'chunki', 'shuning_uchun', 'agar', 'gach', 'sa_ham', 'vergul'].includes(k);
    const sar = c=>c === 'teng' ? 'Sodda gap' : c === 'bosh' ? 'Bosh gap' : 'Ergash gap';
    yig.innerHTML = '<div class="til-blok ' + q1cls + '"><span class="til-ust">' + sar(q1cls) + '</span>' + esc(q.q1) + (vergul ? ',' : '') + '</div>' +
      '<div class="til-blok bog" style="--r:' + t.rang + '"><span class="til-ust">' + (q.tur === 'boglovchisiz' ? 'faqat vergul' : q.tur === 'ergash' && /^-|^agar/.test(q.b) ? 'bog‘lovchi vosita' : 'bog‘lovchi') + '</span>' + esc(q.b) + '</div>' +
      '<div class="til-blok ' + q2cls + '"><span class="til-ust">' + sar(q2cls) + '</span>' + esc(q.q2) + '.</div>';
    turQ.innerHTML = '<div class="til-natija" style="--r:' + t.rang + '"><span class="til-ust">Hosil bo‘ldi</span><div class="til-gapn">' + esc(q.gap) + '</div><b>' + t.nom + '</b>' + (q.tur === 'ergash' ? ' · <b>' + q.mano + ' ergash gap</b>' : q.tur === 'boglangan' ? ' · ' + q.mano + ' bog‘lovchisi' : '') + '<p>' + q.izoh + '</p></div>';
    chips.querySelectorAll('.til-chip').forEach(c=>c.classList.toggle('faol', c.dataset.k === k));
    izoh.innerHTML = '<b>' + esc(q.gap) + '</b> — ' + t.nom.toLowerCase() + (q.tur === 'ergash' ? ' (' + q.mano + ' ergash gap)' : '') + '. ' + q.izoh;
    if(bosildi) karta({ust:t.nom, nom:esc(q.b), matn:q.izoh, qosh:'<i>' + esc(q.gap) + '</i>'});
    detal('til_qoshma', k); hodisa('til-qoshma', {boglovchi:k, gtur:q.tur, mano:q.mano, gap:q.gap, bosildi:!!bosildi});
  }
  api.holat = h=>{ if(h && h.boglovchi && QOSHMA[h.boglovchi]) korsat(h.boglovchi); if(h && h.tur && QOSHMA_TUR[h.tur]){ const k = Object.keys(QOSHMA).find(x=>QOSHMA[x].tur === h.tur); if(k && (!joriy || QOSHMA[joriy].tur !== h.tur)) korsat(k); } };
  api.boshla = ()=>korsat('va');
  tugmalar(tag, Object.keys(QOSHMA_TUR).map(t=>({m:QOSHMA_TUR[t].nom.replace(' qo‘shma gap', ''), f:()=>api.holat({tur:t})})));
  korsat('va');
  return api;
};

/* ================= 14. NUTQ USLUBLARI (til_ot_uslub) — 11-sinf, 2D ================= */
/* Matn namunalari — MAKON uchun yozilgan o‘quv namunalari (asl manbadan ko‘chirilmagan). */
const USLUB = {
  badiiy:{nom:'Badiiy uslub', rang:'#ff8fab', joy:'she’r, hikoya, roman, drama', belgi:['obrazlilik, tasviriy vositalar (o‘xshatish, sifatlash)', 'his-tuyg‘u, ohang', 'muallifning «men»i, erkin so‘z tanlovi'],
    matn:'Tong otdi. Oltin nurlar tog‘ cho‘qqilarini ohista silab, vodiyga sekin oqib tushdi. Daryo esa, go‘yo uyqusidan uyg‘ongan boladek, shodon shovullab yugurib ketdi.', tasvir:['oltin nurlar', 'ohista silab', 'go‘yo uyqusidan uyg‘ongan boladek', 'shodon shovullab']},
  ilmiy:{nom:'Ilmiy uslub', rang:'#5cc8ff', joy:'darslik, maqola, dissertatsiya', belgi:['atamalar (terminlar), aniqlik', 'mantiqiy izchillik, ta’rif va isbot', 'his-tuyg‘u yo‘q, raqam va dalil'],
    matn:'Fotosintez — yashil o‘simliklarda yorug‘lik energiyasi ishtirokida karbonat angidrid va suvdan organik moddalar hosil bo‘lish jarayoni. Bu jarayon xloroplastlarda kechadi va natijada kislorod ajralib chiqadi.', tasvir:['Fotosintez', 'karbonat angidrid', 'organik moddalar', 'xloroplastlarda', 'kislorod']},
  rasmiy:{nom:'Rasmiy uslub', rang:'#a996ff', joy:'ariza, buyruq, shartnoma, qonun', belgi:['qolip (shablon) so‘z va iboralar', 'bir ma’nolilik, hujjat tuzilmasi', 'shaxsiy munosabat yo‘q'],
    matn:'Maktab direktori A. Karimovga 9-«B» sinf o‘quvchisi D. Rahimovdan ARIZA. Sizdan 2026-yil 20-oktabr kuni oilaviy sabablarga ko‘ra darsdan ozod qilishingizni so‘rayman. Sana. Imzo.', tasvir:['ARIZA', 'Sizdan', 'so‘rayman', 'Sana. Imzo.']},
  publitsistik:{nom:'Publitsistik uslub', rang:'#ffb347', joy:'gazeta maqolasi, nutq, reportaj', belgi:['ijtimoiy mavzu, dolzarblik', 'o‘quvchiga ta’sir: murojaat, ritorik savol', 'ilmiy va badiiy vositalar aralash'],
    matn:'Aziz yurtdoshlar! Har yili bahorda ko‘chalarimiz yashil libos kiyadi. Ammo kim o‘ylabdi: ekilgan har ming ko‘chatdan nechtasi yozgacha omon qoladi? Bugun daraxt ekish — ertaga toza havo demakdir.', tasvir:['Aziz yurtdoshlar!', 'kim o‘ylabdi', 'nechtasi yozgacha omon qoladi?']},
  sozlashuv:{nom:'So‘zlashuv uslubi', rang:'#36d6a0', joy:'kundalik suhbat, xat, xabar', belgi:['oddiy, qisqa gaplar; to‘liqsiz gaplar', 'sheva so‘zlari, undovlar, takror', 'imo-ishora, ohang yordam beradi'],
    matn:'— Ha, qalaysan? Kecha qayoqda eding? — Ey, so‘rama, ishlar ko‘payib ketdi. Bugun kelasanmi? — Mayli, soat beshlarda kiraman. Choyni damlab qo‘y!', tasvir:['Ha, qalaysan?', 'Ey, so‘rama', 'Mayli', 'Choyni damlab qo‘y!']}
};
const USLUB_SINOV = [
  {m:'Suv — vodorod va kisloroddan tashkil topgan, rangsiz, hidsiz suyuqlik. Uning qaynash harorati normal atmosfera bosimida 100 °C ga teng.', t:'ilmiy'},
  {m:'— Alo, Dilnoza? Ertaga kutubxonaga borasanmi? — Bilmadim, qarab ko‘raman. Senda kitob bormi o‘zi? — Bor, bor, olib kelaman.', t:'sozlashuv'},
  {m:'Qish keldi. Oppoq qor momiqdek yumshoq yerga yotib, butun shaharni pok oq ro‘molga o‘rab qo‘ydi.', t:'badiiy'},
  {m:'Hurmatli ota-onalar! Farzandingiz bugun nechta kitob o‘qiganini so‘rab ko‘ring. Kitob o‘qigan bola — ertangi kunimizning yorug‘ umididir.', t:'publitsistik'},
  {m:'2026-yil 15-oktabrdagi 12-sonli buyruqqa asosan 10-sinf o‘quvchilari uchun o‘quv ekskursiyasi 22-oktabr kuni soat 9:00 da o‘tkazilsin. Mas’ul: sinf rahbari.', t:'rasmiy'},
  {m:'Zilzila — Yer po‘stidagi to‘satdan siljish natijasida yuzaga keladigan tebranish. Uning kuchi Rixter shkalasi bo‘yicha magnituda bilan o‘lchanadi.', t:'ilmiy'}
];
SOZ.uslub = USLUB; SOZ.uslubSinov = USLUB_SINOV;
R.til_ot_uslub = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili · nutq uslublari · matn namunalari o‘quv maqsadida yozilgan');
  const Z = sahna2d(sahna, {cls:'til-uslub'}), {ichi, api, karta} = Z;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Nutq uslublari</span><h3>Uslub kartasini bosing — belgilari matnda yonadi</h3>'));
  const kartalar = el('div', 'til-uslublar'); const sinov = el('div', 'til-sinov'); sinov.style.display = 'none';
  ichi.append(sinov, kartalar);
  let joriy = null;
  function belgilaMatn(matn, ro, rang){ let m = esc(matn); ro.forEach(t=>{ m = m.split(esc(t)).join('<mark style="--r:' + rang + '">' + esc(t) + '</mark>'); }); return m; }
  function chiz(){
    kartalar.innerHTML = '';
    Object.keys(USLUB).forEach(k=>{
      const u = USLUB[k]; const faol = joriy === k;
      const kq = el('div', 'til-uk' + (faol ? ' faol' : ''), '<span class="til-ust" style="color:' + u.rang + '">' + u.nom + '</span><p class="til-um">' + (faol ? belgilaMatn(u.matn, u.tasvir, u.rang) : esc(u.matn)) + '</p>' + (faol ? '<ul>' + u.belgi.map(b=>'<li>' + b + '</li>').join('') + '</ul><small>Qayerda: ' + u.joy + '</small>' : '<small>Qayerda: ' + u.joy + '</small>'));
      kq.style.setProperty('--r', u.rang);
      kq.onclick = ()=>korsat(k, true); kartalar.append(kq);
    });
  }
  function korsat(k, bosildi){
    const u = USLUB[k]; if(!u) return; joriy = k; chiz();
    if(bosildi) karta({ust:'Nutq uslubi', nom:'<span style="color:' + u.rang + '">' + u.nom + '</span>', matn:'<b>Belgilari:</b> ' + u.belgi.join('; ') + '.', qosh:'Qo‘llanadi: ' + u.joy});
    izoh.innerHTML = '<b style="color:' + u.rang + '">' + u.nom + '</b> — ' + u.joy + '. Belgilari: ' + u.belgi.join('; ') + '.';
    faolQil(tag, '[data-u]', tb[k]);
    detal('til_uslub', k); hodisa('til-uslub', {nom:k, bosildi:!!bosildi});
  }
  api.holat = h=>{
    if(!h) return;
    if(h.uslub && USLUB[h.uslub]) korsat(h.uslub);
    if(h.matn !== undefined){ const s = USLUB_SINOV[h.matn]; if(s){ sinov.style.display = ''; sinov.innerHTML = '<span class="til-ust">Qaysi uslub?</span><p class="til-um">' + esc(s.m) + '</p>'; joriy = null; chiz(); izoh.innerHTML = 'Matnni o‘qing va uslubini aniqlang (javob variantlari o‘ng paneldagi topshiriqda).'; } else sinov.style.display = 'none'; }
    if(h.hamma){ joriy = null; sinov.style.display = 'none'; chiz(); }
  };
  api.boshla = ()=>{ joriy = null; sinov.style.display = 'none'; chiz(); };
  const tb = tugmalar(tag, Object.keys(USLUB).map(k=>({m:USLUB[k].nom.replace(' uslub', '').replace(' uslubi', ''), k, f:()=>korsat(k, true)})));
  Object.keys(USLUB).forEach(k=>{ tb[k].dataset.u = k; });
  chiz();
  izoh.innerHTML = 'Beshta uslub kartasi. Kartani <b>bosing</b> — uslubga xos so‘z va iboralar matnda belgilanadi.';
  return api;
};


/* ---------- sxematik 2D xarita (SVG): lon/lat → nuqta; relyef yo‘q, daryolar taxminiy polyline ---------- */
function xaritaSvg(cfg){
  const W = cfg.W || 760, kx = W / (cfg.lon1 - cfg.lon0), ky = kx / Math.cos((cfg.lat0 + cfg.lat1) / 2 * Math.PI / 180);
  const H = Math.round((cfg.lat1 - cfg.lat0) * ky);
  const px = (lon, lat)=>[((lon - cfg.lon0) * kx).toFixed(1), ((cfg.lat1 - lat) * ky).toFixed(1)];
  const yol = nuq=>nuq.map((p, i)=>(i ? 'L' : 'M') + px(p[0], p[1]).join(' ')).join(' ');
  /* daryolar (taxminiy, sxematik) */
  const DARYO = {
    sirdaryo:[[72.0, 40.3], [71.0, 40.5], [69.6, 40.3], [68.8, 40.9], [67.5, 41.3], [66.0, 42.2], [64.0, 43.5], [62.0, 44.6], [61.0, 45.8]],
    amudaryo:[[71.5, 37.1], [69.5, 37.2], [67.3, 37.2], [65.6, 38.6], [63.5, 39.6], [62.0, 40.8], [60.6, 41.6], [59.7, 43.3], [59.0, 44.6]],
    zarafshon:[[68.7, 39.5], [67.5, 39.6], [66.97, 39.65], [65.5, 39.9], [64.4, 39.77], [63.6, 39.6]],
    hirirud:[[64.5, 34.1], [62.2, 34.35], [61.2, 34.6], [61.0, 36.0]],
    hind:[[74.0, 34.5], [72.5, 32.5], [71.0, 30.0], [69.0, 27.0], [67.9, 24.5]],
    gang:[[77.6, 29.9], [78.1, 28.3], [78.0, 27.18], [79.5, 26.5], [81.0, 25.8]]
  };
  let s = '<rect width="' + W + '" height="' + H + '" fill="#121733" rx="14"/>';
  for(let i = 1; i < 6; i++) s += '<line x1="' + (W * i / 6) + '" y1="0" x2="' + (W * i / 6) + '" y2="' + H + '" stroke="rgba(255,255,255,.04)"/><line y1="' + (H * i / 6) + '" x1="0" y2="' + (H * i / 6) + '" x2="' + W + '" stroke="rgba(255,255,255,.04)"/>';
  (cfg.daryolar || []).forEach(k=>{ if(DARYO[k]) s += '<path d="' + yol(DARYO[k]) + '" fill="none" stroke="#3f7fc9" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>'; });
  (cfg.toglar || []).forEach(t=>{ const [x, y] = px(t[0], t[1]); s += '<path d="M' + (x - 14) + ' ' + (+y + 8) + ' l14 -18 l14 18 z" fill="none" stroke="#6e769a" stroke-width="1.5" opacity=".7"/>'; });
  (cfg.hudud || []).forEach(h=>{ s += '<path d="' + yol(h.nuq) + ' Z" fill="' + h.rang + '" fill-opacity=".14" stroke="' + h.rang + '" stroke-opacity=".5" stroke-width="1.2" stroke-dasharray="4 3"/>'; const [x, y] = px(h.yoz[0], h.yoz[1]); s += '<text x="' + x + '" y="' + y + '" fill="' + h.rang + '" font-size="12" font-style="italic" opacity=".85" text-anchor="middle" font-family="Georgia,serif">' + esc(h.nom) + '</text>'; });
  return {W, H, px, yol, bosh:s};
}
const shaharSvg = (px, sh, k, faol, rang)=>{ const [x, y] = px(sh.lon, sh.lat); return '<g class="til-sh' + (faol ? ' faol' : '') + '" data-k="' + k + '" style="cursor:pointer"><circle cx="' + x + '" cy="' + y + '" r="' + (faol ? 9 : 6) + '" fill="' + (rang || '#ffd24a') + '" stroke="#0b0f1e" stroke-width="2"/>' + (faol ? '<circle cx="' + x + '" cy="' + y + '" r="15" fill="none" stroke="' + (rang || '#ffd24a') + '" opacity=".6"/>' : '') + '<text x="' + (+x + (sh.chap ? -11 : 11)) + '" y="' + (+y + (sh.past ? 16 : 4)) + '" text-anchor="' + (sh.chap ? 'end' : 'start') + '" fill="#f1e6cf" font-size="12.5" font-weight="700" font-family="Inter,sans-serif" style="text-shadow:0 1px 3px #000">' + esc(sh.nom) + '</text></g>'; };

/* ================= 10. ALISHER NAVOIY (til_ot_navoiy) — 7-sinf, 2D ================= */
/* Sanalar: Navoiy 1441-yil 9-fevral (Hirot) – 1501-yil 3-yanvar (Hirot); «Xamsa» 1483–1485 — o‘zbek adabiyotshunosligi va Wikipedia (inglizcha) «Ali-Shir Nava’i». */
const NAVOIY_SH = {
  hirot:{nom:'Hirot', lon:62.20, lat:34.35, izoh:'Tug‘ilgan va vafot etgan shahri; Husayn Boyqaro poytaxti, Temuriylar madaniy markazi.'},
  samarqand:{nom:'Samarqand', lon:66.97, lat:39.65, izoh:'1465–1469-yillarda Navoiy shu yerda tahsil olgan (manbalarda Fazlulloh Abullays madrasasi).'},
  mashhad:{nom:'Mashhad', lon:59.60, lat:36.30, izoh:'Yoshligida Abulqosim Bobur saroyida (1457–1463) bo‘lgan shahar.'},
  astrobod:{nom:'Astrobod (Gurgon)', lon:54.43, lat:36.84, chap:true, izoh:'1487–1488-yillarda Navoiy shu viloyatning hokimi bo‘lgan.'},
  marv:{nom:'Marv', lon:62.19, lat:37.66, past:true, izoh:'Xuroson shaharlaridan; Navoiy hayoti o‘tgan hudud.'},
  balx:{nom:'Balx', lon:66.90, lat:36.76, izoh:'Xurosonning sharqiy shahri; Husayn Boyqaro davlati tarkibida.'},
  buxoro:{nom:'Buxoro', lon:64.42, lat:39.77, chap:true, izoh:'Movarounnahrning yirik madaniy markazi.'}
};
const NAVOIY_V = [
  {y:'1441', s:'9-fevral — Hirotda tug‘ildi', m:'Alisher Navoiy (G‘iyosiddin Kichkina oilasida) Hirotda tug‘ildi. Bolaligidan she’r yodlagan, 4 yoshida maktabga borgan (manbalar).', sh:'hirot'},
  {y:'1457', s:'Mashhadda', m:'Oilasi bilan Mashhadga ko‘chadi; Abulqosim Bobur saroyida bo‘ladi, ta’lim oladi (1457–1463).', sh:'mashhad'},
  {y:'1465', s:'Samarqandda tahsil', m:'1465–1469-yillarda Samarqandda, Fazlulloh Abullays madrasasida tahsil oladi.', sh:'samarqand'},
  {y:'1469', s:'Hirotga qaytish', m:'Husayn Boyqaro Hirot taxtiga o‘tiradi; Navoiy Hirotga qaytib, muhrdor lavozimini oladi.', sh:'hirot'},
  {y:'1472', s:'Amir (vazir) lavozimi', m:'Navoiy amir (vazir) etib tayinlanadi; madrasa, masjid, shifoxona, hammom va ko‘priklar qurdiradi (manbalarda 300 ga yaqin bino).', sh:'hirot'},
  {y:'1483', s:'«Xamsa» yozildi (1483–1485)', m:'Ikki yil ichida besh doston: «Hayrat ul-abror», «Farhod va Shirin», «Layli va Majnun», «Sab’ai sayyor», «Saddi Iskandariy» — turkiy tilda yozilgan birinchi to‘liq «Xamsa».', sh:'hirot'},
  {y:'1487', s:'Astrobod hokimi', m:'1487–1488-yillarda Astrobod viloyati hokimi; keyin Hirotga qaytadi.', sh:'astrobod'},
  {y:'1491', s:'«Majolis un-nafois»', m:'Turkiy tildagi birinchi tazkira (shoirlar haqida ma’lumotnoma) — 1491-yil (1498-yilda to‘ldirilgan).', sh:'hirot'},
  {y:'1498', s:'«Xazoyin ul-maoniy», «Lison ut-tayr»', m:'To‘rt devondan iborat «Xazoyin ul-maoniy» (1492–1498) va «Lison ut-tayr» dostoni (1498–1499).', sh:'hirot'},
  {y:'1499', s:'«Muhokamat ul-lug‘atayn»', m:'Turkiy va forsiy tillarni qiyoslagan asar: turkiy til badiiy ijod uchun boy va qudratli ekanini isbotlaydi.', sh:'hirot'},
  {y:'1501', s:'3-yanvar — vafot', m:'Hirotda vafot etadi; o‘zi qurdirgan Qudsiya masjidi yonida dafn etilgan (manbalar).', sh:'hirot'}
];
const XAMSA = {
  hayrat:{nom:'Hayrat ul-abror', uz:'Yaxshilar hayrati', y:'1483', m:'Falsafiy-didaktik doston: 20 maqolat — adolat, saxovat, ilm, mehnat haqida; har maqolatdan keyin hikoyat.'},
  farhod:{nom:'Farhod va Shirin', uz:'', y:'1484', m:'Shahzoda Farhodning mehnati, ilmi va Shiringa sadoqati; Xusrav va Farhod — ikki xil qadriyat.'},
  layli:{nom:'Layli va Majnun', uz:'', y:'1484', m:'Qays (Majnun) va Laylining fojiali muhabbati; ishq va jamiyat ziddiyati.'},
  sabai:{nom:'Sab’ai sayyor', uz:'Yetti sayyora', y:'1484', m:'Bahrom va Dilorom qissasi; yetti qasrda yetti musofir aytgan yetti hikoyat.'},
  saddi:{nom:'Saddi Iskandariy', uz:'Iskandar devori', y:'1485', m:'Adolatli hukmdor Iskandar obrazi: ilm, kengash va xalq farovonligi g‘oyasi.'}
};
SOZ.navoiy = {shahar:NAVOIY_SH, voqea:NAVOIY_V, xamsa:XAMSA};
R.til_ot_navoiy = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili va adabiyot · Alisher Navoiy · xarita sxematik');
  const Z = sahna2d(sahna, {cls:'til-navoiy'}), {ichi, api, karta} = Z;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Alisher Navoiy (1441–1501)</span><h3>Xronologiya, Xuroson–Movarounnahr xaritasi va «Xamsa» dostonlari</h3>'));
  const xr = el('div', 'til-xron'), xq = el('div', 'til-xarita'), xm = el('div', 'til-xamsa');
  ichi.append(xr, xq, xm);
  let voqea = 0, shahar = null, doston = null;
  const X = xaritaSvg({lon0:52.5, lon1:71.5, lat0:33, lat1:42.5, W:760, daryolar:['sirdaryo', 'amudaryo', 'zarafshon', 'hirirud'], toglar:[[70.5, 39.0], [68.5, 38.2], [63.5, 36.0], [58.5, 37.6]], hudud:[{nom:'Xuroson', rang:'#ffb86b', yoz:[61.5, 35.8], nuq:[[53.5, 38.2], [60.5, 38.6], [66.5, 37.8], [69.5, 36.2], [68.5, 33.6], [57.5, 33.4], [53.5, 35.5]]}, {nom:'Movarounnahr', rang:'#5cc8ff', yoz:[65.5, 40.6], nuq:[[60.5, 42.2], [66.5, 42.3], [71.4, 41.0], [71.4, 38.6], [67.5, 38.0], [63.0, 38.9], [60.5, 40.5]]}]});
  function chizXron(){
    xr.innerHTML = '<div class="til-xron-ichi">' + NAVOIY_V.map((v, i)=>'<button class="til-xv' + (i === voqea ? ' faol' : '') + (i < voqea ? ' otdi' : '') + '" data-i="' + i + '"><b>' + v.y + '</b><span>' + esc(v.s) + '</span></button>').join('') + '</div>';
    xr.querySelectorAll('.til-xv').forEach(b=>b.onclick = ()=>api.holat({voqea:+b.dataset.i, bosildi:true}));
  }
  function chizXarita(){
    let s = X.bosh;
    Object.keys(NAVOIY_SH).forEach(k=>{ s += shaharSvg(X.px, NAVOIY_SH[k], k, k === shahar, k === 'hirot' ? '#ffb86b' : '#ffd24a'); });
    xq.innerHTML = '<svg viewBox="0 0 ' + X.W + ' ' + X.H + '" width="100%" style="max-width:' + X.W + 'px;display:block;margin:0 auto;border-radius:14px">' + s + '</svg><small class="til-izoh">Xarita sxematik: daryolar va hududlar taxminiy chizilgan, XV asr chegaralari aniq emas.</small>';
    xq.querySelectorAll('.til-sh').forEach(gq=>gq.onclick = ()=>api.holat({shahar:gq.dataset.k, bosildi:true}));
  }
  function chizXamsa(){
    xm.innerHTML = '<span class="til-ust">«Xamsa» — besh doston (1483–1485)</span><div class="til-dostonlar">' + Object.keys(XAMSA).map(k=>{ const d = XAMSA[k]; return '<button class="til-doston' + (k === doston ? ' faol' : '') + '" data-k="' + k + '"><b>' + esc(d.nom) + '</b>' + (d.uz ? '<i>' + esc(d.uz) + '</i>' : '') + '<small>' + d.y + '</small></button>'; }).join('') + '</div>';
    xm.querySelectorAll('.til-doston').forEach(b=>b.onclick = ()=>api.holat({doston:b.dataset.k, bosildi:true}));
  }
  api.holat = h=>{
    if(!h) return;
    if(h.voqea !== undefined && NAVOIY_V[h.voqea]){ voqea = +h.voqea; const v = NAVOIY_V[voqea]; shahar = v.sh; chizXron(); chizXarita(); izoh.innerHTML = '<b>' + v.y + ' — ' + esc(v.s) + '.</b> ' + v.m; if(h.bosildi) karta({ust:v.y, nom:esc(v.s), matn:v.m, qosh:'Shahar: ' + NAVOIY_SH[v.sh].nom}); detal('til_navoiy', 'v' + voqea); hodisa('til-navoiy', {nom:'v' + voqea, yil:v.y, shahar:v.sh, bosildi:!!h.bosildi}); xr.querySelector('.til-xv.faol') && xr.querySelector('.til-xv.faol').scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'}); }
    if(h.shahar && NAVOIY_SH[h.shahar]){ shahar = h.shahar; chizXarita(); const sh = NAVOIY_SH[shahar]; izoh.innerHTML = '<b>' + sh.nom + '.</b> ' + sh.izoh; if(h.bosildi) karta({ust:'Shahar', nom:sh.nom, matn:sh.izoh}); detal('til_navoiy', shahar); hodisa('til-navoiy', {nom:shahar, bosildi:!!h.bosildi}); }
    if(h.doston && XAMSA[h.doston]){ doston = h.doston; chizXamsa(); const d = XAMSA[doston]; izoh.innerHTML = '<b>«' + esc(d.nom) + '»' + (d.uz ? ' («' + esc(d.uz) + '»)' : '') + ', ' + d.y + '.</b> ' + d.m; if(h.bosildi) karta({ust:'«Xamsa» dostoni · ' + d.y, nom:'«' + esc(d.nom) + '»', matn:d.m}); detal('til_navoiy', doston); hodisa('til-navoiy', {nom:doston, bosildi:!!h.bosildi}); }
    if(h.rejim){ const q = {xronologiya:xr, xarita:xq, xamsa:xm}[h.rejim]; if(q) q.scrollIntoView({block:'start', behavior:'smooth'}); }
  };
  api.boshla = ()=>{ voqea = 0; shahar = 'hirot'; doston = null; chizXron(); chizXarita(); chizXamsa(); };
  tugmalar(tag, [
    {m:'◂ Oldingi', f:()=>api.holat({voqea:Math.max(0, voqea - 1), bosildi:true})}, {m:'Keyingi ▸', f:()=>api.holat({voqea:Math.min(NAVOIY_V.length - 1, voqea + 1), bosildi:true})}, '|',
    {m:'Xronologiya', f:()=>api.holat({rejim:'xronologiya'})}, {m:'Xarita', f:()=>api.holat({rejim:'xarita'})}, {m:'«Xamsa»', f:()=>api.holat({rejim:'xamsa'})}
  ]);
  api.boshla();
  izoh.innerHTML = 'Xronologiyadagi voqeani, xaritadagi shaharni yoki «Xamsa» dostonini <b>bosing</b>.';
  return api;
};

/* ================= 12. BOBURNOMA: ANDIJONDAN HINDISTONGACHA (til_ot_bobur) — 9-sinf, 2D ================= */
/* Sanalar: Bobur 1483-yil 14-fevral (Andijon) – 1530-yil 26-dekabr (Agra); Kobul 1504; Panipat 1526-yil 21-aprel; Xonua 1527-yil 17-mart — Wikipedia (inglizcha) «Babur», «First Battle of Panipat», «Battle of Khanwa». */
const BOBUR_SH = {
  andijon:{nom:'Andijon', lon:72.34, lat:40.78, izoh:'1483-yil 14-fevralda tug‘ilgan; Farg‘ona ulusining poytaxti.'},
  samarqand:{nom:'Samarqand', lon:66.97, lat:39.65, chap:true, izoh:'1497 va 1500–1501-yillarda ikki marta egallab, ikki marta yo‘qotgan (Shayboniyxon).'},
  toshkent:{nom:'Toshkent', lon:69.24, lat:41.30, izoh:'Tog‘asi Mahmudxon huzurida bo‘lgan (1502–1503, taxminiy).'},
  hisor:{nom:'Hisor', lon:68.55, lat:38.53, past:true, izoh:'Movarounnahrdan Kobulga yo‘l (1504) shu hudud orqali o‘tgan (sxematik).'},
  kobul:{nom:'Kobul', lon:69.17, lat:34.53, chap:true, izoh:'1504-yilda egallagan; 20 yildan ortiq poytaxti. Bobur vasiyatiga ko‘ra keyinchalik shu yerga dafn etilgan (Bog‘i Bobur).'},
  hirot:{nom:'Hirot', lon:62.20, lat:34.35, chap:true, izoh:'1506-yilda Husayn Boyqaro vafotidan keyin Hirotga borgan; «Boburnoma»da shahar tasviri bor.'},
  qandahor:{nom:'Qandahor', lon:65.71, lat:31.61, past:true, izoh:'1522-yilda egallagan — Hindistonga yurish uchun tayanch.'},
  lahor:{nom:'Lahor', lon:74.35, lat:31.55, izoh:'1524-yilda egallagan; Panjob — Hindistonga eshik.'},
  panipat:{nom:'Panipat', lon:76.97, lat:29.39, izoh:'1526-yil 21-aprel — Ibrohim Lo‘diy ustidan g‘alaba; Boburiylar davlatining boshlanishi.'},
  dehli:{nom:'Dehli', lon:77.21, lat:28.61, chap:true, past:true, izoh:'Panipatdan keyin egallangan poytaxt.'},
  agra:{nom:'Agra', lon:78.01, lat:27.18, izoh:'Poytaxt; 1527-yil 17-mart — Xonua jangi (Rano Sango); 1530-yil 26-dekabr — Bobur Agrada vafot etgan.'}
};
const BOBUR_B = [
  {y:'1483', s:'Andijonda tug‘ildi', sh:['andijon'], m:'Zahiriddin Muhammad Bobur 1483-yil 14-fevralda Andijonda, Farg‘ona hokimi Umarshayx Mirzo oilasida tug‘ildi. Temuriylar avlodi.'},
  {y:'1494', s:'12 yoshda Farg‘ona taxti', sh:['andijon'], m:'Otasi vafot etgach, 12 yoshida Farg‘ona ulusi hukmdori bo‘ldi. «Boburnoma» voqealari ham 1494-yildan boshlanadi.'},
  {y:'1497', s:'Samarqand uchun kurash', sh:['andijon', 'samarqand'], m:'1497-yilda Samarqandni egalladi, lekin ushlab tura olmadi; 1500–1501-yillarda yana egallab, Saripul jangida Shayboniyxondan yengildi.'},
  {y:'1502', s:'Toshkent — tog‘asi huzurida', sh:['andijon', 'samarqand', 'toshkent'], m:'Taxtdan mahrum Bobur bir muddat Toshkentda tog‘asi Mahmudxon huzurida bo‘ldi (sana taxminiy).'},
  {y:'1504', s:'Kobulni egallash', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul'], m:'Hisor orqali janubga o‘tib Kobulni egalladi — yangi davlatining poytaxti. Bu yerda 20 yildan ortiq hukmronlik qildi.'},
  {y:'1506', s:'Hirotga safar', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul', 'hirot'], m:'Husayn Boyqaro vafotidan keyin Hirotga bordi; «Boburnoma»da Hirot va Navoiy davri yodgorliklari tasvirlangan. Keyin Kobulga qaytdi.'},
  {y:'1522', s:'Qandahor va Lahor', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul', 'hirot', 'qandahor', 'lahor'], m:'1522-yilda Qandahorni, 1524-yilda Lahorni egalladi — Hindistonga yurish uchun yo‘l ochildi.'},
  {y:'1526', s:'21-aprel — Panipat jangi', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul', 'hirot', 'qandahor', 'lahor', 'panipat', 'dehli'], m:'Panipatda Dehli sultoni Ibrohim Lo‘diyning ko‘p sonli qo‘shinini yengdi (to‘p va miltiqdan foydalangan); Dehli va Agra egallandi — Boburiylar davlati boshlandi.'},
  {y:'1527', s:'17-mart — Xonua jangi', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul', 'hirot', 'qandahor', 'lahor', 'panipat', 'dehli', 'agra'], m:'Agra yaqinidagi Xonua (Kanva)da rajputlar ittifoqi (Rano Sango) ustidan g‘alaba — davlat mustahkamlandi.'},
  {y:'1530', s:'26-dekabr — Agrada vafot', sh:['andijon', 'samarqand', 'toshkent', 'hisor', 'kobul', 'hirot', 'qandahor', 'lahor', 'panipat', 'dehli', 'agra'], m:'Bobur 47 yoshida Agrada vafot etdi; vasiyatiga ko‘ra keyinchalik Kobulga, o‘zi yaxshi ko‘rgan bog‘ga dafn etildi. «Boburnoma» 1494–1529-yillar voqealarini qamrab oladi.'}
];
SOZ.bobur = {shahar:BOBUR_SH, bosqich:BOBUR_B};
R.til_ot_bobur = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili va adabiyot · «Boburnoma» yo‘li · xarita sxematik');
  const Z = sahna2d(sahna, {cls:'til-bobur'}), {ichi, api, karta} = Z;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Zahiriddin Muhammad Bobur (1483–1530)</span><h3>Andijondan Hindistongacha — yo‘l xaritasi va bosqichlar</h3>'));
  const xq = el('div', 'til-xarita'), xr = el('div', 'til-xron');
  ichi.append(xq, xr);
  let bosq = 0, shahar = null;
  const X = xaritaSvg({lon0:59.5, lon1:81, lat0:25, lat1:42.5, W:760, daryolar:['sirdaryo', 'amudaryo', 'zarafshon', 'hirirud', 'hind', 'gang'], toglar:[[70.5, 39.2], [71.5, 36.5], [74.5, 35.5], [66.0, 35.5], [63.0, 34.9], [76.5, 32.5], [78.5, 31.5]], hudud:[{nom:'Movarounnahr', rang:'#5cc8ff', yoz:[65.5, 40.8], nuq:[[60.5, 42.3], [66.5, 42.3], [72.5, 41.8], [73.0, 39.0], [68.0, 38.0], [63.0, 38.9], [60.5, 40.5]]}, {nom:'Xuroson', rang:'#ffb86b', yoz:[62.0, 36.5], nuq:[[59.6, 38.3], [64.5, 38.2], [67.5, 37.0], [66.5, 33.5], [60.0, 33.5]]}, {nom:'Hindiston (Dehli sultonligi)', rang:'#ff8fab', yoz:[76.5, 27.0], nuq:[[72.0, 33.0], [78.5, 32.0], [80.8, 28.5], [80.5, 25.3], [70.5, 25.3], [69.0, 28.0]]}]});
  function chizXarita(){
    const b = BOBUR_B[bosq]; let s = X.bosh;
    const yo = b.sh.map(k=>[BOBUR_SH[k].lon, BOBUR_SH[k].lat]);
    if(yo.length > 1) s += '<path class="til-yolchiz" d="' + X.yol(yo) + '" fill="none" stroke="#ffd24a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 5"/>';
    Object.keys(BOBUR_SH).forEach(k=>{ const bor = b.sh.includes(k), oxirgi = b.sh[b.sh.length - 1] === k; s += shaharSvg(X.px, BOBUR_SH[k], k, k === shahar || oxirgi, bor ? (oxirgi ? '#ff8fab' : '#ffd24a') : '#6e769a'); });
    xq.innerHTML = '<svg viewBox="0 0 ' + X.W + ' ' + X.H + '" width="100%" style="max-width:' + X.W + 'px;display:block;margin:0 auto;border-radius:14px">' + s + '</svg><small class="til-izoh">Yo‘l sxematik — shaharlar orasidagi to‘g‘ri chiziqlar, haqiqiy marshrut emas; daryolar va hududlar taxminiy.</small>';
    xq.querySelectorAll('.til-sh').forEach(gq=>gq.onclick = ()=>api.holat({shahar:gq.dataset.k, bosildi:true}));
  }
  function chizXron(){
    xr.innerHTML = '<div class="til-xron-ichi">' + BOBUR_B.map((v, i)=>'<button class="til-xv' + (i === bosq ? ' faol' : '') + (i < bosq ? ' otdi' : '') + '" data-i="' + i + '"><b>' + v.y + '</b><span>' + esc(v.s) + '</span></button>').join('') + '</div>';
    xr.querySelectorAll('.til-xv').forEach(b=>b.onclick = ()=>api.holat({bosqich:+b.dataset.i, bosildi:true}));
  }
  api.holat = h=>{
    if(!h) return;
    if(h.bosqich !== undefined && BOBUR_B[h.bosqich]){ bosq = +h.bosqich; shahar = null; chizXarita(); chizXron(); const b = BOBUR_B[bosq]; izoh.innerHTML = '<b>' + b.y + ' — ' + esc(b.s) + '.</b> ' + b.m; if(h.bosildi) karta({ust:b.y, nom:esc(b.s), matn:b.m}); detal('til_bobur', 'b' + bosq); hodisa('til-bobur', {nom:'b' + bosq, yil:b.y, shahar:b.sh[b.sh.length - 1], bosildi:!!h.bosildi}); }
    if(h.shahar && BOBUR_SH[h.shahar]){ shahar = h.shahar; chizXarita(); const sh = BOBUR_SH[shahar]; izoh.innerHTML = '<b>' + sh.nom + '.</b> ' + sh.izoh; if(h.bosildi) karta({ust:'Shahar', nom:sh.nom, matn:sh.izoh}); detal('til_bobur', shahar); hodisa('til-bobur', {nom:shahar, bosildi:!!h.bosildi}); }
  };
  api.boshla = ()=>{ bosq = 0; shahar = null; chizXarita(); chizXron(); };
  tugmalar(tag, [
    {m:'◂ Oldingi', f:()=>api.holat({bosqich:Math.max(0, bosq - 1), bosildi:true})}, {m:'Keyingi bosqich ▸', f:()=>api.holat({bosqich:Math.min(BOBUR_B.length - 1, bosq + 1), bosildi:true})}, '|',
    {m:'Butun yo‘l', f:()=>api.holat({bosqich:BOBUR_B.length - 1, bosildi:true})}, {m:'Boshidan', f:()=>api.holat({bosqich:0, bosildi:true})}
  ]);
  api.boshla();
  izoh.innerHTML = '«Keyingi bosqich» tugmasi bilan yo‘lni kuzating; xaritadagi shaharni <b>bosing</b>.';
  return api;
};

/* ================= 13. ABDULLA QODIRIY, «O‘TKAN KUNLAR» (til_ot_qodiriy) — 10-sinf, 2D ================= */
/* Qodiriy 1894-yil 10-aprel (Toshkent) – 1938-yil 4-oktabr (otib tashlangan; 1956 oqlangan). Roman: 1919–1920 yozilgan, 1922–1925 «Inqilob» jurnalida, 1926 alohida kitob — Wikipedia «Oʻtkan kunlar», ziyouz.uz. Toshkent 1865-yil iyun — Chernyayev qo‘shini. */
const QOD_Q = {
  otabek:{nom:'Otabek', x:380, y:215, rang:'#5cc8ff', kim:'Bosh qahramon — Yusufbek hojining o‘g‘li, toshkentlik savdogar yigit; ma’rifatli, jamiyatni isloh qilishni orzu qiladi.'},
  kumush:{nom:'Kumush', x:580, y:215, rang:'#ff8fab', kim:'Marg‘ilonlik qutidorning qizi, Otabekning sevgilisi va xotini; romanning eng go‘zal obrazi, fojiali taqdir.'},
  yusufbek:{nom:'Yusufbek hoji', x:250, y:85, rang:'#ffb347', kim:'Otabekning otasi, Toshkentning obro‘li kishisi; xalq tinchligi uchun kurashadi, qipchoq–qorachopon nizosiga qarshi.'},
  ozbekoyim:{nom:'O‘zbek oyim', x:420, y:70, rang:'#ffb347', kim:'Otabekning onasi; o‘g‘lini «toshkentlik» qizga — Zaynabga uylantirishga majbur qiladi.'},
  qutidor:{nom:'Mirzakarim qutidor', x:650, y:85, rang:'#ffd24a', kim:'Kumushning otasi, marg‘ilonlik savdogar; Otabekni kuyov qiladi, Homid tuhmatidan jabr ko‘radi.'},
  oftoboyim:{nom:'Oftob oyim', x:720, y:200, rang:'#ffd24a', kim:'Kumushning onasi.'},
  zaynab:{nom:'Zaynab', x:380, y:360, rang:'#a996ff', kim:'Otabekning ikkinchi (majburiy) xotini; rashk tufayli Kumushni zaharlaydi.'},
  homid:{nom:'Homid', x:600, y:355, rang:'#ff6f5c', kim:'Asosiy salbiy qahramon; Kumushga uylanmoqchi, Otabek va qutidorga tuhmat uyushtiradi, oxirida Otabek qo‘lida halok bo‘ladi.'},
  hasanali:{nom:'Hasanali', x:170, y:250, rang:'#36d6a0', kim:'Yusufbek hoji xonadonining sodiq xizmatkori, Otabekning «ikkinchi otasi».'},
  sodiq:{nom:'Sodiq va Jannat', x:740, y:340, rang:'#ff6f5c', kim:'Homidning sheriklari (Jannat — Sodiqning onasi); fitnalarda qatnashadi.'},
  azizbek:{nom:'Azizbek', x:110, y:120, rang:'#9aa3c7', kim:'Toshkent hokimi (tarixiy shaxs); Qo‘qon xonligiga qarshi isyoni roman voqealari fonida (taxminan 1847).'},
  musulmonqul:{nom:'Musulmonqul', x:110, y:360, rang:'#9aa3c7', kim:'Qo‘qon xonligi mingboshisi, qipchoqlar yetakchisi (tarixiy shaxs); qipchoq–qorachopon nizosi.'}
};
const QOD_A = [
  ['otabek', 'kumush', 'sevgi · nikoh', '#ff8fab'], ['otabek', 'yusufbek', 'o‘g‘li', '#ffb347'], ['otabek', 'ozbekoyim', 'o‘g‘li', '#ffb347'], ['kumush', 'qutidor', 'qizi', '#ffd24a'], ['kumush', 'oftoboyim', 'qizi', '#ffd24a'],
  ['otabek', 'zaynab', 'majburiy nikoh', '#a996ff'], ['zaynab', 'kumush', 'kundosh · zahar', '#ff6f5c'], ['homid', 'kumush', 'da’vogar', '#ff6f5c'], ['homid', 'otabek', 'dushman · tuhmat', '#ff6f5c'], ['hasanali', 'otabek', 'sodiq xizmatkor', '#36d6a0'],
  ['homid', 'sodiq', 'sheriklar', '#ff6f5c'], ['yusufbek', 'azizbek', 'hokim kengashi', '#9aa3c7'], ['yusufbek', 'musulmonqul', 'nizo davri', '#9aa3c7']
];
const QOD_T = [
  {y:'1847', s:'Roman voqealari boshlanadi', m:'Roman «1264-yil hijriy, dalv oyi» (taxminan 1847–1848) bilan ochiladi: Toshkent, Marg‘ilon, Qo‘qon xonligi; Azizbekning isyoni.'},
  {y:'1852', s:'Qipchoqlar qirg‘ini', m:'Qo‘qon xonligida qipchoq–qorachopon nizosi avjiga chiqadi; romanda Yusufbek hoji bu nizoga qarshi turadi (sanalar tarixiy, taxminiy).'},
  {y:'1865', s:'Toshkent — Rossiya imperiyasi', m:'1865-yil iyunda general Chernyayev qo‘shini Toshkentni egallaydi (manbalarda 15 yoki 28–29-iyun). Roman nomi — «O‘tkan kunlar» — shu bosqindan oldingi davr haqida.'},
  {y:'1894', s:'Qodiriy tug‘ildi', m:'Abdulla Qodiriy 1894-yil 10-aprelda Toshkentda bog‘bon oilasida tug‘ilgan.'},
  {y:'1919', s:'Roman yozildi', m:'«O‘tkan kunlar» 1919–1920-yillarda yozilgan — o‘zbek adabiyotidagi birinchi roman.'},
  {y:'1922', s:'«Inqilob» jurnalida', m:'Roman 1922–1925-yillarda «Inqilob» jurnalida qismlarga bo‘lib bosilgan.'},
  {y:'1926', s:'Alohida kitob', m:'1926-yilda roman alohida kitob holida nashr etildi; 1928 — «Mehrobdan chayon».'},
  {y:'1938', s:'Qatag‘on', m:'1937-yil oxirida qamoqqa olinib, 1938-yil 4-oktabrda otib tashlangan; 1956-yilda oqlangan.'}
];
SOZ.qodiriy = {qahramon:QOD_Q, aloqa:QOD_A, tarix:QOD_T};
R.til_ot_qodiriy = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Ona tili va adabiyot · «O‘tkan kunlar» · qahramonlar sxemasi');
  const Z = sahna2d(sahna, {cls:'til-qodiriy'}), {ichi, api, karta} = Z;
  ichi.append(el('div', 'til-sar', '<span class="til-ust">Abdulla Qodiriy (1894–1938) · «O‘tkan kunlar»</span><h3>Qahramonlar munosabati va XIX asr Toshkent konteksti</h3>'));
  const sx = el('div', 'til-sxema'), xr = el('div', 'til-xron');
  ichi.append(sx, xr);
  let q = null, tar = -1;
  function chizSxema(){
    const W = 820, H = 420; let s = '';
    QOD_A.forEach(([a, b, yoz, rang])=>{ const A2 = QOD_Q[a], B2 = QOD_Q[b]; const faol = q === a || q === b; s += '<line x1="' + A2.x + '" y1="' + A2.y + '" x2="' + B2.x + '" y2="' + B2.y + '" stroke="' + rang + '" stroke-width="' + (faol ? 3 : 1.4) + '" opacity="' + (q && !faol ? .15 : .7) + '"/>'; if(faol || !q) s += '<text x="' + ((A2.x + B2.x) / 2) + '" y="' + ((A2.y + B2.y) / 2 - 5) + '" text-anchor="middle" fill="' + rang + '" font-size="10.5" font-weight="600" font-family="Inter,sans-serif" opacity="' + (faol ? 1 : .55) + '" style="text-shadow:0 1px 2px #000">' + esc(yoz) + '</text>'; });
    Object.keys(QOD_Q).forEach(k=>{ const p = QOD_Q[k]; const faol = q === k; const w = p.nom.length * 7.2 + 22; s += '<g class="til-qn' + (faol ? ' faol' : '') + '" data-k="' + k + '" style="cursor:pointer"><rect x="' + (p.x - w / 2) + '" y="' + (p.y - 15) + '" width="' + w + '" height="30" rx="15" fill="' + (faol ? p.rang : 'rgba(12,16,34,.92)') + '" stroke="' + p.rang + '" stroke-width="' + (faol ? 2.5 : 1.5) + '"/><text x="' + p.x + '" y="' + (p.y + 4.5) + '" text-anchor="middle" fill="' + (faol ? '#0b0f1e' : '#eef1fb') + '" font-size="12.5" font-weight="700" font-family="Inter,sans-serif">' + esc(p.nom) + '</text></g>'; });
    sx.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;background:#121733;border-radius:14px">' + s + '</svg>';
    sx.querySelectorAll('.til-qn').forEach(gq=>gq.onclick = ()=>api.holat({qahramon:gq.dataset.k, bosildi:true}));
  }
  function chizXron(){
    xr.innerHTML = '<span class="til-ust">Tarixiy kontekst va roman taqdiri</span><div class="til-xron-ichi">' + QOD_T.map((v, i)=>'<button class="til-xv' + (i === tar ? ' faol' : '') + '" data-i="' + i + '"><b>' + v.y + '</b><span>' + esc(v.s) + '</span></button>').join('') + '</div>';
    xr.querySelectorAll('.til-xv').forEach(b=>b.onclick = ()=>api.holat({tarix:+b.dataset.i, bosildi:true}));
  }
  api.holat = h=>{
    if(!h) return;
    if(h.qahramon && QOD_Q[h.qahramon]){ q = h.qahramon; chizSxema(); const p = QOD_Q[q]; const al = QOD_A.filter(a=>a[0] === q || a[1] === q).map(a=>'<i>' + QOD_Q[a[0] === q ? a[1] : a[0]].nom + '</i> (' + a[2] + ')'); izoh.innerHTML = '<b style="color:' + p.rang + '">' + p.nom + '.</b> ' + p.kim + (al.length ? ' <b>Aloqalar:</b> ' + al.join(', ') + '.' : ''); if(h.bosildi) karta({ust:'Qahramon', nom:'<span style="color:' + p.rang + '">' + p.nom + '</span>', matn:p.kim, qosh:al.length ? 'Aloqalar: ' + al.join(', ') : ''}); detal('til_qodiriy', q); hodisa('til-qahramon', {nom:q, bosildi:!!h.bosildi}); }
    if(h.hamma){ q = null; chizSxema(); }
    if(h.tarix !== undefined && QOD_T[h.tarix]){ tar = +h.tarix; chizXron(); const v = QOD_T[tar]; izoh.innerHTML = '<b>' + v.y + ' — ' + esc(v.s) + '.</b> ' + v.m; if(h.bosildi) karta({ust:v.y, nom:esc(v.s), matn:v.m}); detal('til_qodiriy', 't' + tar); hodisa('til-qodiriy-tarix', {nom:'t' + tar, yil:v.y, bosildi:!!h.bosildi}); xr.querySelector('.til-xv.faol') && xr.querySelector('.til-xv.faol').scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'}); }
    if(h.rejim === 'tarix') xr.scrollIntoView({block:'start', behavior:'smooth'}); if(h.rejim === 'sxema') sx.scrollIntoView({block:'start', behavior:'smooth'});
  };
  api.boshla = ()=>{ q = null; tar = -1; chizSxema(); chizXron(); };
  tugmalar(tag, [
    {m:'Hammasi', f:()=>api.holat({hamma:true})}, {m:'Otabek', f:()=>api.holat({qahramon:'otabek', bosildi:true})}, {m:'Kumush', f:()=>api.holat({qahramon:'kumush', bosildi:true})}, {m:'Homid', f:()=>api.holat({qahramon:'homid', bosildi:true})}, '|',
    {m:'Sxema', f:()=>api.holat({rejim:'sxema'})}, {m:'Tarix', f:()=>api.holat({rejim:'tarix'})}
  ]);
  api.boshla();
  izoh.innerHTML = 'Qahramonni <b>bosing</b> — uning aloqalari ajralib chiqadi. Pastda tarixiy kontekst (1847 → 1865 → 1926).';
  return api;
};

/* ---------- yopuvchi ---------- */
})();
