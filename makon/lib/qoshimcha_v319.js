/* MAKON v3.19 — ikki yangi imkoniyat: (1) «Takrorlash kartalari» (#/takror) — darslar lug‘atidan so‘z kartalari,
   oraliqli takrorlash (1→2→4→8→16→32 kun), natija localStorage `makon:kartalar`; (2) «Musobaqa» (#/musobaqa) —
   fanlararo vaqtli test (tanlangan fanlar, 10/20 savol, har savolga 20 s), rekordlar `makon:musobaqa`.
   app3.js dan `MAKON_V319.takror(ctx)` / `MAKON_V319.musobaqa(ctx)` chaqiriladi; ctx = {xotira, DARS, FAN, ikon, esc, fanOf, rasm, ilova, $, $$}.
   Pedagogik asos: retrieval + spacing (o‘zini sinab ko‘rish va takrorlashni vaqtga yoyish) — eng kuchli dalilli usullar. */
(function(){
const ORALIQ = [1, 2, 4, 8, 16, 32]; /* kun */
const kun = ()=>{ const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const sana = d=>d.toISOString().slice(0, 10);
const ara = a=>{ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- lug‘at kartalari bazasi ---------- */
function kartalarBazasi(ctx){
  const {DARS, fanOf} = ctx, r = [];
  Object.keys(DARS).forEach(id=>{
    const d = DARS[id], f = fanOf(d); if(!f || !Array.isArray(d.lugat)) return;
    d.lugat.forEach((l, i)=>{
      let atama, izoh;
      if(Array.isArray(l)){ atama = l[0]; izoh = l[1]; }
      else if(l && typeof l === 'object'){ atama = l.atama || l.soz || l.nom || l.t; izoh = l.izoh || l.tarjima || l.m || l.d; }
      if(!atama || !izoh) return;
      r.push({k:id + ':' + i, id, fan:f.id, fanNom:f.nom, rang:f.rang, dars:(d.qisqaNom && d.qisqaNom !== f.nom) ? d.qisqaNom : d.nom, atama:String(atama), izoh:String(izoh)});
    });
  });
  return r;
}
const holatOl = ctx=>ctx.xotira.ol('kartalar', {});
const holatYoz = (ctx, h)=>ctx.xotira.yoz('kartalar', h);
const bugungi = (baza, h)=>{ const b = sana(kun()); return baza.filter(k=>h[k.k] && h[k.k].d <= b); };
const yangi = (baza, h)=>baza.filter(k=>!h[k.k]);
const organilgan = (baza, h)=>baza.filter(k=>h[k.k] && h[k.k].q >= 3);

function takror(ctx){
  const {ikon, esc, ilova, $, $$, FAN, xotira} = ctx;
  const baza = kartalarBazasi(ctx), h = holatOl(ctx);
  const fanTanlov = xotira.ol('kartaFan', '');
  const fanlar = FAN.filter(f=>!f.yopiq && baza.some(k=>k.fan === f.id));
  const filtr = k=>!fanTanlov || k.fan === fanTanlov;
  const bz = baza.filter(filtr), bug = bugungi(bz, h), yg = yangi(bz, h), org = organilgan(bz, h);
  const sessiya = bug.length + Math.min(yg.length, Math.max(0, 20 - bug.length));
  ilova.innerHTML = `<span class="ustki">Takrorlash</span><h1 class="sarlavha">Takrorlash kartalari</h1>
  <p class="lid">Har darsning lug‘atidagi atamalar — karta ko‘rinishida. Atamani ko‘ring, eslashga harakat qiling, keyin kartani oching. «Bildim» desangiz karta uzoqroq muddatga (1 → 2 → 4 → 8 → 16 → 32 kun) ketadi, «Bilmadim» desangiz ertaga qaytadi. Bu usul — o‘zini sinab ko‘rish va takrorlashni vaqtga yoyish — eng samarali eslab qolish usullaridan.</p>
  <div class="kpi-g">
    <div class="kpi"><span class="i">${ikon('kitobcha')}</span><b>${bz.length}</b><span>atama (${fanTanlov ? 'tanlangan fan' : 'barcha fanlar'})</span></div>
    <div class="kpi"><span class="i">${ikon('soat')}</span><b>${bug.length}</b><span>bugun takrorlash kerak</span></div>
    <div class="kpi"><span class="i">${ikon('yulduz')}</span><b>${yg.length}</b><span>hali ko‘rilmagan</span></div>
    <div class="kpi"><span class="i">${ikon('medal')}</span><b>${org.length}</b><span>mustahkam o‘rganilgan (≥ 8 kun)</span></div>
  </div>
  <div class="tk-fan"><button class="chip ${!fanTanlov ? 'faol' : ''}" data-f="">Barcha fanlar</button>${fanlar.map(f=>`<button class="chip ${fanTanlov === f.id ? 'faol' : ''}" data-f="${f.id}"><i style="background:${f.rang}"></i>${esc(f.nom)} <em>${baza.filter(k=>k.fan === f.id).length}</em></button>`).join('')}</div>
  <section class="karta tk-bosh">
    <div><h3>${sessiya ? 'Bugungi mashg‘ulot: ' + sessiya + ' ta karta' : 'Bugun takrorlash kerak emas'}</h3><p>${bug.length ? bug.length + ' ta takrorlash' : ''}${bug.length && Math.min(yg.length, Math.max(0, 20 - bug.length)) ? ' + ' : ''}${Math.min(yg.length, Math.max(0, 20 - bug.length)) ? Math.min(yg.length, Math.max(0, 20 - bug.length)) + ' ta yangi' : ''}${!sessiya ? 'Ertaga yana kiring yoki boshqa fanni tanlang.' : ' · taxminan ' + Math.max(2, Math.round(sessiya / 4)) + ' daqiqa'}</p></div>
    <div class="tk-tug">${sessiya ? `<button class="tg a" id="tkBosh">${ikon('oldinga',{w:15})} Boshlash</button>` : ''}<button class="tg o" id="tkErkin">Erkin takrorlash (20 ta tasodifiy)</button></div>
  </section>
  ${org.length ? `<div class="bolim-sar"><h2>Mustahkam o‘rganilgan atamalar</h2></div><div class="tk-royxat">${org.slice(0, 30).map(k=>`<span class="tk-at" title="${esc(k.dars)}"><i style="background:${k.rang}"></i>${k.atama}</span>`).join('')}${org.length > 30 ? '<span class="tk-at">… yana ' + (org.length - 30) + '</span>' : ''}</div>` : ''}`;
  $$('.tk-fan .chip').forEach(b=>b.onclick = ()=>{ xotira.yoz('kartaFan', b.dataset.f); takror(ctx); });
  if($('#tkBosh')) $('#tkBosh').onclick = ()=>mashq(ctx, ara(bug).concat(ara(yg).slice(0, Math.max(0, 20 - bug.length))), false);
  $('#tkErkin').onclick = ()=>mashq(ctx, ara(bz).slice(0, 20), true);
}

function mashq(ctx, royxat, erkin){
  const {ikon, esc, ilova, $, $$} = ctx;
  if(!royxat.length) return takror(ctx);
  let i = 0, bildi = 0, ochiq = false; const natija = [];
  const klav = e=>{
    if(!$('#tkKarta')) return window.removeEventListener('keydown', klav);
    if(e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); if(!ochiq) och(); }
    else if(ochiq && (e.key === '1' || e.key === 'ArrowLeft')) javob(false);
    else if(ochiq && (e.key === '2' || e.key === 'ArrowRight')) javob(true);
  };
  window.addEventListener('keydown', klav);
  function chiz(){
    const k = royxat[i]; ochiq = false;
    ilova.innerHTML = `<div class="tk-mashq">
      <div class="tk-ust"><span class="ustki">${esc(k.fanNom)} · ${esc(k.dars)} · ${i + 1} / ${royxat.length}</span><a class="tg o kichik" href="#/takror">${ikon('orqa',{w:14})} Chiqish</a></div>
      <div class="progress-q">${royxat.map((_, j)=>'<i class="' + (j < i ? (natija[j] ? 'ok' : 'xato') : j === i ? 'hozir' : '') + '"></i>').join('')}</div>
      <button class="karta tk-karta" id="tkKarta" aria-label="Kartani ochish"><span class="tk-yuz"><small>Atama</small><b>${k.atama}</b><em>Eslang, keyin kartani bosing (yoki Bo‘sh joy)</em></span><span class="tk-orqa"><small>Ma’nosi</small><p>${k.izoh}</p><a href="#/dars/${k.id}/kor" class="tk-dars">${ikon('kitob',{w:14})} ${esc(k.dars)} darsiga o‘tish</a></span></button>
      <div class="tk-javob" id="tkJavob" style="visibility:hidden"><button class="tg o" id="tkYoq">${ikon('yopish',{w:15})} Bilmadim <kbd>1</kbd></button><button class="tg a" id="tkHa">${ikon('ok',{w:15})} Bildim <kbd>2</kbd></button></div>
    </div>`;
    $('#tkKarta').onclick = och;
    $('#tkYoq').onclick = ()=>javob(false); $('#tkHa').onclick = ()=>javob(true);
  }
  function och(){ if(ochiq) return; ochiq = true; $('#tkKarta').classList.add('ochiq'); $('#tkJavob').style.visibility = 'visible'; $('#tkHa').focus(); }
  function javob(ok){
    const k = royxat[i]; natija[i] = ok; if(ok) bildi++;
    if(!erkin || true){ /* erkin rejimda ham jadval yangilanadi — har takror foydali */
      const h = holatOl(ctx), e = h[k.k] || {q:-1};
      const q = ok ? Math.min(ORALIQ.length - 1, e.q + 1) : 0;
      const d = kun(); d.setDate(d.getDate() + ORALIQ[q]);
      h[k.k] = {q, d:sana(d), s:(e.s || 0) + 1, x:(e.x || 0) + (ok ? 0 : 1)};
      holatYoz(ctx, h);
    }
    i++; if(i < royxat.length) chiz(); else yakun();
  }
  function yakun(){
    window.removeEventListener('keydown', klav);
    const foiz = Math.round(bildi / royxat.length * 100);
    const xatolar = royxat.filter((_, j)=>!natija[j]);
    ilova.innerHTML = `<div class="natija3"><section class="natija-hero">
      <div class="halqa" style="--p:${foiz}"><div><span><b>${foiz}%</b><small>${bildi} / ${royxat.length}</small></span></div></div>
      <h2>${foiz === 100 ? 'Hammasini bildingiz!' : foiz >= 70 ? 'Yaxshi — davom eting.' : 'Qiyin atamalar ertaga yana keladi.'}</h2>
      <p>${bildi} ta atama uzoqroq muddatga ketdi${xatolar.length ? ', ' + xatolar.length + ' tasi ertaga qaytadi' : ''}.</p>
      <div class="tugmalar"><a class="tg shisha" href="#/takror">Kartalar sahifasi</a><a class="tg oq" href="#/">Bosh sahifa</a></div>
    </section>
    ${xatolar.length ? `<section class="karta"><div class="karta-sar"><h3>Qayta ko‘rish</h3></div><div class="tk-xato">${xatolar.map(k=>`<div><b>${k.atama}</b><span>${k.izoh}</span></div>`).join('')}</div></section>` : ''}</div>`;
  }
  chiz();
}

/* ---------- Musobaqa ---------- */
function musobaqa(ctx){
  const {ikon, esc, ilova, $, $$, FAN, DARS, xotira} = ctx;
  const fanlar = FAN.filter(f=>!f.yopiq && Object.values(DARS).some(d=>d.fan === f.id && Array.isArray(d.test) && d.test.some(s=>s.tur !== '3d')));
  const soz = xotira.ol('musobaqaSoz', {fan:[], n:10, t:20});
  if(!Array.isArray(soz.fan)) soz.fan = [];
  const rek = xotira.ol('musobaqa', []);
  const chiz = ()=>{
    const tanl = soz.fan.length ? soz.fan : fanlar.map(f=>f.id);
    const havza = Object.keys(DARS).filter(id=>tanl.includes(DARS[id].fan)).reduce((a, id)=>a + DARS[id].test.filter(s=>s.tur !== '3d').length, 0);
    ilova.innerHTML = `<span class="ustki">Musobaqa</span><h1 class="sarlavha">Fanlararo musobaqa</h1>
    <p class="lid">Tanlangan fanlardan tasodifiy savollar, har biriga ${soz.t} soniya. Xato javob yoki vaqt tugashi — ball yo‘q, keyingi savolga o‘tiladi. Natija shu kompyuterdagi rekordlar jadvaliga yoziladi — sinfdoshlar bilan bellashing.</p>
    <section class="karta ms-soz">
      <div><h3>Fanlar</h3><div class="tk-fan">${fanlar.map(f=>`<button class="chip ${tanl.includes(f.id) ? 'faol' : ''}" data-f="${f.id}"><i style="background:${f.rang}"></i>${esc(f.nom)}</button>`).join('')}</div><p class="manba-iz">Savollar havzasi: ${havza} ta</p></div>
      <div class="ms-qator"><div><h3>Savollar soni</h3><div class="tk-fan">${[10, 20, 30].map(n=>`<button class="chip ${soz.n === n ? 'faol' : ''}" data-n="${n}">${n}</button>`).join('')}</div></div>
      <div><h3>Har savolga vaqt</h3><div class="tk-fan">${[15, 20, 30].map(t=>`<button class="chip ${soz.t === t ? 'faol' : ''}" data-t="${t}">${t} s</button>`).join('')}</div></div></div>
      <div class="tk-tug"><button class="tg a" id="msBosh" ${havza < soz.n ? 'disabled' : ''}>${ikon('olov',{w:15})} Boshlash</button></div>
    </section>
    <div class="bolim-sar"><h2>Rekordlar</h2><p>eng yaxshi 10 natija (shu kompyuter)</p></div>
    ${rek.length ? `<div class="jadval-q"><table class="jadval"><thead><tr><th>#</th><th>Ism</th><th>Ball</th><th>Savollar</th><th>Vaqt</th><th>Sana</th></tr></thead><tbody>${rek.slice(0, 10).map((r, i)=>`<tr><td>${i + 1}</td><td><b>${esc(r.ism)}</b></td><td>${r.ball}</td><td>${r.n}</td><td>${r.vaqt} s</td><td>${new Date(r.sana).toLocaleDateString('uz-UZ')}</td></tr>`).join('')}</tbody></table></div>` : '<section class="karta xb-bo"><h3>Hali rekord yo‘q</h3><p>Birinchi musobaqani boshlang.</p></section>'}`;
    $$('.ms-soz [data-f]').forEach(b=>b.onclick = ()=>{ const f = b.dataset.f; const t = soz.fan.length ? soz.fan.slice() : fanlar.map(x=>x.id); const i = t.indexOf(f); if(i >= 0){ if(t.length > 1) t.splice(i, 1); } else t.push(f); soz.fan = t.length === fanlar.length ? [] : t; xotira.yoz('musobaqaSoz', soz); chiz(); });
    $$('.ms-soz [data-n]').forEach(b=>b.onclick = ()=>{ soz.n = +b.dataset.n; xotira.yoz('musobaqaSoz', soz); chiz(); });
    $$('.ms-soz [data-t]').forEach(b=>b.onclick = ()=>{ soz.t = +b.dataset.t; xotira.yoz('musobaqaSoz', soz); chiz(); });
    $('#msBosh').onclick = ()=>{
      const sav = [];
      Object.keys(DARS).filter(id=>tanl.includes(DARS[id].fan)).forEach(id=>DARS[id].test.forEach((s, k)=>{ if(s.tur !== '3d' && Array.isArray(s.v) && s.v.length === 4) sav.push({id, k}); }));
      oyin(ctx, ara(sav).slice(0, soz.n), soz.t);
    };
  };
  chiz();
}

function oyin(ctx, royxat, T){
  const {ikon, esc, ilova, $, $$, DARS, fanOf, xotira} = ctx;
  let i = 0, ball = 0, taymer = null, boshV = Date.now(), qolgan = T; const harf = ['A','B','C','D'], natija = [];
  const tozala = ()=>{ if(taymer){ clearInterval(taymer); taymer = null; } };
  window.addEventListener('hashchange', tozala, {once:true});
  function chiz(){
    const x = royxat[i], d = DARS[x.id], s = d.test[x.k], f = fanOf(d); qolgan = T;
    ilova.innerHTML = `<div class="xb-mashq ms-oyin"><section class="karta savol-k">
      <div class="tk-ust"><span class="ustki"><i class="nuqta" style="background:${f.rang}"></i>${esc(f.nom)} · ${i + 1} / ${royxat.length}</span><span class="ms-ball">${ikon('medal',{w:15})} ${ball}</span><a class="tg o kichik" href="#/musobaqa">${ikon('orqa',{w:14})} Chiqish</a></div>
      <div class="ms-vaqt"><i id="msV" style="width:100%"></i></div><div class="ms-sek" id="msS">${qolgan} s</div>
      <h2>${s.s}</h2>
      <div class="javoblar" id="jv">${s.v.map((v, j)=>`<button class="javob" data-j="${j}"><i>${harf[j]}</i>${v}</button>`).join('')}</div>
      <div id="tush"></div>
      <div class="test-past"><span class="manba-iz" style="margin:0">${esc(d.qisqaNom || d.nom)}</span><button class="tg a" id="keyingi" style="visibility:hidden">${i === royxat.length - 1 ? 'Yakunlash' : 'Keyingi'} ${ikon('oldinga',{w:15})}</button></div>
    </section></div>`;
    const t0 = Date.now();
    taymer = setInterval(()=>{
      const o = (Date.now() - t0) / 1000; qolgan = Math.max(0, T - o);
      const v = $('#msV'); if(!v){ tozala(); return; }
      v.style.width = (qolgan / T * 100) + '%'; v.classList.toggle('oz', qolgan < 5); $('#msS').textContent = Math.ceil(qolgan) + ' s';
      if(qolgan <= 0){ tozala(); javob(null); }
    }, 100);
    const javob = j=>{
      tozala(); const ok = j === s.t; natija[i] = ok; if(ok) ball++;
      $('#jv').classList.add('tugadi'); if(j !== null) $('#jv').children[j].classList.add(ok ? 'togri' : 'xato'); $('#jv').children[s.t].classList.add('togri');
      $('#tush').innerHTML = '<div class="tushuntirish"><span class="i">' + ikon(ok ? 'ok' : 'info',{w:16}) + '</span><span>' + (j === null ? '<b>Vaqt tugadi.</b> ' : ok ? '<b>To‘g‘ri!</b> ' : '<b>Noto‘g‘ri.</b> ') + (s.izoh || '') + '</span></div>';
      const k = $('#keyingi'); k.style.visibility = 'visible'; k.focus();
      $$('#jv .javob').forEach(b=>b.disabled = true);
    };
    $$('#jv .javob').forEach(b=>b.onclick = ()=>javob(+b.dataset.j));
    $('#keyingi').onclick = ()=>{ i++; if(i < royxat.length) chiz(); else yakun(); };
  }
  function yakun(){
    tozala();
    const vaqt = Math.round((Date.now() - boshV) / 1000), foiz = Math.round(ball / royxat.length * 100);
    const ism = xotira.ol('ism', '') || 'O‘quvchi';
    const rek = xotira.ol('musobaqa', []); rek.push({ism, ball, n:royxat.length, vaqt, sana:new Date().toISOString()});
    rek.sort((a, b)=>b.ball / b.n - a.ball / a.n || a.vaqt - b.vaqt); xotira.yoz('musobaqa', rek.slice(0, 50));
    const orin = rek.findIndex(r=>r.ball === ball && r.n === royxat.length && r.vaqt === vaqt && r.ism === ism) + 1;
    /* musobaqada adashilgan savollar — «Xatolar ustida ishlash» ro‘yxatiga (app3.js xatoBank() shu kalitni ham o‘qiydi) */
    try{
      const mx = xotira.ol('musobaqaXato', []);
      royxat.forEach((x, j)=>{ if(!natija[j] && !mx.some(e=>e.id === x.id && e.k === x.k)) mx.push({id:x.id, k:x.k}); });
      xotira.yoz('musobaqaXato', mx.slice(-200));
    }catch(e){}
    ilova.innerHTML = `<div class="natija3"><section class="natija-hero">
      <div class="halqa" style="--p:${foiz}"><div><span><b>${ball}</b><small>/ ${royxat.length}</small></span></div></div>
      <h2>${foiz === 100 ? 'Mukammal!' : foiz >= 80 ? 'Zo‘r natija!' : foiz >= 50 ? 'Yaxshi — yana urinib ko‘ring.' : 'Mashq qiling va qaytib keling.'}</h2>
      <p>${vaqt} soniya · rekordlar jadvalida ${orin}-o‘rin</p>
      <div class="tugmalar"><a class="tg shisha" href="#/musobaqa">Yana o‘ynash</a><a class="tg oq" href="#/xatolar">Xatolar ustida ishlash</a></div>
    </section></div>`;
  }
  chiz();
}

window.MAKON_V319 = {takror, musobaqa, kartalarBazasi};
})();
