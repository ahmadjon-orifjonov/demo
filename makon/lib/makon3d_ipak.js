/* MAKON — «Buyuk Ipak yo‘li» 2D sahnasi: keng siyosiy xarita (6 davr), sxematik karvon yo‘llari, bosiladigan shaharlar.
   Ma’lumot: lib/ipak_xarita.js (window.MAKON_IPAK_XARITA; historical-basemaps GPL-3.0 + Natural Earth).
   makon3d.js dan KEYIN ulanadi: window.MAKON3D.ipak2D(sahna, tag, izoh, yorliq, o).
   holat(h): davr (0..5), yol ('asosiy'|'shimoliy'|'janubiy'|'dengiz'|null), shahar (kalit|null), yashir (true — shahar nomlari yashiriladi).
   Hodisalar: {tur:'detal', turD:'ipak', nom:kalit}, {tur:'ipak-shahar', shahar:kalit}, {tur:'ipak-davr', i}. */
(function(){
'use strict';
const hodisa = (tur, d)=>document.dispatchEvent(new CustomEvent('makon3d', {detail:Object.assign({tur}, d||{})}));
const esc = t=>String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ---------- davrlar (xarita fayli tartibi ipak_xarita_yig.py dagi DAVR bilan bir xil) ---------- */
const DAVR = [
  {q:'mil. av. II–I', y:'mil. av. II–I asr', n:'Yo‘lning ochilishi', xar:'mil. av. 100-yil holati',
    matn:'Xan elchisi Chjan Szyan mil. av. 138-yilda g‘arbga yo‘lga chiqqan, o‘n yildan ortiq xunnlar asirligida bo‘lgan, so‘ng Dovon (Farg‘ona), Qang‘ va Yuechjilar yerlarini ko‘rib, mil. av. 126-yilda qaytgan (ba’zi manbalarda 125). Uning hisobotidan keyin Xan imperiyasi g‘arb bilan muntazam aloqa o‘rnatgan.',
    cheklov:'Manba xaritasidagi «Kushon» va «Maurya» poligonlari bu davrga to‘g‘ri kelmaydi — ular chizilmagan; Parfiya, Dovon, Qang‘, Yuechjilar va Usunlar chegarasiz yozuv bilan berilgan.',
    hudud:[['PARFIYA',56,33.6,0,1],['Qang‘',65.5,44.2,0,0],['Yuechjilar',63.6,35.4,0,0],['Usunlar',78.5,43.4,0,0],['Salavkiylar',38.6,32.6,0,0]]},
  {q:'I–III', y:'I–III asr', n:'Rimdan Xitoygacha',
    xar:'milodiy 100-yil holati',
    matn:'Yo‘l bo‘ylab to‘rtta yirik davlat turgan: Rim, Parfiya, Kushon podsholigi va Xan imperiyasi. 97-yilda Xan elchisi Gan In Rimga yetish uchun yo‘lga chiqqan, lekin Fors qo‘ltig‘i bo‘yidan orqaga qaytgan. Kushonlar davrida buddaviylik Xitoyga tarqala boshlagan.',
    cheklov:'Kushon podsholigining chegaralari manbalarda turlicha — taxminiy.',
    hudud:[['Qang‘',66.8,43.9,0,0],['Xunnlar',104,44.5,0,0]],
    yoz:{kushon:[70.2,35.4,0,120]}},
  {q:'VI–VII', y:'VI–VII asr', n:'Sug‘d savdogarlari',
    xar:'600-yil holati',
    matn:'Savdoni asosan sug‘dlar yuritgan, sug‘d tili yo‘l bo‘yida umumiy savdo tili bo‘lgan. VI asr o‘rtasida ipak qurti tuxumlari yashirincha Vizantiyaga olib borilgan. Xitoy rohibi Syuan Szan 629–645-yillarda Samarqand, Termiz va Balx orqali Hindistonga borib kelgan.',
    cheklov:'Manba xaritasida faqat Sharqiy Turk xoqonligi bor; G‘arbiy Turk xoqonligi va Sug‘d chegarasiz yozuv bilan berilgan.',
    hudud:[['G‘ARBIY TURK XOQONLIGI',68.5,46.2,0,1],['Sug‘d',65.6,40.6,0,0],['Hind podsholiklari',77,26.5,0,0]]},
  {q:'VIII–IX', y:'VIII–IX asr', n:'Talas jangi va qog‘oz',
    xar:'800-yil holati',
    matn:'751-yil iyulida Talas daryosi bo‘yida Abbosiylar Tan qo‘shinini yenggan. An’anaga ko‘ra, asir olingan xitoylar Samarqandda qog‘oz tayyorlashni boshlagan (olimlar bu rivoyatni bahsli deb hisoblaydi). 762-yilda Bag‘dodga asos solingan va u savdo yo‘llarining yangi markaziga aylangan.',
    cheklov:'Abbosiylar xalifaligining sharqiy chegaralari taxminiy.',
    hudud:[['Qarluqlar',75.5,44.6,0,0]],
    yoz:{xazar:[40.5,49.6,0,130]}},
  {q:'XIII–XIV', y:'XIII–XIV asr', n:'Mo‘g‘ullar davri',
    xar:'1279-yil holati',
    matn:'Mo‘g‘ullar imperiyasi Xitoydan Qora dengizgacha bo‘lgan yo‘llarni bir hokimiyat ostida birlashtirgan, pochta bekatlari (yom) tizimi ishlagan. Venetsiyalik Marko Polo 1271-yilda yo‘lga chiqib, 1295-yilda qaytgan.',
    cheklov:'1279 — Yuan imperiyasi Janubiy Sun davlatini to‘liq bosib olgan yil.',
    hudud:[['Tibet',87,32.3,0,0]],
    yoz:{chigatoy:[85.5,46.6,0,0,1], orda:[44.5,49.2,0,150], elxon:[55.8,31.2,-6,150], mamluk:[28.8,26.2,0,120]}},
  {q:'XIV–XV', y:'XIV–XV asr', n:'Amir Temur davri',
    xar:'1400-yil holati',
    matn:'Samarqand Amir Temur davlatining poytaxti bo‘lgan. Kastiliya elchisi Rui Gonsales de Klavixo 1404-yil 4-sentabrda Samarqandga yetib kelgan. XV asr oxirida Vasko da Gama Hindistonga dengiz yo‘lini ochgan (1498), quruqlikdagi yo‘lning ahamiyati kamaya boshlagan.',
    cheklov:'Manbadagi «Buyuk xonlik» poligoni Min imperiyasini (1368-yildan) ham qoplaydi — shuning uchun Xitoy va Mo‘g‘uliston chegarasiz yozuv bilan berilgan.',
    hudud:[['MIN IMPERIYASI',111.5,30.5,0,1],['Mo‘g‘ullar',103.5,45.8,0,0],['Tibet',87,32.3,0,0]],
    yoz:{temuriy:[59,31.4,-4,150], mogul:[81,46.1,0], orda:[44.5,49.2,0,150], mamluk:[28.8,26.2,0,120], usmonli:0}}
];

/* ---------- shaharlar: [nom, lon, lat, birinchi davr, oxirgi davr, nom o‘ngda/chapda] ---------- */
const SHAHAR = {
  chanan:['Chan’an', 108.94, 34.34, 0, 5, 'r'],
  dunxuan:['Dunxuan', 94.66, 40.14, 0, 5, 'br'],
  turfon:['Turfon', 89.19, 42.95, 0, 5, 'tr'],
  xotan:['Xo‘tan', 79.92, 37.11, 0, 5, 'br'],
  qashqar:['Qashqar', 75.99, 39.47, 0, 5, 'r'],
  dovon:['Farg‘ona', 71.9, 40.55, 0, 5, 'tr'],
  shosh:['Shosh', 69.24, 41.31, 0, 5, 'tl'],
  taroz:['Taroz', 71.37, 42.9, 2, 5, 'tr'],
  samarqand:['Samarqand', 66.96, 39.65, 0, 5, 'br'],
  buxoro:['Buxoro', 64.42, 39.77, 0, 5, 'l'],
  termiz:['Termiz', 67.28, 37.22, 0, 5, 'r'],
  balx:['Balx', 66.9, 36.76, 0, 5, 'bl'],
  marv:['Marv', 62.19, 37.66, 0, 5, 'l'],
  urganch:['Urganch', 59.15, 42.33, 0, 5, 'l'],
  taxila:['Taksila', 72.83, 33.75, 0, 2, 'r'],
  ktesifon:['Ktesifon', 44.58, 33.09, 0, 2, 'br'],
  bagdod:['Bag‘dod', 44.36, 33.31, 3, 5, 'br'],
  antioxiya:['Antioxiya', 36.16, 36.2, 0, 4, 'br'],
  konstantinopol:['Konstantinopol', 28.98, 41.01, 2, 5, 'tr'],
  rim:['Rim', 12.5, 41.9, 0, 5, 'r'],
  venetsiya:['Venetsiya', 12.33, 45.44, 3, 5, 'tr'],
  iskandariya:['Iskandariya', 29.92, 31.2, 0, 5, 'bl'],
  guanchjou:['Guanchjou', 113.26, 23.13, 0, 5, 'r'],
  kalikut:['Kalikut', 75.78, 11.25, 4, 5, 'r']
};
const ALT = {chanan:{5:'Sian'}, dovon:{0:'Dovon', 1:'Dovon'}};
/* yozuv joyi: r o‘ng, l chap, tr/tl yuqori, br/bl past */
const YON = {r:[9, 4, 0], l:[-9, 4, 1], tr:[6, -8, 0], tl:[-6, -8, 1], br:[6, 15, 0], bl:[-6, 15, 1]};
/* yo‘l nuqtalari (shahar emas; faqat chiziq uchun) */
const NUQ = {
  lanchjou:[103.8, 36.06], kucha:[82.96, 41.72], oqsuv:[80.26, 41.17], miran:[88.97, 39.2], yorkend:[77.24, 38.42],
  nishopur:[58.8, 36.2], ray:[51.4, 35.6], hamadon:[48.5, 34.8], palmira:[38.27, 34.55], anqara:[32.85, 39.93],
  beshbaliq:[89.1, 44.0], olmaliq:[80.8, 44.05], otror:[68.3, 42.85], saroy:[47.2, 46.6], tana:[39.4, 47.1], kaffa:[35.38, 45.03],
  bomiyon:[67.8, 34.8], kobul:[69.18, 34.53], peshovar:[71.57, 34.0], lahor:[74.3, 31.55], matxura:[77.67, 27.49],
  multon:[71.47, 30.2], barbarikon:[67.6, 24.9], tashqorgon:[75.23, 37.77], gilgit:[74.3, 35.9], basra:[47.8, 30.5], suvaysh:[32.55, 29.95]
};
const P = k=>SHAHAR[k] ? [SHAHAR[k][1], SHAHAR[k][2]] : (NUQ[k] || k);
/* dengiz bo‘laklari — to‘g‘ridan-to‘g‘ri [lon, lat] */
const D_ANT_RIM = ['antioxiya', [35.4, 35.9], [33.4, 34.2], [28, 34.1], [22, 35.4], [16.6, 37.5], [15.62, 38.22], [14.3, 40.1], [12.9, 41.3], 'rim'];
const D_KON_VEN = ['konstantinopol', [28.2, 40.8], [26.4, 40.2], [25.6, 38.9], [24.6, 37], [22.9, 36.2], [20.6, 37.6], [19.4, 39.6], [18.7, 40.4], [16.5, 42.1], [14.2, 43.9], 'venetsiya'];
const D_ISK_RIM = ['iskandariya', [28.5, 32.2], [22, 33.8], [17, 36.4], [15.62, 38.22], [14.3, 40.1], [12.9, 41.3], 'rim'];
const D_KAF_KON = ['kaffa', [34.2, 44.2], [31.2, 42.6], [29.2, 41.35], 'konstantinopol'];
const D_ASOSIY = ['guanchjou', [114.2, 21.8], [111.8, 17.6], [109.8, 13], [107.2, 8.6], [104.8, 3], [104.1, 1.25], [102.9, 1.75], [100.6, 3.6], [98.6, 5.4], [95.4, 6.6], [88, 6.2], [81.3, 5.5], [77.6, 7.4], [76.1, 9.6], 'kalikut',
  [73.2, 14.6], [70.2, 19.6], [67, 23.3], [62.5, 24.6], [58.6, 24.7], [56.5, 26.3], [53.5, 26.7], [50.6, 27.8], [49, 29.4], 'basra'];
const D_QIZIL = [[73.2, 14.6], [64, 14.2], [55, 13.3], [48, 12.3], [43.5, 12.6], [41.8, 14.8], [39.7, 18], [38, 21.5], [36.2, 24.4], [34.3, 27.2], [32.9, 29], 'suvaysh'];
const YOL = {
  asosiy:{n:'Asosiy yo‘l', rang:'#f5c542',
    izoh:'Chan’an → Dunxuan → Tarim havzasi (shimoliy tarmoq — Turfon, janubiy tarmoq — Xo‘tan) → Qashqar → Farg‘ona → Samarqand → Buxoro → Marv → Eron → Ktesifon/Bag‘dod → O‘rta yer dengizi sohili (Antioxiya).',
    ch:[{p:['chanan','lanchjou','dunxuan','turfon','kucha','oqsuv','qashqar','dovon','samarqand','buxoro','marv','nishopur','ray','hamadon','bagdod','palmira','antioxiya']},
        {p:['dunxuan','miran','xotan','yorkend','qashqar']},
        {p:['antioxiya','anqara','konstantinopol']},
        {p:D_ANT_RIM, s:1}, {p:D_KON_VEN, s:1, d:[3, 5]}]},
  shimoliy:{n:'Dasht yo‘li', rang:'#f0735f',
    izoh:'Shimoliy (dasht) yo‘li: Turfon → Beshbaliq → Olmaliq → Taroz → O‘tror → Urganch → Volga bo‘yidagi Saroy → Tana/Kaffa (Qora dengiz) → Konstantinopol. Mo‘g‘ullar davrida (XIII–XIV asr) ayniqsa faol bo‘lgan: italiyalik F. Pegolotti (taxminan 1340) Tanadan Xitoygacha shu yo‘lni tasvirlagan.',
    ch:[{p:['turfon','beshbaliq','olmaliq','taroz','otror','urganch','saroy','tana']}, {p:['saroy','kaffa']}, {p:D_KAF_KON, s:1},
        {p:['taroz','shosh','samarqand']}]},
  janubiy:{n:'Hindiston yo‘li', rang:'#3fcab6',
    izoh:'Janubiy (Hindiston) yo‘li: Samarqand → Termiz (Amudaryo kechuvi) → Balx → Bomiyon → Kobul → Gandxara (Taksila) → Hindiston tekisligi; Qashqardan Qoraqurum dovonlari orqali ham Gandxaraga o‘tilgan. Buddaviylik Xitoyga asosan shu yo‘llar orqali kirib borgan.',
    ch:[{p:['samarqand','termiz','balx','bomiyon','kobul','peshovar','taxila','lahor','matxura']}, {p:['taxila','multon','barbarikon']},
        {p:['qashqar','tashqorgon','gilgit','taxila']}]},
  dengiz:{n:'Dengiz yo‘li', rang:'#f4efe2',
    izoh:'Dengiz yo‘li: Guanchjou → Malakka bo‘g‘ozi → Seylon → Hindistonning Malabar sohili (Kalikut) → Fors qo‘ltig‘i (Basra → Bag‘dod) yoki Qizil dengiz (Suvaysh → Iskandariya) → O‘rta yer dengizi. Kemalar mussonlar yo‘nalishiga qarab suzgan.',
    ch:[{p:D_ASOSIY, s:1}, {p:['basra','bagdod']}, {p:D_QIZIL, s:1}, {p:['suvaysh','iskandariya']}, {p:D_ISK_RIM, s:1}]}
};
/* dengiz va joy nomlari: [matn, lon, lat, burchak, tur: 0 dengiz, 1 cho‘l/tog‘] */
const JOY = [['O‘RTA YER DENGIZI',18,33.1,0,0],['QORA DENGIZ',34.2,43.35,0,0],['KASPIY DENGIZI',50.7,41.2,-72,0],['Orol',59.9,45.1,0,0],
  ['FORS QO‘LTIG‘I',51.2,27.9,27,0],['QIZIL DENGIZ',38.3,20.4,62,0],['ARAB DENGIZI',63.5,16,0,0],['HIND OKEANI',74,3.2,0,0],['BENGAL QO‘LTIG‘I',88.5,15,0,0],
  ['JANUBIY XITOY DENGIZI',115,15.3,-35,0],['Balxash',74.6,46.6,0,0],
  ['Taklamakon',83.2,38.6,0,1],['Gobi',104,42.6,0,1],['Pomir',73.4,38.2,0,1],['Tyanshan',80.5,42.3,-8,1],['Qoraqum',60,38.9,0,1],['Qizilqum',63.4,42.2,0,1],
  ['Hindikush',68.9,35.6,-18,1],['Himolay',83.6,28.6,-20,1],['Arabiston',45,24,0,1]];

function ipak2D(sahna, tag, izoh, yorliq, o){
  o = o || {};
  const xar = window._sahnalar;
  const eski = xar && xar.get(sahna); if(eski) eski.yopish();
  if(yorliq) yorliq('Tarix · Buyuk Ipak yo‘li · chegaralar va yo‘llar sxematik');
  const X = window.MAKON_IPAK_XARITA;
  const quti = document.createElement('div'); quti.className = 'ip-xarita';
  if(!X){
    quti.innerHTML = '<div class="ip-xato">Ipak yo‘li xaritasi ma’lumoti yuklanmadi (lib/ipak_xarita.js)</div>'; sahna.append(quti);
    const bo = {idish:sahna, holat(){}, qotir(){}, zoomla(){}, tikla(){}, yopish(){ quti.remove(); if(xar && xar.get(sahna) === bo) xar.delete(sahna); }};
    if(xar) xar.set(sahna, bo); return bo;
  }
  const W = X.W, H = X.H; let yangiKadr = 0;
  const px = (lon, lat)=>[(lon - X.L0) * X.cos * X.K, (X.B1 - lat) * X.K];
  const f1 = v=>(+v).toFixed(1);
  const VB = [-10, -20, W + 20, H + 60];
  quti.innerHTML = `
    <svg class="ip-svg" viewBox="${VB.join(' ')}" preserveAspectRatio="xMidYMid meet">
      <defs><clipPath id="ipQuruq"><path d="${X.quruqlik}"/></clipPath>
        <filter id="ipNur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
      <g class="ip-kamera">
        <rect class="ip-dengiz" x="-2000" y="-2000" width="${W + 4000}" height="${H + 4000}"/>
        <path class="ip-quruq" d="${X.quruqlik}"/>
        <g class="ip-davlatlar" clip-path="url(#ipQuruq)"></g>
        <path class="ip-kol" d="${X.kollar}"/>
        <path class="ip-daryo" d="${X.daryolar}"/>
        <g class="ip-joy">${JOY.map(([n, lo, la, r, t])=>{ const [x, y] = px(lo, la); const tt = 'translate('+f1(x)+','+f1(y)+') rotate('+r+')'; return '<text class="'+(t ? 'quruq' : 'suv')+'" data-t="'+tt+'" transform="'+tt+'">'+esc(n)+'</text>'; }).join('')}</g>
        <g class="ip-yozuv"></g>
        <g class="ip-hudud"></g>
        <g class="ip-yollar"></g>
        <g class="ip-karvon"></g>
        <g class="ip-shaharlar"></g>
      </g>
    </svg>
    <div class="ip-karta"><span class="ip-ust"></span><b class="ip-nom"></b><small class="ip-s">Shaharni bosing — tarixi bilan tanishing</small></div>
    <div class="ip-manba">Chegaralar taxminiy: historical-basemaps (GPL-3.0) · Natural Earth · yo‘llar sxematik</div>`;
  sahna.append(quti);
  const svg = quti.querySelector('svg'), kamera = quti.querySelector('.ip-kamera');
  const gD = quti.querySelector('.ip-davlatlar'), gY = quti.querySelector('.ip-yozuv'), gH = quti.querySelector('.ip-hudud');
  const gYol = quti.querySelector('.ip-yollar'), gK = quti.querySelector('.ip-karvon'), gS = quti.querySelector('.ip-shaharlar');
  const kS = quti.querySelector('.ip-s');
  let joriy = Math.max(0, Math.min(5, +(o.davr || 0))), tanYol = null, tanShahar = null, yashir = !!o.yashir;
  let zoom = 1, ox = 0, oy = 0, fokusda = false, kadr = 0, oldingi = performance.now();
  let chiziqlar = [];   // {el, uz:[kumulyativ], pts, yol, s}
  let karvonlar = [];   // {c, ch, t}
  quti.classList.toggle('ip-yashir', yashir);

  /* ---------- kamera ---------- */
  const shkala = ()=>1 / Math.pow(zoom, .72);
  function qolla(){
    const mx = 70;
    ox = Math.min(mx, Math.max(W - W * zoom - mx, ox));
    oy = Math.min(mx, Math.max(H - H * zoom - mx, oy));
    kamera.setAttribute('transform', 'translate('+f1(ox)+','+f1(oy)+') scale('+zoom.toFixed(4)+')');
    const s = shkala();
    gS.querySelectorAll('.ip-sh').forEach(g=>g.setAttribute('transform', 'translate('+g.dataset.x+','+g.dataset.y+') scale('+s.toFixed(3)+')'));
    const s2 = (1 / Math.pow(zoom, .6)).toFixed(3);
    quti.querySelectorAll('text[data-t]').forEach(t=>t.setAttribute('transform', t.dataset.t + ' scale(' + s2 + ')'));
    karvonlar.forEach(k=>k.c.setAttribute('r', ((k.ch.s ? 3.1 : 2.7) * s * (k.ch.faol ? 1.25 : 1)).toFixed(2)));
    quti.style.setProperty('--ipz', zoom.toFixed(3));
  }
  function zoomAtrof(z, sx, sy){
    z = Math.max(1, Math.min(7, z));
    const mx = (sx - ox) / zoom, my = (sy - oy) / zoom;
    zoom = z; ox = sx - mx * zoom; oy = sy - my * zoom; qolla();
  }
  const svgNuqta = (cx, cy)=>{ const m = svg.getScreenCTM(); if(!m) return [W/2, H/2]; const p = svg.createSVGPoint(); p.x = cx; p.y = cy; const q = p.matrixTransform(m.inverse()); return [q.x, q.y]; };

  /* ---------- chizish ---------- */
  function davlatlar(){
    const dv = X.davrlar[joriy] || {davlatlar:[]};
    gD.innerHTML = dv.davlatlar.map((f, i)=>'<path class="ip-davlat" data-i="'+i+'" d="'+f.yol+'" style="fill:'+f.rang+'"/>').join('');
    gY.innerHTML = dv.davlatlar.map(f=>{
      if(!f.m || f.m[4] < 12) return '';
      let [x, y, burchak, uzun, n] = f.m; const nom = f.nom.toUpperCase();
      const oz = (DAVR[joriy].yoz || {})[f.k];   /* qo‘lda tanlangan joy: shahar va yo‘llar ustiga tushmasin; 0 — yozuvsiz */
      if(oz === 0) return '';
      if(oz){ [x, y] = px(oz[0], oz[1]).map(v=>Math.round(v)); burchak = oz[2]; if(oz[3]) uzun = oz[3]; }
      const soz = nom.split(' ');
      const qatorlar = soz.length > 1 && nom.length > 13 && !(oz && oz[4]) ? [soz.slice(0, Math.ceil(soz.length/2)).join(' '), soz.slice(Math.ceil(soz.length/2)).join(' ')] : [nom];
      const eng = Math.max(...qatorlar.map(q=>q.length));
      const o2 = Math.max(8.5, Math.min(21, uzun / (eng * .8), Math.sqrt(n) * 1.5));
      const tt = 'translate('+x+','+y+') rotate('+burchak+')';
      return '<text style="font-size:'+o2.toFixed(1)+'px" data-t="'+tt+'" transform="'+tt+'">'+qatorlar.map((q, k)=>'<tspan x="0" dy="'+(k ? '1.05em' : (qatorlar.length > 1 ? '-.18em' : '.35em'))+'">'+esc(q)+'</tspan>').join('')+'</text>';
    }).join('');
    gH.innerHTML = (DAVR[joriy].hudud || []).map(([n, lo, la, r, katta])=>{ const [x, y] = px(lo, la), tt = 'translate('+f1(x)+','+f1(y)+') rotate('+r+')'; return '<text class="'+(katta ? 'katta' : '')+'" data-t="'+tt+'" transform="'+tt+'">'+esc(n)+'</text>'; }).join('');
    gD.querySelectorAll('.ip-davlat').forEach(el=>el.onclick = ()=>{
      if(surildi) return;
      const f = dv.davlatlar[+el.dataset.i]; if(!f) return;
      gD.querySelectorAll('.ip-davlat').forEach(e=>e.classList.toggle('tanlangan', e === el));
      kS.textContent = f.nom + ' · ' + DAVR[joriy].xar;
    });
    gD.classList.remove('yangi'); cancelAnimationFrame(yangiKadr); yangiKadr = requestAnimationFrame(()=>gD.classList.add('yangi'));
  }
  function yollar(){
    chiziqlar = []; let html = '';
    Object.keys(YOL).forEach(k=>{
      YOL[k].ch.forEach((ch, j)=>{
        if(ch.d && (joriy < ch.d[0] || joriy > ch.d[1])) return;
        const pts = ch.p.map(q=>{ const ll = P(q); return px(ll[0], ll[1]); });
        const d = 'M' + pts.map(p=>f1(p[0])+','+f1(p[1])).join('L');
        html += '<g class="ip-yol'+(ch.s ? ' dengizda' : '')+'" data-y="'+k+'" style="--r:'+YOL[k].rang+'"><path class="asos" d="'+d+'"/><path class="nur" d="'+d+'"/><path class="chiz" d="'+d+'"/></g>';
        const uz = [0]; for(let i = 1; i < pts.length; i++) uz.push(uz[i-1] + Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]));
        chiziqlar.push({yol:k, pts, uz, s:!!ch.s, faol:false});
      });
    });
    gYol.innerHTML = html;
    // karvonlar: har ~95 birlikka bitta nuqta
    gK.innerHTML = ''; karvonlar = [];
    chiziqlar.forEach((ch, i)=>{
      const L = ch.uz[ch.uz.length - 1], n = Math.max(1, Math.round(L / 95));
      for(let j = 0; j < n; j++){
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('class', 'ip-k'+(ch.s ? ' kema' : '')); c.dataset.y = ch.yol; c.style.setProperty('--r', YOL[ch.yol].rang);
        gK.append(c);
        karvonlar.push({c, ch, t:(j / n + i * .137) % 1, yon:(i % 2 ? -1 : 1)});
      }
    });
    yolBelgila();
  }
  function shaharlar(){
    gS.innerHTML = Object.keys(SHAHAR).filter(k=>joriy >= SHAHAR[k][3] && joriy <= SHAHAR[k][4]).map(k=>{
      const [n, lo, la, , , yon] = SHAHAR[k], [x, y] = px(lo, la), yj = YON[yon] || YON.r;
      const nom = (ALT[k] && ALT[k][joriy]) || n;
      return '<g class="ip-sh'+(k === tanShahar ? ' tanlangan' : '')+'" data-k="'+k+'" data-x="'+f1(x)+'" data-y="'+f1(y)+'"><circle class="halqa" r="12"/><circle class="tash" r="5.2"/><circle class="ich" r="2"/>'+
        '<text class="'+(yj[2] ? 'chap' : '')+'" x="'+yj[0]+'" y="'+yj[1]+'">'+esc(nom)+'</text><title>'+esc(yashir ? 'Shahar' : nom)+'</title></g>';
    }).join('');
    gS.querySelectorAll('.ip-sh').forEach(g=>{
      g.addEventListener('pointerdown', e=>e.stopPropagation());
      g.onclick = e=>{ e.stopPropagation(); shaharBos(g.dataset.k, g); };
    });
  }
  function shaharBos(k, g){
    const nom = (ALT[k] && ALT[k][joriy]) || SHAHAR[k][0];
    if(yashir){
      g.classList.add('ochiq'); setTimeout(()=>g.classList.remove('ochiq'), 1600);
      kS.textContent = 'Siz bosgan shahar: ' + nom;
    } else {
      gS.querySelectorAll('.ip-sh').forEach(x=>x.classList.toggle('tanlangan', x === g)); tanShahar = k;
      kS.textContent = nom + ' · batafsil kartani o‘qing';
    }
    hodisa('ipak-shahar', {shahar:k, nom});
    hodisa('detal', {turD:'ipak', nom:k});
  }
  function yolBelgila(){
    gYol.querySelectorAll('.ip-yol').forEach(g=>{ g.classList.toggle('faol', g.dataset.y === tanYol); g.classList.toggle('xira', !!tanYol && g.dataset.y !== tanYol); });
    chiziqlar.forEach(ch=>ch.faol = ch.yol === tanYol);
    karvonlar.forEach(k=>{ k.c.classList.toggle('xira', !!tanYol && k.ch.yol !== tanYol); k.c.classList.toggle('faol', k.ch.yol === tanYol); });
    tag.querySelectorAll('[data-yol]').forEach(b=>b.classList.toggle('faol', b.dataset.yol === tanYol));
    qolla();
  }

  /* ---------- tugmalar (tag) ---------- */
  tag.innerHTML = '';
  const tq = document.createElement('div'); tq.className = 'ip-tag';
  tq.innerHTML = '<div class="ip-davrlar">'+DAVR.map((d, i)=>'<button data-d="'+i+'" title="'+esc(d.y+' — '+d.n)+'"><b>'+esc(d.q)+'</b><span>'+esc(d.n)+'</span></button>').join('')+'</div>'+
    '<div class="ip-yolt">'+Object.keys(YOL).map(k=>'<button data-yol="'+k+'" style="--r:'+YOL[k].rang+'"><i></i>'+esc(YOL[k].n)+'</button>').join('')+'</div>';
  tag.append(tq);
  tq.querySelectorAll('[data-d]').forEach(b=>b.onclick = ()=>{ joriy = +b.dataset.d; hudud(); });
  tq.querySelectorAll('[data-yol]').forEach(b=>b.onclick = ()=>{ tanYol = tanYol === b.dataset.yol ? null : b.dataset.yol; yolBelgila(); izohYoz(); });

  function izohYoz(){
    const d = DAVR[joriy];
    let m = '<b>'+d.y+' · '+d.n+'.</b> '+d.matn;
    if(tanYol) m += '<br><b style="color:'+YOL[tanYol].rang+'">'+YOL[tanYol].n+':</b> '+YOL[tanYol].izoh;
    m += ' <span class="ip-iz-x">Xarita: '+d.xar+'. '+d.cheklov+' Chegaralar va yo‘llar sxematik.</span>';
    if(izoh) izoh.innerHTML = m;
  }
  function hudud(){
    tq.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('faol', +b.dataset.d === joriy));
    const d = DAVR[joriy];
    quti.querySelector('.ip-ust').textContent = d.y;
    quti.querySelector('.ip-nom').textContent = d.n;
    kS.textContent = yashir ? 'Topshiriqdagi shaharni xaritada toping' : 'Shaharni bosing — tarixi bilan tanishing';
    davlatlar(); yollar(); shaharlar(); qolla(); izohYoz();
    hodisa('ipak-davr', {i:joriy, nom:d.n});
  }
  function fokus(k){
    const s = SHAHAR[k]; if(!s) return;
    tanShahar = k;
    gS.querySelectorAll('.ip-sh').forEach(x=>x.classList.toggle('tanlangan', x.dataset.k === k));
    const [x, y] = px(s[1], s[2]);
    zoom = 2.4; ox = W/2 - x * zoom; oy = H/2 + 10 - y * zoom; fokusda = true; qolla();
  }

  /* ---------- surish, g‘ildirak, ikki barmoq ---------- */
  const barmoq = new Map(); let bos = null, surildi = false, chimdi = null;
  svg.addEventListener('pointerdown', e=>{
    barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(e.pointerType === 'touch'){ try{ svg.setPointerCapture(e.pointerId); }catch(er){} }
    if(barmoq.size === 2){
      const [a, b] = [...barmoq.values()];
      const [sx, sy] = svgNuqta((a.x + b.x)/2, (a.y + b.y)/2);
      chimdi = {d:Math.hypot(a.x - b.x, a.y - b.y) || 1, z:zoom, sx, sy}; bos = null; surildi = true;
    } else { bos = {x:e.clientX, y:e.clientY, ox, oy}; surildi = false; }
  });
  svg.addEventListener('pointermove', e=>{
    if(!barmoq.has(e.pointerId)) return;
    barmoq.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(chimdi && barmoq.size >= 2){
      const [a, b] = [...barmoq.values()];
      zoomAtrof(chimdi.z * Math.hypot(a.x - b.x, a.y - b.y) / chimdi.d, chimdi.sx, chimdi.sy); fokusda = false; return;
    }
    if(!bos) return;
    const dx = e.clientX - bos.x, dy = e.clientY - bos.y;
    if(!surildi && Math.hypot(dx, dy) < 5) return;
    if(!surildi){ surildi = true; try{ svg.setPointerCapture(e.pointerId); }catch(er){} }
    const r = svg.getBoundingClientRect(), k = Math.max(VB[2] / r.width, VB[3] / r.height);
    ox = bos.ox + dx * k; oy = bos.oy + dy * k; fokusda = false; qolla();
  });
  const qoy = e=>{
    if(!barmoq.has(e.pointerId)) return;
    barmoq.delete(e.pointerId);
    if(barmoq.size === 1 && chimdi){ const [q] = [...barmoq.values()]; bos = {x:q.x, y:q.y, ox, oy}; }
    if(barmoq.size < 2) chimdi = null;
    if(!barmoq.size){ bos = null; setTimeout(()=>{ surildi = false; }, 0); }
  };
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>svg.addEventListener(t, qoy));
  svg.addEventListener('wheel', e=>{ e.preventDefault(); const [sx, sy] = svgNuqta(e.clientX, e.clientY); zoomAtrof(zoom * (e.deltaY > 0 ? 1/1.15 : 1.15), sx, sy); fokusda = false; }, {passive:false});

  /* ---------- karvon animatsiyasi ---------- */
  function nuqtaTop(ch, t){
    const L = ch.uz[ch.uz.length - 1] * t;
    let i = 1; while(i < ch.uz.length - 1 && ch.uz[i] < L) i++;
    const a = ch.pts[i-1], b = ch.pts[i], s = (L - ch.uz[i-1]) / ((ch.uz[i] - ch.uz[i-1]) || 1);
    return [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s];
  }
  function aylan(){
    kadr = requestAnimationFrame(aylan);
    const t = performance.now();
    if(document.hidden || t - oldingi < 33 || !quti.isConnected || (window.MAKON_SIFAT && MAKON_SIFAT.tejam && t - oldingi < 66)) return;
    const dt = Math.min(.1, (t - oldingi) / 1000); oldingi = t;
    for(const k of karvonlar){
      const L = k.ch.uz[k.ch.uz.length - 1] || 1;
      k.t = (k.t + dt * (k.ch.s ? 26 : 16) / L * (k.ch.faol ? 1.6 : 1)) % 1;
      const tt = k.yon > 0 ? k.t : 1 - k.t;
      const [x, y] = nuqtaTop(k.ch, tt);
      k.c.setAttribute('cx', x.toFixed(1)); k.c.setAttribute('cy', y.toFixed(1));
    }
  }

  const api = {
    idish:sahna,
    zoomla(k){ zoomAtrof(zoom / k, W/2, H/2); fokusda = false; },
    tikla(){
      zoom = 1; ox = 0; oy = 0; fokusda = false;
      /* tor (telefon) ekranda — O‘rta Osiyo markazda, kattaroq */
      const r = svg.getBoundingClientRect();
      if(r.width && r.height && r.width / r.height < 1.1){
        const [cx, cy] = px(68, 38);
        zoom = Math.min(3, (VB[2] / VB[3]) / (r.width / r.height)); ox = W/2 - cx * zoom; oy = H/2 - cy * zoom;
      }
      qolla();
    },
    holat(h){
      if(!h) return;
      let qayta = false;
      if(h.yashir !== undefined){ yashir = !!h.yashir; quti.classList.toggle('ip-yashir', yashir); qayta = true; if(yashir) tanShahar = null; }
      if(h.davr !== undefined && h.davr !== null && Number.isFinite(+h.davr)){ joriy = Math.max(0, Math.min(DAVR.length - 1, Math.round(+h.davr))); qayta = true; }
      if(h.yol !== undefined){ tanYol = YOL[h.yol] ? h.yol : null; }
      if(h.shahar !== undefined && !h.shahar) tanShahar = null;
      if(qayta) hudud(); else if(h.yol !== undefined){ yolBelgila(); izohYoz(); }
      if(h.shahar) fokus(h.shahar);
      else if(fokusda && (h.shahar !== undefined || h.davr !== undefined)) api.tikla();
    },
    qotir(){ cancelAnimationFrame(kadr); },
    davr(){ return joriy; },
    yopish(){ cancelAnimationFrame(kadr); cancelAnimationFrame(yangiKadr); if(quti.parentNode) quti.remove(); if(tag && tq.parentNode === tag) tq.remove(); if(xar && xar.get(sahna) === api) xar.delete(sahna); }
  };
  if(xar) xar.set(sahna, api);
  hudud(); api.tikla();
  if(o.yol) api.holat({yol:o.yol});
  if(o.shahar) fokus(o.shahar);
  aylan();
  return api;
}

window.MAKON3D = window.MAKON3D || {};
window.MAKON3D.ipak2D = ipak2D;
window.MAKON_IPAK = {DAVR, SHAHAR, YOL};
})();
