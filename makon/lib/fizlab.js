/* MAKON — virtual fizika laboratoriyasi (v3.14): Arximed kuchi, matematik mayatnik, issiqlik balansi; v3.17 Om qonuni; v3.19 linza.
   Umumiy 3D dvigatel (MAKON3D.sahna) ustida; ma'lumot — lib/fizlab_malumot.js.
   Usul: Bashorat qiling → Kuzating → Tushuntiring. Natija: localStorage makon:fizlab {top, bash}.
   Sinov API: window._fizlab. */
(function(){
'use strict';
const D = window.MAKON_FIZLAB_MALUMOT;
const son = (x, k)=>(Math.round(x * Math.pow(10, k)) / Math.pow(10, k)).toFixed(k).replace('.', ',').replace(/^-(0(,0+)?)$/, '$1');
const cheg = (x, a, b)=>Math.max(a, Math.min(b, x));
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KALIT = 'makon:fizlab';
const holatOl = ()=>{ try{ const s = JSON.parse(localStorage.getItem(KALIT) || '{}'); return {top:s.top || {}, bash:s.bash || {}}; }catch(e){ return {top:{}, bash:{}}; } };
const holatYoz = s=>{ try{ localStorage.setItem(KALIT, JSON.stringify(s)); }catch(e){} };

/* ---------- umumiy qobiq ---------- */
function och(idish, boshId){
  const xar = window._sahnalar; const eski = xar && xar.get(idish); if(eski) eski.yopish();
  idish.innerHTML = `<div class="fl">
    <div class="fl-tepa">
      <div class="fl-tablar" role="tablist">${D.TAJRIBA.map(t=>`<button role="tab" data-t="${t.id}"><b>${t.nom}</b><small>${t.sinf} · ${t.qisqa}</small><i class="fl-tb"></i></button>`).join('')}</div>
      <div class="fl-jami" title="Bajarilgan topshiriqlar"></div>
    </div>
    <div class="fl-asosiy">
      <div class="fl-sahna"><div class="fl-host"></div><div class="fl-korsat"></div><div class="fl-afsona"></div><div class="fl-xabar" role="status" aria-live="polite"></div></div>
      <aside class="fl-panel">
        <section class="fl-q fl-bosh"></section>
        <section class="fl-q fl-bash"></section>
        <section class="fl-q fl-top"></section>
        <section class="fl-q fl-formula"></section>
        <section class="fl-q fl-jadval"></section>
        <p class="fl-ogoh">Soddalashtirilgan virtual model: ishqalanish, sirt taranglik va idish issiqlik sig‘imi hisobga olinmaydi (alohida ko‘rsatilgandan tashqari). Qiymatlar darslik jadvallaridagi yaxlitlangan sonlar.</p>
      </aside>
    </div></div>`;
  const $ = s=>idish.querySelector(s);
  const holat = holatOl();
  let joriy = null, joriyId = null, yopildi = false, xabarT = 0;
  const qatorlar = {};   /* tajriba → o‘lchov qatorlari (seans davomida) */
  const ctx = {
    host:$('.fl-host'), korsat:$('.fl-korsat'), afsona:$('.fl-afsona'), bosh:$('.fl-bosh'), formula:$('.fl-formula'),
    son, cheg, esc, D, tezlik:1,
    xabar(m, tur){ const x = $('.fl-xabar'); x.innerHTML = m; x.className = 'fl-xabar kor ' + (tur || ''); clearTimeout(xabarT); xabarT = setTimeout(()=>x.classList.remove('kor'), 3800); },
    bajar(id){
      const t = tajriba() && tajriba().top.find(x=>x.id === id);
      if(!t || holat.top[id] || yopildi) return; holat.top[id] = 1; holatYoz(holat);
      ctx.xabar('✓ Topshiriq bajarildi: ' + t.matn.replace(/<[^>]+>/g, ''), 'ok');
      topChiz(); bashChiz(); jamiChiz(); hodisa({tur:'topshiriq', id});
    },
    bajarildi: id=>!!holat.top[id],
    jadval(ustunlar){ ctx._ust = ustunlar; jadvalChiz(); },
    qator(q){ (qatorlar[joriyId] = qatorlar[joriyId] || []).push(q); jadvalChiz(); return qatorlar[joriyId]; },
    qatorlar: ()=>qatorlar[joriyId] || []
  };
  const tinglovchi = [];
  function hodisa(h){ tinglovchi.forEach(f=>{ try{ f(h); }catch(e){} }); }
  ctx.hodisa = hodisa;
  const tajriba = ()=>D.TAJRIBA.find(t=>t.id === joriyId);

  function topChiz(){
    const t = tajriba();
    $('.fl-top').innerHTML = `<h4>Topshiriqlar <span>${t.top.filter(x=>holat.top[x.id]).length}/${t.top.length}</span></h4>` +
      t.top.map((x, i)=>`<div class="fl-t ${holat.top[x.id] ? 'ok' : ''}"><i>${holat.top[x.id] ? '✓' : i + 1}</i><span>${x.matn}</span></div>`).join('');
  }
  function jamiChiz(){
    const hamma = D.TAJRIBA.reduce((a, t)=>a + t.top.length, 0), bor = D.TAJRIBA.reduce((a, t)=>a + t.top.filter(x=>holat.top[x.id]).length, 0);
    $('.fl-jami').innerHTML = `<b>${bor}</b>/${hamma}<small>topshiriq</small>`;
    idish.querySelectorAll('.fl-tablar button').forEach(b=>{ const t = D.TAJRIBA.find(x=>x.id === b.dataset.t); const n = t.top.filter(x=>holat.top[x.id]).length; b.querySelector('.fl-tb').textContent = n + '/' + t.top.length; b.classList.toggle('tugadi', n === t.top.length); });
  }
  function bashChiz(){
    const bl = Object.keys(D.BASHORAT).filter(k=>tajriba().top.some(t=>t.id === D.BASHORAT[k].top));
    $('.fl-bash').innerHTML = bl.map(k=>{
      const b = D.BASHORAT[k], tan = holat.bash[k], ochiq = holat.top[b.top];
      if(tan === undefined && !ochiq) return `<div class="fl-b" data-b="${k}"><h4>Avval bashorat qiling</h4><p>${b.s}</p><div class="fl-bv">${b.v.map((v, i)=>`<button data-i="${i}">${v}</button>`).join('')}</div></div>`;
      if(!ochiq) return `<div class="fl-b kut"><h4>Bashoratingiz yozildi</h4><p>${b.s}</p><p class="fl-bj">Siz: <b>${b.v[tan]}</b>. Endi tajribada tekshiring — javob topshiriqdan keyin ochiladi.</p></div>`;
      const togri = tan === b.t;
      return `<div class="fl-b ${tan === undefined ? '' : togri ? 'togri' : 'xato'}"><h4>${tan === undefined ? 'Tajriba natijasi' : togri ? 'Bashoratingiz to‘g‘ri chiqdi' : 'Tajriba boshqacha ko‘rsatdi'}</h4><p>${b.s}</p><p class="fl-bj">${tan === undefined ? '' : 'Siz: <b>' + b.v[tan] + '</b> · '}To‘g‘ri: <b>${b.v[b.t]}</b></p><p class="fl-bi">${b.izoh}</p></div>`;
    }).join('');
    idish.querySelectorAll('.fl-b[data-b] button').forEach(bt=>bt.onclick = ()=>{ holat.bash[bt.closest('.fl-b').dataset.b] = +bt.dataset.i; holatYoz(holat); bashChiz(); });
  }
  function jadvalChiz(){
    const u = ctx._ust, q = ctx.qatorlar();
    if(!u){ $('.fl-jadval').innerHTML = ''; return; }
    $('.fl-jadval').innerHTML = `<h4>O‘lchovlar jadvali <span>${q.length}</span></h4>` + (q.length ? `<div class="fl-jq"><table><thead><tr><th>№</th>${u.map(x=>'<th>' + x[1] + '</th>').join('')}</tr></thead><tbody>${q.map((r, i)=>'<tr><td>' + (i + 1) + '</td>' + u.map(x=>'<td>' + (r[x[0]] === undefined ? '—' : r[x[0]]) + '</td>').join('') + '</tr>').join('')}</tbody></table></div>` : '<p class="fl-bo">Hali o‘lchov yo‘q. Tajribani o‘tkazib «O‘lchovni yozish»ni bosing.</p>');
    const jq = $('.fl-jq'); if(jq) jq.scrollTop = jq.scrollHeight;
  }
  function almash(id){
    if(!D.TAJRIBA.some(t=>t.id === id)) id = D.TAJRIBA[0].id;
    if(joriy){ joriy.yopish(); joriy = null; }
    joriyId = id; ctx._ust = null;
    ['host','korsat','afsona','bosh','formula'].forEach(k=>ctx[k].innerHTML = '');
    idish.querySelectorAll('.fl-tablar button').forEach(b=>{ const f = b.dataset.t === id; b.classList.toggle('faol', f); b.setAttribute('aria-selected', f); });
    joriy = TAJ[id](ctx);
    topChiz(); bashChiz(); jadvalChiz(); jamiChiz();
    try{ history.replaceState(null, '', '#/fizlab/' + id); }catch(e){}
  }
  idish.querySelectorAll('.fl-tablar button').forEach(b=>b.onclick = ()=>almash(b.dataset.t));
  const api = {
    get joriy(){ return joriy; }, get id(){ return joriyId; }, ctx, almash, holat,
    set tezlik(v){ ctx.tezlik = v; }, get tezlik(){ return ctx.tezlik; },
    tinglash(f){ tinglovchi.push(f); },
    zoomla(k){ if(joriy && joriy.S) joriy.S.zoomla(k); }, tikla(){ if(joriy && joriy.S) joriy.S.tikla(); }, qotir(){},
    yopish(){ if(yopildi) return; yopildi = true; if(joriy) joriy.yopish(); joriy = null; if(xar && xar.get(idish) === api) xar.delete(idish); if(window._fizlab === api) delete window._fizlab; idish.innerHTML = ''; }
  };
  if(xar) xar.set(idish, api);
  window._fizlab = api;
  almash(boshId);
  return api;
}

/* ---------- 3D yordamchilar ---------- */
function asos(ctx, o){
  const host = document.createElement('div'); host.className = 'fl-3d'; ctx.host.append(host);
  const S = MAKON3D.sahna(host, Object.assign({avto:false, fov:34, env:.6, ekspozitsiya:1.1}, o));
  const T = S.T;
  S.sc.add(new T.HemisphereLight(0xf3f6ff, 0x2a3040, .55));
  const dl = new T.DirectionalLight(0xffffff, .85); dl.position.set(3, 7, 5); S.sc.add(dl);
  const rang = h=>new T.Color(h).convertSRGBToLinear();
  const mat = (h, p)=>{ const m = new T.MeshStandardMaterial(Object.assign({color:rang(h), roughness:.5, metalness:0}, p || {})); m.userData.env = 1; m.envMapIntensity = .7; return m; };
  const quti = (w, h, d, m)=>new T.Mesh(T.RoundedBoxGeometry ? new T.RoundedBoxGeometry(w, h, d, 3, Math.min(w, h, d) * .12) : new T.BoxGeometry(w, h, d), m);
  const silindr = (r1, r2, h, m, s)=>new T.Mesh(new T.CylinderGeometry(r1, r2, h, s || 40), m);
  function stol(w, d){
    const st = quti(w, .26, d, mat('#3a4150', {roughness:.62})); st.position.y = -.13; S.g.add(st);
    const ust = new T.Mesh(new T.PlaneGeometry(w - .16, d - .16), mat('#48505f', {roughness:.8})); ust.rotation.x = -Math.PI / 2; ust.position.y = .002; S.g.add(ust);
  }
  function kuchStrelka(hex){
    /* qalin strelka: doim ko‘rinadi (chuqurlik tekshiruvisiz, suyuqlik ustidan chiziladi) */
    const m = new T.MeshBasicMaterial({color:rang(hex), depthTest:false, transparent:true, opacity:.95});
    const a = new T.Group(), dasta = new T.Mesh(new T.CylinderGeometry(.032, .032, 1, 12), m), uch = new T.Mesh(new T.ConeGeometry(.085, .2, 16), m);
    dasta.geometry.translate(0, .5, 0); dasta.renderOrder = uch.renderOrder = 30;
    a.add(dasta, uch); a.dasta = dasta; a.uch = uch; S.g.add(a); return a;
  }
  function strelka(a, x, y, z, yon, uzun){
    if(uzun < .04){ a.visible = false; return; }
    a.visible = true; a.position.set(x, y, z); a.rotation.z = yon > 0 ? 0 : Math.PI;
    const u = Math.max(.02, uzun - .2); a.dasta.scale.y = u; a.uch.position.y = u + .1;
  }
  return {S, T, rang, mat, quti, silindr, stol, kuchStrelka, strelka};
}
function tugmalar(ctx, nom, royxat, tanlangan, yangi){
  const q = document.createElement('div'); q.className = 'fl-ch';
  q.innerHTML = `<label>${nom}</label><div>${royxat.map(([k, m, x])=>`<button data-k="${k}" class="${k === tanlangan ? 'faol' : ''}" ${x ? 'title="' + esc(x) + '"' : ''}>${m}</button>`).join('')}</div>`;
  q.querySelectorAll('button').forEach(b=>b.onclick = ()=>{ q.querySelectorAll('button').forEach(x=>x.classList.toggle('faol', x === b)); yangi(b.dataset.k); });
  ctx.bosh.append(q); return q;
}
function slayder(ctx, nom, min, max, qadam, qiymat, fmt, yangi){
  const q = document.createElement('div'); q.className = 'fl-sl';
  q.innerHTML = `<label><span>${nom}</span><b></b></label><input type="range" min="${min}" max="${max}" step="${qadam}" value="${qiymat}" aria-label="${esc(nom)}">`;
  const inp = q.querySelector('input'), b = q.querySelector('b');
  const yoz = ()=>{ b.innerHTML = fmt(+inp.value); };
  inp.oninput = ()=>{ yoz(); yangi(+inp.value); }; yoz();
  ctx.bosh.append(q);
  q.qoy = v=>{ inp.value = v; yoz(); yangi(+inp.value); };
  return q;
}
function tugmaQator(ctx, royxat){
  const q = document.createElement('div'); q.className = 'fl-tg';
  royxat.forEach(([m, f, cls])=>{ const b = document.createElement('button'); b.className = 'tg kichik ' + (cls || 'o'); b.innerHTML = m; b.onclick = f; q.append(b); });
  ctx.bosh.append(q); return q;
}
function korsatQur(ctx, royxat){
  ctx.korsat.innerHTML = royxat.map(([k, nom])=>`<div data-k="${k}"><span>${nom}</span><b>—</b></div>`).join('');
  const el = {}; royxat.forEach(([k])=>el[k] = ctx.korsat.querySelector(`[data-k="${k}"] b`));
  const eski = {};
  return (k, v)=>{ if(eski[k] !== v){ eski[k] = v; el[k].innerHTML = v; } };
}

/* ================= 1. ARXIMED KUCHI ================= */
function arximed(ctx){
  const A = asos(ctx, {rx:-.16, ry:.42, rxMin:-.7, rxMax:.2, ryMin:-1, ryMax:1, zoom:1.02});
  const {S, T, rang, mat, quti, silindr} = A, g = S.g;
  const J = D.JISM, SU = D.SUYUQ, gg = D.g;
  const st = {jism:'temir', V:200, suyuq:'suv', tush:0, kesildi:false, yb:0, vy:0, tinch:0, natija:null};
  A.stol(7.4, 3.4);
  /* stakan (1 birlik = 10 sm) */
  const R = 1.1, H = 2.4, Rl = R * .965, AR = Math.PI * Rl * Rl, L0 = 1.2;
  const shisha = mat('#e6f2ff', {transparent:true, opacity:.16, roughness:.05, metalness:0, depthWrite:false, side:T.DoubleSide});
  const devor = silindr(R, R, H, shisha, 56); devor.geometry = new T.CylinderGeometry(R, R, H, 56, 1, true); devor.position.y = H / 2; g.add(devor);
  const tub = silindr(R, R, .06, mat('#e6f2ff', {transparent:true, opacity:.3, depthWrite:false}), 56); tub.position.y = .03; g.add(tub);
  const gardish = new T.Mesh(new T.TorusGeometry(R, .025, 8, 56), mat('#ffffff', {transparent:true, opacity:.5})); gardish.rotation.x = Math.PI / 2; gardish.position.y = H; g.add(gardish);
  for(let i = 1; i <= 8; i++){ const ch = quti(.18 + (i % 2) * .1, .012, .01, mat('#ffffff', {transparent:true, opacity:.55})); ch.position.set(-R * .72 + ((i % 2) * .05), i * .25, R * .69); ch.rotation.y = .8; g.add(ch); }
  const suyuqMat = mat('#5fb4ff', {transparent:true, opacity:.42, roughness:.12, depthWrite:false});
  const suyuq = silindr(Rl, Rl, 1, suyuqMat, 56); g.add(suyuq);
  const sirtMat = mat('#9fd4ff', {transparent:true, opacity:.35, roughness:.05, depthWrite:false, side:T.DoubleSide});
  const sirt = new T.Mesh(new T.CircleGeometry(Rl, 56), sirtMat); sirt.rotation.x = -Math.PI / 2; g.add(sirt);
  /* shtativ */
  const SX = -2.75;
  const taglik = quti(1.2, .12, 1.1, mat('#23272f', {metalness:.5, roughness:.4})); taglik.position.set(SX, .06, 0); g.add(taglik);
  const ustun = silindr(.055, .055, 6.4, mat('#c7ccd4', {metalness:.85, roughness:.25})); ustun.position.set(SX, 3.2, 0); g.add(ustun);
  const qol = new T.Group(); g.add(qol);
  const mufta = quti(.26, .26, .26, mat('#2d3340', {metalness:.6, roughness:.35})); mufta.position.x = SX; qol.add(mufta);
  const tirsak = silindr(.04, .04, -SX + .1, mat('#c7ccd4', {metalness:.85, roughness:.25})); tirsak.rotation.z = Math.PI / 2; tirsak.position.x = SX / 2 + .05; qol.add(tirsak);
  /* dinamometr */
  const DIN_H = 1.5;
  const dinQ = new T.Group(); qol.add(dinQ);
  const halqa = new T.Mesh(new T.TorusGeometry(.07, .015, 8, 20), mat('#c7ccd4', {metalness:.8, roughness:.3})); halqa.position.y = -.06; dinQ.add(halqa);
  const korpus = silindr(.17, .17, DIN_H, mat('#e9edf2', {transparent:true, opacity:.35, roughness:.1, depthWrite:false}), 32); korpus.position.y = -.15 - DIN_H / 2; dinQ.add(korpus);
  const qalpoq = silindr(.18, .18, .08, mat('#394155', {metalness:.4, roughness:.4}), 32); qalpoq.position.y = -.15; dinQ.add(qalpoq);
  const shkalaC = document.createElement('canvas'); shkalaC.width = 128; shkalaC.height = 512;
  const shkalaT = new T.CanvasTexture(shkalaC); shkalaT.encoding = T.sRGBEncoding; shkalaT.anisotropy = 4;
  const shkala = new T.Mesh(new T.PlaneGeometry(.2, DIN_H - .16), new T.MeshBasicMaterial({map:shkalaT, transparent:true})); shkala.position.set(0, -.15 - DIN_H / 2, .12); dinQ.add(shkala);
  const kors = quti(.26, .025, .03, mat('#ff4d4d', {emissive:rang('#ff2a2a'), emissiveIntensity:.5})); kors.position.z = .14; dinQ.add(kors);
  const prujina = new T.Mesh(new T.CylinderGeometry(.06, .06, 1, 12, 1, true), mat('#dfe3ea', {metalness:.9, roughness:.25, wireframe:true})); dinQ.add(prujina);
  const ilgak = silindr(.018, .018, .35, mat('#c7ccd4', {metalness:.85, roughness:.25}), 10); dinQ.add(ilgak);
  const IP = .55;
  const ip = silindr(.009, .009, 1, mat('#f3f0e6', {roughness:.9}), 6); ip.geometry.translate(0, -.5, 0); g.add(ip);
  /* jism */
  const jismMat = mat('#7d8591', {metalness:.7, roughness:.35});
  const jism = quti(1, 1, 1, jismMat); g.add(jism);
  const FW = A.kuchStrelka('#ff5a5a'), FA = A.kuchStrelka('#4aa8ff'), FT = A.kuchStrelka('#3ee08f');
  ctx.afsona.innerHTML = '<span><i style="background:#ff5a5a"></i>og‘irlik kuchi mg</span><span><i style="background:#4aa8ff"></i>Arximed kuchi F<sub>A</sub></span><span><i style="background:#3ee08f"></i>ip taranglik (dinamometr)</span>';
  let chegara = 0;
  function shkalaChiz(maks){
    const x = shkalaC.getContext('2d'); x.clearRect(0, 0, 128, 512);
    x.fillStyle = 'rgba(255,255,255,.92)'; x.fillRect(8, 0, 112, 512);
    x.strokeStyle = '#1b2230'; x.fillStyle = '#1b2230'; x.font = '600 26px Inter, sans-serif'; x.textAlign = 'right';
    const bo = maks <= 5 ? .5 : maks <= 10 ? 1 : maks <= 50 ? 5 : 10;
    for(let v = 0; v <= maks + 1e-9; v += bo / 5){
      const y = 20 + v / maks * 470, katta = Math.abs(v / bo - Math.round(v / bo)) < 1e-6;
      x.lineWidth = katta ? 3 : 1.5; x.beginPath(); x.moveTo(12, y); x.lineTo(katta ? 52 : 34, y); x.stroke();
      if(katta) x.fillText(String(Math.round(v * 10) / 10).replace('.', ','), 112, y + 9);
    }
    x.font = '700 22px Inter'; x.fillText('N', 112, 505);
    shkalaT.needsUpdate = true;
  }
  const qiymat = ()=>{
    const j = J[st.jism], s = Math.cbrt(st.V) / 10, Vm = st.V * 1e-6, m = j.rho * Vm, W = m * gg;
    return {j, s, Vm, m, W, rhoL:SU[st.suyuq].rho};
  };
  /* stakandagi sath: jism pastki qirrasi yb da bo‘lsa */
  function sath(yb, s){
    const p = s * s / AR;
    let L = (L0 - p * yb) / (1 - p);
    if(L - yb <= 0) L = L0; else if(L - yb >= s) L = L0 + s * s * s / AR;
    return L;
  }
  const botish = (yb, s)=>{ const L = sath(yb, s); return {L, f:cheg((L - yb) / s, 0, 1)}; };
  const osilganYb = (tush, s)=>{ const yuqori = L0 + s * s * s / AR + .45, past = .1; return yuqori + (past - yuqori) * tush; };
  function suzishYb(q){ /* F_A = W bo‘ladigan holat */
    if(q.j.rho >= q.rhoL) return -1;
    const f = q.j.rho / q.rhoL, L = L0 + f * q.s * q.s * q.s / AR; return L - f * q.s;
  }
  function korinishYangila(){
    const q = qiymat(), su = SU[st.suyuq];
    jism.scale.setScalar(q.s);
    jismMat.color.copy(rang(q.j.rang)); jismMat.metalness = q.j.metall ? .75 : 0; jismMat.roughness = q.j.metall ? .3 : .7;
    jismMat.transparent = !!q.j.shaffof; jismMat.opacity = q.j.shaffof ? .78 : 1;
    suyuqMat.color.copy(rang(su.rang)); suyuqMat.opacity = su.shaffof; suyuqMat.metalness = st.suyuq === 'simob' ? .9 : 0; suyuqMat.roughness = st.suyuq === 'simob' ? .15 : .12;
    sirtMat.color.copy(rang(su.rang)); sirtMat.opacity = st.suyuq === 'simob' ? .95 : .4;
    const maks = [5, 10, 50, 100, 200].find(v=>v >= q.W * 1.05) || 200;
    if(maks !== chegara){ chegara = maks; shkalaChiz(maks); }
  }
  function qaytaOsh(){ st.kesildi = false; st.vy = 0; st.tinch = 0; st.natija = null; st.yb = osilganYb(st.tush, qiymat().s); kesTg.innerHTML = '✂ Ipni kesish'; }
  const jismTg = tugmalar(ctx, 'Jism', Object.keys(J).map(k=>[k, J[k].nom, J[k].izoh ? J[k].nom + ': ' + J[k].rho + ' kg/m³ — ' + J[k].izoh : J[k].rho + ' kg/m³']), st.jism, k=>{ st.jism = k; qaytaOsh(); korinishYangila(); });
  slayder(ctx, 'Jism hajmi', 50, 500, 10, st.V, v=>v + ' sm³', v=>{ st.V = v; if(st.kesildi) qaytaOsh(); korinishYangila(); });
  tugmalar(ctx, 'Suyuqlik', Object.keys(SU).map(k=>[k, SU[k].nom + (SU[k].xavf ? ' ⚠' : ''), SU[k].nom + ': ' + SU[k].rho + ' kg/m³ — ' + SU[k].izoh]), st.suyuq, k=>{ st.suyuq = k; if(st.kesildi) qaytaOsh(); korinishYangila(); if(SU[k].xavf) ctx.xabar('⚠ Simob bug‘i zaharli — maktab laboratoriyasida ishlatilmaydi. Bu faqat virtual tajriba.', 'xavf'); });
  const tushSl = slayder(ctx, 'Jismni tushirish', 0, 100, 1, 0, v=>v + ' %', v=>{ st.tush = v / 100; if(st.kesildi) qaytaOsh(); });
  let kesTg;
  const tq = tugmaQator(ctx, [
    ['✂ Ipni kesish', ()=>{ if(st.kesildi) qaytaOsh(); else { st.kesildi = true; st.vy = 0; st.tinch = 0; st.natija = null; kesTg.innerHTML = '↺ Qayta osish'; ctx.xabar('Ip kesildi — jismga faqat og‘irlik va Arximed kuchi ta’sir qiladi.'); } }],
    ['＋ O‘lchovni yozish', ()=>yozish(), 'a']
  ]);
  kesTg = tq.children[0];
  const kor = korsatQur(ctx, [['m', 'Massa'], ['W', 'Havoda P₀ = mg'], ['din', 'Dinamometr P₁'], ['fa', 'Arximed kuchi F<sub>A</sub>'], ['bot', 'Botgan qism'], ['hol', 'Holat']]);
  ctx.jadval([['jism', 'Jism'], ['V', 'V, sm³'], ['suyuq', 'Suyuqlik'], ['bot', 'Botgan'], ['p0', 'P₀, N'], ['p1', 'P₁, N'], ['fa', 'F<sub>A</sub> = P₀ − P₁'], ['hisob', 'ρgV<sub>bot</sub>']]);
  const suzganlar = {};
  let oxirgi = null;
  function yozish(){
    const o = oxirgi; if(!o) return;
    if(st.kesildi && !st.natija){ ctx.xabar('Jism hali harakatda — to‘xtashini kuting yoki qayta osing.'); return; }
    const q = ctx.qator({jism:J[st.jism].nom, V:st.V, suyuq:SU[st.suyuq].nom, bot:Math.round(o.f * 100) + ' %', p0:son(o.W, 2), p1:st.kesildi ? '— (ip kesilgan)' : son(o.T, 2), fa:st.kesildi ? '—' : son(o.W - o.T, 2), hisob:son(o.FA, 2),
      _j:st.jism, _V:st.V, _s:st.suyuq, _f:o.f, _k:st.kesildi});
    const tola = r=>!r._k && r._f > .999;
    if(q.some(r=>tola(r) && r._j === 'temir' && r._s === 'suv')) ctx.bajar('a1');
    if(q.some(a=>tola(a) && a._s === 'suv' && a._j === 'temir' && q.some(b=>tola(b) && b._s === 'suv' && b._j === 'alyuminiy' && b._V === a._V))) ctx.bajar('a2');
    if(q.some(a=>tola(a) && a._s === 'kerosin' && q.some(b=>tola(b) && b._s === 'suv' && b._j === a._j && b._V === a._V))) ctx.bajar('a3');
    else if(q.some(a=>tola(a) && a._s === 'kerosin')) ctx.xabar('Solishtirish uchun shu jismni shu hajmda <b>suvga</b> ham to‘liq botirib yozing.');
  }
  function formulaYoz(o){
    const su = SU[st.suyuq];
    ctx.formula.innerHTML = `<h4>Formula</h4><div class="fl-f">F<sub>A</sub> = ρ<sub>suyuq</sub> · g · V<sub>bot</sub> = ${su.rho} · ${son(gg, 1)} · ${son(o.f * st.V, 0)}·10⁻⁶ = <b>${son(o.FA, 2)} N</b></div>
      <div class="fl-f">Suzish sharti: ρ<sub>jism</sub> ${J[st.jism].rho < su.rho ? '<' : '>'} ρ<sub>suyuq</sub> (${J[st.jism].rho} ${J[st.jism].rho < su.rho ? '<' : '>'} ${su.rho}) → <b>${J[st.jism].rho < su.rho ? 'suzadi' : 'cho‘kadi'}</b></div>
      <p class="fl-fi">g = ${son(gg, 1)} N/kg (darslikdagidek). Dinamometr P₁ = P₀ − F<sub>A</sub>.</p>`;
  }
  st.yb = osilganYb(0, qiymat().s);
  korinishYangila();
  S.joyla(3.9, new T.Vector3(-.75, 2.55, 0));
  let fKadr = 0;
  S.kadrda = (dt0)=>{
    const q = qiymat(), s = q.s;
    const n = Math.max(1, Math.round(4 * ctx.tezlik)), dt = dt0 * ctx.tezlik / n;
    let T_ = 0;
    for(let i = 0; i < n; i++){
      if(!st.kesildi){
        const hy = osilganYb(st.tush, s), fy = suzishYb(q);
        const maqsad = fy > hy ? fy : hy;
        st.yb += (maqsad - st.yb) * Math.min(1, dt * 7);
        st.vy = 0;
      } else if(!st.natija){
        const b = botish(st.yb, s), FAk = q.rhoL * gg * b.f * q.Vm;
        const a = ((FAk - q.W) / q.m) / .1 * .35 - st.vy * (b.f > 0 ? 3.2 : .15);   /* 0,35 — sekinlashtirilgan ko‘rsatish */
        st.vy += a * dt; st.yb += st.vy * dt;
        if(st.yb <= .065){ st.yb = .065; st.vy = 0; }
        st.tinch = Math.abs(st.vy) < .02 ? st.tinch + dt : 0;
        if(st.tinch > .8){
          st.natija = st.yb <= .07 ? 'tubida' : b.f < .999 ? 'suzdi' : 'muallaq';
          if(st.natija === 'suzdi'){
            ctx.xabar('Jism <b>suzib</b> qoldi: ' + Math.round(b.f * 100) + ' % qismi botgan (ρ<sub>jism</sub>/ρ<sub>suyuq</sub> = ' + son(q.j.rho / q.rhoL, 2) + ').', 'ok');
            if(st.suyuq === 'suv' || st.suyuq === 'dengiz'){ suzganlar[st.jism] = 1; if(Object.keys(suzganlar).length >= 2) ctx.bajar('a4'); else ctx.xabar('Suzadigan yana bitta boshqa jismni toping.'); }
            if(st.suyuq === 'simob' && st.jism === 'temir') ctx.bajar('a5');
          } else ctx.xabar('Jism <b>cho‘kdi</b>: uning zichligi suyuqlikdan katta.');
          ctx.hodisa({tur:'natija', natija:st.natija, jism:st.jism, suyuq:st.suyuq});
        }
      }
    }
    const b = botish(st.yb, s), FAk = q.rhoL * gg * b.f * q.Vm;
    T_ = st.kesildi ? 0 : Math.max(0, q.W - FAk);
    oxirgi = {W:q.W, T:T_, FA:FAk, f:b.f};
    /* sahnani joylash */
    jism.position.set(0, st.yb + s / 2, 0);
    suyuq.scale.y = b.L - .06; suyuq.position.y = .06 + (b.L - .06) / 2; sirt.position.y = b.L + .001;
    /* jism suzib qolsa, shtativ uni bosib tushmaydi — ip bo‘shaydi */
    const hy = osilganYb(st.tush, s), fy = suzishYb(q), armYb = fy > 0 ? Math.max(hy, fy - .3) : hy;
    const qolY = armYb + s + IP + .15 + .35 + DIN_H + .15;
    qol.position.y = qolY;
    dinQ.position.set(0, 0, 0);
    const ch = chegara || 10, choz = cheg(T_ / ch, 0, 1) * (DIN_H - .36);
    kors.position.y = -.15 - .1 - .08 - choz;
    prujina.scale.y = .08 + choz + .02; prujina.position.y = -.19 - prujina.scale.y / 2;
    ilgak.position.y = -.15 - DIN_H - .17;
    const ilgakY = qolY - .15 - DIN_H - .34;
    const tepa = st.yb + s;
    if(st.kesildi){ ip.visible = true; ip.position.set(0, ilgakY, 0); ip.scale.y = .25; }
    else { ip.visible = true; ip.position.set(0, ilgakY, 0); ip.scale.y = Math.max(.02, ilgakY - tepa); }
    const kShk = 1.35 / Math.max(q.W, q.rhoL * gg * q.Vm, .05);
    A.strelka(FW, .02, st.yb + s / 2, s / 2 + .08, -1, q.W * kShk);
    A.strelka(FA, -.02, st.yb + s * b.f / 2, s / 2 + .08, 1, FAk * kShk);
    A.strelka(FT, 0, tepa, 0, 1, T_ * kShk);
    if(++fKadr % 3) return;
    kor('m', son(q.m * 1000, 0) + ' g');
    kor('W', son(q.W, 2) + ' N');
    kor('din', st.kesildi ? '0 (ip kesilgan)' : son(T_, 2) + ' N');
    kor('fa', son(FAk, 2) + ' N');
    kor('bot', Math.round(b.f * 100) + ' %');
    kor('hol', st.kesildi ? (st.natija === 'suzdi' ? 'suzmoqda' : st.natija === 'tubida' ? 'tubida' : 'harakatda') : b.f <= 0 ? 'havoda' : b.f < .999 ? (suzishYb(q) > osilganYb(st.tush, s) ? 'suzmoqda (ip bo‘sh)' : 'qisman botgan') : 'to‘liq botgan');
    formulaYoz(oxirgi);
  };
  return {S, st, yopish(){ S.yopish(); },
    /* sinov */ tushir(v){ tushSl.qoy(v); }, jismTanla(k){ jismTg.querySelector(`[data-k="${k}"]`).click(); }, suyuqTanla(k){ ctx.bosh.querySelectorAll('.fl-ch')[1].querySelector(`[data-k="${k}"]`).click(); },
    kes(){ kesTg.click(); }, yoz(){ yozish(); }, get oxirgi(){ return oxirgi; }};
}

/* ================= 2. MATEMATIK MAYATNIK ================= */
function mayatnik(ctx){
  const A = asos(ctx, {rx:-.08, ry:.3, rxMin:-.45, rxMax:.2, ryMin:-.9, ryMax:.9, zoom:1.02});
  const {S, T, rang, mat, quti, silindr} = A, g = S.g, SY = D.SAYYORA;
  const st = {l:1, m:100, a0:10, say:'yer', havo:false, th:10 * Math.PI / 180, w:0, yur:false, olch:null, t:0, iz:[]};
  A.stol(6, 3);
  const PY = 4.75, K = 2;  /* 1 m = 2 birlik */
  const taglik = quti(1.3, .12, 1.2, mat('#23272f', {metalness:.5, roughness:.4})); taglik.position.set(-2.2, .06, 0); g.add(taglik);
  const ustun = silindr(.06, .06, 5.1, mat('#c7ccd4', {metalness:.85, roughness:.25})); ustun.position.set(-2.2, 2.55, 0); g.add(ustun);
  const toq = silindr(.05, .05, 2.5, mat('#c7ccd4', {metalness:.85, roughness:.25})); toq.rotation.z = Math.PI / 2; toq.position.set(-1.05, PY + .1, 0); g.add(toq);
  const osma = quti(.2, .16, .2, mat('#2d3340', {metalness:.6, roughness:.35})); osma.position.set(0, PY + .06, 0); g.add(osma);
  /* burchak o‘lchagich (transportir) */
  const tr = new T.Mesh(new T.RingGeometry(.95, 1.02, 64, 1, -Math.PI / 2 - 1.1, 2.2), new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.45, side:T.DoubleSide})); tr.position.set(0, PY, .02); g.add(tr);
  for(let d = -60; d <= 60; d += 10){ const r = d * Math.PI / 180, ch = quti(.012, d % 30 ? .06 : .12, .01, new T.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.6})); ch.position.set(Math.sin(r) * .93, PY - Math.cos(r) * .93, .02); ch.rotation.z = r; g.add(ch); }
  const vert = new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(0, PY, 0), new T.Vector3(0, PY - 4.3, 0)]), new T.LineDashedMaterial({color:0xffffff, dashSize:.1, gapSize:.08, transparent:true, opacity:.35})); vert.computeLineDistances(); g.add(vert);
  const ip = silindr(.012, .012, 1, mat('#f3f0e6', {roughness:.9}), 6); ip.geometry.translate(0, -.5, 0); ip.position.set(0, PY, 0); g.add(ip);
  const shar = new T.Mesh(new T.SphereGeometry(1, 40, 28), mat('#d9a441', {metalness:.85, roughness:.28})); g.add(shar);
  /* energiya va grafik */
  ctx.afsona.innerHTML = `<div class="fl-en"><div><span>E<sub>p</sub></span><i data-e="p"></i></div><div><span>E<sub>k</sub></span><i data-e="k"></i></div></div><canvas class="fl-graf" width="320" height="96" aria-label="Og‘ish burchagi grafigi"></canvas>`;
  const enP = ctx.afsona.querySelector('[data-e="p"]'), enK = ctx.afsona.querySelector('[data-e="k"]'), graf = ctx.afsona.querySelector('canvas'), gx = graf.getContext('2d');
  const gv = ()=>SY[st.say].g;
  const Tf = ()=>2 * Math.PI * Math.sqrt(st.l / gv());
  function tinch(){ st.yur = false; st.olch = null; st.th = st.a0 * Math.PI / 180; st.w = 0; st.iz = []; }
  slayder(ctx, 'Ip uzunligi l', .2, 2, .05, st.l, v=>son(v, 2) + ' m', v=>{ st.l = v; tinch(); });
  slayder(ctx, 'Sharcha massasi m', 50, 500, 10, st.m, v=>v + ' g', v=>{ st.m = v; tinch(); });
  slayder(ctx, 'Boshlang‘ich og‘ish', 5, 60, 1, st.a0, v=>v + '°', v=>{ st.a0 = v; tinch(); });
  tugmalar(ctx, 'Qayerda', Object.keys(SY).map(k=>[k, SY[k].nom, 'g = ' + son(SY[k].g, 2) + ' m/s²']), st.say, k=>{ st.say = k; tinch(); });
  const havoQ = tugmalar(ctx, 'Havo qarshiligi', [['yoq', 'Yo‘q (ideal)'], ['bor', 'Bor — so‘nuvchi tebranish']], 'yoq', k=>{ st.havo = k === 'bor'; });
  const tq = tugmaQator(ctx, [
    ['▶ Qo‘yib yuborish', ()=>{ tinch(); st.yur = true; }],
    ['⏱ 10 tebranishni o‘lchash', ()=>{ tinch(); st.yur = true; st.olch = {t:0, n:0, oldW:0}; ctx.xabar('Sekundomer ishga tushdi — 10 ta to‘liq tebranish sanaladi.'); }, 'a'],
    ['■ To‘xtatish', ()=>tinch()]
  ]);
  const kor = korsatQur(ctx, [['sek', 'Sekundomer'], ['n', 'Tebranishlar'], ['To', 'T o‘lchangan'], ['Tf', 'T = 2π√(l/g)'], ['th', 'Og‘ish burchagi']]);
  ctx.jadval([['l', 'l, m'], ['m', 'm, g'], ['a0', 'θ₀'], ['say', 'Qayerda'], ['t10', 't (10 ta), s'], ['To', 'T = t/10, s'], ['Tf', '2π√(l/g), s'], ['farq', 'Farq']]);
  function formula(){
    ctx.formula.innerHTML = `<h4>Formula</h4><div class="fl-f">T = 2π·√(l / g) = 2π·√(${son(st.l, 2)} / ${son(gv(), 2)}) = <b>${son(Tf(), 3)} s</b></div>
      <p class="fl-fi">Formula kichik og‘ishlar (≈ 15° gacha) uchun aniq. Katta burchakda haqiqiy davr biroz uzunroq — tajribada ko‘ring. Massa formulada yo‘q.</p>`;
  }
  formula();
  function tugadi(t10){
    const To = t10 / 10, farq = (To - Tf()) / Tf() * 100;
    const q = ctx.qator({l:son(st.l, 2), m:st.m, a0:st.a0 + '°', say:SY[st.say].nom, t10:son(t10, 2), To:son(To, 3), Tf:son(Tf(), 3), farq:(farq >= 0 ? '+' : '') + son(farq, 1) + ' %', _l:st.l, _m:st.m, _a:st.a0, _s:st.say, _T:To});
    ctx.xabar(`10 ta tebranish: <b>${son(t10, 2)} s</b> → T = <b>${son(To, 3)} s</b> (formula: ${son(Tf(), 3)} s).`, 'ok');
    ctx.hodisa({tur:'davr', T:To, l:st.l, m:st.m, say:st.say});
    if(q.some(r=>Math.abs(r._l - 1) < 1e-6 && r._s === 'yer')) ctx.bajar('m1');
    if(q.some(a=>q.some(b=>a !== b && a._l === b._l && a._s === b._s && a._a === b._a && Math.max(a._m, b._m) / Math.min(a._m, b._m) >= 2))) ctx.bajar('m2');
    if(q.some(a=>q.some(b=>a._s === b._s && a._a === b._a && a._m === b._m && Math.abs(b._l / a._l - 4) < .05))) ctx.bajar('m3');
    if(q.some(r=>r._s === 'oy')) ctx.bajar('m4');
    if(q.some(r=>r._a > 45)) ctx.bajar('m5');
    st.olch = null;
  }
  S.joyla(3.3, new T.Vector3(-.5, 2.75, 0));
  let fKadr = 0;
  function hosila(th, w){ return [w, -gv() / st.l * Math.sin(th) - (st.havo ? .12 : 0) * w]; }
  S.kadrda = (dt0)=>{
    const L = st.l * K, r = .11 * Math.cbrt(st.m / 50) + .02;
    if(st.yur){
      const n = Math.max(8, Math.round(16 * ctx.tezlik)), h = dt0 * ctx.tezlik / n;
      for(let i = 0; i < n; i++){
        const [k1a, k1b] = hosila(st.th, st.w), [k2a, k2b] = hosila(st.th + h / 2 * k1a, st.w + h / 2 * k1b), [k3a, k3b] = hosila(st.th + h / 2 * k2a, st.w + h / 2 * k2b), [k4a, k4b] = hosila(st.th + h * k3a, st.w + h * k3b);
        const eskiW = st.w;
        st.th += h / 6 * (k1a + 2 * k2a + 2 * k3a + k4a); st.w += h / 6 * (k1b + 2 * k2b + 2 * k3b + k4b);
        st.t += h;
        if(st.olch){
          st.olch.t += h;
          if(eskiW > 0 && st.w <= 0){ st.olch.n++; if(st.olch.n >= 10){ const tt = st.olch.t - h * st.w / (st.w - eskiW); tugadi(tt); } }
        }
      }
      st.iz.push([st.t, st.th]); while(st.iz.length && st.t - st.iz[0][0] > 8) st.iz.shift();
    }
    ip.scale.y = L; ip.rotation.z = st.th;
    shar.scale.setScalar(r); shar.position.set(Math.sin(st.th) * (L + r), PY - Math.cos(st.th) * (L + r), 0);
    if(++fKadr % 3) return;
    const Ep = (1 - Math.cos(st.th)) , Ek = (st.w * st.w) * st.l / (2 * gv()), E = Math.max(1e-9, 1 - Math.cos(st.a0 * Math.PI / 180));
    enP.style.width = cheg(Ep / E * 100, 0, 100) + '%'; enK.style.width = cheg(Ek / E * 100, 0, 100) + '%';
    kor('sek', st.olch ? son(st.olch.t, 2) + ' s' : '—');
    kor('n', st.olch ? st.olch.n + ' / 10' : '—');
    const oxir = ctx.qatorlar().slice(-1)[0];
    kor('To', oxir ? oxir.To + ' s' : '—');
    kor('Tf', son(Tf(), 3) + ' s');
    kor('th', son(st.th * 180 / Math.PI, 1) + '°');
    formula();
    gx.clearRect(0, 0, 320, 96); gx.strokeStyle = 'rgba(255,255,255,.14)'; gx.beginPath(); gx.moveTo(0, 48); gx.lineTo(320, 48); gx.stroke();
    if(st.iz.length > 1){ const t0 = st.t - 8, mx = Math.max(st.a0, 5) * Math.PI / 180; gx.strokeStyle = '#8b7bff'; gx.lineWidth = 2; gx.beginPath(); st.iz.forEach(([t, th], i)=>{ const x = (t - t0) / 8 * 320, y = 48 - th / mx * 42; i ? gx.lineTo(x, y) : gx.moveTo(x, y); }); gx.stroke(); }
  };
  tinch();
  return {S, st, yopish(){ S.yopish(); }, tq, olchash(){ tq.children[1].click(); }};
}

/* ================= 3. ISSIQLIK BALANSI (kalorimetr) ================= */
function kalor(ctx){
  const IS = D.ISSIQ;
  const st = {rejim:'suv', metall:'temir', m1:100, t1:80, m2:100, t2:20, yoqot:false, bash:null, aral:false, vaqt:0, iz:[]};
  const q = document.createElement('div'); q.className = 'fl-kal'; ctx.host.append(q);
  q.innerHTML = `<svg viewBox="0 0 800 430" class="fl-kal-svg" role="img" aria-label="Kalorimetr tajribasi">
    <defs><linearGradient id="klIs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff8a5c"/><stop offset="1" stop-color="#d9442b"/></linearGradient>
    <linearGradient id="klSov" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7cc4ff"/><stop offset="1" stop-color="#2f7fd6"/></linearGradient>
    <linearGradient id="klMet" x1="0" x2="1"><stop offset="0" stop-color="#8e97a5"/><stop offset=".5" stop-color="#dfe4ea"/><stop offset="1" stop-color="#7a828f"/></linearGradient></defs>
    <rect x="0" y="392" width="800" height="38" rx="8" fill="#3a4150"/>
    <g class="kl-chap"><path d="M110 190 h150 v190 a12 12 0 0 1 -12 12 h-126 a12 12 0 0 1 -12 -12z" fill="rgba(230,242,255,.08)" stroke="rgba(230,242,255,.5)" stroke-width="3"/>
      <rect class="kl-is" x="113" y="250" width="144" height="139" rx="8" fill="url(#klIs)" opacity=".85"/>
      <rect class="kl-met" x="150" y="265" width="70" height="110" rx="10" fill="url(#klMet)" stroke="#5c6470" stroke-width="2"/>
      <text x="185" y="175" class="kl-yoz" text-anchor="middle">1-jism (issiq)</text></g>
    <g class="kl-ong"><path d="M470 150 h230 v230 a14 14 0 0 1 -14 14 h-202 a14 14 0 0 1 -14 -14z" fill="rgba(230,242,255,.05)" stroke="rgba(230,242,255,.35)" stroke-width="3"/>
      <path d="M490 170 h190 v200 a10 10 0 0 1 -10 10 h-170 a10 10 0 0 1 -10 -10z" fill="rgba(230,242,255,.06)" stroke="rgba(230,242,255,.55)" stroke-width="3"/>
      <rect class="kl-sov" x="493" y="260" width="184" height="117" rx="8" fill="#2f7fd6" opacity=".85"/>
      <rect class="kl-met2" x="545" y="290" width="80" height="84" rx="8" fill="url(#klMet)" stroke="#5c6470" stroke-width="2" style="display:none"/>
      <text x="585" y="135" class="kl-yoz" text-anchor="middle">Kalorimetr (2-jism: sovuq suv)</text></g>
    <g class="kl-term" transform="translate(300,120)"><rect x="-9" y="0" width="18" height="250" rx="9" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.5)"/><circle cx="0" cy="262" r="16" fill="#e5484d"/><rect class="kl-tu1" x="-4" y="40" width="8" height="220" fill="#e5484d"/><text class="kl-tt1" x="0" y="-10" text-anchor="middle">—</text></g>
    <g class="kl-term" transform="translate(740,120)"><rect x="-9" y="0" width="18" height="250" rx="9" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.5)"/><circle cx="0" cy="262" r="16" fill="#e5484d"/><rect class="kl-tu2" x="-4" y="40" width="8" height="220" fill="#e5484d"/><text class="kl-tt2" x="0" y="-10" text-anchor="middle">—</text></g>
  </svg><canvas class="fl-kal-graf" width="760" height="150" aria-label="Harorat–vaqt grafigi"></canvas>`;
  const $ = s=>q.querySelector(s);
  const graf = $('.fl-kal-graf'), gx = graf.getContext('2d');
  const c1 = ()=>st.rejim === 'suv' ? IS.suv.c : IS[st.metall].c, c2 = IS.suv.c;
  const kf = ()=>st.yoqot ? .9 : 1;
  const theta = ()=>(kf() * c1() * st.m1 * st.t1 + c2 * st.m2 * st.t2) / (kf() * c1() * st.m1 + c2 * st.m2);
  const tMaks = ()=>st.rejim === 'suv' ? 90 : 100;
  const qaytadan = ()=>{ st.aral = false; st.vaqt = 0; st.iz = []; st.bash = null; const bi = ctx.bosh.querySelector('#flBash'); if(bi) bi.value = ''; $('.kl-chap').style.transform = ''; chiz(); };
  tugmalar(ctx, 'Rejim', [['suv', 'Suv + suv'], ['metall', 'Metall + suv']], st.rejim, k=>{ st.rejim = k; metQ.style.display = k === 'metall' ? '' : 'none'; if(st.t1 > tMaks()) t1S.qoy(tMaks()); qaytadan(); });
  const metQ = tugmalar(ctx, 'Metall', ['temir', 'alyuminiy', 'mis', 'qorgoshin'].map(k=>[k, IS[k].nom, 'c = ' + IS[k].c + ' J/(kg·°C) — ' + IS[k].izoh]), st.metall, k=>{ st.metall = k; qaytadan(); });
  metQ.style.display = 'none';
  slayder(ctx, '1-jism massasi m₁', 20, 500, 10, st.m1, v=>v + ' g', v=>{ st.m1 = v; qaytadan(); });
  const t1S = slayder(ctx, '1-jism harorati t₁', 40, 100, 1, st.t1, v=>v + ' °C', v=>{ if(v > tMaks()){ t1S.qoy(tMaks()); return; } st.t1 = v; qaytadan(); });
  slayder(ctx, 'Sovuq suv massasi m₂', 50, 500, 10, st.m2, v=>v + ' g', v=>{ st.m2 = v; qaytadan(); });
  slayder(ctx, 'Sovuq suv harorati t₂', 5, 30, 1, st.t2, v=>v + ' °C', v=>{ st.t2 = v; qaytadan(); });
  tugmalar(ctx, 'Idish', [['ideal', 'Ideal kalorimetr'], ['real', 'Issiqlik yo‘qotiladi (~10 %)']], 'ideal', k=>{ st.yoqot = k === 'real'; qaytadan(); });
  const bq = document.createElement('div'); bq.className = 'fl-bh';
  bq.innerHTML = '<label for="flBash">Aralashtirishdan oldin θ ni hisoblang</label><div><input id="flBash" type="number" step="0.1" inputmode="decimal" placeholder="°C"><button class="tg o kichik">Yozish</button></div>';
  ctx.bosh.append(bq);
  bq.querySelector('button').onclick = ()=>{ const v = parseFloat(bq.querySelector('input').value.replace(',', '.')); if(!isFinite(v)){ ctx.xabar('Son kiriting, masalan 35'); return; } st.bash = v; ctx.xabar('Hisobingiz yozildi: <b>' + son(v, 1) + ' °C</b>. Endi aralashtiring.'); };
  const tq = tugmaQator(ctx, [['⇄ Aralashtirish', ()=>aralash(), 'a'], ['↺ Qaytadan', ()=>qaytadan()]]);
  const kor = korsatQur(ctx, [['t1', 't₁ (issiq)'], ['t2', 't₂ (sovuq suv)'], ['th', 'Muvozanat θ'], ['Q1', 'Berilgan Q₁'], ['Q2', 'Olingan Q₂']]);
  ctx.jadval([['rejim', 'Rejim'], ['m1', 'm₁, g'], ['t1', 't₁, °C'], ['m2', 'm₂, g'], ['t2', 't₂, °C'], ['th', 'θ, °C'], ['bash', 'Hisobingiz']]);
  function aralash(){
    if(st.aral){ ctx.xabar('Avval «Qaytadan»ni bosing.'); return; }
    st.aral = true; st.vaqt = 0; st.iz = [];
    $('.kl-chap').style.transform = 'translate(395px,-10px) scale(.78)';
    const th = theta();
    const r = ctx.qator({rejim:st.rejim === 'suv' ? 'suv + suv' : IS[st.metall].nom + ' + suv', m1:st.m1, t1:st.t1, m2:st.m2, t2:st.t2, th:son(th, 1), bash:st.bash === null ? '—' : son(st.bash, 1),
      _r:st.rejim, _m1:st.m1, _t1:st.t1, _m2:st.m2, _t2:st.t2, _th:th, _b:st.bash, _y:st.yoqot});
    clearTimeout(tekT); tekT = setTimeout(()=>{
      if(yop) return;
      if(r.some(x=>x._r === 'suv' && !x._y && x._m1 === 100 && x._t1 === 80 && x._m2 === 100 && x._t2 === 20)) ctx.bajar('k1');
      if(r.some(x=>x._r === 'suv' && Math.max(x._m1, x._m2) / Math.min(x._m1, x._m2) >= 2)) ctx.bajar('k2');
      if(r.some(x=>x._r === 'metall')) ctx.bajar('k3');
      const s = r[r.length - 1];
      if(s._b !== null){ if(Math.abs(s._b - s._th) <= 1) ctx.bajar('k4'); else ctx.xabar(`Hisobingiz ${son(s._b, 1)} °C, tajriba ${son(s._th, 1)} °C. Formulani qayta tekshiring.`, 'xavf'); }
      ctx.hodisa({tur:'aralash', theta:th});
    }, 50);
    st.bash = null; bq.querySelector('input').value = '';
  }
  function chiz(){
    const th = theta(), tau = 1.6;
    const k = st.aral ? Math.exp(-st.vaqt / tau) : 1;
    const T1 = th + (st.t1 - th) * k, T2 = th + (st.t2 - th) * k;
    $('.kl-is').style.display = st.rejim === 'suv' ? '' : 'none';
    $('.kl-met').style.display = st.rejim === 'metall' ? '' : 'none';
    $('.kl-chap text').textContent = st.rejim === 'suv' ? 'Issiq suv: ' + st.m1 + ' g' : IS[st.metall].nom + ': ' + st.m1 + ' g (qaynoq suvda isitilgan)';
    $('.kl-is').setAttribute('y', 389 - cheg(st.m1 / 500, .08, 1) * 139); $('.kl-is').setAttribute('height', cheg(st.m1 / 500, .08, 1) * 139);
    /* aralashtirilganda: issiq idish kalorimetrga quyilib yo‘qoladi, suv hajmi va rangi o‘zgaradi */
    const p = st.aral ? cheg(st.vaqt / 1.2, 0, 1) : 0;
    $('.kl-chap').style.opacity = 1 - p;
    const mSuv = st.m2 + (st.rejim === 'suv' ? st.m1 * p : 0);
    const h2 = cheg(mSuv / 700, .1, 1) * 205; $('.kl-sov').setAttribute('y', 377 - h2); $('.kl-sov').setAttribute('height', h2);
    const rt = cheg((T2 - 10) / 80, 0, 1), ar = (a, b)=>Math.round(a + (b - a) * rt);
    $('.kl-sov').setAttribute('fill', `rgb(${ar(47, 217)},${ar(127, 68)},${ar(214, 43)})`);
    $('.kl-met2').style.display = st.rejim === 'metall' && p > .5 ? '' : 'none';
    const tu = (el, t, tx)=>{ const h = cheg(t / 100, 0, 1) * 220; el.setAttribute('y', 260 - h); el.setAttribute('height', h); tx.textContent = son(t, 1) + ' °C'; };
    tu($('.kl-tu1'), T1, $('.kl-tt1')); tu($('.kl-tu2'), T2, $('.kl-tt2'));
    kor('t1', son(T1, 1) + ' °C'); kor('t2', son(T2, 1) + ' °C'); kor('th', st.aral ? son(th, 1) + ' °C' : '?');
    const Q1 = c1() * st.m1 / 1000 * (st.t1 - th), Q2 = c2 * st.m2 / 1000 * (th - st.t2);
    kor('Q1', st.aral ? son(Q1, 0) + ' J' : '—'); kor('Q2', st.aral ? son(Q2, 0) + ' J' + (st.yoqot ? ' (' + son(Q1 - Q2, 0) + ' J atrofga)' : '') : '—');
    ctx.formula.innerHTML = `<h4>Formula</h4><div class="fl-f">Q<sub>berildi</sub> = c₁m₁(t₁ − θ), Q<sub>olindi</sub> = c₂m₂(θ − t₂)${st.yoqot ? ', Q<sub>olindi</sub> = 0,9·Q<sub>berildi</sub>' : ' = Q<sub>berildi</sub>'}</div>
      <div class="fl-f">θ = ${st.yoqot ? '(0,9·' : '('}c₁m₁t₁ + c₂m₂t₂) / (${st.yoqot ? '0,9·' : ''}c₁m₁ + c₂m₂)${st.aral ? ' = <b>' + son(th, 1) + ' °C</b>' : ''}</div>
      <p class="fl-fi">c₁ = ${c1()} J/(kg·°C) (${st.rejim === 'suv' ? 'suv' : IS[st.metall].nom.toLowerCase()}), c₂ = ${c2} J/(kg·°C) (suv). ${st.yoqot ? 'Real idishda berilgan issiqlikning ~10 % i atrofga ketadi (sxematik qiymat).' : 'Ideal kalorimetr: issiqlik atrofga ketmaydi, idishning o‘zi isimaydi.'} Grafikdagi tezlik sxematik.</p>`;
    /* grafik */
    gx.clearRect(0, 0, 760, 150);
    gx.fillStyle = 'rgba(255,255,255,.5)'; gx.font = '12px Inter'; gx.fillText('°C', 36, 12); gx.fillText('vaqt →', 700, 144);
    gx.strokeStyle = 'rgba(255,255,255,.1)'; for(let t = 0; t <= 100; t += 20){ const y = 140 - t / 100 * 128; gx.beginPath(); gx.moveTo(30, y); gx.lineTo(760, y); gx.stroke(); gx.fillText(t, 6, y + 4); }
    if(st.iz.length > 1){
      [['#ff6b4a', 1], ['#4aa8ff', 2]].forEach(([r, i])=>{ gx.strokeStyle = r; gx.lineWidth = 2.5; gx.beginPath(); st.iz.forEach((p, j)=>{ const x = 30 + p[0] / 10 * 720, y = 140 - p[i] / 100 * 128; j ? gx.lineTo(x, y) : gx.moveTo(x, y); }); gx.stroke(); });
      gx.setLineDash([5, 5]); gx.strokeStyle = 'rgba(255,255,255,.55)'; const y = 140 - th / 100 * 128; gx.beginPath(); gx.moveTo(30, y); gx.lineTo(760, y); gx.stroke(); gx.setLineDash([]);
      gx.fillStyle = '#fff'; gx.fillText('θ = ' + son(th, 1) + ' °C', 680, y - 6);
    }
    return [T1, T2];
  }
  let kadr = 0, oldin = performance.now(), yop = false, tekT = 0;
  function tik(t){
    if(yop) return; kadr = requestAnimationFrame(tik);
    const dt = Math.min(.1, (t - oldin) / 1000) * ctx.tezlik; oldin = t;
    if(st.aral && st.vaqt < 10){ st.vaqt += dt; const [a, b] = chiz(); st.iz.push([st.vaqt, a, b]); }
  }
  chiz(); kadr = requestAnimationFrame(tik);
  return {st, yopish(){ yop = true; clearTimeout(tekT); cancelAnimationFrame(kadr); q.remove(); }, aralash, theta, bashorat(v){ bq.querySelector('input').value = v; bq.querySelector('button').click(); }};
}

/* ================= 4. OM QONUNI (elektr zanjiri) ================= */
function om(ctx){
  const CH = D.OM_CHEGARA, RZ = D.REZISTOR, HR = D.HALQA_RANG, RL = Object.keys(RZ).map(Number);
  const st = {U:4.5, R1:10, R2:20, ulash:'bir', volt:'r1', kalit:false, aI:0, aV:0, oqim:{}, ogoh:{}};
  const q = document.createElement('div'); q.className = 'fl-kal fl-om'; ctx.host.append(q);
  ctx.korsat.classList.add('om3'); ctx.afsona.classList.add('om3');
  q.innerHTML = `<svg viewBox="0 0 900 440" class="fl-kal-svg om-svg" role="img" aria-label="Om qonuni: elektr zanjiri sxemasi">
    <defs><linearGradient id="omMan" x1="0" x2="1"><stop offset="0" stop-color="#2a3142"/><stop offset=".5" stop-color="#3a4358"/><stop offset="1" stop-color="#262c3b"/></linearGradient>
    <radialGradient id="omIssiq"><stop offset="0" stop-color="#ff7a2a" stop-opacity=".85"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient></defs>
    <g class="om-sim"></g><g class="om-oq"></g><g class="om-qism"></g><g class="om-asbob"></g></svg>
    <canvas class="fl-kal-graf om-graf" width="760" height="150" aria-label="Tok kuchining kuchlanishga bog‘liqlik grafigi I(U)"></canvas>`;
  const $ = s=>q.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const el = (ota, tag, at, matn)=>{ const e = document.createElementNS(NS, tag); for(const k in at) e.setAttribute(k, at[k]); if(matn !== undefined) e.textContent = matn; ota.append(e); return e; };
  const X0 = 90, XR = 640, YT = 90, YB = 300, ZA = 300, ZB = 600, KA = 180, KB = 250, AX = 400;
  const Rnom = r=>son(r, r % 1 ? 1 : 0).replace(',0', '') + ' Ω';
  function hisob(){
    const {R1, R2, U} = st, k = st.kalit;
    const R = st.ulash === 'bir' ? R1 : st.ulash === 'ketma' ? R1 + R2 : R1 * R2 / (R1 + R2);
    const I = k ? U / R : 0;
    let I1 = I, I2 = 0, U1 = I * R1, U2 = 0;
    if(st.ulash === 'ketma'){ I2 = I; U2 = I * R2; }
    if(st.ulash === 'parallel'){ I1 = k ? U / R1 : 0; I2 = k ? U / R2 : 0; U1 = U2 = k ? U : 0; }
    const V = st.volt === 'r1' ? U1 : st.volt === 'r2' ? U2 : I * R;
    const Iel = st.volt === 'r1' ? I1 : st.volt === 'r2' ? I2 : I;   /* voltmetr ulangan qismdagi tok */
    return {R, I, I1, I2, U1, U2, V, Iel, P1:I1 * I1 * R1, P2:I2 * I2 * R2};
  }
  /* sim yo‘llari — shartli tok yo‘nalishida (+ dan −ga); elektron nuqtalari teskari yuradi */
  function yollar(){
    const y = [{d:`M${X0} 145 V${YT} H${KA}`, k:'I'}, {d:`M${KB} ${YT} H${XR} V${YB} H${ZB}`, k:'I'}];
    if(st.ulash === 'parallel') y.push({d:`M${ZB} ${YB} V270 H${ZA} V${YB}`, k:'I1'}, {d:`M${ZB} ${YB} V340 H${ZA} V${YB}`, k:'I2'});
    else y.push({d:`M${ZB} ${YB} H${ZA}`, k:'I'});
    y.push({d:`M${ZA} ${YB} H${X0} V245`, k:'I'});
    return y;
  }
  const rezJoy = ()=>st.ulash === 'bir' ? [['R₁', st.R1, 450, YB]] : st.ulash === 'ketma' ? [['R₁', st.R1, 380, YB], ['R₂', st.R2, 520, YB]] : [['R₁', st.R1, 450, 270], ['R₂', st.R2, 450, 340]];
  function voltJoy(){
    if(st.ulash === 'parallel' || st.volt === 'hammasi') return st.ulash === 'bir' ? [410, 490, YB] : st.ulash === 'ketma' ? [340, 560, YB] : [ZA, ZB, YB];
    const r = rezJoy()[st.volt === 'r2' ? 1 : 0]; return [r[2] - 40, r[2] + 40, r[3]];
  }
  let oqimEl = [], rezEl = [], kalitEl = null, strA = null, strV = null, yoyA = null, sonA = null;
  function qur(){
    const sim = $('.om-sim'), oq = $('.om-oq'), qs = $('.om-qism'); sim.innerHTML = oq.innerHTML = qs.innerHTML = '';
    yollar().forEach(y=>el(sim, 'path', {d:y.d, class:'om-w'}));
    oqimEl = yollar().map(y=>{ const p = el(oq, 'path', {d:y.d, class:'om-e'}); p.dataset.k = y.k; return p; });
    /* voltmetr simlari (ideal voltmetr — tok o‘tmaydi) */
    const [va, vb, vy] = voltJoy(), vx = (va + vb) / 2;
    el(sim, 'path', {d:`M${va} ${vy} V395 H${vx - 22} M${vb} ${vy} V395 H${vx + 22}`, class:'om-wv'});
    [va, vb].forEach(x=>el(sim, 'circle', {cx:x, cy:vy, r:4.5, class:'om-tugun'}));
    if(st.ulash === 'parallel') [ZA, ZB].forEach(x=>el(sim, 'circle', {cx:x, cy:YB, r:5, class:'om-tugun'}));
    /* manba */
    el(qs, 'rect', {x:48, y:145, width:84, height:100, rx:12, fill:'url(#omMan)', stroke:'rgba(255,255,255,.35)', 'stroke-width':2});
    el(qs, 'circle', {cx:X0, cy:145, r:7, fill:'#e5484d'}); el(qs, 'circle', {cx:X0, cy:245, r:7, fill:'#2f3a4f', stroke:'#9aa4b5', 'stroke-width':2});
    el(qs, 'text', {x:112, y:170, class:'om-qut'}, '+'); el(qs, 'text', {x:112, y:236, class:'om-qut'}, '−');
    el(qs, 'text', {x:X0, y:203, class:'om-manU', 'text-anchor':'middle'}, son(st.U, 1) + ' V');
    el(qs, 'text', {x:X0 - 10, y:272, class:'om-yoz', 'text-anchor':'end'}, 'Tok manbai');
    /* kalit */
    kalitEl = el(qs, 'g', {class:'om-kalit', tabindex:0, role:'button', 'aria-label':'Kalit: ulash yoki uzish'});
    el(kalitEl, 'rect', {x:KA - 14, y:YT - 44, width:KB - KA + 28, height:62, fill:'transparent'});
    el(kalitEl, 'circle', {cx:KA, cy:YT, r:6, class:'om-kont'}); el(kalitEl, 'circle', {cx:KB, cy:YT, r:6, class:'om-kont'});
    el(kalitEl, 'line', {x1:KA, y1:YT, x2:KB, y2:YT, class:'om-richag', transform:st.kalit ? '' : `rotate(-28 ${KA} ${YT})`});
    el(kalitEl, 'text', {x:(KA + KB) / 2, y:YT + 30, class:'om-yoz', 'text-anchor':'middle'}, st.kalit ? 'Kalit ulangan' : 'Kalit uzilgan');
    kalitEl.onclick = ()=>kalitQoy(!st.kalit);
    kalitEl.onkeydown = e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); kalitQoy(!st.kalit); } };
    /* ampermetr */
    el(qs, 'circle', {cx:AX, cy:YT, r:24, class:'om-asb'}); el(qs, 'text', {x:AX, y:YT + 8, class:'om-harf', 'text-anchor':'middle'}, 'A');
    el(qs, 'text', {x:AX, y:YT - 34, class:'om-yoz', 'text-anchor':'middle'}, 'Ampermetr (ketma-ket)');
    /* shartli tok yo‘nalishi */
    el(qs, 'path', {d:`M${XR - 88} ${YT - 14} l14 0 l-5 -5 M${XR - 74} ${YT - 14} l-5 5`, class:'om-yon'});
    el(qs, 'text', {x:XR - 94, y:YT - 10, class:'om-yoz om-yont', 'text-anchor':'end'}, 'I');
    /* rezistorlar */
    rezEl = rezJoy().map(([nom, r, x, y])=>{
      const g = el(qs, 'g', {class:'om-rez'});
      const issiq = el(g, 'ellipse', {cx:x, cy:y, rx:62, ry:30, fill:'url(#omIssiq)', opacity:0});
      const tana = el(g, 'rect', {x:x - 40, y:y - 13, width:80, height:26, rx:11, class:'om-rt'});
      const h = RZ[r].h.concat(['oltin']);
      h.forEach((c, i)=>el(g, 'rect', {x:x - 26 + i * 12 + (i === 3 ? 10 : 0), y:y - 13, width:6, height:26, fill:HR[c]}));
      el(g, 'title', {}, `${nom} = ${Rnom(r)} — rangli halqalar: ${h.join(', ')} (±5 %)`);
      el(g, 'text', {x, y:y - 20, class:'om-rn', 'text-anchor':'middle'}, `${nom} = ${Rnom(r)}`);
      return {issiq, tana};
    });
    /* voltmetr */
    el(qs, 'circle', {cx:vx, cy:395, r:22, class:'om-asb'}); el(qs, 'text', {x:vx, y:403, class:'om-harf', 'text-anchor':'middle'}, 'V');
    el(qs, 'text', {x:vx, y:434, class:'om-yoz', 'text-anchor':'middle'}, 'Voltmetr (parallel ulanadi)');
    oqimYangila(0);
  }
  /* strelkali asboblar (o‘ngda) */
  function asbob(y0, harf, maks, qadam, katta, yozuv){
    const g = $('.om-asbob'), cx = 785, cy = y0 + 132, r = 74;
    el(g, 'rect', {x:692, y:y0, width:186, height:172, rx:16, class:'om-yuz'});
    el(g, 'path', {d:`M${cx + r * Math.sin(-.96)} ${cy - r * Math.cos(-.96)} A${r} ${r} 0 0 1 ${cx + r * Math.sin(.96)} ${cy - r * Math.cos(.96)}`, class:'om-yoy'});
    const qiz = el(g, 'path', {d:'', class:'om-yoyq'});
    const n = Math.round(maks / qadam), bol = (v, b)=>Math.abs(v / b - Math.round(v / b)) < 1e-6;
    for(let i = 0; i <= n; i++){
      const v = i * qadam, a = -.96 + 1.92 * v / maks, kt = bol(v, katta), r2 = r - (kt ? 13 : 7);
      el(g, 'line', {x1:cx + r * Math.sin(a), y1:cy - r * Math.cos(a), x2:cx + r2 * Math.sin(a), y2:cy - r2 * Math.cos(a), class:kt ? 'om-ch k' : 'om-ch'});
      if(bol(v, yozuv)) el(g, 'text', {x:cx + (r - 25) * Math.sin(a), y:cy - (r - 25) * Math.cos(a) + 4, class:'om-shk', 'text-anchor':'middle'}, String(Math.round(v * 10) / 10).replace('.', ','));
    }
    el(g, 'text', {x:cx + 54, y:cy + 6, class:'om-dh', 'text-anchor':'middle'}, harf);
    el(g, 'text', {x:704, y:y0 + 22, class:'om-dn'}, harf === 'A' ? 'Ampermetr · 0–' + maks + ' A' : 'Voltmetr · 0–' + maks + ' V');
    const s = el(g, 'line', {x1:cx, y1:cy, x2:cx, y2:cy - r + 6, class:'om-str'});
    el(g, 'circle', {cx, cy, r:7, class:'om-str0'});
    const t = el(g, 'text', {x:cx, y:y0 + 162, class:'om-ds', 'text-anchor':'middle'}, '0');
    return {s, t, cx, cy, qiz, r};
  }
  const dA = asbob(28, 'A', CH.I, .1, .5, 1), dV = asbob(236, 'V', CH.V, .5, 1.5, 3);
  /* ortiqcha tok zonasi ko‘rsatilmaydi — shkala oxiri qizil */
  dA.qiz.setAttribute('d', `M${dA.cx + dA.r * Math.sin(.8)} ${dA.cy - dA.r * Math.cos(.8)} A${dA.r} ${dA.r} 0 0 1 ${dA.cx + dA.r * Math.sin(.96)} ${dA.cy - dA.r * Math.cos(.96)}`);
  function kalitQoy(v){
    st.kalit = v; qur();
    ctx.xabar(v ? 'Kalit ulandi — zanjir yopiq, tok o‘tmoqda.' : 'Kalit uzildi — zanjir ochiq, tok yo‘q.');
    kalitTg.innerHTML = v ? '⏻ Kalitni uzish' : '⏻ Kalitni ulash';
    if(v) tekshirOgoh(); else st.ogoh = {};
  }
  function tekshirOgoh(){
    /* faqat chegara yangi oshganda xabar beriladi (slayder surilganda takrorlanmaydi) */
    const h = hisob(), oI = h.I > CH.I, P = Math.max(h.P1, h.P2), oP = !oI && P > CH.P;
    if(oI && !st.ogoh.I) ctx.xabar(`⚠ Tok ${son(h.I, 2)} A — ampermetr chegarasi ${CH.I} A dan oshdi. Kuchlanishni kamaytiring yoki qarshilikni oshiring.`, 'xavf');
    else if(oP && !st.ogoh.P) ctx.xabar(`Rezistorda quvvat ${son(P, 1)} W — ${CH.P} W li rezistor qiziydi (qizil nur). Haqiqiy tajribada bunday rejim uzoq ushlab turilmaydi.`, 'xavf');
    st.ogoh = {I:oI, P:oP};
  }
  /* boshqaruv */
  slayder(ctx, 'Manba kuchlanishi U', 0, 12, .5, st.U, v=>son(v, 1) + ' V', v=>{ st.U = v; const t = q.querySelector('.om-manU'); if(t) t.textContent = son(v, 1) + ' V'; if(st.kalit) tekshirOgoh(); });
  const ulQ = tugmalar(ctx, 'Ulanish', [['bir', 'Bitta rezistor'], ['ketma', 'Ketma-ket (R₁ + R₂)'], ['parallel', 'Parallel (R₁ ‖ R₂)']], st.ulash, k=>{ st.ulash = k; st.volt = k === 'parallel' ? 'hammasi' : 'r1'; voltQur(); r2Q.style.display = k === 'bir' ? 'none' : ''; qur(); if(st.kalit) tekshirOgoh(); });
  const rTug = (nom, kalit)=>tugmalar(ctx, nom, RL.map(r=>[String(r), Rnom(r), RZ[r].h.join('–') + '–oltin']), String(st[kalit]), k=>{ st[kalit] = +k; qur(); if(st.kalit) tekshirOgoh(); });
  const r1Q = rTug('Rezistor R₁', 'R1'), r2Q = rTug('Rezistor R₂', 'R2'); r2Q.style.display = 'none';
  let voltQ = null;
  function voltQur(){
    const r = st.ulash === 'bir' ? [['r1', 'R₁ ga']] : st.ulash === 'ketma' ? [['r1', 'R₁ ga'], ['r2', 'R₂ ga'], ['hammasi', 'Ikkalasiga']] : [['hammasi', 'Tarmoqlanish uchlariga']];
    const yangi = tugmalar(ctx, 'Voltmetrni ulash', r, st.volt, k=>{ st.volt = k; qur(); });
    if(voltQ) voltQ.replaceWith(yangi); voltQ = yangi;
  }
  voltQur();
  const tq = tugmaQator(ctx, [['⏻ Kalitni ulash', ()=>kalitQoy(!st.kalit)], ['＋ O‘lchovni yozish', ()=>yozish(), 'a']]);
  const kalitTg = tq.children[0];
  const kor = korsatQur(ctx, [['U', 'Manba U'], ['I', 'Tok kuchi I'], ['V', 'Voltmetr'], ['R', 'Umumiy R'], ['I12', 'Tarmoqlar I₁ · I₂'], ['P', 'Quvvat P = U·I']]);
  ctx.jadval([['ul', 'Ulanish'], ['R', 'R, Ω'], ['U', 'U, V'], ['vj', 'Voltmetr'], ['V', 'V, V'], ['I', 'I, A'], ['VI', 'V / I, Ω']]);
  ctx.afsona.innerHTML = '<span><i style="background:#7cc4ff;height:6px;width:6px;border-radius:50%"></i>elektronlar: − dan + ga</span><span><i style="background:#ffb547"></i>shartli tok yo‘nalishi I: + dan − ga</span>';
  const kechT = new Set(), kech = (f, ms)=>{ const t = setTimeout(()=>{ kechT.delete(t); if(!yop) f(); }, ms); kechT.add(t); };
  const ULN = {bir:'bitta', ketma:'ketma-ket', parallel:'parallel'}, VJ = {r1:'R₁ da', r2:'R₂ da', hammasi:'umumiy'};
  function yozish(){
    if(!st.kalit){ ctx.xabar('Avval kalitni ulang — ochiq zanjirda tok yo‘q.'); return; }
    const h = hisob();
    if(h.I > CH.I){ ctx.xabar(`Ampermetr shkalasidan chiqdi (> ${CH.I} A) — bu o‘lchovni yozib bo‘lmaydi.`, 'xavf'); return; }
    if(st.U <= 0){ ctx.xabar('Kuchlanish 0 V — tok ham 0. Kuchlanishni oshiring.'); return; }
    const Rtxt = st.ulash === 'bir' ? String(st.R1) : st.ulash === 'ketma' ? st.R1 + ' + ' + st.R2 : st.R1 + ' ‖ ' + st.R2;
    const r = ctx.qator({ul:ULN[st.ulash], R:Rtxt + (st.ulash === 'bir' ? '' : ' = ' + son(h.R, h.R % 1 ? 2 : 0)), U:son(st.U, 1), vj:VJ[st.volt], V:son(h.V, 2), I:son(h.I, 3), VI:son(h.V / h.Iel, 2),
      _u:st.ulash, _R1:st.R1, _R2:st.R2, _U:st.U, _vj:st.volt, _V:h.V, _Iel:h.Iel, _I:h.I, _I1:h.I1, _I2:h.I2});
    grafik();
    const bir = r.filter(x=>x._u === 'bir');
    if(bir.some(x=>x._R1 === 10 && Math.abs(x._U - 4.5) < 1e-9)) ctx.bajar('o1');
    if(RL.some(R=>new Set(bir.filter(x=>x._R1 === R).map(x=>x._U)).size >= 3)) ctx.bajar('o2');
    if(bir.some(a=>bir.some(b=>Math.abs(a._U - b._U) < 1e-9 && b._R1 === 2 * a._R1))) ctx.bajar('o3');
    const kk = r.filter(x=>x._u === 'ketma');
    const juft = kk.find(a=>a._vj === 'r1' && kk.some(b=>b._vj === 'r2' && b._U === a._U && b._R1 === a._R1 && b._R2 === a._R2));
    if(juft){ const b = kk.find(x=>x._vj === 'r2' && x._U === juft._U && x._R1 === juft._R1 && x._R2 === juft._R2);
      if(!ctx.bajarildi('o4')) kech(()=>ctx.xabar(`U₁ + U₂ = ${son(juft._V, 2)} + ${son(b._V, 2)} = <b>${son(juft._V + b._V, 2)} V</b> = U manba. Ketma-ket ulashda kuchlanishlar qo‘shiladi.`, 'ok'), 3900);
      ctx.bajar('o4'); }
    const pr = r.filter(x=>x._u === 'parallel').slice(-1)[0];
    if(pr && st.ulash === 'parallel'){ if(!ctx.bajarildi('o5')) kech(()=>ctx.xabar(`I = I₁ + I₂ = ${son(pr._I1, 2)} + ${son(pr._I2, 2)} = <b>${son(pr._I, 2)} A</b> — har bir tarmoqdagidan katta.`, 'ok'), 3900); ctx.bajar('o5'); }
    ctx.hodisa({tur:'olchov', ulash:st.ulash, U:st.U, I:h.I, V:h.V});
  }
  /* I(U) grafigi: har bir o‘lchangan qism (V, I) nuqtasi, R = V/I bo‘yicha guruh, koordinata boshidan to‘g‘ri chiziq */
  const graf = $('.om-graf'), gx = graf.getContext('2d'), GR = ['#8b7bff', '#34d69d', '#ffb547', '#4aa8ff', '#ff6b8a', '#e0e6ef'];
  function grafik(joriy){
    const w = 760, h = 150, x0 = 44, y0 = 128, pw = w - x0 - 70, ph = 104;
    const nq = ctx.qatorlar().map(r=>({V:r._V, I:r._Iel, R:Math.round(r._V / r._Iel * 100) / 100}));
    const hamma = joriy ? nq.concat([joriy]) : nq;
    const Vm = [3, 6, 9, 12, 15].find(v=>v >= Math.max(3, ...hamma.map(p=>p.V)) * 1.05) || 15;
    const Im = [.5, 1, 1.5, 2, 3, 4, 5, 6].find(v=>v >= Math.max(.3, ...hamma.map(p=>p.I)) * 1.08) || 6;
    gx.clearRect(0, 0, w, h); gx.font = '12px Inter, sans-serif';
    gx.strokeStyle = 'rgba(255,255,255,.1)'; gx.fillStyle = 'rgba(255,255,255,.5)';
    for(let i = 0; i <= 4; i++){ const y = y0 - i / 4 * ph; gx.beginPath(); gx.moveTo(x0, y); gx.lineTo(x0 + pw, y); gx.stroke(); gx.fillText(son(Im * i / 4, Im < 2 ? 2 : 1), 4, y + 4); }
    for(let i = 0; i <= Vm; i += Vm / 3){ const x = x0 + i / Vm * pw; gx.fillText(son(i, 0), x - 4, 146); }
    gx.fillText('I, A', 4, 12); gx.fillText('U, V', x0 + pw + 18, y0 + 4);
    const guruh = [...new Set(nq.map(p=>p.R))];
    guruh.forEach((R, i)=>{
      const r = GR[i % GR.length]; gx.strokeStyle = r; gx.fillStyle = r; gx.lineWidth = 2;
      const nuqta = nq.filter(p=>p.R === R);
      if(nuqta.length >= 2){ const Vt = Math.min(Vm, Im * R); gx.setLineDash([6, 4]); gx.beginPath(); gx.moveTo(x0, y0); gx.lineTo(x0 + Vt / Vm * pw, y0 - Vt / R / Im * ph); gx.stroke(); gx.setLineDash([]); }
      nuqta.forEach(p=>{ gx.beginPath(); gx.arc(x0 + p.V / Vm * pw, y0 - p.I / Im * ph, 4.5, 0, 7); gx.fill(); });
      gx.fillText('R = ' + son(R, R % 1 ? 2 : 0) + ' Ω', x0 + 40 + i * 96, 12);
    });
    if(joriy && joriy.I > 0){ gx.strokeStyle = '#fff'; gx.lineWidth = 1.5; gx.beginPath(); gx.arc(x0 + joriy.V / Vm * pw, y0 - Math.min(joriy.I, Im) / Im * ph, 6, 0, 7); gx.stroke(); }
    if(!nq.length){ gx.fillStyle = 'rgba(255,255,255,.45)'; gx.fillText('O‘lchovlarni yozing — nuqtalar I(U) grafigiga tushadi (oq halqa — hozirgi holat)', x0 + 10, 70); }
  }
  function formula(h){
    const Rf = st.ulash === 'bir' ? `R = R₁ = ${Rnom(st.R1)}` : st.ulash === 'ketma' ? `R = R₁ + R₂ = ${st.R1} + ${st.R2} = <b>${Rnom(h.R)}</b>` : `1/R = 1/R₁ + 1/R₂ → R = R₁R₂/(R₁ + R₂) = <b>${son(h.R, 2)} Ω</b>`;
    ctx.formula.innerHTML = `<h4>Formula</h4><div class="fl-f">I = U / R = ${son(st.U, 1)} / ${son(h.R, h.R % 1 ? 2 : 0)} = <b>${st.kalit ? son(h.I, 3) + ' A' : '0 (kalit uzilgan)'}</b></div>
      <div class="fl-f">${Rf}</div>
      ${st.ulash === 'ketma' ? `<div class="fl-f">Ketma-ket: I₁ = I₂ = I; U = U₁ + U₂ = ${son(h.U1, 2)} + ${son(h.U2, 2)} V</div>` : ''}
      ${st.ulash === 'parallel' ? `<div class="fl-f">Parallel: U₁ = U₂ = U; I = I₁ + I₂ = ${son(h.I1, 2)} + ${son(h.I2, 2)} A</div>` : ''}
      <p class="fl-fi">Ideal model: manba ichki qarshiligi, simlar va ampermetr qarshiligi 0, voltmetr qarshiligi cheksiz. Rezistor qarshiligi haroratga bog‘liq emas deb olingan. Chegaralar (ampermetr ${CH.I} A, voltmetr ${CH.V} V, rezistor ${CH.P} W) — sxematik, maktab asboblariga yaqin. Ko‘k nuqtalar — elektronlar (− dan + ga), sariq strelka I — shartli tok yo‘nalishi (+ dan − ga).</p>`;
  }
  const oqTok = h=>({I:h.I, I1:st.ulash === 'parallel' ? h.I1 : h.I, I2:h.I2});
  function oqimYangila(dt){
    const h = hisob(), t = oqTok(h);
    oqimEl.forEach(p=>{ const k = p.dataset.k; st.oqim[k] = ((st.oqim[k] || 0) + 42 * t[k] * dt) % 160; p.style.strokeDashoffset = st.oqim[k]; p.style.opacity = t[k] > 0 ? 1 : 0; });
  }
  let kadr = 0, oldin = performance.now(), yop = false, fk = 0;
  function tik(tm){
    if(yop) return; kadr = requestAnimationFrame(tik);
    const dt = Math.min(.1, (tm - oldin) / 1000) * ctx.tezlik; oldin = tm;
    const h = hisob();
    oqimYangila(dt);
    st.aI += (Math.min(h.I, CH.I * 1.04) - st.aI) * Math.min(1, dt * 7); st.aV += (Math.min(h.V, CH.V * 1.04) - st.aV) * Math.min(1, dt * 7);
    const bur = (d, v, m)=>d.s.setAttribute('transform', `rotate(${(-55 + 110 * cheg(v / m, 0, 1.04))} ${d.cx} ${d.cy})`);
    bur(dA, st.aI, CH.I); bur(dV, st.aV, CH.V);
    dA.s.classList.toggle('ortiq', h.I > CH.I);
    rezEl.forEach((r, i)=>{ const P = i ? h.P2 : h.P1, k = cheg(P / CH.P, 0, 1.6); r.issiq.setAttribute('opacity', cheg((k - .3) / 1.1, 0, 1)); r.tana.classList.toggle('qizdi', P > CH.P); });
    if(++fk % 4) return;
    dA.t.textContent = h.I > CH.I ? '> ' + CH.I + ' A' : son(h.I, 3).replace(/0+$/, '').replace(/,$/, ',0') + ' A';
    dV.t.textContent = son(h.V, 2) + ' V';
    kor('U', son(st.U, 1) + ' V'); kor('I', h.I > CH.I ? '> ' + CH.I + ' A' : son(h.I, 3) + ' A'); kor('V', son(h.V, 2) + ' V · ' + VJ[st.volt]);
    kor('R', son(h.R, h.R % 1 ? 2 : 0) + ' Ω'); kor('I12', st.ulash === 'parallel' ? son(h.I1, 2) + ' · ' + son(h.I2, 2) + ' A' : st.ulash === 'ketma' ? 'bir xil: ' + son(h.I, 2) + ' A' : '—');
    kor('P', son(st.U * h.I, 2) + ' W');
    formula(h);
    grafik(st.kalit ? {V:h.V, I:h.Iel} : null);
  }
  qur(); grafik(); kadr = requestAnimationFrame(tik);
  return {st, yopish(){ yop = true; cancelAnimationFrame(kadr); kechT.forEach(clearTimeout); kechT.clear(); ctx.korsat.classList.remove('om3'); ctx.afsona.classList.remove('om3'); q.remove(); }, hisob,
    /* sinov */ kalit(v){ if(!!v !== st.kalit) kalitQoy(!!v); }, U(v){ ctx.bosh.querySelector('.fl-sl').qoy(v); },
    ulash(k){ ulQ.querySelector(`[data-k="${k}"]`).click(); }, R1(r){ r1Q.querySelector(`[data-k="${r}"]`).click(); }, R2(r){ r2Q.querySelector(`[data-k="${r}"]`).click(); },
    volt(k){ voltQ.querySelector(`[data-k="${k}"]`).click(); }, yoz(){ yozish(); }};
}

/* linza tajribasi uslubi — fizlab.css ga tegilmasin degan qoida uchun skriptdan ulanadi */
(function(){ if(document.getElementById('fl-linza-css')) return; const st = document.createElement('style'); st.id = 'fl-linza-css'; st.textContent = `
.fl-linza{padding-top:200px}
.lz-svg .lz-oq{stroke:rgba(255,255,255,.45);stroke-width:1.5;stroke-dasharray:6 5}
.lz-svg .lz-f{fill:#fff;stroke:#1a1f2e;stroke-width:1.5}
.lz-svg .lz-linza{fill:url(#lzShisha);stroke:#bfe3ff;stroke-width:2}
.lz-svg .lz-bosh{stroke:rgba(255,255,255,.3);stroke-width:1;stroke-dasharray:3 4}
.lz-svg text{font:600 13px Inter,sans-serif;fill:var(--matn2)}
.lz-svg .lz-yoz{font-size:12.5px;fill:var(--xira)}
.lz-svg .lz-b{fill:#ff8fab}
.lz-svg .lz-t{fill:#ffb547}
.lz-svg .lz-ogoh{fill:#ffb547;font-weight:700}
.lz-svg .lz-buyum{stroke:#ff8fab;stroke-width:5;stroke-linecap:round}
.lz-svg .lz-obj{cursor:ew-resize;outline:none}
.lz-svg .lz-obj:hover .lz-buyum,.lz-svg .lz-obj:focus-visible .lz-buyum{stroke:#fff}
.lz-svg .lz-olch{stroke:rgba(255,143,171,.5);stroke-width:1.5;stroke-dasharray:4 4}
.lz-svg .lz-tasvir{stroke:#ffb547;stroke-width:5;stroke-linecap:round}
.lz-svg .lz-tasvir.lz-mavhum{stroke-dasharray:7 6;opacity:.85}
.lz-svg .lz-tasvir.lz-ekr{stroke:#fff;stroke-width:4}
.lz-svg .lz-ekran{fill:#e9edf2;stroke:#5a6070;stroke-width:1.5;opacity:.9}
.lz-svg .lz-n1,.lz-svg .lz-n2,.lz-svg .lz-n3{fill:none;stroke-width:2.4;stroke-linecap:round}
.lz-svg .lz-n1{stroke:#ffb547}
.lz-svg .lz-n2{stroke:#7cc4ff}
.lz-svg .lz-n3{stroke:#34d69d}
.lz-svg .lz-d{stroke-dasharray:6 6;opacity:.6;stroke-width:1.8}
@media (max-width:1000px){ .fl-linza{padding-top:196px} .fl-linza .lz-graf{height:110px} }
@media (max-width:560px){ .fl-linza{padding:210px 6px 8px} }
`; document.head.appendChild(st); })();

/* ================= 5. LINZA VA TASVIR YASASH (v3.19) ================= */
function linza(ctx){
  const LZ = D.LINZA;
  const st = {tur:'yig', F:10, d:25, h:3, ekran:false, bash:null};
  const q = document.createElement('div'); q.className = 'fl-kal fl-linza'; ctx.host.append(q);
  ctx.afsona.classList.add('om3');   /* afsona o‘ng-yuqorida, ko‘rsatkichlar 2 ustun chapda */
  q.innerHTML = `<svg viewBox="0 0 900 440" class="fl-kal-svg lz-svg" role="img" aria-label="Linzada tasvir yasash sxemasi">
    <defs><linearGradient id="lzShisha" x1="0" x2="1"><stop offset="0" stop-color="#9fd4ff" stop-opacity=".35"/><stop offset=".5" stop-color="#e6f4ff" stop-opacity=".75"/><stop offset="1" stop-color="#9fd4ff" stop-opacity=".35"/></linearGradient>
    <marker id="lzUch" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>
    <g class="lz-fon"></g><g class="lz-nur"></g><g class="lz-qism"></g></svg>
    <canvas class="fl-kal-graf lz-graf" width="760" height="150" aria-label="Tasvir masofasining buyum masofasiga bog‘liqlik grafigi f(d)"></canvas>`;
  const $ = s=>q.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const el = (ota, tag, at, matn)=>{ const e = document.createElementNS(NS, tag); for(const k in at) e.setAttribute(k, at[k]); if(matn !== undefined) e.textContent = matn; ota.append(e); return e; };
  const LX = 450, AY = 230, S = 7;   /* 1 sm = 7 px, linza markazi */
  const Fs = ()=>st.tur === 'yig' ? st.F : -st.F;
  /* hisob: Gauss formulasi 1/f = 1/F − 1/d (F: yig‘uvchi +, sochuvchi −); f > 0 — haqiqiy (o‘ng tomonda), f < 0 — mavhum (chap tomonda) */
  function hisob(){
    const F = Fs(), d = st.d, cheks = Math.abs(d - F) < 1e-9;
    const f = cheks ? Infinity : 1 / (1 / F - 1 / d);
    const G = cheks ? Infinity : Math.abs(f) / d, H = cheks ? Infinity : -st.h * f / d;   /* H < 0 — teskari */
    const haqiqiy = isFinite(f) && f > 0;
    const xus = cheks ? 'tasvir hosil bo‘lmaydi (nurlar parallel)' : (haqiqiy ? 'haqiqiy' : 'mavhum') + ', ' + (H < 0 ? 'teskari' : 'to‘g‘ri') + ', ' + (Math.abs(G - 1) < 1e-6 ? 'teng' : G > 1 ? 'kattalashgan' : 'kichraygan');
    return {F, d, f, G, H, haqiqiy, cheks, D:1 / (F / 100), xus};
  }
  const pxX = x=>LX + x * S, pxY = y=>AY - y * S;
  let objG = null;
  function qur(){
    const fon = $('.lz-fon'), nur = $('.lz-nur'), qs = $('.lz-qism'); fon.innerHTML = nur.innerHTML = qs.innerHTML = '';
    const h = hisob(), F = Math.abs(st.F);
    /* optik o‘q, F va 2F belgilari */
    el(fon, 'line', {x1:10, y1:AY, x2:890, y2:AY, class:'lz-oq'});
    [[-2 * F, '2F'], [-F, 'F'], [F, 'F'], [2 * F, '2F']].forEach(([x, n])=>{ const px = pxX(x); if(px < 14 || px > 886) return; el(fon, 'circle', {cx:px, cy:AY, r:4, class:'lz-f'}); el(fon, 'text', {x:px, y:AY + 22, class:'lz-yoz', 'text-anchor':'middle'}, n); });
    /* linza */
    if(st.tur === 'yig') el(fon, 'path', {d:`M${LX} ${AY - 150} C${LX + 34} ${AY - 90} ${LX + 34} ${AY + 90} ${LX} ${AY + 150} C${LX - 34} ${AY + 90} ${LX - 34} ${AY - 90} ${LX} ${AY - 150}z`, class:'lz-linza'});
    else el(fon, 'path', {d:`M${LX - 22} ${AY - 150} h44 C${LX + 6} ${AY - 90} ${LX + 6} ${AY + 90} ${LX + 22} ${AY + 150} h-44 C${LX - 6} ${AY + 90} ${LX - 6} ${AY - 90} ${LX - 22} ${AY - 150}z`, class:'lz-linza'});
    el(fon, 'line', {x1:LX, y1:AY - 160, x2:LX, y2:AY + 160, class:'lz-bosh'});
    el(fon, 'text', {x:LX, y:AY - 168, class:'lz-yoz', 'text-anchor':'middle'}, st.tur === 'yig' ? 'Yig‘uvchi linza' : 'Sochuvchi linza');
    /* buyum (strelka) */
    const xo = pxX(-st.d), yo = pxY(st.h);
    objG = el(qs, 'g', {class:'lz-obj', tabindex:0, role:'slider', 'aria-label':'Buyum masofasi d', 'aria-valuenow':st.d, 'aria-valuemin':LZ.dmin, 'aria-valuemax':LZ.dmax});
    el(objG, 'rect', {x:xo - 22, y:yo - 16, width:44, height:AY - yo + 24, fill:'transparent'});
    el(objG, 'line', {x1:xo, y1:AY, x2:xo, y2:yo, class:'lz-buyum', 'marker-end':'url(#lzUch)'});
    el(objG, 'text', {x:xo, y:yo - 12, class:'lz-yoz lz-b', 'text-anchor':'middle'}, 'buyum');
    el(objG, 'text', {x:xo, y:AY + 42, class:'lz-yoz', 'text-anchor':'middle'}, 'd = ' + son(st.d, 1) + ' sm');
    el(qs, 'path', {d:`M${xo} ${AY + 52} H${LX}`, class:'lz-olch'});
    objG.onpointerdown = e=>{ e.preventDefault(); const sv = $('svg'); const yur = ev=>{ const pt = sv.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const p = pt.matrixTransform(sv.getScreenCTM().inverse()); dSl.qoy(Math.round(cheg((LX - p.x) / S, LZ.dmin, LZ.dmax) * 2) / 2); };
      const tug = ()=>{ document.removeEventListener('pointermove', yur); document.removeEventListener('pointerup', tug); }; document.addEventListener('pointermove', yur); document.addEventListener('pointerup', tug); };
    objG.onkeydown = e=>{ if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){ e.preventDefault(); dSl.qoy(cheg(st.d + (e.key === 'ArrowLeft' ? .5 : -.5), LZ.dmin, LZ.dmax)); } };
    /* nurlar */
    const T = [xo, yo], O = [LX, AY], Fl = [pxX(-F), AY], Fr = [pxX(F), AY];
    const chiz = (a, b, cls)=>el(nur, 'line', {x1:a[0], y1:a[1], x2:b[0], y2:b[1], class:cls});
    const chet = (p, dir)=>{ /* nuqtadan yo‘nalish bo‘yicha chekkagacha */ const t = dir[0] > 0 ? (890 - p[0]) / dir[0] : dir[0] < 0 ? (10 - p[0]) / dir[0] : 1e9; let tt = t; const ty = dir[1] > 0 ? (430 - p[1]) / dir[1] : dir[1] < 0 ? (10 - p[1]) / dir[1] : 1e9; tt = Math.min(t, ty); return [p[0] + dir[0] * tt, p[1] + dir[1] * tt]; };
    const P1 = [LX, yo];
    /* 3-nur (fokus orqali) linzaga tushish nuqtasi */
    const fk = st.tur === 'yig' ? Fl : Fr;
    const k3 = (LX - T[0]) / (fk[0] - T[0]), y3 = T[1] + (fk[1] - T[1]) * k3, P3 = [LX, y3];
    if(h.cheks){
      chiz(T, P1, 'lz-n1'); chiz(P1, chet(P1, [1, 0]), 'lz-n1');
      chiz(T, chet(T, [O[0] - T[0], O[1] - T[1]]), 'lz-n2');
      chiz(T, P3, 'lz-n3'); chiz(P3, chet(P3, [1, 0]), 'lz-n3');
      el(qs, 'text', {x:LX + 20, y:AY - 120, class:'lz-yoz lz-ogoh'}, 'd = F: nurlar parallel chiqadi — tasvir hosil bo‘lmaydi');
      return;
    }
    const I = [pxX(h.f), pxY(h.H)];
    const Ik = I[0] > 14 && I[0] < 886 && I[1] > 14 && I[1] < 426;   /* tasvir chizmada sig‘adimi */
    /* 1-nur: o‘qqa parallel → linzadan keyin P1 va I orqali */
    chiz(T, P1, 'lz-n1');
    const d1 = h.haqiqiy ? [I[0] - P1[0], I[1] - P1[1]] : [P1[0] - I[0], P1[1] - I[1]];
    chiz(P1, chet(P1, d1), 'lz-n1');
    if(!h.haqiqiy) chiz(P1, Ik ? I : chet(P1, [-d1[0], -d1[1]]), 'lz-n1 lz-d');
    /* 2-nur: optik markaz orqali */
    chiz(T, chet(T, [O[0] - T[0], O[1] - T[1]]), 'lz-n2');
    if(!h.haqiqiy && I[0] < T[0]) chiz(T, Ik ? I : chet(T, [T[0] - O[0], T[1] - O[1]]), 'lz-n2 lz-d');
    /* 3-nur: fokus orqali (yoki fokusga yo‘nalgan) → o‘qqa parallel */
    chiz(T, P3, 'lz-n3'); chiz(P3, chet(P3, [1, 0]), 'lz-n3');
    if(!h.haqiqiy) chiz(P3, Ik ? I : [10, y3], 'lz-n3 lz-d');
    /* tasvir */
    const yI = Ik ? I[1] : (I[1] < 14 ? 14 : I[1] > 426 ? 426 : I[1]), xI = cheg(I[0], 14, 886);
    el(qs, 'line', {x1:xI, y1:AY, x2:xI, y2:yI, class:'lz-tasvir' + (h.haqiqiy ? '' : ' lz-mavhum'), 'marker-end':'url(#lzUch)'});
    el(qs, 'text', {x:xI, y:(h.H > 0 ? yI - 12 : yI + 18), class:'lz-yoz lz-t', 'text-anchor':'middle'}, (h.haqiqiy ? 'haqiqiy' : 'mavhum') + ' tasvir' + (Ik ? '' : ' (chizmadan tashqarida)'));
    el(qs, 'text', {x:xI, y:AY + (h.H > 0 ? 42 : -30), class:'lz-yoz', 'text-anchor':'middle'}, 'f = ' + son(Math.abs(h.f), 1) + ' sm');
    /* ekran */
    if(st.ekran){
      const ex = h.haqiqiy ? xI : pxX(Math.min(2 * F, 50));
      el(qs, 'rect', {x:ex - 4, y:AY - 165, width:8, height:330, class:'lz-ekran'});
      el(qs, 'text', {x:ex, y:AY - 172, class:'lz-yoz', 'text-anchor':'middle'}, 'ekran');
      if(h.haqiqiy) el(qs, 'line', {x1:ex, y1:AY, x2:ex, y2:yI, class:'lz-tasvir lz-ekr', 'marker-end':'url(#lzUch)'});
      else el(qs, 'text', {x:ex, y:AY + 185, class:'lz-yoz lz-ogoh', 'text-anchor':'middle'}, 'ekranda tasvir yo‘q — mavhum tasvir ekranga tushmaydi');
    }
  }
  /* boshqaruv */
  const turQ = tugmalar(ctx, 'Linza turi', [['yig', 'Yig‘uvchi (qavariq)', 'F > 0'], ['soch', 'Sochuvchi (botiq)', 'F < 0 — tasvir doim mavhum']], st.tur, k=>{ st.tur = k; yangila(); if(k === 'soch') ctx.xabar('Sochuvchi linza: nurlar tarqaladi, tasvir doim mavhum, to‘g‘ri, kichraygan.'); });
  const FSl = slayder(ctx, 'Fokus masofasi F', LZ.Fmin, LZ.Fmax, 1, st.F, v=>v + ' sm · D = ' + son((st.tur === 'yig' ? 1 : -1) * 100 / v, 1) + ' dptr', v=>{ st.F = v; yangila(); });
  const dSl = slayder(ctx, 'Buyum masofasi d (sudrash ham mumkin)', LZ.dmin, LZ.dmax, .5, st.d, v=>son(v, 1) + ' sm', v=>{ st.d = v; yangila(); });
  slayder(ctx, 'Buyum balandligi h', 1, 6, .5, st.h, v=>son(v, 1) + ' sm', v=>{ st.h = v; yangila(); });
  const ekrQ = tugmalar(ctx, 'Ekran', [['yoq', 'Yo‘q'], ['bor', 'Ekranni qo‘yish']], 'yoq', k=>{ st.ekran = k === 'bor'; yangila(); if(st.ekran){ const h = hisob(); if(!h.haqiqiy && !h.cheks){ ctx.bajar('l14'); ctx.xabar('Mavhum tasvirni ekranga tushirib bo‘lmaydi — nurlar haqiqatda kesishmaydi, ko‘z ularning davomini «ko‘radi».'); } else if(h.haqiqiy) ctx.xabar('Ekran tasvir joyida (f masofada): haqiqiy tasvir ekranda ko‘rinadi.'); } });
  tugmaQator(ctx, [['d = 2F', ()=>dSl.qoy(cheg(2 * st.F, LZ.dmin, LZ.dmax))], ['d = F', ()=>dSl.qoy(st.F)], ['d = F/2', ()=>dSl.qoy(Math.max(LZ.dmin, st.F / 2))], ['＋ O‘lchovni yozish', ()=>yozish(), 'a']]);
  const bq = document.createElement('div'); bq.className = 'fl-bh';
  bq.innerHTML = '<label for="flLzBash">Formuladan f ni hisoblab yozing (sm; mavhum bo‘lsa «−»)</label><div><input id="flLzBash" type="text" inputmode="decimal" placeholder="sm"><button class="tg o kichik">Yozish</button></div>';
  ctx.bosh.append(bq);
  bq.querySelector('button').onclick = ()=>{ const v = parseFloat(bq.querySelector('input').value.replace(',', '.').replace('−', '-')); if(!isFinite(v)){ ctx.xabar('Son kiriting, masalan 16,7 yoki −6'); return; } st.bash = v; ctx.xabar('Hisobingiz yozildi: <b>' + son(v, 1) + ' sm</b>. Endi «O‘lchovni yozish»ni bosing.'); };
  const kor = korsatQur(ctx, [['d', 'Buyum masofasi d'], ['f', 'Tasvir masofasi f'], ['G', 'Kattalashtirish Γ'], ['D', 'Optik kuch D'], ['x', 'Tasvir'], ['H', 'Tasvir balandligi']]);
  ctx.jadval([['tur', 'Linza'], ['F', 'F, sm'], ['d', 'd, sm'], ['f', 'f, sm'], ['G', 'Γ = f/d'], ['xus', 'Tasvir'], ['bash', 'Hisobingiz']]);
  ctx.afsona.innerHTML = '<span><i style="background:#ffb547"></i>1-nur: o‘qqa parallel → fokus orqali</span><span><i style="background:#7cc4ff"></i>2-nur: optik markaz orqali — sinmaydi</span><span><i style="background:#34d69d"></i>3-nur: fokus orqali → o‘qqa parallel</span><span><i style="background:rgba(255,255,255,.5);height:2px"></i>shtrix — nurlarning davomi (mavhum tasvir)</span>';
  function formula(h){
    const F = Math.abs(st.F), fa = Math.abs(h.f);
    const sh = h.cheks ? `1/${F} = 1/${son(st.d, 1)} + 1/f → 1/f = 0 → f → ∞` :
      st.tur === 'yig' ? (h.haqiqiy ? `1/F = 1/d + 1/f: 1/${F} = 1/${son(st.d, 1)} + 1/f → f = <b>${son(fa, 1)} sm</b>` : `1/F = 1/d − 1/f (mavhum): 1/${F} = 1/${son(st.d, 1)} − 1/f → f = <b>${son(fa, 1)} sm</b> (linzaning buyum tomonida)`)
      : `−1/F = 1/d − 1/f (sochuvchi, mavhum): −1/${F} = 1/${son(st.d, 1)} − 1/f → f = <b>${son(fa, 1)} sm</b>`;
    ctx.formula.innerHTML = `<h4>Formula</h4><div class="fl-f">${sh}</div>
      <div class="fl-f">D = 1/F = 1/${son(F / 100, 2)} m = <b>${son(h.D, 1)} dptr</b>${st.tur === 'soch' ? ' (sochuvchi — manfiy)' : ''}</div>
      <div class="fl-f">Γ = f/d = H/h ${h.cheks ? '→ ∞' : '= ' + son(fa, 1) + '/' + son(st.d, 1) + ' = <b>' + son(h.G, 2) + '</b>'}</div>
      <p class="fl-fi">Yupqa linza formulasi (darslikdagi yozuv): haqiqiy tasvir uchun 1/F = 1/d + 1/f; mavhum tasvirda f oldida «−», sochuvchi linzada F oldida ham «−». Umumiy (Gauss) ko‘rinishda 1/f = 1/F − 1/d, bunda sochuvchi F < 0 va mavhum f < 0. 1 dptr = 1/m. Nurlar — yupqa linza yaqinlashuvi (chizma sxematik, 1 sm = ${S} px).</p>`;
  }
  const ULN = {yig:'yig‘uvchi', soch:'sochuvchi'};
  function yozish(){
    const h = hisob();
    const r = ctx.qator({tur:ULN[st.tur], F:(st.tur === 'soch' ? '−' : '') + st.F, d:son(st.d, 1), f:h.cheks ? '∞' : (h.haqiqiy ? '' : '−') + son(Math.abs(h.f), 1), G:h.cheks ? '∞' : son(h.G, 2), xus:h.xus, bash:st.bash === null ? '—' : son(st.bash, 1),
      _t:st.tur, _F:st.F, _d:st.d, _f:h.f, _G:h.G, _h:h.haqiqiy, _c:h.cheks, _b:st.bash});
    grafik();
    const y = r.filter(x=>x._t === 'yig'), s = r.filter(x=>x._t === 'soch'), yaq = (a, b, k)=>Math.abs(a - b) <= k * b;
    if(y.some(x=>yaq(x._d, 2 * x._F, .02))) ctx.bajar('l1');
    if(y.some(x=>x._d > 2.05 * x._F)) ctx.bajar('l2');
    if(y.some(x=>x._d > 1.05 * x._F && x._d < 1.95 * x._F)) ctx.bajar('l3');
    if(y.some(x=>x._d < .95 * x._F)) ctx.bajar('l4');
    if(y.some(x=>x._c)) ctx.bajar('l5');
    if(s.length) ctx.bajar('l6');
    if(s.some(a=>s.some(b=>a._F === b._F && Math.max(a._d, b._d) / Math.min(a._d, b._d) >= 2))) ctx.bajar('l7');
    if(y.some(x=>x._F === 10)) ctx.bajar('l8');
    if(y.some(a=>y.some(b=>a._d === b._d && b._F === 2 * a._F && a._d > 2 * b._F))) ctx.bajar('l9');
    const ox = r[r.length - 1];
    if(ox._b !== null && !ox._c){ if(Math.abs(ox._b - ox._f) <= .05 * Math.abs(ox._f) + .05) ctx.bajar('l10'); else ctx.xabar(`Hisobingiz ${son(ox._b, 1)} sm, tajriba ${son(ox._f, 1)} sm. Formulani qayta tekshiring (ishorani ham).`, 'xavf'); }
    if(y.some(x=>x._h && Math.abs(x._G - 2) <= .1)) ctx.bajar('l11');
    if(y.some(x=>yaq(x._d, 3 * x._F, .03))) ctx.bajar('l12');
    if(y.some(x=>!x._h && !x._c && x._G >= 3)) ctx.bajar('l13');
    if(s.some(x=>x._F === 20)) ctx.bajar('l15');
    if(y.some(a=>s.some(b=>a._F === b._F && a._d === b._d))) ctx.bajar('l16');
    ctx.xabar(h.cheks ? 'Yozildi: d = F — tasvir hosil bo‘lmaydi.' : `Yozildi: d = ${son(st.d, 1)} sm → f = ${son(Math.abs(h.f), 1)} sm, Γ = ${son(h.G, 2)} (${h.xus}).`, 'ok');
    ctx.hodisa({tur:'olchov', linza:st.tur, F:st.F, d:st.d, f:h.f});
    st.bash = null; bq.querySelector('input').value = '';
  }
  /* f(d) grafigi — joriy F uchun egri chiziq va yozilgan nuqtalar */
  const graf = $('.lz-graf'), gx = graf.getContext('2d');
  function grafik(){
    const w = 760, hh = 150, x0 = 44, y0 = 128, pw = w - x0 - 60, ph = 104, dm = LZ.dmax, fm = 60;
    gx.clearRect(0, 0, w, hh); gx.font = '12px Inter, sans-serif'; gx.fillStyle = 'rgba(255,255,255,.5)'; gx.strokeStyle = 'rgba(255,255,255,.1)';
    for(let i = -1; i <= 1; i++){ const y = y0 - ph / 2 - i * ph / 2; gx.beginPath(); gx.moveTo(x0, y); gx.lineTo(x0 + pw, y); gx.stroke(); gx.fillText((i * fm) + '', 6, y + 4); }
    gx.strokeStyle = 'rgba(255,255,255,.3)'; gx.beginPath(); gx.moveTo(x0, y0 - ph / 2); gx.lineTo(x0 + pw, y0 - ph / 2); gx.stroke();
    for(let dd = 0; dd <= dm; dd += 10){ const x = x0 + dd / dm * pw; gx.fillStyle = 'rgba(255,255,255,.5)'; gx.fillText(dd, x - 6, 146); }
    gx.fillText('f, sm', 4, 12); gx.fillText('d, sm', x0 + pw + 12, y0 - ph / 2 + 4);
    const F = Fs(), X = d=>x0 + d / dm * pw, Y = f=>y0 - ph / 2 - cheg(f, -fm, fm) / fm * ph / 2;
    gx.strokeStyle = st.tur === 'yig' ? '#ffb547' : '#7cc4ff'; gx.lineWidth = 2; gx.beginPath(); let uz = true;
    for(let dd = .5; dd <= dm; dd += .25){ const f = 1 / (1 / F - 1 / dd); if(Math.abs(f) > fm * 1.5){ uz = true; continue; } uz ? gx.moveTo(X(dd), Y(f)) : gx.lineTo(X(dd), Y(f)); uz = false; }
    gx.stroke();
    if(st.tur === 'yig'){ gx.setLineDash([4, 4]); gx.strokeStyle = 'rgba(255,255,255,.35)'; gx.beginPath(); gx.moveTo(X(F), y0 - ph / 2 - ph / 2); gx.lineTo(X(F), y0 + ph / 2 - ph / 2); gx.stroke(); gx.setLineDash([]); gx.fillText('d = F', X(F) + 4, 14); }
    ctx.qatorlar().forEach(r=>{ if(r._c) return; gx.fillStyle = r._t === 'yig' ? '#ffb547' : '#7cc4ff'; gx.beginPath(); gx.arc(X(r._d), Y(r._f), 4, 0, 7); gx.fill(); });
    const h = hisob(); if(!h.cheks){ gx.strokeStyle = '#fff'; gx.lineWidth = 1.5; gx.beginPath(); gx.arc(X(st.d), Y(h.f), 6, 0, 7); gx.stroke(); }
  }
  function yangila(){
    const h = hisob(); qur(); formula(h); grafik();
    FSl.querySelector('b').innerHTML = st.F + ' sm · D = ' + son((st.tur === 'yig' ? 1 : -1) * 100 / st.F, 1) + ' dptr';
    kor('d', son(st.d, 1) + ' sm'); kor('f', h.cheks ? '∞' : son(Math.abs(h.f), 1) + ' sm' + (h.haqiqiy ? '' : ' (mavhum)')); kor('G', h.cheks ? '∞' : son(h.G, 2));
    kor('D', son(h.D, 1) + ' dptr'); kor('x', h.xus); kor('H', h.cheks ? '—' : son(Math.abs(h.H), 1) + ' sm');
  }
  yangila();
  return {st, hisob, yopish(){ ctx.afsona.classList.remove('om3'); q.remove(); },
    /* sinov */ tur(k){ turQ.querySelector(`[data-k="${k}"]`).click(); }, F(v){ FSl.qoy(v); }, d(v){ dSl.qoy(v); }, ekran(v){ ekrQ.querySelector(`[data-k="${v ? 'bor' : 'yoq'}"]`).click(); }, yoz(){ yozish(); }, bashorat(v){ bq.querySelector('input').value = v; bq.querySelector('button').click(); }};
}

const TAJ = {arximed, mayatnik, kalor, om, linza};
window.MAKON_FIZLAB = {och};
})();
