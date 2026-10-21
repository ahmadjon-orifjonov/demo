/* MAKON — matematika va informatika darslari (v3.12): kvadrat funksiya (sahna 'funksiya') va ikkilik sanoq sistemasi + mantiqiy elementlar (sahna 'mantiq').
   Faqat mazmun. Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi. Tekshiruv: manba/tekshiruv/v312_matem_info.md */
(function(){
window.MAKON_DARS = window.MAKON_DARS || {};

const ALG = '8–9-sinf «Algebra» darsliklari (O‘zbekiston) — «Kvadrat funksiya», «Kvadrat tenglamalar» boblari; Wikipedia (inglizcha): «Quadratic function», «Quadratic equation», «Parabola», «Discriminant», «Completing the square», «Al-Jabr», «Muhammad ibn Musa al-Khwarizmi»; MacTutor (St Andrews): «Apollonius of Perga», «Sylvester’s Discriminant»; Encyclopaedia Britannica: «Apollonius of Perga», «Dialogues Concerning Two New Sciences»';
const INF = '7–8-sinf «Informatika» darsliklari (O‘zbekiston) — «Sanoq sistemalari», «Mantiq asoslari» boblari; Wikipedia (inglizcha): «Binary number», «Hexadecimal», «Logic gate», «Truth table», «Bit», «Byte», «George Boole», «Gottfried Wilhelm Leibniz», «A Symbolic Analysis of Relay and Switching Circuits», «Model K (calculator)»; Stanford Encyclopedia of Philosophy «George Boole»; historyofinformation.com (Leybnits 1703, Shennon 1937, Stibits 1937)';

Object.assign(window.MAKON_DARS, {

/* ============ 1. KVADRAT FUNKSIYA VA PARABOLA ============ */
'algebra-kvadrat': {
  fan:'matematika', qisqaNom:'Parabola', nom:'Kvadrat funksiya va parabola',
  qisqa:'8–9-sinf · Algebra · «Kvadrat funksiya»',
  sahna:'funksiya',
  kor:{
    sarlavha:'Uchta son — butun egri chiziq',
    matn:'y = ax² + bx + c ko‘rinishidagi funksiya kvadrat funksiya deyiladi, uning grafigi esa parabola. Uchta koeffitsiyent — a, b va c — parabolaning qayerda turishini, qaysi tomonga ochilishini, qanchalik «tor» yoki «keng» ekanini to‘liq belgilaydi. Diskriminant D = b² − 4ac esa parabola Ox o‘qini necha nuqtada kesishini oldindan aytib beradi. Slayderlarni suring va parabolaning uchi, simmetriya o‘qi hamda ildizlari qanday ko‘chishini kuzating.',
    punktlar:['<b>Kvadrat funksiya:</b> y = ax² + bx + c, bunda a ≠ 0','<b>a</b> — tarmoqlar yo‘nalishi (a > 0 — yuqoriga, a < 0 — pastga) va parabolaning «kengligi»','<b>Uchi:</b> x₀ = −b/(2a), y₀ = −D/(4a); simmetriya o‘qi — x = x₀ to‘g‘ri chizig‘i','<b>Diskriminant:</b> D = b² − 4ac; D > 0 — 2 ildiz, D = 0 — 1 ildiz, D < 0 — haqiqiy ildiz yo‘q']
  },
  bolimlar:[
    {sarlavha:'Koeffitsiyentlar grafikka qanday ta’sir qiladi', jadval:[
      ['a > 0','Tarmoqlar yuqoriga qaragan; uchi — eng past nuqta (funksiyaning eng kichik qiymati)'],
      ['a < 0','Tarmoqlar pastga qaragan; uchi — eng yuqori nuqta (eng katta qiymat)'],
      ['|a| > 1','Parabola y = x² ga nisbatan «tor» (tikroq) bo‘ladi'],
      ['0 < |a| < 1','Parabola y = x² ga nisbatan «keng» (yotiqroq) bo‘ladi'],
      ['c','Oy o‘qi bilan kesishish nuqtasi: (0; c), chunki x = 0 da y = c'],
      ['b (a bilan birga)','Uchining gorizontal holatini belgilaydi: x₀ = −b/(2a). b = 0 bo‘lsa, uchi Oy o‘qida yotadi'],
      ['a = 0','Funksiya kvadrat bo‘lmay qoladi: y = bx + c — to‘g‘ri chiziq. Shuning uchun sahnada a = 0 tanlab bo‘lmaydi']
    ]},
    {sarlavha:'Diskriminant va ildizlar soni', jadval:[
      ['D > 0','Ikkita har xil ildiz: x₁,₂ = (−b ± √D)/(2a) — parabola Ox ni 2 nuqtada kesadi. Misol: x² − 4x + 3, D = 4, x = 1 va x = 3'],
      ['D = 0','Bitta (ikki karrali) ildiz: x = −b/(2a) — parabola uchi Ox o‘qida yotadi. Misol: x² − 4x + 4, D = 0, x = 2'],
      ['D < 0','Haqiqiy ildiz yo‘q — parabola Ox o‘qini kesmaydi. Misol: x² + 2x + 3, D = −8'],
      ['Ildizlar va uchi','Ikki ildiz bo‘lsa, uchi ular o‘rtasida: x₀ = (x₁ + x₂)/2'],
      ['Uchining ordinatasi','y₀ = −D/(4a): a > 0 va D > 0 bo‘lsa, uchi Ox dan pastda (y₀ < 0)']
    ], matn:'«Diskriminant» atamasi lotincha «discriminare» — «ajratmoq, farqlamoq» so‘zidan olingan: bu son ildizlarning uch holatini bir-biridan ajratib beradi. Atamani 1851-yilda ingliz matematigi Jeyms Jozef Silvestr kiritgan.'},
    {sarlavha:'Namunaviy funksiyalar (hisoblab tekshirilgan)', jadval:[
      ['y = x² − 4x + 3','D = 4 · ildizlar 1 va 3 · uchi (2; −1) · Oy bilan (0; 3)'],
      ['y = −x² + 2x + 3','D = 16 · ildizlar −1 va 3 · uchi (1; 4) · tarmoqlar pastga'],
      ['y = x² − 6x + 9','D = 0 · bitta ildiz 3 · uchi (3; 0) — Ox ga urinadi'],
      ['y = 2x² + 4x + 5','D = −24 · ildiz yo‘q · uchi (−1; 3)'],
      ['y = 0,5x² − 2','D = 4 · ildizlar −2 va 2 · uchi (0; −2) · y = x² dan kengroq'],
      ['y = x² + 10x − 39','D = 256 · ildizlar 3 va −13 · al-Xorazmiy masalasi: «kvadrat va o‘nta ildiz 39 ga teng»']
    ]},
    {sarlavha:'Parabola atrofimizda', jadval:[
      ['Otilgan jism yo‘li','Havo qarshiligi hisobga olinmasa, gorizontga burchak ostida otilgan tosh yoki to‘p parabola bo‘ylab uchadi (Galiley, 1638)'],
      ['Favvora va suv oqimi','Quvurdan qiya otilgan suv oqimi ham shu sababga ko‘ra parabola shaklini oladi'],
      ['Sun’iy yo‘ldosh antennasi','Parabolik ko‘zgu o‘qqa parallel kelgan to‘lqinlarni bitta nuqtaga — fokusga yig‘adi; qabul qilgich shu nuqtaga qo‘yiladi'],
      ['Fara va projektor','Aksincha: fokusdagi chiroq nuri parabolik qaytargichdan parallel dasta bo‘lib chiqadi'],
      ['Teleskop ko‘zgusi','Zamonaviy ko‘zguli teleskoplarda parabolik ko‘zgular ishlatiladi'],
      ['Iqtisod va fizika masalalari','Yuza, foyda yoki balandlikning eng katta (eng kichik) qiymatini topish — parabola uchini topish demak']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Eng sodda parabola: y = x²', matn:'a = 1, b = 0, c = 0. Grafik koordinata boshidan o‘tadi va Oy o‘qiga nisbatan simmetrik: x = 2 da ham, x = −2 da ham y = 4. Uchi (0; 0), D = 0 — Ox o‘qiga faqat uchida tegadi.', funk:{a:1,b:0,c:0}},
    {sarlavha:'a ning ishorasi: tarmoqlar pastga', matn:'a = −1 qiling: y = −x². Tarmoqlar pastga qaradi, uchi endi eng yuqori nuqta. Keyin a ni 2 yoki 0,5 qilib ko‘ring: |a| katta bo‘lsa parabola torayadi, kichik bo‘lsa kengayadi.', funk:{a:-1,b:0,c:0}},
    {sarlavha:'c — yuqoriga-pastga siljish', matn:'y = x² − 4: parabola y = x² dan 4 birlik pastga tushdi. Oy o‘qini (0; −4) da kesadi, D = 0 − 4·1·(−4) = 16 > 0, ildizlar x = −2 va x = 2.', funk:{a:1,b:0,c:-4}},
    {sarlavha:'b — uchini yon tomonga suradi', matn:'y = x² − 4x + 3. Uchi: x₀ = −(−4)/(2·1) = 2, y₀ = 4 − 8 + 3 = −1, ya’ni (2; −1). Simmetriya o‘qi x = 2. D = 16 − 12 = 4, ildizlar x = (4 ± 2)/2: 1 va 3 — ular uchidan bir xil masofada.', funk:{a:1,b:-4,c:3}},
    {sarlavha:'D = 0: bitta ildiz', matn:'c ni bittaga oshiring: y = x² − 4x + 4 = (x − 2)². D = 16 − 16 = 0. Parabola uchi (2; 0) Ox o‘qida yotadi — ikki ildiz bitta nuqtaga «qo‘shilib ketdi».', funk:{a:1,b:-4,c:4}},
    {sarlavha:'D < 0: ildiz yo‘q', matn:'y = −x² + 2x − 3. D = 4 − 4·(−1)·(−3) = 4 − 12 = −8 < 0. Uchi (1; −2) Ox dan pastda, tarmoqlar ham pastga — parabola Ox o‘qiga hech qachon yetmaydi.', funk:{a:-1,b:2,c:-3}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Parabolani boshqaring',
    topshiriqlar:[
      {shart:'Tarmoqlari <b>pastga</b> qaragan va Ox o‘qini <b>ikki nuqtada</b> kesadigan parabola hosil qiling.', hodisa:'funksiya', kod:"ev.a<0 && ev.ildiz===2", izoh:'Masalan, a = −1, b = 0, c = 4: y = −x² + 4, <b>D = 16, ildizlar −2 va 2</b>. a < 0 bo‘lganda ikki ildiz uchun uchi Ox dan yuqorida bo‘lishi kerak.'},
      {shart:'Ox o‘qini <b>umuman kesmaydigan</b> parabola hosil qiling.', hodisa:'funksiya', kod:"ev.ildiz===0", izoh:'Buning sharti <b>D < 0</b>. Masalan, a = 1, b = 0, c = 1: D = 0 − 4 = −4.'},
      {shart:'Ox o‘qiga <b>faqat bitta nuqtada tegadigan</b> parabola hosil qiling (b ≠ 0 bo‘lsin).', hodisa:'funksiya', kod:"ev.ildiz===1 && ev.b!==0", izoh:'Buning sharti <b>D = b² − 4ac = 0</b>. Masalan, a = 1, b = 2, c = 1: y = (x + 1)², ildiz x = −1.'},
      {shart:'Parabolaning uchi <b>(2; −1)</b> nuqtada bo‘lsin.', hodisa:'funksiya', kod:"Math.abs(ev.x0-2)<0.001 && Math.abs(ev.y0+1)<0.001", izoh:'Masalan, <b>a = 1, b = −4, c = 3</b>: x₀ = 4/2 = 2, y₀ = 4 − 8 + 3 = −1. Boshqa yechim ham bor: a = 0,5, b = −2, c = 1.'},
      {shart:'Parabola Oy o‘qini <b>(0; −3)</b> nuqtada kessin va diskriminanti <b>D = 16</b> bo‘lsin.', hodisa:'funksiya', kod:"ev.c===-3 && ev.D===16", izoh:'c = −3 bo‘lsa, D = b² + 12a = 16. Slayder qiymatlarida yagona yechim: <b>a = 1, b = 2 yoki b = −2</b>. y = x² + 2x − 3 ning ildizlari 1 va −3, y = x² − 2x − 3 niki −1 va 3.'}
    ]},
  test:[
    {s:'y = 2x² − 8x + 3 parabolasining simmetriya o‘qi qaysi?', v:['x = −2','x = 2','x = 4','x = 8'], t:1, izoh:'x₀ = −b/(2a) = 8/4 = 2, ya’ni <b>x = 2</b>.'},
    {s:'x² − 6x + 5 = 0 tenglamaning ildizlari?', v:['−1 va −5','2 va 3','−2 va 3','1 va 5'], t:3, izoh:'D = 36 − 20 = 16, x = (6 ± 4)/2: <b>1 va 5</b>.'},
    {s:'y = x² + 4x + 5 parabolasi Ox o‘qini necha nuqtada kesadi?', v:['Hech bir nuqtada','Bitta nuqtada','Ikki nuqtada','Cheksiz ko‘p nuqtada'], t:0, izoh:'D = 16 − 20 = −4 < 0 — <b>hech bir nuqtada</b> kesmaydi.'},
    {s:'y = ax² + bx + c da a < 0 bo‘lsa, parabola tarmoqlari qayoqqa qaragan?', v:['Yuqoriga','Chapga','Pastga','O‘ngga'], t:2, izoh:'a < 0 bo‘lsa tarmoqlar <b>pastga</b> qaragan, uchi esa eng yuqori nuqta.'},
    {s:'y = 3x² − x + 7 grafigi Oy o‘qini qaysi nuqtada kesadi?', v:['(0; 3)','(0; −1)','(7; 0)','(0; 7)'], t:3, izoh:'x = 0 da y = c = 7, ya’ni <b>(0; 7)</b>.'},
    {s:'y = x² − 4x + 1 parabolasining uchi?', v:['(2; −3)','(−2; 13)','(2; 1)','(4; 1)'], t:0, izoh:'x₀ = 4/2 = 2, y₀ = 4 − 8 + 1 = −3: <b>(2; −3)</b>.'},
    {s:'Diskriminant D = 0 bo‘lsa, kvadrat tenglama nechta ildizga ega?', v:['Ikkita har xil ildiz','Bitta (ikki karrali) ildiz','Ildizi yo‘q','Cheksiz ko‘p'], t:1, izoh:'D = 0 da <b>bitta (ikki karrali) ildiz</b>: x = −b/(2a).'},
    {s:'y = −x² + 4 funksiyaning eng katta qiymati?', v:['0','−4','4','Eng katta qiymati yo‘q'], t:2, izoh:'Uchi (0; 4), tarmoqlar pastga — eng katta qiymat <b>4</b>.'},
    {s:'Qaysi parabola eng «tor»?', v:['y = 0,5x²','y = x²','y = −x²','y = 2x²'], t:3, izoh:'|a| qancha katta bo‘lsa, parabola shuncha tor: <b>y = 2x²</b> (|a| = 2).'},
    {s:'x² − 7x + 10 = 0 tenglama ildizlarining yig‘indisi (Viyet teoremasi)?', v:['7','−7','10','−10'], t:0, izoh:'x₁ + x₂ = −b/a = <b>7</b> (ildizlar 2 va 5), ko‘paytmasi esa c/a = 10.'}
  ],
  yordamchi:[
    {s:'Nega a = 0 bo‘lishi mumkin emas?', j:'a = 0 bo‘lsa, x² qatnashgan had yo‘qoladi va y = bx + c — chiziqli funksiya qoladi, uning grafigi to‘g‘ri chiziq. Shuning uchun kvadrat funksiya ta’rifida a ≠ 0 sharti bor va sahnadagi a slayderi 0 ni o‘tkazib yuboradi.', kalit:['a','nol','0']},
    {s:'Uchining ordinatasini qanday tez topsa bo‘ladi?', j:'Ikki yo‘l bor: y₀ = −D/(4a) formulasi yoki topilgan x₀ ni funksiyaga qo‘yish. Masalan, y = x² − 4x + 3 da x₀ = 2, y₀ = 2² − 4·2 + 3 = −1. Ikkinchi yo‘lda xato qilish ehtimoli kamroq.', kalit:['uchi','y0','ordinata']},
    {s:'D < 0 bo‘lsa, tenglamaning umuman yechimi yo‘qmi?', j:'Haqiqiy sonlar orasida yechim yo‘q — grafik Ox o‘qini kesmaydi. Kompleks sonlar to‘plamida esa ikkita ildiz bor; bu mavzu maktab kursining yuqori sinflarida yoki oliy matematikada o‘rganiladi.', kalit:['manfiy','diskriminant','kompleks']},
    {s:'Viyet teoremasi nima?', j:'Keltirilgan x² + px + q = 0 tenglama ildizlari uchun x₁ + x₂ = −p va x₁·x₂ = q. Umumiy holda ax² + bx + c = 0 uchun x₁ + x₂ = −b/a, x₁·x₂ = c/a. U ildizlarni tez tekshirishga yordam beradi.', kalit:['viyet','yig‘indi','ko‘paytma']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega aynan parabola?', xatboshilar:[
      'Maktab algebrasida uchraydigan funksiyalardan biri y = ax² + bx + c ko‘rinishidagi kvadrat funksiyadir. Bu yerda x — erkli o‘zgaruvchi, a, b va c — berilgan sonlar (koeffitsiyentlar), a esa albatta noldan farqli. ax² + bx + c ifodasi kvadrat uchhad deb ham ataladi. Uning grafigi — parabola deb ataluvchi silliq, simmetrik egri chiziq.',
      'Parabolani hayotda ko‘p uchratamiz. Havo qarshiligi hisobga olinmasa, qiya otilgan to‘p, favvoradan otilgan suv oqimi parabola bo‘ylab harakatlanadi. Sun’iy yo‘ldosh antennalari, avtomobil faralari va ko‘zguli teleskoplar parabolaning maxsus xossasi — parallel nurlarni bitta nuqtaga (fokusga) yig‘ish xossasidan foydalanadi.',
      'Bu darsda uchta koeffitsiyentning har biri grafikni qanday o‘zgartirishini, parabola uchi va simmetriya o‘qini topishni, diskriminant yordamida ildizlar sonini oldindan aytishni o‘rganamiz. Sahnada a, b va c slayderlari bor: ularni surib, har bir formulani ko‘z oldingizda tekshirishingiz mumkin.',
      'Kvadrat funksiya kvadrat tenglama bilan chambarchas bog‘langan. ax² + bx + c = 0 tenglamaning ildizlari — bu parabolaning Ox o‘qi bilan kesishgan nuqtalarining abssissalari. Demak, tenglamani yechish va grafikni o‘rganish bitta masalaning ikki tomonidir.'
    ]},
    {sarlavha:'a, b va c koeffitsiyentlarining ma’nosi', xatboshilar:[
      'a koeffitsiyenti parabolaning «xarakterini» belgilaydi. a > 0 bo‘lsa tarmoqlar yuqoriga qaraydi va funksiya eng kichik qiymatga ega bo‘ladi; a < 0 bo‘lsa tarmoqlar pastga qaraydi va eng katta qiymat mavjud. |a| ning kattaligi parabolaning qanchalik tik ko‘tarilishini ko‘rsatadi: y = 2x² da x = 1 bo‘lganda y = 2, y = 0,5x² da esa atigi 0,5. Shuning uchun |a| > 1 da parabola y = x² dan torroq, |a| < 1 da kengroq.',
      'c koeffitsiyentini topish eng oson: x = 0 bo‘lganda ax² va bx hadlar nolga aylanadi va y = c qoladi. Demak, parabola Oy o‘qini doim (0; c) nuqtada kesadi. a va b o‘zgarmay faqat c o‘zgarsa, butun parabola yuqoriga yoki pastga siljiydi, shakli esa o‘zgarmaydi.',
      'b koeffitsiyentining ta’siri murakkabroq: u a bilan birgalikda uchining gorizontal holatini belgilaydi, x₀ = −b/(2a). b o‘zgarganda parabola faqat yon tomonga emas, balki bir vaqtning o‘zida yuqoriga yoki pastga ham siljiydi. Sahnada b ni surib ko‘ring: uchi o‘zi ham parabolaga o‘xshash yo‘l chizadi.',
      'Bir muhim chegara holati: a = 0 bo‘lsa, funksiya kvadrat bo‘lmay qoladi — y = bx + c to‘g‘ri chiziqqa aylanadi. Shuning uchun ta’rifda a ≠ 0 sharti qo‘yiladi va sahnadagi a slayderi −3 dan 3 gacha 0,5 qadam bilan o‘zgarib, nolni o‘tkazib yuboradi.'
    ]},
    {sarlavha:'Parabola uchi va simmetriya o‘qi', xatboshilar:[
      'Parabolaning eng past (a > 0) yoki eng yuqori (a < 0) nuqtasi uning uchi deyiladi. Uchidan o‘tuvchi vertikal to‘g‘ri chiziq x = x₀ — simmetriya o‘qi: parabolaning bir tomonidagi har bir nuqtaning boshqa tomonda «ko‘zgudagi aksi» bor. Masalan, y = x² − 4x + 3 uchun x = 1 va x = 3 da ham y = 0, x = 0 va x = 4 da ham y = 3.',
      'Uchining koordinatalarini to‘la kvadrat ajratish usuli bilan topish mumkin. y = ax² + bx + c ni y = a(x − x₀)² + y₀ ko‘rinishiga keltirsak, x₀ = −b/(2a) va y₀ = −D/(4a) chiqadi. Masalan, x² − 4x + 3 = (x² − 4x + 4) − 1 = (x − 2)² − 1, demak uchi (2; −1). (x − 2)² hech qachon manfiy emas, shuning uchun funksiyaning eng kichik qiymati −1.',
      'Amalda x₀ ni formula bilan topib, keyin uni funksiyaga qo‘yish qulay. Masalan, y = −x² + 2x + 3 uchun x₀ = −2/(2·(−1)) = 1, y₀ = −1 + 2 + 3 = 4. Tarmoqlar pastga qaragani uchun bu funksiyaning eng katta qiymati 4.',
      'Uchini topish ko‘plab amaliy masalalarning kaliti. Perimetri 20 m bo‘lgan to‘rtburchak maydonning yuzi S = x(10 − x) = −x² + 10x; uchi x₀ = 5 da, ya’ni eng katta yuza 5 × 5 m li kvadratda — 25 m². Yuqoriga otilgan jismning eng baland nuqtasi, foydaning eng katta qiymati ham shu usul bilan topiladi.'
    ]},
    {sarlavha:'Diskriminant va ildizlar', xatboshilar:[
      'ax² + bx + c = 0 tenglamaning ildizlari x₁,₂ = (−b ± √D)/(2a) formula bilan topiladi, bunda D = b² − 4ac — diskriminant. Ildiz ostida turgan son manfiy bo‘lsa, haqiqiy sonlar orasida uning kvadrat ildizi yo‘q. Shuning uchun D ning ishorasi ildizlar sonini to‘liq aniqlaydi: D > 0 — ikkita, D = 0 — bitta, D < 0 — haqiqiy ildiz yo‘q.',
      'Grafik tilida bu shunday ko‘rinadi. a > 0 bo‘lsa, y₀ = −D/(4a) formulasidan: D > 0 da uchi Ox dan pastda — yuqoriga ochilgan parabola Ox ni ikki marta kesib o‘tadi; D = 0 da uchi aynan Ox ustida — parabola unga urinadi; D < 0 da uchi Ox dan yuqorida — kesishish yo‘q. a < 0 bo‘lsa, hammasi teskari: uchi yuqorida, parabola pastga ochiladi.',
      'Misollar: x² − 4x + 3 = 0 uchun D = 16 − 12 = 4, x = (4 ± 2)/2, ya’ni 1 va 3. x² − 4x + 4 = 0 uchun D = 0 va yagona ildiz x = 2. x² + 2x + 3 = 0 uchun D = 4 − 12 = −8, haqiqiy ildiz yo‘q. Ildizlarni Viyet teoremasi bilan tekshirish qulay: x₁ + x₂ = −b/a, x₁·x₂ = c/a; birinchi misolda 1 + 3 = 4 va 1·3 = 3.',
      'Ikki ildiz bo‘lganda uchi aynan ularning o‘rtasida yotadi: x₀ = (x₁ + x₂)/2. Bu simmetriya natijasi va hisobni tekshirish uchun yaxshi usul. Ildizlar ma’lum bo‘lsa, funksiyani y = a(x − x₁)(x − x₂) ko‘paytuvchilar ko‘rinishida ham yozish mumkin.'
    ]},
    {sarlavha:'Tarix: Bobildan al-Xorazmiy va Galileygacha', xatboshilar:[
      'Kvadrat tenglamaga olib keladigan masalalarni odamlar juda qadimdan yechgan. Taxminan miloddan avvalgi 2000-yillarga oid Bobil loy taxtachalarida bunday masalalar va ularni yechish qoidalari saqlanib qolgan: «p ning yarmini ol, kvadratga ko‘tar…» kabi ko‘rsatmalar hozirgi formulaning so‘zdagi ko‘rinishidir. Hind matematigi Braxmagupta 628-yilda aniq yechish qoidasini bayon qilgan.',
      'Algebra tarixida bizning yurtdoshimiz Muhammad ibn Muso al-Xorazmiy (taxminan 780 – taxminan 850) alohida o‘rin tutadi. U Xorazmdan chiqqan va Bag‘doddagi «Bayt al-hikma» (Donishmandlar uyi)da ishlagan. Taxminan 820-yilda yozilgan «Al-kitob al-muxtasar fi hisob al-jabr val-muqobala» asarida tenglamalarni oltita turga ajratib, ularni tizimli yechgan. «Algebra» so‘zi shu asar nomidagi «al-jabr» (tiklash — manfiy hadni tenglamaning boshqa tomoniga o‘tkazish) so‘zidan kelib chiqqan. Uning mashhur misoli: «kvadrat va o‘nta ildiz 39 ga teng», ya’ni x² + 10x = 39. Al-Xorazmiy to‘la kvadrat ajratish yo‘li bilan x = 3 ni topgan (manfiy ildiz −13 u davrda hisobga olinmagan).',
      'Al-Xorazmiyning hind raqamlari va hisob haqidagi boshqa asari XII asrda lotin tiliga «Algoritmi de numero Indorum» nomi bilan tarjima qilingan. Muallif ismining lotincha shakli «Algoritmi» dan «algoritm» so‘zi kelib chiqqan. Uning algebra kitobi Yevropa universitetlarida uzoq vaqt asosiy matematika darsligi bo‘lib xizmat qilgan.',
      'Parabola egri chizig‘ini qadimgi yunonlar konus kesimlari sifatida o‘rgangan: dastlab miloddan avvalgi IV asrda Menexm, keyin Arximed parabola segmenti yuzini hisoblagan. «Parabola», «ellips» va «giperbola» nomlarini Apolloniy Pergskiy o‘zining sakkiz kitobli «Konus kesimlari» asarida kiritgan; «parabole» yunoncha «qo‘yish, tatbiq etish» degan ma’noni bildiradi. Apolloniyning tug‘ilgan yili manbalarda turlicha: MacTutor taxminan mil. av. 262-yil, Britannica taxminan mil. av. 240-yil deydi; vafoti ikkalasida ham taxminan mil. av. 190-yil. Galileo Galiley 1638-yilda nashr etilgan «Ikki yangi fan haqida suhbatlar» asarida otilgan jism parabola bo‘ylab harakatlanishini ko‘rsatgan. Kvadrat tenglama yechimining umumiy formulasini Simon Stevin 1594-yilda keltirib chiqargan, Rene Dekart 1637-yilda hozirgi ko‘rinishga yaqin shaklda nashr qilgan.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — uchining abssissasida ishorani yo‘qotish. x₀ = −b/(2a) formulasida minus bor: y = x² − 4x + 3 da b = −4, shuning uchun x₀ = −(−4)/2 = +2, −2 emas. Ikkinchi xato — diskriminantda manfiy c ni noto‘g‘ri qo‘yish: y = x² + 2x − 3 uchun D = 4 − 4·1·(−3) = 4 + 12 = 16, 4 − 12 emas.',
      'Uchinchi xato — c ni Ox bilan kesishish nuqtasi deb o‘ylash. c — Oy o‘qi bilan kesishish (x = 0 dagi qiymat). Ox bilan kesishish nuqtalari — ildizlar va ular diskriminant orqali topiladi. To‘rtinchi xato — a ning ishorasini unutib, pastga ochilgan parabola uchini «eng kichik qiymat» deb atash; a < 0 da uchi eng katta qiymatni beradi.',
      'Beshinchi xato — D < 0 bo‘lsa «funksiya mavjud emas» deb o‘ylash. Funksiya har qanday x da aniqlangan va grafigi bor; faqat u Ox o‘qini kesmaydi, ya’ni y = 0 tenglamasining haqiqiy yechimi yo‘q. Oltinchi xato — x₁,₂ formulasida kasr chizig‘ini faqat √D ning ostiga qo‘yish: 2a ga −b ham, ±√D ham bo‘linadi.',
      'Tekshirish uchun oddiy odat: topilgan ildizni tenglamaga qo‘yib ko‘ring, uchi ildizlar o‘rtasida ekanini va Viyet teoremasi bajarilishini tekshiring. Sahnada esa slayderlarni o‘z misolingizdagi qiymatlarga qo‘yib, javobni grafikda solishtiring.'
    ]}
  ],
  formulalar:[
    ['y = ax² + bx + c,  a ≠ 0','Kvadrat funksiya (umumiy ko‘rinish)'],
    ['D = b² − 4ac','Diskriminant'],
    ['x₁,₂ = (−b ± √D) / (2a)','Kvadrat tenglama ildizlari (D ≥ 0)'],
    ['x₀ = −b / (2a),  y₀ = −D / (4a)','Parabola uchining koordinatalari'],
    ['y = a(x − x₀)² + y₀','Uchi orqali yozilgan ko‘rinish (to‘la kvadrat ajratish)'],
    ['y = a(x − x₁)(x − x₂)','Ildizlar orqali ko‘paytuvchilarga ajratish (D ≥ 0)'],
    ['x₁ + x₂ = −b/a,  x₁·x₂ = c/a','Viyet teoremasi'],
    ['(0; c)','Oy o‘qi bilan kesishish nuqtasi']
  ],
  qiziqarli:[
    '«Algebra» so‘zi al-Xorazmiy asari nomidagi «al-jabr» dan, «algoritm» so‘zi esa uning ismining lotincha shakli «Algoritmi» dan kelib chiqqan.',
    'Al-Xorazmiyning mashhur masalasi x² + 10x = 39 ni u to‘la kvadrat ajratib yechgan: 5² = 25, 39 + 25 = 64, √64 = 8, 8 − 5 = 3.',
    '«Parabola» nomini Apolloniy Pergskiy bergan; yunoncha «parabole» — «qo‘yish, tatbiq etish».',
    'Galiley 1638-yilda otilgan jism (havo qarshiligisiz) parabola chizib uchishini isbotlagan.',
    '«Diskriminant» atamasini 1851-yilda ingliz matematigi J. J. Silvestr kiritgan; so‘z lotincha «farqlamoq» ma’nosidagi fe’ldan olingan.'
  ],
  lugat:[
    ['Kvadrat funksiya','y = ax² + bx + c (a ≠ 0) ko‘rinishidagi funksiya.'],
    ['Kvadrat uchhad','ax² + bx + c ifodasi.'],
    ['Parabola','Kvadrat funksiya grafigi bo‘lgan simmetrik egri chiziq.'],
    ['Koeffitsiyent','Funksiyadagi berilgan son: a, b yoki c.'],
    ['Parabola uchi','Parabolaning eng past yoki eng yuqori nuqtasi, (x₀; y₀).'],
    ['Simmetriya o‘qi','Uchidan o‘tuvchi x = x₀ vertikal to‘g‘ri chizig‘i.'],
    ['Diskriminant','D = b² − 4ac; ildizlar sonini aniqlovchi son.'],
    ['Ildiz (funksiya noli)','y = 0 bo‘ladigan x qiymati; grafikning Ox bilan kesishish abssissasi.'],
    ['Ikki karrali ildiz','D = 0 da ikki ildizning bitta songa qo‘shilishi.'],
    ['To‘la kvadrat ajratish','Uchhadni a(x − x₀)² + y₀ ko‘rinishiga keltirish usuli.'],
    ['Viyet teoremasi','Ildizlar yig‘indisi −b/a, ko‘paytmasi c/a ekanini bildiruvchi teorema.'],
    ['Fokus','Parabolik ko‘zgu parallel nurlarni yig‘adigan nuqta.']
  ],
  manba:ALG+'. Apolloniyning tug‘ilgan yili manbalarda farq qiladi (MacTutor ≈ mil. av. 262, Britannica ≈ mil. av. 240) — matnda ikkalasi ko‘rsatildi. Al-Xorazmiy yashagan yillar taxminiy (≈780 – ≈850).',
  ishlanma:{
    sinf:'8–9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'Interaktiv grafik (slayderlar), juftlikda hisoblash, grafik va formula solishtirish',
    maqsad:{talimiy:'Kvadrat funksiya, parabola, uning uchi, simmetriya o‘qi, diskriminant va ildizlar soni tushunchalarini o‘rgatish; koeffitsiyentlar va grafik bog‘lanishini ko‘rsatish.',
      tarbiyaviy:'Al-Xorazmiy ilmiy merosiga hurmat, hisobni tekshirish odatini shakllantirish.',
      rivojlantiruvchi:'Formula va grafik orasida o‘tish, kuzatuvdan qonuniyat chiqarish, amaliy masalada eng katta/kichik qiymatni topish ko‘nikmasini rivojlantirish.'},
    natijalar:['a, b, c ning grafikka ta’sirini tushuntiradi','Parabola uchi va simmetriya o‘qini topadi','Diskriminant orqali ildizlar sonini aniqlaydi va ildizlarni hisoblaydi','Parabolani hayotiy misollarda taniydi'],
    jihozlar:['MAKON sahnasi «Funksiya»','Proyektor','Katakli daftar, chizg‘ich','Kalkulyator','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Favvora, antenna, otilgan to‘p rasmlari: «Bu chiziqlarning umumiy tomoni nima?»','Taxmin qiladi.'],
      ['8–18','<b>Koeffitsiyentlar.</b> MAKON da a, b, c slayderlari: tarmoqlar yo‘nalishi, torayish, siljish, (0; c) nuqta.','Kuzatuvni jadvalga yozadi.'],
      ['18–28','<b>Uchi va diskriminant.</b> x₀ = −b/(2a), D = b² − 4ac; uch holat (D > 0, D = 0, D < 0).','Namunaviy funksiyalar uchun hisoblaydi va sahnada tekshiradi.'],
      ['28–33','<b>Tarix.</b> Bobil, al-Xorazmiy va x² + 10x = 39, Apolloniy, Galiley.','Al-Xorazmiy masalasini to‘la kvadrat bilan yechadi.'],
      ['33–42','<b>Mustahkamlash.</b> MAKON «Parabolani boshqaring» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Parabola','Kvadrat funksiya grafigi.'],['Uchi','(−b/(2a); −D/(4a)).'],['Simmetriya o‘qi','x = x₀.'],['Diskriminant','D = b² − 4ac.'],['Ildiz','Grafikning Ox bilan kesishishi.']],
    savollar:[['a < 0 bo‘lsa tarmoqlar qayoqqa?','Pastga'],['y = x² − 4x + 3 uchi?','(2; −1)'],['D < 0 da ildizlar soni?','Haqiqiy ildiz yo‘q'],['Parabola Oy ni qayerda kesadi?','(0; c)'],['«Algebra» so‘zi kimning asaridan?','Al-Xorazmiy']],
    uy:'Darslikdagi mavzuni o‘qish; (1) y = x² − 2x − 8 uchun D, ildizlar va uchini topib, grafigini chizish (javob: D = 36, ildizlar −2 va 4, uchi (1; −9)); (2) y = −2x² + 8x − 5 funksiyaning eng katta qiymatini topish (javob: 3, x = 2 da); (3) perimetri 24 m bo‘lgan to‘g‘ri to‘rtburchakning eng katta yuzini topish (javob: 36 m², 6 × 6 m).',
    manba:ALG
  }
},

/* ============ 2. IKKILIK SANOQ SISTEMASI VA MANTIQIY ELEMENTLAR ============ */
'info-ikkilik': {
  fan:'informatika', qisqaNom:'Ikkilik', nom:'Ikkilik sanoq sistemasi va mantiqiy elementlar',
  qisqa:'7–8-sinf · Informatika · «Sanoq sistemalari», «Mantiq asoslari»',
  sahna:'mantiq',
  kor:{
    sarlavha:'Kompyuter faqat 0 va 1 ni biladi',
    matn:'Kompyuter xotirasi va protsessori ikki holatdan biriga ega bo‘lgan milliardlab elementlardan tuzilgan: tok bor yoki yo‘q, 1 yoki 0. Shuning uchun har qanday son, harf, rasm yoki tovush kompyuterda ikkilik sanoq sistemasida — faqat 0 va 1 raqamlari bilan yoziladi. Bu raqamlar ustida mantiqiy elementlar — VA, YOKI, EMAS, XOR — ishlaydi. Sahnadagi 8 ta bit chirog‘ini bosib son tering, so‘ng mantiqiy elementning kirishlarini almashtirib, chiqishini kuzating.',
    punktlar:['<b>Bit</b> — bitta ikkilik raqam (0 yoki 1); <b>bayt</b> = 8 bit','8 bitli sonda bit og‘irliklari: <b>128, 64, 32, 16, 8, 4, 2, 1</b> — 0 dan 255 gacha, jami 256 ta qiymat','<b>O‘n oltilik sistema:</b> 0–9 va A–F raqamlari; 4 bit = 1 ta o‘n oltilik raqam','<b>Mantiqiy amallar:</b> VA (kon’yunksiya, AND), YOKI (diz’yunksiya, OR), EMAS (inkor, NOT), XOR (qat’iy YOKI)']
  },
  bolimlar:[
    {sarlavha:'8 bitli son: bit og‘irliklari', jadval:[
      ['7-bit (eng katta)','2⁷ = 128'],['6-bit','2⁶ = 64'],['5-bit','2⁵ = 32'],['4-bit','2⁴ = 16'],
      ['3-bit','2³ = 8'],['2-bit','2² = 4'],['1-bit','2¹ = 2'],['0-bit (eng kichik)','2⁰ = 1'],
      ['Hammasi 1 bo‘lsa','128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 = 2⁸ − 1']
    ], matn:'Ikkilik sonning qiymati — 1 turgan xonalar og‘irliklarining yig‘indisi. Masalan, 00001101₂ = 8 + 4 + 1 = 13.'},
    {sarlavha:'Bir son — uch sistemada', jadval:[
      ['5','00000101₂ · 05₁₆'],
      ['10','00001010₂ · 0A₁₆'],
      ['13','00001101₂ · 0D₁₆'],
      ['15','00001111₂ · 0F₁₆'],
      ['16','00010000₂ · 10₁₆'],
      ['42','00101010₂ · 2A₁₆'],
      ['100','01100100₂ · 64₁₆'],
      ['128','10000000₂ · 80₁₆'],
      ['171','10101011₂ · AB₁₆'],
      ['255','11111111₂ · FF₁₆']
    ], matn:'O‘n oltilik raqamlar: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Har 4 bit bitta o‘n oltilik raqamga aylanadi: 1010 1011₂ = AB₁₆.'},
    {sarlavha:'Mantiqiy elementlar: haqiqat jadvali', jadval:[
      ['A = 0, B = 0','VA: 0 · YOKI: 0 · XOR: 0 · EMAS A: 1'],
      ['A = 0, B = 1','VA: 0 · YOKI: 1 · XOR: 1 · EMAS A: 1'],
      ['A = 1, B = 0','VA: 0 · YOKI: 1 · XOR: 1 · EMAS A: 0'],
      ['A = 1, B = 1','VA: 1 · YOKI: 1 · XOR: 0 · EMAS A: 0'],
      ['VA (AND, kon’yunksiya, mantiqiy ko‘paytirish)','Ikkala kirish 1 bo‘lsagina chiqish 1 · belgilari: A ∧ B, A·B'],
      ['YOKI (OR, diz’yunksiya, mantiqiy qo‘shish)','Kamida bitta kirish 1 bo‘lsa chiqish 1 · belgilari: A ∨ B, A + B'],
      ['EMAS (NOT, inkor, inversiya)','Bitta kirish; chiqish kirishga teskari · belgilari: ¬A, Ā'],
      ['XOR (qat’iy YOKI, «yoki…, yoki…»)','Kirishlar har xil bo‘lsa chiqish 1 · belgisi: A ⊕ B']
    ]},
    {sarlavha:'Axborot birliklari', jadval:[
      ['1 bit','Ikki holatdan biri: 0 yoki 1'],
      ['1 bayt','8 bit — 256 xil qiymat (0…255)'],
      ['n bit','2ⁿ xil qiymat: 4 bit — 16, 16 bit — 65 536'],
      ['1 KB','Maktab darsliklari va ko‘p dasturlarda 1024 bayt; xalqaro IEC standartida kilobayt = 1000 bayt, 1024 bayt esa kibibayt (KiB)'],
      ['1 MB','1024 KB (an’anaviy) yoki 1 000 000 bayt (IEC); 1024² bayt = 1 MiB'],
      ['Rang kodi #FF8000','Uch bayt: qizil FF = 255, yashil 80 = 128, ko‘k 00 = 0 — to‘q sariq rang']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Bit — ikki holatli chiroq', matn:'Har bir chiroq — bitta bit: yonsa 1, o‘chsa 0. Hozir faqat eng o‘ngdagi (og‘irligi 1) chiroq yongan, son 1 ga teng. 8 ta bit birgalikda bir baytni tashkil qiladi.', son:1},
    {sarlavha:'Og‘irliklar: 128 dan 1 gacha', matn:'O‘ngdan chapga har bir xonaning og‘irligi ikki marta ortadi: 1, 2, 4, 8, 16, 32, 64, 128. 13 = 8 + 4 + 1, shuning uchun 3-, 2- va 0-bitlar yongan: 00001101₂.', son:13},
    {sarlavha:'O‘nlikdan ikkilikka', matn:'42 ni ikkilikka o‘tkazamiz: 2 ga ketma-ket bo‘lib, qoldiqlarni yozamiz — 42:2 = 21 (0), 21:2 = 10 (1), 10:2 = 5 (0), 5:2 = 2 (1), 2:2 = 1 (0), 1:2 = 0 (1). Qoldiqlarni pastdan yuqoriga o‘qiymiz: 101010₂. Tekshiruv: 32 + 8 + 2 = 42.', son:42},
    {sarlavha:'O‘n oltilik sistema', matn:'Baytni ikkita 4 bitli bo‘lakka ajrating: 1010 | 1011. 1010₂ = 10 = A, 1011₂ = 11 = B, demak 171 = AB₁₆. Dasturchilar uzun ikkilik sonlar o‘rniga shu qisqa yozuvdan foydalanadi.', son:171},
    {sarlavha:'VA va YOKI elementlari', matn:'VA (kon’yunksiya) elementida chiqish faqat ikkala kirish 1 bo‘lganda 1 bo‘ladi — ketma-ket ulangan ikki kalit kabi. YOKI (diz’yunksiya) elementida kamida bitta kirish 1 bo‘lsa yetarli — parallel ulangan kalitlar kabi. Kirishlarni almashtirib, haqiqat jadvalini tekshiring.', darvoza:'AND'},
    {sarlavha:'XOR va EMAS', matn:'XOR kirishlar har xil bo‘lganda 1 beradi: 0⊕1 = 1, 1⊕1 = 0. U bir xonali ikkilik qo‘shishning yig‘indi raqamiga teng: 1 + 1 = 10₂ — yig‘indi xonasida 0, ko‘chiriladigan xonada 1 (u VA bilan topiladi). EMAS elementi esa bitta kirishni teskarisiga aylantiradi.', darvoza:'XOR'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Bitlar va elementlar',
    topshiriqlar:[
      {shart:'<b>13</b> sonini bit chiroqlarida tering.', hodisa:'bit', kod:"ev.son===13", izoh:'13 = 8 + 4 + 1 = <b>00001101₂</b> (o‘n oltilikda 0D).'},
      {shart:'<b>100</b> sonini ikkilikda tering.', hodisa:'bit', kod:"ev.son===100", izoh:'100 = 64 + 32 + 4 = <b>01100100₂</b> (o‘n oltilikda 64).'},
      {shart:'O‘n oltilik <b>2A</b> sonini bitlarda tering.', hodisa:'bit', kod:"ev.son===42", izoh:'2A₁₆ = 2·16 + 10 = <b>42</b> = 0010 1010₂.'},
      {shart:'<b>VA (AND)</b> elementining chiqishini <b>1</b> qiling.', hodisa:'darvoza', kod:"ev.darvoza==='AND' && ev.y===1", izoh:'VA faqat <b>A = 1 va B = 1</b> bo‘lganda 1 beradi.'},
      {shart:'<b>XOR</b> elementining chiqishini <b>1</b> qiling.', hodisa:'darvoza', kod:"ev.darvoza==='XOR' && ev.y===1", izoh:'XOR kirishlar <b>har xil</b> bo‘lganda 1 beradi: A = 0, B = 1 yoki A = 1, B = 0.'}
    ]},
  test:[
    {s:'1 bayt necha bitdan iborat?', v:['4','8','10','16'], t:1, izoh:'<b>1 bayt = 8 bit</b>.'},
    {s:'1011₂ o‘nlik sistemada nechaga teng?', v:['9','10','13','11'], t:3, izoh:'8 + 0 + 2 + 1 = <b>11</b>.'},
    {s:'20 soni ikkilik sistemada qanday yoziladi?', v:['10100','10010','11000','10110'], t:0, izoh:'20 = 16 + 4 = <b>10100₂</b>.'},
    {s:'8 bit bilan nechta turli qiymat yozish mumkin?', v:['8','128','256','255'], t:2, izoh:'2⁸ = <b>256</b> ta (0 dan 255 gacha).'},
    {s:'FF₁₆ o‘nlik sistemada nechaga teng?', v:['255','155','256','1515'], t:0, izoh:'15·16 + 15 = <b>255</b>.'},
    {s:'VA (kon’yunksiya) elementining chiqishi qachon 1 bo‘ladi?', v:['Kamida bitta kirish 1 bo‘lsa','Kirishlar har xil bo‘lsa','Ikkala kirish 0 bo‘lsa','Ikkala kirish 1 bo‘lsa'], t:3, izoh:'VA — <b>ikkala kirish 1 bo‘lsa</b>gina 1.'},
    {s:'1 XOR 1 = ?', v:['1','0','2','10'], t:1, izoh:'Kirishlar bir xil, shuning uchun <b>0</b>.'},
    {s:'YOKI (diz’yunksiya) elementida A = 0, B = 0 bo‘lsa, chiqish?', v:['1','A ga teng emas','0','Aniqlanmagan'], t:2, izoh:'YOKI uchun kamida bitta 1 kerak; ikkalasi 0 — chiqish <b>0</b>.'},
    {s:'«Explication de l’Arithmétique Binaire» maqolasini 1703-yilgi to‘plamda chop ettirgan olim?', v:['Jorj Bul','Klod Shennon','Gotfrid Vilgelm Leybnits','Al-Xorazmiy'], t:2, izoh:'<b>Gotfrid Vilgelm Leybnits</b> — Parij Fanlar akademiyasining 1703-yil to‘plamida.'},
    {s:'1937-yilgi magistrlik ishida Bul algebrasini rele va kalit sxemalariga tatbiq etgan olim?', v:['Klod Shennon','Jorj Bul','Jorj Stibits','Leybnits'], t:0, izoh:'<b>Klod Shennon</b>, MIT, «A Symbolic Analysis of Relay and Switching Circuits».'}
  ],
  yordamchi:[
    {s:'Nega kompyuter o‘nlik emas, ikkilik sistemadan foydalanadi?', j:'Elektron elementda ikki holatni — tok bor/yo‘q, kuchlanish yuqori/past — ishonchli ajratish oson, o‘nta turli darajani ajratish esa ancha qiyin va xatoga moyil. Bundan tashqari, ikki qiymatli mantiq (Bul algebrasi) bilan hisoblash sxemalarini loyihalash qulay.', kalit:['nega','ikkilik','kompyuter']},
    {s:'O‘nlik sonni ikkilikka qanday tez o‘tkazaman?', j:'Ikki usul bor. 1) 2 ga ketma-ket bo‘lib, qoldiqlarni pastdan yuqoriga o‘qish. 2) Eng katta mos og‘irlikni ayirib borish: 100 − 64 = 36, 36 − 32 = 4, 4 − 4 = 0 — demak 64, 32 va 4 xonalarida 1: 01100100₂.', kalit:['o‘tkazish','o‘nlik','bo‘lish']},
    {s:'O‘n oltilik sistema nima uchun kerak?', j:'Bir o‘n oltilik raqam roppa-rosa 4 bitga teng, shuning uchun bayt ikki belgi bilan yoziladi (00…FF). Bu uzun ikkilik yozuvdan ancha qisqa va o‘qish oson. Masalan, veb-sahifalardagi ranglar #RRGGBB ko‘rinishida uch bayt bilan yoziladi.', kalit:['o‘n oltilik','hex','rang']},
    {s:'YOKI va XOR farqi nimada?', j:'Ikkala kirish 1 bo‘lganda farq bor: YOKI 1 beradi (hech bo‘lmaganda bittasi rost), XOR esa 0 beradi (faqat bittasi rost bo‘lishi kerak). Kundalik tilda «choy yoki qahva» ko‘pincha XOR ma’nosida ishlatiladi.', kalit:['xor','yoki','farq']}
  ],
  maqola:[
    {sarlavha:'Kirish: sanoq sistemasi nima?', xatboshilar:[
      'Sanoq sistemasi — sonlarni raqamlar yordamida yozish usuli. Kundalik hayotda biz o‘nlik sistemadan foydalanamiz: 10 ta raqam (0–9) bor va har bir xona o‘ngdagisidan 10 marta «og‘ir». Masalan, 305 = 3·100 + 0·10 + 5·1. Bunday sistemalar pozitsion deyiladi: raqamning qiymati uning turgan joyiga bog‘liq.',
      'Ikkilik sistemada faqat ikkita raqam — 0 va 1 bor, har bir xonaning og‘irligi esa o‘ngdagisidan 2 marta katta: 1, 2, 4, 8, 16, 32, 64, 128 va hokazo. Shuning uchun 1101₂ = 8 + 4 + 0 + 1 = 13. Sonning qaysi sistemada yozilganini ko‘rsatish uchun past indeks qo‘yiladi: 1101₂, 13₁₀, D₁₆.',
      'Nega kompyuterga aynan ikkilik sistema qulay? Elektron sxemalarda ikki holatni — tok bor yoki yo‘q, kuchlanish yuqori yoki past — bir-biridan ishonchli ajratish oson. Bitta ikkilik raqam bit deyiladi, 8 bit esa bayt. Zamonaviy protsessorlarda milliardlab tranzistor bor va ularning har biri kalit kabi ana shu ikki holatdan birida bo‘ladi.',
      'Bu darsda ikkilik sonlarni o‘qish va yozishni, o‘nlik va o‘n oltilik sistemalarga o‘tkazishni, so‘ng bitlar ustida ishlaydigan mantiqiy elementlarni o‘rganamiz. Sahnada 8 ta bit chirog‘i bor — ularni bosib, sonning uch xil yozuvini bir vaqtda ko‘rasiz.'
    ]},
    {sarlavha:'O‘nlik, ikkilik va o‘n oltilik o‘rtasida o‘tish', xatboshilar:[
      'Ikkilikdan o‘nlikka o‘tish eng oson: 1 turgan xonalarning og‘irliklarini qo‘shamiz. 01100100₂ da 64, 32 va 4 xonalarida 1 bor, demak son 100. 11111111₂ da barcha xonalar 1, yig‘indi 255 — bu bir baytga sig‘adigan eng katta son; jami qiymatlar esa 256 ta (0 ham hisobga olinadi).',
      'O‘nlikdan ikkilikka o‘tishning maktabdagi usuli — 2 ga ketma-ket bo‘lish. Sonni 2 ga bo‘lamiz, qoldiqni (0 yoki 1) yozamiz, bo‘linmani yana 2 ga bo‘lamiz va shunday qilib 0 ga yetguncha davom etamiz. So‘ng qoldiqlarni oxiridan boshiga qarab o‘qiymiz. 42 uchun qoldiqlar 0, 1, 0, 1, 0, 1 chiqadi, teskari o‘qilsa 101010₂. Ikkinchi usul — eng katta mos og‘irlikni ayirib borish: 42 − 32 = 10, 10 − 8 = 2, 2 − 2 = 0.',
      'O‘n oltilik sistemada 16 ta raqam bor: 0–9 va A (10), B (11), C (12), D (13), E (14), F (15). 16 = 2⁴ bo‘lgani uchun har bir o‘n oltilik raqam roppa-rosa 4 bitga mos keladi. Baytni ikkita to‘rt bitli bo‘lakka ajratib, har birini alohida o‘giramiz: 1010 1011₂ = AB₁₆ = 10·16 + 11 = 171.',
      'O‘n oltilik yozuv dasturlashda juda keng tarqalgan: xotira manzillari, fayl tarkibi, veb-sahifalardagi ranglar shu tarzda yoziladi. Masalan, #FF8000 rang kodi uch baytdan iborat: qizil FF = 255, yashil 80 = 128, ko‘k 00 = 0 — to‘q sariq rang hosil bo‘ladi.'
    ]},
    {sarlavha:'Mantiqiy amallar va Bul algebrasi', xatboshilar:[
      'Mantiqda mulohaza rost yoki yolg‘on bo‘ladi. Rostni 1, yolg‘onni 0 bilan belgilasak, mulohazalar ustidagi amallarni bitlar ustidagi amallar sifatida yozish mumkin. Bu g‘oyani ingliz matematigi Jorj Bul (1815–1864) rivojlantirgan: 1847-yilda «The Mathematical Analysis of Logic» («Mantiqning matematik tahlili»), 1854-yilda esa «An Investigation of the Laws of Thought» («Tafakkur qonunlarini tadqiq qilish») asarlarini nashr etgan. Asosan mustaqil o‘qib o‘rgangan Bul 1849-yildan Irlandiyadagi Kork shahridagi Queen’s College’da matematika professori bo‘lgan.',
      'O‘zbek informatika darsliklarida asosiy amallar quyidagicha nomlanadi. Kon’yunksiya (mantiqiy ko‘paytirish, VA, AND): ikkala mulohaza rost bo‘lsagina natija rost. Diz’yunksiya (mantiqiy qo‘shish, YOKI, OR): kamida bittasi rost bo‘lsa natija rost. Inkor (inversiya, EMAS, NOT): mulohaza qiymatini teskarisiga aylantiradi. XOR — qat’iy YOKI: mulohazalardan faqat bittasi rost bo‘lsa natija rost.',
      'Mantiqiy amalning barcha kirish kombinatsiyalari uchun natijalarini ko‘rsatuvchi jadval haqiqat jadvali deyiladi. Ikki kirishli element uchun 2² = 4 ta satr bor: 00, 01, 10, 11. VA ustunida faqat oxirgi satr 1, YOKI ustunida faqat birinchi satr 0, XOR ustunida esa o‘rtadagi ikki satr 1. EMAS bitta kirishli bo‘lgani uchun uning jadvali ikki satrdan iborat.',
      'VA va YOKI elementlarini kalitlar bilan tasavvur qilish oson. Chiroqqa ketma-ket ulangan ikki kalit — VA: chiroq ikkala kalit ulanganda yonadi. Parallel ulangan ikki kalit — YOKI: bittasi yetarli. Uyda zinaning pastida va tepasida turgan ikki kalit bilan boshqariladigan chiroq esa XOR ga o‘xshaydi — istalgan kalitni almashtirish chiroq holatini o‘zgartiradi.'
    ]},
    {sarlavha:'Mantiqiy elementlardan kompyutergacha', xatboshilar:[
      'Mantiqiy element — kirishdagi bitlar bo‘yicha chiqishda mantiqiy amal natijasini beruvchi elektron qurilma. Zamonaviy mikrosxemalarda ular tranzistorlardan yasaladi. Barcha murakkab raqamli qurilmalar — kalkulyator, telefon, kompyuter protsessori — mana shunday sodda elementlarning juda ko‘p sonidan tuzilgan.',
      'Eng oddiy misol — ikki bitni qo‘shuvchi yarim summator. 0 + 0 = 0, 0 + 1 = 1, 1 + 0 = 1, 1 + 1 = 10₂. Yig‘indi xonasidagi raqam XOR jadvaliga, ko‘chiriladigan (keyingi xonaga o‘tadigan) raqam esa VA jadvaliga aynan to‘g‘ri keladi. Demak bitta XOR va bitta VA elementi ikki bitni qo‘sha oladi. Bunday bloklarni zanjir qilib ulab, 8, 32 yoki 64 bitli sonlarni qo‘shadigan sxemalar quriladi.',
      'Bul algebrasini elektr sxemalariga birinchi bo‘lib tizimli tatbiq etgan olim — amerikalik Klod Shennon. U 1937-yilda Massachusets texnologiya institutida (MIT) «A Symbolic Analysis of Relay and Switching Circuits» («Rele va kalit sxemalarining ramziy tahlili») magistrlik ishini himoya qildi va rele sxemalarini Bul ifodalari bilan tasvirlash va soddalashtirish mumkinligini ko‘rsatdi; ish 1938-yilda qisqartirilgan holda jurnalda chop etilgan. Bu ish ko‘pincha XX asrning eng muhim magistrlik dissertatsiyasi deb ataladi.',
      'Xuddi shu 1937-yil noyabrida Bell Labs matematigi Jorj Stibits oshxona stoli ustida ikkita rele, batareya va lampochkalardan bir xonali ikkilik qo‘shuvchi yasadi; yonib turgan lampochka 1 ni, o‘chgani 0 ni bildirgan. Qurilma oshxona (inglizcha «kitchen») sharafiga «Model K» deb nomlangan. «Bit» so‘zi (binary digit — ikkilik raqam) Jon Tyukining 1947-yilgi xizmat yozuvida paydo bo‘lgan va Shennonning 1948-yilgi «A Mathematical Theory of Communication» maqolasi orqali keng tarqalgan. «Bayt» atamasini 1956-yilda IBM muhandisi Verner Buxgols kiritgan.'
    ]},
    {sarlavha:'Tarix: Leybnits va ikkilik sistema', xatboshilar:[
      'Ikkilik sanoq sistemasini zamonaviy ko‘rinishda bayon qilgan olim — nemis faylasufi va matematigi Gotfrid Vilgelm Leybnits (1646–1716). Uning bu mavzudagi eng mashhur qo‘lyozmasi «De progressione dyadica» 1679-yil 15-mart sanasi bilan belgilangan. Leybnits ikkilik arifmetikaning qo‘shish, ayirish, ko‘paytirish va bo‘lish qoidalarini ishlab chiqqan.',
      'Leybnits bu g‘oyani keng e’lon qilgan maqolasi — «Explication de l’Arithmétique Binaire» («Ikkilik arifmetikaning tushuntirilishi»). Uning to‘liq nomida «faqat 0 va 1 belgilaridan foydalanadi» va «qadimgi xitoy Fu Si belgilarining ma’nosini ochib beradi» deyilgan. Maqola Parij Fanlar akademiyasining 1703-yilga bag‘ishlangan to‘plamida chiqqan, bu jild esa bosmadan 1705-yilda chiqqan — shuning uchun manbalarda ikkala yil ham uchraydi.',
      'Maqola yozilishiga Xitoyda bo‘lgan iyezuit missioner Joakim Buve bilan yozishmalar turtki bo‘lgan: Buve «I Szin» («O‘zgarishlar kitobi»)dagi yaxlit va uzuq chiziqlardan tuzilgan geksagrammalar ikkilik yozuvga mos kelishini ko‘rsatgan. Leybnitsdan oldin ham ikkilik yozuvga yaqin g‘oyalar bo‘lgan: ingliz olimi Tomas Xarriot qo‘lyozmalarida ikkilik sonlar uchraydi, hind olimi Pingala esa she’r vaznini «yengil» va «og‘ir» bo‘g‘inlar bilan ikkilik tarzda tasvirlagan. Biroq ilmiy jamoatchilikka ta’sir ko‘rsatgan birinchi nashr Leybnitsniki hisoblanadi.',
      'Leybnits mexanik hisoblash mashinasi ustida ham ishlagan va uni 1673-yilda Londondagi Qirollik jamiyatida namoyish qilgan. Uning ikkilik arifmetikasi, Bul mantiqi va Shennonning sxemalar nazariyasi bir-biriga ulanib, bugungi raqamli kompyuterlarning nazariy poydevorini tashkil qiladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — ikkilik sonni o‘nlikdagidek o‘qish: 10₂ «o‘n» emas, «ikki»; 100₂ esa to‘rt. Shubha tug‘ilsa, indeks yozing. Ikkinchi xato — 2 ga bo‘lish usulida qoldiqlarni yuqoridan pastga o‘qish: 6 uchun qoldiqlar 0, 1, 1 chiqadi, to‘g‘ri javob esa teskari tartibda — 110₂.',
      'Uchinchi xato — og‘irliklarni chapdan boshlab 1, 2, 4… deb sanash. Eng kichik og‘irlik (1) doim eng o‘ngdagi xonada turadi. To‘rtinchi xato — «8 bitda eng katta son 256» deyish: 8 bitda 256 ta qiymat bor, lekin ular 0 dan boshlangani uchun eng kattasi 255.',
      'Beshinchi xato — YOKI va XOR ni aralashtirish: 1 YOKI 1 = 1, lekin 1 XOR 1 = 0. Oltinchi xato — mantiqiy qo‘shishni oddiy qo‘shish deb o‘ylash: diz’yunksiyada 1 + 1 = 1 (natija «rost»), ikkilik arifmetikada esa 1 + 1 = 10₂.',
      'Yettinchi xato — o‘n oltilik raqamlarni o‘nlik deb o‘qish: 10₁₆ = 16, 20₁₆ = 32. Tekshirish uchun: har 4 bitni alohida o‘giring va sahnada bitlarni terib, uchala yozuv mos kelishini ko‘ring.'
    ]}
  ],
  formulalar:[
    ['N = bₙ·2ⁿ + … + b₁·2¹ + b₀·2⁰','Ikkilik sonning o‘nlik qiymati (bᵢ — 0 yoki 1)'],
    ['Q = 2ⁿ','n bit bilan yoziladigan turli qiymatlar soni'],
    ['N_max = 2ⁿ − 1','n bitli eng katta son (8 bit: 255)'],
    ['1 bayt = 8 bit;  1 KB = 1024 bayt','Axborot birliklari (an’anaviy); IEC bo‘yicha 1 kB = 1000 bayt, 1 KiB = 1024 bayt'],
    ['A ∧ B = A·B','Kon’yunksiya (VA, AND)'],
    ['A ∨ B','Diz’yunksiya (YOKI, OR)'],
    ['¬A = 1 − A','Inkor (EMAS, NOT)'],
    ['A ⊕ B = (A ∨ B) ∧ ¬(A ∧ B)','XOR (qat’iy YOKI)']
  ],
  qiziqarli:[
    'Leybnitsning ikkilik sistema haqidagi eng mashhur qo‘lyozmasi 1679-yil 15-mart sanasi bilan belgilangan — uni e’lon qilishidan qariyb chorak asr oldin.',
    '1937-yilda Jorj Stibits relelar, batareya va lampochkalardan oshxona stolida ikkilik qo‘shuvchi yasagan — «Model K» nomi «kitchen» (oshxona) so‘zidan.',
    '«Bit» so‘zi «binary digit» (ikkilik raqam) so‘zlarining qisqarmasi; uni Jon Tyuki taklif qilgan, Klod Shennon 1948-yilda ommalashtirgan.',
    'Jorj Bul asosan mustaqil o‘qib o‘rgangan, lekin 1849-yilda Kork shahridagi Queen’s College’ning birinchi matematika professori bo‘lgan.',
    '«Bayt» atamasini 1956-yilda IBM muhandisi Verner Buxgols kiritgan; dastlab u har xil uzunlikdagi bitlar guruhini bildirgan, 8 bitli bayt keyinroq standartga aylangan.'
  ],
  lugat:[
    ['Sanoq sistemasi','Sonlarni raqamlar bilan yozish usuli.'],
    ['Ikkilik sistema','Faqat 0 va 1 raqamlaridan foydalanuvchi, asosi 2 bo‘lgan pozitsion sistema.'],
    ['O‘n oltilik sistema','0–9 va A–F raqamlaridan foydalanuvchi, asosi 16 bo‘lgan sistema.'],
    ['Bit','Axborotning eng kichik birligi: bitta ikkilik raqam.'],
    ['Bayt','8 bitdan iborat axborot birligi.'],
    ['Bit og‘irligi','Xonaning qiymati: 2 ning darajasi (1, 2, 4, …, 128).'],
    ['Mantiqiy element','Kirish bitlari bo‘yicha mantiqiy amal natijasini beruvchi sxema.'],
    ['Kon’yunksiya (VA, AND)','Ikkala qiymat rost bo‘lsagina rost bo‘ladigan amal.'],
    ['Diz’yunksiya (YOKI, OR)','Kamida bitta qiymat rost bo‘lsa rost bo‘ladigan amal.'],
    ['Inkor (EMAS, NOT, inversiya)','Qiymatni teskarisiga aylantiruvchi amal.'],
    ['XOR (qat’iy YOKI)','Kirishlar har xil bo‘lsagina rost bo‘ladigan amal.'],
    ['Haqiqat jadvali','Mantiqiy amalning barcha kirishlardagi natijalari jadvali.']
  ],
  manba:INF+'. Leybnits maqolasi Parij Fanlar akademiyasining 1703-yil to‘plamida chiqqan, jild esa 1705-yilda bosilgan — manbalarda ikkala yil uchraydi. Pingala yashagan davr aniq emas, shuning uchun sana berilmadi.',
  ishlanma:{
    sinf:'7–8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'Interaktiv bit paneli, haqiqat jadvalini to‘ldirish, juftlikda o‘tkazish mashqlari',
    maqsad:{talimiy:'Ikkilik va o‘n oltilik sanoq sistemalari, bit va bayt, o‘nlik–ikkilik–o‘n oltilik o‘tkazish, asosiy mantiqiy amallar va haqiqat jadvalini o‘rgatish.',
      tarbiyaviy:'Aniqlik va tekshirish odatini shakllantirish; al-Xorazmiydan Leybnits, Bul va Shennongacha bo‘lgan ilm yo‘liga qiziqish uyg‘otish.',
      rivojlantiruvchi:'Mantiqiy fikrlash, algoritm bo‘yicha ishlash va ramziy yozuvni tushunish ko‘nikmalarini rivojlantirish.'},
    natijalar:['8 bitli ikkilik sonni o‘nlikka o‘tkazadi va aksincha','O‘n oltilik yozuvni o‘qiydi va baytni ikki belgida yozadi','VA, YOKI, EMAS, XOR uchun haqiqat jadvalini tuzadi','Bit, bayt va axborot birliklarini farqlaydi'],
    jihozlar:['MAKON sahnasi «Mantiq»','Proyektor','8 ta kartochka (bir tomoni 0, ikkinchisi 1)','Haqiqat jadvali tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Faqat ikkita belgi bilan 200 ni qanday yozasiz?»','Taxmin qiladi.'],
      ['8–20','<b>Ikkilik sistema.</b> MAKON da bit chiroqlari, og‘irliklar 128…1, 13 va 42 misollari, 2 ga bo‘lish usuli.','Kartochkalar bilan son teradi, o‘tkazish mashqini bajaradi.'],
      ['20–26','<b>O‘n oltilik sistema.</b> 4 bit = 1 raqam; AB, FF, rang kodlari.','Baytlarni o‘n oltilikda yozadi.'],
      ['26–35','<b>Mantiqiy elementlar.</b> VA, YOKI, EMAS, XOR; haqiqat jadvali; yarim summator; Leybnits, Bul, Shennon.','Tarqatmadagi haqiqat jadvalini to‘ldiradi va sahnada tekshiradi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON «Bitlar va elementlar» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Bit','0 yoki 1.'],['Bayt','8 bit.'],['Kon’yunksiya','VA.'],['Diz’yunksiya','YOKI.'],['Inkor','EMAS.']],
    savollar:[['1 bayt necha bit?','8'],['1101₂ = ?','13'],['FF₁₆ = ?','255'],['1 XOR 1 = ?','0'],['Ikkilik arifmetika haqidagi maqolani 1703-yil to‘plamida chop ettirgan olim?','Leybnits']],
    uy:'Darslikdagi mavzuni o‘qish; (1) 57 va 200 ni ikkilik va o‘n oltilik sistemaga o‘tkazish (javob: 57 = 111001₂ = 39₁₆, 200 = 11001000₂ = C8₁₆); (2) 10110110₂ ni o‘nlikka o‘tkazish (javob: 182); (3) A, B, C uch kirishli «A VA (B YOKI C)» ifodasi uchun 8 satrli haqiqat jadvalini tuzish (javob: faqat 101, 110, 111 satrlarida 1).',
    manba:INF
  }
}

});
})();
