/* MAKON — yangi fanlar: Geometriya (yangi fan) va Geografiya (ochiladi). 4 dars.
   darslar.js dan KEYIN yuklanadi. Sahna turlari: geometriya, yer, fasllar.
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi. */
(function(){
const FAN = window.MAKON_FAN;
if(!FAN || !window.MAKON_DARS) return;

/* ---------- Geometriya: yangi fan (astronomiyadan keyin, yopiq fanlardan oldin) ---------- */
if(!FAN.find(f=>f.id==='geometriya')){
  const geom = {id:'geometriya', nom:'Geometriya', rang:'#f28c38', ik:'kub', izoh:'Fazoviy jismlar: ko‘pyoqlar va aylanish jismlari',
    tavsif:'Stereometriya 3D da: jismni aylantiring, o‘lchamlarini slayder bilan o‘zgartiring va hajm hamda sirt formulalari qanday ishlashini o‘z ko‘zingiz bilan ko‘ring.',
    mavzular:[
      {nom:'Ko‘pyoqlar: prizma, piramida, Eyler formulasi', dars:'geometriya-kopyoqlar', qisqa:'Kub, parallelepiped, prizma, piramida, tetraedr — U, Q, Y, hajm va sirt'},
      {nom:'Aylanish jismlari: silindr, konus, shar', dars:'geometriya-aylanish', qisqa:'Hajm va sirt formulalari, Arximed natijasi'},
      {nom:'Jismlarning kesimlari', qisqa:'Keyingi bosqich'},
      {nom:'Muntazam ko‘pyoqlar (Platon jismlari)', qisqa:'Keyingi bosqich'}
    ]};
  const ai = FAN.findIndex(f=>f.id==='astronomiya');
  const yi = FAN.findIndex(f=>f.yopiq);
  let joy = ai>=0 ? ai+1 : FAN.length;
  if(yi>=0 && yi<joy) joy = yi;
  FAN.splice(joy, 0, geom);
}

/* ---------- Geografiya: ochiladi ---------- */
const geo = FAN.find(f=>f.id==='geografiya');
if(geo){
  geo.yopiq = false;
  geo.izoh = 'Yerning ichki tuzilishi, yil fasllari, relyef';
  geo.tavsif = 'Yerni ichidan va kosmosdan ko‘ring: kesilgan 3D modelda qatlamlarni bosing, Quyosh atrofidagi harakatda fasllar nima uchun almashishini kuzating.';
  geo.mavzular = [
    {nom:'Yerning ichki tuzilishi', dars:'geo-yer-tuzilishi', qisqa:'Po‘st, mantiya, tashqi va ichki yadro; seysmik to‘lqinlar'},
    {nom:'Yil fasllari', dars:'geo-fasllar', qisqa:'O‘q qiyaligi, quyosh turishi, kun-tun tengligi; Toshkent misolida'},
    {nom:'Relyef va tog‘ hosil bo‘lishi', qisqa:'Keyingi bosqich'},
    {nom:'Iqlim mintaqalari', qisqa:'Keyingi bosqich'}
  ];
  const gi = FAN.indexOf(geo), yi = FAN.findIndex(f=>f.yopiq);
  if(yi>=0 && gi>yi){ FAN.splice(gi,1); FAN.splice(yi,0,geo); }
}

const GD = '10–11-sinf «Geometriya» darsligi (O‘zbekiston, amaldagi nashr) — «Ko‘pyoqlar», «Aylanish jismlari» boblari';
const GW = 'Wikipedia (inglizcha): «Polyhedron», «Euler characteristic», «Prism (geometry)», «Pyramid (geometry)», «Tetrahedron», «Platonic solid»';
const GEO5 = '5-sinf «Geografiya» (tabiiy geografiya boshlang‘ich kursi) darsligi (O‘zbekiston, amaldagi nashr)';

Object.assign(window.MAKON_DARS, {

/* ============ 1. KO‘PYOQLAR ============ */
'geometriya-kopyoqlar': {
  fan:'geometriya', qisqaNom:'Ko‘pyoqlar', nom:'Ko‘pyoqlar: prizma, piramida va Eyler formulasi',
  qisqa:'10–11-sinf · stereometriya · «Ko‘pyoqlar» bobi',
  sahna:'geometriya', geo:{shakllar:['kub','parallelepiped','prizma3','piramida4','tetraedr']},
  kor:{
    sarlavha:'Tekis yoqlardan qurilgan jismlar',
    matn:'Ko‘pyoq — sirti tekis ko‘pburchaklardan (yoqlardan) iborat fazoviy jism. Yoqlar tutashgan kesmalar qirralar, qirralar uchrashgan nuqtalar uchlar deyiladi. Har qanday qavariq ko‘pyoqda uchlar, qirralar va yoqlar soni Eyler formulasi bilan bog‘langan: U − Q + Y = 2. Jismni tanlang, o‘lchamlarini slayder bilan o‘zgartiring va hajm hamda sirt qanday o‘zgarishini kuzating.',
    punktlar:['<b>Prizma</b> — ikki teng parallel asos + yon yoqlar: kub, parallelepiped, uchburchakli prizma','<b>Piramida</b> — bitta asos + uchi umumiy uchburchak yon yoqlar','<b>Eyler formulasi:</b> U − Q + Y = 2 (qavariq ko‘pyoqlar uchun)','Prizma hajmi <b>V = S·h</b>, piramida hajmi <b>V = S·h / 3</b>']
  },
  bolimlar:[
    {sarlavha:'Beshta ko‘pyoq: uchlar, qirralar, yoqlar', jadval:[
      ['Kub','U = 8 · Q = 12 · Y = 6 · 8 − 12 + 6 = 2'],
      ['To‘g‘ri burchakli parallelepiped','U = 8 · Q = 12 · Y = 6 · 8 − 12 + 6 = 2'],
      ['Uchburchakli prizma','U = 6 · Q = 9 · Y = 5 · 6 − 9 + 5 = 2'],
      ['To‘rtburchakli piramida','U = 5 · Q = 8 · Y = 5 · 5 − 8 + 5 = 2'],
      ['Tetraedr (uchburchakli piramida)','U = 4 · Q = 6 · Y = 4 · 4 − 6 + 4 = 2'],
      ['n-burchakli prizma','U = 2n · Q = 3n · Y = n + 2'],
      ['n-burchakli piramida','U = n + 1 · Q = 2n · Y = n + 1']
    ], matn:'Oxirgi ikki qatordagi umumiy formulalar ham Eyler formulasini qanoatlantiradi: prizmada 2n − 3n + (n + 2) = 2, piramidada (n + 1) − 2n + (n + 1) = 2.'},
    {sarlavha:'Hajm va to‘la sirt formulalari', jadval:[
      ['Kub (qirrasi a)','V = a³ · S = 6a²'],
      ['Parallelepiped (a, b, h)','V = abh · S = 2(ab + bh + ah)'],
      ['Muntazam uchburchakli prizma (asos tomoni a, balandlik h)','V = (√3/4)a²h · S = (√3/2)a² + 3ah'],
      ['Muntazam to‘rtburchakli piramida (a, h)','V = a²h/3 · S = a² + 2al, bu yerda l = √(h² + a²/4)'],
      ['Muntazam tetraedr (qirrasi a)','V = a³√2/12 · S = √3·a²'],
      ['Istalgan prizma','V = S_asos · h'],
      ['Istalgan piramida','V = S_asos · h / 3']
    ], matn:'To‘la sirt = yon sirt + asoslar yuzi. Prizmada ikkita, piramidada bitta asos bor.'},
    {sarlavha:'Namunaviy hisob', jadval:[['Kub, a = 3','V = 27 · S = 54'],['Kub, a = 4','V = 64 · S = 96'],['Parallelepiped 2 × 3 × 4','V = 24 · S = 52 · d = √29 ≈ 5,39'],['Piramida, a = 6, h = 4','l = 5 · V = 48 · S = 96'],['Tetraedr, a = 2','V = 2√2/3 ≈ 0,94 · S = 4√3 ≈ 6,93']]},
    {sarlavha:'Ko‘pyoqlar hayotda', jadval:[['Kub va parallelepiped','G‘isht, quti, xona, shkaf'],['Uchburchakli prizma','Optik prizma, chodir, tom qiyaligi'],['To‘rtburchakli piramida','Misr piramidalari, tom konstruksiyasi'],['Tetraedr','Metan molekulasi shakli, ba’zi qadoqlar'],['Kub kristallari','Osh tuzi kristall panjarasi']]}
  ],
  bosqichlar:[
    {sarlavha:'Kub — elementlar bilan tanishuv', matn:'Kubning 8 uchi, 12 qirrasi va 6 yog‘ini sanang. Har bir uchda 3 ta qirra uchrashadi. Hajm V = a³, sirt S = 6a²: a ni 1 dan 2 ga oshirsangiz, hajm 8 marta ortadi.', shakl:'kub'},
    {sarlavha:'Parallelepiped — uch o‘lcham', matn:'Uzunlik a, eni b va balandlik h har xil bo‘lishi mumkin. Hajm V = abh. To‘la sirt uch juft teng to‘g‘ri to‘rtburchak yuzlari yig‘indisi: S = 2(ab + bh + ah).', shakl:'parallelepiped'},
    {sarlavha:'Uchburchakli prizma', matn:'Ikki asos — teng uchburchaklar, 3 ta yon yoq. U = 6, Q = 9, Y = 5. Har qanday prizma hajmi asos yuzi bilan balandlik ko‘paytmasiga teng.', shakl:'prizma3'},
    {sarlavha:'To‘rtburchakli piramida', matn:'Kvadrat asos va to‘rtta uchburchak yon yoq. Piramida hajmi asosi va balandligi bir xil prizma hajmining uchdan biriga teng: V = a²h/3.', shakl:'piramida4'},
    {sarlavha:'Tetraedr — eng kam yoqli ko‘pyoq', matn:'4 ta uch, 6 ta qirra, 4 ta uchburchak yoq. Muntazam tetraedrda barcha qirralar teng; u beshta Platon jismidan biri.', shakl:'tetraedr'},
    {sarlavha:'Eyler formulasini tekshiring', matn:'Har bir jism uchun U − Q + Y ni hisoblang: kubda 8 − 12 + 6, prizmada 6 − 9 + 5, piramidada 5 − 8 + 5. Natija doim 2 — bu qavariq ko‘pyoqlarning umumiy xossasi.', shakl:'kub'}
  ],
  amaliyot:{tur:'shart', sarlavha:'O‘lchamlarni sozlang',
    topshiriqlar:[
      {shart:'<b>Kub</b>ni tanlang va hajmi <b>27</b> bo‘lsin.', hodisa:'geometriya', kod:"ev.shakl==='kub' && ev.a===3", izoh:'To‘g‘ri! V = a³ = 3³ = 27. To‘la sirt esa S = 6·9 = 54.'},
      {shart:'<b>Kub</b>ning to‘la sirti <b>150</b> bo‘lsin.', hodisa:'geometriya', kod:"ev.shakl==='kub' && Math.abs(ev.S-150)<0.01", izoh:'To‘g‘ri! S = 6a² = 150, demak a² = 25, a = 5.'},
      {shart:'<b>Parallelepiped</b> hajmi <b>24</b> bo‘lsin (masalan, 2 × 3 × 4).', hodisa:'geometriya', kod:"ev.shakl==='parallelepiped' && Math.abs(ev.V-24)<0.01", izoh:'To‘g‘ri! V = abh = 24. Buni 2·3·4, 1·4·6, 2·2·6 kabi bir necha usulda olish mumkin.'},
      {shart:'<b>To‘rtburchakli piramida</b>da asos tomoni <b>a = 6</b>, balandligi <b>h = 4</b> bo‘lsin. Hajm nechaga teng bo‘ladi?', hodisa:'geometriya', kod:"ev.shakl==='piramida4' && ev.a===6 && ev.h===4", izoh:'To‘g‘ri! V = a²h/3 = 36·4/3 = 48. Apofema l = √(16 + 9) = 5, sirt S = 36 + 2·6·5 = 96.'}
    ]},
  test:[
    {s:'Kubning nechta qirrasi bor?', v:['6','8','12','24'], t:2, izoh:'Kubda <b>12 ta qirra</b>, 8 ta uch va 6 ta yoq.'},
    {s:'Eyler formulasi qaysi?', v:['U + Q + Y = 2','U − Q + Y = 2','U + Q − Y = 2','U − Q − Y = 2'], t:1, izoh:'Qavariq ko‘pyoq uchun <b>U − Q + Y = 2</b>.'},
    {s:'Qirrasi 4 bo‘lgan kubning hajmi?', v:['16','48','64','96'], t:2, izoh:'V = a³ = <b>64</b>. (96 — bu to‘la sirt.)'},
    {s:'O‘lchamlari 2, 3 va 4 bo‘lgan to‘g‘ri burchakli parallelepipedning to‘la sirti?', v:['24','26','52','48'], t:2, izoh:'S = 2(6 + 12 + 8) = <b>52</b>.'},
    {s:'Uchburchakli prizmaning uchlar, qirralar va yoqlar soni?', v:['6, 9, 5','6, 8, 5','5, 9, 6','4, 6, 4'], t:0, izoh:'U = 6, Q = 9, Y = 5; tekshiruv: 6 − 9 + 5 = <b>2</b>.'},
    {s:'Piramida hajmi asosi va balandligi bir xil prizma hajmining qancha qismiga teng?', v:['1/2','1/3','2/3','1/4'], t:1, izoh:'V_piramida = S·h/3 — <b>uchdan biri</b>.'},
    {s:'Qavariq ko‘pyoqda 12 ta uch va 20 ta yoq bor. Qirralari nechta?', v:['30','32','28','34'], t:0, izoh:'Q = U + Y − 2 = 12 + 20 − 2 = <b>30</b> (ikosaedr).'},
    {s:'Muntazam to‘rtburchakli piramidada a = 6, h = 4. Apofema l = ?', v:['4','5','6','√52'], t:1, izoh:'l = √(h² + (a/2)²) = √(16 + 9) = <b>5</b>.'}
  ],
  yordamchi:[
    {s:'Apofema nima?', j:'Muntazam piramida yon yog‘ining uchidan asos tomoniga tushirilgan balandligi. To‘rtburchakli muntazam piramidada l = √(h² + (a/2)²).', kalit:['apofema']},
    {s:'Eyler formulasi hamma jismga to‘g‘rimi?', j:'U − Q + Y = 2 qavariq ko‘pyoqlar (va ularga topologik ekvivalent ko‘pyoqlar) uchun to‘g‘ri. Masalan, o‘rtasidan «teshik» o‘tgan ko‘pyoqda natija 0 bo‘ladi. Silindr, konus, shar ko‘pyoq emas.', kalit:['eyler','formula']}
  ],
  maqola:[
    {sarlavha:'Kirish: ko‘pyoq nima?', xatboshilar:[
      'Planimetriyada biz tekislikdagi shakllarni — uchburchak, to‘rtburchak, doirani o‘rgandik. Stereometriya esa fazodagi jismlarni o‘rganadi. Fazoviy jismlarning eng muhim sinflaridan biri ko‘pyoqlardir. Ko‘pyoq — sirti chekli sondagi tekis ko‘pburchaklardan tashkil topgan jism. Bu ko‘pburchaklar ko‘pyoqning yoqlari deyiladi.',
      'Ikki qo‘shni yoqning umumiy tomoni qirra, qirralarning uchlari esa ko‘pyoqning uchlari deb ataladi. Bir yoqqa tegishli bo‘lmagan ikki uchni tutashtiruvchi kesma diagonal deyiladi. Agar ko‘pyoq har bir yog‘i yotgan tekislikning bir tomonida joylashsa, u qavariq ko‘pyoq deyiladi. Maktab kursida asosan qavariq ko‘pyoqlar o‘rganiladi.',
      'Kundalik hayotda ko‘pyoqlar har qadamda uchraydi: g‘isht va quti — parallelepiped, chodir — prizma, tom — piramida shaklida. Arxitektor, muhandis va dizayner jismning hajmi va sirtini hisoblamasdan ish boshlay olmaydi: qancha beton, qancha bo‘yoq, qancha qadoq materiali kerakligi aynan shu formulalar bilan topiladi.',
      'Bu darsda beshta jismni ko‘rib chiqamiz: kub, to‘g‘ri burchakli parallelepiped, uchburchakli prizma, to‘rtburchakli piramida va tetraedr. Har biri uchun avval elementlarni sanaymiz, so‘ng hajm va to‘la sirt formulalarini chiqaramiz. 3D sahnada jismni aylantirib, orqa tomondagi yashirin qirralarni ham ko‘rish mumkin — qog‘ozdagi chizmada aynan shu qirralar ko‘pincha xatoga sabab bo‘ladi.'
    ]},
    {sarlavha:'Prizma va parallelepiped', xatboshilar:[
      'Prizma — ikki yog‘i parallel tekisliklarda yotgan teng n-burchaklar, qolgan n ta yog‘i esa parallelogrammlar bo‘lgan ko‘pyoq. Teng n-burchaklar prizmaning asoslari, parallelogrammlar yon yoqlari deyiladi. Yon qirralari asosga perpendikulyar bo‘lsa, prizma to‘g‘ri prizma deyiladi va uning yon yoqlari to‘g‘ri to‘rtburchak bo‘ladi. Asosi muntazam ko‘pburchak bo‘lgan to‘g‘ri prizma muntazam prizma deyiladi.',
      'Asosi parallelogramm bo‘lgan prizma parallelepiped deyiladi. Uning barcha oltita yog‘i parallelogramm. Agar parallelepiped to‘g‘ri bo‘lsa va asosi to‘g‘ri to‘rtburchak bo‘lsa, u to‘g‘ri burchakli parallelepiped deyiladi. Uning uchta o‘lchami — uzunlik, en va balandlik bor. Barcha o‘lchamlari teng to‘g‘ri burchakli parallelepiped kubdir.',
      'n-burchakli prizmada 2n ta uch, 3n ta qirra (asoslarda 2n, yon tomonda n) va n + 2 ta yoq bor. Masalan, uchburchakli prizmada 6 ta uch, 9 ta qirra va 5 ta yoq. To‘g‘ri burchakli parallelepipedning diagonali uch o‘lchami orqali fazoviy Pifagor teoremasi bilan topiladi: d² = a² + b² + h².'
    ]},
    {sarlavha:'Piramida va tetraedr', xatboshilar:[
      'Piramida — bitta yog‘i ixtiyoriy n-burchak (asos), qolgan n ta yog‘i esa bitta umumiy uchga ega uchburchaklar bo‘lgan ko‘pyoq. Piramida uchidan asos tekisligiga tushirilgan perpendikulyar uning balandligi deyiladi. Asosi muntazam ko‘pburchak bo‘lib, balandlik asosning markaziga tushsa, piramida muntazam piramida deyiladi. Muntazam piramida yon yog‘ining balandligi apofema deb ataladi.',
      'n-burchakli piramidada n + 1 ta uch, 2n ta qirra va n + 1 ta yoq bor. To‘rtburchakli piramidada 5 ta uch, 8 ta qirra, 5 ta yoq. Uchburchakli piramida tetraedr deyiladi: unda 4 ta uch, 6 ta qirra va 4 ta yoq bor. Tetraedrning qiziq xossasi — istalgan yog‘ini asos deb olish mumkin.',
      'Barcha qirralari teng tetraedr muntazam tetraedr deyiladi. Uning hajmi V = a³√2/12, to‘la sirti S = √3·a². Kimyoda metan molekulasi tetraedr shaklida: uglerod markazda, to‘rt vodorod uchlarda joylashgan.'
    ]},
    {sarlavha:'Eyler formulasi', xatboshilar:[
      'Shveytsariyalik matematik Leonard Eyler XVIII asr o‘rtasida (1750-yillarda) qavariq ko‘pyoqning uchlari U, qirralari Q va yoqlari Y soni o‘rtasida ajoyib bog‘lanish borligini bayon qildi: U − Q + Y = 2. Bu tenglik ko‘pyoqning o‘lchamlari va shakliga bog‘liq emas — kichik tetraedr uchun ham, ulkan piramida uchun ham bir xil.',
      'Formulani sahnadagi jismlarda tekshirib ko‘ring. Kub: 8 − 12 + 6 = 2. Uchburchakli prizma: 6 − 9 + 5 = 2. To‘rtburchakli piramida: 5 − 8 + 5 = 2. Tetraedr: 4 − 6 + 4 = 2. Formula yordamida bitta noma’lum sonni topish mumkin: masalan, 12 uchi va 20 yog‘i bor ko‘pyoqda qirralar soni Q = 12 + 20 − 2 = 30.',
      'Eyler formulasi keyinchalik topologiya deb ataluvchi yangi matematika bo‘limining boshlanishiga turtki bo‘ldi. Shuni yodda tutish kerakki, formula qavariq ko‘pyoqlar uchun to‘g‘ri; ichidan «teshik» o‘tgan ko‘pyoqda (masalan, ramkaga o‘xshash jismda) U − Q + Y yig‘indisi 2 ga teng bo‘lmaydi.',
      'Formulani sodda mulohaza bilan ham his qilish mumkin. Ko‘pyoqning bitta uchini «kesib» tashlasak, masalan kub burchagini arralasak, 1 ta uch yo‘qoladi, lekin 3 ta yangi uch, 3 ta yangi qirra va 1 ta yangi yoq paydo bo‘ladi. U − Q + Y yig‘indisi −1 + 3 − 3 + 1 = 0 ga o‘zgaradi, ya’ni o‘zgarmaydi. Kesilgan kubda 10 uch, 15 qirra, 7 yoq: 10 − 15 + 7 = 2.'
    ]},
    {sarlavha:'Hajm va sirtni hisoblash', xatboshilar:[
      'Ko‘pyoqning to‘la sirti — barcha yoqlari yuzlarining yig‘indisi. Prizmada u yon sirt va ikki asos yuzidan, piramidada yon sirt va bitta asos yuzidan iborat. To‘g‘ri prizmaning yon sirti asos perimetri bilan balandlik ko‘paytmasiga teng: S_yon = P·h. Muntazam piramidaning yon sirti asos perimetrining yarmi bilan apofema ko‘paytmasiga teng: S_yon = P·l/2.',
      'Hajm — jism egallagan fazo miqdori. Kub hajmi V = a³, to‘g‘ri burchakli parallelepiped hajmi V = abh. Umuman olganda har qanday prizma hajmi V = S·h, bu yerda S — asos yuzi. Piramida hajmi esa uch marta kichik: V = S·h/3. Buni kubni markazidan uchlariga tortilgan kesmalar yordamida oltita teng piramidaga bo‘lib ko‘rsatish mumkin.',
      'Masshtabning ta’siri muhim: jismning barcha chiziqli o‘lchamlari k marta oshsa, sirti k² marta, hajmi esa k³ marta ortadi. Kub qirrasi 2 marta uzaysa, uning sirti 4 marta, hajmi 8 marta ortadi. Buni sahnada a ni 2 dan 4 ga o‘zgartirib tekshiring: hajm 8 dan 64 ga o‘tadi.'
    ]},
    {sarlavha:'Tarix va ko‘p uchraydigan xatolar', xatboshilar:[
      'Muntazam ko‘pyoqlar qadimgi yunon olimlariga ma’lum edi. Yevklidning «Negizlar» asarining XIII kitobida faqat beshta muntazam qavariq ko‘pyoq — tetraedr, kub, oktaedr, dodekaedr va ikosaedr — mavjudligi isbotlangan. Ular Platon jismlari deb ham ataladi. Piramida hajmi uning prizma hajmining uchdan biriga tengligi ham qadimdan ma’lum bo‘lgan.',
      'Birinchi keng tarqalgan xato — hajm va sirt birliklarini aralashtirish: sirt kvadrat birliklarda (sm²), hajm kub birliklarda (sm³) o‘lchanadi. Ikkinchi xato — piramida hajmida 1/3 ko‘paytuvchini unutish. Uchinchi xato — piramidaning balandligi h ni apofema l bilan chalkashtirish: h asosga perpendikulyar, l esa yon yoq balandligi va u doim h dan uzun.',
      'To‘rtinchi xato — qirralarni sanashda bitta qirrani ikki marta hisoblash. Buning oldini olish uchun formuladan foydalaning: har bir qirra ikki yoqqa tegishli, shuning uchun barcha yoqlar tomonlari yig‘indisini 2 ga bo‘lsangiz, qirralar soni chiqadi. Kubda 6 ta kvadrat · 4 tomon = 24, 24 : 2 = 12 qirra.'
    ]}
  ],
  formulalar:[
    ['U − Q + Y = 2','Eyler formulasi (qavariq ko‘pyoq)'],
    ['V = a³ ;  S = 6a²','Kub'],
    ['V = abh ;  S = 2(ab + bh + ah)','To‘g‘ri burchakli parallelepiped'],
    ['d = √(a² + b² + h²)','Parallelepiped diagonali'],
    ['V = S_asos · h','Istalgan prizma hajmi'],
    ['V = (1/3)·S_asos · h','Istalgan piramida hajmi'],
    ['l = √(h² + a²/4) ;  S = a² + 2al','Muntazam to‘rtburchakli piramida: apofema va to‘la sirt'],
    ['V = a³√2/12 ;  S = √3·a²','Muntazam tetraedr']
  ],
  qiziqarli:[
    'Yevklid «Negizlar»ining XIII kitobida atigi beshta muntazam qavariq ko‘pyoq mavjudligi isbotlangan: tetraedr, kub, oktaedr, dodekaedr, ikosaedr.',
    'Eyler formulasi U − Q + Y = 2 ko‘pyoqning o‘lchamiga ham, yoqlar shakliga ham bog‘liq emas — u topologiya fanining ilk natijalaridan biri hisoblanadi.',
    'Kub qirrasi 2 marta oshsa, uni bo‘yash uchun bo‘yoq 4 marta, to‘ldirish uchun esa suv 8 marta ko‘p kerak bo‘ladi.',
    'Metan (CH₄) molekulasi muntazam tetraedr shaklida: bog‘lar orasidagi burchak ≈109,5°.',
    'Osh tuzi kristallari mikroskopda ko‘pincha kichik kubchalar ko‘rinishida bo‘ladi — sababi NaCl ning kubik kristall panjarasi.'
  ],
  lugat:[
    ['Ko‘pyoq','Sirti tekis ko‘pburchaklardan iborat fazoviy jism.'],
    ['Yoq','Ko‘pyoq sirtini tashkil etuvchi ko‘pburchak.'],
    ['Qirra','Ikki qo‘shni yoqning umumiy tomoni.'],
    ['Uch','Ko‘pyoq qirralari uchrashgan nuqta.'],
    ['Prizma','Ikki teng parallel asosi va parallelogramm yon yoqlari bor ko‘pyoq.'],
    ['Parallelepiped','Asosi parallelogramm bo‘lgan prizma.'],
    ['Piramida','Bitta asos va umumiy uchli uchburchak yon yoqlardan iborat ko‘pyoq.'],
    ['Tetraedr','Uchburchakli piramida: 4 uch, 6 qirra, 4 yoq.'],
    ['Apofema','Muntazam piramida yon yog‘ining uchidan tushirilgan balandligi.'],
    ['Eyler formulasi','Qavariq ko‘pyoq uchun U − Q + Y = 2.'],
    ['Hajm','Jism egallagan fazo miqdori; kub birliklarda o‘lchanadi.'],
    ['To‘la sirt','Jismning barcha yoqlari yuzlarining yig‘indisi.']
  ],
  manba:GD+'; '+GW+'; Yevklid «Negizlar», XIII kitob (beshta muntazam ko‘pyoq). Eyler formulasining aniq yili manbalarda turlicha (1750-yilgi maktub, 1750-yillardagi maqolalar) — shuning uchun «XVIII asr o‘rtasi» deb berildi.',
  ishlanma:{
    sinf:'10–11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv model, kichik guruhlarda tadqiqot, jadval to‘ldirish',
    maqsad:{talimiy:'Ko‘pyoq, prizma, piramida tushunchalarini, Eyler formulasini, hajm va to‘la sirt formulalarini o‘rgatish.',
      tarbiyaviy:'Aniqlik, mantiqiy asoslash va jamoada ishlash madaniyatini tarbiyalash.',
      rivojlantiruvchi:'Fazoviy tasavvur, qonuniyatni kuzatuv orqali topish va umumlashtirish ko‘nikmasini rivojlantirish.'},
    natijalar:['Ko‘pyoq elementlarini (uch, qirra, yoq) ko‘rsatadi va sanaydi','Eyler formulasini tekshiradi va noma’lum sonni topadi','Kub, parallelepiped, prizma va piramida hajmi va sirtini hisoblaydi','Piramida balandligi va apofemasini farqlaydi'],
    jihozlar:['MAKON 3D sahnasi «Ko‘pyoqlar»','Proyektor yoki interaktiv doska','Karton razvyortkalar (kub, piramida)','Jadval tarqatmasi: U, Q, Y','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Salomlashadi, davomatni tekshiradi.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Qirrasi 2 marta katta qutiga necha marta ko‘p narsa sig‘adi?» savoli.','Taxmin qiladi (ko‘pchilik «2» yoki «4» deydi).'],
      ['8–18','<b>Tushunchalar.</b> MAKON 3D da kub, parallelepiped, prizma, piramida, tetraedrni ko‘rsatadi; uch, qirra, yoq, apofema.','Daftarga ta’riflar va chizmalar.'],
      ['18–26','<b>Tadqiqot.</b> Guruhlar 5 ta jism uchun U, Q, Y jadvalini to‘ldirib, qonuniyat izlaydi.','U − Q + Y = 2 ni o‘zlari topadi.'],
      ['26–36','<b>Hajm va sirt.</b> Formulalarni chiqaradi; slayderda a ni 2 dan 4 ga o‘zgartirib, V 8 marta ortishini ko‘rsatadi.','Namunaviy masalalar yechadi.'],
      ['36–42','<b>Mustahkamlash.</b> MAKON «O‘lchamlarni sozlang» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, baholash, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Ko‘pyoq','Tekis yoqlardan iborat jism.'],['Prizma','Ikki teng parallel asosli ko‘pyoq.'],['Piramida','Bir asosli, uchi umumiy ko‘pyoq.'],['Apofema','Muntazam piramida yon yog‘i balandligi.'],['Eyler formulasi','U − Q + Y = 2.']],
    savollar:[['Kubda nechta uch, qirra, yoq bor?','8, 12, 6'],['Eyler formulasini yozing.','U − Q + Y = 2'],['Piramida hajmi formulasi?','V = S·h/3'],['Parallelepiped 2×3×4 hajmi?','24'],['Tetraedrda nechta qirra bor?','6']],
    uy:'Darslikdagi mavzuni o‘qish; (1) beshburchakli prizma va beshburchakli piramida uchun U, Q, Y ni topib, Eyler formulasini tekshirish; (2) a = 10, h = 12 bo‘lgan muntazam to‘rtburchakli piramida hajmi va to‘la sirtini hisoblash (javob: V = 400, l = 13, S = 360); (3) kartondan kub razvyortkasini yasash.',
    manba:GD+'; '+GW
  }
},

/* ============ 2. AYLANISH JISMLARI ============ */
'geometriya-aylanish': {
  fan:'geometriya', qisqaNom:'Aylanish jismlari', nom:'Aylanish jismlari: silindr, konus, shar',
  qisqa:'10–11-sinf · stereometriya · «Aylanish jismlari» bobi',
  sahna:'geometriya', geo:{shakllar:['silindr','konus','shar']},
  kor:{
    sarlavha:'Aylantirilgan shakldan jism',
    matn:'Tekis shaklni biror to‘g‘ri chiziq (o‘q) atrofida aylantirsak, aylanish jismi hosil bo‘ladi. To‘g‘ri to‘rtburchakdan silindr, to‘g‘ri burchakli uchburchakdan konus, yarim doiradan shar paydo bo‘ladi. Bu jismlarning yoqlari va qirralari yo‘q, shuning uchun ularning hajmi va sirti π soni ishtirokidagi formulalar bilan hisoblanadi. Radius va balandlikni slayder bilan o‘zgartirib, formulalarni sinab ko‘ring.',
    punktlar:['<b>Silindr:</b> V = πr²h, S = 2πr(r + h)','<b>Konus:</b> V = πr²h/3, S = πr(r + l), l = √(r² + h²)','<b>Shar:</b> V = 4πr³/3, S = 4πr²','Konus hajmi — shu asosli va balandlikli silindr hajmining <b>uchdan biri</b>']
  },
  bolimlar:[
    {sarlavha:'Uch jism: hosil bo‘lishi va elementlari', jadval:[
      ['Silindr','To‘g‘ri to‘rtburchakni tomoni atrofida aylantirishdan · 2 ta doira asos, yon sirt, r, h'],
      ['Konus','To‘g‘ri burchakli uchburchakni kateti atrofida aylantirishdan · doira asos, uch, r, h, yasovchi l'],
      ['Shar','Yarim doirani diametri atrofida aylantirishdan · markaz, radius r'],
      ['Silindr o‘q kesimi','To‘g‘ri to‘rtburchak (2r × h)'],
      ['Konus o‘q kesimi','Teng yonli uchburchak'],
      ['Shar kesimi','Har doim doira; markazdan o‘tsa — katta doira']
    ]},
    {sarlavha:'Hajm va sirt formulalari', jadval:[
      ['Silindr hajmi','V = πr²h'],['Silindr to‘la sirti','S = 2πr² + 2πrh = 2πr(r + h)'],
      ['Konus hajmi','V = πr²h / 3'],['Konus to‘la sirti','S = πr² + πrl = πr(r + l)'],
      ['Shar hajmi','V = 4πr³ / 3'],['Sfera yuzi','S = 4πr²']
    ], matn:'π ≈ 3,14159. Javobni π orqali (masalan, 45π) yoki taqribiy son sifatida (≈141,37) yozish mumkin.'},
    {sarlavha:'Namunaviy hisob', jadval:[
      ['Silindr, r = 3, h = 5','V = 45π ≈ 141,37 · S = 48π ≈ 150,80'],
      ['Konus, r = 3, h = 4','l = 5 · V = 12π ≈ 37,70 · S = 24π ≈ 75,40'],
      ['Shar, r = 3','V = 36π ≈ 113,10 · S = 36π ≈ 113,10 (son qiymatlari teng!)'],
      ['Shar, r = 2','V = 32π/3 ≈ 33,51 · S = 16π ≈ 50,27']
    ], matn:'r = 3 da shar hajmi va sirti son jihatdan tengligi tasodif: 4πr³/3 = 4πr² tenglik faqat r = 3 da bajariladi. Birliklari har xil (sm³ va sm²).'},
    {sarlavha:'Arximed nisbati', jadval:[['Shar (radius r)','V = 4πr³/3'],['Unga tashqi chizilgan silindr (r, h = 2r)','V = 2πr³'],['Nisbat','Shar : silindr = 2 : 3'],['Shu silindrga ichki chizilgan konus','V = 2πr³/3'],['Konus : shar : silindr','1 : 2 : 3']]}
  ],
  bosqichlar:[
    {sarlavha:'Silindr', matn:'To‘g‘ri to‘rtburchak o‘z tomoni atrofida aylansa, silindr hosil bo‘ladi. Asos — doira, yuzi πr². Hajm = asos yuzi × balandlik: V = πr²h. Yon sirt ochilsa, tomonlari 2πr va h bo‘lgan to‘g‘ri to‘rtburchak chiqadi.', shakl:'silindr'},
    {sarlavha:'Silindr sirti', matn:'To‘la sirt = ikki asos + yon sirt: S = 2πr² + 2πrh. r ni o‘zgartiring: hajm r² ga proporsional, shuning uchun radius 2 marta oshsa, hajm 4 marta ortadi.', shakl:'silindr'},
    {sarlavha:'Konus', matn:'To‘g‘ri burchakli uchburchak kateti atrofida aylansa, konus hosil bo‘ladi. Yasovchi l = √(r² + h²). Hajm V = πr²h/3 — silindr hajmining uchdan biri.', shakl:'konus'},
    {sarlavha:'Konus sirti', matn:'Yon sirt ochilsa, radiusi l bo‘lgan doira sektori chiqadi; uning yuzi πrl. To‘la sirt S = πr(r + l). r = 3, h = 4 da l = 5 — Misr uchburchagi.', shakl:'konus'},
    {sarlavha:'Shar', matn:'Yarim doira diametri atrofida aylansa, shar hosil bo‘ladi. V = 4πr³/3, S = 4πr². Sfera yuzi katta doira yuzidan roppa-rosa 4 marta katta.', shakl:'shar'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Jismni sozlang',
    topshiriqlar:[
      {shart:'<b>Silindr</b>da <b>r = 2</b> va <b>h = 5</b> bo‘lsin. Hajmi 20π ≈ 62,83 bo‘ladi.', hodisa:'geometriya', kod:"ev.shakl==='silindr' && ev.r===2 && ev.h===5", izoh:'To‘g‘ri! V = πr²h = π·4·5 = 20π ≈ 62,83.'},
      {shart:'<b>Shar</b> hajmi <b>36π ≈ 113,10</b> bo‘lsin.', hodisa:'geometriya', kod:"ev.shakl==='shar' && Math.abs(ev.V-36*Math.PI)<0.01", izoh:'To‘g‘ri! 4πr³/3 = 36π ⇒ r³ = 27 ⇒ r = 3. Qiziq: shu radiusda sirt ham 36π.'},
      {shart:'<b>Konus</b>ning yasovchisi <b>l = 5</b> bo‘ladigan butun r va h ni tanlang.', hodisa:'geometriya', kod:"ev.shakl==='konus' && ev.r*ev.r+ev.h*ev.h===25", izoh:'To‘g‘ri! r² + h² = 25: (3; 4) yoki (4; 3). Masalan, r = 3, h = 4 da V = 12π, S = 24π.'},
      {shart:'<b>Silindr</b> to‘la sirti <b>48π ≈ 150,80</b> bo‘lsin.', hodisa:'geometriya', kod:"ev.shakl==='silindr' && Math.abs(ev.S-48*Math.PI)<0.01", izoh:'To‘g‘ri! 2πr(r + h) = 48π ⇒ r(r + h) = 24: masalan r = 3, h = 5 yoki r = 2, h = 10 yoki r = 4, h = 2.'}
    ]},
  test:[
    {s:'Silindr hajmi formulasi?', v:['V = πr²h/3','V = 2πrh','V = πr²h','V = 4πr³/3'], t:2, izoh:'Silindr: <b>V = πr²h</b>.'},
    {s:'r = 3, h = 4 bo‘lgan konusning yasovchisi?', v:['5','7','√7','25'], t:0, izoh:'l = √(9 + 16) = <b>5</b>.'},
    {s:'Shar radiusi 2 marta oshsa, hajmi necha marta ortadi?', v:['2','4','6','8'], t:3, izoh:'V ~ r³, 2³ = <b>8</b>.'},
    {s:'Sfera yuzi formulasi?', v:['S = πr²','S = 2πr²','S = 4πr²','S = 4πr³/3'], t:2, izoh:'<b>S = 4πr²</b> — katta doira yuzidan 4 marta katta.'},
    {s:'Konus hajmi asosi va balandligi bir xil silindr hajmining qancha qismi?', v:['1/2','1/3','2/3','1/4'], t:1, izoh:'V_konus = πr²h/3 — <b>uchdan biri</b>.'},
    {s:'r = 3, h = 5 bo‘lgan silindrning to‘la sirti?', v:['30π','45π','48π','39π'], t:2, izoh:'S = 2π·3·(3 + 5) = <b>48π</b>.'},
    {s:'Qaysi shaklni aylantirib konus hosil qilinadi?', v:['Yarim doira','To‘g‘ri to‘rtburchak','To‘g‘ri burchakli uchburchak (kateti atrofida)','Trapetsiya'], t:2, izoh:'<b>To‘g‘ri burchakli uchburchak</b> kateti atrofida aylansa — konus.'},
    {s:'Arximed natijasiga ko‘ra shar hajmi unga tashqi chizilgan silindr hajmining qanchasi?', v:['1/2','3/4','2/3','1/3'], t:2, izoh:'4πr³/3 : 2πr³ = <b>2/3</b>.'}
  ],
  yordamchi:[
    {s:'Yasovchi nima?', j:'Konus uchini asos aylanasining istalgan nuqtasi bilan tutashtiruvchi kesma. To‘g‘ri konusda barcha yasovchilar teng: l = √(r² + h²).', kalit:['yasovchi']},
    {s:'Shar va sfera farqi nima?', j:'Sfera — markazdan bir xil masofadagi nuqtalar to‘plami, ya’ni sirt. Shar — sfera bilan chegaralangan jism (ichki qismi ham kiradi). Sirt yuzi sferaga, hajm sharga tegishli.', kalit:['sfera','shar']}
  ],
  maqola:[
    {sarlavha:'Kirish: aylanish jismlari', xatboshilar:[
      'Kulolchilik charxida loy aylantirilib ko‘za yasalganini ko‘rganmisiz? Usta qo‘li bilan faqat profilni beradi, aylanish esa uni simmetrik jismga aylantiradi. Geometriyada ham xuddi shunday: tekis shaklni o‘q atrofida to‘liq aylantirsak, aylanish jismi hosil bo‘ladi. Maktab kursida uchta asosiy aylanish jismi o‘rganiladi: silindr, konus va shar.',
      'Aylanish jismlari ko‘pyoqlardan farq qiladi: ularning sirti egri, yoqlari, qirralari va uchlari (konus uchidan tashqari) yo‘q. Shuning uchun Eyler formulasi ularga qo‘llanmaydi. Hajm va sirt formulalarida esa doiraning yuzi va aylana uzunligi bilan bog‘liq π soni qatnashadi.',
      'Bu jismlar texnikada juda ko‘p uchraydi: quvurlar, bak va sisternalar — silindr; voronka, qum soati, yo‘l konusi — konus; podshipnik sharchalari, koptok, suv minoralari rezervuarlari — sharga yaqin. Material sarfi va sig‘imni hisoblash uchun aynan shu formulalar ishlatiladi.',
      'Bu darsda har bir jism qanday hosil bo‘lishini, uning elementlarini, hajm va to‘la sirt formulalarini ko‘rib chiqamiz. Formulalarni yodlash o‘rniga ularni ko‘pyoqlar bilan bog‘lab tushunish qulay: silindrni asosi juda ko‘p burchakli prizmaga, konusni esa shunday piramidaga o‘xshatish mumkin. Shu sababli hajm formulalari ham prizma va piramida formulalariga o‘xshash ko‘rinishga ega.'
    ]},
    {sarlavha:'Silindr', xatboshilar:[
      'To‘g‘ri to‘rtburchakni uning bir tomoni atrofida aylantirganda to‘g‘ri doiraviy silindr hosil bo‘ladi. Aylanish o‘qi bo‘lgan tomon silindr balandligi h, unga qo‘shni tomon esa asos radiusi r bo‘ladi. Silindrning ikki asosi — teng va parallel doiralar, ular orasidagi egri sirt yon sirt deyiladi.',
      'Silindr hajmi prizma hajmi kabi topiladi: asos yuzi balandlikka ko‘paytiriladi, ya’ni V = πr²h. Yon sirtni qaychi bilan kesib tekislikka yoysak, tomonlari 2πr (asos aylanasi uzunligi) va h bo‘lgan to‘g‘ri to‘rtburchak hosil bo‘ladi. Demak, yon sirt yuzi 2πrh, to‘la sirt esa S = 2πr² + 2πrh = 2πr(r + h).',
      'Silindr o‘qi orqali o‘tgan tekislik bilan kesilsa, tomonlari 2r va h bo‘lgan to‘g‘ri to‘rtburchak chiqadi. Asosga parallel tekislik bilan kesilsa, asosga teng doira hosil bo‘ladi. Masalan, r = 3, h = 5 bo‘lsa, V = 45π ≈ 141,37 va S = 48π ≈ 150,80.',
      'Amaliy masala: diametri 10 sm, balandligi 12 sm bo‘lgan silindr idish qancha suv sig‘diradi? Radius r = 5 sm, V = π·25·12 = 300π ≈ 942 sm³, ya’ni taxminan 0,94 litr. Agar idishning usti ochiq bo‘lsa va uni tashqi tomondan bo‘yash kerak bo‘lsa, faqat bitta asos va yon sirt olinadi: π·25 + 2π·5·12 = 145π ≈ 455,5 sm².'
    ]},
    {sarlavha:'Konus', xatboshilar:[
      'To‘g‘ri burchakli uchburchakni bir kateti atrofida aylantirganda to‘g‘ri doiraviy konus hosil bo‘ladi. Aylanish o‘qi bo‘lgan katet balandlik h, ikkinchi katet asos radiusi r, gipotenuza esa yasovchi l bo‘ladi. Pifagor teoremasiga ko‘ra l = √(r² + h²).',
      'Konus hajmi asosi va balandligi bir xil silindr hajmining uchdan biriga teng: V = πr²h/3. Bu piramida va prizma orasidagi nisbatning o‘zi. Konusning yon sirti ochilganda radiusi l bo‘lgan doira sektori chiqadi, uning yuzi πrl. To‘la sirt S = πr² + πrl = πr(r + l).',
      'Masalan, r = 3, h = 4 bo‘lsa, l = 5 (tomonlari 3, 4, 5 bo‘lgan «Misr uchburchagi»), hajm V = 12π ≈ 37,70, to‘la sirt S = 24π ≈ 75,40. Konusning o‘q kesimi teng yonli uchburchak, asosga parallel kesimi esa doira bo‘ladi.',
      'Konusni balandligining o‘rtasidan asosga parallel kesib, ustki qismini olib tashlasak, kesik konus hosil bo‘ladi — chelak va abajur shunday shaklda. Kesilgan kichik konusning barcha o‘lchamlari ikki marta kichik bo‘lgani uchun uning hajmi butun konus hajmidan 2³ = 8 marta kichik. Demak, kesik konus butun konus hajmining 7/8 qismini tashkil qiladi.'
    ]},
    {sarlavha:'Shar va sfera', xatboshilar:[
      'Yarim doirani diametri atrofida aylantirganda shar hosil bo‘ladi. Berilgan nuqtadan (markazdan) bir xil r masofada yotuvchi fazodagi barcha nuqtalar sfera deyiladi; sfera bilan chegaralangan jism esa shar. Sharning tekislik bilan har qanday kesimi doira bo‘ladi, markazdan o‘tgan kesim eng katta — katta doira deyiladi.',
      'Shar hajmi V = 4πr³/3, sfera yuzi S = 4πr². Sfera yuzi katta doira yuzidan (πr²) roppa-rosa 4 marta katta. Hajm r³ ga proporsional bo‘lgani uchun radius 2 marta oshsa, hajm 8 marta, sirt esa 4 marta ortadi.',
      'Shar yana bir muhim xossaga ega: berilgan sirt yuziga ega jismlar ichida u eng katta hajmni o‘rab oladi. Shuning uchun suv tomchilari va sovun pufakchalari sirt tarangligi ta’sirida sharsimon shaklga intiladi.',
      'Yer ham sharga yaqin shaklda: uning o‘rtacha radiusi ≈6 371 km. Sfera yuzi formulasiga qo‘ysak, S = 4π·6 371² ≈ 510 mln km² chiqadi — bu ma’lumotnomalarda Yer sirti uchun beriladigan qiymatga mos keladi. Albatta, Yer qutblarda biroz siqilgan, shuning uchun bu hisob taqribiy.'
    ]},
    {sarlavha:'Arximed kashfiyoti', xatboshilar:[
      'Qadimgi yunon olimi Arximed (miloddan avvalgi III asr) «Shar va silindr haqida» asarida sharga tashqi chizilgan silindr (radiusi r, balandligi 2r) hajmi shar hajmidan 3/2 marta katta ekanini isbotlagan. Haqiqatan, silindr hajmi πr²·2r = 2πr³, shar hajmi 4πr³/3, nisbat 2 : 3. Bu silindrning to‘la sirti (6πr²) sfera yuzidan (4πr²) ham 3/2 marta katta.',
      'Shu silindrga ichki chizilgan konus hajmi πr²·2r/3 = 2πr³/3. Demak, konus, shar va silindr hajmlari 1 : 2 : 3 nisbatda. Plutarxning yozishicha, Arximed bu natijani shunchalik qadrlaganki, qabr toshiga silindrga ichki chizilgan shar tasvirini o‘yishni vasiyat qilgan. Rim notig‘i Tsitseron mil. av. 75-yilda Sirakuzada shu belgisi bor qabrni topganini yozgan.',
      'Bu nisbatni amalda ham tekshirish mumkin: bir xil radius va balandlikdagi konus shaklidagi idishni suv bilan uch marta to‘ldirib silindrga quysangiz, silindr to‘ladi. Sahnada ham r va h ni bir xil qilib, silindr va konus hajmlarini solishtiring.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — konusning balandligi h bilan yasovchisi l ni chalkashtirish. Hajm formulasida balandlik, yon sirt formulasida yasovchi qatnashadi. Ikkinchi xato — diametr berilganda uni radius o‘rniga qo‘yish: d = 10 sm bo‘lsa, r = 5 sm.',
      'Uchinchi xato — silindrning to‘la sirtida ikkita asos o‘rniga bittasini hisoblash (usti ochiq idishda esa haqiqatan bitta asos olinadi — masala shartini diqqat bilan o‘qing). To‘rtinchi xato — hajm va sirt birliklarini aralashtirish: hajm sm³ yoki litrda, sirt sm² da o‘lchanadi; 1 l = 1 dm³ = 1000 sm³.',
      'Javobni π orqali qoldirish ko‘pincha qulayroq va aniqroq: 45π yozuvi ≈141,37 dan ko‘ra aniq. Taqribiy hisobda π ≈ 3,14 olinsa, natija biroz farq qilishini unutmang: 45·3,14 = 141,3.'
    ]}
  ],
  formulalar:[
    ['V = πr²h','Silindr hajmi'],
    ['S = 2πr(r + h)','Silindr to‘la sirti'],
    ['l = √(r² + h²)','Konus yasovchisi'],
    ['V = (1/3)πr²h','Konus hajmi'],
    ['S = πr(r + l)','Konus to‘la sirti'],
    ['V = (4/3)πr³','Shar hajmi'],
    ['S = 4πr²','Sfera yuzi'],
    ['V_konus : V_shar : V_silindr = 1 : 2 : 3','Arximed nisbati (silindr: radius r, balandlik 2r)']
  ],
  qiziqarli:[
    'Arximed shar hajmi unga tashqi chizilgan silindr hajmining 2/3 qismiga tengligini isbotlagan va Plutarx ma’lumotiga ko‘ra qabriga shu chizmani o‘yishni so‘ragan; qabrni keyinchalik Tsitseron topgan.',
    'Radiusi 3 bo‘lgan sharning hajmi ham, sirti ham son jihatdan 36π ga teng — bu faqat r = 3 da sodir bo‘ladi.',
    'Berilgan sirt yuziga ega jismlar ichida shar eng katta hajmni sig‘diradi — shuning uchun sovun pufakchalari sharsimon.',
    'Konus shaklidagi idishni uch marta to‘ldirib quysangiz, bir xil radius va balandlikdagi silindr to‘ladi.',
    'Sfera yuzi uning katta doirasi yuzidan roppa-rosa 4 marta katta: 4πr² va πr².'
  ],
  lugat:[
    ['Aylanish jismi','Tekis shaklni o‘q atrofida aylantirishdan hosil bo‘lgan jism.'],
    ['Silindr','To‘g‘ri to‘rtburchakni tomoni atrofida aylantirishdan hosil bo‘lgan jism.'],
    ['Konus','To‘g‘ri burchakli uchburchakni kateti atrofida aylantirishdan hosil bo‘lgan jism.'],
    ['Shar','Sfera bilan chegaralangan jism.'],
    ['Sfera','Markazdan teng masofadagi fazo nuqtalari to‘plami (shar sirti).'],
    ['Radius','Markazdan (yoki o‘qdan) asos aylanasigacha masofa.'],
    ['Yasovchi','Konus uchini asos aylanasi nuqtasi bilan tutashtiruvchi kesma.'],
    ['O‘q kesimi','Jismning aylanish o‘qi orqali o‘tgan tekislik bilan kesimi.'],
    ['Katta doira','Sharning markazidan o‘tgan tekislik bilan kesimi.'],
    ['Razvyortka','Jism sirtini tekislikka yoyilgan holda tasvirlash.'],
    ['π soni','Aylana uzunligining diametriga nisbati, ≈3,14159.']
  ],
  manba:GD+'; Wikipedia (inglizcha): «Cylinder», «Cone», «Sphere», «On the Sphere and Cylinder» (Arximed); Plutarx «Marsell» (Arximedning iltimosi); Tsitseron «Tuskulan suhbatlari» (Arximed qabri haqidagi xabar).',
  ishlanma:{
    sinf:'10–11-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv model, amaliy tajriba (idishlar bilan), juftlikda masala yechish',
    maqsad:{talimiy:'Silindr, konus va sharning hosil bo‘lishi, elementlari, hajm va to‘la sirt formulalarini o‘rgatish.',
      tarbiyaviy:'Ilm tarixiga (Arximed) qiziqish, hisoblashda aniqlik va mas’uliyat.',
      rivojlantiruvchi:'Fazoviy tasavvur, formulani modeldan chiqarish, masshtab ta’sirini tahlil qilish.'},
    natijalar:['Silindr, konus, shar qanday hosil bo‘lishini tushuntiradi','Yasovchini Pifagor teoremasi bilan topadi','Uch jismning hajmi va to‘la sirtini hisoblaydi','Konus–silindr va shar–silindr hajm nisbatlarini asoslaydi'],
    jihozlar:['MAKON 3D sahnasi «Aylanish jismlari»','Proyektor','Bir xil r va h li silindr va konus idish, suv yoki qum','Kalkulyator','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Konus idishni necha marta to‘ldirib silindrga quyish kerak? — taxmin.','Taxmin aytadi, keyin tajribani kuzatadi.'],
      ['8–20','<b>Silindr va konus.</b> MAKON 3D da hosil bo‘lishini, razvyortkani ko‘rsatadi; formulalarni chiqaradi.','Chizma va formulalarni yozadi.'],
      ['20–28','<b>Shar.</b> Formulalar, r ni o‘zgartirib V ~ r³ ni ko‘rsatadi; Arximed nisbati.','Nisbatni hisoblab tekshiradi.'],
      ['28–37','<b>Masala yechish.</b> Namunaviy hisoblar (r = 3, h = 4/5).','Juftlikda yechadi.'],
      ['37–42','<b>Mustahkamlash.</b> MAKON «Jismni sozlang» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Silindr','V = πr²h.'],['Konus','V = πr²h/3.'],['Shar','V = 4πr³/3.'],['Yasovchi','l = √(r² + h²).'],['Sfera','Shar sirti, S = 4πr².']],
    savollar:[['Silindr hajmi formulasi?','V = πr²h'],['r = 3, h = 4 konus yasovchisi?','5'],['Shar radiusi 2 marta oshsa, hajm?','8 marta ortadi'],['Sfera yuzi formulasi?','S = 4πr²'],['Konus va silindr hajmlari nisbati (bir xil r, h)?','1 : 3']],
    uy:'Darslikdagi mavzuni o‘qish; (1) diametri 10 sm, balandligi 12 sm bo‘lgan silindr idish necha litr suv sig‘diradi (≈0,94 l); (2) r = 6, h = 8 konusning V va S ini toping (l = 10, V = 96π, S = 96π); (3) Yer sharini r ≈ 6 371 km deb olib, sirt yuzini taqriban hisoblang (≈510 mln km²).',
    manba:GD
  }
},

/* ============ 3. YERNING ICHKI TUZILISHI ============ */
'geo-yer-tuzilishi': {
  fan:'geografiya', qisqaNom:'Yer ichi', nom:'Yerning ichki tuzilishi',
  qisqa:'5-sinf · litosfera · 6–7-sinfda chuqurlashtiriladi',
  sahna:'yer',
  kor:{
    sarlavha:'Oyog‘imiz ostida 6 371 km',
    matn:'Yer bir jinsli tosh shar emas — u piyozdek qatlamlardan tuzilgan. Tashqarida yupqa qattiq po‘st, uning ostida qalin mantiya, markazda esa temir-nikel yadro joylashgan: tashqi yadro suyuq, ichki yadro qattiq. Odamlar eng chuquri ≈12,3 km ga yetgan quduq qazigan, shuning uchun bu qatlamlar zilzila to‘lqinlarining tarqalishiga qarab aniqlangan. Kesilgan modelda qatlamlarni bosib, ularning chuqurligi, holati va haroratini ko‘ring.',
    punktlar:['<b>Po‘st:</b> okean ostida ≈5–10 km, materikda ≈30–40 km, tog‘lar ostida 70 km gacha','<b>Mantiya:</b> ≈2 890 km chuqurlikkacha, qattiq (astenosfera — plastik)','<b>Tashqi yadro:</b> ≈2 890–5 150 km, suyuq temir-nikel','<b>Ichki yadro:</b> ≈5 150–6 371 km, qattiq; 1936-yilda I. Lehmann kashf etgan']
  },
  bolimlar:[
    {sarlavha:'Qatlamlar: chuqurlik va holat', jadval:[
      ['Yer po‘sti','0 dan ≈5–70 km gacha · qattiq · silikat jinslar'],
      ['Yuqori mantiya','Moho dan ≈660 km gacha (410–660 km — o‘tish zonasi) · qattiq, astenosfera plastik · peridotit'],
      ['Quyi mantiya','≈660–2 890 km · qattiq · Mg-Fe silikatlari (bridgmanit)'],
      ['Tashqi yadro','≈2 890–5 150 km · suyuq · temir, nikel, yengil elementlar'],
      ['Ichki yadro','≈5 150–6 371 km (radiusi ≈1 220 km) · qattiq · temir-nikel'],
      ['Litosfera','Po‘st + yuqori mantiyaning qattiq qismi; o‘rtacha ≈80–100 km, plitalarga bo‘lingan']
    ], matn:'Chegaralar chuqurligi — o‘rtacha qiymatlar. USGS materik po‘stini o‘rtacha ≈30 km, boshqa manbalar ≈35–40 km deb beradi; qatlam qalinliklari ham manbaga qarab o‘nlab km farq qiladi.'},
    {sarlavha:'Harorat (taxminiy baholar)', jadval:[['Po‘st','Sirtda ≈15 °C; chuqurlashgan sari o‘rtacha 100 m ga ≈3 °C ortadi'],['Mantiya yuqorisi','≈500–900 °C'],['Mantiya va yadro chegarasi','≈3 500–4 000 °C'],['Tashqi yadro','≈4 000–5 000 °C'],['Ichki yadro','≈5 000–6 000 °C (ko‘pincha ≈5 400 °C keltiriladi)']],
     matn:'Yer ichidagi harorat to‘g‘ridan-to‘g‘ri o‘lchanmaydi — u laboratoriya tajribalari va hisob-kitoblar asosida baholanadi, shuning uchun manbalardagi raqamlar bir necha yuz, hatto ming daraja farq qiladi.'},
    {sarlavha:'Chegaralar va ularni kashf etganlar', jadval:[['Moxorovichich yuzasi (Moho)','Po‘st / mantiya · 1909, Andriya Moxorovichich (Xorvatiya)'],['Guttenberg yuzasi','Mantiya / yadro, ≈2 890 km · Beno Guttenberg (manbalarda 1913 yoki 1914-yil)'],['Lehmann yuzasi','Tashqi / ichki yadro, ≈5 150 km · 1936, Inge Lehmann (Daniya)'],['Yadro mavjudligi taxmini','1906, Richard Oldxem']]},
    {sarlavha:'Seysmik to‘lqinlar', jadval:[['P-to‘lqinlar (bo‘ylama)','Eng tez; qattiq, suyuq va gaz muhitdan o‘tadi'],['S-to‘lqinlar (ko‘ndalang)','Sekinroq; faqat qattiq muhitdan o‘tadi'],['Moho yuzasida','P-to‘lqin tezligi keskin ortadi (≈7 dan ≈8 km/s ga)'],['Tashqi yadroda','S-to‘lqinlar o‘tmaydi → yadro suyuq'],['Soya zonasi','Episentrdan ≈104°–140° oraliqda to‘g‘ridan-to‘g‘ri P-to‘lqinlar deyarli qayd etilmaydi']]}
  ],
  bosqichlar:[
    {sarlavha:'Yer po‘sti', matn:'Eng yupqa tashqi qatlam. Okean po‘sti ≈5–10 km, asosan bazaltdan; materik po‘sti o‘rtacha ≈30–40 km, granit va bazalt qatlamlaridan iborat. Po‘st Yer hajmining 1 % idan ham kam.', qatlam:'qobiq'},
    {sarlavha:'Yuqori mantiya', matn:'Po‘st ostidan ≈660 km gacha. Qattiq, lekin astenosfera qatlamida jinslar plastik bo‘lib, juda sekin oqa oladi. Litosfera plitalari shu qatlam ustida siljiydi.', qatlam:'yuqori_mantiya'},
    {sarlavha:'Quyi mantiya', matn:'≈660 km dan ≈2 890 km gacha. Harorat yuqori, lekin ulkan bosim tufayli moddalar qattiq holatda. Butun mantiya Yer hajmining ≈84 % i.', qatlam:'quyi_mantiya'},
    {sarlavha:'Tashqi yadro', matn:'≈2 890–5 150 km. Suyuq temir va nikel. Ko‘ndalang S-to‘lqinlar undan o‘tmaydi — suyuqlikning isboti. Suyuq metall oqimlari Yerning magnit maydonini hosil qiladi.', qatlam:'tashqi_yadro'},
    {sarlavha:'Ichki yadro', matn:'Markaziy qattiq shar, radiusi ≈1 220 km. Harorati Quyosh sirtinikiga yaqin, ammo bosim juda katta bo‘lgani uchun temir qattiq. 1936-yilda Inge Lehmann kashf etgan.', qatlam:'ichki_yadro'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Qatlamni toping',
    topshiriqlar:[
      {shart:'Biz yashaydigan <b>eng yupqa</b> qatlamni bosing.', hodisa:'yer-qatlam', kod:"ev.nom==='qobiq'", izoh:'To‘g‘ri! Yer po‘sti okean ostida ≈5–10 km, materikda ≈30–40 km.'},
      {shart:'<b>Suyuq</b> holatdagi qatlamni bosing.', hodisa:'yer-qatlam', kod:"ev.nom==='tashqi_yadro'", izoh:'To‘g‘ri! Tashqi yadro suyuq — S-to‘lqinlar undan o‘tmaydi.'},
      {shart:'1936-yilda <b>Inge Lehmann</b> kashf etgan qatlamni bosing.', hodisa:'yer-qatlam', kod:"ev.nom==='ichki_yadro'", izoh:'To‘g‘ri! Lehmann soya zonasiga tushgan zaif P-to‘lqinlar asosida ichki yadro borligini ko‘rsatgan.'},
      {shart:'Plastik <b>astenosfera</b> joylashgan qatlamni bosing.', hodisa:'yer-qatlam', kod:"ev.nom==='yuqori_mantiya'", izoh:'To‘g‘ri! Astenosfera yuqori mantiyada, taxminan 100–200 km chuqurlikda (joyga qarab farq qiladi).'},
      {shart:'Mantiyaning <b>eng qalin</b>, ≈660 km dan ≈2 890 km gacha bo‘lgan qismini bosing.', hodisa:'yer-qatlam', kod:"ev.nom==='quyi_mantiya'", izoh:'To‘g‘ri! Quyi mantiya qalinligi ≈2 200 km.'}
    ]},
  test:[
    {s:'Yerning qaysi qatlami suyuq holatda?', v:['Quyi mantiya','Ichki yadro','Tashqi yadro','Yer po‘sti'], t:2, izoh:'<b>Tashqi yadro</b> — suyuq temir-nikel.'},
    {s:'Po‘st va mantiya chegarasi qanday ataladi?', v:['Guttenberg yuzasi','Moxorovichich yuzasi (Moho)','Lehmann yuzasi','Kola yuzasi'], t:1, izoh:'<b>Moho</b> — 1909-yilda A. Moxorovichich aniqlagan.'},
    {s:'Qaysi seysmik to‘lqinlar suyuq muhitdan o‘tmaydi?', v:['P-to‘lqinlar','Barcha to‘lqinlar','Hech biri','S-to‘lqinlar'], t:3, izoh:'Ko‘ndalang <b>S-to‘lqinlar</b> faqat qattiq muhitda tarqaladi.'},
    {s:'Okean po‘stining qalinligi taxminan qancha?', v:['5–10 km','30–40 km','100 km','660 km'], t:0, izoh:'Okean po‘sti <b>≈5–10 km</b>, materik po‘stidan ancha yupqa.'},
    {s:'Ichki yadro nima uchun juda issiq bo‘lsa ham qattiq?', v:['U muzdan iborat','Bosim juda katta','Harorati past','U toshdan iborat'], t:1, izoh:'Ulkan <b>bosim</b> temirning suyuqlanish haroratini oshiradi.'},
    {s:'Ichki yadroni kim va qachon kashf etgan?', v:['B. Guttenberg, 1913','A. Moxorovichich, 1909','I. Lehmann, 1936','R. Oldxem, 1906'], t:2, izoh:'<b>Inge Lehmann, 1936</b>.'},
    {s:'Yerning qaysi qatlami hajm bo‘yicha eng katta?', v:['Po‘st','Mantiya','Tashqi yadro','Ichki yadro'], t:1, izoh:'<b>Mantiya</b> — Yer hajmining ≈84 % i.'},
    {s:'Yerning magnit maydoni asosan qayerda hosil bo‘ladi?', v:['Yer po‘stida','Astenosferada','Tashqi yadroda','Atmosferada'], t:2, izoh:'<b>Tashqi yadro</b>dagi suyuq metall oqimlari (geodinamo).'}
  ],
  yordamchi:[
    {s:'Litosfera va Yer po‘sti bir narsami?', j:'Yo‘q. Yer po‘sti — tarkibi bo‘yicha ajratilgan qatlam. Litosfera — mexanik xossasi bo‘yicha ajratilgan qattiq qobiq: u po‘st va yuqori mantiyaning qattiq qismini o‘z ichiga oladi.', kalit:['litosfera']},
    {s:'Olimlar Yer markaziga bormay qanday bilishgan?', j:'Zilziladan keyin seysmik to‘lqinlar butun Yer bo‘ylab tarqaladi. Dunyo bo‘ylab seysmostansiyalar ularning yetib kelish vaqtini yozadi. Tezlik va yo‘nalish qayerda keskin o‘zgarsa, o‘sha yerda chegara bor; S-to‘lqin o‘tmagan joy esa suyuq.', kalit:['qanday','bilish','seysm']}
  ],
  maqola:[
    {sarlavha:'Kirish: Yerning ichiga qanday qaraladi?', xatboshilar:[
      'Yerning o‘rtacha radiusi taxminan 6 371 km. Insoniyat qazigan eng chuqur quduq — Rossiyaning Kola yarimorolidagi o‘ta chuqur quduq — 1989-yilda 12 262 m ga yetgan. Bu Yer radiusining 0,2 % idan ham kam. Demak, Yerning ichki tuzilishini bevosita ko‘rish imkoni yo‘q va olimlar bilvosita usullarga tayanadi.',
      'Asosiy usul — seysmologiya, ya’ni zilzila to‘lqinlarini o‘rganish. Kuchli zilzila sodir bo‘lganda to‘lqinlar butun sayyora bo‘ylab tarqaladi va dunyodagi seysmostansiyalarda qayd etiladi. To‘lqinlar turli moddalarda turli tezlikda harakatlanadi, chegaralarda esa sinadi va qaytadi — xuddi yorug‘lik suvga kirganda sinishi kabi.',
      'Qo‘shimcha dalillar ham bor. Yerning o‘rtacha zichligi taxminan 5 514 kg/m³, sirt jinslariniki esa 2 700–3 000 kg/m³ atrofida. Demak, ichkarida ancha zich modda — metall yadro bo‘lishi kerak. Meteoritlar tarkibi, vulqonlar chiqargan chuqur jinslar va yuqori bosimdagi laboratoriya tajribalari ham shu xulosani tasdiqlaydi.',
      'Bu darsda Yerning to‘rtta asosiy qatlami — po‘st, mantiya, tashqi va ichki yadro — bilan tanishamiz. Har bir qatlam uchun chuqurlik, holat, tarkib va harorat haqida ma’lumot beriladi. Raqamlarning ko‘pchiligi o‘rtacha va taxminiy ekanini unutmang: bevosita o‘lchab bo‘lmaydigan joylar haqida olimlar dalillar asosida baho beradi va yangi tadqiqotlar bu baholarni aniqlashtirib boradi.'
    ]},
    {sarlavha:'Seysmik to‘lqinlar va chegaralarning kashf etilishi', xatboshilar:[
      'Seysmik to‘lqinlarning ikki asosiy turi bor. Bo‘ylama P-to‘lqinlar eng tez tarqaladi va qattiq, suyuq hamda gazsimon muhitdan o‘ta oladi. Ko‘ndalang S-to‘lqinlar sekinroq va faqat qattiq jismda tarqaladi, chunki suyuqlik siljish deformatsiyasiga qarshilik ko‘rsatmaydi. Shu farq Yerning qaysi qismi suyuq ekanini aniqlash kalitiga aylandi.',
      '1909-yilda xorvat seysmologi Andriya Moxorovichich mahalliy zilzila yozuvlarini tahlil qilib, bir necha o‘n kilometr chuqurlikda to‘lqin tezligi keskin oshishini aniqladi. Bu po‘st va mantiya chegarasi — hozir Moxorovichich yuzasi yoki qisqacha Moho deb ataladi. 1906-yilda ingliz geologi Richard Oldxem Yer markazida yadro borligini taxmin qilgan, 1913–1914-yillarda esa Beno Guttenberg mantiya va yadro chegarasining chuqurligini ≈2 900 km deb hisoblab chiqdi (manbalarda yil turlicha ko‘rsatiladi).',
      'Episentrdan taxminan 104° dan 140° gacha bo‘lgan oraliqda to‘g‘ridan-to‘g‘ri P-to‘lqinlar deyarli qayd etilmaydi — bu soya zonasi yadroning to‘lqinlarni sindirishi natijasi. 1936-yilda daniyalik seysmolog Inge Lehmann aynan shu zonada zaif P-to‘lqinlar kuzatilishini tushuntirish uchun yadro ichida yana bir, ichki yadro borligini taklif qildi. Keyinchalik ichki yadroning qattiq ekani ham tasdiqlandi.'
    ]},
    {sarlavha:'Yer po‘sti', xatboshilar:[
      'Yer po‘sti — sayyoraning eng yupqa, tashqi qattiq qatlami. U ikki turga bo‘linadi. Okean po‘sti okeanlar tubida joylashgan, qalinligi taxminan 5–10 km, asosan bazaltdan iborat, nisbatan og‘ir va geologik jihatdan yosh. Materik po‘sti qalinroq — o‘rtacha 30–40 km, baland tog‘lar ostida 70 km va undan ham ko‘proq; u yengilroq granit va bazalt qatlamlaridan tashkil topgan.',
      'Po‘stning kimyoviy tarkibida kislorod va kremniy ustunlik qiladi, keyin alyuminiy, temir, kalsiy, natriy, kaliy va magniy keladi. Aynan po‘stda foydali qazilmalar — neft, gaz, ko‘mir, rudalar joylashgan. Chuqurlashgan sari harorat ortadi: o‘rtacha har 100 m da taxminan 3 °C ga, lekin bu ko‘rsatkich joyga qarab ancha farq qiladi.',
      'Po‘st yuqori mantiyaning qattiq qismi bilan birga litosferani hosil qiladi. Litosfera yaxlit emas, balki katta va kichik plitalarga bo‘lingan. Plitalar chegarasida zilzilalar va vulqonlar ko‘p uchraydi — O‘zbekiston hududining seysmik faolligi ham litosfera plitalarining o‘zaro ta’siri bilan bog‘liq.'
    ]},
    {sarlavha:'Mantiya', xatboshilar:[
      'Mantiya po‘st ostidan taxminan 2 890 km chuqurlikkacha davom etadi va Yer hajmining taxminan 84 % ini egallaydi. U asosan magniy va temirga boy silikat jinslardan iborat. Yuqori mantiyaning asosiy jinsi peridotit — olivin va piroksen minerallaridan tashkil topgan. Taxminan 410 va 660 km chuqurliklarda minerallar bosim ta’sirida zichroq tuzilishga o‘tadi; bu oraliq o‘tish zonasi deyiladi.',
      'Mantiya deyarli butunlay qattiq, ammo juda uzoq vaqt oralig‘ida plastik oqa oladi. Ayniqsa yuqori mantiyadagi astenosfera — taxminan 100–200 km chuqurlikdagi qatlam — yumshoqroq va harakatchan. Litosfera plitalari shu qatlam ustida yiliga bir necha santimetr tezlikda siljiydi. Mantiyadagi sekin konveksiya oqimlari plitalar harakatining sabablaridan biri hisoblanadi.',
      'Quyi mantiya taxminan 660 km dan 2 890 km gacha cho‘zilgan. U yerda harorat 2 000 °C dan oshadi, lekin bosim shu qadar kattaki, jinslar erimaydi. Mantiya va yadro chegarasida harorat taxminan 3 500–4 000 °C deb baholanadi.'
    ]},
    {sarlavha:'Yadro: tashqi va ichki', xatboshilar:[
      'Yadro asosan temir va nikeldan iborat, tarkibida oz miqdorda oltingugurt, kislorod kabi yengil elementlar ham bor deb hisoblanadi. Tashqi yadro taxminan 2 890 km dan 5 150 km gacha chuqurlikda joylashgan va suyuq holatda. Buning asosiy isboti — ko‘ndalang S-to‘lqinlar undan o‘tmaydi.',
      'Tashqi yadrodagi suyuq metall Yerning aylanishi va issiqlik oqimlari ta’sirida doimiy harakatda. Elektr o‘tkazuvchi suyuqlikning bunday harakati Yerning magnit maydonini hosil qiladi — bu jarayon geodinamo deyiladi. Magnit maydon kompas strelkasini yo‘naltiradi va sayyorani Quyoshdan keladigan zaryadli zarralar oqimidan himoya qiladi.',
      'Ichki yadro — radiusi taxminan 1 220 km bo‘lgan qattiq temir-nikel shar. Uning harorati turli baholarga ko‘ra 5 000–6 000 °C atrofida, ya’ni Quyosh sirti haroratiga yaqin. Shunday issiqlikda ham temir qattiq qoladi, chunki markazdagi bosim atmosfera bosimidan millionlab marta katta. Yer asta-sekin soviyotgani sababli ichki yadro juda sekin o‘sib bormoqda.',
      'O‘lchamlarni tasavvur qilish uchun solishtiring: Oyning radiusi taxminan 1 737 km, ichki yadroniki esa ≈1 220 km — Oydan unchalik kichik emas. Butun yadro (tashqi va ichki birga) radiusi taxminan 3 480 km bo‘lib, Mars radiusidan (≈3 390 km) ham biroz katta. Yadro Yer massasining taxminan uchdan bir qismini tashkil qiladi.'
    ]},
    {sarlavha:'Ahamiyati va ko‘p uchraydigan xatolar', xatboshilar:[
      'Yerning ichki tuzilishini bilish amaliy ahamiyatga ega. Seysmologlar zilzila to‘lqinlarini o‘rganib, xavfli hududlarni aniqlaydi va binolarni zilzilabardosh loyihalashga yordam beradi. Geologlar mantiya va po‘st jarayonlari asosida foydali qazilmalar qayerda to‘planishini bashorat qiladi. Magnit maydonning manbaini tushunish esa navigatsiya va kosmik ob-havo uchun muhim.',
      'Birinchi keng tarqalgan xato — «po‘st ostida butunlay suyuq magma okeani bor» deb o‘ylash. Aslida mantiya deyarli to‘liq qattiq; magma faqat ayrim joylarda, jinslar qisman eriganda hosil bo‘ladi. Ikkinchi xato — ichki yadroni suyuq deb hisoblash: suyuq faqat tashqi yadro.',
      'Uchinchi xato — raqamlarni aniq qiymat deb yodlash. Chegaralar chuqurligi va harorat — o‘rtacha va taxminiy baholar; darslik, USGS va boshqa manbalarda ular bir-biridan farq qilishi tabiiy. To‘rtinchi xato — litosfera va Yer po‘stini bir narsa deb bilish: litosfera po‘stdan tashqari yuqori mantiyaning qattiq qismini ham o‘z ichiga oladi.'
    ]}
  ],
  formulalar:[
    ['R ≈ 6 371 km','Yerning o‘rtacha radiusi'],
    ['t = s / v','To‘lqinning yetib kelish vaqti: masofa / tezlik'],
    ['ΔT ≈ 3 °C / 100 m','Po‘stda haroratning chuqurlik bo‘yicha o‘rtacha ortishi (geotermik gradiyent, joyga qarab farq qiladi)'],
    ['ρ_o‘rtacha ≈ 5 514 kg/m³ > ρ_jins ≈ 2 700–3 000 kg/m³','Zich yadro borligining dalili']
  ],
  qiziqarli:[
    'Kola o‘ta chuqur qudug‘i 1989-yilda 12 262 m ga yetgan — bu Yer radiusining 0,2 % idan ham kam.',
    'Ichki yadroni ayol olim — daniyalik seysmolog Inge Lehmann 1936-yilda kashf etgan; u 104 yil umr ko‘rgan.',
    'Ichki yadro harorati (≈5 000–6 000 °C) Quyosh sirti haroratiga (≈5 500 °C) yaqin, lekin bosim tufayli qattiq.',
    'Mantiya Yer hajmining taxminan 84 % ini egallaydi, po‘st esa 1 % dan ham kam.',
    'Yerning magnit maydoni tashqi yadrodagi suyuq temir oqimlari tufayli hosil bo‘ladi.'
  ],
  lugat:[
    ['Yer po‘sti','Yerning eng yupqa tashqi qattiq qatlami (materik va okean po‘sti).'],
    ['Mantiya','Po‘st va yadro orasidagi eng katta qatlam, ≈2 890 km gacha.'],
    ['Astenosfera','Yuqori mantiyadagi plastik, harakatchan qatlam.'],
    ['Litosfera','Po‘st va yuqori mantiyaning qattiq qismi; plitalarga bo‘lingan.'],
    ['Tashqi yadro','Suyuq temir-nikel qatlami, ≈2 890–5 150 km.'],
    ['Ichki yadro','Markaziy qattiq temir-nikel shar, radiusi ≈1 220 km.'],
    ['Seysmik to‘lqin','Zilzila yoki portlashdan Yer ichida tarqaladigan elastik to‘lqin.'],
    ['P-to‘lqin','Bo‘ylama, eng tez seysmik to‘lqin; har qanday muhitdan o‘tadi.'],
    ['S-to‘lqin','Ko‘ndalang seysmik to‘lqin; faqat qattiq muhitdan o‘tadi.'],
    ['Moho yuzasi','Po‘st va mantiya chegarasi (Moxorovichich, 1909).'],
    ['Soya zonasi','Episentrdan ≈104°–140° oraliq, to‘g‘ridan-to‘g‘ri P-to‘lqin tushmaydigan hudud.'],
    ['Geodinamo','Tashqi yadrodagi suyuq metall harakatidan magnit maydon hosil bo‘lishi.']
  ],
  manba:GEO5+' — «Yerning ichki tuzilishi»; USGS «Inside the Earth» (This Dynamic Earth, pubs.usgs.gov/gip/dynamic/inside.html); Wikipedia (inglizcha): «Structure of Earth», «Mohorovičić discontinuity», «Gutenberg discontinuity», «Inge Lehmann», «Earth’s outer core», «Earth’s inner core», «Shadow zone», «Kola Superdeep Borehole»; Encyclopaedia Britannica «Earth: The interior». ZID: materik po‘stining o‘rtacha qalinligi (USGS ≈30 km, boshqa manbalar 35–40 km), Guttenberg natijasi yili (1913 yoki 1914) va yadro harorati (≈5 000–6 000 °C) manbalarda turlicha.',
  ishlanma:{
    sinf:'5-sinf (6–7-sinfda takrorlash uchun ham)', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D kesilgan model, «piyoz/shaftoli» qiyosi, guruhlarda qatlam pasporti',
    maqsad:{talimiy:'Yerning ichki qatlamlari — po‘st, mantiya, tashqi va ichki yadro — chuqurligi, holati, tarkibi va ularning seysmik to‘lqinlar orqali o‘rganilishi haqida bilim berish.',
      tarbiyaviy:'Ilmiy dalillarga tayanish, olimlar mehnatini qadrlash, zilzila xavfsizligiga mas’uliyat bilan qarash.',
      rivojlantiruvchi:'Bilvosita dalillardan xulosa chiqarish, modelni sxemaga aylantirish, taqqoslash ko‘nikmalari.'},
    natijalar:['Yerning to‘rt asosiy qatlamini tartib bilan sanaydi','Har bir qatlamning holatini (qattiq/suyuq/plastik) ayta oladi','Okean va materik po‘stini farqlaydi','Seysmik to‘lqinlar yordamida qatlamlar qanday aniqlanganini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Yerning ichki tuzilishi»','Proyektor','Shaftoli yoki qattiq qaynatilgan tuxum (qiyos uchun)','Qatlam pasporti kartochkalari','Darslik, atlas'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Eng chuqur quduq necha km? Yer markazigacha-chi?» — solishtirish.','Taxmin qiladi, 12 km va 6 371 km ni solishtiradi.'],
      ['8–15','<b>Qanday bilamiz?</b> Seysmik P va S to‘lqinlar; Moxorovichich, Guttenberg, Lehmann kashfiyotlari.','Jadvalga yozadi.'],
      ['15–28','<b>Qatlamlar.</b> MAKON 3D da har bir qatlamni ajratib ko‘rsatadi: chuqurlik, holat, tarkib, harorat.','Kesim sxemasini chizib, belgilaydi.'],
      ['28–36','<b>Guruh ishi.</b> Har guruh bitta qatlam pasportini tuzib, 1 daqiqada taqdim etadi.','Pasport tuzadi, taqdim etadi.'],
      ['36–42','<b>Mustahkamlash.</b> MAKON «Qatlamni toping» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Yer po‘sti','Eng yupqa tashqi qatlam.'],['Mantiya','Eng katta, asosan qattiq qatlam.'],['Tashqi yadro','Suyuq metall qatlam.'],['Ichki yadro','Qattiq metall markaz.'],['Seysmik to‘lqin','Zilzila to‘lqini.']],
    savollar:[['Yerning qatlamlarini tashqaridan ichkariga sanang.','Po‘st, mantiya, tashqi yadro, ichki yadro'],['Qaysi qatlam suyuq?','Tashqi yadro'],['Okean po‘sti qalinligi?','≈5–10 km'],['Nima uchun ichki yadro qattiq?','Bosim juda katta'],['Ichki yadroni kim kashf etgan?','Inge Lehmann, 1936']],
    uy:'Darslikdagi mavzuni o‘qish; plastilin yoki qog‘ozdan masshtabli kesim modeli yasash (6 371 km = 6,4 sm: po‘st chiziqcha, yadro chegarasi markazdan ≈3,5 sm, ichki yadro ≈1,2 sm); «Nima uchun S-to‘lqinlar tashqi yadrodan o‘tmaydi?» savoliga 3–4 gapli javob.',
    manba:GEO5+'; USGS «Inside the Earth»'
  }
},

/* ============ 4. YIL FASLLARI ============ */
'geo-fasllar': {
  fan:'geografiya', qisqaNom:'Fasllar', nom:'Yil fasllari: nima uchun yoz va qish almashadi?',
  qisqa:'5-sinf · «Yerning Quyosh atrofida aylanishi»',
  sahna:'fasllar',
  kor:{
    sarlavha:'Sabab — masofa emas, qiyalik',
    matn:'Ko‘pchilik yozda Yer Quyoshga yaqinroq bo‘ladi deb o‘ylaydi, aslida Yer Quyoshga yanvar boshida eng yaqin keladi. Fasllarning haqiqiy sababi — Yer o‘qining orbita tekisligiga perpendikulyarga nisbatan ≈23,44° qiya bo‘lishi va bu qiyalik yo‘nalishining yil davomida o‘zgarmasligi. Shu tufayli yil davomida goh shimoliy, goh janubiy yarimshar Quyoshga ko‘proq egiladi, nurlar tikroq tushadi va kun uzunroq bo‘ladi. To‘rt holat tugmasini bosib, Yerning orbitadagi o‘rnini va yoritilishini solishtiring.',
    punktlar:['<b>≈20–21-iyun</b> — yozgi quyosh turishi: eng uzun kun (shimoliy yarimshar)','<b>≈21–22-dekabr</b> — qishki quyosh turishi: eng qisqa kun','<b>≈20–21-mart</b> va <b>≈22–23-sentabr</b> — kun-tun tengligi','Toshkentda eng uzun kun ≈15 soat 09 daq, eng qisqa ≈9 soat 11 daq (2026)']
  },
  bolimlar:[
    {sarlavha:'To‘rt muhim nuqta (shimoliy yarimshar)', jadval:[
      ['Bahorgi kun-tun tengligi','≈20–21-mart (2026: 20-mart) · Quyosh ekvator ustida tik · kun ≈ tun'],
      ['Yozgi quyosh turishi','≈20–21-iyun (2026: 21-iyun) · Quyosh Shimoliy tropik (23,44° sh.k.) ustida · eng uzun kun'],
      ['Kuzgi kun-tun tengligi','≈22–23-sentabr (2026: 23-sentabr) · Quyosh ekvator ustida · kun ≈ tun'],
      ['Qishki quyosh turishi','≈21–22-dekabr (2026: UTC bo‘yicha 21-, Toshkent vaqti bilan 22-dekabr) · Janubiy tropik ustida · eng qisqa kun'],
      ['Janubiy yarimsharda','Hammasi teskari: iyunda qish, dekabrda yoz']
    ], matn:'Sanalar yildan yilga bir kunga siljishi mumkin, chunki kalendar yili (365 yoki 366 kun) tropik yilga (≈365,24 kun) aniq teng emas.'},
    {sarlavha:'Toshkent (≈41,3° sh.k.) misolida', jadval:[
      ['Yozgi quyosh turishi','Kun ≈15 soat 09 daq · tushki Quyosh balandligi ≈72°'],
      ['Qishki quyosh turishi','Kun ≈9 soat 11 daq · tushki Quyosh balandligi ≈25°'],
      ['Kun-tun tengligi','Kun ≈12 soatdan biroz ortiq · tushki balandlik ≈49°'],
      ['Eng uzun va eng qisqa kun farqi','≈5 soat 57 daq']
    ], matn:'Kun uzunligi — timeanddate.com ning 2026-yil uchun Toshkent hisobi. Tushki balandlik formula bilan hisoblangan: h = 90° − φ + δ, bu yerda φ ≈ 41,3°, δ — Quyosh og‘ishi (+23,44°, 0°, −23,44°).'},
    {sarlavha:'Yer harakati raqamlarda', jadval:[['O‘q qiyaligi','≈23,44°'],['Tropik yil','≈365,24 sutka'],['Yulduz sutkasi','≈23 soat 56 daq'],['Perigeliy (Quyoshga eng yaqin)','≈147,1 mln km, taxminan 3–4-yanvar'],['Afeliy (Quyoshdan eng uzoq)','≈152,1 mln km, taxminan 4-iyul'],['Shimoliy/janubiy qutb doiralari','≈66,56° kenglik'],['Tropiklar','≈23,44° kenglik']]},
    {sarlavha:'Astronomik va kalendar fasllar', jadval:[['Astronomik bahor (shimoliy)','Kun-tun tengligidan yozgi quyosh turishigacha, ≈92,8 kun'],['Astronomik yoz','≈93,6 kun — eng uzun (Yer afeliy yaqinida sekinroq harakatlanadi)'],['Astronomik kuz','≈89,8 kun'],['Astronomik qish','≈89,0 kun — eng qisqa'],['Kalendar (meteorologik) fasllar','Oy boshidan: bahor 1-mart, yoz 1-iyun, kuz 1-sentabr, qish 1-dekabr']],
     matn:'Kundalik hayotda va O‘zbekiston ob-havo xizmatida fasllar oy boshidan hisoblanadi; astronomiyada esa quyosh turishi va kun-tun tengligidan. Ikkala hisob ham to‘g‘ri — faqat ta’rif farq qiladi. Fasl davomiyliklari yildan yilga bir necha soatga o‘zgaradi.'}
  ],
  bosqichlar:[
    {sarlavha:'Yer va uning o‘qi', matn:'Yer Quyosh atrofida ≈365,24 sutkada aylanadi. O‘qi ≈23,44° qiya va yil davomida fazoda bir yo‘nalishga — Qutb yulduzi tomon qarab turadi. Yerni bosib, uning ma’lumotini ko‘ring.', fasl:'bahor'},
    {sarlavha:'Bahorgi kun-tun tengligi', matn:'≈20–21-mart. O‘q Quyoshga ham, undan teskari tomonga ham egilmagan. Quyosh ekvator ustida tik turadi, butun Yerda kun va tun deyarli teng. O‘zbekistonda Navro‘z shu kunlarga to‘g‘ri keladi.', fasl:'bahor'},
    {sarlavha:'Yozgi quyosh turishi', matn:'≈20–21-iyun. Shimoliy yarimshar Quyoshga eng ko‘p egilgan: nurlar tik tushadi, kun eng uzun. Toshkentda kun ≈15 soat, tushki Quyosh ≈72° balandlikda. Shimoliy qutb doirasidan shimolda qutb kuni.', fasl:'yoz'},
    {sarlavha:'Kuzgi kun-tun tengligi', matn:'≈22–23-sentabr. Yana Quyosh ekvator ustida, kun va tun teng. Shundan keyin shimoliy yarimsharda tun kundan uzun bo‘la boshlaydi.', fasl:'kuz'},
    {sarlavha:'Qishki quyosh turishi', matn:'≈21–22-dekabr. Shimoliy yarimshar Quyoshdan teskari egilgan: nurlar qiya, kun eng qisqa. Toshkentda kun ≈9 soat, Quyosh tushda ≈25° balandlikda. Qiziq: shu paytda Yer Quyoshga eng yaqin nuqtasiga yaqinlashib qolgan.', fasl:'qish'},
    {sarlavha:'Janubiy yarimsharda-chi?', matn:'Hammasi teskari: iyunda Avstraliya va Argentinada qish, dekabrda yoz. Bu fasllarning sababi masofa emas, balki qiyalik ekanining eng yaxshi isboti.', fasl:'qish'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Faslni aniqlang',
    topshiriqlar:[
      {shart:'Sahnadagi holatda shimoliy yarimsharda qaysi hodisa?', holat:{fasl:'yoz'}, v:['Qishki quyosh turishi','Yozgi quyosh turishi','Bahorgi kun-tun tengligi','Kuzgi kun-tun tengligi'], t:1, izoh:'Shimoliy qutb Quyoshga egilgan — <b>yozgi quyosh turishi</b>, ≈20–21-iyun.'},
      {shart:'Bu holatda Toshkentda kun uzunligi taxminan qancha?', holat:{fasl:'qish'}, v:['≈15 soat','≈12 soat','≈9 soat','≈6 soat'], t:2, izoh:'Qishki quyosh turishi: Toshkentda kun <b>≈9 soat 11 daq</b> (2026).'},
      {shart:'Bu holatda Quyosh tushda qayerda tik (90°) turadi?', holat:{fasl:'bahor'}, v:['Shimoliy tropikda','Ekvatorda','Janubiy tropikda','Shimoliy qutbda'], t:1, izoh:'Kun-tun tengligida Quyosh <b>ekvator</b> ustida tik.'},
      {shart:'Bu holatda janubiy yarimsharda qaysi fasl boshlanadi?', holat:{fasl:'kuz'}, v:['Kuz','Qish','Yoz','Bahor'], t:3, izoh:'Shimolda kuz boshlansa, janubda <b>bahor</b> boshlanadi.'},
      {shart:'Qaysi holatda Shimoliy qutb doirasidan shimolda qutb tuni bo‘ladi?', holat:{fasl:'qish'}, v:['Sahnadagi (qishki quyosh turishi)','Yozgi quyosh turishi','Kun-tun tengligi','Hech qachon'], t:0, izoh:'Shimoliy yarimshar Quyoshdan teskari egilgan — <b>qutb tuni</b>.'}
    ]},
  test:[
    {s:'Yil fasllari almashinishining asosiy sababi?', v:['Yerning Quyoshga yaqinlashib-uzoqlashishi','Yer o‘qining qiyaligi va Quyosh atrofida aylanishi','Oyning tortishishi','Quyosh faolligining o‘zgarishi'], t:1, izoh:'<b>O‘q qiyaligi (≈23,44°)</b> va orbitadagi harakat.'},
    {s:'Yer o‘qining qiyaligi (orbita tekisligiga perpendikulyarga nisbatan) taxminan qancha?', v:['66,56°','23,44°','41,3°','90°'], t:1, izoh:'<b>≈23,44°</b>; o‘q va orbita tekisligi orasidagi burchak esa ≈66,56°.'},
    {s:'Shimoliy yarimsharda eng uzun kun qachon?', v:['≈21–22-dekabr','≈20–21-mart','≈20–21-iyun','≈22–23-sentabr'], t:2, izoh:'<b>Yozgi quyosh turishi</b> — ≈20–21-iyun.'},
    {s:'Yer Quyoshga eng yaqin (perigeliy) qachon bo‘ladi?', v:['Iyul boshida','Yanvar boshida','Mart oxirida','Sentabrda'], t:1, izoh:'<b>Yanvar boshida</b> (≈147,1 mln km) — shimolda qish. Demak, masofa fasl sababi emas.'},
    {s:'Kun-tun tengligida Quyosh tushda qayerda tik turadi?', v:['Ekvatorda','Tropiklarda','Qutb doirasida','Qutbda'], t:0, izoh:'<b>Ekvator</b> ustida.'},
    {s:'Toshkentda (≈41,3° sh.k.) yozgi quyosh turishida tushki Quyosh balandligi taxminan qancha?', v:['≈25°','≈49°','≈72°','90°'], t:2, izoh:'h = 90° − 41,3° + 23,44° ≈ <b>72°</b>.'},
    {s:'Iyun oyida Avstraliyada qaysi fasl?', v:['Yoz','Qish','Bahor','Kuz'], t:1, izoh:'Janubiy yarimsharda fasllar teskari — <b>qish</b>.'},
    {s:'Qutb doiralari qaysi kenglikda joylashgan?', v:['≈23,44°','≈45°','≈66,56°','≈90°'], t:2, izoh:'<b>≈66,56°</b> = 90° − 23,44°.'}
  ],
  yordamchi:[
    {s:'Nega eng issiq kunlar 21-iyunda emas, iyulda?', j:'Yer sirti va ayniqsa suv isishga vaqt talab qiladi. Iyun oxirigacha kelayotgan issiqlik ketayotganidan ko‘p bo‘ladi, shuning uchun harorat quyosh turishidan keyin ham bir necha hafta ortishda davom etadi.', kalit:['issiq','iyul']},
    {s:'Tushki Quyosh balandligi qanday hisoblanadi?', j:'h = 90° − φ + δ. φ — joy kengligi (Toshkent ≈41,3°), δ — Quyosh og‘ishi: yozgi quyosh turishida +23,44°, kun-tun tengligida 0°, qishki quyosh turishida −23,44°.', kalit:['balandlik','hisob']}
  ],
  maqola:[
    {sarlavha:'Kirish: fasllar haqida keng tarqalgan xato', xatboshilar:[
      'Nima uchun yozda issiq, qishda sovuq? Ko‘pchilik «yozda Yer Quyoshga yaqinroq bo‘ladi» deb javob beradi. Bu javob mantiqli tuyuladi, lekin noto‘g‘ri. Yerning orbitasi aylanaga juda yaqin ellips bo‘lib, Quyoshgacha masofa yil davomida taxminan 147,1 mln km dan 152,1 mln km gacha, ya’ni atigi ≈3 % ga o‘zgaradi.',
      'Bundan ham muhimi: Yer Quyoshga eng yaqin nuqtasidan (perigeliy) yanvar boshida, eng uzoq nuqtasidan (afeliy) iyul boshida o‘tadi. Agar fasllarni masofa belgilaganida, butun Yerda yanvar eng issiq oy bo‘lardi. Holbuki O‘zbekistonda yanvar — qish, Avstraliyada esa yoz. Demak, sabab boshqa.',
      'Bu darsda fasllarning haqiqiy sababini — Yer o‘qining qiyaligini — 3D modelda kuzatamiz. Shuningdek, quyosh turishi va kun-tun tengligi nima ekanini, Toshkentda kun uzunligi va Quyosh balandligi yil davomida qanday o‘zgarishini raqamlar bilan ko‘rib chiqamiz.'
    ]},
    {sarlavha:'Yerning ikki harakati va o‘q qiyaligi', xatboshilar:[
      'Yer bir vaqtda ikki harakatda qatnashadi. Birinchisi — o‘z o‘qi atrofida g‘arbdan sharqqa aylanish; u kun va tun almashinuvini beradi. Quyoshga nisbatan bir aylanish (Quyosh sutkasi) 24 soat, yulduzlarga nisbatan esa ≈23 soat 56 daqiqa. Ikkinchisi — Quyosh atrofida orbita bo‘ylab harakat; bir to‘liq aylanish (tropik yil) ≈365,24 sutka davom etadi.',
      'Yer o‘qi orbita tekisligiga perpendikulyar emas: u perpendikulyardan ≈23,44° ga og‘gan. Boshqacha aytganda, o‘q va orbita tekisligi orasidagi burchak ≈66,56°. Eng muhimi — Yer Quyosh atrofida aylanganda o‘q yo‘nalishi fazoda deyarli o‘zgarmaydi: shimoliy uchi doim Qutb yulduzi tomon qaragan.',
      'Shu ikki shart — qiyalik va yo‘nalishning saqlanishi — birgalikda fasllarni hosil qiladi. Orbitaning bir tomonida shimoliy yarimshar Quyoshga egilgan bo‘ladi, yarim yildan keyin esa orbitaning qarama-qarshi tomonida xuddi shu yarimshar Quyoshdan teskari egilgan bo‘lib qoladi.',
      '3D sahnada Yerni orbitaning to‘rt nuqtasiga qo‘yib, o‘q har doim bir tomonga qarab turganini kuzating. O‘q Quyoshga «tomon» yoki «teskari» egilgandek ko‘rinishi Yerning orbitadagi o‘rniga bog‘liq, o‘qning o‘zi esa burilmaydi. Bu nuqta o‘quvchilar eng ko‘p chalkashadigan joy, shuning uchun uni modelda sekin aylantirib tekshirish foydali.'
    ]},
    {sarlavha:'Nurlar burchagi va kun uzunligi', xatboshilar:[
      'Yarimshar Quyoshga egilganda ikki narsa sodir bo‘ladi. Birinchidan, Quyosh nurlari sirtga tikroq tushadi. Tik tushgan nur dastasi kichik maydonni yoritadi va har bir kvadrat metrga ko‘proq energiya beradi. Qiya tushgan xuddi shu dasta kattaroq maydonga tarqaladi, shuning uchun har bir kvadrat metr kamroq isiydi. Buni qo‘l chirog‘ini devorga to‘g‘ri va qiya tutib tekshirish mumkin.',
      'Ikkinchidan, egilgan yarimsharda kun uzunroq bo‘ladi: Quyosh osmonda uzoqroq turadi va sirt ko‘proq vaqt isiydi, tun esa qisqa bo‘lgani uchun kam soviydi. Ikkala omil birga yozni issiq qiladi. Qishda aksincha: nurlar qiya, kun qisqa, tun uzun.',
      'Tushki Quyosh balandligini oddiy formula bilan hisoblash mumkin: h = 90° − φ + δ. Bu yerda φ — joyning geografik kengligi, δ — Quyosh og‘ishi, u yil davomida +23,44° (yozgi quyosh turishi) dan −23,44° (qishki quyosh turishi) gacha o‘zgaradi. Toshkent uchun φ ≈ 41,3° bo‘lgani sababli, tushki Quyosh yozda ≈72°, kun-tun tengligida ≈49°, qishda esa atigi ≈25° balandlikka ko‘tariladi.',
      'Qishki tushki balandlik ≈25° bo‘lganda, 1 m balandlikdagi tayoqning soyasi taxminan 2,1 m bo‘ladi, yozgi ≈72° da esa atigi ≈0,3 m. Bir xil tayoq soyasining yil davomida qanday o‘zgarishini maktab hovlisida o‘lchab, Quyosh balandligini o‘zingiz aniqlashingiz mumkin — qadimgi astronomlar ham gnomon deb ataluvchi shunday tayoqdan foydalangan.'
    ]},
    {sarlavha:'Quyosh turishi va kun-tun tengligi', xatboshilar:[
      'Yil davomida to‘rtta muhim nuqta bor. Taxminan 20–21-iyunda yozgi quyosh turishi sodir bo‘ladi: shimoliy yarimshar Quyoshga eng ko‘p egilgan, Quyosh tushda Shimoliy tropik (≈23,44° sh.k.) ustida tik turadi, shimoliy yarimsharda eng uzun kun. Shimoliy qutb doirasidan (≈66,56°) shimolda Quyosh botmaydi — qutb kuni.',
      'Taxminan 21–22-dekabrda qishki quyosh turishi: Quyosh Janubiy tropik ustida tik, shimoliy yarimsharda eng qisqa kun, qutb doirasidan shimolda esa Quyosh chiqmaydi — qutb tuni. 2026-yilda bu hodisa UTC bo‘yicha 21-dekabrga, Toshkent vaqti bilan esa 22-dekabr tuniga to‘g‘ri keladi.',
      'Taxminan 20–21-martda va 22–23-sentabrda kun-tun tengligi bo‘ladi: Quyosh ekvator ustida tik turadi, ikkala yarimshar teng yoritiladi va butun Yerda kun va tun deyarli teng. Amalda kunduzgi yorug‘lik 12 soatdan bir necha daqiqa ko‘proq davom etadi, chunki atmosfera nurlarni sindiradi va Quyosh chiqishi diskning yuqori chetiga qarab belgilanadi. Bahorgi kun-tun tengligi Navro‘z bayramiga to‘g‘ri keladi.'
    ]},
    {sarlavha:'O‘zbekistonda fasllar: Toshkent misoli', xatboshilar:[
      'Toshkent taxminan 41,3° shimoliy kenglikda joylashgan. timeanddate.com hisobiga ko‘ra, 2026-yilda yozgi quyosh turishi kuni Toshkentda kunduzgi yorug‘lik ≈15 soat 09 daqiqa, qishki quyosh turishi kuni esa ≈9 soat 11 daqiqa davom etadi. Farq taxminan 6 soat. Ekvatorda bu farq deyarli yo‘q, qutb doiralaridan narida esa kun 24 soat yoki 0 soat bo‘lishi mumkin.',
      'Eng issiq kunlar yozgi quyosh turishiga emas, iyul oyiga to‘g‘ri keladi, eng sovuq kunlar esa odatda yanvarda. Sababi — yer va suv issiqlikni to‘plash va yo‘qotishga vaqt talab qiladi. Iyun oxirida ham sirt olayotgan energiya yo‘qotayotganidan ko‘p bo‘lib qoladi, shuning uchun harorat yana bir necha hafta ko‘tarilaveradi.',
      'Kundalik hayotda va ob-havo ma’lumotlarida fasllar oy boshidan hisoblanadi: bahor 1-martdan, yoz 1-iyundan, kuz 1-sentabrdan, qish 1-dekabrdan. Astronomik fasllar esa quyosh turishi va kun-tun tengligi kunlaridan boshlanadi. Shuning uchun turli manbalarda «bahor boshlandi» degan sana ikki xil bo‘lishi mumkin — ikkalasi ham o‘z ta’rifi bo‘yicha to‘g‘ri.'
    ]},
    {sarlavha:'Qiziq oqibatlar va ko‘p uchraydigan xatolar', xatboshilar:[
      'Yer orbitasi to‘liq aylana bo‘lmagani uchun fasllar davomiyligi bir xil emas. Kepler qonuniga ko‘ra Yer Quyoshdan uzoqlashganda sekinroq harakatlanadi, shuning uchun shimoliy yarimsharda astronomik bahor va yoz birga ≈186 kun, kuz va qish esa ≈179 kun davom etadi.',
      'Birinchi xato — fasllarni masofa bilan tushuntirish; perigeliy yanvarda ekanini eslang. Ikkinchi xato — «kun-tun tengligida faqat ekvatorda kun va tun teng» deb o‘ylash: aslida bu kuni butun Yerda kun va tun deyarli teng. Uchinchi xato — Yer o‘qi yil davomida «tebranadi» deb tasavvur qilish: o‘q yo‘nalishi deyarli o‘zgarmaydi, o‘zgaradigani — Yerning orbitadagi o‘rni.',
      'To‘rtinchi xato — janubiy yarimsharda ham fasllar bizniki bilan bir vaqtda deb hisoblash. Iyunda Avstraliya, Argentina va Janubiy Afrikada qish bo‘ladi. Agar Yer o‘qi qiya bo‘lmaganida, Quyosh har kuni ekvator ustida turar, kun va tun hamma joyda doim teng bo‘lar va fasllar deyarli sezilmas edi.'
    ]}
  ],
  formulalar:[
    ['h = 90° − φ + δ','Tushki Quyosh balandligi (φ — kenglik, δ — Quyosh og‘ishi)'],
    ['δ: +23,44° → 0° → −23,44°','Quyosh og‘ishi: yozgi quyosh turishi → kun-tun tengligi → qishki quyosh turishi'],
    ['90° − 23,44° = 66,56°','Qutb doiralari kengligi'],
    ['Toshkent: 90° − 41,3° + 23,44° ≈ 72°','Yozgi quyosh turishida tushki balandlik'],
    ['Toshkent: 90° − 41,3° − 23,44° ≈ 25°','Qishki quyosh turishida tushki balandlik']
  ],
  qiziqarli:[
    'Yer Quyoshga yanvar boshida (≈147,1 mln km) eng yaqin, iyul boshida (≈152,1 mln km) eng uzoq bo‘ladi — lekin O‘zbekistonda yanvar qish.',
    'Toshkentda eng uzun va eng qisqa kun farqi taxminan 6 soat: ≈15 soat 09 daq va ≈9 soat 11 daq (2026).',
    'Shimoliy yarimsharda astronomik bahor va yoz ≈186 kun, kuz va qish ≈179 kun davom etadi — Yer afeliy yaqinida sekinroq harakatlanadi.',
    'Kun-tun tengligida ham kunduzgi yorug‘lik 12 soatdan bir necha daqiqa uzun — atmosfera Quyosh nurini sindiradi.',
    'Navro‘z bahorgi kun-tun tengligi kunlariga to‘g‘ri keladigan qadimiy bayram.'
  ],
  lugat:[
    ['Yil fasli','Yilning harorat va kun uzunligi bo‘yicha farqlanadigan to‘rt qismidan biri.'],
    ['Yer o‘qi','Yer aylanadigan, qutblardan o‘tuvchi xayoliy chiziq.'],
    ['O‘q qiyaligi','O‘qning orbita tekisligiga perpendikulyardan og‘ishi, ≈23,44°.'],
    ['Orbita','Yerning Quyosh atrofidagi harakat yo‘li.'],
    ['Quyosh turishi','Quyosh tushki balandligi yil davomida eng katta yoki eng kichik bo‘ladigan kun.'],
    ['Kun-tun tengligi','Quyosh ekvator ustida tik turib, kun va tun deyarli teng bo‘ladigan kun.'],
    ['Tropik','Quyosh yilda bir marta tik turadigan eng chekka parallel, ≈23,44°.'],
    ['Qutb doirasi','≈66,56° kenglikdagi parallel; undan narida qutb kuni va tuni bo‘ladi.'],
    ['Qutb kuni / tuni','Quyosh bir sutkadan ortiq botmaydigan / chiqmaydigan davr.'],
    ['Perigeliy','Orbitaning Quyoshga eng yaqin nuqtasi.'],
    ['Afeliy','Orbitaning Quyoshdan eng uzoq nuqtasi.'],
    ['Quyosh balandligi','Quyoshning ufqdan burchak bo‘yicha balandligi.']
  ],
  manba:GEO5+' — «Yerning Quyosh atrofida aylanishi. Yil fasllari»; NASA Science «What Causes the Seasons?» (spaceplace.nasa.gov/seasons/) va NASA «Earth Fact Sheet» (o‘q qiyaligi, perigeliy, afeliy); timeanddate.com — «Sunrise and sunset times in Tashkent» (2026: 21-iyun ≈15 s 09 daq, 22-dekabr ≈9 s 11 daq) va 2026-yil kun-tun tengligi/quyosh turishi vaqtlari (UTC: 20-mart 14:46, 21-iyun 08:25, 23-sentabr 00:05, 21-dekabr 20:50); Wikipedia (inglizcha): «Season», «Solstice», «Equinox», «Axial tilt», «Apsis». Fasllar davomiyligi (≈92,8/93,6/89,8/89,0 kun) — Wikipedia «Season», yilga qarab bir necha soat farq qiladi. Tushki Quyosh balandligi formula bilan hisoblangan.',
  ishlanma:{
    sinf:'5-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D model, qo‘l chirog‘i bilan tajriba, muammoli savol, juftlikda ishlash',
    maqsad:{talimiy:'Yil fasllari almashinishining sababi — Yer o‘qining qiyaligi va Quyosh atrofida aylanishi, quyosh turishi va kun-tun tengligi tushunchalarini o‘rgatish.',
      tarbiyaviy:'Keng tarqalgan noto‘g‘ri tasavvurlarni dalil bilan tekshirish madaniyati, tabiat hodisalariga ilmiy qarash, milliy bayram (Navro‘z) ning astronomik asosini bilish.',
      rivojlantiruvchi:'Modeldan xulosa chiqarish, sonli ma’lumotlarni taqqoslash, sabab-oqibat bog‘lanishini topish.'},
    natijalar:['Fasllar sababi masofa emas, o‘q qiyaligi ekanini dalil bilan tushuntiradi','To‘rt muhim sanani (quyosh turishi, kun-tun tengligi) aytadi','Toshkentda yoz va qish kun uzunligini solishtiradi','Janubiy yarimsharda fasllar teskari ekanini izohlaydi'],
    jihozlar:['MAKON 3D sahnasi «Yil fasllari»','Proyektor','Qo‘l chirog‘i va globus (yoki koptok va qalam)','Toshkent uchun kun uzunligi jadvali (tarqatma)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Muammoli savol.</b> «Yozda Yer Quyoshga yaqinmi?» — ovoz beradi; keyin perigeliy yanvarda ekanini aytadi.','Fikr bildiradi, qarama-qarshilikni sezadi.'],
      ['8–16','<b>O‘q qiyaligi.</b> MAKON 3D da Yerni orbita bo‘ylab ko‘rsatadi; o‘q yo‘nalishi o‘zgarmasligini kuzattiradi.','Sxema chizadi.'],
      ['16–22','<b>Tajriba.</b> Qo‘l chirog‘ini stolga tik va qiya tutib, yoritilgan dog‘ o‘lchamini solishtirish.','Juftlikda tajriba, xulosa yozadi.'],
      ['22–32','<b>To‘rt nuqta.</b> 3D da bahor/yoz/kuz/qish holatlarini almashtiradi; Toshkent kun uzunligi va Quyosh balandligi.','Jadvalni to‘ldiradi.'],
      ['32–42','<b>Mustahkamlash.</b> MAKON «Faslni aniqlang» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['O‘q qiyaligi','≈23,44°.'],['Quyosh turishi','Eng uzun/eng qisqa kun.'],['Kun-tun tengligi','Kun ≈ tun.'],['Tropik','≈23,44° kenglik.'],['Qutb doirasi','≈66,56° kenglik.']],
    savollar:[['Fasllar nima sababdan almashadi?','O‘q qiyaligi va Quyosh atrofida aylanish'],['Eng uzun kun qachon?','≈20–21-iyun'],['Kun-tun tengligi sanalari?','≈20–21-mart, ≈22–23-sentabr'],['Yer Quyoshga qachon eng yaqin?','Yanvar boshida'],['Iyunda Avstraliyada qaysi fasl?','Qish']],
    uy:'Darslikdagi mavzuni o‘qish; bir hafta davomida uydagi soat bo‘yicha Quyosh chiqishi va botishini yozib, kun uzunligini hisoblash; «Agar Yer o‘qi qiya bo‘lmaganida nima o‘zgarardi?» mavzusida 5–6 gapli matn yozish.',
    manba:GEO5+'; NASA Space Place «What Causes the Seasons?»; timeanddate.com (Toshkent, 2026)'
  }
}
});
})();
