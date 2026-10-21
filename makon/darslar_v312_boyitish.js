/* v3.12: eski 3 darsni boyitish (kimyo-molekula, fizika-om, bio-azolar) — bosqichlar, +3 test, ishlanma, qiziqarli, jadval.
   darslar.js va darslar_boyitish.js dan KEYIN yuklanadi. Manbalar: manba/tekshiruv/v312_boyitish.md */
(function(){
const D = window.MAKON_DARS;
if(!D) return;
function qosh(id, o){ const d = D[id]; if(!d) return; if(o.bosqichlar) d.bosqichlar = o.bosqichlar; if(o.test) d.test = d.test.concat(o.test); if(o.ishlanma) d.ishlanma = o.ishlanma; if(o.qiziqarli) d.qiziqarli = (d.qiziqarli||[]).concat(o.qiziqarli); if(o.bolimlar) d.bolimlar = (d.bolimlar||[]).concat(o.bolimlar); }

const MK = '8-sinf «Kimyo» darsligi (O‘zbekiston) — «Kimyoviy bog‘lanish» bobi; NIST CCCBDB — tajribaviy molekula geometriyalari (H₂, N₂, O₂, HCl, CO₂, CH₄, NH₃, H₂O); NaCl panjara doimiysi — 564,02 pm';
const MF = '8-sinf «Fizika» darsligi (O‘zbekiston) — «Zanjirning bir qismi uchun Om qonuni»; BIPM — amper ta’rifi (SI, 2019); IEC 60062:2016 — rezistorlar rang kodi';
const MB = '8-sinf «Biologiya (Odam va uning salomatligi)» darsligi (O. Mavlonov, T. Tilavov, B. Aminov); NIH Curriculum Supplement «Information about the Brain»; NIDDK «Your Kidneys & How They Work»; StatPearls «Physiology, Stomach»';

/* ================= KIMYO: MOLEKULALARNING FAZOVIY TUZILISHI ================= */
qosh('kimyo-molekula', {
  bosqichlar:[
    {sarlavha:'Eng oddiy molekula — H₂', matn:'Ikki vodorod atomi bitta umumiy elektron jufti bilan bog‘langan. Atomlar bir xil, elektronni teng tortadi — bu qutbsiz kovalent bog‘. Yadrolar orasidagi masofa atigi ≈74 pm (0,74·10⁻¹⁰ m).', mol:'H2'},
    {sarlavha:'Qutbli bog‘ — HCl', matn:'Xlorning elektromanfiyligi (3,16) vodorodnikidan (2,20) katta, shuning uchun umumiy elektron jufti xlor tomonga siljiydi: xlorda qisman manfiy, vodorodda qisman musbat zaryad. Bu qutbli kovalent bog‘, uzunligi ≈127 pm.', mol:'HCl'},
    {sarlavha:'Ionli bog‘ — NaCl', matn:'Natriy va xlor elektromanfiyligi farqi katta (2,23): natriy elektronini butunlay beradi. Na⁺ va Cl⁻ ionlari kristall panjara hosil qiladi, qo‘shni ionlar markazlari orasi ≈282 pm. Modelni aylantirib, har ionni oltita qarama-qarshi ion o‘rab turganini sanang.', mol:'NaCl'},
    {sarlavha:'Tetraedr — CH₄', matn:'Uglerodda to‘rtta bog‘lovchi juft bor va bo‘linmagan juft yo‘q. Juftlar bir-biridan eng uzoq — tetraedr uchlariga joylashadi, H–C–H burchagi 109,5°. Modelni aylantiring: qaysi tomondan qaramang, to‘rt vodorod bir xil uzoqlikda.', mol:'CH4'},
    {sarlavha:'Piramida — NH₃', matn:'Azotda uchta bog‘lovchi va bitta bo‘linmagan juft. Erkin juft bog‘larni siqadi: burchak 109,5° dan kichik — tajribada 106,7°, darsliklarda yaxlitlab 107°. Atomlar uchburchakli piramida hosil qiladi, uchida azot turadi.', mol:'NH3'},
    {sarlavha:'Burchakli molekula — H₂O', matn:'Kislorodda ikkita bo‘linmagan juft bor, shuning uchun burchak yanada kichik — 104,5°. Burchakli shakl tufayli suv qutbli. CO₂ ham uch atomli, lekin chiziqli (180°) va qutbsiz — ikkalasini tugmalar bilan solishtiring.', mol:'H2O'}
  ],
  test:[
    {s:'Quyidagi molekulalardan qaysi biri qutbli?', v:['CO₂','CH₄','NH₃','H₂'], t:2,
     izoh:'<b>NH₃</b> — piramida shaklida, bo‘linmagan jufti bir tomonda, zaryadlar markazi mos kelmaydi. CO₂ va CH₄ simmetrik, H₂ da bog‘ qutbsiz.'},
    {s:'Azot molekulasida (N₂) atomlar orasida nechta kovalent bog‘ bor?', v:['Uchta (uch bog‘)','Bitta','Ikkita','To‘rtta'], t:0,
     izoh:'Har bir azot atomi uchta toq elektronini umumlashtiradi: <b>N≡N uch bog‘</b>. Shuning uchun azot molekulasi juda mustahkam va kam faol.'},
    {s:'Vodorod xlorid (HCl) molekulasida qanday bog‘ bor?', v:['Ionli','Kovalent qutbsiz','Metall','Kovalent qutbli'], t:3,
     izoh:'Atomlar turli, elektromanfiylik farqi 0,96 — umumiy juft xlorga siljigan: <b>kovalent qutbli bog‘</b>. Farq katta bo‘lganda (NaCl, 2,23) bog‘ ionli bo‘ladi.'}
  ],
  qiziqarli:[
    'Karrali bog‘ qisqaroq bo‘ladi: N≡N uch bog‘ uzunligi ≈110 pm, O=O qo‘sh bog‘niki ≈121 pm (NIST CCCBDB tajriba qiymatlari).',
    'Ammiakdagi H–N–H burchagining tajribaviy qiymati 106,67° (NIST CCCBDB), suvdagi H–O–H burchagi 104,48°; darsliklardagi 107° va 104,5° — yaxlitlangan qiymatlar.'
  ],
  bolimlar:[
    {sarlavha:'Bog‘ uzunliklari va burchaklar (tajriba qiymatlari)', jadval:[
      ['H–H · H₂','74 pm · bitta bog‘, qutbsiz'],
      ['O=O · O₂','121 pm · qo‘sh bog‘'],
      ['N≡N · N₂','110 pm · uch bog‘'],
      ['H–Cl · HCl','127 pm · qutbli kovalent'],
      ['C=O · CO₂','116 pm · 180°, chiziqli'],
      ['C–H · CH₄','109 pm · 109,5°, tetraedr'],
      ['N–H · NH₃','101 pm · 106,7°, piramida'],
      ['O–H · H₂O','96 pm · 104,5°, burchakli'],
      ['Na⁺…Cl⁻ · NaCl kristali','282 pm · panjara qirrasi 564 pm (ikki ion masofasi)']
    ], matn:'1 pm (pikometr) = 10⁻¹² m. Qiymatlar NIST CCCBDB bazasidagi tajribaviy muvozanat geometriyalaridan yaxlitlab olingan. Bir juft atom orasida bog‘ soni ortsa, bog‘ qisqaradi: N≡N (110 pm) O=O (121 pm) dan qisqa.'}
  ],
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D molekulyar model, elektromanfiylik jadvali bilan tahlil, juftlikda ishlash',
    maqsad:{talimiy:'Kovalent qutbsiz, kovalent qutbli va ionli bog‘ turlarini, bo‘linmagan elektron juftlarning molekula shakliga ta’sirini (CH₄, NH₃, H₂O, CO₂) o‘rgatish.',
      tarbiyaviy:'Tabiatdagi moddalar tuzilishiga qiziqish, suv va havoning hayotdagi ahamiyatini anglash.',
      rivojlantiruvchi:'Fazoviy tasavvur, tuzilish va xossa bog‘lanishini tahlil qilish, taqqoslash ko‘nikmasi.'},
    natijalar:['Elektromanfiylik farqiga qarab bog‘ turini aniqlaydi','CH₄, NH₃, H₂O va CO₂ shaklini modelda ko‘rsatadi va burchagini aytadi','Bo‘linmagan juft burchakni nega kichraytirishini tushuntiradi','Molekula shakli va qutbliligini bog‘laydi'],
    jihozlar:['MAKON 3D sahnasi «Molekulalar»','Proyektor','Elektromanfiylik jadvali','Sharli-sterjenli molekula modellari (bo‘lsa)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «H₂O va CO₂ — ikkalasi uch atomli. Nega biri suyuqlik, biri gaz?»','Taxmin bildiradi.'],
      ['8–18','<b>Bog‘ turlari.</b> MAKON da H₂ → HCl → NaCl; elektromanfiylik farqi.','Farqlarni hisoblaydi, bog‘ turini yozadi.'],
      ['18–28','<b>Molekula shakli.</b> CH₄ → NH₃ → H₂O: bo‘linmagan juftlar va burchaklar; CO₂ bilan solishtirish.','Modelni aylantiradi, jadvalga shakl va burchakni yozadi.'],
      ['28–33','<b>Qutblilik.</b> Shakl va qutblilik bog‘lanishi; suvning xossalari.','Qutbli va qutbsiz molekulalarni ajratadi.'],
      ['33–42','<b>Mustahkamlash.</b> MAKON «Molekulani hosil qiling» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Kovalent bog‘','Umumiy elektron jufti hisobiga bog‘.'],['Ionli bog‘','Qarama-qarshi ionlar tortishishi.'],['Elektromanfiylik','Elektronni tortish qobiliyati.'],['Bo‘linmagan juft','Bog‘da qatnashmaydigan elektron jufti.'],['Qutbli molekula','Zaryad markazlari mos kelmaydigan molekula.']],
    savollar:[['H₂ da qanday bog‘?','Kovalent qutbsiz'],['HCl da qanday bog‘?','Kovalent qutbli'],['Metandagi burchak?','109,5°'],['Suv molekulasi shakli?','Burchakli, 104,5°'],['CO₂ nega qutbsiz?','Chiziqli va simmetrik']],
    uy:'Darslikdagi mavzuni o‘qish; (1) N₂, HCl, NaCl, H₂O dagi bog‘ turini aniqlash (javob: kovalent qutbsiz, kovalent qutbli, ionli, kovalent qutbli); (2) H–Cl elektromanfiylik farqini hisoblash (javob: 3,16 − 2,20 = 0,96); (3) 51 g ammiak necha mol ekanini topish (javob: M = 17 g/mol, 3 mol).',
    manba:MK
  }
});

/* ================= FIZIKA: OM QONUNI ================= */
qosh('fizika-om', {
  bosqichlar:[
    {sarlavha:'Zanjir bilan tanishuv', matn:'Sahnada yopiq zanjir: tok manbai (chapda), lampa, rezistor (o‘ngda) va ampermetr. Har bir qismni bosing — vazifasi pastda chiqadi. Ko‘k nuqtalar — elektronlar, ularning tezligi tok kuchini ko‘rsatadi.'},
    {sarlavha:'Birinchi o‘lchash: 12 V va 6 Ω', matn:'«Kuchlanish» slayderini 12 V ga, «Qarshilik» slayderini 6 Ω ga qo‘ying. Ampermetr 2,00 A ko‘rsatadi: I = U / R = 12 / 6 = 2 A. Pastdagi izohda hisob va quvvat (24 Vt) chiqadi.'},
    {sarlavha:'Kuchlanishni o‘zgartiring', matn:'Qarshilik 6 Ω da qolsin. Kuchlanishni 6 V ga tushiring — tok 1 A; 12 V — 2 A; 18 V — 3 A. Kuchlanish necha marta ortsa, tok ham shuncha marta ortadi: tok kuchlanishga to‘g‘ri proporsional.'},
    {sarlavha:'Qarshilikni o‘zgartiring', matn:'Kuchlanishni 12 V da qoldiring. Qarshilikni 6 Ω dan 12 Ω ga oshiring — tok 1 A ga tushadi; 24 Ω da — 0,5 A. Qarshilik necha marta ortsa, tok shuncha marta kamayadi: teskari proporsionallik.'},
    {sarlavha:'Quvvat va lampa yorqinligi', matn:'Lampa yorqinligi quvvatga bog‘liq: P = U · I. 12 V va 6 Ω da P = 24 Vt. Endi 24 V va 6 Ω ni sinang: I = 4 A, P = 96 Vt — sahnada lampa chidamidan (55 Vt) oshadi. Xulosa: har bir asbob o‘z kuchlanishi va quvvatiga mo‘ljallangan.'},
    {sarlavha:'Rezistor rang halqalari', matn:'Qarshilikni o‘zgartirganda rezistordagi halqalar rangi ham o‘zgaradi. 12 Ω da: jigarrang (1), qizil (2), qora (×1) = 12 Ω; 6 Ω da: ko‘k (6), qora (0), oltin (×0,1) = 6 Ω. Oxirgi oltin halqa — ±5 % aniqlik. To‘liq jadval «Rezistor rang kodi» bo‘limida.'}
  ],
  test:[
    {s:'Qarshiligi 24 Ω bo‘lgan rezistordan 0,5 A tok o‘tmoqda. Uning uchlaridagi kuchlanish qancha?', v:['48 V','12 V','0,02 V','24,5 V'], t:1,
     izoh:'<b>U = I · R = 0,5 · 24 = 12 V.</b> 48 V — bo‘lish o‘rniga ko‘paytirish noto‘g‘ri yo‘nalishda qilingan holat.'},
    {s:'Rezistor uchun tok kuchining kuchlanishga bog‘liqlik grafigi (volt-amper tavsifi) qanday ko‘rinishda?', v:['Parabola','Gorizontal to‘g‘ri chiziq','Koordinata boshidan o‘tuvchi to‘g‘ri chiziq','Giperbola'], t:2,
     izoh:'R o‘zgarmas bo‘lsa, I = U / R — to‘g‘ri proporsionallik: grafik <b>koordinata boshidan o‘tuvchi to‘g‘ri chiziq</b>. Qiyalik qancha katta bo‘lsa, qarshilik shuncha kichik.'},
    {s:'4,5 V kuchlanishli batareyaga ulangan lampadan 0,3 A tok o‘tadi. Lampa qarshiligi qancha?', v:['1,35 Ω','0,067 Ω','4,8 Ω','15 Ω'], t:3,
     izoh:'<b>R = U / I = 4,5 / 0,3 = 15 Ω.</b> 1,35 — ko‘paytirilgan, 0,067 — teskari bo‘lingan holat.'}
  ],
  qiziqarli:[
    '2019-yildan amper elementar zaryadning aniq qiymati orqali ta’riflanadi: e = 1,602176634·10⁻¹⁹ C. Demak, 1 A tokda kesimdan har soniyada taxminan 6,24·10¹⁸ ta elementar zaryad o‘tadi (BIPM).',
    'Rezistorlar rang kodi xalqaro IEC 60062 standartida belgilangan; 2 dan 7 gacha raqamlar ranglari (qizil, to‘q sariq, sariq, yashil, ko‘k, binafsha) kamalak tartibida keladi — bu eslab qolishni osonlashtiradi.'
  ],
  bolimlar:[
    {sarlavha:'Rezistor rang kodi (4 halqali)', jadval:[
      ['Qora','raqam 0 · ko‘paytuvchi ×1'],
      ['Jigarrang','raqam 1 · ×10 · aniqlik ±1 %'],
      ['Qizil','raqam 2 · ×100 · aniqlik ±2 %'],
      ['To‘q sariq','raqam 3 · ×1000'],
      ['Sariq','raqam 4 · ×10 000'],
      ['Yashil','raqam 5 · ×100 000'],
      ['Ko‘k','raqam 6 · ×1 000 000'],
      ['Binafsha','raqam 7'],
      ['Kulrang','raqam 8'],
      ['Oq','raqam 9'],
      ['Oltin','ko‘paytuvchi ×0,1 · aniqlik ±5 %'],
      ['Kumush','ko‘paytuvchi ×0,01 · aniqlik ±10 %'],
      ['Halqa yo‘q','aniqlik ±20 %']
    ], matn:'O‘qish tartibi: 1- va 2-halqa — raqamlar, 3-halqa — ko‘paytuvchi, 4-halqa — aniqlik. Misol: sariq–binafsha–qizil–oltin = 47 · 100 = 4700 Ω = 4,7 kΩ ± 5 %. Manba: IEC 60062:2016.'}
  ],
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D virtual zanjir, kuzatish va o‘lchash, jadval tuzish, masala yechish',
    maqsad:{talimiy:'Zanjirning bir qismi uchun Om qonunini o‘rgatish: tok kuchining kuchlanishga to‘g‘ri va qarshilikka teskari proporsionalligini tajribada ko‘rsatish; quvvat P = U·I bilan bog‘lash.',
      tarbiyaviy:'Elektr asboblaridan xavfsiz foydalanish madaniyatini shakllantirish.',
      rivojlantiruvchi:'Tajriba natijalarini jadvalga yozish, qonuniyatni topish va formulani qo‘llash ko‘nikmasi.'},
    natijalar:['I = U / R formulasini bilgan ikki kattalikdan uchinchisini topishda qo‘llaydi','Kuchlanish va qarshilik o‘zgarganda tok qanday o‘zgarishini oldindan aytadi','Ampermetr va voltmetrning ulanish usulini biladi','Rezistor rang kodini o‘qiydi'],
    jihozlar:['MAKON 3D sahnasi «Elektr zanjiri»','Proyektor','Tajriba natijalari uchun jadval tarqatmasi','Rezistor, ampermetr, voltmetr, tok manbai (laboratoriya bo‘lsa)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Nega bitta uzaytirgichga ko‘p kuchli asbob ulash xavfli?»','Fikr bildiradi.'],
      ['8–16','<b>Zanjir elementlari.</b> MAKON da manba, lampa, rezistor, ampermetr; ampermetr ketma-ket, voltmetr parallel.','Elementlarni bosib, vazifasini yozadi.'],
      ['16–24','<b>I ning U ga bog‘liqligi.</b> R = 6 Ω da U = 6, 12, 18 V.','Jadval tuzadi, grafik chizadi.'],
      ['24–30','<b>I ning R ga bog‘liqligi.</b> U = 12 V da R = 6, 12, 24 Ω; Om qonuni xulosasi.','Jadval tuzadi, xulosa yozadi.'],
      ['30–34','<b>Quvvat va xavfsizlik.</b> P = U·I; lampa chidami; rang kodi.','Hisoblaydi, rezistor qiymatini o‘qiydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Zanjirni sozlang» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Tok kuchi','Vaqt birligida o‘tgan zaryad, A.'],['Kuchlanish','Zaryadni ko‘chirish ishi / zaryad, V.'],['Qarshilik','Tokka to‘sqinlik, Ω.'],['Rezistor','Ma’lum qarshilikli element.'],['Quvvat','P = U·I, Vt.']],
    savollar:[['Om qonuni formulasi?','I = U / R'],['U = 12 V, R = 6 Ω bo‘lsa I?','2 A'],['Ampermetr qanday ulanadi?','Ketma-ket'],['R ikki marta ortsa, I?','2 marta kamayadi'],['Oltin 4-halqa nimani bildiradi?','±5 % aniqlik']],
    uy:'Darslikdagi mavzuni o‘qish; (1) 220 V tarmoqqa ulangan 44 Ω qarshilikli isitgichdagi tokni topish (javob: 5 A); (2) shu isitgich quvvatini hisoblash (javob: 1100 Vt); (3) jigarrang–qora–qizil–oltin halqali rezistor qiymatini aniqlash (javob: 10 · 100 = 1000 Ω = 1 kΩ ± 5 %).',
    manba:MF
  }
});

/* ================= BIOLOGIYA: ICHKI A’ZOLAR ================= */
qosh('bio-azolar', {
  bosqichlar:[
    {sarlavha:'Bosh miya — boshqaruv markazi', matn:'Bosh miya kalla suyagi ichida joylashgan va butun tana ishini boshqaradi. U tana massasining taxminan 2 % ini tashkil qiladi, lekin nafas bilan olingan kislorodning taxminan 20 % ini sarflaydi.', azo:'miya', korinish:'bosh'},
    {sarlavha:'Havo yo‘li: traxeya va bronxlar', matn:'Ko‘krak ko‘rinishiga o‘ting. Havo hiqildoqdan traxeyaga, u yerdan ikki bosh bronxga o‘tadi. Traxeyani tog‘ay halqalar ochiq ushlab turadi. Bronxlar o‘pka ichida daraxt shoxlaridek mayda shoxlanadi.', azo:'nafas', korinish:'kokrak'},
    {sarlavha:'O‘pkalar va gaz almashinuvi', matn:'O‘pkalar yurakning ikki yonida. Bronxlarning eng mayda shoxlari alveolalar bilan tugaydi — gaz almashinuvi shu yerda kechadi. O‘ng o‘pka uch, chap o‘pka ikki bo‘lakli ekanini modelda solishtiring.', azo:'opka', korinish:'kokrak'},
    {sarlavha:'Yurak — nasos', matn:'Yurak ko‘krak qafasining o‘rtasida, ikki o‘pka orasida, uchi chapga qaragan holda joylashgan. U qonni kichik (o‘pka orqali) va katta (butun tana bo‘ylab) qon aylanish doiralariga haydaydi.', azo:'yurak', korinish:'kokrak'},
    {sarlavha:'Oshqozon va jigar', matn:'Butun tana ko‘rinishiga o‘ting. Diafragma ostida chapda oshqozon, o‘ngda — eng katta ichki bez jigar. Oshqozon devoridagi hujayralar xlorid kislota ajratadi: kislotali muhitda oqsillarni parchalovchi pepsin fermenti faollashadi.', azo:'oshqozon', korinish:'butun'},
    {sarlavha:'Buyraklar — filtr', matn:'Modelni orqa tomonga aylantiring. Buyraklar bel sohasida, umurtqa pog‘onasining ikki yonida joylashgan loviyasimon juft a’zo, har biri taxminan musht kattaligida. Har bir buyrakda qonni filtrlaydigan taxminan 1 million nefron bor.', azo:'buyrak', korinish:'butun'}
  ],
  test:[
    {s:'Ko‘krak bo‘shlig‘ini qorin bo‘shlig‘idan ajratib turuvchi mushak qaysi?', v:['Qovurg‘alararo mushak','Diafragma','Yurak mushagi','Qorin to‘g‘ri mushagi'], t:1,
     izoh:'<b>Diafragma</b> — gumbazsimon mushak; qisqarganda pastga tushadi va nafas olishni ta’minlaydi.'},
    {s:'Buyrakning qonni filtrlaydigan tuzilish va funksional birligi nima?', v:['Alveola','Neyron','Nefron','Ichak so‘rg‘ichi'], t:2,
     izoh:'<b>Nefron</b> — buyrakning filtrlovchi birligi; har bir buyrakda taxminan 1 million nefron bor. Neyron — nerv hujayrasi, alveola — o‘pka pufakchasi.'},
    {s:'Me’da shirasi tarkibidagi qaysi kislota oqsillarning hazm bo‘lishiga yordam beradi?', v:['Sulfat kislota','Sirka kislota','Limon kislota','Xlorid kislota'], t:3,
     izoh:'Oshqozon devoridagi hujayralar <b>xlorid kislota (HCl)</b> ajratadi: u muhitni kuchli kislotali qiladi, pepsinogenni faol pepsinga aylantiradi va ovqat bilan kirgan mikroblarni zararsizlantiradi.'}
  ],
  qiziqarli:[
    'Bosh miya tana massasining atigi 2 % ini tashkil qiladi, lekin nafas bilan olinadigan kislorodning va tana sarflaydigan energiyaning taxminan 20 % ini iste’mol qiladi (NIH, «Information about the Brain»).',
    'Har bir buyrak taxminan 1 million filtrlovchi birlik — nefrondan tuzilgan (NIDDK). Tadqiqotlarga ko‘ra bu son odamdan odamga keskin farq qiladi: taxminan 200 mingdan 2,5 milliondan ortiqqacha.'
  ],
  bolimlar:[
    {sarlavha:'A’zolar raqamlarda', jadval:[
      ['Bosh miya','tana massasining ≈2 % · kislorod va energiyaning ≈20 % ini sarflaydi'],
      ['Buyrak','loviyasimon, musht kattaligida · har birida ≈1 million nefron'],
      ['Oshqozon','me’da shirasida xlorid kislota · muhit kuchli kislotali (pH ≈1–2)'],
      ['O‘pkalar','o‘ng — 3 bo‘lak, chap — 2 bo‘lak · gaz almashinuvi alveolalarda'],
      ['Diafragma','ko‘krak va qorin bo‘shlig‘i chegarasi · asosiy nafas mushagi']
    ], matn:'Raqamlar kattalar uchun o‘rtacha qiymatlar; odamdan odamga farq qiladi. Oshqozon pH qiymati manbalarda biroz farq qiladi: StatPearls — pH ≈1,0, parietal hujayralar haqidagi sharh maqolasida — pH 2 dan past.'}
  ],
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D anatomik model, qatlamlar bilan ishlash, jadval to‘ldirish, juftlikda ishlash',
    maqsad:{talimiy:'Ichki a’zolarning (miya, nafas yo‘llari, o‘pka, yurak, oshqozon, jigar, buyrak) joylashuvi, tuzilishi va vazifalarini, ularning tizimlarga birlashishini o‘rgatish.',
      tarbiyaviy:'O‘z sog‘lig‘iga mas’uliyatli munosabat, sog‘lom turmush tarziga intilish.',
      rivojlantiruvchi:'Fazoviy tasavvur, kuzatish, taqqoslash va a’zo–vazifa bog‘lanishini tahlil qilish ko‘nikmasi.'},
    natijalar:['Asosiy ichki a’zolarni modelda topadi va nomlaydi','A’zoning qaysi bo‘shliqda va qaysi tomonda joylashganini aytadi','Har bir a’zoning asosiy vazifasini va tizimini aytadi','Diafragma, alveola, nefron tushunchalarini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Inson tanasi»','Proyektor','«A’zo – joyi – tizimi – vazifasi» jadval tarqatmasi','Tana torsi maketi yoki plakat (bo‘lsa)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Yurak qayerda? Qo‘lingizni qo‘ying.» Keyin modelda tekshirish.','Taxmin qiladi, modelda tekshiradi.'],
      ['8–16','<b>Bo‘shliqlar.</b> Diafragma; ko‘krak va qorin bo‘shlig‘i; qatlamlarni ochish.','Qatlamlarni yoqib-o‘chiradi.'],
      ['16–26','<b>Ko‘krak a’zolari.</b> Traxeya, bronxlar, o‘pkalar, yurak.','Jadvalni to‘ldiradi.'],
      ['26–33','<b>Qorin a’zolari.</b> Oshqozon, jigar, oshqozon osti bezi, ichaklar, buyraklar (orqadan).','Jadvalni to‘ldiradi.'],
      ['33–42','<b>Mustahkamlash.</b> MAKON «A’zoni toping» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Diafragma','Ko‘krak va qorin bo‘shlig‘i orasidagi mushak.'],['Alveola','O‘pka pufakchasi.'],['Nefron','Buyrakning filtrlovchi birligi.'],['Bronx','Traxeyaning shoxlari.'],['Me’da shirasi','Oshqozonda ajraladigan hazm shirasi.']],
    savollar:[['Gaz almashinuvi qayerda?','Alveolalarda'],['Yurak qayerda joylashgan?','Ko‘krak qafasi o‘rtasida, uchi chapga'],['Jigar qaysi tomonda?','O‘ngda, diafragma ostida'],['Buyrakning filtrlovchi birligi?','Nefron'],['Me’da shirasidagi kislota?','Xlorid kislota']],
    uy:'Darslikdagi mavzuni o‘qish; (1) a’zolarni ko‘krak va qorin bo‘shlig‘i bo‘yicha ikki ustunga ajratib yozish (javob: ko‘krak — yurak, o‘pkalar, traxeya; qorin — oshqozon, jigar, ichaklar, taloq, oshqozon osti bezi, buyraklar); (2) havoning burundan alveolagacha yo‘lini tartib bilan yozish (javob: burun bo‘shlig‘i → halqum → hiqildoq → traxeya → bronxlar → bronxiolalar → alveolalar); (3) yurak, o‘pka va buyrak sog‘lig‘ini saqlash uchun 3 tadan maslahat yozish.',
    manba:MB
  }
});
})();
