/* MAKON — sifatli 3D sahnalar: fizika zanjiri, harbiy model, anatomiya.
   three.js r128 (MIT) + RoomEnvironment (MIT). Hamma narsa lokal, internet kerak emas. */
(function(){
'use strict';

const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d||{})}));

/* ---------- umumiy sahna ---------- */
function M3sahna(idish, o){
  o = o || {};
  const T = THREE;
  const xar = window._sahnalar;
  const eski = xar && xar.get(idish); if(eski) eski.yopish();
  const W = idish.clientWidth || 600, H = idish.clientHeight || 400;
  const ren = new T.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:true});
  ren.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  ren.setSize(W, H);
  ren.outputEncoding = T.sRGBEncoding;
  ren.toneMapping = T.ACESFilmicToneMapping;
  ren.toneMappingExposure = o.ekspozitsiya || 1.05;
  ren.physicallyCorrectLights = false;
  const el = ren.domElement;
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:1;cursor:grab;touch-action:none';
  idish.appendChild(el);

  const sc = new T.Scene();
  if(T.RoomEnvironment){
    const pm = new T.PMREMGenerator(ren);
    sc.environment = pm.fromScene(new T.RoomEnvironment(), .04).texture;
    pm.dispose();
  }
  const cam = new T.PerspectiveCamera(o.fov || 32, W/H, .05, 500);
  const g = new T.Group(); sc.add(g);

  let masofa = 10, maqsadF = null, boshMasofa = 10, boshMarkaz = null;
  const boshRx = o.rx !== undefined ? o.rx : -.12, boshRy = o.ry !== undefined ? o.ry : .5;
  let rx = o.rx !== undefined ? o.rx : -.12, ry = o.ry !== undefined ? o.ry : .5;
  let avto = o.avto !== false, bosildi = false, x0 = 0, y0 = 0, surildi = 0, kadr, oldingi = performance.now();
  const rxMin = o.rxMin !== undefined ? o.rxMin : -1.2, rxMax = o.rxMax !== undefined ? o.rxMax : 1.2;
  const ryMin = o.ryMin, ryMax = o.ryMax;
  const barmoq = new Map(); let pinchD = 0;
  const pinchMasofa = ()=>{ const [a, b] = [...barmoq.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  el.addEventListener('pointerdown', e=>{ barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY}); if(barmoq.size === 2){ pinchD = pinchMasofa(); bosildi = false; surildi = 99; return; } bosildi=true; avto=false; surildi=0; x0=e.clientX; y0=e.clientY; el.setPointerCapture(e.pointerId); el.style.cursor='grabbing'; });
  el.addEventListener('pointermove', e=>{
    if(barmoq.has(e.pointerId)) barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(barmoq.size === 2){ const d = pinchMasofa(); if(pinchD > 0 && d > 0 && Math.abs(d - pinchD) > 4){ api.zoomla(pinchD / d); pinchD = d; } return; }
    if(!bosildi) return;
    surildi += Math.abs(e.clientX-x0)+Math.abs(e.clientY-y0);
    ry += (e.clientX-x0)*.0075; rx += (e.clientY-y0)*.0075;
    rx = Math.max(rxMin, Math.min(rxMax, rx));
    if(ryMin !== undefined) ry = Math.max(ryMin, Math.min(ryMax, ry));
    x0=e.clientX; y0=e.clientY;
  });
  ['pointerup','pointercancel','pointerleave'].forEach(t=>el.addEventListener(t, e=>{ barmoq.delete(e.pointerId); if(barmoq.size < 2) pinchD = 0; bosildi=false; el.style.cursor='grab'; }));

  const api = {
    T, sc, cam, g, ren, el,
    kadrda: null,           // (dt, vaqt) => {}
    bosish: null,           // (userData, obyekt) => {}
    ustida: null,           // (userData|null) => {}
    joyla(radius, markaz){
      markaz = markaz || new T.Vector3();
      g.position.copy(markaz).multiplyScalar(-1);
      masofa = radius / Math.tan(cam.fov*Math.PI/360) * (o.zoom || 1.1);
      boshMasofa = masofa; boshMarkaz = g.position.clone();
      cam.position.set(0, 0, masofa);
      cam.lookAt(0,0,0);
      const env = o.env !== undefined ? o.env : .55;
      g.traverse(ob=>{ if(ob.isMesh && ob.material && 'envMapIntensity' in ob.material && !ob.material.userData.env){ ob.material.envMapIntensity = env; ob.material.userData.env = 1; if(ob.material.color && !ob.material.map) ob.material.color.convertSRGBToLinear(); } });
    },
    fokus(radius, markaz, silliq){
      maqsadF = {r:radius / Math.tan(cam.fov*Math.PI/360) * (o.zoom || 1.1), m:markaz.clone().multiplyScalar(-1)};
      if(!silliq){ masofa = maqsadF.r; g.position.copy(maqsadF.m); cam.position.z = masofa; maqsadF = null; }
    },
    zoomla(k){ maqsadF = {r:Math.max(boshMasofa*.25, Math.min(boshMasofa*3, (maqsadF ? maqsadF.r : masofa) * k)), m:(maqsadF ? maqsadF.m : g.position).clone()}; },
    tikla(){ rx = boshRx; ry = boshRy; maqsadF = {r:boshMasofa, m:(boshMarkaz || g.position).clone()}; },
    aylanish(v){ if(v !== undefined) avto = v; return avto; },
    rentgen(v){
      g.traverse(ob=>{
        if(!ob.isMesh || !ob.material || ob.userData.rentgenYoq) return;
        const mats = Array.isArray(ob.material) ? ob.material : [ob.material];
        mats.forEach(m=>{
          if(!m.userData.asl) m.userData.asl = {t:m.transparent, o:m.opacity, d:m.depthWrite};
          if(v){ m.transparent = true; m.opacity = Math.min(m.userData.asl.o, .28); m.depthWrite = false; }
          else { m.transparent = m.userData.asl.t; m.opacity = m.userData.asl.o; m.depthWrite = m.userData.asl.d; }
          m.needsUpdate = true;
        });
      });
    },
    qotir(v){ avto=false; if(v!==undefined){ ry = o.qotirRy !== undefined ? o.qotirRy : v; rx = o.rx !== undefined ? o.rx : -.12; } },
    yopish(){
      cancelAnimationFrame(kadr); window.removeEventListener('resize', olcham);
      sc.traverse(ob=>{
        if(ob.geometry) ob.geometry.dispose();
        if(ob.material) (Array.isArray(ob.material) ? ob.material : [ob.material]).forEach(m=>{
          ['map','emissiveMap','normalMap','roughnessMap','metalnessMap','alphaMap','bumpMap','aoMap'].forEach(k=>{ if(m[k]) m[k].dispose(); });
          m.dispose();
        });
      });
      if(sc.environment) sc.environment.dispose();
      ren.dispose(); if(ren.forceContextLoss) ren.forceContextLoss();
      if(el.parentNode) el.parentNode.removeChild(el);
      if(xar) xar.delete(idish);
      if(api.yopilganda) api.yopilganda();
    }
  };
  const aylan = new T.Group(); sc.add(aylan); sc.remove(g); aylan.add(g);
  api.aylan = aylan;
  /* v3.15: arzon yumshoq soya — obyekt ostida radial gradient (real soya xaritasi emas; tejamkor rejimda ham ishlaydi) */
  api.soyaQosh = (radius, y, kuch)=>{
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(0,0,0,' + (kuch || .55) + ')'); gr.addColorStop(.55, 'rgba(0,0,0,' + (kuch || .55) * .45 + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    const t = new T.CanvasTexture(c);
    const m = new T.Mesh(new T.PlaneGeometry(radius * 2, radius * 2), new T.MeshBasicMaterial({map:t, transparent:true, depthWrite:false}));
    m.rotation.x = -Math.PI / 2; m.position.y = y || 0; m.renderOrder = -1; m.userData.rentgenYoq = true;
    g.add(m); return m;
  };

  const ray = new T.Raycaster(), nuq = new T.Vector2();
  function nishon(e){
    const r = el.getBoundingClientRect();
    nuq.x = ((e.clientX-r.left)/r.width)*2-1; nuq.y = -((e.clientY-r.top)/r.height)*2+1;
    ray.setFromCamera(nuq, cam);
    const t = ray.intersectObjects(g.children, true).filter(x=>x.object.visible && x.object.userData.nom && x.object.material.opacity > .2);
    return t.length ? t[0].object : null;
  }
  el.addEventListener('click', e=>{ if(surildi > 6 || !api.bosish) return; const ob = nishon(e); if(ob) api.bosish(ob.userData, ob); });
  el.addEventListener('pointermove', e=>{ if(bosildi || !api.ustida) return; const ob = nishon(e); el.style.cursor = ob ? 'pointer' : 'grab'; api.ustida(ob ? ob.userData : null, ob); });

  function kadrla(t){
    kadr = requestAnimationFrame(kadrla);
    const dt = Math.min(.05, (t - oldingi)/1000); oldingi = t;
    if(avto) ry += (o.tez || .25) * dt;
    aylan.rotation.set(rx, ry, 0);
    if(maqsadF){ masofa += (maqsadF.r - masofa)*.12; cam.position.z = masofa; g.position.lerp(maqsadF.m, .12); if(Math.abs(maqsadF.r-masofa) < .001) maqsadF = null; }
    if(api.kadrda) api.kadrda(dt, t/1000);
    ren.render(sc, cam);
  }
  kadr = requestAnimationFrame(kadrla);
  const olcham = ()=>{ const w=idish.clientWidth, h=idish.clientHeight; if(!w||!h) return; cam.aspect=w/h; cam.updateProjectionMatrix(); ren.setSize(w,h); };
  window.addEventListener('resize', olcham);
  api.idish = idish;
  if(xar) xar.set(idish, api);
  return api;
}

/* ---------- v3.15: koinot sahnalari uchun umumiy bezaklar ---------- */
function yulduzlar(T, n, rad){
  const pos = new Float32Array(n * 3), rang = new Float32Array(n * 3), rnd = (k=>()=>(k = (k * 9301 + 49297) % 233280) / 233280)(3);
  for(let i = 0; i < n; i++){
    const u = rnd() * 2 - 1, f = rnd() * Math.PI * 2, s2 = Math.sqrt(1 - u * u), rr = rad * (.85 + rnd() * .15);
    pos[i*3] = s2 * Math.cos(f) * rr; pos[i*3+1] = u * rr; pos[i*3+2] = s2 * Math.sin(f) * rr;
    const y = .55 + rnd() * .45, t = rnd(); rang[i*3] = y * (t > .8 ? 1 : .85); rang[i*3+1] = y * .9; rang[i*3+2] = y * (t < .2 ? .75 : 1);
  }
  const G = new T.BufferGeometry(); G.setAttribute('position', new T.BufferAttribute(pos, 3)); G.setAttribute('color', new T.BufferAttribute(rang, 3));
  return new T.Points(G, new T.PointsMaterial({size:1.6, sizeAttenuation:false, vertexColors:true, transparent:true, opacity:.9, depthWrite:false}));
}
function nurHalo(T, rang, olcham, kuch){
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(' + rang + ',' + (kuch || .9) + ')'); gr.addColorStop(.25, 'rgba(' + rang + ',' + (kuch || .9) * .45 + ')'); gr.addColorStop(1, 'rgba(' + rang + ',0)');
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const sp = new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c), transparent:true, depthWrite:false, blending:T.AdditiveBlending, toneMapped:false}));
  sp.scale.setScalar(olcham); return sp;
}
function matnSprite(T, matn, o){
  o = o || {};
  const c = document.createElement('canvas'), x = c.getContext('2d'), sh = o.shrift || '600 44px Inter, sans-serif';
  x.font = sh; const w = Math.ceil(x.measureText(matn).width) + 36; c.width = w; c.height = 72;
  x.font = sh; x.fillStyle = o.fon || 'rgba(10,14,29,.78)'; const rr = 20;
  x.beginPath(); x.moveTo(rr, 0); x.arcTo(w, 0, w, 72, rr); x.arcTo(w, 72, 0, 72, rr); x.arcTo(0, 72, 0, 0, rr); x.arcTo(0, 0, w, 0, rr); x.fill();
  if(o.chegara){ x.strokeStyle = o.chegara; x.lineWidth = 3; x.stroke(); }
  x.fillStyle = o.rang || '#eef1fb'; x.textBaseline = 'middle'; x.fillText(matn, 18, 38);
  const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding;
  const sp = new T.Sprite(new T.SpriteMaterial({map:t, transparent:true, depthWrite:false, toneMapped:false}));
  const k = (o.balandlik || .5) / 72; sp.scale.set(w * k, 72 * k, 1); return sp;
}

/* ---------- materiallar ---------- */
function yogochTekstura(T, rang1, rang2){
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = rang1; x.fillRect(0,0,512,128);
  for(let i=0;i<70;i++){
    x.strokeStyle = 'rgba(' + rang2 + ',' + (.08 + Math.random()*.22) + ')';
    x.lineWidth = .6 + Math.random()*2.2;
    x.beginPath();
    let y = Math.random()*128; x.moveTo(0, y);
    for(let k=0;k<=512;k+=16){ y += (Math.random()-.5)*3; x.lineTo(k, y + Math.sin(k/60+i)*2.5); }
    x.stroke();
  }
  const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.wrapS = t.wrapT = T.RepeatWrapping;
  return t;
}
function yozuvTekstura(T, matn, o){
  o = o || {};
  const c = document.createElement('canvas'); c.width = o.w || 256; c.height = o.h || 96;
  const x = c.getContext('2d');
  const tex = new T.CanvasTexture(c); tex.encoding = T.sRGBEncoding; tex.anisotropy = 4;
  tex.yoz = (m)=>{
    x.fillStyle = o.fon || '#0c1a14'; x.fillRect(0,0,c.width,c.height);
    x.fillStyle = o.rang || '#7dffb2';
    x.font = (o.shrift || '600 54px "IBM Plex Mono", monospace');
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(m, c.width/2, c.height/2 + 2);
    tex.needsUpdate = true;
  };
  tex.yoz(matn);
  return tex;
}

/* ================= 1. FIZIKA — elektr zanjiri ================= */
const REZ_RANG = ['#111111','#7a4a1e','#d42a1f','#ff7a12','#f2d21b','#29a84a','#2a5bd7','#8a3fd1','#8b8b8b','#f5f5f5'];
function fizika3D(sahna, tag, izoh, yorliq){
  yorliq('Fizika · elektr zanjiri','sudrab aylantiring · slayderni suring');
  const S = M3sahna(sahna, {rx:.68, ry:-.3, avto:false, zoom:.86, fov:30, rxMin:.15, rxMax:1.35, qotirRy:-.3});
  const T = S.T, g = S.g;

  // stol taxtasi
  const taxta = new T.Mesh(new T.BoxGeometry(12.4, .5, 7.2),
    new T.MeshStandardMaterial({color:0xffffff, map:yogochTekstura(T,'#5a3b22','30,16,6'), roughness:.62, metalness:0}));
  taxta.position.y = -.25; g.add(taxta);
  const qopqoq = new T.Mesh(new T.BoxGeometry(11.8, .04, 6.6), new T.MeshStandardMaterial({color:0x1b2338, roughness:.85}));
  qopqoq.position.y = .02; g.add(qopqoq);
  // setka chiziqlari
  const setka = new T.GridHelper(11.6, 29, 0x2c3a5e, 0x243050); setka.scale.z = 6.4/11.6; setka.position.y = .045; g.add(setka);

  // zanjir yo'li (to'rtburchak, yumaloq burchak)
  const yol = new T.CurvePath();
  const Y = .32, X0 = -4.6, X1 = 4.6, Z0 = -2.3, Z1 = 2.3;
  const nuq = [[X0,Z1],[X0,Z0],[X1,Z0],[X1,Z1],[X0,Z1]];
  for(let i=0;i<4;i++){
    const a = new T.Vector3(nuq[i][0], Y, nuq[i][1]), b = new T.Vector3(nuq[i+1][0], Y, nuq[i+1][1]);
    yol.add(new T.LineCurve3(a, b));
  }
  const mis = new T.MeshStandardMaterial({color:0xd98a4b, metalness:1, roughness:.28});
  const izolyatsiya = new T.MeshPhysicalMaterial({color:0xd8392b, roughness:.38, clearcoat:.6, clearcoatRoughness:.25});
  const izol2 = new T.MeshPhysicalMaterial({color:0x1d1f29, roughness:.4, clearcoat:.5});
  // simlar: komponentlar orasidagi bo'laklar
  function sim(a, b, mat){
    const v1 = new T.Vector3(a[0], Y, a[1]), v2 = new T.Vector3(b[0], Y, b[1]);
    const c = new T.LineCurve3(v1, v2);
    const m = new T.Mesh(new T.TubeGeometry(c, 1, .075, 14, false), mat); g.add(m);
  }
  function burchak(x, z){ const m = new T.Mesh(new T.SphereGeometry(.075, 16, 12), izolyatsiya); m.position.set(x, Y, z); g.add(m); }
  // batareya chap tomonda (X0, z bo'ylab), lampa tepada (z0), rezistor o'ngda, ampermetr pastda
  sim([X0, 1.35],[X0, Z1], izolyatsiya); sim([X0, Z1],[-1.2, Z1], izolyatsiya);
  sim([1.2, Z1],[X1, Z1], izol2); sim([X1, Z1],[X1, 1.1], izol2);
  sim([X1, -1.1],[X1, Z0], izol2); sim([X1, Z0],[.75, Z0], izol2);
  sim([-.75, Z0],[X0, Z0], izolyatsiya); sim([X0, Z0],[X0, -1.35], izolyatsiya);
  [[X0,Z1],[X1,Z1],[X1,Z0],[X0,Z0]].forEach(p=>burchak(p[0],p[1]));

  // --- batareya ---
  const bat = new T.Group(); bat.position.set(X0, Y, 0); g.add(bat);
  const korpus = new T.Mesh(new T.CylinderGeometry(.62, .62, 2.5, 48),
    new T.MeshPhysicalMaterial({color:0x151823, metalness:.3, roughness:.35, clearcoat:.8}));
  bat.add(korpus);
  const tasma = new T.Mesh(new T.CylinderGeometry(.625, .625, .95, 48, 1, true),
    new T.MeshPhysicalMaterial({color:0xffc94d, metalness:.55, roughness:.3, clearcoat:.8}));
  tasma.position.y = -.78; bat.add(tasma);
  const plus = new T.Mesh(new T.CylinderGeometry(.22, .22, .2, 32), new T.MeshStandardMaterial({color:0xd0d4de, metalness:1, roughness:.22}));
  plus.position.y = 1.33; bat.add(plus);
  const minus = new T.Mesh(new T.CylinderGeometry(.5, .5, .06, 40), new T.MeshStandardMaterial({color:0xb9bdc8, metalness:1, roughness:.3}));
  minus.position.y = -1.27; bat.add(minus);
  bat.rotation.x = Math.PI/2; // yotqizilgan
  const batYorliq = yozuvTekstura(T, '12 V', {fon:'#ffc94d', rang:'#141722', shrift:'800 58px "IBM Plex Mono", monospace'});
  const batPanel = new T.Mesh(new T.PlaneGeometry(1.05, .4), new T.MeshBasicMaterial({map:batYorliq, toneMapped:false}));
  batPanel.position.set(X0 + .66, Y + .02, .78); batPanel.rotation.set(-Math.PI/2, 0, Math.PI/2); g.add(batPanel);
  bat.traverse(o=>{ if(o.isMesh) o.userData.nom = 'bat'; });

  // --- lampa (tepada, z = Z0) ---
  const lampa = new T.Group(); lampa.position.set(0, Y, Z0); g.add(lampa);
  const patron = new T.Mesh(new T.CylinderGeometry(.42, .5, .75, 40), new T.MeshStandardMaterial({color:0x2a2f3d, roughness:.5, metalness:.2}));
  patron.position.y = .1; lampa.add(patron);
  const tagi = new T.Mesh(new T.BoxGeometry(1.6, .22, 1), new T.MeshStandardMaterial({color:0x222838, roughness:.6}));
  tagi.position.y = -.2; lampa.add(tagi);
  const rezba = new T.Mesh(new T.CylinderGeometry(.3, .3, .42, 32, 6), new T.MeshStandardMaterial({color:0xcfd3dc, metalness:1, roughness:.25}));
  rezba.position.y = .66; lampa.add(rezba);
  const shishaMat = new T.MeshPhysicalMaterial({color:0xffffff, metalness:0, roughness:.05, transmission:.92, transparent:true, opacity:.55, clearcoat:1, ior:1.5, thickness:.1, side:T.DoubleSide});
  const shisha = new T.Mesh(new T.SphereGeometry(.78, 48, 32), shishaMat);
  shisha.position.y = 1.55; shisha.scale.y = 1.12; lampa.add(shisha);
  const tolaMat = new T.MeshStandardMaterial({color:0x331a00, emissive:0xffa53a, emissiveIntensity:0, roughness:.4});
  const tola = new T.Mesh(new T.TorusGeometry(.2, .025, 8, 40, Math.PI), tolaMat);
  tola.position.y = 1.5; lampa.add(tola);
  [-.2, .2].forEach(x=>{ const s = new T.Mesh(new T.CylinderGeometry(.018,.018,.72,6), new T.MeshStandardMaterial({color:0x9aa0ad, metalness:1, roughness:.3})); s.position.set(x, 1.15, 0); lampa.add(s); });
  const nur = new T.Mesh(new T.SphereGeometry(.7, 32, 24), new T.MeshBasicMaterial({color:0xffb14a, transparent:true, opacity:0, depthWrite:false, blending:T.AdditiveBlending}));
  nur.position.y = 1.55; lampa.add(nur);
  const lampNur = new T.PointLight(0xffb45a, 0, 14, 1.6); lampNur.position.y = 1.55; lampa.add(lampNur);
  lampa.traverse(o=>{ if(o.isMesh) o.userData.nom = 'lampa'; });

  // --- rezistor (o'ngda) ---
  const rez = new T.Group(); rez.position.set(X1, Y, 0); g.add(rez);
  const rezTana = new T.Mesh((T.CapsuleGeometry ? new T.CapsuleGeometry(.3, 1.3, 8, 24) : new T.CylinderGeometry(.3,.3,1.9,32)),
    new T.MeshPhysicalMaterial({color:0xe7cf9f, roughness:.45, clearcoat:.5}));
  rez.add(rezTana);
  const polosa = [];
  [-.55, -.25, .05, .55].forEach((y,i)=>{
    const p = new T.Mesh(new T.CylinderGeometry(.315, .315, .14, 32), new T.MeshPhysicalMaterial({color:0x000000, roughness:.4, clearcoat:.5}));
    p.position.y = y; rez.add(p); polosa.push(p);
  });
  polosa[3].material.color.set('#c9a227'); polosa[3].material.metalness = .8;
  [-1.02, 1.02].forEach(y=>{ const o = new T.Mesh(new T.CylinderGeometry(.04,.04,.25,8), mis); o.position.y = y; rez.add(o); });
  rez.rotation.x = Math.PI/2;
  rez.traverse(o=>{ if(o.isMesh) o.userData.nom = 'rez'; });

  // --- ampermetr (pastda, z = Z1) ---
  const amp = new T.Group(); amp.position.set(0, Y, Z1); g.add(amp);
  const ampQuti = new T.Mesh((T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(2.4, .9, 1.5, 4, .16) : new T.BoxGeometry(2.4,.9,1.5)),
    new T.MeshPhysicalMaterial({color:0x2e3a66, roughness:.35, clearcoat:.7}));
  ampQuti.position.y = .18; amp.add(ampQuti);
  const ampTex = yozuvTekstura(T, '2,00 A', {w:320, h:120});
  const ampEkran = new T.Mesh(new T.PlaneGeometry(1.9, .7), new T.MeshBasicMaterial({map:ampTex, toneMapped:false}));
  ampEkran.rotation.x = -Math.PI/2; ampEkran.position.set(0, .64, 0); amp.add(ampEkran);
  const ampBelgi = new T.Mesh(new T.PlaneGeometry(.5, .5), new T.MeshBasicMaterial({map:yozuvTekstura(T,'A',{w:96,h:96,fon:'#ffc94d',rang:'#141722',shrift:'800 70px "IBM Plex Mono", monospace'}), toneMapped:false}));
  ampBelgi.rotation.x = -Math.PI/2; ampBelgi.position.set(-.85, .64, .45); ampBelgi.scale.setScalar(.6); amp.add(ampBelgi);
  amp.traverse(o=>{ if(o.isMesh) o.userData.nom = 'amp'; });

  // --- elektronlar ---
  const ELON = 26;
  const eGeo = new T.SphereGeometry(.085, 16, 12);
  const eMat = new T.MeshBasicMaterial({color:0x8fdcff, toneMapped:false});
  const eHalo = new T.MeshBasicMaterial({color:0x3aa8ff, transparent:true, opacity:.35, depthWrite:false, blending:T.AdditiveBlending});
  const elektron = [];
  for(let i=0;i<ELON;i++){
    const m = new T.Mesh(eGeo, eMat); const h = new T.Mesh(eGeo, eHalo); h.scale.setScalar(2.2); m.add(h);
    g.add(m); elektron.push(m);
  }
  const uzunlik = yol.getLength();
  let faza = 0, tezlik = .2;

  // yorug'lik
  S.sc.add(new T.HemisphereLight(0xb8c8ff, 0x20150c, .55));
  const kun = new T.DirectionalLight(0xffffff, .9); kun.position.set(3, 8, 5); S.sc.add(kun);

  S.joyla(6.4, new T.Vector3(0, .6, 0));

  tag.innerHTML =
   '<label>Kuchlanish <input type="range" id="fzIv" min="1.5" max="24" step="1.5" value="12"></label>'+
   '<label>Qarshilik <input type="range" id="fzIr" min="1" max="24" step="1" value="6"></label>';
  const iv = document.getElementById('fzIv'), ir = document.getElementById('fzIr');
  const son = (x, k)=>x.toFixed(k).replace('.', ',');
  function yangila(){
    const V = +iv.value, R = +ir.value, I = V/R, P = V*I;
    batYorliq.yoz(son(V, 1) + ' V');
    ampTex.yoz(son(I, 2) + ' A');
    // rezistor rang kodi (2 raqam + ko'paytuvchi)
    const r = Math.round(R*10), d1 = +String(r)[0], d2 = String(r).length > 1 ? +String(r)[1] : 0, kop = String(r).length - 3; /* r = R·10, shuning uchun 1 raqam kam */
    polosa[0].material.color.set(REZ_RANG[d1]).convertSRGBToLinear(); polosa[1].material.color.set(REZ_RANG[d2]).convertSRGBToLinear();
    polosa[2].material.color.set(kop < 0 ? '#c9a227' : REZ_RANG[kop]).convertSRGBToLinear();
    const yor = Math.min(1, P/60);
    tolaMat.emissiveIntensity = .15 + yor * 5.5;
    tolaMat.emissive.setHSL(.08 + yor*.04, 1, .45 + yor*.2);
    nur.material.opacity = yor * .5; nur.scale.setScalar(.8 + yor * .9);
    lampNur.intensity = yor * 3.2;
    shishaMat.color.setHSL(.1, yor*.6, .9);
    tezlik = Math.min(1.8, .1 + I * .22);
    const kuydi = P > 55;
    hodisa('zanjir', {V, R, I, P, kuydi});
    izoh.innerHTML = '<b>I = U / R = '+son(V,1)+' / '+R+' = '+son(I,2)+' A</b> · quvvat P = U·I = '+son(P,1)+' Vt. '+
      (kuydi ? '<span class="xat">Lampa chidamidan oshdi</span> — haqiqiy darsda bu kuygan lampa demakdir.' :
       'Rezistordagi <b>rang halqalari</b> ham qarshilikka qarab o‘zgaradi. Elektronlar tezligi — tok kuchi.');
  }
  iv.oninput = ir.oninput = yangila; yangila();

  S.bosish = d=>{
    const m = {
      bat:'<b>Tok manbai.</b> Musbat va manfiy qutblar orasida kuchlanish hosil qiladi — zanjirdagi zaryadlarni harakatga keltiradi.',
      lampa:'<b>Cho‘g‘lanma lampa.</b> Tok volfram tola orqali o‘tganda u qiziydi va nur chiqaradi; quvvat ortsa — yorqinroq.',
      rez:'<b>Rezistor.</b> Tok kuchini cheklaydi. Qarshiligi korpusdagi rang halqalari bilan yoziladi — slayderni surib ko‘ring.',
      amp:'<b>Ampermetr.</b> Zanjirga ketma-ket ulanadi va tok kuchini amperlarda ko‘rsatadi.'
    }[d.nom];
    if(m) izoh.innerHTML = m;
    hodisa('fizika-bosish', {nom:d.nom}); hodisa('detal', {turD:'fizika', nom:d.nom});
  };
  S.kadrda = dt=>{
    faza = (faza + dt * tezlik * 3.2 / uzunlik) % 1;
    for(let i=0;i<ELON;i++){
      const u = (faza + i/ELON) % 1;
      // elektronlar manfiydan musbatga — yo'l bo'ylab teskari
      elektron[i].position.copy(yol.getPointAt(Math.min(.9999, Math.max(.0001, u))));
    }
  };
}

/* ================= 2. HARBIY — qismlarga ajratish ================= */
function shakl(T, nuqtalar){
  const s = new T.Shape(); s.moveTo(nuqtalar[0][0], nuqtalar[0][1]);
  for(let i=1;i<nuqtalar.length;i++) s.lineTo(nuqtalar[i][0], nuqtalar[i][1]);
  s.closePath(); return s;
}
function ekstruziya(T, nuqtalar, qalin, mat, bevel){
  const geo = new T.ExtrudeGeometry(shakl(T, nuqtalar), {depth:qalin, bevelEnabled:true, bevelThickness:bevel||.03, bevelSize:bevel||.03, bevelSegments:3, curveSegments:12});
  geo.translate(0, 0, -qalin/2);
  geo.computeVertexNormals();
  return new T.Mesh(geo, mat);
}
function harbiy3D(idish, slayder, yorliqlar, oo){
  oo = oo || {};
  const S = M3sahna(idish, {rx:.22, ry:-.42, avto:false, fov:26, zoom:oo.zoom || 1.55, rxMin:-.7, rxMax:.7, ekspozitsiya:1.0, env:.7, qotirRy:-.22});
  const T = S.T, g = S.g;
  const metall = new T.MeshStandardMaterial({color:0x17191d, metalness:.75, roughness:.42});
  const metallOch = new T.MeshStandardMaterial({color:0x2c3036, metalness:.85, roughness:.3});
  const yaltiroq = new T.MeshStandardMaterial({color:0x7d838c, metalness:1, roughness:.24});
  const yogoch = new T.MeshStandardMaterial({color:0xffffff, map:yogochTekstura(T,'#4a2412','20,8,2'), metalness:0, roughness:.45});
  const plastik = new T.MeshStandardMaterial({color:0x3a1a12, roughness:.55, metalness:.05});

  const QISM = [];
  function qism(nom, raqam, mesh, dx, dy, dz){
    const gr = new T.Group(); gr.add(mesh); g.add(gr);
    mesh.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; });
    QISM.push({gr, nom, raqam, d:new T.Vector3(dx, dy, dz||0)});
    return gr;
  }
  const add = (gr, m, x, y, z)=>{ m.position.set(x||0, y||0, z||0); gr.add(m); return m; };

  // --- asos: qutisi, stvol, qo'ndoq, dasta ---
  const asos = new T.Group();
  add(asos, ekstruziya(T, [[-1.2,.05],[3.1,.05],[3.1,.62],[-1.2,.62]], .5, metall, .04));                        // qutisi (ствольная коробка)
  add(asos, ekstruziya(T, [[3.1,.22],[5.2,.22],[5.2,.52],[3.1,.52]], .44, yogoch, .06));                           // pastki cevye
  const stvol = new T.Mesh(new T.CylinderGeometry(.075, .075, 4.4, 24), metall); stvol.rotation.z = Math.PI/2; add(asos, stvol, 5.3, .44, 0);
  const mushka = ekstruziya(T, [[0,0],[.28,0],[.24,.42],[.04,.42]], .12, metall, .02); add(asos, mushka, 7.1, .45, 0);
  const tormoz = new T.Mesh(new T.CylinderGeometry(.13, .13, .5, 24), metallOch); tormoz.rotation.z = Math.PI/2; add(asos, tormoz, 7.7, .44, 0);
  add(asos, ekstruziya(T, [[-1.2,.62],[-1.2,.1],[-4.6,-.55],[-4.75,-.55],[-4.75,.72],[-3.9,.72],[-1.6,.72]], .42, yogoch, .07)); // qo'ndoq
  add(asos, ekstruziya(T, [[.35,.06],[.95,.06],[.62,-1.05],[.05,-1.1]], .36, plastik, .07));                      // dasta
  add(asos, ekstruziya(T, [[1.05,.06],[1.2,-.35],[1.9,-.35],[2.05,.06],[1.9,.06],[1.8,-.25],[1.3,-.25],[1.18,.06]], .1, metall, .015)); // tepki himoyasi
  add(asos, ekstruziya(T, [[1.85,.62],[2.6,.62],[2.6,.82],[1.95,.82]], .18, metall, .02));                          // nishon
  // detallar
  const gazBlok = ekstruziya(T, [[0,0],[.42,0],[.42,.5],[0,.5]], .24, metall, .02); add(asos, gazBlok, 5.1, .36, 0);
  const mushkaAsos = new T.Mesh(new T.CylinderGeometry(.13, .13, .32, 20), metall); mushkaAsos.rotation.z = Math.PI/2; add(asos, mushkaAsos, 7.2, .44, 0);
  [[3.3,0],[3.6,0]].forEach(p=>{ const h = new T.Mesh(new T.TorusGeometry(.26, .03, 8, 28), metallOch); h.rotation.y = Math.PI/2; add(asos, h, p[0], .37, 0); });
  add(asos, ekstruziya(T, [[-4.78,-.58],[-4.62,-.58],[-4.62,.75],[-4.78,.75]], .46, metallOch, .02));          // qo'ndoq plitasi
  add(asos, ekstruziya(T, [[-.3,.1],[.25,.1],[.25,.52],[-.3,.52]], .52, metallOch, .01));                         // o'q otish tanlovchisi
  const halqa = new T.Mesh(new T.TorusGeometry(.12, .025, 8, 20), yaltiroq); add(asos, halqa, -3.4, -.28, .23);
  qism('asos', 0, asos, 0, 0, 0);

  // --- 1. magazin ---
  const mag = new T.Group();
  mag.add(ekstruziya(T, [[2.15,.05],[2.95,.05],[3.25,-.55],[3.75,-1.6],[3.05,-1.95],[2.55,-.75]], .34, plastik, .06));
  [[2.62,-.35],[2.83,-.85],[3.05,-1.32]].forEach(p=>{ const r = new T.Mesh(new T.BoxGeometry(.52, .05, .42), plastik); r.position.set(p[0]+.1, p[1], 0); r.rotation.z = -.45; mag.add(r); });
  qism('magazin', 1, mag, .7, -1.25, 0);

  // --- 2. shompol ---
  const shom = new T.Mesh(new T.CylinderGeometry(.035, .035, 5.2, 12), yaltiroq); shom.rotation.z = Math.PI/2; shom.position.set(4.7, .18, -.12);
  qism('shompol', 2, shom, 1.2, -1.15, .5);

  // --- 3. qopqoq ---
  const qop = ekstruziya(T, [[-1.15,.6],[3.0,.6],[3.0,.88],[2.6,1.02],[-.9,1.02],[-1.15,.8]], .54, metallOch, .05);
  qism('qopqoq', 3, qop, -3.2, 1.55, 0);

  // --- 4. qaytaruvchi mexanizm ---
  const qm = new T.Group();
  const prujina = new T.Mesh(new T.TubeGeometry(new (class extends T.Curve{ getPoint(t){ const a = t*Math.PI*2*30; return new T.Vector3(t*3.0, Math.cos(a)*.09, Math.sin(a)*.09); } })(), 600, .018, 6, false), yaltiroq);
  add(qm, prujina, -1.0, .78, 0);
  const yoriqnoma = new T.Mesh(new T.CylinderGeometry(.03, .03, 3.2, 10), metallOch); yoriqnoma.rotation.z = Math.PI/2; add(qm, yoriqnoma, .5, .78, 0);
  add(qm, ekstruziya(T, [[0,-.14],[.22,-.14],[.22,.18],[0,.18]], .22, metall, .02), -1.25, .72, 0);
  qism('prujina', 4, qm, -3.1, 2.45, 0);

  // --- 5. zatvor rami zatvor bilan ---
  const zr = new T.Group();
  add(zr, ekstruziya(T, [[1.0,.42],[3.6,.42],[3.6,.7],[1.0,.7]], .28, yaltiroq, .03));
  add(zr, ekstruziya(T, [[2.95,.7],[3.35,.7],[3.35,.85],[2.95,.85]], .5, metallOch, .02));            // tutqich
  const zatvor = new T.Mesh(new T.CylinderGeometry(.1, .1, .7, 20), yaltiroq); zatvor.rotation.z = Math.PI/2; add(zr, zatvor, .9, .5, 0);
  const piston = new T.Mesh(new T.CylinderGeometry(.07, .07, 1.3, 16), yaltiroq); piston.rotation.z = Math.PI/2; add(zr, piston, 4.2, .86, 0);
  qism('zatvor', 5, zr, 2.9, 2.05, 0);

  // --- 6. gaz trubkasi ustki cevye bilan ---
  const gt = new T.Group();
  const trubka = new T.Mesh(new T.CylinderGeometry(.1, .1, 2.3, 24), metallOch); trubka.rotation.z = Math.PI/2; add(gt, trubka, 4.35, .86, 0);
  add(gt, ekstruziya(T, [[3.2,.72],[5.05,.72],[5.05,1.05],[3.3,1.08]], .4, yogoch, .07));
  qism('gaz', 6, gt, 2.6, .95, 0);

  S.sc.add(new T.HemisphereLight(0xcfd9ff, 0x2a1a10, .5));
  const kun = new T.DirectionalLight(0xffffff, 1.1); kun.position.set(-3, 6, 7); S.sc.add(kun);
  const orqa = new T.DirectionalLight(0x9fb6ff, .6); orqa.position.set(4, 2, -6); S.sc.add(orqa);

  S.joyla(3.1, new T.Vector3(1.9, 1.15, 0));
  const soya = new T.Mesh(new T.PlaneGeometry(16, 5), new T.MeshBasicMaterial({map:(()=>{ const c=document.createElement('canvas'); c.width=256; c.height=64; const x=c.getContext('2d'); const gr=x.createRadialGradient(128,32,4,128,32,120); gr.addColorStop(0,'rgba(0,0,0,.55)'); gr.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gr; x.fillRect(0,0,256,64); return new T.CanvasTexture(c); })(), transparent:true, opacity:.7, depthWrite:false}));
  soya.rotation.x = -Math.PI/2; soya.position.set(1.6, -2.3, 0); g.add(soya);

  const NOM = {1:'magazin', 2:'shompol', 3:'qopqoq', 4:'qaytaruvchi mexanizm', 5:'zatvor rami va zatvor', 6:'gaz trubkasi'};
  // yorliqlar (HTML ustida)
  const ly = [];
  if(yorliqlar){
    yorliqlar.innerHTML = '';
    QISM.filter(q=>q.raqam).forEach(q=>{
      const s = document.createElement('span'); s.className = 'q3-yorliq'; s.innerHTML = q.raqam; s.title = NOM[q.raqam];
      yorliqlar.append(s); ly.push([q, s]);
    });
    var legend = document.createElement('div'); legend.className = 'q3-legend';
    legend.innerHTML = Object.keys(NOM).map(k=>'<span><b>'+k+'</b>'+NOM[k]+'</span>').join('');
    yorliqlar.append(legend);
  }
  let maqsad = 0, joriy = 0;
  const qolda = {};           // raqam -> 0..1 (qo'lda ajratish rejimi)
  let qoldaRejim = false;
  S.ajrat = (raqam, v)=>{ qoldaRejim = true; qolda[raqam] = v ? 1 : 0; };
  S.hammasi = v=>{ qoldaRejim = true; for(let k=1;k<=6;k++) qolda[k] = v ? 1 : 0; };
  S.bosish = d=>hodisa('qism', {nom:d.nom, raqam:(QISM.find(q=>q.nom===d.nom)||{}).raqam});
  var legend = legend || null;
  if(slayder) slayder.addEventListener('input', ()=>{ maqsad = +slayder.value/100; });
  maqsad = joriy = slayder ? +slayder.value/100 : 0;
  const v = new T.Vector3();
  S.kadrda = ()=>{
    joriy += (maqsad - joriy) * .14;
    if(qoldaRejim){
      QISM.forEach(q=>{ if(!q.raqam) return; q.t = (q.t||0) + ((qolda[q.raqam]||0) - (q.t||0)) * .14; const e = 1 - Math.pow(1 - q.t, 3); q.gr.position.copy(q.d).multiplyScalar(e); });
      const tmax = Math.max(...QISM.filter(q=>q.raqam).map(q=>q.t||0));
      joriy = tmax;
    } else QISM.forEach((q, i)=>{
      // tartib bo'yicha ketma-ket ajraladi
      const n = QISM.length - 1, k = q.raqam ? (q.raqam - 1) / n : 0;
      const t = q.raqam ? Math.max(0, Math.min(1, (joriy - k*.55) / .45)) : 0;
      const e = 1 - Math.pow(1 - t, 3);
      q.gr.position.copy(q.d).multiplyScalar(e);
    });
    if(ly.length){
      const r = idish.getBoundingClientRect();
      const joy = ly.map(([q, s])=>{
        const b = new T.Box3().setFromObject(q.gr); b.getCenter(v);
        v.project(S.cam);
        const w = s.offsetWidth || 90, h = s.offsetHeight || 18;
        return {q, s, x:(v.x+1)/2*r.width, y:(1-v.y)/2*r.height, w, h};
      }).sort((a, b)=>a.y - b.y);
      const qoyilgan = [];
      joy.forEach(j=>{
        let x = Math.max(j.w/2 + 4, Math.min(r.width - j.w/2 - 4, j.x)), y = j.y;
        for(let k=0;k<8;k++){
          const t = qoyilgan.find(p=>Math.abs(p.x - x) < (p.w + j.w)/2 + 4 && Math.abs(p.y - y) < (p.h + j.h)/2 + 2);
          if(!t) break; y = t.y + (t.h + j.h)/2 + 3;
        }
        qoyilgan.push({x, y, w:j.w, h:j.h});
        j.s.style.left = x + 'px'; j.s.style.top = y + 'px';
        j.s.style.opacity = Math.max(0, Math.min(1, ((qoldaRejim ? (j.q.t||0) : joriy) - .35) / .3));
      });
      if(legend) legend.style.opacity = Math.max(0, Math.min(1, (joriy - .35) / .3));
    }
  };
  return S;
}

/* ================= 3. BIOLOGIYA — BodyParts3D anatomiyasi ================= */
function b64(s, Tip){
  const bin = atob(s), buf = new ArrayBuffer(bin.length), u8 = new Uint8Array(buf);
  for(let i=0;i<bin.length;i++) u8[i] = bin.charCodeAt(i);
  return new Tip(buf);
}
function biologiya3D(sahna, tag, izoh, yorliq){
  const A = window.MAKON_ANATOMIYA;
  if(!A) return false;
  yorliq('Biologiya · inson tanasi','qatlamni yoqing · a’zoni bosing');
  const S = M3sahna(sahna, {rx:0, ry:.35, avto:true, tez:.22, fov:24, zoom:1.02, rxMin:-.5, rxMax:.5, ekspozitsiya:1.2, env:.45, qotirRy:.35});
  const T = S.T, g = S.g;
  const TIZIM = {
    skelet:   {nom:'Skelet',        mat:()=>new T.MeshPhysicalMaterial({color:0xcdbd9f, roughness:.62, clearcoat:.2, clearcoatRoughness:.6}), yoq:true},
    mushak:   {nom:'Mushaklar',     mat:()=>new T.MeshPhysicalMaterial({color:0xb2413a, roughness:.45, clearcoat:.5, clearcoatRoughness:.35, sheen:new T.Color(0x552018)}), yoq:false},
    azo:      {nom:'Ichki a’zolar', mat:null, yoq:true},
    qon:      {nom:'Qon tomirlar',  mat:null, yoq:false},
    teri:     {nom:'Teri',          mat:()=>new T.MeshPhysicalMaterial({color:0x9cc8ff, roughness:.3, transparent:true, opacity:.075, depthWrite:false, side:T.FrontSide, clearcoat:1}), yoq:false}
  };
  const guruh = {};
  Object.keys(TIZIM).forEach(k=>{ guruh[k] = new T.Group(); g.add(guruh[k]); guruh[k].visible = TIZIM[k].yoq; });
  const sk = A.masshtab, sil = A.markaz;
  const umumMat = {};
  A.qismlar.forEach(q=>{
    const geo = new T.BufferGeometry();
    const p16 = b64(q.v, Int16Array), pos = new Float32Array(p16.length);
    for(let i=0;i<p16.length;i+=3){
      pos[i]   = p16[i]  /32767*sk + sil[0];
      pos[i+1] = p16[i+1]/32767*sk + sil[1];
      pos[i+2] = p16[i+2]/32767*sk + sil[2];
    }
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    geo.setIndex(new T.BufferAttribute(b64(q.i, pos.length/3 > 65535 ? Uint32Array : Uint16Array), 1));
    geo.computeVertexNormals();
    let mat;
    if(q.rang){
      mat = new T.MeshPhysicalMaterial({color:new T.Color(q.rang), roughness:.38, clearcoat:.7, clearcoatRoughness:.25});
    } else {
      mat = umumMat[q.t] || (umumMat[q.t] = TIZIM[q.t].mat());
    }
    const m = new T.Mesh(geo, mat);
    if(q.a) m.userData.nom = q.a;
    m.renderOrder = q.t === 'teri' ? 10 : 0;
    guruh[q.t].add(m);
  });

  S.sc.add(new T.HemisphereLight(0xdfe7ff, 0x301c16, .55));
  const kun = new T.DirectionalLight(0xffffff, 1.0); kun.position.set(2, 4, 6); S.sc.add(kun);
  const kontur = new T.DirectionalLight(0x7fb0ff, .9); kontur.position.set(-5, 1, -5); S.sc.add(kontur);
  S.joyla(A.radius, new T.Vector3().fromArray(A.korish));
  const tana = new T.Box3().setFromObject(guruh.skelet), bo = tana.max.y - tana.min.y;
  const cx = (tana.min.x + tana.max.x)/2, cz = (tana.min.z + tana.max.z)/2;
  const KORINISH = [
    ['Ko‘krak va qorin', bo*.2,  new T.Vector3(cx, tana.min.y + bo*.66, cz)],
    ['Bosh',             bo*.085, new T.Vector3(cx, tana.min.y + bo*.925, cz)],
    ['Butun tana',       bo*.5,  new T.Vector3(cx, tana.min.y + bo*.5, cz)]
  ];
  S.fokus(KORINISH[0][1], KORINISH[0][2]);
  const kor = document.createElement('div'); kor.className = 'bio-korinish';
  KORINISH.forEach((k, i)=>{
    const b = document.createElement('button'); b.textContent = k[0]; if(i===0) b.classList.add('faol');
    b.onclick = ()=>{ S.fokus(k[1], k[2], true); [...kor.children].forEach(x=>x.classList.toggle('faol', x===b)); };
    kor.append(b);
  });
  sahna.append(kor);
  // tanlangan a'zoni yoritish
  let tanlangan = null;
  function yorit(ob){
    if(tanlangan){ tanlangan.material.emissive.setHex(0); }
    tanlangan = ob;
    if(ob && ob.material.emissive) ob.material.emissive.setHex(0x3a2a10);
  }
  const ORGAN = window.MAKON_ORGAN || {};
  S.bosish = (d, ob)=>{
    // bir a'zoning bir necha bo'lagi bo'lsa ham — o'sha nom
    const o = ORGAN[d.nom]; if(!o) return;
    yorit(ob);
    izoh.innerHTML = '<b>'+o[0]+'.</b> '+o[1];
    hodisa('azo', {nom:d.nom}); hodisa('detal', {turD:'organ', nom:d.nom});
  };

  Object.keys(TIZIM).forEach(k=>{
    const b = document.createElement('button'); b.textContent = TIZIM[k].nom;
    b.classList.toggle('faol', guruh[k].visible);
    b.onclick = ()=>{ guruh[k].visible = !guruh[k].visible; b.classList.toggle('faol', guruh[k].visible); };
    tag.append(b);
  });
  S.qatlam = (k, v)=>{ guruh[k].visible = v; [...tag.children].forEach(b=>{ const kk = Object.keys(TIZIM).find(x=>TIZIM[x].nom===b.textContent); if(kk) b.classList.toggle('faol', guruh[kk].visible); }); };
  window.MAKON3D._bio = S;
  izoh.innerHTML = 'Haqiqiy anatomik model — <b>BodyParts3D</b> ma’lumotlar bazasi (inson tanasi tomografiyasi asosida). Qatlamni yoqing, <b>a’zoni bosing</b>, sichqoncha bilan aylantiring.';
  return true;
}

/* ================= 4. KIMYO — molekulalar ================= */
const S32 = Math.sin(52.25*Math.PI/180), C32 = Math.cos(52.25*Math.PI/180);
const sinA = 0.9285, cosA = 0.3724, tt = 0.5774;
const MOL = {
  H2:  {atoms:[{e:'H',x:-.5,y:0,z:0},{e:'H',x:.5,y:0,z:0}], bonds:[[0,1,1]]},
  O2:  {atoms:[{e:'O',x:-.62,y:0,z:0},{e:'O',x:.62,y:0,z:0}], bonds:[[0,1,2]]},
  H2O: {atoms:[{e:'O',x:0,y:0,z:0},{e:'H',x:S32,y:C32,z:0},{e:'H',x:-S32,y:C32,z:0}], bonds:[[0,1],[0,2]]},
  CO2: {atoms:[{e:'C',x:0,y:0,z:0},{e:'O',x:1.16,y:0,z:0},{e:'O',x:-1.16,y:0,z:0}], bonds:[[0,1,2],[0,2,2]]},
  NH3: {atoms:[{e:'N',x:0,y:0,z:0},{e:'H',x:sinA,y:cosA,z:0},{e:'H',x:sinA*Math.cos(2.0944),y:cosA,z:sinA*Math.sin(2.0944)},{e:'H',x:sinA*Math.cos(4.1888),y:cosA,z:sinA*Math.sin(4.1888)}], bonds:[[0,1],[0,2],[0,3]]},
  CH4: {atoms:[{e:'C',x:0,y:0,z:0},{e:'H',x:tt,y:tt,z:tt},{e:'H',x:tt,y:-tt,z:-tt},{e:'H',x:-tt,y:tt,z:-tt},{e:'H',x:-tt,y:-tt,z:tt}], bonds:[[0,1],[0,2],[0,3],[0,4]]}
};
(function(){
  const a=[], b=[];
  for(let i=0;i<3;i++) for(let j=0;j<3;j++) for(let k=0;k<3;k++) a.push({e:(i+j+k)%2 ? 'Cl':'Na', x:i-1, y:j-1, z:k-1});
  for(let i=0;i<a.length;i++) for(let j=i+1;j<a.length;j++){ const d = Math.hypot(a[i].x-a[j].x, a[i].y-a[j].y, a[i].z-a[j].z); if(Math.abs(d-1)<.01) b.push([i,j]); }
  MOL.NaCl = {atoms:a, bonds:b, rk:.62};
})();
(function(){
  // qo'shimcha molekulalar (bog' uzunliklari nisbiy, ko'rish uchun)
  MOL.N2  = {atoms:[{e:'N',x:-.55,y:0,z:0},{e:'N',x:.55,y:0,z:0}], bonds:[[0,1,3]]};
  MOL.HCl = {atoms:[{e:'H',x:-.72,y:0,z:0},{e:'Cl',x:.55,y:0,z:0}], bonds:[[0,1,1]]};
  const C2H6 = {atoms:[{e:'C',x:-.73,y:0,z:0},{e:'C',x:.73,y:0,z:0}], bonds:[[0,1,1]]};
  [0,120,240].forEach(a=>{ const r = a*Math.PI/180; C2H6.atoms.push({e:'H',x:-1.08,y:Math.cos(r)*.94,z:Math.sin(r)*.94}); C2H6.bonds.push([0,C2H6.atoms.length-1,1]); });
  [60,180,300].forEach(a=>{ const r = a*Math.PI/180; C2H6.atoms.push({e:'H',x:1.08,y:Math.cos(r)*.94,z:Math.sin(r)*.94}); C2H6.bonds.push([1,C2H6.atoms.length-1,1]); });
  MOL.C2H6 = C2H6;
  MOL.C2H4 = {atoms:[{e:'C',x:-.66,y:0,z:0},{e:'C',x:.66,y:0,z:0},{e:'H',x:-1.16,y:.87,z:0},{e:'H',x:-1.16,y:-.87,z:0},{e:'H',x:1.16,y:.87,z:0},{e:'H',x:1.16,y:-.87,z:0}], bonds:[[0,1,2],[0,2,1],[0,3,1],[1,4,1],[1,5,1]]};
  MOL.C2H2 = {atoms:[{e:'H',x:-1.62,y:0,z:0},{e:'C',x:-.6,y:0,z:0},{e:'C',x:.6,y:0,z:0},{e:'H',x:1.62,y:0,z:0}], bonds:[[0,1,1],[1,2,3],[2,3,1]]};
  const B = {atoms:[], bonds:[]};
  for(let i=0;i<6;i++){ const a = i*Math.PI/3; B.atoms.push({e:'C',x:Math.cos(a)*1.4,y:Math.sin(a)*1.4,z:0}); }
  for(let i=0;i<6;i++){ const a = i*Math.PI/3; B.atoms.push({e:'H',x:Math.cos(a)*2.42,y:Math.sin(a)*2.42,z:0}); B.bonds.push([i,6+i,1]); B.bonds.push([i,(i+1)%6, 1]); }
  B.aromatik = 1.4;
  B.rk = .85;
  MOL.C6H6 = B;
  // metanol: C tetraedr, O-H burchakli
  const tH = (cx, cy, cz, yon)=>yon.map(v=>({e:'H', x:cx + v[0], y:cy + v[1], z:cz + v[2]}));
  const M = {atoms:[{e:'C',x:-.55,y:0,z:0},{e:'O',x:.85,y:0,z:0},{e:'H',x:1.2,y:-.9,z:0}], bonds:[[0,1,1],[1,2,1]]};
  tH(-.55,0,0,[[-.36,.94,0],[-.36,-.47,.82],[-.36,-.47,-.82]]).forEach(h=>{ M.atoms.push(h); M.bonds.push([0, M.atoms.length-1, 1]); });
  MOL.CH3OH = M;
  // etanol: ideal tetraedr (barcha burchaklar 109,5°), shtaffel/anti konformatsiya
  const E = {atoms:[{e:'C',x:-1.13,y:-0.43,z:0.00},{e:'C',x:0.33,y:-0.43,z:0.00},{e:'O',x:0.79,y:0.86,z:0.00},{e:'H',x:1.71,y:0.86,z:0.00},{e:'H',x:-1.47,y:-1.42,z:0.00},{e:'H',x:-1.47,y:0.06,z:-0.85},{e:'H',x:-1.47,y:0.06,z:0.85},{e:'H',x:0.68,y:-0.92,z:-0.85},{e:'H',x:0.68,y:-0.92,z:0.85}], bonds:[[0,1,1],[1,2,1],[2,3,1],[0,4,1],[0,5,1],[0,6,1],[1,7,1],[1,8,1]]};
  MOL.C2H5OH = E;
})();
const EL3D = { H:{r:.30,c:0xf2f6ff}, O:{r:.46,c:0xff4b39}, C:{r:.50,c:0x3f4863}, N:{r:.45,c:0x4a6dff}, Na:{r:.58,c:0xb06cf5}, Cl:{r:.54,c:0x33cf74} };
function molekula3D(idish, kalit, o){
  o = o || {};
  const mol = MOL[kalit]; if(!mol) return null;
  const S = M3sahna(idish, {rx:-.25, ry:.5, avto:true, tez:.35, fov:30, zoom:o.zoom || 1.25, env:.6});
  const T = S.T, g = S.g, SF = kalit === 'NaCl' ? 1.3 : 1.55;
  const shar = new T.SphereGeometry(1, 48, 32), sil = new T.CylinderGeometry(1, 1, 1, 28);
  mol.atoms.forEach(a=>{
    const E = EL3D[a.e];
    const m = new T.Mesh(shar, new T.MeshPhysicalMaterial({color:E.c, roughness:.3, metalness:.05, clearcoat:.6, clearcoatRoughness:.3}));
    m.scale.setScalar(E.r * (mol.rk||1)); m.position.set(a.x*SF, -a.y*SF, a.z*SF); m.userData.nom = a.e; g.add(m);
    /* v3.15: element belgisi atom ustida (chuqurlik tekshiruvisiz — doim o‘qiladi) */
    const yl = matnSprite(T, a.e, {balandlik:a.e === 'H' ? .26 : .34, fon:'rgba(10,14,29,.55)', rang:'#ffffff', shrift:'700 46px Inter, sans-serif'});
    yl.material.depthTest = false; yl.renderOrder = 20; yl.position.copy(m.position); g.add(yl);
  });
  const bogMat = new T.MeshPhysicalMaterial({color:0xcfd6ea, roughness:.4, metalness:.15, clearcoat:.4});
  (mol.bonds||[]).forEach(b=>{
    const A = mol.atoms[b[0]], B = mol.atoms[b[1]], ord = b[2]||1;
    const v1 = new T.Vector3(A.x*SF, -A.y*SF, A.z*SF), v2 = new T.Vector3(B.x*SF, -B.y*SF, B.z*SF);
    const yol = new T.Vector3().subVectors(v2, v1), uz = yol.length();
    const perp = new T.Vector3(0,1,0).cross(yol).normalize(); if(!isFinite(perp.x) || perp.length() < .01) perp.set(0,0,1);
    for(let k=0;k<ord;k++){
      const m = new T.Mesh(sil, bogMat);
      m.scale.set(ord>1?.075:.1, uz, ord>1?.075:.1);
      m.position.copy(v1).addScaledVector(yol, .5); if(ord>1) m.position.addScaledVector(perp, (k - (ord-1)/2) * (ord > 2 ? .17 : .28));
      m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), yol.clone().normalize()); g.add(m);
    }
  });
  if(mol.aromatik){ const h = new T.Mesh(new T.TorusGeometry(mol.aromatik*SF*.62, .06, 16, 96), bogMat); g.add(h); }
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1a1420, .6));
  const kun = new T.DirectionalLight(0xffffff, 1); kun.position.set(3, 5, 6); S.sc.add(kun);
  const orqaN = new T.DirectionalLight(0x8fb4ff, .55); orqaN.position.set(-4, 2, -6); S.sc.add(orqaN);
  const b = new T.Box3().setFromObject(g);
  { const bs = b.getSize(new T.Vector3()), bm = b.getCenter(new T.Vector3()); const sy = S.soyaQosh(Math.max(bs.x, bs.z) * .6 + .4, b.min.y - .7, .5); sy.position.x = bm.x; sy.position.z = bm.z; }
  S.joyla(b.getSize(new T.Vector3()).length()/2 + .3, b.getCenter(new T.Vector3()));
  S.bosish = d=>{ hodisa('atom', {nom:d.nom}); hodisa('detal', {turD:'atom', nom:d.nom}); };
  return S;
}

/* ================= 5. TAYYOR GLB MODEL (CC0 / CC BY) ================= */
function glbSahna(idish, kalit, o){
  o = o || {};
  const b64s = (window.MAKON_GLB || {})[kalit];
  if(!b64s || !THREE.GLTFLoader) return null;
  const S = M3sahna(idish, {rx:o.rx !== undefined ? o.rx : -.18, ry:o.ry !== undefined ? o.ry : .6, avto:o.avto !== false, tez:o.tez || .18, fov:28, zoom:o.zoom || 1.1, env:o.env !== undefined ? o.env : .8, ekspozitsiya:o.ekspozitsiya || 1.05, rxMin:-1.3, rxMax:1.3});
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x2a2018, .7));
  const kun = new T.DirectionalLight(0xffffff, 1.3); kun.position.set(3, 6, 5); S.sc.add(kun);
  const orqa = new T.DirectionalLight(0x9fb6ff, .7); orqa.position.set(-5, 2, -6); S.sc.add(orqa);
  const QISM = [];
  const labels = o.yorliqlar || null;
  function ajdod(p, ob){ let x = ob.parent; while(x){ if(x === p) return true; x = x.parent; } return false; }
  S.tayyor = new Promise((ok, xato)=>{
    new T.GLTFLoader().parse(b64(b64s, Uint8Array).buffer, '', gltf=>{
      const model = gltf.scene;
      if(o.aylantir) model.rotation.set(o.aylantir[0]||0, o.aylantir[1]||0, o.aylantir[2]||0);
      model.updateMatrixWorld(true);
      const bx = new T.Box3().setFromObject(model), sz = bx.getSize(new T.Vector3()), mk = bx.getCenter(new T.Vector3());
      const kat = 6 / Math.max(sz.x, sz.y, sz.z);
      const ust = new T.Group(); ust.add(model); g.add(ust);
      ust.scale.setScalar(kat); ust.position.copy(mk).multiplyScalar(-kat);
      ust.updateMatrixWorld(true);
      const tugunlar = []; model.traverse(ob=>tugunlar.push(ob));
      tugunlar.forEach(ob=>{ if(ob.isMesh && ob.material && ob.material.map) ob.material.map.anisotropy = 4; });
      (o.qismlar || []).forEach(q=>{
        const mos = ob=>(q.tugun||[]).some(t=>t instanceof RegExp ? t.test(ob.name) : ob.name === t);
        const obs = tugunlar.filter(mos);
        const top = obs.filter(ob=>!obs.some(p=>p !== ob && ajdod(p, ob)));
        if(!top.length) return;
        top.forEach(ob=>ob.traverse(x=>{ if(x.isMesh) x.userData.nom = q.nom; }));
        QISM.push({q, obs:top, asl:top.map(ob=>ob.getWorldPosition(new T.Vector3()).applyMatrix4(new T.Matrix4().copy(g.matrixWorld).invert())), t:0, maqsad:0, d:new T.Vector3().fromArray(q.d || [0, 1, 0])});
      });
      if(!QISM.length && o.avtoAjrat){
        const umumMk = new T.Box3().setFromObject(ust).getCenter(new T.Vector3());
        tugunlar.filter(ob=>ob.isMesh).forEach((m, i)=>{
          const c = new T.Box3().setFromObject(m).getCenter(new T.Vector3());
          const d = c.clone().sub(umumMk); if(d.length() < .01) d.set(0, 1, 0);
          d.normalize().multiplyScalar(1.6);
          m.userData.nom = m.name || ('qism '+(i+1));
          QISM.push({q:{raqam:i+1, nom:m.userData.nom}, obs:[m], asl:[m.getWorldPosition(new T.Vector3()).applyMatrix4(new T.Matrix4().copy(g.matrixWorld).invert())], t:0, maqsad:0, d});
        });
      }
      const qb = new T.Box3().setFromObject(ust);
      /* v3.15: ko‘rgazma poydevori + yumshoq soya — model «havoda osilib» turmasin */
      if(o.poydevor !== false){
        const qs = qb.getSize(new T.Vector3()), qm = qb.getCenter(new T.Vector3()), rp = Math.max(qs.x, qs.z) * .62 + .3;
        const pm = new T.MeshStandardMaterial({color:0x10142a, roughness:.7, metalness:.35}); pm.userData.env = 1; pm.envMapIntensity = .3;
        const poy = new T.Mesh(new T.CylinderGeometry(rp, rp * 1.04, .14, 72), pm); poy.position.set(qm.x, qb.min.y - .12, qm.z); poy.userData.rentgenYoq = true; g.add(poy);
        const hl = new T.Mesh(new T.TorusGeometry(rp * 1.005, .02, 8, 96), new T.MeshBasicMaterial({color:0x6d52ff, transparent:true, opacity:.75})); hl.rotation.x = Math.PI / 2; hl.position.set(qm.x, qb.min.y - .05, qm.z); g.add(hl);
        const sy = S.soyaQosh(Math.max(qs.x, qs.z) * .55, qb.min.y - .045, .65); sy.position.x = qm.x; sy.position.z = qm.z; sy.scale.set(1, Math.max(.35, qs.z / Math.max(qs.x, qs.z)), 1);
      }
      S.joyla(qb.getSize(new T.Vector3()).length()/2 * .9, qb.getCenter(new T.Vector3()));
      S.model = model; S.qismlar = QISM;
      if(labels){
        labels.innerHTML = '';
        QISM.forEach(p=>{ const e = document.createElement('span'); e.className = 'glb-yorliq'; e.innerHTML = (o.raqamli ? '<b>'+p.q.raqam+'</b>' : '') + p.q.nom; labels.append(e); p.el = e; });
      }
      ok(S);
    }, e=>xato(e));
  });
  // qism pozitsiyasi g-lokal koordinatada: asl + d*e  →  ota-tugun lokaliga o'tkaziladi
  const v = new T.Vector3(), inv = new T.Matrix4();
  S.ajrat = t=>QISM.forEach(p=>p.maqsad = t);
  S.ajratQism = (raqam, val)=>QISM.forEach(p=>{ if(p.q.raqam === raqam) p.maqsad = val ? 1 : 0; });
  S.belgila = raqam=>QISM.forEach(p=>p.obs.forEach(ob=>ob.traverse(m=>{
    if(!m.isMesh || !m.material || !m.material.emissive) return;
    if(!m.userData.aslEm){ m.material = m.material.clone(); m.userData.aslEm = m.material.emissive.clone(); }
    m.material.emissive.copy(p.q.raqam === raqam ? new T.Color(0x4a2fb0) : m.userData.aslEm);
  })));
  S.bosish = d=>{ const p = QISM.find(x=>x.q.nom === d.nom); hodisa('glb-qism', {nom:d.nom, raqam:p ? p.q.raqam : null}); };
  S.kadrda = ()=>{
    QISM.forEach(p=>{
      p.t += (p.maqsad - p.t) * .12;
      if(Math.abs(p.maqsad - p.t) < .0005 && p.t === p.oxirgi) return;
      p.oxirgi = p.t;
      const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, p.t)), 3);
      p.obs.forEach((ob, i)=>{
        v.copy(p.asl[i]).addScaledVector(p.d, e).applyMatrix4(g.matrixWorld);
        ob.parent.updateMatrixWorld(true);
        inv.copy(ob.parent.matrixWorld).invert();
        ob.position.copy(v.applyMatrix4(inv));
      });
    });
    if(labels && QISM.length){
      const r = idish.getBoundingClientRect();
      const joy = QISM.map(p=>{
        const bb = new T.Box3(); p.obs.forEach(ob=>bb.expandByObject(ob)); bb.getCenter(v); v.project(S.cam);
        return {p, x:(v.x+1)/2*r.width, y:(1-v.y)/2*r.height, w:p.el.offsetWidth || 80, h:p.el.offsetHeight || 20};
      }).sort((a, b)=>a.y - b.y);
      const joylar = [];
      joy.forEach(j=>{
        let x = Math.max(j.w/2 + 6, Math.min(r.width - j.w/2 - 6, j.x)), y = j.y;
        for(let k=0;k<10;k++){ const t = joylar.find(q=>Math.abs(q.x - x) < (q.w + j.w)/2 + 4 && Math.abs(q.y - y) < (q.h + j.h)/2 + 2); if(!t) break; y = t.y + (t.h + j.h)/2 + 3; }
        joylar.push({x, y, w:j.w, h:j.h});
        j.p.el.style.transform = 'translate('+(x - j.w/2)+'px,'+(y - j.h/2)+'px)';
        j.p.el.style.opacity = o.doimYorliq ? 1 : Math.max(0, Math.min(1, (j.p.t - .3) / .35));
      });
    }
  };
  return S;
}


/* ================= 6. ZANJIR 2 — ketma-ket va parallel ulash ================= */
function zanjir2(sahna, tag, izoh, yorliq){
  yorliq('Fizika · o‘tkazgichlarni ulash');
  const S = M3sahna(sahna, {rx:.72, ry:-.28, avto:false, zoom:.84, fov:30, rxMin:.15, rxMax:1.35});
  const T = S.T, g = S.g;
  const taxta = new T.Mesh(new T.BoxGeometry(12.4, .5, 7.4), new T.MeshStandardMaterial({color:0xffffff, map:yogochTekstura(T,'#4a3020','25,12,5'), roughness:.6}));
  taxta.position.y = -.25; g.add(taxta);
  const qop = new T.Mesh(new T.BoxGeometry(11.8, .04, 6.8), new T.MeshStandardMaterial({color:0x151c34, roughness:.85})); qop.position.y = .02; g.add(qop);
  const setka = new T.GridHelper(11.6, 29, 0x2c3a5e, 0x222c4a); setka.scale.z = 6.6/11.6; setka.position.y = .045; g.add(setka);
  const Y = .32;
  S.sc.add(new T.HemisphereLight(0xb8c8ff, 0x20150c, .55));
  const kun = new T.DirectionalLight(0xffffff, .9); kun.position.set(3, 8, 5); S.sc.add(kun);

  // batareya
  const bat = new T.Group(); bat.position.set(-4.7, Y, 0); g.add(bat);
  const kor = new T.Mesh(new T.CylinderGeometry(.62, .62, 2.5, 48), new T.MeshPhysicalMaterial({color:0x151823, metalness:.3, roughness:.35, clearcoat:.8})); bat.add(kor);
  const tas = new T.Mesh(new T.CylinderGeometry(.625, .625, .95, 48, 1, true), new T.MeshPhysicalMaterial({color:0x19c7b5, metalness:.5, roughness:.3, clearcoat:.8})); tas.position.y = -.78; bat.add(tas);
  const pl = new T.Mesh(new T.CylinderGeometry(.22, .22, .2, 32), new T.MeshStandardMaterial({color:0xd0d4de, metalness:1, roughness:.22})); pl.position.y = 1.33; bat.add(pl);
  bat.rotation.x = Math.PI/2;
  const batT = yozuvTekstura(T, '12 V', {fon:'#19c7b5', rang:'#0a1020', shrift:'800 58px "IBM Plex Mono", monospace'});
  const batP = new T.Mesh(new T.PlaneGeometry(1.05, .4), new T.MeshBasicMaterial({map:batT, toneMapped:false}));
  batP.position.set(-4.04, Y + .02, .8); batP.rotation.set(-Math.PI/2, 0, Math.PI/2); g.add(batP);
  bat.traverse(o=>{ if(o.isMesh) o.userData.nom = 'bat'; });

  // ampermetr (umumiy tok)
  const amp = new T.Group(); amp.position.set(-1.8, Y, 2.5); g.add(amp);
  const aq = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(2.2, .8, 1.3, 4, .15) : new T.BoxGeometry(2.2,.8,1.3), new T.MeshPhysicalMaterial({color:0x2e3a66, roughness:.35, clearcoat:.7}));
  aq.position.y = .14; amp.add(aq);
  const ampT = yozuvTekstura(T, '0,00 A', {w:320, h:120});
  const ae = new T.Mesh(new T.PlaneGeometry(1.8, .62), new T.MeshBasicMaterial({map:ampT, toneMapped:false})); ae.rotation.x = -Math.PI/2; ae.position.y = .56; amp.add(ae);
  amp.traverse(o=>{ if(o.isMesh) o.userData.nom = 'amp'; });

  // lampa bloklari
  function lampa(nom){
    const L = new T.Group(); g.add(L);
    const tagi = new T.Mesh(new T.BoxGeometry(1.5, .22, 1.1), new T.MeshStandardMaterial({color:0x222838, roughness:.6})); tagi.position.y = -.2; L.add(tagi);
    const pat = new T.Mesh(new T.CylinderGeometry(.36, .44, .62, 36), new T.MeshStandardMaterial({color:0x2a2f3d, roughness:.5})); pat.position.y = .08; L.add(pat);
    const shisha = new T.Mesh(new T.SphereGeometry(.62, 40, 28), new T.MeshPhysicalMaterial({color:0xffffff, roughness:.05, transmission:.9, transparent:true, opacity:.5, clearcoat:1, side:T.DoubleSide}));
    shisha.position.y = .95; shisha.scale.y = 1.1; L.add(shisha);
    const tolaM = new T.MeshStandardMaterial({color:0x331a00, emissive:0xffa53a, emissiveIntensity:0});
    const tola = new T.Mesh(new T.TorusGeometry(.16, .022, 8, 32, Math.PI), tolaM); tola.position.y = .9; L.add(tola);
    const nur = new T.Mesh(new T.SphereGeometry(.56, 28, 20), new T.MeshBasicMaterial({color:0xffb14a, transparent:true, opacity:0, depthWrite:false, blending:T.AdditiveBlending})); nur.position.y = .95; L.add(nur);
    const ln = new T.PointLight(0xffb45a, 0, 10, 1.6); ln.position.y = .95; L.add(ln);
    const t = yozuvTekstura(T, nom, {w:420, h:120, fon:'#0c1328', rang:'#e8ecff', shrift:'600 40px "IBM Plex Mono", monospace'});
    const pan = new T.Mesh(new T.PlaneGeometry(1.9, .54), new T.MeshBasicMaterial({map:t, toneMapped:false, transparent:true}));
    pan.rotation.x = -Math.PI/2; pan.position.set(0, .02, .95); L.add(pan);
    L.traverse(o=>{ if(o.isMesh) o.userData.nom = nom; });
    return {L, tolaM, nur, ln, t, nom};
  }
  const L1 = lampa('L1'), L2 = lampa('L2');

  const izol = new T.MeshPhysicalMaterial({color:0xd8392b, roughness:.38, clearcoat:.6});
  const izol2 = new T.MeshPhysicalMaterial({color:0x1d1f29, roughness:.4, clearcoat:.5});
  const simG = new T.Group(); g.add(simG);
  function sim(a, b, mat){
    const c = new T.LineCurve3(new T.Vector3(a[0], Y, a[1]), new T.Vector3(b[0], Y, b[1]));
    simG.add(new T.Mesh(new T.TubeGeometry(c, 1, .07, 12, false), mat));
    const k = new T.Mesh(new T.SphereGeometry(.07, 12, 10), mat); k.position.set(b[0], Y, b[1]); simG.add(k);
  }
  function yolQur(nuqtalar){
    const cp = new T.CurvePath();
    for(let i=0;i<nuqtalar.length-1;i++) cp.add(new T.LineCurve3(new T.Vector3(nuqtalar[i][0], Y, nuqtalar[i][1]), new T.Vector3(nuqtalar[i+1][0], Y, nuqtalar[i+1][1])));
    return cp;
  }
  let rejim = 'ketma', yollar = [];
  const eGeo = new T.SphereGeometry(.075, 14, 10), eMat = new T.MeshBasicMaterial({color:0x8fdcff, toneMapped:false});
  const eHalo = new T.MeshBasicMaterial({color:0x3aa8ff, transparent:true, opacity:.35, depthWrite:false, blending:T.AdditiveBlending});
  const elektronlar = [];
  function elektronQur(){
    elektronlar.forEach(e=>g.remove(e.m)); elektronlar.length = 0;
    yollar.forEach((y, yi)=>{ const n = Math.round(y.uz * 1.3); for(let i=0;i<n;i++){ const m = new T.Mesh(eGeo, eMat); const h = new T.Mesh(eGeo, eHalo); h.scale.setScalar(2.2); m.add(h); g.add(m); elektronlar.push({m, yi, f:i/n}); } });
  }
  function qur(){
    while(simG.children.length){ const c = simG.children.pop(); c.geometry.dispose(); }
    const X0 = -4.7, X1 = 4.7, Z0 = -2.5, Z1 = 2.5;
    if(rejim === 'ketma'){
      L1.L.position.set(-1.2, Y, Z0); L2.L.position.set(2.2, Y, Z0);
      L1.L.rotation.y = L2.L.rotation.y = 0;
      sim([X0,-1.35],[X0,Z0], izol); sim([X0,Z0],[-1.95,Z0], izol); sim([-.45,Z0],[1.45,Z0], izol); sim([2.95,Z0],[X1,Z0], izol2);
      sim([X1,Z0],[X1,Z1], izol2); sim([X1,Z1],[-.7,Z1], izol2); sim([-2.9,Z1],[X0,Z1], izol2); sim([X0,Z1],[X0,1.35], izol2);
      const y = yolQur([[X0,Z1],[X0,Z0],[X1,Z0],[X1,Z1],[X0,Z1]]); y.uz = y.getLength(); yollar = [y];
    } else {
      const B1 = .9, B2 = 3.6;
      L1.L.position.set(B1, Y, 0); L2.L.position.set(B2, Y, 0);
      L1.L.rotation.y = L2.L.rotation.y = -Math.PI/2;
      sim([X0,-1.35],[X0,Z0], izol); sim([X0,Z0],[B1,Z0], izol); sim([B1,Z0],[B2,Z0], izol);
      sim([B1,Z0],[B1,-.75], izol); sim([B2,Z0],[B2,-.75], izol);
      sim([B1,.75],[B1,Z1], izol2); sim([B2,.75],[B2,Z1], izol2);
      sim([B2,Z1],[B1,Z1], izol2); sim([B1,Z1],[-.7,Z1], izol2); sim([-2.9,Z1],[X0,Z1], izol2); sim([X0,Z1],[X0,1.35], izol2);
      const y1 = yolQur([[X0,Z1],[X0,Z0],[B1,Z0],[B1,Z1],[X0,Z1]]); y1.uz = y1.getLength();
      const y2 = yolQur([[X0,Z1],[X0,Z0],[B2,Z0],[B2,Z1],[X0,Z1]]); y2.uz = y2.getLength();
      yollar = [y1, y2];
    }
    simG.traverse(o=>{ if(o.isMesh && o.material && !o.material.userData.env){ o.material.envMapIntensity = .55; o.material.userData.env = 1; } });
    elektronQur();
  }
  S.joyla(6.6, new T.Vector3(0, .5, 0));

  tag.innerHTML = '<button data-r="ketma" class="faol">Ketma-ket</button><button data-r="parallel">Parallel</button>'+
    '<label>U <input type="range" id="z2U" min="1.5" max="24" step="1.5" value="12"></label>'+
    '<label>R₁ <input type="range" id="z2R1" min="1" max="24" step="1" value="6"></label>'+
    '<label>R₂ <input type="range" id="z2R2" min="1" max="24" step="1" value="6"></label>';
  const iU = tag.querySelector('#z2U'), iR1 = tag.querySelector('#z2R1'), iR2 = tag.querySelector('#z2R2');
  const sn = (x, k)=>x.toFixed(k).replace('.', ',');
  let tezlik = [.3, .3];
  function lampaYoq(L, P, U, I){
    const yor = Math.min(1, P/40);
    L.tolaM.emissiveIntensity = .1 + yor*5; L.nur.material.opacity = yor*.5; L.nur.scale.setScalar(.8 + yor*.8); L.ln.intensity = yor*2.6;
    L.t.yoz(L.nom+' · '+sn(U,1)+' V · '+sn(I,2)+' A');
  }
  function yangila(){
    const U = +iU.value, R1 = +iR1.value, R2 = +iR2.value;
    let Rum, I, I1, I2, U1, U2;
    if(rejim === 'ketma'){ Rum = R1 + R2; I = U / Rum; I1 = I2 = I; U1 = I*R1; U2 = I*R2; }
    else { Rum = R1*R2/(R1+R2); I = U / Rum; U1 = U2 = U; I1 = U/R1; I2 = U/R2; }
    batT.yoz(sn(U,1)+' V'); ampT.yoz(sn(I,2)+' A');
    lampaYoq(L1, U1*I1, U1, I1); lampaYoq(L2, U2*I2, U2, I2);
    tezlik = rejim === 'ketma' ? [Math.min(1.8, .1 + I*.35)] : [Math.min(1.8, .1 + I1*.35), Math.min(1.8, .1 + I2*.35)];
    izoh.innerHTML = rejim === 'ketma'
      ? '<b>Ketma-ket:</b> R = R₁ + R₂ = '+R1+' + '+R2+' = '+Rum+' Ω; I = U / R = '+sn(I,2)+' A — ikkala lampadan bir xil tok o‘tadi, kuchlanish bo‘linadi: U₁ = '+sn(U1,1)+' V, U₂ = '+sn(U2,1)+' V.'
      : '<b>Parallel:</b> 1/R = 1/R₁ + 1/R₂ → R = '+sn(Rum,2)+' Ω; umumiy tok I = '+sn(I,2)+' A = I₁ + I₂ = '+sn(I1,2)+' + '+sn(I2,2)+' A — har bir lampada kuchlanish bir xil: '+sn(U,1)+' V.';
    hodisa('zanjir2', {rejim, U, R1, R2, Rum, I, I1, I2, U1, U2});
  }
  tag.querySelectorAll('[data-r]').forEach(b=>b.onclick = ()=>{ S.holat({rejim:b.dataset.r}); });
  S.holat = h=>{ if(h && h.rejim && h.rejim !== rejim){ rejim = h.rejim; tag.querySelectorAll('[data-r]').forEach(x=>x.classList.toggle('faol', x.dataset.r === rejim)); qur(); } yangila(); };
  iU.oninput = iR1.oninput = iR2.oninput = yangila;
  qur(); yangila();
  let faza = 0;
  S.kadrda = dt=>{
    faza += dt;
    elektronlar.forEach(e=>{ const y = yollar[e.yi]; if(!y) return; const t = ((e.f + faza * tezlik[Math.min(e.yi, tezlik.length-1)] * 3 / y.uz) % 1 + 1) % 1; e.m.position.copy(y.getPointAt(Math.min(.9999, Math.max(.0001, t)))); });
  };
  S.bosish = d=>hodisa('detal', {turD:'fizika', nom:d.nom});
  return S;
}

/* ================= 7. QUYOSH SISTEMASI (NASA suratlari) ================= */
const SAYYORA_M = [
  ['merkuriy','Merkuriy', 87.97, 0.39, .32],
  ['venera','Venera', 224.7, 0.72, .5],
  ['yer','Yer', 365.26, 1.00, .52],
  ['mars','Mars', 686.98, 1.52, .4],
  ['yupiter','Yupiter', 4331, 5.20, 1.25],
  ['saturn','Saturn', 10747, 9.58, 1.05],
  ['uran','Uran', 30589, 19.2, .85],
  ['neptun','Neptun', 59800, 30.05, .82]
];
function quyosh3D(sahna, tag, izoh, yorliq){
  yorliq('Astronomiya · NASA/JPL suratlari · masofa va o‘lchamlar siqilgan');
  const S = M3sahna(sahna, {rx:.55, ry:0, avto:false, fov:34, zoom:.78, rxMin:.05, rxMax:1.4, env:.2});
  const T = S.T, g = S.g;
  const R = window.MAKON_SAYYORA_RASM || {};
  const tl = new T.TextureLoader();
  const tex = k=>{ if(!R[k]) return null; const t = tl.load(R[k]); t.encoding = T.sRGBEncoding; return t; };
  // yulduzlar
  const yulG = new T.BufferGeometry(), yp = [];
  for(let i=0;i<1400;i++){ const r = 90 + Math.random()*60, a = Math.random()*Math.PI*2, b = Math.acos(2*Math.random()-1); yp.push(r*Math.sin(b)*Math.cos(a), r*Math.cos(b), r*Math.sin(b)*Math.sin(a)); }
  yulG.setAttribute('position', new T.Float32BufferAttribute(yp, 3));
  S.sc.add(new T.Points(yulG, new T.PointsMaterial({color:0xb9c6ff, size:.35, sizeAttenuation:true, transparent:true, opacity:.8})));
  // quyosh
  const qs = new T.Sprite(new T.SpriteMaterial({map:tex('quyosh'), toneMapped:false})); qs.scale.setScalar(3.2); g.add(qs);
  const nurC = document.createElement('canvas'); nurC.width = nurC.height = 128; const nx = nurC.getContext('2d');
  const gr = nx.createRadialGradient(64,64,10,64,64,64); gr.addColorStop(0,'rgba(255,200,90,.9)'); gr.addColorStop(.4,'rgba(255,150,40,.35)'); gr.addColorStop(1,'rgba(255,120,20,0)'); nx.fillStyle = gr; nx.fillRect(0,0,128,128);
  const nurS = new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(nurC), blending:T.AdditiveBlending, depthWrite:false, transparent:true, toneMapped:false})); nurS.scale.setScalar(7.5); g.add(nurS);
  qs.userData.nom = 'quyosh';
  const P = [];
  SAYYORA_M.forEach((m, i)=>{
    const rad = 3.2 + i * 1.75;
    const orb = new T.Mesh(new T.RingGeometry(rad - .012, rad + .012, 128), new T.MeshBasicMaterial({color:0x5b6aa8, transparent:true, opacity:.35, side:T.DoubleSide, depthWrite:false}));
    orb.rotation.x = -Math.PI/2; g.add(orb);
    const sp = new T.Sprite(new T.SpriteMaterial({map:tex(m[0]), transparent:true, toneMapped:false}));
    const w = m[4] * (m[0] === 'saturn' ? 2.2 : 1), h = m[4] * (m[0] === 'saturn' ? 2.2*122/300 : 1);
    sp.scale.set(w, h, 1); sp.userData.nom = m[0]; g.add(sp);
    const bur = Math.random() * Math.PI * 2;
    P.push({m, sp, rad, bur, tez:.9 * Math.pow(87.97 / m[2], .5)});
  });
  // yorliq
  const yl = document.createElement('div'); yl.className = 'glb-yorliqlar'; sahna.append(yl);
  P.forEach(p=>{ const e = document.createElement('span'); e.className = 'glb-yorliq'; e.textContent = p.m[1]; yl.append(e); p.el = e; });
  S.joyla(17, new T.Vector3(0, 0, 0));
  let harakat = true, fokus = null;
  tag.innerHTML = '<button class="faol" data-h="1">Harakat</button><button data-k="umumiy">Umumiy ko‘rinish</button>';
  tag.querySelector('[data-h]').onclick = e=>{ harakat = !harakat; e.currentTarget.classList.toggle('faol', harakat); };
  tag.querySelector('[data-k]').onclick = ()=>{ fokus = null; S.fokus(17, new T.Vector3(0,0,0), true); };
  const kartaYoz = p=>{ izoh.innerHTML = '<b>'+p.m[1]+'.</b> Quyoshdan o‘rtacha masofa — <b>'+String(p.m[3]).replace('.', ',')+' a.b.</b>; Quyosh atrofida bir aylanish — <b>'+p.m[2].toLocaleString('en').replace(/,/g,' ').replace('.', ',')+'</b> Yer kuni.'; };
  S.holat = h=>{ if(h && h.sayyora){ const p = P.find(x=>x.m[0] === h.sayyora); if(p){ fokus = p; kartaYoz(p); } } };
  S.bosish = d=>{ const p = P.find(x=>x.m[0] === d.nom); if(p){ fokus = p; kartaYoz(p); } hodisa('sayyora', {nom:d.nom}); hodisa('detal', {turD:'sayyora', nom:d.nom}); };
  S.aylanish = v=>{ if(v !== undefined) harakat = v; return harakat; };
  izoh.innerHTML = 'Sayyorani bosing — kamera unga yaqinlashadi. Aylanish tezliklari haqiqiy davrlar nisbatiga yaqin (siqilgan), masofa va o‘lchamlar ko‘rish uchun siqilgan.';
  const v = new T.Vector3();
  let vaqt = 0;
  S.kadrda = dt=>{
    if(harakat) vaqt += dt;
    P.forEach(p=>{ const a = p.bur + vaqt * p.tez * .25; p.sp.position.set(Math.cos(a) * p.rad, 0, -Math.sin(a) * p.rad); });
    if(fokus){ S.fokus(Math.max(1.2, fokus.m[4] * 2.2), fokus.sp.position, true); }
    const r = sahna.getBoundingClientRect();
    P.forEach(p=>{
      p.sp.getWorldPosition(v); v.y += p.m[4] * .62; v.project(S.cam);
      const ko = v.z < 1;
      p.el.style.transform = 'translate('+((v.x+1)/2*r.width - (p.el.offsetWidth||60)/2)+'px,'+((1-v.y)/2*r.height - 24)+'px)';
      p.el.style.opacity = ko ? 1 : 0;
    });
  };
  return S;
}

/* ================= 8. GEOMETRIYA ================= */
const SHAKL_NOM = {kub:'Kub', parallelepiped:'To‘g‘ri burchakli parallelepiped', prizma3:'Uchburchakli prizma', piramida4:'To‘rtburchakli piramida', tetraedr:'Muntazam tetraedr', silindr:'Silindr', konus:'Konus', shar:'Shar'};
function geometriya3D(sahna, tag, izoh, yorliq, oo){
  oo = oo || {};
  const royxat = oo.shakllar || ['kub','parallelepiped','prizma3','piramida4','tetraedr','silindr','konus','shar'];
  yorliq('Geometriya · jismlar');
  const S = M3sahna(sahna, {rx:.32, ry:.7, avto:true, tez:.22, fov:30, zoom:1.05, env:.6, rxMin:-.1, rxMax:1.1});
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1a1420, .55));
  const kun = new T.DirectionalLight(0xffffff, 1); kun.position.set(4, 7, 5); S.sc.add(kun);
  /* v3.15: to‘r o‘rniga yumaloq poydevor + yumshoq soya + orqa nur */
  const poyM = new T.MeshStandardMaterial({color:0x0c1022, roughness:.85, metalness:0}); poyM.userData.env = 1; poyM.envMapIntensity = .15;
  const poy = new T.Mesh(new T.CylinderGeometry(2.3, 2.4, .12, 72), poyM);
  poy.position.y = -.07; g.add(poy);
  const poyH = new T.Mesh(new T.TorusGeometry(2.32, .018, 8, 96), new T.MeshBasicMaterial({color:0x7b63ff, transparent:true, opacity:.85})); poyH.rotation.x = Math.PI / 2; poyH.position.y = -.01; g.add(poyH);
  const pol = new T.PolarGridHelper(2.2, 12, 5, 72, 0x2e3a66, 0x1d2442); pol.position.y = .002; g.add(pol);
  const soya = S.soyaQosh(1.9, .006, .7);
  const orqa = new T.DirectionalLight(0x8fb4ff, .7); orqa.position.set(-5, 3, -6); S.sc.add(orqa);
  const jism = new T.Group(); g.add(jism);
  let shakl = royxat[0], a = 4, b = 3, h = 5, r = 3, qirra = true;
  const sn = (x, k)=>x.toFixed(k).replace('.', ',');
  const mat = new T.MeshPhysicalMaterial({color:0x8a74ff, roughness:.18, metalness:.05, clearcoat:1, clearcoatRoughness:.15, transparent:true, opacity:.42, side:T.FrontSide, depthWrite:false, emissive:0x2a1a7a, emissiveIntensity:.35});
  const ichMat = new T.MeshStandardMaterial({color:0x3b2a9a, roughness:.6, transparent:true, opacity:.35, side:T.BackSide, depthWrite:false});
  const qMat = new T.MeshStandardMaterial({color:0xefeaff, emissive:0xb9a8ff, emissiveIntensity:.55, roughness:.3, metalness:.2});
  const uMat = new T.MeshStandardMaterial({color:0xffd36b, emissive:0xffb020, emissiveIntensity:.9, roughness:.25});
  const naycha = new T.CylinderGeometry(.03, .03, 1, 10, 1); naycha.translate(0, .5, 0);
  const uchG = new T.SphereGeometry(.085, 20, 14);
  const oq = new T.Vector3(0, 1, 0);
  function qirraQosh(p1, p2){
    const d = new T.Vector3().subVectors(p2, p1), L = d.length(); if(L < 1e-4) return;
    const m = new T.Mesh(naycha, qMat); m.position.copy(p1); m.scale.set(1, L, 1); m.quaternion.setFromUnitVectors(oq, d.normalize()); m.userData.rentgenYoq = true; jism.add(m);
  }
  function halqa(rad, y, qalin){ const t = new T.Mesh(new T.TorusGeometry(rad, qalin || .028, 10, 96), qMat); t.rotation.x = Math.PI / 2; t.position.y = y; jism.add(t); }
  function geom(){
    const k = .45;
    if(shakl === 'kub'){ const G = new T.BoxGeometry(a*k, a*k, a*k); G.translate(0, a*k/2, 0); return G; }
    if(shakl === 'parallelepiped'){ const G = new T.BoxGeometry(a*k, h*k, b*k); G.translate(0, h*k/2, 0); return G; }
    if(shakl === 'prizma3'){ const G = new T.CylinderGeometry(a*k/Math.sqrt(3), a*k/Math.sqrt(3), h*k, 3, 1); G.translate(0, h*k/2, 0); return G; }
    if(shakl === 'piramida4'){ const G = new T.ConeGeometry(a*k/Math.SQRT2, h*k, 4, 1); G.rotateY(Math.PI/4); G.translate(0, h*k/2, 0); return G; }
    if(shakl === 'tetraedr'){ const G = new T.TetrahedronGeometry(a*k*Math.sqrt(6)/4); G.rotateX(Math.atan(Math.SQRT2)); G.rotateY(Math.PI/4); G.computeBoundingBox(); G.translate(0, -G.boundingBox.min.y, 0); return G; }
    if(shakl === 'silindr'){ const G = new T.CylinderGeometry(r*k, r*k, h*k, 64, 1); G.translate(0, h*k/2, 0); return G; }
    if(shakl === 'konus'){ const G = new T.ConeGeometry(r*k, h*k, 64, 1); G.translate(0, h*k/2, 0); return G; }
    const G = new T.SphereGeometry(r*k, 64, 40); G.translate(0, r*k, 0); return G;
  }
  function hisob(){
    const P = Math.PI;
    if(shakl === 'kub') return {V:a*a*a, S:6*a*a, U:8, Q:12, Y:6, f:'V = a³ = '+a+'³', fs:'S = 6a²'};
    if(shakl === 'parallelepiped') return {V:a*b*h, S:2*(a*b + a*h + b*h), U:8, Q:12, Y:6, f:'V = a·b·h = '+a+'·'+b+'·'+h, fs:'S = 2(ab + ah + bh)'};
    if(shakl === 'prizma3'){ const asos = Math.sqrt(3)/4*a*a; return {V:asos*h, S:2*asos + 3*a*h, U:6, Q:9, Y:5, f:'V = S_asos·h = (√3/4)a²·h', fs:'S = 2S_asos + 3ah'}; }
    if(shakl === 'piramida4'){ const ap = Math.sqrt(h*h + a*a/4); return {V:a*a*h/3, S:a*a + 2*a*ap, U:5, Q:8, Y:5, f:'V = ⅓·a²·h', fs:'S = a² + 2a·l (l — apofema)'}; }
    if(shakl === 'tetraedr') return {V:a*a*a/(6*Math.SQRT2), S:Math.sqrt(3)*a*a, U:4, Q:6, Y:4, f:'V = a³/(6√2)', fs:'S = √3·a²'};
    if(shakl === 'silindr') return {V:P*r*r*h, S:2*P*r*(r + h), f:'V = πr²h', fs:'S = 2πr(r + h)'};
    if(shakl === 'konus'){ const l = Math.sqrt(r*r + h*h); return {V:P*r*r*h/3, S:P*r*(r + l), f:'V = ⅓πr²h', fs:'S = πr(r + l)'}; }
    return {V:4/3*P*r*r*r, S:4*P*r*r, f:'V = ⁴⁄₃πr³', fs:'S = 4πr²'};
  }
  function qur(){
    while(jism.children.length){ const c = jism.children.pop(); if(c.geometry && c.geometry !== naycha && c.geometry !== uchG) c.geometry.dispose(); }
    const G = geom();
    const ich = new T.Mesh(G, ichMat); ich.userData.rentgenYoq = true; jism.add(ich);
    const m = new T.Mesh(G, mat); m.userData.nom = shakl; jism.add(m);
    G.computeBoundingBox(); const bb = G.boundingBox, en = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z);
    soya.scale.setScalar(Math.max(.5, en * .8 / 1.9 + .2));
    if(qirra && !['silindr','konus','shar'].includes(shakl)){
      const E = new T.EdgesGeometry(G), pos = E.attributes.position, uch = new Map();
      for(let i=0;i<pos.count;i+=2) qirraQosh(new T.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)), new T.Vector3(pos.getX(i+1), pos.getY(i+1), pos.getZ(i+1)));
      for(let i=0;i<pos.count;i++){ const k = [pos.getX(i), pos.getY(i), pos.getZ(i)].map(v=>v.toFixed(3)).join(); if(!uch.has(k)) uch.set(k, [pos.getX(i), pos.getY(i), pos.getZ(i)]); }
      uch.forEach(p=>{ const u = new T.Mesh(uchG, uMat); u.position.set(p[0], p[1], p[2]); jism.add(u); });
      E.dispose();
    } else if(qirra){
      const k = .45, R = r * k, H = h * k;
      if(shakl === 'silindr'){ halqa(R, 0); halqa(R, H); for(let i=0;i<4;i++){ const a2 = i / 4 * Math.PI * 2; qirraQosh(new T.Vector3(Math.cos(a2) * R, 0, Math.sin(a2) * R), new T.Vector3(Math.cos(a2) * R, H, Math.sin(a2) * R)); } }
      if(shakl === 'konus'){ halqa(R, 0); const u = new T.Mesh(uchG, uMat); u.position.set(0, H, 0); jism.add(u); for(let i=0;i<4;i++){ const a2 = i / 4 * Math.PI * 2; qirraQosh(new T.Vector3(Math.cos(a2) * R, 0, Math.sin(a2) * R), new T.Vector3(0, H, 0)); } }
      if(shakl === 'shar'){ halqa(R, R, .022); const mr = new T.Mesh(new T.TorusGeometry(R, .018, 8, 96), qMat); mr.position.y = R; jism.add(mr); const mr2 = mr.clone(); mr2.rotation.y = Math.PI / 2; jism.add(mr2); const mk = new T.Mesh(uchG, uMat); mk.position.set(0, R, 0); jism.add(mk); qirraQosh(new T.Vector3(0, R, 0), new T.Vector3(R, R, 0)); }
    }
  }
  function slayderlar(){
    const aylanish = ['silindr','konus','shar'].includes(shakl);
    const L = (id, nom, v)=>'<label>'+nom+' <input type="range" data-p="'+id+'" min="1" max="10" step="1" value="'+v+'"><b style="min-width:18px">'+v+'</b></label>';
    tag.innerHTML = royxat.map(k=>'<button data-sh="'+k+'" class="'+(k === shakl ? 'faol' : '')+'">'+SHAKL_NOM[k]+'</button>').join('') +
      (aylanish ? L('r','r', r) + (shakl !== 'shar' ? L('h','h', h) : '') : L('a','a', a) + (shakl === 'parallelepiped' ? L('b','b', b) : '') + (['parallelepiped','prizma3','piramida4'].includes(shakl) ? L('h','h', h) : '')) +
      '<button data-q class="'+(qirra ? 'faol' : '')+'">Qirra va uchlar</button>';
    tag.querySelectorAll('[data-sh]').forEach(x=>x.onclick = ()=>S.holat({shakl:x.dataset.sh}));
    tag.querySelectorAll('[data-p]').forEach(x=>x.oninput = ()=>{ const v = +x.value; x.nextSibling.textContent = v; if(x.dataset.p === 'a') a = v; if(x.dataset.p === 'b') b = v; if(x.dataset.p === 'h') h = v; if(x.dataset.p === 'r') r = v; qur(); yangila(); });
    tag.querySelector('[data-q]').onclick = e=>{ qirra = !qirra; e.currentTarget.classList.toggle('faol', qirra); qur(); };
  }
  function yangila(){
    const H = hisob();
    izoh.innerHTML = '<b>'+SHAKL_NOM[shakl]+'.</b> '+(H.U ? 'Uchlar U = '+H.U+', qirralar Q = '+H.Q+', yoqlar Y = '+H.Y+' → U − Q + Y = '+(H.U - H.Q + H.Y)+'. ' : '')+
      H.f+' ≈ <b>'+sn(H.V, H.V % 1 ? 2 : 0)+'</b> kub birlik; '+H.fs+' ≈ <b>'+sn(H.S, H.S % 1 ? 2 : 0)+'</b> kv. birlik.';
    hodisa('geometriya', {shakl, a, b, h, r, V:H.V, S:H.S});
  }
  S.holat = hh=>{ if(hh && hh.shakl && hh.shakl !== shakl){ shakl = hh.shakl; slayderlar(); qur(); } yangila(); };
  S.bosish = d=>hodisa('detal', {turD:'geometriya', nom:d.nom});
  slayderlar(); qur();
  S.joyla(2.9, new T.Vector3(0, 1.05, 0));
  yangila();
  return S;
}

/* ================= 9. YERNING ICHKI TUZILISHI ================= */
function yer3D(sahna, tag, izoh, yorliq){
  yorliq('Geografiya · Yer kesimi · qatlam qalinliklari sxematik');
  const S = M3sahna(sahna, {rx:.45, ry:-.37, avto:false, fov:30, zoom:1.1, env:.35});
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1a1420, .6));
  const kun = new T.DirectionalLight(0xffffff, 1.05); kun.position.set(5, 6, 7); S.sc.add(kun);
  // radiuslar nisbati haqiqiyga yaqin: Yer 6371 km, tashqi yadro chegarasi ~3480, ichki ~1220, mantiya/qobiq ~35 (ko'rinish uchun 3x qalin)
  const R = 3;
  const Q = [
    ['ichki_yadro', 1220/6371*R, 0xfff0a0, 0xffd24a],
    ['tashqi_yadro', 3480/6371*R, 0xffa53a, 0xff7a1a],
    ['quyi_mantiya', 5711/6371*R, 0xd9542b, 0x8a2a14],
    ['yuqori_mantiya', (6371-200)/6371*R, 0xe8703a, 0xb04420],
    ['qobiq', R, 0x6b5a48, 0x3c3226]
  ];
  const kesim = [new T.Plane(new T.Vector3(-1, 0, 0), 0), new T.Plane(new T.Vector3(0, 0, -1), 0)];
  const qism = {};
  Q.forEach(([nom, rad, rang, ichRang], i)=>{
    const tashqi = new T.Mesh(new T.SphereGeometry(rad, 96, 64), new T.MeshStandardMaterial({color:rang, roughness:.7, clippingPlanes:kesim, clipIntersection:true, side:T.FrontSide}));
    tashqi.userData.nom = nom; g.add(tashqi);
    // kesim yuzalari: chorak disklar
    [0, 1].forEach(j=>{
      const disk = new T.Mesh(new T.CircleGeometry(rad, 96, -Math.PI/2, Math.PI), new T.MeshStandardMaterial({color:ichRang, roughness:.85, side:T.DoubleSide, emissive:ichRang, emissiveIntensity:nom.includes('yadro') ? .25 : .05}));
      const siljish = (Q.length - i) * .004;
      if(j === 0){ disk.rotation.y = -Math.PI/2; disk.position.x = siljish; }
      else { disk.position.z = siljish; }
      disk.userData.nom = nom; g.add(disk);
      (qism[nom] = qism[nom] || []).push(disk);
    });
    (qism[nom] = qism[nom] || []).push(tashqi);
  });
  // okean va materiklar (yuza bezagi)
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const x = c.getContext('2d');
  x.fillStyle = '#1f5fa8'; x.fillRect(0, 0, 1024, 512);
  const rnd = (n=>()=>(n = (n*9301 + 49297) % 233280) / 233280)(7);
  x.fillStyle = '#4f8a3a';
  for(let i=0;i<46;i++){ const cx = rnd()*1024, cy = 90 + rnd()*330, rr = 20 + rnd()*70; x.beginPath(); for(let k=0;k<14;k++){ const aa = k/14*Math.PI*2, d = rr*(.6 + rnd()*.6); x.lineTo(cx + Math.cos(aa)*d*1.4, cy + Math.sin(aa)*d); } x.fill(); }
  x.fillStyle = '#e8eef5'; x.fillRect(0, 0, 1024, 34); x.fillRect(0, 478, 1024, 34);
  let yt = new T.CanvasTexture(c);
  if(window.MAKON_YER_TEKSTURA) yt = new T.TextureLoader().load(window.MAKON_YER_TEKSTURA);
  yt.encoding = T.sRGBEncoding; yt.anisotropy = 8;
  const atm = new T.Mesh(new T.SphereGeometry(R*1.035, 64, 48), new T.MeshBasicMaterial({color:0x6fb6ff, transparent:true, opacity:.12, side:T.BackSide, depthWrite:false}));
  g.add(atm);
  const yuza = new T.Mesh(new T.SphereGeometry(R*1.004, 96, 64), new T.MeshStandardMaterial({map:yt, roughness:.8, clippingPlanes:kesim, clipIntersection:true}));
  yuza.userData.nom = 'qobiq'; yuza.material.roughness = .75; g.add(yuza); qism.qobiq.push(yuza);
  S.ren.localClippingEnabled = true;
  // kesish tekisliklari dunyo koordinatasida ishlaydi — Yer aylanganda ular ham aylanishi kerak, aks holda kesim siljiydi
  const asl = kesim.map(p=>p.clone());
  S.kadrda = ()=>{ g.updateMatrixWorld(true); kesim.forEach((p, i)=>p.copy(asl[i]).applyMatrix4(g.matrixWorld)); };
  S.joyla(R*1.2, new T.Vector3(0, 0, 0));
  const NOM = {qobiq:'Yer qobig‘i', yuqori_mantiya:'Yuqori mantiya', quyi_mantiya:'Quyi mantiya', tashqi_yadro:'Tashqi yadro', ichki_yadro:'Ichki yadro'};
  tag.innerHTML = Object.keys(NOM).map(k=>'<button data-q="'+k+'">'+NOM[k]+'</button>').join('');
  tag.querySelectorAll('[data-q]').forEach(b=>b.onclick = ()=>{ S.holat({qatlam:b.dataset.q}); hodisa('detal', {turD:'yer', nom:b.dataset.q}); });
  let tanlangan = null;
  S.holat = h=>{
    if(!h || !h.qatlam) return;
    tanlangan = h.qatlam;
    Object.keys(qism).forEach(k=>qism[k].forEach(m=>{ m.material.transparent = k !== tanlangan; m.material.opacity = k === tanlangan ? 1 : .35; m.material.needsUpdate = true; }));
    tag.querySelectorAll('[data-q]').forEach(b=>b.classList.toggle('faol', b.dataset.q === tanlangan));
    izoh.innerHTML = '<b>'+NOM[tanlangan]+'</b> ajratib ko‘rsatildi. Boshqa qatlamni bosing yoki pastdagi tugmalardan tanlang.';
  };
  S.bosish = d=>{ S.holat({qatlam:d.nom}); hodisa('yer-qatlam', {nom:d.nom}); hodisa('detal', {turD:'yer', nom:d.nom}); };
  izoh.innerHTML = 'Yerning chorak qismi kesib ko‘rsatilgan. Qatlamni bosing — ma’lumot kartasi chiqadi. Radiuslar nisbati haqiqiyga yaqin, qobiq ko‘rinishi uchun qalinroq chizilgan.';
  return S;
}

/* ================= 10. YIL FASLLARI ================= */
function fasllar3D(sahna, tag, izoh, yorliq){
  yorliq('Geografiya · Yil fasllari · masshtab siqilgan · o‘q qiyaligi 23,44°');
  const S = M3sahna(sahna, {rx:.5, ry:0, avto:false, fov:34, zoom:.9, env:.3, rxMin:.05, rxMax:1.3});
  const T = S.T, g = S.g;
  S.sc.add(new T.AmbientLight(0x404a70, .35));
  const nur = new T.PointLight(0xfff2d6, 2.2, 0, 0); g.add(nur);
  const R = window.MAKON_SAYYORA_RASM || {};
  const tl = new T.TextureLoader();
  const qs = new T.Sprite(new T.SpriteMaterial({map:R.quyosh ? tl.load(R.quyosh) : null, color:R.quyosh ? 0xffffff : 0xffcc55, toneMapped:false})); qs.scale.setScalar(2.6); qs.userData.nom = 'quyosh'; g.add(qs);
  const orbR = 7;
  const orb = new T.Mesh(new T.RingGeometry(orbR - .015, orbR + .015, 160), new T.MeshBasicMaterial({color:0x6a79b8, transparent:true, opacity:.5, side:T.DoubleSide})); orb.rotation.x = -Math.PI/2; g.add(orb);
  /* v3.15: yulduzli fon, Quyosh halosi, orbita tekisligi, fasl belgilari (joylashuv burchak() bilan bir xil) */
  S.sc.add(yulduzlar(T, 1400, 90));
  S.sc.add(new T.HemisphereLight(0x9fb6ff, 0x101428, .35));
  g.add(nurHalo(T, '255,200,90', 7.5, .75)); g.add(nurHalo(T, '255,150,40', 12, .25));
  const disk = new T.Mesh(new T.CircleGeometry(orbR, 128), new T.MeshBasicMaterial({color:0x3a4a8a, transparent:true, opacity:.1, side:T.DoubleSide, depthWrite:false})); disk.rotation.x = -Math.PI/2; disk.position.y = -.01; g.add(disk);
  [['yoz','Yoz · 21-iyun', 0], ['kuz','Kuz · 23-sentabr', Math.PI/2], ['qish','Qish · 22-dekabr', Math.PI], ['bahor','Bahor · 21-mart', Math.PI*1.5]].forEach(([k, m, a])=>{
    const xx = Math.cos(a) * orbR, zz = -Math.sin(a) * orbR;
    const nq = new T.Mesh(new T.SphereGeometry(.12, 16, 12), new T.MeshBasicMaterial({color:0xffcb5c})); nq.position.set(xx, 0, zz); g.add(nq);
    const l = matnSprite(T, m, {balandlik:.55, chegara:'rgba(255,203,92,.6)'}); l.position.set(xx * 1.13, 1.55, zz * 1.13); g.add(l);
  });
  // Yer: kunduzi/kechasi ko'rinadigan shar, materik bezagi
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const x = c.getContext('2d');
  x.fillStyle = '#2466b5'; x.fillRect(0, 0, 1024, 512);
  const rnd = (n=>()=>(n = (n*9301 + 49297) % 233280) / 233280)(11);
  x.fillStyle = '#4e8d3c';
  for(let i=0;i<40;i++){ const cx = rnd()*1024, cy = 90 + rnd()*330, rr = 20 + rnd()*65; x.beginPath(); for(let k=0;k<14;k++){ const aa = k/14*Math.PI*2, d = rr*(.6 + rnd()*.6); x.lineTo(cx + Math.cos(aa)*d*1.4, cy + Math.sin(aa)*d); } x.fill(); }
  x.fillStyle = '#f2f6fb'; x.fillRect(0, 0, 1024, 40); x.fillRect(0, 472, 1024, 40);
  x.strokeStyle = 'rgba(255,220,120,.9)'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 256); x.lineTo(1024, 256); x.stroke();
  let yt = new T.CanvasTexture(c);
  if(window.MAKON_YER_TEKSTURA) yt = new T.TextureLoader().load(window.MAKON_YER_TEKSTURA);
  yt.encoding = T.sRGBEncoding; yt.anisotropy = 8;
  const yerQ = new T.Group(); g.add(yerQ);
  const qiya = new T.Group(); qiya.rotation.z = 23.44 * Math.PI / 180; /* shimoliy qutb -x tomonga qiyalgan */ yerQ.add(qiya);
  const yer = new T.Mesh(new T.SphereGeometry(1.05, 64, 40), new T.MeshStandardMaterial({map:yt, roughness:.85})); yer.userData.nom = 'yer'; qiya.add(yer);
  yerQ.add(nurHalo(T, '110,170,255', 3.1, .35));
  const ekv = new T.Mesh(new T.TorusGeometry(1.07, .008, 6, 96), new T.MeshBasicMaterial({color:0xffcb5c, transparent:true, opacity:.7})); ekv.rotation.x = Math.PI/2; qiya.add(ekv);
  const oq = new T.Mesh(new T.CylinderGeometry(.018, .018, 2.6, 8), new T.MeshBasicMaterial({color:0xffffff})); qiya.add(oq);
  const shim = new T.Mesh(new T.ConeGeometry(.06, .16, 12), new T.MeshBasicMaterial({color:0xff6b6b})); shim.position.y = 1.35; qiya.add(shim);
  oq.scale.y = 1.2;
  const FASL = {bahor:[0,'21-mart atrofi · bahorgi kun-tun tengligi'], yoz:[Math.PI/2,'21-iyun atrofi · yozgi quyosh turishi'], kuz:[Math.PI,'23-sentabr atrofi · kuzgi kun-tun tengligi'], qish:[Math.PI*1.5,'22-dekabr atrofi · qishki quyosh turishi']};
  // qutb -x ga qiyalgan: Yer +x da (yoz) bo'lganda shimoliy qutb Quyoshga qaraydi, -x da (qish) — Quyoshdan teskari
  const burchak = f=>({yoz:0, kuz:Math.PI/2, qish:Math.PI, bahor:Math.PI*1.5})[f];
  let joriy = 'yoz', maqsad = burchak('yoz'), holat = maqsad, harakat = false;
  tag.innerHTML = ['bahor','yoz','kuz','qish'].map(f=>'<button data-f="'+f+'" class="'+(f === joriy ? 'faol' : '')+'">'+{bahor:'Bahor',yoz:'Yoz',kuz:'Kuz',qish:'Qish'}[f]+'</button>').join('') + '<button data-h>Yil bo‘yi harakat</button>';
  tag.querySelectorAll('[data-f]').forEach(b=>b.onclick = ()=>S.holat({fasl:b.dataset.f}));
  tag.querySelector('[data-h]').onclick = e=>{ harakat = !harakat; e.currentTarget.classList.toggle('faol', harakat); };
  S.holat = h=>{
    if(!h || !h.fasl) return;
    joriy = h.fasl; maqsad = burchak(joriy); harakat = false;
    tag.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('faol', b.dataset.f === joriy));
    tag.querySelector('[data-h]').classList.remove('faol');
    izoh.innerHTML = '<b>'+{bahor:'Bahor',yoz:'Yoz',kuz:'Kuz',qish:'Qish'}[joriy]+'</b> (shimoliy yarimshar) — '+FASL[joriy][1]+'. Yer o‘qi fazoda bir yo‘nalishda saqlanadi, shuning uchun Quyoshga yarimsharlar navbat bilan ko‘proq qiyalanadi.';
    hodisa('fasl', {fasl:joriy});
  };
  S.bosish = d=>hodisa('detal', {turD:'fasl', nom:d.nom});
  S.aylanish = v=>{ if(v !== undefined) harakat = v; return harakat; };
  S.joyla(9, new T.Vector3(0, 0, 0));
  S.kadrda = dt=>{
    if(harakat){ holat += dt * .35; maqsad = holat; }
    else { let d = maqsad - holat; d = Math.atan2(Math.sin(d), Math.cos(d)); holat += d * .08; }
    yerQ.position.set(Math.cos(holat) * orbR, 0, -Math.sin(holat) * orbR); // shimoldan qaraganda soat miliga teskari
    yer.rotation.y += dt * .8;
  };
  S.holat({fasl:'yoz'});
  return S;
}

/* ================= 11. TARIX XARITASI ================= */
// siyosiy xarita: tarixiy chegaralar historical-basemaps (GPL-3.0, taxminiy), quruqlik/daryolar Natural Earth
const DAVRLAR = [
  {y:'mil. av. 550–330', n:'Ahamoniylar davlati', c:'#c9a227'},
  {y:'mil. av. 329–327', n:'Aleksandr yurishi', c:'#c06a1e'},
  {y:'819/875–999', n:'Somoniylar davlati', c:'#0d9488'},
  {y:'1370–1405', n:'Amir Temur davlati', c:'#6f66ff'},
  {y:'XVI asr – 1920', n:'Uch xonlik', c:'#a855f7'},
  {y:'1867–1917', n:'Turkiston general-gubernatorligi', c:'#94a3b8'},
  {y:'1924–1991', n:'O‘zbekiston SSR', c:'#e0483c'},
  {y:'1991 —', n:'Mustaqil O‘zbekiston', c:'#2fd0bd'}
];
const XARITA_FOKUS = ['#b8862b','#b4562a','#1f8a7a','#5b4fc4','#8e4bb8','#6d7f9e','#b8322b','#1d9a86'];
const XARITA_PALITRA = ['#a3587f','#b98aa6','#8d3f63','#b3747a','#b39443','#86698a','#c7a55c','#7e8d4f','#a0603f','#6f82a6','#c07c5a','#8a5b7c'];
const XARITA_IZOH = [
  'Shimoliy chegara (Sirdaryo bo‘yi) tadqiqotchilar orasida bahsli.',
  'Aleksandr imperiyasining mil. av. 323-yildagi hududi ko‘rsatilgan.',
  'Manba xaritasida Shosh (Toshkent) chegarasi aniq emas.',
  'Xaritada 1400-yil holati: Oltin O‘rda va Mo‘g‘uliston — Temur davlati qo‘shnilari.',
  'Manba xaritasi Buxoro, Xiva va Qo‘qonni ajratmaydi — uch xonlik bitta hudud bo‘lib ko‘rsatilgan (1800-yil holati).',
  'Buxoro amirligi va Xiva xonligi (Rossiya protektoratlari) alohida chizilmagan (1914-yil holati).',
  'Rang bilan butun SSSR ko‘rsatilgan; oq uzuq chiziq — O‘zbekistonning hozirgi chegarasi (1924–1936-yillarda chegara boshqacha bo‘lgan).',
  ''
];
const SHAHARLAR = [['toshkent','Toshkent',69.24,41.31],['samarqand','Samarqand',66.96,39.65],['buxoro','Buxoro',64.42,39.77],['xiva','Xiva',60.36,41.38]];
function xarita3D(sahna, tag, izoh, yorliq){
  const xar = window._sahnalar;
  const eski = xar && xar.get(sahna); if(eski) eski.yopish();
  yorliq('Tarix · siyosiy xarita · chegaralar taxminiy');
  const X = window.MAKON_TARIX_XARITA;
  const quti = document.createElement('div'); quti.className = 'xarita2d siyosiy';
  if(!X){ quti.innerHTML = '<div class="x2-xato">Xarita ma’lumoti yuklanmadi</div>'; sahna.append(quti); return {idish:sahna, holat(){}, qotir(){}, zoomla(){}, tikla(){}, yopish(){ quti.remove(); }}; }
  const W = X.W, H = X.H;
  const px = (lon, lat)=>[(lon - X.L0) * X.cos * X.K, (X.B1 - lat) * X.K];
  const JOY = [['KASPIY DENGIZI', 50.9, 41.6, -72], ['Orol', 59.9, 45.0, 0], ['Balxash', 74.6, 46.6, 0], ['FORS QO‘LTIG‘I', 51.2, 28.2, -35]];
  const esc = t=>String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  quti.innerHTML = `
    <svg class="x2-svg" viewBox="-30 -40 ${W + 60} ${H + 170}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="x2quruq"><path d="${X.quruqlik}"/></clipPath>
      </defs>
      <g class="x2-kamera">
        <rect class="x2-dengiz" x="-600" y="-600" width="${W + 1200}" height="${H + 1200}"/>
        <path class="x2-quruq" d="${X.quruqlik}"/>
        <g class="x2-davlatlar" clip-path="url(#x2quruq)"></g>
        <path class="x2-kol" id="x2kol" d=""/>
        <path class="x2-daryo" d="${X.daryolar}"/>
        <path class="x2-uzb" id="x2uzb" d="${X.ozbekiston}"/>
        <g class="x2-yozuv"></g>
        <g class="x2-joy">${JOY.map(([n, lo, la, r])=>{ const [x, y] = px(lo, la); return '<text transform="translate('+x.toFixed(0)+','+y.toFixed(0)+') rotate('+r+')">'+n+'</text>'; }).join('')}</g>
        <g class="x2-shahar">${SHAHARLAR.map(([k, n, lo, la])=>{ const [x, y] = px(lo, la); return '<g class="shahar" data-k="'+k+'" transform="translate('+x.toFixed(1)+','+y.toFixed(1)+')"><circle r="7"/><circle r="2.6" class="nuqta"/><text x="11" y="-9">'+n+'</text></g>'; }).join('')}</g>
      </g>
    </svg>
    <div class="x2-karta shisha"><span class="ustki" id="x2y"></span><b id="x2n"></b><small id="x2s">Davlatni yoki shaharni bosing</small></div>
    <div class="x2-shkala shisha">${DAVRLAR.map((d, i)=>'<button data-d="'+i+'" style="--r:'+XARITA_FOKUS[i]+'"><i></i><b>'+d.y+'</b><span>'+d.n+'</span></button>').join('')}</div>
    <div class="x2-manba">Chegaralar taxminiy: historical-basemaps (GPL-3.0) · Natural Earth</div>`;
  sahna.append(quti);
  const svg = quti.querySelector('svg'), kamera = quti.querySelector('.x2-kamera');
  const gD = quti.querySelector('.x2-davlatlar'), gY = quti.querySelector('.x2-yozuv');
  let joriy = 3, zoom = 1, ox = 0, oy = 0, ft = [];
  const qolla = ()=>{ kamera.setAttribute('transform', 'translate('+ox+','+oy+') scale('+zoom+')'); quti.style.setProperty('--z', zoom); };
  function chiz(){
    const dv = X.davrlar[joriy] || {xususiyatlar:[]};
    let j = 0;
    ft = dv.xususiyatlar.filter(f=>f.nom);
    gD.innerHTML = ft.map((f, i)=>{
      const r = f.fokus ? XARITA_FOKUS[joriy] : XARITA_PALITRA[(j++ * 5 + joriy) % XARITA_PALITRA.length];
      return '<path class="davlat'+(f.fokus ? ' fokus' : '')+'" data-i="'+i+'" d="'+f.yol+'" style="fill:'+r+'"/>';
    }).join('');
    gY.innerHTML = ft.map((f, i)=>{
      if(!f.m) return '';
      const [x, y, burchak, uzun, n] = f.m, nom = f.nom.toUpperCase();
      if(!f.fokus && n < 30) return '';
      const soz = nom.split(' ');
      const qatorlar = soz.length > 1 && nom.length > 14 ? [soz.slice(0, Math.ceil(soz.length/2)).join(' '), soz.slice(Math.ceil(soz.length/2)).join(' ')] : [nom];
      const eng = Math.max(...qatorlar.map(q=>q.length));
      let o = Math.max(11, Math.min(f.fokus ? 32 : 22, uzun / (eng * .78), Math.sqrt(n) * (f.fokus ? 1.6 : 3.2)));
      return '<text class="'+(f.fokus ? 'fokus' : '')+'" style="font-size:'+o.toFixed(1)+'px" transform="translate('+x+','+y+') rotate('+burchak+')">'+qatorlar.map((q, k)=>'<tspan x="0" dy="'+(k ? '1.05em' : (qatorlar.length > 1 ? '-.18em' : '.35em'))+'">'+esc(q)+'</tspan>').join('')+'</text>';
    }).join('');
    quti.querySelector('#x2kol').setAttribute('d', joriy >= 7 ? X.kollar : X.kollar_tarixiy + X.kollar);
    quti.querySelector('#x2uzb').classList.toggle('kor', joriy === 6);
    gD.querySelectorAll('.davlat').forEach(el=>el.onclick = ()=>{ if(!surildi) davlatBos(+el.dataset.i); });
    gD.classList.remove('yangi'); requestAnimationFrame(()=>gD.classList.add('yangi'));
  }
  function davlatBos(i){
    const f = ft[i]; if(!f) return;
    gD.querySelectorAll('.davlat').forEach(el=>el.classList.toggle('tanlangan', +el.dataset.i === i));
    if(f.fokus){ quti.querySelector('#x2s').textContent = 'Asosiy davlat · batafsil kartani o‘qing'; hodisa('detal', {turD:'davr', nom:String(joriy)}); }
    else quti.querySelector('#x2s').textContent = 'Qo‘shni davlat: ' + f.nom;
  }
  function hudud(){
    quti.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('faol', +b.dataset.d === joriy));
    const d = DAVRLAR[joriy];
    quti.querySelector('#x2y').textContent = d.y; quti.querySelector('#x2n').textContent = d.n;
    quti.querySelector('#x2s').textContent = 'Davlatni yoki shaharni bosing';
    quti.querySelector('.x2-karta').style.setProperty('--r', XARITA_FOKUS[joriy]);
    chiz();
    izoh.innerHTML = '<b>'+d.n+'</b> · '+d.y+'. Har bir davlat o‘z rangida, asosiy davlat qalin chegara bilan ajratilgan. '+(XARITA_IZOH[joriy] || '')+' Chegaralar taxminiy — darslik xaritasi bilan solishtiring.';
    hodisa('davr', {i:joriy, nom:d.n});
  }
  quti.querySelectorAll('[data-d]').forEach(b=>b.onclick = ()=>{ joriy = +b.dataset.d; hudud(); });
  quti.querySelectorAll('.shahar').forEach(g2=>g2.onclick = e=>{ e.stopPropagation(); hodisa('shahar', {nom:g2.dataset.k}); hodisa('detal', {turD:'shahar', nom:g2.dataset.k}); });
  // yaqinlashtirish va surish (5 px dan kam siljish — bosish hisoblanadi)
  let bos = null, surildi = false;
  svg.addEventListener('pointerdown', e=>{ if(e.target.closest('.shahar')) return; bos = {x:e.clientX, y:e.clientY, ox, oy}; surildi = false; });
  svg.addEventListener('pointermove', e=>{
    if(!bos) return;
    const dx = e.clientX - bos.x, dy = e.clientY - bos.y;
    if(!surildi && Math.hypot(dx, dy) < 5) return;
    if(!surildi){ surildi = true; try{ svg.setPointerCapture(e.pointerId); }catch(er){} }
    const r = svg.getBoundingClientRect(), k = Math.max((W + 60) / r.width, (H + 170) / r.height);
    ox = bos.ox + dx * k; oy = bos.oy + dy * k; qolla();
  });
  ['pointerup','pointercancel'].forEach(t=>svg.addEventListener(t, ()=>{ bos = null; setTimeout(()=>{ surildi = false; }, 0); }));
  svg.addEventListener('wheel', e=>{ e.preventDefault(); api.zoomla(e.deltaY > 0 ? 1.15 : 1/1.15); }, {passive:false});
  tag.innerHTML = '';
  const api = {
    idish:sahna,
    zoomla(k){ const z = Math.max(1, Math.min(5, zoom / k)); const cx = W/2, cy = H/2 + 45; ox = cx - (cx - ox) * z / zoom; oy = cy - (cy - oy) * z / zoom; zoom = z; if(zoom === 1){ ox = 0; oy = 0; } qolla(); },
    tikla(){ zoom = 1; ox = 0; oy = 0; qolla(); },
    holat(h){ if(h && h.davr !== undefined && h.davr !== null && DAVRLAR[+h.davr]){ joriy = +h.davr; hudud(); } },
    qotir(){},
    yopish(){ if(quti.parentNode) quti.remove(); if(xar) xar.delete(sahna); }
  };
  if(xar) xar.set(sahna, api);
  hudud(); qolla();
  return api;
}

/* ================= 12. PIANINO ================= */
const NOTA_NOM = ['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'];
function piano3D(sahna, tag, izoh, yorliq){
  yorliq('Musiqa · 2 oktava · tovush brauzerda sintez qilinadi');
  const S = M3sahna(sahna, {rx:.62, ry:0, avto:false, fov:30, zoom:.72, rxMin:.2, rxMax:1.2, ryMin:-.8, ryMax:.8, env:.7});
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1a1420, .6));
  const kun = new T.DirectionalLight(0xffffff, 1.1); kun.position.set(2, 8, 6); S.sc.add(kun);
  const korpus = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(15.4, .9, 5.6, 4, .2) : new T.BoxGeometry(15.4,.9,5.6), new T.MeshPhysicalMaterial({color:0x0c0d12, roughness:.25, clearcoat:1, clearcoatRoughness:.1}));
  korpus.position.set(0, -.2, -.4); g.add(korpus);
  const qopqoq = new T.Mesh(new T.BoxGeometry(15.4, 1.6, .5), new T.MeshPhysicalMaterial({color:0x0c0d12, roughness:.25, clearcoat:1})); qopqoq.position.set(0, .8, -3); g.add(qopqoq);
  const qizil = new T.Mesh(new T.BoxGeometry(14.6, .06, .12), new T.MeshStandardMaterial({color:0x8a1c2c, roughness:.9})); qizil.position.set(0, .28, -2.12); g.add(qizil);
  const klav = [];
  let oqI = 0; const oqKeng = .64, bosh = -(14 * oqKeng) / 2 + oqKeng/2;
  for(let okt = 4; okt <= 5; okt++){
    for(let n = 0; n < 12; n++){
      const qora = [1,3,6,8,10].includes(n);
      const midi = 12 * (okt + 1) + n, chastota = 440 * Math.pow(2, (midi - 69) / 12);
      let m;
      if(!qora){
        m = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(oqKeng - .05, .36, 3.6, 2, .04) : new T.BoxGeometry(oqKeng - .05, .36, 3.6), new T.MeshPhysicalMaterial({color:0xf6f3ea, roughness:.35, clearcoat:.6}));
        m.position.set(bosh + oqI * oqKeng, .3, 0); m.userData.asl = .3; oqI++;
      } else {
        m = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.38, .42, 2.2, 2, .04) : new T.BoxGeometry(.38,.42,2.2), new T.MeshPhysicalMaterial({color:0x15161c, roughness:.3, clearcoat:.8}));
        m.position.set(bosh + (oqI - .5) * oqKeng, .56, -.7); m.userData.asl = .56;
      }
      m.userData.nom = 'k'+klav.length;
      g.add(m);
      klav.push({m, nom:NOTA_NOM[n], okt, qora, chastota, raqam:midi - 20, bosildi:0});
    }
  }
  // yorliqlar oq klavishlarda
  klav.filter(k=>!k.qora).forEach(k=>{
    const t = yozuvTekstura(T, k.nom + (k.nom === 'Do' ? k.okt : ''), {w:160, h:80, fon:'#f6f3ea', rang:'#5b3dff', shrift:'700 44px "IBM Plex Mono", monospace'});
    const p = new T.Mesh(new T.PlaneGeometry(.5, .25), new T.MeshBasicMaterial({map:t, toneMapped:false}));
    p.rotation.x = -Math.PI/2; p.position.set(k.m.position.x, .49, 1.45); g.add(p);
  });
  let audio = null;
  function chal(k, uzun){
    try{
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), o2 = audio.createOscillator(), gg = audio.createGain();
      o.type = 'triangle'; o2.type = 'sine'; o.frequency.value = k.chastota; o2.frequency.value = k.chastota * 2;
      const g2 = audio.createGain(); g2.gain.value = .25; o2.connect(g2); g2.connect(gg);
      gg.gain.setValueAtTime(.0001, audio.currentTime); gg.gain.exponentialRampToValueAtTime(.35, audio.currentTime + .01); gg.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + (uzun || 1.2));
      o.connect(gg); gg.connect(audio.destination); o.start(); o2.start(); o.stop(audio.currentTime + (uzun || 1.2) + .05); o2.stop(audio.currentTime + (uzun || 1.2) + .05);
    }catch(e){}
    k.bosildi = 1;
    k.m.material.emissive = k.m.material.emissive || new T.Color(); k.m.material.emissive.setHex(0x5b3dff); k.m.material.emissiveIntensity = .5;
    izoh.innerHTML = '<b>'+k.nom+k.okt+'</b> — chastota <b>'+k.chastota.toFixed(2).replace('.', ',')+' Hz</b>'+(k.qora ? ' (qora klavish — yarim ton)' : '')+'. f = 440·2<sup>(n−49)/12</sup>, bu yerda n = '+k.raqam+' — pianino klavishi raqami (La4: n = 49, 440 Hz).';
    hodisa('nota', {nom:k.nom, oktava:k.okt, chastota:+k.chastota.toFixed(2), qora:k.qora});
  }
  const kutib = (ketma, oraliq)=>ketma.forEach((k, i)=>setTimeout(()=>chal(k, .55), i * oraliq));
  const top = (nom, okt)=>klav.find(k=>k.nom === nom && k.okt === okt);
  // Kuylar (mualliflik huquqi muddati tugagan klassik va xalq kuylari; soddalashtirilgan bir ovozli variant)
  const KUY = {
    shodlik:['Shodlik qasidasi — L. van Betxoven (9-simfoniya, 1824)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:.5 D4:2 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:1.5 C4:.5 C4:2'],
    twinkle:['«Ah, vous dirai-je, maman» — fransuz xalq kuyi (XVIII asr; «Twinkle, Twinkle»)', 'C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2 G4 G4 F4 F4 E4 E4 D4:2 G4 G4 F4 F4 E4 E4 D4:2 C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2'],
    elize:['«Elizaga» — L. van Betxoven (1810), boshlanishi', 'E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1 -:.5 C4:.5 E4:.5 A4:.5 B4:1 -:.5 E4:.5 G#4:.5 B4:.5 C5:1 -:.5 E4:.5 E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1 -:.5 C4:.5 E4:.5 A4:.5 B4:1 -:.5 E4:.5 C5:.5 B4:.5 A4:2'],
    menuet:['Menuet sol-majorda — K. Petsold (J. S. Baxning «Anna Magdalena daftari», 1725)', 'D5 G4:.5 A4:.5 B4:.5 C5:.5 D5 G4 G4 E5 C5:.5 D5:.5 E5:.5 F#5:.5 G5 G4 G4 C5 D5:.5 C5:.5 B4:.5 A4:.5 B4 C5:.5 B4:.5 A4:.5 G4:.5 F#4 G4:.5 A4:.5 B4:.5 G4:.5 A4:3'],
    jingle:['«Jingle Bells» — J. Pierpont (1857), naqarot', 'E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:.5 E4:4 F4 F4 F4:1.5 F4:.5 F4 E4 E4 E4:.5 E4:.5 E4 D4 D4 E4 D4:2 G4:2']
  };
  const HARF = {C:'Do', D:'Re', E:'Mi', F:'Fa', G:'Sol', A:'La', B:'Si'};
  let kuyTaymer = [];
  const kuyTox = ()=>{ kuyTaymer.forEach(clearTimeout); kuyTaymer = []; tag.querySelectorAll('[data-kuy]').forEach(b=>b.classList.remove('faol')); };
  function kuyChal(kalit, tugma){
    kuyTox(); if(tugma) tugma.classList.add('faol');
    const hissa = .42; let vaqt = 0;
    KUY[kalit][1].split(' ').forEach(tok=>{
      const [nota, uz] = tok.split(':'); const d = uz ? +uz : 1;
      if(nota !== '-'){
        const m = /^([A-G])(#?)(\d)$/.exec(nota);
        if(m){ const k = top(HARF[m[1]] + m[2], +m[3]); if(k) kuyTaymer.push(setTimeout(()=>chal(k, Math.max(.25, d * hissa * .95)), vaqt * 1000)); }
      }
      vaqt += d * hissa;
    });
    kuyTaymer.push(setTimeout(()=>{ if(tugma) tugma.classList.remove('faol'); }, vaqt * 1000 + 200));
    izoh.innerHTML = '<b>'+KUY[kalit][0]+'.</b> Klavishlar kuy bo‘yicha bosiladi — notalarni kuzating.';
    hodisa('kuy', {nom:kalit});
  }
  tag.innerHTML = '<button data-g>Do-major gammasi</button><button data-a>Do-major akkordi</button><span class="tag-ajr"></span>' +
    Object.keys(KUY).map(k=>'<button data-kuy="'+k+'">♪ '+KUY[k][0].split(' — ')[0].replace(/[«»]/g, '')+'</button>').join('') + '<button data-tox>■ To‘xtatish</button>';
  tag.querySelectorAll('[data-kuy]').forEach(b=>b.onclick = ()=>kuyChal(b.dataset.kuy, b));
  tag.querySelector('[data-tox]').onclick = kuyTox;
  const eskiYop = S.yopish; S.yopish = ()=>{ kuyTox(); eskiYop(); };
  tag.querySelector('[data-g]').onclick = ()=>kuyTox() || kutib(['Do','Re','Mi','Fa','Sol','La','Si'].map(n=>top(n, 4)).concat([top('Do', 5)]), 380);
  tag.querySelector('[data-a]').onclick = ()=>{ ['Do','Mi','Sol'].forEach(n=>chal(top(n, 4), 1.6)); };
  S.bosish = d=>{ const k = klav[+d.nom.slice(1)]; if(k){ chal(k); hodisa('detal', {turD:'nota', nom:k.nom.replace('#','').toLowerCase()}); } };
  S.holat = h=>{ if(h && h.nota){ const mm = /^([A-Za-z#]+)(\d)$/.exec(h.nota); if(mm){ const k = top(mm[1], +mm[2]); if(k){ k.bosildi = 1.6; k.m.material.emissive = k.m.material.emissive || new T.Color(); k.m.material.emissive.setHex(0xffcb5c); k.m.material.emissiveIntensity = .6; izoh.innerHTML = '<b>'+h.nota+'</b> — '+k.chastota.toFixed(2).replace('.', ',')+' Hz. Klavishni bosib eshiting.'; } } } };
  izoh.innerHTML = 'Klavishni bosing — nota chalinadi va chastotasi ko‘rsatiladi. La4 = 440 Hz; har oktavada chastota 2 marta ortadi.';
  S.joyla(6.2, new T.Vector3(0, .2, 0));
  S.kadrda = dt=>{
    klav.forEach(k=>{
      const past = k.bosildi > 0 ? .12 : 0;
      k.m.position.y += ((k.m.userData.asl - past) - k.m.position.y) * .35;
      if(k.bosildi > 0){ k.bosildi -= dt * 1.6; if(k.bosildi <= 0 && k.m.material.emissive) k.m.material.emissive.setHex(0); }
    });
  };
  return S;
}

/* ================= 13. OY FAZALARI ================= */
const FAZALAR = [['yangi','Yangi oy'],['osuvchi_orak','O‘suvchi o‘roq'],['birinchi_chorak','Birinchi chorak'],['osuvchi_qavariq','O‘suvchi qavariq oy'],['tolin','To‘lin oy'],['kamayuvchi_qavariq','Kamayuvchi qavariq oy'],['oxirgi_chorak','Oxirgi chorak'],['kamayuvchi_orak','Kamayuvchi o‘roq']];
function oy3D(sahna, tag, izoh, yorliq){
  yorliq('Astronomiya · Oy fazalari · masshtab siqilgan');
  const S = M3sahna(sahna, {rx:1.05, ry:0, avto:false, fov:34, zoom:1.05, env:.12, rxMin:.2, rxMax:1.4});
  const T = S.T, g = S.g;
  S.sc.add(new T.AmbientLight(0x303a60, .25));
  const kun = new T.DirectionalLight(0xfff4e0, 1.6); kun.position.set(-20, 0, 0); S.sc.add(kun);
  // quyosh nuri yo'nalishi (chapdan)
  const R = window.MAKON_SAYYORA_RASM || {};
  const tl = new T.TextureLoader();
  const nurlar = new T.Group(); g.add(nurlar);
  for(let i=-3;i<=3;i++){ const l = new T.ArrowHelper(new T.Vector3(1,0,0), new T.Vector3(-8.5, 0, i*1.2), 1.6, 0xffcb5c, .3, .18); nurlar.add(l); }
  const yerT = R.yer ? tl.load(R.yer) : null; if(yerT) yerT.encoding = T.sRGBEncoding;
  const yer = new T.Sprite(new T.SpriteMaterial({map:yerT, color:yerT ? 0xffffff : 0x3a78c8, toneMapped:false}));
  yer.scale.setScalar(1.9); yer.userData.nom = 'yer'; g.add(yer);
  const orb = new T.Mesh(new T.RingGeometry(4 - .012, 4 + .012, 160), new T.MeshBasicMaterial({color:0x6a79b8, transparent:true, opacity:.5, side:T.DoubleSide})); orb.rotation.x = -Math.PI/2; g.add(orb);
  /* v3.15: protsedurali krater teksturasi, yulduzli fon, Quyosh tomonda nur halosi */
  const kc = document.createElement('canvas'); kc.width = 512; kc.height = 256; const kx = kc.getContext('2d');
  kx.fillStyle = '#bdb8ae'; kx.fillRect(0, 0, 512, 256);
  const kr = (n=>()=>(n = (n * 9301 + 49297) % 233280) / 233280)(5);
  for(let i = 0; i < 9; i++){ kx.fillStyle = 'rgba(80,78,74,' + (.25 + kr() * .25) + ')'; kx.beginPath(); kx.ellipse(kr() * 512, 40 + kr() * 176, 30 + kr() * 60, 18 + kr() * 40, 0, 0, Math.PI * 2); kx.fill(); }
  for(let i = 0; i < 220; i++){ const x0 = kr() * 512, y0 = kr() * 256, rr = 1.5 + Math.pow(kr(), 3) * 16; kx.fillStyle = 'rgba(60,58,55,.35)'; kx.beginPath(); kx.arc(x0, y0, rr, 0, Math.PI * 2); kx.fill(); kx.strokeStyle = 'rgba(235,232,225,.35)'; kx.lineWidth = 1; kx.beginPath(); kx.arc(x0 - rr * .15, y0 - rr * .15, rr, Math.PI * .9, Math.PI * 1.7); kx.stroke(); }
  const kt = new T.CanvasTexture(kc); kt.encoding = T.sRGBEncoding;
  const oyMat = new T.MeshStandardMaterial({map:kt, color:0xffffff, roughness:.95});
  S.sc.add(yulduzlar(T, 1200, 80));
  const qHalo = nurHalo(T, '255,210,120', 9, .55); qHalo.position.set(-11, 0, 0); g.add(qHalo);
  const yHalo = nurHalo(T, '110,170,255', 3.2, .35); g.add(yHalo);
  const qYozuv = matnSprite(T, 'Quyosh nuri →', {balandlik:.5, rang:'#ffd98a', chegara:'rgba(255,203,92,.5)'}); qYozuv.position.set(-8, 1.1, -4.4); g.add(qYozuv);
  const oy = new T.Mesh(new T.SphereGeometry(.42, 48, 32), oyMat); oy.userData.nom = 'oy'; g.add(oy);
  const holatlar = FAZALAR.map((f, i)=>{ const a = Math.PI - i * Math.PI / 4; const m = new T.Mesh(new T.SphereGeometry(.07, 12, 8), new T.MeshBasicMaterial({color:0x9aa3c7})); m.position.set(Math.cos(a) * 4, 0, Math.sin(a) * 4); m.userData.nom = f[0]; g.add(m); return {a, m}; });
  // Yerdan ko'rinish oynasi (canvas)
  const kor = document.createElement('div'); kor.className = 'oy-korinish shisha';
  kor.innerHTML = '<span class="ustki">Yerdan ko‘rinishi</span><canvas width="180" height="180"></canvas><b></b>'; sahna.append(kor);
  const cx = kor.querySelector('canvas').getContext('2d');
  function fazaChiz(t){ // t: 0 yangi .. 0.5 to'lin .. 1
    const r = 76, c = 90;
    cx.clearRect(0, 0, 180, 180);
    cx.fillStyle = '#1b1f33'; cx.beginPath(); cx.arc(c, c, r, 0, Math.PI*2); cx.fill();
    const yoritil = (1 - Math.cos(t * Math.PI * 2)) / 2;
    const ong = t < .5;
    cx.fillStyle = '#e9e4d6';
    cx.beginPath();
    cx.arc(c, c, r, -Math.PI/2, Math.PI/2, !ong);
    const k = Math.cos(t * Math.PI * 2);
    cx.ellipse(c, c, Math.abs(k) * r, r, 0, Math.PI/2, -Math.PI/2, (ong ? k > 0 : k < 0) ? true : false);
    cx.fill();
    kor.querySelector('b').textContent = Math.round(yoritil * 100) + '% yoritilgan';
  }
  let joriy = 0, burchak = Math.PI, harakat = false;
  tag.innerHTML = FAZALAR.map((f, i)=>'<button data-f="'+i+'">'+f[1]+'</button>').join('') + '<button data-h>Oy bo‘yi harakat</button>';
  tag.querySelectorAll('[data-f]').forEach(b=>b.onclick = ()=>S.holat({faza:FAZALAR[+b.dataset.f][0]}));
  tag.querySelector('[data-h]').onclick = e=>{ harakat = !harakat; e.currentTarget.classList.toggle('faol', harakat); };
  S.holat = h=>{
    if(!h || !h.faza) return;
    const i = FAZALAR.findIndex(f=>f[0] === h.faza); if(i < 0) return;
    joriy = i; harakat = false; tag.querySelector('[data-h]').classList.remove('faol');
    tag.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('faol', +b.dataset.f === i));
    izoh.innerHTML = '<b>'+FAZALAR[i][1]+'.</b> Quyosh nuri chapdan tushadi; Oyning yarmi doim yoritilgan, lekin Yerdan uning yoritilgan qismi turli ulushda ko‘rinadi.';
    hodisa('oy-faza', {faza:h.faza});
  };
  S.bosish = d=>{ const f = FAZALAR.find(x=>x[0] === d.nom); if(f){ S.holat({faza:f[0]}); } hodisa('detal', {turD:'oy', nom:d.nom}); };
  S.aylanish = v=>{ if(v !== undefined) harakat = v; return harakat; };
  S.joyla(5.4, new T.Vector3(0, 0, 0));
  S.kadrda = dt=>{
    let maqsad;
    if(harakat) burchak -= dt * .35;
    else { maqsad = holatlar[joriy].a; let d = maqsad - burchak; d = Math.atan2(Math.sin(d), Math.cos(d)); burchak += Math.abs(d) < .002 ? d : d * .18; }
    oy.position.set(Math.cos(burchak) * 4, 0, Math.sin(burchak) * 4);
    oy.rotation.y = 0;
    // faza parametri: Oy Quyosh tomonda (burchak = PI) → yangi (0); qarama-qarshi (0) → to'lin (.5)
    let t = ((Math.PI - burchak) / (Math.PI * 2)) % 1; if(t < 0) t += 1;
    fazaChiz(t);
  };
  S.holat({faza:'yangi'});
  return S;
}

/* ================= 14. OPTIKA: SINISH ================= */
const MUHIT = {suv:[1.33,'Suv',0x3a8dde], shisha:[1.5,'Shisha',0x9fd8ff], olmos:[2.42,'Olmos',0xe6f4ff]};
function optika3D(sahna, tag, izoh, yorliq){
  yorliq('Fizika · yorug‘likning sinishi · Snellius qonuni');
  const S = M3sahna(sahna, {rx:.16, ry:.38, avto:false, fov:30, zoom:.8, rxMin:-.5, rxMax:.6, ryMin:-.9, ryMax:.9, env:.6});
  const T = S.T, g = S.g;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1a1420, .6));
  const kun = new T.DirectionalLight(0xffffff, .8); kun.position.set(3, 6, 8); S.sc.add(kun);
  const blokMat = new T.MeshPhysicalMaterial({color:0x9fd8ff, roughness:.05, transmission:.85, transparent:true, opacity:.35, clearcoat:1, side:T.DoubleSide, depthWrite:false});
  const blok = new T.Mesh(new T.BoxGeometry(12, 4, 2), blokMat); blok.position.y = -2; blok.userData.nom = 'shisha'; g.add(blok);
  const havo = new T.Mesh(new T.BoxGeometry(12, 4, 2), new T.MeshBasicMaterial({color:0x0f1633, transparent:true, opacity:.12, depthWrite:false})); havo.position.y = 2; havo.userData.nom = 'havo'; g.add(havo);
  /* v3.15: 3D chuqurlik — blok qirralari, nurli chegara, stol, muhit yozuvlari, burchak yozuvlari */
  const qirraM = new T.LineBasicMaterial({color:0xbfe6ff, transparent:true, opacity:.55});
  const blokQ = new T.LineSegments(new T.EdgesGeometry(blok.geometry), qirraM); blokQ.position.copy(blok.position); g.add(blokQ);
  const chegara = new T.Mesh(new T.BoxGeometry(12, .025, 2), new T.MeshBasicMaterial({color:0x9fe8ff, transparent:true, opacity:.8, toneMapped:false})); g.add(chegara);
  const stol = new T.Mesh(new T.BoxGeometry(13, .3, 3), new T.MeshStandardMaterial({color:0x1a2035, roughness:.6, metalness:.3})); stol.position.y = -4.16; g.add(stol);
  const nuqtaHalo = nurHalo(T, '255,90,90', 1.1, .8); g.add(nuqtaHalo);
  let yozuvlar = [];
  const yozuvQosh = (m, x, y, o)=>{ const sp = matnSprite(T, m, Object.assign({balandlik:.42}, o)); sp.position.set(x, y, 1.05); g.add(sp); yozuvlar.push(sp); };
  const normal = new T.Mesh(new T.CylinderGeometry(.015, .015, 8, 6), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.5})); normal.userData.nom = 'normal'; g.add(normal);
  const nurMat = new T.MeshBasicMaterial({color:0xff3b3b, toneMapped:false});
  const nurHaloM = new T.MeshBasicMaterial({color:0xff6b6b, transparent:true, opacity:.25, blending:T.AdditiveBlending, depthWrite:false, toneMapped:false});
  const nurG = new T.Group(); g.add(nurG);
  const lazer = new T.Mesh(new T.CylinderGeometry(.14, .14, .9, 20), new T.MeshStandardMaterial({color:0x2a2f3d, metalness:.6, roughness:.3})); lazer.userData.nom = 'lazer'; g.add(lazer);
  const yoy1 = new T.Mesh(new T.RingGeometry(.9, .95, 48, 1, 0, 1), new T.MeshBasicMaterial({color:0xffcb5c, side:T.DoubleSide})); g.add(yoy1);
  const yoy2 = new T.Mesh(new T.RingGeometry(1.2, 1.25, 48, 1, 0, 1), new T.MeshBasicMaterial({color:0x19c7b5, side:T.DoubleSide})); g.add(yoy2);
  function nur(a, b){
    const d = new T.Vector3().subVectors(b, a), uz = d.length();
    [[.045, nurMat], [.14, nurHaloM]].forEach(([r, m])=>{ const c = new T.Mesh(new T.CylinderGeometry(r, r, uz, 10), m); c.position.copy(a).addScaledVector(d, .5); c.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), d.clone().normalize()); nurG.add(c); });
  }
  let muhit = 'shisha', yon = 'havodan', a1 = 40;
  const sn = x=>x.toFixed(1).replace('.', ',');
  function yangila(){
    while(nurG.children.length){ const c = nurG.children.pop(); c.geometry.dispose(); }
    yozuvlar.forEach(sp=>{ g.remove(sp); sp.material.map.dispose(); sp.material.dispose(); }); yozuvlar = [];
    const n = MUHIT[muhit][0], n1 = yon === 'havodan' ? 1 : n, n2 = yon === 'havodan' ? n : 1;
    blokMat.color.setHex(MUHIT[muhit][2]); blok.userData.nom = muhit;
    const r1 = a1 * Math.PI / 180, sin2 = n1 / n2 * Math.sin(r1);
    const kritik = n1 > n2 ? Math.asin(n2 / n1) * 180 / Math.PI : null;
    const tir = sin2 > 1;
    const L = 4.2;
    // tushuvchi nur: yuqoridan (havodan) yoki pastdan (muhitdan)
    const ishora = yon === 'havodan' ? 1 : -1;
    const bosh = new T.Vector3(-Math.sin(r1) * L, ishora * Math.cos(r1) * L, 0);
    lazer.position.copy(bosh).multiplyScalar(1.1); lazer.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), bosh.clone().normalize());
    nur(bosh, new T.Vector3(0, 0, 0));
    let a2 = null;
    if(tir){
      nur(new T.Vector3(0, 0, 0), new T.Vector3(Math.sin(r1) * L, ishora * Math.cos(r1) * L, 0));
    } else {
      const r2 = Math.asin(sin2); a2 = r2 * 180 / Math.PI;
      nur(new T.Vector3(0, 0, 0), new T.Vector3(Math.sin(r2) * L, -ishora * Math.cos(r2) * L, 0));
      const q = new T.Vector3(Math.sin(r1) * L, ishora * Math.cos(r1) * L, 0);
      const qaytgan = new T.Mesh(new T.CylinderGeometry(.03, .03, L, 8), new T.MeshBasicMaterial({color:0xff6b6b, transparent:true, opacity:.22, toneMapped:false}));
      qaytgan.position.copy(q).multiplyScalar(.5); qaytgan.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), q.clone().normalize()); nurG.add(qaytgan);
    }
    yoy1.rotation.set(0, 0, ishora > 0 ? Math.PI/2 : -Math.PI/2); yoy1.geometry.dispose(); yoy1.geometry = new T.RingGeometry(.9, .95, 48, 1, 0, Math.max(.001, r1)); yoy1.rotation.z = ishora > 0 ? Math.PI/2 : -Math.PI/2;
    yoy2.visible = !tir; if(!tir){ yoy2.geometry.dispose(); yoy2.geometry = new T.RingGeometry(1.2, 1.25, 48, 1, 0, Math.max(.001, a2 * Math.PI / 180)); yoy2.rotation.z = ishora > 0 ? -Math.PI/2 - a2 * Math.PI / 180 : Math.PI/2 - a2 * Math.PI / 180; }
    izoh.innerHTML = 'n₁·sin α = n₂·sin β → '+(yon === 'havodan' ? 'havo (n = 1,00) → '+MUHIT[muhit][1].toLowerCase()+' (n = '+String(n).replace('.', ',')+')' : MUHIT[muhit][1].toLowerCase()+' (n = '+String(n).replace('.', ',')+') → havo (n = 1,00)')+
      ': α = <b>'+a1+'°</b>, '+(tir ? '<b style="color:#ffcb5c">to‘la ichki qaytish</b> (α > kritik burchak '+sn(kritik)+'°)' : 'β = <b>'+sn(a2)+'°</b>'+(kritik ? ' · kritik burchak '+sn(kritik)+'°' : ''))+'.';
    yozuvQosh('Havo · n = 1,00', 4.3, 3.4, {rang:'#cfe0ff'});
    yozuvQosh(MUHIT[muhit][1] + ' · n = ' + String(n).replace('.', ','), 4.3, -2.7, {rang:'#9fe8ff'});
    yozuvQosh('α = ' + a1 + '°', -1.2 * ishora * 0 - 1.1, ishora * 1.5, {rang:'#ffcb5c', chegara:'rgba(255,203,92,.5)'});
    if(!tir) yozuvQosh('β = ' + sn(a2) + '°', 1.3, -ishora * 1.8, {rang:'#5fe3d2', chegara:'rgba(25,199,181,.5)'});
    else yozuvQosh('To‘la ichki qaytish', 1.8, ishora * 1.6, {rang:'#ffcb5c', chegara:'rgba(255,203,92,.6)'});
    hodisa('sinish', {muhit, yonalish:yon, a1, a2:a2 === null ? null : Math.round(a2 * 10) / 10, tir, kritik:kritik === null ? null : Math.round(kritik * 10) / 10});
  }
  tag.innerHTML = Object.keys(MUHIT).map(k=>'<button data-m="'+k+'" class="'+(k === muhit ? 'faol' : '')+'">'+MUHIT[k][1]+'</button>').join('') +
    '<button data-y="havodan" class="faol">Havodan muhitga</button><button data-y="havoga">Muhitdan havoga</button>' +
    '<label style="min-width:260px">Tushish burchagi <input type="range" min="0" max="85" step="1" value="40"><b style="min-width:30px">40°</b></label>';
  const sl = tag.querySelector('input');
  sl.oninput = ()=>{ a1 = +sl.value; sl.nextSibling.textContent = a1 + '°'; yangila(); };
  tag.querySelectorAll('[data-m]').forEach(b=>b.onclick = ()=>S.holat({muhit:b.dataset.m}));
  tag.querySelectorAll('[data-y]').forEach(b=>b.onclick = ()=>S.holat({yonalish:b.dataset.y}));
  S.holat = h=>{
    if(!h) return;
    if(h.muhit && MUHIT[h.muhit]) muhit = h.muhit;
    if(h.yonalish) yon = h.yonalish;
    if(h.burchak !== undefined && h.burchak !== null){ a1 = +h.burchak; sl.value = a1; sl.nextSibling.textContent = a1 + '°'; }
    tag.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('faol', b.dataset.m === muhit));
    tag.querySelectorAll('[data-y]').forEach(b=>b.classList.toggle('faol', b.dataset.y === yon));
    yangila();
  };
  S.bosish = d=>hodisa('detal', {turD:'optika', nom:d.nom});
  S.joyla(6.5, new T.Vector3(0, 0, 0));
  yangila();
  return S;
}

window.MAKON3D = { sahna:M3sahna, glbSahna, zanjir2, quyosh3D, geometriya3D, yer3D, fasllar3D, xarita3D, piano3D, oy3D, optika3D, fizika3D, harbiy3D, biologiya3D, molekula3D, MOL };
})();
