/* MAKON v3.15 — «mg» guruhi: matematika (6) va geometriya (5) darslari, detal kartalari va fanga bog‘lash.
   index.html da detallar2.js dan KEYIN yuklanadi; sahnalar — lib/sahna_v315_mg.js (MAKON_SAHNA['mg_*']).
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytilgan; tekshirilmagani «taxminiy».
   Test oxiridagi tur:'3d' savol sahnani `mgUq` holatida quradi (sahna shu maydonni o‘zi o‘qiydi). */
(function(){
const FAN = window.MAKON_FAN, D = window.MAKON_DARS;
if(!FAN || !D) return;
const F = id=>FAN.find(f=>f.id === id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom === nom || x.dars === dars || (eskiNomlar || []).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
/* dars ishlanmasi yig‘uvchisi */
const ish = (sinf, tur, usul, maq, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba)=>({sinf, vaqt:'45 daqiqa', tur, usul, maqsad:{talimiy:maq[0], tarbiyaviy:maq[1], rivojlantiruvchi:maq[2]}, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba});
const T3 = (s, hodisa, kalit, togri, v, izoh)=>({tur:'3d', s, hodisa, kalit, togri, v, t:0, izoh});

const MW = 'Wikipedia (inglizcha)';
const M5 = '5-sinf «Matematika» darsligi (O‘zbekiston, amaldagi nashr) — «Oddiy kasrlar» bobi';
const M6 = '6-sinf «Matematika» darsligi (O‘zbekiston, amaldagi nashr) — «Musbat va manfiy sonlar» bobi';
const A7 = '7-sinf «Algebra» darsligi (O‘zbekiston, amaldagi nashr) — «Chiziqli funksiya va uning grafigi» mavzusi';
const A9 = '9-sinf «Algebra» darsligi (O‘zbekiston, amaldagi nashr) — «Kvadrat tengsizliklar», «Tengsizliklar sistemasi» mavzulari';
const A10 = '10-sinf «Algebra va analiz asoslari» darsligi (O‘zbekiston, amaldagi nashr) — «Trigonometrik funksiyalar» bobi';
const A11 = '11-sinf «Algebra va analiz asoslari» darsligi (O‘zbekiston, amaldagi nashr) — «Hosila va uning tatbiqlari» bobi';
const G7 = '7-sinf «Geometriya» darsligi (O‘zbekiston, amaldagi nashr) — «Parallel to‘g‘ri chiziqlar» bobi';
const G8 = '8-sinf «Geometriya» darsligi (O‘zbekiston, amaldagi nashr) — «Pifagor teoremasi» mavzusi';
const G9 = '8–9-sinf «Geometriya» darsliklari (O‘zbekiston, amaldagi nashrlar) — «Aylana», «Aylanaga ichki chizilgan burchak» mavzulari';
const G10 = '10–11-sinf «Geometriya» darsligi (O‘zbekiston, amaldagi nashr) — «Ko‘pyoqlar», «Kesimlar yasash», «Muntazam ko‘pyoqlar» mavzulari';

/* ================================================================
   1. ODDIY KASRLAR — 5-sinf
   ================================================================ */
D['mat-kasrlar'] = {
  fan:'matematika', qisqaNom:'Kasrlar', nom:'Oddiy kasrlar: bo‘laklar, teng kasrlar, qo‘shish', sinf:'5-sinf',
  qisqa:'5-sinf · Matematika · «Oddiy kasrlar»',
  sahna:'mg_kasr',
  mgUq:{rejim:'tanlov', variantlar:[[2, 5], [3, 6], [3, 4]]},
  kor:{
    sarlavha:'Butunni teng bo‘laklarga bo‘lamiz',
    matn:'Pitsani 8 ta teng bo‘lakka bo‘lib, 3 tasini olsak, pitsaning 3/8 qismini olgan bo‘lamiz. Kasr chizig‘i ostidagi son — maxraj — butun nechta teng bo‘lakka bo‘linganini, ustidagi son — surat — nechta bo‘lak olinganini bildiradi. Sahnada pitsa va uning ostidagi «shokolad» (chiziqli model) bir xil kasrni ko‘rsatadi. Bo‘laklarni bosing, maxraj va suratni suring, teng kasrlar va kasrlarni qo‘shishni ko‘ring.',
    punktlar:['<b>Kasr:</b> a/b — butun b ta teng bo‘lakka bo‘lingan, a tasi olingan (b ≠ 0)','<b>Kasrning asosiy xossasi:</b> surat va maxrajni bir xil songa ko‘paytirish yoki bo‘lish kasrni o‘zgartirmaydi: 1/2 = 2/4 = 4/8','<b>Taqqoslash:</b> maxrajlari teng bo‘lsa, surati katta kasr katta: 5/8 > 3/8','<b>Qo‘shish:</b> maxrajlari teng kasrlarda suratlar qo‘shiladi: 2/8 + 3/8 = 5/8']
  },
  bolimlar:[
    {sarlavha:'Kasr turlari', jadval:[
      ['To‘g‘ri kasr','surat maxrajdan kichik: 3/8, 1/2 — qiymati 1 dan kichik'],
      ['Noto‘g‘ri kasr','surat maxrajga teng yoki katta: 8/8, 7/4 — qiymati 1 ga teng yoki katta'],
      ['Aralash son','butun va kasr qism: 7/4 = 1 3/4'],
      ['Qisqarmas kasr','surat va maxrajning 1 dan boshqa umumiy bo‘luvchisi yo‘q: 3/4, 5/8']
    ]},
    {sarlavha:'Namuna hisoblar (tekshirilgan)', jadval:[
      ['6/8 = 3/4','surat va maxraj 2 ga bo‘lindi (EKUB(6; 8) = 2)'],
      ['2/3 = 8/12','surat va maxraj 4 ga ko‘paytirildi'],
      ['3/4 va 5/8','umumiy maxraj 8: 6/8 > 5/8'],
      ['2/7 + 3/7 = 5/7','maxraj o‘zgarmaydi'],
      ['7/10 − 3/10 = 4/10 = 2/5','ayirishda ham suratlar ayiriladi'],
      ['24 ning 3/8 qismi','24 : 8 · 3 = 9']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Butun va uning bo‘lagi', matn:'Pitsa 4 ta teng bo‘lakka bo‘lingan, bittasi olingan — bu 1/4 (to‘rtdan bir, chorak). Bo‘laklar teng bo‘lishi shart: aks holda kasr haqida gapirib bo‘lmaydi.', holat:{rejim:'kasr', n:4, k:1}},
    {sarlavha:'Surat va maxraj', matn:'3/8 da maxraj 8 — butun 8 ta teng bo‘lakka bo‘lingan; surat 3 — shulardan 3 tasi olingan. Pastdagi shokolad ham xuddi shu kasrni ko‘rsatadi: 8 ta bo‘lakdan 3 tasi.', holat:{rejim:'kasr', n:8, k:3}},
    {sarlavha:'Surat maxrajga teng bo‘lsa', matn:'6/6 — barcha 6 bo‘lak olingan, ya’ni butun pitsa: 6/6 = 1. Surat maxrajdan katta bo‘lsa (masalan, 7/6), bu bittadan ko‘p pitsa demakdir — noto‘g‘ri kasr.', holat:{rejim:'kasr', n:6, k:6}},
    {sarlavha:'Teng kasrlar: 1/2 = 2/4', matn:'Chapdagi pitsa 2 bo‘lakka, o‘ngdagi 4 bo‘lakka bo‘lingan, lekin bo‘yalgan qism bir xil — yarmi. Surat va maxrajni 2 ga ko‘paytirdik: 1/2 = 2/4. Bu — kasrning asosiy xossasi.', holat:{rejim:'teng', a:1, b:2, m:2}},
    {sarlavha:'Kasrni kengaytirish va qisqartirish', matn:'2/3 ning surat va maxrajini 4 ga ko‘paytirsak 8/12 hosil bo‘ladi. Teskarisi — qisqartirish: 8/12 ning surat va maxrajini 4 ga bo‘lsak, yana 2/3.', holat:{rejim:'teng', a:2, b:3, m:4}},
    {sarlavha:'Kasrlarni taqqoslash', matn:'3/4 va 5/8 ni solishtirish uchun umumiy maxrajga keltiramiz: 3/4 = 6/8. Endi 6/8 > 5/8, demak 3/4 > 5/8. Pitsalarda ham chapdagining bo‘yalgan qismi kattaroq.', holat:{rejim:'taqqos', a:3, b:4, c1:5, d1:8}},
    {sarlavha:'Maxrajlari teng kasrlarni qo‘shish', matn:'3/8 + 2/8: bir xil kattalikdagi bo‘laklarni sanaymiz — 3 ta va 2 ta, jami 5 ta. Maxraj o‘zgarmaydi: 3/8 + 2/8 = 5/8. Maxrajlarni qo‘shib «5/16» deyish — eng ko‘p uchraydigan xato.', holat:{rejim:'qosh', qn:8, qa:3, qb:2}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Pitsa bilan kasrlar', holat:{rejim:'kasr', n:8, k:0},
    topshiriqlar:[
      {shart:'Maxrajni <b>5</b> qiling va pitsaning <b>2/5</b> qismini bo‘yang (bo‘laklarni bosing yoki suratni suring).', hodisa:'mg-kasr', kod:"ev.rejim==='kasr' && ev.n===5 && ev.k===2", izoh:'To‘g‘ri — <b>2/5</b>: butun 5 ta teng bo‘lakka bo‘lingan, 2 tasi olingan.'},
      {shart:'<b>3/4</b> ga teng, maxraji <b>8</b> bo‘lgan kasrni hosil qiling.', hodisa:'mg-kasr', kod:"ev.rejim==='kasr' && ev.n===8 && ev.k===6", izoh:'To‘g‘ri — <b>6/8</b>: 3/4 ning surat va maxraji 2 ga ko‘paytirildi.'},
      {shart:'«Teng kasrlar» rejimida <b>2/3</b> ni tanlab, ko‘paytuvchini <b>4</b> qiling.', hodisa:'mg-kasr', kod:"ev.rejim==='teng' && ev.a===2 && ev.b===3 && ev.m===4", izoh:'To‘g‘ri — <b>2/3 = 8/12</b>. Bo‘laklar 4 marta maydalandi, bo‘yalgan qism o‘zgarmadi.'},
      {shart:'«Qo‘shish» rejimida <b>2/7 + 3/7</b> ni ko‘rsating.', hodisa:'mg-kasr', kod:"ev.rejim==='qosh' && ev.n===7 && ev.a===2 && ev.b===3", izoh:'To‘g‘ri — <b>5/7</b>: suratlar qo‘shildi (2 + 3 = 5), maxraj o‘zgarmadi.'},
      {shart:'Maxraji <b>6</b> bo‘lgan ikki kasrni shunday qo‘shingki, yig‘indisi <b>butun pitsa</b> (1) bo‘lsin.', hodisa:'mg-kasr', kod:"ev.rejim==='qosh' && ev.n===6 && ev.s===6 && ev.a>0 && ev.b>0", izoh:'To‘g‘ri — suratlar yig‘indisi 6: masalan, <b>1/6 + 5/6 = 6/6 = 1</b>.'}
    ]},
  test:[
    {s:'3/8 kasrning maxraji nechaga teng?', v:['3','8','11','5'], t:1, izoh:'Maxraj — kasr chizig‘i ostidagi son: <b>8</b>. Surat esa 3.'},
    {s:'Qaysi kasr 1/2 ga teng?', v:['2/3','3/6','3/5','2/5'], t:1, izoh:'<b>3/6</b>: surat va maxraj 3 ga qisqartirilsa 1/2 hosil bo‘ladi.'},
    {s:'2/9 + 5/9 = ?', v:['7/18','7/9','10/9','3/9'], t:1, izoh:'Maxrajlari teng: suratlar qo‘shiladi, maxraj o‘zgarmaydi — <b>7/9</b>.'},
    {s:'Qaysi kasr eng katta?', v:['3/8','5/8','1/8','7/8'], t:3, izoh:'Maxrajlari teng kasrlardan surati kattasi katta: <b>7/8</b>.'},
    {s:'6/8 kasrni qisqartiring.', v:['3/4','2/3','6/4','1/2'], t:0, izoh:'EKUB(6; 8) = 2: 6 : 2 = 3, 8 : 2 = 4 — <b>3/4</b>.'},
    {s:'Qaysi kasr noto‘g‘ri kasr?', v:['3/7','9/10','7/4','1/2'], t:2, izoh:'Noto‘g‘ri kasrda surat maxrajdan katta yoki unga teng: <b>7/4</b> = 1 3/4.'},
    {s:'7/10 − 3/10 = ?', v:['4/10','4/20','10/10','3/10'], t:0, izoh:'Suratlar ayiriladi: 7 − 3 = 4, maxraj o‘zgarmaydi — <b>4/10</b> (= 2/5).'},
    {s:'Sinfda 24 o‘quvchi bor, ularning 3/8 qismi — qizlar. Sinfda nechta qiz bor?', v:['8','9','12','3'], t:1, izoh:'24 : 8 = 3 (bir bo‘lak), 3 · 3 = <b>9</b>.'},
    {s:'Pitsaning 1/4 qismi yeyildi. Pitsaning qancha qismi qoldi?', v:['1/4','2/4','3/4','4/3'], t:2, izoh:'Butun = 4/4; 4/4 − 1/4 = <b>3/4</b>.'},
    T3('Sahnada <b>1/2 ga teng</b> kasrni ko‘rsatgan pitsani bosing.', 'mg-kasr', 'kasr', ['3/6'], ['3/6 (o‘rtadagi pitsa)', 'boshqa pitsa'], '<b>3/6 = 1/2</b>: surat va maxraj 3 ga qisqaradi. 2/5 < 1/2, 3/4 > 1/2.')
  ],
  yordamchi:[
    {s:'Nega maxrajlarni qo‘shmaymiz?', j:'Maxraj bo‘lak kattaligini bildiradi: sakkizdan bir bo‘laklarni qo‘shsak, bo‘laklar baribir sakkizdan bir bo‘lib qoladi. Shuning uchun faqat bo‘laklar soni — suratlar qo‘shiladi: 3/8 + 2/8 = 5/8.', kalit:['maxraj','qo‘shish','nega']},
    {s:'Kasrni qanday qisqartiraman?', j:'Surat va maxrajni ularning eng katta umumiy bo‘luvchisiga (EKUB) bo‘ling. 6/8 da EKUB(6; 8) = 2, shuning uchun 6/8 = 3/4. Qisqartirish kasr qiymatini o‘zgartirmaydi.', kalit:['qisqartirish','ekub']},
    {s:'Maxrajlari har xil kasrlarni qanday taqqoslayman?', j:'Umumiy maxrajga keltiring: 3/4 va 5/8 uchun umumiy maxraj 8, 3/4 = 6/8. Endi suratlarni solishtiring: 6 > 5, demak 3/4 > 5/8.', kalit:['taqqoslash','umumiy']}
  ],
  maqola:[
    {sarlavha:'Kasr nima va u qayerdan kelgan?', xatboshilar:[
      'Hayotda butun narsalarni tez-tez bo‘lishga to‘g‘ri keladi: nonni sindiramiz, tarvuzni tilimlaymiz, vaqtni soatning choragi bilan o‘lchaymiz. Butunning bir yoki bir nechta teng bo‘lagini ifodalash uchun kasrlar ishlatiladi. «Kasr» so‘zi arabcha «sindirish» ma’nosidagi so‘zdan olingan; lotincha nomi <i>fractio</i> ham «sindirmoq» (<i>frangere</i>) fe’lidan.',
      'Kasrlar juda qadimdan ma’lum. Qadimgi Misrning Rind papirusi (miloddan avvalgi taxminan 1550-yil; kotib Ahmes uni undan ham qadimgi matndan ko‘chirgan) asosan surati 1 ga teng kasrlar — «misr kasrlari» bilan ishlaydi: 2/5 kabi sonlar 1/3 + 1/15 ko‘rinishida yozilgan. Bobilliklar esa oltmishlik kasrlardan foydalangan — bugungi soat va daqiqa ham o‘shandan qolgan.',
      'Kasrni gorizontal chiziq bilan yozish usuli O‘rta asrlarda arab matematiklari orqali tarqalgan, Yevropaga esa Leonardo Pizanskiy (Fibonachchi)ning 1202-yilgi «Liber Abaci» kitobi orqali keng yoyilgan. Bugungi a/b ko‘rinishi shu an’ananing davomi.'
    ]},
    {sarlavha:'Surat, maxraj va kasrning asosiy xossasi', xatboshilar:[
      'a/b yozuvida b — maxraj: butun nechta teng bo‘lakka bo‘linganini ko‘rsatadi; a — surat: shu bo‘laklardan nechta olinganini. Maxraj hech qachon nol bo‘lmaydi — butunni nol bo‘lakka bo‘lib bo‘lmaydi. Kasr chizig‘ini bo‘lish belgisi deb ham tushunish mumkin: 3/8 = 3 : 8 = 0,375.',
      'Kasrning asosiy xossasi: surat va maxrajni bir xil noldan farqli songa ko‘paytirsak yoki bo‘lsak, kasr qiymati o‘zgarmaydi. 1/2 = 2/4 = 4/8 — pitsa qanchalik mayda bo‘laklarga bo‘linmasin, yarmi baribir yarmi. Ko‘paytirish kasrni kengaytirish, bo‘lish esa qisqartirish deyiladi.',
      'Qisqartirishda surat va maxraj ularning eng katta umumiy bo‘luvchisiga (EKUB) bo‘linadi: 6/8 da EKUB = 2, natija 3/4. Endi 3 va 4 ning umumiy bo‘luvchisi faqat 1 — bu qisqarmas kasr. Javoblarni odatda qisqarmas ko‘rinishda yozish qabul qilingan.'
    ]},
    {sarlavha:'Taqqoslash, qo‘shish va ayirish', xatboshilar:[
      'Maxrajlari teng kasrlardan surati katta bo‘lgani katta: 5/8 > 3/8, chunki bir xil bo‘laklardan ko‘proq olingan. Suratlari teng kasrlardan esa maxraji kichigi katta: 1/3 > 1/5 — butun kamroq bo‘lakka bo‘linsa, har bo‘lak kattaroq. Umumiy holda kasrlar umumiy maxrajga keltirilib, so‘ng suratlari solishtiriladi.',
      'Maxrajlari teng kasrlarni qo‘shishda suratlar qo‘shiladi, maxraj o‘zgarmaydi: 2/7 + 3/7 = 5/7. Ayirishda suratlar ayiriladi: 7/10 − 3/10 = 4/10 = 2/5. Maxrajlari har xil bo‘lsa (masalan, 1/2 + 1/3), avval umumiy maxrajga keltiriladi: 3/6 + 2/6 = 5/6 — bu yuqori sinflarda batafsil o‘rganiladi.',
      'Ko‘p uchraydigan xato — maxrajlarni ham qo‘shib yuborish: 1/2 + 1/2 ni «2/4» deb yozish. Lekin ikki yarim pitsa — butun pitsa: 1/2 + 1/2 = 2/2 = 1, 2/4 esa yarim pitsa xolos. Sahnadagi uchinchi pitsa bu qoidani ko‘z oldingizda ko‘rsatadi.'
    ]},
    {sarlavha:'Sondan kasr topish va hayotdagi kasrlar', xatboshilar:[
      'Sonning a/b qismini topish uchun son maxrajga bo‘linadi va suratga ko‘paytiriladi: 24 ning 3/8 qismi 24 : 8 · 3 = 9. Masalan, 1 kg ning 3/4 qismi — 750 g, bir soatning 1/4 qismi — 15 daqiqa, 100 so‘mning 1/2 qismi — 50 so‘m.',
      'Kasrlar oshxonada (retseptdagi «yarim stakan»), musiqada (to‘rtdan bir, sakkizdan bir notalar), sportda va o‘lchovlarda doim uchraydi. Foiz ham aslida maxraji 100 bo‘lgan kasr: 37,5 % = 37,5/100 = 3/8.'
    ]}
  ],
  formulalar:[
    ['a/b,  b ≠ 0','Oddiy kasr: a — surat, b — maxraj'],
    ['a/b = (a·k)/(b·k) = (a : k)/(b : k)','Kasrning asosiy xossasi (k ≠ 0)'],
    ['a/c + b/c = (a + b)/c','Maxrajlari teng kasrlarni qo‘shish'],
    ['a/c − b/c = (a − b)/c','Maxrajlari teng kasrlarni ayirish'],
    ['n ning a/b qismi = n : b · a','Sondan kasr topish'],
    ['a/b = a : b','Kasr — bo‘linmaning boshqa yozuvi']
  ],
  qiziqarli:[
    'Qadimgi misrliklar deyarli faqat surati 1 bo‘lgan kasrlardan foydalangan (2/3 bundan istisno) — ular «misr kasrlari» deb ataladi.',
    'Rind papirusi taxminan mil. av. 1550-yilda ko‘chirilgan; unda 2/n ko‘rinishidagi kasrlarni (n = 5 dan 101 gacha toq sonlar) birlik kasrlarga ajratish jadvali bor.',
    'Soatning 60 daqiqaga, daqiqaning 60 soniyaga bo‘linishi Bobilning oltmishlik kasrlaridan meros.',
    'Musiqada nota davomiyligi ham kasr: butun, yarim, chorak (1/4), sakkizdan bir (1/8) notalar.'
  ],
  lugat:[
    ['Kasr','Butunning bir yoki bir nechta teng bo‘lagini ifodalovchi son.'],
    ['Surat','Kasr chizig‘i ustidagi son — olingan bo‘laklar soni.'],
    ['Maxraj','Kasr chizig‘i ostidagi son — butun bo‘lingan teng bo‘laklar soni.'],
    ['To‘g‘ri kasr','Surati maxrajidan kichik kasr.'],
    ['Noto‘g‘ri kasr','Surati maxrajiga teng yoki undan katta kasr.'],
    ['Aralash son','Butun va kasr qismdan iborat son: 1 3/4.'],
    ['Kasrni qisqartirish','Surat va maxrajni ularning umumiy bo‘luvchisiga bo‘lish.'],
    ['Kasrni kengaytirish','Surat va maxrajni bir xil songa ko‘paytirish.'],
    ['EKUB','Eng katta umumiy bo‘luvchi.'],
    ['Umumiy maxraj','Bir nechta kasrning maxrajlariga bo‘linadigan son.']
  ],
  manba:M5 + '; ' + MW + ': «Fraction», «Egyptian fraction», «Rhind Mathematical Papyrus», «Liber Abaci». Rind papirusi sanasi: ko‘chirilgan vaqti taxminan mil. av. 1550 (Ahmes asl matnni undan ham qadimgi deb yozgan).',
  ishlanma:ish('5-sinf', 'Yangi bilim berish', 'Interaktiv 3D model (pitsa va shokolad), juftlikda ishlash, muammoli savol',
    ['Oddiy kasr, surat va maxraj, kasrning asosiy xossasi, maxrajlari teng kasrlarni taqqoslash va qo‘shishni o‘rgatish.', 'Birgalikda ishlash, adolatli bo‘lish (tenglik) tushunchasini tarbiyalash.', 'Modeldan belgiga o‘tish, kuzatib qonuniyat topish ko‘nikmasini rivojlantirish.'],
    ['Kasrni o‘qiydi va modelda ko‘rsatadi','Teng kasrlarni topadi, kasrni qisqartiradi','Maxrajlari teng kasrlarni taqqoslaydi, qo‘shadi va ayiradi','Sondan kasr topish masalasini yechadi'],
    ['MAKON sahnasi «Kasrlar» (pitsa va shokolad modeli)','Proyektor yoki interaktiv doska','Qog‘oz doiralar (har o‘quvchiga 2 ta), qaychi','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Bitta pitsani 4 kishiga qanday adolatli bo‘lamiz?»','Taxmin aytadi.'],['8–18','<b>Surat va maxraj.</b> MAKON da 1/4, 3/8, 6/6 ni ko‘rsatadi.','Qog‘oz doirani bo‘lib, kasrlarni ko‘rsatadi.'],['18–27','<b>Teng kasrlar.</b> «Teng kasrlar» rejimi: 1/2 = 2/4, 2/3 = 8/12; qisqartirish.','Juftlikda teng kasrlar zanjirini tuzadi.'],['27–35','<b>Taqqoslash va qo‘shish.</b> 3/4 va 5/8; 3/8 + 2/8. «1/2 + 1/2 = 2/4» xatosini muhokama qiladi.','Misollar yechadi va sahnada tekshiradi.'],['35–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Surat','Olingan bo‘laklar soni.'],['Maxraj','Teng bo‘laklar soni.'],['Teng kasrlar','Qiymati bir xil kasrlar.'],['Qisqartirish','Surat va maxrajni umumiy bo‘luvchiga bo‘lish.']],
    [['3/8 da maxraj?','8'],['1/2 ga teng kasr, maxraji 6?','3/6'],['2/9 + 5/9?','7/9'],['24 ning 3/8 qismi?','9']],
    'Darslikdagi tegishli mashqlar; (1) uydagi 3 ta narsani teng bo‘laklarga bo‘lib, kasr bilan yozing; (2) 12/16 ni qisqartiring (javob: 3/4); (3) 36 ning 5/9 qismini toping (javob: 20).',
    M5 + '; ' + MW + ' «Fraction»')
};

/* ================================================================
   2. MUSBAT VA MANFIY SONLAR — 6-sinf
   ================================================================ */
D['mat-manfiy'] = {
  fan:'matematika', qisqaNom:'Manfiy sonlar', nom:'Musbat va manfiy sonlar, koordinata to‘g‘ri chizig‘i', sinf:'6-sinf',
  qisqa:'6-sinf · Matematika · «Musbat va manfiy sonlar»',
  sahna:'mg_sonoq',
  mgUq:{rejim:'nuqta', a:-3},
  kor:{
    sarlavha:'Noldan chapga ham sonlar bor',
    matn:'Qishda termometr «−5 °C» ni ko‘rsatsa, bu noldan 5 gradus past degani. Noldan kichik sonlar manfiy sonlar deyiladi va «−» belgisi bilan yoziladi. Koordinata to‘g‘ri chizig‘ida musbat sonlar 0 dan o‘ngda, manfiylari chapda joylashadi. Sahnada nuqtani sonlar o‘qi bo‘ylab siljiting, termometr bilan solishtiring, qo‘shish va ayirishni «qadam» sifatida ko‘ring.',
    punktlar:['<b>Koordinata to‘g‘ri chizig‘i:</b> sanoq boshi 0, musbat yo‘nalish (o‘ngga) va birlik kesma tanlangan to‘g‘ri chiziq','<b>Qarama-qarshi sonlar:</b> 5 va −5 — 0 dan bir xil masofada, turli tomonda','<b>Modul:</b> |a| — sondan 0 gacha masofa: |−7| = 7','<b>Qo‘shish = qadam:</b> musbat son qo‘shilsa o‘ngga, manfiy son qo‘shilsa chapga yuramiz']
  },
  bolimlar:[
    {sarlavha:'Qo‘shish va ayirish qoidalari', jadval:[
      ['Ishoralari bir xil','modullar qo‘shiladi, umumiy ishora qo‘yiladi: −2 + (−5) = −7'],
      ['Ishoralari har xil','katta moduldan kichigi ayiriladi, moduli katta sonning ishorasi olinadi: −5 + 8 = 3'],
      ['Qarama-qarshi sonlar','yig‘indisi 0: −4 + 4 = 0'],
      ['Ayirish','ayriluvchiga qarama-qarshi sonni qo‘shish: 2 − 6 = 2 + (−6) = −4'],
      ['Manfiy sonni ayirish','−3 − (−7) = −3 + 7 = 4']
    ]},
    {sarlavha:'Hayotdagi manfiy sonlar', jadval:[
      ['Harorat','−10 °C — noldan 10 gradus sovuq'],
      ['Dengiz sathi','O‘lik dengiz qirg‘og‘i — dengiz sathidan taxminan 430 m past (−430 m; qiymat yildan-yilga o‘zgaradi, taxminiy)'],
      ['Hisob-kitob','qarz — manfiy, daromad — musbat (Braxmagupta, 628-yil)'],
      ['Vaqt','start oldidan sanash: −3, −2, −1, 0']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Sanoq boshi — 0', matn:'Koordinata to‘g‘ri chizig‘ida 0 nuqtasi sanoq boshi. Undan o‘ngda musbat sonlar (+1, +2, …), chapda manfiy sonlar (−1, −2, …). 0 na musbat, na manfiy son.', holat:{rejim:'nuqta', a:0}},
    {sarlavha:'Manfiy son va termometr', matn:'A(−4): nuqta 0 dan 4 birlik chapda. Termometr ham −4 °C ni ko‘rsatadi — muzlash nuqtasidan 4 gradus past. Sonlar o‘qini bosib, nuqtani ko‘chiring.', holat:{rejim:'nuqta', a:-4}},
    {sarlavha:'Qarama-qarshi sonlar va modul', matn:'−6 va 6 — qarama-qarshi sonlar: ular 0 dan bir xil, 6 birlik uzoqlikda. Sonning 0 gacha masofasi uning moduli: |−6| = |6| = 6. Modul hech qachon manfiy bo‘lmaydi.', holat:{rejim:'modul', a:-6}},
    {sarlavha:'Ikki manfiy sonni qo‘shish', matn:'−2 + (−5): −2 dan chapga 5 qadam yuramiz va −7 ga kelamiz. Modullar qo‘shiladi (2 + 5 = 7), natija manfiy.', holat:{rejim:'qosh', a:-2, b:-5}},
    {sarlavha:'Ishoralari har xil sonlar', matn:'−5 + 8: −5 dan o‘ngga 8 qadam — 3 ga kelamiz. Termometr: ertalab −5 °C edi, 8 gradusga isidi — 3 °C bo‘ldi.', holat:{rejim:'qosh', a:-5, b:8}},
    {sarlavha:'Ayirish — qarama-qarshisini qo‘shish', matn:'2 − 6 = 2 + (−6): 2 dan chapga 6 qadam — −4. Kichik sondan katta son ayirilsa, natija manfiy bo‘ladi.', holat:{rejim:'ayir', a:2, b:6}},
    {sarlavha:'Manfiy sonni ayirish', matn:'−3 − (−7) = −3 + 7 = 4. «Minus minus» o‘ngga qadam beradi: qarzdan qarzni olib tashlash — foyda.', holat:{rejim:'ayir', a:-3, b:-7}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Sonlar o‘qida yurish', holat:{rejim:'nuqta', a:0},
    topshiriqlar:[
      {shart:'Sonlar o‘qida <b>−7</b> ni bosing.', hodisa:'mg-son', kod:"ev.bos && ev.son===-7", izoh:'To‘g‘ri — <b>−7</b> nuqtasi 0 dan 7 birlik chapda.'},
      {shart:'<b>4</b> ga qarama-qarshi sonni sonlar o‘qida bosing.', hodisa:'mg-son', kod:"ev.bos && ev.son===-4", izoh:'To‘g‘ri — <b>−4</b>: 4 bilan 0 dan bir xil uzoqlikda, lekin chap tomonda.'},
      {shart:'«Qo‘shish» rejimida <b>−6 + 9</b> ni ko‘rsating.', hodisa:'mg-son', kod:"ev.rejim==='qosh' && ev.a===-6 && ev.b===9", izoh:'To‘g‘ri — <b>−6 + 9 = 3</b>: 9 − 6 = 3, moduli katta son (9) musbat.'},
      {shart:'Harorat <b>−3 °C</b> edi, keyin <b>5 gradus soviydi</b>. «Ayirish» rejimida hisoblang.', hodisa:'mg-son', kod:"ev.rejim==='ayir' && ev.a===-3 && ev.b===5", izoh:'To‘g‘ri — <b>−3 − 5 = −8 °C</b>.'},
      {shart:'«Qo‘shish» rejimida yig‘indisi <b>0</b> bo‘ladigan ikki sonni tanlang (a ≠ 0).', hodisa:'mg-son', kod:"ev.rejim==='qosh' && ev.a!==0 && ev.natija===0", izoh:'To‘g‘ri — qarama-qarshi sonlar yig‘indisi <b>0</b> ga teng.'}
    ]},
  test:[
    {s:'Qaysi son manfiy?', v:['0','+3','−3','5'], t:2, izoh:'<b>−3</b> — noldan kichik. 0 esa na musbat, na manfiy.'},
    {s:'−8 ga qarama-qarshi son qaysi?', v:['8','−8','0','1/8'], t:0, izoh:'Qarama-qarshi son faqat ishorasi bilan farq qiladi: <b>8</b>.'},
    {s:'|−12| = ?', v:['−12','12','0','1/12'], t:1, izoh:'Modul — 0 gacha masofa, u manfiy bo‘lmaydi: <b>12</b>.'},
    {s:'−5 + (−3) = ?', v:['−8','8','−2','2'], t:0, izoh:'Ishoralar bir xil: 5 + 3 = 8, natija manfiy — <b>−8</b>.'},
    {s:'−9 + 4 = ?', v:['−13','5','−5','13'], t:2, izoh:'9 − 4 = 5, moduli katta son (−9) manfiy — <b>−5</b>.'},
    {s:'3 − 7 = ?', v:['4','−4','10','−10'], t:1, izoh:'3 + (−7): 7 − 3 = 4, natija manfiy — <b>−4</b>.'},
    {s:'Qaysi tengsizlik to‘g‘ri?', v:['−5 > −2','−5 < −2','−5 > 0','−2 < −5'], t:1, izoh:'Sonlar o‘qida −5 chaproqda turadi, shuning uchun <b>−5 < −2</b>.'},
    {s:'Ertalab −6 °C edi, tushgacha 10 gradus isidi. Tushdagi harorat?', v:['16 °C','4 °C','−16 °C','−4 °C'], t:1, izoh:'−6 + 10 = <b>4 °C</b>.'},
    {s:'−4 − (−9) = ?', v:['−13','5','−5','13'], t:1, izoh:'−4 + 9 = <b>5</b>.'},
    T3('Sahnadagi sonlar o‘qida <b>−3 ga qarama-qarshi</b> sonni bosing.', 'mg-son', 'son', ['3'], ['3', 'boshqa son'], '−3 ga qarama-qarshi son — <b>3</b>: ikkalasi 0 dan 3 birlik uzoqlikda.')
  ],
  yordamchi:[
    {s:'Nega −5 soni −2 dan kichik?', j:'Sonlar o‘qida chapdagi son doim kichik. −5 nuqtasi −2 dan chapda. Termometrda ham −5 °C −2 °C dan sovuqroq.', kalit:['kichik','taqqoslash']},
    {s:'«Minus minus plus beradi» nima degani?', j:'Manfiy sonni ayirish uning qarama-qarshisini (musbat sonni) qo‘shishga teng: 3 − (−2) = 3 + 2 = 5. Qarzni kechib yuborish — boylikni oshiradi.', kalit:['minus','ayirish']}
  ],
  maqola:[
    {sarlavha:'Manfiy sonlar tarixi', xatboshilar:[
      'Manfiy sonlar insoniyatga birdaniga qabul qilinmagan. Qadimgi Xitoyning «To‘qqiz bobli matematika» (Jiuzhang suanshu) kitobida tenglamalar sistemasini yechishda musbat koeffitsiyentlar qizil, manfiylari qora cho‘plar bilan belgilangan.',
      'Hind matematigi Braxmagupta 628-yilda yozilgan «Braxmasphutasiddxanta» asarida manfiy sonlar bilan amallar qoidalarini «boylik» (musbat) va «qarz» (manfiy) tilida bayon qilgan: «qarzni noldan ayirsak — boylik», «qarz minus nol — qarz». Yevropada esa manfiy sonlar XVII asrgacha ham ko‘pincha «soxta» sonlar deb qaralgan.',
      'Bugun manfiy sonlarsiz ob-havo ma’lumoti, bank hisobi, dengiz sathidan balandlik yoki fizikadagi zaryadni tasavvur qilish qiyin.'
    ]},
    {sarlavha:'Koordinata to‘g‘ri chizig‘i va modul', xatboshilar:[
      'To‘g‘ri chiziqda sanoq boshi (0), musbat yo‘nalish va birlik kesma tanlansa, u koordinata to‘g‘ri chizig‘i bo‘ladi. Har bir nuqtaga bitta son — uning koordinatasi mos keladi: A(−4) yozuvi A nuqta −4 da turishini bildiradi.',
      'Faqat ishorasi bilan farq qiladigan sonlar qarama-qarshi sonlar deyiladi: 7 va −7. 0 ning qarama-qarshisi — o‘zi. Sonning moduli — koordinata to‘g‘ri chizig‘ida shu sondan 0 gacha bo‘lgan masofa: |7| = |−7| = 7, |0| = 0.',
      'Koordinata to‘g‘ri chizig‘ida o‘ngdagi son chapdagisidan katta. Shuning uchun har qanday musbat son har qanday manfiy sondan katta, manfiy sonlardan esa moduli kichigi katta: −2 > −5.'
    ]},
    {sarlavha:'Qo‘shish va ayirish — qadamlar', xatboshilar:[
      'Qo‘shishni sonlar o‘qidagi yurish deb tasavvur qiling: a + b da a nuqtadan boshlab, b musbat bo‘lsa o‘ngga, manfiy bo‘lsa chapga |b| qadam yuramiz. −5 + 8: −5 dan o‘ngga 8 qadam — 3.',
      'Bundan qoidalar kelib chiqadi. Ishoralari bir xil sonlarni qo‘shishda modullar qo‘shiladi va umumiy ishora qo‘yiladi: −2 + (−5) = −7. Ishoralari har xil bo‘lsa, katta moduldan kichigi ayiriladi va moduli katta sonning ishorasi olinadi: −9 + 4 = −5.',
      'Ayirish qarama-qarshi sonni qo‘shishga keltiriladi: a − b = a + (−b). Masalan, 2 − 6 = 2 + (−6) = −4 va −3 − (−7) = −3 + 7 = 4. Ko‘p uchraydigan xato — «−3 − 5 = −2» deb yozish; to‘g‘risi −3 + (−5) = −8.'
    ]},
    {sarlavha:'Termometr va rekordlar', xatboshilar:[
      'Selsiy shkalasini shved astronomi Anders Selsiy 1742-yilda taklif qilgan; dastlab unda suvning qaynashi 0, muzlashi 100 deb olingan. Olim vafotidan (1744) keyin shkala bugungi ko‘rinishga — muzlash 0 °C, qaynash 100 °C ga aylantirilgan (buni kim qilgani manbalarda turlicha aytiladi).',
      'Jahon meteorologiya tashkiloti (WMO) tan olgan eng past o‘lchangan havo harorati — −89,2 °C: 1983-yil 21-iyulda Antarktidadagi «Vostok» stansiyasida qayd etilgan.'
    ]}
  ],
  formulalar:[
    ['a + (−a) = 0','Qarama-qarshi sonlar yig‘indisi'],
    ['|a| = a (a ≥ 0),  |a| = −a (a < 0)','Modul ta’rifi'],
    ['a − b = a + (−b)','Ayirishni qo‘shishga keltirish'],
    ['−a − b = −(a + b)','Ikki manfiy son (a, b ≥ 0)'],
    ['a − (−b) = a + b','Manfiy sonni ayirish']
  ],
  qiziqarli:[
    'Qadimgi Xitoyda musbat sonlar qizil, manfiylari qora cho‘plar bilan belgilangan — bugungi buxgalteriyadagi «qizil» (zarar) rangining aksi.',
    'Braxmagupta (628-yil) nol bilan amallarni ham qoida sifatida yozgan birinchi olimlardan biri.',
    'Selsiy shkalasi dastlab teskari bo‘lgan: 0 — qaynash, 100 — muzlash.',
    'Rasmiy tan olingan eng past havo harorati: −89,2 °C (Vostok stansiyasi, 1983-yil 21-iyul, WMO).'
  ],
  lugat:[
    ['Musbat son','Noldan katta son: +3, 7.'],
    ['Manfiy son','Noldan kichik son: −3, −7.'],
    ['Koordinata to‘g‘ri chizig‘i','Sanoq boshi, yo‘nalish va birlik kesma tanlangan to‘g‘ri chiziq.'],
    ['Koordinata','Nuqtaning o‘rnini bildiruvchi son.'],
    ['Qarama-qarshi sonlar','Faqat ishorasi bilan farq qiluvchi sonlar: 4 va −4.'],
    ['Modul','Sondan 0 gacha masofa: |−4| = 4.'],
    ['Butun sonlar','…, −2, −1, 0, 1, 2, …'],
    ['Sanoq boshi','Koordinata to‘g‘ri chizig‘idagi 0 nuqta.']
  ],
  manba:M6 + '; ' + MW + ': «Negative number», «Brahmagupta», «The Nine Chapters on the Mathematical Art», «Celsius», «Lowest temperature recorded on Earth»; WMO «Global: Lowest temperature» (wmo.int); MacTutor «Brahmagupta». O‘lik dengiz sathi (≈ −430 m) yildan-yilga pasayib boradi — taxminiy qiymat.',
  ishlanma:ish('6-sinf', 'Yangi bilim berish', 'Interaktiv sonlar o‘qi va termometr, «qadam» o‘yini, juftlikda ishlash',
    ['Manfiy son, koordinata to‘g‘ri chizig‘i, qarama-qarshi son, modul, qo‘shish va ayirish qoidalarini o‘rgatish.', 'Aniqlik, hisobni tekshirish odatini tarbiyalash.', 'Model (sonlar o‘qi) orqali qoidani keltirib chiqarish ko‘nikmasini rivojlantirish.'],
    ['Manfiy sonni o‘qiydi va o‘qda belgilaydi','Qarama-qarshi son va modulni topadi','Butun sonlarni qo‘shadi va ayiradi','Harorat masalalarini yechadi'],
    ['MAKON sahnasi «Sonlar o‘qi va termometr»','Proyektor','Poldagi lenta «sonlar o‘qi» (−10…10)','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Ob-havo xaritasi: «−5 °C nima degani?»','Javob beradi.'],['8–16','<b>Sonlar o‘qi.</b> MAKON da 0, −4, termometr; qarama-qarshi sonlar va modul.','O‘qda sonlarni belgilaydi.'],['16–28','<b>Qo‘shish — qadam.</b> −2 + (−5), −5 + 8; qoidani birga chiqarish.','Poldagi lentada «yuradi», qoidani yozadi.'],['28–35','<b>Ayirish.</b> 2 − 6, −3 − (−7).','Misollar yechadi.'],['35–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Manfiy son','Noldan kichik son.'],['Modul','0 gacha masofa.'],['Qarama-qarshi son','Ishorasi teskari son.']],
    [['|−9|?','9'],['−5 + 8?','3'],['2 − 6?','−4'],['−3 − (−7)?','4']],
    'Darslikdagi mashqlar; (1) bir hafta davomida kechki haroratni yozib, eng katta va eng kichik farqni toping; (2) −12 + 7, −8 − 4, 5 − (−6) ni hisoblang (javob: −5, −12, 11).',
    M6)
};

/* ================================================================
   3. CHIZIQLI FUNKSIYA — 7-sinf
   ================================================================ */
D['mat-chiziqli'] = {
  fan:'matematika', qisqaNom:'Chiziqli funksiya', nom:'Chiziqli funksiya y = kx + b va uning grafigi', sinf:'7-sinf',
  qisqa:'7-sinf · Algebra · «Chiziqli funksiya»',
  sahna:'mg_chiziq',
  mgUq:{k:2, b:-3, ikki:false, uch:false},
  kor:{
    sarlavha:'Ikki son — bitta to‘g‘ri chiziq',
    matn:'y = kx + b ko‘rinishidagi funksiya chiziqli funksiya deyiladi, uning grafigi — to‘g‘ri chiziq. k — burchak koeffitsiyenti: x bir birlikka ortganda y qanchaga o‘zgarishini ko‘rsatadi. b — grafik Oy o‘qini kesadigan nuqtaning ordinatasi. Sahnada k va b ni suring yoki sariq va havorang nuqtalarni sudrang: qiyalik uchburchagi Δy/Δx = k ekanini ko‘rsatadi.',
    punktlar:['<b>Chiziqli funksiya:</b> y = kx + b, x — istalgan son','<b>k &gt; 0</b> — funksiya o‘suvchi, <b>k &lt; 0</b> — kamayuvchi, <b>k = 0</b> — y = b, Ox ga parallel chiziq','<b>Oy bilan kesishish:</b> (0; b); <b>Ox bilan:</b> (−b/k; 0), k ≠ 0','<b>Parallellik:</b> k₁ = k₂ va b₁ ≠ b₂ bo‘lsa, to‘g‘ri chiziqlar parallel']
  },
  bolimlar:[
    {sarlavha:'k va b ning ma’nosi', jadval:[
      ['k = Δy / Δx','x 1 ga ortsa, y k ga o‘zgaradi; k = tg α (α — Ox bilan hosil qilingan burchak)'],
      ['b','x = 0 dagi qiymat: grafik (0; b) nuqtadan o‘tadi'],
      ['b = 0','y = kx — to‘g‘ri proporsionallik, grafik koordinata boshidan o‘tadi'],
      ['k = 0','y = b — gorizontal to‘g‘ri chiziq'],
      ['k₁ = k₂','chiziqlar parallel (b₁ ≠ b₂) yoki ustma-ust (b₁ = b₂)']
    ]},
    {sarlavha:'Namuna funksiyalar (tekshirilgan)', jadval:[
      ['y = 2x − 3','Oy: (0; −3), Ox: (1,5; 0), o‘suvchi'],
      ['y = −x + 3','Oy: (0; 3), Ox: (3; 0), kamayuvchi'],
      ['2x − 3 = −x + 3','x = 2, y = 1 — kesishish nuqtasi (2; 1)'],
      ['y = 0,5x − 2','Ox: (4; 0)'],
      ['Taksi (namuna narx)','y = 2 000x + 5 000 so‘m: 8 km — 21 000 so‘m']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'y = x — eng sodda chiziq', matn:'k = 1, b = 0. Har bir nuqtada y = x: (1; 1), (2; 2), (−3; −3). Grafik koordinata boshidan o‘tadi va 1- hamda 3-choraklar bissektrisasi bo‘ladi.', holat:{k:1, b:0, ikki:false, uch:false}},
    {sarlavha:'k — qiyalik', matn:'y = 2x: x 2 ga ortsa (Δx = 2), y 4 ga ortadi (Δy = 4). k = Δy/Δx = 2. Qiyalik uchburchagi buni ko‘rsatadi. |k| qancha katta bo‘lsa, chiziq shuncha tik.', holat:{k:2, b:0, ikki:false, uch:true}},
    {sarlavha:'k < 0 — kamayuvchi funksiya', matn:'y = −1,5x: x ortsa, y kamayadi. Chiziq chapdan o‘ngga pastga tushadi, Ox bilan o‘tmas burchak hosil qiladi.', holat:{k:-1.5, b:0, ikki:false, uch:true}},
    {sarlavha:'b — chiziqni yuqoriga-pastga suradi', matn:'y = 2x − 3: y = 2x chizig‘i 3 birlik pastga tushdi. Oy o‘qini (0; −3) da kesadi. Ox bilan: 2x − 3 = 0, x = 1,5 — (1,5; 0).', holat:{k:2, b:-3, ikki:false, uch:true}},
    {sarlavha:'k = 0 — o‘zgarmas funksiya', matn:'y = 2: x qanday bo‘lmasin, y = 2. Grafik Ox o‘qiga parallel to‘g‘ri chiziq.', holat:{k:0, b:2, ikki:false, uch:false}},
    {sarlavha:'Parallel to‘g‘ri chiziqlar', matn:'y = 2x − 3 va y = 2x + 1: burchak koeffitsiyentlari teng (k = 2), b lar har xil — chiziqlar parallel, hech qachon kesishmaydi.', holat:{k:2, b:-3, ikki:true, k2:2, b2:1, uch:false}},
    {sarlavha:'Kesishuvchi chiziqlar', matn:'y = 2x − 3 va y = −x + 3. Kesishish nuqtasida y lar teng: 2x − 3 = −x + 3, 3x = 6, x = 2, y = 1. Nuqta (2; 1).', holat:{k:2, b:-3, ikki:true, k2:-1, b2:3, uch:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'To‘g‘ri chiziqni boshqaring', holat:{k:1, b:0, ikki:false, uch:true},
    topshiriqlar:[
      {shart:'(0; 4) nuqtadan o‘tadigan <b>kamayuvchi</b> funksiya grafigini hosil qiling.', hodisa:'mg-chiziq', kod:"ev.b===4 && ev.k<0", izoh:'To‘g‘ri — b = 4, k &lt; 0: masalan, <b>y = −x + 4</b>.'},
      {shart:'<b>y = 0,5x − 2</b> grafigini hosil qiling.', hodisa:'mg-chiziq', kod:"ev.k===0.5 && ev.b===-2", izoh:'To‘g‘ri — Ox bilan kesishish: 0,5x − 2 = 0, <b>x = 4</b>.'},
      {shart:'b = −3 bo‘lib, Ox o‘qini <b>(3; 0)</b> nuqtada kesadigan chiziq hosil qiling.', hodisa:'mg-chiziq', kod:"ev.b===-3 && ev.x0!==null && Math.abs(ev.x0-3)<1e-9", izoh:'To‘g‘ri — 3k − 3 = 0, <b>k = 1</b>: y = x − 3.'},
      {shart:'Grafikning <b>Ox o‘qi bilan kesishish</b> nuqtasini bosing.', hodisa:'mg-chiziq', kod:"ev.bos && ev.nom==='ox'", izoh:'To‘g‘ri — bu nuqtada <b>y = 0</b>, x = −b/k.'},
      {shart:'«Ikkinchi chiziq»ni yoqib, uni birinchisiga <b>parallel</b> qiling.', hodisa:'mg-chiziq', kod:"ev.parallel===true", izoh:'To‘g‘ri — <b>k₁ = k₂, b₁ ≠ b₂</b>: chiziqlar parallel.'}
    ]},
  test:[
    {s:'y = 3x − 5 funksiyaning burchak koeffitsiyenti nechaga teng?', v:['−5','3','5','−3'], t:1, izoh:'y = kx + b da k — x oldidagi son: <b>k = 3</b>.'},
    {s:'y = −2x + 7 grafigi Oy o‘qini qaysi nuqtada kesadi?', v:['(0; 7)','(7; 0)','(0; −2)','(3,5; 0)'], t:0, izoh:'x = 0 da y = 7: <b>(0; 7)</b>. (3,5; 0) — Ox bilan kesishish.'},
    {s:'y = 2x − 6 grafigi Ox o‘qini qaysi nuqtada kesadi?', v:['(0; −6)','(−3; 0)','(3; 0)','(6; 0)'], t:2, izoh:'2x − 6 = 0, x = 3: <b>(3; 0)</b>.'},
    {s:'Qaysi funksiya kamayuvchi?', v:['y = 4x + 1','y = x','y = −0,5x + 3','y = 2'], t:2, izoh:'k &lt; 0 bo‘lsa kamayuvchi: <b>y = −0,5x + 3</b>. y = 2 — o‘zgarmas.'},
    {s:'Qaysi to‘g‘ri chiziq y = 3x + 1 ga parallel?', v:['y = −3x + 1','y = 3x − 4','y = x + 1','y = (1/3)x'], t:1, izoh:'Parallel chiziqlarda k teng, b har xil: <b>y = 3x − 4</b>.'},
    {s:'A(2; 7) nuqta qaysi funksiya grafigida yotadi?', v:['y = 2x + 2','y = 3x + 1','y = x + 4','y = 4x − 2'], t:1, izoh:'3 · 2 + 1 = 7 — <b>y = 3x + 1</b>. Qolganlarida x = 2 da y = 6.'},
    {s:'y = x va y = −x + 4 grafiklari qaysi nuqtada kesishadi?', v:['(2; 2)','(4; 0)','(0; 4)','(1; 1)'], t:0, izoh:'x = −x + 4, x = 2, y = 2: <b>(2; 2)</b>.'},
    {s:'y = kx + b da k = 0 bo‘lsa, grafik qanday bo‘ladi?', v:['Oy o‘qiga parallel','Ox o‘qiga parallel (b = 0 da Ox ning o‘zi)','koordinata boshidan o‘tuvchi qiya chiziq','parabola'], t:1, izoh:'y = b — <b>Ox o‘qiga parallel</b> to‘g‘ri chiziq.'},
    {s:'Taksida (namuna narx) 5 000 so‘m + har km uchun 2 000 so‘m to‘lanadi. 8 km yo‘l qancha turadi?', v:['16 000 so‘m','21 000 so‘m','13 000 so‘m','40 000 so‘m'], t:1, izoh:'y = 2 000 · 8 + 5 000 = <b>21 000 so‘m</b>. Bu — chiziqli funksiya: k = 2 000, b = 5 000.'},
    T3('Sahnada grafikning <b>Ox o‘qi bilan kesishish</b> nuqtasini bosing.', 'mg-chiziq', 'nom', ['ox'], ['(1,5; 0) nuqta', 'boshqa joy'], 'y = 2x − 3 uchun y = 0: 2x = 3, <b>x = 1,5</b>. Nuqta (1,5; 0).')
  ],
  yordamchi:[
    {s:'k ni grafikdan qanday topaman?', j:'Grafikda ikki qulay nuqta oling va k = (y₂ − y₁)/(x₂ − x₁) ni hisoblang. Masalan, (0; −3) va (2; 1): k = (1 − (−3))/(2 − 0) = 2. Sahnadagi qiyalik uchburchagi aynan shuni ko‘rsatadi.', kalit:['k','qiyalik','topish']},
    {s:'Funksiya grafigini qanday chizaman?', j:'To‘g‘ri chiziq uchun ikki nuqta yetarli. x = 0 da y = b — birinchi nuqta; ikkinchisi uchun qulay x (masalan, 1 yoki 2) oling. Ikkala nuqtadan chizg‘ich bilan to‘g‘ri chiziq o‘tkazing.', kalit:['chizish','grafik']}
  ],
  maqola:[
    {sarlavha:'Funksiya va koordinatalar', xatboshilar:[
      'Funksiya — bir kattalikning (x) har bir qiymatiga ikkinchi kattalikning (y) bitta qiymati mos keladigan bog‘lanish. «Funksiya» atamasini G. V. Leybnits XVII asr oxirida kiritgan, f(x) yozuvini esa L. Eyler 1734-yilda ishlatgan. Grafik chizish usuli R. Dekartning 1637-yilgi «Geometriya» asaridagi koordinatalar metodiga asoslanadi.',
      'Eng sodda va eng ko‘p uchraydigan funksiyalardan biri — chiziqli funksiya y = kx + b. Mahsulot narxi va miqdori, taksi haqi va masofa, bir tekis harakatdagi yo‘l va vaqt — bularning barchasi (ma’lum sharoitda) chiziqli bog‘lanish.'
    ]},
    {sarlavha:'Burchak koeffitsiyenti k', xatboshilar:[
      'k soni x bir birlikka o‘zgarganda y qancha o‘zgarishini bildiradi. Grafikdagi istalgan ikki nuqta uchun k = Δy/Δx = (y₂ − y₁)/(x₂ − x₁) — bu nisbat to‘g‘ri chiziqning qayeridan olinmasin bir xil. Shuning uchun uni qiyalik ham deyishadi.',
      'k > 0 da funksiya o‘suvchi: x ortsa, y ham ortadi va grafik chapdan o‘ngga ko‘tariladi. k < 0 da kamayuvchi. k = 0 da y = b — o‘zgarmas funksiya, grafik Ox ga parallel. Geometriyada k = tg α, bu yerda α — to‘g‘ri chiziqning Ox o‘qining musbat yo‘nalishi bilan hosil qilgan burchagi (bu yuqori sinflarda o‘rganiladi).'
    ]},
    {sarlavha:'Erkin had b va kesishish nuqtalari', xatboshilar:[
      'x = 0 bo‘lganda y = b. Demak, grafik Oy o‘qini (0; b) nuqtada kesadi. b = 0 bo‘lsa, y = kx — to‘g‘ri proporsionallik, grafik koordinata boshidan o‘tadi.',
      'Ox o‘qi bilan kesishish nuqtasini topish uchun y = 0 deymiz: kx + b = 0, x = −b/k (k ≠ 0). y = 2x − 3 uchun x = 1,5. k = 0 va b ≠ 0 bo‘lsa, grafik Ox ni umuman kesmaydi.',
      'Ikki chiziqli funksiya grafiklarining kesishish nuqtasini topish uchun ularning o‘ng tomonlari tenglashtiriladi: 2x − 3 = −x + 3, x = 2, y = 1. k lar teng bo‘lsa, tenglamaning yechimi yo‘q (chiziqlar parallel) yoki cheksiz ko‘p (ustma-ust).'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — b ni Ox bilan kesishish nuqtasi deb o‘ylash; b — Oy bilan kesishish. Ikkinchi xato — k ning ishorasini unutish: y = −2x + 1 da k = −2, 2 emas. Uchinchi xato — y = 3 ni «funksiya emas» deb o‘ylash; bu k = 0 bo‘lgan chiziqli funksiya.',
      'Tekshirish uchun odat: topilgan nuqta koordinatalarini funksiyaga qo‘yib ko‘ring. Sahnada esa k va b ni o‘z misolingizga qo‘yib, javobni grafikda solishtiring.'
    ]}
  ],
  formulalar:[
    ['y = kx + b','Chiziqli funksiya'],
    ['k = (y₂ − y₁)/(x₂ − x₁)','Burchak koeffitsiyenti ikki nuqta bo‘yicha'],
    ['(0; b)','Oy o‘qi bilan kesishish'],
    ['(−b/k; 0),  k ≠ 0','Ox o‘qi bilan kesishish'],
    ['k₁ = k₂, b₁ ≠ b₂ ⇒ parallel','Parallellik sharti'],
    ['y = kx','To‘g‘ri proporsionallik (b = 0)']
  ],
  qiziqarli:[
    'R. Dekart koordinatalar metodini 1637-yilda «Geometriya» asarida bayon qilgan — shuning uchun to‘g‘ri burchakli koordinatalar «Dekart koordinatalari» deyiladi.',
    'f(x) yozuvini L. Eyler 1734-yilda kiritgan.',
    'Ko‘chalardagi «qiyalik» belgisi (masalan, 10 %) — bu k = 0,1 ga teng: 100 m yo‘lda 10 m ko‘tarilish.'
  ],
  lugat:[
    ['Funksiya','x ning har bir qiymatiga y ning bitta qiymati mos keladigan bog‘lanish.'],
    ['Chiziqli funksiya','y = kx + b ko‘rinishidagi funksiya.'],
    ['Burchak koeffitsiyenti','k soni — grafik qiyaligi.'],
    ['Erkin had','b soni — x = 0 dagi qiymat.'],
    ['O‘suvchi funksiya','x ortganda y ham ortadigan funksiya.'],
    ['Kamayuvchi funksiya','x ortganda y kamayadigan funksiya.'],
    ['To‘g‘ri proporsionallik','y = kx ko‘rinishidagi bog‘lanish.'],
    ['Abssissa, ordinata','Nuqtaning x va y koordinatalari.']
  ],
  manba:A7 + '; ' + MW + ': «Linear function», «Slope», «Function (mathematics)», «La Géométrie», «Leonhard Euler». Leybnitsning «funksiya» atamasi: 1673-yilgi qo‘lyozma, keyingi nashrlar 1692–1694-yillar (manbalarda turlicha — matnda «XVII asr oxiri» deyilgan). Taksi narxlari — namuna, haqiqiy tarif emas.',
  ishlanma:ish('7-sinf', 'Yangi bilim berish', 'Interaktiv grafik, qiyalik uchburchagi, juftlikda ishlash',
    ['y = kx + b, k va b ning ma’nosi, kesishish nuqtalari, parallellik shartini o‘rgatish.', 'Hayotiy jarayonlarni matematik model bilan tushuntirish qiziqishini tarbiyalash.', 'Formula ↔ grafik ↔ jadval o‘rtasida o‘tish ko‘nikmasini rivojlantirish.'],
    ['k va b ning grafikka ta’sirini tushuntiradi','Kesishish nuqtalarini topadi','Parallel va kesishuvchi chiziqlarni aniqlaydi','Hayotiy masalani chiziqli funksiya bilan yozadi'],
    ['MAKON sahnasi «Chiziqli funksiya»','Proyektor','Katakli daftar, chizg‘ich','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Taksi narxi jadvali: «Qonuniyat bormi?»','Jadvaldan qonuniyat izlaydi.'],['8–18','<b>k — qiyalik.</b> MAKON: y = x, y = 2x, y = −1,5x; qiyalik uchburchagi.','Daftarda Δy/Δx ni hisoblaydi.'],['18–26','<b>b va kesishishlar.</b> y = 2x − 3: (0; −3), (1,5; 0).','Misollar yechadi.'],['26–34','<b>Ikki chiziq.</b> Parallel va kesishuvchi holatlar.','Kesishish nuqtasini hisoblaydi va sahnada tekshiradi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['k','Burchak koeffitsiyenti.'],['b','Oy bilan kesishish ordinatasi.'],['Parallel','k lar teng.']],
    [['y = 2x − 3 Ox bilan?','(1,5; 0)'],['y = −x + 4 o‘suvchimi?','Yo‘q, kamayuvchi'],['y = 3x + 1 ga parallel?','y = 3x + c, c ≠ 1']],
    'Darslikdagi mashqlar; (1) y = −2x + 4 grafigini chizing va kesishish nuqtalarini toping (javob: (0; 4), (2; 0)); (2) mobil aloqa yoki taksi tarifi uchun chiziqli funksiya tuzing.',
    A7)
};

/* ================================================================
   4. TENGSIZLIKLARNI GRAFIK USULDA YECHISH — 9-sinf
   ================================================================ */
D['mat-tengsizlik'] = {
  fan:'matematika', qisqaNom:'Tengsizliklar', nom:'Tengsizliklarni grafik usulda yechish', sinf:'9-sinf',
  qisqa:'9-sinf · Algebra · «Kvadrat tengsizliklar», «Tengsizliklar sistemasi»',
  sahna:'mg_tengsiz',
  mgUq:{rejim:'sistema', l1:{k:1, b:1, belgi:'≤'}, l2:{k:-0.5, b:-1, belgi:'>'}},
  kor:{
    sarlavha:'Javob — grafikdagi soha',
    matn:'ax² + bx + c > 0 tengsizlikni yechish — parabolaning Ox o‘qidan yuqorida yotgan qismini topish demakdir. Ildizlar parabolani bo‘laklarga ajratadi, javob esa Ox dagi oraliqlar bo‘ladi. Ikki o‘zgaruvchili y > kx + b tengsizlikning yechimi — to‘g‘ri chiziqdan yuqoridagi yarim tekislik, sistemaning yechimi — sohalarning umumiy qismi. Sahnada koeffitsiyentlarni, belgini o‘zgartiring va nuqtalarni bosib tekshiring.',
    punktlar:['<b>Kvadrat tengsizlik:</b> 1) ildizlarni toping, 2) parabola tarmoqlari yo‘nalishini aniqlang, 3) kerakli ishorali oraliqlarni yozing','<b>a &gt; 0:</b> ildizlardan tashqarida f(x) &gt; 0, ular orasida f(x) &lt; 0','<b>Qat’iy belgi</b> (&gt;, &lt;) — ildizlar javobga kirmaydi, <b>noqat’iy</b> (≥, ≤) — kiradi','<b>Sistema:</b> har bir tengsizlik sohasi chiziladi, javob — kesishma']
  },
  bolimlar:[
    {sarlavha:'Namuna tengsizliklar (tekshirilgan)', jadval:[
      ['x² − 2x − 3 < 0','ildizlar −1 va 3, a > 0 → (−1; 3)'],
      ['x² − 2x − 3 ≥ 0','(−∞; −1] ∪ [3; +∞)'],
      ['−x² + 4 > 0','ildizlar ±2, a < 0 → (−2; 2)'],
      ['x² − 4x + 4 > 0','D = 0, ildiz 2 → x ≠ 2'],
      ['x² + 2x + 3 < 0','D = −8 < 0, a > 0 → yechim yo‘q'],
      ['x² − 5x + 6 ≥ 0','(−∞; 2] ∪ [3; +∞)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'x² − 2x − 3 < 0', matn:'Ildizlar: x² − 2x − 3 = 0, D = 16, x = −1 va x = 3. a = 1 > 0 — tarmoqlar yuqoriga, parabola ildizlar orasida Ox dan pastda. Javob: (−1; 3). Belgi qat’iy — ildizlar kirmaydi (bo‘sh doiracha).', holat:{rejim:'kvadrat', a:1, b:-2, c:-3, belgi:'<'}},
    {sarlavha:'Belgini almashtiramiz: ≥ 0', matn:'Endi Ox dan yuqorida yoki ustida yotgan qism kerak: (−∞; −1] ∪ [3; +∞). Belgi noqat’iy — ildizlar ham javobga kiradi (to‘la doiracha).', holat:{rejim:'kvadrat', a:1, b:-2, c:-3, belgi:'≥'}},
    {sarlavha:'a < 0 bo‘lsa', matn:'−x² + 4 > 0: ildizlar ±2, tarmoqlar pastga. Parabola ildizlar orasida Ox dan yuqorida — javob (−2; 2).', holat:{rejim:'kvadrat', a:-1, b:0, c:4, belgi:'>'}},
    {sarlavha:'D = 0: bitta nuqta', matn:'x² − 4x + 4 > 0 ↔ (x − 2)² > 0. Parabola Ox ga x = 2 da tegadi; qolgan hamma joyda musbat. Javob: x ≠ 2, ya’ni (−∞; 2) ∪ (2; +∞).', holat:{rejim:'kvadrat', a:1, b:-4, c:4, belgi:'>'}},
    {sarlavha:'D < 0: yechim yo‘q', matn:'x² + 2x + 3 < 0: D = 4 − 12 = −8. Parabola butunlay Ox dan yuqorida — manfiy qiymat yo‘q, yechim yo‘q. (x² + 2x + 3 > 0 bo‘lsa — x istalgan son.)', holat:{rejim:'kvadrat', a:1, b:2, c:3, belgi:'<'}},
    {sarlavha:'Ikki o‘zgaruvchili tengsizlik', matn:'y ≤ x + 1: chegara y = x + 1 to‘g‘ri chizig‘i; belgi noqat’iy — chiziq yaxlit. Yechim — chiziqdan pastdagi yarim tekislik. Nuqtani bosing: (0; 0) uchun 0 ≤ 1 — yechim.', holat:{rejim:'chiziqli', l1:{k:1, b:1, belgi:'≤'}}},
    {sarlavha:'Tengsizliklar sistemasi', matn:'{ y ≤ x + 1, y > −0,5x − 1 }. Har bir tengsizlik o‘z yarim tekisligini beradi; sistemaning yechimi — ikkalasining umumiy qismi (yashil shtrixlangan soha). Chegaralar (−4/3; −1/3) nuqtada kesishadi.', holat:{rejim:'sistema', l1:{k:1, b:1, belgi:'≤'}, l2:{k:-0.5, b:-1, belgi:'>'}}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Grafik bo‘yicha yeching', holat:{rejim:'kvadrat', a:1, b:0, c:-4, belgi:'>'},
    topshiriqlar:[
      {shart:'Yechimi <b>(−2; 2)</b> oraliq bo‘ladigan kvadrat tengsizlik hosil qiling (hozir x² − 4 > 0).', hodisa:'mg-teng', kod:"ev.rejim==='kvadrat' && ev.tur==='ichki' && Math.abs(ev.x1+2)<1e-9 && Math.abs(ev.x2-2)<1e-9 && (ev.belgi==='<'||ev.belgi==='>')", izoh:'To‘g‘ri — masalan, <b>x² − 4 &lt; 0</b>: ildizlar ±2, a &gt; 0, javob ular orasida.'},
      {shart:'<b>x² − 5x + 6 ≥ 0</b> tengsizlikni sahnada hosil qiling va javobni ko‘ring.', hodisa:'mg-teng', kod:"ev.rejim==='kvadrat' && ev.a===1 && ev.b===-5 && ev.c===6 && ev.belgi==='≥'", izoh:'To‘g‘ri — ildizlar 2 va 3, javob <b>(−∞; 2] ∪ [3; +∞)</b>.'},
      {shart:'<b>Yechimi yo‘q</b> bo‘lgan kvadrat tengsizlik hosil qiling.', hodisa:'mg-teng', kod:"ev.rejim==='kvadrat' && ev.tur==='yoq'", izoh:'To‘g‘ri — masalan, D &lt; 0 va a &gt; 0 da <b>f(x) &lt; 0</b> ning yechimi yo‘q.'},
      {shart:'«y va x li tengsizlik» rejimida <b>y ≥ 2x − 1</b> ni hosil qiling.', hodisa:'mg-teng', kod:"ev.rejim==='chiziqli' && ev.k1===2 && ev.b1===-1 && ev.belgi1==='≥'", izoh:'To‘g‘ri — yechim chiziqdan <b>yuqoridagi</b> yarim tekislik, chegara yaxlit.'},
      {shart:'«Sistema» rejimida yechimlar sohasiga tegishli istalgan nuqtani bosing.', hodisa:'mg-teng', kod:"ev.rejim==='sistema' && ev.bos && ev.yechim===true", izoh:'To‘g‘ri — nuqta koordinatalari <b>ikkala</b> tengsizlikni qanoatlantiradi.'}
    ]},
  test:[
    {s:'x² − 9 < 0 tengsizlikning yechimi?', v:['(−3; 3)','(−∞; −3) ∪ (3; +∞)','(−9; 9)','[−3; 3]'], t:0, izoh:'Ildizlar ±3, a &gt; 0 — manfiy qiymatlar ildizlar orasida: <b>(−3; 3)</b>. Belgi qat’iy — qavslar yumaloq.'},
    {s:'x² − 5x + 6 > 0 tengsizlikning yechimi?', v:['(2; 3)','(−∞; 2) ∪ (3; +∞)','[2; 3]','(−3; −2)'], t:1, izoh:'Ildizlar 2 va 3, a &gt; 0: musbat qiymatlar tashqarida — <b>(−∞; 2) ∪ (3; +∞)</b>.'},
    {s:'x² + 4 > 0 tengsizlik uchun qaysi fikr to‘g‘ri?', v:['yechim yo‘q','x > −2','x — istalgan son','x = 2'], t:2, izoh:'x² ≥ 0, demak x² + 4 ≥ 4 &gt; 0 — <b>x istalgan son</b>.'},
    {s:'(x − 1)² ≤ 0 tengsizlikning yechimi?', v:['x = 1','x — istalgan son','yechim yo‘q','x > 1'], t:0, izoh:'Kvadrat manfiy bo‘lmaydi; nolga faqat <b>x = 1</b> da teng.'},
    {s:'−x² + 2x + 3 ≥ 0 tengsizlikning yechimi?', v:['(−∞; −1] ∪ [3; +∞)','[−1; 3]','(−1; 3)','[−3; 1]'], t:1, izoh:'Ildizlar −1 va 3, a &lt; 0 — musbat qiymatlar ildizlar orasida, belgi noqat’iy: <b>[−1; 3]</b>.'},
    {s:'Qaysi nuqta y > x + 2 tengsizlikni qanoatlantiradi?', v:['(1; 2)','(0; 3)','(2; 4)','(−1; 0)'], t:1, izoh:'<b>(0; 3)</b>: 3 &gt; 0 + 2. (2; 4) da 4 &gt; 4 noto‘g‘ri — chegara ustida, qat’iy belgi.'},
    {s:'y ≤ −x + 1 tengsizlikning chegarasi grafikda qanday chiziladi?', v:['uzuq chiziq','yaxlit chiziq','chizilmaydi','faqat nuqtalar'], t:1, izoh:'Belgi noqat’iy (≤) — chegara nuqtalari ham yechim, shuning uchun <b>yaxlit chiziq</b>.'},
    {s:'{ y > x, y < 3 } sistemaning yechimiga qaysi nuqta tegishli?', v:['(2; 1)','(0; 1)','(0; 4)','(3; 3)'], t:1, izoh:'<b>(0; 1)</b>: 1 &gt; 0 va 1 &lt; 3. (2; 1) birinchisini, (0; 4) ikkinchisini buzadi.'},
    {s:'x² ≥ 16 tengsizlikning yechimi?', v:['[−4; 4]','(−∞; −4] ∪ [4; +∞)','[4; +∞)','x ≥ ±4'], t:1, izoh:'x² − 16 ≥ 0, ildizlar ±4, a &gt; 0: <b>(−∞; −4] ∪ [4; +∞)</b>. Faqat x ≥ 4 deb yozish — ko‘p uchraydigan xato.'},
    T3('Sahnada sistemaning <b>yechimlar sohasiga</b> tegishli istalgan nuqtani bosing.', 'mg-teng', 'yechim', ['true'], ['yechimlar sohasidagi nuqta', 'sohadan tashqaridagi nuqta'], 'Sistemaning yechimi — ikkala yarim tekislikning <b>umumiy qismi</b> (yashil shtrixlangan soha).')
  ],
  yordamchi:[
    {s:'Qavs yumaloqmi yoki kvadratmi?', j:'Qat’iy belgi (&gt;, &lt;) — ildiz javobga kirmaydi, yumaloq qavs ( ). Noqat’iy (≥, ≤) — kiradi, kvadrat qavs [ ]. Cheksizlik oldida doim yumaloq qavs: (−∞; 2].', kalit:['qavs','belgi']},
    {s:'Ikki o‘zgaruvchili tengsizlikda qaysi tomonni bo‘yayman?', j:'Chegaradan tashqaridagi biror «sinov nuqtasini» (ko‘pincha (0; 0)) oling va tengsizlikka qo‘ying. Bajarilsa — shu nuqta turgan tomon yechim, aks holda boshqa tomon.', kalit:['tomon','soha','sinov']}
  ],
  maqola:[
    {sarlavha:'Tengsizliklar va ularning belgilari', xatboshilar:[
      '«Katta» va «kichik» belgilari (&gt;, &lt;) ingliz matematigi Tomas Xarriotning vafotidan keyin, 1631-yilda nashr etilgan kitobida paydo bo‘lgan. «Katta yoki teng» va «kichik yoki teng» (≥, ≤) belgilarini 1734-yilda fransuz olimi Per Buger ishlatgan.',
      'Tengsizliklar amaliyotda juda ko‘p uchraydi: ko‘prik ma’lum og‘irlikdan ko‘pini ko‘tarmasligi, dori dozasi chegarasi, byudjet — bularning barchasi tengsizlik bilan yoziladi. Tengsizlikning yechimi odatda bitta son emas, balki oraliq yoki soha bo‘ladi.'
    ]},
    {sarlavha:'Kvadrat tengsizlikni grafik usulda yechish', xatboshilar:[
      'ax² + bx + c > 0 (yoki &lt;, ≥, ≤) tengsizlikni yechish uchun y = ax² + bx + c parabola tasavvur qilinadi. Tengsizlik «parabolaning qaysi qismi Ox dan yuqorida (yoki pastda) yotadi?» degan savolga aylanadi.',
      'Algoritm: 1) ax² + bx + c = 0 tenglamani yechib, ildizlarni toping; 2) a ning ishorasiga qarab tarmoqlar yo‘nalishini aniqlang; 3) parabola eskizini chizing; 4) kerakli qismga mos x oraliqlarini yozing. a &gt; 0 va D &gt; 0 bo‘lsa, f(x) &gt; 0 ildizlardan tashqarida, f(x) &lt; 0 esa ular orasida.',
      'Maxsus holatlar: D = 0 bo‘lsa, parabola Ox ga bitta nuqtada tegadi — javob «x ≠ x₀», «barcha x», «x = x₀» yoki «yechim yo‘q» bo‘lishi mumkin. D &lt; 0 bo‘lsa, f(x) ning ishorasi hamma joyda a ning ishorasi bilan bir xil: javob «barcha x» yoki «yechim yo‘q».'
    ]},
    {sarlavha:'Ikki o‘zgaruvchili tengsizliklar va sistemalar', xatboshilar:[
      'y > kx + b tengsizlikning yechimi — y = kx + b to‘g‘ri chizig‘idan yuqorida yotgan barcha nuqtalar (yarim tekislik). y &lt; kx + b — pastdagi yarim tekislik. Qat’iy belgida chegara uzuq chiziq bilan (u yechimga kirmaydi), noqat’iyda yaxlit chiziq bilan chiziladi.',
      'Tengsizliklar sistemasining yechimi — barcha tengsizliklar sohalarining kesishmasi. Grafikda har bir soha o‘z rangida bo‘yaladi va hammasi ustma-ust tushgan joy javob bo‘ladi. Nuqta yechim ekanini tekshirish uchun uning koordinatalarini har bir tengsizlikka qo‘yish kifoya.',
      'Bunday masalalar iqtisodda (resurslar cheklangan holda eng yaxshi rejani topish — chiziqli dasturlash) va muhandislikda keng qo‘llanadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'x² ≥ 16 ni «x ≥ 4» yoki «x ≥ ±4» deb yozish — ikkinchi tarmoq (x ≤ −4) yo‘qoladi. To‘g‘ri javob: (−∞; −4] ∪ [4; +∞). Yana bir xato — a &lt; 0 bo‘lganda javobni a &gt; 0 dagidek yozish; shuning uchun parabola eskizini albatta chizing.',
      'Tengsizlikni manfiy songa ko‘paytirganda (bo‘lganda) belgi teskarisiga o‘zgaradi: −x² + 4 &gt; 0 ni −1 ga ko‘paytirsak, x² − 4 &lt; 0 hosil bo‘ladi.'
    ]}
  ],
  formulalar:[
    ['ax² + bx + c > 0 (< 0, ≥ 0, ≤ 0)','Kvadrat tengsizlik'],
    ['a > 0, D > 0: f > 0 ⇔ x < x₁ yoki x > x₂','Tashqi oraliqlar'],
    ['a > 0, D > 0: f < 0 ⇔ x₁ < x < x₂','Ichki oraliq'],
    ['D < 0 ⇒ f(x) ishorasi = a ishorasi','Ildizsiz holat'],
    ['y > kx + b','To‘g‘ri chiziqdan yuqoridagi yarim tekislik'],
    ['a < b ⇒ −a > −b','Manfiy songa ko‘paytirishda belgi o‘zgaradi']
  ],
  qiziqarli:[
    '&gt; va &lt; belgilari T. Xarriot vafotidan 10 yil keyin, 1631-yilda nashr etilgan kitobida paydo bo‘lgan.',
    '≤ va ≥ belgilari 1734-yilda P. Buger tomonidan kiritilgan.',
    'Tengsizliklar sistemasi bilan «eng foydali reja»ni topish — chiziqli dasturlash — XX asrning o‘rtalarida iqtisod va logistikada keng qo‘llanila boshlagan.'
  ],
  lugat:[
    ['Tengsizlik','&gt;, &lt;, ≥, ≤ belgilari bilan yozilgan munosabat.'],
    ['Kvadrat tengsizlik','ax² + bx + c ifoda qatnashgan tengsizlik (a ≠ 0).'],
    ['Qat’iy tengsizlik','&gt; yoki &lt; belgili tengsizlik.'],
    ['Noqat’iy tengsizlik','≥ yoki ≤ belgili tengsizlik.'],
    ['Oraliq','Sonlar o‘qining qismi: (a; b), [a; b].'],
    ['Yarim tekislik','To‘g‘ri chiziq bir tomonidagi barcha nuqtalar.'],
    ['Tengsizliklar sistemasi','Bir vaqtda bajarilishi kerak bo‘lgan tengsizliklar.'],
    ['Birlashma (∪)','Ikki to‘plamning hammasi birga.']
  ],
  manba:A9 + '; ' + MW + ': «Inequality (mathematics)», «Quadratic inequality», «Linear inequality», «Thomas Harriot», «Pierre Bouguer»; MacTutor «Earliest Uses of Symbols of Relation» (mathshistory.st-andrews.ac.uk).',
  ishlanma:ish('9-sinf', 'Yangi bilim berish va mustahkamlash', 'Interaktiv grafik, «sinov nuqtasi» usuli, guruhda ishlash',
    ['Kvadrat tengsizlik va ikki o‘zgaruvchili tengsizliklar sistemasini grafik usulda yechishni o‘rgatish.', 'Javobni tekshirish, mas’uliyat bilan ishlashni tarbiyalash.', 'Grafikdan javobni o‘qish, turli holatlarni tahlil qilish ko‘nikmasini rivojlantirish.'],
    ['Kvadrat tengsizlikni grafik bo‘yicha yechadi','Qat’iy va noqat’iy belgini to‘g‘ri yozadi','Ikki o‘zgaruvchili tengsizlik sohasini chizadi','Sistemaning yechimini aniqlaydi'],
    ['MAKON sahnasi «Tengsizliklar grafigi»','Proyektor','Katakli daftar, rangli qalamlar','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Takrorlash.</b> Parabola, ildizlar, diskriminant.','Javob beradi.'],['8–20','<b>Kvadrat tengsizlik.</b> MAKON: x² − 2x − 3 < 0, ≥ 0; a < 0; D = 0; D < 0.','Har holat uchun javobni yozadi.'],['20–30','<b>Ikki o‘zgaruvchili tengsizlik.</b> Yarim tekislik, sinov nuqtasi, chegara turi.','Daftarda sohalarni bo‘yaydi.'],['30–36','<b>Sistema.</b> Sohalar kesishmasi.','Guruhda sistema yechadi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Kvadrat tengsizlik','ax² + bx + c ∨ 0.'],['Yarim tekislik','Chiziqning bir tomoni.'],['Sistema','Barchasi bajarilishi kerak.']],
    [['x² − 9 < 0?','(−3; 3)'],['x² + 1 > 0?','istalgan x'],['(0; 0) y > x + 1 ni qanoatlantiradimi?','Yo‘q']],
    'Darslikdagi mashqlar; (1) x² − x − 6 ≤ 0 ni grafik usulda yeching (javob: [−2; 3]); (2) { y ≥ x − 2, y ≤ −x + 4 } sohasini chizing va 2 ta yechim nuqtasini yozing.',
    A9)
};

/* ================================================================
   5. BIRLIK AYLANA VA TRIGONOMETRIK FUNKSIYALAR — 10-sinf
   ================================================================ */
D['mat-trigonometriya'] = {
  fan:'matematika', qisqaNom:'Trigonometriya', nom:'Birlik aylana va trigonometrik funksiyalar', sinf:'10-sinf',
  qisqa:'10-sinf · Algebra va analiz asoslari · «Trigonometrik funksiyalar»',
  sahna:'mg_trig',
  mgUq:{burchak:0, sin:true, cos:true, tg:false},
  kor:{
    sarlavha:'Aylanadagi nuqta sinusoida chizadi',
    matn:'Radiusi 1 ga teng aylanada koordinata boshidan chiqqan nur Ox bilan α burchak hosil qilsin. Nur aylanani kesgan P nuqtaning abssissasi — cos α, ordinatasi — sin α. Nuqta aylana bo‘ylab aylanganda uning balandligi to‘lqin — sinusoida chizadi. Sahnada α ni suring, «Aylantirish» ni bosing va aylana hamda grafik qanday bog‘langanini kuzating.',
    punktlar:['<b>Ta’rif:</b> P(cos α; sin α) — birlik aylanadagi nuqta','<b>Asosiy ayniyat:</b> sin²α + cos²α = 1 (Pifagor teoremasidan)','<b>Tangens:</b> tg α = sin α / cos α (cos α ≠ 0)','<b>Radian:</b> 180° = π rad; sin va cos ning eng kichik musbat davri 2π']
  },
  bolimlar:[
    {sarlavha:'Muhim burchaklar jadvali', jadval:[
      ['0° (0)','sin 0 · cos 1 · tg 0'],
      ['30° (π/6)','sin 1/2 · cos √3/2 · tg √3/3'],
      ['45° (π/4)','sin √2/2 · cos √2/2 · tg 1'],
      ['60° (π/3)','sin √3/2 · cos 1/2 · tg √3'],
      ['90° (π/2)','sin 1 · cos 0 · tg mavjud emas'],
      ['180° (π)','sin 0 · cos −1 · tg 0'],
      ['270° (3π/2)','sin −1 · cos 0 · tg mavjud emas']
    ]},
    {sarlavha:'Choraklar bo‘yicha ishoralar', jadval:[
      ['I (0°–90°)','sin +, cos +, tg +'],
      ['II (90°–180°)','sin +, cos −, tg −'],
      ['III (180°–270°)','sin −, cos −, tg +'],
      ['IV (270°–360°)','sin −, cos +, tg −']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Birlik aylana', matn:'Markazi koordinata boshida, radiusi 1 bo‘lgan aylana. α = 0 da P(1; 0): cos 0 = 1, sin 0 = 0.', holat:{burchak:0, sin:true, cos:true, tg:false}},
    {sarlavha:'sin 30° = 1/2', matn:'α = 30°: P nuqtaning balandligi 1/2, abssissasi √3/2 ≈ 0,866. To‘lqinda ham x = π/6 da balandlik 1/2 — sariq uzuq chiziq ularni bog‘laydi.', holat:{burchak:30, sin:true, cos:true, tg:false}},
    {sarlavha:'45°: sinus va kosinus teng', matn:'α = 45° da P nuqta y = x bissektrisasida: sin 45° = cos 45° = √2/2 ≈ 0,707. Tekshiring: (√2/2)² + (√2/2)² = 1/2 + 1/2 = 1.', holat:{burchak:45, sin:true, cos:true, tg:false}},
    {sarlavha:'II chorak: kosinus manfiy', matn:'α = 120°: P nuqta chapda (cos 120° = −1/2), lekin tepada (sin 120° = √3/2). II chorakda sin > 0, cos < 0.', holat:{burchak:120, sin:true, cos:true, tg:false}},
    {sarlavha:'III chorak: ikkalasi ham manfiy', matn:'α = 210°: sin 210° = −1/2, cos 210° = −√3/2. Sinusoida Ox dan pastga tushdi.', holat:{burchak:210, sin:true, cos:true, tg:false}},
    {sarlavha:'Tangens chizig‘i', matn:'x = 1 urinma to‘g‘ri chizig‘ida OP nuri davomi kesgan nuqta ordinatasi — tg α. α = 60° da tg 60° = √3 ≈ 1,732. α → 90° da tangens cheksiz o‘sadi — tg 90° mavjud emas.', holat:{burchak:60, sin:true, cos:false, tg:true}},
    {sarlavha:'To‘liq aylanish — to‘liq to‘lqin', matn:'«Aylantirish» yoqilgan: nuqta 360° aylansa, sinusoida bitta to‘liq to‘lqin (davr 2π) chizadi va keyin takrorlanadi. Bu — tebranish, tovush va o‘zgaruvchan tokning matematik modeli.', holat:{burchak:0, sin:true, cos:false, tg:false, ijro:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Burchakni toping', holat:{burchak:0, sin:true, cos:true, tg:false},
    topshiriqlar:[
      {shart:'<b>sin α = 1</b> bo‘ladigan burchakni o‘rnating (0°–360°).', hodisa:'mg-trig', kod:"ev.burchak===90", izoh:'To‘g‘ri — <b>α = 90°</b>: P(0; 1) — aylananing eng yuqori nuqtasi.'},
      {shart:'<b>cos α = −1/2</b> va <b>sin α &gt; 0</b> bo‘ladigan burchakni o‘rnating.', hodisa:'mg-trig', kod:"ev.burchak===120", izoh:'To‘g‘ri — <b>α = 120°</b> (II chorak): cos 120° = −1/2, sin 120° = √3/2.'},
      {shart:'Birlik aylanada <b>sin α &lt; 0, cos α &gt; 0</b> bo‘lgan chorakdagi nuqtani bosing.', hodisa:'mg-trig', kod:"ev.bos && ev.chorak===4", izoh:'To‘g‘ri — bu <b>IV chorak</b> (270°–360°): nuqta o‘ngda va pastda.'},
      {shart:'III chorakda <b>sin α = cos α</b> bo‘ladigan burchakni o‘rnating.', hodisa:'mg-trig', kod:"ev.burchak===225", izoh:'To‘g‘ri — <b>α = 225°</b>: sin = cos = −√2/2, tg 225° = 1.'},
      {shart:'Sinusoida grafigida sin x = 0 bo‘ladigan nuqtani bosing (0 va 2π dan tashqari).', hodisa:'mg-trig', kod:"ev.bos && ev.joy==='tolqin' && ev.burchak===180", izoh:'To‘g‘ri — <b>x = π</b> (180°) da sinusoida Ox ni kesadi (0 va 2π da ham).'}
    ]},
  test:[
    {s:'sin 30° = ?', v:['√3/2','1/2','√2/2','1'], t:1, izoh:'<b>sin 30° = 1/2</b> — birlik aylanadagi nuqta balandligi.'},
    {s:'cos 60° = ?', v:['1/2','√3/2','0','−1/2'], t:0, izoh:'<b>cos 60° = 1/2</b>.'},
    {s:'Birlik aylanadagi P nuqtaning koordinatalari qanday?', v:['(sin α; cos α)','(cos α; sin α)','(tg α; 1)','(1; α)'], t:1, izoh:'Abssissa — kosinus, ordinata — sinus: <b>P(cos α; sin α)</b>.'},
    {s:'sin α < 0 va cos α < 0 bo‘lsa, α qaysi chorakda?', v:['I','II','III','IV'], t:2, izoh:'Nuqta chapda va pastda — <b>III chorak</b>.'},
    {s:'sin²α + cos²α = ?', v:['0','1','2','sin 2α'], t:1, izoh:'Asosiy trigonometrik ayniyat: <b>1</b> (birlik aylanada Pifagor teoremasi).'},
    {s:'180° necha radian?', v:['π/2','π','2π','180'], t:1, izoh:'<b>180° = π rad</b>; 1 rad ≈ 57,3°.'},
    {s:'tg 45° = ?', v:['0','√3','1','mavjud emas'], t:2, izoh:'sin 45° = cos 45°, shuning uchun <b>tg 45° = 1</b>.'},
    {s:'y = sin x funksiyaning eng kichik musbat davri?', v:['π','2π','π/2','360π'], t:1, izoh:'Nuqta aylanani to‘liq aylanib chiqqach qiymatlar takrorlanadi: <b>2π</b>.'},
    {s:'cos 90° = ?', v:['1','0','−1','mavjud emas'], t:1, izoh:'α = 90° da P(0; 1): <b>cos 90° = 0</b>.'},
    T3('Birlik aylanada <b>sin α &gt; 0 va cos α &lt; 0</b> bo‘lgan istalgan nuqtani bosing.', 'mg-trig', 'chorak', ['2'], ['II chorakdagi nuqta', 'boshqa chorakdagi nuqta'], 'Nuqta yuqorida (sin &gt; 0) va chapda (cos &lt; 0) — <b>II chorak</b> (90°–180°).')
  ],
  yordamchi:[
    {s:'Radian nima?', j:'Radiusga teng uzunlikdagi yoyga tiralgan markaziy burchak — 1 radian (≈ 57,3°). Butun aylana uzunligi 2πr, shuning uchun 360° = 2π rad, 180° = π rad.', kalit:['radian','pi']},
    {s:'Jadvaldagi qiymatlarni qanday eslab qolaman?', j:'sin uchun: 0°, 30°, 45°, 60°, 90° da √0/2, √1/2, √2/2, √3/2, √4/2 — ya’ni 0, 1/2, √2/2, √3/2, 1. Kosinus xuddi shu qator, lekin teskari tartibda.', kalit:['jadval','eslab']}
  ],
  maqola:[
    {sarlavha:'Trigonometriya tarixi: vatarlardan sinusgacha', xatboshilar:[
      'Trigonometriya astronomiya ehtiyojlaridan tug‘ilgan. Qadimgi yunon astronomi Gipparx (mil. av. II asr) aylanadagi vatarlar jadvalini tuzgan. Hind olimlari (Ariabxata, 499-yil) vatar o‘rniga yarim vatar — bugungi sinusga mos kattalik bilan ishlagan.',
      '«Sinus» so‘zining tarixi qiziq: sanskritcha «jiva» (kamon ipi) arab tiliga «jiba» bo‘lib o‘tgan, arabcha yozuvda u «jayb» (qo‘yin, bag‘ir) so‘zi bilan chalkashtirilgan va XII asrda lotin tiliga tarjima qilinganda xuddi shu ma’noni bildiruvchi <i>sinus</i> bilan berilgan.',
      'O‘rta Osiyo olimlari trigonometriyani astronomiyadan ajratib, mustaqil fan darajasiga ko‘tarishga katta hissa qo‘shgan. Abu Rayhon Beruniy «Qonuni Mas’udiy» asarida trigonometriyaga keng o‘rin bergan. Ulug‘bek rasadxonasida ishlagan G‘iyosiddin Jamshid al-Koshiy sin 1° ni juda katta aniqlikda (manbalarga ko‘ra, o‘nlik yozuvda taxminan 16 xona) hisoblagan; «Ziji Ko‘ragoniy» (Ulug‘bek ziji) ning trigonometrik jadvallari shu hisobga asoslangan.'
    ]},
    {sarlavha:'Birlik aylana orqali ta’rif', xatboshilar:[
      'To‘g‘ri burchakli uchburchakda sinus — qarshisidagi katetning gipotenuzaga nisbati. Lekin bunday ta’rif faqat 0° dan 90° gacha bo‘lgan burchaklar uchun ishlaydi. Istalgan burchak uchun birlik aylanadan foydalaniladi: Ox ning musbat yo‘nalishidan soat miliga teskari α burchakka burilgan nur aylanani P nuqtada kesadi; P(cos α; sin α).',
      'Bu ta’rifdan ko‘p xossalar bevosita ko‘rinadi. P aylanada yotgani uchun x² + y² = 1, ya’ni sin²α + cos²α = 1. Nuqta koordinatalari −1 dan 1 gacha — demak, −1 ≤ sin α ≤ 1. α ga 360° qo‘shilsa, nuqta o‘z joyiga qaytadi — sinus va kosinus davriy funksiyalar.',
      'Choraklarda ishoralar nuqtaning joylashuvidan kelib chiqadi: I chorakda ikkalasi musbat, II da sinus musbat, III da ikkalasi manfiy, IV da kosinus musbat. tg α = sin α / cos α esa I va III choraklarda musbat.'
    ]},
    {sarlavha:'Radian va sinusoida', xatboshilar:[
      'Burchakni radianda o‘lchash qulay: uzunligi radiusga teng yoyga tiralgan markaziy burchak 1 radian. 180° = π rad, 90° = π/2 rad. «Radian» atamasi 1873-yilda bosma matnda paydo bo‘lgan (Jeyms Tomson).',
      'Burchakni gorizontal o‘qqa, sinus qiymatini vertikal o‘qqa qo‘ysak, y = sin x grafigi — sinusoida hosil bo‘ladi. U −1 va 1 oralig‘ida tebranadi va har 2π da takrorlanadi. y = cos x grafigi xuddi shu to‘lqin, faqat π/2 ga chapga surilgan: cos x = sin(x + π/2).',
      'Sinusoida tabiatdagi tebranishlarning modeli: mayatnik, tovush to‘lqini, o‘zgaruvchan tok (O‘zbekistonda tarmoq chastotasi 50 Hz — sekundiga 50 ta to‘liq to‘lqin), kun uzunligining yil davomida o‘zgarishi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'sin va cos ni almashtirib yuborish: P nuqtaning abssissasi (x) — kosinus, ordinatasi (y) — sinus. Graduslar va radianlarni aralashtirish: kalkulyatorda sin 30 ni radian rejimida hisoblasangiz ≈ −0,988 chiqadi, 0,5 emas.',
      'tg 90° ni «cheksiz» deb yozish ham noto‘g‘ri: cos 90° = 0 bo‘lgani uchun tg 90° mavjud emas (aniqlanmagan).'
    ]}
  ],
  formulalar:[
    ['P(cos α; sin α)','Birlik aylanadagi nuqta'],
    ['sin²α + cos²α = 1','Asosiy trigonometrik ayniyat'],
    ['tg α = sin α / cos α','Tangens (cos α ≠ 0)'],
    ['π rad = 180°,  1 rad ≈ 57,3°','Gradus va radian'],
    ['sin(α + 2π) = sin α,  cos(α + 2π) = cos α','Davriylik'],
    ['sin(−α) = −sin α,  cos(−α) = cos α','Juft-toqlik'],
    ['−1 ≤ sin α ≤ 1,  −1 ≤ cos α ≤ 1','Qiymatlar sohasi']
  ],
  qiziqarli:[
    '«Sinus» so‘zi tarjimadagi chalkashlik natijasida paydo bo‘lgan: arabcha «jiba» «jayb» (qo‘yin) deb o‘qilgan va lotinchaga <i>sinus</i> bo‘lib o‘tgan.',
    'Al-Koshiy π ni 1424-yilda 16 o‘nli xonagacha to‘g‘ri hisoblagan — bu o‘sha davr uchun rekord edi.',
    'Ulug‘bek rasadxonasi (Samarqand, XV asr) jadvallari Yevropada ham yuqori baholangan.',
    'Elektr tarmoqdagi kuchlanish sinusoida bo‘yicha o‘zgaradi — O‘zbekistonda 50 marta sekundiga.'
  ],
  lugat:[
    ['Birlik aylana','Markazi koordinata boshida, radiusi 1 ga teng aylana.'],
    ['Sinus','Birlik aylanadagi nuqta ordinatasi.'],
    ['Kosinus','Birlik aylanadagi nuqta abssissasi.'],
    ['Tangens','Sinusning kosinusga nisbati.'],
    ['Radian','Radiusga teng yoyga tiralgan markaziy burchak.'],
    ['Chorak','Koordinata tekisligining to‘rtdan bir qismi.'],
    ['Davr','Funksiya qiymatlari takrorlanadigan eng kichik musbat son.'],
    ['Sinusoida','y = sin x funksiya grafigi.']
  ],
  manba:A10 + '; ' + MW + ': «Unit circle», «Sine and cosine», «History of trigonometry», «Radian», «Jamshīd al-Kāshī», «Zij-i Sultani», «Al-Biruni»; MacTutor «al-Kashi», «Ulugh Beg». Al-Koshiy sin 1° aniqligi manbalarda «10 ta oltmishlik xona» yoki «≈16 o‘nlik xona» deb beriladi — matnda taxminiy deyilgan. «Sinus» so‘zining lotinchaga o‘tishi Robert Chesterlik (1145) yoki Gerard Kremonalik tarjimalariga bog‘lanadi — manbalarda turlicha.',
  ishlanma:ish('10-sinf', 'Yangi bilim berish', 'Interaktiv birlik aylana va sinusoida, kuzatuv jadvali, juftlikda ishlash',
    ['Birlik aylana orqali sin, cos, tg ta’rifi, choraklardagi ishoralar, muhim burchaklar qiymatlari va radianni o‘rgatish.', 'O‘rta Osiyo olimlari (Beruniy, al-Koshiy, Ulug‘bek) merosiga hurmatni tarbiyalash.', 'Aylana harakati va grafik o‘rtasidagi bog‘lanishni ko‘rish, jadval tuzish ko‘nikmasini rivojlantirish.'],
    ['sin α va cos α ni birlik aylanada ko‘rsatadi','Choraklardagi ishoralarni aniqlaydi','Muhim burchaklar qiymatlarini biladi','Gradusni radianga o‘tkazadi'],
    ['MAKON sahnasi «Birlik aylana va sinusoida»','Proyektor','Sirkul, transportir, katakli daftar','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Charxpalak: «Kabina balandligi vaqtga qarab qanday o‘zgaradi?»','Taxmin qiladi, grafik chizadi.'],['8–20','<b>Ta’rif.</b> MAKON: P(cos α; sin α); 30°, 45°, 60°.','Jadval to‘ldiradi.'],['20–28','<b>Choraklar va ishoralar.</b> 120°, 210°, 300°.','Ishoralar jadvalini tuzadi.'],['28–35','<b>Radian va sinusoida.</b> «Aylantirish» rejimi; tangens chizig‘i.','Gradus ↔ radian mashqlari.'],['35–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['sin α','Nuqta ordinatasi.'],['cos α','Nuqta abssissasi.'],['Radian','π rad = 180°.']],
    [['sin 30°?','1/2'],['cos 180°?','−1'],['210° qaysi chorakda?','III'],['135° necha radian?','3π/4']],
    'Darslikdagi mashqlar; (1) 0° dan 360° gacha har 30° uchun sin va cos jadvalini to‘ldiring; (2) 150° va 300° ni radianda yozing (javob: 5π/6, 5π/3); (3) sin²50° + cos²50° ni hisoblamay toping (javob: 1).',
    A10)
};

/* ================================================================
   6. HOSILA VA URINMA — 11-sinf
   ================================================================ */
D['mat-hosila'] = {
  fan:'matematika', qisqaNom:'Hosila', nom:'Hosila va urinma: kesuvchidan urinmaga', sinf:'11-sinf',
  qisqa:'11-sinf · Algebra va analiz asoslari · «Hosila»',
  sahna:'mg_hosila',
  mgUq:{f:'kub', x0:0, h:1, urinma:false, hosila:false},
  kor:{
    sarlavha:'h → 0: kesuvchi urinmaga aylanadi',
    matn:'Egri chiziqda ikki nuqta — A(x₀; f(x₀)) va B(x₀ + h; f(x₀ + h)) olaylik. Ulardan o‘tuvchi kesuvchining qiyaligi Δy/Δx. B nuqta A ga yaqinlashgan sari (h → 0) kesuvchi urinmaga aylanadi, uning qiyaligi esa hosila f′(x₀) ga intiladi. Sahnada «▶ h → 0» ni bosing, A nuqtani egri chiziq bo‘ylab suring va funksiyani almashtiring.',
    punktlar:['<b>Ta’rif:</b> f′(x₀) = lim (h → 0) [f(x₀ + h) − f(x₀)] / h','<b>Geometrik ma’no:</b> f′(x₀) — x₀ nuqtadagi urinmaning burchak koeffitsiyenti','<b>Urinma tenglamasi:</b> y = f′(x₀)(x − x₀) + f(x₀)','<b>Fizik ma’no:</b> yo‘l s(t) ning hosilasi — oniy tezlik']
  },
  bolimlar:[
    {sarlavha:'Asosiy hosilalar jadvali', jadval:[
      ['(C)′ = 0','o‘zgarmasning hosilasi'],
      ['(xⁿ)′ = n·xⁿ⁻¹','daraja: (x²)′ = 2x, (x³)′ = 3x²'],
      ['(sin x)′ = cos x','(cos x)′ = −sin x'],
      ['(eˣ)′ = eˣ','o‘z-o‘ziga teng hosilali funksiya'],
      ['(u + v)′ = u′ + v′','yig‘indining hosilasi'],
      ['(C·u)′ = C·u′','o‘zgarmas ko‘paytuvchi']
    ]},
    {sarlavha:'y = x², x₀ = 1: kesuvchi qiyaliklari (hisoblangan)', jadval:[
      ['h = 1','Δy/Δx = (4 − 1)/1 = 3'],
      ['h = 0,5','(2,25 − 1)/0,5 = 2,5'],
      ['h = 0,1','(1,21 − 1)/0,1 = 2,1'],
      ['h = 0,01','(1,0201 − 1)/0,01 = 2,01'],
      ['h → 0','f′(1) = 2 · 1 = 2']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Kesuvchi', matn:'y = x², A(1; 1), h = 1,5 → B(2,5; 6,25). Kesuvchi qiyaligi Δy/Δx = (6,25 − 1)/1,5 = 3,5. Bu — [1; 2,5] oraliqdagi o‘rtacha o‘zgarish tezligi.', holat:{f:'x2', x0:1, h:1.5, urinma:false, hosila:false}},
    {sarlavha:'h kichrayadi', matn:'h = 0,5: B(1,5; 2,25), Δy/Δx = 2,5. Yashil urinma ham ko‘rindi — kesuvchi unga yaqinlashmoqda.', holat:{f:'x2', x0:1, h:0.5, urinma:true, hosila:false}},
    {sarlavha:'Limit — hosila', matn:'h = 0,01: qiyalik 2,01. h → 0 da qiyalik 2 ga intiladi: f′(1) = 2. Urinma tenglamasi: y = 2(x − 1) + 1 = 2x − 1.', holat:{f:'x2', x0:1, h:0.01, urinma:true, hosila:false}},
    {sarlavha:'Hosila ham funksiya', matn:'Har bir x₀ uchun f′(x₀) = 2x₀. Havorang uzuq chiziq — y = 2x, hosila grafigi. x₀ = −1,5 da f′ = −3 &lt; 0 — funksiya kamaymoqda.', holat:{f:'x2', x0:-1.5, h:0.01, urinma:true, hosila:true}},
    {sarlavha:'Statsionar nuqta', matn:'y = x³ − 3x, y′ = 3x² − 3. x₀ = 1 da y′ = 0 — urinma gorizontal: bu lokal minimum nuqtasi (x = −1 da — lokal maksimum). Hosila ishorasi o‘zgargan joyda funksiya o‘sishdan kamayishga o‘tadi.', holat:{f:'kub', x0:1, h:0.01, urinma:true, hosila:true}},
    {sarlavha:'(sin x)′ = cos x', matn:'y = sin x, x₀ = 0: urinma y = x (qiyalik cos 0 = 1). Hosila grafigi — kosinusoida: sinus eng tik ko‘tariladigan joyda kosinus eng katta.', holat:{f:'sin', x0:0, h:0.01, urinma:true, hosila:true}},
    {sarlavha:'(eˣ)′ = eˣ', matn:'y = eˣ ning hosilasi o‘zi bilan bir xil: har bir nuqtada urinma qiyaligi funksiya qiymatiga teng. x₀ = 0 da f(0) = 1 va f′(0) = 1 — urinma y = x + 1.', holat:{f:'exp', x0:0, h:0.01, urinma:true, hosila:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Urinmani toping', holat:{f:'x2', x0:1, h:1.5, urinma:true, hosila:false},
    topshiriqlar:[
      {shart:'y = x² funksiyada <b>x₀ = 2</b> nuqtani tanlang.', hodisa:'mg-hosila', kod:"ev.f==='x2' && Math.abs(ev.x0-2)<1e-9", izoh:'To‘g‘ri — <b>f′(2) = 4</b>, urinma y = 4x − 4.'},
      {shart:'Kesuvchi urinmaga deyarli ustma-ust tushsin: <b>h ≤ 0,05</b> qiling (yoki «▶ h → 0» tugmasi).', hodisa:'mg-hosila', kod:"ev.h<=0.05", izoh:'To‘g‘ri — h kichik bo‘lganda <b>Δy/Δx ≈ f′(x₀)</b>.'},
      {shart:'<b>y = x³ − 3x</b> funksiyani tanlab, u <b>kamayadigan</b> (f′(x₀) &lt; 0) nuqtani o‘rnating.', hodisa:'mg-hosila', kod:"ev.f==='kub' && ev.urinma<0", izoh:'To‘g‘ri — f′(x) = 3x² − 3 &lt; 0 bo‘ladi, qachonki <b>−1 &lt; x &lt; 1</b>.'},
      {shart:'y = x³ − 3x grafigida <b>urinma gorizontal</b> bo‘ladigan nuqtani bosing.', hodisa:'mg-hosila', kod:"ev.f==='kub' && ev.bos && ev.nom==='statsionar'", izoh:'To‘g‘ri — <b>x = −1 yoki x = 1</b>: f′(x) = 0.'},
      {shart:'y = sin x da <b>f′(x₀) = 1</b> bo‘ladigan x₀ ni toping.', hodisa:'mg-hosila', kod:"ev.f==='sin' && Math.abs(ev.urinma-1)<1e-6", izoh:'To‘g‘ri — cos x₀ = 1, <b>x₀ = 0</b> (slayder oralig‘ida).'}
    ]},
  test:[
    {s:'(x²)′ = ?', v:['x','2x','x²/2','2'], t:1, izoh:'(xⁿ)′ = n·xⁿ⁻¹: <b>2x</b>.'},
    {s:'f(x) = x³ bo‘lsa, f′(2) = ?', v:['8','6','12','4'], t:2, izoh:'f′(x) = 3x², f′(2) = 3 · 4 = <b>12</b>.'},
    {s:'Hosilaning geometrik ma’nosi nima?', v:['funksiya qiymati','urinmaning burchak koeffitsiyenti','grafik ostidagi yuza','ildizlar soni'], t:1, izoh:'f′(x₀) — x₀ nuqtadagi <b>urinmaning burchak koeffitsiyenti</b>. Grafik ostidagi yuza — integral mavzusi.'},
    {s:'(sin x)′ = ?', v:['−cos x','cos x','sin x','−sin x'], t:1, izoh:'<b>(sin x)′ = cos x</b>; (cos x)′ = −sin x.'},
    {s:'Agar oraliqda f′(x) > 0 bo‘lsa, funksiya shu oraliqda…', v:['kamayadi','o‘sadi','o‘zgarmas','albatta maksimumga ega'], t:1, izoh:'Hosila musbat — urinmalar ko‘tariladi, funksiya <b>o‘sadi</b>.'},
    {s:'y = x² grafigiga x₀ = 3 nuqtada o‘tkazilgan urinma tenglamasi?', v:['y = 6x − 9','y = 3x','y = 6x + 9','y = 9x − 6'], t:0, izoh:'f(3) = 9, f′(3) = 6: y = 6(x − 3) + 9 = <b>6x − 9</b>.'},
    {s:'(5x³ − 2x + 7)′ = ?', v:['15x² − 2','5x² − 2','15x² + 5','15x³ − 2'], t:0, izoh:'(5x³)′ = 15x², (−2x)′ = −2, (7)′ = 0: <b>15x² − 2</b>.'},
    {s:'(eˣ)′ = ?', v:['x·eˣ⁻¹','eˣ','ln x','1'], t:1, izoh:'<b>eˣ</b> — hosilasi o‘ziga teng funksiya.'},
    {s:'y = x³ − 3x funksiyaning statsionar nuqtalari?', v:['x = 0','x = ±1','x = ±3','x = 3'], t:1, izoh:'y′ = 3x² − 3 = 0, x² = 1: <b>x = ±1</b>.'},
    {s:'Jism s(t) = t² (metr) qonun bilan harakatlanadi. t = 3 s dagi tezligi?', v:['9 m/s','6 m/s','3 m/s','2 m/s'], t:1, izoh:'v(t) = s′(t) = 2t, v(3) = <b>6 m/s</b>. 9 m — shu paytgacha bosib o‘tilgan yo‘l.'},
    T3('y = x³ − 3x grafigida <b>urinma gorizontal</b> bo‘ladigan nuqtalardan birini bosing.', 'mg-hosila', 'nom', ['statsionar'], ['statsionar nuqta (x = −1 yoki x = 1)', 'boshqa nuqta'], 'y′ = 3x² − 3 = 0 da, ya’ni <b>x = ±1</b> da urinma gorizontal: (−1; 2) — lokal maksimum, (1; −2) — lokal minimum.')
  ],
  yordamchi:[
    {s:'Nega h = 0 deb qo‘ymaymiz?', j:'h = 0 da ikkala nuqta ustma-ust tushadi va Δy/Δx = 0/0 — ma’nosiz ifoda. Shuning uchun h nolga intiltiriladi (limit), lekin nolga tenglashtirilmaydi.', kalit:['h','nol','limit']},
    {s:'Urinma tenglamasini qanday yozaman?', j:'1) f(x₀) ni hisoblang; 2) f′(x) ni topib, f′(x₀) ni hisoblang; 3) y = f′(x₀)(x − x₀) + f(x₀) ga qo‘ying. Masalan, y = x², x₀ = 1: y = 2(x − 1) + 1 = 2x − 1.', kalit:['urinma','tenglama']}
  ],
  maqola:[
    {sarlavha:'Tarix: Nyuton va Leybnits', xatboshilar:[
      'Urinma va eng katta-eng kichik qiymatlar masalalari bilan XVII asrda ko‘plab olimlar shug‘ullangan; P. Ferma 1630-yillarda urinma o‘tkazish usulini taklif qilgan. Differensial hisobni tizimli ravishda ikki olim — Isaak Nyuton va Gotfrid Leybnits bir-biridan mustaqil yaratgan.',
      'Nyutonning «flyuksiyalar» haqidagi dastlabki qo‘lyozmalari 1665–1666-yillarga tegishli, lekin u natijalarini ancha keyin nashr qilgan. Leybnits esa 1684-yilda «Acta Eruditorum» jurnalida «Nova Methodus pro Maximis et Minimis» maqolasini chop etib, dx, dy belgilarini kiritgan. Kim birinchi ekani haqida uzoq bahs bo‘lgan; bugun ikkalasi ham asoschi deb tan olinadi.',
      'f′(x) — «shtrix» yozuvi J. L. Lagranj nomi bilan bog‘liq; bugungi maktab darsliklarida aynan shu yozuv ishlatiladi.'
    ]},
    {sarlavha:'Kesuvchidan urinmaga', xatboshilar:[
      'Grafikda A(x₀; f(x₀)) va B(x₀ + h; f(x₀ + h)) nuqtalarni olaylik. Funksiya orttirmasi Δy = f(x₀ + h) − f(x₀), argument orttirmasi Δx = h. Nisbat Δy/Δx — AB kesuvchining burchak koeffitsiyenti, ya’ni [x₀; x₀ + h] oraliqdagi o‘rtacha o‘zgarish tezligi.',
      'h kichraygan sari B nuqta A ga yaqinlashadi va kesuvchi A nuqtadagi urinmaga aylanadi. Nisbatning limiti — hosila: f′(x₀) = lim(h → 0) Δy/Δx. Masalan, y = x² uchun Δy/Δx = ((x₀ + h)² − x₀²)/h = 2x₀ + h, h → 0 da 2x₀. Shuning uchun (x²)′ = 2x.',
      'Hosila geometrik ma’noda urinmaning qiyaligi. Shundan urinma tenglamasi kelib chiqadi: y = f′(x₀)(x − x₀) + f(x₀).'
    ]},
    {sarlavha:'Hosila nimaga kerak?', xatboshilar:[
      'Fizikada yo‘lning vaqt bo‘yicha hosilasi — oniy tezlik, tezlikning hosilasi — tezlanish. s(t) = t² bo‘lsa, v(t) = 2t: 3-sekundda tezlik 6 m/s. Iqtisodda hosila xarajat yoki foydaning o‘zgarish sur’atini ko‘rsatadi.',
      'Hosila ishorasi funksiyaning o‘sish va kamayishini aniqlaydi: f′ &gt; 0 — o‘sadi, f′ &lt; 0 — kamayadi. f′(x₀) = 0 bo‘lgan nuqtalar statsionar deyiladi; ekstremumlar (maksimum va minimum) shular orasidan izlanadi. y = x³ − 3x da x = −1 — maksimum, x = 1 — minimum.',
      'Eng katta yuzali maydon, eng arzon idish, eng qisqa yo‘l — bunday optimallashtirish masalalari hosila yordamida yechiladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'O‘zgarmas hadni «saqlab qolish»: (x² + 7)′ = 2x, 2x + 7 emas. (x³)′ ni «3x³» deb yozish — daraja bittaga kamayishi kerak: 3x². Urinma tenglamasida f(x₀) o‘rniga f′(x₀) ni qo‘yib yuborish.',
      'f′(x₀) = 0 bo‘lsa, bu nuqta albatta ekstremum deb o‘ylash ham xato: y = x³ da x = 0 da hosila nol, lekin funksiya o‘sishda davom etadi.'
    ]}
  ],
  formulalar:[
    ['f′(x₀) = lim (h→0) [f(x₀ + h) − f(x₀)] / h','Hosila ta’rifi'],
    ['y = f′(x₀)(x − x₀) + f(x₀)','Urinma tenglamasi'],
    ['(xⁿ)′ = n·xⁿ⁻¹','Darajali funksiya'],
    ['(sin x)′ = cos x,  (cos x)′ = −sin x','Trigonometrik funksiyalar'],
    ['(eˣ)′ = eˣ','Ko‘rsatkichli funksiya'],
    ['(u ± v)′ = u′ ± v′,  (Cu)′ = Cu′','Differensiallash qoidalari'],
    ['v(t) = s′(t)','Oniy tezlik']
  ],
  qiziqarli:[
    'Leybnits 1684-yilda nashr etgan maqolasi nomi «Maksimum va minimumlar uchun yangi usul» deb tarjima qilinadi.',
    'Nyutonning «Flyuksiyalar usuli» asari 1671-yilda yozilgan, lekin 1736-yilda — vafotidan keyin nashr etilgan.',
    'eˣ — hosilasi o‘ziga teng yagona (o‘zgarmas ko‘paytuvchi aniqligida) funksiya.'
  ],
  lugat:[
    ['Hosila','Funksiya orttirmasining argument orttirmasiga nisbatining limiti.'],
    ['Kesuvchi','Egri chiziqni ikki nuqtada kesuvchi to‘g‘ri chiziq.'],
    ['Urinma','Kesuvchining limit holati — egri chiziqqa bir nuqtada «tegib o‘tuvchi» chiziq.'],
    ['Orttirma','Δx — argument, Δy — funksiya o‘zgarishi.'],
    ['Limit','Qiymat intiladigan son.'],
    ['Statsionar nuqta','Hosila nolga teng nuqta.'],
    ['Ekstremum','Lokal maksimum yoki minimum.'],
    ['Oniy tezlik','Yo‘lning vaqt bo‘yicha hosilasi.']
  ],
  manba:A11 + '; ' + MW + ': «Derivative», «Tangent», «Leibniz’s notation», «Nova Methodus pro Maximis et Minimis», «Method of Fluxions», «Notation for differentiation», «Pierre de Fermat».',
  ishlanma:ish('11-sinf', 'Yangi bilim berish', 'Interaktiv animatsiya (h → 0), tadqiqot jadvali, juftlikda ishlash',
    ['Hosila ta’rifi, geometrik va fizik ma’nosi, urinma tenglamasi va asosiy hosilalarni o‘rgatish.', 'Ilmiy bahs madaniyati (Nyuton–Leybnits) va aniqlikni tarbiyalash.', 'Limit g‘oyasini kuzatish orqali tushunish, jadvaldan xulosa chiqarish ko‘nikmasini rivojlantirish.'],
    ['Hosilani kesuvchi qiyaligining limiti sifatida tushuntiradi','Asosiy hosilalarni topadi','Urinma tenglamasini yozadi','Statsionar nuqtalarni topadi'],
    ['MAKON sahnasi «Hosila va urinma»','Proyektor','Kalkulyator','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Spidometr: «Tezlikni aynan shu soniyada qanday o‘lchaymiz?»','Taxmin aytadi.'],['8–18','<b>Kesuvchi va limit.</b> MAKON: y = x², h = 2 → 0,01; jadval.','Kalkulyatorda Δy/Δx ni hisoblaydi.'],['18–26','<b>Ta’rif va urinma tenglamasi.</b>','y = x², x₀ = 1 va 3 uchun urinma yozadi.'],['26–34','<b>Hosila grafigi, statsionar nuqtalar.</b> x³ − 3x, sin x, eˣ.','O‘sish-kamayish oraliqlarini aniqlaydi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Hosila','Kesuvchi qiyaligining limiti.'],['Urinma','y = f′(x₀)(x − x₀) + f(x₀).'],['Statsionar nuqta','f′ = 0.']],
    [['(x³)′?','3x²'],['y = x² ning x₀ = 1 dagi urinmasi?','y = 2x − 1'],['s = t², v(3)?','6 m/s']],
    'Darslikdagi mashqlar; (1) y = x² − 4x grafigiga x₀ = 3 da urinma yozing (javob: y = 2x − 9); (2) y = x³ − 12x ning statsionar nuqtalarini toping (javob: x = ±2).',
    A11)
};

/* ================================================================
   7. PARALLEL TO‘G‘RI CHIZIQLAR VA KESUVCHI — 7-sinf (geometriya)
   ================================================================ */
D['geo-parallel'] = {
  fan:'geometriya', qisqaNom:'Parallel chiziqlar', nom:'Parallel to‘g‘ri chiziqlar va kesuvchi: burchaklar', sinf:'7-sinf',
  qisqa:'7-sinf · Geometriya · «Parallel to‘g‘ri chiziqlar»',
  sahna:'mg_parallel',
  mgUq:{phi:60, beta:0, tanla:null, burchak:null, qiymat:false},
  kor:{
    sarlavha:'Sakkiz burchak — faqat ikki xil qiymat',
    matn:'Ikki parallel to‘g‘ri chiziq a va b ni uchinchi to‘g‘ri chiziq — kesuvchi c kesib o‘tsa, 8 ta burchak hosil bo‘ladi. Ular juft-juft nomlanadi: vertikal, qo‘shni, mos, ichki almashinuvchi, ichki bir tomonli. a ∥ b bo‘lsa, barcha burchaklar faqat ikki qiymatdan birini oladi: φ yoki 180° − φ. Sahnada kesuvchini aylantiring, juftliklarni tanlang va burchaklarni bosing.',
    punktlar:['<b>Vertikal burchaklar</b> teng (∠1 = ∠4); <b>qo‘shni burchaklar</b> yig‘indisi 180°','<b>a ∥ b</b> bo‘lsa: mos burchaklar teng, ichki almashinuvchi burchaklar teng','<b>a ∥ b</b> bo‘lsa: ichki bir tomonli burchaklar yig‘indisi 180°','<b>Parallellik alomati:</b> mos (yoki ichki almashinuvchi) burchaklar teng bo‘lsa, a ∥ b']
  },
  bolimlar:[
    {sarlavha:'Sahnadagi raqamlash', jadval:[
      ['a chizig‘ida','∠1 — chap-yuqori, ∠2 — o‘ng-yuqori, ∠3 — chap-past, ∠4 — o‘ng-past'],
      ['b chizig‘ida','∠5 — chap-yuqori, ∠6 — o‘ng-yuqori, ∠7 — chap-past, ∠8 — o‘ng-past'],
      ['Vertikal','1 va 4, 2 va 3, 5 va 8, 6 va 7'],
      ['Mos','1 va 5, 2 va 6, 3 va 7, 4 va 8'],
      ['Ichki almashinuvchi','3 va 6, 4 va 5'],
      ['Ichki bir tomonli','3 va 5, 4 va 6'],
      ['Tashqi almashinuvchi','1 va 8, 2 va 7']
    ], matn:'Darsliklarda burchaklar boshqacha raqamlanishi mumkin — muhimi raqam emas, burchakning joylashuvi (ichki/tashqi, kesuvchining qaysi tomonida).'}
  ],
  bosqichlar:[
    {sarlavha:'Kesuvchi va sakkiz burchak', matn:'a ∥ b, c — kesuvchi. Har bir kesishish nuqtasida 4 ta burchak: jami 8 ta. φ = 60° da ular faqat 60° va 120° qiymatlarni oladi.', holat:{phi:60, beta:0, tanla:null, burchak:null}},
    {sarlavha:'Vertikal burchaklar', matn:'∠1 va ∠4, ∠2 va ∠3 — vertikal burchaklar: biri ikkinchisining tomonlari davomidan hosil bo‘ladi. Ular doim teng (parallellikka bog‘liq emas).', holat:{phi:60, beta:0, tanla:'vertikal', burchak:null}},
    {sarlavha:'Qo‘shni burchaklar', matn:'∠1 va ∠2 bir tomonni umumiy qilib, birgalikda yoyiq burchak hosil qiladi: ∠1 + ∠2 = 180°.', holat:{phi:60, beta:0, tanla:'qoshni', burchak:null}},
    {sarlavha:'Mos burchaklar', matn:'∠2 va ∠6 — «bir xil joyda» turgan burchaklar: har biri o‘z chizig‘ining o‘ng-yuqorisida. a ∥ b bo‘lsa, mos burchaklar teng.', holat:{phi:60, beta:0, tanla:'mos', burchak:null}},
    {sarlavha:'Ichki almashinuvchi burchaklar', matn:'∠3 va ∠6 — a va b orasida (ichki), kesuvchining turli tomonida. a ∥ b bo‘lsa, ular teng. Kesuvchini aylantiring — tenglik saqlanadi.', holat:{phi:60, beta:0, tanla:'ichki_almash', burchak:null}},
    {sarlavha:'Ichki bir tomonli burchaklar', matn:'∠3 va ∠5 — ichki, kesuvchining bir tomonida. a ∥ b bo‘lsa, ∠3 + ∠5 = 180°.', holat:{phi:60, beta:0, tanla:'ichki_bir', burchak:null}},
    {sarlavha:'Chiziqlar parallel bo‘lmasa', matn:'b chizig‘i 12° og‘dirildi. Endi ∠2 = 60°, ∠6 = 48° — mos burchaklar teng emas. Shuning uchun teskari teorema ishlaydi: mos burchaklar teng bo‘lsa, chiziqlar parallel.', holat:{phi:60, beta:12, tanla:'mos', burchak:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Burchaklarni toping', holat:{phi:60, beta:0, tanla:null, burchak:null},
    topshiriqlar:[
      {shart:'Kesuvchini aylantirib, <b>∠2 = 70°</b> qiling.', hodisa:'mg-burchak', kod:"ev.phi===70 && ev.parallel", izoh:'To‘g‘ri — endi ∠2 = ∠3 = ∠6 = ∠7 = 70°, qolganlari <b>110°</b>.'},
      {shart:'<b>∠3</b> ga ichki almashinuvchi burchakni bosing.', hodisa:'mg-burchak', kod:"ev.bos && ev.raqam===6", izoh:'To‘g‘ri — <b>∠6</b>: ichki, kesuvchining boshqa tomonida; a ∥ b da ∠3 = ∠6.'},
      {shart:'<b>∠1</b> ga mos burchakni bosing.', hodisa:'mg-burchak', kod:"ev.bos && ev.raqam===5", izoh:'To‘g‘ri — <b>∠5</b>: ikkalasi o‘z chizig‘ining chap-yuqorisida.'},
      {shart:'<b>∠4</b> bilan ichki bir tomonli burchakni bosing.', hodisa:'mg-burchak', kod:"ev.bos && ev.raqam===6", izoh:'To‘g‘ri — <b>∠6</b>: ∠4 + ∠6 = 180°.'},
      {shart:'Kesuvchi a ga <b>perpendikulyar</b> bo‘lsin.', hodisa:'mg-burchak', kod:"ev.phi===90", izoh:'To‘g‘ri — barcha 8 burchak <b>90°</b>; kesuvchi b ga ham perpendikulyar.'}
    ]},
  test:[
    {s:'Vertikal burchaklar haqida qaysi fikr to‘g‘ri?', v:['yig‘indisi 180°','teng','biri doim o‘tmas','yig‘indisi 90°'], t:1, izoh:'Vertikal burchaklar <b>teng</b>.'},
    {s:'Qo‘shni burchaklardan biri 65°. Ikkinchisi necha gradus?', v:['65°','25°','115°','295°'], t:2, izoh:'Qo‘shni burchaklar yig‘indisi 180°: 180° − 65° = <b>115°</b>.'},
    {s:'a ∥ b. Ichki almashinuvchi burchaklardan biri 48°. Ikkinchisi?', v:['132°','48°','42°','96°'], t:1, izoh:'Parallel chiziqlarda ichki almashinuvchi burchaklar teng: <b>48°</b>.'},
    {s:'a ∥ b. Ichki bir tomonli burchaklardan biri 110°. Ikkinchisi?', v:['110°','70°','80°','250°'], t:1, izoh:'Yig‘indisi 180°: <b>70°</b>.'},
    {s:'Sahnadagi chizmada ∠2 = 60°. ∠7 = ?', v:['120°','60°','30°','180°'], t:1, izoh:'∠7 = ∠6 (vertikal), ∠6 = ∠2 (mos): <b>60°</b>.'},
    {s:'Sahnadagi raqamlashda qaysi juftlik mos burchaklar?', v:['∠1 va ∠4','∠3 va ∠6','∠2 va ∠6','∠3 va ∠5'], t:2, izoh:'<b>∠2 va ∠6</b> — ikkalasi o‘z chizig‘ining o‘ng-yuqorisida. ∠1–∠4 vertikal, ∠3–∠6 ichki almashinuvchi, ∠3–∠5 ichki bir tomonli.'},
    {s:'Ikki to‘g‘ri chiziq parallel bo‘lishining alomati qaysi?', v:['mos burchaklar teng','vertikal burchaklar teng','qo‘shni burchaklar yig‘indisi 180°','bitta burchak o‘tkir'], t:0, izoh:'<b>Mos burchaklar teng</b> bo‘lsa, chiziqlar parallel. Vertikal burchaklar har qanday kesishishda teng — alomat emas.'},
    {s:'Parallellik aksiomasi nima deydi?', v:['nuqta orqali cheksiz ko‘p parallel o‘tadi','to‘g‘ri chiziqda yotmagan nuqta orqali unga parallel faqat bitta to‘g‘ri chiziq o‘tadi','istalgan ikki to‘g‘ri chiziq kesishadi','parallel to‘g‘ri chiziqlar mavjud emas'], t:1, izoh:'Tekislikda: <b>to‘g‘ri chiziqda yotmagan nuqta orqali unga parallel faqat bitta to‘g‘ri chiziq o‘tadi</b>.'},
    {s:'Kesuvchi ikki parallel to‘g‘ri chiziqdan biriga perpendikulyar. Ikkinchisiga-chi?', v:['u ham perpendikulyar','45° burchak ostida','parallel','kesishmaydi'], t:0, izoh:'Mos burchaklar teng: 90° = 90°, demak <b>ikkinchisiga ham perpendikulyar</b>.'},
    T3('Sahnada <b>∠4</b> ga ichki almashinuvchi burchakni bosing.', 'mg-burchak', 'raqam', ['5'], ['∠5', 'boshqa burchak'], '<b>∠5</b> — a va b orasida, kesuvchining boshqa tomonida; a ∥ b da ∠4 = ∠5.')
  ],
  yordamchi:[
    {s:'Ichki va tashqi burchakni qanday ajrataman?', j:'Ichki burchaklar ikki parallel chiziq orasida (sahnada ∠3, ∠4, ∠5, ∠6), tashqilari — ulardan tashqarida (∠1, ∠2, ∠7, ∠8).', kalit:['ichki','tashqi']},
    {s:'Faqat bitta burchak berilsa, qolganlarini qanday topaman?', j:'a ∥ b bo‘lsa, 8 burchak faqat ikki qiymatda: φ va 180° − φ. Berilgan burchakka teng bo‘lganlarini (vertikal, mos, almashinuvchi) va unga qo‘shni bo‘lganlarini (180° − φ) belgilang.', kalit:['topish','qolgan']}
  ],
  maqola:[
    {sarlavha:'Parallel to‘g‘ri chiziqlar va Yevklid', xatboshilar:[
      'Tekislikda kesishmaydigan ikki to‘g‘ri chiziq parallel deyiladi: a ∥ b. Parallel chiziqlar atrofimizda hamma joyda — daftar chiziqlari, temir yo‘l relslari, zinapoyalar.',
      'Qadimgi yunon matematigi Yevklidning «Negizlar» asarida (mil. av. taxminan 300-yil) beshinchi postulat parallellik bilan bog‘liq. Maktabda u odatda shunday aytiladi: to‘g‘ri chiziqda yotmagan nuqta orqali unga parallel faqat bitta to‘g‘ri chiziq o‘tadi.',
      'Ko‘p asrlar davomida olimlar bu postulatni boshqa aksiomalardan isbotlashga uringan. XIX asrda N. I. Lobachevskiy (1829) va Y. Boyai (1832) bu postulat o‘rniga boshqasini qabul qilsa ham ziddiyatsiz geometriya qurish mumkinligini ko‘rsatgan — noyevklid geometriya shunday tug‘ilgan.'
    ]},
    {sarlavha:'Kesuvchi hosil qilgan burchaklar', xatboshilar:[
      'Ikki to‘g‘ri chiziqni uchinchisi kesib o‘tsa, 8 ta burchak hosil bo‘ladi. Ichki burchaklar a va b orasida, tashqilari ulardan tashqarida yotadi. Kesuvchining turli tomonidagi ichki burchaklar ichki almashinuvchi, bir tomonidagilar — ichki bir tomonli; «bir xil joyda» turganlari — mos burchaklar.',
      'Vertikal burchaklar har doim teng, qo‘shni burchaklar yig‘indisi har doim 180° — bu chiziqlar parallel bo‘lish-bo‘lmasligiga bog‘liq emas. Qolgan munosabatlar esa faqat a ∥ b bo‘lganda bajariladi.'
    ]},
    {sarlavha:'Parallellik teoremalari va alomatlari', xatboshilar:[
      'Teorema: a ∥ b bo‘lsa, mos burchaklar teng, ichki almashinuvchi burchaklar teng, ichki bir tomonli burchaklar yig‘indisi 180°. Shuning uchun 8 burchakdan bittasini bilsak, hammasini topamiz.',
      'Teskari teoremalar — parallellik alomatlari: agar mos burchaklar teng bo‘lsa (yoki ichki almashinuvchi burchaklar teng bo‘lsa, yoki ichki bir tomonli burchaklar yig‘indisi 180° bo‘lsa), a ∥ b. Sahnadagi «b ni og‘dirish» tugmasi buning aksini ko‘rsatadi: chiziq og‘sa, tengliklar buziladi.',
      'Amaliyotda bu alomatlardan duradgorlar, quruvchilar va chizmachilar foydalanadi: burchakni o‘lchab, ikki reyka parallel ekanini tekshirish mumkin.'
    ]}
  ],
  formulalar:[
    ['∠1 = ∠4,  ∠2 = ∠3','Vertikal burchaklar'],
    ['∠1 + ∠2 = 180°','Qo‘shni burchaklar'],
    ['a ∥ b ⇒ ∠2 = ∠6','Mos burchaklar'],
    ['a ∥ b ⇒ ∠3 = ∠6,  ∠4 = ∠5','Ichki almashinuvchi burchaklar'],
    ['a ∥ b ⇒ ∠3 + ∠5 = 180°','Ichki bir tomonli burchaklar'],
    ['∠2 = ∠6 ⇒ a ∥ b','Parallellik alomati']
  ],
  qiziqarli:[
    'Yevklidning «Negizlar» asari 2000 yildan ortiq vaqt davomida geometriyaning asosiy darsligi bo‘lib kelgan.',
    'Lobachevskiy geometriyasida nuqta orqali berilgan chiziqqa cheksiz ko‘p «parallel» o‘tadi — va bu ham ziddiyatsiz geometriya.',
    'Temir yo‘l relslari uzoqda «kesishayotgandek» ko‘rinadi — bu perspektiva hodisasi, rassomlar undan chuqurlikni ko‘rsatish uchun foydalanadi.'
  ],
  lugat:[
    ['Parallel to‘g‘ri chiziqlar','Tekislikda kesishmaydigan to‘g‘ri chiziqlar (a ∥ b).'],
    ['Kesuvchi','Ikki to‘g‘ri chiziqni kesib o‘tuvchi to‘g‘ri chiziq.'],
    ['Vertikal burchaklar','Tomonlari bir-birining davomi bo‘lgan burchaklar.'],
    ['Qo‘shni burchaklar','Bir tomoni umumiy, qolgan tomonlari yoyiq burchak hosil qiluvchi burchaklar.'],
    ['Mos burchaklar','Kesuvchining bir tomonida, chiziqlarga nisbatan bir xil joylashgan burchaklar.'],
    ['Ichki almashinuvchi burchaklar','Chiziqlar orasida, kesuvchining turli tomonidagi burchaklar.'],
    ['Ichki bir tomonli burchaklar','Chiziqlar orasida, kesuvchining bir tomonidagi burchaklar.'],
    ['Aksioma','Isbotsiz qabul qilinadigan tasdiq.']
  ],
  manba:G7 + '; ' + MW + ': «Parallel (geometry)», «Transversal (geometry)», «Parallel postulate», «Euclid’s Elements», «Nikolai Lobachevsky», «János Bolyai».',
  ishlanma:ish('7-sinf', 'Yangi bilim berish', 'Interaktiv chizma, «burchak ovi» o‘yini, juftlikda ishlash',
    ['Kesuvchi hosil qilgan burchaklar turlari, parallel chiziqlar xossalari va parallellik alomatlarini o‘rgatish.', 'Aniqlik va chizma madaniyatini tarbiyalash.', 'Mantiqiy fikrlash: teorema va unga teskari teoremani farqlash ko‘nikmasini rivojlantirish.'],
    ['8 burchakni juftliklar bo‘yicha nomlaydi','Bitta burchak orqali qolganlarini topadi','Parallellik alomatini qo‘llaydi','Teorema va teskari teoremani farqlaydi'],
    ['MAKON sahnasi «Parallel to‘g‘ri chiziqlar»','Proyektor','Transportir, chizg‘ich','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Temir yo‘l relslari va shpallar rasmi.','Burchaklarni sanaydi.'],['8–20','<b>Burchak turlari.</b> MAKON: vertikal, qo‘shni, mos, ichki almashinuvchi, ichki bir tomonli.','Daftarda chizib belgilaydi.'],['20–28','<b>Teorema.</b> φ ni o‘zgartirib, tengliklar saqlanishini kuzatadi.','Transportir bilan o‘lchab tekshiradi.'],['28–34','<b>Alomat.</b> «b ni og‘dirish» — tenglik buziladi.','Teskari teoremani ifodalaydi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Kesuvchi','Ikki chiziqni kesuvchi.'],['Mos burchaklar','a ∥ b da teng.'],['Alomat','Parallellikni isbotlash sharti.']],
    [['∠2 = 70°, ∠1 = ?','110°'],['∠3 ga ichki almashinuvchi?','∠6'],['Ichki bir tomonlilar yig‘indisi?','180°']],
    'Darslikdagi mashqlar; (1) a ∥ b, ∠1 = 125° bo‘lsa, qolgan 7 burchakni toping; (2) uyingizdagi 3 ta parallel chiziq misolini chizing.',
    G7)
};

/* ================================================================
   8. PIFAGOR TEOREMASI — 8-sinf
   ================================================================ */
D['geo-pifagor'] = {
  fan:'geometriya', qisqaNom:'Pifagor teoremasi', nom:'Pifagor teoremasi: kvadratlar va isbot', sinf:'8-sinf',
  qisqa:'8-sinf · Geometriya · «Pifagor teoremasi»',
  sahna:'mg_pifagor',
  mgUq:{rejim:'kvadrat', a:5, b:12, kat:false},
  kor:{
    sarlavha:'Katta kvadrat = ikki kichik kvadrat',
    matn:'To‘g‘ri burchakli uchburchakning har bir tomoniga kvadrat quramiz. Pifagor teoremasiga ko‘ra, gipotenuzaga qurilgan kvadrat yuzi katetlarga qurilgan kvadratlar yuzlari yig‘indisiga teng: c² = a² + b². Sahnada katetlarni o‘zgartiring, katakchalarni sanang va «Isbot» rejimida to‘rtta uchburchakni qayta joylab, teorema nega to‘g‘riligini ko‘ring.',
    punktlar:['<b>Teorema:</b> to‘g‘ri burchakli uchburchakda c² = a² + b² (c — gipotenuza)','<b>Teskari teorema:</b> tomonlar uchun c² = a² + b² bo‘lsa, uchburchak to‘g‘ri burchakli','<b>Pifagor uchliklari:</b> 3–4–5, 5–12–13, 8–15–17, 6–8–10','<b>Masofa formulasi:</b> AB = √((x₂ − x₁)² + (y₂ − y₁)²)']
  },
  bolimlar:[
    {sarlavha:'Pifagor uchliklari (tekshirilgan)', jadval:[
      ['3, 4, 5','9 + 16 = 25'],
      ['5, 12, 13','25 + 144 = 169'],
      ['8, 15, 17','64 + 225 = 289'],
      ['7, 24, 25','49 + 576 = 625'],
      ['6, 8, 10','36 + 64 = 100 (3–4–5 ning 2 barobari)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'3, 4, 5', matn:'Katetlar a = 3, b = 4. Kvadratlar: 9 va 16 katakcha. Gipotenuzadagi kvadratda 25 katakcha: 9 + 16 = 25, c = 5.', holat:{rejim:'kvadrat', a:3, b:4, kat:true}},
    {sarlavha:'O‘xshash uchburchak: 6, 8, 10', matn:'Tomonlarni 2 marta kattalashtirsak, kvadratlar 4 marta kattalashadi: 36 + 64 = 100, c = 10.', holat:{rejim:'kvadrat', a:6, b:8, kat:true}},
    {sarlavha:'5, 12, 13', matn:'25 + 144 = 169 = 13². Bu ham butun sonli (Pifagor) uchlik.', holat:{rejim:'kvadrat', a:5, b:12, kat:true}},
    {sarlavha:'Gipotenuza butun bo‘lmasa', matn:'a = b = 1: c² = 1 + 1 = 2, c = √2 ≈ 1,414. Bu — birlik kvadratning diagonali. √2 ni kasr ko‘rinishida aniq yozib bo‘lmaydi (irratsional son).', holat:{rejim:'kvadrat', a:1, b:1, kat:true}},
    {sarlavha:'Isbot: katta kvadrat', matn:'Tomoni a + b bo‘lgan kvadrat ichiga 4 ta bir xil uchburchak joylaymiz. O‘rtada tomoni c bo‘lgan kvadrat qoladi: (a + b)² = 4 · ab/2 + c².', holat:{rejim:'isbot', a:3, b:4, t:0}},
    {sarlavha:'Isbot: qayta joylash', matn:'Uchburchaklarni surib, ikkita to‘g‘ri to‘rtburchak qilamiz. Endi bo‘sh joy — a² va b² kvadratlari: (a + b)² = 4 · ab/2 + a² + b². Katta kvadrat va uchburchaklar o‘zgarmadi, demak c² = a² + b².', holat:{rejim:'isbot', a:3, b:4, t:0, ijro:true}},
    {sarlavha:'8, 15, 17', matn:'64 + 225 = 289 = 17². Katta sonlarda ham teorema aniq bajariladi.', holat:{rejim:'kvadrat', a:8, b:15, kat:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Gipotenuzani toping', holat:{rejim:'kvadrat', a:3, b:4, kat:true},
    topshiriqlar:[
      {shart:'Katetlarni <b>a = 6, b = 8</b> qiling. Gipotenuza nechaga teng bo‘ladi?', hodisa:'mg-pifagor', kod:"ev.a===6 && ev.b===8", izoh:'To‘g‘ri — 36 + 64 = 100, <b>c = 10</b>.'},
      {shart:'Gipotenuza <b>13</b> bo‘ladigan katetlarni tanlang.', hodisa:'mg-pifagor', kod:"Math.abs(ev.c-13)<1e-6", izoh:'To‘g‘ri — <b>5 va 12</b>: 25 + 144 = 169.'},
      {shart:'3–4–5 dan boshqa, <b>hamma tomoni butun</b> bo‘lgan uchburchak hosil qiling.', hodisa:'mg-pifagor', kod:"ev.butun && !(ev.a===3&&ev.b===4) && !(ev.a===4&&ev.b===3)", izoh:'To‘g‘ri — bu <b>Pifagor uchligi</b>.'},
      {shart:'<b>Gipotenuzaga qurilgan</b> kvadratni bosing.', hodisa:'mg-pifagor', kod:"ev.bos && ev.nom==='c2'", izoh:'To‘g‘ri — uning yuzi <b>c² = a² + b²</b>.'},
      {shart:'«Isbot» rejimida animatsiyani oxirigacha ko‘ring.', hodisa:'mg-pifagor', kod:"ev.rejim==='isbot' && ev.t>=1", izoh:'To‘g‘ri — bo‘sh yuza o‘zgarmadi: <b>c² = a² + b²</b>.'}
    ]},
  test:[
    {s:'Katetlari 5 va 12 bo‘lgan to‘g‘ri burchakli uchburchakning gipotenuzasi?', v:['17','13','√17','60'], t:1, izoh:'25 + 144 = 169, c = <b>13</b>.'},
    {s:'Gipotenuza 10, bir kateti 6. Ikkinchi katet?', v:['4','8','√136','16'], t:1, izoh:'100 − 36 = 64, b = <b>8</b>.'},
    {s:'Pifagor teoremasi qaysi?', v:['a + b = c','a² + b² = c²','a² − b² = c²','2a + 2b = c'], t:1, izoh:'<b>a² + b² = c²</b> — c gipotenuza.'},
    {s:'Qaysi uchlik Pifagor uchligi?', v:['4, 5, 6','8, 15, 17','2, 3, 4','5, 6, 7'], t:1, izoh:'64 + 225 = 289 = 17² — <b>8, 15, 17</b>.'},
    {s:'Tomoni 1 bo‘lgan kvadratning diagonali?', v:['2','√2','1,5','√3'], t:1, izoh:'d² = 1 + 1 = 2, d = <b>√2</b> ≈ 1,414.'},
    {s:'Tomonlari 7, 24, 25 bo‘lgan uchburchak qanday?', v:['to‘g‘ri burchakli','o‘tkir burchakli','o‘tmas burchakli','bunday uchburchak yo‘q'], t:0, izoh:'49 + 576 = 625 = 25² — teskari teoremaga ko‘ra <b>to‘g‘ri burchakli</b>.'},
    {s:'5 m li narvon devorga suyalgan, pastki uchi devordan 3 m uzoqda. Narvon devorga qanday balandlikda tegadi?', v:['2 m','4 m','8 m','√34 m'], t:1, izoh:'25 − 9 = 16, h = <b>4 m</b>.'},
    {s:'Pifagor teoremasi qanday uchburchak uchun o‘rinli?', v:['istalgan','teng tomonli','to‘g‘ri burchakli','o‘tmas burchakli'], t:2, izoh:'Faqat <b>to‘g‘ri burchakli</b> uchburchak uchun.'},
    {s:'A(1; 2) va B(4; 6) nuqtalar orasidagi masofa?', v:['5','7','25','√7'], t:0, izoh:'Δx = 3, Δy = 4: √(9 + 16) = <b>5</b>.'},
    T3('Sahnada <b>gipotenuzaga</b> qurilgan kvadratni bosing.', 'mg-pifagor', 'nom', ['c2'], ['c² kvadrati', 'boshqa shakl'], 'Gipotenuza — to‘g‘ri burchak qarshisidagi eng uzun tomon; unga qurilgan kvadrat yuzi <b>c² = 25 + 144 = 169</b>.')
  ],
  yordamchi:[
    {s:'Qaysi tomon gipotenuza?', j:'Gipotenuza — to‘g‘ri burchak qarshisidagi tomon, u doim eng uzun. Qolgan ikki tomon — katetlar (to‘g‘ri burchakni hosil qiladi).', kalit:['gipotenuza','katet']},
    {s:'Katetni qanday topaman?', j:'Teoremadan: b² = c² − a². Masalan, c = 10, a = 6: b² = 100 − 36 = 64, b = 8. Ayirishni unutmang — katet gipotenuzadan qisqa bo‘lishi kerak.', kalit:['katet','topish']}
  ],
  maqola:[
    {sarlavha:'Pifagordan oldin va keyin', xatboshilar:[
      'Teorema yunon faylasufi va matematigi Pifagor (mil. av. taxminan 570 – taxminan 495) nomi bilan ataladi. Lekin uning mazmuni ancha oldin ma’lum bo‘lgan: Bobilning «Plimpton 322» loy taxtachasida (mil. av. taxminan 1800-yillar) Pifagor uchliklari bilan bog‘liq sonlar yozilgan. Qadimgi Xitoy va Hindiston matnlarida ham bu munosabat uchraydi.',
      'Yevklidning «Negizlar» asarida teorema I kitobning 47-tasdig‘i sifatida isbotlangan. Qadimgi misrliklar 3–4–5 nisbatli tugunli arqon bilan to‘g‘ri burchak yasagan degan rivoyat ham bor, lekin tarixchilar bunga aniq dalil topmagan.',
      'Teoremaning isbotlari juda ko‘p: E. S. Lumis «Pifagor tasdig‘i» kitobida 367 ta isbotni to‘plagan. Ulardan biri — AQShning bo‘lajak prezidenti Jeyms Garfild 1876-yilda nashr qilgan trapetsiyali isbot.'
    ]},
    {sarlavha:'Qayta joylash isboti', xatboshilar:[
      'Tomoni a + b bo‘lgan kvadratni olaylik. Uning ichiga katetlari a va b bo‘lgan 4 ta bir xil to‘g‘ri burchakli uchburchakni burchaklarga joylasak, o‘rtada tomoni c bo‘lgan kvadrat qoladi: (a + b)² = 4 · (ab/2) + c².',
      'Endi o‘sha 4 uchburchakni boshqacha joylaymiz — juft-juft qilib ikkita a × b to‘g‘ri to‘rtburchak hosil qilamiz. Bu safar bo‘sh joy ikkita kvadratdan iborat: a² va b². Demak (a + b)² = 4 · (ab/2) + a² + b².',
      'Ikkala holatda katta kvadrat ham, uchburchaklar ham bir xil, demak qolgan yuzalar ham teng: c² = a² + b². Sahnadagi animatsiya aynan shu isbotni ko‘rsatadi — uchburchaklar faqat suriladi, burilmaydi ham.'
    ]},
    {sarlavha:'Qo‘llanishi', xatboshilar:[
      'Pifagor teoremasi masofa formulasining asosi: koordinata tekisligidagi A(x₁; y₁) va B(x₂; y₂) nuqtalar orasidagi masofa AB = √((x₂ − x₁)² + (y₂ − y₁)²). Xarita va navigatsiya dasturlari, kompyuter grafikasi shu formuladan foydalanadi.',
      'Quruvchilar 3–4–5 usulida burchak to‘g‘riligini tekshiradi: bir tomonga 3 m, ikkinchisiga 4 m o‘lchab, uchlari orasi 5 m bo‘lsa — burchak 90°. Televizor ekrani diagonali ham shu teorema bilan hisoblanadi.',
      'Ko‘p uchraydigan xato — teoremani to‘g‘ri burchaksiz uchburchakka qo‘llash yoki gipotenuzani katetlar yig‘indisi deb olish: 3 + 4 = 7, lekin gipotenuza 5.'
    ]}
  ],
  formulalar:[
    ['c² = a² + b²','Pifagor teoremasi'],
    ['c = √(a² + b²)','Gipotenuza'],
    ['a = √(c² − b²)','Katet'],
    ['d = a√2','Kvadrat diagonali'],
    ['AB = √((x₂ − x₁)² + (y₂ − y₁)²)','Ikki nuqta orasidagi masofa'],
    ['(a + b)² = 2ab + c²','Qayta joylash isbotining asosi']
  ],
  qiziqarli:[
    'Bobilning «Plimpton 322» taxtachasi mil. av. taxminan 1800-yillarga oid — Pifagordan ming yildan ko‘proq oldin.',
    'Jeyms Garfild o‘z isbotini 1876-yilda, kongressmen bo‘lganida e’lon qilgan; 1881-yilda u AQSh prezidenti bo‘lgan.',
    'E. S. Lumis kitobida teoremaning 367 ta turli isboti keltirilgan (keyingi nashrlarda son biroz farq qiladi).',
    '√2 irratsional ekani — kasr ko‘rinishida yozib bo‘lmasligi — ham qadimgi yunonlarga ma’lum bo‘lgan.'
  ],
  lugat:[
    ['Gipotenuza','To‘g‘ri burchak qarshisidagi tomon.'],
    ['Katet','To‘g‘ri burchakni hosil qiluvchi tomon.'],
    ['Pifagor uchligi','a² + b² = c² ni qanoatlantiruvchi butun sonlar.'],
    ['Teskari teorema','Shart va xulosa o‘rin almashgan teorema.'],
    ['Irratsional son','Ikki butun sonning nisbati sifatida yozib bo‘lmaydigan son (√2).'],
    ['Diagonal','Ko‘pburchakning qo‘shni bo‘lmagan uchlarini tutashtiruvchi kesma.']
  ],
  manba:G8 + '; ' + MW + ': «Pythagorean theorem», «Pythagorean triple», «Plimpton 322», «Garfield’s proof of the Pythagorean theorem», «Pythagoras», «Euclid’s Elements». Plimpton 322 sanasi: mil. av. taxminan 1822–1762 yoki 1790–1750 (manbalarda turlicha) — matnda «taxminan 1800-yillar». Lumis kitobidagi isbotlar soni: 367 (ba’zi manbalarda 370).',
  ishlanma:ish('8-sinf', 'Yangi bilim berish', 'Interaktiv kvadratlar, katakchalarni sanash, animatsion isbot, amaliy o‘lchash',
    ['Pifagor teoremasi, uning isboti, teskari teorema va qo‘llanishini o‘rgatish.', 'Ilm tarixi va turli xalqlar hissasiga hurmatni tarbiyalash.', 'Isbot g‘oyasini tushunish, amaliy masalani modellashtirish ko‘nikmasini rivojlantirish.'],
    ['Teoremani ifodalaydi va isbot g‘oyasini tushuntiradi','Gipotenuza va katetni topadi','Uchburchak to‘g‘ri burchakli ekanini tekshiradi','Ikki nuqta orasidagi masofani hisoblaydi'],
    ['MAKON sahnasi «Pifagor teoremasi»','Proyektor','Katakli qog‘oz, qaychi (isbot uchun 4 uchburchak)','12 tugunli arqon yoki ruletka'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Televizor diagonali 55 dyuym — bu nima degani?»','Taxmin aytadi.'],['8–18','<b>Kvadratlar.</b> MAKON: 3–4–5, katakchalar; 6–8–10, 5–12–13.','Katakchalarni sanaydi, jadval tuzadi.'],['18–27','<b>Isbot.</b> Qayta joylash animatsiyasi; qog‘ozdan 4 uchburchak.','Qog‘ozda isbotni takrorlaydi.'],['27–34','<b>Qo‘llanish.</b> Narvon, masofa formulasi, 3–4–5 arqon.','Masalalar yechadi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Gipotenuza','Eng uzun tomon.'],['Katet','To‘g‘ri burchak tomoni.'],['Pifagor uchligi','Butun sonli yechim.']],
    [['a = 6, b = 8, c?','10'],['c = 13, a = 5, b?','12'],['7, 24, 25 to‘g‘ri burchaklimi?','Ha']],
    'Darslikdagi mashqlar; (1) xonangiz polining diagonalini o‘lchab, teorema bilan tekshiring; (2) 9–40–41 uchlik ekanini tekshiring (81 + 1600 = 1681).',
    G8)
};

/* ================================================================
   9. AYLANA: MARKAZIY VA ICHKI CHIZILGAN BURCHAK — 9-sinf
   ================================================================ */
D['geo-aylana'] = {
  fan:'geometriya', qisqaNom:'Aylana burchaklari', nom:'Aylana: markaziy va ichki chizilgan burchaklar', sinf:'9-sinf',
  qisqa:'9-sinf · Geometriya · «Aylana va burchaklar»',
  sahna:'mg_aylana',
  mgUq:{rejim:'asosiy', A:200, B:340, C:95},
  kor:{
    sarlavha:'Ichki chizilgan burchak — markaziy burchakning yarmi',
    matn:'Uchi aylana markazida bo‘lgan burchak markaziy burchak deyiladi, uning kattaligi o‘zi tiralgan yoyning gradus o‘lchoviga teng. Uchi aylanada yotib, tomonlari aylanani kesadigan burchak — ichki chizilgan burchak; u tiralgan yoyning yarmiga teng. Sahnada A, B, C nuqtalarni aylana bo‘ylab suring: C qayerda bo‘lmasin (yoyning bir tomonida), ∠ACB o‘zgarmaydi.',
    punktlar:['<b>Markaziy burchak</b> = tiralgan yoy: ∠AOB = ◡AB','<b>Ichki chizilgan burchak</b> = ½ tiralgan yoy: ∠ACB = ½◡AB','<b>Diametrga tiralgan</b> ichki chizilgan burchak — 90° (Fales teoremasi)','<b>Ichki chizilgan to‘rtburchak:</b> qarama-qarshi burchaklar yig‘indisi 180°']
  },
  bosqichlar:[
    {sarlavha:'Markaziy va ichki chizilgan burchak', matn:'◡AB = 140° (yashil yoy). Markaziy burchak ∠AOB = 140°, ichki chizilgan burchak ∠ACB = 70° — aynan yarmi.', holat:{rejim:'asosiy', A:200, B:340, C:95}},
    {sarlavha:'C ni siljitamiz', matn:'C nuqtani yoy bo‘ylab 50° ga ko‘chirdik — ∠ACB baribir 70°. Bir yoyga tiralgan barcha ichki chizilgan burchaklar teng.', holat:{rejim:'asosiy', A:200, B:340, C:50}},
    {sarlavha:'C boshqa yoyga o‘tsa', matn:'C pastki yoyga o‘tdi. Endi burchak boshqa — 220° li yoyga tiraladi: ∠ACB = 110°. Markaziy burchak 180° dan katta (botiq) bo‘ldi.', holat:{rejim:'asosiy', A:200, B:340, C:270}},
    {sarlavha:'Diametrga tiralgan burchak', matn:'AB — diametr, yoy 180°. ∠ACB = 90° — C qayerda bo‘lmasin. Bu Fales teoremasi deyiladi.', holat:{rejim:'diametr', A:180, B:0, C:70}},
    {sarlavha:'Bir yoyga tiralgan burchaklar', matn:'C va D bir yoyda: ∠ACB = ∠ADB = 70°. Ikkalasi ham 140° li ◡AB ga tiraladi.', holat:{rejim:'bir_yoy', A:200, B:340, C:60, D:130}},
    {sarlavha:'Aylanaga ichki chizilgan to‘rtburchak', matn:'ACBD to‘rtburchak uchlari aylanada. ∠ACB = 70°, ∠ADB = 110°: yig‘indisi 180°, chunki ular birgalikda butun aylanaga (360°) tiraladi.', holat:{rejim:'tortburchak', A:200, B:340, C:90, D:270}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Burchaklarni boshqaring', holat:{rejim:'asosiy', A:200, B:340, C:95},
    topshiriqlar:[
      {shart:'Markaziy burchakni <b>100°</b> qiling (◡AB slayderi yoki A/B nuqtalar).', hodisa:'mg-aylana', kod:"Math.abs(ev.markaziy-100)<0.01", izoh:'To‘g‘ri — endi ichki chizilgan burchak <b>50°</b>.'},
      {shart:'Ichki chizilgan burchak <b>90°</b> bo‘lsin.', hodisa:'mg-aylana', kod:"Math.abs(ev.ichki-90)<0.01", izoh:'To‘g‘ri — ◡AB = 180°, ya’ni <b>AB — diametr</b>.'},
      {shart:'Aylana <b>markazini</b> bosing.', hodisa:'mg-aylana', kod:"ev.bos && ev.nom==='O'", izoh:'To‘g‘ri — <b>O</b>: markaziy burchak uchi shu yerda.'},
      {shart:'Ichki chizilgan burchak <b>30°</b> bo‘lsin.', hodisa:'mg-aylana', kod:"Math.abs(ev.ichki-30)<0.01", izoh:'To‘g‘ri — tiralgan yoy <b>60°</b>.'},
      {shart:'«Bir yoyga tiralgan» rejimini yoqing va ikki burchak tengligini ko‘ring.', hodisa:'mg-aylana', kod:"ev.rejim==='bir_yoy'", izoh:'To‘g‘ri — <b>∠ACB = ∠ADB</b>.'}
    ]},
  test:[
    {s:'Markaziy burchak 80°. Shu yoyga tiralgan ichki chizilgan burchak?', v:['80°','160°','40°','20°'], t:2, izoh:'Ichki chizilgan burchak yarmiga teng: <b>40°</b>.'},
    {s:'Ichki chizilgan burchak 35°. U tiralgan yoy necha gradus?', v:['35°','70°','17,5°','145°'], t:1, izoh:'Yoy ikki barobar katta: <b>70°</b>.'},
    {s:'Diametrga tiralgan ichki chizilgan burchak necha gradus?', v:['45°','180°','90°','60°'], t:2, izoh:'Yoy 180°, burchak <b>90°</b> (Fales teoremasi).'},
    {s:'Markaziy burchakning uchi qayerda?', v:['aylanada','aylana markazida','aylanadan tashqarida','vatar o‘rtasida'], t:1, izoh:'Markaziy burchak uchi — <b>aylana markazida</b>.'},
    {s:'Bir yoyga tiralgan ichki chizilgan burchaklar haqida qaysi fikr to‘g‘ri?', v:['teng','yig‘indisi 180°','biri ikkinchisidan 2 marta katta','yig‘indisi 90°'], t:0, izoh:'Ularning har biri yoyning yarmiga teng, shuning uchun <b>teng</b>.'},
    {s:'Aylanaga ichki chizilgan to‘rtburchakda ∠A = 75°. Qarama-qarshi ∠C?', v:['75°','105°','15°','285°'], t:1, izoh:'Qarama-qarshi burchaklar yig‘indisi 180°: <b>105°</b>.'},
    {s:'Qaysi burchak ichki chizilgan burchak?', v:['uchi markazda bo‘lgan','uchi aylanada, tomonlari aylanani kesadigan','uchi aylanadan tashqarida bo‘lgan','tomonlari aylanaga urinadigan'], t:1, izoh:'Ichki chizilgan burchak — <b>uchi aylanada yotib, tomonlari aylanani kesadigan</b> burchak.'},
    {s:'Soat millari 4:00 ni ko‘rsatmoqda. Millar orasidagi (markaziy) burchak?', v:['90°','120°','100°','60°'], t:1, izoh:'Siferblat 12 ta 30° lik yoyga bo‘lingan: 4 · 30° = <b>120°</b>.'},
    {s:'∠AOB = 100°, C nuqta katta yoyda (◡AB ga qarama-qarshi). ∠ACB = ?', v:['100°','50°','130°','80°'], t:1, izoh:'∠ACB kichik yoy ◡AB = 100° ga tiraladi: <b>50°</b>.'},
    T3('Sahnada <b>ichki chizilgan burchakning uchini</b> bosing.', 'mg-aylana', 'nom', ['C'], ['C nuqta', 'boshqa joy'], 'Ichki chizilgan burchak ∠ACB ning uchi — aylanadagi <b>C</b> nuqta; O — markaziy burchak uchi.')
  ],
  yordamchi:[
    {s:'Burchak qaysi yoyga tiraladi?', j:'Burchak tomonlari orasida (uning ichida) yotgan yoyga tiraladi. Ichki chizilgan ∠ACB uchun bu — C ni o‘z ichiga olmagan ◡AB.', kalit:['yoy','tiraladi']},
    {s:'Fales teoremasidan qanday foydalanaman?', j:'Aylananing markazini topish: to‘g‘ri burchakli chizg‘ich uchini aylanaga qo‘ysangiz, tomonlari diametr uchlarida kesadi. Ikki diametr kesishgan joy — markaz.', kalit:['fales','markaz']}
  ],
  maqola:[
    {sarlavha:'Aylana va uning elementlari', xatboshilar:[
      'Aylana — tekislikda berilgan nuqtadan (markazdan) bir xil masofada joylashgan nuqtalar to‘plami. Markazni aylana nuqtasi bilan tutashtiruvchi kesma — radius, aylananing ikki nuqtasini tutashtiruvchi kesma — vatar, markazdan o‘tuvchi vatar — diametr. Aylananing ikki nuqtasi orasidagi qismi yoy deyiladi.',
      'Yoylar gradusda o‘lchanadi: butun aylana — 360°. Yoyning gradus o‘lchovi unga tiralgan markaziy burchakka teng. Shuning uchun soat siferblatidagi har bir soat oralig‘i 360° : 12 = 30°.'
    ]},
    {sarlavha:'Ichki chizilgan burchak haqida teorema', xatboshilar:[
      'Teorema: ichki chizilgan burchak o‘zi tiralgan yoyning yarmiga teng. Isbot g‘oyasi: agar burchakning bir tomoni diametr bo‘lsa, OC = OA (radiuslar) bo‘lgani uchun ACO uchburchak teng yonli; tashqi burchak xossasidan markaziy burchak ichki chizilgan burchakdan ikki marta katta ekani kelib chiqadi. Umumiy hol diametr bilan ikki qismga ajratib isbotlanadi.',
      'Natijalar: 1) bir yoyga tiralgan ichki chizilgan burchaklar teng; 2) diametrga tiralgan ichki chizilgan burchak — to‘g‘ri burchak; 3) aylanaga ichki chizilgan to‘rtburchakning qarama-qarshi burchaklari yig‘indisi 180°.',
      'Diametrga tiralgan burchak haqidagi natija qadimgi yunon olimi Fales (mil. av. VII–VI asrlar) nomi bilan ataladi. Umumiy teorema Yevklidning «Negizlar» asarining III kitobida bor.'
    ]},
    {sarlavha:'Hayotda va ko‘p uchraydigan xatolar', xatboshilar:[
      'Fotograflar va sahna rassomlari bilishadi: bir xil kenglikdagi sahnani aylanadagi har qanday nuqtadan bir xil burchak ostida ko‘rish mumkin — bu bir yoyga tiralgan ichki chizilgan burchaklar tengligidan kelib chiqadi. Futbolda darvozaga zarba burchagi ham shu g‘oya bilan tahlil qilinadi.',
      'Xatolar: ichki chizilgan burchakni markaziy burchakka teng deb olish (yarmini olish esdan chiqadi); burchak qaysi yoyga tiralganini noto‘g‘ri tanlash — C nuqta yoyning boshqa tomoniga o‘tsa, burchak 180° − ∠ACB bo‘ladi.'
    ]}
  ],
  formulalar:[
    ['∠AOB = ◡AB','Markaziy burchak'],
    ['∠ACB = ½ ◡AB = ½ ∠AOB','Ichki chizilgan burchak'],
    ['◡AB = 180° ⇒ ∠ACB = 90°','Diametrga tiralgan burchak (Fales)'],
    ['∠A + ∠C = ∠B + ∠D = 180°','Aylanaga ichki chizilgan to‘rtburchak'],
    ['360° : 12 = 30°','Soat siferblati bo‘limi']
  ],
  qiziqarli:[
    'Fales Miletlik — tarixda nomi ma’lum bo‘lgan birinchi yunon matematiklaridan biri; unga bir nechta geometrik teorema nisbat beriladi.',
    'Soat millari soat 3 da 90° burchak hosil qiladi, soat 4 da — 120°.',
    'To‘g‘ri burchakli chizg‘ich yordamida istalgan dumaloq buyumning markazini topish mumkin (Fales teoremasi).'
  ],
  lugat:[
    ['Aylana','Markazdan teng uzoqlikdagi nuqtalar to‘plami.'],
    ['Radius','Markazni aylana nuqtasi bilan tutashtiruvchi kesma.'],
    ['Vatar','Aylananing ikki nuqtasini tutashtiruvchi kesma.'],
    ['Diametr','Markazdan o‘tuvchi vatar.'],
    ['Yoy','Aylananing ikki nuqta orasidagi qismi.'],
    ['Markaziy burchak','Uchi aylana markazidagi burchak.'],
    ['Ichki chizilgan burchak','Uchi aylanada, tomonlari aylanani kesuvchi burchak.'],
    ['Ichki chizilgan to‘rtburchak','Barcha uchlari aylanada yotgan to‘rtburchak.']
  ],
  manba:G9 + '; ' + MW + ': «Inscribed angle», «Central angle», «Thales’s theorem», «Cyclic quadrilateral», «Euclid’s Elements» (III kitob, 20–22-tasdiqlar). Eslatma: ayrim nashrlarda bu mavzu 8-sinfda o‘tiladi.',
  ishlanma:ish('9-sinf', 'Yangi bilim berish', 'Interaktiv chizma, tadqiqot (gipoteza → tekshirish), juftlikda ishlash',
    ['Markaziy va ichki chizilgan burchaklar, ular orasidagi bog‘lanish va natijalarini o‘rgatish.', 'Mustaqil tadqiqot va isbotga hurmatni tarbiyalash.', 'Kuzatuvdan gipoteza tuzish va uni tekshirish ko‘nikmasini rivojlantirish.'],
    ['Markaziy va ichki chizilgan burchakni ajratadi','Ichki chizilgan burchakni yoy orqali topadi','Fales teoremasini qo‘llaydi','Ichki chizilgan to‘rtburchak burchaklarini topadi'],
    ['MAKON sahnasi «Aylana va burchaklar»','Proyektor','Sirkul, transportir, chizg‘ich','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Takrorlash.</b> Aylana elementlari, soat siferblati.','Javob beradi.'],['8–18','<b>Tadqiqot.</b> MAKON: C ni siljitib, ∠ACB va ∠AOB ni solishtirish.','Jadvalga yozib, gipoteza tuzadi.'],['18–26','<b>Teorema va isbot g‘oyasi.</b>','Isbotni tahlil qiladi.'],['26–34','<b>Natijalar.</b> Fales, bir yoyga tiralgan, ichki to‘rtburchak.','Misollar yechadi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Markaziy burchak','Uchi markazda.'],['Ichki chizilgan burchak','Uchi aylanada.'],['Fales teoremasi','Diametrga tiralgan burchak 90°.']],
    [['◡AB = 120°, ∠ACB?','60°'],['∠A = 80° (ichki to‘rtburchak), ∠C?','100°'],['Diametrga tiralgan burchak?','90°']],
    'Darslikdagi mashqlar; (1) dumaloq idishning markazini to‘g‘ri burchakli chizg‘ich yordamida toping va usulni tushuntiring; (2) soat 2 da millar orasidagi burchakni toping (javob: 60°).',
    G9)
};

/* ================================================================
   10. JISMLARNING KESIMLARI — 10-sinf
   ================================================================ */
D['geo-kesimlar'] = {
  fan:'geometriya', qisqaNom:'Kesimlar', nom:'Jismlarning kesimlari: tekislik jismni kesganda', sinf:'10-sinf',
  qisqa:'10-sinf · Geometriya · «Ko‘pyoqlarning kesimlari»',
  sahna:'mg_kesim',
  mgUq:{jism:'kub', kesim:'olti', kes:false},
  kor:{
    sarlavha:'Tekislik jismni kesadi — ko‘pburchak hosil bo‘ladi',
    matn:'Ko‘pyoqni tekislik bilan kessak, tekislik va jismning umumiy qismi — kesim hosil bo‘ladi. Kesim — ko‘pburchak, uning tomonlari tekislikning jism yoqlari bilan kesishgan kesmalari. Shuning uchun kesim tomonlari soni jism yoqlari sonidan oshmaydi: kubda kesim 3, 4, 5 yoki 6 burchakli bo‘lishi mumkin. Sahnada tekislikni og‘diring, buring va siljiting, «Yuqori qismini olib tashlash» bilan kesimni «ochiq» ko‘ring.',
    punktlar:['<b>Kesim tomoni</b> — tekislikning bitta yoq bilan kesishgan kesmasi','<b>Kub:</b> uchburchak, to‘rtburchak, beshburchak, oltiburchak (7 burchakli bo‘lmaydi — yoqlar 6 ta)','<b>Tetraedr:</b> faqat uchburchak yoki to‘rtburchak; to‘rtburchak kvadrat ham bo‘lishi mumkin','<b>Parallel yoqlar</b>ni tekislik parallel kesmalar bo‘yicha kesadi']
  },
  bolimlar:[
    {sarlavha:'Kub kesimlari (sahnadagi tayyor holatlar)', jadval:[
      ['Gorizontal','asosga parallel — kvadrat'],
      ['Qiya (bir o‘q atrofida)','to‘g‘ri to‘rtburchak'],
      ['Uchni kesish','teng tomonli uchburchak (tekislik uchdan chiquvchi uch qirrani kesadi)'],
      ['Beshburchak','tekislik 5 ta yoqni kesadi'],
      ['Markaz orqali, bosh diagonalga perpendikulyar','muntazam oltiburchak']
    ]},
    {sarlavha:'Aylanish jismlari kesimlari', jadval:[
      ['Silindr, o‘qqa perpendikulyar','doira'],
      ['Silindr, o‘q orqali','to‘g‘ri to‘rtburchak'],
      ['Konus, o‘q orqali','teng yonli uchburchak'],
      ['Shar, istalgan tekislik','doira']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Gorizontal kesim — kvadrat', matn:'Tekislik kub asosiga parallel. U 4 ta yon yoqni kesadi — kesim kvadrat, uning tomoni kub qirrasiga teng. Kesim yuzi asos yuziga teng.', holat:{jism:'kub', kesim:'gorizontal', kes:false}},
    {sarlavha:'Qiya kesim — to‘g‘ri to‘rtburchak', matn:'Tekislik bir o‘q atrofida og‘dirildi. Kesim hamon to‘rtburchak, lekin endi to‘g‘ri to‘rtburchak — bir tomoni qirraga teng, ikkinchisi uzunroq.', holat:{jism:'kub', kesim:'qiya', kes:false}},
    {sarlavha:'Uchni kesish — uchburchak', matn:'Tekislik bitta uchga yaqin, uchdan chiquvchi uchala qirrani kesadi: kesim — teng tomonli uchburchak.', holat:{jism:'kub', kesim:'uch', kes:false}},
    {sarlavha:'Beshburchak kesim', matn:'Tekislikni biroz boshqacha og‘dirsak, u 5 ta yoqni kesadi — beshburchak hosil bo‘ladi. Karta tomonlar sonini va kesim yuzini ko‘rsatadi.', holat:{jism:'kub', kesim:'besh', kes:false}},
    {sarlavha:'Muntazam oltiburchak', matn:'Tekislik kub markazidan bosh diagonalga perpendikulyar o‘tadi: 6 ta yoqning hammasini kesadi — muntazam oltiburchak. «Yuqori qismi olib tashlandi» — kesim kubning «yuzi» bo‘lib qoldi.', holat:{jism:'kub', kesim:'olti', kes:true}},
    {sarlavha:'Piramida kesimi', matn:'To‘rtburchakli piramidani uchidan o‘tuvchi vertikal tekislik kesadi — kesim teng yonli uchburchak. Gorizontal tekislik esa kvadrat beradi (asosdan kichikroq).', holat:{jism:'piramida', kesim:'vertikal', kes:false}},
    {sarlavha:'Tetraedr kesimi — kvadrat!', matn:'Muntazam tetraedrning uchburchak yoqlari bor, lekin qarama-qarshi qirralarga parallel tekislik uning o‘rtasidan kesib o‘tsa, kesim kvadrat bo‘ladi.', holat:{jism:'tetraedr', kesim:'gorizontal', kes:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Kesim yasang', holat:{jism:'kub', kesim:'gorizontal', kes:false},
    topshiriqlar:[
      {shart:'Kub kesimini <b>uchburchak</b> qiling (slayderlar yoki tugmalar).', hodisa:'mg-kesim', kod:"ev.jism==='kub' && ev.tomon===3", izoh:'To‘g‘ri — tekislik bitta uchdan chiquvchi <b>3 ta qirrani</b> kesdi.'},
      {shart:'Kub kesimini <b>oltiburchak</b> qiling.', hodisa:'mg-kesim', kod:"ev.jism==='kub' && ev.tomon===6", izoh:'To‘g‘ri — tekislik kubning <b>6 ta yog‘ining hammasini</b> kesdi.'},
      {shart:'Kubda <b>beshburchak</b> kesim hosil qiling.', hodisa:'mg-kesim', kod:"ev.jism==='kub' && ev.tomon===5", izoh:'To‘g‘ri — tekislik <b>5 ta yoqni</b> kesdi.'},
      {shart:'<b>Tetraedr</b>ni tanlang va uning kesimini <b>to‘rtburchak</b> qiling.', hodisa:'mg-kesim', kod:"ev.jism==='tetraedr' && ev.tomon===4", izoh:'To‘g‘ri — tetraedr kesimi ko‘pi bilan <b>to‘rtburchak</b>: yoqlari 4 ta.'},
      {shart:'Sahnada <b>kesim ko‘pburchagini</b> bosing.', hodisa:'mg-kesim', kod:"ev.bos && ev.nom==='kesim'", izoh:'To‘g‘ri — <b>kesim</b>: tekislik va jismning umumiy qismi.'}
    ]},
  test:[
    {s:'Kub kesimi ko‘pi bilan necha burchakli bo‘lishi mumkin?', v:['4','5','6','8'], t:2, izoh:'Kubning 6 ta yog‘i bor, har yoqda kesimning ko‘pi bilan bitta tomoni: <b>6</b>.'},
    {s:'Tetraedr kesimi qanday ko‘pburchak bo‘lishi mumkin?', v:['faqat uchburchak','uchburchak yoki to‘rtburchak','beshburchak ham','oltiburchak ham'], t:1, izoh:'Tetraedrning 4 ta yog‘i bor: kesim <b>uchburchak yoki to‘rtburchak</b>.'},
    {s:'Kubni asosiga parallel tekislik bilan kessak, kesim qanday bo‘ladi?', v:['to‘g‘ri to‘rtburchak (kvadrat emas)','kvadrat','uchburchak','romb (kvadrat emas)'], t:1, izoh:'Kesim asosga teng — <b>kvadrat</b>.'},
    {s:'Kesim ko‘pburchagining tomonlari nima?', v:['jismning qirralari','tekislikning jism yoqlari bilan kesishgan kesmalari','jism diagonallari','jism balandliklari'], t:1, izoh:'Kesim tomoni — <b>tekislik va yoqning kesishish kesmasi</b>.'},
    {s:'Qirrasi 2 bo‘lgan kubning asosga parallel kesimi yuzi?', v:['2','4','8','6'], t:1, izoh:'Kesim — tomoni 2 bo‘lgan kvadrat: <b>4</b> kv. birlik.'},
    {s:'Silindrni o‘qiga perpendikulyar tekislik bilan kessak, kesim?', v:['doira','ellips','to‘g‘ri to‘rtburchak','uchburchak'], t:0, izoh:'Kesim — asosga teng <b>doira</b>.'},
    {s:'Silindrning o‘q kesimi (o‘q orqali o‘tuvchi tekislik bilan) qanday?', v:['doira','to‘g‘ri to‘rtburchak','uchburchak','trapetsiya'], t:1, izoh:'Tomonlari — diametr va balandlik: <b>to‘g‘ri to‘rtburchak</b>.'},
    {s:'Konusning o‘q kesimi qanday?', v:['teng yonli uchburchak','doira','kvadrat','trapetsiya'], t:0, izoh:'Asos diametri va ikki yasovchi: <b>teng yonli uchburchak</b>.'},
    {s:'Muntazam to‘rtburchakli piramidani asosga parallel tekislik bilan kessak?', v:['uchburchak','kvadrat','beshburchak','doira'], t:1, izoh:'Asosga o‘xshash kichikroq <b>kvadrat</b>.'},
    T3('Sahnada kubning <b>kesimini</b> (sariq ko‘pburchak) bosing.', 'mg-kesim', 'nom', ['kesim'], ['kesim ko‘pburchagi', 'jismning boshqa qismi'], 'Kesim — tekislik va jismning umumiy qismi; bu holatda <b>muntazam oltiburchak</b>.')
  ],
  yordamchi:[
    {s:'Kesimni qo‘lda qanday yasayman?', j:'1) Tekislik va jismning bitta yog‘ida yotgan ikki nuqtani toping va tutashtiring — bu kesim tomoni. 2) Parallel yoqlarda kesim tomonlari parallel bo‘ladi. 3) Kerak bo‘lsa, kesish chizig‘ini davom ettirib, qirra davomi bilan kesishish nuqtasini toping (iz usuli).', kalit:['yasash','qo‘lda','iz']},
    {s:'Nega kubda yettiburchak kesim bo‘lmaydi?', j:'Kesimning har bir tomoni kubning bitta yog‘ida yotadi, har bir yoqda ko‘pi bilan bitta tomon. Kubning yoqlari 6 ta — demak, tomonlar 6 tadan oshmaydi.', kalit:['yetti','nega']}
  ],
  maqola:[
    {sarlavha:'Kesim nima?', xatboshilar:[
      'Fazoviy jismni tekislik bilan kesganda hosil bo‘ladigan tekis shakl kesim deyiladi. Ko‘pyoq kesimi — ko‘pburchak: uning uchlari tekislikning jism qirralari bilan kesishish nuqtalari, tomonlari — yoqlar bilan kesishish kesmalari.',
      'Bundan muhim qoida kelib chiqadi: kesim tomonlari soni jism yoqlari sonidan oshmaydi. Kubda (6 yoq) kesim 3–6 burchakli, tetraedrda (4 yoq) 3 yoki 4 burchakli, uchburchakli prizmada (5 yoq) 3–5 burchakli bo‘ladi.',
      'Yana bir qoida: tekislik ikkita parallel yoqni kesadi, kesish chiziqlari parallel bo‘ladi. Shuning uchun kubning oltiburchak kesimida qarama-qarshi tomonlar parallel.'
    ]},
    {sarlavha:'Kesim yasash usullari', xatboshilar:[
      'Maktabda kesim odatda uchta berilgan nuqta orqali yasaladi. Agar ikki nuqta bitta yoqda yotsa, ular tutashtiriladi. Nuqtalar turli yoqlarda bo‘lsa, «iz usuli» qo‘llanadi: kesish chizig‘i davom ettiriladi va qirralar davomlari bilan kesishish nuqtalari topiladi.',
      'Kesim yuzini hisoblash uchun uning shakli aniqlanadi. Masalan, qirrasi a bo‘lgan kubning markazidan bosh diagonalga perpendikulyar o‘tuvchi kesimi — tomoni a√2/2 bo‘lgan muntazam oltiburchak, yuzi (3√3/4)a². a = 2 da bu ≈ 5,2 — sahnadagi karta ham shuni ko‘rsatadi.',
      'Aylanish jismlarida kesimlar egri chiziqli: silindr va shar kesimlari doira bo‘lishi mumkin, konusni turli tekisliklar bilan kesib ellips, parabola va giperbola hosil qilinadi (konus kesimlari).'
    ]},
    {sarlavha:'Kesimlar amaliyotda', xatboshilar:[
      'Kompyuter tomografiyasi (KT) tanani ko‘plab parallel kesimlar ko‘rinishida tasvirlaydi. Birinchi klinik KT tekshiruvi 1971-yilda Londonda o‘tkazilgan; uning ixtirochilari G. Xaunsfild va A. Kormak 1979-yilda Nobel mukofotiga sazovor bo‘lgan.',
      'Muhandislik chizmalarida detalning ichki tuzilishini ko‘rsatish uchun «qirqim» va «kesim» tasvirlari chiziladi. Geologiyada tog‘ jinslari qatlamlari, biologiyada o‘simlik poyasi kesimlari o‘rganiladi.',
      'Italiyalik matematik B. Kavalyeri (1635) hajmlarni kesimlar orqali solishtirish g‘oyasini bergan: ikki jismning barcha mos kesimlari yuzlari teng bo‘lsa, ularning hajmlari ham teng.'
    ]}
  ],
  formulalar:[
    ['n_kesim ≤ Y','Kesim tomonlari soni ≤ yoqlar soni'],
    ['S = a²','Kubning asosga parallel kesimi'],
    ['S = (3√3/4)·a²','Kubning markaziy oltiburchak kesimi'],
    ['S = (√3/2)·a²','Kubning uchni kesuvchi, uch uchdan o‘tuvchi kesimi (uchburchak, tomoni a√2)'],
    ['S = 2r·h','Silindrning o‘q kesimi']
  ],
  qiziqarli:[
    'Kubni bitta tekislik bilan kesib, muntazam oltiburchak hosil qilish mumkin — buni sahnadagi «Oltiburchak» tugmasi ko‘rsatadi.',
    'Muntazam tetraedrning kesimi kvadrat ham bo‘lishi mumkin — uchburchak yoqli jismdan kvadrat!',
    'Kompyuter tomografi tanani yuzlab yupqa kesimlar ko‘rinishida ko‘rsatadi; birinchi klinik tekshiruv 1971-yilda o‘tkazilgan.',
    'Konus kesimlari — ellips, parabola, giperbola — sayyoralar orbitalari va yoritgichlar shaklini tasvirlaydi.'
  ],
  lugat:[
    ['Kesim','Jism va tekislikning umumiy qismi.'],
    ['Kesuvchi tekislik','Jismni kesib o‘tuvchi tekislik.'],
    ['Yoq','Ko‘pyoqni chegaralovchi ko‘pburchak.'],
    ['Qirra','Ikki yoqning umumiy tomoni.'],
    ['Bosh diagonal','Kubning bir yoqda yotmagan qarama-qarshi uchlarini tutashtiruvchi kesma.'],
    ['O‘q kesimi','Aylanish jismining o‘qi orqali o‘tuvchi kesim.'],
    ['Iz usuli','Kesim yasashda tekislikning yoq tekisliklari bilan kesishish chiziqlarini topish usuli.']
  ],
  manba:G10 + '; ' + MW + ': «Cross section (geometry)», «Cube», «Regular tetrahedron», «Conic section», «Cavalieri’s principle», «CT scan», «Godfrey Hounsfield». Kesim yuzlari formulalari hisoblab tekshirilgan.',
  ishlanma:ish('10-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D model, tadqiqot jadvali, guruhda ishlash',
    ['Ko‘pyoq kesimi tushunchasi, kesim tomonlari soni va yoqlar bog‘lanishi, asosiy kesimlarni o‘rgatish.', 'Fazoviy tasavvur va aniqlikni tarbiyalash.', 'Fazoviy shaklni tekislikda tasvirlash va tahlil qilish ko‘nikmasini rivojlantirish.'],
    ['Kesim ta’rifini biladi','Kub, piramida, tetraedr kesimlari turini aniqlaydi','Oddiy kesim yuzini hisoblaydi','Kesimning amaliy qo‘llanishini tushuntiradi'],
    ['MAKON sahnasi «Jismlarning kesimlari»','Proyektor','Plastilin yoki kartoshkadan kub, pichoq (o‘qituvchi nazoratida)','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> KT tasviri: «Tanani qanday qilib qatlam-qatlam ko‘ramiz?»','Taxmin aytadi.'],['8–20','<b>Kub kesimlari.</b> MAKON: kvadrat, to‘g‘ri to‘rtburchak, uchburchak, beshburchak, oltiburchak.','Jadval to‘ldiradi: holat — shakl — tomonlar soni.'],['20–28','<b>Qoida.</b> Tomonlar soni ≤ yoqlar soni; piramida va tetraedr.','Gipotezani tekshiradi.'],['28–35','<b>Amaliy.</b> Plastilin kubni kesish; kesim yuzini hisoblash.','Guruhda kesadi va hisoblaydi.'],['35–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Kesim','Tekislik va jismning umumiy qismi.'],['Kesim tomoni','Yoq bilan kesishish kesmasi.'],['O‘q kesimi','O‘q orqali kesim.']],
    [['Kub kesimi necha burchakli bo‘lishi mumkin?','3–6'],['Tetraedr kesimi?','3 yoki 4'],['Konus o‘q kesimi?','Teng yonli uchburchak']],
    'Darslikdagi mashqlar; (1) qirrasi 4 bo‘lgan kubning diagonal kesimi (ikki qarama-qarshi qirra orqali) yuzini toping (javob: 16√2 ≈ 22,6); (2) uyda bir sabzavotni turli tekisliklar bilan kesib, kesimlarni chizing.',
    G10)
};

/* ================================================================
   11. MUNTAZAM KO‘PYOQLAR — PLATON JISMLARI — 10–11-sinf
   ================================================================ */
D['geo-platon'] = {
  fan:'geometriya', qisqaNom:'Platon jismlari', nom:'Muntazam ko‘pyoqlar — beshta Platon jismi', sinf:'10–11-sinf',
  qisqa:'10–11-sinf · Geometriya · «Muntazam ko‘pyoqlar»',
  sahna:'mg_platon',
  mgUq:{rejim:'hammasi', tanl:'tetraedr', dual:false, ajrat:false},
  kor:{
    sarlavha:'Nega muntazam ko‘pyoq faqat beshta?',
    matn:'Barcha yoqlari bir xil muntazam ko‘pburchak bo‘lib, har bir uchida bir xil sondagi yoq uchrashadigan qavariq ko‘pyoq muntazam ko‘pyoq deyiladi. Bunday jismlar faqat beshta: tetraedr, kub, oktaedr, dodekaedr va ikosaedr. Sahnada ularni aylantiring, bosing, yoqlarini ajrating, dual jismlarini ko‘ring va Eyler formulasi U − Q + Y = 2 har birida bajarilishini tekshiring.',
    punktlar:['<b>Tetraedr</b> 4 · <b>kub</b> 6 · <b>oktaedr</b> 8 · <b>dodekaedr</b> 12 · <b>ikosaedr</b> 20 yoqli','<b>Eyler formulasi:</b> U − Q + Y = 2 (uchlar − qirralar + yoqlar)','<b>Nega beshta:</b> bir uchdagi yassi burchaklar yig‘indisi 360° dan kichik bo‘lishi kerak','<b>Duallik:</b> kub ↔ oktaedr, dodekaedr ↔ ikosaedr, tetraedr ↔ tetraedr']
  },
  bolimlar:[
    {sarlavha:'Beshta Platon jismi', jadval:[
      ['Tetraedr','U 4 · Q 6 · Y 4 · uchburchak · uchda 3 yoq'],
      ['Kub (geksaedr)','U 8 · Q 12 · Y 6 · kvadrat · uchda 3 yoq'],
      ['Oktaedr','U 6 · Q 12 · Y 8 · uchburchak · uchda 4 yoq'],
      ['Dodekaedr','U 20 · Q 30 · Y 12 · beshburchak · uchda 3 yoq'],
      ['Ikosaedr','U 12 · Q 30 · Y 20 · uchburchak · uchda 5 yoq']
    ], matn:'Sahna har jismni uch, qirra va yoqlarga o‘zi ajratib sanaydi — jadvaldagi sonlar shu hisob bilan mos keladi.'},
    {sarlavha:'Nega faqat beshta?', jadval:[
      ['Uchburchak (60°)','3 ta — 180° (tetraedr), 4 ta — 240° (oktaedr), 5 ta — 300° (ikosaedr); 6 ta — 360° — tekis'],
      ['Kvadrat (90°)','3 ta — 270° (kub); 4 ta — 360° — tekis'],
      ['Beshburchak (108°)','3 ta — 324° (dodekaedr); 4 ta — 432° &gt; 360°'],
      ['Oltiburchak (120°)','3 ta — 360° — tekis, ko‘pyoq yopilmaydi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Beshta muntazam ko‘pyoq', matn:'Tetraedr, kub, oktaedr, dodekaedr, ikosaedr. Har biri qavariq, yoqlari bir xil muntazam ko‘pburchak, har bir uchida bir xil sondagi yoq uchrashadi.', holat:{rejim:'hammasi', tanl:'tetraedr', dual:false, ajrat:false}},
    {sarlavha:'Kub — geksaedr', matn:'6 ta kvadrat yoq, har uchda 3 tasi: 3 · 90° = 270° &lt; 360°. U = 8, Q = 12, Y = 6: 8 − 12 + 6 = 2.', holat:{rejim:'bitta', tanl:'kub', dual:false, ajrat:false}},
    {sarlavha:'Oktaedr', matn:'8 ta uchburchak yoq, har uchda 4 tasi: 4 · 60° = 240°. Bu — ikkita to‘rtburchakli piramida asoslari bilan yopishtirilgandek. 6 − 12 + 8 = 2.', holat:{rejim:'bitta', tanl:'oktaedr', dual:false, ajrat:false}},
    {sarlavha:'Dodekaedr', matn:'12 ta muntazam beshburchak, har uchda 3 tasi: 3 · 108° = 324°. 20 − 30 + 12 = 2.', holat:{rejim:'bitta', tanl:'dodekaedr', dual:false, ajrat:false}},
    {sarlavha:'Ikosaedr: yoqlarni ajratamiz', matn:'20 ta uchburchak, har uchda 5 tasi: 5 · 60° = 300°. Yoqlar ajratildi — ularni sanash oson. 12 − 30 + 20 = 2.', holat:{rejim:'bitta', tanl:'ikosaedr', dual:false, ajrat:true}},
    {sarlavha:'Dual jism: kub ichida oktaedr', matn:'Kub yoqlarining markazlarini tutashtirsak, oktaedr hosil bo‘ladi (havorang). Kubda 6 yoq va 8 uch, oktaedrda 6 uch va 8 yoq — sonlar o‘rin almashgan.', holat:{rejim:'bitta', tanl:'kub', dual:true, ajrat:false}},
    {sarlavha:'Eyler formulasi — hammasida 2', matn:'Kartadagi jadvalga qarang: beshala jism uchun U − Q + Y = 2. Bu formula barcha qavariq ko‘pyoqlar uchun to‘g‘ri — hatto muntazam bo‘lmaganlari uchun ham.', holat:{rejim:'hammasi', tanl:'ikosaedr', dual:false, ajrat:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Jismni toping', holat:{rejim:'hammasi', tanl:'tetraedr', dual:false, ajrat:false},
    topshiriqlar:[
      {shart:'<b>12 ta beshburchak</b> yoqli jismni bosing.', hodisa:'mg-platon', kod:"ev.bos && ev.nom==='dodekaedr'", izoh:'To‘g‘ri — <b>dodekaedr</b>.'},
      {shart:'Har bir uchida <b>4 ta yoq</b> uchrashadigan jismni bosing.', hodisa:'mg-platon', kod:"ev.bos && ev.nom==='oktaedr'", izoh:'To‘g‘ri — <b>oktaedr</b>: 4 · 60° = 240°.'},
      {shart:'<b>Eng kam yoqli</b> muntazam ko‘pyoqni bosing.', hodisa:'mg-platon', kod:"ev.bos && ev.nom==='tetraedr'", izoh:'To‘g‘ri — <b>tetraedr</b>, 4 ta yoq.'},
      {shart:'<b>12 ta uchli</b> jismni bosing.', hodisa:'mg-platon', kod:"ev.bos && ev.nom==='ikosaedr'", izoh:'To‘g‘ri — <b>ikosaedr</b>: 12 − 30 + 20 = 2.'},
      {shart:'<b>Kub</b>ni tanlab, uning <b>dual jismini</b> ko‘rsating (tugma «Dual jism»).', hodisa:'mg-platon', kod:"ev.nom==='kub' && ev.dual===true", izoh:'To‘g‘ri — kubning duali <b>oktaedr</b>.'}
    ]},
  test:[
    {s:'Nechta muntazam qavariq ko‘pyoq mavjud?', v:['4','5','6','cheksiz ko‘p'], t:1, izoh:'Faqat <b>5</b> ta — buni Yevklid «Negizlar»ning XIII kitobida isbotlagan.'},
    {s:'Ikosaedrning yoqlari soni?', v:['12','20','30','8'], t:1, izoh:'Ikosaedr — <b>20</b> yoqli (yunoncha «eikosi» — yigirma).'},
    {s:'Dodekaedrning yoqlari qanday ko‘pburchak?', v:['uchburchak','kvadrat','muntazam beshburchak','oltiburchak'], t:2, izoh:'12 ta <b>muntazam beshburchak</b>.'},
    {s:'Oktaedrda U = 6, Y = 8. Eyler formulasi bo‘yicha qirralar soni?', v:['10','12','14','16'], t:1, izoh:'Q = U + Y − 2 = 6 + 8 − 2 = <b>12</b>.'},
    {s:'Kubning dual jismi qaysi?', v:['tetraedr','oktaedr','dodekaedr','ikosaedr'], t:1, izoh:'Kub yoqlari markazlari <b>oktaedr</b> uchlari bo‘ladi.'},
    {s:'Tetraedrning dual jismi qaysi?', v:['tetraedr','kub','oktaedr','ikosaedr'], t:0, izoh:'Tetraedr o‘z-o‘ziga dual: 4 yoq ↔ 4 uch — <b>tetraedr</b>.'},
    {s:'Nega muntazam oltiburchak yoqli ko‘pyoq yo‘q?', v:['bir uchdagi 3 ta burchak 360° ni tashkil etadi — sirt tekis bo‘lib qoladi','oltiburchak muntazam bo‘lolmaydi','qirralar juda ko‘p bo‘ladi','Eyler formulasi bajarilmaydi'], t:0, izoh:'3 · 120° = <b>360°</b> — uch atrofida sirt tekis bo‘ladi, ko‘pyoq «yopilmaydi».'},
    {s:'Platon «Timey» asarida kubni qaysi unsur bilan bog‘lagan?', v:['olov','suv','yer','havo'], t:2, izoh:'Kub — <b>yer</b> (eng barqaror jism); tetraedr — olov, oktaedr — havo, ikosaedr — suv.'},
    {s:'Dodekaedrda U = 20, Q = 30. Yoqlar soni?', v:['10','12','20','50'], t:1, izoh:'Y = 2 − U + Q = 2 − 20 + 30 = <b>12</b>.'},
    T3('Sahnada <b>20 ta uchburchak</b> yoqli jismni bosing.', 'mg-platon', 'nom', ['ikosaedr'], ['Ikosaedr', 'boshqa jism'], '<b>Ikosaedr</b>: 20 ta uchburchak yoq, har uchda 5 tasi, U = 12, Q = 30.')
  ],
  yordamchi:[
    {s:'Eyler formulasini qanday tekshiraman?', j:'Uchlar (U), qirralar (Q) va yoqlar (Y) sonini sanang va U − Q + Y ni hisoblang. Kub: 8 − 12 + 6 = 2. Sahnadagi karta jadvalida beshala jism uchun hisob bor.', kalit:['eyler','formula']},
    {s:'Dual jism nima?', j:'Jismning har bir yog‘i markaziga nuqta qo‘yib, qo‘shni yoqlar markazlarini tutashtirsak, dual jism hosil bo‘ladi. Uning uchlari soni asl jism yoqlari soniga teng va aksincha.', kalit:['dual','ikkilik']}
  ],
  maqola:[
    {sarlavha:'Platon, Teetet va Yevklid', xatboshilar:[
      'Muntazam ko‘pyoqlar qadimgi yunonlarga yaxshi ma’lum bo‘lgan. Faylasuf Platon (mil. av. taxminan 360-yillarda yozilgan «Timey» asarida) ularni olam unsurlari bilan bog‘lagan: tetraedr — olov, kub — yer, oktaedr — havo, ikosaedr — suv; dodekaedrni esa butun olam (osmon) tuzilishi bilan bog‘lagan. Shuning uchun ular Platon jismlari deyiladi.',
      'Oktaedr va ikosaedrni birinchi bo‘lib matematik jihatdan tadqiq qilgan olim Teetet (mil. av. taxminan 417–369) deb hisoblanadi. Yevklid «Negizlar» asarining XIII kitobida beshala jismni yasagan va boshqa muntazam qavariq ko‘pyoq yo‘qligini isbotlagan.',
      'Iogann Kepler 1596-yilda «Kosmografik sir» (Mysterium Cosmographicum) kitobida o‘sha paytda ma’lum oltita sayyora orbitalari orasidagi masofalarni bir-biri ichiga joylangan Platon jismlari bilan tushuntirishga uringan. Keyinchalik u orbitalar ellips ekanini aniqlagan va bu model voz kechilgan.'
    ]},
    {sarlavha:'Nega aynan beshta?', xatboshilar:[
      'Ko‘pyoqning har bir uchida kamida 3 ta yoq uchrashishi kerak, va ularning shu uchdagi yassi burchaklari yig‘indisi 360° dan kichik bo‘lishi shart — aks holda sirt tekis bo‘lib qoladi yoki «ortiqcha» bo‘ladi.',
      'Muntazam uchburchak burchagi 60°: uchda 3, 4 yoki 5 ta (180°, 240°, 300°) — tetraedr, oktaedr, ikosaedr. Kvadrat (90°): faqat 3 ta (270°) — kub. Muntazam beshburchak (108°): faqat 3 ta (324°) — dodekaedr. Oltiburchakda 3 · 120° = 360° — imkonsiz, undan ko‘p burchakli ko‘pburchaklarda esa burchaklar yanada katta.',
      'Shunday qilib, jami beshta imkoniyat bor va ularning har biri haqiqatan ham ko‘pyoq beradi. Bu matematikadagi eng go‘zal «to‘liq ro‘yxat» isbotlaridan biri.'
    ]},
    {sarlavha:'Eyler formulasi va duallik', xatboshilar:[
      'Leonard Eyler 1750-yilda Goldbaxga yozgan xatida ko‘pyoqlar uchun U − Q + Y = 2 munosabatini bayon qilgan va uni 1758-yilda nashr etgan. Formula nafaqat Platon jismlari, balki har qanday qavariq ko‘pyoq uchun to‘g‘ri: masalan, uchburchakli prizmada 6 − 9 + 5 = 2.',
      'Platon jismlari juft-juft bog‘langan. Kub yoqlari markazlarini tutashtirsak — oktaedr, oktaedrnikini tutashtirsak — kub hosil bo‘ladi. Xuddi shunday dodekaedr ↔ ikosaedr. Tetraedr esa o‘z-o‘ziga dual. Dual juftliklarda qirralar soni bir xil (kub va oktaedr — 12, dodekaedr va ikosaedr — 30), uchlar va yoqlar soni esa o‘rin almashadi.'
    ]},
    {sarlavha:'Tabiatda va hayotda', xatboshilar:[
      'Ko‘plab viruslarning oqsil qobig‘i (kapsidi) ikosaedr simmetriyasiga ega. Tuz (NaCl) kristallari ko‘pincha kub shaklida, olmos va flyuorit kristallari oktaedr shaklida uchraydi. Stol o‘yinlaridagi zarlar — d4, d6, d8, d12, d20 — beshala Platon jismi.',
      'Futbol to‘pining klassik naqshi (12 beshburchak va 20 oltiburchak) — ikosaedrning uchlarini «kesib» olingan kesik ikosaedr; u Platon jismi emas, Arximed jismlaridan biri.'
    ]}
  ],
  formulalar:[
    ['U − Q + Y = 2','Eyler formulasi (qavariq ko‘pyoq)'],
    ['Q = Y · n / 2','Qirralar: har yoqda n ta tomon, har qirra 2 yoqqa tegishli'],
    ['U = Y · n / m','Uchlar: har uchda m ta yoq'],
    ['m · (yassi burchak) < 360°','Qavariq uch sharti'],
    ['Kub ↔ oktaedr, dodekaedr ↔ ikosaedr','Duallik']
  ],
  qiziqarli:[
    'Stol o‘yinlaridagi d4, d6, d8, d12, d20 zarlari — beshala Platon jismi.',
    'Kepler 1596-yilda sayyoralar orbitalarini Platon jismlari bilan tushuntirishga uringan.',
    'Ko‘p viruslarning qobig‘i ikosaedr simmetriyasiga ega — bu oz sonli oqsil turidan mustahkam qobiq yasashning tejamkor usuli.',
    'Futbol to‘pi Platon jismi emas: u kesik ikosaedr (Arximed jismi) — 12 beshburchak va 20 oltiburchak.'
  ],
  lugat:[
    ['Muntazam ko‘pyoq','Yoqlari bir xil muntazam ko‘pburchak, har uchida bir xil sondagi yoq uchrashadigan qavariq ko‘pyoq.'],
    ['Tetraedr','4 ta uchburchak yoqli ko‘pyoq.'],
    ['Geksaedr (kub)','6 ta kvadrat yoqli ko‘pyoq.'],
    ['Oktaedr','8 ta uchburchak yoqli ko‘pyoq.'],
    ['Dodekaedr','12 ta beshburchak yoqli ko‘pyoq.'],
    ['Ikosaedr','20 ta uchburchak yoqli ko‘pyoq.'],
    ['Dual jism','Yoqlar markazlarini tutashtirib hosil qilingan jism.'],
    ['Eyler xarakteristikasi','U − Q + Y soni; qavariq ko‘pyoq uchun 2.'],
    ['Yassi burchak','Yoqning uchdagi burchagi.']
  ],
  manba:G10 + '; ' + MW + ': «Platonic solid», «Euler characteristic», «Timaeus (dialogue)», «Theaetetus (mathematician)», «Euclid’s Elements» (XIII kitob), «Mysterium Cosmographicum», «Dual polyhedron», «Capsid», «Truncated icosahedron»; AMS Feature Column «Euler’s Polyhedral Formula» (ams.org). Eyler: 1750-yilgi xat, nashr 1758 (ba’zi manbalarda maqolalar 1750–1751-yillarda yozilgan deyiladi). Platon «Timey» sanasi taxminiy.',
  ishlanma:ish('10–11-sinf', 'Yangi bilim berish (tadqiqot darsi)', 'Interaktiv 3D modellar, jadval to‘ldirish, qog‘ozdan yoyilma yasash',
    ['Muntazam ko‘pyoqlar, ularning soni va xossalari, Eyler formulasi va duallikni o‘rgatish.', 'Matematika go‘zalligi va ilm tarixiga qiziqishni tarbiyalash.', 'Sanash, jadvaldan qonuniyat topish va isbot g‘oyasini tushunish ko‘nikmasini rivojlantirish.'],
    ['Beshta Platon jismini nomlaydi va taniydi','U, Q, Y ni sanaydi va Eyler formulasini tekshiradi','Nega faqat beshta ekanini tushuntiradi','Dual juftliklarni aytadi'],
    ['MAKON sahnasi «Muntazam ko‘pyoqlar»','Proyektor','Qalin qog‘ozdan yoyilmalar, qaychi, yelim','Zarlar to‘plami (d4–d20), agar bo‘lsa'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> O‘yin zarlari va virus rasmi: «Umumiy tomoni nima?»','Taxmin aytadi.'],['8–18','<b>Beshta jism.</b> MAKON: har birini aylantirib, U, Q, Y ni sanash.','Jadval to‘ldiradi.'],['18–25','<b>Eyler formulasi.</b> Jadvaldan qonuniyat topish.','U − Q + Y ni hisoblaydi.'],['25–32','<b>Nega beshta?</b> Uchdagi burchaklar yig‘indisi; duallik.','Isbotni guruhda muhokama qiladi.'],['32–41','<b>Mustahkamlash.</b> MAKON amaliyoti va test; yoyilmadan tetraedr yasash.','Amaliyot, test, model.'],['41–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Muntazam ko‘pyoq','Bir xil yoqlar, bir xil uchlar.'],['Eyler formulasi','U − Q + Y = 2.'],['Dual','Yoq markazlari.']],
    [['Ikosaedr yoqlari?','20'],['Kub duali?','Oktaedr'],['Oktaedr qirralari?','12']],
    'Darslikdagi mashqlar; (1) qog‘ozdan oktaedr yoyilmasini chizib, yasang; (2) 5 burchakli prizma uchun Eyler formulasini tekshiring (U = 10, Q = 15, Y = 7).',
    G10)
};

/* ======================= fanga bog‘lash ======================= */
bogla('matematika', 'Oddiy kasrlar', 'mat-kasrlar', '5-sinf: pitsa va shokolad modeli, teng kasrlar, qo‘shish');
bogla('matematika', 'Musbat va manfiy sonlar', 'mat-manfiy', '6-sinf: sonlar o‘qi, termometr, qo‘shish — qadam');
bogla('matematika', 'Chiziqli funksiya va uning grafigi', 'mat-chiziqli', '7-sinf: y = kx + b, qiyalik uchburchagi, parallel chiziqlar', ['Chiziqli funksiya va uning grafigi']);
bogla('matematika', 'Tengsizliklarni grafik usulda yechish', 'mat-tengsizlik', '9-sinf: kvadrat tengsizliklar va sistemalar grafikda', ['Tengsizliklarni grafik usulda yechish']);
bogla('matematika', 'Birlik aylana va trigonometrik funksiyalar', 'mat-trigonometriya', '10-sinf: sin, cos, tg birlik aylanada va sinusoida');
bogla('matematika', 'Hosila va urinma', 'mat-hosila', '11-sinf: kesuvchidan urinmaga, h → 0 animatsiyasi');
bogla('geometriya', 'Parallel to‘g‘ri chiziqlar va kesuvchi', 'geo-parallel', '7-sinf: 8 burchak, vertikal, mos, almashinuvchi');
bogla('geometriya', 'Pifagor teoremasi', 'geo-pifagor', '8-sinf: kvadratlar, katakchalar va qayta joylash isboti');
bogla('geometriya', 'Aylana: markaziy va ichki chizilgan burchaklar', 'geo-aylana', '9-sinf: ∠ACB = ½∠AOB, Fales teoremasi');
bogla('geometriya', 'Jismlarning kesimlari', 'geo-kesimlar', '10-sinf: kub, prizma, piramida, tetraedr — harakatlanuvchi tekislik', ['Jismlarning kesimlari']);
bogla('geometriya', 'Muntazam ko‘pyoqlar (Platon jismlari)', 'geo-platon', '10–11-sinf: beshta jism, Eyler formulasi, duallik', ['Muntazam ko‘pyoqlar (Platon jismlari)']);
const geo = F('geometriya'); if(geo){ geo.izoh = 'Parallel chiziqlar, Pifagor, aylana, ko‘pyoqlar, kesimlar'; geo.tavsif = 'Planimetriya va stereometriya bir joyda: chizmadagi nuqtalarni surib burchaklar, Pifagor teoremasi va aylana xossalarini tekshiring; 3D da jismlarni aylantiring, kesing va Platon jismlarini o‘rganing.'; }
const mat = F('matematika'); if(mat) mat.izoh = 'Kasrlar, manfiy sonlar, funksiyalar, tengsizliklar, trigonometriya, hosila';

/* ======================= DETAL KARTALARI ======================= */
const qv = (a, b)=>'∠' + a + ' = ∠' + b;
const BUR = {};
const JUFTLAR = {1:{v:4, q:[2, 3], m:5, a:8, at:'tashqi almashinuvchi'}, 2:{v:3, q:[1, 4], m:6, a:7, at:'tashqi almashinuvchi'}, 3:{v:2, q:[1, 4], m:7, a:6, at:'ichki almashinuvchi', b:5}, 4:{v:1, q:[2, 3], m:8, a:5, at:'ichki almashinuvchi', b:6}, 5:{v:8, q:[6, 7], m:1, a:4, at:'ichki almashinuvchi', b:3}, 6:{v:7, q:[5, 8], m:2, a:3, at:'ichki almashinuvchi', b:4}, 7:{v:6, q:[5, 8], m:3, a:2, at:'tashqi almashinuvchi'}, 8:{v:5, q:[6, 7], m:4, a:1, at:'tashqi almashinuvchi'}};
Object.keys(JUFTLAR).forEach(n=>{
  const j = JUFTLAR[n], ichki = [3, 4, 5, 6].includes(+n);
  BUR['b' + n] = {nom:'∠' + n + (ichki ? ' — ichki burchak' : ' — tashqi burchak'), sarlavha2:'Geometriya · parallel chiziqlar va kesuvchi',
    jadval:[['Vertikal', qv(n, j.v) + ' (doim)'], ['Qo‘shni', '∠' + j.q[0] + ', ∠' + j.q[1] + ': yig‘indi 180°'], ['Mos', qv(n, j.m) + ' (a ∥ b da)'], [j.at.replace(/^./, s=>s.toUpperCase()), qv(n, j.a) + ' (a ∥ b da)']].concat(j.b ? [['Ichki bir tomonli', '∠' + n + ' + ∠' + j.b + ' = 180° (a ∥ b da)']] : []),
    matn:'Sahnadagi raqamlash: a chizig‘ida 1–4, b chizig‘ida 5–8 (chap-yuqori, o‘ng-yuqori, chap-past, o‘ng-past). a ∥ b bo‘lsa, barcha burchaklar φ yoki 180° − φ ga teng.', manba:G7};
});
const DET = {
  mg_burchak:BUR,
  mg_chiziq:{
    oy:{nom:'Oy o‘qi bilan kesishish', sarlavha2:'Chiziqli funksiya · (0; b)', jadval:[['Shart','x = 0'],['Nuqta','(0; b)'],['Misol','y = 2x − 3 → (0; −3)']], matn:'x = 0 bo‘lganda kx had yo‘qoladi va y = b qoladi. Shuning uchun b — grafikning Oy o‘qini kesish balandligi.', manba:A7},
    ox:{nom:'Ox o‘qi bilan kesishish', sarlavha2:'Chiziqli funksiya · funksiya noli', jadval:[['Shart','y = 0'],['Nuqta','(−b/k; 0), k ≠ 0'],['Misol','y = 2x − 3 → (1,5; 0)']], matn:'kx + b = 0 tenglamaning yechimi — funksiyaning noli. k = 0, b ≠ 0 bo‘lsa, grafik Ox ni kesmaydi.', manba:A7}
  },
  mg_trig:{
    chorak1:{nom:'I chorak (0° – 90°)', sarlavha2:'Trigonometriya · ishoralar', jadval:[['sin α','+'],['cos α','+'],['tg α','+']], matn:'Nuqta o‘ngda va yuqorida — ikkala koordinata musbat.', manba:A10},
    chorak2:{nom:'II chorak (90° – 180°)', sarlavha2:'Trigonometriya · ishoralar', jadval:[['sin α','+'],['cos α','−'],['tg α','−']], matn:'Nuqta chapda va yuqorida: kosinus manfiy, sinus musbat. Masalan, sin 150° = 1/2, cos 150° = −√3/2.', manba:A10},
    chorak3:{nom:'III chorak (180° – 270°)', sarlavha2:'Trigonometriya · ishoralar', jadval:[['sin α','−'],['cos α','−'],['tg α','+']], matn:'Nuqta chapda va pastda: sinus va kosinus manfiy, ularning nisbati — tangens musbat.', manba:A10},
    chorak4:{nom:'IV chorak (270° – 360°)', sarlavha2:'Trigonometriya · ishoralar', jadval:[['sin α','−'],['cos α','+'],['tg α','−']], matn:'Nuqta o‘ngda va pastda: kosinus musbat, sinus manfiy. Masalan, cos 300° = 1/2, sin 300° = −√3/2.', manba:A10}
  },
  mg_hosila:{
    statsionar:{nom:'Statsionar nuqta', sarlavha2:'Hosila · f′(x₀) = 0', jadval:[['Ta’rif','hosila nolga teng nuqta'],['Urinma','gorizontal'],['y = x³ − 3x','x = −1 (maks.), x = 1 (min.)']], matn:'Ekstremumlar statsionar nuqtalar orasidan izlanadi. Lekin har bir statsionar nuqta ekstremum emas: y = x³ da x = 0.', manba:A11}
  },
  mg_pifagor:{
    a2:{nom:'Katet a ga qurilgan kvadrat', sarlavha2:'Pifagor teoremasi · a²', jadval:[['Yuzi','a²'],['a = 3 da','9']], matn:'Katetlarga qurilgan ikki kvadrat yuzlari yig‘indisi gipotenuzaga qurilgan kvadrat yuziga teng.', manba:G8},
    b2:{nom:'Katet b ga qurilgan kvadrat', sarlavha2:'Pifagor teoremasi · b²', jadval:[['Yuzi','b²'],['b = 4 da','16']], matn:'a² + b² = c²: 9 + 16 = 25.', manba:G8},
    c2:{nom:'Gipotenuzaga qurilgan kvadrat', sarlavha2:'Pifagor teoremasi · c²', jadval:[['Yuzi','c² = a² + b²'],['3–4–5 da','25']], matn:'Gipotenuza — to‘g‘ri burchak qarshisidagi eng uzun tomon. Uning kvadrati katetlar kvadratlari yig‘indisiga teng.', manba:G8},
    uchburchak:{nom:'To‘g‘ri burchakli uchburchak', sarlavha2:'Pifagor teoremasi', jadval:[['Yuzi','ab/2'],['Burchaklar','90° + α + β, α + β = 90°']], matn:'Qayta joylash isbotida 4 ta shunday uchburchak katta kvadrat ichida suriladi — bo‘sh yuza o‘zgarmaydi.', manba:G8}
  },
  mg_aylana:{
    O:{nom:'Aylana markazi O', sarlavha2:'Aylana', jadval:[['Radius','OA = OB = OC'],['Markaziy burchak uchi','O']], matn:'Aylananing barcha nuqtalari markazdan bir xil masofada — radius uzunligida.', manba:G9},
    markaziy:{nom:'Markaziy burchak ∠AOB', sarlavha2:'Aylana burchaklari', jadval:[['Uchi','markazda'],['Kattaligi','tiralgan yoyga teng']], matn:'Markaziy burchak yoyning gradus o‘lchovini beradi: 360° — butun aylana.', manba:G9},
    ichki:{nom:'Ichki chizilgan burchak ∠ACB', sarlavha2:'Aylana burchaklari', jadval:[['Uchi','aylanada'],['Kattaligi','½ · tiralgan yoy'],['Diametrga tiralsa','90°']], matn:'Bir yoyga tiralgan barcha ichki chizilgan burchaklar teng — C nuqtani yoy bo‘ylab surib ko‘ring.', manba:G9}
  },
  mg_kesim:{
    kub:{nom:'Kub', sarlavha2:'Ko‘pyoq · 6 yoq', jadval:[['U · Q · Y','8 · 12 · 6'],['Kesimlar','3, 4, 5, 6 burchakli']], matn:'Kubning muntazam oltiburchak kesimi markaz orqali, bosh diagonalga perpendikulyar tekislikda hosil bo‘ladi.', manba:G10},
    prizma:{nom:'Uchburchakli prizma', sarlavha2:'Ko‘pyoq · 5 yoq', jadval:[['U · Q · Y','6 · 9 · 5'],['Kesimlar','3, 4, 5 burchakli']], matn:'Asosga parallel kesim — asosga teng uchburchak.', manba:G10},
    piramida:{nom:'To‘rtburchakli piramida', sarlavha2:'Ko‘pyoq · 5 yoq', jadval:[['U · Q · Y','5 · 8 · 5'],['Kesimlar','3, 4, 5 burchakli']], matn:'Asosga parallel kesim — asosga o‘xshash kvadrat, uchidan o‘tuvchi vertikal kesim — uchburchak.', manba:G10},
    tetraedr:{nom:'Tetraedr', sarlavha2:'Ko‘pyoq · 4 yoq', jadval:[['U · Q · Y','4 · 6 · 4'],['Kesimlar','3 yoki 4 burchakli']], matn:'Qarama-qarshi qirralarga parallel, ularning o‘rtasidan o‘tuvchi kesim — kvadrat.', manba:G10},
    kesim:{nom:'Kesim', sarlavha2:'Tekislik ∩ jism', jadval:[['Uchlari','tekislik va qirralar kesishishi'],['Tomonlari','tekislik va yoqlar kesishishi'],['Tomonlar soni','≤ yoqlar soni']], matn:'Parallel yoqlarni kesuvchi tekislik parallel kesmalar hosil qiladi.', manba:G10}
  },
  mg_platon:{
    tetraedr:{nom:'Tetraedr', sarlavha2:'Platon jismi · olov', jadval:[['U · Q · Y','4 · 6 · 4'],['Yoqlar','uchburchak, uchda 3 ta'],['Dual','tetraedr']], matn:'Eng sodda muntazam ko‘pyoq. Metan (CH₄) molekulasi tetraedr shaklida.', manba:G10},
    kub:{nom:'Kub (geksaedr)', sarlavha2:'Platon jismi · yer', jadval:[['U · Q · Y','8 · 12 · 6'],['Yoqlar','kvadrat, uchda 3 ta'],['Dual','oktaedr']], matn:'Osh tuzi kristallari ko‘pincha kub shaklida o‘sadi.', manba:G10},
    oktaedr:{nom:'Oktaedr', sarlavha2:'Platon jismi · havo', jadval:[['U · Q · Y','6 · 12 · 8'],['Yoqlar','uchburchak, uchda 4 ta'],['Dual','kub']], matn:'Olmos va flyuorit kristallari ko‘pincha oktaedr shaklida uchraydi.', manba:G10},
    dodekaedr:{nom:'Dodekaedr', sarlavha2:'Platon jismi · koinot', jadval:[['U · Q · Y','20 · 30 · 12'],['Yoqlar','beshburchak, uchda 3 ta'],['Dual','ikosaedr']], matn:'Platon «Timey»da dodekaedrni butun olam tuzilishi bilan bog‘lagan.', manba:G10},
    ikosaedr:{nom:'Ikosaedr', sarlavha2:'Platon jismi · suv', jadval:[['U · Q · Y','12 · 30 · 20'],['Yoqlar','uchburchak, uchda 5 ta'],['Dual','dodekaedr']], matn:'Ko‘plab viruslarning oqsil qobig‘i ikosaedr simmetriyasiga ega.', manba:G10}
  }
};
const qosh = ()=>{ const DT = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DET).forEach(k=>{ DT[k] = Object.assign(DT[k] || {}, DET[k]); }); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
})();
