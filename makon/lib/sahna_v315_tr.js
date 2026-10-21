/* MAKON v3.15 — TARIX sahnalari (guruh «tr»). lib/makon3d_v312.js dan KEYIN ulanadi.
   Sahnalar (window.MAKON_SAHNA): tr_qadimgi, tr_allomalar, tr_registon, tr_xonliklar (2D xarita), tr_mustaqillik.
   Hammasi protsedurali (internetdan model yuklanmaydi). Xarita ma’lumoti: lib/sahna_v315_tr_xarita.js (Natural Earth, jamoat mulki).
   Hodisalar (document 'makon3d'): tr-makon {joy}, tr-davr {davr}, tr-alloma {nom}, tr-bino {nom}, tr-xonlik {nom}, tr-shahar {shahar},
   tr-ramz {qism}, tr-sana {k}; detal kartalari: tr_makon, tr_davr, tr_alloma, tr_bino, tr_xonlik, tr_shahar, tr_ramz, tr_sana. */
(function(){
'use strict';
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d || {})}));
const esc = t=>String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const R = window.MAKON_SAHNA = window.MAKON_SAHNA || {};
const tejam = ()=>!!(window.MAKON_SIFAT && window.MAKON_SIFAT.tejam);

/* ================= UMUMIY YORDAMCHILAR ================= */
function asos(sahna, o){
  const S = window.MAKON3D.sahna(sahna, Object.assign({avto:false, fov:32, env:.5, ekspozitsiya:1.06}, o || {}));
  const T = S.T;
  S.sc.add(new T.HemisphereLight(0xdfe6ff, 0x1c1510, .42));
  const kun = new T.DirectionalLight(0xffd9ae, 1.12); kun.position.set(-6, 10, 7); S.sc.add(kun);      /* issiq asosiy */
  const tol = new T.DirectionalLight(0x8fb0ff, .42); tol.position.set(8, 3.5, 5); S.sc.add(tol);       /* sovuq to‘ldiruvchi */
  const orqa = new T.DirectionalLight(0xfff2dc, .6); orqa.position.set(1, 7, -10); S.sc.add(orqa);     /* orqa nur */
  const rang = h=>new T.Color(h).convertSRGBToLinear();
  const mat = (h, p)=>{
    const m = new T.MeshStandardMaterial(Object.assign({color:rang(h), roughness:.7, metalness:0}, p || {}));
    m.userData.env = 1; m.envMapIntensity = (p && p.envMapIntensity) || .35; return m;
  };
  const kanvas = (w, h, fn, takror)=>{
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    fn(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4;
    if(takror){ t.wrapS = t.wrapT = T.RepeatWrapping; }
    return t;
  };
  /* obyekt ostidagi yumshoq soya (radial gradient) */
  let soyaT = null;
  const soya = (rx, rz, x, y, z, kuch)=>{
    if(!soyaT) soyaT = kanvas(128, 128, (x2)=>{ const g = x2.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, 'rgba(0,0,0,.62)'); g.addColorStop(.55, 'rgba(0,0,0,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x2.fillStyle = g; x2.fillRect(0, 0, 128, 128); });
    const m = new T.MeshBasicMaterial({map:soyaT, transparent:true, depthWrite:false, opacity:kuch || 1});
    const p = new T.Mesh(new T.PlaneGeometry(rx * 2, rz * 2), m); p.rotation.x = -Math.PI / 2; p.position.set(x || 0, (y || 0) + .004, z || 0); p.renderOrder = 1;
    return p;
  };
  /* ko‘rinish: hw × hh (yarim en/balandlik) oynaga sig‘sin — ekran nisbatiga qarab; o‘lcham o‘zgarsa qayta (faqat umumiy ko‘rinishda) */
  const A = {S, T, rang, mat, kanvas, soya, umumiy:true};
  A.sigdir = (hw, hh, markaz)=>{
    const qil = ()=>{ const w = S.el.clientWidth || 800, h = S.el.clientHeight || 500; S.joyla(Math.max(hh, hw / (w / h)), markaz); };
    qil();
    let tm = 0; const rs = ()=>{ clearTimeout(tm); tm = setTimeout(()=>{ if(A.umumiy && S.el.isConnected) qil(); }, 120); };
    window.addEventListener('resize', rs);
    const y0 = S.yopilganda; S.yopilganda = ()=>{ window.removeEventListener('resize', rs); clearTimeout(tm); if(y0) y0(); };
  };
  return A;
}
/* deterministik «shovqin» — tosh va relyef uchun */
const shov = (x, y, z, s)=>Math.sin(x * 1.7 + s) * Math.cos(y * 2.3 + s * 1.3) * Math.sin(z * 1.9 + s * .7) + .5 * Math.sin(x * 3.9 + y * 2.1 + s * 2.1) * Math.cos(z * 3.3 - s) + .25 * Math.sin((x + z) * 7.1 + y * 5.3 + s * 3.7);
function tosh(T, r, det, s, amp){
  const g = new T.IcosahedronGeometry(r, det || 2), p = g.attributes.position, v = new T.Vector3();
  for(let i = 0; i < p.count; i++){
    v.fromBufferAttribute(p, i); const n = v.clone().normalize();
    const k = 1 + (amp || .22) * shov(n.x * 1.3, n.y * 1.3, n.z * 1.3, s || 1);
    v.copy(n).multiplyScalar(r * k); p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals(); return g;
}
/* tosh teksturasi (rang + mayda dog‘lar) */
function toshTekstura(A, asl, dog, n){
  return A.kanvas(256, 256, (x, w, h)=>{
    x.fillStyle = asl; x.fillRect(0, 0, w, h);
    let s = 7; const rnd = ()=>{ s = (s * 16807) % 2147483647; return s / 2147483647; };
    for(let i = 0; i < (n || 900); i++){ x.fillStyle = dog[i % dog.length]; x.globalAlpha = .08 + rnd() * .22; const r = 1 + rnd() * 5; x.beginPath(); x.arc(rnd() * w, rnd() * h, r, 0, 7); x.fill(); }
    x.globalAlpha = 1;
  }, true);
}
/* DOM qatlamlari: yorliqlar (3D nuqtaga bog‘langan), ustki karta, manba */
function qatlam(sahna, S, o){
  const yl = document.createElement('div'); yl.className = 'tr-yl'; sahna.append(yl);
  const karta = document.createElement('div'); karta.className = 'tr-karta'; karta.innerHTML = '<span class="tr-ust"></span><b class="tr-nom"></b><small class="tr-s"></small><small class="tr-mb"></small>'; sahna.append(karta);
  karta.querySelector('.tr-mb').textContent = (o && o.manba) || '';
  const T = S.T, v = new T.Vector3(), royxat = [];
  const api = {
    yl, karta,
    qosh(k, matn, obyekt, bos, cls){
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tr-y ' + (cls || ''); b.dataset.k = k; b.innerHTML = matn;
      b.addEventListener('pointerdown', e=>e.stopPropagation());
      b.onclick = e=>{ e.stopPropagation(); if(bos) bos(k); };
      yl.append(b); royxat.push({b, o:obyekt}); return b;
    },
    belgila(k){ royxat.forEach(r=>r.b.classList.toggle('faol', r.b.dataset.k === k)); },
    kadr(){
      const w = S.el.clientWidth, h = S.el.clientHeight; if(!w) return;
      for(const r of royxat){
        v.setFromMatrixPosition(r.o.matrixWorld).project(S.cam);
        const ko = v.z < 1 && Math.abs(v.x) < 1.15 && Math.abs(v.y) < 1.15;
        r.b.style.display = ko ? '' : 'none';
        if(ko) r.b.style.transform = 'translate(' + ((v.x + 1) / 2 * w).toFixed(1) + 'px,' + ((1 - v.y) / 2 * h).toFixed(1) + 'px)';
      }
    },
    yoz(ust, nom, s){ karta.querySelector('.tr-ust').innerHTML = ust || ''; karta.querySelector('.tr-nom').innerHTML = nom || ''; karta.querySelector('.tr-s').innerHTML = s || ''; },
    yopish(){ yl.remove(); karta.remove(); }
  };
  return api;
}
/* langar: yorliq uchun ko‘rinmas nuqta */
function langar(T, g, x, y, z){ const o = new T.Object3D(); o.position.set(x, y, z); g.add(o); return o; }
/* olov: shoxlar, tosh halqa, alanga, yorug‘lik */
function olov(A, g, x, y, z, s){
  const T = A.T, q = new T.Group(); q.position.set(x, y, z); q.scale.setScalar(s || 1); g.add(q);
  const shox = A.mat('#4a2f1c', {roughness:.9});
  for(let i = 0; i < 3; i++){ const c = new T.Mesh(new T.CylinderGeometry(.018, .022, .26, 7), shox); c.rotation.z = Math.PI / 2 - .35; c.rotation.y = i * 2.1; c.position.y = .04; q.add(c); }
  const tm = A.mat('#6e6258', {roughness:.95, flatShading:true});
  for(let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2; const t = new T.Mesh(tosh(T, .035, 0, i + 2, .3), tm); t.position.set(Math.cos(a) * .15, .02, Math.sin(a) * .15); q.add(t); }
  const alanga = [];
  [[0xff5a12, .075, .26], [0xff9a2a, .055, .2], [0xffe27a, .032, .13]].forEach(([c, r, h], i)=>{
    const m = new T.Mesh(new T.ConeGeometry(r, h, 10, 1, true), new T.MeshBasicMaterial({color:c, transparent:true, opacity:.82, blending:T.AdditiveBlending, depthWrite:false, side:T.DoubleSide}));
    m.geometry.translate(0, h / 2, 0); m.position.y = .03; m.userData.i = i; q.add(m); alanga.push(m);
  });
  const nur = new T.PointLight(0xff8a3a, tejam() ? .8 : 1.3, 2.6 * (s || 1), 2); nur.position.y = .22; q.add(nur);
  return {q, kadr(t){
    alanga.forEach((m, i)=>{ const f = 1 + .18 * Math.sin(t * (11 + i * 3.1) + i) + .1 * Math.sin(t * 23 + i * 2); m.scale.set(1 + .08 * Math.sin(t * 9 + i), f, 1 + .08 * Math.cos(t * 8 + i)); m.rotation.y = t * (1 + i); });
    nur.intensity = (tejam() ? .8 : 1.3) * (1 + .22 * Math.sin(t * 13) + .12 * Math.sin(t * 7.3));
  }};
}
/* egilgan shox (tog‘ echkisi shoxi) */
function shoxGeom(T, r, h){
  const g = new T.ConeGeometry(r, h, 9, 10); g.translate(0, h / 2, 0);
  const p = g.attributes.position, Rb = h / 1.7;
  for(let i = 0; i < p.count; i++){
    const x = p.getX(i), y = p.getY(i), th = y / Rb;
    p.setXYZ(i, Rb - (Rb - x) * Math.cos(th), (Rb - x) * Math.sin(th), p.getZ(i));
  }
  g.computeVertexNormals(); return g;
}
/* taglik (tag) tugmalari */
function tugmalar(tag, royxat, bos){
  tag.innerHTML = '';
  royxat.forEach(([k, nom])=>{
    if(k === '|'){ const s = document.createElement('span'); s.className = 'tag-ajr'; tag.append(s); return; }
    const b = document.createElement('button'); b.dataset.k = k; b.innerHTML = nom; b.onclick = ()=>bos(k); tag.append(b);
  });
  return k=>tag.querySelectorAll('button[data-k]').forEach(b=>b.classList.toggle('faol', b.dataset.k === k));
}

/* ================= 1. QADIMGI ODAMLAR VA MANZILGOHLAR ================= */
/* x — vaqt chizig‘idagi joy (log shkala), yil — hozirdan necha yil oldin (oraliq) */
const QD_MAKON = {
  selungur:{nom:'Selung‘ur g‘ori', q:'Farg‘ona vodiysi', sana:'ilk paleolit · bahsli sana'},
  kolbuloq:{nom:'Ko‘lbuloq', q:'Angren, Toshkent viloyati', sana:'ilk – o‘rta paleolit'},
  teshiktosh:{nom:'Teshiktosh g‘ori', q:'Boysuntog‘, Surxondaryo', sana:'o‘rta paleolit'},
  obirahmat:{nom:'Obirahmat g‘ori', q:'Chotqol tizmasi, Toshkent viloyati', sana:'o‘rta paleolit'},
  sarazm:{nom:'Sarazm', q:'Zarafshon vodiysi (Tojikiston)', sana:'eneolit – bronza'}
};
const QD_DAVR = [
  /* [kalit, nom, boshlanishi (yil oldin), oxiri, rang] — O‘rta Osiyo uchun taxminiy chegaralar */
  ['ilk', 'Ilk paleolit', 1500000, 100000, '#8a6a45'],
  ['orta', 'O‘rta paleolit', 100000, 40000, '#a0773f'],
  ['songgi', 'So‘nggi paleolit', 40000, 12000, '#b78b45'],
  ['mezolit', 'Mezolit', 12000, 8000, '#6f8f5a'],
  ['neolit', 'Neolit', 8000, 6000, '#4f8f82'],
  ['eneolit', 'Eneolit', 6000, 5000, '#b0643e'],
  ['bronza', 'Bronza', 5000, 3000, '#c0923a']
];
const QD_X = y=>{ const a = Math.log10(2000000), b = Math.log10(2500); return -5.6 + (a - Math.log10(y)) / (a - b) * 11.2; };
/* zamonaviy sanalash oralig‘i [a, b] (yil oldin) va darsliklardagi eski sana (d) — ikkalasi ko‘rsatiladi */
const QD_SANA = {selungur:{a:170000, b:110000, d:1000000}, kolbuloq:{a:82000, b:39000, d:500000}, teshiktosh:{a:70000, b:70000}, obirahmat:{a:100000, b:40000}, sarazm:{a:5900, b:4100}};

R.tr_qadimgi = async (sahna, {tag, izoh, yorliq, o})=>{
  const A = asos(sahna, {rx:.52, ry:0, rxMin:.12, rxMax:1.15, ryMin:-.85, ryMax:.85, zoom:1.0, fov:30});
  const {S, T, mat, soya} = A, g = S.g;
  if(yorliq) yorliq('Tarix · qadimgi manzilgohlar · diorama sxematik, masshtabsiz');
  const Q = qatlam(sahna, S, {manba:'Diorama sxematik va masshtabsiz · sanalar taxminiy (manbalar farq qiladi)'});
  /* asosiy taxta */
  const taxtaT = toshTekstura(A, '#2b2520', ['#3a322a', '#1b1714', '#4a3d31'], 1400);
  taxtaT.repeat.set(3, 2);
  const taxta = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(13.2, .5, 8.2, 4, .18) : new T.BoxGeometry(13.2, .5, 8.2), mat('#ffffff', {map:taxtaT, roughness:.85}));
  taxta.position.set(0, -.25, .2); g.add(taxta);
  const hosh = new T.Mesh(new T.BoxGeometry(13.3, .06, 8.3), mat('#8a6a45', {roughness:.4, metalness:.35})); hosh.position.set(0, -.49, .2); g.add(hosh);
  g.add(soya(7.4, 4.8, 0, -.52, .2, .9));

  const toshM = {
    sarg:mat('#ffffff', {map:toshTekstura(A, '#8f7a61', ['#6f5c47', '#a8926f', '#5a4a3a']), roughness:.92, flatShading:true}),
    kul:mat('#ffffff', {map:toshTekstura(A, '#7b766d', ['#5d5850', '#9a948a', '#4a463f']), roughness:.9, flatShading:true}),
    qizg:mat('#ffffff', {map:toshTekstura(A, '#94664a', ['#7a4f37', '#b07a58', '#5e3d2b']), roughness:.92, flatShading:true})
  };
  const qora = mat('#120d0a', {roughness:1});
  const tuproq = mat('#ffffff', {map:toshTekstura(A, '#7d6a50', ['#6b5a43', '#937d5e', '#56473a'], 700), roughness:1});
  const oqTosh = mat('#d8cbb4', {roughness:.6, flatShading:true});
  const shoxM = mat('#d9c9a6', {roughness:.55});
  const loy = mat('#b98f62', {roughness:.95}), loyQ = mat('#94704b', {roughness:.95}), yashil = mat('#5d7d3a', {roughness:.95}), suv = mat('#3f86b8', {roughness:.15, metalness:.1, envMapIntensity:1});
  const gruppa = {}, olovlar = [];
  const KX = {selungur:-5, kolbuloq:-2.5, teshiktosh:0, obirahmat:2.5, sarazm:5};
  const piyedestal = (k)=>{
    const q = new T.Group(); q.position.set(KX[k], 0, -.8); q.scale.setScalar(1.2); g.add(q); gruppa[k] = q;
    const p = new T.Mesh(new T.CylinderGeometry(1.02, 1.1, .16, 48), mat('#3b332c', {roughness:.8})); p.position.y = .08; q.add(p);
    const yer = new T.Mesh(new T.CylinderGeometry(.98, .98, .02, 48), tuproq); yer.position.y = .17; q.add(yer);
    const halqa = new T.Mesh(new T.TorusGeometry(1.06, .018, 8, 72), new T.MeshBasicMaterial({color:0xf2b25c, transparent:true, opacity:0})); halqa.rotation.x = Math.PI / 2; halqa.position.y = .17; q.add(halqa);
    q.userData.halqa = halqa;
    q.add(soya(1.3, 1.3, 0, 0, 0, .8));
    return q;
  };
  const nomla = (q, k)=>q.traverse(m=>{ if(m.isMesh && m !== q.userData.halqa) m.userData.nom = k; });

  /* --- Selung‘ur: tog‘ bag‘ridagi keng g‘or --- */
  (()=>{ const q = piyedestal('selungur');
    const t1 = new T.Mesh(tosh(T, .8, 2, 3, .2), toshM.sarg); t1.scale.set(1.15, .95, .8); t1.position.set(0, .72, -.3); q.add(t1);
    const t2 = new T.Mesh(tosh(T, .5, 1, 5, .25), toshM.sarg); t2.position.set(-.6, .45, -.05); q.add(t2);
    const t3 = new T.Mesh(tosh(T, .45, 1, 8, .25), toshM.sarg); t3.position.set(.62, .4, -.02); q.add(t3);
    const gor = new T.Mesh(new T.SphereGeometry(.34, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), qora); gor.scale.set(1.1, 1.05, .55); gor.rotation.x = Math.PI / 2; gor.position.set(0, .2, .38); q.add(gor);
    for(let i = 0; i < 5; i++){ const c = new T.Mesh(tosh(T, .045, 0, 11 + i, .35), oqTosh); c.scale.y = .55; c.position.set(-.35 + i * .18, .2, .6 + (i % 2) * .12); q.add(c); }
    const suyak = new T.Mesh(new T.CylinderGeometry(.018, .018, .22, 6), shoxM); suyak.rotation.z = Math.PI / 2; suyak.rotation.y = .6; suyak.position.set(.42, .2, .52); q.add(suyak);
    nomla(q, 'selungur');
  })();
  /* --- Ko‘lbuloq: daryo bo‘yidagi ochiq manzil (tosh qurollar ustaxonasi) --- */
  (()=>{ const q = piyedestal('kolbuloq');
    const t1 = new T.Mesh(tosh(T, .55, 1, 21, .25), toshM.kul); t1.scale.set(1.3, .7, .8); t1.position.set(-.3, .32, -.45); q.add(t1);
    const t2 = new T.Mesh(tosh(T, .35, 1, 23, .3), toshM.kul); t2.position.set(.45, .26, -.5); q.add(t2);
    const egri = new T.CatmullRomCurve3([new T.Vector3(-.95, .19, .35), new T.Vector3(-.3, .19, .2), new T.Vector3(.3, .19, .45), new T.Vector3(.95, .19, .25)]);
    const daryo = new T.Mesh(new T.TubeGeometry(egri, 40, .11, 6), suv); daryo.scale.y = .2; daryo.position.y = .15; q.add(daryo);
    for(let i = 0; i < 9; i++){ const c = new T.Mesh(tosh(T, .04, 0, 30 + i, .4), oqTosh); c.scale.y = .5; const a = i * 2.4; c.position.set(Math.cos(a) * (.18 + i * .03), .2, -.05 + Math.sin(a) * .12); q.add(c); }
    const ch = new T.Mesh(tosh(T, .09, 1, 41, .35), toshM.qizg); ch.scale.set(1.2, .6, .9); ch.position.set(.05, .22, -.05); q.add(ch);
    nomla(q, 'kolbuloq');
  })();
  /* --- Teshiktosh: kesimli g‘or — ichida dafn joyi va shoxlar halqasi --- */
  (()=>{ const q = piyedestal('teshiktosh');
    const gum = new T.SphereGeometry(.92, 36, 18, -Math.PI * .08, Math.PI * 1.16, 0, Math.PI / 2);
    const p = gum.attributes.position, v = new T.Vector3();
    for(let i = 0; i < p.count; i++){ v.fromBufferAttribute(p, i); const n = v.clone().normalize(); v.multiplyScalar(1 + .08 * shov(n.x * 2, n.y * 2, n.z * 2, 4)); p.setXYZ(i, v.x, v.y, v.z); }
    gum.computeVertexNormals();
    const qobiq = new T.Mesh(gum, toshM.qizg.clone()); qobiq.material.side = T.DoubleSide; qobiq.material.flatShading = false;
    qobiq.rotation.y = Math.PI; qobiq.scale.set(1, .95, .85); qobiq.position.set(0, .17, -.05); q.add(qobiq);
    const qirra = new T.Mesh(new T.TorusGeometry(.9, .06, 6, 40, Math.PI * 1.16), toshM.qizg); qirra.rotation.set(Math.PI / 2, 0, -Math.PI * .08 + Math.PI); qirra.scale.set(1, .85, 1); qirra.position.set(0, .18, -.05); q.add(qirra);
    const chuqur = new T.Mesh(new T.CircleGeometry(.2, 28), qora); chuqur.rotation.x = -Math.PI / 2; chuqur.scale.set(1.3, .8, 1); chuqur.position.set(-.1, .185, .05); q.add(chuqur);
    const sg = shoxGeom(T, .03, .34);
    for(let i = 0; i < 6; i++){
      const a = i / 6 * Math.PI * 2, jx = -.1 + Math.cos(a) * .34, jz = .05 + Math.sin(a) * .22;
      [-1, 1].forEach(s=>{ const h = new T.Mesh(sg, shoxM); h.position.set(jx + s * .03 * Math.sin(a), .18, jz - s * .03 * Math.cos(a)); h.rotation.set(0, -a + Math.PI, -.25); q.add(h); });
    }
    const ol = olov(A, q, .45, .18, .25, .8); olovlar.push(ol);
    nomla(q, 'teshiktosh');
  })();
  /* --- Obirahmat: qoya ayvoni (grot), o‘choq, yonida soy --- */
  (()=>{ const q = piyedestal('obirahmat');
    const orqa = new T.Mesh(tosh(T, .7, 2, 13, .18), toshM.kul); orqa.scale.set(1.25, 1.05, .55); orqa.position.set(0, .7, -.55); q.add(orqa);
    const ayvon = new T.Mesh(tosh(T, .75, 2, 17, .16), toshM.kul); ayvon.scale.set(1.2, .32, .75); ayvon.position.set(0, 1.12, -.15); q.add(ayvon);
    const yon1 = new T.Mesh(tosh(T, .32, 1, 19, .25), toshM.kul); yon1.position.set(-.72, .38, -.2); q.add(yon1);
    const egri = new T.CatmullRomCurve3([new T.Vector3(.95, .19, -.35), new T.Vector3(.72, .19, .2), new T.Vector3(.35, .19, .72), new T.Vector3(-.2, .19, .92)]);
    const say = new T.Mesh(new T.TubeGeometry(egri, 32, .09, 6), suv); say.scale.y = .2; say.position.y = .15; q.add(say);
    const ol = olov(A, q, -.05, .18, .05, .9); olovlar.push(ol);
    for(let i = 0; i < 4; i++){ const c = new T.Mesh(new T.ConeGeometry(.025, .09, 4), oqTosh); c.rotation.z = Math.PI / 2; c.rotation.y = i * 1.4; c.position.set(-.45 + i * .12, .2, .35); q.add(c); }
    nomla(q, 'obirahmat');
  })();
  /* --- Sarazm: xom g‘ishtli uylar, dumaloq ibodatxona, dalalar --- */
  (()=>{ const q = piyedestal('sarazm');
    const uy = (x, z, w, d, h, r)=>{
      const b = new T.Mesh(new T.BoxGeometry(w, h, d), loy); b.position.set(x, .18 + h / 2, z); b.rotation.y = r || 0; q.add(b);
      const tom = new T.Mesh(new T.BoxGeometry(w + .04, .03, d + .04), loyQ); tom.position.set(x, .18 + h + .015, z); tom.rotation.y = r || 0; q.add(tom);
      const e = new T.Mesh(new T.BoxGeometry(.06, .09, .01), qora); e.position.set(x + Math.sin(r || 0) * (d / 2 + .003), .23, z + Math.cos(r || 0) * (d / 2 + .003)); e.rotation.y = r || 0; q.add(e);
    };
    uy(-.5, -.35, .34, .26, .16, .1); uy(-.12, -.52, .3, .24, .15, -.05); uy(.3, -.42, .36, .26, .17, .05); uy(-.58, .1, .26, .3, .14, .3); uy(.55, .02, .28, .24, .15, -.2);
    const dev = new T.Mesh(new T.CylinderGeometry(.24, .24, .16, 32, 1, true), loy); dev.material = loy.clone(); dev.material.side = T.DoubleSide; dev.position.set(.02, .26, .12); q.add(dev);
    const qur = new T.Mesh(new T.CylinderGeometry(.07, .08, .06, 16), mat('#d9b98a', {roughness:.8})); qur.position.set(.02, .21, .12); q.add(qur);
    const ol = olov(A, q, .02, .24, .12, .45); olovlar.push(ol);
    [[-.35, .55, .4, .26], [.3, .6, .34, .22]].forEach(([x, z, w, d])=>{ const f = new T.Mesh(new T.BoxGeometry(w, .012, d), yashil); f.position.set(x, .186, z); q.add(f); for(let i = 0; i < 4; i++){ const r2 = new T.Mesh(new T.BoxGeometry(w, .016, .012), mat('#7a9a4a')); r2.position.set(x, .19, z - d / 2 + (i + .5) * d / 4); q.add(r2); } });
    const devor = new T.Mesh(new T.TorusGeometry(.86, .025, 4, 60, Math.PI * 1.2), loyQ); devor.rotation.set(Math.PI / 2, 0, Math.PI * .9); devor.position.y = .2; devor.scale.z = 2.2; q.add(devor);
    nomla(q, 'sarazm');
  })();

  /* --- vaqt chizig‘i (log shkala) --- */
  const vc = new T.Group(); vc.position.set(0, 0, 2.55); g.add(vc);
  const segM = {};
  QD_DAVR.forEach(([k, nom, a, b, rang])=>{
    const x0 = QD_X(a), x1 = QD_X(b), w = Math.max(.08, x1 - x0);
    const m = new T.Mesh(new T.BoxGeometry(w - .03, .12, .5), mat(rang, {roughness:.55, emissive:A.rang(rang), emissiveIntensity:.08}));
    m.position.set((x0 + x1) / 2, .06, 0); m.userData.nom = 'davr:' + k; vc.add(m); segM[k] = m;
  });
  const lin = new T.Mesh(new T.BoxGeometry(11.4, .03, .04), mat('#e9d5ae', {roughness:.4, metalness:.3})); lin.position.set(0, .14, .3); vc.add(lin);
  /* shkala belgilari */
  const SHK = [[1500000, '1,5 mln'], [1000000, '1 mln'], [500000, '500 ming'], [100000, '100 ming'], [40000, '40 ming'], [10000, '10 ming'], [5000, '5 ming'], [3000, '3 ming']];  /* hozirdan necha yil oldin */
  SHK.forEach(([y])=>{ const t = new T.Mesh(new T.BoxGeometry(.02, .05, .12), mat('#e9d5ae')); t.position.set(QD_X(y), .16, .3); vc.add(t); });
  /* manzilgohlardan vaqt chizig‘iga ingichka bog‘lovchi */
  const bogM = new T.LineBasicMaterial({color:0xf2c27a, transparent:true, opacity:.55});
  const arvohM = mat('#9aa3c7', {transparent:true, opacity:.55});
  Object.keys(QD_SANA).forEach(k=>{
    const {a, b, d} = QD_SANA[k], xm = (QD_X(a) + QD_X(b)) / 2;
    if(d){ /* darslikdagi eski sana — xira halqa */
      const ar = new T.Mesh(new T.TorusGeometry(.07, .018, 8, 24), arvohM); ar.position.set(QD_X(d), .22, 2.55); ar.rotation.x = Math.PI / 2; g.add(ar);
      const gp2 = new T.BufferGeometry().setFromPoints([new T.Vector3(QD_X(d), .22, 2.55), new T.Vector3(xm, .22, 2.55)]);
      g.add(new T.Line(gp2, new T.LineDashedMaterial({color:0x9aa3c7, dashSize:.08, gapSize:.06, transparent:true, opacity:.6}))); g.children[g.children.length - 1].computeLineDistances();
    }
    const gp = new T.BufferGeometry().setFromPoints(new T.CatmullRomCurve3([new T.Vector3(KX[k], .2, .5), new T.Vector3((KX[k] + xm) / 2, .25, 1.5), new T.Vector3(xm, .2, 2.4)]).getPoints(30));
    g.add(new T.Line(gp, bogM));
    const nq = new T.Mesh(new T.SphereGeometry(.07, 16, 10), mat('#f2c27a', {emissive:A.rang('#f2a040'), emissiveIntensity:.4})); nq.position.set(xm, .22, 2.55); nq.userData.nom = k; g.add(nq);
    if(a !== b){ const oral = new T.Mesh(new T.BoxGeometry(Math.abs(QD_X(b) - QD_X(a)), .025, .05), mat('#f2c27a', {emissive:A.rang('#f2a040'), emissiveIntensity:.3})); oral.position.set(xm, .15, 2.28); g.add(oral); }
  });

  /* yorliqlar */
  const bos = k=>tanla(k, true);
  Object.keys(QD_MAKON).forEach(k=>Q.qosh(k, '<b>' + QD_MAKON[k].nom + '</b><span>' + QD_MAKON[k].sana + '</span>', langar(T, g, KX[k], 1.95, -.8), bos));
  QD_DAVR.forEach(([k, nom, a, b])=>Q.qosh('davr:' + k, nom, langar(T, vc, (QD_X(a) + QD_X(b)) / 2, .25, .45), bos, 'davr'));
  SHK.forEach(([y, m])=>Q.qosh('shk' + y, m, langar(T, vc, QD_X(y), .1, .62), null, 'shk'));
  Q.qosh('bugun', 'yil oldin', langar(T, vc, 0, .1, .95), null, 'shk');

  let tanK = null;
  const faol = tugmalar(tag, [['umumiy', 'Umumiy ko‘rinish'], ['|'], ...Object.keys(QD_MAKON).map(k=>[k, QD_MAKON[k].nom.replace(' g‘ori', '')])], k=>k === 'umumiy' ? tanla(null, true) : tanla(k, true));
  const IZOH = {
    null:'Beshta diorama — O‘zbekiston va unga qo‘shni hududdagi eng mashhur qadimgi manzilgohlar. Pastdagi <b>vaqt chizig‘i</b> logarifmik: chapda million yillar, o‘ngda ming yillar. Dioramani yoki davrni bosing.'
  };
  function tanla(k, yub){
    tanK = k;
    Object.keys(gruppa).forEach(x=>{ gruppa[x].userData.halqa.material.opacity = x === k ? .9 : 0; });
    Object.keys(segM).forEach(x=>{ segM[x].material.emissiveIntensity = k === 'davr:' + x ? .55 : .08; });
    Q.belgila(k); faol(k || 'umumiy');
    A.umumiy = !k;
    if(!k){ Q.yoz('Qadimgi manzilgohlar', 'Diorama va vaqt chizig‘i', 'Dioramani bosing — ma’lumot kartasi chiqadi'); izoh.innerHTML = IZOH.null; S.tikla(); return; }
    if(k.startsWith('davr:')){
      const d = QD_DAVR.find(x=>'davr:' + x[0] === k);
      Q.yoz('Davr', d[1], 'O‘rta Osiyo uchun taxminiy chegaralar');
      const dd = ((window.MAKON_DETAL || {}).tr_davr || {})[d[0]];
      izoh.innerHTML = '<b>' + d[1] + '.</b> ' + (dd ? dd.matn : '');
      if(yub){ hodisa('tr-davr', {davr:d[0]}); hodisa('detal', {turD:'tr_davr', nom:d[0]}); }
      return;
    }
    const m = QD_MAKON[k];
    Q.yoz(m.q, m.nom, m.sana);
    const dk = ((window.MAKON_DETAL || {}).tr_makon || {})[k];
    izoh.innerHTML = '<b>' + m.nom + '.</b> ' + (dk ? dk.matn : '');
    S.fokus(1.75, new T.Vector3(KX[k], .7, -.8), true);
    if(yub){ hodisa('tr-makon', {joy:k}); hodisa('detal', {turD:'tr_makon', nom:k}); }
  }
  S.bosish = d=>{ if(d.nom) tanla(d.nom, true); };
  S.ustida = d=>{ S.el.style.cursor = d ? 'pointer' : 'grab'; };
  S.kadrda = (dt, t)=>{
    olovlar.forEach(x=>x.kadr(t));
    if(tanK && gruppa[tanK]) gruppa[tanK].userData.halqa.material.opacity = .55 + .35 * Math.sin(t * 3.2);
    Q.kadr();
  };
  S.holat = h=>{
    if(!h) return;
    if(h.joy !== undefined){ if(!h.joy || gruppa[h.joy]) tanla(h.joy || null, false); }
    else if(h.davr && segM[h.davr]) tanla('davr:' + h.davr, false);
  };
  const yopAsl = S.yopish; S.yopish = ()=>{ Q.yopish(); yopAsl(); };
  A.sigdir(6.9, 3.6, new T.Vector3(0, .2, .75));
  tanla(null, false);
  if(o && o.holat) S.holat(o.holat);
  return S;
};

/* ================= NAQSH YORDAMCHILARI (kanvas) ================= */
function yulduz8(x, cx, cy, r, ichR){
  x.beginPath();
  for(let i = 0; i < 16; i++){ const a = i / 16 * Math.PI * 2 - Math.PI / 2, rr = i % 2 ? r * (ichR || .55) : r; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  x.closePath();
}
function girih(x, w, h, o){
  o = o || {};
  x.fillStyle = o.fon || '#123a78'; x.fillRect(0, 0, w, h);
  const q = o.qadam || 48;
  x.lineWidth = o.qalin || 2.2;
  for(let j = -1; j * q < h + q; j++) for(let i = -1; i * q < w + q; i++){
    const cx = i * q + (j % 2 ? q / 2 : 0), cy = j * q * .5 + q / 2;
    yulduz8(x, cx, cy, q * .36, .62); x.fillStyle = o.yulduz || '#e9eef7'; x.fill(); x.strokeStyle = o.chiziq || '#0b2350'; x.stroke();
    yulduz8(x, cx, cy, q * .18, .55); x.fillStyle = o.ich || '#1aa3b5'; x.fill();
  }
}
/* g‘isht devor: sarg‘ish qatorlar */
function gisht(x, w, h, o){
  o = o || {};
  x.fillStyle = o.fon || '#c9a879'; x.fillRect(0, 0, w, h);
  const qh = o.qh || 8, qw = o.qw || 22;
  x.strokeStyle = o.chok || 'rgba(110,80,50,.35)'; x.lineWidth = 1;
  for(let y = 0; y < h; y += qh){ x.beginPath(); x.moveTo(0, y + .5); x.lineTo(w, y + .5); x.stroke();
    for(let xx = ((y / qh) % 2) * qw / 2; xx < w; xx += qw){ x.beginPath(); x.moveTo(xx + .5, y); x.lineTo(xx + .5, y + qh); x.stroke(); } }
  let s = 11; const rnd = ()=>{ s = (s * 16807) % 2147483647; return s / 2147483647; };
  for(let i = 0; i < w * h / 90; i++){ x.fillStyle = rnd() > .5 ? 'rgba(90,60,30,.08)' : 'rgba(255,240,210,.07)'; x.fillRect(rnd() * w, rnd() * h, 3 + rnd() * 10, 2 + rnd() * 5); }
}
/* uchli ravoq yo‘li (kanvas) */
function ravoqYol(x, x0, y0, w, h, hs){
  x.beginPath(); x.moveTo(x0, y0 + h); x.lineTo(x0, y0 + h - hs);
  x.bezierCurveTo(x0, y0 + (h - hs) * .45, x0 + w * .38, y0 + (h - hs) * .12, x0 + w / 2, y0);
  x.bezierCurveTo(x0 + w * .62, y0 + (h - hs) * .12, x0 + w, y0 + (h - hs) * .45, x0 + w, y0 + h - hs);
  x.lineTo(x0 + w, y0 + h); x.closePath();
}
/* uchli ravoq shakli (THREE.Shape), asosi y = 0, markaz x = 0 */
function ravoqShakl(T, w, h, hs, sh){
  sh = sh || new T.Shape();
  sh.moveTo(-w / 2, 0); sh.lineTo(-w / 2, hs);
  sh.bezierCurveTo(-w / 2, hs + (h - hs) * .55, -w * .12, h - (h - hs) * .12, 0, h);
  sh.bezierCurveTo(w * .12, h - (h - hs) * .12, w / 2, hs + (h - hs) * .55, w / 2, hs);
  sh.lineTo(w / 2, 0); sh.closePath();
  return sh;
}
function ravoqTeshik(T, w, h, hs, dy){
  const p = new T.Path();
  p.moveTo(-w / 2, dy); p.lineTo(w / 2, dy); p.lineTo(w / 2, dy + hs);
  p.bezierCurveTo(w / 2, dy + hs + (h - hs) * .55, w * .12, dy + h - (h - hs) * .12, 0, dy + h);
  p.bezierCurveTo(-w * .12, dy + h - (h - hs) * .12, -w / 2, dy + hs + (h - hs) * .55, -w / 2, dy + hs);
  p.closePath(); return p;
}
/* UV ni geometriya chegarasiga moslash (ShapeGeometry/Extrude qopqog‘i uchun) */
function uvMosla(g){
  g.computeBoundingBox(); const b = g.boundingBox, p = g.attributes.position, uv = g.attributes.uv;
  const w = b.max.x - b.min.x || 1, h = b.max.y - b.min.y || 1;
  for(let i = 0; i < uv.count; i++) uv.setXY(i, (p.getX(i) - b.min.x) / w, (p.getY(i) - b.min.y) / h);
  uv.needsUpdate = true; return g;
}

/* ================= 2. O‘RTA ASR ALLOMALARI ================= */
const AL = {
  xorazmiy:{nom:'Muhammad al-Xorazmiy', q:'al-Xorazmiy', yil:'taxm. 780 – taxm. 850', y0:780, y1:850, soha:'matematik, astronom', rang:'#3fa7d6', b:'x² + 10x = 39'},
  fargoniy:{nom:'Ahmad al-Farg‘oniy', q:'al-Farg‘oniy', yil:'taxm. 800 – 861-yildan keyin', y0:800, y1:865, soha:'astronom', rang:'#6d8cff', b:'Astronomiya asoslari'},
  forobiy:{nom:'Abu Nasr Forobiy', q:'Forobiy', yil:'taxm. 870 – 950/951', y0:870, y1:951, soha:'faylasuf, musiqashunos', rang:'#b07cf0', b:'«Ikkinchi muallim»'},
  beruniy:{nom:'Abu Rayhon Beruniy', q:'Beruniy', yil:'973 – taxm. 1048–1050', y0:973, y1:1050, soha:'qomusiy olim', rang:'#2fbf9f', b:'Yer radiusi ≈ 6340 km'},
  ibnsino:{nom:'Abu Ali ibn Sino', q:'Ibn Sino', yil:'980 – 1037', y0:980, y1:1037, soha:'tabib, faylasuf', rang:'#e0655a', b:'«Tib qonunlari»'},
  ulugbek:{nom:'Mirzo Ulug‘bek', q:'Ulug‘bek', yil:'1394 – 1449', y0:1394, y1:1449, soha:'astronom, hukmdor', rang:'#f2b544', b:'Ziji jadidi Ko‘ragoniy'},
  navoiy:{nom:'Alisher Navoiy', q:'Navoiy', yil:'1441 – 1501', y0:1441, y1:1501, soha:'shoir, mutafakkir', rang:'#e5849f', b:'«Xamsa»'},
  bobur:{nom:'Zahiriddin Muhammad Bobur', q:'Bobur', yil:'1483 – 1530', y0:1483, y1:1530, soha:'shoir, tarixchi, hukmdor', rang:'#8fc45a', b:'«Boburnoma»'}
};
R.tr_allomalar = async (sahna, {tag, izoh, yorliq, o})=>{
  const A = asos(sahna, {rx:.3, ry:0, rxMin:-.05, rxMax:.95, ryMin:-.9, ryMax:.9, fov:32, env:.6});
  const {S, T, mat, kanvas, soya, rang} = A, g = S.g;
  if(yorliq) yorliq('Tarix · allomalar galereyasi · ramziy buyumlar, portret emas');
  const Q = qatlam(sahna, S, {manba:'Buyumlar — ramziy (soddalashtirilgan); tug‘ilgan-vafot yillari manbalarda farq qilishi mumkin'});
  const K = Object.keys(AL), N = K.length;
  /* pol: girih naqshli doira */
  const polT = kanvas(1024, 1024, (x, w, h)=>{ girih(x, w, h, {fon:'#2a241d', yulduz:'#3a3128', ich:'#4a3b2a', chiziq:'#1d1813', qadam:64, qalin:2}); const gr = x.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 2); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)'); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
  const pol = new T.Mesh(new T.CircleGeometry(8.2, 72), mat('#ffffff', {map:polT, roughness:.92, envMapIntensity:.08})); pol.rotation.x = -Math.PI / 2; pol.position.set(0, 0, -.4); g.add(pol);
  const polHosh = new T.Mesh(new T.TorusGeometry(8.2, .06, 8, 96), mat('#b8863b', {roughness:.35, metalness:.6})); polHosh.rotation.x = Math.PI / 2; polHosh.position.set(0, 0, -.4); g.add(polHosh);
  /* devor (orqa ark) */
  const devorT = kanvas(512, 256, (x, w, h)=>gisht(x, w, h, {fon:'#b89468', qh:10, qw:26}), true); devorT.repeat.set(6, 1.6);
  const devorM = mat('#ffffff', {map:devorT, roughness:.85});
  const kokM = mat('#1e5fa8', {roughness:.35, metalness:.05}), feruzaM = mat('#23a6b8', {roughness:.35}), oltinM = mat('#d6a64a', {roughness:.3, metalness:.75});
  const RAD = 6.6, MZ = 1.2, gr = {}, panel = {};
  K.forEach((k, i)=>{
    const a = (-62 + i * 124 / (N - 1)) * Math.PI / 180;
    const q = new T.Group(); q.position.set(Math.sin(a) * RAD, 0, MZ - Math.cos(a) * RAD); q.rotation.y = -a; g.add(q); gr[k] = q;
    const d = AL[k];
    const blok = new T.Mesh(new T.BoxGeometry(1.55, 3.4, .55), devorM); blok.position.set(0, 1.7, -.2); q.add(blok);
    const bosh = new T.Mesh(new T.BoxGeometry(1.62, .22, .62), kokM); bosh.position.set(0, 3.45, -.2); q.add(bosh);
    /* ravoqli panel: kanvas — girih fon, nom, yillar */
    const pT = kanvas(320, 560, (x, w, h)=>{
      const gg = x.createLinearGradient(0, 0, 0, h); gg.addColorStop(0, '#0f2f66'); gg.addColorStop(1, '#0a1f45'); x.fillStyle = gg; x.fillRect(0, 0, w, h);
      x.globalAlpha = .35; girih(x, w, h * .42, {fon:'rgba(0,0,0,0)', yulduz:'#2c5aa8', ich:d.rang, chiziq:'#081a3d', qadam:40, qalin:1.5}); x.globalAlpha = 1;
      x.fillStyle = d.rang; x.fillRect(24, h * .47, w - 48, 3);
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      const nomlar = d.nom.split(' '); const s1 = nomlar.slice(0, Math.ceil(nomlar.length / 2)).join(' '), s2 = nomlar.slice(Math.ceil(nomlar.length / 2)).join(' ');
      [[s1, .56], [s2, .63]].forEach(([t, yy])=>{ let fs = 30; do { x.font = '700 ' + fs + 'px Georgia, serif'; } while(x.measureText(t).width > w - 28 && --fs > 16); x.fillText(t, w / 2, h * yy); });
      const sig = (t, shr, fs, yy)=>{ do { x.font = shr.replace('#', fs); } while(x.measureText(t).width > w - 28 && --fs > 12); x.fillText(t, w / 2, h * yy); };
      x.fillStyle = '#f2cf86'; sig(d.yil, '600 #px Inter, sans-serif', 21, .72);
      x.fillStyle = '#b9c7e8'; sig(d.soha, 'italic 500 #px Georgia, serif', 19, .79);
      x.fillStyle = d.rang; sig(d.b, '600 #px Georgia, serif', 20, .87);
    });
    const pg = uvMosla(new T.ShapeGeometry(ravoqShakl(T, 1.2, 2.95, 2.05), 24));
    const pm = mat('#ffffff', {map:pT, roughness:.45, emissive:rang('#ffffff'), emissiveMap:pT, emissiveIntensity:.12});
    const pn = new T.Mesh(pg, pm); pn.position.set(0, .22, .08); q.add(pn); panel[k] = pn;
    const hoshC = ravoqShakl(T, 1.26, 3.0, 2.08).getPoints(40).map(p=>new T.Vector3(p.x, p.y + .2, .1));
    const hosh = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(hoshC, true), 90, .035, 6, true), oltinM); q.add(hosh);
    const ps = new T.Mesh(new T.BoxGeometry(1.3, .22, .2), feruzaM); ps.position.set(0, .11, .12); q.add(ps);
    /* poydevor (supa) va ramziy buyum */
    const supa = new T.Mesh(new T.CylinderGeometry(.38, .44, .78, 32), mat('#e9e1d2', {roughness:.35, metalness:.05})); supa.position.set(0, .39, 1.15); q.add(supa);
    const supaU = new T.Mesh(new T.CylinderGeometry(.44, .44, .06, 32), mat(d.rang, {roughness:.3, metalness:.35})); supaU.position.set(0, .8, 1.15); q.add(supaU);
    q.add(soya(.7, .7, 0, 0, 1.15, .8));
    const halqa = new T.Mesh(new T.TorusGeometry(.58, .02, 8, 60), new T.MeshBasicMaterial({color:0xf2c27a, transparent:true, opacity:0})); halqa.rotation.x = Math.PI / 2; halqa.position.set(0, .02, 1.15); q.add(halqa); q.userData.halqa = halqa;
    const b = new T.Group(); b.position.set(0, .83, 1.15); q.add(b); q.userData.buyum = b;
    BUYUM[k](A, b);
    q.traverse(m=>{ if(m.isMesh && m !== halqa) m.userData.nom = k; });
  });
  /* vaqt chizig‘i: VIII–XVI asrlar, pol ustida */
  const VX = y=>-5.6 + (y - 750) / (1550 - 750) * 11.2, VZ = 3.1;
  const vcT = kanvas(2048, 150, (x, w, h)=>{
    x.fillStyle = 'rgba(12,15,30,.92)'; x.fillRect(0, 0, w, h);
    for(let asr = 8; asr <= 15; asr++){
      const y0 = (asr - 1) * 100 + 1, x0 = Math.max(0, (y0 - 750) / 800 * w), x1 = (y0 + 99 - 750) / 800 * w;
      x.fillStyle = asr % 2 ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.0)'; x.fillRect(x0, 0, x1 - x0, h);
      x.fillStyle = '#f2dcae'; x.font = '700 50px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(['VIII','IX','X','XI','XII','XIII','XIV','XV'][asr - 8] + (asr > 8 ? ' asr' : ''), (x0 + x1) / 2, h / 2);
      x.fillStyle = 'rgba(217,196,154,.5)'; x.fillRect(x0, 0, 2, h);
    }
  });
  const vc = new T.Mesh(new T.PlaneGeometry(11.2, .82), mat('#ffffff', {map:vcT, roughness:.9, envMapIntensity:.05, emissive:rang('#ffffff'), emissiveMap:vcT, emissiveIntensity:.75})); vc.rotation.x = -Math.PI / 2; vc.position.set(0, .012, VZ); g.add(vc);
  const qatorZ = [VZ - .62, VZ - 1.2, VZ - 1.78], QATOR = {xorazmiy:0, fargoniy:1, forobiy:2, beruniy:0, ibnsino:1, ulugbek:0, navoiy:1, bobur:2};
  const bar = {};
  K.forEach((k, i)=>{
    const d = AL[k], w = VX(d.y1) - VX(d.y0), z = qatorZ[QATOR[k]];
    const m = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, .1, .26, 2, .04) : new T.BoxGeometry(w, .1, .26), mat(d.rang, {roughness:.4, emissive:rang(d.rang), emissiveIntensity:.15}));
    m.position.set((VX(d.y0) + VX(d.y1)) / 2, .06, z); m.userData.nom = k; g.add(m); bar[k] = m;
    Q.qosh('v' + k, d.q, langar(T, g, VX(d.y1) + .08, .12, z), kk=>tanla(kk.slice(1), true), 'shk vq');
  });
  let tanK = null;
  const faol = tugmalar(tag, [['umumiy', 'Hammasi'], ['|'], ...K.map(k=>[k, AL[k].q])], k=>tanla(k === 'umumiy' ? null : k, true));
  function tanla(k, yub){
    tanK = k; A.umumiy = !k; Q.belgila(k); faol(k || 'umumiy');
    K.forEach(x=>{ gr[x].userData.halqa.material.opacity = x === k ? .9 : 0; panel[x].material.emissiveIntensity = x === k ? .32 : .12; bar[x].material.emissiveIntensity = x === k ? .6 : .15; });
    if(!k){ Q.yoz('VIII–XVI asrlar', 'O‘rta asr allomalari', 'Nishni yoki buyumni bosing — batafsil karta chiqadi'); izoh.innerHTML = 'Galereyada sakkiz alloma: har birining nishida ismi, yillari va asosiy asari, oldida — ramziy buyum (portret emas). Pastdagi <b>vaqt chizig‘i</b> kim qaysi asrda yashaganini ko‘rsatadi.'; S.tikla(); return; }
    const d = AL[k], dk = ((window.MAKON_DETAL || {}).tr_alloma || {})[k];
    Q.yoz(d.yil, d.nom, d.soha);
    izoh.innerHTML = '<b>' + d.nom + '</b> (' + d.yil + '). ' + (dk ? dk.matn : '');
    const p = new T.Vector3(); gr[k].updateMatrixWorld(); p.set(0, 1.3, .7).applyMatrix4(gr[k].matrix);
    S.fokus(2.1, p, true);
    if(yub){ hodisa('tr-alloma', {nom:k}); hodisa('detal', {turD:'tr_alloma', nom:k}); }
  }
  S.bosish = d=>{ if(d.nom) tanla(d.nom, true); };
  S.ustida = d=>{ S.el.style.cursor = d ? 'pointer' : 'grab'; };
  S.kadrda = (dt, t)=>{
    K.forEach(k=>{ const b = gr[k].userData.buyum; b.rotation.y = Math.sin(t * .6 + k.length) * .25 + (k === tanK ? t * .5 : 0); });
    if(tanK) gr[tanK].userData.halqa.material.opacity = .55 + .35 * Math.sin(t * 3.2);
    Q.kadr();
  };
  S.holat = h=>{ if(h && h.alloma !== undefined && (!h.alloma || AL[h.alloma])) tanla(h.alloma || null, false); };
  const yopAsl = S.yopish; S.yopish = ()=>{ Q.yopish(); yopAsl(); };
  A.sigdir(6.6, 3.2, new T.Vector3(0, 1.15, -.6));
  tanla(null, false);
  if(o && o.holat) S.holat(o.holat);
  return S;
};
/* ramziy buyumlar (poydevor ustida, o‘lcham ~0.5) */
const BUYUM = {
  kitob(A, b, rang, matn, ochiq){
    const T = A.T, sT = A.kanvas(256, 160, (x, w, h)=>{ x.fillStyle = '#efe3c4'; x.fillRect(0, 0, w, h); x.fillStyle = '#3a2a1a'; x.font = '600 26px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      if(matn) x.fillText(matn, w / 2, h * .45); x.fillStyle = 'rgba(60,40,20,.35)'; for(let i = 0; i < 5; i++) x.fillRect(22, h * .62 + i * 10, w - 44, 2); });
    const muqova = A.mat(rang || '#6b2f24', {roughness:.6});
    if(ochiq){
      [-1, 1].forEach(s=>{ const v = new T.Mesh(new T.BoxGeometry(.26, .018, .34), muqova); v.position.set(s * .135, .02, 0); v.rotation.z = -s * .12; b.add(v);
        const bt = new T.Mesh(new T.PlaneGeometry(.24, .32), A.mat('#ffffff', {map:sT, roughness:.8})); bt.rotation.x = -Math.PI / 2; bt.rotation.y = -s * .12; bt.position.set(s * .13, .032 + .01, 0); b.add(bt); });
    } else {
      const k = new T.Mesh(new T.BoxGeometry(.3, .07, .4), [muqova, muqova, A.mat('#ffffff', {map:sT}), muqova, A.mat('#e8dcc0'), muqova]); k.position.y = .035; b.add(k);
    }
  },
  xorazmiy(A, b){ BUYUM.kitob(A, b, '#1f4f8a', 'x² + 10x = 39', true);
    const T = A.T; const l = new T.Mesh(new T.BoxGeometry(.16, .22, .02), A.mat('#e9dcc0')); l.position.set(.1, .14, -.14); l.rotation.set(-.3, -.3, 0); b.add(l); },
  fargoniy(A, b){
    const T = A.T, gT = A.kanvas(256, 256, (x, w, h)=>{ x.fillStyle = '#c99a3c'; x.fillRect(0, 0, w, h); x.strokeStyle = '#5a3f12'; x.lineWidth = 2;
      [120, 96, 70].forEach(r=>{ x.beginPath(); x.arc(128, 128, r, 0, 7); x.stroke(); });
      for(let i = 0; i < 72; i++){ const a = i / 72 * Math.PI * 2, r1 = i % 6 ? 112 : 104; x.beginPath(); x.moveTo(128 + Math.cos(a) * r1, 128 + Math.sin(a) * r1); x.lineTo(128 + Math.cos(a) * 120, 128 + Math.sin(a) * 120); x.stroke(); }
      x.beginPath(); x.moveTo(8, 128); x.lineTo(248, 128); x.moveTo(128, 8); x.lineTo(128, 248); x.stroke(); });
    const jez = A.mat('#c99a3c', {roughness:.3, metalness:.8});
    const disk = new T.Mesh(new T.CylinderGeometry(.22, .22, .025, 48), [jez, A.mat('#ffffff', {map:gT, roughness:.35, metalness:.6}), jez]); disk.rotation.x = Math.PI / 2; disk.position.y = .34; b.add(disk);
    const hl = new T.Mesh(new T.TorusGeometry(.225, .014, 8, 48), jez); hl.position.set(0, .34, .005); b.add(hl);
    const ilgak = new T.Mesh(new T.TorusGeometry(.04, .01, 8, 20), jez); ilgak.position.set(0, .59, 0); b.add(ilgak);
    const rete = new T.Mesh(new T.TorusGeometry(.13, .007, 6, 40), jez); rete.position.set(.03, .37, .02); b.add(rete);
    const alid = new T.Mesh(new T.BoxGeometry(.42, .012, .012), jez); alid.position.set(0, .34, .022); alid.rotation.z = .5; b.add(alid);
    const tag2 = new T.Mesh(new T.CylinderGeometry(.03, .06, .12, 16), jez); tag2.position.y = .06; b.add(tag2);
  },
  forobiy(A, b){
    const T = A.T, yog = A.mat('#8a4b22', {roughness:.45}), yog2 = A.mat('#5e3417', {roughness:.5});
    const tana = new T.Mesh(new T.SphereGeometry(.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), yog); tana.scale.set(1, .75, 1.35); tana.rotation.x = Math.PI / 2; tana.position.set(0, .22, 0); b.add(tana);
    const ust = new T.Mesh(new T.CircleGeometry(.2, 32), A.mat('#d8b27a', {roughness:.6})); ust.scale.set(1, 1.35, 1); ust.position.set(0, .22, .002); b.add(ust);
    const tesh = new T.Mesh(new T.CircleGeometry(.035, 20), A.mat('#2a1a0e')); tesh.position.set(0, .26, .004); b.add(tesh);
    const boyin = new T.Mesh(new T.BoxGeometry(.06, .26, .03), yog2); boyin.position.set(0, .56, -.01); b.add(boyin);
    const bosh = new T.Mesh(new T.BoxGeometry(.06, .1, .03), yog2); bosh.position.set(0, .72, -.04); bosh.rotation.x = -.8; b.add(bosh);
    for(let i = 0; i < 4; i++){ const s = new T.Mesh(new T.CylinderGeometry(.0025, .0025, .5, 4), A.mat('#eee6d0', {metalness:.5})); s.position.set(-.018 + i * .012, .47, .02); b.add(s); }
    b.rotation.z = .15;
  },
  beruniy(A, b){
    const T = A.T, yT = A.kanvas(512, 256, (x, w, h)=>{ x.fillStyle = '#e4d3a8'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(90,60,25,.55)'; x.lineWidth = 1.5;
      for(let i = 0; i <= 12; i++){ x.beginPath(); x.moveTo(i * w / 12, 0); x.lineTo(i * w / 12, h); x.stroke(); }
      for(let j = 1; j < 6; j++){ x.beginPath(); x.moveTo(0, j * h / 6); x.lineTo(w, j * h / 6); x.stroke(); }
      x.fillStyle = 'rgba(80,110,70,.45)'; [[180, 70, 70, 40], [260, 90, 90, 50], [300, 60, 60, 25], [110, 150, 40, 50], [380, 160, 30, 30]].forEach(([cx, cy, rx, ry])=>{ x.beginPath(); x.ellipse(cx, cy, rx, ry, .3, 0, 7); x.fill(); }); });
    const sh = new T.Mesh(new T.SphereGeometry(.2, 40, 24), A.mat('#ffffff', {map:yT, roughness:.55})); sh.position.y = .38; sh.rotation.z = .41; b.add(sh);
    const jez = A.mat('#b8863b', {roughness:.3, metalness:.8});
    const mer = new T.Mesh(new T.TorusGeometry(.225, .01, 8, 60, Math.PI * 1.4), jez); mer.position.y = .38; mer.rotation.z = -Math.PI * .2 + .41; b.add(mer);
    const oyoq = new T.Mesh(new T.CylinderGeometry(.02, .02, .16, 12), jez); oyoq.position.y = .1; b.add(oyoq);
    const asos2 = new T.Mesh(new T.CylinderGeometry(.1, .12, .03, 24), jez); asos2.position.y = .015; b.add(asos2);
  },
  ibnsino(A, b){
    const T = A.T; ['#6b2f24', '#1f4f8a', '#2f6b3a', '#7a5a1c', '#4a2f6b'].forEach((c, i)=>{ const k = new T.Mesh(new T.BoxGeometry(.3 - i * .012, .045, .38 - i * .01), [A.mat(c), A.mat(c), A.mat('#e8dcc0'), A.mat(c), A.mat('#e8dcc0'), A.mat(c)]); k.position.set(-.06, .023 + i * .047, 0); k.rotation.y = (i % 2 ? .08 : -.06); b.add(k); });
    const hovon = new T.Mesh(new T.LatheGeometry([[.0, 0], [.07, 0], [.09, .03], [.1, .1], [.09, .14], [.08, .14], [.075, .05], [0, .04]].map(p=>new T.Vector2(p[0], p[1])), 28), A.mat('#b9a58a', {roughness:.5, side:A.T.DoubleSide}));
    hovon.position.set(.2, 0, .12); b.add(hovon);
    const dasta = new T.Mesh(new T.CylinderGeometry(.012, .018, .2, 10), A.mat('#8c7a62')); dasta.position.set(.22, .15, .12); dasta.rotation.z = -.4; b.add(dasta);
  },
  ulugbek(A, b){
    const T = A.T, mar = A.mat('#e8e2d6', {roughness:.3}), jez = A.mat('#c99a3c', {roughness:.3, metalness:.8});
    const pog = new T.Mesh(new T.BoxGeometry(.5, .06, .24), mar); pog.position.y = .03; b.add(pog);
    const yoy = new T.Mesh(new T.TorusGeometry(.42, .035, 10, 40, Math.PI / 3), mar); yoy.position.set(-.21, .06, 0); yoy.rotation.z = 0; b.add(yoy);
    const yoy2 = new T.Mesh(new T.TorusGeometry(.42, .012, 8, 40, Math.PI / 3), jez); yoy2.position.set(-.21, .06, .036); b.add(yoy2);
    for(let i = 0; i <= 10; i++){ const a = i / 10 * Math.PI / 3, t = new T.Mesh(new T.BoxGeometry(.004, .03, .01), jez); t.position.set(-.21 + Math.cos(a) * .42, .06 + Math.sin(a) * .42, .045); t.rotation.z = a; b.add(t); }
    const yul = new T.Mesh(new T.OctahedronGeometry(.045), A.mat('#fff4c8', {emissive:A.rang('#ffd76a'), emissiveIntensity:.8})); yul.position.set(.12, .5, 0); b.add(yul);
  },
  navoiy(A, b){
    BUYUM.kitob(A, b, '#7a1f3a', 'Xamsa', true);
    const T = A.T, siyoh = new T.Mesh(new T.LatheGeometry([[0, 0], [.05, 0], [.06, .03], [.05, .07], [.025, .08], [.025, .1], [0, .1]].map(p=>new T.Vector2(p[0], p[1])), 24), A.mat('#1c2a4a', {roughness:.2, metalness:.3}));
    siyoh.position.set(.22, 0, -.12); b.add(siyoh);
    const qalam = new T.Mesh(new T.CylinderGeometry(.006, .01, .3, 8), A.mat('#c8a064')); qalam.position.set(.2, .16, -.1); qalam.rotation.set(.3, 0, -.35); b.add(qalam);
  },
  bobur(A, b){
    const T = A.T, yer = new T.Mesh(new T.BoxGeometry(.46, .03, .46), A.mat('#8a6a45')); yer.position.y = .015; b.add(yer);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz])=>{ const p = new T.Mesh(new T.BoxGeometry(.19, .02, .19), A.mat('#4f7d35')); p.position.set(sx * .11, .035, sz * .11); b.add(p);
      const d = new T.Mesh(new T.ConeGeometry(.035, .12, 10), A.mat('#2f5d25')); d.position.set(sx * .11, .1, sz * .11); b.add(d); });
    const suvM = A.mat('#4aa3d8', {roughness:.1, metalness:.1});
    const s1 = new T.Mesh(new T.BoxGeometry(.44, .022, .035), suvM); s1.position.y = .035; b.add(s1);
    const s2 = new T.Mesh(new T.BoxGeometry(.035, .022, .44), suvM); s2.position.y = .035; b.add(s2);
    const hov = new T.Mesh(new T.CylinderGeometry(.05, .05, .025, 20), suvM); hov.position.y = .037; b.add(hov);
    const k = new T.Group(); k.position.set(0, .05, .3); b.add(k); BUYUM.kitob(A, k, '#2f5d25', 'Boburnoma', false); k.scale.setScalar(.7); k.rotation.x = -.2;
  }
};

/* ================= 3. REGISTON ================= */
const RG = {
  ulugbek:{nom:'Ulug‘bek madrasasi', yil:'1417–1420', kim:'Mirzo Ulug‘bek', rang:'#f2b544'},
  sherdor:{nom:'Sherdor madrasasi', yil:'1619–1636', kim:'Yalangto‘sh Bahodir', rang:'#e0655a'},
  tillakori:{nom:'Tillakori madrasasi', yil:'1646–1660', kim:'Yalangto‘sh Bahodir', rang:'#3fb4c8'}
};
const QISM_IZOH = {
  peshtoq:'<b>Peshtoq</b> — binoning baland, to‘rtburchak kirish ravog‘i (portal). Uning ichidagi chuqur ravoq — <b>ayvon</b>.',
  minora:'<b>Minora</b> — baland, yuqoriga torayib boruvchi mezana. Registonda minoralar binoning burchaklarida turadi.',
  gumbaz:'<b>Gumbaz</b> — qovurg‘ali (tarvuzsimon) feruza gumbaz baland <b>baraban</b> (silindr) ustiga qurilgan.',
  devor:'<b>Tashqi devor</b> — ikki qavatli ravoqli nishlar (ichkarida ularga mos talabalar hujralari) va koshin bezaklar.',
  guldasta:'<b>Guldasta</b> — burchakdagi kichik, past minora.'
};
R.tr_registon = async (sahna, {tag, izoh, yorliq, o})=>{
  const A = asos(sahna, {rx:.52, ry:.42, rxMin:.05, rxMax:1.25, fov:32, env:.65, ekspozitsiya:1.1});
  const {S, T, mat, kanvas, soya, rang} = A, g = S.g;
  if(yorliq) yorliq('Tarix · Registon maydoni · soddalashtirilgan model (proporsiyalar taxminiy)');
  const Q = qatlam(sahna, S, {manba:'Soddalashtirilgan model: o‘lcham va bezaklar sxematik, balandliklar taxminiy'});
  /* maydon toshi */
  const polT = kanvas(512, 512, (x, w, h)=>{ x.fillStyle = '#a8977a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(70,58,42,.5)'; x.lineWidth = 2;
    for(let i = 0; i <= 8; i++){ x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); }
    let s = 5; const rnd = ()=>{ s = (s * 16807) % 2147483647; return s / 2147483647; }; for(let i = 0; i < 1600; i++){ x.fillStyle = rnd() > .5 ? 'rgba(70,55,40,.08)' : 'rgba(255,245,225,.08)'; x.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 6, 2 + rnd() * 6); } }, true);
  polT.repeat.set(5, 5);
  const yonM = mat('#5d5242', {roughness:.95, envMapIntensity:.1});
  const maydon = new T.Mesh(new T.BoxGeometry(22, .3, 20), [yonM, yonM, mat('#cfc2aa', {map:polT, roughness:.97, envMapIntensity:.08}), yonM, yonM, yonM]); maydon.position.set(0, -.15, -1); g.add(maydon);
  g.add(soya(11, 10, 0, -.3, -1, .9));
  const gT = kanvas(512, 512, (x, w, h)=>gisht(x, w, h, {fon:'#c7a574', qh:9, qw:24}), true);
  const gishtM = (rx, ry)=>{ const t = gT.clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return mat('#ffffff', {map:t, roughness:.88}); };
  const feruza = mat('#1fa3b6', {roughness:.32, metalness:.08, envMapIntensity:.9}), kok = mat('#1c4f9c', {roughness:.35}), oq = mat('#ece6d8', {roughness:.5});
  /* fasad (ravoqli nishlar, 2 qavat) teksturasi */
  const fasadT = (nx, rangN)=>kanvas(1024, 256, (x, w, h)=>{
    gisht(x, w, h, {fon:'#c9a676', qh:8, qw:22});
    x.fillStyle = '#1b4f9a'; x.fillRect(0, 0, w, 14); x.fillStyle = '#1fa3b6'; x.fillRect(0, 14, w, 5);
    for(let r = 0; r < 2; r++) for(let i = 0; i < nx; i++){
      const cw = w / nx, x0 = i * cw + cw * .16, y0 = 30 + r * 112, ww = cw * .68, hh = 96;
      ravoqYol(x, x0 - 5, y0 - 5, ww + 10, hh + 5, hh * .55); x.fillStyle = rangN || '#1c5aa6'; x.fill();
      ravoqYol(x, x0, y0, ww, hh, hh * .55); const gg = x.createLinearGradient(0, y0, 0, y0 + hh); gg.addColorStop(0, '#3a2c1f'); gg.addColorStop(1, '#1a130c'); x.fillStyle = gg; x.fill();
    }
  });
  /* peshtoq teksturasi */
  function peshtoqT(tur, W, H, aw, ah, ahs){
    const cw = 512, ch = Math.round(512 * H / W);
    return kanvas(cw, ch, (x, w, h)=>{
      const X = v=>(v / W + .5) * w, Y = v=>(1 - v / H) * h;
      gisht(x, w, h, {fon:'#caa878', qh:8, qw:22});
      /* chekka hoshiya — yozuv bandi */
      const b = w * .07;
      x.fillStyle = '#16438a'; x.fillRect(0, 0, w, h); x.fillStyle = '#caa878';
      x.fillStyle = '#f0e8d6'; for(let yy = 6; yy < h; yy += 22){ x.fillRect(b * .3, yy, b * .4, 10); x.fillRect(w - b * .7, yy, b * .4, 10); } for(let xx = b; xx < w - b; xx += 24) x.fillRect(xx, b * .3, 12, b * .4);
      /* ichki maydon — timpan */
      const ix = b, iy = b, iw = w - 2 * b, ih = h - b;
      if(tur === 'ulugbek'){
        x.save(); x.beginPath(); x.rect(ix, iy, iw, ih); x.clip();
        x.fillStyle = '#123a78'; x.fillRect(ix, iy, iw, ih);
        for(let j = 0; j < 8; j++) for(let i = 0; i < 6; i++){ const cx = ix + (i + (j % 2 ? .5 : 0)) * iw / 5, cy = iy + j * 44; yulduz8(x, cx, cy, 20, .5); x.fillStyle = '#e9eef7'; x.fill(); yulduz8(x, cx, cy, 9, .5); x.fillStyle = '#1fa3b6'; x.fill(); }
        /* katta yulduz rozetka */
        const rx = w / 2, ry = Y(H * .88);
        for(let k = 3; k >= 1; k--){ yulduz8(x, rx, ry, 30 * k, .72); x.fillStyle = k % 2 ? '#f2d58a' : '#1c5aa6'; x.fill(); }
        x.restore();
      } else if(tur === 'sherdor'){
        x.save(); x.beginPath(); x.rect(ix, iy, iw, ih); x.clip();
        const gg = x.createLinearGradient(0, iy, 0, iy + ih * .5); gg.addColorStop(0, '#1b56a8'); gg.addColorStop(1, '#154486'); x.fillStyle = gg; x.fillRect(ix, iy, iw, ih);
        x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 2; for(let i = 0; i < 24; i++){ x.beginPath(); x.arc(ix + (i % 6) * iw / 5, iy + Math.floor(i / 6) * 60 + 60, 18, 0, 7); x.stroke(); }
        x.restore();
        /* ikki tomonda: yo‘lbarssimon sher kiyikni quvmoqda, orqasida odam yuzli quyosh */
        [-1, 1].forEach(s=>{
          const cx = w / 2 + s * w * .3, cy = Y(ahs + (ah - ahs) * .62);
          x.save(); x.translate(cx, cy); x.scale(-s, 1);
          /* quyosh */
          x.save(); x.translate(-10, -52); x.fillStyle = '#f7c948'; x.beginPath(); x.arc(0, 0, 22, 0, 7); x.fill();
          for(let i = 0; i < 16; i++){ x.rotate(Math.PI / 8); x.beginPath(); x.moveTo(24, -3); x.lineTo(34, 0); x.lineTo(24, 3); x.fill(); }
          x.fillStyle = '#fbe9c4'; x.beginPath(); x.arc(0, 2, 14, 0, 7); x.fill(); x.fillStyle = '#5a3b12'; x.beginPath(); x.arc(-5, 0, 1.8, 0, 7); x.arc(5, 0, 1.8, 0, 7); x.fill(); x.fillRect(-4, 7, 8, 1.6); x.restore();
          /* sher (yo‘lbarssimon): tana, bosh, oyoqlar, dum, yo‘llar */
          x.fillStyle = '#f09a2a'; x.beginPath(); x.ellipse(0, 0, 40, 15, 0, 0, 7); x.fill();
          x.beginPath(); x.arc(38, -8, 13, 0, 7); x.fill(); x.fillStyle = '#f6c56a'; x.beginPath(); x.arc(36, -8, 17, Math.PI * .6, Math.PI * 1.6); x.fill(); x.fillStyle = '#f09a2a'; x.beginPath(); x.arc(40, -8, 11, 0, 7); x.fill();
          x.fillStyle = '#2a1a0a'; x.beginPath(); x.arc(44, -11, 2, 0, 7); x.fill();
          x.fillStyle = '#f09a2a'; [[-28, 10], [-16, 12], [18, 12], [30, 10]].forEach(([lx, ly], i)=>{ x.save(); x.translate(lx, ly); x.rotate(i % 2 ? .5 : -.5); x.fillRect(-3, 0, 6, 20); x.restore(); });
          x.strokeStyle = '#f09a2a'; x.lineWidth = 4; x.beginPath(); x.moveTo(-38, -2); x.quadraticCurveTo(-60, -28, -50, -40); x.stroke();
          x.strokeStyle = '#3a220c'; x.lineWidth = 3; for(let i = 0; i < 6; i++){ x.beginPath(); x.moveTo(-26 + i * 9, -13); x.lineTo(-22 + i * 9, 0); x.stroke(); }
          /* kiyik (oq) */
          x.fillStyle = '#f4efe4'; x.beginPath(); x.ellipse(90, 8, 20, 9, 0, 0, 7); x.fill(); x.beginPath(); x.arc(110, -2, 6, 0, 7); x.fill();
          [[78, 14], [84, 15], [98, 15], [104, 14]].forEach(([lx, ly])=>x.fillRect(lx, ly, 3, 16));
          x.strokeStyle = '#f4efe4'; x.lineWidth = 2; x.beginPath(); x.moveTo(110, -8); x.lineTo(106, -20); x.moveTo(112, -8); x.lineTo(116, -19); x.stroke();
          x.restore();
        });
      } else {
        x.save(); x.beginPath(); x.rect(ix, iy, iw, ih); x.clip();
        x.fillStyle = '#1a4f95'; x.fillRect(ix, iy, iw, ih);
        for(let j = 0; j < 14; j++) for(let i = 0; i < 9; i++){ const cx = ix + (i + (j % 2 ? .5 : 0)) * iw / 8, cy = iy + j * 34;
          x.fillStyle = '#f2d58a'; for(let k = 0; k < 6; k++){ x.beginPath(); x.ellipse(cx + Math.cos(k * Math.PI / 3) * 7, cy + Math.sin(k * Math.PI / 3) * 7, 5, 2.5, k * Math.PI / 3, 0, 7); x.fill(); }
          x.fillStyle = '#e9eef7'; x.beginPath(); x.arc(cx, cy, 3, 0, 7); x.fill(); }
        x.restore();
      }
      /* ravoq teshigi atrofidagi hoshiya */
      x.save(); x.translate(0, 0);
      x.beginPath(); x.moveTo(X(-aw / 2 - .08), Y(0)); x.lineTo(X(-aw / 2 - .08), Y(ahs));
      x.bezierCurveTo(X(-aw / 2 - .08), Y(ahs + (ah - ahs) * .55), X(-(aw + .16) * .12), Y(ah + .08 - (ah - ahs) * .12), X(0), Y(ah + .1));
      x.bezierCurveTo(X((aw + .16) * .12), Y(ah + .08 - (ah - ahs) * .12), X(aw / 2 + .08), Y(ahs + (ah - ahs) * .55), X(aw / 2 + .08), Y(ahs));
      x.lineTo(X(aw / 2 + .08), Y(0)); x.lineWidth = 10; x.strokeStyle = '#1fa3b6'; x.stroke(); x.lineWidth = 3; x.strokeStyle = '#f0e8d6'; x.stroke();
      x.restore();
    });
  }
  /* ayvon ichi (orqa devor) teksturasi: muqarnasga o‘xshash yacheykalar + eshik */
  const ayvonT = kanvas(256, 384, (x, w, h)=>{
    x.fillStyle = '#1a3f7a'; x.fillRect(0, 0, w, h);
    for(let j = 0; j < 7; j++) for(let i = 0; i < 6; i++){ ravoqYol(x, i * w / 6 + 3 + (j % 2 ? w / 12 : 0), j * 26 + 4, w / 6 - 6, 22, 10); x.fillStyle = j % 2 ? '#2a66b8' : '#e9eef7'; x.globalAlpha = .7; x.fill(); x.globalAlpha = 1; }
    ravoqYol(x, w * .3, h * .55, w * .4, h * .45, h * .3); x.fillStyle = '#2b1c10'; x.fill();
    ravoqYol(x, w * .3 - 6, h * .55 - 6, w * .4 + 12, h * .45 + 6, h * .3); x.lineWidth = 5; x.strokeStyle = '#1fa3b6'; x.stroke();
  });
  const minoraT = kanvas(256, 512, (x, w, h)=>{
    gisht(x, w, h, {fon:'#c9a676', qh:8, qw:20});
    x.strokeStyle = '#1c5aa6'; x.lineWidth = 7;
    for(let i = -8; i < 16; i++){ x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32 + h / 2, h); x.stroke(); x.beginPath(); x.moveTo(i * 32 + h / 2, 0); x.lineTo(i * 32, h); x.stroke(); }
    x.fillStyle = '#1fa3b6'; x.fillRect(0, 0, w, 18); x.fillRect(0, h - 22, w, 22); x.fillStyle = '#f0e8d6'; for(let xx = 4; xx < w; xx += 16) x.fillRect(xx, h - 16, 8, 8);
  }, true);
  function minora(q, x, z, hgt, r){
    const m = new T.Group(); m.position.set(x, 0, z); q.add(m);
    const t = minoraT.clone(); t.needsUpdate = true; t.repeat.set(2, Math.max(1, Math.round(hgt / 1.2)));
    const tana = new T.Mesh(new T.CylinderGeometry(r * .8, r, hgt, 28), mat('#ffffff', {map:t, roughness:.8})); tana.position.y = hgt / 2; m.add(tana);
    const bal = new T.Mesh(new T.CylinderGeometry(r * 1.12, r * .85, .22, 28), kok); bal.position.y = hgt + .08; m.add(bal);
    const fonar = new T.Mesh(new T.CylinderGeometry(r * .78, r * .78, .3, 16), oq); fonar.position.y = hgt + .34; m.add(fonar);
    for(let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2, d = new T.Mesh(new T.BoxGeometry(.06, .17, .02), mat('#2b1c10')); d.position.set(Math.cos(a) * r * .79, hgt + .34, Math.sin(a) * r * .79); d.rotation.y = -a + Math.PI / 2; m.add(d); }
    const qop = new T.Mesh(new T.SphereGeometry(r * .82, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), feruza); qop.position.y = hgt + .49; m.add(qop);
    tana.userData.qism = bal.userData.qism = fonar.userData.qism = qop.userData.qism = 'minora';
    return m;
  }
  function gumbaz(q, x, y, z, r, hDrum){
    const d = new T.Group(); d.position.set(x, y, z); q.add(d);
    const bT = kanvas(512, 64, (c, w, h)=>{ c.fillStyle = '#1c4f9c'; c.fillRect(0, 0, w, h); c.fillStyle = '#f0e8d6'; c.font = '700 30px Georgia, serif'; c.textBaseline = 'middle'; for(let i = 0; i < 12; i++){ c.fillRect(i * 44 + 6, 14, 26, 6); c.fillRect(i * 44 + 16, 20, 6, 26); c.fillRect(i * 44 + 6, 44, 26, 6); } c.fillStyle = '#1fa3b6'; c.fillRect(0, 0, w, 6); c.fillRect(0, h - 6, w, 6); }, true);
    bT.repeat.set(2, 1);
    const baraban = new T.Mesh(new T.CylinderGeometry(r * .95, r, hDrum, 40, 1, true), mat('#ffffff', {map:bT, roughness:.5})); baraban.position.y = hDrum / 2; d.add(baraban);
    const pts = [[1, 0], [1.07, .22], [1.1, .48], [1.03, .78], [.86, 1.02], [.62, 1.2], [.34, 1.33], [.12, 1.4], [.001, 1.42]].map(([a, b])=>new T.Vector2(a * r, b * r));
    const gg = new T.LatheGeometry(pts, 64), p = gg.attributes.position;
    for(let i = 0; i < p.count; i++){ const X = p.getX(i), Z = p.getZ(i), th = Math.atan2(Z, X), k = 1 - .07 * (1 - Math.abs(Math.cos(16 * th))); p.setX(i, X * k); p.setZ(i, Z * k); }
    gg.computeVertexNormals();
    const gm = new T.Mesh(gg, feruza); gm.position.y = hDrum; d.add(gm);
    const uch = new T.Mesh(new T.ConeGeometry(.04, .3, 8), mat('#d6a64a', {metalness:.8, roughness:.3})); uch.position.y = hDrum + r * 1.42 + .1; d.add(uch);
    baraban.userData.qism = gm.userData.qism = uch.userData.qism = 'gumbaz';
    return d;
  }
  /* madrasa: fasad +z tomonga qaragan, markaz x = 0, fasad z = 0 */
  function madrasa(k, o2){
    const q = new T.Group(); g.add(q);
    const {W, D, Hb, Wp, Hp, aw, ah, ahs} = o2;
    const bT = fasadT(o2.nish || 8);
    const yon = gishtM(D / 2, Hb / 2), orq = gishtM(W / 2, Hb / 2);
    /* ichi ochiq hovli: to‘rt qanot (old, orqa, ikki yon), ichki tomonida ravoqli hujralar */
    const tom = mat('#b19872', {roughness:.95}), fM = mat('#ffffff', {map:bT, roughness:.8});
    const cw = W * .62, cd = D * .55, cz = -D * .55, fz = cz + cd / 2, bz = cz - cd / 2;
    const ichT = (n, rx)=>{ const t = fasadT(n, '#1f6fb0'); t.wrapS = T.RepeatWrapping; t.repeat.set(rx || 1, 1); return mat('#ffffff', {map:t, roughness:.8}); };
    const ichX = ichT(Math.max(4, Math.round(cw / .7))), ichZ = ichT(Math.max(3, Math.round(cd / .7)));
    const qanot = (w, d, x, z, m)=>{ const b2 = new T.Mesh(new T.BoxGeometry(w, Hb, d), m); b2.position.set(x, Hb / 2, z); b2.userData.qism = 'devor'; q.add(b2); return b2; };
    qanot(W, -fz, 0, fz / 2, [yon, yon, tom, yon, fM, ichX]);
    qanot(W, D + bz, 0, (bz - D) / 2, [yon, yon, tom, yon, ichX, orq]);
    const sw = (W - cw) / 2;
    qanot(sw, cd, -(cw + sw) / 2, cz, [ichZ, yon, tom, yon, yon, yon]);
    qanot(sw, cd, (cw + sw) / 2, cz, [yon, ichZ, tom, yon, yon, yon]);
    const hovli = new T.Mesh(new T.PlaneGeometry(cw, cd), mat('#8a7a60', {roughness:1, envMapIntensity:.05})); hovli.rotation.x = -Math.PI / 2; hovli.position.set(0, .01, cz); q.add(hovli);
    q.add(soya(cw * .5, cd * .5, 0, .005, cz, .55));
    const hovz = new T.Mesh(new T.CylinderGeometry(.22, .24, .06, 24), mat('#3f8fb0', {roughness:.15, metalness:.1})); hovz.position.set(0, .04, cz); q.add(hovz);
    const karniz = new T.Mesh(new T.BoxGeometry(W + .04, .09, .12), kok); karniz.position.set(0, Hb + .045, -.04); karniz.userData.qism = 'devor'; q.add(karniz);
    /* peshtoq: teshikli ekstruziya + ayvon ichi */
    const sh = new T.Shape(); sh.moveTo(-Wp / 2, 0); sh.lineTo(Wp / 2, 0); sh.lineTo(Wp / 2, Hp); sh.lineTo(-Wp / 2, Hp); sh.closePath();
    sh.holes.push(ravoqTeshik(T, aw, ah, ahs, 0));
    const pg = new T.ExtrudeGeometry(sh, {depth:.55, bevelEnabled:false, curveSegments:20});
    const pT = peshtoqT(k, Wp, Hp, aw, ah, ahs); pT.repeat.set(1 / Wp, 1 / Hp); pT.offset.set(.5, 0);
    const pm = new T.Mesh(pg, [mat('#ffffff', {map:pT, roughness:.55}), mat('#c7a574', {roughness:.85})]); pm.position.set(0, 0, -.2); pm.userData.qism = 'peshtoq'; q.add(pm);
    const ich = new T.Mesh(uvMosla(new T.ShapeGeometry(ravoqShakl(T, aw, ah, ahs), 20)), mat('#ffffff', {map:ayvonT, roughness:.6})); ich.position.set(0, 0, -.62); ich.userData.qism = 'peshtoq'; q.add(ich);
    const ichY = new T.Mesh(new T.BoxGeometry(aw, .02, .45), mat('#8f7f66')); ichY.position.set(0, .01, -.4); q.add(ichY);
    const tepa = new T.Mesh(new T.BoxGeometry(Wp + .05, .08, .6), kok); tepa.position.set(0, Hp + .04, .075); tepa.userData.qism = 'peshtoq'; q.add(tepa);
    (o2.minora || []).forEach(([x, z, h, r])=>minora(q, x, z, h, r || .3));
    (o2.gumbaz || []).forEach(([x, y, z, r, hd])=>gumbaz(q, x, y, z, r, hd));
    (o2.guldasta || []).forEach(([x, z])=>{ const m = minora(q, x, z, Hb + .5, .2); m.traverse(c=>{ if(c.isMesh) c.userData.qism = 'guldasta'; }); });
    q.add(soya(W * .62, D * .6, 0, 0, -D / 2, .75));
    q.traverse(m=>{ if(m.isMesh){ m.userData.nom = k; } });
    return q;
  }
  const gr = {};
  /* Ulug‘bek: g‘arb tomonda, sharqqa qaragan */
  gr.ulugbek = madrasa('ulugbek', {W:5.6, D:5, Hb:1.9, Wp:2.5, Hp:3.3, aw:1.35, ah:2.55, ahs:1.55, nish:9, minora:[[-2.8, 0, 3.3, .32], [2.8, 0, 3.3, .32], [-2.8, -5, 3.3, .32], [2.8, -5, 3.3, .32]]});
  gr.ulugbek.position.set(-4.3, 0, -.2); gr.ulugbek.rotation.y = Math.PI / 2;
  /* Sherdor: sharq tomonda, g‘arbga qaragan (Ulug‘bekka ro‘para) */
  gr.sherdor = madrasa('sherdor', {W:5.7, D:5, Hb:1.9, Wp:2.5, Hp:3.15, aw:1.3, ah:2.4, ahs:1.45, nish:9, minora:[[-2.85, 0, 3.1, .31], [2.85, 0, 3.1, .31]], gumbaz:[[-1.95, 1.9, -1.1, .62, .7], [1.95, 1.9, -1.1, .62, .7]]});
  gr.sherdor.position.set(4.3, 0, -.2); gr.sherdor.rotation.y = -Math.PI / 2;
  /* Tillakori: shimolda, janubga qaragan */
  gr.tillakori = madrasa('tillakori', {W:7.5, D:5, Hb:1.9, Wp:2.3, Hp:2.75, aw:1.2, ah:2.1, ahs:1.25, nish:12, guldasta:[[-3.75, 0], [3.75, 0]], gumbaz:[[-2.4, 1.9, -1.6, .85, .8]]});
  gr.tillakori.position.set(0, 0, -4.6);
  /* yorliqlar */
  const LJ = {ulugbek:[-3.4, 3.6, -.2], sherdor:[3.4, 3.5, -.2], tillakori:[0, 3.1, -4]};
  Object.keys(RG).forEach(k=>Q.qosh(k, '<b>' + RG[k].nom + '</b><span>' + RG[k].yil + '</span>', langar(T, g, ...LJ[k]), kk=>tanla(kk, true)));
  const kompas = kanvas(128, 128, (x, w, h)=>{ x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h); x.fillStyle = '#e0a458'; x.beginPath(); x.moveTo(64, 10); x.lineTo(76, 64); x.lineTo(64, 56); x.lineTo(52, 64); x.closePath(); x.fill(); x.fillStyle = '#f4efe4'; x.font = '700 30px Georgia, serif'; x.textAlign = 'center'; x.fillText('Sh', 64, 100); });
  const kp = new T.Mesh(new T.PlaneGeometry(.9, .9), new T.MeshBasicMaterial({map:kompas, transparent:true, depthWrite:false})); kp.rotation.x = -Math.PI / 2; kp.position.set(-8, .01, 3.6); g.add(kp);
  let tanK = null;
  const faol = tugmalar(tag, [['umumiy', 'Maydon'], ['|'], ...Object.keys(RG).map(k=>[k, RG[k].nom.replace(' madrasasi', '')])], k=>tanla(k === 'umumiy' ? null : k, true));
  const FOK = {ulugbek:[new T.Vector3(-4.3, 1.6, -.2), 3.3], sherdor:[new T.Vector3(4.3, 1.6, -.2), 3.3], tillakori:[new T.Vector3(0, 1.4, -4.6), 3.6]};
  function tanla(k, yub, qism){
    tanK = k; A.umumiy = !k; Q.belgila(k); faol(k || 'umumiy');
    if(!k){ Q.yoz('Samarqand · XV–XVII asrlar', 'Registon maydoni', 'Madrasani bosing — tarixi chiqadi'); izoh.innerHTML = 'Registon — uch madrasadan iborat ansambl: g‘arbda <b>Ulug‘bek</b> (1417–1420), sharqda <b>Sherdor</b> (1619–1636), shimolda <b>Tillakori</b> (1646–1660). Model soddalashtirilgan: balandlik va bezaklar taxminiy. Peshtoq, minora yoki gumbazni bosing.'; S.tikla(); return; }
    const d = RG[k], dk = ((window.MAKON_DETAL || {}).tr_bino || {})[k];
    Q.yoz(d.yil + ' · ' + d.kim, d.nom, qism ? QISM_IZOH[qism].replace(/<[^>]+>/g, '').split(' — ')[0] : 'Qismni bosing: peshtoq, minora, gumbaz');
    izoh.innerHTML = '<b>' + d.nom + '</b> (' + d.yil + ', qurdirgan: ' + d.kim + '). ' + (qism ? QISM_IZOH[qism] + ' ' : '') + (dk ? dk.matn : '');
    if(yub !== 'q') S.fokus(FOK[k][1], FOK[k][0], true);
    if(yub){ hodisa('tr-bino', {nom:k, qism:qism || null}); hodisa('detal', {turD:'tr_bino', nom:k}); }
  }
  S.bosish = (d, ob)=>{ if(!d.nom) return; if(d.nom === tanK && d.qism){ tanla(d.nom, 'q', d.qism); hodisa('tr-bino', {nom:d.nom, qism:d.qism}); } else tanla(d.nom, true, d.qism); };
  S.ustida = d=>{ S.el.style.cursor = d ? 'pointer' : 'grab'; };
  S.kadrda = ()=>Q.kadr();
  S.holat = h=>{ if(h && h.bino !== undefined && (!h.bino || RG[h.bino])) tanla(h.bino || null, false); };
  const yopAsl = S.yopish; S.yopish = ()=>{ Q.yopish(); yopAsl(); };
  A.sigdir(10.2, 5.6, new T.Vector3(0, 1.4, -2.2));
  tanla(null, false);
  if(o && o.holat) S.holat(o.holat);
  return S;
};

/* ================= 4. XONLIKLAR (2D sxematik xarita) ================= */
/* poligonlar [lon, lat] — SXEMATIK, qo‘lda chizilgan (XIX asr chegaralari aniq belgilanmagan, ko‘chmanchi hududlar bahsli) */
const XN_P = {
  xiva:[[55.6,41.2],[56.3,42.7],[57.6,43.9],[59.2,44.5],[60.9,44.2],[61.7,43.3],[62.0,42.1],[61.5,41.3],[60.9,40.7],[59.6,40.2],[58.2,40.0],[56.8,40.3]],
  buxoro:[[62.6,39.8],[63.3,40.6],[64.3,41.2],[65.8,41.1],[67.2,40.7],[68.0,40.2],[68.8,39.7],[69.2,39.2],[69.6,38.6],[70.2,38.0],[69.6,37.3],[68.3,37.1],[67.3,37.15],[66.3,37.35],[65.3,37.7],[64.4,38.3],[63.7,38.9],[63.1,39.3]],
  qoqon:[[65.3,45.0],[66.8,44.9],[68.3,44.0],[69.9,43.6],[71.5,43.2],[73.2,43.1],[74.8,43.0],[76.5,42.4],[76.2,41.4],[74.8,40.9],[73.9,40.3],[74.0,39.5],[73.0,39.2],[71.5,39.4],[70.3,39.6],[69.4,39.9],[68.9,40.3],[68.5,40.8],[68.1,41.4],[67.4,42.3],[66.6,43.3],[65.6,44.2]],
  xiva2:[[55.6,41.2],[56.3,42.7],[57.6,43.9],[58.9,43.9],[59.5,43.0],[60.3,42.1],[60.9,41.5],[61.3,41.0],[60.6,40.5],[59.6,40.2],[58.2,40.0],[56.8,40.3]],
  buxoro2:[[62.6,39.8],[63.3,40.6],[64.3,41.2],[65.3,40.9],[65.7,40.2],[66.0,39.6],[66.8,39.3],[67.6,39.1],[68.6,39.1],[69.8,39.1],[71.0,39.3],[72.2,39.1],[72.8,38.4],[73.4,37.5],[71.8,36.9],[70.6,37.1],[69.4,37.25],[68.3,37.1],[67.3,37.15],[66.3,37.35],[65.3,37.7],[64.4,38.3],[63.7,38.9],[63.1,39.3]],
  rossiya:[[49,48.5],[79,48.5],[79,42.4],[76.5,41.3],[75.2,40.5],[74.2,39.5],[73.7,38.5],[73.4,37.5],[72.8,38.4],[72.2,39.1],[71.0,39.3],[69.8,39.1],[68.6,39.1],[67.6,39.1],[66.8,39.3],[66.0,39.6],[65.7,40.2],[65.3,40.9],[64.3,41.2],[63.3,40.6],[62.6,39.8],[63.1,39.3],[63.7,38.9],[64.4,38.3],[65.3,37.7],[64.0,37.3],[62.6,36.3],[61.2,36.6],[60.4,36.6],[59.4,37.4],[57.5,38.2],[56.0,38.1],[54.0,37.3],[52.5,37.6],[49,39],[49,48.5]]
};
const XN = {
  xiva:{nom:'Xiva xonligi', rang:'#4f9a8a', poyt:'xiva'},
  buxoro:{nom:'Buxoro amirligi', rang:'#c9774b', poyt:'buxoro'},
  qoqon:{nom:'Qo‘qon xonligi', rang:'#8f78b8', poyt:'qoqon'},
  rossiya:{nom:'Rossiya imperiyasi (Turkiston general-gubernatorligi)', rang:'#9aa08e'}
};
const XN_SH = {
  buxoro:['Buxoro', 64.42, 39.77, 'l'], xiva:['Xiva', 60.36, 41.38, 'l'], qoqon:['Qo‘qon', 70.94, 40.53, 'br'], toshkent:['Toshkent', 69.24, 41.31, 'tl'],
  samarqand:['Samarqand', 66.96, 39.65, 'r'], qarshi:['Qarshi', 65.79, 38.86, 'l'], shahrisabz:['Shahrisabz', 66.83, 39.06, 'br'], urganch:['Urganch', 60.63, 41.55, 'tr'],
  andijon:['Andijon', 72.34, 40.78, 'r'], namangan:['Namangan', 71.67, 41.0, 'tr'], xojand:['Xo‘jand', 69.62, 40.28, 'b'], turkiston:['Turkiston', 68.25, 43.3, 'r'],
  chimkent:['Chimkent', 69.6, 42.3, 'l'], oqmachit:['Oqmachit', 65.5, 44.85, 'r'], termiz:['Termiz', 67.28, 37.22, 'r'], jizzax:['Jizzax', 67.84, 40.12, 'l']
};
const XN_YON = {b:[0, 16, 2], r:[8, 4, 0], l:[-8, 4, 1], tr:[5, -7, 0], tl:[-5, -7, 1], br:[5, 14, 0], bl:[-5, 14, 1]};
const XN_DARYO_Q = { /* Natural Earth 50m da yo‘q kichik daryolar — sxematik */
  zarafshon:[[70.3,39.45],[69.2,39.45],[68.4,39.4],[67.6,39.5],[66.96,39.66],[66.25,39.9],[65.4,40.1],[64.9,39.95],[64.42,39.8],[63.9,39.55]],
  chirchiq:[[70.0,41.63],[69.58,41.47],[69.3,41.25],[68.77,40.94]],
  qashqadaryo:[[67.3,39.0],[66.6,38.95],[65.79,38.86],[65.2,38.8]]
};
const XN_DAVR = [
  {q:'XIX asr o‘rtasi', n:'Uch davlat', matn:'Mintaqada uchta o‘zbek sulolasi hukmronlik qilgan davlat bo‘lgan: <b>Buxoro amirligi</b> (mang‘itlar), <b>Xiva xonligi</b> (qo‘ng‘irotlar), <b>Qo‘qon xonligi</b> (minglar). Ular o‘zaro tez-tez urushgan, chegaralari o‘zgarib turgan.', xon:['xiva', 'buxoro', 'qoqon']},
  {q:'1853–1876', n:'Rossiya bosqini', matn:'Rossiya imperiyasi qo‘shinlari shimoldan ikki yo‘nalishda kirib kelgan: Oqmachit (1853), Toshkent (1865), Xo‘jand va Jizzax (1866), Samarqand (1868), Xiva (1873); Qo‘qon xonligi 1876-yilda tugatilgan.', xon:['xiva', 'buxoro', 'qoqon'], hujum:true},
  {q:'1876–1917', n:'Turkiston general-gubernatorligi', matn:'1867-yilda Toshkentda markazi bo‘lgan <b>Turkiston general-gubernatorligi</b> tuzilgan. Buxoro amirligi (1868, 1873-yil shartnomalari) va Xiva xonligi (1873) Rossiya protektoratiga — qaram davlatga aylangan; ichki boshqaruv amir va xonda qolgan.', xon:['rossiya', 'xiva2', 'buxoro2']}
];
const XN_HUJUM = [ /* [shahar, yil, strelka boshi lon/lat] */
  ['oqmachit', '1853', [62.5, 46.8]], ['turkiston', '1864', [66.2, 45.2]], ['chimkent', '1864', [72.5, 44.2]], ['toshkent', '1865', [69.6, 42.25]], ['xojand', '1866', [69.9, 41.05]], ['jizzax', '1866', [68.6, 40.7]],
  ['samarqand', '1868', [67.75, 40.62], 'end'], ['xiva', '1873', [61.5, 43.2]], ['qoqon', '1876', [70.6, 41.6]]
];
R.tr_xonliklar = async (sahna, {tag, izoh, yorliq, o, skriptYukla})=>{
  try{ await skriptYukla('lib/sahna_v315_tr_xarita.js', ()=>window.MAKON_TR_XARITA); }catch(e){}
  if(!sahna.isConnected) return null;
  const xar = window._sahnalar;
  const eski = xar && xar.get(sahna); if(eski) eski.yopish();
  if(yorliq) yorliq('Tarix · Xonliklar · sxematik xarita (chegaralar taxminiy)');
  const X = window.MAKON_TR_XARITA;
  const quti = document.createElement('div'); quti.className = 'tr-xarita';
  if(!X){
    quti.innerHTML = '<div class="tr-xato">Xarita ma’lumoti yuklanmadi (lib/sahna_v315_tr_xarita.js)</div>'; sahna.append(quti);
    const bo = {idish:sahna, holat(){}, qotir(){}, zoomla(){}, tikla(){}, yopish(){ quti.remove(); if(xar && xar.get(sahna) === bo) xar.delete(sahna); }};
    if(xar) xar.set(sahna, bo); return bo;
  }
  const W = X.W, H = X.H, f1 = v=>(+v).toFixed(1);
  const px = (lon, lat)=>[(lon - X.L0) * X.cos * X.K, (X.B1 - lat) * X.K];
  const yolD = (pts, yopiq)=>'M' + pts.map(p=>{ const q = px(p[0], p[1]); return f1(q[0]) + ',' + f1(q[1]); }).join('L') + (yopiq ? 'Z' : '');
  const markaz = pts=>{ let sx = 0, sy = 0; pts.forEach(p=>{ sx += p[0]; sy += p[1]; }); return [sx / pts.length, sy / pts.length]; };
  const YOZ = {xiva:[59.2, 42.2, -30, 'XIVA XONLIGI'], buxoro:[66.9, 37.95, -16, 'BUXORO AMIRLIGI'], qoqon:[72.9, 42.45, -10, 'QO‘QON XONLIGI'], xiva2:[58.3, 41.6, -35, 'XIVA XONLIGI'], buxoro2:[67.3, 38.3, -14, 'BUXORO AMIRLIGI'], rossiya:[66.5, 45.6, -6, 'ROSSIYA IMPERIYASI']};
  const JOY = [['KASPIY DENGIZI', 51.3, 41.6, -75, 0], ['OROL DENGIZI', 60.1, 45.25, 0, 0], ['Qizilqum', 63.4, 42.1, -20, 1], ['Qoraqum', 59.5, 39.2, 0, 1], ['Ustyurt', 56.3, 43.7, 0, 1],
    ['Amudaryo', 62.6, 40.5, -44, 2], ['Sirdaryo', 66.6, 44.2, -24, 2], ['Zarafshon', 65.2, 39.35, 0, 2],
    ['ERON (Qojorlar)', 55.5, 36.4, 0, 3], ['AFG‘ONISTON', 66.8, 36.0, 0, 3], ['SIN IMPERIYASI (Qashqar)', 76.2, 39.0, 0, 3], ['Turkman qabilalari', 58.2, 38.7, 0, 4], ['Qozoq juzlari', 70.5, 46.4, 0, 4], ['Tyanshan', 76.2, 41.9, -10, 1], ['Pomir', 73.3, 38.0, 0, 1], ['Balxash', 75.0, 46.5, 0, 0]];
  const VB = [-10, -12, W + 20, H + 24];
  quti.innerHTML = `
    <svg class="tr-svg" viewBox="${VB.join(' ')}" preserveAspectRatio="xMidYMid meet">
      <defs><clipPath id="trQuruq"><path d="${X.quruqlik}"/></clipPath>
        <pattern id="trProt" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="none"/><line x1="0" y1="0" x2="0" y2="8" stroke="rgba(40,20,10,.35)" stroke-width="3"/></pattern>
        <marker id="trUq" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#b3261e"/></marker></defs>
      <g class="tr-kamera">
        <rect class="tr-dengiz" x="-2000" y="-2000" width="${W + 4000}" height="${H + 4000}"/>
        <path class="tr-quruq" d="${X.quruqlik}"/>
        <g class="tr-davlatlar" clip-path="url(#trQuruq)"></g>
        <path class="tr-kol" d="${X.kollar}"/>
        <path class="tr-daryo" d="${X.daryolar}"/>
        <path class="tr-daryo" d="${Object.values(XN_DARYO_Q).map(p=>yolD(p, false)).join('')}"/>
        <g class="tr-joy">${JOY.map(([n, lo, la, r, t])=>{ const [x, y] = px(lo, la); return '<text class="t' + t + '" transform="translate(' + f1(x) + ',' + f1(y) + ') rotate(' + r + ')">' + esc(n) + '</text>'; }).join('')}</g>
        <g class="tr-yozuv"></g>
        <g class="tr-hujum"></g>
        <g class="tr-shaharlar"></g>
      </g>
    </svg>`;
  sahna.append(quti);
  const Q = document.createElement('div'); Q.className = 'tr-karta'; Q.innerHTML = '<span class="tr-ust"></span><b class="tr-nom"></b><small class="tr-s"></small><small class="tr-mb">Chegaralar sxematik (qo‘lda chizilgan, taxminiy) · asos: Natural Earth</small>'; sahna.append(Q);
  const svg = quti.querySelector('svg'), kamera = quti.querySelector('.tr-kamera');
  const gD = quti.querySelector('.tr-davlatlar'), gY = quti.querySelector('.tr-yozuv'), gU = quti.querySelector('.tr-hujum'), gS = quti.querySelector('.tr-shaharlar');
  let joriy = 0, tanX = null, tanSh = null, yashir = false, zoom = 1, ox = 0, oy = 0;
  const kS = Q.querySelector('.tr-s');
  function qolla(){
    const mx = 60; ox = Math.min(mx, Math.max(W - W * zoom - mx, ox)); oy = Math.min(mx, Math.max(H - H * zoom - mx, oy));
    kamera.setAttribute('transform', 'translate(' + f1(ox) + ',' + f1(oy) + ') scale(' + zoom.toFixed(4) + ')');
    const s = (1 / Math.pow(zoom, .7)).toFixed(3);
    gS.querySelectorAll('.tr-sh').forEach(g=>g.setAttribute('transform', 'translate(' + g.dataset.x + ',' + g.dataset.y + ') scale(' + s + ')'));
    quti.querySelectorAll('text[data-t]').forEach(t=>t.setAttribute('transform', t.dataset.t + ' scale(' + (1 / Math.pow(zoom, .55)).toFixed(3) + ')'));
  }
  function zoomAtrof(z, sx, sy){ z = Math.max(1, Math.min(6, z)); const mx = (sx - ox) / zoom, my = (sy - oy) / zoom; zoom = z; ox = sx - mx * zoom; oy = sy - my * zoom; qolla(); }
  const svgNuqta = (cx, cy)=>{ const m = svg.getScreenCTM(); if(!m) return [W / 2, H / 2]; const p = svg.createSVGPoint(); p.x = cx; p.y = cy; const q = p.matrixTransform(m.inverse()); return [q.x, q.y]; };
  const asl = k=>k.replace('2', '');
  function chiz(){
    const dv = XN_DAVR[joriy];
    gD.innerHTML = dv.xon.map(k=>'<path class="tr-davlat' + (k === 'rossiya' ? ' ros' : '') + '" data-k="' + asl(k) + '" d="' + yolD(XN_P[k], true) + '" style="fill:' + XN[asl(k)].rang + '"/>' + (joriy === 2 && k !== 'rossiya' ? '<path class="tr-prot" d="' + yolD(XN_P[k], true) + '" fill="url(#trProt)"/>' : '')).join('');
    gY.innerHTML = dv.xon.map(k=>{ const y = YOZ[k]; const [x, yy] = px(y[0], y[1]); const tt = 'translate(' + f1(x) + ',' + f1(yy) + ') rotate(' + y[2] + ')'; return '<text data-t="' + tt + '" transform="' + tt + '" style="font-size:' + (k === 'rossiya' ? 13 : 14) + 'px">' + esc(y[3]) + '</text>'; }).join('')
      + (joriy === 2 ? (()=>{ const [x, y] = px(62.6, 41.7); const tt = 'translate(' + f1(x) + ',' + f1(y) + ') rotate(-20)'; return '<text class="kichik" data-t="' + tt + '" transform="' + tt + '">(Rossiya protektorati)</text>'; })() : '');
    gU.innerHTML = dv.hujum ? XN_HUJUM.map(([k, yil, bosh, anc])=>{ const s = XN_SH[k]; const [x1, y1] = px(bosh[0], bosh[1]), [x2, y2] = px(s[1], s[2]); const mx = (x1 + x2) / 2 + (y2 - y1) * .12, my = (y1 + y2) / 2 - (x2 - x1) * .12;
      const k2 = .82, ex = x1 + (x2 - x1) * k2, ey = y1 + (y2 - y1) * k2;
      return '<path d="M' + f1(x1) + ',' + f1(y1) + 'Q' + f1(mx) + ',' + f1(my) + ' ' + f1(ex) + ',' + f1(ey) + '" marker-end="url(#trUq)"/><text' + (anc ? ' text-anchor="' + anc + '"' : '') + ' data-t="translate(' + f1(x1) + ',' + f1(y1 - 3) + ')" transform="translate(' + f1(x1) + ',' + f1(y1 - 3) + ')">' + yil + '</text>'; }).join('') : '';
    gS.innerHTML = Object.keys(XN_SH).map(k=>{
      const [n, lo, la, yon] = XN_SH[k], [x, y] = px(lo, la), yj = XN_YON[yon], poyt = ['buxoro', 'xiva', 'qoqon'].includes(k) || (joriy === 2 && k === 'toshkent');
      return '<g class="tr-sh' + (poyt ? ' poyt' : '') + (k === tanSh ? ' tanlangan' : '') + '" data-k="' + k + '" data-x="' + f1(x) + '" data-y="' + f1(y) + '"><circle class="halqa" r="11"/>' + (poyt ? '<rect class="tash" x="-5" y="-5" width="10" height="10" transform="rotate(45)"/>' : '<circle class="tash" r="4.4"/>') + '<circle class="ich" r="1.7"/><text class="' + (yj[2] === 1 ? 'chap' : yj[2] === 2 ? 'orta' : '') + '" x="' + yj[0] + '" y="' + yj[1] + '">' + esc(n) + '</text></g>';
    }).join('');
    gS.querySelectorAll('.tr-sh').forEach(el=>{ el.addEventListener('pointerdown', e=>e.stopPropagation()); el.onclick = e=>{ e.stopPropagation(); shaharBos(el.dataset.k); }; });
    gD.querySelectorAll('.tr-davlat').forEach(el=>el.onclick = ()=>{ if(surildi) return; xonBos(el.dataset.k, true); });
    belgila(); qolla();
    tag.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('faol', +b.dataset.d === joriy));
    Q.querySelector('.tr-ust').textContent = dv.q; Q.querySelector('.tr-nom').textContent = dv.n;
    kS.textContent = yashir ? 'Topshiriqdagi joyni xaritada toping' : 'Davlat yoki shaharni bosing';
    if(izoh) izoh.innerHTML = '<b>' + dv.q + ' · ' + dv.n + '.</b> ' + dv.matn + ' <span class="tr-iz-x">Chegaralar sxematik: XIX asrda ular aniq belgilanmagan, ko‘chmanchi hududlar bahsli bo‘lgan.</span>';
  }
  function belgila(){
    gD.querySelectorAll('.tr-davlat').forEach(e=>e.classList.toggle('tanlangan', e.dataset.k === tanX));
    gS.querySelectorAll('.tr-sh').forEach(e=>e.classList.toggle('tanlangan', e.dataset.k === tanSh));
    quti.classList.toggle('tr-yashir', yashir);
  }
  function xonBos(k, yub){
    tanX = k; tanSh = null; belgila();
    kS.textContent = XN[k].nom + (joriy === 2 && k !== 'rossiya' ? ' · Rossiya protektorati' : '');
    if(yub){ hodisa('tr-xonlik', {nom:k}); hodisa('detal', {turD:'tr_xonlik', nom:k}); }
  }
  function shaharBos(k){
    const nom = XN_SH[k][0];
    if(yashir){ const el = gS.querySelector('[data-k="' + k + '"]'); if(el){ el.classList.add('ochiq'); setTimeout(()=>el.classList.remove('ochiq'), 1600); } kS.textContent = 'Siz bosgan shahar: ' + nom; }
    else { tanSh = k; tanX = null; belgila(); kS.textContent = nom + ' · batafsil kartani o‘qing'; }
    hodisa('tr-shahar', {shahar:k, nom}); hodisa('detal', {turD:'tr_shahar', nom:k});
  }
  tag.innerHTML = '';
  const tq = document.createElement('div'); tq.className = 'tr-tag';
  tq.innerHTML = XN_DAVR.map((d, i)=>'<button data-d="' + i + '" title="' + esc(d.n) + '"><b>' + esc(d.q) + '</b><span>' + esc(d.n) + '</span></button>').join('');
  tag.append(tq);
  tq.querySelectorAll('[data-d]').forEach(b=>b.onclick = ()=>{ joriy = +b.dataset.d; tanX = null; chiz(); hodisa('tr-davr', {davr:joriy}); });
  /* surish / g‘ildirak / ikki barmoq */
  const barmoq = new Map(); let bos = null, surildi = false, chimdi = null;
  svg.addEventListener('pointerdown', e=>{
    barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(barmoq.size === 2){ const [a, b] = [...barmoq.values()]; const [sx, sy] = svgNuqta((a.x + b.x) / 2, (a.y + b.y) / 2); chimdi = {d:Math.hypot(a.x - b.x, a.y - b.y) || 1, z:zoom, sx, sy}; bos = null; surildi = true; }
    else { bos = {x:e.clientX, y:e.clientY, ox, oy}; surildi = false; }
  });
  svg.addEventListener('pointermove', e=>{
    if(!barmoq.has(e.pointerId)) return; barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(chimdi && barmoq.size >= 2){ const [a, b] = [...barmoq.values()]; zoomAtrof(chimdi.z * Math.hypot(a.x - b.x, a.y - b.y) / chimdi.d, chimdi.sx, chimdi.sy); return; }
    if(!bos) return; const dx = e.clientX - bos.x, dy = e.clientY - bos.y;
    if(!surildi && Math.hypot(dx, dy) < 5) return;
    if(!surildi){ surildi = true; try{ svg.setPointerCapture(e.pointerId); }catch(er){} }
    const r = svg.getBoundingClientRect(), k = Math.max(VB[2] / r.width, VB[3] / r.height); ox = bos.ox + dx * k; oy = bos.oy + dy * k; qolla();
  });
  const qoy = e=>{ if(!barmoq.has(e.pointerId)) return; barmoq.delete(e.pointerId); if(barmoq.size < 2) chimdi = null; if(!barmoq.size){ bos = null; setTimeout(()=>{ surildi = false; }, 0); } };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t=>svg.addEventListener(t, qoy));
  const gildirak = e=>{ e.preventDefault(); const [sx, sy] = svgNuqta(e.clientX, e.clientY); zoomAtrof(zoom * (e.deltaY > 0 ? 1 / 1.15 : 1.15), sx, sy); };
  svg.addEventListener('wheel', gildirak, {passive:false});
  const api = {
    idish:sahna,
    zoomla(k){ zoomAtrof(zoom / k, W / 2, H / 2); },
    tikla(){ zoom = 1; ox = 0; oy = 0; const r = svg.getBoundingClientRect(); if(r.width && r.height && r.width / r.height < 1.1){ const [cx, cy] = px(66, 40.5); zoom = Math.min(2.6, (VB[2] / VB[3]) / (r.width / r.height)); ox = W / 2 - cx * zoom; oy = H / 2 - cy * zoom; } qolla(); },
    holat(h){
      if(!h) return;
      if(h.yashir !== undefined){ yashir = !!h.yashir; if(yashir){ tanSh = null; } }
      if(h.davr !== undefined && h.davr !== null && Number.isFinite(+h.davr)){ joriy = Math.max(0, Math.min(XN_DAVR.length - 1, Math.round(+h.davr))); tanX = null; }
      chiz();
      if(h.xonlik) xonBos(h.xonlik, false);
      if(h.shahar){ tanSh = h.shahar; belgila(); }
    },
    qotir(){},
    yopish(){ Q.remove(); if(quti.parentNode) quti.remove(); if(tag && tq.parentNode === tag) tq.remove(); if(xar && xar.get(sahna) === api) xar.delete(sahna); }
  };
  if(xar) xar.set(sahna, api);
  chiz(); api.tikla();
  if(o && o.holat) api.holat(o.holat);
  return api;
};

/* ================= 5. MUSTAQILLIK VA DAVLAT RAMZLARI ================= */
const MQ_SANA = [
  ['til', '1989-yil 21-oktabr', 1989 + 9.7 / 12, 'Davlat tili haqida qonun'],
  ['prezident', '1990-yil 24-mart', 1990 + 2.8 / 12, 'Prezidentlik lavozimi joriy etildi'],
  ['deklaratsiya', '1990-yil 20-iyun', 1990 + 5.65 / 12, 'Mustaqillik deklaratsiyasi'],
  ['mustaqillik', '1991-yil 31-avgust', 1991 + 7.97 / 12, 'Davlat mustaqilligi e’lon qilindi'],
  ['bayroq', '1991-yil 18-noyabr', 1991 + 10.58 / 12, 'Davlat bayrog‘i qonuni'],
  ['referendum', '1991-yil 29-dekabr', 1991 + 11.93 / 12, 'Referendum va Prezident saylovi'],
  ['bmt', '1992-yil 2-mart', 1992 + 2.05 / 12, 'BMT a’zoligiga qabul qilindi'],
  ['gerb', '1992-yil 2-iyul', 1992 + 6.05 / 12, 'Davlat gerbi qonuni'],
  ['konstitutsiya', '1992-yil 8-dekabr', 1992 + 11.25 / 12, 'Konstitutsiya qabul qilindi'],
  ['madhiya', '1992-yil 10-dekabr', 1992 + 11.32 / 12, 'Davlat madhiyasi qonuni']
];
const RAMZ_NOM = {kok:'Bayroq: moviy yo‘l', oq:'Bayroq: oq yo‘l', yashil:'Bayroq: yashil yo‘l', qizil:'Bayroq: qizil hoshiyalar', oy:'Bayroq: yarim oy', yulduz:'Bayroq: 12 yulduz',
  humo:'Gerb: Humo qushi', quyosh:'Gerb: quyosh', tog:'Gerb: tog‘lar', vodiy:'Gerb: vodiy', daryo:'Gerb: daryolar', bugdoy:'Gerb: bug‘doy boshoqlari', paxta:'Gerb: g‘o‘za (paxta) shoxlari', sakkiz:'Gerb: sakkizburchak', lenta:'Gerb: lenta'};
/* bayroq (qonun: 250 × 125 sm): uch yo‘l 40 sm, qizil hoshiya 2,5 sm; yarim oy va 12 yulduz 75 × 30 sm to‘rtburchakda, dastadan 20 sm */
const BQ = {W:250, H:125, kok:'#0099b5', oq:'#ffffff', yashil:'#1eb53a', qizil:'#ce1126'};
const BQ_YUL = (()=>{ const r = []; const qator = [[3, 8], [4, 20], [5, 32]]; qator.forEach(([n, y])=>{ for(let i = 0; i < n; i++) r.push([95 - 3 - i * 12, y]); }); return r; })();
function bayroqChiz(x, w, h){
  const s = w / BQ.W;
  x.fillStyle = BQ.kok; x.fillRect(0, 0, w, 40 * s);
  x.fillStyle = BQ.qizil; x.fillRect(0, 40 * s, w, 2.5 * s);
  x.fillStyle = BQ.oq; x.fillRect(0, 42.5 * s, w, 40 * s);
  x.fillStyle = BQ.qizil; x.fillRect(0, 82.5 * s, w, 2.5 * s);
  x.fillStyle = BQ.yashil; x.fillRect(0, 85 * s, w, 40 * s);
  /* yarim oy: tashqi doira d = 30 sm (markaz 35;20), ichki doira — taxminiy (r = 12, 5 sm o‘ngga siljigan) */
  x.fillStyle = '#fff'; x.beginPath(); x.arc(35 * s, 20 * s, 15 * s, 0, 7); x.fill();
  x.fillStyle = BQ.kok; x.beginPath(); x.arc(40 * s, 20 * s, 12.2 * s, 0, 7); x.fill();
  x.fillStyle = '#fff';
  BQ_YUL.forEach(([cx, cy])=>{ x.beginPath(); for(let i = 0; i < 10; i++){ const a = -Math.PI / 2 + i * Math.PI / 5, r = (i % 2 ? 1.15 : 3) * s; x.lineTo(cx * s + Math.cos(a) * r, cy * s + Math.sin(a) * r); } x.closePath(); x.fill(); });
}
function bayroqQism(u, v){
  const x = u * BQ.W, y = (1 - v) * BQ.H;
  if(y < 40){
    if(BQ_YUL.some(([cx, cy])=>Math.hypot(x - cx, y - cy) <= 3.6)) return 'yulduz';
    if(Math.hypot(x - 35, y - 20) <= 15 && Math.hypot(x - 40, y - 20) > 12.2) return 'oy';
    return 'kok';
  }
  if(y < 42.5 || (y >= 82.5 && y < 85)) return 'qizil';
  if(y < 82.5) return 'oq';
  return 'yashil';
}
function hilolShakl(T, r, r2, d){
  const xI = (r * r - r2 * r2 + d * d) / (2 * d), yI = Math.sqrt(Math.max(0, r * r - xI * xI));
  const fi = Math.atan2(yI, xI), b1 = Math.atan2(-yI, xI - d), b2 = Math.atan2(yI, xI - d);
  const sh = new T.Shape(); const n = 40;
  for(let i = 0; i <= n; i++){ const t = fi + (2 * Math.PI - 2 * fi) * i / n; i ? sh.lineTo(r * Math.cos(t), r * Math.sin(t)) : sh.moveTo(r * Math.cos(t), r * Math.sin(t)); }
  for(let i = 0; i <= n; i++){ const t = b1 + ((b2 - 2 * Math.PI) - b1) * i / n; sh.lineTo(d + r2 * Math.cos(t), r2 * Math.sin(t)); }
  sh.closePath(); return sh;
}
function yulduzShakl(T, r, n, ich){ const sh = new T.Shape(); for(let i = 0; i < n * 2; i++){ const a = Math.PI / 2 + i * Math.PI / n, rr = i % 2 ? r * ich : r; i ? sh.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : sh.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } sh.closePath(); return sh; }
R.tr_mustaqillik = async (sahna, {tag, izoh, yorliq, o})=>{
  const A = asos(sahna, {rx:.18, ry:0, rxMin:-.2, rxMax:.95, ryMin:-1, ryMax:1, fov:32, env:.6});
  const {S, T, mat, kanvas, soya, rang} = A, g = S.g;
  if(yorliq) yorliq('Tarix · davlat ramzlari va mustaqillik yillari · gerb soddalashtirilgan');
  const Q = qatlam(sahna, S, {manba:'Bayroq nisbati va o‘lchamlari — «Davlat bayrog‘i to‘g‘risida»gi qonun; rang tuslari qonunda berilmagan (taxminiy); gerb soddalashtirilgan'});
  /* podium */
  const podT = kanvas(512, 512, (x, w, h)=>{ x.fillStyle = '#1b2033'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,.05)'; x.lineWidth = 2; for(let i = 0; i <= 8; i++){ x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } }, true);
  podT.repeat.set(3, 2);
  const pod = new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(12.4, .4, 7.2, 3, .12) : new T.BoxGeometry(12.4, .4, 7.2), mat('#ffffff', {map:podT, roughness:.85, metalness:.1, envMapIntensity:.12})); pod.position.set(0, -.2, .4); g.add(pod);
  g.add(soya(7, 4.2, 0, -.42, .4, .9));
  /* --- bayroq --- */
  const dasta = new T.Mesh(new T.CylinderGeometry(.045, .055, 4.4, 20), mat('#d9dde6', {roughness:.25, metalness:.85})); dasta.position.set(-4.6, 2.2, -1.2); g.add(dasta);
  const uch = new T.Mesh(new T.SphereGeometry(.09, 20, 12), mat('#d6a64a', {roughness:.25, metalness:.9})); uch.position.set(-4.6, 4.45, -1.2); g.add(uch);
  const tagl = new T.Mesh(new T.CylinderGeometry(.3, .38, .2, 32), mat('#2a3048', {roughness:.5, metalness:.3})); tagl.position.set(-4.6, .1, -1.2); g.add(tagl);
  g.add(soya(.8, .8, -4.6, 0, -1.2, .8));
  const BW = 3.2, BH = BW / 2;
  const bT = kanvas(1000, 500, bayroqChiz); bT.anisotropy = 8;
  const bG = new T.PlaneGeometry(BW, BH, 50, 25); bG.translate(BW / 2, 0, 0);
  const bAsl = bG.attributes.position.array.slice();
  const bM = new T.Mesh(bG, mat('#ffffff', {map:bT, roughness:.9, envMapIntensity:.15, side:T.DoubleSide}));
  bM.position.set(-4.56, 4.3 - BH / 2, -1.2); bM.userData.nom = 'bayroq'; g.add(bM);
  /* --- gerb (soddalashtirilgan relyef) --- */
  const gb = new T.Group(); gb.position.set(1.6, .35, -1.2); g.add(gb);
  const ex = (sh, d, m)=>new T.Mesh(new T.ExtrudeGeometry(sh, {depth:d, bevelEnabled:true, bevelThickness:.012, bevelSize:.012, bevelSegments:2, curveSegments:24}), m);
  const kumush = mat('#dfe4ec', {roughness:.25, metalness:.85}), oltin = mat('#e4b53e', {roughness:.28, metalness:.85}), yashilM = mat('#2f8f4a', {roughness:.5}), oqM = mat('#f6f4ee', {roughness:.6}), havo = mat('#3fb4e6', {roughness:.35, metalness:.1});
  const qism = (m, q)=>{ m.traverse(c=>{ if(c.isMesh) c.userData = {nom:'gerb', qism:q}; }); gb.add(m); return m; };
  /* orqa taglik — silliq to‘q disk */
  const tg = new T.Mesh(new T.CylinderGeometry(1.45, 1.45, .06, 64), mat('#101629', {roughness:.5, metalness:.3})); tg.rotation.x = Math.PI / 2; tg.position.set(0, 1.55, -.08); gb.add(tg);
  const tgh = new T.Mesh(new T.TorusGeometry(1.45, .025, 8, 80), oltin); tgh.position.set(0, 1.55, -.05); gb.add(tgh);
  const dastak = new T.Mesh(new T.BoxGeometry(.2, .5, .2), mat('#2a3048', {metalness:.3, roughness:.5})); dastak.position.set(0, -.1, -.1); gb.add(dastak);
  /* quyosh va nurlar */
  const qy = new T.Group(); qy.position.set(0, 1.62, -.02);
  const qd = new T.Mesh(new T.CircleGeometry(.36, 40), oltin); qy.add(qd);
  for(let i = 0; i <= 26; i++){ const a = Math.PI * (i / 26), n = new T.Mesh(new T.BoxGeometry(.018, .36, .01), oltin); n.position.set(Math.cos(a) * .55, Math.sin(a) * .55, 0); n.rotation.z = a - Math.PI / 2; qy.add(n); }
  qism(qy, 'quyosh');
  /* tog‘lar */
  const ts = new T.Shape(); ts.moveTo(-.95, 1.35); [[-.7, 1.62], [-.52, 1.5], [-.28, 1.74], [-.05, 1.55], [.2, 1.72], [.45, 1.52], [.68, 1.66], [.95, 1.35]].forEach(p=>ts.lineTo(p[0], p[1])); ts.lineTo(.95, 1.3); ts.lineTo(-.95, 1.3); ts.closePath();
  qism(ex(ts, .04, mat('#2f7f86', {roughness:.5})), 'tog').position.z = .0;
  /* vodiy */
  const vs = new T.Shape(); vs.moveTo(-.95, 1.36); vs.bezierCurveTo(-.9, .95, -.45, .78, 0, .78); vs.bezierCurveTo(.45, .78, .9, .95, .95, 1.36); vs.closePath();
  qism(ex(vs, .05, yashilM), 'vodiy').position.z = .02;
  /* daryolar (Amudaryo va Sirdaryo) */
  [[-1, .0], [1, .02]].forEach(([s])=>{ const c = new T.CatmullRomCurve3([new T.Vector3(s * .85, 1.3, .08), new T.Vector3(s * .5, 1.12, .08), new T.Vector3(s * .62, .98, .08), new T.Vector3(s * .25, .86, .08)]); qism(new T.Mesh(new T.TubeGeometry(c, 30, .018, 6), kumush), 'daryo'); });
  /* Humo qushi */
  const hs = new T.Shape();
  hs.moveTo(0, .12); hs.bezierCurveTo(.08, .12, .14, .3, .12, .5); hs.bezierCurveTo(.3, .55, .55, .7, .78, 1.12); hs.bezierCurveTo(.62, 1.02, .5, 1.0, .42, .96); hs.bezierCurveTo(.5, 1.06, .54, 1.15, .55, 1.22);
  hs.bezierCurveTo(.4, 1.1, .3, .95, .15, .92); hs.bezierCurveTo(.16, 1.1, .12, 1.25, .04, 1.33); hs.bezierCurveTo(.1, 1.36, .16, 1.38, .2, 1.36); hs.bezierCurveTo(.12, 1.42, .04, 1.44, 0, 1.44);
  hs.bezierCurveTo(-.08, 1.44, -.12, 1.38, -.1, 1.3); hs.bezierCurveTo(-.14, 1.2, -.16, 1.1, -.15, .92); hs.bezierCurveTo(-.3, .95, -.4, 1.1, -.55, 1.22); hs.bezierCurveTo(-.54, 1.15, -.5, 1.06, -.42, .96);
  hs.bezierCurveTo(-.5, 1.0, -.62, 1.02, -.78, 1.12); hs.bezierCurveTo(-.55, .7, -.3, .55, -.12, .5); hs.bezierCurveTo(-.14, .3, -.08, .12, 0, .12);
  const humo = ex(hs, .07, kumush); humo.position.set(0, .05, .12); qism(humo, 'humo');
  const dum = new T.Shape(); dum.moveTo(-.1, .15); dum.lineTo(.1, .15); dum.lineTo(.2, -.08); dum.lineTo(0, .02); dum.lineTo(-.2, -.08); dum.closePath(); const dm = ex(dum, .05, kumush); dm.position.set(0, .05, .13); qism(dm, 'humo');
  /* chelak: chapda (tomoshabindan) g‘o‘za, o‘ngda bug‘doy */
  const halqaY = (s, t)=>{ const a = Math.PI * (1.45 - .8 * t); return new T.Vector3(s * Math.abs(Math.cos(a)) * 1.2, 1.5 + Math.sin(a) * 1.2, .1); };
  const paxtaG = new T.Group(), bugG = new T.Group();
  const shoxC = new T.CatmullRomCurve3(Array.from({length:9}, (_, i)=>halqaY(-1, i / 8)));
  paxtaG.add(new T.Mesh(new T.TubeGeometry(shoxC, 40, .025, 6), yashilM));
  const barg = new T.Shape(); barg.moveTo(0, 0); barg.bezierCurveTo(.08, .05, .1, .15, 0, .22); barg.bezierCurveTo(-.1, .15, -.08, .05, 0, 0);
  for(let i = 0; i < 8; i++){ const p = halqaY(-1, i / 8 + .05);
    const b1 = ex(barg, .015, yashilM); b1.position.copy(p); b1.rotation.z = .9 + i * .1; paxtaG.add(b1);
    if(i % 2 === 0){ const ch = new T.Group(); ch.position.copy(p).add(new T.Vector3(-.12, .02, .03)); [[0, 0], [.05, .03], [-.04, .04], [.01, .07]].forEach(([dx, dy])=>{ const s2 = new T.Mesh(new T.SphereGeometry(.055, 14, 10), oqM); s2.position.set(dx, dy, 0); ch.add(s2); }); const kos = new T.Mesh(new T.ConeGeometry(.06, .06, 5), mat('#6b4a2a')); kos.position.set(0, -.05, -.01); kos.rotation.x = Math.PI; ch.add(kos); paxtaG.add(ch); } }
  qism(paxtaG, 'paxta');
  const bosh = new T.SphereGeometry(.032, 10, 8);
  for(let i = 0; i < 9; i++){ const p = halqaY(1, i / 8); const q = new T.Group(); q.position.copy(p);
    const burchak = Math.atan2(p.y - 1.5, p.x) + Math.PI / 2;
    for(let j = 0; j < 7; j++){ [-1, 1].forEach(s=>{ const d = new T.Mesh(bosh, oltin); d.scale.set(1, 1.7, .8); d.position.set(s * .03, j * .045, 0); d.rotation.z = -s * .35; q.add(d); }); }
    q.rotation.z = burchak - Math.PI * .15; q.position.x += .08; bugG.add(q); }
  qism(bugG, 'bugdoy');
  /* sakkizburchak (tepada) — ichida yarim oy va yulduz */
  const sk = new T.Group(); sk.position.set(0, 2.72, .1);
  const k8 = new T.Shape(); for(let i = 0; i < 16; i++){ const a = Math.PI / 2 + i * Math.PI / 8, rr = i % 2 ? .19 : .24; i ? k8.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : k8.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } k8.closePath();
  const k8b = ex(k8, .03, oltin); k8b.scale.setScalar(1.12); k8b.position.z = -.02; sk.add(k8b);
  sk.add(ex(k8, .05, havo));
  const hl = ex(hilolShakl(T, .1, .082, .04), .02, mat('#ffffff', {roughness:.4})); hl.position.set(-.03, 0, .06); sk.add(hl);
  const yl2 = ex(yulduzShakl(T, .035, 5, .45), .02, mat('#ffffff')); yl2.position.set(.06, 0, .06); sk.add(yl2);
  qism(sk, 'sakkiz');
  /* lenta (bayroq ranglarida) va «O‘ZBEKISTON» yozuvi */
  const lT = kanvas(1024, 128, (x, w, h)=>{ const s = h / 125; x.fillStyle = BQ.kok; x.fillRect(0, 0, w, 40 * s); x.fillStyle = BQ.qizil; x.fillRect(0, 40 * s, w, 2.5 * s); x.fillStyle = BQ.oq; x.fillRect(0, 42.5 * s, w, 40 * s); x.fillStyle = BQ.qizil; x.fillRect(0, 82.5 * s, w, 2.5 * s); x.fillStyle = BQ.yashil; x.fillRect(0, 85 * s, w, 40 * s);
    x.fillStyle = '#e4b53e'; x.fillRect(w * .36, 0, w * .28, h); x.fillStyle = '#7a1b12'; x.font = '800 44px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('O‘ZBEKISTON', w / 2, h / 2 + 2); });
  const lC = new T.CatmullRomCurve3([new T.Vector3(-1.05, .55, .16), new T.Vector3(-.55, .08, .2), new T.Vector3(0, -.02, .22), new T.Vector3(.55, .08, .2), new T.Vector3(1.05, .55, .16)]);
  const lP = lC.getPoints(60), lG = new T.BufferGeometry(), lv = [], luv = [], li = [];
  lP.forEach((p, i)=>{ lv.push(p.x, p.y + .09, p.z, p.x, p.y - .09, p.z); luv.push(i / 60, 1, i / 60, 0); if(i) li.push(2 * i - 2, 2 * i - 1, 2 * i, 2 * i - 1, 2 * i + 1, 2 * i); });
  lG.setAttribute('position', new T.Float32BufferAttribute(lv, 3)); lG.setAttribute('uv', new T.Float32BufferAttribute(luv, 2)); lG.setIndex(li); lG.computeVertexNormals();
  qism(new T.Mesh(lG, mat('#ffffff', {map:lT, roughness:.6, side:T.DoubleSide})), 'lenta');
  /* --- vaqt chizig‘i 1989–1992 --- */
  const t0 = 1989.7, t1 = 1993.0, SX = t=>-5.3 + (t - t0) / (t1 - t0) * 10.6, SZ = 2.7;
  const chT = kanvas(2048, 112, (x, w, h)=>{ x.fillStyle = 'rgba(10,14,28,.95)'; x.fillRect(0, 0, w, h); [1990, 1991, 1992, 1993].forEach(y=>{ const xx = (y - t0) / (t1 - t0) * w; x.fillStyle = '#e0a458'; x.fillRect(xx - 3, 0, 6, h); x.font = '800 50px Inter, sans-serif'; x.textBaseline = 'middle'; x.textAlign = 'left'; if(y < 1993) x.fillText(String(y), xx + 16, h / 2 + 2); }); x.fillStyle = '#e0a458'; x.font = '800 50px Inter, sans-serif'; x.fillText('1989', 14, h / 2 + 2); });
  const ch = new T.Mesh(new T.PlaneGeometry(10.6, .55), mat('#ffffff', {map:chT, roughness:.95, envMapIntensity:.04, emissive:rang('#ffffff'), emissiveMap:chT, emissiveIntensity:.5})); ch.rotation.x = -Math.PI / 2; ch.position.set(0, .012, SZ); g.add(ch);
  const pin = {}, pinM = {};
  MQ_SANA.forEach(([k, s, t, n], i)=>{
    const h = .3 + (i % 4) * .3, x = SX(t), z = SZ - .35;
    const m = mat(k === 'mustaqillik' ? '#1eb53a' : '#0099b5', {roughness:.35, metalness:.3, emissive:rang(k === 'mustaqillik' ? '#1eb53a' : '#0099b5'), emissiveIntensity:.2});
    const c = new T.Mesh(new T.CylinderGeometry(.03, .03, h, 10), m); c.position.set(x, h / 2, z); g.add(c);
    const bs = new T.Mesh(new T.SphereGeometry(.085, 18, 12), m); bs.position.set(x, h + .06, z); g.add(bs);
    c.userData = bs.userData = {nom:'sana', k}; pin[k] = bs; pinM[k] = m;
    Q.qosh('s:' + k, '<b>' + s.replace(/-yil /, ' · ') + '</b>', langar(T, g, x, h + .22, z), ()=>tanlaSana(k, true), 'kichik sana');
  });
  let tanQ = null, tanS = null, korinish = null;
  const faol = tugmalar(tag, [['umumiy', 'Hammasi'], ['|'], ['bayroq', 'Bayroq'], ['gerb', 'Gerb'], ['sana', 'Sanalar 1989–1992']], k=>korsat(k === 'umumiy' ? null : k, true));
  const FOK = {bayroq:[new T.Vector3(-3.1, 3.2, -1.2), 2.2], gerb:[new T.Vector3(1.6, 1.85, -1.2), 1.9], sana:[new T.Vector3(0, .45, 2.45), 3.4]};
  function korsat(k, yub){
    korinish = k; A.umumiy = !k; faol(k || 'umumiy');
    Q.yl.classList.toggle('tr-sana-yoq', k !== 'sana');
    if(!k){ Q.yoz('1989–1992', 'Mustaqillik va davlat ramzlari', 'Bayroq qismini, gerb elementini yoki sanani bosing'); izoh.innerHTML = 'Chapda — <b>Davlat bayrog‘i</b> (qonun bo‘yicha nisbati 1 : 2), o‘ngda — <b>Davlat gerbi</b> (soddalashtirilgan relyef), oldinda — <b>1989–1992-yillar vaqt chizig‘i</b>. Istalgan qismini bosing.'; S.tikla(); return; }
    Q.yoz(k === 'bayroq' ? '1991-yil 18-noyabr' : k === 'gerb' ? '1992-yil 2-iyul' : '1989–1992', k === 'bayroq' ? 'Davlat bayrog‘i' : k === 'gerb' ? 'Davlat gerbi' : 'Mustaqillik yo‘li', k === 'sana' ? 'Ustunchani bosing — voqea kartasi' : 'Qismni bosing — ma’nosi chiqadi');
    izoh.innerHTML = k === 'bayroq' ? '<b>Davlat bayrog‘i</b> (1991-yil 18-noyabr qonuni): nisbati 1 : 2, uch yo‘l va ikki ingichka qizil hoshiya, yarim oy va 12 yulduz. Istalgan qismini bosing.'
      : k === 'gerb' ? '<b>Davlat gerbi</b> (1992-yil 2-iyul qonuni): Humo qushi, quyosh, tog‘lar, daryolar, bug‘doy va g‘o‘za chambari, sakkizburchak, lenta. Istalgan elementni bosing.'
      : '<b>1989–1992-yillar vaqt chizig‘i.</b> Ustunchani bosing — voqea kartasi chiqadi.';
    S.fokus(FOK[k][1], FOK[k][0], true);
  }
  function tanlaQism(q, yub){
    tanQ = q; const dk = ((window.MAKON_DETAL || {}).tr_ramz || {})[q];
    Q.yoz(q && ['kok', 'oq', 'yashil', 'qizil', 'oy', 'yulduz'].includes(q) ? 'Davlat bayrog‘i' : 'Davlat gerbi', (RAMZ_NOM[q] || '').replace(/^[^:]+: /, ''), dk ? dk.sarlavha2 : '');
    izoh.innerHTML = '<b>' + (RAMZ_NOM[q] || q) + '.</b> ' + (dk ? dk.matn : '');
    if(yub){ hodisa('tr-ramz', {qism:q}); hodisa('detal', {turD:'tr_ramz', nom:q}); }
  }
  function tanlaSana(k, yub){
    tanS = k; Object.keys(pinM).forEach(x=>pinM[x].emissiveIntensity = x === k ? .9 : .2); Q.belgila('s:' + k);
    const r = MQ_SANA.find(x=>x[0] === k), dk = ((window.MAKON_DETAL || {}).tr_sana || {})[k];
    Q.yoz(r[1], r[3], 'Mustaqillik yo‘li');
    izoh.innerHTML = '<b>' + r[1] + ' — ' + r[3] + '.</b> ' + (dk ? dk.matn : '');
    if(yub){ hodisa('tr-sana', {k}); hodisa('detal', {turD:'tr_sana', nom:k}); }
  }
  /* bayroqni bosganda — UV bo‘yicha qism */
  const ray = new T.Raycaster(), nv = new T.Vector2(); let oxirgi = null;
  S.el.addEventListener('pointerdown', e=>{ oxirgi = {x:e.clientX, y:e.clientY}; });
  S.bosish = (d)=>{
    if(d.nom === 'bayroq' && oxirgi){
      const r = S.el.getBoundingClientRect(); nv.set((oxirgi.x - r.left) / r.width * 2 - 1, -(oxirgi.y - r.top) / r.height * 2 + 1); ray.setFromCamera(nv, S.cam);
      const hit = ray.intersectObject(bM)[0]; if(hit && hit.uv) tanlaQism(bayroqQism(hit.uv.x, hit.uv.y), true);
    } else if(d.nom === 'gerb') tanlaQism(d.qism, true);
    else if(d.nom === 'sana') tanlaSana(d.k, true);
  };
  S.ustida = d=>{ S.el.style.cursor = d ? 'pointer' : 'grab'; };
  S.kadrda = (dt, t)=>{
    const p = bG.attributes.position;
    for(let i = 0; i < p.count; i++){ const x = bAsl[i * 3], y = bAsl[i * 3 + 1], k = x / BW;
      p.setZ(i, k * (.13 * Math.sin(x * 2.2 - t * 3.1) + .05 * Math.sin(x * 4.1 + y * 1.3 - t * 4.7))); p.setY(i, y - k * k * .06); }
    p.needsUpdate = true; bG.computeVertexNormals();
    if(tanS) pin[tanS].scale.setScalar(1 + .15 * Math.sin(t * 4));
    Q.kadr();
  };
  S.holat = h=>{ if(!h) return; if(h.korinish !== undefined && (!h.korinish || ['bayroq','gerb','sana'].includes(h.korinish))) korsat(h.korinish || null, false); if(h.qism && RAMZ_NOM[h.qism]) tanlaQism(h.qism, false); if(h.sana && MQ_SANA.some(x=>x[0] === h.sana)) tanlaSana(h.sana, false); };
  const yopAsl = S.yopish; S.yopish = ()=>{ Q.yopish(); yopAsl(); };
  A.sigdir(6.4, 2.9, new T.Vector3(0, 1.9, .2));
  korsat(null, false);
  if(o && o.holat) S.holat(o.holat);
  return S;
};

window.MAKON_TR = {QD_MAKON, QD_DAVR, AL, RG, XN, XN_SH, MQ_SANA, RAMZ_NOM, BQ, bayroqQism};
})();
