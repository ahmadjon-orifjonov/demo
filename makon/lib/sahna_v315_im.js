/* MAKON v3.15 — guruh «im»: INFORMATIKA (6) va MUSIQA (6) sahnalari.
   Reyestr: window.MAKON_SAHNA['im_…'] = async (sahna, {tag, izoh, yorliq, o, d}) => api (M3sahna — window._sahnalar ga o‘zi yozadi).
   lib/makon3d_v312.js dan KEYIN ulanadi. Hamma model protsedurali (three.js r128), internetdan hech narsa yuklanmaydi.
   Tovush: faqat foydalanuvchi bosganda WebAudio sintezi; hech narsa o‘zi chalinmaydi, yozuvlar ishlatilmaydi. */
(function(){
'use strict';
const R = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d || {})}));
const detal = (turD, nom)=>hodisa('detal', {turD, nom});
const son = (v, k)=>{ k = k === undefined ? 2 : k; const p = Math.pow(10, k); let r = Math.round(v * p) / p; if(Object.is(r, -0)) r = 0; return String(r).replace('.', ',').replace('-', '−'); };
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]));
const el = (teg, cls, html)=>{ const e = document.createElement(teg); if(cls) e.className = cls; if(html !== undefined) e.innerHTML = html; return e; };

/* ---------- umumiy tovush (faqat bosishda yaratiladi) ---------- */
let AC = null;
function audio(){
  try{
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if(AC.state === 'suspended') AC.resume();
  }catch(e){ AC = null; }
  return AC;
}
/* har sahna o‘z manbalarini yig‘adi — yopilganda to‘xtatiladi */
function ovozchi(){
  const faol = new Set();
  const qosh = (nod, oxir)=>{ faol.add(nod); nod.onended = ()=>faol.delete(nod); if(oxir !== undefined) try{ nod.stop(oxir); }catch(e){} return nod; };
  const O = {
    faol,
    /* garmonik ton: garm — garmonikalar amplitudasi [1, .5, ...] */
    ton(f, dur, p){
      const a = audio(); if(!a) return null;
      p = p || {};
      const t0 = a.currentTime + (p.kech || 0), vol = p.vol === undefined ? .22 : p.vol;
      const g = a.createGain(); g.gain.setValueAtTime(.0001, t0);
      const hujum = p.hujum || .012;
      g.gain.exponentialRampToValueAtTime(vol, t0 + hujum);
      if(p.ushlab) g.gain.setValueAtTime(vol, t0 + dur - (p.sonish || .08));
      g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
      let chiq = g;
      if(p.filtr){ const fl = a.createBiquadFilter(); fl.type = p.filtr.tur || 'lowpass'; fl.frequency.value = p.filtr.f; fl.Q.value = p.filtr.q || .7; g.connect(fl); chiq = fl; }
      chiq.connect(p.manzil || a.destination);
      const o = a.createOscillator();
      if(p.garm){ const re = new Float32Array(p.garm.length + 1), im = new Float32Array(p.garm.length + 1); p.garm.forEach((v, i)=>{ im[i + 1] = v; }); o.setPeriodicWave(a.createPeriodicWave(re, im)); }
      else o.type = p.tip || 'sine';
      o.frequency.setValueAtTime(f, t0);
      if(p.vibrato){ const lfo = a.createOscillator(), lg = a.createGain(); lfo.frequency.value = p.vibrato.tez || 5.5; lg.gain.value = f * (p.vibrato.chuq || .006); lfo.connect(lg); lg.connect(o.frequency); lfo.start(t0 + (p.vibrato.kech || .15)); qosh(lfo, t0 + dur + .05); }
      o.connect(g); o.start(t0); qosh(o, t0 + dur + .05);
      return o;
    },
    /* shovqin zarbi (doira, baraban): f — filtr chastotasi */
    zarb(f, dur, p){
      const a = audio(); if(!a) return;
      p = p || {};
      const t0 = a.currentTime + (p.kech || 0), n = Math.max(1, Math.floor(a.sampleRate * dur));
      const b = a.createBuffer(1, n, a.sampleRate), x = b.getChannelData(0);
      for(let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, p.egri || 3);
      const s = a.createBufferSource(); s.buffer = b;
      const fl = a.createBiquadFilter(); fl.type = p.tur || 'bandpass'; fl.frequency.value = f; fl.Q.value = p.q || 1.2;
      const g = a.createGain(); g.gain.value = p.vol === undefined ? .5 : p.vol;
      s.connect(fl); fl.connect(g); g.connect(p.manzil || a.destination); s.start(t0); qosh(s);
      if(p.past){ O.ton(p.past, Math.min(dur * 1.4, .6), {vol:p.pastVol || .35, hujum:.004, kech:p.kech || 0}); }
    },
    /* chertma tor — Karplus–Strong algoritmi (buferga hisoblanadi) */
    chertma(f, dur, p){
      const a = audio(); if(!a) return;
      p = p || {};
      const sr = a.sampleRate, n = Math.floor(sr * dur), N = Math.max(2, Math.round(sr / f));
      const b = a.createBuffer(1, n, sr), x = b.getChannelData(0);
      const buf = new Float32Array(N); for(let i = 0; i < N; i++) buf[i] = Math.random() * 2 - 1;
      const yut = p.yut === undefined ? .996 : p.yut, yorq = p.yorqin === undefined ? .5 : p.yorqin;
      let j = 0;
      for(let i = 0; i < n; i++){
        const k = (j + 1) % N;
        const v = buf[j];
        buf[j] = yut * (yorq * buf[j] + (1 - yorq) * buf[k]);
        x[i] = v; j = k;
      }
      const s = a.createBufferSource(); s.buffer = b;
      const g = a.createGain(); g.gain.value = p.vol === undefined ? .35 : p.vol;
      let chiq = g;
      if(p.filtr){ const fl = a.createBiquadFilter(); fl.type = p.filtr.tur || 'lowpass'; fl.frequency.value = p.filtr.f; fl.Q.value = p.filtr.q || .7; g.connect(fl); chiq = fl; }
      s.connect(g); chiq.connect(p.manzil || a.destination); s.start(a.currentTime + (p.kech || 0)); qosh(s);
    },
    toxtat(){ faol.forEach(n=>{ try{ n.stop(); }catch(e){} }); faol.clear(); }
  };
  return O;
}
const NOTA = ['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'];
const midiF = m=>440 * Math.pow(2, (m - 69) / 12);
const notaMidi = s=>{ const m = /^([A-Za-z]+#?)(\d)$/.exec(s); if(!m) return null; const i = NOTA.indexOf(m[1]); return i < 0 ? null : 12 * (+m[2] + 1) + i; };
const midiNota = m=>NOTA[m % 12] + (Math.floor(m / 12) - 1);

/* ---------- umumiy 3D asos ---------- */
let soyaTex = null;
function asos(sahna, o){
  o = o || {};
  const S = MAKON3D.sahna(sahna, Object.assign({avto:false, fov:32, env:.6, ekspozitsiya:1.08}, o));
  const T = S.T, g = S.g;
  /* yorug‘lik: issiq asosiy + sovuq to‘ldiruvchi + orqa nur */
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x141020, .22));
  const asosiy = new T.DirectionalLight(0xffe1bf, .9); asosiy.position.set(4, 6, 7); S.sc.add(asosiy);
  const toldir = new T.DirectionalLight(0x8fb0ff, .42); toldir.position.set(-6, 3, 3); S.sc.add(toldir);
  const orqa = new T.DirectionalLight(0xb7a2ff, .75); orqa.position.set(-1, 5, -7); S.sc.add(orqa);
  const rang = h=>new T.Color(h).convertSRGBToLinear();
  const mat = (h, p)=>{ const m = new T.MeshStandardMaterial(Object.assign({color:rang(h), roughness:.5, metalness:0}, p || {})); m.userData.env = 1; m.envMapIntensity = p && p.env !== undefined ? p.env : .32; return m; };
  const fiz = (h, p)=>{ const m = new T.MeshPhysicalMaterial(Object.assign({color:rang(h), roughness:.35, metalness:0, clearcoat:.6, clearcoatRoughness:.2}, p || {})); m.userData.env = 1; m.envMapIntensity = p && p.env !== undefined ? p.env : .42; return m; };
  const quti = (w, h, d, m, r)=>new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, h, d, 3, r !== undefined ? r : Math.min(w, h, d) * .12) : new T.BoxGeometry(w, h, d), m);
  const silindr = (r1, r2, h, m, s)=>new T.Mesh(new T.CylinderGeometry(r1, r2, h, s || 32), m);
  /* obyekt ostidagi yumshoq soya (radial gradient) */
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
    m.rotation.x = -Math.PI / 2; m.position.set(x || 0, (y || 0) + .004, z || 0); m.renderOrder = 1; g.add(m); return m;
  }
  /* to‘q premium podium: silliq disk + nurli gardish */
  function podium(r, y, rangH){
    const p = new T.Group();
    const disk = silindr(r, r * 1.02, .18, fiz('#161b2e', {roughness:.32, metalness:.25, clearcoat:.8}), 96); disk.position.y = -.09; p.add(disk);
    const ust = new T.Mesh(new T.CircleGeometry(r * .985, 96), mat('#151a2c', {roughness:.92, metalness:0, env:.08})); ust.rotation.x = -Math.PI / 2; ust.position.y = .002; p.add(ust);
    const halqa = new T.Mesh(new T.TorusGeometry(r * 1.005, .018, 8, 128), new T.MeshBasicMaterial({color:rang(rangH || '#8f7bff'), toneMapped:false, transparent:true, opacity:.75}));
    halqa.rotation.x = Math.PI / 2; halqa.position.y = -.01; p.add(halqa);
    for(let i = 1; i <= 3; i++){ const h2 = new T.Mesh(new T.RingGeometry(r * i / 4 - .004, r * i / 4 + .004, 128), new T.MeshBasicMaterial({color:0x8f9bd6, transparent:true, opacity:.07})); h2.rotation.x = -Math.PI / 2; h2.position.y = .004; p.add(h2); }
    p.position.y = y || 0; g.add(p); return p;
  }
  /* matnli sprite (doim kameraga qaraydi) */
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
  /* yassi matn tekstura (plane ustiga) */
  function matnTex(w, h, chiz){
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4;
    t.chiz = ()=>{ x.clearRect(0, 0, w, h); chiz(x, w, h); t.needsUpdate = true; }; t.chiz(); t.x = x; return t;
  }
  /* bosiladigan qism: barcha meshlarga nom; materiallar klonlanadi (yoritish uchun) */
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
      if(kuch > 0){ mm.emissive.copy(rang(rangH || '#6d52ff')); mm.emissiveIntensity = kuch; } else { mm.emissive.copy(mm.userData.aslE); mm.emissiveIntensity = mm.userData.aslEI; } }));
  }
  function belgila(nomlar, rangH, kuch){
    tanlangan.forEach(n=>yorit(n, 0)); tanlangan.clear();
    (nomlar || []).forEach(n=>{ tanlangan.add(n); yorit(n, kuch || .55, rangH || '#ffb347'); });
    if(ustidaNom && !tanlangan.has(ustidaNom)) yorit(ustidaNom, .35);
  }
  S.ustida = ud=>{
    const n = ud ? ud.nom : null; if(n === ustidaNom) return;
    if(ustidaNom && !tanlangan.has(ustidaNom)) yorit(ustidaNom, 0);
    ustidaNom = n;
    if(n && !tanlangan.has(n)) yorit(n, .35);
  };
  /* sahna ichidagi DOM qatlam (test oynasida yashiriladi) */
  const testda = !!(sahna.closest && sahna.closest('.uq-sahna'));
  function qatlam(cls){ const q = el('div', 'im-q ' + (cls || '')); sahna.append(q); return q; }
  /* yopish: taymerlar, tovush, DOM */
  const taymer = new Set();
  const kut = (f, ms)=>{ const t = setTimeout(()=>{ taymer.delete(t); f(); }, ms); taymer.add(t); return t; };
  const tozalash = [];
  const eskiYop = S.yopish.bind(S);
  S.yopish = ()=>{ taymer.forEach(clearTimeout); taymer.clear(); tozalash.forEach(f=>{ try{ f(); }catch(e){} }); sahna.querySelectorAll('.im-q').forEach(x=>x.remove()); eskiYop(); };
  return {S, T, g, rang, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, yorit, qismlar, testda, qatlam, kut, taymer, tozalash, asosiy, toldir, orqa};
}
/* pastki panel tugmalari */
function tugmalar(tag, royxat){
  tag.innerHTML = '';
  const b = {};
  royxat.forEach(r=>{
    if(r === '|'){ tag.append(el('span', 'tag-ajr')); return; }
    const t = el('button', r.cls || '', r.m); if(r.t) t.title = r.t; t.onclick = ()=>r.f(t); tag.append(t); if(r.k) b[r.k] = t;
  });
  return b;
}
const faolQil = (tag, sel, b)=>tag.querySelectorAll(sel).forEach(x=>x.classList.toggle('faol', x === b));

/* ================= 1. KOMPYUTER QURILMALARI (im_kompyuter) ================= */
const PC_QISM = {
  korpus:['Tizim bloki (korpus)','ichki',null,'Barcha ichki qurilmalarni saqlaydi, havo oqimini yo‘naltiradi.'],
  ona_plata:['Ona plata','ichki',null,'Hamma qurilmalar ulanadigan asosiy plata: protsessor, xotira va kartalar shu yerda bog‘lanadi.'],
  protsessor:['Protsessor (CPU)','ichki',null,'Kompyuterning «miyasi»: buyruqlarni bajaradi va hisoblaydi.'],
  sovutgich:['Sovutgich (radiator va ventilyator)','ichki',null,'Protsessor issiqligini radiator qovurg‘alari va ventilyator orqali havoga chiqaradi. Bu yerda u ajratib ko‘rsatilgan.'],
  ozu:['Tezkor xotira (OZU, RAM)','ichki','tezkor','Ishlayotgan dastur va ma’lumotlarni vaqtincha saqlaydi; tok o‘chsa — tozalanadi.'],
  ssd:['SSD (M.2) — qattiq holatli disk','ichki','doimiy','Fayllarni doimiy saqlaydi; harakatlanuvchi qismi yo‘q, HDD dan ancha tez.'],
  hdd:['HDD — qattiq magnit disk','ichki','doimiy','Fayllarni aylanuvchi magnit disklarda doimiy saqlaydi; arzonroq, lekin sekinroq.'],
  videokarta:['Videokarta (GPU)','ichki',null,'Tasvirni hisoblaydi va monitorga yuboradi; 3D grafika uchun alohida protsessorga ega.'],
  quvvat:['Quvvat bloki (PSU)','ichki',null,'Tarmoqdagi o‘zgaruvchan tokni qurilmalar uchun past kuchlanishli o‘zgarmas tokka aylantiradi.'],
  monitor:['Monitor','chiqish',null,'Chiqarish qurilmasi: tasvir va matnni ekranda ko‘rsatadi.'],
  klaviatura:['Klaviatura','kirish',null,'Kiritish qurilmasi: harf, raqam va buyruqlarni kiritadi.'],
  sichqoncha:['Sichqoncha','kirish',null,'Kiritish qurilmasi: ko‘rsatkichni boshqaradi, bosish va aylantirish.'],
  karnay:['Karnaylar (kolonkalar)','chiqish',null,'Chiqarish qurilmasi: tovushni eshittiradi.'],
  mikrofon:['Mikrofon','kirish',null,'Kiritish qurilmasi: ovozni elektr signaliga aylantirib kompyuterga kiritadi.'],
  printer:['Printer','chiqish',null,'Chiqarish qurilmasi: matn va rasmni qog‘ozga chop etadi.']
};
R.im_kompyuter = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · kompyuter qurilmalari · sxematik model');
  const A = asos(sahna, {rx:.34, ry:-.22, rxMin:-.1, rxMax:1.1, zoom:1.02});
  const {S, T, g, mat, fiz, quti, silindr, soya, yozuv, matnTex, bosiladigan, belgila} = A;
  const aylanuvchi = [];
  /* ---- stol ---- */
  const stolX = -.5, stolW = 18.4, stolD = 5.6, stolZ = .5;
  const yTex = (()=>{ const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = '#2a1d16'; x.fillRect(0, 0, 1024, 256);
    for(let i = 0; i < 90; i++){ x.strokeStyle = 'rgba(' + (i % 3 ? '120,82,56' : '20,12,8') + ',' + (.08 + Math.random() * .18) + ')'; x.lineWidth = .6 + Math.random() * 2; x.beginPath(); let y = Math.random() * 256; x.moveTo(0, y); for(let k = 0; k <= 1024; k += 24){ y += (Math.random() - .5) * 3; x.lineTo(k, y + Math.sin(k / 90 + i) * 3); } x.stroke(); }
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; })();
  const stolM = new T.MeshStandardMaterial({map:yTex, color:new T.Color('#8a7a70').convertSRGBToLinear(), roughness:.78, metalness:0}); stolM.userData.env = 1; stolM.envMapIntensity = .08;
  const stol = quti(stolW, .26, stolD, stolM, .06); stol.position.set(stolX, -.13, stolZ); g.add(stol);
  const oyoqM = mat('#1a1d26', {metalness:.7, roughness:.35});
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b])=>{ const o2 = quti(.22, 2.2, .22, oyoqM, .04); o2.position.set(stolX + a * (stolW / 2 - .4), -1.36, stolZ + b * (stolD / 2 - .4)); g.add(o2); });
  soya(stolW * 1.15, stolD * 1.5, stolX, stolZ, -2.47, .8);

  /* ---- ventilyator ---- */
  function ventilyator(r, rang1){
    const q = new T.Group();
    const ramka = new T.Mesh(new T.TorusGeometry(r, r * .12, 8, 40), mat('#15171d', {roughness:.6}));
    const kv = quti(r * 2.25, r * 2.25, r * .28, mat('#101217', {roughness:.7}), r * .18); kv.position.z = -r * .16;
    const rotor = new T.Group();
    const hub = silindr(r * .3, r * .3, r * .22, mat('#20232b', {roughness:.4}), 24); hub.rotation.x = Math.PI / 2; rotor.add(hub);
    const pM = mat(rang1 || '#2b2f3a', {roughness:.45, transparent:true, opacity:.92});
    for(let i = 0; i < 7; i++){ const p = quti(r * .78, r * .3, r * .03, pM, r * .02); p.position.x = r * .52; const a = new T.Group(); a.add(p); p.rotation.x = .45; a.rotation.z = i / 7 * Math.PI * 2; rotor.add(a); }
    q.add(kv, ramka, rotor); aylanuvchi.push([rotor, 'z', 9]); return q;
  }

  /* ---- TIZIM BLOKI (1 birlik ≈ 10 sm) ---- */
  const korpusG = new T.Group(); korpusG.position.set(5.75, 2.3, .1); g.add(korpusG);
  const KW = 4.6, KH = 4.6, KD = 2.1;
  const korpM = fiz('#15171e', {roughness:.4, metalness:.3, clearcoat:.5, env:.22});
  const orqaD = quti(KW, KH, .06, mat('#14161c', {metalness:.5, roughness:.5})); orqaD.position.z = -KD / 2;
  const tepa = quti(KW, .08, KD, korpM); tepa.position.y = KH / 2;
  const past = quti(KW, .08, KD, korpM); past.position.y = -KH / 2;
  const old = quti(.12, KH, KD, korpM); old.position.x = KW / 2;
  const orqaP = quti(.08, KH, KD, korpM); orqaP.position.x = -KW / 2;
  const korpusQ = new T.Group(); korpusQ.add(orqaD, tepa, past, old, orqaP);
  /* old panel RGB tasma */
  const rgb = quti(.03, KH * .8, .05, new T.MeshBasicMaterial({color:0x7a5cff, toneMapped:false})); rgb.position.set(KW / 2 + .07, 0, KD / 2 - .25); korpusQ.add(rgb);
  const tugma = silindr(.09, .09, .04, mat('#c9ced8', {metalness:.9, roughness:.2}), 24); tugma.rotation.z = Math.PI / 2; tugma.position.set(KW / 2 + .07, KH / 2 - .35, 0); korpusQ.add(tugma);
  /* shisha yon panel (shaffof) */
  const shisha = new T.Mesh(new T.BoxGeometry(KW - .1, KH - .1, .04), new T.MeshPhysicalMaterial({color:0x9fb6ff, transparent:true, opacity:.1, roughness:.05, metalness:0, depthWrite:false}));
  shisha.position.z = KD / 2; shisha.userData.env = 1; korpusQ.add(shisha);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b])=>{ const o2 = silindr(.12, .14, .08, mat('#0c0d10'), 16); o2.position.set(a * (KW / 2 - .35), -KH / 2 - .06, b * (KD / 2 - .3)); korpusQ.add(o2); });
  korpusG.add(korpusQ); bosiladigan(korpusQ, 'korpus');
  const fOld1 = ventilyator(.52, '#3b2f7a'); fOld1.rotation.y = -Math.PI / 2; fOld1.position.set(KW / 2 - .2, .9, .05); korpusG.add(fOld1); bosiladigan(fOld1, 'korpus');
  const fOld2 = ventilyator(.52, '#3b2f7a'); fOld2.rotation.y = -Math.PI / 2; fOld2.position.set(KW / 2 - .2, -.35, .05); korpusG.add(fOld2); bosiladigan(fOld2, 'korpus');
  const fOrqa = ventilyator(.46); fOrqa.rotation.y = Math.PI / 2; fOrqa.position.set(-KW / 2 + .2, 1.45, .05); korpusG.add(fOrqa); bosiladigan(fOrqa, 'korpus');
  soya(KW * 1.25, KD * 1.6, 5.75, .1, 0, .9);

  /* ona plata — tekstura: izlar, slotlar */
  const MBW = 2.44, MBH = 3.05, mbX = -.9, mbY = .55, mbZ = -KD / 2 + .08;
  const mbTex = matnTex(512, 640, (x, w, h)=>{
    const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#12241f'); gr.addColorStop(1, '#0b1714'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
    x.strokeStyle = 'rgba(214,176,92,.28)'; x.lineWidth = 1.2;
    for(let i = 0; i < 70; i++){ x.beginPath(); let px = Math.random() * w, py = Math.random() * h; x.moveTo(px, py); for(let k = 0; k < 4; k++){ if(k % 2) px += (Math.random() - .5) * 160; else py += (Math.random() - .5) * 160; x.lineTo(px, py); } x.stroke(); }
    x.fillStyle = '#1c2d28'; x.fillRect(200, 60, 150, 150);
    x.fillStyle = 'rgba(255,255,255,.55)'; x.font = '600 20px monospace'; x.fillText('MAKON  MB-2026', 18, h - 22);
    x.fillStyle = '#2b3a35'; for(let i = 0; i < 3; i++) x.fillRect(30, 330 + i * 90, 440, 14);
  });
  const mb = new T.Mesh(new T.BoxGeometry(MBW, MBH, .05), [mat('#0e1a17'), mat('#0e1a17'), mat('#0e1a17'), mat('#0e1a17'), new T.MeshStandardMaterial({map:mbTex, roughness:.6, metalness:.2}), mat('#0e1a17')]);
  mb.material[4].userData.env = 1; mb.position.set(mbX, mbY, mbZ); korpusG.add(mb); bosiladigan(mb, 'ona_plata');
  const mbDetal = new T.Group(); korpusG.add(mbDetal);
  /* VRM radiatorlari, I/O qopqog‘i, kondensatorlar, chipset, 24-pin */
  const radM = mat('#3a3f4b', {metalness:.8, roughness:.3});
  const vrm1 = quti(.9, .22, .22, radM, .03); vrm1.position.set(mbX - .15, mbY + 1.28, mbZ + .14); mbDetal.add(vrm1);
  const vrm2 = quti(.22, .9, .22, radM, .03); vrm2.position.set(mbX - 1.02, mbY + .7, mbZ + .14); mbDetal.add(vrm2);
  const io = quti(.35, .95, .5, mat('#252a33', {metalness:.6, roughness:.35}), .04); io.position.set(mbX - 1.0, mbY + 1.25, mbZ + .27); mbDetal.add(io);
  const kM = mat('#1b1c22', {metalness:.6, roughness:.3}), kT = mat('#b9bec8', {metalness:.9, roughness:.25});
  for(let i = 0; i < 8; i++){ const k1 = silindr(.045, .045, .14, kM, 12); k1.rotation.x = Math.PI / 2; k1.position.set(mbX - .55 + (i % 4) * .13, mbY + 1.05 - Math.floor(i / 4) * .13, mbZ + .1); mbDetal.add(k1); const k2 = silindr(.046, .046, .01, kT, 12); k2.rotation.x = Math.PI / 2; k2.position.set(k1.position.x, k1.position.y, mbZ + .175); mbDetal.add(k2); }
  const chip = quti(.42, .42, .12, radM, .03); chip.position.set(mbX + .35, mbY - .95, mbZ + .08); mbDetal.add(chip);
  const pin24 = quti(.14, .62, .2, mat('#e9e6df', {roughness:.6}), .02); pin24.position.set(mbX + 1.12, mbY + .25, mbZ + .12); mbDetal.add(pin24);
  bosiladigan(mbDetal, 'ona_plata');
  /* protsessor (ochiq) */
  const cpuX = mbX - .35, cpuY = mbY + .62;
  const soket = quti(.62, .62, .06, mat('#2a2d35', {roughness:.5}), .02); soket.position.set(cpuX, cpuY, mbZ + .06); korpusG.add(soket);
  const cpuG = new T.Group(); cpuG.position.set(cpuX, cpuY, mbZ + .11); korpusG.add(cpuG);
  const cpuAsos = quti(.5, .5, .04, mat('#1d6b3f', {roughness:.5}), .01); cpuG.add(cpuAsos);
  const ihsTex = matnTex(256, 256, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#d8dbe2'); gr.addColorStop(.5, '#aeb3bd'); gr.addColorStop(1, '#d0d4dc'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = '#3a3f4b'; x.font = '700 44px Inter, sans-serif'; x.textAlign = 'center'; x.fillText('CPU', w / 2, h / 2 - 6); x.font = '500 20px monospace'; x.fillText('MAKON · 8 yadro', w / 2, h / 2 + 34); });
  const ihs = new T.Mesh(new T.BoxGeometry(.4, .4, .05), [kT, kT, kT, kT, new T.MeshStandardMaterial({map:ihsTex, metalness:.85, roughness:.3}), kT]); ihs.position.z = .04; ihs.material[4].userData.env = 1; cpuG.add(ihs);
  bosiladigan(cpuG, 'protsessor'); bosiladigan(soket, 'protsessor');
  /* sovutgich — ajratilgan (ko‘tarilgan) holda */
  const sovG = new T.Group(); sovG.position.set(cpuX, cpuY, mbZ + 1.05); korpusG.add(sovG);
  const qovM = mat('#c9ced6', {metalness:.9, roughness:.28});
  for(let i = 0; i < 16; i++){ const q2 = quti(1.0, .9, .018, qovM, .004); q2.position.z = -.28 + i * .036; sovG.add(q2); }
  const mis = mat('#c07a45', {metalness:.9, roughness:.3});
  for(let i = 0; i < 3; i++){ const tr = silindr(.035, .035, 1.0, mis, 12); tr.rotation.x = Math.PI / 2; tr.position.set(-.25 + i * .25, -.3, -.2); sovG.add(tr); }
  const sovTag = quti(.46, .46, .08, mis, .02); sovTag.position.z = -.62; sovG.add(sovTag);
  const sovFan = ventilyator(.45, '#2b2f3a'); sovFan.position.z = .38; sovG.add(sovFan);
  bosiladigan(sovG, 'sovutgich');
  /* OZU — 2 plank */
  const ozuG = new T.Group(); korpusG.add(ozuG);
  for(let i = 0; i < 2; i++){
    const slot = quti(.07, 1.4, .08, mat('#1a1a1f'), .01); slot.position.set(mbX + .45 + i * .16, cpuY - .05, mbZ + .06); ozuG.add(slot);
    const pl = quti(.035, 1.33, .34, mat('#1e5a36', {roughness:.5}), .01); pl.position.set(mbX + .45 + i * .16, cpuY - .05, mbZ + .24); ozuG.add(pl);
    const ish = quti(.05, 1.3, .3, mat('#2c2f3a', {metalness:.7, roughness:.3}), .02); ish.position.set(mbX + .45 + i * .16, cpuY - .05, mbZ + .26); ozuG.add(ish);
    const nur = quti(.052, 1.2, .04, new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false})); nur.position.set(mbX + .45 + i * .16, cpuY - .05, mbZ + .43); ozuG.add(nur);
  }
  bosiladigan(ozuG, 'ozu');
  /* SSD M.2 */
  const ssdG = new T.Group(); ssdG.position.set(mbX - .1, mbY - .12, mbZ + .06); korpusG.add(ssdG);
  const ssdTex = matnTex(256, 64, (x, w, h)=>{ x.fillStyle = '#10141d'; x.fillRect(0, 0, w, h); x.fillStyle = '#f5c542'; x.fillRect(0, 0, 10, h); x.fillStyle = '#e8ebf3'; x.font = '700 24px Inter, sans-serif'; x.fillText('NVMe SSD', 22, 30); x.font = '500 16px monospace'; x.fillStyle = '#9aa3c7'; x.fillText('M.2 2280', 22, 52); });
  const ssd = new T.Mesh(new T.BoxGeometry(.8, .22, .03), [mat('#10141d'), mat('#10141d'), mat('#10141d'), mat('#10141d'), new T.MeshStandardMaterial({map:ssdTex, roughness:.5}), mat('#10141d')]); ssd.material[4].userData.env = 1; ssdG.add(ssd);
  bosiladigan(ssdG, 'ssd');
  /* videokarta */
  const gpuG = new T.Group(); gpuG.position.set(mbX + .05, mbY - .55, mbZ + .62); korpusG.add(gpuG);
  const gpuT = quti(2.7, .42, 1.0, fiz('#2a2e38', {metalness:.6, roughness:.3, clearcoat:.8}), .06); gpuG.add(gpuT);
  const gpuNur = quti(2.2, .05, .03, new T.MeshBasicMaterial({color:0xff5b8a, toneMapped:false})); gpuNur.position.set(0, .12, .51); gpuG.add(gpuNur);
  const gpuYoz = matnTex(512, 64, (x, w, h)=>{ x.fillStyle = '#2a2e38'; x.fillRect(0, 0, w, h); x.fillStyle = '#eef1fb'; x.font = '800 34px Inter, sans-serif'; x.fillText('GPU · 8 GB', 16, 44); });
  const gpuP = new T.Mesh(new T.PlaneGeometry(1.4, .17), new T.MeshBasicMaterial({map:gpuYoz, toneMapped:false})); gpuP.position.set(-.4, -.06, .505); gpuG.add(gpuP);
  [-.7, .6].forEach(x=>{ const f = ventilyator(.4); f.rotation.x = Math.PI / 2; f.position.set(x, -.24, 0); gpuG.add(f); });
  const brek = quti(.05, .5, 1.1, mat('#b9bec8', {metalness:.9, roughness:.25}), .01); brek.position.set(-1.38, -.02, -.05); gpuG.add(brek);
  bosiladigan(gpuG, 'videokarta');
  /* quvvat bloki */
  const psuG = new T.Group(); psuG.position.set(-KW / 2 + .95, -KH / 2 + .52, 0); korpusG.add(psuG);
  const psu = quti(1.5, .86, 1.4, mat('#17191f', {metalness:.55, roughness:.4}), .05); psuG.add(psu);
  const psuYoz = matnTex(256, 128, (x, w, h)=>{ x.fillStyle = '#17191f'; x.fillRect(0, 0, w, h); x.fillStyle = '#f5c542'; x.font = '800 40px Inter, sans-serif'; x.fillText('PSU', 18, 56); x.fillStyle = '#b4bcd8'; x.font = '600 22px monospace'; x.fillText('550 W (namuna)', 18, 96); });
  const psuP = new T.Mesh(new T.PlaneGeometry(.9, .45), new T.MeshBasicMaterial({map:psuYoz, toneMapped:false})); psuP.position.set(0, 0, .705); psuG.add(psuP);
  bosiladigan(psuG, 'quvvat');
  /* kabellar */
  const kabelM = mat('#20232b', {roughness:.7});
  const kabel = (nuqtalar, r)=>{ const e = new T.CatmullRomCurve3(nuqtalar.map(p=>new T.Vector3(p[0], p[1], p[2]))); const m = new T.Mesh(new T.TubeGeometry(e, 40, r || .06, 8, false), kabelM); korpusG.add(m); return m; };
  bosiladigan(kabel([[-KW / 2 + 1.4, -KH / 2 + .9, .3], [mbX + 1.5, -1.2, .5], [mbX + 1.5, mbY - .2, .2], [mbX + 1.2, mbY + .25, mbZ + .2]], .08), 'quvvat');
  bosiladigan(kabel([[-KW / 2 + 1.1, -KH / 2 + .9, .5], [mbX + .9, -1.3, .9], [mbX + .9, mbY - .4, .7]], .05), 'quvvat');
  /* HDD — old pastki javonda, ustki qopqog‘i ochiq (plastinka ko‘rinadi) */
  const hddG = new T.Group(); hddG.position.set(KW / 2 - 1.0, -KH / 2 + .35, .1); korpusG.add(hddG);
  const hdd = quti(1.47, .26, 1.02, mat('#8a909b', {metalness:.85, roughness:.35}), .03); hddG.add(hdd);
  const plast = silindr(.42, .42, .02, mat('#e4e8ef', {metalness:1, roughness:.12}), 48); plast.position.set(-.18, .14, 0); hddG.add(plast); aylanuvchi.push([plast, 'y', 6]);
  const shpin = silindr(.08, .08, .04, mat('#50555f', {metalness:.9, roughness:.3}), 16); shpin.position.set(-.18, .16, 0); hddG.add(shpin);
  const qol = quti(.6, .025, .06, mat('#c9ced8', {metalness:.9, roughness:.2}), .01); qol.position.set(.28, .165, .2); qol.rotation.y = .5; hddG.add(qol);
  bosiladigan(hddG, 'hdd');

  /* ---- MONITOR ---- */
  const monG = new T.Group(); monG.position.set(-1.2, 0, -.9); g.add(monG);
  const oyoq = quti(1.9, .07, 1.1, fiz('#22252e', {metalness:.7, roughness:.3}), .03); oyoq.position.y = .035; monG.add(oyoq);
  const bo = quti(.26, 1.7, .16, fiz('#22252e', {metalness:.7, roughness:.3}), .05); bo.position.set(0, .9, -.18); monG.add(bo);
  const ramka = quti(6.1, 3.55, .14, fiz('#0e1015', {roughness:.3, clearcoat:.9}), .05); ramka.position.set(0, 2.45, 0); monG.add(ramka);
  const ekranTex = matnTex(1024, 600, (x, w, h)=>{
    const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#1b1f4a'); gr.addColorStop(.5, '#3b2a7a'); gr.addColorStop(1, '#0d6f73'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
    x.fillStyle = 'rgba(255,255,255,.07)'; for(let i = 0; i < 9; i++){ x.beginPath(); x.arc(760 + Math.sin(i) * 90, 160 + i * 30, 120 - i * 8, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = 'rgba(12,16,34,.85)'; x.fillRect(90, 90, 520, 330); x.fillStyle = '#6d52ff'; x.fillRect(90, 90, 520, 34);
    x.fillStyle = '#fff'; x.font = '700 22px Inter, sans-serif'; x.fillText('MAKON — 3D o‘quv makoni', 106, 114);
    x.fillStyle = '#b4bcd8'; x.font = '500 20px monospace'; ['> Protsessor: 8 yadro', '> OZU: 16 GB', '> SSD: 512 GB', '> Holat: ishlamoqda'].forEach((s, i)=>x.fillText(s, 110, 170 + i * 42));
    x.fillStyle = 'rgba(8,10,22,.8)'; x.fillRect(0, h - 44, w, 44); ['#6d52ff', '#36d6a0', '#ffb347', '#e8508f'].forEach((c, i)=>{ x.fillStyle = c; x.fillRect(22 + i * 54, h - 34, 36, 24); });
  });
  const ekran = new T.Mesh(new T.PlaneGeometry(5.86, 3.3), new T.MeshBasicMaterial({map:ekranTex, toneMapped:false})); ekran.position.set(0, 2.45, .075); monG.add(ekran);
  bosiladigan(monG, 'monitor'); soya(3, 1.6, -1.2, -.9, 0, .8);
  /* ---- KLAVIATURA (InstancedMesh tugmalar) ---- */
  const klG = new T.Group(); klG.position.set(-1.2, 0, 1.75); g.add(klG);
  const klA = quti(4.4, .14, 1.45, fiz('#15171d', {metalness:.4, roughness:.35}), .05); klA.position.y = .07; klG.add(klA);
  const tugG = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.24, .1, .24, 2, .03) : new T.BoxGeometry(.24, .1, .24);
  const qatorlar = [15, 14, 13, 12, 9];
  const kalitSon = qatorlar.reduce((a, b)=>a + b, 0);
  const tug = new T.InstancedMesh(tugG, mat('#2a2e38', {roughness:.45}), kalitSon);
  const dm = new T.Object3D(); let ki = 0;
  qatorlar.forEach((n, r)=>{ for(let i = 0; i < n; i++){ const kenglik = 4.1 / n; dm.position.set(-2.05 + kenglik * (i + .5), .18, -.55 + r * .27); dm.scale.set(r === 4 && i === 4 ? 4 : Math.min(1.1, kenglik / .27), 1, 1); if(r === 4 && i > 4) dm.position.x += .5; dm.updateMatrix(); tug.setMatrixAt(ki++, dm.matrix); } });
  tug.instanceMatrix.needsUpdate = true; klG.add(tug);
  bosiladigan(klG, 'klaviatura'); soya(5, 2, -1.2, 1.75, 0, .7);
  /* ---- SICHQONCHA ---- */
  const siG = new T.Group(); siG.position.set(2.1, 0, 1.9); g.add(siG);
  const gilam = quti(1.6, .03, 1.3, mat('#0f1320', {roughness:.9}), .02); gilam.position.y = .015; siG.add(gilam);
  const tana = new T.Mesh(new T.SphereGeometry(.3, 32, 20), fiz('#1c1f28', {roughness:.3, clearcoat:1})); tana.scale.set(.85, .45, 1.35); tana.position.y = .16; siG.add(tana);
  const gil = silindr(.05, .05, .05, mat('#6d52ff', {emissive:new T.Color(0x3a2a99), emissiveIntensity:.6}), 16); gil.rotation.z = Math.PI / 2; gil.position.set(0, .29, -.18); siG.add(gil);
  bosiladigan(siG, 'sichqoncha');
  /* ---- KARNAYLAR ---- */
  function karnay(x){
    const q = new T.Group(); q.position.set(x, 0, -.6); g.add(q);
    const qu = quti(.9, 1.6, .9, fiz('#1a1c22', {roughness:.4, clearcoat:.6}), .08); qu.position.y = .8; q.add(qu);
    [[1.12, .3], [.45, .15]].forEach(([y, r])=>{ const d = silindr(r, r * .8, .06, mat('#0a0b0e', {roughness:.8}), 32); d.rotation.x = Math.PI / 2; d.position.set(0, y, .46); q.add(d); const h2 = new T.Mesh(new T.TorusGeometry(r, .02, 8, 32), mat('#9aa0ab', {metalness:.9, roughness:.25})); h2.position.set(0, y, .48); q.add(h2); });
    soya(1.3, 1.3, x, -.6, 0, .8); bosiladigan(q, 'karnay'); return q;
  }
  karnay(-4.9); karnay(2.65);
  /* ---- MIKROFON ---- */
  const miG = new T.Group(); miG.position.set(-3.9, 0, 1.6); g.add(miG);
  const mA = silindr(.34, .38, .06, mat('#1a1c22', {metalness:.6, roughness:.35}), 32); mA.position.y = .03; miG.add(mA);
  const mB = silindr(.035, .035, .8, mat('#9aa0ab', {metalness:.9, roughness:.25}), 12); mB.position.y = .45; miG.add(mB);
  const mK = silindr(.15, .15, .45, mat('#2a2e38', {metalness:.5, roughness:.5}), 20); mK.position.y = 1.1; miG.add(mK); [1.325, .875].forEach(y=>{ const sh = new T.Mesh(new T.SphereGeometry(.15, 20, 12), mat('#2a2e38', {metalness:.5, roughness:.5})); sh.position.y = y; miG.add(sh); });
  const mT = new T.Mesh(new T.CylinderGeometry(.155, .155, .5, 20, 6, true), new T.MeshStandardMaterial({color:0xc9ced8, metalness:.9, roughness:.3, wireframe:true})); mT.position.y = 1.12; miG.add(mT);
  bosiladigan(miG, 'mikrofon'); soya(.9, .9, -3.9, 1.6, 0, .7);
  /* ---- PRINTER ---- */
  const prG = new T.Group(); prG.position.set(-7.3, 0, .2); g.add(prG);
  const prT = quti(3.4, 1.2, 2.4, fiz('#e7e9ee', {roughness:.35, clearcoat:.4}), .12); prT.position.y = .6; prG.add(prT);
  const prU = quti(3.0, .06, 1.6, mat('#2a2e38'), .02); prU.position.set(0, 1.23, -.1); prG.add(prU);
  const qog = quti(2.1, .02, 1.3, mat('#fbfbf8', {roughness:.9}), .005); qog.position.set(0, .72, 1.45); qog.rotation.x = -.12; prG.add(qog);
  const qogT = new T.Mesh(new T.PlaneGeometry(1.6, .9), new T.MeshBasicMaterial({map:matnTex(256, 144, (x, w, h)=>{ x.fillStyle = '#fbfbf8'; x.fillRect(0, 0, w, h); x.fillStyle = '#3b3f4a'; for(let i = 0; i < 7; i++) x.fillRect(16, 16 + i * 17, 120 + Math.random() * 100, 7); x.fillStyle = '#6d52ff'; x.fillRect(180, 18, 58, 44); })}));
  qogT.rotation.x = -Math.PI / 2 - .12; qogT.position.set(0, .74, 1.45); prG.add(qogT);
  const prP = quti(.6, .12, .05, mat('#36d6a0', {emissive:new T.Color(0x0b6f50), emissiveIntensity:.8}), .02); prP.position.set(1.2, 1.1, 1.21); prG.add(prP);
  bosiladigan(prG, 'printer'); soya(3.9, 3, -7.3, .2, 0, .85);

  /* ---- yozuvlar (sprite) ---- */
  const YOZ = {
    korpus:[5.75, 4.95, .1], ona_plata:[mbX + 5.75 + .6, mbY + 2.3 + 1.2, -.6], protsessor:[cpuX + 5.75 - .55, cpuY + 2.3 + .35, .1], sovutgich:[cpuX + 5.75, cpuY + 2.3 + .75, 1.2],
    ozu:[mbX + 5.75 + .95, cpuY + 2.3 + .75, -.3], ssd:[mbX + 5.75 - .5, mbY + 2.3 - .05, .1], videokarta:[mbX + 5.75 + .2, mbY + 2.3 - .95, 1.3], quvvat:[-KW / 2 + 5.75 + .95, -KH / 2 + 2.3 + 1.15, .9],
    hdd:[KW / 2 + 5.75 - 1.0, -KH / 2 + 2.3 + .75, .8], monitor:[-1.2, 4.55, -.9], klaviatura:[-1.2, .7, 2.3], sichqoncha:[2.1, .75, 2.1], karnay:[-4.9, 2.0, -.6], mikrofon:[-3.9, 1.7, 1.6], printer:[-7.3, 1.85, .2]
  };
  const yozuvlar = {};
  Object.keys(YOZ).forEach(k=>{ const s = yozuv(PC_QISM[k][0].split(' (')[0].split(' —')[0], {bal:.42, shrift:'600 54px Inter, sans-serif', chuqurlik:false}); s.position.set(...YOZ[k]); g.add(s); yozuvlar[k] = s; });
  const ICHKI = ['korpus','ona_plata','protsessor','sovutgich','ozu','ssd','hdd','videokarta','quvvat'];
  let yozKor = true, korinish = 'hammasi';
  const yozYangila = ()=>Object.keys(yozuvlar).forEach(k=>{ const ich = ICHKI.includes(k); yozuvlar[k].visible = yozKor && (korinish === 'hammasi' ? !['ona_plata','ssd','sovutgich','quvvat','hdd'].includes(k) : korinish === 'ichki' ? ich : !ich); });

  /* ---- bosish ---- */
  const ayt = k=>{ const q = PC_QISM[k]; izoh.innerHTML = '<b>' + q[0] + '.</b> ' + q[3] + ' <span style="opacity:.7">(' + (q[1] === 'kirish' ? 'kiritish qurilmasi' : q[1] === 'chiqish' ? 'chiqarish qurilmasi' : 'tizim bloki ichida') + ')</span>'; };
  S.bosish = ud=>{ const k = ud.nom; if(!PC_QISM[k]) return; belgila([k]); ayt(k); detal('im_pc', k); hodisa('im-qism', {nom:k, vazifa:PC_QISM[k][1], xotira:PC_QISM[k][2]}); };
  const GURUH = {kirish:['klaviatura','sichqoncha','mikrofon'], chiqish:['monitor','karnay','printer'], xotira:['ozu','ssd','hdd']};
  const GRANG = {kirish:'#36d6a0', chiqish:'#ff8a5c', xotira:'#5cc8ff'};
  const MARKAZ = {hammasi:[8.6, new T.Vector3(-.4, 1.7, .4)], ichki:[3.5, new T.Vector3(5.75, 2.2, .1)], tashqi:[6.6, new T.Vector3(-2.6, 1.5, .4)]};
  function kor(k){ korinish = k; const [r, m] = MARKAZ[k] || MARKAZ.hammasi; S.fokus(r, m, true); yozYangila(); faolQil(tag, '[data-kor]', tag.querySelector('[data-kor="' + k + '"]')); }
  function guruh(gn){ belgila(GURUH[gn] || [], GRANG[gn]); faolQil(tag, '[data-gr]', tag.querySelector('[data-gr="' + gn + '"]'));
    if(gn) izoh.innerHTML = gn === 'kirish' ? '<b>Kiritish qurilmalari</b> (yashil): klaviatura, sichqoncha, mikrofon — axborotni kompyuterga kiritadi.' : gn === 'chiqish' ? '<b>Chiqarish qurilmalari</b> (to‘q sariq): monitor, karnaylar, printer — natijani insonga ko‘rsatadi yoki eshittiradi.' : '<b>Xotira</b> (ko‘k): OZU — tezkor, vaqtinchalik; SSD va HDD — doimiy (tok o‘chsa ham saqlanadi).'; }
  tag.innerHTML = '';
  [['hammasi','Hammasi'],['ichki','Tizim bloki ichi'],['tashqi','Tashqi qurilmalar']].forEach(([k, m])=>{ const b = el('button', k === 'hammasi' ? 'faol' : '', m); b.dataset.kor = k; b.onclick = ()=>kor(k); tag.append(b); });
  tag.append(el('span', 'tag-ajr'));
  [['kirish','Kiritish'],['chiqish','Chiqarish'],['xotira','Xotira']].forEach(([k, m])=>{ const b = el('button', '', m); b.dataset.gr = k; b.onclick = ()=>{ const faol = b.classList.contains('faol'); guruh(faol ? null : k); if(faol) b.classList.remove('faol'); }; tag.append(b); });
  tag.append(el('span', 'tag-ajr'));
  const yb = el('button', 'faol', 'Yozuvlar'); yb.onclick = ()=>{ yozKor = !yozKor; yb.classList.toggle('faol', yozKor); yozYangila(); }; tag.append(yb);
  yozYangila();
  izoh.innerHTML = 'Qurilmani <b>bosing</b> — nomi va vazifasi chiqadi. Tizim bloki yon qopqog‘i shaffof: ichida ona plata, protsessor, xotira, videokarta va quvvat bloki ko‘rinadi.';
  S.holat = h=>{
    if(!h) return;
    if(h.korinish) kor(h.korinish);
    if(h.guruh !== undefined) guruh(h.guruh);
    if(h.qism !== undefined && (!h.qism || PC_QISM[h.qism])){ belgila(h.qism ? [h.qism] : []); if(h.qism) ayt(h.qism); }
  };
  let vaqt = 0;
  S.kadrda = dt=>{
    vaqt += dt;
    aylanuvchi.forEach(([o2, o, v])=>{ o2.rotation[o] += v * dt; });
    sovG.position.z = mbZ + 1.05 + Math.sin(vaqt * 1.6) * .04;
    const c = rgb.material.color; c.setHSL((vaqt * .06) % 1, .7, .55);
  };
  S.joyla(8.6, new T.Vector3(-.4, 1.7, .4));
  return S;
};

/* ================= 2. AXBOROT O‘LCHOV BIRLIKLARI (im_olchov) ================= */
const BIRLIK = [
  {k:'bit', nom:'bit', rang:'#ffb347', a:'bit', sig:'0 yoki 1'},
  {k:'bayt', nom:'bayt', rang:'#36d6a0', a:'B', sig:'8 bit'},
  {k:'kb', nom:'kilobayt', rang:'#5cc8ff', a:'KB'},
  {k:'mb', nom:'megabayt', rang:'#8f7bff', a:'MB'},
  {k:'gb', nom:'gigabayt', rang:'#e8508f', a:'GB'},
  {k:'tb', nom:'terabayt', rang:'#f5c542', a:'TB'}
];
/* bayt qiymati (bit → 1/8) */
const baytda = (k, tz)=>{ const i = BIRLIK.findIndex(b=>b.k === k); if(i === 0) return 1 / 8; return Math.pow(tz === '1000' ? 1000 : 1024, i - 1); };
const katta = v=>{ if(!isFinite(v)) return '∞'; if(Math.abs(v) >= 1e15 || (Math.abs(v) < 1e-6 && v !== 0)) return v.toExponential(3).replace('.', ',').replace('e+', ' · 10^').replace('e-', ' · 10^−'); const r = Math.round(v * 1e6) / 1e6; const [b, q] = String(r).split('.'); return b.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (q ? ',' + q : ''); };
R.im_olchov = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · axborot o‘lchov birliklari · o‘lchamlar sxematik');
  const A = asos(sahna, {rx:.3, ry:-.28, rxMin:-.2, rxMax:1.1, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, testda, qatlam} = A;
  let tizim = '1024';
  podium(7.4, 0, '#36d6a0');
  /* pog‘ona joylari: x, poydevor balandligi, blok o‘lchami */
  const JOY = [[-4.6, .25, .42], [-2.9, .55, .42], [-.95, .9, 1.2], [1.05, 1.3, 1.45], [3.15, 1.75, 1.7], [5.3, 2.25, 1.95]];
  const bloklar = [], yozuvlar = [], texlar = [];
  BIRLIK.forEach((b, i)=>{
    const [x, ph, s] = JOY[i];
    const q = new T.Group(); q.position.set(x, 0, i % 2 ? .35 : -.2); g.add(q);
    const poy = quti(Math.max(1.1, s * 1.15), ph, Math.max(1.1, s * 1.15), fiz('#1d2336', {roughness:.35, metalness:.3, clearcoat:.7}), .06); poy.position.y = ph / 2; q.add(poy);
    const nur = quti(Math.max(1.1, s * 1.15) + .02, .04, Math.max(1.1, s * 1.15) + .02, new T.MeshBasicMaterial({color:new T.Color(b.rang), toneMapped:false})); nur.position.y = ph - .02; q.add(nur);
    const blok = new T.Group(); blok.position.y = ph; q.add(blok);
    if(i === 0){
      const t = matnTex(128, 128, (x2, w, h)=>{ x2.fillStyle = '#3a2a0c'; x2.fillRect(0, 0, w, h); x2.fillStyle = '#ffd27a'; x2.font = '800 96px "JetBrains Mono", monospace'; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillText('1', w / 2, h / 2 + 4); });
      const m = new T.Mesh(new T.BoxGeometry(s, s, s), new T.MeshStandardMaterial({map:t, emissive:new T.Color('#ffb347'), emissiveIntensity:.25, emissiveMap:t, roughness:.4})); m.position.y = s / 2 + .02; blok.add(m);
    } else if(i === 1){
      const bitlar = '01001101';
      for(let j = 0; j < 8; j++){
        const t = matnTex(128, 128, (x2, w, h)=>{ x2.fillStyle = '#0c3326'; x2.fillRect(0, 0, w, h); x2.fillStyle = bitlar[j] === '1' ? '#7dffc9' : '#2f8f6c'; x2.font = '800 92px "JetBrains Mono", monospace'; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillText(bitlar[j], w / 2, h / 2 + 4); });
        const m = new T.Mesh(new T.BoxGeometry(.2, .2, .2), new T.MeshStandardMaterial({map:t, emissiveMap:t, emissive:new T.Color('#36d6a0'), emissiveIntensity:.3, roughness:.4}));
        m.position.set(-.77 + j * .22, .12, 0); blok.add(m);
      }
      const ch = quti(1.86, .04, .3, mat('#36d6a0', {transparent:true, opacity:.35}), .015); ch.position.y = .01; blok.add(ch);
    } else {
      const tex = matnTex(512, 512, ()=>{}); texlar[i] = tex;
      const top = matnTex(256, 256, (x2, w, h)=>{ x2.fillStyle = '#10152a'; x2.fillRect(0, 0, w, h); x2.strokeStyle = b.rang; x2.globalAlpha = .35; for(let k = 0; k <= 16; k++){ x2.beginPath(); x2.moveTo(k * 16, 0); x2.lineTo(k * 16, h); x2.stroke(); x2.beginPath(); x2.moveTo(0, k * 16); x2.lineTo(w, k * 16); x2.stroke(); } });
      const yon = mat(b.rang, {roughness:.45, metalness:.1, emissive:new T.Color(b.rang), emissiveIntensity:.08});
      const fm = new T.MeshStandardMaterial({map:tex, roughness:.5, emissiveMap:tex, emissive:new T.Color('#ffffff'), emissiveIntensity:.35});
      const tm = new T.MeshStandardMaterial({map:top, roughness:.5});
      const m = new T.Mesh(new T.BoxGeometry(s, s, s), [yon, yon, tm, yon, fm, yon]); m.position.y = s / 2 + .02; blok.add(m);
      const qirra = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(s, s, s)), new T.LineBasicMaterial({color:new T.Color(b.rang), transparent:true, opacity:.9})); qirra.position.copy(m.position); blok.add(qirra);
    }
    bosiladigan(q, b.k);
    soya(Math.max(1.1, s * 1.15) * 1.7, Math.max(1.1, s * 1.15) * 1.7, x, q.position.z, 0, .7);
    const y = yozuv('', {bal:.5, w:640, h:128, shrift:'700 50px Inter, sans-serif', chuqurlik:false}); y.position.set(x, ph + (i < 2 ? .6 : s + .45), q.position.z); g.add(y); yozuvlar[i] = y;
    bloklar.push({q, blok, s, ph});
  });
  /* uchib kiruvchi bitlar (bit → bayt) */
  const uchuvchi = [];
  for(let j = 0; j < 8; j++){ const m = new T.Mesh(new T.BoxGeometry(.16, .16, .16), new T.MeshBasicMaterial({color:new T.Color('#ffcf7a'), transparent:true, opacity:0, toneMapped:false})); g.add(m); uchuvchi.push(m); }
  /* strelkalar pog‘onalar orasida */
  const strM = new T.MeshBasicMaterial({color:0x9aa3c7, transparent:true, opacity:.55});
  const strYoz = [];
  for(let i = 0; i < 5; i++){
    const a = JOY[i], b = JOY[i + 1];
    const e = new T.QuadraticBezierCurve3(new T.Vector3(a[0] + .35, a[1] + (i < 2 ? .5 : a[2] + .2), 1.2), new T.Vector3((a[0] + b[0]) / 2, Math.max(a[1] + a[2], b[1] + b[2]) + .9, 1.5), new T.Vector3(b[0] - .4, b[1] + b[2] * .9, 1.3));
    const m = new T.Mesh(new T.TubeGeometry(e, 24, .018, 6, false), strM); g.add(m);
    const uch = new T.Mesh(new T.ConeGeometry(.07, .18, 12), strM); uch.position.copy(e.getPoint(1)); uch.lookAt(e.getPoint(.9)); uch.rotateX(-Math.PI / 2); g.add(uch);
    const sy = yozuv('', {bal:.34, w:320, h:96, shrift:'700 44px "JetBrains Mono", monospace', rang:'#ffd57f', fon:'rgba(12,16,34,.7)'}); sy.position.copy(e.getPoint(.5)).add(new T.Vector3(0, .28, 0)); g.add(sy); strYoz.push(sy);
  }
  function chizYuz(){
    const n = tizim === '1000' ? 1000 : 1024;
    BIRLIK.forEach((b, i)=>{
      const nomi = i >= 2 ? (tizim === '1000' ? b.a.replace('KB', 'kB') : b.a) : b.a;
      yozuvlar[i].yoz(i === 0 ? '1 bit' : i === 1 ? '1 bayt = 8 bit' : '1 ' + nomi + ' = ' + (tizim === '1000' ? '1000' : '1024') + ' ' + (i === 2 ? 'B' : BIRLIK[i - 1].a.replace('KB', tizim === '1000' ? 'kB' : 'KB')), b.rang);
      if(texlar[i]) texlar[i].chiz = null;
      const tx = texlar[i];
      if(tx){
        const x2 = tx.x, w = 512, h = 512;
        x2.clearRect(0, 0, w, h); x2.fillStyle = '#0d1226'; x2.fillRect(0, 0, w, h);
        const [c, r] = n === 1024 ? [32, 32] : [40, 25];
        x2.strokeStyle = b.rang; x2.globalAlpha = .28; x2.lineWidth = 1;
        for(let k = 0; k <= c; k++){ x2.beginPath(); x2.moveTo(16 + k * 480 / c, 16); x2.lineTo(16 + k * 480 / c, 496); x2.stroke(); }
        for(let k = 0; k <= r; k++){ x2.beginPath(); x2.moveTo(16, 16 + k * 480 / r); x2.lineTo(496, 16 + k * 480 / r); x2.stroke(); }
        x2.globalAlpha = 1; x2.fillStyle = 'rgba(13,18,38,.78)'; x2.fillRect(56, 170, 400, 172);
        x2.fillStyle = b.rang; x2.font = '800 96px Inter, sans-serif'; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillText(nomi, 256, 236);
        x2.fillStyle = '#dfe3f3'; x2.font = '600 34px "JetBrains Mono", monospace'; x2.fillText(c + ' × ' + r + ' = ' + n, 256, 306);
        tx.needsUpdate = true;
      }
    });
    strYoz.forEach((sy, i)=>sy.yoz(i === 0 ? '× 8' : '× ' + n));
  }
  chizYuz();
  /* ---- konvertor paneli (test oynasida yo‘q) ---- */
  let panel = null;
  if(!testda){
    panel = qatlam('im-p');
    const opt = BIRLIK.map(b=>'<option value="' + b.k + '">' + b.a + ' — ' + b.nom + '</option>').join('');
    panel.innerHTML = '<span class="im-ust">Konvertor</span><h4>Birliklarni o‘tkazish</h4>' +
      '<div class="im-qator"><input type="number" min="0" step="any" value="1" aria-label="Qiymat"><select data-dan aria-label="Qaysi birlikdan">' + opt + '</select></div>' +
      '<div class="im-qator"><span style="color:#8d95b8">→</span><select data-ga aria-label="Qaysi birlikka">' + opt + '</select></div>' +
      '<div class="im-qator"><button data-tz="1024" class="faol">1 KB = 1024 B</button><button data-tz="1000">1 kB = 1000 B (SI)</button></div>' +
      '<div class="im-natija"></div><p class="im-iz">Maktab darsliklarida: 1 KB = 1024 bayt (2¹⁰). Xalqaro SI va IEC standartida: 1 kB = 1000 bayt, 1024 bayt esa 1 KiB (kibibayt).</p>';
    const inp = panel.querySelector('input'), dan = panel.querySelector('[data-dan]'), ga = panel.querySelector('[data-ga]'), nat = panel.querySelector('.im-natija');
    dan.value = 'mb'; ga.value = 'bayt';
    const hisob = yub=>{
      const q = Math.max(0, +inp.value || 0), a = dan.value, b = ga.value;
      const r = q * baytda(a, tizim) / baytda(b, tizim);
      const ai = BIRLIK.findIndex(x=>x.k === a), bi = BIRLIK.findIndex(x=>x.k === b);
      const n = tizim === '1000' ? '1000' : '1024';
      const qad = []; if(ai !== bi){ const [p1, p2] = ai < bi ? [ai, bi] : [bi, ai]; for(let i = p1; i < p2; i++) qad.push(i === 0 ? '8' : n); }
      const amal = ai === bi ? '' : (ai > bi ? ' × ' : ' : ') + (qad.length ? qad.join(' × ') : '');
      const nomA = x=>BIRLIK.find(y=>y.k === x).a.replace('KB', tizim === '1000' ? 'kB' : 'KB');
      nat.innerHTML = katta(q) + ' ' + nomA(a) + ' = ' + katta(r) + ' ' + nomA(b) + '<small>' + (amal ? katta(q) + amal + (qad.length > 1 && ai < bi ? '' : '') : 'Bir xil birlik') + (ai < bi && qad.length ? ' — kattaroq birlikka o‘tishda bo‘linadi' : ai > bi ? ' — kichikroq birlikka o‘tishda ko‘paytiriladi' : '') + '</small>';
      if(yub) hodisa('im-hisob', {qiymat:q, dan:a, ga:b, tizim, natija:r});
    };
    inp.oninput = ()=>hisob(true); dan.onchange = ()=>hisob(true); ga.onchange = ()=>hisob(true);
    panel.querySelectorAll('[data-tz]').forEach(b=>b.onclick = ()=>{ tizimQoy(b.dataset.tz, true); });
    panel.hisob = hisob; hisob(false);
  }
  function tizimQoy(tz, yub){
    tizim = tz === '1000' ? '1000' : '1024'; chizYuz();
    if(panel){ panel.querySelectorAll('[data-tz]').forEach(b=>b.classList.toggle('faol', b.dataset.tz === tizim)); panel.hisob(false); }
    tag.querySelectorAll('[data-tz]').forEach(b=>b.classList.toggle('faol', b.dataset.tz === tizim));
    izoh.innerHTML = tizim === '1000' ? '<b>SI (o‘nlik) tizim:</b> 1 kB = 1000 bayt, 1 MB = 1000 kB. Disk ishlab chiqaruvchilari sig‘imni shunday yozadi; 1024 bayt esa IEC bo‘yicha 1 KiB (kibibayt).' : '<b>An’anaviy (ikkilik) tizim:</b> 1 KB = 2¹⁰ = 1024 bayt, 1 MB = 1024 KB. Maktab darsliklari va operativ xotira shunday hisoblanadi.';
    if(yub) hodisa('im-tizim', {tizim});
  }
  const IZ = {bit:'<b>Bit</b> — axborotning eng kichik birligi: 0 yoki 1.', bayt:'<b>Bayt = 8 bit.</b> Sahnadagi bayt 01001101 — bu 77 soni, ASCII jadvalida «M» harfi.', kb:'<b>Kilobayt</b> — ', mb:'<b>Megabayt</b> — ', gb:'<b>Gigabayt</b> — ', tb:'<b>Terabayt</b> — '};
  const tanla = k=>{ belgila([k]); const i = BIRLIK.findIndex(b=>b.k === k); const n = tizim === '1000' ? 1000 : 1024; izoh.innerHTML = i < 2 ? IZ[k] : IZ[k] + '1 ' + BIRLIK[i].a + ' = ' + n + ' ' + (i === 2 ? 'bayt' : BIRLIK[i - 1].a) + ' = ' + katta(Math.pow(n, i - 1)) + ' bayt' + (tizim === '1024' ? ' (2<sup>' + ((i - 1) * 10) + '</sup>)' : ' (10<sup>' + ((i - 1) * 3) + '</sup>)') + '.'; };
  S.bosish = ud=>{ if(!BIRLIK.some(b=>b.k === ud.nom)) return; tanla(ud.nom); detal('im_birlik', ud.nom); hodisa('im-birlik', {nom:ud.nom}); };
  tag.innerHTML = '';
  const b1 = el('button', 'faol', '1 KB = 1024 B'); b1.dataset.tz = '1024'; b1.onclick = ()=>tizimQoy('1024', true); tag.append(b1);
  const b2 = el('button', '', 'SI: 1 kB = 1000 B'); b2.dataset.tz = '1000'; b2.onclick = ()=>tizimQoy('1000', true); tag.append(b2);
  tag.append(el('span', 'tag-ajr'));
  const bu = el('button', '', '8 bit → 1 bayt'); bu.onclick = ()=>{ faza = 0; }; tag.append(bu);
  izoh.innerHTML = 'Pog‘onalarni <b>bosing</b>: har bir birlik oldingisidan necha marta katta ekanini ko‘rasiz. Pastdagi tugma bilan 1024 va 1000 hisobini almashtiring.';
  S.holat = h=>{ if(!h) return; if(h.tizim) tizimQoy(h.tizim, false); if(h.birlik !== undefined){ if(h.birlik) tanla(h.birlik); else belgila([]); } };
  /* animatsiya: 8 bit bitdan baytga uchadi */
  let faza = 0;
  const p0 = new T.Vector3(JOY[0][0], JOY[0][1] + .4, -.2);
  S.kadrda = dt=>{
    faza += dt / 3.2; if(faza > 1.6) faza = 0;
    uchuvchi.forEach((m, j)=>{
      const t = Math.min(1, Math.max(0, (faza - j * .07) / .55));
      const hedef = new T.Vector3(JOY[1][0] - .77 + j * .22, JOY[1][1] + .12, .35);
      m.position.lerpVectors(p0, hedef, t); m.position.y += Math.sin(t * Math.PI) * 1.1;
      m.material.opacity = t > 0 && t < 1 ? .95 : 0; m.rotation.x = t * 6; m.rotation.y = t * 4;
    });
    bloklar[0].blok.children[0].rotation.y += dt * .8;
  };
  S.joyla(testda ? 7.2 : 7.8, new T.Vector3(testda ? .3 : 2.9, 1.5, .2));
  return S;
};

/* ================= 3. ALGORITM VA BLOK-SXEMA (im_algoritm) ================= */
/* robot modeli (bir necha sahnada ishlatiladi) */
function robotYasa(A, rangH){
  const {T, mat, fiz, quti, silindr} = A;
  const r = new T.Group();
  const tana = quti(.62, .5, .56, fiz(rangH || '#e9ecf4', {roughness:.3, clearcoat:.8}), .12); tana.position.y = .42; r.add(tana);
  const panel = quti(.36, .22, .02, mat('#1a1f33', {roughness:.3}), .03); panel.position.set(0, .44, .285); r.add(panel);
  const chir = quti(.08, .04, .01, new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false})); chir.position.set(-.08, .47, .3); r.add(chir);
  const chir2 = quti(.08, .04, .01, new T.MeshBasicMaterial({color:0xffb347, toneMapped:false})); chir2.position.set(.08, .47, .3); r.add(chir2);
  const bosh = quti(.5, .34, .44, fiz(rangH || '#e9ecf4', {roughness:.3, clearcoat:.8}), .12); bosh.position.y = .88; r.add(bosh);
  const yuz = quti(.4, .2, .02, mat('#0d1226', {roughness:.2}), .05); yuz.position.set(0, .89, .225); r.add(yuz);
  const koz = new T.MeshBasicMaterial({color:0x5cc8ff, toneMapped:false});
  [-.09, .09].forEach(x=>{ const k = silindr(.035, .035, .02, koz, 16); k.rotation.x = Math.PI / 2; k.position.set(x, .9, .24); r.add(k); });
  const ant = silindr(.012, .012, .2, mat('#9aa0ab', {metalness:.9, roughness:.3}), 8); ant.position.y = 1.15; r.add(ant);
  const antU = new T.Mesh(new T.SphereGeometry(.04, 12, 8), new T.MeshBasicMaterial({color:0xff5b8a, toneMapped:false})); antU.position.y = 1.26; r.add(antU);
  const gM = mat('#1b1d24', {roughness:.8});
  [[-.33, .17], [.33, .17], [-.33, -.17], [.33, -.17]].forEach(([x, z])=>{ const w = silindr(.13, .13, .08, gM, 20); w.rotation.z = Math.PI / 2; w.position.set(x, .13, z); r.add(w); const h = silindr(.06, .06, .09, mat('#c9ced8', {metalness:.9, roughness:.25}), 12); h.rotation.z = Math.PI / 2; h.position.set(x, .13, z); r.add(h); });
  r.userData.antU = antU; r.userData.koz = koz;
  return r;
}
function gishtTex(A){
  return A.matnTex(256, 256, (x, w, h)=>{ x.fillStyle = '#3a1f18'; x.fillRect(0, 0, w, h); for(let r = 0; r < 8; r++) for(let c = 0; c < 5; c++){ const o = (r % 2) * 26; x.fillStyle = ['#8a3d2b', '#9b4631', '#7a3525', '#a24f36'][(r * 3 + c) % 4]; x.fillRect(c * 52 - o + 3, r * 32 + 3, 46, 26); } });
}
R.im_algoritm = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · algoritm va blok-sxema · robot devorgacha yuradi');
  const A = asos(sahna, {rx:.16, ry:-.2, rxMin:-.3, rxMax:1.0, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, kut} = A;
  podium(7.6, 0, '#36d6a0');
  /* ---- blok-sxema ---- */
  const SH = {oval:'#36d6a0', tortburchak:'#5cc8ff', romb:'#ffb347', parallelogramm:'#a996ff'};
  function shakl(tur, w, h){
    const s = new T.Shape();
    if(tur === 'oval'){ const r = h / 2; s.moveTo(-w / 2 + r, -r); s.lineTo(w / 2 - r, -r); s.absarc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2, false); s.lineTo(-w / 2 + r, r); s.absarc(-w / 2 + r, 0, r, Math.PI / 2, Math.PI * 1.5, false); }
    else if(tur === 'romb'){ s.moveTo(0, h / 2); s.lineTo(w / 2, 0); s.lineTo(0, -h / 2); s.lineTo(-w / 2, 0); s.lineTo(0, h / 2); }
    else if(tur === 'parallelogramm'){ const q = h * .35; s.moveTo(-w / 2 + q, h / 2); s.lineTo(w / 2, h / 2); s.lineTo(w / 2 - q, -h / 2); s.lineTo(-w / 2, -h / 2); s.lineTo(-w / 2 + q, h / 2); }
    else { s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.lineTo(-w / 2, -h / 2); }
    return s;
  }
  const BL = {
    B1:{tur:'oval', x:-3.6, y:5.25, w:2.0, h:.62, m:'Boshlash'},
    B2:{tur:'tortburchak', x:-3.6, y:4.2, w:2.0, h:.62, m:'k := 0'},
    B3:{tur:'romb', x:-3.6, y:2.85, w:2.7, h:1.25, m:'Oldinda devor bormi?'},
    B4:{tur:'tortburchak', x:-3.6, y:1.35, w:2.5, h:.8, m:'1 qadam oldinga|k := k + 1'},
    B5:{tur:'parallelogramm', x:-.75, y:2.85, w:2.0, h:.62, m:'Chiqarish: k'},
    B6:{tur:'oval', x:-.75, y:1.55, w:2.0, h:.62, m:'Tugash'}
  };
  const Z0 = -.6;
  Object.keys(BL).forEach(id=>{
    const b = BL[id];
    const q = new T.Group(); q.position.set(b.x, b.y, Z0); g.add(q);
    const geo = new T.ExtrudeGeometry(shakl(b.tur, b.w, b.h), {depth:.22, bevelEnabled:true, bevelThickness:.04, bevelSize:.035, bevelSegments:3, curveSegments:24});
    geo.translate(0, 0, -.11);
    const m = new T.Mesh(geo, fiz('#151a2e', {roughness:.35, metalness:.2, clearcoat:.8, emissive:new T.Color(SH[b.tur]), emissiveIntensity:.05})); q.add(m);
    const qirra = new T.Mesh(new T.ExtrudeGeometry(shakl(b.tur, b.w + .08, b.h + .08), {depth:.02, bevelEnabled:false, curveSegments:24}), new T.MeshBasicMaterial({color:new T.Color(SH[b.tur]), toneMapped:false})); qirra.position.z = -.14; q.add(qirra);
    const W = 512, H = Math.round(512 * b.h / b.w);
    const t = matnTex(W, H, (x, w, h)=>{ x.fillStyle = '#eef1fb'; x.textAlign = 'center'; x.textBaseline = 'middle'; const qat = b.m.split('|'); const fs = b.tur === 'romb' ? 44 : qat.length > 1 ? 50 : 62; x.font = '700 ' + fs + 'px Inter, sans-serif'; qat.forEach((s, i)=>x.fillText(s, w / 2, h / 2 + (i - (qat.length - 1) / 2) * fs * 1.15)); });
    const p = new T.Mesh(new T.PlaneGeometry(b.w * .92, b.h * .92), new T.MeshBasicMaterial({map:t, transparent:true, toneMapped:false})); p.position.z = .16; q.add(p);
    bosiladigan(q, 'blok_' + id, {blok:id, shakl:b.tur});
    b.q = q; b.m3 = m;
  });
  /* strelkalar */
  const strM = mat('#c9d0ea', {roughness:.4, metalness:.3});
  const strelkaG = new T.Group(); g.add(strelkaG);
  const YOL = {};
  function strelka(kalit, nuq){
    const v = nuq.map(p=>new T.Vector3(p[0], p[1], Z0));
    for(let i = 0; i < v.length - 1; i++){
      const a = v[i], b = v[i + 1], u = a.distanceTo(b);
      const c = silindr(.028, .028, u, strM, 8); c.position.copy(a).add(b).multiplyScalar(.5); c.lookAt(b); c.rotateX(Math.PI / 2); strelkaG.add(c);
    }
    const a = v[v.length - 2], b = v[v.length - 1];
    const uch = new T.Mesh(new T.ConeGeometry(.09, .22, 14), strM); uch.position.copy(b); uch.lookAt(a); uch.rotateX(-Math.PI / 2); uch.position.lerp(a, .11 / a.distanceTo(b)); strelkaG.add(uch);
    YOL[kalit] = v;
  }
  strelka('B1-B2', [[-3.6, 4.94], [-3.6, 4.51]]);
  strelka('B2-B3', [[-3.6, 3.89], [-3.6, 3.48]]);
  strelka('B3-B4', [[-3.6, 2.22], [-3.6, 1.75]]);
  strelka('B4-B3', [[-3.6, .95], [-3.6, .6], [-5.3, .6], [-5.3, 3.65], [-3.6, 3.65], [-3.6, 3.5]]);
  strelka('B3-B5', [[-2.25, 2.85], [-1.75, 2.85]]);
  strelka('B5-B6', [[-.75, 2.54], [-.75, 1.86]]);
  bosiladigan(strelkaG, 'strelka');
  const yozM = (m, x, y, rg)=>{ const s = yozuv(m, {bal:.26, w:256, h:96, shrift:'800 48px Inter, sans-serif', rang:rg, fon:'rgba(12,16,34,.75)'}); s.position.set(x, y, Z0 + .2); g.add(s); return s; };
  yozM('Yo‘q', -3.2, 2.0, '#ff8a8a'); yozM('Ha', -2.0, 3.12, '#7dffc9');
  /* token */
  const token = new T.Mesh(new T.SphereGeometry(.13, 20, 14), new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false}));
  const tokNur = new T.Mesh(new T.SphereGeometry(.26, 20, 14), new T.MeshBasicMaterial({color:0xffb347, transparent:true, opacity:.25, toneMapped:false, depthWrite:false}));
  token.add(tokNur); g.add(token);
  /* ---- katakli maydon va robot ---- */
  const X0 = 1.6, KAT = .95, N = 8, ZM = .4;
  for(let i = 0; i < N; i++){
    const k = quti(KAT - .06, .08, KAT - .06, mat(i % 2 ? '#1f2744' : '#243056', {roughness:.6}), .02); k.position.set(X0 + i * KAT, .04, ZM); g.add(k);
    const n = yozuv(String(i), {bal:.18, w:128, h:96, fon:false, rang:'#6e769a', shrift:'700 60px "JetBrains Mono", monospace'}); n.position.set(X0 + i * KAT, .12, ZM + .6); g.add(n);
  }
  const gt = gishtTex(A);
  const devor = quti(KAT - .1, 1.3, KAT - .1, new T.MeshStandardMaterial({map:gt, roughness:.85}), .03); g.add(devor); bosiladigan(devor, 'devor');
  const robot = robotYasa(A); robot.rotation.y = Math.PI / 2; g.add(robot); bosiladigan(robot, 'robot');
  const rSoya = soya(1.2, 1.2, 0, ZM, .08, .8);
  const kYoz = yozuv('k = 0', {bal:.42, w:320, h:128, shrift:'800 64px "JetBrains Mono", monospace', rang:'#ffd57f', chuqurlik:false}); g.add(kYoz);
  const chiq = yozuv('', {bal:.5, w:512, h:128, shrift:'800 60px Inter, sans-serif', rang:'#fff', fon:'rgba(109,82,255,.9)', chuqurlik:false}); chiq.visible = false; chiq.position.set(-.75, 3.75, Z0 + .3); g.add(chiq);
  /* ---- holat mashinasi ---- */
  let masofa = 3, joy = 0, k = 0, pc = 'B1', tugadi = false, auto = null, tokYol = null, tokT = 1, robotMaqsad = 0;
  const IZ = {B1:'<b>Boshlash</b> (oval): algoritm shu yerdan boshlanadi.', B2:'<b>Jarayon</b> (to‘rtburchak): hisoblagichga boshlang‘ich qiymat beriladi — k := 0.', B3:'<b>Shart</b> (romb): savolga «Ha» yoki «Yo‘q» javobiga qarab yo‘l tanlanadi — bu <b>tarmoqlanish</b>.', B4:'<b>Jarayon</b>: robot bir katak yuradi, k bittaga oshadi. Keyin strelka yana shartga qaytadi — bu <b>takrorlanish (sikl)</b>.', B5:'<b>Chiqarish</b> (parallelogramm): natija — k qiymati ekranga chiqariladi.', B6:'<b>Tugash</b> (oval): algoritm tugadi.'};
  function joyla(){
    devor.position.set(X0 + (masofa + 1) * KAT, .69, ZM);
    robot.position.set(X0 + joy * KAT, .08, ZM); robotMaqsad = joy; rSoya.position.x = robot.position.x;
    kYoz.yoz('k = ' + k);
  }
  function blokYorit(id){ belgila(id ? ['blok_' + id] : [], '#ffd24a', .22); }
  function tokenQoy(id){ const b = BL[id]; token.position.set(b.x, b.y, Z0 + .3); }
  function qayta(){ clearInterval(auto); auto = null; joy = 0; k = 0; pc = 'B1'; tugadi = false; tokYol = null; chiq.visible = false; tokenQoy('B1'); blokYorit('B1'); joyla(); if(tag.querySelector('[data-run]')) tag.querySelector('[data-run]').classList.remove('faol'); izoh.innerHTML = IZ.B1 + ' «Bir qadam» yoki «Ishga tushirish» tugmasini bosing.'; }
  function otish(id, yolKalit){
    const eski = pc; pc = id;
    const y = YOL[yolKalit || (eski + '-' + id)];
    if(y){ tokYol = [new T.Vector3(BL[eski].x, BL[eski].y, Z0 + .3)].concat(y.map(p=>p.clone().setZ(Z0 + .3))).concat([new T.Vector3(BL[id].x, BL[id].y, Z0 + .3)]); tokT = 0; }
    else tokenQoy(id);
    blokYorit(id);
  }
  function qadam(){
    if(tugadi) return;
    let devorBor = joy + 1 >= masofa + 1;
    if(pc === 'B1'){ otish('B2'); k = 0; }
    else if(pc === 'B2'){ otish('B3'); }
    else if(pc === 'B3'){ if(devorBor) otish('B5', 'B3-B5'); else otish('B4', 'B3-B4'); }
    else if(pc === 'B4'){ otish('B3', 'B4-B3'); }
    else if(pc === 'B5'){ otish('B6'); }
    /* blokning ishini bajarish */
    if(pc === 'B4'){ joy++; k++; robotMaqsad = joy; }
    if(pc === 'B5'){ chiq.visible = true; chiq.yoz('Natija: k = ' + k); }
    kYoz.yoz('k = ' + k);
    devorBor = joy + 1 >= masofa + 1;
    izoh.innerHTML = IZ[pc] + (pc === 'B3' ? ' Hozir: oldinda ' + (devorBor ? '<b>devor bor</b> → «Ha».' : '<b>yo‘l bo‘sh</b> → «Yo‘q».') : '') + ' <span style="opacity:.7">k = ' + k + '</span>';
    hodisa('im-qadam', {id:pc, nom:BL[pc].tur, k, devor:devorBor});
    if(pc === 'B6'){ tugadi = true; clearInterval(auto); auto = null; const r = tag.querySelector('[data-run]'); if(r) r.classList.remove('faol'); hodisa('im-algoritm', {tugadi:true, k, masofa}); }
  }
  const tb = tugmalar(tag, [
    {m:'Bir qadam', f:()=>{ if(tugadi) qayta(); else qadam(); }},
    {m:'▶ Ishga tushirish', k:'run', f:b=>{ if(auto){ clearInterval(auto); auto = null; b.classList.remove('faol'); return; } if(tugadi) qayta(); b.classList.add('faol'); auto = setInterval(qadam, 850); }},
    {m:'Qaytadan', f:()=>qayta()}, '|',
    ...[2, 3, 5].map(n=>({m:'Devorgacha: ' + n, k:'m' + n, cls:n === 3 ? 'faol' : '', f:b=>{ masofa = n; faolQil(tag, '[data-m]', b); qayta(); }}))
  ]);
  tb.run.dataset.run = 1; [2, 3, 5].forEach(n=>{ tb['m' + n].dataset.m = n; });
  A.tozalash.push(()=>clearInterval(auto));
  S.bosish = ud=>{
    if(ud.blok){ blokYorit(ud.blok); izoh.innerHTML = IZ[ud.blok]; detal('im_blok', ud.shakl); hodisa('im-blok', {nom:ud.shakl, id:ud.blok}); return; }
    if(ud.nom === 'robot'){ detal('im_blok', 'robot'); hodisa('im-blok', {nom:'robot', id:null}); izoh.innerHTML = '<b>Ijrochi — robot.</b> U faqat o‘zi tushunadigan buyruqlarni bajaradi: «oldinga yur», «oldinda devor bormi?».'; return; }
    if(ud.nom === 'strelka'){ detal('im_blok', 'strelka'); hodisa('im-blok', {nom:'strelka', id:null}); izoh.innerHTML = '<b>Oqim chiziqlari (strelkalar)</b> bloklarning bajarilish tartibini ko‘rsatadi. Pastdan yana shartga qaytgan strelka — sikl.'; return; }
    if(ud.nom === 'devor'){ izoh.innerHTML = '<b>Devor</b> — ' + masofa + ' katakdan keyin. «Devorgacha» tugmalari bilan masofani o‘zgartiring.'; }
  };
  S.holat = h=>{ if(!h) return; if(h.masofa && [2, 3, 5].includes(+h.masofa)){ masofa = +h.masofa; faolQil(tag, '[data-m]', tb['m' + masofa]); qayta(); } if(h.blok !== undefined){ if(h.blok && BL[h.blok]){ blokYorit(h.blok); tokenQoy(h.blok); izoh.innerHTML = IZ[h.blok]; } else blokYorit(null); } };
  const bP = new T.Vector3();
  S.kadrda = (dt, t)=>{
    if(tokYol && tokT < 1){
      tokT = Math.min(1, tokT + dt * 1.9);
      const n = tokYol.length - 1, f = tokT * n, i = Math.min(n - 1, Math.floor(f));
      token.position.lerpVectors(tokYol[i], tokYol[i + 1], f - i);
    }
    const tx = X0 + robotMaqsad * KAT;
    robot.position.x += (tx - robot.position.x) * Math.min(1, dt * 6);
    robot.position.y = .08 + Math.abs(Math.sin(t * 8)) * (Math.abs(tx - robot.position.x) > .02 ? .04 : 0);
    rSoya.position.x = robot.position.x;
    kYoz.position.set(robot.position.x, 1.75, ZM);
    tokNur.scale.setScalar(1 + Math.sin(t * 6) * .15);
    robot.userData.antU.material.color.setHSL(.95, 1, .55 + Math.sin(t * 5) * .15);
  };
  qayta();
  S.joyla(6.4, new T.Vector3(.4, 2.7, 0));
  return S;
};

/* ================= 4. KOMPYUTER TARMOQLARI VA INTERNET (im_tarmoq) ================= */
/* IP manzillar: 192.168.x.x — RFC 1918 xususiy diapazon; 203.0.113.x, 198.51.100.x, 192.0.2.x — RFC 5737 hujjat namunalari (haqiqiy emas). */
const TQ_IP = {kompyuter:'192.168.1.10', kompyuter2:'192.168.1.11', noutbuk:'192.168.1.12', telefon:'192.168.1.13', router:'192.168.1.1 / 203.0.113.5', kommutator:'— (2-daraja qurilma, IP shart emas)', provayder:'203.0.113.1', dns:'192.0.2.53', server:'198.51.100.20'};
const TQ_NOM = {router:'Router (marshrutizator)', kommutator:'Kommutator (switch)', kompyuter:'Kompyuter', noutbuk:'Noutbuk', telefon:'Smartfon', provayder:'Provayder (ISP)', dns:'DNS server', server:'Veb-server «maktab.uz» (namuna)', kabel:'Kabel (Ethernet, optik tola)', wifi:'Wi-Fi (radioto‘lqin)'};
R.im_tarmoq = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · tarmoq va Internet · IP manzillar namunaviy (RFC 1918, RFC 5737)');
  const A = asos(sahna, {rx:.52, ry:-.34, rxMin:.05, rxMax:1.25, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila} = A;
  podium(8.2, 0, '#5cc8ff');
  const JOY = {kompyuter:[-5.0, .9], kompyuter2:[-4.4, -2.1], kommutator:[-2.4, -.6], router:[0, .6], noutbuk:[1.6, 2.6], telefon:[3.2, 1.7], provayder:[2.6, -2.6], internet:[5.0, -3.4], dns:[6.8, -1.2], server:[6.6, -4.6]};
  const qur = {};
  const miltM = [];
  const milt = (x, y, z, rangH, q)=>{ const m = new T.Mesh(new T.SphereGeometry(.035, 10, 8), new T.MeshBasicMaterial({color:new T.Color(rangH), toneMapped:false})); m.position.set(x, y, z); q.add(m); miltM.push(m); return m; };
  const ekranTex = (sarl, rangH)=>matnTex(256, 160, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#15204a'); gr.addColorStop(1, rangH || '#0d6f73'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,.85)'; x.font = '700 24px Inter, sans-serif'; x.fillText(sarl, 14, 34); x.fillStyle = 'rgba(255,255,255,.35)'; for(let i = 0; i < 4; i++) x.fillRect(14, 56 + i * 22, 120 + (i * 37) % 90, 9); });
  /* kompyuter */
  function kompyuter(nom, kalit){
    const q = new T.Group();
    const bl = quti(.42, .9, .85, fiz('#1a1d26', {roughness:.35, metalness:.4}), .05); bl.position.set(-.75, .45, 0); q.add(bl);
    milt(-.53, .8, .43, '#36d6a0', q);
    const mon = quti(1.2, .72, .06, fiz('#0e1015', {roughness:.3}), .03); mon.position.set(.15, .78, 0); q.add(mon);
    const ek = new T.Mesh(new T.PlaneGeometry(1.12, .64), new T.MeshBasicMaterial({map:ekranTex(nom), toneMapped:false})); ek.position.set(.15, .78, .035); q.add(ek);
    const oy = quti(.08, .38, .08, mat('#22252e', {metalness:.7, roughness:.3}), .02); oy.position.set(.15, .25, -.05); q.add(oy);
    const ta = quti(.5, .04, .3, mat('#22252e', {metalness:.7, roughness:.3}), .015); ta.position.set(.15, .03, -.05); q.add(ta);
    const kl = quti(.9, .05, .28, mat('#20232b'), .02); kl.position.set(.15, .03, .45); q.add(kl);
    bosiladigan(q, 'kompyuter', {ip:TQ_IP[kalit], qk:kalit}); return q;
  }
  qur.kompyuter = kompyuter('PC-1', 'kompyuter'); qur.kompyuter2 = kompyuter('PC-2', 'kompyuter2');
  /* kommutator */
  (()=>{ const q = new T.Group(); const b = quti(1.9, .2, .62, fiz('#262a35', {metalness:.6, roughness:.3}), .03); b.position.y = .1; q.add(b);
    for(let i = 0; i < 8; i++){ const p = quti(.14, .09, .02, mat('#07080b'), .01); p.position.set(-.7 + i * .2, .1, .315); q.add(p); milt(-.7 + i * .2, .175, .315, i < 3 ? '#36d6a0' : '#1e3a2f', q); }
    bosiladigan(q, 'kommutator', {ip:TQ_IP.kommutator}); qur.kommutator = q; })();
  /* router */
  (()=>{ const q = new T.Group(); const b = quti(1.3, .26, .85, fiz('#f0f2f6', {roughness:.35, clearcoat:.6}), .1); b.position.y = .13; q.add(b);
    const chiziq = quti(1.0, .02, .02, new T.MeshBasicMaterial({color:0x5cc8ff, toneMapped:false})); chiziq.position.set(0, .2, .43); q.add(chiziq);
    [-.45, 0, .45].forEach((x, i)=>{ const a = silindr(.035, .045, .9, mat('#e3e6ee', {roughness:.4}), 12); a.position.set(x, .7, -.33); a.rotation.z = (i - 1) * -.28; q.add(a); });
    for(let i = 0; i < 4; i++) milt(-.3 + i * .2, .27, .38, '#5cc8ff', q);
    bosiladigan(q, 'router', {ip:TQ_IP.router}); qur.router = q; })();
  /* noutbuk */
  (()=>{ const q = new T.Group(); const ba = quti(1.2, .06, .8, fiz('#c9ced8', {metalness:.8, roughness:.3}), .03); ba.position.y = .03; q.add(ba);
    const kl = new T.Mesh(new T.PlaneGeometry(1.0, .42), mat('#22252e', {roughness:.7})); kl.rotation.x = -Math.PI / 2; kl.position.set(0, .065, .08); q.add(kl);
    const ek = new T.Group(); ek.position.set(0, .06, -.39); ek.rotation.x = -.28; q.add(ek);
    const qo = quti(1.2, .78, .04, fiz('#c9ced8', {metalness:.8, roughness:.3}), .03); qo.position.y = .39; ek.add(qo);
    const ekr = new T.Mesh(new T.PlaneGeometry(1.1, .68), new T.MeshBasicMaterial({map:ekranTex('Noutbuk', '#3b2a7a'), toneMapped:false})); ekr.position.set(0, .39, .025); ek.add(ekr);
    bosiladigan(q, 'noutbuk', {ip:TQ_IP.noutbuk}); qur.noutbuk = q; })();
  /* telefon */
  (()=>{ const q = new T.Group(); const st = quti(.5, .06, .4, mat('#22252e', {metalness:.6, roughness:.3}), .02); st.position.y = .03; q.add(st);
    const t = quti(.42, .86, .05, fiz('#15171d', {roughness:.25, clearcoat:1}), .06); t.position.set(0, .5, 0); t.rotation.x = -.22; q.add(t);
    const ek = new T.Mesh(new T.PlaneGeometry(.37, .78), new T.MeshBasicMaterial({map:matnTex(128, 256, (x, w, h)=>{ const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#6d52ff'); gr.addColorStop(1, '#e8508f'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,.8)'; for(let i = 0; i < 4; i++) for(let j = 0; j < 3; j++) x.fillRect(18 + j * 36, 60 + i * 40, 22, 22); }), toneMapped:false}));
    ek.position.set(0, .5, .03); ek.rotation.x = -.22; ek.position.z += .005; q.add(ek);
    bosiladigan(q, 'telefon', {ip:TQ_IP.telefon}); qur.telefon = q; })();
  /* provayder binosi */
  (()=>{ const q = new T.Group(); const dT = matnTex(128, 256, (x, w, h)=>{ x.fillStyle = '#1b2033'; x.fillRect(0, 0, w, h); for(let r = 0; r < 12; r++) for(let c = 0; c < 4; c++){ x.fillStyle = Math.random() > .35 ? '#ffd88a' : '#2a3150'; x.fillRect(10 + c * 29, 10 + r * 20, 18, 11); } });
    const b = quti(1.3, 2.3, 1.1, new T.MeshStandardMaterial({map:dT, roughness:.6, emissiveMap:dT, emissive:new T.Color('#ffffff'), emissiveIntensity:.25}), .04); b.position.y = 1.15; q.add(b);
    const tom = silindr(.03, .03, .8, mat('#9aa0ab', {metalness:.9}), 8); tom.position.set(.3, 2.7, 0); q.add(tom);
    const lik = new T.Mesh(new T.SphereGeometry(.28, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2.6), mat('#e3e6ee', {roughness:.4, side:T.DoubleSide})); lik.rotation.x = -1.1; lik.position.set(-.25, 2.45, .1); q.add(lik);
    bosiladigan(q, 'provayder', {ip:TQ_IP.provayder}); qur.provayder = q; })();
  /* serverlar */
  function rack(kalit, sarl){
    const q = new T.Group(); const b = quti(.9, 2.0, .9, fiz('#15171d', {metalness:.5, roughness:.35}), .04); b.position.y = 1.0; q.add(b);
    for(let i = 0; i < 7; i++){ const u = quti(.78, .2, .02, mat('#262a35', {metalness:.6, roughness:.3}), .01); u.position.set(0, .3 + i * .24, .455); q.add(u); milt(.3, .3 + i * .24, .47, i % 3 ? '#36d6a0' : '#ffb347', q); milt(.22, .3 + i * .24, .47, '#5cc8ff', q); }
    const yz = new T.Mesh(new T.PlaneGeometry(.7, .18), new T.MeshBasicMaterial({map:matnTex(256, 64, (x, w, h)=>{ x.fillStyle = '#0e1326'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '800 34px Inter, sans-serif'; x.textAlign = 'center'; x.fillText(sarl, w / 2, 44); }), toneMapped:false})); yz.position.set(0, 1.9, .46); q.add(yz);
    bosiladigan(q, kalit, {ip:TQ_IP[kalit]}); return q;
  }
  qur.dns = rack('dns', 'DNS'); qur.server = rack('server', 'WEB');
  /* Internet buluti */
  (()=>{ const q = new T.Group(); const bm = new T.MeshPhysicalMaterial({color:new T.Color('#9fd4ff').convertSRGBToLinear(), roughness:.2, metalness:0, transparent:true, opacity:.55, clearcoat:1}); bm.userData.env = 1;
    [[0, 0, 0, .9], [.85, -.1, .1, .7], [-.85, -.15, 0, .7], [.35, .45, -.1, .7], [-.4, .4, .1, .62], [1.4, -.25, 0, .45], [-1.4, -.3, 0, .45]].forEach(([x, y, z, r])=>{ const s = new T.Mesh(new T.SphereGeometry(r, 28, 18), bm); s.position.set(x, y, z); q.add(s); });
    bosiladigan(q, 'provayder_internet'); qur.internet = q; q.position.y = 2.7; })();
  Object.keys(JOY).forEach(k=>{ const [x, z] = JOY[k]; qur[k].position.x = x; qur[k].position.z = z; if(k !== 'internet'){ qur[k].rotation.y = Math.atan2(-x * .15, 1) + (k === 'kompyuter' ? .5 : k === 'kompyuter2' ? .35 : k === 'server' || k === 'dns' ? -.4 : 0); g.add(qur[k]); soya(1.9, 1.6, x, z, 0, .75); } else g.add(qur[k]); });
  /* kabellar va Wi-Fi */
  const kabelM = mat('#2a3150', {roughness:.6}), optikM = new T.MeshBasicMaterial({color:0xffb347, toneMapped:false, transparent:true, opacity:.8});
  const U = {}; /* ulanish nuqtalari */
  const n = (k, y)=>{ const [x, z] = JOY[k]; return new T.Vector3(x, y === undefined ? .12 : y, z); };
  const bogla = (a, b, m, egri)=>{ const pa = a.clone(), pb = b.clone(), o = pa.clone().add(pb).multiplyScalar(.5); o.y += egri || .35; const e = new T.QuadraticBezierCurve3(pa, o, pb); const t = new T.Mesh(new T.TubeGeometry(e, 32, m === optikM ? .03 : .04, 8, false), m); g.add(t); bosiladigan(t, 'kabel'); return e; };
  U['kompyuter-kommutator'] = bogla(n('kompyuter'), n('kommutator'), kabelM);
  U['kompyuter2-kommutator'] = bogla(n('kompyuter2'), n('kommutator'), kabelM);
  U['kommutator-router'] = bogla(n('kommutator'), n('router'), kabelM);
  U['router-provayder'] = bogla(n('router'), n('provayder'), optikM, .6);
  U['provayder-internet'] = bogla(n('provayder', 2.4), n('internet', 2.3), optikM, .4);
  U['internet-dns'] = bogla(n('internet', 2.3), n('dns', 2.0), optikM, .3);
  U['internet-server'] = bogla(n('internet', 2.3), n('server', 2.0), optikM, .3);
  /* Wi-Fi: nuqtali yo‘l + to‘lqin halqalari */
  const wifiYol = k=>{ const a = n('router', .9), b = n(k, .6), o = a.clone().add(b).multiplyScalar(.5); o.y += .5; return new T.QuadraticBezierCurve3(a, o, b); };
  U['router-noutbuk'] = wifiYol('noutbuk'); U['router-telefon'] = wifiYol('telefon');
  const wifiM = new T.MeshBasicMaterial({color:0x5cc8ff, transparent:true, opacity:.45, toneMapped:false});
  ['noutbuk', 'telefon'].forEach(k=>{ const e = U['router-' + k]; for(let i = 1; i < 14; i++){ const d = new T.Mesh(new T.SphereGeometry(.03, 8, 6), wifiM); d.position.copy(e.getPoint(i / 14)); g.add(d); } });
  const halqalar = [];
  for(let i = 0; i < 3; i++){ const h = new T.Mesh(new T.TorusGeometry(.5, .012, 6, 48, Math.PI * .9), new T.MeshBasicMaterial({color:0x5cc8ff, transparent:true, opacity:.5, toneMapped:false, depthWrite:false})); h.position.set(JOY.router[0], .9, JOY.router[1]); h.rotation.set(-Math.PI / 2 + .6, 0, Math.PI * .55 - .5); g.add(h); halqalar.push(h); }
  const wifiBelgi = yozuv('Wi-Fi', {bal:.28, w:256, h:96, shrift:'800 50px Inter, sans-serif', rang:'#9fe0ff', chuqurlik:false}); wifiBelgi.position.set(JOY.router[0] + 1.0, 1.35, JOY.router[1] + .5); wifiBelgi.userData.nom = 'wifi'; g.add(wifiBelgi);
  /* nom va IP yozuvlari */
  const yozuvlar = {};
  const NOM2 = {kompyuter:'PC-1', kompyuter2:'PC-2', kommutator:'Kommutator', router:'Router', noutbuk:'Noutbuk', telefon:'Smartfon', provayder:'Provayder', internet:'Internet', dns:'DNS', server:'maktab.uz'};
  const IPQ = {kompyuter:'192.168.1.10', kompyuter2:'192.168.1.11', router:'192.168.1.1 | 203.0.113.5', noutbuk:'192.168.1.12', telefon:'192.168.1.13', provayder:'203.0.113.1', dns:'192.0.2.53', server:'198.51.100.20', kommutator:'', internet:''};
  let ipKor = true;
  Object.keys(JOY).forEach(k=>{ const s = yozuv('', {bal:.46, w:k === 'router' ? 820 : 640, h:120, shrift:'700 44px "JetBrains Mono", monospace', chuqurlik:false}); const [x, z] = JOY[k]; s.position.set(x, k === 'internet' ? 4.05 : k === 'provayder' ? 3.2 : k === 'dns' || k === 'server' ? 2.45 : k === 'router' ? 1.6 : 1.45, z); g.add(s); yozuvlar[k] = s; });
  const yozYangila = ()=>Object.keys(yozuvlar).forEach(k=>yozuvlar[k].yoz(ipKor && IPQ[k] ? NOM2[k] + ' · ' + IPQ[k] : NOM2[k], k === 'router' ? '#5cc8ff' : undefined));
  yozYangila();
  /* ---- paketlar ---- */
  const paketlar = [];
  function paket(yol, matn, rangH, tugadi, almashtir){
    const q = new T.Group();
    const b = quti(.26, .18, .18, new T.MeshBasicMaterial({color:new T.Color(rangH), toneMapped:false}), .04); q.add(b);
    const nur = new T.Mesh(new T.SphereGeometry(.28, 16, 10), new T.MeshBasicMaterial({color:new T.Color(rangH), transparent:true, opacity:.18, depthWrite:false, toneMapped:false})); q.add(nur);
    const s = yozuv(matn, {bal:.36, w:900, h:110, shrift:'700 46px "JetBrains Mono", monospace', rang:rangH, chuqurlik:false}); s.position.y = .42; q.add(s);
    g.add(q); paketlar.push({q, s, yol, i:0, t:0, tugadi, almashtir});
  }
  const egri = (a, b)=>{ if(U[a + '-' + b]) return {e:U[a + '-' + b], ters:false}; return {e:U[b + '-' + a], ters:true}; };
  const yolQur = tugunlar=>{ const r = []; for(let i = 0; i < tugunlar.length - 1; i++){ const a = tugunlar[i] === 'kompyuter2' ? 'kompyuter2' : tugunlar[i], b = tugunlar[i + 1]; r.push(egri(a, b)); } return r; };
  let band = false;
  const SSEN = {
    lan:{yol:['kompyuter', 'kommutator', 'router', 'noutbuk'], dan:'kompyuter', ga:'noutbuk', m:'192.168.1.10 → 192.168.1.12', r:'#36d6a0', iz:'<b>Lokal tarmoq (LAN):</b> paket PC-1 dan kommutator va router orqali noutbukka boradi — Internetga chiqmaydi. Manzillar 192.168.1.x — bitta tarmoq.'},
    internet:{yol:['telefon', 'router', 'provayder', 'internet', 'server'], dan:'telefon', ga:'server', m:'192.168.1.13 → 198.51.100.20', m2:'203.0.113.5 → 198.51.100.20', r:'#ffb347', iz:'<b>Internet:</b> smartfon so‘rovi Wi-Fi orqali routerga, undan provayder va Internet orqali serverga boradi. Router xususiy manzilni o‘zining tashqi manziliga almashtiradi (NAT) — paket yozuvini kuzating.'},
    dns:{yol:['noutbuk', 'router', 'provayder', 'internet', 'dns'], dan:'noutbuk', ga:'dns', m:'«maktab.uz» IP si qanday?', r:'#e8508f', iz:'<b>DNS:</b> brauzer avval DNS serverdan «maktab.uz» nomining IP manzilini so‘raydi. Javob kelgach, shu IP ga ulanadi. DNS — Internetning «telefon kitobi».'}
  };
  const yoritYol = k=>{ const s = SSEN[k]; belgila(s ? s.yol.map(x=>x === 'kompyuter2' ? 'kompyuter' : x === 'internet' ? 'provayder_internet' : x) : [], s ? s.r : undefined); };
  function yubor(k){
    if(band) return; const s = SSEN[k]; band = true; yoritYol(k); izoh.innerHTML = s.iz;
    faolQil(tag, '[data-s]', tag.querySelector('[data-s="' + k + '"]'));
    paket(yolQur(s.yol), s.m, s.r, ()=>{
      const javob = k === 'dns' ? '198.51.100.20' : k === 'internet' ? '198.51.100.20 → 203.0.113.5' : '192.168.1.12 → 192.168.1.10';
      paket(yolQur(s.yol.slice().reverse()), k === 'dns' ? 'Javob: maktab.uz = 198.51.100.20' : 'Javob: ' + javob, '#9fe0ff', ()=>{ band = false; hodisa('im-paket', {rejim:k, dan:s.dan, ga:s.ga, sakrash:s.yol.length - 2}); if(k === 'internet') izoh.innerHTML = s.iz + ' Javob router orqali yana 192.168.1.13 ga qaytdi.'; },
        k === 'internet' ? {i:3, m:'198.51.100.20 → 192.168.1.13'} : null);
    }, s.m2 ? {i:1, m:s.m2} : null);
  }
  const tb = tugmalar(tag, [
    {m:'LAN: PC-1 → Noutbuk', k:'lan', f:()=>yubor('lan')},
    {m:'Internet: Smartfon → Server', k:'internet', f:()=>yubor('internet')},
    {m:'DNS: nom → IP', k:'dns', f:()=>yubor('dns')}, '|',
    {m:'IP manzillar', k:'ip', cls:'faol', f:b=>{ ipKor = !ipKor; b.classList.toggle('faol', ipKor); yozYangila(); }}
  ]);
  tb.lan.dataset.s = 'lan'; tb.internet.dataset.s = 'internet'; tb.dns.dataset.s = 'dns';
  const ayt = (k, ip)=>{ izoh.innerHTML = '<b>' + TQ_NOM[k] + '.</b>' + (ip ? ' IP: <b>' + ip + '</b>.' : '') + ' Kartada batafsil.'; };
  S.bosish = ud=>{
    let k = ud.nom; if(k === 'provayder_internet'){ izoh.innerHTML = '<b>Internet</b> — butun dunyo tarmoqlarini bog‘lovchi «tarmoqlar tarmog‘i». Paketlar ko‘plab routerlar orqali o‘tadi.'; return; }
    if(!TQ_NOM[k]) return;
    const ip = ud.ip || null; ayt(k, ip); if(k !== 'kabel' && k !== 'wifi') belgila([k]);
    detal('im_tarmoq', k); hodisa('im-qurilma', {nom:k, ip:ip || ''});
  };
  S.holat = h=>{ if(!h) return; if(h.ip !== undefined){ ipKor = !!h.ip; tb.ip.classList.toggle('faol', ipKor); yozYangila(); } if(h.rejim !== undefined){ yoritYol(h.rejim); faolQil(tag, '[data-s]', h.rejim ? tag.querySelector('[data-s="' + h.rejim + '"]') : null); if(h.rejim && SSEN[h.rejim]) izoh.innerHTML = SSEN[h.rejim].iz + ' Paketni yuborish uchun tugmani bosing.'; } if(h.qurilma){ belgila([h.qurilma]); ayt(h.qurilma, TQ_IP[h.qurilma]); } };
  izoh.innerHTML = 'Qurilmalarni <b>bosing</b> — vazifasi va IP manzili chiqadi. Pastdagi tugmalar bilan paket yuboring: u qaysi qurilmalardan o‘tishini kuzating.';
  S.kadrda = (dt, t)=>{
    halqalar.forEach((h, i)=>{ const f = ((t * .6 + i / 3) % 1); h.scale.setScalar(.6 + f * 2.2); h.material.opacity = .55 * (1 - f); });
    miltM.forEach((m, i)=>{ if(i % 3 === 0) m.visible = Math.sin(t * 7 + i * 1.7) > -.3; });
    for(let j = paketlar.length - 1; j >= 0; j--){
      const p = paketlar[j]; const seg = p.yol[p.i];
      p.t += dt * 1.1 / Math.max(.6, seg.e.getLength() / 2.2);
      if(p.t >= 1){ p.t = 0; p.i++; if(p.almashtir && p.i === p.almashtir.i) p.s.yoz(p.almashtir.m); if(p.i >= p.yol.length){ g.remove(p.q); p.q.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material){ if(o.material.map) o.material.map.dispose(); o.material.dispose(); } }); paketlar.splice(j, 1); if(p.tugadi) p.tugadi(); continue; } }
      const s2 = p.yol[p.i]; p.q.position.copy(s2.e.getPoint(s2.ters ? 1 - p.t : p.t)); p.q.position.y += .15;
    }
    qur.internet.position.y = 2.7 + Math.sin(t * .8) * .06;
  };
  S.joyla(6.9, new T.Vector3(1.3, .9, -1.2));
  return S;
};

/* ================= 5. DASTURLASH: TARMOQLANISH VA SIKLLAR (im_sikl) ================= */
const SK_DARAJA = {
  1:["#######","#S...##","####.##","####.G#","#######"],
  2:["########","#S.#####","##..####","###..###","####..##","#####.G#","########"],
  3:["########","#S....##","#####.##","##G##.##","##....##","########"]
};
const SK_NOM = {F:'oldinga', L:'chapga', R:'o‘ngga', T:'takrorla', E:']', W:'toki oldinda yo‘l bor: oldinga'};
/* matn → tokenlar */
function skTahlil(s){
  const r = []; if(!s) return r;
  String(s).replace(/\[/g, ' ').split(/[\s,]+/).filter(Boolean).forEach(w=>{
    const x = w.toLowerCase().replace(/[‘’'`ʻ]/g, '');
    let m;
    if(x === 'oldinga') r.push({t:'F'}); else if(x === 'chapga') r.push({t:'L'}); else if(x === 'ongga') r.push({t:'R'});
    else if(x === ']') r.push({t:'E'}); else if(x === 'toki') r.push({t:'W'});
    else if((m = /^takrorla(\d)$/.exec(x))) r.push({t:'T', n:+m[1]});
    else if(x === 'takrorla') r.push({t:'T', n:2});
    else if(/^\d$/.test(x) && r.length && r[r.length - 1].t === 'T') r[r.length - 1].n = +x;
  });
  return r;
}
/* tokenlar → daraxt (yopilmagan sikl oxirida yopiladi) */
function skDaraxt(tok){
  let i = 0;
  const bl = ()=>{ const q = []; while(i < tok.length){ const t = tok[i]; if(t.t === 'E'){ i++; return q; } i++; if(t.t === 'T'){ const idx = i - 1; q.push({t:'T', n:t.n, idx, ichi:bl()}); } else q.push({t:t.t, idx:i - 1}); } return q; };
  return bl();
}
R.im_sikl = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · dasturlash · sikl va shart · robot labirintda');
  const A = asos(sahna, {rx:.82, ry:0, rxMin:.25, rxMax:1.35, ryMin:-.9, ryMax:.9, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, testda, qatlam} = A;
  podium(6.4, -.02, '#a996ff');
  const labG = new T.Group(); g.add(labG);
  const robot = robotYasa(A, '#f3f0ff'); robot.scale.setScalar(.8); g.add(robot); bosiladigan(robot, 'robot');
  const rSoya = soya(1, 1, 0, 0, 0, .8);
  const yulduz = new T.Group(); g.add(yulduz);
  const yu = new T.Mesh(new T.OctahedronGeometry(.28, 0), new T.MeshStandardMaterial({color:0xffd24a, emissive:0xffb347, emissiveIntensity:.8, roughness:.3, metalness:.4})); yu.position.y = .6; yulduz.add(yu);
  const yh = new T.Mesh(new T.TorusGeometry(.38, .03, 8, 40), new T.MeshBasicMaterial({color:0xffd24a, toneMapped:false})); yh.rotation.x = Math.PI / 2; yh.position.y = .1; yulduz.add(yh);
  bosiladigan(yulduz, 'maqsad');
  let daraja = 1, xarita = [], W = 0, H = 0, bosh = null, maqsad = null, ofX = 0, ofZ = 0;
  const holatR = {x:0, y:0, d:0};
  const pozitsiya = (x, y)=>new T.Vector3(x + ofX, 0, y + ofZ);
  function qur(dj){
    daraja = dj; xarita = SK_DARAJA[dj]; H = xarita.length; W = xarita[0].length; ofX = -(W - 1) / 2; ofZ = -(H - 1) / 2;
    while(labG.children.length){ const c = labG.children.pop(); c.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m=>m.dispose()); }); }
    const devM = mat('#1b1f36', {roughness:.62, metalness:.15, env:.12});
    for(let y = 0; y < H; y++) for(let x = 0; x < W; x++){
      const c = xarita[y][x], p = pozitsiya(x, y), id = x + ',' + y;
      if(c === '#'){
        const d = quti(.96, .7, .96, devM, .06); d.position.set(p.x, .35, p.z); labG.add(d);
        const q = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(.96, .02, .96)), new T.LineBasicMaterial({color:0x8f7bff, transparent:true, opacity:.9})); q.position.set(p.x, .705, p.z); labG.add(q);
        bosiladigan(d, 'devor_' + id, {katak:id, tur2:'devor'});
      } else {
        const k = quti(.94, .06, .94, mat((x + y) % 2 ? '#3a8fb0' : '#4aa3c2', {roughness:.55, emissive:new T.Color('#1d6f8f'), emissiveIntensity:.35}), .03); k.position.set(p.x, .03, p.z); labG.add(k);
        const tur2 = c === 'S' ? 'start' : c === 'G' ? 'maqsad' : 'yol';
        bosiladigan(k, 'katak_' + id, {katak:id, tur2});
        if(c === 'S'){ bosh = {x, y}; const st = new T.Mesh(new T.RingGeometry(.3, .38, 32), new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false, side:T.DoubleSide})); st.rotation.x = -Math.PI / 2; st.position.set(p.x, .07, p.z); labG.add(st); }
        if(c === 'G'){ maqsad = {x, y}; }
      }
    }
    yulduz.position.copy(pozitsiya(maqsad.x, maqsad.y));
    qaytaJoy();
    tag.querySelectorAll('[data-dj]').forEach(b=>b.classList.toggle('faol', +b.dataset.dj === dj));
  }
  function qaytaJoy(){ holatR.x = bosh.x; holatR.y = bosh.y; holatR.d = 0; const p = pozitsiya(bosh.x, bosh.y); robot.position.copy(p); robot.rotation.y = Math.PI / 2; anim = null; navbat = []; }
  const bosh2 = (x, y)=>y >= 0 && y < H && x >= 0 && x < W && xarita[y][x] !== '#';
  const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];
  /* ---- dastur ---- */
  let tok = [], tanl = -1, ish = null, anim = null, navbat = [], hozirIdx = -1;
  let panel = null, dasturEl = null, holEl = null;
  function chizDastur(){
    if(!dasturEl) return;
    if(!tok.length){ dasturEl.innerHTML = '<div class="bosh">Dastur bo‘sh. Pastdagi buyruqlarni bosing.</div>'; return; }
    let ch = 0;
    dasturEl.innerHTML = tok.map((t, i)=>{
      if(t.t === 'E') ch = Math.max(0, ch - 1);
      const matn = t.t === 'T' ? 'takrorla ' + t.n + ' [' : SK_NOM[t.t];
      const s = '<div class="ln ' + (t.t === 'T' ? 'sikl' : t.t === 'E' ? 'yop' : t.t === 'W' ? 'shart' : '') + (i === tanl ? ' tanl' : '') + (i === hozirIdx ? ' hozir' : '') + '" data-i="' + i + '"><span class="n">' + (i + 1) + '</span><span style="padding-left:' + (ch * 16) + 'px">' + matn + '</span></div>';
      if(t.t === 'T') ch++;
      return s;
    }).join('');
    dasturEl.querySelectorAll('.ln').forEach(l=>l.onclick = ()=>{ tanl = +l.dataset.i === tanl ? -1 : +l.dataset.i; chizDastur(); });
    const h = dasturEl.querySelector('.hozir'); if(h) h.scrollIntoView({block:'nearest'});
  }
  function qosh(t){ if(ish) return; const j = tanl >= 0 ? tanl + 1 : tok.length; tok.splice(j, 0, t); tanl = tanl >= 0 ? j : -1; chizDastur(); }
  function holYoz(m, sinf){ if(holEl){ holEl.innerHTML = m; holEl.style.color = sinf === 'x' ? '#ff9a9a' : sinf === 'o' ? '#7dffc9' : ''; } }
  /* ijro: daraxtni harakatlar ro‘yxatiga aylantirish (generator) */
  function* bajar(q){
    for(const n of q){
      if(n.t === 'T'){ for(let k = 0; k < n.n; k++){ yield {idx:n.idx, a:null}; yield* bajar(n.ichi); } }
      else if(n.t === 'W'){ let c = 0; while(true){ const nx = holatR.x + DX[holatR.d], ny = holatR.y + DY[holatR.d]; if(!bosh2(nx, ny)) { yield {idx:n.idx, a:null, tekshir:true}; break; } yield {idx:n.idx, a:'F'}; if(++c > 60) break; } }
      else yield {idx:n.idx, a:n.t};
    }
  }
  let qadamSon = 0;
  function ishgaTush(){
    if(ish) return toxtat();
    qaytaJoy(); qadamSon = 0;
    const gen = bajar(skDaraxt(tok));
    ish = {gen, kut:0};
    tag.querySelectorAll('[data-run]').forEach(b=>b.classList.add('faol'));
    if(panel) panel.querySelector('[data-run]').classList.add('a');
    holYoz('Bajarilmoqda…');
  }
  function toxtat(){ ish = null; hozirIdx = -1; chizDastur(); tag.querySelectorAll('[data-run]').forEach(b=>b.classList.remove('faol')); if(panel) panel.querySelector('[data-run]').classList.remove('a'); }
  function yakun(yetdi, xato){
    const b = tok.filter(t=>t.t !== 'E').length, sikl = tok.some(t=>t.t === 'T'), shart = tok.some(t=>t.t === 'W');
    toxtat();
    const m = yetdi ? '<b>Maqsadga yetdi!</b> ' + b + ' ta buyruq, ' + qadamSon + ' ta harakat' + (sikl ? ', sikl bilan' : '') + (shart ? ', shart bilan' : '') + '.' : xato === 'devor' ? '<b>Robot devorga urildi.</b> Dasturni tuzating.' : xato === 'limit' ? '<b>200 harakat chegarasi.</b> Cheksiz sikl bo‘lishi mumkin.' : '<b>Dastur tugadi</b>, lekin robot maqsadga yetmadi.';
    holYoz(m, yetdi ? 'o' : 'x'); izoh.innerHTML = m;
    hodisa('im-dastur', {daraja, yetdi, xato:xato || null, buyruq:b, sikl, shart, qadam:qadamSon});
  }
  function keyingi(){
    const r = ish.gen.next();
    if(r.done){ yakun(holatR.x === maqsad.x && holatR.y === maqsad.y, null); return; }
    const v = r.value; hozirIdx = v.idx; chizDastur();
    if(!v.a){ ish.kut = .18; return; }
    qadamSon++;
    if(qadamSon > 200){ yakun(false, 'limit'); return; }
    if(v.a === 'L' || v.a === 'R'){ const d0 = holatR.d; holatR.d = (holatR.d + (v.a === 'R' ? 1 : 3)) % 4; anim = {tur:'b', a:Math.PI / 2 - d0 * Math.PI / 2, b:Math.PI / 2 - d0 * Math.PI / 2 + (v.a === 'R' ? -Math.PI / 2 : Math.PI / 2), t:0}; }
    else { const nx = holatR.x + DX[holatR.d], ny = holatR.y + DY[holatR.d];
      if(!bosh2(nx, ny)){ anim = {tur:'urish', p:robot.position.clone(), d:new T.Vector3(DX[holatR.d], 0, DY[holatR.d]), t:0, tugagach:()=>yakun(false, 'devor')}; return; }
      holatR.x = nx; holatR.y = ny; anim = {tur:'y', a:robot.position.clone(), b:pozitsiya(nx, ny), t:0, tugagach:()=>{ if(holatR.x === maqsad.x && holatR.y === maqsad.y){ portlash = 1; yakun(true, null); } }}; }
  }
  /* ---- boshqaruv ---- */
  if(!testda){
    panel = qatlam('im-p');
    panel.innerHTML = '<span class="im-ust">Dastur muharriri</span><h4>Robot uchun dastur tuzing</h4><div class="im-dastur"></div>' +
      '<div class="im-palitra"><button data-t="F">oldinga</button><button data-t="L">chapga</button><button data-t="R">o‘ngga</button>' +
      '<button class="s" data-t="T">takrorla <select data-n aria-label="Necha marta">' + [2, 3, 4, 5, 6, 7, 8, 9].map(n=>'<option' + (n === 3 ? ' selected' : '') + '>' + n + '</option>').join('') + '</select> [</button><button class="s" data-t="E">] sikl oxiri</button><button class="sh" data-t="W" title="toki oldinda yo‘l bor: oldinga">toki … oldinga</button></div>' +
      '<div class="im-qator"><button data-run>▶ Ishga tushirish</button><button data-del>⌫ O‘chirish</button><button data-clr>Tozalash</button></div><div class="im-natija" style="font-family:Inter,sans-serif;font-size:13px;font-weight:500"></div>' +
      '<p class="im-iz">Qatorni bosib tanlang — yangi buyruq undan keyin qo‘yiladi. «toki oldinda yo‘l bor: oldinga» — shartli sikl: devorga yetguncha yuradi.</p>';
    dasturEl = panel.querySelector('.im-dastur'); holEl = panel.querySelector('.im-natija');
    const sel = panel.querySelector('[data-n]'); sel.onclick = e=>e.stopPropagation();
    panel.querySelectorAll('[data-t]').forEach(b=>b.onclick = e=>{ if(e.target === sel) return; const t = b.dataset.t; qosh(t === 'T' ? {t, n:+sel.value} : {t}); });
    panel.querySelector('[data-run]').onclick = ishgaTush;
    panel.querySelector('[data-del]').onclick = ()=>{ if(ish) return; if(tanl >= 0){ tok.splice(tanl, 1); tanl = Math.min(tanl, tok.length - 1); } else tok.pop(); chizDastur(); };
    panel.querySelector('[data-clr]').onclick = ()=>{ if(ish) toxtat(); tok = []; tanl = -1; qaytaJoy(); holYoz(''); chizDastur(); };
    chizDastur();
  }
  tugmalar(tag, [
    ...[1, 2, 3].map(n=>({m:n + '-daraja', k:'d' + n, f:()=>{ if(ish) toxtat(); qur(n); holYoz(''); izoh.innerHTML = DIZ[n]; }})), '|',
    {m:'▶ Ishga tushirish', k:'run', f:()=>ishgaTush()},
    {m:'Robotni joyiga', f:()=>{ if(ish) toxtat(); qaytaJoy(); }}
  ]);
  tag.querySelectorAll('button').forEach((b, i)=>{ if(i < 3) b.dataset.dj = i + 1; if(/Ishga/.test(b.textContent)) b.dataset.run = 1; });
  const DIZ = {1:'<b>1-daraja.</b> Robot sharqqa (o‘ngga) qarab turibdi. Yulduzga olib boring. Bir xil buyruqlar ketma-ket kelsa — <b>takrorla</b> bilan qisqartiring.', 2:'<b>2-daraja — zinapoya.</b> Bir xil harakatlar guruhi takrorlanadi: «oldinga, o‘ngga, oldinga, chapga». Siklsiz 17 buyruq kerak — sikl bilan 6 ta yetadi.', 3:'<b>3-daraja — spiral.</b> Yo‘l bo‘laklari har xil uzunlikda. «toki oldinda yo‘l bor: oldinga» shartli sikli devorgacha o‘zi yuradi.'};
  S.bosish = ud=>{
    if(ud.nom === 'robot'){ detal('im_robot', 'robot'); hodisa('im-katak', {id:holatR.x + ',' + holatR.y, nom:'robot'}); izoh.innerHTML = '<b>Robot</b> — ijrochi. Hozir ' + holatR.x + ',' + holatR.y + ' katakda, ' + ['sharqqa', 'janubga', 'g‘arbga', 'shimolga'][holatR.d] + ' qaragan.'; return; }
    if(ud.nom === 'maqsad'){ const id = maqsad.x + ',' + maqsad.y; detal('im_robot', 'maqsad'); hodisa('im-katak', {id, nom:'maqsad'}); return; }
    if(!ud.katak) return;
    belgila([ud.nom], ud.tur2 === 'devor' ? '#ff5b8a' : '#ffd24a', .5);
    if(ud.tur2 === 'devor') detal('im_robot', 'devor');
    else if(ud.tur2 === 'maqsad') detal('im_robot', 'maqsad');
    izoh.innerHTML = 'Katak <b>' + ud.katak + '</b> (x — ustun, y — qator): ' + ({devor:'devor', yol:'yo‘l', start:'boshlang‘ich katak', maqsad:'maqsad'})[ud.tur2] + '.';
    hodisa('im-katak', {id:ud.katak, nom:ud.tur2});
  };
  S.holat = h=>{ if(!h) return; if(h.daraja && SK_DARAJA[h.daraja]){ if(ish) toxtat(); qur(+h.daraja); izoh.innerHTML = DIZ[h.daraja]; } if(h.dastur !== undefined){ if(ish) toxtat(); tok = skTahlil(h.dastur); tanl = -1; chizDastur(); holYoz(''); } };
  let portlash = 0;
  S.kadrda = (dt, t)=>{
    yu.rotation.y += dt * 1.5; yu.position.y = .6 + Math.sin(t * 2.4) * .08;
    if(portlash > 0){ portlash -= dt; const s = 1 + (1 - portlash) * 2.5; yh.scale.setScalar(s); yh.material.opacity = portlash; yh.material.transparent = true; if(portlash <= 0){ yh.scale.setScalar(1); yh.material.opacity = 1; } }
    if(anim){
      anim.t = Math.min(1, anim.t + dt / .42);
      const e = anim.t < .5 ? 2 * anim.t * anim.t : 1 - Math.pow(-2 * anim.t + 2, 2) / 2;
      if(anim.tur === 'y'){ robot.position.lerpVectors(anim.a, anim.b, e); robot.position.y = Math.abs(Math.sin(anim.t * Math.PI * 2)) * .04; }
      else if(anim.tur === 'b') robot.rotation.y = anim.a + (anim.b - anim.a) * e;
      else if(anim.tur === 'urish'){ robot.position.copy(anim.p).addScaledVector(anim.d, Math.sin(anim.t * Math.PI) * .22); }
      if(anim.t >= 1){ const f = anim.tugagach; anim = null; if(f) f(); }
    } else if(ish){ ish.kut -= dt; if(ish.kut <= 0){ ish.kut = 0; keyingi(); } }
    rSoya.position.set(robot.position.x, .07, robot.position.z);
    robot.userData.antU.material.color.setHSL(ish ? .33 : .95, 1, .55 + Math.sin(t * 5) * .15);
  };
  qur(1);
  izoh.innerHTML = DIZ[1];
  S.joyla(testda ? 5.0 : 6.4, new T.Vector3(testda ? 0 : 2.7, .3, .2));
  return S;
};

/* ================= 6. AXBOROT XAVFSIZLIGI (im_xavfsizlik) ================= */
const ALF = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const sezar = (s, k)=>String(s).toUpperCase().split('').map(c=>{ const i = ALF.indexOf(c); return i < 0 ? c : ALF[(i + k + 26 * 10) % 26]; }).join('');
const KENG_PAROL = ['123456','password','qwerty','123456789','12345678','111111','1234567','1234567890','000000','abc123','qwerty123','iloveyou','admin','parol','parol123','password1','123123','654321','qwertyuiop','1q2w3e4r'];
/* parol kuchi: entropiya ≈ L·log2(N); buzish vaqti — TAXMINIY (sekundiga 10¹⁰ urinish, o‘rtacha — yarim alifbo) */
function parolBaho(p){
  const L = [...p].length;
  let N = 0; if(/[a-z]/.test(p)) N += 26; if(/[A-Z]/.test(p)) N += 26; if(/[0-9]/.test(p)) N += 10; if(/[^a-zA-Z0-9]/.test(p)) N += 33;
  const bit = L && N ? L * Math.log2(N) : 0;
  const keng = KENG_PAROL.includes(p.toLowerCase()) || /^(.)\1+$/.test(p);
  const daraja = !L ? 'juda_zaif' : keng || bit < 28 ? 'juda_zaif' : bit < 45 ? 'zaif' : bit < 70 ? 'orta' : 'kuchli';
  const sek = keng ? 0.001 : Math.pow(2, bit) / 2 / 1e10;
  return {L, N, bit, daraja, sek, keng};
}
function vaqtMatn(s){
  if(s < 1) return '1 soniyadan kam';
  const Y = 365.25 * 86400;
  if(s < 60) return Math.round(s) + ' soniya';
  if(s < 3600) return Math.round(s / 60) + ' daqiqa';
  if(s < 86400) return Math.round(s / 3600) + ' soat';
  if(s < Y) return Math.round(s / 86400) + ' kun';
  const y = s / Y;
  if(y < 1e3) return Math.round(y) + ' yil';
  if(y < 1e6) return Math.round(y / 1e3) + ' ming yil';
  if(y < 1e9) return Math.round(y / 1e6) + ' million yil';
  if(y < 1e12) return Math.round(y / 1e9) + ' milliard yil';
  return 'trillion yildan ortiq';
}
const DARAJA_M = {juda_zaif:['Juda zaif', '#ff4d6d', 1], zaif:['Zaif', '#ff9a3c', 2], orta:['O‘rtacha', '#ffd24a', 3], kuchli:['Kuchli', '#36d6a0', 4]};
const FISH = {
  yuboruvchi:['Soxta yuboruvchi', 'Manzil bank nomiga o‘xshatilgan, lekin domen begona.'],
  shoshilinch:['Shoshiltirish va qo‘rqitish', '«24 soatda bloklanadi!» — o‘ylashga vaqt bermaslik uchun.'],
  murojaat:['Umumiy murojaat', '«Hurmatli mijoz» — haqiqiy tashkilot odatda ismingiz bilan murojaat qiladi.'],
  sorov:['Maxfiy ma’lumot so‘rash', 'Parol, karta raqami, SMS kodni hech qanday tashkilot xatda so‘ramaydi.'],
  havola:['Shubhali havola', 'Havola manzili rasmiy saytga emas, boshqa domenga olib boradi.'],
  ilova:['Xavfli ilova', '«.pdf.exe» — hujjat emas, dastur (ikki kengaytma bilan niqoblangan).']
};
R.im_xavfsizlik = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Informatika · axborot xavfsizligi · xat — o‘quv namunasi (domenlar .example)');
  const A = asos(sahna, {rx:.14, ry:0, rxMin:-.3, rxMax:.9, ryMin:-.9, ryMax:.9, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, testda, qatlam} = A;
  podium(8.0, 0, '#ff5b8a');
  let kalit = 3, ochiq = 'SALOM', rejim = null;
  /* ---- 1. SEZAR G‘ILDIRAGI ---- */
  const gG = new T.Group(); gG.position.set(-4.3, 2.05, 0); g.add(gG);
  const tayoq = silindr(.07, .09, 1.2, mat('#9aa0ab', {metalness:.9, roughness:.25}), 16); tayoq.position.set(-4.3, .6, -.15); g.add(tayoq);
  const taglik = silindr(.7, .8, .12, fiz('#1c2136', {metalness:.5, roughness:.3}), 40); taglik.position.set(-4.3, .06, -.15); g.add(taglik);
  soya(2.2, 1.6, -4.3, -.15, 0, .8);
  const halqaTex = (r0, r1, fon, rang2, qadam)=>matnTex(1024, 1024, (x, w, h)=>{
    x.clearRect(0, 0, w, h); const c = w / 2;
    x.beginPath(); x.arc(c, c, r1, 0, Math.PI * 2); x.arc(c, c, r0, 0, Math.PI * 2, true); x.fillStyle = fon; x.fill('evenodd');
    x.strokeStyle = 'rgba(255,255,255,.18)'; x.lineWidth = 2;
    for(let i = 0; i < 26; i++){ const a = -Math.PI + (i - .5) * Math.PI * 2 / 26; x.beginPath(); x.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0); x.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1); x.stroke(); }
    x.fillStyle = rang2; x.font = '800 ' + qadam + 'px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    for(let i = 0; i < 26; i++){ const a = -Math.PI + i * Math.PI * 2 / 26, rr = (r0 + r1) / 2; x.save(); x.translate(c + Math.cos(a) * rr, c + Math.sin(a) * rr); x.rotate(a + Math.PI / 2); x.fillText(ALF[i], 0, 0); x.restore(); }
  });
  const tashqiT = halqaTex(360, 500, '#6b4a1f', '#ffe3a6', 64), ichkiT = halqaTex(210, 352, '#141a33', '#9fe0ff', 58);
  const tashqi = new T.Mesh(new T.CylinderGeometry(1.5, 1.5, .12, 72), [fiz('#8a6326', {metalness:.8, roughness:.3}), new T.MeshStandardMaterial({map:tashqiT, transparent:true, metalness:.5, roughness:.35}), mat('#3a2a14')]);
  tashqi.rotation.x = Math.PI / 2; gG.add(tashqi);
  const ichki = new T.Group(); ichki.position.z = .09; gG.add(ichki);
  const ichkiD = new T.Mesh(new T.CylinderGeometry(1.06, 1.06, .1, 72), [fiz('#1d2440', {metalness:.4, roughness:.3}), new T.MeshStandardMaterial({map:ichkiT, transparent:true, roughness:.4}), mat('#141a33')]);
  ichkiD.rotation.x = Math.PI / 2; ichki.add(ichkiD);
  const markaz = silindr(.4, .4, .16, fiz('#c9a64a', {metalness:.9, roughness:.25}), 40); markaz.rotation.x = Math.PI / 2; markaz.position.z = .14; gG.add(markaz);
  const kalitYoz = yozuv('k = 3', {bal:.3, w:256, h:110, fon:false, rang:'#1a1206', shrift:'900 64px Inter, sans-serif'}); kalitYoz.position.set(0, 0, .3); gG.add(kalitYoz);
  const korsatkich = new T.Mesh(new T.ConeGeometry(.12, .3, 3), new T.MeshBasicMaterial({color:0xff5b8a, toneMapped:false})); korsatkich.rotation.z = Math.PI; korsatkich.position.set(0, 1.72, .1); gG.add(korsatkich);
  bosiladigan(gG, 'gildirak');
  const shifrYoz = yozuv('', {bal:.44, w:900, h:120, shrift:'800 56px "JetBrains Mono", monospace', rang:'#9fe0ff', chuqurlik:false}); shifrYoz.position.set(-4.3, 4.05, 0); g.add(shifrYoz);
  let ichkiMaqsad = 0;
  /* ---- 2. FISHING XATI (planshet) ---- */
  const xG = new T.Group(); xG.position.set(0, 0, -.2); g.add(xG);
  const plS = quti(3.9, 2.9, .12, fiz('#0f1118', {roughness:.3, clearcoat:1}), .14); plS.position.set(0, 2.2, 0); plS.rotation.x = -.08; xG.add(plS);
  const stand = quti(.9, .06, .9, mat('#22252e', {metalness:.7, roughness:.3}), .03); stand.position.set(0, .03, .1); xG.add(stand);
  const oyoqc = quti(.18, .8, .1, mat('#22252e', {metalness:.7, roughness:.3}), .03); oyoqc.position.set(0, .45, -.1); oyoqc.rotation.x = -.25; xG.add(oyoqc);
  soya(4.2, 1.6, 0, 0, 0, .8);
  const XW = 1024, XH = 760;
  const XAT = {yuboruvchi:[40, 118, 944, 46], shoshilinch:[40, 176, 944, 56], murojaat:[40, 262, 380, 40], sorov:[40, 312, 944, 94], havola:[40, 420, 944, 46], ilova:[40, 520, 470, 70]};
  const topildi = new Set();
  const xatTex = matnTex(XW, XH, (x, w, h)=>{
    x.fillStyle = '#f4f6fb'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#e3e8f4'; x.fillRect(0, 0, w, 90); x.fillStyle = '#3b4668'; x.font = '700 30px Inter, sans-serif'; x.fillText('Pochta · Kiruvchi xat', 40, 56);
    x.fillStyle = '#c62f4a'; x.font = '600 20px Inter, sans-serif'; x.fillText('O‘QUV NAMUNASI — haqiqiy xat emas', 640, 56);
    x.fillStyle = '#5a6380'; x.font = '500 26px Inter, sans-serif'; x.fillText('Kimdan:', 40, 150); x.fillStyle = '#1b2240'; x.font = '600 26px "JetBrains Mono", monospace'; x.fillText('Bank xizmati <xavfsizlik@bank-uz.example>', 150, 150);
    x.fillStyle = '#b3122e'; x.font = '800 34px Inter, sans-serif'; x.fillText('SHOSHILINCH! Hisobingiz 24 soatda bloklanadi', 40, 214);
    x.fillStyle = '#1b2240'; x.font = '500 28px Inter, sans-serif'; x.fillText('Hurmatli mijoz,', 40, 290);
    x.fillText('Hisobni saqlab qolish uchun karta raqami, parol va', 40, 344); x.fillText('SMS kodni quyidagi havola orqali tasdiqlang:', 40, 386);
    x.fillStyle = '#2458d6'; x.font = '600 27px "JetBrains Mono", monospace'; x.fillText('http://bank-uz.secure-login.example/tasdiqlash', 40, 452);
    x.fillRect(40, 458, 690, 2);
    x.fillStyle = '#e9ecf4'; x.fillRect(40, 520, 470, 70); x.fillStyle = '#c62f4a'; x.fillRect(56, 534, 40, 42); x.fillStyle = '#1b2240'; x.font = '600 26px Inter, sans-serif'; x.fillText('hujjat.pdf.exe · 312 KB', 112, 564);
    x.fillStyle = '#8a92ab'; x.font = '500 22px Inter, sans-serif'; x.fillText('Belgilarni toping va bosing. Topilgan belgilar qizil ramkada.', 40, 700);
    let n = 0;
    Object.keys(XAT).forEach(k=>{ if(!topildi.has(k)) return; n++; const [a, b, c, d] = XAT[k]; x.strokeStyle = '#ff2d55'; x.lineWidth = 5; x.strokeRect(a - 8, b - 6, c + 16, d + 12); x.fillStyle = '#ff2d55'; x.beginPath(); x.arc(a + c + 4, b - 2, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.font = '800 24px Inter, sans-serif'; x.textAlign = 'center'; x.fillText(String(Object.keys(XAT).indexOf(k) + 1), a + c + 4, b + 7); x.textAlign = 'start'; });
    x.fillStyle = n === 6 ? '#0e9f6e' : '#3b4668'; x.font = '800 26px Inter, sans-serif'; x.fillText('Topildi: ' + n + ' / 6', 800, 700);
  });
  const ekr = new T.Mesh(new T.PlaneGeometry(3.7, 3.7 * XH / XW), new T.MeshBasicMaterial({map:xatTex, toneMapped:false})); ekr.position.set(0, 2.2, .065); ekr.rotation.x = -.08; xG.add(ekr);
  bosiladigan(plS, 'planshet');
  /* ko‘rinmas bosish joylari */
  const PW = 3.7, PH = 3.7 * XH / XW;
  Object.keys(XAT).forEach(k=>{
    const [a, b, c, d] = XAT[k];
    const m = new T.Mesh(new T.PlaneGeometry(c / XW * PW, (d + 12) / XH * PH), new T.MeshBasicMaterial({transparent:true, opacity:.25, colorWrite:false, depthWrite:false}));
    m.position.set(-PW / 2 + (a + c / 2) / XW * PW, PH / 2 - (b + d / 2 - 6) / XH * PH, .01); m.userData.nom = 'fish_' + k; m.userData.fish = k;
    const q = new T.Group(); q.position.set(0, 2.2, .07); q.rotation.x = -.08; q.add(m); xG.add(q);
  });
  /* ---- 3. QULF VA PAROL KUCHI ---- */
  const qG = new T.Group(); qG.position.set(4.3, 0, 0); g.add(qG);
  const qTana = quti(1.7, 1.45, .7, fiz('#c9a64a', {metalness:.85, roughness:.28}), .18); qTana.position.y = 1.15; qG.add(qTana);
  const teshik = silindr(.13, .13, .05, mat('#1a1206'), 20); teshik.rotation.x = Math.PI / 2; teshik.position.set(0, 1.25, .36); qG.add(teshik);
  const tir = quti(.08, .26, .05, mat('#1a1206'), .02); tir.position.set(0, 1.05, .36); qG.add(tir);
  const halqa = new T.Group(); halqa.position.y = 1.85; qG.add(halqa);
  const hM = mat('#d7dbe3', {metalness:.95, roughness:.18});
  const yoy = new T.Mesh(new T.TorusGeometry(.55, .1, 16, 40, Math.PI), hM); yoy.position.y = .55; halqa.add(yoy);
  const oyoq1 = silindr(.1, .1, .55, hM, 16); oyoq1.position.set(-.55, .27, 0); halqa.add(oyoq1);
  const oyoq2 = silindr(.1, .1, .55, hM, 16); oyoq2.position.set(.55, .27, 0); halqa.add(oyoq2);
  const segM = [];
  for(let i = 0; i < 4; i++){ const s = quti(.36, .1, .1, new T.MeshBasicMaterial({color:0x2a3150, toneMapped:false}), .03); s.position.set(-.6 + i * .4, .3, .45); qG.add(s); segM.push(s.material); }
  bosiladigan(qG, 'qulf'); soya(2.2, 1.6, 4.3, 0, 0, .8);
  const parolYoz = yozuv('Parolni kiriting', {bal:.4, w:900, h:120, shrift:'700 52px Inter, sans-serif', chuqurlik:false}); parolYoz.position.set(4.3, 3.55, 0); g.add(parolYoz);
  let ochiqQ = 1, ochiqMaqsad = 1;
  /* ---- DOM panel ---- */
  let panel = null, pInp = null, pNat = null, sInp = null, sNat = null;
  if(!testda){
    panel = qatlam('im-p');
    panel.innerHTML = '<div class="im-qator" style="margin-top:0"><button data-r="shifr" class="faol">Sezar shifri</button><button data-r="parol">Parol kuchi</button><button data-r="fishing">Fishing</button></div>' +
      '<div data-b="shifr"><span class="im-ust">Sezar shifri</span><div class="im-qator"><input type="text" maxlength="24" value="SALOM" aria-label="Ochiq matn"></div><div class="im-qator"><button data-k="-1">Kalit −</button><b data-kv style="font:700 15px \'JetBrains Mono\',monospace;min-width:48px;text-align:center">k = 3</b><button data-k="1">Kalit +</button></div><div class="im-natija" data-s></div><p class="im-iz">Har harf alifboda k o‘rin suriladi (A–Z, 26 harf). Ochish uchun teskari tomonga suriladi.</p></div>' +
      '<div data-b="parol" hidden><span class="im-ust">Parol kuchi (taxminiy)</span><div class="im-qator"><input type="text" value="" placeholder="Namuna parol yozing" aria-label="Parol" autocomplete="off" spellcheck="false"></div><div class="im-olchov"><i></i></div><div class="im-natija" data-p></div><p class="im-ogoh">Taxminiy hisob: sekundiga 10 mlrd urinish (kuchli kompyuterlar bilan oflayn hujum) deb olingan. Haqiqiy parolingizni bu yerga yozmang.</p></div>' +
      '<div data-b="fishing" hidden><span class="im-ust">Fishing xati</span><p style="margin:4px 0">Xatda 6 ta shubhali belgi bor. Ularni planshet ekranida bosing.</p><div class="im-natija" data-f>Topildi: 0 / 6</div></div>';
    sInp = panel.querySelector('[data-b="shifr"] input'); sNat = panel.querySelector('[data-s]');
    pInp = panel.querySelector('[data-b="parol"] input'); pNat = panel.querySelector('[data-p]');
    sInp.oninput = ()=>{ ochiq = sInp.value.toUpperCase(); shifrla(true); };
    panel.querySelectorAll('[data-k]').forEach(b=>b.onclick = ()=>{ kalitQoy(kalit + +b.dataset.k, true); });
    pInp.oninput = ()=>parolTekshir(pInp.value, true);
    panel.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>rejimQoy(b.dataset.r));
  }
  function shifrla(yub){
    const sh = sezar(ochiq, kalit);
    shifrYoz.yoz((ochiq || '—') + ' → ' + (sh || '—'));
    kalitYoz.yoz('k = ' + kalit);
    if(sNat){ sNat.innerHTML = sh + '<small>' + (ochiq ? ochiq + ' → ' + sh + ' (kalit ' + kalit + ')' : 'Matn yozing') + '</small>'; panel.querySelector('[data-kv]').textContent = 'k = ' + kalit; }
    if(yub) hodisa('im-shifr', {kalit, ochiq, shifr:sh});
  }
  function kalitQoy(k, yub){ kalit = ((k % 26) + 26) % 26; ichkiMaqsad = kalit * Math.PI * 2 / 26; shifrla(yub); if(yub) izoh.innerHTML = '<b>Kalit k = ' + kalit + '.</b> Tashqi halqadagi harf (ochiq matn) ostidagi ichki harf — shifrlangan harf. ' + (kalit === 3 ? 'Suetoniy yozishicha, Yuliy Sezar aynan 3 ga surishni ishlatgan.' : ''); }
  function parolTekshir(p, yub){
    const b = parolBaho(p), dm = DARAJA_M[b.daraja];
    segM.forEach((m, i)=>m.color.set(i < (p ? dm[2] : 0) ? dm[1] : '#2a3150'));
    ochiqMaqsad = b.daraja === 'kuchli' ? 0 : b.daraja === 'orta' ? .35 : 1;
    parolYoz.yoz(p ? dm[0] + ' · ≈ ' + Math.round(b.bit) + ' bit' : 'Parolni kiriting', p ? dm[1] : undefined);
    if(pNat){
      const ol = panel.querySelector('.im-olchov i'); ol.style.width = (p ? dm[2] * 25 : 0) + '%'; ol.style.background = dm[1];
      pNat.innerHTML = p ? dm[0] + '<small>Uzunlik: ' + b.L + ' · alifbo: ' + b.N + ' belgi · entropiya ≈ ' + Math.round(b.bit) + ' bit<br>Taxminiy tanlash vaqti: <b style="color:#fff">' + (b.keng ? 'bir zumda (keng tarqalgan parol)' : vaqtMatn(b.sek)) + '</b>' + (b.L < 15 ? '<br>Tavsiya: kamida 15 belgili parol yoki parol-ibora (NIST SP 800-63B-4).' : '') + '</small>' : '<small>Parol yozing — kuch darajasi va taxminiy vaqt chiqadi.</small>';
    }
    if(yub) hodisa('im-parol', {uzunlik:b.L, alifbo:b.N, bit:Math.round(b.bit * 10) / 10, daraja:b.daraja});
  }
  const KAM = {shifr:[3.2, new T.Vector3(-4.3, 2.3, 0)], fishing:[2.9, new T.Vector3(0, 2.1, 0)], parol:[3.0, new T.Vector3(4.3, 1.9, 0)]};
  function rejimQoy(r){
    rejim = KAM[r] ? r : null;
    if(rejim) S.fokus(KAM[r][0], KAM[r][1], true); else S.tikla();
    if(panel){ panel.querySelectorAll('[data-r]').forEach(b=>b.classList.toggle('faol', b.dataset.r === (rejim || 'shifr'))); panel.querySelectorAll('[data-b]').forEach(b=>{ b.hidden = b.dataset.b !== (rejim || 'shifr'); }); }
    faolQil(tag, '[data-rj]', tag.querySelector('[data-rj="' + (rejim || 'hammasi') + '"]'));
    izoh.innerHTML = rejim === 'shifr' ? '<b>Sezar shifri:</b> kalitni o‘zgartiring — ichki halqa buriladi. Matnni panelda yozing.' : rejim === 'parol' ? '<b>Parol kuchi:</b> panelga namuna parol yozing. Uzunlik eng muhim omil. Vaqt taxminiy.' : rejim === 'fishing' ? '<b>Fishing:</b> soxta xatdagi 6 ta belgini toping va bosing.' : 'Uchta stansiya: <b>Sezar shifri</b>, <b>fishing xati</b> va <b>parol qulfi</b>. Bosib ko‘ring.';
  }
  tugmalar(tag, [
    {m:'Hammasi', k:'h', cls:'faol', f:()=>rejimQoy(null)},
    {m:'Sezar shifri', k:'s', f:()=>rejimQoy('shifr')},
    {m:'Fishing', k:'f', f:()=>rejimQoy('fishing')},
    {m:'Parol kuchi', k:'p', f:()=>rejimQoy('parol')}, '|',
    {m:'Kalit −', f:()=>kalitQoy(kalit - 1, true)}, {m:'Kalit +', f:()=>kalitQoy(kalit + 1, true)}
  ]);
  ['hammasi', 'shifr', 'fishing', 'parol'].forEach((r, i)=>{ tag.querySelectorAll('button')[i].dataset.rj = r; });
  S.bosish = ud=>{
    if(ud.fish){ const k = ud.fish; topildi.add(k); xatTex.chiz(); izoh.innerHTML = '<b>' + FISH[k][0] + '.</b> ' + FISH[k][1] + ' <span style="opacity:.7">(' + topildi.size + ' / 6)</span>'; if(panel) panel.querySelector('[data-f]').innerHTML = 'Topildi: ' + topildi.size + ' / 6<small>' + [...topildi].map(x=>FISH[x][0]).join(' · ') + '</small>'; detal('im_xavf', k); hodisa('im-fishing', {nom:k}); return; }
    if(ud.nom === 'gildirak'){ detal('im_xavf', 'gildirak'); izoh.innerHTML = '<b>Sezar g‘ildiragi:</b> tashqi halqa — ochiq matn, ichki halqa — shifr. Kalit ' + kalit + ': A → ' + sezar('A', kalit) + '.'; return; }
    if(ud.nom === 'qulf'){ detal('im_xavf', 'qulf'); izoh.innerHTML = '<b>Parol qulfi:</b> ko‘rsatkich 4 bo‘lakdan iborat. Parol qanchalik uzun va xilma-xil bo‘lsa, qulf shunchalik mahkam yopiladi.'; return; }
    if(ud.nom === 'planshet') izoh.innerHTML = 'Xatdagi <b>shubhali joylarni</b> bosing: yuboruvchi, sarlavha, murojaat, so‘rov, havola, ilova.';
  };
  S.holat = h=>{ if(!h) return; if(h.kalit !== undefined) kalitQoy(+h.kalit, false); if(h.matn !== undefined){ ochiq = String(h.matn).toUpperCase(); if(sInp) sInp.value = ochiq; shifrla(false); } if(h.rejim !== undefined) rejimQoy(h.rejim); };
  kalitQoy(3, false); ichki.rotation.z = ichkiMaqsad; parolTekshir('', false);
  izoh.innerHTML = 'Uchta stansiya: <b>Sezar shifri</b>, <b>fishing xati</b> va <b>parol qulfi</b>. Xatdagi shubhali belgilarni bosing yoki pastdagi tugmalar bilan stansiyani tanlang.';
  S.kadrda = (dt, t)=>{
    ichki.rotation.z += (ichkiMaqsad - ichki.rotation.z) * Math.min(1, dt * 5);
    ochiqQ += (ochiqMaqsad - ochiqQ) * Math.min(1, dt * 4);
    halqa.position.y = 1.85 + ochiqQ * .35; halqa.rotation.y = ochiqQ * .9;
    korsatkich.position.y = 1.72 + Math.sin(t * 3) * .03;
  };
  S.joyla(testda ? 6.4 : 6.9, new T.Vector3(testda ? 0 : 1.6, 2.0, 0));
  return S;
};

/* ================= 7. RITM VA O‘LCHOV (im_ritm) ================= */
const OLCHOV = {'2/4':{n:2, kuch:[1, 0]}, '3/4':{n:3, kuch:[1, 0, 0]}, '4/4':{n:4, kuch:[1, 0, .5, 0]}, '6/8':{n:6, kuch:[1, 0, 0, .5, 0, 0]}};
const tempNom = b=>b < 60 ? 'Largo (juda sekin)' : b < 76 ? 'Adagio (sekin)' : b < 108 ? 'Andante (o‘rtacha, «yurish»)' : b < 120 ? 'Moderato (mo‘tadil)' : b < 168 ? 'Allegro (tez)' : 'Presto (juda tez)';
function yogoch(T, r1, r2){
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
  x.fillStyle = r1; x.fillRect(0, 0, 512, 256);
  for(let i = 0; i < 60; i++){ x.strokeStyle = 'rgba(' + r2 + ',' + (.08 + Math.random() * .2) + ')'; x.lineWidth = .6 + Math.random() * 2; x.beginPath(); let y = Math.random() * 256; x.moveTo(0, y); for(let k = 0; k <= 512; k += 16){ y += (Math.random() - .5) * 3; x.lineTo(k, y + Math.sin(k / 50 + i) * 2); } x.stroke(); }
  const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.wrapS = t.wrapT = T.RepeatWrapping; return t;
}
/* doira modeli (ritm, cholg‘u sahnalarida) */
function doiraYasa(A, r){
  const {T, mat, fiz} = A; r = r || 1;
  const q = new T.Group();
  const gM = new T.MeshStandardMaterial({map:yogoch(T, '#6a3d1c', '40,20,8'), roughness:.55}); gM.userData.env = 1; gM.envMapIntensity = .3;
  const gardish = new T.Mesh(new T.CylinderGeometry(r, r, .16 * r, 64, 1, true), gM); gardish.rotation.x = Math.PI / 2; q.add(gardish);
  const ichG = new T.Mesh(new T.CylinderGeometry(r * .94, r * .94, .16 * r, 64, 1, true), gM); ichG.rotation.x = Math.PI / 2; q.add(ichG);
  const qir = new T.Mesh(new T.RingGeometry(r * .94, r, 64), gM); qir.position.z = -.08 * r; qir.rotation.y = Math.PI; q.add(qir);
  const teriT = A.matnTex(512, 512, (x, w, h)=>{ const gr = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); gr.addColorStop(0, '#f1dfb8'); gr.addColorStop(.8, '#e2c894'); gr.addColorStop(1, '#b8945a'); x.fillStyle = gr; x.fillRect(0, 0, w, h); for(let i = 0; i < 300; i++){ x.fillStyle = 'rgba(120,80,40,' + Math.random() * .08 + ')'; x.beginPath(); x.arc(Math.random() * w, Math.random() * h, Math.random() * 6, 0, Math.PI * 2); x.fill(); } x.strokeStyle = 'rgba(90,50,20,.5)'; x.lineWidth = 6; x.beginPath(); x.arc(w / 2, h / 2, w / 2 - 20, 0, Math.PI * 2); x.stroke(); });
  const teri = new T.Mesh(new T.CircleGeometry(r * .995, 64), new T.MeshStandardMaterial({map:teriT, roughness:.8, side:T.DoubleSide})); teri.position.z = .082 * r; q.add(teri);
  /* ichki metall halqalar */
  const hM = mat('#d9dce3', {metalness:.95, roughness:.2});
  const halqalar = [];
  for(let i = 0; i < 16; i++){ const a = i / 16 * Math.PI * 2; const h = new T.Mesh(new T.TorusGeometry(.085 * r, .012 * r, 6, 18), hM); h.position.set(Math.cos(a) * r * .84, Math.sin(a) * r * .84, -.02 * r); h.rotation.set(Math.random(), Math.random(), a); q.add(h); halqalar.push(h); }
  q.userData.teri = teri; q.userData.halqalar = halqalar;
  return q;
}
R.im_ritm = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · ritm va o‘lchov · tovush brauzerda sintez qilinadi');
  const A = asos(sahna, {rx:.2, ry:-.12, rxMin:-.2, rxMax:.9, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, kut} = A;
  const O = ovozchi(); A.tozalash.push(()=>O.toxtat());
  podium(6.0, 0, '#e8508f');
  let olchov = '4/4', temp = 90, ijro = false;
  /* ---- metronom ---- */
  const mG = new T.Group(); mG.position.set(-2.7, 0, .2); g.add(mG);
  const yT = yogoch(T, '#5a2e14', '30,12,4');
  const yM = new T.MeshPhysicalMaterial({map:yT, roughness:.35, clearcoat:.8, clearcoatRoughness:.15}); yM.userData.env = 1; yM.envMapIntensity = .4;
  const pir = new T.Mesh(new T.CylinderGeometry(.32, 1.0, 3.0, 4, 1), yM); pir.rotation.y = Math.PI / 4; pir.position.y = 1.62; mG.add(pir);
  const tag0 = quti(1.75, .16, 1.75, yM, .05); tag0.position.y = .08; mG.add(tag0);
  const uch = new T.Mesh(new T.CylinderGeometry(.05, .32, .3, 4), yM); uch.rotation.y = Math.PI / 4; uch.position.y = 3.27; mG.add(uch);
  /* old yuz: shkala (oyna ortida) */
  const shT = matnTex(256, 512, (x, w, h)=>{ x.fillStyle = '#efe6d2'; x.fillRect(0, 0, w, h); x.fillStyle = '#3a2412'; x.font = '600 22px Inter, sans-serif'; x.textAlign = 'right'; [40, 60, 80, 100, 120, 144, 168, 208].forEach((b, i)=>{ const y = 470 - (b - 40) / 168 * 430; x.fillRect(150, y - 1, 60, 3); x.fillText(b, 142, y + 8); }); x.textAlign = 'left'; x.font = '700 20px Inter, sans-serif'; x.fillText('M.M.', 160, 30); });
  const shk = new T.Mesh(new T.PlaneGeometry(.42, 2.2), new T.MeshStandardMaterial({map:shT, roughness:.6})); shk.position.set(0, 1.72, .56); shk.rotation.x = -Math.atan(.68 / 3.0) * .95; mG.add(shk);
  const mayatnik = new T.Group(); mayatnik.position.set(0, .45, .72); mG.add(mayatnik);
  const tayoqM = silindr(.022, .022, 2.8, mat('#d0d4dc', {metalness:.95, roughness:.2}), 10); tayoqM.position.y = 1.4; mayatnik.add(tayoqM);
  const yuk = quti(.26, .22, .12, mat('#c9a64a', {metalness:.9, roughness:.25}), .04); mayatnik.add(yuk);
  mayatnik.rotation.x = -Math.atan(.68 / 3.0) * .95;
  bosiladigan(mG, 'metronom');
  soya(2.4, 2.4, -2.7, .2, 0, .8);
  /* ---- doira (stendda) ---- */
  const dG = doiraYasa(A, 1.05); dG.position.set(2.6, 1.9, .1); dG.rotation.set(-.12, -.35, 0); g.add(dG);
  const stend = silindr(.05, .05, 1.0, mat('#22252e', {metalness:.8, roughness:.3}), 12); stend.position.set(2.6, .5, -.1); g.add(stend);
  const stendA = silindr(.45, .5, .08, mat('#22252e', {metalness:.8, roughness:.3}), 32); stendA.position.set(2.6, .04, -.1); g.add(stendA);
  bosiladigan(dG, 'doira'); soya(2, 1.6, 2.6, 0, 0, .7);
  /* ---- nota pulti ---- */
  const pG = new T.Group(); pG.position.set(0, 0, -1.6); g.add(pG);
  const pT = matnTex(1024, 400, ()=>{});
  const pult = quti(3.0, 1.2, .06, mat('#1a1d26', {metalness:.6, roughness:.35}), .03); pult.position.y = 2.3; pult.rotation.x = -.25; pG.add(pult);
  const var_ = new T.Mesh(new T.PlaneGeometry(2.85, 1.11), new T.MeshBasicMaterial({map:pT, toneMapped:false})); var_.position.set(0, 2.3, .04); var_.rotation.x = -.25; var_.position.z += .01; pG.add(var_);
  const pOy = silindr(.03, .03, 1.8, mat('#1a1d26', {metalness:.8}), 8); pOy.position.y = .9; pG.add(pOy);
  function notaChiz(){
    const x = pT.x, w = 1024, h = 400, o = OLCHOV[olchov];
    x.fillStyle = '#f4efe3'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#2a2620'; x.lineWidth = 2.2;
    const y0 = 130, dy = 26;
    for(let i = 0; i < 5; i++){ x.beginPath(); x.moveTo(40, y0 + i * dy); x.lineTo(w - 30, y0 + i * dy); x.stroke(); }
    const [a, b] = olchov.split('/');
    x.fillStyle = '#2a2620'; x.font = '900 60px Georgia, serif'; x.textAlign = 'center'; x.fillText(a, 95, y0 + 50); x.fillText(b, 95, y0 + 104);
    const taktlar = 2, eni = (w - 190) / taktlar;
    for(let tk = 0; tk < taktlar; tk++){
      const bx = 160 + tk * eni;
      for(let i = 0; i < o.n; i++){
        const nx = bx + 30 + i * (eni - 60) / o.n, ny = y0 + 2 * dy + (i === 0 ? -dy / 2 : 0);
        x.save(); x.translate(nx, ny); x.rotate(-.35); x.beginPath(); x.ellipse(0, 0, 15, 10.5, 0, 0, Math.PI * 2); x.fill(); x.restore();
        x.fillRect(nx + 12, ny - 78, 3, 78);
        if(b === '8'){ x.beginPath(); x.moveTo(nx + 15, ny - 78); x.quadraticCurveTo(nx + 40, ny - 50, nx + 30, ny - 30); x.lineWidth = 4; x.stroke(); x.lineWidth = 2.2; }
        const k = o.kuch[i]; if(k > 0){ x.font = '800 30px Inter, sans-serif'; x.fillStyle = k === 1 ? '#c2185b' : '#b8862b'; x.fillText('>', nx, y0 - 22); x.fillStyle = '#2a2620'; }
      }
      x.fillRect(bx + eni - 4, y0, 3, 4 * dy);
    }
    x.fillRect(w - 38, y0, 6, 4 * dy); x.fillRect(w - 48, y0, 2.5, 4 * dy);
    x.font = '700 30px Inter, sans-serif'; x.textAlign = 'left'; x.fillStyle = '#5a4a3a'; x.fillText(olchov + ' — taktda ' + o.n + ' hissa' + (b === '8' ? ' (sakkizlik)' : ' (chorak)') + ' · ♩ = ' + temp, 40, 60);
    x.font = '600 26px Inter, sans-serif'; x.fillStyle = '#c2185b'; x.fillText('>  — kuchli hissa', 40, h - 36); if(o.kuch.includes(.5)){ x.fillStyle = '#b8862b'; x.fillText('>  — nisbiy kuchli hissa', 330, h - 36); }
    pT.needsUpdate = true;
  }
  /* ---- hissa chiroqlari ---- */
  const chG = new T.Group(); chG.position.set(0, 0, 1.75); g.add(chG);
  let chiroqlar = [];
  function chiroqQur(){
    while(chG.children.length){ const c = chG.children.pop(); c.traverse(o2=>{ if(o2.geometry) o2.geometry.dispose(); if(o2.material) o2.material.dispose(); }); }
    const o = OLCHOV[olchov]; chiroqlar = [];
    for(let i = 0; i < o.n; i++){
      const k = o.kuch[i], r = k === 1 ? .3 : k === .5 ? .23 : .18;
      const x = (i - (o.n - 1) / 2) * .78;
      const asosC = silindr(r * 1.25, r * 1.4, .12, fiz('#1d2336', {metalness:.5, roughness:.3}), 32); asosC.position.set(x, .06, 0); chG.add(asosC);
      const sh = new T.Mesh(new T.SphereGeometry(r, 32, 20), new T.MeshStandardMaterial({color:new T.Color(k === 1 ? '#ff5b8a' : k === .5 ? '#ffb347' : '#5cc8ff').convertSRGBToLinear(), emissive:new T.Color(k === 1 ? '#ff2d6e' : k === .5 ? '#ff9a3c' : '#2a8fd6'), emissiveIntensity:.1, roughness:.25, metalness:.1}));
      sh.position.set(x, .12 + r, 0); sh.userData = {nom:'hissa_' + (i + 1), hissa:i + 1, kuchli:k === 1, nisbiy:k === .5}; chG.add(sh);
      const n = yozuv(String(i + 1), {bal:.22, w:96, h:96, fon:false, rang:'#9aa3c7', shrift:'800 64px "JetBrains Mono", monospace'}); n.position.set(x, .08, r + .32); chG.add(n);
      chiroqlar.push({sh, k, r});
    }
  }
  const tempYoz = yozuv('', {bal:.36, w:900, h:120, shrift:'700 48px Inter, sans-serif', chuqurlik:false}); tempYoz.position.set(-2.7, 3.95, .2); g.add(tempYoz);
  /* ---- vaqt ---- */
  let t0 = performance.now() / 1000, oxirgiHissa = -1, acBosh = 0, rejaIdx = 0;
  const rebase = ()=>{ t0 = performance.now() / 1000; oxirgiHissa = -1; if(ijro && AC){ acBosh = AC.currentTime + .08; rejaIdx = 0; } };
  function tovushHissa(i, vaqt){
    const k = OLCHOV[olchov].kuch[i % OLCHOV[olchov].n];
    const kech = Math.max(0, vaqt - AC.currentTime);
    if(k === 1){ O.zarb(160, .35, {tur:'lowpass', q:.8, vol:.55, kech, past:82, pastVol:.5}); O.ton(1760, .05, {vol:.16, kech, hujum:.002}); }
    else if(k === .5){ O.zarb(900, .22, {tur:'lowpass', q:.9, vol:.4, kech, past:120, pastVol:.28}); O.ton(1320, .05, {vol:.12, kech, hujum:.002}); }
    else { O.zarb(2600, .12, {tur:'bandpass', q:1.4, vol:.45, kech}); O.ton(1050, .04, {vol:.09, kech, hujum:.002}); }
  }
  function olchovQoy(o, yub){
    if(!OLCHOV[o]) return; olchov = o; chiroqQur(); notaChiz(); rebase(); yozTemp();
    faolQil(tag, '[data-o]', tag.querySelector('[data-o="' + o + '"]'));
    const k = OLCHOV[o];
    izoh.innerHTML = '<b>' + o + '</b> — taktda ' + k.n + ' ta ' + (o === '6/8' ? 'sakkizlik' : 'chorak') + ' hissa. Kuchli hissa — 1-hissa' + (o === '4/4' ? ', 3-hissa — nisbiy kuchli' : o === '6/8' ? ', 4-hissa — nisbiy kuchli' : '') + '. ' + (o === '2/4' ? 'Marsh va raqs kuylari ko‘p shu o‘lchovda.' : o === '3/4' ? 'Vals o‘lchovi: «kuchli — kuchsiz — kuchsiz».' : o === '4/4' ? 'Eng keng tarqalgan o‘lchov.' : 'Murakkab o‘lchov: ikki guruh, har birida 3 tadan sakkizlik.');
    if(yub){ detal('im_ritm', 'olchov_' + o.replace('/', '')); hodisa('im-olchov', {olchov, temp}); }
  }
  function yozTemp(){ tempYoz.yoz(olchov + ' · ♩ = ' + temp + ' · ' + tempNom(temp).split(' (')[0]); const l = tag.querySelector('[data-tl]'); if(l) l.textContent = temp + ' BPM'; }
  function tempQoy(b, yub){ temp = Math.max(40, Math.min(208, Math.round(b))); rebase(); yozTemp(); notaChiz(); const r = tag.querySelector('input[type=range]'); if(r && +r.value !== temp) r.value = temp; if(yub){ izoh.innerHTML = '<b>♩ = ' + temp + '</b> — daqiqada ' + temp + ' zarba: har hissa ' + (60 / temp).toFixed(2).replace('.', ',') + ' soniya. Temp: ' + tempNom(temp) + ' <span style="opacity:.7">(chegaralar taxminiy)</span>.'; hodisa('im-olchov', {olchov, temp}); } }
  function ijroQoy(v){
    ijro = v; const b = tag.querySelector('[data-ijro]');
    if(v){ if(!audio()){ ijro = false; izoh.innerHTML = 'Brauzer tovushni qo‘llab-quvvatlamadi.'; return; } rebase(); }
    else O.toxtat();
    if(b){ b.classList.toggle('faol', ijro); b.innerHTML = ijro ? '■ To‘xtatish' : '▶ Ovoz bilan'; }
    hodisa('im-ijro', {ijro, olchov, temp});
  }
  tag.innerHTML = '';
  ['2/4', '3/4', '4/4', '6/8'].forEach(o=>{ const b = el('button', o === olchov ? 'faol' : '', o); b.dataset.o = o; b.onclick = ()=>olchovQoy(o, true); tag.append(b); });
  tag.append(el('span', 'tag-ajr'));
  const lab = el('label', '', '<span>Temp</span><input type="range" min="40" max="208" step="1" value="90" aria-label="Temp (BPM)"><b data-tl style="min-width:62px">90 BPM</b>');
  lab.style.minWidth = '210px'; tag.append(lab);
  lab.querySelector('input').oninput = e=>tempQoy(+e.target.value, false);
  lab.querySelector('input').onchange = e=>tempQoy(+e.target.value, true);
  const ib = el('button', '', '▶ Ovoz bilan'); ib.dataset.ijro = 1; ib.onclick = ()=>ijroQoy(!ijro); tag.append(ib);
  S.bosish = ud=>{
    if(ud.hissa){ const i = ud.hissa - 1; chiroqlar[i] && (chiroqlar[i].puls = 1); if(!ijro && audio()) tovushHissa(i, AC.currentTime); izoh.innerHTML = '<b>' + ud.hissa + '-hissa</b> — ' + (ud.kuchli ? '<b>kuchli</b> hissa (taktning boshi, urg‘u tushadi).' : ud.nisbiy ? '<b>nisbiy kuchli</b> hissa.' : 'kuchsiz hissa.'); detal('im_ritm', 'hissa'); hodisa('im-hissa', {raqam:ud.hissa, kuchli:!!ud.kuchli, nisbiy:!!ud.nisbiy}); return; }
    if(ud.nom === 'metronom' || ud.nom === 'doira'){ if(ud.nom === 'doira' && audio()){ O.zarb(160, .35, {tur:'lowpass', q:.8, vol:.55, past:82, pastVol:.5}); dPuls = 1; } detal('im_ritm', ud.nom); hodisa('im-ritm', {nom:ud.nom}); izoh.innerHTML = ud.nom === 'metronom' ? '<b>Metronom</b> — tempni aniq ko‘rsatuvchi asbob. Mayatnik har chekkaga yetganda bitta hissa o‘tadi. Yukni pastga tushirsangiz — tezlashadi.' : '<b>Doira</b> — o‘zbek zarbli cholg‘usi. Markazidan urilsa past «bum», chetidan — jarangdor «bak» tovushi chiqadi.'; }
  };
  S.holat = h=>{ if(!h) return; if(h.olchov) olchovQoy(h.olchov, false); if(h.temp) tempQoy(h.temp, false); };
  let dPuls = 0;
  S.kadrda = (dt, t)=>{
    const now = performance.now() / 1000, sek = 60 / temp, o = OLCHOV[olchov];
    const bt = (now - t0) / sek, hi = Math.floor(bt);
    /* mayatnik: hissada chekkada */
    mayatnik.rotation.z = Math.cos(Math.PI * bt) * .42;
    yuk.position.y = .9 + (temp - 40) / 168 * -.55 + 1.1;
    if(hi !== oxirgiHissa){
      oxirgiHissa = hi; const i = ((hi % o.n) + o.n) % o.n;
      if(chiroqlar[i]) chiroqlar[i].puls = 1;
      dPuls = o.kuch[i] === 1 ? 1 : o.kuch[i] === .5 ? .7 : .45;
    }
    if(ijro && AC){
      while(acBosh + rejaIdx * sek < AC.currentTime + .25){ tovushHissa(rejaIdx, acBosh + rejaIdx * sek); rejaIdx++; }
    }
    chiroqlar.forEach(c=>{ c.puls = Math.max(0, (c.puls || 0) - dt * 2.6); c.sh.material.emissiveIntensity = .1 + c.puls * 1.6; c.sh.scale.setScalar(1 + c.puls * .18); });
    dPuls = Math.max(0, dPuls - dt * 3);
    dG.userData.teri.scale.setScalar(1 - dPuls * .01); dG.userData.teri.position.z = .086 - dPuls * .03;
    dG.userData.halqalar.forEach((h, i)=>{ h.rotation.x += dPuls * .3 * Math.sin(i * 7 + t * 30); });
    dG.position.y = 1.9 + Math.sin(t * 20) * dPuls * .012;
  };
  olchovQoy('4/4', false); tempQoy(90, false);
  izoh.innerHTML = 'Metronom mayatnigi har chekkaga yetganda <b>bitta hissa</b> o‘tadi. Chiroqlar taktdagi hissalarni ko‘rsatadi: katta qizili — <b>kuchli</b> hissa. Ovozni eshitish uchun «▶ Ovoz bilan» ni bosing.';
  S.joyla(4.9, new T.Vector3(0, 1.75, 0));
  return S;
};

/* ================= 8. O‘ZBEK XALQ CHOLG‘ULARI (im_cholgu) ================= */
const CH = {
  dutor:{nom:'Dutor', guruh:'torli_chertma', iz:'ikki torli, chertib chalinadigan cholg‘u; nomi forscha «du» — ikki, «tor» — tor.'},
  tanbur:{nom:'Tanbur', guruh:'torli_chertma', iz:'uzun dastali, metall torli cholg‘u; noxun bilan chalinadi, Shashmaqomning asosiy cholg‘usi.'},
  gijjak:{nom:'G‘ijjak', guruh:'torli_kamon', iz:'kamon bilan chalinadigan torli cholg‘u; kosasiga teri tortilgan, pastida tayanch oyog‘i bor.'},
  chang:{nom:'Chang', guruh:'torli_zarb', iz:'ko‘p torli, ikki yengil cho‘p bilan urib chalinadigan cholg‘u; trapetsiya shaklida.'},
  nay:{nom:'Nay', guruh:'damli', iz:'ko‘ndalang (yonlama) chalinadigan puflama cholg‘u; 6 ta barmoq teshigi bor.'},
  surnay:{nom:'Surnay', guruh:'damli', iz:'qo‘sh qamish tilchali, baland va o‘tkir ovozli puflama cholg‘u; karnay va doira bilan bayramlarda chalinadi.'},
  doira:{nom:'Doira', guruh:'zarbli', iz:'gardishiga teri tortilgan zarbli cholg‘u; ichida metall halqalar bor.'}
};
const GURUH_NOM = {torli_chertma:'torli — chertib chalinadigan', torli_kamon:'torli — kamonli', torli_zarb:'torli — urib chalinadigan', damli:'puflab chalinadigan (damli)', zarbli:'zarbli'};
R.im_cholgu = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · o‘zbek xalq cholg‘ulari · modellar sxematik, tovush sintez');
  const A = asos(sahna, {rx:.3, ry:0, rxMin:-.1, rxMax:1.0, ryMin:-1.1, ryMax:1.1, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila} = A;
  const O = ovozchi(); A.tozalash.push(()=>O.toxtat());
  podium(6.6, 0, '#e8508f');
  const tutM = (()=>{ const m = new T.MeshPhysicalMaterial({map:yogoch(T, '#7a4520', '40,18,6'), roughness:.35, clearcoat:.9, clearcoatRoughness:.15}); m.userData.env = 1; m.envMapIntensity = .45; return m; })();
  const ochM = (()=>{ const m = new T.MeshPhysicalMaterial({map:yogoch(T, '#c89a5c', '110,70,30'), roughness:.4, clearcoat:.7}); m.userData.env = 1; m.envMapIntensity = .4; return m; })();
  const qoraM = mat('#1a120c', {roughness:.5});
  const suyakM = mat('#efe6d0', {roughness:.4});
  const torM = mat('#e9edf5', {metalness:.9, roughness:.2});
  const torIpak = mat('#f3e7c6', {roughness:.6});
  /* nok shaklidagi kosa (lathe) */
  function kosa(r, uz, qalin){
    const pts = []; for(let i = 0; i <= 16; i++){ const t = i / 16; const y = -uz / 2 + t * uz; const rr = r * Math.sin(Math.PI * Math.pow(t, .8)) * (1 - .35 * t); pts.push(new T.Vector2(Math.max(.001, rr), y)); }
    const geo = new T.LatheGeometry(pts, 40, 0, Math.PI); const m = new T.Mesh(geo, tutM); m.rotation.y = -Math.PI / 2; m.scale.z = qalin || .6; return m;
  }
  function yuza(r, uz){ const s = new T.Shape(); const n = 24; for(let i = 0; i <= n; i++){ const t = i / n, y = -uz / 2 + t * uz, rr = r * Math.sin(Math.PI * Math.pow(t, .8)) * (1 - .35 * t); if(i === 0) s.moveTo(rr, y); else s.lineTo(rr, y); } for(let i = n; i >= 0; i--){ const t = i / n, y = -uz / 2 + t * uz, rr = r * Math.sin(Math.PI * Math.pow(t, .8)) * (1 - .35 * t); s.lineTo(-rr, y); } return new T.Mesh(new T.ShapeGeometry(s), ochM); }
  /* uzun dastali torli (dutor, tanbur) */
  function uzunTorli(o){
    const q = new T.Group();
    const k = kosa(o.r, o.uz, o.qalin); q.add(k);
    const yz = yuza(o.r, o.uz); yz.position.z = .002; q.add(yz);
    if(o.teshik){ for(let i = 0; i < 5; i++){ const d = new T.Mesh(new T.CircleGeometry(.018, 10), qoraM); d.position.set((i - 2) * .05, o.uz * .05 + Math.abs(i - 2) * .02, .006); q.add(d); } }
    const dasta = quti(o.dEn, o.dUz, .06, tutM, .02); dasta.position.set(0, o.uz / 2 + o.dUz / 2 - .05, .01); q.add(dasta);
    const bosh = quti(o.dEn * 1.25, .45, .08, tutM, .03); bosh.position.set(0, o.uz / 2 + o.dUz + .17, 0); q.add(bosh);
    for(let i = 0; i < o.tor; i++){ const p = silindr(.018, .026, .18, suyakM, 8); p.rotation.z = Math.PI / 2; p.position.set((i % 2 ? 1 : -1) * (o.dEn * .62 + .07), o.uz / 2 + o.dUz + .05 + Math.floor(i / 2) * .13 + (i % 2) * .06, 0); q.add(p); }
    for(let i = 0; i < o.parda; i++){ const y = o.uz / 2 + .05 + o.dUz * (1 - Math.pow(.94, i + 1)) * 1.05; if(y > o.uz / 2 + o.dUz - .08) break; const pr = new T.Mesh(new T.TorusGeometry(o.dEn * .62, .006, 4, 12), o.metallParda ? torM : torIpak); pr.rotation.x = Math.PI / 2; pr.scale.set(1, .6, 1); pr.position.set(0, y, .01); q.add(pr); }
    const xarrak = quti(o.dEn * 1.1, .03, .05, suyakM, .01); xarrak.position.set(0, -o.uz * .28, .03); q.add(xarrak);
    const torlar = [];
    for(let i = 0; i < o.tor; i++){ const x = (i - (o.tor - 1) / 2) * o.dEn * .28; const a = new T.Vector3(x, -o.uz * .28, .06), b = new T.Vector3(x * .8, o.uz / 2 + o.dUz - .02, .045); const t = silindr(o.torQ || .004, o.torQ || .004, a.distanceTo(b), o.metallTor ? torM : torIpak, 5); t.position.copy(a).add(b).multiplyScalar(.5); t.lookAt(b); t.rotateX(Math.PI / 2); q.add(t); torlar.push(t); }
    q.userData.torlar = torlar; return q;
  }
  const M = {};
  M.dutor = uzunTorli({r:.42, uz:.95, qalin:.55, dEn:.1, dUz:1.55, tor:2, parda:14, teshik:true, metallTor:false});
  M.tanbur = uzunTorli({r:.3, uz:.7, qalin:.7, dEn:.085, dUz:2.25, tor:3, parda:17, metallTor:true, metallParda:false, torQ:.003});
  /* g‘ijjak */
  M.gijjak = (()=>{ const q = new T.Group();
    const kosaG = new T.Mesh(new T.SphereGeometry(.34, 32, 20, 0, Math.PI * 2, 0, Math.PI * .62), tutM); kosaG.rotation.x = -Math.PI / 2; kosaG.position.z = -.02; q.add(kosaG);
    const teri = new T.Mesh(new T.CircleGeometry(.3, 36), mat('#e8d2a4', {roughness:.8})); teri.position.z = .1; q.add(teri);
    const oyoq = silindr(.03, .012, .55, mat('#c9ced8', {metalness:.9, roughness:.25}), 10); oyoq.position.y = -.55; q.add(oyoq);
    const dasta = silindr(.035, .045, 1.25, tutM, 12); dasta.position.y = .9; q.add(dasta);
    const bosh = quti(.12, .32, .1, tutM, .03); bosh.position.y = 1.65; q.add(bosh);
    for(let i = 0; i < 4; i++){ const p = silindr(.015, .022, .16, suyakM, 8); p.rotation.z = Math.PI / 2; p.position.set(i % 2 ? .12 : -.12, 1.55 + Math.floor(i / 2) * .13, 0); q.add(p); }
    for(let i = 0; i < 4; i++){ const x = (i - 1.5) * .02; const a = new T.Vector3(x, -.15, .13), b = new T.Vector3(x * .6, 1.5, .05); const t = silindr(.003, .003, a.distanceTo(b), torM, 4); t.position.copy(a).add(b).multiplyScalar(.5); t.lookAt(b); t.rotateX(Math.PI / 2); q.add(t); }
    const kamon = new T.Group(); kamon.position.set(.05, .1, .25); kamon.rotation.z = -1.05; q.add(kamon);
    const eg = new T.QuadraticBezierCurve3(new T.Vector3(-.85, 0, 0), new T.Vector3(0, .12, 0), new T.Vector3(.85, 0, 0));
    kamon.add(new T.Mesh(new T.TubeGeometry(eg, 20, .012, 6, false), tutM));
    const qil = quti(1.66, .002, .02, mat('#f4efe0', {roughness:.8}), .001); qil.position.y = -.02; kamon.add(qil);
    q.userData.kamon = kamon; return q; })();
  /* chang */
  M.chang = (()=>{ const q = new T.Group();
    const s = new T.Shape(); s.moveTo(-.95, -.4); s.lineTo(.95, -.4); s.lineTo(.6, .4); s.lineTo(-.6, .4); s.lineTo(-.95, -.4);
    const qut = new T.Mesh(new T.ExtrudeGeometry(s, {depth:.14, bevelEnabled:true, bevelThickness:.02, bevelSize:.02, bevelSegments:2}), tutM); q.add(qut);
    const ust = new T.Mesh(new T.ShapeGeometry(s), ochM); ust.position.z = .165; q.add(ust);
    [-.35, .35].forEach(x=>{ const d = new T.Mesh(new T.CircleGeometry(.07, 20), qoraM); d.position.set(x, -.05, .168); q.add(d); });
    const pos = []; for(let i = 0; i < 40; i++){ const y = -.34 + i * .018; const w = .95 - (y + .4) / .8 * .35; pos.push(-w + .04, y, .2, w - .04, y, .2); }
    const lg = new T.BufferGeometry(); lg.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    q.add(new T.LineSegments(lg, new T.LineBasicMaterial({color:0xe9edf5, transparent:true, opacity:.85})));
    [-.2, .45].forEach((x, i)=>{ const b2 = quti(.03, .74, .05, suyakM, .01); b2.position.set(x, 0, .2); b2.rotation.z = i ? .12 : -.08; q.add(b2); });
    const chop = [];
    [-.15, .12].forEach((x, i)=>{ const c = new T.Group(); const t = silindr(.008, .008, .7, mat('#d9b98a', {roughness:.5}), 6); t.rotation.z = Math.PI / 2 - .3; c.add(t); const u = new T.Mesh(new T.SphereGeometry(.025, 10, 8), mat('#6a3d1c')); u.position.set(-.33, -.1, 0); c.add(u); c.position.set(x, .08 + i * .06, .3); q.add(c); chop.push(c); });
    q.rotation.x = -Math.PI / 2 + .45; q.userData.chop = chop; return q; })();
  /* nay */
  M.nay = (()=>{ const q = new T.Group();
    const naM = new T.MeshPhysicalMaterial({color:new T.Color('#c9a64a').convertSRGBToLinear(), metalness:.85, roughness:.25, clearcoat:.6}); naM.userData.env = 1; naM.envMapIntensity = .5;
    const tr = silindr(.05, .05, 2.1, naM, 24); tr.rotation.z = Math.PI / 2; q.add(tr);
    const puf = new T.Mesh(new T.CircleGeometry(.022, 12), qoraM); puf.position.set(-.8, .05, 0); puf.rotation.x = -Math.PI / 2; q.add(puf);
    for(let i = 0; i < 6; i++){ const t = new T.Mesh(new T.CircleGeometry(.017, 12), qoraM); t.position.set(.05 + i * .13 + (i > 2 ? .08 : 0), .051, 0); t.rotation.x = -Math.PI / 2; q.add(t); }
    [-1.0, -.45, .95].forEach(x=>{ const b = new T.Mesh(new T.TorusGeometry(.052, .006, 6, 24), mat('#8a6326', {metalness:.8, roughness:.3})); b.rotation.y = Math.PI / 2; b.position.x = x; q.add(b); });
    q.rotation.z = .12; return q; })();
  /* surnay */
  M.surnay = (()=>{ const q = new T.Group();
    const pts = [new T.Vector2(.03, 0), new T.Vector2(.045, .3), new T.Vector2(.06, .9), new T.Vector2(.09, 1.25), new T.Vector2(.2, 1.42), new T.Vector2(.26, 1.46)];
    const tana = new T.Mesh(new T.LatheGeometry(pts, 32), tutM); tana.rotation.x = Math.PI; tana.position.y = 1.46; q.add(tana);
    for(let i = 0; i < 7; i++){ const t = new T.Mesh(new T.CircleGeometry(.014, 10), qoraM); t.position.set(0, 1.18 - i * .1, .058 - i * .002 + .005); q.add(t); }
    const disk = silindr(.08, .08, .015, mat('#c9ced8', {metalness:.9, roughness:.2}), 24); disk.position.y = 1.52; q.add(disk);
    const naycha = silindr(.012, .018, .16, mat('#c9ced8', {metalness:.9, roughness:.2}), 10); naycha.position.y = 1.6; q.add(naycha);
    const qamish = quti(.03, .05, .01, mat('#d9b98a'), .004); qamish.position.y = 1.7; q.add(qamish);
    [.25, .6, .95].forEach(y=>{ const b = new T.Mesh(new T.TorusGeometry(.05 + y * .012, .006, 6, 20), mat('#c9ced8', {metalness:.9})); b.rotation.x = Math.PI / 2; b.position.y = 1.46 - y; q.add(b); });
    q.position.y = -.7; return q; })();
  M.doira = doiraYasa(A, .55);
  /* joylash: yarim doira bo‘ylab stendlarda */
  const TARTIB = ['dutor', 'tanbur', 'gijjak', 'chang', 'nay', 'surnay', 'doira'];
  const J = {};
  TARTIB.forEach((k, i)=>{
    const a = (i - 3) * .42, R0 = 4.1;
    const x = Math.sin(a) * R0, z = -Math.cos(a) * R0 + 3.3;
    const st = new T.Group(); st.position.set(x, 0, z); st.rotation.y = -a; g.add(st);
    const p = silindr(.55, .62, .22, mat('#1d2336', {metalness:.3, roughness:.55, env:.15}), 40); p.position.y = .11; st.add(p);
    const nur = new T.Mesh(new T.TorusGeometry(.59, .012, 6, 48), new T.MeshBasicMaterial({color:0xe8508f, toneMapped:false, transparent:true, opacity:.7})); nur.rotation.x = Math.PI / 2; nur.position.y = .21; st.add(nur);
    const m = M[k]; st.add(m);
    if(k === 'dutor'){ m.position.set(0, .74, 0); m.rotation.set(-.12, 0, .12); }
    else if(k === 'tanbur'){ m.position.set(0, .6, 0); m.rotation.set(-.12, 0, .1); m.scale.setScalar(.95); }
    else if(k === 'gijjak'){ m.position.set(0, .88, 0); m.rotation.set(-.1, 0, .08); }
    else if(k === 'chang'){ m.position.set(0, .62, 0); const oy = silindr(.03, .03, .4, mat('#22252e', {metalness:.8}), 8); oy.position.y = .4; st.add(oy); }
    else if(k === 'nay'){ m.position.set(0, 1.0, 0); const oy = silindr(.02, .02, .8, mat('#22252e', {metalness:.8}), 8); oy.position.y = .6; st.add(oy); }
    else if(k === 'surnay'){ m.position.set(0, .95, 0); m.rotation.z = .1; }
    else if(k === 'doira'){ m.position.set(0, .95, 0); m.rotation.x = -.15; const oy = silindr(.03, .03, .45, mat('#22252e', {metalness:.8}), 8); oy.position.y = .4; st.add(oy); }
    bosiladigan(m, k, {cholgu:k}); bosiladigan(p, k, {cholgu:k});
    soya(1.6, 1.6, x, z, 0, .7);
    const y = yozuv(CH[k].nom, {bal:.36, w:384, h:110, shrift:'800 56px Inter, sans-serif', chuqurlik:false}); y.position.set(x, k === 'tanbur' ? 2.55 : k === 'dutor' ? 2.5 : 2.35, z); g.add(y);
    J[k] = new T.Vector3(x, 1.2, z);
  });
  /* ---- tovush ---- */
  const kuy = (notalar, f)=>{ let t = 0; notalar.forEach(([m, d])=>{ f(midiF(m), d, t); t += d; }); };
  function chal(k){
    if(!audio()) return;
    if(k === 'dutor') kuy([[55, .45], [59, .45], [62, .45], [60, .9]], (f, d, t)=>{ O.chertma(f, 1.6, {kech:t, yut:.994, yorqin:.55, vol:.45, filtr:{f:2600}}); O.chertma(f * .75, 1.2, {kech:t, yut:.993, vol:.18, filtr:{f:1800}}); });
    else if(k === 'tanbur') kuy([[57, .35], [59, .35], [60, .35], [62, .35], [60, .7]], (f, d, t)=>{ O.chertma(f, 2.2, {kech:t, yut:.998, yorqin:.3, vol:.35}); O.chertma(f * 1.5, 1.6, {kech:t + .01, yut:.997, yorqin:.3, vol:.08}); });
    else if(k === 'gijjak') kuy([[64, .5], [67, .5], [69, 1.1]], (f, d, t)=>{ O.ton(f, d + .05, {kech:t, tip:'sawtooth', vol:.12, hujum:.08, ushlab:true, sonish:.12, vibrato:{tez:5.5, chuq:.008, kech:.12}, filtr:{f:2400, q:1.2}}); });
    else if(k === 'chang') kuy([[67, .12], [67, .12], [67, .12], [71, .12], [71, .12], [74, .5]], (f, d, t)=>{ O.chertma(f, 1.2, {kech:t, yut:.996, yorqin:.25, vol:.3}); O.chertma(f * 2, .8, {kech:t, yut:.995, yorqin:.25, vol:.08}); });
    else if(k === 'nay') kuy([[72, .45], [74, .45], [76, 1.0]], (f, d, t)=>{ O.ton(f, d + .05, {kech:t, garm:[1, .12, .05], vol:.2, hujum:.07, ushlab:true, vibrato:{tez:5, chuq:.006, kech:.2}}); O.zarb(3000, d, {kech:t, tur:'highpass', vol:.025, egri:.5}); });
    else if(k === 'surnay') kuy([[69, .3], [72, .3], [74, .3], [72, .8]], (f, d, t)=>{ O.ton(f, d + .03, {kech:t, garm:[1, .9, .75, .6, .5, .42, .35, .3, .25], vol:.11, hujum:.03, ushlab:true, vibrato:{tez:6, chuq:.004}, filtr:{tur:'peaking' === 'x' ? 'lowpass' : 'lowpass', f:3200, q:2}}); });
    else if(k === 'doira'){ [[0, 'bum'], [.3, 'bak'], [.45, 'bak'], [.75, 'bum'], [1.05, 'bak']].forEach(([t, z])=>{ if(z === 'bum') O.zarb(150, .35, {kech:t, tur:'lowpass', q:.8, vol:.55, past:85, pastVol:.45}); else O.zarb(2800, .14, {kech:t, tur:'bandpass', q:1.3, vol:.5}); }); puls.doira = 1.2; }
    puls[k] = Math.max(puls[k] || 0, 1.2);
  }
  const puls = {};
  let tanlangan = null;
  function tanla(k, fok){
    tanlangan = k; belgila(k ? [k] : [], '#e8508f', .35);
    if(k){ izoh.innerHTML = '<b>' + CH[k].nom + '</b> — ' + CH[k].iz + ' <span style="opacity:.75">Guruh: ' + GURUH_NOM[CH[k].guruh] + '.</span>'; if(fok) S.fokus(2.3, J[k], true); }
    faolQil(tag, '[data-c]', k ? tag.querySelector('[data-c="' + k + '"]') : null);
  }
  function guruhYorit(gr){ const r = TARTIB.filter(k=>CH[k].guruh === gr || (gr === 'torli' && CH[k].guruh.startsWith('torli'))); belgila(r, '#ffb347', .35); izoh.innerHTML = '<b>' + (gr === 'torli' ? 'Torli cholg‘ular' : GURUH_NOM[gr][0].toUpperCase() + GURUH_NOM[gr].slice(1)) + ':</b> ' + r.map(k=>CH[k].nom).join(', ') + '.'; }
  tugmalar(tag, [
    ...TARTIB.map(k=>({m:CH[k].nom, k:'c_' + k, f:()=>{ tanla(k, true); chal(k); detal('im_cholgu', k); hodisa('im-cholgu', {nom:k, guruh:CH[k].guruh}); }})), '|',
    {m:'Hammasi', f:()=>{ tanla(null); S.tikla(); izoh.innerHTML = BOSH; }},
    {m:'■', t:'Tovushni to‘xtatish', f:()=>O.toxtat()}
  ]);
  TARTIB.forEach((k, i)=>{ tag.querySelectorAll('button')[i].dataset.c = k; });
  const BOSH = 'Cholg‘uni <b>bosing</b> — uning qisqa ohangi sintez qilinadi (yozuv emas, taxminiy tembr) va karta chiqadi. Chapdan: torli, o‘ngda damli va zarbli cholg‘ular.';
  izoh.innerHTML = BOSH;
  S.bosish = ud=>{ const k = ud.cholgu; if(!k) return; tanla(k, false); chal(k); detal('im_cholgu', k); hodisa('im-cholgu', {nom:k, guruh:CH[k].guruh}); };
  S.holat = h=>{ if(!h) return; if(h.cholgu !== undefined){ if(h.cholgu){ tanla(h.cholgu, true); } else { tanla(null); S.tikla(); } } if(h.guruh) guruhYorit(h.guruh); };
  S.kadrda = (dt, t)=>{
    TARTIB.forEach(k=>{ const p = puls[k] || 0; if(p <= 0) return; puls[k] = Math.max(0, p - dt); const m = M[k];
      if(m.userData.torlar) m.userData.torlar.forEach((tr, i)=>{ tr.scale.x = tr.scale.z = 1 + Math.abs(Math.sin(t * 60 + i)) * 2.5 * puls[k]; });
      if(k === 'gijjak') m.userData.kamon.position.x = .05 + Math.sin(t * 3) * .15 * Math.min(1, puls[k]);
      if(k === 'chang') m.userData.chop.forEach((c, i)=>{ c.position.z = .3 + Math.abs(Math.sin(t * 16 + i * 1.6)) * .06 * Math.min(1, puls[k]); });
      if(k === 'doira') m.userData.teri.position.z = .082 * .55 - Math.abs(Math.sin(t * 22)) * .012 * puls[k];
      if(k === 'nay' || k === 'surnay') m.position.y = (k === 'nay' ? 1.0 : .95) + Math.sin(t * 7) * .01 * puls[k];
    });
  };
  S.joyla(5.3, new T.Vector3(0, 1.3, .6));
  return S;
};

/* ================= 9. INTERVAL VA AKKORDLAR (im_interval) ================= */
const INTERVAL = [
  ['prima', 0, 'sof prima'], ['k2', 1, 'kichik sekunda'], ['b2', 2, 'katta sekunda'], ['k3', 3, 'kichik tersiya'], ['b3', 4, 'katta tersiya'],
  ['s4', 5, 'sof kvarta'], ['triton', 6, 'triton'], ['s5', 7, 'sof kvinta'], ['k6', 8, 'kichik seksta'], ['b6', 9, 'katta seksta'],
  ['k7', 10, 'kichik septima'], ['b7', 11, 'katta septima'], ['oktava', 12, 'sof oktava']
];
const AKKORD = {major:{nom:'major (katta uch tovushlik)', q:[0, 4, 7], iz:'katta tersiya + kichik tersiya (4 + 3)'}, minor:{nom:'minor (kichik uch tovushlik)', q:[0, 3, 7], iz:'kichik tersiya + katta tersiya (3 + 4)'},
  kamaytirilgan:{nom:'kamaytirilgan uch tovushlik', q:[0, 3, 6], iz:'ikki kichik tersiya (3 + 3)'}, orttirilgan:{nom:'orttirilgan uch tovushlik', q:[0, 4, 8], iz:'ikki katta tersiya (4 + 4)'}};
const QISQA_I = {prima:'Prima', k2:'k.2', b2:'b.2', k3:'k.3', b3:'b.3', s4:'s.4', triton:'Triton', s5:'s.5', k6:'k.6', b6:'b.6', k7:'k.7', b7:'b.7', oktava:'Oktava'};
R.im_interval = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · interval va akkordlar · tovush brauzerda sintez qilinadi');
  const A = asos(sahna, {rx:.62, ry:0, rxMin:.15, rxMax:1.2, ryMin:-.8, ryMax:.8, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, testda, qatlam} = A;
  const O = ovozchi(); A.tozalash.push(()=>O.toxtat());
  podium(4.6, 0, '#e8508f');
  const MIN = 60, MAX = 83; /* Do4 … Si5 */
  const OQ = [0, 2, 4, 5, 7, 9, 11];
  const WW = .352, KL = 1.55, KY = .92;
  const oqSoni = 14, x0 = -(oqSoni - 1) / 2 * WW;
  const kalitX = {}; /* midi → {x, qora} */
  let oqI = 0;
  for(let m = MIN; m <= MAX; m++){ const p = m % 12; if(OQ.includes(p)){ kalitX[m] = {x:x0 + oqI * WW, qora:false}; oqI++; } else kalitX[m] = {x:x0 + (oqI - .5) * WW, qora:true}; }
  /* ---- korpus ---- */
  const lak = fiz('#0d0f16', {roughness:.18, metalness:.1, clearcoat:1, clearcoatRoughness:.06, env:.7});
  const ichM = mat('#3a1018', {roughness:.85});
  const enK = oqSoni * WW + .62;
  const tub = quti(enK, .5, 2.2, lak, .06); tub.position.set(0, .62, -.35); g.add(tub);
  const orqa = quti(enK, 1.5, .4, lak, .06); orqa.position.set(0, 1.5, -1.25); g.add(orqa);
  const qopqoq = quti(enK - .1, .06, .55, lak, .02); qopqoq.position.set(0, 2.27, -1.18); g.add(qopqoq);
  [-1, 1].forEach(s=>{ const yon = quti(.3, .42, 1.95, lak, .05); yon.position.set(s * (enK / 2 - .15), 1.02, -.18); g.add(yon); });
  const mato = quti(enK - .6, .03, .1, ichM, .01); mato.position.set(0, KY + .02, -.86); g.add(mato);
  /* nota tokchasi va oyoqlar */
  const tokcha = quti(2.6, .9, .05, lak, .02); tokcha.position.set(0, 2.05, -.98); tokcha.rotation.x = -.2; g.add(tokcha);
  const varT = matnTex(1024, 360, (x, w, h)=>{ x.fillStyle = '#f4efe3'; x.fillRect(0, 0, w, h); x.strokeStyle = '#2a2620'; x.lineWidth = 2; for(let s = 0; s < 2; s++) for(let i = 0; i < 5; i++){ const y = 60 + s * 160 + i * 18; x.beginPath(); x.moveTo(30, y); x.lineTo(w - 30, y); x.stroke(); }
    x.fillStyle = '#2a2620'; const nota = [[0, 4], [2, 4], [4, 4], [0, 4.5], [7, 3.5], [4, 3], [0, 4], [12, 1]]; nota.forEach(([p, y], i)=>{ const nx = 120 + i * 105, ny = 60 + (8 - y * 2) * 9 + 36; x.beginPath(); x.ellipse(nx, ny, 11, 8, -.35, 0, Math.PI * 2); x.fill(); x.fillRect(nx + 9, ny - 58, 2.5, 58); }); x.font = '700 26px Georgia, serif'; x.fillText('Intervallar', 40, h - 30); });
  const varq = new T.Mesh(new T.PlaneGeometry(2.4, .82), new T.MeshStandardMaterial({map:varT, roughness:.8})); varq.position.set(0, 2.07, -.95); varq.rotation.x = -.2; g.add(varq);
  const nomT = matnTex(512, 64, (x, w, h)=>{ x.fillStyle = '#d9b35a'; x.font = '700 38px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('M A K O N', w / 2, h / 2 + 2); });
  const nomP = new T.Mesh(new T.PlaneGeometry(.9, .11), new T.MeshBasicMaterial({map:nomT, transparent:true})); nomP.position.set(0, 1.25, -1.04); g.add(nomP);
  [-1, 1].forEach(s=>{ const oy = silindr(.07, .05, .4, fiz('#0d0f16', {clearcoat:1, roughness:.2}), 20); oy.position.set(s * (enK / 2 - .3), .2, .5); g.add(oy); const g2 = silindr(.08, .08, .04, mat('#c9a64a', {metalness:.9, roughness:.25}), 20); g2.position.set(s * (enK / 2 - .3), .02, .5); g.add(g2); });
  soya(enK * 1.3, 3.4, 0, -.4, 0, .9);
  /* ---- klavishlar ---- */
  const oqM = fiz('#f5f2ea', {roughness:.3, clearcoat:.8, clearcoatRoughness:.12, env:.5});
  const qoraM = fiz('#111217', {roughness:.25, clearcoat:1, clearcoatRoughness:.08, env:.6});
  const K = {};
  for(let m = MIN; m <= MAX; m++){
    const k = kalitX[m], nom = midiNota(m);
    const geo = k.qora ? quti(.2, .15, .98, qoraM.clone(), .03) : quti(WW - .014, .16, KL, oqM.clone(), .025);
    const grp = new T.Group(); grp.position.set(k.x, 0, 0); g.add(grp);
    geo.position.set(0, k.qora ? KY + .15 : KY, k.qora ? -.29 : 0); grp.add(geo);
    geo.material.emissive = new T.Color(0); geo.userData = {nom:'klavish', klavish:nom, midi:m};
    if(!k.qora){
      const t = matnTex(128, 96, (x, w, h)=>{ x.fillStyle = m % 12 === 0 ? '#c2185b' : '#7a7f8f'; x.font = '700 40px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(nom.replace(/\d/, ''), w / 2, h / 2 - 8); x.font = '600 24px Inter, sans-serif'; x.fillStyle = '#9aa0ad'; x.fillText(nom.replace(/\D/g, ''), w / 2, h / 2 + 24); });
      const yz = new T.Mesh(new T.PlaneGeometry(.26, .2), new T.MeshBasicMaterial({map:t, transparent:true, depthWrite:false})); yz.rotation.x = -Math.PI / 2; yz.position.set(0, KY + .082, .56); grp.add(yz);
    }
    K[m] = {grp, mesh:geo, qora:k.qora, bos:0, holat:null};
  }
  /* ---- yoylar, sanoq, belgilar ---- */
  const yoylar = new T.Group(); g.add(yoylar);
  const yoyYoz = []; for(let i = 0; i < 3; i++){ const y = yozuv('', {bal:.26, w:720, h:110, shrift:'700 50px Inter, sans-serif', chuqurlik:false}); y.visible = false; g.add(y); yoyYoz.push(y); }
  const sanoq = []; for(let i = 0; i < 13; i++){ const y = yozuv(String(i + 1), {bal:.15, w:96, h:96, fon:'rgba(232,80,143,.85)', chegara:'rgba(255,255,255,.4)', shrift:'800 56px "JetBrains Mono", monospace', chuqurlik:false}); y.visible = false; g.add(y); sanoq.push(y); }
  const asosBelgi = yozuv('asos', {bal:.17, w:220, h:96, fon:'rgba(255,179,71,.92)', rang:'#2a1a00', shrift:'800 54px Inter, sans-serif', chuqurlik:false}); g.add(asosBelgi);
  const asosHalqa = new T.Mesh(new T.TorusGeometry(.13, .018, 8, 32), new T.MeshBasicMaterial({color:0xffb347, toneMapped:false})); asosHalqa.rotation.x = Math.PI / 2; g.add(asosHalqa);
  const ustY = m=>K[m].qora ? KY + .23 : KY + .09, ustZ = m=>K[m].qora ? -.35 : .15;
  function yoyTozala(){ while(yoylar.children.length){ const c = yoylar.children.pop(); c.geometry.dispose(); c.material.dispose(); } yoyYoz.forEach(y=>{ y.visible = false; }); sanoq.forEach(y=>{ y.visible = false; }); }
  function yoy(a, b, i, matn, rangH){
    const p1 = new T.Vector3(kalitX[a].x, ustY(a) + .03, ustZ(a)), p2 = new T.Vector3(kalitX[b].x, ustY(b) + .03, ustZ(b));
    const bal = .45 + Math.abs(b - a) * .045 + i * .12;
    const e = new T.QuadraticBezierCurve3(p1, new T.Vector3((p1.x + p2.x) / 2, Math.max(p1.y, p2.y) + bal * 2, (p1.z + p2.z) / 2 - .1), p2);
    const m = new T.Mesh(new T.TubeGeometry(e, 40, .022, 8, false), new T.MeshBasicMaterial({color:new T.Color(rangH || '#ffcf7a'), toneMapped:false})); yoylar.add(m);
    [p1, p2].forEach(p=>{ const d = new T.Mesh(new T.SphereGeometry(.05, 16, 12), new T.MeshBasicMaterial({color:new T.Color(rangH || '#ffcf7a'), toneMapped:false})); d.position.copy(p); yoylar.add(d); });
    const y = yoyYoz[i]; y.yoz(matn, rangH); y.visible = true; y.position.copy(e.getPoint(.5)).add(new T.Vector3(0, .16, 0));
  }
  function sanoqQoy(a, b){ const n = Math.abs(b - a), s = Math.sign(b - a); for(let i = 1; i <= n && i <= 13; i++){ const m = a + s * i; const y = sanoq[i - 1]; y.visible = true; y.yoz(String(i)); y.position.set(kalitX[m].x, ustY(m) + .2, ustZ(m) + (K[m].qora ? .05 : .25)); } }
  /* ---- holat ---- */
  let rejim = 'qurish', asosM = 60, intervalK = null, akkordK = null, birinchi = null;
  const belgilar = new Map(); /* midi → rang */
  function ranglar(){
    for(let m = MIN; m <= MAX; m++){
      const k = K[m], mm = k.mesh.material;
      const r = m === asosM && rejim !== 'olchash' ? '#ffb347' : belgilar.get(m) || (m === ustidaM ? '#8f7bff' : null);
      mm.emissive.set(r ? new T.Color(r).convertSRGBToLinear() : 0); mm.emissiveIntensity = r ? (k.qora ? .9 : .55) : 0;
    }
    const kor = rejim !== 'olchash';
    asosBelgi.visible = asosHalqa.visible = kor;
    asosBelgi.position.set(kalitX[asosM].x, ustY(asosM) + (K[asosM].qora ? .62 : .5), ustZ(asosM) - .05);
    asosHalqa.position.set(kalitX[asosM].x, ustY(asosM) + .01, ustZ(asosM) + (K[asosM].qora ? .05 : .3));
  }
  let ustidaM = null;
  S.ustida = ud=>{ const m = ud && ud.midi ? ud.midi : null; if(m !== ustidaM){ ustidaM = m; ranglar(); } };
  const pianino = (m, kech, dur, vol)=>{ const f = midiF(m); O.ton(f, dur || 1.6, {kech, garm:[1, .55, .32, .2, .12, .07, .04], vol:vol || .18, hujum:.006, filtr:{f:Math.min(6000, f * 7)}}); O.ton(f * 1.001, (dur || 1.6) * .7, {kech, tip:'triangle', vol:(vol || .18) * .25, hujum:.004}); };
  const bos = m=>{ if(K[m]) K[m].bos = 1; };
  function intervalKor(kalit, yub, chal){
    const I = INTERVAL.find(x=>x[0] === kalit); if(!I) return;
    const yuq = asosM + I[1];
    if(yuq > MAX){ izoh.innerHTML = '<b>' + I[2][0].toUpperCase() + I[2].slice(1) + '</b> uchun yuqori nota klaviaturadan chiqib ketadi. Asosni pastroq klavishga qo‘ying.'; return; }
    intervalK = kalit; akkordK = null; yoyTozala(); belgilar.clear(); belgilar.set(yuq, '#e8508f');
    yoy(asosM, yuq, 0, I[2] + ' · ' + I[1] + ' yarim ton', '#ffcf7a'); if(I[1] > 0) sanoqQoy(asosM, yuq);
    ranglar(); panelFaol();
    izoh.innerHTML = '<b>' + midiNota(asosM) + ' → ' + midiNota(yuq) + ': ' + I[2] + '</b> — ' + I[1] + ' yarim ton' + (I[1] === 6 ? ' (orttirilgan kvarta = kamaytirilgan kvinta)' : I[1] === 12 ? ' (chastota 2 marta katta)' : '') + '. Klavishlar ustidagi raqamlar — yarim tonlar sanog‘i.';
    if(chal && audio()){ pianino(asosM, 0); pianino(yuq, .6); pianino(asosM, 1.25, 1.8, .14); pianino(yuq, 1.25, 1.8, .14); bos(asosM); A.kut(()=>bos(yuq), 600); }
    if(yub){ detal('im_interval', kalit); hodisa('im-interval', {kalit, nom:I[2], yarim:I[1], past:midiNota(asosM), yuqori:midiNota(yuq)}); }
  }
  function akkordKor(k, yub, chal){
    const a = AKKORD[k]; if(!a) return;
    const n = a.q.map(q=>asosM + q);
    if(n[2] > MAX){ izoh.innerHTML = 'Bu akkordning yuqori notasi klaviaturadan chiqib ketadi. Asosni pastroq klavishga qo‘ying.'; return; }
    akkordK = k; intervalK = null; yoyTozala(); belgilar.clear(); n.slice(1).forEach(m=>belgilar.set(m, '#e8508f'));
    yoy(n[0], n[1], 0, (a.q[1] === 4 ? 'katta' : 'kichik') + ' tersiya · ' + a.q[1], '#ffcf7a');
    yoy(n[1], n[2], 1, (a.q[2] - a.q[1] === 4 ? 'katta' : 'kichik') + ' tersiya · ' + (a.q[2] - a.q[1]), '#5cc8ff');
    const y = yoyYoz[2]; y.yoz(midiNota(n[0]).replace(/\d/, '') + ' ' + (k === 'major' ? 'major' : k === 'minor' ? 'minor' : k === 'kamaytirilgan' ? 'kamayt.' : 'ortt.') + ': ' + n.map(midiNota).join(' – '), '#e8508f'); y.visible = true; y.position.set(kalitX[n[1]].x, KY + 1.55, -.3);
    ranglar(); panelFaol();
    izoh.innerHTML = '<b>' + a.nom[0].toUpperCase() + a.nom.slice(1) + '</b>: ' + n.map(midiNota).join(', ') + ' — ' + a.iz + '.';
    if(chal && audio()){ n.forEach((m, i)=>{ pianino(m, i * .32, 1.2, .15); A.kut(()=>bos(m), i * 320); }); n.forEach(m=>pianino(m, 1.05, 2.0, .12)); }
    if(yub){ detal('im_interval', k); hodisa('im-akkord', {akkord:k, asos:midiNota(asosM), notalar:n.map(midiNota)}); }
  }
  function tozala(){ intervalK = akkordK = null; birinchi = null; yoyTozala(); belgilar.clear(); ranglar(); panelFaol(); }
  function rejimQoy(r, soz){
    rejim = r; tozala(); faolQil(tag, '[data-r]', tag.querySelector('[data-r="' + r + '"]'));
    if(panel) panel.querySelectorAll('[data-bl]').forEach(b=>{ b.style.display = b.dataset.bl === r ? '' : 'none'; });
    if(soz !== false) izoh.innerHTML = r === 'qurish' ? '<b>Interval qurish:</b> klavishni bosing — u <b>asos</b> bo‘ladi, so‘ng paneldan interval tanlang.' : r === 'olchash' ? '<b>O‘lchash:</b> ikki klavishni ketma-ket bosing — ular orasidagi yarim tonlar sanaladi va interval nomi chiqadi.' : '<b>Akkordlar:</b> asos klavishini bosing va akkord turini tanlang (major, minor, kamaytirilgan, orttirilgan).';
  }
  /* ---- panel (test oynasida yo‘q) ---- */
  let panel = null;
  if(!testda){
    panel = qatlam('im-p im-yuqori');
    panel.innerHTML = '<span class="im-ust">Interval va akkord</span><h4 data-sar>Asos: Do4</h4>' +
      '<div data-bl="qurish"><div class="im-palitra" style="grid-template-columns:repeat(4,1fr)">' + INTERVAL.map(i=>'<button data-i="' + i[0] + '" title="' + i[2] + ' — ' + i[1] + ' yarim ton">' + QISQA_I[i[0]] + '<br><small style="opacity:.7">' + i[1] + '</small></button>').join('') + '</div><p class="im-iz">k. — kichik, b. — katta, s. — sof; raqam — yarim tonlar soni.</p></div>' +
      '<div data-bl="akkord" style="display:none"><div class="im-palitra" style="grid-template-columns:1fr 1fr">' + Object.keys(AKKORD).map(k=>'<button data-a="' + k + '">' + k[0].toUpperCase() + k.slice(1) + '<br><small style="opacity:.7">' + AKKORD[k].q.join('–') + '</small></button>').join('') + '</div><p class="im-iz">Raqamlar — asosdan yarim tonlar: masalan major 0–4–7.</p></div>' +
      '<div data-bl="olchash" style="display:none"><div class="im-natija" data-n>Birinchi klavishni bosing…</div></div>';
    panel.querySelectorAll('[data-i]').forEach(b=>b.onclick = ()=>intervalKor(b.dataset.i, true, true));
    panel.querySelectorAll('[data-a]').forEach(b=>b.onclick = ()=>akkordKor(b.dataset.a, true, true));
  }
  function panelFaol(){
    if(!panel) return;
    panel.querySelector('[data-sar]').textContent = rejim === 'olchash' ? 'Intervalni o‘lchash' : 'Asos: ' + midiNota(asosM);
    panel.querySelectorAll('[data-i]').forEach(b=>b.classList.toggle('faol', b.dataset.i === intervalK));
    panel.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('faol', b.dataset.a === akkordK));
  }
  tugmalar(tag, [
    {m:'Interval qurish', f:()=>rejimQoy('qurish')}, {m:'O‘lchash', f:()=>rejimQoy('olchash')}, {m:'Akkordlar', f:()=>rejimQoy('akkord')}, '|',
    {m:'▶ Qayta chalish', t:'Oxirgi interval yoki akkordni eshitish', f:()=>{ if(intervalK) intervalKor(intervalK, false, true); else if(akkordK) akkordKor(akkordK, false, true); else if(audio()){ pianino(asosM, 0); bos(asosM); } }},
    {m:'■', t:'Tovushni to‘xtatish', f:()=>O.toxtat()}
  ]);
  ['qurish', 'olchash', 'akkord'].forEach((r, i)=>{ tag.querySelectorAll('button')[i].dataset.r = r; });
  function klavish(m){
    const nom = midiNota(m); bos(m);
    if(audio()) pianino(m, 0);
    hodisa('im-klavish', {nom});
    detal('nota', NOTA[m % 12].replace('#', '').toLowerCase());
    if(rejim === 'olchash'){
      if(birinchi === null || belgilar.size >= 2){ yoyTozala(); belgilar.clear(); birinchi = m; belgilar.set(m, '#ffb347'); ranglar(); izoh.innerHTML = '<b>' + nom + '</b> — birinchi tovush. Endi ikkinchi klavishni bosing.'; if(panel) panel.querySelector('[data-n]').innerHTML = nom + ' → …'; return; }
      const a = Math.min(birinchi, m), b = Math.max(birinchi, m), n = b - a;
      const I = INTERVAL.find(x=>x[1] === n);
      belgilar.set(m, '#e8508f'); yoy(a, b, 0, (I ? I[2] : 'oktavadan keng') + ' · ' + n + ' yarim ton', '#ffcf7a'); if(n > 0) sanoqQoy(a, b); ranglar();
      const matn = midiNota(a) + ' – ' + midiNota(b) + ': ' + n + ' yarim ton → ' + (I ? I[2] : 'oktavadan keng interval (murakkab interval)');
      izoh.innerHTML = '<b>' + matn + '</b>.'; if(panel) panel.querySelector('[data-n]').innerHTML = matn;
      if(audio()) pianino(birinchi, .45, 1.2, .12);
      hodisa('im-interval', {kalit:I ? I[0] : null, nom:I ? I[2] : 'murakkab', yarim:n, past:midiNota(a), yuqori:midiNota(b)});
      if(I) detal('im_interval', I[0]);
      birinchi = null;
      return;
    }
    asosM = m; intervalK = akkordK = null; yoyTozala(); belgilar.clear(); ranglar(); panelFaol();
    izoh.innerHTML = '<b>' + nom + '</b> (' + son(midiF(m), 2) + ' Hz) — endi asos. ' + (rejim === 'akkord' ? 'Akkord turini tanlang.' : 'Paneldan interval tanlang — yoy va yarim tonlar sanog‘i chiqadi.');
  }
  S.bosish = ud=>{ if(ud.midi) klavish(ud.midi); };
  S.holat = h=>{
    if(!h) return;
    if(h.rejim) rejimQoy(h.rejim, false);
    if(h.asos){ const m = notaMidi(h.asos); if(m >= MIN && m <= MAX) asosM = m; }
    tozala();
    if(h.interval) intervalKor(h.interval, false, false);
    else if(h.akkord) akkordKor(h.akkord, false, false);
    else if(rejim === 'olchash') izoh.innerHTML = '<b>O‘lchash:</b> ikki klavishni ketma-ket bosing — ular orasidagi yarim tonlar sanaladi.';
    else izoh.innerHTML = '<b>Asos: ' + midiNota(asosM) + '.</b> ' + (rejim === 'akkord' ? 'Akkord turini tanlang.' : 'Interval tanlang yoki boshqa klavishni bosib asosni o‘zgartiring.');
  };
  S.kadrda = (dt, t)=>{
    for(let m = MIN; m <= MAX; m++){ const k = K[m]; if(k.bos > 0){ k.bos = Math.max(0, k.bos - dt * 2.2); } k.grp.position.y = -k.bos * .045; }
    asosHalqa.scale.setScalar(1 + Math.sin(t * 3) * .08);
    yoylar.children.forEach(c=>{ if(c.material) c.material.opacity = 1; });
  };
  rejimQoy('qurish', false); ranglar(); panelFaol();
  izoh.innerHTML = 'Asos — <b>Do4</b> (oltin halqa). Klavish bosib asosni almashtiring, paneldan interval yoki akkord tanlang. Tovush faqat bosganingizda yangraydi.';
  S.joyla(testda ? 2.7 : 3.9, new T.Vector3(testda ? 0 : .35, 1.3, -.1));
  return S;
};

/* ================= 10. TOVUSH: TO‘LQIN, BALANDLIK, KUCH, TEMBR (im_tovush) ================= */
const TEMBR = {sinus:{nom:'sinus (toza ton)', g:[1]}, nay:{nom:'nay', g:[1, .25, .08, .03]}, klarnet:{nom:'klarnet', g:[1, 0, .45, 0, .25, 0, .14]}, skripka:{nom:'skripka', g:[1, .5, .33, .25, .2, .17, .14, .12]}};
const V_TOVUSH = 343; /* m/s, 20 °C havo */
R.im_tovush = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · tovush to‘lqini · o‘lchamlar sxematik, tovush sintez');
  const A = asos(sahna, {rx:.28, ry:-.32, rxMin:-.2, rxMax:1.0, ryMin:-1.2, ryMax:1.0, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, testda, qatlam} = A;
  let f = 220, Amp = .6, tembr = 'sinus', ijro = false;
  podium(6.8, 0, '#5cc8ff');
  /* ---- karnay ---- */
  const kG = new T.Group(); kG.position.set(-4.1, 0, 0); kG.rotation.y = .18; g.add(kG);
  const korpusM = fiz('#1a1c24', {roughness:.55, metalness:.1, clearcoat:.4});
  const korpus = quti(1.5, 2.5, 1.2, korpusM, .08); korpus.position.y = 1.35; korpus.rotation.y = Math.PI / 2; kG.add(korpus);
  const yuzM = mat('#0c0d12', {roughness:.9});
  const yuz = quti(.05, 2.35, 1.38, yuzM, .02); yuz.position.set(.6, 1.35, 0); kG.add(yuz);
  /* diffuzor (konus) */
  const dG = new T.Group(); dG.position.set(.63, 1.0, 0); dG.rotation.z = -Math.PI / 2; kG.add(dG);
  const konusPts = []; for(let i = 0; i <= 12; i++){ const t = i / 12; konusPts.push(new T.Vector2(.09 + t * .44, -.22 + Math.pow(t, 1.4) * .22)); }
  const konus = new T.Mesh(new T.LatheGeometry(konusPts, 48), mat('#2a2c33', {roughness:.75, side:T.DoubleSide})); dG.add(konus);
  const gardish = new T.Mesh(new T.TorusGeometry(.55, .045, 12, 48), mat('#15161b', {roughness:.6})); gardish.rotation.x = Math.PI / 2; gardish.position.y = .005; dG.add(gardish);
  const qalpoq = new T.Mesh(new T.SphereGeometry(.12, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), fiz('#3a3d47', {roughness:.3, clearcoat:.8})); qalpoq.position.y = -.21; dG.add(qalpoq);
  const halqaM = mat('#8c929e', {metalness:.9, roughness:.3});
  const hal = new T.Mesh(new T.TorusGeometry(.62, .025, 8, 48), halqaM); hal.rotation.x = Math.PI / 2; hal.position.y = .03; dG.add(hal);
  /* tviter */
  const tw = new T.Mesh(new T.SphereGeometry(.13, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), fiz('#5b6070', {metalness:.6, roughness:.25})); tw.rotation.z = -Math.PI / 2; tw.position.set(.62, 2.1, 0); kG.add(tw);
  const twH = new T.Mesh(new T.TorusGeometry(.2, .03, 8, 36), halqaM); twH.rotation.y = Math.PI / 2; twH.position.set(.63, 2.1, 0); kG.add(twH);
  bosiladigan(kG, 'karnay', {obyekt:'karnay'});
  soya(2.2, 2.2, -4.1, 0, 0, .8);
  /* ---- havo zarrachalari (bo‘ylama to‘lqin) ---- */
  const NX = 64, NY = 9, NZ = 3, X0 = -3.3, X1 = 3.0;
  const n = NX * NY * NZ;
  const zgeo = new T.SphereGeometry(.032, 8, 6);
  const zmat = new T.MeshBasicMaterial({color:0xffffff, toneMapped:false});
  const zarra = new T.InstancedMesh(zgeo, zmat, n); g.add(zarra);
  const asl = new Float32Array(n * 3), ranglar = new Float32Array(n * 3);
  let idx = 0;
  for(let ix = 0; ix < NX; ix++) for(let iy = 0; iy < NY; iy++) for(let iz = 0; iz < NZ; iz++){
    asl[idx * 3] = X0 + (ix + (Math.sin(idx * 12.9898) * .5 + .5) * .6) * (X1 - X0) / NX;
    asl[idx * 3 + 1] = .45 + iy * .19 + Math.sin(idx * 78.233) * .05;
    asl[idx * 3 + 2] = -.55 + iz * .36 + Math.cos(idx * 3.17) * .06;
    idx++;
  }
  zarra.instanceColor = new T.InstancedBufferAttribute(ranglar, 3);
  const hitM = new T.MeshBasicMaterial({transparent:true, opacity:.3, colorWrite:false, depthWrite:false});
  const hit = new T.Mesh(new T.BoxGeometry(X1 - X0, 1.9, 1.4), hitM); hit.position.set((X0 + X1) / 2, 1.25, 0); hit.userData = {nom:'havo', obyekt:'havo'}; g.add(hit);
  const tub = new T.Mesh(new T.CylinderGeometry(.03, .03, X1 - X0, 8), new T.MeshBasicMaterial({color:0x5cc8ff, transparent:true, opacity:.25})); tub.rotation.z = Math.PI / 2; tub.position.set((X0 + X1) / 2, .3, .85); g.add(tub);
  /* λ o‘lchagichi */
  const lamYoz = yozuv('', {bal:.3, w:720, h:100, shrift:'700 46px "JetBrains Mono", monospace', rang:'#9fe0ff', chuqurlik:false}); g.add(lamYoz);
  const lamChiz = new T.Group(); g.add(lamChiz);
  const lamM = new T.MeshBasicMaterial({color:0x9fe0ff, toneMapped:false});
  const lamT = silindr(.012, .012, 1, lamM, 6); lamT.rotation.z = Math.PI / 2; lamChiz.add(lamT);
  const lamU = [silindr(.012, .012, .22, lamM, 6), silindr(.012, .012, .22, lamM, 6)]; lamU.forEach(u=>lamChiz.add(u));
  /* ---- mikrofon ---- */
  const mG = new T.Group(); mG.position.set(3.6, 0, .1); g.add(mG);
  const stM = mat('#23262e', {metalness:.85, roughness:.3});
  const tagi = silindr(.35, .4, .06, stM, 32); tagi.position.y = .03; mG.add(tagi);
  const ust = silindr(.025, .025, 1.3, stM, 10); ust.position.y = .68; mG.add(ust);
  const tutq = silindr(.07, .05, .45, fiz('#1b1d24', {metalness:.5, roughness:.3, clearcoat:.6}), 20); tutq.position.set(-.08, 1.45, 0); tutq.rotation.z = Math.PI / 2 - .35; mG.add(tutq);
  const panjara = new T.Mesh(new T.SphereGeometry(.16, 24, 16), new T.MeshStandardMaterial({color:0xb8bec9, metalness:.9, roughness:.35, wireframe:true})); panjara.position.set(-.33, 1.55, 0); mG.add(panjara);
  const kapsula = new T.Mesh(new T.SphereGeometry(.145, 20, 14), mat('#2b2e36', {metalness:.4, roughness:.6})); kapsula.position.copy(panjara.position); mG.add(kapsula);
  const darajaM = new T.MeshBasicMaterial({color:0x36d6a0, toneMapped:false});
  const daraja = quti(.08, 1, .08, darajaM, .02); daraja.position.set(.25, .6, 0); mG.add(daraja);
  bosiladigan(mG, 'mikrofon', {obyekt:'mikrofon'});
  soya(1.2, 1.2, 3.6, .1, 0, .7);
  /* ---- ossillograf ---- */
  const oG = new T.Group(); oG.position.set(.2, 0, -2.4); g.add(oG);
  const oKorpus = quti(3.3, 2.0, .5, fiz('#20242f', {metalness:.35, roughness:.35, clearcoat:.6}), .08); oKorpus.position.y = 2.45; oG.add(oKorpus);
  const oyoqlar = [-1.3, 1.3].map(x=>{ const o2 = silindr(.04, .04, 1.45, stM, 8); o2.position.set(x, .72, 0); oG.add(o2); return o2; });
  const ekrT = matnTex(1024, 560, ()=>{});
  const ekran = new T.Mesh(new T.PlaneGeometry(2.55, 1.4), new T.MeshBasicMaterial({map:ekrT, toneMapped:false})); ekran.position.set(-.25, 2.45, .26); oG.add(ekran);
  for(let i = 0; i < 3; i++){ const r = silindr(.075, .075, .06, mat('#c9ced8', {metalness:.9, roughness:.3}), 20); r.rotation.x = Math.PI / 2; r.position.set(1.38, 2.95 - i * .4, .27); oG.add(r); }
  bosiladigan(oG, 'ossillograf', {obyekt:'ossillograf'});
  soya(3.4, 1.2, .2, -2.4, 0, .6);
  const malYoz = yozuv('', {bal:.34, w:1100, h:110, shrift:'700 48px "JetBrains Mono", monospace', rang:'#eef1fb', chuqurlik:false}); malYoz.position.set(.2, 3.85, -2.4); g.add(malYoz);
  /* ---- chizish ---- */
  const garm = ()=>TEMBR[tembr].g;
  const tolqin = x=>{ const G = garm(); let s = 0, nm = 0; G.forEach((a, i)=>{ s += a * Math.sin((i + 1) * x); nm += Math.abs(a); }); return s / (nm || 1) * (G.length > 1 ? 1.35 : 1); };
  let faza = 0;
  function ekranChiz(){
    const x = ekrT.x, w = 1024, h = 560;
    x.fillStyle = '#04120c'; x.fillRect(0, 0, w, h);
    x.strokeStyle = 'rgba(80,255,170,.14)'; x.lineWidth = 1;
    for(let i = 0; i <= 10; i++){ x.beginPath(); x.moveTo(12 + i * 100, 20); x.lineTo(12 + i * 100, h - 60); x.stroke(); }
    for(let i = 0; i <= 8; i++){ x.beginPath(); x.moveTo(12, 20 + i * 60); x.lineTo(w - 12, 20 + i * 60); x.stroke(); }
    x.strokeStyle = 'rgba(80,255,170,.3)'; x.beginPath(); x.moveTo(12, 260); x.lineTo(w - 12, 260); x.stroke();
    const oyna = .01; /* 10 ms */
    x.strokeStyle = '#6dffb8'; x.lineWidth = 4; x.shadowColor = '#3dff9e'; x.shadowBlur = 14; x.beginPath();
    for(let px = 0; px <= 1000; px += 2){ const t = px / 1000 * oyna; const y = 260 - tolqin(2 * Math.PI * f * t + faza) * Amp * 200; if(px === 0) x.moveTo(12 + px, y); else x.lineTo(12 + px, y); }
    x.stroke(); x.shadowBlur = 0;
    x.fillStyle = '#6dffb8'; x.font = '600 28px "JetBrains Mono", monospace';
    x.fillText('1 ms / katak', 20, h - 20); x.textAlign = 'right'; x.fillText(TEMBR[tembr].nom, w - 20, h - 20); x.textAlign = 'left';
    ekrT.needsUpdate = true;
  }
  const Tms = ()=>1000 / f, lam = ()=>V_TOVUSH / f;
  function yozuvlar(){
    malYoz.yoz('f = ' + Math.round(f) + ' Hz · T = ' + son(Tms(), 2) + ' ms · λ = ' + son(lam(), 2) + ' m');
    const lv = lamVis();
    const xa = X0 + .4, xb = Math.min(X1, xa + lv);
    lamT.scale.y = Math.max(.01, xb - xa); lamT.position.set((xa + xb) / 2, 2.35, .6);
    lamU[0].position.set(xa, 2.35, .6); lamU[1].position.set(xb, 2.35, .6);
    lamYoz.yoz('λ = ' + son(lam(), 2) + ' m' + (xb < xa + lv - .01 ? ' (sahnadan uzun)' : '')); lamYoz.position.set((xa + Math.min(xb, X1)) / 2, 2.62, .6);
    daraja.scale.y = Math.max(.02, Amp); daraja.position.y = .1 + Amp * .5;
    if(panel){ panel.querySelector('[data-t]').textContent = son(Tms(), 3) + ' ms'; panel.querySelector('[data-l]').textContent = son(lam(), 3) + ' m'; }
  }
  const lamVis = ()=>2.4 * Math.pow(220 / f, .72); /* sahnada ko‘rinadigan to‘lqin uzunligi (masshtab shartli) */
  /* ---- tovush (faqat bosilganda) ---- */
  let osc = null, gain = null;
  function ovozYangila(){
    if(!osc || !AC) return;
    const G = garm(); const re = new Float32Array(G.length + 1), im = new Float32Array(G.length + 1); G.forEach((v, i)=>{ im[i + 1] = v; });
    osc.setPeriodicWave(AC.createPeriodicWave(re, im));
    osc.frequency.setTargetAtTime(f, AC.currentTime, .02);
    gain.gain.setTargetAtTime(Amp * Amp * .22 + .0001, AC.currentTime, .03);
  }
  function ijroQoy(v){
    if(v){
      const a = audio(); if(!a){ izoh.innerHTML = 'Brauzer tovushni qo‘llab-quvvatlamadi.'; return; }
      if(osc) return;
      gain = a.createGain(); gain.gain.value = .0001; gain.connect(a.destination);
      osc = a.createOscillator(); osc.connect(gain); osc.start(); ijro = true; ovozYangila();
    } else {
      ijro = false;
      if(osc && AC){ const o2 = osc, g2 = gain; g2.gain.setTargetAtTime(.0001, AC.currentTime, .03); setTimeout(()=>{ try{ o2.stop(); o2.disconnect(); g2.disconnect(); }catch(e){} }, 200); }
      osc = gain = null;
    }
    const b = tag.querySelector('[data-ij]'); if(b){ b.classList.toggle('faol', ijro); b.innerHTML = ijro ? '■ To‘xtatish' : '▶ Eshitish'; }
  }
  A.tozalash.push(()=>{ if(osc){ try{ osc.stop(); osc.disconnect(); gain.disconnect(); }catch(e){} osc = gain = null; } });
  function yubor(){ hodisa('im-tovush', {f:Math.round(f), A:Math.round(Amp * 100) / 100, tembr, T:Math.round(Tms() * 1000) / 1000, lambda:Math.round(lam() * 1000) / 1000}); }
  const fDan = v=>110 * Math.pow(2, v / 1000 * 4); /* slayder 0..1000 → 110..1760 Hz (log) */
  const fGa = x=>Math.round(Math.log2(x / 110) / 4 * 1000);
  function izohYoz(){
    izoh.innerHTML = '<b>f = ' + Math.round(f) + ' Hz</b> — sekundiga ' + Math.round(f) + ' tebranish; davr T = 1/f = ' + son(Tms(), 2) + ' ms; to‘lqin uzunligi λ = v/f = 343/' + Math.round(f) + ' ≈ ' + son(lam(), 2) + ' m. Amplituda ' + Math.round(Amp * 100) + ' % — ' + (Amp < .3 ? 'tovush sust.' : Amp > .75 ? 'tovush kuchli.' : 'o‘rtacha balandlik.') + ' Tembr: ' + TEMBR[tembr].nom + '.';
  }
  function qoy(h, yub){
    if(h.f !== undefined) f = Math.max(110, Math.min(1760, +h.f));
    if(h.A !== undefined) Amp = Math.max(0, Math.min(1, +h.A));
    if(h.tembr && TEMBR[h.tembr]) tembr = h.tembr;
    const rf = tag.querySelector('[data-rf]'), ra = tag.querySelector('[data-ra]');
    if(rf) rf.value = fGa(f); if(ra) ra.value = Math.round(Amp * 100);
    const lf = tag.querySelector('[data-lf]'), la = tag.querySelector('[data-la]'); if(lf) lf.textContent = Math.round(f) + ' Hz'; if(la) la.textContent = Math.round(Amp * 100) + ' %';
    faolQil(tag, '[data-tm]', tag.querySelector('[data-tm="' + tembr + '"]'));
    yozuvlar(); izohYoz(); ovozYangila();
    if(yub) yubor();
  }
  /* ---- boshqaruv ---- */
  tag.innerHTML = '';
  const lf = el('label', '', '<span>f</span><input type="range" min="0" max="1000" step="1" data-rf aria-label="Chastota (Hz)"><b data-lf style="min-width:66px">220 Hz</b>'); lf.style.minWidth = '200px'; tag.append(lf);
  const la = el('label', '', '<span>A</span><input type="range" min="0" max="100" step="1" data-ra aria-label="Amplituda (%)"><b data-la style="min-width:44px">60 %</b>'); la.style.minWidth = '170px'; tag.append(la);
  lf.querySelector('input').oninput = e=>qoy({f:fDan(+e.target.value)}, false); lf.querySelector('input').onchange = e=>qoy({f:fDan(+e.target.value)}, true);
  la.querySelector('input').oninput = e=>qoy({A:+e.target.value / 100}, false); la.querySelector('input').onchange = e=>qoy({A:+e.target.value / 100}, true);
  tag.append(el('span', 'tag-ajr'));
  Object.keys(TEMBR).forEach(k=>{ const b = el('button', '', k === 'sinus' ? 'Sinus' : k[0].toUpperCase() + k.slice(1)); b.dataset.tm = k; b.title = 'Tembr: ' + TEMBR[k].nom; b.onclick = ()=>qoy({tembr:k}, true); tag.append(b); });
  tag.append(el('span', 'tag-ajr'));
  const ib = el('button', '', '▶ Eshitish'); ib.dataset.ij = 1; ib.onclick = ()=>ijroQoy(!ijro); tag.append(ib);
  /* panel: qiymatlar + «?» kartalar */
  let panel = null;
  if(!testda){
    panel = qatlam('im-p im-yuqori');
    panel.style.width = 'min(270px, calc(100% - 32px))';
    panel.innerHTML = '<span class="im-ust">Tovush to‘lqini</span><div class="im-jad"><span>T = 1/f</span><b data-t></b><span>λ = v/f</span><b data-l></b></div>' +
      '<p class="im-iz">v = 343 m/s (20 °C havo). Sahnadagi to‘lqin sekinlashtirilgan — masshtab shartli.</p>' +
      '<div class="im-qator"><button data-q="chastota">? Chastota</button><button data-q="amplituda">? Amplituda</button><button data-q="tembr">? Tembr</button></div>';
    panel.querySelectorAll('[data-q]').forEach(b=>b.onclick = ()=>detal('im_tovush', b.dataset.q));
  }
  const IZ = {karnay:'<b>Karnay</b> — tovush manbasi: diffuzor oldinga-orqaga tebranib havoni siqadi va siyraklashtiradi.', havo:'<b>Havo zarralari</b> joyida oldinga-orqaga tebranadi — to‘lqin bo‘ylab siljimaydi. Zich (yorug‘) va siyrak (xira) qatlamlar yuguradi: bu <b>bo‘ylama</b> to‘lqin.', ossillograf:'<b>Ossillograf</b> — tovush bosimining vaqt bo‘yicha o‘zgarishini chizadi: balandlik — amplituda, to‘lqinlar zichligi — chastota, shakli — tembr.', mikrofon:'<b>Mikrofon</b> — qabul qiluvchi: havo bosimi tebranishini elektr signaliga aylantiradi. Yashil ustun — signal darajasi.'};
  S.bosish = ud=>{ const k = ud.obyekt; if(!k) return; belgila([k], '#5cc8ff', .4); izoh.innerHTML = IZ[k]; detal('im_tovush', k); hodisa('im-tovush-obyekt', {nom:k}); };
  S.holat = h=>{ if(!h) return; qoy(h, false); };
  /* ---- animatsiya ---- */
  const mtx = new T.Matrix4(), rng = new T.Color();
  S.kadrda = (dt, t)=>{
    const lv = lamVis(), kk = 2 * Math.PI / lv, w = 2 * Math.PI * .55 * Math.pow(f / 220, .5);
    const siljish = .16 * Amp;
    for(let i = 0; i < n; i++){
      const x = asl[i * 3], ph = kk * (x - X0) - w * t;
      const dx = siljish * Math.sin(ph);
      const zich = -Math.cos(ph) * Amp; /* siqilish (+) / siyraklanish (−) */
      mtx.makeTranslation(x + dx, asl[i * 3 + 1], asl[i * 3 + 2]); zarra.setMatrixAt(i, mtx);
      const v = .5 + zich * .5;
      rng.setRGB(.08 + v * .9, .2 + v * .8, .45 + v * .55); zarra.setColorAt(i, rng);
    }
    zarra.instanceMatrix.needsUpdate = true; if(zarra.instanceColor) zarra.instanceColor.needsUpdate = true;
    dG.position.x = .63 + Math.sin(-w * t) * .05 * Amp;
    faza = -w * t * .15; ekranChiz();
    daraja.material.color.setHSL(.42 - Amp * .4, .8, .55);
    daraja.scale.y = Math.max(.02, Amp * (.85 + .15 * Math.abs(Math.sin(w * t))));
  };
  qoy({f:220, A:.6, tembr:'sinus'}, false);
  izoh.innerHTML = 'Karnay diffuzori tebranib havo zarralarini <b>siqadi</b> (yorug‘) va <b>siyraklashtiradi</b> (xira). Slayderlar bilan chastota va amplitudani o‘zgartiring; «▶ Eshitish» — tovushni yoqadi (o‘zi chalinmaydi).';
  S.joyla(testda ? 5.2 : 5.6, new T.Vector3(testda ? 0 : .3, 1.3, -.3));
  return S;
};

/* ================= 11. SIMFONIK ORKESTR (im_orkestr) ================= */
const ORK_G = {torli:{nom:'Torli guruh', rang:'#ff7aa8'}, yogoch:{nom:'Yog‘och damli guruh', rang:'#36d6a0'}, mis:{nom:'Mis damli guruh', rang:'#ffc14d'}, zarbli:{nom:'Zarbli guruh', rang:'#5cc8ff'}, boshqa:{nom:'Arfa va dirijyor', rang:'#a996ff'}};
const ORK_C = {skripka:['Skripka', 'torli'], alt:['Alt', 'torli'], violonchel:['Violonchel', 'torli'], kontrabas:['Kontrabas', 'torli'],
  fleyta:['Fleyta', 'yogoch'], goboy:['Goboy', 'yogoch'], klarnet:['Klarnet', 'yogoch'], fagot:['Fagot', 'yogoch'],
  valtorna:['Valtorna', 'mis'], truba:['Truba', 'mis'], trombon:['Trombon', 'mis'], tuba:['Tuba', 'mis'],
  litavra:['Litavra', 'zarbli'], baraban:['Katta baraban', 'zarbli'], tarelka:['Tarelka', 'zarbli'], ksilofon:['Ksilofon', 'zarbli'],
  arfa:['Arfa', 'boshqa'], dirijyor:['Dirijyor', 'boshqa']};
R.im_orkestr = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · simfonik orkestr joylashuvi · sxematik, tovush sintez');
  const A = asos(sahna, {rx:.62, ry:0, rxMin:.12, rxMax:1.25, ryMin:-1.2, ryMax:1.2, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, yozuv, bosiladigan, belgila, testda} = A;
  const O = ovozchi(); A.tozalash.push(()=>O.toxtat());
  const MK = new T.Vector3(0, 0, 2.6); /* dirijyor nuqtasi */
  /* ---- sahna: pog‘onali yarim doira ---- */
  const sahnaM = fiz('#1a1411', {roughness:.45, metalness:.05, clearcoat:.5});
  const yarim = (r1, r2, h, m)=>{ const sh = new T.Shape(); sh.absarc(0, 0, r2, 0, Math.PI, false); if(r1 > 0){ sh.lineTo(-r1, 0); sh.absarc(0, 0, r1, Math.PI, 0, true); } else sh.lineTo(0, 0); sh.closePath();
    const ms = new T.Mesh(new T.ExtrudeGeometry(sh, {depth:h, bevelEnabled:false, curveSegments:64}), m); ms.rotation.x = -Math.PI / 2; ms.position.set(MK.x, 0, MK.z); g.add(ms);
    if(r1 > 0){ const nur = new T.Mesh(new T.TorusGeometry(r1, .012, 6, 96, Math.PI), new T.MeshBasicMaterial({color:0xffcf9a, toneMapped:false, transparent:true, opacity:.55})); nur.rotation.x = -Math.PI / 2; nur.position.set(MK.x, h + .004, MK.z); g.add(nur); }
    return ms; };
  const tax = yarim(0, 7.4, .02, sahnaM); tax.position.y = -.3; tax.scale.z = 15;
  const oldi = quti(14.9, .3, 1.4, sahnaM, .04); oldi.position.set(0, -.15, MK.z + .6); g.add(oldi);
  [[4.3, .18], [5.3, .38], [6.3, .6]].forEach(([r, h])=>yarim(r, 7.25, h, fiz('#241b15', {roughness:.5, clearcoat:.4})));
  /* ---- guruh zonalari (polda rangli sektorlar) ---- */
  const zona = (r1, r2, a1, a2, y, gr)=>{ const m = new T.Mesh(new T.RingGeometry(r1, r2, 48, 1, a1, a2 - a1), new T.MeshBasicMaterial({color:new T.Color(ORK_G[gr].rang), transparent:true, opacity:.16, depthWrite:false, side:T.DoubleSide})); m.rotation.x = -Math.PI / 2; m.position.set(MK.x, y + .012, MK.z); g.add(m); zonalar[gr].push(m); return m; };
  const zonalar = {torli:[], yogoch:[], mis:[], zarbli:[]};
  /* burchak: 0 — auditoriyadan qaraganda o‘ng (+x), π — chap; sahna orqasi −z */
  zona(1.0, 4.25, .02, Math.PI - .02, 0, 'torli');
  zona(4.35, 5.25, .7, Math.PI - .7, .18, 'yogoch');
  zona(5.35, 6.25, .9, Math.PI - .35, .38, 'mis');
  zona(6.35, 7.15, .7, Math.PI - .7, .6, 'zarbli');
  zona(4.35, 5.25, .03, .55, .18, 'torli');
  /* ---- materiallar ---- */
  const yogM = (()=>{ const m = new T.MeshPhysicalMaterial({map:yogoch(T, '#5e240a', '30,10,2'), roughness:.3, clearcoat:.9, clearcoatRoughness:.12}); m.userData.env = 1; m.envMapIntensity = .5; return m; })();
  const qoraM = fiz('#141418', {roughness:.3, clearcoat:.8});
  const misM = (()=>{ const m = new T.MeshPhysicalMaterial({color:new T.Color('#d8a93c').convertSRGBToLinear(), metalness:1, roughness:.22, clearcoat:.5}); m.userData.env = 1; m.envMapIntensity = .9; return m; })();
  const kumushM = (()=>{ const m = new T.MeshPhysicalMaterial({color:new T.Color('#d7dbe3').convertSRGBToLinear(), metalness:1, roughness:.18}); m.userData.env = 1; m.envMapIntensity = .9; return m; })();
  const misQiz = (()=>{ const m = new T.MeshPhysicalMaterial({color:new T.Color('#b8683a').convertSRGBToLinear(), metalness:1, roughness:.28}); m.userData.env = 1; m.envMapIntensity = .8; return m; })();
  const teriM = mat('#eee2c4', {roughness:.8});
  const torM = mat('#e6e8ee', {metalness:.8, roughness:.3});
  const stulM = mat('#2a2d36', {roughness:.5, metalness:.3});
  /* ---- cholg‘u modellari ---- */
  const skripkaShakl = (()=>{ const s = new T.Shape(); const P = [[0, -1], [.52, -.92], [.62, -.5], [.4, -.1], [.38, .05], [.5, .45], [.4, .82], [0, .9]]; s.moveTo(0, -1); const pts = P.map(p=>new T.Vector2(p[0], p[1])); const eg = new T.SplineCurve(pts); const o = eg.getPoints(30); o.forEach(p=>s.lineTo(p.x, p.y)); for(let i = o.length - 1; i >= 0; i--) s.lineTo(-o[i].x, o[i].y); return s; })();
  function torliC(h, uzunDasta){
    const q = new T.Group();
    const tana = new T.Mesh(new T.ExtrudeGeometry(skripkaShakl, {depth:.18, bevelEnabled:true, bevelThickness:.05, bevelSize:.04, bevelSegments:2, curveSegments:8}), yogM); tana.position.z = -.09; q.add(tana);
    const dasta = quti(.1, .9 * uzunDasta, .08, qoraM, .03); dasta.position.set(0, .9 + .45 * uzunDasta - .1, .08); q.add(dasta);
    const bosh = new T.Mesh(new T.TorusGeometry(.07, .03, 8, 16), yogM); bosh.position.set(0, .9 + .9 * uzunDasta - .05, .06); bosh.rotation.y = Math.PI / 2; q.add(bosh);
    const xarrak = quti(.28, .12, .02, mat('#e9d9b6'), .01); xarrak.position.set(0, -.25, .17); q.add(xarrak);
    for(let i = 0; i < 4; i++){ const tor = silindr(.004, .004, 1.1 + .9 * uzunDasta, torM, 4); tor.position.set((i - 1.5) * .03, .3 + .45 * uzunDasta - .15, .15); q.add(tor); }
    [-1, 1].forEach(s=>{ const ef = quti(.03, .36, .01, qoraM, .004); ef.position.set(s * .2, -.05, .135); ef.rotation.z = s * .12; q.add(ef); });
    q.scale.setScalar(h); return q;
  }
  function stul(q, y){ const s = new T.Group(); const o = quti(.42, .06, .4, stulM, .02); o.position.y = .42; s.add(o); const su = quti(.42, .45, .05, stulM, .02); su.position.set(0, .66, -.2); s.add(su); [[-.18, -.16], [.18, -.16], [-.18, .16], [.18, .16]].forEach(([x, z])=>{ const l = silindr(.02, .02, .42, stulM, 6); l.position.set(x, .21, z); s.add(l); }); s.position.y = y || 0; s.traverse(o=>{ if(o.isMesh) o.userData.stul = 1; }); q.add(s); }
  function pult(q){ const p = new T.Group(); const t = silindr(.015, .015, 1.0, stulM, 6); t.position.y = .5; p.add(t); const v = quti(.42, .3, .02, stulM, .01); v.position.set(0, 1.05, 0); v.rotation.x = -.35; p.add(v); const n = new T.Mesh(new T.PlaneGeometry(.36, .24), new T.MeshBasicMaterial({color:0xf2ecdc})); n.position.set(0, 1.055, .014); n.rotation.x = -.35; p.add(n); p.position.set(0, 0, .55); q.add(p); }
  const M = {};
  M.skripka = ()=>{ const q = new T.Group(); stul(q); const c = torliC(.19); c.position.set(.12, 1.02, .1); c.rotation.set(-.6, 0, 1.1); q.add(c); return q; };
  M.alt = ()=>{ const q = new T.Group(); stul(q); const c = torliC(.22); c.position.set(.12, 1.02, .1); c.rotation.set(-.6, 0, 1.1); q.add(c); return q; };
  M.violonchel = ()=>{ const q = new T.Group(); stul(q); const c = torliC(.4); c.position.set(0, .55, .32); c.rotation.x = -.18; q.add(c); const ig = silindr(.008, .008, .3, kumushM, 6); ig.position.set(0, .1, .38); q.add(ig); return q; };
  M.kontrabas = ()=>{ const q = new T.Group(); const c = torliC(.58, 1.1); c.position.set(0, .72, .15); c.rotation.x = -.12; q.add(c); const ig = silindr(.01, .01, .25, kumushM, 6); ig.position.set(0, .1, .22); q.add(ig); return q; };
  const damliTik = (uz, r, m, qongiroq)=>{ const q = new T.Group(); const t = silindr(r, r, uz, m, 16); t.position.y = uz / 2; q.add(t); for(let i = 1; i < 6; i++){ const k = silindr(r * 1.25, r * 1.25, .012, kumushM, 12); k.position.y = uz * i / 6; q.add(k); } if(qongiroq){ const b = silindr(r * 1.1, r * 2.4, .16, m, 20); b.position.y = -.06; q.add(b); } return q; };
  M.fleyta = ()=>{ const q = new T.Group(); stul(q); const f2 = silindr(.018, .018, .95, kumushM, 12); f2.rotation.z = Math.PI / 2 - .15; f2.position.set(.3, 1.15, .18); q.add(f2); for(let i = 0; i < 6; i++){ const k = silindr(.024, .024, .01, kumushM, 10); k.position.set(.15 + i * .09, 1.19 - i * .014, .2); k.rotation.x = Math.PI / 2; q.add(k); } return q; };
  M.goboy = ()=>{ const q = new T.Group(); stul(q); const c = damliTik(.62, .02, qoraM, false); c.position.set(0, .72, .35); c.rotation.x = -.7; q.add(c); return q; };
  M.klarnet = ()=>{ const q = new T.Group(); stul(q); const c = damliTik(.66, .024, qoraM, true); c.position.set(0, .66, .38); c.rotation.x = -.6; q.add(c); return q; };
  M.fagot = ()=>{ const q = new T.Group(); stul(q); const c = damliTik(1.3, .04, yogM, false); c.position.set(.1, .15, .3); c.rotation.x = -.18; q.add(c); const bo = new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(new T.Vector3(.1, 1.3, .12), new T.Vector3(.1, 1.45, .3), new T.Vector3(.05, 1.3, .45)), 12, .008, 6, false), kumushM); q.add(bo); return q; };
  M.valtorna = ()=>{ const q = new T.Group(); stul(q); const h = new T.Group(); const k1 = new T.Mesh(new T.TorusGeometry(.17, .02, 10, 40), misM); h.add(k1); const k2 = new T.Mesh(new T.TorusGeometry(.12, .015, 8, 32), misM); k2.position.z = .03; h.add(k2); const b = new T.Mesh(new T.CylinderGeometry(.16, .03, .3, 24, 1, true), misM); b.position.set(.18, -.12, 0); b.rotation.z = Math.PI / 2 + .4; h.add(b); h.position.set(.2, .95, .15); h.rotation.y = .6; h.scale.setScalar(1.45); q.add(h); return q; };
  M.truba = ()=>{ const q = new T.Group(); stul(q); const h = new T.Group(); const t = silindr(.016, .016, .55, misM, 10); t.rotation.z = Math.PI / 2; h.add(t); const t2 = silindr(.016, .016, .4, misM, 10); t2.rotation.z = Math.PI / 2; t2.position.set(-.05, -.08, 0); h.add(t2); const b = new T.Mesh(new T.CylinderGeometry(.1, .016, .22, 24, 1, true), misM); b.rotation.z = -Math.PI / 2; b.position.x = .38; h.add(b); for(let i = 0; i < 3; i++){ const v = silindr(.018, .018, .14, kumushM, 8); v.position.set(-.05 + i * .05, -.02, 0); h.add(v); } h.position.set(0, 1.12, .35); h.rotation.y = -Math.PI / 2; h.rotation.x = .15; h.scale.setScalar(1.45); q.add(h); return q; };
  M.trombon = ()=>{ const q = new T.Group(); stul(q); const h = new T.Group(); [-.035, .035].forEach(x=>{ const t = silindr(.012, .012, .9, misM, 8); t.rotation.x = Math.PI / 2; t.position.set(x, 0, .3); h.add(t); }); const u = new T.Mesh(new T.TorusGeometry(.035, .012, 8, 16, Math.PI), misM); u.rotation.x = Math.PI / 2; u.position.z = .75; h.add(u); const b = new T.Mesh(new T.CylinderGeometry(.12, .02, .3, 24, 1, true), misM); b.rotation.x = Math.PI / 2; b.position.set(.1, .03, .2); h.add(b); h.position.set(0, 1.1, .1); h.rotation.x = .25; h.scale.setScalar(1.45); q.add(h); return q; };
  M.tuba = ()=>{ const q = new T.Group(); stul(q); const h = new T.Group(); const t = silindr(.09, .07, .7, misM, 20); h.add(t); const b = new T.Mesh(new T.CylinderGeometry(.26, .1, .3, 32, 1, true), misM); b.position.y = .48; h.add(b); const k = new T.Mesh(new T.TorusGeometry(.12, .04, 10, 24), misM); k.position.set(0, -.25, .08); h.add(k); for(let i = 0; i < 4; i++){ const v = silindr(.02, .02, .18, kumushM, 8); v.position.set(-.13, .05 + i * .06, .05); v.rotation.z = Math.PI / 2; h.add(v); } h.position.set(.05, .88, .2); h.scale.setScalar(1.45); q.add(h); return q; };
  M.litavra = ()=>{ const q = new T.Group(); [[-.55, 0, .42], [.1, .12, .48], [.72, 0, .38]].forEach(([x, z, r])=>{ const k = new T.Mesh(new T.SphereGeometry(r, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), misQiz); k.position.set(x, .78, z); q.add(k); const tr = new T.Mesh(new T.CircleGeometry(r * .98, 32), teriM); tr.rotation.x = -Math.PI / 2; tr.position.set(x, .785, z); q.add(tr); const gd = new T.Mesh(new T.TorusGeometry(r, .02, 8, 36), kumushM); gd.rotation.x = Math.PI / 2; gd.position.set(x, .79, z); q.add(gd); [0, 1, 2].forEach(i=>{ const a = i * 2.1; const o2 = silindr(.015, .015, .5, kumushM, 6); o2.position.set(x + Math.cos(a) * r * .7, .25, z + Math.sin(a) * r * .7); q.add(o2); }); }); return q; };
  M.baraban = ()=>{ const q = new T.Group(); const d = silindr(.5, .5, .36, mat('#7a1d2a', {roughness:.4}), 36); d.rotation.x = Math.PI / 2; d.position.y = .75; q.add(d); [-.185, .185].forEach(z=>{ const tr = new T.Mesh(new T.CircleGeometry(.49, 36), teriM); tr.position.set(0, .75, z); if(z < 0) tr.rotation.y = Math.PI; q.add(tr); const gd = new T.Mesh(new T.TorusGeometry(.5, .025, 8, 36), kumushM); gd.position.set(0, .75, z); q.add(gd); }); const st = quti(.7, .3, .5, stulM, .03); st.position.y = .15; q.add(st); q.rotation.y = Math.PI / 2; return q; };
  M.tarelka = ()=>{ const q = new T.Group(); const st = silindr(.018, .018, 1.2, stulM, 6); st.position.y = .6; q.add(st); [1.22, 1.3].forEach((y, i)=>{ const t = new T.Mesh(new T.ConeGeometry(.34, .05, 32, 1, true), misM); t.position.y = y; t.rotation.x = i ? Math.PI : 0; t.material.side = T.DoubleSide; q.add(t); }); return q; };
  M.ksilofon = ()=>{ const q = new T.Group(); const r = quti(1.3, .06, .5, stulM, .02); r.position.y = .78; q.add(r); for(let i = 0; i < 14; i++){ const L2 = .46 - i * .018; const b = quti(.075, .03, L2, mat('#9a5a2a', {roughness:.4}), .01); b.position.set(-.6 + i * .092, .83, 0); q.add(b); } [-.55, .55].forEach(x=>{ const o2 = silindr(.02, .02, .78, stulM, 6); o2.position.set(x, .39, 0); q.add(o2); }); return q; };
  M.arfa = ()=>{ const q = new T.Group(); const zolM = misM; const ust = silindr(.05, .06, 1.9, zolM, 16); ust.position.set(-.35, .95, 0); q.add(ust); const rez = quti(.16, 1.7, .18, yogM, .05); rez.position.set(.18, .9, 0); rez.rotation.z = -.35; q.add(rez); const bo = new T.Mesh(new T.TubeGeometry(new T.CubicBezierCurve3(new T.Vector3(-.35, 1.9, 0), new T.Vector3(-.1, 2.1, 0), new T.Vector3(.2, 1.6, 0), new T.Vector3(.5, 1.75, 0)), 24, .04, 8, false), zolM); q.add(bo); const as = quti(.8, .12, .35, zolM, .04); as.position.set(0, .06, 0); q.add(as); for(let i = 0; i < 14; i++){ const t = i / 13; const yp = .2 + t * .1, xs = -.28 + t * .72; const yb = 1.88 - t * .05 - Math.sin(t * Math.PI) * .12; const tor = silindr(.003, .003, 1, i % 7 === 0 ? mat('#c0392b') : torM, 4); const a = new T.Vector3(xs, yp + t * 1.3 * .45 + .1, 0), b = new T.Vector3(xs, yb, 0); tor.position.copy(a).add(b).multiplyScalar(.5); tor.scale.y = a.distanceTo(b); q.add(tor); } return q; };
  M.dirijyor = ()=>{ const q = new T.Group(); const pod = quti(.9, .22, .9, fiz('#3a2a20', {clearcoat:.6, roughness:.4}), .04); pod.position.y = .11; q.add(pod); const kiyim = fiz('#101014', {roughness:.6, clearcoat:.2}); const tana = new T.Mesh(new T.CylinderGeometry(.2, .26, .75, 20), kiyim); tana.position.y = 1.02; q.add(tana); [-.09, .09].forEach(x=>{ const o2 = silindr(.07, .06, .6, kiyim, 12); o2.position.set(x, .52, 0); q.add(o2); }); const bosh = new T.Mesh(new T.SphereGeometry(.14, 24, 16), mat('#d9a47a', {roughness:.6})); bosh.position.y = 1.55; q.add(bosh); const soch = new T.Mesh(new T.SphereGeometry(.145, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.1), mat('#2a1a10', {roughness:.8})); soch.position.y = 1.57; q.add(soch); const qol = new T.Group(); qol.position.set(.2, 1.3, 0); const q2 = silindr(.045, .04, .5, kiyim, 10); q2.position.y = -.2; q2.rotation.z = .3; qol.add(q2); const tayoq = silindr(.006, .004, .45, mat('#f4f2ea'), 6); tayoq.position.set(.2, .1, 0); tayoq.rotation.z = -.9; qol.add(tayoq); q.add(qol); q.userData.qol = qol; const qol2 = silindr(.045, .04, .5, kiyim, 10); qol2.position.set(-.26, 1.12, 0); qol2.rotation.z = -.4; q.add(qol2); q.rotation.y = Math.PI; return q; };
  /* ---- joylashtirish ---- */
  const JOY = []; /* [kalit, r, a (0 — o‘ng, π — chap, sahna orqasi tomonda), balandlik] */
  const qator = (k, r, a1, a2, n, y)=>{ for(let i = 0; i < n; i++) JOY.push([k, r, n === 1 ? (a1 + a2) / 2 : a1 + (a2 - a1) * i / (n - 1), y]); };
  qator('skripka', 1.9, Math.PI - .25, Math.PI - .95, 3, 0); qator('skripka', 3.1, Math.PI - .15, Math.PI - .7, 4, 0); /* 1-skripkalar */
  qator('skripka', 1.9, Math.PI - 1.25, Math.PI - 1.52, 2, 0); qator('skripka', 3.1, Math.PI - .95, Math.PI - 1.45, 3, 0); /* 2-skripkalar */
  qator('alt', 1.9, 1.52, 1.2, 2, 0); qator('alt', 3.1, 1.45, 1.05, 3, 0);
  qator('violonchel', 1.9, .95, .3, 3, 0); qator('violonchel', 3.1, .8, .25, 3, 0);
  qator('kontrabas', 4.8, .45, .12, 3, .18);
  qator('fleyta', 4.8, 2.3, 2.1, 2, .18); qator('goboy', 4.8, 1.9, 1.7, 2, .18); qator('klarnet', 4.8, 1.45, 1.25, 2, .18); qator('fagot', 4.8, 1.05, .85, 2, .18);
  qator('valtorna', 5.8, 2.6, 2.2, 3, .38); qator('truba', 5.8, 1.9, 1.72, 2, .38); qator('trombon', 5.8, 1.5, 1.3, 2, .38); qator('tuba', 5.8, 1.08, 1.08, 1, .38);
  qator('ksilofon', 6.75, 2.3, 2.3, 1, .6); qator('litavra', 6.75, 1.72, 1.72, 1, .6); qator('baraban', 6.75, 1.22, 1.22, 1, .6); qator('tarelka', 6.75, .98, .98, 1, .6);
  JOY.push(['arfa', 4.8, 2.85, .18]);
  const guruhMarkaz = {torli:[], yogoch:[], mis:[], zarbli:[], boshqa:[]};
  const CH = {};
  JOY.forEach(([k, r, a, y])=>{
    const ob = M[k](); const x = Math.cos(a) * r, z = MK.z - Math.sin(a) * r;
    ob.position.set(x, y, z); ob.lookAt(MK.x, y, MK.z); g.add(ob);
    bosiladigan(ob, k, {cholgu:k}); A.qismlar.set(k, A.qismlar.get(k).filter(m=>!m.userData.stul));
    (CH[k] = CH[k] || []).push(ob); guruhMarkaz[ORK_C[k][1]].push(new T.Vector3(x, y + .8, z));
    soya(k === 'litavra' ? 2.4 : 1, k === 'litavra' ? 1.6 : 1, x, z, y, .55);
  });
  const dir = M.dirijyor(); dir.position.copy(MK); dir.position.z += .1; g.add(dir); bosiladigan(dir, 'dirijyor', {cholgu:'dirijyor'}); CH.dirijyor = [dir]; guruhMarkaz.boshqa.push(new T.Vector3(MK.x, 1, MK.z));
  const dPult = new T.Group(); pult(dPult); dPult.position.set(MK.x, .22, MK.z - .5); dPult.rotation.y = Math.PI; g.add(dPult);
  soya(1.4, 1.4, MK.x, MK.z, 0, .8);
  /* guruh yozuvlari */
  const markazi = gr=>{ const v = new T.Vector3(); guruhMarkaz[gr].forEach(p=>v.add(p)); return v.multiplyScalar(1 / Math.max(1, guruhMarkaz[gr].length)); };
  const gYoz = {};
  const GY = {torli:[-3.2, 1.3, 2.6], yogoch:[0, 1.35, MK.z - 4.8], mis:[2.64, 2.0, -2.56], zarbli:[-4.5, 2.2, -2.3]};
  Object.keys(GY).forEach(gr=>{ const y = yozuv(ORK_G[gr].nom.replace(' guruh', ''), {bal:.36, w:560, h:110, shrift:'800 52px Inter, sans-serif', rang:ORK_G[gr].rang, chuqurlik:false}); y.position.set(GY[gr][0], GY[gr][1], GY[gr][2]); g.add(y); gYoz[gr] = y; });
  /* ---- tovush ---- */
  const REG = {skripka:[76, 'kamon'], alt:[67, 'kamon'], violonchel:[55, 'kamon'], kontrabas:[40, 'kamon'], fleyta:[79, 'fleyta'], goboy:[72, 'goboy'], klarnet:[67, 'klarnet'], fagot:[50, 'fagot'],
    valtorna:[60, 'mis'], truba:[72, 'mis'], trombon:[55, 'mis'], tuba:[40, 'mis'], litavra:[43, 'litavra'], baraban:[36, 'baraban'], tarelka:[0, 'tarelka'], ksilofon:[84, 'ksilofon'], arfa:[60, 'arfa'], dirijyor:[60, 'tutti']};
  const TB = {kamon:{tip:'sawtooth', hujum:.12, vib:{tez:5.6, chuq:.007}, filtr:3000}, fleyta:{garm:[1, .2, .06], hujum:.08, vib:{tez:5, chuq:.005}}, goboy:{garm:[.6, 1, .8, .6, .45, .3, .2], hujum:.05, vib:{tez:5.5, chuq:.004}, filtr:3500},
    klarnet:{garm:[1, 0, .5, 0, .3, 0, .15], hujum:.06}, fagot:{garm:[.7, 1, .8, .55, .4, .25], hujum:.07, filtr:1500}, mis:{garm:[1, .85, .7, .55, .45, .35, .28, .2], hujum:.09, filtr:2600}};
  function nota(k, m, kech, dur, vol){
    const [_, t] = REG[k]; const f = midiF(m);
    if(t === 'arfa'){ O.chertma(f, 2.2, {kech, yut:.997, yorqin:.35, vol:(vol || 1) * .35}); return; }
    if(t === 'ksilofon'){ O.ton(f, .5, {kech, vol:(vol || 1) * .22, hujum:.002}); O.ton(f * 3.93, .15, {kech, vol:(vol || 1) * .05, hujum:.002}); return; }
    if(t === 'litavra'){ O.ton(f, 1.2, {kech, vol:(vol || 1) * .4, hujum:.004}); O.zarb(200, .5, {kech, tur:'lowpass', vol:(vol || 1) * .4}); return; }
    if(t === 'baraban'){ O.zarb(120, .6, {kech, tur:'lowpass', vol:.7, past:55, pastVol:.5}); return; }
    if(t === 'tarelka'){ O.zarb(7000, 1.4, {kech, tur:'highpass', q:.6, vol:.35, egri:1.6}); return; }
    const p = TB[t] || TB.kamon;
    O.ton(f, dur, {kech, tip:p.tip, garm:p.garm, vol:(vol || 1) * (f < 110 ? .2 : .12), hujum:p.hujum, ushlab:true, sonish:.15, vibrato:p.vib ? {tez:p.vib.tez, chuq:p.vib.chuq, kech:.15} : null, filtr:p.filtr ? {f:p.filtr} : null});
  }
  function chal(k){
    if(!audio()) return;
    const [b, t] = REG[k];
    if(t === 'tutti'){ ['kontrabas', 'violonchel', 'valtorna', 'klarnet', 'skripka'].forEach((c, i)=>{ const m = [48, 55, 60, 64, 72][i]; nota(c, m, 0, 1.6, .7); }); nota('litavra', 43, 0); nota('tarelka', 0, 0); return; }
    if(['litavra', 'baraban', 'tarelka'].includes(t)){ [0, .35, .6].forEach((d, i)=>nota(k, b + (t === 'litavra' ? [0, 7, 0][i] : 0), d)); return; }
    if(t === 'ksilofon' || t === 'arfa'){ [0, 4, 7, 12, 7, 4].forEach((q, i)=>nota(k, b + q, i * .12)); return; }
    [0, 4, 7].forEach((q, i)=>nota(k, b + q, i * .28, .5 + (i === 2 ? .5 : 0)));
  }
  function guruhChal(gr){ if(!audio()) return; if(gr === 'torli'){ nota('kontrabas', 48, 0, 1.5, .8); nota('violonchel', 55, 0, 1.5, .8); nota('alt', 64, 0, 1.5, .8); nota('skripka', 72, 0, 1.5, .8); } else if(gr === 'yogoch'){ nota('fagot', 48, 0, 1.5); nota('klarnet', 64, 0, 1.5); nota('goboy', 67, 0, 1.5); nota('fleyta', 76, 0, 1.5); } else if(gr === 'mis'){ nota('tuba', 36, 0, 1.5); nota('trombon', 48, 0, 1.5); nota('valtorna', 55, 0, 1.5); nota('truba', 64, 0, 1.5); } else if(gr === 'zarbli'){ nota('litavra', 43, 0); nota('baraban', 0, .45); nota('tarelka', 0, .45); ['ksilofon'].forEach(()=>[0, 4, 7].forEach((q, i)=>nota('ksilofon', 84 + q, .9 + i * .1))); } }
  /* ---- tanlash ---- */
  let tGuruh = null, tNom = null, puls = 0;
  function zonaYorit(gr){ Object.keys(zonalar).forEach(k=>zonalar[k].forEach(m=>{ m.material.opacity = gr === k ? .42 : gr ? .06 : .16; })); }
  function guruhKor(gr, fok){
    tGuruh = gr; tNom = null;
    const nomlar = gr ? Object.keys(ORK_C).filter(k=>ORK_C[k][1] === gr) : [];
    belgila(nomlar, ORK_G[gr || 'boshqa'].rang, .32); zonaYorit(gr);
    faolQil(tag, '[data-g]', gr ? tag.querySelector('[data-g="' + gr + '"]') : null);
    if(gr){ izoh.innerHTML = '<b>' + ORK_G[gr].nom + '</b>: ' + nomlar.map(k=>ORK_C[k][0]).join(', ') + '.' + (gr === 'torli' ? ' Eng katta guruh — dirijyorga eng yaqin o‘tiradi.' : gr === 'yogoch' ? ' O‘rtada, torlilar ortida.' : gr === 'mis' ? ' Yog‘och damlilar ortida — ovozi kuchli.' : ' Eng orqada.'); if(fok) S.fokus(3.4, markazi(gr), true); }
  }
  function cholguKor(k, fok){
    tNom = k; const gr = ORK_C[k][1]; tGuruh = gr === 'boshqa' ? null : gr;
    belgila([k], ORK_G[gr].rang, .6); zonaYorit(tGuruh);
    faolQil(tag, '[data-g]', tGuruh ? tag.querySelector('[data-g="' + tGuruh + '"]') : null);
    izoh.innerHTML = '<b>' + ORK_C[k][0] + '</b> — ' + (gr === 'boshqa' ? (k === 'arfa' ? 'torli cholg‘u, lekin odatda alohida (guruhlarga kirmaydi); torlilar yonida, chapda o‘tiradi.' : 'orkestrni boshqaradi: temp, kirishlar, dinamika.') : ORK_G[gr].nom.toLowerCase() + '.') + ' Tovush — sintez (taxminiy tembr).';
    if(fok){ const p = CH[k][0].position; S.fokus(2.0, new T.Vector3(p.x, p.y + .8, p.z), true); }
  }
  tugmalar(tag, [
    ...['torli', 'yogoch', 'mis', 'zarbli'].map(gr=>({m:ORK_G[gr].nom.replace(' guruh', ''), k:gr, f:()=>{ guruhKor(gr, true); guruhChal(gr); detal('im_orkestr', gr); hodisa('im-orkestr', {nom:gr, guruh:gr}); }})), '|',
    {m:'Dirijyor', f:()=>{ cholguKor('dirijyor', true); chal('dirijyor'); puls = 1.5; detal('im_orkestr', 'dirijyor'); hodisa('im-orkestr', {nom:'dirijyor', guruh:'boshqa'}); }},
    {m:'Hammasi', f:()=>{ guruhKor(null); S.tikla(); izoh.innerHTML = BOSH; }},
    {m:'■', t:'Tovushni to‘xtatish', f:()=>O.toxtat()}
  ]);
  ['torli', 'yogoch', 'mis', 'zarbli'].forEach((gr, i)=>{ tag.querySelectorAll('button')[i].dataset.g = gr; });
  const BOSH = 'Cholg‘uni <b>bosing</b> — uning guruhi va qisqa sintez ohangi. Oldinda — torlilar, o‘rtada — yog‘och damlilar, orqada — mis damlilar va eng orqada — zarblilar.';
  S.bosish = ud=>{ const k = ud.cholgu; if(!k) return; cholguKor(k, false); chal(k); if(k === 'dirijyor') puls = 1.5; detal('im_orkestr', k === 'baraban' || k === 'tarelka' || k === 'ksilofon' ? 'zarbli' : k); hodisa('im-orkestr', {nom:k, guruh:ORK_C[k][1]}); };
  S.holat = h=>{ if(!h) return; if(h.nom){ cholguKor(h.nom, true); } else if(h.guruh){ guruhKor(h.guruh, true); } else { guruhKor(null); S.tikla(); izoh.innerHTML = BOSH; } };
  S.kadrda = (dt, t)=>{ puls = Math.max(0, puls - dt); dir.userData.qol.rotation.z = Math.sin(t * (puls > 0 ? 6 : 1.4)) * (puls > 0 ? .35 : .08); Object.keys(gYoz).forEach(k=>{ gYoz[k].material.opacity = tGuruh && tGuruh !== k ? .35 : 1; }); };
  izoh.innerHTML = BOSH;
  S.joyla(testda ? 6.2 : 6.6, new T.Vector3(0, .8, -.4));
  return S;
};

/* ================= 12. SHASHMAQOM (im_maqom) ================= */
const MAQOM = [['buzruk', 'Buzruk'], ['rost', 'Rost'], ['navo', 'Navo'], ['dugoh', 'Dugoh'], ['segoh', 'Segoh'], ['iroq', 'Iroq']];
const MQ_RANG = ['#e8508f', '#ffb347', '#36d6a0', '#5cc8ff', '#8f7bff', '#f5c542'];
const SHOBA = {mushkilot:[['tasnif', 'Tasnif'], ['tarje', 'Tarje'], ['gardun', 'Gardun'], ['muxammas', 'Muxammas'], ['saqil', 'Saqil']],
  nasr:[['saraxbor', 'Saraxbor'], ['talqin', 'Talqin'], ['nasr', 'Nasr'], ['ufar', 'Ufar'], ['savt', 'Savt'], ['mogulcha', 'Mo‘g‘ulcha']]};
R.im_maqom = async (sahna, {tag, izoh, yorliq})=>{
  yorliq('Musiqa · Shashmaqom tuzilishi · diagramma sxematik, usul sintez');
  const A = asos(sahna, {rx:.95, ry:0, rxMin:.3, rxMax:1.35, ryMin:-1.3, ryMax:1.3, zoom:1.0});
  const {S, T, g, mat, fiz, quti, silindr, soya, podium, yozuv, matnTex, bosiladigan, belgila, testda} = A;
  const O = ovozchi(); A.tozalash.push(()=>O.toxtat());
  podium(5.2, 0, '#f5c542');
  /* halqa sektori (yuqoridan soat mili bo‘yicha: a0 — yuqoridan burchak) */
  const TOP = .02;
  function sektor(r1, r2, a0, a1, h, rangH, oq){
    const s = new T.Shape();
    const p = (r, a)=>[Math.sin(a) * r, Math.cos(a) * r];
    const N = Math.max(6, Math.ceil((a1 - a0) * 24));
    s.moveTo(...p(r1, a0)); for(let i = 0; i <= N; i++) s.lineTo(...p(r2, a0 + (a1 - a0) * i / N)); for(let i = N; i >= 0; i--) s.lineTo(...p(r1, a0 + (a1 - a0) * i / N));
    const m = new T.Mesh(new T.ExtrudeGeometry(s, {depth:h, bevelEnabled:true, bevelThickness:.02, bevelSize:.02, bevelSegments:2, curveSegments:4}), mat(rangH, {roughness:.5, metalness:.1, env:.18, emissive:new T.Color(rangH).convertSRGBToLinear(), emissiveIntensity:.05}));
    m.material.color.multiplyScalar(oq ? .42 : .36);
    m.rotation.x = -Math.PI / 2; /* shape Y → dunyo −Z: a=0 — orqa (ekranda yuqori) */
    m.position.y = TOP;
    return m;
  }
  const bo = .012; /* sektorlar orasidagi tirqish (radian) */
  const orta = (r, a)=>new T.Vector3(Math.sin(a) * r, 0, -Math.cos(a) * r);
  /* markaziy disk */
  const disk = silindr(1.55, 1.6, .16, fiz('#1b1f30', {roughness:.3, metalness:.4, clearcoat:.9}), 80); disk.position.y = .08; g.add(disk);
  const naqshT = matnTex(1024, 1024, (x, w, h)=>{ x.fillStyle = '#141828'; x.fillRect(0, 0, w, h); x.translate(w / 2, h / 2); x.strokeStyle = 'rgba(245,197,66,.35)'; x.lineWidth = 3; for(let k = 0; k < 12; k++){ x.rotate(Math.PI / 6); x.beginPath(); x.moveTo(0, 0); for(let t = 0; t <= 1; t += .02){ const r = t * 480, a = Math.sin(t * Math.PI * 2) * .35; x.lineTo(Math.sin(a) * r, Math.cos(a) * r); } x.stroke(); } x.beginPath(); x.arc(0, 0, 470, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 240, 0, Math.PI * 2); x.stroke(); });
  const naqsh = new T.Mesh(new T.CircleGeometry(1.5, 80), new T.MeshStandardMaterial({map:naqshT, roughness:.7})); naqsh.rotation.x = -Math.PI / 2; naqsh.position.y = .165; g.add(naqsh);
  /* ---- tanbur (yotqizilgan) ---- */
  const tG = new T.Group(); tG.position.set(0, .3, 0); tG.rotation.set(-Math.PI / 2, 0, -.62); tG.scale.setScalar(.78); g.add(tG);
  const tutM = (()=>{ const m = new T.MeshPhysicalMaterial({map:yogoch(T, '#7a4520', '40,18,6'), roughness:.35, clearcoat:.9, clearcoatRoughness:.15}); m.userData.env = 1; m.envMapIntensity = .45; return m; })();
  const ochM = (()=>{ const m = new T.MeshPhysicalMaterial({map:yogoch(T, '#c89a5c', '110,70,30'), roughness:.4, clearcoat:.7}); m.userData.env = 1; m.envMapIntensity = .4; return m; })();
  const kosaPts = []; for(let i = 0; i <= 16; i++){ const t = i / 16; kosaPts.push(new T.Vector2(Math.max(.001, .32 * Math.sin(Math.PI * Math.pow(t, .8)) * (1 - .35 * t)), -.36 + t * .72)); }
  const kosa = new T.Mesh(new T.LatheGeometry(kosaPts, 40, 0, Math.PI), tutM); kosa.rotation.y = -Math.PI / 2; kosa.scale.z = .7; kosa.position.y = -.9; tG.add(kosa);
  const yz = new T.Mesh(new T.CircleGeometry(.27, 32), ochM); yz.scale.y = 1.25; yz.position.set(0, -.92, .005); tG.add(yz);
  const dasta = quti(.09, 2.2, .06, tutM, .02); dasta.position.set(0, .56, .01); tG.add(dasta);
  const bosh = quti(.11, .42, .08, tutM, .03); bosh.position.set(0, 1.86, 0); tG.add(bosh);
  const suyak = mat('#efe6d0', {roughness:.4});
  for(let i = 0; i < 4; i++){ const q = silindr(.016, .024, .17, suyak, 8); q.rotation.z = Math.PI / 2; q.position.set(i % 2 ? .12 : -.12, 1.76 + Math.floor(i / 2) * .15, 0); tG.add(q); }
  const pardaM = mat('#f3e7c6', {roughness:.6});
  for(let i = 0; i < 17; i++){ const y = -.5 + .05 + 2.1 * (1 - Math.pow(.93, i + 1)) * 1.05; if(y > 1.6) break; const pr = new T.Mesh(new T.TorusGeometry(.055, .005, 4, 12), pardaM); pr.rotation.x = Math.PI / 2; pr.scale.set(1, .6, 1); pr.position.set(0, y, .012); tG.add(pr); }
  const torM = mat('#e9edf5', {metalness:.9, roughness:.2});
  const torlar = []; for(let i = 0; i < 4; i++){ const x = (i - 1.5) * .018; const a = new T.Vector3(x, -1.05, .05), b = new T.Vector3(x * .7, 1.63, .045); const t = silindr(.003, .003, a.distanceTo(b), torM, 5); t.position.copy(a).add(b).multiplyScalar(.5); t.lookAt(b); t.rotateX(Math.PI / 2); tG.add(t); torlar.push(t); }
  bosiladigan(tG, 'tanbur', {tanbur:1});
  /* ---- halqalar ---- */
  const R1 = [1.75, 2.55], R2 = [2.62, 3.12], R3 = [3.22, 4.35];
  const qism = {}; /* kalit → {m, rang, a, r, y} */
  const yozlar = [];
  const dA = Math.PI * 2 / 6;
  MAQOM.forEach(([k, nom], i)=>{
    const a0 = i * dA + bo, a1 = (i + 1) * dA - bo;
    const m = sektor(R3[0], R3[1], a0, a1, .22, MQ_RANG[i]); g.add(m);
    m.userData = {}; bosiladigan(m, k, {maqom:k, tartib:i + 1});
    const c = orta((R3[0] + R3[1]) / 2, (a0 + a1) / 2);
    const y = yozuv(nom, {bal:.34, w:420, h:120, shrift:'800 60px Inter, sans-serif', rang:'#fff', fon:'rgba(12,16,34,.55)', chuqurlik:false}); y.position.set(c.x, .72, c.z); g.add(y); yozlar.push(y);
    const n = yozuv(String(i + 1), {bal:.16, w:96, h:96, fon:false, rang:MQ_RANG[i], shrift:'800 70px "JetBrains Mono", monospace', chuqurlik:false}); const c2 = orta(R3[1] + .28, (a0 + a1) / 2); n.position.set(c2.x, .25, c2.z); g.add(n);
    qism[k] = {m, a:(a0 + a1) / 2};
  });
  /* bo‘limlar: mushkilot (chap yarim — cholg‘u), nasr (o‘ng yarim — ashula) */
  const BOLIM = [['nasr_bolim', 'Nasr (ashula)', 0, Math.PI, '#e8508f', 'nasr'], ['mushkilot', 'Mushkilot (cholg‘u)', Math.PI, Math.PI * 2, '#36d6a0', 'mushkilot']];
  const bolimYoz = {};
  BOLIM.forEach(([k, nom, a0, a1, rg, bl])=>{
    const m = sektor(R2[0], R2[1], a0 + bo, a1 - bo, .16, rg, true); g.add(m); m.userData = {}; bosiladigan(m, k, {qism:k, bolim:bl});
    qism[k] = {m, a:(a0 + a1) / 2};
    const c = orta((R2[0] + R2[1]) / 2, bl === 'nasr' ? Math.PI * 2 / 3 : Math.PI * 4 / 3);
    const y = yozuv(nom, {bal:.26, w:620, h:110, shrift:'800 54px Inter, sans-serif', rang:rg, fon:'rgba(12,16,34,.7)', chuqurlik:false}); y.position.set(c.x, .55, c.z); g.add(y); bolimYoz[bl] = y;
  });
  /* sho‘balar: mushkilot 5 ta (π..2π), nasr 6 ta (0..π; 1-guruh 4 ta, 2-guruh 2 ta) */
  const shYoz = [];
  const shobaQur = (ro, a0, a1, bl, rg)=>{ const n = ro.length, d = (a1 - a0) / n; ro.forEach(([k, nom], i)=>{ const b0 = a0 + i * d + bo, b1 = a0 + (i + 1) * d - bo; const ikk = bl === 'nasr' && i >= 4; const m = sektor(R1[0], R1[1], b0, b1, .12, ikk ? '#b04a8f' : rg, true); g.add(m); m.userData = {}; bosiladigan(m, k, {qism:k, bolim:bl}); qism[k] = {m, a:(b0 + b1) / 2};
    const c = orta((R1[0] + R1[1]) / 2 + .02, (b0 + b1) / 2); const y = yozuv(nom, {bal:.19, w:440, h:100, shrift:'700 50px Inter, sans-serif', rang:'#eef1fb', fon:'rgba(12,16,34,.7)', chuqurlik:false}); y.position.set(c.x, .42, c.z); g.add(y); shYoz.push([y, bl]); }); };
  shobaQur(SHOBA.nasr, 0, Math.PI, 'nasr', '#c2185b');
  shobaQur(SHOBA.mushkilot, Math.PI, Math.PI * 2, 'mushkilot', '#1f9e78');
  const guruh2 = yozuv('2-guruh', {bal:.14, w:300, h:90, fon:false, rang:'#e6a3d3', shrift:'700 44px Inter, sans-serif', chuqurlik:false}); const cg = orta(R1[0] - .2, Math.PI * 5 / 6); guruh2.position.set(cg.x, .25, cg.z); g.add(guruh2);
  const guruh1 = yozuv('1-guruh', {bal:.14, w:300, h:90, fon:false, rang:'#e6a3d3', shrift:'700 44px Inter, sans-serif', chuqurlik:false}); const cg1 = orta(R1[0] - .2, Math.PI / 3); guruh1.position.set(cg1.x, .25, cg1.z); g.add(guruh1);
  soya(9.6, 9.6, 0, 0, 0, .55);
  /* markaziy sarlavha */
  const sar = yozuv('', {bal:.42, w:900, h:130, shrift:'800 62px Inter, sans-serif', rang:'#f5c542', fon:'rgba(12,16,34,.78)', chuqurlik:false}); sar.position.set(0, 1.45, 0); g.add(sar);
  /* ---- holat ---- */
  let tMaqom = 'buzruk', tBolim = null, tQism = null, ustida = null;
  S.ustida = ud=>{ ustida = ud ? (ud.maqom || ud.qism || (ud.tanbur ? 'tanbur' : null)) : null; };
  const koTar = {};
  function yangila(){
    MAQOM.forEach(([k], i)=>{ const q = qism[k]; const on = k === tMaqom; koTar[k] = on ? .16 : 0; q.m.material.emissiveIntensity = on ? .3 : .03; });
    BOLIM.forEach(([k, , , , , bl])=>{ const on = tBolim === bl; koTar[k] = on ? .12 : 0; qism[k].m.material.emissiveIntensity = on ? .3 : .03; bolimYoz[bl].material.opacity = !tBolim || on ? 1 : .45; });
    [...SHOBA.mushkilot.map(x=>[x[0], 'mushkilot']), ...SHOBA.nasr.map(x=>[x[0], 'nasr'])].forEach(([k, bl])=>{ const on = tBolim === bl || tQism === k; koTar[k] = tQism === k ? .14 : on ? .06 : 0; qism[k].m.material.emissiveIntensity = tQism === k ? .45 : on ? .2 : .02; });
    shYoz.forEach(([y, bl])=>{ y.material.opacity = !tBolim || tBolim === bl ? 1 : .4; });
    const nom = tMaqom ? MAQOM.find(x=>x[0] === tMaqom)[1] : null;
    sar.yoz(nom ? nom + ' maqomi' + (tBolim ? ' · ' + (tBolim === 'mushkilot' ? 'Mushkilot' : 'Nasr') : '') : 'Shashmaqom — 6 maqom');
    faolQil(tag, '[data-m]', tMaqom ? tag.querySelector('[data-m="' + tMaqom + '"]') : null);
    faolQil(tag, '[data-b]', tBolim ? tag.querySelector('[data-b="' + tBolim + '"]') : null);
  }
  const SH_IZ = {tasnif:'mushkilotning birinchi, salmoqli cholg‘u qismi', tarje:'cholg‘u qismi', gardun:'cholg‘u qismi', muxammas:'cholg‘u qismi', saqil:'vazmin, og‘ir usuldagi cholg‘u qismi', saraxbor:'nasr bo‘limining bosh ashula qismi', talqin:'ashula qismi', nasr:'ashula qismi', ufar:'raqsbop, yengil usuldagi ashula qismi', savt:'2-guruh ashula qismi', mogulcha:'2-guruh ashula qismi'};
  function maqomTanla(k, yub){
    tMaqom = k; tQism = null; yangila();
    const i = MAQOM.findIndex(x=>x[0] === k);
    izoh.innerHTML = '<b>' + MAQOM[i][1] + '</b> — Shashmaqomning ' + (i + 1) + '-maqomi. Har maqom ikki bo‘limdan iborat: <b>Mushkilot</b> (cholg‘u) va <b>Nasr</b> (ashula); bo‘limlar sho‘balarga (qismlarga) bo‘linadi.';
    if(yub){ detal('im_maqom', k); hodisa('im-maqom', {nom:k, tartib:i + 1}); }
  }
  function bolimTanla(bl, yub){
    tBolim = bl; tQism = null; yangila();
    const k = bl === 'mushkilot' ? 'mushkilot' : 'nasr_bolim';
    izoh.innerHTML = bl === 'mushkilot' ? '<b>Mushkilot</b> — cholg‘u bo‘limi: Tasnif, Tarje, Gardun, Muxammas, Saqil (sho‘balar maqomga qarab farq qiladi).' : '<b>Nasr</b> — ashula bo‘limi. 1-guruh: Saraxbor, Talqin, Nasr, Ufar; 2-guruh: Savt va Mo‘g‘ulchalar.';
    if(yub){ detal('im_maqom', k); hodisa('im-maqom-qism', {nom:k, bolim:bl}); }
  }
  function qismTanla(k, bl, yub){
    tQism = k; tBolim = bl; yangila();
    const nom = (SHOBA[bl].find(x=>x[0] === k) || [0, k])[1];
    izoh.innerHTML = '<b>' + nom + '</b> — ' + (SH_IZ[k] || '') + ' (' + (bl === 'mushkilot' ? 'Mushkilot' : 'Nasr') + ' bo‘limi).';
    if(yub){ detal('im_maqom', k); hodisa('im-maqom-qism', {nom:k, bolim:bl}); }
  }
  /* ---- tovush: usul (doira) va tanbur ---- */
  let tPuls = 0, dPuls = 0;
  function usul(){
    if(!audio()) return;
    const q = .3; /* 8 hissalik namunaviy usul: bum – bak bak – bum – bak (taxminiy) */
    const R2u = [[0, 'bum'], [2, 'bak'], [3, 'bak'], [4, 'bum'], [6, 'bak']];
    for(let s = 0; s < 3; s++) R2u.forEach(([h, z])=>{ const t = s * 8 * q + h * q; if(z === 'bum') O.zarb(150, .35, {kech:t, tur:'lowpass', q:.8, vol:.55, past:85, pastVol:.45}); else O.zarb(2800, .14, {kech:t, tur:'bandpass', q:1.3, vol:.5}); A.kut(()=>{ dPuls = 1; }, t * 1000); });
    izoh.innerHTML = '<b>Usul</b> — ritmik asos: doira zarblari «bum» (markazdan, past) va «bak» (chetdan, jarangdor). Bu soddalashtirilgan namuna (sintez), aniq maqom usuli emas.';
  }
  function tanburChal(){ if(!audio()) return; [[57, .35], [59, .35], [60, .35], [62, .35], [60, .35], [59, .7]].reduce((t, [m, d])=>{ O.chertma(midiF(m), 2.2, {kech:t, yut:.998, yorqin:.3, vol:.35}); O.chertma(midiF(m) * 1.5, 1.4, {kech:t + .01, yut:.997, yorqin:.3, vol:.07}); return t + d; }, 0); tPuls = 2.4; }
  tugmalar(tag, [
    ...MAQOM.map(([k, nom])=>({m:nom, k:'m_' + k, f:()=>maqomTanla(k, true)})), '|',
    {m:'Mushkilot', k:'b_m', f:()=>bolimTanla('mushkilot', true)}, {m:'Nasr', k:'b_n', f:()=>bolimTanla('nasr', true)}, '|',
    {m:'▶ Usul', t:'Doira usuli namunasi (sintez)', f:usul}, {m:'▶ Tanbur', t:'Tanbur ohangi (sintez, taxminiy)', f:()=>{ tanburChal(); detal('im_cholgu', 'tanbur'); }},
    {m:'■', t:'Tovushni to‘xtatish', f:()=>O.toxtat()}
  ]);
  const tb = tag.querySelectorAll('button'); MAQOM.forEach(([k], i)=>{ tb[i].dataset.m = k; }); tb[6].dataset.b = 'mushkilot'; tb[7].dataset.b = 'nasr';
  S.bosish = ud=>{
    if(ud.maqom){ maqomTanla(ud.maqom, true); return; }
    if(ud.qism){ if(ud.qism === 'mushkilot' || ud.qism === 'nasr_bolim') bolimTanla(ud.bolim, true); else qismTanla(ud.qism, ud.bolim, true); return; }
    if(ud.tanbur){ tanburChal(); izoh.innerHTML = '<b>Tanbur</b> — Shashmaqom ijrosining asosiy cholg‘usi: uzun dastali, metall torli, noxun bilan chalinadi. Ohang — sintez (taxminiy).'; detal('im_cholgu', 'tanbur'); }
  };
  S.holat = h=>{ if(!h) return; if(h.maqom !== undefined){ tMaqom = h.maqom || null; } tBolim = h.bolim || null; tQism = null; yangila();
    if(tBolim) bolimTanla(tBolim, false); else if(tMaqom) maqomTanla(tMaqom, false); else izoh.innerHTML = BOSH; };
  S.kadrda = (dt, t)=>{
    Object.keys(qism).forEach(k=>{ const q = qism[k].m; const tg = TOP + (koTar[k] || 0) + (ustida === k ? .06 : 0); q.position.y += (tg - q.position.y) * Math.min(1, dt * 8); });
    tPuls = Math.max(0, tPuls - dt); dPuls = Math.max(0, dPuls - dt * 4);
    torlar.forEach((tr, i)=>{ tr.scale.x = tr.scale.z = 1 + (tPuls > 0 ? Math.abs(Math.sin(t * 60 + i)) * 2.5 : 0); });
    disk.position.y = .08 + dPuls * .02; naqsh.position.y = .165 + dPuls * .02;
    naqsh.rotation.z += dt * .03;
  };
  const BOSH = 'Tashqi halqa — <b>6 maqom</b> (yuqoridan soat mili bo‘yicha), o‘rta halqa — ikki bo‘lim, ichki halqa — sho‘balar. Bo‘laklarni <b>bosing</b>. Tovush — faqat «▶ Usul» / «▶ Tanbur» bosilganda (sintez).';
  yangila();
  izoh.innerHTML = BOSH;
  S.joyla(testda ? 5.6 : 6.6, new T.Vector3(0, .3, .9));
  return S;
};


})();
