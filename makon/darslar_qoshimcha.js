/* MAKON — qo‘shimcha darslar (kimyo, biologiya, fizika, astronomiya, harbiy).
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi.
   Sahna turlari: molekula, biologiya, zanjir2, astro, glb. */
(function(){
const F = id=>window.MAKON_FAN.find(f=>f.id===id);
const bogla = (fanId, nom, dars, qisqa, eskiNom)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom===nom || (eskiNom && x.nom===eskiNom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};

bogla('kimyo','Kimyoviy bog‘ turlari','kimyo-boglar','Kovalent qutbsiz, kovalent qutbli va ionli bog‘ — 3D molekulalarda');
bogla('kimyo','Uglevodorodlar','kimyo-uglevodorod','Metan, etan, eten, etin, benzol: bog‘lar va fazoviy shakl');
bogla('biologiya','Nafas olish tizimi','bio-nafas','Havo yo‘llari, o‘pka, alveolalar, diafragma');
bogla('biologiya','Hazm qilish tizimi','bio-hazm','Oshqozon, jigar, oshqozon osti bezi, ichaklar');
bogla('fizika','Ketma-ket va parallel ulash','fizika-ulash','Ikki lampa bilan 3D zanjir: tok va kuchlanish taqsimoti');
bogla('harbiy','Topografiya: kompas va azimut','harbiy-topografiya','Kompas qismlari, magnit azimuti, qaytish azimuti, juft qadam','Topografiya: Adrianov kompasi va azimut');
bogla('harbiy','Dastlabki tibbiy yordam: qon ketishni to‘xtatish','harbiy-tibbiy','Bosuvchi bog‘lam, jgut qo‘yish qoidalari');
bogla('harbiy','9 mm Makarov pistoleti (PM)','harbiy-pm','Vazifasi, ko‘rsatkichlari, noto‘liq qismlarga ajratish tartibi');

const astro = F('astronomiya');
if(astro){
  astro.yopiq = false;
  astro.tavsif = 'Quyosh sistemasi 3D da: sayyoralarni bosib, ularning o‘lchami, Quyoshdan masofasi va aylanish davrini NASA ma’lumotlari asosida o‘rganing.';
  astro.mavzular = [
    {nom:'Quyosh sistemasi: 8 sayyora', dars:'astro-quyosh', qisqa:'Ichki va tashqi sayyoralar, masofa (a.b.), aylanish davri — NASA'},
    {nom:'Oy va uning fazalari', qisqa:'Keyingi bosqich'},
    {nom:'Yulduzlar va yulduz turkumlari', qisqa:'Keyingi bosqich'}
  ];
}

const DK8 = '8-sinf «Kimyo» darsligi (O‘zbekiston, amaldagi nashr) — «Kimyoviy bog‘lanish» bobi';
const WIKI_EN = 'Wikipedia (inglizcha): «Chemical bond», «Covalent bond», «Ionic bonding», «Electronegativity», «Bond length»';

Object.assign(window.MAKON_DARS, {

/* ============ 1. KIMYOVIY BOG‘ TURLARI ============ */
'kimyo-boglar': {
  fan:'kimyo', qisqaNom:'Bog‘lar', nom:'Kimyoviy bog‘ turlari',
  qisqa:'8-sinf · «Kimyoviy bog‘lanish» bobi',
  sahna:'molekula',
  kor:{
    sarlavha:'Atomlarni nima ushlab turadi?',
    matn:'Atomlar yolg‘iz holda emas, bir-biri bilan bog‘langan holda barqarorroq bo‘ladi. Bog‘ turi atomlarning elektronni o‘ziga tortish qobiliyati — elektrmanfiyligi — bilan belgilanadi. Bir xil atomlar orasida umumiy elektron juftlari teng taqsimlanadi, har xil atomlar orasida esa bir tomonga siljiydi yoki butunlay o‘tib ketadi. Quyidagi molekulalarni aylantirib, bog‘ turini o‘zingiz aniqlang.',
    punktlar:['<b>Kovalent qutbsiz</b> — bir xil nometallar: H₂ (bir), O₂ (qo‘sh), N₂ (uch bog‘)','<b>Kovalent qutbli</b> — har xil nometallar: HCl, H₂O','<b>Ionli</b> — metall va nometall: NaCl (Na⁺ va Cl⁻)','Qanchalik elektrmanfiylik farqi katta bo‘lsa, bog‘ shunchalik qutbli'],
    molekulalar:[['H2','H₂ · vodorod'],['O2','O₂ · kislorod'],['N2','N₂ · azot'],['HCl','HCl · vodorod xlorid'],['H2O','H₂O · suv'],['NaCl','NaCl · osh tuzi']]
  },
  bolimlar:[
    {sarlavha:'Bog‘ turlarini taqqoslash', jadval:[
      ['Kovalent qutbsiz','Bir xil nometall atomlari; umumiy juft o‘rtada · H₂, O₂, N₂, Cl₂'],
      ['Kovalent qutbli','Har xil nometallar; juft elektrmanfiyroq atomga siljigan · HCl, H₂O, NH₃'],
      ['Ionli','Metall elektron beradi, nometall oladi; qarama-qarshi ionlar tortishadi · NaCl'],
      ['Metall bog‘','Metall kristalidagi umumiy («erkin») elektronlar · Na, Fe, Cu'],
      ['Hosil bo‘lish mexanizmi (kovalent)','Har bir atomdan bittadan toq elektron qo‘shilib umumiy juft hosil qiladi'],
      ['Ionli moddalar holati','Odatda qattiq kristall, suyuqlanish harorati yuqori'],
      ['Ionli moddaning suvdagi eritmasi','Elektr tokini o‘tkazadi (ionlar harakatlanadi)'],
      ['Qutbsiz kovalent moddalar (H₂, O₂, N₂)','Oddiy sharoitda gazlar']
    ]},
    {sarlavha:'Elektrmanfiylik (Poling shkalasi)', jadval:[['F','3,98'],['O','3,44'],['N','3,04'],['Cl','3,16'],['C','2,55'],['H','2,20'],['Na','0,93']],
     matn:'Maktab darsliklarida ko‘pincha yumaloqlangan qiymatlar beriladi (masalan, O — 3,5; Cl — 3,0; H — 2,1; Na — 0,9). Bog‘ni «ionli» deb hisoblash chegarasi (farq ≈1,7 dan katta) — shartli qoida, manbalar turlicha beradi.'},
    {sarlavha:'Karrali bog‘lar', jadval:[['H–H (H₂)','bir bog‘ · 1 umumiy juft'],['O=O (O₂)','qo‘sh bog‘ · 2 umumiy juft'],['N≡N (N₂)','uch bog‘ · 3 umumiy juft'],['Bog‘ energiyasi H–H','≈436 kJ/mol'],['Bog‘ energiyasi O=O','≈498 kJ/mol'],['Bog‘ energiyasi N≡N','≈945 kJ/mol']],
     matn:'Karrali bog‘ qancha ko‘p bo‘lsa, bog‘ odatda shuncha mustahkam va qisqa. Azotning uch bog‘i juda mustahkam — shuning uchun N₂ kimyoviy jihatdan passiv.'}
  ],
  bosqichlar:[
    {sarlavha:'H₂ — bir bog‘', matn:'Ikki vodorod atomi bittadan elektron berib, bitta umumiy juft hosil qiladi. Atomlar bir xil — juft aynan o‘rtada: kovalent qutbsiz bog‘.', mol:'H2'},
    {sarlavha:'O₂ — qo‘sh bog‘', matn:'Kislorod atomlari o‘rtasida ikki umumiy elektron juft — qo‘sh bog‘. Atomlar bir xil, shuning uchun bog‘ qutbsiz.', mol:'O2'},
    {sarlavha:'N₂ — uch bog‘', matn:'Azot atomlari uch umumiy juft bilan bog‘langan. Bu eng mustahkam bog‘lardan biri; havodagi azot shu sababli oson reaksiyaga kirishmaydi.', mol:'N2'},
    {sarlavha:'HCl — qutbli bog‘', matn:'Xlor vodoroddan elektrmanfiyroq: umumiy juft xlor tomonga siljiydi. Xlorda qisman manfiy (δ−), vodorodda qisman musbat (δ+) zaryad paydo bo‘ladi.', mol:'HCl'},
    {sarlavha:'H₂O — ikki qutbli bog‘', matn:'Ikkala O–H bog‘i qutbli, molekula burchakli (≈104,5°) — shuning uchun suv molekulasi butunicha ham qutbli.', mol:'H2O'},
    {sarlavha:'NaCl — ionli bog‘', matn:'Natriy bitta elektronni xlorga beradi: Na⁺ va Cl⁻ ionlari hosil bo‘ladi va elektrostatik tortishadi. Kristallda har bir ionni 6 ta qarama-qarshi ion o‘rab turadi.', mol:'NaCl'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Bog‘ turini aniqlang',
    topshiriqlar:[
      {shart:'Sahnadagi molekulada qanday bog‘ bor?', holat:{mol:'N2'}, v:['Kovalent qutbsiz (uch bog‘)','Kovalent qutbli','Ionli'], t:0, izoh:'N₂ — ikki bir xil atom, uch umumiy juft: <b>kovalent qutbsiz uch bog‘</b>.'},
      {shart:'Bu moddada qanday bog‘ bor?', holat:{mol:'NaCl'}, v:['Kovalent qutbli','Metall','Ionli'], t:2, izoh:'Metall (Na) va nometall (Cl): elektron to‘liq o‘tadi — <b>ionli bog‘</b>.'},
      {shart:'Molekuladagi bog‘ turi qanday?', holat:{mol:'HCl'}, v:['Kovalent qutbli','Kovalent qutbsiz','Ionli'], t:0, izoh:'Har xil nometallar; juft xlorga siljigan — <b>kovalent qutbli</b>.'},
      {shart:'Kislorod molekulasida atomlar nechta umumiy juft bilan bog‘langan?', holat:{mol:'O2'}, v:['Bitta','Ikkita (qo‘sh bog‘)','Uchta'], t:1, izoh:'O₂ da <b>qo‘sh bog‘</b> — ikki umumiy elektron juft.'},
      {shart:'Suv molekulasidagi O–H bog‘lari qanday?', holat:{mol:'H2O'}, v:['Ionli','Kovalent qutbsiz','Kovalent qutbli'], t:2, izoh:'Kislorod vodoroddan ancha elektrmanfiy — <b>kovalent qutbli</b> bog‘lar.'}
    ]},
  test:[
    {s:'Qaysi moddada kovalent qutbsiz bog‘ bor?', v:['HCl','N₂','NaCl','H₂O'], t:1, izoh:'<b>N₂</b> — bir xil atomlar; qolganlari qutbli yoki ionli.'},
    {s:'NaCl dagi bog‘ turi qanday?', v:['Kovalent qutbli','Metall','Kovalent qutbsiz','Ionli'], t:3, izoh:'Na elektron beradi, Cl oladi — <b>ionli bog‘</b>.'},
    {s:'Azot molekulasida atomlar orasida nechta umumiy elektron juft bor?', v:['3','1','2','4'], t:0, izoh:'N≡N — <b>uch bog‘</b>, uch umumiy juft.'},
    {s:'HCl molekulasida umumiy elektron juft qaysi atom tomon siljigan?', v:['Vodorod','Juft o‘rtada','Xlor','Siljish yo‘q'], t:2, izoh:'<b>Xlor</b> elektrmanfiyroq, u qisman manfiy zaryadlanadi.'},
    {s:'Elektrmanfiylik nima?', v:['Atom massasi','Atomning bog‘dagi elektronlarni o‘ziga tortish qobiliyati','Atomdagi protonlar soni','Ionning zaryadi'], t:1, izoh:'Elektrmanfiylik — <b>bog‘dagi elektronlarni o‘ziga tortish</b> qobiliyati.'},
    {s:'Qaysi xossa ionli moddalar uchun xos?', v:['Oddiy sharoitda gaz','Suyuqlanish harorati past','Eritmasi elektr tokini o‘tkazmaydi','Qattiq kristall, eritmasi tok o‘tkazadi'], t:3, izoh:'Ionli moddalar <b>kristall</b> tuzilishli; eritmada ionlar harakatlanib tok o‘tkazadi.'},
    {s:'Qaysi juftlikda ikkala moddada ham kovalent qutbli bog‘ bor?', v:['H₂O va HCl','O₂ va N₂','NaCl va HCl','H₂ va H₂O'], t:0, izoh:'<b>H₂O va HCl</b> — har xil nometallar birikmasi.'},
    {s:'Karrali bog‘lar soni ortishi bilan (H–H → O=O → N≡N) bog‘ energiyasi qanday o‘zgaradi?', v:['Kamayadi','Ortadi','O‘zgarmaydi','Nolga teng bo‘ladi'], t:1, izoh:'≈436 → ≈498 → ≈945 kJ/mol: <b>ortadi</b>.'}
  ],
  yordamchi:[
    {s:'Qutbli va qutbsiz bog‘ni qanday farqlayman?', j:'Bog‘dagi ikki atom bir xil bo‘lsa (H₂, O₂, N₂) — qutbsiz. Har xil nometallar bo‘lsa (HCl, H₂O) — qutbli. Metall va faol nometall (NaCl) — ionli.', kalit:['qutbli','qutbsiz','farq']},
    {s:'Metall bog‘ nima?', j:'Metall kristallida atomlar elektronlarining bir qismini umumiy «elektron bulut»ga beradi; musbat ionlar shu elektronlar bilan birga ushlanadi. Shuning uchun metallar tok o‘tkazadi.', kalit:['metall']}
  ],
  maqola:[
    {sarlavha:'Kirish: nima uchun kimyoviy bog‘ muhim?', xatboshilar:[
      'Atrofimizdagi deyarli hamma narsa — havo, suv, tuz, qog‘oz, tanamiz — atomlarning bir-biri bilan bog‘lanishidan hosil bo‘lgan. Inert gazlardan tashqari ko‘pchilik element atomlari oddiy sharoitda yakka holda uchramaydi. Ular boshqa atomlar bilan birikib, energiyasi pastroq va shuning uchun barqarorroq holatga o‘tadi. Atomlarni birga ushlab turadigan o‘zaro ta’sir kimyoviy bog‘ deyiladi.',
      'Moddaning xossalari ko‘p jihatdan bog‘ turiga bog‘liq. Nima uchun osh tuzi qattiq va faqat yuqori haroratda suyuqlanadi, kislorod esa gaz? Nima uchun tuz eritmasi tok o‘tkazadi, shakar eritmasi esa deyarli o‘tkazmaydi? Bu savollarga javob bog‘ turida. Shu sababli kimyoviy bog‘lanish mavzusi keyingi barcha kimyo bo‘limlari uchun poydevor hisoblanadi.',
      'Bu darsda uch asosiy bog‘ turini ko‘rib chiqamiz: kovalent qutbsiz, kovalent qutbli va ionli. Metall bog‘ haqida ham qisqacha to‘xtalamiz. Har bir tur uchun 3D sahnada haqiqiy molekula shaklini ko‘rasiz va uni aylantirib, atomlar qanday joylashganini kuzatasiz.',
      'Darsni o‘rganishda bitta savolni doim yodda tuting: «Umumiy elektronlar kimga tegishli?» Agar ular ikki atomga teng tegishli bo‘lsa, bog‘ qutbsiz; bir atomga ko‘proq tegishli bo‘lsa, qutbli; butunlay bir atomga o‘tib ketgan bo‘lsa, ionli. Bu savol bog‘ turlarini yodlash o‘rniga tushunishga yordam beradi va keyingi mavzularda — eritmalar, elektroliz, organik birikmalarda — ham asqotadi.'
    ]},
    {sarlavha:'Elektrmanfiylik — bog‘ turini belgilovchi kattalik', xatboshilar:[
      'Atomning bog‘dagi umumiy elektronlarni o‘ziga tortish qobiliyati elektrmanfiylik deyiladi. Bu tushunchani amerikalik kimyogar Laynus Poling rivojlantirgan va uning shkalasi hozir ham eng ko‘p ishlatiladi. Poling shkalasida eng elektrmanfiy element — ftor (≈3,98), undan keyin kislorod (≈3,44). Ishqoriy metallar, masalan natriy (≈0,93), elektronni kuchsiz ushlaydi.',
      'Bog‘ turini taxminlash uchun ikki atom elektrmanfiyliklari farqiga qaraladi. Farq nolga teng bo‘lsa, umumiy juft aynan o‘rtada — bog‘ qutbsiz. Farq kichik yoki o‘rtacha bo‘lsa, juft elektrmanfiyroq atomga siljiydi — bog‘ qutbli. Farq katta bo‘lsa, elektron deyarli to‘liq bir atomdan ikkinchisiga o‘tadi — bog‘ ionli bo‘ladi.',
      'Shuni esda tutish kerakki, qutbli va ionli bog‘ orasida keskin chegara yo‘q. Ko‘p darsliklarda farq taxminan 1,7 dan katta bo‘lsa bog‘ ionli deb olinadi, lekin bu shartli qoida va turli manbalarda boshqacha chegara ham uchraydi. Maktab darajasida oddiy qoida yetarli: metall bilan faol nometall — ionli, ikki nometall — kovalent.'
    ]},
    {sarlavha:'Kovalent qutbsiz bog‘: H₂, O₂, N₂', xatboshilar:[
      'Kovalent bog‘ umumiy elektron juftlari hisobiga hosil bo‘ladi. Vodorod molekulasida har bir atom bittadan elektron beradi va ular ikkala yadroga ham tegishli bo‘lgan bitta umumiy juftga aylanadi. Atomlar bir xil bo‘lgani uchun hech biri juftni ko‘proq tortmaydi, ya’ni bog‘ qutbsiz. Bunday bog‘ bitta chiziqcha bilan yoziladi: H–H.',
      'Ba’zi atomlarga barqaror holatga yetish uchun bitta emas, bir nechta elektron yetishmaydi. Kislorod atomlari ikki umumiy juft hosil qiladi va O=O qo‘sh bog‘ yuzaga keladi. Azot atomlari esa uch umumiy juft hosil qiladi: N≡N uch bog‘i. Bir nechta umumiy juftdan iborat bog‘lar karrali bog‘lar deyiladi.',
      'Karrali bog‘ odatda oddiy bog‘dan mustahkamroq. Ma’lumotnomalarda H–H bog‘ energiyasi taxminan 436 kJ/mol, O=O — taxminan 498 kJ/mol, N≡N — taxminan 945 kJ/mol deb beriladi. Azot molekulasini buzish uchun juda ko‘p energiya kerakligi sababli havodagi azot oddiy sharoitda deyarli reaksiyaga kirishmaydi.',
      'Kovalent bog‘ni yozishning ikki usuli bor. Lyuis formulasida (elektron formulada) umumiy juftlar atomlar orasiga ikki nuqta bilan qo‘yiladi, masalan H:H. Tuzilish formulasida esa har bir umumiy juft bitta chiziqcha bilan ko‘rsatiladi: H–H, O=O, N≡N. Ikkala yozuv ham bir xil ma’noni beradi, lekin tuzilish formulasi tezroq yoziladi va organik kimyoda asosiy yozuv usuli hisoblanadi.'
    ]},
    {sarlavha:'Kovalent qutbli bog‘: HCl va H₂O', xatboshilar:[
      'Har xil nometall atomlari bog‘langanda umumiy juft elektrmanfiyroq atomga yaqinroq joylashadi. Vodorod xloridda xlor vodoroddan elektrmanfiyroq, shuning uchun xlor atomida qisman manfiy zaryad (δ−), vodorodda qisman musbat zaryad (δ+) paydo bo‘ladi. Molekula ikki qutbga ega bo‘ladi — uni dipol deb ham atashadi.',
      'Suv molekulasida kislorod ikki vodorod atomi bilan qutbli bog‘ hosil qiladi. Molekula chiziqli emas, burchakli — H–O–H burchagi taxminan 104,5°. Shu shakl tufayli ikki bog‘ning qutbliligi bir-birini yo‘qqa chiqarmaydi va butun molekula qutbli bo‘ladi. Suvning ko‘p moddalarni yaxshi eritishi aynan shu qutblilik bilan bog‘liq.',
      'Taqqoslash uchun karbonat angidrid (CO₂) ni eslang: undagi C=O bog‘lari ham qutbli, lekin molekula chiziqli bo‘lgani uchun qutbliliklar qarama-qarshi yo‘nalib, bir-birini muvozanatlaydi. Demak, bog‘ qutbli bo‘lishi va molekula qutbli bo‘lishi — har xil tushunchalar.'
    ]},
    {sarlavha:'Ionli bog‘: NaCl misolida', xatboshilar:[
      'Natriy — tashqi qavatida bitta elektroni bor faol metall, xlor esa tashqi qavatini to‘ldirish uchun bitta elektron yetishmaydigan faol nometall. Ular uchrashganda natriy elektronini xlorga beradi: natriy musbat ion Na⁺ ga, xlor manfiy ion Cl⁻ ga aylanadi. Qarama-qarshi zaryadli ionlar orasidagi elektrostatik tortishish ionli bog‘ deyiladi.',
      'Ionli moddalar alohida molekulalardan emas, kristall panjaradan iborat. Osh tuzi kristallida har bir Na⁺ ionini 6 ta Cl⁻ ioni, har bir Cl⁻ ionini esa 6 ta Na⁺ ioni o‘rab turadi. Shuning uchun «NaCl molekulasi» iborasi shartli: formula faqat ionlar nisbatini (1:1) bildiradi.',
      'Ionli bog‘ kuchli bo‘lgani uchun ionli moddalar odatda qattiq, mo‘rt va yuqori haroratda suyuqlanadi. Qattiq holatda ular tok o‘tkazmaydi, chunki ionlar joyida qotgan. Suvda eritilganda yoki suyuqlantirilganda ionlar erkin harakatlanadi va modda elektr tokini o‘tkaza boshlaydi.',
      'Ionli bog‘ faqat natriy va xlor orasida emas, boshqa ko‘plab metall va nometallar orasida ham hosil bo‘ladi. Masalan, kaliy xlorid KCl, kalsiy oksid CaO, magniy oksid MgO — ionli birikmalar. Ionning zaryadi atom qancha elektron berganiga yoki olganiga bog‘liq: kalsiy ikkita elektron berib Ca²⁺, kislorod ikkita elektron olib O²⁻ ioniga aylanadi. Formulada ionlar zaryadlari yig‘indisi nolga teng bo‘ladi.'
    ]},
    {sarlavha:'Tarix, hayotda qo‘llanishi va ko‘p uchraydigan xatolar', xatboshilar:[
      'Umumiy elektron juft g‘oyasini 1916-yilda amerikalik kimyogar Gilbert Lyuis taklif qilgan. Keyinchalik kvant mexanikasi bu g‘oyani tushuntirib berdi, Poling esa elektrmanfiylik shkalasini yaratdi va kimyoviy bog‘ tabiati bo‘yicha tadqiqotlari uchun 1954-yilda Nobel mukofotiga sazovor bo‘ldi.',
      'Bog‘ turini bilish amaliy ahamiyatga ega. Nima uchun tuzli suv elektr asboblari uchun xavfli, nima uchun yog‘ suvda erimaydi, nima uchun azotli o‘g‘itlar ishlab chiqarish ko‘p energiya talab qiladi — bularning barchasi bog‘lar bilan izohlanadi. Farmatsevt, agronom, materialshunos va muhandislar bu bilimdan har kuni foydalanadi.',
      'Ko‘p uchraydigan xatolar: birinchidan, har qanday ikki xil atom orasidagi bog‘ni ionli deb o‘ylash — aslida HCl va H₂O da bog‘ kovalent qutbli. Ikkinchidan, bog‘ qutbli bo‘lsa, molekula ham albatta qutbli deb hisoblash (CO₂ misoli buni rad etadi). Eslab qolish usuli: «bir xil nometall — qutbsiz, har xil nometall — qutbli, metall + nometall — ionli».'
    ]}
  ],
  formulalar:[
    ['H· + ·H → H:H (H–H)','Ikki toq elektrondan bitta umumiy juft — bir bog‘'],
    ['N≡N','Uch umumiy elektron juft — uch bog‘'],
    ['Na − e⁻ → Na⁺','Natriy atomi elektron berib musbat ionga aylanadi'],
    ['Cl + e⁻ → Cl⁻','Xlor atomi elektron olib manfiy ionga aylanadi'],
    ['Δχ = χ(A) − χ(B)','Elektrmanfiyliklar farqi: 0 — qutbsiz, kichik — qutbli, katta — ionli (chegara shartli)']
  ],
  qiziqarli:[
    'Umumiy elektron juft g‘oyasini Gilbert Lyuis 1916-yilda taklif qilgan; bu g‘oya hozirgi kovalent bog‘ nazariyasining boshlanishi bo‘ldi.',
    'Laynus Poling kimyoviy bog‘ tabiati bo‘yicha ishlari uchun 1954-yilda kimyo bo‘yicha Nobel mukofotini olgan.',
    'N≡N bog‘ining energiyasi (≈945 kJ/mol) H–H bog‘inikidan (≈436 kJ/mol) ikki barobardan ham katta — shuning uchun havodagi azot juda passiv.',
    'Osh tuzi kristallida har bir ion 6 ta qarama-qarshi ion bilan o‘ralgan — «NaCl molekulasi» aslida mavjud emas, formula faqat 1:1 nisbatni bildiradi.'
  ],
  lugat:[
    ['Kimyoviy bog‘','Atomlarni molekula yoki kristallda birga ushlab turuvchi o‘zaro ta’sir.'],
    ['Elektrmanfiylik','Atomning bog‘dagi elektronlarni o‘ziga tortish qobiliyati.'],
    ['Kovalent bog‘','Umumiy elektron juftlari hisobiga hosil bo‘ladigan bog‘.'],
    ['Kovalent qutbsiz bog‘','Bir xil nometall atomlari orasidagi bog‘; umumiy juft o‘rtada.'],
    ['Kovalent qutbli bog‘','Har xil nometallar orasidagi bog‘; juft elektrmanfiyroq atomga siljigan.'],
    ['Ionli bog‘','Qarama-qarshi zaryadli ionlar orasidagi elektrostatik tortishish.'],
    ['Ion','Elektron bergan (kation) yoki olgan (anion) zaryadli zarracha.'],
    ['Karrali bog‘','Ikki (qo‘sh) yoki uch umumiy juftdan iborat bog‘.'],
    ['Dipol','Qisman musbat va qisman manfiy qutbga ega molekula.'],
    ['Kristall panjara','Zarrachalarning fazoda tartibli, takrorlanuvchi joylashuvi.'],
    ['Metall bog‘','Metall ionlari va umumiy erkin elektronlar orasidagi bog‘.']
  ],
  manba:DK8+'; '+WIKI_EN+'; L. Pauling «The Nature of the Chemical Bond» (elektrmanfiylik shkalasi); bog‘ energiyalari — ma’lumotnoma qiymatlari (CRC Handbook of Chemistry and Physics; manbaga qarab bir necha kJ/mol farq qiladi); Nobel mukofoti — nobelprize.org.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D molekulalar, taqqoslash jadvali, juftlikda ishlash',
    maqsad:{talimiy:'Kovalent qutbsiz, kovalent qutbli va ionli bog‘ hosil bo‘lishini, elektrmanfiylik tushunchasini va bog‘ turining modda xossasiga ta’sirini o‘rgatish.',
      tarbiyaviy:'Tabiat hodisalarini ilmiy asosda tushuntirishga intilish, aniqlik va diqqatlilikni tarbiyalash.',
      rivojlantiruvchi:'Taqqoslash, tasniflash, modeldan xulosa chiqarish ko‘nikmasini rivojlantirish.'},
    natijalar:['Elektrmanfiylik tushunchasini ta’riflaydi','Formulasiga qarab bog‘ turini aniqlaydi (H₂, N₂, HCl, H₂O, NaCl)','Bir, qo‘sh va uch bog‘ni farqlaydi','Ionli moddalar xossalarini bog‘ turi bilan izohlaydi'],
    jihozlar:['MAKON 3D sahnasi «Kimyoviy bog‘ turlari»','Proyektor yoki interaktiv doska','Elektrmanfiylik jadvali (Mendeleyev jadvali)','Osh tuzi kristallari (ko‘rgazma uchun)','8-sinf kimyo darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Salomlashadi, davomatni tekshiradi.','Tinglaydi.'],
      ['3–8','<b>Takrorlash va motivatsiya.</b> «Nima uchun tuz qattiq, kislorod gaz?» degan muammoli savol beradi.','Taxminlarini aytadi.'],
      ['8–16','<b>Elektrmanfiylik.</b> Jadvaldan qiymatlarni ko‘rsatib, farq va bog‘ turi bog‘liqligini tushuntiradi.','Daftarga qoidani yozadi.'],
      ['16–26','<b>Kovalent bog‘lar.</b> MAKON 3D da H₂, O₂, N₂, keyin HCl va H₂O ni ko‘rsatadi; δ+ va δ− belgilarini izohlaydi.','Molekulalarni chizadi, bog‘lar sonini sanaydi.'],
      ['26–34','<b>Ionli bog‘.</b> NaCl kristalini 3D da ko‘rsatadi; ion hosil bo‘lish sxemasini yozadi.','Sxemani yozadi, kristallni kuzatadi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Bog‘ turini aniqlang» mashqi va test.','Juftlikda mashq va test bajaradi.'],
      ['42–45','<b>Yakun va uyga vazifa.</b> Baholaydi.','Yozib oladi.']],
    lugat:[['Elektrmanfiylik','Atomning bog‘dagi elektronlarni o‘ziga tortish qobiliyati.'],['Kovalent qutbsiz bog‘','Bir xil nometallar orasidagi bog‘.'],['Kovalent qutbli bog‘','Har xil nometallar orasidagi, juft siljigan bog‘.'],['Ionli bog‘','Qarama-qarshi ionlar orasidagi tortishish.'],['Karrali bog‘','Qo‘sh yoki uch bog‘.']],
    savollar:[['H₂, HCl, NaCl dagi bog‘ turlarini ayting.','Kovalent qutbsiz, kovalent qutbli, ionli'],['N₂ da nechta umumiy juft bor?','Uchta (uch bog‘)'],['HCl da qaysi atom qisman manfiy zaryadlanadi?','Xlor'],['Nima uchun tuz eritmasi tok o‘tkazadi?','Eritmada ionlar erkin harakatlanadi'],['Suv molekulasi nima uchun qutbli?','Bog‘lar qutbli va molekula burchakli (≈104,5°)']],
    uy:'Darslikdagi «Kimyoviy bog‘lanish» bobini o‘qish; Cl₂, NH₃, KCl, CH₄ uchun bog‘ turini aniqlab, jadval tuzish.',
    manba:DK8+'; '+WIKI_EN
  }
},

/* ============ 2. UGLEVODORODLAR ============ */
'kimyo-uglevodorod': {
  fan:'kimyo', qisqaNom:'Uglevodorod', nom:'Uglevodorodlar: metan, etan, eten, etin, benzol',
  qisqa:'10-sinf (organik kimyo) · 8-sinfda tanishuv',
  sahna:'molekula',
  kor:{
    sarlavha:'Faqat uglerod va vodoroddan',
    matn:'Uglevodorodlar — faqat uglerod va vodorod atomlaridan tuzilgan organik birikmalar. Uglerod atomlari bir-biri bilan bir, qo‘sh yoki uch bog‘ hosil qilishi mumkin va shu bog‘ turi molekulaning fazoviy shaklini belgilaydi. Tabiiy gaz, neft va ulardan olinadigan yoqilg‘ilar asosan uglevodorodlardan iborat. Beshta molekulani aylantirib, burchaklar va bog‘larni solishtiring.',
    punktlar:['<b>Alkanlar</b> (CH₄, C₂H₆) — faqat bir bog‘, sp³, ≈109,5°','<b>Alkenlar</b> (C₂H₄) — bitta C=C, sp², ≈120°','<b>Alkinlar</b> (C₂H₂) — bitta C≡C, sp, 180°','<b>Arenlar</b> (C₆H₆) — tekis halqa, sp², 120°'],
    molekulalar:[['CH4','CH₄ · metan'],['C2H6','C₂H₆ · etan'],['C2H4','C₂H₄ · eten (etilen)'],['C2H2','C₂H₂ · etin (atsetilen)'],['C6H6','C₆H₆ · benzol']]
  },
  bolimlar:[
    {sarlavha:'Beshta uglevodorod', jadval:[
      ['Metan CH₄','alkan · 4 ta C–H · sp³ · tetraedr, ≈109,5°'],
      ['Etan C₂H₆','alkan · C–C bir bog‘ · sp³ · burchaklar ≈109,5°'],
      ['Eten (etilen) C₂H₄','alken · C=C qo‘sh bog‘ · sp² · tekis, ≈120°'],
      ['Etin (atsetilen) C₂H₂','alkin · C≡C uch bog‘ · sp · chiziqli, 180°'],
      ['Benzol C₆H₆','aren · tekis olti burchakli halqa · sp² · 120°'],
      ['Alkanlar umumiy formulasi','CₙH₂ₙ₊₂'],
      ['Alkenlar umumiy formulasi','CₙH₂ₙ'],
      ['Alkinlar umumiy formulasi','CₙH₂ₙ₋₂']
    ]},
    {sarlavha:'Uglerod–uglerod bog‘ uzunligi (taxminiy)', jadval:[['C–C (etan)','≈0,154 nm'],['C=C (eten)','≈0,134 nm'],['C≡C (etin)','≈0,120 nm'],['Benzoldagi C–C','≈0,139–0,140 nm (hammasi bir xil)']],
     matn:'Bog‘ karraliligi ortgan sari uglerod atomlari bir-biriga yaqinlashadi. Benzolda oltita bog‘ning hammasi bir xil uzunlikda — oddiy va qo‘sh bog‘ oralig‘ida. Eten uchun 120° — ideal (sp²) qiymat; tajribada H–C–H burchagi biroz kichikroq (≈117°) o‘lchanadi.'},
    {sarlavha:'Qayerda uchraydi va ishlatiladi', jadval:[['Metan','Tabiiy gazning asosiy qismi; yoqilg‘i'],['Etan','Tabiiy gaz tarkibida; eten olish uchun xomashyo'],['Eten','Polietilen ishlab chiqarish; mevalarning pishishini tezlashtiruvchi o‘simlik gormoni'],['Etin','Atsetilen-kislorod alangasida metall payvandlash va kesish'],['Benzol','Plastmassa, bo‘yoq, dori ishlab chiqarishda xomashyo; zaharli']]}
  ],
  bosqichlar:[
    {sarlavha:'Metan — tetraedr', matn:'Uglerod to‘rtta vodorod bilan bir bog‘ hosil qiladi. To‘rt bog‘ fazoda bir-biridan eng uzoq yo‘nalgan: burchaklar ≈109,5°, gibridlanish sp³.', mol:'CH4'},
    {sarlavha:'Etan — ikki tetraedr', matn:'Ikki uglerod atomi C–C bir bog‘ bilan bog‘langan, har biri yana uchta vodorodga ega. Bir bog‘ atrofida guruhlar aylana oladi.', mol:'C2H6'},
    {sarlavha:'Eten — tekis molekula', matn:'C=C qo‘sh bog‘: bitta σ va bitta π bog‘. Barcha 6 atom bir tekislikda, burchaklar ≈120° (sp²). Qo‘sh bog‘ atrofida erkin aylanish yo‘q.', mol:'C2H4'},
    {sarlavha:'Etin — chiziqli molekula', matn:'C≡C uch bog‘: bitta σ va ikkita π bog‘. To‘rt atom bir chiziqda, burchak 180° (sp).', mol:'C2H2'},
    {sarlavha:'Benzol — aromatik halqa', matn:'Olti uglerod tekis olti burchakli halqa hosil qiladi; π-elektronlar butun halqa bo‘ylab umumlashgan. Burchaklar 120°, barcha C–C bog‘lari teng.', mol:'C6H6'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Molekulani tahlil qiling',
    topshiriqlar:[
      {shart:'Sahnadagi molekula qaysi sinfga kiradi?', holat:{mol:'C2H4'}, v:['Alkan','Alken','Alkin'], t:1, izoh:'C₂H₄ — bitta C=C qo‘sh bog‘: <b>alken</b> (eten).'},
      {shart:'Bu molekulada uglerod atomlari qanday gibridlangan?', holat:{mol:'C2H2'}, v:['sp³','sp²','sp'], t:2, izoh:'Etinda uch bog‘ va chiziqli shakl — <b>sp</b>, burchak 180°.'},
      {shart:'Molekuladagi H–C–H burchagi taxminan qancha?', holat:{mol:'CH4'}, v:['109,5°','120°','180°'], t:0, izoh:'Metan — tetraedr, <b>≈109,5°</b>.'},
      {shart:'Bu molekulaning shakli qanday?', holat:{mol:'C6H6'}, v:['Tetraedr','Chiziqli','Tekis olti burchakli halqa'], t:2, izoh:'Benzol — <b>tekis halqa</b>, burchaklar 120°.'},
      {shart:'Molekulada uglerod atomlari orasida qanday bog‘ bor?', holat:{mol:'C2H6'}, v:['Bir bog‘ (C–C)','Qo‘sh bog‘','Uch bog‘'], t:0, izoh:'Etan — alkan, <b>C–C bir bog‘</b>.'}
    ]},
  test:[
    {s:'Metan molekulasining shakli qanday?', v:['Tekis kvadrat','Chiziqli','Tetraedr','Halqa'], t:2, izoh:'CH₄ — <b>tetraedr</b>, ≈109,5°.'},
    {s:'Qaysi modda alkin?', v:['C₂H₂','C₂H₄','C₂H₆','CH₄'], t:0, izoh:'<b>C₂H₂</b> (etin) — uch bog‘ga ega, CₙH₂ₙ₋₂.'},
    {s:'Etendagi uglerod atomlarining gibridlanishi?', v:['sp','sp³','sp²','gibridlanmagan'], t:2, izoh:'Qo‘sh bog‘li uglerod — <b>sp²</b>, ≈120°.'},
    {s:'Etin molekulasidagi H–C–C burchagi?', v:['109,5°','180°','120°','104,5°'], t:1, izoh:'sp-gibridlanish — <b>chiziqli, 180°</b>.'},
    {s:'Qaysi bog‘ eng qisqa?', v:['C–C','C=C','Benzoldagi C–C','C≡C'], t:3, izoh:'<b>C≡C</b> ≈0,120 nm; karralilik ortsa bog‘ qisqaradi.'},
    {s:'Alkanlarning umumiy formulasi?', v:['CₙH₂ₙ','CₙH₂ₙ₋₂','CₙH₂ₙ₊₂','CₙHₙ'], t:2, izoh:'Alkanlar — <b>CₙH₂ₙ₊₂</b> (CH₄, C₂H₆).'},
    {s:'Benzoldagi C–C bog‘lari haqida qaysi fikr to‘g‘ri?', v:['Uchtasi qo‘sh, uchtasi bir bog‘ va uzunliklari har xil','Hammasi bir xil uzunlikda','Hammasi uch bog‘','Halqa tekis emas'], t:1, izoh:'Benzolda π-elektronlar umumlashgan — <b>barcha bog‘lar teng</b>.'},
    {s:'Qaysi modda payvandlashda alanga hosil qilish uchun ishlatiladi?', v:['Benzol','Etan','Metan','Atsetilen'], t:3, izoh:'<b>Atsetilen</b>-kislorod alangasi metallni payvandlash va kesishda ishlatiladi.'}
  ],
  xavfsizlik:['Metan va boshqa uglevodorod gazlari havo bilan portlovchi aralashma hosil qiladi — gaz hidi sezilsa olov yoqilmaydi, xona shamollatiladi va gaz xizmatiga xabar beriladi.','Benzol zaharli va kanserogen modda — maktab laboratoriyasida u bilan tajriba o‘tkazilmaydi.'],
  maqola:[
    {sarlavha:'Kirish: uglevodorodlar nima?', xatboshilar:[
      'Uglevodorodlar — molekulasi faqat uglerod va vodorod atomlaridan tuzilgan organik birikmalar. Ular organik kimyoning eng oddiy sinfi hisoblanadi: boshqa organik moddalarni uglevodoroddagi vodorod atomlari o‘rniga turli guruhlar qo‘yilgan hosila sifatida qarash mumkin. Shu sababli organik kimyo kursi aynan uglevodorodlardan boshlanadi.',
      'Kundalik hayotda uglevodorodlar bilan har kuni uchrashamiz. Uyimizdagi tabiiy gaz asosan metandan iborat. Benzin, dizel yoqilg‘isi va suyultirilgan gaz — uglevodorodlar aralashmasi. Polietilen paket, plastmassa idishlar va sintetik tolalar ham uglevodorodlardan olinadi.',
      'Uglerodning muhim xususiyati — o‘z atomlari bilan uzun zanjirlar va halqalar hosil qila olishi hamda bir, qo‘sh va uch bog‘ yarata olishi. Bog‘ turiga qarab uglevodorodlar alkanlar, alkenlar, alkinlar va arenlarga bo‘linadi. Bu darsda har bir sinfning eng oddiy vakilini 3D da ko‘rib chiqamiz.',
      'Uglevodorodlarning nomlari ham tizimli tuziladi. Birinchi to‘rt vakilning nomi tarixiy: metan, etan, propan, butan; beshtadan boshlab nom yunoncha son asosida yasaladi: pentan, geksan va hokazo. Sinfni qo‘shimcha ko‘rsatadi: «-an» — alkan, «-en» — alken, «-in» — alkin. Shuning uchun etan, eten va etin nomlari faqat oxirgi qo‘shimchasi bilan farq qiladi, lekin uchala molekulada ham ikkita uglerod atomi bor.'
    ]},
    {sarlavha:'Uglerod atomi va gibridlanish', xatboshilar:[
      'Uglerod organik birikmalarda to‘rt valentli: u to‘rtta kovalent bog‘ hosil qiladi. Bog‘lar fazoda qanday yo‘nalishini tushuntirish uchun gibridlanish modeli qo‘llaniladi. Bu model Poling tomonidan taklif qilingan va unga ko‘ra atomning tashqi s- va p-orbitallari aralashib, bir xil shakldagi yangi — gibrid — orbitallar hosil qiladi.',
      'Uglerod to‘rtta bir bog‘ hosil qilganda sp³-gibridlanish kuzatiladi: to‘rt gibrid orbital tetraedr uchlariga yo‘naladi va bog‘lar orasidagi burchak ≈109,5° bo‘ladi. Qo‘sh bog‘ hosil qilganda uglerod sp²-gibridlangan: uchta gibrid orbital bir tekislikda ≈120° burchak ostida joylashadi, gibridlanmay qolgan p-orbital π-bog‘ hosil qiladi.',
      'Uch bog‘ hosil qilganda uglerod sp-gibridlangan: ikkita gibrid orbital qarama-qarshi tomonga, 180° burchak ostida yo‘naladi, ikkita p-orbital esa ikki π-bog‘ hosil qiladi. Shunday qilib, «bog‘ turi → gibridlanish → shakl» zanjirini eslab qolsangiz, istalgan oddiy uglevodorod shaklini oldindan ayta olasiz.'
    ]},
    {sarlavha:'Alkanlar: metan va etan', xatboshilar:[
      'Metan CH₄ — eng oddiy uglevodorod. Uning molekulasida uglerod to‘rtta vodorod bilan bir bog‘ hosil qiladi va molekula muntazam tetraedr shaklida bo‘ladi. Metan rangsiz va hidsiz gaz; uyga keladigan tabiiy gazga xavfsizlik uchun maxsus hidli modda qo‘shiladi, shunda gaz sizib chiqsa odam sezadi.',
      'Etan C₂H₆ da ikki uglerod atomi o‘zaro C–C bir bog‘ bilan bog‘langan va har biri uchtadan vodorodga ega. Har bir uglerod atrofi yana tetraedrga yaqin, bog‘ uzunligi C–C taxminan 0,154 nm. Bir bog‘ atrofida molekula qismlari aylana oladi, shuning uchun etan bir necha fazoviy shaklda (konformatsiyada) bo‘lishi mumkin.',
      'Alkanlarda faqat bir bog‘lar bor, shuning uchun ular «to‘yingan» uglevodorodlar deb ham ataladi. Ularning umumiy formulasi CₙH₂ₙ₊₂. Alkanlar nisbatan passiv, asosan yonish va o‘rin olish reaksiyalariga kirishadi; eng muhim qo‘llanishi — yoqilg‘i sifatida.',
      'Alkanlar to‘liq yonganda karbonat angidrid va suv hosil bo‘ladi va ko‘p issiqlik ajraladi. Kislorod yetishmaganda esa yonish to‘liq bo‘lmaydi va zaharli is gazi (CO) hosil bo‘lishi mumkin. Shuning uchun gaz plitasi va gaz isitgichlari ishlaydigan xonada yaxshi shamollatish bo‘lishi, mo‘rilar esa soz bo‘lishi hayot uchun muhim. Bu kimyoviy bilimning bevosita xavfsizlik bilan bog‘liq qo‘llanishidir.'
    ]},
    {sarlavha:'To‘yinmagan uglevodorodlar: eten va etin', xatboshilar:[
      'Eten (etilen) C₂H₄ da uglerod atomlari qo‘sh bog‘ bilan bog‘langan. Qo‘sh bog‘ bitta σ-bog‘ va bitta π-bog‘dan iborat. Molekuladagi barcha olti atom bir tekislikda yotadi, ideal burchak 120°; tajribada H–C–H burchagi biroz kichik (≈117°) chiqadi. π-bog‘ tufayli qo‘sh bog‘ atrofida erkin aylanish bo‘lmaydi.',
      'Etenning umumiy formulasi CₙH₂ₙ bo‘lgan alkenlar sinfiga kiradi. π-bog‘ nisbatan oson uziladi, shuning uchun alkenlar birikish reaksiyalariga moyil: masalan, eten bromli suvni rangsizlantiradi. Ko‘p eten molekulalarining bir-biriga birikishidan polietilen hosil bo‘ladi. Eten o‘simliklarda ham hosil bo‘ladi va mevalarning pishishini tezlashtiradi.',
      'Etin (atsetilen) C₂H₂ da uglerod atomlari uch bog‘ bilan bog‘langan: bitta σ va ikkita π-bog‘. Molekula chiziqli, barcha to‘rt atom bir to‘g‘ri chiziqda. C≡C bog‘i uzunligi taxminan 0,120 nm — C–C va C=C dan qisqa. Atsetilen kislorodda yonganda juda issiq alanga beradi va metallarni payvandlash hamda kesishda ishlatiladi.'
    ]},
    {sarlavha:'Benzol va aromatiklik', xatboshilar:[
      'Benzol C₆H₆ ni 1825-yilda ingliz olimi Maykl Faradey kashf etgan. Uzoq vaqt uning tuzilishi jumboq bo‘lib qoldi: formulaga ko‘ra molekula juda to‘yinmagan bo‘lishi kerak edi, lekin benzol alkenlar kabi oson birikish reaksiyasiga kirishmaydi. 1865-yilda nemis kimyogari Avgust Kekule benzolning halqasimon tuzilishini taklif qildi.',
      'Hozirgi tushunchaga ko‘ra benzolda olti uglerod tekis muntazam olti burchakli halqa hosil qiladi. Har bir uglerod sp²-gibridlangan, burchaklar 120°. Gibridlanmagan p-orbitallar halqa ustida va ostida umumiy π-elektron bulutini hosil qiladi. Shu sababli benzoldagi oltita C–C bog‘ining hammasi bir xil uzunlikda — taxminan 0,139–0,140 nm, ya’ni oddiy va qo‘sh bog‘ oralig‘ida.',
      'Bunday umumlashgan π-elektronli barqaror halqa «aromatik» deb ataladi. Benzol plastmassa, bo‘yoq, dori va boshqa moddalar ishlab chiqarishda muhim xomashyo. Lekin u zaharli va kanserogen modda, shuning uchun maktab laboratoriyasida benzol bilan tajriba qilinmaydi — uni 3D modelda o‘rganish eng xavfsiz yo‘l.',
      'Kekule tuzilishi haqida mashhur rivoyat bor: go‘yo olim tushida o‘z dumini tishlagan ilonni ko‘rib, halqa g‘oyasiga kelgan. Bu hikoyani Kekulening o‘zi keyinroq aytib bergan, lekin tarixchilar uning qanchalik aniq ekanini muhokama qilishadi. Muhimi shundaki, benzol halqasi g‘oyasi tajriba natijalari bilan tasdiqlandi va organik kimyoning butun bir bo‘limi — aromatik birikmalar kimyosi — shu asosda rivojlandi.'
    ]},
    {sarlavha:'Qo‘llanishi va ko‘p uchraydigan xatolar', xatboshilar:[
      'Uglevodorodlar energetika va kimyo sanoatining asosi. Neft va tabiiy gazni qayta ishlash, yoqilg‘i, polimerlar va o‘g‘itlar ishlab chiqarish uglevodorodlar kimyosiga tayanadi. Kimyo texnologi, neft-gaz muhandisi, ekolog kabi kasb egalari uchun bu mavzu kasbiy bilimning boshlanishidir.',
      'Ko‘p uchraydigan xato — tuzilish formulasi qog‘ozda tekis chizilgani uchun metanni ham tekis kvadrat deb o‘ylash. Aslida metan tetraedr va burchaklar 90° emas, ≈109,5°. Yana bir xato — benzolni «uchta qo‘sh va uchta bir bog‘li» deb, bog‘ uzunliklari har xil deb hisoblash; tajriba barcha bog‘lar teng ekanini ko‘rsatadi.',
      'Eslab qolish usuli: «bir — uch — ikki» emas, «bog‘ ko‘paysa, burchak ochiladi»: bir bog‘ — 109,5°, qo‘sh bog‘ — 120°, uch bog‘ — 180°. Umumiy formulalar uchun esa: alkan +2, alken 0, alkin −2 (CₙH₂ₙ ga nisbatan).'
    ]}
  ],
  formulalar:[
    ['CₙH₂ₙ₊₂','Alkanlar (metan CH₄, etan C₂H₆)'],
    ['CₙH₂ₙ','Alkenlar (eten C₂H₄)'],
    ['CₙH₂ₙ₋₂','Alkinlar (etin C₂H₂)'],
    ['CH₄ + 2O₂ → CO₂ + 2H₂O','Metanning to‘liq yonishi'],
    ['CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br','Etenning bromga birikishi (bromli suv rangsizlanadi)']
  ],
  qiziqarli:[
    'Benzolni 1825-yilda Maykl Faradey kashf etgan, halqasimon tuzilishini esa 1865-yilda Avgust Kekule taklif qilgan.',
    'Eten (etilen) o‘simlik gormoni: u mevalarning pishishini tezlashtiradi, shuning uchun pishgan mevalar yonidagi xom mevalar tezroq pishadi.',
    'Metan rangsiz va hidsiz gaz; maishiy gazga sizib chiqqanda sezilishi uchun maxsus hidli modda qo‘shiladi.',
    'Atsetilen-kislorod alangasi metallni kesish va payvandlashda ishlatiladi — bu eng issiq gaz alangalaridan biri.'
  ],
  lugat:[
    ['Uglevodorod','Faqat uglerod va vodoroddan iborat organik birikma.'],
    ['Alkan','Faqat bir bog‘li (to‘yingan) uglevodorod, CₙH₂ₙ₊₂.'],
    ['Alken','Bitta C=C qo‘sh bog‘li uglevodorod, CₙH₂ₙ.'],
    ['Alkin','Bitta C≡C uch bog‘li uglevodorod, CₙH₂ₙ₋₂.'],
    ['Aren','Aromatik halqali uglevodorod (benzol).'],
    ['Gibridlanish','Atom orbitallarining aralashib, bir xil gibrid orbitallar hosil qilishi (model).'],
    ['σ-bog‘ (sigma)','Atomlar markazini tutashtiruvchi chiziq bo‘ylab hosil bo‘ladigan bog‘.'],
    ['π-bog‘ (pi)','p-orbitallarning yon tomondan qoplanishidan hosil bo‘ladigan bog‘; qo‘sh va uch bog‘da bo‘ladi.'],
    ['To‘yinmagan birikma','Qo‘sh yoki uch bog‘ga ega, birikish reaksiyasiga moyil birikma.'],
    ['Aromatiklik','Tekis halqada π-elektronlarning umumlashishi va shu tufayli ortiqcha barqarorlik.'],
    ['Polimerlanish','Ko‘p kichik molekulalarning birikib yirik molekula hosil qilishi (eten → polietilen).']
  ],
  manba:'10-sinf «Kimyo» (organik kimyo) darsligi (O‘zbekiston) — «Uglevodorodlar» bo‘limi; Wikipedia (inglizcha): «Methane», «Ethane», «Ethylene», «Acetylene», «Benzene», «Orbital hybridisation», «Bond length»; bog‘ uzunliklari — ma’lumotnoma qiymatlari (CRC Handbook), manbaga qarab ±0,001 nm farq qiladi.',
  ishlanma:{
    sinf:'10-sinf (8-sinfda tanishuv sifatida)', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D molekulalar, jadval to‘ldirish, guruhda ishlash',
    maqsad:{talimiy:'Uglevodorodlar sinflari, metan, etan, eten, etin va benzol tuzilishi, gibridlanish turlari, bog‘ burchaklari va uzunliklarini o‘rgatish.',
      tarbiyaviy:'Gaz va kimyoviy moddalar bilan ehtiyotkorlik, ekologik mas’uliyat.',
      rivojlantiruvchi:'Fazoviy tasavvur, tuzilish va xossa orasida bog‘liqlik topish.'},
    natijalar:['Beshta uglevodorodning formulasini va sinfini aytadi','sp³, sp², sp gibridlanish va tegishli burchaklarni (109,5°, 120°, 180°) biladi','Bog‘ karraliligi va uzunligi bog‘liqligini tushuntiradi','Benzolning aromatik tuzilishini izohlaydi'],
    jihozlar:['MAKON 3D sahnasi «Uglevodorodlar»','Proyektor','Shar-tayoqcha molekula modellari to‘plami','Jadval tarqatma materiali','10-sinf kimyo darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Uydagi gaz, benzin va polietilen paketning umumiy tomoni nima?»','Fikr bildiradi.'],
      ['8–18','<b>Alkanlar va gibridlanish.</b> MAKON 3D da metan va etanni aylantirib, sp³ va 109,5° ni tushuntiradi.','Jadvalni to‘ldiradi.'],
      ['18–28','<b>Eten va etin.</b> Qo‘sh va uch bog‘, σ va π bog‘lar, sp² va sp; burchaklarni solishtiradi.','Modellar to‘plamidan eten va etin yig‘adi.'],
      ['28–35','<b>Benzol.</b> Kekule tuzilishi va zamonaviy tushuncha; bog‘ uzunliklari jadvali.','Savollarga javob beradi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON «Molekulani tahlil qiling» mashqi va test.','Guruhda mashq va test bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Alkan','CₙH₂ₙ₊₂, faqat bir bog‘.'],['Alken','CₙH₂ₙ, bitta qo‘sh bog‘.'],['Alkin','CₙH₂ₙ₋₂, bitta uch bog‘.'],['Gibridlanish','Orbitallarning aralashib bir xil gibrid orbitallar hosil qilishi.'],['π-bog‘','p-orbitallarning yon tomondan qoplanishidan hosil bo‘lgan bog‘.']],
    savollar:[['Metandagi burchak?','≈109,5°'],['Etendagi uglerod gibridlanishi?','sp²'],['Etin shakli?','Chiziqli, 180°'],['Qaysi bog‘ eng qisqa: C–C, C=C, C≡C?','C≡C'],['Benzoldagi C–C bog‘lari nima uchun teng?','π-elektronlar halqa bo‘ylab umumlashgan']],
    uy:'Darslikdagi «Uglevodorodlar» bo‘limini o‘qish; propan, propen, propin formulalarini yozib, sinfini va uglerodlar gibridlanishini aniqlash.',
    manba:'10-sinf «Kimyo» darsligi; Wikipedia (Methane, Ethylene, Acetylene, Benzene).'
  }
},

/* ============ 3. NAFAS OLISH TIZIMI ============ */
'bio-nafas': {
  fan:'biologiya', qisqaNom:'Nafas', nom:'Nafas olish tizimi',
  qisqa:'8-sinf · «Odam va uning salomatligi» — Nafas olish',
  sahna:'biologiya',
  bio:{qatlamlar:{skelet:true, mushak:false, azo:true, qon:false, teri:false}, korinish:'kokrak'},
  kor:{
    sarlavha:'Har daqiqada yangilanadigan havo',
    matn:'Hujayralar energiya olishi uchun kislorod kerak, bu jarayonda esa karbonat angidrid hosil bo‘ladi. Nafas olish tizimi havoni tanaga olib kiradi, kislorodni qonga beradi va karbonat angidridni tashqariga chiqaradi. Havo burun bo‘shlig‘i, halqum, hiqildoq, traxeya va bronxlar orqali o‘pkadagi mayda pufakchalar — alveolalarga yetib boradi. Nafas olish harakatini asosan diafragma va qovurg‘alararo mushaklar bajaradi.',
    punktlar:['<b>Havo yo‘llari:</b> burun bo‘shlig‘i → halqum → hiqildoq → traxeya → bronxlar','<b>O‘pka:</b> o‘ng o‘pka 3 bo‘lakli, chap o‘pka 2 bo‘lakli','<b>Alveolalar</b> — gaz almashinuvi joyi','<b>Diafragma</b> qisqarsa — nafas olinadi'],
  },
  bolimlar:[
    {sarlavha:'Nafas olish a’zolari va vazifasi', jadval:[
      ['Burun bo‘shlig‘i','Havoni isitadi, namlaydi, changdan tozalaydi (shilliq qavat, kiprikli epiteliy)'],
      ['Halqum','Havo va ovqat yo‘llari kesishadigan joy'],
      ['Hiqildoq','Tovush paylari joylashgan; hiqildoq usti tog‘ayi yutishda yo‘lni berkitadi'],
      ['Traxeya (kekirdak)','Tog‘ay yarim halqalardan iborat naycha; havoni bronxlarga o‘tkazadi'],
      ['Bronxlar','Traxeyadan ikkiga ajralib o‘pkaga kiradi va tobora mayda shoxlarga bo‘linadi'],
      ['Bronxiolalar','Eng mayda havo yo‘llari; alveolyar yo‘llar bilan tugaydi'],
      ['Alveolalar','Kapillyarlar to‘ri bilan o‘ralgan pufakchalar; gaz almashinuvi shu yerda'],
      ['Plevra','O‘pkani o‘rab turuvchi ikki qavatli parda; ishqalanishni kamaytiradi'],
      ['Diafragma','Ko‘krak va qorin bo‘shlig‘ini ajratuvchi gumbazsimon mushak; asosiy nafas mushagi']
    ]},
    {sarlavha:'Nafas olingan va chiqarilgan havo (taxminiy tarkib)', jadval:[['Kislorod','nafas olingan ≈21% · chiqarilgan ≈16%'],['Karbonat angidrid','nafas olingan ≈0,04% · chiqarilgan ≈4%'],['Azot','≈78% · deyarli o‘zgarmaydi'],['Suv bug‘i','chiqarilgan havoda ko‘proq']],
     matn:'Qiymatlar darsliklarda yumaloqlab beriladi; atmosferadagi CO₂ ulushi yillar davomida sekin oshib bormoqda.'},
    {sarlavha:'Raqamlarda (o‘rtacha, kattalar uchun)', jadval:[['Tinch holatda nafas soni','darsliklarda daqiqasiga 16–20 marta (boshqa manbalarda 12–20)'],['Bir nafasdagi havo hajmi (tinch)','≈500 ml'],['O‘pkaning tiriklik sig‘imi','≈3,5 l atrofida; yosh, jins, bo‘y va mashqqa bog‘liq — manbalar farq qiladi'],['Alveolalar soni','manbalar farq qiladi: ≈300 mln dan ≈500 mln gacha'],['Alveolalar umumiy yuzasi','manbalar farq qiladi: ≈50–100 m²']]}
  ],
  bosqichlar:[
    {sarlavha:'Ko‘krak qafasi', matn:'Qovurg‘alar, to‘sh suyagi va umurtqa pog‘onasi o‘pka va yurakni himoya qiladi. Nafas olganda ko‘krak qafasi hajmi o‘zgaradi.', korinish:'kokrak'},
    {sarlavha:'Traxeya va bronxlar', matn:'Traxeya tog‘ay yarim halqalari tufayli bekilib qolmaydi. U ikki bosh bronxga ajraladi, bronxlar o‘pka ichida daraxt shoxlaridek tarmoqlanadi.', azo:'nafas', korinish:'kokrak'},
    {sarlavha:'O‘pkalar', matn:'O‘ng o‘pka uch, chap o‘pka ikki bo‘lakdan iborat — chap tomonda yurak joylashgani uchun chap o‘pka biroz kichikroq.', azo:'opka', korinish:'kokrak'},
    {sarlavha:'Alveolalar va qon', matn:'Alveola devori va kapillyar devori juda yupqa: kislorod alveoladan qonga, karbonat angidrid qondan alveolaga diffuziya orqali o‘tadi. Kislorodga boyigan qon yurakka qaytadi.', azo:'yurak', korinish:'kokrak'},
    {sarlavha:'Nafasni boshqarish', matn:'Nafas markazi uzunchoq miyada joylashgan. Qonda CO₂ ortsa, markaz nafasni tezlashtiradi.', azo:'miya', korinish:'butun'}
  ],
  amaliyot:{tur:'biologiya', sarlavha:'Nafas a’zolarini toping',
    topshiriqlar:[
      {shart:'Havoni o‘pkaga olib boruvchi traxeya va bronxlarni bosing', azo:'nafas'},
      {shart:'Gaz almashinuvi sodir bo‘ladigan a’zo — o‘pkani bosing', azo:'opka'},
      {shart:'O‘pkadan kislorodli qonni qabul qiluvchi a’zoni bosing', azo:'yurak'},
      {shart:'Nafas markazi joylashgan a’zoni bosing', azo:'miya'}
    ]},
  test:[
    {s:'Gaz almashinuvi qayerda sodir bo‘ladi?', v:['Traxeyada','Bronxlarda','Alveolalarda','Hiqildoqda'], t:2, izoh:'<b>Alveolalar</b> devori orqali gazlar qon bilan almashinadi.'},
    {s:'O‘ng o‘pka nechta bo‘lakdan iborat?', v:['3','2','4','1'], t:0, izoh:'O‘ng o‘pka — <b>3</b>, chap o‘pka — 2 bo‘lak.'},
    {s:'Nafas olish paytida diafragma nima qiladi?', v:['Bo‘shashib yuqoriga ko‘tariladi','Qisqarib pastga tushadi (tekislanadi)','Harakatsiz qoladi','Yurakni siqadi'], t:1, izoh:'Diafragma <b>qisqarib tekislanadi</b>, ko‘krak qafasi hajmi oshadi va havo kiradi.'},
    {s:'Traxeyaning bekilib qolmasligini nima ta’minlaydi?', v:['Mushak halqalar','Suyak halqalar','Plevra','Tog‘ay yarim halqalar'], t:3, izoh:'Traxeya devorida <b>tog‘ay yarim halqalar</b> bor.'},
    {s:'Chiqarilgan havoda karbonat angidrid taxminan necha foiz?', v:['0,04%','4%','16%','21%'], t:1, izoh:'Chiqarilgan havoda CO₂ <b>≈4%</b>, nafas olinganda ≈0,04%.'},
    {s:'Nafas markazi qayerda joylashgan?', v:['Uzunchoq miyada','Yurakda','O‘pkada','Diafragmada'], t:0, izoh:'Nafas markazi <b>uzunchoq miyada</b>.'},
    {s:'Burun bo‘shlig‘ining vazifasi qaysi?', v:['Gaz almashinuvi','Tovush hosil qilish','Havoni isitish, namlash va tozalash','Qonni tozalash'], t:2, izoh:'Burun bo‘shlig‘i havoni <b>isitadi, namlaydi va changdan tozalaydi</b>.'},
    {s:'Qonda CO₂ miqdori oshsa, nafas qanday o‘zgaradi?', v:['Sekinlashadi','To‘xtaydi','O‘zgarmaydi','Tezlashadi va chuqurlashadi'], t:3, izoh:'Nafas markazi CO₂ ortishiga <b>nafasni kuchaytirib</b> javob beradi.'}
  ],
  yordamchi:[
    {s:'Nima uchun burundan nafas olish kerak?', j:'Burun bo‘shlig‘ida havo isiydi, namlanadi, shilliq va tukchalar changni ushlab qoladi. Og‘izdan nafas olganda bu himoya bo‘lmaydi.', kalit:['burun','og‘iz']},
    {s:'Alveola nima?', j:'O‘pkadagi eng mayda havo pufakchalari. Ular kapillyarlar to‘ri bilan o‘ralgan va devori juda yupqa — kislorod va karbonat angidrid shu yerda almashinadi.', kalit:['alveola','pufakcha']}
  ],
  maqola:[
    {sarlavha:'Kirish: nima uchun nafas olamiz?', xatboshilar:[
      'Odam ovqatsiz bir necha hafta, suvsiz bir necha kun yashashi mumkin, lekin nafas olmasdan bir necha daqiqadan keyin miya hujayralari zararlana boshlaydi. Buning sababi shundaki, tanamizdagi hujayralar ozuqa moddalarni kislorod yordamida parchalab energiya oladi va kislorod zaxirasi tanada deyarli saqlanmaydi. Nafas olish tizimi aynan shu kislorodni to‘xtovsiz yetkazib turadi.',
      'Oksidlanish jarayonida karbonat angidrid hosil bo‘ladi. U tanada to‘planib qolsa, qonning kislotaliligini o‘zgartiradi va zararli bo‘ladi. Shuning uchun nafas olish ikki tomonlama vazifani bajaradi: kislorodni olib kirish va karbonat angidridni chiqarish. Bu jarayon gaz almashinuvi deb ataladi.',
      'Nafas olish tizimi qon aylanish tizimi bilan uzviy bog‘liq: o‘pka kislorodni qonga beradi, yurak va qon tomirlari esa uni barcha hujayralarga yetkazadi. Shu sababli bu darsda o‘pka bilan birga yurakni ham sahnada ko‘rib chiqamiz.',
      'Nafas olishni ikki bosqichga ajratib o‘rganish qulay. Tashqi nafas — o‘pka va atmosfera o‘rtasida havo almashinuvi hamda alveolalarda qon bilan gaz almashinuvi. Hujayra nafasi (ichki nafas) — hujayralar ichida, asosan mitoxondriyalarda, ozuqa moddalarning kislorod yordamida oksidlanib energiya ajralishi. Bu ikki jarayonni qon aylanish tizimi bog‘lab turadi: qon kislorodni o‘pkadan hujayralarga, karbonat angidridni esa hujayralardan o‘pkaga tashiydi.'
    ]},
    {sarlavha:'Havo yo‘llari: burundan bronxlargacha', xatboshilar:[
      'Havo avval burun bo‘shlig‘iga kiradi. Bu yerda shilliq qavat va qon tomirlariga boy devorlar havoni isitadi va namlaydi, kiprikli epiteliy va shilliq esa chang zarralari va mikroblarni ushlab qoladi. Shuning uchun burundan nafas olish og‘izdan nafas olishga qaraganda foydaliroq.',
      'Burun bo‘shlig‘idan havo halqum orqali hiqildoqqa o‘tadi. Halqumda havo va ovqat yo‘llari kesishadi, shuning uchun yutish paytida hiqildoq usti tog‘ayi hiqildoq kirishini berkitadi. Hiqildoqda tovush paylari joylashgan — ular orasidan havo o‘tganda tovush hosil bo‘ladi. (Halqum va hiqildoq 3D modelda alohida ko‘rsatilmagan.)',
      'Hiqildoqdan keyin traxeya — kekirdak boshlanadi. Uning devorida orqa tomoni ochiq tog‘ay yarim halqalar bor, ular naychaning bekilib qolishiga yo‘l qo‘ymaydi, orqadagi yumshoq qism esa qizilo‘ngachdan ovqat o‘tishini osonlashtiradi. Traxeya ko‘krak qafasida ikki bosh bronxga ajraladi. Bronxlar o‘pka ichida tobora mayda shoxlarga bo‘linib, «bronx daraxti»ni hosil qiladi va eng mayda bronxiolalar bilan tugaydi.'
    ]},
    {sarlavha:'O‘pka va alveolalar tuzilishi', xatboshilar:[
      'O‘pkalar ko‘krak bo‘shlig‘ida, yurakning ikki yonida joylashgan juft a’zo. O‘ng o‘pka uch bo‘lakdan, chap o‘pka ikki bo‘lakdan iborat; chap o‘pka yurak joylashgani uchun biroz kichikroq. Har bir o‘pkani ikki qavatli parda — plevra o‘rab turadi, qavatlar orasidagi ozgina suyuqlik nafas harakatida ishqalanishni kamaytiradi.',
      'Bronxiolalar alveolyar yo‘llar va alveolalar bilan tugaydi. Alveola — devori bir qavat hujayradan iborat mayda pufakcha bo‘lib, tashqi tomondan kapillyarlar to‘ri bilan zich o‘ralgan. Alveolalar soni juda ko‘p: darsliklarda ko‘pincha taxminan 300 million deyiladi, zamonaviy o‘lchashlarda esa 500 millionga yaqin son olingan — manbalar farq qiladi.',
      'Alveolalar tufayli o‘pkaning gaz almashinuvi yuzasi juda katta bo‘ladi; turli manbalarda bu yuza taxminan 50 dan 100 m² gacha baholanadi. Alveolalar ichki yuzasini maxsus modda — surfaktant qoplaydi, u pufakchalarning nafas chiqarganda yopishib qolishiga yo‘l qo‘ymaydi.',
      'O‘pka to‘qimasining o‘zi elastik bo‘ladi: u cho‘zilganda tiklanishga intiladi. Nafas chiqarish tinch holatda passiv bo‘lishining sabablaridan biri ham shu elastiklikdir. Ko‘krak bo‘shlig‘i germetik yopiq bo‘lgani uchun o‘pka ko‘krak qafasi devoriga «yopishgandek» uning harakatiga ergashadi. Ko‘krak qafasi jarohatlanib, plevra bo‘shlig‘iga havo kirsa, o‘pka puchayib qolishi mumkin — bu shoshilinch tibbiy yordam talab qiladigan holat.'
    ]},
    {sarlavha:'Nafas olish mexanizmi va gaz almashinuvi', xatboshilar:[
      'O‘pkada mushak yo‘q, u o‘zi kengaya olmaydi. O‘pka ko‘krak qafasi hajmi o‘zgarishiga ergashadi. Nafas olganda diafragma qisqarib, gumbaz shaklidan tekislanadi va pastga tushadi, tashqi qovurg‘alararo mushaklar esa qovurg‘alarni ko‘taradi. Ko‘krak bo‘shlig‘i hajmi oshadi, o‘pka ichidagi bosim atmosfera bosimidan pasayadi va havo o‘pkaga kiradi.',
      'Tinch holatda nafas chiqarish asosan passiv: mushaklar bo‘shashadi, diafragma yana gumbaz shakliga qaytadi, ko‘krak qafasi hajmi kamayadi va havo tashqariga chiqadi. Jismoniy ish paytida nafas chiqarishda ichki qovurg‘alararo va qorin mushaklari ham faol ishtirok etadi. Tinch holatda bir nafasda taxminan 500 ml havo almashadi.',
      'Alveolaga kirgan havoda kislorod ko‘p, alveolani o‘rab turgan kapillyardagi venoz qonda esa kam. Shu farq tufayli kislorod diffuziya orqali qonga o‘tadi va eritrotsitlardagi gemoglobin bilan birikadi. Karbonat angidrid esa teskari yo‘nalishda — qondan alveolaga o‘tadi. Natijada chiqarilgan havoda kislorod ulushi taxminan 21% dan 16% gacha kamayadi, CO₂ esa taxminan 0,04% dan 4% gacha oshadi.'
    ]},
    {sarlavha:'Nafasning boshqarilishi va tarixi', xatboshilar:[
      'Nafas olishni uzunchoq miyadagi nafas markazi boshqaradi. U qondagi karbonat angidrid miqdoriga ayniqsa sezgir: yugurganda mushaklar ko‘p CO₂ hosil qiladi, markaz buni sezib nafasni tezlashtiradi va chuqurlashtiradi. Biz nafasni bir muddat ixtiyoriy ushlab tura olamiz, lekin CO₂ to‘planib borgach, nafas beixtiyor tiklanadi.',
      'Nafas olish sirlarini olimlar asrlar davomida o‘rganishgan. XVII asrda italyan olimi Marchello Malpigi mikroskop ostida o‘pkadagi mayda pufakchalar va kapillyarlarni tasvirlagan. XVIII asr oxirida kislorod kashf etildi va fransuz kimyogari Antuan Lavuazye nafas olish mohiyatan sekin kechadigan oksidlanish (yonish)ga o‘xshash jarayon ekanini ko‘rsatdi.',
      'Bugun o‘pka faoliyati spirometr yordamida o‘lchanadi: u o‘pkaning tiriklik sig‘imi va boshqa ko‘rsatkichlarni aniqlaydi. O‘pkaning tiriklik sig‘imi yosh, jins, bo‘y va jismoniy tayyorgarlikka bog‘liq bo‘lgani uchun yagona «me’yor» raqami yo‘q — shifokorlar maxsus jadvallardan foydalanadi.',
      'Jismoniy mashqlar nafas olish tizimini chiniqtiradi. Muntazam shug‘ullanadigan odamda nafas mushaklari kuchliroq bo‘ladi va bir xil yuklamada u kamroq hansiraydi. Suzish, yugurish, velosipedda yurish kabi aerob mashg‘ulotlar ayniqsa foydali. Shuning uchun sportchilarning o‘pka ko‘rsatkichlari ko‘pincha jismoniy faol bo‘lmagan tengdoshlarinikidan yaxshiroq bo‘ladi, lekin aniq farq yosh, jins va sport turiga bog‘liq.'
    ]},
    {sarlavha:'Salomatlik va ko‘p uchraydigan xatolar', xatboshilar:[
      'Nafas olish a’zolari salomatligi uchun eng muhim omillar — toza havo, muntazam jismoniy mashq va chekmaslik. Tamaki tutuni tarkibidagi moddalar kiprikli epiteliyni shikastlaydi, bronxlarda yallig‘lanish chaqiradi va o‘pka saratoni xavfini keskin oshiradi. Chang ko‘p bo‘ladigan ishlarda respirator kiyish, xonani shamollatish ham o‘pkani asraydi.',
      'Ko‘p uchraydigan xato — gaz almashinuvi traxeya yoki bronxlarda bo‘ladi deb o‘ylash. Aslida traxeya va bronxlar faqat havo yo‘li, gazlar esa faqat alveolalarda almashinadi. Yana bir xato — o‘pka o‘zi kengayadi deb hisoblash; o‘pkani diafragma va qovurg‘alararo mushaklar harakati «tortadi».',
      'Eslab qolish usuli: «Burun — tozalaydi, hiqildoq — gapiradi, traxeya — o‘tkazadi, alveola — almashtiradi, diafragma — tortadi». Uyda tajriba: kaftingizni qorin yuqori qismiga qo‘yib chuqur nafas oling — diafragma pastga tushganda qorin oldinga chiqqanini sezasiz.'
    ]}
  ],
  qiziqarli:[
    'O‘ng o‘pka uch, chap o‘pka ikki bo‘lakdan iborat — chap tomonda yurak uchun joy qoladi.',
    'Alveolalar soni bo‘yicha darsliklarda ko‘pincha 300 million deyiladi, zamonaviy stereologik o‘lchash esa o‘rtacha 480 millionga yaqin natija bergan (Ochs va hamkorlari, 2004).',
    'Nafas chiqarilgan havoda ham taxminan 16% kislorod qoladi — shuning uchun «og‘izdan og‘izga» sun’iy nafas berish usuli ishlaydi.',
    'Lavuazye XVIII asr oxirida nafas olish va yonish o‘xshash jarayonlar ekanini — ikkalasida ham kislorod sarflanib, CO₂ hosil bo‘lishini ko‘rsatgan.'
  ],
  lugat:[
    ['Nafas olish','Tanaga kislorod olib kirish va karbonat angidridni chiqarish jarayoni.'],
    ['Gaz almashinuvi','Alveola havosi va qon orasida O₂ va CO₂ ning diffuziya orqali almashinuvi.'],
    ['Hiqildoq','Tovush paylari joylashgan havo yo‘li qismi.'],
    ['Traxeya (kekirdak)','Tog‘ay yarim halqalardan iborat, hiqildoqni bronxlar bilan tutashtiruvchi naycha.'],
    ['Bronx','Traxeyadan o‘pkaga kiruvchi va tarmoqlanuvchi havo yo‘li.'],
    ['Bronxiola','Eng mayda bronx shoxchasi.'],
    ['Alveola','Kapillyarlar bilan o‘ralgan o‘pka pufakchasi, gaz almashinuvi joyi.'],
    ['Plevra','O‘pkani o‘rab turuvchi ikki qavatli seroz parda.'],
    ['Diafragma','Ko‘krak va qorin bo‘shlig‘ini ajratuvchi gumbazsimon nafas mushagi.'],
    ['O‘pkaning tiriklik sig‘imi','Eng chuqur nafas olgandan keyin chiqarish mumkin bo‘lgan eng ko‘p havo hajmi.'],
    ['Surfaktant','Alveolalar yopishib qolishiga yo‘l qo‘ymaydigan modda.'],
    ['Nafas markazi','Uzunchoq miyadagi nafasni boshqaruvchi neyronlar guruhi.']
  ],
  manba:'8-sinf «Biologiya. Odam va uning salomatligi» darsligi (O‘zbekiston) — «Nafas olish» bobi; Wikipedia (inglizcha): «Respiratory system», «Lung», «Pulmonary alveolus», «Diaphragm», «Spirometry»; alveolalar soni — Ochs M. et al., Am J Respir Crit Care Med, 2004; nafas soni va hajmlar — o‘rtacha qiymatlar, manbalarga qarab farq qiladi.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D anatomik model, oddiy tajriba (nafas soni, ko‘krak aylanasi), juftlikda ishlash',
    maqsad:{talimiy:'Nafas olish a’zolarining tuzilishi va vazifasi, gaz almashinuvi, nafas olish va chiqarish mexanizmi, nafasning boshqarilishini o‘rgatish.',
      tarbiyaviy:'Sog‘lom turmush tarzi, chekishga qarshi munosabat, toza havoning qadrini tushunish.',
      rivojlantiruvchi:'Tuzilish va vazifa bog‘liqligini topish, kuzatish va o‘lchash natijasidan xulosa chiqarish.'},
    natijalar:['Havo yo‘llarini to‘g‘ri ketma-ketlikda sanaydi','Alveolalarda gaz almashinuvini tushuntiradi','Diafragma va qovurg‘alararo mushaklar ishtirokida nafas mexanizmini izohlaydi','3D modelda traxeya, bronxlar va o‘pkani topadi'],
    jihozlar:['MAKON 3D sahnasi «Nafas olish tizimi»','Proyektor','Santimetr lenta, sekundomer','Mavjud bo‘lsa — o‘pka modeli (shisha qo‘ng‘iroq va shar)','8-sinf biologiya darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> O‘quvchilar 1 daqiqada nafas sonini sanaydi; «Nima uchun nafasni uzoq ushlab turolmaymiz?»','Sanaydi, fikr bildiradi.'],
      ['8–18','<b>Havo yo‘llari.</b> MAKON 3D da traxeya va bronxlarni ko‘rsatadi; burun, halqum, hiqildoq vazifasini tushuntiradi.','Sxemani daftarga chizadi.'],
      ['18–26','<b>O‘pka va alveolalar.</b> O‘pka bo‘laklari, alveola tuzilishi, gaz almashinuvi.','Jadvalni to‘ldiradi.'],
      ['26–34','<b>Nafas mexanizmi.</b> Diafragma harakati; ko‘krak aylanasini nafas olganda va chiqarganda o‘lchash.','Juftlikda o‘lchab, farqni yozadi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Nafas a’zolarini toping» mashqi va test.','Mashq va test bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Alveola','Gaz almashinuvi bo‘ladigan o‘pka pufakchasi.'],['Traxeya','Tog‘ay yarim halqali havo naychasi.'],['Diafragma','Asosiy nafas mushagi.'],['Plevra','O‘pka pardasi.'],['Tiriklik sig‘imi','Chuqur nafasdan keyin chiqariladigan eng ko‘p havo hajmi.']],
    savollar:[['Havo yo‘llarini tartib bilan ayting.','Burun bo‘shlig‘i, halqum, hiqildoq, traxeya, bronxlar'],['Gaz almashinuvi qayerda bo‘ladi?','Alveolalarda'],['Nafas olganda diafragma qanday harakat qiladi?','Qisqarib tekislanadi, pastga tushadi'],['Chap o‘pka necha bo‘lakli?','2 bo‘lakli'],['Nafas markazi qayerda?','Uzunchoq miyada']],
    uy:'Darslikdagi «Nafas olish» bobini o‘qish; tinch holatda va 20 marta o‘tirib-turgandan keyin nafas sonini sanab, farqni tushuntirish.',
    manba:'8-sinf «Biologiya. Odam va uning salomatligi» darsligi; Wikipedia (Respiratory system).'
  }
},

/* ============ 4. HAZM QILISH TIZIMI ============ */
'bio-hazm': {
  fan:'biologiya', qisqaNom:'Hazm', nom:'Hazm qilish tizimi',
  qisqa:'8-sinf · «Odam va uning salomatligi» — Hazm qilish',
  sahna:'biologiya',
  bio:{qatlamlar:{skelet:false, mushak:false, azo:true, qon:false, teri:false}, korinish:'butun'},
  kor:{
    sarlavha:'Ovqatdan hujayra uchun «g‘isht»gacha',
    matn:'Ovqat tarkibidagi oqsil, yog‘ va uglevodlar yirik molekulalardan iborat va ular qonga to‘g‘ridan to‘g‘ri so‘rila olmaydi. Hazm qilish tizimi ovqatni mexanik maydalaydi va fermentlar yordamida mayda molekulalarga parchalaydi. Bu molekulalar asosan ingichka ichakda qonga va limfaga so‘riladi. Hazm yo‘li bo‘ylab ovqat og‘izdan boshlab qizilo‘ngach, oshqozon va ichaklar orqali o‘tadi, jigar va oshqozon osti bezi esa o‘z shiralarini ichakka quyadi.',
    punktlar:['<b>Oshqozon</b> — xlorid kislota va pepsin: oqsillar parchalanishi boshlanadi','<b>Jigar</b> — o‘t ishlab chiqaradi, u yog‘larni emulsiyalaydi','<b>Oshqozon osti bezi</b> — oqsil, yog‘, uglevodni parchalovchi fermentlar + insulin','<b>Ingichka ichak</b> — so‘rilish; <b>yo‘g‘on ichak</b> — suv so‘rilishi']
  },
  bolimlar:[
    {sarlavha:'Hazm a’zolari va vazifasi', jadval:[
      ['Og‘iz bo‘shlig‘i','Tishlar maydalaydi; so‘lakdagi amilaza kraxmalni parchalay boshlaydi'],
      ['Qizilo‘ngach','Luqmani to‘lqinsimon qisqarishlar bilan oshqozonga o‘tkazadi'],
      ['Oshqozon','Ovqatni aralashtiradi; oshqozon shirasi (HCl, pepsin) oqsillarni parchalay boshlaydi'],
      ['12 barmoq ichak','Ingichka ichakning boshlang‘ich qismi; o‘t va oshqozon osti bezi shirasi shu yerga quyiladi'],
      ['Ingichka ichak','Hazmning tugashi va ozuqa moddalarning asosiy so‘rilishi (vorsinkalar)'],
      ['Yo‘g‘on ichak','Suv va tuzlar so‘riladi, najas hosil bo‘ladi; foydali bakteriyalar yashaydi'],
      ['Jigar','O‘t hosil qiladi, glikogen saqlaydi, zararli moddalarni zararsizlantiradi'],
      ['O‘t pufagi','O‘tni to‘playdi va kerak bo‘lganda ichakka chiqaradi'],
      ['Oshqozon osti bezi','Hazm shirasi (tripsin, amilaza, lipaza) va gormonlar (insulin, glyukagon)']
    ]},
    {sarlavha:'Asosiy fermentlar', jadval:[['Amilaza (so‘lak, oshqozon osti bezi)','Kraxmal → oddiy uglevodlar'],['Pepsin (oshqozon)','Oqsillar → peptidlar (kislotali muhitda)'],['Tripsin (oshqozon osti bezi)','Oqsillar va peptidlar → mayda peptidlar, aminokislotalar'],['Lipaza (oshqozon osti bezi)','Yog‘lar → glitserin va yog‘ kislotalari'],['O‘t (jigar)','Ferment emas: yog‘larni mayda tomchilarga ajratadi (emulsiyalaydi)']]},
    {sarlavha:'Diqqat: manbalar farq qiladigan raqamlar', jadval:[['Ingichka ichak uzunligi','o‘lchash usuliga bog‘liq: tirik odamda ≈3 m atrofida, murdada o‘lchanganda 5–6 m va undan ko‘p deyiladi'],['Jigar massasi (katta odam)','taxminan 1,5 kg; tana o‘lchamiga qarab farq qiladi'],['Oshqozon shirasi kislotaliligi','kuchli kislotali (pH taxminan 1,5–3,5); ovqat holatiga bog‘liq']],
     matn:'Bunday raqamlarni «taxminan» deb aytish to‘g‘ri — darsliklar va ensiklopediyalar turli qiymat keltiradi.'}
  ],
  bosqichlar:[
    {sarlavha:'Umumiy ko‘rinish', matn:'Hazm yo‘li — og‘izdan orqa chiqaruv teshigigacha davom etuvchi naycha va unga shira chiqaruvchi yirik bezlar. (Og‘iz, halqum va qizilo‘ngach 3D modelda ko‘rsatilmagan.)', korinish:'butun'},
    {sarlavha:'Oshqozon', matn:'Mushakli qop: ovqatni aralashtiradi, oshqozon shirasi bilan ishlaydi. Xlorid kislota mikroblarni o‘ldiradi va pepsinni faollashtiradi; shilliq devorni kislotadan himoya qiladi.', azo:'oshqozon'},
    {sarlavha:'Jigar va o‘t pufagi', matn:'Jigar — eng yirik bez. U o‘t ishlab chiqaradi, o‘t pufagida to‘planadi va yog‘li ovqat kelganda 12 barmoq ichakka quyiladi.', azo:'jigar'},
    {sarlavha:'Oshqozon osti bezi', matn:'Hazm shirasini 12 barmoq ichakka chiqaradi; alohida hujayra guruhlari (Langergans orolchalari) qonga insulin va glyukagon ajratadi.', azo:'bez'},
    {sarlavha:'Ichaklar', matn:'Ingichka ichakda hazm tugaydi va vorsinkalar orqali so‘rilish kechadi. Yo‘g‘on ichakda suv so‘riladi, bakteriyalar qolgan moddalarning bir qismini parchalaydi.', azo:'ichak'}
  ],
  amaliyot:{tur:'biologiya', sarlavha:'Hazm a’zolarini toping',
    topshiriqlar:[
      {shart:'Oqsillar hazmi boshlanadigan a’zo — oshqozonni bosing', azo:'oshqozon'},
      {shart:'O‘t ishlab chiqaradigan eng yirik bezni bosing', azo:'jigar'},
      {shart:'Insulin va tripsin ishlab chiqaradigan bezni bosing', azo:'bez'},
      {shart:'Ozuqa moddalar asosan so‘riladigan a’zo — ichakni bosing', azo:'ichak'},
      {shart:'Hazmga aloqasi yo‘q, lekin qorin bo‘shlig‘ida joylashgan qon a’zosi — taloqni toping', azo:'taloq'}
    ]},
  test:[
    {s:'Oqsillarning hazmi qayerda boshlanadi?', v:['Og‘izda','Oshqozonda','Yo‘g‘on ichakda','Jigarda'], t:1, izoh:'<b>Oshqozonda</b> pepsin oqsillarni parchalay boshlaydi.'},
    {s:'O‘t qaysi a’zoda hosil bo‘ladi?', v:['O‘t pufagida','Oshqozon osti bezida','Jigarda','12 barmoq ichakda'], t:2, izoh:'O‘t <b>jigarda</b> hosil bo‘ladi, o‘t pufagida faqat to‘planadi.'},
    {s:'O‘tning vazifasi nima?', v:['Oqsillarni parchalaydi','Kraxmalni parchalaydi','Yog‘larni emulsiyalaydi','Suvni so‘radi'], t:2, izoh:'O‘t ferment emas — u <b>yog‘larni mayda tomchilarga</b> ajratadi.'},
    {s:'Ozuqa moddalar asosan qayerda so‘riladi?', v:['Ingichka ichakda','Oshqozonda','Yo‘g‘on ichakda','Qizilo‘ngachda'], t:0, izoh:'<b>Ingichka ichak</b> vorsinkalari so‘rilish yuzasini keskin oshiradi.'},
    {s:'Insulin qaysi bezda ishlab chiqariladi?', v:['Jigarda','Qalqonsimon bezda','So‘lak bezida','Oshqozon osti bezida'], t:3, izoh:'<b>Oshqozon osti bezining</b> Langergans orolchalari insulin ishlab chiqaradi.'},
    {s:'Yo‘g‘on ichakda asosan nima so‘riladi?', v:['Aminokislotalar','Suv va tuzlar','Yog‘lar','Glyukoza'], t:1, izoh:'Yo‘g‘on ichakda asosan <b>suv va tuzlar</b> so‘riladi.'},
    {s:'Kraxmalni parchalovchi ferment qaysi?', v:['Amilaza','Pepsin','Lipaza','Tripsin'], t:0, izoh:'<b>Amilaza</b> — so‘lakda va oshqozon osti bezi shirasida.'},
    {s:'Oshqozon devorini o‘z kislotasidan nima himoya qiladi?', v:['O‘t','Vorsinkalar','Shilliq qavat','Insulin'], t:2, izoh:'Devorni qoplagan <b>shilliq</b> kislota va pepsindan himoya qiladi.'}
  ],
  yordamchi:[
    {s:'Ferment nima?', j:'Ferment — reaksiyani tezlashtiruvchi oqsil. Hazm fermentlari yirik molekulalarni (kraxmal, oqsil, yog‘) mayda, so‘riladigan molekulalarga parchalaydi. Har bir ferment faqat o‘z moddasiga ta’sir qiladi.', kalit:['ferment']},
    {s:'Taloq hazmga kiradimi?', j:'Yo‘q. Taloq qorin bo‘shlig‘ida joylashsa ham, u qon va immunitet a’zosi: eskirgan eritrotsitlarni parchalaydi va limfotsitlar hosil bo‘lishida qatnashadi.', kalit:['taloq']}
  ],
  maqola:[
    {sarlavha:'Kirish: nima uchun ovqat hazm bo‘lishi kerak?', xatboshilar:[
      'Biz non, go‘sht, sabzavot yeymiz, lekin tanamiz hujayralari bu ovqatni o‘z holicha ishlata olmaydi. Ovqatdagi kraxmal, oqsil va yog‘ molekulalari juda katta — ular ichak devori va qon tomirlari devoridan o‘ta olmaydi. Shuning uchun ovqat avval mayda, qonga so‘rila oladigan molekulalarga aylantirilishi kerak. Bu jarayon hazm qilish deyiladi.',
      'Hazm qilish ikki xil bo‘ladi. Mexanik hazmda ovqat tishlar bilan maydalanadi, oshqozon va ichak mushaklari uni aralashtiradi va suradi. Kimyoviy hazmda esa fermentlar — maxsus oqsillar — yirik molekulalarni kichiklarga parchalaydi: kraxmal oddiy qandlarga, oqsillar aminokislotalarga, yog‘lar glitserin va yog‘ kislotalariga.',
      'Hazm natijasida hosil bo‘lgan moddalar qon va limfa orqali butun tanaga tarqaladi va hujayralar uchun qurilish materiali hamda energiya manbai bo‘ladi. Hazm bo‘lmay qolgan qoldiqlar esa tanadan chiqariladi. Bu darsda hazm yo‘li bo‘ylab «sayohat» qilamiz va har bir a’zoning vazifasini 3D modelda ko‘ramiz.',
      'Hazm yo‘li devori bir necha qavatdan tuzilgan: ichki shilliq qavat shira ajratadi va so‘rilishda qatnashadi, uning ostidagi qavatda qon tomirlari va nervlar joylashadi, mushak qavati esa ovqatni aralashtiradi va suradi. Tashqi tomondan qorin bo‘shlig‘idagi a’zolarni seroz parda — qorin pardasi qoplaydi. Bu umumiy tuzilish qizilo‘ngachdan yo‘g‘on ichakkacha saqlanadi, lekin har bir bo‘limda o‘z vazifasiga moslashgan xususiyatlarga ega.'
    ]},
    {sarlavha:'Og‘izdan oshqozongacha', xatboshilar:[
      'Hazm og‘iz bo‘shlig‘ida boshlanadi. Tishlar ovqatni maydalaydi, til uni aralashtiradi, so‘lak bezlari chiqargan so‘lak ovqatni namlaydi. So‘lak tarkibidagi amilaza fermenti kraxmalni parchalay boshlaydi — shuning uchun nonni uzoq chaynasangiz, shirin ta’m sezasiz.',
      'Yutilgan luqma halqum orqali qizilo‘ngachga o‘tadi. Qizilo‘ngach devoridagi mushaklar navbatma-navbat qisqarib, luqmani to‘lqinsimon harakat bilan oshqozonga suradi. Bu harakat peristaltika deb ataladi va u hazm yo‘lining barcha qismlarida kuzatiladi. (Og‘iz, halqum va qizilo‘ngach 3D modelda alohida ko‘rsatilmagan.)',
      'Oshqozon — hazm yo‘lining kengaygan, mushakli qismi. Uning devoridagi bezlar oshqozon shirasini ishlab chiqaradi. Shira tarkibida xlorid kislota va pepsin fermenti bor. Kislota ovqat bilan kirgan ko‘p mikroblarni o‘ldiradi va pepsin ishlashi uchun kislotali muhit yaratadi, pepsin esa oqsillarni parchalay boshlaydi. Oshqozon devorini qalin shilliq qavat o‘z kislotasi va fermentidan himoya qiladi.'
    ]},
    {sarlavha:'Jigar va oshqozon osti bezi', xatboshilar:[
      'Jigar — tanadagi eng yirik bez; katta odamda uning massasi taxminan 1,5 kg ga yaqin. U qorin bo‘shlig‘ining o‘ng yuqori qismida, diafragma ostida joylashgan. Jigar hazm uchun o‘t ishlab chiqaradi. O‘t o‘t pufagida to‘planadi va ovqat, ayniqsa yog‘li ovqat 12 barmoq ichakka kelganda chiqariladi.',
      'O‘t ferment emas. Uning vazifasi — yog‘larni juda mayda tomchilarga ajratish, ya’ni emulsiyalash. Mayda tomchilarning umumiy yuzasi katta bo‘lgani uchun lipaza fermenti ularni tezroq parchalaydi. Bundan tashqari jigar qondagi zararli moddalarni zararsizlantiradi, glyukozani glikogen shaklida zaxiralaydi va ko‘plab oqsillarni sintez qiladi.',
      'Oshqozon osti bezi oshqozon ortida joylashgan va ikki xil vazifani bajaradi. Birinchidan, u hazm shirasini ishlab chiqaradi: tripsin oqsillarni, amilaza kraxmalni, lipaza yog‘larni parchalaydi; shira 12 barmoq ichakka quyiladi. Ikkinchidan, bezning Langergans orolchalari deb ataladigan hujayra guruhlari qonga insulin va glyukagon gormonlarini ajratib, qondagi qand miqdorini boshqaradi.',
      'Ichakdan so‘rilgan ozuqa moddalar bilan boyigan qon avval darvoza venasi orqali jigarga boradi va shundan keyingina umumiy qon aylanishiga qo‘shiladi. Bu tasodif emas: jigar qondagi zararli moddalarni zararsizlantiradi, ortiqcha glyukozani glikogen shaklida to‘playdi va kerak bo‘lganda qonga qaytaradi. Shu sababli jigarni tanadagi o‘ziga xos «kimyoviy laboratoriya» deb atashadi.'
    ]},
    {sarlavha:'Ichaklarda hazm va so‘rilish', xatboshilar:[
      'Ingichka ichak uch qismdan iborat: 12 barmoq ichak, och ichak va yonbosh ichak. 12 barmoq ichakda oshqozondan kelgan kislotali massa o‘t va oshqozon osti bezi shirasi bilan aralashadi. Ingichka ichak devori bezlari ham fermentlar ishlab chiqaradi va shu yerda oqsil, yog‘ va uglevodlarning hazmi oxiriga yetadi.',
      'Ingichka ichakning ichki yuzasi burmali va millionlab barmoqsimon o‘simtalar — vorsinkalar bilan qoplangan. Har bir vorsinka ichida qon kapillyarlari va limfa tomiri bor. Aminokislotalar va glyukoza qon kapillyarlariga, yog‘larning parchalanish mahsulotlari asosan limfaga so‘riladi. Vorsinkalar so‘rilish yuzasini ko‘p marta oshiradi.',
      'Hazm bo‘lmagan qoldiqlar yo‘g‘on ichakka o‘tadi. Bu yerda asosan suv va tuzlar so‘riladi va najas hosil bo‘ladi. Yo‘g‘on ichakda yashaydigan foydali bakteriyalar o‘simlik tolalarining bir qismini parchalaydi va ba’zi vitaminlar (masalan, K vitamini) hosil bo‘lishida qatnashadi. Ichak uzunligi haqidagi raqamlar o‘lchash usuliga qarab juda farq qilgani uchun ularni «taxminan» deb aytish kerak.'
    ]},
    {sarlavha:'Hazm fiziologiyasi tarixi', xatboshilar:[
      'Hazm jarayonini o‘rganishdagi mashhur kuzatuvlardan birini amerikalik harbiy shifokor Uilyam Bomont amalga oshirgan. 1822-yilda qorniga o‘q tegib, oshqozonida tuzalmagan teshik (fistula) qolgan bemor Aleksis Sen-Marten ustida u yillar davomida kuzatuv o‘tkazgan va oshqozon shirasi ovqatni kimyoviy yo‘l bilan hazm qilishini ko‘rsatgan.',
      'Rus fiziologi Ivan Pavlov hazm bezlari faoliyati va uning nerv tizimi orqali boshqarilishini chuqur o‘rgangan. Hazm fiziologiyasi bo‘yicha ishlari uchun u 1904-yilda fiziologiya va tibbiyot bo‘yicha Nobel mukofotini olgan. Pavlov ovqatni ko‘rish yoki hidlashning o‘zi ham hazm shirasi ajralishini boshlashini ko‘rsatgan.',
      'Oshqozon osti bezining gormonal vazifasi ham tarixiy kashfiyot bilan bog‘liq. 1921-yilda Kanadada Frederik Banting va Charlz Best insulinni ajratib olishgan, 1923-yilda Banting va Jon Makleod Nobel mukofotiga sazovor bo‘lishgan. Bu kashfiyot qandli diabet bilan og‘rigan millionlab odamlarning hayotini saqlab qoldi.',
      'Hozirgi zamonda hazm tizimi zamonaviy usullar bilan tekshiriladi. Endoskopiyada ingichka egiluvchan naycha uchidagi kamera yordamida qizilo‘ngach, oshqozon va ichak ichki yuzasi ko‘riladi. Ultratovush tekshiruvi (UTT) jigar, o‘t pufagi va oshqozon osti bezining holatini og‘riqsiz aniqlash imkonini beradi. Gastroenterolog shifokorlar aynan shu a’zolar kasalliklarini davolash bilan shug‘ullanadi.'
    ]},
    {sarlavha:'Salomatlik va ko‘p uchraydigan xatolar', xatboshilar:[
      'Hazm tizimi salomatligi uchun ovqatni yaxshilab chaynash, vaqtida va me’yorida ovqatlanish, tolaga boy sabzavot va mevalar yeyish, yetarli suv ichish muhim. Qo‘lni ovqatdan oldin yuvish ichak infeksiyalarining oldini oladi. Spirtli ichimliklar jigar hujayralarini zararlaydi, juda yog‘li ovqat esa jigar va o‘t pufagiga ortiqcha yuk beradi.',
      'Ko‘p uchraydigan xatolar: «o‘t o‘t pufagida hosil bo‘ladi» — aslida jigarda hosil bo‘lib, pufakda faqat to‘planadi; «o‘t yog‘ni parchalovchi ferment» — aslida o‘t emulsiyalaydi, parchalashni lipaza bajaradi; «ovqat asosan oshqozonda so‘riladi» — asosiy so‘rilish ingichka ichakda. Taloq qorin bo‘shlig‘ida joylashsa ham, hazm a’zosi emas.',
      'Eslab qolish usuli: «Og‘iz — maydalaydi, oshqozon — kislotada oqsil boshlaydi, jigar — o‘t beradi, bez — uch fermentni (tripsin, amilaza, lipaza) beradi, ingichka ichak — so‘radi, yo‘g‘on ichak — suvni qaytaradi».'
    ]}
  ],
  qiziqarli:[
    'Uilyam Bomont 1822-yilda yaralanib, oshqozonida fistula qolgan bemorni davolagan va 1825-yildan boshlab u ustida tajribalar o‘tkazib, oshqozon shirasining kimyoviy ta’sirini isbotlagan.',
    'Ivan Pavlov hazm fiziologiyasi bo‘yicha ishlari uchun 1904-yilda Nobel mukofotini olgan — bu fiziologiya sohasidagi ilk rus Nobel mukofoti.',
    'Insulin 1921-yilda Banting va Best tomonidan ajratib olingan; 1923-yilda Banting va Makleod Nobel mukofotiga sazovor bo‘lgan.',
    'Jigar — tanadagi eng yirik bez: u o‘t hosil qilishdan tashqari glikogen zaxiralaydi va zararli moddalarni zararsizlantiradi.'
  ],
  lugat:[
    ['Hazm qilish','Ovqatni mexanik va kimyoviy yo‘l bilan so‘riladigan moddalarga aylantirish.'],
    ['Ferment','Kimyoviy reaksiyani tezlashtiruvchi oqsil.'],
    ['Peristaltika','Hazm yo‘li devorining to‘lqinsimon qisqarishi.'],
    ['Oshqozon shirasi','Xlorid kislota, pepsin va shilliqdan iborat shira.'],
    ['Pepsin','Oshqozonda oqsillarni parchalovchi ferment.'],
    ['O‘t','Jigarda hosil bo‘ladigan, yog‘larni emulsiyalovchi suyuqlik.'],
    ['Emulsiyalash','Yog‘ni juda mayda tomchilarga ajratish.'],
    ['Tripsin','Oshqozon osti bezining oqsillarni parchalovchi fermenti.'],
    ['Lipaza','Yog‘larni glitserin va yog‘ kislotalariga parchalovchi ferment.'],
    ['Amilaza','Kraxmalni parchalovchi ferment.'],
    ['Vorsinka','Ingichka ichak devorining so‘rilish yuzasini oshiruvchi barmoqsimon o‘simtasi.'],
    ['Insulin','Oshqozon osti bezi gormoni; qondagi glyukoza miqdorini kamaytiradi.']
  ],
  manba:'8-sinf «Biologiya. Odam va uning salomatligi» darsligi (O‘zbekiston) — «Hazm qilish» bobi; Wikipedia (inglizcha): «Human digestive system», «Liver», «Pancreas», «Small intestine», «William Beaumont»; Nobel mukofotlari (Pavlov 1904; Banting va Macleod 1923) — nobelprize.org; ichak uzunligi, jigar massasi va pH — taxminiy, manbalar farq qiladi.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D anatomik model, oddiy tajriba (non chaynash), klaster tuzish',
    maqsad:{talimiy:'Hazm qilish a’zolari, oshqozon, jigar, oshqozon osti bezi va ichaklarning vazifasi, asosiy fermentlar va so‘rilish jarayonini o‘rgatish.',
      tarbiyaviy:'To‘g‘ri ovqatlanish, gigiyena va sog‘lom turmush tarziga ongli munosabat.',
      rivojlantiruvchi:'Jarayonni bosqichma-bosqich tasvirlash, sabab-oqibat bog‘lanishlarini topish.'},
    natijalar:['Hazm yo‘li bo‘limlarini tartib bilan sanaydi','Oshqozon, jigar, oshqozon osti bezi va ichaklar vazifasini tushuntiradi','Amilaza, pepsin, tripsin, lipaza va o‘tning ta’sirini farqlaydi','3D modelda hazm a’zolarini topadi'],
    jihozlar:['MAKON 3D sahnasi «Hazm qilish tizimi»','Proyektor','Non bo‘lakchalari (chaynash tajribasi uchun)','Klaster sxemasi tarqatma materiali','8-sinf biologiya darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Nonni uzoq chaynash tajribasi: «Nega shirin ta’m paydo bo‘ldi?»','Tajriba qiladi, taxmin aytadi.'],
      ['8–16','<b>Og‘iz va oshqozon.</b> So‘lak amilazasi, peristaltika; 3D da oshqozon, shira tarkibi.','Daftarga yozadi.'],
      ['16–26','<b>Jigar va oshqozon osti bezi.</b> O‘t va emulsiyalash; tripsin, amilaza, lipaza; insulin.','Fermentlar jadvalini to‘ldiradi.'],
      ['26–34','<b>Ichaklar.</b> Vorsinkalar va so‘rilish; yo‘g‘on ichak vazifasi.','Hazm yo‘li klasterini tuzadi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Hazm a’zolarini toping» mashqi va test.','Mashq va test bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Ferment','Reaksiyani tezlashtiruvchi oqsil.'],['O‘t','Yog‘ni emulsiyalovchi jigar suyuqligi.'],['Pepsin','Oshqozonda oqsilni parchalovchi ferment.'],['Vorsinka','Ichakning so‘rish o‘simtasi.'],['Peristaltika','To‘lqinsimon qisqarish.']],
    savollar:[['Oqsillar hazmi qayerda boshlanadi?','Oshqozonda'],['O‘t qayerda hosil bo‘ladi va qayerda to‘planadi?','Jigarda hosil bo‘ladi, o‘t pufagida to‘planadi'],['Oshqozon osti bezi qaysi fermentlarni ishlab chiqaradi?','Tripsin, amilaza, lipaza'],['So‘rilish asosan qayerda bo‘ladi?','Ingichka ichakda'],['Yo‘g‘on ichakda nima so‘riladi?','Suv va tuzlar']],
    uy:'Darslikdagi «Hazm qilish» bobini o‘qish; bir kunlik ovqat ratsioningizdagi mahsulotlarni oqsil, yog‘, uglevodga ajratib, ular qayerda hazm bo‘lishini jadvalga yozish.',
    manba:'8-sinf «Biologiya. Odam va uning salomatligi» darsligi; Wikipedia (Human digestive system); nobelprize.org.'
  }
},

/* ============ 5. KETMA-KET VA PARALLEL ULASH ============ */
'fizika-ulash': {
  fan:'fizika', qisqaNom:'Ulash', nom:'O‘tkazgichlarni ketma-ket va parallel ulash',
  qisqa:'8-sinf · «Elektr hodisalari» bo‘limi',
  sahna:'zanjir2',
  kor:{
    sarlavha:'Bir xil lampalar — har xil natija',
    matn:'Ikki lampani tok manbaiga ikki usulda ulash mumkin: ketma-ket — biri ortidan ikkinchisi, yoki parallel — har biri alohida tarmoqda. Ketma-ket ulashda ikkala lampadan bir xil tok o‘tadi, kuchlanish esa ular orasida taqsimlanadi. Parallel ulashda har bir lampaga manbaning to‘liq kuchlanishi tushadi, umumiy tok esa tarmoqlar orasida taqsimlanadi. Sahnada U, R₁, R₂ ni o‘zgartirib, ampermetrlar ko‘rsatkichini kuzating.',
    punktlar:['<b>Ketma-ket:</b> I = I₁ = I₂, U = U₁ + U₂, R = R₁ + R₂','<b>Parallel:</b> U = U₁ = U₂, I = I₁ + I₂, 1/R = 1/R₁ + 1/R₂','Parallel ulashda umumiy qarshilik eng kichik qarshilikdan ham kichik','Uydagi iste’molchilar tarmoqqa <b>parallel</b> ulanadi']
  },
  bolimlar:[
    {sarlavha:'Ikki ulash usulini taqqoslash', jadval:[
      ['Tok kuchi','Ketma-ket: hamma joyda bir xil · Parallel: I = I₁ + I₂'],
      ['Kuchlanish','Ketma-ket: U = U₁ + U₂ · Parallel: hamma tarmoqda bir xil'],
      ['Umumiy qarshilik','Ketma-ket: R = R₁ + R₂ · Parallel: 1/R = 1/R₁ + 1/R₂'],
      ['Ikki bir xil R','Ketma-ket: 2R · Parallel: R/2'],
      ['Kuchlanish taqsimoti','Ketma-ket: U₁/U₂ = R₁/R₂ (katta qarshilikka katta kuchlanish)'],
      ['Tok taqsimoti','Parallel: I₁/I₂ = R₂/R₁ (kichik qarshilikdan katta tok)'],
      ['Bitta lampa kuysa','Ketma-ket: zanjir uziladi, ikkinchisi ham o‘chadi · Parallel: ikkinchisi yonib turadi'],
      ['Lampa qo‘shilsa','Ketma-ket: umumiy qarshilik ortadi, tok kamayadi · Parallel: qarshilik kamayadi, umumiy tok ortadi'],
      ['Qo‘llanishi','Ketma-ket: saqlagich, kalit, ampermetr · Parallel: uy elektr tarmog‘i, voltmetr']
    ]},
    {sarlavha:'Hisoblash namunalari (sahnada tekshirish mumkin)', jadval:[
      ['U = 12 V, R₁ = 2 Ω, R₂ = 4 Ω, ketma-ket','R = 6 Ω · I = 2 A · U₁ = 4 V · U₂ = 8 V'],
      ['U = 12 V, R₁ = 6 Ω, R₂ = 6 Ω, parallel','R = 3 Ω · I₁ = I₂ = 2 A · I = 4 A'],
      ['U = 6 V, R₁ = 2 Ω, R₂ = 6 Ω, parallel','R = 1,5 Ω · I₁ = 3 A · I₂ = 1 A · I = 4 A'],
      ['U = 9 V, R₁ = 3 Ω, R₂ = 6 Ω, ketma-ket','R = 9 Ω · I = 1 A · U₁ = 3 V · U₂ = 6 V']
    ]},
    {sarlavha:'O‘lchov asboblari', punktlar:['<b>Ampermetr</b> o‘lchanayotgan qismga ketma-ket ulanadi — uning qarshiligi juda kichik','<b>Voltmetr</b> o‘lchanayotgan qismga parallel ulanadi — uning qarshiligi juda katta','Ampermetrni manbaga to‘g‘ridan to‘g‘ri ulash mumkin emas — qisqa tutashuv bo‘ladi']}
  ],
  bosqichlar:[
    {sarlavha:'Ketma-ket ulash', matn:'Tok bitta yo‘l bo‘ylab ikkala lampadan navbat bilan o‘tadi. Ampermetr va L1, L2 yonidagi tok yozuvlari bir xil ekanini ko‘ring.', rejim:'ketma'},
    {sarlavha:'Kuchlanish taqsimoti', matn:'R₁ ni R₂ dan katta qiling: katta qarshilikli lampaga kattaroq kuchlanish tushadi (U₁/U₂ = R₁/R₂), yig‘indisi esa doim manba kuchlanishiga teng.', rejim:'ketma'},
    {sarlavha:'Parallel ulash', matn:'Endi har bir lampa manbaga alohida tarmoq bilan ulangan. Har ikkala lampaga bir xil U tushadi, umumiy tok esa tarmoq toklari yig‘indisiga teng.', rejim:'parallel'},
    {sarlavha:'Tok taqsimoti', matn:'R₁ ni kichraytiring: shu tarmoqdagi tok ortadi. Kichik qarshilikli tarmoqdan katta tok o‘tadi (I₁/I₂ = R₂/R₁).', rejim:'parallel'},
    {sarlavha:'Taqqoslash', matn:'Bir xil U va R da ketma-ket ulashdagi umumiy tok parallel ulashdagidan kichik: ketma-ketda qarshiliklar qo‘shiladi, parallelda umumiy qarshilik kamayadi.', rejim:'ketma'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Zanjirni sozlang',
    topshiriqlar:[
      {shart:'Lampalarni <b>ketma-ket</b> ulang va umumiy tok aniq <b>2 A</b> bo‘lsin (masalan, U = 12 V, R₁ = 2 Ω, R₂ = 4 Ω).', hodisa:'zanjir2', kod:"ev.rejim==='ketma' && Math.abs(ev.I-2)<0.01", izoh:'To‘g‘ri! Ketma-ket: R = R₁ + R₂, I = U / R. Masalan, 12 / (2 + 4) = 2 A.'},
      {shart:'Lampalarni <b>parallel</b> ulang va umumiy tok <b>4 A</b> bo‘lsin (maslahat: U = 12 V, R₁ = R₂ = 6 Ω).', hodisa:'zanjir2', kod:"ev.rejim==='parallel' && Math.abs(ev.I-4)<0.01", izoh:'To‘g‘ri! Parallel: har tarmoqda I = U / R, umumiy tok yig‘indi: 2 + 2 = 4 A.'},
      {shart:'<b>Ketma-ket</b> ulashda birinchi lampadagi kuchlanish ikkinchisidagidan <b>2 marta katta</b> bo‘lsin.', hodisa:'zanjir2', kod:"ev.rejim==='ketma' && ev.U2>0 && Math.abs(ev.U1-2*ev.U2)<0.01", izoh:'To‘g‘ri! Ketma-ket ulashda U₁/U₂ = R₁/R₂, demak R₁ = 2R₂ bo‘lishi kerak.'}
    ]},
  test:[
    {s:'R₁ = 4 Ω va R₂ = 6 Ω ketma-ket ulangan. Umumiy qarshilik?', v:['2,4 Ω','10 Ω','24 Ω','2 Ω'], t:1, izoh:'Ketma-ket: <b>R = 4 + 6 = 10 Ω</b>.'},
    {s:'Ikkita 10 Ω li rezistor parallel ulangan. Umumiy qarshilik?', v:['20 Ω','10 Ω','5 Ω','100 Ω'], t:2, izoh:'Ikki bir xil qarshilik parallel: <b>R/2 = 5 Ω</b>.'},
    {s:'Ketma-ket ulangan iste’molchilarda qaysi kattalik bir xil?', v:['Tok kuchi','Kuchlanish','Qarshilik','Quvvat'], t:0, izoh:'Ketma-ket ulashda <b>tok kuchi</b> hamma joyda bir xil.'},
    {s:'Parallel ulangan tarmoqlarda qaysi kattalik bir xil?', v:['Tok kuchi','Qarshilik','Kuchlanish','Hech biri'], t:2, izoh:'Parallel tarmoqlarda <b>kuchlanish</b> bir xil.'},
    {s:'U = 12 V, R₁ = 2 Ω, R₂ = 4 Ω ketma-ket. R₂ dagi kuchlanish?', v:['4 V','6 V','12 V','8 V'], t:3, izoh:'I = 12 / 6 = 2 A; <b>U₂ = I · R₂ = 8 V</b>.'},
    {s:'U = 6 V, R₁ = 2 Ω, R₂ = 3 Ω parallel. Umumiy tok?', v:['1,2 A','5 A','3 A','2 A'], t:1, izoh:'I₁ = 3 A, I₂ = 2 A; <b>I = 5 A</b>.'},
    {s:'Nima uchun uy elektr tarmog‘ida asboblar parallel ulanadi?', v:['Sim kam ketadi','Tok kuchi hamma asbobda bir xil bo‘ladi','Har bir asbobga tarmoq kuchlanishi tushadi va ular bir-biridan mustaqil ishlaydi','Qarshilik ortadi'], t:2, izoh:'Parallel ulashda <b>har bir asbob to‘liq kuchlanish oladi</b> va biri o‘chsa, boshqalari ishlayveradi.'},
    {s:'Parallel zanjirga yana bitta lampa qo‘shilsa, umumiy tok qanday o‘zgaradi?', v:['Kamayadi','Ortadi','O‘zgarmaydi','Nolga tushadi'], t:1, izoh:'Umumiy qarshilik kamayadi, shuning uchun <b>umumiy tok ortadi</b>.'}
  ],
  xavfsizlik:['Tajribalar faqat past kuchlanishli (maktab laboratoriyasi) manbalar bilan o‘tkaziladi; uy tarmog‘i (220 V) bilan tajriba qilish taqiqlanadi.','Ampermetrni manba qutblariga to‘g‘ridan to‘g‘ri ulamang — qisqa tutashuv bo‘ladi.','Zanjirni yig‘ish va o‘zgartirish manba o‘chirilgan holda bajariladi.'],
  yordamchi:[
    {s:'Parallelda umumiy qarshilik nega kamayadi?', j:'Har bir yangi tarmoq tok uchun qo‘shimcha yo‘l ochadi. Yo‘llar ko‘paysa, bir xil kuchlanishda ko‘proq tok o‘tadi — demak umumiy qarshilik kichikroq. Shuning uchun parallel ulashdagi umumiy qarshilik eng kichik tarmoq qarshiligidan ham kichik.', kalit:['parallel','kamay','nega']},
    {s:'Ikki qarshilik parallel bo‘lsa tez hisoblash?', j:'R = R₁·R₂ / (R₁ + R₂). Masalan, 2 Ω va 6 Ω: 12 / 8 = 1,5 Ω. Ikki bir xil qarshilik bo‘lsa — R/2.', kalit:['formula','hisob','tez']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega ulash usuli muhim?', xatboshilar:[
      'Hayotda bitta iste’molchili elektr zanjiri kam uchraydi. Uyda bir vaqtning o‘zida lampa, muzlatgich, televizor va telefon quvvatlagichi ishlaydi; avtomobilda o‘nlab asboblar bitta akkumulyatordan quvvat oladi. Bir nechta iste’molchi zanjirga qanday ulanganiga qarab ulardagi tok va kuchlanish butunlay boshqacha bo‘ladi.',
      'O‘tkazgichlarni ulashning ikki asosiy usuli bor: ketma-ket va parallel. Murakkab zanjirlar ko‘pincha shu ikki usulning birikmasi (aralash ulash) sifatida qaraladi. Shuning uchun bu ikki usulni yaxshi tushungan o‘quvchi har qanday elektr sxemasini tahlil qila boshlaydi.',
      'Bu darsda Om qonunidan (I = U / R) foydalanib, ketma-ket va parallel ulashning qonuniyatlarini keltirib chiqaramiz va 3D zanjirda tekshiramiz. Sahnada manba kuchlanishi va ikki lampaning qarshiligini o‘zgartirib, ampermetrlar ko‘rsatkichini o‘zingiz kuzatishingiz mumkin.',
      'Mavzuni o‘rganishda sxema chizish muhim ko‘nikma. Elektr sxemalarida manba, lampa, rezistor, kalit va o‘lchov asboblari shartli belgilar bilan tasvirlanadi, o‘tkazgichlar esa to‘g‘ri chiziqlar bilan chiziladi. Sxemani to‘g‘ri chizgan o‘quvchi tok qaysi yo‘ldan oqishini ko‘z bilan kuzata oladi va ulash turini darhol aniqlaydi. Sahnadagi 3D zanjirni ko‘rib bo‘lgach, uning sxemasini daftaringizga chizib ko‘ring.'
    ]},
    {sarlavha:'Ketma-ket ulash', xatboshilar:[
      'Ketma-ket ulashda iste’molchilar bitta zanjir bo‘ylab birin-ketin joylashadi: birinchi lampaning chiqishi ikkinchisining kirishiga ulanadi. Zaryadlar uchun boshqa yo‘l yo‘q, shuning uchun vaqt birligida birinchi lampadan qancha zaryad o‘tsa, ikkinchisidan ham shuncha o‘tadi. Demak, ketma-ket ulangan barcha o‘tkazgichlarda tok kuchi bir xil: I = I₁ = I₂.',
      'Manba kuchlanishi esa iste’molchilar orasida taqsimlanadi: U = U₁ + U₂. Har bir qismdagi kuchlanish Om qonuni bo‘yicha U₁ = I·R₁ va U₂ = I·R₂. Bu ifodalarni qo‘shsak, U = I·(R₁ + R₂) hosil bo‘ladi, ya’ni ketma-ket ulashda umumiy qarshilik qarshiliklar yig‘indisiga teng: R = R₁ + R₂.',
      'Tok bir xil bo‘lgani uchun kuchlanish qarshilikka proporsional taqsimlanadi: U₁/U₂ = R₁/R₂. Katta qarshilikli qismga katta kuchlanish tushadi. Masalan, 12 V manbaga 2 Ω va 4 Ω li lampalar ketma-ket ulansa, umumiy qarshilik 6 Ω, tok 2 A, birinchi lampada 4 V, ikkinchisida 8 V bo‘ladi.',
      'Ketma-ket ulashning kamchiligi — bitta iste’molchi ishdan chiqsa, butun zanjir uziladi. Ammo bu xususiyat foydali ham bo‘ladi: saqlagich (predoxranitel) va kalit himoya qilinayotgan qurilma bilan ketma-ket ulanadi, shunda ular zanjirni to‘liq uzib qo‘ya oladi.'
    ]},
    {sarlavha:'Parallel ulash', xatboshilar:[
      'Parallel ulashda iste’molchilarning boshlari bir nuqtaga, uchlari boshqa nuqtaga ulanadi. Tok tarmoqlanish nuqtasida bo‘linib, har bir tarmoq bo‘ylab alohida oqadi va keyin yana qo‘shiladi. Har bir iste’molchi manbaning ikki qutbiga to‘g‘ridan to‘g‘ri ulangani uchun ularning hammasida kuchlanish bir xil: U = U₁ = U₂.',
      'Zaryad yo‘qolmaydi, shuning uchun tarmoqlanish nuqtasiga kelgan tok tarmoqlardagi toklar yig‘indisiga teng: I = I₁ + I₂. Har bir tarmoqdagi tok I₁ = U/R₁ va I₂ = U/R₂. Ularni qo‘shib, I = U·(1/R₁ + 1/R₂) ni olamiz; demak, umumiy qarshilik uchun 1/R = 1/R₁ + 1/R₂. Ikki qarshilik uchun qulay shakl: R = R₁·R₂ / (R₁ + R₂).',
      'Parallel ulashda tok qarshilikka teskari proporsional taqsimlanadi: I₁/I₂ = R₂/R₁ — kichik qarshilikli tarmoqdan katta tok o‘tadi. Masalan, 6 V manbaga 2 Ω va 6 Ω li lampalar parallel ulansa, birinchisidan 3 A, ikkinchisidan 1 A, jami 4 A tok o‘tadi; umumiy qarshilik 1,5 Ω — eng kichik qarshilikdan ham kichik.',
      'Parallel ulashning afzalligi — har bir iste’molchi boshqalardan mustaqil ishlaydi: bitta lampa kuysa yoki o‘chirilsa, boshqa tarmoqlardagi kuchlanish o‘zgarmaydi va ular yonib turaveradi. Lekin har bir yangi tarmoq umumiy tokni oshiradi. Manbadan va umumiy simlardan o‘tadigan tok qancha katta bo‘lsa, simlar shuncha ko‘p qiziydi. Shuning uchun elektr tarmoqlarida tok me’yordan oshsa zanjirni uzadigan himoya vositalari o‘rnatiladi.'
    ]},
    {sarlavha:'Tarix: Om va Kirxgof', xatboshilar:[
      'Tok kuchi, kuchlanish va qarshilik orasidagi bog‘lanishni nemis fizigi Georg Simon Om o‘z tajribalari asosida aniqlagan va 1827-yilda chop etgan. Dastlab uning ishi ilmiy doiralarda yaxshi qabul qilinmagan, keyinchalik esa to‘liq tan olingan. Qarshilik birligi — om (Ω) — uning sharafiga nomlangan.',
      'Tarmoqlangan zanjirlar uchun umumiy qoidalarni 1845-yilda nemis fizigi Gustav Kirxgof ta’riflagan. Uning birinchi qoidasiga ko‘ra tugunga kiruvchi toklar yig‘indisi chiquvchi toklar yig‘indisiga teng — bu parallel ulashdagi I = I₁ + I₂ formulasining umumiy shakli. Ikkinchi qoida yopiq kontur bo‘ylab kuchlanishlar yig‘indisi haqida bo‘lib, ketma-ket ulashdagi U = U₁ + U₂ ning umumlashmasidir.',
      'Bu qoidalar zamonaviy elektrotexnika va elektronikaning asosiy vositasi bo‘lib qolmoqda. Telefon platasidagi mikrosxemalardan tortib shahar elektr tarmoqlarigacha barcha zanjirlar aynan shu qonuniyatlar bilan hisoblanadi.',
      'Amalda ko‘p zanjirlar aralash ulangan bo‘ladi: ba’zi qismlar ketma-ket, ba’zilari parallel. Bunday zanjirni hisoblash uchun u bosqichma-bosqich soddalashtiriladi: avval parallel guruhlar bitta ekvivalent qarshilik bilan almashtiriladi, keyin ketma-ket qismlar qo‘shiladi. Masalan, 2 Ω va 2 Ω li parallel juftlik 1 Ω ga teng; unga 3 Ω ketma-ket ulansa, umumiy qarshilik 4 Ω bo‘ladi.'
    ]},
    {sarlavha:'Hayotda qo‘llanishi', xatboshilar:[
      'Uy elektr tarmog‘idagi rozetkalar va lampalar parallel ulanadi. Shu tufayli har bir asbob tarmoqning to‘liq kuchlanishini oladi va bir asbobni o‘chirish boshqalariga ta’sir qilmaydi. Lekin har bir yangi asbob umumiy tokni oshiradi — shuning uchun bitta uzaytirgichga juda ko‘p quvvatli asbob ulash simlarni qizdirib, xavf tug‘diradi.',
      'Ketma-ket ulash himoya va boshqaruv vositalarida ishlatiladi: avtomatik o‘chirgich, saqlagich va kalitlar iste’molchi bilan ketma-ket turadi. O‘lchov asboblarida ham bu farq muhim: ampermetr zanjirga ketma-ket, voltmetr esa parallel ulanadi. Ba’zi eski turdagi archa chiroqlari lampochkalari ketma-ket ulangan bo‘lib, bittasi kuysa butun gulchambar o‘chib qolardi.',
      'Elektrik, elektronika muhandisi, avtomobil ustasi kasblari uchun ketma-ket va parallel ulashni hisoblay olish kundalik ko‘nikmadir. Hatto fonar uchun batareyalarni joylashtirishda ham bu bilim kerak: ketma-ket ulangan batareyalar kuchlanishlari qo‘shiladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish', xatboshilar:[
      'Birinchi xato — parallel ulashda ham qarshiliklarni oddiy qo‘shish. Parallel ulashda qarshiliklar emas, ularning teskari qiymatlari qo‘shiladi, natija esa eng kichik qarshilikdan ham kichik bo‘ladi. Agar javobingiz katta chiqsa — tekshiring. Ikkinchi xato — 1/R ni hisoblab, oxirida teskari qiymatga o‘tishni unutish.',
      'Uchinchi xato — ketma-ket ulashda tok har bir lampada «sarflanib», keyingisiga kamroq yetib boradi deb o‘ylash. Aslida tok zanjirning hamma joyida bir xil; iste’molchida sarflanadigan narsa tok emas, energiya. Sahnadagi ampermetr va L1, L2 lampalari yonidagi tok yozuvlari bu fikrni yaqqol ko‘rsatadi.',
      'Eslab qolish usuli: «Ketma-ketda TOK umumiy, parallelda KUCHLANISH umumiy». Qolgan kattalik esa qo‘shiladi: ketma-ketda kuchlanishlar, parallelda toklar. Qarshilik uchun: ketma-ket — oddiy yig‘indi, parallel — teskari qiymatlar yig‘indisi.'
    ]}
  ],
  formulalar:[
    ['I = U / R','Om qonuni (zanjir qismi uchun)'],
    ['Ketma-ket: I = I₁ = I₂','Tok kuchi hamma joyda bir xil'],
    ['Ketma-ket: U = U₁ + U₂','Kuchlanishlar qo‘shiladi'],
    ['Ketma-ket: R = R₁ + R₂','Qarshiliklar qo‘shiladi'],
    ['Ketma-ket: U₁ / U₂ = R₁ / R₂','Kuchlanish qarshilikka proporsional taqsimlanadi'],
    ['Parallel: U = U₁ = U₂','Kuchlanish hamma tarmoqda bir xil'],
    ['Parallel: I = I₁ + I₂','Toklar qo‘shiladi'],
    ['Parallel: 1/R = 1/R₁ + 1/R₂','Teskari qiymatlar qo‘shiladi; ikki qarshilik uchun R = R₁R₂/(R₁+R₂)'],
    ['Parallel: I₁ / I₂ = R₂ / R₁','Tok qarshilikka teskari proporsional taqsimlanadi']
  ],
  qiziqarli:[
    'Georg Om o‘z qonunini 1827-yilda e’lon qilgan; qarshilik birligi om (Ω) uning nomi bilan ataladi.',
    'Gustav Kirxgof tarmoqlangan zanjirlar qoidalarini 1845-yilda, hali talaba bo‘lgan paytida ta’riflagan.',
    'Parallel ulangan qarshiliklarning umumiy qarshiligi har doim eng kichik qarshilikdan ham kichik bo‘ladi.',
    'Ketma-ket ulangan batareyalarning kuchlanishlari qo‘shiladi: fonardagi ikki 1,5 V li element birga 3 V beradi.'
  ],
  lugat:[
    ['Ketma-ket ulash','Iste’molchilar bitta yo‘l bo‘ylab birin-ketin ulangan usul.'],
    ['Parallel ulash','Iste’molchilar boshlari bir nuqtaga, uchlari boshqa nuqtaga ulangan usul.'],
    ['Tok kuchi (I)','O‘tkazgich ko‘ndalang kesimidan vaqt birligida o‘tgan zaryad; amperda (A) o‘lchanadi.'],
    ['Kuchlanish (U)','Zaryadni ko‘chirishda elektr maydonning bajargan ishi bilan bog‘liq kattalik; voltda (V).'],
    ['Qarshilik (R)','O‘tkazgichning tokka to‘sqinlik qilish xossasi; omda (Ω).'],
    ['Umumiy (ekvivalent) qarshilik','Butun zanjirni almashtira oladigan bitta qarshilik qiymati.'],
    ['Tarmoqlanish nuqtasi (tugun)','Uch yoki undan ortiq o‘tkazgich tutashgan nuqta.'],
    ['Ampermetr','Tok kuchini o‘lchovchi asbob; ketma-ket ulanadi.'],
    ['Voltmetr','Kuchlanishni o‘lchovchi asbob; parallel ulanadi.'],
    ['Qisqa tutashuv','Qarshiligi juda kichik yo‘l orqali manba qutblarining tutashishi; tok keskin ortadi.'],
    ['Saqlagich','Tok me’yordan oshsa zanjirni uzadigan, ketma-ket ulanadigan himoya vositasi.']
  ],
  manba:'8-sinf «Fizika» darsligi (O‘zbekiston) — «O‘tkazgichlarni ketma-ket va parallel ulash» mavzusi; Wikipedia (inglizcha): «Series and parallel circuits», «Ohm’s law», «Kirchhoff’s circuit laws», «Georg Ohm», «Gustav Kirchhoff». Hisoblash namunalari — formulalar bo‘yicha hisoblangan.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Aralash (yangi bilim + virtual laboratoriya)', usul:'3D virtual zanjir, masala yechish, juftlikda ishlash',
    maqsad:{talimiy:'O‘tkazgichlarni ketma-ket va parallel ulash qonuniyatlarini, umumiy qarshilik, tok va kuchlanish taqsimoti formulalarini o‘rgatish.',
      tarbiyaviy:'Elektr xavfsizligi qoidalariga rioya qilish, tejamkorlik, aniqlik.',
      rivojlantiruvchi:'Tajriba natijasini formula bilan solishtirish, mantiqiy va hisoblash ko‘nikmalari.'},
    natijalar:['Ketma-ket va parallel ulash sxemasini chizadi va farqlaydi','Ikki qarshilik uchun umumiy qarshilik, tok va kuchlanishni hisoblaydi','3D zanjirda berilgan tok qiymatini hosil qiladi','Uy tarmog‘ida parallel ulash sababini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Ketma-ket va parallel ulash»','Proyektor','Laboratoriya to‘plami: past kuchlanishli manba, 2 lampa, ampermetr, voltmetr, kalit, simlar (mavjud bo‘lsa)','Masalalar kartochkalari','8-sinf fizika darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Elektr xavfsizligi eslatmasi.','Tinglaydi.'],
      ['3–8','<b>Takrorlash.</b> Om qonuni bo‘yicha 2 ta og‘zaki masala; «Archa chirog‘ida bitta lampa kuysa, nega hammasi o‘chadi?»','Javob beradi.'],
      ['8–18','<b>Ketma-ket ulash.</b> MAKON 3D da ampermetr va L1, L2 tok yozuvlari; formulalarni keltirib chiqaradi.','Formulalarni yozadi, sahnada tekshiradi.'],
      ['18–28','<b>Parallel ulash.</b> Rejimni almashtiradi; tok taqsimoti va 1/R formulasini keltiradi.','Formulalarni yozadi, jadvalni to‘ldiradi.'],
      ['28–37','<b>Virtual laboratoriya.</b> «Zanjirni sozlang» mashqining 3 topshirig‘i.','Juftlikda sozlaydi, hisob bilan tekshiradi.'],
      ['37–43','<b>Mustahkamlash.</b> Test va 1 ta masala doskada.','Test yechadi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Ketma-ket ulash','Bitta yo‘l bo‘ylab birin-ketin ulash.'],['Parallel ulash','Har bir iste’molchi alohida tarmoqda.'],['Umumiy qarshilik','Butun zanjirga teng kuchli bitta qarshilik.'],['Tugun','Tok tarmoqlanadigan nuqta.'],['Ampermetr','Tokni o‘lchovchi, ketma-ket ulanadigan asbob.']],
    savollar:[['Ketma-ket ulashda qaysi kattalik bir xil?','Tok kuchi'],['Parallel ulashda qaysi kattalik bir xil?','Kuchlanish'],['3 Ω va 6 Ω parallel ulansa umumiy qarshilik?','2 Ω'],['12 V, 2 Ω va 4 Ω ketma-ket: tok?','2 A'],['Uydagi asboblar qanday ulanadi va nega?','Parallel — har biri to‘liq kuchlanish oladi va mustaqil ishlaydi']],
    uy:'Darslikdagi mavzuni o‘qish; 4 ta masala: (1) 5 Ω + 15 Ω ketma-ket, U = 10 V — I, U₁, U₂; (2) 4 Ω va 12 Ω parallel, U = 12 V — I₁, I₂, I, R; (3) uyingizdagi 3 ta asbob qanday ulanganini tushuntirish; (4) uch bir xil lampa ketma-ket va parallel ulansa, umumiy qarshiliklarni solishtirish.',
    manba:'8-sinf «Fizika» darsligi; Wikipedia (Series and parallel circuits).'
  }
},

/* ============ 6. QUYOSH SISTEMASI ============ */
'astro-quyosh': {
  fan:'astronomiya', qisqaNom:'Quyosh sist.', nom:'Quyosh sistemasi: 8 sayyora',
  qisqa:'Astronomiya asoslari · NASA ma’lumotlari',
  sahna:'astro',
  kor:{
    sarlavha:'Bizning kosmik «uy»imiz',
    matn:'Quyosh sistemasi — markazda Quyosh va uning tortishish kuchi atrofida harakatlanuvchi sayyoralar, ularning yo‘ldoshlari, mitti sayyoralar, asteroidlar va kometalardan iborat tizim. Unda sakkizta sayyora bor: to‘rtta ichki — yer tipidagi (Merkuriy, Venera, Yer, Mars) va to‘rtta tashqi — gigant sayyoralar (Yupiter, Saturn, Uran, Neptun). Sayyora Quyoshdan qancha uzoq bo‘lsa, uning bir yili shuncha uzun bo‘ladi. Sayyoralarni bosing — kamera ularga yaqinlashadi.',
    punktlar:['<b>Yer tipidagi</b> sayyoralar — qattiq, toshli sirtli, nisbatan kichik','<b>Gigantlar:</b> Yupiter va Saturn — gaz gigantlari, Uran va Neptun — muz gigantlari','<b>1 a.b.</b> (astronomik birlik) ≈ 149,6 mln km — Yerdan Quyoshgacha o‘rtacha masofa','Eng katta — <b>Yupiter</b>, eng kichik va Quyoshga eng yaqin — <b>Merkuriy</b>']
  },
  bolimlar:[
    {sarlavha:'Sayyoralar (NASA Planetary Fact Sheet)', jadval:[
      ['Merkuriy','diametri 4 879 km · Quyoshdan 57,9 mln km (≈0,39 a.b.) · yili 88 kun'],
      ['Venera','12 104 km · 108,2 mln km (≈0,72 a.b.) · 224,7 kun'],
      ['Yer','12 756 km · 149,6 mln km (1 a.b.) · 365,2 kun'],
      ['Mars','≈6 792 km · ≈228 mln km (≈1,52 a.b.) · 687 kun'],
      ['Yupiter','142 984 km · ≈778,5 mln km (≈5,2 a.b.) · 4 331 kun (≈11,9 yil)'],
      ['Saturn','120 536 km · ≈1 433 mln km (≈9,6 a.b.) · 10 747 kun (≈29,4 yil)'],
      ['Uran','51 118 km · ≈2 870 mln km (≈19,2 a.b.) · 30 589 kun (≈84 yil)'],
      ['Neptun','49 528 km · ≈4 500 mln km (≈30 a.b.) · 59 800 kun (≈164 yil)']
    ], matn:'Diametr — ekvatorial. Masofa — o‘rtacha (orbitaning katta yarim o‘qi). NASA jadvalining turli yillardagi nashrlarida uzoq sayyoralar masofasi bir necha mln km ga farq qiladi, shuning uchun ular yumaloqlab berildi.'},
    {sarlavha:'Ichki va tashqi sayyoralar', jadval:[
      ['Tarkibi','Ichki: tosh va metall · Tashqi: asosan vodorod, geliy (gaz gigantlari), suv, ammiak, metan muzlari (muz gigantlari)'],
      ['Sirti','Ichki: qattiq · Tashqi: qattiq sirti yo‘q'],
      ['O‘lchami','Ichki: kichik (eng kattasi Yer) · Tashqi: yirik'],
      ['Halqalar','Ichki: yo‘q · Tashqi: to‘rttasida ham bor (Saturnniki eng yorqin)'],
      ['Yo‘ldoshlar','Ichki: kam yoki yo‘q (Merkuriy va Venerada yo‘q) · Tashqi: ko‘p; soni yangi kashfiyotlar bilan o‘zgarib turadi'],
      ['Ular orasida','Mars va Yupiter orasida — asteroidlar bosh kamari']
    ]},
    {sarlavha:'O‘rtacha harorat (NASA)', jadval:[['Merkuriy','167 °C (kunduz va tun farqi juda katta)'],['Venera','464 °C — eng issiq sayyora'],['Yer','15 °C'],['Mars','−65 °C'],['Yupiter','−110 °C*'],['Saturn','−140 °C*'],['Uran','−195 °C*'],['Neptun','−200 °C*']],
     matn:'* Gigant sayyoralar uchun — atmosferada 1 bar bosim sathidagi harorat.'}
  ],
  bosqichlar:[
    {sarlavha:'Merkuriy', matn:'Quyoshga eng yaqin va eng kichik sayyora. Bir yili atigi 88 Yer sutkasi. Atmosferasi deyarli yo‘q, shuning uchun kunduz va tun harorati keskin farq qiladi.', sayyora:'merkuriy'},
    {sarlavha:'Venera', matn:'O‘lchami Yerga yaqin, lekin qalin CO₂ atmosferasi issiqxona effekti tufayli o‘rtacha harorat 464 °C — Merkuriydan ham issiq. O‘z o‘qi atrofida teskari yo‘nalishda aylanadi.', sayyora:'venera'},
    {sarlavha:'Yer', matn:'Suyuq suv okeanlari va hayot mavjudligi ma’lum yagona sayyora. Quyoshgacha o‘rtacha masofa — 1 astronomik birlik (≈149,6 mln km).', sayyora:'yer'},
    {sarlavha:'Mars', matn:'«Qizil sayyora»: sirtidagi temir oksidlari qizg‘ish rang beradi. Yili 687 kun, ikkita kichik yo‘ldoshi bor — Fobos va Deymos.', sayyora:'mars'},
    {sarlavha:'Yupiter va Saturn', matn:'Gaz gigantlari. Yupiter diametri Yernikidan taxminan 11 marta katta. Saturnning o‘rtacha zichligi suvnikidan kichik, uning halqalari muz va tosh bo‘laklaridan iborat.', sayyora:'yupiter'},
    {sarlavha:'Uran va Neptun', matn:'Muz gigantlari. Uran o‘qi deyarli «yonboshlab» yotadi, Neptun esa matematik hisob asosida topilgan sayyora. Neptunning bir yili ≈164 Yer yili.', sayyora:'neptun'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Sayyorani toping',
    topshiriqlar:[
      {shart:'Quyosh sistemasidagi <b>eng katta</b> sayyorani bosing', hodisa:'sayyora', kod:"ev.nom==='yupiter'", izoh:'To‘g‘ri! Yupiter diametri ≈142 984 km — Yernikidan taxminan 11 marta katta.'},
      {shart:'Quyoshga <b>eng yaqin</b> sayyorani bosing', hodisa:'sayyora', kod:"ev.nom==='merkuriy'", izoh:'To‘g‘ri! Merkuriy Quyoshdan o‘rtacha ≈57,9 mln km (≈0,39 a.b.) uzoqlikda.'},
      {shart:'O‘rtacha harorati <b>eng yuqori</b> sayyorani bosing', hodisa:'sayyora', kod:"ev.nom==='venera'", izoh:'To‘g‘ri! Venera (464 °C) qalin CO₂ atmosferasi tufayli Merkuriydan ham issiq.'},
      {shart:'Bir yili <b>687 Yer sutkasiga</b> teng «qizil sayyora»ni bosing', hodisa:'sayyora', kod:"ev.nom==='mars'", izoh:'To‘g‘ri! Mars yili — 687 kun.'},
      {shart:'Quyoshdan <b>eng uzoq</b> sayyorani bosing', hodisa:'sayyora', kod:"ev.nom==='neptun'", izoh:'To‘g‘ri! Neptun ≈30 a.b. uzoqlikda, bir yili ≈164 Yer yili.'}
    ]},
  test:[
    {s:'Quyosh sistemasida nechta sayyora bor?', v:['9','7','8','10'], t:2, izoh:'<b>8 ta</b>. 2006-yilda Xalqaro astronomiya ittifoqi Plutonni mitti sayyora deb tasniflagan.'},
    {s:'Qaysi sayyora yer tipidagi sayyoralarga kirmaydi?', v:['Mars','Venera','Merkuriy','Uran'], t:3, izoh:'<b>Uran</b> — muz giganti.'},
    {s:'1 astronomik birlik taxminan nimaga teng?', v:['150 ming km','149,6 mln km','9,46 trln km','384 ming km'], t:1, izoh:'1 a.b. ≈ <b>149,6 mln km</b> — Yerdan Quyoshgacha o‘rtacha masofa.'},
    {s:'Eng issiq sayyora qaysi?', v:['Venera','Merkuriy','Mars','Yupiter'], t:0, izoh:'<b>Venera</b> — 464 °C, issiqxona effekti tufayli.'},
    {s:'Yupiter Quyosh atrofini taxminan necha yilda aylanib chiqadi?', v:['1,9 yil','29 yil','84 yil','11,9 yil'], t:3, izoh:'4 331 kun ≈ <b>11,9 Yer yili</b>.'},
    {s:'Qaysi juftlik gaz gigantlari?', v:['Uran va Neptun','Yupiter va Saturn','Mars va Venera','Yer va Mars'], t:1, izoh:'<b>Yupiter va Saturn</b> — gaz gigantlari; Uran va Neptun — muz gigantlari.'},
    {s:'Asteroidlar bosh kamari qaysi sayyoralar orasida joylashgan?', v:['Yer va Mars','Yupiter va Saturn','Mars va Yupiter','Venera va Yer'], t:2, izoh:'Bosh kamar — <b>Mars va Yupiter</b> orasida.'},
    {s:'Neptun qanday kashf etilgan?', v:['Qadimdan oddiy ko‘z bilan ma’lum','Uran harakatidagi og‘ishlar asosida hisoblab topilgan','Kosmik zond tomonidan','Tasodifan kometa sifatida'], t:1, izoh:'1846-yilda Levere hisobi asosida Galle uni osmonda topgan — <b>hisoblash orqali kashfiyot</b>.'}
  ],
  yordamchi:[
    {s:'Nega Pluton sayyora emas?', j:'2006-yilda Xalqaro astronomiya ittifoqi sayyora ta’rifini qabul qildi: jism o‘z orbitasi atrofini boshqa jismlardan «tozalagan» bo‘lishi kerak. Pluton bu shartga javob bermaydi va mitti sayyora deb tasniflandi.', kalit:['pluton']},
    {s:'Astronomik birlik nima?', j:'Yerdan Quyoshgacha bo‘lgan o‘rtacha masofaga yaqin uzunlik birligi: ≈149,6 mln km. Sayyoralar masofasini qulay solishtirish uchun ishlatiladi.', kalit:['astronomik','a.b','birlik']}
  ],
  maqola:[
    {sarlavha:'Kirish: Quyosh sistemasi nima?', xatboshilar:[
      'Quyosh sistemasi — Quyosh va uning tortishish kuchi ushlab turgan barcha osmon jismlaridan iborat tizim. Unga sakkizta sayyora va ularning yo‘ldoshlari, mitti sayyoralar (masalan, Pluton), asteroidlar, kometalar va sayyoralararo chang kiradi. Quyosh bu tizimning markazi va asosiy energiya manbai hisoblanadi.',
      'Sayyoralar Quyosh atrofida ellipsga yaqin orbitalar bo‘ylab, deyarli bir tekislikda va bir yo‘nalishda harakatlanadi. Har bir sayyoraning Quyosh atrofini bir marta aylanib chiqish vaqti uning «yili» deyiladi. Yer uchun bu taxminan 365,2 sutka, Neptun uchun esa taxminan 164 Yer yili.',
      'Masofalar juda katta bo‘lgani uchun astronomlar kilometr o‘rniga astronomik birlikdan (a.b.) foydalanadi. 1 a.b. taxminan 149,6 million kilometrga teng — bu Yerdan Quyoshgacha bo‘lgan o‘rtacha masofa. Yorug‘lik bu masofani taxminan 8 daqiqa 20 soniyada bosib o‘tadi.',
      'Quyosh sistemasining o‘lchamini tasavvur qilish qiyin. Agar Quyoshni ma’lum masshtabda kichraytirsak, sayyoralar orasidagi masofalar ularning o‘lchamlariga nisbatan juda katta bo‘lib qoladi. Shuning uchun darsliklardagi rasmlarda sayyoralar bir-biriga yaqin chiziladi — aslida bu masshtabga mos emas. 3D sahnada ham ko‘rish qulay bo‘lishi uchun masofalar va o‘lchamlar soddalashtirilgan; aniq raqamlar esa jadvalda NASA ma’lumotlari bo‘yicha berilgan.'
    ]},
    {sarlavha:'Yer tipidagi sayyoralar', xatboshilar:[
      'Quyoshga yaqin to‘rt sayyora — Merkuriy, Venera, Yer va Mars — yer tipidagi yoki ichki sayyoralar deyiladi. Ular asosan tosh va metallardan tashkil topgan, qattiq sirtga ega va gigant sayyoralarga nisbatan kichik. Ularning yo‘ldoshlari kam: Merkuriy va Venerada yo‘ldosh yo‘q, Yerning bitta, Marsning ikkita kichik yo‘ldoshi bor.',
      'Merkuriy — eng kichik va Quyoshga eng yaqin sayyora: diametri 4 879 km, bir yili 88 kun. Venera o‘lchami bo‘yicha Yerga juda yaqin (12 104 km), lekin uning qalin karbonat angidrid atmosferasi kuchli issiqxona effekti hosil qiladi va o‘rtacha harorat 464 °C ga yetadi — bu Merkuriydan ham yuqori. Venera o‘z o‘qi atrofida boshqa ko‘p sayyoralarga teskari yo‘nalishda juda sekin aylanadi.',
      'Yer — sirtida suyuq suv okeanlari bor va hayot mavjudligi ma’lum bo‘lgan yagona sayyora. Mars — «qizil sayyora»: sirtidagi temir oksidlari unga qizg‘ish tus beradi. Mars Yerdan kichik (diametri taxminan 6 792 km), atmosferasi siyrak, o‘rtacha harorati −65 °C, bir yili 687 kun.',
      'Ichki sayyoralarning sirtida kraterlar, tog‘lar va vulqonlar izlari bor. Merkuriy sirti Oy sirtiga o‘xshab kraterlar bilan qoplangan. Venera sirti qalin bulutlar ostida yashiringan, shuning uchun u radiolokatsiya yordamida xaritaga tushirilgan. Marsda qurigan daryo o‘zanlariga o‘xshash tuzilmalar topilgan va olimlar uning o‘tmishida suyuq suv bo‘lganini o‘rganishmoqda. Bu savollarga javob izlash uchun Marsga ko‘plab zond va marsoxodlar yuborilgan.'
    ]},
    {sarlavha:'Gigant sayyoralar', xatboshilar:[
      'Mars va Yupiter orasida asteroidlar bosh kamari joylashgan, undan keyin esa to‘rtta gigant sayyora keladi. Yupiter va Saturn — gaz gigantlari: ular asosan vodorod va geliydan iborat va qattiq sirtga ega emas. Uran va Neptun — muz gigantlari: ularning tarkibida suv, ammiak va metan kabi «muz» moddalar ulushi ko‘proq.',
      'Yupiter — Quyosh sistemasidagi eng katta sayyora: ekvatorial diametri 142 984 km, ya’ni Yernikidan taxminan 11 marta katta. Uning massasi qolgan barcha sayyoralar massasi yig‘indisidan ham katta. Saturn diametri 120 536 km, u yorqin halqalari bilan mashhur; Saturnning o‘rtacha zichligi suvnikidan kichik.',
      'Uran va Neptun o‘lchami bo‘yicha bir-biriga yaqin (51 118 va 49 528 km). Uranning aylanish o‘qi orbita tekisligiga nisbatan deyarli yotiq holatda, shuning uchun u go‘yo «yonboshlab» aylanadi. Neptun Quyoshdan taxminan 30 a.b. uzoqlikda joylashgan va bir marta aylanib chiqishiga taxminan 164 Yer yili kerak. Barcha to‘rt gigant sayyorada halqalar bor.',
      'Gigant sayyoralar tez aylanadi: NASA jadvaliga ko‘ra Yupiterning bir sutkasi taxminan 10 soat, Saturnniki taxminan 10,7 soat. Tez aylanish va qalin atmosfera tufayli ularda kuchli shamollar va ulkan bo‘ronlar kuzatiladi; Yupiterdagi Katta Qizil Dog‘ — ana shunday uzoq yashayotgan bo‘ron. Gigant sayyoralarning qattiq sirti bo‘lmagani uchun ularga kosmik apparat «qo‘na olmaydi», faqat atmosferasini o‘rganadi.'
    ]},
    {sarlavha:'Masofa va yil uzunligi: Kepler qonuni', xatboshilar:[
      'XVII asr boshida nemis astronomi Iogann Kepler sayyoralar harakatining uch qonunini kashf etdi. Uchinchi qonunga ko‘ra, sayyora aylanish davrining kvadrati orbita o‘rtacha radiusi (katta yarim o‘qi) kubiga proporsional. Agar davrni Yer yillarida, masofani astronomik birlikda olsak, qonun juda sodda ko‘rinishga keladi: T² ≈ a³.',
      'Bu qonunni jadvaldagi raqamlar bilan tekshirib ko‘rish mumkin. Yupiter uchun a ≈ 5,2 a.b., a³ ≈ 140,6; T ≈ 11,86 yil, T² ≈ 140,7 — deyarli teng. Demak, sayyora Quyoshdan qanchalik uzoq bo‘lsa, u nafaqat uzunroq yo‘l bosadi, balki orbitasi bo‘ylab sekinroq ham harakatlanadi.',
      'Shuning uchun ichki sayyoralarning yili qisqa, tashqi sayyoralarniki esa juda uzun. Merkuriy bir Yer yilida Quyosh atrofini to‘rt martadan ko‘proq aylanib chiqadi, Neptun esa 1846-yilda kashf etilganidan beri Quyosh atrofini birinchi to‘liq aylanishini 2011-yil atrofida yakunladi.'
    ]},
    {sarlavha:'Kashfiyotlar tarixi', xatboshilar:[
      'Merkuriy, Venera, Mars, Yupiter va Saturn qadim zamonlardan oddiy ko‘z bilan kuzatilgan. 1543-yilda Nikolay Kopernik Quyosh markazda turgan (geliotsentrik) tizimni asoslab berdi. Samarqandda XV asrda Mirzo Ulug‘bek rasadxonasida tuzilgan «Ziji jadidi Ko‘ragoniy» katalogida mingdan ortiq yulduz koordinatalari (manbalarga ko‘ra 1018 ta) keltirilgan va u o‘z davrining eng aniq katalogi hisoblangan.',
      'Teleskop davri yangi sayyoralarni ochdi. 1781-yilda ingliz astronomi Uilyam Gershel Uranni kashf etdi — bu teleskop yordamida topilgan birinchi sayyora. Keyinchalik Uranning harakati hisoblangan yo‘ldan biroz og‘ishi aniqlandi. Fransuz matematigi Urben Levere noma’lum sayyora ta’sirini hisobladi va 1846-yilda nemis astronomi Iogann Galle Neptunni hisoblangan joyga juda yaqin nuqtada topdi.',
      '1930-yilda Pluton kashf etildi va uzoq vaqt to‘qqizinchi sayyora hisoblandi. 2006-yilda Xalqaro astronomiya ittifoqi sayyoraning aniq ta’rifini qabul qildi va Pluton mitti sayyoralar qatoriga o‘tkazildi. Bugun sayyoralar haqidagi eng aniq ma’lumotlar NASA va boshqa kosmik agentliklarning zondlari orqali olinadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish', xatboshilar:[
      'Birinchi keng tarqalgan xato — «Quyoshga eng yaqin sayyora eng issiq» deb o‘ylash. Aslida eng issiq sayyora Venera, chunki uning qalin atmosferasi issiqlikni ushlab qoladi. Ikkinchi xato — sayyoralar orasidagi masofalar bir xil deb tasavvur qilish: ichki sayyoralar bir-biriga nisbatan yaqin, gigantlar orasidagi masofalar esa bir necha barobar katta.',
      'Uchinchi xato — Plutonni hali ham sayyora deb sanash va «9 ta sayyora» deyish. Xalqaro astronomiya ittifoqining 2006-yildagi qaroriga ko‘ra Quyosh sistemasida 8 ta sayyora bor. To‘rtinchi xato — yo‘ldoshlar sonini yodlash: yangi kuzatuvlar tufayli gigant sayyoralarning ma’lum yo‘ldoshlari soni vaqti-vaqti bilan o‘zgarib turadi, shuning uchun eng yangi ma’lumotni NASA saytidan tekshirish kerak.',
      'Tartibni eslab qolish uchun bosh harflardan jumla tuzing: <b>M</b>erkuriy, <b>V</b>enera, <b>Y</b>er, <b>M</b>ars, <b>Y</b>upiter, <b>S</b>aturn, <b>U</b>ran, <b>N</b>eptun — «MVYM — YSUN»: to‘rtta kichik toshli, to‘rtta katta gigant.'
    ]}
  ],
  formulalar:[
    ['1 a.b. ≈ 149,6 mln km','Astronomik birlik'],
    ['T² ≈ a³','Keplerning III qonuni (T — Yer yillarida, a — a.b. da)'],
    ['t = s / c','Yorug‘likning yetib kelish vaqti: 149,6 mln km / 300 000 km/s ≈ 500 s ≈ 8 daq 20 s']
  ],
  qiziqarli:[
    'Venera Merkuriydan Quyoshga uzoqroq bo‘lsa ham, o‘rtacha harorati (464 °C) Merkuriynikidan (167 °C) yuqori — NASA ma’lumoti.',
    'Yupiter diametri (142 984 km) Yernikidan (12 756 km) taxminan 11 marta katta.',
    'Uran 1781-yilda Uilyam Gershel tomonidan kashf etilgan — teleskop bilan topilgan birinchi sayyora.',
    'Neptun 1846-yilda Levere hisob-kitobi asosida topilgan: sayyora avval «qog‘ozda», keyin osmonda kashf etilgan.',
    'Saturnning o‘rtacha zichligi (≈687 kg/m³, NASA) suvnikidan kichik.'
  ],
  lugat:[
    ['Quyosh sistemasi','Quyosh va uning tortishish kuchi ta’sirida harakatlanuvchi osmon jismlari tizimi.'],
    ['Sayyora','Quyosh atrofida aylanuvchi, o‘z og‘irligi ta’sirida sharsimon bo‘lgan va orbitasi atrofini tozalagan jism (XAI, 2006).'],
    ['Mitti sayyora','Sharsimon, lekin orbitasi atrofini tozalamagan jism (masalan, Pluton).'],
    ['Yer tipidagi sayyora','Qattiq toshli sirtga ega ichki sayyora: Merkuriy, Venera, Yer, Mars.'],
    ['Gaz giganti','Asosan vodorod va geliydan iborat yirik sayyora: Yupiter, Saturn.'],
    ['Muz giganti','Suv, ammiak, metan kabi moddalar ulushi katta yirik sayyora: Uran, Neptun.'],
    ['Astronomik birlik (a.b.)','≈149,6 mln km; Yerdan Quyoshgacha o‘rtacha masofa.'],
    ['Orbita','Osmon jismining boshqa jism atrofidagi harakat yo‘li.'],
    ['Aylanish davri (yil)','Sayyoraning Quyosh atrofini bir marta aylanib chiqish vaqti.'],
    ['Yo‘ldosh','Sayyora atrofida aylanuvchi tabiiy osmon jismi.'],
    ['Asteroidlar bosh kamari','Mars va Yupiter orbitalari orasidagi kichik toshli jismlar mintaqasi.'],
    ['Issiqxona effekti','Atmosferaning issiqlik nurlanishini ushlab qolib, sirtni isitishi.']
  ],
  manba:'NASA NSSDCA «Planetary Fact Sheet — Metric» (nssdc.gsfc.nasa.gov/planetary/factsheet/): diametr, masofa, aylanish davri, o‘rtacha harorat, Saturn zichligi; NASA Science «Planets» (science.nasa.gov/solar-system/planets/): yer tipidagi va gigant sayyoralar tasnifi; Xalqaro astronomiya ittifoqi (IAU) 2006-yil XXVI Bosh assambleyasi qarori (sayyora ta’rifi); Wikipedia: «Discovery of Neptune», «Uranus», «Kepler’s laws of planetary motion», «Zij-i-Sultani». Uzoq sayyoralar masofasi NASA jadvalining turli nashrlarida farq qilgani uchun yumaloqlangan.',
  ishlanma:{
    sinf:'9–11-sinf (astronomiya asoslari)', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv model, jadval bilan ishlash, guruhlarda «sayyora pasporti»',
    maqsad:{talimiy:'Quyosh sistemasi tuzilishi, 8 sayyora, yer tipidagi va gigant sayyoralar farqi, astronomik birlik va aylanish davri tushunchalarini NASA ma’lumotlari asosida o‘rgatish.',
      tarbiyaviy:'Olamning ilmiy manzarasiga qiziqish, Ulug‘bek merosiga faxr, manbaga tayanish madaniyati.',
      rivojlantiruvchi:'Sonli ma’lumotlarni taqqoslash, qonuniyat topish (masofa — yil uzunligi), fazoviy tasavvur.'},
    natijalar:['8 sayyorani Quyoshdan uzoqlashish tartibida sanaydi','Yer tipidagi va gigant sayyoralarni farqlaydi va misol keltiradi','Astronomik birlikni ta’riflaydi va masofalarni a.b. da solishtiradi','Sayyora masofasi bilan yil uzunligi bog‘liqligini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Quyosh sistemasi»','Proyektor','NASA ma’lumotlari jadvali (tarqatma)','Guruhlar uchun «sayyora pasporti» kartochkalari'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Quyoshdan chiqqan yorug‘lik Yerga necha daqiqada yetib keladi?» — taxmin qildiradi.','Taxmin aytadi.'],
      ['8–18','<b>Umumiy tuzilish.</b> MAKON 3D da tizimni ko‘rsatadi; a.b. tushunchasi; ichki va tashqi sayyoralar.','Sxema chizadi, jadvalga yozadi.'],
      ['18–28','<b>Yer tipidagi sayyoralar.</b> Merkuriy, Venera, Yer, Mars — sahnada yaqinlashtirib ko‘rsatadi; Venera paradoksi.','Taqqoslash jadvalini to‘ldiradi.'],
      ['28–36','<b>Gigant sayyoralar.</b> Guruhlar Yupiter, Saturn, Uran, Neptun «pasporti»ni tuzadi; Kepler qonunini Yupiter misolida tekshiradi.','Guruhda pasport tuzib, taqdim etadi.'],
      ['36–42','<b>Mustahkamlash.</b> MAKON «Sayyorani toping» mashqi va test.','Mashq va test bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Astronomik birlik','≈149,6 mln km.'],['Yer tipidagi sayyora','Qattiq toshli ichki sayyora.'],['Gaz giganti','Yupiter va Saturn.'],['Muz giganti','Uran va Neptun.'],['Aylanish davri','Sayyoraning bir yili.']],
    savollar:[['Nechta sayyora bor?','8 ta'],['Eng katta sayyora?','Yupiter'],['Eng issiq sayyora va sababi?','Venera — qalin CO₂ atmosferasi (issiqxona effekti)'],['1 a.b. nimaga teng?','≈149,6 mln km'],['Mars yili necha kun?','687 kun']],
    uy:'NASA jadvalidan foydalanib, sayyoralarning Quyoshdan masofasini (a.b.) masshtabli chiziqda tasvirlash (1 a.b. = 1 sm); Keplerning III qonunini Mars va Saturn uchun tekshirish.',
    manba:'NASA Planetary Fact Sheet; NASA Science «Planets»; IAU 2006.'
  }
},

/* ============ 7. TOPOGRAFIYA: KOMPAS VA AZIMUT ============ */
'harbiy-topografiya': {
  fan:'harbiy', qisqaNom:'Kompas', nom:'Joyda kompas bilan oriyentirlanish: azimut',
  qisqa:'10-sinf · II bo‘lim «Harbiy ish asoslari» — joyda oriyentirlanish',
  sahna:'glb', zaxira:null,
  model:{fayl:'kompas', yorliq:'Ochiq qopqoqli kompas · umumiy 3D model (Adrianov kompasi nusxasi emas)', sozlama:{ry:.6, rx:-.15, avto:true, zoom:1.2}},
  rejimlar:['butun','rentgen','ajrat'],
  qismlar:[
    {raqam:1, nom:'Korpus', vazifa:'Kompasning barcha qismlarini birlashtiradi; Adrianov kompasida qo‘lga taqish tasmasi bor.', tugun:[], d:[0,0,0]},
    {raqam:2, nom:'Aylanuvchi qopqoq va ko‘zlash moslamasi', vazifa:'Mushka va tselik (ko‘zlash tirqishi) orqali predmetga yo‘nalish olinadi; qopqoqdagi ko‘rsatkich limb bo‘yicha sanoq beradi.', tugun:[], d:[0,1.6,0]},
    {raqam:3, nom:'Magnit strelka', vazifa:'Magnit meridiani bo‘ylab joylashadi; shimoliy uchi qorong‘ida ko‘rinadigan (fosforli) modda bilan belgilangan.', tugun:[], d:[0,1,1.2]},
    {raqam:4, nom:'Limb (aylana shkala)', vazifa:'Gradus va mingliklarda bo‘lingan shkala; Adrianov kompasida 1 bo‘lim = 3° yoki 0-50.', tugun:[], d:[1.4,.6,0]},
    {raqam:5, nom:'Strelka tormozi', vazifa:'Ishlatilmaganda strelkani qotirib qo‘yadi — o‘q uchi yeyilmasligi uchun.', tugun:[], d:[-1.4,.4,0]},
    {raqam:6, nom:'Qorong‘ida ko‘rinadigan belgilar', vazifa:'Strelka uchi, ko‘rsatkich va limbdagi asosiy belgilar tunda ham ko‘rinadi.', tugun:[], d:[0,-1,1]}
  ],
  kor:{
    sarlavha:'Xaritasiz ham adashmaslik',
    matn:'Azimut — yo‘nalishni son bilan ifodalash usuli: magnit meridianining shimol yo‘nalishidan predmetgacha soat mili bo‘yicha o‘lchanadigan burchak. Kompas yordamida azimutni aniqlash va berilgan azimut bo‘yicha harakatlanish mumkin. Harakat davomida masofa juft qadamlar bilan o‘lchanadi, qaytish uchun esa qaytish azimuti hisoblanadi. Sahnadagi model — umumiy kompas; qismlar nomi va vazifasi Adrianov kompasi bo‘yicha berilgan.',
    punktlar:['<b>Magnit azimuti</b>: 0° dan 360° gacha, soat mili bo‘yicha','<b>Qaytish azimuti</b>: azimut < 180° bo‘lsa +180°, > 180° bo‘lsa −180°','Masofa — <b>juft qadamlar</b> bilan','Adrianov kompasi limbi: <b>1 bo‘lim = 3°</b> (0-50)']
  },
  bolimlar:[
    {sarlavha:'Adrianov kompasi', jadval:[
      ['Yaratuvchisi','Harbiy topograf V. N. Adrianov, 1907-yil'],
      ['Korpus','Barcha qismlarni birlashtiradi'],
      ['Limb','Gradus va mingliklar (burchak o‘lchagich bo‘linmalari) shkalasi'],
      ['Limb bo‘linmasi','1 bo‘lim = 3° yoki 0-50 (50 minglik)'],
      ['Sanoq yo‘nalishi','Graduslar soat mili bo‘yicha, mingliklar teskari tomonga oshadi'],
      ['Magnit strelka','Shimoliy uchi qorong‘ida ko‘rinadigan qilib belgilangan'],
      ['Strelka tormozi','Strelkani qotirib qo‘yadi'],
      ['Ko‘zlash moslamasi','Aylanuvchi qopqoqdagi mushka va tselik'],
      ['Ushlash','Chap qo‘lda, ko‘zdan taxminan 10 sm pastda (darslik bo‘yicha)']
    ]},
    {sarlavha:'Qaytish azimuti misollari', jadval:[['60°','60° + 180° = 240°'],['135°','135° + 180° = 315°'],['180°','0° (yoki 360°)'],['250°','250° − 180° = 70°'],['330°','330° − 180° = 150°'],['0°','180°']],
     matn:'Qoida: to‘g‘ri va qaytish azimutlari farqi doim 180°. Darslik matnida faqat ayirish holati keltirilgan; qo‘shish holati — umumiy topografiya qoidasi.'},
    {sarlavha:'Azimut bo‘yicha harakatlanish tartibi', tartibli:true, punktlar:['Boshlang‘ich nuqtada kompasni gorizontal ushlab, strelka tormozini bo‘shatish','Kompasni burib, strelkaning shimoliy uchini limbdagi 0 belgisiga to‘g‘rilash (oriyentirlash)','Ko‘zlash moslamasini (ko‘rsatkichni) berilgan azimut sanog‘iga qo‘yish','Ko‘zlash chizig‘i bo‘ylab uzoqdagi yaqqol oriyentirni tanlash','Oriyentirgacha juft qadamlarni sanab borish','Oriyentirda yangi azimut va masofa bo‘yicha takrorlash; qaytishda qaytish azimutidan foydalanish']}
  ],
  bosqichlar:[
    {sarlavha:'Butun kompas', matn:'Tashqi ko‘rinish: korpus, ochiq qopqoq, shkala va strelka. Modelni aylantirib ko‘ring.', ajrat:[]},
    {sarlavha:'Ko‘zlash moslamasi', matn:'Qopqoqdagi mushka va tselik orqali predmetga qaraladi; shu yo‘nalishning limbdagi sanog‘i — azimut.', ajrat:[2], qism:2},
    {sarlavha:'Magnit strelka va tormoz', matn:'Strelka magnit meridiani bo‘ylab turadi. Ishdan so‘ng tormoz bilan qotiriladi.', ajrat:[2,3,5], qism:3},
    {sarlavha:'Limb', matn:'Adrianov kompasida limb 3° li bo‘limlarga ajratilgan; graduslar soat mili bo‘yicha oshadi.', ajrat:[2,3,4,5], qism:4},
    {sarlavha:'Qorong‘idagi belgilar', matn:'Strelka uchi va asosiy belgilar tunda ko‘rinadi — kechasi ham harakatlanish mumkin.', ajrat:[2,3,4,5,6], qism:6}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Azimut masalalari',
    topshiriqlar:[
      {shart:'Oriyentirga magnit azimuti 60°. Qaytish azimuti qancha?', holat:{}, v:['120°','240°','300°'], t:1, izoh:'60° < 180°, shuning uchun <b>60° + 180° = 240°</b>.'},
      {shart:'Azimut 250° bo‘yicha yurdingiz. Ortga qaytish uchun qaysi azimut?', holat:{}, v:['70°','110°','430°'], t:0, izoh:'250° > 180°, shuning uchun <b>250° − 180° = 70°</b>.'},
      {shart:'Azimut qaysi yo‘nalishdan o‘lchanadi?', holat:{}, v:['Sharqdan soat miliga teskari','Janubdan soat mili bo‘yicha','Magnit meridianining shimol yo‘nalishidan soat mili bo‘yicha'], t:2, izoh:'Magnit azimuti — <b>shimoldan soat mili bo‘yicha</b>, 0° dan 360° gacha.'},
      {shart:'Sharqqa qarab turgan predmetning magnit azimuti taxminan qancha?', holat:{}, v:['90°','180°','270°'], t:0, izoh:'Shimol — 0°, sharq — <b>90°</b>, janub — 180°, g‘arb — 270°.'},
      {shart:'Adrianov kompasi limbida 20 ta bo‘lim necha gradusga teng?', holat:{}, v:['20°','60°','100°'], t:1, izoh:'1 bo‘lim = 3°, demak <b>20 × 3° = 60°</b>.'}
    ]},
  test:[
    {s:'Magnit azimuti qanday o‘lchanadi?', v:['Janubdan soat miliga teskari','Shimoldan soat mili bo‘yicha','G‘arbdan soat mili bo‘yicha','Sharqdan ixtiyoriy'], t:1, izoh:'<b>Magnit meridianining shimol yo‘nalishidan soat mili bo‘yicha</b>.'},
    {s:'Azimut 120° bo‘lsa, qaytish azimuti?', v:['60°','240°','300°','200°'], t:2, izoh:'<b>120° + 180° = 300°</b>.'},
    {s:'Azimut 200° bo‘lsa, qaytish azimuti?', v:['20°','380°','160°','340°'], t:0, izoh:'<b>200° − 180° = 20°</b>.'},
    {s:'Adrianov kompasi limbining bitta bo‘linmasi necha gradus?', v:['1°','5°','10°','3°'], t:3, izoh:'<b>1 bo‘lim = 3°</b> yoki 0-50.'},
    {s:'Azimut bo‘yicha harakatlanganda masofa nima bilan o‘lchanadi?', v:['Soat bilan','Juft qadamlar bilan','Kompas limbi bilan','Ko‘z bilan chamalab'], t:1, izoh:'Darslik bo‘yicha — <b>juft qadamlar</b> bilan.'},
    {s:'Adrianov kompasi qachon yaratilgan?', v:['1812-yil','1941-yil','1907-yil','1880-yil'], t:2, izoh:'V. N. Adrianov kompasi <b>1907-yilda</b> yaratilgan.'},
    {s:'Strelka tormozining vazifasi nima?', v:['Strelkani ishlatilmaganda qotirish','Azimutni hisoblash','Tunda yoritish','Qopqoqni aylantirish'], t:0, izoh:'Tormoz strelkani <b>qotirib qo‘yadi</b>.'},
    {s:'Janubga yo‘nalishning magnit azimuti?', v:['90°','0°','270°','180°'], t:3, izoh:'Janub — <b>180°</b>.'}
  ],
  xavfsizlik:['Kompas bilan ishlaganda temir buyumlar, texnika va elektr uzatish liniyalaridan uzoqroq turing — ular strelkani og‘diradi.','Joyda mashg‘ulot faqat o‘qituvchi belgilagan hududda, guruh bilan va kelishilgan vaqtda o‘tkaziladi.','Adashib qolsangiz — to‘xtang, joyingizni o‘zgartirmang va kelishilgan signal yoki aloqa orqali xabar bering.'],
  yordamchi:[
    {s:'Qaytish azimutini qanday topaman?', j:'To‘g‘ri azimut 180° dan kichik bo‘lsa 180° qo‘shing, katta bo‘lsa 180° ayiring. Masalan: 60° → 240°, 250° → 70°.', kalit:['qaytish','teskari']},
    {s:'Juft qadam nima?', j:'Bir oyoq ikki marta yerga tekkunga qadar bosilgan masofa (ikki qadam). Har kim o‘z juft qadami uzunligini oldindan ma’lum masofada o‘lchab, yodda tutadi.', kalit:['juft','qadam']}
  ],
  maqola:[
    {sarlavha:'Kirish: nima uchun oriyentirlanish kerak?', xatboshilar:[
      'Joyda oriyentirlanish — o‘z turgan joyingizni, ufq tomonlarini va kerakli yo‘nalishni aniqlay olish. Bu ko‘nikma harbiy xizmatda razvedka, marsh va jangovar vazifalarni bajarishda zarur. Tinch hayotda ham u tog‘da sayr qilish, dala ishlari, qutqaruv xizmati va geologiya kabi sohalarda asqotadi.',
      '10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligining «Harbiy ish asoslari» bo‘limida joyda xaritasiz oriyentirlanish mavzusi o‘rganiladi. Unda kompas, magnit azimuti va azimut bo‘yicha harakatlanish asosiy o‘rin tutadi. Bugun sun’iy yo‘ldosh navigatsiyasi keng tarqalgan bo‘lsa ham, batareya tugashi yoki signal yo‘qolishi mumkin — kompas esa elektr energiyasiz ishlaydi.',
      'Bu darsda kompas qismlari, magnit azimuti, qaytish azimuti va juft qadam bilan masofa o‘lchashni o‘rganamiz. Sahnadagi 3D model umumiy kompas bo‘lib, Adrianov kompasining aniq nusxasi emas; qismlar nomi va vazifasi esa Adrianov kompasi bo‘yicha berilgan.'
    ]},
    {sarlavha:'Adrianov kompasi tuzilishi', xatboshilar:[
      'Adrianov kompasini rus harbiy topografi V. N. Adrianov 1907-yilda yaratgan va u uzoq yillar davomida armiyada asosiy qo‘l kompasi bo‘lib kelgan. Kompasning asosiy qismlari: korpus, limb (aylana shkala), magnit strelka, strelka tormozi, aylanuvchi qopqoq va unga o‘rnatilgan ko‘zlash moslamasi — mushka va tselik. Strelka uchi va asosiy belgilar qorong‘ida ko‘rinadigan modda bilan qoplangan.',
      'Limb ikki xil birlikda bo‘lingan: graduslar va burchak o‘lchagich bo‘linmalari (mingliklar). Bitta bo‘lim 3° ga yoki 0-50 ga (50 minglik) teng. Graduslar soat mili bo‘yicha, mingliklar esa teskari yo‘nalishda oshadi. Mingliklar artilleriya va o‘q otish hisoblarida qulay bo‘lgani uchun harbiy kompaslarda ikkala shkala ham beriladi.',
      'Strelka tormozi kompas ishlatilmaganda strelkani qotirib qo‘yadi. Bu strelka turgan o‘q uchining yeyilishiga yo‘l qo‘ymaydi va kompas aniqligini uzoq saqlaydi. Shuning uchun ish tugagach, tormozni albatta yopish kerak.',
      'Kompas bilan ishlashdan oldin uning sozligini tekshirish foydali. Buning uchun kompas gorizontal holatda qo‘yiladi va strelka tinchlangach, uning ko‘rsatgan yo‘nalishi eslab qolinadi. So‘ng strelka yaqiniga temir buyum keltirib, u og‘dirib yuboriladi va buyum olib qo‘yiladi. Soz kompasda strelka har safar avvalgi holatiga qaytadi. Agar strelka turli holatda to‘xtasa yoki juda sekin harakatlansa, kompas nosoz bo‘lishi mumkin.'
    ]},
    {sarlavha:'Magnit azimuti va qaytish azimuti', xatboshilar:[
      'Magnit azimuti — magnit meridianining shimol yo‘nalishidan predmet yo‘nalishigacha soat mili bo‘yicha o‘lchanadigan gorizontal burchak. U 0° dan 360° gacha qiymat oladi. Asosiy yo‘nalishlar: shimol — 0°, sharq — 90°, janub — 180°, g‘arb — 270°. Kompas strelkasi Yerning magnit maydoni bo‘ylab joylashgani uchun u geografik emas, magnit shimolini ko‘rsatadi.',
      'Qaytish azimuti — ortga qaytish yo‘nalishining azimuti. U to‘g‘ri azimutdan roppa-rosa 180° ga farq qiladi. To‘g‘ri azimut 180° dan kichik bo‘lsa, unga 180° qo‘shiladi; 180° dan katta bo‘lsa, 180° ayiriladi. Masalan, oriyentirga azimut 60° bo‘lsa, qaytish azimuti 240°; azimut 250° bo‘lsa, qaytish azimuti 70°.',
      'Darslik matnida qaytish azimuti uchun asosan ayirish holati keltirilgan, qo‘shish holati esa umumiy topografiya qoidasi sifatida qo‘llaniladi. Ikkala holatni bitta qoida bilan eslab qolish mumkin: natija 0° dan 360° gacha oraliqda bo‘lishi va to‘g‘ri azimutdan 180° farq qilishi kerak.',
      'Qaytish azimuti marshrut bo‘yicha orqaga qaytishda ayniqsa zarur. Tasavvur qiling: guruh boshlang‘ich nuqtadan azimut 60° bo‘yicha 300 juft qadam yurdi. Ortga qaytish uchun kompasda 240° o‘rnatiladi va xuddi shuncha juft qadam yuriladi. Bir necha bo‘lakdan iborat marshrutda esa bo‘laklar teskari tartibda, har biri o‘z qaytish azimuti bo‘yicha o‘tiladi. Shuning uchun har bir bo‘lakning azimuti va juft qadamlar soni daftarga yozib boriladi.'
    ]},
    {sarlavha:'Azimut bo‘yicha harakatlanish', xatboshilar:[
      'Azimutni aniqlash uchun kompas gorizontal holatda ushlanadi, strelka tormozi bo‘shatiladi va kompas strelkaning shimoliy uchi limbdagi 0 belgisiga to‘g‘ri kelguncha buriladi — bu kompasni oriyentirlash deyiladi. So‘ng qopqoqdagi ko‘zlash moslamasi predmetga qaratiladi va ko‘rsatkich qarshisidagi limb sanog‘i o‘qiladi. Darslikda kompasni chap qo‘lda, ko‘zdan taxminan 10 sm pastda ushlash tavsiya qilinadi.',
      'Berilgan azimut bo‘yicha harakatlanishda teskari ish bajariladi: ko‘zlash moslamasi berilgan sanoqqa qo‘yiladi, kompas oriyentirlanadi va ko‘zlash chizig‘i bo‘ylab uzoqdagi yaqqol oriyentir — daraxt, ustun, tepalik — tanlanadi. Keyin kompasga qaramasdan shu oriyentirgacha yuriladi, oriyentirda esa amal takrorlanadi.',
      'Har bir oraliq masofa juft qadamlar bilan o‘lchanadi. Juft qadam — bir oyoqning ikki marta yerga tegishi orasidagi masofa. Har bir odamning juft qadami uzunligi har xil, shuning uchun uni oldindan ma’lum masofada (masalan, stadion yo‘lagida) bir necha marta o‘lchab, o‘rtachasini yodda tutish kerak. Qiyalik, qum yoki qor qadam uzunligini o‘zgartiradi.',
      'Yo‘lda to‘siq — botqoq, jar yoki bino — uchrasa, uni aylanib o‘tish kerak bo‘ladi. Bunda to‘siqning narigi tomonida azimut chizig‘idagi oriyentir belgilab olinadi, to‘siq aylanib o‘tiladi va o‘sha oriyentirdan harakat avvalgi azimut bo‘yicha davom ettiriladi. To‘siqni aylanib o‘tgan yo‘l qadamlari sanalmaydi, lekin to‘siqning azimut chizig‘i bo‘ylab kengligi ko‘z bilan chamalanadi va to‘siqqacha o‘tilgan masofaga qo‘shiladi. Bunday usullar amaliy mashg‘ulotda o‘qituvchi ko‘rsatmasi bilan o‘rganiladi.'
    ]},
    {sarlavha:'Kompas tarixi va zamonaviy qo‘llanishi', xatboshilar:[
      'Magnit strelkaning shimol–janub yo‘nalishida turishi qadimdan ma’lum bo‘lgan va kompas dengizchilar uchun eng muhim asbobga aylangan. Vaqt o‘tishi bilan kompaslarga shkala, ko‘zlash moslamasi va strelka tormozi qo‘shildi. XX asr boshida yaratilgan Adrianov kompasi aynan quruqlikda, qo‘lda ishlatishga moslashtirilgan harbiy asbob edi.',
      'Bugun ham kompas topograflar, geologlar, o‘rmonchilar, sayyohlar va qutqaruvchilar tomonidan ishlatiladi. Sport oriyentirlashda sportchilar xarita va kompas yordamida nazorat punktlarini topadi. Sun’iy yo‘ldosh navigatorlari mavjud bo‘lsa ham, mutaxassislar ular ishdan chiqqan holatlar uchun kompas bilan ishlashni bilishi shart.',
      'Kompas faqat Yerning magnit maydoniga emas, yaqindagi har qanday temir va magnit buyumga ham ta’sirlanadi. Shuning uchun azimutni texnika, temir panjara, elektr uzatish liniyalari yonida o‘lchash xatoga olib keladi. Bundan tashqari, magnit va geografik shimol bir-biriga to‘g‘ri kelmaydi; xarita bilan ishlaganda bu farq hisobga olinadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish', xatboshilar:[
      'Birinchi xato — azimutni soat miliga teskari yo‘nalishda sanash. Azimut doimo shimoldan soat mili bo‘yicha o‘lchanadi. Ikkinchi xato — kompasni qiya ushlash: strelka erkin aylana olmaydi va noto‘g‘ri sanoq beradi. Uchinchi xato — temir buyum (masalan, avtomat yoki mashina) yonida o‘lchash.',
      'To‘rtinchi xato — qaytish azimutini hisoblashda doim 180° qo‘shish va 360° dan katta son olish. Agar natija 360° dan oshsa, demak ayirish kerak edi. Beshinchi xato — juft qadamni oddiy qadam bilan aralashtirish: sanoqni ikkinchi oyoq qadamida emas, faqat bir oyoq qadamida olib borish kerak.',
      'Eslab qolish usuli: «Shimol — nol, soat bo‘ylab yuramiz; qaytishda — yarim aylana (180°)». Asosiy nuqtalar: Sh 0°, Sharq 90°, J 180°, G‘ 270°. Adrianov limbi uchun: «bitta bo‘lim — uch gradus».'
    ]}
  ],
  formulalar:[
    ['A_qayt = A + 180° (A < 180°)','Qaytish azimuti — qo‘shish holati'],
    ['A_qayt = A − 180° (A > 180°)','Qaytish azimuti — ayirish holati'],
    ['Gradus = bo‘limlar soni × 3°','Adrianov kompasi limbi bo‘yicha'],
    ['Masofa = juft qadamlar soni × juft qadam uzunligi','Juft qadam uzunligi har kim uchun oldindan o‘lchanadi']
  ],
  qiziqarli:[
    'Adrianov kompasi 1907-yilda yaratilgan va XX asr davomida harbiy qo‘l kompasi sifatida keng ishlatilgan.',
    'Adrianov kompasi limbida graduslar soat mili bo‘yicha, mingliklar esa teskari yo‘nalishda oshadi.',
    'Kompas strelkasi geografik emas, magnit shimolni ko‘rsatadi — ular bir nuqtada joylashmagan.',
    'Kompas strelkasi va belgilaridagi qorong‘ida ko‘rinadigan modda tunda chiroqsiz harakatlanishga imkon beradi.'
  ],
  lugat:[
    ['Oriyentirlanish','Joyda o‘z turgan nuqtasini, ufq tomonlarini va harakat yo‘nalishini aniqlash.'],
    ['Oriyentir','Yo‘nalish va joyni aniqlashda tayanch bo‘ladigan yaqqol ko‘rinadigan predmet.'],
    ['Magnit meridiani','Kompas strelkasi joylashadigan yo‘nalish.'],
    ['Magnit azimuti','Magnit meridianining shimol yo‘nalishidan predmetgacha soat mili bo‘yicha o‘lchanadigan gorizontal burchak (0–360°).'],
    ['Qaytish azimuti','To‘g‘ri azimutdan 180° farq qiladigan, ortga qaytish yo‘nalishi azimuti.'],
    ['Limb','Kompasning aylana shkalasi.'],
    ['Minglik','Harbiy burchak o‘lchagich birligi; Adrianov kompasida 1 bo‘lim = 0-50.'],
    ['Ko‘zlash moslamasi','Qopqoqdagi mushka va tselik; predmetga yo‘nalish olish uchun.'],
    ['Strelka tormozi','Magnit strelkani qotirib qo‘yuvchi moslama.'],
    ['Juft qadam','Bir oyoqning ikki marta yerga tegishi orasidagi masofa.'],
    ['Kompasni oriyentirlash','Strelkaning shimoliy uchini limbdagi 0 belgisiga to‘g‘rilash.']
  ],
  manba:'10-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2017), 127–130-betlar (82-rasm; azimut, qaytish azimuti, juft qadam); Википедия «Компас Адрианова» (1907-yil, limb bo‘linmalari); MAKON manba/harbiy_mazmun.md 6-bo‘lim. Qaytish azimutining qo‘shish holati va azimut bo‘yicha harakat tartibi — umumiy topografiya qoidasi (darslik matni noaniq). 3D model — umumiy kompas, Adrianov kompasi emas.',
  ishlanma:{
    sinf:'10-sinf', vaqt:'45 daqiqa', tur:'Aralash (yangi bilim + amaliy mashq)', usul:'3D model, haqiqiy kompas bilan mashq, masala yechish, guruhda ishlash',
    maqsad:{talimiy:'Kompas qismlari, magnit azimuti, qaytish azimuti, azimut bo‘yicha harakatlanish va juft qadam bilan masofa o‘lchashni o‘rgatish.',
      tarbiyaviy:'Mustaqillik, diqqatlilik, jamoada ishlash va harbiy intizom.',
      rivojlantiruvchi:'Fazoviy tasavvur, og‘zaki hisob, amaliy vaziyatda qaror qabul qilish.'},
    natijalar:['Kompasning asosiy qismlarini nomlaydi va vazifasini aytadi','Magnit azimutini ta’riflaydi va asosiy yo‘nalishlar azimutini biladi','Qaytish azimutini hisoblaydi','O‘z juft qadami uzunligini o‘lchaydi va masofani hisoblaydi'],
    jihozlar:['MAKON 3D sahnasi «Kompas»','Proyektor','Kompaslar (guruhga 1 ta, mavjud bo‘lsa Adrianov kompasi)','Ruletka yoki o‘lchangan 50 m masofa (maktab hovlisi)','10-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Xavfsizlik: hovlida faqat belgilangan hududda.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Telefoningiz o‘chib qolsa, o‘rmonda qanday yo‘l topasiz?»','Fikr bildiradi.'],
      ['8–16','<b>Kompas tuzilishi.</b> MAKON 3D da qismlarni ajratib ko‘rsatadi; haqiqiy kompasda topishni so‘raydi.','Guruhda qismlarni topadi.'],
      ['16–25','<b>Azimut va qaytish azimuti.</b> Ta’riflar, asosiy yo‘nalishlar, misollar doskada.','Misollarni yechadi.'],
      ['25–36','<b>Amaliy mashq.</b> Sinfdagi 2–3 predmetga azimut o‘lchash; hovlida (imkon bo‘lsa) 50 m da juft qadamni o‘lchash.','O‘lchaydi, natijani yozadi.'],
      ['36–42','<b>Mustahkamlash.</b> MAKON «Azimut masalalari» mashqi va test.','Mashq va test bajaradi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Magnit azimuti','Shimoldan soat mili bo‘yicha burchak, 0–360°.'],['Qaytish azimuti','To‘g‘ri azimut ±180°.'],['Limb','Kompas shkalasi.'],['Juft qadam','Ikki qadam masofasi.'],['Oriyentir','Tayanch predmet.']],
    savollar:[['Magnit azimuti qanday o‘lchanadi?','Magnit meridianining shimol yo‘nalishidan soat mili bo‘yicha'],['Azimut 45° bo‘lsa, qaytish azimuti?','225°'],['Azimut 300° bo‘lsa, qaytish azimuti?','120°'],['Adrianov kompasi limbining 1 bo‘limi?','3° (0-50)'],['Masofa nima bilan o‘lchanadi?','Juft qadamlar bilan']],
    uy:'Darslikning 127–130-betlarini o‘qish; uyingizdan maktabgacha bo‘lgan yo‘lning bir qismida juft qadamlar sonini sanab, masofani hisoblash; 5 ta azimut uchun qaytish azimutini topish.',
    manba:'10-sinf ChQBT darsligi (2017), 127–130-betlar; Википедия «Компас Адрианова».'
  }
},

/* ============ 8. DASTLABKI TIBBIY YORDAM ============ */
'harbiy-tibbiy': {
  fan:'harbiy', qisqaNom:'Tibbiy yordam', nom:'Dastlabki tibbiy yordam: qon ketishni to‘xtatish',
  qisqa:'11-sinf · 7-bo‘lim «Tibbiy bilim asoslari»',
  sahna:'glb', zaxira:null,
  model:{fayl:'dori_qutisi', yorliq:'Birinchi yordam qutisi · umumiy 3D model', sozlama:{ry:.6, rx:-.15, avto:true, zoom:1.2}},
  rejimlar:['butun','rentgen','ajrat'],
  qismlar:[
    {raqam:1, nom:'Quti (korpus)', vazifa:'Tibbiy vositalarni toza va quruq saqlaydi; tez topilishi uchun yorqin belgilanadi.', tugun:[], d:[0,0,0]},
    {raqam:2, nom:'Tibbiy qo‘lqop', vazifa:'Yordam beruvchini qon orqali yuqadigan infeksiyalardan himoya qiladi.', tugun:[], d:[-1.4,1,0]},
    {raqam:3, nom:'Steril salfetka va bint', vazifa:'Yarani bosish va bosuvchi bog‘lam qo‘yish uchun.', tugun:[], d:[0,1.6,0]},
    {raqam:4, nom:'Qon to‘xtatuvchi jgut', vazifa:'Qo‘l-oyoqdan hayot uchun xavfli qon ketishda: bosish bilan to‘xtamasa yoki qon juda kuchli ketsa (masalan, qo‘l-oyoq uzilganda) — kechiktirmasdan.', tugun:[], d:[1.4,1,0]},
    {raqam:5, nom:'Marker va qog‘oz', vazifa:'Jgut qo‘yilgan vaqtni yozib qo‘yish uchun.', tugun:[], d:[0,1,1.4]}
  ],
  kor:{
    sarlavha:'Birinchi daqiqalar hayotni saqlaydi',
    matn:'Kuchli qon ketish bir necha daqiqada hayot uchun xavfli bo‘lishi mumkin, tez yordam esa darhol yetib kelmasligi mumkin. Shuning uchun qon ketishni to‘xtatish usullarini har bir inson bilishi kerak. Usullar osondan murakkabga qarab qo‘llaniladi: to‘g‘ridan to‘g‘ri bosish, bosuvchi bog‘lam va faqat zarurat bo‘lganda — jgut. Darsda faqat maneken yoki sherik ustida, qon to‘xtatmasdan, o‘quv maqsadida mashq qilinadi.',
    punktlar:['<b>1.</b> Yarani to‘g‘ridan to‘g‘ri bosish (doka, bint, toza mato)','<b>2.</b> Bosuvchi bog‘lam; qon sizsa — ustidan yana bog‘lam','<b>3.</b> Jgut — faqat qo‘l-oyoqdan hayot uchun xavfli qon ketishda','Jgut vaqti <b>albatta yoziladi</b>, jgut kiyim bilan yopilmaydi']
  },
  bolimlar:[
    {sarlavha:'Qon ketishni to‘xtatish usullari', tartibli:true, punktlar:['<b>To‘g‘ridan to‘g‘ri bosish</b> — yaraga doka, bint yoki toza mato qo‘yib, qon to‘xtaguncha qo‘l bilan bosib turish (imkon bo‘lsa qo‘lqop kiyiladi)','<b>Bosuvchi bog‘lam</b> — steril salfetka ustidan bint zich o‘ramlar bilan bog‘lanadi; qon sizib chiqsa, eskisini olmasdan ustidan yana bog‘lam qo‘yiladi','<b>Qon to‘xtatuvchi jgut</b> — qo‘l-oyoqdan hayot uchun xavfli qon ketishda: bosish bilan to‘xtamasa yoki qon juda kuchli ketsa (masalan, qo‘l-oyoq uzilganda) kechiktirmasdan qo‘yiladi; kichik jarohatlarda qo‘yilmaydi']},
    {sarlavha:'Jgut qo‘yish qoidalari', jadval:[
      ['Joyi','Yaradan yuqoriroqda (yara bilan yurak orasida), MChS: 5–7 sm yuqori (boshqa manbada 3–5 sm)'],
      ['Ostiga','Kiyim ustidan yoki mato taglik qo‘yib — to‘g‘ridan to‘g‘ri teriga emas'],
      ['Kuch','Qon to‘xtashi uchun yetarli, minimal kuch bilan'],
      ['To‘g‘ri qo‘yilganlik belgisi','Qon ketish to‘xtaydi yoki jgutdan pastda puls yo‘qoladi'],
      ['Ko‘rinib turishi','Jgut kiyim yoki bog‘lam bilan yopilmaydi'],
      ['Vaqtni yozish','Aniq vaqt marker bilan teriga (peshona/yuz) yoki yozuv jgut ostiga qo‘yiladi'],
      ['Vaqt chegarasi','MChS: havo haroratidan qat’i nazar 2 soatgacha nisbatan xavfsiz. Tibbiy yordam yetib kelguncha jgut bo‘shatilmaydi va yechilmaydi; vaqt yoziladi, jabrlanuvchi imkon qadar tez shifoxonaga yetkaziladi (ERC 2021, ANZCOR)'],
      ['Keyin','Oyoq-qo‘l harakatsizlantiriladi, isitiladi; tez yordam chaqiriladi']
    ], matn:'<span style="color:var(--sariq)">Diqqat — manbalar farq qiladi:</span> an’anaviy «yozda 1 soat, qishda 30 daqiqa» (ba’zi manbalarda «yozda 2, qishda 1 soat») qoidasi ikkilamchi manbalarda uchraydi. Darsda Rossiya FVV (MChS) rasmiy tavsiyasi keltirildi; O‘zbekiston Sog‘liqni saqlash vazirligining amaldagi yo‘riqnomasi bilan tekshirish shart.'},
    {sarlavha:'Qon ketish turlari (umumiy tavsif)', jadval:[['Arterial','Och qizil qon, kuchli, zarb bilan otilib chiqadi — eng xavfli'],['Venoz','To‘q qizil qon, bir tekis oqib chiqadi'],['Kapillyar','Butun yara yuzasidan sizib chiqadi, odatda bosish bilan to‘xtaydi']]}
  ],
  bosqichlar:[
    {sarlavha:'Birinchi yordam qutisi', matn:'Qutini ochishdan oldin: atrof xavfsizmi? Yordam boshlanishi bilan boshqa odamga tez yordam chaqirtiring.', ajrat:[]},
    {sarlavha:'Qo‘lqop', matn:'Imkon bo‘lsa, tibbiy qo‘lqop kiyiladi — o‘zingizni infeksiyadan himoya qilish uchun.', ajrat:[2], qism:2},
    {sarlavha:'Bosish va bosuvchi bog‘lam', matn:'Yaraga salfetka qo‘yib, qo‘l bilan bosing; keyin bint bilan zich bog‘lang. Qon sizsa — eskisini olmasdan ustidan yana bog‘lang.', ajrat:[2,3], qism:3},
    {sarlavha:'Jgut — xavfli qon ketishda', matn:'Qo‘l-oyoqdan hayot uchun xavfli qon ketishda (bosish yordam bermasa yoki qon juda kuchli ketsa) kechiktirmasdan: yaradan yuqorida, kiyim yoki taglik ustidan, qon to‘xtaguncha minimal kuch bilan.', ajrat:[2,3,4], qism:4},
    {sarlavha:'Vaqtni yozish', matn:'Jgut qo‘yilgan aniq vaqt yoziladi; jgut ochiq qoldiriladi va tibbiy yordam yetib kelguncha bo‘shatilmaydi, qo‘l-oyoq harakatsizlantiriladi va isitiladi.', ajrat:[2,3,4,5], qism:5}
  ],
  amaliyot:{tur:'tartib', sarlavha:'Jgut qo‘yish ketma-ketligi',
    shartAjrat:'Vaziyat: <b>sonidan kuchli qon ketmoqda, bosuvchi bog‘lam yordam bermadi</b>. Harakatlarni to‘g‘ri tartibda bosing',
    takror:'ayni', shartYig:'Yana bir marta — endi <b>xotiradan, xuddi shu tartibda</b> takrorlang (mustahkamlash)',
    qismlar:[[1,'Jgut joyini tanlash: yaradan yuqoriroqda (yara va yurak orasida)'],[2,'Kiyim ustidan yoki mato taglik qo‘yish'],[3,'Jgutni qon to‘xtaguncha minimal kuch bilan qo‘yish'],[4,'Tekshirish: qon to‘xtadimi (pastda puls yo‘qmi)'],[5,'Aniq vaqtni yozish, jgutni ochiq qoldirish'],[6,'Harakatsizlantirish, isitish, tez yordamni kutish']]},
  test:[
    {s:'Qon ketishni to‘xtatishda birinchi navbatda qaysi usul qo‘llaniladi?', v:['Jgut','Yarani to‘g‘ridan to‘g‘ri bosish','Yarani yuvish','Isitish'], t:1, izoh:'Usullar osondan murakkabga: avval <b>bosish</b>, keyin bosuvchi bog‘lam, oxirida jgut.'},
    {s:'Jgut qachon qo‘yiladi?', v:['Har qanday tirnalishda','Burundan qon ketganda','Qo‘l-oyoqdan hayot uchun xavfli qon ketishda: bosish yordam bermasa yoki qon juda kuchli ketsa','Faqat bosh jarohatida'], t:2, izoh:'Jgut qo‘l-oyoqdan <b>hayot uchun xavfli</b> qon ketishda kechiktirmasdan qo‘yiladi; kichik jarohatlarda qo‘yilmaydi.'},
    {s:'Jgut qayerga qo‘yiladi?', v:['Yaraning o‘ziga','Yaradan pastroqqa','Yaradan yuqoriroqqa (yara va yurak orasiga)','Istalgan joyga'], t:2, izoh:'<b>Yaradan yuqoriroqda</b>, yara bilan yurak orasida.'},
    {s:'Bosuvchi bog‘lamdan qon sizib chiqsa, nima qilinadi?', v:['Eski bog‘lam olib tashlanadi','Ustidan yana bog‘lam qo‘yiladi','Yara ochiq qoldiriladi','Bog‘lam suv bilan namlanadi'], t:1, izoh:'MChS tavsiyasi: <b>ustidan yana bog‘lam</b>; to‘xtamasa — jgut.'},
    {s:'Jgut to‘g‘ri qo‘yilganining belgisi?', v:['Oyoq-qo‘l qizarib ketadi','Qon ketish to‘xtaydi yoki jgutdan pastda puls yo‘qoladi','Og‘riq yo‘qoladi','Jgut ko‘rinmay qoladi'], t:1, izoh:'<b>Qon ketish to‘xtaydi</b> yoki pastda puls sezilmaydi.'},
    {s:'Nima uchun jgut qo‘yilgan vaqt yoziladi?', v:['Hisobot uchun','Shifokorlar jgut qancha vaqt turganini bilishi uchun — uzoq turishi to‘qimalarga zararli','Bu shart emas','Jgutni tezroq yechish uchun'], t:1, izoh:'Jgutning <b>uzoq turishi xavfli</b> — vaqtni bilish davolash uchun muhim.'},
    {s:'Jgutni teriga to‘g‘ridan to‘g‘ri qo‘yish mumkinmi?', v:['Ha, shunday qo‘yiladi','Faqat qishda','Faqat bolalarda','Yo‘q — kiyim ustidan yoki taglik qo‘yib'], t:3, izoh:'Jgut <b>kiyim yoki mato taglik ustidan</b> qo‘yiladi.'},
    {s:'Qaysi qon ketish eng xavfli va zarb bilan otilib chiqadi?', v:['Arterial','Kapillyar','Venoz','Hammasi bir xil'], t:0, izoh:'<b>Arterial</b> qon ketish — och qizil, kuchli, pulsatsiyalanuvchi.'}
  ],
  xavfsizlik:[
    'O‘quv mashg‘ulotida jgut faqat manekenga yoki o‘qituvchi nazoratida sherikning kiyimi ustidan <b>bo‘sh</b>, qisqa vaqtga qo‘yiladi — qon aylanishini to‘xtatish darajasida tortish taqiqlanadi.',
    'Haqiqiy vaziyatda avval o‘z xavfsizligingizni ta’minlang (yo‘l harakati, elektr, yong‘in) va imkon bo‘lsa qo‘lqop kiying.',
    'Tez yordam chaqiring (O‘zbekistonda tez yordam — 103; amaldagi raqamlarni tekshirib qo‘ying) yoki buni boshqa odamga topshiring.',
    'Jgut vaqt chegarasi bo‘yicha manbalar farq qiladi — amaldagi rasmiy yo‘riqnomaga amal qiling; jgut tibbiy yordam yetib kelguncha bo‘shatilmaydi va yechilmaydi — uni mutaxassis yechadi.'
  ],
  yordamchi:[
    {s:'Jgut qancha vaqt turishi mumkin?', j:'Rossiya FVV (MChS) tavsiyasi: havo haroratidan qat’i nazar 2 soatgacha nisbatan xavfsiz. Tibbiy yordam yetib kelguncha jgut bo‘shatilmaydi va yechilmaydi (ERC 2021, ANZCOR): vaqt yoziladi, jabrlanuvchi imkon qadar tez shifoxonaga yetkaziladi. Eski «yozda 1 soat, qishda 30 daqiqa» qoidasi ham uchraydi — manbalar farq qiladi, amaldagi O‘zbekiston yo‘riqnomasiga amal qiling.', kalit:['vaqt','soat','qancha']},
    {s:'Jgut bo‘lmasa nima qilaman?', j:'Avval yarani kuchli bosing va bosuvchi bog‘lam qo‘ying — ko‘p hollarda bu yetarli. Jgut o‘rniga improvizatsiya qilish bo‘yicha aniq ko‘rsatma bu darsda manbadan tekshirilmadi; o‘qituvchi yoki tibbiyot xodimidan so‘rang.', kalit:['jgut yo‘q','bo‘lmasa','o‘rniga']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega har bir inson bilishi kerak?', xatboshilar:[
      'Yo‘l-transport hodisasi, ishlab chiqarishdagi jarohat, uydagi o‘tkir asbob bilan kesilish — bunday vaziyatlarda odam kuchli qon yo‘qotishi mumkin. Tez yordam brigadasi yo‘lda bo‘lgan birinchi daqiqalarda jabrlanuvchining taqdiri ko‘pincha yonidagi odamlarga bog‘liq. Qon ketishni to‘g‘ri to‘xtatish oddiy, lekin hayotni saqlab qoluvchi ko‘nikmadir.',
      '11-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligining 7-bo‘limi «Tibbiy bilim asoslari» deb ataladi. Bu darsda qon ketish turlari, uni to‘xtatish usullari va jgut qo‘yish qoidalari o‘rganiladi. Darslik elektron nusxasidagi tegishli sahifalar matni tekshirilmagani sababli, bu yerda Rossiya Favqulodda vaziyatlar vazirligi (MChS) rasmiy tavsiyasi asos qilib olindi.',
      'Eng muhim tamoyil: usullar osondan murakkabga qarab qo‘llaniladi. Ko‘p hollarda qon ketishni yarani bosish va bosuvchi bog‘lam bilan to‘xtatish mumkin. Jgut esa jiddiy asoratlar berishi mumkin, shuning uchun kichik jarohatlarda qo‘yilmaydi; lekin qo‘l-oyoqdan hayot uchun xavfli qon ketsa — bosish bilan to‘xtamasa yoki qon juda kuchli ketsa (masalan, qo‘l-oyoq uzilganda) — kechiktirmasdan qo‘yiladi.',
      'Har qanday yordam ko‘rsatishdan oldin atrofga qarab, xavf bor-yo‘qligini baholash kerak. Yo‘l harakati, uzilgan elektr simi, yong‘in yoki qulash xavfi bo‘lsa, avval o‘z xavfsizligingizni ta’minlang — aks holda yordamga muhtojlar soni ko‘payadi. Keyin jabrlanuvchiga murojaat qiling, uni tinchlantiring va atrofdagilardan birini aniq ko‘rsatma bilan tez yordam chaqirishga yuboring: «Siz — tez yordamni chaqiring!»'
    ]},
    {sarlavha:'Qon ketish turlari', xatboshilar:[
      'Qaysi qon tomir shikastlanganiga qarab qon ketish arterial, venoz va kapillyar bo‘ladi. Arterial qon ketishda och qizil rangli qon yurak urishiga mos zarb bilan otilib chiqadi. Arteriyalarda bosim yuqori bo‘lgani uchun qon yo‘qotish juda tez kechadi va bu eng xavfli tur hisoblanadi.',
      'Venoz qon ketishda to‘q qizil qon bir tekis oqib chiqadi. Yirik venalar shikastlansa, u ham xavfli bo‘lishi mumkin. Kapillyar qon ketishda esa qon butun yara yuzasidan sizib chiqadi — masalan, tizza shilinganda. Kapillyar qon ketish odatda oddiy bosish va bog‘lam bilan to‘xtaydi.',
      'Hayotda qon ketish turi har doim aniq ko‘rinmaydi va ko‘pincha aralash bo‘ladi. Shuning uchun amaliy qoida oddiy: qon ketish qanchalik kuchli ekaniga qarab harakat qiling. Avval bosing, bog‘lang, kuchli qon ketish to‘xtamasa va jarohat qo‘l yoki oyoqda bo‘lsa — jgutga o‘ting.',
      'Qon yo‘qotgan odamda holsizlik, rangparlik, sovuq ter, tez-tez nafas olish va bosh aylanishi kuzatilishi mumkin. Bu belgilar paydo bo‘lsa, jabrlanuvchini yotqizib, tinchlantirish va sovqotmasligi uchun ustini yopish kerak. Unga suyuqlik yoki dori berish, holatini baholash va davolash — tibbiyot xodimlarining vazifasi. Yordam beruvchining asosiy ishi — qon ketishni to‘xtatish va tez yordam kelguncha jabrlanuvchi yonida bo‘lish.'
    ]},
    {sarlavha:'Bosish va bosuvchi bog‘lam', xatboshilar:[
      'Birinchi usul — yarani to‘g‘ridan to‘g‘ri bosish. Yaraga doka, bint yoki boshqa toza mato qo‘yiladi va qon to‘xtaguncha qo‘l bilan kuchli bosib turiladi. Imkon bo‘lsa, yordam beruvchi tibbiy qo‘lqop kiyadi — bu uni qon orqali yuqadigan infeksiyalardan himoya qiladi.',
      'Ikkinchi usul — bosuvchi bog‘lam. Yaraga steril salfetka qo‘yiladi va uning ustidan bint zich o‘ramlar bilan bog‘lanadi, shunda bog‘lam yarani doimiy bosib turadi. Agar bog‘lam orqali qon sizib chiqsa, uni olib tashlamaslik kerak — ustidan yana bir bog‘lam qo‘yiladi. Eski bog‘lamni olish hosil bo‘la boshlagan qon laxtasini buzishi mumkin.',
      'Bosuvchi bog‘lam qo‘yilgach ham qon ketish davom etsa va jarohat qo‘l-oyoqda bo‘lsa, jgut qo‘yishga o‘tiladi. Bosh, bo‘yin yoki tanadagi jarohatlarda jgut qo‘llanmaydi — bunday hollarda bosish va bog‘lam davom ettiriladi va tez yordam kutiladi.'
    ]},
    {sarlavha:'Jgut qo‘yish qoidalari', xatboshilar:[
      'Jgut yaradan yuqoriroqda, ya’ni yara bilan yurak orasida qo‘yiladi. MChS tavsiyasida bu masofa yaradan 5–7 sm yuqori deb ko‘rsatilgan, ruscha Vikipediyada esa 3–5 sm deyiladi — farq kichik, lekin manbalar bir xil emas. Jgut teriga to‘g‘ridan to‘g‘ri emas, kiyim ustidan yoki mato taglik qo‘yib qo‘yiladi, aks holda teri va to‘qimalar shikastlanadi.',
      'Jgut qon to‘xtashi uchun yetarli, lekin minimal kuch bilan tortiladi. To‘g‘ri qo‘yilganlik belgisi — qon ketish to‘xtaydi yoki jgutdan pastda puls yo‘qoladi. Jgut kiyim yoki bog‘lam bilan yopilmaydi: uni boshqa yordamchilar va shifokorlar darhol ko‘rishi kerak.',
      'Jgut qo‘yilgan aniq vaqt albatta yoziladi — marker bilan jabrlanuvchining terisiga (masalan, peshonasiga) yoki qog‘ozga yozib, jgut ostiga qo‘yiladi. Shundan keyin qo‘l yoki oyoq harakatsizlantiriladi (immobilizatsiya), jabrlanuvchi isitiladi va tez yordam chaqiriladi yoki uning kelishi kutiladi.',
      'Hozirgi vaqtda ko‘plab mamlakatlarda maxsus sanoat jgutlari ishlatiladi: ular bir qo‘l bilan ham qo‘yilishi mumkin bo‘lgan tasma va mahkamlash moslamasidan iborat. An’anaviy rezina jgut ham hali keng tarqalgan. Qaysi turdagi jgut bo‘lishidan qat’i nazar, asosiy qoidalar bir xil: yaradan yuqorida, qon to‘xtaguncha, vaqtni yozish va ochiq qoldirish. Har bir jgut turini qo‘llash tartibi uning yo‘riqnomasida ko‘rsatiladi.'
    ]},
    {sarlavha:'Jgut vaqti: manbalar nima deydi?', xatboshilar:[
      'Jgut qancha vaqt turishi mumkinligi bo‘yicha turli manbalarda turli qoidalar uchraydi. Rossiya FVV (MChS) rasmiy tavsiyasiga ko‘ra jgut havo haroratidan qat’i nazar 2 soatgacha nisbatan xavfsiz. Jgut qo‘yilgach, tibbiy yordam yetib kelguncha bo‘shatilmaydi va yechilmaydi; vaqt yoziladi va jabrlanuvchi imkon qadar tez shifoxonaga yetkaziladi. Ba’zi eski qo‘llanmalarda jgutni vaqti-vaqti bilan bo‘shatib turish tavsiya qilingan, ammo hozirgi xalqaro birinchi yordam yo‘riqnomalari (ERC 2021, ANZCOR) buni tavsiya etmaydi.',
      'Ko‘plab eski qo‘llanmalar va internet saytlarida esa «yozda 1 soat, qishda 30 daqiqa» degan an’anaviy qoida uchraydi; ba’zilarida «yozda 2, qishda 1 soat» deyiladi. Bu qoidalar ikkilamchi manbalarda keltirilgan va rasmiy tavsiya bilan mos kelmaydi. Shuning uchun bu mavzu darsda ochiq «manbalar farq qiladi» deb aytiladi.',
      'Amaliy xulosa: jgut qo‘yilgan vaqtni doim yozing, jabrlanuvchini imkon qadar tezroq tibbiy yordamga yetkazing va O‘zbekiston Sog‘liqni saqlash vazirligi yoki Qizil Yarimoy jamiyatining amaldagi qo‘llanmasiga amal qiling. O‘qituvchi darsdan oldin amaldagi rasmiy yo‘riqnomani tekshirishi tavsiya etiladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish', xatboshilar:[
      'Birinchi xato — har qanday qon ketishda darhol jgut qo‘yish. Jgut kichik jarohatlarda keraksiz va zararli; ko‘p hollarda bosish va bosuvchi bog‘lam yetarli. Ikkinchi xato — jgutni yaraning pastiga qo‘yish: qon yurakdan kelayotgan tomonda to‘xtatilishi kerak, ya’ni yuqorida.',
      'Uchinchi xato — jgutni kiyim yoki adyol bilan yopib qo‘yish va vaqtni yozmaslik. Natijada shifokor jgut borligini yoki qancha vaqt turganini bilmay qoladi. To‘rtinchi xato — qon sizib chiqqan bog‘lamni olib tashlash; to‘g‘risi — ustidan yangi bog‘lam qo‘yish.',
      'Eslab qolish usuli: «Bos — Bog‘la — Jgut» (osondan murakkabga) va jgut uchun «Yuqori — Taglik — To‘xtaguncha — Vaqt — Ochiq». Eng muhimi — o‘zingiz xavfsiz bo‘ling va tez yordamni chaqirtiring.',
      'Bilimni mustahkamlashning eng yaxshi yo‘li — muntazam mashq. Ko‘plab tashkilotlar, jumladan Qizil Yarimoy jamiyatlari, aholi uchun birinchi yordam kurslarini o‘tkazadi. Maktabda o‘rganilgan qoidalarni vaqti-vaqti bilan takrorlab turish kerak, chunki favqulodda vaziyatda odam hayajonlanadi va faqat puxta o‘zlashtirilgan harakatlarni bajara oladi. Uydagi va avtomobildagi birinchi yordam qutisi tarkibini ham muntazam tekshirib turing.'
    ]}
  ],
  qiziqarli:[
    'Rossiya FVV (MChS) tavsiyasiga ko‘ra jgut vaqt chegarasi havo haroratiga bog‘liq emas — 2 soatgacha nisbatan xavfsiz; eski «qishda 30 daqiqa» qoidasi rasmiy tavsiyaga mos kelmaydi.',
    'Qon sizib chiqqan bosuvchi bog‘lam olib tashlanmaydi — ustidan yangisi qo‘yiladi, aks holda qon laxtasi buzilishi mumkin.',
    'Jgut qo‘yilgan vaqtni ko‘pincha to‘g‘ridan to‘g‘ri jabrlanuvchining peshonasiga marker bilan yozish tavsiya qilinadi — qog‘oz yo‘qolishi mumkin.'
  ],
  lugat:[
    ['Dastlabki tibbiy yordam','Tibbiyot xodimlari kelgunga qadar ko‘rsatiladigan oddiy yordam choralari.'],
    ['Arterial qon ketish','Och qizil qonning zarb bilan otilib chiqishi; eng xavfli tur.'],
    ['Venoz qon ketish','To‘q qizil qonning bir tekis oqishi.'],
    ['Kapillyar qon ketish','Yara yuzasidan qonning sizib chiqishi.'],
    ['Bosuvchi bog‘lam','Steril salfetka ustidan zich bint o‘ramlari bilan yarani bosib turuvchi bog‘lam.'],
    ['Qon to‘xtatuvchi jgut','Qo‘l-oyoqdagi qon tomirlarini siqib qon ketishni to‘xtatuvchi vosita.'],
    ['Immobilizatsiya','Shikastlangan qo‘l-oyoqni harakatsizlantirish.'],
    ['Evakuatsiya','Jabrlanuvchini tibbiy muassasaga olib borish.'],
    ['Steril','Mikroblardan tozalangan.'],
    ['Puls','Arteriya devorining yurak urishiga mos tebranishi.']
  ],
  manba:'11-sinf «Chaqiruvga qadar boshlang‘ich tayyorgarlik» darsligi (2018), 7-bo‘lim «Tibbiy bilim asoslari» (elektron nusxada matni o‘qilmadi); Rossiya FVV (МЧС России) «Как остановить кровотечение» (mchs.gov.ru) — usullar, jgut qoidalari, 2 soat; Википедия «Кровоостанавливающий жгут» (3–5 sm, puls belgisi); MAKON manba/harbiy_mazmun.md 7-bo‘lim. [ZID]: jgut joyi 5–7 va 3–5 sm; vaqt chegarasi 2 soat va «yozda 1 soat / qishda 30 daqiqa». Qon ketish turlari tavsifi — umumiy birinchi yordam adabiyoti. Tez yordam raqami va vaqt chegarasi O‘zbekiston rasmiy yo‘riqnomasi bilan tekshirilsin.',
  ishlanma:{
    sinf:'11-sinf', vaqt:'45 daqiqa', tur:'Aralash (nazariya + amaliy mashq)', usul:'3D model, vaziyatli mashq, maneken/juftlikda ishlash',
    maqsad:{talimiy:'Qon ketish turlari, uni to‘xtatish usullari (bosish, bosuvchi bog‘lam, jgut) va jgut qo‘yish qoidalarini o‘rgatish.',
      tarbiyaviy:'Insonparvarlik, jabrlanganga yordam berishga tayyorlik, xotirjamlik va mas’uliyat.',
      rivojlantiruvchi:'Favqulodda vaziyatda tez va to‘g‘ri qaror qabul qilish, harakatlar ketma-ketligini bajarish.'},
    natijalar:['Qon ketish turlarini farqlaydi','Usullarni osondan murakkabga to‘g‘ri tartibda sanaydi','Jgut qo‘yish qoidalarini (joyi, taglik, kuch, vaqt, ochiq qoldirish) aytadi','Bosuvchi bog‘lamni manekenda yoki sherikda qo‘ya oladi'],
    jihozlar:['MAKON 3D sahnasi «Dastlabki tibbiy yordam»','Proyektor','Birinchi yordam qutisi (bint, salfetka, o‘quv jguti, qo‘lqop, marker)','Maneken (mavjud bo‘lsa)','11-sinf darsligi'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Mashq xavfsizligi: jgut faqat bo‘sh, qisqa vaqtga.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Vaziyat: «Do‘stingiz shisha bilan qo‘lini chuqur kesib oldi. Birinchi nima qilasiz?»','Fikr bildiradi.'],
      ['8–16','<b>Qon ketish turlari.</b> Arterial, venoz, kapillyar — belgilari.','Jadval to‘ldiradi.'],
      ['16–26','<b>Usullar.</b> MAKON 3D da quti tarkibi; bosish va bosuvchi bog‘lamni ko‘rsatadi.','Juftlikda bosuvchi bog‘lam qo‘yadi.'],
      ['26–36','<b>Jgut qoidalari.</b> Joyi, taglik, kuch, vaqt; manbalar farqi (MChS va an’anaviy qoida).','Manekenda yoki kiyim ustidan bo‘sh jgut qo‘yishni mashq qiladi; MAKON «tartib» mashqini bajaradi.'],
      ['36–42','<b>Mustahkamlash.</b> Test.','Test yechadi.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Bosuvchi bog‘lam','Yarani zich bosib turuvchi bog‘lam.'],['Jgut','Qon ketishni to‘xtatuvchi siquvchi vosita.'],['Arterial qon ketish','Och qizil, zarb bilan.'],['Immobilizatsiya','Harakatsizlantirish.'],['Evakuatsiya','Tibbiy muassasaga olib borish.']],
    savollar:[['Qon ketishni to‘xtatish usullarini tartib bilan ayting.','Bosish, bosuvchi bog‘lam, jgut'],['Jgut qayerga qo‘yiladi?','Yaradan yuqoriroqqa, kiyim yoki taglik ustidan'],['Jgut to‘g‘ri qo‘yilganini qanday bilamiz?','Qon to‘xtaydi yoki pastda puls yo‘qoladi'],['Nega vaqt yoziladi?','Jgutning uzoq turishi xavfli; shifokor bilishi kerak'],['Bog‘lamdan qon sizsa nima qilinadi?','Ustidan yana bog‘lam qo‘yiladi']],
    uy:'Darslikning «Tibbiy bilim asoslari» bo‘limini o‘qish; uydagi birinchi yordam qutisini tekshirib, yetishmayotgan vositalar ro‘yxatini tuzish; «Bos — Bog‘la — Jgut» eslatmasini oila a’zolariga tushuntirish.',
    manba:'11-sinf ChQBT darsligi (2018); МЧС России «Как остановить кровотечение»; Википедия «Кровоостанавливающий жгут».'
  }
},

/* ============ 9. 9 MM MAKAROV PISTOLETI (PM) ============ */
'harbiy-pm': {
  fan:'harbiy', qisqaNom:'PM', nom:'9 mm Makarov pistoleti (PM): tuzilishi va noto‘liq qismlarga ajratish',
  qisqa:'10–11-sinf · «Otish tayyorgarligi» — tanishuv va xavfsizlik darajasida',
  sahna:'glb', zaxira:null,
  model:{fayl:'pistolet_makarov', yorliq:'Makarov pistoleti · CC0 3D model · o‘quv maqsadida', sozlama:{ry:.6, rx:-.15, avto:true, zoom:1.2}},
  rejimlar:['butun','rentgen','ajrat'],
  qismlar:[
    {raqam:1, nom:'Magazin', vazifa:'8 ta patronni joylaydi; dasta asosiga kiritiladi va magazin ilgagi bilan ushlanadi.', tugun:['Magazine'], d:[0,-1.8,0]},
    {raqam:2, nom:'Zatvor (ударник, gilza chiqargich va saqlagich bilan)', vazifa:'Stvol kanalini berkitadi, patronni patronnikka yuboradi, gilzani ushlab chiqaradi; chap tomonida saqlagich joylashgan.', tugun:['Slide','Safety'], d:[1.6,1.2,0]},
    {raqam:3, nom:'Qaytaruvchi prujina', vazifa:'Stvolga kiydiriladi; orqaga surilgan zatvorni oldingi holatga qaytaradi (modelda alohida ko‘rsatilmagan).', tugun:[], d:[.8,.6,1.2]},
    {raqam:4, nom:'Ramka stvol, tepki qavsi va dasta bilan', vazifa:'Barcha qism va mexanizmlarni birlashtiradi; stvol ramkaga qo‘zg‘almas qilib biriktirilgan va o‘qning yo‘nalishli uchishini ta’minlaydi.', tugun:['Body','Barrel'], d:[0,0,0]},
    {raqam:5, nom:'Kurok (zarbdor-tepki mexanizmi)', vazifa:'Zarbdor-tepki mexanizmining qismi; ramkada joylashgan va noto‘liq ajratishda ajratilmaydi.', tugun:['Hammer'], d:[-1,.9,0]},
    {raqam:6, nom:'Tepki (спусковой крючок)', vazifa:'Zarbdor-tepki mexanizmining qismi; ramkada, tepki qavsi ichida joylashgan va noto‘liq ajratishda ajratilmaydi.', tugun:['Trigger'], d:[0,-.8,1.2]}
  ],
  kor:{
    sarlavha:'Ofitserning shaxsiy quroli',
    matn:'9 mm Makarov pistoleti (PM) — qisqa masofada dushmanni zararsizlantirish uchun mo‘ljallangan shaxsiy hujum va himoya quroli. U 1951-yilda qurollanishga qabul qilingan va konstruktori — N. F. Makarov. Pistolet o‘zi o‘qlanadigan (samozaryadnaya) qurol bo‘lib, avtomatikasi erkin zatvorning qaytishi prinsipiga asoslangan. Darsda faqat qurol tuzilishi, xavfsizlik va noto‘liq qismlarga ajratish tartibi (o‘quv maketi va 3D model) o‘rganiladi.',
    punktlar:['Kalibr — <b>9 mm</b>, patron 9×18 mm','Magazin sig‘imi — <b>8 patron</b>','O‘qning boshlang‘ich tezligi — <b>315 m/s</b>','Noto‘liq ajratish — <b>3 bosqich</b>: magazin (va patronnikni tekshirish), zatvor, qaytaruvchi prujina']
  },
  bolimlar:[
    {sarlavha:'Asosiy ko‘rsatkichlar (Nastavleniye)', jadval:[
      ['Kalibr','9 mm (4 ta nareza)'],
      ['Patron','9 mm pistolet patroni (9×18 mm)'],
      ['Magazin sig‘imi','8 patron'],
      ['Massasi (magazin bilan, patronsiz)','730 g'],
      ['Massasi (8 patronli magazin bilan)','810 g'],
      ['Uzunligi','161 mm (ruscha Vikipediyada 161,5 mm)'],
      ['Balandligi','126,75 mm'],
      ['Stvol uzunligi','93 mm (ruscha Vikipediyada 93,5 mm)'],
      ['O‘qning boshlang‘ich tezligi','315 m/s'],
      ['Eng samarali otish masofasi','50 m gacha'],
      ['O‘qning halokatli kuchi saqlanadigan masofa','350 m gacha'],
      ['Jangovar otish tezligi','30 o‘q/daq'],
      ['Qabul qilingan yili','1951']
    ], matn:'Manba: «Наставление по стрелковому делу. 9-мм пистолет Макарова» matni (de.ifmo.ru nusxasi) va ruscha Vikipediya. Uzunlik va stvol uzunligida 0,5 mm farq bor — manbalar farq qiladi.'},
    {sarlavha:'Asosiy qism va mexanizmlar', tartibli:true, punktlar:['<b>Ramka</b> stvol va tepki qavsi bilan','<b>Zatvor</b> ударник, gilza chiqargich va saqlagich bilan','<b>Qaytaruvchi prujina</b>','<b>Zarbdor-tepki mexanizmi</b> (kurok, tepki va boshqalar)','<b>Dasta</b> vint bilan','<b>Zatvor to‘xtatkichi</b> (затворная задержка)','<b>Magazin</b>'],
     matn:'Ruscha Vikipediya ma’lumotiga ko‘ra pistolet 32 detaldan iborat. Har bir pistoletga zaxira magazin, protirka, g‘ilof va pistolet tasmasi beriladi.'},
    {sarlavha:'Noto‘liq qismlarga ajratish tartibi', tartibli:true, punktlar:['<b>Magazinni</b> dasta asosidan chiqarish; so‘ng <b>patronnikda patron yo‘qligini tekshirish</b>','<b>Zatvorni</b> ramkadan ajratish (tepki qavsi pastga tortilib, chapga qiyshaytiriladi va ramkaga tiraladi; ajratilgach qavs joyiga qaytariladi)','<b>Qaytaruvchi prujinani</b> stvoldan chiqarish'],
     matn:'Yig‘ish — teskari tartibda: prujina stvolga kiydiriladi (uchidagi diametri kichikroq o‘rami bor tomoni bilan), zatvor ramkaga biriktiriladi, magazin kiritiladi. Noto‘liq ajratish tozalash, moylash va ko‘zdan kechirish uchun bajariladi; tez-tez to‘liq ajratish qismlar yeyilishini tezlashtiradi.'},
    {sarlavha:'Ajratish va yig‘ish qoidalari (Nastavleniye)', punktlar:['Stol yoki skameykada, dalada — toza to‘shama ustida bajariladi','Qismlar ajratish tartibida teriladi, ehtiyotkorlik bilan, ortiqcha kuch va keskin zarbalarsiz','Yig‘ishda qismlardagi raqamlarga e’tibor beriladi — boshqa pistolet qismlari bilan almashib ketmasligi uchun','Magazinni dastaga kiritishda kaft bilan urish mumkin emas']}
  ],
  bosqichlar:[
    {sarlavha:'Butun pistolet', matn:'Tashqi ko‘rinish: ramka dasta bilan, zatvor, tepki qavsi, magazin. Modelni aylantiring. Qurol doim xavfsiz yo‘nalishga qaratiladi.', ajrat:[]},
    {sarlavha:'1. Magazin', matn:'Magazin dasta asosidan chiqariladi va darhol patronnikda patron yo‘qligi tekshiriladi — xavfsizlikning birinchi qoidasi.', ajrat:[1], qism:1},
    {sarlavha:'2. Zatvor', matn:'Zatvor ramkadan ajratiladi. Uning chap tomonida saqlagich joylashgan; ichida ударник va gilza chiqargich bor.', ajrat:[1,2], qism:2},
    {sarlavha:'3. Qaytaruvchi prujina', matn:'Prujina stvoldan chiqariladi. Shu bilan noto‘liq ajratish tugaydi: ramka stvol bilan qoladi.', ajrat:[1,2,3], qism:3},
    {sarlavha:'Ramkadagi mexanizmlar', matn:'Kurok va tepki — zarbdor-tepki mexanizmi qismlari; ular noto‘liq ajratishda ramkadan ajratilmaydi (faqat ko‘rsatish uchun ajratilgan).', ajrat:[1,2,3,5,6], qism:5},
    {sarlavha:'Yig‘ish', matn:'Teskari tartibda: prujina → zatvor → magazin. Yig‘ishdan keyin to‘g‘riligi o‘qituvchi nazoratida tekshiriladi.', ajrat:[]}
  ],
  amaliyot:{tur:'tartib', sarlavha:'Noto‘liq ajratish va yig‘ish',
    shartAjrat:'Qismlarni <b>qo‘llanmadagi noto‘liq ajratish tartibida</b> bosing',
    shartYig:'Endi <b>yig‘ing</b>: ajratishga teskari tartibda',
    qismlar:[[1,'Magazin (keyin patronnik tekshiriladi)'],[2,'Zatvor'],[3,'Qaytaruvchi prujina']]},
  test:[
    {s:'PM pistoletining kalibri qancha?', v:['7,62 mm','9 mm','5,45 mm','5,6 mm'], t:1, izoh:'PM — <b>9 mm</b> pistolet, patron 9×18 mm.'},
    {s:'PM magazinining sig‘imi nechta patron?', v:['6','10','12','8'], t:3, izoh:'Magazin sig‘imi — <b>8 patron</b>.'},
    {s:'Noto‘liq ajratish nimadan boshlanadi?', v:['Magazinni chiqarish va patronnikni tekshirish','Zatvorni ajratish','Prujinani chiqarish','Tepki qavsini tortish'], t:0, izoh:'Avval <b>magazin chiqariladi</b>, so‘ng patronnik tekshiriladi.'},
    {s:'Zatvordan keyin qaysi qism ajratiladi?', v:['Magazin','Kurok','Qaytaruvchi prujina','Dasta'], t:2, izoh:'Tartib: magazin → zatvor → <b>qaytaruvchi prujina</b>.'},
    {s:'Saqlagich qaysi qismda joylashgan?', v:['Ramkada','Magazinda','Dastada','Zatvorda'], t:3, izoh:'Saqlagich <b>zatvorning chap tomonida</b> joylashgan.'},
    {s:'PM o‘qining boshlang‘ich tezligi?', v:['315 m/s','715 m/s','900 m/s','150 m/s'], t:0, izoh:'Nastavleniye bo‘yicha <b>315 m/s</b>.'},
    {s:'PM qachon qurollanishga qabul qilingan?', v:['1941','1974','1951','1991'], t:2, izoh:'Ruscha Vikipediya bo‘yicha <b>1951-yil</b>.'},
    {s:'Qaysi harakat qoidaga zid?', v:['Qismlarni ajratish tartibida terish','Magazinni dastaga kaft bilan urib kiritish','Ishni toza to‘shama ustida bajarish','Qismlardagi raqamlarni solishtirish'], t:1, izoh:'Nastavleniye: magazinga <b>kaft bilan urish mumkin emas</b>.'}
  ],
  xavfsizlik:[
    'Qurolni — o‘qlangan yoki o‘qlanmaganidan qat’i nazar — odamlarga qaratish <b>taqiqlanadi</b>.',
    'Qismlarga ajratishdan oldin <b>avval magazin chiqariladi, keyin patronnik tekshiriladi</b>.',
    'Maktabda mashg‘ulot faqat o‘quv maketi (MMG) yoki 3D model bilan va o‘qituvchi (ChQBT rahbari) nazoratida o‘tkaziladi.',
    'Qurol konstruksiyasiga o‘zgartirish kiritish, nosoz quroldan foydalanish va o‘q-dori bilan ishlash taqiqlanadi.',
    'Qurol va o‘q-dori topilsa — tegmang, joyni tark eting va kattalar yoki huquqni muhofaza qilish organlariga xabar bering.'
  ],
  yordamchi:[
    {s:'Zatvor nima qiladi?', j:'Zatvor stvol kanalini berkitadi, patronni patronnikka yuboradi va gilzani ushlab chiqaradi. PM da zatvor ichida ударник va gilza chiqargich, chap tomonida saqlagich bor.', kalit:['zatvor']},
    {s:'Nega avval magazin chiqariladi?', j:'Magazin turgan holda zatvor harakatlansa, patron patronnikka tushishi mumkin. Shuning uchun Nastavleniye bo‘yicha birinchi navbatda magazin chiqariladi va patronnik bo‘shligi tekshiriladi.', kalit:['magazin','nega','avval']}
  ],
  maqola:[
    {sarlavha:'Kirish: PM qanday qurol?', xatboshilar:[
      '9 mm Makarov pistoleti (PM) — Sovet Ittifoqida yaratilgan va 1951-yilda qurollanishga qabul qilingan shaxsiy qurol. Uning konstruktori — Nikolay Fyodorovich Makarov. Pistolet uzoq yillar davomida ofitserlar, huquqni muhofaza qilish organlari xodimlari va harbiy xizmatchilarning shaxsiy quroli bo‘lib keldi va MDH mamlakatlarida hozir ham keng tarqalgan.',
      'Nastavleniyega ko‘ra PM qisqa masofada dushmanni zararsizlantirish uchun mo‘ljallangan shaxsiy hujum va himoya quroli. U tuzilishi va ishlatilishi jihatidan sodda, o‘lchami kichik, olib yurishga qulay. Pistolet o‘zi o‘qlanadigan qurol hisoblanadi: har bir o‘q uzilgandan keyin qayta o‘qlanish avtomatik bajariladi.',
      'Bu darsda PM ning vazifasi, asosiy ko‘rsatkichlari, asosiy qism va mexanizmlari, noto‘liq qismlarga ajratish va yig‘ish tartibi hamda xavfsizlik qoidalari o‘rganiladi. Darsda faqat o‘quv maketi va 3D model ishlatiladi; o‘q otish bo‘yicha mashg‘ulotlar bu darsning mavzusi emas.',
      'O‘zbekiston ta’lim muassasalarida ChQBT fani doirasida o‘quvchilar asosan Kalashnikov avtomati, qo‘l granatalari va boshqa qurollar bilan tanishadi. Makarov pistoleti bo‘yicha bu dars qo‘shimcha tanishuv materiali sifatida tayyorlangan; unda keltirilgan ma’lumotlar rasmiy qo‘llanma — «Наставление по стрелковому делу» matniga asoslangan. O‘qituvchi uni amaldagi o‘quv dasturi va darslik bilan solishtirib foydalanishi tavsiya etiladi.'
    ]},
    {sarlavha:'Asosiy ko‘rsatkichlar', xatboshilar:[
      'PM kalibri — 9 mm, stvol kanalida 4 ta nareza bor. Unda 9 mm pistolet patroni (9×18 mm) ishlatiladi. Nastavleniyega ko‘ra patron massasi 10 g, o‘q massasi 6,1 g, patron uzunligi 25 mm. Magazinga 8 ta patron sig‘adi.',
      'Pistoletning magazin bilan, patronsiz massasi 730 g, sakkiz patronli magazin bilan esa 810 g. Nastavleniyeda uzunligi 161 mm, balandligi 126,75 mm, stvol uzunligi 93 mm deb berilgan. Ruscha Vikipediyada uzunlik 161,5 mm, stvol uzunligi 93,5 mm deb ko‘rsatilgan — bu kichik farqni «manbalar farq qiladi» deb eslab qolish kifoya.',
      'O‘qning boshlang‘ich tezligi 315 m/s. Nastavleniyega ko‘ra otish 50 m gacha bo‘lgan masofada eng samarali, o‘qning halokatli kuchi esa 350 m gacha saqlanadi. Jangovar otish tezligi — daqiqasiga 30 o‘q. Taqqoslash uchun: AK-74 o‘qining boshlang‘ich tezligi 900 m/s — pistolet qisqa masofa quroli ekanini shu raqamlar ham ko‘rsatadi.'
    ]},
    {sarlavha:'Asosiy qism va mexanizmlar', xatboshilar:[
      'Nastavleniyega ko‘ra pistolet quyidagi asosiy qism va mexanizmlardan iborat: stvol va tepki qavsi bilan ramka; ударник, gilza chiqargich va saqlagich bilan zatvor; qaytaruvchi prujina; zarbdor-tepki mexanizmi; vint bilan dasta; zatvor to‘xtatkichi; magazin. Ruscha Vikipediyada pistolet jami 32 detaldan iborat ekani aytiladi.',
      'Ramka barcha qism va mexanizmlarni birlashtiradi, stvol unga qo‘zg‘almas qilib biriktirilgan. Zatvor stvol ustiga kiydirilgan bo‘lib, stvol kanalini berkitadi, patronni patronnikka yuboradi va gilzani ushlab chiqaradi. Qaytaruvchi prujina stvolga kiydiriladi va orqaga surilgan zatvorni oldingi holatga qaytaradi.',
      'Saqlagich zatvorning chap tomonida joylashgan va qurol bilan xavfsiz muomalani ta’minlaydi. Zatvor to‘xtatkichi magazindagi patronlar tugaganda zatvorni orqa holatda ushlab qoladi. Har bir pistoletga zaxira magazin, protirka, g‘ilof va pistolet tasmasi beriladi.',
      'Qism nomlarini o‘rganishda ruscha va o‘zbekcha atamalarni solishtirish foydali, chunki ko‘plab qo‘llanmalar rus tilida: «рамка» — ramka, «затвор» — zatvor, «возвратная пружина» — qaytaruvchi prujina, «предохранитель» — saqlagich, «затворная задержка» — zatvor to‘xtatkichi, «магазин» — magazin, «спусковой крючок» — tepki. 3D modelda magazin, zatvor, kurok, tepki va saqlagich alohida qismlar sifatida ko‘rsatilgan, qaytaruvchi prujina esa modelda yo‘q.'
    ]},
    {sarlavha:'Noto‘liq qismlarga ajratish va yig‘ish', xatboshilar:[
      'Pistoletni qismlarga ajratish noto‘liq va to‘liq bo‘ladi. Noto‘liq ajratish tozalash, moylash va ko‘zdan kechirish uchun bajariladi. To‘liq ajratish kuchli ifloslanganda, qor yoki yomg‘ir ostida qolgandan keyin, yangi moyga o‘tishda va ta’mirlashda qilinadi; uni tez-tez bajarish qismlar yeyilishini tezlashtiradi.',
      'Nastavleniyega ko‘ra noto‘liq ajratish uch bosqichda bajariladi. Birinchi bosqich — magazinni dasta asosidan chiqarish va patronnikda patron yo‘qligini tekshirish. Ikkinchi bosqich — zatvorni ramkadan ajratish: tepki qavsi pastga tortilib chapga qiyshaytiriladi, zatvor ajratilgach qavs yana joyiga qaytariladi. Uchinchi bosqich — qaytaruvchi prujinani stvoldan chiqarish.',
      'Yig‘ish teskari tartibda bajariladi: avval qaytaruvchi prujina stvolga uchidagi o‘rami kichikroq diametrli tomoni bilan kiydiriladi, keyin zatvor ramkaga biriktiriladi, oxirida magazin dasta asosiga kiritiladi. Magazinni kiritishda kaft bilan urish mumkin emas. Yig‘ilgandan keyin pistoletning to‘g‘ri yig‘ilganini o‘qituvchi tekshiradi.',
      'Noto‘liq ajratishdan so‘ng qismlar ko‘zdan kechiriladi: ifloslanish, zang, yoriq yoki boshqa nosozlik bor-yo‘qligi tekshiriladi. Tozalash va moylash qo‘llanmadagi tartibga muvofiq, faqat belgilangan vositalar bilan bajariladi. O‘quv maketida bu bosqichlar ketma-ketlikni o‘rganish uchun mashq qilinadi. Maqsad — tezlik emas, avvalo har bir harakatning to‘g‘ri va xavfsiz bajarilishi; tezlik keyinchalik mashq bilan keladi.'
    ]},
    {sarlavha:'Ajratish-yig‘ish qoidalari va xavfsizlik', xatboshilar:[
      'Nastavleniyeda ajratish va yig‘ishning umumiy qoidalari belgilangan: ish stol yoki skameykada, dalada esa toza to‘shama ustida bajariladi; qismlar ajratish tartibida teriladi; ular bilan ehtiyotkorlik bilan muomala qilinadi, ortiqcha kuch va keskin zarbalarga yo‘l qo‘yilmaydi. Yig‘ishda qismlardagi raqamlarga e’tibor beriladi — boshqa pistolet qismlari bilan almashib ketmasligi uchun.',
      'Eng muhim xavfsizlik qoidasi — qurolni hech qachon, hatto o‘qlanmagan deb hisoblasangiz ham, odamlarga qaratmaslik. Har qanday ajratish magazinni chiqarish va patronnikni tekshirishdan boshlanadi. Maktabda bu mashg‘ulotlar faqat massa-gabarit maketi yoki 3D model bilan, ChQBT rahbari nazoratida o‘tkaziladi.',
      'Hayotda qurol yoki o‘q-dori topib olsangiz, unga tegmang, ko‘tarmang va boshqalarni yaqinlashtirmang. Joyni tark eting va kattalar yoki huquqni muhofaza qilish organlariga xabar bering. Qurolni noqonuniy saqlash va olib yurish qonun bilan taqiqlangan.',
      'ChQBT mashg‘ulotlarida qurol bilan ishlash har doim rahbar komandasi bilan boshlanadi va tugaydi. O‘quvchi komandasiz maketni qo‘liga olmaydi, boshqa o‘quvchiga uzatganda esa uni xavfsiz yo‘nalishga qaratib, dasta tomoni bilan beradi. Bu odatlar maketda shakllantiriladi, chunki keyinchalik harbiy xizmatda haqiqiy qurol bilan ham aynan shu qoidalar amal qiladi. Intizom — qurol bilan xavfsiz muomalaning asosi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar va eslab qolish', xatboshilar:[
      'Birinchi xato — magazinni chiqarmasdan yoki patronnikni tekshirmasdan ajratishni boshlash. Bu eng qo‘pol xavfsizlik xatosi hisoblanadi. Ikkinchi xato — ajratilgan qismlarni tartibsiz tashlab qo‘yish: yig‘ishda qism yo‘qolishi yoki boshqa pistolet qismi bilan almashishi mumkin.',
      'Uchinchi xato — qaytaruvchi prujinani stvolga noto‘g‘ri tomoni bilan kiydirish. Nastavleniye prujinani uchidagi o‘rami kichikroq diametrli tomoni bilan kiydirishni talab qiladi. To‘rtinchi xato — magazinni kaft bilan urib kiritish; bu qoidaga zid.',
      'Eslab qolish usuli: PM ajratish — «uch M»ga o‘xshash qisqa zanjir: <b>Magazin → (patronnik tekshiruvi) → zatvor → prujina</b>; yig‘ish — teskari. Raqamlar uchun: «9 mm, 8 patron, 315 m/s, 1951».'
    ]}
  ],
  qiziqarli:[
    'PM 1951-yilda qurollanishga qabul qilingan; konstruktori — Nikolay Makarov.',
    'Ruscha Vikipediya ma’lumotiga ko‘ra pistolet atigi 32 detaldan iborat — soddaligi uning uzoq xizmat qilishining sabablaridan biri.',
    'PM ning noto‘liq ajratilishi atigi uch bosqichdan iborat: magazin, zatvor, qaytaruvchi prujina.',
    'Nastavleniye qaytaruvchi prujinani qaysi uchi bilan kiydirishni ham belgilab beradi — uchidagi o‘rami kichikroq diametrli tomoni bilan.'
  ],
  lugat:[
    ['Kalibr','Stvol kanalining qarama-qarshi maydonlari orasidagi masofa; PM da 9 mm.'],
    ['Patronnik','Stvolning orqa qismidagi patron joylashadigan bo‘shliq.'],
    ['Ramka','Pistoletning barcha qism va mexanizmlarini birlashtiruvchi asosiy qismi; stvol unga biriktirilgan.'],
    ['Zatvor','Stvol kanalini berkituvchi, patronni yuboruvchi va gilzani chiqaruvchi qism.'],
    ['Qaytaruvchi prujina','Zatvorni oldingi holatga qaytaruvchi prujina.'],
    ['Saqlagich','Qurol bilan xavfsiz muomalani ta’minlovchi moslama; PM da zatvorning chap tomonida.'],
    ['Zarbdor-tepki mexanizmi','Kurok, tepki va boshqa qismlardan iborat mexanizm.'],
    ['Zatvor to‘xtatkichi','Patronlar tugaganda zatvorni orqa holatda ushlab qoluvchi qism.'],
    ['Magazin','Patronlarni joylovchi va uzatuvchi qism; PM da 8 patron.'],
    ['O‘zi o‘qlanadigan qurol','Har o‘qdan keyin qayta o‘qlanish avtomatik bajariladigan qurol.'],
    ['Noto‘liq qismlarga ajratish','Tozalash, moylash va ko‘zdan kechirish uchun asosiy qismlarni ajratish.'],
    ['MMG','Massa-gabarit maketi — o‘quv mashg‘uloti uchun otishga yaroqsiz nusxa.']
  ],
  manba:'«Наставление по стрелковому делу. 9-мм пистолет Макарова (ПМ)» — de.ifmo.ru/--books/0040/ nusxasi (pm01 «Общие сведения», pm02 «Назначение и боевые свойства», pm03 «Общее устройство», pm04 «Разборка и сборка»); Википедия «Пистолет Макарова» (1951-yil, 32 detal, 161,5 va 93,5 mm). O‘zbekiston ChQBT darsligida PM bo‘limi bu ishda tekshirilmadi. 3D model — CC0.',
  ishlanma:{
    sinf:'10–11-sinf', vaqt:'45 daqiqa', tur:'Aralash (yangi bilim + amaliy mashg‘ulot)', usul:'3D model, massa-gabarit maketi, juftlikda ishlash',
    maqsad:{talimiy:'PM ning vazifasi, asosiy ko‘rsatkichlari, asosiy qism va mexanizmlari, noto‘liq qismlarga ajratish va yig‘ish tartibini o‘rgatish.',
      tarbiyaviy:'Qurolga ehtiyotkor munosabat, intizom, xavfsizlik qoidalariga so‘zsiz rioya qilish.',
      rivojlantiruvchi:'Ketma-ketlikni eslab qolish, qo‘l harakatlari aniqligi, diqqatlilik.'},
    natijalar:['PM ning kalibri (9 mm), magazin sig‘imi (8), o‘q boshlang‘ich tezligi (315 m/s) ni aytadi','7 ta asosiy qism va mexanizmni nomlaydi','Noto‘liq ajratish tartibini (magazin va patronnik tekshiruvi, zatvor, prujina) to‘g‘ri bajaradi','Ajratish-yig‘ish va xavfsizlik qoidalarini aytadi'],
    jihozlar:['MAKON 3D sahnasi «Makarov pistoleti»','Proyektor','PM massa-gabarit maketi (mavjud bo‘lsa), taglik to‘shama','Qismlar nomi yozilgan kartochkalar','«Nastavleniye» ko‘chirmasi (o‘qituvchi uchun)'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Xavfsizlik yo‘riqnomasi: maketni odamga qaratmaslik.','Tinglaydi.'],
      ['3–8','<b>Takrorlash.</b> AK-74 ajratish tartibi bo‘yicha 3 ta savol.','Javob beradi.'],
      ['8–16','<b>Vazifa va ko‘rsatkichlar.</b> MAKON 3D da pistoletni ko‘rsatadi; jadvalni tushuntiradi; manbalar farqini aytadi.','Jadvalni daftarga yozadi.'],
      ['16–24','<b>Asosiy qismlar.</b> «Ajratish» rejimida qismlar nomi va vazifasi.','Kartochkalarni qismlar bilan moslashtiradi.'],
      ['24–36','<b>Amaliy mashg‘ulot.</b> Maketda noto‘liq ajratish va yig‘ishni sekin ko‘rsatadi, juftlarga beradi, xatolarni tuzatadi.','Juftlikda navbat bilan ajratib-yig‘adi; MAKON «tartib» mashqini bajaradi.'],
      ['36–43','<b>Mustahkamlash.</b> Nazorat savollari va test.','Test yechadi.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Zatvor','Stvol kanalini berkituvchi qism.'],['Ramka','Barcha qismlarni birlashtiruvchi asos.'],['Qaytaruvchi prujina','Zatvorni oldinga qaytaradi.'],['Saqlagich','Xavfsiz muomalani ta’minlaydi.'],['Patronnik','Patron joylashadigan bo‘shliq.']],
    savollar:[['PM kalibri?','9 mm'],['Magazin sig‘imi?','8 patron'],['Noto‘liq ajratish tartibi?','Magazin (patronnikni tekshirish), zatvor, qaytaruvchi prujina'],['Saqlagich qayerda?','Zatvorning chap tomonida'],['Yig‘ish qaysi qismdan boshlanadi?','Qaytaruvchi prujinani stvolga kiydirishdan']],
    uy:'PM asosiy qism va mexanizmlari jadvalini (nomi — vazifasi) tuzish; noto‘liq ajratish va yig‘ish tartibini yoddan yozish; MAKON da «tartib» mashqini 3 marta bajarish.',
    manba:'«Наставление по стрелковому делу. 9-мм пистолет Макарова»; Википедия «Пистолет Макарова».'
  }
}
});
})();
