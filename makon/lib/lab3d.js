/* MAKON — virtual kimyo laboratoriyasi: mexanika va interfeys (v4 — oson boshqaruv).
   window.MAKON_LAB.och(idish) → api. Ma’lumot: lab_malumot.js, modellar: lib/lab_xona.js.
   Boshqaruv: chap javondan idish yoki jihozni bosing — stolga qo‘yiladi (yoki sahnaga sudrang);
   idishni bosing — tanlanadi, so‘ng javondagi reaktivni bosing — shu idishga quyiladi; amallar o‘ng panelda.
   Stoldagi buyumni sudrab joyini o‘zgartiring; bo‘sh joyni sudrang — aylantirish; g‘ildirak — yaqinlashtirish;
   buyumni ikki marta bosing — yaqindan ko‘rish. Esc — bekor, Delete — tanlangan buyumni olib tashlash. */
(function(){
const T = THREE, EPS = 1e-4, XONA_T = 22;
const QISQA = {stakan:'Stakan', kolba:'Kolba', probirka:'Probirka', silindr:'Silindr', plita:'Isitgich', spirtovka:'Spirt lampasi', chop:'Cho‘p', qogoz:'pH qog‘oz'};
const esc = s=>String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ---------- SVG belgilar ---------- */
const GHS_NOM = {GHS02:'Yonuvchan', GHS03:'Oksidlovchi', GHS04:'Bosim ostidagi gaz', GHS05:'Yemiruvchi', GHS06:'Zaharli', GHS07:'Zararli / ta’sirlantiruvchi', GHS08:'Sog‘liq uchun xavfli', GHS09:'Atrof-muhit uchun xavfli'};
const GHS_BELGI = {
  GHS02:'<path d="M20 9c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 2.6-6.5.9 1.6 1.9 2.2 2.6 2.2C19.6 14 19 11.5 20 9z"/><path d="M12 30h16" stroke="#111" stroke-width="2.2"/>',
  GHS03:'<circle cx="20" cy="25" r="4.6" fill="none" stroke="#111" stroke-width="2.2"/><path d="M20 8c.8 3 4 4.3 4 8.3a4 4 0 0 1-8 0c0-2 1.3-2.8 1.8-4.5.6 1 1.2 1.5 1.7 1.5-.3-1.8-.2-3.7.5-5.3z"/><path d="M11 32h18" stroke="#111" stroke-width="2.2"/>',
  GHS04:'<g transform="rotate(-38 20 20)"><rect x="9" y="16" width="20" height="8" rx="4"/><rect x="29" y="18.3" width="4" height="3.4"/></g>',
  GHS05:'<path d="M9 12l8 2-1 3-8-2zM23 12l8-2 1 3-8 2z"/><path d="M14 19v3M26 18v3" stroke="#111" stroke-width="2.4" stroke-linecap="round"/><path d="M8 27h10l-2-2.5h-5zM21 25h11v3H21z"/>',
  GHS06:'<path d="M20 9a7 7 0 0 0-4 12.7V24h8v-2.3A7 7 0 0 0 20 9z"/><circle cx="17.3" cy="16" r="1.7" fill="#fff"/><circle cx="22.7" cy="16" r="1.7" fill="#fff"/><path d="M11 26l18 6M29 26l-18 6" stroke="#111" stroke-width="2.6" stroke-linecap="round"/>',
  GHS07:'<path d="M18.3 9h3.4l-.7 14h-2z"/><circle cx="20" cy="28" r="2.3"/>',
  GHS08:'<circle cx="20" cy="12.5" r="3.6"/><path d="M12 31c0-8 3-13 8-13s8 5 8 13z"/><path d="M20 20l1.3 3 3.2.2-2.5 2 .9 3.1L20 26.6l-2.9 1.7.9-3.1-2.5-2 3.2-.2z" fill="#fff"/>',
  GHS09:'<path d="M14 9v14M14 12l-4 3M14 15l4-3M14 18l-4 3" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M17 28c3-3.5 8-3.5 11 0-3 3.5-8 3.5-11 0zM28 28l4-2.5v5z"/><path d="M8 25h9" stroke="#111" stroke-width="2"/>'
};
const ghsSvg = k=>'<svg viewBox="0 0 40 40" class="ghs" aria-hidden="true"><path d="M20 2.5 37.5 20 20 37.5 2.5 20Z" fill="#fff" stroke="#e11d2a" stroke-width="3.2" stroke-linejoin="round"/><g fill="#111">' + GHS_BELGI[k].replace(/(\d)00(?=\D)/g, '$1') + '</g></svg>';
function buyumIkon(tur, k, D){
  const o = 'fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  if(tur === 'jihoz'){
    const J = {
      stakan:'<path '+o+' d="M13 8h22l-1.5 30a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3z"/><path d="M14.6 24h18.8l-.8 13.5a3 3 0 0 1-3 2.5H18.4a3 3 0 0 1-3-2.5z" fill="rgba(120,200,255,.35)"/><path '+o+' d="M29 16h4M29 22h4"/>',
      kolba:'<path '+o+' d="M20 7h8M21 7v11L11 37a3 3 0 0 0 2.7 4.3h20.6A3 3 0 0 0 37 37L27 18V7"/><path d="M15.5 29h17l3.3 7.5a2.5 2.5 0 0 1-2.3 3.5H14.5a2.5 2.5 0 0 1-2.3-3.5z" fill="rgba(120,200,255,.35)"/>',
      probirka:'<path '+o+' d="M19 6h10M20.5 6v27a3.5 3.5 0 0 0 7 0V6"/><path d="M21.5 22h5v11a2.5 2.5 0 0 1-5 0z" fill="rgba(120,200,255,.4)"/><path '+o+' d="M9 40h30M12 28h6M30 28h6M12 28v12M36 28v12"/>',
      silindr:'<path '+o+' d="M19 6h10v32H19zM14 42h20l-3-4H17z"/><path d="M20 22h8v15h-8z" fill="rgba(120,200,255,.35)"/><path '+o+' d="M25 12h4M25 17h4M25 27h4M25 32h4"/>',
      plita:'<rect '+o+' x="7" y="22" width="34" height="16" rx="3"/><ellipse '+o+' cx="24" cy="19" rx="13" ry="3.5"/><rect x="12" y="27" width="13" height="6" rx="1" fill="#19c7b5"/><circle '+o+' cx="33" cy="30" r="2.5"/>',
      spirtovka:'<path '+o+' d="M12 42h24a3 3 0 0 0 2.6-4.5L31 25h-14L9.4 37.5A3 3 0 0 0 12 42zM20.5 25v-5h7v5"/><path d="M13.5 38h21l-3.2-6h-14.6z" fill="rgba(160,210,255,.35)"/><path d="M24 4c1.3 4 5 5.6 5 10a5 5 0 0 1-10 0c0-2.6 1.8-3.4 2.3-5.5.7 1.3 1.6 1.8 2.2 1.8C23.2 8.7 23 6.2 24 4z" fill="#ffb01f"/><path d="M24 10.5c.6 1.6 2 2.2 2 4a2 2 0 0 1-4 0c0-1 .6-1.5.9-2.3.3.5.7.7 1 .7z" fill="#5b8cff"/>',
      chop:'<path '+o+' d="M10 40L32 16"/><path d="M33 5c1.2 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.7-3.3 2.2-5.4.7 1.3 1.5 1.8 2.1 1.8C32.2 9.7 32 7.2 33 5z" fill="#ff8a1f"/>',
      qogoz:'<rect '+o+' x="18" y="5" width="12" height="38" rx="1.5"/><rect x="19.5" y="28" width="9" height="4" fill="#e0402a"/><rect x="19.5" y="32" width="9" height="4" fill="#f2cf2e"/><rect x="19.5" y="36" width="9" height="5" fill="#2b59c3"/><rect x="19.5" y="24" width="9" height="4" fill="#3fae5a"/>'
    };
    return '<svg viewBox="0 0 48 48" aria-hidden="true">' + (J[k] || '').replace(/(\d)00(?=\D)/g, '$1') + '</svg>';
  }
  const r = D.REAKTIV[k], c = r.rang; let ich;
  if(r.tur === 'gaz') ich = '<rect x="17" y="12" width="14" height="31" rx="6" fill="'+c+'" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/><rect x="21.5" y="5" width="5" height="7" rx="1" fill="#b89146"/><rect x="18" y="5" width="12" height="2.5" rx="1" fill="#b89146"/><rect x="17" y="21" width="14" height="8" fill="#f4f4f0"/><text x="24" y="27.5" font-size="6.5" font-weight="800" text-anchor="middle" fill="#12152b">'+esc(r.f)+'</text>';
  else if(r.tur === 'qattiq' || r.tur === 'kukun') ich = '<rect x="12" y="16" width="24" height="26" rx="3" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.7)" stroke-width="1.4"/><path d="M13.5 28h21v10a2.5 2.5 0 0 1-2.5 2.5h-16a2.5 2.5 0 0 1-2.5-2.5z" fill="'+c+'"/><rect x="11" y="10" width="26" height="6" rx="2" fill="#23262e" stroke="rgba(255,255,255,.4)"/>';
  else if(r.tur === 'indikator') ich = '<path d="M17 22h14v17a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3z" fill="'+(r.idishRang || 'rgba(255,255,255,.12)')+'" stroke="rgba(255,255,255,.7)" stroke-width="1.4"/><path d="M18.5 30h11v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2z" fill="'+c+'" opacity=".9"/><rect x="21" y="16" width="6" height="6" fill="#23262e"/><ellipse cx="24" cy="10.5" rx="4" ry="6" fill="#c8202c"/>';
  else ich = '<path d="M20 6h8v8l6 6v19a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V20l6-6z" fill="'+(r.idishRang || 'rgba(255,255,255,.1)')+'" stroke="rgba(255,255,255,.7)" stroke-width="1.4" stroke-linejoin="round"/>'+(r.idishRang ? '' : '<path d="M15.5 25h17v13.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="'+c+'" opacity=".9"/>')+'<rect x="18" y="27" width="12" height="9" rx="1" fill="#fbfbf6"/><rect x="19.5" y="3" width="9" height="4" rx="1" fill="'+(r.ghs.length ? '#c8202c' : '#2a2d52')+'"/>';
  return '<svg viewBox="0 0 48 48" aria-hidden="true">' + ich.replace(/(\d)00(?=\D)/g, '$1') + '</svg>';
}

const UI = {
  javon:'<path d="M4 3h16v18H4zM12 3v18M4 9h16M4 15h16"/>', daftar:'<path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6zM6 3v18M10 8h5M10 12h5"/>',
  yordam:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>', ekran:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', yop:'<path d="M6 6l12 12M18 6L6 18"/>',
  ovoz:'<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6"/>', ovozsiz:'<path d="M4 9v6h4l5 4V5L8 9zM16 9l5 6M21 9l-5 6"/>', belgi:'<path d="M5 12l4.5 4.5L19 7"/>', ogoh:'<path d="M12 3l10 18H2zM12 10v5M12 18h.01"/>',
  tajriba:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 14h9"/>',
  umumiy:'<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.5"/>',
  yuqori:'<path d="M12 3v7M9 7l3 3 3-3M4 14l8 4 8-4-8-4z"/>', yaqin:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8v6M8 11h6"/>',
  tozala:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>', isit:'<path d="M8 3c0 2-2 2-2 4s2 2 2 4M12 3c0 2-2 2-2 4s2 2 2 4M16 3c0 2-2 2-2 4s2 2 2 4M3 15h18v4H3z"/>',
  chop:'<path d="M5 20L16 9"/><path d="M17 3c1 2.5 3.5 3.3 3.5 6a3.5 3.5 0 0 1-7 0c0-1.6 1.1-2.2 1.4-3.5.5.8 1 1.1 1.4 1.1-.2-1.3 0-2.6.7-3.6z"/>',
  qogoz:'<rect x="9" y="3" width="6" height="18" rx="1"/><path d="M9 14h6M9 17.5h6"/>', yuv:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  olib:'<path d="M5 12h14M13 6l6 6-6 6"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>', olov:'<path d="M12 3c1.5 4 6 5.5 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2.8-7 .9 1.8 2 2.5 2.8 2.5C11.2 7.4 11 5 12 3z"/>',
  orqa:'<path d="M15 6l-6 6 6 6"/>'
};
const ui = (n, w)=>'<svg viewBox="0 0 24 24" width="'+(w || 17)+'" height="'+(w || 17)+'" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+UI[n]+'</svg>';

function och(idishEl){
  const D = window.MAKON_LAB_MALUMOT, MD = window.MAKON_LAB_MODEL, R = MD.R;
  const xar = window._sahnalar; const eski = xar && xar.get(idishEl); if(eski) eski.yopish();
  let saq = {kashf:{}, top:{}, yordam:0, ovoz:1};
  try{ saq = Object.assign(saq, JSON.parse(localStorage.getItem('makon:lab') || '{}')); }catch(e){}
  const saqla = ()=>{ try{ localStorage.setItem('makon:lab', JSON.stringify(saq)); }catch(e){} };
  const REAL = D.REAKSIYA.filter(r=>!r.taqiq);
  const TURLAR = [['jihoz', 'Jihozlar', '#8b7bff']].concat(D.TUR.filter(t=>t[0] !== 'jihoz'));

  idishEl.innerHTML = `<div class="lab">
    <div class="lab-sahna"></div>
    <div class="lab-yorliqlar"></div>
    <aside class="lab-chap shisha" aria-label="Javon: reaktiv va jihozlar">
      <div class="lc-bosh"><div><span class="ustki">Javon</span><b>Reaktiv va jihozlar</b></div><button class="lc-yop" aria-label="Javonni yopish">${ui('yop', 15)}</button></div>
      <input class="lc-qidir" type="search" placeholder="Qidirish: nomi yoki formulasi" aria-label="Qidirish">
      <nav class="lc-tur"></nav>
      <div class="lc-royxat"></div>
      <p class="lc-maslahat">Bosing yoki sahnaga sudrang · <b>i</b> — batafsil va xavf belgilari<br><span class="lc-ogoh">${ui('ogoh', 12)} Soddalashtirilgan virtual model. Haqiqiy tajriba — faqat o‘qituvchi nazoratida.</span></p>
    </aside>
    <div class="lab-tepa">
      <div class="lt-chap">
        <button class="lab-t lt-javon" data-a="javon">${ui('javon')}<span>Javon</span></button>
        <button class="lab-t asosiy" data-a="tajriba">${ui('tajriba')}<span>Tajribalar</span><em id="labTop"></em></button>
        <button class="lab-t" data-a="daftar">${ui('daftar')}<span>Daftar</span><em id="labKashf"></em></button>
      </div>
      <div class="lt-ong">
        <div class="lab-korinish" role="group" aria-label="Ko‘rinish"><button data-k="umumiy" title="Umumiy ko‘rinish">${ui('umumiy')}</button><button data-k="yuqori" title="Yuqoridan ko‘rish">${ui('yuqori')}</button><button data-k="yaqin" title="Tanlangan buyumga yaqinlashish">${ui('yaqin')}</button></div>
        <button class="lab-t ik" data-a="tozala" title="Stolni tozalash">${ui('tozala')}</button>
        <button class="lab-t ik" data-a="ovoz" title="Ovoz"></button>
        <button class="lab-t ik" data-a="yordam" title="Yordam">${ui('yordam')}</button>
        <button class="lab-t ik" data-a="ekran" title="To‘liq ekran">${ui('ekran')}</button>
      </div>
    </div>
    <div class="lab-ong"><section class="lab-vazifa shisha"></section><section class="lab-tanlov shisha"></section><div class="lab-karta-joy"></div></div>
    <div class="lab-markaz"><div class="lab-rejim"></div></div>
    <div class="lab-xabar" role="status"></div>
    <div class="lab-sudr"></div>
    <div class="lab-qoplama"></div>
  </div>`;
  const ildiz = idishEl.firstElementChild, $ = s=>ildiz.querySelector(s), $$ = s=>[...ildiz.querySelectorAll(s)];
  const sahnaEl = $('.lab-sahna'), yorliqEl = $('.lab-yorliqlar'), chapEl = $('.lab-chap'), ongEl = $('.lab-ong');
  const tor = ()=>ildiz.clientWidth < 861;

  /* ---------- three ---------- */
  const ren = new T.WebGLRenderer({antialias:true, preserveDrawingBuffer:true, powerPreference:'high-performance'});
  ren.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  ren.outputEncoding = T.sRGBEncoding; ren.toneMapping = T.ACESFilmicToneMapping; ren.toneMappingExposure = 1.05;
  ren.shadowMap.enabled = true; ren.shadowMap.type = T.PCFSoftShadowMap;
  const el = ren.domElement; sahnaEl.appendChild(el);
  const sc = new T.Scene(); sc.background = R('#cfd6e2');
  if(T.RoomEnvironment){ const pm = new T.PMREMGenerator(ren); sc.environment = pm.fromScene(new T.RoomEnvironment(), .04).texture; pm.dispose(); }
  const cam = new T.PerspectiveCamera(45, 1, .02, 40);
  const X = MD.xona(sc), ST = X.stol;
  sc.traverse(o=>{ if(o.isMesh && o.material && 'envMapIntensity' in o.material && !o.material.userData.env){ o.material.envMapIntensity = o.material.transparent ? 1.3 : .45; o.material.userData.env = 1; } });

  /* ---------- kamera: stol atrofida aylanadi (yurish yo‘q) ---------- */
  const MARKAZ = new T.Vector3(0, ST.y + .05, -.7);
  const KOR = {umumiy:{az:0, el:.58, r:1.2}, yuqori:{az:0, el:1.25, r:1.45}};
  const kam = {az:0, el:.58, r:1.2, t:MARKAZ.clone(), ox:0}, mq = {az:0, el:.58, r:1.2, t:MARKAZ.clone()};
  let yaw = 0;
  function korinish(nom){
    if(nom === 'yaqin'){ const b = tanlangan || buyumlar.find(x=>x.tur === 'idish'); if(b) fokus(b); return; }
    const k = KOR[nom] || KOR.umumiy; mq.az = k.az; mq.el = k.el; mq.r = k.r; mq.t.copy(MARKAZ); if(nom === 'umumiy') sigdir();
  }
  /* kamerani hamma buyum panellar orasidagi ochiq maydonga sig‘adigan qilib moslash */
  const tc = new T.PerspectiveCamera(45, 1, .02, 40), tv = new T.Vector3();
  /* telefonda o‘ng panel sahnaning PASTIDA turadi — uning balandligi (ko‘rinish shu qadar yuqoriga suriladi) */
  function pastB(){ if(!tor() || !ongEl.classList.contains('kor')) return 0; const r = el.getBoundingClientRect(); let t = r.bottom; [...ongEl.children].forEach(x=>{ if(x.classList.contains('kor') && x.offsetHeight) t = Math.min(t, x.getBoundingClientRect().top); }); return Math.max(0, Math.min(r.height * .55, r.bottom - t)); }
  function sigdir(){
    if(!buyumlar.length) return;
    const w = el.clientWidth || 800, h = el.clientHeight || 500, B = pastB();
    const L = !tor() && chapEl.classList.contains('ochiq') ? chapEl.offsetWidth + 22 : 8, O = !tor() && ongEl.classList.contains('kor') ? ongEl.offsetWidth + 22 : 8;
    let x1 = 9, x2 = -9, z1 = 9, z2 = -9;
    buyumlar.forEach(b=>{ const p = b.g.position; x1 = Math.min(x1, p.x - b.r); x2 = Math.max(x2, p.x + b.r); z1 = Math.min(z1, p.z - b.r); z2 = Math.max(z2, p.z + b.r); });
    const t = new T.Vector3(Math.max(-.7, Math.min(.7, (x1 + x2) / 2)), MARKAZ.y, Math.max(-1, Math.min(-.4, (z1 + z2) / 2)));
    tc.fov = cam.fov; tc.aspect = w / h;
    const bur = [[x1, z1], [x2, z1], [x1, z2], [x2, z2]];
    for(let r = 1.05; r <= 2.4; r += .05){
      const ce = Math.cos(mq.el);
      tc.position.set(t.x + r * Math.sin(mq.az) * ce, t.y + r * Math.sin(mq.el), t.z + r * Math.cos(mq.az) * ce); tc.lookAt(t);
      tc.setViewOffset(w, h, -(L - O) / 2, B / 2, w, h); tc.updateMatrixWorld();
      const ok = bur.every(([x, z])=>[ST.y, ST.y + .22].every(y=>{ tv.set(x, y, z).project(tc); const sx = (tv.x + 1) / 2 * w, sy = (1 - tv.y) / 2 * h; return sx > L && sx < w - O && sy > 60 && sy < h - 70 - B; }));
      if(ok || r >= 2.35){ mq.r = r; mq.t.copy(t); return; }
    }
  }
  function fokus(b){ const p = b.g.position; mq.t.set(p.x, p.y + (b.tur === 'idish' ? b.m.d.ogiz * .45 : .07), p.z); mq.r = b.tur === 'plita' ? .75 : .58; mq.el = Math.max(.35, Math.min(.8, mq.el)); }
  function kameraKadr(dt){
    const k = Math.min(1, dt * 7);
    kam.az += (mq.az - kam.az) * k; kam.el += (mq.el - kam.el) * k; kam.r += (mq.r - kam.r) * k; kam.t.lerp(mq.t, k);
    const L = !tor() && chapEl.classList.contains('ochiq') ? chapEl.offsetWidth + 14 : 0, O = !tor() && ongEl.classList.contains('kor') ? ongEl.offsetWidth + 14 : 0;
    kam.ox += ((L - O) / 2 - kam.ox) * k;
    if((kam.bN = (kam.bN || 0) + 1) % 10 === 1) kam.bM = pastB(); kam.oy = (kam.oy || 0) + ((kam.bM || 0) / 2 - (kam.oy || 0)) * k;
    const ce = Math.cos(kam.el);
    cam.position.set(kam.t.x + kam.r * Math.sin(kam.az) * ce, kam.t.y + kam.r * Math.sin(kam.el), kam.t.z + kam.r * Math.cos(kam.az) * ce);
    cam.lookAt(kam.t); yaw = kam.az;
    const w = el.clientWidth || 800, h = el.clientHeight || 500;
    cam.setViewOffset(w, h, -kam.ox, kam.oy, w, h);
  }

  /* ---------- holat ---------- */
  let buyumlar = [], tanlangan = null, faol = null, idSon = 0, vaqt = 0, qoplamaOchiq = false;
  const nishonlar = [X.stolTop, X.javonNishon];
  const hodisaTinglovchi = [];

  const halqa = new T.Mesh(new T.RingGeometry(.8, 1, 40), new T.MeshBasicMaterial({color:R('#19c7b5'), transparent:true, opacity:.85, depthWrite:false}));
  halqa.rotation.x = -Math.PI / 2; halqa.visible = false; halqa.renderOrder = 5; sc.add(halqa);
  const tanlovHalqa = new T.Mesh(new T.RingGeometry(.9, 1, 48), new T.MeshBasicMaterial({color:R('#9c89ff'), transparent:true, opacity:.95, depthWrite:false}));
  tanlovHalqa.rotation.x = -Math.PI / 2; tanlovHalqa.visible = false; tanlovHalqa.renderOrder = 5; sc.add(tanlovHalqa);
  const ustiHalqa = new T.Mesh(new T.RingGeometry(.9, 1, 48), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.45, depthWrite:false}));
  ustiHalqa.rotation.x = -Math.PI / 2; ustiHalqa.visible = false; ustiHalqa.renderOrder = 5; sc.add(ustiHalqa);
  const oqim = new T.Mesh(new T.CylinderGeometry(.0045, .003, 1, 10), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.75, depthWrite:false})); oqim.visible = false; oqim.renderOrder = 4; sc.add(oqim);
  let oqimT = 0;
  const CH = MD.chop(); CH.g.visible = false; sc.add(CH.g); let chopAnim = null;
  const SH = MD.simHalqa(); SH.g.visible = false; sc.add(SH.g); let simAnim = null;
  const QG = MD.qogozTasma(); QG.g.visible = false; sc.add(QG.g); let qogAnim = null;
  const pufakG = new T.SphereGeometry(1, 8, 6), pufakM = new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.6, depthWrite:false});
  const bugM = new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.1, depthWrite:false});

  /* ---------- ovoz ---------- */
  let ac = null;
  function tovush(tur){
    if(!saq.ovoz) return;
    try{
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = ac.currentTime, uz = tur === 'paq' ? .22 : tur === 'quy' ? .4 : .08;
      const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * uz), ac.sampleRate), d = buf.getChannelData(0);
      for(let i = 0; i < d.length; i++){ const k = i / d.length; d[i] = (Math.random() * 2 - 1) * (tur === 'paq' ? Math.pow(1 - k, 3) : tur === 'quy' ? Math.sin(k * Math.PI) * .5 : (1 - k)); }
      const s = ac.createBufferSource(); s.buffer = buf; const f = ac.createBiquadFilter(), g = ac.createGain();
      f.type = tur === 'quy' ? 'bandpass' : 'lowpass'; f.frequency.value = tur === 'paq' ? 1400 : tur === 'quy' ? 2400 : 900; g.gain.value = tur === 'paq' ? .7 : tur === 'quy' ? .12 : .1;
      s.connect(f); f.connect(g); g.connect(ac.destination); s.start(t0);
      if(tur === 'paq'){ const o = ac.createOscillator(), og = ac.createGain(); o.frequency.setValueAtTime(190, t0); o.frequency.exponentialRampToValueAtTime(55, t0 + .16); og.gain.setValueAtTime(.5, t0); og.gain.exponentialRampToValueAtTime(.001, t0 + .2); o.connect(og); og.connect(ac.destination); o.start(t0); o.stop(t0 + .22); }
    }catch(e){}
  }

  /* ---------- xabar, reaksiya kartasi ---------- */
  let xabarT = null;
  function xabar(html, tur){ const x = $('.lab-xabar'); x.innerHTML = html; x.className = 'lab-xabar kor ' + (tur || ''); clearTimeout(xabarT); xabarT = setTimeout(()=>x.classList.remove('kor'), tur === 'xavf' ? 5200 : 3200); }
  const daftar = [];
  /* v3.12: tajriba jurnali (hisobot uchun) va «Sirli eritma» o‘yini */
  const jurnal = [], boshVaqt = Date.now();
  let sirli = null;
  const SIRLI_VAR = ['nacl', 'kbr', 'ki', 'na2co3', 'h2so4', 'naoh', 'fecl3', 'bacl2'].filter(k=>D.REAKTIV[k]);
  const rNom = k=>(D.REAKTIV[k] || D.JIHOZ[k] || {nom:k}).nom;
  function jurnalYoz(ev){
    let m = null;
    if(ev.tur === 'joylash') m = (QISQA[ev.k] || rNom(ev.k)) + ' stolga qo‘yildi';
    else if(ev.tur === 'quyish') m = rNom(ev.reaktiv) + ' → ' + (QISQA[ev.idish] || ev.idish || 'idish');
    else if(ev.tur === 'reaksiya'){ const r = D.REAKSIYA.find(x=>x.id === ev.id); if(r) m = (sirli && !sirli.javob ? 'Kuzatuv: ' : 'Reaksiya: ' + r.nom + '. ') + r.kuzatish; }
    else if(ev.tur === 'sinov') m = 'Gaz sinovi (cho‘p): ' + ({H2:'vodorod — «paq» ovozi', O2:'kislorod — cho‘p qayta alangalandi', CO2:'karbonat angidrid — cho‘p o‘chdi'}[ev.gaz] || 'gaz aniqlanmadi');
    else if(ev.tur === 'muhit') m = 'Indikator qog‘ozi: muhit ' + ev.muhit;
    else if(ev.tur === 'indikator') m = 'Indikator rangi: ' + ev.rang;
    else if(ev.tur === 'alanga') m = 'Alanga sinovi: ' + rNom(ev.reaktiv) + ' → ' + (ev.ion && D.ALANGA[ev.ion] ? D.ALANGA[ev.ion].soz : 'rang o‘zgarmadi');
    else if(ev.tur === 'sirli') m = 'Sirli eritma: javob «' + rNom(ev.javob) + '» — ' + (ev.togri ? 'to‘g‘ri' : 'noto‘g‘ri');
    if(m) jurnal.push({t:Date.now(), m});
  }
  /* kashfiyotni qayd etish; sirli o‘yin paytida javobgacha kechiktiriladi */
  function kashfQayd(r){
    if(sirli && !sirli.javob && !r.taqiq){ if(!sirli.kut.includes(r)) sirli.kut.push(r); return false; }
    const yangi = !r.yoq && !saq.kashf[r.id]; if(!r.yoq || !saq.kashf[r.id]){ saq.kashf[r.id] = 1; saqla(); }
    if(!daftar.some(x=>x.id === r.id)) daftar.unshift(r);
    return yangi;
  }
  let kartaT = null;
  function reaksiyaKarta(r, qosh){
    const q = $('.lab-karta-joy');
    const yash = sirli && !sirli.javob && !r.taqiq;
    if(yash) r = {tur:'Kuzatuv · sirli eritma', nom:'Nima o‘zgardi?', kuzatish:r.kuzatish, izoh:'Tenglama va izoh javob berilgandan keyin daftarda ochiladi.'};
    const k = document.createElement('div'); k.className = 'lab-karta shisha' + (r.taqiq ? ' xavf' : r.yoq ? ' yoq' : '');
    k.innerHTML = `<button class="yop" aria-label="Yopish">${ui('yop', 13)}</button>
      <span class="ustki">${r.taqiq ? 'Xavfsizlik' : r.yoq ? 'Kuzatuv' : esc(r.tur || 'Reaksiya')}${qosh && qosh.yangi ? ' · <b>yangi kashfiyot</b>' : ''}</span>
      <h3>${esc(r.nom)}</h3>${r.tenglama ? '<div class="tenglama">'+esc(r.tenglama)+'</div>' : ''}
      <div class="lk-matn"><p><b>Kuzatish.</b> ${esc(r.kuzatish)}</p><p class="izoh">${esc(r.izoh)}</p></div>`;
    k.querySelector('.yop').onclick = e=>{ e.stopPropagation(); k.remove(); ongYangila(); };
    k.onclick = ()=>{ k.classList.toggle('ixcham'); clearTimeout(kartaT); };
    q.innerHTML = ''; q.appendChild(k);
    clearTimeout(kartaT); kartaT = setTimeout(()=>k.classList.add('ixcham'), 15000);
    ongYangila();
  }
  function kashfYangila(){
    $('#labKashf').textContent = Object.keys(saq.kashf).filter(k=>REAL.some(r=>r.id === k)).length + '/' + REAL.length;
    $('#labTop').textContent = D.TOPSHIRIQ.filter(t=>saq.top[t.id]).length + '/' + D.TOPSHIRIQ.length;
  }

  /* ---------- hodisalar va topshiriqlar ---------- */
  let joriyTop = null, qadam = 0, tugaganTop = null;
  const shartlar = {};
  D.TOPSHIRIQ.forEach(t=>{ shartlar[t.id] = t.qadamlar.map(q=>{ try{ return new Function('ev', 'return (' + q.shart + ');'); }catch(e){ return ()=>false; } }); });
  function hodisa(ev){
    jurnalYoz(ev);
    hodisaTinglovchi.forEach(f=>f(ev));
    document.dispatchEvent(new CustomEvent('makon-lab', {detail:ev}));
    if(!joriyTop) return;
    const f = shartlar[joriyTop.id][qadam]; let ok = false; try{ ok = !!f(ev); }catch(e){}
    if(!ok) return;
    qadam++;
    if(qadam >= joriyTop.qadamlar.length){
      saq.top[joriyTop.id] = 1; saqla(); kashfYangila();
      xabar('<b>Tajriba bajarildi!</b> ' + esc(joriyTop.nom), 'yaxshi');
      tugaganTop = joriyTop; joriyTop = null; qadam = 0;
    }
    vazifaChiz(); javonChiz();
  }
  function vazifaChiz(){
    const q = $('.lab-vazifa');
    if(sirli && !joriyTop && !tugaganTop){ sirliChiz(q); q.classList.add('kor'); ongYangila(); return; }
    if(joriyTop){
      const t = joriyTop;
      q.innerHTML = `<div class="v-bosh"><span class="ustki">Tajriba · ${esc(t.sinf)}</span><button class="v-yop" title="Tajribani to‘xtatish">${ui('yop', 13)}</button></div><h3>${esc(t.nom)}</h3>
        <ol class="v-qadam">${t.qadamlar.map((s, i)=>'<li class="'+(i < qadam ? 'bajarildi' : i === qadam ? 'joriy' : '')+'"><i>'+(i < qadam ? ui('belgi', 12) : i + 1)+'</i><span>'+s.matn+'</span></li>').join('')}</ol>
        <button class="v-tayyor">${ui('javon', 15)} Kerakli jihozlarni stolga qo‘yish</button>`;
      q.querySelector('.v-yop').onclick = ()=>{ joriyTop = null; qadam = 0; vazifaChiz(); javonChiz(); };
      q.querySelector('.v-tayyor').onclick = ()=>tayyorla(t);
    } else if(tugaganTop){
      const t = tugaganTop;
      q.innerHTML = `<div class="v-bosh"><span class="ustki">Bajarildi</span><button class="v-yop" title="Yopish">${ui('yop', 13)}</button></div><h3>${esc(t.nom)}</h3>
        <div class="v-xulosa"><b>Xulosa.</b> ${esc(t.xulosa)}</div><button class="v-tayyor">${ui('tajriba', 15)} Boshqa tajriba tanlash</button>`;
      q.querySelector('.v-yop').onclick = ()=>{ tugaganTop = null; vazifaChiz(); };
      q.querySelector('.v-tayyor').onclick = ()=>{ tugaganTop = null; vazifaChiz(); tajribalarOch(); };
    } else q.innerHTML = '';
    q.classList.toggle('kor', !!(joriyTop || tugaganTop));
    ongYangila();
  }
  /* ---------- «Sirli eritma» o‘yini: noma’lum eritmani sifat reaksiyalari bilan aniqlash ---------- */
  function sirliBoshla(kalit){
    if(sirli && !sirli.javob) sirliOch();
    const oldingi = sirli && sirli.kalit;
    const tanlov = SIRLI_VAR.filter(k=>k !== oldingi);
    const k = kalit && D.REAKTIV[kalit] ? kalit : tanlov[Math.floor(Math.random() * tanlov.length)];
    D.REAKTIV.sirli = Object.assign({}, D.REAKTIV[k], {nom:'Sirli eritma X', f:'X', izoh:'noma’lum eritma', ghs:[], sinab:[],
      tavsif:'Noma’lum moddaning suvdagi eritmasi. Uni idishga quyib, javondagi reaktivlar, indikatorlar va spirt lampasi bilan sinang. Qoida: noma’lum eritma xavfli deb hisoblanadi — hidlanmaydi, tatib ko‘rilmaydi.'});
    sirli = {kalit:k, javob:null, urinish:0, kut:[], xato:[]};
    joriyTop = null; tugaganTop = null; qadam = 0; qoplamaYop();
    javonTur = 'suyuq'; if(!chapEl.classList.contains('ochiq')) javonOchYop(true);
    let b = buyumlar.find(x=>x.k === 'probirka' && x.v.hajm() < EPS) || avtoQoy('probirka', true);
    if(b){ tanla(b); quy(b, 'sirli'); }
    vazifaChiz(); javonChiz();
    xabar('Probirkaga <b>sirli eritma X</b> quyildi. Uni reaktivlar bilan sinab, nima ekanini aniqlang.', 'yaxshi');
  }
  /* javob berilgach (yoki o‘yin to‘xtatilganda) yashirilgan kashfiyotlar ochiladi */
  function sirliOch(){
    if(!sirli) return;
    const kut = sirli.kut; sirli.kut = [];
    kut.forEach(r=>{ if(!r.yoq || !saq.kashf[r.id]){ saq.kashf[r.id] = 1; } if(!daftar.some(x=>x.id === r.id)) daftar.unshift(r); });
    saqla(); kashfYangila();
    if(D.REAKTIV.sirli) D.REAKTIV.sirli.nom = 'Eritma X (' + D.REAKTIV[sirli.kalit].f + ')';
    buyumlar.forEach(b=>{ if(b.yl) yorliqYoz(b); });
  }
  function sirliJavob(k){
    if(!sirli || sirli.javob) return;
    const togri = k === sirli.kalit;
    sirli.urinish++;
    hodisa({tur:'sirli', javob:k, togri});
    if(togri || sirli.urinish >= 3){
      sirli.javob = k; sirli.togri = togri;
      saq.sirli = saq.sirli || {togri:0, jami:0}; saq.sirli.jami++; if(togri) saq.sirli.togri++; saqla();
      sirliOch();
      xabar(togri ? '<b>To‘g‘ri!</b> X — ' + esc(rNom(sirli.kalit)) + '.' : 'Javob: X — <b>' + esc(rNom(sirli.kalit)) + '</b>. Kuzatishlarni daftardan solishtiring.', togri ? 'yaxshi' : '');
      if(togri) tovush('chiq');
    } else { sirli.xato.push(k); xabar('<b>Bu emas.</b> Yana bir sinov o‘tkazing — ' + (3 - sirli.urinish) + ' ta urinish qoldi.'); }
    vazifaChiz(); javonChiz();
  }
  function sirliChiz(q){
    const s2 = sirli, stat = saq.sirli || {togri:0, jami:0};
    const var2 = SIRLI_VAR.map(k=>'<button class="sr-v'+(s2.javob === k ? (s2.togri ? ' togri' : ' xato') : s2.xato.includes(k) ? ' xato' : '')+(s2.javob && k === s2.kalit ? ' togri' : '')+'" data-v="'+k+'"'+(s2.javob ? ' disabled' : '')+'><b>'+esc(D.REAKTIV[k].f)+'</b><span>'+esc(D.REAKTIV[k].nom)+'</span></button>').join('');
    q.innerHTML = `<div class="v-bosh"><span class="ustki">O‘yin · sirli eritma · ${stat.togri}/${stat.jami}</span><button class="v-yop" title="O‘yinni to‘xtatish">${ui('yop', 13)}</button></div>
      <h3>${s2.javob ? (s2.togri ? 'To‘g‘ri topdingiz!' : 'Javob: ' + esc(rNom(s2.kalit))) : 'X qaysi modda?'}</h3>
      ${s2.javob ? '<div class="v-xulosa"><b>X — '+esc(rNom(s2.kalit))+' ('+esc(D.REAKTIV[s2.kalit].f)+').</b> Kuzatilgan reaksiyalar tenglamalari bilan daftarga yozildi.</div>'
        : '<p class="sr-matn">X ni bir necha idishga quying va javondagi reaktivlar bilan sinang: cho‘kma rangi, gaz, indikator, alanga rangi. So‘ng javobni tanlang (3 ta urinish).</p><details class="sr-mas"><summary>Qanday sinash mumkin?</summary><ul><li><b>AgNO₃</b> — Cl⁻ oq, Br⁻ och sariq, I⁻ sariq cho‘kma</li><li><b>HCl</b> — karbonatdan gaz (CO₂)</li><li><b>BaCl₂</b> — sulfat va karbonatdan oq cho‘kma</li><li><b>Fenolftalein, indikator qog‘ozi</b> — muhit</li><li><b>NaOH, KSCN</b> — Fe³⁺ (qo‘ng‘ir cho‘kma, qizil rang)</li><li><b>Spirt lampasi</b> — Na sariq, K binafsha, Ba sarg‘ish-yashil</li></ul></details>'}
      <div class="sr-panjara">${var2}</div>
      ${s2.javob ? '<button class="v-tayyor sr-yana">'+ui('tajriba', 15)+' Yangi sirli eritma</button>' : ''}`;
    q.querySelector('.v-yop').onclick = ()=>{ if(!sirli.javob) sirliOch(); sirli = null; vazifaChiz(); javonChiz(); };
    q.querySelectorAll('[data-v]').forEach(b=>b.onclick = ()=>sirliJavob(b.dataset.v));
    const y = q.querySelector('.sr-yana'); if(y) y.onclick = ()=>sirliBoshla();
  }
  function tajribaBoshla(t){
    if(sirli){ if(!sirli.javob) sirliOch(); sirli = null; }
    joriyTop = t; qadam = 0; tugaganTop = null; qoplamaYop();
    javonTur = 'kerak'; if(!chapEl.classList.contains('ochiq')) javonOchYop(true);
    vazifaChiz(); javonChiz(); tayyorla(t, true);
  }
  /* topshiriq uchun kerakli idish va jihozlarni stolga qo‘yadi (bor bo‘lsa — qo‘shmaydi) */
  function tayyorla(t, jim){
    let qoyildi = 0;
    t.kerak.forEach(k=>{
      const j = D.JIHOZ[k]; if(!j || j.asbob) return;
      if(buyumlar.some(b=>b.k === k && !(b.v && b.v.hajm() > EPS))) return;
      if(avtoQoy(k, true)) qoyildi++;
    });
    const idish = buyumlar.find(b=>b.tur === 'idish' && t.kerak.includes(b.k) && b.v.hajm() < EPS) || buyumlar.find(b=>b.tur === 'idish');
    if(idish) tanla(idish);
    if(!jim || qoyildi) xabar(qoyildi ? 'Kerakli jihozlar stolga qo‘yildi. Reaktivlar — javonning «Shu tajriba uchun» bo‘limida.' : 'Kerakli jihozlar stolda bor. Reaktivlar — javonning «Shu tajriba uchun» bo‘limida.', 'yaxshi');
  }
  function tajribalarOch(){
    const q = $('.lab-qoplama'); qoplamaOchiq = true; q.classList.add('kor');
    q.innerHTML = `<div class="lab-tajribalar shisha" role="dialog" aria-label="Tajribalar"><header><div><h2>Tajribalar</h2><small>${D.TOPSHIRIQ.filter(t=>saq.top[t.id]).length} / ${D.TOPSHIRIQ.length} bajarildi · tanlang — kerakli jihozlar stolga o‘zi qo‘yiladi</small></div><button class="yop" aria-label="Yopish">${ui('yop', 16)}</button></header>
      <div class="tj-panjara"><button class="tj-k tj-sirli" data-sirli><span class="tj-sinf">O‘yin · 8–9-sinf</span><b>Sirli eritma: noma’lum moddani aniqlang</b><span class="tj-x">X</span><small>8 ta moddadan biri · sifat reaksiyalari bilan · ${(saq.sirli || {togri:0}).togri} ta to‘g‘ri topilgan</small></button>${D.TOPSHIRIQ.map(t=>`<button class="tj-k${saq.top[t.id] ? ' bajarildi' : ''}${joriyTop === t ? ' faol' : ''}" data-t="${t.id}"><span class="tj-sinf">${esc(t.sinf)}</span><b>${esc(t.nom)}</b><span class="tj-ik">${t.kerak.slice(0, 6).map(k=>buyumIkon(D.REAKTIV[k] ? 'reaktiv' : 'jihoz', k, D)).join('')}</span><small>${t.qadamlar.length} qadam${saq.top[t.id] ? ' · <em>bajarilgan</em>' : ''}</small></button>`).join('')}</div>
      <footer>Erkin ishlash ham mumkin: javondan istalgan idish va reaktivni oling.</footer></div>`;
    q.querySelector('.yop').onclick = qoplamaYop; q.onclick = e=>{ if(e.target === q) qoplamaYop(); };
    q.querySelectorAll('[data-t]').forEach(b=>b.onclick = ()=>tajribaBoshla(D.TOPSHIRIQ.find(t=>t.id === b.dataset.t)));
    q.querySelector('[data-sirli]').onclick = ()=>sirliBoshla();
  }

  /* ---------- idish holati ---------- */
  function yangiHolat(k){
    const d = D.JIHOZ[k];
    return {k, tarkib:{}, qoshilgan:{}, T:XONA_T, gaz:null, pufak:{t:0, kuch:0}, tez:3, muallaq:0, korilgan:{}, ind:{}, hfVis:0, visQ:{}, sigim:d.sigim,
      hajm(){ return this.tarkib.H2O || 0; }};
  }
  function muhit(v){ const t = v.tarkib; if((t.H || 0) > EPS) return 'kislotali'; if((t.OH || 0) > EPS || (t.CO3 || 0) > EPS) return 'ishqoriy'; return 'neytral'; }
  function indRang(v){
    const m = muhit(v), t = v.tarkib, n = {};
    if(t.ind_ff) n.ff = m === 'ishqoriy' ? 'pushti' : 'rangsiz';
    if(t.ind_lak) n.lak = m === 'kislotali' ? 'qizil' : m === 'ishqoriy' ? 'ko‘k' : 'binafsha';
    if(t.ind_mo) n.mo = m === 'kislotali' ? 'qizil' : 'sariq'; /* o‘tish oralig‘i pH 3,1–4,4: neytral muhitda ham sariq */
    return n;
  }
  const IND_RANG = {pushti:'#e0218a', qizil:'#dc3a2c', 'ko‘k':'#2b59c3', binafsha:'#7b52ab', sariq:'#f2cf2e', 'to‘q sariq':'#f08a1c'};
  function maqsad(v){
    const t = v.tarkib, vol = v.hajm(), c = new T.Color('#cfe6f5'); let a = .2;
    if(vol > EPS){
      for(const k in D.RANGLI_ION){ const m = (t[k] || 0) / vol; if(m > EPS){ const s = Math.min(1, m * D.RANGLI_ION[k][1] * 1.5); c.lerp(new T.Color(D.RANGLI_ION[k][0]), s); a = Math.max(a, .34 + .5 * s); } }
      const ir = indRang(v); for(const k in ir){ if(ir[k] === 'rangsiz') continue; if((t.MnO4 || 0) / vol > .05) continue; c.lerp(new T.Color(IND_RANG[ir[k]]), .82); a = Math.max(a, .72); }
    }
    const metallBor = (t.Zn_s || 0) + (t.Fe_s || 0) + (t.Mg_s || 0) + (t.Cu_s || 0) > EPS; let sumP = 0, sumM = 0; const pc = new T.Color(0, 0, 0), hamma = new T.Color(0, 0, 0);
    for(const k in D.QATTIQ){ const m = t[k] || 0; if(m < EPS) continue; const rr = new T.Color(D.QATTIQ[k].rang); if(D.QATTIQ[k].metall){ if(metallBor) continue; sumM += m; } else { sumP += m; pc.add(rr.clone().multiplyScalar(m)); } hamma.add(rr.multiplyScalar(m)); }
    let loyqa = 0;
    if(sumP > EPS && vol > EPS){ pc.multiplyScalar(1 / sumP); loyqa = Math.min(1, sumP / vol * 1.4) * (.22 + .78 * v.muallaq); c.lerp(pc, loyqa * .9); a = a + (.96 - a) * loyqa; }
    /* qora CuO mayda zarralari eritmani to‘liq qoraytiradi — havorangdan qoraga o‘tish aniq ko‘rinsin */
    const qm = t.pCuO || 0; if(qm > EPS && vol > EPS){ const q = Math.min(1, qm / vol * 4); c.lerp(new T.Color(D.QATTIQ.pCuO.rang), q * .98); a = a + (.97 - a) * q; }
    if(sumP + sumM > EPS) hamma.multiplyScalar(1 / (sumP + sumM));
    const chokH = Math.min(v.d.hMax * .3, (sumP + sumM * .5) * .009 * (1.15 - v.muallaq));
    return {c, a, chokH:sumP + sumM > EPS ? Math.max(.004, chokH) : 0, chokRang:hamma};
  }
  /* reaksiya dvigateli */
  function yurit(v){
    const t = v.tarkib, boldi = [];
    for(let it = 0; it < 14; it++){
      let ish = false;
      for(const r of D.REAKSIYA){
        if(r.taqiq || r.alanga) continue;
        if(r.issiq && v.T < 70) continue;
        if(r.sovuq && v.T >= 70) continue;
        if(r.kat && !r.kat.every(k=>(t[k] || 0) > EPS)) continue;
        if(r.yoqsa && r.yoqsa.some(k=>(t[k] || 0) > EPS)) continue;
        let x = Infinity; for(const k in r.kerak) x = Math.min(x, (t[k] || 0) / r.kerak[k]);
        if(!(x > EPS)) continue;
        if(r.yoq){ if(!v.korilgan[r.id]){ v.korilgan[r.id] = 1; boldi.push(r); } continue; }
        for(const k in r.kerak){ t[k] -= r.kerak[k] * x; if(t[k] < EPS) delete t[k]; }
        for(const k in (r.beradi || {})){ t[k] = (t[k] || 0) + r.beradi[k] * x; if(D.QATTIQ[k] && !D.QATTIQ[k].metall) v.muallaq = 1; }
        if(!boldi.includes(r)) boldi.push(r); ish = true; break;
      }
      if(!ish) break;
    }
    ['gCO2', 'gO2'].forEach(k=>{ if((t[k] || 0) > EPS){ v.gaz = {tur:k === 'gCO2' ? 'CO2' : 'O2', qolgan:v.k === 'kolba' ? 80 : 40}; } delete t[k]; });
    return boldi;
  }
  function reaksiyadanKeyin(v, boldi, b){
    let engTez = null;
    boldi.forEach(r=>{
      const yangi = kashfQayd(r);
      reaksiyaKarta(r, {yangi});
      if(r.gaz){ const uz = {sekin:16, orta:10, shiddatli:6}[r.tezlik || 'orta'], kuch = {sekin:.25, orta:.6, shiddatli:1}[r.tezlik || 'orta']; v.pufak = {t:Math.max(v.pufak.t, uz), kuch:Math.max(v.pufak.t > 0 ? v.pufak.kuch : 0, kuch)}; v.gaz = {tur:r.gaz, qolgan:uz + (v.k === 'kolba' ? 80 : 40)}; }
      if(r.dT) v.T = Math.min(96, v.T + r.dT);
      const tz = {sekin:.16, orta:.5, shiddatli:2.2}[r.tezlik] || 2.5; engTez = engTez === null ? tz : Math.min(engTez, tz);
      hodisa({tur:'reaksiya', id:r.id, idish:v.k});
    });
    if(engTez !== null) v.tez = engTez;
    kashfYangila();
    const yangiInd = indRang(v);
    for(const k in yangiInd){ if(v.ind[k] !== yangiInd[k]){ v.ind[k] = yangiInd[k]; hodisa({tur:'indikator', ind:k, rang:yangiInd[k]}); } }
    if(b && tanlangan === b) tanla(b);
  }
  function quy(b, rkKalit){
    const v = b.v, rk = D.REAKTIV[rkKalit];
    // xavfsizlik: taqiqlangan birikmalar
    const sinov = Object.assign({}, v.tarkib); for(const k in rk.beradi) sinov[k] = (sinov[k] || 0) + rk.beradi[k];
    let taqiq = D.REAKSIYA.find(r=>r.taqiq && Object.keys(r.kerak).every(k=>(sinov[k] || 0) > EPS));
    // natriy faqat toza suvga (indikator bo‘lishi mumkin); natriy turgan idishga boshqa eritma quyilmaydi
    const NA_RUXSAT = ['suv', 'fenolftalein', 'lakmus', 'metiloranj', 'natriy'];
    if(!taqiq && ((rkKalit === 'natriy' && Object.keys(v.qoshilgan).some(k=>!NA_RUXSAT.includes(k))) || ((v.tarkib.Na_s || 0) > EPS && !NA_RUXSAT.includes(rkKalit)))) taqiq = D.REAKSIYA.find(r=>r.id === 'na_kislota');
    if(taqiq){ reaksiyaKarta(taqiq); xabar('<b>To‘xtang!</b> Bu birikma xavfli — tajriba bajarilmaydi.', 'xavf'); return false; }
    if(rk.beradi.H2O && v.hajm() + rk.beradi.H2O > v.sigim + EPS){ xabar('Idish to‘la. Boshqa idish oling yoki buni bo‘shating.'); return false; }
    if(rk.tur === 'qattiq' || rk.tur === 'kukun'){ const kk = Object.keys(rk.beradi)[0]; if((v.tarkib[kk] || 0) >= 3){ xabar('Bu moddadan yetarli solingan.'); return false; } }
    if(rk.tur === 'gaz' && v.hajm() < EPS){ v.gaz = {tur:rkKalit === 'co2' ? 'CO2' : 'O2', qolgan:v.k === 'kolba' ? 80 : 40}; xabar(esc(rk.nom) + ' idishga yuborildi.'); hodisa({tur:'quyish', reaktiv:rkKalit, idish:v.k}); return true; }
    const oldinBosh = Object.keys(v.qoshilgan).length === 0;
    for(const k in rk.beradi) v.tarkib[k] = (v.tarkib[k] || 0) + rk.beradi[k];
    v.qoshilgan[rkKalit] = (v.qoshilgan[rkKalit] || 0) + 1;
    v.tez = 3;
    if(rk.beradi.H2O && v.T > XONA_T) v.T = XONA_T + (v.T - XONA_T) * (v.hajm() - rk.beradi.H2O) / v.hajm();
    if(rk.tur === 'gaz') v.pufak = {t:2.5, kuch:.7};
    // oqim animatsiyasi
    const wp = b.g.position; oqim.material.color.copy(R(rk.tur === 'gaz' ? '#ffffff' : rk.rang)); oqim.material.opacity = rk.tur === 'gaz' ? .25 : .8;
    oqim.scale.set(rk.tur === 'qattiq' || rk.tur === 'kukun' ? 2.4 : 1, .2, rk.tur === 'qattiq' || rk.tur === 'kukun' ? 2.4 : 1); oqim.position.set(wp.x, wp.y + v.d.ogiz + .08, wp.z); oqim.visible = true; oqimT = .55; tovush('quy');
    hodisa({tur:'quyish', reaktiv:rkKalit, idish:v.k});
    if(b.yl) yorliqYoz(b);
    const boldi = yurit(v);
    reaksiyadanKeyin(v, boldi, b);
    if(!boldi.length && !oldinBosh && !rk.tomchi && Object.keys(v.qoshilgan).length > 1) xabar('Ko‘rinadigan o‘zgarish yo‘q (yoki bu juftlik modelga kiritilmagan).');
    return true;
  }
  function gazSinov(b){
    const v = b.v, gz = v.gaz && v.gaz.qolgan > 0 ? v.gaz.tur : null, wp = b.g.position;
    if(gz === 'NH3'){ xabar('Cho‘p bilan ammiak aniqlanmaydi. <b>Indikator qog‘ozi</b>ni tanlab, idishni bosing — ho‘llangan qog‘oz idish og‘ziga tutiladi.', 'uzoq'); return; }
    CH.g.position.set(wp.x, wp.y + v.d.ogiz + .012, wp.z); CH.g.rotation.y = yaw + .5; CH.g.visible = true;
    chopAnim = {t:0, gaz:gz}; if(gz === 'H2') setTimeout(()=>tovush('paq'), 450);
    setTimeout(()=>{
      if(gz){ const G = D.GAZ[gz]; reaksiyaKarta({tur:'Gaz sinovi', nom:G.nom + ' · ' + G.f, tenglama:G.tenglama, kuzatish:G.sinov, izoh:G.xulosa}); if(gz === 'H2') v.gaz = null; }
      else xabar('Cho‘p odatdagidek yonmoqda — idishda aniqlanadigan gaz yo‘q.');
      hodisa({tur:'sinov', gaz:gz});
    }, 900);
  }
  function qogozSinov(b){
    const v = b.v, t = v.tarkib;
    if(v.gaz && v.gaz.tur === 'NH3' && v.gaz.qolgan > 0){
      qogozAnim(b, '#3b3fb8');
      setTimeout(()=>{ reaksiyaKarta({tur:'Gaz sinovi', nom:'Ammiak · NH₃', tenglama:'NH₃ + H₂O ⇄ NH₄⁺ + OH⁻', kuzatish:'Idish og‘ziga tutilgan ho‘llangan indikator qog‘ozi ko‘k rangga kirdi; o‘tkir hid seziladi.', izoh:'Bu — ammiak: suvda eriganda ishqoriy muhit hosil qiladi. Hid qo‘l bilan yelpib, ehtiyotkorlik bilan aniqlanadi.'}); hodisa({tur:'sinov', gaz:'NH3'}); }, 700);
      return;
    }
    if(v.hajm() < EPS){ xabar('Idishda eritma yo‘q.'); return; }
    let n;
    if((t.H || 0) > EPS) n = ['#d8342b', 'kuchli kislotali', 'pH ≈ 1–2'];
    else if((t.OH || 0) > EPS) n = ['#3b3fb8', 'kuchli ishqoriy', 'pH ≈ 12–13'];
    else if((t.CO3 || 0) > EPS) n = ['#2f6fca', 'ishqoriy', 'pH ≈ 10–11'];
    else if((t.Cu2 || 0) + (t.Fe3 || 0) + (t.Zn2 || 0) + (t.Fe2 || 0) > EPS) n = ['#f0a21c', 'kuchsiz kislotali (tuz gidrolizi)', 'pH ≈ 3–5'];
    else n = ['#3fae5a', 'neytral', 'pH ≈ 7'];
    qogozAnim(b, n[0]);
    xabar('<i class="qogoz-r" style="background:'+n[0]+'"></i> Indikator qog‘ozi: muhit <b>'+n[1]+'</b>, '+n[2]+'.', 'uzoq');
    hodisa({tur:'muhit', muhit:n[1]});
  }

  function qogozAnim(b, rang){
    const wp = b.g.position; QG.g.position.set(wp.x, wp.y + b.v.d.ogiz + .004, wp.z); QG.g.rotation.y = yaw + .5; QG.g.visible = true;
    QG.uch.material.color.copy(R('#f0e2a6')); qogAnim = {t:0, rang:rang ? R(rang) : null};
  }
  function spirtovkaYoq(b){
    b.yoniq = !b.yoniq; tovush('chiq');
    xabar(b.yoniq ? 'Spirt lampasi yoqildi (gugurt bilan). Reaktivni tanlab, alangani bosing.' : 'Spirt lampasi qalpoq bilan o‘chirildi.');
    if(b.yoniq) hodisa({tur:'alanga_yoq'}); if(tanlangan === b) tanla(b); else rejimYoz(); if(b.yl) yorliqYoz(b);
  }
  function alangaSinov(b, k){
    const rk = D.REAKTIV[k];
    if(!b.yoniq){ xabar('Avval spirt lampasini yoqing — uni bosing.'); return; }
    if(rk.tur === 'gaz' || rk.tur === 'qattiq'){ xabar('Alanga rangi sinovi uchun tuz eritmasi yoki kukuni kerak — sim halqa unga botiriladi.'); return; }
    const ion = rk.alanga, A = ion && D.ALANGA[ion];
    SH.g.visible = true; simAnim = {t:0, b, rang:A ? R(A.rang) : null};
    tovush('chiq');
    setTimeout(()=>{
      if(A){
        const r = D.REAKSIYA.find(x=>x.alanga === ion);
        const yangi = kashfQayd(r);
        reaksiyaKarta(r, {yangi}); kashfYangila();
      } else xabar('Alanga rangi o‘zgarmadi: ' + esc(rk.nom) + ' tarkibida alangani bo‘yovchi metall ioni yo‘q.');
      hodisa({tur:'alanga', ion:ion || null, reaktiv:k});
    }, 650);
  }



  /* ---------- stoldagi buyumlar ---------- */
  const radius = k=>k === 'plita' ? .19 : k === 'spirtovka' ? .07 : MD.IDISH[k].r;
  function nomerOl(k){ const bor = buyumlar.filter(b=>b.k === k).map(b=>b.nomer); let n = 1; while(bor.includes(n)) n++; return n; }
  const buyumNom = b=>QISQA[b.k] + (buyumlar.filter(x=>x.k === b.k).length > 1 || b.nomer > 1 ? ' ' + b.nomer : '');
  /* r128 Raycaster yashirin meshlarni ham qaytaradi — ular bosishni «o‘g‘irlamasin» (idishning yashirin halqasi isitgichni to‘sardi) */
  function korinadi(o){ while(o){ if(!o.visible) return false; o = o.parent; } return true; }
  function egasi(o){ while(o){ if(o.userData && o.userData.lab) return o.userData.lab; o = o.parent; } return null; }
  function joyBormi(x, z, r, oz){
    if(x - r * .7 < ST.x1 || x + r * .7 > ST.x2 || z - r * .7 < ST.z1 || z + r * .7 > ST.z2) return false;
    return !buyumlar.some(b=>b !== oz && !b.plita && !(oz && b.plita === oz) && Math.hypot(b.x - x, b.z - z) < (b.r + r) * 1.02);
  }
  function boshJoy(r, afzal){
    const [ax, az] = afzal || [0, -.62];
    const izla = (xMin, xMax)=>{
      let eng = null, ed = Infinity;
      for(let x = Math.max(ST.x1 + r * .7, xMin); x <= Math.min(ST.x2 - r * .7, xMax); x += .05) for(let z = ST.z1 + r * .7; z <= ST.z2 - r * .7; z += .05){
        const d = Math.hypot(x - ax, (z - az) * 3.2); /* bir qatorga yonma-yon — bir-birini to‘smaydi */
        if(d < ed && joyBormi(x, z, r)){ ed = d; eng = [x, z]; }
      }
      return eng;
    };
    /* avval ekranda panellar to‘smaydigan qism (stol nuqtalari ekranga proyeksiya qilinadi) */
    const w = el.clientWidth || 800, L = !tor() && chapEl.classList.contains('ochiq') ? chapEl.offsetWidth + 24 : 10, O = !tor() && ongEl.classList.contains('kor') ? ongEl.offsetWidth + 24 : 10;
    let xMin = 9, xMax = -9; const v = new T.Vector3();
    const sxOl = x=>{ v.set(x, ST.y, az).project(cam); return (v.x + 1) / 2 * w; };
    for(let x = ST.x1; x <= ST.x2; x += .02){ if(sxOl(x - r * 1.15) > L && sxOl(x + r * 1.15) < w - O){ xMin = Math.min(xMin, x); xMax = Math.max(xMax, x); } }
    const j = xMin <= xMax ? izla(xMin, xMax) : null;
    if(j) return j;
    return izla(-9, 9); /* joy tugadi — sigdir() kamerani uzoqlashtiradi */
  }
  function joyla(k, x, z, plitaB, holat){
    let b;
    if(k === 'plita'){ const m = MD.plita(); b = {tur:'plita', k, g:m.g, r:m.r, m, yoniq:false, Tp:XONA_T, maqsad:100, ustida:null}; }
    else if(k === 'spirtovka'){ const m = MD.spirtovka(); b = {tur:'spirtovka', k, g:m.g, r:m.r, m, yoniq:false, kuch:0, rang:new T.Color(1, 1, 1), rangK:0}; }
    else { const m = MD.idish(k); const v = holat || yangiHolat(k); v.d = m.d; v.hfVis = 0; b = {tur:'idish', k, g:m.g, r:m.d.r, m, v, pufaklar:[], buglar:[], bolak:{}}; }
    b.id = ++idSon; b.nomer = nomerOl(k); b.g.userData.lab = b; b.x = x; b.z = z; b.plita = null;
    if(plitaB){ plitaB.ustida = b; b.plita = plitaB; b.g.position.set(plitaB.x, ST.y + plitaB.m.ustY, plitaB.z + plitaB.m.ustZ); }
    else b.g.position.set(x, ST.y, z);
    sc.add(b.g); buyumlar.push(b); nishonlar.push(b.g);
    b.g.traverse(o=>{ if(o.isMesh && o.material && 'envMapIntensity' in o.material) if(!o.material.userData.env){ o.material.userData.env = 1; if(o.material.envMapIntensity === 1) o.material.envMapIntensity = o.material.transparent ? 1.1 : .5; } });
    b.yl = document.createElement('div'); b.yl.className = 'yl'; yorliqEl.appendChild(b.yl); yorliqYoz(b);
    tovush('chiq'); setTimeout(sigdir, 0);
    hodisa({tur:'joylash', k, idish:b.tur === 'idish'});
    return b;
  }
  const AFZAL = {plita:[.3, -1.0], spirtovka:[-.32, -.98]};
  function avtoQoy(k, jim){
    const j = boshJoy(radius(k), AFZAL[k]);
    if(!j){ if(!jim) xabar('Stolda bo‘sh joy qolmadi — keraksiz buyumni olib tashlang (buyumni tanlab, «Stoldan olish»).'); return null; }
    return joyla(k, j[0], j[1]);
  }
  function olib(b){
    if(b.tur === 'spirtovka' && b.yoniq){ xabar('Yonib turgan spirt lampasi ko‘chirilmaydi — avval qalpoq bilan o‘chiring.', 'xavf'); return false; }
    if(b.tur === 'plita' && b.ustida){ const u = b.ustida; u.plita = null; b.ustida = null; const j = boshJoy(u.r) || [b.x, b.z - .25]; u.x = j[0]; u.z = j[1]; u.g.position.set(u.x, ST.y, u.z); }
    if(b.plita) b.plita.ustida = null;
    sc.remove(b.g); buyumlar = buyumlar.filter(x=>x !== b); const ni = nishonlar.indexOf(b.g); if(ni >= 0) nishonlar.splice(ni, 1);
    const band = new Set(); sc.traverse(o=>{ if(o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m=>band.add(m)); });
    b.g.traverse(o=>{
      if(o.geometry && o.geometry !== pufakG) o.geometry.dispose();
      if(o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m=>{ if(band.has(m)) return; band.add(m); if(m.map) m.map.dispose(); m.dispose(); });
    });
    if(b.yl) b.yl.remove(); setTimeout(sigdir, 0);
    if(tanlangan === b) tanla(null); else rejimYoz();
    return true;
  }
  function boshat(b){ const v = b.v; v.tarkib = {}; v.qoshilgan = {}; v.gaz = null; v.pufak = {t:0, kuch:0}; v.korilgan = {}; v.ind = {}; v.muallaq = 0; v.T = Math.min(v.T, 60); xabar(esc(buyumNom(b)) + ' bo‘shatildi va yuvildi.'); tanla(b); }
  function plitagaQoy(b, p){
    if(b.m.d.isitilmaydi){ xabar('<b>O‘lchov silindri isitilmaydi</b> — u darz ketishi mumkin. Stakan yoki kolbadan foydalaning.', 'xavf'); return false; }
    if(b.plita) b.plita.ustida = null;
    b.plita = p; p.ustida = b; b.g.position.set(p.x, ST.y + p.m.ustY, p.z + p.m.ustZ); return true;
  }
  function plitadanOl(b){
    const p = b.plita; if(!p) return; p.ustida = null; b.plita = null;
    const j = boshJoy(b.r, [p.x - .3, p.z + .1]) || [p.x - .3, p.z + .1]; b.x = j[0]; b.z = j[1]; b.g.position.set(b.x, ST.y, b.z);
  }
  /* bir tugma bilan isitish: isitgich bo‘lmasa — qo‘yiladi, idish ustiga qo‘yiladi va yoqiladi */
  function isit(b){
    if(b.plita){ plitaYoq(b.plita); tanla(b); return; }
    if(b.m.d.isitilmaydi){ xabar('<b>O‘lchov silindri isitilmaydi</b> — u darz ketishi mumkin. Stakan yoki kolbadan foydalaning.', 'xavf'); return; }
    let p = buyumlar.find(x=>x.tur === 'plita' && !x.ustida);
    if(!p){ if(buyumlar.some(x=>x.tur === 'plita')){ xabar('Isitgich band — undagi idishni oling yoki boshqa isitgich qo‘ying.'); return; } p = avtoQoy('plita'); if(!p) return; }
    plitagaQoy(b, p); if(!p.yoniq) plitaYoq(p); tanla(b);
  }
  /* ---------- isitgich harorati (maqsad) va kerakli harorat ---------- */
  const ISSIQ_T = 70, TEZ_T = [50, 70, 100, 150, 250];
  const tarkibOk = (r, t)=>(!r.kat || r.kat.every(k=>(t[k] || 0) > EPS)) && (!r.yoqsa || !r.yoqsa.some(k=>(t[k] || 0) > EPS)) && Object.keys(r.kerak || {}).every(k=>(t[k] || 0) > EPS);
  /* idishdagi aralashma uchun qizdirish (yoki sovutish) kerakmi */
  function kerakHarorat(b){
    if(!b || b.tur !== 'idish') return null;
    const t = b.v.tarkib;
    const r = D.REAKSIYA.find(r=>!r.taqiq && !r.alanga && !r.yoq && r.issiq && tarkibOk(r, t));
    if(r) return {r, issiq:true, bajarildi:b.v.T >= ISSIQ_T};
    const s = D.REAKSIYA.find(r=>!r.taqiq && !r.alanga && !r.yoq && r.sovuq && tarkibOk(r, t));
    if(s && b.v.T >= ISSIQ_T) return {r:s, issiq:false, bajarildi:false};
    return null;
  }
  function kerakMatn(b){
    const k = kerakHarorat(b); if(!k) return '';
    if(!k.issiq) return 'Keyingi qadam — <b>' + esc(k.r.nom) + '</b>: eritma <b>70 °C dan past</b> sovishi kerak. Isitgichdan oling yoki o‘chiring.';
    return (k.bajarildi ? '✓ ' : '') + 'Keyingi qadam — <b>' + esc(k.r.nom) + '</b>: eritma <b>≥ 70 °C</b> bo‘lishi kerak' + (k.bajarildi ? ' — yetdi.' : '. Isitgichni <b>100 °C</b> ga qo‘ying; 70 °C dan past bo‘lsa, reaksiya ketmaydi.');
  }
  function kerakHTML(b){ const m = kerakMatn(b); return m ? '<p class="tl-kerak">' + ui('isit', 14) + ' <span>' + m + '</span></p>' : ''; }
  function haroratHTML(p, idish){
    const m = p.maqsad;
    return `<div class="tl-harorat">
        <div class="th-sar"><span>Isitgich harorati</span><b data-hv>${m} °C</b></div>
        <input type="range" min="30" max="300" step="10" value="${m}" aria-label="Isitgich harorati">
        <div class="th-tez">${TEZ_T.map(t=>'<button data-ht="' + t + '" class="' + (t === m ? 'faol' : '') + '">' + t + '°</button>').join('')}</div>
        <p class="th-izoh">Plita shu haroratgacha qiziydi. Eritma 100 °C dan oshmaydi (suv qaynaydi). Isitib olinadigan reaksiyalar ilovaning soddalashtirilgan modelida eritma <b>≥ 70 °C</b> bo‘lganda boradi.</p>
        ${idish ? kerakHTML(idish) : ''}
      </div>`;
  }
  function plitaHarorat(p, t, jim){
    p.maqsad = Math.max(30, Math.min(300, Math.round(t / 10) * 10));
    if(!jim) xabar('Isitgich harorati: <b>' + p.maqsad + ' °C</b>' + (p.yoniq ? '' : ' — endi isitgichni yoqing.'));
    hodisa({tur:'harorat', t:p.maqsad});
  }
  function haroratUla(q, p){
    if(!p) return; const h = q.querySelector('.tl-harorat'); if(!h) return;
    const sl = h.querySelector('input'), qiy = h.querySelector('[data-hv]');
    sl.oninput = ()=>{ qiy.textContent = sl.value + ' °C'; plitaHarorat(p, +sl.value, true); h.querySelectorAll('[data-ht]').forEach(x=>x.classList.toggle('faol', +x.dataset.ht === p.maqsad)); };
    sl.onchange = ()=>plitaHarorat(p, +sl.value);
    h.querySelectorAll('[data-ht]').forEach(x=>x.onclick = ()=>{ plitaHarorat(p, +x.dataset.ht); sl.value = p.maqsad; qiy.textContent = p.maqsad + ' °C'; h.querySelectorAll('[data-ht]').forEach(y=>y.classList.toggle('faol', y === x)); });
  }
  function plitaYoq(p){ p.yoniq = !p.yoniq; tovush('chiq'); xabar(p.yoniq ? 'Isitgich yoqildi — harorat asta ko‘tariladi.' : 'Isitgich o‘chirildi.'); if(p.yl) yorliqYoz(p); if(p.yoniq) hodisa({tur:'isitish'}); if(tanlangan === p || (tanlangan && tanlangan.plita === p)) tanla(tanlangan); }

  /* ---------- yorliqlar (buyum ustidagi nom) ---------- */
  function yorliqYoz(b){
    let s = '';
    if(b.tur === 'idish'){
      const f = Object.keys(b.v.qoshilgan).map(k=>D.REAKTIV[k].f.length > 9 ? D.REAKTIV[k].nom.split(' ')[0] : D.REAKTIV[k].f);
      s = f.length ? f.slice(0, 3).join(' + ') + (f.length > 3 ? ' …' : '') : 'bo‘sh';
    } else if(b.tur === 'plita') s = b.yoniq ? 'yoniq' : 'o‘chiq';
    else if(b.tur === 'spirtovka') s = b.yoniq ? 'yonmoqda' : 'o‘chiq';
    b.yl.innerHTML = '<b>' + esc(buyumNom(b)) + '</b><span>' + esc(s) + '</span><em></em>';
    b._ylT = null;
  }
  const yp = new T.Vector3();
  function yorliqlarKadr(){
    const w = el.clientWidth, h = el.clientHeight;
    buyumlar.forEach(b=>{
      const bal = b.tur === 'idish' ? b.m.d.ogiz + .03 : b.tur === 'spirtovka' ? (b.yoniq ? .2 : .13) : .13;
      /* ustida idish bo‘lsa isitgich yorlig‘i old tomonga, pastga tushadi — idishni to‘smasin */
      const past = b.tur === 'plita' && !!b.ustida;
      if(past) yp.set(b.g.position.x, b.g.position.y + .01, b.g.position.z + .17).project(cam);
      else yp.set(b.g.position.x, b.g.position.y + bal, b.g.position.z).project(cam);
      b.yl.classList.toggle('past', past);
      const kor = yp.z < 1 && Math.abs(yp.x) < 1.1 && Math.abs(yp.y) < 1.1;
      b.yl.style.display = kor ? '' : 'none'; if(!kor) return;
      b.yl.style.transform = 'translate(' + Math.round((yp.x + 1) / 2 * w) + 'px,' + Math.round((1 - yp.y) / 2 * h) + 'px) translate(-50%,' + (past ? '8px' : '-100%') + ')';
      const nishon = faol && ((b.tur === 'idish') || (b.tur === 'spirtovka' && faol.tur === 'reaktiv' && b.yoniq));
      b.yl.classList.toggle('tanlangan', tanlangan === b); b.yl.classList.toggle('nishon', !!nishon); b.yl.classList.toggle('usti', !!(ustida && ustida.eg === b));
      const Tt = b.tur === 'idish' ? Math.round(b.v.T) : b.tur === 'plita' ? Math.round(b.Tp) : null;
      if(Tt !== b._ylT){ b._ylT = Tt; const e = b.yl.querySelector('em'); if(e){ e.textContent = Tt !== null && Tt > 30 ? Tt + ' °C' : ''; e.classList.toggle('issiq', Tt > 60); } }
    });
  }

  /* ---------- tanlash va o‘ng panel ---------- */
  function ongYangila(){ ongEl.classList.toggle('kor', !!tanlangan || !!(joriyTop || tugaganTop) || !!$('.lab-karta-joy').children.length); }
  function tanla(b){
    tanlangan = b; const q = $('.lab-tanlov');
    if(!b){ q.classList.remove('kor'); q.innerHTML = ''; tanlovHalqa.visible = false; ongYangila(); rejimYoz(); return; }
    let ich = '';
    const tg = (a, ik, s, izoh, cls)=>'<button data-q="'+a+'" class="'+(cls || '')+'">'+ui(ik, 18)+'<span><b>'+s+'</b>'+(izoh ? '<small>'+izoh+'</small>' : '')+'</span></button>';
    if(b.tur === 'idish'){
      const v = b.v, j = D.JIHOZ[b.k], bosh = !Object.keys(v.qoshilgan).length;
      const tark = Object.keys(v.qoshilgan).map(k=>'<span title="'+esc(D.REAKTIV[k].nom)+'">'+esc(D.REAKTIV[k].nom)+(v.qoshilgan[k] > 1 ? ' <i>×' + v.qoshilgan[k] + '</i>' : '')+'</span>').join('');
      const p = b.plita;
      ich = `<span class="ustki">Idish · ${esc(j.izoh)}</span><h4>${esc(buyumNom(b))}</h4>
        <div class="tl-tarkib">${bosh ? '<em>Bo‘sh idish</em>' : tark}</div>
        <div class="tl-olcham"><div class="tl-hajm" title="Hajm"><i style="width:${Math.min(100, v.hajm() / v.sigim * 100)}%"></i></div><span>${Math.round(v.hajm() * 10) / 10}/${v.sigim} qism</span><b id="tanT">${Math.round(v.T)} °C</b></div>
        <p class="tl-maslahat">${ui('olib', 14)} <span>Reaktiv qo‘shish: <b>javondagi reaktivni bosing</b> — shu idishga quyiladi.</span></p>
        ${p ? haroratHTML(p, b) : kerakHTML(b)}
        <div class="tl-amal">
          ${p ? tg('isit', 'isit', p.yoniq ? 'Isitishni to‘xtatish' : 'Isitgichni yoqish', 'isitgich ustida', p.yoniq ? 'faol' : '') : tg('isit', 'isit', 'Isitish', j.isitilmaydi ? 'bu idish isitilmaydi' : 'isitgichga qo‘yiladi')}
          ${tg('gaz', 'chop', 'Gazni sinash', 'yonib turgan cho‘p')}
          ${tg('muhit', 'qogoz', 'Muhitni aniqlash', 'indikator qog‘ozi')}
          ${bosh ? '' : tg('yuv', 'yuv', 'Bo‘shatish', 'va yuvish')}
          ${p ? tg('plitadan', 'olib', 'Isitgichdan olish', '') : ''}
          ${tg('olib', 'yop', 'Stoldan olish', '', 'xira')}
        </div>`;
    } else if(b.tur === 'plita'){
      ich = `<span class="ustki">Jihoz</span><h4>${esc(buyumNom(b))}</h4>
        <div class="tl-olcham"><span>${b.yoniq ? 'Yoniq' : 'O‘chiq'}${b.ustida ? ' · ustida: ' + esc(buyumNom(b.ustida)) : ''}</span><b id="tanT">${Math.round(b.Tp)} °C</b></div>
        <p class="tl-maslahat">${ui('olib', 14)} <span>Yoqish: pastdagi tugma, isitgichdagi <b>murvat</b> yoki isitgichni <b>yana bir bosing</b>. Idishni isitish uchun uni sudrab isitgich ustiga qo‘ying yoki idishni tanlab <b>«Isitish»</b>ni bosing.</span></p>
        ${haroratHTML(b, b.ustida)}
        <div class="tl-amal">${tg('yoq', 'isit', b.yoniq ? 'O‘chirish' : 'Yoqish', '', b.yoniq ? 'faol' : '')}${tg('olib', 'yop', 'Stoldan olish', '', 'xira')}</div>`;
    } else if(b.tur === 'spirtovka'){
      ich = `<span class="ustki">Jihoz · alanga rangi sinovi</span><h4>${esc(buyumNom(b))}</h4>
        <div class="tl-olcham"><span>${b.yoniq ? 'Yonmoqda' : 'O‘chiq (qalpoq yopiq)'}</span></div>
        <p class="tl-maslahat">${ui('olov', 14)} <span>${b.yoniq ? 'Endi <b>javondagi tuz eritmasini bosing</b> — nixrom sim halqa unga botirilib, alangaga tutiladi.' : 'Avval lampani yoqing.'}</span></p>
        <div class="tl-amal">${tg('spirt', 'olov', b.yoniq ? 'Qalpoq bilan o‘chirish' : 'Yoqish', b.yoniq ? '' : 'gugurt bilan', b.yoniq ? 'faol' : '')}${b.yoniq ? '' : tg('olib', 'yop', 'Stoldan olish', '', 'xira')}</div>`;
    }
    q.innerHTML = '<button class="yop" aria-label="Yopish">' + ui('yop', 13) + '</button>' + ich; q.classList.add('kor');
    q.querySelector('.yop').onclick = ()=>tanla(null);
    q.querySelectorAll('[data-q]').forEach(t=>t.onclick = ()=>{
      const a = t.dataset.q;
      if(a === 'isit') isit(b);
      else if(a === 'gaz') gazSinov(b);
      else if(a === 'muhit') qogozSinov(b);
      else if(a === 'yuv') boshat(b);
      else if(a === 'plitadan'){ plitadanOl(b); tanla(b); }
      else if(a === 'olib'){ if(olib(b)) xabar(esc(buyumNom(b)) + ' stoldan olindi.'); }
      else if(a === 'yoq') plitaYoq(b);
      else if(a === 'spirt') spirtovkaYoq(b);
    });
    haroratUla(q, b.tur === 'plita' ? b : b.plita);
    tanlovHalqa.visible = true; tanlovHalqa.scale.setScalar(b.r * 1.08);
    ongYangila(); rejimYoz(); if(b.yl) yorliqYoz(b);
  }

  /* ---------- pastki yo‘riq qatori: hozir nima qilish kerak ---------- */
  function rejimYoz(){
    const q = $('.lab-rejim'); let m = '', bekor = false;
    if(sudr) return;
    if(faol){
      const o = faol.tur === 'reaktiv' ? D.REAKTIV[faol.k] : D.JIHOZ[faol.k];
      m = buyumIkon(faol.tur === 'reaktiv' ? 'reaktiv' : 'jihoz', faol.k, D) + '<span><b>' + esc(o.nom) + '</b> qo‘lda — ' + (faol.tur === 'reaktiv' ? 'qaysi idishga? <b>Idishni bosing</b>' + (buyumlar.some(b=>b.tur === 'spirtovka' && b.yoniq) ? ' (yoki yonayotgan spirt lampasini)' : '') : '<b>tekshiriladigan idishni bosing</b>') + '</span>';
      bekor = true;
    } else if(tanlangan && tanlangan.tur === 'idish') m = '<span><b>' + esc(buyumNom(tanlangan)) + '</b> tanlandi — javondagi <b>reaktivni bosing</b>, u shu idishga quyiladi.</span>';
    else if(tanlangan && tanlangan.tur === 'spirtovka' && tanlangan.yoniq) m = '<span>Spirt lampasi yonmoqda — javondagi <b>tuz eritmasini bosing</b>: alanga rangi sinovi.</span>';
    else if(!buyumlar.some(b=>b.tur === 'idish')) m = '<span>Boshlash: javondan <b>idish</b> (stakan, kolba, probirka) bosing — u stolga qo‘yiladi. Yoki <b>Tajribalar</b>dan birini tanlang.</span>';
    else m = '<span><b>Idishni bosing</b> — tanlanadi; so‘ng javondagi reaktivni bosing. Buyumni sudrab joyini o‘zgartirish mumkin.</span>';
    q.innerHTML = m + (bekor ? '<button class="r-bekor">Bekor qilish <kbd>Esc</kbd></button>' : '');
    q.classList.toggle('faol', bekor);
    const bk = q.querySelector('.r-bekor'); if(bk) bk.onclick = ()=>faolQoy(null);
  }
  function faolBelgila(){ $$('.lc-k').forEach(c=>c.classList.toggle('faol', !!faol && c.dataset.k.split(':')[1] === faol.k)); }
  function faolQoy(f){ faol = f; faolBelgila(); rejimYoz(); }

  /* ---------- javon (chap panel) ---------- */
  let javonTur = 'jihoz';
  function javonOchYop(och){ chapEl.classList.toggle('ochiq', och === undefined ? !chapEl.classList.contains('ochiq') : och); }
  function javonElementlar(){
    const s = $('.lc-qidir').value.trim().toLowerCase(), lot = x=>x.toLowerCase().replace(/[₀-₉]/g, m=>'₀₁₂₃₄₅₆₇₈₉'.indexOf(m));
    const korin = k=>k !== 'sirli' || (sirli && !sirli.javob);
    const hamma = Object.keys(D.JIHOZ).map(k=>['jihoz', k]).concat(Object.keys(D.REAKTIV).filter(korin).map(k=>['reaktiv', k]));
    if(s) return hamma.filter(([t, k])=>{ const o = t === 'reaktiv' ? D.REAKTIV[k] : D.JIHOZ[k]; return lot(o.nom + ' ' + (o.f || '')).includes(lot(s)); });
    if(javonTur === 'kerak' && joriyTop) return joriyTop.kerak.map(k=>[D.REAKTIV[k] ? 'reaktiv' : 'jihoz', k]);
    if(javonTur === 'jihoz') return Object.keys(D.JIHOZ).map(k=>['jihoz', k]);
    const r2 = Object.keys(D.REAKTIV).filter(k=>D.REAKTIV[k].tur === javonTur && korin(k)).map(k=>['reaktiv', k]);
    const si = r2.findIndex(x=>x[1] === 'sirli'); if(si > 0) r2.unshift(r2.splice(si, 1)[0]);
    return r2;
  }
  function javonChiz(){
    if(javonTur === 'kerak' && !joriyTop) javonTur = 'jihoz';
    const turlar = (joriyTop ? [['kerak', 'Shu tajriba uchun', '#34d69d']] : []).concat(TURLAR);
    const s = $('.lc-qidir').value.trim();
    $('.lc-tur').innerHTML = turlar.map(([k, n, r])=>'<button data-t="'+k+'" class="'+(!s && k === javonTur ? 'faol' : '')+'" style="--r:'+r+'"><i></i>'+esc(n)+'</button>').join('');
    $$('.lc-tur button').forEach(b=>b.onclick = ()=>{ javonTur = b.dataset.t; $('.lc-qidir').value = ''; javonChiz(); });
    const kerak = joriyTop ? joriyTop.kerak : [];
    const el2 = javonElementlar();
    $('.lc-royxat').innerHTML = el2.length ? el2.map(([t, k])=>{
      const o = t === 'reaktiv' ? D.REAKTIV[k] : D.JIHOZ[k], asbob = t === 'jihoz' && o.asbob;
      const amal = t === 'reaktiv' ? (o.tur === 'gaz' ? 'yuborish' : o.tomchi ? 'tomizish' : o.tur === 'suyuq' ? 'quyish' : 'solish') : asbob ? 'sinash' : 'stolga qo‘yish';
      return '<div class="lc-k'+(faol && faol.k === k ? ' faol' : '')+(kerak.includes(k) ? ' kerak' : '')+'" data-k="'+t+':'+k+'" role="button" tabindex="0" title="'+esc(o.nom)+' — bosing: '+amal+'">'
        + buyumIkon(t, k, D) + '<span class="lc-n"><b>'+esc(o.nom)+'</b><small>'+esc(t === 'reaktiv' ? o.f + (o.izoh ? ' · ' + o.izoh : '') : o.izoh)+'</small></span>'
        + (o.ghs && o.ghs.length ? '<i class="xavf-n" title="Xavf belgilari bor"></i>' : '')
        + '<button class="lc-i" data-i="'+t+':'+k+'" aria-label="Batafsil">i</button></div>';
    }).join('') : '<p class="j-yoq">Hech narsa topilmadi.</p>';
    $$('.lc-k').forEach(c=>{
      const [t, k] = c.dataset.k.split(':');
      c.addEventListener('pointerdown', e=>{ if(e.target.closest('.lc-i')) return; sudrBoshla(e, t, k); });
      c.addEventListener('keydown', e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); kartaBos(t, k); } });
    });
    $$('.lc-i').forEach(b=>b.onclick = e=>{ e.stopPropagation(); const [t, k] = b.dataset.i.split(':'); batafsilOch(t, k); });
  }
  /* javondagi karta bosildi */
  function kartaBos(t, k){
    if(t === 'jihoz' && !D.JIHOZ[k].asbob){
      const b = avtoQoy(k); if(!b) return;
      faol = null; if(b.tur === 'idish' || b.tur === 'spirtovka') tanla(b); else rejimYoz();
      faolBelgila(); if(tor()) javonOchYop(false);
      return;
    }
    const tur = t === 'reaktiv' ? 'reaktiv' : 'asbob';
    if(faol && faol.k === k){ faolQoy(null); return; }
    // tanlangan idish bo‘lsa — darhol shu idishga
    if(tanlangan && tanlangan.tur === 'idish'){ amalBajar(tur, k, tanlangan); return; }
    if(tanlangan && tanlangan.tur === 'spirtovka' && tur === 'reaktiv'){ alangaSinov(tanlangan, k); return; }
    faolQoy({tur, k}); if(tor()) javonOchYop(false);
  }
  function amalBajar(tur, k, b){
    if(b.tur === 'spirtovka'){ if(tur === 'reaktiv') alangaSinov(b, k); else xabar('Spirt lampasi alanga rangi sinovi uchun — javondan tuz eritmasini tanlang.'); return; }
    if(tur === 'reaktiv') quy(b, k); else if(k === 'chop') gazSinov(b); else qogozSinov(b);
    if(tanlangan !== b) tanla(b); else if(b.yl) yorliqYoz(b);
  }
  function batafsilOch(t, k){
    const o = t === 'reaktiv' ? D.REAKTIV[k] : D.JIHOZ[k];
    const q = $('.lab-qoplama'); qoplamaOchiq = true; q.classList.add('kor');
    q.innerHTML = `<div class="lab-batafsil shisha" role="dialog"><button class="yop" aria-label="Yopish">${ui('yop', 16)}</button>
      <div class="b-rasm">${buyumIkon(t, k, D)}</div><div class="b-ich"><h3>${esc(o.nom)}</h3><div class="b-f">${t === 'reaktiv' ? '<b>'+esc(o.f)+'</b>' : ''}<span>${esc(o.izoh || '')}</span></div><p>${esc(o.tavsif)}</p>
      ${t === 'reaktiv' ? '<div class="b-ghs">'+(o.ghs.length ? o.ghs.map(g=>'<div>'+ghsSvg(g)+'<span>'+GHS_NOM[g]+'</span></div>').join('') : '<small>Bu konsentratsiyada GHS xavf belgisi yo‘q</small>')+'</div>' : ''}
      ${o.sinab ? '<div class="b-sinab"><span class="ustki">Nima bilan sinab ko‘rish mumkin</span><div>'+o.sinab.map(s=>{ const z = D.REAKTIV[s] || D.JIHOZ[s]; return '<span>'+esc(z.nom)+'</span>'; }).join('')+'</div></div>' : ''}
      <button class="b-ol">${t === 'jihoz' && !o.asbob ? 'Stolga qo‘yish' : 'Tanlash'}</button></div></div>`;
    q.querySelector('.yop').onclick = qoplamaYop; q.onclick = e=>{ if(e.target === q) qoplamaYop(); };
    q.querySelector('.b-ol').onclick = ()=>{ qoplamaYop(); kartaBos(t, k); };
  }
  function qoplamaYop(){ const q = $('.lab-qoplama'); q.classList.remove('kor'); q.innerHTML = ''; qoplamaOchiq = false; }

  /* ---------- javondan sahnaga sudrash ---------- */
  let sudr = null;
  function sudrBoshla(e, t, k){
    if(e.button > 0) return;
    const s0 = {x:e.clientX, y:e.clientY, t, k, bosh:false};
    const har = ev=>{
      if(!s0.bosh){ const dx = ev.clientX - s0.x, dy = ev.clientY - s0.y; if(Math.hypot(dx, dy) < 8) return; if(e.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)){ s0.bekor = true; tug({type:'pointercancel'}); return; } s0.bosh = true; sudr = s0; const o = t === 'reaktiv' ? D.REAKTIV[k] : D.JIHOZ[k]; const g = $('.lab-sudr'); g.innerHTML = buyumIkon(t, k, D) + '<b>' + esc(o.nom) + '</b>'; g.classList.add('kor'); }
      const g = $('.lab-sudr'), r = ildiz.getBoundingClientRect(); g.style.transform = 'translate(' + (ev.clientX - r.left + 12) + 'px,' + (ev.clientY - r.top + 12) + 'px)';
      const ust = ustidaSahna(ev);
      ustida = ust ? urish(ev) : null;
      if(t === 'jihoz' && !D.JIHOZ[k].asbob){ const p = ust && stolNuqta(ev); if(p){ const rr = radius(k); halqa.visible = true; halqa.scale.setScalar(rr); halqa.position.set(p.x, ST.y + .002, p.z); halqa.material.color.copy(R(joyBormi(p.x, p.z, rr) ? '#19c7b5' : '#ff5a5a')); } else halqa.visible = false; }
      const eg = ustida && ustida.eg; const $r = $('.lab-rejim');
      $r.innerHTML = '<span>' + (!ust ? 'Sahnaga olib boring' : t === 'jihoz' && !D.JIHOZ[k].asbob ? 'Qo‘yib yuboring — shu joyga qo‘yiladi' : eg && (eg.tur === 'idish' || eg.tur === 'spirtovka') ? 'Qo‘yib yuboring — <b>' + esc(buyumNom(eg)) + '</b>' : 'Idish ustiga olib boring') + '</span>';
    };
    const tug = ev=>{
      document.removeEventListener('pointermove', har); document.removeEventListener('pointerup', tug); document.removeEventListener('pointercancel', tug);
      $('.lab-sudr').classList.remove('kor'); halqa.visible = false;
      const edi = s0.bosh; sudr = null;
      if(!edi){ if(ev.type === 'pointerup' && !s0.bekor) kartaBos(t, k); return; }
      if(ev.type !== 'pointerup' || !ustidaSahna(ev)){ rejimYoz(); return; }
      if(t === 'jihoz' && !D.JIHOZ[k].asbob){
        const p = stolNuqta(ev), rr = radius(k);
        const h = urish(ev), eg = h && h.eg;
        let b = null;
        if(eg && eg.tur === 'plita' && D.JIHOZ[k].idish && !eg.ustida){ b = joyla(k, eg.x, eg.z); if(!plitagaQoy(b, eg)){ const j = boshJoy(b.r) || [0, -.55]; b.x = j[0]; b.z = j[1]; b.g.position.set(j[0], ST.y, j[1]); } }
        else if(p && joyBormi(p.x, p.z, rr)) b = joyla(k, p.x, p.z);
        else b = avtoQoy(k);
        if(b && (b.tur === 'idish' || b.tur === 'spirtovka')) tanla(b); else rejimYoz();
        return;
      }
      const h = urish(ev), eg = h && h.eg;
      if(eg && (eg.tur === 'idish' || eg.tur === 'spirtovka')) amalBajar(t === 'reaktiv' ? 'reaktiv' : 'asbob', k, eg);
      else xabar('Reaktivni <b>idish ustiga</b> olib borib qo‘yib yuboring.');
      rejimYoz();
    };
    document.addEventListener('pointermove', har); document.addEventListener('pointerup', tug); document.addEventListener('pointercancel', tug);
    sudrOlib = ()=>{ document.removeEventListener('pointermove', har); document.removeEventListener('pointerup', tug); document.removeEventListener('pointercancel', tug); };
  }
  let sudrOlib = null;
  function ustidaSahna(ev){ const r = el.getBoundingClientRect(); if(ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) return false; const t = document.elementFromPoint(ev.clientX, ev.clientY); return !!t && (t === el || t.closest('.lab-yorliqlar') || t.closest('.lab-sudr')); }

  /* ---------- sichqoncha / sensor ---------- */
  const nur = new T.Raycaster(), sich = new T.Vector2();
  let bos = null, ustida = null, kochir = null;
  function nurQoy(e){ const r = el.getBoundingClientRect(); sich.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); nur.setFromCamera(sich, cam); }
  function urish(e){
    nurQoy(e);
    const h = nur.intersectObjects(nishonlar, true);
    for(const x of h){ if(!korinadi(x.object)) continue; const eg = egasi(x.object); if(eg) return {eg, nuqta:x.point, ob:x.object}; }
    return null;
  }
  function stolNuqta(e){ nurQoy(e); const h = nur.intersectObject(X.stolTop, false); return h.length ? h[0].point : null; }
  const buyummi = eg=>eg && (eg.tur === 'idish' || eg.tur === 'plita' || eg.tur === 'spirtovka');
  el.addEventListener('pointerdown', e=>{
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    bos = {x:e.clientX, y:e.clientY, az:mq.az, el:mq.el, h:urish(e), sur:false}; try{ el.setPointerCapture(e.pointerId); }catch(er){}
  });
  el.addEventListener('pointermove', e=>{
    if(bos){
      const dx = e.clientX - bos.x, dy = e.clientY - bos.y;
      if(!bos.sur && Math.hypot(dx, dy) < 6) return;
      if(!bos.sur){
        bos.sur = true; const eg = bos.h && bos.h.eg;
        if(buyummi(eg) && !faol){
          if(eg.tur === 'spirtovka' && eg.yoniq){ xabar('Yonib turgan spirt lampasi ko‘chirilmaydi.', 'xavf'); }
          else { kochir = {b:eg, x:eg.x, z:eg.z, plita:eg.plita}; if(eg.plita){ eg.plita.ustida = null; eg.plita = null; } tanla(eg); }
        }
      }
      if(kochir){
        const b = kochir.b, p = stolNuqta(e); if(!p) return;
        const p2 = b.tur === 'idish' ? buyumlar.find(x=>x.tur === 'plita' && (!x.ustida || x.ustida === b) && Math.hypot(x.x - p.x, x.z - p.z) < x.r * .8) : null;
        if(p2){ b.g.position.set(p2.x, ST.y + p2.m.ustY, p2.z + p2.m.ustZ); halqa.visible = true; halqa.scale.setScalar(p2.r * .9); halqa.position.set(p2.x, ST.y + .002, p2.z); halqa.material.color.copy(R(b.m.d.isitilmaydi ? '#ff5a5a' : '#ffb01f')); kochir.p2 = p2; }
        else { kochir.p2 = null; b.g.position.set(p.x, ST.y, p.z); if(b.tur === 'plita' && b.ustida) b.ustida.g.position.set(p.x, ST.y + b.m.ustY, p.z + b.m.ustZ); halqa.visible = true; halqa.scale.setScalar(b.r); halqa.position.set(p.x, ST.y + .002, p.z); halqa.material.color.copy(R(joyBormi(p.x, p.z, b.r, b) ? '#19c7b5' : '#ff5a5a')); kochir.p = p; }
        return;
      }
      if(bos.sur){ mq.az = Math.max(-1.25, Math.min(1.25, bos.az - dx * .005)); mq.el = Math.max(.22, Math.min(1.38, bos.el + dy * .004)); el.style.cursor = 'grabbing'; }
      return;
    }
    ustida = urish(e); const eg = ustida && ustida.eg;
    el.style.cursor = buyummi(eg) ? (faol ? 'copy' : 'pointer') : 'grab';
    if(buyummi(eg)){ ustiHalqa.visible = true; ustiHalqa.scale.setScalar(eg.r * 1.12); ustiHalqa.position.set(eg.g.position.x, ST.y + .003, eg.g.position.z); } else ustiHalqa.visible = false;
  });
  const qoyib = e=>{
    const edi = bos; bos = null; el.style.cursor = 'grab'; halqa.visible = false;
    if(kochir){
      const k = kochir; kochir = null; const b = k.b;
      if(k.p2 && plitagaQoy(b, k.p2)){ b.x = k.p2.x; b.z = k.p2.z; tovush('chiq'); }
      else if(k.p && joyBormi(k.p.x, k.p.z, b.r, b)){ b.x = k.p.x; b.z = k.p.z; b.g.position.set(b.x, ST.y, b.z); if(b.tur === 'plita' && b.ustida){ b.ustida.x = b.x; b.ustida.z = b.z; } tovush('chiq'); }
      else { b.x = k.x; b.z = k.z; if(k.plita && !k.plita.ustida) plitagaQoy(b, k.plita); else b.g.position.set(b.x, ST.y, b.z); if(b.tur === 'plita' && b.ustida) b.ustida.g.position.set(b.x, ST.y + b.m.ustY, b.z + b.m.ustZ); if(k.p) xabar('Bu yerga qo‘yib bo‘lmaydi — joy band yoki stol cheti.'); }
      tanla(b); return;
    }
    if(!edi || edi.sur || e.type !== 'pointerup') return;
    bosildi(urish(e));
  };
  el.addEventListener('pointerup', qoyib); el.addEventListener('pointercancel', qoyib);
  el.addEventListener('dblclick', e=>{ const h = urish(e); if(h && buyummi(h.eg)) fokus(h.eg); else korinish('umumiy'); });
  el.addEventListener('wheel', e=>{ e.preventDefault(); mq.r = Math.max(.35, Math.min(2.6, mq.r * (e.deltaY > 0 ? 1.1 : .9))); }, {passive:false});
  /* sensorli ekran: ikki barmoq bilan kattalashtirish */
  const barmoq = new Map(); let pinchD = 0, pinchFaol = false;
  const pinchM = ()=>{ const [a, b] = [...barmoq.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  el.addEventListener('pointerdown', e=>{
    if(e.pointerType !== 'touch') return; barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(barmoq.size === 2){
      /* ikkinchi barmoq: boshlangan bosish/ko‘chirish bekor — imo-ishora faqat kattalashtirish */
      pinchD = pinchM(); pinchFaol = true; e.stopImmediatePropagation(); bos = null; halqa.visible = false;
      if(kochir){ const k = kochir, b = k.b; kochir = null; b.x = k.x; b.z = k.z; if(k.plita && !k.plita.ustida) plitagaQoy(b, k.plita); else b.g.position.set(b.x, ST.y, b.z); if(b.tur === 'plita' && b.ustida) b.ustida.g.position.set(b.x, ST.y + b.m.ustY, b.z + b.m.ustZ); }
    } else if(pinchFaol) e.stopImmediatePropagation();
  }, true);
  ['pointerup','pointercancel'].forEach(t=>el.addEventListener(t, e=>{
    barmoq.delete(e.pointerId); if(barmoq.size < 2) pinchD = 0;
    if(pinchFaol){ e.stopImmediatePropagation(); bos = null; el.style.cursor = 'grab'; if(!barmoq.size) pinchFaol = false; }
  }, true));
  el.addEventListener('pointermove', e=>{
    if(!barmoq.has(e.pointerId)) return; barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(barmoq.size === 2){ e.stopImmediatePropagation(); const d = pinchM(); if(pinchD > 0 && d > 0){ mq.r = Math.max(.35, Math.min(2.6, mq.r * pinchD / d)); pinchD = d; } }
  }, true);  function bosildi(h){
    const eg = h && h.eg;
    if(faol){
      if(eg && (eg.tur === 'idish' || eg.tur === 'spirtovka')){ const f = faol; faol = null; faolBelgila(); amalBajar(f.tur, f.k, eg); if(tanlangan !== eg) tanla(eg); rejimYoz(); return; }
      if(eg && eg.tur === 'javon'){ javonOchYop(true); return; }
      xabar(faol.tur === 'reaktiv' ? 'Reaktivni quyish uchun <b>idishni bosing</b>.' : 'Tekshirish uchun <b>idishni bosing</b>.'); return;
    }
    if(eg && eg.tur === 'javon'){ javonOchYop(true); return; }
    /* isitgich: murvatni bosish yoki tanlangan isitgichni qayta bosish — yoqadi/o‘chiradi; spirt lampasi ham qayta bosilsa */
    if(eg && eg.tur === 'plita' && ((h.ob && h.ob.userData.murvat) || tanlangan === eg)){ plitaYoq(eg); tanla(eg); return; }
    if(eg && eg.tur === 'spirtovka' && tanlangan === eg){ spirtovkaYoq(eg); return; }
    if(buyummi(eg)){ tanla(eg); return; }
    tanla(null);
  }

  /* ---------- klaviatura ---------- */
  const kd = e=>{
    if(!ildiz.isConnected) return;
    if(e.target && /INPUT|TEXTAREA/.test(e.target.tagName)){ if(e.key === 'Escape') e.target.blur(); return; }
    if(e.key === 'Escape'){ if(qoplamaOchiq) qoplamaYop(); else if(faol) faolQoy(null); else tanla(null); return; }
    if(qoplamaOchiq) return;
    if((e.key === 'Delete' || e.key === 'Backspace') && tanlangan){ const b = tanlangan; if(olib(b)) xabar(esc(buyumNom(b)) + ' stoldan olindi.'); e.preventDefault(); }
  };
  window.addEventListener('keydown', kd);

  /* ---------- tepa tugmalar ---------- */
  const ovozChiz = ()=>{ const b = $('[data-a="ovoz"]'); b.innerHTML = ui(saq.ovoz ? 'ovoz' : 'ovozsiz'); b.title = saq.ovoz ? 'Ovozni o‘chirish' : 'Ovozni yoqish'; };
  let tozalaT = 0;
  $$('.lab-tepa [data-a]').forEach(b=>b.onclick = ()=>{
    const a = b.dataset.a;
    if(a === 'javon') javonOchYop(); else if(a === 'daftar') daftarOch(); else if(a === 'yordam') yordamOch(); else if(a === 'tajriba') tajribalarOch();
    else if(a === 'ovoz'){ saq.ovoz = saq.ovoz ? 0 : 1; saqla(); ovozChiz(); }
    else if(a === 'tozala'){
      if(Date.now() - tozalaT > 3000){ tozalaT = Date.now(); xabar('Stoldagi hamma buyum olinadi — tasdiqlash uchun <b>yana bir marta bosing</b>.'); return; }
      buyumlar.slice().forEach(x=>{ if(x.tur === 'spirtovka') x.yoniq = false; olib(x); }); faol = null; tanla(null); javonChiz(); xabar('Stol tozalandi.');
    }
    else if(a === 'ekran'){ if(!document.fullscreenElement && ildiz.requestFullscreen) ildiz.requestFullscreen(); else if(document.exitFullscreen) document.exitFullscreen(); }
  });
  $$('.lab-korinish [data-k]').forEach(b=>b.onclick = ()=>korinish(b.dataset.k));
  $('.lc-yop').onclick = ()=>javonOchYop(false);
  $('.lc-qidir').oninput = javonChiz;

  function daftarOch(){
    const q = $('.lab-qoplama'); qoplamaOchiq = true; q.classList.add('kor');
    const kashf = REAL.filter(r=>saq.kashf[r.id]);
    q.innerHTML = `<div class="lab-daftar shisha" role="dialog"><header><div><h2>Tajriba daftari</h2><small>Kashf etilgan reaksiya va kuzatuvlar: ${kashf.length} / ${REAL.length}</small></div><button class="d-hisobot" title="Bugungi tajribalar hisobotini HTML fayl sifatida yuklab olish">${ui('daftar', 15)} Hisobotni yuklab olish</button><button class="yop" aria-label="Yopish">${ui('yop', 16)}</button></header>
      <div class="d-tana">${alangaJadval()}${kashf.length ? kashf.map(r=>'<article><span class="ustki">'+esc(r.tur || 'Kuzatuv')+'</span><h4>'+esc(r.nom)+'</h4>'+(r.tenglama ? '<div class="tenglama">'+esc(r.tenglama)+'</div>' : '')+'<p>'+esc(r.kuzatish)+'</p></article>').join('') : '<p class="j-yoq">Hali birorta reaksiya kuzatilmagan. Idishni tanlab, javondagi reaktivni bosing.</p>'}
      ${REAL.length - kashf.length ? '<div class="d-yashirin">Yana <b>'+(REAL.length - kashf.length)+'</b> ta reaksiya kashf etilishini kutmoqda…</div>' : ''}</div>
      <footer>Manba: ${esc(D.MANBA)}. Model soddalashtirilgan: miqdorlar «qism» bilan, tezlik va issiqlik sifat jihatidan ko‘rsatiladi.</footer></div>`;
    q.querySelector('.yop').onclick = qoplamaYop; q.onclick = e=>{ if(e.target === q) qoplamaYop(); };
    q.querySelector('.d-hisobot').onclick = hisobotYukla;
  }
  function alangaJadval(){
    const A = D.ALANGA || {}, k2 = Object.keys(A);
    if(!k2.length) return '';
    return '<section class="d-alanga"><div class="da-bosh"><span class="ustki">Alanga ranglari jadvali</span><small>'+k2.filter(i=>saq.kashf['alanga_' + i]).length+' / '+k2.length+' sinalgan</small></div><div class="da-q">'
      + k2.map(i=>{ const bor = saq.kashf['alanga_' + i]; return '<div class="da-k'+(bor ? '' : ' yoq')+'"><i style="'+(bor ? 'background:radial-gradient(circle at 50% 70%,#fff8 0,'+A[i].rang+' 45%,transparent 72%)' : '')+'">'+(bor ? '' : '?')+'</i><b>'+esc(i)+'</b><span>'+(bor ? esc(A[i].soz) : 'hali sinalmagan')+'</span></div>'; }).join('')
      + '</div></section>';
  }
  const ikkiXona = n=>String(n).padStart(2, '0');
  function hisobotHTML(){
    let ism = ''; try{ ism = JSON.parse(localStorage.getItem('makon:ism') || '""'); }catch(e){ try{ ism = localStorage.getItem('makon:ism') || ''; }catch(e2){} }
    const s2 = new Date(), sana = ikkiXona(s2.getDate()) + '.' + ikkiXona(s2.getMonth() + 1) + '.' + s2.getFullYear() + ' ' + ikkiXona(s2.getHours()) + ':' + ikkiXona(s2.getMinutes());
    const vaqt = t=>{ const s3 = Math.round((t - boshVaqt) / 1000); return ikkiXona(Math.floor(s3 / 60)) + ':' + ikkiXona(s3 % 60); };
    const bajarilgan = D.TOPSHIRIQ.filter(t=>saq.top[t.id]);
    const A = D.ALANGA || {};
    return '<!doctype html><html lang="uz"><head><meta charset="utf-8"><title>MAKON — laboratoriya hisoboti</title><style>'
      + 'body{font:14px/1.55 Segoe UI,Arial,sans-serif;color:#1c2033;max-width:860px;margin:30px auto;padding:0 20px}h1{font-size:22px;margin:0}h2{font-size:16px;margin:26px 0 8px;border-bottom:2px solid #6d52ff;padding-bottom:4px}'
      + '.m{color:#667}table{width:100%;border-collapse:collapse}td,th{border:1px solid #d7dae6;padding:6px 8px;text-align:left;vertical-align:top}th{background:#f1f0ff}code{font-family:Consolas,monospace;background:#f4f5fa;padding:1px 5px;border-radius:4px}'
      + '.al{display:flex;gap:10px;flex-wrap:wrap}.al div{border:1px solid #d7dae6;border-radius:8px;padding:6px 10px}.al i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:6px;vertical-align:-1px}.eslatma{margin-top:24px;font-size:12px;color:#667}</style></head><body>'
      + '<h1>Virtual laboratoriya hisoboti</h1><div class="m">MAKON · ' + esc(sana) + (ism ? ' · O‘quvchi: <b>' + esc(ism) + '</b>' : '') + '</div>'
      + '<h2>Kuzatilgan reaksiyalar (' + daftar.length + ')</h2>' + (daftar.length ? '<table><tr><th>Reaksiya</th><th>Tenglama</th><th>Kuzatish</th></tr>' + daftar.slice().reverse().map(r=>'<tr><td>' + esc(r.nom) + '</td><td>' + (r.tenglama ? '<code>' + esc(r.tenglama) + '</code>' : '—') + '</td><td>' + esc(r.kuzatish) + '</td></tr>').join('') + '</table>' : '<p>Bu mashg‘ulotda reaksiya kuzatilmadi.</p>')
      + '<h2>Bajarilgan tajribalar (' + bajarilgan.length + ' / ' + D.TOPSHIRIQ.length + ')</h2>' + (bajarilgan.length ? '<ul>' + bajarilgan.map(t=>'<li><b>' + esc(t.nom) + '</b> — ' + esc(t.xulosa) + '</li>').join('') + '</ul>' : '<p>—</p>')
      + '<h2>Alanga ranglari</h2><div class="al">' + Object.keys(A).filter(i=>saq.kashf['alanga_' + i]).map(i=>'<div><i style="background:' + A[i].rang + '"></i><b>' + esc(A[i].nom) + '</b> — ' + esc(A[i].soz) + '</div>').join('') + '</div>'
      + (saq.sirli ? '<h2>«Sirli eritma» o‘yini</h2><p>To‘g‘ri topilgan: <b>' + saq.sirli.togri + '</b> / ' + saq.sirli.jami + '</p>' : '')
      + '<h2>Tajriba jurnali</h2>' + (jurnal.length ? '<table><tr><th style="width:70px">Vaqt</th><th>Amal va kuzatish</th></tr>' + jurnal.map(j=>'<tr><td>' + vaqt(j.t) + '</td><td>' + esc(j.m) + '</td></tr>').join('') + '</table>' : '<p>Jurnal bo‘sh.</p>')
      + '<p class="eslatma">Virtual laboratoriya — soddalashtirilgan model: miqdorlar «qism» bilan, tezlik va issiqlik sifat jihatidan ko‘rsatiladi. Haqiqiy tajriba faqat o‘qituvchi nazoratida o‘tkaziladi. Manba: ' + esc(D.MANBA) + '.</p></body></html>';
  }
  function hisobotYukla(){
    try{
      const b = new Blob([hisobotHTML()], {type:'text/html;charset=utf-8'}), a = document.createElement('a'), d = new Date();
      a.href = URL.createObjectURL(b); a.download = 'MAKON_laboratoriya_' + d.getFullYear() + '-' + ikkiXona(d.getMonth() + 1) + '-' + ikkiXona(d.getDate()) + '.html';
      document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      xabar('Hisobot yuklab olindi — brauzerda ochib, chop etishingiz mumkin.', 'yaxshi');
    }catch(e){ xabar('Hisobotni yuklab bo‘lmadi.'); }
  }
  function yordamOch(){
    const q = $('.lab-qoplama'); qoplamaOchiq = true; q.classList.add('kor');
    q.innerHTML = `<div class="lab-yordam shisha" role="dialog"><span class="ustki">MAKON · virtual laboratoriya</span><h2>Uch qadamda ishlaysiz</h2>
      <div class="y-qadam"><div><i>1</i><b>Idish qo‘ying</b><span>Chapdagi javondan stakan, kolba yoki probirkani bosing — u stolga qo‘yiladi. Sudrab kerakli joyga ham qo‘ysa bo‘ladi.</span></div>
      <div><i>2</i><b>Reaktiv qo‘shing</b><span>Idishni bosing (binafsha halqa bilan belgilanadi), so‘ng javondagi reaktivni bosing — bir qism quyiladi. Rang, cho‘kma, gaz va haroratni kuzating.</span></div>
      <div><i>3</i><b>Tekshiring</b><span>O‘ng paneldagi tugmalar: <b>isitish</b>, <b>gazni sinash</b> (cho‘p), <b>muhitni aniqlash</b> (indikator qog‘ozi), bo‘shatish. Spirt lampasi — alanga rangi sinovi.</span></div></div>
      <p class="y-bosh"><b>Tajribalar</b> tugmasi — ${D.TOPSHIRIQ.length} ta topshiriq qadamma-qadam va «Sirli eritma» o‘yini. Pastdagi qator doim keyingi qadamni aytib turadi.<br>Kamera: bo‘sh joyni sudrang — aylantirish, g‘ildirak — yaqinlashtirish, buyumni ikki marta bosing — yaqindan. <kbd>Esc</kbd> — bekor, <kbd>Delete</kbd> — buyumni olib tashlash.</p>
      <button class="b-ol">Boshlash</button></div>`;
    const yop = ()=>{ saq.yordam = 1; saqla(); qoplamaYop(); };
    q.querySelector('.b-ol').onclick = yop; q.onclick = e=>{ if(e.target === q) yop(); };
  }

  /* ---------- kadr ---------- */
  const _tq = new T.Color(), _hsl = {};
  function tiniq(c){ c.getHSL(_hsl); return _tq.setHSL(_hsl.h, Math.min(1, _hsl.s * 1.45), _hsl.s > .08 && _hsl.l > .5 ? _hsl.l * .88 : _hsl.l); }
  function idishKadr(b, dt){
    const v = b.v, d = b.m.d, t = v.tarkib;
    // harorat
    const p = b.plita;
    if(p && p.Tp > v.T){ const chek = v.hajm() > EPS ? 100 : 260; v.T += (Math.min(p.Tp, chek) - v.T) * Math.min(1, dt * (v.hajm() > EPS ? .42 / Math.max(.6, v.hajm() * .3) : .6)); }
    else v.T += (XONA_T - v.T) * Math.min(1, dt * .08); /* o‘yin tezligi: haqiqiy stakan sekinroq soviydi */
    const issiqEdi = v.issiq; v.issiq = v.T >= 70;
    if(v.issiq !== !!issiqEdi){ const boldi = yurit(v); if(boldi.length) reaksiyadanKeyin(v, boldi, b); }
    const qaynaydi = v.T >= 99 && v.hajm() > EPS;
    if(v.muallaq > 0) v.muallaq = Math.max(0, v.muallaq - dt / 32);
    if(v.pufak.t > 0) v.pufak.t -= dt;
    if(v.gaz){ v.gaz.qolgan -= dt; if(v.gaz.qolgan <= 0) v.gaz = null; }
    // suyuqlik
    const M = maqsad(v), hfM = d.hMax * Math.min(1, v.hajm() / v.sigim);
    const kk = 1 - Math.exp(-v.tez * dt);
    if(Math.abs(hfM - v.hfVis) > 2e-4 || b._chok !== M.chokH){
      v.hfVis += (hfM - v.hfVis) * Math.min(1, dt * 5); if(Math.abs(hfM - v.hfVis) < 3e-4) v.hfVis = hfM;
      b.m.suyuq.geometry.dispose(); b.m.suyuq.visible = v.hfVis > 1e-3; if(b.m.suyuq.visible) b.m.suyuq.geometry = MD.suyuqGeom(d, v.hfVis);
    }
    b._chokVis = (b._chokVis || 0) + (M.chokH - (b._chokVis || 0)) * Math.min(1, dt * .8);
    if(Math.abs((b._chokChiz || 0) - b._chokVis) > 4e-4 || (M.chokH === 0 && b.m.chokma.visible && b._chokVis < 5e-4)){
      b._chokChiz = b._chokVis; b.m.chokma.geometry.dispose(); b.m.chokma.visible = b._chokVis > 6e-4; if(b.m.chokma.visible) b.m.chokma.geometry = MD.suyuqGeom(d, Math.min(b._chokVis, Math.max(.002, v.hfVis)), .97);
    }
    b._chok = M.chokH;
    b._c = b._c || M.c.clone(); b._a = b._a === undefined ? M.a : b._a; b._cr = b._cr || M.chokRang.clone();
    b._c.lerp(M.c, kk); b._a += (M.a - b._a) * kk; b._cr.lerp(M.chokRang, Math.min(1, kk * 1.5));
    /* v3.16: ko‘rinishi uchun rang to‘yinganroq (+45 %, och ranglar biroz to‘qroq) va eritma quyuqroq; rangsiz suv o‘zgarmaydi */
    b.m.suyuq.material.color.copy(tiniq(b._c)).convertSRGBToLinear(); b.m.suyuq.material.opacity = _hsl.l < .3 ? Math.min(.97, b._a * 1.35) : _hsl.s > .08 ? Math.min(.94, b._a * 1.35) : (b.m.chokma.visible ? b._a * .4 : b._a); /* rangsiz eritma ostida cho‘kma bo‘lsa — shaffofroq, cho‘kma o‘z rangida ko‘rinsin (masalan, qora CuO) */
    b.m.chokma.material.color.copy(tiniq(b._cr)).convertSRGBToLinear();
    { const tq = Math.max(b._c.r, b._c.g, b._c.b) < .3, sm = b.m.suyuq.material; sm.roughness = tq ? .95 : .3; sm.envMapIntensity = tq ? 0 : .25; } /* qora eritma yuzasi yaltirab kulrang ko‘rinmasin */
    // qattiq bo‘lakchalar
    ['Zn_s', 'Mg_s', 'Fe_s', 'Cu_s', 'Na_s', 'CaCO3_s', 'MnO2_s', 'CuO_s', 'NaHCO3_s', 'NH4_s'].forEach(k=>{
      const bor2 = t[k] || 0; v.visQ[k] = (v.visQ[k] || 0) + (bor2 - (v.visQ[k] || 0)) * (bor2 > (v.visQ[k] || 0) ? 1 : kk);
      let gq = b.bolak[k];
      if(v.visQ[k] > .03 && !gq){ gq = b.bolak[k] = MD.bolakcha(k, d); b.m.qattiq.add(gq); }
      if(!gq) return;
      gq.visible = v.visQ[k] > .03; if(!gq.visible) return;
      const s = Math.cbrt(Math.min(2, v.visQ[k])) * (k === 'Na_s' ? 1 : 1); gq.scale.set(s, s, s);
      if(gq.userData.suzadi){ const rr = d.profil(v.hfVis) * .55; gq.children[0].position.set(Math.cos(vaqt * 2.7 + b.id) * rr * Math.sin(vaqt * 1.3), d.y0 + Math.max(.006, v.hfVis) / s, Math.sin(vaqt * 3.1) * rr); }
      const qop = k === 'Cu_s' ? Math.min(1, (t.pAg || 0) * .8) : Math.min(1, (t.pCu || 0) * 1.2 + (t.pAg || 0) * .8), qr = (t.pCu || 0) > EPS && k !== 'Cu_s' ? '#a8522a' : '#d9dde0';
      if(gq.userData.qop !== undefined || qop > .01){ gq.userData.qop = (gq.userData.qop || 0) + (qop - (gq.userData.qop || 0)) * kk; const qc = R(qr); gq.traverse(o=>{ if(o.isMesh){ o.material.color.copy(o.userData.asl).lerp(qc, gq.userData.qop); o.material.roughness = .45 + gq.userData.qop * .4; } }); }
    });
    // pufakchalar
    const kuch = v.pufak.t > 0 ? v.pufak.kuch * Math.min(1, v.pufak.t / 2) : 0, jami = Math.max(kuch, qaynaydi ? .9 : 0);
    if(jami > 0 && v.hfVis > .004){
      const kerak = Math.ceil(4 + jami * 16);
      while(b.pufaklar.length < kerak){ const m = new T.Mesh(pufakG, pufakM); m.renderOrder = 2; b.g.add(m); b.pufaklar.push({m, y:Math.random(), x:0, z:0, tz:.5 + Math.random()}); }
      b.pufaklar.forEach((pf, i)=>{
        pf.m.visible = i < kerak; if(!pf.m.visible) return;
        pf.y += dt * pf.tz * (.5 + jami) * (.1 / Math.max(.03, v.hfVis));
        if(pf.y >= 1 || !pf.r){ pf.y = pf.r ? 0 : pf.y; const a = Math.random() * 6.28, rr = d.profil(0) * .8 * Math.sqrt(Math.random()); pf.x = Math.cos(a) * rr; pf.z = Math.sin(a) * rr; pf.r = .0016 + Math.random() * .0024 * (.6 + jami); }
        const yy = pf.y * v.hfVis, cheg = d.profil(yy) * .85, rr = Math.hypot(pf.x, pf.z), kq = rr > cheg ? cheg / rr : 1;
        pf.m.position.set(pf.x * kq + Math.sin(vaqt * 9 + i) * .0015, d.y0 + yy, pf.z * kq); pf.m.scale.setScalar(pf.r * (.7 + pf.y * .6));
      });
    } else b.pufaklar.forEach(pf=>pf.m.visible = false);
    b.m.kopik.visible = jami > .5 && v.hfVis > .004;
    if(b.m.kopik.visible){ b.m.kopik.position.y = d.y0 + v.hfVis + .0008; b.m.kopik.scale.setScalar(d.profil(v.hfVis) * .97); const tq = Math.max(b._c.r, b._c.g, b._c.b) < .3; /* qora eritmada ko‘pik oqartirib yubormasin */ b.m.kopik.material.color.setScalar(tq ? .1 : 1); b.m.kopik.material.opacity = (jami - .5) * (tq ? .35 : 1.1); }
    // bug‘
    if(v.T >= 88 && v.hajm() > EPS){
      while(b.buglar.length < 6){ const m = new T.Mesh(pufakG, bugM); b.g.add(m); b.buglar.push({m, y:b.buglar.length / 6}); }
      b.buglar.forEach((g2, i)=>{ g2.y = (g2.y + dt * .28) % 1; g2.m.visible = true; g2.m.position.set(Math.sin(vaqt * 1.3 + i * 2) * .015, d.ogiz + g2.y * .22, Math.cos(vaqt + i) * .015); g2.m.scale.setScalar(.012 + g2.y * .035); });
    } else b.buglar.forEach(g2=>g2.m.visible = false);
  }
  function spirtKadr(b, dt){
    const m = b.m;
    b.kuch += ((b.yoniq ? 1 : 0) - b.kuch) * Math.min(1, dt * 5);
    if(!(simAnim && simAnim.b === b && simAnim.t < 2.7)) b.rangK = Math.max(0, b.rangK - dt * 1.4);
    m.qalpoq.position.lerp(b.yoniq ? m.qalpoqYon : m.qalpoqUst, Math.min(1, dt * 7));
    const s = b.kuch, tit = 1 + Math.sin(vaqt * 27 + b.id) * .06 + Math.sin(vaqt * 11.3) * .04;
    m.alanga.visible = s > .02;
    m.alanga.scale.set(Math.max(.001, s * (1 + b.rangK * .35)), Math.max(.001, s * tit * (1 + b.rangK * .5)), Math.max(.001, s * (1 + b.rangK * .35)));
    m.tashqi.material.color.copy(m.asl).lerp(b.rang, b.rangK); m.tashqi.material.opacity = .5 + b.rangK * .42;
    m.ichki.material.opacity = .85 * (1 - b.rangK * .6);
    m.nur.intensity = s * (.12 + b.rangK * .55) * tit; m.nur.color.copy(m.asl).lerp(b.rang, b.rangK);
  }

  let kadr = 0, oldingi = performance.now(), tanT = 0, yopildi = false;
  function olcham(){ const w = sahnaEl.clientWidth || 800, h = sahnaEl.clientHeight || 500; ren.setSize(w, h, false); el.style.width = '100%'; el.style.height = '100%'; cam.aspect = w / h; cam.updateProjectionMatrix(); }
  const ro = window.ResizeObserver ? new ResizeObserver(olcham) : null; if(ro) ro.observe(sahnaEl); window.addEventListener('resize', olcham);
  function chiz(now){
    if(yopildi) return;
    kadr = requestAnimationFrame(chiz);
    const dt = Math.min(.2, (now - oldingi) / 1000) * (api.tezlik || 1); oldingi = now; vaqt += dt;
    kameraKadr(Math.min(.2, dt));
    buyumlar.forEach(b=>{
      if(b.tur === 'idish') idishKadr(b, dt);
      else if(b.tur === 'spirtovka') spirtKadr(b, dt);
      else if(b.tur === 'plita'){ const edi = Math.round(b.Tp); b.Tp += ((b.yoniq ? b.maqsad : XONA_T) - b.Tp) * Math.min(1, dt * (b.yoniq ? .3 : .1)); b.m.nurM.opacity = Math.max(0, Math.min(1, (b.Tp - 35) / 150)); if(Math.abs((b._yoz || 0) - b.Tp) > 1){ b._yoz = b.Tp; b.m.yoz(b.Tp, b.yoniq); } }
    });
    if(oqimT > 0){ oqimT -= dt; const k = 1 - oqimT / .55; oqim.scale.y = .02 + Math.sin(Math.min(1, k * 1.4) * Math.PI) * .17; oqim.position.y += 0; if(oqimT <= 0) oqim.visible = false; }
    if(simAnim){
      const c = simAnim, b = c.b; c.t += dt;
      if(!buyumlar.includes(b)){ simAnim = null; SH.g.visible = false; }
      else {
        const kir = Math.min(1, c.t / .5), chiq = c.t > 2.6 ? Math.min(1, (c.t - 2.6) / .45) : 0, k = (1 - Math.pow(1 - kir, 3)) * (1 - chiq);
        const f = b.m.alangaNuqta, wp = b.g.position;
        SH.g.position.set(wp.x + f.x + (1 - k) * .14, wp.y + f.y + .018 + (1 - k) * .1, wp.z + f.z + (1 - k) * .06); SH.g.rotation.y = yaw + .6;
        if(c.rang && c.t > .45 && c.t < 2.7){ b.rang.copy(c.rang); b.rangK = Math.min(1, b.rangK + dt * 5); }
        SH.qizil.material.opacity = Math.max(0, Math.min(1, (c.t - .5) * 2)) * (1 - chiq);
        if(c.t > 3.05){ simAnim = null; SH.g.visible = false; }
      }
    }
    if(qogAnim){
      const c = qogAnim; c.t += dt;
      QG.g.scale.setScalar(Math.min(1, c.t * 4));
      if(c.rang && c.t > .35) QG.uch.material.color.lerp(c.rang, Math.min(1, dt * 4));
      if(c.t > 2.4){ QG.g.visible = false; qogAnim = null; }
    }
    if(chopAnim){
      const c = chopAnim; c.t += dt; let al = 1, ch = 0;
      if(c.gaz === 'H2'){ al = c.t > .45 && c.t < .62 ? 4.5 : c.t < .45 ? 1 : .0; }
      else if(c.gaz === 'O2'){ al = c.t < .5 ? 0 : Math.min(1.9, (c.t - .5) * 4); ch = 1; }
      else if(c.gaz === 'CO2'){ al = Math.max(0, 1 - c.t * 1.6); ch = al < .05 ? .6 : 0; }
      al *= 1 + Math.sin(vaqt * 31) * .08;
      CH.alanga.scale.set(Math.max(.001, al), Math.max(.001, al * (1 + Math.sin(vaqt * 23) * .1)), Math.max(.001, al)); CH.alanga.visible = al > .02; CH.chog.visible = ch > 0 || al > .02; CH.nur.intensity = Math.min(2.5, al * .9);
      if(c.t > 2.3){ CH.g.visible = false; CH.nur.intensity = 0; chopAnim = null; }
    }

    if(tanlangan){ tanlovHalqa.position.set(tanlangan.g.position.x, ST.y + .003, tanlangan.g.position.z); if((tanT += dt) > .5){ tanT = 0; const e2 = ildiz.querySelector('#tanT'); if(e2) e2.textContent = Math.round(tanlangan.tur === 'plita' ? tanlangan.Tp : tanlangan.v ? tanlangan.v.T : 0) + ' °C'; } }
    halqa.material.opacity = .6 + Math.sin(vaqt * 5) * .25; tanlovHalqa.material.opacity = .75 + Math.sin(vaqt * 3) * .2;
    ren.render(sc, cam);
    yorliqlarKadr();
  }

  const api = {
    idish:idishEl, tezlik:1, D, get buyumlar(){ return buyumlar; }, cam,
    joyla, avtoQoy, boshJoy, quy, gazSinov, qogozSinov, plitaYoq, plitaHarorat, kerakHarorat, spirtovkaYoq, alangaSinov, isit, tanla, kartaBos, korinish, fokus, olib, boshat, qoplamaYop, tajribaBoshla,
    sirliBoshla, sirliJavob, hisobotHTML, daftarOch, tajribalarOch, get jurnal(){ return jurnal; }, get sirli(){ return sirli; },
    /* sinov uchun: buyumni koordinata bo‘yicha qo‘yish (eski API bilan mos) */
    qoy(tur, k, x, z, plitaB){ if(tur !== 'jihoz' || D.JIHOZ[k].asbob) return null; const b = joyla(k, x, z); if(plitaB) plitagaQoy(b, plitaB); return b; },
    tinglash(f){ hodisaTinglovchi.push(f); },
    qotir(){}, zoomla(k){ mq.r = Math.max(.35, Math.min(2.6, mq.r / k)); }, tikla(){ korinish('umumiy'); },
    yopish(){
      if(yopildi) return; yopildi = true; cancelAnimationFrame(kadr);
      if(sudrOlib) sudrOlib(); if(window._lab === api) delete window._lab;
      window.removeEventListener('keydown', kd); window.removeEventListener('resize', olcham); if(ro) ro.disconnect();
      sc.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material) ? o.material : [o.material]).forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); }); } });
      ren.dispose(); if(ren.forceContextLoss) ren.forceContextLoss();
      if(ac && ac.close) try{ ac.close(); }catch(e){}
      if(ildiz.parentNode) ildiz.remove(); if(xar) xar.delete(idishEl);
    }
  };
  if(xar) xar.set(idishEl, api);
  window._lab = api;

  // boshlang‘ich holat: isitgich va stakan; stakan tanlangan — javondagi reaktivni bosish kifoya
  joyla('plita', .3, -1.0);
  const boshStakan = joyla('stakan', -.08, -.62);
  if(!tor()) javonOchYop(true);
  javonChiz(); vazifaChiz(); kashfYangila(); ovozChiz(); olcham(); tanla(boshStakan);
  kadr = requestAnimationFrame(chiz);
  if(!saq.yordam) yordamOch();
  return api;
}
window.MAKON_LAB = {och};
})();
