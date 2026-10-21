/* MAKON v3.15 — TARIX: 5 ta yangi dars (guruh «tr») + detal kartalari.
   detallar2.js dan KEYIN, darslar_ipak.js dan OLDIN yuklanadi. Sahnalar: lib/sahna_v315_tr.js (tr_qadimgi, tr_allomalar, tr_registon, tr_xonliklar, tr_mustaqillik).
   Darslar: tarix-qadimgi (5–6), tarix-allomalar (7, «O‘rta asr allomalari» qulf mavzusi o‘rniga), tarix-registon (8), tarix-xonliklar (9), tarix-mustaqillik (10–11).
   Qoida: har sana manbali; manbalar farq qilsa — ikkalasi; tekshirilmagani «taxminiy». Siyosiy betaraflik. */
(function(){
const FAN = window.MAKON_FAN;
if(!FAN || !window.MAKON_DARS) return;
const F = id=>FAN.find(f=>f.id === id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom === nom || x.dars === dars || (eskiNomlar || []).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
bogla('tarix', 'Eng qadimgi odamlar va manzilgohlar', 'tarix-qadimgi', 'Selung‘ur, Ko‘lbuloq, Teshiktosh, Obirahmat, Sarazm — 3D diorama va vaqt chizig‘i');
bogla('tarix', 'O‘rta asr allomalari', 'tarix-allomalar', 'Xorazmiydan Boburgacha: 8 alloma, asarlari va yillari — 3D galereya');
bogla('tarix', 'Registon: temuriylar davri me’morchiligi', 'tarix-registon', 'Ulug‘bek, Sherdor va Tillakori madrasalari — soddalashtirilgan 3D model');
bogla('tarix', 'Buxoro amirligi, Xiva va Qo‘qon xonliklari', 'tarix-xonliklar', 'XVIII–XIX asrlar: uch davlat, Rossiya bosqini va protektorat — sxematik xarita');
bogla('tarix', 'Mustaqillik va davlat ramzlari', 'tarix-mustaqillik', '1989–1992-yillar, bayroq, gerb, madhiya, Konstitutsiya — 3D ramzlar');

const W = 'Wikipedia (inglizcha/ruscha)';
const TD = 'O‘zbekiston tarixi darsliklari (amaldagi nashrlar)';

/* =====================================================================
   1. ENG QADIMGI ODAMLAR VA MANZILGOHLAR (5–6-sinf)
   ===================================================================== */
const QM = W + ': «Sel’ungur» (ru.wikipedia.org/wiki/Сельунгур), «Teshik-Tash 1» (en.wikipedia.org/wiki/Teshik-Tash_1), «Obi-Rakhmat Grotto» (en.wikipedia.org/wiki/Obi-Rakhmat_Grotto), «Sarazm» (en.wikipedia.org/wiki/Sarazm), «Kelteminar culture»; Smithsonian Human Origins «Teshik-Tash» (humanorigins.si.edu); Krause J. va boshq., Nature 449 (2007) 902–904 (Teshiktosh mtDNK); YUNESKO «Proto-urban Site of Sarazm» (whc.unesco.org/en/list/1141); Vassar «Sel’-Ungur» (pages.vassar.edu/central-asia-sites); Quaternary International (Ko‘lbuloq OSL sanalari, 2014; Selung‘ur tishlari qayta ko‘rib chiqilgan, Glantz va boshq., 2004–2009)';
window.MAKON_DARS['tarix-qadimgi'] = {
  fan:'tarix', qisqaNom:'Qadimgi odamlar', nom:'O‘zbekiston hududidagi eng qadimgi odamlar va manzilgohlar',
  qisqa:'5–6-sinf · Tarix · diorama va vaqt chizig‘i', sinf:'5–6-sinf',
  sahna:'tr_qadimgi',
  kor:{
    sarlavha:'G‘orlardan ilk shaharchagacha',
    matn:'Arxeologlar O‘zbekiston va unga qo‘shni hududlardan yuz ming yillar oldin yashagan odamlarning izlarini topgan: tosh qurollar, gulxan qoldiqlari, hayvon suyaklari va hatto odam qoldiqlari. Sahnada beshta mashhur yodgorlik diorama shaklida ko‘rsatilgan, pastda esa vaqt chizig‘i bor. Dioramani bosing — u haqida karta chiqadi. Diqqat: qadimgi sanalar taxminiy, ba’zilari haqida olimlar hali bahslashadi — darsda bu ochiq aytiladi.',
    punktlar:[
      '<b>Teshiktosh</b> (Surxondaryo) — 1938-yilda neandertal bola skeleti topilgan; 2007-yilgi DNK tahlili uning neandertal ekanini tasdiqlagan',
      '<b>Obirahmat</b> (Toshkent viloyati) — 22 qatlam, 60 mingdan ortiq tosh buyum; 2003-yilda 9–12 yoshli bola tishlari va bosh suyagi bo‘laklari',
      '<b>Selung‘ur</b> (Farg‘ona vodiysi, hozirgi Qirg‘iziston) — darsliklarda «eng qadimgi», lekin zamonaviy sanalar ancha yosh',
      '<b>Sarazm</b> (Zarafshon vodiysi, hozirgi Tojikiston) — mil. av. IV–III ming yilliklardagi ilk shaharcha, YUNESKO ro‘yxatida (2010)'
    ]
  },
  bolimlar:[
    {sarlavha:'Beshta yodgorlik: qisqa jadval', jadval:[
      ['Selung‘ur g‘ori','Farg‘ona vodiysining janubi (Qirg‘iziston, Haydarkon). U. Islomov 1980-yildan qazigan. Darsliklarda ~1–1,5 mln yil; zamonaviy sanalar ~110–170 ming yil'],
      ['Ko‘lbuloq','Ohangaron vodiysi (Toshkent viloyati). M. Qosimov qazigan. Darsliklarda ilk paleolit; 2007–2010-yillardagi OSL sanalari ~40–80 ming yil (o‘rta paleolit)'],
      ['Teshiktosh g‘ori','Boysuntog‘ (Surxondaryo), ~1500 m balandlikda. A. Okladnikov, 1938–1939. Neandertal bola, taxminan 70 ming yil (baholar farq qiladi)'],
      ['Obirahmat g‘ori','Bo‘stonliq tumani (Toshkent viloyati), 1250 m. 1962-yilda topilgan. ~40–100 ming yil (manbalarda turlicha)'],
      ['Sarazm','Panjakent yaqini (Tojikiston), O‘zbekiston chegarasiga yaqin. 1976-yilda topilgan; mil. av. IV ming yillik – III ming yillik oxiri']
    ], matn:'«Ming yil oldin» — hozirdan hisoblangan taxminiy yosh. Qadimgi yodgorliklarning sanasi turli usullar (uran-toriy, termolyuminessensiya, OSL, radiouglerod) bilan aniqlanadi va har usulning xatoligi bor.'},
    {sarlavha:'Tosh davri va undan keyingi davrlar (O‘rta Osiyo, taxminiy)', jadval:[
      ['Ilk paleolit','~1 mln – 100 ming yil oldin (ba’zi darsliklarda boshlanishi 1,5 mln yil deb beriladi)'],
      ['O‘rta paleolit','100 ming – 40 ming yil oldin: muste madaniyati, neandertallar'],
      ['So‘nggi paleolit','40 ming – 12 ming yil oldin: zamonaviy odam'],
      ['Mezolit','12 ming – 8 ming yil oldin (mil. av. X–VI ming yilliklar): o‘q-yoy, Machay g‘ori'],
      ['Neolit','mil. av. VI–IV ming yilliklar: sopol idish, Kaltaminor madaniyati (Xorazm)'],
      ['Eneolit','mil. av. IV–III ming yilliklar: mis qurollar, Sarazm'],
      ['Bronza davri','mil. av. III ming yillik – I ming yillik boshi: bronza, ilk shaharlar']
    ], matn:'Davr chegaralari darsliklarda biroz farq qiladi va hududdan hududga o‘zgaradi — jadvaldagi raqamlar taxminiy.'}
  ],
  bosqichlar:[
    {sarlavha:'Diorama va vaqt chizig‘i', matn:'Sahnada beshta diorama: chapdan o‘ngga Selung‘ur, Ko‘lbuloq, Teshiktosh, Obirahmat va Sarazm. Pastdagi vaqt chizig‘i logarifmik: chap tomonda yuz minglab yillar, o‘ngda ming yillar. Xira halqa — darsliklardagi eski sana, sariq nuqta — zamonaviy sana.', holat:{joy:null}},
    {sarlavha:'Selung‘ur: eng qadimgi degan g‘or', matn:'Farg‘ona vodiysi janubidagi (hozirgi Qirg‘iziston hududi) g‘orni U. Islomov 1980-yildan qazigan: 1500 ga yaqin tosh buyum, g‘or ayig‘i, bug‘u, karkidon suyaklari topilgan. Darsliklarda uning yoshi 1–1,5 mln yil deb berilgan. Yangi uran-toriy va termolyuminessent sanalar esa taxminan 110–170 ming yilni ko‘rsatadi.', holat:{joy:'selungur'}},
    {sarlavha:'Ko‘lbuloq: daryo bo‘yidagi ustaxona', matn:'Ohangaron vodiysidagi ochiq manzilgohda qadimgi odamlar tosh qurollar yasagan. Uni uzoq yillar M. Qosimov qazigan va eng pastki qatlamlarni ilk paleolitga oid deb hisoblagan. 2007–2010-yillardagi yangi qazishmalar va OSL sanalari (taxminan 40–80 ming yil) bu fikrni shubha ostiga qo‘ygan.', holat:{joy:'kolbuloq'}},
    {sarlavha:'Teshiktosh: neandertal bola', matn:'1938-yilda A. Okladnikov Boysuntog‘dagi g‘ordan 8–11 yoshli bolaning skeletini topgan. Bosh suyagi atrofida 5 juft tog‘ echkisi shoxi turgan — bu dafn marosimi deb talqin qilingan, lekin ayrim olimlar bunga shubha bilan qaraydi. 2007-yilda DNK tahlili bola neandertal bo‘lganini tasdiqlagan.', holat:{joy:'teshiktosh'}},
    {sarlavha:'Obirahmat: 22 qatlamli g‘or', matn:'Chotqol tog‘lari etagidagi g‘or 1962-yilda topilgan. Qalinligi taxminan 10 m bo‘lgan 22 qatlamdan 60 mingdan ortiq tosh buyum chiqqan. 2003-yilda 9–12 yoshli bolaning 6 ta tishi va bosh suyagi bo‘laklari topilgan: tishlari neandertallarga, bosh suyagi zamonaviy odamga yaqinroq.', holat:{joy:'obirahmat'}},
    {sarlavha:'Sarazm: ilk shaharcha', matn:'Zarafshon vodiysidagi (hozirgi Tojikiston, Panjakent yaqini) Sarazmni 1976-yilda mahalliy aholi vakili topgan mis bolta orqali arxeolog A. Isakov aniqlagan. Bu yerda mil. av. IV ming yillikdan III ming yillik oxirigacha dehqonlar va hunarmandlar yashagan: xom g‘ishtli uylar, ibodatxona, mis va feruza buyumlar. YUNESKO ro‘yxatida — 2010-yildan.', holat:{joy:'sarazm'}},
    {sarlavha:'Davrlarni solishtiring', matn:'Vaqt chizig‘ida o‘rta paleolitni tanlang: Teshiktosh va Obirahmat shu davrga to‘g‘ri keladi. Sarazm esa eneolit — mis davri. Ular orasida o‘n minglab yillar bor!', holat:{davr:'orta'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Yodgorlikni toping',
    topshiriqlar:[
      {shart:'1938-yilda <b>neandertal bola skeleti</b> topilgan g‘orni bosing.', hodisa:'tr-makon', kod:"ev.joy==='teshiktosh'", izoh:'To‘g‘ri — <b>Teshiktosh</b> (Boysuntog‘, Surxondaryo).'},
      {shart:'YUNESKO ro‘yxatiga kiritilgan <b>ilk shaharcha</b>ni bosing.', hodisa:'tr-makon', kod:"ev.joy==='sarazm'", izoh:'To‘g‘ri — <b>Sarazm</b> (2010-yildan YUNESKO ro‘yxatida).'},
      {shart:'Chotqol tog‘lari etagidagi, <b>22 qatlamli</b> g‘orni bosing.', hodisa:'tr-makon', kod:"ev.joy==='obirahmat'", izoh:'To‘g‘ri — <b>Obirahmat</b> (Bo‘stonliq tumani).'},
      {shart:'Darsliklarda «eng qadimgi» deb yozilgan, <b>Farg‘ona vodiysidagi</b> g‘orni bosing.', hodisa:'tr-makon', kod:"ev.joy==='selungur'", izoh:'To‘g‘ri — <b>Selung‘ur</b>. Uning yoshi haqida olimlar bahslashadi.'},
      {shart:'Vaqt chizig‘ida neandertallar yashagan <b>o‘rta paleolit</b> davrini bosing.', hodisa:'tr-davr', kod:"ev.davr==='orta'", izoh:'To‘g‘ri — <b>o‘rta paleolit</b> (~100–40 ming yil oldin).'}
    ]},
  test:[
    {s:'Teshiktosh g‘ori qaysi viloyatda joylashgan?', v:['Toshkent','Surxondaryo','Farg‘ona','Xorazm'], t:1, izoh:'Teshiktosh — <b>Surxondaryo</b> viloyati, Boysuntog‘da, taxminan 1500 m balandlikda.'},
    {s:'Teshiktoshdagi skelet kimga tegishli ekani DNK tahlili bilan tasdiqlangan?', v:['Zamonaviy odam','Neandertal','Pitekantrop','Avstralopitek'], t:1, izoh:'2007-yilgi mitoxondrial DNK tahlili bola <b>neandertal</b> bo‘lganini tasdiqlagan.'},
    {s:'Teshiktoshdagi dafn joyi atrofida qaysi hayvonning shoxlari topilgan?', v:['Bug‘u','Tog‘ echkisi','Ho‘kiz','Arxar'], t:1, izoh:'<b>Tog‘ echkisi</b> (Sibir tog‘ echkisi) shoxlari — 5 juft. Bu dafn marosimi deb talqin qilingan, ammo ayrim olimlar shubhalanadi.'},
    {s:'Obirahmat g‘ori qachon topilgan?', v:['1938','1962','1976','2003'], t:1, izoh:'<b>1962-yilda</b>, Chorvoq suv omboridan oldingi qidiruvlarda. 2003 — bola qoldiqlari topilgan yil.'},
    {s:'Sarazm hozir qaysi davlat hududida?', v:['O‘zbekiston','Tojikiston','Qirg‘iziston','Turkmaniston'], t:1, izoh:'<b>Tojikiston</b>, Panjakent yaqinida — O‘zbekiston chegarasiga yaqin, Zarafshon vodiysida.'},
    {s:'Sarazm qaysi davrga oid?', v:['O‘rta paleolit','Mezolit','Eneolit – bronza davri','Temir davri'], t:2, izoh:'Sarazm — <b>eneolit va bronza davri</b> (mil. av. IV ming yillik – III ming yillik oxiri).'},
    {s:'Selung‘ur g‘orining yoshi haqida qaysi fikr to‘g‘ri?', v:['Hamma olimlar 1,5 mln yil deb hisoblaydi','Darsliklarda ~1–1,5 mln yil, zamonaviy sanalar ~110–170 ming yil','G‘or 5 ming yillik','G‘or hali qazilmagan'], t:1, izoh:'<b>Manbalar farq qiladi:</b> darsliklarda 1–1,5 mln yil, yangi uran-toriy va termolyuminessent sanalar ~110–170 ming yilni ko‘rsatadi.'},
    {s:'Neandertallar qaysi davrda yashagan?', v:['Ilk paleolit','O‘rta paleolit','Neolit','Bronza davri'], t:1, izoh:'<b>O‘rta paleolit</b> (~100–40 ming yil oldin), muste madaniyati.'},
    {s:'Kaltaminor neolit madaniyati qaysi hududda topilgan?', v:['Farg‘ona vodiysi','Xorazm (Amudaryo quyi oqimi)','Surxondaryo','Toshkent vohasi'], t:1, izoh:'<b>Xorazm</b> — Amudaryo va Oqchadaryo deltasida; 1939-yilda S. Tolstov ekspeditsiyasi topgan.'},
    {tur:'3d', s:'Sahnada <b>neandertal bola</b> dafn qilingan va atrofida tog‘ echkisi shoxlari topilgan g‘orni bosing.', hodisa:'tr-makon', kalit:'joy', togri:['teshiktosh'], v:['Teshiktosh g‘ori', 'boshqa yodgorlik'], t:0,
     izoh:'<b>Teshiktosh</b> — Boysuntog‘dagi g‘or. 1938-yilda A. Okladnikov topgan; bola neandertal ekani 2007-yilda DNK bilan tasdiqlangan.'}
  ],
  yordamchi:[
    {s:'Nega sanalar har xil?', j:'Sanalar turli usullar bilan aniqlanadi (uran-toriy, termolyuminessensiya, OSL, radiouglerod) va har usulning xatoligi bor. Eski darsliklardagi sanalar ko‘pincha tosh qurollarning shakliga qarab taxmin qilingan; yangi laboratoriya usullari ba’zan boshqa natija beradi. Darsda ikkala sana ham ko‘rsatilgan.', kalit:['sana','farq','yosh']},
    {s:'Neandertal kim?', j:'Neandertallar — taxminan 400–40 ming yil oldin Yevropa va G‘arbiy Osiyoda yashagan qadimgi odamlar. Ular olovdan foydalangan, tosh qurollar yasagan va o‘liklarini dafn qilgan bo‘lishi mumkin. Teshiktosh — ularning eng sharqiy topilmalaridan biri.', kalit:['neandertal','kim']}
  ],
  maqola:[
    {sarlavha:'Arxeologlar qanday bilib oladi?', xatboshilar:[
      'Yozuv paydo bo‘lishidan oldingi davrni biz faqat arxeologiya orqali bilamiz. Arxeologlar yerni qatlamma-qatlam qazib, har qatlamdagi tosh qurollar, gulxan kuli, hayvon suyaklari va odam qoldiqlarini o‘rganadi. Pastki qatlam odatda eng qadimgisi bo‘ladi.',
      'Topilmaning yoshi laboratoriyada aniqlanadi. Uran-toriy usuli g‘or ichidagi ohaktosh qatlamlarini, termolyuminessensiya va OSL usullari qum va kuygan toshni, radiouglerod usuli esa 50 ming yildan yosh organik qoldiqlarni sanaydi. Har usulning xatoligi bor, shuning uchun bir yodgorlik uchun turli sanalar uchraydi.',
      'Bu darsda ba’zi yodgorliklar uchun ikki xil sana ko‘rasiz: darsliklardagi eski sana va yangi tadqiqot sanasi. Bu fan rivojlanayotganini ko‘rsatadi — olimlar yangi dalil topsa, fikrini o‘zgartiradi.'
    ]},
    {sarlavha:'Paleolit: g‘orlar va gulxanlar', xatboshilar:[
      '<b>Selung‘ur</b> g‘ori Farg‘ona vodiysining janubiy chekkasida, hozirgi Qirg‘iziston hududidagi Haydarkon shaharchasi yonida joylashgan. Uni 1980-yildan U. Islomov qazigan: 1500 ga yaqin tosh buyum, 4000 ga yaqin hayvon suyagi (g‘or ayig‘i, bug‘u, yovvoyi qo‘y, karkidon) va bola yelka suyagi topilgan. Darsliklarda bu odam «Farg‘ontrop» deb atalgan va yoshi 1–1,5 mln yil deb berilgan. Keyingi tadqiqotlar tishlarning ko‘pchiligi aslida g‘or ayig‘iniki ekanini, qatlamlar yoshi esa taxminan 110–170 ming yil ekanini ko‘rsatgan.',
      '<b>Teshiktosh</b> g‘ori Surxondaryodagi Boysuntog‘da, taxminan 1500 m balandlikda. 1938–1939-yillarda A. P. Okladnikov bu yerda beshta madaniy qatlam va 8–11 yoshli bolaning skeletini topgan. Qatlamlardagi hayvon suyaklarining deyarli hammasi tog‘ echkisiniki — demak, odamlar asosan shu hayvonni ovlagan. Bosh suyagi atrofida 5 juft echki shoxi bo‘lgan; Okladnikov buni dafn marosimi deb hisoblagan, lekin ayrim olimlar shoxlar tasodifan tushgan bo‘lishi mumkin deydi. 2007-yilda nemis olimlari suyakdan DNK ajratib, bola neandertal ekanini tasdiqlagan.',
      '<b>Obirahmat</b> g‘ori Toshkent viloyatining Bo‘stonliq tumanida, 1250 m balandlikda. U 1962-yilda topilgan, 1998-yildan xalqaro ekspeditsiya qazimoqda. 22 qatlamdan 60 mingdan ortiq tosh buyum chiqqan. 2003-yilda 9–12 yoshli bolaning 6 ta tishi va 121 ta bosh suyagi bo‘lagi topilgan: tishlari neandertallarnikiga, bosh suyagi zamonaviy odamnikiga o‘xshaydi. Qatlamlar yoshi manbalarda 40–90 ming, ba’zi tadqiqotlarda taxminan 100 ming yil deb beriladi.',
      '<b>Ko‘lbuloq</b> — Ohangaron vodiysidagi ochiq manzilgoh. M. Qosimov uni ko‘p yillar qazib, pastki qatlamlarni ilk paleolitga oid deb hisoblagan. 2007–2010-yillardagi yangi qazishmalar esa OSL usuli bilan taxminan 40–80 ming yillik sanalarni bergan (Fitzsimmons va boshq., 2014) va ilk paleolit qatlami borligini shubha ostiga qo‘ygan.'
    ]},
    {sarlavha:'Mezolit va neolit: o‘q-yoy va sopol', xatboshilar:[
      'Muzlik davri tugagach, iqlim o‘zgargan, odamlar o‘q-yoy bilan ov qila boshlagan. Surxondaryodagi Machay g‘orida mezolit davri qatlamlari va odam suyaklari topilgan. Zarautsoy darasidagi qoyatosh rasmlarida ov manzaralari tasvirlangan; ularning yoshi haqida olimlar turlicha fikrda (mezolitdan bronza davrigacha).',
      'Neolitda odamlar sopol idish yasashni, keyinchalik dehqonchilik va chorvachilikni o‘rgangan. Xorazmdagi <b>Kaltaminor madaniyati</b> ovchi va baliqchilarining manzilgohlarini 1939-yilda S. P. Tolstov ekspeditsiyasi topgan. Uning sanasi manbalarda mil. av. VI–IV yoki IV–III ming yilliklar deb beriladi.'
    ]},
    {sarlavha:'Sarazm: ilk shaharcha', xatboshilar:[
      '1976-yil kuzida Panjakent yaqinidagi qishloq aholisi Ashurali Toyloqov arxeolog Abdullo Isakovga yerdan topgan mis boltani ko‘rsatgan. 1977-yildan boshlangan qazishmalar natijasida katta qadimiy manzilgoh — Sarazm ochilgan. U mil. av. IV ming yillikdan III ming yillik oxirigacha yashagan.',
      'Sarazmda xom g‘ishtdan qurilgan uylar, dumaloq ibodatxonalar va olov qurbongohlari, mis va bronza qurollar, feruza va boshqa toshlardan yasalgan taqinchoqlar topilgan. «Sarazm malikasi» deb atalgan ayol qabrida munchoqlardan iborat marjonlar chiqqan. Sopol idishlar Turkmaniston, Eron va Belujiston bilan savdo aloqalari bo‘lganini ko‘rsatadi.',
      '2010-yilda Sarazm «Sarazm ilk shahar yodgorligi» nomi bilan YUNESKO Butunjahon merosi ro‘yxatiga kiritilgan — bu Tojikistondagi birinchi shunday yodgorlik. Zarafshon vodiysi bo‘ylab Samarqand tomonga cho‘zilgan bu hudud O‘zbekiston tarixi bilan ham chambarchas bog‘liq.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — barcha yodgorliklarni «O‘zbekistonda» deb aytish. Teshiktosh, Obirahmat va Ko‘lbuloq O‘zbekistonda, Selung‘ur esa Qirg‘iziston, Sarazm Tojikiston hududida. Qadimda bunday chegaralar bo‘lmagan, lekin bugungi joylashuvni to‘g‘ri aytish kerak.',
      'Ikkinchi xato — taxminiy sanani aniq deb qabul qilish. «70 ming yil» — o‘rtacha baho, uning xatoligi o‘n minglab yil bo‘lishi mumkin. Uchinchi xato — neandertalni «maymun odam» deb o‘ylash: ular olovdan foydalangan, murakkab tosh qurollar yasagan va zamonaviy odamlar bilan aralashgan.'
    ]}
  ],
  formulalar:[
    ['mil. av. 3500 → 2026: 3500 + 2026 − 1 = 5525 yil','Sarazmning gullagan davridan bugungacha («0-yil» yo‘q — 1 ayiriladi)'],
    ['70 000 yil ÷ 25 yil ≈ 2800 avlod','Teshiktosh bolasidan bizgacha taxminan nechta avlod (bir avlod ≈ 25 yil)'],
    ['mil. av. IV ming yillik = mil. av. 4000–3001-yillar','Ming yillikni yillarga aylantirish'],
    ['2026 − 1938 = 88 yil','Teshiktosh topilganiga necha yil bo‘ldi']
  ],
  qiziqarli:[
    'Teshiktosh g‘oridagi 667 ta aniqlangan hayvon suyagidan 649 tasi tog‘ echkisiniki.',
    'Teshiktosh bolasi neandertallarning eng sharqiy topilmalaridan biri edi; keyinroq Sibirdagi Oltoy g‘orlaridan ham neandertal qoldiqlari topildi.',
    'Obirahmat g‘oridagi qatlamlar qalinligi taxminan 10 metr — bu uch qavatli uy balandligiga teng.',
    'Sarazm Tojikistonning YUNESKO ro‘yxatiga kiritilgan birinchi yodgorligi (2010).',
    'Sarazmni arxeologlar emas, mis boltani yillab saqlab kelgan mahalliy aholi vakili «topgan».'
  ],
  lugat:[
    ['Arxeologiya','Qadimgi odamlar qoldirgan moddiy izlarni qazib o‘rganuvchi fan.'],
    ['Paleolit','Qadimgi tosh davri (yunoncha «paleos» — qadimgi, «litos» — tosh).'],
    ['Mezolit','O‘rta tosh davri; o‘q-yoy paydo bo‘lgan.'],
    ['Neolit','Yangi tosh davri; sopol, dehqonchilik boshlangan.'],
    ['Eneolit','Mis-tosh davri; mis qurollar paydo bo‘lgan.'],
    ['Neandertal','O‘rta paleolitda yashagan qadimgi odam turi.'],
    ['Muste madaniyati','O‘rta paleolitning tosh qurol yasash an’anasi (Fransiyadagi Le Mustye g‘ori nomidan).'],
    ['Madaniy qatlam','Odamlar yashagan davrda to‘plangan kul, qurol va suyakli yer qatlami.'],
    ['Manzilgoh','Qadimgi odamlar yashagan joy.'],
    ['DNK tahlili','Suyakdagi irsiy moddani o‘rganib, qaysi turga tegishliligini aniqlash.']
  ],
  manba:TD + ' (5–6-sinf); ' + QM + '. Manbalar farqi: Selung‘ur — darsliklarda 1–1,5 mln yil, zamonaviy sanalar ~110–170 ming yil; Ko‘lbuloq — darsliklarda ilk paleolit, OSL sanalari ~40–80 ming yil; Teshiktosh bolasi yoshi 8–9 yoki 8–11; Obirahmat — 40–90 ming yoki ~100 ming yil; Kaltaminor — mil. av. VI–IV yoki IV–III ming yillik. Diorama sxematik, masshtabsiz.',
  ishlanma:{
    sinf:'5–6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D diorama, vaqt chizig‘i, «arxeolog kundaligi», juftlikda ishlash',
    maqsad:{talimiy:'O‘zbekiston va qo‘shni hududlardagi eng qadimgi manzilgohlar (Selung‘ur, Ko‘lbuloq, Teshiktosh, Obirahmat, Sarazm), tosh davri bosqichlari bilan tanishtirish.',
      tarbiyaviy:'Ajdodlar tarixiga va arxeologik yodgorliklarni asrashga hurmatni tarbiyalash.',
      rivojlantiruvchi:'Vaqt chizig‘i bilan ishlash, turli manbalardagi sanalarni solishtirish va taxminiy sanani tushunish ko‘nikmasini rivojlantirish.'},
    natijalar:['5 ta yodgorlikni joyi va davri bilan aytadi','Paleolit, mezolit, neolit, eneolitni farqlaydi','Teshiktosh topilmasining ahamiyatini tushuntiradi','Sana nima uchun manbalarda farq qilishini izohlaydi'],
    jihozlar:['MAKON sahnasi «Qadimgi manzilgohlar» (3D diorama)','Proyektor yoki interaktiv doska','O‘zbekiston xaritasi','Tarqatma: «arxeolog kundaligi» jadvali (joy, davr, topilma)'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «70 ming yil oldin bu yerda kim yashagan? Buni qanday bilamiz?» — savol. Arxeolog kasbi haqida qisqa suhbat.','Taxmin aytadi.'],
      ['8–25','<b>Diorama bo‘ylab sayohat.</b> MAKON da bosqichlarni ketma-ket ochadi: Selung‘ur → Ko‘lbuloq → Teshiktosh → Obirahmat → Sarazm. Har birida «qayerda, qachon, nima topilgan» savollari.','«Arxeolog kundaligi»ni to‘ldiradi.'],
      ['25–32','<b>Vaqt chizig‘i.</b> Davrlarni bosib solishtiradi; Selung‘urning ikki xil sanasini muhokama qiladi.','Juftlikda davrlarni tartiblaydi.'],
      ['32–42','<b>Mustahkamlash.</b> «Yodgorlikni toping» amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Paleolit','Qadimgi tosh davri.'],['Neandertal','O‘rta paleolit odami.'],['Madaniy qatlam','Odamlar izi saqlangan yer qatlami.'],['Eneolit','Mis-tosh davri.']],
    savollar:[['Teshiktosh qayerda?','Surxondaryo, Boysuntog‘'],['Teshiktosh bolasi kim bo‘lgan?','Neandertal (2007-yilgi DNK tahlili)'],['Sarazm qaysi davrga oid?','Eneolit – bronza davri (mil. av. IV–III ming yilliklar)'],['Obirahmat qachon topilgan?','1962-yil']],
    uy:'Darslikdagi mavzuni o‘qish; (1) daftarga vaqt chizig‘ini chizib, 5 ta yodgorlikni joylashtirish; (2) Teshiktosh topilganiga necha yil bo‘lganini hisoblash (2026 − 1938 = 88); (3) «Men — arxeolog» mavzusida 5–6 gaplik hikoya yozish.',
    manba:TD + '; ' + QM
  }
};

/* =====================================================================
   2. O‘RTA ASR ALLOMALARI (7-sinf)
   ===================================================================== */
const ALM = W + ': «Muhammad ibn Musa al-Khwarizmi», «Al-Farghani», «Al-Farabi», «Al-Biruni», «Avicenna», «The Canon of Medicine», «Ulugh Beg», «Ulugh Beg Observatory», «Ali-Shir Nava’i», «Babur»; MacTutor History of Mathematics (mathshistory.st-andrews.ac.uk): «Al-Khwarizmi», «Al-Biruni»; Encyclopedia.com «al-Farghani»; Encyclopaedia Britannica (tegishli maqolalar)';
window.MAKON_DARS['tarix-allomalar'] = {
  fan:'tarix', qisqaNom:'Allomalar', nom:'O‘rta asr allomalari: Xorazmiydan Boburgacha',
  qisqa:'7-sinf · O‘zbekiston tarixi · 3D galereya', sinf:'7-sinf',
  sahna:'tr_allomalar',
  kor:{
    sarlavha:'Ilm yo‘lidagi sakkiz nom',
    matn:'IX–XVI asrlarda Movarounnahr va Xorazmdan chiqqan olimlar va shoirlar jahon ilm-fani va adabiyotiga katta hissa qo‘shgan. Galereyada sakkiz alloma: har birining nishida ismi, yillari va asosiy asari, oldida — ramziy buyum (portret emas). Pastdagi vaqt chizig‘i kim qaysi asrda yashaganini ko‘rsatadi. Tug‘ilgan-vafot yillari ba’zi allomalar uchun aniq ma’lum emas — bu darsda ochiq aytiladi.',
    punktlar:[
      '<b>Algebra</b> va <b>algoritm</b> so‘zlari — al-Xorazmiy asari va nomidan',
      '<b>Ibn Sino</b>ning «Tib qonunlari» Yevropada XVIII asrgacha tibbiyot darsligi bo‘lgan',
      '<b>Ulug‘bek</b> rasadxonasidagi sekstantning radiusi taxminan 40 m',
      '<b>Navoiy</b> «Xamsa»ni 1483–1485-yillarda turkiy (chig‘atoy) tilda yozgan'
    ]
  },
  bolimlar:[
    {sarlavha:'Allomalar jadvali', jadval:[
      ['al-Xorazmiy','taxm. 780 – taxm. 850 · algebra («al-jabr», taxm. 820), hind raqamlari, astronomik jadvallar · Bag‘dod, «Bayt ul-hikma»'],
      ['al-Farg‘oniy','taxm. 800 – 861-yildan keyin · «Astronomiya asoslari»; Qohiradagi Nil o‘lchagichi (861)'],
      ['Forobiy','taxm. 870 – 950/951 · «Fozil odamlar shahri», «Musiqa haqida katta kitob»; «Ikkinchi muallim»'],
      ['Beruniy','973 – taxm. 1048–1050 · «Qadimgi xalqlardan qolgan yodgorliklar» (taxm. 1000), «Hindiston» (taxm. 1030), «Qonuni Mas’udiy»'],
      ['Ibn Sino','980 – 1037 · «Tib qonunlari» (1025-yilda tugallangan), «Kitob ash-shifo»'],
      ['Mirzo Ulug‘bek','1394 – 1449 · Samarqand rasadxonasi (1420-yillar), «Ziji jadidi Ko‘ragoniy» (~1000 yulduz katalogi)'],
      ['Alisher Navoiy','1441 – 1501 · «Xamsa» (1483–1485), «Muhokamat ul-lug‘atayn» (1499)'],
      ['Zahiriddin Muhammad Bobur','1483 – 1530 · «Boburnoma»; 1526-yilda Boburiylar davlatiga asos solgan']
    ], matn:'«taxm.» — taxminan: bu yillar manbalarda aniq berilmagan.'}
  ],
  bosqichlar:[
    {sarlavha:'Galereya va vaqt chizig‘i', matn:'Sakkiz nish — sakkiz alloma. Vaqt chizig‘ida ikki «oltin davr» ko‘rinadi: IX–XI asrlar (Xorazmiy, Farg‘oniy, Forobiy, Beruniy, Ibn Sino) va XV–XVI asrlar — temuriylar davri (Ulug‘bek, Navoiy, Bobur).', holat:{alloma:null}},
    {sarlavha:'al-Xorazmiy va al-Farg‘oniy', matn:'Ikkalasi IX asrda Bag‘doddagi «Bayt ul-hikma» (Donishmandlar uyi) atrofida ishlagan. Xorazmiyning «al-jabr» asari algebra faniga nom bergan, lotincha «Algoritmi» nomi esa «algoritm» so‘ziga aylangan. Farg‘oniyning «Astronomiya asoslari» XII asrda lotin tiliga tarjima qilinib, Yevropada mashhur bo‘lgan.', holat:{alloma:'xorazmiy'}},
    {sarlavha:'Abu Nasr Forobiy', matn:'Faylasuf Forobiy Aristoteldan keyingi «Ikkinchi muallim» deb atalgan. U davlat va jamiyat haqida («Fozil odamlar shahri»), musiqa nazariyasi haqida («Musiqa haqida katta kitob») yozgan. Tug‘ilgan joyi (Sirdaryo bo‘yidagi Farob yoki boshqa joy) olimlar orasida bahsli.', holat:{alloma:'forobiy'}},
    {sarlavha:'Abu Rayhon Beruniy', matn:'973-yilda Xorazmning Kat shahrida tug‘ilgan qomusiy olim astronomiya, geografiya, tarix, mineralogiyaga oid 150 dan ortiq asar yozgan (sanoq manbaga qarab farq qiladi). U Yer radiusini hisoblagan: manbalarga ko‘ra ~6340 km (MacTutor) yoki ~6320 km — bugungi qiymatdan 1–2 % farq bilan.', holat:{alloma:'beruniy'}},
    {sarlavha:'Abu Ali ibn Sino', matn:'Buxoro yaqinidagi Afshonada 980-yilda tug‘ilgan. Besh kitobdan iborat «Tib qonunlari» 1025-yilda tugallangan, XII asrda lotin tiliga tarjima qilingan va Yevropa universitetlarida uzoq yillar asosiy darslik bo‘lgan.', holat:{alloma:'ibnsino'}},
    {sarlavha:'Mirzo Ulug‘bek', matn:'Amir Temurning nabirasi Ulug‘bek Samarqand hukmdori va astronom bo‘lgan. 1420-yillarda qurilgan rasadxonada ~1000 yulduz katalogi bo‘lgan «Ziji jadidi Ko‘ragoniy» tuzilgan. Rasadxona qoldiqlarini 1908-yilda arxeolog V. Vyatkin topgan.', holat:{alloma:'ulugbek'}},
    {sarlavha:'Alisher Navoiy va Bobur', matn:'Navoiy (1441–1501) turkiy tilda «Xamsa» dostonlarini yaratgan va «Muhokamat ul-lug‘atayn»da turkiy tilning imkoniyatlarini himoya qilgan. Andijonda tug‘ilgan Bobur (1483–1530) «Boburnoma» xotiralarini yozgan va 1526-yilda Hindistonda Boburiylar davlatiga asos solgan.', holat:{alloma:'navoiy'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Allomani toping',
    topshiriqlar:[
      {shart:'Nomi «algoritm» so‘ziga aylangan olimning nishini bosing.', hodisa:'tr-alloma', kod:"ev.nom==='xorazmiy'", izoh:'To‘g‘ri — <b>al-Xorazmiy</b> (lotincha «Algoritmi»).'},
      {shart:'«Tib qonunlari» muallifini toping.', hodisa:'tr-alloma', kod:"ev.nom==='ibnsino'", izoh:'To‘g‘ri — <b>Ibn Sino</b>.'},
      {shart:'Samarqandda rasadxona qurdirgan hukmdor-olimni toping.', hodisa:'tr-alloma', kod:"ev.nom==='ulugbek'", izoh:'To‘g‘ri — <b>Mirzo Ulug‘bek</b>.'},
      {shart:'«Ikkinchi muallim» deb atalgan faylasufni toping.', hodisa:'tr-alloma', kod:"ev.nom==='forobiy'", izoh:'To‘g‘ri — <b>Forobiy</b>.'},
      {shart:'«Xamsa» muallifini toping.', hodisa:'tr-alloma', kod:"ev.nom==='navoiy'", izoh:'To‘g‘ri — <b>Alisher Navoiy</b>.'}
    ]},
  test:[
    {s:'«Algebra» so‘zi qaysi olim asari nomidan kelib chiqqan?', v:['Beruniy','al-Xorazmiy','Ibn Sino','al-Farg‘oniy'], t:1, izoh:'<b>al-Xorazmiy</b>ning «al-Kitob al-muxtasar fi hisob al-jabr val-muqobala» (taxm. 820) asaridagi «al-jabr» so‘zidan.'},
    {s:'Ahmad al-Farg‘oniy 861-yilda qaysi inshootni qurishga rahbarlik qilgan?', v:['Samarqand rasadxonasini','Qohiradagi Nil o‘lchagichini (miqyosini)','Bag‘dod ko‘prigini','Buxoro minorasini'], t:1, izoh:'<b>Roda orolidagi Nil o‘lchagichi</b> (Qohira) — 861-yilda tugallangan.'},
    {s:'Forobiy qanday laqab bilan mashhur?', v:['Shayx ur-rais','Ikkinchi muallim','Ustozi avval','Mavlono'], t:1, izoh:'<b>«Ikkinchi muallim»</b> — Aristoteldan («Birinchi muallim») keyingi. «Shayx ur-rais» — Ibn Sinoning laqabi.'},
    {s:'Beruniy qayerda tug‘ilgan?', v:['Buxoro','Kat (Xorazm)','Samarqand','Farob'], t:1, izoh:'<b>Kat</b> — Xorazmning qadimgi poytaxti (hozirgi Beruniy shahri, Qoraqalpog‘iston).'},
    {s:'Ibn Sinoning «Tib qonunlari» necha kitobdan iborat?', v:['3','5','7','10'], t:1, izoh:'<b>5 kitob</b>; 1025-yilda Hamadonda tugallangan.'},
    {s:'Ulug‘bek rasadxonasi qoldiqlarini kim va qachon topgan?', v:['V. Vyatkin, 1908','A. Okladnikov, 1938','M. Gerasimov, 1941','S. Tolstov, 1939'], t:0, izoh:'Arxeolog <b>V. L. Vyatkin 1908-yilda</b> topgan.'},
    {s:'Alisher Navoiyning «Xamsa»si nechta dostondan iborat?', v:['3','4','5','7'], t:2, izoh:'<b>5 doston</b>: «Hayrat ul-abror», «Farhod va Shirin», «Layli va Majnun», «Sab’ai sayyor», «Saddi Iskandariy» (1483–1485).'},
    {s:'Bobur qaysi jangdan so‘ng Hindistonda o‘z davlatiga asos solgan?', v:['Talas jangi (751)','Panipat jangi (1526)','Anqara jangi (1402)','Dandanakan jangi (1040)'], t:1, izoh:'<b>1526-yil 21-apreldagi Panipat jangi</b>da Ibrohim Lodini yenggan.'},
    {s:'Qaysi alloma XV asrda yashagan?', v:['al-Xorazmiy','Ibn Sino','Mirzo Ulug‘bek','Forobiy'], t:2, izoh:'<b>Mirzo Ulug‘bek</b> (1394–1449). Xorazmiy — IX, Forobiy — IX–X, Ibn Sino — X–XI asr.'},
    {tur:'3d', s:'Galereyada <b>«algoritm»</b> so‘ziga nomi bilan asos bo‘lgan olimning nishini yoki buyumini bosing.', hodisa:'tr-alloma', togri:['xorazmiy'], v:['al-Xorazmiy', 'boshqa alloma'], t:0,
     izoh:'<b>al-Xorazmiy</b>: uning hind raqamlari haqidagi asari lotin tilida «Algoritmi de numero Indorum» deb atalgan.'}
  ],
  yordamchi:[
    {s:'Nega yillar «taxminan»?', j:'O‘rta asr manbalarida ko‘pincha faqat olimning qaysi hukmdor davrida ishlagani yozilgan. Masalan, al-Xorazmiy va al-Farg‘oniyning tug‘ilgan yili noma’lum, Beruniyning vafoti 1048 yoki 1050-yildan keyin deb beriladi. Darsda bunday joylar «taxm.» deb belgilangan.', kalit:['taxminan','yil','sana']},
    {s:'Ular qaysi tilda yozgan?', j:'IX–XI asr olimlari asosan arab tilida (o‘sha davr ilm tili) yozgan. Navoiy va Bobur turkiy (chig‘atoy) tilda yozgan; Navoiy fors tilida ham «Foniy» taxallusi bilan she’rlar yaratgan.', kalit:['til','arab','turkiy']}
  ],
  maqola:[
    {sarlavha:'Birinchi uyg‘onish: IX–XI asrlar', xatboshilar:[
      'IX asrda Abbosiylar poytaxti Bag‘dodda «Bayt ul-hikma» — kutubxona va tarjima markazi ishlagan. Unga O‘rta Osiyodan ko‘plab olimlar kelgan. Muhammad ibn Muso <b>al-Xorazmiy</b> (taxm. 780 – taxm. 850) bu yerda chiziqli va kvadrat tenglamalarni tizimli yechish usulini bayon qilgan «al-jabr» kitobini (taxm. 820) yozgan. Uning hind raqamlari haqidagi asari lotin tiliga «Algoritmi de numero Indorum» nomi bilan tarjima qilingan — «algoritm» so‘zi shundan kelib chiqqan. Xorazmiyning tug‘ilgan joyi haqida manbalarda turli fikrlar bor.',
      'Ahmad <b>al-Farg‘oniy</b> (taxm. 800 – 861-yildan keyin) Ptolemey astronomiyasini qisqa va tushunarli bayon qilgan «Astronomiya asoslari» kitobini yozgan. U XII asrda (1135-yil, Sevilyalik Ioann) lotin tiliga tarjima qilingan, Yevropada Alfraganus nomi bilan mashhur bo‘lgan. 861-yilda Farg‘oniy Qohiradagi Roda orolida Nil suvini o‘lchaydigan inshootni qurishga rahbarlik qilgan.',
      'Abu Nasr <b>Forobiy</b> (taxm. 870 – 950/951) Aristotel asarlariga sharhlar yozgani uchun «Ikkinchi muallim» deb atalgan. «Fozil odamlar shahri» asarida adolatli jamiyat haqida fikr yuritgan, «Musiqa haqida katta kitob»da musiqa nazariyasini bayon qilgan. U Damashqda vafot etgan; tug‘ilgan joyi olimlar orasida bahsli.'
    ]},
    {sarlavha:'Beruniy va Ibn Sino', xatboshilar:[
      'Abu Rayhon <b>Beruniy</b> 973-yil 4-sentabrda Xorazmning Kat shahrida tug‘ilgan. U «Qadimgi xalqlardan qolgan yodgorliklar» (taxm. 1000), «Hindiston» (taxm. 1030), «Qonuni Mas’udiy» kabi asarlarida turli xalqlarning taqvimlari, geografiyasi va astronomiyasini o‘rgangan. Tog‘ cho‘qqisidan ufqni kuzatib, Yer radiusini hisoblagan; natija manbalarda ~6340 km yoki ~6320 km deb beriladi. An’anaga ko‘ra u Yer globusini ham yasagan. Beruniy G‘aznada vafot etgan; vafot yili 1048 yoki 1050-yildan keyin deb ko‘rsatiladi.',
      'Abu Ali <b>ibn Sino</b> (980 – 1037) Buxoro yaqinidagi Afshona qishlog‘ida tug‘ilgan, Yevropada Avitsenna nomi bilan tanilgan. «Tib qonunlari» besh kitobdan iborat bo‘lib, 1025-yilda Hamadonda tugallangan. U XII asrda lotin tiliga tarjima qilinib, 1472-yilda bosma kitob sifatida chiqqan va Yevropa universitetlarida XVIII asrgacha o‘qitilgan. «Kitob ash-shifo» — falsafa va tabiiy fanlar qomusi.',
      'Beruniy va Ibn Sino bir-biri bilan xat yozishgan: ularning savol-javob tarzidagi ilmiy bahsi saqlanib qolgan.'
    ]},
    {sarlavha:'Temuriylar davri: Ulug‘bek, Navoiy, Bobur', xatboshilar:[
      'Mirzo <b>Ulug‘bek</b> 1394-yil 22-martda Sultoniyada (Eron) tug‘ilgan, 1409-yildan Samarqand hukmdori bo‘lgan. 1417–1420-yillarda Samarqand va Buxoroda madrasalar qurdirgan, 1420-yillarda (1424–1429) Samarqand yaqinida rasadxona barpo etgan. Rasadxonadagi ulkan Faxriy sekstantining radiusi taxminan 40 m bo‘lgan. «Ziji jadidi Ko‘ragoniy»da taxminan 1000 yulduzning o‘rni berilgan (manbalarda 994 yoki 1018). Ulug‘bek yulduz yilining uzunligini 365 kun 6 soat 10 daqiqa 8 soniya deb aniqlagan — hozirgi qiymatdan bir daqiqaga yaqin farq bilan. U 1449-yil 27-oktabrda o‘ldirilgan.',
      '<b>Alisher Navoiy</b> 1441-yil 9-fevralda Hirotda tug‘ilgan va 1501-yil 3-yanvarda shu yerda vafot etgan. U temuriy hukmdor Husayn Boyqaro saroyida xizmat qilgan va ko‘plab madrasa, shifoxona, karvonsaroylar qurdirgan. 1483–1485-yillarda besh dostondan iborat «Xamsa»ni yaratgan, 1499-yilda «Muhokamat ul-lug‘atayn»da turkiy tilning boyligini isbotlagan.',
      'Zahiriddin Muhammad <b>Bobur</b> 1483-yil 14-fevralda Andijonda tug‘ilgan. U Movarounnahrda hokimiyatni saqlab qololmay, Kobulga, so‘ng Hindistonga yurgan va 1526-yil 21-aprelda Panipat jangida g‘alaba qozonib, Boburiylar davlatiga asos solgan. «Boburnoma» — uning turkiy tilda yozilgan xotiralari; unda O‘rta Osiyo, Afg‘oniston va Hindiston tabiati, xalqlari batafsil tasvirlangan. Bobur 1530-yil 26-dekabrda Agrada vafot etgan.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — barcha allomalarni «O‘zbekistonda tug‘ilgan» deyish: Ulug‘bek Sultoniyada (Eron), Navoiy Hirotda (Afg‘oniston) tug‘ilgan; ammo ular O‘rta Osiyo madaniyatining vakillari. Ikkinchi xato — taxminiy yillarni aniq deb aytish. Uchinchi xato — Ulug‘bekning «yil uzunligi»ni hozirgi taqvim yili bilan solishtirish: u yulduz yilini o‘lchagan.'
    ]}
  ],
  formulalar:[
    ['x² + 10x = 39  →  x = 3','al-Xorazmiy kitobidagi mashhur misol (musbat ildiz)'],
    ['2πR ≈ 2 · 3,14 · 6340 ≈ 39 800 km','Beruniy radiusi bo‘yicha Yer aylanasi (hozirgi qiymat ≈ 40 000 km)'],
    ['1501 − 1441 = 60 yil','Navoiy umri (to‘liq yillar: 59)'],
    ['1449 − 1394 = 55 yil','Ulug‘bek umri']
  ],
  qiziqarli:[
    'Algebra kitobidagi «x² + 10x = 39» misoli Yevropa darsliklarida asrlar davomida takrorlangan.',
    'Kolumb Yer o‘lchamlarini hisoblashda al-Farg‘oniy ma’lumotlaridan foydalangan deb yoziladi.',
    'Ibn Sinoning «Tib qonunlari» 1472-yilda lotin tilida bosilgan — kitob bosish ixtiro qilinganidan atigi 20 yilcha keyin.',
    'Ulug‘bek sekstantining yer ostidagi qismi hozir ham Samarqanddagi rasadxona muzeyida ko‘rinadi.',
    'Bobur «Boburnoma»da Hindistonda yo‘q bo‘lgan Farg‘ona qovunini sog‘inib yozgan.'
  ],
  lugat:[
    ['Alloma','Juda bilimdon olim.'],
    ['Bayt ul-hikma','«Donishmandlar uyi» — Bag‘doddagi IX asr ilm va tarjima markazi.'],
    ['Zij','Astronomik jadvallar to‘plami.'],
    ['Rasadxona','Osmon jismlarini kuzatish uchun maxsus bino (observatoriya).'],
    ['Sekstant','Yulduzlarning balandligini o‘lchaydigan yoysimon asbob.'],
    ['Usturlob','Yulduzlar holatini aniqlaydigan qadimgi asbob (astrolyabiya).'],
    ['Qomusiy olim','Ko‘p fanlarni bilgan olim (ensiklopedist).'],
    ['Xamsa','Besh dostondan iborat asar.'],
    ['Taxallus','Shoirning adabiy nomi.']
  ],
  manba:TD + ' (7-sinf); ' + ALM + '. Manbalar farqi: Xorazmiy va Farg‘oniy yillari taxminiy; Forobiyning tug‘ilgan joyi bahsli; Beruniy vafoti 1048 yoki 1050-yildan keyin; Beruniy Yer radiusi ~6340 yoki ~6320 km; Ulug‘bek zijidagi yulduzlar soni 994 yoki 1018; Ulug‘bek o‘lchagan yil — yulduz yili; Beruniy globusi — an’anaviy ma’lumot. Buyumlar ramziy, portret emas.',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D galereya, vaqt chizig‘i, «alloma kartochkasi», guruhlarda ishlash',
    maqsad:{talimiy:'IX–XVI asrlar allomalari, ularning asosiy asarlari va ilmiy yutuqlari bilan tanishtirish.',
      tarbiyaviy:'Ilm-fanga qiziqish, allomalar merosiga hurmat tuyg‘usini tarbiyalash.',
      rivojlantiruvchi:'Vaqt chizig‘ida ishlash, manbalardagi farqlarni aniqlash, taqdimot qilish ko‘nikmasini rivojlantirish.'},
    natijalar:['8 allomani asari va asri bilan bog‘laydi','«Algebra», «algoritm» so‘zlarining kelib chiqishini tushuntiradi','Ikki «ilmiy yuksalish» davrini ajratadi','Taxminiy yillarni to‘g‘ri izohlaydi'],
    jihozlar:['MAKON sahnasi «Allomalar galereyasi»','Proyektor','Tarqatma: 8 ta alloma kartochkasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Algoritm so‘zi qayerdan kelgan?» — savol.','Taxmin aytadi.'],
      ['8–25','<b>Galereya bo‘ylab.</b> MAKON bosqichlarini ochadi; har alloma uchun asar va yutuqni doskaga yozadi.','Kartochkalarni to‘ldiradi.'],
      ['25–33','<b>Guruh ishi.</b> 4 guruh — har biri 2 allomani sinfga qisqa taqdim etadi.','Taqdimot qiladi.'],
      ['33–42','<b>Mustahkamlash.</b> «Allomani toping» amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Zij','Astronomik jadvallar.'],['Rasadxona','Observatoriya.'],['Xamsa','Besh doston.']],
    savollar:[['«Tib qonunlari» muallifi?','Ibn Sino'],['Ulug‘bek rasadxonasi qachon qurilgan?','1420-yillarda (1424–1429)'],['Beruniy qayerda tug‘ilgan?','Kat (Xorazm)'],['«Boburnoma» muallifi?','Zahiriddin Muhammad Bobur']],
    uy:'Bir allomani tanlab, u haqida 8–10 gaplik ma’lumot tayyorlash; x² + 10x = 39 tenglamasini yechish; vaqt chizig‘iga 8 allomani joylashtirish.',
    manba:TD + '; ' + ALM
  }
};

/* =====================================================================
   3. REGISTON: TEMURIYLAR DAVRI ME’MORCHILIGI (8-sinf)
   ===================================================================== */
const RGM = 'YUNESKO «Samarkand — Crossroad of Cultures» (whc.unesco.org/en/list/603); ' + W + ': «Registan», «Ulugh Beg Madrasa (Samarkand)», «Sher-Dor Madrasa», «Tilya-Kori Madrasa», «Gur-e-Amir», «Bibi-Khanym Mosque»; ru.wikipedia.org: «Медресе Улугбека (Самарканд)», «Шердор», «Медресе Тилля-Кари», «Гур-Эмир»; Archnet (archnet.org/sites/2123, 2127)';
window.MAKON_DARS['tarix-registon'] = {
  fan:'tarix', qisqaNom:'Registon', nom:'Registon va temuriylar davri me’morchiligi',
  qisqa:'8-sinf · O‘zbekiston tarixi · 3D model (soddalashtirilgan)', sinf:'8-sinf',
  sahna:'tr_registon',
  kor:{
    sarlavha:'Uch madrasa — uch asr',
    matn:'Samarqanddagi Registon maydoni — O‘rta Osiyo me’morchiligining eng mashhur ansambli. Maydonning g‘arbida Ulug‘bek madrasasi (1417–1420), sharqida Sherdor (1619–1636), shimolida Tillakori (1646–1660) turadi. Birinchisi temuriylar davrida, qolgan ikkitasi ikki asr keyin, ashtarxoniylar davrida qurilgan — lekin ular temuriylar me’morchiligi an’analarini davom ettirgan. 3D model soddalashtirilgan: o‘lcham va bezaklar sxematik. Madrasani, keyin uning peshtoqi, minorasi yoki gumbazini bosing.',
    punktlar:[
      '<b>Ulug‘bek madrasasi</b> — 1417–1420, 81 × 56 m, hovlisi 30 × 30 m, minoralari 33 m',
      '<b>Sherdor</b> — 1619–1636, Yalangto‘sh Bahodir qurdirgan; peshtoqida sher (yo‘lbarssimon) va odam yuzli quyosh',
      '<b>Tillakori</b> — 1646–1660, madrasa va jome masjidi; ichki qismi oltin bilan bezatilgan',
      'YUNESKO: «Samarqand — madaniyatlar chorrahasi» (2001)'
    ]
  },
  bolimlar:[
    {sarlavha:'Uch madrasa', jadval:[
      ['Ulug‘bek madrasasi','1417–1420 · Mirzo Ulug‘bek · 81 × 56 m, hovli 30 × 30 m · 4 burchak minorasi (33 m) · ~50 hujra, ~100 talaba'],
      ['Sherdor madrasasi','1619–1636 · Yalangto‘sh Bahodir · me’mor Abdujabbor · 70 × 57 m (ru.wikipedia) · peshtoq 31,5 m, minoralar 31 m · ikki qovurg‘ali gumbaz'],
      ['Tillakori madrasasi','1646–1660 · Yalangto‘sh Bahodir · 75 × 75 m · madrasa + jome masjidi · tashqi gumbaz 1970-yillardagi ta’mirda qurilgan']
    ], matn:'O‘lchamlar asosan ruscha va inglizcha Vikipediya va Archnet ma’lumotlari bo‘yicha; manbalarda biroz farq qilishi mumkin. 3D modeldagi proporsiyalar taxminiy.'},
    {sarlavha:'Temuriylar davrining boshqa yodgorliklari (Samarqand)', jadval:[
      ['Go‘ri Amir','1403–1404 · Muhammad Sulton uchun qurilgan, 1405-yildan Amir Temur dafn etilgan · me’mor Muhammad ibn Mahmud Isfahoniy · qovurg‘ali gumbaz'],
      ['Bibixonim masjidi','1399–1404 · Amir Temur qurdirgan jome masjidi'],
      ['Shohi Zinda','XI–XIX asrlar (asosan XIV–XV) · maqbaralar ko‘chasi'],
      ['Ulug‘bek rasadxonasi','1420-yillar · qoldiqlari 1908-yilda topilgan']
    ]},
    {sarlavha:'Me’morchilik atamalari', jadval:[
      ['Peshtoq','Binoning baland to‘rtburchak kirish portali'],
      ['Ayvon','Bir tomoni ochiq, ravoqli chuqur xona'],
      ['Minora','Baland, torayib boruvchi mezana'],
      ['Guldasta','Burchakdagi kichik minora'],
      ['Hujra','Talaba yashaydigan kichik xona'],
      ['Darsxona','Dars o‘tiladigan gumbazli xona'],
      ['Girih','Geometrik yulduzsimon naqsh'],
      ['Koshin','Sirlangan (glazurli) sopol plitka bezak']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Registon maydoni', matn:'«Registon» — «qumli joy» degani. Temuriylar davrida bu Samarqandning savdo va jamoat maydoni bo‘lgan. Hozirgi ansambl uch madrasadan iborat va 2001-yildan YUNESKO Butunjahon merosi ro‘yxatida («Samarqand — madaniyatlar chorrahasi»).', holat:{bino:null}},
    {sarlavha:'Ulug‘bek madrasasi (1417–1420)', matn:'Ansamblning eng qadimgi binosi. Mirzo Ulug‘bek qurdirgan madrasada astronomiya, matematika, falsafa va diniy fanlar o‘qitilgan. Ikki qavatli hujralarda taxminan 100 talaba yashagan. Peshtoqi geometrik yulduzli (girih) koshin bilan bezatilgan.', holat:{bino:'ulugbek'}},
    {sarlavha:'Minoralar qanday tiklandi', matn:'Ulug‘bek madrasasining minoralari vaqt o‘tib qiyshayib qolgan. Shimoli-sharqiy minora 1932-yilda muhandis V. Shuxov loyihasi bo‘yicha to‘g‘rilangan, janubi-sharqiy minora 1965-yilda tiklangan. Minoralar balandligi taxminan 33 m.', holat:{bino:'ulugbek'}},
    {sarlavha:'Sherdor madrasasi (1619–1636)', matn:'Samarqand hokimi Yalangto‘sh Bahodir Ulug‘bek madrasasining ro‘parasida uning «oynadagi aksi»ni qurdirgan. Peshtoqda yo‘lbarssimon sher kiyikni quvayotgani, orqasida odam yuzli quyosh tasvirlangan — madrasa nomi shundan. Ikki qovurg‘ali feruza gumbaz bor.', holat:{bino:'sherdor'}},
    {sarlavha:'Tillakori madrasasi (1646–1660)', matn:'Shimoliy tomondagi bino ham madrasa, ham shaharning jome masjidi bo‘lgan. «Tillakori» — «tilla bilan ishlangan» degani: masjid ichidagi naqshlar oltin bilan qoplangan. Tashqi feruza gumbaz qurilmay qolgan va faqat 1970-yillardagi ta’mirda qurilgan.', holat:{bino:'tillakori'}},
    {sarlavha:'Temuriylar me’morchiligi an’anasi', matn:'Temuriylar davrida (XIV oxiri – XV asr) Samarqandda Bibixonim masjidi (1399–1404), Go‘ri Amir maqbarasi (1403–1404), Shohi Zinda maqbaralari qurilgan. Ularning belgilari: ulkan peshtoq, qovurg‘ali feruza gumbaz, baland minoralar, rang-barang koshin va girih naqshlar. Sherdor va Tillakori bu an’anani XVII asrda davom ettirgan.', holat:{bino:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Binoni va qismini toping',
    topshiriqlar:[
      {shart:'Registondagi <b>eng qadimgi</b> madrasani bosing.', hodisa:'tr-bino', kod:"ev.nom==='ulugbek'", izoh:'To‘g‘ri — <b>Ulug‘bek madrasasi</b> (1417–1420).'},
      {shart:'Peshtoqida <b>sher va quyosh</b> tasvirlangan madrasani bosing.', hodisa:'tr-bino', kod:"ev.nom==='sherdor'", izoh:'To‘g‘ri — <b>Sherdor</b> («sherli»).'},
      {shart:'Ham madrasa, ham <b>jome masjidi</b> bo‘lgan binoni bosing.', hodisa:'tr-bino', kod:"ev.nom==='tillakori'", izoh:'To‘g‘ri — <b>Tillakori</b>.'},
      {shart:'Istalgan madrasaning <b>minorasini</b> bosing.', hodisa:'tr-bino', kod:"ev.qism==='minora'", izoh:'To‘g‘ri — bu <b>minora</b>.'},
      {shart:'Qovurg‘ali feruza <b>gumbazni</b> bosing.', hodisa:'tr-bino', kod:"ev.qism==='gumbaz'", izoh:'To‘g‘ri — <b>gumbaz</b> (baraban ustida).'}
    ]},
  test:[
    {s:'Ulug‘bek madrasasi qachon qurilgan?', v:['1370–1380','1417–1420','1619–1636','1646–1660'], t:1, izoh:'<b>1417–1420-yillarda</b>. 1619–1636 — Sherdor, 1646–1660 — Tillakori.'},
    {s:'Sherdor va Tillakori madrasalarini kim qurdirgan?', v:['Amir Temur','Mirzo Ulug‘bek','Yalangto‘sh Bahodir','Shayboniyxon'], t:2, izoh:'<b>Yalangto‘sh Bahodir</b> — ashtarxoniylar davrida Samarqand hokimi.'},
    {s:'«Registon» so‘zi nimani anglatadi?', v:['Podsho saroyi','Qumli joy','Oltin maydon','Bozor darvozasi'], t:1, izoh:'<b>«Qumli joy»</b> (forscha «reg» — qum).'},
    {s:'Tillakori nomi nimaga ishora qiladi?', v:['Sherlar tasviriga','Oltin bilan bezatilgan ichki qismiga','Baland minoralariga','Qurilgan yiliga'], t:1, izoh:'«Tilla-kori» — <b>oltin bilan ishlangan</b>: masjid ichidagi naqshlar zarhal qilingan.'},
    {s:'Registon qaysi yili YUNESKO ro‘yxatiga kiritilgan (Samarqand bilan birga)?', v:['1990','1993','2001','2014'], t:2, izoh:'<b>2001-yil</b>, «Samarqand — madaniyatlar chorrahasi». 1990 — Ichan qal’a, 1993 — Buxoro.'},
    {s:'Binoning baland to‘rtburchak kirish portali qanday ataladi?', v:['Hujra','Peshtoq','Guldasta','Darsxona'], t:1, izoh:'<b>Peshtoq</b>; uning ichidagi chuqur ravoq — ayvon.'},
    {s:'Go‘ri Amir maqbarasi dastlab kim uchun qurilgan?', v:['Amir Temur uchun','Muhammad Sulton uchun','Ulug‘bek uchun','Bibixonim uchun'], t:1, izoh:'Temurning nabirasi va vorisi <b>Muhammad Sulton</b> (1403-yilda vafot etgan) uchun; 1405-yildan Temur ham shu yerda dafn etilgan.'},
    {s:'Ulug‘bek madrasasi minorasini 1932-yilda qaysi muhandis to‘g‘rilagan?', v:['V. Shuxov','A. Eyfel','V. Vyatkin','M. Gerasimov'], t:0, izoh:'<b>V. G. Shuxov</b> — mashhur rus muhandisi (shimoli-sharqiy minora).'},
    {s:'Tillakorining tashqi feruza gumbazi qachon qurilgan?', v:['1660-yilda','XVIII asrda','1970-yillardagi ta’mirda','Hali qurilmagan'], t:2, izoh:'Tashqi gumbaz dastlab qurilmay qolgan va <b>1970-yillardagi ta’mirda</b> qurilgan.'},
    {tur:'3d', s:'Peshtoqida <b>sher (yo‘lbarssimon) va odam yuzli quyosh</b> tasvirlangan madrasani bosing.', hodisa:'tr-bino', togri:['sherdor'], v:['Sherdor madrasasi', 'boshqa bino'], t:0,
     izoh:'<b>Sherdor</b> (1619–1636) — «sherli» degani. Tirik mavjudot tasviri islom me’morchiligida kam uchraydi, shuning uchun bu peshtoq juda mashhur.'}
  ],
  yordamchi:[
    {s:'Sherdor temuriylar davriga kiradimi?', j:'Yo‘q. Sherdor (1619–1636) va Tillakori (1646–1660) ashtarxoniylar davrida qurilgan. Ammo ular temuriylar me’morchiligi an’analarini — peshtoq, qovurg‘ali gumbaz, koshin naqshlarini davom ettirgan. Temuriylar davriga faqat Ulug‘bek madrasasi (1417–1420) tegishli.', kalit:['temuriy','davr','sherdor']},
    {s:'Model qanchalik aniq?', j:'Model soddalashtirilgan: binolar joylashuvi (g‘arb — Ulug‘bek, sharq — Sherdor, shimol — Tillakori) to‘g‘ri, lekin o‘lcham, balandlik va bezaklar sxematik. Masalan, Ulug‘bek madrasasi peshtoqining balandligi ishonchli manbada topilmagan.', kalit:['model','aniq','olcham']}
  ],
  maqola:[
    {sarlavha:'Temuriylar me’morchiligi', xatboshilar:[
      'Amir Temur (1370–1405 yillarda hukmronlik qilgan) Samarqandni o‘z davlatining poytaxtiga aylantirib, uni ulkan binolar bilan bezagan. Uning davrida Bibixonim jome masjidi (1399–1404), Go‘ri Amir maqbarasi (1403–1404), Shohi Zindadagi maqbaralar qurilgan. Shahrisabzda Oqsaroy saroyi barpo etilgan.',
      'Temuriylar me’morchiligining asosiy belgilari: ulkan <b>peshtoq</b>, baland <b>baraban</b> ustidagi qovurg‘ali feruza <b>gumbaz</b>, burchaklardagi <b>minoralar</b>, sirlangan g‘isht va koshin naqshlar, geometrik <b>girih</b> va arabcha yozuvli bezaklar. Go‘ri Amir gumbazi 64 qovurg‘ali; maqbaradagi to‘q yashil nefrit qabr toshini 1425-yilda Ulug‘bek olib kelgan.'
    ]},
    {sarlavha:'Ulug‘bek madrasasi', xatboshilar:[
      'Mirzo Ulug‘bek 1417–1420-yillarda Registonning g‘arbiy tomonida madrasa qurdirgan (1417-yilgi yozuv qurilish o‘sha paytda boshlanganini ko‘rsatadi). Bino 81 × 56 m, ichki hovlisi 30 × 30 m. Hovli atrofida ikki qavatli hujralar (taxminan 50 ta, 100 ga yaqin talaba uchun), burchaklarda gumbazli darsxonalar bo‘lgan. To‘rt burchakdagi minoralar balandligi taxminan 33 m.',
      'Madrasada diniy fanlar bilan birga astronomiya va matematika o‘qitilgan; an’anaga ko‘ra Ulug‘bekning o‘zi ham dars bergan. Me’mori an’anaviy ravishda Qavomiddin Sheroziy deb ko‘rsatiladi (boshqa manbada — Kamoliddin Muhandis). Asrlar o‘tib minoralar qiyshaygan: 1932-yilda V. Shuxov shimoli-sharqiy minorani, 1965-yilda ta’mirchilar janubi-sharqiy minorani to‘g‘rilagan.'
    ]},
    {sarlavha:'Sherdor va Tillakori', xatboshilar:[
      'XVII asrda ashtarxoniylar sulolasi davrida Samarqand hokimi Yalangto‘sh Bahodir maydonni qayta bezagan. 1619–1636-yillarda Ulug‘bek madrasasining ro‘parasida Sherdor madrasasi qurilgan (me’mor Abdujabbor). U Ulug‘bek madrasasiga «oynadagi aks» kabi o‘xshab turadi. Peshtoq ravog‘i ustida yo‘lbarsga o‘xshash sher kiyikni quvmoqda, uning orqasida odam yuzli quyosh chiqmoqda. Tirik mavjudot tasviri islom me’morchiligida kam uchraydi, shuning uchun bu tasvir juda mashhur.',
      '1646–1660-yillarda maydonning shimolida Tillakori madrasasi qurilgan. U bir vaqtning o‘zida shaharning jome masjidi vazifasini ham bajargan. Masjid ichi «kundal» uslubidagi naqshlar va zarhal (oltin) bilan bezatilgan. Tashqi feruza gumbaz o‘sha davrda qurilmay qolgan; u faqat XX asrning 1970-yillaridagi ta’mirda qurilgan.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — Registonni to‘liq Amir Temur qurdirgan deb o‘ylash: Temur davrida bu maydonda boshqa binolar bo‘lgan, bugungi uch madrasa 1417–1660-yillarda qurilgan. Ikkinchi xato — Sherdordagi hayvonni oddiy sher deb atash: u yo‘lbarsga o‘xshash, yolli fantastik mavjudot. Uchinchi xato — barcha bezaklarni asl deb hisoblash: XX asrda ko‘p qismlar ta’mirlangan va tiklangan.'
    ]}
  ],
  formulalar:[
    ['1660 − 1417 = 243 yil','Ansamblning shakllanish davri (birinchi va oxirgi madrasa orasida)'],
    ['81 × 56 = 4536 m²','Ulug‘bek madrasasi egallagan maydon (taxminan)'],
    ['30 × 30 = 900 m²','Ulug‘bek madrasasining ichki hovlisi'],
    ['1:100 masshtab: 33 m → 33 sm','Minora modelini masshtabda yasash']
  ],
  qiziqarli:[
    'V. Shuxov — Moskvadagi mashhur Shabolovka teleminorasi muallifi — Ulug‘bek madrasasi minorasini to‘g‘rilashda qatnashgan.',
    'Go‘ri Amir gumbazi 64 ta qovurg‘adan iborat.',
    'Tillakori masjidi ichki bezagida ko‘p miqdorda oltin ishlatilgan — nomi ham shundan.',
    'Registon maydonida bugungi kunda ham bayram tadbirlari va festivallar o‘tkaziladi.'
  ],
  lugat:[
    ['Ansambl','Bir-biriga uyg‘un bir necha binolar majmuasi.'],
    ['Madrasa','Oliy diniy va dunyoviy ta’lim beradigan o‘quv yurti.'],
    ['Peshtoq','Baland kirish portali.'],
    ['Ayvon','Bir tomoni ochiq ravoqli xona.'],
    ['Minora','Baland mezana.'],
    ['Gumbaz','Yarim sharsimon yoki qovurg‘ali tom.'],
    ['Baraban','Gumbaz ostidagi silindrsimon devor.'],
    ['Koshin','Sirlangan sopol plitka.'],
    ['Girih','Geometrik naqsh.'],
    ['Zarhal','Oltin suvi yoki varag‘i bilan qoplash.']
  ],
  manba:TD + ' (8-sinf); ' + RGM + '. Manbalar farqi va taxminiy joylar: Ulug‘bek madrasasi me’mori (Qavomiddin Sheroziy yoki Kamoliddin Muhandis); peshtoq balandligi ishonchli manbada topilmagan — modelda taxminiy; Go‘ri Amir balandligi manbalarda 30–34 m. 3D model soddalashtirilgan.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model bilan ishlash, «me’mor daftari», juftlikda solishtirish',
    maqsad:{talimiy:'Registon ansambli, uning madrasalari, qurilish sanalari va temuriylar me’morchiligi belgilari bilan tanishtirish.',
      tarbiyaviy:'Milliy me’moriy merosni asrash va qadrlash tuyg‘usini tarbiyalash.',
      rivojlantiruvchi:'Me’moriy atamalarni qo‘llash, turli davr binolarini solishtirish ko‘nikmasini rivojlantirish.'},
    natijalar:['Uch madrasani sanasi va qurdirgan shaxsi bilan aytadi','Peshtoq, ayvon, minora, gumbaz atamalarini modelda ko‘rsatadi','Temuriylar me’morchiligi belgilarini sanaydi','Registon ansamblining shakllanish davrini hisoblaydi'],
    jihozlar:['MAKON sahnasi «Registon» (3D model)','Proyektor','Registon fotosuratlari','Tarqatma: «me’mor daftari»'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Registon surati: «Bu binolar bir vaqtda qurilganmi?»','Taxmin aytadi.'],
      ['8–25','<b>3D model.</b> MAKON bosqichlari: maydon → Ulug‘bek → minoralar → Sherdor → Tillakori → temuriylar an’anasi.','«Me’mor daftari»ni to‘ldiradi.'],
      ['25–32','<b>Juftlikda solishtirish.</b> Ulug‘bek va Sherdor madrasalarini taqqoslash.','Venn diagrammasi tuzadi.'],
      ['32–42','<b>Mustahkamlash.</b> Amaliyot va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Peshtoq','Kirish portali.'],['Minora','Baland mezana.'],['Koshin','Sirlangan plitka.']],
    savollar:[['Ulug‘bek madrasasi qachon qurilgan?','1417–1420'],['Sherdor qachon qurilgan?','1619–1636'],['Tillakori qachon qurilgan?','1646–1660'],['Ansamblni YUNESKO qachon ro‘yxatga olgan?','2001-yil']],
    uy:'Temuriylar davrining bitta yodgorligi (Go‘ri Amir, Bibixonim yoki Shohi Zinda) haqida ma’lumot va rasm tayyorlash; 1660 − 1417 hisobini tushuntirish.',
    manba:TD + '; ' + RGM
  }
};

/* =====================================================================
   4. BUXORO AMIRLIGI, XIVA VA QO‘QON XONLIKLARI (9-sinf)
   ===================================================================== */
const XNM = W + ': «Emirate of Bukhara», «Khanate of Khiva», «Khanate of Kokand», «Туркестанское генерал-губернаторство», «Русско-бухарский договор (1868)», «Шаарский договор», «Гендемианский мирный договор», «Завоевание Ташкента Российской империей», «Хорезмская народная советская республика»; Большая российская энциклопедия (bigenc.ru); Encyclopedia.com «Bukhara, Khanate and Emirate»; xarita asosi: Natural Earth (jamoat mulki)';
window.MAKON_DARS['tarix-xonliklar'] = {
  fan:'tarix', qisqaNom:'Xonliklar', nom:'Buxoro amirligi, Xiva va Qo‘qon xonliklari (XVIII–XIX asrlar)',
  qisqa:'9-sinf · O‘zbekiston tarixi · sxematik xarita', sinf:'9-sinf',
  sahna:'tr_xonliklar',
  kor:{
    sarlavha:'Uch davlat va imperiya',
    matn:'XVIII–XIX asrlarda hozirgi O‘zbekiston hududida uchta davlat bo‘lgan: Buxoro amirligi (mang‘itlar sulolasi), Xiva xonligi (qo‘ng‘irotlar) va Qo‘qon xonligi (minglar). XIX asrning ikkinchi yarmida Rossiya imperiyasi ularni birin-ketin bosib olgan yoki o‘ziga qaram qilgan. Xaritada uchta holatni almashtiring va shaharlarni bosing. Chegaralar sxematik — ular qo‘lda chizilgan va taxminiy.',
    punktlar:[
      '<b>Buxoro amirligi</b> — mang‘itlar, 1756/1785–1920; poytaxti Buxoro',
      '<b>Xiva xonligi</b> — qo‘ng‘irotlar sulolasi 1804-yildan; poytaxti Xiva',
      '<b>Qo‘qon xonligi</b> — 1709-yilda asos solingan, 1876-yilda tugatilgan',
      '<b>1867</b> — markazi Toshkent bo‘lgan Turkiston general-gubernatorligi tuzilgan'
    ]
  },
  bolimlar:[
    {sarlavha:'Uch davlat', jadval:[
      ['Buxoro amirligi','Mang‘itlar sulolasi. Muhammad Rahim 1747-yildan otaliq, 1753 yoki 1756-yildan xon (manbalarda farq bor); Shohmurod (1785–1800) «amir» unvonini olgan. Shaharlar: Buxoro, Samarqand (1868-yilgacha), Qarshi, Shahrisabz, Termiz'],
      ['Xiva xonligi','Qo‘ng‘irot inoqlari 1763-yildan hokimiyatda; Eltuzar 1804-yilda o‘zini xon deb e’lon qilgan. Muhammad Rahimxon II (Feruz, 1864–1910). Shaharlar: Xiva, Urganch, Hazorasp, Qo‘ng‘irot'],
      ['Qo‘qon xonligi','Minglar sulolasi. Shohruxbiy 1709-yilda asos solgan; Olimxon birinchi bo‘lib xon unvonini olgan (1798–1810 atrofida, manbalarda farq bor). Umarxon, Madalixon, Xudoyorxon. Shaharlar: Qo‘qon, Toshkent (taxm. 1809-yildan), Andijon, Namangan, Marg‘ilon, Xo‘jand'],
      ['Turkiston general-gubernatorligi','1867-yil 11 (23)-iyul farmoni bilan tuzilgan; markazi Toshkent; birinchi general-gubernator K. P. fon Kaufman (1867–1882)']
    ], matn:'XIX asr Rossiya sanalari ikki xil beriladi: eski (Yulian) va yangi (Grigorian) uslub; XIX asrda farq 12 kun. Masalan, 1876-yil 19-fevral (eski uslub) = 2-mart (yangi uslub).'},
    {sarlavha:'Bosqin xronologiyasi', jadval:[
      ['1853','Oqmachit (Qo‘qon qal’asi) — V. Perovskiy'],
      ['1864','Turkiston va Chimkent'],
      ['1865-yil 15–17-iyun','Toshkent — M. Chernyayev qo‘shini'],
      ['1866','Xo‘jand va Jizzax'],
      ['1868-yil 2 (14)-may','Samarqand — K. Kaufman; 23-iyun (5-iyul) Buxoro bilan sulh'],
      ['1873-yil 29-may (10-iyun)','Xiva; 12 (24)-avgust Gandimiyon shartnomasi — xonlik qaram'],
      ['1873-yil 28-sentabr (10-oktabr)','Shahar (Shaar) shartnomasi — Buxoro protektorati rasmiylashgan'],
      ['1876-yil 19-fevral (2-mart)','Qo‘qon xonligi tugatilib, Farg‘ona viloyati tuzilgan']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'XIX asr o‘rtasi: uch davlat', matn:'Xaritada uchta davlat: g‘arbda Xiva xonligi (Xorazm vohasi), markazda Buxoro amirligi (Zarafshon va Qashqadaryo vohalari), sharqda Qo‘qon xonligi (Farg‘ona vodiysi, Toshkent va Sirdaryo bo‘yi). Ular o‘zaro tez-tez urushgan; chegaralar, ayniqsa ko‘chmanchi hududlarda, aniq bo‘lmagan.', holat:{davr:0}},
    {sarlavha:'Buxoro amirligi', matn:'Mang‘itlar sulolasi XVIII asr o‘rtasida hokimiyatga kelgan. Shohmurod (1785–1800) «amir al-mo‘minin» unvonini olgan, shuning uchun davlat amirlik deb atalgan. Amir Nasrullo (1827–1860) markaziy hokimiyatni kuchaytirgan. Poytaxti — Buxoro.', holat:{davr:0, xonlik:'buxoro'}},
    {sarlavha:'Xiva xonligi', matn:'Xorazm vohasidagi davlatda qo‘ng‘irot inoqlari 1763-yildan amalda hokim bo‘lgan; 1804-yilda Eltuzar o‘zini xon deb e’lon qilgan. Olloqulixon 1839-yilgi Perovskiy yurishini qaytargan. Poytaxti — Xiva.', holat:{davr:0, xonlik:'xiva'}},
    {sarlavha:'Qo‘qon xonligi', matn:'1709-yilda Shohruxbiy asos solgan. XIX asr boshida Toshkent va Sirdaryo bo‘yidagi yerlar qo‘shib olingan; 1830-yillarda xonlik eng katta hududga ega bo‘lgan. Poytaxti — Qo‘qon.', holat:{davr:0, xonlik:'qoqon'}},
    {sarlavha:'Rossiya bosqini (1853–1876)', matn:'Rossiya qo‘shinlari shimoldan ikki yo‘nalishda — Sirdaryo bo‘ylab va Yettisuvdan — kirib kelgan. Toshkent 1865-yilda, Samarqand 1868-yilda, Xiva 1873-yilda egallangan; Qo‘qon xonligi 1876-yilda tugatilgan. Mahalliy aholi qattiq qarshilik ko‘rsatgan.', holat:{davr:1}},
    {sarlavha:'Protektorat va Turkiston (1876–1917)', matn:'Buxoro amirligi (1868 va 1873-yil shartnomalari) va Xiva xonligi (1873) Rossiyaning qaram davlatiga — protektoratiga aylangan: tashqi siyosat Rossiya qo‘lida, ichki boshqaruv amir va xonda qolgan. Qolgan hududlar Turkiston general-gubernatorligiga kirgan.', holat:{davr:2}},
    {sarlavha:'Yakun: 1920-yil', matn:'1920-yil fevralida Xivaning so‘nggi xoni taxtdan voz kechgan, 26-aprelda Xorazm Xalq Sovet Respublikasi e’lon qilingan. 1920-yil 2-sentabrda Qizil Armiya Buxoroni egallagan, 8-oktabrda Buxoro Xalq Sovet Respublikasi e’lon qilingan.', holat:{davr:2, xonlik:'buxoro'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Shaharni xaritada toping', holat:{davr:0, yashir:true},
    topshiriqlar:[
      {shart:'Shahar nomlari yashirilgan. <b>Buxoro amirligi poytaxti</b>ni toping.', hodisa:'tr-shahar', kod:"ev.shahar==='buxoro'", izoh:'To‘g‘ri — <b>Buxoro</b>, Zarafshon vohasining g‘arbida.'},
      {shart:'<b>Xiva xonligi poytaxti</b>ni toping — Amudaryo quyi oqimida.', hodisa:'tr-shahar', kod:"ev.shahar==='xiva'", izoh:'To‘g‘ri — <b>Xiva</b>.'},
      {shart:'<b>Qo‘qon xonligi poytaxti</b>ni toping — Farg‘ona vodiysida.', hodisa:'tr-shahar', kod:"ev.shahar==='qoqon'", izoh:'To‘g‘ri — <b>Qo‘qon</b>.'},
      {shart:'1865-yilda egallangan, 1867-yildan Turkiston general-gubernatorligi markazi bo‘lgan shaharni toping.', hodisa:'tr-shahar', kod:"ev.shahar==='toshkent'", izoh:'To‘g‘ri — <b>Toshkent</b>.'},
      {shart:'1868-yil mayida Kaufman qo‘shini egallagan, Amir Temur poytaxti bo‘lgan shaharni toping.', hodisa:'tr-shahar', kod:"ev.shahar==='samarqand'", izoh:'To‘g‘ri — <b>Samarqand</b>.'}
    ]},
  test:[
    {s:'Buxoro amirligida qaysi sulola hukmronlik qilgan?', v:['Minglar','Qo‘ng‘irotlar','Mang‘itlar','Ashtarxoniylar'], t:2, izoh:'<b>Mang‘itlar</b>. Qo‘ng‘irotlar — Xiva, minglar — Qo‘qon; ashtarxoniylar mang‘itlardan oldin Buxoroda hukmronlik qilgan.'},
    {s:'Qo‘qon xonligiga qachon asos solingan?', v:['1598','1709','1785','1804'], t:1, izoh:'<b>1709-yilda</b> Shohruxbiy asos solgan. 1804 — Eltuzar Xivada xon bo‘lgan yil.'},
    {s:'Eltuzar qaysi davlatda 1804-yilda o‘zini xon deb e’lon qilgan?', v:['Buxoro amirligi','Xiva xonligi','Qo‘qon xonligi','Qozoq xonligi'], t:1, izoh:'<b>Xiva xonligi</b>da — qo‘ng‘irotlar sulolasining birinchi xoni.'},
    {s:'Toshkent qachon Rossiya qo‘shinlari tomonidan egallangan?', v:['1853','1865','1868','1876'], t:1, izoh:'<b>1865-yil iyunida</b> (15–17-iyun, eski uslub) M. Chernyayev qo‘shini.'},
    {s:'Turkiston general-gubernatorligi qachon tuzilgan?', v:['1865','1867','1873','1876'], t:1, izoh:'<b>1867-yil</b> 11 (23)-iyul farmoni bilan; markazi Toshkent, birinchi general-gubernator K. fon Kaufman.'},
    {s:'Xiva xonligining Rossiyaga qaramligini rasmiylashtirgan shartnoma qaysi?', v:['Gandimiyon shartnomasi (1873)','Shahar shartnomasi (1873)','1868-yilgi sulh','Oxal shartnomasi'], t:0, izoh:'<b>Gandimiyon shartnomasi</b> — 1873-yil 12 (24)-avgust. Shahar shartnomasi — Buxoro bilan.'},
    {s:'Qo‘qon xonligi qachon tugatilgan?', v:['1868','1873','1876','1920'], t:2, izoh:'<b>1876-yil</b> 19-fevral (yangi uslubda 2-mart); o‘rnida Farg‘ona viloyati tuzilgan.'},
    {s:'Protektorat nima?', v:['Mustaqil respublika','Tashqi siyosati boshqa davlat nazoratidagi qaram davlat','Harbiy qal’a','Savdo ittifoqi'], t:1, izoh:'<b>Protektorat</b> — ichki boshqaruvi saqlangan, lekin tashqi siyosati kuchli davlat qo‘lida bo‘lgan qaram davlat.'},
    {s:'Buxoro Xalq Sovet Respublikasi qachon e’lon qilingan?', v:['1917-yil noyabr','1920-yil 26-aprel','1920-yil 8-oktabr','1924-yil 27-oktabr'], t:2, izoh:'<b>1920-yil 8-oktabr</b>. 26-aprel 1920 — Xorazm Xalq Sovet Respublikasi.'},
    {tur:'3d', s:'Xaritada Qo‘qon xonligi tarkibida bo‘lgan va <b>1865-yilda</b> Rossiya qo‘shinlari egallagan shaharni bosing.', hodisa:'tr-shahar', kalit:'shahar', togri:['toshkent'], v:['Toshkent', 'boshqa shahar'], t:0,
     izoh:'<b>Toshkent</b> — 1865-yil iyunida M. Chernyayev qo‘shini egallagan; 1867-yildan Turkiston general-gubernatorligi markazi.'}
  ],
  yordamchi:[
    {s:'Nega sanalar ikki xil?', j:'Rossiyada 1918-yilgacha Yulian taqvimi (eski uslub) ishlatilgan. XIX asrda u Grigorian taqvimidan 12 kun orqada bo‘lgan. Shuning uchun masalan Qo‘qon xonligining tugatilishi 19-fevral (eski) yoki 2-mart (yangi uslub) deb yoziladi.', kalit:['sana','uslub','taqvim']},
    {s:'Chegaralar qanchalik aniq?', j:'Xaritadagi chegaralar sxematik va qo‘lda chizilgan. XIX asrda davlatlar chegarasi ko‘pincha aniq belgilanmagan, ko‘chmanchi qabilalar yerlari va tog‘li bekliklar (Hisor, Ko‘lob, Qorategin) bir davlatdan boshqasiga o‘tib turgan.', kalit:['chegara','xarita','aniq']}
  ],
  maqola:[
    {sarlavha:'Uch davlatning paydo bo‘lishi', xatboshilar:[
      'XVIII asr boshida Buxoro xonligi zaiflashgan. 1709-yilda Farg‘ona vodiysida minglar urug‘idan Shohruxbiy mustaqil davlatga asos solgan — bu Qo‘qon xonligining boshlanishi edi. 1740-yilda Eron hukmdori Nodirshoh Buxoro va Xivaga yurish qilgan. Undan keyin Buxoroda mang‘it urug‘idan Muhammad Rahim hokimiyatni qo‘lga olgan (1747-yildan otaliq, 1753 yoki 1756-yildan xon — manbalarda farq bor).',
      'Mang‘itlardan Shohmurod (1785–1800) «amir al-mo‘minin» unvonini olgan va davlat Buxoro amirligi deb atala boshlagan. Xorazmda esa qo‘ng‘irot urug‘idan bo‘lgan inoqlar 1763-yildan amalda hokim bo‘lib, 1804-yilda Eltuzar o‘zini xon deb e’lon qilgan. Shunday qilib, uchta davlatda ham o‘zbek urug‘laridan chiqqan sulolalar hukmronlik qilgan.'
    ]},
    {sarlavha:'Ichki hayot va o‘zaro urushlar', xatboshilar:[
      'Uchala davlatda ham hokimiyat hukmdor qo‘lida bo‘lgan, viloyatlarni beklar boshqargan. Aholi dehqonchilik, hunarmandchilik va savdo bilan shug‘ullangan; Buxoro, Xiva va Qo‘qon yirik savdo va ilm markazlari bo‘lgan. Xiva shahrida bu davrda ko‘plab madrasa va saroylar qurilgan (Ichan qal’a — YUNESKO, 1990).',
      'Davlatlar o‘rtasida chegara hududlar — O‘ratepa, Jizzax, Toshkent atrofi, Marv — uchun tez-tez urushlar bo‘lgan. Masalan, Buxoro amiri Nasrullo 1842-yilda Qo‘qonni vaqtincha egallagan. Bu urushlar davlatlarni zaiflashtirgan va keyinchalik tashqi bosqinga qarshi birlashishga to‘sqinlik qilgan.'
    ]},
    {sarlavha:'Rossiya imperiyasi bosqini', xatboshilar:[
      'XIX asr o‘rtasida Rossiya imperiyasi O‘rta Osiyoga ikki yo‘nalishda — Orenburgdan Sirdaryo bo‘ylab va Sibirdan Yettisuv orqali — kirib kelgan. 1853-yilda Qo‘qonning Oqmachit qal’asi, 1864-yilda Turkiston va Chimkent egallangan. 1865-yil 15–17-iyunda (eski uslub) general M. Chernyayev qo‘shini Toshkentni egallagan. 1867-yilda markazi Toshkent bo‘lgan Turkiston general-gubernatorligi tuzilgan, birinchi general-gubernator K. P. fon Kaufman bo‘lgan.',
      '1868-yil 2 (14)-mayda Samarqand Kaufman qo‘shiniga taslim bo‘lgan; 23-iyun (5-iyul) sulhiga ko‘ra Buxoro amirligi Samarqand va Kattaqo‘rg‘onni yo‘qotgan va Rossiyaga qaram bo‘lib qolgan. 1873-yil 29-mayda (10-iyun) Xiva egallangan, 12 (24)-avgustdagi Gandimiyon shartnomasiga ko‘ra xon Rossiya imperatorining vassaliga aylangan; Amudaryoning o‘ng qirg‘og‘i Rossiyaga o‘tgan. 1873-yil 28-sentabrdagi (10-oktabr) Shahar shartnomasi Buxoroning protektorat maqomini rasmiylashtirgan.',
      'Qo‘qon xonligida 1873–1876-yillarda Xudoyorxonga qarshi xalq qo‘zg‘oloni ko‘tarilgan. Rossiya qo‘shinlari uni bostirgan va 1876-yil 19-fevral (2-mart) farmoni bilan xonlik tugatilib, Farg‘ona viloyati tuzilgan.'
    ]},
    {sarlavha:'Protektorat davri va 1920-yil', xatboshilar:[
      'Buxoro amirligi va Xiva xonligi 1917-yilgacha Rossiya protektorati bo‘lib qolgan: amir va xon ichki boshqaruvni saqlagan, lekin tashqi siyosat va harbiy masalalar Rossiya nazoratida bo‘lgan. Hududda temir yo‘llar qurilgan, paxtachilik kengaygan. XX asr boshida jadidlar — ta’lim va jamiyatni isloh qilish tarafdorlari — harakati kuchaygan.',
      '1920-yilda ikkala davlat ham tugatilgan: fevralda Xiva xoni Said Abdullaxon taxtdan voz kechgan va 26-aprelda Xorazm Xalq Sovet Respublikasi e’lon qilingan; 2-sentabrda Qizil Armiya Buxoroni egallagan, 8-oktabrda Buxoro Xalq Sovet Respublikasi e’lon qilingan.'
    ]}
  ],
  formulalar:[
    ['19-fevral + 12 kun = 2-mart (1876)','Eski uslubdan yangi uslubga (XIX asr, 1876 — kabisa yili)'],
    ['1876 − 1709 = 167 yil','Qo‘qon xonligi mavjud bo‘lgan davr'],
    ['1920 − 1868 = 52 yil','Buxoro amirligining Rossiyaga qaramlik davri'],
    ['1876 − 1853 = 23 yil','Oqmachitdan Qo‘qon xonligining tugatilishigacha']
  ],
  qiziqarli:[
    'Xivadagi Ichan qal’a — O‘zbekistonning YUNESKO ro‘yxatiga birinchi bo‘lib kiritilgan yodgorligi (1990).',
    'Xiva xoni Muhammad Rahimxon II «Feruz» taxallusi bilan she’rlar yozgan va shoirlarni qo‘llab-quvvatlagan.',
    'Qo‘qondagi Xudoyorxon o‘rdasi bugun muzey — uning koshinli peshtoqi uzoqdan ko‘rinadi.',
    'Oqmachit qal’asi egallangandan so‘ng Perovsk deb atalgan — hozirgi Qizilo‘rda (Qozog‘iston).'
  ],
  lugat:[
    ['Amirlik','Amir boshqaradigan davlat.'],
    ['Xonlik','Xon boshqaradigan davlat.'],
    ['Sulola','Bir oiladan chiqqan hukmdorlar ketma-ketligi.'],
    ['Otaliq','Buxoroda yuqori davlat lavozimi.'],
    ['Inoq','Xivada yuqori davlat lavozimi.'],
    ['Beklik','Bek boshqaradigan viloyat.'],
    ['Protektorat','Tashqi siyosati boshqa davlat nazoratidagi qaram davlat.'],
    ['General-gubernatorlik','Rossiya imperiyasining harbiy-ma’muriy hududi.'],
    ['Vassal','Kuchliroq hukmdorga bo‘ysunuvchi hukmdor.'],
    ['Jadidlar','XIX oxiri – XX asr boshidagi islohotchi ma’rifatparvarlar.']
  ],
  manba:TD + ' (8–9-sinf); ' + XNM + '. Manbalar farqi: Muhammad Rahimning xon unvoni 1753 yoki 1756; Olimxon hukmronligi 1798/1799–1809/1811 (manbalarda turlicha); Nasrullo hukmronligi boshlanishi 1826 yoki 1827; Rossiya sanalari eski va yangi uslubda berilgan. Xaritadagi chegaralar sxematik (qo‘lda chizilgan, taxminiy); historical-basemaps ma’lumotlarida xonliklar alohida chizilmagani uchun ishlatilmadi.',
  ishlanma:{
    sinf:'9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'Interaktiv xarita, xronologik jadval, guruhlarda ishlash, muammoli savol',
    maqsad:{talimiy:'Buxoro amirligi, Xiva va Qo‘qon xonliklari, ularning sulolalari, Rossiya bosqini va protektorat davri bilan tanishtirish.',
      tarbiyaviy:'Vatan tarixiga hurmat, tarixiy voqealarni xolis baholash ko‘nikmasini tarbiyalash.',
      rivojlantiruvchi:'Xarita bilan ishlash, eski va yangi uslubdagi sanalarni solishtirish, sabab-oqibatni aniqlash ko‘nikmasini rivojlantirish.'},
    natijalar:['Uch davlatni sulolasi va poytaxti bilan aytadi','Bosqin xronologiyasini tuzadi','Protektorat tushunchasini izohlaydi','Eski va yangi uslub sanalarini farqlaydi'],
    jihozlar:['MAKON sahnasi «Xonliklar» (sxematik xarita)','Proyektor','Tarixiy atlas','Tarqatma: xronologik jadval'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Nega uch davlat birlashib, bosqinga qarshi tura olmadi?» — muammoli savol.','Taxmin aytadi.'],
      ['8–22','<b>Xarita.</b> MAKON bosqichlari: uch davlat → Buxoro → Xiva → Qo‘qon.','Jadvalga sulola va poytaxtni yozadi.'],
      ['22–32','<b>Bosqin va protektorat.</b> Xaritada 1853–1876 strelkalari, keyin 1876–1917 holati.','Xronologik jadvalni to‘ldiradi.'],
      ['32–42','<b>Mustahkamlash.</b> «Shaharni toping» amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Protektorat','Qaram davlat.'],['Sulola','Hukmdorlar oilasi.'],['General-gubernatorlik','Harbiy-ma’muriy hudud.']],
    savollar:[['Qo‘qon xonligi qachon tugatilgan?','1876-yil (19-fevral / 2-mart)'],['Toshkent qachon egallangan?','1865-yil iyun'],['Xiva qachon egallangan?','1873-yil'],['Turkiston general-gubernatorligi markazi?','Toshkent']],
    uy:'Kontur xaritaga uch davlat poytaxtlarini va bosqin yillarini yozish; eski uslubdagi 1873-yil 12-avgustni yangi uslubga o‘tkazish (javob: 24-avgust).',
    manba:TD + '; ' + XNM
  }
};

/* =====================================================================
   5. MUSTAQILLIK VA DAVLAT RAMZLARI (10–11-sinf)
   ===================================================================== */
const MQM = 'O‘zbekiston Respublikasi qonunlari (lex.uz): «Davlat tili haqida» (1989-yil 21-oktabr, lex.uz/docs/-109394), «Mustaqillik deklaratsiyasi» (1990-yil 20-iyun, lex.uz/docs/-185391), «Davlat bayrog‘i to‘g‘risida» (1991-yil 18-noyabr, № 407-XII, lex.uz/docs/-100122), «Davlat gerbi to‘g‘risida» (1992-yil 2-iyul, № 616-XII, lex.uz/acts/-17260), «Davlat madhiyasi to‘g‘risida» (1992-yil 10-dekabr, № 768-XII, lex.uz/docs/-38608); BMT Bosh Assambleyasi rezolyutsiyasi 46/226 (1992-yil 2-mart), Xavfsizlik Kengashi rezolyutsiyasi 737; gov.uz «Davlat ramzlari»; ' + W + ': «Flag of Uzbekistan», «Emblem of Uzbekistan», «1991 Uzbek independence referendum», «2023 Uzbek constitutional referendum»; gazeta.uz (2023-yil 1-may)';
window.MAKON_DARS['tarix-mustaqillik'] = {
  fan:'tarix', qisqaNom:'Mustaqillik', nom:'O‘zbekiston mustaqilligi (1991) va davlat ramzlari',
  qisqa:'10–11-sinf · O‘zbekiston tarixi · 3D bayroq, gerb va vaqt chizig‘i', sinf:'10–11-sinf',
  sahna:'tr_mustaqillik',
  kor:{
    sarlavha:'Mustaqillik yo‘li va uning ramzlari',
    matn:'1989–1992-yillarda O‘zbekiston ittifoqdosh respublikadan mustaqil davlatga aylangan: davlat tili haqida qonun, Mustaqillik deklaratsiyasi, 1991-yil 31-avgustda mustaqillik e’lon qilinishi, referendum, BMT a’zoligi va Konstitutsiya. Sahnada qonun bo‘yicha o‘lchamlari chizilgan Davlat bayrog‘i, soddalashtirilgan Davlat gerbi va voqealar vaqt chizig‘i bor. Bayroq yoki gerb qismini bosing — ma’nosi chiqadi.',
    punktlar:[
      '<b>1991-yil 31-avgust</b> — Oliy Kengash davlat mustaqilligini e’lon qilgan; 1-sentabr — Mustaqillik kuni',
      '<b>Bayroq</b> (1991-yil 18-noyabr): nisbati 1 : 2, moviy, oq, yashil yo‘llar, ingichka qizil hoshiyalar, yarim oy va 12 yulduz',
      '<b>Gerb</b> (1992-yil 2-iyul): Humo qushi, quyosh, vodiy, bug‘doy va g‘o‘za chambari, sakkizburchak',
      '<b>1992-yil 2-mart</b> — BMT a’zoligi; <b>8-dekabr</b> — Konstitutsiya; <b>10-dekabr</b> — madhiya qonuni'
    ]
  },
  bolimlar:[
    {sarlavha:'Vaqt chizig‘i 1989–1992', jadval:[
      ['1989-yil 21-oktabr','«Davlat tili haqida» qonun — o‘zbek tili davlat tili'],
      ['1990-yil 24-mart','Prezidentlik lavozimi joriy etilgan; Oliy Kengash I. Karimovni Prezident etib saylagan'],
      ['1990-yil 20-iyun','Mustaqillik deklaratsiyasi (ba’zi manbalarda — suverenitet deklaratsiyasi)'],
      ['1991-yil 31-avgust','Davlat mustaqilligi e’lon qilingan; «Davlat mustaqilligining asoslari to‘g‘risida» qonun'],
      ['1991-yil 18-noyabr','«Davlat bayrog‘i to‘g‘risida» qonun'],
      ['1991-yil 29-dekabr','Mustaqillik bo‘yicha referendum (rasmiy natija: 98,26 % «ha», ishtirok 94,14 %) va birinchi umumxalq Prezident saylovi'],
      ['1992-yil 2-mart','BMT a’zoligiga qabul qilingan (Bosh Assambleya rezolyutsiyasi 46/226)'],
      ['1992-yil 2-iyul','«Davlat gerbi to‘g‘risida» qonun'],
      ['1992-yil 8-dekabr','O‘zbekiston Respublikasi Konstitutsiyasi qabul qilingan'],
      ['1992-yil 10-dekabr','«Davlat madhiyasi to‘g‘risida» qonun']
    ]},
    {sarlavha:'Bayroq — qonundagi o‘lchamlar', jadval:[
      ['Umumiy o‘lcham','250 × 125 sm (nisbat 1 : 2)'],
      ['Yo‘llar','moviy, oq, yashil — har biri 40 sm'],
      ['Qizil hoshiyalar','oq yo‘lning ikki chetida, har biri 2,5 sm (40 · 3 + 2,5 · 2 = 125)'],
      ['Yarim oy va yulduzlar','moviy yo‘lda, dastadan 20 sm, 75 × 30 sm to‘rtburchak ichida; yarim oy 30 sm doiraga, har yulduz 6 sm doiraga sig‘adi'],
      ['Yulduzlar','12 ta, uch qatorda: 3, 4, 5'],
      ['Ranglar','qonunda aniq rang kodi yo‘q — sahnadagi tuslar taxminiy']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Uch ramz va vaqt chizig‘i', matn:'Chapda — Davlat bayrog‘i, o‘ngda — Davlat gerbi, oldinda — 1989–1992-yillar vaqt chizig‘i. Har birini bosib, ma’nosini bilib oling.', holat:{korinish:null}},
    {sarlavha:'1989–1990: birinchi qadamlar', matn:'1989-yil 21-oktabrda o‘zbek tiliga davlat tili maqomi berilgan. 1990-yil 24-martda respublikada Prezidentlik lavozimi joriy etilgan. 1990-yil 20-iyunda Oliy Kengash Mustaqillik deklaratsiyasini qabul qilgan.', holat:{korinish:'sana', sana:'deklaratsiya'}},
    {sarlavha:'1991-yil 31-avgust', matn:'SSSR inqirozi sharoitida O‘zbekiston Oliy Kengashi davlat mustaqilligini e’lon qilgan va «Davlat mustaqilligining asoslari to‘g‘risida» qonun qabul qilgan. 1-sentabr — Mustaqillik kuni, umumxalq bayrami.', holat:{korinish:'sana', sana:'mustaqillik'}},
    {sarlavha:'Davlat bayrog‘i', matn:'1991-yil 18-noyabrdagi qonunga ko‘ra bayroq nisbati 1 : 2; moviy, oq va yashil yo‘llar teng (40 sm), oq yo‘l ikki tomondan 2,5 sm li qizil hoshiya bilan ajratilgan. Moviy yo‘lda yarim oy va 12 yulduz. Ranglar ma’nosi qonunda yozilmagan — ular an’anaviy talqin.', holat:{korinish:'bayroq'}},
    {sarlavha:'Referendum va BMT', matn:'1991-yil 29-dekabrda referendumda mustaqillik qo‘llab-quvvatlangan (rasmiy natijaga ko‘ra 98,26 %) va birinchi umumxalq Prezident saylovi o‘tkazilgan. 1992-yil 2-martda O‘zbekiston BMT a’zosi bo‘lgan.', holat:{korinish:'sana', sana:'bmt'}},
    {sarlavha:'Davlat gerbi', matn:'1992-yil 2-iyuldagi qonun: gullagan vodiy uzra quyosh, tog‘lar va daryolar, so‘l tomoni bug‘doy boshoqlari, o‘ng tomoni g‘o‘za shoxlaridan chambar; yuqorida — hurlik ramzi sakkizburchak, markazda — baxt va erksevarlik ramzi Humo qushi.', holat:{korinish:'gerb'}},
    {sarlavha:'Konstitutsiya va madhiya', matn:'1992-yil 8-dekabrda Konstitutsiya qabul qilingan (8-dekabr — Konstitutsiya kuni), 10-dekabrda Davlat madhiyasi to‘g‘risidagi qonun qabul qilingan: so‘zlari Abdulla Oripov, musiqasi Mutal Burhonov. 2023-yil 30-aprelda referendumda Konstitutsiyaning yangi tahriri qabul qilingan.', holat:{korinish:'sana', sana:'konstitutsiya'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Ramz va sanani toping',
    topshiriqlar:[
      {shart:'Bayroqdagi <b>12 yulduz</b>dan istalganini bosing.', hodisa:'tr-ramz', kod:"ev.qism==='yulduz'", izoh:'To‘g‘ri — <b>yulduzlar</b> moviy yo‘lda, 3, 4, 5 qator bo‘lib joylashgan.'},
      {shart:'Bayroqdagi <b>qizil hoshiya</b>ni bosing (ingichka chiziq).', hodisa:'tr-ramz', kod:"ev.qism==='qizil'", izoh:'To‘g‘ri — <b>qizil hoshiya</b>, eni 2,5 sm.'},
      {shart:'Gerbdagi <b>Humo qushi</b>ni bosing.', hodisa:'tr-ramz', kod:"ev.qism==='humo'", izoh:'To‘g‘ri — <b>Humo</b>: qonunda baxt va erksevarlik ramzi.'},
      {shart:'Gerbning yuqorisidagi <b>hurlik ramzi</b>ni bosing.', hodisa:'tr-ramz', kod:"ev.qism==='sakkiz'", izoh:'To‘g‘ri — <b>sakkizburchak</b>, ichida yarim oy va yulduz.'},
      {shart:'Vaqt chizig‘ida <b>BMT a’zoligi</b> sanasini bosing.', hodisa:'tr-sana', kod:"ev.k==='bmt'", izoh:'To‘g‘ri — <b>1992-yil 2-mart</b>.'}
    ]},
  test:[
    {s:'O‘zbekiston davlat mustaqilligi qachon e’lon qilingan?', v:['1990-yil 20-iyun','1991-yil 31-avgust','1991-yil 29-dekabr','1992-yil 8-dekabr'], t:1, izoh:'<b>1991-yil 31-avgust</b>da Oliy Kengash e’lon qilgan; 1-sentabr — Mustaqillik kuni.'},
    {s:'Davlat bayrog‘i to‘g‘risidagi qonun qachon qabul qilingan?', v:['1991-yil 18-noyabr','1992-yil 2-iyul','1992-yil 10-dekabr','1990-yil 24-mart'], t:0, izoh:'<b>1991-yil 18-noyabr</b>. 2-iyul 1992 — gerb, 10-dekabr 1992 — madhiya.'},
    {s:'Qonunga ko‘ra bayroqning eni va bo‘yi nisbati qanday?', v:['2 : 3','1 : 2','3 : 5','1 : 1'], t:1, izoh:'<b>1 : 2</b> — 125 × 250 sm.'},
    {s:'Bayroqdagi yulduzlar soni va joylashuvi qanday?', v:['12 ta: 3, 4, 5 qatorda','12 ta: doira shaklida','14 ta: ikki qatorda','9 ta: uch qatorda'], t:0, izoh:'<b>12 yulduz</b>, uch qatorda: 3, 4 va 5.'},
    {s:'Qonunga ko‘ra gerbdagi Humo qushi nimaning ramzi?', v:['Hurlik','Baxt va erksevarlik','Boylik','Tinchlik'], t:1, izoh:'Gerb qonunida Humo — <b>baxt va erksevarlik ramzi</b>; sakkizburchak — hurlik ramzi.'},
    {s:'O‘zbekiston BMT a’zoligiga qachon qabul qilingan?', v:['1991-yil 1-sentabr','1992-yil 2-mart','1992-yil 8-dekabr','1993-yil 2-mart'], t:1, izoh:'<b>1992-yil 2-mart</b> (Bosh Assambleya rezolyutsiyasi 46/226).'},
    {s:'O‘zbekiston Konstitutsiyasi qachon qabul qilingan?', v:['1991-yil 31-avgust','1992-yil 8-dekabr','1992-yil 10-dekabr','1991-yil 18-noyabr'], t:1, izoh:'<b>1992-yil 8-dekabr</b>. 10-dekabr — madhiya qonuni.'},
    {s:'Davlat madhiyasi so‘zlari muallifi kim?', v:['Erkin Vohidov','Abdulla Oripov','Muhammad Yusuf','G‘afur G‘ulom'], t:1, izoh:'<b>Abdulla Oripov</b>; musiqasi — Mutal Burhonov.'},
    {s:'Gerb qonuniga ko‘ra chambarning so‘l tomoni nimadan iborat?', v:['G‘o‘za shoxlari','Bug‘doy boshoqlari','Tok novdalari','Zaytun novdasi'], t:1, izoh:'<b>Bug‘doy boshoqlari</b> (o‘ng tomoni — g‘o‘za). Qonundagi «so‘l» — gerbning o‘z tomonidan; tomoshabinga u o‘ngda ko‘rinadi.'},
    {tur:'3d', s:'Gerbda qonunga ko‘ra <b>baxt va erksevarlik ramzi</b> bo‘lgan qanotlarini yozgan qushni bosing.', hodisa:'tr-ramz', kalit:'qism', togri:['humo'], v:['Humo qushi', 'gerbning boshqa qismi'], t:0,
     izoh:'<b>Humo qushi</b> — gerb markazida; «Davlat gerbi to‘g‘risida»gi qonunning 3-moddasi.'}
  ],
  yordamchi:[
    {s:'Bayroq ranglari nimani anglatadi?', j:'Qonunda ranglar ma’nosi yozilmagan. An’anaviy talqinga ko‘ra: moviy — osmon va suv, oq — tinchlik va poklik, yashil — tabiat va yangilanish, qizil hoshiyalar — hayot kuchi; yarim oy — yangi tug‘ilgan respublika, 12 yulduz haqida turli talqinlar bor (tiniq osmon, 12 oy va boshqalar).', kalit:['rang','manosi','bayroq']},
    {s:'Nega gerbda bug‘doy o‘ngda ko‘rinadi, qonunda esa «so‘l»?', j:'Geraldikada tomonlar gerbni «ko‘tarib turgan» odam nuqtai nazaridan aytiladi. Qonundagi «so‘l tomoni bug‘doy» — gerbning o‘z chap tomoni; unga qarab turgan tomoshabinga esa bug‘doy o‘ngda, g‘o‘za chapda ko‘rinadi.', kalit:['gerb','bugdoy','chap','ong']}
  ],
  maqola:[
    {sarlavha:'Mustaqillik sari: 1989–1991', xatboshilar:[
      '1980-yillar oxirida SSSRda siyosiy va iqtisodiy inqiroz chuqurlashgan, ittifoqdosh respublikalarda o‘z huquqlarini kengaytirish talabi kuchaygan. O‘zbekistonda 1989-yil 21-oktabrda «Davlat tili haqida» qonun qabul qilinib, o‘zbek tiliga davlat tili maqomi berilgan.',
      '1990-yil 24-martda respublikada Prezidentlik lavozimi joriy etilgan va Oliy Kengash Islom Karimovni Prezident etib saylagan. 1990-yil 20-iyunda Oliy Kengash Mustaqillik deklaratsiyasini qabul qilgan (ba’zi manbalarda u suverenitet deklaratsiyasi deb ataladi): respublika qonunlarining ustunligi e’lon qilingan.',
      '1991-yil avgustida Moskvada davlat to‘ntarishiga urinishdan so‘ng ittifoq tezda parchalana boshlagan. 31-avgustda O‘zbekiston Oliy Kengashi davlat mustaqilligini e’lon qildi va «Davlat mustaqilligining asoslari to‘g‘risida» qonun qabul qilindi. 1-sentabr Mustaqillik kuni deb belgilangan.'
    ]},
    {sarlavha:'Xalqaro tan olinish va Konstitutsiya', xatboshilar:[
      '1991-yil 29-dekabrda mustaqillik bo‘yicha referendum o‘tkazilgan: rasmiy natijalarga ko‘ra ishtirokchilarning 98,26 % i mustaqillikni qo‘llab-quvvatlagan (ishtirok 94,14 %). Shu kuni birinchi umumxalq Prezident saylovi ham bo‘lib o‘tgan. Dekabr oyida SSSR rasman tugatilgan.',
      '1992-yil 2-martda O‘zbekiston Birlashgan Millatlar Tashkilotiga a’zo bo‘lgan (Bosh Assambleya rezolyutsiyasi 46/226). Keyingi yillarda ko‘plab davlatlar bilan diplomatik munosabatlar o‘rnatilgan.',
      '1992-yil 8-dekabrda Oliy Kengash O‘zbekiston Respublikasi Konstitutsiyasini qabul qilgan; bu kun Konstitutsiya kuni sifatida nishonlanadi. 2023-yil 30-aprelda o‘tkazilgan referendumda Konstitutsiyaning yangi tahriri qabul qilingan (Markaziy saylov komissiyasi yakuniy ma’lumotiga ko‘ra 90,21 % «ha»).'
    ]},
    {sarlavha:'Davlat ramzlari', xatboshilar:[
      '<b>Davlat bayrog‘i</b> 1991-yil 18-noyabrda qabul qilingan. Qonunga ko‘ra u 250 × 125 sm o‘lchamdagi to‘g‘ri to‘rtburchak mato: to‘q moviy, oq va to‘q yashil ko‘ndalang yo‘llar (har biri 40 sm), oq yo‘lning ikki chetida 2,5 sm li qizil hoshiyalar. Moviy yo‘lda, dastadan 20 sm masofada, 75 × 30 sm to‘rtburchak ichida oq yarim oy (30 sm doiraga sig‘adi) va uch qatorda — 3, 4, 5 tadan — 12 ta besh qirrali oq yulduz joylashgan. Qonunda ranglarning aniq kodi va ma’nosi berilmagan; ranglar ma’nosi haqidagi fikrlar — an’anaviy talqin.',
      '<b>Davlat gerbi</b> 1992-yil 2-iyulda qabul qilingan. Qonunning 3-moddasiga ko‘ra: tog‘lar, daryolar va so‘l tomoni bug‘doy boshoqlaridan, o‘ng tomoni chanoqlari ochilgan g‘o‘za shoxlaridan iborat chambarga o‘ralgan gullagan vodiy uzra quyosh zarrin nurlarini sochib turadi. Gerbning yuqorisida Respublika hurligining ramzi — sakkizburchak, uning ichida yarim oy va yulduz. Markazda baxt va erksevarlik ramzi — qanotlarini yozgan Humo qushi. Pastda davlat bayrog‘i ranglaridagi lentada «O‘zbekiston» yozuvi. Daryolar odatda Amudaryo va Sirdaryo deb izohlanadi.',
      '<b>Davlat madhiyasi</b> 1992-yil 10-dekabrda qabul qilingan. So‘zlari Abdulla Oripovniki, musiqasi Mutal Burhonovniki (kuy 1947-yilda yaratilgan). Madhiya «Serquyosh, hur o‘lkam, elga baxt, najot» satri bilan boshlanadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — Mustaqillik kunini 31-avgust deb aytish: mustaqillik 31-avgustda e’lon qilingan, bayram esa 1-sentabrda nishonlanadi. Ikkinchi xato — Konstitutsiya (8-dekabr) va madhiya qonuni (10-dekabr) sanalarini adashtirish. Uchinchi xato — bayroq ranglari ma’nosini qonundan deb aytish: qonunda ular yozilmagan. To‘rtinchi xato — gerbdagi «so‘l tomoni»ni tomoshabin nuqtai nazaridan tushunish.'
    ]}
  ],
  formulalar:[
    ['40 + 2,5 + 40 + 2,5 + 40 = 125 sm','Bayroq enining tarkibi (qonun bo‘yicha)'],
    ['250 : 125 = 2 : 1','Bayroq bo‘yi va eni nisbati'],
    ['3 + 4 + 5 = 12','Yulduzlar qatorlari'],
    ['2026 − 1991 = 35','Mustaqillik e’lon qilinganidan beri o‘tgan yillar (2026-yil 31-avgustda)']
  ],
  qiziqarli:[
    'Bayroqdagi yulduzlar qatorlari 3, 4, 5 — pastga qarab bittadan ko‘payadi.',
    'Madhiya kuyi 1947-yilda Mutal Burhonov tomonidan yaratilgan va yangi so‘zlar bilan saqlab qolingan.',
    'O‘zbekiston 1990-yilda SSSRda birinchi bo‘lib Prezidentlik lavozimini joriy etgan respublika bo‘lgan.',
    'Gerbdagi Humo — sharq afsonalarida baxt keltiruvchi qush.'
  ],
  lugat:[
    ['Mustaqillik','Davlatning ichki va tashqi siyosatini o‘zi belgilashi.'],
    ['Deklaratsiya','Rasmiy bayonot, e’lon.'],
    ['Suverenitet','Davlat hokimiyatining to‘liqligi va mustaqilligi.'],
    ['Referendum','Muhim masala bo‘yicha umumxalq ovoz berishi.'],
    ['Konstitutsiya','Davlatning asosiy qonuni.'],
    ['Davlat ramzlari','Bayroq, gerb va madhiya.'],
    ['Geraldika','Gerblarni o‘rganuvchi fan.'],
    ['BMT','Birlashgan Millatlar Tashkiloti (1945-yildan).']
  ],
  manba:TD + ' (10–11-sinf); ' + MQM + '. Eslatmalar: bayroq ranglari tusi qonunda berilmagan (sahnada keng tarqalgan taxminiy tuslar); yarim oyning ichki doirasi o‘lchami qonunda yo‘q — sahnada taxminiy; ranglar ma’nosi — an’anaviy talqin; 20-iyun deklaratsiyasi nomi manbalarda turlicha. Gerb soddalashtirilgan relyef.',
  ishlanma:{
    sinf:'10–11-sinf', vaqt:'45 daqiqa', tur:'Bilimlarni chuqurlashtirish', usul:'3D ramzlar bilan ishlash, vaqt chizig‘i, hujjat (qonun matni) tahlili, guruhlarda ishlash',
    maqsad:{talimiy:'1989–1992-yillardagi mustaqillik yo‘li, davlat ramzlari va ularning qonuniy asoslari bilan tanishtirish.',
      tarbiyaviy:'Davlat ramzlariga hurmat, fuqarolik mas’uliyatini tarbiyalash.',
      rivojlantiruvchi:'Qonun matni bilan ishlash, fakt va talqinni farqlash ko‘nikmasini rivojlantirish.'},
    natijalar:['10 ta asosiy sanani voqea bilan bog‘laydi','Bayroq o‘lchamlarini qonun bo‘yicha tushuntiradi','Gerb elementlarini va qonundagi ma’nolarini sanaydi','Qonundagi fakt va an’anaviy talqinni farqlaydi'],
    jihozlar:['MAKON sahnasi «Mustaqillik va davlat ramzlari»','Proyektor','Qonunlar matni (lex.uz)','Tarqatma: vaqt chizig‘i'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Bayroqdagi yulduzlar nechta va qanday joylashgan?» — xotiradan chizish.','Chizadi, solishtiradi.'],
      ['8–20','<b>Vaqt chizig‘i.</b> MAKON da sanalarni bosib, 1989–1992 voqealarini tartiblaydi.','Jadvalni to‘ldiradi.'],
      ['20–32','<b>Ramzlar.</b> Bayroq (qonundagi o‘lchamlar) va gerb (3-modda) — guruhlarda qonun matni bilan solishtirish.','Guruhda tahlil qiladi.'],
      ['32–42','<b>Mustahkamlash.</b> Amaliyot va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Referendum','Umumxalq ovoz berishi.'],['Konstitutsiya','Asosiy qonun.'],['Suverenitet','Davlat hokimiyatining mustaqilligi.']],
    savollar:[['Mustaqillik qachon e’lon qilingan?','1991-yil 31-avgust'],['BMT a’zoligi?','1992-yil 2-mart'],['Konstitutsiya?','1992-yil 8-dekabr'],['Bayroq nisbati?','1 : 2']],
    uy:'Bayroqni qonundagi o‘lchamlar bo‘yicha 1 : 5 masshtabda (50 × 25 sm) chizish; gerb elementlari jadvalini tuzish; 1989–1992 vaqt chizig‘ini daftarga chizish.',
    manba:TD + '; ' + MQM
  }
};

/* =====================================================================
   DETAL KARTALARI
   ===================================================================== */
const DT = {
  tr_makon:{
    selungur:{nom:'Selung‘ur g‘ori', sarlavha2:'Farg‘ona vodiysi (hozirgi Qirg‘iziston, Haydarkon)', jadval:[['Tadqiqotchi','U. Islomov (1980-yildan); dastlab 1950-yillarda A. Okladnikov'],['Topilmalar','~1500 tosh buyum, ~4000 hayvon suyagi, bola yelka suyagi'],['Darsliklarda','1–1,5 mln yil, «Farg‘ontrop»'],['Zamonaviy sana','~110–170 ming yil (U/Th, TL)']], matn:'Keyingi tadqiqotlar tishlarning ko‘pchiligi g‘or ayig‘iniki ekanini ko‘rsatgan; faqat yelka suyagi aniq odamniki. Sana masalasida olimlar hali bahslashadi.', manba:'ru.wikipedia «Сельунгур»; pages.vassar.edu/central-asia-sites; Glantz va boshq. (2004), Viola (2009)'},
    kolbuloq:{nom:'Ko‘lbuloq', sarlavha2:'Ohangaron vodiysi, Toshkent viloyati', jadval:[['Turi','Ochiq manzilgoh'],['Tadqiqotchi','M. R. Qosimov (1960–1980-yillar)'],['Darsliklarda','ilk paleolit (ashel)'],['Yangi tadqiqot','OSL: dastlab 53 ± 10 va 50 ± 5 ming yil (2014); keyingi qatlamlar bo‘yicha 39 ± 4 – 82 ± 9 ming yil (2016)']], matn:'Yangi qazishmalar mualliflari ilk paleolit qatlami yo‘q, faqat o‘rta va so‘nggi paleolit bor degan xulosaga kelgan. Bu masala hali ham muhokama qilinmoqda.', manba:'Quaternary International (2014); Archaeological and Anthropological Sciences (2016)'},
    teshiktosh:{nom:'Teshiktosh g‘ori', sarlavha2:'Boysuntog‘, Surxondaryo · o‘rta paleolit', jadval:[['Topgan','A. P. Okladnikov, 1938 (qazish 1938–1939)'],['Balandlik','~1500 m'],['Topilma','8–11 yoshli bola skeleti (ruscha manbada 8–9)'],['DNK','2007 — neandertal ekani tasdiqlangan'],['Sana','~70 ming yil (baholar 130–45 ming)']], matn:'Beshta madaniy qatlam; hayvon suyaklarining deyarli hammasi tog‘ echkisiniki. Bosh suyagi atrofidagi 5 juft shox — dafn marosimi degan talqin bor, ayrim olimlar unga shubha bilan qaraydi.', manba:'humanorigins.si.edu «Teshik-Tash»; Krause va boshq., Nature 449 (2007); en.wikipedia «Teshik-Tash 1»'},
    obirahmat:{nom:'Obirahmat g‘ori', sarlavha2:'Bo‘stonliq tumani, Toshkent viloyati', jadval:[['Topilgan','1962'],['Balandlik','1250 m'],['Qatlamlar','22 ta, ~10 m; 60 000+ tosh buyum'],['2003','9–12 yoshli bola: 6 tish, 121 bosh suyagi bo‘lagi'],['Sana','40–90 ming yil (U-seriya: ~100 ming)']], matn:'Bola tishlari neandertallarnikiga, bosh suyagi zamonaviy odamnikiga yaqin — olimlar uning turini aniq belgilashda turlicha fikrda. 1998-yildan xalqaro ekspeditsiya ishlamoqda.', manba:'en.wikipedia «Obi-Rakhmat Grotto»; ru.wikipedia «Оби-Рахмат»; EPSL (2018)'},
    sarazm:{nom:'Sarazm', sarlavha2:'Panjakent yaqini, Tojikiston · eneolit – bronza', jadval:[['Topilgan','1976 (mahalliy aholi vakili A. Toyloqov mis boltani ko‘rsatgan)'],['Arxeolog','Abdullo Isakov (1977-yildan)'],['Davri','mil. av. IV ming yillik – III ming yillik oxiri'],['YUNESKO','2010 (№ 1141)']], matn:'Xom g‘ishtli uylar, dumaloq ibodatxonalar, olov qurbongohlari, mis va bronza qurollar, feruza taqinchoqlar. «Sarazm malikasi» qabri. Turkmaniston, Eron, Belujiston va dasht qabilalari bilan aloqalar.', manba:'whc.unesco.org/en/list/1141; en.wikipedia «Sarazm»'}
  },
  tr_davr:{
    ilk:{nom:'Ilk paleolit', sarlavha2:'~1 mln – 100 ming yil oldin (taxminiy)', matn:'Qadimgi odamlar qo‘pol tosh qurollar (chopperlar, qo‘l cho‘qmorlari) yasagan, ovchilik va termachilik bilan yashagan. O‘rta Osiyodagi eng qadimgi manzilgohlarning sanasi bahsli.', manba:TD},
    orta:{nom:'O‘rta paleolit', sarlavha2:'100 ming – 40 ming yil oldin', matn:'Muste madaniyati: puxta ishlangan uchli qurollar, qirg‘ichlar. Neandertallar davri — Teshiktosh, Obirahmat.', manba:TD},
    songgi:{nom:'So‘nggi paleolit', sarlavha2:'40 ming – 12 ming yil oldin', matn:'Zamonaviy qiyofadagi odam tarqalgan; suyakdan igna va bezaklar paydo bo‘lgan. O‘zbekistonda Samarqand manzilgohi mashhur.', manba:TD},
    mezolit:{nom:'Mezolit', sarlavha2:'12 ming – 8 ming yil oldin', matn:'Muzlik davri tugagan, o‘q-yoy ixtiro qilingan. Machay g‘ori (Surxondaryo).', manba:TD},
    neolit:{nom:'Neolit', sarlavha2:'mil. av. VI–IV ming yilliklar', matn:'Sopol idish, silliqlangan tosh qurollar, dehqonchilik va chorvachilik boshlangan. Xorazmda Kaltaminor madaniyati.', manba:TD + '; en.wikipedia «Kelteminar culture»'},
    eneolit:{nom:'Eneolit', sarlavha2:'mil. av. IV–III ming yilliklar', matn:'Mis-tosh davri: mis qurollar tosh qurollar bilan birga ishlatilgan. Sarazm — shu davrning ilk shaharchasi.', manba:TD},
    bronza:{nom:'Bronza davri', sarlavha2:'mil. av. III ming yillik – I ming yillik boshi', matn:'Bronza (mis va qalay qotishmasi), ilk shaharlar, sug‘orma dehqonchilik. O‘zbekistonda Sapallitepa, Jarqo‘ton.', manba:TD}
  },
  tr_alloma:{
    xorazmiy:{nom:'Muhammad ibn Muso al-Xorazmiy', sarlavha2:'taxm. 780 – taxm. 850 · matematik, astronom', jadval:[['Asosiy asar','«al-Kitob al-muxtasar fi hisob al-jabr val-muqobala» (taxm. 820)'],['Boshqa asarlar','Hind hisobi haqida; «Zij»; «Surat al-arz» (geografiya)'],['Ish joyi','Bag‘dod, «Bayt ul-hikma» (xalifa al-Ma’mun)'],['Meros','«algebra», «algoritm» so‘zlari']], matn:'Tug‘ilgan joyi nomidan (Xorazm) ma’lum; ba’zi tarixchilar boshqa joyni ham ko‘rsatadi. Yillar taxminiy.', manba:'en.wikipedia «Muhammad ibn Musa al-Khwarizmi»; MacTutor'},
    fargoniy:{nom:'Ahmad al-Farg‘oniy', sarlavha2:'taxm. 800 – 861-yildan keyin · astronom', jadval:[['Asosiy asar','«Kitob fi javomi’ ilm an-nujum» — «Astronomiya asoslari» (833–857)'],['Lotincha','Alfraganus; tarjimalar 1135 (Sevilyalik Ioann), Gerard Kremonskiy'],['861','Qohira, Roda oroli — Nil o‘lchagichi'],['Vafoti','Misr, 861-yildan keyin']], matn:'Tug‘ilgan yili ishonchli manbalarda berilmagan. Asari Dante va Kolumbga ta’sir qilgan deb yoziladi.', manba:'en.wikipedia «Al-Farghani»; Encyclopedia.com'},
    forobiy:{nom:'Abu Nasr Forobiy', sarlavha2:'taxm. 870 – 950/951 · faylasuf', jadval:[['Laqabi','«Muallimi soniy» — Ikkinchi muallim'],['Asarlar','«Fozil odamlar shahri», «Musiqa haqida katta kitob», «Ilmlar tasnifi»'],['Vafoti','Damashq, hijriy 339-yil rajab (950-yil dekabr – 951-yil yanvar)'],['Tug‘ilgan joyi','bahsli: Farob (O‘tror) va boshqa joylar']], matn:'Aristotel falsafasini sharhlagan, adolatli davlat va musiqa nazariyasi haqida yozgan.', manba:'en.wikipedia «Al-Farabi»'},
    beruniy:{nom:'Abu Rayhon Beruniy', sarlavha2:'973 – taxm. 1048–1050 · qomusiy olim', jadval:[['Tug‘ilgan','973-yil 4-sentabr, Kat (Xorazm)'],['Asarlar','«Qadimgi xalqlardan qolgan yodgorliklar» (taxm. 1000), «Hindiston» (taxm. 1030), «Qonuni Mas’udiy»'],['Yer radiusi','~6340 km (MacTutor) yoki ~6320 km'],['Vafoti','G‘azna, 1048 yoki 1050-yildan keyin']], matn:'Tog‘ cho‘qqisidan ufq pasayishi burchagini o‘lchab Yer radiusini hisoblagan. Globus yasagani haqidagi ma’lumot — an’anaviy.', manba:'en.wikipedia «Al-Biruni»; MacTutor «Al-Biruni»'},
    ibnsino:{nom:'Abu Ali ibn Sino', sarlavha2:'980 – 1037 · tabib, faylasuf', jadval:[['Tug‘ilgan','Afshona (Buxoro yaqini)'],['«Tib qonunlari»','5 kitob; 1025-yilda Hamadonda tugallangan'],['Lotincha','XII asr tarjimasi; 1472-yil bosma nashr'],['Vafoti','1037-yil iyun, Hamadon']], matn:'Yevropada Avitsenna. «Kitob ash-shifo» — falsafa va tabiiy fanlar qomusi (taxm. 1014–1020).', manba:'en.wikipedia «Avicenna», «The Canon of Medicine»'},
    ulugbek:{nom:'Mirzo Ulug‘bek', sarlavha2:'1394 – 1449 · astronom, hukmdor', jadval:[['Tug‘ilgan','1394-yil 22-mart, Sultoniya (Eron)'],['Madrasalar','Samarqand va Buxoro, 1417–1420'],['Rasadxona','1420-yillar (1424–1429); Faxriy sekstant radiusi ~40 m'],['Zij','~1000 yulduz (manbalarda 994 yoki 1018)'],['Qoldiqlar','1908, V. Vyatkin']], matn:'Yulduz yili uzunligi: 365 kun 6 soat 10 daqiqa 8 soniya (xatosi ~1 daqiqa). 1449-yil 27-oktabrda o‘ldirilgan.', manba:'en.wikipedia «Ulugh Beg», «Ulugh Beg Observatory»'},
    navoiy:{nom:'Alisher Navoiy', sarlavha2:'1441 – 1501 · shoir, mutafakkir', jadval:[['Tug‘ilgan','1441-yil 9-fevral, Hirot'],['«Xamsa»','1483–1485, 5 doston'],['«Muhokamat ul-lug‘atayn»','1499'],['Taxallusi','Navoiy (turkiy), Foniy (forsiy)']], matn:'Husayn Boyqaro saroyida yuqori lavozimlarda ishlagan, ko‘plab xayriya binolari qurdirgan. 1501-yil 3-yanvarda Hirotda vafot etgan.', manba:'en.wikipedia «Ali-Shir Nava’i»'},
    bobur:{nom:'Zahiriddin Muhammad Bobur', sarlavha2:'1483 – 1530 · shoir, tarixchi, hukmdor', jadval:[['Tug‘ilgan','1483-yil 14-fevral, Andijon'],['Asar','«Boburnoma» (turkiy tilda xotiralar)'],['Panipat','1526-yil 21-aprel — Boburiylar davlati'],['Vafoti','1530-yil 26-dekabr, Agra']], matn:'Farg‘ona hokimi bo‘lgan, keyin Kobul va Hindistonga yurgan. «Boburnoma»da tabiat, shaharlar va odamlar batafsil tasvirlangan.', manba:'en.wikipedia «Babur»'}
  },
  tr_bino:{
    ulugbek:{nom:'Ulug‘bek madrasasi', sarlavha2:'1417–1420 · Mirzo Ulug‘bek', jadval:[['O‘lchami','81 × 56 m, hovli 30 × 30 m'],['Minoralar','4 ta, ~33 m'],['Hujralar','~50 ta, ~100 talaba'],['Me’mori','an’anaviy — Qavomiddin Sheroziy (boshqa manbada — Kamoliddin Muhandis)'],['Ta’mir','minoralar: 1932 (V. Shuxov), 1965']], matn:'Registondagi eng qadimgi bino. Peshtoqi girih (geometrik yulduz) naqshli koshin bilan bezatilgan. Burchaklarda gumbazli darsxonalar bo‘lgan.', manba:'ru.wikipedia «Медресе Улугбека (Самарканд)»; archnet.org/sites/2123'},
    sherdor:{nom:'Sherdor madrasasi', sarlavha2:'1619–1636 · Yalangto‘sh Bahodir', jadval:[['Me’mori','Abdujabbor'],['O‘lchami','70 × 57 m (ru.wikipedia)'],['Peshtoq','31,5 m'],['Minoralar','31 m'],['Gumbazlar','ikki qovurg‘ali feruza gumbaz']], matn:'Peshtoqda yo‘lbarssimon sher kiyikni quvmoqda, orqasida odam yuzli quyosh — nomi «sherli» degani. Ulug‘bek madrasasiga ro‘para qurilgan. XX asrda ta’mirlangan (mozaika 1962).', manba:'ru.wikipedia «Шердор»; en.wikipedia «Sher-Dor Madrasa»'},
    tillakori:{nom:'Tillakori madrasasi', sarlavha2:'1646–1660 · Yalangto‘sh Bahodir', jadval:[['O‘lchami','75 × 75 m'],['Vazifasi','madrasa va shaharning jome masjidi'],['Bezak','ichki qismi kundal naqsh va zarhal'],['Tashqi gumbaz','1970-yillardagi ta’mirda qurilgan']], matn:'«Tillakori» — «tilla bilan ishlangan». Shahardagi eski jome masjidlari vayron bo‘lgani uchun masjid vazifasini ham bajargan.', manba:'ru.wikipedia «Медресе Тилля-Кари»; en.wikipedia «Tilya-Kori Madrasa»'}
  },
  tr_xonlik:{
    buxoro:{nom:'Buxoro amirligi', sarlavha2:'Mang‘itlar sulolasi · poytaxti Buxoro', jadval:[['Boshlanishi','Muhammad Rahim: 1747 otaliq, 1753/1756 xon'],['«Amirlik»','Shohmurod (1785–1800)'],['Mashhur amirlar','Haydar, Nasrullo (1827–1860), Muzaffar (1860–1885)'],['Protektorat','1868 sulh, 1873 Shahar shartnomasi'],['Tugashi','1920-yil 2-sentabr']], matn:'Zarafshon, Qashqadaryo vohalari va Amudaryo bo‘yidagi yerlarni birlashtirgan. 1868-yilda Samarqand va Kattaqo‘rg‘onni Rossiyaga yo‘qotgan, keyin sharqdagi tog‘li bekliklar hisobiga kengaygan.', manba:'en.wikipedia «Emirate of Bukhara»; Encyclopedia.com'},
    xiva:{nom:'Xiva xonligi', sarlavha2:'Qo‘ng‘irotlar sulolasi · poytaxti Xiva', jadval:[['Qo‘ng‘irot inoqlari','1763-yildan'],['Birinchi xon','Eltuzar, 1804–1806'],['Mashhur xonlar','Muhammad Rahimxon I (1806–1825), Olloqulixon (1825–1842), Muhammad Rahimxon II Feruz (1864–1910)'],['Qaramlik','Gandimiyon shartnomasi, 1873-yil 12 (24)-avgust'],['Tugashi','1920-yil fevral; 26-aprel — Xorazm XSR']], matn:'Amudaryo quyi oqimidagi Xorazm vohasi. 1873-yil shartnomasiga ko‘ra Amudaryoning o‘ng qirg‘og‘i Rossiyaga o‘tgan.', manba:'en.wikipedia «Khanate of Khiva»; ru.wikipedia «Гендемианский мирный договор»'},
    qoqon:{nom:'Qo‘qon xonligi', sarlavha2:'Minglar sulolasi · poytaxti Qo‘qon', jadval:[['Asos solgan','Shohruxbiy, 1709'],['Birinchi xon','Olimxon (1798/1799 – 1809/1811, manbalarda farq bor)'],['Mashhur xonlar','Umarxon, Madalixon, Xudoyorxon'],['Eng katta hudud','1830-yillar, ~250 ming km² (taxminiy)'],['Tugashi','1876-yil 19-fevral (2-mart)']], matn:'Farg‘ona vodiysi, Toshkent va Sirdaryo bo‘yidagi dasht yerlarini egallagan. 1873–1876-yillardagi qo‘zg‘olondan keyin tugatilgan.', manba:'en.wikipedia «Khanate of Kokand»; ru.wikipedia «Кокандское ханство»'},
    rossiya:{nom:'Turkiston general-gubernatorligi', sarlavha2:'Rossiya imperiyasi · markazi Toshkent', jadval:[['Tuzilgan','1867-yil 11 (23)-iyul'],['Birinchi general-gubernator','K. P. fon Kaufman (1867–1882)'],['Viloyatlar','Sirdaryo, Yettisuv, keyin Farg‘ona (1876), Samarqand (1887), Kaspiyorti'],['Tugagan','1917']], matn:'Xaritada Rossiya hududi taxminiy ko‘rsatilgan (shimoldagi dasht viloyatlari bilan birga). Buxoro va Xiva protektorat sifatida general-gubernatorlikka kirmagan.', manba:'ru.wikipedia «Туркестанское генерал-губернаторство»'}
  },
  tr_shahar:{
    buxoro:{nom:'Buxoro', sarlavha2:'Buxoro amirligi poytaxti', jadval:[['YUNESKO','tarixiy markaz, 1993'],['1920','2-sentabr — Qizil Armiya egallagan']], matn:'Ark qal’asi — amirlar qarorgohi. Yirik savdo va ilm markazi.', manba:'whc.unesco.org/en/list/602'},
    xiva:{nom:'Xiva', sarlavha2:'Xiva xonligi poytaxti', jadval:[['YUNESKO','Ichan qal’a, 1990'],['1873','29-may (10-iyun) — Rossiya qo‘shinlari']], matn:'XVI asr oxiri – XVII asr boshidan xonlik poytaxti (manbalarda aniq yil turlicha).', manba:'whc.unesco.org/en/list/543'},
    qoqon:{nom:'Qo‘qon', sarlavha2:'Qo‘qon xonligi poytaxti', jadval:[['Poytaxt','XVIII asr o‘rtasidan'],['1876','xonlik tugatilgan']], matn:'Xudoyorxon o‘rdasi (1870-yillar) — bugun muzey.', manba:'en.wikipedia «Kokand»'},
    toshkent:{nom:'Toshkent', sarlavha2:'Qo‘qon xonligi → Turkiston markazi', jadval:[['Qo‘qon tarkibida','taxm. 1809-yildan'],['1865','15–17-iyun (eski uslub) — M. Chernyayev'],['1867','Turkiston general-gubernatorligi markazi']], matn:'Hujum paytida shahar himoyachilari va aholi qattiq qarshilik ko‘rsatgan.', manba:'ru.wikipedia «Завоевание Ташкента Российской империей»'},
    samarqand:{nom:'Samarqand', sarlavha2:'Buxoro amirligi → Zarafshon okrugi', jadval:[['1868','2 (14)-may — K. Kaufman qo‘shini'],['Keyin','Zarafshon okrugi, 1887-yildan Samarqand viloyati']], matn:'Egallangandan so‘ng bir oy o‘tmay shahar himoyachilari qo‘zg‘olon ko‘tarib, Rossiya garnizonini qamal qilgan.', manba:'ru.wikipedia «Русско-бухарский договор (1868)»'},
    qarshi:{nom:'Qarshi', sarlavha2:'Buxoro amirligi', jadval:[['Qadimgi nomi','Nasaf (Naxshab)'],['Maqomi','yirik beklik markazi']], matn:'Qashqadaryo vohasining asosiy shahri.', manba:TD},
    shahrisabz:{nom:'Shahrisabz', sarlavha2:'Buxoro amirligi', jadval:[['Qadimgi nomi','Kesh'],['YUNESKO','tarixiy markaz, 2000']], matn:'Amir Temurning vatani (yaqinidagi qishloqda tug‘ilgan); Oqsaroy xarobalari. XIX asrda Buxoroga qarshi bir necha bor qo‘zg‘olon ko‘targan beklik.', manba:'whc.unesco.org/en/list/885'},
    urganch:{nom:'Urganch', sarlavha2:'Xiva xonligi', jadval:[['Maqomi','savdo shahri']], matn:'Xorazm vohasidagi shahar (qadimgi Ko‘hna Urganch bilan adashtirmang).', manba:TD},
    andijon:{nom:'Andijon', sarlavha2:'Qo‘qon xonligi', jadval:[['Mashhur farzandi','Zahiriddin Muhammad Bobur (1483)']], matn:'Farg‘ona vodiysining sharqidagi yirik shahar.', manba:TD},
    namangan:{nom:'Namangan', sarlavha2:'Qo‘qon xonligi', jadval:[['Joyi','Farg‘ona vodiysining shimoli']], matn:'Qo‘qon xonligining yirik shaharlaridan.', manba:TD},
    xojand:{nom:'Xo‘jand', sarlavha2:'Qo‘qon xonligi (hozir Tojikiston)', jadval:[['1866','Rossiya qo‘shinlari egallagan']], matn:'Sirdaryo bo‘yidagi qadimiy shahar, Farg‘ona vodiysiga kirish darvozasi.', manba:TD},
    turkiston:{nom:'Turkiston', sarlavha2:'Qo‘qon xonligi (hozir Qozog‘iston)', jadval:[['1864','Rossiya qo‘shinlari egallagan'],['YUNESKO','Xoja Ahmad Yassaviy maqbarasi, 2003']], matn:'Maqbara Amir Temur buyrug‘i bilan XIV asr oxirida qurilgan.', manba:'whc.unesco.org/en/list/1103'},
    chimkent:{nom:'Chimkent', sarlavha2:'Qo‘qon xonligi (hozir Qozog‘iston)', jadval:[['1864','Rossiya qo‘shinlari egallagan']], matn:'Toshkentga shimoldan boradigan yo‘ldagi qal’a.', manba:TD},
    oqmachit:{nom:'Oqmachit', sarlavha2:'Qo‘qon qal’asi (hozir Qizilo‘rda)', jadval:[['1853','V. Perovskiy qo‘shini egallagan, Perovsk deb atalgan']], matn:'Sirdaryo quyi oqimidagi qal’a — Rossiya yurishining birinchi yirik nishoni.', manba:TD},
    termiz:{nom:'Termiz', sarlavha2:'Buxoro amirligi', jadval:[['Joyi','Amudaryo kechuvi']], matn:'Qadimiy shahar; Amudaryo orqali janubga yo‘l.', manba:TD},
    jizzax:{nom:'Jizzax', sarlavha2:'Buxoro amirligi', jadval:[['1866','Rossiya qo‘shinlari egallagan']], matn:'Toshkentdan Samarqandga yo‘ldagi qal’a shahar.', manba:TD}
  },
  tr_ramz:{
    kok:{nom:'Moviy yo‘l', sarlavha2:'Bayroq · qonunda — «to‘q moviy», 40 sm', matn:'An’anaviy talqin: osmon va suv. Unda yarim oy va 12 yulduz joylashgan.', manba:'lex.uz/docs/-100122; gov.uz'},
    oq:{nom:'Oq yo‘l', sarlavha2:'Bayroq · 40 sm', matn:'An’anaviy talqin: tinchlik va poklik.', manba:'lex.uz/docs/-100122'},
    yashil:{nom:'Yashil yo‘l', sarlavha2:'Bayroq · qonunda — «to‘q yashil», 40 sm', matn:'An’anaviy talqin: tabiat, yangilanish.', manba:'lex.uz/docs/-100122'},
    qizil:{nom:'Qizil hoshiyalar', sarlavha2:'Bayroq · har biri 2,5 sm', matn:'Oq yo‘lning ikki chetida. An’anaviy talqin: hayot kuchi. 40 · 3 + 2,5 · 2 = 125 sm.', manba:'lex.uz/docs/-100122'},
    oy:{nom:'Yarim oy', sarlavha2:'Bayroq · 30 sm doiraga sig‘adi', matn:'Dastadan 20 sm, 75 × 30 sm to‘rtburchak ichida. An’anaviy talqin: yangi tug‘ilgan respublika. Ichki doira o‘lchami qonunda berilmagan — sahnada taxminiy.', manba:'lex.uz/docs/-100122'},
    yulduz:{nom:'12 yulduz', sarlavha2:'Bayroq · 3, 4, 5 qator; har biri 6 sm doiraga sig‘adi', matn:'Qonunda ma’nosi yozilmagan. Talqinlar turlicha: tiniq osmon, 12 oy (yil), mukammallik va boshqalar.', manba:'lex.uz/docs/-100122; en.wikipedia «Flag of Uzbekistan»'},
    humo:{nom:'Humo qushi', sarlavha2:'Gerb markazi · kumush rang', matn:'Qonunda: «baxt va erksevarlik ramzi — qanotlarini yozgan Humo qushi».', manba:'lex.uz/acts/-17260 (3-modda)'},
    quyosh:{nom:'Quyosh', sarlavha2:'Gerb · zarrin (oltin) rang', matn:'Gullagan vodiy uzra zarrin nurlarini sochib turgan quyosh.', manba:'lex.uz/acts/-17260'},
    tog:{nom:'Tog‘lar', sarlavha2:'Gerb · yashil', matn:'Vodiy ortidagi tog‘lar.', manba:'lex.uz/acts/-17260'},
    vodiy:{nom:'Gullagan vodiy', sarlavha2:'Gerb · yashil', matn:'Gerbning asosiy manzarasi — chambarga o‘ralgan gullagan vodiy.', manba:'lex.uz/acts/-17260'},
    daryo:{nom:'Daryolar', sarlavha2:'Gerb · kumush rang', matn:'Odatda Amudaryo va Sirdaryo deb izohlanadi (qonun matnida nomlari yo‘q).', manba:'lex.uz/acts/-17260; gov.uz'},
    bugdoy:{nom:'Bug‘doy boshoqlari', sarlavha2:'Gerb · chambarning so‘l tomoni', matn:'Qonunda — so‘l tomoni (gerbning o‘z tomonidan). Tomoshabinga u o‘ngda ko‘rinadi.', manba:'lex.uz/acts/-17260'},
    paxta:{nom:'G‘o‘za shoxlari', sarlavha2:'Gerb · chambarning o‘ng tomoni', matn:'«Chanoqlari ochilgan g‘o‘za shoxlari». Tomoshabinga u chapda ko‘rinadi.', manba:'lex.uz/acts/-17260'},
    sakkiz:{nom:'Sakkizburchak', sarlavha2:'Gerb yuqorisi', matn:'Qonunda: Respublika hurligining ramzi; ichida yarim oy va yulduz.', manba:'lex.uz/acts/-17260'},
    lenta:{nom:'Lenta', sarlavha2:'Gerb pasti', matn:'Davlat bayrog‘i ranglaridagi lentada «O‘zbekiston» yozuvi.', manba:'lex.uz/acts/-17260'}
  },
  tr_sana:{
    til:{nom:'Davlat tili haqida qonun', sarlavha2:'1989-yil 21-oktabr', matn:'O‘zbek tiliga davlat tili maqomi berilgan.', manba:'lex.uz/docs/-109394'},
    prezident:{nom:'Prezidentlik lavozimi', sarlavha2:'1990-yil 24-mart', matn:'Oliy Kengash sessiyasida joriy etilgan, I. Karimov Prezident etib saylangan.', manba:'president.uz'},
    deklaratsiya:{nom:'Mustaqillik deklaratsiyasi', sarlavha2:'1990-yil 20-iyun', matn:'Oliy Kengash qabul qilgan (ba’zi manbalarda — suverenitet deklaratsiyasi).', manba:'lex.uz/docs/-185391'},
    mustaqillik:{nom:'Mustaqillik e’lon qilindi', sarlavha2:'1991-yil 31-avgust', matn:'«Davlat mustaqilligining asoslari to‘g‘risida» qonun; 1-sentabr — Mustaqillik kuni.', manba:TD},
    bayroq:{nom:'Davlat bayrog‘i qonuni', sarlavha2:'1991-yil 18-noyabr, № 407-XII', matn:'Bayroq 250 × 125 sm, nisbati 1 : 2.', manba:'lex.uz/docs/-100122'},
    referendum:{nom:'Referendum va saylov', sarlavha2:'1991-yil 29-dekabr', matn:'Rasmiy natija: 98,26 % «ha», ishtirok 94,14 %. Shu kuni birinchi umumxalq Prezident saylovi.', manba:'en.wikipedia «1991 Uzbek independence referendum»'},
    bmt:{nom:'BMT a’zoligi', sarlavha2:'1992-yil 2-mart', matn:'Bosh Assambleya rezolyutsiyasi 46/226 (Xavfsizlik Kengashi tavsiyasi — 737).', manba:'digitallibrary.un.org; en.wikipedia «UNSC Resolution 737»'},
    gerb:{nom:'Davlat gerbi qonuni', sarlavha2:'1992-yil 2-iyul, № 616-XII', matn:'Humo, quyosh, vodiy, chambar, sakkizburchak, lenta.', manba:'lex.uz/acts/-17260'},
    konstitutsiya:{nom:'Konstitutsiya', sarlavha2:'1992-yil 8-dekabr', matn:'Konstitutsiya kuni. 2023-yil 30-aprel referendumida yangi tahriri qabul qilingan.', manba:TD + '; gazeta.uz'},
    madhiya:{nom:'Davlat madhiyasi qonuni', sarlavha2:'1992-yil 10-dekabr, № 768-XII', matn:'So‘zlari — Abdulla Oripov, musiqasi — Mutal Burhonov.', manba:'lex.uz/docs/-38608; gov.uz'}
  }
};
const qosh = ()=>{ const D = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DT).forEach(k=>{ D[k] = Object.assign(D[k] || {}, DT[k]); }); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
})();
