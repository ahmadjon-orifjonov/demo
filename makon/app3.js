/* MAKON demo ilovasi v3 — oflayn, file:// da ishlaydi. Ma'lumot shu qurilmada (localStorage). */
(function(){
'use strict';
const $ = (s, el)=>(el||document).querySelector(s);
const $$ = (s, el)=>[...(el||document).querySelectorAll(s)];
const ilova = $('#ilova');
const FAN = window.MAKON_FAN, DARS = window.MAKON_DARS, NAMUNA = window.MAKON_NAMUNA;
window._sahnalar = new Map();

/* ---------- saqlash ---------- */
const xotira = {
  ol(k, d){ try{ const v = localStorage.getItem('makon:'+k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  yoz(k, v){ try{ localStorage.setItem('makon:'+k, JSON.stringify(v)); }catch(e){} }
};
const TEL = !!window.MAKON_TEL; /* v3.21: telefon uchun sodda rejim (tel.html) */
const natijalar = ()=>{ const n = xotira.ol('natija', {}); Object.keys(n).forEach(k=>{ if(!DARS[k]) delete n[k]; }); return n; };
function natijaYoz(id, n){ const h = xotira.ol('natija', {}); h[id] = n; xotira.yoz('natija', h); }
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const son = (x, k)=>x.toFixed(k).replace('.', ',');
const matnSof = s=>String(s||'').replace(/<[^>]+>/g, '');
const RASMLAR = ['kimyo-molekula','fizika-om','bio-azolar','harbiy-ak74','harbiy-granata','harbiy-texnika','harbiy-protivogaz'];
const rasm = id=>'rasm/dars/'+id+'.webp';
const fanOf = d=>FAN.find(x=>x.id === d.fan);
/* v3.15: sinf bo‘yicha tartib — «8–9-sinf» → [8, 9]; dars.sinf (son yoki «7–8») yoki ishlanma.sinf dan */
const sinfOraliq = d=>{ const t = String((d && (d.sinf || (d.ishlanma && d.ishlanma.sinf))) || ''); const m = t.match(/\d+/g); if(!m) return [99, 99]; const a = +m[0], b = /^\s*\d+\s*[–-]\s*\d+/.test(t) ? +m[1] : a; return [a, Math.max(a, b)]; };
const sinfRaqam = d=>sinfOraliq(d)[0];
const darsIds = f=>(f.mavzular||[]).filter(m=>m.dars && DARS[m.dars]).map(m=>m.dars).map((id, i)=>[id, i]).sort((a, b)=>sinfRaqam(DARS[a[0]]) - sinfRaqam(DARS[b[0]]) || a[1] - b[1]).map(a=>a[0]);

/* ---------- ikonkalar ---------- */
const IK = {
  kolba:'<path d="M9 3h6M10 3v6L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9V3"/><path d="M7 15h10"/>',
  chaqmoq:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  yurak:'<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-4 5 5 0 0 1 9 4c-2 4.6-9 9-9 9z"/>',
  qalqon:'<path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  sayyora:'<circle cx="12" cy="12" r="5"/><path d="M3.5 15.5C1.8 18 2.4 19.6 5 19.6c3.6 0 9.6-3.3 13.2-6.9 2.9-2.9 3.3-5.2.8-5.6"/>',
  xarita:'<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  globus:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  til:'<path d="M4 5h8M8 3v2M10 5c-1 5-3.5 8-6 9M6 9c1.5 2.5 3.5 4 6 5"/><path d="m13 21 4-9 4 9M14.5 18h5"/>',
  qulf:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  ok:'<path d="m5 12 5 5 9-10"/>', xato:'<path d="M6 6l12 12M18 6 6 18"/>',
  oquvchi:'<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
  oqituvchi:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 9h6M7 12h9"/>',
  proyektor:'<rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="15" cy="12" r="2.5"/><path d="M6 17v2M18 17v2"/>',
  orqa:'<path d="m15 18-6-6 6-6"/>', oldinga:'<path d="m9 18 6-6-6-6"/>', past:'<path d="m6 9 6 6 6-6"/>',
  pauza:'<path d="M9 5v14M15 5v14"/>', ijro:'<path d="M7 4v16l13-8z"/>',
  tikla:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  minus:'<path d="M5 12h14"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  rentgen:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 7v10M9 9h6M9.5 12h5M10 15h4"/>',
  ekran:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  yorliq:'<path d="M20 12 12 20l-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  robot:'<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>',
  yubor:'<path d="m4 12 16-8-6 16-3-7z"/>',
  hujjat:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
  tozalash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  uy:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  kitob:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
  grafik:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  qidiruv:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  soat:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  savol:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>',
  funksiya:'<path d="M3 3v18h18"/><path d="M6 17c3-12 7-12 10 0"/><circle cx="11" cy="8" r="1.2"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><path d="M10 10h4v4h-4z"/>',
  kub:'<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
  ogoh:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  yulduz:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  olov:'<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7z"/>',
  medal:'<circle cx="12" cy="15" r="6"/><path d="M8 3h8l-2 6h-4z"/>',
  almash:'<path d="M7 7h13l-3-3M17 17H4l3 3"/>',
  qatlam:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  kitobcha:'<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
  foydalanuvchilar:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  maqsad:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  yopish:'<path d="M6 6l12 12M18 6 6 18"/>',
  ixcham:'<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  nota:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  mikroskop:'<path d="M9 3h4l1 9h-6z"/><path d="M12 12v4"/><path d="M6 20h12"/><path d="M8 20a5 5 0 0 1 9-3"/><circle cx="12" cy="17" r="1"/>'
};
if(window.MAKON_IKON) Object.keys(MAKON_IKON).forEach(k=>{ if(!IK[k]) IK[k] = MAKON_IKON[k]; }); /* v3.19: fan fayllari bergan ikonlar */
const ikon = (n, o)=>'<svg viewBox="0 0 24 24" width="'+((o&&o.w)||18)+'" height="'+((o&&o.w)||18)+'" fill="none" stroke="currentColor" stroke-width="'+((o&&o.q)||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IK[n]||'')+'</svg>';
function bildir(m){ const b = $('#bildirish'); b.innerHTML = m; b.classList.add('kor'); clearTimeout(bildir.t); bildir.t = setTimeout(()=>b.classList.remove('kor'), 2600); }

/* ---------- sahnalar ---------- */
document.addEventListener('error', e=>{ const t = e.target; if(t && t.tagName === 'IMG'){ t.classList.add('rasm-yoq'); t.removeAttribute('src'); } }, true);
let joriyHodisa = null, detalFaol = false;
document.addEventListener('makon3d', e=>{
  if(e.detail.tur === 'detal'){ if(detalFaol) detalKarta(e.detail.tur2 || e.detail.turi || e.detail['tur'], e.detail); return; }
  if(joriyHodisa) joriyHodisa(e.detail);
});
function detalKarta(_, ev){
  const q = $('#popover'); if(!q) return;
  const tur = ev.tur === 'detal' ? ev.turD : ev.tur;
  const D = window.MAKON_DETAL || {};
  let k = (D[ev.turD] || {})[ev.nom];
  if(!k && ev.turD === 'organ' && ORGAN[ev.nom]) k = {nom:ORGAN[ev.nom][0], matn:ORGAN[ev.nom][1]};
  if(!k) return;
  q.innerHTML = `<div class="detal-k shisha"><button class="yop" aria-label="Yopish">${ikon('yopish',{w:14})}</button>
    <span class="ustki">${k.sarlavha2 || 'Ma’lumot'}</span><h3>${k.nom}</h3>
    ${k.jadval ? '<div class="detal-j">'+k.jadval.map(r=>'<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join('')+'</div>' : ''}
    ${k.matn ? '<p>'+k.matn+'</p>' : ''}${k.manba ? '<small>Manba: '+k.manba+'</small>' : ''}</div>`;
  $('.yop', q).onclick = ()=>{ q.innerHTML = ''; };
}
function sahnalarniYop(){ [...window._sahnalar.values()].forEach(s=>s.yopish()); joriyHodisa = null; detalFaol = false; }
function skriptYukla(src, tekshir){
  if(tekshir()) return Promise.resolve();
  return new Promise((ok, xato)=>{ const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = xato; document.body.appendChild(s); });
}
const MOL_IZOH = {
  H2:'<b>Vodorod, H₂.</b> Ikki atom bitta oddiy bog‘ bilan bog‘langan (bog‘ uzunligi ≈74 pm). Eng yengil gaz.',
  O2:'<b>Kislorod, O₂.</b> Atomlar qo‘sh bog‘ bilan bog‘langan (≈121 pm). Havo hajmining taxminan 21 % i.',
  N2:'<b>Azot, N₂.</b> Uch bog‘ (≈110 pm) — juda mustahkam, shuning uchun azot kam faol. Havo hajmining taxminan 78 % i.',
  HCl:'<b>Vodorod xlorid, HCl.</b> Qutbli kovalent bog‘: umumiy elektron jufti xlor tomonga siljigan. Suvdagi eritmasi — xlorid kislota.',
  C2H6:'<b>Etan, C₂H₆.</b> Faqat oddiy bog‘lar; har uglerod atrofida tetraedr (≈109,5°). Tabiiy gaz tarkibida uchraydi.',
  C2H4:'<b>Eten (etilen), C₂H₄.</b> C=C qo‘sh bog‘; molekula yassi, burchaklar ≈120°. O‘simliklarda mevaning pishishini tezlashtiruvchi gormon.',
  C2H2:'<b>Etin (atsetilen), C₂H₂.</b> C≡C uch bog‘; atomlar bir chiziqda (180°). Kislorodda yonganda juda issiq alanga beradi — metall payvandlashda ishlatiladi.',
  C6H6:'<b>Benzol, C₆H₆.</b> Yassi olti burchakli halqa; barcha C–C bog‘lar bir xil uzunlikda (≈140 pm), burchaklar 120° — aromatik tizim. Kanserogen modda.',
  CH3OH:'<b>Metanol, CH₃OH.</b> −OH guruh metil radikaliga bog‘langan. Qaynash harorati 64,7 °C. <b>Kuchli zahar</b> — oz miqdori ham ko‘rlikka olib keladi.',
  C2H5OH:'<b>Etanol, C₂H₅OH.</b> −OH guruh etil radikaliga bog‘langan. Qaynash harorati 78,4 °C; suv bilan istalgan nisbatda aralashadi.',
  H2O:'<b>Suv, H₂O.</b> Burchakli molekula, bog‘ burchagi 104,5°. Kislorodning bo‘linmagan elektron juftlari bog‘larni siqadi — molekula qutbli.',
  CO2:'<b>Karbonat angidrid, CO₂.</b> Ikki qo‘sh bog‘, atomlar bir chiziqda (180°) — molekula qutbsiz.',
  CH4:'<b>Metan, CH₄.</b> Tetraedr, burchak 109,5°. Tabiiy gazning asosiy qismi.',
  NH3:'<b>Ammiak, NH₃.</b> Uchburchak piramida, burchak taxminan 107°.',
  NaCl:'<b>Osh tuzi, NaCl.</b> Molekula emas — Na⁺ va Cl⁻ ionlaridan tuzilgan kristall panjara. Har ionni 6 ta qarama-qarshi ion o‘rab turadi.'
};
const ORGAN = {
  yurak:['Yurak','Tinch holatda daqiqada 60–100 marta uriladi; qonni katta va kichik qon aylanish doiralariga haydaydi.'],
  opka:['O‘pka','Gaz almashinuvi alveolalarda kechadi: kislorod qonga o‘tadi, karbonat angidrid chiqariladi.'],
  nafas:['Traxeya va bronxlar','Havo yo‘li: traxeya ikki bosh bronxga bo‘linadi, ular o‘pka ichida tobora mayda shoxlanadi.'],
  miya:['Bosh miya','Markaziy asab tizimining boshqaruv markazi.'],
  jigar:['Jigar','Modda almashinuvi, ozuqa zaxirasi va zararsizlantirish vazifalarini bajaradi. O‘t pufagi jigar ostida joylashgan.'],
  oshqozon:['Oshqozon','Ovqat mexanik va kimyoviy qayta ishlanadi; kislotali muhitda fermentlar ishlaydi.'],
  taloq:['Taloq','Qonni filtrlaydi, eskirgan eritrotsitlarni parchalaydi va immun javobda qatnashadi.'],
  buyrak:['Buyraklar','Qonni filtrlab siydik hosil qiladi; suv-tuz muvozanatini boshqaradi.'],
  ichak:['Ichaklar','Ingichka ichakda ozuqa moddalari so‘riladi, yo‘g‘on ichakda asosan suv so‘riladi.'],
  bez:['Oshqozon osti bezi','Hazm fermentlarini ichakka chiqaradi, insulin va glyukagon orqali qondagi qandni boshqaradi.']
};
window.MAKON_ORGAN = ORGAN;

async function sahnaQur(sahna, d, o){
  o = o || {};
  const tag = o.tag || document.createElement('div'), izoh = o.izoh || document.createElement('div');
  const yorliq = chap=>{ const a = document.createElement('span'); a.className = 'sahna-yorliq'; a.innerHTML = chap; sahna.append(a); };
  if(typeof THREE === 'undefined' || !window.MAKON3D){ izoh.innerHTML = '<span class="xat">3D kutubxona yuklanmadi.</span>'; return null; }
  const tur = o.tur || d.sahna;
  /* v3.15: yangi sahnalar reyestri — window.MAKON_SAHNA[tur] = async (sahna, {tag, izoh, yorliq, o, d, skriptYukla}) => api (window._sahnalar ga yozilgan) */
  if(window.MAKON_SAHNA && typeof MAKON_SAHNA[tur] === 'function'){
    const api = await MAKON_SAHNA[tur](sahna, {tag, izoh, yorliq, o, d, skriptYukla});
    if(!sahna.isConnected) return null;
    return window._sahnalar.get(sahna) || api || null;
  }
  if(tur === 'molekula'){
    yorliq('Kimyo · molekula modeli');
    MAKON3D.molekula3D(sahna, o.mol || 'H2O');
    if(o.tugmalar){
      o.tugmalar.forEach(([k, nom], i)=>{
        const b = document.createElement('button'); b.textContent = nom; b.dataset.mol = k; if(k === (o.mol || o.tugmalar[0][0])) b.classList.add('faol');
        b.onclick = ()=>{ [...tag.children].forEach(x=>x.classList.toggle('faol', x === b)); MAKON3D.molekula3D(sahna, k); izoh.innerHTML = MOL_IZOH[k] || ''; };
        tag.append(b);
      });
      izoh.innerHTML = MOL_IZOH[o.mol || 'H2O'] || '';
    }
  } else if(tur === 'fizika'){
    MAKON3D.fizika3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'biologiya'){
    sahna.innerHTML = '<div class="bosh-yuk">Anatomik model yuklanmoqda…</div>';
    try{ await skriptYukla('lib/anatomiya.js', ()=>window.MAKON_ANATOMIYA); }catch(e){ izoh.innerHTML = '<span class="xat">Anatomik model fayli topilmadi.</span>'; return null; }
    if(!sahna.isConnected) return null;
    sahna.innerHTML = '';
    MAKON3D.biologiya3D(sahna, tag, izoh, yorliq);
    const bapi = window._sahnalar.get(sahna);
    if(d.bio && bapi){
      Object.keys(d.bio.qatlamlar || {}).forEach(k=>bapi.qatlam && bapi.qatlam(k, !!d.bio.qatlamlar[k]));
      const ki = {kokrak:0, bosh:1, butun:2}[d.bio.korinish];
      const kb = sahna.querySelectorAll('.bio-korinish button'); if(ki !== undefined && kb[ki]) kb[ki].click();
    }
  } else if(tur === 'zanjir2'){
    MAKON3D.zanjir2(sahna, tag, izoh, yorliq);
  } else if(tur === 'astro'){
    sahna.innerHTML = '<div class="bosh-yuk">Quyosh sistemasi yuklanmoqda…</div>';
    try{ await skriptYukla('lib/sayyoralar.js', ()=>window.MAKON_SAYYORA_RASM); }catch(e){}
    if(!sahna.isConnected) return null;
    sahna.innerHTML = '';
    MAKON3D.quyosh3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'geometriya'){
    MAKON3D.geometriya3D(sahna, tag, izoh, yorliq, d.geo || {});
  } else if(tur === 'yer'){
    try{ await skriptYukla('lib/yer_teksturasi.js', ()=>window.MAKON_YER_TEKSTURA); }catch(e){}
    if(!sahna.isConnected) return null;
    MAKON3D.yer3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'fasllar'){
    try{ await skriptYukla('lib/sayyoralar.js', ()=>window.MAKON_SAYYORA_RASM); await skriptYukla('lib/yer_teksturasi.js', ()=>window.MAKON_YER_TEKSTURA); }catch(e){}
    if(!sahna.isConnected) return null;
    MAKON3D.fasllar3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'ipak'){
    try{ await skriptYukla('lib/ipak_xarita.js', ()=>window.MAKON_IPAK_XARITA); await skriptYukla('lib/makon3d_ipak.js', ()=>MAKON3D.ipak2D); }catch(e){}
    if(!sahna.isConnected) return null;
    MAKON3D.ipak2D(sahna, tag, izoh, yorliq, o.holat || {});
  } else if(tur === 'xarita'){
    try{ await skriptYukla('lib/tarix_xarita.js', ()=>window.MAKON_TARIX_XARITA); }catch(e){}
    if(!sahna.isConnected) return null;
    MAKON3D.xarita3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'piano'){
    MAKON3D.piano3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'oy'){
    try{ await skriptYukla('lib/sayyoralar.js', ()=>window.MAKON_SAYYORA_RASM); }catch(e){}
    if(!sahna.isConnected) return null;
    MAKON3D.oy3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'optika'){
    MAKON3D.optika3D(sahna, tag, izoh, yorliq);
  } else if(tur === 'funksiya'){
    MAKON3D.funksiya2D(sahna, tag, izoh, yorliq, Object.assign({}, d.sahnaSoz || {}, (d.bosqichlar && d.bosqichlar[0]) || {}));
  } else if(tur === 'mantiq'){
    MAKON3D.mantiq2D(sahna, tag, izoh, yorliq, Object.assign({}, d.sahnaSoz || {}));
  } else if(tur === 'davriy'){
    try{ await skriptYukla('lib/elementlar.js', ()=>window.MAKON_ELEMENT); }catch(e){ izoh.innerHTML = '<span class="xat">Elementlar fayli topilmadi.</span>'; return null; }
    if(!sahna.isConnected) return null;
    MAKON3D.davriy3D(sahna, tag, izoh, yorliq, Object.assign({}, d.sahnaSoz || {}));
  } else if(tur === 'harbiy'){
    yorliq('MAKON o‘quv modeli · soddalashtirilgan');
    const yl = document.createElement('div'); yl.className = 'q3-yorliqlar'; sahna.append(yl);
    const api = MAKON3D.harbiy3D(sahna, null, yl, {zoom:2.5});
    api.ajratQism = api.ajrat; api.ajrat = t=>api.hammasi(t > .5);
  } else if(tur === 'glb'){
    sahna.innerHTML = '<div class="bosh-yuk">3D model yuklanmoqda…</div>';
    const m = o.model || d.model;
    try{
      await skriptYukla('lib/GLTFLoader.js', ()=>THREE.GLTFLoader);
      await skriptYukla('modellar/js/'+m.fayl+'.js', ()=>(window.MAKON_GLB||{})[m.fayl]);
    }catch(e){
      if(d.zaxira){ sahna.innerHTML = ''; return sahnaQur(sahna, d, Object.assign({}, o, {tur:d.zaxira})); }
      sahna.innerHTML = '<div class="bosh-yuk">3D model hali qo‘shilmagan: '+esc(m.fayl)+'</div>'; return null;
    }
    if(!sahna.isConnected) return null;
    sahna.innerHTML = '';
    yorliq(esc(m.yorliq || '3D model'));
    const yl = document.createElement('div'); yl.className = 'glb-yorliqlar'; sahna.append(yl);
    const qm = (Array.isArray(m.qismlar) ? m.qismlar : d.qismlar) || [];
    const api = MAKON3D.glbSahna(sahna, m.fayl, Object.assign({yorliqlar:yl}, m.sozlama || {}, {qismlar:qm.map(q=>Object.assign({}, q, {tugun:(q.tugun||[]).map(t=>typeof t === 'string' && t[0] === '/' ? new RegExp(t.slice(1, t.lastIndexOf('/')), t.slice(t.lastIndexOf('/')+1)) : t)}))}));
    if(api) await api.tayyor;
  }
  return window._sahnalar.get(sahna) || null;
}

/* ---------- qobiq: yon menyu, yo'l, qidiruv ---------- */
function yonMenyu(yol){
  const rol = xotira.ol('rol', null), ism = xotira.ol('ism', '');
  const oqit = rol === 'oqituvchi';
  const havola = (h, ik, nom, qo)=>{ const [q1, q2] = nom.split('|'); return `<a href="${h}" class="${yol === h ? 'faol' : ''} ${qo||''}" title="${(q1 + (q2 || '')).trim()}">${ikon(ik)}<span>${q1}${q2 ? '<i class="mu">' + q2 + '</i>' : ''}</span></a>`; };
  const asosiy = TEL
    ? havola('#/fanlar','kitob','Fanlar') + havola('#/lab','kolba','Kimyo| laboratoriyasi') + havola('#/fizlab','chaqmoq','Fizika| laboratoriyasi') + havola('#/biolab','mikroskop','Biologiya| laboratoriyasi') + havola('#/natijalar','grafik','Natijalarim')
    : oqit
    ? havola('#/oqituvchi','foydalanuvchilar','Sinf paneli') + havola('#/fanlar','kitob','Darslar kutubxonasi') + havola('#/lab','kolba','Kimyo| laboratoriyasi') + havola('#/fizlab','chaqmoq','Fizika| laboratoriyasi') + havola('#/biolab','mikroskop','Biologiya| laboratoriyasi') + havola('#/ishlanmalar','hujjat','Dars ishlanmalari')
    : havola('#/','uy','Bosh sahifa') + havola('#/fanlar','kitob','Fanlar') + havola('#/lab','kolba','Kimyo| laboratoriyasi') + havola('#/fizlab','chaqmoq','Fizika| laboratoriyasi') + havola('#/biolab','mikroskop','Biologiya| laboratoriyasi') + havola('#/takror','kitobcha','Takrorlash| kartalari') + havola('#/musobaqa','olov','Musobaqa') + havola('#/natijalar','grafik','Natijalarim') + havola('#/xatolar','maqsad','Xatolar| ustida ishlash', xatoBank().length ? 'xb-bor' : '');
  const fanlar = FAN.map(f=>{
    const n = darsIds(f).length;
    return f.yopiq ? `<a class="yopiq" href="#/fanlar"><i class="nuqta" style="background:${f.rang}"></i><span>${f.nom}</span></a>`
      : `<a href="#/fan/${f.id}" class="${yol === '#/fan/'+f.id ? 'faol' : ''}"><i class="nuqta" style="background:${f.rang}"></i><span>${f.nom}</span><em class="son">${n}</em></a>`;
  }).join('');
  $('#yonMenyu').innerHTML = `
    <a class="logo" href="#/"><span class="bl"><svg viewBox="0 0 32 32" width="20" height="20"><path d="M16 3l11 6.4v13.2L16 29 5 22.6V9.4z" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 10l5.5 3.2v6.1L16 22.5l-5.5-3.2v-6.1z" fill="#fff"/></svg></span><div><b>MAKON</b><small>3D o‘quv makoni</small></div></a>
    <div class="menyu-s">Asosiy</div>
    <nav class="menyu">${asosiy}</nav>
    <div class="menyu-s">Fanlar</div>
    <nav class="menyu fanlar-m">${fanlar}</nav>
    <div class="yon-past">
      ${window.MAKON_SIFAT ? `<button class="sifat-tg ${MAKON_SIFAT.tejam ? 'yoq' : ''}" id="sifatTg" title="Zaif kompyuterda 3D ni tezlashtiradi: soyalar va shisha effektlari soddalashadi"><span class="ch"><i></i></span><span><b>Tejamkor rejim</b><small>${MAKON_SIFAT.tejam ? (MAKON_SIFAT.avto ? 'yoqilgan (avtomatik)' : 'yoqilgan') : 'zaif kompyuter uchun'}</small></span></button>` : ''}
      <div class="demo-karta"><b>DEMO VERSIYA</b>Server va hisoblar hali yo‘q — natijalar shu ${TEL ? 'telefonda. <a href="index.html?toliq=1" class="toliq-h">To‘liq versiya ↗</a>' : 'kompyuterda. <a href="#/mualliflar">Mualliflar va litsenziyalar</a>'}</div>
      <div class="foyd"><span class="avatar ${oqit ? 'o' : ''}">${oqit ? 'O‘' : esc((ism || 'U')[0].toUpperCase())}</span><div><b>${oqit ? 'O‘qituvchi' : esc(ism || 'O‘quvchi')}</b><span>${oqit ? NAMUNA.sinf + ' (namuna)' : 'O‘quvchi'}</span></div><button id="rolAlmash" title="Rolni almashtirish">${ikon('almash',{w:16})}</button></div>
    </div>`;
  $('#rolAlmash').onclick = ()=>{ xotira.yoz('rol', null); location.hash = '#/'; };
  if($('#sifatTg')) $('#sifatTg').onclick = ()=>MAKON_SIFAT.ornat(!MAKON_SIFAT.tejam);
}
function yolChiz(qismlar){
  $('#yol').innerHTML = [`<a href="#/" aria-label="Bosh sahifa">${ikon('uy',{w:15})}</a>`].concat(qismlar.map((q, i)=>i === qismlar.length - 1 ? '<b>'+q[0]+'</b>' : '<a href="'+q[1]+'">'+q[0]+'</a>')).join(ikon('oldinga',{w:13}));
}
const QIDIRUV = ()=>Object.keys(DARS).map(id=>{
  const d = DARS[id], f = fanOf(d);
  if(!f) return null;
  return {id, nom:d.nom, fan:f.nom, matn:(d.nom+' '+f.nom+' '+(d.qismlar||[]).map(q=>q.nom).join(' ')+' '+(d.bolimlar||[]).map(b=>b.sarlavha).join(' ')+' '+(d.kor.punktlar||[]).join(' ')).toLowerCase().replace(/<[^>]+>/g,'') + ' ' + (d.maqola||[]).map(m=>m.sarlavha).join(' ').toLowerCase()};
}).filter(Boolean).concat([
  {id:'lab', href:'#/lab', rasmY:'rasm/lab.webp', nom:'Virtual kimyo laboratoriyasi', fan:'Kimyo · laboratoriya', matn:'kimyo laboratoriya reaktiv reaksiya cho‘kma indikator alanga rangi kislota ishqor tuz vodorod kislorod karbonat ammiak yod kraxmal sirli eritma tajriba'},
  {id:'fizlab', href:'#/fizlab', rasmY:'rasm/fizlab.webp', nom:'Virtual fizika laboratoriyasi', fan:'Fizika · laboratoriya', matn:'fizika laboratoriya arximed kuchi itaruvchi kuch suzish zichlik dinamometr mayatnik tebranish davri kalorimetr issiqlik balansi harorat solishtirma issiqlik sig‘imi tajriba'},
  {id:'fizlab-om', href:'#/fizlab/om', rasmY:'rasm/fizlab.webp', nom:'Om qonuni — elektr zanjiri tajribasi', fan:'Fizika · laboratoriya', matn:'om qonuni tok kuchi kuchlanish qarshilik rezistor ampermetr voltmetr elektr zanjiri ketma-ket parallel ulash kalit elektron quvvat'},
  {id:'biolab', href:'#/biolab', rasmY:'rasm/biolab.webp', nom:'Virtual biologiya laboratoriyasi', fan:'Biologiya · laboratoriya', matn:'mikroskop okulyar obyektiv preparat piyoz po‘sti hujayra yadro qon eritrotsit leykotsit trombotsit og‘izcha ustitsa elodeya xloroplast tufelka infuzoriya bakteriya yod bo‘yash kattalashtirish'},
  {id:'fizlab-linza', href:'#/fizlab/linza', rasmY:'rasm/fizlab.webp', nom:'Linza va tasvir yasash — fizika tajribasi', fan:'Fizika · laboratoriya', matn:'linza yig‘uvchi sochuvchi fokus masofasi optik kuch dioptriya tasvir haqiqiy mavhum teskari to‘g‘ri yupqa linza formulasi lupa'},
  {id:'takror', href:'#/takror', rasmY:'', nom:'Takrorlash kartalari', fan:'Takrorlash', matn:'takrorlash kartalari lug‘at atama so‘z karta eslab qolish oraliqli takrorlash flashcard'},
  {id:'musobaqa', href:'#/musobaqa', rasmY:'', nom:'Fanlararo musobaqa', fan:'Musobaqa', matn:'musobaqa viktorina bellashuv vaqtli test rekord ball fanlararo olimpiada'},
  {id:'xatolar', href:'#/xatolar', rasmY:'', nom:'Xatolar ustida ishlash', fan:'Takrorlash', matn:'xatolar takrorlash noto‘g‘ri javoblar qayta yechish test'}
]);
/* xatoga chidamli qidiruv (v3.14): tutuq belgilari, lotin/kirill farqi, 1–2 harf xatosi */
const KIR = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'x','ц':'s','ч':'ch','ш':'sh','щ':'sh','ъ':'','ы':'i','ь':'','э':'e','ю':'yu','я':'ya','ў':'o','қ':'q','ғ':'g','ҳ':'h'};
const qNorm = t=>String(t).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[а-яёўқғҳ]/g, c=>KIR[c] !== undefined ? KIR[c] : c).replace(/[‘’ʻʼ'`]/g, '').replace(/[^a-z0-9 ]+/g, ' ');
function lev(a, b, maks){
  if(Math.abs(a.length - b.length) > maks) return maks + 1;
  let old = Array.from({length:b.length + 1}, (_, i)=>i);
  for(let i = 1; i <= a.length; i++){
    const yangi = [i]; let eng = i;
    for(let j = 1; j <= b.length; j++){ yangi[j] = Math.min(old[j] + 1, yangi[j - 1] + 1, old[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); eng = Math.min(eng, yangi[j]); }
    if(eng > maks) return maks + 1; old = yangi;
  }
  return old[b.length];
}
let qIndeks = null;
function qBall(x, q){
  const soz = q.split(' ').filter(Boolean); if(!soz.length) return 0;
  let jami = 0;
  for(const w of soz){
    if(x.n.includes(w)){ jami += x.nomN.includes(w) ? 3 : 2; continue; }
    const ruxsat = w.length < 4 ? 0 : w.length < 7 ? 1 : 2;
    if(!ruxsat) return 0;
    let top = false;
    for(const t of x.sozlar){ if(Math.abs(t.length - w.length) <= ruxsat && lev(w, t, ruxsat) <= ruxsat){ top = true; break; } if(t.length > w.length && lev(w, t.slice(0, w.length), ruxsat) <= ruxsat - (ruxsat > 1 ? 1 : 0)){ top = true; break; } }
    if(!top) return 0; jami += 1;
  }
  return jami;
}
function qidiruvUlash(){
  const inp = $('#qidir'), nat = $('#qidirNat');
  let tanlov = 0, royxat = [];
  const chiz = ()=>{
    const q = qNorm(inp.value).trim().replace(/\s+/g, ' ');
    if(!q){ nat.classList.remove('ochiq'); return; }
    if(!qIndeks) qIndeks = QIDIRUV().map(x=>{ const n = qNorm(x.matn + ' ' + x.nom), nomN = qNorm(x.nom); return Object.assign({}, x, {n, nomN, sozlar:[...new Set(n.split(' ').filter(w=>w.length > 2))]}); });
    royxat = qIndeks.map(x=>[x, qBall(x, q)]).filter(a=>a[1] > 0).sort((a, b)=>b[1] - a[1]).map(a=>a[0]).slice(0, 7);
    tanlov = 0;
    nat.innerHTML = royxat.length ? royxat.map((x, i)=>`<a href="${x.href || '#/dars/' + x.id + '/kor'}" class="${i === 0 ? 'tanlangan' : ''}"><img src="${x.href ? x.rasmY : rasm(x.id)}" alt=""><span><b>${x.nom}</b><span>${x.fan}</span></span></a>`).join('') : '<div class="bosh">Hech narsa topilmadi</div>';
    nat.classList.add('ochiq');
  };
  inp.oninput = chiz;
  inp.onkeydown = e=>{
    if(e.key === 'Enter' && royxat[tanlov]){ location.hash = royxat[tanlov].href || '#/dars/'+royxat[tanlov].id+'/kor'; inp.value = ''; nat.classList.remove('ochiq'); inp.blur(); }
    if(e.key === 'Escape'){ inp.value = ''; nat.classList.remove('ochiq'); inp.blur(); }
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){ e.preventDefault(); tanlov = (tanlov + (e.key === 'ArrowDown' ? 1 : -1) + royxat.length) % Math.max(1, royxat.length); $$('a', nat).forEach((a, i)=>a.classList.toggle('tanlangan', i === tanlov)); }
  };
  inp.onblur = ()=>setTimeout(()=>nat.classList.remove('ochiq'), 150);
  document.addEventListener('keydown', e=>{ if(e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)){ e.preventDefault(); inp.focus(); } });
}

/* ---------- kirish ---------- */
function kirish(){
  ilova.className = 'toliq';
  ilova.innerHTML = `
  <section class="kirish-q">
    <div class="kirish-chap">
      <a class="logo" href="#/"><span class="bl"><svg viewBox="0 0 32 32" width="20" height="20"><path d="M16 3l11 6.4v13.2L16 29 5 22.6V9.4z" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 10l5.5 3.2v6.1L16 22.5l-5.5-3.2v-6.1z" fill="#fff"/></svg></span><div><b>MAKON</b><small>3D o‘quv makoni</small></div></a>
      <div class="kirish-matn">
        <span class="ustki"><b>●</b> Maktab · litsey · kollej · universitet</span>
        <h1 style="margin-top:16px">Har bir fanni<br><em style="white-space:nowrap">sinab o‘rganing.</em></h1>
        <p class="lid">Molekula, elektr zanjiri, inson a’zolari, avtomat mexanizmi — 3D modelda aylantiriladi, qismlarga ajratiladi, rentgenda ko‘riladi. So‘ng amaliy topshiriq va tushuntirishli test.</p>
        <div class="rollar">
          <button class="rol-karta" data-rol="oquvchi"><span class="ik">${ikon('oquvchi',{w:24})}</span><span><b>O‘quvchi yoki talaba</b><span>Darslar, amaliyot, test va yordamchi</span></span>${ikon('oldinga')}</button>
          <div class="ism-q" id="ismQ"><input id="ism" maxlength="24" autocomplete="off" placeholder="Ismingizni yozing"><button class="tg a" id="kir">Kirish ${ikon('oldinga',{w:16})}</button></div>
          <button class="rol-karta o" data-rol="oqituvchi"><span class="ik">${ikon('oqituvchi',{w:24})}</span><span><b>O‘qituvchi</b><span>Vazifa, sinf natijalari, dars ishlanmasi, proyektor</span></span>${ikon('oldinga')}</button>
        </div>
      </div>
      <div class="muassasa"><span>${ikon('kub',{w:15})} ${Object.keys(DARS).length} ta 3D dars · ${FAN.filter(f=>!f.yopiq).length} ta fan</span><span>${ikon('hujjat',{w:15})} ${Object.keys(DARS).filter(k=>DARS[k].ishlanma).length} ta dars ishlanmasi</span><span>${ikon('ogoh',{w:15})} Internetsiz ishlaydi</span></div>
    </div>
    <div class="kirish-ong">
      <div class="setka"></div>
      <div class="yuqori"><span class="belgi shisha"><i style="color:#7ff0dd"></i>Jonli 3D · sudrab aylantiring</span><span class="belgi shisha">NaCl kristall panjarasi</span></div>
      <div class="kirish-sahna" id="kirishSahna"></div>
      <div class="kirish-galereya">${[['harbiy-ak74','AK-74 · qismlarga ajratish'],['bio-azolar','Inson a’zolari'],['fizika-om','Om qonuni'],['harbiy-texnika','Harbiy texnika']].map(([id, n])=>`<div><img src="${rasm(id)}" alt=""><span>${n}</span></div>`).join('')}</div>
    </div>
  </section>`;
  if(window.MAKON3D && typeof THREE !== 'undefined') MAKON3D.molekula3D($('#kirishSahna'), 'NaCl', {zoom:1.15});
  $$('[data-rol]').forEach(b=>b.onclick = ()=>{
    if(b.dataset.rol === 'oqituvchi'){ xotira.yoz('rol', 'oqituvchi'); otish('#/oqituvchi'); return; }
    $('#ismQ').style.display = 'flex'; $('#ism').focus();
  });
  const kir = ()=>{ const v = $('#ism').value.trim(); if(!v){ $('#ism').focus(); return; } xotira.yoz('ism', v); xotira.yoz('rol', 'oquvchi'); otish('#/'); };
  /* kirish sahifasi ko'pincha #/ da ochiladi — manzil o'zgarmasa hashchange bo'lmaydi, shuning uchun yonalt() ni o'zimiz chaqiramiz */
  function otish(h){ if(location.hash === h || (h === '#/' && (location.hash === '' || location.hash === '#'))){ yonalt(); scrollTo(0, 0); } else location.hash = h; }
  $('#kir').onclick = kir; $('#ism').onkeydown = e=>{ if(e.key === 'Enter') kir(); };
}

/* ---------- kartalar ---------- */
function darsKarta(id, o){
  o = o || {};
  const d = DARS[id], f = fanOf(d), n = natijalar()[id];
  const I = d.ishlanma;
  return `<a class="dars-k" href="#/dars/${id}/kor">
    <div class="rasm"><img src="${rasm(id)}" alt="" loading="lazy"><span class="belgi shisha"><i style="color:${f.rang}"></i>${f.nom.split(' ')[0]}</span>${n ? `<span class="belgi yashil ong">${ikon('ok',{w:12,q:3})} ${n.ball}/${n.jami}</span>` : ''}</div>
    <div class="ichi">
      ${I ? '<small>'+I.sinf+'</small>' : ''}
      <b>${d.nom}</b>
      ${o.qisqa ? '<p>'+o.qisqa+'</p>' : ''}
      <div class="meta"><span>${ikon('kub',{w:13})} 3D</span><span>${ikon('savol',{w:13})} ${d.test.length} savol</span>${d.qismlar ? '<span>'+ikon('qatlam',{w:13})+' '+d.qismlar.length+' qism</span>' : ''}${d.maqola ? '<span>'+ikon('kitobcha',{w:13})+' '+Math.max(1, Math.round(d.maqola.reduce((a, m)=>a + m.xatboshilar.join(' ').split(/\s+/).length, 0) / 180))+' daq o‘qish</span>' : ''}${I ? '<span>'+ikon('hujjat',{w:13})+' ishlanma</span>' : ''}</div>
    </div></a>`;
}
function fanKarta(f){
  const ids = darsIds(f), n = natijalar();
  const tugagan = ids.filter(id=>n[id]).length;
  if(f.yopiq) return `<div class="fan-k yopiq" style="--rang:${f.rang}"><div class="kollaj"><span class="ik">${ikon(f.ik,{w:20})}</span></div><div class="ichi"><b>${f.nom}</b><small>${f.izoh}</small><div class="past"><span class="belgi">keyingi bosqich</span></div></div></div>`;
  return `<a class="fan-k" href="#/fan/${f.id}" style="--rang:${f.rang}"><div class="kollaj"><span class="ik">${ikon(f.ik,{w:20})}</span>${ids.slice(0, 2).map(id=>'<img src="'+rasm(id)+'" alt="">').join('')}</div>
    <div class="ichi"><b>${f.nom}</b><small>${f.izoh}</small><div class="past"><div class="chiziq-p"><i style="width:${ids.length ? tugagan / ids.length * 100 : 0}%"></i></div><span>${tugagan}/${ids.length}</span></div></div></a>`;
}

/* ---------- bosh sahifa ---------- */
function bosh(){
  if(TEL) return boshTel();
  const ism = xotira.ol('ism', 'O‘quvchi'), n = natijalar();
  let vid = xotira.ol('vazifa', 'bio-azolar'); if(!DARS[vid]) vid = Object.keys(DARS)[0];
  const v = DARS[vid], vf = fanOf(v);
  const ids = Object.keys(DARS), bajarilgan = Object.keys(n).length;
  const ortacha = bajarilgan ? Math.round(Object.values(n).reduce((a, x)=>a + x.ball / x.jami, 0) / bajarilgan * 100) : 0;
  const amaliyot = Object.values(n).filter(x=>x.amaliyot).length;
  const bugun = new Date(); const kunlar = ['Ya','Du','Se','Ch','Pa','Ju','Sh'];
  const hafta = [...Array(7)].map((_, i)=>{ const k = new Date(bugun); k.setDate(bugun.getDate() - 6 + i); const s = k.toDateString(); return {k, soni:Object.values(n).filter(x=>new Date(x.sana).toDateString() === s).length}; });
  const maxS = Math.max(1, ...hafta.map(h=>h.soni));
  const davom = ids.filter(id=>!n[id]).concat(ids.filter(id=>n[id])).slice(0, 4);
  const fanStat = FAN.filter(f=>!f.yopiq).map(f=>{ const fi = darsIds(f); return [f, fi.filter(id=>n[id]).length, fi.length]; });
  const yutuq = [
    ['yulduz','Birinchi dars', bajarilgan >= 1],
    ['maqsad','Xatosiz amaliyot', Object.values(n).some(x=>x.amaliyot && !x.xato)],
    ['medal','100% test', Object.values(n).some(x=>x.ball === x.jami)],
    ['kitob','3 ta fan', new Set(Object.keys(n).map(id=>DARS[id].fan)).size >= 3],
    ['qalqon','Harbiy tayyorgarlik', darsIds(FAN.find(f=>f.id === 'harbiy')).every(id=>n[id])],
    ['olov','Barcha darslar', bajarilgan === ids.length]
  ];
  const oy = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'];
  ilova.innerHTML = `
  <section class="hero">
    <div class="setka"></div>
    <div>
      <span class="ustki">${bugun.getDate()}-${oy[bugun.getMonth()]} · ${['yakshanba','dushanba','seshanba','chorshanba','payshanba','juma','shanba'][bugun.getDay()]}</span>
      <h1>Salom, ${esc(ism)}! 👋</h1>
      <p>${bajarilgan ? 'Yaxshi ketyapsiz. Bugun yana bitta mavzuni sinab o‘rganamizmi?' : 'Birinchi darsdan boshlaymiz: 3D modelni aylantiring, qismlarga ajrating, keyin o‘zingizni sinang.'}</p>
      <div class="hero-stat"><div><b>${bajarilgan}<small style="font-size:15px;opacity:.6">/${ids.length}</small></b><span>dars tugatildi</span></div><div><b>${bajarilgan ? ortacha+'%' : '—'}</b><span>test o‘rtachasi</span></div><div><b>${amaliyot}</b><span>amaliyot bajarildi</span></div></div>
    </div>
    <div class="hero-vazifa">
      <div class="rasm"><img src="${rasm(vid)}" alt=""><span class="belgi shisha"><i style="color:#ffd36b"></i>O‘qituvchi vazifasi</span></div>
      <div class="ichi"><span><b>${v.nom}</b><span>${vf.nom} · ~15 daqiqa · ${v.test.length} savol</span></span><a class="tg oq kichik" href="#/dars/${vid}/kor">${n[vid] ? 'Qayta' : 'Boshlash'} ${ikon('oldinga',{w:14})}</a></div>
    </div>
  </section>
  <div class="dash-g">
    <div class="karta">
      <div class="karta-sar"><h3>Davom ettirish</h3><a href="#/fanlar" class="tg o kichik">Hammasi ${ikon('oldinga',{w:14})}</a></div>
      <div class="dars-g">${davom.map(id=>darsKarta(id)).join('')}</div>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="karta">
        <div class="karta-sar"><h3>Haftalik faollik</h3><span>tugatilgan darslar</span></div>
        <div class="faollik">${hafta.map((h, i)=>`<div class="${i === 6 ? 'bugun' : ''}"><div class="ust">${h.soni ? '<em style="bottom:calc('+(h.soni / maxS * 100)+'% + 4px)">'+h.soni+'</em>' : ''}<i class="${h.soni ? '' : 'bosh'}" style="height:${h.soni ? h.soni / maxS * 100 : 4}%"></i></div><span>${kunlar[h.k.getDay()]}</span></div>`).join('')}</div>
      </div>
      <div class="karta">
        <div class="karta-sar"><h3>Fanlar bo‘yicha</h3><span>${bajarilgan}/${ids.length}</span></div>
        <div class="halqa-q"><div class="halqa" style="--p:${Math.round(bajarilgan / ids.length * 100)}"><div><span><b>${Math.round(bajarilgan / ids.length * 100)}%</b><small>kurs</small></span></div></div>
          <div class="royxat-m">${fanStat.map(([f, a, b])=>`<div><i style="background:${f.rang}"></i>${f.nom.split(' ')[0]}<b>${a}/${b}</b></div>`).join('')}</div></div>
        <div class="yutuqlar">${yutuq.map(([ik, nom, bor])=>`<div class="yutuq ${bor ? 'bor' : ''}"><span class="i">${ikon(ik,{w:16})}</span>${nom}</div>`).join('')}</div>
      </div>
    </div>
  </div>
  <div class="bolim-sar"><div><h2>Fanlar</h2><p>Har fanda 3D darslar, amaliy topshiriqlar va testlar</p></div><a href="#/fanlar">Barcha fanlar →</a></div>
  <div class="fan-g">${FAN.map(fanKarta).join('')}</div>`;
}
function fanlar(){
  const jami = Object.keys(DARS).length;
  ilova.innerHTML = `<span class="ustki">Darslar kutubxonasi</span><h1 class="sarlavha">Fanlar va darslar</h1>
  <p class="lid">${jami} ta to‘liq 3D dars: ko‘rish, amaliy topshiriq va tushuntirishli test. Qolgan mavzular fan o‘qituvchilari bilan birga keyingi bosqichda tayyorlanadi.</p>
  <div class="bolim-sar"><h2>Fanlar</h2></div>
  <div class="fan-g">${FAN.map(fanKarta).join('')}</div>
  <div class="bolim-sar"><div><h2>Sinflar bo‘yicha darslar</h2><p>Sinfni tanlang — shu sinf dasturidagi barcha fanlar darslari</p></div></div>
  <div class="sinf-filtr" role="tablist">${['hammasi',5,6,7,8,9,10,11].map(k=>`<button data-s="${k}" class="${String(k) === String(xotira.ol('sinfFiltr', 'hammasi')) ? 'faol' : ''}">${k === 'hammasi' ? 'Hammasi' : k + '-sinf'}</button>`).join('')}</div>
  <div id="sinfDarslar"></div>
  <p class="manba-iz" style="margin-top:22px"><a href="#/mualliflar">3D modellar mualliflari va litsenziyalar →</a></p>`;
  const chiz = k=>{
    const ids = Object.keys(DARS).filter(id=>{ if(k === 'hammasi') return true; const [a, b] = sinfOraliq(DARS[id]); return a <= +k && +k <= b; });
    const guruh = {}; ids.forEach(id=>{ const f = fanOf(DARS[id]); if(f) (guruh[f.id] = guruh[f.id] || []).push(id); });
    $('#sinfDarslar').innerHTML = ids.length ? FAN.filter(f=>guruh[f.id]).map(f=>`<div class="sinf-sar"><span style="color:${f.rang}">${f.nom}</span><i></i><em>${guruh[f.id].length} ta dars</em></div><div class="dars-g">${guruh[f.id].sort((a, b)=>sinfRaqam(DARS[a]) - sinfRaqam(DARS[b])).map(id=>darsKarta(id)).join('')}</div>`).join('')
      : '<p class="lid">Bu sinf uchun hozircha dars yo‘q.</p>';
  };
  $$('.sinf-filtr button').forEach(b=>b.onclick = ()=>{ xotira.yoz('sinfFiltr', b.dataset.s); $$('.sinf-filtr button').forEach(x=>x.classList.toggle('faol', x === b)); chiz(b.dataset.s); });
  chiz(String(xotira.ol('sinfFiltr', 'hammasi')));
}
function fanSahifa(id){
  const f = FAN.find(x=>x.id === id); if(!f || f.yopiq){ location.hash = '#/fanlar'; return; }
  const ids = darsIds(f), n = natijalar();
  ilova.innerHTML = `
  <section class="fan-banner" style="--rang:${f.rang}">
    <div class="setka"></div>
    <div>
      <span class="ustki">Fan</span>
      <h1>${f.nom}</h1>
      <p>${f.tavsif || f.izoh}</p>
      <div class="statlar-b"><div><b>${ids.length}</b><span>3D dars</span></div><div><b>${f.mavzular.length}</b><span>mavzu rejada</span></div><div><b>${ids.filter(i=>DARS[i].ishlanma).length}</b><span>dars ishlanmasi</span></div><div><b>${ids.filter(i=>n[i]).length}</b><span>tugatilgan</span></div></div>
    </div>
    <div class="rasmlar">${ids.slice(0, 4).map(i=>'<img src="'+rasm(i)+'" alt="">').join('')}</div>
  </section>
  <div class="bolim-sar"><div><h2>Mavzular</h2><p>Sinflar bo‘yicha, o‘quv dasturi tartibida</p></div></div>
  ${(()=>{
    const q = f.mavzular.map((m, i)=>({m, i, s:m.dars && DARS[m.dars] ? sinfRaqam(DARS[m.dars]) : (m.sinf || 99)})).sort((a, b)=>a.s - b.s || a.i - b.i);
    const guruh = []; q.forEach(x=>{ const g = guruh[guruh.length - 1]; if(g && g.s === x.s) g.r.push(x); else guruh.push({s:x.s, r:[x]}); });
    return guruh.map(g=>`<div class="sinf-sar"><span>${g.s === 99 ? 'Sinf belgilanmagan' : g.s + '-sinf'}</span><i></i><em>${g.r.length} ta mavzu</em></div>
      <div class="dars-g">${g.r.map(({m, i})=>m.dars && DARS[m.dars] ? darsKarta(m.dars, {qisqa:m.qisqa}) :
      `<div class="dars-k yopiq"><div class="ichi"><span class="qulf">${ikon('qulf',{w:18})}</span><small>${m.sinf ? m.sinf + '-sinf' : String(i+1).padStart(2,'0')+'-mavzu'}</small><b>${m.nom}</b><p>${m.qisqa || ''}</p><div class="meta"><span class="belgi">keyingi bosqich</span></div></div></div>`).join('')}</div>`).join('');
  })()}`;
  if(id === 'kimyo') $('.fan-banner').insertAdjacentHTML('afterend', labBanner());
  if(id === 'fizika') $('.fan-banner').insertAdjacentHTML('afterend', fizlabBanner());
  if(id === 'biologiya') $('.fan-banner').insertAdjacentHTML('afterend', biolabBanner());
}

/* ---------- DARS (immersiv) ---------- */
const QADAM = [['kor','Ko‘ring'],['sina','Sinab ko‘ring'],['test','Tekshiring']];
let darsHolat = {};

function darsTepa(id, d, qadam){
  const f = fanOf(d), oqit = xotira.ol('rol') === 'oqituvchi', tartib = QADAM.findIndex(q=>q[0] === qadam);
  return `<div class="dars3-tepa">
    <span class="ik" style="background:${f.rang}">${ikon(f.ik,{w:20})}</span>
    <div class="nom"><h1>${d.nom}</h1><div class="meta"><span class="belgi">${f.nom}</span>${d.ishlanma ? '<span class="belgi">'+d.ishlanma.sinf+'</span>' : ''}<span class="belgi">${ikon('savol',{w:12})} ${d.test.length} savol</span>${d.qismlar ? '<span class="belgi">'+ikon('qatlam',{w:12})+' '+d.qismlar.length+' qism</span>' : ''}</div></div>
    <div class="qadam-seg">${QADAM.map(([k, nm], i)=>(i ? ikon('oldinga',{w:14}) : '')+`<button data-q="${k}" class="${k === qadam ? 'faol' : ''} ${i < tartib ? 'bajarildi' : ''}"><i>${i < tartib ? '✓' : i+1}</i>${nm}</button>`).join('')}</div>
    <div class="ong">${d.ishlanma && !TEL ? `<a class="tg o kichik" href="#/ishlanma/${id}">${ikon('hujjat',{w:15})}<span>Ishlanma</span></a>` : ''}${oqit ? `<a class="tg o kichik" href="#/proyektor/${id}">${ikon('proyektor',{w:15})}<span>Proyektor</span></a>` : ''}</div>
  </div>`;
}

async function dars(id, qadam){
  const d = DARS[id]; if(!d){ location.hash = '#/'; return; }
  if(!darsHolat[id]) darsHolat[id] = {amaliyot:false, xato:0};
  const f = fanOf(d);
  yolChiz([[f.nom, '#/fan/'+f.id], [d.qisqaNom || d.nom, '#/dars/'+id+'/kor'], [QADAM.find(q=>q[0] === qadam)[1], '']]);
  if(qadam === 'test') return test(id);
  ilova.className = 'toliq';
  const kor = qadam === 'kor';
  ilova.innerHTML = `<div class="dars3">
    ${darsTepa(id, d, qadam)}
    <section class="sahna3" id="markaz">
      <div class="setka"></div>
      <div class="sahna" id="sahna"></div>
      ${kor && d.bosqichlar ? '<div class="xronologiya shisha" id="xron"></div>' : ''}
      ${kor && d.rejimlar ? '<div class="rejim-pill shisha" id="rejimlar"></div>' : ''}
      ${kor && d.modellar ? '<div class="model-tanlov" id="modelT"></div>' : ''}
      <div class="boshq-panel shisha bosh" id="boshq"><div class="sahna-tag" id="tag"></div></div>
      <div class="asboblar shisha" id="asboblar"></div>
      <div id="popover"></div>
      <button class="panel-och shisha" id="panelOch">${ikon('kitobcha',{w:15})} Ma’lumot paneli</button>
      <button class="yord-fab" id="yordFab"><span class="av">${ikon('robot',{w:18})}</span>Yordamchi<i id="yordNuqta"></i></button>
      <div class="yord-oyna" id="yordamchi"></div>
    </section>
    <div class="sahna-past" id="sahnaPast"></div>
    <div class="dok" id="dok"><div class="dok-tab" id="dokTab"></div><div class="dok-ichi" id="dokIchi"></div></div>
  </div>`;
  $$('.qadam-seg button').forEach(b=>b.onclick = ()=>location.hash = '#/dars/'+id+'/'+b.dataset.q);
  mobilJoy();
  yordamchi(d);
  const izoh = document.createElement('div'); izoh.className = 'izoh-q'; izoh.id = 'izoh';
  if(kor){
    detalFaol = true;
    dokKor(d, izoh);
    let api = await sahnaQur($('#sahna'), d, {mol:(d.bosqichlar && d.bosqichlar[0] && d.bosqichlar[0].mol) || (d.kor.molekulalar && d.kor.molekulalar[0][0]) || 'H2O', tugmalar:d.kor.molekulalar, tag:$('#tag'), izoh});
    boshqKorsat();
    asboblar(api, d);
    if(api) rejimlarVaBosqichlar(api, d);
    if(d.modellar){
      const t = $('#modelT');
      t.innerHTML = '<span class="ust">Model</span>';
      d.modellar.forEach((m, i)=>{
        const b = document.createElement('button'); b.textContent = m.nom; if(i === 0) b.classList.add('faol');
        b.onclick = async ()=>{
          $$('button', t).forEach(x=>x.classList.toggle('faol', x === b));
          const s = $('#sahna'); const eski = window._sahnalar.get(s); if(eski) eski.yopish(); s.innerHTML = '';
          $('#asboblar').innerHTML = ''; $('#popover').innerHTML = '';
          api = await sahnaQur(s, d, {tur:m.tur || 'glb', model:{fayl:m.fayl, yorliq:m.yorliq, qismlar:m.qismlar === 'asosiy' ? null : (m.qismlar || []), sozlama:(d.model||{}).sozlama}, tag:document.createElement('div'), izoh});
          asboblar(api, d); if(api) rejimlarVaBosqichlar(api, d);
          izoh.innerHTML = '<b>'+m.nom+'.</b> '+(m.yorliq || '');
        };
        t.append(b);
      });
    }
  } else {
    await amaliyot(id, d, izoh);
    if(TEL){ const dk = $('#dok'), mk = $('#markaz'); if(dk && mk){ mk.parentElement.insertBefore(dk, mk); $('.dars3').classList.add('tel-sina'); } } /* v3.21b: telefonda topshiriq sahnaning TEPASIDA */
  }
}

/* v3.21: telefon bosh sahifasi — faqat fanlar va davom ettirish */
function boshTel(){
  const ism = xotira.ol('ism', 'O‘quvchi'), n = natijalar();
  const ids = Object.keys(DARS), bajarilgan = Object.keys(n).length;
  const davom = ids.filter(id=>!n[id]).slice(0, 2);
  ilova.innerHTML = `
  <section class="tel-bosh">
    <h1>Salom, ${esc(ism)}!</h1>
    <p>Fanni tanlang — mavzuni 3D da ko‘ring, sinab ko‘ring, tekshiring.</p>
    <div class="tel-stat"><span><b>${bajarilgan}</b> / ${ids.length} dars tugatildi</span><a href="#/natijalar">Natijalarim ${ikon('oldinga',{w:13})}</a></div>
  </section>
  <div class="bolim-sar"><div><h2>Fanlar</h2></div></div>
  <div class="tel-fanlar">${FAN.filter(f=>!f.yopiq).map(f=>{ const fi = darsIds(f), t = fi.filter(id=>n[id]).length; return `<a class="tel-fan" href="#/fan/${f.id}"><span class="ik" style="background:${f.rang}">${ikon(f.ik,{w:22})}</span><b>${f.nom}</b><small>${fi.length} dars${t ? ' · ' + t + ' tugatildi' : ''}</small>${ikon('oldinga',{w:16})}</a>`; }).join('')}</div>
  <div class="bolim-sar"><div><h2>Laboratoriyalar</h2></div></div>
  <div class="tel-fanlar">
    <a class="tel-fan" href="#/lab"><span class="ik" style="background:#39d9c8">${ikon('kolba',{w:22})}</span><b>Kimyo laboratoriyasi</b><small>reaktivlar, reaksiyalar</small>${ikon('oldinga',{w:16})}</a>
    <a class="tel-fan" href="#/fizlab"><span class="ik" style="background:#ffc94d">${ikon('chaqmoq',{w:22})}</span><b>Fizika laboratoriyasi</b><small>5 tajriba</small>${ikon('oldinga',{w:16})}</a>
    <a class="tel-fan" href="#/biolab"><span class="ik" style="background:#ff8a7a">${ikon('mikroskop',{w:22})}</span><b>Biologiya laboratoriyasi</b><small>mikroskop, 6 preparat</small>${ikon('oldinga',{w:16})}</a>
  </div>
  ${davom.length ? `<div class="bolim-sar"><div><h2>Davom ettirish</h2></div></div><div class="dars-g">${davom.map(id=>darsKarta(id)).join('')}</div>` : ''}
  <p class="tel-izoh">Bu — telefon uchun soddalashtirilgan ko‘rinish. Barcha imkoniyatlar (takrorlash, musobaqa, o‘qituvchi paneli) — <a href="index.html?toliq=1">to‘liq versiyada</a>.</p>`;
}

function boshqKorsat(){ const t = $('#tag'); if(t) $('#boshq').classList.toggle('bosh', !t.children.length); }
/* telefonda (≤760px) boshqaruv paneli va asboblar sahna OSTIGA ko‘chadi — 3D ni yopmasin; to‘liq ekranda sahna ichiga qaytadi */
const MOBIL = window.matchMedia('(max-width:760px)');
function mobilJoy(){
  const m = $('#markaz'), p = $('#sahnaPast'); if(!m || !p) return;
  const past = MOBIL.matches && document.fullscreenElement !== m;
  const b = $('#boshq'), a = $('#asboblar'), pop = $('#popover');
  [b, a].forEach(e=>{ if(!e) return; if(past && e.parentElement !== p) p.append(e); else if(!past && e.parentElement !== m) m.insertBefore(e, pop); });
  p.classList.toggle('bor', past);
}
MOBIL.addEventListener ? MOBIL.addEventListener('change', mobilJoy) : MOBIL.addListener(mobilJoy);
document.addEventListener('fullscreenchange', mobilJoy);

function dokUlash(tablar, boshlangich){
  const tab = $('#dokTab'), ichi = $('#dokIchi'), dok = $('#dok');
  tab.innerHTML = tablar.map((t, i)=>`<button data-t="${i}" class="${i === (boshlangich||0) ? 'faol' : ''}">${ikon(t.ik,{w:15})}${t.nom}${t.son ? '<span class="son">'+t.son+'</span>' : ''}</button>`).join('') + `<button class="yig" title="Yig‘ish">${ikon('past',{w:16})}</button>`;
  ichi.innerHTML = '';
  tablar.forEach((t, i)=>{ const p = document.createElement('div'); p.className = 'dok-q'; p.dataset.p = i; if(i !== (boshlangich||0)) p.style.display = 'none'; if(typeof t.ichi === 'string') p.innerHTML = t.ichi; else t.ichi(p); ichi.append(p); });
  $$('[data-t]', tab).forEach(b=>b.onclick = ()=>{
    dok.classList.remove('yigiq');
    $$('[data-t]', tab).forEach(x=>x.classList.toggle('faol', x === b));
    $$('.dok-q', ichi).forEach(p=>p.style.display = p.dataset.p === b.dataset.t ? '' : 'none');
  });
  const d3 = dok.closest('.dars3');
  const panelAlmash = yop=>{ d3.classList.toggle('panel-yopiq', yop); dok.classList.toggle('yigiq', yop); try{ localStorage.setItem('makon:panel', yop ? '0' : '1'); }catch(e){} [60, 280].forEach(ms=>setTimeout(()=>window.dispatchEvent(new Event('resize')), ms)); };
  $('.yig', tab).onclick = ()=>panelAlmash(!d3.classList.contains('panel-yopiq'));
  const och = $('#panelOch'); if(och) och.onclick = ()=>panelAlmash(false);
  let saqlangan = null; try{ saqlangan = localStorage.getItem('makon:panel'); }catch(e){}
  /* telefonda panel sahna ostida — doim ochiq boshlanadi (kompyuterdagi «yopiq» tanlovi bu yerga o‘tmaydi) */
  if(saqlangan === '0' && !MOBIL.matches) panelAlmash(true);
}
function dokTab(nom){ const b = $$('#dokTab [data-t]').find(x=>x.textContent.startsWith(nom)); if(b) b.click(); }

/* darsdan virtual laboratoriya tajribasiga havola (v3.17) */
const DARS_LAB = {
  'fizika-om':['#/fizlab/om', 'Om qonuni — elektr zanjiri', 'Kuchlanish va qarshilikni o‘zgartiring, ampermetr va voltmetr bilan o‘lchang, I(U) grafigini chizing.'],
  'fizika-ulash':['#/fizlab/om', 'Ketma-ket va parallel ulash', 'Ikki rezistorni ulab, U₁ + U₂ = U va I = I₁ + I₂ ni o‘zingiz o‘lchab tekshiring.'],
  'fizika-sinish':['#/fizlab/linza', 'Linza va tasvir yasash', 'Fokus masofasi va buyum masofasini o‘zgartirib, tasvir qayerda, qanday (haqiqiy/mavhum, teskari/to‘g‘ri) hosil bo‘lishini o‘zingiz yasang; 1/F = 1/d + 1/f ni tekshiring.'],
  'bio-hujayra':['#/biolab/piyoz', 'Mikroskop: piyoz po‘sti hujayrasi', 'Preparat tayyorlang, yod bilan bo‘yang, ×40 dan ×400 gacha kattalashtirib hujayra devori, yadro va vakuolani toping.'],
  'bio-dnk':['#/biolab/piyoz', 'Yadroni mikroskopda toping', 'Bo‘yalmagan preparatda yadro ko‘rinmaydi — yod tomizib, ×400 da yadroni toping va o‘lchang.'],
  'bio-fotosintez':['#/biolab/elodeya', 'Elodeya: xloroplastlar va sitoplazma oqimi', 'Barg hujayrasida yashil xloroplastlarni va ularning sitoplazma bilan harakatini 10 soniya kuzating.'],
  'bio-qon-aylanish':['#/biolab/qon', 'Qon surtmasi: eritrotsit, leykotsit, trombotsit', 'Qon surtmasini ×400 da ko‘ring, uch element turini toping, eritrotsit diametrini okulyar mikrometr bilan o‘lchang.']
};
function dokKor(d, izoh){
  const k = d.kor, tablar = [];
  tablar.push({nom:'Tavsif', ik:'info', ichi:p=>{
    const t = document.createElement('div'); t.className = 'tavsif-k';
    t.innerHTML = `<span class="ustki">Mavzu</span><h2 style="margin-top:6px">${k.sarlavha}</h2><p>${k.matn}</p>`;
    t.append(izoh); p.append(t);
    const g = document.createElement('div'); g.className = 'fakt-g';
    g.innerHTML = (k.punktlar||[]).map((x, i)=>`<div class="fakt"><span class="i">${String(i+1).padStart(2,'0')}</span><span>${x}</span></div>`).join('');
    p.append(g);
    const lb = DARS_LAB[Object.keys(DARS).find(x=>DARS[x] === d)];
    if(lb) p.insertAdjacentHTML('beforeend', `<a class="dars-lab" href="${lb[0]}"><span class="ustki">Laboratoriyada sinab ko‘ring</span><b>${lb[1]}</b><small>${lb[2]}</small></a>`);
  }});
  const ID = Object.keys(DARS).find(x=>DARS[x] === d);
  if(d.maqola && d.maqola.length){
    const soz = d.maqola.reduce((a, m)=>a + m.xatboshilar.join(' ').split(/\s+/).length, 0);
    tablar.push({nom:'O‘qish', ik:'kitobcha', son:Math.max(1, Math.round(soz / 180))+' daq', ichi:`<div class="oqish-dok">${d.maqola.map((m, i)=>`<section><span class="ustki">${String(i+1).padStart(2,'0')}</span><h3>${m.sarlavha}</h3>${m.xatboshilar.map(x=>'<p>'+x+'</p>').join('')}</section>`).join('')}</div><div class="oqish-yon"><a class="tg a kichik" href="#/oqish/${ID}">${ikon('kitobcha',{w:14})} To‘liq o‘qish sahifasi</a><span>${soz} so‘z · ${d.maqola.length} bo‘lim</span></div>`});
  }
  if(d.qismlar && d.qismlar.length) tablar.push({nom:'Qismlar', ik:'qatlam', son:d.qismlar.length, ichi:`<div class="qism-g" id="qismG">${d.qismlar.map(q=>`<button class="qism-k" data-r="${q.raqam}"><span class="n">${q.raqam}</span><span><b>${q.nom}</b>${q.vazifa ? '<span>'+q.vazifa+'</span>' : ''}${(q.tugun||[]).length ? '<em>● 3D modelda ajraladi</em>' : ''}</span></button>`).join('')}</div>`});
  const jadvallar = (d.bolimlar||[]);
  if(jadvallar.length) tablar.push({nom:d.fan === 'harbiy' ? 'Texnik ma’lumot' : 'Qo‘shimcha', ik:'grafik', son:jadvallar.length, ichi:jadvallar.map(b=>`<div class="jadval-k ${b.punktlar ? 'keng' : ''}"><h4><i></i>${b.sarlavha}</h4>${b.jadval ? '<table>'+b.jadval.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join('')+'</table>' : ''}${b.punktlar ? (b.tartibli ? '<ol>' : '<ul>')+b.punktlar.map(x=>'<li>'+x+'</li>').join('')+(b.tartibli ? '</ol>' : '</ul>') : ''}${b.matn ? '<p>'+b.matn+'</p>' : ''}</div>`).join('')});
  if(d.formulalar && d.formulalar.length) tablar.push({nom:'Formulalar', ik:'grafik', son:d.formulalar.length, ichi:d.formulalar.map(f=>`<div class="formula-k"><code>${f[0]}</code><span>${f[1]}</span></div>`).join('')});
  const lug = d.lugat || (d.ishlanma && d.ishlanma.lugat);
  if(lug && lug.length) tablar.push({nom:'Lug‘at', ik:'til', son:lug.length, ichi:`<div class="lugat-g">${lug.map(l=>`<div class="lugat-k"><b>${l[0]}</b><span>${l[1]}</span></div>`).join('')}</div>`});
  if(d.qiziqarli && d.qiziqarli.length) tablar.push({nom:'Qiziqarli', ik:'yulduz', son:d.qiziqarli.length, ichi:d.qiziqarli.map(q=>`<div class="qiziq-k"><span class="i">${ikon('yulduz',{w:15})}</span><span>${q}</span></div>`).join('')});
  if(d.xavfsizlik) tablar.push({nom:'Xavfsizlik', ik:'ogoh', son:d.xavfsizlik.length, ichi:d.xavfsizlik.map(x=>`<div class="xavf-k"><span class="i">${ikon('ogoh',{w:16})}</span><span>${x}</span></div>`).join('')});
  tablar.push({nom:'Manba', ik:'kitobcha', ichi:`<div class="manba-k"><p><b>Manba:</b> ${d.manba || 'MAKON demo mazmuni; fan o‘qituvchisi tekshiruvi kutilmoqda.'}</p><p style="margin-top:10px">${d.ishlanma ? `<a class="tg o kichik" href="#/ishlanma/${Object.keys(DARS).find(x=>DARS[x] === d)}">${ikon('hujjat',{w:14})} Dars ishlanmasini ochish</a> ` : ''}<a class="tg o kichik" href="#/mualliflar">${ikon('kitobcha',{w:14})} 3D modellar litsenziyasi</a></p></div>`});
  dokUlash(tablar);
}

function popover(q){
  const p = $('#popover'); if(!p) return;
  if(!q){ p.innerHTML = ''; return; }
  p.innerHTML = `<div class="qism-popover shisha"><button class="yop" aria-label="Yopish">${ikon('yopish',{w:14})}</button><div class="ust"><span class="n">${q.raqam}</span><b>${q.nom}</b></div>${q.vazifa ? '<p>'+q.vazifa+'</p>' : ''}</div>`;
  $('.yop', p).onclick = ()=>{ p.innerHTML = ''; };
}

function asboblar(api, d){
  const q = $('#asboblar'); if(!q) return;
  q.innerHTML = '';
  if(!api){ q.style.display = 'none'; return; }
  q.style.display = '';
  const tugma = (ik, sar, fn)=>{ const b = document.createElement('button'); b.innerHTML = ikon(ik,{w:17}); b.dataset.t = sar; b.setAttribute('aria-label', sar); b.onclick = ()=>fn(b); q.append(b); return b; };
  const ajr = ()=>{ const s = document.createElement('span'); s.className = 'ajr'; q.append(s); };
  if(api.aylanish) tugma(api.aylanish() ? 'pauza' : 'ijro', 'Aylanish', b=>{ const v = !api.aylanish(); api.aylanish(v); b.innerHTML = ikon(v ? 'pauza' : 'ijro',{w:17}); });
  tugma('tikla', 'Boshlang‘ich ko‘rinish', ()=>api.tikla && api.tikla());
  ajr();
  tugma('minus', 'Uzoqlashtirish', ()=>api.zoomla && api.zoomla(1.2));
  tugma('plus', 'Yaqinlashtirish', ()=>api.zoomla && api.zoomla(1/1.2));
  ajr();
  if(api.rentgen) tugma('rentgen', 'Rentgen', b=>{ const v = !b.classList.contains('faol'); b.classList.toggle('faol', v); api.rentgen(v); const rq = $('#rejimlar'); if(rq) $$('button', rq).forEach(c=>c.classList.toggle('faol', v ? c.dataset.rejim === 'rentgen' : c.dataset.rejim === 'butun')); });
  const yl = $('#sahna .glb-yorliqlar, #sahna .q3-yorliqlar');
  if(yl) tugma('yorliq', 'Yozuvlar', b=>{ const v = yl.style.display === 'none'; yl.style.display = v ? '' : 'none'; b.classList.toggle('faol', !v); });
  if(!api.zoomla) [...q.children].slice(-3).forEach(x=>x.remove());
  tugma('ekran', 'To‘liq ekran', ()=>{ const m = $('#markaz'); if(!document.fullscreenElement && m.requestFullscreen) m.requestFullscreen(); else if(document.exitFullscreen) document.exitFullscreen(); });
}

function rejimlarVaBosqichlar(api, d){
  const rq = $('#rejimlar');
  if(rq){
    const NOM = {butun:['kub','Butun'], rentgen:['rentgen','Rentgen'], ajrat:['ixcham','Qismlarga ajratish']};
    rq.innerHTML = d.rejimlar.map((r, i)=>`<button class="${i === 0 ? 'faol' : ''}" data-rejim="${r}">${ikon(NOM[r][0],{w:15})}${NOM[r][1]}</button>`).join('');
    $$('button', rq).forEach(c=>c.onclick = ()=>{
      $$('button', rq).forEach(x=>x.classList.toggle('faol', x === c));
      const r = c.dataset.rejim;
      if(api.rentgen) api.rentgen(r === 'rentgen');
      if(api.ajrat) api.ajrat(r === 'ajrat' ? 1 : 0);
      const rb = $$('#asboblar button').find(b=>b.dataset.t === 'Rentgen'); if(rb) rb.classList.toggle('faol', r === 'rentgen');
      if(r === 'ajrat' && api.aylanish) api.aylanish(false);
      if(r === 'ajrat' && d.qismlar) dokTab('Qismlar');
    });
  }
  const qismTanla = r=>{
    $$('#qismG .qism-k').forEach(x=>x.classList.toggle('faol', +x.dataset.r === r));
    if(api.belgila) api.belgila(r);
    popover((d.qismlar||[]).find(x=>x.raqam === r));
  };
  $$('#qismG .qism-k').forEach(b=>b.onclick = ()=>qismTanla(+b.dataset.r));
  joriyHodisa = ev=>{
    if(ev.tur === 'glb-qism' && ev.raqam){ const q = (d.qismlar||[]).find(x=>x.nom === ev.nom) || (d.qismlar||[]).find(x=>x.raqam === ev.raqam); if(q){ dokTab('Qismlar'); qismTanla(q.raqam); } }
  };
  const x = $('#xron');
  if(x){
    let i = 0;
    const qoll = ()=>{
      const b = d.bosqichlar[i];
      if(b.ajrat !== undefined && api.ajratQism) (d.qismlar||[]).forEach(q=>api.ajratQism(q.raqam, (b.ajrat || []).includes(q.raqam)));
      else if(b.ajratHammasi !== undefined && api.ajrat) api.ajrat(b.ajratHammasi);
      if(api.belgila) api.belgila(b.qism || 0);
      if(b.rentgen !== undefined && api.rentgen) api.rentgen(b.rentgen);
      if(b.mol && window.MAKON3D){ MAKON3D.molekula3D($('#sahna'), b.mol); $$('#tag [data-mol]').forEach(x=>x.classList.toggle('faol', x.dataset.mol === b.mol)); const iz = $('#izoh'); if(iz && MOL_IZOH[b.mol]) iz.innerHTML = MOL_IZOH[b.mol]; }
      if(api.holat && ['rejim','sayyora','shakl','qatlam','fasl','davr','nota','faza','muhit','yonalish','burchak','funk','son','darvoza','element','oila','yol','shahar'].some(k=>b[k] !== undefined)) api.holat(b);
      if(api.holat && b.holat && typeof b.holat === 'object') api.holat(b.holat);
      if(b.korinish){ const ki = {kokrak:0, bosh:1, butun:2}[b.korinish]; const kb = $$('#sahna .bio-korinish button'); if(ki !== undefined && kb[ki]) kb[ki].click(); }
      if(b.azo && ORGAN[b.azo]){ const iz = $('#izoh'); if(iz) iz.innerHTML = '<b>'+ORGAN[b.azo][0]+'.</b> '+ORGAN[b.azo][1]; popover({raqam:'●', nom:ORGAN[b.azo][0], vazifa:ORGAN[b.azo][1]}); }
      popover(b.qism ? (d.qismlar||[]).find(q=>q.raqam === b.qism) : null);
      chiz();
    };
    const chiz = ()=>{
      const yig = x.classList.contains('yigiq');
      x.innerHTML = `<div class="sar"><span>Bosqichlar · ${i+1}/${d.bosqichlar.length}</span><button title="Yig‘ish">${ikon('orqa',{w:14})}</button></div>
        <ol>${d.bosqichlar.map((b, j)=>`<li class="${j === i ? 'faol' : j < i ? 'otdi' : ''}"><button data-j="${j}"><span class="n">${j < i ? '✓' : j+1}</span><span><b>${b.sarlavha}</b><span class="m">${b.matn}</span></span></button></li>`).join('')}</ol>
        <div class="nav"><button data-n="-1">${ikon('orqa',{w:14})} Oldingi</button><button class="a" data-n="1">Keyingi ${ikon('oldinga',{w:14})}</button></div>`;
      if(yig) x.classList.add('yigiq');
      $('.sar button', x).onclick = ()=>{ x.classList.toggle('yigiq'); x.classList.toggle('ochiq-m'); };
      $$('[data-j]', x).forEach(b=>b.onclick = ()=>{ i = +b.dataset.j; qoll(); });
      $$('[data-n]', x).forEach(b=>b.onclick = ()=>{ const k = i + +b.dataset.n; if(k >= 0 && k < d.bosqichlar.length){ i = k; qoll(); } });
    };
    if(($('#markaz') || {}).clientWidth < 1000) x.classList.add('yigiq');
    chiz();
  }
}

/* ---------- YORDAMCHI ---------- */
const OLLAMA = 'http://127.0.0.1:11434';
let aiHolat = null;
async function aiTekshir(){
  if(aiHolat !== null) return aiHolat;
  try{
    const c = new AbortController(); const t = setTimeout(()=>c.abort(), 900);
    const r = await fetch(OLLAMA + '/api/tags', {signal:c.signal}); clearTimeout(t);
    const j = await r.json(); const m = (j.models || []).map(x=>x.name);
    const afzal = xotira.ol('ai_model', null);
    aiHolat = m.length ? {model:(afzal && m.includes(afzal)) ? afzal : m[0]} : false;
  }catch(e){ aiHolat = false; }
  return aiHolat;
}
const normal = s=>String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[‘’ʻʼ`']/g, '').replace(/[^a-zа-яё0-9\s]/gi, ' ').replace(/\s+/g, ' ').trim();
const ildiz = w=>w.length > 5 ? w.slice(0, Math.max(5, w.length - 3)) : w;
function bilimBazasi(d){
  const b = [];
  const add = (sarlavha, matn, kalit)=>b.push({sarlavha, matn, soz:new Set(normal((kalit||'')+' '+sarlavha+' '+matn).split(' ').filter(w=>w.length > 2).map(ildiz))});
  add(d.nom, d.kor.matn + ' ' + (d.kor.punktlar||[]).join(' '), 'nima haqida mavzu dars');
  (d.bolimlar||[]).forEach(x=>add(x.sarlavha, (x.matn||'') + ' ' + (x.punktlar||[]).join('; ') + ' ' + (x.jadval||[]).map(r=>r[0]+': '+r[1]).join('; ')));
  (d.qismlar||[]).forEach(q=>add(q.nom, q.vazifa || '', 'qism vazifasi nima'));
  (d.test||[]).forEach(t=>add(t.s, t.v[t.t] + '. ' + t.izoh));
  (d.yordamchi||[]).forEach(x=>add(x.s, x.j, (x.kalit||[]).join(' ')));
  if(d.xavfsizlik) add('Xavfsizlik qoidalari', d.xavfsizlik.join(' '), 'xavfsizlik ehtiyot qoida');
  if(d.sahna === 'biologiya') Object.keys(ORGAN).forEach(k=>add(ORGAN[k][0], ORGAN[k][1], k+' vazifasi nima qiladi'));
  return b;
}
function qidir(baza, savol){
  const s = normal(savol).split(' ').filter(w=>w.length > 2).map(ildiz);
  let eng = null, ball = 0;
  baza.forEach(x=>{ const b = s.filter(w=>x.soz.has(w)).length; if(b > ball){ ball = b; eng = x; } });
  return ball >= 1 ? eng : null;
}
function darsMatni(d){
  const q = [d.nom, d.kor.sarlavha, d.kor.matn, ...(d.kor.punktlar||[])];
  (d.bolimlar||[]).forEach(x=>q.push(x.sarlavha+': '+(x.matn||'')+' '+(x.punktlar||[]).join('; ')+' '+(x.jadval||[]).map(r=>r[0]+' — '+r[1]).join('; ')));
  (d.qismlar||[]).forEach(x=>q.push('Qism '+x.raqam+'. '+x.nom+': '+(x.vazifa||'')));
  (d.test||[]).forEach(t=>q.push('Savol: '+t.s+' Javob: '+t.v[t.t]+'. '+t.izoh));
  (d.xavfsizlik||[]).forEach(x=>q.push('Xavfsizlik: '+x));
  return matnSof(q.join('\n'));
}
function yordamchi(d){
  const q = $('#yordamchi'), fab = $('#yordFab');
  const baza = bilimBazasi(d), tarix = [];
  q.innerHTML = `
    <div class="yord-tepa"><span class="av">${ikon('robot',{w:20})}</span><span><b>Yordamchi</b><small id="aiHol"><i></i>tekshirilmoqda…</small></span>
      <span class="tug"><button id="yTozala" title="Suhbatni tozalash">${ikon('tozalash',{w:16})}</button><button id="yYop" title="Yopish">${ikon('yopish',{w:16})}</button></span></div>
    <div class="xabarlar" id="xabarlar"></div>
    <div class="takliflar" id="takliflar" style="background:var(--panel2)"></div>
    <div class="yord-past" style="background:var(--panel2)">
      <div class="yord-kirit"><textarea id="ySavol" rows="1" placeholder="Mavzu bo‘yicha savol bering…"></textarea><button id="yYubor" aria-label="Yuborish">${ikon('yubor',{w:16})}</button></div>
      <div class="yord-izoh" id="yIzoh"></div>
    </div>`;
  fab.onclick = ()=>{ q.classList.add('ochiq'); fab.style.display = 'none'; setTimeout(()=>$('#ySavol').focus(), 50); };
  $('#yYop').onclick = ()=>{ q.classList.remove('ochiq'); fab.style.display = ''; };
  const xb = $('#xabarlar');
  const xabar = (kim, html, izoh)=>{ const e = document.createElement('div'); e.className = 'xabar '+kim; e.innerHTML = html + (izoh ? '<small>'+izoh+'</small>' : ''); xb.append(e); xb.scrollTop = xb.scrollHeight; return e; };
  const salom = ()=>xabar('bot', `Salom! Men <b>«${d.qisqaNom || d.nom}»</b> darsi bo‘yicha yordamchiman. Qism nomi, texnik ko‘rsatkich yoki test savoli haqida so‘rang.`);
  salom();
  const takliflar = [
    ['info','Bu nima?', ()=>javobBer('Bu dars nima haqida?', ()=>'<b>'+d.nom+'.</b> '+d.kor.matn)],
    ['qatlam','Qisqacha', ()=>javobBer('Qisqacha tushuntir', ()=>'<b>Asosiy fikrlar:</b><ul>'+(d.kor.punktlar||[]).map(p=>'<li>'+p+'</li>').join('')+'</ul>')],
    ['maqsad','Meni sina', ()=>sina()]
  ];
  if(d.xavfsizlik) takliflar.push(['ogoh','Xavfsizlik', ()=>javobBer('Xavfsizlik qoidalari', ()=>'<ul>'+d.xavfsizlik.map(x=>'<li>'+x+'</li>').join('')+'</ul>')]);
  $('#takliflar').innerHTML = '';
  takliflar.forEach(([ik, n, fn])=>{ const b = document.createElement('button'); b.innerHTML = ikon(ik,{w:13})+n; b.onclick = fn; $('#takliflar').append(b); });
  $('#yTozala').onclick = ()=>{ xb.innerHTML = ''; tarix.length = 0; salom(); };
  aiTekshir().then(ai=>{
    const h = $('#aiHol'), nq = $('#yordNuqta'); if(!h) return;
    if(ai){ h.innerHTML = '<i class="on"></i>Lokal AI · '+esc(ai.model); nq.className = 'on'; $('#yIzoh').textContent = 'Javob shu kompyuterdagi AI modeldan, dars matni asosida. Muhim faktni darslikdan tekshiring.'; }
    else { h.innerHTML = '<i></i>Oflayn · dars ma’lumotlari'; $('#yIzoh').textContent = 'AI model ulanmagan: javoblar faqat shu darsning tekshirilgan matnidan olinadi.'; }
  });
  function javobBer(savol, fn){ xabar('men', esc(savol)); const k = xabar('bot yozmoqda', '<span></span><span></span><span></span>'); setTimeout(()=>{ k.remove(); xabar('bot', fn()); }, 420); }
  function sina(){
    const t = (d.test||[])[Math.floor(Math.random() * (d.test||[]).length)]; if(!t) return;
    xabar('men', 'Meni sina');
    const e = xabar('bot', '<b>'+t.s+'</b><div class="takliflar">'+t.v.map((v, j)=>'<button data-j="'+j+'">'+v+'</button>').join('')+'</div>');
    $$('button', e).forEach(b=>b.onclick = ()=>{
      $$('button', e).forEach(x=>x.disabled = true);
      const ok = +b.dataset.j === t.t;
      xabar('bot', (ok ? '✅ <b>To‘g‘ri!</b> ' : '❌ <b>To‘g‘ri javob: '+t.v[t.t]+'.</b> ') + t.izoh);
    });
  }
  async function yubor(){
    const inp = $('#ySavol'), savol = inp.value.trim(); if(!savol) return;
    inp.value = ''; xabar('men', esc(savol));
    const ai = await aiTekshir();
    const kut = xabar('bot yozmoqda', '<span></span><span></span><span></span>');
    if(ai){
      tarix.push({role:'user', content:savol});
      try{
        const r = await fetch(OLLAMA + '/api/chat', {method:'POST', body:JSON.stringify({model:ai.model, stream:false, options:{temperature:.2},
          messages:[{role:'system', content:'Sen MAKON ta’lim platformasining yordamchisisan. Faqat o‘zbek tilida (lotin yozuvida), qisqa va aniq javob ber. Faqat quyidagi DARS MATNI asosida javob ber; matnda yo‘q narsani to‘qima — "Bu dars materialida yo‘q, o‘qituvchingizdan so‘rang" de. Qurol yoki portlovchi moddani tayyorlash, o‘zgartirish bo‘yicha ko‘rsatma berma.\n\nDARS MATNI:\n'+darsMatni(d)}, ...tarix.slice(-6)]})});
        const j = await r.json(); const m = (j.message && j.message.content || '').trim();
        tarix.push({role:'assistant', content:m});
        kut.remove(); xabar('bot', esc(m).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'), 'lokal AI · '+esc(ai.model));
        return;
      }catch(e){ aiHolat = false; }
    }
    await new Promise(r=>setTimeout(r, 350));
    kut.remove();
    const t = qidir(baza, savol);
    if(t) xabar('bot', '<b>'+t.sarlavha+'</b><br>'+t.matn, 'dars ma’lumotlaridan');
    else xabar('bot', 'Bu savolga shu dars materialida javob topmadim. Savolni boshqacha yozib ko‘ring (masalan, qism nomi bilan) yoki o‘qituvchingizdan so‘rang.');
  }
  $('#yYubor').onclick = yubor;
  $('#ySavol').onkeydown = e=>{ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); yubor(); } };
}

/* ---------- SINAB KO'R ---------- */
async function amaliyot(id, d, izoh){
  const a = d.amaliyot, H = darsHolat[id];
  let i = 0, xato = 0;
  const tops = a.topshiriqlar;
  dokUlash([{nom:'Topshiriq', ik:'maqsad', ichi:p=>{
    p.innerHTML = `<div class="topshiriq-k"><div class="sanoq" id="sanoq"></div><div class="shart" id="shart"></div><div class="progress-q" id="prog"></div><div class="holat" id="holat">Sahnada bajaring — natija avtomatik tekshiriladi.</div></div>
      <div class="amal-ong"><div id="maxsus"></div><span class="xato-s">Xatolar: <b id="xatoS">0</b></span><div><a class="tg ${H.amaliyot ? 'a' : 'o'}" id="testga" href="#/dars/${id}/test">Testga o‘tish ${ikon('oldinga',{w:15})}</a></div></div>`;
    $('.amal-ong', p).insertBefore(izoh, $('.xato-s', p));
  }}, {nom:'Tavsif', ik:'info', ichi:`<div class="tavsif-k"><h2>${d.kor.sarlavha}</h2><p>${d.kor.matn}</p></div><div class="fakt-g">${(d.kor.punktlar||[]).map((x, i)=>`<div class="fakt"><span class="i">${String(i+1).padStart(2,'0')}</span><span>${x}</span></div>`).join('')}</div>`}]);
  const yangila = ()=>{
    const jami = tops ? tops.length : 1;
    $('#sanoq').textContent = a.sarlavha + (tops ? ' · '+Math.min(i+1, jami)+'/'+jami : '');
    if(tops) $('#shart').innerHTML = tops[i] ? tops[i].shart : 'Hammasi bajarildi!';
    $('#prog').innerHTML = tops ? tops.map((_, j)=>'<i class="'+(j < i ? 'ok' : j === i ? 'hozir' : '')+'"></i>').join('') : '';
    $('#xatoS').textContent = xato;
  };
  const holat = (sinf, m)=>{ const h = $('#holat'); if(h){ h.className = 'holat '+(sinf||''); h.innerHTML = m; } const x = $('#xatoS'); if(x) x.textContent = xato; };
  const tugadi = ()=>{
    H.amaliyot = true; H.xato = xato;
    yangila(); holat('togri', '<b>Amaliyot bajarildi!</b> ' + (xato ? xato+' ta xato bilan.' : 'Birorta ham xatosiz.') + ' Endi test bilan tekshiring.');
    const t = $('#testga'); if(t) t.className = 'tg a';
    bildir('✓ Amaliyot bajarildi');
  };
  yangila();
  const sahna = $('#sahna'), tag = $('#tag');

  if(a.tur === 'kimyo'){
    const api = await sahnaQur(sahna, d, {tur:'molekula', mol:'H2O', tag, izoh}); asboblar(api, d); boshqKorsat();
    izoh.innerHTML = 'Ikkita elementni tanlang. To‘g‘ri juftlik tanlansa, molekula sahnada paydo bo‘ladi.';
    const EL = [['H','Vodorod','#e8edf8'],['O','Kislorod','#ff8a7a'],['C','Uglerod','#aab3cc'],['N','Azot','#8fa6ff'],['Na','Natriy','#c9a8ff'],['Cl','Xlor','#8fe3a3']];
    $('#maxsus').innerHTML = '<div class="el-tugmalar"></div>';
    const et = $('#maxsus .el-tugmalar');
    let tanlov = [];
    EL.forEach(([e, nom, rang])=>{
      const b = document.createElement('button'); b.textContent = e; b.title = nom; b.style.background = rang;
      b.onclick = ()=>{
        if(!tops[i]) return;
        if(tanlov.length >= 2) tanlov = [];
        tanlov.push(e);
        [...et.children].forEach(x=>x.classList.toggle('tanlangan', tanlov.includes(x.textContent)));
        if(tanlov.length < 2){ holat('', '<b>'+nom+'</b> tanlandi. Ikkinchi elementni tanlang.'); return; }
        const t = tops[i];
        const togri = tanlov.slice().sort().join() === t.juft.slice().sort().join();
        tanlov = []; [...et.children].forEach(x=>x.classList.remove('tanlangan'));
        if(togri){ MAKON3D.molekula3D(sahna, t.mol); izoh.innerHTML = MOL_IZOH[t.mol] || ''; i++; if(i >= tops.length) tugadi(); else { yangila(); holat('togri', '<b>To‘g‘ri!</b> Keyingi topshiriq.'); } }
        else { xato++; holat('xato', '<b>Bu juftlik mos emas.</b> Molekula tarkibidagi elementlarni eslang.'); }
      };
      et.append(b);
    });
  }
  else if(a.tur === 'fizika'){
    const api = await sahnaQur(sahna, d, {tag, izoh}); asboblar(api, d); boshqKorsat();
    let taymer = null;
    joriyHodisa = ev=>{
      if(ev.tur !== 'zanjir' || !tops[i]) return;
      const t = tops[i]; clearTimeout(taymer);
      if(ev.kuydi && t.tekshir === 'P'){ xato++; holat('xato', '<b>Lampa kuydi!</b> Quvvat '+son(ev.P, 1)+' Vt — 55 Vt dan oshmasin.'); return; }
      const ok = t.tekshir === 'I' ? Math.abs(ev.I - t.qiymat) < .005 : (ev.P > t.min && ev.P <= t.max);
      if(ok) taymer = setTimeout(()=>{ if(!sahna.isConnected) return; i++; if(i >= tops.length) tugadi(); else { yangila(); holat('togri', '<b>To‘g‘ri!</b> I = '+son(ev.I, 2)+' A. Keyingi topshiriq.'); } }, 700);
      else holat('', 'Hozir: I = <b>'+son(ev.I, 2)+' A</b>, P = <b>'+son(ev.P, 1)+' Vt</b>. Sahnadagi slayderlarni suring.');
    };
    $('#maxsus').innerHTML = '<div class="fakt"><span class="i">'+ikon('chaqmoq',{w:14})+'</span><span><b>I = U / R</b> — kuchlanish va qarshilik slayderlari sahnaning pastida.</span></div>';
  }
  else if(a.tur === 'biologiya'){
    const api = await sahnaQur(sahna, d, {tag, izoh}); asboblar(api, d); boshqKorsat();
    if(api && api.qatlam){ api.qatlam('teri', false); api.qatlam('mushak', false); api.qatlam('azo', true); }
    joriyHodisa = ev=>{
      if(ev.tur !== 'azo' || !tops[i]) return;
      if(ev.nom === tops[i].azo){ i++; if(i >= tops.length) tugadi(); else { yangila(); holat('togri', '<b>To‘g‘ri — '+ORGAN[ev.nom][0].toLowerCase()+'.</b> Keyingi a’zo.'); } }
      else { xato++; holat('xato', 'Bu — <b>'+(ORGAN[ev.nom] ? ORGAN[ev.nom][0].toLowerCase() : ev.nom)+'</b>. Modelni aylantiring yoki skeletni o‘chiring.'); }
    };
    $('#maxsus').innerHTML = '<div class="fakt"><span class="i">'+ikon('yurak',{w:14})+'</span><span>A’zoni <b>sahnada bosing</b>. Qatlamlarni pastdagi panelda yoqib-o‘chirish mumkin.</span></div>';
  }
  else if(a.tur === 'shart'){
    const api = await sahnaQur(sahna, d, {tag, izoh}); asboblar(api, d); boshqKorsat();
    const tek = tops.map(t=>{ try{ return new Function('ev', 'return (' + t.kod + ');'); }catch(e){ return ()=>false; } });
    let taymer = null;
    joriyHodisa = ev=>{
      const t = tops[i]; if(!t || ev.tur !== t.hodisa) return;
      let ok = false; try{ ok = !!tek[i](ev); }catch(e){}
      clearTimeout(taymer);
      if(ok){
        taymer = setTimeout(()=>{ if(!sahna.isConnected) return; const iz = t.izoh || ''; i++; if(i >= tops.length){ tugadi(); if(iz) holat('togri', '<b>Amaliyot bajarildi!</b> '+iz); } else { yangila(); holat('togri', (/^To‘g‘ri/.test(iz) ? '' : '<b>To‘g‘ri!</b> ')+iz); } }, ev.tur === 'zanjir2' ? 650 : 150);
      } else if(ev.tur === 'sayyora' || ev.tur === 'atom' || ev.tur === 'glb-qism' || ev.tur === 'element' || ev.tur === 'ipak-shahar'){ xato++; holat('xato', '<b>Bu emas.</b> Yana urinib ko‘ring.'); }
      else if(ev.tur === 'zanjir2') holat('', 'Hozir: <b>'+(ev.rejim === 'ketma' ? 'ketma-ket' : 'parallel')+'</b>, R = <b>'+son(ev.Rum, 2)+' Ω</b>, I = <b>'+son(ev.I, 2)+' A</b>'+(ev.rejim === 'parallel' ? ' (I₁ = '+son(ev.I1, 2)+', I₂ = '+son(ev.I2, 2)+')' : '')+'.');
    };
    $('#maxsus').innerHTML = '<div class="fakt"><span class="i">'+ikon('maqsad',{w:14})+'</span><span>Topshiriqni <b>3D sahnada</b> bajaring — shart bajarilganda avtomatik qabul qilinadi.</span></div>';
    if(api && api.holat) api.holat(a.holat || {});
  }
  else if(a.tur === 'aniqla'){
    const api = await sahnaQur(sahna, d, {mol:(tops[0].holat||{}).mol, tag, izoh}); asboblar(api, d); boshqKorsat();
    const harf = ['A','B','C','D'];
    const korsat = ()=>{
      const t = tops[i]; if(!t){ $('#maxsus').innerHTML = ''; return; }
      const h = t.holat || {};
      if(h.mol && window.MAKON3D) MAKON3D.molekula3D(sahna, h.mol);
      const joriy = window._sahnalar.get(sahna);
      if(joriy && joriy.holat && Object.keys(h).some(k=>k !== 'mol')) joriy.holat(h);
      $('#maxsus').innerHTML = '<div class="javoblar" style="margin-top:0">'+t.v.map((v, j)=>'<button class="javob" data-j="'+j+'"><i>'+harf[j]+'</i>'+v+'</button>').join('')+'</div>';
      $$('#maxsus .javob').forEach(b=>b.onclick = ()=>{
        const j = +b.dataset.j, ok = j === t.t, tugmalar = $$('#maxsus .javob');
        tugmalar.forEach(x=>x.disabled = true);
        b.classList.add(ok ? 'togri' : 'xato');
        if(!ok){ xato++; tugmalar[t.t].classList.add('togri'); }
        const iz = (t.izoh||'').replace(/^To‘g‘ri[.!]?\s*/, '');
        holat(ok ? 'togri' : 'xato', ok ? '<b>To‘g‘ri!</b> '+iz : '<b>Noto‘g‘ri.</b> To‘g‘ri javob: <b>'+t.v[t.t]+'</b>. '+iz);
        const oxirgi = i === tops.length - 1;
        const k = document.createElement('button'); k.className = 'tg a'; k.style.marginTop = '12px';
        k.innerHTML = (oxirgi ? 'Amaliyotni yakunlash' : 'Keyingi savol')+' '+ikon('oldinga',{w:15});
        k.onclick = ()=>{ i++; if(i >= tops.length){ $('#maxsus').innerHTML = ''; tugadi(); } else { yangila(); holat('', 'Sahnaga qarang va javobni tanlang.'); korsat(); } };
        $('#maxsus').append(k); k.focus();
      });
    };
    korsat();
  }
  else if(a.tur === 'tartib'){
    const api = await sahnaQur(sahna, d, {tur:d.amaliyotSahna, tag, izoh}); asboblar(api, d); boshqKorsat();
    if(api && api.aylanish) api.aylanish(false);
    const mr = a.modelRaqam || null;
    const qismlar = a.qismlar || (d.qismlar||[]).map(q=>[q.raqam, q.nom]);
    const N = qismlar.length, tartibR = qismlar.map(q=>q[0]);
    let bosqich = 'ajrat', olingan = [];
    const ajratFn = (r, v)=>{ if(mr) r = mr[r]; if(r && api && api.ajratQism) api.ajratQism(r, v); };
    const chiz = ()=>{
      $('#shart').innerHTML = bosqich === 'ajrat' ? (a.shartAjrat || 'Qismlarni <b>ajratish tartibida</b> bosing') : (a.shartYig || 'Endi <b>teskari tartibda yig‘ing</b>');
      const aralash = qismlar.slice().sort((x, y)=>((x[0]*7)%N) - ((y[0]*7)%N));
      $('#maxsus').innerHTML = '<div class="tartib">'+aralash.map(([n, nom])=>'<button data-n="'+n+'" class="'+(olingan.includes(n) ? 'olindi' : '')+'"><i>'+(olingan.includes(n) ? olingan.indexOf(n)+1 : '·')+'</i>'+nom+'</button>').join('')+'</div>';
      $('#prog').innerHTML = qismlar.map((_, j)=>'<i class="'+(j < olingan.length ? 'ok' : j === olingan.length ? 'hozir' : '')+'"></i>').join('');
      $('#sanoq').textContent = a.sarlavha + ' · ' + (bosqich === 'ajrat' ? (a.takror === 'ayni' ? '1-marta' : 'ajratish') : (a.takror === 'ayni' ? 'takrorlash' : 'yig‘ish')) + ' ' + olingan.length + '/' + N;
      $$('#maxsus button').forEach(b=>b.onclick = ()=>tanla(+b.dataset.n, b));
    };
    function tanla(n, b){
      const ayni = a.takror === 'ayni'; /* xavfsizlik ketma-ketliklari ikkinchi marta ham to'g'ri tartibda */
      const kutilgan = (bosqich === 'ajrat' || ayni) ? tartibR[olingan.length] : tartibR[N - 1 - olingan.length];
      if(n !== kutilgan){
        xato++; b.classList.remove('xato'); void b.offsetWidth; b.classList.add('xato');
        holat('xato', bosqich === 'ajrat' ? '<b>Tartib noto‘g‘ri.</b> Bu qadam hali bajarilmaydi.' : (ayni ? '<b>Tartib noto‘g‘ri.</b> Xuddi birinchi marta bajargan tartibda bosing.' : '<b>Tartib noto‘g‘ri.</b> Yig‘ish ajratishga teskari: oxirgisi birinchi.'));
        return;
      }
      olingan.push(n);
      ajratFn(n, bosqich === 'ajrat');
      if(olingan.length === N){
        if(bosqich === 'ajrat'){ bosqich = 'yig'; olingan = []; holat('togri', a.takror === 'ayni' ? '<b>Birinchi bosqich tayyor!</b> Endi xotiradan, xuddi shu tartibda.' : '<b>Birinchi bosqich tayyor!</b> Endi teskari tartibda.'); }
        else { $('#maxsus').innerHTML = ''; tugadi(); return; }
      } else holat('togri', '<b>To‘g‘ri.</b> Keyingisi?');
      chiz();
    }
    chiz(); holat('', 'Ro‘yxatdagi qadamni bosing — model mos ravishda o‘zgaradi.');
    izoh.innerHTML = 'O‘quv mashqi. Haqiqiy mashg‘ulot faqat o‘qituvchi nazoratida o‘tkaziladi.';
  }
}

/* ---------- TEST ---------- */
function test(id){
  const d = DARS[id], H = darsHolat[id], f = fanOf(d);
  let i = 0, ball = 0;
  const javoblar = [], harf = ['A','B','C','D'];
  ilova.className = '';
  /* v3.15: o‘tilgan savol raqamini bosish — shu savolni ko‘rish (javob o‘zgarmaydi), keyin joriy savolga qaytish */
  let korJ = null;
  const tushHTML = (sv, ok)=>'<div class="tushuntirish"><span class="i">'+ikon(ok ? 'ok' : 'info',{w:16})+'</span><span>'+(ok ? '<b>To‘g‘ri.</b> ' : '<b>Noto‘g‘ri.</b> ')+sv.izoh+'</span></div>';
  function chiz(){
    const kj = korJ === null ? i : korJ, s = d.test[kj], jv = javoblar[kj], javobBor = jv !== undefined, korish = kj !== i;
    const foiz = i ? Math.round(ball / i * 100) : 0;
    const navKlass = j=>[j === i ? 'hozir' : '', javoblar[j] !== undefined ? (javoblar[j] === d.test[j].t ? 'togri' : 'xato') : '', j === kj && korish ? 'korilmoqda' : '', javoblar[j] !== undefined || j === i ? 'bosiladi' : ''].join(' ');
    const varKlass = j=>javobBor ? (j === s.t ? 'togri' : j === jv ? 'xato' : '') : '';
    ilova.innerHTML = `<div class="test3">
      <aside class="karta test-nav">
        <div class="rasm"><img src="${rasm(id)}" alt=""></div>
        <span class="ustki">${f.nom}</span><h3 style="margin-top:4px">${d.nom}</h3>
        <div class="halqa" style="--p:${foiz}"><div><span><b>${i ? ball+'/'+i : '—'}</b><small>to‘g‘ri</small></span></div></div>
        <div class="savol-nav">${d.test.map((_, j)=>(javoblar[j] !== undefined || j === i ? '<button type="button" data-k="'+j+'" aria-label="'+(j+1)+'-savolni ko‘rish" class="' : '<span class="')+navKlass(j)+'">'+(j+1)+(javoblar[j] !== undefined || j === i ? '</button>' : '</span>')).join('')}</div>
        <p class="manba-iz">${javoblar.length ? 'O‘tilgan savol raqamini bosing — javobingizni qayta ko‘rasiz.' : ''}</p>
        <p class="manba-iz">${H.amaliyot ? '✓ Amaliyot bajarilgan' : 'Amaliyot o‘tkazib yuborildi — <a href="#/dars/'+id+'/sina">qaytish</a>'}</p>
      </aside>
      <section class="karta savol-k ${korish ? 'savol-korish' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="ustki">${korish ? 'Ko‘rish · ' : ''}Savol ${kj+1} / ${d.test.length}</span><a class="tg o kichik" href="#/dars/${id}/kor">${ikon('orqa',{w:14})} Darsga qaytish</a></div>
        <div class="progress-q">${d.test.map((_, j)=>'<i class="'+(j < i ? 'ok' : j === i ? 'hozir' : '')+'"></i>').join('')}</div>
        ${korish ? '<div class="korish-belgi">'+ikon('info',{w:14})+' Bu savolga javob berilgan — faqat ko‘rish uchun. Javob o‘zgarmaydi.</div>' : ''}
        <h2>${s.s}</h2>
        ${s.tur === '3d'
          ? (javobBor ? `<div class="javoblar tugadi"><div class="javob ${jv === s.t ? 'togri' : 'xato'}"><i>${jv === s.t ? '✓' : '✗'}</i>Siz bosgan: ${jv === s.t ? s.v[s.t] : s.v[1 - s.t]}</div>${jv === s.t ? '' : '<div class="javob togri"><i>✓</i>To‘g‘ri javob: '+s.v[s.t]+'</div>'}</div>` : '<div id="uq"></div>')
          : `<div class="javoblar ${javobBor ? 'tugadi' : ''}" id="jv">${s.v.map((v, j)=>`<button class="javob ${varKlass(j)}" data-j="${j}" ${javobBor ? 'disabled' : ''}><i>${harf[j]}</i>${v}</button>`).join('')}</div>`}
        <div id="tush">${javobBor ? tushHTML(s, jv === s.t) : ''}</div>
        <div class="test-past"><span class="manba-iz" style="margin:0">${korish ? 'Joriy savol: '+(i+1) : s.tur === '3d' ? '3D savol: javob — sahnadagi bosish' : 'Javobni tanlang — darhol tushuntirish chiqadi'}</span>
          ${korish ? `<button class="tg a" id="qayt">${i+1}-savolga qaytish ${ikon('oldinga',{w:15})}</button>` : `<button class="tg a" id="keyingi" style="visibility:${javobBor ? 'visible' : 'hidden'}">${i === d.test.length - 1 ? 'Natijani ko‘rish' : 'Keyingi savol'} ${ikon('oldinga',{w:15})}</button>`}</div>
      </section></div>`;
    $$('.savol-nav [data-k]').forEach(b=>b.onclick = ()=>{ const k = +b.dataset.k; korJ = k === i ? null : k; chiz(); });
    if(korish){ sahnalarniYop(); $('#qayt').onclick = ()=>{ korJ = null; chiz(); }; $('#qayt').focus(); return; }
    const javobYoz = (qiymat, ok)=>{
      if(javoblar[i] !== undefined) return;
      if(ok) ball++; javoblar[i] = qiymat;
      $('#tush').innerHTML = tushHTML(s, ok);
      const nav = $$('.savol-nav [data-k]')[i]; if(nav) nav.className = 'hozir bosiladi ' + (ok ? 'togri' : 'xato');
      const hq = $('.halqa b'); if(hq) hq.textContent = ball + '/' + (i + 1);
      const k = $('#keyingi'); k.style.visibility = 'visible'; k.focus();
    };
    if(s.tur === '3d' && !javobBor) uchQ($('#uq'), d, s, ok=>javobYoz(ok ? s.t : 1 - s.t, ok));
    if(!javobBor) $$('#jv .javob').forEach(b=>b.onclick = ()=>{
      const j = +b.dataset.j, ok = j === s.t;
      $('#jv').classList.add('tugadi'); b.classList.add(ok ? 'togri' : 'xato');
      if(!ok) $('#jv').children[s.t].classList.add('togri');
      $$('#jv .javob').forEach(x=>x.disabled = true);
      javobYoz(j, ok);
    });
    $('#keyingi').onclick = ()=>{ i++; korJ = null; if(i < d.test.length) chiz(); else { sahnalarniYop(); yakun(); } };
  }
  function yakun(){
    const eski = natijalar()[id];
    natijaYoz(id, {ball, jami:d.test.length, amaliyot:!!H.amaliyot, xato:H.xato||0, javoblar, sana:new Date().toISOString()});
    const foiz = Math.round(ball / d.test.length * 100);
    const kelgusi = Object.keys(DARS).find(x=>x !== id && !natijalar()[x]);
    ilova.innerHTML = `<div class="natija3">
      <section class="natija-hero">
        <div class="halqa" style="--p:${foiz}"><div><span><b>${foiz}%</b><small>${ball} / ${d.test.length}</small></span></div></div>
        <h2>${foiz === 100 ? 'A’lo! Hammasi to‘g‘ri.' : foiz >= 75 ? 'Yaxshi natija!' : foiz >= 50 ? 'Yomon emas — yana bir ko‘ring.' : 'Mavzuni qayta ko‘rib chiqing.'}</h2>
        <p>${d.nom}</p>
        <div class="statlar-n"><div><b>${ball}</b><span>to‘g‘ri javob</span></div><div><b>${H.amaliyot ? '✓' : '—'}</b><span>amaliyot</span></div><div><b>${H.amaliyot ? (H.xato||0) : '—'}</b><span>amaliyot xatosi</span></div></div>
        ${eski ? '<p style="font-size:13px;margin-top:12px">Oldingi urinish: '+eski.ball+'/'+eski.jami+'</p>' : ''}
        <div class="tugmalar"><a class="tg shisha" href="#/dars/${id}/kor">Darsni qayta ko‘rish</a>${kelgusi ? `<a class="tg oq" href="#/dars/${kelgusi}/kor">Keyingi dars ${ikon('oldinga',{w:15})}</a>` : '<a class="tg oq" href="#/">Bosh sahifa</a>'}</div>
      </section>
      <section class="karta">
        <div class="karta-sar"><h3>Savollar tahlili</h3><span>${ball} to‘g‘ri · ${d.test.length - ball} xato</span></div>
        <div class="tahlil-r">${d.test.map((t, j)=>{ const ok = javoblar[j] === t.t; return `<div><span class="i ${ok ? 't' : 'x'}">${ok ? '✓' : '✗'}</span><span><b>${t.s}</b><span>${ok ? 'Javobingiz: '+t.v[t.t] : 'Siz: '+t.v[javoblar[j]]+' · To‘g‘ri: '+t.v[t.t]}</span></span></div>`; }).join('')}</div>
      </section></div>`;
    darsHolat[id] = null;
  }
  chiz();
}

/* ---------- 3D savol (v3.14): sahnada to‘g‘ri qismni bosish ---------- */
async function uchQ(el, d, s, javob){
  sahnalarniYop();
  el.innerHTML = '<div class="uq-sahna"></div><p class="uq-iz">Modelni sudrab aylantiring, kerakli qismni <b>bosing</b>.</p>';
  const api = await sahnaQur($('.uq-sahna', el), d, {tag:document.createElement('div'), izoh:document.createElement('div')});
  if(api && s.qatlamlar && api.qatlam) Object.keys(s.qatlamlar).forEach(k=>api.qatlam(k, s.qatlamlar[k]));
  let tugadi = false;
  joriyHodisa = ev=>{
    if(tugadi || ev.tur !== s.hodisa) return;
    tugadi = true; joriyHodisa = null;
    javob(s.togri.includes(String(ev[s.kalit || 'nom'])), ev);
  };
}

/* ---------- natija kodi (v3.13): serversiz — o‘quvchi kodni/faylni o‘qituvchiga beradi ---------- */
const NK = {
  xesh(s){ let h = 0x811c9dc5; for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36).padStart(7, '0').slice(-5); },
  b64(s){ return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
  ochB64(s){ s = s.replace(/-/g, '+').replace(/_/g, '/'); while(s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); },
  yarat(ism, sinf){
    const n = natijalar(), r = {};
    Object.keys(n).forEach(id=>{ const x = n[id]; r[id] = [x.ball, x.jami, x.amaliyot ? 1 : 0, x.xato || 0, Math.round(new Date(x.sana).getTime() / 6e4)]; });
    let lab = null; try{ const l = JSON.parse(localStorage.getItem('makon:lab') || '{}'); lab = [Object.keys(l.kashf || {}).length, Object.keys(l.top || {})]; }catch(e){}
    const m = NK.b64(JSON.stringify({v:1, i:String(ism).slice(0, 60), s:String(sinf || '').slice(0, 20), t:Math.round(Date.now() / 6e4), n:r, l:lab}));
    return 'MAKON1-' + m + '-' + NK.xesh(m);
  },
  /* matndan barcha kodlarni ajratadi: [{ok, d | xato}] */
  ajrat(matn){
    return (String(matn).match(/MAKON1-[A-Za-z0-9_-]+/g) || []).map(k=>{
      const mm = k.match(/^MAKON1-(.+)-([a-z0-9]{5})$/);
      if(!mm || NK.xesh(mm[1]) !== mm[2]) return {ok:false, xato:'kod buzilgan yoki to‘liq ko‘chirilmagan'};
      try{ const d = NK.tozala(JSON.parse(NK.ochB64(mm[1]))); if(!d) throw 0; return {ok:true, d}; }
      catch(e){ return {ok:false, xato:'kodni o‘qib bo‘lmadi'}; }
    });
  },
  /* sxemani qat'iy tekshiradi: faqat ma'lum darslar va chegaralangan sonlar qoladi (buzuq kod panelni buzmasin) */
  tozala(d){
    if(!d || d.v !== 1 || typeof d.i !== 'string' || !d.i.trim() || d.i.length > 60) return null;
    if(d.s !== undefined && typeof d.s !== 'string') return null;
    if(!Number.isFinite(d.t) || !d.n || typeof d.n !== 'object' || Array.isArray(d.n)) return null;
    const n = {}, butun = (x, a, b)=>Number.isInteger(x) && x >= a && x <= b;
    Object.keys(d.n).forEach(id=>{ const r = d.n[id]; if(DARS[id] && Array.isArray(r) && butun(r[1], 1, 100) && butun(r[0], 0, r[1]) && butun(r[3] || 0, 0, 999)) n[id] = [r[0], r[1], r[2] ? 1 : 0, r[3] || 0, Number.isFinite(r[4]) ? r[4] : d.t]; });
    return {v:1, i:d.i.trim(), s:(d.s || '').slice(0, 20), t:d.t, n, l:null};
  },
  sinf(){ const s = xotira.ol('sinf', {}), r = {}; Object.keys(s || {}).forEach(k=>{ const d = NK.tozala(s[k]); if(d) r[k] = d; }); return r; },
  qabul(d){ const s = NK.sinf(), k = (d.i + '|' + (d.s || '')).toLowerCase(); const eski = s[k]; if(eski && eski.t > d.t) return 'eski'; s[k] = d; xotira.yoz('sinf', s); return eski ? 'yangilandi' : 'yangi'; },
  yukla(nom, matn, tur){ const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([matn], {type:tur || 'text/plain;charset=utf-8'})); a.download = nom; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 500); }
};
const sanaQisqa = daq=>{ const s = new Date(daq * 6e4); return s.toLocaleDateString('uz-UZ') + ' ' + s.toTimeString().slice(0, 5); };
function natijaYuborish(){
  const q = $('#yuborQ'); if(!q) return;
  q.innerHTML = `<div class="karta-sar"><h3>Natijani o‘qituvchiga yuborish</h3><span>internet shart emas</span></div>
    <p class="yubor-iz">Natijalaringiz shu kompyuterda saqlanadi. O‘qituvchi ko‘rishi uchun kod yarating: uni nusxalab Telegram orqali yuboring yoki faylni fleshkada bering. O‘qituvchi kodni <b>Sinf paneli → Natijalarni qabul qilish</b> bo‘limiga qo‘yadi.</p>
    <div class="yubor-g"><label>Ism familiya<input id="nkIsm" value="${esc(xotira.ol('ism', '') || '')}" maxlength="60" placeholder="Masalan: Nodira Karimova"></label><label>Sinf<input id="nkSinf" value="${esc(xotira.ol('sinfNom', '') || '')}" maxlength="20" placeholder="8-A"></label><button class="tg a" id="nkYarat">Kod yaratish</button></div>
    <div id="nkNat"></div>`;
  $('#nkYarat').onclick = ()=>{
    const i = $('#nkIsm').value.trim(), s = $('#nkSinf').value.trim();
    if(!i){ $('#nkIsm').focus(); bildir('Avval ism familiyangizni yozing'); return; }
    xotira.yoz('ism', i); xotira.yoz('sinfNom', s);
    const kod = NK.yarat(i, s), soni = Object.keys(natijalar()).length;
    $('#nkNat').innerHTML = `<textarea class="nk-kod" readonly rows="3" aria-label="Natija kodi">${kod}</textarea>
      <div class="yubor-t"><button class="tg a kichik" id="nkNusxa">Nusxa olish</button><button class="tg o kichik" id="nkFayl">Fayl sifatida saqlash</button><span>${soni} ta dars natijasi · ${kod.length} belgi</span></div>
      <p class="yubor-iz kichik">Kod faqat shu kompyuterdagi natijalardan tuziladi. Oxiridagi tekshiruv belgisi to‘liq ko‘chirilmagan kodni aniqlaydi, lekin bu himoyalangan imzo emas (demo bosqich).</p>`;
    $('#nkNusxa').onclick = ()=>{ const t = $('.nk-kod'); t.select(); (navigator.clipboard ? navigator.clipboard.writeText(kod) : Promise.reject()).then(()=>bildir('✓ Kod nusxalandi'), ()=>{ try{ document.execCommand('copy'); bildir('✓ Kod nusxalandi'); }catch(e){ bildir('Kodni belgilab, Ctrl+C bosing'); } }); };
    $('#nkFayl').onclick = ()=>NK.yukla((i.replace(/[^\p{L}\p{N}]+/gu, '_') || 'oquvchi') + '.makon.txt', kod + '\n');
  };
}

/* ---------- xatolar ustida ishlash (v3.14) ---------- */
function xatoBank(){
  const n = natijalar(), tuz = xotira.ol('xatoTuz', {}), r = [];
  Object.keys(n).forEach(id=>{ const d = DARS[id]; (n[id].javoblar || []).forEach((j, k)=>{ const t = d.test[k]; if(t && j !== t.t && !tuz[id + ':' + k]) r.push({id, k}); }); });
  /* v3.19: musobaqada adashilgan savollar ham (lib/qoshimcha_v319.js yozadi) */
  xotira.ol('musobaqaXato', []).forEach(x=>{ if(DARS[x.id] && DARS[x.id].test[x.k] && !tuz[x.id + ':' + x.k] && !r.some(e=>e.id === x.id && e.k === x.k)) r.push({id:x.id, k:x.k}); });
  return r;
}
function xatolarSahifa(){
  const bank = xatoBank(), tuz = xotira.ol('xatoTuz', {}), tuzSoni = Object.keys(tuz).length;
  const guruh = {}; bank.forEach(x=>(guruh[x.id] = guruh[x.id] || []).push(x));
  ilova.innerHTML = `<span class="ustki">Takrorlash</span><h1 class="sarlavha">Xatolar ustida ishlash</h1>
  <p class="lid">Testlarda noto‘g‘ri javob bergan savollaringiz shu yerga yig‘iladi. Qayta yeching: to‘g‘ri topgan savol ro‘yxatdan chiqadi. Xato — o‘rganishning bir qismi.</p>
  <div class="kpi-g">
    <div class="kpi"><span class="i">${ikon('maqsad')}</span><b>${bank.length}</b><span>qayta ishlanadigan savol</span></div>
    <div class="kpi"><span class="i">${ikon('ok')}</span><b>${tuzSoni}</b><span>tuzatilgan xato</span></div>
    <div class="kpi"><span class="i">${ikon('kitob')}</span><b>${Object.keys(guruh).length}</b><span>dars</span></div>
    <div class="kpi"><span class="i">${ikon('medal')}</span><b>${bank.length + tuzSoni ? Math.round(tuzSoni / (bank.length + tuzSoni) * 100) + '%' : '—'}</b><span>tuzatildi</span></div>
  </div>
  ${bank.length ? `<div class="xb-bosh"><button class="tg a" id="xbHammasi">${ikon('oldinga',{w:15})} Hammasini qayta yechish (${bank.length})</button></div>
  <div class="xb-g">${Object.keys(guruh).map(id=>{ const d = DARS[id], f = fanOf(d); return `<section class="karta xb-k"><div class="xb-sar"><img src="${rasm(id)}" alt=""><div><b>${d.nom}</b><span>${f.nom} · ${guruh[id].length} savol</span></div><button class="tg o kichik" data-xb="${id}">Yechish</button></div><ol>${guruh[id].map(x=>'<li>' + d.test[x.k].s + '</li>').join('')}</ol><a class="xb-dars" href="#/dars/${id}/kor">Darsni qayta ko‘rish →</a></section>`; }).join('')}</div>`
  : `<section class="karta xb-bo"><h3>${tuzSoni ? 'Barcha xatolar tuzatildi!' : 'Hozircha xato yo‘q'}</h3><p>${tuzSoni ? 'Ajoyib — ' + tuzSoni + ' ta xatoni qayta yechib to‘g‘riladingiz.' : 'Darslardagi testlarni yeching — noto‘g‘ri javoblar shu yerga tushadi.'}</p><a class="tg a" href="#/fanlar">Darslarga o‘tish</a></section>`}`;
  const bosh = ids=>xatoMashq(bank.filter(x=>!ids || x.id === ids));
  if($('#xbHammasi')) $('#xbHammasi').onclick = ()=>bosh();
  $$('[data-xb]').forEach(b=>b.onclick = ()=>bosh(b.dataset.xb));
}
function xatoMashq(royxat){
  royxat = royxat.slice().sort(()=>Math.random() - .5);
  let i = 0, togri = 0; const harf = ['A','B','C','D'];
  function chiz(){
    const x = royxat[i], d = DARS[x.id], s = d.test[x.k], f = fanOf(d);
    ilova.innerHTML = `<div class="xb-mashq"><section class="karta savol-k">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="ustki">${f.nom} · ${d.qisqaNom || d.nom} · ${i + 1} / ${royxat.length}</span><a class="tg o kichik" href="#/xatolar">${ikon('orqa',{w:14})} Ro‘yxatga</a></div>
      <div class="progress-q">${royxat.map((_, j)=>'<i class="' + (j < i ? 'ok' : j === i ? 'hozir' : '') + '"></i>').join('')}</div>
      <h2>${s.s}</h2>
      ${s.tur === '3d' ? '<div id="uq"></div>' : `<div class="javoblar" id="jv">${s.v.map((v, j)=>`<button class="javob" data-j="${j}"><i>${harf[j]}</i>${v}</button>`).join('')}</div>`}
      <div id="tush"></div>
      <div class="test-past"><span class="manba-iz" style="margin:0">Oldin bu savolda adashgansiz — shoshilmang</span><button class="tg a" id="keyingi" style="visibility:hidden">${i === royxat.length - 1 ? 'Yakunlash' : 'Keyingi'} ${ikon('oldinga',{w:15})}</button></div></section></div>`;
    const javobBer = ok=>{
      if(ok){ togri++; const t = xotira.ol('xatoTuz', {}); t[x.id + ':' + x.k] = new Date().toISOString(); xotira.yoz('xatoTuz', t); }
      $('#tush').innerHTML = '<div class="tushuntirish"><span class="i">' + ikon(ok ? 'ok' : 'info',{w:16}) + '</span><span>' + (ok ? '<b>To‘g‘ri — xato tuzatildi.</b> ' : '<b>Yana noto‘g‘ri.</b> Savol ro‘yxatda qoladi. ') + s.izoh + '</span></div>';
      const k = $('#keyingi'); k.style.visibility = 'visible'; k.focus();
    };
    if(s.tur === '3d') uchQ($('#uq'), d, s, javobBer);
    $$('#jv .javob').forEach(b=>b.onclick = ()=>{
      const j = +b.dataset.j, ok = j === s.t;
      $('#jv').classList.add('tugadi'); b.classList.add(ok ? 'togri' : 'xato'); if(!ok) $('#jv').children[s.t].classList.add('togri');
      if(ok){ togri++; const t = xotira.ol('xatoTuz', {}); t[x.id + ':' + x.k] = new Date().toISOString(); xotira.yoz('xatoTuz', t); }
      $('#tush').innerHTML = '<div class="tushuntirish"><span class="i">' + ikon(ok ? 'ok' : 'info',{w:16}) + '</span><span>' + (ok ? '<b>To‘g‘ri — xato tuzatildi.</b> ' : '<b>Yana noto‘g‘ri.</b> Savol ro‘yxatda qoladi. ') + s.izoh + '</span></div>';
      const k = $('#keyingi'); k.style.visibility = 'visible'; k.focus();
    });
    $('#keyingi').onclick = ()=>{ i++; if(i < royxat.length) chiz(); else { sahnalarniYop(); yakun(); } };
  }
  function yakun(){
    ilova.innerHTML = `<div class="natija3"><section class="natija-hero"><div class="halqa" style="--p:${Math.round(togri / royxat.length * 100)}"><div><span><b>${togri}/${royxat.length}</b><small>tuzatildi</small></span></div></div>
      <h2>${togri === royxat.length ? 'Barcha xatolar tuzatildi!' : togri ? 'Yaxshi — ' + togri + ' ta xato tuzatildi.' : 'Mavzularni qayta ko‘rib chiqing.'}</h2><p>${royxat.length - togri ? (royxat.length - togri) + ' ta savol ro‘yxatda qoldi — darsni qayta ko‘rib, keyin yana urinib ko‘ring.' : 'Endi yangi darsga o‘tishingiz mumkin.'}</p>
      <div class="tugmalar"><a class="tg shisha" href="#/xatolar">Xatolar ro‘yxati</a><a class="tg oq" href="#/natijalar">Natijalarim ${ikon('oldinga',{w:15})}</a></div></section></div>`;
  }
  if(royxat.length) chiz(); else xatolarSahifa();
}

/* ---------- natijalarim ---------- */
const ballB = (b, jami)=>{ if(b === null || b === undefined) return '<span class="ball b">—</span>'; const r = b / (jami || 5); return '<span class="ball '+(r >= .8 ? 'y' : r >= .6 ? 'o' : 'p')+'">'+b+'</span>'; };
function natijalarSahifa(){
  const n = natijalar(), ids = Object.keys(DARS), bajarilgan = Object.keys(n).length;
  const ort = bajarilgan ? Math.round(Object.values(n).reduce((a, x)=>a + x.ball / x.jami, 0) / bajarilgan * 100) : 0;
  ilova.innerHTML = `<p class="chop-faqat">MAKON · ${esc(xotira.ol('ism', '') || 'O‘quvchi')}${xotira.ol('sinfNom', '') ? ' · ' + esc(xotira.ol('sinfNom', '')) : ''} · ${new Date().toLocaleDateString('uz-UZ')}</p><div class="sar-q"><div><span class="ustki">Natijalarim</span><h1 class="sarlavha">Qanday o‘qiyapman</h1></div><button class="tg o kichik chop-tg" onclick="window.print()">${ikon('hujjat',{w:15})} Chop etish</button></div>
  <div class="kpi-g">
    <div class="kpi"><span class="i">${ikon('kitob')}</span><b>${bajarilgan}/${ids.length}</b><span>dars tugatildi</span></div>
    <div class="kpi"><span class="i">${ikon('maqsad')}</span><b>${bajarilgan ? ort+'%' : '—'}</b><span>test o‘rtachasi</span></div>
    <div class="kpi"><span class="i">${ikon('ok')}</span><b>${Object.values(n).filter(x=>x.amaliyot).length}</b><span>amaliyot bajarildi</span></div>
    <div class="kpi"><span class="i">${ikon('medal')}</span><b>${Object.values(n).filter(x=>x.ball === x.jami).length}</b><span>100% test</span></div>
  </div>
  ${(b=>b ? `<a class="karta xb-ogoh" href="#/xatolar"><span class="i">${ikon('maqsad')}</span><span><b>Xatolar ustida ishlash: ${b} ta savol</b><small>Testlarda adashgan savollaringizni qayta yeching — to‘g‘ri topganingiz ro‘yxatdan chiqadi.</small></span>${ikon('oldinga',{w:16})}</a>` : '')(xatoBank().length)}
  <section class="karta yubor-q" id="yuborQ"></section>
  <div class="bolim-sar"><h2>Darslar bo‘yicha</h2></div>
  <div class="jadval-q"><table class="jadval"><thead><tr><th>Dars</th><th>Test</th><th>Amaliyot</th><th>Sana</th><th></th></tr></thead><tbody>${ids.map(id=>{
    const d = DARS[id], r = n[id], f = fanOf(d);
    return `<tr><td><img src="${rasm(id)}" alt=""><b>${d.nom}</b><br><span style="font-size:12.5px;margin-left:74px">${f.nom}</span></td><td>${r ? ballB(r.ball, r.jami)+' / '+r.jami : '<span class="ball b">o‘tilmagan</span>'}</td><td>${r ? (r.amaliyot ? '✓ · '+r.xato+' xato' : '—') : '—'}</td><td>${r ? new Date(r.sana).toLocaleDateString('uz-UZ') : '—'}</td><td><a class="tg o kichik" href="#/dars/${id}/kor">${r ? 'Qayta' : 'Boshlash'}</a></td></tr>`;
  }).join('')}</tbody></table></div>`;
  natijaYuborish();
}

/* ---------- o'qituvchi ---------- */
function spark(qiymatlar){
  const w = 80, h = 28, max = Math.max(1, ...qiymatlar);
  const nuq = qiymatlar.map((v, i)=>(i / Math.max(1, qiymatlar.length - 1) * w).toFixed(1)+','+(h - v / max * (h - 4) - 2).toFixed(1)).join(' ');
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline points="${nuq}" fill="none" stroke="#5b3dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function oqituvchi(){
  let vid = xotira.ol('vazifa', 'bio-azolar'); if(!DARS[vid]) vid = Object.keys(DARS)[0];
  const n = natijalar(), IDS = Object.keys(DARS);
  const bu = xotira.ol('ism', null) || 'Shu kompyuterdagi o‘quvchi';
  const SINF = NK.sinf(), qabul = Object.values(SINF).sort((a, b)=>a.i.localeCompare(b.i));
  const namunaKor = qabul.length ? xotira.ol('namunaKor', false) : true;
  /* namuna ballari eski testlar uzunligida (NAMUNA.jami) — hozirgi test uzunligiga moslanadi */
  const namunaBall = (id, b)=>b === null || b === undefined ? null : Math.round(b / ((NAMUNA.jami || {})[id] || DARS[id].test.length) * DARS[id].test.length);
  const qatorlar = [[esc(bu) + ' <span class="belgi asos">shu kompyuter</span>', Object.fromEntries(IDS.map(id=>[id, n[id] ? n[id].ball : null])), true]]
    .concat(qabul.map(d=>[esc(d.i) + (d.s ? ' <small class="sinf-b">' + esc(d.s) + '</small>' : '') + ' <span class="belgi yashil">qabul qilingan</span>', Object.fromEntries(IDS.map(id=>[id, d.n[id] ? Math.round(d.n[id][0] / d.n[id][1] * DARS[id].test.length) : null])), false]))
    .concat(namunaKor ? NAMUNA.oquvchilar.map(o=>[esc(o[0]) + ' <span class="belgi">namuna</span>', Object.fromEntries(Object.keys(o[1]).filter(id=>DARS[id]).map(id=>[id, namunaBall(id, o[1][id])])), false]) : []);
  const ortLar = IDS.map(id=>{ const b = qatorlar.map(q=>q[1][id]).filter(x=>x !== null && x !== undefined); return b.length ? b.reduce((a, x)=>a + x, 0) / b.length / DARS[id].test.length * 100 : 0; });
  const topshirgan = IDS.reduce((a, id)=>a + qatorlar.filter(q=>q[1][id] !== null && q[1][id] !== undefined).length, 0);
  const qiyin = IDS[ortLar.indexOf(Math.min(...ortLar.filter(x=>x > 0)))];
  const rang = r=>{ const h = Math.round(r * 130); return 'background:hsla('+h+',75%,50%,.18);color:hsl('+h+',85%,70%);box-shadow:inset 0 0 0 1px hsla('+h+',75%,60%,.25)'; };
  ilova.innerHTML = `<div class="salom" style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap"><div><span class="ustki">O‘qituvchi paneli</span><h1 class="sarlavha">${NAMUNA.sinf}</h1></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="tg o chop-tg" onclick="window.print()">${ikon('hujjat',{w:16})} Chop etish</button><a class="tg o" href="#/ishlanmalar">${ikon('hujjat',{w:16})} Dars ishlanmalari</a><a class="tg a" href="#/proyektor/${vid}">${ikon('proyektor',{w:16})} Vazifani proyektorda ochish</a></div></div>
  <div class="ogoh">${ikon('ogoh',{w:16})} <span>${namunaKor ? 'Jadvaldagi <b>' + NAMUNA.oquvchilar.length + ' ta «namuna» o‘quvchi — to‘qima ma’lumot</b> (panel qanday ishlashini ko‘rsatish uchun). ' : ''}Birinchi qator — shu kompyuterdagi natija${qabul.length ? ', «qabul qilingan» — o‘quvchilar yuborgan kodlardan (' + qabul.length + ' ta)' : ''}.${qabul.length ? ' <button class="havola-tg" id="namunaTg">' + (namunaKor ? 'Namunani yashirish' : 'Namunani ko‘rsatish') + '</button>' : ''}</span></div>
  <section class="karta qabul-q">
    <div class="karta-sar"><h3>O‘quvchilardan natijalarni qabul qilish</h3><span>serversiz: kod yoki fayl</span></div>
    <p class="yubor-iz">O‘quvchi <b>Natijalarim</b> sahifasida kod yaratadi. Kodlarni shu yerga qo‘ying (bir nechtasini birdan ham bo‘ladi) yoki <b>.makon.txt</b> fayllarini tanlang.</p>
    <textarea id="qabulMatn" rows="3" placeholder="MAKON1-..." aria-label="O‘quvchi kodlari"></textarea>
    <div class="yubor-t"><button class="tg a kichik" id="qabulTg">Qabul qilish</button><label class="tg o kichik fayl-tg">Fayllarni tanlash<input type="file" id="qabulFayl" accept=".txt,.makon" multiple hidden></label>${qabul.length ? '<button class="tg o kichik" id="csvTg">Excel uchun yuklab olish (CSV)</button><button class="tg o kichik xavf" id="sinfTozala">Qabul qilinganlarni o‘chirish</button>' : ''}<span id="qabulHol"></span></div>
    ${qabul.length ? '<div class="qabul-r">' + qabul.map(d=>'<span><b>' + esc(d.i) + '</b>' + (d.s ? ' · ' + esc(d.s) : '') + ' · ' + Object.keys(d.n).length + ' dars · ' + sanaQisqa(d.t) + '</span>').join('') + '</div>' : ''}
  </section>
  <div class="kpi-g">
    <div class="kpi"><span class="i">${ikon('foydalanuvchilar')}</span><b>${qatorlar.length}</b><span>o‘quvchi</span></div>
    <div class="kpi"><span class="i">${ikon('maqsad')}</span>${spark(ortLar.filter(x=>x > 0))}<b>${(o=>o.length ? Math.round(o.reduce((a, x)=>a + x, 0) / o.length) + '%' : '—')(ortLar.filter(x=>x > 0))}</b><span>o‘rtacha o‘zlashtirish</span></div>
    <div class="kpi"><span class="i">${ikon('ok')}</span><b>${topshirgan}</b><span>topshirilgan test (${IDS.length} dars)</span></div>
    <div class="kpi"><span class="i" style="background:var(--qizil2);color:var(--qizil)">${ikon('ogoh')}</span><b style="font-size:17px;margin-top:16px;line-height:1.3">${qiyin ? DARS[qiyin].qisqaNom : '—'}</b><span>eng past natija — qayta tushuntirish</span></div>
  </div>
  <div class="bolim-sar"><div><h2>Sinfga vazifa berish</h2><p>Tanlangan dars o‘quvchining bosh sahifasida chiqadi</p></div></div>
  <div class="vazifa-g">${IDS.map(id=>{ const d = DARS[id], f = fanOf(d); return `<button data-v="${id}" class="vazifa-k ${id === vid ? 'faol' : ''}"><img src="${rasm(id)}" alt=""><div><b>${d.nom}</b><span>${f.nom}</span></div></button>`; }).join('')}</div>
  <div class="bolim-sar"><div><h2>Natijalar xaritasi</h2><p>Test bali: yashil — yaxshi, qizil — qayta ishlash kerak</p></div></div>
  <div class="heat"><table><thead><tr><th>O‘quvchi</th>${IDS.map(id=>'<th>'+DARS[id].qisqaNom+'</th>').join('')}<th>O‘rtacha</th></tr></thead>
  <tbody>${qatorlar.map(q=>{ const bl = IDS.map(id=>q[1][id]).map((b, k)=>b === null || b === undefined ? null : b / DARS[IDS[k]].test.length).filter(x=>x !== null); const o = bl.length ? bl.reduce((a, x)=>a + x, 0) / bl.length : null;
    return '<tr class="'+(q[2] ? 'siz' : '')+'"><td><b>'+q[0]+'</b></td>'+IDS.map(id=>{ const b = q[1][id]; return '<td>'+(b === null || b === undefined ? '<span class="h b">—</span>' : '<span class="h" style="'+rang(b / DARS[id].test.length)+'">'+b+'/'+DARS[id].test.length+'</span>')+'</td>'; }).join('')+'<td>'+(o === null ? '<span class="h b">—</span>' : '<span class="h" style="'+rang(o)+'">'+Math.round(o * 100)+'%</span>')+'</td></tr>'; }).join('')}</tbody></table></div>`;
  labPanel();
  const qabulQil = matn=>{
    const r = NK.ajrat(matn); if(!r.length){ $('#qabulHol').textContent = 'Kod topilmadi — MAKON1- bilan boshlanadigan kodni qo‘ying.'; return; }
    const hol = {yangi:0, yangilandi:0, eski:0}, xato = [];
    r.forEach(x=>{ if(x.ok) hol[NK.qabul(x.d)]++; else xato.push(x.xato); });
    bildir('✓ Qabul qilindi: ' + (hol.yangi + hol.yangilandi) + (xato.length ? ' · xato: ' + xato.length : ''));
    oqituvchi();
    if(xato.length) $('#qabulHol').textContent = xato.length + ' ta kod qabul qilinmadi: ' + [...new Set(xato)].join('; ') + '.';
    else if(hol.eski) $('#qabulHol').textContent = hol.eski + ' ta kod eskiroq — oldingisi saqlandi.';
  };
  $('#qabulTg').onclick = ()=>qabulQil($('#qabulMatn').value);
  $('#qabulFayl').onchange = e=>Promise.all([...e.target.files].map(f=>f.text())).then(t=>qabulQil(t.join('\n')));
  if($('#namunaTg')) $('#namunaTg').onclick = ()=>{ xotira.yoz('namunaKor', !namunaKor); oqituvchi(); };
  if($('#sinfTozala')) $('#sinfTozala').onclick = e=>{ const b = e.currentTarget; if(!b.dataset.ha){ b.dataset.ha = 1; b.textContent = 'Rostdan o‘chirilsinmi? Yana bosing'; return; } xotira.yoz('sinf', {}); oqituvchi(); };
  if($('#csvTg')) $('#csvTg').onclick = ()=>{
    /* =, +, -, @ bilan boshlangan matn Excel'da formula bo‘lib ishlamasin */
    const q = s=>{ s = String(s); if(/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const sat = [['O‘quvchi', 'Sinf'].concat(IDS.map(id=>DARS[id].qisqaNom + ' (' + DARS[id].test.length + ')')).concat(['O‘rtacha %', 'Yuborilgan'])];
    qabul.forEach(d=>{ const b = IDS.map(id=>d.n[id] ? d.n[id][0] / d.n[id][1] : null), bor = b.filter(x=>x !== null);
      sat.push([d.i, d.s || ''].concat(IDS.map(id=>d.n[id] ? Math.round(d.n[id][0] / d.n[id][1] * DARS[id].test.length) : '')).concat([bor.length ? Math.round(bor.reduce((a, x)=>a + x, 0) / bor.length * 100) : '', sanaQisqa(d.t)])); });
    NK.yukla('MAKON_sinf_natijalari.csv', '﻿' + sat.map(r=>r.map(q).join(';')).join('\r\n'), 'text/csv;charset=utf-8');
  };
  $$('[data-v]').forEach(b=>b.onclick = ()=>{
    xotira.yoz('vazifa', b.dataset.v);
    $$('[data-v]').forEach(x=>x.classList.toggle('faol', x === b));
    bildir('✓ Vazifa berildi: '+DARS[b.dataset.v].nom);
  });
}

/* ---------- ishlanmalar ---------- */
function ishlanmalar(){
  const ids = Object.keys(DARS).filter(id=>DARS[id].ishlanma);
  ilova.innerHTML = `<span class="ustki">O‘qituvchi uchun</span><h1 class="sarlavha">Dars ishlanmalari</h1>
  <p class="lid">45 daqiqalik dars rejasi: maqsadlar, bosqichlar jadvali, lug‘at, nazorat savollari, test va uyga vazifa. Rasmiy darsliklarga tayangan; chop etish mumkin.</p>
  <div class="bolim-sar"><h2>${ids.length} ta ishlanma</h2></div>
  <div class="dars-g">${ids.map(id=>{ const d = DARS[id], f = fanOf(d), I = d.ishlanma; return `<a class="dars-k" href="#/ishlanma/${id}"><div class="rasm"><img src="${rasm(id)}" alt=""><span class="belgi shisha"><i style="color:${f.rang}"></i>${I.sinf}</span></div><div class="ichi"><small>${I.tur || 'Dars ishlanmasi'}</small><b>${d.nom}</b><p>${matnSof(I.maqsad.talimiy).slice(0, 110)}…</p><div class="meta"><span>${ikon('soat',{w:13})} ${I.vaqt}</span><span>${ikon('grafik',{w:13})} ${I.bosqichlar.length} bosqich</span><span>${ikon('savol',{w:13})} ${(I.savollar||[]).length + d.test.length} savol</span></div></div></a>`; }).join('')}</div>`;
}
function ishlanma(id){
  const d = DARS[id]; if(!d || !d.ishlanma){ location.hash = '#/ishlanmalar'; return; }
  const I = d.ishlanma, f = fanOf(d);
  const royxat = (a, t)=>a && a.length ? (t ? '<ol>' : '<ul>') + a.map(x=>'<li>'+x+'</li>').join('') + (t ? '</ol>' : '</ul>') : '';
  const bolim = [['maqsad','Darsning maqsadlari'],['natija','Kutilayotgan natijalar'],['jihoz','Jihozlar'],['borish','Darsning borishi'],['lugat','Asosiy tushunchalar'],['savol','Nazorat savollari'],['test','Test'],['uy','Uyga vazifa'],['xavf','Xavfsizlik']];
  ilova.innerHTML = `<div class="hujjat-q">
  <article class="hujjat">
    <div class="muqova"><img src="${rasm(id)}" alt=""></div>
    <div class="shapka"><div><span class="ustki">Dars ishlanmasi · ${f.nom}</span><h1>${d.nom}</h1></div><span class="belgi sariq" style="align-self:flex-start">mutaxassis tasdig‘i kutilmoqda</span></div>
    <div class="meta"><div>Sinf<b>${I.sinf}</b></div><div>Vaqt<b>${I.vaqt}</b></div><div>Dars turi<b>${I.tur || 'Yangi bilim berish'}</b></div><div>Usul<b>${I.usul || '3D model, amaliyot'}</b></div></div>
    <h2 id="b-maqsad">Darsning maqsadlari</h2>
    <div class="uch"><div><b>Ta’limiy</b>${I.maqsad.talimiy}</div><div><b>Tarbiyaviy</b>${I.maqsad.tarbiyaviy}</div><div><b>Rivojlantiruvchi</b>${I.maqsad.rivojlantiruvchi}</div></div>
    ${I.natijalar ? '<h2 id="b-natija">Kutilayotgan natijalar</h2>'+royxat(I.natijalar) : ''}
    ${I.jihozlar ? '<h2 id="b-jihoz">Jihozlar</h2>'+royxat(I.jihozlar) : ''}
    <h2 id="b-borish">Darsning borishi</h2>
    <table><thead><tr><th style="width:80px">Vaqt, daq.</th><th>Bosqich va o‘qituvchi faoliyati</th><th style="width:34%">O‘quvchi faoliyati</th></tr></thead><tbody>${I.bosqichlar.map(b=>'<tr><td><b>'+b[0]+'</b></td><td>'+b[1]+'</td><td>'+b[2]+'</td></tr>').join('')}</tbody></table>
    ${I.lugat ? '<h2 id="b-lugat">Asosiy tushunchalar</h2><table><tbody>'+I.lugat.map(l=>'<tr><td style="width:30%"><b>'+l[0]+'</b></td><td>'+l[1]+'</td></tr>').join('')+'</tbody></table>' : ''}
    ${I.savollar ? '<h2 id="b-savol">Nazorat savollari</h2><ol>'+I.savollar.map(s=>'<li>'+s[0]+(s[1] ? ' <span style="color:var(--xira)">— '+s[1]+'</span>' : '')+'</li>').join('')+'</ol>' : ''}
    <h2 id="b-test">Test</h2><ol>${d.test.map(t=>'<li>'+t.s+' <span style="color:var(--xira)">(javob: '+t.v[t.t]+')</span></li>').join('')}</ol>
    ${I.uy ? '<h2 id="b-uy">Uyga vazifa</h2><p>'+I.uy+'</p>' : ''}
    ${d.xavfsizlik ? '<h2 id="b-xavf">Xavfsizlik eslatmasi</h2>'+royxat(d.xavfsizlik) : ''}
    ${I.manba ? '<p class="manba-iz" style="margin-top:24px">Manbalar: '+I.manba+'</p>' : ''}
  </article>
  <aside class="hujjat-yon">
    <div class="karta"><a class="tg a" style="width:100%" id="chop">${ikon('hujjat',{w:16})} Chop etish</a><a class="tg o" style="width:100%;margin-top:8px" href="#/dars/${id}/kor">${ikon('kub',{w:16})} 3D darsni ochish</a></div>
    <div class="karta"><span class="ustki">Mundarija</span><nav>${bolim.filter(([k])=>document.createElement('div')).map(([k, n])=>'<a href="javascript:void 0" data-b="b-'+k+'">'+n+'</a>').join('')}</nav></div>
  </aside></div>`;
  $('#chop').onclick = ()=>window.print();
  $$('[data-b]').forEach(a=>{ if(!document.getElementById(a.dataset.b)) a.remove(); else a.onclick = ()=>document.getElementById(a.dataset.b).scrollIntoView({behavior:'smooth'}); });
}

/* ---------- o'qish sahifasi ---------- */
function oqish(id){
  const d = DARS[id]; if(!d || !d.maqola){ location.hash = '#/dars/'+id+'/kor'; return; }
  const f = fanOf(d);
  const soz = d.maqola.reduce((a, m)=>a + m.xatboshilar.join(' ').split(/\s+/).length, 0);
  const lug = d.lugat || (d.ishlanma && d.ishlanma.lugat) || [];
  ilova.innerHTML = `<div class="oqish-q">
    <article class="oqish-mat">
      <div class="oqish-muqova"><img src="${rasm(id)}" alt=""><div><span class="belgi shisha"><i style="color:${f.rang}"></i>${f.nom}</span><h1>${d.nom}</h1><p>${Math.max(1, Math.round(soz / 180))} daqiqa o‘qish · ${soz} so‘z · ${d.maqola.length} bo‘lim</p></div></div>
      <p class="lead">${d.kor.matn}</p>
      ${d.maqola.map((m, i)=>`<section id="m-${i}"><span class="ustki">Bo‘lim ${i+1}</span><h2>${m.sarlavha}</h2>${m.xatboshilar.map(x=>'<p>'+x+'</p>').join('')}</section>`).join('')}
      ${d.formulalar ? '<section id="m-f"><span class="ustki">Formulalar</span><h2>Asosiy formulalar</h2>'+d.formulalar.map(x=>'<div class="formula-k"><code>'+x[0]+'</code><span>'+x[1]+'</span></div>').join('')+'</section>' : ''}
      ${d.qiziqarli ? '<section id="m-q"><span class="ustki">Bilasizmi?</span><h2>Qiziqarli faktlar</h2>'+d.qiziqarli.map(q=>'<div class="qiziq-k"><span class="i">'+ikon('yulduz',{w:15})+'</span><span>'+q+'</span></div>').join('')+'</section>' : ''}
      ${lug.length ? '<section id="m-l"><span class="ustki">Lug‘at</span><h2>Asosiy atamalar</h2><div class="lugat-g">'+lug.map(l=>'<div class="lugat-k"><b>'+l[0]+'</b><span>'+l[1]+'</span></div>').join('')+'</div></section>' : ''}
      <p class="manba-iz">Manba: ${d.manba || ''}${d.manbaQosh ? '; '+d.manbaQosh : ''}</p>
    </article>
    <aside class="oqish-yon2">
      <div class="karta"><a class="tg a" style="width:100%" href="#/dars/${id}/kor">${ikon('kub',{w:16})} 3D darsga o‘tish</a><a class="tg o" style="width:100%;margin-top:8px" href="#/dars/${id}/test">${ikon('savol',{w:16})} Testni boshlash</a></div>
      <div class="karta"><span class="ustki">Mundarija</span><nav>${d.maqola.map((m, i)=>'<a data-m="m-'+i+'">'+m.sarlavha+'</a>').join('')}${d.formulalar ? '<a data-m="m-f">Formulalar</a>' : ''}${d.qiziqarli ? '<a data-m="m-q">Qiziqarli faktlar</a>' : ''}${lug.length ? '<a data-m="m-l">Lug‘at</a>' : ''}</nav></div>
    </aside></div>`;
  $$('[data-m]').forEach(a=>a.onclick = ()=>document.getElementById(a.dataset.m).scrollIntoView({behavior:'smooth'}));
}

/* ---------- mualliflar ---------- */
function mualliflar(){
  const Q = [
    ['Inson anatomiyasi', 'BodyParts3D, © The Database Center for Life Science', 'CC BY-SA 2.1 Japan', 'dbarchive.biosciencedbc.jp/en/bodyparts3d'],
    ['AK-47, qo‘l granatasi, Makarov pistoleti', '3dmodelscc0 — Free CC0 Guns & Explosives Pack', 'CC0', '3dmodelscc0.itch.io'],
    ['Tank (qismli)', 'Quaternius (Poly Pizza)', 'CC0', 'poly.pizza/m/cW3zvvkMOM'],
    ['Zirhli transportyor', '“APC textured” — pflat (OpenGameArt)', 'CC BY-SA 3.0', 'opengameart.org/content/apc-textured'],
    ['Vertolyot', '“Helicopter” — Zsky (Poly Pizza)', 'CC BY 3.0', 'poly.pizza/m/hG2Qr0A3zR'],
    ['Harbiy yuk mashinasi', '“M939 Truck” — J-Toastie (Poly Pizza)', 'CC BY 3.0', 'poly.pizza/m/y8lBpvMlim'],
    ['Gazniqob', '“Gas mask” — stratofortress (OpenGameArt)', 'CC0', 'opengameart.org/content/gas-mask'],
    ['Kompas, dori qutisi', 'Quaternius (Poly Pizza)', 'CC0', 'poly.pizza'],
    ['Odam figurasi (Ingliz tili · tana a’zolari) — «Animated Human»', 'Quaternius (OpenGameArt)', 'CC0', 'opengameart.org/content/animated-human-low-poly'],
    ['Tarixiy chegaralar (tarix xaritasi, Buyuk Ipak yo‘li xaritasi)', 'historical-basemaps — A. Ourednik (taxminiy chegaralar)', 'GPL-3.0', 'github.com/aourednik/historical-basemaps'],
    ['Quruqlik, ko‘llar, daryolar', 'Natural Earth', 'Jamoat mulki', 'naturalearthdata.com'],
    ['Yer va sayyora tasvirlari', 'NASA (Blue Marble, sayyora suratlari)', 'Jamoat mulki', 'nasa.gov'],
    ['Shriftlar', 'Inter, Plus Jakarta Sans, JetBrains Mono', 'SIL OFL 1.1', 'fontsource.org'],
    ['3D dvigatel', 'three.js r128 (RoomEnvironment, GLTFLoader, RoundedBoxGeometry)', 'MIT', 'threejs.org']
  ];
  ilova.innerHTML = `<span class="ustki">Ochiq manbalar</span><h1 class="sarlavha">Mualliflar va litsenziyalar</h1>
  <p class="lid">MAKON dagi 3D modellar tijoratda ishlatish mumkin bo‘lgan ochiq litsenziyalar asosida olingan. NC (notijorat) litsenziyali modellar ishlatilmaydi. CC BY / CC BY-SA mualliflari quyida ko‘rsatilgan.</p>
  <div class="jadval-q" style="margin-top:20px"><table class="jadval"><thead><tr><th>Nima</th><th>Muallif / manba</th><th>Litsenziya</th><th>Havola</th></tr></thead>
  <tbody>${Q.map(q=>'<tr><td><b>'+q[0]+'</b></td><td>'+q[1]+'</td><td><span class="belgi '+(q[2] === 'CC0' ? 'yashil' : 'asos')+'">'+q[2]+'</span></td><td style="font-size:13px">'+q[3]+'</td></tr>').join('')}</tbody></table></div>
  <p class="manba-iz" style="margin-top:14px">To‘liq ro‘yxat: modellar/LITSENZIYALAR.md</p>`;
}

async function proyektor(id){
  const d = DARS[id]; if(!d){ location.hash = '#/'; return; }
  ilova.innerHTML = `<div class="proyektor">
    <div class="proyektor-tepa"><div><span class="ustki">Proyektor · ${fanOf(d).nom}</span><h2>${d.nom}</h2></div>
    <div style="display:flex;gap:8px"><button class="tg o" id="toliq">${ikon('ekran',{w:16})} To‘liq ekran</button><button class="tg a" id="yop">Yopish ${ikon('yopish',{w:15})}</button></div></div>
    <section class="sahna3" id="markaz"><div class="setka"></div><div class="sahna" id="sahna"></div><div class="asboblar shisha" id="asboblar"></div></section>
  </div>`;
  $('#yop').onclick = ()=>{ if(document.fullscreenElement) document.exitFullscreen(); history.back(); };
  $('#toliq').onclick = ()=>{ const e = $('.proyektor'); if(!document.fullscreenElement && e.requestFullscreen) e.requestFullscreen(); else if(document.exitFullscreen) document.exitFullscreen(); };
  const api = await sahnaQur($('#sahna'), d, {mol:'H2O'});
  asboblar(api, d);
}

/* ---------- virtual laboratoriya ---------- */
/* O‘qituvchi paneli: shu kompyuterdagi laboratoriya natijasi (makon:lab) */
async function labPanel(){
  ilova.insertAdjacentHTML('beforeend', `<div class="bolim-sar"><div><h2>Virtual laboratoriyalar</h2><p>Shu kompyuterdagi haqiqiy natija: kimyo tajribalari, kashf etilgan reaksiyalar va fizika topshiriqlari</p></div><a class="tg o" href="#/lab">${ikon('kolba',{w:16})} Laboratoriyani ochish</a></div><div class="lab-panel" id="labPanel"><p class="lp-yuk">Yuklanmoqda…</p></div>`);
  try{ await skriptYukla('lab_malumot.js', ()=>window.MAKON_LAB_MALUMOT); }catch(e){ const q = $('#labPanel'); if(q) q.innerHTML = '<p class="lp-yuk">Laboratoriya ma’lumoti topilmadi.</p>'; return; }
  const q = $('#labPanel'); if(!q) return;
  const D = window.MAKON_LAB_MALUMOT; let s = {};
  try{ s = JSON.parse(localStorage.getItem('makon:lab') || '{}'); }catch(e){}
  const kashf = s.kashf || {}, top = s.top || {}, REAL = D.REAKSIYA.filter(r=>!r.taqiq), k = REAL.filter(r=>kashf[r.id]).length, t = D.TOPSHIRIQ.filter(x=>top[x.id]).length;
  const ft = Object.keys(fizlabHolat()).length, bs = biolabHolat(), bt = Object.keys(bs.top || {}).length, bk = Object.keys(bs.kashf || {}).length;
  q.innerHTML = `<div class="lp-kpi"><div><b>${t}<small>/${D.TOPSHIRIQ.length}</small></b><span>kimyo tajribasi bajarildi</span></div><div><b>${k}<small>/${REAL.length}</small></b><span>reaksiya va kuzatuv kashf etildi</span></div><div><b>${ft}<small>/35</small></b><span>fizika laboratoriyasi topshirig‘i</span></div><div><b>${bt}<small>/14</small></b><span>biologiya laboratoriyasi topshirig‘i (${bk} tuzilma topildi)</span></div></div>
    <div class="lp-royxat">${D.TOPSHIRIQ.map(x=>'<div class="lp-t'+(top[x.id] ? ' ok' : '')+'"><i>'+(top[x.id] ? ikon('ok',{w:14}) : '')+'</i><span><b>'+esc(x.nom)+'</b><small>'+esc(x.sinf)+'</small></span></div>').join('')}</div>`;
}
function labBanner(){
  let k = 0, t = 0; try{ const q = JSON.parse(localStorage.getItem('makon:lab') || '{}'); k = Object.keys(q.kashf || {}).length; t = Object.keys(q.top || {}).length; }catch(e){}
  return `<section class="lab-banner"><div><span class="ustki">Laboratoriya · kimyo</span><h2>Virtual kimyo laboratoriyasi</h2>
    <p>3D xonada javondan reaktiv oling, idishga quying, isiting va kuzating: rang o‘zgarishi, cho‘kma, gaz ajralishi, alanga rangi. 37 ta reaktiv, 8 ta jihoz, 15 ta tajriba topshirig‘i, «Sirli eritma» o‘yini, xavf belgilari, daftar va yuklab olinadigan hisobot.</p>
    <div class="belgilar"><span class="belgi asos">${k} ta reaksiya kashf etildi</span><span class="belgi yashil">${t}/15 tajriba</span><span class="belgi">xavfsiz — virtual</span></div>
    <a class="tg a" href="#/lab">${ikon('kolba',{w:16})} Laboratoriyaga kirish</a></div>
    <a class="lb-rasm" href="#/lab" aria-label="Laboratoriyaga kirish"><img src="rasm/lab.webp" alt="Virtual laboratoriya: alanga rangi sinovi, rangli eritmalar" loading="lazy"></a></section>`; /* raqamlar lab_malumot.js bilan qo‘lda moslanadi */
}
/* ---------- v3.19: takrorlash kartalari va musobaqa banneri (bosh sahifa) ---------- */
function v319Banner(){
  let bugun = 0, jami = 0, rek = null;
  try{
    if(window.MAKON_V319){ const b = MAKON_V319.kartalarBazasi({DARS, fanOf}), h = xotira.ol('kartalar', {}), k = new Date(); k.setHours(0, 0, 0, 0); const kk = k.toISOString().slice(0, 10); jami = b.length; bugun = b.filter(x=>h[x.k] && h[x.k].d <= kk).length; }
    const r = xotira.ol('musobaqa', []); if(r.length) rek = r[0];
  }catch(e){}
  return `<section class="lab-banner tk-banner"><div><span class="ustki">Yangi · takrorlash</span><h2>Takrorlash kartalari va musobaqa</h2>
    <p>Darslar lug‘atidagi ${jami} ta atama — karta ko‘rinishida: eslang, oching, «Bildim» yoki «Bilmadim» deng — karta kerakli kuni o‘zi qaytadi. Musobaqada esa tanlangan fanlardan vaqtli savollar va rekordlar jadvali.</p>
    <div class="belgilar"><span class="belgi asos">${bugun ? bugun + ' ta karta bugun takrorlanadi' : 'bugun takrorlash kerak emas'}</span><span class="belgi yashil">${rek ? 'rekord: ' + rek.ball + '/' + rek.n : 'hali rekord yo‘q'}</span></div>
    <div class="tk-tug"><a class="tg a" href="#/takror">${ikon('kitobcha',{w:16})} Kartalar</a><a class="tg o" href="#/musobaqa">${ikon('olov',{w:16})} Musobaqa</a></div></div></section>`;
}
/* ---------- fizika laboratoriyasi (v3.14) ---------- */
const fizlabHolat = ()=>{ try{ return JSON.parse(localStorage.getItem('makon:fizlab') || '{}').top || {}; }catch(e){ return {}; } };
function fizlabBanner(){
  const t = Object.keys(fizlabHolat()).length;
  return `<section class="lab-banner fl-banner"><div><span class="ustki">Laboratoriya · fizika</span><h2>Virtual fizika laboratoriyasi</h2>
    <p>Besh tajriba: Arximed kuchi va suzish sharti (7-sinf), issiqlik balansi (8-sinf), Om qonuni — elektr zanjiri (8-sinf), linza va tasvir yasash (8-sinf), matematik mayatnik (9-sinf). Avval bashorat qiling, keyin tajribada tekshiring: dinamometr, termometr, ampermetr va voltmetr, linza va ekran, sekundomer, o‘lchovlar jadvali va 35 ta topshiriq.</p>
    <div class="belgilar"><span class="belgi yashil">${t}/35 topshiriq</span><span class="belgi asos">bashorat → kuzatish → tushuntirish</span></div>
    <a class="tg a" href="#/fizlab">${ikon('chaqmoq',{w:16})} Laboratoriyaga kirish</a></div>
    <a class="lb-rasm" href="#/fizlab" aria-label="Fizika laboratoriyasiga kirish"><img src="rasm/fizlab.webp" alt="Virtual fizika laboratoriyasi: dinamometr va suyuqlikdagi jism" loading="lazy"></a></section>`;
}
async function fizlab(tajriba){
  ilova.innerHTML = '<div class="fl-sahifa" id="flSahifa"><div style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya yuklanmoqda…</div></div>';
  try{
    await skriptYukla('lib/fizlab_malumot.js', ()=>window.MAKON_FIZLAB_MALUMOT);
    await skriptYukla('lib/fizlab.js', ()=>window.MAKON_FIZLAB);
  }catch(e){ $('#flSahifa').innerHTML = '<div style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya fayllari topilmadi.</div>'; return; }
  const q = $('#flSahifa'); if(!q) return;
  q.innerHTML = '';
  MAKON_FIZLAB.och(q, tajriba);
}
/* ---------- biologiya laboratoriyasi (v3.19) — lib/biolab.js, mikroskop ---------- */
const biolabHolat = ()=>{ try{ return JSON.parse(localStorage.getItem('makon:biolab') || '{}'); }catch(e){ return {}; } };
async function biolab(preparat){
  ilova.innerHTML = '<div class="bl-sahifa" id="blSahifa"><div style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya yuklanmoqda…</div></div>';
  try{
    await skriptYukla('lib/biolab_malumot.js', ()=>window.MAKON_BIOLAB_MALUMOT);
    await skriptYukla('lib/biolab.js', ()=>window.MAKON_BIOLAB);
  }catch(e){ $('#blSahifa').innerHTML = '<div style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya fayllari topilmadi.</div>'; return; }
  const q = $('#blSahifa'); if(!q) return;
  q.innerHTML = '';
  MAKON_BIOLAB.och(q, preparat);
}
function biolabBanner(){
  const s = biolabHolat(), t = Object.keys(s.top || {}).length, k = Object.keys(s.kashf || {}).length;
  return `<section class="lab-banner bl-banner"><div><span class="ustki">Yangi · biologiya</span><h2>Virtual biologiya laboratoriyasi</h2>
    <p>Haqiqiy mikroskopdagidek: okulyar ×10, obyektivlar ×4 / ×10 / ×40, makro- va mikro-vint, yorug‘lik va diafragma, okulyar mikrometr bilan o‘lchash. Olti preparat — piyoz po‘sti (yod bilan bo‘yash), qon surtmasi, barg og‘izchalari, elodeya (xloroplast oqimi), infuzoriya-tufelka, bakteriya — va 14 ta topshiriq.</p>
    <div class="belgilar"><span class="belgi yashil">${t}/14 topshiriq</span><span class="belgi asos">${k} ta qism va tuzilma topildi</span><span class="belgi">xavfsiz — virtual</span></div>
    <a class="tg a" href="#/biolab">${ikon('mikroskop',{w:16})} Laboratoriyaga kirish</a></div>
    <a class="lb-rasm" href="#/biolab" aria-label="Biologiya laboratoriyasiga kirish"><img src="rasm/biolab.webp" alt="Virtual biologiya laboratoriyasi: mikroskop va preparat" loading="lazy"></a></section>`;
}
async function lab(){
  ilova.innerHTML = '<div class="lab-sahifa" id="labSahifa"><div class="x2-xato" style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya yuklanmoqda…</div></div>';
  try{
    await skriptYukla('lab_malumot.js', ()=>window.MAKON_LAB_MALUMOT);
    await skriptYukla('lib/lab_xona.js', ()=>window.MAKON_LAB_MODEL);
    await skriptYukla('lib/lab3d.js', ()=>window.MAKON_LAB);
  }catch(e){ $('#labSahifa').innerHTML = '<div style="display:grid;place-items:center;height:100%;color:var(--xira)">Laboratoriya fayllari topilmadi.</div>'; return; }
  const q = $('#labSahifa'); if(!q) return;
  q.innerHTML = '';
  MAKON_LAB.och(q);
}

/* ---------- yo'naltirish ---------- */
function yonalt(){
  sahnalarniYop();
  const h = location.hash || '#/';
  const p = h.slice(2).split('/');
  const rol = xotira.ol('rol', null);
  ilova.className = '';
  window.scrollTo(0, 0);
  const qobiq = $('#qobiq');
  if(!rol){ if(TEL){ xotira.yoz('rol', 'oquvchi'); if(!xotira.ol('ism', '')) xotira.yoz('ism', 'O‘quvchi'); return yonalt(); } qobiq.classList.add('kirishda'); return kirish(); }
  qobiq.classList.remove('kirishda');
  const yolKalit = p[0] === 'dars' ? '#/fan/'+(DARS[p[1]] ? DARS[p[1]].fan : '') : h.split('/').slice(0, p[0] === 'fan' ? 3 : 2).join('/') || '#/';
  yonMenyu(p[0] === '' ? (rol === 'oqituvchi' ? '#/oqituvchi' : '#/') : yolKalit);
  const oqit = rol === 'oqituvchi';
  if(p[0] === '' && TEL){ location.replace(location.pathname + '#/fanlar'); return; }
  if(p[0] === ''){ yolChiz([[oqit ? 'Sinf paneli' : 'Bosh sahifa', '']]); if(oqit) return oqituvchi(); bosh(); const hq = $('.hero'); if(hq) hq.insertAdjacentHTML('afterend', labBanner() + fizlabBanner() + biolabBanner() + v319Banner()); return; }
  if(p[0] === 'fanlar'){ yolChiz([['Fanlar', '']]); return fanlar(); }
  if(p[0] === 'fan'){ const f = FAN.find(x=>x.id === p[1]); yolChiz([['Fanlar', '#/fanlar'], [f ? f.nom : '', '']]); return fanSahifa(p[1]); }
  if(p[0] === 'dars') return dars(p[1], p[2] || 'kor');
  if(p[0] === 'natijalar'){ yolChiz([['Natijalarim', '']]); return natijalarSahifa(); }
  if(p[0] === 'xatolar'){ yolChiz([['Natijalarim', '#/natijalar'], ['Xatolar ustida ishlash', '']]); return xatolarSahifa(); }
  if(p[0] === 'takror'){ yolChiz([['Takrorlash kartalari', '']]); return window.MAKON_V319 ? MAKON_V319.takror({xotira, DARS, FAN, ikon, esc, fanOf, rasm, ilova, $, $$}) : (location.hash = '#/'); }
  if(p[0] === 'musobaqa'){ yolChiz([['Musobaqa', '']]); return window.MAKON_V319 ? MAKON_V319.musobaqa({xotira, DARS, FAN, ikon, esc, fanOf, rasm, ilova, $, $$}) : (location.hash = '#/'); }
  if(p[0] === 'oqituvchi'){ yolChiz([['Sinf paneli', '']]); return oqituvchi(); }
  if(p[0] === 'ishlanmalar'){ yolChiz([['Dars ishlanmalari', '']]); return ishlanmalar(); }
  if(p[0] === 'ishlanma'){ const d = DARS[p[1]]; yolChiz([['Dars ishlanmalari', '#/ishlanmalar'], [d ? d.qisqaNom || d.nom : '', '']]); return ishlanma(p[1]); }
  if(p[0] === 'proyektor') return proyektor(p[1]);
  if(p[0] === 'lab'){ yolChiz([['Kimyo', '#/fan/kimyo'], ['Virtual laboratoriya', '']]); return lab(); }
  if(p[0] === 'fizlab'){ yolChiz([['Fizika', '#/fan/fizika'], ['Fizika laboratoriyasi', '']]); return fizlab(p[1]); }
  if(p[0] === 'biolab'){ yolChiz([['Biologiya', '#/fan/biologiya'], ['Biologiya laboratoriyasi', '']]); return biolab(p[1]); }
  if(p[0] === 'oqish'){ const d = DARS[p[1]]; if(d){ const f = fanOf(d); yolChiz([[f.nom, '#/fan/'+f.id], [d.qisqaNom || d.nom, '#/dars/'+p[1]+'/kor'], ['O‘qish', '']]); } return oqish(p[1]); }
  if(p[0] === 'mualliflar'){ yolChiz([['Mualliflar va litsenziyalar', '']]); return mualliflar(); }
  location.hash = '#/';
}
window.addEventListener('hashchange', yonalt);
qidiruvUlash();
yonalt();
})();
