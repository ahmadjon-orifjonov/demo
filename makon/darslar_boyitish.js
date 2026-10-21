/* MAKON — mavjud 7 darsning mazmunini kengaytirish (maqola, formulalar, qiziqarli faktlar, lug‘at, qo‘shimcha jadval va test).
   darslar.js va darslar_harbiy.js dan KEYIN yuklanadi.
   Harbiy darslar manbasi: manba/harbiy_mazmun.md ([DARSLIK10] 2017, [DARSLIK11] 2018); [ZID]/[TEKSHIRILMAGAN] joylar matnda ochiq aytilgan.
   Granata darsi — faqat tanishuv va xavfsizlik darajasida. */
(function(){
const D = window.MAKON_DARS;
if(!D) return;
const qosh = (id, o)=>{ const d = D[id]; if(!d) return; Object.keys(o).forEach(k=>{ if(k==='test') d.test = (d.test||[]).concat(o.test); else if(k==='kor') d.kor = Object.assign(d.kor||{}, o.kor); else if(k==='bolimlar') d.bolimlar = (d.bolimlar||[]).concat(o.bolimlar); else d[k] = o[k]; }); };

/* ================= KIMYO: MOLEKULALARNING FAZOVIY TUZILISHI ================= */
qosh('kimyo-molekula', {
  kor:{matn:'Darslikdagi rasm molekulani qog‘ozda tekis ko‘rsatadi, aslida esa atomlar fazoda aniq burchak ostida joylashadi. Molekulaning shakli uning qutbliligini, qaynash haroratini, suvda erishini va boshqa moddalar bilan qanday reaksiyaga kirishini belgilaydi. Bu darsda suv, karbonat angidrid, metan, ammiak va osh tuzining 3D tuzilishini aylantirib ko‘rasiz. Oxirida molyar massani hisoblash va shaklni elektron juftlar soni orqali oldindan aytishni o‘rganasiz.'},
  maqola:[
    {sarlavha:'Nima uchun molekula shakli muhim?', xatboshilar:[
      'Kimyoda formula moddaning tarkibini aytadi, lekin uning xossalarini to‘liq tushuntirmaydi. Masalan, H₂O va CO₂ ikkalasi ham uch atomli molekula, ammo suv xona haroratida suyuqlik, karbonat angidrid esa gaz. Farqning asosiy sababi — molekulalarning fazodagi shakli va shunga bog‘liq qutbliligi. Suv molekulasi burchakli bo‘lgani uchun uning bir tomoni manfiy, ikkinchi tomoni musbat zaryadlanadi, CO₂ esa chiziqli va simmetrik bo‘lgani uchun qutbsiz.',
      'Molekulaning shakli tirik tabiatda ham hal qiluvchi ahamiyatga ega. Fermentlar, dori moddalari va hid sezuvchi retseptorlar molekulalarni xuddi qulf va kalit kabi shakliga qarab «taniydi». Shuning uchun farmatsevtlar yangi dori yaratishda birinchi navbatda molekulaning fazoviy modelini o‘rganadi. Kimyogar, shifokor, agronom yoki muhandis bo‘lishni istagan o‘quvchi uchun fazoviy tasavvur — asosiy ko‘nikmalardan biri.',
      'Qog‘ozdagi rasmda burchaklar ko‘pincha 90° yoki 180° qilib chiziladi, chunki tekislikda boshqacha chizish qiyin. 3D modelni aylantirganda esa metandagi to‘rtta vodorod atomi kvadrat burchaklarida emas, tetraedr uchlarida turishini ko‘rasiz. Shu dars davomida har bir molekulani kamida ikki tomondan ko‘rib chiqing va burchakni darslikdagi qiymat bilan solishtiring.'
    ]},
    {sarlavha:'Asosiy tushunchalar: atom, bog‘, elektron juftlar', xatboshilar:[
      'Molekula — moddaning kimyoviy xossalarini saqlovchi eng kichik zarracha bo‘lib, u atomlarning kimyoviy bog‘lar orqali birikishidan hosil bo‘ladi. Kovalent bog‘ ikki atom o‘rtasida umumiy elektron juftining hosil bo‘lishi bilan yuzaga keladi. Agar atomlarning elektromanfiyligi bir xil yoki juda yaqin bo‘lsa, bog‘ qutbsiz, farq sezilarli bo‘lsa — qutbli kovalent bo‘ladi. Farq juda katta bo‘lganda bir atom elektronni butunlay boshqasiga beradi va ionli bog‘ hosil bo‘ladi.',
      'Markaziy atom atrofidagi elektron juftlar ikki xil bo‘ladi: bog‘lovchi juftlar va bo‘linmagan (erkin) juftlar. Bo‘linmagan juft boshqa atom bilan bo‘lishilmaydi, lekin u ham fazoda joy egallaydi va bog‘larni itaradi. Kislorod atomida suv molekulasida ikkita, ammiakdagi azot atomida bitta bo‘linmagan juft bor, metandagi uglerodda esa bunday juft yo‘q. Aynan shu farq uchala molekulaning burchaklarini 109,5°, 107° va 104,5° ga ajratadi.',
      'Elektromanfiylik — atomning bog‘dagi umumiy elektronlarni o‘ziga tortish qobiliyati. Poling shkalasi bo‘yicha kislorodniki 3,44, azotniki 3,04, uglerodniki 2,55, vodorodniki 2,20 ga teng. Natriy (0,93) va xlor (3,16) orasidagi farq katta bo‘lgani uchun osh tuzida kovalent emas, ionli bog‘ vujudga keladi. NaCl alohida molekulalardan emas, Na⁺ va Cl⁻ ionlari navbatlashib joylashgan kristall panjaradan iborat.'
    ]},
    {sarlavha:'Shaklni qanday oldindan aytish mumkin: bosqichma-bosqich', xatboshilar:[
      'Molekula shaklini aniqlashda elektron juftlarning itarilish nazariyasi qo‘llaniladi. Uning g‘oyasi oddiy: markaziy atom atrofidagi elektron juftlar bir-birini itaradi va fazoda bir-biridan iloji boricha uzoq joylashadi. Birinchi bosqichda markaziy atom aniqlanadi — suvda kislorod, ammiakda azot, metan va CO₂ da uglerod. Ikkinchi bosqichda bog‘lovchi va bo‘linmagan juftlar soni sanaladi, qo‘sh bog‘ esa bitta yo‘nalish sifatida hisoblanadi.',
      'Uchinchi bosqichda yo‘nalishlar soniga qarab asosiy geometriya tanlanadi. Ikki yo‘nalish bo‘lsa, ular bir chiziqda qarama-qarshi turadi (180°), to‘rt yo‘nalish bo‘lsa — tetraedr uchlariga qaraydi (109,5°). CO₂ da uglerod ikki kislorod bilan qo‘sh bog‘ hosil qiladi va bo‘linmagan jufti yo‘q, shuning uchun molekula chiziqli. Metanda to‘rtta bog‘lovchi juft bor va molekula to‘g‘ri tetraedr shaklida.',
      'To‘rtinchi bosqichda bo‘linmagan juftlar hisobga olinadi. Ular bog‘lovchi juftlarga qaraganda kuchliroq itaradi, shuning uchun bog‘lar orasidagi burchak kichrayadi. Ammiakda to‘rt yo‘nalishdan bittasi erkin juft — atomlar uchburchakli piramida hosil qiladi va burchak 107° ga tushadi. Suvda ikkita erkin juft bor, shu sababli burchak yanada kichik — 104,5°, molekula esa burchakli shaklda bo‘ladi.'
    ]},
    {sarlavha:'Kashf etilish tarixi', xatboshilar:[
      'Atomlar va molekulalar haqidagi zamonaviy tasavvurlar XIX asr boshida shakllana boshladi. Jon Dalton 1800-yillar boshida atom nazariyasini ilgari surdi, Amedeo Avogadro esa 1811-yilda teng hajmdagi gazlarda bir xil sondagi molekula bo‘ladi, degan gipotezani aytdi. 1861-yilda Aleksandr Butlerov kimyoviy tuzilish nazariyasini e’lon qildi: moddaning xossasi nafaqat tarkibiga, balki atomlarning birikish tartibiga ham bog‘liq.',
      '1874-yilda Yakob Vant-Goff va Jozef Le Bel bir-biridan mustaqil ravishda uglerod atomining to‘rt bog‘i tetraedr uchlariga yo‘nalganini taklif qildi. 1916-yilda Gilbert Lyuis kovalent bog‘ni umumiy elektron jufti sifatida tushuntirdi. Laynus Poling kimyoviy bog‘ tabiatini o‘rganish uchun 1954-yilda Nobel mukofotiga sazovor bo‘ldi. 1957-yilda Ronald Gillespi va Ronald Nayholm elektron juftlarning itarilishi asosidagi shakl nazariyasini ishlab chiqdi, u bugun maktab va universitetlarda o‘qitiladi.',
      'Bugun molekula tuzilishi rentgen-strukturaviy tahlil, spektroskopiya va kompyuterda kvant-kimyoviy hisoblash yordamida juda aniq o‘lchanadi. Darslikdagi 104,5°, 107° va 109,5° qiymatlari ana shu tajribalar natijasidir. Siz 3D modelda ko‘rayotgan burchaklar ham shu ma’lumotlarga asoslangan.'
    ]},
    {sarlavha:'Hayotda va kasbda qo‘llanishi', xatboshilar:[
      'Suv molekulasining burchakli va qutbli bo‘lishi hayot uchun juda muhim. Qutbli suv molekulalari o‘zaro vodorod bog‘lar hosil qiladi, shu tufayli suv nisbatan yuqori haroratda (100 °C) qaynaydi va ko‘plab tuzlarni eritadi. Muz esa suyuq suvdan yengil, chunki muz kristallida molekulalar vodorod bog‘lar orqali «ochiq» panjara hosil qiladi. Shuning uchun qishda ko‘l tubigacha muzlamaydi va suv jonivorlari tirik qoladi.',
      'Metan — tabiiy gazning asosiy tarkibiy qismi, u uylarimizdagi gaz plitalari va isitish qozonlarida yonadi. Ammiak o‘g‘itlar ishlab chiqarishda asosiy xomashyo hisoblanadi; uni havodagi azot va vodoroddan olishning Gaber–Bosh usuli XX asrda qishloq xo‘jaligini tubdan o‘zgartirdi. O‘zbekistonda ham azotli o‘g‘it ishlab chiqaruvchi kimyo korxonalari faoliyat yuritadi va ularda texnolog-kimyogar kasbi talab qilinadi.',
      'Karbonat angidrid o‘simliklar uchun fotosintez xomashyosi bo‘lib, gazlangan ichimliklarda va o‘t o‘chirgichlarda ishlatiladi. Uning chiziqli molekulasi infraqizil nurlanishni yutadi, shuning uchun atmosferadagi CO₂ miqdorining ortishi issiqxona effektini kuchaytiradi. Osh tuzi esa oziq-ovqatdan tashqari xlor va natriy gidroksid olish uchun sanoat xomashyosi hisoblanadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Birinchi keng tarqalgan xato — suv molekulasini chiziqli deb o‘ylash. Ikki vodorod atomi ikki tomonda turgani uchun formula simmetrik ko‘rinadi, lekin kislorodning ikki bo‘linmagan jufti molekulani «bukadi». Eslab qolish uchun: «CO₂ — to‘g‘ri tayoq, H₂O — bukilgan tirsak». Agar suv chiziqli bo‘lganida, u qutbsiz bo‘lar va tuzlarni bunday yaxshi eritmas edi.',
      'Ikkinchi xato — metanni tekis kvadrat deb chizish. Kvadratda burchak 90° bo‘lar edi, fazoda esa to‘rt juft bir-biridan uzoqroq, 109,5° burchak bilan joylasha oladi. Uchinchi xato — NaCl ni «bitta molekula» deb hisoblash: osh tuzi ionli kristall, formulasi esa ionlar nisbatini (1:1) ko‘rsatadi, xolos.',
      'Burchaklarni tartib bilan eslab qolish qulay: erkin juft qancha ko‘p bo‘lsa, burchak shuncha kichik. Metan 0 juft — 109,5°, ammiak 1 juft — 107°, suv 2 juft — 104,5°. Molyar massani hisoblashda esa indeksni unutmang: H₂O da vodorod atomi ikkita, shuning uchun M = 2·1 + 16 = 18 g/mol, 17 emas.'
    ]}
  ],
  formulalar:[
    ['M(AₓBᵧ) = x·Aᵣ(A) + y·Aᵣ(B)','Molyar massa (g/mol) nisbiy atom massalari yig‘indisiga son jihatdan teng. Misol: M(H₂O) = 2·1 + 16 = 18 g/mol; M(CO₂) = 12 + 2·16 = 44 g/mol.'],
    ['n = m / M','Modda miqdori (mol) = massa (g) / molyar massa. Misol: 36 g suv — 36 / 18 = 2 mol.'],
    ['N = n · N_A','Zarrachalar soni; N_A = 6,022·10²³ mol⁻¹ (Avogadro doimiysi). Misol: 2 mol suvda 2 · 6,022·10²³ ≈ 1,2·10²⁴ molekula.'],
    ['ω(E) = x·Aᵣ(E) / M · 100%','Elementning massa ulushi. Misol: suvdagi kislorod — 16 / 18 · 100% ≈ 88,9%.'],
    ['V = n · V_m','Gaz hajmi; normal sharoitda V_m = 22,4 l/mol. Misol: 1 mol CH₄ normal sharoitda 22,4 l egallaydi.'],
    ['M(NaCl) = 23 + 35,5 = 58,5 g/mol','Ionli moddada «formula birligi» massasi. 117 g osh tuzi — 2 mol.']
  ],
  qiziqarli:[
    'Suvning zichligi eng katta qiymatga taxminan 4 °C da erishadi; muz suvdan yengil bo‘lgani uchun suv havzalari yuzadan muzlaydi (Britannica, «Water»).',
    '2019-yildan boshlab Avogadro doimiysi aniq qiymat sifatida qabul qilingan: 6,02214076·10²³ mol⁻¹ (SI birliklar tizimining yangi ta’rifi, BIPM).',
    'Fritz Gaber ammiakni azot va vodoroddan sintez qilgani uchun 1918-yilgi kimyo bo‘yicha Nobel mukofotini olgan (nobelprize.org).',
    'Laynus Poling 1954-yilda kimyoviy bog‘ tabiati bo‘yicha tadqiqotlari uchun Nobel mukofotini olgan; u elektromanfiylik shkalasini ham taklif qilgan (nobelprize.org).',
    'Osh tuzi kristalida har bir Na⁺ ioni oltita Cl⁻ ioni bilan o‘ralgan va aksincha; tuz 801 °C da suyuqlanadi (Britannica, «Sodium chloride»).'
  ],
  lugat:[
    ['Molekula','Moddaning kimyoviy xossalarini saqlovchi, atomlardan tashkil topgan eng kichik zarracha.'],
    ['Kovalent bog‘','Atomlar orasida umumiy elektron juftlari hisobiga hosil bo‘ladigan bog‘.'],
    ['Ionli bog‘','Qarama-qarshi zaryadlangan ionlar (masalan, Na⁺ va Cl⁻) orasidagi elektrostatik tortishish.'],
    ['Elektromanfiylik','Atomning bog‘dagi elektronlarni o‘ziga tortish qobiliyati (Poling shkalasi).'],
    ['Bo‘linmagan elektron jufti','Markaziy atomga tegishli, bog‘ hosil qilishda qatnashmaydigan elektron jufti; bog‘larni itaradi.'],
    ['Bog‘ burchagi','Markaziy atomdan chiqqan ikki bog‘ yo‘nalishi orasidagi burchak.'],
    ['Tetraedr','To‘rtta teng uchburchak yoqli jism; metan shu shaklda, burchak 109,5°.'],
    ['Qutbli molekula','Zaryadlar markazi mos kelmaydigan, bir tomoni musbat, boshqasi manfiy bo‘lgan molekula (H₂O, NH₃).'],
    ['Kristall panjara','Zarrachalarning fazoda qonuniy, takrorlanuvchi tartibda joylashishi.'],
    ['Molyar massa','1 mol moddaning massasi, g/mol da o‘lchanadi.'],
    ['Mol','6,022·10²³ ta zarracha saqlovchi modda miqdori.'],
    ['Vodorod bog‘','Qutbli molekulalar orasidagi kuchsiz tortishish; suvning yuqori qaynash haroratiga sabab.']
  ],
  bolimlar:[
    {sarlavha:'Beshta modda: molyar massa va tuzilish', jadval:[
      ['H₂O · suv','M = 18 g/mol · 2 bog‘lovchi + 2 erkin juft · qutbli'],
      ['CO₂ · karbonat angidrid','M = 44 g/mol · 2 qo‘sh bog‘, erkin juft yo‘q · qutbsiz'],
      ['CH₄ · metan','M = 16 g/mol · 4 bog‘lovchi juft · qutbsiz'],
      ['NH₃ · ammiak','M = 17 g/mol · 3 bog‘lovchi + 1 erkin juft · qutbli'],
      ['NaCl · osh tuzi','M = 58,5 g/mol · ionli kristall, har ion atrofida 6 qarama-qarshi ion'],
      ['Burchak qoidasi','erkin juft ko‘paysa, burchak kichrayadi: 109,5° → 107° → 104,5°']
    ]},
    {sarlavha:'Elektromanfiylik (Poling shkalasi)', jadval:[
      ['Na · natriy','0,93'],['H · vodorod','2,20'],['C · uglerod','2,55'],['N · azot','3,04'],['Cl · xlor','3,16'],['O · kislorod','3,44']
    ], matn:'Farq qancha katta bo‘lsa, bog‘ shuncha qutbli. Na va Cl farqi (2,23) katta — ionli bog‘; C va H farqi (0,35) kichik — deyarli qutbsiz kovalent bog‘.'}
  ],
  test:[
    {s:'Suvning molyar massasi qancha?', v:['17 g/mol','16 g/mol','18 g/mol','20 g/mol'], t:2,
     izoh:'<b>M(H₂O) = 2·1 + 16 = 18 g/mol.</b> 17 — vodorod indeksini unutgan holat.'},
    {s:'Ammiakdagi H–N–H burchagi nima uchun metandagidan (109,5°) kichik?', v:['Azotda bitta bo‘linmagan elektron jufti bor','Azot atomi ugleroddan yengil','Ammiakda qo‘sh bog‘ bor','Ammiak ionli modda'], t:0,
     izoh:'<b>Bo‘linmagan juft</b> bog‘lovchi juftlarni kuchliroq itaradi, shuning uchun burchak 107° ga kichrayadi.'},
    {s:'88 g CO₂ necha mol bo‘ladi?', v:['1 mol','4 mol','0,5 mol','2 mol'], t:3,
     izoh:'<b>n = m / M = 88 / 44 = 2 mol.</b>'}
  ],
  manbaQosh:'Kimyo darsliklari (8–9-sinf, anorganik kimyo asoslari); Britannica — «Water», «Sodium chloride», «VSEPR theory»; BIPM — SI birliklari (2019); nobelprize.org — F. Haber (1918), L. Pauling (1954); elektromanfiylik qiymatlari — Poling shkalasi (CRC Handbook of Chemistry and Physics).'
});

/* ================= FIZIKA: OM QONUNI ================= */
qosh('fizika-om', {
  kor:{matn:'Zanjirda tok manbai, lampa, rezistor va ampermetr bor. Slayderlarni surib, kuchlanish va qarshilik o‘zgarganda lampa yorqinligi, rezistor halqalari va ampermetr ko‘rsatkichi qanday o‘zgarishini kuzating. Om qonuni uchta kattalikni bog‘laydi: bittasini bilmasangiz, qolgan ikkitasidan hisoblab topasiz. Dars oxirida o‘tkazgich qarshiligi uning uzunligi, kesimi va materialiga qanday bog‘liqligini ham o‘rganasiz.'},
  maqola:[
    {sarlavha:'Nima uchun Om qonuni muhim?', xatboshilar:[
      'Uyimizdagi har bir elektr asbob — chiroq, choynak, telefon zaryadlagichi — ma’lum kuchlanishda ma’lum tok olish uchun loyihalangan. Agar tok me’yordan oshsa, sim qiziydi, izolyatsiya eriydi va yong‘in xavfi paydo bo‘ladi. Om qonuni ana shu tokni oldindan hisoblash imkonini beradi. Shuning uchun u elektrotexnikaning eng birinchi va eng ko‘p ishlatiladigan qonuni hisoblanadi.',
      'Elektrik montyor uy uchun sim kesimini tanlaganda, muhandis mikrosxemaga rezistor qo‘yganda, avtomexanik akkumulyator zanjirini tekshirganda — hammasi shu qonunga tayanadi. Om qonunini tushungan o‘quvchi nima uchun uzaytirgichga ko‘p kuchli asbob ulash xavfli ekanini ham osongina tushuntira oladi. Bu bilim nafaqat imtihon, balki kundalik xavfsizlik uchun kerak.',
      'Bu darsda siz virtual zanjirda kuchlanish va qarshilikni o‘zgartirib, natijani darhol ko‘rasiz. Haqiqiy laboratoriyada bunday tajriba vaqt va asbob talab qiladi, lampani kuydirib qo‘yish xavfi ham bor. Ekranda esa xato qilishdan qo‘rqmasdan har xil qiymatlarni sinab ko‘rishingiz mumkin.'
    ]},
    {sarlavha:'Asosiy tushunchalar: tok, kuchlanish, qarshilik', xatboshilar:[
      'Tok kuchi (I) — o‘tkazgichning ko‘ndalang kesimidan vaqt birligida o‘tadigan elektr zaryad miqdori: I = q / t. Uning birligi amper (A); 1 A tok bo‘lganda kesim orqali har soniyada 1 kulon zaryad o‘tadi. Metallarda tokni erkin elektronlarning tartibli harakati hosil qiladi. Tok kuchi ampermetr bilan o‘lchanadi va u zanjirga ketma-ket ulanadi.',
      'Kuchlanish (U) — elektr maydonining zaryadni ko‘chirishda bajargan ishining shu zaryadga nisbati: U = A / q. Birligi volt (V). Kuchlanishni suv quvuridagi bosimga o‘xshatish mumkin: bosim qancha katta bo‘lsa, quvurdan shuncha ko‘p suv oqadi. Kuchlanish voltmetr bilan o‘lchanadi va u o‘lchanayotgan qismga parallel ulanadi.',
      'Qarshilik (R) — o‘tkazgichning tokka to‘sqinlik qilish xossasi, birligi om (Ω). U o‘tkazgich materiali, uzunligi va ko‘ndalang kesim yuzasiga bog‘liq: R = ρ·l / S. Bu yerda ρ — solishtirma qarshilik, material xossasi. Uzun va ingichka sim qisqa va yo‘g‘on simga qaraganda katta qarshilikka ega bo‘ladi, xuddi tor va uzun quvurdan suv qiyinroq oqqani kabi.'
    ]},
    {sarlavha:'Zanjir qanday ishlaydi: bosqichma-bosqich', xatboshilar:[
      'Birinchi bosqich — zanjir yopiq bo‘lishi kerak. Tok manbai, ulovchi simlar, kalit va iste’molchi (lampa, rezistor) uzluksiz halqa hosil qilgandagina tok oqadi. Kalit ochilsa yoki sim uzilsa, tok darhol to‘xtaydi. Manba ichida esa tashqi kuchlar zaryadlarni ajratib, qutblarda kuchlanish hosil qiladi.',
      'Ikkinchi bosqich — tok kuchini hisoblash. Om qonuniga ko‘ra zanjir qismidagi tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional: I = U / R. Masalan, 12 V kuchlanishga 6 Ω qarshilik ulansa, tok 2 A bo‘ladi. Kuchlanishni ikki marta oshirsangiz, tok ham ikki marta oshadi; qarshilikni ikki marta oshirsangiz, tok ikki marta kamayadi.',
      'Uchinchi bosqich — energiya va quvvat. Tok o‘tganda o‘tkazgichda issiqlik ajraladi (Joul–Lens qonuni): Q = I²·R·t. Iste’molchi quvvati P = U·I bo‘lib, uni P = I²·R yoki P = U² / R ko‘rinishida ham yozish mumkin. Lampaning yorqinligi aynan quvvatga bog‘liq, shuning uchun simulyatsiyada tok ortganda lampa yorqinroq yonadi.',
      'To‘rtinchi bosqich — bir nechta iste’molchini ulash. Ketma-ket ulashda tok hamma joyda bir xil, qarshiliklar qo‘shiladi: R = R₁ + R₂. Parallel ulashda kuchlanish bir xil, umumiy qarshilik esa eng kichik qarshilikdan ham kichik bo‘ladi: 1/R = 1/R₁ + 1/R₂. Uydagi rozetkalar parallel ulangan, shuning uchun bitta asbobni o‘chirsangiz, boshqalari ishlashda davom etadi.'
    ]},
    {sarlavha:'Kashf etilish tarixi', xatboshilar:[
      '1800-yilda italiyalik olim Alessandro Volta birinchi barqaror tok manbai — «Volta ustuni»ni yaratdi. Shundan keyin olimlar uzoq vaqt oqadigan tok bilan tajriba o‘tkazish imkoniga ega bo‘ldi. Ammo tok, kuchlanish va o‘tkazgich xossalari orasidagi aniq miqdoriy bog‘lanish hali noma’lum edi.',
      'Nemis fizigi va maktab o‘qituvchisi Georg Simon Om turli uzunlik va qalinlikdagi simlar bilan ko‘plab tajribalar o‘tkazdi. Barqaror kuchlanish olish uchun u termoelementdan foydalandi. 1827-yilda u «Matematik jihatdan tadqiq qilingan galvanik zanjir» nomli asarida tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional ekanini e’lon qildi.',
      'Dastlab Om ishi Germaniyada yaxshi qabul qilinmadi, chunki ko‘plab olimlar tajriba natijalarini matematik formulaga solishga shubha bilan qaragan edi. Biroq keyinchalik uning ahamiyati tan olindi va 1841-yilda London Qirollik jamiyati unga Kopli medalini topshirdi. 1861-yilda Britaniya ilm-fan assotsiatsiyasi qarshilik birligini uning sharafiga «om» deb atashni taklif qildi, 1881-yilda Parijdagi Xalqaro elektriklar kongressi uni xalqaro birlik sifatida qabul qildi. Bugun Om qonuni butun dunyo maktablarida fizikaning asosiy mavzularidan biri.'
    ]},
    {sarlavha:'Hayotda va kasbda qo‘llanishi', xatboshilar:[
      'Saqlagich (predoxranitel) tokning issiqlik ta’siri bilan, avtomatik o‘chirgich esa issiqlik va magnit ta’siri bilan ishlaydi; nega aynan qisqa tutashuvda ishga tushishini Om qonuni tushuntiradi. Agar zanjirda qisqa tutashuv bo‘lsa, qarshilik keskin kamayadi va tok juda katta qiymatga yetadi. Avtomat bu tokni sezib, zanjirni uzadi va simlarni yonishdan saqlaydi. Shu sababli avtomatni «kuchliroq»iga almashtirish yoki saqlagich o‘rniga sim qo‘yish qat’iyan mumkin emas.',
      'Elektr choynak, dazmol va isitgichlarda solishtirma qarshiligi katta bo‘lgan nixrom simdan foydalaniladi, chunki unda ko‘p issiqlik ajraladi. Uzatish simlari esa aksincha, solishtirma qarshiligi kichik bo‘lgan mis yoki alyuminiydan yasaladi — energiya isrof bo‘lmasligi uchun. Elektronikada rezistorlar tokni cheklash va kuchlanishni bo‘lish uchun ishlatiladi, masalan, svetodiodni kuyishdan saqlash uchun.',
      'Uy elektr tarmog‘ining kuchlanishi 220 V. Inson tanasi orqali o‘tadigan bir necha o‘n milliamper tok ham hayot uchun xavfli bo‘lishi mumkin, shuning uchun nam qo‘l bilan rozetka va simlarga tegish taqiqlanadi. Elektromontyor, energetik, elektronika muhandisi va avtomobil elektrigi kasblarida Om qonuni har kuni qo‘llaniladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Eng ko‘p uchraydigan xato — formulani noto‘g‘ri aylantirish: I = U / R o‘rniga I = U · R yoki I = R / U yozish. Eslab qolish uchun «Om uchburchagi»dan foydalaning: yuqorida U, pastda yonma-yon I va R. Qaysi kattalikni topmoqchi bo‘lsangiz, uni barmoq bilan yoping — qolgan ikkitasining joylashuvi amalni ko‘rsatadi: U = I·R, I = U/R, R = U/I.',
      'Ikkinchi xato — birliklarni aralashtirish. Masalan, kesim yuzasi mm² da, solishtirma qarshilik esa Ω·m da berilsa, avval birliklarni moslashtirish kerak. Maktab jadvallarida ρ ko‘pincha Ω·mm²/m da beriladi — shunda uzunlik metrda, kesim mm² da qo‘yiladi. Milliamperni amperga o‘tkazishni ham unutmang: 500 mA = 0,5 A. Xuddi shunday, kiloom omga o‘tkaziladi: 2 kΩ = 2000 Ω.',
      'Uchinchi xato — ampermetr va voltmetrni almashtirib ulash. Ampermetrning ichki qarshiligi juda kichik, uni parallel ulash qisqa tutashuvga olib keladi va asbobni buzadi. Voltmetrning qarshiligi esa katta, uni ketma-ket ulasangiz zanjirda deyarli tok o‘tmaydi. Qoida: «Ampermetr — ketma-ket, voltmetr — parallel».'
    ]}
  ],
  formulalar:[
    ['I = U / R','Om qonuni (zanjir qismi uchun): I — tok kuchi (A), U — kuchlanish (V), R — qarshilik (Ω).'],
    ['I = q / t','Tok kuchi ta’rifi: q — zaryad (C), t — vaqt (s). 1 A = 1 C/s.'],
    ['R = ρ · l / S','O‘tkazgich qarshiligi: ρ — solishtirma qarshilik (Ω·mm²/m), l — uzunlik (m), S — ko‘ndalang kesim yuzasi (mm²).'],
    ['P = U · I = I² · R = U² / R','Elektr toki quvvati (Vt).'],
    ['A = U · I · t','Elektr tokining ishi (J); 1 kVt·soat = 3,6·10⁶ J.'],
    ['Q = I² · R · t','Joul–Lens qonuni: o‘tkazgichda ajraladigan issiqlik miqdori (J).'],
    ['R = R₁ + R₂','Ketma-ket ulashda umumiy qarshilik; tok hamma joyda bir xil.'],
    ['1/R = 1/R₁ + 1/R₂','Parallel ulashda umumiy qarshilik; kuchlanish tarmoqlarda bir xil.']
  ],
  qiziqarli:[
    'Georg Om o‘z qonunini 1827-yilda «Die galvanische Kette, mathematisch bearbeitet» kitobida e’lon qilgan; 1841-yilda Qirollik jamiyatining Kopli medalini olgan (Britannica, «Georg Simon Ohm»).',
    'Qarshilik birligi «om» 1881-yilda Parijdagi Xalqaro elektriklar kongressida qabul qilingan (Britannica, «ohm»).',
    '1911-yilda Xeyke Kamerling-Onnes simobni taxminan 4,2 K gacha sovitganda uning qarshiligi butunlay yo‘qolishini kashf etgan — o‘ta o‘tkazuvchanlik (nobelprize.org, 1913-yil fizika mukofoti).',
    'Metallarning qarshiligi harorat ortishi bilan oshadi; shuning uchun cho‘g‘lanma lampa tolasining qizigan holdagi qarshiligi sovuq holdagidan bir necha barobar katta va lampa uchun Om qonuni grafigi to‘g‘ri chiziq bo‘lmaydi (fizika darsliklari).',
    'Kumush eng kichik solishtirma qarshilikka ega metall (0,016 Ω·mm²/m), lekin qimmat bo‘lgani uchun simlar asosan misdan (0,017 Ω·mm²/m) yasaladi.'
  ],
  lugat:[
    ['Tok kuchi','Kesimdan vaqt birligida o‘tadigan zaryad miqdori; amper (A) da o‘lchanadi.'],
    ['Kuchlanish','Zaryadni ko‘chirishda bajarilgan ishning zaryadga nisbati; volt (V).'],
    ['Qarshilik','O‘tkazgichning tokka to‘sqinlik qilish xossasi; om (Ω).'],
    ['Solishtirma qarshilik','Uzunligi 1 m, kesimi 1 mm² bo‘lgan o‘tkazgich qarshiligi; material xossasi.'],
    ['Rezistor','Zanjirda ma’lum qarshilik hosil qilish uchun ishlatiladigan element.'],
    ['Ampermetr','Tok kuchini o‘lchaydigan asbob; ketma-ket ulanadi.'],
    ['Voltmetr','Kuchlanishni o‘lchaydigan asbob; parallel ulanadi.'],
    ['Quvvat','Vaqt birligida bajarilgan ish; vatt (Vt).'],
    ['Qisqa tutashuv','Tok iste’molchini chetlab, juda kichik qarshilik orqali o‘tishi; tok keskin ortadi.'],
    ['Saqlagich','Tok me’yordan oshganda zanjirni uzadigan himoya qurilmasi.'],
    ['Ketma-ket ulash','Elementlar bir-biri ortidan ulanadi; tok bir xil, qarshiliklar qo‘shiladi.'],
    ['Parallel ulash','Elementlar bir xil ikki nuqta orasiga ulanadi; kuchlanish bir xil.']
  ],
  bolimlar:[
    {sarlavha:'Solishtirma qarshilik (20 °C, Ω·mm²/m)', jadval:[
      ['Kumush','0,016'],['Mis','0,017'],['Oltin','0,024'],['Alyuminiy','0,028'],['Volfram','0,055'],['Temir','0,10'],['Nikelin','0,42'],['Konstantan','0,50'],['Nixrom','1,1']
    ], matn:'Mis va alyuminiy — simlar uchun, volfram — cho‘g‘lanma lampa tolasi uchun, nixrom — isitish elementlari uchun.'},
    {sarlavha:'Ketma-ket va parallel ulash farqi', jadval:[
      ['Tok kuchi','ketma-ket: hamma joyda bir xil · parallel: tarmoqlar yig‘indisi'],
      ['Kuchlanish','ketma-ket: qismlar yig‘indisi · parallel: hamma tarmoqda bir xil'],
      ['Umumiy qarshilik','ketma-ket: R₁ + R₂ · parallel: eng kichigidan ham kichik'],
      ['Bitta lampa kuysa','ketma-ket: hammasi o‘chadi · parallel: qolganlari yonadi'],
      ['Misol: 2 ta 6 Ω','ketma-ket: 12 Ω · parallel: 3 Ω'],
      ['Hayotda','ketma-ket: eski yolka chiroqlari · parallel: uydagi rozetkalar']
    ]}
  ],
  test:[
    {s:'Uzunligi 100 m, kesimi 0,5 mm² mis simning qarshiligi qancha? (ρ = 0,017 Ω·mm²/m)', v:['0,85 Ω','3,4 Ω','34 Ω','1,7 Ω'], t:1,
     izoh:'<b>R = ρ·l / S = 0,017 · 100 / 0,5 = 3,4 Ω.</b>'},
    {s:'Qarshiligi 6 Ω bo‘lgan ikki rezistor parallel ulansa, umumiy qarshilik qancha?', v:['12 Ω','6 Ω','2 Ω','3 Ω'], t:3,
     izoh:'<b>1/R = 1/6 + 1/6 = 1/3, R = 3 Ω.</b> 12 Ω — ketma-ket ulashga tegishli.'},
    {s:'Sim uzunligi 2 marta oshirilsa (material va kesim o‘zgarmasa), qarshilik qanday o‘zgaradi?', v:['2 marta oshadi','2 marta kamayadi','4 marta oshadi','O‘zgarmaydi'], t:0,
     izoh:'<b>R = ρ·l / S</b> — qarshilik uzunlikka to‘g‘ri proporsional.'}
  ],
  manbaQosh:'Fizika darsliklari (8-sinf, «Elektr hodisalari»); Britannica — «Georg Simon Ohm», «ohm», «Ohm’s law»; nobelprize.org — H. Kamerling-Onnes (1913); solishtirma qarshilik jadvali — maktab fizika darsliklari ma’lumotnoma jadvali.'
});

/* ================= BIOLOGIYA: ICHKI A’ZOLAR ================= */
qosh('bio-azolar', {
  kor:{matn:'Model ilmiy BodyParts3D bazasidan olingan — haqiqiy inson tanasi tasvirlari asosida qurilgan. Qatlamlarni yoqib-o‘chiring, a’zoni bosing va modelni aylantirib, har bir a’zo qayerda joylashganini va qo‘shnilari kimligini ko‘ring. Ichki a’zolar alohida emas, tizimlar bo‘lib ishlaydi: nafas olish, qon aylanish, hazm qilish va ayirish tizimlari bir-biriga bog‘liq. Dars oxirida a’zolarning o‘lchami, vazifasi va eng ko‘p uchraydigan chalkashliklarni bilib olasiz.'},
  maqola:[
    {sarlavha:'Nima uchun ichki a’zolarni bilish kerak?', xatboshilar:[
      'Inson tanasi — bir-biri bilan uzluksiz hamkorlik qiladigan a’zolar tizimi. Yurak qonni haydaydi, o‘pka uni kislorod bilan boyitadi, hazm tizimi ozuqa moddalarini yetkazadi, buyraklar esa keraksiz moddalarni chiqaradi. Bittasi ishdan chiqsa, boshqalari ham zarar ko‘radi. Tanani tushunish sog‘lom turmush tarzini ongli tanlashning asosi hisoblanadi.',
      'A’zolarning joylashuvini bilish amaliy ahamiyatga ham ega. Masalan, qorinning o‘ng yuqori qismidagi og‘riq jigar yoki o‘t pufagi bilan, bel sohasidagi og‘riq buyrak bilan bog‘liq bo‘lishi mumkin. Albatta, tashxisni faqat shifokor qo‘yadi, lekin o‘z tanasini bilgan odam shifokorga aniqroq ma’lumot bera oladi. Birinchi yordam ko‘rsatishda ham a’zolar joylashuvini bilish muhim.',
      'Darslikdagi rasm a’zolarni bir tekislikda ko‘rsatadi va ular bir-birini qanday qoplashini tushunish qiyin. 3D modelda esa qatlamlarni birin-ketin olib tashlab, masalan, yurak o‘pkalar orasida, jigar esa diafragma ostida o‘ng tomonda joylashganini o‘z ko‘zingiz bilan ko‘rasiz. Buyraklarni topish uchun modelni orqa tomonga aylantirish kerakligi ham shu bilan bog‘liq.'
    ]},
    {sarlavha:'Tuzilishi: bo‘shliqlar va asosiy a’zolar', xatboshilar:[
      'Tana ichki bo‘shlig‘i gumbazsimon mushak — diafragma orqali ikki qismga bo‘linadi. Yuqorida ko‘krak qafasi bo‘shlig‘i bo‘lib, unda yurak, o‘pkalar, traxeya va qizilo‘ngach joylashgan. Pastda qorin bo‘shlig‘i bo‘lib, unda oshqozon, jigar, oshqozon osti bezi, taloq, ichaklar va buyraklar joylashadi. Ko‘krak qafasining suyaklari yurak va o‘pkalarni tashqi zarbadan himoya qiladi.',
      'Yurak — to‘rt kamerali (ikki bo‘lmacha va ikki qorincha) mushakdan iborat nasos, kattaligi taxminan egasining mushtiday. U ko‘krak qafasining o‘rtasida, biroz chap tomonga surilgan holda joylashgan. O‘pkalar juft a’zo: o‘ng o‘pka uch bo‘lakdan, chap o‘pka yurakka joy qoldirgani uchun ikki bo‘lakdan iborat. Havo traxeya, bronxlar va bronxiolalar orqali mayda pufakchalar — alveolalarga yetib boradi.',
      'Jigar — tanadagi eng katta ichki bez, kattalarda og‘irligi taxminan 1,5 kg. U diafragma ostida, asosan o‘ng tomonda joylashgan, o‘t suyuqligi ishlab chiqaradi va qondagi zararli moddalarni zararsizlantiradi. Oshqozon chap tomonda, diafragma ostida joylashgan; undan keyin ingichka va yo‘g‘on ichak keladi. Buyraklar esa qorin bo‘shlig‘ining orqa devorida, bel sohasida, umurtqa pog‘onasining ikki yonida joylashgan loviyasimon juft a’zo.'
    ]},
    {sarlavha:'Tizimlar qanday birga ishlaydi: bir kislorod molekulasining yo‘li', xatboshilar:[
      'Birinchi bosqich — nafas olish. Diafragma qisqarib pastga tushganda ko‘krak qafasi hajmi kattalashadi va havo burun, hiqildoq, traxeya, bronxlar orqali alveolalarga kiradi. Alveolalar devori juda yupqa va qon kapillyarlari bilan o‘ralgan. Kislorod shu devor orqali qonga o‘tadi, qondan esa karbonat angidrid alveolalarga chiqadi va nafas chiqarishda tashqariga chiqariladi.',
      'Ikkinchi bosqich — qon aylanishi. Kislorodga boy qon o‘pka venalari orqali yurakning chap bo‘lmachasiga, so‘ng chap qorinchaga keladi. Chap qorincha eng qalin devorli kamera bo‘lib, qonni aorta orqali butun tanaga haydaydi — bu katta qon aylanish doirasi. To‘qimalarda kislorodini bergan qon venalar orqali o‘ng bo‘lmachaga qaytadi va o‘ng qorincha uni yana o‘pkaga yuboradi — bu kichik qon aylanish doirasi.',
      'Uchinchi bosqich — ozuqa va chiqindilar. Hujayralar kislorod yordamida ozuqa moddalarini parchalab energiya oladi; ozuqa moddalari oldindan ingichka ichakda qonga so‘rilgan bo‘ladi. Ingichka ichakdan kelgan qon avval darvoza venasi orqali jigarga boradi va u yerda tozalanadi. Buyraklar qonni filtrlab, ortiqcha suv, tuzlar va mochevinani siydik tarkibida chiqaradi. Shunday qilib, bitta kislorod molekulasi kamida to‘rt tizimning birgalikdagi ishini ko‘rsatadi.'
    ]},
    {sarlavha:'Anatomiya fanining tarixi', xatboshilar:[
      'Vatandoshimiz Abu Ali ibn Sino (980-yilda Buxoro yaqinidagi Afshona qishlog‘ida tug‘ilgan) «Tib qonunlari» asarini XI asr boshida yakunladi. Bu kitob ichki a’zolar, kasalliklar va dori-darmonlar haqidagi keng qamrovli qo‘llanma bo‘lib, Yevropa universitetlarida ham asrlar davomida tibbiyot darsligi sifatida o‘qitildi. Asarda sog‘liqni saqlash uchun ovqatlanish, harakat va uyqu tartibiga katta e’tibor berilgan.',
      '1543-yilda Andreas Vezaliy «Inson tanasining tuzilishi haqida» nomli yetti kitobdan iborat asarini nashr etdi. U anatomiyani o‘z kuzatishlariga asoslab, avvalgi ko‘plab noto‘g‘ri qarashlarni tuzatdi va aniq rasmlar bilan boyitdi. Shu sababli Vezaliy zamonaviy anatomiyaning asoschilaridan biri hisoblanadi.',
      '1628-yilda ingliz shifokori Uilyam Garvey qon yurak tomonidan haydalib, yopiq doira bo‘ylab aylanishini isbotladi. 1921-yilda Frederik Banting va Charlz Best oshqozon osti bezidan insulin ajratib oldi; bu kashfiyot uchun 1923-yilda Nobel mukofoti berildi. Bugun esa KT va MRT kabi usullar tirik odam a’zolarini kesmasdan ko‘rish imkonini beradi, BodyParts3D kabi ochiq bazalar ana shunday tasvirlar asosida yaratilgan.'
    ]},
    {sarlavha:'Hayotda va kasbda qo‘llanishi', xatboshilar:[
      'Anatomiya bilimi shifokor, hamshira, feldsher, farmatsevt, sport murabbiyi va fizioterapevt kabi kasblarning poydevori hisoblanadi. Tez yordam xodimi yurak massajini ko‘krak suyagining pastki qismiga bosib bajaradi, chunki yurak aynan uning ortida joylashgan. Jarroh operatsiyadan oldin a’zolarning o‘zaro joylashuvini 3D tasvirlarda o‘rganadi.',
      'Kundalik hayotda ham bu bilim foydali. Chekish alveolalarga zarar yetkazadi va gaz almashinuvini yomonlashtiradi. Ortiqcha tuz yurak va buyraklarga yuk bo‘ladi, spirtli ichimliklar esa birinchi navbatda jigarni zararlaydi. Yetarli suv ichish buyraklar ishini yengillashtiradi, muntazam jismoniy harakat esa yurak mushagini mustahkamlaydi.',
      'Donorlik — anatomiya bilimining insonparvarlik bilan bog‘langan sohasi. Bitta buyrak bilan ham inson sog‘lom yashay olishi buyrak ko‘chirib o‘tkazish operatsiyalarini mumkin qiladi. Jigar esa qisman olib tashlangandan so‘ng tiklanish qobiliyatiga ega. Bu faktlar a’zolar tuzilishini chuqur bilish qanchalik ko‘p hayotni saqlab qolishini ko‘rsatadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Birinchi xato — yurakni tananing butunlay chap tomonida deb o‘ylash. Aslida yurak ko‘krak qafasining o‘rtasida, faqat uchi chap tomonga qaragan. Ikkinchi xato — buyraklarni qorinning old qismida, kindik yonida deb tasavvur qilish; ular bel sohasida, orqa devorga yaqin joylashgan. Modelda buyrakni topish uchun tanani orqa tomonga aylantirish kerakligi shuni eslatib turadi.',
      'Uchinchi xato — arteriya va venani qon tarkibi bo‘yicha ajratish. Arteriya — qonni yurakdan olib ketadigan, vena — yurakka olib keladigan tomir. O‘pka arteriyasida kislorodi kam qon, o‘pka venalarida esa kislorodga boy qon oqadi. Eslab qolish uchun: «Arteriya — yurakdan chiqadi, vena — yurakka kiradi», ya’ni yo‘nalishga qarang, rangga emas.',
      'O‘pka bo‘laklarini eslash uchun: «o‘ng — uch, chap — ikki, chunki chap tomonda yurak joy oladi». Hazm yo‘li tartibi: og‘iz → halqum → qizilo‘ngach → oshqozon → ingichka ichak → yo‘g‘on ichak. Jigar va oshqozon osti bezi hazm yo‘lining o‘zi emas, balki unga shira quyadigan bezlar ekanini ham unutmang.',
      'Modeldan samarali foydalanish uchun oddiy usul bor: avval teri va mushak qatlamini o‘chiring, keyin a’zolarni yuqoridan pastga qarab birma-bir bosib chiqing. Har bir a’zo nomini ovoz chiqarib ayting va uning qaysi tizimga tegishli ekanini qo‘shib qo‘ying. So‘ng qatlamlarni qayta yoqib, a’zo teri ostida taxminan qayerga to‘g‘ri kelishini o‘z tanangizda ko‘rsatib ko‘ring. Bunday mashq bilim uzoq xotirada qolishiga yordam beradi.'
    ]}
  ],
  qiziqarli:[
    'Tinch holatda kattalar yuragi daqiqasiga 60–100 marta qisqaradi (me’yor oralig‘i; ko‘pchilikda 70 atrofida) va har daqiqada taxminan 5 litr qon haydaydi (Britannica, «heart»).',
    'Buyraklar bir sutkada taxminan 180 litr birlamchi siydik hosil qiladi, lekin uning deyarli hammasi qayta so‘riladi va taxminan 1,5 litr siydik chiqariladi (Britannica, «kidney»).',
    'Jigar tanadagi eng katta ichki bez bo‘lib, kattalarda taxminan 1,5 kg keladi va qisman olib tashlangandan keyin qayta tiklana oladi (Britannica, «liver»).',
    'Ibn Sinoning «Tib qonunlari» XVII asrgacha Yevropa universitetlarida tibbiyot darsligi sifatida foydalanilgan (Britannica, «The Canon of Medicine»).',
    'BodyParts3D — Yaponiyaning DBCLS (Hayot fanlari ma’lumotlar bazasi markazi) tomonidan yaratilgan ochiq 3D anatomiya bazasi; model MRT va KT tasvirlari asosida qurilgan (lifesciencedb.jp).'
  ],
  lugat:[
    ['Diafragma','Ko‘krak va qorin bo‘shlig‘ini ajratib turuvchi gumbazsimon mushak; nafas olishda asosiy ishtirokchi.'],
    ['Alveola','O‘pkadagi mayda havo pufakchasi; unda gaz almashinuvi kechadi.'],
    ['Bo‘lmacha','Yurakning qonni qabul qiluvchi yuqori kamerasi.'],
    ['Qorincha','Yurakning qonni tomirlarga haydovchi pastki kamerasi.'],
    ['Aorta','Chap qorinchadan chiqadigan eng yirik arteriya.'],
    ['Arteriya','Qonni yurakdan a’zolarga olib ketadigan qon tomiri.'],
    ['Vena','Qonni a’zolardan yurakka olib keladigan qon tomiri.'],
    ['O‘t suyuqligi','Jigarda ishlanadigan, yog‘larni hazm qilishga yordam beruvchi suyuqlik.'],
    ['Nefron','Buyrakning qonni filtrlaydigan tuzilish va funksional birligi.'],
    ['Insulin','Oshqozon osti bezi gormoni; qondagi qand miqdorini kamaytiradi.'],
    ['Taloq','Qorin bo‘shlig‘ining chap yuqori qismidagi, qon hujayralari va immunitet bilan bog‘liq a’zo.'],
    ['Katta qon aylanish doirasi','Chap qorinchadan aorta orqali butun tanaga va o‘ng bo‘lmachaga qaytuvchi yo‘l.']
  ],
  bolimlar:[
    {sarlavha:'A’zolar: joyi, tizimi va asosiy vazifasi', jadval:[
      ['Yurak','ko‘krak qafasi o‘rtasi, uchi chapga · qon aylanish · qonni haydash'],
      ['O‘pkalar','ko‘krak qafasi, o‘ng 3 va chap 2 bo‘lak · nafas olish · gaz almashinuvi'],
      ['Jigar','diafragma ostida, o‘ngda · hazm · o‘t ishlab chiqarish, zararsizlantirish'],
      ['Oshqozon','diafragma ostida, chapda · hazm · ovqatni me’da shirasi bilan qayta ishlash'],
      ['Oshqozon osti bezi','oshqozon ortida · hazm va endokrin · hazm shirasi, insulin'],
      ['Ingichka ichak','qorin bo‘shlig‘i markazi · hazm · ozuqa moddalarini so‘rish'],
      ['Yo‘g‘on ichak','ingichka ichakni ramkadek o‘rab turadi · hazm · suv so‘rilishi'],
      ['Buyraklar','bel sohasi, umurtqa ikki yonida · ayirish · qonni filtrlash, siydik hosil qilish'],
      ['Taloq','qorin bo‘shlig‘i chap yuqori qismi · qon va immunitet · eskirgan qon hujayralarini parchalash']
    ]},
    {sarlavha:'Kichik va katta qon aylanish doirasi', tartibli:true, punktlar:[
      '<b>O‘ng qorincha</b> → o‘pka arteriyasi → o‘pka (qon kislorodga boyiydi)',
      'O‘pka venalari → <b>chap bo‘lmacha</b> (kichik doira tugadi)',
      '<b>Chap qorincha</b> → aorta → arteriyalar → a’zolar kapillyarlari',
      'To‘qimalarda kislorod beriladi, CO₂ olinadi',
      'Kovak venalar → <b>o‘ng bo‘lmacha</b> (katta doira tugadi)',
      'O‘ng bo‘lmacha → o‘ng qorincha — aylanish qaytadan boshlanadi'
    ]}
  ],
  test:[
    {s:'Qaysi yurak kamerasi qonni aorta orqali butun tanaga haydaydi?', v:['O‘ng bo‘lmacha','O‘ng qorincha','Chap bo‘lmacha','Chap qorincha'], t:3,
     izoh:'<b>Chap qorincha</b> katta qon aylanish doirasini boshlaydi, shuning uchun uning devori eng qalin.'},
    {s:'O‘ng o‘pka nechta bo‘lakdan iborat?', v:['3','2','4','1'], t:0,
     izoh:'O‘ng o‘pka <b>3 bo‘lakli</b>, chap o‘pka yurakka joy qoldirgani uchun 2 bo‘lakli.'},
    {s:'O‘t suyuqligini qaysi a’zo ishlab chiqaradi?', v:['Oshqozon','Jigar','Taloq','Buyrak'], t:1,
     izoh:'O‘tni <b>jigar</b> ishlab chiqaradi; u yog‘larni hazm qilishga yordam beradi.'}
  ],
  manbaQosh:'Biologiya darsliklari (8-sinf, «Odam va uning salomatligi»); Britannica — «heart», «kidney», «liver», «Avicenna», «The Canon of Medicine», «Andreas Vesalius», «William Harvey»; nobelprize.org — F. Banting, J. Macleod (1923); BodyParts3D — DBCLS, lifesciencedb.jp.'
});

/* ================= HARBIY: AK-74 ================= */
qosh('harbiy-ak74', {
  kor:{matn:'Kalashnikov avtomati — askarning shaxsiy quroli, u dushman tirik kuchini safdan chiqarish uchun qo‘llaniladi. Avtomatika poroxli gaz energiyasining zatvor ramasidagi gaz porsheniga ta’siri hisobiga ishlaydi; o‘t ochish turlari — to‘xtovsiz (AB) va yakka (OD). Bu darsda 12 asosiy qism va mexanizmni, noto‘liq qismlarga ajratish va yig‘ish tartibini hamda qurol bilan ishlashdagi xavfsizlik qoidalarini o‘rganasiz. Amaliy mashg‘ulot faqat o‘quv maketi (MMG) bilan va o‘qituvchi nazoratida o‘tkaziladi.'},
  maqola:[
    {sarlavha:'Kirish: nima uchun bu mavzu muhim?', xatboshilar:[
      '«Chaqiruvga qadar boshlang‘ich tayyorgarlik» fani yoshlarni Qurolli Kuchlar safida xizmatga tayyorlashning tarkibiy qismi va o‘rta ta’lim muassasalari uchun majburiy o‘quv fani hisoblanadi. 10-sinf darsligining «Otish tayyorgarligi» bo‘limi Kalashnikov avtomatidan boshlanadi, chunki u askarning asosiy shaxsiy quroli. Qurol tuzilishini bilish uni to‘g‘ri parvarish qilish, nosozlikni vaqtida sezish va eng muhimi — xavfsiz muomala qilishning asosidir.',
      'Bu darsning maqsadi otishni o‘rgatish emas, balki qurolning qismlari, ularning vazifasi va xizmat ko‘rsatish tartibi bilan tanishtirishdir. Noto‘liq qismlarga ajratish qurolni tozalash, moylash va ko‘zdan kechirish uchun bajariladi. Tartibni bilmaslik qismlarning shikastlanishiga yoki yo‘qolishiga olib keladi, xavfsizlik qoidasini buzish esa baxtsiz hodisaga sabab bo‘lishi mumkin.',
      'MAKON 3D sahnasida qismlarni ekranda ajratib, tartibni oldindan puxta eslab qolasiz. Keyin o‘qituvchi rahbarligida massa-gabarit maketida mashq qilasiz. Shu tariqa har bir harakat avval tushunib olinadi, so‘ng qo‘l bilan mustahkamlanadi.'
    ]},
    {sarlavha:'Asosiy qismlar va mexanizmlar', xatboshilar:[
      'Darslikka ko‘ra avtomat 12 ta asosiy qism va mexanizmdan iborat. Birinchisi — stvol stvol qutisi, zarbdor-tepki mexanizmi, mo‘ljalga olish moslamasi, qo‘ndoq va pistolet dastasi bilan birga. Stvol o‘qning yo‘nalishli uchishini ta’minlaydi; uning ichida o‘ngga buralgan 4 ta nareza bor. Stvol qutisi qism va mexanizmlarni bir butunga birlashtiradi va zatvor ramasining harakatini yo‘naltiradi.',
      'Og‘iz tormozi-kompensator otishda qaytish kuchini kamaytiradi va o‘qlarning to‘planib tegishini oshiradi. Stvol qutisi qopqog‘i ichki mexanizmlarni ifloslanishdan saqlaydi. Zatvor ramasi gaz porsheni bilan zatvor va zarbdor-tepki mexanizmini harakatga keltiradi. Zatvor esa patronni patronnikka yuboradi, stvol kanalini berkitadi, kapsulni ezadi va gilzani sug‘urib oladi.',
      'Qaytaruvchi mexanizm zatvor ramasini zatvor bilan birga oldingi holatga qaytaradi. Gaz trubkasi stvol ustki qoplamasi bilan gaz porsheni harakatini yo‘naltiradi, qoplama esa qo‘lni qizigan stvoldan asraydi; stvol osti qoplamasi (cevye) ham qurolni qulay ushlash va qo‘lni kuyishdan saqlash uchun xizmat qiladi. Magazin (o‘qdon) patronlarni joylashtiradi va stvol qutisiga yetkazib beradi. Ro‘yxatni nayza-pichoq, shompol va tozalash anjomlari solingan penal yakunlaydi.',
      'Zarbdor-tepki mexanizmi alohida e’tiborga loyiq. U tepkini jangovar holatdan bo‘shatadi, zarbdorga zarba beradi, to‘xtovsiz va yakka otishni ta’minlaydi. Shuningdek, u zatvor yopilmaganda otilmaslikni va qurolni saqlagichga qo‘yishni ta’minlaydi — bu qurol konstruksiyasiga kiritilgan xavfsizlik elementi.'
    ]},
    {sarlavha:'Avtomatika qanday ishlaydi: umumiy tamoyil', xatboshilar:[
      'Avtomat avtomatikasi gaz chiqarish tamoyiliga asoslangan. O‘q stvol bo‘ylab harakatlanganda poroxli gazlarning bir qismi stvol devoridagi teshik orqali gaz kamerasiga o‘tadi va gaz porsheniga bosim beradi. Porshen zatvor ramasi bilan bir butun bo‘lgani uchun rama orqaga suriladi. Shu harakat hisobiga zatvor ochiladi, gilza chiqariladi va qaytaruvchi prujina siqiladi.',
      'Keyin siqilgan qaytaruvchi mexanizm ramani oldinga qaytaradi, zatvor magazindan navbatdagi patronni patronnikka yuboradi va stvol kanalini berkitadi. Shunday qilib, bir sikl uchun zarur energiya o‘q uzilganda hosil bo‘lgan gazning o‘zidan olinadi. AK-74 da texnik otish sur’ati darslikda daqiqasiga 600 o‘qqacha deb berilgan (ayrim xorijiy manbalarda 650 — ma’lumotlar farq qiladi).',
      'Amalda jangovar otish tezligi ancha past: to‘xtovsiz otishda daqiqasiga 100 gacha, yakka otishda 40 gacha o‘q. Chunki askar nishonga olishi, magazinni almashtirishi va vaziyatni kuzatishi kerak. Texnik sur’at va jangovar tezlik farqini tushunish test savollarida ko‘p uchraydigan chalkashlikning oldini oladi.'
    ]},
    {sarlavha:'Yaratilish tarixi', xatboshilar:[
      'Avtomat konstruktori Mixail Timofeyevich Kalashnikov (1919–2013) edi. Uning birinchi avtomati 7,62 mm kalibrli patronga mo‘ljallangan bo‘lib, keyinchalik zamonaviylashtirilgan AKM varianti yaratildi. AK-74 esa 1974-yilda qabul qilingan va u yangi, kichikroq 5,45×39 mm patronga o‘tkazilgan edi.',
      'Kalibrni kichraytirish natijasida o‘qning boshlang‘ich tezligi 715 m/s dan 900 m/s gacha oshdi, ko‘krak nishoniga to‘g‘ri o‘q uzish uzoqligi esa 350 m dan 440 m ga yetdi. Darslikka ko‘ra AK-74 ning o‘q uzish samaradorligi AKM ga nisbatan 1,2–1,6 baravar yuqori. Stvol og‘ziga o‘rnatilgan tormoz-kompensator qaytish kuchini kamaytirib, aniqlikni oshiradi.',
      '1991-yilda AK-74M modifikatsiyasi yaratildi, uning og‘irligi darslikda 3,4 kg deb ko‘rsatilgan. Patron og‘irligi 10,6 g (darslik; qo‘llanma va ochiq manbalarda 10,2 g), o‘q og‘irligi 3,4 g, porox zaryadi 1,45 g. O‘qning uchish uzoqligi 3150 m, o‘ldirish ta’siri saqlanadigan masofa esa 1350 m — bu raqamlar nima uchun qurol bilan ehtiyotkorlik talab qilinishini yaqqol ko‘rsatadi.'
    ]},
    {sarlavha:'Ajratish va yig‘ish qoidalari, xizmatda qo‘llanishi', xatboshilar:[
      'Noto‘liq qismlarga ajratish toza stol yoki taglik ustida bajariladi. Qismlar ajratilish tartibida teriladi va biri ikkinchisining ustiga qo‘yilmaydi. Ortiqcha kuch va keskin zarba ishlatilmaydi. Yig‘ishda qismlardagi raqamlar stvol qutisidagi raqam bilan solishtiriladi — bu qismlar boshqa qurolnikiga almashib ketmasligi uchun kerak.',
      'Ajratish har doim magazinni ajratishdan boshlanadi, so‘ng patronnikda patron yo‘qligi tekshiriladi. Shundan keyin penal, shompol, stvol qutisi qopqog‘i, qaytaruvchi mexanizm, zatvor ramasi zatvor bilan, zatvor va gaz trubkasi ajratiladi. Og‘iz tormozi-kompensatorni ajratish bosqichi 10-sinf darsligi ro‘yxatida yo‘q, shuning uchun uni bajarish yoki bajarmaslikni o‘qituvchi o‘z dasturiga qarab belgilaydi.',
      'Yig‘ish teskari tartibda bajariladi: avval gaz trubkasi, keyin zatvor ramaga, rama stvol qutisiga, so‘ng qaytaruvchi mexanizm va qopqoq biriktiriladi, kurok jangovar holatdan tushiriladi (nazorat tepkisi) va qurol saqlagichga qo‘yiladi; oxirida shompol, penal va magazin joyiga qo‘yiladi. Xizmatda bu ko‘nikma qurolni har kuni toza va soz saqlash uchun zarur. Musobaqalarda ajratish va yig‘ish vaqtga bajariladi, ammo darsda avval aniqlik, keyin tezlik talab qilinadi.'
    ]},
    {sarlavha:'Xavfsizlik va intizom', xatboshilar:[
      'Qurolni — o‘qlangan yoki o‘qlanmaganidan qat’i nazar — odamlarga, yonga va orqaga qaratish taqiqlanadi. Rahbar komandasisiz qurolni o‘qlash, o‘qlangan qurolni qarovsiz qoldirish yoki boshqaga berish ham taqiqlanadi. Nosoz quroldan otish, nosoz o‘q-dori ishlatish, o‘q-dorini qismlarga ajratish va olovga tashlash qat’iyan man etiladi.',
      'Musobaqa qoidalarida magazin ajratilmasdan zatvor ramasini tortish va nazorat tepkisini 45° dan past burchakda bosish qo‘pol xato hisoblanadi. Bu qoidalar o‘quv maketida ham odat sifatida bajariladi: maketni hech qachon odamga qaratmang, ajratishni doim magazindan boshlang. Odat qo‘lda shakllanadi va kelajakda haqiqiy vaziyatda avtomatik tarzda ishlaydi.',
      'Maktabda amaliy mashg‘ulot faqat o‘quv maketi bilan va o‘qituvchi nazoratida o‘tkaziladi. Normativ vaqtlar (masalan, ajratish uchun 15 s «a’lo») Rossiya maktab normativlaridan olingan mo‘ljal bo‘lib, O‘zbekiston uchun rasmiy normativ jadvali topilmagan. Shuning uchun baholashda o‘qituvchi amaldagi hujjatga tayanadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Birinchi xato — AK-74 va AKM raqamlarini aralashtirish. Eslab qolish uchun: «74 — kichik kalibr, katta tezlik»: 5,45 mm va 900 m/s; AKM esa 7,62 mm va 715 m/s. Ikkinchi xato — nishonga olish uzoqligi (1000 m), to‘g‘ri o‘q uzish uzoqligi (440 va 625 m) va o‘qning uchish uzoqligini (3150 m) chalkashtirish.',
      'Uchinchi xato — ajratish tartibida qopqoqdan oldin qaytaruvchi mexanizmni chiqarishga urinish. Qopqoq yopiq turganda mexanizmga yetib bo‘lmaydi, shuning uchun tartib mantiqan «tashqaridan ichkariga» boradi: magazin → penal → shompol → qopqoq → qaytaruvchi mexanizm → zatvor ramasi → zatvor → gaz trubkasi. Yig‘ish esa «ichkaridan tashqariga», ya’ni oxirgi ajratilgan qism birinchi joyiga qo‘yiladi.',
      'To‘rtinchi xato — xavfsizlik tekshiruvini «maket bo‘lgani uchun» tashlab ketish. Qoida hech qachon qisqartirilmaydi: avval magazin, keyin patronnik. Bu ikki harakatni har bir mashqning birinchi qadami qilib, ovoz chiqarib aytib bajarish tavsiya etiladi.'
    ]}
  ],
  qiziqarli:[
    'AK-74 ning o‘q uzish samaradorligi AKM ga nisbatan 1,2–1,6 baravar yuqori ekani darslikda qayd etilgan (10-sinf darsligi, 136-bet).',
    'AK-74 o‘qi 3150 m gacha ucha oladi, o‘ldirish ta’sirini esa 1350 m gacha saqlaydi — nishonga olish uzoqligidan (1000 m) ham uzoqroq (10-sinf darsligi, 137-bet).',
    'Stvol ichidagi 4 ta nareza o‘ngga buralgan: ular o‘qni aylantirib, uchishda barqarorlikni ta’minlaydi (10-sinf darsligi, 137–138-betlar).',
    'M. T. Kalashnikov (1919–2013) — avtomat konstruktori; AK-74 1974-yilda, AK-74M esa 1991-yilda yaratilgan (10-sinf darsligi, 135–136-betlar; ruscha Wikipedia «АК-74»).'
  ],
  lugat:[
    ['Kalibr','Stvol kanalining qarama-qarshi qirralari (maydonlari) orasidagi masofa; AK-74 da 5,45 mm.'],
    ['Patronnik','Stvolning orqa qismidagi patron joylashadigan bo‘shliq.'],
    ['Nareza','Stvol kanalidagi vintsimon ariqcha; o‘qni aylantiradi (AK-74 da 4 ta, o‘ngga).'],
    ['Zatvor ramasi','Gaz porsheni bilan birga zatvor va zarbdor-tepki mexanizmini harakatga keltiruvchi qism.'],
    ['Zatvor','Patronni yuboradi, stvol kanalini berkitadi, kapsulni ezadi, gilzani sug‘urib oladi.'],
    ['Qaytaruvchi mexanizm','Zatvor ramasini zatvor bilan oldingi holatga qaytaradi.'],
    ['Zarbdor-tepki mexanizmi','Tepkini bo‘shatish, zarbdorga zarba berish, otish turini tanlash va saqlagichga qo‘yishni ta’minlaydi.'],
    ['Og‘iz tormozi-kompensator','Stvol og‘zidagi moslama; qaytish kuchini kamaytiradi, aniqlikni oshiradi.'],
    ['Penal','Tozalash anjomlari solinadigan, qo‘ndoq uyasida saqlanadigan quti.'],
    ['Cevye','Stvol osti qoplamasi; qulay ushlash va qo‘lni kuyishdan saqlash uchun.'],
    ['To‘g‘ri o‘q uzish','O‘q traektoriyasi butun masofada nishon balandligidan oshmaydigan otish.'],
    ['MMG','Massa-gabarit maketi — o‘quv mashg‘ulotlari uchun o‘q uzolmaydigan maket.']
  ],
  bolimlar:[
    {sarlavha:'12 asosiy qism va mexanizm (darslik bo‘yicha)', jadval:[
      ['1. Stvol (stvol qutisi, ZTM, qo‘ndoq, dasta bilan)','o‘qning yo‘nalishli uchishi; qismlarni birlashtirish'],
      ['2. Og‘iz tormozi-kompensator','qaytish kuchini kamaytirish'],
      ['3. Stvol qutisi qopqog‘i','mexanizmlarni ifloslanishdan saqlash'],
      ['4. Zatvor ramasi gaz porsheni bilan','zatvor va ZTM ni harakatga keltirish'],
      ['5. Zatvor','patronni yuborish, kanalni berkitish, gilzani chiqarish'],
      ['6. Qaytaruvchi mexanizm','ramani oldingi holatga qaytarish'],
      ['7. Gaz trubkasi ustki qoplama bilan','porshen harakatini yo‘naltirish'],
      ['8. Stvol osti qoplamasi (cevye)','qulay ushlash, qo‘lni kuyishdan saqlash'],
      ['9. Magazin · 10. Nayza-pichoq','patronlarni yetkazish · qo‘l jangi'],
      ['11. Shompol · 12. Penal','stvolni tozalash · tozalash anjomlarini saqlash']
    ]},
    {sarlavha:'Patron va qo‘shimcha ko‘rsatkichlar', jadval:[
      ['Patron og‘irligi','10,6 g (darslik; qo‘llanma va ochiq manbalarda 10,2 g)'],['O‘q og‘irligi','3,4 g'],['Porox zaryadi','1,45 g'],['Bo‘sh o‘qdon og‘irligi','0,23 kg'],
      ['O‘qning uchish uzoqligi','3150 m'],['O‘ldirish ta’siri saqlanadigan masofa','1350 m'],['Nayza-pichoq (qin bilan)','490 g'],
      ['Texnik otish sur’ati','600 gacha o‘q/daq (ayrim manbalarda 650)'],['AK-74M og‘irligi (1991)','3,4 kg']
    ], matn:'Manba: 10-sinf darsligi, 135–137-betlar. Uzunlik bo‘yicha manbalar farq qiladi (956 va ≈940 mm), shuning uchun jadvalda keltirilmadi.'}
  ],
  test:[
    {s:'AK-74 stvoli ichida nechta nareza bor?', v:['2 ta','6 ta','8 ta','4 ta'], t:3,
     izoh:'Stvolda <b>4 ta o‘ngga buralgan nareza</b> bor; ular o‘qni aylantirib, barqaror uchishini ta’minlaydi.'},
    {s:'Yig‘ishda qismlardagi raqamlar nima bilan solishtiriladi?', v:['Magazindagi raqam bilan','Stvol qutisidagi raqam bilan','Penaldagi raqam bilan','Solishtirilmaydi'], t:1,
     izoh:'Qismlar boshqa qurolnikiga almashmasligi uchun <b>stvol qutisidagi raqam</b> bilan solishtiriladi.'},
    {s:'Qaysi mexanizm zatvor yopilmaganda otilmaslikni va saqlagichga qo‘yishni ta’minlaydi?', v:['Zarbdor-tepki mexanizmi','Qaytaruvchi mexanizm','Gaz trubkasi','Og‘iz tormozi-kompensator'], t:0,
     izoh:'Bu vazifalarni <b>zarbdor-tepki mexanizmi</b> bajaradi (darslik, 142-bet).'}
  ],
  manbaQosh:'10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2017), 134–146-betlar; manba/harbiy_mazmun.md 2-bo‘lim; «Руководство по 5,45-мм автоматам Калашникова» (2001); ruscha Wikipedia «АК-74», «Автомат Калашникова модернизированный» — solishtirish uchun ([ZID]: uzunlik, otish sur’ati, og‘irlik).'
});

/* ================= HARBIY: GRANATALAR (faqat tanishuv va xavfsizlik) ================= */
qosh('harbiy-granata', {
  kor:{matn:'Parchalanuvchi qo‘l granatasi dushman tirik kuchini parchalar bilan safdan chiqarish uchun mo‘ljallangan harbiy o‘q-dori. O‘zbekiston Qurolli Kuchlarida hujumda RGD-5, mudofaada F-1 qo‘llaniladi. Bu dars faqat tanishuv va xavfsizlik darajasida: turlarining farqi, umumiy tuzilishi (nomlar darajasida) va eng muhimi — portlovchi buyumlarga nisbatan to‘g‘ri xulq-atvor. Darsda faqat inert o‘quv maketi va 3D model ishlatiladi.'},
  maqola:[
    {sarlavha:'Kirish: nima uchun bu mavzu o‘rganiladi?', xatboshilar:[
      'Qo‘l granatalari 10-sinf darsligining «Otish tayyorgarligi» bo‘limida Kalashnikov avtomatidan keyin o‘rganiladi. Harbiy xizmatga tayyorlanayotgan yigit-qizlar uchun granata turlarini farqlash va ular bilan bog‘liq xavfni tushunish zarur. Biroq bu darsning asosiy maqsadi tinch hayotdagi xavfsizlik madaniyatini shakllantirishdir.',
      'Dunyoning ko‘p joylarida o‘tmishdagi urushlar va mashg‘ulotlardan qolgan portlamagan o‘q-dorilar hanuzgacha topilib turadi. Bunday buyum yillar davomida yerda yotib zanglagan bo‘lsa ham, xavfliligini yo‘qotmaydi. Shu sababli «topdim — tegmayman — xabar beraman» qoidasini bilish har bir fuqaro uchun hayotiy ahamiyatga ega.',
      'Bu darsda granatani tayyorlash, uloqtirish yoki ishga tushirish usullari o‘rgatilmaydi. Siz faqat turlari, jangovar xususiyatlarining ma’nosi, umumiy tuzilishi va xavfsizlik qoidalari bilan tanishasiz. Amaliy qism — xavfli vaziyatda to‘g‘ri qaror qabul qilish mashqi.',
      'Mavzuni o‘rganishda xotirjamlik va jiddiylik birdek muhim. Qo‘rquv odamni noto‘g‘ri harakatga undashi mumkin, beparvolik esa undan ham xavfli. Shuning uchun darsda har bir fakt «bu menga qanday xavfsizlik qoidasini eslatadi?» degan savol bilan bog‘lanadi. Masalan, parchalar radiusi haqidagi raqam — portlovchi buyumdan nega uzoqroq turish kerakligining isboti.'
    ]},
    {sarlavha:'Turlari: hujum va mudofaa granatasi', xatboshilar:[
      'Parchalanuvchi qo‘l granatalari ikki asosiy turga bo‘linadi: hujum va mudofaa granatalari. Ularni ajratuvchi asosiy belgi — parchalarning uchib borish masofasi va shunga bog‘liq qo‘llanish sharoiti. Hujum granatasining parchalari nisbatan yaqin masofaga uchadi, shuning uchun u hujumga o‘tish paytida ishlatiladi. Mudofaa granatasining parchalari esa ancha uzoqqa ucha oladi.',
      'RGD-5 — hujum granatasi. Darslikka ko‘ra uning og‘irligi 310 g, halok qiluvchi parchalarning yetib borish radiusi 25 m. Korpusi yupqa po‘latdan yasalgan, yuqori va pastki qismlardan iborat oval shaklga ega. Ruscha ensiklopedik manbalarga ko‘ra u 1954-yilda qurollanishga qabul qilingan.',
      'F-1 — mudofaa granatasi. Uning og‘irligi 600 g, qirrali cho‘yan korpusga ega; shakli tufayli xalq orasida «limonka» deb ham ataladi. Darslikda parchalarning yetib borish radiusi 200 m deb berilgan. F-1 parchalari uloqtirish masofasidan uzoqqa ucha olgani uchun u faqat pana joydan — okop yoki to‘siq ortidan qo‘llaniladi.'
    ]},
    {sarlavha:'Umumiy tuzilishi (nomlar darajasida)', xatboshilar:[
      'Har ikkala granata uch asosiy qismdan iborat: korpus, portlovchi zaryad va zapal. Korpus portlovchi zaryad va zapal trubkasini joylash uchun xizmat qiladi, portlash paytida esa parchalar hosil qiladi. Korpus materiali va shakli turlicha: RGD-5 da silliq po‘lat, F-1 da qirrali cho‘yan.',
      'Portlovchi zaryad korpusni parchalash uchun mo‘ljallangan. Zapal esa UZRGM deb ataladi — bu «qo‘l granatasining unifikatsiyalashgan modernizatsiyalangan zapali» degan ma’noni bildiradi. «Unifikatsiyalashgan» so‘zi bitta zapal turi bir necha granata uchun umumiy ekanini anglatadi. Zapal zarbdor mexanizm va zapalning o‘zidan iborat bo‘lib, ichidagi sekinlashtiruvchi modda tufayli ma’lum vaqtdan keyin ishlaydi.',
      'Darslik ikkala granata uchun sekinlashish vaqtini 3,2–4,2 soniya deb ko‘rsatadi. Bu raqamni bilishdan maqsad — granata bilan bog‘liq har qanday vaziyatda vaqt juda kam ekanini tushunishdir. Zapal granatadan alohida saqlanadi, shuning uchun 3D modelda ham ular alohida qism sifatida ko‘rsatilgan. Portlovchi zaryad esa modelda umuman ko‘rsatilmaydi — o‘quvchi uchun uning nomi va vazifasini bilish yetarli.'
    ]},
    {sarlavha:'Raqamlarni to‘g‘ri tushunish', xatboshilar:[
      'Darslik jadvalida F-1 uchun 200 m, RGD-5 uchun 25 m radius berilgan. Boshqa ensiklopedik manbalarda F-1 ning samarali zararlash radiusi «50 m gacha» deb ko‘rsatiladi. Bu ziddiyat emas, balki ikki xil tushunchadir: 200 m — alohida parchalar xavfli tarzda yetib borishi mumkin bo‘lgan eng katta masofa, 50 m — zararlash ehtimoli yuqori bo‘lgan zona. Bu talqin mutaxassis tomonidan tasdiqlanishi kerak, ammo xulosa bitta: xavfli masofa ko‘z bilan chamalaganimizdan ancha katta.',
      'Uloqtirish masofasi ham darslikda keltirilgan: RGD-5 uchun o‘rtacha 40–50 m, F-1 uchun 35–45 m (ruscha manbada RGD-5 uchun 30–50 m). F-1 da parchalar radiusi uloqtirish masofasidan katta — aynan shu sababli mudofaa granatasi pana joysiz ishlatilmaydi. Bu misol harbiy qoidalar tasodifiy emas, balki fizik faktlarga asoslanganini ko‘rsatadi.',
      'Ushbu raqamlar faqat taqqoslash va xavfni anglash uchun o‘rganiladi. Test savollarida «hujum — kichik radius, mudofaa — katta radius» mantiqini eslab qolish yetarli. Og‘irlik farqi ham shu mantiqqa mos: cho‘yan korpusli F-1 (600 g) po‘lat korpusli RGD-5 (310 g) dan qariyb ikki baravar og‘ir. Og‘irroq va qalinroq korpus ko‘proq va og‘irroq parcha hosil qiladi, shuning uchun xavfli zona ham kengroq bo‘ladi.'
    ]},
    {sarlavha:'Xavfsizlik va intizom', xatboshilar:[
      'Darslikda granatalar bilan muomala qilish qoidalari qat’iy belgilangan. Zarbdor mexanizmni tekshirish va qismlarga ajratish qat’iyan taqiqlanadi. Granatalar maxsus sumkada, zapallar esa granatadan alohida, qog‘ozga o‘ralgan holda saqlanadi. Yorilgan, egilgan yoki zanglagan zapallarni ishlatish man etiladi.',
      'Granatani zarbadan, olovdan va namlikdan saqlash lozim; olov oldida quritish taqiqlanadi. Uloqtirilgan, lekin portlamagan granataga tegish qat’iyan man etiladi. Harbiy mashg‘ulotlarda po‘lat dubulg‘a kiyish tavsiya etiladi. Bu qoidalarning har biri real baxtsiz hodisalar tajribasidan kelib chiqqan.',
      'Maktab darsida jangovar granata ishlatilmaydi — faqat inert o‘quv maketlari va 3D model. Maketni ochish, ichiga biror narsa solish yoki uni «jangovar» ko‘rinishga keltirish taqiqlanadi. Maketni o‘yinchoq sifatida otish, odamga qaratib uloqtirish ham intizomni buzish hisoblanadi.',
      'Harbiy intizomning mohiyati — qoidani «nima uchun» ekanini tushunib, uni har safar, hech kim kuzatmayotganda ham bajarish. Zapalning alohida saqlanishi, olovdan uzoq tutish, portlamagan buyumga yaqinlashmaslik — bularning barchasi bitta maqsadga xizmat qiladi: tasodifiy portlashning oldini olish. O‘quvchi maket bilan ishlaganda ham xuddi shu tartibni saqlasa, bu odat unga kelajakda xizmatda va hayotda asqotadi.'
    ]},
    {sarlavha:'Topilgan portlamagan buyum va ko‘p uchraydigan xatolar', xatboshilar:[
      'Dalada, qurilish joyida yoki tog‘da notanish metall buyum topsangiz, birinchi qadam — to‘xtash va unga tegmaslik. Buyumni ko‘tarmang, tepmang, tosh otmang, olovga tashlamang. Yoningizdagilarni yaqinlashtirmang, joyni eslab qolib yoki belgilab, kelgan yo‘lingiz bo‘ylab xavfsiz masofaga keting. Keyin darhol kattalarga va tegishli xizmatga (militsiya, favqulodda vaziyatlar xizmati) xabar bering.',
      'Eng xavfli xato — «eski, zanglagan, demak portlamaydi» deb o‘ylash. Vaqt o‘tishi bilan portlovchi buyum aksincha beqaror bo‘lib qolishi mumkin. Ikkinchi xato — topilmani «qiziq narsa» sifatida uyga, maktabga olib kelish yoki suratga olish uchun yaqinlashish. Uchinchi xato — kinofilmlardagi sahnalarga ishonish: filmlarda ko‘rsatiladigan harakatlar ko‘pincha haqiqatga to‘g‘ri kelmaydi.',
      'Eslab qolish uchun uch so‘z: «TO‘XTA — TEGMA — XABAR BER». Test uchun esa: RGD-5 — hujum, 310 g, 25 m; F-1 — mudofaa, 600 g, 200 m; zapal UZRGM, 3,2–4,2 s; uch qism — korpus, zaryad, zapal.'
    ]}
  ],
  qiziqarli:[
    'F-1 granatasi qirrali cho‘yan korpusi shakli tufayli xalq orasida «limonka» deb ataladi (ruscha Wikipedia, «Ф-1 (граната)»).',
    'RGD-5 va F-1 uchun bitta zapal — UZRGM ishlatiladi; nomidagi «unifikatsiyalashgan» so‘zi shuni bildiradi (10-sinf darsligi, 147–148-betlar).',
    'Ruscha ensiklopedik manbaga ko‘ra RGD-5 1954-yilda qurollanishga qabul qilingan (ruscha Wikipedia, «РГД-5»).',
    'F-1 parchalari uloqtirish masofasidan (35–45 m) ancha uzoqqa ucha olgani uchun u faqat pana joydan qo‘llaniladi (10-sinf darsligi, 147, 151-betlar).'
  ],
  lugat:[
    ['Parchalanuvchi granata','Portlaganda korpus parchalari bilan ta’sir qiladigan qo‘l granatasi.'],
    ['Hujum granatasi','Parchalar radiusi kichik (RGD-5 — 25 m), hujumga o‘tishda ishlatiladi.'],
    ['Mudofaa granatasi','Parchalar uzoqqa uchadi (F-1 — 200 m gacha), faqat pana joydan qo‘llaniladi.'],
    ['Korpus','Zaryad va zapal trubkasini joylaydigan, portlashda parchalar hosil qiladigan qobiq.'],
    ['Portlovchi zaryad','Korpusni parchalash uchun mo‘ljallangan modda.'],
    ['Zapal','Granatani ma’lum vaqtdan keyin portlatadigan qurilma; alohida saqlanadi.'],
    ['UZRGM','Qo‘l granatasining unifikatsiyalashgan modernizatsiyalangan zapali.'],
    ['Sekinlashish vaqti','Zapal ishga tushgandan portlashgacha bo‘lgan vaqt (3,2–4,2 s).'],
    ['Inert maket','Portlovchi moddasiz, faqat o‘quv uchun mo‘ljallangan nusxa.'],
    ['Pana joy','Parchalardan himoya qiladigan to‘siq, okop yoki chuqurlik.']
  ],
  bolimlar:[
    {sarlavha:'Saqlash va muomala qoidalari (darslik bo‘yicha)', tartibli:true, punktlar:[
      'Zarbdor mexanizmni tekshirish va qismlarga ajratish <b>qat’iyan taqiqlanadi</b>',
      'Granatalar maxsus sumkada saqlanadi',
      'Zapallar granatadan <b>alohida</b>, qog‘ozga o‘ralgan holda saqlanadi',
      'Yorilgan, egilgan, zanglagan zapallarni ishlatish man etiladi',
      'Granata zarbadan, olovdan va namlikdan saqlanadi',
      'Olov oldida quritish taqiqlanadi',
      'Portlamagan granataga <b>tegish qat’iyan man etiladi</b>'
    ]},
    {sarlavha:'Maktab darsidagi intizom', jadval:[
      ['Nima ishlatiladi','faqat inert o‘quv maketi va 3D model'],
      ['Maketni ochish','taqiqlanadi'],
      ['Maketni uloqtirib o‘ynash','taqiqlanadi — intizom buzilishi'],
      ['Maketni odamga qaratish','taqiqlanadi'],
      ['Darsdan tashqariga olib chiqish','taqiqlanadi, maketni o‘qituvchi saqlaydi'],
      ['Hayotda notanish buyum','to‘xta — tegma — xabar ber']
    ]}
  ],
  test:[
    {s:'F-1 granatasining korpusi nimadan yasalgan?', v:['Yupqa po‘latdan','Plastmassadan','Qirrali cho‘yandan','Alyuminiydan'], t:2,
     izoh:'F-1 — <b>qirrali cho‘yan</b> korpusli; RGD-5 korpusi yupqa po‘latdan.'},
    {s:'Qaysi zapallarni ishlatish man etiladi?', v:['Qog‘ozga o‘ralganlarini','Yorilgan, egilgan yoki zanglaganlarini','Alohida saqlanganlarini','Sumkada saqlanganlarini'], t:1,
     izoh:'Darslikka ko‘ra <b>yorilgan, egilgan, zanglagan</b> zapallarni ishlatish man etiladi.'},
    {s:'Dalada eski, zanglagan metall buyum topdingiz. To‘g‘ri harakat qaysi?', v:['Zanglagani uchun xavfsiz deb uyga olib ketish','Tosh otib tekshirish','Olovga tashlab yo‘q qilish','Tegmasdan joyni tark etish va xabar berish'], t:3,
     izoh:'Eski buyum ham xavfli bo‘lib qoladi. To‘g‘ri harakat: <b>to‘xta — tegma — xabar ber</b>.'}
  ],
  manbaQosh:'10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2017), 147–152-betlar; manba/harbiy_mazmun.md 3-bo‘lim; ruscha Wikipedia «РГД-5», «Ф-1 (граната)», «УЗРГМ» — solishtirish uchun ([ZID]: F-1 radiusi 200 m / 50 m talqini mutaxassis tasdig‘ini talab qiladi). Tayyorlash va ishlatish usullari ataylab keltirilmagan.'
});

/* ================= HARBIY: TEXNIKA ================= */
qosh('harbiy-texnika', {
  kor:{matn:'Tank, bronetransportyor (BTR) va piyodaning jangovar mashinasi (BMP) — zirhli texnikaning uch asosiy turi, transport-desant vertolyoti esa qo‘shinlarni havo orqali tashiydi. Ularni yurish qismi (zanjir yoki g‘ildirak), vazifasi, qurollanishi va desant tashish imkoniyati ajratib turadi. «Boshqaruv»dagi tugmalar bilan mashinani almashtiring va korpus, minora hamda yurish qismini alohida ko‘ring. <b>Diqqat:</b> 3D modellar umumiy bepul modellar — aniq T-72, BTR-80 yoki Mi-8 nusxasi emas; texnik raqamlar esa darslik va belgilangan manbalardan.'},
  maqola:[
    {sarlavha:'Kirish: nima uchun texnikani bilish kerak?', xatboshilar:[
      '10-sinf darsligining «Harbiy ish asoslari» bo‘limida O‘zbekiston Respublikasi qo‘shinlarining qurol-aslahasi va harbiy texnikasi o‘rganiladi. Darslikda T-72 tanki, BTR-80 bronetransportyori va BMP-2 piyodaning jangovar mashinasi keltirilgan. Bu mavzu zamonaviy jangda piyoda askar yolg‘iz emas, balki texnika bilan hamkorlikda harakat qilishini tushunishga yordam beradi.',
      'Texnika turlarini farqlay olish harbiy xizmatda ham, kasb tanlashda ham foydali. Mexanik-haydovchi, o‘q otuvchi-operator, bort texnigi, ta’mirlash ustasi kabi harbiy mutaxassisliklar aynan shu mashinalar bilan bog‘liq. Bundan tashqari, texnika ko‘rgazmalari va paradlarda ko‘rgan mashinangizni nomlay olish Qurolli Kuchlarimizga bo‘lgan qiziqishni oshiradi.',
      'Darsda mashinalarning tashqi ko‘rinishi, kompanovkasi (ichki bo‘limlarning joylashuvi), ekipaji va asosiy ko‘rsatkichlari taqqoslanadi. Raqamlar darslikdan olingan; darslikda yo‘q ma’lumotlar (masalan, Mi-8) qo‘shimcha manba sifatida alohida belgilangan.'
    ]},
    {sarlavha:'Asosiy turlar va ularning tuzilishi', xatboshilar:[
      'Tank — kuchli qurol-aslaha, ishonchli zirh va yuqori manyovrchanlikka ega zanjirli jangovar mashina. T-72 ekipaji uch kishi: komandir, o‘q otuvchi-operator va mexanik-haydovchi. Asosiy quroli — 125 mm silliq stvolli to‘p, qo‘shimcha ravishda 7,62 mm juftlashtirilgan pulemyot va 12,7 mm zenit pulemyoti o‘rnatilgan. Darslikka ko‘ra massasi 44 t, dvigateli 840 ot kuchiga ega; shossedagi tezligi 60 km/soat, yurish zaxirasi 700 km, kechib o‘tadigan suv chuqurligi 1,2–1,8 m.',
      'BTR-80 — g‘ildirakli, zirhlangan, suzuvchi jangovar mashina. Uning vazifasi motoo‘qchilarni tashish va yengil zirhli nishonlarni zararlash. G‘ildirak formulasi 8×8, ya’ni sakkizta g‘ildirakning hammasi yetaklovchi. Darslikka ko‘ra ekipaj 3 kishi, desant 8 kishi (ruscha manbada 7), jangovar massa 13,6 t, shossedagi tezlik 90 km/soat (boshqa manbada 80), suvda 9,5 km/soat, yurish zaxirasi 600 km. Qurollanishi — 14,5 mm KPVT yirik kalibrli va 7,62 mm PKT pulemyotlari.',
      'BMP-2 — motoo‘qchi bo‘linmalar bilan birga jang olib borish uchun mo‘ljallangan zanjirli, suzuvchi mashina. Ekipaji 3 kishi, desant 7 kishi. Darslikka ko‘ra jangovar massasi 14 t (ruscha manbada 14,7 t), quruqlikda tezligi 65 km/soat, suvda 6–7 km/soat, yurish zaxirasi 550 km. Qurollanishi: 500 o‘q-dorili 30 mm 2A42 avtomatik to‘p, 2000 patronli 7,62 mm PKT pulemyoti va 4 ta tankka qarshi boshqariluvchi raketa (PTUR).',
      'Mi-8 — ko‘p maqsadli transport-desant vertolyoti, u 10-sinf darsligida alohida keltirilmagan. Ensiklopedik manbalarga ko‘ra ekipaji 3 kishi (komandir, ikkinchi uchuvchi, bort texnigi), 24 kishilik desant yoki 12 ta zambilni tashiy oladi. Eng yuqori tezligi 250 km/soat, 5 parrakli asosiy vintining diametri 21,29 m, dum qismida 3 parrakli rul vinti bor.'
    ]},
    {sarlavha:'Kompanovka: mashina ichida nima qayerda?', xatboshilar:[
      'Kompanovka — mashina ichidagi bo‘limlarning o‘zaro joylashuvi. T-72 da klassik kompanovka qo‘llanilgan: oldinda boshqaruv bo‘limi (mexanik-haydovchi), o‘rtada minorali jangovar bo‘lim (komandir va o‘q otuvchi), orqada motor-transmissiya bo‘limi. Bunday joylashuvda eng qalin old zirh ekipajni himoya qiladi.',
      'BMP-2 da esa boshqacha yechim tanlangan: motor-transmissiya bo‘limi oldinda, o‘rtada ikki kishilik minorali jangovar bo‘lim, orqada esa desant bo‘limi. Dvigatel oldinda bo‘lgani uchun desant askarlari mashinaning orqa tomonidan, ya’ni dushmandan pana tomondan tushishi mumkin. BTR-80 da oldinda boshqaruv bo‘limi, o‘rtada desant bo‘limi, orqada motor-transmissiya bo‘limi joylashgan.',
      'Kompanovkani tushunish mashinaning vazifasini tushunishga yordam beradi. Tankda desant bo‘limi umuman yo‘q — u askar tashimaydi. BTR va BMP da esa desant bo‘limi bor, lekin BMP kuchliroq qurollangan va zanjirli bo‘lgani uchun piyoda bilan birga jangda qatnashadi. 3D sahnadagi «Rentgen» rejimida bo‘limlarni sxematik tarzda kuzating.'
    ]},
    {sarlavha:'Qisqacha tarix', xatboshilar:[
      'Tanklar birinchi marta Birinchi jahon urushida, 1916-yil sentyabrida Somme daryosi bo‘yidagi janglarda Britaniya armiyasi tomonidan qo‘llangan. Ular okoplar va tikanli simlardan o‘tish uchun yaratilgan edi. Keyingi o‘n yilliklarda tanklar tezroq, kuchliroq qurollangan va yaxshiroq himoyalangan mashinalarga aylandi.',
      'T-72 tanki ensiklopedik manbalarga ko‘ra 1973-yilda qurollanishga qabul qilingan va dunyoning ko‘plab davlatlarida ishlatilgan. BMP-2 1980-yilda, BTR-80 esa 1980-yillar o‘rtalarida qabul qilingan. Mi-8 vertolyotining birinchi tajriba nusxasi 1961-yilda havoga ko‘tarilgan va u dunyodagi eng ko‘p ishlab chiqarilgan vertolyotlardan biriga aylangan.',
      'Bu mashinalarning ko‘pchiligi o‘nlab yillar davomida zamonaviylashtirilib kelinadi, shuning uchun bir nomdagi mashinaning turli modifikatsiyalari ko‘rsatkichlari farq qiladi. Masalan, T-72 massasi manbaga qarab 41 t dan 44,5 t gacha, dvigatel quvvati 780 dan 840 ot kuchigacha beriladi. Darsda darslikdagi qiymatlar asos qilinadi.'
    ]},
    {sarlavha:'Xizmatda qo‘llanishi va kasblar', xatboshilar:[
      'Zamonaviy jangda texnika turlari bir-birini to‘ldiradi. Tank olov kuchi va zirhi bilan dushman mudofaasini yorib o‘tadi, BMP motoo‘qchilarni jang maydoniga yetkazib, ularni o‘z quroli bilan qo‘llab-quvvatlaydi. BTR g‘ildirakli bo‘lgani uchun yo‘lda tezroq harakatlanadi va askarlarni uzoq masofaga tashishda qulay. Vertolyot esa odam va yukni tog‘li yoki yo‘l yo‘q hududlarga tez yetkazadi.',
      'Suzuvchi mashinalar (BTR-80, BMP-2) daryo va kanallardan ko‘priksiz o‘ta oladi, T-72 esa ma’lum chuqurlikdagi suvni kechib o‘tadi. Transport vertolyotlari tinch davrda ham muhim: favqulodda vaziyatlarda yaradorlarni evakuatsiya qilish, qutqaruv guruhlarini tashish va yuk yetkazishda ishlatiladi. Mi-8 da 12 ta zambil joylashtirish imkoniyati aynan shunday vazifalar uchun.',
      'Har bir mashina ortida butun bir mutaxassislar jamoasi turadi: ekipaj a’zolari, texnik xizmat ko‘rsatuvchilar, ta’mirlovchilar, aloqachilar. Bu kasblar mexanika, elektronika va dvigatellar bo‘yicha chuqur bilim talab qiladi. Fizika va texnologiya fanlarini yaxshi o‘zlashtirgan o‘quvchi uchun bu yo‘nalishlar ochiq.'
    ]},
    {sarlavha:'Xavfsizlik va intizom',
     xatboshilar:[
      'Texnika ko‘rgazmasida yoki harbiy qismga ekskursiyada mashinaga faqat rahbar ruxsati bilan yaqinlashiladi, unga chiqiladi va tushiladi. Harakatlanayotgan yoki dvigateli ishlab turgan texnika oldida va orqasida turish taqiqlanadi, chunki mexanik-haydovchining ko‘rish maydoni cheklangan. Zanjir va g‘ildiraklar yonida turish ham xavfli.',
      'Minora, lyuklar va boshqa mexanizmlarni o‘zboshimchalik bilan harakatga keltirish mumkin emas. Og‘ir lyuk qopqog‘i qo‘lni jarohatlashi, aylanayotgan minora esa odamni qisib qo‘yishi mumkin. Ishlab turgan vertolyot vintlari yaqiniga borish qat’iyan man etiladi.',
      'Texnik ko‘rsatkichlar haqida gapirganda ham intizom kerak: darsda faqat ochiq manbalardagi ma’lumotlar o‘rganiladi. O‘zbekiston Qurolli Kuchlaridagi texnika soni bo‘yicha rasmiy tasdiqlangan ma’lumot yo‘q, shuning uchun darsda bunday raqamlar keltirilmaydi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Birinchi xato — har qanday zirhli mashinani «tank» deb atash. Tekshirish oson: g‘ildirakli bo‘lsa — BTR; zanjirli, kichikroq to‘pli va orqa eshikli bo‘lsa — BMP; zanjirli, katta to‘pli va desant eshigi yo‘q bo‘lsa — tank. Ikkinchi xato — BMP-2 va BMP-1 qurolini chalkashtirish: BMP-2 da 30 mm avtomatik to‘p, 73 mm to‘p esa BMP-1 da.',
      'Uchinchi xato — ekipaj va desantni aralashtirish. Ekipaj mashinani boshqaradi va undan jang olib boradi, desant esa mashinada tashiladigan askarlar. «Uchlik qoidasi»ni eslang: T-72, BTR-80, BMP-2 va Mi-8 — to‘rttasining ham ekipaji 3 kishi.',
      'Raqamlarni eslash uchun juftliklardan foydalaning: «T-72 — 125 mm, 3 kishi»; «BTR-80 — 8×8, 14,5 mm»; «BMP-2 — 30 mm, desant 7»; «Mi-8 — 250 km/soat, desant 24». Kompanovka uchun: tankda motor orqada, BMP da motor oldinda.'
    ]}
  ],
  qiziqarli:[
    'Tanklar ilk bor 1916-yil 15-sentyabrda Somme janglari davomida (Fler-Kurselet) Britaniya armiyasi tomonidan qo‘llangan (Britannica, «tank»).',
    'Mi-8 ning birinchi tajriba nusxasi 1961-yilda uchgan; u dunyodagi eng ko‘p ishlab chiqarilgan vertolyotlardan biri hisoblanadi (Wikipedia, «Mil Mi-8»).',
    'BTR-80 ning 8×8 g‘ildirak formulasi sakkizala g‘ildirak ham yetaklovchi ekanini bildiradi; u suvda suzib o‘ta oladi (10-sinf darsligi, 85-bet; ruscha Wikipedia «БТР-80»).',
    'BMP-2 da dvigatel oldinda joylashgan — shu tufayli desant bo‘limi orqada va askarlar orqa eshiklardan tushadi (ruscha Wikipedia, «БМП-2»).',
    'Mi-8 asosiy (ko‘taruvchi) vintining diametri 21,29 m, parraklari soni — 5 ta (ruscha Wikipedia, «Ми-8»).'
  ],
  lugat:[
    ['Tank','Kuchli qurol, qalin zirh va yuqori manyovrchanlikka ega zanjirli jangovar mashina.'],
    ['BTR (bronetransportyor)','Motoo‘qchilarni tashish uchun g‘ildirakli zirhli suzuvchi mashina.'],
    ['BMP (piyodaning jangovar mashinasi)','Desant bilan birga jang qiladigan zanjirli zirhli mashina.'],
    ['Ekipaj','Mashinani boshqaradigan va undan jang olib boradigan harbiylar.'],
    ['Desant','Mashina yoki vertolyotda tashiladigan askarlar.'],
    ['Kompanovka','Mashina ichidagi bo‘limlarning o‘zaro joylashuvi.'],
    ['Minora','Qurol o‘rnatilgan, aylanadigan zirhli qism.'],
    ['Yurish qismi','Zanjir yoki g‘ildiraklar, tayanch g‘ildiraklar va osma tizimi.'],
    ['G‘ildirak formulasi','Jami g‘ildiraklar va yetaklovchi g‘ildiraklar soni (masalan, 8×8).'],
    ['PTUR','Tankka qarshi boshqariluvchi raketa.'],
    ['Silliq stvolli to‘p','Stvol ichida nareza bo‘lmagan to‘p (T-72 dagi 125 mm to‘p).'],
    ['Rul vinti','Vertolyot dumidagi, uning aylanib ketmasligini ta’minlaydigan kichik vint.']
  ],
  bolimlar:[
    {sarlavha:'Uch zirhli mashina taqqoslanishi', jadval:[
      ['Yurish qismi','T-72: zanjir · BTR-80: g‘ildirak 8×8 · BMP-2: zanjir'],
      ['Suzadimi','T-72: yo‘q (1,2–1,8 m kechib o‘tadi) · BTR-80: ha · BMP-2: ha'],
      ['Ekipaj / desant','T-72: 3 / — · BTR-80: 3 / 8 · BMP-2: 3 / 7'],
      ['Asosiy quroli','T-72: 125 mm to‘p · BTR-80: 14,5 mm KPVT · BMP-2: 30 mm to‘p'],
      ['Massa','T-72: 44 t · BTR-80: 13,6 t · BMP-2: 14 t'],
      ['Shossedagi tezlik','T-72: 60 · BTR-80: 90 · BMP-2: 65 km/soat'],
      ['Yurish zaxirasi','T-72: 700 · BTR-80: 600 · BMP-2: 550 km']
    ], matn:'Raqamlar 10-sinf darsligidan. Ayrim ko‘rsatkichlar boshqa manbalarda farq qiladi (BTR-80 desanti 7, tezligi 80 km/soat; BMP-2 massasi 14,7 t).'},
    {sarlavha:'Kompanovka: oldindan orqaga', jadval:[
      ['T-72','boshqaruv → jangovar (minora) → motor-transmissiya'],
      ['BTR-80','boshqaruv → desant → motor-transmissiya'],
      ['BMP-2','motor-transmissiya → jangovar (minora) → desant'],
      ['Mi-8','ekipaj kabinasi → yuk-desant kabinasi → dum to‘sini va rul vinti']
    ]}
  ],
  test:[
    {s:'BMP-2 da motor-transmissiya bo‘limi qayerda joylashgan?', v:['Orqada','Oldinda','Minorada','O‘rtada'], t:1,
     izoh:'BMP-2 da motor <b>oldinda</b>, desant bo‘limi esa orqada — askarlar pana tomondan tushadi.'},
    {s:'T-72 kechib o‘tadigan suv chuqurligi (darslik bo‘yicha)?', v:['0,5 m','3 m','1,2–1,8 m','Suzib o‘tadi'], t:2,
     izoh:'T-72 suzmaydi, <b>1,2–1,8 m</b> chuqurlikdagi suvni kechib o‘tadi.'},
    {s:'Mi-8 asosiy vintida nechta parrak bor?', v:['3','4','2','5'], t:3,
     izoh:'Asosiy vint <b>5 parrakli</b> (diametri 21,29 m), rul vinti esa 3 parrakli.'}
  ],
  manbaQosh:'10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2017), 84–93-betlar; manba/harbiy_mazmun.md 4-bo‘lim; ruscha Wikipedia «Т-72», «БТР-80», «БМП-2», «Ми-8»; Wikipedia «T-72», «Mil Mi-8»; Britannica «tank» — tarixiy sanalar. [ZID]: T-72 massasi/tezligi/dvigateli, BTR-80 tezligi va desanti, BMP-2 massasi, Mi-8 desanti.'
});

/* ================= HARBIY: PROTIVOGAZ ================= */
qosh('harbiy-protivogaz', {
  kor:{matn:'Barcha gazniqoblar filtrlovchi va izolatsiyalovchi turlarga bo‘linadi. GP-5 — filtrlovchi gazniqob: nafas olinadigan havo filtrlovchi-yutuvchi qutidan o‘tib, zaharli moddalar, radioaktiv chang va aerozollardan tozalanadi. Bu darsda GP-5 ning qismlarini, bosh o‘lchami bo‘yicha o‘lcham tanlashni, «Dala», «Tayyor» va «Jangovar» holatlarini hamda «Gazlar!» komandasida kiyish tartibini o‘rganasiz. Esda tuting: filtrlovchi gazniqob is gazi (CO) dan himoya qilmaydi.'},
  maqola:[
    {sarlavha:'Kirish: nima uchun gazniqobni bilish kerak?', xatboshilar:[
      'Gazniqob mavzusi 11-sinf darsligining «Fuqaro muhofazasi. Hayot xavfsizligi asoslari» bo‘limida o‘rganiladi. Bu bilim faqat harbiy xizmat uchun emas, tinch hayot uchun ham zarur. Kimyo korxonalari, suv tozalash inshootlari, sovutish tizimlari kabi joylarda xlor, ammiak va boshqa zaharli moddalar ishlatiladi, avariya bo‘lganda ular havoga tarqalishi mumkin.',
      'Kuchli ta’sir etuvchi zaharli moddalar birinchi navbatda nafas yo‘llari va ko‘zga ta’sir qiladi. Shuning uchun himoya vositasini bir necha soniyada to‘g‘ri kiyish hayotni saqlab qolishi mumkin. Noto‘g‘ri kiyilgan niqob esa himoya qilmaydi — burma yoki qiyshayish orqali tashqi havo kiradi.',
      'Darsda avval MAKON 3D modelida gazniqob qismlari o‘rganiladi, keyin kiyish tartibi ekranda mashq qilinadi va shundan so‘ng o‘qituvchi nazoratida haqiqiy o‘quv gazniqobida amaliyot o‘tkaziladi. Maqsad — harakatlarni avtomatik darajaga yetkazish.'
    ]},
    {sarlavha:'Himoya vositalari va GP-5 tuzilishi', xatboshilar:[
      'Nafas olish a’zolarini himoya qilish vositalariga filtrlovchi gazniqoblar, respiratorlar, changga qarshi matoli niqob va paxta-doka bog‘ich kiradi. Filtrlovchi gazniqob atrofdagi havoni tozalab beradi, izolatsiyalovchi gazniqob esa odamni tashqi havodan butunlay ajratadi va o‘z nafas manbaiga ega bo‘ladi. Respirator va paxta-doka bog‘ich asosan changdan himoya qiladi.',
      'Darslikdagi 13-rasmda GP-5 ning 13 ta qismi ko‘rsatilgan: niqob (shlem-maska), havo tozalovchi (filtrlovchi-yutuvchi) quti, trikotaj g‘ilof, nafas olish naychasi og‘zi, gaplashish moslamasi, nafas chiqarish naychasi (klapan qutisi), obturator, tepalik, peshana bog‘ichi, chakka bog‘ichi, iyak osti bog‘ichi, uzaytirib-qisqartiradigan bog‘ich va sumka (jild). Ensiklopedik manbaga ko‘ra komplekt ShM-62u shlem-maskasi, GP-5 filtrlovchi-yutuvchi qutisi va sumkadan iborat.',
      'Shlem-maska yuz, ko‘z va boshni qoplaydi va rezinadan yasalgan, shuning uchun o‘lchamiga mos bo‘lishi juda muhim. Filtrlovchi-yutuvchi quti gazniqobning «yuragi» — zaharli moddalar, radioaktiv chang va aerozollar shu yerda ushlab qolinadi. Klapan qutisidagi klapanlar havoning faqat bir yo‘nalishda o‘tishini ta’minlaydi: nafas olganda havo filtr orqali kiradi, nafas chiqarganda esa tashqariga chiqadi.'
    ]},
    {sarlavha:'Qanday ishlaydi va qanday kiyiladi: bosqichma-bosqich', xatboshilar:[
      'Gazniqob uch holatda bo‘ladi. «Dala» holatida u sumkada chap yonda osilgan bo‘ladi. «Havo xavfi» signali yoki «Gazdan himoyalanish niqoblari tayyorlansin!» komandasida gazniqob «Tayyor» holatiga keltiriladi. «Gazlar!» komandasi berilganda esa u darhol kiyiladi va «Jangovar» holatga o‘tadi.',
      '«Gazlar!» komandasida birinchi navbatda nafas olish to‘xtatiladi va ko‘zlar yumiladi — aks holda zaharli havo nafas yo‘llari va ko‘zga tushadi. Keyin bosh kiyim olinib, tizzalar orasiga qisiladi. Sumkadan niqob olinadi va ikki qo‘l bilan pastki qalin chetlaridan, bosh barmoqlar tashqarida, qolgan barmoqlar ichkarida bo‘ladigan qilib ushlanadi.',
      'Niqobning pastki qismi iyakka qo‘yiladi va qolgan qismi yuzga, bosh ustiga tortib kiyiladi; burmalar va qiyshayish bo‘lmasligi kerak. So‘ng keskin, to‘liq nafas chiqariladi — shu bilan niqob ostiga kirgan havo chiqib ketadi. Shundan keyingina ko‘zlar ochiladi, nafas tiklanadi va bosh kiyim kiyiladi.',
      'Gazniqob faqat «Gazdan himoyalanish niqoblari yechilsin!» komandasidan so‘ng yechiladi. O‘ng qo‘l bilan bosh kiyim ko‘tariladi, chap qo‘l bilan klapan qutisidan ushlab niqob pastga tortib olinadi. Keyin u artiladi va sumkaga joylanadi.'
    ]},
    {sarlavha:'O‘lcham tanlash va zamonaviy gazniqoblar', xatboshilar:[
      'Shlem-maska o‘lchami boshni ikki marta o‘lchash orqali aniqlanadi. Birinchi o‘lchov iyak ostidan tepa orqali, ikkinchisi peshonadan ensa orqali o‘tadi, natijalar qo‘shiladi. Yig‘indi 92 sm dan kam bo‘lsa — 0-o‘lcham, 92–95,5 sm — 1, 96–98,5 sm — 2, 99–102,5 sm — 3, 103 sm va undan ortiq bo‘lsa — 4-o‘lcham. Katta niqob havo o‘tkazadi, kichigi esa yuzni qisib, og‘riq beradi.',
      'GP-5 dan keyin yaratilgan GP-7 gazniqobi ham filtrlovchi turga kiradi. Ensiklopedik manbaga ko‘ra uning komplekti MGP yuz qismi, FPK filtrlovchi-yutuvchi quti, sumka, terlamaydigan plyonkalar va qo‘llanmadan iborat. Uning massasi 900 g dan oshmaydi, ko‘rish maydoni kamida 60%, −40 dan +40 °C gacha haroratda ishlaydi.',
      'Filtrlovchi gazniqoblarning umumiy cheklovi — qo‘shimcha patronsiz (DPG-3) ular is gazi (CO) va ammiakdan himoya qilmaydi. Is gazi yong‘inlarda, noto‘g‘ri ishlayotgan pechka va gaz isitgichlarida hosil bo‘ladi, u hidsiz va rangsiz. Shuning uchun gazniqob kiyib yonayotgan binoga kirish mumkin, degan fikr noto‘g‘ri va xavfli.'
    ]},
    {sarlavha:'Tarixi', xatboshilar:[
      'Kimyoviy qurol Birinchi jahon urushida keng qo‘llana boshladi. 1915-yil 22-aprelda Belgiyaning Ipr shahri yaqinida nemis qo‘shinlari xlor gazini ishlatdi va ko‘plab askarlar zaharlandi. Bu voqea samarali himoya vositasini tezkor yaratish zarurligini ko‘rsatdi.',
      '1915-yilda rus kimyogari Nikolay Zelinskiy ko‘mirli filtrli gazniqobni taklif qildi. Uning g‘oyasi faollashtirilgan ko‘mirning zaharli moddalarni o‘z yuzasida yutib olish (adsorbsiya) xossasiga asoslangan edi. Bugungi filtrlovchi-yutuvchi qutilar ham shu tamoyilning takomillashtirilgan ko‘rinishidir.',
      'Keyingi o‘n yilliklarda gazniqoblar yengillashdi, ko‘rish maydoni kengaydi, gaplashish moslamalari va ichish qurilmalari qo‘shildi. Bugun ular nafaqat armiyada, balki favqulodda vaziyatlar xizmatlarida, kimyo sanoatida va laboratoriyalarda ham qo‘llaniladi.'
    ]},
    {sarlavha:'Xavfsizlik, gigiyena va intizom', xatboshilar:[
      'Mashg‘ulotda faqat soz va tozalangan o‘quv gazniqoblari ishlatiladi, har bir o‘quvchidan keyin niqob dezinfeksiya qilinadi. Astma, nafas yoki yurak muammosi bor o‘quvchi vaqtga normativ topshirmaydi — u kuzatuvchi bo‘lib qatnashadi. Mashq paytida bosh aylansa yoki nafas qisilsa, gazniqob darhol yechiladi va o‘qituvchiga aytiladi.',
      'Gazniqob kiyish normativi uchun mo‘ljal sifatida Rossiya IIV normativi olingan: a’lo 7, yaxshi 8, qoniqarli 10 soniya. O‘zbekiston uchun rasmiy normativ topilmagan, shuning uchun baholashni o‘qituvchi amaldagi hujjat asosida belgilaydi. Shu normativga ko‘ra nafas to‘xtatilmasa, ko‘z yumilmasa yoki kiyilgandan keyin nafas chiqarilmasa, baho bir ballga pasayadi; tashqi havo kiradigan burma esa «qoniqarsiz» hisoblanadi.',
      'Intizomning asosiy qoidasi — komandani kutish. Gazniqob hid sezilmay qolgani yoki charchaganingiz uchun emas, faqat komanda berilgandan keyin yechiladi. Ko‘p zaharli moddalarning xavfli miqdori hid bilan sezilmasligi mumkin.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish usullari', xatboshilar:[
      'Birinchi xato — niqobni olishga shoshilib, nafasni to‘xtatmaslik. Ikkinchi xato — niqobni peshonadan boshlab kiyish; to‘g‘risi — iyakdan boshlash, shunda niqob yuzga zich o‘tiradi. Uchinchi xato — kiyib bo‘lgach keskin nafas chiqarishni unutish, natijada niqob ichida zaharlangan havo qoladi.',
      'To‘rtinchi xato — o‘lchamni «taxminan» tanlash. O‘lchamni bosh o‘lchovlari yig‘indisi bo‘yicha jadvaldan aniqlang va darsda bir-biringizni o‘lchab ko‘ring. Beshinchi xato — gazniqobni har qanday gazdan himoya qiladi deb o‘ylash: filtrlovchi gazniqob qo‘shimcha patronsiz (DPG-3) is gazi (CO) va ammiakdan himoya qilmaydi.',
      'Eslab qolish uchun kiyish tartibini qisqa ibora bilan takrorlang: «To‘xta — yum — ol — iyak — puf — kiy». Ya’ni nafasni to‘xtat, ko‘zni yum, niqobni ol, iyakdan kiy, keskin puflab nafas chiqar, bosh kiyimni kiy. Holatlar tartibi: «Dala → Tayyor → Jangovar». Mashqni avval sekin, har bir harakatni aniq bajarib takrorlang, tezlikni esa keyin oshiring — shoshilib qilingan xato vaqtdan ko‘ra qimmatroq turadi.'
    ]}
  ],
  qiziqarli:[
    '1915-yil 22-aprelda Ipr yaqinida xlor gazining qo‘llanishi kimyoviy qurolning keng ko‘lamda ishlatilgan ilk hollaridan biri bo‘ldi (Britannica, «chemical weapon»).',
    'Nikolay Zelinskiy 1915-yilda faollashtirilgan ko‘mirli gazniqobni taklif qilgan (Britannica, «Nikolay Dmitriyevich Zelinsky»).',
    'GP-7 gazniqobining massasi 900 g dan oshmaydi, ko‘rish maydoni kamida 60% va u −40…+40 °C haroratda ishlaydi (ruscha Wikipedia, «ГП-7»).',
    'GP-5 rasmida 13 ta qism ko‘rsatilgan — shu jumladan gaplashish moslamasi, u niqob kiyilgan holda komandani uzatish imkonini beradi (11-sinf darsligi, 39–40-betlar).'
  ],
  lugat:[
    ['Filtrlovchi gazniqob','Atrof havosini filtrlovchi-yutuvchi qutidan o‘tkazib tozalaydi.'],
    ['Izolatsiyalovchi gazniqob','Tashqi havodan butunlay ajratadi, o‘z nafas manbaiga ega.'],
    ['Shlem-maska','Yuz, ko‘z va boshni qoplaydigan rezina qism.'],
    ['Filtrlovchi-yutuvchi quti','Zaharli moddalar, radioaktiv chang va aerozollarni ushlab qoladigan qism.'],
    ['Klapan qutisi','Nafas olish va chiqarish klapanlari joylashgan qism.'],
    ['Obturator','Niqobning yuzga zich yopishishini ta’minlaydigan qism.'],
    ['Gaplashish moslamasi','Niqob kiyilgan holda gapirish va komanda berishga imkon beradi.'],
    ['Adsorbsiya','Moddaning boshqa modda (masalan, faollashtirilgan ko‘mir) yuzasida yutilishi.'],
    ['Paxta-doka bog‘ich','Changdan himoya qiluvchi oddiy vosita.'],
    ['«Jangovar» holat','«Gazlar!» komandasidan so‘ng gazniqob kiyilgan holat.'],
    ['Is gazi (CO)','Hidsiz, rangsiz zaharli gaz; filtrlovchi gazniqob undan himoya qilmaydi.']
  ],
  bolimlar:[
    {sarlavha:'Holatlar va komandalar', jadval:[
      ['«Dala» holati','gazniqob sumkada, chap yonda osilgan'],
      ['«Havo xavfi» yoki «Gazdan himoyalanish niqoblari tayyorlansin!»','«Tayyor» holatiga keltiriladi'],
      ['«Gazlar!»','darhol kiyiladi — «Jangovar» holat'],
      ['«Gazdan himoyalanish niqoblari yechilsin!»','yechiladi, artiladi, sumkaga joylanadi'],
      ['Yechishda ushlanadigan joy','chap qo‘l bilan klapan qutisi'],
      ['Mashq paytida bosh aylansa','darhol yechiladi, o‘qituvchiga aytiladi']
    ], matn:'Manba: 11-sinf darsligi, 40–41-betlar.'},
    {sarlavha:'Nafas olish a’zolarini himoya qilish vositalari', jadval:[
      ['Filtrlovchi gazniqob (GP-5, GP-7)','havoni tozalaydi; zaharli moddalar, radioaktiv chang, aerozollardan himoya'],
      ['Izolatsiyalovchi gazniqob','tashqi havodan butunlay ajratadi, o‘z nafas manbai bor'],
      ['Respirator','asosan chang va aerozollardan himoya'],
      ['Changga qarshi matoli niqob','changdan himoya, uyda tayyorlash mumkin bo‘lgan vosita'],
      ['Paxta-doka bog‘ich','changdan himoya qiluvchi oddiy vosita'],
      ['Is gazi (CO) va ammiak','qo‘shimcha patronsiz (DPG-3) filtrlovchi gazniqob himoya qilmaydi']
    ]}
  ],
  test:[
    {s:'Gazniqob «Dala» holatidan keyin qaysi holatga o‘tadi?', v:['«Tayyor»','«Jangovar»','«Yechilgan»','«Zaxira»'], t:0,
     izoh:'Tartib: <b>«Dala» → «Tayyor» → «Jangovar»</b>.'},
    {s:'Gazniqobni yechishda chap qo‘l bilan qaysi qismidan ushlanadi?', v:['Filtrlovchi-yutuvchi qutidan','Peshana bog‘ichidan','Klapan qutisidan','Sumkadan'], t:2,
     izoh:'Darslikka ko‘ra chap qo‘l bilan <b>klapan qutisidan</b> ushlab, niqob pastga tortib olinadi.'},
    {s:'Faollashtirilgan ko‘mirli gazniqobni kim taklif qilgan?', v:['Alessandro Volta','Nikolay Zelinskiy','Georg Om','Laynus Poling'], t:1,
     izoh:'<b>Nikolay Zelinskiy</b> 1915-yilda ko‘mirli filtrli gazniqobni taklif qilgan.'}
  ],
  manbaQosh:'11-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2018), 39–42-betlar; manba/harbiy_mazmun.md 5-bo‘lim; ruscha Wikipedia «ГП-5», «ГП-7»; Rossiya IIV 511-son buyrug‘i (normativ — faqat mo‘ljal, O‘zbekiston normativi [TEKSHIRILMAGAN]); Britannica — «chemical weapon», «Nikolay Dmitriyevich Zelinsky».'
});

})();
