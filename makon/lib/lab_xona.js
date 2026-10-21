/* MAKON — virtual kimyo laboratoriyasi: xona va buyum modellari (protsedurali, three.js r128).
   window.MAKON_LAB_MODEL = {xona, idish, IDISH, suyuqGeom, bolakcha, shisha, plita, spirtovka, simHalqa, qogozTasma, chop, R}
   O‘lchamlar metrda; shisha idishlar ko‘rinishi uchun biroz kattalashtirilgan (o‘quv modeli). */
(function(){
const T = THREE;
const R = h=>new T.Color(h).convertSRGBToLinear();
const std = (h, o)=>new T.MeshStandardMaterial(Object.assign({color:R(h), roughness:.72, metalness:0}, o || {}));
function quti(w, h, d, mat, x, y, z, soya){
  const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat); m.position.set(x, y, z);
  m.castShadow = soya !== false; m.receiveShadow = true; return m;
}
function sil(rt, rb, h, mat, x, y, z, seg){
  const m = new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg || 24), mat); m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function kanvas(w, h, chiz){
  const c = document.createElement('canvas'); c.width = w; c.height = h; chiz(c.getContext('2d'), w, h);
  const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t;
}
const SHRIFT = '"Jakarta","Inter","Segoe UI",sans-serif';

/* ---------- davriy jadval plakati ---------- */
function davriyJadval(){
  const Q = [
    [['H',1],['He',18]],
    [['Li',1],['Be',2],['B',13],['C',14],['N',15],['O',16],['F',17],['Ne',18]],
    [['Na',1],['Mg',2],['Al',13],['Si',14],['P',15],['S',16],['Cl',17],['Ar',18]],
    'K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ').map((s, i)=>[s, i + 1]),
    'Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe'.split(' ').map((s, i)=>[s, i + 1]),
    'Cs Ba La Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn'.split(' ').map((s, i)=>[s, i + 1]),
    'Fr Ra Ac Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ').map((s, i)=>[s, i + 1])
  ];
  const LAN = 'Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu'.split(' '), AKT = 'Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr'.split(' ');
  const NOMETALL = ['H','C','N','O','P','S','Se'], YARIM = ['B','Si','Ge','As','Sb','Te'];
  const rang = (s, ustun)=>{
    if(NOMETALL.includes(s)) return '#4fcf96'; if(YARIM.includes(s)) return '#b9c45c';
    if(ustun === 18) return '#b58cff'; if(ustun === 17) return '#45c8dc';
    if(ustun === 1) return '#ff8a5c'; if(ustun === 2) return '#ffc857';
    if(ustun >= 3 && ustun <= 12) return '#7aa7ff'; return '#9fb0c4';
  };
  return kanvas(1520, 920, (c, w, h)=>{
    c.fillStyle = '#f7f8fb'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1b1f3a'; c.font = '700 40px ' + SHRIFT; c.fillText('KIMYOVIY ELEMENTLAR DAVRIY JADVALI', 40, 62);
    c.font = '500 22px ' + SHRIFT; c.fillStyle = '#5b6380'; c.fillText('D. I. Mendeleyev · 118 element', 40, 96);
    const k = 78, x0 = 52, y0 = 128;
    const katak = (s, z, ustun, qator, r)=>{
      const x = x0 + (ustun - 1) * k, y = y0 + qator * k;
      c.fillStyle = r; c.fillRect(x + 2, y + 2, k - 4, k - 4);
      c.fillStyle = '#10142a'; c.font = '700 30px ' + SHRIFT; c.textAlign = 'center'; c.fillText(s, x + k / 2, y + 52);
      c.font = '600 15px ' + SHRIFT; c.textAlign = 'left'; c.fillText(String(z), x + 8, y + 21);
    };
    let z = 0;
    Q.forEach((qator, qi)=>qator.forEach(([s, u])=>{
      z++; if(s === 'Hf') z = 72; if(s === 'Rf') z = 104;
      katak(s, z, u, qi, rang(s, u));
    }));
    LAN.forEach((s, i)=>katak(s, 58 + i, 4 + i, 7.35, '#ff9ecb'));
    AKT.forEach((s, i)=>katak(s, 90 + i, 4 + i, 8.35, '#e58fb0'));
    c.textAlign = 'left';
  });
}
function qoidalarPlakati(){
  return kanvas(760, 1000, (c, w, h)=>{
    c.fillStyle = '#fbfbf7'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#c8202c'; c.fillRect(0, 0, w, 150);
    c.fillStyle = '#fff'; c.font = '800 48px ' + SHRIFT; c.fillText('LABORATORIYA', 44, 72); c.fillText('QOIDALARI', 44, 126);
    const q = ['Himoya ko‘zoynagi, xalat va qo‘lqop kiying', 'Moddalarni tatib ko‘rmang, yaqindan hidlamang', 'Kislotani suvga quying — aksincha emas', 'Isitilayotgan idish og‘zini o‘zingizga qaratmang', 'Tajribani faqat o‘qituvchi ruxsati bilan boshlang', 'Ish tugagach, stolni tartibga keltiring, qo‘lni yuving'];
    q.forEach((s, i)=>{
      const y = 228 + i * 124;
      c.fillStyle = '#1b1f3a'; c.beginPath(); c.arc(78, y - 14, 34, 0, 7); c.fill();
      c.fillStyle = '#fff'; c.font = '800 36px ' + SHRIFT; c.textAlign = 'center'; c.fillText(String(i + 1), 78, y); c.textAlign = 'left';
      c.fillStyle = '#1b1f3a'; c.font = '600 30px ' + SHRIFT;
      const soz = s.split(' '); let qat = '', yy = y - 22;
      soz.forEach(so=>{ if(c.measureText(qat + so).width > 580){ c.fillText(qat, 136, yy); qat = ''; yy += 40; } qat += so + ' '; });
      c.fillText(qat, 136, yy);
    });
  });
}
function doskaT(){
  return kanvas(1400, 560, (c, w, h)=>{
    c.fillStyle = '#1d4639'; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 900; i++){ c.fillStyle = 'rgba(255,255,255,' + (Math.random() * .035) + ')'; c.fillRect(Math.random() * w, Math.random() * h, 60 * Math.random(), 2); }
    c.fillStyle = 'rgba(245,245,235,.92)'; c.font = '600 54px "Segoe Print","Comic Sans MS",' + SHRIFT;
    c.fillText('Mavzu: Kimyoviy reaksiya turlari', 60, 96);
    c.font = '500 44px "Segoe Print","Comic Sans MS",' + SHRIFT;
    c.fillText('1) Birikish:      CaO + H₂O → Ca(OH)₂', 60, 196);
    c.fillText('2) Parchalanish:  2H₂O₂ → 2H₂O + O₂↑', 60, 276);
    c.fillText('3) O‘rin olish:   Zn + 2HCl → ZnCl₂ + H₂↑', 60, 356);
    c.fillText('4) Almashinish:   NaOH + HCl → NaCl + H₂O', 60, 436);
    c.fillStyle = 'rgba(255,214,102,.9)'; c.fillText('Uyga vazifa: tajriba daftarini to‘ldirish', 60, 520);
  });
}
function osmonT(){
  return kanvas(256, 512, (c, w, h)=>{
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#6fb2ee'); g.addColorStop(.62, '#cfe6f7'); g.addColorStop(.63, '#9db8a5'); g.addColorStop(1, '#6f8f76');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(255,255,255,.85)';
    [[60, 120, 46], [110, 108, 60], [160, 126, 40], [200, 250, 34], [40, 230, 28]].forEach(([x, y, r])=>{ c.beginPath(); c.ellipse(x, y, r * 1.5, r * .55, 0, 0, 7); c.fill(); });
  });
}

/* ---------- XONA ---------- */
function xona(sc){
  const g = new T.Group(); sc.add(g);
  const EMAN = std('#b38a58', {roughness:.6}), EMAN2 = std('#a07848', {roughness:.62}), GRAFIT = std('#22252d', {roughness:.38, metalness:.1}),
    OQ = std('#eceef2'), METALL = std('#c9ced6', {roughness:.3, metalness:.85}), QORA = std('#15171c', {roughness:.5});
  // pol
  const polT = kanvas(256, 256, (c, w, h)=>{
    c.fillStyle = '#8b9099'; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 1400; i++){ c.fillStyle = 'rgba(' + (Math.random() > .5 ? '255,255,255' : '20,24,34') + ',' + (Math.random() * .06) + ')'; c.fillRect(Math.random() * w, Math.random() * h, 3, 3); }
    c.strokeStyle = 'rgba(40,44,56,.7)'; c.lineWidth = 3; c.strokeRect(0, 0, w, h);
  });
  polT.wrapS = polT.wrapT = T.RepeatWrapping; polT.repeat.set(15, 12);
  const pol = new T.Mesh(new T.PlaneGeometry(9, 7), new T.MeshStandardMaterial({map:polT, roughness:.42, metalness:.05}));
  pol.rotation.x = -Math.PI / 2; pol.receiveShadow = true; g.add(pol);
  // devorlar va shift
  const DEVOR = std('#dfe3ea', {roughness:.92});
  g.add(quti(9, 3.2, .1, DEVOR, 0, 1.6, -3.55, false), quti(9, 3.2, .1, DEVOR, 0, 1.6, 3.55, false), quti(.1, 3.2, 7, DEVOR, -4.55, 1.6, 0, false));
  g.add(quti(9, .1, 7.2, std('#f3f4f7', {roughness:.95}), 0, 3.25, 0, false));
  g.add(quti(9, .12, .03, std('#30344a'), 0, .06, -3.49, false), quti(.03, .12, 7, std('#30344a'), -4.49, .06, 0, false));
  // o‘ng devor — derazalar bilan
  const osmon = new T.MeshBasicMaterial({map:osmonT()});
  g.add(quti(.1, .85, 7, DEVOR, 4.55, .425, 0, false), quti(.1, .75, 7, DEVOR, 4.55, 2.85, 0, false));
  [-3.15, -1.05, 1.05, 3.15].forEach(z=>g.add(quti(.1, 1.65, z === -3.15 || z === 3.15 ? .7 : .5, DEVOR, 4.55, 1.675, z, false)));
  [-2.05, 0, 2.05].forEach(z=>{
    const oyna = new T.Mesh(new T.PlaneGeometry(1.62, 1.66), osmon); oyna.rotation.y = -Math.PI / 2; oyna.position.set(4.62, 1.675, z); g.add(oyna);
    g.add(quti(.06, 1.66, .05, OQ, 4.5, 1.675, z, false), quti(.06, .05, 1.62, OQ, 4.5, 1.675, z, false), quti(.2, .04, 1.7, OQ, 4.44, .86, z, false));
  });
  // shift chiroqlari
  const led = new T.MeshBasicMaterial({color:0xffffff});
  [[-2.2, -1.6], [2.2, -1.6], [-2.2, 1.6], [2.2, 1.6], [0, -.4]].forEach(([x, z])=>{ g.add(quti(1.3, .03, .32, led, x, 3.18, z, false)); g.add(quti(1.38, .05, .4, std('#c9ccd4'), x, 3.2, z, false)); });

  /* orqa devor: ish stoli, rakovina, osma shkaflar */
  const x1 = -1.25, x2 = 4.3, uz = x2 - x1, xm = (x1 + x2) / 2;
  g.add(quti(uz, .08, .56, QORA, xm, .04, -3.2), quti(uz, .78, .6, EMAN2, xm, .47, -3.2), quti(uz + .04, .045, .66, GRAFIT, xm, .885, -3.18));
  const n = 9, en = uz / n;
  for(let i = 0; i < n; i++){
    const x = x1 + en * (i + .5);
    g.add(quti(en - .03, .7, .02, EMAN, x, .47, -2.895)); g.add(quti(.16, .018, .02, METALL, x, .76, -2.875));
  }
  const kafelT = kanvas(256, 128, (c, w, h)=>{ c.fillStyle = '#1e8a86'; c.fillRect(0, 0, w, h); c.strokeStyle = '#d7efee'; c.lineWidth = 4; for(let i = 0; i < 2; i++) for(let j = 0; j < 2; j++){ c.fillStyle = (i + j) % 2 ? '#1f938e' : '#1b827f'; c.fillRect(i * 128, j * 64, 128, 64); c.strokeRect(i * 128, j * 64, 128, 64); } });
  kafelT.wrapS = kafelT.wrapT = T.RepeatWrapping; kafelT.repeat.set(uz / .4, 3);
  const kafel = new T.Mesh(new T.PlaneGeometry(uz, .64), new T.MeshStandardMaterial({map:kafelT, roughness:.25})); kafel.position.set(xm, 1.23, -3.495); g.add(kafel);
  g.add(quti(3.6, .7, .36, EMAN2, 2.5, 1.95, -3.32));
  for(let i = 0; i < 6; i++){ const x = .7 + .6 * (i + .5); g.add(quti(.57, .66, .02, EMAN, x, 1.95, -3.13)); g.add(quti(.018, .16, .02, METALL, x + (i % 2 ? -.22 : .22), 1.74, -3.11)); }
  // rakovina va jo‘mrak
  g.add(quti(.62, .01, .44, std('#aeb4bd', {roughness:.25, metalness:.9}), 1.0, .91, -3.18, false), quti(.5, .012, .34, std('#3c4048', {roughness:.3, metalness:.8}), 1.0, .914, -3.18, false));
  g.add(sil(.016, .02, .3, METALL, 1.0, 1.06, -3.4));
  const nay = new T.Mesh(new T.TorusGeometry(.09, .013, 10, 20, Math.PI), METALL); nay.rotation.y = Math.PI / 2; nay.position.set(1.0, 1.21, -3.31); nay.castShadow = true; g.add(nay);
  // stol ustidagi bezak: yuvgich, stakanlar
  const SH = new T.MeshPhysicalMaterial({color:0xffffff, transparent:true, opacity:.25, roughness:.05, depthWrite:false});
  [[2.2, .05, .12], [2.4, .04, .09], [2.55, .035, .14], [3.3, .06, .1]].forEach(([x, r, h])=>{ const m = new T.Mesh(new T.CylinderGeometry(r, r, h, 20, 1, true), SH); m.position.set(x, .91 + h / 2, -3.25); g.add(m); });
  // soat
  const soatT = kanvas(256, 256, (c, w)=>{ c.fillStyle = '#fff'; c.beginPath(); c.arc(128, 128, 120, 0, 7); c.fill(); c.strokeStyle = '#1b1f3a'; c.lineWidth = 10; c.stroke(); c.lineWidth = 6; for(let i = 0; i < 12; i++){ const a = i * Math.PI / 6; c.beginPath(); c.moveTo(128 + Math.cos(a) * 96, 128 + Math.sin(a) * 96); c.lineTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110); c.stroke(); } c.lineWidth = 9; c.beginPath(); c.moveTo(128, 128); c.lineTo(128 + 50, 128 - 40); c.stroke(); c.lineWidth = 6; c.beginPath(); c.moveTo(128, 128); c.lineTo(128 - 20, 128 - 88); c.stroke(); });
  const soat = new T.Mesh(new T.CircleGeometry(.2, 40), new T.MeshBasicMaterial({map:soatT})); soat.position.set(-.55, 2.45, -3.49); g.add(soat);

  /* REAKTIVLAR JAVONI */
  const javon = new T.Group(); javon.position.set(-2.8, 0, -3.27); g.add(javon);
  const JQ = std('#1c1f2a', {roughness:.45, metalness:.2}), TOKCHA = std('#e6e9ef', {roughness:.5});
  const JW = 2.3, JH = 2.2, JD = .44;
  javon.add(quti(JW, .1, JD, JQ, 0, .05, 0), quti(JW, .05, JD, JQ, 0, JH, 0), quti(.05, JH, JD, JQ, -JW / 2 + .025, JH / 2, 0), quti(.05, JH, JD, JQ, JW / 2 - .025, JH / 2, 0), quti(JW, JH, .03, std('#2a2d52'), 0, JH / 2, -JD / 2 + .015), quti(.04, JH - .1, .04, JQ, 0, JH / 2, JD / 2 - .02));
  const PAL = ['#2a86dd', '#c98a1e', '#7a1fa0', '#e8f0d8', '#eef2f4', '#4fae8a', '#d8342b', '#f2cf2e', '#9fd4ff', '#e0218a'];
  const jigar = new T.MeshPhysicalMaterial({color:R('#5a3414'), transparent:true, opacity:.8, roughness:.15});
  const tiniq = new T.MeshPhysicalMaterial({color:0xffffff, transparent:true, opacity:.28, roughness:.05, depthWrite:false});
  const qopqoq = std('#16181d', {roughness:.4});
  let urug = 7; const tas = ()=>{ urug = (urug * 9301 + 49297) % 233280; return urug / 233280; };
  for(let t = 0; t < 5; t++){
    const y = .1 + t * .42;
    if(t) javon.add(quti(JW - .1, .025, JD - .06, TOKCHA, 0, y, 0));
    const nur = new T.Mesh(new T.BoxGeometry(JW - .16, .012, .02), new T.MeshBasicMaterial({color:R('#bfeee9')})); nur.position.set(0, y + .395, JD / 2 - .07); javon.add(nur);
    for(let i = 0; i < 12; i++){
      const x = -JW / 2 + .17 + i * ((JW - .34) / 11), z = (tas() - .5) * .08;
      const tur = (i + t * 5) % 4, rr = PAL[Math.floor(tas() * PAL.length)];
      if(t === 0 && i > 8) continue;
      if(tur === 3){ // banka
        javon.add(sil(.05, .05, .1, tiniq, x, y + .063, z)); javon.add(sil(.046, .046, .06, std(['#9aa3ad', '#e9e6df', '#2b221d', '#f4f4f0'][Math.floor(tas() * 4)]), x, y + .045, z)); javon.add(sil(.052, .052, .022, qopqoq, x, y + .124, z));
      } else {
        const h = .13 + tas() * .07, ja = tas() > .72;
        javon.add(sil(.04, .04, h, ja ? jigar : tiniq, x, y + .013 + h / 2, z));
        if(!ja) javon.add(sil(.036, .036, h * .7, new T.MeshStandardMaterial({color:R(rr), transparent:true, opacity:.85, roughness:.2}), x, y + .015 + h * .35, z));
        javon.add(sil(.016, .03, .035, ja ? jigar : tiniq, x, y + .013 + h + .017, z)); javon.add(sil(.02, .02, .025, qopqoq, x, y + h + .06, z));
        const yor = new T.Mesh(new T.PlaneGeometry(.05, .045), new T.MeshBasicMaterial({color:0xf7f7f2})); yor.position.set(x, y + h * .5, z + .0405); javon.add(yor);
      }
    }
  }
  const eshikM = new T.MeshPhysicalMaterial({color:R('#cfe9ff'), transparent:true, opacity:.13, roughness:.02, depthWrite:false});
  [-JW / 4, JW / 4].forEach((x, i)=>{
    const e = new T.Mesh(new T.BoxGeometry(JW / 2 - .06, JH - .16, .012), eshikM); e.position.set(x, JH / 2 + .02, JD / 2); javon.add(e);
    javon.add(quti(.02, .34, .025, METALL, x + (i ? -.46 : .46), 1.1, JD / 2 + .02));
  });
  const yozuvT = kanvas(1024, 160, (c, w, h)=>{ c.fillStyle = '#23205e'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffcb5c'; c.beginPath(); c.moveTo(60, 124); c.lineTo(104, 40); c.lineTo(148, 124); c.closePath(); c.fill(); c.fillStyle = '#23205e'; c.font = '800 60px ' + SHRIFT; c.fillText('!', 94, 116); c.fillStyle = '#fff'; c.font = '800 64px ' + SHRIFT; c.fillText('REAKTIVLAR JAVONI', 190, 104); });
  const yozuv = new T.Mesh(new T.PlaneGeometry(JW, .36), new T.MeshBasicMaterial({map:yozuvT})); yozuv.position.set(0, JH + .23, JD / 2 - .2); javon.add(yozuv);
  javon.add(quti(JW, .38, .04, JQ, 0, JH + .23, JD / 2 - .225));
  const jNur = new T.PointLight(0xbfeee9, .55, 3.2); jNur.position.set(0, 1.3, .5); javon.add(jNur);
  const javonNishon = new T.Mesh(new T.BoxGeometry(JW, JH + .4, JD + .1), new T.MeshBasicMaterial({visible:false})); javonNishon.position.set(0, JH / 2 + .2, .03); javon.add(javonNishon);
  javonNishon.userData.lab = {tur:'javon'};

  /* chap devor: doska, plakatlar */
  const doska = new T.Mesh(new T.PlaneGeometry(3.2, 1.28), new T.MeshStandardMaterial({map:doskaT(), roughness:.9})); doska.rotation.y = Math.PI / 2; doska.position.set(-4.49, 1.75, -.9); g.add(doska);
  g.add(quti(.04, 1.36, 3.28, std('#b9bec8', {metalness:.6, roughness:.4}), -4.515, 1.75, -.9, false), quti(.09, .03, 3.2, std('#b9bec8', {metalness:.6, roughness:.4}), -4.45, 1.1, -.9, false));
  const jadval = new T.Mesh(new T.PlaneGeometry(2.0, 1.21), new T.MeshBasicMaterial({map:davriyJadval()})); jadval.rotation.y = Math.PI / 2; jadval.position.set(-4.49, 1.75, 2.1); g.add(jadval);
  const qoida = new T.Mesh(new T.PlaneGeometry(.78, 1.03), new T.MeshBasicMaterial({map:qoidalarPlakati()})); qoida.position.set(-1.0, 1.75, -3.49); g.add(qoida);
  // old devorda eshik, o‘t o‘chirgich
  g.add(quti(1.0, 2.1, .06, std('#8a6a44', {roughness:.55}), -3.0, 1.05, 3.5), quti(.03, .14, .05, METALL, -2.62, 1.05, 3.45));
  g.add(sil(.075, .075, .46, std('#c8202c', {roughness:.35}), -4.3, .33, 3.0), sil(.03, .05, .08, QORA, -4.3, .6, 3.0));

  /* MARKAZIY TAJRIBA STOLI */
  const SX = 0, SZ = -.6, SW = 2.5, SD = 1.3, SY = .92;
  g.add(quti(SW - .25, .08, SD - .25, QORA, SX, .04, SZ), quti(SW - .16, .78, SD - .16, EMAN2, SX, .47, SZ));
  const stolTop = quti(SW, .06, SD, std('#1d2027', {roughness:.32, metalness:.12}), SX, SY - .03, SZ);
  stolTop.userData.lab = {tur:'stol'}; g.add(stolTop);
  for(let i = 0; i < 4; i++){
    const x = SX - (SW - .16) / 2 + (SW - .16) / 4 * (i + .5);
    g.add(quti((SW - .16) / 4 - .03, .2, .02, EMAN, x, .74, SZ + (SD - .16) / 2 + .01), quti((SW - .16) / 4 - .03, .46, .02, EMAN, x, .38, SZ + (SD - .16) / 2 + .01));
    g.add(quti(.16, .016, .02, METALL, x, .74, SZ + (SD - .16) / 2 + .03), quti(.16, .016, .02, METALL, x, .56, SZ + (SD - .16) / 2 + .03));
  }
  // shtativ (bezak)
  const sht = new T.Group(); sht.position.set(-SW / 2 + .22, SY, -1.08); g.add(sht);
  sht.add(quti(.22, .018, .15, std('#2c2f38', {metalness:.5, roughness:.4}), 0, .009, 0), sil(.007, .007, .62, METALL, -.07, .32, -.04), quti(.16, .012, .012, METALL, .0, .42, -.04));
  const halqa = new T.Mesh(new T.TorusGeometry(.045, .005, 8, 24), METALL); halqa.rotation.x = Math.PI / 2; halqa.position.set(.08, .42, -.04); sht.add(halqa);
  // kursilar
  [[-1.8, -.2], [1.8, -.2]].forEach(([x, z])=>{ g.add(sil(.17, .17, .045, std('#2a2d52', {roughness:.5}), x, .62, z), sil(.02, .02, .6, METALL, x, .31, z), sil(.19, .19, .02, METALL, x, .01, z)); });

  /* yorug‘lik */
  sc.add(new T.HemisphereLight(0xffffff, 0x7d8296, .62));
  const kun = new T.DirectionalLight(0xfff4e2, 1.05); kun.position.set(4.6, 4.4, 1.4); kun.target.position.set(0, .9, -.6); sc.add(kun, kun.target);
  kun.castShadow = true; kun.shadow.mapSize.set(2048, 2048); kun.shadow.bias = -.0005; kun.shadow.normalBias = .02;
  const sk = kun.shadow.camera; sk.left = -3.2; sk.right = 3.2; sk.top = 2.6; sk.bottom = -2.6; sk.near = .5; sk.far = 12;
  const tepa = new T.PointLight(0xffffff, .55, 9); tepa.position.set(0, 2.9, -.4); sc.add(tepa);
  const old = new T.PointLight(0xdfe6ff, .3, 8); old.position.set(0, 2.2, 2.4); sc.add(old);

  return {g, stolTop, javonNishon, javonJoy:new T.Vector3(-2.8, 1.2, -3.0), stol:{x1:SX - SW / 2 + .12, x2:SX + SW / 2 - .12, z1:SZ - SD / 2 + .1, z2:SZ + SD / 2 - .1, y:SY},
    tosiqlar:[[SX - SW / 2 - .3, SX + SW / 2 + .3, SZ - SD / 2 - .3, SZ + SD / 2 + .3], [-4.0, -1.6, -3.5, -2.75], [-1.3, 4.5, -3.5, -2.6]], chegara:[-4.15, 4.1, -2.75, 3.1]};
}

/* ---------- SHISHA IDISHLAR ---------- */
const shishaMat = ()=>new T.MeshPhysicalMaterial({color:R('#eef6ff'), transparent:true, opacity:.2, roughness:.03, metalness:0, clearcoat:1, clearcoatRoughness:.05, side:T.DoubleSide, depthWrite:false, envMapIntensity:1.6});
const IDISH = {
  stakan:{r:.085, y0:.004, hMax:.128, profil:()=>.066, ogiz:.158,
    nuqta:()=>{ const r = .07, h = .155; return [[0, .003], [r * .96, .003], [r, .014], [r, h], [r * 1.07, h + .008]]; }},
  kolba:{r:.1, y0:.004, hMax:.092, profil:y=>.082 - (.082 - .03) * Math.min(1, y / .118), ogiz:.2,
    nuqta:()=>[[0, .003], [.082, .003], [.087, .014], [.03, .128], [.03, .19], [.037, .198]]},
  probirka:{r:.095, y0:.034, hMax:.115, profil:y=>y < .018 ? Math.sqrt(Math.max(1e-5, .018 * .018 - (.018 - y) * (.018 - y))) * .92 : .0166, ogiz:.2,
    nuqta:()=>{ const r = .02, p = []; for(let i = 0; i <= 6; i++){ const a = i / 6 * Math.PI / 2; p.push([r * Math.sin(a), .03 + r - r * Math.cos(a)]); } p.push([r, .19], [r * 1.14, .196]); return p; }},
  silindr:{r:.062, y0:.016, hMax:.2, profil:()=>.0245, ogiz:.262, isitilmaydi:true,
    nuqta:()=>[[0, .014], [.027, .014], [.028, .02], [.028, .25], [.033, .258]]}
};
function idish(kalit){
  const d = IDISH[kalit], g = new T.Group();
  const sh = new T.Mesh(new T.LatheGeometry(d.nuqta().map(p=>new T.Vector2(p[0], p[1])), 36), shishaMat()); sh.renderOrder = 3; sh.castShadow = true; g.add(sh);
  const chiziq = new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.55});
  if(kalit === 'stakan') [.045, .085, .125].forEach(y=>{ const h = new T.Mesh(new T.TorusGeometry(.0702, .0009, 6, 40, 1.6), chiziq); h.rotation.x = Math.PI / 2; h.rotation.z = .6; h.position.y = y; g.add(h); });
  if(kalit === 'silindr'){
    for(let i = 1; i <= 9; i++){ const h = new T.Mesh(new T.TorusGeometry(.0282, .0007, 6, 24, i % 5 ? .9 : 1.7), chiziq); h.rotation.x = Math.PI / 2; h.rotation.z = .5; h.position.y = .02 + i * .022; g.add(h); }
    const as = new T.Mesh(new T.CylinderGeometry(.055, .06, .014, 6), shishaMat()); as.position.y = .007; as.renderOrder = 3; g.add(as);
  }
  if(kalit === 'probirka'){
    const yog = new T.MeshStandardMaterial({color:R('#a57a4a'), roughness:.7});
    g.add(quti(.2, .016, .085, yog, 0, .008, 0), quti(.2, .012, .085, yog, 0, .125, 0), quti(.014, .13, .07, yog, -.093, .065, 0), quti(.014, .13, .07, yog, .093, .065, 0));
    [-.055, .055].forEach(x=>{ const q = new T.Mesh(new T.LatheGeometry(d.nuqta().map(p=>new T.Vector2(p[0] * .9, p[1])), 20), shishaMat()); q.position.x = x; q.renderOrder = 3; g.add(q); });
  }
  /* og‘iz halqasi — shisha cheti aniq ko‘rinsin */
  { const q = d.nuqta(), u = q[q.length - 1]; const h = new T.Mesh(new T.TorusGeometry(u[0], .0016, 8, 40), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.55, depthWrite:false})); h.rotation.x = Math.PI / 2; h.position.y = u[1]; h.renderOrder = 4; g.add(h); }
  const suyuq = new T.Mesh(new T.BufferGeometry(), new T.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:.4, roughness:.3, depthWrite:false, side:T.FrontSide, envMapIntensity:.25})); suyuq.renderOrder = 1; /* DoubleSide yuzada «arra tishi» izlarini berardi */ suyuq.visible = false; g.add(suyuq);
  const chokma = new T.Mesh(new T.BufferGeometry(), new T.MeshStandardMaterial({color:0xffffff, roughness:.95})); chokma.renderOrder = 0; chokma.visible = false; g.add(chokma);
  const kopik = new T.Mesh(new T.CircleGeometry(1, 28), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0, depthWrite:false})); kopik.rotation.x = -Math.PI / 2; kopik.renderOrder = 2; g.add(kopik);
  const qattiq = new T.Group(); g.add(qattiq);
  return {g, d, suyuq, chokma, kopik, qattiq};
}
/* y0 dan hf balandlikkacha suyuqlik (yoki cho‘kma) shakli */
function suyuqGeom(d, hf, kichik){
  const p = [new T.Vector2(0, d.y0)], n = 7, k = kichik || .985;
  for(let i = 0; i <= n; i++){ const y = hf * i / n; p.push(new T.Vector2(Math.max(.001, d.profil(y) * k), d.y0 + y)); }
  p.push(new T.Vector2(0, d.y0 + hf));
  return new T.LatheGeometry(p, 28);
}

/* ---------- qattiq modda bo‘lakchalari ---------- */
function bolakcha(kalit, d){
  const g = new T.Group(), r = d.profil(.004) * .62, y = d.y0 + .008;
  const m = (h, o)=>new T.MeshStandardMaterial(Object.assign({color:R(h), roughness:.45, metalness:.7}, o || {}));
  if(kalit === 'Zn_s'){ const mm = m('#9aa3ad'); [[-.5, .2], [.4, -.3], [.1, .55], [-.2, -.5]].forEach(([a, b], i)=>{ const q = new T.Mesh(new T.DodecahedronGeometry(.011 + i * .0015, 0), mm); q.position.set(a * r, y + .004, b * r); q.rotation.set(i, i * 2, i * 3); q.scale.y = .7; g.add(q); }); }
  else if(kalit === 'Mg_s'){ const mm = m('#d5d9dd', {roughness:.35}); for(let i = 0; i < 5; i++){ const q = new T.Mesh(new T.BoxGeometry(r * .5, .0016, .009), mm); q.position.set((i - 2) * r * .36, y + Math.abs(i - 2) * .003, Math.sin(i * 1.3) * r * .25); q.rotation.z = (i - 2) * -.28; q.rotation.y = .4; g.add(q); } }
  else if(kalit === 'Fe_s'){ const mm = m('#6f747a', {roughness:.5}); const uz = Math.min(.085, r * 2.2); const q = new T.Mesh(new T.CylinderGeometry(.0028, .0028, uz, 10), mm); q.rotation.z = Math.PI / 2 - .18; q.rotation.y = .5; q.position.y = y + .008; g.add(q); const b = new T.Mesh(new T.CylinderGeometry(.0065, .0065, .002, 12), mm); b.rotation.z = Math.PI / 2 - .18; b.rotation.y = .5; b.position.set(-uz / 2 * Math.cos(.5) * .98, y + .0155, uz / 2 * Math.sin(.5) * .98); g.add(b); }
  else if(kalit === 'Cu_s'){ const mm = m('#c0622d', {roughness:.3, metalness:.9}); for(let i = 0; i < 4; i++){ const q = new T.Mesh(new T.TorusGeometry(Math.min(.016, r * .5), .0018, 8, 24), mm); q.position.set(0, y + .004 + i * .0065, 0); q.rotation.x = Math.PI / 2 + .12; g.add(q); } }
  else if(kalit === 'Na_s'){ const q = new T.Mesh(new T.SphereGeometry(.011, 14, 12), m('#e2dfd4', {roughness:.25, metalness:.85})); q.position.y = y; g.add(q); g.userData.suzadi = true; }
  else if(kalit === 'CaCO3_s'){ const mm = new T.MeshStandardMaterial({color:R('#ebe8e1'), roughness:.85, flatShading:true}); [[-.4, .1], [.35, .35], [.05, -.45]].forEach(([a, b], i)=>{ const q = new T.Mesh(new T.IcosahedronGeometry(.013 + i * .002, 0), mm); q.position.set(a * r, y + .006, b * r); q.rotation.set(i * 1.2, i, i * .5); g.add(q); }); }
  else { const rr = {MnO2_s:'#2b221d', CuO_s:'#14110e', NaHCO3_s:'#f4f4f0', NH4_s:'#f1f1ec'}[kalit] || '#888'; const q = new T.Mesh(new T.SphereGeometry(r * .9, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshStandardMaterial({color:R(rr), roughness:1})); q.scale.y = .28; q.position.y = d.y0 + .001; g.add(q); }
  g.traverse(o=>{ if(o.isMesh){ o.castShadow = true; o.userData.asl = o.material.color.clone(); } });
  return g;
}

/* ---------- reaktiv idishi: shisha, banka, tomizgich, ballon ---------- */
function yorliqT(rk){
  return kanvas(256, 160, (c, w, h)=>{
    c.fillStyle = '#fbfbf6'; c.fillRect(0, 0, w, h); c.fillStyle = rk.ghs && rk.ghs.length ? '#c8202c' : '#2a2d52'; c.fillRect(0, 0, w, 16);
    c.fillStyle = '#12152b'; c.textAlign = 'center'; const f = rk.f.length > 9 ? 'indikator' : rk.f;
    c.font = '800 ' + (f.length > 6 ? 46 : 62) + 'px ' + SHRIFT; c.fillText(f, w / 2, 92);
    c.font = '600 22px ' + SHRIFT; c.fillStyle = '#464c6b'; c.fillText(rk.nom.length > 20 ? rk.nom.slice(0, 19) + '…' : rk.nom, w / 2, 134);
  });
}
function shisha(rk){
  const g = new T.Group(); let r = .05;
  const yor = (rad, y, bal)=>{ const m = new T.Mesh(new T.CylinderGeometry(rad, rad, bal, 24, 1, true, -0.85, 1.7), new T.MeshBasicMaterial({map:yorliqT(rk), side:T.FrontSide})); m.position.y = y; m.renderOrder = 4; g.add(m); };
  if(rk.tur === 'gaz'){
    r = .075; const mm = std(rk.rang, {roughness:.35, metalness:.55});
    g.add(sil(.058, .058, .56, mm, 0, .3, 0, 32)); const gumbaz = new T.Mesh(new T.SphereGeometry(.058, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), mm); gumbaz.position.y = .58; gumbaz.castShadow = true; g.add(gumbaz);
    g.add(sil(.062, .062, .025, std('#15171c'), 0, .0125, 0, 32), sil(.016, .02, .05, std('#b89146', {metalness:.9, roughness:.3}), 0, .655, 0), sil(.03, .03, .01, std('#b89146', {metalness:.9, roughness:.3}), 0, .69, 0));
    const tasma = new T.Mesh(new T.CylinderGeometry(.0585, .0585, .1, 32, 1, true), new T.MeshBasicMaterial({color:R('#f4f4f0')})); tasma.position.y = .4; g.add(tasma);
    const m = new T.Mesh(new T.CylinderGeometry(.059, .059, .1, 24, 1, true, -.7, 1.4), new T.MeshBasicMaterial({map:yorliqT(rk)})); m.position.y = .4; g.add(m);
  } else if(rk.tur === 'qattiq' || rk.tur === 'kukun'){
    const sh = new T.Mesh(new T.CylinderGeometry(.042, .042, .085, 28, 1, true), shishaMat()); sh.material.opacity = .3; sh.position.y = .0445; sh.renderOrder = 3; g.add(sh);
    g.add(sil(.04, .04, rk.f === 'Na' ? .06 : .05, new T.MeshStandardMaterial({color:R(rk.f === 'Na' ? '#d9c58a' : rk.rang), roughness:rk.f === 'Na' ? .2 : .9, transparent:rk.f === 'Na', opacity:rk.f === 'Na' ? .75 : 1}), 0, rk.f === 'Na' ? .032 : .027, 0));
    g.add(sil(.045, .045, .02, std('#1b1d24', {roughness:.4}), 0, .097, 0)); yor(.0428, .047, .05);
  } else {
    const kichik = rk.tur === 'indikator', rb = kichik ? .028 : .037, hb = kichik ? .075 : .105;
    const mat = rk.idishRang ? new T.MeshPhysicalMaterial({color:R(rk.idishRang), transparent:true, opacity:.82, roughness:.12, side:T.DoubleSide}) : Object.assign(shishaMat(), {opacity:.3});
    const p = [[0, .002], [rb, .002], [rb, hb], [rb * .45, hb + .02], [rb * .45, hb + .045]].map(q=>new T.Vector2(q[0], q[1]));
    const sh = new T.Mesh(new T.LatheGeometry(p, 28), mat); sh.renderOrder = 3; sh.castShadow = true; g.add(sh);
    if(!rk.idishRang){ const s = new T.Mesh(new T.CylinderGeometry(rb * .93, rb * .93, hb * .72, 24), new T.MeshStandardMaterial({color:R(rk.rang), transparent:true, opacity:Math.min(.92, (rk.shaffof || .3) + .25), roughness:.15, depthWrite:false})); s.position.y = .004 + hb * .36; s.renderOrder = 1; g.add(s); }
    if(kichik){ g.add(sil(rb * .5, rb * .5, .012, std('#15171c'), 0, hb + .05, 0)); const rez = new T.Mesh(new T.SphereGeometry(.013, 14, 12), std('#c8202c', {roughness:.5})); rez.scale.y = 1.5; rez.position.y = hb + .072; g.add(rez); }
    else g.add(sil(rb * .55, rb * .55, .022, std(rk.ghs && rk.ghs.length ? '#c8202c' : '#2a2d52', {roughness:.4}), 0, hb + .05, 0));
    yor(rb + .0008, hb * .5, hb * .62); r = kichik ? .04 : .05;
  }
  g.traverse(o=>{ if(o.isMesh && o.material.type !== 'MeshBasicMaterial') o.castShadow = true; });
  return {g, r};
}

/* ---------- elektr isitgich ---------- */
function plita(){
  const g = new T.Group();
  const korpus = T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(.3, .08, .32, 4, .018) : new T.BoxGeometry(.3, .08, .32);
  const k = new T.Mesh(korpus, std('#2b2f3a', {roughness:.4, metalness:.3})); k.position.y = .045; k.castShadow = true; k.receiveShadow = true; g.add(k);
  [[-.12, -.12], [.12, -.12], [-.12, .12], [.12, .12]].forEach(([x, z])=>g.add(sil(.014, .014, .01, std('#0e0f12'), x, .005, z)));
  const ust = sil(.115, .115, .012, std('#e9ebee', {roughness:.25}), 0, .091, -.02, 40); g.add(ust);
  const nurM = new T.MeshBasicMaterial({color:R('#ff4a12'), transparent:true, opacity:0, depthWrite:false});
  const nur = new T.Mesh(new T.RingGeometry(.022, .106, 40), nurM); nur.rotation.x = -Math.PI / 2; nur.position.set(0, .0975, -.02); g.add(nur);
  const c = document.createElement('canvas'); c.width = 256; c.height = 96; const tx = new T.CanvasTexture(c); tx.encoding = T.sRGBEncoding;
  const ekran = new T.Mesh(new T.PlaneGeometry(.11, .04), new T.MeshBasicMaterial({map:tx})); ekran.position.set(-.04, .045, .1605); g.add(ekran);
  const murvat = sil(.018, .02, .016, std('#d7dbe2', {roughness:.3, metalness:.6}), .09, .045, .166); murvat.rotation.x = Math.PI / 2; murvat.userData.murvat = true; g.add(murvat);
  const yoz = (t, yoniq)=>{ const x = c.getContext('2d'); x.fillStyle = '#05080c'; x.fillRect(0, 0, 256, 96); x.fillStyle = yoniq ? '#ff7a3d' : '#19c7b5'; x.font = '700 62px "JBMono",Consolas,monospace'; x.textAlign = 'center'; x.fillText(Math.round(t) + ' °C', 128, 70); tx.needsUpdate = true; };
  yoz(22, false);
  return {g, r:.19, ustY:.097, ustZ:-.02, nurM, yoz};
}

/* ---------- yog‘och cho‘p (gaz sinovi effekti) ---------- */
function chop(){
  const g = new T.Group();
  const tayoq = new T.Mesh(new T.CylinderGeometry(.0028, .0028, .24, 8), std('#c9a06a', {roughness:.8})); tayoq.rotation.z = -(Math.PI / 2 - .5); tayoq.position.set(.105, .0575, 0); g.add(tayoq);
  const alanga = new T.Group(); g.add(alanga);
  const a1 = new T.Mesh(new T.ConeGeometry(.012, .045, 14), new T.MeshBasicMaterial({color:R('#ff8a1f'), transparent:true, opacity:.9, depthWrite:false, blending:T.AdditiveBlending})); a1.position.y = .022; alanga.add(a1);
  const a2 = new T.Mesh(new T.ConeGeometry(.006, .026, 12), new T.MeshBasicMaterial({color:R('#fff3b0'), transparent:true, opacity:.95, depthWrite:false, blending:T.AdditiveBlending})); a2.position.y = .014; alanga.add(a2);
  const chog = new T.Mesh(new T.SphereGeometry(.0042, 10, 8), new T.MeshBasicMaterial({color:R('#ff4a12')})); g.add(chog);
  const nur = new T.PointLight(0xff9a3d, 0, .9); nur.position.y = .03; g.add(nur);
  return {g, alanga, chog, nur};
}

/* ---------- spirt lampasi (spirtovka) ---------- */
function spirtovka(){
  const g = new T.Group();
  const p = [[0, .002], [.044, .002], [.05, .01], [.051, .028], [.044, .046], [.03, .058], [.017, .064], [.017, .074]].map(q=>new T.Vector2(q[0], q[1]));
  const sh = new T.Mesh(new T.LatheGeometry(p, 36), Object.assign(shishaMat(), {opacity:.3})); sh.renderOrder = 3; sh.castShadow = true; g.add(sh);
  const sp = [[0, .005], [.043, .005], [.048, .012], [.049, .03], [0, .03]].map(q=>new T.Vector2(q[0], q[1]));
  const spirt = new T.Mesh(new T.LatheGeometry(sp, 32), new T.MeshStandardMaterial({color:R('#cfe6ff'), transparent:true, opacity:.35, roughness:.1, depthWrite:false})); spirt.renderOrder = 1; g.add(spirt);
  g.add(sil(.019, .019, .012, std('#b9bec6', {metalness:.8, roughness:.3}), 0, .079, 0, 24));
  const pilik = sil(.0048, .0048, .016, std('#efe9da', {roughness:1}), 0, .092, 0, 12); g.add(pilik);
  const pilikUch = sil(.005, .005, .003, std('#2a2420', {roughness:1}), 0, .1, 0, 12); g.add(pilikUch);
  /* qalpoq: o‘chiq holatda pilik ustida, yoniqda — yonida */
  const qalpoq = new T.Group();
  const qp = [[.024, 0], [.024, .03], [.018, .042], [0, .045]].map(q=>new T.Vector2(q[0], q[1]));
  const qm = new T.Mesh(new T.LatheGeometry(qp, 28), new T.MeshPhysicalMaterial({color:R('#dfe8f2'), transparent:true, opacity:.55, roughness:.1, side:T.DoubleSide, depthWrite:false})); qm.renderOrder = 3; qalpoq.add(qm);
  const qalpoqUst = new T.Vector3(0, .074, 0), qalpoqYon = new T.Vector3(.078, .0, .03);
  qalpoq.position.copy(qalpoqUst); g.add(qalpoq);
  /* alanga */
  const alanga = new T.Group(); alanga.position.set(0, .1015, 0); g.add(alanga);
  /* spirt alangasi deyarli rangsiz-ko‘kimtir: tuz qo‘shilgandagi rang aniq ajralib ko‘rinadi */
  const asl = R('#9dbbff');
  const tomchi = (r, h)=>{ const q = []; for(let i = 0; i <= 14; i++){ const t = i / 14; q.push(new T.Vector2(Math.max(.0002, r * Math.sin(Math.PI * Math.pow(t, .62)) * (1 - t * .25)), h * t)); } return new T.LatheGeometry(q, 24); };
  const tashqi = new T.Mesh(tomchi(.0105, .058), new T.MeshBasicMaterial({color:asl.clone(), transparent:true, opacity:.5, depthWrite:false, side:T.DoubleSide}));
  tashqi.renderOrder = 6; alanga.add(tashqi);
  const ichki = new T.Mesh(tomchi(.0052, .02), new T.MeshBasicMaterial({color:R('#3f6dff'), transparent:true, opacity:.85, depthWrite:false}));
  ichki.renderOrder = 7; ichki.position.y = .001; alanga.add(ichki);
  const nur = new T.PointLight(0xffb060, 0, .7); nur.position.y = .13; g.add(nur);
  g.traverse(o=>{ if(o.isMesh && o.material.type !== 'MeshBasicMaterial') o.castShadow = true; });
  return {g, r:.06, alanga, tashqi, ichki, nur, asl, qalpoq, qalpoqUst, qalpoqYon, alangaNuqta:new T.Vector3(0, .128, 0)};
}

/* ---------- nixrom sim halqa (alanga rangi sinovi) — halqa markazi (0,0,0) da ---------- */
function simHalqa(){
  const g = new T.Group();
  const simM = std('#b8b2a6', {metalness:.8, roughness:.35});
  const h = new T.Mesh(new T.TorusGeometry(.0055, .0009, 8, 24), simM); h.rotation.x = Math.PI / 2; g.add(h);
  const sim = new T.Mesh(new T.CylinderGeometry(.0008, .0008, .09, 6), simM); sim.rotation.z = -(Math.PI / 2 - .35); sim.position.set(.0485, .016, 0); g.add(sim);
  const dasta = new T.Mesh(new T.CylinderGeometry(.0035, .0035, .11, 10), std('#2d3340', {roughness:.5})); dasta.rotation.z = -(Math.PI / 2 - .35); dasta.position.set(.1395, .0485, 0); g.add(dasta);
  const qizil = new T.Mesh(new T.TorusGeometry(.0055, .0014, 8, 24), new T.MeshBasicMaterial({color:R('#ff6a2a'), transparent:true, opacity:0, depthWrite:false, blending:T.AdditiveBlending})); qizil.rotation.x = Math.PI / 2; g.add(qizil);
  return {g, qizil};
}

/* ---------- indikator qog‘ozi tasmasi (pastki uchi bo‘yaladi) ---------- */
function qogozTasma(){
  const g = new T.Group();
  const ust = new T.Mesh(new T.BoxGeometry(.012, .06, .0008), new T.MeshStandardMaterial({color:R('#f0e2a6'), roughness:.9})); ust.position.y = .045; g.add(ust);
  const uch = new T.Mesh(new T.BoxGeometry(.012, .016, .0009), new T.MeshStandardMaterial({color:R('#f0e2a6'), roughness:.9})); uch.position.y = .007; g.add(uch);
  const qisq = new T.Mesh(new T.BoxGeometry(.018, .012, .006), std('#6b7280', {metalness:.6, roughness:.4})); qisq.position.y = .08; g.add(qisq);
  return {g, uch};
}

window.MAKON_LAB_MODEL = {xona, idish, IDISH, suyuqGeom, bolakcha, shisha, plita, spirtovka, simHalqa, qogozTasma, chop, R};
})();
