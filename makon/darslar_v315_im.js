/* MAKON v3.15 — guruh «im»: INFORMATIKA (6 dars) va MUSIQA (6 dars) + detal kartalari (MAKON_DETAL.im_*).
   detallar2.js dan KEYIN yuklanadi. Sahnalar: lib/sahna_v315_im.js (MAKON_SAHNA['im_…']).
   Qoida: faqat manbali fakt; manbalar farq qilsa — matnda ikkalasi; tekshirilmagani «taxminiy». */
(function(){
'use strict';
const FAN = window.MAKON_FAN, L = window.MAKON_DARS;
if(!FAN || !L) return;
const F = id=>FAN.find(f=>f.id===id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom===nom || x.dars===dars || (eskiNomlar||[]).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
const DT = {};
{
/* ================= INFORMATIKA (v3.15, guruh im) — 6 dars ================= */
const IMI_W = 'Wikipedia (inglizcha)';
const IMI_DAR = 'O‘zbekiston umumiy o‘rta ta’lim maktablari uchun «Informatika va axborot texnologiyalari» darsliklari (5–11-sinflar, amaldagi nashrlar)';

/* ---------------- 1. KOMPYUTER QURILMALARI (5-sinf) ---------------- */
bogla('informatika', 'Kompyuter qurilmalari', 'info-kompyuter', 'Tizim bloki ichida: protsessor, tezkor xotira, SSD va HDD, videokarta; kirish va chiqish qurilmalari');

L['info-kompyuter'] = {
  fan:'informatika', sinf:'5-sinf', qisqaNom:'Kompyuter qurilmalari', nom:'Kompyuter qurilmalari',
  qisqa:'5-sinf · Informatika · ochiq tizim bloki 3D da',
  sahna:'im_kompyuter',
  kor:{
    sarlavha:'Kompyuter nimalardan tuzilgan?',
    matn:'Kompyuter — axborotni qabul qiladigan, saqlaydigan, qayta ishlaydigan va natijani chiqaradigan qurilmalar majmuasi. Sahnada yon qopqog‘i olingan tizim bloki turibdi: ichida ona plata, protsessor va uning sovutgichi, tezkor xotira (OZU), SSD va HDD disklar, videokarta hamda quvvat bloki bor. Tashqarida — kirish qurilmalari (klaviatura, sichqoncha, mikrofon) va chiqish qurilmalari (monitor, karnaylar, printer). Har bir qismni bosib, uning vazifasi bilan tanishing.',
    punktlar:[
      '<b>Protsessor</b> — hisob-kitob va boshqaruvni bajaradigan asosiy mikrosxema',
      '<b>Xotira:</b> tezkor (OZU) — ish paytida, o‘chirilsa tozalanadi; doimiy (SSD, HDD) — fayllar saqlanadi',
      '<b>Kirish qurilmalari</b> axborotni kompyuterga kiritadi, <b>chiqish qurilmalari</b> natijani odamga ko‘rsatadi',
      '<b>Ona plata</b> barcha qismlarni bir-biriga ulaydi, <b>quvvat bloki</b> ularni tok bilan ta’minlaydi'
    ]
  },
  bolimlar:[
    {sarlavha:'Qurilmalar guruhlari', jadval:[
      ['Kirish','klaviatura, sichqoncha, mikrofon, skaner, veb-kamera, sensorli ekran'],
      ['Chiqish','monitor, karnay va quloqchin, printer, proyektor'],
      ['Qayta ishlash','protsessor (markaziy), videokarta (grafika protsessori)'],
      ['Saqlash','tezkor xotira (OZU), SSD, HDD, fleshka, xotira kartasi'],
      ['Ta’minot va bog‘lash','ona plata, quvvat bloki, kabellar, korpus']
    ], matn:'Ba’zi qurilmalar ham kirish, ham chiqish vazifasini bajaradi: masalan, sensorli ekran tasvirni ko‘rsatadi va barmoq tegishini qabul qiladi.'},
    {sarlavha:'Tezkor va doimiy xotira', jadval:[
      ['Tezkor xotira (OZU, RAM)','ishlayotgan dasturlar va ma’lumotlar; juda tez; tok o‘chsa tozalanadi'],
      ['SSD','flesh-xotira mikrosxemalari; harakatlanuvchi qismi yo‘q; tez va zarbaga chidamli'],
      ['HDD','aylanuvchi magnit disklar va o‘qish kallagi; arzonroq, lekin sekinroq'],
      ['Umumiy qoida','hajm — gigabayt (GB) va terabayt (TB) larda o‘lchanadi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Kompyuter tashqaridan', matn:'Kompyuter tizim bloki va unga ulangan qurilmalardan iborat. Monitor, klaviatura, sichqoncha, karnaylar, mikrofon va printerni toping. Ularning hammasi kabel yoki simsiz aloqa orqali tizim blokiga ulanadi.', holat:{korinish:'hammasi', qism:null, guruh:null}},
    {sarlavha:'Kirish qurilmalari', matn:'Klaviatura harf va buyruqlarni, sichqoncha ekrandagi ko‘rsatkich harakatini, mikrofon ovozni kompyuterga kiritadi. Ular odamdan kompyuterga axborot uzatadi.', holat:{korinish:'hammasi', qism:null, guruh:'kirish'}},
    {sarlavha:'Chiqish qurilmalari', matn:'Monitor tasvirni, karnaylar tovushni ko‘rsatadi, printer matn va rasmni qog‘ozga chiqaradi. Ular kompyuterdan odamga axborot uzatadi.', holat:{korinish:'hammasi', qism:null, guruh:'chiqish'}},
    {sarlavha:'Tizim bloki ichida: ona plata va protsessor', matn:'Ona plata — hamma qismlar ulanadigan katta plata. Uning markazida protsessor turadi: u dastur buyruqlarini bajaradi. Protsessor ishlaganda qiziydi, shuning uchun ustiga radiator va ventilyatorli sovutgich o‘rnatiladi.', holat:{korinish:'ichki', qism:'protsessor', guruh:null}},
    {sarlavha:'Xotira: OZU, SSD, HDD', matn:'Tezkor xotira (OZU) planklari protsessor yonida joylashgan — ular ayni paytda ishlayotgan ma’lumotni saqlaydi va tok o‘chsa tozalanadi. Fayllar doimiy xotirada — SSD yoki HDD da saqlanadi.', holat:{korinish:'ichki', qism:'ozu', guruh:'xotira'}},
    {sarlavha:'Videokarta va quvvat bloki', matn:'Videokarta monitor uchun tasvirni hisoblaydi va o‘yin, video, 3D grafikada katta ish bajaradi. Quvvat bloki rozetkadagi o‘zgaruvchan tokni kompyuter qismlariga kerakli past kuchlanishli o‘zgarmas tokka aylantiradi.', holat:{korinish:'ichki', qism:'videokarta', guruh:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Qurilmani toping', holat:{korinish:'hammasi', qism:null, guruh:null},
    topshiriqlar:[
      {shart:'Kompyuterning «miyasi» — buyruqlarni bajaradigan <b>protsessorni</b> bosing (tizim bloki ichida, sovutgich ostida).', hodisa:'im-qism', kod:"ev.nom==='protsessor'", izoh:'To‘g‘ri — <b>protsessor</b>. U dastur buyruqlarini birin-ketin bajaradi.'},
      {shart:'Tok o‘chganda ma’lumoti tozalanadigan <b>tezkor xotirani (OZU)</b> bosing.', hodisa:'im-qism', kod:"ev.nom==='ozu'", izoh:'To‘g‘ri — <b>tezkor xotira (OZU)</b>. Shuning uchun ishni diskka saqlab qo‘yish kerak.'},
      {shart:'Istalgan <b>kirish qurilmasini</b> bosing.', hodisa:'im-qism', kod:"ev.vazifa==='kirish'", izoh:'To‘g‘ri — bu <b>kirish qurilmasi</b>: u axborotni odamdan kompyuterga uzatadi.'},
      {shart:'Istalgan <b>chiqish qurilmasini</b> bosing.', hodisa:'im-qism', kod:"ev.vazifa==='chiqish'", izoh:'To‘g‘ri — bu <b>chiqish qurilmasi</b>: u natijani odamga ko‘rsatadi yoki eshittiradi.'},
      {shart:'Fayllar uzoq saqlanadigan <b>doimiy xotira</b> qurilmasini (SSD yoki HDD) bosing.', hodisa:'im-qism', kod:"ev.xotira==='doimiy'", izoh:'To‘g‘ri — <b>doimiy xotira</b>. Kompyuter o‘chirilsa ham fayllar saqlanib qoladi.'}
    ]},
  test:[
    {s:'Dastur buyruqlarini bajaradigan, kompyuterning «miyasi» deb ataladigan qurilma qaysi?', v:['Videokarta','Protsessor','Quvvat bloki','Ona plata'], t:1, izoh:'<b>Protsessor</b> (markaziy protsessor) — hisob-kitob va boshqaruvni bajaradi. Videokarta asosan tasvirni hisoblaydi.'},
    {s:'Kompyuter o‘chirilganda ma’lumoti tozalanib ketadigan xotira qaysi?', v:['SSD','HDD','Tezkor xotira (OZU)','Fleshka'], t:2, izoh:'<b>Tezkor xotira (OZU)</b> faqat tok bor paytda ma’lumot saqlaydi. SSD, HDD va fleshka — doimiy xotira.'},
    {s:'Quyidagilardan qaysi biri kirish qurilmasi?', v:['Monitor','Printer','Karnay','Klaviatura'], t:3, izoh:'<b>Klaviatura</b> harf va buyruqlarni kompyuterga kiritadi. Monitor, printer va karnay — chiqish qurilmalari.'},
    {s:'Quyidagilardan qaysi biri chiqish qurilmasi?', v:['Sichqoncha','Mikrofon','Printer','Skaner'], t:2, izoh:'<b>Printer</b> natijani qog‘ozga chiqaradi. Sichqoncha, mikrofon va skaner — kirish qurilmalari.'},
    {s:'Kompyuterning barcha qismlari ulanadigan asosiy plata qanday ataladi?', v:['Ona plata','Videokarta','Tarmoq kartasi','Xotira planki'], t:0, izoh:'<b>Ona plata</b> — protsessor, xotira, disklar va kengaytirish platalari ulanadigan asosiy plata.'},
    {s:'Harakatlanuvchi qismi yo‘q, flesh-xotira mikrosxemalariga asoslangan doimiy xotira qaysi?', v:['HDD','SSD','OZU','Kesh xotira'], t:1, izoh:'<b>SSD</b> ichida aylanuvchi disk yo‘q, shuning uchun u HDD dan tezroq va zarbaga chidamliroq.'},
    {s:'Rozetkadagi o‘zgaruvchan tokni kompyuter qismlari uchun past kuchlanishli o‘zgarmas tokka aylantiradigan qism qaysi?', v:['Quvvat bloki','Protsessor','Sovutgich','Ona plata'], t:0, izoh:'<b>Quvvat bloki</b> 220–230 V o‘zgaruvchan tokni 12 V, 5 V va 3,3 V o‘zgarmas tokka aylantiradi.'},
    {s:'Protsessorning takt chastotasi qanday birlikda o‘lchanadi?', v:['Gigabayt (GB)','Gigagers (GHz)','Vatt (W)','Piksel'], t:1, izoh:'Takt chastotasi <b>gigagers (GHz)</b> da o‘lchanadi: 1 GHz — sekundiga 1 milliard takt. Gigabayt — xotira hajmi birligi.'},
    {s:'Kompyuter sichqonchasini kim ixtiro qilgan?', v:['Charlz Bebbij','Duglas Engelbart','Bill Geyts','Alan Tyuring'], t:1, izoh:'<b>Duglas Engelbart</b> 1960-yillarda ixtiro qilgan va 1968-yil 9-dekabrdagi mashhur namoyishda ko‘rsatgan.'},
    {s:'Qaysi qurilma ham kirish, ham chiqish vazifasini bajaradi?', v:['Sensorli ekran','Klaviatura','Karnay','Printer'], t:0, izoh:'<b>Sensorli ekran</b> tasvirni ko‘rsatadi (chiqish) va barmoq tegishini qabul qiladi (kirish).'},
    {tur:'3d', s:'Sahnada <b>protsessorni</b> bosing (tizim bloki ichida, ona plata markazida).', hodisa:'im-qism', kalit:'nom', togri:['protsessor'], v:['Protsessor','boshqa qism'], t:0,
     izoh:'<b>Protsessor</b> ona plataning markazida, sovutgich ostida joylashgan. U dastur buyruqlarini bajaradi.'},
    {tur:'3d', s:'Sahnada istalgan <b>kirish qurilmasini</b> bosing.', hodisa:'im-qism', kalit:'vazifa', togri:['kirish'], v:['Kirish qurilmasi (klaviatura, sichqoncha, mikrofon)','boshqa qurilma'], t:0,
     izoh:'<b>Kirish qurilmalari</b> — klaviatura, sichqoncha, mikrofon: ular axborotni kompyuterga kiritadi.'}
  ],
  yordamchi:[
    {s:'OZU va SSD ning farqi nimada?', j:'OZU (tezkor xotira) juda tez, lekin faqat kompyuter yoqilgan paytda ma’lumot saqlaydi. SSD sekinroq, lekin fayllarni doimiy saqlaydi — kompyuter o‘chirilsa ham ular yo‘qolmaydi. Dastur ishga tushganda diskdan OZU ga yuklanadi.', kalit:['ozu','ssd','farq','xotira']},
    {s:'Nega protsessorga sovutgich kerak?', j:'Protsessor ishlaganda elektr energiyasining bir qismi issiqlikka aylanadi. Qizib ketsa, u sekinlashadi yoki o‘chib qoladi. Radiator issiqlikni tarqatadi, ventilyator esa havoni haydab uni sovitadi.', kalit:['sovutgich','protsessor','issiq','ventilyator']},
    {s:'Videokarta nima uchun kerak?', j:'Videokarta monitorda ko‘rinadigan tasvirni hisoblaydi. Unda o‘zining grafika protsessori va xotirasi bor. Oddiy ishlar uchun protsessorga o‘rnatilgan grafika ham yetadi, 3D o‘yin va video montaj uchun alohida videokarta foydali.', kalit:['videokarta','grafika','tasvir']}
  ],
  maqola:[
    {sarlavha:'Kompyuter — qurilmalar jamoasi', xatboshilar:[
      'Kompyuter bitta buyum emas, balki birgalikda ishlaydigan qurilmalar jamoasi. Har bir qurilmaning o‘z vazifasi bor: biri axborotni kiritadi, biri uni qayta ishlaydi, biri saqlaydi, biri natijani chiqaradi. Bu vazifalar odamning ish tartibiga o‘xshaydi: ko‘z va quloq — kirish, miya — qayta ishlash, xotira — saqlash, og‘iz va qo‘l — chiqish.',
      'Zamonaviy kompyuterlarning tuzilishi 1945-yilda matematik Jon fon Neyman yozgan hisobotdagi g‘oyalarga asoslanadi: dastur va ma’lumot bitta xotirada saqlanadi, protsessor buyruqlarni xotiradan birin-ketin olib bajaradi. Bu tamoyil hozir ham kompyuter, noutbuk va telefonlarda ishlaydi.',
      'Stol kompyuterining asosiy qismi — tizim bloki. Unga kabel yoki simsiz aloqa orqali monitor, klaviatura, sichqoncha va boshqa qurilmalar ulanadi. Noutbuk va planshetda esa bularning hammasi bitta korpusga joylashtirilgan.'
    ]},
    {sarlavha:'Tizim bloki ichida nima bor?', xatboshilar:[
      'Tizim blokining ichidagi eng katta qism — ona plata. Unga protsessor, tezkor xotira planklari, disklar va videokarta ulanadi, ular orasidagi ma’lumot ona plata yo‘laklari (shinalar) orqali uzatiladi. Protsessor — milliardlab mayda tranzistorlardan iborat mikrosxema; u sekundiga milliardlab takt bajaradi, shuning uchun takt chastotasi gigagerslarda (GHz) o‘lchanadi.',
      'Tezkor xotira (OZU, inglizcha RAM) ayni paytda ishlayotgan dasturlarni saqlaydi. U juda tez, lekin tok o‘chsa tozalanadi. Fayllar doimiy xotirada saqlanadi: HDD — aylanuvchi magnit disklar va o‘qish kallagidan iborat qattiq disk, SSD — harakatlanuvchi qismi yo‘q flesh-xotira. SSD ancha tez ishlaydi, HDD esa bir xil hajmda odatda arzonroq.',
      'Videokarta tasvirni hisoblaydi va monitorga yuboradi. Quvvat bloki rozetkadagi o‘zgaruvchan tokni (O‘zbekistonda 220–230 V, 50 Hz) kompyuter qismlari uchun past kuchlanishli o‘zgarmas tokka — 12 V, 5 V va 3,3 V ga aylantiradi. Qizigan qismlarni ventilyator va radiatorlar sovitadi.'
    ]},
    {sarlavha:'Kirish va chiqish qurilmalari', xatboshilar:[
      'Kirish qurilmalari axborotni kompyuterga uzatadi. Klaviatura harflarni kiritadi; undagi harflar tartibi QWERTY XIX asrdagi yozuv mashinasidan meros qolgan. Sichqoncha ko‘rsatkichni boshqaradi: uni Duglas Engelbart 1960-yillarda ixtiro qilgan va 1968-yilda ommaga namoyish qilgan. Mikrofon ovozni elektr signaliga, skaner qog‘ozdagi rasmni raqamli tasvirga aylantiradi.',
      'Chiqish qurilmalari natijani odamga yetkazadi. Monitor ekranida tasvir piksellardan — mayda rangli nuqtalardan tuziladi: Full HD monitorda 1920 × 1080 = 2 073 600 piksel bor. Karnay elektr signalini tovushga aylantiradi, printer matn va rasmni qog‘ozga chiqaradi.',
      'Ba’zi qurilmalar ikki tomonlama ishlaydi: sensorli ekran ham tasvir ko‘rsatadi, ham tegishni qabul qiladi; tarmoq kartasi ma’lumotni ham yuboradi, ham qabul qiladi.'
    ]},
    {sarlavha:'Birinchi kompyuterlardan bugungacha', xatboshilar:[
      'Birinchi elektron kompyuterlardan biri — ENIAC — 1946-yilda ommaga ko‘rsatilgan. U taxminan 18 mingta elektron lampadan iborat bo‘lib, ≈ 27 tonna (inglizcha manbalarda «30 tonna» — bu AQSh tonnasi, ≈ 27 metrik tonna) og‘irlikda edi va katta xonani egallagan.',
      '1956-yilda IBM kompaniyasi birinchi qattiq disk — IBM 350 ni chiqargan: u 50 ta katta diskdan iborat bo‘lib, taxminan 5 million belgi (taxminan 3,75 MB) saqlagan. Bugun cho‘ntakdagi fleshka undan yuz minglab marta ko‘proq ma’lumot sig‘diradi.',
      'Qurilmalar kichrayib, tezlashib bordi: tranzistor, keyin mikrosxema ixtiro qilindi. Bugungi smartfon ham kompyuter: unda protsessor, tezkor va doimiy xotira, kirish (sensorli ekran, mikrofon, kamera) va chiqish (ekran, karnay) qurilmalari bor.'
    ]}
  ],
  formulalar:[
    ['1 GHz = 1 000 000 000 takt/s','Protsessor takt chastotasi (giga = milliard)'],
    ['Piksellar soni = eni × bo‘yi','Full HD: 1920 × 1080 = 2 073 600 piksel'],
    ['1 TB = 1024 GB (maktab darsligi bo‘yicha)','Xotira hajmi birliklari (ishlab chiqaruvchilar 1000 dan foydalanadi — keyingi darsda)']
  ],
  qiziqarli:[
    'ENIAC (1946) taxminan 18 mingta elektron lampadan iborat va ≈ 27 metrik tonna (30 AQSh tonnasi) og‘ir bo‘lgan; bugungi telefon undan millionlab marta tezroq hisoblaydi.',
    'Birinchi qattiq disk IBM 350 (1956) taxminan 3,75 MB saqlagan — bu hozirgi bitta sifatli fotosurat hajmicha.',
    'Engelbart ixtiro qilgan birinchi sichqoncha yog‘och korpusli bo‘lib, ichida ikkita metall g‘ildirakcha bo‘lgan.',
    'QWERTY harflar tartibi XIX asrning 70-yillarida K. Sholzning yozuv mashinasi uchun o‘ylab topilgan va hanuz ishlatiladi.',
    '«Bug» (xato) so‘zi bilan bog‘liq mashhur hikoya: 1947-yilda Mark II kompyuteri relesidan kapalak topilgan va jurnalga yopishtirilgan.'
  ],
  lugat:[
    ['Kompyuter','Axborotni qabul qiluvchi, saqlovchi, qayta ishlovchi va chiqaruvchi qurilma.'],
    ['Tizim bloki','Kompyuterning asosiy qismlari joylashgan korpus.'],
    ['Ona plata','Barcha qismlar ulanadigan asosiy elektron plata.'],
    ['Protsessor','Dastur buyruqlarini bajaradigan asosiy mikrosxema (CPU).'],
    ['Tezkor xotira (OZU)','Ishlayotgan dastur va ma’lumotlar uchun tez, tok o‘chsa tozalanadigan xotira (RAM).'],
    ['SSD','Flesh-xotirali, harakatlanuvchi qismsiz doimiy xotira.'],
    ['HDD','Aylanuvchi magnit diskli qattiq disk.'],
    ['Videokarta','Tasvirni hisoblovchi va monitorga uzatuvchi plata (GPU).'],
    ['Quvvat bloki','Rozetka tokini kompyuter uchun kerakli o‘zgarmas tokka aylantiruvchi qurilma.'],
    ['Kirish qurilmasi','Axborotni kompyuterga kirituvchi qurilma.'],
    ['Chiqish qurilmasi','Natijani odamga ko‘rsatuvchi yoki eshittiruvchi qurilma.'],
    ['Piksel','Ekrandagi tasvirning eng kichik nuqtasi.']
  ],
  manba:IMI_DAR+'; '+IMI_W+': «Computer hardware», «Central processing unit», «Random-access memory», «Solid-state drive», «Hard disk drive», «IBM 350», «ENIAC», «Computer mouse», «Douglas Engelbart», «Von Neumann architecture», «Mains electricity by country» (O‘zbekiston: 220 V, 50 Hz). ENIAC lampalar soni va og‘irligi manbalarda biroz farq qiladi (≈17 500–18 000 lampa, ≈27–30 t).',
  ishlanma:{
    sinf:'5-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv model, «qurilmani top» o‘yini, guruhlarda tasniflash jadvali',
    maqsad:{talimiy:'Kompyuterning asosiy qurilmalari, ularning vazifalari va guruhlari (kirish, chiqish, qayta ishlash, saqlash) bilan tanishtirish.',
      tarbiyaviy:'Texnikaga ehtiyotkor munosabat, kompyuter bilan xavfsiz ishlash madaniyatini tarbiyalash.',
      rivojlantiruvchi:'Tasniflash, taqqoslash va o‘xshatish (odam organizmi bilan) orqali fikrlashni rivojlantirish.'},
    natijalar:['Tizim bloki ichidagi 6 ta asosiy qismni nomlaydi','Kirish va chiqish qurilmalarini farqlaydi','Tezkor va doimiy xotiraning farqini tushuntiradi','Protsessor va videokarta vazifasini aytadi'],
    jihozlar:['MAKON sahnasi «Kompyuter qurilmalari»','Proyektor yoki interaktiv doska','Qurilma nomlari yozilgan kartochkalar','Tasniflash jadvali tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Kompyuter xonasida xavfsizlik qoidalarini eslatadi.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Kompyuter qaysi tomonlari bilan odamga o‘xshaydi?» — muammoli savol.','Fikr bildiradi: ko‘z, quloq, miya, xotira.'],
      ['8–18','<b>Tashqi qurilmalar.</b> MAKON da monitor, klaviatura, sichqoncha, karnay, mikrofon, printerni ko‘rsatadi; kirish va chiqish tushunchasi.','Kartochkalarni «kirish» va «chiqish» ustunlariga ajratadi.'],
      ['18–30','<b>Tizim bloki ichida.</b> Ona plata, protsessor, sovutgich, OZU, SSD/HDD, videokarta, quvvat blokini bosib, kartalarini o‘qiydi.','Jadvalga qism va vazifasini yozadi.'],
      ['30–36','<b>Taqqoslash.</b> Tezkor va doimiy xotira: «nega ishni saqlash kerak?»','Misollar keltiradi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON «Qurilmani toping» amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Protsessor','Buyruqlarni bajaruvchi mikrosxema.'],['OZU','Tezkor xotira.'],['SSD / HDD','Doimiy xotira qurilmalari.'],['Kirish qurilmasi','Axborotni kiritadi.'],['Chiqish qurilmasi','Natijani chiqaradi.']],
    savollar:[['Kompyuterning «miyasi»?','Protsessor'],['Tok o‘chsa tozalanadigan xotira?','Tezkor xotira (OZU)'],['3 ta kirish qurilmasi?','Klaviatura, sichqoncha, mikrofon'],['3 ta chiqish qurilmasi?','Monitor, karnay, printer'],['Harakatlanuvchi qismi yo‘q doimiy xotira?','SSD']],
    uy:'Darslikdagi mavzuni o‘qish; (1) uydagi yoki maktabdagi kompyuterga ulangan qurilmalarni «kirish / chiqish» jadvaliga yozish; (2) Full HD monitordagi piksellar sonini hisoblash (javob: 1920 × 1080 = 2 073 600); (3) «Agar men protsessor bo‘lsam…» mavzusida 5–6 gaplik hikoya yozish.',
    manba:IMI_DAR+'; '+IMI_W+' «Computer hardware»'
  }
};

DT.im_pc = Object.assign(DT.im_pc || {}, {
  korpus:{nom:'Korpus (tizim bloki)', sarlavha2:'Ichki qism · himoya va joylashuv', jadval:[['Vazifasi','barcha qismlarni joylaydi va himoyalaydi'],['Materiali','po‘lat, alyuminiy, plastik, ba’zan shisha yon qopqoq'],['Shamollatish','old va orqa ventilyatorlar havo oqimini yaratadi'],['Tashqi ulagichlar','USB, audio, tarmoq, monitor chiqishlari']], matn:'Korpus ichida havo bir tomondan kirib, ikkinchi tomondan chiqadi — shunda qizigan qismlar soviydi. Korpus teshiklarini to‘sib qo‘ymaslik kerak.', manba:IMI_W+' «Computer case»'},
  ona_plata:{nom:'Ona plata', sarlavha2:'Ichki qism · hamma narsani ulaydi', jadval:[['Inglizcha','motherboard'],['Unga ulanadi','protsessor, OZU, disklar, videokarta, quvvat bloki'],['Yo‘laklar','mis izlar (shinalar) orqali ma’lumot uzatiladi'],['Chipset','qismlar o‘rtasidagi aloqani boshqaradi']], matn:'Ona plata — ko‘p qatlamli plastik plata, uning ichida va sirtida mis yo‘laklar bor. Protsessor uyasi (soket), xotira uyalari va kengaytirish uyalari aynan shu platada joylashgan.', manba:IMI_W+' «Motherboard»'},
  protsessor:{nom:'Protsessor (CPU)', sarlavha2:'Ichki qism · qayta ishlash', jadval:[['Inglizcha','CPU — central processing unit'],['Vazifasi','dastur buyruqlarini bajaradi, hisoblaydi, boshqaradi'],['Takt chastotasi','gigagerslarda (GHz): 1 GHz — sekundiga 1 mlrd takt'],['Yadrolar','zamonaviy protsessorlarda bir nechta yadro bir vaqtda ishlaydi']], matn:'Protsessor milliardlab mayda tranzistorlardan tashkil topgan kremniy mikrosxema. U buyruqni xotiradan oladi, bajaradi va natijani qaytarib yozadi — bu sikl sekundiga milliardlab marta takrorlanadi.', manba:IMI_W+' «Central processing unit», «Von Neumann architecture»'},
  sovutgich:{nom:'Sovutgich (kuler)', sarlavha2:'Ichki qism · issiqlikni chiqarish', jadval:[['Tarkibi','radiator (metall qovurg‘alar) + ventilyator'],['Materiali','alyuminiy, mis; ba’zan issiqlik quvurlari'],['Termopasta','protsessor va radiator orasidagi havo bo‘shlig‘ini to‘ldiradi'],['Nima uchun','qizib ketgan protsessor sekinlashadi yoki o‘chadi']], matn:'Ishlaganda protsessor elektr energiyasining bir qismini issiqlikka aylantiradi. Radiator bu issiqlikni katta sirtga tarqatadi, ventilyator esa havoni haydab sovitadi.', manba:IMI_W+' «Computer cooling», «Heat sink»'},
  ozu:{nom:'Tezkor xotira (OZU, RAM)', sarlavha2:'Ichki qism · tezkor xotira', jadval:[['Inglizcha','RAM — random-access memory'],['Nimani saqlaydi','ayni paytda ishlayotgan dastur va ma’lumotlar'],['Tok o‘chsa','ma’lumot tozalanadi (energiyaga bog‘liq xotira)'],['Hajmi','gigabaytlarda (GB) o‘lchanadi']], matn:'Dastur ishga tushirilganda u diskdan OZU ga yuklanadi, chunki protsessor OZU bilan diskka qaraganda ancha tez ishlaydi. OZU qancha katta bo‘lsa, bir vaqtda shuncha ko‘p dastur bemalol ishlaydi.', manba:IMI_W+' «Random-access memory»'},
  ssd:{nom:'SSD — qattiq jismli disk', sarlavha2:'Ichki qism · doimiy xotira', jadval:[['Inglizcha','solid-state drive'],['Qanday ishlaydi','flesh-xotira mikrosxemalari; harakatlanuvchi qismi yo‘q'],['Afzalligi','tez, shovqinsiz, zarbaga chidamli'],['Shakllari','2,5 dyuymli quti yoki M.2 kichik plata']], matn:'SSD da ma’lumot elektr zaryadlari ko‘rinishida saqlanadi va tok o‘chganda ham yo‘qolmaydi. Operatsion tizim SSD da bo‘lsa, kompyuter tezroq yonadi va dasturlar tezroq ochiladi.', manba:IMI_W+' «Solid-state drive», «Flash memory»'},
  hdd:{nom:'HDD — qattiq magnit disk', sarlavha2:'Ichki qism · doimiy xotira', jadval:[['Inglizcha','hard disk drive'],['Qanday ishlaydi','aylanuvchi magnit disklar va o‘qish-yozish kallagi'],['Aylanish tezligi','odatda 5400 yoki 7200 ayl/min'],['Birinchisi','IBM 350 (1956), taxminan 3,75 MB']], matn:'HDD ning kallagi disk sirtidan juda kichik masofada «uchib» yuradi, shuning uchun ishlayotgan diskni silkitish yoki urish xavfli. HDD ko‘p ma’lumotni arzonroq saqlaydi, lekin SSD dan sekinroq.', manba:IMI_W+' «Hard disk drive», «IBM 350»'},
  videokarta:{nom:'Videokarta (GPU)', sarlavha2:'Ichki qism · grafika', jadval:[['Inglizcha','graphics card, GPU'],['Vazifasi','tasvirni hisoblaydi va monitorga uzatadi'],['Tarkibi','grafika protsessori, o‘z xotirasi, ventilyatorlar'],['Qayerda kerak','3D o‘yinlar, video montaj, sun’iy intellekt hisoblari']], matn:'Grafika protsessori bir vaqtning o‘zida minglab oddiy hisoblarni parallel bajaradi — millionlab piksellar rangini hisoblash uchun aynan shu kerak.', manba:IMI_W+' «Graphics card», «Graphics processing unit»'},
  quvvat:{nom:'Quvvat bloki', sarlavha2:'Ichki qism · energiya', jadval:[['Kirish','o‘zgaruvchan tok, O‘zbekistonda 220–230 V, 50 Hz'],['Chiqish','o‘zgarmas tok: 12 V, 5 V, 3,3 V'],['Quvvati','vattlarda (W) ko‘rsatiladi'],['Xavfsizlik','ichini ochish mumkin emas — yuqori kuchlanish']], matn:'Kompyuter mikrosxemalari past kuchlanishli o‘zgarmas tok bilan ishlaydi. Quvvat bloki rozetka tokini ularga kerakli ko‘rinishga keltiradi va ortiqcha yuklanishdan himoya qiladi.', manba:IMI_W+' «Power supply unit (computer)», «Mains electricity by country»'},
  monitor:{nom:'Monitor', sarlavha2:'Chiqish qurilmasi · tasvir', jadval:[['Vazifasi','matn, rasm va videoni ko‘rsatadi'],['Tasvir','piksellardan tuziladi'],['Full HD','1920 × 1080 = 2 073 600 piksel'],['Ulanishi','HDMI, DisplayPort va boshqa ulagichlar']], matn:'Har bir piksel qizil, yashil va ko‘k (RGB) kichik nuqtalardan iborat — ularning yorqinligini o‘zgartirib, istalgan rang hosil qilinadi.', manba:IMI_W+' «Computer monitor», «1080p»'},
  klaviatura:{nom:'Klaviatura', sarlavha2:'Kirish qurilmasi · matn va buyruqlar', jadval:[['Vazifasi','harf, raqam va buyruqlarni kiritadi'],['Harflar tartibi','QWERTY — XIX asr yozuv mashinasidan meros'],['Maxsus tugmalar','Enter, Shift, Ctrl, Alt, Esc, F1–F12'],['O‘zbek tili','lotin yozuvida o‘ va g‘ uchun maxsus tartib (raskladka) bor']], matn:'Tugma bosilganda klaviatura ichidagi kontrakt tutashadi va kompyuterga shu tugmaning kodi yuboriladi. Qaysi harf chiqishini operatsion tizimdagi til tartibi belgilaydi.', manba:IMI_W+' «Computer keyboard», «QWERTY»'},
  sichqoncha:{nom:'Sichqoncha', sarlavha2:'Kirish qurilmasi · ko‘rsatkich', jadval:[['Vazifasi','ekrandagi ko‘rsatkichni boshqaradi, tanlaydi'],['Ixtirochi','Duglas Engelbart (1960-yillar)'],['Birinchi namoyish','1968-yil 9-dekabr'],['Zamonaviy turi','optik: yorug‘lik va mayda kamera harakatni sezadi']], matn:'Birinchi sichqoncha yog‘och qutidan iborat edi. Hozirgi optik sichqoncha stol sirtini sekundiga minglab marta suratga olib, siljishni hisoblaydi.', manba:IMI_W+' «Computer mouse», «Douglas Engelbart», «The Mother of All Demos»'},
  karnay:{nom:'Karnaylar', sarlavha2:'Chiqish qurilmasi · tovush', jadval:[['Vazifasi','elektr signalini tovushga aylantiradi'],['Asosiy qismi','diffuzor, magnit va g‘altak'],['Muqobili','quloqchinlar'],['Ovoz kartasi','raqamli signalni analog signalga aylantiradi']], matn:'G‘altakdan o‘zgaruvchan tok o‘tganda u magnit bilan ta’sirlashib tebranadi va diffuzorni harakatga keltiradi — havo tebranib, tovush hosil bo‘ladi.', manba:IMI_W+' «Computer speakers», «Loudspeaker»'},
  mikrofon:{nom:'Mikrofon', sarlavha2:'Kirish qurilmasi · ovoz', jadval:[['Vazifasi','tovushni elektr signaliga aylantiradi'],['Qo‘llanishi','video qo‘ng‘iroq, ovoz yozish, ovozli buyruq'],['Ishlash tamoyili','membrana tovush bosimidan tebranadi'],['Teskarisi','karnay']], matn:'Mikrofon karnayning teskarisi: karnay elektr signalini tovushga, mikrofon esa tovushni elektr signaliga aylantiradi. Kompyuter bu signalni raqamlarga o‘girib saqlaydi.', manba:IMI_W+' «Microphone»'},
  printer:{nom:'Printer', sarlavha2:'Chiqish qurilmasi · qog‘ozga chop etish', jadval:[['Vazifasi','matn va rasmni qog‘ozga chiqaradi'],['Siyohli','mayda tomchilarni qog‘ozga purkaydi'],['Lazerli','kukun (toner) issiqlik bilan qog‘ozga yopishtiriladi'],['3D printer','qatlamma-qatlam buyum yasaydi']], matn:'Printer rangli tasvirni ko‘pincha to‘rt rangdan — havorang, pushti, sariq va qora (CMYK) — aralashtirib hosil qiladi.', manba:IMI_W+' «Printer (computing)», «CMYK color model»'}
});

/* ---------------- 2. AXBOROT O‘LCHOV BIRLIKLARI (6-sinf) ---------------- */
bogla('informatika', 'Axborot o‘lchov birliklari', 'info-olchov', 'Bit, bayt, KB, MB, GB, TB: 1024 va 1000 — ikki xil hisob, konvertor bilan', ['Axborot o‘lchov birliklari']);

L['info-olchov'] = {
  fan:'informatika', sinf:'6-sinf', qisqaNom:'O‘lchov birliklari', nom:'Axborot o‘lchov birliklari',
  qisqa:'6-sinf · Informatika · bitdan terabaytgacha',
  sahna:'im_olchov',
  kor:{
    sarlavha:'Axborot qanday o‘lchanadi?',
    matn:'Kompyuterdagi har qanday axborot — matn, rasm, tovush, video — oxir-oqibat 0 va 1 lardan iborat. Bitta 0 yoki 1 — <b>bit</b>, sakkizta bit — <b>bayt</b>. Undan kattaroq birliklar — kilobayt, megabayt, gigabayt, terabayt. Sahnadagi minorada har qavat bitta birlik; qavatni bosing, konvertorda hisoblang. Diqqat: maktab darsligida 1 KB = 1024 bayt, xalqaro SI qoidasida esa «kilo» = 1000. Ikkala hisob ham ishlatiladi — tizimni almashtirib farqini ko‘ring.',
    punktlar:[
      '<b>1 bayt = 8 bit</b> — bu har ikkala hisobda bir xil',
      '<b>Maktab darsligi (an’anaviy):</b> 1 KB = 1024 bayt, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB',
      '<b>SI va IEC (1999):</b> 1 kB = 1000 bayt; 1024 bayt uchun alohida nom — 1 KiB (kibibayt)',
      'Disk ishlab chiqaruvchilar 1000 bilan hisoblaydi — shuning uchun «1 TB» disk Windows’da taxminan 931 GB ko‘rinadi'
    ]
  },
  bolimlar:[
    {sarlavha:'Birliklar jadvali', jadval:[
      ['1 bit','0 yoki 1 — eng kichik birlik'],
      ['1 bayt','8 bit'],
      ['1 KB (kilobayt)','1024 bayt (darslik) · SI bo‘yicha 1 kB = 1000 bayt'],
      ['1 MB (megabayt)','1024 KB = 1 048 576 bayt · SI: 1 000 000 bayt'],
      ['1 GB (gigabayt)','1024 MB = 1 073 741 824 bayt · SI: 10⁹ bayt'],
      ['1 TB (terabayt)','1024 GB = 1 099 511 627 776 bayt · SI: 10¹² bayt']
    ], matn:'Darslikdagi misollarni yechishda 1024 dan foydalaning. Do‘kondagi fleshka yoki disk yorlig‘idagi hajm esa odatda 1000 bilan hisoblangan.'},
    {sarlavha:'Ikki tizim nomlari (IEC, 1999)', jadval:[
      ['1000 (o‘nlik, SI)','kB · MB · GB · TB (kilo, mega, giga, tera)'],
      ['1024 (ikkilik, IEC)','KiB · MiB · GiB · TiB (kibi, mebi, gibi, tebi)'],
      ['Kim qaysini ishlatadi','disk ishlab chiqaruvchilar — 1000; Windows — 1024 (lekin «GB» deb yozadi); OZU (JEDEC) — 1024']
    ]},
    {sarlavha:'Taxminiy o‘lchamlar (misol)', jadval:[
      ['1 lotin harfi (ASCII)','1 bayt'],
      ['1 bet matn (≈ 2000 belgi)','≈ 2 KB (taxminiy)'],
      ['Telefon fotosurati','bir necha MB (taxminiy, sifatiga bog‘liq)'],
      ['1 soatlik HD video','bir necha GB (taxminiy)']
    ], matn:'Bu raqamlar faqat tasavvur uchun — aniq hajm fayl formati va siqish darajasiga bog‘liq.'}
  ],
  bosqichlar:[
    {sarlavha:'Bit — eng kichik birlik', matn:'Bit — ikkilik raqam: 0 yoki 1 («yoqilgan / o‘chirilgan»). «Bit» so‘zi «binary digit» (ikkilik raqam) qisqarmasi; uni Jon Tyuki taklif qilgan, Klod Shennon 1948-yilgi maqolasida ommalashtirgan. Bitta bit ikki holatdan birini bildiradi.', holat:{tizim:'1024', birlik:'bit'}},
    {sarlavha:'Bayt = 8 bit', matn:'Sakkizta bit bir baytni tashkil qiladi: 8 bit bilan 2⁸ = 256 xil qiymat yozish mumkin — lotin harfi, raqam yoki belgi uchun yetarli. «Bayt» atamasini 1956-yil iyunida IBM muhandisi Verner Buxgols kiritgan.', holat:{tizim:'1024', birlik:'bayt'}},
    {sarlavha:'Kilobayt va megabayt', matn:'Maktab darsligida 1 KB = 1024 bayt, chunki 1024 = 2¹⁰ — ikkilik tizimga qulay son. 1 MB = 1024 KB = 1 048 576 bayt. Bir bet matn — bir necha kilobayt, fotosurat — bir necha megabayt.', holat:{tizim:'1024', birlik:'kb'}},
    {sarlavha:'Gigabayt va terabayt', matn:'1 GB = 1024 MB, 1 TB = 1024 GB. Telefon xotirasi gigabaytlarda, katta disklar terabaytlarda o‘lchanadi. Har qadamda birlik 1024 marta kattalashadi.', holat:{tizim:'1024', birlik:'gb'}},
    {sarlavha:'1000 mi, 1024 mi? Ikki tizim', matn:'Xalqaro birliklar tizimida (SI) «kilo» doim 1000 ni bildiradi. 1999-yilda IEC 1024 lik birliklar uchun alohida nomlar kiritgan: kibibayt (KiB), mebibayt (MiB), gibibayt (GiB). Disk ishlab chiqaruvchilar 1000 bilan hisoblaydi, Windows esa 1024 ga bo‘lib, «GB» deb ko‘rsatadi — shuning uchun «1 TB» disk ≈ 931 GB ko‘rinadi.', holat:{tizim:'1000', birlik:'tb'}},
    {sarlavha:'Konvertorda hisoblash', matn:'Kattaroq birlikdan kichigiga o‘tishda ko‘paytiring (×1024 yoki ×1000), kichigidan kattasiga — bo‘ling. Bit va bayt orasida doim 8. Masalan: 2 GB = 2 × 1024 = 2048 MB (darslik bo‘yicha).', holat:{tizim:'1024', birlik:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Birliklar bilan ishlash', holat:{tizim:'1024', birlik:null},
    topshiriqlar:[
      {shart:'Minorada <b>8 bitdan iborat</b> birlikni bosing.', hodisa:'im-birlik', kod:"ev.nom==='bayt'", izoh:'To‘g‘ri — <b>bayt</b>: 1 bayt = 8 bit.'},
      {shart:'Minorada <b>1024 megabaytga</b> teng birlikni bosing (darslik bo‘yicha).', hodisa:'im-birlik', kod:"ev.nom==='gb'", izoh:'To‘g‘ri — <b>gigabayt</b>: 1 GB = 1024 MB.'},
      {shart:'Konvertorda <b>2 GB</b> ni <b>MB</b> ga o‘tkazing (tizim 1024).', hodisa:'im-hisob', kod:"ev.qiymat===2 && ev.dan==='gb' && ev.ga==='mb' && ev.tizim==='1024'", izoh:'To‘g‘ri — <b>2048 MB</b>: 2 × 1024 = 2048.'},
      {shart:'Tizimni <b>SI (1000)</b> ga almashtiring — disk ishlab chiqaruvchilar hisobi.', hodisa:'im-tizim', kod:"ev.tizim==='1000'", izoh:'To‘g‘ri — endi <b>1 kB = 1000 bayt</b>, 1 GB = 1000 MB.'},
      {shart:'Konvertorda <b>3 bayt</b> necha <b>bit</b> ekanini hisoblang.', hodisa:'im-hisob', kod:"ev.qiymat===3 && ev.dan==='bayt' && ev.ga==='bit'", izoh:'To‘g‘ri — <b>24 bit</b>: 3 × 8 = 24.'}
    ]},
  test:[
    {s:'Axborotning eng kichik o‘lchov birligi qaysi?', v:['Bayt','Bit','Kilobayt','Belgi'], t:1, izoh:'<b>Bit</b> — bitta ikkilik raqam (0 yoki 1). Bayt 8 bitdan iborat.'},
    {s:'1 bayt necha bitga teng?', v:['2','8','10','1024'], t:1, izoh:'1 bayt = <b>8</b> bit. Bu 1024 va 1000 li hisobda bir xil.'},
    {s:'Maktab darsligi bo‘yicha 1 KB nechaga teng?', v:['1000 bayt','1024 bayt','1024 bit','8 bit'], t:1, izoh:'Darslikda (an’anaviy hisob) 1 KB = <b>1024 bayt</b> = 2¹⁰ bayt.'},
    {s:'Xalqaro SI qoidasi bo‘yicha 1 kB (kilo = 1000) nechaga teng?', v:['1000 bayt','1024 bayt','100 bayt','8000 bayt'], t:0, izoh:'SI da «kilo» doim 1000: 1 kB = <b>1000 bayt</b>. 1024 bayt IEC bo‘yicha 1 KiB deyiladi.'},
    {s:'3 bayt necha bit?', v:['11','24','38','3072'], t:1, izoh:'3 × 8 = <b>24</b> bit.'},
    {s:'Darslik bo‘yicha 2 MB necha KB?', v:['2000','2048','1024','16'], t:1, izoh:'2 × 1024 = <b>2048</b> KB.'},
    {s:'IEC belgisi «KiB» qanday o‘qiladi?', v:['Kilobayt','Kibibayt','Kilobit','Megabayt'], t:1, izoh:'KiB — <b>kibibayt</b> = 1024 bayt; bu nomni IEC 1999-yilda kiritgan.'},
    {s:'Nega yorlig‘ida «1 TB» yozilgan disk Windows’da taxminan 931 GB ko‘rinadi?', v:['Disk buzilgan','Ishlab chiqaruvchi 10¹² bayt deb hisoblaydi, Windows esa 1024 ga bo‘lib ko‘rsatadi','Fayllar joy egallab qo‘ygan','Bit va bayt adashtirilgan'], t:1, izoh:'<b>Ikki xil hisob</b>: 10¹² bayt ÷ 2³⁰ ≈ 931,3 — Windows buni «GB» deb yozadi (aslida GiB).'},
    {s:'Bitta lotin harfi (ASCII kodlashda) odatda qancha joy egallaydi?', v:['1 bit','1 bayt','1 KB','8 bayt'], t:1, izoh:'ASCII da har belgi <b>1 bayt</b> (8 bit) bilan yoziladi.'},
    {s:'Internet tezligi 100 Mbit/s bo‘lsa, ideal holda sekundiga necha megabayt yuklanadi?', v:['100','12,5','800','1024'], t:1, izoh:'Tezlik bitlarda: 100 ÷ 8 = <b>12,5</b> MB/s (amalda biroz kamroq).'},
    {s:'«Bayt» atamasini kim va qachon kiritgan?', v:['Klod Shennon, 1948','Verner Buxgols, 1956','Jon fon Neyman, 1945','Alan Tyuring, 1936'], t:1, izoh:'<b>Verner Buxgols</b> (IBM) 1956-yil iyunida Stretch kompyuteri ustida ishlaganda kiritgan.'},
    {tur:'3d', s:'Minorada <b>8 bitdan iborat</b> birlikni bosing.', hodisa:'im-birlik', kalit:'nom', togri:['bayt'], v:['Bayt','boshqa birlik'], t:0,
     izoh:'<b>Bayt</b> = 8 bit. Undan yuqori qavatlar: KB, MB, GB, TB.'}
  ],
  yordamchi:[
    {s:'Nega 1000 emas, 1024?', j:'Kompyuter ikkilik tizimda ishlaydi, unga 2 ning darajalari qulay: 2¹⁰ = 1024 — 1000 ga eng yaqin daraja. Shuning uchun an’anaviy hisobda 1 KB = 1024 bayt. SI esa «kilo» ni doim 1000 deb belgilaydi. 1999-yilda IEC chalkashlikni yo‘qotish uchun 1024 lik birliklarga alohida nom berdi: KiB, MiB, GiB.', kalit:['1024','1000','nega','kib']},
    {s:'Bit va baytni qanday farqlash mumkin?', j:'Qisqartmada kichik «b» — bit, katta «B» — bayt: Mbit/s (Mb/s) — megabit sekundiga, MB — megabayt. Internet tezligi odatda bitlarda, fayl hajmi baytlarda beriladi. Bitdan baytga o‘tish uchun 8 ga bo‘ling.', kalit:['bit','bayt','farq','tezlik']},
    {s:'Birlikdan birlikka qanday o‘tiladi?', j:'Kattadan kichikka — ko‘paytiring, kichikdan kattaga — bo‘ling. Har pog‘onada ×1024 (darslik) yoki ×1000 (SI). Faqat bit ↔ bayt orasida 8. Masalan: 3 MB = 3 × 1024 = 3072 KB; 4096 KB = 4096 ÷ 1024 = 4 MB.', kalit:['o‘tkazish','hisob','konvertor']}
  ],
  maqola:[
    {sarlavha:'Bit: «ha» yoki «yo‘q»', xatboshilar:[
      'Kompyuter xotirasi millionlab kichik «kalitlar»dan iborat: har biri yoki yoqilgan (1), yoki o‘chirilgan (0). Bitta shunday qiymat bit deyiladi — bu axborotning eng kichik birligi. Bitta bit ikki javobdan birini saqlaydi: «ha» yoki «yo‘q», «rost» yoki «yolg‘on».',
      '«Bit» so‘zi inglizcha «binary digit» — «ikkilik raqam» so‘zlarining qisqarmasi. Uni amerikalik olim Jon Tyuki taklif qilgan, axborot nazariyasi asoschisi Klod Shennon esa 1948-yilgi mashhur maqolasida ishlatib ommalashtirgan.',
      'Bitlar ko‘payganda ular bilan yoziladigan qiymatlar soni tez o‘sadi: 1 bit — 2 qiymat, 2 bit — 4, 3 bit — 8, n bit — 2ⁿ qiymat. Shuning uchun sakkizta bit 2⁸ = 256 xil belgini kodlashga yetadi.'
    ]},
    {sarlavha:'Bayt va undan katta birliklar', xatboshilar:[
      'Sakkiz bitdan iborat guruh bayt deyiladi. «Bayt» atamasini 1956-yil iyunida IBM muhandisi Verner Buxgols Stretch kompyuterini loyihalashda kiritgan: u inglizcha «bite» (tishlam) so‘zidan olingan, «bit» bilan adashmasligi uchun yozilishi o‘zgartirilgan. Dastlab bayt turli uzunlikda bo‘lgan, keyinroq 8 bit standartga aylangan.',
      'Maktab darsligida kattaroq birliklar 1024 marta oshib boradi: 1 KB = 1024 bayt, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB. 1024 = 2¹⁰ tanlangani sababi — kompyuter xotirasi ikkilik manzillar bilan ishlaydi va 2 ning darajalari unga qulay.',
      'Birliklarni o‘tkazish oddiy: kattaroq birlikdan kichigiga — ko‘paytirish, kichigidan kattasiga — bo‘lish. Masalan, 5 KB = 5 × 1024 = 5120 bayt; 16 384 bit = 16 384 ÷ 8 = 2048 bayt = 2 KB.'
    ]},
    {sarlavha:'1024 va 1000: halol tushuntirish', xatboshilar:[
      'Fizika va boshqa fanlarda «kilo» doim 1000 ni bildiradi: 1 kilogramm = 1000 gramm, 1 kilometr = 1000 metr. Xalqaro birliklar tizimi (SI) bo‘yicha 1 kilobayt ham 1000 bayt bo‘lishi kerak. Ammo kompyuterchilar uzoq yillar «kilobayt» deganda 1024 baytni nazarda tutgan — shu an’ana maktab darsliklarida ham saqlangan.',
      'Chalkashlikni yo‘qotish uchun Xalqaro elektrotexnika komissiyasi (IEC) 1999-yil yanvarida (IEC 60027-2 standartiga o‘zgartirish) 1024 lik birliklar uchun yangi nomlar kiritgan: kibibayt (KiB = 1024 bayt), mebibayt (MiB), gibibayt (GiB), tebibayt (TiB). Ular hozir Linux dasturlari va ilmiy matnlarda ishlatiladi.',
      'Amalda ikkala hisob yonma-yon yashaydi. Disk va fleshka ishlab chiqaruvchilar 1000 bilan hisoblaydi; Windows esa hajmni 1024 ga bo‘lib, lekin «GB» deb ko‘rsatadi. Shuning uchun yorlig‘ida «1 TB» (10¹² bayt) yozilgan disk Windows’da 10¹² ÷ 2³⁰ ≈ 931 GB bo‘lib ko‘rinadi — disk «kamaymagan», faqat boshqacha hisoblangan. Operativ xotira (OZU) hajmi esa an’anaviy 1024 li hisobda beriladi (JEDEC standarti). Darslikdagi masalalarni 1024 bilan yeching.'
    ]},
    {sarlavha:'Tezlik: bit sekundiga', xatboshilar:[
      'Internet va tarmoq tezligi odatda bit sekundiga (bit/s) o‘lchanadi: kbit/s, Mbit/s, Gbit/s. Bu yerda «kilo», «mega» doim 1000 ni bildiradi. Qisqartmada kichik «b» — bit, katta «B» — bayt.',
      'Fayl hajmi esa baytlarda beriladi. Shuning uchun 100 Mbit/s tezlikda ideal holda sekundiga 100 ÷ 8 = 12,5 megabayt yuklanadi; amalda tarmoq xizmat ma’lumotlari va yo‘qotishlar tufayli biroz kamroq.',
      'Misol: 25 MB lik faylni 100 Mbit/s tezlikda yuklash taxminan 25 ÷ 12,5 = 2 soniya oladi (ideal holda, 1 MB = 10⁶ bayt deb olinganda).'
    ]}
  ],
  formulalar:[
    ['1 bayt = 8 bit','Bit va bayt (har ikki hisobda)'],
    ['1 KB = 2¹⁰ bayt = 1024 bayt','Maktab darsligi (an’anaviy, JEDEC)'],
    ['1 kB = 10³ bayt = 1000 bayt','SI; 1024 bayt = 1 KiB (IEC, 1999)'],
    ['N = 2ⁱ','i bit bilan yoziladigan turli qiymatlar soni (8 bit → 256)'],
    ['Katta → kichik: ×1024;  kichik → katta: ÷1024','Birliklarni o‘tkazish (SI da 1000)'],
    ['t = V ÷ v','Yuklash vaqti: hajm (bitda) ÷ tezlik (bit/s)']
  ],
  qiziqarli:[
    '«Bayt» so‘zi inglizcha «bite» (tishlam) dan olingan — Verner Buxgols «bit» bilan adashmasligi uchun «y» harfi bilan yozgan (1956).',
    'Yarim bayt — 4 bit — hazil bilan «nibbl» (inglizcha «kichik tishlam») deb ataladi; u bitta o‘n oltilik raqamga teng.',
    '1999-yilgacha KiB, MiB kabi nomlar bo‘lmagan — ularni IEC chalkashlikni tugatish uchun kiritgan.',
    '«1 TB» deb sotilgan disk Windows’da ≈ 931 GB, «500 GB» li disk ≈ 465 GB ko‘rinadi — bu ikki hisob farqi.',
    'Birinchi qattiq disk IBM 350 (1956) taxminan 3,75 MB saqlagan va bir necha shkaf kattaligida bo‘lgan.'
  ],
  lugat:[
    ['Bit','Axborotning eng kichik birligi: 0 yoki 1.'],
    ['Bayt','8 bitdan iborat birlik.'],
    ['Kilobayt (KB)','Darslikda 1024 bayt; SI da (kB) 1000 bayt.'],
    ['Megabayt (MB)','1024 KB (darslik) yoki 10⁶ bayt (SI).'],
    ['Gigabayt (GB)','1024 MB (darslik) yoki 10⁹ bayt (SI).'],
    ['Terabayt (TB)','1024 GB (darslik) yoki 10¹² bayt (SI).'],
    ['Kibibayt (KiB)','Aniq 1024 bayt (IEC, 1999).'],
    ['SI','Xalqaro birliklar tizimi; unda «kilo» = 1000.'],
    ['IEC','Xalqaro elektrotexnika komissiyasi — standartlar tashkiloti.'],
    ['ASCII','Lotin harflari, raqam va belgilarni 7 bitli (baytda saqlanadigan) kodlar bilan yozish jadvali.'],
    ['Bit/s','Ma’lumot uzatish tezligi birligi.']
  ],
  manba:IMI_DAR+'; '+IMI_W+': «Byte» (Buchholz, 1956-yil iyun), «Bit» (Tukey, Shannon 1948), «Binary prefix» (IEC 60027-2 Amd. 2, 1999-yil yanvar; JEDEC; disk ishlab chiqaruvchilar SI dan foydalanishi), «Kilobyte», «ASCII»; C. E. Shannon, «A Mathematical Theory of Communication» (1948). Misollardagi fayl o‘lchamlari taxminiy.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish va amaliy mashq', usul:'3D minora modeli, konvertor bilan hisoblash, juftlikda «do‘kon yorlig‘i» muammosi',
    maqsad:{talimiy:'Bit, bayt, KB, MB, GB, TB birliklari va ular orasidagi munosabatlarni o‘rgatish; 1024 va 1000 li hisob farqini tushuntirish.',
      tarbiyaviy:'Aniqlik, manbalarni solishtirish va haqiqatni izlash odatini tarbiyalash.',
      rivojlantiruvchi:'Ko‘paytirish/bo‘lish orqali birlik o‘tkazish, darajalar bilan ishlash ko‘nikmasini rivojlantirish.'},
    natijalar:['Birliklarni o‘sish tartibida aytadi','Birliklarni 1024 bo‘yicha o‘tkazadi','1024 va 1000 li hisob farqini misol bilan tushuntiradi','Bit/s dan MB/s ga o‘tkazadi'],
    jihozlar:['MAKON sahnasi «Axborot o‘lchov birliklari»','Proyektor','Fleshka yoki disk qutisi (yorlig‘ida hajm yozilgan)','Mashqlar tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Do‘kondan 1 TB disk oldim, kompyuter 931 GB ko‘rsatyapti — aldashdimi?»','Taxmin aytadi.'],
      ['8–18','<b>Bit va bayt.</b> MAKON minorasida 8 bitning baytga birlashishi; 2⁸ = 256.','Daftarga 1 bit, 2 bit, 3 bit uchun qiymatlar sonini yozadi.'],
      ['18–28','<b>Katta birliklar.</b> KB → TB, ×1024; konvertorda misollar.','Konvertorda 3 ta misol yechadi.'],
      ['28–35','<b>Ikki tizim.</b> SI (1000) va IEC (KiB); disk yorlig‘i muammosini yechadi.','Juftlikda 10¹² ÷ 2³⁰ ni hisoblaydi.'],
      ['35–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Bit','0 yoki 1.'],['Bayt','8 bit.'],['KB','1024 bayt (darslik).'],['KiB','1024 bayt (IEC).'],['kB','1000 bayt (SI).']],
    savollar:[['1 bayt = ? bit','8'],['1 KB = ? bayt (darslik)','1024'],['4 MB = ? KB','4096'],['16 bit = ? bayt','2'],['«1 TB» disk Windows’da ≈ ? GB','931']],
    uy:'Darslikdagi mavzuni o‘qish; (1) o‘tkazing: 5 KB → bayt (5120), 3 GB → MB (3072), 8192 KB → MB (8), 40 bit → bayt (5); (2) uydagi telefon yoki fleshka hajmini yozib, 10⁹ va 2³⁰ bo‘yicha farqini hisoblang (masalan, 64 GB: 64 × 10⁹ ÷ 2³⁰ ≈ 59,6 GiB); (3) 50 Mbit/s tezlikda 100 MB fayl ideal holda necha soniyada yuklanadi? (100 ÷ 6,25 = 16 s).',
    manba:IMI_DAR+'; '+IMI_W+' «Binary prefix», «Byte»'
  }
};

DT.im_birlik = Object.assign(DT.im_birlik || {}, {
  bit:{nom:'Bit', sarlavha2:'Eng kichik birlik', jadval:[['Qiymati','0 yoki 1'],['Nomi','binary digit — ikkilik raqam'],['Muallif','Jon Tyuki taklif qilgan, K. Shennon 1948-yilda ommalashtirgan'],['Belgisi','bit yoki b (kichik harf)']], matn:'Bitta bit ikki holatdan birini saqlaydi. n bit bilan 2ⁿ xil qiymat yozish mumkin. Internet tezligi bitlarda o‘lchanadi: Mbit/s.', manba:IMI_W+' «Bit»; C. Shannon (1948)'},
  bayt:{nom:'Bayt', sarlavha2:'8 bit', jadval:[['Tarkibi','8 bit'],['Qiymatlar soni','2⁸ = 256 (0…255)'],['Muallif','Verner Buxgols, IBM, 1956-yil iyun'],['Belgisi','B (katta harf)']], matn:'Bitta bayt ASCII kodlashda bitta lotin harfi, raqam yoki belgini saqlaydi. Kirill yoki boshqa yozuvlar (UTF-8) 2 va undan ortiq baytni egallashi mumkin.', manba:IMI_W+' «Byte», «ASCII», «UTF-8»'},
  kb:{nom:'Kilobayt (KB)', sarlavha2:'1024 yoki 1000 bayt', jadval:[['Darslik (an’anaviy)','1 KB = 1024 bayt = 2¹⁰'],['SI','1 kB = 1000 bayt'],['IEC nomi','1 KiB (kibibayt) = 1024 bayt'],['Misol','1 bet matn ≈ 2 KB (taxminiy)']], matn:'Ikki xil ma’no tarixan yuzaga kelgan. Maktab masalalarida 1024 ishlatiladi; fanda va disk yorliqlarida — 1000.', manba:IMI_W+' «Kilobyte», «Binary prefix»'},
  mb:{nom:'Megabayt (MB)', sarlavha2:'≈ million bayt', jadval:[['Darslik','1 MB = 1024 KB = 1 048 576 bayt'],['SI','1 MB = 1 000 000 bayt'],['IEC nomi','MiB (mebibayt)'],['Misol','telefon fotosurati — bir necha MB (taxminiy)']], matn:'Megabayt — musiqa fayllari, rasmlar va hujjatlar uchun qulay birlik.', manba:IMI_W+' «Megabyte»'},
  gb:{nom:'Gigabayt (GB)', sarlavha2:'≈ milliard bayt', jadval:[['Darslik','1 GB = 1024 MB = 1 073 741 824 bayt'],['SI','1 GB = 10⁹ bayt'],['IEC nomi','GiB (gibibayt)'],['Misol','OZU, telefon xotirasi, filmlar']], matn:'Telefon va kompyuter xotirasi hozir asosan gigabaytlarda o‘lchanadi. «64 GB» li fleshka Windows’da ≈ 59,6 GB ko‘rinadi (64 × 10⁹ ÷ 2³⁰).', manba:IMI_W+' «Gigabyte», «Binary prefix»'},
  tb:{nom:'Terabayt (TB)', sarlavha2:'≈ trillion bayt', jadval:[['Darslik','1 TB = 1024 GB = 1 099 511 627 776 bayt'],['SI','1 TB = 10¹² bayt'],['IEC nomi','TiB (tebibayt)'],['Windows’da','«1 TB» disk ≈ 931 GB ko‘rinadi']], matn:'Disk ishlab chiqaruvchilar 10¹² bayt deb hisoblaydi, Windows esa 2³⁰ ga bo‘lib ko‘rsatadi: 10¹² ÷ 1 073 741 824 ≈ 931,3.', manba:IMI_W+' «Terabyte», «Binary prefix»'}
});

/* ---------------- 3. ALGORITM VA BLOK-SXEMALAR (7-sinf) ---------------- */
bogla('informatika', 'Algoritm va blok-sxemalar', 'info-algoritm', 'Algoritm xossalari va turlari; blok-sxema bloklari; token bilan qadamma-qadam bajarish va robot', ['Algoritm va blok-sxemalar']);

L['info-algoritm'] = {
  fan:'informatika', sinf:'7-sinf', qisqaNom:'Algoritm', nom:'Algoritm va blok-sxemalar',
  qisqa:'7-sinf · Informatika · blok-sxema bajariladi, robot yuradi',
  sahna:'im_algoritm',
  kor:{
    sarlavha:'Algoritm — aniq ko‘rsatmalar ketma-ketligi',
    matn:'Algoritm — maqsadga erishish uchun bajaruvchiga beriladigan aniq va tartiblangan buyruqlar ketma-ketligi. Uni so‘z bilan, blok-sxema bilan yoki dasturlash tilida yozish mumkin. Sahnada chapda blok-sxema, o‘ngda robot: yorug‘ token blokdan blokka o‘tadi, robot esa shu algoritm bo‘yicha devorgacha yuradi va qadamlarini sanaydi. «Bir qadam» tugmasi bilan kuzating, bloklarni bosib, ularning ma’nosini o‘qing.',
    punktlar:[
      '<b>Nomi:</b> «algoritm» so‘zi al-Xorazmiy ismining lotincha shakli — «Algoritmi» dan',
      '<b>Xossalari:</b> diskretlik, tushunarlilik, aniqlik, natijaviylik, ommaviylik',
      '<b>Turlari:</b> chiziqli, tarmoqlanuvchi, takrorlanuvchi (siklik)',
      '<b>Bloklar:</b> oval — boshlash/tugash, to‘rtburchak — amal, romb — shart, parallelogramm — kiritish/chiqarish'
    ]
  },
  bolimlar:[
    {sarlavha:'Blok-sxema belgilari (ISO 5807 / GOST 19.701-90)', jadval:[
      ['Oval (yumaloq to‘rtburchak)','boshlash va tugash'],
      ['To‘rtburchak','amal, hisoblash (jarayon)'],
      ['Romb','shartni tekshirish: «ha» va «yo‘q» chiqishlari'],
      ['Parallelogramm','ma’lumotni kiritish yoki chiqarish'],
      ['Strelka (chiziq)','bajarilish yo‘nalishi']
    ], matn:'Bu belgilar xalqaro ISO 5807:1985 standartida belgilangan; MDH mamlakatlarida uning asosida tuzilgan GOST 19.701-90 ishlatiladi.'},
    {sarlavha:'Algoritm xossalari', jadval:[
      ['Diskretlik','algoritm alohida qadamlarga bo‘lingan'],
      ['Tushunarlilik','bajaruvchi har bir buyruqni bajara oladi'],
      ['Aniqlik','har qadam bir xil ma’noda tushuniladi'],
      ['Natijaviylik','chekli qadamdan keyin natija olinadi'],
      ['Ommaviylik','bir turdagi masalalar uchun turli boshlang‘ich ma’lumotlar bilan ishlaydi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Boshlash: oval blok', matn:'Har bir blok-sxema oval blok bilan boshlanadi va oval blok bilan tugaydi. Token hozir «Boshlash» blokida. Bajarilish tartibi strelkalar bilan ko‘rsatiladi.', holat:{masofa:3, blok:'B1'}},
    {sarlavha:'Amal bloki: to‘rtburchak', matn:'«k := 0» — o‘zgaruvchi k ga 0 qiymat beriladi: robot hali birorta ham qadam tashlamagan. To‘rtburchak blokda hisoblash yoki amal yoziladi, undan bitta chiqish bor.', holat:{masofa:3, blok:'B2'}},
    {sarlavha:'Shart bloki: romb', matn:'«Oldinda devor bormi?» — romb shaklidagi blok shartni tekshiradi. Javobga qarab ikki yo‘ldan biri tanlanadi: «Ha» yoki «Yo‘q». Algoritm shu joyda tarmoqlanadi.', holat:{masofa:3, blok:'B3'}},
    {sarlavha:'Sikl: qaytib keluvchi strelka', matn:'Devor yo‘q bo‘lsa, robot bir qadam yuradi va k bittaga oshadi (k := k + 1), so‘ng strelka yana shartga qaytadi. Bir xil amallar takrorlanadi — bu takrorlanuvchi (siklik) algoritm.', holat:{masofa:3, blok:'B4'}},
    {sarlavha:'Chiqarish: parallelogramm', matn:'Devorga yetilganda shart «Ha» bo‘ladi va token parallelogramm blokka o‘tadi: natija — k chiqariladi. Devor 3 katak narida bo‘lsa, k = 3.', holat:{masofa:3, blok:'B5'}},
    {sarlavha:'Tugash va ommaviylik', matn:'Algoritm «Tugash» blokida yakunlanadi. Devor masofasini 2 yoki 5 ga o‘zgartiring: xuddi shu algoritm boshqa ma’lumot bilan ham to‘g‘ri ishlaydi — bu ommaviylik xossasi.', holat:{masofa:5, blok:'B6'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Blok-sxemani o‘qing va bajaring', holat:{masofa:3, blok:null},
    topshiriqlar:[
      {shart:'Blok-sxemada <b>shart tekshiriladigan</b> blokni bosing.', hodisa:'im-blok', kod:"ev.nom==='romb'", izoh:'To‘g‘ri — <b>romb</b>: undan «Ha» va «Yo‘q» ikki chiqish bor.'},
      {shart:'Natija <b>chiqariladigan</b> blokni bosing.', hodisa:'im-blok', kod:"ev.nom==='parallelogramm'", izoh:'To‘g‘ri — <b>parallelogramm</b>: ma’lumot kiritish va chiqarish bloki.'},
      {shart:'Devor 3 katak narida. «Ishga tushirish» yoki «Bir qadam» bilan algoritmni <b>oxirigacha</b> bajaring.', hodisa:'im-algoritm', kod:"ev.tugadi && ev.masofa===3 && ev.k===3", izoh:'To‘g‘ri — algoritm tugadi, <b>k = 3</b>.'},
      {shart:'Devorni <b>5 katak</b> uzoqlikka qo‘ying va algoritmni qayta bajaring.', hodisa:'im-algoritm', kod:"ev.tugadi && ev.masofa===5", izoh:'To‘g‘ri — <b>k = 5</b>. Bitta algoritm turli ma’lumotlar bilan ishlaydi — ommaviylik.'}
    ]},
  test:[
    {s:'«Algoritm» so‘zi qaysi olimning ismidan kelib chiqqan?', v:['Ibn Sino','Muhammad al-Xorazmiy','Abu Rayhon Beruniy','Mirzo Ulug‘bek'], t:1, izoh:'<b>Muhammad al-Xorazmiy</b>: uning hisob haqidagi asari lotinchaga «Algoritmi de numero Indorum» nomi bilan tarjima qilingan.'},
    {s:'Blok-sxemada shart qaysi shakldagi blokda yoziladi?', v:['Oval','To‘rtburchak','Romb','Parallelogramm'], t:2, izoh:'Shart <b>romb</b> ichida yoziladi; undan «ha» va «yo‘q» ikki chiqish bor.'},
    {s:'Ma’lumot kiritish va chiqarish bloki qaysi shaklda?', v:['Romb','Oval','To‘rtburchak','Parallelogramm'], t:3, izoh:'Kiritish/chiqarish — <b>parallelogramm</b>.'},
    {s:'Blok-sxemaning boshlanishi va oxiri qaysi blok bilan belgilanadi?', v:['Oval','Romb','To‘rtburchak','Parallelogramm'], t:0, izoh:'Boshlash va tugash — <b>oval</b> blok.'},
    {s:'Algoritmning har bir buyrug‘i faqat bir xil ma’noda tushunilishi qaysi xossa?', v:['Ommaviylik','Aniqlik','Diskretlik','Natijaviylik'], t:1, izoh:'Bu <b>aniqlik</b> xossasi. Diskretlik — qadamlarga bo‘linish, natijaviylik — chekli qadamda natija.'},
    {s:'Bir xil amallar qayta-qayta bajariladigan algoritm qanday ataladi?', v:['Chiziqli','Tarmoqlanuvchi','Takrorlanuvchi (siklik)','Tasodifiy'], t:2, izoh:'<b>Takrorlanuvchi (siklik)</b> algoritm: blok-sxemada strelka oldingi blokka qaytadi.'},
    {s:'Sahnadagi algoritmda devor robotdan 5 katak narida. Algoritm tugaganda k nechaga teng?', v:['4','5','6','0'], t:1, izoh:'Robot devorgacha 5 qadam yuradi, har qadamda k bittaga oshadi: k = <b>5</b>.'},
    {s:'Romb blokidan nechta chiqish yo‘li bor?', v:['1','2','3','4'], t:1, izoh:'<b>2</b> ta: shart rost («ha») va yolg‘on («yo‘q») bo‘lgandagi yo‘llar.'},
    {s:'Blok-sxema belgilarini qaysi xalqaro standart belgilaydi?', v:['ISO 5807','ISO 9001','IEEE 754','ISO 216'], t:0, izoh:'<b>ISO 5807</b> (1985); uning asosida MDH mamlakatlarida GOST 19.701-90 ishlatiladi. ISO 9001 — sifat menejmenti, ISO 216 — qog‘oz formatlari.'},
    {s:'Buyruqlar faqat yozilgan tartibda, bittadan, hech qanday shartsiz bajariladigan algoritm qaysi?', v:['Chiziqli','Tarmoqlanuvchi','Siklik','Rekursiv'], t:0, izoh:'<b>Chiziqli</b> algoritm: masalan, choy damlash yoki uchburchak yuzini hisoblash.'},
    {tur:'3d', s:'Blok-sxemada <b>shartni tekshiruvchi</b> blokni bosing.', hodisa:'im-blok', kalit:'nom', togri:['romb'], v:['Romb («Oldinda devor bormi?»)','boshqa blok'], t:0,
     izoh:'<b>Romb</b> — shart bloki: «Oldinda devor bormi?» savoliga javobga qarab algoritm tarmoqlanadi.'}
  ],
  yordamchi:[
    {s:'Algoritm va dastur farqi nima?', j:'Algoritm — masalani yechish rejasi, u so‘z, blok-sxema yoki formulalar bilan yozilishi mumkin. Dastur — algoritmning kompyuter tushunadigan dasturlash tilidagi yozuvi. Bitta algoritm turli tillarda turli dasturlar bilan yozilishi mumkin.', kalit:['dastur','farq','algoritm']},
    {s:'«k := k + 1» nimani bildiradi?', j:'Bu o‘zlashtirish amali: k ning hozirgi qiymatiga 1 qo‘shilib, natija yana k ga yoziladi. Matematikadagi tenglama emas! Agar k = 2 bo‘lsa, amaldan keyin k = 3 bo‘ladi. Shunday o‘zgaruvchi hisoblagich (sanagich) deyiladi.', kalit:['k','o‘zlashtirish','hisoblagich',':=']},
    {s:'Nega algoritm cheksiz ishlab qolishi mumkin?', j:'Agar sikl shartini o‘zgartiradigan amal bo‘lmasa, shart doim bir xil qoladi va sikl to‘xtamaydi. Masalan, robot yurmasa-yu, faqat «devor bormi?» deb so‘rayversa. Shuning uchun natijaviylik xossasi muhim: algoritm chekli qadamdan keyin tugashi kerak.', kalit:['cheksiz','sikl','to‘xtamaydi']}
  ],
  maqola:[
    {sarlavha:'Algoritm nima?', xatboshilar:[
      'Kundalik hayotimiz algoritmlarga to‘la: choy damlash, maktabga borish yo‘li, misol yechish tartibi. Algoritm — belgilangan maqsadga erishish uchun bajaruvchiga beriladigan aniq buyruqlar ketma-ketligi. Bajaruvchi odam, robot yoki kompyuter bo‘lishi mumkin.',
      '«Algoritm» so‘zi IX asrda Bag‘doddagi «Bayt al-hikma»da ishlagan buyuk vatandoshimiz Muhammad ibn Muso al-Xorazmiy nomi bilan bog‘liq. Uning hind raqamlari bilan hisoblash haqidagi asari XII asrda lotin tiliga «Algoritmi de numero Indorum» nomi bilan tarjima qilingan; muallif ismining lotincha shakli «Algoritmi» vaqt o‘tib hisoblash qoidalarining umumiy nomiga aylangan.',
      'Algoritmni bir necha usulda yozish mumkin: so‘z bilan (ro‘yxat ko‘rinishida), blok-sxema (chizma) bilan, formulalar bilan yoki dasturlash tilida. Blok-sxema algoritm tuzilishini ko‘rgazmali ko‘rsatadi, shuning uchun o‘rganishni undan boshlash qulay.'
    ]},
    {sarlavha:'Algoritm xossalari', xatboshilar:[
      'Diskretlik — algoritm alohida, ketma-ket bajariladigan qadamlarga bo‘lingan. Tushunarlilik — har bir buyruq bajaruvchiga tanish va u uni bajara oladi (robotga «uch qadam yur» deyish mumkin, «xursand bo‘l» deyish mumkin emas).',
      'Aniqlik — har qadam bir xil ma’noda tushuniladi, «bir oz tuz sol» kabi noaniq buyruqlar bo‘lmaydi. Natijaviylik — chekli sondagi qadamdan keyin natija olinadi, algoritm abadiy ishlab qolmaydi.',
      'Ommaviylik — algoritm bitta masala uchun emas, bir turdagi masalalar uchun yaroqli: sahnadagi algoritm devor 2, 3 yoki 5 katak narida bo‘lsa ham to‘g‘ri ishlaydi, faqat natija (k) har xil chiqadi.'
    ]},
    {sarlavha:'Blok-sxema bloklari', xatboshilar:[
      'Blok-sxema — algoritmning geometrik shakllar va strelkalar yordamidagi chizmasi. Bloklar shakli xalqaro ISO 5807:1985 standartida belgilangan, MDH mamlakatlarida uning asosida tuzilgan GOST 19.701-90 qo‘llaniladi. Shunday qilib, blok-sxemani dunyoning istalgan joyidagi dasturchi tushunadi.',
      'Oval (yumaloq burchakli) blok — «Boshlash» va «Tugash». To‘rtburchak — amal yoki hisoblash, masalan «k := 0». Parallelogramm — ma’lumotni kiritish yoki natijani chiqarish. Romb — shart: uning ichiga savol yoziladi, chiqishlari «ha» va «yo‘q» deb belgilanadi.',
      'Bloklar strelkalar bilan bog‘lanadi. Odatda algoritm yuqoridan pastga, chapdan o‘ngga o‘qiladi; strelka orqaga qaytsa — bu sikl belgisi. Har bir blokdan (rombdan tashqari) faqat bitta chiqish bo‘ladi.'
    ]},
    {sarlavha:'Algoritm turlari', xatboshilar:[
      'Chiziqli algoritmda buyruqlar yozilgan tartibda bittadan bajariladi: masalan, «ikki sonni kirit → yig‘indisini hisobla → natijani chiqar». Blok-sxemasi tepadan pastga to‘g‘ri chiziq bo‘lib tushadi.',
      'Tarmoqlanuvchi algoritmda shartga qarab ikki yo‘ldan biri tanlanadi: «agar yomg‘ir yog‘sa — soyabon ol, aks holda — olma». Blok-sxemada bu romb bilan ko‘rsatiladi.',
      'Takrorlanuvchi (siklik) algoritmda bir guruh amallar shart bajarilguncha qayta-qayta bajariladi. Sahnadagi robot algoritmi — sikl: «devor yo‘q ekan — bir qadam yur va sanagichni oshir». Ko‘pincha real algoritmlar uchala turni ham o‘z ichiga oladi.'
    ]}
  ],
  formulalar:[
    ['k := 0','O‘zgaruvchiga boshlang‘ich qiymat berish (sanagichni nollash)'],
    ['k := k + 1','Sanagichni bittaga oshirish (o‘zlashtirish amali)'],
    ['Qadamlar soni = masofa','Sahnadagi algoritm natijasi: k = devorgacha bo‘sh kataklar soni']
  ],
  qiziqarli:[
    'Al-Xorazmiy IX asrda Bag‘doddagi «Bayt al-hikma» ilm markazida ishlagan; «algebra» so‘zi ham uning «al-jabr» kitobi nomidan kelgan.',
    'Evklid algoritmi (ikki sonning eng katta umumiy bo‘luvchisini topish) 2300 yildan ortiq tarixga ega va hozir ham kompyuterlarda ishlatiladi.',
    'Blok-sxema belgilarining xalqaro standarti ISO 5807 1985-yilda qabul qilingan.',
    'Birinchi kompyuter dasturi muallifi deb ko‘pincha Ada Lavleys tilga olinadi: u 1843-yilda Bebbijning analitik mashinasi uchun Bernulli sonlarini hisoblash algoritmini yozgan.',
    'Navigator ilovasi eng qisqa yo‘lni topishda graflar bo‘yicha algoritmlardan (masalan, Deykstra algoritmi, 1959) foydalanadi.'
  ],
  lugat:[
    ['Algoritm','Maqsadga erishish uchun aniq buyruqlar ketma-ketligi.'],
    ['Bajaruvchi','Algoritmni bajaruvchi odam, robot yoki kompyuter.'],
    ['Blok-sxema','Algoritmning bloklar va strelkalar bilan chizmasi.'],
    ['Diskretlik','Algoritmning alohida qadamlarga bo‘linishi.'],
    ['Aniqlik','Har buyruqning bir xil tushunilishi.'],
    ['Natijaviylik','Chekli qadamdan keyin natija olinishi.'],
    ['Ommaviylik','Bir turdagi masalalar uchun yaroqlilik.'],
    ['Chiziqli algoritm','Buyruqlar ketma-ket, shartsiz bajariladigan algoritm.'],
    ['Tarmoqlanuvchi algoritm','Shartga qarab yo‘l tanlanadigan algoritm.'],
    ['Takrorlanuvchi (siklik) algoritm','Amallar qayta-qayta bajariladigan algoritm.'],
    ['O‘zgaruvchi','Qiymati o‘zgarishi mumkin bo‘lgan nomlangan kattalik (masalan, k).'],
    ['O‘zlashtirish','O‘zgaruvchiga yangi qiymat berish (:=).']
  ],
  manba:IMI_DAR+'; ISO 5807:1985 «Information processing — Documentation symbols and conventions for data, program and system flowcharts…» (iso.org/standard/11955.html); GOST 19.701-90 (ISO 5807-85) «Схемы алгоритмов, программ, данных и систем»; '+IMI_W+': «Algorithm», «Muhammad ibn Musa al-Khwarizmi», «Flowchart», «Euclidean algorithm», «Ada Lovelace», «Dijkstra’s algorithm».',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D blok-sxema va robot modeli, «jonli robot» o‘yini, juftlikda blok-sxema chizish',
    maqsad:{talimiy:'Algoritm tushunchasi, xossalari, turlari va blok-sxema belgilarini o‘rgatish; blok-sxemani qadamma-qadam bajarishni o‘rgatish.',
      tarbiyaviy:'Al-Xorazmiy merosiga hurmat, ishni rejalashtirish va tartibga rioya qilish odatini tarbiyalash.',
      rivojlantiruvchi:'Mantiqiy va algoritmik fikrlash, jarayonni bosqichlarga bo‘lish ko‘nikmasini rivojlantirish.'},
    natijalar:['Algoritmning 5 xossasini aytadi','4 turdagi blokni farqlaydi va vazifasini aytadi','Chiziqli, tarmoqlanuvchi va siklik algoritmga misol keltiradi','Oddiy blok-sxemani qadamma-qadam bajaradi va natijani aytadi'],
    jihozlar:['MAKON sahnasi «Algoritm va blok-sxemalar»','Proyektor','Blok shakllari kesilgan kartochkalar','Katakli pol (yoki doskadagi katak chizma) «jonli robot» uchun','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Jonli robot»: bir o‘quvchi faqat aniq buyruqlarni bajaradi — sinf uni eshikkacha olib boradi.','Buyruq beradi, noaniqliklarni topadi.'],
      ['8–16','<b>Algoritm va xossalar.</b> Al-Xorazmiy, 5 xossa, noaniq buyruqlarga misollar.','Xossalarga misol keltiradi.'],
      ['16–26','<b>Blok-sxema.</b> MAKON da bloklarni bosib o‘rganadi; tokenni «Bir qadam» bilan yurgizadi, k qiymatini kuzatadi.','Har qadamda k ni daftarga yozadi.'],
      ['26–34','<b>Algoritm turlari.</b> Chiziqli, tarmoqlanuvchi, siklik; sahnadagi algoritmda qaysilari bor?','Juftlikda «choy damlash» blok-sxemasini chizadi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Algoritm','Aniq buyruqlar ketma-ketligi.'],['Blok-sxema','Algoritm chizmasi.'],['Romb','Shart bloki.'],['Parallelogramm','Kiritish/chiqarish bloki.'],['Sikl','Takrorlanish.']],
    savollar:[['«Algoritm» so‘zi kimning ismidan?','al-Xorazmiy'],['Shart bloki shakli?','Romb'],['Kiritish/chiqarish bloki?','Parallelogramm'],['Devor 2 katak narida bo‘lsa k = ?','2'],['Amallar takrorlanadigan algoritm?','Takrorlanuvchi (siklik)']],
    uy:'Darslikdagi mavzuni o‘qish; (1) «Ikki sondan kattasini topish» algoritmining blok-sxemasini chizish (kiritish a, b → romb «a > b?» → chiqarish a yoki b); (2) «Nonushta tayyorlash» chiziqli algoritmini 6–8 qadamda yozish; (3) sahnadagi algoritmda devor 4 katak narida bo‘lsa, romb bloki necha marta bajariladi? (javob: 5 marta — 4 marta «yo‘q», 1 marta «ha»).',
    manba:IMI_DAR+'; ISO 5807:1985; GOST 19.701-90'
  }
};

DT.im_blok = Object.assign(DT.im_blok || {}, {
  oval:{nom:'Oval blok — «Boshlash» / «Tugash»', sarlavha2:'Blok-sxema · terminator', jadval:[['Vazifasi','algoritmning boshlanishi va oxiri'],['Chiqishlar','«Boshlash» — 1 chiqish; «Tugash» — chiqishsiz'],['Standart nomi','terminator (ISO 5807)'],['Sahnada','B1 «Boshlash», B6 «Tugash»']], matn:'Har bir blok-sxemada bitta «Boshlash» bo‘ladi. Algoritm qaysi yo‘ldan borsa ham, oxiri «Tugash» blokiga yetib kelishi kerak — bu natijaviylik xossasining ko‘rinishi.', manba:'ISO 5807:1985; GOST 19.701-90'},
  tortburchak:{nom:'To‘rtburchak — amal (jarayon)', sarlavha2:'Blok-sxema · process', jadval:[['Vazifasi','hisoblash, o‘zlashtirish, harakat'],['Chiqishlar','1 ta'],['Misol','k := 0;  k := k + 1;  bir qadam oldinga'],['Sahnada','B2, B4']], matn:'To‘rtburchak ichida bajaruvchi bajarishi kerak bo‘lgan amal yoziladi. Bir blokda bir nechta oddiy amal ham yozilishi mumkin (B4 da: qadam va k ni oshirish).', manba:'ISO 5807:1985; GOST 19.701-90'},
  romb:{nom:'Romb — shart (qaror)', sarlavha2:'Blok-sxema · decision', jadval:[['Vazifasi','shartni tekshiradi'],['Chiqishlar','2 ta: «Ha» (rost) va «Yo‘q» (yolg‘on)'],['Misol','«Oldinda devor bormi?», «a > b?»'],['Sahnada','B3']], matn:'Romb algoritmni tarmoqlaydi. Agar «yo‘q» yo‘li strelka bilan oldingi bloklarga qaytib kelsa, sikl hosil bo‘ladi — sahnadagi algoritmda aynan shunday.', manba:'ISO 5807:1985; GOST 19.701-90'},
  parallelogramm:{nom:'Parallelogramm — kiritish / chiqarish', sarlavha2:'Blok-sxema · data', jadval:[['Vazifasi','ma’lumotni kiritish yoki natijani chiqarish'],['Chiqishlar','1 ta'],['Misol','«a, b ni kiriting»; «Chiqarish: k»'],['Sahnada','B5']], matn:'Kiritish — algoritm ishlashi uchun kerakli boshlang‘ich ma’lumot (masalan, klaviaturadan son). Chiqarish — natijani ekranga yoki qog‘ozga berish.', manba:'ISO 5807:1985; GOST 19.701-90'},
  strelka:{nom:'Strelka — oqim chizig‘i', sarlavha2:'Blok-sxema · bajarilish yo‘nalishi', jadval:[['Vazifasi','bloklar qaysi tartibda bajarilishini ko‘rsatadi'],['Odatiy yo‘nalish','yuqoridan pastga, chapdan o‘ngga'],['Orqaga qaytsa','sikl'],['Romb chiqishlarida','«Ha» / «Yo‘q» yozuvi']], matn:'Yo‘nalish odatiy bo‘lsa (pastga yoki o‘ngga), standart bo‘yicha strelka uchi qo‘yilmasligi ham mumkin; boshqa yo‘nalishlarda uch albatta chiziladi.', manba:'ISO 5807:1985'},
  robot:{nom:'Robot — bajaruvchi', sarlavha2:'Algoritm bajaruvchisi', jadval:[['Biladigan buyruqlari','«bir qadam oldinga», «oldinda devor bormi?»'],['Xotirasi','o‘zgaruvchi k (qadamlar sanagichi)'],['Natija','devorgacha qadamlar soni'],['Xossa','tushunarlilik: faqat o‘zi biladigan buyruqlarni bajaradi']], matn:'Bajaruvchining buyruqlar tizimi — u tushunadigan buyruqlar ro‘yxati. Algoritm faqat shu buyruqlardan tuzilishi kerak, aks holda bajaruvchi uni bajara olmaydi.', manba:IMI_DAR}
});

/* ---------------- 4. KOMPYUTER TARMOQLARI VA INTERNET (8-sinf) ---------------- */
bogla('informatika', 'Kompyuter tarmoqlari va Internet', 'info-tarmoq', 'Router, kommutator, IP manzil, DNS, paketlar: lokal tarmoqdan Internetgacha');

L['info-tarmoq'] = {
  fan:'informatika', sinf:'8-sinf', qisqaNom:'Tarmoqlar', nom:'Kompyuter tarmoqlari va Internet',
  qisqa:'8-sinf · Informatika · paketlar 3D tarmoqda yuguradi',
  sahna:'im_tarmoq',
  kor:{
    sarlavha:'Kompyuterlar bir-biri bilan qanday gaplashadi?',
    matn:'Kompyuter tarmog‘i — ma’lumot almashish uchun kabel yoki radioto‘lqin orqali ulangan qurilmalar. Sahnada maktab lokal tarmog‘i: kompyuterlar kommutatorga, kommutator routerga ulangan, noutbuk va telefon Wi-Fi orqali ishlaydi. Router provayder orqali Internetga chiqadi, u yerda DNS server va veb-server turibdi. Ma’lumot kichik bo‘laklar — paketlar ko‘rinishida yuboriladi; har paketda qabul qiluvchining IP manzili yozilgan. Tugmalar bilan paket yuboring va uning yo‘lini kuzating. Sahnadagi IP manzillar — o‘quv namunasi.',
    punktlar:[
      '<b>LAN</b> — lokal tarmoq (xona, maktab); <b>WAN</b> — keng hududiy tarmoq; <b>Internet</b> — tarmoqlar tarmog‘i',
      '<b>IP manzil</b> — qurilmaning tarmoqdagi raqamli manzili: IPv4 — 32 bit (masalan, 192.168.1.10), IPv6 — 128 bit',
      '<b>DNS</b> — domen nomini (maktab.uz) IP manzilga aylantiruvchi «telefon kitobi»',
      '<b>Router</b> tarmoqlarni bog‘laydi va paketga yo‘l tanlaydi, <b>kommutator</b> lokal tarmoq ichida paketni kerakli portga uzatadi'
    ]
  },
  bolimlar:[
    {sarlavha:'Tarmoq qurilmalari', jadval:[
      ['Kommutator (switch)','bitta lokal tarmoq ichidagi qurilmalarni ulaydi, paketni faqat kerakli portga yuboradi'],
      ['Router (marshrutizator)','turli tarmoqlarni bog‘laydi, paketga yo‘l tanlaydi; uyda ko‘pincha Wi-Fi nuqtasi ham'],
      ['Provayder','Internetga ulanish xizmatini beruvchi tashkilot'],
      ['Server','boshqa qurilmalarga xizmat ko‘rsatuvchi kompyuter (sayt, pochta, DNS)'],
      ['Kabel / Wi-Fi','ma’lumot uzatish muhiti: mis yoki optik tola / radioto‘lqin']
    ]},
    {sarlavha:'Manzillar (o‘quv namunalari)', jadval:[
      ['192.168.1.10–13','xususiy (lokal) manzillar — RFC 1918; Internetda to‘g‘ridan-to‘g‘ri ko‘rinmaydi'],
      ['192.168.1.1','routerning lokal tarmoqdagi manzili'],
      ['203.0.113.5, 198.51.100.20, 192.0.2.53','hujjat va o‘quv misollari uchun ajratilgan manzillar — RFC 5737 (haqiqiy saytlarniki emas)'],
      ['maktab.uz','namuna domen nomi']
    ], matn:'Xususiy manzillar ko‘p uy va maktablarda takrorlanadi; router ularni o‘zining tashqi manziliga almashtirib Internetga chiqaradi (NAT).'},
    {sarlavha:'Internet tarixidan', jadval:[
      ['1969-yil 29-oktabr','ARPANET orqali birinchi xabar: UCLA → SRI, «LO» (tizim «LOGIN» ning ikki harfidan keyin to‘xtagan)'],
      ['1983-yil 1-yanvar','ARPANET TCP/IP protokollariga o‘tgan'],
      ['1989-yil mart','Tim Berners-Li CERN da Butunjahon o‘rgimchak to‘ri (WWW) taklifini yozgan'],
      ['1991-yil 6-avgust','WWW loyihasi ommaga e’lon qilingan'],
      ['1995-yil 29-aprel','.uz domeni O‘zbekistonga ajratilgan (IANA)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Tarmoq nima?', matn:'Tarmoq — ma’lumot almashish uchun ulangan qurilmalar. Sahnada bitta xonadagi (maktabdagi) lokal tarmoq — LAN: ikki kompyuter, noutbuk va telefon. Tarmoq resurslarni — printer, fayl, Internetni — birgalikda ishlatish imkonini beradi.', holat:{rejim:null, qurilma:null, ip:false}},
    {sarlavha:'Kommutator va yulduz topologiya', matn:'Kompyuterlar kabel bilan kommutatorga ulangan: har bir qurilma markaziy qurilmaga ulanadi — bu «yulduz» topologiyasi. Kommutator paketdagi manzilga qarab uni faqat kerakli portga yuboradi.', holat:{rejim:null, qurilma:'kommutator', ip:false}},
    {sarlavha:'IP manzil', matn:'Har bir qurilmaning IP manzili bor. IPv4 manzil 32 bitdan iborat va nuqta bilan ajratilgan 4 ta sondan (har biri 0–255) yoziladi: 192.168.1.10. IPv4 da 2³² ≈ 4,3 milliard manzil bor — bu yetmay qolgani uchun 128 bitli IPv6 yaratilgan.', holat:{rejim:null, qurilma:'kompyuter', ip:true}},
    {sarlavha:'Lokal tarmoqda paket', matn:'Kompyuter noutbukka fayl yuborganda ma’lumot paketlarga bo‘linadi. Paket kommutator va Wi-Fi nuqtasi (router) orqali noutbukka yetadi — Internetga chiqmaydi. «LAN» tugmasini bosib kuzating.', holat:{rejim:'lan', qurilma:null, ip:true}},
    {sarlavha:'DNS: nomdan manzilga', matn:'Brauzerga «maktab.uz» yozilganda telefon avval DNS serverdan so‘raydi: «maktab.uz ning IP manzili qanday?» DNS javob beradi — 198.51.100.20. Odamlarga nom qulay, kompyuterlarga — raqam.', holat:{rejim:'dns', qurilma:'dns', ip:true}},
    {sarlavha:'Internet orqali saytga', matn:'Endi telefon paketni veb-server manziliga yuboradi: Wi-Fi → router → provayder → Internet → server. Javob xuddi shu yo‘l bilan qaytadi. Router lokal manzilni o‘zining tashqi manziliga (203.0.113.5) almashtiradi.', holat:{rejim:'internet', qurilma:'router', ip:true}},
    {sarlavha:'Protokollar: umumiy til', matn:'Tarmoqdagi qurilmalar protokollar — kelishilgan qoidalar asosida gaplashadi. TCP/IP paketlarni manzilga yetkazadi va yo‘qolganini qayta so‘raydi; HTTP va HTTPS veb-sahifalarni uzatadi (HTTPS — shifrlangan). ARPANET 1983-yil 1-yanvarda TCP/IP ga o‘tgan.', holat:{rejim:'internet', qurilma:'server', ip:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Tarmoqni boshqaring', holat:{rejim:null, qurilma:null, ip:false},
    topshiriqlar:[
      {shart:'Lokal tarmoqni Internet bilan bog‘laydigan va paketga yo‘l tanlaydigan qurilmani — <b>routerni</b> bosing.', hodisa:'im-qurilma', kod:"ev.nom==='router'", izoh:'To‘g‘ri — <b>router</b> (marshrutizator). Uyda u ko‘pincha Wi-Fi nuqtasi vazifasini ham bajaradi.'},
      {shart:'<b>LAN</b> tugmasi bilan kompyuterdan noutbukka paket yuboring.', hodisa:'im-paket', kod:"ev.rejim==='lan'", izoh:'To‘g‘ri — paket <b>lokal tarmoq ichida</b> qoldi, Internetga chiqmadi.'},
      {shart:'<b>DNS</b> so‘rovini yuboring: «maktab.uz» nomini IP manzilga aylantiring.', hodisa:'im-paket', kod:"ev.rejim==='dns'", izoh:'To‘g‘ri — <b>DNS</b> nomga mos IP manzilni qaytardi: 198.51.100.20.'},
      {shart:'Endi telefondan <b>veb-serverga</b> Internet orqali paket yuboring.', hodisa:'im-paket', kod:"ev.rejim==='internet'", izoh:'To‘g‘ri — paket router va provayder orqali <b>serverga</b> yetdi.'},
      {shart:'Sayt saqlanadigan <b>veb-serverni</b> bosing va uning IP manzilini o‘qing.', hodisa:'im-qurilma', kod:"ev.nom==='server'", izoh:'To‘g‘ri — <b>veb-server</b>, namuna manzil 198.51.100.20.'}
    ]},
  test:[
    {s:'Turli tarmoqlarni bog‘lab, paketga yo‘l tanlaydigan qurilma qaysi?', v:['Kommutator','Router (marshrutizator)','Printer','Monitor'], t:1, izoh:'<b>Router (marshrutizator)</b>. Kommutator faqat bitta lokal tarmoq ichida ishlaydi.'},
    {s:'IPv4 manzil necha bitdan iborat?', v:['8','32','64','128'], t:1, izoh:'IPv4 — <b>32</b> bit: 4 ta son, har biri 8 bit (0–255).'},
    {s:'IPv6 manzil necha bitdan iborat?', v:['32','64','128','256'], t:2, izoh:'IPv6 — <b>128</b> bit; manzillar soni 2¹²⁸ — amalda tugamaydigan darajada ko‘p.'},
    {s:'DNS ning vazifasi nima?', v:['Fayllarni siqadi','Domen nomini IP manzilga aylantiradi','Viruslarni o‘chiradi','Wi-Fi parolini saqlaydi'], t:1, izoh:'DNS <b>domen nomini IP manzilga aylantiradi</b> — Internetning «telefon kitobi».'},
    {s:'192.168.1.10 manzil qanday manzil?', v:['Xususiy (lokal tarmoq) manzili','IPv6 manzili','Noto‘g‘ri yozilgan manzil','Domen nomi'], t:0, izoh:'192.168.x.x — <b>xususiy (lokal tarmoq) manzili</b> (RFC 1918): u Internetda to‘g‘ridan-to‘g‘ri ko‘rinmaydi.'},
    {s:'IPv4 manzildagi har bir son qaysi oraliqda bo‘ladi?', v:['0–99','0–255','1–1024','0–65535'], t:1, izoh:'Har son 8 bit: <b>0–255</b>. Shuning uchun 192.168.1.300 — noto‘g‘ri manzil.'},
    {s:'Barcha kompyuterlar bitta markaziy qurilmaga ulangan topologiya qanday ataladi?', v:['Shina','Halqa','Yulduz','Daraxt'], t:2, izoh:'<b>Yulduz</b> topologiyasi: markazda kommutator. Bir kabel uzilsa, faqat bitta kompyuter ajraladi.'},
    {s:'ARPANET TCP/IP protokollariga qachon o‘tgan?', v:['1969-yil 29-oktabr','1983-yil 1-yanvar','1991-yil 6-avgust','1995-yil 29-aprel'], t:1, izoh:'<b>1983-yil 1-yanvar</b> — zamonaviy Internetning «tug‘ilgan kuni» deb ham ataladi. 1969 — birinchi xabar, 1995 — .uz domeni.'},
    {s:'.uz domeni O‘zbekistonga qachon ajratilgan?', v:['1991-yil','1995-yil 29-aprel','2002-yil','2010-yil'], t:1, izoh:'<b>1995-yil 29-aprel</b> — bu sana O‘zbekistonda Internet kuni sifatida nishonlanadi.'},
    {s:'Veb-sahifani shifrlangan holda uzatuvchi protokol qaysi?', v:['HTTP','HTTPS','FTP','DNS'], t:1, izoh:'<b>HTTPS</b> — HTTP ning TLS shifrlash bilan himoyalangan varianti; brauzerda qulf belgisi bilan ko‘rsatiladi.'},
    {s:'Butunjahon o‘rgimchak to‘ri (WWW) ni kim yaratgan?', v:['Bill Geyts','Tim Berners-Li','Stiv Jobs','Leonard Kleynrok'], t:1, izoh:'<b>Tim Berners-Li</b> CERN da 1989-yilda taklif yozgan, 1991-yilda WWW ommaga e’lon qilingan.'},
    {tur:'3d', s:'Sahnada lokal tarmoqni Internetga ulaydigan <b>routerni</b> bosing.', hodisa:'im-qurilma', kalit:'nom', togri:['router'], v:['Router','boshqa qurilma'], t:0,
     izoh:'<b>Router</b> ichki tarmoq (192.168.1.1) va tashqi tarmoq (203.0.113.5 — namuna) orasida turadi.'}
  ],
  yordamchi:[
    {s:'Internet va WWW bir narsami?', j:'Yo‘q. Internet — butun dunyodagi tarmoqlarni bog‘lovchi infratuzilma (kabellar, routerlar, protokollar). WWW (veb) — Internet ustida ishlaydigan xizmatlardan biri: veb-sahifalar va havolalar. Elektron pochta, messenjerlar, o‘yinlar ham Internetdan foydalanadi, lekin ular WWW emas.', kalit:['internet','www','veb','farq']},
    {s:'Nega ma’lumot paketlarga bo‘linadi?', j:'Katta faylni bir butun yuborish noqulay: bitta xato bo‘lsa hammasini qayta yuborish kerak bo‘ladi. Paketlar alohida yuboriladi, turli yo‘llardan borishi mumkin, qabul qiluvchida tartib bilan yig‘iladi; yo‘qolgan paket qayta so‘raladi (TCP).', kalit:['paket','nega','bo‘linadi']},
    {s:'Kommutator va routerning farqi nima?', j:'Kommutator bitta lokal tarmoq ichida ishlaydi: paketni kerakli kompyuterning portiga uzatadi. Router esa turli tarmoqlarni (masalan, uy tarmog‘i va provayder tarmog‘ini) bog‘laydi va paketga yo‘l tanlaydi. Uydagi Wi-Fi qurilmasi ko‘pincha ikkalasini ham bajaradi.', kalit:['kommutator','router','farq','switch']}
  ],
  maqola:[
    {sarlavha:'Tarmoq va uning turlari', xatboshilar:[
      'Kompyuter tarmog‘i — ma’lumot va resurslarni birgalikda ishlatish uchun bog‘langan qurilmalar majmuasi. Tarmoq yordamida bitta printerdan butun sinf foydalanadi, fayllar bir kompyuterdan boshqasiga o‘tadi, Internetga chiqiladi.',
      'Tarmoqlar hajmiga qarab bo‘linadi: lokal tarmoq (LAN) — bitta xona, bino yoki maktab ichida; shahar tarmog‘i (MAN); keng hududiy tarmoq (WAN) — shaharlar va mamlakatlar orasida. Internet — millionlab tarmoqlarni bog‘lagan «tarmoqlar tarmog‘i».',
      'Qurilmalarni ulash usuli topologiya deyiladi. «Yulduz» da hamma qurilma markazdagi kommutatorga ulanadi — bugun eng keng tarqalgan usul. «Shina» da barcha qurilmalar bitta umumiy kabelga, «halqa» da esa har biri qo‘shnisiga ulanadi.'
    ]},
    {sarlavha:'Manzillar: IP va DNS', xatboshilar:[
      'Pochta xat yetkazishi uchun manzil kerak bo‘lgani kabi, tarmoqdagi har bir qurilmaning ham manzili bor — IP manzil. IPv4 manzil 32 bitdan iborat va to‘rtta o‘nlik son bilan yoziladi: 192.168.1.10. Har bir son 8 bit, ya’ni 0 dan 255 gacha. Jami 2³² ≈ 4,3 milliard manzil bor — Internetdagi qurilmalar uchun bu yetmay qoldi, shuning uchun 128 bitli IPv6 ishlab chiqilgan.',
      'Ba’zi manzillar maxsus ajratilgan. 192.168.0.0 – 192.168.255.255 kabi oraliqlar xususiy tarmoqlar uchun (RFC 1918): ularni istalgan uy va maktab ishlatadi, router esa Internetga chiqishda ularni o‘zining tashqi manziliga almashtiradi (NAT). 192.0.2.x, 198.51.100.x, 203.0.113.x oraliqlari esa faqat darslik va hujjatlardagi misollar uchun ajratilgan (RFC 5737) — sahnadagi manzillar shular.',
      'Odamlarga raqamlarni eslab qolish qiyin, shuning uchun domen nomlari o‘ylab topilgan: maktab.uz, lex.uz. DNS (Domain Name System) — nomni IP manzilga aylantiruvchi xizmat. O‘zbekistonning milliy domeni .uz 1995-yil 29-aprelda IANA tomonidan ajratilgan; bu sana Internet kuni sifatida nishonlanadi.'
    ]},
    {sarlavha:'Paketlar va protokollar', xatboshilar:[
      'Tarmoqda ma’lumot bir butun holda emas, kichik bo‘laklar — paketlar bilan uzatiladi. Har bir paketda jo‘natuvchi va qabul qiluvchi manzili hamda tartib raqami bor. Paketlar turli yo‘llardan borishi mumkin, qabul qiluvchi ularni tartib bilan yig‘adi.',
      'Qurilmalar protokollar — kelishilgan qoidalar asosida gaplashadi. IP paketni manzilga yetkazish yo‘lini, TCP esa yetkazishning ishonchliligini (yo‘qolgan paketni qayta so‘rash) ta’minlaydi. Veb-sahifalar HTTP yoki himoyalangan HTTPS orqali uzatiladi; HTTPS da ma’lumot shifrlangan, brauzer manzil satrida qulf belgisini ko‘rsatadi.',
      'Paketning yo‘li: kompyuter → kommutator → router → provayder → Internetdagi ko‘plab routerlar → server. Har bir router paketdagi manzilga qarab uni keyingi qurilmaga uzatadi — xuddi pochta bo‘limlari xatni shahardan shaharga uzatganidek.'
    ]},
    {sarlavha:'Internet qanday paydo bo‘lgan?', xatboshilar:[
      'Internetning ajdodi — AQShdagi ARPANET tarmog‘i. 1969-yil 29-oktabrda Kaliforniya universiteti (UCLA) dan Stenford tadqiqot institutiga (SRI) birinchi xabar yuborilgan: «LOGIN» so‘zi yozilayotganda tizim ikki harfdan keyin ishdan chiqqan, shuning uchun birinchi xabar «LO» bo‘lgan; taxminan bir soatdan keyin to‘liq ulanish amalga oshirilgan.',
      '1983-yil 1-yanvarda ARPANET TCP/IP protokollariga o‘tgan — shu tufayli turli tarmoqlar bir-biri bilan erkin «gaplasha» boshlagan. Bu sana ko‘pincha zamonaviy Internetning tug‘ilgan kuni deyiladi.',
      '1989-yil martida CERN da ishlagan Tim Berners-Li gipermatnli axborot tizimi taklifini yozgan; 1990-yil oxirigacha HTML, HTTP va URL tushunchalari, birinchi brauzer va server yaratilgan, 1991-yil 6-avgustda WWW loyihasi ommaga e’lon qilingan. Bugun Internet orqali milliardlab odamlar o‘qiydi, ishlaydi va muloqot qiladi.'
    ]}
  ],
  formulalar:[
    ['N = 2³² = 4 294 967 296','IPv4 manzillar soni (≈ 4,3 mlrd)'],
    ['N = 2¹²⁸ ≈ 3,4 · 10³⁸','IPv6 manzillar soni'],
    ['1 oktet = 8 bit → 0 … 255','IPv4 manzilning har bir soni'],
    ['t = V ÷ v','Uzatish vaqti: hajm (bit) ÷ tezlik (bit/s)']
  ],
  qiziqarli:[
    'Internetdagi birinchi xabar «LO» bo‘lgan: 1969-yil 29-oktabrda «LOGIN» ning ikki harfi yuborilgach, tizim ishdan chiqqan.',
    'Dunyodagi birinchi veb-sayt manzili info.cern.ch bo‘lgan va NeXT kompyuterida ishlagan.',
    '.uz domeniga 1995–2001-yillarda nom bepul ro‘yxatdan o‘tkazilgan.',
    'IPv4 manzillarning markaziy zaxirasi (IANA) 2011-yilda tugagan — IPv6 ga o‘tish shu sababdan tezlashgan.',
    'Qit’alar orasidagi Internet trafigining katta qismi okean tubidagi optik tolali kabellar orqali o‘tadi.'
  ],
  lugat:[
    ['Tarmoq','Ma’lumot almashish uchun ulangan qurilmalar.'],
    ['LAN','Lokal tarmoq (xona, bino, maktab).'],
    ['WAN','Keng hududiy tarmoq.'],
    ['Internet','Butun dunyo tarmoqlarining tarmog‘i.'],
    ['IP manzil','Qurilmaning tarmoqdagi raqamli manzili.'],
    ['DNS','Domen nomini IP manzilga aylantiruvchi tizim.'],
    ['Router','Tarmoqlarni bog‘lab, paketga yo‘l tanlovchi qurilma.'],
    ['Kommutator','Lokal tarmoqda paketni kerakli portga uzatuvchi qurilma.'],
    ['Paket','Tarmoqda uzatiladigan ma’lumot bo‘lagi.'],
    ['Protokol','Qurilmalarning aloqa qoidalari (TCP/IP, HTTP).'],
    ['Provayder','Internet xizmatini beruvchi tashkilot.'],
    ['Topologiya','Tarmoq qurilmalarini ulash sxemasi.'],
    ['Wi-Fi','Radioto‘lqinli simsiz lokal tarmoq texnologiyasi.']
  ],
  manba:IMI_DAR+'; RFC 791 (IPv4), RFC 8200 (IPv6), RFC 1918 (xususiy manzillar), RFC 5737 (hujjat uchun manzillar); ICANN «The First Message Transmission» (2019); L. Kleinrock (lk.cs.ucla.edu); CERN «A short history of the Web» (home.cern); IANA .uz delegatsiya ma’lumoti va cctld.uz (1995-yil 29-aprel); '+IMI_W+': «ARPANET», «Internet protocol suite», «World Wide Web», «Domain Name System», «.uz», «IPv4 address exhaustion».',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D tarmoq modeli, «paket pochtasi» rolli o‘yini, juftlikda manzillarni tahlil qilish',
    maqsad:{talimiy:'Tarmoq turlari va topologiyalari, tarmoq qurilmalari, IP manzil, DNS, paket va protokol tushunchalarini o‘rgatish.',
      tarbiyaviy:'Internetdan ongli va mas’uliyatli foydalanish, milliy domen tarixiga qiziqish uyg‘otish.',
      rivojlantiruvchi:'Tizimli fikrlash, jarayonni modellashtirish va sxema bilan tushuntirish ko‘nikmasini rivojlantirish.'},
    natijalar:['LAN, WAN va Internetni farqlaydi','Router, kommutator, server vazifasini aytadi','IPv4 manzilning tuzilishini tushuntiradi va noto‘g‘ri manzilni aniqlaydi','DNS va paket yo‘lini bosqichma-bosqich tushuntiradi'],
    jihozlar:['MAKON sahnasi «Kompyuter tarmoqlari»','Proyektor','«Paket» konvertlari (manzil yozilgan qog‘ozlar)','Tarmoq kabeli va router (bo‘lsa, ko‘rgazma uchun)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Telefoningizdagi rasm do‘stingizga qaysi yo‘l bilan boradi?»','Taxminlarini aytadi.'],
      ['8–16','<b>Tarmoq va topologiyalar.</b> MAKON da LAN, kommutator, yulduz topologiyasi.','Topologiyalarni chizadi.'],
      ['16–25','<b>IP va DNS.</b> Manzil tuzilishi, 0–255, xususiy va hujjat manzillari; DNS so‘rovini sahnada yuboradi.','Berilgan manzillardan noto‘g‘rilarini topadi.'],
      ['25–33','<b>Paket o‘yini.</b> O‘quvchilar «router», «kommutator», «server» rolida konvert-paketlarni uzatadi; so‘ng sahnada Internet yo‘li.','Rolli o‘yinda qatnashadi.'],
      ['33–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['IP manzil','Qurilma manzili.'],['DNS','Nom → IP.'],['Router','Tarmoqlarni bog‘laydi.'],['Paket','Ma’lumot bo‘lagi.'],['Protokol','Aloqa qoidalari.']],
    savollar:[['IPv4 necha bit?','32'],['IPv4 dagi har son oralig‘i?','0–255'],['DNS vazifasi?','Domen nomini IP ga aylantirish'],['TCP/IP ga o‘tilgan sana?','1983-yil 1-yanvar'],['.uz domeni ajratilgan sana?','1995-yil 29-aprel']],
    uy:'Darslikdagi mavzuni o‘qish; (1) qaysi manzillar to‘g‘ri: 192.168.0.1, 10.0.300.5, 172.16.5.4, 256.1.1.1? (javob: to‘g‘ri — 192.168.0.1 va 172.16.5.4); (2) uydagi (yoki maktabdagi) tarmoq sxemasini chizib, qurilmalarni nomlash; (3) 2³² ni hisoblab, Yer aholisi (≈ 8 mlrd) bilan solishtirish — har odamga bittadan manzil yetadimi? (javob: yo‘q, ≈ 4,3 mlrd).',
    manba:IMI_DAR+'; RFC 1918; RFC 5737; cctld.uz'
  }
};

DT.im_tarmoq = Object.assign(DT.im_tarmoq || {}, {
  router:{nom:'Router (marshrutizator)', sarlavha2:'Tarmoqlarni bog‘lovchi', jadval:[['Ichki manzil','192.168.1.1 (namuna)'],['Tashqi manzil','203.0.113.5 (RFC 5737 namunasi)'],['Vazifasi','paketga yo‘l tanlaydi, lokal tarmoqni Internetga ulaydi'],['NAT','ichki manzillarni bitta tashqi manzilga almashtiradi']], matn:'Uy va maktablardagi router ko‘pincha bir necha qurilmani birlashtiradi: router, kommutator portlari va Wi-Fi nuqtasi. Internetdagi yirik routerlar sekundiga milliardlab paketni uzatadi.', manba:IMI_W+' «Router (computing)», «Network address translation»; RFC 5737'},
  kommutator:{nom:'Kommutator (switch)', sarlavha2:'Lokal tarmoq markazi', jadval:[['Topologiya','yulduz — hamma qurilma unga ulanadi'],['Vazifasi','paketni faqat kerakli portga uzatadi'],['Manzil','qurilmalarni MAC manzili bo‘yicha taniydi'],['Portlar','odatda 5–48 ta']], matn:'Eski «hub» (kontsentrator) paketni hamma portga yuborgan; kommutator esa qaysi qurilma qaysi portda ekanini eslab qoladi va keraksiz trafikni kamaytiradi.', manba:IMI_W+' «Network switch», «MAC address»'},
  kompyuter:{nom:'Kompyuter (mijoz)', sarlavha2:'Tarmoq qurilmasi', jadval:[['IP manzil','192.168.1.10 va 192.168.1.11 (namuna)'],['Ulanish','kabel orqali kommutatorga'],['Tarmoq kartasi','ma’lumotni elektr signaliga aylantiradi'],['Roli','mijoz — xizmatdan foydalanadi']], matn:'Xizmat so‘raydigan qurilma mijoz, xizmat ko‘rsatuvchi — server deyiladi. Bitta kompyuter ham mijoz, ham server bo‘lishi mumkin (masalan, papkasini tarmoqqa ochsa).', manba:IMI_W+' «Client–server model», «Network interface controller»'},
  noutbuk:{nom:'Noutbuk', sarlavha2:'Wi-Fi mijozi', jadval:[['IP manzil','192.168.1.12 (namuna)'],['Ulanish','Wi-Fi — radioto‘lqin'],['Manzil olish','router DHCP orqali avtomatik beradi'],['Tarmoq','lokal tarmoq ichida']], matn:'Noutbuk Wi-Fi ga ulanganda router unga bo‘sh xususiy manzilni avtomatik beradi (DHCP). Shuning uchun uyda yoki maktabda manzilni qo‘lda yozish shart emas.', manba:IMI_W+' «Dynamic Host Configuration Protocol», «Wi-Fi»'},
  telefon:{nom:'Smartfon', sarlavha2:'Wi-Fi mijozi', jadval:[['IP manzil','192.168.1.13 (namuna)'],['Ulanish','Wi-Fi yoki mobil tarmoq'],['Sahnada','«maktab.uz» saytini ochadi'],['Birinchi qadam','DNS dan saytning IP manzilini so‘raydi']], matn:'Telefon Wi-Fi o‘chirilsa, mobil operator tarmog‘i orqali Internetga chiqadi — bu holda uning manzilini operator beradi.', manba:IMI_W+' «Smartphone», «Mobile broadband»'},
  provayder:{nom:'Provayder (ISP)', sarlavha2:'Internet xizmati', jadval:[['Inglizcha','Internet service provider'],['Vazifasi','mijozlar tarmog‘ini Internetga ulaydi'],['Ulanish','optik tola, kabel, mobil tarmoq'],['Beradi','tashqi IP manzil, trafik']], matn:'Provayder katta routerlar va magistral kabellar orqali boshqa provayderlar bilan bog‘langan. Internet — shunday ko‘plab tarmoqlarning kelishuv asosidagi birlashmasi.', manba:IMI_W+' «Internet service provider»'},
  dns:{nom:'DNS server', sarlavha2:'Internetning «telefon kitobi»', jadval:[['Manzil','192.0.2.53 (RFC 5737 namunasi)'],['Vazifasi','domen nomini IP manzilga aylantiradi'],['Misol','maktab.uz → 198.51.100.20 (namuna)'],['Tuzilishi','ierarxik: ildiz → .uz → maktab.uz']], matn:'DNS ierarxik tizim: ildiz serverlar .uz kabi zonalarni biladi, .uz zonasi esa undagi saytlarni. Javoblar vaqtincha eslab qolinadi (kesh), shuning uchun saytlar tez ochiladi.', manba:IMI_W+' «Domain Name System», «.uz»; RFC 5737'},
  server:{nom:'Veb-server', sarlavha2:'Sayt saqlanadigan kompyuter', jadval:[['Manzil','198.51.100.20 (RFC 5737 namunasi)'],['Domen','maktab.uz (namuna)'],['Protokol','HTTP / HTTPS'],['Birinchi veb-server','info.cern.ch, NeXT kompyuteri (1990–1991)']], matn:'Server brauzer so‘rovini qabul qiladi va veb-sahifani paketlar ko‘rinishida qaytaradi. Katta saytlar minglab serverlarda ishlaydi.', manba:'CERN «A short history of the Web»; '+IMI_W+' «Web server»'},
  kabel:{nom:'Tarmoq kabeli', sarlavha2:'Uzatish muhiti', jadval:[['O‘ralgan juftlik','mis simlar, RJ-45 ulagich; lokal tarmoq'],['Optik tola','yorug‘lik impulslari; katta masofa va tezlik'],['Afzalligi','barqaror va tez aloqa'],['Okean kabellari','qit’alararo trafikning asosiy qismi']], matn:'O‘ralgan juftlik kabelida simlar juft-juft o‘ralgan — bu tashqi elektr halaqitlarini kamaytiradi. Optik tolada ma’lumot yorug‘lik bilan uzatiladi.', manba:IMI_W+' «Twisted pair», «Optical fiber», «Submarine communications cable»'},
  wifi:{nom:'Wi-Fi', sarlavha2:'Simsiz lokal tarmoq', jadval:[['Standart','IEEE 802.11 oilasi'],['Chastotalar','2,4 GHz, 5 GHz (yangi qurilmalarda 6 GHz ham)'],['Masofa','xona–uy chegarasida (to‘siqlarga bog‘liq)'],['Himoya','WPA2/WPA3 paroli bilan shifrlash']], matn:'Wi-Fi radioto‘lqinlar orqali ishlaydi, shuning uchun devorlar va masofa signalni susaytiradi. Ochiq (parolsiz) Wi-Fi da maxfiy ma’lumot yubormaslik kerak.', manba:IMI_W+' «Wi-Fi», «IEEE 802.11», «Wi-Fi Protected Access»'}
});

/* ---------------- 5. DASTURLASH: TARMOQLANISH VA SIKLLAR (9-sinf) ---------------- */
bogla('informatika', 'Dasturlash: tarmoqlanish va sikllar', 'info-sikl', 'Robotni labirintdan olib chiqing: oldinga, burilish, takrorla, toki — 3 daraja');

L['info-sikl'] = {
  fan:'informatika', sinf:'9-sinf', qisqaNom:'Tarmoqlanish va sikllar', nom:'Dasturlash: tarmoqlanish va sikllar',
  qisqa:'9-sinf · Informatika · robot 3D labirintda dastur bajaradi',
  sahna:'im_sikl',
  kor:{
    sarlavha:'Robotga dastur yozing',
    matn:'Dastur — bajaruvchi (robot, kompyuter) uchun buyruqlar ketma-ketligi. Sahnada labirint va robot: o‘ngdagi muharrirda <b>oldinga</b>, <b>chapga</b>, <b>o‘ngga</b> buyruqlaridan dastur tuzing. Bir xil buyruqlar takrorlansa — <b>takrorla N [ … ]</b> sikli, yo‘l uzunligi noma’lum bo‘lsa — <b>toki oldinda yo‘l bor: oldinga</b> shartli sikli yordam beradi. Robot devorga urilsa dastur to‘xtaydi. Uchta darajani yeching va buyruqlar sonini kamaytiring.',
    punktlar:[
      '<b>Chiziqli dastur:</b> buyruqlar ketma-ket bajariladi',
      '<b>Sikl (takrorlash):</b> <i>takrorla N</i> — N marta (Pythonda <i>for i in range(N)</i>); <i>toki</i> — shart rost ekan (Pythonda <i>while</i>)',
      '<b>Tarmoqlanish:</b> shartga qarab amal tanlanadi (Pythonda <i>if … else</i>)',
      '<b>Samaradorlik:</b> sikl dasturni qisqartiradi: 17 buyruq o‘rniga 6 ta'
    ]
  },
  bolimlar:[
    {sarlavha:'Robot buyruqlari va Python', jadval:[
      ['oldinga','bir katak oldinga yurish'],
      ['chapga / o‘ngga','joyida 90° burilish'],
      ['takrorla N [ … ]','for i in range(N): … — takrorlanishlar soni oldindan ma’lum'],
      ['toki oldinda yo‘l bor: oldinga','while shart: … — shart yolg‘on bo‘lguncha'],
      ['agar … aks holda …','if shart: … else: … — tarmoqlanish']
    ]},
    {sarlavha:'Darajalar', jadval:[
      ['1-daraja','to‘g‘ri yo‘lak va ikki burilish: chiziqli dastur yoki qisqa sikllar'],
      ['2-daraja','zinapoya: bir xil 4 buyruq 4 marta takrorlanadi — takrorla bilan ≤ 8 buyruq'],
      ['3-daraja','spiral: yo‘laklar uzunligi har xil — «toki» shartli sikli kerak']
    ], matn:'Buyruqlar sonini sanashda yopuvchi qavs «]» hisobga olinmaydi.'}
  ],
  bosqichlar:[
    {sarlavha:'Chiziqli dastur', matn:'Robot (1,1) katakda, sharqqa (o‘ngga) qaragan. «oldinga» uni bir katak siljitadi, «o‘ngga» va «chapga» joyida buradi. 1-darajani chiziqli dastur bilan yechish mumkin: oldinga, oldinga, oldinga, o‘ngga, oldinga, oldinga, chapga, oldinga — 8 buyruq.', holat:{daraja:1, dastur:'oldinga oldinga oldinga o‘ngga oldinga oldinga chapga oldinga'}},
    {sarlavha:'Takrorlash sikli', matn:'Uch marta «oldinga» o‘rniga «takrorla 3 [oldinga]» yozish mumkin. Pythonda bu: <i>for i in range(3): oldinga()</i>. Takrorlanishlar soni oldindan ma’lum bo‘lgan sikl — parametrli sikl.', holat:{daraja:1, dastur:'takrorla3 oldinga ] o‘ngga takrorla2 oldinga ] chapga oldinga'}},
    {sarlavha:'Zinapoya: sikl tanasi', matn:'2-darajada bir xil to‘rt buyruq — oldinga, o‘ngga, oldinga, chapga — to‘rt marta takrorlanadi, oxirida yana bitta «oldinga». Siklsiz dastur 17 buyruq, sikl bilan — 6 ta. Qavslar ichidagi buyruqlar sikl tanasi deyiladi.', holat:{daraja:2, dastur:'takrorla4 oldinga o‘ngga oldinga chapga ] oldinga'}},
    {sarlavha:'Shartli sikl: toki', matn:'Yo‘lak uzunligi noma’lum bo‘lsa, necha marta «oldinga» yozishni bilmaymiz. «toki oldinda yo‘l bor: oldinga» — shart rost ekan, robot yuraveradi va devor oldida o‘zi to‘xtaydi. Pythonda: <i>while oldinda_yol(): oldinga()</i>.', holat:{daraja:3, dastur:'toki o‘ngga toki'}},
    {sarlavha:'Sikl ichida sikl', matn:'3-daraja spiral: «devorgacha yur, o‘ngga buril» to‘rt marta takrorlanadi. Dastur: takrorla 4 [toki oldinda yo‘l bor: oldinga, o‘ngga] — atigi 3 buyruq. To‘rtinchi aylanishda robot maqsadga yetadi va dastur to‘xtaydi.', holat:{daraja:3, dastur:'takrorla4 toki o‘ngga ]'}},
    {sarlavha:'Tarmoqlanish va xatolar', matn:'«toki» ichida shart tekshiriladi — bu tarmoqlanish: rost bo‘lsa yur, yolg‘on bo‘lsa siklni tugat. Dasturda xato bo‘lsa, robot devorga uriladi: qaysi buyruqda to‘xtaganini ko‘rib, dasturni tuzating (bu «otladka» — xatolarni tuzatish).', holat:{daraja:2, dastur:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Labirintdan chiqing', holat:{daraja:1, dastur:null},
    topshiriqlar:[
      {shart:'<b>1-daraja:</b> robotni maqsad katagiga (yulduz) olib boradigan dastur tuzing va ishga tushiring.', hodisa:'im-dastur', kod:"ev.daraja===1 && ev.yetdi", izoh:'To‘g‘ri — robot <b>maqsadga yetdi</b>. Endi dasturni sikl bilan qisqartirib ko‘ring.'},
      {shart:'<b>2-daraja</b> (zinapoya)ni tanlang va <b>takrorla</b> yordamida ko‘pi bilan <b>8 buyruq</b> bilan yeching.', hodisa:'im-dastur', kod:"ev.daraja===2 && ev.yetdi && ev.sikl && ev.buyruq<=8", izoh:'To‘g‘ri — <b>sikl</b> dasturni 17 buyruqdan 6–8 taga qisqartirdi.'},
      {shart:'<b>3-daraja</b> (spiral)ni <b>toki</b> (shartli sikl) buyrug‘i yordamida yeching.', hodisa:'im-dastur', kod:"ev.daraja===3 && ev.yetdi && ev.shart", izoh:'To‘g‘ri — <b>shartli sikl</b> yo‘lak uzunligini bilmasdan ishladi.'},
      {shart:'3-darajani <b>ko‘pi bilan 4 buyruq</b> bilan yeching (takrorla + toki).', hodisa:'im-dastur', kod:"ev.daraja===3 && ev.yetdi && ev.buyruq<=4", izoh:'To‘g‘ri — masalan, <b>takrorla 4 [toki oldinda yo‘l bor: oldinga, o‘ngga]</b> — 3 buyruq.'}
    ]},
  test:[
    {s:'Shart rost bo‘lsa bir amal, aks holda boshqa amal bajariladigan tuzilma qanday ataladi?', v:['Chiziqli tuzilma','Tarmoqlanish','Sikl','O‘zgaruvchi'], t:1, izoh:'<b>Tarmoqlanish</b> (Pythonda if … else).'},
    {s:'Takrorlanishlar soni oldindan ma’lum bo‘lgan sikl uchun Pythonda odatda qaysi operator ishlatiladi?', v:['while','for','if','print'], t:1, izoh:'<b>for</b>, masalan: for i in range(5). while — shartli sikl.'},
    {s:'Shart rost bo‘lib turgan ekan davom etadigan sikl qaysi?', v:['for','while','if','def'], t:1, izoh:'<b>while</b> (robot tilida «toki»): shart yolg‘on bo‘lganda sikl tugaydi.'},
    {s:'Pythonda «for i in range(4): print(i)» nechta son chiqaradi?', v:['3','4','5','0'], t:1, izoh:'<b>4</b> ta: 0, 1, 2, 3. range(4) 0 dan boshlanadi, 4 kirmaydi.'},
    {s:'range(2, 6) qaysi qiymatlarni beradi?', v:['2, 3, 4, 5, 6','2, 3, 4, 5','3, 4, 5, 6','2, 4, 6'], t:1, izoh:'<b>2, 3, 4, 5</b> — oxirgi chegara (6) kirmaydi.'},
    {s:'Robot sharqqa qaragan. «o‘ngga», «o‘ngga» buyruqlaridan keyin qaysi tomonga qaraydi?', v:['Shimolga','G‘arbga','Sharqqa','Janubga'], t:1, izoh:'Ikki marta 90° o‘ngga = 180°: robot <b>g‘arbga</b> qaraydi.'},
    {s:'Cheksiz sikl ko‘pincha nima sababdan yuzaga keladi?', v:['Sikl tanasida shartni o‘zgartiruvchi amal yo‘qligidan','print ishlatilganidan','for ishlatilganidan','Izoh yozilganidan'], t:0, izoh:'<b>Shartni o‘zgartiruvchi amal yo‘q</b> bo‘lsa, shart doim rost qoladi va while to‘xtamaydi.'},
    {s:'2-darajani siklsiz yechish 17 buyruq oladi. «takrorla 4 [oldinga o‘ngga oldinga chapga] oldinga» dasturida nechta buyruq bor («]» sanalmaydi)?', v:['4','6','8','17'], t:1, izoh:'takrorla + 4 ta tana buyrug‘i + oxirgi oldinga = <b>6</b>.'},
    {s:'x = 7 bo‘lsa, «x % 2 == 0» shartining qiymati nima?', v:['True (rost)','False (yolg‘on)','7','1'], t:1, izoh:'7 ni 2 ga bo‘lgandagi qoldiq 1, 1 == 0 emas: <b>False (yolg‘on)</b> — son toq.'},
    {s:'«s = 0; for i in range(1, 5): s = s + i» bajarilgach s nechaga teng?', v:['10','15','4','5'], t:0, izoh:'1 + 2 + 3 + 4 = <b>10</b> (range(1, 5) da 5 kirmaydi).'},
    {s:'Sikl ichida joylashgan boshqa sikl qanday ataladi?', v:['Ichma-ich (ichki) sikl','Chiziqli sikl','Tarmoqlanish','Funksiya'], t:0, izoh:'<b>Ichma-ich (ichki) sikl</b>: 3-darajada «takrorla» ichida «toki» bor.'},
    {tur:'3d', s:'Robot (1,1) katakda, sharqqa qaragan. «takrorla 3 [oldinga]» bajarilgandan keyin robot turadigan <b>katakni bosing</b>.', hodisa:'im-katak', kalit:'id', togri:['4,1'], v:['(4,1) katak','boshqa katak'], t:0,
     izoh:'Robot sharqqa 3 katak yuradi: (1,1) → <b>(4,1)</b>.'}
  ],
  yordamchi:[
    {s:'for va while farqi nima?', j:'for — takrorlanishlar soni oldindan ma’lum bo‘lganda: «3 marta yur». while — shart bo‘yicha: «devor kelguncha yur». while da shartni o‘zgartiradigan amal bo‘lishi shart, aks holda sikl cheksiz bo‘ladi.', kalit:['for','while','farq','takrorla','toki']},
    {s:'Robot devorga urildi — nima qilish kerak?', j:'Dastur qaysi buyruqda to‘xtaganiga qarang (muharrirda belgilanadi). Ko‘pincha burilish yo‘nalishi adashgan bo‘ladi: sharqqa qaragan robot uchun «o‘ngga» — janubga, «chapga» — shimolga. Buyruqlarni birma-bir tekshirish — otladka deyiladi.', kalit:['devor','xato','urildi','otladka']},
    {s:'Qavslar «[ ]» nima uchun?', j:'Qavslar sikl tanasini — qaysi buyruqlar takrorlanishini belgilaydi. Pythonda buning o‘rniga satr boshidagi bo‘sh joy (chekinish) ishlatiladi.', kalit:['qavs','tana','chekinish']}
  ],
  maqola:[
    {sarlavha:'Dastur va bajaruvchi', xatboshilar:[
      'Dastur — algoritmning bajaruvchi tushunadigan tilda yozilgan ko‘rinishi. Bajaruvchining buyruqlar tizimi cheklangan: sahnadagi robot faqat «oldinga», «chapga», «o‘ngga» buyruqlarini va «oldinda yo‘l bormi?» shartini biladi. Murakkab yo‘lni ham shu oddiy buyruqlardan tuzish kerak.',
      'Eng oddiy dastur chiziqli bo‘ladi: buyruqlar ketma-ket, bittadan bajariladi. Lekin labirint uzun bo‘lsa, chiziqli dastur juda uzayadi va unda xato qilish oson bo‘ladi. Shuning uchun dasturlash tillarida takrorlash va shart tuzilmalari bor.',
      'Maktabda dasturlash ko‘pincha Python tilida o‘rganiladi. Robot buyruqlari Python tuzilmalariga mos keladi: takrorla — for, toki — while, agar — if. Robot bilan tuzilma mantig‘ini tushunib olgach, uni Pythonda yozish oson bo‘ladi.'
    ]},
    {sarlavha:'Sikllar: for va while', xatboshilar:[
      'Takrorlanishlar soni oldindan ma’lum bo‘lsa, parametrli sikl ishlatiladi. Pythonda: for i in range(3): — tana 3 marta bajariladi, i esa 0, 1, 2 qiymatlarini oladi. range(a, b) a dan b − 1 gacha sonlarni beradi, range(a, b, q) — q qadam bilan.',
      'Takrorlanishlar soni noma’lum, lekin to‘xtash sharti ma’lum bo‘lsa, shartli sikl ishlatiladi: while shart: — shart rost ekan, tana bajariladi. Sahnadagi «toki oldinda yo‘l bor: oldinga» ham shunday: yo‘lak 2 katak bo‘lsa ham, 10 katak bo‘lsa ham, robot devor oldida to‘xtaydi.',
      'Shartli siklda eng ko‘p uchraydigan xato — cheksiz sikl: tana ichida shartni o‘zgartiruvchi amal bo‘lmasa, sikl hech qachon tugamaydi. Masalan, robot yurmasdan faqat «yo‘l bormi?» deb so‘rayversa. Sahnadagi robot xavfsizlik uchun 200 qadamdan keyin to‘xtatiladi.'
    ]},
    {sarlavha:'Tarmoqlanish: if … else', xatboshilar:[
      'Tarmoqlanishda dastur shartga qarab turli yo‘ldan boradi. Pythonda: if x % 2 == 0: print(«juft») else: print(«toq»). Shart — rost (True) yoki yolg‘on (False) qiymatli ifoda; unda taqqoslash amallari ishlatiladi: ==, !=, <, >, <=, >=.',
      'Bir nechta holat bo‘lsa, elif qo‘shiladi: if ball >= 86: «a’lo» elif ball >= 71: «yaxshi» else: … Shartlar yuqoridan pastga tekshiriladi va birinchi rost shartning bloki bajariladi.',
      'Shartlarni mantiqiy amallar bilan birlashtirish mumkin: and (va), or (yoki), not (emas). Masalan, robot uchun: «agar oldinda yo‘l bor va batareya > 0 bo‘lsa — yur».'
    ]},
    {sarlavha:'Samarali dastur yozish', xatboshilar:[
      'Bir masalani ko‘p usulda yechish mumkin. 2-darajani siklsiz 17 buyruq bilan, takrorla bilan esa 6 buyruq bilan yechish mumkin. Qisqa dastur o‘qish va tekshirish uchun qulayroq, xato qilish ehtimoli kamroq.',
      'Samarali dastur tuzish uchun takrorlanadigan «naqsh»ni toping: zinapoyada bu «oldinga, o‘ngga, oldinga, chapga», spiralda — «devorgacha yur, o‘ngga buril». Naqsh sikl tanasiga aylanadi.',
      'Dastur ishlamasa, uni qadamma-qadam tekshirish kerak — bu otladka (debugging) deyiladi. Qaysi qadamda natija kutilgandan farq qilganini topib, faqat o‘sha joyni tuzating.'
    ]}
  ],
  formulalar:[
    ['for i in range(N):','Tana N marta bajariladi (i = 0 … N − 1)'],
    ['range(a, b) → a, a+1, …, b−1','b kirmaydi'],
    ['while shart:','Shart rost ekan takrorlanadi'],
    ['if shart: … else: …','Tarmoqlanish'],
    ['Buyruqlar soni: 4 · 4 + 1 = 17 → 1 + 4 + 1 = 6','2-daraja: siklsiz va sikl bilan']
  ],
  qiziqarli:[
    'Python tilini Gvido van Rossum yaratgan; birinchi versiyasi 1991-yilda chiqqan. Nomi ilondan emas, britaniyalik «Monty Python» komediya guruhidan olingan.',
    '«Toshbaqa grafikasi» — robotni buyruqlar bilan boshqarish g‘oyasi 1960-yillarda Logo tilida paydo bo‘lgan va hozir Pythonda turtle moduli sifatida mavjud.',
    'Marsdagi roverlarga signal bir necha daqiqada yetadi, shuning uchun ular oldindan yuborilgan dasturlar va shartlar bilan o‘zi harakatlanadi.',
    'Robot-changyutgichlar ham «devorgacha yur, buril» kabi oddiy qoidalar va sensorlar bilan xonani tozalaydi.',
    '«Bug» (xato) so‘zi bilan bog‘liq mashhur voqea: 1947-yilda Mark II kompyuteri relesidan kapalak topilgan va jurnalga yopishtirilgan.'
  ],
  lugat:[
    ['Dastur','Bajaruvchi tushunadigan tilda yozilgan algoritm.'],
    ['Buyruq','Bajaruvchi bajaradigan bitta ko‘rsatma.'],
    ['Sikl','Buyruqlarning takroriy bajarilishi.'],
    ['Sikl tanasi','Takrorlanadigan buyruqlar guruhi.'],
    ['Parametrli sikl (for)','Takrorlanish soni ma’lum sikl.'],
    ['Shartli sikl (while)','Shart rost ekan davom etadigan sikl.'],
    ['Tarmoqlanish (if)','Shartga qarab yo‘l tanlash.'],
    ['Shart','Rost yoki yolg‘on qiymatli ifoda.'],
    ['Cheksiz sikl','Hech qachon tugamaydigan sikl (xato).'],
    ['Ichma-ich sikl','Boshqa sikl ichidagi sikl.'],
    ['Otladka (debugging)','Dasturdagi xatolarni topish va tuzatish.'],
    ['Chekinish','Pythonda blok tanasini belgilovchi satr boshidagi bo‘sh joy.']
  ],
  manba:IMI_DAR+' (9-sinf: Python tilida dasturlash asoslari); Python hujjatlari (docs.python.org/3/tutorial/controlflow.html — if, for, range, while); '+IMI_W+': «Control flow», «For loop», «While loop», «Python (programming language)», «Logo (programming language)», «Turtle graphics». Labirint darajalari — MAKON o‘quv topshiriqlari.',
  ishlanma:{
    sinf:'9-sinf', vaqt:'45 daqiqa', tur:'Amaliy mashg‘ulot (dasturlash)', usul:'3D robot-labirint, juftlikda dastur tuzish, «eng qisqa dastur» musobaqasi, Pythonga o‘tkazish',
    maqsad:{talimiy:'Chiziqli, tarmoqlanuvchi va siklik tuzilmalarni; for va while sikllarining farqini; if … else tarmoqlanishini amalda o‘rgatish.',
      tarbiyaviy:'Sabr, xatolarni tahlil qilish va jamoada ishlash madaniyatini tarbiyalash.',
      rivojlantiruvchi:'Naqsh topish, abstraksiya va algoritmik fikrlashni rivojlantirish.'},
    natijalar:['Oddiy masala uchun chiziqli dastur tuzadi','Takrorlanuvchi naqshni topib, for/takrorla siklida yozadi','Uzunligi noma’lum yo‘l uchun while/toki siklini qo‘llaydi','range() qiymatlarini va sikl natijasini oldindan hisoblaydi'],
    jihozlar:['MAKON sahnasi «Tarmoqlanish va sikllar»','Kompyuterlar (juftlikka bittadan)','Python muhiti (IDLE yoki onlayn)','Katakli labirint tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Tarqatmadagi 2-darajani qog‘ozda chiziqli dastur bilan yozish: «Nechta buyruq chiqdi?»','Buyruqlarni sanaydi (17).'],
      ['8–16','<b>For / takrorla.</b> MAKON da 1–2-darajalar; naqsh topish; Pythondagi for i in range(N).','Dasturni sikl bilan qisqartiradi.'],
      ['16–24','<b>While / toki.</b> 3-daraja spiral; shartli sikl; cheksiz sikl xavfi.','Juftlikda 3-darajani yechadi.'],
      ['24–32','<b>If … else.</b> Pythonda juft/toq, baho misollari; shart va taqqoslash amallari.','Pythonda 2 ta kichik dastur yozadi.'],
      ['32–42','<b>Musobaqa va test.</b> «Eng qisqa dastur» — 3-daraja; MAKON testi.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Sikl','Takrorlash.'],['for','Parametrli sikl.'],['while','Shartli sikl.'],['if','Tarmoqlanish.'],['Otladka','Xatolarni tuzatish.']],
    savollar:[['range(5) nechta son beradi?','5 ta: 0–4'],['while qachon to‘xtaydi?','Shart yolg‘on bo‘lganda'],['2-daraja sikl bilan nechta buyruq?','6'],['7 % 2 = ?','1'],['Cheksiz sikl sababi?','Shartni o‘zgartiruvchi amal yo‘q']],
    uy:'Darslikdagi mavzuni o‘qish; (1) Pythonda 1 dan 100 gacha sonlar yig‘indisini for bilan hisoblovchi dastur yozish (javob: 5050); (2) while yordamida 2 ning 1000 dan kichik barcha darajalarini chiqarish (1, 2, 4, …, 512); (3) kiritilgan son musbat, manfiy yoki nol ekanini if–elif–else bilan aniqlash.',
    manba:IMI_DAR+'; docs.python.org'
  }
};

DT.im_robot = Object.assign(DT.im_robot || {}, {
  robot:{nom:'Robot — bajaruvchi', sarlavha2:'Labirint robot', jadval:[['Buyruqlari','oldinga, chapga, o‘ngga'],['Shart','«oldinda yo‘l bormi?»'],['Boshlanishi','(1,1) katak, sharqqa qaragan'],['Cheklov','devorga urilsa to‘xtaydi; 200 qadamdan ortiq bajarmaydi']], matn:'Robot faqat o‘z buyruqlar tizimidagi ko‘rsatmalarni bajaradi. «O‘ngga» va «chapga» joyida 90° burilish: robot siljimaydi, faqat yo‘nalishini o‘zgartiradi.', manba:'MAKON o‘quv modeli'},
  maqsad:{nom:'Maqsad katagi', sarlavha2:'Topshiriq', jadval:[['1-daraja','(5,3)'],['2-daraja','(6,5)'],['3-daraja','(2,3)'],['Yetganda','dastur o‘zi to‘xtaydi — muvaffaqiyat']], matn:'Katak koordinatasi (x, y): x — ustun (chapdan), y — qator (yuqoridan). Robot maqsad katagiga qadam qo‘yishi bilan dastur yakunlanadi.', manba:'MAKON o‘quv modeli'},
  devor:{nom:'Devor', sarlavha2:'To‘siq', jadval:[['Robot urilsa','xato: dastur to‘xtaydi'],['toki buyrug‘i','devor oldida o‘zi to‘xtaydi'],['Tekshiruv','«oldinda yo‘l bormi?» sharti'],['Dasturda','shart — tarmoqlanishning asosi']], matn:'Devor dasturdagi xatoni ko‘rsatadi: robot qaysi buyruqda urilganini bilib, o‘sha joyni tuzatish mumkin — bu otladka.', manba:'MAKON o‘quv modeli'},
  sikl:{nom:'Sikl: takrorla N [ … ]', sarlavha2:'Parametrli sikl (for)', jadval:[['Robot tilida','takrorla 3 [oldinga]'],['Pythonda','for i in range(3): oldinga()'],['Qachon','takrorlanish soni ma’lum bo‘lganda'],['Foydasi','dastur qisqaradi: 17 → 6 buyruq']], matn:'Qavslar ichidagi buyruqlar — sikl tanasi. Sikl ichida boshqa sikl ham bo‘lishi mumkin (ichma-ich sikl).', manba:'docs.python.org — for statement'},
  shart:{nom:'Shartli sikl: toki', sarlavha2:'while va tarmoqlanish', jadval:[['Robot tilida','toki oldinda yo‘l bor: oldinga'],['Pythonda','while oldinda_yol(): oldinga()'],['Qachon','takrorlanish soni noma’lum bo‘lganda'],['Xavf','shart o‘zgarmasa — cheksiz sikl']], matn:'Har aylanishdan oldin shart tekshiriladi: rost bo‘lsa tana bajariladi, yolg‘on bo‘lsa sikl tugaydi. Bu tarmoqlanish (if) va takrorlashning birikmasi.', manba:'docs.python.org — while statement'}
});

/* ---------------- 6. AXBOROT XAVFSIZLIGI (10–11-sinf) ---------------- */
bogla('informatika', 'Axborot xavfsizligi', 'info-xavfsizlik', 'Parol kuchi va buzish vaqti (taxminiy), fishing belgilari, Sezar shifri g‘ildiragi');

L['info-xavfsizlik'] = {
  fan:'informatika', sinf:'10–11-sinf', qisqaNom:'Axborot xavfsizligi', nom:'Axborot xavfsizligi',
  qisqa:'10–11-sinf · Informatika · parol, fishing, shifrlash',
  sahna:'im_xavfsizlik',
  kor:{
    sarlavha:'Ma’lumotingizni qanday himoya qilasiz?',
    matn:'Axborot xavfsizligi — ma’lumotni ruxsatsiz o‘qish, o‘zgartirish va yo‘qotishdan himoya qilish. Sahnada uchta stansiya: chapda <b>Sezar shifri g‘ildiragi</b> — eng qadimgi shifrlardan biri; o‘rtada <b>soxta xat</b> — fishing belgilarini toping; o‘ngda <b>qulf va parol ko‘rsatkichi</b> — parol kuchini va uni tanlab topish vaqtini baholang. Vaqt hisobi taxminiy: u sekundiga 10 milliard urinish qiladigan oflayn hujum farazi bo‘yicha.',
    punktlar:[
      '<b>Uch asos:</b> maxfiylik, yaxlitlik, foydalanish imkoniyati',
      '<b>Parol:</b> uzunlik eng muhim — NIST (2025) bir omilli parol uchun kamida 15 belgi tavsiya qiladi',
      '<b>Fishing:</b> soxta xat va saytlar orqali parol, karta ma’lumoti yoki SMS kodni aldab olish',
      '<b>Shifrlash:</b> ochiq matnni kalit yordamida o‘qib bo‘lmaydigan shifrmatnga aylantirish'
    ]
  },
  bolimlar:[
    {sarlavha:'Parol kuchi (taxminiy baho)', jadval:[
      ['6 raqam (masalan, tug‘ilgan sana)','≈ 20 bit — bir zumda'],
      ['8 kichik lotin harfi','≈ 38 bit — ≈ 10 soniya'],
      ['8 belgi: katta-kichik harf, raqam, belgi','≈ 53 bit — ≈ 4 kun'],
      ['15 kichik harf (4 ta so‘zli ibora)','≈ 70 bit — ≈ 2 700 yil'],
      ['12 belgi: barcha 95 belgidan','≈ 79 bit — ≈ 860 ming yil']
    ], matn:'Hisob: bitlar ≈ L · log₂N; o‘rtacha vaqt ≈ 2^bit ÷ 2 ÷ 10¹⁰ soniya. Bu shartli taxmin: hujumchi tezligi, xesh algoritmi va lug‘at hujumlari natijani keskin o‘zgartiradi. Keng tarqalgan parol yoki lug‘atdagi so‘z uzunligidan qat’i nazar juda zaif.'},
    {sarlavha:'Fishing belgilari', jadval:[
      ['Yuboruvchi','manzil rasmiy nomga o‘xshatilgan, lekin boshqa domen'],
      ['Shoshiltirish','«24 soatda bloklanadi!», qo‘rqitish yoki katta sovg‘a va’dasi'],
      ['Havola','matndagi nom bilan haqiqiy manzil farq qiladi'],
      ['Ilova','kutilmagan .exe, .zip, .scr fayllar'],
      ['Murojaat','ismsiz «Hurmatli mijoz»'],
      ['So‘rov','parol, karta raqami, CVV yoki SMS kod so‘raladi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Axborot xavfsizligining uch asosi', matn:'Maxfiylik — ma’lumotni faqat ruxsat etilganlar ko‘radi. Yaxlitlik — ma’lumot ruxsatsiz o‘zgartirilmagan. Foydalanish imkoniyati — kerak paytda ma’lumotdan foydalanish mumkin. Sahnadagi uch stansiya shu asoslarni himoyalash usullari.', holat:{rejim:null, kalit:3, matn:'SALOM'}},
    {sarlavha:'Parol: uzunlik muhim', matn:'Parolni tanlab topish (brute force) uchun barcha variantlar sinaladi. Variantlar soni Nᴸ: N — alifbo, L — uzunlik. Uzunlik daraja ko‘rsatkichida turgani uchun har qo‘shimcha belgi urinishlar sonini o‘nlab marta oshiradi. Sahnada o‘z parolingizga o‘xshash (lekin haqiqiy bo‘lmagan!) misolni sinab ko‘ring.', holat:{rejim:'parol', kalit:3, matn:'SALOM'}},
    {sarlavha:'Zamonaviy tavsiyalar', matn:'AQSh standartlar instituti NIST ning SP 800-63B-4 (2025) yo‘riqnomasi: bir omilli parol — kamida 15 belgi, ikki omilli himoya bilan — kamida 8; majburiy «katta harf + raqam + belgi» qoidalari talab qilinmaydi; parol sizib chiqqanlar ro‘yxatida tekshiriladi. Har sayt uchun alohida parol va ikki omilli autentifikatsiya ishlating.', holat:{rejim:'parol', kalit:3, matn:'SALOM'}},
    {sarlavha:'Fishing: soxta xat', matn:'Fishing — o‘zini bank, do‘kon yoki maktab deb ko‘rsatib, parol yoki karta ma’lumotini aldab olish. Xatdagi belgilarni bosing: yuboruvchi manzili, shoshiltirish, havola, ilova, umumiy murojaat va maxfiy ma’lumot so‘rovi. Bank hech qachon SMS kod yoki parolni so‘ramaydi.', holat:{rejim:'fishing', kalit:3, matn:'SALOM'}},
    {sarlavha:'Sezar shifri', matn:'Rim tarixchisi Svetoniy yozishicha, Yuliy Sezar maxfiy xatlarda har harfni alifboda 3 ta keyingisiga almashtirgan: A → D, B → E. G‘ildirakda tashqi halqa — ochiq matn, ichki halqa — shifr. SALOM kalit 3 bilan VDORP bo‘ladi.', holat:{rejim:'shifr', kalit:3, matn:'SALOM'}},
    {sarlavha:'Shifrni buzish va zamonaviy shifrlash', matn:'Sezar shifrida atigi 25 ta foydali kalit bor — hammasini sinab chiqish oson. Bundan tashqari harflar chastotasi saqlanadi. Zamonaviy shifrlar (masalan, AES, 2001) 128–256 bitli kalit ishlatadi: variantlar soni 2¹²⁸ dan ko‘p. HTTPS, messenjerlar va bank ilovalari shunday shifrlashdan foydalanadi.', holat:{rejim:'shifr', kalit:13, matn:'SALOM'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Himoyachi bo‘ling', holat:{rejim:null, kalit:0, matn:'SALOM'},
    topshiriqlar:[
      {shart:'Soxta xatda <b>shubhali havolani</b> toping va bosing.', hodisa:'im-fishing', kod:"ev.nom==='havola'", izoh:'To‘g‘ri — <b>havola</b>: ko‘rinadigan nom bilan haqiqiy manzil farq qiladi. Havolani bosishdan oldin manzilni tekshiring.'},
      {shart:'Xatda <b>maxfiy ma’lumot so‘rovini</b> (parol, karta, SMS kod) toping.', hodisa:'im-fishing', kod:"ev.nom==='sorov'", izoh:'To‘g‘ri — <b>maxfiy ma’lumot so‘rovi</b>. Rasmiy tashkilotlar parol va SMS kodni hech qachon so‘ramaydi.'},
      {shart:'Sezar g‘ildiragida <b>kalitni 3</b> ga qo‘ying va SALOM so‘zini shifrlang.', hodisa:'im-shifr', kod:"ev.kalit===3 && ev.ochiq==='SALOM'", izoh:'To‘g‘ri — Sezar kaliti 3: SALOM → <b>VDORP</b>.'},
      {shart:'Parol ko‘rsatkichiga <b>kuchli</b> baho oladigan (uzun) namunaviy parol yozing — haqiqiy parolingizni yozmang!', hodisa:'im-parol', kod:"ev.daraja==='kuchli'", izoh:'To‘g‘ri — <b>kuchli parol</b>. Uzunlik eng katta ta’sir qiladi: 4–5 ta tasodifiy so‘zdan iborat ibora ham yaxshi.'}
    ]},
  test:[
    {s:'Ma’lumotni faqat ruxsat etilgan shaxslar ko‘ra olishi axborot xavfsizligining qaysi asosi?', v:['Maxfiylik','Yaxlitlik','Foydalanish imkoniyati','Tezkorlik'], t:0, izoh:'<b>Maxfiylik</b>. Yaxlitlik — o‘zgartirilmaganlik, foydalanish imkoniyati — kerak paytda mavjudlik.'},
    {s:'Parolni tanlab topishga (brute force) chidamliligini eng ko‘p oshiradigan omil qaysi?', v:['Bitta katta harf qo‘shish','Uzunlikni oshirish','Oxiriga «1» qo‘shish','Tug‘ilgan yilni yozish'], t:1, izoh:'<b>Uzunlikni oshirish</b>: variantlar soni Nᴸ, uzunlik daraja ko‘rsatkichida.'},
    {s:'NIST SP 800-63B-4 (2025) ga ko‘ra, yagona himoya vositasi bo‘lgan parolning eng kam uzunligi qancha?', v:['6 belgi','8 belgi','15 belgi','64 belgi'], t:2, izoh:'<b>15 belgi</b>; ikki omilli autentifikatsiya bilan — kamida 8. 64 — tavsiya etilgan eng katta ruxsat etiladigan uzunlik chegarasi.'},
    {s:'8 ta kichik lotin harfidan iborat parolda nechta variant bor?', v:['8²⁶','26⁸ ≈ 2,1 · 10¹¹','26 · 8 = 208','2⁸ = 256'], t:1, izoh:'Har o‘ringa 26 harf: <b>26⁸ ≈ 2,1 · 10¹¹</b> variant. Sekundiga 10¹⁰ urinishda o‘rtacha ≈ 10 soniya (taxminiy).'},
    {s:'Sezar shifrida kalit 3 bo‘lsa, «SALOM» so‘zi nimaga aylanadi?', v:['PXILJ','VDORP','TBMPN','UCNQO'], t:1, izoh:'Har harf 3 ta surilgan: S→V, A→D, L→O, O→R, M→P: <b>VDORP</b>.'},
    {s:'Sezar shifrini nima uchun oson buzish mumkin?', v:['Kalitlar juda kam — atigi 25 ta foydali surilish','Uni kompyuter o‘qiy olmaydi','U faqat raqamlarni shifrlaydi','Kalit har safar o‘zgaradi'], t:0, izoh:'<b>Kalitlar juda kam</b>: 25 ta variantni qo‘lda ham sinab chiqish mumkin; harflar chastotasi ham saqlanadi.'},
    {s:'Quyidagilardan qaysi biri fishing xatning belgisi EMAS?', v:['«Hisobingiz 24 soatda bloklanadi!» deb shoshiltirish','SMS kodni javob xatda yuborishni so‘rash','Ismingiz va oldindan kelishilgan ma’lumot to‘g‘ri yozilgan, havola yo‘q','Bank nomiga o‘xshash, lekin boshqa domendagi yuboruvchi'], t:2, izoh:'<b>Ism to‘g‘ri, havola va so‘rov yo‘q</b> — bu o‘z-o‘zidan xavf belgisi emas (lekin baribir ehtiyot bo‘lish kerak).'},
    {s:'Ikki omilli autentifikatsiya (2FA) nimani anglatadi?', v:['Ikkita bir xil parol','Parol + boshqa omil (SMS/ilova kodi, kalit, barmoq izi)','Parolni ikki marta kiritish','Ikki kishining bitta hisobi'], t:1, izoh:'<b>Parol + boshqa turdagi omil</b>: parol o‘g‘irlansa ham, ikkinchi omilsiz kirib bo‘lmaydi.'},
    {s:'O‘zbekistonda «Kiberxavfsizlik to‘g‘risida»gi Qonun qachon qabul qilingan?', v:['2019-yil 2-iyul','2022-yil 15-aprel','1995-yil 29-aprel','2003-yil 11-dekabr'], t:1, izoh:'<b>2022-yil 15-aprel</b>, O‘RQ-764. 2019-yil 2-iyul — «Shaxsga doir ma’lumotlar to‘g‘risida»gi Qonun (O‘RQ-547).'},
    {s:'Brauzer manzil satridagi qulf belgisi va «https://» nimani bildiradi?', v:['Sayt albatta xavfsiz va halol','Brauzer bilan sayt orasidagi aloqa shifrlangan','Sayt davlatga tegishli','Sahifada virus yo‘q'], t:1, izoh:'Faqat <b>aloqa shifrlangan</b>ligini bildiradi. Fishing saytlarda ham HTTPS bo‘lishi mumkin — manzilni tekshiring.'},
    {s:'Zamonaviy AES shifri qachon standart sifatida qabul qilingan?', v:['1977','2001','1949','2015'], t:1, izoh:'AES (Rijndael) AQShda <b>2001</b>-yilda FIPS 197 standarti sifatida e’lon qilingan; kalit 128, 192 yoki 256 bit.'},
    {tur:'3d', s:'Soxta xatdagi <b>shubhali havolani</b> bosing.', hodisa:'im-fishing', kalit:'nom', togri:['havola'], v:['Shubhali havola','boshqa belgi'], t:0,
     izoh:'<b>Havola</b>: yozuvi rasmiy saytga o‘xshaydi, lekin haqiqiy manzil boshqa domenga olib boradi. Sichqonchani havola ustida ushlab, manzilni tekshiring.'}
  ],
  yordamchi:[
    {s:'Qanday parol kuchli?', j:'Uzun (kamida 15 belgi), tasodifiy va boshqa joyda ishlatilmagan parol. Eslab qolish uchun 4–5 ta tasodifiy so‘zdan iborat ibora qulay. Ism, tug‘ilgan sana, «123456», «qwerty» kabi keng tarqalgan parollar juda zaif. Parollar menejeri va ikki omilli autentifikatsiya himoyani kuchaytiradi.', kalit:['parol','kuchli','qanday']},
    {s:'Buzish vaqti nega «taxminiy»?', j:'Hisob faraz asosida: hujumchi sekundiga 10¹⁰ ta parolni sinaydi (kuchli videokartalar bilan oflayn hujum taxmini) va alifbodagi barcha variantlar teng ehtimolli. Amalda tezlik xesh algoritmiga bog‘liq; sayt orqali urinish esa ancha sekin. Lug‘at hujumi so‘z yoki keng tarqalgan parolni bir zumda topadi.', kalit:['taxminiy','vaqt','buzish','hisob']},
    {s:'Fishing xat keldi — nima qilish kerak?', j:'Havolani bosmang, ilovani ochmang, javob yozmang. Tashkilotning rasmiy saytiga yoki telefoniga o‘zingiz murojaat qilib tekshiring. Parolni kiritib qo‘ygan bo‘lsangiz — darhol o‘zgartiring va bankka xabar bering.', kalit:['fishing','xat','nima qilish']}
  ],
  maqola:[
    {sarlavha:'Axborot xavfsizligi nima?', xatboshilar:[
      'Bugun shaxsiy suratlar, yozishmalar, baholar, bank hisoblari raqamli ko‘rinishda saqlanadi. Axborot xavfsizligi ularni ruxsatsiz kirish, o‘zgartirish, o‘chirish va sizib chiqishdan himoya qilish demakdir. Uning uch asosi — maxfiylik, yaxlitlik va foydalanish imkoniyati (inglizcha «CIA triad»).',
      'Tahdidlar turlicha: parolni o‘g‘irlash, fishing, zararli dasturlar (viruslar, to‘lov talab qiluvchi «ransomware»), qurilmani yo‘qotish, ijtimoiy muhandislik — odamning ishonchidan foydalanib aldash. Ko‘p hollarda eng zaif bo‘g‘in — texnika emas, inson.',
      'O‘zbekistonda bu soha qonunlar bilan tartibga solinadi: «Shaxsga doir ma’lumotlar to‘g‘risida»gi Qonun (2019-yil 2-iyul, O‘RQ-547) shaxsiy ma’lumotlarni yig‘ish va saqlash qoidalarini, «Kiberxavfsizlik to‘g‘risida»gi Qonun (2022-yil 15-aprel, O‘RQ-764) esa kibermakondagi himoya asoslarini belgilaydi.'
    ]},
    {sarlavha:'Parollar: nega uzunlik muhim?', xatboshilar:[
      'Hujumchi parolni bilmasa, uni tanlab topishga urinadi. Agar alifbo N belgidan iborat bo‘lsa va parol L belgili bo‘lsa, variantlar soni Nᴸ. Masalan, faqat kichik lotin harflaridan 8 belgili parol: 26⁸ ≈ 2,1 · 10¹¹ variant. Sekundiga 10¹⁰ urinish qiladigan oflayn hujumda (taxminiy faraz) o‘rtacha ≈ 10 soniya kifoya.',
      'Alifboni kengaytirish (katta harf, raqam, belgi — jami 95 belgi) ham yordam beradi, lekin uzunlik kuchliroq ta’sir qiladi: 8 belgili murakkab parol ≈ 4 kunda, 15 ta kichik harfli ibora esa ≈ 2 700 yilda topiladi (ikkalasi ham shu faraz bo‘yicha taxminiy). Parol kuchi ko‘pincha bitlarda o‘lchanadi: ≈ L · log₂N.',
      'Shuning uchun AQSh standartlar instituti NIST 2025-yilda yakunlangan SP 800-63B-4 yo‘riqnomasida yagona himoya bo‘lgan parollar uchun kamida 15 belgi (ikki omilli himoya bilan — kamida 8) talab qiladi, «albatta raqam va belgi bo‘lsin» kabi majburiy qoidalardan voz kechadi va parolni sizib chiqqan parollar ro‘yxati bilan tekshirishni tavsiya qiladi. Ammo lug‘atdagi so‘z yoki «123456» kabi keng tarqalgan parol uzun bo‘lsa ham bir zumda topiladi — hujumchilar avval aynan shunday ro‘yxatlarni sinaydi.'
    ]},
    {sarlavha:'Fishing va ijtimoiy muhandislik', xatboshilar:[
      'Fishing (inglizcha «fishing» — baliq ovi so‘zidan) — o‘zini ishonchli tashkilot qilib ko‘rsatib, parol, karta raqami yoki SMS kodni aldab olish. Xat, SMS, messenjer xabari yoki soxta sayt orqali amalga oshiriladi.',
      'Asosiy belgilar: yuboruvchi manzili rasmiy nomga o‘xshatilgan, lekin boshqa domenda; «24 soat ichida hisobingiz bloklanadi!» kabi shoshiltirish yoki katta yutuq va’dasi; havolaning ko‘rinadigan matni bilan haqiqiy manzili farqi; kutilmagan ilova (.exe, .zip); «Hurmatli mijoz» kabi ismsiz murojaat; eng muhimi — maxfiy ma’lumot so‘rovi.',
      'Himoya qoidasi oddiy: shubhali havolani bosmang, ma’lumotni faqat rasmiy ilova yoki o‘zingiz yozgan manzil orqali kiriting, SMS kodni hech kimga aytmang. Bank, maktab yoki davlat idorasi parolingizni hech qachon so‘ramaydi.'
    ]},
    {sarlavha:'Shifrlash: Sezardan AES gacha', xatboshilar:[
      'Shifrlash — ochiq matnni kalit yordamida begona odam o‘qiy olmaydigan shifrmatnga aylantirish. Eng mashhur qadimgi shifrlardan biri — Sezar shifri: Rim tarixchisi Svetoniy yozishicha, Yuliy Sezar maxfiy xatlarda har bir harfni alifboda uchta keyingi harf bilan almashtirgan (A → D, B → E, …, X → A).',
      'Sezar shifrini ochish oson: 26 harfli alifboda atigi 25 ta foydali kalit bor, hammasini sinab chiqish mumkin. Bundan tashqari, har tilda harflar chastotasi ma’lum — shifrmatnda eng ko‘p uchragan harf, ehtimol, eng ko‘p ishlatiladigan harfga mos keladi (chastota tahlili; buni IX asrda arab olimi al-Kindiy tasvirlagan).',
      'Zamonaviy shifrlar matematik jihatdan murakkab. AES (2001-yilda AQShda standart sifatida qabul qilingan) 128, 192 yoki 256 bitli kalit ishlatadi — 2¹²⁸ ta variantni sinab chiqish hozirgi texnika bilan amalda imkonsiz. 1977-yilda yaratilgan RSA kabi ochiq kalitli shifrlar esa oldindan kalit almashmasdan xavfsiz aloqa o‘rnatishga imkon beradi. HTTPS, messenjerlar va bank ilovalari shunday usullarga tayanadi.'
    ]}
  ],
  formulalar:[
    ['V = Nᴸ','Parol variantlari soni (N — alifbo, L — uzunlik)'],
    ['H ≈ L · log₂N','Parol kuchi bitlarda (entropiya, tasodifiy parol uchun)'],
    ['t ≈ 2ᴴ ÷ 2 ÷ 10¹⁰ s','O‘rtacha tanlab topish vaqti — TAXMINIY faraz: sekundiga 10¹⁰ urinish'],
    ['C = (P + k) mod 26','Sezar shifrlash (harf raqami P, kalit k)'],
    ['P = (C − k) mod 26','Sezar deshifrlash']
  ],
  qiziqarli:[
    'Svetoniy yozishicha, imperator Avgust ham shifr ishlatgan, lekin harfni atigi bittaga surgan.',
    'Chastota tahlilini IX asrda arab olimi al-Kindiy tasvirlagan — bu Sezar kabi almashtirish shifrlarini ochishning asosiy usuli.',
    'Ikkinchi jahon urushida nemis «Enigma» shifrini ochishda Alan Tyuring va Bletchli-Park jamoasi muhim rol o‘ynagan.',
    '«123456» yillar davomida sizib chiqqan parollar ro‘yxatlarida eng keng tarqalgan parollardan biri bo‘lib kelmoqda.',
    'ROT13 — kaliti 13 bo‘lgan Sezar shifri: 26 harfli alifboda uni ikki marta qo‘llasangiz, asl matn qaytadi.'
  ],
  lugat:[
    ['Axborot xavfsizligi','Ma’lumotni ruxsatsiz kirish, o‘zgartirish va yo‘qotishdan himoya qilish.'],
    ['Maxfiylik','Ma’lumotni faqat ruxsat etilganlar ko‘rishi.'],
    ['Yaxlitlik','Ma’lumotning ruxsatsiz o‘zgartirilmaganligi.'],
    ['Autentifikatsiya','Foydalanuvchi shaxsini tekshirish (parol, kod, barmoq izi).'],
    ['Ikki omilli autentifikatsiya (2FA)','Parol + boshqa turdagi omil.'],
    ['Brute force','Barcha variantlarni sinab parolni tanlab topish.'],
    ['Lug‘at hujumi','So‘zlar va keng tarqalgan parollar ro‘yxatini sinash.'],
    ['Fishing','Soxta xat/sayt orqali maxfiy ma’lumotni aldab olish.'],
    ['Ijtimoiy muhandislik','Odamning ishonchidan foydalanib aldash.'],
    ['Shifrlash','Ochiq matnni kalit yordamida shifrmatnga aylantirish.'],
    ['Kalit','Shifrlash va deshifrlash uchun maxfiy qiymat.'],
    ['Sezar shifri','Harflarni alifboda k o‘ringa surish usuli.'],
    ['Entropiya (parol)','Parol kuchining bitlardagi o‘lchovi.']
  ],
  manba:IMI_DAR+'; NIST SP 800-63B-4 «Digital Identity Guidelines: Authentication and Authenticator Management» (2025, pages.nist.gov/800-63-4/sp800-63b.html); NIST FIPS 197 (AES, 2001); O‘zbekiston Respublikasining «Shaxsga doir ma’lumotlar to‘g‘risida»gi Qonuni (2019-yil 2-iyul, O‘RQ-547) va «Kiberxavfsizlik to‘g‘risida»gi Qonuni (2022-yil 15-aprel, O‘RQ-764) — lex.uz; Svetoniy «O‘n ikki Sezar hayoti» (Yuliy Sezar, 56); '+IMI_W+': «Caesar cipher», «Password strength», «Phishing», «Frequency analysis», «Advanced Encryption Standard», «RSA (cryptosystem)», «Enigma machine». Buzish vaqtlari — sekundiga 10¹⁰ urinish farazi bo‘yicha TAXMINIY hisob.',
  ishlanma:{
    sinf:'10–11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish va amaliy mashg‘ulot', usul:'3D stansiyalar (shifr, fishing, parol), keys-stadi, juftlikda shifr almashish, hisoblash mashqi',
    maqsad:{talimiy:'Axborot xavfsizligi asoslari, parol kuchini baholash, fishing belgilari va shifrlash tamoyillarini (Sezar shifridan zamonaviy shifrlargacha) o‘rgatish.',
      tarbiyaviy:'Raqamli muhitda ehtiyotkorlik, shaxsiy ma’lumotni himoya qilish va qonunga hurmat ruhida tarbiyalash.',
      rivojlantiruvchi:'Tanqidiy fikrlash, xavfni baholash, darajalar va logarifm bilan hisoblash ko‘nikmasini rivojlantirish.'},
    natijalar:['Maxfiylik, yaxlitlik va foydalanish imkoniyatini izohlaydi','Parol variantlari sonini Nᴸ bilan hisoblaydi va uzunlik ta’sirini tushuntiradi','Fishing xatning kamida 5 belgisini topadi','Sezar shifri bilan shifrlaydi va deshifrlaydi, uning zaifligini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Axborot xavfsizligi»','Proyektor','Qog‘oz Sezar g‘ildiragi (ikki doira, markazdan mahkamlangan)','Soxta xat namunalari tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Parolingiz necha soniyada topiladi?» — muammoli savol (haqiqiy parol aytilmaydi!).','Taxmin qiladi.'],
      ['8–17','<b>Parol kuchi.</b> Nᴸ, bitlar, uzunlik va alifbo; NIST tavsiyalari; sahnadagi ko‘rsatkichda namunalar.','3 ta namunaviy parol uchun variantlar sonini hisoblaydi.'],
      ['17–25','<b>Fishing.</b> MAKON dagi soxta xatda belgilarni topish; real hayotiy keyslar.','Tarqatmadagi 3 xatdan soxtasini aniqlaydi.'],
      ['25–35','<b>Shifrlash.</b> Sezar g‘ildiragi, kalit, chastota tahlili; AES va HTTPS haqida qisqacha.','Juftlikda bir-biriga shifrlangan xat yozib, ochadi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b> Qonunlar (O‘RQ-547, O‘RQ-764) haqida qisqacha.','Yozib oladi.']],
    lugat:[['Brute force','Barcha variantlarni sinash.'],['Fishing','Aldab ma’lumot olish.'],['2FA','Ikki omilli autentifikatsiya.'],['Kalit','Shifr uchun maxfiy qiymat.'],['Sezar shifri','Harflarni surish.']],
    savollar:[['8 kichik harfli parolda nechta variant?','26⁸ ≈ 2,1 · 10¹¹'],['NIST bo‘yicha bir omilli parol uzunligi?','Kamida 15 belgi'],['Kalit 3 bilan HELLO → ?','KHOOR'],['Sezar shifrida nechta foydali kalit?','25'],['«Kiberxavfsizlik to‘g‘risida»gi Qonun sanasi?','2022-yil 15-aprel']],
    uy:'Darslikdagi mavzuni o‘qish; (1) «KHOOR ZRUOG» ni kalit 3 bilan deshifrlash (javob: HELLO WORLD); (2) 10 ta raqamdan iborat PIN-kod va 10 ta kichik harfdan iborat parol uchun variantlar sonini solishtirish (10¹⁰ va 26¹⁰ ≈ 1,4 · 10¹⁴ — taxminan 14 ming marta ko‘p); (3) oila a’zolari uchun «fishingdan himoya — 5 qoida» eslatmasini tayyorlash.',
    manba:IMI_DAR+'; NIST SP 800-63B-4; lex.uz (O‘RQ-547, O‘RQ-764)'
  }
};

DT.im_xavf = Object.assign(DT.im_xavf || {}, {
  yuboruvchi:{nom:'Soxta yuboruvchi manzili', sarlavha2:'Fishing belgisi', jadval:[['Ko‘rinishi','rasmiy nomga o‘xshash: bank-uz-xizmat.com, bamk.uz'],['Hiyla','bitta harf almashgan yoki qo‘shimcha so‘z qo‘shilgan domen'],['Tekshirish','@ belgisidan keyingi to‘liq domenni o‘qing'],['Eslatma','yuboruvchi nomi (ko‘rinadigan ism) istalgancha soxtalashtiriladi']], matn:'Pochta dasturi ko‘pincha faqat yuboruvchining ismini ko‘rsatadi. Ism ustiga bosib, to‘liq manzilni ko‘ring — domen rasmiy sayt bilan aynan bir xil bo‘lishi kerak.', manba:IMI_W+' «Phishing», «Email spoofing»'},
  shoshilinch:{nom:'Shoshiltirish va qo‘rqitish', sarlavha2:'Fishing belgisi', jadval:[['Misollar','«24 soatda bloklanadi!», «Oxirgi ogohlantirish»'],['Teskari hiyla','«Siz iPhone yutib oldingiz!»'],['Maqsad','o‘ylashga vaqt qoldirmaslik'],['Javob','to‘xtang va rasmiy kanal orqali tekshiring']], matn:'Ijtimoiy muhandislik hissiyotga — qo‘rquv, ochko‘zlik, qiziqishga ta’sir qiladi. Shoshiltirish — eng keng tarqalgan belgilardan biri.', manba:IMI_W+' «Social engineering (security)»'},
  havola:{nom:'Shubhali havola', sarlavha2:'Fishing belgisi · eng xavfli', jadval:[['Hiyla','yozuvi «bank.uz», haqiqiy manzili boshqa sayt'],['Tekshirish','sichqonchani havola ustida ushlab, pastdagi manzilni o‘qing'],['Qisqartirilgan havolalar','bit.ly kabi — qayerga olib borishi ko‘rinmaydi'],['HTTPS','qulf belgisi saytning halolligini kafolatlamaydi']], matn:'Havola soxta saytga olib boradi: u asl saytning nusxasi, kiritilgan parol esa hujumchiga ketadi. Kirish uchun doim rasmiy ilova yoki o‘zingiz yozgan manzildan foydalaning.', manba:IMI_W+' «Phishing», «URL shortening»'},
  ilova:{nom:'Kutilmagan ilova', sarlavha2:'Fishing belgisi', jadval:[['Xavfli turlar','.exe, .scr, .js, .zip, makrosli hujjatlar'],['Hiyla','«hisob-faktura.pdf.exe» — ikki kengaytma'],['Natija','zararli dastur o‘rnatilishi mumkin'],['Qoida','kutilmagan faylni ochmang']], matn:'Ilovadagi fayl ochilganda zararli dastur kompyuterga o‘rnatilishi, fayllarni shifrlab to‘lov talab qilishi (ransomware) yoki parollarni o‘g‘irlashi mumkin.', manba:IMI_W+' «Malware», «Ransomware»'},
  murojaat:{nom:'Ismsiz murojaat', sarlavha2:'Fishing belgisi', jadval:[['Misol','«Hurmatli mijoz», «Qadrli foydalanuvchi»'],['Sabab','xat minglab odamga bir xil yuborilgan'],['Istisno','maqsadli fishingda ismingiz ham yozilishi mumkin'],['Xulosa','bitta belgi emas, belgilar yig‘indisiga qarang']], matn:'Ommaviy fishing xatlari ko‘p odamga bir xil matnda yuboriladi, shuning uchun ismsiz bo‘ladi. Lekin ism to‘g‘ri yozilgani xat haqiqiy ekanini isbotlamaydi.', manba:IMI_W+' «Phishing» (spear phishing)'},
  sorov:{nom:'Maxfiy ma’lumot so‘rovi', sarlavha2:'Fishing belgisi · asosiy xavf', jadval:[['So‘raladi','parol, karta raqami, CVV, SMS kod'],['Qoida','rasmiy tashkilotlar bularni xat orqali hech qachon so‘ramaydi'],['SMS kod','kimga aytilsa — hisobingiz o‘shaniki'],['Agar berib qo‘ygan bo‘lsangiz','parolni darhol o‘zgartiring, bankka qo‘ng‘iroq qiling']], matn:'Fishingning asl maqsadi — aynan shu ma’lumot. Qolgan barcha belgilar (shoshiltirish, havola, soxta manzil) sizni shu ma’lumotni berishga undash uchun.', manba:IMI_W+' «Phishing»'},
  gildirak:{nom:'Sezar shifri g‘ildiragi', sarlavha2:'Shifrlash stansiyasi', jadval:[['Tashqi halqa','ochiq matn harflari A–Z'],['Ichki halqa','shifr harflari, k ga surilgan'],['Sezar kaliti','3 (Svetoniy ma’lumoti)'],['Formula','C = (P + k) mod 26']], matn:'G‘ildirakni aylantirib kalitni tanlang: tashqi halqadagi harf qarshisidagi ichki harf — uning shifri. Deshifrlash uchun teskari yo‘nalishda o‘qiladi. Sahnada 26 harfli lotin alifbosi ishlatilgan (o‘zbek lotin alifbosidagi o‘, g‘, sh, ch hisobga olinmagan).', manba:'Svetoniy «Yuliy Sezar», 56; '+IMI_W+' «Caesar cipher»'},
  qulf:{nom:'Qulf — parol kuchi', sarlavha2:'Parol stansiyasi', jadval:[['Kuch o‘lchovi','bitlar ≈ L · log₂N'],['Alifbo','kichik 26 + katta 26 + raqam 10 + belgi 33'],['Vaqt','≈ 2^bit ÷ 2 ÷ 10¹⁰ s — TAXMINIY'],['Tavsiya','NIST 2025: kamida 15 belgi (2FA bilan — 8)']], matn:'Ko‘rsatkich tasodifiy parol farazi bilan hisoblaydi. Keng tarqalgan parollar va lug‘at so‘zlari «juda zaif» deb belgilanadi, chunki hujumchilar ularni birinchi navbatda sinaydi. Haqiqiy parolingizni hech qanday saytga «tekshirish» uchun yozmang.', manba:'NIST SP 800-63B-4 (2025); '+IMI_W+' «Password strength»'}
});

}
{
/* ===================== MUSIQA (guruh im) — mazmun: ritm, cholg‘ular ===================== */
const MUS_DAR = 'Umumiy o‘rta ta’lim maktablari uchun «Musiqa» darsliklari (5–7-sinflar, amaldagi nashrlar) va O‘zbekiston Respublikasi Davlat ta’lim standarti (musiqa madaniyati fani)';
const MUS_AUD = 'Sahnadagi barcha tovushlar brauzerda WebAudio orqali sintez qilinadi (yozuv emas) va faqat tugma yoki obyekt bosilganda yangraydi';
const MUS_CHOL = 'O‘zbekcha Vikipediya: «Dutor», «Tanbur», «G‘ijjak», «Chang (cholg‘u asbobi)», «Nay», «Surnay», «Doira (cholg‘u asbobi)» (uz.wikipedia.org); Wikipedia (inglizcha): «Dutar», «Tanbur», «Ghijak» (en.wikipedia.org); Sh. Rahimov, A. Lutfullayev «Cholg‘ushunoslik» (o‘quv qo‘llanma, ziyouz.com)';

/* ---------------------------------------------------------------- 7. RITM VA O‘LCHOV ---------------------------------------------------------------- */
bogla('musiqa', 'Ritm va o‘lchov: 2/4, 3/4, 4/4', 'musiqa-ritm', 'Hissa, takt, kuchli va kuchsiz hissa, temp — metronom va doira bilan');
L['musiqa-ritm'] = {
  fan:'musiqa', sinf:'5-sinf', qisqaNom:'Ritm va o‘lchov', nom:'Ritm va o‘lchov: 2/4, 3/4, 4/4',
  qisqa:'5-sinf · musiqa savodi · metronom va doira',
  sahna:'im_ritm',
  kor:{
    sarlavha:'Musiqaning yurak urishi — hissa va takt',
    matn:'Har qanday kuy vaqt ichida bir tekis «yuradi»: biz unga qo‘l qarsagi yoki oyoq bilan jo‘r bo‘la olamiz. Bu bir tekis zarblar — <b>hissalar</b>. Hissalar kuchli va kuchsizga bo‘linib, guruh-guruh bo‘lib takrorlanadi; bunday guruh — <b>takt</b>, uning tuzilishi esa <b>o‘lchov</b> (2/4, 3/4, 4/4, 6/8). Sahnada metronom mayatnigi tempga mos tebranadi, doira har hissada titraydi, chiroqlar halqasida kuchli hissa katta va oltin rangda yonadi. O‘lchovni va tempni almashtiring; ovozli rejim faqat «▶ Ovoz bilan» tugmasi bosilganda yoqiladi (tovush brauzerda sintez qilinadi).',
    punktlar:[
      '<b>Hissa</b> — musiqadagi bir tekis zarb (puls); <b>takt</b> — kuchli hissadan keyingi kuchli hissagacha bo‘lgan qism',
      '<b>O‘lchov</b> kasr ko‘rinishida yoziladi: yuqori raqam — taktdagi hissalar soni, pastki raqam — hissaning davomiyligi (4 — chorak, 8 — sakkizlik nota)',
      '<b>Temp</b> — ijro tezligi; daqiqasiga hissalar soni (BPM) bilan o‘lchanadi: 60 BPM da har hissa 1 soniya',
      '<b>Metronom</b> — tempni aniq ko‘rsatuvchi asbob; uni 1815-yilda I. N. Mälzel patentlagan (D. N. Winkel ixtirosi asosida)'
    ]
  },
  bolimlar:[
    {sarlavha:'To‘rt asosiy o‘lchov', jadval:[
      ['2/4','2 ta chorak hissa: KUCHLI – kuchsiz. Marsh, polka, ko‘plab raqs kuylari'],
      ['3/4','3 ta chorak hissa: KUCHLI – kuchsiz – kuchsiz. Vals, menuet'],
      ['4/4','4 ta chorak hissa: KUCHLI – kuchsiz – nisbiy kuchli – kuchsiz. Marshlar, qo‘shiqlar; «C» belgisi bilan ham yoziladi'],
      ['6/8','6 ta sakkizlik hissa, 3+3 guruh: KUCHLI – kuchsiz – kuchsiz – nisbiy kuchli – kuchsiz – kuchsiz. Barkarola, alla kabi tebranma kuylar']
    ], matn:'2/4 va 3/4 — oddiy o‘lchovlar (bitta kuchli hissa), 4/4 va 6/8 — murakkab o‘lchovlar (ikki oddiy o‘lchovdan tuzilgan: kuchli hissadan tashqari nisbiy kuchli hissa bor).'},
    {sarlavha:'Temp belgilari (taxminiy chegaralar)', jadval:[
      ['Largo (largo)','juda sekin, keng — taxminan 40–60 BPM'],
      ['Adagio (adajio)','sekin — taxminan 66–76 BPM'],
      ['Andante (andante)','o‘rtacha, «yurish» tezligida — taxminan 76–108 BPM'],
      ['Moderato (moderato)','mo‘tadil — taxminan 108–120 BPM'],
      ['Allegro (allegro)','tez, quvnoq — taxminan 120–168 BPM'],
      ['Presto (presto)','juda tez — taxminan 168–200 BPM']
    ], matn:'Temp nomlari italyancha. BPM chegaralari turli darslik va metronomlarda biroz farq qiladi — shuning uchun «taxminan» deb berilgan.'}
  ],
  bosqichlar:[
    {sarlavha:'Hissa — musiqaning pulsi', matn:'Metronom mayatnigi bir tekis tebranmoqda: har chetga borishi — bitta hissa. Qo‘lingiz bilan stolga sekin urib, mayatnikka jo‘r bo‘ling. Yurak urishi kabi, hissa ham to‘xtamasdan davom etadi.', holat:{olchov:'4/4', temp:72}},
    {sarlavha:'2/4 — marsh o‘lchovi', matn:'Ikkita hissadan birinchisi kuchli: «BIR-ikki, BIR-ikki». Qadam tashlab yurish shu o‘lchovga to‘g‘ri keladi — shuning uchun marshlar ko‘pincha 2/4 da yoziladi. Chiroqlar halqasida 1-hissa katta va oltin rangda.', holat:{olchov:'2/4', temp:100}},
    {sarlavha:'3/4 — vals o‘lchovi', matn:'Uch hissa: «BIR-ikki-uch». Kuchli hissadan keyin ikkita kuchsiz hissa keladi — aylanma, silliq harakat hosil bo‘ladi. Vals va menuet shu o‘lchovda yoziladi.', holat:{olchov:'3/4', temp:120}},
    {sarlavha:'4/4 — eng ko‘p uchraydigan o‘lchov', matn:'To‘rt hissa: 1-hissa kuchli, 3-hissa nisbiy kuchli, 2- va 4-hissalar kuchsiz. 4/4 ni ba’zan «C» harfiga o‘xshash belgi bilan yozishadi.', holat:{olchov:'4/4', temp:96}},
    {sarlavha:'6/8 — tebranma o‘lchov', matn:'Hissa — sakkizlik nota, taktda oltita: 3 + 3. 1-hissa kuchli, 4-hissa nisbiy kuchli. Tez ijroda 6/8 «ikki katta qadam» kabi sezilib, har biri uchga bo‘linadi.', holat:{olchov:'6/8', temp:132}},
    {sarlavha:'Temp: sekin va tez', matn:'Bir o‘lchovning o‘zini turli tezlikda chalish mumkin. 60 BPM da hissa 1 soniya davom etadi, 120 BPM da — 0,5 soniya. Largo — juda sekin, Presto — juda tez.', holat:{olchov:'3/4', temp:60}},
    {sarlavha:'Doira — o‘zbek ritmining qalbi', matn:'O‘zbek musiqasida ritmni ko‘pincha doira beradi: gardish chetiga urilgan jarangdor zarb — «bak», markazga urilgan past, bo‘g‘iq zarb — «bum». Doira usullari ham kuchli va kuchsiz zarblarning takrorlanuvchi tartibiga asoslanadi.', holat:{olchov:'2/4', temp:88}}
  ],
  amaliyot:{tur:'shart', sarlavha:'O‘lchov va tempni sozlang', holat:{olchov:'4/4', temp:90},
    topshiriqlar:[
      {shart:'Vals o‘lchovini tanlang.', hodisa:'im-olchov', kod:"ev.olchov==='3/4'", izoh:'To‘g‘ri — vals <b>3/4</b> o‘lchovida: «BIR-ikki-uch».'},
      {shart:'Tempni shunday qo‘yingki, har hissa <b>1 soniya</b> davom etsin (58–62 BPM).', hodisa:'im-olchov', kod:"ev.temp>=58 && ev.temp<=62", izoh:'To‘g‘ri — <b>60 BPM</b>: daqiqada 60 hissa, har biri 60 : 60 = 1 soniya.'},
      {shart:'Chiroqlar halqasida <b>kuchli hissani</b> bosing.', hodisa:'im-hissa', kod:"ev.kuchli===true", izoh:'To‘g‘ri — taktning <b>1-hissasi</b> doim kuchli.'},
      {shart:'Murakkab o‘lchov <b>6/8</b> ni tanlang va tempni <b>100 BPM dan yuqori</b> qiling.', hodisa:'im-olchov', kod:"ev.olchov==='6/8' && ev.temp>100", izoh:'To‘g‘ri — <b>6/8</b>: 3 + 3 sakkizlik, 1- va 4-hissalar urg‘uli.'},
      {shart:'Tempni aniq ko‘rsatuvchi asbobni — <b>metronomni</b> bosing.', hodisa:'im-ritm', kod:"ev.nom==='metronom'", izoh:'To‘g‘ri — <b>metronom</b>. Mälzel uni 1815-yilda patentlagan.'}
    ]},
  test:[
    {s:'3/4 o‘lchovida bitta taktda nechta hissa bor?', v:['2','3','4','6'], t:1, izoh:'<b>3</b> ta chorak hissa: yuqori raqam taktdagi hissalar sonini bildiradi.'},
    {s:'O‘lchovdagi pastki raqam nimani bildiradi?', v:['Taktlar sonini','Hissaning davomiyligini (qaysi nota bitta hissa)','Tempni','Kuchli hissalar sonini'], t:1, izoh:'Pastki raqam — <b>hissaning davomiyligi</b>: 4 — chorak nota, 8 — sakkizlik nota.'},
    {s:'Taktning qaysi hissasi doim kuchli?', v:['Birinchi','Ikkinchi','Oxirgi','Har qanday'], t:0, izoh:'<b>Birinchi</b> hissa. 4/4 da 3-hissa nisbiy kuchli, 6/8 da — 4-hissa.'},
    {s:'Vals odatda qaysi o‘lchovda yoziladi?', v:['2/4','3/4','4/4','6/8'], t:1, izoh:'Vals — <b>3/4</b> o‘lchovida: bitta kuchli va ikkita kuchsiz hissa.'},
    {s:'Temp 60 BPM bo‘lsa, bitta hissa qancha davom etadi?', v:['0,5 soniya','1 soniya','2 soniya','60 soniya'], t:1, izoh:'<b>1 soniya</b>: 60 soniya : 60 hissa = 1 soniya.'},
    {s:'Temp 120 BPM bo‘lsa, 4/4 o‘lchovidagi bitta takt qancha davom etadi?', v:['1 soniya','2 soniya','4 soniya','0,5 soniya'], t:1, izoh:'Hissa = 60 : 120 = 0,5 s; takt = 4 × 0,5 = <b>2 soniya</b>.'},
    {s:'Metronomni 1815-yilda kim patentlagan?', v:['L. van Betxoven','I. N. Mälzel','J. S. Bax','A. Vivaldi'], t:1, izoh:'<b>I. N. Mälzel</b> (Mälzel); u D. N. Winkel yaratgan mexanizmdan foydalangan. Notalardagi «M. M.» belgisi — «Mälzel metronomi».'},
    {s:'Doira markaziga urilgan past, bo‘g‘iq zarb qanday ataladi?', v:['bak','bum','tak','takt'], t:1, izoh:'<b>bum</b> — markazga urilgan past zarb; gardish chetiga urilgan jarangdor zarb — «bak».'},
    {s:'«Allegro» belgisi qanday tempni bildiradi?', v:['Juda sekin','Tez, quvnoq','O‘rtacha, yurish tezligida','Asta-sekin sekinlashib'], t:1, izoh:'<b>Tez, quvnoq</b> — taxminan 120–168 BPM. «Andante» — o‘rtacha, «Largo» — juda sekin.'},
    {s:'Notalar yozuvida taktlar bir-biridan nima bilan ajratiladi?', v:['Nuqta','Vertikal takt chizig‘i','Kalit belgisi','Pauza'], t:1, izoh:'<b>Vertikal takt chizig‘i</b> bilan. Asar oxirida qo‘sh chiziq qo‘yiladi.'},
    {tur:'3d', s:'Chiroqlar halqasida taktning <b>kuchli hissasini</b> bosing.', hodisa:'im-hissa', kalit:'kuchli', togri:['true'], v:['Kuchli (1-) hissa','kuchsiz hissa'], t:0,
     izoh:'Kuchli hissa — taktning <b>1-hissasi</b>; sahnada u katta va oltin rangda yonadi.'}
  ],
  yordamchi:[
    {s:'Ritm va o‘lchov bir narsami?', j:'Yo‘q. Ritm — tovushlar davomiyliklarining (uzun-qisqa) tartibi, o‘lchov esa hissalarning kuchli-kuchsiz tartibi. Bir xil o‘lchovda (masalan, 2/4) turli ritmlar yozish mumkin.', kalit:['ritm','olchov','farq']},
    {s:'BPM nima?', j:'BPM (inglizcha beats per minute) — daqiqasiga hissalar soni. Hissa davomiyligi = 60 : BPM soniya. Masalan, 90 BPM da hissa ≈ 0,67 soniya.', kalit:['bpm','temp','daqiqa']},
    {s:'Nega ovoz o‘zi chalmaydi?', j:'MAKON da tovush faqat siz «▶ Ovoz bilan» tugmasini bosganingizda yoqiladi. Metronom zarbi va doira tovushi brauzerda sintez qilinadi — yozib olingan fayl ishlatilmaydi.', kalit:['ovoz','tovush','chalmaydi']}
  ],
  maqola:[
    {sarlavha:'Hissa, takt va o‘lchov', xatboshilar:[
      'Musiqani tinglaganimizda beixtiyor oyoq bilan urib turamiz. Biz urayotgan bir tekis zarblar musiqada hissalar deyiladi. Hissalar soat mili kabi teng oraliqda keladi, lekin ularning hammasi bir xil «og‘irlikda» emas: ba’zilari urg‘uli (kuchli), boshqalari yengil (kuchsiz).',
      'Kuchli va kuchsiz hissalar ma’lum tartibda takrorlanadi. Bir kuchli hissadan keyingi kuchli hissagacha bo‘lgan qism takt deyiladi. Notalar yozuvida taktlar vertikal takt chizig‘i bilan ajratiladi, asar oxirida esa qo‘sh chiziq qo‘yiladi.',
      'Taktda nechta hissa borligi va har bir hissa qaysi nota bilan ifodalanishi o‘lchov bilan ko‘rsatiladi. O‘lchov nota yo‘lining boshida, kalitdan keyin kasr ko‘rinishida yoziladi (lekin kasr chizig‘isiz): yuqori raqam — hissalar soni, pastki raqam — hissa davomiyligi. 3/4 — «uch chorak»: taktda uchta chorak nota.'
    ]},
    {sarlavha:'Oddiy va murakkab o‘lchovlar', xatboshilar:[
      'Faqat bitta kuchli hissasi bor o‘lchovlar oddiy o‘lchov deyiladi: 2/4 («BIR-ikki») va 3/4 («BIR-ikki-uch»). 2/4 marsh va polkaga xos: odam qadami ham ikki hissali. 3/4 — vals va menuet o‘lchovi: aylanma, silliq harakat hissini beradi.',
      'Ikki yoki undan ortiq oddiy o‘lchovdan tuzilgan o‘lchovlar murakkab o‘lchov deyiladi. 4/4 ikkita 2/4 dan iborat: 1-hissa kuchli, 3-hissa nisbiy kuchli (kuchlidan biroz kuchsizroq). 6/8 ikkita 3/8 dan iborat: 1-hissa kuchli, 4-hissa nisbiy kuchli.',
      '6/8 tez ijro etilganda uni «ikkiga» — ikki katta hissaga sanashadi, har katta hissa uchta sakkizlikka bo‘linadi. Shuning uchun alla, qayiqchi qo‘shig‘i (barkarola) kabi tebranma kuylar ko‘pincha 6/8 da yoziladi.'
    ]},
    {sarlavha:'Temp va metronom', xatboshilar:[
      'Temp — musiqaning ijro tezligi. Qadimda temp so‘z bilan (asosan italyancha) belgilangan: Largo — juda sekin, Andante — yurish tezligida, Allegro — tez, Presto — juda tez. Bu so‘zlar bugun ham ishlatiladi, ammo ular aniq raqam emas, balki kayfiyatni ham bildiradi.',
      'Aniq temp metronom bilan o‘lchanadi. Mexanik metronomni 1815-yilda I. N. Mälzel patentlagan; u gollandiyalik D. N. Winkel yaratgan qo‘sh mayatnik g‘oyasidan foydalangan. Notalardagi «M. M. ♩ = 96» yozuvi «Mälzel metronomi bo‘yicha daqiqasiga 96 chorak» degani. Betxoven o‘z asarlariga metronom raqamlarini qo‘ygan birinchi mashhur bastakorlardan bo‘lgan.',
      'Mexanik metronomda mayatnik ustidagi yuk yuqoriga surilsa, tebranish sekinlashadi, pastga surilsa — tezlashadi. Bugun elektron va dasturiy metronomlar keng tarqalgan. Hissa davomiyligini hisoblash oson: t = 60 : BPM soniya.'
    ]},
    {sarlavha:'Doira va o‘zbek usullari', xatboshilar:[
      'O‘zbek musiqasida ritmni ko‘pincha doira beradi. Doira — yog‘och gardishga teri tortilgan, ichki tomoniga metall halqalar osilgan zarbli cholg‘u; gardish diametri taxminan 40–51 sm. Barmoqlar bilan gardish chetiga urilgan jarangdor zarb «bak», markazga urilgan past zarb «bum» deb ataladi.',
      'Doira usuli — bak va bum zarblarining takrorlanuvchi tartibi. Usul ham xuddi takt kabi takrorlanadi, lekin u bir necha taktni o‘z ichiga olishi va murakkab bo‘lishi mumkin. Maqom ashulalari ham o‘z usullariga ega.',
      'Doirachi ansamblning «dirijyori» vazifasini ham bajaradi: tempni boshlaydi, tezlashtiradi va asarni yakunlaydi. Sahnada doira har hissada titraydi — kuchli hissada «bum», kuchsiz hissalarda «bak» sintez qilinadi.'
    ]}
  ],
  formulalar:[
    ['t = 60 / BPM (s)','Bitta hissaning davomiyligi (60 BPM → 1 s; 120 BPM → 0,5 s)'],
    ['T_takt = n · 60 / BPM','Taktning davomiyligi (n — taktdagi hissalar soni); 4/4, 120 BPM → 2 s'],
    ['BPM = 60 / t','Hissa davomiyligidan tempni topish (t = 0,75 s → 80 BPM)'],
    ['4/4 = 2/4 + 2/4;  6/8 = 3/8 + 3/8','Murakkab o‘lchovlar oddiy o‘lchovlardan tuziladi']
  ],
  qiziqarli:[
    'Notalardagi «M. M.» qisqartmasi «Mälzel metronomi» degani — ixtirochi nomi 200 yildan ortiq vaqtdan beri notalarda yashab kelmoqda.',
    'Tinch holatdagi kattalar yuragi daqiqasiga 60–100 marta uradi — bu Andante va Moderato tempiga yaqin.',
    '4/4 o‘lchovining «C» belgisi aslida lotincha harf emas: u o‘rta asrlardagi yarim doira belgisidan kelib chiqqan (keng tarqalgan «common time» izohi — keyingi davr talqini).',
    'Mexanik metronom mayatnigidagi yuk pastga surilsa tebranish tezlashadi — xuddi qisqa mayatnik tezroq tebranganidek.',
    'Doira ijrochisi faqat barmoqlar bilan zarbning ohangini o‘zgartira oladi: chetga urish jarangdor «bak», markazga — past «bum» beradi.'
  ],
  lugat:[
    ['Hissa','Musiqadagi bir tekis takrorlanuvchi zarb (puls).'],
    ['Takt','Bir kuchli hissadan keyingi kuchli hissagacha bo‘lgan qism.'],
    ['Takt chizig‘i','Notalar yozuvida taktlarni ajratuvchi vertikal chiziq.'],
    ['O‘lchov','Taktdagi hissalar soni va davomiyligi (2/4, 3/4, 4/4, 6/8).'],
    ['Kuchli hissa','Taktning urg‘uli, birinchi hissasi.'],
    ['Nisbiy kuchli hissa','Murakkab o‘lchovda kuchlidan keyingi urg‘uli hissa (4/4 da 3-, 6/8 da 4-hissa).'],
    ['Ritm','Tovush davomiyliklarining (uzun-qisqa) tartibi.'],
    ['Temp','Ijro tezligi; BPM — daqiqasiga hissalar soni.'],
    ['Metronom','Tempni aniq ko‘rsatuvchi asbob (mexanik yoki elektron).'],
    ['Usul','Doiradagi zarblarning takrorlanuvchi tartibi.'],
    ['Bak','Doira gardishi chetiga urilgan jarangdor zarb.'],
    ['Bum','Doira markaziga urilgan past, bo‘g‘iq zarb.']
  ],
  manba:MUS_DAR+'; Wikipedia (inglizcha): «Metronome», «Time signature», «Tempo» (en.wikipedia.org); O‘zbekcha Vikipediya «Doira (cholg‘u asbobi)» (uz.wikipedia.org). '+MUS_AUD+'. Temp belgilari uchun BPM chegaralari manbalarda farq qiladi — «taxminan» deb berilgan.',
  ishlanma:{
    sinf:'5-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (amaliy mashg‘ulot)', usul:'3D metronom va doira, qarsak bilan jo‘r bo‘lish, «jonli metronom» o‘yini, juftlikda hisoblash',
    maqsad:{talimiy:'Hissa, takt, o‘lchov (2/4, 3/4, 4/4, 6/8), kuchli va kuchsiz hissa, temp tushunchalarini o‘rgatish; hissa va takt davomiyligini hisoblashni o‘rgatish.',
      tarbiyaviy:'Jamoa bilan birga bir ritmda harakat qilish madaniyatini, o‘zbek xalq cholg‘usi doiraga hurmatni tarbiyalash.',
      rivojlantiruvchi:'Ritm hissi, diqqat, eshitib tahlil qilish va oddiy hisoblash ko‘nikmalarini rivojlantirish.'},
    natijalar:['2/4, 3/4, 4/4, 6/8 o‘lchovlarini qarsak bilan ijro etadi','Taktdagi kuchli hissani aniqlaydi','Tempni BPM da aytadi va hissa davomiyligini hisoblaydi','Doiradagi «bak» va «bum» zarblarini farqlaydi'],
    jihozlar:['MAKON sahnasi «Ritm va o‘lchov» (metronom, doira)','Proyektor yoki interaktiv doska','Doira (bo‘lsa)','Kartochkalar: 2/4, 3/4, 4/4, 6/8','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Salomlashish, davomat.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Yurak urishini sezib ko‘rish: «Musiqaning ham yuragi bormi?» MAKON da metronom mayatnigi.','Pulsni sanaydi, qarsak bilan jo‘r bo‘ladi.'],
      ['8–18','<b>Hissa, takt, o‘lchov.</b> 2/4 va 3/4 ni sahnada yoqadi, kuchli hissani chiroqlarda ko‘rsatadi; «marsh» va «vals» harakatlari.','Qarsak bilan «BIR-ikki», «BIR-ikki-uch» ni ijro etadi.'],
      ['18–25','<b>Murakkab o‘lchovlar.</b> 4/4 (nisbiy kuchli 3-hissa) va 6/8 (3 + 3).','Kartochkani ko‘taradi: qaysi o‘lchov eshitilyapti?'],
      ['25–32','<b>Temp.</b> Metronom tempini 60 → 120 → 60; t = 60 / BPM formulasi; italyancha nomlar.','Juftlikda hissa va takt davomiyligini hisoblaydi.'],
      ['32–40','<b>Doira va mustahkamlash.</b> «Bak» va «bum», MAKON amaliyoti va test.','Amaliyot va testni bajaradi.'],
      ['40–45','<b>Yakun, baholash, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Hissa','Bir tekis zarb.'],['Takt','Kuchli hissadan kuchli hissagacha.'],['O‘lchov','2/4, 3/4, 4/4, 6/8.'],['Temp','Ijro tezligi (BPM).'],['Metronom','Tempni ko‘rsatuvchi asbob.']],
    savollar:[['3/4 da nechta hissa bor?','3 ta chorak hissa'],['4/4 da qaysi hissalar urg‘uli?','1-hissa kuchli, 3-hissa nisbiy kuchli'],['80 BPM da hissa qancha davom etadi?','60 : 80 = 0,75 soniya'],['Vals qaysi o‘lchovda?','3/4'],['Doiradagi «bak» qanday hosil qilinadi?','Gardish chetiga urib']],
    uy:'Darslikdagi mavzuni o‘qish; (1) sevimli qo‘shig‘ingizni tinglab, uning o‘lchovini aniqlang (2/4, 3/4 yoki 4/4); (2) 4/4 o‘lchovida 90 BPM tempda 8 takt necha soniya davom etishini hisoblang (javob: hissa 60 : 90 ≈ 0,67 s; takt ≈ 2,67 s; 8 takt ≈ 21,3 s); (3) qo‘l va stol yordamida «bak-bum» bilan 2/4 ritmini o‘ylab toping va daftarga yozing.',
    manba:MUS_DAR+'; Wikipedia «Metronome», «Time signature»'
  }
};
DT.im_ritm = Object.assign(DT.im_ritm || {}, {
  metronom:{nom:'Metronom', sarlavha2:'Tempni o‘lchovchi asbob',
    jadval:[['Patent','1815-yil, I. N. Mälzel (D. N. Winkel mexanizmi asosida)'],['Belgi notada','M. M. ♩ = 96 — daqiqasiga 96 chorak'],['Diapazon','mexanik metronomlarda odatda 40–208 BPM'],['Tuzilishi','prujina, qo‘sh mayatnik, suriladigan yuk']],
    matn:'Mayatnik ustidagi yuk yuqoriga surilsa tebranish sekinlashadi, pastga surilsa tezlashadi. Sahnadagi metronom mayatnigi tanlangan tempga mos tebranadi; zarb ovozi faqat «▶ Ovoz bilan» bosilganda brauzerda sintez qilinadi.',
    manba:'Wikipedia (inglizcha) «Metronome» (en.wikipedia.org/wiki/Metronome)'},
  doira:{nom:'Doira', sarlavha2:'O‘zbek xalq zarbli cholg‘usi',
    jadval:[['Gardish','o‘rik, yong‘oq (keyinroq zarang, akatsiya) yog‘ochi; diametri 400–510 mm'],['Teri','buzoq, toy yoki echki terisi'],['Ichida','metall halqalar (halqasiz turlari ham bor)'],['Zarblar','«bak» — chetga, «bum» — markazga']],
    matn:'Doira yakka cholg‘u sifatida ham, ansamblda ritm beruvchi sifatida ham chalinadi. Mil. av. II asrga oid O‘rta Osiyo topilmalarida doirachilar tasviri uchraydi (manba: uz.wikipedia). XX asr ustalari — Usta Olim Komilov va boshqalar.',
    manba:'O‘zbekcha Vikipediya «Doira (cholg‘u asbobi)» (uz.wikipedia.org)'},
  hissa:{nom:'Hissa (puls)', sarlavha2:'Musiqa vaqtining birligi',
    jadval:[['Ta’rif','bir tekis takrorlanuvchi zarb'],['Turlari','kuchli, nisbiy kuchli, kuchsiz'],['Davomiyligi','t = 60 / BPM soniya'],['Sahnada','chiroqlar halqasi: kuchli hissa — katta, oltin']],
    matn:'Taktning birinchi hissasi doim kuchli. Murakkab o‘lchovlarda yana bitta urg‘u — nisbiy kuchli hissa bor: 4/4 da 3-hissa, 6/8 da 4-hissa.',
    manba:MUS_DAR},
  olchov_24:{nom:'2/4 o‘lchovi', sarlavha2:'Oddiy o‘lchov · ikki chorak',
    jadval:[['Hissalar','2 ta chorak'],['Urg‘u','KUCHLI – kuchsiz'],['Xos janrlar','marsh, polka, ko‘plab raqs kuylari'],['Sanash','«BIR-ikki»']],
    matn:'Odam qadami ikki hissali bo‘lgani uchun marshlar ko‘pincha 2/4 da yoziladi.', manba:MUS_DAR},
  olchov_34:{nom:'3/4 o‘lchovi', sarlavha2:'Oddiy o‘lchov · uch chorak',
    jadval:[['Hissalar','3 ta chorak'],['Urg‘u','KUCHLI – kuchsiz – kuchsiz'],['Xos janrlar','vals, menuet'],['Sanash','«BIR-ikki-uch»']],
    matn:'Bitta kuchli va ikkita kuchsiz hissa aylanma, silliq harakat hosil qiladi — vals raqsi shu o‘lchovda.', manba:MUS_DAR},
  olchov_44:{nom:'4/4 o‘lchovi', sarlavha2:'Murakkab o‘lchov · to‘rt chorak',
    jadval:[['Hissalar','4 ta chorak'],['Urg‘u','KUCHLI – kuchsiz – nisbiy kuchli – kuchsiz'],['Tuzilishi','2/4 + 2/4'],['Belgisi','4/4 yoki «C»']],
    matn:'Eng ko‘p uchraydigan o‘lchovlardan biri: marshlar, qo‘shiqlar, estrada musiqasi.', manba:MUS_DAR},
  olchov_68:{nom:'6/8 o‘lchovi', sarlavha2:'Murakkab o‘lchov · olti sakkizlik',
    jadval:[['Hissalar','6 ta sakkizlik'],['Guruhlanishi','3 + 3'],['Urg‘u','1-hissa kuchli, 4-hissa nisbiy kuchli'],['Xos janrlar','barkarola, alla, tebranma kuylar']],
    matn:'Tez ijroda 6/8 «ikkiga» sanaladi — ikki katta hissa, har biri uch sakkizlikka bo‘linadi.', manba:MUS_DAR}
});

/* ---------------------------------------------------------------- 8. O‘ZBEK XALQ CHOLG‘ULARI ---------------------------------------------------------------- */
bogla('musiqa', 'O‘zbek xalq cholg‘ulari', 'musiqa-cholgular', 'Dutor, tanbur, g‘ijjak, chang, nay, surnay, doira — 3D modellar va sintez tembr');
L['musiqa-cholgular'] = {
  fan:'musiqa', sinf:'5-sinf', qisqaNom:'Xalq cholg‘ulari', nom:'O‘zbek xalq cholg‘ulari',
  qisqa:'5-sinf · 7 ta cholg‘u 3D da · tovush guruhlari',
  sahna:'im_cholgu',
  kor:{
    sarlavha:'Tor, havo va teri — yetti cholg‘u sahnada',
    matn:'O‘zbek xalq cholg‘ulari tovush chiqarish usuliga ko‘ra guruhlanadi: <b>torli</b> (chertib — dutor, tanbur; kamon bilan — g‘ijjak; urib — chang), <b>damli</b> (nay, surnay) va <b>zarbli</b> (doira). Podiumdagi har bir cholg‘uni bosing: uning tuzilishi, tarixi va qisqa sintez tembri chiqadi. Tembr — soddalashtirilgan kompyuter sintezi, haqiqiy cholg‘u yozuvi emas; u faqat guruhlar farqini eshitishga yordam beradi.',
    punktlar:[
      '<b>Torli-chertma:</b> dutor (2 tor), tanbur (3 tor, ba’zi manbalarda 4) — noxun yoki barmoq bilan chertiladi',
      '<b>Torli-kamonli:</b> g‘ijjak — kamon bilan chalinadi; <b>torli-zarbli:</b> chang — ikki cho‘p bilan uriladi',
      '<b>Damli:</b> nay (6 barmoq teshigi) va surnay (qo‘sh qamishli, jarangdor)',
      '<b>Zarbli:</b> doira — teri, gardish va metall halqalar; «bak» va «bum» zarblari'
    ]
  },
  bolimlar:[
    {sarlavha:'Cholg‘ular guruhlari', jadval:[
      ['Torli-chertma','dutor, tanbur (shuningdek rubob, qashqar rubobi) — tor chertilib tebratiladi'],
      ['Torli-kamonli','g‘ijjak (shuningdek qo‘biz, sato) — tor kamon bilan ishqalanadi'],
      ['Torli-zarbli','chang — torlarga bambuk cho‘plar bilan uriladi'],
      ['Damli','nay, surnay (shuningdek karnay, bulamon) — havo ustuni tebranadi'],
      ['Zarbli','doira (shuningdek nog‘ora, qayroq) — teri yoki qattiq jism uriladi']
    ], matn:'Qavs ichidagi cholg‘ular sahnada yo‘q, ular guruhni to‘ldirish uchun misol sifatida berilgan.'},
    {sarlavha:'Qisqa taqqoslash', jadval:[
      ['Dutor','2 tor · uzun dasta · tut yoki o‘rik yog‘ochi · mayin tovush'],
      ['Tanbur','3 (4) metall tor · 16–19 parda · 110–130 sm · Shashmaqomning yetakchi cholg‘usi'],
      ['G‘ijjak','3–4 tor · kosasiga teri tortilgan · kamon bilan · «inson ovoziga yaqin»'],
      ['Chang','taxminan 40 tor · trapetsiya shakli · 2 cho‘p'],
      ['Nay','6 barmoq teshigi · yog‘och, qamish yoki mis · ~2,5 oktava'],
      ['Surnay','qo‘sh qamish tilcha · 45–55 sm · jarangdor, o‘tkir tovush'],
      ['Doira','gardish 400–510 mm · teri · metall halqalar']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Cholg‘ular podiumi', matn:'Yetti cholg‘u yarim doira shaklida turibdi. Ularni tovush qanday hosil bo‘lishiga qarab guruhlaymiz: tor tebranadimi, havo ustunimi yoki teri? Har cholg‘uni bosing — karta va qisqa tembr chiqadi.', holat:{cholgu:null, guruh:null}},
    {sarlavha:'Dutor — «ikki tor»', matn:'Nomi forscha «du» (ikki) va «tor» so‘zlaridan. Uzun ingichka dasta, noksimon kosa; torlar avval ichak, keyin ipakdan bo‘lgan, hozir ko‘pincha neylon. Tovushi mayin va yoqimli; xalq qo‘shiqlari va maqom ijrosida jo‘r bo‘ladi.', holat:{cholgu:'dutor', guruh:null}},
    {sarlavha:'Tanbur — maqomlar sultoni', matn:'Uzunligi 110–130 sm, dastasiga 16–19 parda bog‘langan. O‘zbek tanburida 3 ta metall tor bor (ba’zi manbalarda 4 ta); ohang asosan birinchi tordan olinadi, qolganlari jo‘r bo‘lib yangraydi. O‘ng qo‘l ko‘rsatkich barmog‘iga taqilgan sim noxun bilan chertiladi.', holat:{cholgu:'tanbur', guruh:null}},
    {sarlavha:'G‘ijjak va chang', matn:'G‘ijjak — kamonli cholg‘u: kosasiga teri tortilgan, 3–4 tori kamon bilan ishqalanadi; tovushi inson ovoziga yaqin. Chang — trapetsiya shaklidagi ko‘p torli cholg‘u (taxminan 40 tor), torlarga ikki bambuk cho‘p bilan uriladi.', holat:{cholgu:null, guruh:'torli_kamon'}},
    {sarlavha:'Damli cholg‘ular: nay va surnay', matn:'Nayda 6 ta barmoq teshigi bor, u yog‘och, qamish yoki misdan yasaladi. Surnay — qo‘sh qamish tilchali, jarangdor va o‘tkir tovushli cholg‘u; u karnay va doira bilan to‘y va sayillarda ochiq havoda chalinadi.', holat:{cholgu:null, guruh:'damli'}},
    {sarlavha:'Doira — ritm yuragi', matn:'Gardish diametri 400–510 mm, unga buzoq, toy yoki echki terisi tortiladi, ichiga metall halqalar osiladi. Gardish chetiga urilgan zarb — «bak», markazga — «bum». Doira ansamblda ritm va tempni boshqaradi.', holat:{cholgu:'doira', guruh:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Cholg‘uni tovush chiqarish usuli bo‘yicha toping', holat:{cholgu:null, guruh:null},
    topshiriqlar:[
      {shart:'<b>Kamon</b> bilan chalinadigan cholg‘uni bosing.', hodisa:'im-cholgu', kod:"ev.nom==='gijjak'", izoh:'To‘g‘ri — <b>g‘ijjak</b>: tor kamon bilan ishqalanib tebratiladi.'},
      {shart:'Nomi «ikki tor» degan ma’noni beruvchi cholg‘uni bosing.', hodisa:'im-cholgu', kod:"ev.nom==='dutor'", izoh:'To‘g‘ri — <b>dutor</b> (forscha «du» — ikki, «tor»).'},
      {shart:'Torlariga <b>cho‘plar bilan uriladigan</b> cholg‘uni toping.', hodisa:'im-cholgu', kod:"ev.nom==='chang'", izoh:'To‘g‘ri — <b>chang</b>: torli-zarbli cholg‘u.'},
      {shart:'Istalgan <b>damli</b> cholg‘uni bosing.', hodisa:'im-cholgu', kod:"ev.guruh==='damli'", izoh:'To‘g‘ri — nay va surnayda tovushni <b>havo ustuni</b> hosil qiladi.'},
      {shart:'Shashmaqom ijrosida yetakchi bo‘lgan torli cholg‘uni toping.', hodisa:'im-cholgu', kod:"ev.nom==='tanbur'", izoh:'To‘g‘ri — <b>tanbur</b>, Buxoro Shashmaqomining asosiy cholg‘usi.'}
    ]},
  test:[
    {s:'Dutorning nechta tori bor?', v:['1','2','3','4'], t:1, izoh:'<b>2</b> ta: nomi ham «du» (ikki) + «tor» dan kelib chiqqan.'},
    {s:'Qaysi cholg‘u kamon bilan chalinadi?', v:['Dutor','G‘ijjak','Chang','Tanbur'], t:1, izoh:'<b>G‘ijjak</b> — torli-kamonli cholg‘u; kosasiga teri tortilgan.'},
    {s:'Changda tovush qanday hosil qilinadi?', v:['Torlar chertiladi','Torlarga ikki cho‘p bilan uriladi','Tor kamon bilan ishqalanadi','Havo puflanadi'], t:1, izoh:'<b>Torlarga ikki cho‘p bilan uriladi</b> — chang torli-zarbli cholg‘u.'},
    {s:'Tanbur qanday chalinadi?', v:['Kamon bilan','Ko‘rsatkich barmoqqa taqilgan noxun bilan chertib','Cho‘plar bilan urib','Puflab'], t:1, izoh:'<b>Noxun bilan chertib</b>: noxun o‘ng qo‘l ko‘rsatkich barmog‘iga taqiladi.'},
    {s:'Nayda nechta barmoq teshigi bor?', v:['4','6','8','10'], t:1, izoh:'O‘zbek nayida <b>6</b> ta barmoq teshigi bor (uz.wikipedia).'},
    {s:'Qaysi cholg‘u qo‘sh qamish tilcha bilan chalinadi va to‘ylarda karnay bilan birga yangraydi?', v:['Nay','Surnay','Dutor','Chang'], t:1, izoh:'<b>Surnay</b> — jarangdor, o‘tkir tovushli damli cholg‘u.'},
    {s:'Doira qaysi guruhga kiradi?', v:['Torli','Damli','Zarbli','Klavishli'], t:2, izoh:'<b>Zarbli</b>: teri tortilgan gardishga barmoqlar bilan uriladi.'},
    {s:'Buxoro Shashmaqomi ijrosida yetakchi cholg‘u qaysi?', v:['Surnay','Tanbur','Chang','Nay'], t:1, izoh:'<b>Tanbur</b> — Shashmaqomning asosiy cholg‘usi (uz.wikipedia «Tanbur»).'},
    {s:'Tanburning uzunligi taxminan qancha?', v:['30–40 sm','60–70 sm','110–130 sm','2–3 m'], t:2, izoh:'<b>110–130 sm</b>: dasta juda uzun, pardalar soni 16–19.'},
    {s:'Dutor torlari hozir ko‘pincha nimadan yasaladi?', v:['Mis simdan','Neylondan','Teridan','Qamishdan'], t:1, izoh:'<b>Neylondan</b>; avval ichakdan, keyin ipakdan bo‘lgan.'},
    {tur:'3d', s:'Podiumda <b>kamon bilan</b> chalinadigan cholg‘uni bosing.', hodisa:'im-cholgu', togri:['gijjak'], v:['G‘ijjak','boshqa cholg‘u'], t:0,
     izoh:'<b>G‘ijjak</b> — torli-kamonli cholg‘u: tor kamon bilan ishqalanadi.'},
    {tur:'3d', s:'Podiumda istalgan <b>damli</b> cholg‘uni bosing.', hodisa:'im-cholgu', kalit:'guruh', togri:['damli'], v:['Nay yoki surnay','torli yoki zarbli cholg‘u'], t:0,
     izoh:'Damli cholg‘ular — <b>nay</b> va <b>surnay</b>: tovushni havo ustuni hosil qiladi.'}
  ],
  yordamchi:[
    {s:'Sahnadagi tovush haqiqiy cholg‘u tovushimi?', j:'Yo‘q. Tembrlar brauzerda sodda sintez bilan hosil qilinadi: torli — chertma tovush modeli, kamonli — uzluksiz tovush, damli — havo shovqini aralash ohang, doira — shovqin zarbi. Ular faqat guruhlar farqini eshitishga yordam beradi; haqiqiy ijroni jonli yoki ruxsatli yozuvda tinglang.', kalit:['tovush','haqiqiy','yozuv']},
    {s:'Dutor va tanbur farqi nimada?', j:'Dutorda 2 ta tor, tovushi mayin, pardalari kamroq; tanbur uzunroq (110–130 sm), 3 (ba’zan 4) metall torli, 16–19 pardali va noxun bilan chalinadi. Tanbur Shashmaqomda yetakchi cholg‘u.', kalit:['dutor','tanbur','farq']},
    {s:'Parda nima?', j:'Parda — dastaga bog‘langan ko‘ndalang chiziq (ichak, ipak yoki yog‘och/suyak). Tor pardaga bosilsa, tebranayotgan qismi qisqaradi va tovush balandlashadi.', kalit:['parda','dasta']}
  ],
  maqola:[
    {sarlavha:'Cholg‘ular qanday guruhlanadi', xatboshilar:[
      'Har qanday musiqa cholg‘usi nimanidir tebratib tovush hosil qiladi. Nima tebranishiga qarab cholg‘ular guruhlarga bo‘linadi: torli cholg‘ularda — tor, damli cholg‘ularda — cholg‘u ichidagi havo ustuni, zarbli cholg‘ularda — teri yoki qattiq jism.',
      'Torli cholg‘ular o‘z navbatida torni qanday tebratishga qarab bo‘linadi: chertib chalinadigan (dutor, tanbur, rubob), kamon bilan chalinadigan (g‘ijjak, qo‘biz, sato) va urib chalinadigan (chang). Bir xil tor turli usulda tebratilsa, tovush tembri butunlay o‘zgaradi.',
      'O‘zbek xalq cholg‘ulari ko‘pincha tut, o‘rik, yong‘oq kabi mahalliy yog‘ochlardan yasaladi. Ularning ko‘pchiligi qo‘shni xalqlar — tojik, uyg‘ur, turkman, qoraqalpoq — musiqasida ham uchraydi, shuning uchun bir cholg‘u turli hududlarda biroz farq qiladi.'
    ]},
    {sarlavha:'Torli cholg‘ular: dutor, tanbur, g‘ijjak, chang', xatboshilar:[
      'Dutor — ikki torli, uzun va ingichka dastali, noksimon kosali cholg‘u. Kosasi tut, o‘rik yoki yong‘oq yog‘ochidan yasaladi, dastasiga ipak pardalar bog‘lanadi (soni manbaga qarab 13–15 atrofida). Torlar avval ichakdan, keyin ipakdan bo‘lgan, hozir asosan neylon. Dutor mayin, yoqimli tovushi bilan ajralib turadi.',
      'Tanbur — O‘rta Osiyoning eng qadimiy cholg‘ularidan. Uning uzunligi 110–130 sm, dastasiga 16–19 parda bog‘langan. O‘zbek tanburida 3 ta metall tor bor (ayrim manbalarda 4 ta deyiladi); ohang birinchi tordan olinadi, qolgan torlar jo‘r bo‘lib yangraydi. Tanbur o‘ng qo‘l ko‘rsatkich barmog‘iga taqiladigan sim noxun bilan chalinadi va Buxoro Shashmaqomining yetakchi cholg‘usi hisoblanadi.',
      'G‘ijjak — kamonli cholg‘u: yog‘och kosasining og‘ziga teri yoki pufak tortiladi, hozirgi g‘ijjakda 3–4 tor bo‘ladi. Uning tovushi «inson ovoziga yaqin, nozik va dardli» deb ta’riflanadi. Chang — trapetsiya shaklidagi ko‘p torli (taxminan 40 tor) cholg‘u; torlarga ikki ingichka bambuk cho‘p bilan uriladi. XX asrning 1930-yillarida chang takomillashtirilib, orkestr uchun xromatik turlari yaratilgan.'
    ]},
    {sarlavha:'Damli va zarbli cholg‘ular: nay, surnay, doira', xatboshilar:[
      'Nay — ko‘ndalang ushlab chalinadigan damli cholg‘u; yog‘och, qamish, mis yoki latundan yasaladi, 6 ta barmoq teshigi bor, diapazoni taxminan ikki yarim oktava. Nayda tovushni lab va nafas bilan boshqarish katta mahorat talab qiladi.',
      'Surnay — qo‘sh qamish tilchali, 45–55 sm uzunlikdagi yog‘och cholg‘u (o‘rik, tut yoki yong‘oq). Teshiklari soni manbalarda turlicha: o‘zbekcha Vikipediyada 7 ta old va 1 ta orqa teshik deyilgan, ayrim maqolalarda 6 + 1. Surnaychi burun orqali nafas olib, lunjdagi havo zaxirasi bilan uzluksiz chaladi. Surnay karnay va doira bilan birga to‘y va sayillarda yangraydi.',
      'Doira — yog‘och gardishga teri tortilgan, ichki tomoniga metall halqalar osilgan zarbli cholg‘u; gardish diametri 400–510 mm. Barmoqlar bilan gardish chetiga urilganda jarangdor «bak», markazga urilganda past «bum» hosil bo‘ladi. Doira yakka cholg‘u sifatida ham, ansamblda ritm beruvchi sifatida ham ishlatiladi.'
    ]},
    {sarlavha:'Cholg‘ular va bugungi kun', xatboshilar:[
      'XX asrda xalq cholg‘ulari orkestrlari uchun ko‘plab cholg‘ular takomillashtirildi: ularning ovozi kuchaytirildi, pardalari xromatik tovushqatorga moslandi, prima, sekunda, alt, bas kabi oilalari yaratildi. Shu tufayli xalq cholg‘ulari orkestrida jahon klassik asarlarini ham ijro etish mumkin bo‘ldi.',
      'An’anaviy ijroda esa eski sozlash va uslublar saqlanadi. Andijon, Buxoro, Xorazm ijrochilik maktablari bir-biridan chalish usullari va bezaklari bilan farq qiladi.',
      'Sahnadagi 3D modellar protsedurali (kompyuterda kod bilan chizilgan) va soddalashtirilgan; o‘lchamlar va torlar soni ham sxematik. Tembrlar — sintez, haqiqiy cholg‘u yozuvi emas.'
    ]}
  ],
  qiziqarli:[
    '«Dutor» so‘zi forscha «du» (ikki) va «tor» (tor, sim) so‘zlaridan tuzilgan; shu mantiqda «setor» — uch tor degani.',
    'Surnaychilar burun orqali nafas olib, lunjdagi havo bilan uzluksiz chalish usulidan foydalanadi — tovush uzilmaydi.',
    'G‘ijjak nomi X asr qo‘lyozmalarida ham uchraydi; o‘shanda uning xarragi (tagligi) bodom po‘chog‘idan yasalgan (inglizcha Vikipediya «Ghijak»).',
    'Tanburda ohang asosan bitta — birinchi tordan olinadi, qolgan torlar esa jo‘r bo‘lib, doimiy yangraydi.',
    'Chang boshqa xalqlarda santur, simbal (Vengriya) yoki «hammered dulcimer» deb ataladigan cholg‘ularga qarindosh.'
  ],
  lugat:[
    ['Cholg‘u','Musiqa asbobi.'],
    ['Torli cholg‘u','Tovushi tor tebranishidan hosil bo‘ladigan cholg‘u.'],
    ['Damli cholg‘u','Tovushi havo ustuni tebranishidan hosil bo‘ladigan cholg‘u.'],
    ['Zarbli cholg‘u','Teri yoki qattiq jismga urib chalinadigan cholg‘u.'],
    ['Kosa','Torli cholg‘uning tovushni kuchaytiruvchi tanasi (rezonator).'],
    ['Dasta','Torli cholg‘uning uzun qismi; unda pardalar bo‘ladi.'],
    ['Parda','Dastaga bog‘langan ko‘ndalang chiziq; tovush balandligini belgilaydi.'],
    ['Noxun','Torni chertish uchun barmoqqa taqiladigan sim yoki plastinka.'],
    ['Kamon','Ot qili tortilgan tayoq; tor u bilan ishqalanadi.'],
    ['Qamish tilcha','Damli cholg‘udagi tebranuvchi yupqa plastinka (surnayda qo‘sh tilcha).'],
    ['Gardish','Doiraning aylana yog‘och qismi.'],
    ['Tembr','Tovushning «rangi» — bir xil balandlikdagi tovushlarni farqlash belgisi.']
  ],
  manba:MUS_DAR+'; '+MUS_CHOL+'. '+MUS_AUD+'. Manbalar farqi: tanbur torlari 3 (uz.wikipedia) yoki 4 (en.wikipedia «Tanbur»); dutor pardalari 13 (Turkman dutori, en.wikipedia) yoki taxminan 15 (uz.wikipedia); surnay teshiklari 7 + 1 yoki 6 + 1 — matnda ochiq aytilgan.',
  ishlanma:{
    sinf:'5-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D podium bilan ishlash, eshitib taqqoslash, «cholg‘uni top» o‘yini, guruhlarda jadval to‘ldirish',
    maqsad:{talimiy:'O‘zbek xalq cholg‘ularini (dutor, tanbur, g‘ijjak, chang, nay, surnay, doira) tuzilishi va tovush chiqarish usuli bo‘yicha guruhlashni o‘rgatish.',
      tarbiyaviy:'Milliy musiqa merosiga, xalq ustalari va ijrochilarga hurmatni tarbiyalash.',
      rivojlantiruvchi:'Kuzatish, taqqoslash, eshitib farqlash va tasniflash ko‘nikmalarini rivojlantirish.'},
    natijalar:['7 ta cholg‘uni nomi va ko‘rinishi bo‘yicha taniydi','Cholg‘uni torli, damli, zarbli guruhga ajratadi','Torli cholg‘ularning chertma, kamonli, zarbli turlarini farqlaydi','Tanburning Shashmaqomdagi o‘rnini aytadi'],
    jihozlar:['MAKON sahnasi «O‘zbek xalq cholg‘ulari»','Proyektor','Maktabdagi cholg‘ular (bo‘lsa: doira, dutor)','Tarqatma: guruhlash jadvali','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Tovush nimadan tug‘iladi?» — lineyka, puflangan shisha, stol ustidagi zarb tajribasi.','Tebranishni sezadi, taxmin aytadi.'],
      ['8–18','<b>Torli cholg‘ular.</b> MAKON da dutor, tanbur, g‘ijjak, changni bosib, tuzilishi va tovushini taqqoslaydi.','Jadvalga tor soni va chalish usulini yozadi.'],
      ['18–26','<b>Damli va zarbli.</b> Nay, surnay, doira; bak va bum.','Doira ritmini qarsak bilan takrorlaydi.'],
      ['26–33','<b>Guruhlash o‘yini.</b> «Cholg‘uni top» — o‘qituvchi ta’rif aytadi, o‘quvchi sahnada bosadi.','Guruhlarda musobaqalashadi.'],
      ['33–41','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va testni bajaradi.'],
      ['41–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Torli','Tor tebranadi.'],['Damli','Havo ustuni tebranadi.'],['Zarbli','Teri yoki jism uriladi.'],['Noxun','Chertish moslamasi.'],['Kamon','Torni ishqalovchi tayoq.']],
    savollar:[['Dutorda nechta tor bor?','2'],['Kamon bilan chalinadigan cholg‘u?','G‘ijjak'],['Changda tovush qanday hosil bo‘ladi?','Torlarga cho‘plar bilan urib'],['Nayda nechta barmoq teshigi bor?','6'],['Shashmaqomning yetakchi cholg‘usi?','Tanbur']],
    uy:'Darslikdagi mavzuni o‘qish; (1) 7 ta cholg‘uni «torli / damli / zarbli» jadvaliga yozing (javob: torli — dutor, tanbur, g‘ijjak, chang; damli — nay, surnay; zarbli — doira); (2) oila yoki mahallangizda qaysi xalq cholg‘usi borligini so‘rab, uning rasmini chizing; (3) «Nega g‘ijjak tovushi uzluksiz, dutorniki esa so‘nib boradi?» savoliga 2–3 gap javob yozing (javob: kamon torni to‘xtovsiz tebratadi, chertilgan tor esa bir martagina tebratiladi).',
    manba:MUS_DAR+'; '+MUS_CHOL
  }
};
DT.im_cholgu = Object.assign(DT.im_cholgu || {}, {
  dutor:{nom:'Dutor', sarlavha2:'Torli-chertma cholg‘u',
    jadval:[['Torlar','2 ta (avval ichak, keyin ipak, hozir neylon)'],['Yog‘och','tut, o‘rik, yong‘oq'],['Pardalar','ipakdan; soni taxminan 13–15 (manbaga qarab)'],['Diapazon','taxminan bir yarim oktava'],['Nomi','forscha «du» — ikki, «tor» — tor']],
    matn:'Dutor uzun ingichka dastali, noksimon kosali cholg‘u; tovushi mayin va yoqimli. XV asr atrofida shakllangan deb hisoblanadi va o‘zbek, tojik, uyg‘ur, turkman, qoraqalpoq xalqlarida keng tarqalgan. Sahnadagi tembr — chertilgan tor sintezi.',
    manba:'O‘zbekcha Vikipediya «Dutor»; Wikipedia (inglizcha) «Dutar»'},
  tanbur:{nom:'Tanbur', sarlavha2:'Torli-chertma cholg‘u · maqomlar cholg‘usi',
    jadval:[['Torlar','3 ta metall tor (ba’zi manbalarda 4 ta)'],['Pardalar','16–19 ta (ichakdan bog‘langan)'],['Uzunligi','110–130 sm'],['Chalinishi','ko‘rsatkich barmoqdagi sim noxun bilan'],['Diapazon','taxminan ikki yarim oktava']],
    matn:'Ohang asosan birinchi tordan olinadi, qolgan torlar jo‘r bo‘lib yangraydi. Tanbur Buxoro Shashmaqomining yetakchi cholg‘usi. Taniqli ijrochi — Turg‘un Alimatov (1922–2008), tanbur, dutor va sato ustasi.',
    manba:'O‘zbekcha Vikipediya «Tanbur»; Wikipedia (inglizcha) «Tanbur», «Turgun Alimatov»'},
  gijjak:{nom:'G‘ijjak', sarlavha2:'Torli-kamonli cholg‘u',
    jadval:[['Torlar','hozir 3–4 ta (kvarta va kvinta bo‘yicha sozlanadi)'],['Kosa','tut yoki yong‘oq yog‘ochidan; og‘ziga teri yoki pufak tortiladi'],['Uzunligi','taxminan 550–900 mm'],['Chalinishi','kamon bilan, vertikal ushlab']],
    matn:'Tovushi «inson ovoziga yaqin, nozik va dardli» deb ta’riflanadi; diapazoni to‘rt oktavadan ortiq. Nomi X asr qo‘lyozmalarida uchraydi. Andijon, Buxoro, Xorazm ijrochilik maktablari kamon usullari bilan farq qiladi.',
    manba:'O‘zbekcha Vikipediya «G‘ijjak»; Wikipedia (inglizcha) «Ghijak»'},
  chang:{nom:'Chang', sarlavha2:'Torli-zarbli cholg‘u',
    jadval:[['Torlar','taxminan 40 ta, ikki xarrak bilan guruhlangan'],['Shakli','trapetsiya'],['Chalinishi','ikki bambuk cho‘p bilan urib'],['Diapazon','katta oktava La-bemoldan 2-oktava Mi-bemolgacha (uz.wikipedia)']],
    matn:'O‘rta asrlarda Noqus Changiy, Mavlono Mirak Changiy Buxoriy kabi changchilar mashhur bo‘lgan. 1930-yillarda chang takomillashtirilib, orkestr uchun xromatik prima, tenor, bas turlari yaratilgan. Qarindoshlari — santur, simbal, «hammered dulcimer».',
    manba:'O‘zbekcha Vikipediya «Chang (cholg‘u asbobi)»'},
  nay:{nom:'Nay', sarlavha2:'Damli cholg‘u',
    jadval:[['Teshiklar','6 ta barmoq teshigi'],['Material','meva yog‘ochi, qamish (bambuk), mis yoki latun'],['Diapazon','taxminan ikki yarim oktava'],['Ushlanishi','ko‘ndalang (fleyta kabi)']],
    matn:'Barmoqlarni teshiklarga yarim bosish va lab holatini o‘zgartirish orqali xromatik tovushlar hosil qilinadi. Nay yakka, ansamblda va xalq cholg‘ulari orkestrida chalinadi.',
    manba:'O‘zbekcha Vikipediya «Nay»'},
  surnay:{nom:'Surnay', sarlavha2:'Damli cholg‘u · qo‘sh qamishli',
    jadval:[['Tilcha','oddiy qamishdan, ip bilan zich bog‘langan qo‘sh tilcha'],['Uzunligi','45–55 sm'],['Yog‘och','o‘rik, tut, yong‘oq'],['Teshiklar','7 ta old + 1 ta orqa (uz.wikipedia); boshqa manbalarda 6 + 1']],
    matn:'Tovushi baland va o‘tkir; Farg‘ona–Toshkent surnayi yumshoqroq, Xorazm surnayi o‘tkirroq. Surnaychi burun orqali nafas olib, lunjdagi havo bilan uzluksiz chaladi. Karnay va doira bilan to‘y, sayil va tomoshalarda yangraydi.',
    manba:'O‘zbekcha Vikipediya «Surnay»'},
  doira:{nom:'Doira', sarlavha2:'Zarbli cholg‘u',
    jadval:[['Gardish','o‘rik, yong‘oq (zarang, akatsiya); diametri 400–510 mm'],['Teri','buzoq, toy yoki echki terisi'],['Halqalar','ichki tomonida metall halqalar'],['Zarblar','«bak» — chetga, «bum» — markazga']],
    matn:'Doira ansamblda ritm va tempni boshqaradi, yakka ijroda ham chalinadi. Mil. av. II asrga oid topilmalarda doirachilar tasviri uchraydi (uz.wikipedia). XX asr ustalaridan — Usta Olim Komilov.',
    manba:'O‘zbekcha Vikipediya «Doira (cholg‘u asbobi)»'}
});

/* ---------------------------------------------------------------- 9. INTERVAL VA AKKORDLAR ---------------------------------------------------------------- */
bogla('musiqa', 'Interval va akkordlar', 'musiqa-interval', 'Sekundadan oktavagacha; major, minor, kamaytirilgan va orttirilgan uch tovushliklar — pianinoda', ['Interval va akkordlar']);
L['musiqa-interval'] = {
  fan:'musiqa', sinf:'6-sinf', qisqaNom:'Interval va akkord', nom:'Interval va akkordlar',
  qisqa:'6-sinf · yarim tonlarni sanash · uch tovushliklar',
  sahna:'im_interval',
  kor:{
    sarlavha:'Ikki tovush orasidagi masofa',
    matn:'<b>Interval</b> — ikki tovushning balandlik jihatdan bir-biridan uzoqligi. U ikki xil sanaladi: pog‘onalar soni (nomi — sekunda, tersiya, kvarta…) va yarim tonlar soni (sifati — kichik, katta, sof). Pianinoda qo‘shni ikki klavish (oq yoki qora) orasi — bitta yarim ton. Uch va undan ortiq tovushning tersiyalar bo‘yicha birga yangrashi — <b>akkord</b>. Sahnada asos notani tanlang, interval yoki akkord tugmasini bosing — klavishlar ustida yoy va yarim tonlar sanog‘i chiqadi; tovush faqat bosganingizda brauzerda sintez qilinadi.',
    punktlar:[
      '<b>Yarim ton</b> — pianinodagi eng yaqin ikki klavish orasi; <b>butun ton</b> = 2 yarim ton',
      '<b>Asosiy intervallar:</b> prima (0), sekunda (1–2), tersiya (3–4), kvarta (5), kvinta (7), seksta (8–9), septima (10–11), oktava (12) yarim ton',
      '<b>Major uch tovushlik</b> = katta tersiya + kichik tersiya (Do–Mi–Sol); <b>minor</b> = kichik tersiya + katta tersiya (La–Do–Mi)',
      '<b>Oktava</b>da yuqori tovush chastotasi pastkinikidan roppa-rosa 2 marta katta'
    ]
  },
  bolimlar:[
    {sarlavha:'Oddiy intervallar jadvali', jadval:[
      ['Sof prima','0 yarim ton · Do–Do (bir xil tovush)'],
      ['Kichik sekunda','1 · Do–Do#'],
      ['Katta sekunda','2 · Do–Re'],
      ['Kichik tersiya','3 · Do–Re# (Mi♭)'],
      ['Katta tersiya','4 · Do–Mi'],
      ['Sof kvarta','5 · Do–Fa'],
      ['Triton','6 · Do–Fa# (orttirilgan kvarta / kamaytirilgan kvinta)'],
      ['Sof kvinta','7 · Do–Sol'],
      ['Kichik seksta','8 · Do–Sol#'],
      ['Katta seksta','9 · Do–La'],
      ['Kichik septima','10 · Do–La#'],
      ['Katta septima','11 · Do–Si'],
      ['Sof oktava','12 · Do4–Do5']
    ], matn:'Sahnadagi pianinoda faqat diyez (#) nomlari ishlatiladi; Re# va Mi♭ pianinoda bitta klavish (enarmonik teng tovushlar).'},
    {sarlavha:'Uch tovushliklar (triadalar)', jadval:[
      ['Major (katta)','katta tersiya + kichik tersiya = 4 + 3 · Do–Mi–Sol · yorqin, quvnoq'],
      ['Minor (kichik)','kichik tersiya + katta tersiya = 3 + 4 · La–Do–Mi · mayin, g‘amgin'],
      ['Kamaytirilgan','kichik tersiya + kichik tersiya = 3 + 3 · Si–Re–Fa · keskin'],
      ['Orttirilgan','katta tersiya + katta tersiya = 4 + 4 · Do–Mi–Sol# · noaniq, «osilib» turadi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Yarim ton va butun ton', matn:'Pianinoda eng yaqin ikki klavish orasi yarim ton: Mi–Fa va Si–Do oq klavishlar orasida qora klavish yo‘q, shuning uchun ular orasi ham yarim ton. Do–Re orasida qora klavish bor — bu butun ton (2 yarim ton).', holat:{asos:'Do4', interval:'k2', akkord:null, rejim:'qurish'}},
    {sarlavha:'Sekunda va tersiya', matn:'Do–Re — katta sekunda (2 yarim ton), Do–Mi — katta tersiya (4), Do–Re# — kichik tersiya (3). Pog‘ona nomi bir xil (tersiya), lekin yarim tonlar soni sifatini — kichik yoki kattaligini belgilaydi.', holat:{asos:'Do4', interval:'b3', akkord:null, rejim:'qurish'}},
    {sarlavha:'Sof intervallar: kvarta, kvinta, oktava', matn:'Kvarta (5 yarim ton), kvinta (7) va oktava (12) «sof» deyiladi: ular eng uyg‘un yangraydi. Oktavada chastotalar nisbati 2 : 1, sof kvintada taxminan 3 : 2.', holat:{asos:'Do4', interval:'s5', akkord:null, rejim:'qurish'}},
    {sarlavha:'Seksta, septima va triton', matn:'Katta seksta Do–La (9), katta septima Do–Si (11). Triton — uchta butun ton (6 yarim ton): Do–Fa#. U keskin, «yechim talab qiladigan» interval sifatida eshitiladi.', holat:{asos:'Do4', interval:'triton', akkord:null, rejim:'qurish'}},
    {sarlavha:'Major uch tovushlik', matn:'Asosdan katta tersiya, uning ustiga kichik tersiya: Do–Mi–Sol. Major (katta) uch tovushlik yorqin, quvnoq yangraydi. U Do-major gammasining I pog‘onasiga qurilgan.', holat:{asos:'Do4', interval:null, akkord:'major', rejim:'akkord'}},
    {sarlavha:'Minor uch tovushlik', matn:'Avval kichik tersiya, keyin katta tersiya: La–Do–Mi. Minor uch tovushlik mayinroq, ba’zan g‘amgin eshitiladi. Major va minorning farqi — faqat o‘rtadagi tovushning bir yarim tonga siljishi.', holat:{asos:'La4', interval:null, akkord:'minor', rejim:'akkord'}},
    {sarlavha:'O‘lchab ko‘ring', matn:'«O‘lchash» rejimida ikki klavishni ketma-ket bosing — sahna yarim tonlarni sanab, interval nomini aytadi. Masalan, Re4 va Fa4 — kichik tersiya (3 yarim ton).', holat:{asos:'Re4', interval:null, akkord:null, rejim:'olchash'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Interval va akkord quring', holat:{asos:'Do4', interval:null, akkord:null, rejim:'qurish'},
    topshiriqlar:[
      {shart:'Asos <b>Do4</b> dan <b>sof kvinta</b> chaling.', hodisa:'im-interval', kod:"ev.kalit==='s5' && ev.past==='Do4'", izoh:'To‘g‘ri — <b>Do4–Sol4</b>: 7 yarim ton.'},
      {shart:'«O‘lchash» rejimida istalgan <b>kichik tersiyani</b> (3 yarim ton) toping, masalan Re4 va Fa4.', hodisa:'im-interval', kod:"ev.yarim===3", izoh:'To‘g‘ri — <b>kichik tersiya</b> = 3 yarim ton.'},
      {shart:'Istalgan <b>oktava</b> intervalini chaling yoki o‘lchang.', hodisa:'im-interval', kod:"ev.yarim===12", izoh:'To‘g‘ri — <b>oktava</b> = 12 yarim ton, chastota 2 marta ortadi.'},
      {shart:'<b>Fa4</b> asosida <b>major</b> uch tovushlik quring.', hodisa:'im-akkord', kod:"ev.akkord==='major' && ev.asos==='Fa4'", izoh:'To‘g‘ri — <b>Fa–La–Do</b>: 4 + 3 yarim ton.'},
      {shart:'<b>La4</b> asosida <b>minor</b> uch tovushlik quring.', hodisa:'im-akkord', kod:"ev.akkord==='minor' && ev.asos==='La4'", izoh:'To‘g‘ri — <b>La–Do–Mi</b>: 3 + 4 yarim ton.'}
    ]},
  test:[
    {s:'Katta tersiyada nechta yarim ton bor?', v:['3','4','5','7'], t:1, izoh:'Katta tersiya — <b>4</b> yarim ton (Do–Mi). Kichik tersiya — 3.'},
    {s:'Sof kvinta necha yarim tondan iborat?', v:['5','6','7','8'], t:2, izoh:'Sof kvinta — <b>7</b> yarim ton (Do–Sol).'},
    {s:'Do–Fa intervali qanday ataladi?', v:['Katta tersiya','Sof kvarta','Sof kvinta','Katta seksta'], t:1, izoh:'<b>Sof kvarta</b>: Do–Fa — 5 yarim ton, 4 pog‘ona.'},
    {s:'Oktava intervalida chastotalar nisbati qanday?', v:['1 : 1','3 : 2','2 : 1','4 : 3'], t:2, izoh:'<b>2 : 1</b>: masalan, La4 = 440 Hz, La5 = 880 Hz.'},
    {s:'Major uch tovushlik qanday tuziladi?', v:['Kichik tersiya + katta tersiya','Katta tersiya + kichik tersiya','Ikki kichik tersiya','Ikki katta tersiya'], t:1, izoh:'<b>Katta tersiya + kichik tersiya</b> (4 + 3), masalan Do–Mi–Sol.'},
    {s:'La-minor uch tovushligining tovushlari qaysilar?', v:['La–Do#–Mi','La–Do–Mi','La–Si–Do','La–Re–Fa'], t:1, izoh:'<b>La–Do–Mi</b>: La–Do kichik tersiya (3), Do–Mi katta tersiya (4).'},
    {s:'Do-major uch tovushligi qaysi notalardan iborat?', v:['Do–Re–Mi','Do–Mi–Sol','Do–Fa–La','Do–Mi–Sol#'], t:1, izoh:'<b>Do–Mi–Sol</b>. Do–Mi–Sol# — orttirilgan uch tovushlik.'},
    {s:'Triton necha yarim ton?', v:['5','6','7','4'], t:1, izoh:'Triton — <b>6</b> yarim ton, ya’ni uchta butun ton (Do–Fa#).'},
    {s:'Kamaytirilgan uch tovushlik qanday tuziladi?', v:['Ikki kichik tersiyadan','Ikki katta tersiyadan','Kvinta va kvartadan','Ikki sekundadan'], t:0, izoh:'<b>Ikki kichik tersiyadan</b> (3 + 3), masalan Si–Re–Fa.'},
    {s:'Mi–Fa klavishlari orasidagi interval qanday?', v:['Butun ton','Yarim ton (kichik sekunda)','Kichik tersiya','Prima'], t:1, izoh:'<b>Yarim ton (kichik sekunda)</b>: Mi va Fa orasida qora klavish yo‘q.'},
    {tur:'3d', s:'Asos <b>Do4</b>. Undan <b>katta tersiya</b> yuqoridagi klavishni bosing.', hodisa:'im-klavish', togri:['Mi4'], v:['Mi4','boshqa klavish'], t:0,
     izoh:'Do4 + 4 yarim ton = <b>Mi4</b> (Do → Do# → Re → Re# → Mi).'}
  ],
  yordamchi:[
    {s:'Kichik va katta interval farqi nimada?', j:'Nomi (sekunda, tersiya, seksta, septima) pog‘onalar sonini, «kichik» yoki «katta» esa yarim tonlar sonini bildiradi. Katta interval kichigidan bitta yarim tonga keng: kichik tersiya 3, katta tersiya 4 yarim ton.', kalit:['kichik','katta','farq']},
    {s:'Nega kvarta, kvinta, oktava «sof» deyiladi?', j:'Bu intervallarning tovushlari juda uyg‘un qo‘shiladi: chastotalar nisbati oddiy sonlarga yaqin (oktava 2 : 1, kvinta ≈ 3 : 2, kvarta ≈ 4 : 3). Ular kichik yoki katta bo‘lmaydi, faqat sof, orttirilgan yoki kamaytirilgan bo‘ladi.', kalit:['sof','kvinta','kvarta','oktava']},
    {s:'Pianinodagi tovushlar qanday hisoblangan?', j:'Zamonaviy pianino teng temperatsiyaga sozlangan: har yarim tonda chastota 2^(1/12) ≈ 1,0595 marta ortadi. Shuning uchun sof kvinta 2^(7/12) ≈ 1,498 — 3 : 2 ga juda yaqin, lekin aynan teng emas.', kalit:['chastota','temperatsiya','hisob']}
  ],
  maqola:[
    {sarlavha:'Interval nima va u qanday sanaladi', xatboshilar:[
      'Interval — ikki tovush orasidagi balandlik masofasi. Agar tovushlar ketma-ket yangrasa, bu melodik interval, bir vaqtda yangrasa — garmonik interval deyiladi. Interval ikki son bilan tavsiflanadi: pog‘onalar soni (miqdoriy qiymat) va tonlar soni (sifat qiymati).',
      'Pog‘onalar sanab, intervalga lotincha nom beriladi: prima (1-pog‘ona — bir xil tovush), sekunda (2), tersiya (3), kvarta (4), kvinta (5), seksta (6), septima (7), oktava (8). Masalan, Do–Mi: Do, Re, Mi — uch pog‘ona, demak tersiya.',
      'Keyin yarim tonlar sanaladi. Pianinoda qo‘shni ikki klavish (oq yoki qora, farqi yo‘q) orasi — bitta yarim ton. Do–Mi orasida Do#, Re, Re#, Mi — 4 yarim ton, demak bu katta tersiya. Do–Re# esa 3 yarim ton — kichik tersiya.'
    ]},
    {sarlavha:'Sof, kichik va katta intervallar', xatboshilar:[
      'Prima, kvarta, kvinta va oktava sof intervallar deyiladi: sof prima — 0, sof kvarta — 5, sof kvinta — 7, sof oktava — 12 yarim ton. Ular eng uyg‘un yangraydi va ko‘plab xalqlar musiqasida tayanch hisoblanadi.',
      'Sekunda, tersiya, seksta va septima kichik yoki katta bo‘ladi: kichik sekunda — 1, katta sekunda — 2, kichik tersiya — 3, katta tersiya — 4, kichik seksta — 8, katta seksta — 9, kichik septima — 10, katta septima — 11 yarim ton.',
      'Olti yarim tonli interval triton deyiladi (uch butun ton). Uni orttirilgan kvarta (Do–Fa#) yoki kamaytirilgan kvinta (Do–Sol♭) deb yozish mumkin. Triton keskin yangraydi va musiqada ko‘pincha barqaror tovushga «yechilishni» talab qiladi.'
    ]},
    {sarlavha:'Uch tovushliklar — akkordlar asosi', xatboshilar:[
      'Akkord — uch yoki undan ortiq tovushning tersiyalar bo‘yicha joylashib, birga yangrashi. Eng oddiy akkord — uch tovushlik (triada): asosiy tovush, tersiya tovushi va kvinta tovushi.',
      'Major uch tovushlik katta tersiya va kichik tersiyadan tuziladi (4 + 3), masalan Do–Mi–Sol yoki Fa–La–Do. U yorqin eshitiladi. Minor uch tovushlik aksincha — kichik tersiya va katta tersiyadan (3 + 4): La–Do–Mi, Re–Fa–La. Ikkalasida ham chetki tovushlar sof kvinta hosil qiladi.',
      'Kamaytirilgan uch tovushlik ikki kichik tersiyadan (Si–Re–Fa), orttirilgan uch tovushlik ikki katta tersiyadan (Do–Mi–Sol#) tuziladi. Ular barqaror emas va keyingi akkordga o‘tishni «so‘raydi». Qo‘shiqlarga jo‘r bo‘lish ko‘pincha major va minor uch tovushliklarga asoslanadi.'
    ]},
    {sarlavha:'Intervallar va fizika', xatboshilar:[
      'Har bir tovush chastotaga ega. Zamonaviy cholg‘ular teng temperatsiyaga sozlanadi: oktava 12 ta teng yarim tonga bo‘linadi va har yarim tonda chastota 2^(1/12) ≈ 1,0595 marta ortadi. La4 = 440 Hz (ISO 16 standarti) dan boshlab istalgan tovush chastotasini hisoblash mumkin.',
      'Oktavada chastota aynan 2 marta ortadi: La4 = 440 Hz, La5 = 880 Hz. Teng temperatsiyadagi sof kvinta 2^(7/12) ≈ 1,498 — tabiiy 3 : 2 = 1,5 nisbatiga juda yaqin, katta tersiya esa 2^(4/12) ≈ 1,260 — tabiiy 5 : 4 = 1,25 dan biroz yuqoriroq.',
      'O‘zbek mumtoz musiqasida, xususan maqomlarda, ayrim pardalar teng temperatsiyadan farq qiladi — tanbur va dutor pardalari an’anaviy tartibda bog‘lanadi. Pianino esa faqat teng temperatsiyadagi 12 yarim tonni chala oladi.'
    ]}
  ],
  formulalar:[
    ['f₂ = f₁ · 2^(n/12)','n yarim ton yuqoridagi tovush chastotasi (teng temperatsiya)'],
    ['f(Mi4) = 261,63 · 2^(4/12) ≈ 329,63 Hz','Do4 dan katta tersiya'],
    ['f(Sol4) = 261,63 · 2^(7/12) ≈ 392,00 Hz','Do4 dan sof kvinta'],
    ['f(oktava) = 2 · f','Oktava: chastota 2 marta'],
    ['Major = 4 + 3;  Minor = 3 + 4','Uch tovushliklar yarim tonlarda'],
    ['Kamaytirilgan = 3 + 3;  Orttirilgan = 4 + 4','Barqaror bo‘lmagan uch tovushliklar']
  ],
  qiziqarli:[
    'Triton o‘rta asrlarda «musiqadagi shayton» (lotincha diabolus in musica) laqabini olgan — uni ishlatishdan qochishgan (bu laqab haqidagi hikoya keyingi davrlar talqini ekanini ham olimlar ta’kidlaydi).',
    'Teng temperatsiyada faqat oktava «toza» tabiiy nisbatga (2 : 1) teng; qolgan intervallar biroz yaqinlashtirilgan.',
    'Major va minor uch tovushliklarining farqi faqat bitta — o‘rtadagi tovushda: Do–Mi–Sol va Do–Re#–Sol.',
    'Pianinoning 88 klavishi 7 oktavadan ortiqni qamraydi — eng pastki La0 ≈ 27,5 Hz, eng yuqori Do8 ≈ 4186 Hz.',
    'Sof kvinta ko‘plab cholg‘ularni sozlashda ishlatiladi: skripka torlari Sol–Re–La–Mi bir-biridan sof kvinta masofada.'
  ],
  lugat:[
    ['Interval','Ikki tovush orasidagi balandlik masofasi.'],
    ['Melodik interval','Tovushlari ketma-ket yangraydigan interval.'],
    ['Garmonik interval','Tovushlari bir vaqtda yangraydigan interval.'],
    ['Yarim ton','Pianinodagi eng yaqin ikki klavish orasi.'],
    ['Butun ton','Ikki yarim ton.'],
    ['Prima','0 yarim ton — bir xil tovush.'],
    ['Tersiya','3-pog‘ona intervali: kichik (3) yoki katta (4 yarim ton).'],
    ['Kvinta','5-pog‘ona intervali; sof kvinta — 7 yarim ton.'],
    ['Oktava','8-pog‘ona intervali — 12 yarim ton, chastota 2 marta.'],
    ['Triton','6 yarim tonli interval (uch butun ton).'],
    ['Akkord','Uch va undan ortiq tovushning tersiyalar bo‘yicha birga yangrashi.'],
    ['Uch tovushlik (triada)','Asos, tersiya va kvinta tovushlaridan iborat akkord.'],
    ['Teng temperatsiya','Oktavani 12 ta teng yarim tonga bo‘lish tizimi.']
  ],
  manba:MUS_DAR+'; Wikipedia (inglizcha): «Interval (music)», «Triad (music)», «Equal temperament», «Tritone» (en.wikipedia.org); ISO 16:1975 (La4 = 440 Hz). '+MUS_AUD+'. Klavish kartalari — MAKON «Notalar» darsidagi nota kartalari.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D pianino, yarim tonlarni sanash, eshitib farqlash, «major yoki minor?» o‘yini',
    maqsad:{talimiy:'Interval tushunchasi, uning pog‘ona va yarim tonlar bo‘yicha nomlanishi, major, minor, kamaytirilgan va orttirilgan uch tovushliklar tuzilishini o‘rgatish.',
      tarbiyaviy:'Musiqani diqqat bilan tinglash madaniyatini, jamoada kuylash ko‘nikmasini tarbiyalash.',
      rivojlantiruvchi:'Musiqiy eshitish, sanash va mantiqiy tahlil ko‘nikmalarini rivojlantirish.'},
    natijalar:['Pianinoda yarim ton va butun tonni ko‘rsatadi','Berilgan tovushdan tersiya, kvarta, kvinta, oktavani quradi','Major va minor uch tovushlikni tuzadi va eshitib farqlaydi','Oktavada chastota 2 marta ortishini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Interval va akkordlar» (pianino)','Proyektor','Pianino yoki sintezator (bo‘lsa)','Klaviatura rasmi tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Ikki tovushni ketma-ket va birga chalib: «Qaysi biri yoqimliroq?»','Taqqoslab javob beradi.'],
      ['8–18','<b>Yarim ton, butun ton, intervallar.</b> MAKON da Do4 dan sekunda, tersiya, kvarta, kvinta, oktava.','Tarqatmada yarim tonlarni sanaydi.'],
      ['18–26','<b>Sof, kichik, katta.</b> Jadval, triton.','«O‘lchash» rejimida juftlikda intervallar topadi.'],
      ['26–34','<b>Uch tovushliklar.</b> Major, minor; kamaytirilgan va orttirilgan.','«Major yoki minor?» o‘yini — eshitib qo‘l ko‘taradi.'],
      ['34–41','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va testni bajaradi.'],
      ['41–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Interval','Ikki tovush masofasi.'],['Yarim ton','Qo‘shni klavishlar orasi.'],['Tersiya','3 yoki 4 yarim ton.'],['Kvinta','7 yarim ton (sof).'],['Uch tovushlik','Asos + tersiya + kvinta.']],
    savollar:[['Do–Sol qanday interval?','Sof kvinta (7 yarim ton)'],['Kichik tersiya necha yarim ton?','3'],['Minor uch tovushlik tuzilishi?','Kichik tersiya + katta tersiya'],['Re-major uch tovushlik notalari?','Re–Fa#–La'],['La4 = 440 Hz bo‘lsa, La5 = ?','880 Hz']],
    uy:'Darslikdagi mavzuni o‘qish; (1) Sol asosida major va minor uch tovushlik yozing (javob: Sol–Si–Re va Sol–La#–Re, ya’ni Sol–Si♭–Re); (2) Mi–Sol, Fa–Si, Re–La intervallarini aniqlang (javob: kichik tersiya — 3; triton — 6; sof kvinta — 7); (3) Do4 = 261,63 Hz bo‘lsa, Do5 chastotasini toping (javob: 523,26 Hz ≈ 523,25 Hz).',
    manba:MUS_DAR+'; Wikipedia «Interval (music)», «Triad (music)»'
  }
};
const MUS_IV = (nom, yarim, misol, matn)=>({nom, sarlavha2:'Interval · '+yarim+' yarim ton', jadval:[['Yarim tonlar',String(yarim)],['Misol (Do4 dan)',misol],['Chastota nisbati (teng temperatsiya)','2^('+yarim+'/12) ≈ '+Math.pow(2, yarim/12).toFixed(3).replace('.', ',')]], matn, manba:'Wikipedia (inglizcha) «Interval (music)»; '+MUS_DAR});
const MUS_AK = (nom, tuz, misol, matn)=>({nom, sarlavha2:'Uch tovushlik (triada)', jadval:[['Tuzilishi',tuz],['Misol',misol],['Chetki tovushlar',nom === 'Orttirilgan uch tovushlik' ? 'orttirilgan kvinta (8 yarim ton)' : nom === 'Kamaytirilgan uch tovushlik' ? 'kamaytirilgan kvinta (6 yarim ton)' : 'sof kvinta (7 yarim ton)']], matn, manba:'Wikipedia (inglizcha) «Triad (music)»; '+MUS_DAR});
DT.im_interval = Object.assign(DT.im_interval || {}, {
  prima:MUS_IV('Sof prima', 0, 'Do4–Do4', 'Ikki cholg‘u yoki ovoz bir xil tovushni chalishi (unison). Pog‘ona bir, yarim ton nol.'),
  k2:MUS_IV('Kichik sekunda', 1, 'Do4–Do#4', 'Eng kichik interval — bitta yarim ton. Mi–Fa va Si–Do oq klavishlar orasida ham kichik sekunda.'),
  b2:MUS_IV('Katta sekunda', 2, 'Do4–Re4', 'Butun ton. Gammadagi qadamlarning ko‘pchiligi katta sekunda.'),
  k3:MUS_IV('Kichik tersiya', 3, 'Do4–Re#4 (Mi♭4)', 'Minor uch tovushlikning pastki intervali; mayin, biroz g‘amgin rang beradi.'),
  b3:MUS_IV('Katta tersiya', 4, 'Do4–Mi4', 'Major uch tovushlikning pastki intervali; yorqin rang beradi. Teng temperatsiyada 1,260, tabiiy nisbat 5 : 4 = 1,25.'),
  s4:MUS_IV('Sof kvarta', 5, 'Do4–Fa4', 'Uyg‘un interval; tabiiy nisbat 4 : 3. Ko‘plab qo‘shiqlar kvarta sakrashi bilan boshlanadi.'),
  triton:MUS_IV('Triton', 6, 'Do4–Fa#4', 'Uchta butun ton; orttirilgan kvarta yoki kamaytirilgan kvinta. Keskin yangraydi va yechimni talab qiladi.'),
  s5:MUS_IV('Sof kvinta', 7, 'Do4–Sol4', 'Oktavadan keyingi eng uyg‘un interval; tabiiy nisbat 3 : 2. Skripka torlari kvinta bo‘yicha sozlanadi.'),
  k6:MUS_IV('Kichik seksta', 8, 'Do4–Sol#4 (La♭4)', 'Katta tersiyaning aylanmasi: katta tersiya + kichik seksta = oktava (4 + 8 = 12).'),
  b6:MUS_IV('Katta seksta', 9, 'Do4–La4', 'Kichik tersiyaning aylanmasi (3 + 9 = 12). Yumshoq, kuychan interval.'),
  k7:MUS_IV('Kichik septima', 10, 'Do4–La#4 (Si♭4)', 'Dominantsept akkordining chetki intervali; oktavaga «intiladi».'),
  b7:MUS_IV('Katta septima', 11, 'Do4–Si4', 'Oktavadan bitta yarim ton kam; keskin eshitiladi.'),
  oktava:MUS_IV('Sof oktava', 12, 'Do4–Do5', 'Chastota aynan 2 marta ortadi; ikki tovush bir xil nomga ega. La4 = 440 Hz, La5 = 880 Hz.'),
  major:MUS_AK('Major uch tovushlik', 'katta tersiya + kichik tersiya (4 + 3)', 'Do–Mi–Sol, Fa–La–Do, Sol–Si–Re', 'Yorqin, quvnoq yangraydi. Major gammaning I, IV, V pog‘onalarida quriladi.'),
  minor:MUS_AK('Minor uch tovushlik', 'kichik tersiya + katta tersiya (3 + 4)', 'La–Do–Mi, Re–Fa–La, Mi–Sol–Si', 'Mayin, ba’zan g‘amgin yangraydi. Majordan farqi — o‘rtadagi tovush yarim ton pastroq.'),
  kamaytirilgan:MUS_AK('Kamaytirilgan uch tovushlik', 'kichik tersiya + kichik tersiya (3 + 3)', 'Si–Re–Fa', 'Keskin, barqaror emas; Do-major gammasining VII pog‘onasida hosil bo‘ladi.'),
  orttirilgan:MUS_AK('Orttirilgan uch tovushlik', 'katta tersiya + katta tersiya (4 + 4)', 'Do–Mi–Sol#', 'Noaniq, «osilib turgan» tovush; oktavani uchta teng qismga bo‘ladi (4 + 4 + 4 = 12).')
});

/* ---------------------------------------------------------------- 10. TOVUSH ---------------------------------------------------------------- */
bogla('musiqa', 'Tovush: to‘lqin, balandlik, kuch, tembr', 'musiqa-tovush', 'Chastota, amplituda, garmonikalar — karnay, havo zarralari va ossillograf');
L['musiqa-tovush'] = {
  fan:'musiqa', sinf:'6-sinf', qisqaNom:'Tovush xossalari', nom:'Tovush: to‘lqin, balandlik, kuch, tembr',
  qisqa:'6-sinf · chastota, amplituda, garmonikalar · ossillograf',
  sahna:'im_tovush',
  kor:{
    sarlavha:'Tovush — havo orqali yuguruvchi tebranish',
    matn:'Karnay diffuzori oldinga-orqaga tebranib, havoni goh siqadi, goh siyraklashtiradi — bu siqilishlar havo bo‘ylab to‘lqin bo‘lib tarqaladi va qulog‘imizga yetadi. Musiqiy tovushning to‘rt xossasi bor: <b>balandlik</b> (chastota), <b>kuch</b> (amplituda), <b>davomiylik</b> va <b>tembr</b> (garmonikalar tarkibi). Slayderlarni suring: ossillografdagi to‘lqin va havo zarralari o‘zgaradi. Tovush faqat «▶ Eshitish» bosilganda brauzerda sintez qilinadi.',
    punktlar:[
      '<b>Chastota</b> (Hz) — bir soniyadagi tebranishlar soni; qancha katta bo‘lsa, tovush shuncha <b>baland (ingichka)</b>',
      '<b>Amplituda</b> — tebranish kengligi; qancha katta bo‘lsa, tovush shuncha <b>kuchli (qattiq)</b>',
      '<b>Tembr</b> — asosiy tovushga qo‘shilgan garmonikalar (obertonlar) to‘plami: nay, klarnet, skripka shu bilan farqlanadi',
      'Havoda (20 °C) tovush tezligi ≈ 343 m/s; inson taxminan 20 Hz dan 20 000 Hz gacha eshitadi (yosh o‘tgan sari yuqori chegara pasayadi)'
    ]
  },
  bolimlar:[
    {sarlavha:'Tovushning to‘rt xossasi', jadval:[
      ['Balandlik','chastotaga bog‘liq · o‘lchov birligi — gers (Hz) · La4 = 440 Hz'],
      ['Kuch (qattiqlik)','amplitudaga bog‘liq · odatda desibel (dB) bilan ifodalanadi'],
      ['Davomiylik','tebranish qancha vaqt davom etishi · notada davomiylik belgisi'],
      ['Tembr','garmonikalar tarkibi · tovushning «rangi»']
    ]},
    {sarlavha:'Chastota, davr va to‘lqin uzunligi (havoda, 343 m/s)', jadval:[
      ['110 Hz (La2)','T ≈ 9,09 ms · λ ≈ 3,12 m'],
      ['220 Hz (La3)','T ≈ 4,55 ms · λ ≈ 1,56 m'],
      ['440 Hz (La4)','T ≈ 2,27 ms · λ ≈ 0,78 m'],
      ['880 Hz (La5)','T ≈ 1,14 ms · λ ≈ 0,39 m'],
      ['1760 Hz (La6)','T ≈ 0,57 ms · λ ≈ 0,19 m']
    ], matn:'Chastota ikki marta ortsa (bir oktava yuqori), davr va to‘lqin uzunligi ikki marta kamayadi.'}
  ],
  bosqichlar:[
    {sarlavha:'Tovush manbasi — tebranayotgan jism', matn:'Har qanday tovush tebranishdan tug‘iladi: tor, qamish tilcha, doira terisi yoki karnay diffuzori. Sahnadagi karnay diffuzori tebranib, oldidagi havo zarralarini surmoqda.', holat:{f:220, A:0.6, tembr:'sinus'}},
    {sarlavha:'Bo‘ylama to‘lqin', matn:'Havo zarralari joyidan uzoq ketmaydi — ular faqat oldinga-orqaga tebranadi. Zarralar zichlashgan (siqilish) va siyraklashgan joylar navbatma-navbat tarqaladi. Tebranish yo‘nalishi to‘lqin yo‘nalishi bilan bir xil — bu bo‘ylama to‘lqin. Vakuumda zarralar yo‘q, shuning uchun tovush tarqalmaydi.', holat:{f:110, A:0.8, tembr:'sinus'}},
    {sarlavha:'Balandlik — chastota', matn:'Chastotani oshiring: ossillografda to‘lqinlar zichlashadi, tovush ingichkalashadi. 440 Hz — La4, orkestr sozlanadigan nota. Chastota 2 marta ortsa — tovush bir oktava yuqorilaydi.', holat:{f:440, A:0.6, tembr:'sinus'}},
    {sarlavha:'Kuch — amplituda', matn:'Amplitudani kamaytiring: to‘lqin pastroq bo‘ladi, havo zarralari kamroq siqiladi, tovush sokinlashadi. Balandlik (chastota) esa o‘zgarmaydi — «baland» va «qattiq» turli tushunchalar.', holat:{f:440, A:0.25, tembr:'sinus'}},
    {sarlavha:'Tembr — garmonikalar', matn:'Bir xil 440 Hz notani nay, klarnet va skripka turlicha chaladi. Sababi — asosiy tovushga qo‘shilgan garmonikalar (2f, 3f, 4f…). Nayda ular kam, klarnetda asosan toq garmonikalar, skripkada esa hammasi bor — to‘lqin shakli arraga o‘xshaydi.', holat:{f:440, A:0.6, tembr:'skripka'}},
    {sarlavha:'Klarnet: toq garmonikalar', matn:'Klarnet tembrida asosan 1-, 3-, 5-, 7-garmonikalar bor — to‘lqin shakli to‘rtburchakka yaqinlashadi va tovush «bo‘g‘iq-yog‘och» rangini oladi. Ossillografda shakllarni taqqoslang.', holat:{f:220, A:0.6, tembr:'klarnet'}},
    {sarlavha:'Mikrofon — tovushni elektr signalga', matn:'Mikrofon membranasi tovush to‘lqinida tebranadi va uni elektr kuchlanishiga aylantiradi. Ossillograf shu kuchlanishni vaqt bo‘yicha chizadi — biz ekranda ko‘rgan to‘lqin aslida shunday olinadi.', holat:{f:330, A:0.5, tembr:'nay'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Tovushni sozlang', holat:{f:220, A:0.5, tembr:'sinus'},
    topshiriqlar:[
      {shart:'Chastotani orkestr sozlanadigan <b>La4</b> ga qo‘ying (430–450 Hz).', hodisa:'im-tovush', kod:"ev.f>=430 && ev.f<=450", izoh:'To‘g‘ri — <b>La4 = 440 Hz</b> (ISO 16 standarti).'},
      {shart:'Tovushni <b>sokinroq</b> qiling: amplitudani 30 % dan kam qiling.', hodisa:'im-tovush', kod:"ev.A<0.3", izoh:'To‘g‘ri — <b>amplituda</b> kamaysa, tovush kuchi kamayadi, balandligi esa o‘zgarmaydi.'},
      {shart:'Asosan <b>toq garmonikalar</b>dan iborat tembrni tanlang.', hodisa:'im-tovush', kod:"ev.tembr==='klarnet'", izoh:'To‘g‘ri — <b>klarnet</b>: 1-, 3-, 5-, 7-garmonikalar.'},
      {shart:'To‘lqin uzunligi <b>0,4 m dan qisqa</b> bo‘lsin (chastotani oshiring).', hodisa:'im-tovush', kod:"ev.lambda<0.4", izoh:'To‘g‘ri — λ = 343 / f: masalan, 880 Hz da ≈ <b>0,39 m</b>.'},
      {shart:'Tovush <b>manbasini</b> — tebranayotgan jismni bosing.', hodisa:'im-tovush-obyekt', kod:"ev.nom==='karnay'", izoh:'To‘g‘ri — <b>karnay</b> diffuzori tebranib, havoda to‘lqin hosil qiladi.'}
    ]},
  test:[
    {s:'Tovush balandligi nimaga bog‘liq?', v:['Amplitudaga','Chastotaga','Tembrga','Davomiylikka'], t:1, izoh:'<b>Chastotaga</b>: chastota qancha katta bo‘lsa, tovush shuncha baland (ingichka).'},
    {s:'Tovush kuchi (qattiqligi) nimaga bog‘liq?', v:['Chastotaga','Tebranish amplitudasiga','To‘lqin tezligiga','Garmonikalar soniga'], t:1, izoh:'<b>Tebranish amplitudasiga</b>: amplituda katta — tovush kuchli.'},
    {s:'Chastota qanday birlikda o‘lchanadi?', v:['Desibel (dB)','Gers (Hz)','Metr (m)','Soniya (s)'], t:1, izoh:'<b>Gers (Hz)</b> — bir soniyadagi tebranishlar soni.'},
    {s:'Havoda tovush qanday to‘lqin sifatida tarqaladi?', v:['Ko‘ndalang','Bo‘ylama','Elektromagnit','Tarqalmaydi'], t:1, izoh:'<b>Bo‘ylama</b>: zarralar to‘lqin yo‘nalishi bo‘ylab tebranadi — siqilish va siyraklanish.'},
    {s:'Nega vakuumda tovush eshitilmaydi?', v:['U yerda juda sovuq','Tebranishni uzatuvchi zarralar yo‘q','Yorug‘lik to‘sadi','Chastota nolga teng'], t:1, izoh:'<b>Tebranishni uzatuvchi zarralar yo‘q</b> — tovush mexanik to‘lqin, unga muhit kerak.'},
    {s:'20 °C havoda tovush tezligi taxminan qancha?', v:['34 m/s','343 m/s','3430 m/s','300 000 km/s'], t:1, izoh:'Taxminan <b>343 m/s</b>. 300 000 km/s — yorug‘lik tezligi.'},
    {s:'Chastotasi 343 Hz bo‘lgan tovushning havodagi to‘lqin uzunligi qancha?', v:['0,5 m','1 m','2 m','343 m'], t:1, izoh:'λ = v / f = 343 / 343 = <b>1 m</b>.'},
    {s:'Bir xil balandlikdagi nay va skripka tovushlarini nima bilan farqlaymiz?', v:['Chastota bilan','Tembr bilan','Tezlik bilan','Hech farqlab bo‘lmaydi'], t:1, izoh:'<b>Tembr bilan</b> — garmonikalar tarkibi har cholg‘uda boshqacha.'},
    {s:'Inson qulog‘i taxminan qaysi chastotalarni eshitadi?', v:['2–200 Hz','20–20 000 Hz','200–200 000 Hz','1–1000 Hz'], t:1, izoh:'Taxminan <b>20–20 000 Hz</b>; yosh o‘tishi bilan yuqori chegara pasayadi.'},
    {s:'Chastota 2 marta oshsa, tovush qanday o‘zgaradi?', v:['Ikki marta qattiqlashadi','Bir oktava yuqorilaydi','Tembri o‘zgaradi','O‘zgarmaydi'], t:1, izoh:'<b>Bir oktava yuqorilaydi</b>: masalan, 440 Hz → 880 Hz (La4 → La5).'},
    {tur:'3d', s:'Sahnada <b>tovush manbasini</b> — tebranayotgan jismni bosing.', hodisa:'im-tovush-obyekt', togri:['karnay'], v:['Karnay (diffuzor)','boshqa obyekt'], t:0,
     izoh:'<b>Karnay</b> diffuzori tebranib, havo zarralarini siqadi va siyraklashtiradi — tovush to‘lqini tug‘iladi.'}
  ],
  yordamchi:[
    {s:'«Baland tovush» va «qattiq tovush» bir xilmi?', j:'Musiqada yo‘q. Balandlik — chastota (ingichka yoki yo‘g‘on tovush), kuch — amplituda (qattiq yoki sokin). Kundalik nutqda «ovozni baland qil» deyilganda kuch nazarda tutiladi — bu farqni esda tuting.', kalit:['baland','qattiq','farq']},
    {s:'Garmonika nima?', j:'Tor yoki havo ustuni bir vaqtning o‘zida asosiy chastota f da va uning karralilarida (2f, 3f, 4f…) ham tebranadi. Bu qo‘shimcha tebranishlar garmonikalar (obertonlar) deyiladi; ularning kuchi tembrni belgilaydi.', kalit:['garmonika','oberton','tembr']},
    {s:'Ossillografdagi to‘lqin qayerdan olinadi?', j:'Mikrofon tovush bosimini elektr kuchlanishiga aylantiradi, ossillograf kuchlanishni vaqt bo‘yicha chizadi. MAKON sahnasidagi grafik esa tanlangan chastota, amplituda va garmonikalardan hisoblab chiziladi (soddalashtirilgan model).', kalit:['ossillograf','mikrofon','grafik']}
  ],
  maqola:[
    {sarlavha:'Tovush qanday hosil bo‘ladi va tarqaladi', xatboshilar:[
      'Tovush — muhit (havo, suv, qattiq jism) zarralarining tebranishi tarqalishi, ya’ni mexanik to‘lqin. Har qanday tovush manbasi — tebranayotgan jism: tor, qamish tilcha, ovoz boylamlari, doira terisi yoki karnay diffuzori.',
      'Diffuzor oldinga harakat qilganda oldidagi havoni siqadi, orqaga qaytganda siyraklashtiradi. Siqilish va siyraklanishlar navbatma-navbat havo bo‘ylab tarqaladi. Havo zarralari esa uzoqqa ketmaydi — faqat o‘z joyi atrofida tebranadi. Tebranish yo‘nalishi tarqalish yo‘nalishiga mos bo‘lgani uchun bunday to‘lqin bo‘ylama to‘lqin deyiladi.',
      'Tovush tezligi muhitga bog‘liq: 20 °C havoda taxminan 343 m/s, suvda qariyb 1500 m/s, po‘latda undan ham tez. Vakuumda zarralar yo‘q — shuning uchun koinotda tovush tarqalmaydi.'
    ]},
    {sarlavha:'Balandlik va kuch', xatboshilar:[
      'Tovush balandligi tebranish chastotasiga bog‘liq. Chastota — bir soniyadagi to‘liq tebranishlar soni, o‘lchov birligi gers (Hz), nemis fizigi Genrix Gers sharafiga. Chastota qancha katta bo‘lsa, tovush shuncha ingichka (baland). Orkestr La4 = 440 Hz notasiga sozlanadi (ISO 16 standarti).',
      'Bir tebranish davom etadigan vaqt — davr: T = 1 / f. To‘lqin bir davrda o‘tadigan masofa — to‘lqin uzunligi: λ = v / f. Masalan, 440 Hz tovush uchun T ≈ 2,27 ms, havoda λ ≈ 0,78 m.',
      'Tovush kuchi tebranish amplitudasiga — zarralarning muvozanat holatidan eng katta og‘ishiga bog‘liq. Amplituda qancha katta bo‘lsa, tovush shuncha qattiq. Tovush darajasi odatda desibelda (dB) ifodalanadi; juda qattiq tovush eshitish a’zosiga zarar yetkazadi, shuning uchun quloqchinlarda ovozni haddan tashqari baland qo‘ymaslik kerak.'
    ]},
    {sarlavha:'Tembr va garmonikalar', xatboshilar:[
      'Bir xil balandlik va kuchdagi tovushlarni ham ajrata olamiz: nay, klarnet va skripka La4 ni turlicha chaladi. Bu farq tembr deyiladi. Tembr tovush tarkibidagi garmonikalarga bog‘liq.',
      'Tor yoki havo ustuni faqat asosiy chastota f da emas, balki 2f, 3f, 4f… chastotalarda ham bir vaqtda tebranadi. Bu qo‘shimcha tebranishlar garmonikalar (obertonlar) deyiladi. Nayda yuqori garmonikalar kuchsiz — tovush toza, sinusga yaqin. Klarnetda asosan toq garmonikalar (f, 3f, 5f…) kuchli. Skripkada garmonikalar ko‘p — to‘lqin shakli arraga o‘xshaydi.',
      'Sahnadagi to‘rt tembr soddalashtirilgan model: sinus — faqat asosiy garmonika; «nay» — kuchsiz 2–4-garmonikalar; «klarnet» — toq garmonikalar; «skripka» — arra shakli (garmonika kuchi 1/n). Haqiqiy cholg‘ularda garmonikalar notaga, ijro usuliga va vaqt o‘tishiga qarab o‘zgaradi.'
    ]}
  ],
  formulalar:[
    ['f = 1 / T','Chastota va davr (f — Hz, T — s)'],
    ['λ = v / f','To‘lqin uzunligi; havoda (20 °C) v ≈ 343 m/s'],
    ['440 Hz → T ≈ 2,27 ms, λ ≈ 0,78 m','La4 uchun hisob'],
    ['f(n) = 440 · 2^(n/12)','La4 dan n yarim ton yuqoridagi nota chastotasi (teng temperatsiya)'],
    ['fₖ = k · f₁ (k = 1, 2, 3 …)','Garmonikalar chastotalari']
  ],
  qiziqarli:[
    'Kosmosda portlash ovozi eshitilmaydi — fantastik filmlardagi gumburlashlar faqat tomoshabin uchun qo‘shiladi.',
    'Momaqaldiroqgacha bo‘lgan masofani hisoblash mumkin: chaqmoqdan keyin necha soniyada guldurak eshitilsa, uni 343 ga ko‘paytiring — metrdagi masofa chiqadi (3 soniya ≈ 1 km).',
    'Gers birligi nemis fizigi Genrix Gers (1857–1894) sharafiga nomlangan.',
    'Suvda tovush havodagidan qariyb 4 marta tez tarqaladi — kitlar juda uzoq masofadan «gaplasha» oladi.',
    'Yosh ulg‘aygan sari eshitishning yuqori chegarasi pasayadi: bolalar eshitadigan juda ingichka tovushni ko‘pincha kattalar eshitmaydi.'
  ],
  lugat:[
    ['Tovush','Muhitda tarqaluvchi mexanik tebranish (to‘lqin).'],
    ['Chastota','Bir soniyadagi tebranishlar soni, Hz.'],
    ['Davr','Bitta tebranish vaqti: T = 1 / f.'],
    ['Amplituda','Tebranishning eng katta og‘ishi; tovush kuchini belgilaydi.'],
    ['To‘lqin uzunligi','To‘lqin bir davrda o‘tadigan masofa: λ = v / f.'],
    ['Bo‘ylama to‘lqin','Zarralar tarqalish yo‘nalishi bo‘ylab tebranadigan to‘lqin.'],
    ['Siqilish','Havo zarralari zichlashgan joy.'],
    ['Siyraklanish','Havo zarralari siyraklashgan joy.'],
    ['Tembr','Tovushning «rangi»; garmonikalar tarkibiga bog‘liq.'],
    ['Garmonika (oberton)','Asosiy chastotaga karrali qo‘shimcha tebranish.'],
    ['Desibel (dB)','Tovush darajasini ifodalovchi birlik.'],
    ['Ossillograf','Elektr signalni vaqt bo‘yicha chizuvchi asbob.'],
    ['Mikrofon','Tovushni elektr signalga aylantiruvchi qurilma.']
  ],
  manba:MUS_DAR+'; 6–7-sinf «Fizika» darsliklari (tovush mavzusi); Wikipedia (inglizcha): «Sound», «Speed of sound», «Hearing range», «Timbre», «Harmonic», «Hertz» (en.wikipedia.org); ISO 16:1975 (La4 = 440 Hz). '+MUS_AUD+'. Eshitish chegaralari (20 Hz – 20 kHz) taxminiy va yoshga bog‘liq; tembr garmonikalari sxematik model.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (fanlararo: musiqa va fizika)', usul:'3D ossillograf va karnay, slayderlar bilan tajriba, eshitib taqqoslash, juftlikda hisoblash',
    maqsad:{talimiy:'Tovushning tabiati, bo‘ylama to‘lqin, tovushning balandlik, kuch, davomiylik va tembr xossalari hamda ularning chastota, amplituda va garmonikalar bilan bog‘liqligini o‘rgatish.',
      tarbiyaviy:'Eshitish a’zosini asrash (baland tovushdan saqlanish) madaniyatini, ilmiy dunyoqarashni tarbiyalash.',
      rivojlantiruvchi:'Kuzatish, grafik o‘qish, formulalar bilan hisoblash va eshitib tahlil qilish ko‘nikmalarini rivojlantirish.'},
    natijalar:['Tovush tebranishdan hosil bo‘lishini va bo‘ylama to‘lqin ekanini tushuntiradi','Balandlikni chastota, kuchni amplituda bilan bog‘laydi','Tembrni garmonikalar orqali izohlaydi','T = 1/f va λ = v/f formulalari bilan hisoblaydi'],
    jihozlar:['MAKON sahnasi «Tovush» (karnay, ossillograf)','Proyektor, karnaylar','Kamerton yoki lineyka (bo‘lsa)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Lineykani stol chetida tebratish: qisqa qism — ingichka, uzun qism — yo‘g‘on tovush.','Tajribani kuzatadi, xulosa aytadi.'],
      ['8–16','<b>Tovush tabiati.</b> MAKON da karnay va havo zarralari; bo‘ylama to‘lqin; vakuum.','Siqilish va siyraklanishni sahnada ko‘rsatadi.'],
      ['16–24','<b>Balandlik va kuch.</b> Chastota va amplituda slayderlari; La4 = 440 Hz.','Ossillografdagi o‘zgarishni daftarga chizadi.'],
      ['24–31','<b>Tembr.</b> Sinus, nay, klarnet, skripka; garmonikalar.','Eshitib tembrlarni farqlaydi.'],
      ['31–41','<b>Hisoblash va mustahkamlash.</b> T = 1/f, λ = v/f; MAKON amaliyoti va test.','Juftlikda hisoblaydi, amaliyot va testni bajaradi.'],
      ['41–45','<b>Yakun, uyga vazifa.</b> Quloqni asrash qoidalari.','Yozib oladi.']],
    lugat:[['Chastota','Tebranishlar soni, Hz.'],['Amplituda','Tebranish kengligi.'],['Tembr','Tovush rangi.'],['Garmonika','Karrali qo‘shimcha tebranish.'],['To‘lqin uzunligi','λ = v / f.']],
    savollar:[['Balandlik nimaga bog‘liq?','Chastotaga'],['Kuch nimaga bog‘liq?','Amplitudaga'],['220 Hz tovush davri?','≈ 4,55 ms'],['686 Hz tovushning havodagi to‘lqin uzunligi?','343 / 686 = 0,5 m'],['Nay va skripka nimasi bilan farqlanadi?','Tembri (garmonikalari) bilan']],
    uy:'Darslikdagi mavzuni o‘qish; (1) 110, 440 va 1000 Hz tovushlar uchun davr va to‘lqin uzunligini hisoblang (javob: 9,09 ms va 3,12 m; 2,27 ms va 0,78 m; 1 ms va 0,343 m); (2) chaqmoqdan 6 soniyadan keyin guldurak eshitildi — masofa qancha? (javob: 6 × 343 ≈ 2058 m ≈ 2 km); (3) uyda 3 ta turli tovush manbasini topib, har birida nima tebranishini yozing.',
    manba:MUS_DAR+'; Wikipedia «Sound», «Speed of sound», «Timbre»'
  }
};
DT.im_tovush = Object.assign(DT.im_tovush || {}, {
  karnay:{nom:'Karnay (dinamik)', sarlavha2:'Tovush manbasi',
    jadval:[['Vazifasi','elektr signalni tovushga aylantiradi'],['Asosiy qismi','diffuzor (konus) va g‘altak–magnit'],['Ishlashi','g‘altakdagi tok o‘zgarsa, diffuzor oldinga-orqaga tebranadi'],['Sahnada','diffuzor tanlangan chastota va amplituda bilan tebranadi']],
    matn:'Diffuzor oldinga yurganda havoni siqadi, orqaga qaytganda siyraklashtiradi — bo‘ylama tovush to‘lqini hosil bo‘ladi. Sahnadagi harakat ko‘rish uchun sekinlashtirilgan: haqiqiy 440 Hz da diffuzor soniyasiga 440 marta tebranadi.',
    manba:'Wikipedia (inglizcha) «Loudspeaker»; fizika darsliklari'},
  havo:{nom:'Havo zarralari', sarlavha2:'Tovush tarqaladigan muhit',
    jadval:[['To‘lqin turi','bo‘ylama'],['Tovush tezligi','≈ 343 m/s (20 °C, quruq havo)'],['Zarralar harakati','joyi atrofida oldinga-orqaga tebranadi'],['Vakuumda','tovush tarqalmaydi']],
    matn:'Zichlashgan (siqilish) va siyraklashgan joylar navbatma-navbat keladi; ikki qo‘shni siqilish orasidagi masofa — to‘lqin uzunligi λ = v / f.',
    manba:'Wikipedia (inglizcha) «Speed of sound», «Longitudinal wave»'},
  ossillograf:{nom:'Ossillograf', sarlavha2:'Tebranishni ko‘rsatuvchi asbob',
    jadval:[['Gorizontal o‘q','vaqt'],['Vertikal o‘q','kuchlanish (tovush bosimi)'],['Nimani ko‘rsatadi','chastota (to‘lqinlar zichligi), amplituda (balandligi), tembr (shakli)'],['Sahnada','hisoblangan model grafigi']],
    matn:'Sinus — toza tovush; to‘rtburchakka yaqin shakl — toq garmonikalar (klarnet); arra shakli — barcha garmonikalar (skripka). Ekrandagi grafik tanlangan qiymatlardan hisoblanadi.',
    manba:'Wikipedia (inglizcha) «Oscilloscope», «Timbre»'},
  mikrofon:{nom:'Mikrofon', sarlavha2:'Tovushni elektr signalga aylantiradi',
    jadval:[['Asosiy qismi','yupqa membrana'],['Ishlashi','membrana tovush bosimida tebranadi, kuchlanish hosil bo‘ladi'],['Karnayga nisbatan','teskari vazifa: tovush → elektr']],
    matn:'Ossillografdagi to‘lqin aslida mikrofon bergan elektr signal. Dinamik mikrofon tuzilishi jihatidan kichik karnayga o‘xshaydi.',
    manba:'Wikipedia (inglizcha) «Microphone»'},
  chastota:{nom:'Chastota', sarlavha2:'Tovush balandligi',
    jadval:[['Birlik','gers (Hz) — 1 tebranish/soniya'],['Formula','f = 1 / T'],['La4','440 Hz (ISO 16)'],['Eshitish','taxminan 20–20 000 Hz (yoshga bog‘liq)']],
    matn:'Chastota ikki marta ortsa, tovush bir oktava yuqorilaydi. Gers birligi Genrix Gers (1857–1894) sharafiga nomlangan.',
    manba:'Wikipedia (inglizcha) «Hertz», «Hearing range»; ISO 16:1975'},
  amplituda:{nom:'Amplituda', sarlavha2:'Tovush kuchi',
    jadval:[['Ta’rif','tebranishning muvozanatdan eng katta og‘ishi'],['Ta’siri','amplituda katta — tovush kuchli (qattiq)'],['Daraja birligi','desibel (dB)'],['Balandlikka','ta’sir qilmaydi']],
    matn:'Juda kuchli tovush eshitish a’zosiga zarar yetkazadi — quloqchinlarda ovozni haddan tashqari baland qo‘ymang.',
    manba:'Wikipedia (inglizcha) «Amplitude», «Sound pressure»'},
  tembr:{nom:'Tembr', sarlavha2:'Tovushning «rangi»',
    jadval:[['Nimaga bog‘liq','garmonikalar tarkibiga (2f, 3f, 4f …)'],['Nay (model)','kuchsiz yuqori garmonikalar — toza tovush'],['Klarnet (model)','asosan toq garmonikalar'],['Skripka (model)','barcha garmonikalar, kuchi ≈ 1/n']],
    matn:'Sahnadagi tembrlar soddalashtirilgan: haqiqiy cholg‘ularda garmonikalar notaga, ijro usuliga va vaqt o‘tishiga qarab o‘zgaradi.',
    manba:'Wikipedia (inglizcha) «Timbre», «Harmonic», «Clarinet» (akustika bo‘limi)'}
});

/* ---------------------------------------------------------------- 11. SIMFONIK ORKESTR ---------------------------------------------------------------- */
const MUS_ORK = 'Wikipedia (inglizcha): «Orchestra», «String section», «Woodwind section», «Brass section», «Percussion section», «Concert pitch», «Harp», «Timpani», «Joseph Haydn» (en.wikipedia.org); O‘zbekcha Vikipediya «O‘zbekiston milliy simfonik orkestri», «Simfonik orkestr» (uz.wikipedia.org)';
bogla('musiqa', 'Simfonik orkestr guruhlari', 'musiqa-orkestr', 'Torli, yog‘och damli, mis damli, zarbli guruhlar — 3D sahna joylashuvi');
L['musiqa-orkestr'] = {
  fan:'musiqa', sinf:'7-sinf', qisqaNom:'Simfonik orkestr', nom:'Simfonik orkestr guruhlari',
  qisqa:'7-sinf · 4 guruh sahnada · dirijyor',
  sahna:'im_orkestr',
  kor:{
    sarlavha:'Yuz kishilik bitta «cholg‘u»',
    matn:'Simfonik orkestr cholg‘ulari to‘rt asosiy guruhga bo‘linadi: <b>torli</b> (kamonli), <b>yog‘och damli</b>, <b>mis damli</b> va <b>zarbli</b>. Ular sahnada an’anaviy tartibda o‘tiradi: oldinda — torlilar, o‘rtada — yog‘och damlilar, orqada — mis damlilar, eng orqada — zarblilar. Guruhni yoki cholg‘uni bosing — u yoritiladi, karta chiqadi va guruh tembrida qisqa akkord brauzerda sintez qilinadi (haqiqiy yozuv emas). Joylashuv sxematik: orkestrlar o‘tirish tartibini o‘zgartirishi mumkin.',
    punktlar:[
      '<b>Torli guruh:</b> 1- va 2-skripka, alt, violonchel, kontrabas — orkestrning eng katta guruhi',
      '<b>Yog‘och damli:</b> fleyta, goboy, klarnet, fagot; <b>mis damli:</b> valtorna, truba, trombon, tuba',
      '<b>Zarbli:</b> litavra, katta baraban, tarelka, ksilofon va boshqalar; <b>arfa</b> — alohida torli-chertma cholg‘u',
      '<b>Dirijyor</b> tempni ko‘rsatadi va ijroni boshqaradi; orkestr goboy bergan <b>La</b> notasiga sozlanadi'
    ]
  },
  bolimlar:[
    {sarlavha:'To‘rt guruh', jadval:[
      ['Torli (kamonli)','skripka, alt, violonchel, kontrabas · tor kamon bilan ishqalanadi yoki chertiladi (pitsikato)'],
      ['Yog‘och damli','fleyta (pikkolo), goboy, klarnet, fagot · qamish tilcha yoki lab-teshik; fleyta hozir metalldan bo‘lsa ham shu guruhda'],
      ['Mis damli','valtorna, truba, trombon, tuba · lablar mundshtukda «vizillab» tebranadi'],
      ['Zarbli','litavra, katta va kichik baraban, tarelka, uchburchak, ksilofon, qo‘ng‘iroqlar']
    ]},
    {sarlavha:'Har guruhning «oilasi» — yuqoridan pastga', jadval:[
      ['Torli','skripka → alt → violonchel → kontrabas'],
      ['Yog‘och damli','pikkolo → fleyta → goboy → klarnet → fagot'],
      ['Mis damli','truba → valtorna → trombon → tuba'],
      ['Zarbli (aniq balandlikli)','ksilofon, qo‘ng‘iroqlar, litavra; aniq balandliksiz — baraban, tarelka']
    ], matn:'Guruh ichidagi cholg‘ular soprano, alt, tenor, bas ovozlari kabi yuqoridan pastgacha diapazonni qoplaydi.'}
  ],
  bosqichlar:[
    {sarlavha:'Orkestr sahnada', matn:'Dirijyor pulti atrofida musiqachilar yarim doira bo‘lib o‘tiradi. Katta simfonik orkestrda 80–100 atrofida musiqachi bo‘lishi mumkin (taxminiy, asarga qarab o‘zgaradi). Guruhlar rang bilan ajratilgan.', holat:{guruh:null, nom:null}},
    {sarlavha:'Torli guruh — orkestr asosi', matn:'Dirijyorga eng yaqin — torlilar. Chapda 1- va 2-skripkalar, o‘ngda altlar va violonchellar, ularning orqasida kontrabaslar. Torlilar eng ko‘p sonli guruh: asosiy kuy ko‘pincha skripkalarga beriladi.', holat:{guruh:'torli', nom:null}},
    {sarlavha:'Yog‘och damlilar', matn:'O‘rtada ikki qatorda: fleyta va goboy, ularning orqasida klarnet va fagot. Goboy va fagot qo‘sh qamish tilcha bilan, klarnet yakka tilcha bilan chalinadi; fleytada tilcha yo‘q — havo teshik chetiga puflanadi.', holat:{guruh:'yogoch', nom:null}},
    {sarlavha:'Mis damlilar', matn:'Orqaroqda: valtornalar, trubalar, trombonlar va tuba. Ularda ijrochining lablari mundshtukda tebranadi. Mis damlilar eng kuchli guruh — tantanali, qahramonona lavhalar ularga beriladi.', holat:{guruh:'mis', nom:null}},
    {sarlavha:'Zarblilar', matn:'Eng orqada: litavralar, katta baraban, tarelkalar, ksilofon. Litavrani pedal bilan aniq notaga sozlash mumkin, baraban va tarelka esa aniq balandliksiz tovush beradi.', holat:{guruh:'zarbli', nom:null}},
    {sarlavha:'Arfa va dirijyor', matn:'Arfa odatda chap tomonda, torlilar orqasida turadi: konsert arfasida 47 tor va 7 pedal bor. Dirijyor tayoqchasi bilan tempni, qo‘li bilan kuch va kayfiyatni ko‘rsatadi.', holat:{guruh:null, nom:'arfa'}},
    {sarlavha:'Orkestrni sozlash', matn:'Konsert boshida goboy La notasini (odatda 440 Hz atrofida — ba’zi orkestrlar 442–443 Hz) chaladi va barcha cholg‘ular shunga sozlanadi. Goboyning tovushi aniq va barqaror bo‘lgani uchun shu an’ana qolgan.', holat:{guruh:'yogoch', nom:'goboy'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Orkestrda cholg‘uni toping', holat:{guruh:null, nom:null},
    topshiriqlar:[
      {shart:'Torli guruhning eng yuqori ovozli cholg‘usi — <b>skripkani</b> bosing.', hodisa:'im-orkestr', kod:"ev.nom==='skripka'", izoh:'To‘g‘ri — <b>skripka</b>: 4 tor, Sol–Re–La–Mi, kvinta bo‘yicha sozlangan.'},
      {shart:'Torli guruhning <b>eng past</b> ovozli cholg‘usini toping.', hodisa:'im-orkestr', kod:"ev.nom==='kontrabas'", izoh:'To‘g‘ri — <b>kontrabas</b>, odatda torlilarning o‘ng orqasida.'},
      {shart:'<b>Mis damli</b> guruhning istalgan cholg‘usini bosing.', hodisa:'im-orkestr', kod:"ev.guruh==='mis'", izoh:'To‘g‘ri — <b>mis damlilar</b>: valtorna, truba, trombon, tuba.'},
      {shart:'Tilchasiz, havo teshik chetiga puflanadigan yog‘och damli cholg‘u — <b>fleytani</b> toping.', hodisa:'im-orkestr', kod:"ev.nom==='fleyta'", izoh:'To‘g‘ri — <b>fleyta</b>: hozir metalldan yasalsa ham yog‘och damlilar guruhida.'},
      {shart:'Pedal bilan aniq notaga sozlanadigan <b>zarbli</b> cholg‘uni toping.', hodisa:'im-orkestr', kod:"ev.nom==='litavra'", izoh:'To‘g‘ri — <b>litavra</b> (timpani).'}
    ]},
  test:[
    {s:'Simfonik orkestrning asosiy guruhlari nechta?', v:['2','3','4','6'], t:2, izoh:'<b>4</b> ta: torli, yog‘och damli, mis damli, zarbli (arfa, fortepiano — qo‘shimcha).'},
    {s:'Qaysi cholg‘u torli guruhga kiradi?', v:['Truba','Alt','Fagot','Litavra'], t:1, izoh:'<b>Alt</b> — skripkadan biroz katta, pastroq ovozli torli cholg‘u.'},
    {s:'Qaysi cholg‘u mis damli guruhga kiradi?', v:['Klarnet','Valtorna','Goboy','Violonchel'], t:1, izoh:'<b>Valtorna</b> — mis damli; klarnet va goboy — yog‘och damli.'},
    {s:'Fleyta metalldan yasalsa ham qaysi guruhga kiradi?', v:['Mis damli','Yog‘och damli','Zarbli','Torli'], t:1, izoh:'<b>Yog‘och damli</b>: guruh tovush hosil qilish usuli bo‘yicha belgilanadi, material bo‘yicha emas.'},
    {s:'Orkestr konsert oldidan qaysi cholg‘u bergan La notasiga sozlanadi?', v:['Truba','Goboy','Kontrabas','Litavra'], t:1, izoh:'An’anaga ko‘ra <b>goboy</b> La notasini beradi.'},
    {s:'Torli guruhning eng past ovozli cholg‘usi qaysi?', v:['Violonchel','Alt','Kontrabas','Skripka'], t:2, izoh:'<b>Kontrabas</b>; undan yuqorida — violonchel, alt, skripka.'},
    {s:'Qaysi zarbli cholg‘uni aniq notaga sozlash mumkin?', v:['Katta baraban','Tarelka','Litavra','Uchburchak'], t:2, izoh:'<b>Litavra</b> (timpani) — pedal bilan sozlanadi.'},
    {s:'Sahnada dirijyorga eng yaqin qaysi guruh o‘tiradi?', v:['Zarbli','Mis damli','Torli','Yog‘och damli'], t:2, izoh:'<b>Torli</b> guruh — oldingi qatorlarda, dirijyor atrofida.'},
    {s:'«Simfoniya otasi» deb kim ataladi?', v:['J. Gaydn','V. A. Motsart','P. I. Chaykovskiy','A. Vivaldi'], t:0, izoh:'<b>Jozef Gaydn</b> (1732–1809) — 100 dan ortiq simfoniya muallifi, klassik simfoniya shaklini mustahkamlagan.'},
    {s:'O‘zbekiston Milliy simfonik orkestri (dastlab Davlat simfonik orkestri) qachon tashkil topgan?', v:['1918','1938','1966','1991'], t:1, izoh:'<b>1938-yilda</b>, O‘zbek davlat filarmoniyasi qoshida (uz.wikipedia).'},
    {s:'Konsert arfasida nechta pedal bor?', v:['2','5','7','12'], t:2, izoh:'<b>7</b> ta pedal — gammaning har bir pog‘onasi uchun bittadan; torlar soni 47.'},
    {tur:'3d', s:'Sahnada <b>mis damli</b> guruhning istalgan cholg‘usini bosing.', hodisa:'im-orkestr', kalit:'guruh', togri:['mis'], v:['Mis damli cholg‘u (valtorna, truba, trombon, tuba)','boshqa guruh cholg‘usi'], t:0,
     izoh:'Mis damlilar — <b>valtorna, truba, trombon, tuba</b>; ular yog‘och damlilar orqasida o‘tiradi.'}
  ],
  yordamchi:[
    {s:'Nega fleyta «yog‘och» damli?', j:'Guruh tovush hosil qilish usuliga qarab belgilanadi: mis damlilarda ijrochi lablari mundshtukda tebranadi, yog‘och damlilarda esa qamish tilcha yoki teshik cheti havo oqimini tebratadi. Fleyta tarixan yog‘ochdan bo‘lgan va tovushni teshik cheti hosil qiladi — shuning uchun yog‘och damli.', kalit:['fleyta','yogoch','nega']},
    {s:'Orkestrda hamma joylashuv bir xilmi?', j:'Yo‘q. Sahnadagi joylashuv keng tarqalgan «amerikacha» sxemaga yaqin (skripkalar chapda, violonchel va kontrabas o‘ngda). Ba’zi orkestrlar 1- va 2-skripkalarni dirijyorning ikki tomoniga qo‘yadi. MAKON dagi joylashuv sxematik.', kalit:['joylashuv','tartib','sxema']},
    {s:'Sahnadagi tovush haqiqiy orkestrmi?', j:'Yo‘q, bu brauzerda sintez qilingan qisqa akkord: torlilar — yumshoq arra to‘lqin, yog‘och damlilar — uchburchak to‘lqin, mis damlilar — yorqin arra, zarblilar — shovqin zarbi. Haqiqiy orkestrni jonli yoki ruxsatli yozuvda tinglang.', kalit:['tovush','sintez','haqiqiy']}
  ],
  maqola:[
    {sarlavha:'Simfonik orkestr qanday tuzilgan', xatboshilar:[
      'Simfonik orkestr — simfoniya, uvertyura, balet va opera musiqasini ijro etuvchi katta jamoa. Uning tarkibi XVIII asrda shakllana boshlagan va XIX asrda kengaygan. Hozirgi katta orkestrda 80–100 atrofida musiqachi bo‘lishi mumkin (taxminiy, asar talabiga qarab o‘zgaradi).',
      'Cholg‘ular to‘rt asosiy guruhga bo‘linadi: torli (kamonli), yog‘och damli, mis damli va zarbli. Ularga ko‘pincha arfa, fortepiano, chelesta kabi cholg‘ular qo‘shiladi. Har guruh ichida cholg‘ular yuqoridan pastgacha tartiblangan — xuddi xordagi soprano, alt, tenor va bas ovozlari kabi.',
      'Sahnada guruhlar an’anaviy tartibda o‘tiradi: oldinda — tovushi yumshoqroq va soni ko‘p torlilar, o‘rtada — yog‘och damlilar, orqada — kuchli mis damlilar, eng orqada — zarblilar. Bunday tartib guruhlar tovushini muvozanatlaydi.'
    ]},
    {sarlavha:'Torli va yog‘och damli guruhlar', xatboshilar:[
      'Torli guruh — orkestr asosi. Skripkalar ikki guruhga bo‘linadi: birinchi skripkalar ko‘pincha asosiy kuyni chaladi, ikkinchilari unga jo‘r bo‘ladi. Skripka torlari Sol, Re, La, Mi — sof kvinta bo‘yicha sozlanadi. Alt biroz kattaroq va pastroq, violonchel tizzalar orasida ushlab chalinadi, kontrabas — eng katta va eng past torli cholg‘u, u tik turib yoki baland kursida chalinadi.',
      'Yog‘och damlilarda tovush turli usulda hosil bo‘ladi. Fleytada havo teshik chetiga puflanadi (tilcha yo‘q); goboy va fagotda — qo‘sh qamish tilcha, klarnetda — yakka tilcha. Pikkolo — kichik fleyta, orkestrdagi eng yuqori ovozli cholg‘ulardan. Fagot esa guruhning bas ovozi.',
      'An’anaga ko‘ra konsert oldidan goboy La notasini chaladi va butun orkestr shunga sozlanadi. Standart balandlik — La4 = 440 Hz (ISO 16), lekin ba’zi orkestrlar biroz yuqoriroq (442–443 Hz) sozlanadi.'
    ]},
    {sarlavha:'Mis damli, zarbli guruhlar va dirijyor', xatboshilar:[
      'Mis damlilarda ijrochi lablarini mundshtukka qo‘yib «vizillatadi» — lablar tebranib, quvurdagi havo ustunini tebratadi. Valtorna — o‘ralgan uzun quvurli, mayin va keng tovushli; truba — yorqin, tantanali; trombonda kulisa surilib, quvur uzunligi o‘zgaradi; tuba — guruhning bas ovozi.',
      'Zarbli cholg‘ular ikki turga bo‘linadi: aniq balandlikli (litavra, ksilofon, qo‘ng‘iroqlar) va aniq balandliksiz (katta va kichik baraban, tarelka, uchburchak). Litavra pedal yordamida kerakli notaga sozlanadi. Zarblilar ritmni ta’kidlaydi va kulminatsiyalarni kuchaytiradi.',
      'Dirijyor butun orkestrni boshqaradi: tayoqcha bilan temp va o‘lchovni ko‘rsatadi, qo‘llari va yuzi bilan kuch va kayfiyatni bildiradi, guruhlarga kirish vaqtini ko‘rsatadi. Repetitsiyalarda asarning talqinini belgilaydi.'
    ]},
    {sarlavha:'O‘zbekistonda simfonik musiqa', xatboshilar:[
      'O‘zbekiston Milliy simfonik orkestri 1938-yilda O‘zbek davlat filarmoniyasi qoshida Davlat simfonik orkestri sifatida tashkil topgan; uning birinchi bosh dirijyori G. Shpitalniy bo‘lgan (manba: uz.wikipedia). Orkestr jahon klassikasi bilan birga o‘zbek bastakorlarining asarlarini ham ijro etadi.',
      'O‘zbek kompozitorlari simfonik orkestr uchun ko‘plab asarlar yaratgan, ularda xalq kuylari va maqom ohanglari orkestr tiliga ko‘chirilgan. Bundan tashqari, O‘zbekistonda xalq cholg‘ulari orkestrlari ham bor — ularda dutor, rubob, g‘ijjak, chang, nay kabi cholg‘ular simfonik orkestr guruhlariga o‘xshash tartibda o‘tiradi.',
      'Simfonik musiqa bilan tanishishning eng yaxshi yo‘li — jonli konsert. Sahnadagi 3D joylashuv va sintez tovushlar faqat guruhlarni tanib olishga yordam beradi.'
    ]}
  ],
  qiziqarli:[
    'Orkestrni goboy sozlashining sababi — uning tovushi aniq, barqaror va boshqa cholg‘ular orasidan yaxshi eshitiladi.',
    'Konsert arfasida 47 tor va 7 pedal bor: har pedal gammaning bitta pog‘onasini barcha oktavalarda o‘zgartiradi.',
    'Jozef Gaydn 100 dan ortiq simfoniya yozgan va «simfoniya otasi» deb ataladi (ro‘yxatda 104 ta raqamlangan simfoniya bor).',
    'Birinchi skripkachilarning yetakchisi — konsertmeyster — dirijyordan keyin orkestrdagi eng muhim musiqachi hisoblanadi; konsert oxirida dirijyor u bilan qo‘l beradi.',
    'Trombonda klapan yo‘q — balandlik kulisani surib, quvur uzunligini o‘zgartirish orqali o‘zgartiriladi.'
  ],
  lugat:[
    ['Orkestr','Birgalikda asar ijro etuvchi cholg‘uchilar jamoasi.'],
    ['Simfonik orkestr','Torli, yog‘och damli, mis damli va zarbli guruhlardan iborat katta orkestr.'],
    ['Dirijyor','Orkestr ijrosini boshqaruvchi musiqachi.'],
    ['Partitura','Orkestrning barcha ovozlari birga yozilgan nota.'],
    ['Konsertmeyster','Birinchi skripkachilar yetakchisi.'],
    ['Kamon','Torli cholg‘u torini ishqalovchi ot qilli tayoq.'],
    ['Pitsikato','Torni kamonsiz, barmoq bilan chertib chalish.'],
    ['Qamish tilcha','Goboy, klarnet, fagotda tebranuvchi plastinka.'],
    ['Mundshtuk','Mis damli cholg‘uning lab qo‘yiladigan qismi.'],
    ['Kulisa','Trombonning suriladigan quvur qismi.'],
    ['Litavra','Pedal bilan sozlanadigan katta qozonsimon baraban (timpani).'],
    ['Simfoniya','Orkestr uchun ko‘p qismli yirik asar.']
  ],
  manba:MUS_DAR+'; '+MUS_ORK+'. '+MUS_AUD+'. Musiqachilar soni (80–100) taxminiy; sahnadagi joylashuv sxematik («amerikacha» sxemaga yaqin) — orkestrlarda farq qiladi.',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D orkestr sahnasi, eshitib guruhni aniqlash, «men — dirijyor» o‘yini, guruhlarda jadval',
    maqsad:{talimiy:'Simfonik orkestrning to‘rt guruhi, har guruh cholg‘ulari, ularning sahnadagi joylashuvi, dirijyor va sozlash an’anasi bilan tanishtirish.',
      tarbiyaviy:'Jamoada hamjihat ishlash, bir-birini tinglash madaniyatini, jahon va o‘zbek musiqa merosiga hurmatni tarbiyalash.',
      rivojlantiruvchi:'Eshitib farqlash, tasniflash va fazoviy tasavvur ko‘nikmalarini rivojlantirish.'},
    natijalar:['4 guruhni va har biridan kamida 3 cholg‘uni aytadi','Cholg‘uni guruhiga ajratadi (fleyta — yog‘och damli)','Sahnadagi joylashuvni sxemada ko‘rsatadi','Dirijyor va goboy vazifasini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Simfonik orkestr»','Proyektor, karnaylar','Orkestr joylashuvi sxemasi (tarqatma)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «100 kishi qanday qilib bitta cholg‘udek yangraydi?»','Fikr bildiradi.'],
      ['8–20','<b>Guruhlar.</b> MAKON da torli, yog‘och damli, mis damli, zarbli guruhlarni ketma-ket yoritadi, sintez akkordlarni taqqoslaydi.','Sxemaga guruhlarni rang bilan belgilaydi.'],
      ['20–27','<b>Cholg‘ular oilalari.</b> Skripkadan kontrabasgacha, fleytadan fagotgacha.','Juftlikda cholg‘ularni yuqoridan pastga tartiblaydi.'],
      ['27–33','<b>Dirijyor va sozlash.</b> Goboy va La = 440 Hz; «men — dirijyor» o‘yini (2/4, 3/4 sxemalari).','Qo‘l bilan o‘lchov sxemasini ko‘rsatadi.'],
      ['33–41','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va testni bajaradi.'],
      ['41–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Dirijyor','Orkestr rahbari.'],['Partitura','Barcha ovozlar notasi.'],['Torli guruh','Skripka, alt, violonchel, kontrabas.'],['Mis damli','Valtorna, truba, trombon, tuba.'],['Litavra','Sozlanadigan baraban.']],
    savollar:[['Orkestrda nechta asosiy guruh bor?','4'],['Fleyta qaysi guruhda?','Yog‘och damli'],['Eng past torli cholg‘u?','Kontrabas'],['Orkestr qaysi cholg‘uga sozlanadi?','Goboy bergan La ga'],['O‘zbekiston Milliy simfonik orkestri qachon tashkil topgan?','1938-yilda']],
    uy:'Darslikdagi mavzuni o‘qish; (1) orkestr joylashuvi sxemasini chizib, guruhlarni rang bilan belgilang; (2) har guruhdan 2 tadan cholg‘u yozib, ularni yuqori ovozdan past ovozga tartiblang (javob namunasi: skripka → kontrabas; fleyta → fagot; truba → tuba; ksilofon → litavra); (3) oila a’zolari bilan birga simfonik orkestr konsertini (televizor yoki jonli) tomosha qilib, qaysi guruh qachon chalganini yozing.',
    manba:MUS_DAR+'; '+MUS_ORK
  }
};
const MUS_OC = (nom, guruh, jadval, matn, man)=>({nom, sarlavha2:guruh, jadval, matn, manba:man || ('Wikipedia (inglizcha) «'+nom+'»; '+MUS_DAR)});
DT.im_orkestr = Object.assign(DT.im_orkestr || {}, {
  torli:MUS_OC('Torli (kamonli) guruh', 'Orkestr guruhi', [['Cholg‘ular','1- va 2-skripka, alt, violonchel, kontrabas'],['Tovush','tor kamon bilan ishqalanadi yoki chertiladi'],['Joyi','oldinda, dirijyor atrofida'],['Soni','eng katta guruh']], 'Asosiy kuy ko‘pincha skripkalarga beriladi. Torlilar juda mayin pianissimodan kuchli fortegacha chala oladi.', 'Wikipedia (inglizcha) «String section»'),
  yogoch:MUS_OC('Yog‘och damli guruh', 'Orkestr guruhi', [['Cholg‘ular','fleyta (pikkolo), goboy, klarnet, fagot'],['Tovush','teshik cheti (fleyta), yakka tilcha (klarnet), qo‘sh tilcha (goboy, fagot)'],['Joyi','o‘rtada, torlilar orqasida']], 'Guruh nomi materialga emas, tovush hosil qilish usuliga bog‘liq: metall fleyta ham yog‘och damli.', 'Wikipedia (inglizcha) «Woodwind section»'),
  mis:MUS_OC('Mis damli guruh', 'Orkestr guruhi', [['Cholg‘ular','valtorna, truba, trombon, tuba'],['Tovush','ijrochi lablari mundshtukda tebranadi'],['Joyi','yog‘och damlilar orqasida']], 'Eng kuchli guruh: tantanali va qahramonona lavhalar, fanfaralar ko‘pincha mis damlilarga beriladi.', 'Wikipedia (inglizcha) «Brass section»'),
  zarbli:MUS_OC('Zarbli guruh', 'Orkestr guruhi', [['Aniq balandlikli','litavra, ksilofon, qo‘ng‘iroqlar'],['Aniq balandliksiz','katta va kichik baraban, tarelka, uchburchak'],['Joyi','eng orqada']], 'Zarblilar ritmni ta’kidlaydi va kulminatsiyani kuchaytiradi. Bitta ijrochi bir necha zarbli cholg‘uni navbatma-navbat chalishi mumkin.', 'Wikipedia (inglizcha) «Percussion section»'),
  skripka:MUS_OC('Skripka', 'Torli guruh · eng yuqori ovoz', [['Torlar','4 ta: Sol3, Re4, La4, Mi5 (sof kvintalar)'],['Chalinishi','kamon bilan; pitsikato — chertib'],['Orkestrda','1- va 2-skripkalar, dirijyordan chapda']], 'Birinchi skripkalar yetakchisi — konsertmeyster. Mashhur skripka ustalari: Antonio Stradivari, Giuzeppe Gvarneri (XVII–XVIII asr).'),
  alt:MUS_OC('Alt', 'Torli guruh · o‘rta ovoz', [['Torlar','4 ta: Do3, Sol3, Re4, La4'],['O‘lchami','skripkadan biroz katta'],['Nota kaliti','asosan alt kaliti']], 'Tovushi skripkadan quyuqroq, mayinroq; ko‘pincha garmoniyaning o‘rta ovozlarini to‘ldiradi.', 'Wikipedia (inglizcha) «Viola»; '+MUS_DAR),
  violonchel:MUS_OC('Violonchel', 'Torli guruh · tenor-bas ovoz', [['Torlar','4 ta: Do2, Sol2, Re3, La3'],['Chalinishi','o‘tirib, tizzalar orasida, shpil yerga tiraladi'],['Orkestrda','odatda dirijyordan o‘ngda']], 'Tovushi inson ovoziga yaqin, keng va iliq; ham kuychan kuylar, ham bas partiyalarini chaladi.', 'Wikipedia (inglizcha) «Cello»; '+MUS_DAR),
  kontrabas:MUS_OC('Kontrabas', 'Torli guruh · eng past ovoz', [['Torlar','odatda 4 ta: Mi1, La1, Re2, Sol2 (kvartalar); ba’zilarida 5 ta'],['Balandligi','taxminan 1,8 m (taxminiy)'],['Chalinishi','tik turib yoki baland kursida']], 'Notada yozilganidan bir oktava past yangraydi. Orkestrning «poydevori» — bas ovozini beradi.', 'Wikipedia (inglizcha) «Double bass»; '+MUS_DAR),
  fleyta:MUS_OC('Fleyta', 'Yog‘och damli guruh', [['Tovush hosil qilish','havo teshik chetiga puflanadi (tilchasiz)'],['Material','hozir asosan metall (kumush, nikel), tarixan yog‘och'],['Qarindoshi','pikkolo — bir oktava yuqori']], 'Ko‘ndalang ushlab chalinadi. O‘zbek nayiga o‘xshash tamoyilda tovush beradi.', 'Wikipedia (inglizcha) «Western concert flute»; '+MUS_DAR),
  goboy:MUS_OC('Goboy', 'Yog‘och damli guruh', [['Tilcha','qo‘sh qamish tilcha'],['Tovush','aniq, biroz «burun»dan chiqqandek'],['An’ana','orkestrga La notasini beradi']], 'Qo‘sh tilchali cholg‘u sifatida o‘zbek surnayiga qarindosh tamoyilda ishlaydi, lekin tovushi ancha mayin.', 'Wikipedia (inglizcha) «Oboe», «Concert pitch»; '+MUS_DAR),
  klarnet:MUS_OC('Klarnet', 'Yog‘och damli guruh', [['Tilcha','yakka qamish tilcha'],['Tembr','asosan toq garmonikalar — quyuq, «yog‘och» rang'],['Diapazon','keng — uch oktavadan ortiq']], 'Klarnet transpozitsiyalovchi cholg‘u: ko‘p tarqalgan si-bemol klarnet yozilganidan katta sekunda past yangraydi.', 'Wikipedia (inglizcha) «Clarinet»; '+MUS_DAR),
  fagot:MUS_OC('Fagot', 'Yog‘och damli guruh · bas ovoz', [['Tilcha','qo‘sh qamish tilcha'],['Quvuri','ikki buklangan, uzun (taxminan 2,5 m atrofida — taxminiy)'],['Vazifasi','guruhning bas ovozi']], 'Past, «bo‘g‘iq» va ba’zan hazilomuz tovushli; kontrafagot undan ham bir oktava past.', 'Wikipedia (inglizcha) «Bassoon»; '+MUS_DAR),
  valtorna:MUS_OC('Valtorna', 'Mis damli guruh', [['Quvuri','aylanma o‘ralgan, keng raxbli'],['Chalinishi','o‘ng qo‘l raxb ichida'],['Tovush','mayin, keng, «ov burg‘usi» rangli']], 'Valtorna ham mis, ham yog‘och damlilar bilan yaxshi qo‘shiladi, shuning uchun ba’zan ikki guruh orasida o‘tiradi.', 'Wikipedia (inglizcha) «French horn»; '+MUS_DAR),
  truba:MUS_OC('Truba', 'Mis damli guruh · yuqori ovoz', [['Klapanlar','3 ta ventil (porshen)'],['Tovush','yorqin, tantanali'],['Vazifasi','fanfaralar, kulminatsiyalar']], 'Mis damlilarning eng yuqori ovozi; signal va tantanali lavhalarda ko‘p ishlatiladi.', 'Wikipedia (inglizcha) «Trumpet»; '+MUS_DAR),
  trombon:MUS_OC('Trombon', 'Mis damli guruh · tenor-bas', [['Balandlik','kulisani surib o‘zgartiriladi (7 holat)'],['Tovush','kuchli, to‘q'],['Klapan','yo‘q (oddiy trombonda)']], 'Kulisa surilganda quvur uzayadi va tovush pasayadi — tovush balandligi va quvur uzunligi bog‘liqligini yaqqol ko‘rsatadi.', 'Wikipedia (inglizcha) «Trombone»; '+MUS_DAR),
  tuba:MUS_OC('Tuba', 'Mis damli guruh · eng past ovoz', [['Vazifasi','mis guruhining basi'],['Klapanlar','3–5 ta ventil'],['Chalinishi','o‘tirib, tizzada']], 'Orkestrdagi eng katta mis cholg‘u; odatda bitta tuba chalinadi.', 'Wikipedia (inglizcha) «Tuba»; '+MUS_DAR),
  litavra:MUS_OC('Litavra (timpani)', 'Zarbli guruh · aniq balandlikli', [['Tuzilishi','mis qozon ustiga teri (plastik) tortilgan'],['Sozlash','pedal bilan terining tarangligi o‘zgaradi'],['Soni','odatda 2–4 ta, turli o‘lchamda']], 'Litavra aniq notani chaladi, shuning uchun garmoniyada qatnashadi. Tayoqchalar uchi yumshoq — kigiz bilan o‘ralgan.', 'Wikipedia (inglizcha) «Timpani»'),
  arfa:MUS_OC('Arfa', 'Torli-chertma · alohida cholg‘u', [['Torlar','47 ta (konsert pedal arfasi)'],['Pedallar','7 ta — har pog‘ona uchun bittadan'],['Joyi','odatda chapda, torlilar orqasida']], 'Torlar barmoqlar bilan chertiladi. Arfa glissandosi — torlar bo‘ylab barmoqni sirg‘antirish — orkestrdagi eng tanish effektlardan.', 'Wikipedia (inglizcha) «Harp», «Pedal harp»'),
  dirijyor:MUS_OC('Dirijyor', 'Orkestr rahbari', [['Asbobi','tayoqcha (dirijyorlik tayoqchasi)'],['Vazifasi','temp, o‘lchov, kuch, kirishlar, talqin'],['Joyi','markazda, pult oldida']], 'Dirijyor tayoqcha bilan o‘lchov sxemasini «chizadi»: 2/4 da pastga-yuqoriga, 3/4 da uchburchak, 4/4 da xoch shakli. U partituradan barcha ovozlarni kuzatadi.', 'Wikipedia (inglizcha) «Conducting»; '+MUS_DAR)
});

/* ---------------------------------------------------------------- 12. SHASHMAQOM ---------------------------------------------------------------- */
const MUS_SM = 'YUNESKO: «Shashmaqom music» (ich.unesco.org/en/RL/shashmaqom-music-00089) — 2003 yilda e’lon qilingan, 2008 yilda Reprezentativ ro‘yxatga kiritilgan (O‘zbekiston va Tojikiston); O‘zbekcha Vikipediya «Shashmaqom» (uz.wikipedia.org/wiki/Shashmaqom); Wikipedia (inglizcha) «Shashmaqam», «Yunus Rajabiy», «Turgun Alimatov», «Munojot Yo‘lchiyeva» (en.wikipedia.org); O‘zbekcha Vikipediya «Otajalol Nosirov»';
bogla('musiqa', 'Shashmaqom — o‘zbek mumtoz musiqasi', 'musiqa-maqom', 'Olti maqom, mushkilot va nasr, sho‘balar, YUNESKO ro‘yxati — aylana diagrammada', ['O‘zbek mumtoz musiqasi: maqomlar']);
L['musiqa-maqom'] = {
  fan:'musiqa', sinf:'7-sinf', qisqaNom:'Shashmaqom', nom:'Shashmaqom — o‘zbek mumtoz musiqasi',
  qisqa:'7-sinf · olti maqom · mushkilot va nasr · YUNESKO',
  sahna:'im_maqom',
  kor:{
    sarlavha:'Olti maqom — bitta ulkan tizim',
    matn:'<b>Shashmaqom</b> (forscha «shash» — olti) — olti maqomdan iborat o‘zbek va tojik mumtoz musiqa tizimi: <b>Buzruk, Rost, Navo, Dugoh, Segoh, Iroq</b>. Har bir maqom ikki katta bo‘limdan iborat: <b>Mushkilot</b> — cholg‘u qismlari, <b>Nasr</b> — ashula qismlari. Jami 250 dan ortiq kuy va ashuladan tashkil topgan. Aylana diagrammada maqomni tanlang, keyin bo‘lim va sho‘balarni bosing. Diagramma sxematik; bu darsda maqom yozuvlari ishlatilmaydi — asl ijroni ustozlardan va ruxsatli manbalardan tinglang.',
    punktlar:[
      '<b>Olti maqom:</b> Buzruk, Rost, Navo, Dugoh, Segoh, Iroq',
      '<b>Mushkilot</b> (cholg‘u): Tasnif, Tarje, Gardun, Muxammas, Saqil; <b>Nasr</b> (ashula): Saraxbor, Talqin, Nasr, Ufar va ikkinchi guruh — Savt, Mo‘g‘ulcha',
      '<b>Markazi:</b> Buxoro; tizim Buxoro saroy sozanda va xonandalari ijodida shakllangan (manbalarda XVIII asr o‘rtasi, ayrim tadqiqotlarda XVII asr)',
      '<b>YUNESKO:</b> 2003-yilda «Insoniyat og‘zaki va nomoddiy merosi durdonasi» deb e’lon qilingan, 2008-yilda Reprezentativ ro‘yxatga kiritilgan (O‘zbekiston va Tojikiston)'
    ]
  },
  bolimlar:[
    {sarlavha:'Maqom tuzilishi', jadval:[
      ['Mushkilot (cholg‘u bo‘limi)','Tasnif, Tarje, Gardun, Muxammas, Saqil — nomlari maqom nomi bilan qo‘shib aytiladi: «Tasnifi Buzruk», «Tarjei Dugoh», «Garduni Segoh»'],
      ['Nasr, 1-guruh','Saraxbor, Talqin, Nasr, Ufar — o‘zaro bog‘langan ashula sho‘balari; orasida taronalar'],
      ['Nasr, 2-guruh','Savt va Mo‘g‘ulcha — o‘z tarmoqlari bilan (Talqincha, Qashqarcha, Soqiynoma, Ufar)'],
      ['Cholg‘ular','tanbur (yetakchi), doira, dutor, sato, g‘ijjak, nay; ashulani hofiz (xonanda) aytadi']
    ]},
    {sarlavha:'Muhim sanalar va shaxslar', jadval:[
      ['XVIII asr o‘rtasi','Buxoro saroy sozanda va bastakorlari ijodida Shashmaqom tizimi shakllangan (ayrim manbalarda XVII asr birinchi yarmi)'],
      ['1924','V. A. Uspenskiy Ota Jalol va Ota G‘iyos ijrosidan birinchi nota yozuvini nashr etgan'],
      ['1966–1974','Yunus Rajabiy (1897–1976) Shashmaqomning 6 jildlik nota nashrini tayyorlagan (F. Karomatov tahririda)'],
      ['2003 · 2008','YUNESKO: durdona deb e’lon qilingan · Reprezentativ ro‘yxatga kiritilgan'],
      ['Ustozlar','Ota Jalol Nosirov (1845–1928), Levi Boboxonov (1873–1926), Yunus Rajabiy, Turg‘un Alimatov (1922–2008), Munojot Yo‘lchiyeva (1960-yilda tug‘ilgan)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Olti maqom — aylana', matn:'Tashqi halqada oltita sektor: Buzruk, Rost, Navo, Dugoh, Segoh, Iroq. «Shashmaqom» forscha «olti maqom» degani. Har maqom — soatlab davom etadigan kuy va ashulalar turkumi.', holat:{maqom:null, bolim:null}},
    {sarlavha:'Buzruk — birinchi maqom', matn:'Buzruk («buzurg» — ulug‘, katta) — Shashmaqomning birinchi maqomi. Uning ham Mushkilot, ham Nasr bo‘limi bor. Sektorni bosib, ichki halqalarni kuzating.', holat:{maqom:'buzruk', bolim:null}},
    {sarlavha:'Mushkilot — cholg‘u bo‘limi', matn:'Mushkilot («mushkil» — qiyin) — maqomning cholg‘u qismlari: Tasnif, Tarje, Gardun, Muxammas, Saqil. Muxammas va Saqil uzun va murakkab doira usullari asosida yaratilgan. Asosiy cholg‘u — tanbur.', holat:{maqom:'buzruk', bolim:'mushkilot'}},
    {sarlavha:'Nasr — ashula bo‘limi', matn:'Nasrning birinchi guruhi — Saraxbor, Talqin, Nasr va Ufar — bir-biriga bog‘langan sho‘balar; ular orasida qisqa taronalar aytiladi. Ikkinchi guruh — Savt va Mo‘g‘ulcha o‘z tarmoqlari bilan.', holat:{maqom:'rost', bolim:'nasr'}},
    {sarlavha:'She’riyat va hofizlar', matn:'Nasr ashulalarida Rudakiy, Hofiz, Jomiy, Lutfiy, Navoiy, Bobur, Fuzuliy va boshqa shoirlarning g‘azallari aytiladi — ishqiy, falsafiy, pand-nasihat mazmunidagi she’rlar. Ashulani hofiz (xonanda) tanbur, doira va boshqa cholg‘ular jo‘rligida ijro etadi.', holat:{maqom:'navo', bolim:'nasr'}},
    {sarlavha:'Og‘izdan og‘izga — ustozdan shogirdga', matn:'Maqom asrlar davomida ustozdan shogirdga og‘zaki o‘rgatilgan; nota yozuvi faqat asosiy «skeletni» saqlay oladi. 1924-yilda V. A. Uspenskiy Ota Jalol va Ota G‘iyos ijrosidan birinchi notani nashr etgan, keyin Yunus Rajabiy 6 jildlik to‘plamni tayyorlagan (1966–1974).', holat:{maqom:'segoh', bolim:null}},
    {sarlavha:'YUNESKO merosi', matn:'2003-yilda YUNESKO Shashmaqomni «Insoniyat og‘zaki va nomoddiy merosi durdonasi» deb e’lon qilgan, 2008-yilda u Reprezentativ ro‘yxatga kiritilgan — O‘zbekiston va Tojikistonning umumiy merosi sifatida. Xorazm maqomlari va Farg‘ona–Toshkent maqom yo‘llari ham o‘zbek maqom merosining qismlari.', holat:{maqom:'iroq', bolim:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Maqom tuzilishini toping', holat:{maqom:null, bolim:null},
    topshiriqlar:[
      {shart:'Shashmaqomning <b>birinchi</b> maqomini bosing.', hodisa:'im-maqom', kod:"ev.nom==='buzruk'", izoh:'To‘g‘ri — <b>Buzruk</b>.'},
      {shart:'<b>Oltinchi</b>, oxirgi maqomni toping.', hodisa:'im-maqom', kod:"ev.tartib===6", izoh:'To‘g‘ri — <b>Iroq</b>.'},
      {shart:'Maqomning <b>cholg‘u</b> bo‘limini bosing.', hodisa:'im-maqom-qism', kod:"ev.nom==='mushkilot'", izoh:'To‘g‘ri — <b>Mushkilot</b>: cholg‘u qismlari.'},
      {shart:'Nasrning birinchi guruhidagi bosh ashula — <b>Saraxborni</b> toping.', hodisa:'im-maqom-qism', kod:"ev.nom==='saraxbor'", izoh:'To‘g‘ri — <b>Saraxbor</b>: nasrning birinchi, bosh sho‘basi.'},
      {shart:'Mushkilotning <b>Tasnif</b> qismini bosing.', hodisa:'im-maqom-qism', kod:"ev.nom==='tasnif'", izoh:'To‘g‘ri — <b>Tasnif</b>, masalan «Tasnifi Buzruk».'}
    ]},
  test:[
    {s:'«Shashmaqom» so‘zi nimani bildiradi?', v:['Oltin maqom','Olti maqom','Shoh maqomi','Sharq maqomi'], t:1, izoh:'<b>Olti maqom</b>: forscha «shash» — olti.'},
    {s:'Shashmaqomning birinchi maqomi qaysi?', v:['Rost','Buzruk','Iroq','Navo'], t:1, izoh:'<b>Buzruk</b>; tartib: Buzruk, Rost, Navo, Dugoh, Segoh, Iroq.'},
    {s:'Qaysi maqom Shashmaqom tarkibiga KIRMAYDI?', v:['Dugoh','Segoh','Panjgoh','Iroq'], t:2, izoh:'<b>Panjgoh</b> — Xorazm maqomlariga xos; Shashmaqomda Buzruk, Rost, Navo, Dugoh, Segoh, Iroq.'},
    {s:'Maqomning cholg‘u bo‘limi qanday ataladi?', v:['Nasr','Mushkilot','Savt','Ufar'], t:1, izoh:'<b>Mushkilot</b>: Tasnif, Tarje, Gardun, Muxammas, Saqil.'},
    {s:'Maqomning ashula bo‘limi qanday ataladi?', v:['Mushkilot','Nasr','Tasnif','Gardun'], t:1, izoh:'<b>Nasr</b>: Saraxbor, Talqin, Nasr, Ufar va Savt, Mo‘g‘ulcha guruhlari.'},
    {s:'YUNESKO Shashmaqomni qachon Reprezentativ ro‘yxatga kiritgan?', v:['1997','2003','2008','2014'], t:2, izoh:'<b>2008-yilda</b>; 2003-yilda esa «durdona» deb e’lon qilingan.'},
    {s:'Shashmaqom ijrosida yetakchi cholg‘u qaysi?', v:['Surnay','Tanbur','Chang','Karnay'], t:1, izoh:'<b>Tanbur</b> — Buxoro Shashmaqomining asosiy cholg‘usi.'},
    {s:'Shashmaqomning tarixiy markazi qaysi shahar?', v:['Xiva','Buxoro','Qo‘qon','Toshkent'], t:1, izoh:'<b>Buxoro</b> — YUNESKO hujjatida «Shashmaqomning ma’naviy markazi» deb atalgan.'},
    {s:'Shashmaqomning 6 jildlik nota nashrini kim tayyorlagan?', v:['V. A. Uspenskiy','Yunus Rajabiy','Turg‘un Alimatov','Ota Jalol'], t:1, izoh:'<b>Yunus Rajabiy</b> (1897–1976), 1966–1974-yillarda. Uspenskiy 1924-yilda birinchi notani nashr etgan.'},
    {s:'Qaysi sho‘ba Mushkilotga (cholg‘u bo‘limiga) kiradi?', v:['Saraxbor','Talqin','Gardun','Mo‘g‘ulcha'], t:2, izoh:'<b>Gardun</b> — cholg‘u qismi; qolganlari Nasr (ashula) sho‘balari.'},
    {tur:'3d', s:'Aylana diagrammada Shashmaqomning <b>oltinchi</b> maqomini bosing.', hodisa:'im-maqom', togri:['iroq'], v:['Iroq','boshqa maqom'], t:0,
     izoh:'Tartib: Buzruk, Rost, Navo, Dugoh, Segoh, <b>Iroq</b>.'},
    {tur:'3d', s:'Tanlangan maqomning <b>cholg‘u</b> bo‘limiga tegishli istalgan qismni bosing.', hodisa:'im-maqom-qism', kalit:'bolim', togri:['mushkilot'], v:['Mushkilot yoki uning qismi (Tasnif, Tarje, Gardun, Muxammas, Saqil)','Nasr qismi'], t:0,
     izoh:'Cholg‘u bo‘limi — <b>Mushkilot</b>.'}
  ],
  yordamchi:[
    {s:'Maqom nima?', j:'Maqom — ma’lum parda (lad) tizimi, ohang yo‘llari, usullar va she’riy matnlar asosida yaratilgan kuy va ashulalar turkumi. Shashmaqomda olti maqom bor; har biri Mushkilot (cholg‘u) va Nasr (ashula) bo‘limlaridan iborat.', kalit:['maqom','nima','tarif']},
    {s:'Nega darsda maqom yozuvi yo‘q?', j:'MAKON oflayn va faqat erkin litsenziyali mazmun bilan ishlaydi; maqom ijrolari yozuvlari mualliflik va ijrochilik huquqlari bilan himoyalangan bo‘lishi mumkin. Shuning uchun faqat tuzilish diagrammasi berilgan. Asl ijroni ustozlardan, konsertlardan yoki rasmiy nashrlardan tinglang.', kalit:['yozuv','tovush','nega']},
    {s:'Xorazm maqomlari Shashmaqomdan farq qiladimi?', j:'Ha. Xorazm maqomlari o‘z tuzilishi va ijro uslubiga ega; ular XIX asrda Xorazmda «tanbur chizig‘i» deb ataladigan maxsus nota yozuvida qayd etilgan. Farg‘ona–Toshkent maqom yo‘llari ham alohida mahalliy an’ana.', kalit:['xorazm','fargona','farq']}
  ],
  maqola:[
    {sarlavha:'Shashmaqom nima', xatboshilar:[
      'Shashmaqom — o‘zbek va tojik xalqlarining mumtoz musiqa merosi. Nomi forscha «shash» (olti) va arabcha «maqom» so‘zlaridan tuzilgan: tizim olti maqomdan iborat — Buzruk, Rost, Navo, Dugoh, Segoh, Iroq. YUNESKO ta’rificha, Shashmaqom vokal va cholg‘u musiqasi, ohang va ritm, she’riyatning uyg‘unlashuvidir.',
      'Har bir maqom yirik turkum bo‘lib, ikki katta bo‘limdan iborat: Mushkilot (cholg‘u qismlari) va Nasr (ashula qismlari). Shashmaqom jami 250 dan ortiq turli shakldagi kuy va ashula namunalarini o‘z ichiga oladi (uz.wikipedia). To‘liq bitta maqomni ijro etish bir necha soat davom etishi mumkin.',
      'YUNESKO ma’lumotiga ko‘ra, Shashmaqom Movarounnahr shaharlarida o‘n asrdan ortiq vaqt davomida rivojlangan, uning ildizlari islomgacha bo‘lgan davrga borib taqaladi; unga musiqashunoslik, she’riyat, matematika va tasavvuf ta’sir ko‘rsatgan. Buxoro Shashmaqomning ma’naviy markazi bo‘lgan. Tizim sifatida u Buxoro saroy sozanda, xonanda va bastakorlari ijodida shakllangan — o‘zbekcha Vikipediyada XVIII asr o‘rtasi, ayrim maqolalarda XVII asrning birinchi yarmi deyiladi.'
    ]},
    {sarlavha:'Maqom tuzilishi: Mushkilot va Nasr', xatboshilar:[
      'Mushkilot — maqomning cholg‘u bo‘limi. Uning asosiy qismlari: Tasnif, Tarje, Gardun, Muxammas va Saqil. Ular maqom nomi bilan birga aytiladi: «Tasnifi Buzruk», «Tarjei Dugoh», «Garduni Segoh». Muxammas va Saqil uzun va murakkab doira usullari asosida yaratilgan. Mushkilotda yetakchi cholg‘u — tanbur, unga doira, dutor, sato, g‘ijjak, nay jo‘r bo‘ladi.',
      'Nasr — ashula bo‘limi, ikki guruhdan iborat. Birinchi guruh — Saraxbor, Talqin, Nasr va Ufar — bir-biriga bog‘langan sho‘balar; ular orasida qisqa taronalar ijro etiladi. Ikkinchi guruh — Savt va Mo‘g‘ulcha o‘z tarmoqlari bilan (Talqincha, Qashqarcha, Soqiynoma, Ufar).',
      'Nasr ashulalarida Rudakiy, Hofiz, Jomiy, Lutfiy, Navoiy, Bobur, Fuzuliy va boshqa mumtoz shoirlarning g‘azallari kuylanadi — ishqiy, falsafiy, pand-nasihat va diniy mazmundagi she’rlar. Hofiz ovozining keng diapazoni va nozik bezaklari maqom ijrosining asosiy talablaridan.'
    ]},
    {sarlavha:'Ustozlar, nota yozuvi va YUNESKO', xatboshilar:[
      'Maqom an’anaviy ravishda ustozdan shogirdga og‘zaki o‘rgatilgan. YUNESKO hujjatida ta’kidlanishicha, standart nota yozuvi maqomning faqat asosiy «skeleti»ni saqlay oladi. 1924-yilda V. A. Uspenskiy Buxoroda Ota Jalol va Ota G‘iyos ijrosidan Shashmaqomning birinchi nota yozuvini nashr etgan.',
      'Yunus Rajabiy (1897–1976) — bastakor, xonanda va cholg‘uchi — o‘zbek musiqa merosini yig‘ib, Shashmaqomning 6 jildlik nashrini tayyorlagan (1966–1974, F. Karomatov tahririda). Mashhur ijrochilar orasida Ota Jalol Nosirov (1845–1928), Buxoro amiri saroyi xonandasi Levi Boboxonov (1873–1926), tanbur, dutor va sato ustasi Turg‘un Alimatov (1922–2008), xonanda Munojot Yo‘lchiyeva (1960-yilda tug‘ilgan) bor.',
      '2003-yilda YUNESKO Shashmaqomni «Insoniyat og‘zaki va nomoddiy merosi durdonasi» deb e’lon qildi, 2008-yilda u Nomoddiy madaniy merosning Reprezentativ ro‘yxatiga O‘zbekiston va Tojikistonning umumiy merosi sifatida kiritildi. Mustaqillikdan keyin (1991) ikkala davlatda maqomni asrash, maqom maktablari va ansambllarini qo‘llab-quvvatlash choralari ko‘rilgan.'
    ]},
    {sarlavha:'O‘zbek maqom merosining boshqa tarmoqlari', xatboshilar:[
      'Shashmaqomdan tashqari Xorazm maqomlari mavjud. Ular o‘z tuzilishi va ijro uslubiga ega; XIX asrda Xorazmda «tanbur chizig‘i» deb ataladigan maxsus nota yozuvi yaratilgan va maqomlar shu yozuvda qayd etilgan (uz.wikipedia manbasiga ko‘ra, bu ishda Komil Xorazmiy ishtirok etgan).',
      'Farg‘ona vodiysi va Toshkentda esa Farg‘ona–Toshkent maqom yo‘llari — mahalliy ijro an’analari shakllangan. Ular Shashmaqomdan kuy yo‘llari va ashula turkumlari bilan farq qiladi.',
      'Diagrammadagi aylana va halqalar sxematik: ular maqomlar tartibini va bo‘limlar tuzilishini eslab qolishga yordam beradi, lekin sho‘balarning haqiqiy davomiyligini yoki ohang tizimini aks ettirmaydi.'
    ]}
  ],
  qiziqarli:[
    'YUNESKO hujjatida Buxoro «Shashmaqomning ma’naviy markazi» deb atalgan.',
    'Maqom qismlari nomi maqom nomi bilan izofada aytiladi: «Tasnifi Buzruk», «Garduni Segoh», «Saraxbori Navo».',
    'Buxoro yahudiylari Shashmaqom an’anasini keyinchalik AQSh va boshqa mamlakatlarga ham olib borgan (inglizcha Vikipediya).',
    'Levi Boboxonov (1873–1926) Buxoroning so‘nggi amiri Olimxon saroyining mashhur xonandasi bo‘lgan.',
    'Turg‘un Alimatov tanbur, dutor va sato — uch cholg‘uning ustasi bo‘lgan; 1991-yilda O‘zbekiston xalq artisti unvonini olgan.'
  ],
  lugat:[
    ['Maqom','Parda tizimi, ohang yo‘llari va usullarga asoslangan kuy va ashulalar turkumi.'],
    ['Shashmaqom','Olti maqomdan iborat o‘zbek-tojik mumtoz musiqa tizimi.'],
    ['Mushkilot','Maqomning cholg‘u bo‘limi.'],
    ['Nasr','Maqomning ashula bo‘limi (shuningdek, uning bir sho‘basi nomi).'],
    ['Sho‘ba','Maqom tarkibidagi alohida qism (kuy yoki ashula).'],
    ['Saraxbor','Nasr birinchi guruhining bosh ashulasi.'],
    ['Tarona','Sho‘balar orasida aytiladigan qisqa ashula.'],
    ['Usul','Doira zarblarining takrorlanuvchi tartibi.'],
    ['Hofiz','Maqom va mumtoz ashulalar ijrochisi (xonanda).'],
    ['G‘azal','Mumtoz she’riyatning ishqiy-falsafiy janri; maqom ashulalari matni.'],
    ['Tanbur chizig‘i','XIX asrda Xorazmda yaratilgan maqom nota yozuvi.'],
    ['Nomoddiy madaniy meros','Og‘zaki an’analar, san’at, bilim va ko‘nikmalar merosi (YUNESKO atamasi).']
  ],
  manba:MUS_DAR+'; '+MUS_SM+'. Manbalar farqi: Shashmaqom tizimining shakllanishi uz.wikipedia bo‘yicha XVIII asr o‘rtasi, ayrim o‘zbek tadqiqotlarida XVII asrning birinchi yarmi — ikkalasi matnda. Yunus Rajabiy nashri yillari manbalarda 1966–1974 (ba’zilarida «1950–1970-yillar»). Diagramma sxematik; maqom yozuvlari ishlatilmagan.',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D aylana diagramma, klaster (maqom tuzilishi), «ustoz va shogird» suhbati, guruhlarda ishlash',
    maqsad:{talimiy:'Shashmaqomning olti maqomi, Mushkilot va Nasr bo‘limlari, asosiy sho‘balari, tarixi, ustozlari va YUNESKO ro‘yxatiga kiritilishini o‘rgatish.',
      tarbiyaviy:'Milliy mumtoz musiqa merosiga faxr va hurmat, ustoz-shogird an’anasini qadrlashni tarbiyalash.',
      rivojlantiruvchi:'Tizimli fikrlash (butun va qism), tasniflash, manbalarni solishtirish ko‘nikmalarini rivojlantirish.'},
    natijalar:['Olti maqomni tartib bilan aytadi','Mushkilot va Nasrni farqlaydi va har biridan qismlar aytadi','Shashmaqom YUNESKO ro‘yxatiga qachon kiritilganini biladi','Kamida 3 ta maqom ustozini nomlaydi'],
    jihozlar:['MAKON sahnasi «Shashmaqom» (aylana diagramma)','Proyektor','Tanbur yoki dutor (bo‘lsa)','Klaster tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Qaysi musiqa YUNESKO ro‘yxatida?» — muammoli savol.','Taxmin aytadi.'],
      ['8–18','<b>Olti maqom.</b> MAKON aylanasida Buzruk → Iroq; nomlar ma’nosi.','Olti maqomni daftarga tartib bilan yozadi.'],
      ['18–27','<b>Tuzilish.</b> Mushkilot va Nasr; sho‘balar; klaster.','Guruhlarda klaster to‘ldiradi.'],
      ['27–33','<b>Tarix va ustozlar.</b> Buxoro, Uspenskiy (1924), Yunus Rajabiy, Turg‘un Alimatov; YUNESKO 2003/2008.','Savol-javobda qatnashadi.'],
      ['33–41','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va testni bajaradi.'],
      ['41–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Maqom','Kuy va ashula turkumi.'],['Mushkilot','Cholg‘u bo‘limi.'],['Nasr','Ashula bo‘limi.'],['Sho‘ba','Maqom qismi.'],['Hofiz','Maqom xonandasi.']],
    savollar:[['Olti maqomni ayting.','Buzruk, Rost, Navo, Dugoh, Segoh, Iroq'],['Mushkilot qismlari?','Tasnif, Tarje, Gardun, Muxammas, Saqil'],['Nasr birinchi guruhi?','Saraxbor, Talqin, Nasr, Ufar'],['YUNESKO sanalari?','2003 — durdona, 2008 — Reprezentativ ro‘yxat'],['Shashmaqomning yetakchi cholg‘usi?','Tanbur']],
    uy:'Darslikdagi mavzuni o‘qish; (1) Shashmaqom tuzilishi klasterini chizing (javob: 6 maqom → har biri Mushkilot [Tasnif, Tarje, Gardun, Muxammas, Saqil] va Nasr [Saraxbor, Talqin, Nasr, Ufar; Savt, Mo‘g‘ulcha]); (2) 1924-yildan (Uspenskiy nashri) 2008-yilgacha (YUNESKO ro‘yxati) necha yil o‘tganini hisoblang (javob: 84 yil); (3) oila a’zolaringizdan maqom yoki mumtoz ashula haqida so‘rab, bitta ustoz haqida 3–4 gap yozing.',
    manba:MUS_DAR+'; '+MUS_SM
  }
};
const MUS_MQ = (nom, tartib, matn)=>({nom, sarlavha2:'Shashmaqom · '+tartib+'-maqom', jadval:[['Tartibi',tartib+' / 6'],['Tuzilishi','Mushkilot (cholg‘u) + Nasr (ashula)'],['Mushkilot qismlari','Tasnifi, Tarjei, Garduni, Muxammasi, Saqili '+nom],['Nasr qismlari','Saraxbori '+nom+', Talqin, Nasr, Ufar; Savt, Mo‘g‘ulcha']], matn, manba:MUS_SM});
const MUS_SH = (nom, bolim, matn)=>({nom, sarlavha2:bolim === 'mushkilot' ? 'Mushkilot · cholg‘u qismi' : 'Nasr · ashula sho‘basi', jadval:[['Bo‘lim',bolim === 'mushkilot' ? 'Mushkilot (cholg‘u)' : 'Nasr (ashula)'],['Nomlanishi',nom+' + maqom nomi (masalan, «'+nom+'i Buzruk»)'],['Ijrochi',bolim === 'mushkilot' ? 'cholg‘u ansambli, yetakchi — tanbur' : 'hofiz, cholg‘ular jo‘rligida']], matn, manba:'O‘zbekcha Vikipediya «Shashmaqom» (uz.wikipedia.org/wiki/Shashmaqom)'});
DT.im_maqom = Object.assign(DT.im_maqom || {}, {
  buzruk:MUS_MQ('Buzruk', 1, 'Shashmaqomning birinchi maqomi. Nomi forscha «buzurg» — ulug‘, katta so‘ziga bog‘lanadi (so‘z ma’nosi — lug‘aviy izoh). Sahnada boshlang‘ich holatda Buzruk tanlangan.'),
  rost:MUS_MQ('Rost', 2, 'Ikkinchi maqom. Nomi forscha «rost» — to‘g‘ri, haqiqiy so‘zidan (lug‘aviy izoh). Rost nomli maqom boshqa Sharq maqom tizimlarida ham uchraydi.'),
  navo:MUS_MQ('Navo', 3, 'Uchinchi maqom. «Navo» — kuy, ohang, ovoz ma’nosidagi so‘z (lug‘aviy izoh).'),
  dugoh:MUS_MQ('Dugoh', 4, 'To‘rtinchi maqom. Nomi forscha «du» (ikki) va «goh» (o‘rin, pog‘ona) so‘zlaridan — «ikkinchi pog‘ona» (lug‘aviy izoh).'),
  segoh:MUS_MQ('Segoh', 5, 'Beshinchi maqom. Nomi forscha «se» (uch) va «goh» so‘zlaridan — «uchinchi pog‘ona» (lug‘aviy izoh).'),
  iroq:MUS_MQ('Iroq', 6, 'Oltinchi, oxirgi maqom. Nomi joy nomi — Iroq bilan bog‘liq (lug‘aviy izoh).'),
  mushkilot:{nom:'Mushkilot', sarlavha2:'Maqomning cholg‘u bo‘limi', jadval:[['Asosiy qismlar','Tasnif, Tarje, Gardun, Muxammas, Saqil'],['Cholg‘ular','tanbur (yetakchi), doira, dutor, sato, g‘ijjak, nay'],['Nomi','«mushkil» — qiyin (lug‘aviy izoh)']], matn:'Qismlar maqom nomi bilan izofada aytiladi: «Tasnifi Buzruk», «Tarjei Dugoh». Ayrim qismlarning bastakorlar nomi bilan atalgan variantlari ham bor.', manba:'O‘zbekcha Vikipediya «Shashmaqom»'},
  nasr_bolim:{nom:'Nasr (ashula bo‘limi)', sarlavha2:'Maqomning ashula bo‘limi', jadval:[['1-guruh','Saraxbor, Talqin, Nasr, Ufar (orasida taronalar)'],['2-guruh','Savt, Mo‘g‘ulcha (tarmoqlari: Talqincha, Qashqarcha, Soqiynoma, Ufar)'],['Matn','Rudakiy, Hofiz, Jomiy, Lutfiy, Navoiy, Bobur, Fuzuliy g‘azallari']], matn:'Nasr ashulalarini hofiz tanbur, doira va boshqa cholg‘ular jo‘rligida ijro etadi. YUNESKO hujjatida nasr «ikki alohida qo‘shiqlar turkumidan iborat asosiy vokal bo‘lim» deb ta’riflangan.', manba:MUS_SM},
  tasnif:MUS_SH('Tasnif', 'mushkilot', 'Mushkilotning asosiy cholg‘u qismlaridan biri; Mushkilot qismlari ro‘yxatida birinchi turadi.'),
  tarje:MUS_SH('Tarje', 'mushkilot', 'Mushkilot tarkibidagi cholg‘u qismi (masalan, «Tarjei Dugoh»).'),
  gardun:MUS_SH('Gardun', 'mushkilot', 'Mushkilot tarkibidagi cholg‘u qismi (masalan, «Garduni Segoh»).'),
  muxammas:MUS_SH('Muxammas', 'mushkilot', 'Uzun va murakkab doira usullari asosida yaratilgan cholg‘u qismi (uz.wikipedia).'),
  saqil:MUS_SH('Saqil', 'mushkilot', 'Muxammas kabi uzun va murakkab doira usullari asosida yaratilgan yirik cholg‘u qismi (uz.wikipedia).'),
  saraxbor:MUS_SH('Saraxbor', 'nasr', 'Nasr birinchi guruhining bosh, boshlovchi ashulasi; undan keyin Talqin, Nasr va Ufar keladi.'),
  talqin:MUS_SH('Talqin', 'nasr', 'Nasr birinchi guruhining ikkinchi sho‘basi; o‘z usuliga ega.'),
  nasr:MUS_SH('Nasr', 'nasr', 'Nasr birinchi guruhining uchinchi sho‘basi. E’tibor bering: «Nasr» ham butun ashula bo‘limining, ham shu sho‘baning nomi.'),
  ufar:MUS_SH('Ufar', 'nasr', 'Birinchi guruhni yakunlovchi sho‘ba; Savt va Mo‘g‘ulcha tarmoqlarida ham o‘z Ufarlari bor.'),
  savt:MUS_SH('Savt', 'nasr', 'Nasrning ikkinchi guruhi boshidagi ashula; tarmoqlari — Talqincha, Qashqarcha, Soqiynoma, Ufar.'),
  mogulcha:MUS_SH('Mo‘g‘ulcha', 'nasr', 'Nasrning ikkinchi guruhidagi ashula turkumi; Savt kabi o‘z tarmoqlariga ega.')
});

}
const qosh = ()=>{ const D = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DT).forEach(k=>{ D[k] = Object.assign(D[k] || {}, DT[k]); }); };
qosh();
window.MAKON_IM_DETAL = DT;
})();
