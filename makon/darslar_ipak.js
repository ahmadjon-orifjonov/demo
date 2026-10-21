/* MAKON — «Buyuk Ipak yo‘li» darsi (tarix, 7–8-sinf) + detal kartalari MAKON_DETAL.ipak.
   darslar_v312_fanlar.js dan KEYIN, detallar.js dan OLDIN yuklanadi. Sahna: 'ipak' (lib/makon3d_ipak.js, lib/ipak_xarita.js).
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi; tekshirilmagani «taxminiy» deb yozilgan. */
(function(){
const FAN = window.MAKON_FAN;
if(!FAN || !window.MAKON_DARS) return;
const F = id=>FAN.find(f=>f.id===id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom===nom || x.dars===dars || (eskiNomlar||[]).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};

const IPM = 'Wikipedia (inglizcha): «Silk Road» (en.wikipedia.org/wiki/Silk_Road), «Zhang Qian» (en.wikipedia.org/wiki/Zhang_Qian), «Battle of Talas» (en.wikipedia.org/wiki/Battle_of_Talas), «Byzantine silk» (en.wikipedia.org/wiki/Byzantine_silk), «Marco Polo» (en.wikipedia.org/wiki/Marco_Polo), «Ruy González de Clavijo» (en.wikipedia.org/wiki/Ruy_González_de_Clavijo), «Vasco da Gama» (en.wikipedia.org/wiki/Vasco_da_Gama), «Gan Ying» (en.wikipedia.org/wiki/Gan_Ying), «Afrasiab murals» (en.wikipedia.org/wiki/Afrasiab_murals)';
const UNM = 'YUNESKO Butunjahon merosi markazi: «Silk Roads: the Routes Network of Chang’an-Tianshan Corridor» (whc.unesco.org/en/list/1442), «Silk Roads: Zarafshan-Karakum Corridor» (whc.unesco.org/en/list/1675)';
const DAR = '7–8-sinf «Jahon tarixi» va «O‘zbekiston tarixi» darsliklari (amaldagi nashrlar); Encyclopaedia Britannica «Silk Road» (britannica.com/topic/Silk-Road-trade-route)';
const XAR = 'Xarita: historical-basemaps (A. Ourednik, GPL-3.0, github.com/aourednik/historical-basemaps), Natural Earth (naturalearthdata.com, jamoat mulki) — chegaralar taxminiy, yo‘llar sxematik';

bogla('tarix', 'Buyuk Ipak yo‘li', 'tarix-ipak-yoli', 'Xitoydan O‘rta yer dengizigacha: 6 davr, 4 yo‘nalish, 24 shahar xaritada');

window.MAKON_DARS['tarix-ipak-yoli'] = {
  fan:'tarix', qisqaNom:'Ipak yo‘li', nom:'Buyuk Ipak yo‘li',
  qisqa:'7–8-sinf · Jahon va O‘zbekiston tarixi · xarita darsi',
  sahna:'ipak',
  kor:{
    sarlavha:'Sharq va G‘arbni bog‘lagan yo‘llar tarmog‘i',
    matn:'Buyuk Ipak yo‘li — bitta yo‘l emas, Xitoyni O‘rta Osiyo, Eron, Hindiston va O‘rta yer dengizi bilan bog‘lagan karvon va dengiz yo‘llari tarmog‘i. U mil. av. II asrdan XV asr o‘rtalarigacha faol bo‘lgan. Yo‘llarning markazida — hozirgi O‘zbekiston hududi: Samarqand, Buxoro, Farg‘ona, Shosh va Termiz. Xaritada olti davrni almashtiring, yo‘nalishlarni yoqing va shaharlarni bosib, ularning tarixi bilan tanishing. Chegaralar taxminiy, yo‘llar sxematik.',
    punktlar:[
      '<b>Ochilishi:</b> Xan elchisi Chjan Szyan safari (mil. av. 138 – mil. av. 126; ba’zi manbalarda qaytish yili 125)',
      '<b>Nomi:</b> «Ipak yo‘li» (nemischa <i>Seidenstraße</i>) atamasini 1877-yilda nemis geografi Ferdinand fon Rixtgofen ommalashtirgan',
      '<b>Ahamiyati:</b> ipak, qog‘oz, ziravor, shisha, otlar bilan birga dinlar, bilimlar, texnologiyalar ham tarqalgan',
      '<b>YUNESKO:</b> Chan’an–Tyanshan yo‘lagi (2014) va Zarafshon–Qoraqum yo‘lagi (2023) Butunjahon merosi ro‘yxatida'
    ]
  },
  bolimlar:[
    {sarlavha:'Olti davr: qisqa jadval', jadval:[
      ['mil. av. II–I asr','Chjan Szyan safari (mil. av. 138–126); Xanning Dovonga yurishi (mil. av. 104–101) · xaritada: Xan, Xunnlar, Rim, Parfiya'],
      ['I–III asr','Rim, Parfiya, Kushon podsholigi, Xan — yo‘l bo‘ylab to‘rt imperiya; Gan In elchiligi (97)'],
      ['VI–VII asr','Sug‘d savdogarlari; ipak qurti Vizantiyaga (VI asr o‘rtasi); Syuan Szan safari (629–645)'],
      ['VIII–IX asr','Talas jangi (751); Bag‘dodga asos solinishi (762); Samarqand qog‘ozi'],
      ['XIII–XIV asr','Mo‘g‘ullar imperiyasi; Marko Polo (1271–1295); dasht yo‘li faollashgan'],
      ['XIV–XV asr','Amir Temur davlati; Klavixo elchiligi (1403–1406); Vasko da Gama Hindistonga (1498)']
    ], matn:'Xaritadagi har davr bitta yilning holati: mil. av. 100, milodiy 100, 600, 800, 1279 va 1400-yillar. Manba xaritasidagi davrga to‘g‘ri kelmaydigan hududlar chizilmagan — ular chegarasiz yozuv bilan berilgan.'},
    {sarlavha:'To‘rt yo‘nalish', jadval:[
      ['Asosiy yo‘l','Chan’an → Dunxuan → Tarim havzasi (Turfon yoki Xo‘tan) → Qashqar → Farg‘ona → Samarqand → Buxoro → Marv → Eron → Bag‘dod → Antioxiya'],
      ['Dasht yo‘li','Turfon → Yettisuv → O‘tror → Urganch → Volga bo‘yi → Qora dengiz (Kaffa, Tana) → Konstantinopol'],
      ['Hindiston yo‘li','Samarqand → Termiz → Balx → Bomiyon → Kobul → Gandxara (Taksila) → Hindiston'],
      ['Dengiz yo‘li','Guanchjou → Malakka → Seylon → Kalikut → Fors qo‘ltig‘i yoki Qizil dengiz → Iskandariya']
    ], matn:'Yo‘nalishlar sxematik: aslida har tarmoq ko‘plab mayda yo‘l va dovonlardan iborat bo‘lgan, ular urush, suv manbalari va siyosatga qarab o‘zgargan.'},
    {sarlavha:'Nima tashilgan?', jadval:[
      ['Sharqdan g‘arbga','ipak, choy (keyingi davrlarda), chinni, qog‘oz, nefrit (Xo‘tan), ziravorlar (Hindiston va Janubi-Sharqiy Osiyo)'],
      ['G‘arbdan sharqqa','oltin va kumush, shisha buyumlar, jun gazlamalar, otlar (Farg‘ona), uzum va beda (Xitoy manbalari bo‘yicha — Dovondan)'],
      ['O‘rta Osiyodan','Farg‘ona otlari, Samarqand qog‘ozi, sug‘d kumush idishlari, paxta va ipak gazlamalar'],
      ['G‘oyalar','buddaviylik, nasroniylik (nestorianlar), moniylik, islom; qog‘oz, kitob bosish, kompas va porox haqidagi bilimlar']
    ]},
    {sarlavha:'Muhim sanalar', jadval:[
      ['mil. av. 138','Chjan Szyan g‘arbga yo‘lga chiqqan'],
      ['97','Gan In Fors qo‘ltig‘igacha borib, orqaga qaytgan'],
      ['taxminan 552–554','Ipak qurti tuxumlari Vizantiyaga olib kelingan (manbalarda 552 yoki 553–554)'],
      ['751-yil iyul','Talas jangi'],
      ['1271–1295','Marko Polo safari'],
      ['1404-yil 4–8-sentabr','Klavixo Samarqand chekkasiga yetib kelgan (4-sentabr), Amir Temurga maktublarni topshirgan (8-sentabr)'],
      ['1453-yil 29-may','Konstantinopolni Usmonlilar egallagan'],
      ['1498-yil 20-may','Vasko da Gama Kalikutga yetib kelgan'],
      ['1877','Rixtgofen «Ipak yo‘li» atamasini ommalashtirgan'],
      ['2014 va 2023','YUNESKO ro‘yxatiga kiritilgan ikki yo‘lak']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Yo‘lning ochilishi (mil. av. II asr)', matn:'Xan imperatori U-di elchisi Chjan Szyan mil. av. 138-yilda xunnlarga qarshi ittifoqchi izlab g‘arbga yo‘lga chiqqan. U o‘n yildan ortiq xunnlar asirligida bo‘lgan, so‘ng Dovon (Farg‘ona), Qang‘ va Yuechjilar yerlariga yetgan. Mil. av. 126-yilda (ba’zi manbalarda 125) qaytib, «samoviy otlar» va boy shaharlar haqida hisobot bergan.', davr:0, yol:'asosiy', shahar:'dovon'},
    {sarlavha:'To‘rt imperiya (I–III asr)', matn:'Yo‘l bo‘ylab Rim, Parfiya, Kushon podsholigi va Xan imperiyasi turgan. Kushonlar davrida Termiz va Gandxara buddaviylik markazlari bo‘lgan, bu din Hindiston yo‘li orqali Xitoyga tarqalgan. 97-yilda Xan elchisi Gan In Rimga yetolmay, Fors qo‘ltig‘idan qaytgan.', davr:1, yol:'janubiy', shahar:null},
    {sarlavha:'Sug‘d savdogarlari (VI–VII asr)', matn:'Samarqand va Buxoro savdogarlari — sug‘dlar — Xitoydan Vizantiyagacha savdo qilgan, sug‘d tili yo‘lda umumiy savdo tili bo‘lgan. Samarqanddagi Afrosiyob devoriy rasmlarida (VII asr o‘rtasi) turli mamlakatlardan kelgan elchilar tasvirlangan.', davr:2, yol:'asosiy', shahar:'samarqand'},
    {sarlavha:'Talas jangi va qog‘oz (751)', matn:'751-yil iyulida Talas daryosi bo‘yida Abbosiylar Tan qo‘shinini yenggan. An’anaga ko‘ra, asir olingan xitoy ustalari Samarqandda qog‘oz tayyorlashni boshlagan. Olimlar bu rivoyatni bahsli deb hisoblaydi: qog‘oz Turfon atrofida IV–V asrlarda ham ma’lum bo‘lgan.', davr:3, yol:null, shahar:'taroz'},
    {sarlavha:'Mo‘g‘ullar davri: Marko Polo (XIII–XIV asr)', matn:'Mo‘g‘ullar imperiyasi Xitoydan Qora dengizgacha bo‘lgan yo‘llarni bir hokimiyat ostida birlashtirgan. Dasht yo‘li — Urganch, Saroy, Kaffa orqali — faollashgan. Venetsiyalik Marko Polo 1271-yilda yo‘lga chiqib, Xubilay saroyida xizmat qilgan va 1295-yilda qaytgan.', davr:4, yol:'shimoliy', shahar:null},
    {sarlavha:'Amir Temur davri va dengiz yo‘li (XIV–XV asr)', matn:'Samarqand Amir Temur davlatining poytaxti bo‘lgan; Kastiliya elchisi Klavixo 1404-yil sentabrida shaharga kelgan. 1453-yilda Konstantinopol Usmonlilar qo‘liga o‘tgan, 1498-yilda Vasko da Gama Afrika atrofidan Hindistonga dengiz yo‘lini ochgan. Keyin quruqlikdagi yo‘lning ahamiyati kamaygan.', davr:5, yol:'dengiz', shahar:null}
  ],
  amaliyot:{tur:'shart', sarlavha:'Shaharni xaritada toping', holat:{davr:3, yashir:true},
    topshiriqlar:[
      {shart:'Shahar nomlari yashirilgan. <b>Samarqandni</b> toping — Zarafshon vodiysida, Buxorodan sharqda.', hodisa:'ipak-shahar', kod:"ev.shahar==='samarqand'", izoh:'To‘g‘ri — <b>Samarqand</b>. Sug‘dning bosh shahri, VIII asrdan qog‘oz ishlab chiqarish markazi.'},
      {shart:'Yo‘lning sharqiy boshlanishi — Xan va Tan poytaxti <b>Chan’anni</b> toping.', hodisa:'ipak-shahar', kod:"ev.shahar==='chanan'", izoh:'To‘g‘ri — <b>Chan’an</b> (hozirgi Sian). Chjan Szyan shu yerdan yo‘lga chiqqan.'},
      {shart:'762-yilda asos solingan Abbosiylar poytaxti <b>Bag‘dodni</b> toping.', hodisa:'ipak-shahar', kod:"ev.shahar==='bagdod'", izoh:'To‘g‘ri — <b>Bag‘dod</b>, Dajla (Tigr) bo‘yida. Bu yerda «Bayt al-hikma» ilm markazi bo‘lgan.'},
      {shart:'Tarim havzasining shimoliy va janubiy tarmoqlari qo‘shiladigan <b>Qashqarni</b> toping.', hodisa:'ipak-shahar', kod:"ev.shahar==='qashqar'", izoh:'To‘g‘ri — <b>Qashqar</b>. Undan g‘arbga yo‘l Farg‘ona va Pomir dovonlari orqali o‘tgan.'},
      {shart:'Qoraqum cho‘li chekkasidagi qadimiy voha shahri <b>Marvni</b> toping.', hodisa:'ipak-shahar', kod:"ev.shahar==='marv'", izoh:'To‘g‘ri — <b>Marv</b> (Turkmaniston). Zarafshon–Qoraqum yo‘lagi (YUNESKO, 2023) shu vohada tugaydi.'}
    ]},
  test:[
    {s:'Chjan Szyan g‘arbga qaysi yili yo‘lga chiqqan?', v:['mil. av. 221','mil. av. 138','mil. 97','mil. av. 104'], t:1, izoh:'Chjan Szyan <b>mil. av. 138-yilda</b> yo‘lga chiqqan. Mil. av. 104 — Xanning Dovonga yurishi boshlangan yil, 97 — Gan In elchiligi.'},
    {s:'«Ipak yo‘li» atamasini 1877-yilda kim ommalashtirgan?', v:['Marko Polo','Aleksandr Gumboldt','Ferdinand fon Rixtgofen','Klavixo'], t:2, izoh:'Nemis geografi <b>Ferdinand fon Rixtgofen</b> (nemischa <i>Seidenstraße</i>). Atama undan oldin ham uchragan, lekin u ommalashtirgan.'},
    {s:'Xitoy manbalarida «Dovon» deb qaysi hudud atalgan?', v:['Xorazm','Farg‘ona vodiysi','Baqtriya','Yettisuv'], t:1, izoh:'<b>Dovon — Farg‘ona vodiysi</b>. Uning «samoviy otlari» uchun Xan qo‘shini mil. av. 104–101-yillarda yurish qilgan.'},
    {s:'VI–VII asrlarda yo‘l bo‘ylab umumiy savdo tili bo‘lgan til qaysi?', v:['Lotin','Sug‘d','Arab','Mo‘g‘ul'], t:1, izoh:'<b>Sug‘d tili</b> — Samarqand va Buxoro savdogarlarining tili; u Xitoygacha savdo tili sifatida ishlatilgan.'},
    {s:'Talas jangi qaysi yili bo‘lgan?', v:['622','751','762','1219'], t:1, izoh:'<b>751-yil iyulida</b>. 762 — Bag‘dodga asos solingan yil.'},
    {s:'An’anaga ko‘ra, Talas jangidan keyin qaysi shaharda qog‘oz tayyorlash boshlangan?', v:['Buxoro','Marv','Samarqand','Urganch'], t:2, izoh:'<b>Samarqandda</b>. Olimlar bu rivoyatni bahsli deb hisoblaydi — qog‘oz Turfon atrofida IV–V asrlarda ham ma’lum bo‘lgan.'},
    {s:'Ipak qurti tuxumlari Vizantiyaga qaysi imperator davrida olib kelingan?', v:['Konstantin I','Yustinian I','Avgust','Mehmed II'], t:1, izoh:'<b>Yustinian I</b> (527–565) davrida, taxminan 552–554-yillarda; manbalarda rohiblar olib kelgan deyiladi.'},
    {s:'Marko Polo safari qaysi yillarga to‘g‘ri keladi?', v:['1271–1295','1403–1406','1325–1354','1497–1499'], t:0, izoh:'<b>1271–1295</b>. 1403–1406 — Klavixo elchiligi, 1497–1499 — Vasko da Gamaning birinchi safari.'},
    {s:'Kastiliya elchisi Klavixo Samarqandga kimning huzuriga kelgan?', v:['Ulug‘bek','Amir Temur','Xubilay','Shayboniyxon'], t:1, izoh:'<b>Amir Temur</b> huzuriga: 1404-yil 4-sentabrda shahar chekkasiga yetib kelgan, 8-sentabrda Temur uni qabul qilgan.'},
    {s:'Quruqlikdagi Ipak yo‘li ahamiyatining kamayishiga ta’sir qilgan voqea qaysi?', v:['Talas jangi','Vasko da Gamaning Hindistonga dengiz yo‘lini ochishi (1498)','Bag‘dodga asos solinishi','Chjan Szyan safari'], t:1, izoh:'<b>1498-yilda ochilgan dengiz yo‘li</b> Yevropa savdogarlariga Hindistonga O‘rta Osiyo va Yaqin Sharqni chetlab o‘tish imkonini bergan.'},
    {s:'2023-yilda YUNESKO ro‘yxatiga kiritilgan, O‘zbekiston hududidan o‘tuvchi yo‘lak qaysi?', v:['Chan’an–Tyanshan yo‘lagi','Zarafshon–Qoraqum yo‘lagi','Farg‘ona–Oloy yo‘lagi','Amudaryo yo‘lagi'], t:1, izoh:'<b>Zarafshon–Qoraqum yo‘lagi</b> (Tojikiston, O‘zbekiston, Turkmaniston). Chan’an–Tyanshan yo‘lagi 2014-yilda kiritilgan (Xitoy, Qozog‘iston, Qirg‘iziston).'},
    {s:'Dengiz yo‘lida kemalar qaysi shamollardan foydalangan?', v:['Passatlar','Mussonlar','Brizlar','G‘arbiy shamollar'], t:1, izoh:'<b>Mussonlar</b> — mavsumga qarab yo‘nalishini o‘zgartiradigan shamollar: yozda Hindistonga, qishda undan qaytishga qulay.'},
    {s:'Qaysi shahar Tarim havzasining ikki tarmog‘i ajraladigan joyda, Mogao g‘orlari yonida joylashgan?', v:['Qashqar','Dunxuan','Xo‘tan','Turfon'], t:1, izoh:'<b>Dunxuan</b>. Mogao g‘orlari YUNESKO ro‘yxatida (1987); u yerdan 868-yilgi «Olmos sutra» topilgan.'}
  ],
  yordamchi:[
    {s:'Nega yo‘l «ipak» deb atalgan?', j:'Ipak eng qimmatli va uzoq masofaga tashishga arziydigan mol bo‘lgan: yengil, kam joy egallaydi, narxi baland. Uni ishlab chiqarish siri uzoq vaqt Xitoyda saqlangan. Lekin yo‘ldan boshqa mollar — ziravor, qog‘oz, shisha, otlar ham tashilgan. «Ipak yo‘li» atamasini 1877-yilda F. fon Rixtgofen ommalashtirgan.', kalit:['ipak','nega','nom','rixtgofen']},
    {s:'Bitta karvon butun yo‘lni bosib o‘tganmi?', j:'Odatda yo‘q. Mollar qismlarga bo‘lib, shahardan shaharga qo‘ldan qo‘lga o‘tgan: har bir savdogar yo‘lning bir bo‘lagida ishlagan. Marko Polo kabi butun yo‘lni bosib o‘tganlar kam bo‘lgan.', kalit:['karvon','butun','masofa']},
    {s:'Sanalar nega manbalarda farq qiladi?', j:'Qadimgi manbalar yillarni hukmdorlar davri bo‘yicha sanagan, keyingi olimlar ularni milodiy hisobga o‘tkazgan. Masalan, Chjan Szyanning qaytish yili mil. av. 126 yoki 125, ipak qurtining Vizantiyaga kelishi 552 yoki 553–554 deb beriladi. Darsda ikkala variant ham ko‘rsatilgan.', kalit:['sana','farq','manba']}
  ],
  maqola:[
    {sarlavha:'Kirish: yo‘l emas — tarmoq', xatboshilar:[
      'Buyuk Ipak yo‘li deganda ko‘pincha bitta uzun yo‘l tasavvur qilinadi. Aslida bu Xitoyni O‘rta Osiyo, Hindiston, Eron, Arabiston va O‘rta yer dengizi mamlakatlari bilan bog‘lagan ko‘plab karvon va dengiz yo‘llarining tarmog‘i bo‘lgan. Tarmoq mil. av. II asrdan XV asr o‘rtalarigacha faol ishlagan. Quruqlikdagi asosiy yo‘lning uzunligi 6 400 km dan ortiq deb baholanadi; tarmoqlari bilan birga esa yo‘llar ancha uzun bo‘lgan (baholar manbaga qarab farq qiladi).',
      '«Ipak yo‘li» (nemischa <i>Seidenstraße</i>) atamasini 1877-yilda nemis geografi Ferdinand fon Rixtgofen ommalashtirgan. Qadimda savdogarlarning o‘zi bunday umumiy nomni ishlatmagan: ular yo‘lni shaharlar orasidagi bo‘laklar sifatida bilgan.',
      'Bu darsda xaritada olti davrni ko‘rib chiqamiz. Har davrda yo‘l bo‘ylab qaysi davlatlar turgani, qaysi shaharlar markaz bo‘lgani va qanday muhim voqealar yuz bergani aniqlanadi. Muhim ogohlantirish: xaritadagi chegaralar taxminiy, yo‘llar esa sxematik — ular faqat umumiy yo‘nalishni ko‘rsatadi.'
    ]},
    {sarlavha:'Yo‘lning ochilishi: Chjan Szyan va Dovon', xatboshilar:[
      'Mil. av. II asrda Xitoydagi Xan imperiyasiga shimoldan ko‘chmanchi xunnlar tahdid qilgan. Imperator U-di xunnlarga qarshi ittifoqchi topish uchun mil. av. 138-yilda Chjan Szyan boshchiligidagi elchilarni g‘arbga yuborgan. Yo‘lda ular xunnlarga asir tushgan: Chjan Szyan o‘n yildan ortiq asirlikda yashagan, so‘ng qochib, g‘arbga safarini davom ettirgan.',
      'U Dovon (Farg‘ona vodiysi), Qang‘ (Sirdaryo bo‘yidagi ko‘chmanchilar davlati) va Amudaryo bo‘yiga ko‘chib kelgan Yuechjilar yerlariga yetib borgan. Yuechjilar ittifoqqa ko‘nmagan, lekin Chjan Szyan mil. av. 126-yilda (ba’zi manbalarda 125) qaytganida Xitoyga g‘arbdagi boy shaharlar, dehqonchilik vohalari va Farg‘onaning «qon terlovchi» otlari haqida birinchi batafsil ma’lumotni olib kelgan.',
      'Tarixchi Sima Szyan yozishicha, Dovonda yetmishdan ortiq shahar bo‘lgan, aholisi sholi va bug‘doy ekkan, uzumdan sharob tayyorlagan. Xan imperiyasi Farg‘ona otlarini olish uchun mil. av. 104–101-yillarda Dovonga harbiy yurish qilgan. Shundan keyin Xitoy bilan g‘arb o‘rtasida muntazam elchilik va savdo aloqalari boshlangan — bu Ipak yo‘lining ochilishi deb hisoblanadi.'
    ]},
    {sarlavha:'To‘rt imperiya va sug‘d savdogarlari', xatboshilar:[
      'Milodiy I–III asrlarda yo‘lning ikki chekkasida ikki buyuk davlat — Rim va Xan imperiyasi turgan. Ular orasida Parfiya va Kushon podsholigi bo‘lgan. Rimda xitoy ipagi juda qimmat turgan: Pliniy Katta «Tabiiy tarix» asarida Hindiston, Xitoy va Arabiston har yili Rimdan 100 million sestersiy olib ketishidan shikoyat qilgan. 97-yilda Xan elchisi Gan In Rimga yetish uchun yo‘lga chiqqan, lekin Fors qo‘ltig‘i bo‘yida dengiz safari juda uzoq va xavfli deb aytilgach, orqaga qaytgan.',
      'Kushonlar davrida Termiz, Balx va Gandxara (Taksila) buddaviylik markazlari bo‘lgan. Buddaviy rohiblar savdogarlar bilan birga Hindiston yo‘li va Tarim havzasi orqali Xitoyga borgan — buddaviylik Xitoyga asosan shu yo‘llar orqali kirib borgan.',
      'VI–VIII asrlarda savdoning katta qismini sug‘dlar — Samarqand, Buxoro, Panjikent savdogarlari yuritgan. Ularning koloniyalari Xitoy shaharlarida ham bo‘lgan, sug‘d tili yo‘l bo‘ylab umumiy savdo tili bo‘lgan. Samarqanddagi Afrosiyob devoriy rasmlarida (VII asr o‘rtasi, hukmdor Varxuman davri) Xitoy, Koreya, Eron va boshqa mamlakatlardan kelgan elchilar tasvirlangan.',
      'Ipak ishlab chiqarish siri uzoq vaqt Xitoyda saqlangan. Vizantiya tarixchisi Prokopiy yozishicha, imperator Yustinian I davrida rohiblar ipak qurti tuxumlarini yashirincha Konstantinopolga olib kelgan. Bu voqea manbalarda 552-yil yoki 553–554-yillar deb beriladi. Shundan keyin Vizantiyaning o‘zida ham ipak ishlab chiqarila boshlagan.'
    ]},
    {sarlavha:'Talas jangi, qog‘oz va Bag‘dod', xatboshilar:[
      '751-yil iyulida Talas daryosi bo‘yida (hozirgi Qozog‘iston va Qirg‘iziston chegarasi yaqinida) Abbosiylar xalifaligi qo‘shini Tan imperiyasi qo‘shinini yenggan. Jang paytida qarluqlar Abbosiylar tomoniga o‘tgan. Bu jang Tan imperiyasining g‘arbga kengayishini to‘xtatgan.',
      'An’anaga ko‘ra, jangda asir olingan xitoy ustalari Samarqandda qog‘oz tayyorlashni boshlagan va «Samarqand qog‘ozi» islom olamida mashhur bo‘lgan. Biroq zamonaviy olimlar bu rivoyatni bahsli deb hisoblaydi: qog‘oz parchalari Turfon atrofida IV–V asrlarda ham topilgan, ya’ni qog‘oz mintaqaga ancha oldin kelgan bo‘lishi mumkin.',
      '762-yilda xalifa al-Mansur Dajla daryosi bo‘yida Bag‘dodga asos solgan. Shahar Sharq va G‘arb yo‘llarining yangi markaziga aylangan, «Bayt al-hikma» ilm markazida Muhammad al-Xorazmiy kabi olimlar ishlagan. Xitoy, Hindiston va O‘rta Osiyo bilimlari shu yerda arab tiliga tarjima qilingan.'
    ]},
    {sarlavha:'Mo‘g‘ullar, Amir Temur va yo‘lning so‘nishi', xatboshilar:[
      'XIII asrda Mo‘g‘ullar imperiyasi Xitoydan Qora dengizgacha bo‘lgan yerlarni birlashtirgan. Yo‘llarda yom — pochta bekatlari tizimi ishlagan. Dasht yo‘li — Urganch, Volga bo‘yidagi Saroy va Qora dengizdagi Kaffa orqali — faollashgan. Italiyalik savdogar F. Pegolotti (taxminan 1340-yil) Tanadan Xitoygacha bo‘lgan yo‘lni o‘z qo‘llanmasida tasvirlagan.',
      'Venetsiyalik Marko Polo otasi va amakisi bilan 1271-yilda yo‘lga chiqqan, taxminan 1275-yilda Xubilay saroyiga yetgan va 1295-yilda Venetsiyaga qaytgan. Uning hikoyalari 1298–1299-yillarda yozib olingan va Yevropada Osiyo haqidagi tasavvurlarga katta ta’sir qilgan.',
      'XIV asr oxirida Samarqand Amir Temur davlatining poytaxti bo‘lgan. Kastiliya qiroli Enrike III ning elchisi Rui Gonsales de Klavixo 1403-yil mayda yo‘lga chiqib, 1404-yil 4-sentabrda Samarqand chekkasiga yetib kelgan, 8-sentabrda Amir Temurga maktublarni topshirgan va 1406-yilda qaytgan. Uning kundaligida Samarqanddagi qurilishlar va bozorlar batafsil tasvirlangan.',
      'XV asrda quruqlikdagi yo‘lning ahamiyati kamaya boshlagan. 1453-yilda Konstantinopolni Usmonlilar egallagan va savdo yo‘llari ustidan nazorat kuchaygan. 1498-yil 20-mayda portugaliyalik Vasko da Gama Afrika atrofidan suzib, Hindistondagi Kalikutga yetib kelgan. Yevropa savdogarlari uchun dengiz yo‘li quruqlikdagi karvon yo‘lidan arzonroq bo‘lib qolgan.'
    ]},
    {sarlavha:'Bugungi meros va ko‘p uchraydigan xatolar', xatboshilar:[
      '2014-yilda Xitoy, Qozog‘iston va Qirg‘iziston taqdim etgan «Chan’an–Tyanshan yo‘lagi» YUNESKO Butunjahon merosi ro‘yxatiga kiritilgan: taxminan 5 000 km li bo‘lakdagi 33 obyekt. 2023-yil 17-sentabrda Tojikiston, O‘zbekiston va Turkmaniston taqdim etgan «Zarafshon–Qoraqum yo‘lagi» ham ro‘yxatga kiritilgan; uning uzunligi manbalarda 866 km (ba’zi manbalarda 886 km) deb beriladi. Yo‘lakka Poykent, Rabot-i Malik, Varaxsha kabi O‘zbekistondagi yodgorliklar kiradi.',
      'Birinchi keng tarqalgan xato — Ipak yo‘lini bitta chiziq deb o‘ylash. Aslida u ko‘p tarmoqli bo‘lgan va vaqt o‘tishi bilan o‘zgargan. Ikkinchi xato — yo‘l bo‘ylab faqat ipak tashilgan deb hisoblash: ziravor, qog‘oz, otlar, shisha, kumush idishlar ham tashilgan, eng muhimi — dinlar va bilimlar tarqalgan.',
      'Uchinchi xato — Marko Poloni yo‘lni «kashf etgan» deb aytish. Yo‘l undan bir necha yuz yil oldin ishlagan; Marko Polo Yevropada eng mashhur sayohatnoma muallifi bo‘lgan, xolos. To‘rtinchi xato — xaritadagi chegaralarni aniq deb qabul qilish: qadimgi va o‘rta asr davlatlarining chegaralari taxminiy va tez o‘zgargan.'
    ]}
  ],
  formulalar:[
    ['mil. av. 138 → mil. av. 126: 138 − 126 = 12 yil','Chjan Szyan safarining davomiyligi (qaytish 125 bo‘lsa — 13 yil)'],
    ['mil. av. 138 → 1498: 138 + 1498 − 1 = 1635 yil','Yo‘lning ochilishidan dengiz yo‘lining ochilishigacha («0-yil» yo‘q — 1 ayiriladi)'],
    ['1295 − 1271 = 24 yil','Marko Polo safarining davomiyligi'],
    ['mil. av. 138 → 751: 138 + 751 − 1 = 888 yil','Chjan Szyan safaridan Talas jangigacha'],
    ['VIII asr = 701–800-yillar','Asrni aniqlash: 751-yil — VIII asr']
  ],
  qiziqarli:[
    'Sanasi aniq yozilgan eng qadimgi bosma kitob — 868-yilgi «Olmos sutra» — Dunxuan yaqinidagi Mogao g‘orlaridan (kutubxona g‘ori, 1900-yilda topilgan) chiqqan.',
    'Samarqanddagi Afrosiyob devoriy rasmlari 1965-yilda topilgan; «Elchilar zali»da xitoy elchilari ipak ko‘tarib kelayotgani tasvirlangan.',
    'Pliniy Katta Rimdan har yili Hindiston, Xitoy va Arabistonga 100 million sestersiy ketayotganidan shikoyat qilgan.',
    'Mahmud Koshg‘ariy «Devonu lug‘otit turk» asarini 1072–1074-yillarda Bag‘dodda yozgan va 1077-yilda xalifaga taqdim etgan.',
    'Buxorodagi Minorai Kalon (1127) 45,6 m baland (ba’zi manbalarda uchi bilan 48 m); rivoyatga ko‘ra, Chingizxon uni buzdirmagan.',
    'Vasko da Gama 1497-yil 8-iyulda Lissabondan chiqib, 1498-yil 20-mayda Kalikutga yetgan — taxminan 10,5 oy yo‘l yurgan.'
  ],
  lugat:[
    ['Karvon','Yuk ortilgan tuya yoki otlarda birga yo‘l yuruvchi savdogarlar guruhi.'],
    ['Karvonsaroy','Yo‘l bo‘yidagi mehmonxona: savdogarlar, hayvonlar va mollar uchun joy.'],
    ['Rabot','Yo‘l bo‘yidagi mustahkamlangan bekat (masalan, Rabot-i Malik).'],
    ['Sardoba','Cho‘l yo‘llarida suv saqlash uchun gumbazli hovuz.'],
    ['Vosita savdo','Mol qo‘ldan qo‘lga o‘tib, bir necha savdogar orqali yetib borishi.'],
    ['Musson','Mavsumga qarab yo‘nalishini o‘zgartiradigan shamol; dengiz yo‘lida foydalanilgan.'],
    ['Sug‘dlar','Zarafshon va Qashqadaryo vohalarining qadimgi aholisi; mashhur savdogarlar.'],
    ['Dovon','Xitoy manbalarida Farg‘ona vodiysidagi davlat nomi.'],
    ['Yom','Mo‘g‘ullar davridagi pochta bekatlari tizimi.'],
    ['Elchilik','Bir davlat hukmdori boshqa davlatga yuborgan rasmiy vakillar.'],
    ['Seidenstraße','«Ipak yo‘li» — nemischa atama (F. fon Rixtgofen, 1877).'],
    ['Butunjahon merosi','YUNESKO ro‘yxatiga kiritilgan, butun insoniyat uchun qadrli yodgorlik.']
  ],
  manba:DAR+'; '+IPM+'; '+UNM+'; Sima Szyan «Tarixiy yozuvlar» (Shiji, 123-bob — Dovon haqida); Pliniy Katta «Tabiiy tarix» (XII kitob, 84); Prokopiy «Urushlar» (VIII kitob — ipak qurti haqida); '+XAR+'. Manbalar farqi: Chjan Szyan qaytishi mil. av. 126 yoki 125; ipak qurti Vizantiyaga 552 yoki 553–554; Zarafshon–Qoraqum yo‘lagi 866 yoki 886 km; Talasdan keyin qog‘oz haqidagi rivoyat bahsli — matnda ochiq aytilgan.',
  ishlanma:{
    sinf:'7–8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (xarita bilan ishlash)', usul:'Interaktiv xarita, «yo‘lovchi kundaligi», juftlikda ishlash, muammoli savol',
    maqsad:{talimiy:'Buyuk Ipak yo‘lining paydo bo‘lishi, asosiy yo‘nalishlari, shaharlari va davrlar bo‘yicha o‘zgarishini o‘rganish; O‘zbekiston hududining yo‘ldagi o‘rnini aniqlash.',
      tarbiyaviy:'Xalqlar o‘rtasidagi savdo va madaniy aloqalarning qadrini, ajdodlar merosiga hurmatni tarbiyalash.',
      rivojlantiruvchi:'Tarixiy xarita bilan ishlash, sabab-oqibat bog‘lash, turli manbalardagi sanalarni solishtirish ko‘nikmasini rivojlantirish.'},
    natijalar:['Ipak yo‘lining 4 yo‘nalishini xaritada ko‘rsatadi','O‘zbekistondagi kamida 4 ta Ipak yo‘li shahrini topadi','Chjan Szyan, Marko Polo, Klavixo safarlarini sanalari bilan aytadi','Yo‘l ahamiyati kamayish sabablarini tushuntiradi','Sanalar manbalarda nega farq qilishini izohlaydi'],
    jihozlar:['MAKON sahnasi «Buyuk Ipak yo‘li» (xarita)','Proyektor yoki interaktiv doska','Tarixiy atlas','Tarqatma: «yo‘lovchi kundaligi» jadvali (davr, shahar, mol, voqea)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Qog‘oz, uzum va buddaviylik Samarqand orqali qayoqqa ketgan?» — muammoli savol. Xaritada Samarqandni topish.','Taxmin aytadi.'],
      ['8–22','<b>Xarita bo‘ylab sayohat.</b> MAKON da 6 davrni ketma-ket ochadi: Chjan Szyan → to‘rt imperiya → sug‘dlar → Talas → mo‘g‘ullar → Temur va dengiz yo‘li. Chegaralar taxminiy ekanini tushuntiradi.','«Yo‘lovchi kundaligi»ni to‘ldiradi.'],
      ['22–30','<b>Yo‘nalishlar.</b> 4 yo‘nalishni yoqib, qaysi shaharlardan o‘tganini muhokama qiladi; juftliklar bitta yo‘nalish bo‘yicha «karvon marshruti» tuzadi.','Juftlikda marshrut tuzadi va aytib beradi.'],
      ['30–36','<b>Muammoli savol.</b> «Nega 1498-yildan keyin karvon yo‘li kuchsizlangan?» Talas rivoyati va ipak qurti sanalari misolida manbalarni solishtiradi.','Sabablarni sanaydi, manbalarni solishtiradi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON «Shaharni xaritada toping» amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Karvon','Birga yo‘l yuruvchi savdogarlar guruhi.'],['Karvonsaroy','Yo‘l bo‘yidagi mehmonxona.'],['Sug‘dlar','Zarafshon vohasining qadimgi savdogar xalqi.'],['Dovon','Farg‘ona vodiysi (Xitoy manbalarida).'],['Musson','Mavsumiy shamol.']],
    savollar:[['Chjan Szyan qachon yo‘lga chiqqan?','mil. av. 138'],['Talas jangi yili?','751'],['Marko Polo safari yillari?','1271–1295'],['Klavixo Samarqandga qachon kelgan?','1404-yil sentabr (4-sentabr — shahar chekkasi, 8-sentabr — Temur qabuli)'],['Zarafshon–Qoraqum yo‘lagi YUNESKO ro‘yxatiga qachon kiritilgan?','2023-yil']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) kontur xaritaga asosiy yo‘lni va O‘zbekistondagi 5 ta shaharni chizish; (2) Chjan Szyan safaridan (mil. av. 138) Klavixo elchiligigacha (1403) necha yil o‘tganini hisoblash (javob: 138 + 1403 − 1 = 1540 yil); (3) «Men — sug‘d savdogari» mavzusida qisqa hikoya yozish.',
    manba:DAR+'; '+IPM+'; '+UNM
  }
};

/* ============ DETAL KARTALARI: MAKON_DETAL.ipak[shahar] ============ */
const U14 = 'YUNESKO «Chan’an–Tyanshan yo‘lagi» (whc.unesco.org/en/list/1442)';
const U23 = 'YUNESKO «Zarafshon–Qoraqum yo‘lagi» (whc.unesco.org/en/list/1675)';
const W = 'Wikipedia (inglizcha)';
const IPAK = {
  chanan:{nom:'Chan’an (hozirgi Sian)', sarlavha2:'Xitoy · yo‘lning sharqiy boshlanishi',
    jadval:[['Hozirgi nomi','Sian (Xitoy, Shensi provinsiyasi)'],['Poytaxt bo‘lgan','G‘arbiy Xan (mil. av. II asr – mil. I asr boshi), Tan (618–907) va boshqa sulolalar'],['Ipak yo‘lida','Chjan Szyan shu yerdan yo‘lga chiqqan (mil. av. 138)'],['YUNESKO','Chan’an–Tyanshan yo‘lagi (2014): Veyyan saroyi, Damin saroyi, Katta va Kichik yovvoyi g‘oz pagodalari']],
    matn:'Tan davrida Chan’an dunyodagi eng yirik shaharlardan biri bo‘lgan; unda sug‘d, fors va arab savdogarlari yashagan. Aholisi taxminan bir million deb baholanadi (taxminiy, baholar turlicha). Xaritada XIV–XV asr davrida hozirgi nomi — Sian bilan berilgan (bu nom Min davrida paydo bo‘lgan).',
    manba:U14+'; '+W+' «Chang’an», «Xi’an»'},
  dunxuan:{nom:'Dunxuan', sarlavha2:'Xitoy · Tarim havzasiga kirish',
    jadval:[['Joyi','Gansu provinsiyasi, Gobi va Taklamakon oralig‘i'],['Ahamiyati','Yo‘l shu yerda Tarim havzasining shimoliy va janubiy tarmoqlariga ajralgan'],['Mogao g‘orlari','492 ta g‘or ibodatxona; YUNESKO ro‘yxatida — 1987'],['Kutubxona g‘ori','1900-yilda topilgan; 50 mingdan ortiq qo‘lyozma']],
    matn:'Kutubxona g‘oridan sanasi aniq yozilgan eng qadimgi bosma kitob — 868-yilgi «Olmos sutra» topilgan. Dunxuan yaqinidan IV asr boshiga oid sug‘dcha «qadimgi maktublar» ham topilgan — ular sug‘d savdogarlari faoliyatining eng qadimgi guvohliklaridan.',
    manba:'YUNESKO «Mogao Caves» (whc.unesco.org/en/list/440); '+W+' «Mogao Caves», «Diamond Sutra», «Ancient Letters»'},
  turfon:{nom:'Turfon', sarlavha2:'Xitoy (Shinjon) · shimoliy tarmoq',
    jadval:[['Tarmoq','Tarim havzasining shimoliy yo‘li; dasht yo‘li shu yerdan shimoli-g‘arbga ajralgan'],['Qadimgi shaharlar','Gaochang (Qocho) va Jiaohe xarobalari'],['YUNESKO','Chan’an–Tyanshan yo‘lagi tarkibida (2014)'],['Tabiati','Turfon botig‘i — dengiz sathidan past (eng past joyi taxminan −154 m)']],
    matn:'Turfon vohasi kariz — yer osti suv kanallari yordamida sug‘orilgan. Bu yerdan IV–V asrlarga oid qog‘oz parchalari topilgan; shuning uchun olimlar qog‘oz O‘rta Osiyoga 751-yildan ancha oldin kelgan deb hisoblaydi. IX–XIII asrlarda Turfon Qocho uyg‘ur davlatining markazi bo‘lgan (sanalar taxminiy).',
    manba:U14+'; '+W+' «Turpan», «Gaochang», «Battle of Talas» (qog‘oz haqida)'},
  xotan:{nom:'Xo‘tan', sarlavha2:'Xitoy (Shinjon) · janubiy tarmoq',
    jadval:[['Tarmoq','Tarim havzasining janubiy yo‘li (Taklamakon janubi)'],['Mashhur mahsuloti','Nefrit (yashma) — Xitoyga qadimdan tashilgan'],['Dini','Milodiy I ming yillikda buddaviylik markazi'],['Ipak','I asrdayoq ipak ma’lum bo‘lgan']],
    matn:'Xitoy rohibi Syuan Szan (VII asr) yozib qoldirgan rivoyatga ko‘ra, ipak qurti tuxumlarini Xo‘tanga xitoy malikasi bosh kiyimida yashirib olib kelgan. Bu — rivoyat, uning tarixiyligi isbotlanmagan.',
    manba:W+' «Kingdom of Khotan», «Sericulture»; Syuan Szan «G‘arbiy o‘lkalar haqida yozuvlar»'},
  qashqar:{nom:'Qashqar', sarlavha2:'Xitoy (Shinjon) · tarmoqlar tuguni',
    jadval:[['Ahamiyati','Tarimning shimoliy va janubiy tarmoqlari shu yerda qo‘shilgan; g‘arbga — Farg‘ona va Pomir dovonlari'],['Mashhur olim','Mahmud Koshg‘ariy — «Devonu lug‘otit turk» (Bag‘dodda 1072–1074-yillarda yozilgan, 1077-yilda xalifaga taqdim etilgan)'],['Idgoh masjidi','1442-yilda qurilgan (hozirgi binosi 1798-yilda qayta qurilgan)']],
    matn:'Qashqardan g‘arbga ikki asosiy yo‘l bo‘lgan: shimoli-g‘arbga — Farg‘ona vodiysi orqali Samarqandga, janubi-g‘arbga — Pomir va Qoraqurum dovonlari orqali Balx va Hindistonga.',
    manba:W+' «Kashgar», «Mahmud al-Kashgari», «Id Kah Mosque»'},
  dovon:{nom:'Dovon (Farg‘ona vodiysi)', sarlavha2:'O‘zbekiston · «samoviy otlar» o‘lkasi',
    jadval:[['Nomi','Dovon — Xitoy manbalarida Farg‘ona vodiysidagi davlat'],['Chjan Szyan','Mil. av. II asrda shu yerga yetib kelgan'],['Sima Szyan','«Yetmishdan ortiq shahar», sholi, bug‘doy, uzum sharobi'],['Harbiy yurish','Xan qo‘shini «samoviy otlar» uchun mil. av. 104–101-yillarda']],
    matn:'Farg‘onaning «qon terlovchi» otlari Xitoyda juda qadrlangan. Xan imperiyasi ularni olish uchun Dovonga ikki marta qo‘shin yuborgan. Xitoy manbalariga ko‘ra, uzum va beda (ot yemi) ham shu davrda g‘arbdan Xitoyga olib borilgan. Dovon poytaxtining aniq joyi olimlar orasida bahsli.',
    manba:'Sima Szyan «Tarixiy yozuvlar» (Shiji, 123-bob); '+W+' «Dayuan», «War of the Heavenly Horses», «Zhang Qian»'},
  shosh:{nom:'Shosh (Choch, Toshkent)', sarlavha2:'O‘zbekiston · Sirdaryo o‘rta oqimi',
    jadval:[['Qadimgi nomlari','Choch, Shosh, Binkat (manbalarda)'],['Joyi','Chirchiq vohasi; dasht yo‘li va Farg‘ona yo‘li tutashgan joy'],['Syuan Szan','VII asrda bu o‘lkani «Chjeshi» deb yozgan'],['Bugun','O‘zbekiston poytaxti — Toshkent']],
    matn:'Shosh vohasi ko‘chmanchi dasht bilan dehqonchilik vohalari chegarasida joylashgan. Shu sababli bu yerda chorvadorlar va dehqonlar, turk va sug‘d savdogarlari uchrashgan. Xaritada davr qanday bo‘lishidan qat’i nazar, qadimgi nomi — Shosh berilgan.',
    manba:'O‘zbekiston tarixi darsliklari; '+W+' «Tashkent», «Chach»'},
  taroz:{nom:'Taroz (Talas)', sarlavha2:'Qozog‘iston · Talas daryosi bo‘yi',
    jadval:[['Joyi','Talas daryosi vodiysi, Yettisuvning g‘arbi'],['Muhim voqea','751-yil iyulida Talas jangi (aniq jang joyi bahsli)'],['Tomonlar','Abbosiylar xalifaligi — Tan imperiyasi'],['YUNESKO','Yaqinidagi O‘rta asr yodgorliklari (masalan, Oqirtosh) Chan’an–Tyanshan yo‘lagi tarkibida (2014)']],
    matn:'Talas jangida qarluqlar Abbosiylar tomoniga o‘tgan va Tan qo‘shini yengilgan. Bu jang Tan imperiyasining O‘rta Osiyoga kengayishini to‘xtatgan. An’anaga ko‘ra, asirlar orqali qog‘oz tayyorlash Samarqandga o‘tgan (rivoyat bahsli).',
    manba:U14+'; '+W+' «Taraz», «Battle of Talas»'},
  samarqand:{nom:'Samarqand', sarlavha2:'O‘zbekiston · Sug‘dning bosh shahri',
    jadval:[['Qadimgi nomi','Marokanda (yunon manbalarida); qadimgi shahar xarobalari — Afrosiyob'],['Afrosiyob rasmlari','VII asr o‘rtasi (648–651 yoki 660-yillar — manbalarda turlicha), «Elchilar zali»'],['Qog‘oz','VIII asrdan «Samarqand qog‘ozi» mashhur (Talas rivoyati — bahsli)'],['Poytaxt','Amir Temur davlati (1370–1405)'],['YUNESKO','«Samarqand — madaniyatlar chorrahasi», 2001']],
    matn:'Afrosiyob devoriy rasmlarida hukmdor Varxuman huzuriga Xitoy, Koreya, Eron va boshqa mamlakatlardan kelgan elchilar tasvirlangan: xitoylar ipak ko‘tarib kelmoqda. Kastiliya elchisi Klavixo 1404-yil 4-sentabrda Samarqand chekkasiga yetib kelgan (8-sentabrda Temur qabul qilgan) va 21-noyabrgacha qolgan; uning kundaligida Amir Temur qurilishlari tasvirlangan.',
    manba:'YUNESKO (whc.unesco.org/en/list/603); '+W+' «Afrasiab murals», «Ruy González de Clavijo», «Samarkand»'},
  buxoro:{nom:'Buxoro', sarlavha2:'O‘zbekiston · Zarafshon vohasi',
    jadval:[['YUNESKO','Buxoro tarixiy markazi — 1993'],['Minorai Kalon','1127, Qoraxoniy Arslonxon; 45,6 m (uchi bilan 48 m — manbalarda)'],['Ismoil Somoniy maqbarasi','X asr'],['Yaqinida','Poykent — Zarafshon–Qoraqum yo‘lagi (2023) tarkibida']],
    matn:'Buxoro Somoniylar poytaxti (IX–X asr) va keyingi asrlarda yirik savdo va ilm markazi bo‘lgan. Buxoro yaqinidagi qadimiy Poykent shahri, Varaxsha va Rabot-i Malik bilan birga, 2023-yilda YUNESKO ro‘yxatiga kiritilgan Zarafshon–Qoraqum yo‘lagining qismi.',
    manba:'YUNESKO (whc.unesco.org/en/list/602); '+U23+'; '+W+' «Kalyan Minaret»'},
  termiz:{nom:'Termiz', sarlavha2:'O‘zbekiston · Amudaryo kechuvi',
    jadval:[['Ahamiyati','Amudaryodan o‘tish joyi; Hindiston yo‘lining boshlanishi'],['Buddaviy yodgorliklar','Qoratepa, Fayoztepa — asosan Kushon davri (I–III asr)'],['Syuan Szan','VII asrda bu yerda buddaviy monastirlar borligini yozgan']],
    matn:'Kushon podsholigi davrida Termiz buddaviylik markazlaridan biri bo‘lgan. Hindiston va Baqtriyadan kelgan rohiblar shu yerdan shimolga, Samarqand va Tarim havzasiga, keyin Xitoyga yo‘l olgan.',
    manba:'O‘zbekiston tarixi darsliklari; '+W+' «Termez», «Fayaz Tepe», «Kara Tepe»'},
  balx:{nom:'Balx (Baqtra)', sarlavha2:'Afg‘oniston · Baqtriya markazi',
    jadval:[['Qadimgi nomi','Baqtra — Baqtriyaning bosh shahri'],['Laqabi','Arab mualliflarida «shaharlar onasi»'],['Vayron bo‘lishi','1220-yilda Chingizxon qo‘shini'],['Mashhur kishi','Jaloliddin Rumiy (1207; tug‘ilgan joyi manbalarda Balx yoki Vaxsh)']],
    matn:'Balx Hindiston yo‘lining asosiy chorrahasi bo‘lgan: shimolga — Termiz va Samarqandga, janubga — Hindikush dovonlari orqali Kobul va Gandxaraga yo‘l ketgan. Termiz bilan Balx bir-biriga yaqin — xaritada ularning belgilari deyarli yonma-yon.',
    manba:W+' «Balkh», «Rumi»'},
  marv:{nom:'Marv', sarlavha2:'Turkmaniston · Qoraqum chekkasidagi voha',
    jadval:[['YUNESKO','«Qadimgi Marv» davlat tarixiy-madaniy bog‘i — 1999'],['Ahamiyati','Eron va Movarounnahr orasidagi asosiy bekat'],['Saljuqiylar davri','XII asr — Sulton Sanjar maqbarasi'],['Vayron bo‘lishi','1221-yilda mo‘g‘ullar']],
    matn:'2023-yilda YUNESKO ro‘yxatiga kiritilgan Zarafshon–Qoraqum yo‘lagi Zarafshon vodiysidan Qoraqum cho‘li orqali Marv vohasiga olib borgan qadimgi karvon yo‘li bo‘ylab joylashgan.',
    manba:'YUNESKO (whc.unesco.org/en/list/886); '+U23+'; '+W+' «Merv»'},
  urganch:{nom:'Urganch (Ko‘hna Urganch)', sarlavha2:'Turkmaniston · Xorazm poytaxti',
    jadval:[['Hozirgi joyi','Ko‘hna Urganch (Turkmaniston)'],['Poytaxt','Xorazmshohlar davlati'],['YUNESKO','2005'],['Qutlug‘ Temur minorasi','taxminan 60 m; qurilgan vaqti bahsli (1011-yil yoki XIV asr)'],['Vayron bo‘lishi','1221 — mo‘g‘ullar, 1388 — Amir Temur']],
    matn:'Urganch dasht yo‘lining muhim tuguni bo‘lgan: bu yerdan Volga bo‘yidagi Saroyga va Qora dengizga, sharqda O‘tror va Yettisuvga karvonlar yurgan.',
    manba:'YUNESKO «Kunya-Urgench» (whc.unesco.org/en/list/1199); '+W+' «Konye-Urgench», «Kutlug Timur Minaret»'},
  taxila:{nom:'Taksila', sarlavha2:'Pokiston · Gandxara markazi',
    jadval:[['Joyi','Islomobod yaqinida'],['YUNESKO','1980'],['Ahamiyati','Hindiston yo‘lining janubiy chekkasi; buddaviylik va yunon-buddaviy san’at markazi'],['Davri','xaritada mil. av. II asr – VII asr']],
    matn:'Gandxara orqali Hindiston, Baqtriya va O‘rta Osiyo bog‘langan. Kushonlar davrida bu yerda yaratilgan Budda haykallari yunon san’ati ta’sirida bo‘lgan. Shahar keyinroq inqirozga uchragan (sanasi taxminiy, taxminan V asr).',
    manba:'YUNESKO «Taxila» (whc.unesco.org/en/list/139); '+W+' «Taxila», «Gandhara»'},
  ktesifon:{nom:'Ktesifon', sarlavha2:'Iroq · Parfiya va Sosoniylar poytaxti',
    jadval:[['Joyi','Dajla (Tigr) bo‘yi, Bag‘dodning janubi-sharqida'],['Poytaxt','Parfiya, keyin Sosoniylar'],['Yodgorlik','Toqi Kisro — ulkan g‘ishtin ayvon (VI asr)'],['Tugashi','637-yilda arablar egallagan']],
    matn:'Ktesifon orqali Eron, Mesopotamiya va O‘rta yer dengizi sohillari orasidagi savdo o‘tgan. 762-yilda yaqinida Bag‘dodga asos solingach, markaz Bag‘dodga ko‘chgan — shuning uchun xaritada VIII asrdan Ktesifon o‘rniga Bag‘dod ko‘rsatilgan.',
    manba:W+' «Ctesiphon», «Taq Kasra»'},
  bagdod:{nom:'Bag‘dod', sarlavha2:'Iroq · Abbosiylar poytaxti',
    jadval:[['Asos solingan','762, xalifa al-Mansur («Doira shahar»)'],['Ilm markazi','«Bayt al-hikma»; Muhammad al-Xorazmiy shu yerda ishlagan'],['Qulashi','1258 — mo‘g‘ullar (Xulagu) egallagan']],
    matn:'Bag‘dod dengiz yo‘li (Basra orqali Fors qo‘ltig‘i) va quruqlik yo‘li (Eron orqali O‘rta Osiyo) tutashgan joyda bo‘lgan. Xitoy qog‘ozi, hind raqamlari va yunon kitoblari shu yerda islom olamiga tarqalgan.',
    manba:W+' «Baghdad», «Round city of Baghdad», «House of Wisdom», «Siege of Baghdad (1258)»'},
  antioxiya:{nom:'Antioxiya', sarlavha2:'Turkiya (Antakya) · O‘rta yer dengizi sohili',
    jadval:[['Asos solingan','mil. av. 300, Salavk I'],['Rim davrida','Suriya viloyatining markazi, imperiyaning yirik shaharlaridan'],['Vayron bo‘lishi','1268 — Mamluklar (sulton Baybars)'],['Hozir','Antakya (Turkiya)']],
    matn:'Antioxiya quruqlikdagi karvon yo‘lining g‘arbiy chekkalaridan biri bo‘lgan: Eron va Mesopotamiyadan kelgan mollar shu yerdan dengiz orqali Rimga va boshqa shaharlarga jo‘natilgan.',
    manba:W+' «Antioch», «Siege of Antioch (1268)»'},
  konstantinopol:{nom:'Konstantinopol (Istanbul)', sarlavha2:'Turkiya · Vizantiya poytaxti',
    jadval:[['Asos solingan','330-yil 11-may (Konstantin I), qadimgi Vizantiy o‘rnida'],['Ayasofya','537-yilda qurib bitkazilgan'],['Ipak','VI asr o‘rtasida ipak qurti shu yerga olib kelingan (552 yoki 553–554)'],['Qulashi','1453-yil 29-may — Usmonlilar']],
    matn:'568-yilda sug‘d savdogari Maniax boshchiligidagi Turk xoqonligi elchilari Konstantinopolga kelib, ipak savdosi haqida muzokara qilgan (Menandr xabari). 1453-yildan keyin shahar Usmonlilar poytaxti — Istanbul bo‘lgan.',
    manba:W+' «Constantinople», «Byzantine silk», «Fall of Constantinople»'},
  rim:{nom:'Rim', sarlavha2:'Italiya · yo‘lning g‘arbiy chekkasi',
    jadval:[['Ipak','Rimda juda qimmat hashamat moli'],['Xitoyliklar nomi','Rimliklar Xitoy xalqini «seres» («ipak xalqi») deb atagan'],['Rim — Xitoy manbalarida','Datsin (Daqin)'],['Pliniy Katta','«Tabiiy tarix» (I asr): har yili 100 mln sestersiy Sharqqa ketadi']],
    matn:'Rim va Xitoy bir-birini faqat eshitib bilgan: mollar ko‘plab vositachilar — parfiyaliklar, kushonlar, sug‘dlar orqali o‘tgan. 97-yilda Xan elchisi Gan In Rimga borish uchun Fors qo‘ltig‘igacha yetgan, lekin qaytib ketgan.',
    manba:'Pliniy Katta «Tabiiy tarix» XII, 84; '+W+' «Sino-Roman relations», «Gan Ying», «Seres»'},
  venetsiya:{nom:'Venetsiya', sarlavha2:'Italiya · savdo respublikasi',
    jadval:[['Mashhur fuqarosi','Marko Polo (safari 1271–1295)'],['Kitob','«Dunyo tavsifi» — 1298–1299-yillarda Genuya qamoqxonasida Rustikello da Piza yozib olgan'],['Savdo yo‘llari','Qora dengizdagi Tana, Konstantinopol, Iskandariya orqali']],
    matn:'Venetsiya savdogarlari Sharq mollari — ipak, ziravorlar — savdosida yirik vositachi bo‘lgan. Marko Polo otasi Nikkolo va amakisi Maffeo bilan 1271-yilda yo‘lga chiqqan va 24 yildan keyin, 1295-yilda qaytgan.',
    manba:W+' «Marco Polo», «Republic of Venice»'},
  iskandariya:{nom:'Iskandariya', sarlavha2:'Misr · Qizil dengiz savdosi darvozasi',
    jadval:[['Asos solingan','mil. av. 331, Makedoniyalik Aleksandr'],['Dengiz yo‘lida','Qizil dengiz va Hind okeanidan kelgan mollar O‘rta yer dengiziga shu yerdan chiqqan'],['O‘rta asrlarda','Ziravorlar savdosining yirik bozori (Venetsiya savdogarlari bilan)']],
    matn:'Rim davrida misrlik va yunon dengizchilari mussonlar yordamida Qizil dengizdan Hindistonga suzgan. Mollar Qizil dengiz portlaridan Nilgacha karvonda, keyin Iskandariyaga keltirilgan (xaritada bu yo‘l soddalashtirilib, Suvaysh orqali ko‘rsatilgan).',
    manba:W+' «Alexandria», «Indo-Roman trade relations»'},
  guanchjou:{nom:'Guanchjou', sarlavha2:'Xitoy · dengiz yo‘lining porti',
    jadval:[['Ahamiyati','Dengiz Ipak yo‘lining Xitoydagi asosiy porti'],['Tan davri','Arab va fors savdogarlari jamoasi yashagan'],['758-yil','Arab va fors dengizchilari shaharni talagan'],['Xuayshen masjidi','an’anaga ko‘ra VII asr; olimlar keyinroq deb hisoblaydi (taxminiy)']],
    matn:'Guanchjoudan kemalar Janubiy Xitoy dengizi va Malakka bo‘g‘ozi orqali Hindistonga, u yerdan Fors qo‘ltig‘i va Qizil dengizga suzgan. Xitoy ipagi va chinnisi dengiz yo‘li bilan ham g‘arbga yetib borgan.',
    manba:W+' «Guangzhou», «Sack of Guangzhou (758)», «Huaisheng Mosque»'},
  kalikut:{nom:'Kalikut (Kojikode)', sarlavha2:'Hindiston · Malabar sohili',
    jadval:[['Hozir','Kojikode (Kerala shtati)'],['Mashhur moli','qora qalampir va boshqa ziravorlar'],['Chjen Xe','Min floti (1405–1433-yillardagi safarlar) shu yerda to‘xtagan'],['Vasko da Gama','1498-yil 20-mayda yetib kelgan']],
    matn:'Vasko da Gamaning Afrika atrofidan Kalikutga yetib kelishi Yevropa va Hindiston o‘rtasida to‘g‘ridan-to‘g‘ri dengiz yo‘lini ochgan. Bu O‘rta Osiyo va Yaqin Sharq orqali o‘tadigan karvon savdosining ahamiyati kamayishiga sabab bo‘lgan omillardan biri.',
    manba:W+' «Kozhikode», «Vasco da Gama», «Zheng He»'}
};
/* detallar.js MAKON_DETAL ni qaytadan yaratadi (window.MAKON_DETAL = {...}) — shuning uchun kartalar
   hozir ham, sahifa to‘liq yuklangach ham qo‘shiladi. */
const qosh = ()=>{ const D = window.MAKON_DETAL = window.MAKON_DETAL || {}; D.ipak = Object.assign(D.ipak || {}, IPAK); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
window.MAKON_IPAK_DETAL = IPAK;
})();
