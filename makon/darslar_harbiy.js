/* MAKON — "Chaqiruvga qadar boshlang'ich tayyorgarlik" darslari.
   Manba: manba/harbiy_mazmun.md (rasmiy darsliklar: [D10] 10-sinf, 2017; [D11] 11-sinf, 2018; qo'shimcha manbalar belgilangan).
   Qoida: granata bo'limi faqat tanishuv va xavfsizlik darajasida. */
(function(){
const D10 = '10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2017)';
const D11 = '11-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2018)';

const fan = window.MAKON_FAN.find(f=>f.id === 'harbiy');
fan.izoh = 'Qurol tuzilishi, harbiy texnika, fuqaro muhofazasi';
fan.tavsif = '10–11-sinflar va o‘rta maxsus ta’lim uchun majburiy fan (VM 591-son qarori). Mazmun rasmiy darsliklarga tayangan; darsda faqat o‘quv maketi va 3D model ishlatiladi.';
fan.mavzular = [
  {nom:'Kalashnikov avtomati AK-74: tuzilishi va qismlarga ajratish', dars:'harbiy-ak74', qisqa:'12 asosiy qism, ajratish va yig‘ish tartibi, texnik ko‘rsatkichlar'},
  {nom:'Qo‘l granatalari RGD-5 va F-1', dars:'harbiy-granata', qisqa:'Hujum va mudofaa granatasi farqi, xavfsizlik qoidalari'},
  {nom:'Harbiy texnika: T-72, BTR-80, BMP-2, Mi-8', dars:'harbiy-texnika', qisqa:'Vazifasi, ekipaj, qurollanish, asosiy bo‘limlar'},
  {nom:'Gazdan himoyalanish niqobi GP-5', dars:'harbiy-protivogaz', qisqa:'Qismlari, o‘lcham tanlash, kiyish tartibi'},
  {nom:'Topografiya: Adrianov kompasi va azimut', qisqa:'Kompas qismlari, azimut bo‘yicha harakat'},
  {nom:'Dastlabki tibbiy yordam: qon ketishni to‘xtatish', qisqa:'Bosuvchi bog‘lam, jgut qo‘yish qoidalari'}
];
// eski soddalashtirilgan darsni ro'yxatdan olib tashlaymiz (AK-74 darsi o'rnini egallaydi)
delete window.MAKON_DARS['harbiy-ajratish'];

const XAVF_QUROL = [
  'Qurolni — o‘qlangan yoki o‘qlanmaganidan qat’i nazar — odamlarga, yonga va orqaga qaratish <b>taqiqlanadi</b>.',
  'Qismlarga ajratishdan oldin <b>avval magazin ajratiladi, keyin patronnik tekshiriladi</b>.',
  'Nosoz quroldan otish, nosoz o‘q-dori ishlatish, o‘q-dorini qismlarga ajratish taqiqlanadi.',
  'Maktabda amaliy mashg‘ulot faqat o‘quv maketi (MMG) bilan va o‘qituvchi nazoratida o‘tkaziladi.'
];

Object.assign(window.MAKON_DARS, {

/* ============ 1. AK-74 ============ */
'harbiy-ak74': {
  fan:'harbiy', qisqaNom:'AK-74', nom:'Kalashnikov avtomati AK-74: tuzilishi va qismlarga ajratish',
  qisqa:'10-sinf · III bo‘lim «Otish tayyorgarligi»',
  sahna:'glb', zaxira:'harbiy', amaliyotSahna:'harbiy',
  model:{fayl:'ak47', yorliq:'AK-47 · realistik CC0 model (3dmodelscc0)', sozlama:{ry:1.2, rx:-.1, avto:true, zoom:1.45}},
  modellar:[
    {nom:'Realistik model', fayl:'ak47', yorliq:'AK-47 · realistik CC0 model (3dmodelscc0) · alohida qism: magazin'},
    {nom:'Ajratiladigan o‘quv modeli', tur:'harbiy', yorliq:'Soddalashtirilgan o‘quv modeli · 6 qism ajraladi'}
  ],
  rejimlar:['butun','rentgen','ajrat'],
  kor:{
    sarlavha:'Askarning shaxsiy quroli',
    matn:'Kalashnikov avtomati dushman tirik kuchini safdan chiqarish uchun qo‘llaniladi. Avtomatika poroxli gaz energiyasining zatvor ramasidagi gaz porsheniga ta’siri hisobiga ishlaydi. O‘t ochish turlari: to‘xtovsiz (AB) va yakka (OD).',
    punktlar:['Kalibr — <b>5,45 mm</b>, o‘qdon — <b>30 patron</b>','O‘qning boshlang‘ich tezligi — <b>900 m/s</b>','Nishonga olish uzoqligi — <b>1000 m</b>','Noto‘liq ajratish — <b>8 bosqich</b> (og‘iz tormozi-kompensator ajratilsa — 9), yig‘ish — teskari tartibda']
  },
  bolimlar:[
    {sarlavha:'Texnik ko‘rsatkichlar', jadval:[
      ['Kalibr','5,45 mm'],['Og‘irligi (to‘ldirilgan o‘qdon bilan)','3,6 kg'],['Stvol uzunligi','415 mm'],['O‘qdon sig‘imi','30 patron'],
      ['O‘qning boshlang‘ich tezligi','900 m/s'],['Jangovar otish tezligi','to‘xtovsiz 100, yakka 40 o‘q/daq gacha'],
      ['Nishonga olish uzoqligi','1000 m'],['To‘g‘ri o‘q uzish (ko‘krak / harakatlanuvchi nishon)','440 / 625 m'],
      ['Samarali o‘t ochish masofasi','400 m gacha (darslik; rasmiy qo‘llanmada 500 m gacha)'],['Qabul qilingan yili','1974']
    ]},
    {sarlavha:'AKM bilan farqi', jadval:[['Kalibr','7,62 mm → 5,45 mm'],['O‘q tezligi','715 → 900 m/s'],['To‘g‘ri o‘q uzish (ko‘krak nishoni)','350 → 440 m']],
     matn:'AK-74 stvol og‘ziga tormoz-kompensator o‘rnatilgan — qaytish kuchini kamaytiradi va aniqlikni oshiradi.'},
    {sarlavha:'Noto‘liq qismlarga ajratish tartibi', tartibli:true, punktlar:[
      '<b>Magazinni ajratish</b> va patronnikda patron yo‘qligini tekshirish','<b>Penalni</b> qo‘ndoq uyasidan chiqarish','<b>Shompolni</b> ajratish',
      '<b>Og‘iz tormozi-kompensator</b> (dastur talab qilsa)','<b>Stvol qutisi qopqog‘ini</b> ajratish','<b>Qaytaruvchi mexanizmni</b> ajratish',
      '<b>Zatvor ramasini zatvor bilan</b> ajratish','<b>Zatvorni</b> ramadan ajratish','<b>Gaz trubkasini</b> stvol ustki qoplamasi bilan ajratish']},
    {sarlavha:'Normativ (mo‘ljal)', jadval:[['Noto‘liq ajratish','a’lo 15 · yaxshi 17 · qoniqarli 19 s'],['Yig‘ish','a’lo 25 · yaxshi 27 · qoniqarli 32 s']],
     matn:'<span style="color:var(--sariq)">Diqqat:</span> bu Rossiya maktab normativi. O‘zbekiston uchun rasmiy normativ jadvali topilmadi — o‘qituvchi amaldagi hujjat bo‘yicha belgilaydi.'}
  ],
  qismlar:[
    {raqam:1, nom:'Magazin (o‘qdon)', vazifa:'Patronlarni joylashtiradi va stvol qutisiga yetkazib beradi.', tugun:['Magazine'], d:[0,-1.4,0]},
    {raqam:2, nom:'Shompol', vazifa:'Stvolni tozalash va moylash uchun.', tugun:[], d:[0,-1,1.2]},
    {raqam:3, nom:'Stvol qutisi qopqog‘i', vazifa:'Stvol qutisi ichidagi mexanizmlarni ifloslanishdan saqlaydi.', tugun:[], d:[0,1.6,0]},
    {raqam:4, nom:'Qaytaruvchi mexanizm', vazifa:'Zatvor ramasini zatvor bilan oldingi holatga qaytaradi.', tugun:[], d:[-.6,2.3,0]},
    {raqam:5, nom:'Zatvor ramasi gaz porsheni bilan', vazifa:'Zatvor va zarbdor-tepki mexanizmini harakatga keltiradi.', tugun:[], d:[.6,1.9,.6]},
    {raqam:6, nom:'Zatvor', vazifa:'Patronni patronnikka yuboradi, stvol kanalini berkitadi, kapsulni ezadi, gilzani sug‘urib oladi.', tugun:[], d:[1.2,1.4,1.2]},
    {raqam:7, nom:'Gaz trubkasi ustki qoplama bilan', vazifa:'Gaz porsheni harakatini yo‘naltiradi; qoplama qo‘lni qizigan stvoldan asraydi.', tugun:[], d:[1.4,1.2,0]},
    {raqam:8, nom:'Stvol, stvol qutisi, qo‘ndoq va dasta', vazifa:'Stvol o‘qning yo‘nalishli uchishini ta’minlaydi (4 ta o‘ngga buralgan nareza); stvol qutisi qism va mexanizmlarni birlashtiradi.', tugun:[], d:[0,0,0]}
  ],
  bosqichlar:[
    {sarlavha:'Butun avtomat', matn:'Avval tashqi ko‘rinish: stvol, qo‘ndoq, dasta, magazin. Sichqoncha bilan aylantiring.', ajrat:[]},
    {sarlavha:'1. Magazin', matn:'Magazin ajratiladi, patronnik tekshiriladi — xavfsizlikning birinchi qoidasi.', ajrat:[1], qism:1},
    {sarlavha:'2–3. Penal va shompol', matn:'Penal qo‘ndoq uyasidan chiqadi, shompol mushka asosidan tortib olinadi.', ajrat:[1,2], qism:2},
    {sarlavha:'4. Stvol qutisi qopqog‘i', matn:'Qaytaruvchi mexanizm sterjeni bo‘rtig‘i bosilib, qopqoq orqasi ko‘tariladi.', ajrat:[1,2,3], qism:3},
    {sarlavha:'5. Qaytaruvchi mexanizm', matn:'Sterjen oldinga surilib, zatvor ramasi kanalidan sug‘urib olinadi.', ajrat:[1,2,3,4], qism:4},
    {sarlavha:'6–7. Zatvor ramasi va zatvor', matn:'Rama orqaga tortilib ko‘tariladi; zatvor burab chiqariladi.', ajrat:[1,2,3,4,5,6], qism:5},
    {sarlavha:'8. Gaz trubkasi', matn:'Penal yordamida cheka buriladi va gaz trubkasi ajratiladi. Yig‘ish — teskari tartibda.', ajrat:[1,2,3,4,5,6,7], qism:7}
  ],
  amaliyot:{tur:'tartib', sarlavha:'Noto‘liq ajratish va yig‘ish',
    shartAjrat:'Qismlarni <b>darslikdagi ajratish tartibida</b> bosing', shartYig:'Endi <b>yig‘ing</b>: ajratishga teskari tartibda',
    qismlar:[[1,'Magazin (keyin patronnik tekshiriladi)'],[2,'Shompol'],[3,'Stvol qutisi qopqog‘i'],[4,'Qaytaruvchi mexanizm'],[5,'Zatvor ramasi'],[6,'Zatvor'],[7,'Gaz trubkasi']],
    modelRaqam:{1:1, 2:2, 3:3, 4:4, 5:5, 6:0, 7:6}},
  test:[
    {s:'AK-74 o‘qining boshlang‘ich tezligi qancha?', v:['715 m/s','900 m/s','1000 m/s','625 m/s'], t:1, izoh:'<b>900 m/s</b> — AK-74 uchun; 715 m/s — AKM ga tegishli.'},
    {s:'Qaysi qism patronni patronnikka yuboradi va stvol kanalini berkitadi?', v:['Qaytaruvchi mexanizm','Gaz trubkasi','Zatvor','Penal'], t:2, izoh:'<b>Zatvor</b> patronni yuboradi, kanalni berkitadi va gilzani sug‘urib oladi.'},
    {s:'Noto‘liq ajratishda stvol qutisi qopqog‘idan keyin nima ajratiladi?', v:['Shompol','Qaytaruvchi mexanizm','Magazin','Gaz trubkasi'], t:1, izoh:'Tartib: qopqoq → <b>qaytaruvchi mexanizm</b> → zatvor ramasi.'},
    {s:'AK-74 ning nishonga olish uzoqligi qancha?', v:['440 m','625 m','1000 m','3150 m'], t:2, izoh:'<b>1000 m</b> — nishonga olish uzoqligi; 440 va 625 m — to‘g‘ri o‘q uzish masofalari.'},
    {s:'Qaysi harakat xavfsizlik qoidasiga zid?', v:['Qismlarni tartib bilan terish','Magazin ajratilmasdan zatvor ramasini tortish','Tepkini stvol yuqoriga qaragan holda bosish','Qismlardagi raqamlarni solishtirish'], t:1, izoh:'Avval <b>magazin ajratiladi</b>, keyin patronnik tekshiriladi — aks holda qo‘pol xato.'}
  ],
  xavfsizlik:XAVF_QUROL,
  yordamchi:[
    {s:'Patronnik nima?', j:'Stvolning orqa qismidagi patron joylashadigan bo‘shliq. Ajratishdan oldin unda patron yo‘qligi albatta tekshiriladi.', kalit:['patronnik','patrondon']},
    {s:'Kalibr nima?', j:'Stvol kanalining qarama-qarshi qirralari (maydonlari) orasidagi masofa. AK-74 da 5,45 mm, AKM da 7,62 mm.', kalit:['kalibr']},
    {s:'Normativ qancha?', j:'Rossiya maktab normativi bo‘yicha noto‘liq ajratish: a’lo 15, yaxshi 17, qoniqarli 19 soniya; yig‘ish: 25 / 27 / 32 soniya. O‘zbekiston rasmiy normativi topilmagan — o‘qituvchingizdan so‘rang.', kalit:['normativ','soniya','vaqt','necha']}
  ],
  manba:D10+', 134–146-betlar; «Руководство по 5,45-мм автоматам Калашникова» (2001); 3D modellar — CC0 (3dmodelscc0) va MAKON o‘quv modeli.',
  ishlanma:{
    sinf:'10-sinf', vaqt:'45 daqiqa', tur:'Aralash (yangi bilim + amaliy mashg‘ulot)', usul:'3D model, maket (MMG), guruhda ishlash',
    maqsad:{talimiy:'AK-74 ning vazifasi, asosiy texnik ko‘rsatkichlari, 12 asosiy qism va mexanizmini, noto‘liq qismlarga ajratish va yig‘ish tartibini o‘rgatish.',
      tarbiyaviy:'Qurolga ehtiyotkorlik, intizom, xavfsizlik qoidalariga rioya qilish, Vatan himoyasiga mas’uliyat tuyg‘usini tarbiyalash.',
      rivojlantiruvchi:'Ketma-ketlikni eslab qolish, qo‘l harakatlari aniqligi, jamoada ishlash ko‘nikmasini rivojlantirish.'},
    natijalar:['AK-74 ning kalibri (5,45 mm), o‘qdon sig‘imi (30), nishonga olish uzoqligi (1000 m), o‘q boshlang‘ich tezligi (900 m/s) ni aytadi','12 asosiy qismni nomlaydi va vazifasini bir jumlada tushuntiradi','Noto‘liq ajratish tartibini to‘g‘ri ketma-ketlikda bajaradi (maket va 3D sahnada)','Xavfsizlik qoidalarini (avval magazin, keyin patronnik) aytib beradi'],
    jihozlar:['MAKON 3D sahnasi «AK-74» (qismlarni ajratish)','Proyektor yoki interaktiv doska','AK-74 massa-gabarit maketi (MMG) — 2–3 dona, taglik','Sekundomer, qismlar nomi yozilgan kartochkalar','10-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Salomlashadi, davomatni tekshiradi, xavfsizlik bo‘yicha qisqa yo‘riqnoma beradi (maketni odamga qaratmaslik).','Tinglaydi.'],
      ['3–8','<b>Takrorlash, motivatsiya.</b> «Qurol bilan ishlashda nima taqiqlanadi?»; M. T. Kalashnikov haqida qisqa hikoya.','Javob beradi.'],
      ['8–18','<b>Vazifa va ko‘rsatkichlar.</b> MAKON 3D da avtomatni aylantirib ko‘rsatadi; ko‘rsatkichlar jadvalini tushuntiradi; AKM bilan farqni aytadi.','Jadvalni daftarga yozadi.'],
      ['18–26','<b>Asosiy qismlar.</b> 3D sahnada «Qismlarga ajratish» rejimida har bir qism nomi va vazifasini aytadi.','Kartochkalarni qismlar bilan moslashtiradi.'],
      ['26–38','<b>Amaliy mashg‘ulot.</b> Maketda ajratish va yig‘ishni sekin ko‘rsatadi, guruhlarga beradi, xatolarni tuzatadi.','3–4 kishilik guruhda navbat bilan ajratib-yig‘adi; MAKON da «Sinab ko‘r» mashqini bajaradi.'],
      ['38–43','<b>Mustahkamlash va baholash.</b> Nazorat savollari va MAKON testi; 2 o‘quvchi vaqtini o‘lchaydi.','Test yechadi, bir-birini baholaydi.'],
      ['43–45','<b>Uyga vazifa, yakun.</b>','Yozib oladi.']],
    lugat:[['Kalibr','Stvol kanalining qarama-qarshi qirralari orasidagi masofa; AK-74 da 5,45 mm.'],['Patronnik','Stvolning orqa qismidagi patron joylashadigan bo‘shliq.'],['Zatvor ramasi','Gaz porsheni bilan birga zatvor va zarbdor-tepki mexanizmini harakatga keltiruvchi qism.'],['Qaytaruvchi mexanizm','Zatvor ramasini oldingi holatga qaytaradi.'],['Og‘iz tormozi-kompensator','Qaytish kuchini kamaytirib, aniqlikni oshiradi.'],['Noto‘liq qismlarga ajratish','Tozalash, moylash va ko‘zdan kechirish uchun asosiy qismlarni ajratish.']],
    savollar:[['AK-74 ning kalibri qancha?','5,45 mm'],['O‘qdon sig‘imi nechta patron?','30 ta'],['Noto‘liq ajratish nimadan boshlanadi va darhol nima tekshiriladi?','Magazin ajratiladi, so‘ng patronnik tekshiriladi'],['Qaytaruvchi mexanizmning vazifasi nima?','Zatvor ramasini zatvor bilan oldingi holatga qaytarish'],['Yig‘ish qaysi qismdan boshlanadi?','Gaz trubkasini biriktirishdan (teskari tartib)']],
    uy:'Darslikning 134–146-betlarini o‘qish; 12 asosiy qism va vazifasini jadval qilib yozish; MAKON da «ajratish tartibi» mashqini 3 marta bajarib, eng yaxshi natijani yozib kelish.',
    manba:D10+'; Rossiya normativlari faqat mo‘ljal sifatida.'
  }
},

/* ============ 2. GRANATALAR ============ */
'harbiy-granata': {
  fan:'harbiy', qisqaNom:'Granatalar', nom:'Qo‘l granatalari RGD-5 va F-1',
  qisqa:'10-sinf · faqat tanishuv va xavfsizlik darajasida',
  sahna:'glb', zaxira:null,
  model:{fayl:'granata_qol', yorliq:'Qo‘l granatasi (F-1 tipiga o‘xshash) · CC0 model · o‘quv maqsadida', sozlama:{ry:.6, rx:-.15, avto:true, zoom:1.2}},
  rejimlar:['butun','rentgen','ajrat'],
  qismlar:[
    {raqam:1, nom:'Korpus', vazifa:'Portlovchi zaryad va zapal trubkasini joylaydi; portlaganda parchalar hosil qiladi. F-1 da — qirrali cho‘yan, RGD-5 da — yupqa po‘lat.', tugun:['Grenade'], d:[0,-.8,0]},
    {raqam:2, nom:'Zapal (UZRGM) va sug‘urta halqasi', vazifa:'Zarbdor mexanizm va zapaldan iborat; sekinlashtiruvchi modda tufayli 3,2–4,2 s dan keyin ishlaydi. Zapal granatadan alohida saqlanadi.', tugun:['Pin'], d:[0,1.6,.6]},
    {raqam:3, nom:'Portlovchi zaryad', vazifa:'Korpusni parchalash uchun (modelda ko‘rsatilmaydi — faqat nomi va vazifasi).', tugun:[], d:[0,0,0]}
  ],
  kor:{
    sarlavha:'Hujum va mudofaa granatasi',
    matn:'Parchalanuvchi qo‘l granatasi dushman tirik kuchini parchalar bilan safdan chiqarish uchun qo‘lda uloqtiriladi. O‘zbekiston Qurolli Kuchlarida hujumda RGD-5, mudofaada F-1 qo‘llaniladi. Darsda faqat inert o‘quv maketi va 3D model ishlatiladi.',
    punktlar:['<b>RGD-5</b> — hujum granatasi, 310 g, parchalar radiusi 25 m','<b>F-1</b> — mudofaa granatasi, 600 g, parchalar 200 m gacha — faqat pana joydan','Zapal <b>UZRGM</b>, sekinlashish vaqti 3,2–4,2 s','Uch asosiy qism: korpus, portlovchi zaryad, zapal']
  },
  bolimlar:[
    {sarlavha:'Taqqoslash', jadval:[['Turi','RGD-5 — hujum · F-1 — mudofaa'],['Og‘irligi','310 g · 600 g'],['Parchalar yetib borish radiusi','25 m · 200 m'],['O‘rtacha uloqtirish masofasi','40–50 m · 35–45 m'],['Zapal','UZRGM · UZRGM'],['Sekinlashish vaqti','3,2–4,2 s'],['Korpus','yupqa po‘lat · qirrali cho‘yan']],
     matn:'F-1 radiusi bo‘yicha manbalar farq qiladi: darslikda 200 m (parchalar yetib borishi mumkin bo‘lgan masofa), boshqa manbada samarali zararlash radiusi 50 m gacha deyiladi.'},
    {sarlavha:'Topilgan portlamagan buyum', tartibli:true, punktlar:['<b>Tegmang</b>, ko‘tarmang, olovga tashlamang','Joyni tark eting va boshqalarni yaqinlashtirmang','Kattalarga va tegishli xizmatga xabar bering']}
  ],
  bosqichlar:[
    {sarlavha:'Tashqi ko‘rinish', matn:'Korpus shakli granata turini bildiradi: RGD-5 — silliq oval, F-1 — qirrali.', ajrat:[]},
    {sarlavha:'Zapal va korpus', matn:'Zapal (UZRGM) korpusga alohida kiritiladi — shuning uchun ular alohida saqlanadi.', ajrat:[2], qism:2},
    {sarlavha:'Rentgen: ichki tuzilish', matn:'Korpus ichida portlovchi zaryad va zapal trubkasi joylashadi (faqat nomlari va vazifasi).', ajrat:[], rentgen:true},
    {sarlavha:'Xavfsizlik', matn:'Portlamagan granataga tegish qat’iyan man etiladi. Darsda faqat inert maket.', ajrat:[], rentgen:false}
  ],
  amaliyot:{tur:'tartib', sarlavha:'To‘g‘ri harakatlar ketma-ketligi',
    shartAjrat:'Vaziyat: <b>dalada notanish metall buyum topdingiz</b>. To‘g‘ri tartibda bosing', takror:'ayni', shartYig:'Yana bir marta — endi <b>xotiradan, xuddi shu tartibda</b> takrorlang (mustahkamlash)',
    qismlar:[[1,'To‘xtash, buyumga tegmaslik'],[2,'Boshqalarni yaqinlashtirmaslik'],[3,'Joyni belgilab, xavfsiz masofaga ketish'],[4,'Kattalar yoki tegishli xizmatga xabar berish']]},
  test:[
    {s:'RGD-5 halok qiluvchi parchalarining yetib borish radiusi qancha?', v:['7 m','25 m','50 m','200 m'], t:1, izoh:'Darslik jadvalida RGD-5 uchun <b>25 m</b>.'},
    {s:'Qaysi granata mudofaa granatasi?', v:['RGD-5','F-1','RPG-7','GP-25'], t:1, izoh:'<b>F-1</b> mudofaa janglarida qo‘llaniladi va faqat pana joydan uloqtiriladi.'},
    {s:'RGD-5 va F-1 da qaysi zapal ishlatiladi?', v:['RGM','UZRGM','MD-5','V-429'], t:1, izoh:'Ikkala granata uchun <b>UZRGM</b>.'},
    {s:'Zapalning sekinlashish vaqti qancha?', v:['1–2 s','3,2–4,2 s','6–8 s','10 s'], t:1, izoh:'Ikkala granata uchun <b>3,2–4,2 s</b>.'},
    {s:'Granatalarni saqlash qoidasiga qaysi javob mos?', v:['Zapal granataga burab saqlanadi','Olov yonida quritiladi','Zapallar granatadan alohida, o‘ralgan holda saqlanadi','Kiyim cho‘ntagida olib yuriladi'], t:2, izoh:'Zapallar <b>alohida, qog‘ozga o‘ralgan</b> holda saqlanadi.'}
  ],
  xavfsizlik:['Darsda faqat inert o‘quv maketlari va 3D model ishlatiladi.','Maketni ochish, ichiga biror narsa solish yoki «jangovar» ko‘rinishga keltirish taqiqlanadi.','Uloqtirilgan, lekin portlamagan granataga tegish <b>qat’iyan man etiladi</b>.','Hayotda notanish, eski yoki harbiy ko‘rinishdagi buyumga tegmang — joyni tark eting va xabar bering.'],
  manba:D10+', 147–152-betlar; ruscha Wikipedia (RGD-5, F-1, UZRGM) — solishtirish uchun.',
  ishlanma:{
    sinf:'10-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model, vaziyatli o‘yin',
    maqsad:{talimiy:'Parchalanuvchi qo‘l granatalarining vazifasi, hujum va mudofaa granatalarining farqi, RGD-5 va F-1 ning jangovar xususiyatlari va umumiy tuzilishi (nomlar darajasida) bilan tanishtirish.',
      tarbiyaviy:'Portlovchi buyumlarga nisbatan ehtiyotkorlik, «topdim — tegmayman — xabar beraman» madaniyatini shakllantirish.',
      rivojlantiruvchi:'Taqqoslash, jadval bilan ishlash, xavfli vaziyatda to‘g‘ri qaror qabul qilish ko‘nikmasi.'},
    natijalar:['RGD-5 (hujum) va F-1 (mudofaa) farqini tushuntiradi','Og‘irliklari, parchalar radiusi va sekinlashish vaqtini aytadi','Granataning 3 asosiy qismini nomlaydi','Portlamagan o‘q-dori topilganda nima qilishni biladi'],
    jihozlar:['MAKON 3D sahnasi «Qo‘l granatalari»','Proyektor','O‘quv-imitatsion (inert) granata maketlari','Taqqoslash jadvali plakati','10-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Maketlar inert ekanini ko‘rsatib, ular bilan ham ehtiyotkorlik qoidasini aytadi.','Tinglaydi.'],
      ['3–7','<b>Takrorlash.</b> AK-74 bo‘yicha 3 ta tezkor savol.','Javob beradi.'],
      ['7–17','<b>Vazifa va turlari.</b> Hujum va mudofaa granatasi farqi.','Daftarga yozadi.'],
      ['17–27','<b>Jangovar xususiyatlar.</b> Radiuslarni taqqoslaydi; jadvalni to‘ldirtiradi.','Jadvalni to‘ldiradi.'],
      ['27–33','<b>Umumiy tuzilishi.</b> 3D «Rentgen» rejimida korpus, zaryad, zapal (faqat nomi va vazifasi).','Qismlarni nomlaydi.'],
      ['33–39','<b>Xavfsizlik amaliyoti.</b> Vaziyatli o‘yin: «Dalada notanish metall buyum topdingiz».','Guruhda javob tayyorlaydi; MAKON «Sinab ko‘r» mashqini bajaradi.'],
      ['39–45','<b>Mustahkamlash, test, uyga vazifa.</b>','Test yechadi.']],
    lugat:[['Hujum granatasi','Parchalar radiusi kichik (RGD-5 — 25 m), harakat paytida ishlatiladi.'],['Mudofaa granatasi','Parchalar uzoqqa uchadi (F-1 — 200 m gacha), faqat pana joydan uloqtiriladi.'],['UZRGM','Qo‘l granatasining unifikatsiyalashgan modernizatsiyalangan zapali.'],['Sekinlashish vaqti','Zapal ishga tushgandan portlashgacha bo‘lgan vaqt (3,2–4,2 s).']],
    savollar:[['RGD-5 qaysi turdagi granata?','Hujum parchalanuvchi granatasi'],['F-1 ning og‘irligi qancha?','600 g'],['Nima uchun F-1 faqat pana joydan uloqtiriladi?','Parchalari 200 m gacha yetishi mumkin — uloqtirish masofasidan ancha katta'],['Granata qanday uch qismdan iborat?','Korpus, portlovchi zaryad, zapal'],['Portlamagan granata bilan nima qilinadi?','Tegilmaydi; joy tark etiladi va xabar beriladi']],
    uy:'Darslikning 147–152-betlari; RGD-5 va F-1 taqqoslash jadvalini chizish; «Portlamagan o‘q-dori topsam…» mavzusida 5 qatorli eslatma yozish.',
    manba:D10
  }
},

/* ============ 3. HARBIY TEXNIKA ============ */
'harbiy-texnika': {
  fan:'harbiy', qisqaNom:'Texnika', nom:'Harbiy texnika: T-72, BTR-80, BMP-2, Mi-8',
  qisqa:'10-sinf · II bo‘lim «Harbiy ish asoslari»',
  sahna:'glb', zaxira:null,
  model:{fayl:'tank_qismli', yorliq:'Tank · umumiy CC0 model (Quaternius), T-72 nusxasi emas', sozlama:{ry:.8, rx:.3, avto:true, zoom:1.35}},
  qismlar:[
    {raqam:1, nom:'Zirhli korpus', vazifa:'Ekipaj, dvigatel va o‘q-dorini himoya qiladi. T-72 da: oldinda boshqaruv, o‘rtada jangovar, orqada motor-transmissiya bo‘limi.', tugun:['Tank_body'], d:[0,0,0]},
    {raqam:2, nom:'Minora', vazifa:'Qurol o‘rnatilgan, aylanadigan zirhli qism.', tugun:['Tank_Turret'], d:[0,1.3,0]},
    {raqam:3, nom:'To‘p', vazifa:'T-72 da 125 mm silliq stvolli to‘p (2A46).', tugun:['Tank_Gun'], d:[0,2.2,.3]},
    {raqam:4, nom:'Yurish qismi (zanjir)', vazifa:'Zanjir, tayanch g‘ildiraklar, osma — og‘ir joyda harakatlanish.', tugun:['/^TrackMesh/'], d:[0,-.9,0]}
  ],
  modellar:[
    {nom:'Tank', fayl:'tank_qismli', yorliq:'Tank · umumiy CC0 model (Quaternius), T-72 nusxasi emas', qismlar:'asosiy'},
    {nom:'Zirhli transportyor', fayl:'btr', yorliq:'G‘ildirakli zirhli transportyor · CC BY-SA 3.0, pflat (OpenGameArt) · BTR-80 nusxasi emas',
     qismlar:[{raqam:1, nom:'Zirhli korpus', tugun:['body'], d:[0,0,0]},{raqam:2, nom:'G‘ildiraklar', tugun:['/^wheel_/'], d:[0,-1.1,0]},{raqam:3, nom:'Lyuklar', tugun:['/^hatch_/'], d:[0,1.2,0]},{raqam:4, nom:'Qo‘shimcha jihozlar', tugun:['addons'], d:[0,1.8,0]}]},
    {nom:'Vertolyot', fayl:'vertolyot', yorliq:'Harbiy vertolyot · CC BY 3.0, Zsky (Poly Pizza) · Mi-8 nusxasi emas'},
    {nom:'Yuk mashinasi', fayl:'yuk_mashina_m939', yorliq:'Harbiy yuk mashinasi · CC BY 3.0, J-Toastie (Poly Pizza)',
     qismlar:[{raqam:1, nom:'Kabina va kuzov', tugun:['Main'], d:[0,0,0]},{raqam:2, nom:'G‘ildiraklar', tugun:['/_wheel$/'], d:[0,-1.1,0]}]}
  ],
  rejimlar:['butun','rentgen','ajrat'],
  kor:{
    sarlavha:'Zirhli texnika va vertolyot',
    matn:'Tank, bronetransportyor (BTR) va piyodaning jangovar mashinasi (BMP) — zirhli texnikaning uch asosiy turi. Ularni yurish qismi (zanjir yoki g‘ildirak), vazifasi va desant tashish imkoniyati ajratib turadi. «Boshqaruv»dagi tugmalar bilan mashinani almashtiring. <b>Diqqat:</b> 3D modellar umumiy bepul modellar — aniq T-72, BTR-80 yoki Mi-8 nusxasi emas; texnik raqamlar esa darslikdan.',
    punktlar:['<b>T-72</b> — zanjirli tank, ekipaj 3, 125 mm to‘p','<b>BTR-80</b> — g‘ildirakli (8×8), suzuvchi, 14,5 mm KPVT','<b>BMP-2</b> — zanjirli, suzuvchi, 30 mm to‘p, desant 7','<b>Mi-8</b> — transport-desant vertolyoti, 250 km/soat']
  },
  bolimlar:[
    {sarlavha:'T-72 tanki', jadval:[['Ekipaj','3 kishi'],['Massa','44 t (darslik; modifikatsiyaga bog‘liq)'],['Dvigatel','840 o.k.'],['Shossedagi tezlik','60 km/soat'],['Yurish zaxirasi','700 km'],['Qurollanishi','125 mm to‘p, 7,62 mm PKT, 12,7 mm NSVT']],
     matn:'Kompanovka: oldinda boshqaruv bo‘limi, o‘rtada jangovar bo‘lim (minora), orqada motor-transmissiya bo‘limi.'},
    {sarlavha:'BTR-80', jadval:[['Ekipaj / desant','3 / 8 kishi (boshqa manbada 7)'],['Jangovar massa','13,6 t'],['Tezlik: shosse / suvda','90 / 9,5 km/soat'],['Yurish zaxirasi','600 km'],['G‘ildirak formulasi','8×8'],['Qurollanishi','14,5 mm KPVT, 7,62 mm PKT']]},
    {sarlavha:'BMP-2', jadval:[['Ekipaj / desant','3 / 7 kishi'],['Jangovar massa','14 t'],['Tezlik: quruqlik / suv','65 / 6–7 km/soat'],['Yurish zaxirasi','550 km'],['Qurollanishi','30 mm 2A42 to‘p, 7,62 mm PKT, PTUR']]},
    {sarlavha:'Mi-8 (Mi-17) vertolyoti', jadval:[['Ekipaj','3 (komandir, 2-uchuvchi, bort texnigi)'],['Desant','24 kishi yoki 12 zambil'],['Eng yuqori tezlik','250 km/soat'],['Asosiy vint','5 parrakli, diametri 21,29 m']],
     matn:'Mi-8 10-sinf darsligida alohida keltirilmagan — ma’lumot qo‘shimcha manbadan (Wikipedia).'}
  ],
  bosqichlar:[
    {sarlavha:'Umumiy ko‘rinish', matn:'Yurish qismiga qarang: zanjir yoki g‘ildirak — bu mashina turini birinchi bo‘lib aytib beradi.', ajratHammasi:0},
    {sarlavha:'Qismlarga ajratish', matn:'Korpus, minora, yurish qismi alohida ko‘rinadi. Qism nomlari model tuzilishiga qarab chiqadi.', ajratHammasi:1},
    {sarlavha:'Rentgen', matn:'Korpus ichidagi bo‘limlar: boshqaruv, jangovar, motor-transmissiya (va BMP/BTR da desant).', ajratHammasi:0, rentgen:true}
  ],
  amaliyot:{tur:'tartib', sarlavha:'T-72 kompanovkasi',
    shartAjrat:'T-72 bo‘limlarini <b>oldindan orqaga</b> tartibda bosing', shartYig:'Endi <b>orqadan oldinga</b> tartibda bosing',
    qismlar:[[1,'Boshqaruv bo‘limi (oldinda)'],[2,'Jangovar bo‘lim (minora, o‘rtada)'],[3,'Motor-transmissiya bo‘limi (orqada)']]},
  test:[
    {s:'Qaysi texnika g‘ildirakli?', v:['T-72','BMP-2','BTR-80','T-62'], t:2, izoh:'<b>BTR-80</b> — 8×8 g‘ildirakli bronetransportyor.'},
    {s:'BMP-2 ning asosiy quroli?', v:['125 mm to‘p','14,5 mm pulemyot','30 mm avtomatik to‘p','73 mm to‘p'], t:2, izoh:'BMP-2 — <b>30 mm 2A42</b> to‘p; 73 mm to‘p BMP-1 da.'},
    {s:'BTR-80 ning jangovar massasi?', v:['41 t','13,6 t','14,7 t','12 t'], t:1, izoh:'<b>13 600 kg</b>.'},
    {s:'T-72 da motor-transmissiya bo‘limi qayerda?', v:['Oldinda','O‘rtada','Orqada','Minorada'], t:2, izoh:'Klassik kompanovka: oldinda boshqaruv, o‘rtada jangovar, <b>orqada</b> motor-transmissiya.'},
    {s:'Mi-8 ekipaji tarkibiga kim kirmaydi?', v:['Komandir','Ikkinchi uchuvchi','Bort texnigi','Mexanik-haydovchi'], t:3, izoh:'Mi-8 ekipaji — komandir, ikkinchi uchuvchi, bort texnigi. <b>Mexanik-haydovchi</b> — zirhli mashinada.'}
  ],
  xavfsizlik:['Texnika ko‘rgazmasida faqat rahbar ruxsati bilan yaqinlashing va chiqing.','Harakatlanayotgan texnika oldida va orqasida turmang.','Minora, lyuk va mexanizmlarni o‘zingiz harakatga keltirmang.'],
  yordamchi:[
    {s:'Tank bilan BTR farqi nima?', j:'Tank (T-72) — zanjirli, kuchli qurollangan va qalin zirhli jangovar mashina. BTR (BTR-80) — g‘ildirakli (8×8), suzuvchi, asosan motoo‘qchilarni tashish uchun. BMP (BMP-2) esa zanjirli, desant bilan birga jang qiladi.', kalit:['farq','farqi','tank','btr','bmp']},
    {s:'Desant nima?', j:'Desant — mashinada tashiladigan askarlar. Ekipaj esa mashinani boshqaradi va undan jang olib boradi. BTR-80 da desant 8 (boshqa manbada 7), BMP-2 da 7 kishi.', kalit:['desant','ekipaj']}
  ],
  manba:D10+', 84–93-betlar; Mi-8 — Wikipedia; O‘zbekiston QK dagi texnika soni rasmiy tasdiqlanmagani uchun keltirilmadi. 3D modellar — umumiy CC0 modellar, aniq modifikatsiya emas.',
  ishlanma:{
    sinf:'10-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (vizual-interaktiv)', usul:'3D modellar, taqqoslash jadvali',
    maqsad:{talimiy:'Zirhli texnika turlari (tank, BTR, BMP) va transport vertolyoti vazifasi, ekipaji, asosiy ko‘rsatkichlari va qismlari bilan tanishtirish.',
      tarbiyaviy:'Qurolli Kuchlarimiz qudratiga faxr, harbiy kasblarga qiziqish uyg‘otish.',
      rivojlantiruvchi:'Taqqoslash, tasniflash, jadval va 3D model bilan mustaqil ishlash.'},
    natijalar:['Tank, BTR va BMP farqini (zanjir/g‘ildirak, vazifa, desant) tushuntiradi','T-72, BTR-80, BMP-2 ning asosiy ko‘rsatkichlarini aytadi','Zirhli mashinaning asosiy bo‘limlarini nomlaydi'],
    jihozlar:['MAKON 3D sahnalari (tank, BTR, BMP, vertolyot)','Proyektor','Taqqoslash jadvali tarqatma materiali','10-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–7','<b>Motivatsiya.</b> «Tank va BTR ning farqi nima?» — aqliy hujum.','Fikr bildiradi.'],
      ['7–17','<b>T-72.</b> 3D modelda korpus, minora, yurish qismi; ekipaj 3, 125 mm to‘p.','Jadvalni to‘ldiradi.'],
      ['17–25','<b>BTR-80.</b> G‘ildirakli (8×8), suzuvchi; 13,6 t, KPVT 14,5 mm.','Jadvalni to‘ldiradi.'],
      ['25–32','<b>BMP-2.</b> Zanjirli, suzuvchi; 30 mm to‘p, desant 7; BTR bilan taqqoslaydi.','Farqlarni aytadi.'],
      ['32–37','<b>Mi-8.</b> Transport-desant vertolyoti: asosiy va rul vinti.','3D modelda qismlarni topadi.'],
      ['37–45','<b>Mustahkamlash, test, uyga vazifa.</b>','O‘yin, test.']],
    lugat:[['Tank','Kuchli qurol, qalin zirh va yuqori manyovrchanlikka ega zanjirli jangovar mashina.'],['BTR','Motoo‘qchilarni tashish uchun g‘ildirakli zirhli suzuvchi mashina.'],['BMP','Desant bilan birga jang qiladigan zanjirli zirhli mashina.'],['Minora','Qurol o‘rnatilgan, aylanadigan zirhli qism.'],['Motor-transmissiya bo‘limi','Dvigatel va uzatmalar joylashgan bo‘lim.'],['PTUR','Tankka qarshi boshqariluvchi raketa.']],
    savollar:[['T-72 ekipaji necha kishi?','3 kishi'],['T-72 to‘pining kalibri?','125 mm'],['BTR-80 asosiy quroli?','14,5 mm KPVT'],['BMP-2 necha kishilik desant tashiydi?','7 kishi'],['Mi-8 eng yuqori tezligi?','250 km/soat']],
    uy:'Darslikning 84–93-betlari; 4 ta texnika bo‘yicha taqqoslash jadvali (vazifa, ekipaj, massa, tezlik, quroli).',
    manba:D10+'; Mi-8 — Wikipedia.'
  }
},

/* ============ 4. PROTIVOGAZ ============ */
'harbiy-protivogaz': {
  fan:'harbiy', qisqaNom:'Protivogaz', nom:'Gazdan himoyalanish niqobi GP-5',
  qisqa:'11-sinf · 1-bo‘lim «Fuqaro muhofazasi»',
  sahna:'glb', zaxira:null,
  model:{fayl:'protivogaz', yorliq:'Gazniqob GP-5 · CC0 model (stratofortress, OpenGameArt)', sozlama:{ry:.5, rx:-.1, avto:true, zoom:1.1}},
  rejimlar:['butun','rentgen'],
  kor:{
    sarlavha:'Nafas yo‘llarini himoya qilish',
    matn:'Barcha gazniqoblar filtrlovchi va izolatsiyalovchi turlarga bo‘linadi. GP-5 — filtrlovchi gazniqob: havo filtrlovchi-yutuvchi qutidan o‘tib tozalanadi. «Gazlar!» komandasida u «Jangovar» holatga keltiriladi.',
    punktlar:['Asosiy qismlar: <b>shlem-maska</b>, <b>filtrlovchi-yutuvchi quti</b>, <b>klapan qutisi</b>, sumka','O‘lcham bosh o‘lchovlari yig‘indisi bo‘yicha: 0–4','Holatlar: «Dala» → «Tayyor» → «Jangovar»','<b>Is gazi (CO) dan himoya qilmaydi</b>']
  },
  bolimlar:[
    {sarlavha:'Kiyish tartibi («Gazlar!»)', tartibli:true, punktlar:['Nafas olishni to‘xtatish va ko‘zlarni yumish','Bosh kiyimni olib, tizzalar orasiga qisish','Sumkadan niqobni olish, pastki qalin qismidan ikki qo‘l bilan ushlash','Niqobni iyakdan boshlab yuzga va bosh ustiga tortib kiyish','Keskin to‘liq nafas chiqarish, ko‘zni ochish, nafasni tiklash','Bosh kiyimni kiyish']},
    {sarlavha:'O‘lcham tanlash', jadval:[['92 sm dan kam','0-o‘lcham'],['92–95,5 sm','1-o‘lcham'],['96–98,5 sm','2-o‘lcham'],['99–102,5 sm','3-o‘lcham'],['103 sm va undan ortiq','4-o‘lcham']],
     matn:'Bosh ikki marta o‘lchanadi (iyak osti–tepa va peshona–ensa bo‘ylab) va natijalar qo‘shiladi.'},
    {sarlavha:'Normativ (mo‘ljal)', jadval:[['Gazniqob kiyish','a’lo 7 · yaxshi 8 · qoniqarli 10 s']],
     matn:'<span style="color:var(--sariq)">Diqqat:</span> Rossiya IIV normativi. O‘zbekiston uchun rasmiy normativ topilmadi.'}
  ],
  qismlar:[
    {raqam:1, nom:'Shlem-maska', vazifa:'Yuz, ko‘z va boshni qoplaydigan rezina qism.', tugun:[], d:[0,0,0]},
    {raqam:2, nom:'Filtrlovchi-yutuvchi quti', vazifa:'Zaharli moddalar, radioaktiv chang va aerozollarni ushlab qoladi.', tugun:[], d:[0,-1.6,0]},
    {raqam:3, nom:'Klapan qutisi', vazifa:'Nafas olish va chiqarish klapanlari joylashgan qism.', tugun:[], d:[0,-.6,1.2]},
    {raqam:4, nom:'Sumka', vazifa:'Gazniqobni «Dala» holatida olib yurish uchun.', tugun:[], d:[1.6,0,0]}
  ],
  bosqichlar:[
    {sarlavha:'Shlem-maska', matn:'Yuz, ko‘z va boshni qoplaydigan rezina qism; ko‘z oynaklari orqali ko‘rish maydoni.'},
    {sarlavha:'Klapan qutisi va filtr', matn:'Nafas olish va chiqarish klapanlari; havo filtrlovchi-yutuvchi qutidan o‘tib tozalanadi.'},
    {sarlavha:'Rentgen', matn:'Rentgen rejimida niqob shakli va ichki yuzasi ko‘rinadi.', rentgen:true},
    {sarlavha:'Kiyish', matn:'Nafasni to‘xtatish → niqobni iyakdan boshlab kiyish → keskin nafas chiqarish.', rentgen:false}
  ],
  amaliyot:{tur:'tartib', sarlavha:'«Gazlar!» komandasi',
    shartAjrat:'Gazniqobni <b>kiyish tartibini</b> to‘g‘ri ketma-ketlikda bosing', takror:'ayni', shartYig:'Endi <b>xotiradan, xuddi shu tartibda</b> takrorlang (mustahkamlash)',
    qismlar:[[1,'Nafasni to‘xtatish, ko‘zni yumish'],[2,'Bosh kiyimni olib, tizzalar orasiga qisish'],[3,'Niqobni sumkadan olish'],[4,'Niqobni iyakdan boshlab kiyish'],[5,'Keskin nafas chiqarish, ko‘zni ochish'],[6,'Bosh kiyimni kiyish']]},
  test:[
    {s:'GP-5 ning qaysi qismi havoni zaharli moddalardan tozalaydi?', v:['Obturator','Filtrlovchi-yutuvchi quti','Gaplashish moslamasi','Sumka'], t:1, izoh:'Havoni <b>filtrlovchi-yutuvchi quti</b> tozalaydi.'},
    {s:'Kiyishdan oldin eng birinchi qilinadigan harakat?', v:['Bosh kiyimni kiyish','Nafasni to‘xtatib, ko‘zni yumish','Klapanga puflash','Tasmani bo‘shatish'], t:1, izoh:'Aks holda zaharli havo nafas yo‘llari va ko‘zga tushadi.'},
    {s:'Bosh o‘lchovlari yig‘indisi 100 sm. Qaysi o‘lcham?', v:['1','2','3','4'], t:2, izoh:'99–102,5 sm — <b>3-o‘lcham</b>.'},
    {s:'Gazniqobni qachon yechish mumkin?', v:['Hid sezilmay qolganda','Charchaganda','«Gazdan himoyalanish niqoblari yechilsin!» komandasidan so‘ng','5 daqiqadan keyin'], t:2, izoh:'Faqat <b>komanda berilgandan keyin</b> yechiladi.'},
    {s:'Gazniqob qaysi gazdan himoya qilmaydi?', v:['Xlor','Zarin bug‘lari','Is gazi (CO)','Radioaktiv chang'], t:2, izoh:'Filtrlovchi gazniqob qo‘shimcha patronsiz (DPG-3) <b>is gazi (CO)</b> va ammiakdan himoya qilmaydi.'}
  ],
  xavfsizlik:['Mashg‘ulotda faqat soz, tozalangan o‘quv gazniqoblari; har o‘quvchidan keyin dezinfeksiya.','Astma, nafas yoki yurak muammosi bor o‘quvchi vaqtga normativ topshirmaydi.','Bosh aylansa yoki nafas qisilsa — gazniqob darhol yechiladi.','Gazniqob <b>is gazi (CO)</b> dan himoya qilmaydi.'],
  manba:D11+', 39–42-betlar; normativ — Rossiya IIV 511-son buyrug‘i (mo‘ljal); GP-7 va CO haqida — ruscha Wikipedia.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Aralash (nazariya + normativ bajarish)', usul:'3D model, o‘quv gazniqoblari, juftlikda ishlash',
    maqsad:{talimiy:'Nafas olish a’zolarini himoya qilish vositalari, GP-5 qismlari, o‘lcham tanlash, holatlari, kiyish va yechish tartibini o‘rgatish.',
      tarbiyaviy:'Favqulodda vaziyatlarda o‘zini va boshqalarni himoya qilishga mas’uliyat, xotirjamlik va intizom.',
      rivojlantiruvchi:'Tezkorlik, harakatlar aniqligi, komandaga tez javob berish.'},
    natijalar:['Filtrlovchi va izolatsiyalovchi gazniqob farqini aytadi','GP-5 ning asosiy qismlarini nomlaydi','Bosh o‘lchami bo‘yicha shlem-maska o‘lchamini aniqlaydi','«Gazlar!» komandasida gazniqobni to‘g‘ri tartibda kiyadi'],
    jihozlar:['MAKON 3D sahnasi «Protivogaz»','Proyektor','O‘quv GP-5 gazniqoblari (har 2 o‘quvchiga 1 ta)','Santimetr lenta, sekundomer, dezinfeksiya salfetkalari','11-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Sog‘liq bo‘yicha so‘rov (astma, nafas qisishi bor o‘quvchilar kuzatuvchi bo‘ladi).','Tinglaydi.'],
      ['3–7','<b>Motivatsiya.</b> Kimyoviy avariya haqida qisqa vaziyat.','Javob beradi.'],
      ['7–15','<b>Himoya vositalari.</b> Filtrlovchi va izolatsiyalovchi gazniqob, respirator, paxta-doka bog‘ich.','Yozib oladi.'],
      ['15–22','<b>GP-5 tuzilishi.</b> 3D modelda qismlarni ko‘rsatadi, keyin haqiqiy o‘quv gazniqobida.','Juftlikda qismlarni topadi.'],
      ['22–27','<b>O‘lcham tanlash.</b> Bosh o‘lchash usuli.','Bir-birini o‘lchaydi.'],
      ['27–38','<b>Amaliy: kiyish va yechish.</b> Avval MAKON «Sinab ko‘r» mashqi, keyin «Gazlar!» komandasi va vaqt.','Avval sekin, keyin vaqtga bajaradi.'],
      ['38–45','<b>Mustahkamlash, test, uyga vazifa.</b>','Test yechadi.']],
    lugat:[['Filtrlovchi gazniqob','Atrof havosini filtrlovchi-yutuvchi qutidan o‘tkazib tozalaydi.'],['Izolatsiyalovchi gazniqob','Tashqi havodan butunlay ajratadi, o‘z nafas manbaiga ega.'],['Shlem-maska','Yuz, ko‘z va boshni qoplaydigan rezina qism.'],['Klapan qutisi','Nafas olish va chiqarish klapanlari joylashgan qism.']],
    savollar:[['Gazniqoblar qanday turlarga bo‘linadi?','Filtrlovchi va izolatsiyalovchi'],['Bosh o‘lchovlari yig‘indisi 94 sm bo‘lsa, qaysi o‘lcham?','1-o‘lcham'],['Qaysi komandada gazniqob «Jangovar» holatga keltiriladi?','«Gazlar!»'],['Kiyib bo‘lgach birinchi nima qilinadi?','Keskin to‘liq nafas chiqariladi']],
    uy:'Darslikning 39–42-betlari; GP-5 qismlari sxemasini chizish; «Kimyoviy xavf signali eshitilsa» 5 qadamli eslatma tuzish.',
    manba:D11
  }
}
});
})();

/* namuna sinf uchun harbiy darslar natijasi (NAMUNA — haqiqiy o'quvchilar emas) */
(function(){
  const b = [[5,4,null,5],[3,5,4,null],[4,null,5,4],[2,3,3,null],[null,4,4,5],[5,5,null,3],[4,3,4,4],[3,null,2,4]];
  window.MAKON_NAMUNA.oquvchilar.forEach((o, i)=>{
    delete o[1]['harbiy-ajratish'];
    ['harbiy-ak74','harbiy-granata','harbiy-texnika','harbiy-protivogaz'].forEach((id, j)=>o[1][id] = b[i][j]);
  });
})();
