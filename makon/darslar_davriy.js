/* MAKON — «Davriy jadval: elementlar oilasi» darsi (kimyo, 7–8-sinf). Sahna: 'davriy' (3D davriy jadval plitkalari).
   Element ma’lumotlari: lib/elementlar.js (window.MAKON_ELEMENT). Sahna rejimlari: 'turkum' | 'massa' | 'em'.
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi. Tekshiruv: manba/tekshiruv/v312_davriy.md */
(function(){
window.MAKON_DARS = window.MAKON_DARS || {};

const DM = 'PubChem Periodic Table (pubchem.ncbi.nlm.nih.gov/periodic-table); IUPAC — Periodic Table of Elements (iupac.org) va CIAAW standart atom massalari (2021); IUPAC press-relizi (2016-yil 28-noyabr) — Nh, Mc, Ts, Og nomlari; RSC Periodic Table (rsc.org/periodic-table); Encyclopaedia Britannica: «periodic table», «Dmitri Mendeleev», «Lothar Meyer», «Henry Moseley»; Royal Society — Devi medali (1882); UNESCO — Davriy jadvalning xalqaro yili (2019); 7–8-sinf «Kimyo» darsliklari (O‘zbekiston)';

/* Kimyo fani mavzular ro‘yxatiga ulash (MAKON_FAN bo‘lsa) */
(function(){
  const FAN = window.MAKON_FAN; if(!FAN) return;
  const f = FAN.find(x=>x.id==='kimyo'); if(!f) return;
  f.mavzular = f.mavzular || [];
  const nom = 'Davriy jadval: elementlar oilasi', dars = 'kimyo-davriy-jadval',
        qisqa = '118 element 3D plitkalarda: turkumlar, atom massasi va elektromanfiylik';
  const m = f.mavzular.find(x=>x.dars===dars || x.nom===nom);
  if(m){ m.dars = dars; m.nom = nom; m.qisqa = qisqa; } else f.mavzular.push({nom, dars, qisqa});
})();

Object.assign(window.MAKON_DARS, {
'kimyo-davriy-jadval': {
  fan:'kimyo', qisqaNom:'Davriy jadval', nom:'Davriy jadval: elementlar oilasi',
  qisqa:'7–8-sinf · Kimyo · davriy qonun va davriy sistema',
  sahna:'davriy',
  kor:{
    sarlavha:'118 element — 7 davr va 18 guruh',
    matn:'Davriy jadvalda barcha ma’lum kimyoviy elementlar tartib raqami (yadro zaryadi) ortib borishi bo‘yicha joylashgan. Gorizontal qatorlar — davrlar, vertikal ustunlar — guruhlar. Bir guruhdagi elementlar tashqi elektron qavati o‘xshash bo‘lgani uchun o‘xshash xossalarga ega va «oila» hosil qiladi: ishqoriy metallar, galogenlar, inert gazlar va boshqalar. Sahnadagi plitkalarni bosing: har bir elementning kartasi ochiladi. Balandlik rejimini almashtirib, atom massasi va elektromanfiylik jadval bo‘ylab qanday o‘zgarishini ko‘ring.',
    punktlar:['<b>118 ta element</b>: oxirgi to‘rttasi (Nh, Mc, Ts, Og) 2016-yilda IUPAC tomonidan nomlangan','<b>7 davr</b> — elektron qavatlar soni; <b>18 guruh</b> — IUPAC raqamlashi (eski qisqa jadvalda 8 guruh, A va B guruhchalar)','<b>Rang</b> — turkum (oila), <b>balandlik</b> — tanlangan rejim: turkum, atom massasi yoki elektromanfiylik','Lantanoid va aktinoidlar jadval ostida <b>alohida ikki qatorda</b> beriladi (ular 3-guruhga tegishli)']
  },
  bolimlar:[
    {sarlavha:'Elementlar oilalari (sahnadagi ranglar)', jadval:[
      ['Ishqoriy metallar · 6 ta','1-guruh (vodoroddan tashqari): Li, Na, K, Rb, Cs, Fr — yumshoq, suv bilan shiddatli reaksiyaga kirishadi'],
      ['Ishqoriy-yer metallar · 6 ta','2-guruh: Be, Mg, Ca, Sr, Ba, Ra'],
      ['O‘tish metallari · 38 ta','3–12-guruhlar (lantanoid va aktinoidlardan tashqari): Fe, Cu, Zn, Ag, Au, Hg …'],
      ['Lantanoidlar · 15 ta','La dan Lu gacha (Z = 57–71), 6-davr'],
      ['Aktinoidlar · 15 ta','Ac dan Lr gacha (Z = 89–103), 7-davr; hammasi radioaktiv'],
      ['Boshqa metallar · 11 ta','Al, Ga, In, Sn, Tl, Pb, Bi va 113–116-elementlar (oxirgilari taxminiy)'],
      ['Yarimmetallar · 7 ta','B, Si, Ge, As, Sb, Te, Po — metall va nometall orasidagi xossalar'],
      ['Nometallar · 7 ta','H, C, N, O, P, S, Se'],
      ['Galogenlar · 6 ta','17-guruh: F, Cl, Br, I, At, Ts (Ts xossalari taxminiy)'],
      ['Inert (nodir) gazlar · 7 ta','18-guruh: He, Ne, Ar, Kr, Xe, Rn, Og (Og xossalari taxminiy)']
    ], matn:'Turkumlarga ajratish PubChem jadvaliga asoslangan. Yarimmetallar ro‘yxati darsliklarda biroz farq qiladi: masalan, poloniy ba’zi manbalarda metall, astat esa yarimmetall deb ham beriladi. 113–118-elementlarning kimyoviy xossalari deyarli o‘rganilmagan — ularning turkumi bashoratdir.'},
    {sarlavha:'Davriy jadval tarixi', jadval:[
      ['1829','I. Dyobereyner o‘xshash elementlarning «triadalari»ni ko‘rsatdi (masalan, Cl – Br – I)'],
      ['1865','J. Nyulends «oktavalar qonuni»ni taklif qildi'],
      ['1869','D. I. Mendeleyev «Elementlar sistemasi tajribasi» jadvalini e’lon qildi — o‘sha paytda 63 ta element ma’lum edi'],
      ['1864 va 1870','L. Meyer 1864-yilda qisqa jadval, 1870-yilda to‘liqroq davriy jadval va atom hajmlari egri chizig‘ini e’lon qildi'],
      ['1875 · 1879 · 1886','Mendeleyev bashorat qilgan galliy, skandiy va germaniy topildi'],
      ['1882','London Qirollik jamiyati Mendeleyev va Meyerga Devi medalini berdi'],
      ['1913','H. Mozli rentgen spektrlari orqali tartib raqam yadro zaryadiga teng ekanini ko‘rsatdi'],
      ['2016','IUPAC 113, 115, 117, 118-elementlarga nom berdi: 7-davr to‘ldi']
    ]},
    {sarlavha:'Mendeleyevning bashoratlari', jadval:[
      ['«Ekaalyuminiy» → Galliy (Ga)','1875-yilda P. Lekok de Buabodran topgan · bashorat: atom massasi ≈68, zichligi ≈5,9 g/sm³ · haqiqatda: 69,72 va 5,9 g/sm³'],
      ['«Ekabor» → Skandiy (Sc)','1879-yilda L. Nilson topgan'],
      ['«Ekasilitsiy» → Germaniy (Ge)','1886-yilda K. Vinkler topgan · bashorat: atom massasi ≈72, zichligi ≈5,5 g/sm³, oksidi EsO₂ · haqiqatda: 72,63, 5,32 g/sm³, GeO₂'],
      ['«Ekamarganes» → Texnetsiy (Tc)','1937-yilda sun’iy olingan (K. Perrye va E. Segre)'],
      ['Te va I o‘rni','Mendeleyev atom massasi kattaroq tellurni yoddan oldin qo‘ydi — xossalariga qarab. Keyin bu to‘g‘ri ekani yadro zaryadi bilan tasdiqlandi']
    ], matn:'Mendeleyev jadvalda bo‘sh kataklar qoldirgan va ularga tegishli elementlarning xossalarini oldindan yozgan. Galliy zichligi dastlab 4,7 g/sm³ deb o‘lchangan edi; Mendeleyev xato bo‘lishi mumkinligini aytdi va qayta o‘lchash 5,9 g/sm³ ni berdi.'},
    {sarlavha:'Davr va guruh bo‘ylab qonuniyatlar', jadval:[
      ['Davr bo‘ylab chapdan o‘ngga','Yadro zaryadi ortadi · atom radiusi kichrayadi · metallik xossa susayadi, nometallik kuchayadi · elektromanfiylik ortadi'],
      ['Guruh bo‘ylab yuqoridan pastga','Elektron qavatlar soni ortadi · atom radiusi kattalashadi · metallik xossa kuchayadi · elektromanfiylik kamayadi'],
      ['Eng elektromanfiy','Ftor (3,98, Poling shkalasi)'],
      ['Eng kichik elektromanfiylik','Seziy (0,79) va fransiy (≈0,7 — baholangan qiymat)'],
      ['Davr raqami','Atomdagi elektron qavatlar soni: Na — 3-davr, 3 qavat (2, 8, 1)'],
      ['Asosiy guruhchalarda tashqi elektronlar','1–2-guruhda guruh raqamiga, 13–18-guruhda (guruh − 10) ga teng: Cl — 17-guruh, 7 ta']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Jadval tuzilishi', matn:'Plitkalar tartib raqami bo‘yicha joylashgan: chapdan o‘ngga davr, yuqoridan pastga guruh. 1-davrda atigi 2 element (H va He), 6- va 7-davrlarda esa 32 tadan. Lantanoid va aktinoidlar jadvalni juda uzun qilmaslik uchun pastga alohida chiqarilgan. Ranglar — elementlar oilasi.', rejim:'turkum'},
    {sarlavha:'Ishqoriy metallar', matn:'1-guruh: Li, Na, K, Rb, Cs, Fr. Tashqi qavatida bitta elektron bor va uni oson beradi. Natriy pichoq bilan kesiladi, suv bilan shiddatli reaksiyaga kirishadi: 2Na + 2H₂O → 2NaOH + H₂↑. Shuning uchun kerosin ostida saqlanadi. Guruhda pastga tushgan sari faollik ortadi.', rejim:'turkum', oila:'ishqoriy', element:'Na'},
    {sarlavha:'Galogenlar', matn:'17-guruh: F, Cl, Br, I, At, Ts. Nomi yunoncha — «tuz hosil qiluvchi». Tashqi qavatida 7 elektron bor va bitta elektron qabul qilishga intiladi. Xona haroratida ftor va xlor — gaz, brom — suyuqlik, yod — qattiq modda. Natriy bilan xlor birikib osh tuzi NaCl hosil qiladi.', rejim:'turkum', oila:'galogen', element:'Cl'},
    {sarlavha:'Inert gazlar', matn:'18-guruh: He, Ne, Ar, Kr, Xe, Rn, Og. Tashqi elektron qavati to‘lgan (geliyda 2, qolganlarida 8 elektron), shuning uchun ular juda kam reaksiyaga kirishadi. Lekin «mutlaqo inert» emas: 1962-yilda N. Bartlett ksenonning birinchi birikmasini oldi.', rejim:'turkum', oila:'inert', element:'Ne'},
    {sarlavha:'O‘tish metallari, lantanoid va aktinoidlar', matn:'3–12-guruhlar — o‘tish metallari: temir, mis, rux, kumush, oltin, simob. Temir 4-davr, 8-guruhda joylashgan. Lantanoidlar (57–71) va aktinoidlar (89–103) 3-guruhga tegishli, lekin pastda alohida qatorda turadi. Aktinoidlarning hammasi radioaktiv.', rejim:'turkum', oila:'otish', element:'Fe'},
    {sarlavha:'Atom massasi rejimi', matn:'Balandlik endi atom massasini bildiradi: jadval bo‘ylab massa deyarli doim ortib boradi. Lekin istisnolar bor: argon (39,95) kaliydan (39,10) og‘irroq, kobalt nikeldan, tellur yoddan og‘irroq. Mendeleyev ham tartibni massa emas, xossalar bo‘yicha qo‘ygan — bugun tartib yadro zaryadi bilan belgilanadi.', rejim:'massa', element:'Ar'},
    {sarlavha:'Elektromanfiylik rejimi', matn:'Balandlik — Poling elektromanfiyligi: atomning kimyoviy bog‘dagi elektronlarni o‘ziga tortish qobiliyati. Eng baland ustun — ftor (3,98), eng pastlari — 1-guruh pastidagi seziy va fransiy. Davr bo‘ylab o‘ngga ortadi, guruh bo‘ylab pastga kamayadi. Inert gazlarning ko‘pchiligi uchun Poling qiymati yo‘q — ular past plitka bilan ko‘rsatiladi.', rejim:'em', element:'F'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Elementni toping',
    topshiriqlar:[
      {shart:'Istalgan <b>galogenni</b> bosing.', hodisa:'element', kod:"ev.t==='galogen'", izoh:'Galogenlar — 17-guruh: <b>F, Cl, Br, I, At, Ts</b>.'},
      {shart:'<b>3-davrdagi ishqoriy metallni</b> toping.', hodisa:'element', kod:"ev.b==='Na'", izoh:'Bu <b>natriy (Na)</b>: Z = 11, 3-davr, 1-guruh, tashqi qavatida 1 elektron.'},
      {shart:'<b>Xona haroratida suyuq bo‘lgan metallni</b> toping.', hodisa:'element', kod:"ev.b==='Hg'", izoh:'<b>Simob (Hg)</b> — 25 °C da suyuq yagona metall. Brom ham suyuq, lekin u nometall.'},
      {shart:'<b>Eng elektromanfiy</b> elementni toping (elektromanfiylik rejimida eng baland ustun).', hodisa:'element', kod:"ev.b==='F'", izoh:'<b>Ftor (F)</b> — 3,98 (Poling shkalasi).'},
      {shart:'<b>4-davr, 8-guruhdagi</b> elementni toping.', hodisa:'element', kod:"ev.p===4 && ev.g===8", izoh:'Bu <b>temir (Fe)</b>: Z = 26, Ar = 55,845 — o‘tish metali.'}
    ]},
  test:[
    {s:'Hozirgi davriy jadvalda elementlar nima bo‘yicha tartiblangan?', v:['Atom massasi','Kashf etilgan yili','Tartib raqami (yadro zaryadi)','Zichligi'], t:2, izoh:'<b>Tartib raqami — yadrodagi protonlar soni</b>. Buni 1913-yilda H. Mozli ko‘rsatgan.'},
    {s:'Qaysi element ishqoriy metall?', v:['Kaliy','Kalsiy','Alyuminiy','Temir'], t:0, izoh:'<b>Kaliy (K)</b> — 1-guruh. Kalsiy — ishqoriy-yer metall, alyuminiy — boshqa metall, temir — o‘tish metali.'},
    {s:'Galogenlar qaysi guruhda joylashgan?', v:['1-guruh','2-guruh','18-guruh','17-guruh'], t:3, izoh:'<b>17-guruh</b> (eski qisqa jadvalda VIIA).'},
    {s:'Mendeleyev davriy jadvalini qaysi yilda e’lon qilgan?', v:['1829','1869','1913','1886'], t:1, izoh:'<b>1869-yil</b>. 1829 — Dyobereyner triadalari, 1913 — Mozli, 1886 — germaniy kashfiyoti.'},
    {s:'Neytral atomda neytronlar soni qanday topiladi (A — massa soni, Z — tartib raqam)?', v:['N = A + Z','N = A − Z','N = Z − A','N = A · Z'], t:1, izoh:'<b>N = A − Z</b>. Masalan, ²³Na: 23 − 11 = 12 neytron.'},
    {s:'Xona haroratida (25 °C) suyuq bo‘lgan ikki element qaysi?', v:['Galliy va seziy','Simob va galliy','Brom va yod','Brom va simob'], t:3, izoh:'<b>Brom va simob</b>. Galliy (≈29,8 °C) va seziy (≈28,5 °C) biroz issiqroqda eriydi.'},
    {s:'Elektromanfiylik davr bo‘ylab chapdan o‘ngga qanday o‘zgaradi?', v:['Ortadi','Kamayadi','O‘zgarmaydi','Avval kamayib, keyin ortadi'], t:0, izoh:'<b>Ortadi</b> (inert gazlar bundan tashqari); guruh bo‘ylab pastga esa kamayadi.'},
    {s:'Mendeleyev «ekasilitsiy» deb bashorat qilgan element qaysi?', v:['Galliy','Skandiy','Germaniy','Texnetsiy'], t:2, izoh:'<b>Germaniy</b> — 1886-yilda K. Vinkler topgan. Galliy — «ekaalyuminiy», skandiy — «ekabor».'},
    {s:'Qaysi juftlikda tartib raqami kichik element atom massasi bo‘yicha og‘irroq?', v:['Na va Mg','C va N','Ar va K','Fe va Co'], t:2, izoh:'<b>Argon (39,95) va kaliy (39,10)</b>: argon oldin turadi, lekin og‘irroq. Co/Ni va Te/I ham shunday istisnolar.'},
    {s:'2016-yilda IUPAC nom bergan elementlar qaysilar?', v:['Fl, Lv, Cn, Rg','Nh, Mc, Ts, Og','Md, No, Lr, Rf','Ds, Mt, Hs, Bh'], t:1, izoh:'<b>Nihoniy (113), moskoviy (115), tennessin (117), oganesson (118)</b> — 2016-yil 28-noyabrda tasdiqlangan.'}
  ],
  yordamchi:[
    {s:'Nega eski darsliklarda 8 ta guruh, sahnada esa 18 ta?', j:'Rus va o‘zbek darsliklarida ko‘pincha qisqa jadval ishlatiladi: 8 guruh, har biri A (asosiy) va B (qo‘shimcha) guruhchalarga bo‘lingan. IUPAC 1988-yildan guruhlarni 1 dan 18 gacha raqamlashni tavsiya qiladi. Moslik: IA = 1, IIA = 2, IIIA = 13, … VIIA = 17, VIIIA = 18; B guruhchalar — 3–12-guruhlar (o‘tish metallari).', kalit:['guruh','8','18','qisqa']},
    {s:'Nega ba’zi elementlarning massasi butun son?', j:'Barqaror izotopi bo‘lmagan (faqat radioaktiv) elementlar uchun standart atom massasi yo‘q. Ularning o‘rniga eng uzoq yashaydigan izotopning massa soni beriladi, masalan texnetsiy — 97, prometiy — 145, oganesson — 294. Bu qiymatlar yangi izotoplar topilishi bilan o‘zgarishi mumkin va manbalarda biroz farq qiladi.', kalit:['massa','butun','izotop']},
    {s:'Vodorod nega 1-guruhda, lekin ishqoriy metall emas?', j:'Vodorodning tashqi qavatida ham bitta elektron bor, shuning uchun u 1-guruhda turadi. Lekin oddiy sharoitda u H₂ molekulalaridan iborat rangsiz gaz va nometall xossalariga ega. Ba’zi jadvallarda vodorod 17-guruh ustida ham ko‘rsatiladi.', kalit:['vodorod','h']},
    {s:'Elektromanfiylik nima va nega inert gazlarda yo‘q?', j:'Elektromanfiylik — atomning kimyoviy bog‘dagi umumiy elektronlarni o‘ziga tortish qobiliyati. Poling shkalasi bog‘ energiyalaridan hisoblanadi, shuning uchun birikma hosil qilmaydigan He, Ne, Ar uchun qiymat yo‘q. Kripton va ksenonning birikmalari bor, ularga 3,00 va 2,60 qiymatlari berilgan.', kalit:['elektromanfiy','em','inert']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega elementlarni tartiblash kerak?', xatboshilar:[
      'Kimyoviy element — yadrosida bir xil sondagi proton bo‘lgan atomlar turi. Bugun 118 ta element ma’lum: ularning 90 dan ortig‘i tabiatda (ba’zilari juda oz miqdorda) uchraydi, qolganlari laboratoriyada sun’iy olingan. Har bir elementning o‘z xossalari bor, lekin ular orasida hayratlanarli o‘xshashliklar ham bor: litiy, natriy va kaliy bir-biriga juda o‘xshaydi, ftor, xlor va brom ham shunday.',
      'XIX asrning boshida olimlar bu o‘xshashliklarni tartibga solishga harakat qildi. 1829-yilda nemis kimyogari Iogann Dyobereyner o‘xshash elementlarning uchtalik guruhlarini — «triadalar»ni ko‘rsatdi. Masalan, xlor, brom va yod triadasida bromning atom massasi qolgan ikkitasining o‘rtachasiga yaqin. 1865-yilda ingliz kimyogari Jon Nyulends elementlarni massa bo‘yicha qatorga terib, har sakkizinchi element xossalari takrorlanishini payqadi va buni «oktavalar qonuni» deb atadi.',
      'Bu urinishlar muhim edi, lekin barcha elementlarni qamrab ololmadi. Elementlar orasidagi umumiy qonuniyatni topish va undan yangi elementlarni bashorat qilish uchun foydalanish sharafi rus kimyogari Dmitriy Ivanovich Mendeleyevga nasib etdi. Sahnadagi 3D jadval ana shu g‘oyaning bugungi ko‘rinishidir.'
    ]},
    {sarlavha:'Mendeleyev va Meyer', xatboshilar:[
      'Mendeleyev 1869-yilda elementlarni atom massasi bo‘yicha tartiblab, xossalari o‘xshashlarini bir ustunga qo‘ygan jadvalni e’lon qildi. O‘sha paytda 63 ta element ma’lum edi. Uning asosiy xulosasi — davriy qonun: elementlarning xossalari atom massasiga davriy bog‘liq. U jadvalni tuzar ekan, xossalarga ko‘proq ishondi: agar massa tartibi o‘xshashlik tartibiga to‘g‘ri kelmasa, u elementning o‘rnini almashtirdi, masalan tellurni yoddan oldin qo‘ydi.',
      'Mendeleyevning eng dadil qadami — hali topilmagan elementlar uchun bo‘sh kataklar qoldirishi edi. U ularni «ekabor», «ekaalyuminiy», «ekasilitsiy» deb atadi va massasini, zichligini, birikmalarining tarkibini oldindan yozdi. 1875-yilda galliy, 1879-yilda skandiy, 1886-yilda germaniy topildi va ularning xossalari bashoratga juda yaqin chiqdi. Masalan, germaniy uchun u atom massasini ≈72 va zichligini ≈5,5 g/sm³ deb aytgan; haqiqiy qiymatlar 72,63 va 5,32 g/sm³.',
      'Deyarli bir vaqtda nemis kimyogari Lotar Meyer ham shunga o‘xshash natijaga keldi. U 1864-yilda qisqa jadval, 1870-yilda esa to‘liqroq davriy jadvalni va atom hajmlarining massa bo‘yicha davriy o‘zgarishini ko‘rsatuvchi egri chiziqni e’lon qildi. 1882-yilda London Qirollik jamiyati Mendeleyev va Meyerni birgalikda Devi medali bilan taqdirladi. Shunga qaramay, davriy jadval ko‘pincha Mendeleyev nomi bilan bog‘lanadi — asosan uning bashoratlari tasdiqlangani uchun.',
      'Mendeleyev sharafiga 101-element mendeleviy deb nomlangan. 2019-yil davriy jadvalning 150 yilligi munosabati bilan BMT tomonidan Davriy jadvalning xalqaro yili deb e’lon qilingan.'
    ]},
    {sarlavha:'Davriy qonunning zamonaviy talqini', xatboshilar:[
      'Mendeleyev davrida atom tuzilishi noma’lum edi. 1913-yilda ingliz fizigi Genri Mozli elementlarning rentgen nurlanishini o‘rganib, har bir elementning tartib raqami uning yadro zaryadiga teng ekanini ko‘rsatdi. Shundan keyin davriy qonun yangicha ta’riflandi: elementlarning xossalari atom yadrosi zaryadiga (tartib raqamiga) davriy bog‘liq.',
      'Bu talqin Mendeleyevning «istisnolari»ni tushuntirdi. Argonning atom massasi (39,95) kaliynikidan (39,10) katta, lekin tartib raqami kichik: 18 va 19. Sabab — izotoplar: tabiiy argon asosan og‘ir argon-40 dan, kaliy esa yengil kaliy-39 dan iborat. Kobalt va nikel, tellur va yod, toriy va protaktiniy, uran va neptuniy juftliklarida ham shunday holat bor. Sahnadagi «massa» rejimida bu joylarda plitka balandligi pasayib qolganini ko‘rasiz.',
      'Atom tuzilishi jadval shaklini ham tushuntiradi. Davr raqami atomdagi elektron qavatlar soniga teng: natriy 3-davrda, uning elektronlari uchta qavatda joylashgan (2, 8, 1). Asosiy guruhchalarda tashqi qavatdagi elektronlar soni guruh raqami bilan bog‘liq: 1-guruhda 1 ta, 2-guruhda 2 ta, 13–18-guruhlarda esa 3 tadan 8 tagacha. Aynan tashqi elektronlar elementning kimyoviy xossalarini belgilaydi.',
      'Jadvalning ikki xil shakli bor. Qisqa jadvalda 8 guruh bo‘lib, har biri A (asosiy) va B (qo‘shimcha) guruhchalarga bo‘linadi — bu shakl ko‘p yillar rus va o‘zbek darsliklarida ishlatilgan. Uzun jadvalda esa 18 guruh bor; IUPAC 1988-yildan bu raqamlashni tavsiya qiladi. Sahnadagi 3D jadval uzun shaklda qurilgan.'
    ]},
    {sarlavha:'Elementlar oilalari', xatboshilar:[
      'Ishqoriy metallar (1-guruh: Li, Na, K, Rb, Cs, Fr) — yumshoq, yengil va juda faol metallar. Tashqi qavatidagi bitta elektronni oson berib, +1 zaryadli ionga aylanadi. Suv bilan reaksiyaga kirishib ishqor va vodorod hosil qiladi, shuning uchun ularni kerosin ostida saqlashadi. Guruhda pastga tushgan sari faollik ortadi: litiy suvda sekin, kaliy esa alanga bilan reaksiyaga kirishadi. Ishqoriy-yer metallar (2-guruh: Be, Mg, Ca, Sr, Ba, Ra) ham faol, lekin ishqoriy metallardan kamroq.',
      'Galogenlar (17-guruh: F, Cl, Br, I, At) — faol nometallar. Nomi yunoncha «tuz hosil qiluvchi» degan ma’noni beradi: ular metallar bilan birikib tuzlar hosil qiladi, masalan natriy xlorid — osh tuzi. Tashqi qavatida 7 elektron bor va yana bitta elektron qabul qilishga intiladi. Guruhda pastga tushgan sari faollik kamayadi: ftor — eng faol nometall, yod esa ancha sust. Xona haroratida ftor och sariq va xlor sariq-yashil gaz, brom qizil-qo‘ng‘ir suyuqlik, yod esa to‘q binafsha-qora kristall.',
      'Inert (nodir) gazlar (18-guruh: He, Ne, Ar, Kr, Xe, Rn) — tashqi elektron qavati to‘lgan elementlar. Ular uzoq vaqt «hech narsa bilan birikmaydi» deb hisoblangan va Mendeleyevning 1869-yilgi jadvalida ular yo‘q edi — argon 1894-yilda, neon, kripton va ksenon 1898-yilda topildi. 1962-yilda Nil Bartlett ksenonning birinchi birikmasini olib, bu fikrni rad etdi. Bugun ular reklama chiroqlarida (neon), lampalarda (argon) va havo sharlarida (geliy) ishlatiladi.',
      'O‘tish metallari (3–12-guruhlar) — texnikada eng ko‘p ishlatiladigan metallar: temir, mis, rux, nikel, xrom, titan, kumush, oltin. Ularda elektronlar ichki d-qavatga to‘lib boradi. Lantanoidlar (La–Lu) va aktinoidlar (Ac–Lr) f-elementlardir; ular jadval ostida alohida qatorda beriladi. Lantanoidlar skandiy va ittriy bilan birga «nodir yer elementlari» deyiladi va zamonaviy magnitlar, ekranlar va lazerlar uchun zarur. Aktinoidlarning hammasi radioaktiv; uran va plutoniy atom energetikasida ishlatiladi.'
    ]},
    {sarlavha:'Jadval bo‘ylab qonuniyatlar', xatboshilar:[
      'Davr bo‘ylab chapdan o‘ngga yadro zaryadi ortadi, elektron qavatlar soni esa o‘zgarmaydi. Yadro elektronlarni kuchliroq tortadi, shuning uchun atom radiusi kichrayadi, elektronni berish qiyinlashadi va metallik xossa susayib, nometallik xossa kuchayadi. 3-davrda buni aniq ko‘rish mumkin: natriy va magniy — faol metallar, alyuminiy — amfoter xossali metall, kremniy — yarimmetall, fosfor, oltingugurt va xlor — nometallar, argon — inert gaz.',
      'Guruh bo‘ylab yuqoridan pastga elektron qavatlar soni ortadi va tashqi elektronlar yadrodan uzoqlashadi. Shuning uchun atom radiusi kattalashadi, metallar faolroq bo‘ladi, nometallarning faolligi esa pasayadi. 14-guruhda bu ayniqsa yaqqol: uglerod — nometall, kremniy va germaniy — yarimmetallar, qalay va qo‘rg‘oshin — metallar.',
      'Elektromanfiylik — atomning kimyoviy bog‘dagi elektronlarni o‘ziga tortish qobiliyati. Amerikalik kimyogar Laynus Poling 1932-yilda uni o‘lchash shkalasini taklif qildi. Poling shkalasida ftor 3,98 bilan birinchi, kislorod 3,44 bilan ikkinchi o‘rinda. Eng kichik qiymatlar 1-guruh pastida: seziy — 0,79, fransiy uchun esa ≈0,7 baholangan. Elektromanfiylik farqi bog‘ turini ko‘rsatadi: farq katta bo‘lsa (Na — 0,93 va Cl — 3,16) bog‘ ionli, kichik bo‘lsa kovalent bo‘ladi.',
      'Moddaning agregat holati ham jadvalda qonuniyat bilan joylashgan. 25 °C va 1 atm da 11 ta element gaz: vodorod, azot, kislorod, ftor, xlor va 6 ta inert gaz. Faqat ikkitasi suyuq — brom va simob. Qolgan elementlar qattiq; galliy (≈29,8 °C) va seziy (≈28,5 °C) esa xona haroratidan biroz yuqorida eriydi.'
    ]},
    {sarlavha:'Yangi elementlar va ko‘p uchraydigan xatolar', xatboshilar:[
      'Urandan og‘ir elementlar — transuran elementlar — tabiatda deyarli uchramaydi va reaktor yoki tezlatkichlarda olinadi. Birinchisi — neptuniy — 1940-yilda olingan. 1944–1945-yillarda Glenn Siborg aktinoidlar qatorini taklif qildi va jadvalning bugungi shakli shakllandi. Eng og‘ir elementlar faqat bir necha atom miqdorida olinadi va soniyaning ulushlarida parchalanib ketadi, shuning uchun ularning xossalari asosan hisoblash orqali bashorat qilinadi.',
      'IUPAC 2015-yil oxirida 113, 115, 117 va 118-elementlar kashfiyotini tan oldi va 2016-yil 28-noyabrda ularning nomlarini tasdiqladi: nihoniy (Nh, Yaponiya), moskoviy (Mc, Moskva viloyati), tennessin (Ts, AQShning Tennessi shtati) va oganesson (Og, fizik Yuriy Oganesyan sharafiga). Shu bilan 7-davr to‘liq to‘ldi. 119 va 120-elementlarni olish bo‘yicha tajribalar davom etmoqda, lekin hozircha ular olinmagan.',
      'Birinchi keng tarqalgan xato — «elementlar atom massasi bo‘yicha tartiblangan» deyish. To‘g‘risi: tartib raqami, ya’ni yadro zaryadi bo‘yicha; massa bo‘yicha tartibda istisnolar bor (Ar–K, Co–Ni, Te–I). Ikkinchi xato — vodorodni ishqoriy metall deb hisoblash: u 1-guruhda tursa ham, nometall. Uchinchi xato — lantanoid va aktinoidlarni «jadvaldan tashqari» elementlar deb o‘ylash: ular 6- va 7-davrning qismi, faqat qulaylik uchun pastda yoziladi.',
      'To‘rtinchi xato — neytronlar sonini topishda jadvaldagi kasr massadan foydalanish. Neytronlar soni aniq izotop uchun hisoblanadi: N = A − Z, bu yerda A — butun son (massa soni). Masalan, xlor-35 da 18 ta, xlor-37 da 20 ta neytron bor; jadvaldagi 35,45 esa bu ikki izotopning tabiatdagi ulushiga ko‘ra o‘rtacha qiymat.'
    ]}
  ],
  formulalar:[
    ['N = A − Z','Neytronlar soni: A — massa soni, Z — tartib raqam (protonlar soni). ²³Na: 23 − 11 = 12'],
    ['p⁺ = e⁻ = Z','Neytral atomda protonlar va elektronlar soni tartib raqamga teng'],
    ['Elektron qavatlar soni = davr raqami','Masalan, Cl — 3-davr: 2, 8, 7'],
    ['Tashqi elektronlar = guruh raqami (1–2) yoki guruh − 10 (13–18)','Asosiy guruhcha elementlari uchun; qisqa jadvalda — A guruhcha raqami'],
    ['Ar = Σ (ωᵢ · Aᵢ)','O‘rtacha atom massasi: izotoplar massalarining tabiiy ulushlariga ko‘ra o‘rtachasi. Cl: 0,758·35 + 0,242·37 ≈ 35,5'],
    ['Mr = Σ Ar','Molekulyar massa: Mr(H₂O) = 2·1,008 + 15,999 ≈ 18,02']
  ],
  qiziqarli:[
    'Mendeleyev sharafiga 101-element mendeleviy deb atalgan; 2019-yil jadvalning 150 yilligi munosabati bilan BMT tomonidan Davriy jadvalning xalqaro yili deb e’lon qilingan.',
    'Shvetsiyadagi kichik Itterbi qishlog‘i nomi bilan to‘rtta element atalgan: ittriy, terbiy, erbiy va itterbiy.',
    'Geliy avval Yerda emas, 1868-yilda Quyosh spektrida topilgan; Yerda u faqat 1895-yilda ajratib olingan.',
    'Oganesson (118) — tirik olim nomi berilgan ikkinchi element; birinchisi siborgiy (106) edi.',
    'Galliyning erish harorati ≈29,8 °C — undan yasalgan qoshiqcha issiq choyda erib ketadi.'
  ],
  lugat:[
    ['Kimyoviy element','Yadrosida bir xil sondagi proton bo‘lgan atomlar turi.'],
    ['Davriy qonun','Elementlar xossalari yadro zaryadiga (tartib raqamiga) davriy bog‘liq.'],
    ['Davr','Jadvaldagi gorizontal qator; elektron qavatlar soniga teng.'],
    ['Guruh','Jadvaldagi vertikal ustun; o‘xshash xossali elementlar oilasi.'],
    ['Tartib raqami (Z)','Yadrodagi protonlar soni.'],
    ['Massa soni (A)','Yadrodagi protonlar va neytronlar yig‘indisi.'],
    ['Izotop','Protonlar soni bir xil, neytronlar soni turlicha bo‘lgan atomlar.'],
    ['Nisbiy atom massasi (Ar)','Atom massasining uglerod-12 atomi massasining 1/12 qismiga nisbati.'],
    ['Elektromanfiylik','Atomning kimyoviy bog‘dagi elektronlarni o‘ziga tortish qobiliyati.'],
    ['Ishqoriy metallar','1-guruhning faol metallari: Li, Na, K, Rb, Cs, Fr.'],
    ['Galogenlar','17-guruhning faol nometallari: F, Cl, Br, I, At.'],
    ['Inert gazlar','18-guruh: tashqi qavati to‘lgan, kam faol elementlar.']
  ],
  manba:DM+'. Manbalar farq qiladigan joylar: ayrim elementlarning kashf etilgan yili (topilgan yoki ajratib olingan sana), radioaktiv elementlarning massa sonlari va yarimmetallar ro‘yxati — lib/elementlar.js izohi va tekshiruv hisobotida ko‘rsatilgan.',
  ishlanma:{
    sinf:'7–8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv davriy jadval, guruhlarda ishlash, «elementni top» o‘yini',
    maqsad:{talimiy:'Davriy qonun, davr va guruh tushunchalari, elementlar oilalari (ishqoriy metallar, galogenlar, inert gazlar, o‘tish metallari) hamda atom massasi va elektromanfiylikning jadval bo‘ylab o‘zgarishini o‘rgatish.',
      tarbiyaviy:'Ilm tarixiga, olimlarning mehnatiga hurmat; tabiatdagi tartib va qonuniyatlarga qiziqish uyg‘otish.',
      rivojlantiruvchi:'Jadval bilan ishlash, taqqoslash, qonuniyat topish va bashorat qilish ko‘nikmalarini rivojlantirish.'},
    natijalar:['Element tartib raqami bo‘yicha uning davri va guruhini aniqlaydi','Asosiy elementlar oilalarini va ularning vakillarini ayta oladi','N = A − Z formulasi bilan proton, neytron va elektronlar sonini hisoblaydi','Davr va guruh bo‘ylab elektromanfiylik o‘zgarishini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Davriy jadval»','Proyektor','Devoriy davriy jadval','Element kartochkalari tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Natriy va kaliy nega bir-biriga o‘xshaydi, natriy va xlor esa butunlay boshqacha?»','Taxmin qiladi.'],
      ['8–16','<b>Tarix.</b> Dyobereyner, Nyulends, Mendeleyev va Meyer; bo‘sh kataklar va germaniy bashorati.','Vaqt chizig‘ini daftarga yozadi.'],
      ['16–26','<b>Jadval tuzilishi va oilalar.</b> MAKON da davr, guruh, ranglar: ishqoriy metallar, galogenlar, inert gazlar, o‘tish metallari.','Har bir oiladan 2 ta elementni topib yozadi.'],
      ['26–34','<b>Qonuniyatlar.</b> «Massa» va «elektromanfiylik» rejimlari: Ar–K istisnosi, ftor eng baland ustun.','Guruhlarda qonuniyatni ta’riflaydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Elementni toping» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Davr','Gorizontal qator.'],['Guruh','Vertikal ustun.'],['Tartib raqami','Protonlar soni.'],['Izotop','Neytronlar soni turlicha atomlar.'],['Elektromanfiylik','Elektronni tortish qobiliyati.']],
    savollar:[['Natriy qaysi davr va guruhda?','3-davr, 1-guruh'],['Eng elektromanfiy element?','Ftor'],['Xona haroratida suyuq metall?','Simob'],['²⁷Al atomida nechta neytron?','27 − 13 = 14'],['Davriy jadvalni kim va qachon e’lon qilgan?','D. I. Mendeleyev, 1869-yil']],
    uy:'Darslikdagi mavzuni o‘qish; (1) ishqoriy metallar, galogenlar va inert gazlardan 3 tadan element yozib, har birining davri va guruhini ko‘rsatish; (2) ¹⁹F, ⁵⁶Fe va ²³⁸U atomlaridagi proton, neytron va elektronlar sonini topish (javob: 9, 10, 9; 26, 30, 26; 92, 146, 92); (3) 3-davr elementlarini metallik xossasi kamayib borish tartibida yozish.',
    manba:DM
  }
}
});
})();
