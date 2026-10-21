/* MAKON v3.15 — «fa» guruhi: 4 ta fizika va 5 ta astronomiya darsi + detal kartalari (MAKON_DETAL.fa_*) + fanga bog‘lash.
   Sahnalar: lib/sahna_v315_fa.js (MAKON_SAHNA['fa_*']). detallar2.js dan KEYIN yuklanadi.
   Qoida: har raqam manbali; manbalar farq qilsa — ikkalasi; tekshirilmagani «taxminiy». */
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
const ast = F('astronomiya'); if(ast){ ast.yopiq = false; ast.tavsif = 'Quyosh sistemasi, Oy fazalari va tutilishlar, Quyoshning ichki tuzilishi, Toshkent osmonidagi yulduz turkumlari, Somon yo‘li va Kepler qonunlari — 3D modellarda, NASA va ilmiy kataloglar ma’lumotlari asosida.'; }

bogla('fizika', 'Moddaning molekulyar tuzilishi', 'fizika-molekula', 'Qattiq, suyuq, gaz: zarralar harakati, harorat va diffuziya');
bogla('fizika', 'Nyuton qonunlari va ishqalanish', 'fizika-nyuton', 'Brusok, havo yo‘li, qiya tekislik: a = F/m ni o‘lchang', ['Nyuton qonunlari']);
bogla('fizika', 'Magnit maydon va elektromagnit induksiya', 'fizika-magnit', 'Magnit, g‘altak va galvanometr: Faradey tajribasi, Lens qoidasi');
bogla('fizika', 'Atom yadrosi va radioaktivlik', 'fizika-yadro', 'Proton va neytron, α, β, γ nurlanish, yarim yemirilish davri');
bogla('astronomiya', 'Yulduzlar va yulduz turkumlari', 'astro-yulduzlar', 'Toshkent osmoni: Katta Ayiq, Qutb yulduzi, Orion, Kassiopeya');
bogla('astronomiya', 'Quyosh va Oy tutilishlari', 'astro-tutilish', 'Soya konuslari, tugunlar va nega tutilish har oy bo‘lmaydi');
bogla('astronomiya', 'Quyoshning tuzilishi', 'astro-quyosh-tuzilishi', 'Kesim: yadro, nurlanish va konveksiya zonalari, fotosfera, toj');
bogla('astronomiya', 'Somon yo‘li galaktikasi', 'astro-galaktika', 'Spiral yenglar, markazdagi qora tuynuk, Quyoshning o‘rni');
bogla('astronomiya', 'Kepler qonunlari', 'astro-kepler', 'Ellips orbita, teng yuzalar, T² ∝ a³ — haqiqiy sayyoralar');

/* ---------- umumiy manbalar ---------- */
const FIZ6 = '6-sinf «Fizika» darsligi (O‘zbekiston, amaldagi nashr) — «Modda tuzilishi» bobi (diffuziya, molekulalar harakati)';
const FIZ7 = '7-sinf «Fizika» darsligi (O‘zbekiston, amaldagi nashr) — «Harakat qonunlari», «Ishqalanish kuchi» mavzulari';
const FIZ9 = '9-sinf «Fizika» darsligi (O‘zbekiston) — «Elektromagnit hodisalar»; 11-sinf «Fizika» — «Elektromagnit induksiya»';
const FIZ11 = '11-sinf «Fizika» darsligi (O‘zbekiston) — «Atom yadrosi fizikasi» bobi';
const AST11 = '11-sinf «Astronomiya» darsligi (M. Mamadazimov, O‘zbekiston); 5–6-sinf «Tabiiy fan» darsliklari';
const WIKI = 'Wikipedia (inglizcha)';

/* =====================================================================
   1. MODDANING MOLEKULYAR TUZILISHI — 6-sinf
   ===================================================================== */
D['fizika-molekula'] = {
  fan:'fizika', qisqaNom:'Molekulalar', nom:'Moddaning molekulyar tuzilishi',
  qisqa:'6-sinf · fizika · modda tuzilishi, issiqlik harakati, diffuziya', sinf:'6-sinf',
  sahna:'fa_molekula',
  kor:{
    sarlavha:'Hamma moddalar doimo harakatdagi zarralardan tuzilgan',
    matn:'Suv, havo, temir — barchasi juda mayda zarralar: molekula va atomlardan iborat. Zarralar orasida bo‘shliqlar bor, ular tinimsiz va tartibsiz harakat qiladi hamda bir-biri bilan o‘zaro ta’sirlashadi (tortishadi va itarishadi). Bir xil modda qattiq, suyuq va gaz holatda bo‘lishi mumkin — farq zarralarning qanday joylashgani va qanday harakatlanishida. Sahnada uchta idishni solishtiring, haroratni o‘zgartiring va diffuziyani kuzating. Model sxematik: zarralar ming-million marta kattalashtirilgan.',
    punktlar:[
      '<b>Qattiq:</b> zarralar tartibli joylashgan, o‘z o‘rni atrofida tebranadi — shakl va hajm saqlanadi',
      '<b>Suyuq:</b> zarralar zich, lekin siljiydi — hajm saqlanadi, shakl idishdan olinadi',
      '<b>Gaz:</b> zarralar uzoq, tez va erkin uchadi — butun idishni egallaydi',
      '<b>Harorat</b> ortsa — zarralar tezroq harakatlanadi; diffuziya tezlashadi'
    ]
  },
  bolimlar:[
    {sarlavha:'Uch agregat holat', jadval:[
      ['Qattiq','shakl ✓, hajm ✓ · zarralar orasidagi masofa ≈ zarra o‘lchami · tebranma harakat'],
      ['Suyuq','shakl ✗, hajm ✓ · zarralar zich, bir-biriga nisbatan siljiydi · oquvchan'],
      ['Gaz','shakl ✗, hajm ✗ · masofalar zarralardan ko‘p marta katta · oson siqiladi']
    ]},
    {sarlavha:'Raqamlarda', jadval:[
      ['Suv molekulasi o‘lchami','≈ 0,3 nm = 3·10⁻¹⁰ m (taxminan)'],
      ['1 g suvdagi molekulalar','≈ 3,3·10²² ta (1 g : 18 g/mol × 6,02·10²³)'],
      ['1 cm³ havodagi molekulalar','≈ 2,7·10¹⁹ ta (0 °C, normal bosim — Loshmidt soni)'],
      ['Azot molekulasi tezligi (20 °C)','≈ 510 m/s (o‘rtacha kvadratik)'],
      ['Mutlaq nol','−273,15 °C = 0 K']
    ], matn:'Sonlar kattaligini his qilish uchun: agar bir tomchi suvdagi molekulalarni sekundiga bittadan sanasangiz, bu ish koinot yoshidan ham ko‘p vaqt oladi.'}
  ],
  bosqichlar:[
    {sarlavha:'Uch holatni solishtiring', matn:'Uchta idishda bir xil modda (masalan, suv) — muz, suv va bug‘ holatida. Zarralar joylashuvi va harakatiga e’tibor bering.', holat:{rejim:'uch', harorat:20}},
    {sarlavha:'Qattiq jism: kristall panjara', matn:'Zarralar qat-qat tartib bilan joylashgan va faqat o‘z o‘rni atrofida tebranadi. Shuning uchun qattiq jism o‘z shaklini saqlaydi.', holat:{rejim:'qattiq'}},
    {sarlavha:'Suyuqlik: zich, lekin harakatchan', matn:'Zarralar bir-biriga tegib turadi, lekin o‘rin almashtira oladi. Suyuqlik oqadi, siqilmaydi va idish shaklini oladi.', holat:{rejim:'suyuq'}},
    {sarlavha:'Gaz: erkin uchish', matn:'Zarralar orasidagi masofa katta, ular devorlarga va bir-biriga urilib, butun idishni egallaydi. Devorga urilishlar gaz bosimini hosil qiladi.', holat:{rejim:'gaz'}},
    {sarlavha:'Harorat — zarralar tezligi o‘lchovi', matn:'Haroratni 200 °C ga ko‘taring: zarralar tezlashadi. −150 °C da esa sekinlashadi. Harorat qancha yuqori bo‘lsa, zarralarning o‘rtacha tezligi shuncha katta.', holat:{rejim:'uch', harorat:200}},
    {sarlavha:'Diffuziya gazda', matn:'To‘siqni olib tashlang: ikki gaz hech kim aralashtirmasa ham o‘z-o‘zidan aralashadi. Bu — diffuziya. Xonada atir hidi shu tarzda tarqaladi.', holat:{rejim:'diffuziya', muhit:'gaz', harorat:20, tosiq:false}},
    {sarlavha:'Diffuziya suyuqlikda — sekinroq', matn:'Suyuqlikda zarralar tez-tez to‘qnashib, sekin siljiydi — diffuziya ancha sekin. Choyga shakar solib aralashtirmasangiz, u sekin eriydi va tarqaladi.', holat:{rejim:'diffuziya', muhit:'suyuq', harorat:20, tosiq:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Zarralar bilan tajriba', holat:{rejim:'uch', harorat:20},
    topshiriqlar:[
      {shart:'Zarralari butun idishni egallab, erkin uchadigan holatni <b>sahnada bosing</b>.', hodisa:'fa-holat', kod:"ev.nom==='gaz'", izoh:'To‘g‘ri — <b>gaz</b>. Gaz zarralari orasidagi masofa ular o‘lchamidan ko‘p marta katta.'},
      {shart:'Haroratni <b>100 °C</b> yoki undan yuqori qiling — zarralar tezligi qanday o‘zgaradi?', hodisa:'fa-molekula', kod:"ev.harorat>=100", izoh:'To‘g‘ri — harorat ortganda zarralar <b>tezroq</b> harakatlanadi.'},
      {shart:'Haroratni <b>−100 °C</b> yoki undan past qiling.', hodisa:'fa-molekula', kod:"ev.harorat<=-100", izoh:'To‘g‘ri — sovuqda zarralar sekinlashadi, lekin to‘xtab qolmaydi (mutlaq nol −273,15 °C ga yetib bo‘lmaydi).'},
      {shart:'«Diffuziya» rejimida to‘siqni oling va gazlar kamida <b>70 %</b> aralashishini kuting.', hodisa:'fa-diffuziya', kod:"ev.aralash>=70 && !ev.tosiq", izoh:'To‘g‘ri — hech kim aralashtirmasa ham, zarralarning tartibsiz harakati moddalarni aralashtirdi. Bu <b>diffuziya</b>.'}
    ]},
  test:[
    {s:'Moddalar nimadan tuzilgan?', v:['Uzluksiz yaxlit massadan','Mayda zarralar — molekula va atomlardan','Faqat elektronlardan','Faqat suvdan'], t:1, izoh:'Barcha moddalar <b>mayda zarralar — molekula va atomlardan</b> tuzilgan; ular orasida bo‘shliqlar bor.'},
    {s:'Qaysi holatda modda shaklini ham, hajmini ham saqlaydi?', v:['Gaz','Suyuq','Qattiq','Hech birida'], t:2, izoh:'<b>Qattiq</b> jismda zarralar tartibli joylashgan va faqat tebranadi — shakl va hajm saqlanadi.'},
    {s:'Suyuqlik nega idish shaklini oladi?', v:['Zarralari harakatlanmaydi','Zarralari zich, lekin bir-biriga nisbatan siljiy oladi','Zarralari orasida masofa juda katta','Suyuqlik zarralardan tuzilmagan'], t:1, izoh:'Suyuqlik zarralari <b>zich, lekin bir-biriga nisbatan siljiy oladi</b> — shuning uchun u oqadi.'},
    {s:'Diffuziya deb nimaga aytiladi?', v:['Moddaning qizishiga','Moddalarning zarralar harakati tufayli o‘z-o‘zidan aralashishiga','Suyuqlikning bug‘lanishiga','Jismning siqilishiga'], t:1, izoh:'Diffuziya — <b>moddalarning zarralar harakati tufayli o‘z-o‘zidan aralashishi</b>.'},
    {s:'Diffuziya qaysi holatda eng tez boradi?', v:['Qattiq jismda','Suyuqlikda','Gazda','Hammasida bir xil'], t:2, izoh:'<b>Gazda</b> zarralar tez va erkin harakatlanadi, shuning uchun diffuziya eng tez. Suyuqlikda sekinroq, qattiq jismda juda sekin.'},
    {s:'Harorat ortganda zarralar harakati qanday o‘zgaradi?', v:['Sekinlashadi','O‘zgarmaydi','Tezlashadi','To‘xtaydi'], t:2, izoh:'Harorat — zarralar harakati «tezligi» o‘lchovi: harorat ortsa, zarralar <b>tezlashadi</b>.'},
    {s:'1827-yilda suvdagi mayda zarrachalarning tartibsiz harakatini kuzatgan olim kim?', v:['Isaak Nyuton','Robert Broun','Albert Eynshteyn','Mariya Kyuri'], t:1, izoh:'Shotland botanigi <b>Robert Broun</b> (1827). Bu harakat Broun harakati deyiladi; uni 1905-yilda Eynshteyn nazariy tushuntirgan.'},
    {s:'Gaz nega oson siqiladi?', v:['Zarralari juda kichrayadi','Zarralari orasida katta bo‘shliqlar bor','Zarralari yo‘qoladi','Gaz zarralari tortishmaydi va itarishmaydi'], t:1, izoh:'Gazda <b>zarralar orasida katta bo‘shliqlar bor</b> — siqilganda zarralar o‘lchami emas, oradagi masofa kamayadi.'},
    {s:'Mutlaq nol harorat nechaga teng?', v:['0 °C','−100 °C','−273,15 °C','−459 °C'], t:2, izoh:'Mutlaq nol — <b>−273,15 °C</b> (0 K). Bu nazariy chegara, unga yetib bo‘lmaydi.'},
    {tur:'3d', s:'Sahnada zarralari <b>tartibli kristall panjara</b> hosil qilgan holatni bosing.', hodisa:'fa-holat', togri:['qattiq'], v:['Qattiq holat','boshqa holat'], t:0, izoh:'<b>Qattiq holat</b> — zarralar qat-qat tartib bilan joylashgan va faqat o‘z o‘rni atrofida tebranadi.'}
  ],
  yordamchi:[
    {s:'Zarralar harakati to‘xtashi mumkinmi?', j:'Harorat pasaygan sari zarralar sekinlashadi. Mutlaq nolda (−273,15 °C) issiqlik harakati eng kichik bo‘lar edi, lekin bu haroratga yetib bo‘lmaydi. Shuning uchun amalda zarralar doimo harakatda.', kalit:['to‘xta','mutlaq','nol']},
    {s:'Nega model «sxematik»?', j:'Haqiqiy molekulalar o‘lchami taxminan 0,3 nanometr — ko‘z bilan va oddiy mikroskopda ko‘rinmaydi. Sahnada ular sharcha qilib, kattalashtirib ko‘rsatilgan, soni ham ancha kam.', kalit:['sxema','model','o‘lcham']}
  ],
  maqola:[
    {sarlavha:'Moddaning tuzilishi haqida uch asosiy qoida', xatboshilar:[
      'Fizikada moddaning tuzilishi uchta asosiy qoida bilan tushuntiriladi. Birinchisi: barcha moddalar juda mayda zarralar — molekula va atomlardan tuzilgan, zarralar orasida bo‘shliqlar bor. Ikkinchisi: zarralar tinimsiz va tartibsiz harakat qiladi. Uchinchisi: zarralar bir-biri bilan o‘zaro ta’sirlashadi — yaqin masofada itarishadi, biroz uzoqroqda tortishadi.',
      'Bu qoidalarni tasdiqlaydigan kuzatuvlar ko‘p. Suvga bir tomchi siyoh tomizilsa, u asta-sekin butun stakan bo‘ylab tarqaladi. Qizdirilgan jism kengayadi — zarralar orasidagi masofa ortadi. Ikkita silliq qo‘rg‘oshin bo‘lagi kuch bilan bir-biriga bosilsa, yopishib qoladi — zarralar tortishadi.',
      'Molekulalar juda kichik: suv molekulasining o‘lchami taxminan 0,3 nanometr (3·10⁻¹⁰ m). Ammo ular juda ko‘p: 1 gramm suvda taxminan 3,3·10²² ta molekula bor. Bu sonni 1 g ni suvning molyar massasiga (18 g/mol) bo‘lib, Avogadro soniga (6,02·10²³) ko‘paytirib topamiz.'
    ]},
    {sarlavha:'Qattiq, suyuq va gaz', xatboshilar:[
      'Bir xil modda uch holatda bo‘lishi mumkin: muz, suv va suv bug‘i — bir xil H₂O molekulalari. Farq molekulalarning joylashuvi va harakatida. Qattiq jismda zarralar tartibli joylashadi va o‘z o‘rni atrofida tebranadi; ko‘p qattiq jismlarda bu tartib kristall panjara deyiladi.',
      'Suyuqlikda zarralar ham zich joylashgan, lekin ular o‘rin almashib, bir-biriga nisbatan siljiy oladi. Shuning uchun suyuqlik oqadi va idish shaklini oladi, ammo hajmini saqlaydi — uni siqish juda qiyin.',
      'Gazda zarralar orasidagi o‘rtacha masofa zarralarning o‘zidan ko‘p marta katta. Zarralar tez uchib, devorlarga urilib, butun idishni egallaydi. Devorga urilishlar gaz bosimini hosil qiladi. Gaz oson siqiladi — zarralar orasidagi bo‘shliqlar kamayadi.'
    ]},
    {sarlavha:'Harorat va issiqlik harakati', xatboshilar:[
      'Zarralarning tartibsiz harakati issiqlik harakati deyiladi, chunki uning jadalligi haroratga bog‘liq. Harorat qancha yuqori bo‘lsa, zarralar shuncha tez harakatlanadi. Masalan, 20 °C da havo tarkibidagi azot molekulalarining o‘rtacha kvadratik tezligi taxminan 510 m/s — ovoz tezligidan ham katta!',
      'Nega unda atir hidi xonaga bir zumda tarqalmaydi? Chunki har bir molekula har soniyada son-sanoqsiz marta boshqa molekulalar bilan to‘qnashadi va yo‘nalishini o‘zgartiradi. Uning yo‘li zig-zag bo‘lib, oldinga sekin siljiydi.',
      'Harorat pasayganda zarralar sekinlashadi. Nazariy eng past harorat — mutlaq nol, −273,15 °C. Kelvin shkalasida harorat mutlaq noldan boshlab sanaladi: T = t + 273,15.'
    ]},
    {sarlavha:'Diffuziya va Broun harakati', xatboshilar:[
      'Diffuziya — bir moddaning zarralari boshqa modda zarralari orasiga o‘z-o‘zidan kirib borishi. Gazda u tez (bir necha soniya–daqiqa), suyuqlikda sekinroq (daqiqalar–soatlar), qattiq jismlarda juda sekin (yillar) boradi. Harorat ortsa diffuziya tezlashadi: shakar issiq choyda sovuq suvdagidan tezroq tarqaladi.',
      'Diffuziya tabiatda va hayotda muhim: o‘pkada kislorod qonga diffuziya orqali o‘tadi, o‘simlik ildizlari suvdagi moddalarni shimadi, metallni sirtidan uglerod bilan boyitish (sementatsiya) ham diffuziyaga asoslangan.',
      '1827-yilda shotland botanigi Robert Broun mikroskopda suvdagi mayda zarrachalarning tinimsiz, tartibsiz titrashini kuzatgan. Bu — Broun harakati: zarrachaga har tomondan suv molekulalari urilib turadi. 1905-yilda Albert Eynshteyn bu harakat nazariyasini yaratgan, 1908-yilda Jan Perren tajribada tasdiqlagan (1926-yilgi Nobel mukofoti). Shu tariqa molekulalar mavjudligi ishonchli isbotlangan.'
    ]}
  ],
  formulalar:[
    ['T = t + 273,15','Kelvin (T) va Selsiy (t) shkalalari bog‘lanishi'],
    ['N = (m / M) · N<sub>A</sub>','Moddadagi molekulalar soni: m — massa, M — molyar massa, N<sub>A</sub> = 6,02·10²³ mol⁻¹'],
    ['v ≈ √(3RT / M)','Gaz molekulalarining o‘rtacha kvadratik tezligi (yuqori sinflarda o‘rganiladi); R = 8,31 J/(mol·K)'],
    ['1 nm = 10⁻⁹ m','Nanometr — molekulalar o‘lchami birligi']
  ],
  qiziqarli:[
    '1 gramm suvdagi molekulalarni butun Yer aholisi (≈8 mlrd kishi) soniyasiga bittadan sanasa ham, taxminan 130 ming yil kerak bo‘ladi (3,3·10²² : 8·10⁹ ≈ 4·10¹² s).',
    '20 °C da havo molekulalari o‘rtacha ≈ 500 m/s tezlikda uchadi, lekin to‘qnashuvlar tufayli hid xonada bir necha daqiqada tarqaladi.',
    'Broun harakatini 1827-yilda botanik kuzatgan, 1905-yilda Eynshteyn tushuntirgan — o‘sha yili u yana ikki mashhur ishini (nisbiylik va fotoeffekt) ham e’lon qilgan.',
    'Muz suvdan yengil: suv muzlaganda molekulalar ochiq panjara hosil qiladi va hajm taxminan 9 % ga ortadi. Shu sababli muz suv ustida suzadi.'
  ],
  lugat:[
    ['Molekula','Moddaning kimyoviy xossalarini saqlovchi eng kichik zarrasi.'],
    ['Atom','Kimyoviy elementning eng kichik zarrasi; molekulalar atomlardan tuzilgan.'],
    ['Agregat holat','Moddaning qattiq, suyuq yoki gaz holati.'],
    ['Kristall panjara','Qattiq jismda zarralarning tartibli, takrorlanuvchi joylashuvi.'],
    ['Issiqlik harakati','Zarralarning haroratga bog‘liq tartibsiz harakati.'],
    ['Diffuziya','Moddalarning zarralar harakati tufayli o‘z-o‘zidan aralashishi.'],
    ['Broun harakati','Suyuqlik yoki gazdagi mayda zarrachalarning tartibsiz titrashi.'],
    ['Mutlaq nol','Nazariy eng past harorat: −273,15 °C (0 K).'],
    ['Kelvin (K)','Mutlaq harorat birligi.']
  ],
  manba:FIZ6 + '; ' + WIKI + ': «Kinetic theory of gases», «Brownian motion», «Diffusion», «Loschmidt constant», «Properties of water», «Absolute zero»; Nobel mukofoti rasmiy sayti (J. Perrin, 1926). v = √(3RT/M) hisobi: N₂, M = 0,028 kg/mol.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model bilan kuzatish, oddiy tajriba (siyoh va suv), juftlikda taqqoslash jadvali',
    maqsad:{talimiy:'Moddaning molekulyar tuzilishi haqidagi asosiy qoidalarni, uch agregat holat farqini va diffuziya hodisasini tushuntirish.',
      tarbiyaviy:'Tabiat hodisalarini kuzatish va ilmiy asoslashga qiziqish, olimlar mehnatiga hurmat.',
      rivojlantiruvchi:'Kuzatish, taqqoslash va model asosida xulosa chiqarish ko‘nikmasi.'},
    natijalar:['Uch agregat holatni zarralar joylashuvi va harakati bo‘yicha taqqoslaydi','Harorat va zarralar tezligi bog‘lanishini aytadi','Diffuziyaga hayotdan 3 ta misol keltiradi','Diffuziya nega gazda tez, qattiq jismda sekin ekanini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Moddaning tuzilishi»','Ikki stakan (issiq va sovuq suv), siyoh yoki choy qopchasi','Atir yoki apelsin po‘sti (hid tarqalishi uchun)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Muammoli savol.</b> Sinfning bir burchagida atir sepiladi: «Hid qanday qilib boshqa burchakka yetib keldi?»','Taxmin aytadi.'],
      ['8–20','<b>3D kuzatish.</b> Uch holatni solishtirish, qattiq–suyuq–gaz bosqichlari; o‘quvchilar jadval to‘ldiradi (shakl, hajm, masofa, harakat).','Jadvalni to‘ldiradi.'],
      ['20–28','<b>Harorat.</b> Slayder bilan haroratni o‘zgartirish. Issiq va sovuq suvga bir vaqtda siyoh tomizish tajribasi.','Kuzatadi, xulosa yozadi.'],
      ['28–36','<b>Diffuziya.</b> Sahnada gaz va suyuqlikda diffuziya; hayotiy misollar (choy, o‘pka, tuzlash).','Misollar keltiradi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Topshiriqlarni bajaradi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Molekula','Moddaning eng kichik zarrasi.'],['Diffuziya','O‘z-o‘zidan aralashish.'],['Agregat holat','Qattiq, suyuq, gaz.'],['Broun harakati','Mayda zarrachalarning tartibsiz titrashi.']],
    savollar:[['Qaysi holatda modda hajmini saqlaydi, lekin shaklini saqlamaydi?','Suyuq'],['Diffuziya qayerda eng tez?','Gazda'],['Harorat ortsa zarralar tezligi?','Ortadi'],['Mutlaq nol?','−273,15 °C']],
    uy:'Darslikdagi mavzuni o‘qish; uyda tajriba: issiq va sovuq suvli stakanga bir vaqtda choy qopchasi solib, 5 daqiqadan keyingi rangni solishtirish va xulosa yozish; diffuziyaga 5 ta hayotiy misol.',
    manba:FIZ6
  }
};

/* =====================================================================
   2. NYUTON QONUNLARI VA ISHQALANISH — 7-sinf
   ===================================================================== */
D['fizika-nyuton'] = {
  fan:'fizika', qisqaNom:'Nyuton qonunlari', nom:'Nyuton qonunlari va ishqalanish',
  qisqa:'7-sinf · fizika · dinamika asoslari (9-sinfda chuqurlashtiriladi)', sinf:'7-sinf',
  sahna:'fa_nyuton',
  kor:{
    sarlavha:'Kuch tezlikni emas, tezlanishni beradi',
    matn:'Isaak Nyuton 1687-yilda «Natural falsafaning matematik asoslari» asarida harakatning uchta qonunini bayon qilgan. Bu virtual laboratoriyada yog‘och brusokni tortish kuchi F bilan harakatlantiramiz: havo yostiqli yo‘lda (ishqalanish deyarli yo‘q), muzda, yog‘och va rezina sirtda. Fotodarvozalar 1 m masofani bosib o‘tish vaqtini o‘lchaydi, tezlanish a = 2s/t² formulasi bilan topiladi. Kuch strelkalarini bosib, har bir kuch haqida o‘qing.',
    punktlar:[
      '<b>I qonun (inersiya):</b> kuchlar muvozanatlashsa, jism tinch turadi yoki to‘g‘ri chiziqli tekis harakatlanadi',
      '<b>II qonun:</b> a = F / m — tezlanish kuchga to‘g‘ri, massaga teskari proporsional',
      '<b>III qonun:</b> ta’sir aks ta’sirga teng va qarama-qarshi: F₁₂ = −F₂₁',
      '<b>Ishqalanish:</b> F<sub>ishq</sub> = μN — sirtga va bosish kuchiga bog‘liq'
    ]
  },
  bolimlar:[
    {sarlavha:'Ishqalanish koeffitsiyentlari (taxminiy)', jadval:[
      ['Havo yostiqli yo‘l','μ ≈ 0 (maktab tajribasi uchun ideal)'],
      ['Po‘lat — muz','μ ≈ 0,02–0,05'],
      ['Yog‘och — yog‘och','μ ≈ 0,2–0,5'],
      ['Rezina — quruq asfalt','μ ≈ 0,6–0,8'],
      ['Rezina — nam asfalt','μ ≈ 0,4–0,5']
    ], matn:'Qiymatlar sirtning holatiga qarab sezilarli o‘zgaradi, shuning uchun ma’lumotnomalarda oraliq bilan beriladi. Sahnada: muz 0,05, yog‘och 0,3, rezina 0,6 (sxematik).'},
    {sarlavha:'Kuchlar', jadval:[
      ['F — tortish kuchi','dinamometr ko‘rsatadi; N (nyuton) da o‘lchanadi'],
      ['mg — og‘irlik kuchi','Yer tortishishi; g ≈ 9,8 m/s²'],
      ['N — tayanch reaksiya kuchi','sirt jismga tik yo‘nalishda ta’sir qiladi (III qonun)'],
      ['F<sub>ishq</sub> — ishqalanish kuchi','harakatga (yoki harakat urinishiga) qarshi yo‘nalgan']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Kuchlar diagrammasi', matn:'Brusokka to‘rtta kuch ta’sir qiladi: tortish kuchi F, ishqalanish kuchi, og‘irlik kuchi mg va tayanch reaksiya kuchi N. Strelkalar uzunligi kuch kattaligiga mutanosib.', holat:{rejim:'gorizontal', sirt:'yogoch', F:8, m:2}},
    {sarlavha:'I qonun: kuchlar muvozanatda', matn:'F = 4 N bo‘lganda brusok qo‘zg‘almaydi: tinch holatdagi ishqalanish kuchi tortish kuchiga teng bo‘lib, uni muvozanatlaydi. Kuchlar yig‘indisi nolga teng — jism tinch turadi.', holat:{rejim:'gorizontal', sirt:'yogoch', F:4, m:2, boshla:true}},
    {sarlavha:'Ishqalanishsiz yo‘l: sof II qonun', matn:'Havo yostiqli yo‘lda ishqalanish deyarli yo‘q. F = 4 N, m = 2 kg: a = F/m = 2 m/s². «Boshlash» ni bosib, o‘lchangan qiymatni hisob bilan solishtiring.', holat:{rejim:'gorizontal', sirt:'havo', F:4, m:2, boshla:true}},
    {sarlavha:'Massa ikki barobar — tezlanish ikki barobar kichik', matn:'Kuch o‘sha (4 N), massa 4 kg: a = 1 m/s². Massa — jismning inertligi o‘lchovi: massa qancha katta bo‘lsa, tezligini o‘zgartirish shuncha qiyin.', holat:{rejim:'gorizontal', sirt:'havo', F:4, m:4, boshla:true}},
    {sarlavha:'Ishqalanish kuchi', matn:'Yog‘och sirtda F = 8 N, m = 2 kg: ishqalanish F<sub>ishq</sub> = μmg = 0,3·2·9,8 ≈ 5,9 N. Teng ta’sir etuvchi kuch 8 − 5,9 = 2,1 N, tezlanish ≈ 1,06 m/s².', holat:{rejim:'gorizontal', sirt:'yogoch', F:8, m:2, boshla:true}},
    {sarlavha:'Qiya tekislik', matn:'30° li qiyalikda, havo yo‘lida tortish kuchisiz: jism mg·sinα tashkil etuvchisi ta’sirida pastga sirpanadi, a = g·sinα = 9,8·0,5 = 4,9 m/s².', holat:{rejim:'qiya', sirt:'havo', F:0, m:1, burchak:30, boshla:true}},
    {sarlavha:'III qonun: tayanch reaksiya', matn:'Brusok sirtni mg kuch bilan bosadi, sirt esa uni xuddi shunday N kuch bilan yuqoriga itaradi. Bu kuchlar turli jismlarga qo‘yilgan — ular bir-birini «yo‘q qilmaydi».', holat:{rejim:'gorizontal', sirt:'rezina', F:6, m:1}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Nyuton qonunlarini o‘lchang', holat:{rejim:'gorizontal', sirt:'havo', F:2, m:1},
    topshiriqlar:[
      {shart:'<b>Havo yo‘li</b>da F = 4 N, m = 2 kg qo‘yib, «Boshlash» ni bosing va tezlanishni o‘lchang.', hodisa:'fa-nyuton', kod:"ev.olchandi && ev.sirt==='havo' && ev.F===4 && ev.m===2 && ev.rejim==='gorizontal'", izoh:'To‘g‘ri: a = F/m = 4 : 2 = <b>2 m/s²</b>.'},
      {shart:'Kuchni o‘zgartirmay (4 N), massani <b>4 kg</b> qiling va yana o‘lchang.', hodisa:'fa-nyuton', kod:"ev.olchandi && ev.sirt==='havo' && ev.F===4 && ev.m===4 && ev.rejim==='gorizontal'", izoh:'To‘g‘ri: a = 4 : 4 = <b>1 m/s²</b> — massa 2 marta ortsa, tezlanish 2 marta kamayadi.'},
      {shart:'<b>Yog‘och</b> sirtda brusok (m = 2 kg) <b>qo‘zg‘almaydigan</b> tortish kuchini toping va «Boshlash» ni bosing.', hodisa:'fa-nyuton', kod:"ev.qozgalmadi && ev.sirt==='yogoch' && ev.m===2 && ev.F>0", izoh:'To‘g‘ri — F ≤ μmg ≈ 5,9 N bo‘lsa, tinch holatdagi ishqalanish kuchi tortish kuchini muvozanatlaydi (I qonun).'},
      {shart:'<b>Qiya tekislik</b> rejimida α = 30° da jismni harakatga keltiring.', hodisa:'fa-nyuton', kod:"ev.olchandi && ev.rejim==='qiya' && ev.burchak===30", izoh:'To‘g‘ri — og‘irlik kuchining tekislik bo‘ylab tashkil etuvchisi <b>mg·sinα</b> jismni tezlantiradi.'}
    ]},
  test:[
    {s:'Nyutonning ikkinchi qonuni formulasi qaysi?', v:['F = m / a','a = F / m','a = m · F','F = m + a'], t:1, izoh:'<b>a = F / m</b> (yoki F = ma): tezlanish kuchga to‘g‘ri, massaga teskari proporsional.'},
    {s:'1 nyuton nimaga teng?', v:['1 kg · m/s','1 kg · m/s²','1 g · cm/s²','1 kg / m²'], t:1, izoh:'<b>1 N = 1 kg · m/s²</b> — 1 kg massaga 1 m/s² tezlanish beradigan kuch.'},
    {s:'Kuch 6 N, massa 3 kg, ishqalanish yo‘q. Tezlanish qancha?', v:['18 m/s²','0,5 m/s²','2 m/s²','3 m/s²'], t:2, izoh:'a = F/m = 6 : 3 = <b>2 m/s²</b>.'},
    {s:'Avtobus keskin tormozlaganda yo‘lovchilar oldinga og‘adi. Bu qaysi qonunning ko‘rinishi?', v:['Inersiya qonuni (I qonun)','III qonun','Butun olam tortishish qonuni','Arximed qonuni'], t:0, izoh:'<b>Inersiya qonuni (I qonun)</b>: tanamiz avvalgi tezligini saqlashga intiladi.'},
    {s:'Ishqalanish kuchi qaysi formula bilan hisoblanadi?', v:['F<sub>ishq</sub> = μN','F<sub>ishq</sub> = N / μ','F<sub>ishq</sub> = μ + N','F<sub>ishq</sub> = mgh'], t:0, izoh:'<b>F<sub>ishq</sub> = μN</b>: μ — ishqalanish koeffitsiyenti, N — tayanch reaksiya (bosish) kuchi.'},
    {s:'Massasi 2 kg brusok yog‘och sirtda (μ = 0,3) turibdi. Uni qo‘zg‘atish uchun tortish kuchi taxminan qanchadan katta bo‘lishi kerak? (g = 9,8 m/s²)', v:['0,6 N','2 N','5,9 N','19,6 N'], t:2, izoh:'μmg = 0,3 · 2 · 9,8 ≈ <b>5,9 N</b>.'},
    {s:'Nyutonning III qonuniga ko‘ra ta’sir va aks ta’sir kuchlari…', v:['bir jismga qo‘yilgan va bir-birini muvozanatlaydi','kattaligi teng, yo‘nalishi qarama-qarshi va turli jismlarga qo‘yilgan','har doim har xil kattalikda','faqat harakatdagi jismlarda paydo bo‘ladi'], t:1, izoh:'Ular <b>kattaligi teng, yo‘nalishi qarama-qarshi va turli jismlarga qo‘yilgan</b>, shuning uchun bir-birini «yo‘q qilmaydi».'},
    {s:'Ishqalanishsiz qiya tekislik 30°. Jism tezlanishi qancha? (g = 9,8 m/s²)', v:['9,8 m/s²','4,9 m/s²','8,5 m/s²','0 m/s²'], t:1, izoh:'a = g · sin30° = 9,8 · 0,5 = <b>4,9 m/s²</b>.'},
    {s:'Nyuton harakat qonunlarini qaysi yili e’lon qilgan?', v:['1543','1609','1687','1905'], t:2, izoh:'<b>1687-yilda</b>, «Natural falsafaning matematik asoslari» (Principia) asarida. 1543 — Kopernik, 1609 — Kepler, 1905 — Eynshteyn.'},
    {tur:'3d', s:'Sahnada <b>ishqalanish kuchini</b> ko‘rsatuvchi strelkani bosing.', hodisa:'fa-kuch', togri:['ishqalanish'], v:['Ishqalanish kuchi strelkasi','boshqa kuch yoki jism'], t:0, izoh:'<b>Ishqalanish kuchi</b> (qizil strelka) sirt bo‘ylab, harakatga qarshi yo‘nalgan.'}
  ],
  yordamchi:[
    {s:'Nega o‘lchangan va hisoblangan tezlanish bir xil?', j:'Bu virtual tajriba: hech qanday tasodifiy xato yo‘q, vaqt aniq hisoblanadi. Haqiqiy laboratoriyada esa sekundomer, havo qarshiligi va g‘ildiraklar ishqalanishi tufayli natijalar biroz farq qiladi — shuning uchun tajriba bir necha marta takrorlanib, o‘rtachasi olinadi.', kalit:['o‘lchov','xato','bir xil']},
    {s:'Tinch holatdagi ishqalanish nima?', j:'Jismni siljitishga uringaningizda, lekin u hali qo‘zg‘almaganda paydo bo‘ladigan kuch. U tortish kuchiga teng bo‘lib, maksimal qiymatgacha (≈ μN) o‘sadi. Kuch shundan oshgach, jism sirpana boshlaydi.', kalit:['tinch','ishqalanish','qo‘zg‘al']}
  ],
  maqola:[
    {sarlavha:'Aristoteldan Nyutongacha', xatboshilar:[
      'Qadimda Aristotel «jism harakatlanishi uchun unga doim kuch ta’sir qilishi kerak» deb hisoblagan. Kundalik tajriba buni tasdiqlagandek edi: aravani itarmasangiz, u to‘xtaydi. Galileo Galiley XVII asr boshida qiya tekisliklar bilan tajribalar o‘tkazib, jism to‘xtashiga ishqalanish sabab ekanini tushungan: ishqalanish bo‘lmasa, jism harakatini cheksiz davom ettiradi.',
      'Isaak Nyuton (1643–1727) Galiley va boshqa olimlar g‘oyalarini umumlashtirib, 1687-yilda «Natural falsafaning matematik asoslari» (lotincha «Principia») asarida harakatning uchta qonunini va butun olam tortishish qonunini bayon qilgan. Bu qonunlar klassik mexanikaning poydevori bo‘ldi.'
    ]},
    {sarlavha:'Uch qonun', xatboshilar:[
      'Birinchi qonun (inersiya qonuni): agar jismga boshqa jismlar ta’sir qilmasa yoki ularning ta’siri muvozanatlashsa, jism tinch holatini yoki to‘g‘ri chiziqli tekis harakatini saqlaydi. Jismning tezligini saqlash xususiyati inersiya deyiladi, uning o‘lchovi esa massa.',
      'Ikkinchi qonun: jismning tezlanishi unga ta’sir etuvchi kuchlarning teng ta’sir etuvchisiga to‘g‘ri, massasiga teskari proporsional: a = F/m, yoki F = ma. Kuch birligi — nyuton: 1 N = 1 kg·m/s². Masalan, 2 kg aravachaga 4 N teng ta’sir etuvchi kuch 2 m/s² tezlanish beradi.',
      'Uchinchi qonun: ikki jism bir-biriga kattaligi teng, yo‘nalishi qarama-qarshi kuchlar bilan ta’sir qiladi. Suzuvchi suvni orqaga itaradi — suv uni oldinga itaradi; raketa gazni orqaga otadi — gaz raketani oldinga itaradi. Bu kuchlar turli jismlarga qo‘yilgani uchun bir-birini muvozanatlamaydi.'
    ]},
    {sarlavha:'Ishqalanish kuchi', xatboshilar:[
      'Ishqalanish kuchi bir jism boshqasining sirti bo‘ylab harakatlanganda (yoki harakatlanishga uringanda) paydo bo‘ladi va harakatga qarshi yo‘naladi. Uning sababi — sirtlardagi notekisliklar va zarralarning o‘zaro tortishishi.',
      'Sirpanish ishqalanish kuchi taxminan F<sub>ishq</sub> = μN formula bilan topiladi. Bu yerda N — sirtning jismga ta’sir qiluvchi tayanch reaksiya kuchi (gorizontal sirtda N = mg), μ — ishqalanish koeffitsiyenti. μ sirtlar materialiga va holatiga bog‘liq: muzda juda kichik, quruq asfaltdagi rezinada katta.',
      'Ishqalanish ham zararli, ham foydali. Mashina qismlarida u energiyani isrof qiladi va yeyilishga olib keladi — shuning uchun moylash, podshipniklar ishlatiladi. Lekin ishqalanishsiz yurib ham bo‘lmas edi: poyabzal yerga ishqalanmasa, oldinga siljimaymiz; tormozlar ham ishqalanish tufayli ishlaydi. Qishda muzli yo‘lga qum sepish — ishqalanishni oshirish usuli.'
    ]},
    {sarlavha:'Qiya tekislikda harakat', xatboshilar:[
      'Qiya tekislikda og‘irlik kuchi ikki tashkil etuvchiga ajraladi: tekislik bo‘ylab mg·sinα (jismni pastga tortadi) va tekislikka tik mg·cosα (uni tayanch reaksiya kuchi N muvozanatlaydi). Ishqalanish bo‘lmasa, jism tezlanishi a = g·sinα.',
      'Ishqalanish bo‘lsa, u F<sub>ishq</sub> = μ·mg·cosα ga teng. Agar mg·sinα ≤ μ·mg·cosα, ya’ni tgα ≤ μ bo‘lsa, jism qiyalikda tinch turadi. Shu tufayli tog‘ yo‘llarida qiyaliklar cheklanadi, qishda esa ular ayniqsa xavfli bo‘ladi.'
    ]}
  ],
  formulalar:[
    ['a = F / m  (F = ma)','Nyutonning II qonuni'],
    ['F<sub>ishq</sub> = μN','Sirpanish ishqalanish kuchi'],
    ['F<sub>og‘</sub> = mg, g ≈ 9,8 m/s²','Og‘irlik kuchi'],
    ['a = (F − μmg) / m','Gorizontal sirtda tortish va ishqalanish'],
    ['a = g·sinα − μg·cosα','Qiya tekislikda pastga sirpanish'],
    ['s = at² / 2 → a = 2s / t²','Tinch holatdan tekis tezlanuvchan harakat (fotodarvoza o‘lchovi)'],
    ['F₁₂ = −F₂₁','Nyutonning III qonuni']
  ],
  qiziqarli:[
    '«Principia» 1687-yil 5-iyulda nashr etilgan; asarni chop etish xarajatini Nyutonning do‘sti Edmond Galley o‘z hisobidan to‘lagan.',
    'Kosmonavtlar vaznsizlikda massani tarozida emas, prujinali «tebranuvchi o‘rindiq»da o‘lchaydi: tebranish davri massaga bog‘liq — bu II qonundan kelib chiqadi.',
    'Havo yostiqli yo‘lda aravacha kichik teshiklardan chiqayotgan havo «yostig‘i» ustida suzadi — maktab laboratoriyalarida ishqalanishsiz harakatni ko‘rsatish uchun ishlatiladi.',
    'Muz ustida sirpanishning sababi hanuz olimlar orasida muhokama qilinadi: faqat «bosimdan erigan suv qatlami» emas, muz sirtidagi yupqa suyuqsimon qatlam ham muhim deb hisoblanadi.'
  ],
  lugat:[
    ['Kuch','Jismlarning o‘zaro ta’siri o‘lchovi; birligi — nyuton (N).'],
    ['Inersiya','Jismning tezligini saqlash xususiyati.'],
    ['Massa','Inertlik o‘lchovi; birligi — kilogramm (kg).'],
    ['Tezlanish','Tezlikning vaqt birligida o‘zgarishi; m/s².'],
    ['Teng ta’sir etuvchi kuch','Jismga ta’sir qiluvchi barcha kuchlarning vektor yig‘indisi.'],
    ['Ishqalanish kuchi','Sirtlar tegib harakatlanganda paydo bo‘ladigan, harakatga qarshi kuch.'],
    ['Ishqalanish koeffitsiyenti (μ)','Sirtlar juftligiga bog‘liq o‘lchamsiz son.'],
    ['Tayanch reaksiya kuchi','Sirtning jismga tik yo‘nalishda ta’sir qiluvchi kuchi.'],
    ['Dinamometr','Kuchni o‘lchovchi asbob.'],
    ['Fotodarvoza','Jism yorug‘lik nurini kesib o‘tgan vaqtni qayd qiluvchi datchik.']
  ],
  manba:FIZ7 + '; ' + WIKI + ': «Newton’s laws of motion», «Philosophiæ Naturalis Principia Mathematica», «Friction» (ishqalanish koeffitsiyentlari jadvali), «Standard gravity»; The Engineering ToolBox «Friction and Friction Coefficients» (taxminiy qiymatlar).',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Aralash (yangi bilim + virtual laboratoriya ishi)', usul:'Virtual o‘lchov, jadval tuzish, juftlikda masala yechish, muammoli savol',
    maqsad:{talimiy:'Nyutonning uch qonunini va ishqalanish kuchini tushuntirish; a = F/m bog‘lanishini tajribada tekshirish.',
      tarbiyaviy:'Ilmiy tajribaga ishonch, ehtiyotkorlik (yo‘lda ishqalanish va xavfsizlik).',
      rivojlantiruvchi:'O‘lchov natijalarini jadvalga yozish, grafik va formula orqali xulosa chiqarish.'},
    natijalar:['Nyutonning uch qonunini misollar bilan aytadi','a = F/m formulasi bilan masala yechadi','Ishqalanish kuchini F = μN bilan hisoblaydi','Jismga ta’sir etuvchi kuchlarni chizmada ko‘rsatadi'],
    jihozlar:['MAKON sahnasi «Nyuton qonunlari»','Dinamometr, yog‘och brusok, yuklar (bo‘lsa)','Proyektor','Darslik, jadval uchun daftar'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Muammo.</b> «Nega itarishni to‘xtatsak, arava to‘xtaydi? Aristotel haqmi?»','Fikr bildiradi.'],
      ['8–18','<b>I va II qonun.</b> Havo yo‘lida F va m ni o‘zgartirib o‘lchash; natijalar jadvali (F, m, a).','Jadval to‘ldiradi, bog‘lanishni topadi.'],
      ['18–26','<b>Ishqalanish.</b> Sirtlarni almashtirish, qo‘zg‘almaslik sharti F ≤ μmg.','Hisoblaydi, tekshiradi.'],
      ['26–32','<b>Qiya tekislik va III qonun.</b> mg·sinα, tayanch reaksiya.','Kuchlar chizmasini chizadi.'],
      ['32–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test; 2 ta masala.','Bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Inersiya','Tezlikni saqlash xususiyati.'],['Nyuton (N)','Kuch birligi: 1 kg·m/s².'],['Ishqalanish koeffitsiyenti','μ, sirtga bog‘liq son.']],
    savollar:[['F = 10 N, m = 5 kg. a = ?','2 m/s²'],['μ = 0,2, m = 3 kg. F<sub>ishq</sub> = ? (g = 9,8)','≈ 5,9 N'],['Raketa uchishi qaysi qonunga misol?','III qonun']],
    uy:'Darslikdagi mavzuni o‘qish; 3 ta masala: (1) 1 200 kg avtomobilga 3 600 N teng ta’sir etuvchi kuch — tezlanish? (javob: 3 m/s²); (2) 5 kg quti, μ = 0,25 — uni tekis tortish uchun kuch? (≈ 12,3 N); (3) III qonunga uydan 3 ta misol.',
    manba:FIZ7
  }
};

/* =====================================================================
   3. MAGNIT MAYDON VA ELEKTROMAGNIT INDUKSIYA — 9-sinf
   ===================================================================== */
D['fizika-magnit'] = {
  fan:'fizika', qisqaNom:'Induksiya', nom:'Magnit maydon va elektromagnit induksiya',
  qisqa:'9-sinf · fizika · Faradey tajribasi, Lens qoidasi (11-sinfda chuqurlashtiriladi)', sinf:'9-sinf',
  sahna:'fa_magnit',
  kor:{
    sarlavha:'O‘zgaruvchan magnit oqimi tok hosil qiladi',
    matn:'1831-yilda Maykl Faradey magnitni g‘altak ichiga kiritib-chiqarganda, g‘altakka ulangan galvanometr strelkasi og‘ishini kashf qilgan. Bu hodisa elektromagnit induksiya deyiladi: g‘altakni kesib o‘tuvchi magnit oqimi o‘zgarsa, unda induksion tok paydo bo‘ladi. Sahnada magnitni slayder bilan suring yoki «Avto» ni yoqing, o‘ramlar sonini va qutbni o‘zgartiring. Ko‘k chiziqlar — magnit maydon chiziqlari; sariq strelkalar — tokning shartli yo‘nalishi.',
    punktlar:[
      '<b>Magnit maydon</b> chiziqlari magnitdan tashqarida N qutbdan chiqib, S qutbga kiradi',
      '<b>Induksiya sharti:</b> magnit oqimi <i>o‘zgarishi</i> kerak — tinch magnit tok bermaydi',
      '<b>Faradey qonuni:</b> ε = −N·ΔΦ/Δt — tez harakat va ko‘p o‘ram kattaroq tok beradi',
      '<b>Lens qoidasi:</b> induksion tok o‘zini hosil qilgan o‘zgarishga qarshilik qiladi'
    ]
  },
  bolimlar:[
    {sarlavha:'Nimaga bog‘liq?', jadval:[
      ['Magnit tezligi','tezroq → ΔΦ/Δt katta → tok kuchli'],
      ['O‘ramlar soni N','ko‘p o‘ram → EYuK N marta ortadi'],
      ['Magnit kuchi','kuchliroq magnit → oqim o‘zgarishi katta'],
      ['Harakat yo‘nalishi','kiritish va chiqarishda tok yo‘nalishi qarama-qarshi'],
      ['Magnit tinch','ΔΦ = 0 → tok yo‘q (magnit g‘altak ichida bo‘lsa ham)']
    ]},
    {sarlavha:'Magnit maydon induksiyasi (taxminiy qiymatlar)', jadval:[
      ['Yerning magnit maydoni','≈ 25–65 mkTl (joyga qarab)'],
      ['Oshxona magniti','≈ 5 mTl'],
      ['Neodim magnit (qoldiq induksiya)','≈ 1–1,4 Tl'],
      ['MRT tomograf','1,5–3 Tl (ko‘pchiligi)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Asboblar: magnit, g‘altak, galvanometr', matn:'Doimiy magnitning qizil uchi — shimoliy qutb (N), ko‘k uchi — janubiy qutb (S). G‘altak mis simdan o‘ralgan, uning uchlari sezgir tok o‘lchagich — galvanometrga ulangan.', holat:{harakat:'toxta', orin:0, orom:200, qutb:'N'}},
    {sarlavha:'Magnit maydon chiziqlari', matn:'Maydon chiziqlari magnitdan tashqarida N dan chiqib S ga kiradi. Qutblar yaqinida chiziqlar zich — maydon kuchli, uzoqlashgan sari siyraklashadi.', holat:{harakat:'toxta', orin:15, qutb:'N', orom:200}},
    {sarlavha:'Magnitni kiritamiz — tok paydo bo‘ladi', matn:'Magnit g‘altakka yaqinlashganda uni kesib o‘tuvchi magnit oqimi ortadi — galvanometr strelkasi og‘adi. Bu induksion tok.', holat:{harakat:'avto', tez:'sekin', orom:200, qutb:'N'}},
    {sarlavha:'Magnit tinch — tok yo‘q', matn:'Magnit g‘altak ichida to‘xtasa, oqim o‘zgarmaydi va strelka nolga qaytadi. Muhimi — magnit bor-yo‘qligi emas, oqimning o‘zgarishi.', holat:{harakat:'toxta', orin:100, qutb:'N'}},
    {sarlavha:'Tezlik va o‘ramlar soni', matn:'Magnitni tezroq harakatlantiring va o‘ramlarni 400 ga yetkazing: strelka ko‘proq og‘adi. ε = −N·ΔΦ/Δt: o‘ramlar ko‘p va o‘zgarish tez bo‘lsa, EYuK katta.', holat:{harakat:'avto', tez:'tez', orom:400, qutb:'N'}},
    {sarlavha:'Lens qoidasi', matn:'N qutb yaqinlashganda g‘altakning shu uchida ham N qutb hosil bo‘ladi va magnitni itaradi; magnit uzoqlashganda — S qutb hosil bo‘lib, uni tortadi. Induksion tok har doim o‘zgarishga qarshilik qiladi.', holat:{harakat:'avto', tez:'sekin', orom:200, qutb:'N'}},
    {sarlavha:'Qutbni almashtiramiz', matn:'Magnitni S qutbi bilan kiritsak, tok yo‘nalishi teskari bo‘ladi — strelka boshqa tomonga og‘adi. Generatorlarda magnit yoki g‘altak aylanib, yo‘nalishi davriy o‘zgaradigan — o‘zgaruvchan tok hosil qiladi.', holat:{harakat:'avto', tez:'sekin', orom:200, qutb:'S'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Faradey tajribasini takrorlang', holat:{harakat:'toxta', orin:0, orom:200, qutb:'N', tez:'sekin'},
    topshiriqlar:[
      {shart:'Magnitni <b>g‘altakka kiriting</b> (slayderni suring yoki «Avto» ni bosing) — strelka og‘sin.', hodisa:'fa-induksiya', kod:"ev.harakat==='kirish' && Math.abs(ev.I)>=0.12", izoh:'To‘g‘ri — magnit oqimi ortdi va g‘altakda <b>induksion tok</b> paydo bo‘ldi.'},
      {shart:'Endi magnitni <b>g‘altakdan chiqaring</b> — strelka qaysi tomonga og‘adi?', hodisa:'fa-induksiya', kod:"ev.harakat==='chiqish' && Math.abs(ev.I)>=0.12", izoh:'To‘g‘ri — chiqarishda oqim kamayadi va tok <b>teskari yo‘nalishda</b> oqadi.'},
      {shart:'Magnitni <b>g‘altak ichida to‘xtating</b> (slayderni 90–100 % ga qo‘yib, «To‘xtatish»).', hodisa:'fa-induksiya', kod:"ev.harakat==='tinch' && ev.ichida", izoh:'To‘g‘ri — magnit g‘altak ichida bo‘lsa ham, oqim <b>o‘zgarmasa tok yo‘q</b>.'},
      {shart:'O‘ramlar sonini <b>400</b> qiling va magnitni harakatlantirib, tokni (nisbiy) kamida 0,4 ga yetkazing.', hodisa:'fa-induksiya', kod:"ev.orom===400 && Math.abs(ev.I)>=0.4", izoh:'To‘g‘ri — EYuK o‘ramlar soniga proporsional: <b>ε = −N·ΔΦ/Δt</b>.'},
      {shart:'Qutbni almashtiring va magnitni <b>S qutbi bilan</b> g‘altakka kiriting.', hodisa:'fa-induksiya', kod:"ev.qutb==='S' && ev.harakat==='kirish' && Math.abs(ev.I)>=0.12", izoh:'To‘g‘ri — qutb almashganda induksion tok yo‘nalishi ham <b>teskari</b> bo‘ladi.'}
    ]},
  test:[
    {s:'Elektromagnit induksiya hodisasini kim kashf qilgan?', v:['Xans Kristian Ersted','Maykl Faradey','Aleksandro Volta','Isaak Nyuton'], t:1, izoh:'<b>Maykl Faradey</b>, 1831-yilda. Ersted 1820-yilda tokning magnit ta’sirini kashf qilgan.'},
    {s:'G‘altakda induksion tok qachon paydo bo‘ladi?', v:['G‘altak ichida magnit bo‘lsa','G‘altakni kesib o‘tuvchi magnit oqimi o‘zgarsa','G‘altak isitilganda','Galvanometr ulansa'], t:1, izoh:'Induksiya sharti — <b>magnit oqimining o‘zgarishi</b>. Tinch magnit tok hosil qilmaydi.'},
    {s:'Magnit g‘altak ichida tinch tursa, galvanometr nimani ko‘rsatadi?', v:['Maksimal tokni','Nolni','Tok yo‘nalishi almashib turadi','O‘ramlar soniga bog‘liq doimiy tokni'], t:1, izoh:'<b>Nolni</b> — oqim o‘zgarmaydi, demak EYuK ham nolga teng.'},
    {s:'Faradey qonuni formulasi qaysi?', v:['ε = −N · ΔΦ / Δt','ε = N · Φ · t','ε = I · R · N','ε = Φ / N'], t:0, izoh:'<b>ε = −N · ΔΦ / Δt</b>: EYuK o‘ramlar soniga va oqimning o‘zgarish tezligiga bog‘liq; minus — Lens qoidasi.'},
    {s:'Lens qoidasi nimani aytadi?', v:['Induksion tok har doim soat mili bo‘ylab oqadi','Induksion tok o‘zini hosil qilgan magnit oqimi o‘zgarishiga qarshilik qiladi','Tok kuchi kuchlanishga proporsional','Magnit qutblarini ajratib bo‘lmaydi'], t:1, izoh:'<b>Induksion tok o‘zini hosil qilgan o‘zgarishga qarshilik qiladi</b> (E. Lens, 1834) — energiya saqlanish qonunining natijasi.'},
    {s:'Magnit oqimi birligi qanday ataladi?', v:['Tesla','Veber','Genri','Om'], t:1, izoh:'Magnit oqimi birligi — <b>veber</b> (Wb). Tesla — magnit induksiyasi birligi.'},
    {s:'O‘ramlar soni 2 marta oshirilsa (boshqa sharoit o‘zgarmasa), induksiya EYuK qanday o‘zgaradi?', v:['2 marta kamayadi','O‘zgarmaydi','2 marta ortadi','4 marta ortadi'], t:2, izoh:'ε ~ N, demak <b>2 marta ortadi</b>.'},
    {s:'Magnit maydon chiziqlari magnitdan tashqarida qanday yo‘nalgan?', v:['S dan N ga','N dan S ga','Magnitga parallel emas, aylana bo‘ylab','Faqat N qutbga kiradi'], t:1, izoh:'Tashqarida <b>N dan S ga</b>; magnit ichida esa S dan N ga — chiziqlar berk.'},
    {s:'Elektromagnit induksiyaga asoslangan qurilma qaysi?', v:['Elektr generatori','Cho‘g‘lanma lampa','Termometr','Linza'], t:0, izoh:'<b>Elektr generatori</b> (shuningdek transformator, induksion plita, simsiz zaryadlovchi).'},
    {tur:'3d', s:'Sahnada <b>induksion tokni qayd etadigan asbobni</b> bosing.', hodisa:'fa-magnit-qism', togri:['galvanometr'], v:['Galvanometr','boshqa qism'], t:0, izoh:'<b>Galvanometr</b> — kichik toklarni o‘lchaydigan sezgir asbob; strelkasi nol markazda, ikki tomonga og‘adi.'}
  ],
  yordamchi:[
    {s:'Nega strelka goh chapga, goh o‘ngga og‘adi?', j:'Magnit kirganda oqim ortadi, chiqqanda kamayadi. Lens qoidasiga ko‘ra, induksion tok bu o‘zgarishlarga qarshilik qiladi, shuning uchun yo‘nalishi qarama-qarshi bo‘ladi.', kalit:['chap','o‘ng','yo‘nalish','strelka']},
    {s:'Tok «nisbiy» deb nega yozilgan?', j:'Sahna sxematik model: magnit, g‘altak va galvanometrning haqiqiy parametrlari berilmagan, shuning uchun tok eng katta og‘ishga nisbatan (−1…+1) ko‘rsatiladi. Bog‘lanishlar (tezlik, o‘ramlar, yo‘nalish) esa haqiqiy fizikaga mos.', kalit:['nisbiy','qiymat','amper']}
  ],
  maqola:[
    {sarlavha:'Magnit maydon', xatboshilar:[
      'Doimiy magnitning ikki qutbi bor: shimoliy (N) va janubiy (S). Bir xil qutblar itarishadi, har xillari tortishadi. Magnitni qancha bo‘lmang, har bir bo‘lakda yana ikki qutb bo‘ladi — alohida «shimoliy magnit» mavjud emas.',
      'Magnit atrofida magnit maydon mavjud. Uni maydon chiziqlari bilan tasvirlaymiz: magnitdan tashqarida ular N qutbdan chiqib S qutbga kiradi, ichida esa S dan N ga boradi — chiziqlar berk. Chiziqlar zich joyda maydon kuchli. Magnit maydon kuch xarakteristikasi — magnit induksiyasi B, birligi tesla (Tl).',
      '1820-yilda daniyalik olim Xans Kristian Ersted tokli sim yonidagi kompas strelkasi burilishini kuzatgan: elektr toki magnit maydon hosil qiladi. Shundan keyin olimlar teskari savolni berdi: magnit maydon yordamida tok hosil qilish mumkinmi?'
    ]},
    {sarlavha:'Faradey kashfiyoti', xatboshilar:[
      'Ingliz olimi Maykl Faradey bu savolga 1831-yilda javob topgan. U tokni magnit maydon emas, magnit maydonning o‘zgarishi hosil qilishini aniqladi. Magnitni g‘altakka kiritish yoki chiqarish, g‘altakni magnitga yaqinlashtirish, qo‘shni g‘altakdagi tokni ulash-uzish — barcha hollarda galvanometr qisqa vaqt tok ko‘rsatgan.',
      'Buni miqdoriy ifodalash uchun magnit oqimi tushunchasi kiritiladi: Φ = B·S·cosα — kontur yuzasi S orqali o‘tuvchi «maydon chiziqlari soni». Faradey qonuniga ko‘ra, N o‘ramli g‘altakdagi induksiya EYuK ε = −N·ΔΦ/Δt. Oqim qancha tez o‘zgarsa va o‘ramlar qancha ko‘p bo‘lsa, EYuK shuncha katta.'
    ]},
    {sarlavha:'Lens qoidasi', xatboshilar:[
      '1834-yilda Emiliy Lens induksion tok yo‘nalishini aniqlash qoidasini topgan: induksion tok shunday yo‘naladiki, uning magnit maydoni o‘zini hosil qilgan magnit oqimi o‘zgarishiga qarshilik qiladi. Faradey formulasidagi minus ishorasi shuni bildiradi.',
      'Misol: magnitning N qutbi g‘altakka yaqinlashmoqda. G‘altakning magnitga qaragan uchida ham N qutb hosil bo‘ladi va magnitni itaradi. Magnit uzoqlashsa — S qutb paydo bo‘lib, uni ushlab qolishga intiladi. Shuning uchun magnitni harakatlantirish uchun ish bajarish kerak — bu ish elektr energiyasiga aylanadi. Lens qoidasi energiya saqlanish qonuniga mos.'
    ]},
    {sarlavha:'Induksiya texnikada', xatboshilar:[
      'Elektr stansiyalaridagi generatorlarda magnit maydonida g‘altaklar (yoki g‘altaklar ichida magnitlar) aylanadi va o‘zgaruvchan tok hosil bo‘ladi. O‘zbekiston elektr tarmog‘ida tok chastotasi 50 Hz — yo‘nalish sekundiga 100 marta o‘zgaradi.',
      'Transformator ham induksiyaga asoslangan: birlamchi g‘altakdagi o‘zgaruvchan tok o‘zakda o‘zgaruvchan magnit oqimi hosil qiladi va u ikkilamchi g‘altakda kuchlanish induksiyalaydi. Shu yo‘l bilan elektr energiyasi uzoq masofaga yuqori kuchlanishda uzatiladi.',
      'Induksion plitalar, simsiz zaryadlovchilar, metall detektorlar, bank kartalaridagi kontaktsiz to‘lov, velosiped dinamo-fonari — barchasi elektromagnit induksiya tufayli ishlaydi.'
    ]}
  ],
  formulalar:[
    ['Φ = B · S · cosα','Magnit oqimi; birligi — veber (Wb = Tl·m²)'],
    ['ε = −N · ΔΦ / Δt','Faradey qonuni (minus — Lens qoidasi)'],
    ['I = ε / R','Induksion tok (Om qonuni bo‘yicha)'],
    ['U₁ / U₂ = N₁ / N₂','Ideal transformator']
  ],
  qiziqarli:[
    'Faradey induksiyani 1831-yil 29-avgustda kashf qilgan; u maktabda deyarli o‘qimagan, kitob muqovalovchi shogirdi bo‘lib ishlagan.',
    'Kompas strelkasining N uchi shimolga qaraydi — demak Yerning geografik shimoliy qutbi yaqinida magnit maydonning janubiy qutbi joylashgan.',
    'Magnitni mis quvur ichiga tashlasangiz, u juda sekin tushadi: quvur devorida induksion (uyurma) toklar paydo bo‘lib, Lens qoidasiga ko‘ra tushishga qarshilik qiladi.',
    'Yerning magnit maydoni (≈ 25–65 mkTl) Quyoshdan kelayotgan zaryadli zarralarni og‘diradi; qutb yog‘dulari ularning atmosfera bilan to‘qnashuvidan hosil bo‘ladi.'
  ],
  lugat:[
    ['Magnit maydon','Magnit va tokli o‘tkazgich atrofidagi, magnitlarga ta’sir qiluvchi maydon.'],
    ['Magnit induksiyasi (B)','Magnit maydonning kuch xarakteristikasi; birligi — tesla (Tl).'],
    ['Magnit oqimi (Φ)','Yuza orqali o‘tuvchi magnit maydon miqdori; birligi — veber (Wb).'],
    ['Elektromagnit induksiya','Magnit oqimi o‘zgarganda o‘tkazgichda EYuK va tok paydo bo‘lishi.'],
    ['Induksion tok','Elektromagnit induksiya natijasida hosil bo‘lgan tok.'],
    ['EYuK','Elektr yurituvchi kuch; volt (V) da o‘lchanadi.'],
    ['G‘altak','O‘ramlar shaklida o‘ralgan izolyatsiyalangan sim.'],
    ['Galvanometr','Kichik toklarni sezuvchi, nol-markazli o‘lchov asbobi.'],
    ['Lens qoidasi','Induksion tok yo‘nalishini aniqlash qoidasi.'],
    ['Generator','Mexanik energiyani elektr energiyasiga aylantiruvchi qurilma.']
  ],
  manba:FIZ9 + '; ' + WIKI + ': «Electromagnetic induction», «Faraday’s law of induction», «Lenz’s law», «Michael Faraday», «Hans Christian Ørsted», «Earth’s magnetic field» (25–65 mkTl), «Neodymium magnet», «Magnetic resonance imaging»; O‘zbekiston elektr tarmog‘i chastotasi — 50 Hz. Sahna: magnit ikki qutbli sxematik model, tok nisbiy birlikda.',
  ishlanma:{
    sinf:'9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (tajriba asosida)', usul:'Virtual tajriba, kuzatish jadvali, «bashorat qil — kuzat — tushuntir», juftlikda ishlash',
    maqsad:{talimiy:'Elektromagnit induksiya hodisasi, induksiya sharti, Faradey qonuni va Lens qoidasini o‘rganish.',
      tarbiyaviy:'Ilmiy kashfiyotlarning texnika va kundalik hayotdagi ahamiyatini anglash; energiyani tejash madaniyati.',
      rivojlantiruvchi:'Bashorat qilish, tajribada tekshirish, sabab-oqibat bog‘lash.'},
    natijalar:['Induksion tok paydo bo‘lish shartini aytadi','EYuK nimalarga bog‘liqligini tajribada ko‘rsatadi','Lens qoidasi bilan tok yo‘nalishini aniqlaydi','Induksiyaga asoslangan 3 ta qurilmani sanaydi'],
    jihozlar:['MAKON sahnasi «Elektromagnit induksiya»','Tasma magnit, g‘altak, galvanometr (bo‘lsa — haqiqiy tajriba)','Kompas','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Takrorlash.</b> Magnit qutblari, Ersted tajribasi. Savol: «Magnitdan tok olish mumkinmi?»','Javob beradi, bashorat qiladi.'],
      ['8–20','<b>Tajriba.</b> Magnitni kiritish/chiqarish/to‘xtatish; kuzatish jadvali (harakat, strelka).','Jadval to‘ldiradi.'],
      ['20–28','<b>Qonuniyat.</b> Tezlik va o‘ramlar ta’siri; Faradey qonuni formulasi.','Xulosa yozadi.'],
      ['28–34','<b>Lens qoidasi.</b> G‘altak uchidagi qutbni aniqlash; energiya saqlanishi bilan bog‘lash.','Qutbni aniqlaydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON amaliyoti, test; generator va transformator haqida qisqa suhbat.','Bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Induksiya','Magnit oqimi o‘zgarishidan tok hosil bo‘lishi.'],['Magnit oqimi','Φ = BS cosα.'],['Lens qoidasi','Tok o‘zgarishga qarshilik qiladi.']],
    savollar:[['Tinch magnit g‘altakda tok hosil qiladimi?','Yo‘q'],['EYuK N ga qanday bog‘liq?','To‘g‘ri proporsional'],['Induksiyani kim, qachon kashf qilgan?','M. Faradey, 1831']],
    uy:'Darslikdagi mavzuni o‘qish; uydagi induksiyaga asoslangan 3 ta qurilmani topib, qanday ishlashini 2–3 gapda yozish; masala: g‘altakda 200 o‘ram, oqim 0,1 s da 0,002 Wb ga o‘zgardi — EYuK? (javob: 4 V).',
    manba:FIZ9
  }
};

/* =====================================================================
   4. ATOM YADROSI VA RADIOAKTIVLIK — 11-sinf
   ===================================================================== */
D['fizika-yadro'] = {
  fan:'fizika', qisqaNom:'Radioaktivlik', nom:'Atom yadrosi va radioaktivlik',
  qisqa:'11-sinf · fizika · yadro tuzilishi, α-, β-, γ-nurlanish, yarim yemirilish', sinf:'11-sinf',
  sahna:'fa_yadro',
  kor:{
    sarlavha:'Atom markazidagi kichkina, lekin og‘ir yadro',
    matn:'Atomning deyarli butun massasi uning markazidagi yadroda joylashgan. Yadro protonlar va neytronlardan (nuklonlardan) tuzilgan, uning o‘lchami atomnikidan 10 000–100 000 marta kichik. Ba’zi yadrolar beqaror: ular o‘z-o‘zidan α-zarra, β-zarra yoki γ-nurlanish chiqarib, boshqa yadroga aylanadi — bu radioaktivlik. Sahnada nurlanish turlarini chiqaring va ular qaysi to‘siqda to‘xtashini kuzating, so‘ng «Yarim yemirilish» rejimida 400 ta yadroning yemirilishini sanang. Yadro modeli sxematik.',
    punktlar:[
      '<b>Yadro:</b> Z ta proton + N ta neytron; massa soni A = Z + N',
      '<b>α-nurlanish:</b> geliy yadrosi ⁴₂He — qog‘oz varag‘i to‘xtatadi',
      '<b>β⁻-nurlanish:</b> elektronlar — bir necha mm alyuminiy to‘xtatadi',
      '<b>γ-nurlanish:</b> yuqori energiyali fotonlar — qalin qo‘rg‘oshin yoki beton kuchsizlantiradi',
      '<b>Yarim yemirilish davri T:</b> yadrolarning yarmi yemiriladigan vaqt'
    ]
  },
  bolimlar:[
    {sarlavha:'Uch xil nurlanish', jadval:[
      ['α (alfa)','⁴₂He yadrosi · zaryad +2 · havoda bir necha sm · qog‘oz to‘xtatadi · siljish: Z − 2, A − 4'],
      ['β⁻ (beta)','elektron · zaryad −1 · havoda metrlargacha · bir necha mm alyuminiy · siljish: Z + 1, A o‘zgarmaydi'],
      ['γ (gamma)','foton · zaryadsiz · juda o‘tuvchan · qo‘rg‘oshin/beton kuchsizlantiradi · Z va A o‘zgarmaydi']
    ]},
    {sarlavha:'Yarim yemirilish davrlari', jadval:[
      ['Radon-222','3,82 kun'],
      ['Yod-131 (tibbiyot)','8,02 kun'],
      ['Kobalt-60','5,27 yil'],
      ['Seziy-137','30,1 yil'],
      ['Radiy-226','1 600 yil'],
      ['Uglerod-14','5 730 yil (ba’zi manbalarda 5 700)'],
      ['Uran-238','4,47 mlrd yil']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Yadro tuzilishi', matn:'Yadro musbat zaryadli protonlar (qizil) va zaryadsiz neytronlardan (kulrang) tuzilgan. Ularni kuchli yadro o‘zaro ta’siri ushlab turadi — bu kuch protonlarning elektr itarishidan ancha kuchli, lekin juda qisqa masofada ta’sir qiladi.', holat:{rejim:'yadro'}},
    {sarlavha:'α-yemirilish', matn:'Og‘ir yadro 2 proton va 2 neytrondan iborat geliy yadrosini chiqaradi. Misol: ²²⁶Ra → ²²²Rn + ⁴He. α-zarra og‘ir va zaryadi katta — yo‘lida atomlarni kuchli ionlaydi, shuning uchun tez to‘xtaydi: qog‘oz varag‘i yetarli.', holat:{rejim:'yadro', nur:'alfa'}},
    {sarlavha:'β-yemirilish', matn:'Yadrodagi neytron protonga aylanib, elektron (β⁻-zarra) va antineytrino chiqaradi. Misol: ¹⁴C → ¹⁴N + e⁻ + ν̃. β-zarralar qog‘ozdan o‘tadi, lekin bir necha millimetr alyuminiyda to‘xtaydi.', holat:{rejim:'yadro', nur:'beta'}},
    {sarlavha:'γ-nurlanish', matn:'Yemirilishdan keyin «uyg‘ongan» yadro ortiqcha energiyani yuqori energiyali foton — γ-kvant sifatida chiqaradi. Z ham, A ham o‘zgarmaydi. γ-nurlar juda o‘tuvchan: qalin qo‘rg‘oshin ularni faqat kuchsizlantiradi.', holat:{rejim:'yadro', nur:'gamma'}},
    {sarlavha:'Yarim yemirilish davri', matn:'Har bir yadro qachon yemirilishi tasodifiy, ammo ko‘p yadrolar uchun qonuniyat aniq: har T vaqtda qolganlarning yarmi yemiriladi. 400 ta yod-131 yadrosini kuzating: T = 8,02 kun.', holat:{rejim:'yarim', izotop:'i131', yur:true}},
    {sarlavha:'Radiouglerod usuli', matn:'Tirik organizmlarda uglerod-14 ulushi doimiy; organizm nobud bo‘lgach, u T = 5 730 yil bilan kamayadi. Qolgan ulushni o‘lchab, qadimgi yog‘och, suyak va matolarning yoshi aniqlanadi (taxminan 50 ming yilgacha).', holat:{rejim:'yarim', izotop:'c14', yur:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Nurlanish va yemirilish', holat:{rejim:'yadro'},
    topshiriqlar:[
      {shart:'<b>α-yemirilish</b>ni hosil qiling va α-zarra qayerda to‘xtashini kuzating.', hodisa:'fa-yemirilish', kod:"ev.nur==='alfa'", izoh:'To‘g‘ri — α-zarra <b>qog‘oz varag‘ida</b> to‘xtadi.'},
      {shart:'<b>β-zarra</b>ni chiqaring: u qaysi to‘siqda to‘xtaydi?', hodisa:'fa-yemirilish', kod:"ev.nur==='beta' && ev.tosiq==='alyuminiy'", izoh:'To‘g‘ri — β-zarra qog‘ozdan o‘tib, <b>alyuminiy plastinkada</b> to‘xtadi.'},
      {shart:'Eng o‘tuvchan nurlanishni chiqaring.', hodisa:'fa-yemirilish', kod:"ev.nur==='gamma'", izoh:'To‘g‘ri — <b>γ-nurlanish</b> qog‘oz va alyuminiydan o‘tib, faqat qalin qo‘rg‘oshinda kuchsizlandi.'},
      {shart:'«Yarim yemirilish» rejimida <b>bitta</b> yarim yemirilish davri o‘tishini kuting.', hodisa:'fa-yarim', kod:"ev.davr>=1", izoh:'To‘g‘ri — bir davrdan keyin taxminan <b>yarmi</b> (≈ 200 ta) qoldi.'},
      {shart:'Endi <b>uch</b> davr o‘tishini kuting — qancha yadro qoladi?', hodisa:'fa-yarim', kod:"ev.davr>=3", izoh:'To‘g‘ri — uch davrdan keyin taxminan <b>1/8 qism</b> (≈ 50 ta) qoladi: ½ · ½ · ½ = ⅛.'}
    ]},
  test:[
    {s:'Atom yadrosi qanday zarralardan tuzilgan?', v:['Elektron va protonlardan','Proton va neytronlardan','Faqat neytronlardan','Elektron va neytronlardan'], t:1, izoh:'Yadro <b>proton va neytronlardan</b> (nuklonlardan) tuzilgan; elektronlar yadro atrofida.'},
    {s:'Radioaktivlikni 1896-yilda kim kashf qilgan?', v:['Ernest Rezerford','Anri Bekkerel','Mariya Kyuri','Jeyms Chedvik'], t:1, izoh:'<b>Anri Bekkerel</b> (1896, uran tuzlari). Kyurilar 1898-yilda poloniy va radiyni kashf qilgan; Chedvik 1932-yilda neytronni.'},
    {s:'α-zarra nima?', v:['Elektron','Foton','Geliy-4 yadrosi','Neytron'], t:2, izoh:'α-zarra — <b>geliy-4 yadrosi</b>: 2 proton + 2 neytron.'},
    {s:'²²⁶₈₈Ra α-yemirilganda qaysi yadro hosil bo‘ladi?', v:['²²²₈₆Rn','²²⁶₈₉Ac','²²²₈₈Ra','²³⁰₉₀Th'], t:0, izoh:'α-yemirilishda Z − 2, A − 4: <b>²²²₈₆Rn</b> (radon).'},
    {s:'β⁻-yemirilishda yadroda nima sodir bo‘ladi?', v:['Proton neytronga aylanadi','Neytron protonga aylanib, elektron chiqaradi','Yadro ikkiga bo‘linadi','Yadrodan geliy chiqadi'], t:1, izoh:'<b>Neytron protonga aylanib, elektron chiqaradi</b> (va antineytrino): Z + 1, A o‘zgarmaydi.'},
    {s:'Qaysi nurlanishni qog‘oz varag‘i to‘xtata oladi?', v:['α','β','γ','Hech birini'], t:0, izoh:'<b>α-nurlanish</b> — og‘ir va kuchli ionlovchi, qog‘ozda to‘xtaydi.'},
    {s:'Yarim yemirilish davri 8 kun. 32 kundan keyin 1 000 ta yadrodan taxminan nechtasi qoladi?', v:['500','250','125','62'], t:3, izoh:'32 kun = 4 davr: 1 000 · (½)⁴ = 62,5 → <b>taxminan 62</b> ta.'},
    {s:'Radiouglerod usulida qaysi izotopdan foydalaniladi?', v:['Uran-238','Uglerod-14','Kobalt-60','Yod-131'], t:1, izoh:'<b>Uglerod-14</b> (T ≈ 5 730 yil) — organik qoldiqlar yoshini aniqlash.'},
    {s:'Atom yadrosini (1911) kim kashf qilgan?', v:['Nils Bor','Ernest Rezerford','Dmitriy Mendeleyev','Albert Eynshteyn'], t:1, izoh:'<b>Ernest Rezerford</b>, α-zarralarning oltin folgada sochilishi tajribasi asosida (Geyger va Marsden tajribalari).'},
    {tur:'3d', s:'Sahnada <b>γ-nurlanishni eng yaxshi to‘sadigan</b> to‘siqni bosing.', hodisa:'fa-yadro-qism', togri:['qorgoshin'], v:['Qo‘rg‘oshin','boshqa to‘siq yoki qism'], t:0, izoh:'<b>Qo‘rg‘oshin</b> — zich va og‘ir element; qalin qatlami γ-nurlarni kuchli susaytiradi (lekin to‘liq to‘xtatmaydi).'}
  ],
  yordamchi:[
    {s:'Nega yadroda protonlar bir-birini itarib yubormaydi?', j:'Protonlar orasida elektr itarish kuchi bor, lekin nuklonlarni juda kuchli, qisqa masofali yadro kuchlari ushlab turadi. Neytronlar ham bu tortishishga hissa qo‘shadi va yadroni barqarorlashtiradi. Juda og‘ir yadrolarda itarish kuchayadi — ular ko‘pincha radioaktiv.', kalit:['itar','yadro kuch','barqaror']},
    {s:'Nega sahnadagi yemirilish har safar biroz boshqacha?', j:'Radioaktiv yemirilish tasodifiy jarayon: har bir yadro uchun faqat ehtimollik ma’lum. 400 ta yadro uchun natija nazariy egri chiziq atrofida tebranadi; yadrolar qancha ko‘p bo‘lsa, natija nazariyaga shuncha yaqin.', kalit:['tasodif','har xil','nazariya']}
  ],
  maqola:[
    {sarlavha:'Yadroning kashf etilishi', xatboshilar:[
      '1911-yilda Ernest Rezerford shogirdlari Xans Geyger va Ernest Marsden tajribalari natijalarini tahlil qilib, atomning deyarli butun massasi va musbat zaryadi juda kichik markaziy yadroda to‘planganini isbotlagan. Oltin folgaga yo‘naltirilgan α-zarralarning ko‘pchiligi to‘g‘ri o‘tib ketgan, lekin ayrimlari katta burchakka og‘gan — bu faqat kichik, zich markaz bo‘lsa mumkin.',
      'Yadro o‘lchami taxminan 10⁻¹⁵–10⁻¹⁴ m, atom o‘lchami esa taxminan 10⁻¹⁰ m. Agar atomni futbol stadioni kattaligida tasavvur qilsak, yadro markazdagi no‘xat donasidek bo‘ladi. Proton 1919-yilda (Rezerford), neytron 1932-yilda (Jeyms Chedvik) kashf qilingan.',
      'Yadro tarkibi quyidagicha yoziladi: ᴬ_Z X, bu yerda Z — protonlar soni (tartib raqami), A — massa soni (nuklonlar soni), N = A − Z — neytronlar soni. Protonlar soni bir xil, neytronlar soni har xil bo‘lgan atomlar izotoplar deyiladi (masalan, ¹²C va ¹⁴C).'
    ]},
    {sarlavha:'Radioaktivlik va nurlanish turlari', xatboshilar:[
      '1896-yilda fransuz fizigi Anri Bekkerel uran tuzlari qora qog‘ozga o‘ralgan fotoplastinkani qoraytirishini aniqlagan. Mariya va Pyer Kyurilar 1898-yilda yangi radioaktiv elementlar — poloniy va radiyni kashf qilgan. 1903-yilda uchalasi fizika bo‘yicha Nobel mukofotiga sazovor bo‘lgan.',
      'Rezerford nurlanishning ikki turini ajratgan va ularni α va β deb atagan (1899); 1900-yilda Pol Villar uchinchi, eng o‘tuvchan turni topgan — keyinchalik u γ-nurlanish deb atalgan. Magnit maydonda α-zarralar bir tomonga, β-zarralar qarama-qarshi tomonga og‘adi, γ-nurlar esa og‘maydi — ularning zaryadlari turlicha.',
      'Siljish qoidalari: α-yemirilishda yadro zaryadi 2 ga, massa soni 4 ga kamayadi; β⁻-yemirilishda zaryad 1 ga ortadi, massa soni o‘zgarmaydi; γ-nurlanishda ikkalasi ham o‘zgarmaydi. Masalan, radiy-226 α-yemirilib radon-222 ga aylanadi.'
    ]},
    {sarlavha:'Yarim yemirilish qonuni', xatboshilar:[
      'Radioaktiv yadroning qachon yemirilishini oldindan aytib bo‘lmaydi, lekin ko‘p yadrolar uchun statistik qonun bajariladi: N = N₀·(½)^(t/T). Bu yerda T — yarim yemirilish davri. Bu tushunchani 1907-yilda Rezerford kiritgan.',
      'Yarim yemirilish davri izotopga qarab juda farq qiladi: radon-222 — 3,82 kun, yod-131 — 8,02 kun, seziy-137 — 30,1 yil, uglerod-14 — 5 730 yil, uran-238 — 4,47 milliard yil. Uran-238 davri Yer yoshiga (≈ 4,5 mlrd yil) yaqin, shuning uchun Yerda dastlabki uranning taxminan yarmi hali saqlanib qolgan.',
      'Radiouglerod usuli (V. Libbi, 1949; Nobel mukofoti — 1960) arxeologiyada qo‘llanadi: tirik organizmda ¹⁴C ulushi atmosferadagiga teng, organizm nobud bo‘lgach, u yarim yemirilish qonuni bo‘yicha kamayadi.'
    ]},
    {sarlavha:'Radiatsiya: foyda va xavfsizlik', xatboshilar:[
      'Radioaktiv izotoplar tibbiyotda (yod-131 bilan qalqonsimon bez davolash, kobalt-60 bilan o‘smalarni nurlash, diagnostika), sanoatda (payvand choklarini tekshirish), qishloq xo‘jaligida va ilmiy tadqiqotlarda ishlatiladi. Atom elektr stansiyalari og‘ir yadrolarning bo‘linishi energiyasidan foydalanadi.',
      'Ionlovchi nurlanish tirik to‘qimalarga zarar yetkazishi mumkin, shuning uchun himoya qoidalari qat’iy: manbadan uzoqroq turish, nurlanish vaqtini qisqartirish va to‘siq (ekran) ishlatish. α-manbalar tashqaridan kam xavfli, lekin organizmga (nafas, ovqat bilan) tushsa juda xavfli.',
      'Tabiiy fon nurlanishi ham mavjud: kosmik nurlar, tuproq va binolardagi radon, oziq-ovqatdagi kaliy-40. Dunyo bo‘yicha o‘rtacha tabiiy yillik doza taxminan 2,4 millizivert (BMT UNSCEAR baholari). Nurlanish dozasi birligi — zivert (Sv), faollik birligi — bekkerel (1 Bq = 1 yemirilish/s).'
    ]}
  ],
  formulalar:[
    ['A = Z + N','Massa soni: protonlar va neytronlar yig‘indisi'],
    ['ᴬ_Z X → ᴬ⁻⁴_(Z−2) Y + ⁴₂He','α-yemirilish (siljish qoidasi)'],
    ['ᴬ_Z X → ᴬ_(Z+1) Y + e⁻ + ν̃','β⁻-yemirilish'],
    ['N = N₀ · (½)<sup>t/T</sup>','Yarim yemirilish qonuni'],
    ['1 Bq = 1 yemirilish / s','Faollik birligi — bekkerel']
  ],
  qiziqarli:[
    'Mariya Kyuri — ikki xil fan bo‘yicha (fizika 1903, kimyo 1911) Nobel mukofotini olgan yagona inson.',
    'Bekkerel kashfiyoti tasodifiy bo‘lgan: bulutli kunlar sababli uran tuzi qo‘yilgan plastinkalarni tortmada qoldirgan, ular esa quyoshsiz ham qoraygan.',
    'Toshkent yaqinidagi Ulug‘bek shaharchasida Yadro fizikasi instituti joylashgan; u 1956-yilda tashkil etilgan, tadqiqot reaktori 1959-yildan ishlaydi (institut ma’lumotlariga ko‘ra).',
    'Banan tarkibidagi tabiiy kaliy-40 tufayli biroz radioaktiv — lekin bu doza juda kichik va xavfsiz.'
  ],
  lugat:[
    ['Nuklon','Yadro zarrasi: proton yoki neytron.'],
    ['Izotop','Protonlar soni bir xil, neytronlar soni har xil atomlar.'],
    ['Radioaktivlik','Beqaror yadrolarning o‘z-o‘zidan nurlanish chiqarib yemirilishi.'],
    ['α-zarra','Geliy-4 yadrosi (2p + 2n).'],
    ['β-zarra','Yadrodan chiqqan elektron (β⁻) yoki pozitron (β⁺).'],
    ['γ-nurlanish','Yuqori energiyali elektromagnit nurlanish (fotonlar).'],
    ['Yarim yemirilish davri','Radioaktiv yadrolarning yarmi yemiriladigan vaqt.'],
    ['Bekkerel (Bq)','Faollik birligi: 1 yemirilish sekundiga.'],
    ['Zivert (Sv)','Nurlanishning organizmga ta’siri (ekvivalent doza) birligi.'],
    ['Ionlovchi nurlanish','Moddadan o‘tganda atomlarni ionlaydigan nurlanish.']
  ],
  manba:FIZ11 + '; ' + WIKI + ': «Atomic nucleus», «Rutherford model», «Geiger–Marsden experiments», «Radioactive decay», «Alpha particle», «Beta decay», «Gamma ray», «Half-life», «Radiocarbon dating», «Henri Becquerel», «Marie Curie»; NUBASE/NNDC yarim yemirilish davrlari (Rn-222, I-131, Co-60, Cs-137, Ra-226, C-14, U-238); UNSCEAR (tabiiy fon ≈ 2,4 mZv/yil); O‘zR FA Yadro fizikasi instituti (inp.uz). Sahna yadrosi — 40 nuklonli sxematik model.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model, virtual tajriba (to‘siqlar), statistik modellashtirish, «tanga tashlash» o‘yini',
    maqsad:{talimiy:'Atom yadrosi tuzilishi, radioaktivlik, α-, β-, γ-nurlanish xossalari va yarim yemirilish qonunini o‘rganish.',
      tarbiyaviy:'Radiatsiyadan himoyalanish madaniyati; ilmdan tinch maqsadlarda foydalanish mas’uliyati.',
      rivojlantiruvchi:'Tasodifiy jarayonlarni statistik tahlil qilish, grafik bilan ishlash.'},
    natijalar:['Yadro tarkibini A, Z, N orqali yozadi','Uch nurlanish turini xossalari bo‘yicha taqqoslaydi','Siljish qoidasi bilan yemirilish tenglamasini tuzadi','Yarim yemirilish qonuni bo‘yicha masala yechadi'],
    jihozlar:['MAKON sahnasi «Atom yadrosi va radioaktivlik»','100 ta tanga (yarim yemirilish o‘yini uchun)','Davriy jadval','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–10','<b>Yadro.</b> Rezerford tajribasi, yadro tarkibi, izotoplar.','ᴬ_Z X yozuvini mashq qiladi.'],
      ['10–20','<b>Nurlanish turlari.</b> MAKON: α, β, γ va to‘siqlar; siljish qoidasi.','Jadval va tenglamalar tuzadi.'],
      ['20–30','<b>Yarim yemirilish.</b> «Tanga o‘yini»: 100 tanga tashlanadi, «gerb» chiqqanlar olib qo‘yiladi — har tashlashda ≈ yarmi qoladi; MAKON grafigi bilan solishtirish.','O‘ynaydi, grafik chizadi.'],
      ['30–36','<b>Qo‘llanish va xavfsizlik.</b> Tibbiyot, radiouglerod, himoya qoidalari.','Muhokama qiladi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Bajaradi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Izotop','Z bir xil, N har xil.'],['Yarim yemirilish davri','Yarmi yemiriladigan vaqt.'],['Siljish qoidasi','α: Z−2, A−4; β⁻: Z+1.']],
    savollar:[['²³⁸₉₂U α-yemirilsa?','²³⁴₉₀Th'],['T = 5 kun, 15 kundan keyin qancha qism qoladi?','1/8'],['γ-nurlanishda Z o‘zgaradimi?','Yo‘q']],
    uy:'Darslikdagi mavzuni o‘qish; masalalar: (1) ²¹⁴₈₂Pb ikki marta β⁻-yemirilsa qaysi yadro hosil bo‘ladi? (javob: ²¹⁴₈₄Po); (2) 2 000 ta yod-131 yadrosidan 24 kundan keyin taxminan nechtasi qoladi? (≈ 250); (3) radiatsiyadan himoyalanishning uch qoidasini yozish.',
    manba:FIZ11
  }
};

/* =====================================================================
   5. YULDUZLAR VA YULDUZ TURKUMLARI — 5-sinf (11-sinf astronomiyada chuqurroq)
   ===================================================================== */
D['astro-yulduzlar'] = {
  fan:'astronomiya', qisqaNom:'Yulduzlar', nom:'Yulduzlar va yulduz turkumlari',
  qisqa:'5-sinf · tabiiy fan · yulduzli osmon (11-sinf astronomiyada chuqurroq)', sinf:'5-sinf',
  sahna:'fa_yulduzlar',
  kor:{
    sarlavha:'Toshkent osmoni: yulduzlar haqiqiy joyida',
    matn:'Sahna — Toshkent (41,3° shimoliy kenglik) ustidagi yulduzli osmon gumbazi. 31 ta yorqin yulduz katalogdagi haqiqiy koordinatalar (to‘g‘ri chiqish va og‘ish, J2000) bo‘yicha joylashtirilgan. Katta Ayiq, Kichik Ayiq, Kassiopeya, Orion va Yozgi uchburchakni toping, Qutb yulduzini Katta Ayiq yordamida aniqlang, osmonning sutkalik aylanishini ko‘ring. Yulduzni bosing — uning masofasi, yorqinligi va rangi haqida karta chiqadi. Fondagi xira yulduzlar va Somon yo‘li — bezak (sxematik).',
    punktlar:[
      '<b>Yulduz turkumi</b> — osmonning shartli bo‘lagi; Xalqaro astronomiya ittifoqi 88 ta turkumni tasdiqlagan',
      '<b>Qutb yulduzi</b> deyarli dunyo qutbida turadi; uning balandligi joyning kengligiga teng (Toshkentda ≈ 41°)',
      '<b>Ko‘rinma yulduz kattaligi</b> qancha kichik bo‘lsa, yulduz shuncha yorqin: Sirius −1,46<sup>m</sup>',
      '<b>Yulduz rangi</b> sirt haroratini bildiradi: ko‘k-oq — issiq, qizg‘ish — sovuqroq'
    ]
  },
  bolimlar:[
    {sarlavha:'Sahnadagi turkumlar', jadval:[
      ['Katta Ayiq («Yetti qaroqchi»)','7 yorqin yulduz — «cho‘mich»; Toshkentda botmaydi'],
      ['Kichik Ayiq','«kichik cho‘mich» dastasi uchida — Qutb yulduzi'],
      ['Kassiopeya','«W» shakli; Qutb yulduzining Katta Ayiqqa qarama-qarshi tomonida'],
      ['Orion','qishki turkum: Betelgeyze (qizil), Rigel (ko‘k-oq), uchta «kamar» yulduzi'],
      ['Yozgi uchburchak','Vega, Deneb, Altair — uch turkumning eng yorqin yulduzlari (asterizm)'],
      ['Katta It','Sirius — tungi osmondagi eng yorqin yulduz']
    ]},
    {sarlavha:'Yulduzlar (Hipparcos ma’lumotlari)', jadval:[
      ['Sirius','−1,46<sup>m</sup> · 8,6 y.y. · A1 V'],
      ['Vega','0,03<sup>m</sup> · 25 y.y. · A0 V'],
      ['Rigel','0,18<sup>m</sup> · ≈ 770 y.y. · B8 Ia'],
      ['Betelgeyze','0,42<sup>m</sup> (o‘zgaruvchan) · ≈ 640 y.y. · M2 Ib'],
      ['Qutb yulduzi','1,97<sup>m</sup> · ≈ 430 y.y. · F7 Ib'],
      ['Dubhe','1,79<sup>m</sup> · 124 y.y. · K0 III']
    ], matn:'Masofalar taxminiy: uzoq yulduzlar uchun turli o‘lchovlar sezilarli farq qiladi (masalan, Deneb uchun 1 500 dan 2 600 y.y. gacha).'}
  ],
  bosqichlar:[
    {sarlavha:'Sentabr oqshomi, shimolga qaraymiz', matn:'Ufqdagi tog‘lar sharq tomonda. Osmon — ulkan gumbaz, yulduzlar unga «yopishgandek» ko‘rinadi, aslida ular bizdan turli masofada.', holat:{qutb:false, aylanish:false, turkum:'kichik_ayiq'}},
    {sarlavha:'Katta Ayiq — «Yetti qaroqchi»', matn:'Yetti yorqin yulduz cho‘mich shaklini hosil qiladi. Xalqimiz uni «Yetti qaroqchi» deb atagan. Bahor oqshomlarida u deyarli tepada turadi.', holat:{qutb:false, turkum:'katta_ayiq'}},
    {sarlavha:'Qutb yulduzini topamiz', matn:'Cho‘michning chetidagi Merak va Dubhe orqali to‘g‘ri chiziq o‘tkazib, ular orasidagi masofani taxminan besh marta qo‘ying — Qutb yulduziga (xalq nomi — «Temirqoziq») yetasiz. U doim shimolni ko‘rsatadi.', holat:{qutb:true}},
    {sarlavha:'Osmonning sutkalik aylanishi', matn:'Yer g‘arbdan sharqqa aylangani uchun yulduzlar Qutb yulduzi atrofida aylanadi. Toshkentda Katta Ayiq va Kassiopeya hech qachon botmaydi.', holat:{qutb:false, aylanish:true}},
    {sarlavha:'Kassiopeya', matn:'«W» (yoki «M») shaklidagi besh yorqin yulduz. Kassiopeya Qutb yulduzining Katta Ayiqqa qarama-qarshi tomonida joylashgan — bittasi pastda bo‘lsa, ikkinchisi tepada.', holat:{qutb:false, aylanish:false, turkum:'kassiopeya'}},
    {sarlavha:'Orion — qishki osmon bezagi', matn:'Qizil o‘ta gigant Betelgeyze va ko‘k-oq Rigel ranglarini solishtiring: rang yulduz sirti haroratiga bog‘liq. Orion kamaridagi uch yulduz Siriusni topishga yordam beradi.', holat:{turkum:'orion'}},
    {sarlavha:'Yozgi uchburchak va Sirius', matn:'Vega, Deneb va Altair — yoz va kuz oqshomlarining eng yorqin yulduzlari. Sirius esa qish oqshomlarida janubda ko‘rinadi — u tungi osmondagi eng yorqin yulduz.', holat:{turkum:'uchburchak'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Osmonda yulduz toping', holat:{qutb:false, aylanish:false, turkum:'kichik_ayiq'},
    topshiriqlar:[
      {shart:'<b>Qutb yulduzini</b> bosing (kerak bo‘lsa «Qutb yulduzini topish» tugmasidan foydalaning).', hodisa:'fa-yulduz', kod:"ev.nom==='polaris'", izoh:'To‘g‘ri — <b>Qutb yulduzi</b>, Kichik Ayiq dastasining uchida.'},
      {shart:'Katta Ayiq cho‘michining Qutb yulduzini ko‘rsatuvchi yulduzlaridan birini bosing (<b>Dubhe</b> yoki <b>Merak</b>).', hodisa:'fa-yulduz', kod:"ev.nom==='dubhe' || ev.nom==='merak'", izoh:'To‘g‘ri — Merak va Dubhe «ko‘rsatkich yulduzlar» deb ataladi.'},
      {shart:'Orion turkumidagi <b>qizil o‘ta gigant</b>ni toping (turkum tugmasidan foydalaning).', hodisa:'fa-yulduz', kod:"ev.nom==='betelgeuse'", izoh:'To‘g‘ri — <b>Betelgeyze</b>, spektral sinfi M2: sirti nisbatan sovuq, shuning uchun qizg‘ish.'},
      {shart:'Tungi osmondagi <b>eng yorqin yulduzni</b> bosing.', hodisa:'fa-yulduz', kod:"ev.nom==='sirius'", izoh:'To‘g‘ri — <b>Sirius</b> (−1,46<sup>m</sup>), bizdan atigi 8,6 yorug‘lik yili uzoqlikda.'},
      {shart:'Yozgi uchburchakning eng yorqin yulduzi — <b>Vega</b>ni bosing.', hodisa:'fa-yulduz', kod:"ev.nom==='vega'", izoh:'To‘g‘ri — <b>Vega</b> (Lira turkumi), taxminan 12–13 ming yildan keyin qutb yulduzi vazifasini bajaradi.'}
    ]},
  test:[
    {s:'Xalqaro astronomiya ittifoqi nechta yulduz turkumini tasdiqlagan?', v:['12','48','88','110'], t:2, izoh:'<b>88 ta</b> turkum; ularning chegaralari 1930-yilda qat’iy belgilangan. 12 — zodiak turkumlari soni (ekliptikadan aslida 13 turkum o‘tadi).'},
    {s:'Toshkentda Qutb yulduzi ufqdan taxminan qancha balandlikda ko‘rinadi?', v:['≈ 23°','≈ 41°','≈ 66°','≈ 90°'], t:1, izoh:'Qutb yulduzi balandligi joyning geografik kengligiga teng: Toshkentda <b>≈ 41°</b>.'},
    {s:'Qutb yulduzini topish uchun Katta Ayiqning qaysi yulduzlaridan foydalaniladi?', v:['Mitsar va Alkaid','Merak va Dubhe','Fekda va Megrets','Aliot va Mitsar'], t:1, izoh:'<b>Merak va Dubhe</b> — «ko‘rsatkich yulduzlar»: ular orasidagi masofani ≈ 5 marta qo‘yiladi.'},
    {s:'Ikki yulduzdan qaysi biri yorqinroq: 1<sup>m</sup> yoki 3<sup>m</sup>?', v:['1<sup>m</sup> li','3<sup>m</sup> li','Bir xil','Masofani bilmasdan aytib bo‘lmaydi'], t:0, izoh:'Yulduz kattaligi soni qancha kichik bo‘lsa, yulduz shuncha yorqin: <b>1<sup>m</sup> li</b> yulduz 3<sup>m</sup> li yulduzdan ≈ 6,3 marta yorqinroq.'},
    {s:'Qizg‘ish rangli yulduz haqida nima deyish mumkin?', v:['Sirti juda issiq','Sirti nisbatan sovuqroq','U Yerga eng yaqin','U sayyora'], t:1, izoh:'Qizil yulduzlarning sirti <b>nisbatan sovuqroq</b> (≈ 3 000–3 500 K), ko‘k-oq yulduzlarniki esa 10 000 K dan yuqori.'},
    {s:'Yozgi uchburchakka qaysi yulduzlar kiradi?', v:['Sirius, Protsion, Betelgeyze','Vega, Deneb, Altair','Dubhe, Merak, Fekda','Rigel, Sayf, Bellatriks'], t:1, izoh:'<b>Vega, Deneb, Altair</b> — Lira, Oqqush va Burgut turkumlarining eng yorqin yulduzlari.'},
    {s:'Osmondagi yulduzlar nega Qutb yulduzi atrofida aylanayotgandek ko‘rinadi?', v:['Yulduzlar Yer atrofida aylanadi','Yer o‘z o‘qi atrofida aylanadi','Quyosh yulduzlarni tortadi','Oy ularni harakatlantiradi'], t:1, izoh:'<b>Yer o‘z o‘qi atrofida aylanadi</b>; dunyo o‘qi Qutb yulduzi yaqinidan o‘tadi.'},
    {s:'1 yorug‘lik yili nima?', v:['Vaqt birligi — 1 yil','Yorug‘likning bir yilda bosib o‘tgan masofasi (≈ 9,46 trln km)','Quyoshgacha masofa','Yulduz yorqinligi birligi'], t:1, izoh:'<b>Yorug‘likning bir yilda bosib o‘tgan masofasi</b>: ≈ 9,46·10¹² km.'},
    {s:'Samarqandda 1018 yulduz katalogini («Ziji Ko‘ragoniy») tuzgan olim kim?', v:['Al-Xorazmiy','Mirzo Ulug‘bek','Abu Rayhon Beruniy','Ibn Sino'], t:1, izoh:'<b>Mirzo Ulug‘bek</b> rasadxonasi (XV asr) katalogi — Ptolemeydan keyin yangi kuzatuvlarga asoslangan yirik yulduz katalogi.'},
    {tur:'3d', s:'Osmonda <b>Qutb yulduzini</b> bosing.', hodisa:'fa-yulduz', togri:['polaris'], v:['Qutb yulduzi','boshqa yulduz'], t:0, izoh:'<b>Qutb yulduzi</b> (α Kichik Ayiq) — shimolda, ufqdan ≈ 41° balandda; Katta Ayiqning Merak–Dubhe chizig‘i davomida.'}
  ],
  yordamchi:[
    {s:'Yulduz turkumidagi yulduzlar bir-biriga yaqinmi?', j:'Yo‘q. Ular faqat bir yo‘nalishda ko‘rinadi. Masalan, Orion kamaridagi yulduzlar bizdan 900–1 300 yorug‘lik yili uzoqlikda, Betelgeyze esa ≈ 640 y.y. Turkum — osmondagi «naqsh», fizik guruh emas.', kalit:['yaqin','masofa','turkum']},
    {s:'Nega Orion sentabr oqshomida ko‘rinmaydi?', j:'Yer Quyosh atrofida aylangani uchun kechasi ko‘rinadigan yulduzlar fasldan faslga o‘zgaradi. Orion sentabrda tongga yaqin chiqadi, qish oqshomlarida esa janubda yaxshi ko‘rinadi. Sahnada turkum tugmasi osmonni shu fasl oqshomiga (taxminiy vaqt) o‘tkazadi.', kalit:['orion','fasl','ko‘rinmaydi']}
  ],
  maqola:[
    {sarlavha:'Osmon gumbazi va yulduz turkumlari', xatboshilar:[
      'Tungi osmonga qaraganimizda yulduzlar ulkan gumbazga «mixlangan»dek ko‘rinadi. Qadimda odamlar yorqin yulduzlarni xayoliy chiziqlar bilan tutashtirib, ularni afsonaviy qahramonlar va hayvonlar nomi bilan atagan. Bugungi astronomiyada yulduz turkumi — osmonning aniq chegaralangan bo‘lagi. Xalqaro astronomiya ittifoqi 88 ta turkumni tasdiqlagan, chegaralari 1930-yilda belgilangan.',
      'Turkumdagi yulduzlar fazoda bir-biriga yaqin bo‘lishi shart emas: ular faqat bizdan qaraganda bir yo‘nalishda ko‘rinadi. Yulduzlargacha masofalar juda katta, shuning uchun yorug‘lik yili birligidan foydalaniladi: 1 y.y. ≈ 9,46 trillion km. Quyoshdan keyingi eng yaqin yulduz — Proksima Sentavr (≈ 4,2 y.y.).',
      'Yulduzlar yorqinligi yulduz kattaligi bilan o‘lchanadi: son qancha kichik bo‘lsa, yulduz shuncha yorqin. 5 kattalik farqi aynan 100 marta yorqinlik farqini bildiradi. Eng yorqin yulduz Sirius −1,46<sup>m</sup>, oddiy ko‘z bilan qorong‘i joyda taxminan 6<sup>m</sup> gacha yulduzlarni ko‘rish mumkin.'
    ]},
    {sarlavha:'Katta Ayiq va Qutb yulduzi', xatboshilar:[
      'Katta Ayiq turkumidagi yetti yorqin yulduz «cho‘mich»ni hosil qiladi — bu asterizm (turkum ichidagi naqsh). O‘zbek xalqi uni «Yetti qaroqchi» deb atagan. Cho‘michning chetidagi Merak va Dubhe orqali o‘tgan chiziqni ular orasidagi masofaning taxminan besh baravari qadar davom ettirsangiz, Qutb yulduziga yetasiz.',
      'Qutb yulduzi (xalq nomi — «Temirqoziq») Kichik Ayiq dastasining uchida, dunyoning shimoliy qutbidan 1° dan kam uzoqlikda joylashgan. Shuning uchun u deyarli qo‘zg‘almaydi va doim shimolni ko‘rsatadi. Uning ufqdan balandligi kuzatuvchi joyining geografik kengligiga teng: Toshkentda ≈ 41°, ekvatorda — ufqda, shimoliy qutbda — boshning tepasida.',
      'Yer o‘qi sekin aylanadi (presessiya, davri ≈ 25 800 yil), shuning uchun «qutb yulduzi» vaqt o‘tishi bilan almashadi. Taxminan 12–13 ming yildan keyin bu vazifani Vega bajaradi.'
    ]},
    {sarlavha:'Yulduzlarning rangi va turi', xatboshilar:[
      'Yulduz rangi uning sirt haroratiga bog‘liq. Ko‘k-oq yulduzlar (Rigel, spektral sinf B) juda issiq — 10 000 K dan yuqori, sariq yulduzlar (Quyosh, G sinf) ≈ 5 800 K, to‘q sariq (Dubhe, K sinf) ≈ 4 500 K, qizil yulduzlar (Betelgeyze, M sinf) ≈ 3 500 K atrofida. Spektral sinflar tartibi: O, B, A, F, G, K, M.',
      'Betelgeyze — qizil o‘ta gigant: u Quyoshdan yuzlab marta katta va hayotining oxiriga yaqin. 2019–2020-yillarda uning yorqinligi keskin pasaygani («Buyuk xiralashish») butun dunyoda kuzatilgan; tadqiqotlar buni yulduz chiqargan chang buluti bilan izohlaydi. Kelajakda u o‘ta yangi yulduz bo‘lib portlashi kutiladi.',
      'Katta Ayiqdagi Mitsar yonida xira Alkor yulduzi bor — qadimda ko‘rish o‘tkirligini sinash uchun ishlatilgan. Teleskopda Mitsarning o‘zi ham qo‘shaloq ekani ko‘rinadi.'
    ]},
    {sarlavha:'Osmon aylanishi va fasllar', xatboshilar:[
      'Yer g‘arbdan sharqqa aylangani uchun butun osmon Qutb yulduzi atrofida sharqdan g‘arbga aylanayotgandek ko‘rinadi (shimolga qaraganda — soat miliga teskari). Qutb yulduziga yaqin yulduzlar Toshkentda hech qachon botmaydi: Katta Ayiq, Kichik Ayiq, Kassiopeya.',
      'Yer Quyosh atrofida aylangani sababli oqshomgi osmon fasldan faslga o‘zgaradi: bahorda tepada Katta Ayiq, yozda Yozgi uchburchak, kuzda Kassiopeya va Andromeda, qishda Orion va Sirius. Yulduz vaqti har kuni oddiy vaqtdan ≈ 4 daqiqaga ilgarilaydi.',
      'XV asrda Mirzo Ulug‘bek Samarqanddagi rasadxonada 1018 yulduzning koordinatalarini o‘lchab, «Ziji Ko‘ragoniy» katalogini tuzgan — bu Ptolemeydan keyin yangi kuzatuvlar asosidagi eng mashhur yulduz katalogi.'
    ]}
  ],
  formulalar:[
    ['h<sub>qutb</sub> = φ','Qutb yulduzi balandligi = joy kengligi (Toshkent: φ ≈ 41,3°)'],
    ['1 y.y. = c · 1 yil ≈ 9,46·10¹² km','Yorug‘lik yili (c ≈ 300 000 km/s)'],
    ['E₁ / E₂ = 100<sup>(m₂ − m₁)/5</sup> ≈ 2,512<sup>(m₂ − m₁)</sup>','Yorqinlik va yulduz kattaligi (Pogson formulasi)'],
    ['1 soat = 15°','Osmon aylanishi: 24 soatda 360°']
  ],
  qiziqarli:[
    'Siriusdan kelayotgan yorug‘lik yo‘lda 8,6 yil yuradi — biz uni 8,6 yil oldingi holatida ko‘ramiz.',
    'Deneb bizdan 1 500–2 600 yorug‘lik yili uzoqlikda bo‘lsa ham, osmondagi eng yorqin yulduzlardan biri — u Quyoshdan o‘n minglab marta ko‘p nur sochadi.',
    'Ulug‘bek rasadxonasining ulkan sekstanti (radiusi ≈ 40 m) qoldig‘i Samarqandda saqlanib qolgan.',
    'Qutb yulduzi eng yorqin yulduz emas: yorqinligi bo‘yicha u tungi osmonda 50-o‘rinlar atrofida.'
  ],
  lugat:[
    ['Yulduz turkumi','Osmonning aniq chegaralangan bo‘lagi (88 ta).'],
    ['Asterizm','Turkum ichidagi yoki turkumlararo taniqli naqsh (masalan, Katta cho‘mich, Yozgi uchburchak).'],
    ['Yulduz kattaligi (m)','Yulduzning ko‘rinma yorqinligi o‘lchovi; kichik son — yorqinroq.'],
    ['Yorug‘lik yili (y.y.)','Yorug‘likning bir yilda bosib o‘tgan masofasi.'],
    ['Dunyo qutbi','Yer o‘qining osmon gumbazini kesib o‘tadigan nuqtasi.'],
    ['Zenit','Kuzatuvchining boshi ustidagi osmon nuqtasi.'],
    ['Ufq','Osmon va yer tutashganday ko‘ringan chiziq.'],
    ['Spektral sinf','Yulduzning harorati va spektri bo‘yicha turi: O, B, A, F, G, K, M.'],
    ['Presessiya','Yer o‘qining sekin konus bo‘ylab aylanishi (≈ 25 800 yil).'],
    ['To‘g‘ri chiqish va og‘ish','Osmondagi ekvatorial koordinatalar (Yerdagi uzunlik va kenglikka o‘xshash).']
  ],
  manba:AST11 + '; ' + WIKI + ': «List of stars in Ursa Major», «… in Ursa Minor», «… in Cassiopeia», «… in Orion» (Hipparcos koordinatalari, J2000), «Sirius», «Vega», «Deneb», «Altair», «Polaris», «Betelgeuse», «Constellation», «IAU designated constellations», «Apparent magnitude», «Axial precession», «Ulugh Beg Observatory», «Zij-i Sultani»; Toshkent kengligi 41,3° sh.k. Fon yulduzlari va Somon yo‘li — dekorativ, tasodifiy (sxematik). Turkum tugmalaridagi fasl va vaqt — taxminiy.',
  ishlanma:{
    sinf:'5-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'Virtual planetariy, «osmon xaritasi» bilan ishlash, juftlikda yulduz topish o‘yini',
    maqsad:{talimiy:'Yulduz turkumlari, Qutb yulduzini topish usuli, yulduzlarning yorqinligi va rangi, osmonning sutkalik aylanishi haqida bilim berish.',
      tarbiyaviy:'Tabiatga, osmon go‘zalligiga qiziqish; Ulug‘bek merosiga faxr.',
      rivojlantiruvchi:'Fazoviy tasavvur, osmonda mo‘ljal olish ko‘nikmasi.'},
    natijalar:['Osmonda Katta Ayiq, Kassiopeya va Orionni taniydi','Qutb yulduzini topish usulini ko‘rsatadi','Yulduz kattaligi va rangini tushuntiradi','Osmon nega aylanayotgandek ko‘rinishini izohlaydi'],
    jihozlar:['MAKON sahnasi «Yulduzli osmon»','Harakatlanuvchi osmon xaritasi (bo‘lsa)','Kompas','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Motivatsiya.</b> «Karvonlar kechasi cho‘lda yo‘lni qanday topgan?»','Taxmin aytadi.'],
      ['8–20','<b>Virtual osmon.</b> Katta Ayiq, Qutb yulduzini topish, Kassiopeya; osmon aylanishi.','Kuzatadi, daftarga turkum chizadi.'],
      ['20–28','<b>Yulduzlar xilma-xilligi.</b> Rang va harorat, yorqinlik, masofa (Sirius, Betelgeyze, Rigel).','Jadval to‘ldiradi.'],
      ['28–34','<b>Tarix.</b> Ulug‘bek rasadxonasi va katalogi.','Tinglaydi, savol beradi.'],
      ['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti «Osmonda yulduz toping» va test.','Bajaradi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Yulduz turkumi','Osmon bo‘lagi (88 ta).'],['Qutb yulduzi','Shimolni ko‘rsatuvchi yulduz.'],['Yorug‘lik yili','≈ 9,46 trln km.']],
    savollar:[['Qutb yulduzi qaysi turkumda?','Kichik Ayiq'],['Eng yorqin yulduz?','Sirius'],['Toshkentda Qutb yulduzi balandligi?','≈ 41°']],
    uy:'Ochiq osmonli kechada shimolga qarab Katta Ayiq va Qutb yulduzini topish, ularning holatini soat bilan birga chizib olish; 2 soatdan keyin yana chizib, farqini tushuntirish (xavfsiz joyda, kattalar bilan).',
    manba:AST11
  }
};

/* =====================================================================
   6. QUYOSH VA OY TUTILISHLARI — 6-sinf (11-sinf astronomiyada chuqurroq)
   ===================================================================== */
D['astro-tutilish'] = {
  fan:'astronomiya', qisqaNom:'Tutilishlar', nom:'Quyosh va Oy tutilishlari',
  qisqa:'6-sinf · tabiiy fan / geografiya (11-sinf astronomiyada chuqurroq)', sinf:'6-sinf',
  sahna:'fa_tutilish',
  kor:{
    sarlavha:'Soyalar o‘yini: Quyosh, Yer va Oy bir chiziqda',
    matn:'Quyosh tutilishi yangi oyda — Oy Quyosh va Yer orasiga tushganda, Oy tutilishi to‘lin oyda — Oy Yerning soyasiga kirganda sodir bo‘ladi. Lekin yangi oy va to‘lin oy har oy bo‘ladi, tutilishlar esa yiliga bir necha marta. Sababi — Oy orbitasi Yer orbitasi tekisligiga (ekliptikaga) ≈ 5,1° og‘gan. Sahnada Oy o‘rnini va tugunlar chizig‘ini o‘zgartiring, «Nega har oy emas?» rejimida bir yilni kuzating. Masshtab siqilgan, og‘ish ko‘rinishi uchun uch barobar kattalashtirilgan (tugma bilan haqiqiysiga qaytariladi).',
    punktlar:[
      '<b>Quyosh tutilishi:</b> yangi oy, Oy soyasi Yerga tushadi — to‘liq, halqasimon yoki xususiy',
      '<b>Oy tutilishi:</b> to‘lin oy, Oy Yer soyasiga kiradi — to‘liq, xususiy yoki yarim soyali',
      '<b>Tugunlar:</b> Oy orbitasi ekliptikani kesib o‘tadigan ikki nuqta — tutilish faqat shu yerda',
      '<b>Xavfsizlik:</b> Quyoshga hech qachon maxsus filtrsiz qaramang!'
    ]
  },
  bolimlar:[
    {sarlavha:'Raqamlarda', jadval:[
      ['Oy orbitasining og‘ishi','≈ 5,1° (5,145°)'],
      ['Quyosh va Oy diametrlari nisbati','≈ 400 (masofalar nisbati ham ≈ 400)'],
      ['Yiliga Quyosh tutilishlari','2 tadan 5 tagacha'],
      ['To‘liq Quyosh tutilishining eng uzun davomiyligi','7 daq 32 s (nazariy maksimum)'],
      ['To‘liq soya yo‘lagi kengligi','odatda 100–160 km (267 km gacha)'],
      ['To‘liq Oy tutilishi','1 soat 47 daqiqagacha'],
      ['Saros','≈ 18 yil 11 kun (6 585,3 kun) — tutilishlar takrorlanish davri']
    ]},
    {sarlavha:'Yaqin tutilishlar', jadval:[
      ['2025-yil 7-sentabr','to‘liq Oy tutilishi — O‘zbekistonda ko‘ringan'],
      ['2026-yil 12-avgust','to‘liq Quyosh tutilishi — Grenlandiya, Islandiya, Ispaniya'],
      ['2027-yil 2-avgust','to‘liq Quyosh tutilishi — Shimoliy Afrika (Misrda ≈ 6 daq 23 s)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Soya va yarim soya', matn:'Quyosh nuqta emas, katta shar bo‘lgani uchun Yer va Oy orqasida ikki xil soya bor: to‘liq soya (umbra) — Quyosh butunlay to‘silgan qorong‘i konus, yarim soya (penumbra) — Quyosh qisman to‘silgan hudud.', holat:{rejim:'oy'}},
    {sarlavha:'Oy tutilishi', matn:'To‘lin oyda Oy tugun yaqinida bo‘lsa, u Yerning to‘liq soyasiga kiradi. Oy butunlay yo‘qolmaydi: Yer atmosferasida sinib, qizil nurlar soya ichiga tushadi va Oyni qo‘ng‘ir-qizil tusga bo‘yaydi.', holat:{rejim:'oy'}},
    {sarlavha:'Quyosh tutilishi', matn:'Yangi oyda Oy Quyosh va Yer orasida. Oyning to‘liq soyasi Yerda tor dog‘ hosil qiladi — shu yo‘lakda to‘liq tutilish, atrofdagi keng hududda — xususiy tutilish ko‘rinadi.', holat:{rejim:'quyosh'}},
    {sarlavha:'Nega tutilish har oy bo‘lmaydi?', matn:'Tugunlar chizig‘ini 90° ga burang: yangi oyda Oy Quyoshdan «yuqorida» o‘tadi va soyasi Yerga tushmaydi. Og‘ish atigi 5° bo‘lsa ham, Oy va Yer kichik, masofalar esa katta — shuning uchun ko‘pincha «adashadi».', holat:{rejim:'quyosh', tugun:90}},
    {sarlavha:'Tutilish mavsumlari', matn:'Tugunlar chizig‘i Quyoshga qaragan paytlar — tutilish mavsumlari — yiliga taxminan ikki marta, ≈ 173 kun oralig‘ida keladi. Bir yilni kuzating: 12–13 yangi oydan faqat bir nechtasi tutilish beradi.', holat:{rejim:'yil'}},
    {sarlavha:'Og‘ishning haqiqiy qiymati', matn:'«Og‘ish ×3» ni o‘chirsangiz, orbita haqiqiy 5,1° da ko‘rinadi — deyarli sezilmaydi, lekin tutilishlar uchun aynan shu kichik og‘ish hal qiluvchi.', holat:{rejim:'oy', tugun:20}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Tutilish hosil qiling', holat:{rejim:'oy', E:90, tugun:40},
    topshiriqlar:[
      {shart:'Slayderlar bilan <b>to‘liq Oy tutilishini</b> hosil qiling (Oy o‘rni ≈ 180°, tugunlar ≈ 0°).', hodisa:'fa-tutilish', kod:"ev.tip==='oy' && ev.daraja==='tola'", izoh:'To‘g‘ri — to‘lin oy tugun yaqinida: Oy Yerning <b>to‘liq soyasiga</b> kirdi.'},
      {shart:'Endi <b>to‘liq Quyosh tutilishini</b> hosil qiling.', hodisa:'fa-tutilish', kod:"ev.tip==='quyosh' && ev.daraja==='tola'", izoh:'To‘g‘ri — yangi oy tugun yaqinida: Oyning to‘liq soyasi Yerga tushdi.'},
      {shart:'Yangi oyni saqlab, tugunlar chizig‘ini burab, <b>tutilishsiz yangi oy</b>ni hosil qiling.', hodisa:'fa-tutilish', kod:"ev.faza==='yangi' && ev.daraja==='yoq'", izoh:'To‘g‘ri — Oy Quyoshdan yuqori yoki pastdan o‘tdi. Shuning uchun <b>tutilish har oy bo‘lmaydi</b>.'},
      {shart:'<b>Xususiy (qisman) Oy tutilishi</b>ni hosil qiling.', hodisa:'fa-tutilish', kod:"ev.tip==='oy' && ev.daraja==='qisman'", izoh:'To‘g‘ri — Oyning faqat bir qismi Yerning to‘liq soyasiga kirdi.'}
    ]},
  test:[
    {s:'Quyosh tutilishi Oyning qaysi fazasida bo‘ladi?', v:['To‘lin oyda','Yangi oyda','Birinchi chorakda','Istalgan fazada'], t:1, izoh:'<b>Yangi oyda</b> — Oy Quyosh va Yer orasida bo‘lganda.'},
    {s:'Oy tutilishi paytida Oy qayerda bo‘ladi?', v:['Quyosh va Yer orasida','Yerning soyasida','Quyoshning orqasida','Yerga eng yaqin nuqtada'], t:1, izoh:'Oy tutilishida Oy <b>Yerning soyasida</b> bo‘ladi (to‘lin oy).'},
    {s:'Nega tutilishlar har oy sodir bo‘lmaydi?', v:['Oy har oy ko‘rinmaydi','Oy orbitasi ekliptikaga ≈ 5° og‘gan','Quyosh har oy o‘z o‘rnini o‘zgartiradi','Yer soyasi juda kichik'], t:1, izoh:'<b>Oy orbitasi ekliptikaga ≈ 5° og‘gan</b>: ko‘pincha Oy Quyosh–Yer chizig‘idan yuqori yoki pastdan o‘tadi.'},
    {s:'To‘liq Oy tutilishida Oy qanday rangga kiradi?', v:['Yashil','Ko‘k','Qo‘ng‘ir-qizil','Butunlay ko‘rinmay qoladi'], t:2, izoh:'<b>Qo‘ng‘ir-qizil</b> — Yer atmosferasi sindirgan qizil nurlar soyaga tushadi (ko‘k nurlar sochilib ketadi).'},
    {s:'Quyosh diametri Oy diametridan taxminan necha marta katta?', v:['40','400','4 000','40 000'], t:1, izoh:'Taxminan <b>400</b> marta. Quyosh Oydan taxminan 400 marta uzoq bo‘lgani uchun osmonda ular deyarli bir xil kattalikda ko‘rinadi.'},
    {s:'Halqasimon Quyosh tutilishi qachon bo‘ladi?', v:['Oy Yerdan eng uzoqda bo‘lib, Quyoshni to‘liq to‘sa olmaganda','Oy Yerga eng yaqin bo‘lganda','Oy tutilishi bilan bir vaqtda','Quyosh ufqda bo‘lganda'], t:0, izoh:'<b>Oy uzoqroqda bo‘lib, osmonda Quyoshdan biroz kichik ko‘ringanda</b> — atrofda yorqin halqa qoladi.'},
    {s:'Qaysi tutilish Yerning tunlik yarmidagi barcha joylaridan bir vaqtda ko‘rinadi?', v:['To‘liq Quyosh tutilishi','Halqasimon Quyosh tutilishi','Oy tutilishi','Hech biri'], t:2, izoh:'<b>Oy tutilishi</b> — Oy ufqdan yuqori bo‘lgan hamma joydan ko‘rinadi. Quyosh tutilishi esa faqat Oy soyasi tushgan hududdan.'},
    {s:'Tutilishlarning takrorlanish davri — saros taxminan qancha?', v:['1 yil','≈ 18 yil 11 kun','29,5 kun','76 yil'], t:1, izoh:'Saros ≈ <b>18 yil 11 kun</b> (6 585,3 kun). 29,5 kun — sinodik oy.'},
    {s:'Quyosh tutilishini kuzatishda qaysi usul xavfsiz?', v:['Quyosh ko‘zoynagi bilan','Qoraytirilgan shisha orqali','Maxsus sertifikatlangan tutilish filtri yoki proyeksiya usuli bilan','Durbin orqali qisqa vaqt'], t:2, izoh:'Faqat <b>maxsus sertifikatlangan filtr (ISO 12312-2) yoki proyeksiya usuli</b>. Oddiy quyosh ko‘zoynagi va qoraytirilgan shisha ko‘zni himoya qilmaydi.'},
    {tur:'3d', s:'Oy tutilishida Oy kiradigan <b>Yerning to‘liq soyasini (umbra)</b> bosing.', hodisa:'fa-tutilish-qism', togri:['umbra'], v:['Yerning to‘liq soyasi (umbra)','boshqa qism'], t:0, izoh:'<b>Umbra</b> — Quyosh butunlay to‘silgan qorong‘i konus; unga kirgan Oy to‘liq tutiladi.'}
  ],
  yordamchi:[
    {s:'Nega Oy tutilishida ham Oy ko‘rinib turadi?', j:'Yer atmosferasi linza kabi quyosh nurlarini sindirib, soya ichiga yo‘naltiradi. Ko‘k nurlar yo‘lda sochilib ketadi, qizil nurlar esa o‘tadi — shuning uchun tutilgan Oy qo‘ng‘ir-qizil. Tutilish rangi atmosferadagi chang va bulutlarga bog‘liq.', kalit:['qizil','ko‘rinadi','rang']},
    {s:'Sahnadagi masofalar to‘g‘rimi?', j:'Yo‘q, sahna siqilgan: haqiqatda Oy Yerdan ≈ 384 400 km, ya’ni Yer diametridan ≈ 30 marta uzoqda, Quyosh esa ≈ 150 mln km uzoqlikda. Haqiqiy masshtabda Oy va soyalar ko‘rinmay qolardi.', kalit:['masshtab','masofa','to‘g‘ri']}
  ],
  maqola:[
    {sarlavha:'Quyosh tutilishi', xatboshilar:[
      'Quyosh tutilishi Oy Quyosh va Yer orasidan o‘tganda sodir bo‘ladi — bu faqat yangi oyda mumkin. Oyning to‘liq soyasi (umbra) Yer yuzasiga tushgan tor yo‘lakda (odatda 100–160 km) Quyosh butunlay to‘siladi: kunduzi qorong‘i tushadi, yorqin yulduzlar va Quyoshning oq toji ko‘rinadi. Yarim soya (penumbra) tushgan keng hududda esa Quyosh qisman to‘siladi — xususiy tutilish.',
      'Quyosh diametri Oynikidan ≈ 400 marta katta, lekin undan ≈ 400 marta uzoqda. Shuning uchun osmonda ikkalasi deyarli bir xil kattalikda ko‘rinadi. Oy orbitasi ellips bo‘lgani uchun Oy goh yaqinroq, goh uzoqroq: uzoqda bo‘lsa, Quyoshni to‘liq to‘sa olmaydi va atrofida yorqin halqa qoladi — halqasimon tutilish.',
      'To‘liq tutilish bir joyda eng ko‘pi bilan ≈ 7 daqiqa 32 soniya davom etishi mumkin, odatda esa 2–4 daqiqa. Yiliga Yerda 2 tadan 5 tagacha Quyosh tutilishi bo‘ladi, lekin har bir aniq shahardan to‘liq tutilish o‘rtacha bir necha yuz yilda bir marta ko‘rinadi.'
    ]},
    {sarlavha:'Oy tutilishi', xatboshilar:[
      'Oy tutilishi to‘lin oyda, Oy Yerning soyasiga kirganda bo‘ladi. Oy ufqdan yuqori bo‘lgan hamma joydan — Yerning tunlik yarmidan — ko‘rinadi, shuning uchun Oy tutilishini kuzatish imkoniyati ko‘proq. To‘liq faza 1 soat 47 daqiqagacha davom etishi mumkin.',
      'Oy to‘liq soyaga kirganda ham butunlay yo‘qolmaydi: Yer atmosferasida sinib, qizil nurlar soyaga tushadi — xuddi quyosh botishidagi kabi. Shuning uchun tutilgan Oy qo‘ng‘ir-qizil rangda ko‘rinadi. Qadimgi yunon olimi Aristotel Oy tutilishida Yer soyasi doim yumaloq ekanini ko‘rib, Yerning sharsimonligini isbotlagan.',
      'Tutilish turlari: to‘liq (Oy butunlay umbrada), xususiy (bir qismi umbrada) va yarim soyali (Oy faqat penumbrada — biroz xiralashadi, oddiy ko‘z bilan deyarli sezilmaydi). 2025-yil 7-sentabrdagi to‘liq Oy tutilishi O‘zbekistonda yaxshi ko‘ringan.'
    ]},
    {sarlavha:'Nega har oy emas: tugunlar va mavsumlar', xatboshilar:[
      'Agar Oy orbitasi ekliptika tekisligida yotganda edi, har yangi oyda Quyosh tutilishi, har to‘lin oyda Oy tutilishi bo‘lardi. Lekin Oy orbitasi ekliptikaga ≈ 5,1° og‘gan va uni ikki nuqtada — tugunlarda kesib o‘tadi. Tutilish faqat yangi yoki to‘lin oy tugunlardan biriga yaqin bo‘lganda sodir bo‘ladi.',
      'Tugunlar chizig‘i Quyosh yo‘nalishiga to‘g‘ri kelgan davrlar — tutilish mavsumlari — yiliga taxminan ikki marta, ≈ 173 kun oralig‘ida keladi. Har mavsumda kamida bitta Quyosh tutilishi va ko‘pincha bitta Oy tutilishi bo‘ladi. Tugunlar chizig‘i ham sekin buriladi (18,6 yilda to‘liq aylanadi), shuning uchun mavsumlar har yili ≈ 19 kun oldinroq keladi.',
      'Tutilishlar ≈ 18 yil 11 kunlik davr — saros bilan takrorlanadi. Qadimgi Bobil astronomlari bu davrni bilgan va tutilishlarni oldindan aytishga harakat qilgan. Rivoyatga ko‘ra, yunon faylasufi Fales miloddan avvalgi 585-yildagi tutilishni oldindan aytgan.'
    ]},
    {sarlavha:'Xavfsiz kuzatish', xatboshilar:[
      'Quyoshga, hatto tutilish paytida ham, oddiy ko‘z bilan, quyosh ko‘zoynagi, qoraytirilgan shisha yoki rentgen plyonkasi orqali qarash mumkin emas — to‘r pardaning kuyishi og‘riqsiz, lekin qaytmas bo‘lishi mumkin. Durbin va teleskop orqali filtrsiz qarash ayniqsa xavfli.',
      'Xavfsiz usullar: ISO 12312-2 standartiga mos maxsus tutilish ko‘zoynagi yoki filtr; proyeksiya usuli — kartonga igna bilan teshik ochib, Quyosh tasvirini boshqa oq varaqqa tushirish; daraxt barglari orasidan yerga tushgan «o‘roqcha» yorug‘lik dog‘larini kuzatish. Oy tutilishini esa oddiy ko‘z bilan bemalol kuzatish mumkin.'
    ]}
  ],
  formulalar:[
    ['D<sub>Q</sub> / D<sub>O</sub> ≈ r<sub>Q</sub> / r<sub>O</sub> ≈ 400','Quyosh va Oy burchak o‘lchamlari deyarli teng'],
    ['β = i · sin u, i ≈ 5,1°','Oyning ekliptikadan uzoqligi (u — tugundan hisoblangan burchak)'],
    ['346,6 kun / 2 ≈ 173 kun','Tutilish mavsumlari orasidagi vaqt (tutilish yili — 346,6 kun)'],
    ['Saros = 223 sinodik oy ≈ 6 585,3 kun','Tutilishlar takrorlanish davri']
  ],
  qiziqarli:[
    'To‘liq Quyosh tutilishi paytida 1919-yilda A. Eddington ekspeditsiyasi Quyosh yonidagi yulduzlar nurining og‘ishini o‘lchab, Eynshteynning umumiy nisbiylik nazariyasini tasdiqlagan.',
    'Oy har yili Yerdan ≈ 3,8 sm uzoqlashadi; juda uzoq kelajakda Oy Quyoshni to‘liq to‘sa olmaydi va faqat halqasimon tutilishlar qoladi.',
    'Geliy elementi 1868-yilgi Quyosh tutilishi paytida Quyosh spektrini o‘rganish orqali topilgan — Yerda undan keyin ajratib olingan.',
    '2027-yil 2-avgustdagi to‘liq Quyosh tutilishi Misrning Luksor shahri yaqinida ≈ 6 daqiqa 23 soniya davom etadi — XXI asrning eng uzunlaridan biri.'
  ],
  lugat:[
    ['Tutilish','Bir osmon jismining boshqasi soyasiga kirishi yoki uni to‘sishi.'],
    ['Umbra (to‘liq soya)','Yorug‘lik manbai butunlay to‘silgan soya qismi.'],
    ['Penumbra (yarim soya)','Manba qisman to‘silgan soya qismi.'],
    ['Ekliptika','Quyoshning yil davomida osmondagi ko‘rinma yo‘li; Yer orbitasi tekisligi.'],
    ['Tugun','Oy orbitasining ekliptika bilan kesishish nuqtasi.'],
    ['Halqasimon tutilish','Oy Quyoshni to‘liq to‘sa olmay, atrofda yorqin halqa qoladigan tutilish.'],
    ['Quyosh toji','To‘liq tutilishda ko‘rinadigan Quyoshning tashqi atmosferasi.'],
    ['Saros','Tutilishlarning ≈ 18 yil 11 kunlik takrorlanish davri.'],
    ['Tutilish mavsumi','Tugunlar chizig‘i Quyoshga qaragan, tutilishlar mumkin bo‘lgan davr.']
  ],
  manba:AST11 + '; NASA Eclipse Web Site (eclipse.gsfc.nasa.gov) — tutilishlar kataloglari; ' + WIKI + ': «Solar eclipse» (2–5 ta yiliga, 7 daq 32 s, 100–160 km), «Lunar eclipse» (≈ 107 daqiqagacha), «Saros (astronomy)», «Eclipse season», «Orbit of the Moon» (5,145°), «Solar eclipse of August 12, 2026», «Solar eclipse of August 2, 2027», «September 2025 lunar eclipse»; American Astronomical Society «Eclipse safety» (ISO 12312-2). Sahna: masshtab siqilgan; tutilish chegaralari (|β| < 1,5° va h.k.) taxminiy.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model, «lampa–globus–to‘p» tajribasi, muammoli savol, juftlikda ishlash',
    maqsad:{talimiy:'Quyosh va Oy tutilishlarining sababi, turlari va nega har oy bo‘lmasligini tushuntirish.',
      tarbiyaviy:'Ilmiy dunyoqarash, xurofotlarga tanqidiy munosabat; ko‘z salomatligini asrash.',
      rivojlantiruvchi:'Fazoviy modellashtirish, sabab-oqibat bog‘lash.'},
    natijalar:['Quyosh va Oy tutilishini chizmada ko‘rsatadi','Umbra va penumbrani farqlaydi','Tutilishlar nega har oy bo‘lmasligini tushuntiradi','Quyosh tutilishini xavfsiz kuzatish qoidalarini aytadi'],
    jihozlar:['MAKON sahnasi «Tutilishlar»','Stol lampasi, globus yoki katta to‘p, kichik to‘p (Oy)','Karton va igna (proyeksiya uchun)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Motivatsiya.</b> Tarixdan: qadimda tutilishlar qo‘rquv uyg‘otgan; ilm ularni oldindan aytadi.','Tinglaydi.'],
      ['8–18','<b>Soya.</b> Lampa va to‘p bilan umbra/penumbra; MAKON da Oy tutilishi.','Kuzatadi, chizadi.'],
      ['18–26','<b>Quyosh tutilishi.</b> To‘liq, xususiy, halqasimon; 400 marta nisbati.','Jadval to‘ldiradi.'],
      ['26–34','<b>Muammo:</b> «Nega har oy emas?» — tugunlar va 5° og‘ish; «Nega har oy emas?» rejimi.','Sanaydi: yilda nechta tutilish?'],
      ['34–42','<b>Mustahkamlash.</b> Xavfsizlik qoidalari; MAKON amaliyoti va test.','Bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Umbra','To‘liq soya.'],['Penumbra','Yarim soya.'],['Tugun','Orbitalar kesishgan nuqta.']],
    savollar:[['Oy tutilishi qaysi fazada?','To‘lin oyda'],['Og‘ish burchagi?','≈ 5,1°'],['Saros?','≈ 18 yil 11 kun']],
    uy:'Darslikdagi mavzuni o‘qish; tutilish sxemasini rangli qalamlarda chizish (umbra, penumbra); keyingi tutilishlar sanasini NASA saytidan yoki kutubxonadan topib yozish; proyeksiya «kamerasi»ni kartondan yasash.',
    manba:AST11
  }
};

/* =====================================================================
   7. QUYOSHNING TUZILISHI — 11-sinf (5-sinfda tanishuv)
   ===================================================================== */
D['astro-quyosh-tuzilishi'] = {
  fan:'astronomiya', qisqaNom:'Quyosh tuzilishi', nom:'Quyoshning tuzilishi',
  qisqa:'11-sinf · astronomiya (5-sinf tabiiy fanda tanishuv)', sinf:'11-sinf',
  sahna:'fa_quyosh',
  kor:{
    sarlavha:'Eng yaqin yulduzning ichiga qaraymiz',
    matn:'Quyosh — o‘rtacha kattalikdagi sariq yulduz, asosan vodorod va geliydan iborat ulkan plazma shari. Uning markazida termoyadro reaksiyalari boradi, energiya esa qatlamdan qatlamga o‘tib, sirtga chiqadi va yorug‘lik bo‘lib tarqaladi. Sahnada Quyoshning chorak qismi kesib olingan: yadro, nurlanish va konveksiya zonalari, fotosfera, xromosfera va tojni bosing, «Energiya yo‘li» ni kuzating. Qatlamlar qalinligi sxematik, raqamlar — NASA va ilmiy manbalardan.',
    punktlar:[
      '<b>Yadro</b> (radiusning 0–0,25 qismi): ≈ 15 mln °C, vodorod geliyga aylanadi',
      '<b>Nurlanish zonasi</b> (0,25–0,7): energiya fotonlar bilan juda sekin siljiydi',
      '<b>Konveksiya zonasi</b> (0,7–1): issiq plazma ko‘tariladi, soviganlari cho‘kadi',
      '<b>Fotosfera</b> ≈ 5 500 °C — biz ko‘radigan «sirt»; ustida xromosfera va 1–2 mln °C li toj'
    ]
  },
  bolimlar:[
    {sarlavha:'Quyosh raqamlarda', jadval:[
      ['Radius','≈ 696 000 km (Yernikidan ≈ 109 marta katta)'],
      ['Massa','≈ 2·10³⁰ kg (Yernikidan ≈ 333 000 marta katta)'],
      ['Quyosh sistemasi massasidagi ulushi','≈ 99,86 %'],
      ['Tarkibi (massa bo‘yicha)','vodorod ≈ 73 %, geliy ≈ 25 %, qolgani — og‘irroq elementlar'],
      ['Yoshi','≈ 4,6 mlrd yil'],
      ['Nur quvvati (yorqinlik)','≈ 3,8·10²⁶ Vt'],
      ['Yergacha masofa','≈ 150 mln km — nur ≈ 8 daq 19 s da yetadi'],
      ['O‘z o‘qi atrofida aylanishi','ekvatorda ≈ 25 kun, qutblarda ≈ 35 kun']
    ]},
    {sarlavha:'Qatlamlar', jadval:[
      ['Yadro','0–0,2…0,25 R · ≈ 15 mln °C (15,7 mln K) · termoyadro sintez'],
      ['Nurlanish zonasi','0,25–0,7 R · ≈ 7 → 2 mln °C · fotonlar diffuziyasi'],
      ['Konveksiya zonasi','0,7–1 R · < 2 mln °C · plazma oqimlari'],
      ['Fotosfera','qalinligi yuzlab km · ≈ 5 500 °C (5 772 K)'],
      ['Xromosfera','≈ 2 000 km · yuqorisida ≈ 20 000 K gacha'],
      ['Toj','millionlab km · 1–2 mln °C (ba’zi joylarda undan ham issiq)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Quyosh — yulduz', matn:'Quyosh — bizga eng yaqin yulduz. U Yerdan ≈ 150 mln km uzoqlikda, radiusi Yernikidan ≈ 109 marta, massasi ≈ 333 000 marta katta. Kesimdagi qatlamlarga qarang.', holat:{qatlam:null}},
    {sarlavha:'Yadro — energiya manbai', matn:'Markazda harorat ≈ 15 mln °C, bosim ulkan. Bu yerda vodorod yadrolari qo‘shilib geliyga aylanadi (termoyadro sintez). Har soniyada ≈ 4 mln tonna massa energiyaga aylanadi: E = mc².', holat:{qatlam:'yadro'}},
    {sarlavha:'Nurlanish zonasi', matn:'Energiya bu yerda fotonlar bilan tashiladi, lekin har bir foton son-sanoqsiz marta yutilib, yana chiqariladi va yo‘nalishini o‘zgartiradi. Energiyaning bu zonadan o‘tishi taxminan 10 ming – 170 ming yil oladi (baholar turlicha).', holat:{qatlam:'nurlanish'}},
    {sarlavha:'Konveksiya zonasi', matn:'Tashqi qismda plazma qaynayotgan qozondagidek aralashadi: issiq oqimlar ko‘tariladi, soviganlari cho‘kadi. Bu oqimlarning uchlari fotosferada granulyatsiya — «guruch donlari»ga o‘xshash yacheykalar bo‘lib ko‘rinadi.', holat:{qatlam:'konveksiya'}},
    {sarlavha:'Fotosfera va dog‘lar', matn:'Fotosfera — Quyoshning ko‘rinadigan «sirti», ≈ 5 500 °C. Qorong‘i Quyosh dog‘lari — kuchli magnit maydon issiqlik oqimini to‘sgan, atrofidan sovuqroq joylar; ularning soni ≈ 11 yillik sikl bilan o‘zgaradi.', holat:{qatlam:'dog'}},
    {sarlavha:'Xromosfera va toj', matn:'Fotosfera ustida qizg‘ish xromosfera va juda siyrak, 1–2 mln °C li toj joylashgan. Toj nega sirtdan yuzlab marta issiqroq ekani hozirgacha to‘liq hal qilinmagan muammo. Tojdan quyosh shamoli boshlanadi.', holat:{qatlam:'toj'}},
    {sarlavha:'Energiya yo‘li', matn:'Yadrodan chiqqan energiya nurlanish zonasida «adashib» yuradi, konveksiya zonasida oqim bilan ko‘tariladi va fotosferadan yorug‘lik bo‘lib chiqadi. Keyin u Yergacha ≈ 8 daqiqa 19 soniyada yetib keladi.', holat:{qatlam:null, energiya:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Qatlamlarni toping', holat:{qatlam:null},
    topshiriqlar:[
      {shart:'Termoyadro reaksiyalari boradigan qatlamni <b>kesimda bosing</b>.', hodisa:'fa-quyosh-qatlam', kod:"ev.nom==='yadro'", izoh:'To‘g‘ri — <b>yadro</b>: ≈ 15 mln °C, vodorod geliyga aylanadi.'},
      {shart:'Plazma «qaynab» aralashadigan qatlamni bosing.', hodisa:'fa-quyosh-qatlam', kod:"ev.nom==='konveksiya'", izoh:'To‘g‘ri — <b>konveksiya zonasi</b> (radiusning tashqi 30 %).'},
      {shart:'Energiya fotonlar bilan minglab yillar davomida siljiydigan qatlamni bosing.', hodisa:'fa-quyosh-qatlam', kod:"ev.nom==='nurlanish'", izoh:'To‘g‘ri — <b>nurlanish zonasi</b>.'},
      {shart:'Sirtdagi <b>Quyosh dog‘ini</b> bosing.', hodisa:'fa-quyosh-qatlam', kod:"ev.nom==='dog'", izoh:'To‘g‘ri — dog‘lar atrofidan sovuqroq, shuning uchun qorong‘i ko‘rinadi.'},
      {shart:'Quyoshning eng tashqi, 1–2 mln °C li atmosferasini tanlang (atrofdagi nurni bosing yoki tugmadan).', hodisa:'fa-quyosh-qatlam', kod:"ev.nom==='toj'", izoh:'To‘g‘ri — <b>toj (korona)</b>; u to‘liq Quyosh tutilishida oddiy ko‘z bilan ko‘rinadi.'}
    ]},
  test:[
    {s:'Quyosh energiyasining manbai nima?', v:['Ko‘mir yonishi','Vodorodning geliyga aylanishi (termoyadro sintez)','Uranning bo‘linishi','Gravitatsion siqilish va yonish'], t:1, izoh:'<b>Termoyadro sintez</b>: yadroda vodorod yadrolari qo‘shilib geliy hosil qiladi.'},
    {s:'Quyosh yadrosining harorati taxminan qancha?', v:['5 500 °C','1 mln °C','15 mln °C','1 mlrd °C'], t:2, izoh:'Yadro harorati <b>≈ 15 mln °C</b> (15,7 mln K).'},
    {s:'Biz ko‘radigan Quyosh «sirti» qanday ataladi?', v:['Xromosfera','Fotosfera','Toj','Konveksiya zonasi'], t:1, izoh:'<b>Fotosfera</b> — yorug‘lik chiqaradigan qatlam, ≈ 5 500 °C.'},
    {s:'Quyosh dog‘lari nega qorong‘i ko‘rinadi?', v:['Ular teshiklar','Ular atrofidan sovuqroq','Ularda moddalar yonib bo‘lgan','Ularni Oy to‘sadi'], t:1, izoh:'Dog‘lar <b>atrofidan sovuqroq</b> (taxminan 1 500 °C ga) — kuchli magnit maydon issiqlik oqimini to‘sadi.'},
    {s:'Quyosh dog‘lari soni taxminan qancha yillik sikl bilan o‘zgaradi?', v:['1 yil','11 yil','76 yil','1 000 yil'], t:1, izoh:'<b>≈ 11 yillik</b> Quyosh faolligi sikli.'},
    {s:'Qaysi qatlamda energiya issiq plazmaning ko‘tarilishi bilan tashiladi?', v:['Yadroda','Nurlanish zonasida','Konveksiya zonasida','Tojda'], t:2, izoh:'<b>Konveksiya zonasida</b> — xuddi qaynayotgan suvdagidek.'},
    {s:'Quyosh nuri Yergacha taxminan qancha vaqtda yetib keladi?', v:['8 soniya','8 daqiqa 19 soniya','8 soat','8 kun'], t:1, izoh:'≈ 150 mln km : 300 000 km/s ≈ 500 s = <b>8 daqiqa 19 soniya</b>.'},
    {s:'Quyosh toji qachon oddiy ko‘z bilan ko‘rinadi?', v:['Har kuni peshinda','To‘liq Quyosh tutilishida','Oy tutilishida','Quyosh botganda'], t:1, izoh:'<b>To‘liq Quyosh tutilishida</b>, fotosfera Oy bilan to‘silganda.'},
    {s:'Quyosh massasining asosiy qismini qaysi element tashkil etadi?', v:['Temir','Geliy','Vodorod','Kislorod'], t:2, izoh:'<b>Vodorod</b> (massaning ≈ 73 %), geliy ≈ 25 %.'},
    {tur:'3d', s:'Kesimda Quyoshning <b>termoyadro reaksiyalari boradigan</b> qatlamini bosing.', hodisa:'fa-quyosh-qatlam', togri:['yadro'], v:['Yadro','boshqa qatlam'], t:0, izoh:'<b>Yadro</b> — Quyosh radiusining ichki ≈ 20–25 % i.'}
  ],
  yordamchi:[
    {s:'Quyosh yonayotgan olovmi?', j:'Yo‘q. Yonish — kimyoviy reaksiya, u kislorod talab qiladi. Quyoshda esa yadro reaksiyalari boradi: vodorod yadrolari qo‘shilib geliy hosil qiladi va massaning bir qismi energiyaga aylanadi (E = mc²). Bu kimyoviy yonishdan millionlab marta samaraliroq.', kalit:['yonish','olov','kislorod']},
    {s:'Quyosh qachon «o‘chadi»?', j:'Quyosh taxminan 4,6 mlrd yoshda va yana ≈ 5 mlrd yil hozirgidek yonadi. Keyin yadroda vodorod tugab, Quyosh qizil gigantga aylanadi, so‘ng tashqi qatlamlarini tashlab, oq mitti bo‘lib qoladi.', kalit:['o‘chadi','kelajak','qizil gigant']}
  ],
  maqola:[
    {sarlavha:'Quyosh — oddiy yulduz', xatboshilar:[
      'Quyosh — Somon yo‘li galaktikasidagi yuz milliardlab yulduzlardan biri, spektral sinfi G2 bo‘lgan sariq mitti. Uning radiusi ≈ 696 000 km, massasi ≈ 2·10³⁰ kg — Quyosh sistemasidagi barcha massaning ≈ 99,86 % i. Quyosh taxminan 4,6 milliard yil oldin gaz-chang bulutining siqilishidan paydo bo‘lgan.',
      'Quyosh qattiq jism emas — u qizigan plazma shari: atomlar ionlashgan, elektronlar yadrolardan ajralgan. Shuning uchun Quyosh turli kengliklarda turlicha tezlikda aylanadi: ekvatorda ≈ 25 kunda, qutblar yaqinida ≈ 35 kunda. Bu hodisani Quyosh dog‘larining siljishidan bilish mumkin.'
    ]},
    {sarlavha:'Ichki qatlamlar', xatboshilar:[
      'Yadro Quyosh radiusining ichki ≈ 20–25 % ini egallaydi. Harorat ≈ 15 mln °C, zichlik suvnikidan taxminan 150 marta katta. Bu yerda termoyadro sintez boradi: to‘rtta vodorod yadrosi bir necha bosqichda bitta geliy yadrosiga aylanadi. Har soniyada ≈ 600 mln tonna vodorod geliyga aylanib, ≈ 4 mln tonna massa energiyaga o‘tadi.',
      'Nurlanish zonasi radiusning 0,25–0,7 qismini egallaydi. Energiya bu yerda fotonlar bilan tashiladi, lekin zich plazmada foton juda qisqa masofa uchib, yutiladi va boshqa yo‘nalishda qayta chiqariladi. Bunday «tasodifiy yo‘l» tufayli energiyaning bu zonadan chiqishi taxminan 10 ming – 170 ming yil oladi (turli baholar).',
      'Konveksiya zonasi (0,7–1 R) da modda nurlanishni yaxshi o‘tkazmaydi, shuning uchun energiyani plazmaning o‘zi olib chiqadi: pastdan issiq oqimlar ko‘tariladi, sirtda sovib, yana cho‘kadi. Fotosferadagi granulyatsiya — bu oqimlar uchlari; har bir granula o‘lchami ≈ 1 000 km atrofida.'
    ]},
    {sarlavha:'Quyosh atmosferasi', xatboshilar:[
      'Fotosfera — yorug‘lik chiqaradigan yupqa qatlam (qalinligi bir necha yuz km), harorati ≈ 5 500 °C (5 772 K). Quyosh diski chetida qorong‘iroq ko‘rinadi — biz u yerda fotosferaning yuqoriroq, sovuqroq qatlamlarini ko‘ramiz.',
      'Xromosfera — fotosfera ustidagi ≈ 2 000 km li qatlam; yuqorisida harorat 20 000 K gacha ko‘tariladi. Tutilish paytida u qisqa vaqt qizg‘ish halqa bo‘lib ko‘rinadi. Undan protuberanslar — ulkan plazma «favvoralari» ko‘tariladi.',
      'Toj (korona) — Quyoshning eng tashqi, juda siyrak atmosferasi, harorati 1–2 mln °C. Toj nega pastki qatlamlardan yuzlab marta issiq ekani — «toj isishi muammosi» — hozirgacha to‘liq yechilmagan; magnit maydon to‘lqinlari va kichik «chaqnashlar» sabab deb taxmin qilinadi. Tojdan kosmosga zaryadli zarralar oqimi — quyosh shamoli tarqaladi.'
    ]},
    {sarlavha:'Quyosh faolligi va Yer', xatboshilar:[
      'Quyosh dog‘lari — kuchli magnit maydon issiqlik oqimini to‘sgan, atrofidan ≈ 1 500 °C sovuqroq hududlar (taxminan 3 000–4 500 K). Ularning soni ≈ 11 yillik sikl bilan o‘zgaradi. Dog‘lar ko‘p bo‘lgan yillarda chaqnashlar va toj massasi otilishlari tez-tez sodir bo‘ladi.',
      'Kuchli otilishlar Yerda magnit bo‘ronlarini keltirib chiqaradi: qutb yog‘dulari kuchayadi, sun’iy yo‘ldoshlar va elektr tarmoqlari ishida uzilishlar bo‘lishi mumkin. 1859-yilgi «Karrington hodisasi»da qutb yog‘dulari tropik kengliklarda ham ko‘ringan, telegraf liniyalari ishdan chiqqan.',
      'NASA ning «Parker Solar Probe» zondi 2024-yil dekabrida Quyosh sirtiga ≈ 6,1 mln km gacha yaqinlashib, tojni ichidan o‘rgangan — bu inson yasagan qurilmaning Quyoshga eng yaqin kelishi.'
    ]}
  ],
  formulalar:[
    ['E = mc²','Massa va energiya ekvivalentligi (termoyadro sintez energiyasi)'],
    ['4 ¹H → ⁴He + energiya','Vodorodning geliyga aylanishi (umumlashgan tenglama)'],
    ['t = r / c ≈ 1,5·10¹¹ m : 3·10⁸ m/s ≈ 500 s','Quyosh nurining Yergacha kelish vaqti'],
    ['L ≈ 3,8·10²⁶ Vt','Quyosh yorqinligi (nurlanish quvvati)']
  ],
  qiziqarli:[
    'Quyosh ichiga taxminan 1,3 million Yer sig‘ishi mumkin (hajmlar nisbati ≈ 109³).',
    'Quyoshning yadrosi faqat ichki qismi bo‘lsa-da, energiyaning deyarli hammasi shu yerda hosil bo‘ladi.',
    'Yerga Quyoshdan keladigan energiyaning bir soatlik miqdori insoniyatning bir yillik energiya iste’moliga yaqin (taxminiy baho).',
    'Quyosh dog‘larini qadimgi xitoy astronomlari 2 ming yildan ko‘proq oldin qayd etgan; teleskop bilan ularni 1610–1611-yillarda Galiley va boshqa olimlar kuzatgan.'
  ],
  lugat:[
    ['Plazma','Ionlashgan gaz: atomlardan elektronlar ajralgan holat.'],
    ['Termoyadro sintez','Yengil yadrolarning qo‘shilib og‘irroq yadro hosil qilishi.'],
    ['Nurlanish zonasi','Energiya fotonlar bilan tashiladigan qatlam.'],
    ['Konveksiya','Issiq moddaning ko‘tarilib, sovuqning cho‘kishi bilan issiqlik uzatilishi.'],
    ['Fotosfera','Quyoshning ko‘rinadigan sirti.'],
    ['Granulyatsiya','Fotosferadagi konveksiya yacheykalari naqshi.'],
    ['Xromosfera','Fotosfera ustidagi qizg‘ish qatlam.'],
    ['Toj (korona)','Quyoshning eng tashqi, juda issiq atmosferasi.'],
    ['Quyosh dog‘i','Fotosferadagi sovuqroq, qorong‘i hudud.'],
    ['Protuberans','Toj ichiga ko‘tarilgan plazma bulutlari.'],
    ['Quyosh shamoli','Quyoshdan tarqaladigan zaryadli zarralar oqimi.']
  ],
  manba:AST11 + '; NASA Science «Sun: Facts» (science.nasa.gov/sun/facts) — yadro ≈ 15 mln °C, fotosfera ≈ 5 500 °C, toj ≈ 2 mln °C gacha, energiya 170 ming yilgacha; NASA «Parker Solar Probe» (2024-yil 24-dekabr, ≈ 6,1 mln km); ' + WIKI + ': «Sun» (radius 695 700 km, 5 772 K, tarkib 73,46 % H / 24,85 % He, 8 daq 19 s, 10 000–170 000 yil), «Solar core», «Radiative zone», «Convection zone», «Photosphere», «Chromosphere», «Corona», «Sunspot», «Solar cycle», «Carrington Event». Sahna: qatlamlar qalinligi va dog‘lar joyi sxematik.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D kesim model, qatlam «pasporti», klaster, juftlikda ishlash',
    maqsad:{talimiy:'Quyoshning ichki tuzilishi, energiya manbai va uzatilish usullari, atmosfera qatlamlari va faolligini o‘rganish.',
      tarbiyaviy:'Quyoshning Yerdagi hayot uchun ahamiyatini anglash; tabiatni asrash.',
      rivojlantiruvchi:'Model asosida jarayonlar zanjirini tushuntirish, raqamlarni taqqoslash.'},
    natijalar:['Quyosh qatlamlarini tartib bilan sanaydi va haroratlarini aytadi','Energiya manbai va uzatilish usullarini tushuntiradi','Quyosh dog‘lari va 11 yillik siklni izohlaydi','Quyosh faolligining Yerga ta’sirini misollar bilan aytadi'],
    jihozlar:['MAKON sahnasi «Quyoshning tuzilishi»','Quyosh fotosuratlari (NASA SDO — jamoat mulki)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Motivatsiya.</b> «Quyosh qanday qilib 4,6 mlrd yildan beri yonib turibdi?»','Taxmin aytadi.'],
      ['8–22','<b>Kesim bo‘ylab sayohat.</b> Yadro → nurlanish → konveksiya → fotosfera → xromosfera → toj; «qatlam pasporti» jadvali.','Jadval to‘ldiradi.'],
      ['22–30','<b>Energiya yo‘li.</b> Animatsiya, E = mc², 8 daqiqa 19 soniya.','Hisoblaydi.'],
      ['30–36','<b>Faollik.</b> Dog‘lar, 11 yillik sikl, magnit bo‘ronlar.','Muhokama qiladi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Bajaradi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Fotosfera','Ko‘rinadigan sirt.'],['Toj','Tashqi atmosfera.'],['Termoyadro sintez','Yadrolar qo‘shilishi.']],
    savollar:[['Yadro harorati?','≈ 15 mln °C'],['Sirt harorati?','≈ 5 500 °C'],['Dog‘lar sikli?','≈ 11 yil']],
    uy:'Darslikdagi mavzuni o‘qish; «Quyosh qatlamlari» klasterini chizish; hisoblash: Quyosh nuri Marsgacha (≈ 228 mln km) qancha vaqtda yetadi? (≈ 12,7 daqiqa).',
    manba:AST11
  }
};

/* =====================================================================
   8. SOMON YO‘LI GALAKTIKASI — 11-sinf
   ===================================================================== */
D['astro-galaktika'] = {
  fan:'astronomiya', qisqaNom:'Galaktika', nom:'Somon yo‘li galaktikasi',
  qisqa:'11-sinf · astronomiya · galaktikamiz tuzilishi va Quyoshning o‘rni', sinf:'11-sinf',
  sahna:'fa_galaktika',
  kor:{
    sarlavha:'Yuz milliardlab yulduzdan iborat «yulduz shahri»',
    matn:'Tunda osmonni kesib o‘tuvchi oqish yo‘lak — Somon yo‘li — bu biz ichida yashayotgan galaktikaning diskini yon tomondan ko‘rishimiz. Somon yo‘li — markazida bar (to‘siq) bo‘lgan spiral galaktika: 100–400 mlrd yulduz, gaz va chang, markazda o‘ta massiv qora tuynuk. Quyosh markazdan ≈ 26 700 yorug‘lik yili uzoqlikda, Orion tarmog‘ida joylashgan. Sahnada galaktikani turli tomondan ko‘ring, yenglarni va markazni bosing. Model sxematik: Galaktikani tashqaridan hech kim suratga olmagan — tuzilishi o‘lchovlar asosida tiklangan.',
    punktlar:[
      '<b>Turi:</b> to‘siqli spiral galaktika (SBbc)',
      '<b>Diametri:</b> ≈ 87 000–100 000 yorug‘lik yili (baholar turlicha)',
      '<b>Quyoshdan markazgacha:</b> ≈ 26 700 y.y. (26–27 ming, o‘lchovga qarab)',
      '<b>Galaktik yil:</b> Quyosh markaz atrofini ≈ 225–250 mln yilda bir marta aylanadi'
    ]
  },
  bolimlar:[
    {sarlavha:'Somon yo‘li raqamlarda', jadval:[
      ['Yulduzlar soni','100–400 mlrd (baholar)'],
      ['Diametr','≈ 87 400 y.y. (26,8 kpk) yoki ≈ 100 000 y.y. — manbaga qarab'],
      ['Yupqa disk qalinligi','≈ 700–1 500 y.y.'],
      ['Quyoshdan markazgacha','≈ 26 670 y.y. (GRAVITY, 2019); boshqa baholar 27 100 y.y. gacha'],
      ['Quyoshning orbital tezligi','≈ 220–230 km/s'],
      ['Galaktik yil','≈ 225–250 mln yil'],
      ['Markazdagi qora tuynuk Sgr A*','≈ 4,1–4,3 mln Quyosh massasi'],
      ['Eng yaqin yirik galaktika','Andromeda — ≈ 2,5 mln y.y.']
    ]},
    {sarlavha:'Tuzilishi', jadval:[
      ['Markaz va bo‘rtma','qari yulduzlar zich; markazda qora tuynuk'],
      ['Bar (to‘siq)','cho‘ziq yulduzlar tizimi; yenglar uning uchlaridan boshlanadi'],
      ['Spiral yenglar','Persey, Qalqon–Sentavr (yirik), Qavs, Go‘niya; Quyosh — Orion tarmog‘ida'],
      ['Disk','yosh yulduzlar, gaz, chang — yangi yulduzlar tug‘iladi'],
      ['Galo','diskni o‘rab turgan siyrak sfera: sharsimon yulduz to‘dalari, qorong‘i materiya']
    ], matn:'Yenglar joyi va soni haqida olimlar orasida muhokama davom etmoqda; sahnadagi yenglar sxematik.'}
  ],
  bosqichlar:[
    {sarlavha:'Galaktikamiz', matn:'Somon yo‘li — yulduzlar, gaz, chang va qorong‘i materiyadan iborat ulkan tizim. Undagi har bir nuqta — millionlab yulduzlarni ifodalaydi.', holat:{korinish:'qiya', aylanish:false}},
    {sarlavha:'Yuqoridan: bar va spiral yenglar', matn:'Markazda cho‘ziq bar, uning uchlaridan spiral yenglar chiqadi. Yenglarda yosh, issiq, ko‘kish yulduzlar va yulduz tug‘iladigan pushti tumanliklar ko‘p.', holat:{korinish:'yuqori', aylanish:false}},
    {sarlavha:'Yondan: yupqa disk', matn:'Yondan qaraganda galaktika yupqa disk va markazdagi qalin bo‘rtma. Biz diskning ichida yashaymiz — shuning uchun tungi osmonda Somon yo‘li yo‘lak bo‘lib ko‘rinadi.', holat:{korinish:'yon', aylanish:false}},
    {sarlavha:'Quyosh qayerda?', matn:'Quyosh markazdan ≈ 26 700 yorug‘lik yili uzoqlikda, Qavs va Persey yenglari orasidagi Orion tarmog‘ida. Biz galaktikaning «chekka tumani»da yashaymiz.', holat:{korinish:'quyosh', aylanish:false}},
    {sarlavha:'Markaz: Sagittarius A*', matn:'Galaktika markazida ≈ 4 mln Quyosh massasiga teng qora tuynuk bor. Uning atrofida aylanuvchi yulduzlarni kuzatish uchun R. Gensel va A. Gez 2020-yilda Nobel mukofotini olgan; 2022-yilda uning «soyasi» suratga olingan.', holat:{korinish:'qiya', aylanish:false}},
    {sarlavha:'Galaktik aylanish', matn:'Quyosh markaz atrofida ≈ 220–230 km/s tezlikda aylanadi va bir aylanishni ≈ 225–250 mln yilda bajaradi. Dinozavrlar paydo bo‘lganidan beri Quyosh taxminan bir marta aylanib chiqqan.', holat:{korinish:'yuqori', aylanish:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Galaktikada mo‘ljal oling', holat:{korinish:'qiya', aylanish:false},
    topshiriqlar:[
      {shart:'Galaktikada <b>Quyosh sistemasi</b> joylashgan nuqtani bosing.', hodisa:'fa-galaktika', kod:"ev.nom==='quyosh'", izoh:'To‘g‘ri — Quyosh markazdan ≈ <b>26 700 yorug‘lik yili</b> uzoqlikda.'},
      {shart:'Galaktika <b>markazini</b> bosing — u yerda nima bor?', hodisa:'fa-galaktika', kod:"ev.nom==='markaz'", izoh:'To‘g‘ri — markazda o‘ta massiv qora tuynuk <b>Sagittarius A*</b>.'},
      {shart:'Galaktikani <b>yondan</b> ko‘ring.', hodisa:'fa-korinish', kod:"ev.k==='yon'", izoh:'To‘g‘ri — galaktika <b>yupqa disk</b> shaklida.'},
      {shart:'Quyoshdan tashqarida joylashgan <b>Persey yengini</b> bosing.', hodisa:'fa-galaktika', kod:"ev.nom==='perseus'", izoh:'To‘g‘ri — <b>Persey yengi</b>, Galaktikaning ikki yirik yengidan biri.'}
    ]},
  test:[
    {s:'Somon yo‘li qanday galaktika turiga kiradi?', v:['Elliptik','Noto‘g‘ri shaklli','To‘siqli (barli) spiral','Linzasimon'], t:2, izoh:'Somon yo‘li — <b>to‘siqli (barli) spiral</b> galaktika.'},
    {s:'Quyosh Galaktika markazidan taxminan qancha uzoqlikda?', v:['≈ 2 700 y.y.','≈ 26 700 y.y.','≈ 100 000 y.y.','≈ 2,5 mln y.y.'], t:1, izoh:'≈ <b>26 700 y.y.</b> (26–27 ming). 2,5 mln y.y. — Andromeda galaktikasigacha masofa.'},
    {s:'Galaktika markazida nima joylashgan?', v:['Quyosh','Eng katta yulduz','O‘ta massiv qora tuynuk Sagittarius A*','Bo‘shliq'], t:2, izoh:'<b>O‘ta massiv qora tuynuk Sagittarius A*</b>, ≈ 4 mln Quyosh massasi.'},
    {s:'Quyosh Galaktika markazi atrofini taxminan qancha vaqtda bir marta aylanib chiqadi?', v:['1 yilda','≈ 11 yilda','≈ 225–250 mln yilda','≈ 4,6 mlrd yilda'], t:2, izoh:'Galaktik yil ≈ <b>225–250 mln yil</b>.'},
    {s:'Tungi osmonda Somon yo‘li nega yo‘lak bo‘lib ko‘rinadi?', v:['U Yer atmosferasidagi bulut','Biz galaktika diskining ichida bo‘lib, uni yondan ko‘ramiz','U Quyosh nurining aksi','U Oy orbitasi'], t:1, izoh:'<b>Biz yupqa diskning ichidamiz</b>: disk tekisligi bo‘ylab yulduzlar juda ko‘p — oqish yo‘lak ko‘rinadi.'},
    {s:'Somon yo‘lining yulduzlardan iboratligini birinchi bo‘lib teleskopda kim ko‘rgan?', v:['Ptolemey','Galileo Galiley (1610)','Edvin Xabbl','Ulug‘bek'], t:1, izoh:'<b>Galileo Galiley</b> 1610-yilda «Yulduz xabarchisi» asarida yozgan.'},
    {s:'Quyosh qaysi yeng yoki tarmoqda joylashgan?', v:['Persey yengida','Orion tarmog‘ida','Galaktika markazida','Galoda'], t:1, izoh:'Quyosh <b>Orion tarmog‘ida</b> — Qavs va Persey yenglari orasida.'},
    {s:'Somon yo‘liga eng yaqin yirik spiral galaktika qaysi?', v:['Andromeda','Katta Magellan buluti','Uchburchak galaktikasi','Sombrero'], t:0, izoh:'<b>Andromeda</b> (M31), ≈ 2,5 mln y.y. Katta Magellan buluti yaqinroq, lekin u kichik, noto‘g‘ri shaklli galaktika.'},
    {s:'Somon yo‘li diametri taxminan qancha?', v:['≈ 1 000 y.y.','≈ 10 000 y.y.','≈ 87–100 ming y.y.','≈ 10 mln y.y.'], t:2, izoh:'≈ <b>87–100 ming yorug‘lik yili</b> (manbaga qarab).'},
    {tur:'3d', s:'Galaktikada <b>Quyosh sistemasi</b> joylashgan nuqtani bosing.', hodisa:'fa-galaktika', togri:['quyosh'], v:['Quyosh (Orion tarmog‘i)','boshqa joy'], t:0, izoh:'<b>Quyosh</b> — markazdan ≈ 26 700 y.y. uzoqlikda, Orion tarmog‘ida.'}
  ],
  yordamchi:[
    {s:'Galaktikani tashqaridan kim suratga olgan?', j:'Hech kim. Barcha kosmik apparatlar Galaktika ichida. Uning tuzilishi yulduzlar, gaz bulutlari va radiomanbalarning masofasi va tezligini o‘lchab tiklangan (masalan, Gaia teleskopi 1 mlrd dan ortiq yulduz joyini o‘lchagan). Shuning uchun sahnadagi va kitoblardagi rasmlar — rassom modeli.', kalit:['surat','tashqaridan','rasm']},
    {s:'Galaktika aylansa, nega yulduz turkumlari o‘zgarmaydi?', j:'O‘zgaradi, lekin juda sekin. Qo‘shni yulduzlar Quyosh bilan deyarli birga harakatlanadi, nisbiy siljishlar yiliga juda kichik burchaklar. Turkumlar shakli o‘n minglab yillarda sezilarli o‘zgaradi.', kalit:['turkum','o‘zgar','aylan']}
  ],
  maqola:[
    {sarlavha:'Osmondagi «somon» yo‘lagi', xatboshilar:[
      'Shahar chirog‘laridan uzoqda, oysiz tunda osmonni kesib o‘tuvchi oqish, xira yo‘lak ko‘rinadi. O‘zbek xalqi uni «Somon yo‘li» deb atagan — go‘yo yo‘lga somon to‘kilgandek. Yunonlar uni «sut doirasi» (galaxias) deb atagan, «galaktika» so‘zi shundan kelib chiqqan.',
      '1610-yilda Galileo Galiley teleskopda bu yo‘lak son-sanoqsiz xira yulduzlardan iboratligini ko‘rgan. XVIII–XIX asrlarda V. Gershel yulduzlarni sanab, ular yassi diskni tashkil qilishini aniqlagan. XX asrda X. Shepli Quyosh markazda emasligini, E. Xabbl esa (1920-yillar) boshqa galaktikalar ham mavjudligini isbotlagan.'
    ]},
    {sarlavha:'Tuzilishi', xatboshilar:[
      'Somon yo‘li — to‘siqli (barli) spiral galaktika. Markazida qari yulduzlar zich joylashgan bo‘rtma (bulge) va cho‘ziq bar bor. Bar uchlaridan spiral yenglar boshlanadi: yirik yenglar — Persey va Qalqon–Sentavr, kichikroqlari — Qavs (Sagittarius) va Go‘niya (Norma). Yenglarda gaz va chang ko‘p, shu yerda yangi yulduzlar tug‘iladi, shuning uchun ular yosh, ko‘kish yulduzlar bilan yorqin.',
      'Disk juda yupqa: diametri ≈ 87–100 ming yorug‘lik yili, yupqa disk qalinligi esa ≈ 1 000 y.y. atrofida. Diskni siyrak, sharsimon galo o‘rab turadi — unda qari sharsimon yulduz to‘dalari va ko‘rinmas «qorong‘i materiya» bor. Galaktika massasining asosiy qismini aynan qorong‘i materiya tashkil etadi.',
      'Yulduzlar soni 100–400 milliard deb baholanadi. Aniq sanashning iloji yo‘q: ko‘plab yulduzlar chang bulutlari ortida yashiringan.'
    ]},
    {sarlavha:'Quyoshning o‘rni va harakati', xatboshilar:[
      'Quyosh markazdan ≈ 26 700 yorug‘lik yili uzoqlikda (2019-yilgi GRAVITY o‘lchovi; boshqa baholar 26–27 ming y.y.), Qavs va Persey yenglari orasidagi kichik Orion tarmog‘ida joylashgan. Biz diskning ichida bo‘lganimiz uchun Galaktikaning butun ko‘rinishini tasavvur qilish qiyin.',
      'Quyosh o‘z sayyoralari bilan birga markaz atrofida ≈ 220–230 km/s tezlikda aylanadi va bir aylanishni ≈ 225–250 mln yilda — bir «galaktik yil»da bajaradi. Demak, Quyosh paydo bo‘lganidan beri Galaktika markazini taxminan 20 marta aylanib chiqqan.'
    ]},
    {sarlavha:'Markazdagi qora tuynuk va qo‘shnilar', xatboshilar:[
      'Galaktika markazida Sagittarius A* (Sgr A*) deb ataladigan o‘ta massiv qora tuynuk bor, uning massasi ≈ 4,1–4,3 mln Quyosh massasi. Olimlar uning atrofida aylanuvchi yulduzlar orbitalarini o‘nlab yillar kuzatib, massasini aniqlagan; buning uchun Reynxard Gensel va Andrea Gez 2020-yilda fizika bo‘yicha Nobel mukofotini olgan. 2022-yil 12-mayda «Event Horizon Telescope» Sgr A* soyasining tasvirini e’lon qilgan.',
      'Somon yo‘li Mahalliy guruh galaktikalari tarkibiga kiradi. Eng yaqin yirik qo‘shnimiz — Andromeda galaktikasi (≈ 2,5 mln y.y.), u oddiy ko‘z bilan xira dog‘ bo‘lib ko‘rinadi. Andromeda va Somon yo‘li bir-biriga yaqinlashmoqda; bir necha milliard yildan keyin ular to‘qnashishi mumkin (ehtimoli haqida baholar turlicha).'
    ]}
  ],
  formulalar:[
    ['T = 2πR / v','Aylanish davri: R ≈ 26 700 y.y. ≈ 2,5·10¹⁷ km, v ≈ 225 km/s → T ≈ 2,2·10⁸ yil'],
    ['1 y.y. ≈ 9,46·10¹² km','Yorug‘lik yili'],
    ['1 pk ≈ 3,26 y.y.','Parsek; 1 kpk = 1 000 pk'],
    ['4,6 mlrd : 0,23 mlrd ≈ 20','Quyoshning Galaktika atrofidagi aylanishlari soni']
  ],
  qiziqarli:[
    'Galaktika markazidan kelayotgan yorug‘lik bizga ≈ 26 700 yilda yetadi — biz markazni tosh davridagi holatida ko‘ramiz.',
    'Yevropa kosmik agentligining Gaia teleskopi Somon yo‘lidagi 1 milliarddan ortiq yulduzning joyi va harakatini o‘lchagan.',
    'Katta va Kichik Magellan bulutlari — Somon yo‘lining yo‘ldosh galaktikalari; ular Janubiy yarimsharda oddiy ko‘z bilan ko‘rinadi.',
    'Toshkent kabi katta shaharlarda yorug‘lik ifloslanishi tufayli Somon yo‘li deyarli ko‘rinmaydi; uni tog‘lar yoki cho‘lda kuzatgan ma’qul.'
  ],
  lugat:[
    ['Galaktika','Yulduzlar, gaz, chang va qorong‘i materiyadan iborat, tortishish bilan bog‘langan ulkan tizim.'],
    ['Spiral yeng','Galaktika diskida spiral bo‘ylab joylashgan yosh yulduzlar va gaz yo‘lagi.'],
    ['Bar (to‘siq)','Galaktika markazidagi cho‘ziq yulduzlar tizimi.'],
    ['Bo‘rtma (bulge)','Markazdagi qalin, qari yulduzlar ko‘p hudud.'],
    ['Galo','Galaktika diskini o‘rab turuvchi siyrak sferik hudud.'],
    ['Qorong‘i materiya','Nur chiqarmaydigan, faqat tortishishi orqali seziladigan modda.'],
    ['Sagittarius A*','Somon yo‘li markazidagi o‘ta massiv qora tuynuk.'],
    ['Galaktik yil','Quyoshning Galaktika markazi atrofida bir marta aylanish vaqti.'],
    ['Parsek (pk)','Astronomik masofa birligi, ≈ 3,26 y.y.']
  ],
  manba:AST11 + '; ' + WIKI + ': «Milky Way» (diametr 26,8 ± 1,1 kpk, 100–400 mlrd yulduz, SBbc, disk qalinligi), «Galactic Center», «Sagittarius A*», «Orion Arm», «Spiral arm», «Galactic year», «Andromeda Galaxy»; GRAVITY Collaboration (2019) «A geometric distance measurement to the Galactic Center black hole with 0.3% uncertainty» (R₀ ≈ 8,178 kpk); Nobel mukofoti (fizika, 2020); Event Horizon Telescope (2022-yil 12-may); ESA Gaia. Sahna: yenglar shakli va soni sxematik (pitch ≈ 12°), bar burchagi taxminiy.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model, masshtab mashqi, «galaktika manzili» o‘yini, guruhda ishlash',
    maqsad:{talimiy:'Somon yo‘li tuzilishi, o‘lchamlari, Quyoshning o‘rni va harakati, markazdagi qora tuynuk haqida bilim berish.',
      tarbiyaviy:'Koinot ulkanligini his qilish orqali ilmiy dunyoqarash va kamtarlikni tarbiyalash.',
      rivojlantiruvchi:'Katta sonlar va masshtablar bilan ishlash, modelni tanqidiy baholash.'},
    natijalar:['Galaktika qismlarini (bar, yeng, disk, galo) sanaydi','Quyoshning o‘rnini va masofasini aytadi','Galaktik yilni hisoblaydi','Nima uchun Somon yo‘li osmonda yo‘lak bo‘lib ko‘rinishini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Somon yo‘li»','Somon yo‘li fotosurati (ESA/NASA, ochiq litsenziyali)','Kalkulyator','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Motivatsiya.</b> «Bizning to‘liq manzilimiz: ko‘cha, shahar, … galaktika?»','Manzil yozadi.'],
      ['8–20','<b>Tuzilish.</b> MAKON: qiyadan, yuqoridan, yondan; bar, yenglar, disk, galo.','Sxema chizadi.'],
      ['20–28','<b>Quyoshning o‘rni.</b> 26 700 y.y., Orion tarmog‘i; galaktik yil hisobi.','Hisoblaydi.'],
      ['28–34','<b>Markaz va qo‘shnilar.</b> Sgr A*, Nobel 2020, Andromeda.','Muhokama qiladi.'],
      ['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Bajaradi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Galaktika','Yulduzlar tizimi.'],['Galaktik yil','≈ 225–250 mln yil.'],['Sgr A*','Markazdagi qora tuynuk.']],
    savollar:[['Somon yo‘li turi?','To‘siqli spiral'],['Quyoshdan markazgacha?','≈ 26 700 y.y.'],['Eng yaqin yirik galaktika?','Andromeda']],
    uy:'Darslikdagi mavzuni o‘qish; «koinotdagi manzilim» sxemasini chizish (Yer → Quyosh sistemasi → Orion tarmog‘i → Somon yo‘li → Mahalliy guruh); hisoblash: 220 km/s tezlikda Quyosh bir kunda qancha yo‘l bosadi? (≈ 19 mln km).',
    manba:AST11
  }
};

/* =====================================================================
   9. KEPLER QONUNLARI — 11-sinf (9-sinf fizikada butun olam tortishish bilan)
   ===================================================================== */
D['astro-kepler'] = {
  fan:'astronomiya', qisqaNom:'Kepler qonunlari', nom:'Kepler qonunlari',
  qisqa:'11-sinf · astronomiya · sayyoralar harakati qonunlari', sinf:'11-sinf',
  sahna:'fa_kepler',
  kor:{
    sarlavha:'Sayyoralar ellips bo‘ylab, notekis tezlikda aylanadi',
    matn:'Iogann Kepler Tixo Brage kuzatuvlarini tahlil qilib, sayyoralar harakatining uchta qonunini topgan (1609 va 1619). Sahnada sayyora Quyosh atrofida Kepler tenglamasi bo‘yicha aniq harakatlanadi. Ekssentrisitetni o‘zgartirib, ellips shaklini kuzating; «teng yuzalar» rejimida radius-vektor chizgan sektorlarni solishtiring; uchinchi qonun rejimida haqiqiy sayyoralar orbitalari va jadval bor. Perigeliy, afeliy va fokusni bosing.',
    punktlar:[
      '<b>I qonun:</b> har bir sayyora ellips bo‘ylab aylanadi, Quyosh — fokuslardan birida',
      '<b>II qonun:</b> radius-vektor teng vaqtlarda teng yuzalar chizadi — perigeliyda tez, afeliyda sekin',
      '<b>III qonun:</b> T₁² / T₂² = a₁³ / a₂³ — yil va a.b. da T² ≈ a³',
      '<b>Ekssentrisitet e:</b> 0 — aylana, 1 ga yaqin — juda cho‘ziq ellips (kometalar)'
    ]
  },
  bolimlar:[
    {sarlavha:'Sayyoralar: III qonun tekshiruvi', jadval:[
      ['Merkuriy','a = 0,387 a.b. · T = 0,241 yil · e = 0,206'],
      ['Venera','a = 0,723 a.b. · T = 0,615 yil · e = 0,007'],
      ['Yer','a = 1,000 a.b. · T = 1,000 yil · e = 0,017'],
      ['Mars','a = 1,524 a.b. · T = 1,881 yil · e = 0,093'],
      ['Yupiter','a = 5,203 a.b. · T = 11,86 yil · e = 0,048'],
      ['Saturn','a = 9,537 a.b. · T = 29,50 yil · e = 0,054']
    ], matn:'Har bir sayyora uchun T²/a³ ≈ 1 (yil²/a.b.³). Qiymatlar: Wikipedia «Kepler’s laws of planetary motion» jadvali (J2000).'},
    {sarlavha:'Yer orbitasi', jadval:[
      ['Perigeliy','≈ 147,1 mln km — yanvar boshida (3–5-yanvar)'],
      ['Afeliy','≈ 152,1 mln km — iyul boshida (3–6-iyul)'],
      ['Orbital tezlik','≈ 30,3 km/s (perigeliyda) … ≈ 29,3 km/s (afeliyda)'],
      ['Ekssentrisitet','≈ 0,0167 — deyarli aylana']
    ], matn:'Diqqat: fasllar Quyoshgacha masofaga emas, Yer o‘qining og‘ishiga bog‘liq — Shimoliy yarimsharda qish aynan perigeliyga to‘g‘ri keladi.'}
  ],
  bosqichlar:[
    {sarlavha:'I qonun: ellips', matn:'Sayyora orbitasi — ellips. Quyosh ellips markazida emas, fokuslardan birida turadi. Ikkinchi fokus bo‘sh — u yerda hech narsa yo‘q.', holat:{rejim:'ellips', e:.5}},
    {sarlavha:'Ekssentrisitet', matn:'e = 0 da orbita aylana. Yer orbitasining ekssentrisiteti atigi 0,017 — ko‘zga deyarli aylana. Merkuriyniki 0,206, Galley kometasiniki esa 0,967.', holat:{rejim:'ellips', e:.017}},
    {sarlavha:'Perigeliy va afeliy', matn:'Quyoshga eng yaqin nuqta — perigeliy, eng uzoq — afeliy. Masofalar: a(1 − e) va a(1 + e). e = 0,6 da afeliy perigeliydan 4 marta uzoq.', holat:{rejim:'ellips', e:.6}},
    {sarlavha:'II qonun: teng yuzalar', matn:'Orbita teng vaqt oraliqlariga bo‘lingan: har bir rangli sektor bir xil vaqtda chizilgan va yuzalari teng. Quyoshga yaqin sektorlar kalta, lekin keng — sayyora u yerda tezroq.', holat:{rejim:'yuza', e:.6}},
    {sarlavha:'Tezlikning o‘zgarishi', matn:'Perigeliy va afeliydagi tezliklar nisbati v<sub>p</sub>/v<sub>a</sub> = (1 + e)/(1 − e). Yer uchun ≈ 1,03, Galley kometasi uchun ≈ 60.', holat:{rejim:'yuza', e:.967}},
    {sarlavha:'III qonun: T² ∝ a³', matn:'Quyoshdan uzoqlashgan sari aylanish davri keskin ortadi: Merkuriy 88 kunda, Saturn ≈ 29,5 yilda aylanadi. Barcha sayyoralar uchun T²/a³ bir xil — jadvalni tekshiring.', holat:{rejim:'uchinchi'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Kepler qonunlarini sinab ko‘ring', holat:{rejim:'ellips', e:.3},
    topshiriqlar:[
      {shart:'Ekssentrisitetni <b>0</b> ga tushiring — orbita qanday shaklga kiradi?', hodisa:'fa-kepler', kod:"ev.e<=0.005", izoh:'To‘g‘ri — e = 0 da ellips <b>aylanaga</b> aylanadi, ikkala fokus markazda birlashadi.'},
      {shart:'e ni kamida <b>0,6</b> qiling va sayyora <b>eng tez</b> harakatlanadigan nuqtani bosing.', hodisa:'fa-kepler-nuqta', kod:"ev.nom==='perigeliy' && ev.e>=0.6", izoh:'To‘g‘ri — <b>perigeliy</b>: Quyoshga eng yaqin nuqta, tezlik eng katta.'},
      {shart:'<b>Teng yuzalar</b> (II qonun) rejimini yoqing.', hodisa:'fa-kepler', kod:"ev.rejim==='yuza'", izoh:'To‘g‘ri — har bir sektor teng vaqtda chiziladi va <b>yuzalari teng</b>.'},
      {shart:'III qonun rejimida <b>Yupiterni</b> bosing va uning T²/a³ qiymatini jadvalda toping.', hodisa:'fa-sayyora', kod:"ev.nom==='yupiter'", izoh:'To‘g‘ri — Yupiter: a ≈ 5,2 a.b., T ≈ 11,86 yil, T²/a³ ≈ <b>1,00</b>.'}
    ]},
  test:[
    {s:'Keplerning birinchi qonuniga ko‘ra, sayyora orbitasi qanday shaklda?', v:['Aylana','Ellips, Quyosh uning fokuslaridan birida','Ellips, Quyosh uning markazida','Parabola'], t:1, izoh:'<b>Ellips, Quyosh uning fokuslaridan birida.</b>'},
    {s:'Sayyora orbitasining qaysi nuqtasida eng tez harakatlanadi?', v:['Afeliyda','Perigeliyda','Ellips markazida','Hamma joyda bir xil'], t:1, izoh:'<b>Perigeliyda</b> — Quyoshga eng yaqin nuqtada (II qonun).'},
    {s:'Keplerning ikkinchi qonuni nimani ta’kidlaydi?', v:['Orbitalar aylana','Radius-vektor teng vaqtlarda teng yuzalar chizadi','T² ∝ a³','Barcha sayyoralar bir xil tezlikda'], t:1, izoh:'<b>Radius-vektor teng vaqt oraliqlarida teng yuzalar chizadi.</b>'},
    {s:'Sayyoraning orbita katta yarim o‘qi 4 a.b. Uning aylanish davri qancha?', v:['4 yil','8 yil','16 yil','64 yil'], t:1, izoh:'T² = a³ = 64 → T = <b>8 yil</b>.'},
    {s:'Kepler qonunlarini kimning kuzatuvlari asosida topgan?', v:['Galileo Galiley','Tixo Brage','Nikolay Kopernik','Isaak Nyuton'], t:1, izoh:'Daniyalik astronom <b>Tixo Brage</b>ning aniq kuzatuvlari (ayniqsa Mars bo‘yicha) asosida.'},
    {s:'Ekssentrisitet e = 0 bo‘lsa, orbita qanday bo‘ladi?', v:['Juda cho‘ziq ellips','Aylana','Parabola','To‘g‘ri chiziq'], t:1, izoh:'<b>Aylana</b> — ikkala fokus markazda birlashadi.'},
    {s:'Yer Quyoshga eng yaqin (perigeliy) nuqtadan qachon o‘tadi?', v:['Iyul boshida','Yanvar boshida','Mart oxirida','Sentabr oxirida'], t:1, izoh:'<b>Yanvar boshida</b> (≈ 147,1 mln km). Fasllar esa Yer o‘qining og‘ishi tufayli.'},
    {s:'Keplerning uchinchi qonuni qaysi asarida e’lon qilingan (1619)?', v:['«Yangi astronomiya»','«Olam uyg‘unligi»','«Principia»','«Almagest»'], t:1, izoh:'<b>«Olam uyg‘unligi»</b> (Harmonices Mundi, 1619). Birinchi ikki qonun — «Yangi astronomiya» (Astronomia nova, 1609).'},
    {s:'Galley kometasi orbitasining ekssentrisiteti ≈ 0,967. Perigeliy va afeliydagi tezliklar nisbati taxminan qancha?', v:['≈ 1,03','≈ 2','≈ 60','≈ 1 000'], t:2, izoh:'v<sub>p</sub>/v<sub>a</sub> = (1 + e)/(1 − e) = 1,967 / 0,033 ≈ <b>60</b>.'},
    {tur:'3d', s:'Orbitada sayyora <b>eng tez harakatlanadigan</b> nuqtani bosing.', hodisa:'fa-kepler-nuqta', togri:['perigeliy'], v:['Perigeliy','boshqa nuqta'], t:0, izoh:'<b>Perigeliy</b> — Quyoshga eng yaqin nuqta; II qonunga ko‘ra tezlik eng katta.'}
  ],
  yordamchi:[
    {s:'Nega yaqin joyda sayyora tezroq?', j:'Quyoshga yaqinlashganda tortishish kuchi sayyorani tezlashtiradi (potensial energiya kinetik energiyaga aylanadi), uzoqlashganda sekinlashtiradi. II qonun — impuls momentining saqlanishi natijasi: r · v · sinφ = const.', kalit:['tez','yaqin','sabab']},
    {s:'Kepler qonunlari faqat sayyoralar uchunmi?', j:'Yo‘q, ular markaziy jism atrofida tortishish kuchi ta’sirida aylanuvchi har qanday jism uchun o‘rinli: Oy va sun’iy yo‘ldoshlar Yer atrofida, Yupiter yo‘ldoshlari Yupiter atrofida. Faqat III qonundagi doimiy markaziy jism massasiga bog‘liq.', kalit:['yo‘ldosh','faqat','boshqa']}
  ],
  maqola:[
    {sarlavha:'Tixo Brage va Kepler', xatboshilar:[
      'XVI asr oxirida daniyalik astronom Tixo Brage (1546–1601) teleskopsiz, ulkan asboblar yordamida sayyoralar holatini o‘sha davr uchun misli ko‘rilmagan aniqlikda o‘lchagan. Uning yordamchisi, nemis matematigi Iogann Kepler (1571–1630) bu ma’lumotlarni, ayniqsa Mars kuzatuvlarini yillar davomida tahlil qilgan.',
      'Kopernik sayyoralarni Quyosh atrofida aylana bo‘ylab aylanadi deb hisoblagan. Lekin Mars uchun aylana orbita Tixo o‘lchovlaridan 8 yoy daqiqasigacha farq qilgan — Kepler bu farqni e’tiborsiz qoldirmagan. Oxir-oqibat u orbita ellips ekanini aniqlagan. Birinchi ikki qonun 1609-yilda «Yangi astronomiya» (Astronomia nova), uchinchisi 1619-yilda «Olam uyg‘unligi» (Harmonices Mundi) asarida e’lon qilingan.'
    ]},
    {sarlavha:'Birinchi va ikkinchi qonun', xatboshilar:[
      'Birinchi qonun: har bir sayyora ellips bo‘ylab aylanadi, Quyosh ellipsning fokuslaridan birida joylashgan. Ellips cho‘ziqligi ekssentrisitet e bilan o‘lchanadi: e = c/a, bu yerda a — katta yarim o‘q, c — markazdan fokusgacha masofa. Quyoshgacha eng qisqa masofa (perigeliy) a(1 − e), eng uzoq (afeliy) a(1 + e).',
      'Sayyoralar orbitalari deyarli aylana: Yer uchun e ≈ 0,017, Venera uchun ≈ 0,007. Eng cho‘ziq orbita Merkuriyda (e ≈ 0,206). Kometalar orbitalari esa juda cho‘ziq bo‘lishi mumkin: Galley kometasi uchun e ≈ 0,967 — u Quyoshga Venera orbitasidan ham yaqinroq keladi, eng uzoqda esa Neptun orbitasidan ortiga ketadi.',
      'Ikkinchi qonun: Quyosh va sayyorani tutashtiruvchi radius-vektor teng vaqt oraliqlarida teng yuzalar chizadi. Demak, sayyora Quyoshga yaqin joyda tezroq, uzoqda sekinroq harakatlanadi. Yer perigeliydan (yanvar boshi) ≈ 30,3 km/s, afeliydan (iyul boshi) ≈ 29,3 km/s tezlikda o‘tadi — shuning uchun Shimoliy yarimsharda qishki yarim yil yozgidan bir necha kun qisqa.'
    ]},
    {sarlavha:'Uchinchi qonun va Nyuton', xatboshilar:[
      'Uchinchi qonun: sayyoralar aylanish davrlarining kvadratlari orbitalari katta yarim o‘qlarining kublari kabi nisbatda: T₁²/T₂² = a₁³/a₂³. Davrlarni yillarda, masofalarni astronomik birliklarda (1 a.b. ≈ 149,6 mln km) olsak, Quyosh sistemasidagi sayyoralar uchun T² ≈ a³. Masalan, Yupiter uchun a ≈ 5,2 a.b.: T ≈ √(5,2³) ≈ 11,9 yil.',
      'Kepler qonunlari kuzatuvlardan topilgan (empirik) qonunlar edi — ular «qanday» ni aytgan, «nega» ni emas. 1687-yilda Isaak Nyuton butun olam tortishish qonuni va harakat qonunlaridan Kepler qonunlarini keltirib chiqargan. Nyuton III qonunni aniqlashtirgan: T² = 4π²a³ / (G(M + m)) — shu formula yordamida sayyoralar va yulduzlar massasi aniqlanadi.',
      'Bugun Kepler qonunlari sun’iy yo‘ldoshlar orbitalarini hisoblashda, boshqa yulduzlar atrofidagi sayyoralar (ekzosayyoralar) massasi va orbitasini aniqlashda qo‘llanadi. NASA ekzosayyoralarni qidirgan teleskopga «Kepler» nomi berilgan.'
    ]},
    {sarlavha:'Samarqand astronomiyasi bilan bog‘liqlik', xatboshilar:[
      'Keplerdan qariyb 200 yil oldin Mirzo Ulug‘bek rasadxonasida (Samarqand, XV asr) sayyoralar va yulduzlar juda aniq o‘lchangan. Ulug‘bek yulduz yilining uzunligini 365 kun 6 soat 10 daqiqa 8 soniya deb aniqlagan — hozirgi qiymatdan atigi ≈ 1 daqiqa farq qiladi.',
      'Ulug‘bek jadvallari keyinchalik Yevropaga ham yetib borgan va XVII asrda Oksfordda nashr etilgan. Aniq kuzatuvlar — Tixo Brage va Ulug‘bek misolida — nazariy kashfiyotlar uchun poydevor bo‘lgan.'
    ]}
  ],
  formulalar:[
    ['r<sub>p</sub> = a(1 − e), r<sub>a</sub> = a(1 + e)','Perigeliy va afeliy masofalari'],
    ['e = c / a','Ekssentrisitet'],
    ['v<sub>p</sub> / v<sub>a</sub> = (1 + e) / (1 − e)','II qonundan kelib chiqadi'],
    ['T₁² / T₂² = a₁³ / a₂³','Keplerning III qonuni'],
    ['T² = 4π² a³ / (G M)','Nyuton ko‘rinishidagi III qonun (m ≪ M)'],
    ['M = E − e·sinE','Kepler tenglamasi: M — o‘rtacha anomaliya (vaqtga proporsional), E — ekssentrik anomaliya (sahnadagi sayyora shu bilan harakatlanadi)']
  ],
  qiziqarli:[
    'Kepler Marsning orbitasini topish ustida yillar davomida ishlagan va buni «Mars bilan urush» deb atagan.',
    'Kepler birinchi bo‘lib Merkuriyning Quyosh diski ustidan o‘tishini bashorat qilgan (1631) — hodisa u vafotidan keyin haqiqatan kuzatilgan.',
    'Galley kometasi Quyosh atrofini ≈ 75–76 yilda aylanadi; oxirgi marta 1986-yilda, keyingi safar 2061-yilda ko‘rinadi.',
    'Sahnadagi III qonun rejimida orbitalar haqiqiy nisbatda: Saturn orbitasi Merkuriynikidan ≈ 25 marta katta, davri esa ≈ 122 marta uzun.'
  ],
  lugat:[
    ['Ellips','Ikki fokusgacha masofalar yig‘indisi o‘zgarmas bo‘lgan nuqtalar to‘plami.'],
    ['Fokus','Ellipsning ichidagi ikki maxsus nuqtadan biri.'],
    ['Katta yarim o‘q (a)','Ellips eng uzun diametrining yarmi; orbitaning «o‘rtacha» radiusi.'],
    ['Ekssentrisitet (e)','Ellipsning cho‘ziqlik o‘lchovi (0 ≤ e < 1).'],
    ['Perigeliy','Orbitaning Quyoshga eng yaqin nuqtasi.'],
    ['Afeliy','Orbitaning Quyoshdan eng uzoq nuqtasi.'],
    ['Radius-vektor','Quyoshdan sayyoraga yo‘nalgan kesma.'],
    ['Astronomik birlik (a.b.)','Yerdan Quyoshgacha o‘rtacha masofa ≈ 149,6 mln km.'],
    ['Sayyoraviy aylanish davri (T)','Sayyoraning Quyosh atrofida bir marta aylanish vaqti.']
  ],
  manba:AST11 + '; ' + WIKI + ': «Kepler’s laws of planetary motion» (sayyoralar a, T jadvali, J2000; birinchi ikki qonun — 1609, uchinchisi — 1619), «Johannes Kepler», «Tycho Brahe», «Astronomia nova», «Harmonices Mundi», «Perihelion and aphelion», «Earth’s orbit», «Halley’s Comet» (e ≈ 0,967), «Ulugh Beg»; NASA Planetary Fact Sheet (ekssentrisitetlar). Sahna: sayyora harakati Kepler tenglamasi bilan; orbitaning o‘lchami sxematik, III qonun rejimida — haqiqiy nisbat.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (amaliy)', usul:'3D model, «ip va ikki mix» bilan ellips chizish, jadval bilan hisob, juftlikda ishlash',
    maqsad:{talimiy:'Keplerning uch qonunini, ellips elementlarini va T² ∝ a³ bog‘lanishini o‘rganish; qonunlarni hisoblashda qo‘llash.',
      tarbiyaviy:'Ilmiy halollik (Kepler 8 yoy daqiqasi farqni e’tiborsiz qoldirmagan), sabr va mehnatsevarlik.',
      rivojlantiruvchi:'Geometrik model bilan ishlash, empirik ma’lumotdan qonuniyat topish.'},
    natijalar:['Kepler qonunlarini ta’riflaydi','Perigeliy va afeliyni hisoblaydi','III qonun bo‘yicha davr yoki yarim o‘qni topadi','Sayyora tezligi orbitada nega o‘zgarishini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Kepler qonunlari»','Karton, 2 ta mix/igna, ip, qalam (ellips chizish uchun)','Kalkulyator','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tayyorlanadi.'],
      ['3–8','<b>Tarix.</b> Kopernik, Tixo Brage, Kepler; Mars muammosi.','Tinglaydi.'],
      ['8–16','<b>I qonun.</b> Ip va ikki mix bilan ellips chizish; MAKON da e ni o‘zgartirish.','Ellips chizadi, e ni o‘lchaydi.'],
      ['16–24','<b>II qonun.</b> «Teng yuzalar» rejimi; tezliklar nisbati.','Kuzatadi, hisoblaydi.'],
      ['24–34','<b>III qonun.</b> Jadvalda T²/a³ ni tekshirish; masalalar.','Hisoblaydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Ellips','Ikki fokusli yopiq egri chiziq.'],['Perigeliy','Eng yaqin nuqta.'],['Afeliy','Eng uzoq nuqta.']],
    savollar:[['a = 9 a.b. bo‘lsa, T = ?','27 yil'],['e = 0,5 bo‘lsa, v<sub>p</sub>/v<sub>a</sub> = ?','3'],['III qonun qaysi yili e’lon qilingan?','1619']],
    uy:'Darslikdagi mavzuni o‘qish; masalalar: (1) asteroid a = 2,5 a.b. — davri? (≈ 3,95 yil); (2) e = 0,2 bo‘lsa, afeliy perigeliydan necha marta uzoq? (1,5 marta); (3) Mars uchun T²/a³ ni jadvaldan hisoblash.',
    manba:AST11
  }
};

/* =====================================================================
   DETAL KARTALARI: MAKON_DETAL['fa_*'][kalit]
   ===================================================================== */
const Y = (nom, s2, jadval, matn, manba)=>({nom, sarlavha2:s2, jadval, matn, manba});
const HIP = WIKI + ' «List of stars in …» (Hipparcos, J2000)';
const DET = {
  fa_modda:{
    qattiq:Y('Qattiq holat', 'Moddaning agregat holati', [['Shakl','saqlanadi'],['Hajm','saqlanadi'],['Zarralar','tartibli joylashgan (ko‘pincha kristall panjara)'],['Harakat','o‘z o‘rni atrofida tebranish']], 'Qattiq jismlarni siqish va cho‘zish qiyin, chunki zarralar juda yaqin va kuchli o‘zaro ta’sirlashadi. Qizdirilganda tebranish kuchayadi va jism kengayadi; erish haroratida kristall panjara buziladi.', FIZ6),
    suyuq:Y('Suyuq holat', 'Moddaning agregat holati', [['Shakl','idishdan oladi'],['Hajm','saqlanadi'],['Zarralar','zich, lekin o‘rin almashadi'],['Xossa','oquvchanlik, deyarli siqilmaydi']], 'Suyuqlik zarralari «sakrab» qo‘shni bo‘sh joylarga o‘tadi — shuning uchun suyuqlik oqadi. Sirtdagi eng tez zarralar uchib chiqadi — bu bug‘lanish.', FIZ6),
    gaz:Y('Gaz holat', 'Moddaning agregat holati', [['Shakl','saqlanmaydi'],['Hajm','saqlanmaydi — butun idishni egallaydi'],['Zarralar orasidagi masofa','o‘lchamidan ko‘p marta katta'],['1 cm³ havoda','≈ 2,7·10¹⁹ molekula (0 °C, normal bosim)']], 'Gaz zarralari idish devorlariga urilib, bosim hosil qiladi. Harorat ortsa, zarralar tezlashadi va bosim ortadi. 20 °C da azot molekulalarining o‘rtacha kvadratik tezligi ≈ 510 m/s.', FIZ6 + '; ' + WIKI + ' «Loschmidt constant»'),
    diffuziya:Y('Diffuziya', 'Hodisa', [['Ta’rif','moddalarning o‘z-o‘zidan aralashishi'],['Sababi','zarralarning tartibsiz harakati'],['Tezligi','gaz > suyuq > qattiq'],['Harorat ortsa','tezlashadi']], 'Misollar: xonada atir hidining tarqalishi, choyda shakarning erib tarqalishi, o‘pkada kislorodning qonga o‘tishi. Sahnadagi to‘siq ikki moddani ajratib turadi — uni olib tashlang.', FIZ6)
  },
  fa_nyuton:{
    kuch:Y('Tortish kuchi F', 'Tashqi kuch', [['Birligi','nyuton (N) = kg·m/s²'],['O‘lchov asbobi','dinamometr'],['Yo‘nalishi','ip (ilgak) bo‘ylab']], 'Nyutonning II qonuniga ko‘ra, teng ta’sir etuvchi kuch jismga tezlanish beradi: a = F/m. Kuch bo‘lmasa (yoki kuchlar muvozanatda bo‘lsa), jism tezligini o‘zgartirmaydi.', FIZ7),
    ishqalanish:Y('Ishqalanish kuchi', 'Sirt kuchi', [['Formula','F<sub>ishq</sub> = μN'],['Yo‘nalishi','harakatga (harakat urinishiga) qarshi'],['Bog‘liq','sirt materiali va holati, bosish kuchi'],['Tinch holatda','tortish kuchiga teng, maksimumi ≈ μN']], 'Ishqalanish sirtlardagi notekisliklar va zarralarning o‘zaro tortishishi tufayli paydo bo‘ladi. U foydali (yurish, tormoz) va zararli (qismlar yeyilishi, energiya isrofi) bo‘lishi mumkin.', FIZ7 + '; ' + WIKI + ' «Friction»'),
    tayanch:Y('Tayanch reaksiya kuchi N', 'Sirtning jismga ta’siri', [['Yo‘nalishi','sirtga tik'],['Gorizontal sirtda','N = mg'],['Qiya tekislikda','N = mg·cosα']], 'Jism sirtni bosadi, sirt esa jismni teng kuch bilan itaradi — Nyutonning III qonuni. Bu kuchlar turli jismlarga qo‘yilgan.', FIZ7),
    ogirlik:Y('Og‘irlik kuchi mg', 'Yerning tortishishi', [['Formula','F = mg'],['g','≈ 9,8 m/s² (standart 9,806 65)'],['Yo‘nalishi','vertikal pastga']], 'Qiya tekislikda og‘irlik kuchi ikki qismga ajraladi: tekislik bo‘ylab mg·sinα (jismni pastga tortadi) va tekislikka tik mg·cosα.', FIZ7 + '; ' + WIKI + ' «Standard gravity»'),
    jism:Y('Yog‘och brusok va yuklar', 'Tajriba jismi', [['Brusok massasi','0,5 kg'],['Har bir yuk','0,5 kg'],['Massa diapazoni','0,5–5 kg']], 'Massa — jismning inertligi o‘lchovi: bir xil kuch katta massali jismga kichik tezlanish beradi.', FIZ7),
    sirt:Y('Sirtlar', 'μ — ishqalanish koeffitsiyenti (taxminiy)', [['Havo yostiqli yo‘l','≈ 0'],['Muz','≈ 0,05'],['Yog‘och','≈ 0,3'],['Rezina gilam','≈ 0,6']], 'Havo yostiqli yo‘lda kichik teshiklardan havo chiqib, jism havo qatlami ustida «suzadi» — ishqalanish deyarli yo‘qoladi. Boshqa qiymatlar sxematik, haqiqatda sirt holatiga bog‘liq.', WIKI + ' «Friction»; The Engineering ToolBox')
  },
  fa_magnit:{
    magnit:Y('Doimiy tasma magnit', 'Magnit maydon manbai', [['Qutblar','N (qizil) va S (ko‘k)'],['Maydon chiziqlari','tashqarida N → S, ichida S → N'],['Neodim magnit','qoldiq induksiya ≈ 1–1,4 Tl']], 'Magnitni qanchalik bo‘lmang, har bir bo‘lakda ikkala qutb bo‘ladi. Magnit maydonning o‘zi tok hosil qilmaydi — faqat uning g‘altak orqali oqimi o‘zgarganda.', FIZ9 + '; ' + WIKI + ' «Magnet», «Neodymium magnet»'),
    galtak:Y('G‘altak', 'Induksion tok hosil bo‘ladigan joy', [['Materiali','izolyatsiyalangan mis sim'],['O‘ramlar soni','100 / 200 / 400 (sahnada)'],['Qonun','ε = −N·ΔΦ/Δt']], 'Har bir o‘ramda bir xil EYuK hosil bo‘ladi va ular qo‘shiladi, shuning uchun o‘ramlar ko‘p bo‘lsa, EYuK katta. Induksion tok g‘altak uchlarida magnit qutblar hosil qiladi (Lens qoidasi).', FIZ9),
    galvanometr:Y('Galvanometr', 'O‘lchov asbobi', [['Vazifasi','kichik toklarni sezish'],['Shkala','nol markazda, ikki tomonga'],['Ishlash prinsipi','tokli ramka magnit maydonida buriladi']], 'Strelka og‘ish yo‘nalishi tok yo‘nalishini ko‘rsatadi: magnit kirganda bir tomonga, chiqqanda — teskari tomonga. Faradey tajribalarida shunday asbobdan foydalanilgan.', FIZ9 + '; ' + WIKI + ' «Galvanometer»')
  },
  fa_yadro:{
    proton:Y('Proton', 'Nuklon', [['Zaryad','+e (+1,6·10⁻¹⁹ C)'],['Massa','≈ 1,673·10⁻²⁷ kg'],['Kashf etilgan','1919, E. Rezerford']], 'Protonlar soni Z elementni belgilaydi: vodorodda 1, uglerodda 6, uranda 92.', FIZ11 + '; ' + WIKI + ' «Proton»'),
    neytron:Y('Neytron', 'Nuklon', [['Zaryad','0'],['Massa','≈ 1,675·10⁻²⁷ kg (protondan biroz og‘ir)'],['Kashf etilgan','1932, J. Chedvik'],['Erkin neytron','≈ 15 daqiqada (o‘rtacha) protonga yemiriladi']], 'Neytronlar kuchli yadro o‘zaro ta’siri orqali yadroni barqarorlashtiradi. Neytronlar soni har xil bo‘lgan atomlar — izotoplar.', FIZ11 + '; ' + WIKI + ' «Neutron», «Free neutron decay»'),
    qogoz:Y('Qog‘oz varag‘i', 'To‘siq', [['To‘xtatadi','α-zarralarni'],['O‘tkazadi','β va γ nurlanishni']], 'α-zarra og‘ir va zaryadi katta — yo‘lida ko‘p atomlarni ionlab, energiyasini tez yo‘qotadi. Havoda ham u bir necha santimetrdan uzoqqa bormaydi.', FIZ11),
    alyuminiy:Y('Alyuminiy plastinka', 'To‘siq (bir necha mm)', [['To‘xtatadi','α va β-zarralarni'],['O‘tkazadi','γ-nurlanishni (qisman susaytiradi)']], 'β-zarralar (elektronlar) yengil va α dan ko‘ra kam ionlaydi, shuning uchun uzoqroq boradi, lekin bir necha millimetr metallda to‘xtaydi.', FIZ11),
    qorgoshin:Y('Qo‘rg‘oshin', 'To‘siq (bir necha sm)', [['Zichligi','≈ 11,3 g/cm³'],['γ-nurlanishni','kuchli susaytiradi'],['Qo‘llanishi','rentgen xonalari, radioaktiv manbalar idishlari']], 'γ-nurlanish qatlam qalinligi bilan eksponensial susayadi — uni «to‘liq to‘xtatib» bo‘lmaydi, faqat kerakli darajada kamaytiriladi. Beton ham yaxshi himoya, lekin qalinroq qatlam kerak.', FIZ11 + '; ' + WIKI + ' «Radiation protection», «Lead»'),
    alfa:Y('α-zarra', 'Nurlanish', [['Tarkibi','2 proton + 2 neytron (⁴₂He)'],['Zaryad','+2e'],['Havoda yurishi','bir necha sm']], 'α-manbalar tashqaridan kam xavfli, lekin nafas yoki ovqat bilan organizmga tushsa juda xavfli.', FIZ11),
    beta:Y('β⁻-zarra', 'Nurlanish', [['Tarkibi','elektron'],['Zaryad','−e'],['Hosil bo‘lishi','neytron → proton + e⁻ + ν̃']], 'β-yemirilishda yadro zaryadi 1 ga ortadi, massa soni o‘zgarmaydi.', FIZ11),
    i131:Y('Yod-131', 'Izotop', [['Yarim yemirilish davri','8,02 kun'],['Yemirilishi','β⁻ va γ → ksenon-131'],['Qo‘llanishi','qalqonsimon bez kasalliklarini davolash va tekshirish']], 'Qalqonsimon bez yodni yig‘adi, shuning uchun radioaktiv yod aynan unga ta’sir qiladi. Qisqa davr tufayli bir necha haftada faolligi keskin kamayadi.', WIKI + ' «Iodine-131»; NNDC'),
    rn222:Y('Radon-222', 'Izotop', [['Yarim yemirilish davri','3,82 kun'],['Hosil bo‘lishi','radiy-226 ning α-yemirilishidan'],['Xavfi','yerto‘la va binolarda to‘planishi mumkin']], 'Radon — inert gaz, tuproq va qurilish materiallaridan ajralib chiqadi; tabiiy fon nurlanishining katta qismini beradi. Xonalarni shamollatish uning miqdorini kamaytiradi.', WIKI + ' «Radon-222»; UNSCEAR'),
    c14:Y('Uglerod-14', 'Izotop', [['Yarim yemirilish davri','5 730 yil (ba’zi manbalarda 5 700)'],['Yemirilishi','β⁻ → azot-14'],['Qo‘llanishi','radiouglerod usuli (≈ 50 ming yilgacha)']], 'C-14 atmosferada kosmik nurlar ta’sirida doim hosil bo‘ladi va o‘simliklar orqali barcha tirik organizmlarga o‘tadi. Organizm nobud bo‘lgach, uning ulushi kamaya boshlaydi.', WIKI + ' «Carbon-14», «Radiocarbon dating»')
  },
  fa_tutilish:{
    quyosh:Y('Quyosh', 'Yorug‘lik manbai', [['Diametri','≈ 1 392 000 km'],['Yergacha','≈ 150 mln km'],['Oyga nisbatan','≈ 400 marta katta va ≈ 400 marta uzoq']], 'Quyosh nuqta emas, katta shar bo‘lgani uchun jismlar orqasida ikki xil soya — to‘liq soya va yarim soya hosil bo‘ladi.', WIKI + ' «Sun», «Solar eclipse»'),
    yer:Y('Yer', 'Sayyora', [['Diametri','≈ 12 742 km'],['Oygacha','≈ 384 400 km (o‘rtacha)'],['Soyasi Oy masofasida','Oy diametridan ≈ 2,5–2,7 marta keng (taxminan)']], 'Oy tutilishida Oy Yerning to‘liq soyasi ichidan o‘tadi. Yer soyasi doim yumaloq — bu Yer sharsimonligining qadimiy dalili.', WIKI + ' «Earth», «Lunar eclipse»'),
    oy:Y('Oy', 'Yerning yo‘ldoshi', [['Diametri','≈ 3 474 km'],['Orbita og‘ishi','≈ 5,1° (ekliptikaga)'],['Sinodik oy','≈ 29,53 kun']], 'Tutilish uchun ikki shart kerak: yangi yoki to‘lin oy va Oyning tugunlardan biri yaqinida bo‘lishi.', WIKI + ' «Moon», «Orbit of the Moon»'),
    tugun:Y('Oy orbitasi tugunlari', 'Orbitalar kesishuvi', [['Nechta','2 ta: ko‘tariluvchi va tushuvchi'],['Tugunlar chizig‘i','18,6 yilda to‘liq aylanadi'],['Tutilish mavsumi','tugunlar chizig‘i Quyoshga qaraganda (≈ 173 kunda bir)']], 'Oy tugun yaqinida bo‘lsagina Quyosh, Yer va Oy bir to‘g‘ri chiziqqa tushadi.', WIKI + ' «Lunar node», «Eclipse season»'),
    umbra:Y('To‘liq soya (umbra)', 'Soya qismi', [['Quyosh','butunlay to‘silgan'],['Shakli','torayuvchi konus'],['Oy tutilishida','Oy qo‘ng‘ir-qizil tusga kiradi']], 'Yer umbrasi Oy masofasida hali ancha keng, shuning uchun to‘liq Oy tutilishi bir soatdan ortiq davom etishi mumkin (1 soat 47 daqiqagacha).', WIKI + ' «Umbra, penumbra and antumbra», «Lunar eclipse»'),
    penumbra:Y('Yarim soya (penumbra)', 'Soya qismi', [['Quyosh','qisman to‘silgan'],['Shakli','kengayuvchi konus'],['Oy tutilishida','Oy biroz xiralashadi (yarim soyali tutilish)']], 'Yarim soyali Oy tutilishini oddiy ko‘z bilan sezish qiyin — Oy faqat biroz qorayadi.', WIKI + ' «Lunar eclipse»'),
    oy_soyasi:Y('Oyning to‘liq soyasi', 'Quyosh tutilishi', [['Yerdagi izi','odatda 100–160 km kenglikdagi yo‘lak'],['Ko‘rinishi','to‘liq Quyosh tutilishi'],['Davomiyligi','bir joyda 7 daq 32 s gacha']], 'Oy soyasining uchi Yer yuzasiga zo‘rg‘a yetadi; Oy uzoqroq bo‘lganda yetmaydi — shunda halqasimon tutilish kuzatiladi.', WIKI + ' «Solar eclipse»'),
    oy_penumbra:Y('Oyning yarim soyasi', 'Quyosh tutilishi', [['Yerdagi izi','minglab km li keng hudud'],['Ko‘rinishi','xususiy (qisman) Quyosh tutilishi']], 'Xususiy tutilish paytida ham Quyoshga filtrsiz qarash xavfli.', WIKI + ' «Solar eclipse»')
  },
  fa_quyosh:{
    yadro:Y('Quyosh yadrosi', 'Energiya manbai', [['Joyi','0 – 0,2…0,25 R'],['Harorat','≈ 15 mln °C (15,7 mln K)'],['Zichligi','≈ 150 g/cm³ (taxminan)'],['Jarayon','vodorodning geliyga aylanishi']], 'Har soniyada ≈ 600 mln tonna vodorod geliyga aylanadi, ≈ 4 mln tonna massa energiyaga o‘tadi (E = mc²).', 'NASA «Sun: Facts»; ' + WIKI + ' «Solar core»'),
    nurlanish:Y('Nurlanish zonasi', 'Energiya uzatish', [['Joyi','0,25 – 0,7 R'],['Harorat','≈ 7 mln → 2 mln °C'],['Energiya o‘tishi','≈ 10 ming – 170 ming yil (baholar)']], 'Fotonlar zich plazmada qisqa masofa uchib, yutiladi va boshqa yo‘nalishda qayta chiqariladi — «tasodifiy yo‘l».', 'NASA «Sun: Facts»; ' + WIKI + ' «Radiative zone»'),
    konveksiya:Y('Konveksiya zonasi', 'Energiya uzatish', [['Joyi','0,7 – 1 R'],['Harorat','< 2 mln °C'],['Belgisi','fotosferadagi granulyatsiya']], 'Issiq plazma ko‘tariladi, sirtda soviydi va yana cho‘kadi — qaynayotgan suv kabi.', WIKI + ' «Convection zone»'),
    fotosfera:Y('Fotosfera', 'Ko‘rinadigan sirt', [['Harorat','≈ 5 500 °C (5 772 K)'],['Qalinligi','yuzlab km'],['Granula o‘lchami','≈ 1 000 km']], 'Quyosh diski chetida qorong‘iroq ko‘rinadi (chekka qorayishi) — u yerda fotosferaning yuqori, sovuqroq qatlamlarini ko‘ramiz.', 'NASA «Sun: Facts»; ' + WIKI + ' «Photosphere»'),
    xromosfera:Y('Xromosfera', 'Quyosh atmosferasi', [['Qalinligi','≈ 2 000 km'],['Harorat','≈ 4 000 → 20 000 K'],['Qachon ko‘rinadi','to‘liq tutilishda qizg‘ish halqa']], 'Nomi yunoncha «rang sferasi» — tutilishda uning qizg‘ish-pushti rangi ko‘rinadi.', WIKI + ' «Chromosphere»'),
    toj:Y('Toj (korona)', 'Tashqi atmosfera', [['Harorat','1–2 mln °C (ba’zi joylarda undan yuqori)'],['Zichligi','juda siyrak'],['Ko‘rinishi','to‘liq Quyosh tutilishida']], 'Toj nega fotosferadan yuzlab marta issiq ekani — astrofizikaning hal qilinmagan muammolaridan. Quyosh shamoli tojdan boshlanadi.', 'NASA «Sun: Facts»; ' + WIKI + ' «Stellar corona»'),
    dog:Y('Quyosh dog‘lari', 'Faollik belgisi', [['Harorat','≈ 3 000–4 500 K (atrofidan sovuqroq)'],['Sabab','kuchli magnit maydon'],['Sikl','≈ 11 yil']], 'Dog‘lar juftlashib, qarama-qarshi magnit qutbli guruhlar hosil qiladi. Katta dog‘lar Yerdan ham kattaroq bo‘lishi mumkin.', WIKI + ' «Sunspot», «Solar cycle»'),
    protuberanes:Y('Protuberans', 'Plazma otilishi', [['Joyi','xromosfera va toj'],['Shakli','yoy, halqa, favvora'],['Ushlab turadi','magnit maydon chiziqlari']], 'Protuberanslar kunlab, ba’zan haftalab saqlanishi mumkin; ba’zilari otilib, toj massasi chiqarilishiga aylanadi.', WIKI + ' «Solar prominence»')
  },
  fa_galaktika:{
    markaz:Y('Galaktika markazi · Sgr A*', 'O‘ta massiv qora tuynuk', [['Massasi','≈ 4,1–4,3 mln Quyosh massasi'],['Bizdan','≈ 26 700 y.y.'],['Nobel mukofoti','2020 — R. Gensel, A. Gez'],['Tasviri','EHT, 2022-yil 12-may']], 'Markaz Qavs (Sagittarius) turkumi yo‘nalishida, lekin chang bulutlari uni ko‘zga ko‘rinadigan nurda to‘sadi — infraqizil va radio to‘lqinlarda o‘rganiladi.', WIKI + ' «Sagittarius A*», «Galactic Center»'),
    quyosh:Y('Quyosh sistemasi', 'Bizning manzilimiz', [['Markazdan','≈ 26 700 y.y. (26–27 ming)'],['Joyi','Orion tarmog‘i'],['Tezligi','≈ 220–230 km/s'],['Galaktik yil','≈ 225–250 mln yil']], 'Quyosh disk tekisligiga yaqin joylashgan va markaz atrofida aylanish bilan birga diskka nisbatan sekin yuqoriga-pastga tebranadi.', WIKI + ' «Milky Way», «Galactic year»; GRAVITY (2019)'),
    orion:Y('Orion tarmog‘i', 'Kichik yeng', [['Joyi','Qavs va Persey yenglari orasida'],['Uzunligi','≈ 10 000 y.y. (taxminan)'],['Nomi','Orion turkumidagi yorqin obyektlar shu tarmoqda']], 'Ilgari Orion tarmog‘i ikki yeng orasidagi kichik «ko‘prik» deb hisoblangan; yangi tadqiqotlar uni ancha katta tuzilma deb ko‘rsatadi (muhokama davom etmoqda).', WIKI + ' «Orion Arm»'),
    perseus:Y('Persey yengi', 'Yirik spiral yeng', [['Joyi','Quyoshdan tashqarida'],['Masofa','≈ 6 000–7 000 y.y. (taxminan)']], 'Persey va Qalqon–Sentavr — bar uchlaridan boshlanadigan ikki yirik yeng deb hisoblanadi.', WIKI + ' «Perseus Arm»'),
    sagittarius:Y('Qavs (Sagittarius) yengi', 'Spiral yeng', [['Joyi','Quyoshdan markaz tomonda'],['Belgisi','yulduz tug‘iladigan tumanliklar ko‘p']], 'Yozgi osmondagi Somon yo‘lining eng yorqin qismlari shu yo‘nalishda.', WIKI + ' «Sagittarius Arm»'),
    scutum:Y('Qalqon–Sentavr yengi', 'Yirik spiral yeng', [['Boshlanishi','bar uchidan'],['Joyi','Galaktikaning ichki qismi']], 'Bu yeng Galaktika markazi atrofidagi yulduzlar bilan eng boy yenglardan biri.', WIKI + ' «Scutum–Centaurus Arm»'),
    norma:Y('Go‘niya (Norma) yengi', 'Spiral yeng', [['Joyi','ichki qism, bar yaqinida'],['Davomi','tashqi qismda «Tashqi yeng» deb ataladi (taxminan)']], 'Ichki yenglarni kuzatish qiyin: ular bilan Quyosh orasida ko‘p chang bor.', WIKI + ' «Norma Arm»')
  },
  fa_kepler:{
    perigeliy:Y('Perigeliy', 'Orbitaning Quyoshga eng yaqin nuqtasi', [['Masofa','a(1 − e)'],['Tezlik','eng katta'],['Yer uchun','≈ 147,1 mln km, yanvar boshi']], 'Keplerning II qonuniga ko‘ra, sayyora perigeliydan eng katta tezlik bilan o‘tadi.', WIKI + ' «Perihelion and aphelion»'),
    afeliy:Y('Afeliy', 'Orbitaning Quyoshdan eng uzoq nuqtasi', [['Masofa','a(1 + e)'],['Tezlik','eng kichik'],['Yer uchun','≈ 152,1 mln km, iyul boshi']], 'Yer afeliyda bo‘lganda Shimoliy yarimsharda yoz — fasllar masofaga emas, o‘q og‘ishiga bog‘liq.', WIKI + ' «Perihelion and aphelion»'),
    fokus:Y('Ellipsning ikkinchi fokusi', 'Geometrik nuqta', [['Markazdan masofa','c = a·e'],['Fokuslar orasi','2c'],['U yerda','hech qanday jism yo‘q']], 'Ellipsning istalgan nuqtasidan ikki fokusgacha masofalar yig‘indisi o‘zgarmas va 2a ga teng.', 'Geometriya; ' + WIKI + ' «Ellipse»'),
    quyosh:Y('Quyosh', 'Ellipsning fokusida', [['Massasi','≈ 2·10³⁰ kg'],['Rolli','markaziy tortuvchi jism']], 'Aniqroq aytganda, Quyosh va sayyora umumiy massa markazi atrofida aylanadi; Quyosh juda og‘ir bo‘lgani uchun bu markaz Quyosh yaqinida.', WIKI + ' «Kepler’s laws of planetary motion»'),
    sayyora:Y('Sayyora', 'Orbitada harakat', [['Tezligi','orbitada o‘zgaradi'],['Hisob','Kepler tenglamasi M = E − e·sinE']], 'Yashil strelka — tezlik vektori, sariq chiziq — radius-vektor. Teng vaqtlarda radius-vektor teng yuzalar chizadi.', WIKI + ' «Kepler’s equation»'),
    merkuriy:Y('Merkuriy', 'Sayyora', [['a','0,387 a.b.'],['T','87,97 kun'],['e','0,206']], 'Quyoshga eng yaqin va orbitasi eng cho‘ziq sayyora.', WIKI + ' «Kepler’s laws…» jadvali; NASA Planetary Fact Sheet'),
    venera:Y('Venera', 'Sayyora', [['a','0,723 a.b.'],['T','224,7 kun'],['e','0,007']], 'Orbitasi eng aylanaga yaqin sayyora.', WIKI + ' «Kepler’s laws…» jadvali'),
    yer:Y('Yer', 'Sayyora', [['a','1,000 a.b. (≈ 149,6 mln km)'],['T','365,26 kun'],['e','0,0167']], 'Astronomik birlik va yil — III qonun hisobida birlik sifatida olinadi, shuning uchun Yerda T²/a³ = 1.', WIKI + ' «Earth’s orbit»'),
    mars:Y('Mars', 'Sayyora', [['a','1,524 a.b.'],['T','686,98 kun (1,88 yil)'],['e','0,093']], 'Aynan Mars kuzatuvlari Keplerga orbita ellips ekanini ko‘rsatgan.', WIKI + ' «Kepler’s laws…», «Astronomia nova»'),
    yupiter:Y('Yupiter', 'Sayyora', [['a','5,203 a.b.'],['T','4 332,8 kun (11,86 yil)'],['T²/a³','≈ 1,00']], 'Eng katta sayyora; uning yo‘ldoshlari ham Yupiter atrofida Kepler qonunlari bo‘yicha aylanadi.', WIKI + ' «Kepler’s laws…» jadvali'),
    saturn:Y('Saturn', 'Sayyora', [['a','9,537 a.b.'],['T','10 775,6 kun (29,50 yil)'],['e','0,054']], 'Oddiy ko‘z bilan ko‘rinadigan eng uzoq sayyora; Kepler davrida ma’lum bo‘lgan oxirgi sayyora.', WIKI + ' «Kepler’s laws…» jadvali')
  },
  fa_yulduz:{}
};
/* yulduz kartalari: sahna faylidagi koordinatalar bilan bir xil manba */
[
  ['dubhe','Dubhe (α Katta Ayiq)','Katta Ayiq','1,79','124','K0 III','«Ko‘rsatkich» yulduz: Merak bilan birga Qutb yulduzini ko‘rsatadi. To‘q sariq gigant.'],
  ['merak','Merak (β Katta Ayiq)','Katta Ayiq','2,37','79','A1 V','Merak → Dubhe chizig‘ini ≈ 5 marta davom ettirsangiz, Qutb yulduziga yetasiz.'],
  ['phecda','Fekda (γ Katta Ayiq)','Katta Ayiq','2,44','84','A0 V','Cho‘mich tubining pastki burchagi.'],
  ['megrez','Megrets (δ Katta Ayiq)','Katta Ayiq','3,31','81','A3 V','Cho‘michning eng xira yulduzi; dasta shu yerdan boshlanadi.'],
  ['alioth','Aliot (ε Katta Ayiq)','Katta Ayiq','1,77','81','A0p','Katta Ayiqdagi eng yorqin yulduz.'],
  ['mizar','Mitsar (ζ Katta Ayiq)','Katta Ayiq','2,23','83','A2 V','Yonida xira Alkor bor — qadimda ko‘rish o‘tkirligini sinash uchun ishlatilgan. Teleskopda Mitsar qo‘shaloq ko‘rinadi.'],
  ['alkaid','Alkaid (η Katta Ayiq)','Katta Ayiq','1,86','101','B3 V','Cho‘mich dastasining uchi; boshqa nomi — Benetnash. Issiq, ko‘kish-oq yulduz.'],
  ['polaris','Qutb yulduzi (α Kichik Ayiq)','Kichik Ayiq','1,97','≈ 430','F7 Ib','Dunyoning shimoliy qutbidan 1° dan kam uzoqlikda. Balandligi joy kengligiga teng: Toshkentda ≈ 41°. Xalq nomi — Temirqoziq. Aslida ko‘p yulduzli tizim.'],
  ['kochab','Koxab (β Kichik Ayiq)','Kichik Ayiq','2,07','126','K4 III','Taxminan mil. av. 1500-yildan milodiy 500-yilgacha Ferkad bilan birga qutbga eng yaqin yorqin yulduzlar bo‘lgan (presessiya).'],
  ['pherkad','Ferkad (γ Kichik Ayiq)','Kichik Ayiq','3,04','≈ 480','A3 II–III','Koxab bilan birga «qutb qo‘riqchilari» deb ataladi.'],
  ['yildun','Yildun (δ Kichik Ayiq)','Kichik Ayiq','4,35','183','A1 V','Nomi turkiycha «yulduz» so‘zidan kelib chiqqan deb hisoblanadi.'],
  ['eps_umi','ε Kichik Ayiq','Kichik Ayiq','4,21','≈ 350','G5 III','Kichik cho‘mich dastasidagi xira yulduz.'],
  ['zet_umi','ζ Kichik Ayiq','Kichik Ayiq','4,29','≈ 380','A3 V','Kichik cho‘mich tubining burchagi.'],
  ['eta_umi','η Kichik Ayiq','Kichik Ayiq','4,95','97','F5 V','Kichik Ayiqning eng xira yulduzlaridan biri — shahar osmonida ko‘rinmaydi.'],
  ['schedar','Shedar (α Kassiopeya)','Kassiopeya','2,24','228','K0 II–III','«W» ning ikkinchi uchi; to‘q sariq gigant.'],
  ['caph','Kaf (β Kassiopeya)','Kassiopeya','2,28','54','F2 III–IV','«W» ning bir uchi; Quyoshga nisbatan yaqin yulduz.'],
  ['gam_cas','γ Kassiopeya','Kassiopeya','2,47 (o‘zgaruvchan)','≈ 610','B0 IV','«W» markazidagi issiq, tez aylanuvchi yulduz; yorqinligi vaqti-vaqti bilan o‘zgaradi.'],
  ['ruchbah','Rukbax (δ Kassiopeya)','Kassiopeya','2,68','99','A5 V','Tutiluvchi qo‘shaloq yulduz.'],
  ['segin','Segin (ε Kassiopeya)','Kassiopeya','3,35','≈ 440','B2','«W» ning ikkinchi uchi.'],
  ['betelgeuse','Betelgeyze (α Orion)','Orion','0,42 (o‘zgaruvchan)','≈ 640','M2 Ib','Qizil o‘ta gigant, sirti ≈ 3 500–3 600 K. 2019–2020-yillarda «Buyuk xiralashish» kuzatilgan. Kelajakda o‘ta yangi yulduz bo‘lib portlashi kutiladi.'],
  ['rigel','Rigel (β Orion)','Orion','0,18','≈ 770','B8 Ia','Ko‘k-oq o‘ta gigant; Quyoshdan o‘n minglab marta yorqinroq nur sochadi.'],
  ['bellatrix','Bellatriks (γ Orion)','Orion','1,64','243','B2 III','Orionning «yelkasi».'],
  ['mintaka','Mintaka (δ Orion)','Orion','2,20','≈ 920','B0 III + O9 V','Kamardagi uch yulduzning biri; deyarli osmon ekvatorida.'],
  ['alnilam','Alnilam (ε Orion)','Orion','1,69','≈ 1 340','B0 Ia','Kamarning o‘rtasidagi o‘ta gigant (masofa taxminiy).'],
  ['alnitak','Alnitak (ζ Orion)','Orion','1,88','≈ 820','O9.7 Ib','Kamarning uchi; yonida «Ot boshi» tumanligi joylashgan.'],
  ['saiph','Sayf (κ Orion)','Orion','2,07','≈ 720','B0.5 Ia','Orionning «tizzasi».'],
  ['meissa','Meyssa (λ Orion)','Orion','3,47','≈ 1 060','O8 III','Orionning «boshi».'],
  ['vega','Vega (α Lira)','Yozgi uchburchak (Lira)','0,03','25','A0 V','Yozgi uchburchakning eng yorqin yulduzi; taxminan 12–13 ming yildan keyin qutb yulduzi vazifasini bajaradi.'],
  ['deneb','Deneb (α Oqqush)','Yozgi uchburchak (Oqqush)','1,25','≈ 1 500–2 600 (taxminiy)','A2 Ia','Juda uzoq, lekin juda yorqin o‘ta gigant. Masofa baholari sezilarli farq qiladi.'],
  ['altair','Altair (α Burgut)','Yozgi uchburchak (Burgut)','0,77','17','A7 V','Juda tez aylanadi — ekvatori cho‘zilgan.'],
  ['sirius','Sirius (α Katta It)','Katta It','−1,46','8,6','A1 V','Tungi osmondagi eng yorqin yulduz. Uning xira hamrohi — oq mitti Sirius B.']
].forEach(([k, nom, tk, m, mas, sp, matn])=>{ DET.fa_yulduz[k] = Y(nom, tk + ' turkumi', [['Ko‘rinma kattalik', m + '<sup>m</sup>'], ['Masofa', mas + ' y.y.'], ['Spektral sinf', sp]], matn, HIP); });

const qosh = ()=>{ const DT = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DET).forEach(k=>{ DT[k] = Object.assign(DT[k] || {}, DET[k]); }); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
})();
