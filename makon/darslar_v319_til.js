/* MAKON v3.19 — guruh «til»: INGLIZ TILI (7 dars, fan `ingliz`) va ONA TILI VA ADABIYOT (7 dars, fan `onatili`) + detal kartalari (MAKON_DETAL.til_*) + fanga bog‘lash.
   index.html da darslar_v315_kbg.js dan KEYIN yuklanadi; sahnalar — lib/sahna_v319_til.js (MAKON_SAHNA['til_…'], so‘z lug‘atlari window.MAKON_TIL_SOZ).
   Qoida: faqat manbali fakt; manbalar farq qilsa — matnda ikkalasi; tekshirilmagani «taxminiy». O‘zbek lotin, ‘ ’ belgilar.
   Manba bo‘laklari: ekran\v319_til\dars\d*.js — yig‘ish: node ekran\v319_til\yig_dars.cjs */
(function(){
'use strict';
const FAN = window.MAKON_FAN, L = window.MAKON_DARS;
if(!FAN || !L) return;
const F = id=>FAN.find(f=>f.id === id);
/* ---- yangi fanlar e’loni (yopiq fanlardan OLDIN; eski yopiq «tillar» fani o‘zgartirilmaydi) ---- */
[
  {id:'ingliz', nom:'Ingliz tili', rang:'#d78cff', ik:'til', izoh:'3D predmetlar: so‘z, talaffuz, tarjima', tavsif:'Xona, bozor, soat, shahar — 3D sahnadagi narsani bosing: inglizcha so‘z, transkripsiya, o‘zbekcha tarjima va brauzer ovozi bilan talaffuz. 5–9-sinflar.', mavzular:[]},
  {id:'onatili', nom:'Ona tili va adabiyot', rang:'#ffb86b', ik:'qalam', izoh:'So‘z turkumlari, gap bo‘laklari, Navoiy, Bobur, Qodiriy', tavsif:'Interaktiv gaplar va daraxt sxemalari, Navoiy va Bobur xaritalari, «O‘tkan kunlar» qahramonlar sxemasi, nutq uslublari. 5–11-sinflar.', mavzular:[]}
].forEach(f=>{ if(FAN.some(x=>x.id === f.id)) return; const yopiqI = FAN.findIndex(x=>x.yopiq); FAN.splice(yopiqI < 0 ? FAN.length : yopiqI, 0, f); });
/* yangi ikon «qalam» (24×24, stroke, fill yo‘q) — app3.js IK ro‘yxatiga ulanadi */
window.MAKON_IKON = window.MAKON_IKON || {};
MAKON_IKON.qalam = '<path d="m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="m14 7 3 3M4 20h5"/>';
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom === nom || x.dars === dars || (eskiNomlar || []).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
const ish = (sinf, tur, usul, maq, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba)=>({sinf, vaqt:'45 daqiqa', tur, usul, maqsad:{talimiy:maq[0], tarbiyaviy:maq[1], rivojlantiruvchi:maq[2]}, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba});
const T3 = (s, hodisa, kalit, togri, v, izoh)=>({tur:'3d', s, hodisa, kalit, togri, v, t:0, izoh});
const SZ = window.MAKON_TIL_SOZ || {};
const DT = {};
const CAM = 'Cambridge Dictionary (dictionary.cambridge.org) — transkripsiya (UK)';
const E5 = '5-sinf «Ingliz tili» darsligi (O‘zbekiston, amaldagi nashr)';
const E6 = '6-sinf «Ingliz tili» darsligi (O‘zbekiston, amaldagi nashr)';
const E7 = '7-sinf «Ingliz tili» darsligi (O‘zbekiston, amaldagi nashr)';
const E8 = '8-sinf «Ingliz tili» darsligi (O‘zbekiston, amaldagi nashr)';
const E9 = '9-sinf «Ingliz tili» darsligi (O‘zbekiston, amaldagi nashr)';
const O5 = '5-sinf «Ona tili» darsligi (O‘zbekiston, amaldagi nashr) — «So‘z turkumlari» bo‘limi';
const O6 = '6-sinf «Ona tili» darsligi (O‘zbekiston, amaldagi nashr) — «Gap bo‘laklari» bo‘limi';
const A7 = '7-sinf «Adabiyot» darsligi (O‘zbekiston, amaldagi nashr) — «Alisher Navoiy» bo‘limi';
const O8 = '8-sinf «Ona tili» darsligi (O‘zbekiston, amaldagi nashr) — «Qo‘shma gap» bo‘limi';
const A9 = '9-sinf «Adabiyot» darsligi (O‘zbekiston, amaldagi nashr) — «Zahiriddin Muhammad Bobur» bo‘limi';
const A10 = '10-sinf «Adabiyot» darsligi (O‘zbekiston, amaldagi nashr) — «Abdulla Qodiriy» bo‘limi';
const O11 = '10–11-sinf «Ona tili» darsliklari (O‘zbekiston, amaldagi nashrlar) — «Nutq uslublari» bo‘limi';
const MW = 'Wikipedia (inglizcha)';
const ENGL = 'Grammatika qoidalari — Cambridge «English Grammar in Use» (R. Murphy) va British Council LearnEnglish (learnenglish.britishcouncil.org)';


/* ================================================================
   1. MY ROOM: THINGS AT HOME — 5-sinf (en-xona)
   ================================================================ */
bogla('ingliz', 'My room: things at home', 'en-xona', '3D xona: 20 ta predmet — so‘z, transkripsiya, tarjima, talaffuz; There is / There are');
L['en-xona'] = {
  fan:'ingliz', qisqaNom:'My room', nom:'My room: things at home — xonadagi narsalar', sinf:'5-sinf',
  qisqa:'5-sinf · Ingliz tili · «My room» · 3D xona',
  sahna:'til_en_xona',
  kor:{
    sarlavha:'There is a bed in my room',
    matn:'Sahnada 3D yotoqxona: karavot, yozuv stoli, stul, chiroq, kompyuter, deraza, parda, eshik, kitob javoni, soat, gilam, rasm, o‘simlik, kiyim javoni, ko‘zgu. Istalgan narsani <b>bosing</b> — inglizcha so‘z, uning transkripsiyasi (IPA), o‘zbekcha tarjimasi va namuna gap chiqadi; «Talaffuz» tugmasi brauzer ovozi bilan so‘zni o‘qib beradi. Pastdagi tugmalar narsalarni guruhlarga ajratadi: mebel (furniture), gazlama buyumlar (textiles), elektr jihozlar (electronics).',
    punktlar:['<b>There is</b> + birlik: <i>There is a lamp on the desk.</i> — Stolda chiroq bor','<b>There are</b> + ko‘plik: <i>There are two pillows on the bed.</i> — Karavotda ikkita yostiq bor','<b>a / an:</b> undosh oldidan <i>a</i> (a bed), unli oldidan <i>an</i> (an apple)','<b>Savol:</b> <i>Is there a computer in your room? — Yes, there is. / No, there isn’t.</i>']
  },
  bolimlar:[
    {sarlavha:'Xonadagi narsalar (lug‘at)', jadval:Object.keys(SZ.xona || {}).map(k=>[SZ.xona[k].en + ' ' + SZ.xona[k].ipa, SZ.xona[k].uz])},
    {sarlavha:'There is / There are', jadval:[
      ['Tasdiq (birlik)', 'There is a clock on the wall.'],
      ['Tasdiq (ko‘plik)', 'There are many books on the bookshelf.'],
      ['Inkor', 'There isn’t a TV in my room. / There aren’t any plants.'],
      ['Savol', 'Is there a mirror? — Yes, there is. / Are there any pictures? — No, there aren’t.'],
      ['Qisqa shakl', 'There’s = There is; isn’t = is not; aren’t = are not']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Xonaga xush kelibsiz', matn:'Bu — yotoqxona (bedroom). Narsalarni bosib, so‘zlarni eshiting. Yozuvlar tugmasi har narsaning ustiga inglizcha nomini chiqaradi.', holat:{hamma:true, yozuv:true}},
    {sarlavha:'Furniture — mebel', matn:'Bed, desk, chair, bookshelf, wardrobe — bular mebel (furniture). E’tibor bering: <i>furniture</i> so‘zi ingliz tilida sanalmaydi — «a furniture» deyilmaydi, «a piece of furniture» deyiladi.', holat:{guruh:'furniture'}},
    {sarlavha:'Textiles — gazlama buyumlar', matn:'Pillow (yostiq), blanket (ko‘rpa), curtain (parda), carpet (gilam). <i>The curtains are green.</i> — pardalar odatda ikkita, shuning uchun ko‘plikda.', holat:{guruh:'textiles'}},
    {sarlavha:'Electronics — elektr jihozlar', matn:'Lamp (chiroq) va computer (kompyuter). <i>There is a lamp on the desk. The computer is on the desk, too.</i>', holat:{guruh:'electronics'}},
    {sarlavha:'Room — xona qismlari', matn:'Wall (devor), floor (pol), window (deraza), door (eshik). <i>The picture is on the wall. The carpet is on the floor.</i>', holat:{guruh:'room'}},
    {sarlavha:'There is a … — gap tuzamiz', matn:'Karavotni bosing va gapni eshiting: <i>There is a bed in my room.</i> Endi stolni: <i>There is a desk next to the window.</i> Har narsa uchun gap tuzib ko‘ring.', holat:{predmet:'bed'}},
    {sarlavha:'Savol-javob', matn:'<i>Is there a mirror in the room? — Yes, there is.</i> <i>Is there a TV? — No, there isn’t.</i> Sahnada TV yo‘q, lekin ko‘zgu bor — toping.', holat:{predmet:'mirror'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Find it in the room!', holat:{hamma:true, yozuv:false},
    topshiriqlar:[
      {shart:'Find the <b>bed</b>. Xonadagi karavotni bosing.', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.nom==='bed'", izoh:'To‘g‘ri — <b>bed</b> /bed/ karavot. <i>There is a bed in my room.</i>'},
      {shart:'Find the <b>lamp</b>. <i>It’s on the desk.</i>', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.nom==='lamp'", izoh:'To‘g‘ri — <b>lamp</b> /læmp/ chiroq.'},
      {shart:'Find the <b>bookshelf</b>. <i>There are many books on it.</i>', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.nom==='bookshelf'", izoh:'To‘g‘ri — <b>bookshelf</b> kitob javoni; <b>book</b> — kitob.'},
      {shart:'Find the <b>wardrobe</b>. Kiyimlar qayerda turadi?', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.nom==='wardrobe'", izoh:'To‘g‘ri — <b>wardrobe</b> /ˈwɔː.drəʊb/ kiyim javoni.'},
      {shart:'Find something from the <b>textiles</b> group (pillow, blanket, curtain or carpet).', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.guruh==='textiles'", izoh:'To‘g‘ri — bu gazlama buyum (<b>textiles</b>).'},
      {shart:'Find the <b>mirror</b>. <i>I look in it every morning.</i>', hodisa:'til-soz', kod:"ev.sahna==='xona' && ev.nom==='mirror'", izoh:'To‘g‘ri — <b>mirror</b> /ˈmɪr.ər/ ko‘zgu. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'«Karavot» inglizcha qanday?', v:['desk','bed','chair','door'], t:1, izoh:'<b>bed</b> /bed/ — karavot. desk — yozuv stoli, chair — stul, door — eshik.'},
    {s:'«There ___ a lamp on the desk.»', v:['are','is','am','be'], t:1, izoh:'Birlik (a lamp) bilan <b>is</b>: <i>There is a lamp on the desk.</i>'},
    {s:'«There ___ two pillows on the bed.»', v:['is','am','are','isn’t'], t:2, izoh:'Ko‘plik (two pillows) bilan <b>are</b>.'},
    {s:'«window» so‘zining ma’nosi?', v:['devor','eshik','deraza','parda'], t:2, izoh:'<b>window</b> /ˈwɪn.dəʊ/ — deraza. wall — devor, door — eshik, curtain — parda.'},
    {s:'Qaysi so‘z oldidan «an» qo‘yiladi?', v:['bed','book','chair','armchair'], t:3, izoh:'Unli tovush bilan boshlangan so‘z oldidan <b>an</b>: an armchair. Qolganlari undosh bilan boshlanadi — a bed, a book, a chair.'},
    {s:'«Is there a computer in your room?» savoliga qisqa tasdiq javob?', v:['Yes, it is.','Yes, there is.','Yes, there are.','Yes, I am.'], t:1, izoh:'<i>Is there …?</i> savoliga <b>Yes, there is.</b> / No, there isn’t.'},
    {s:'Qaysi narsa «furniture» (mebel) guruhiga kirmaydi?', v:['wardrobe','bookshelf','carpet','desk'], t:2, izoh:'<b>carpet</b> (gilam) — gazlama buyum. Wardrobe, bookshelf, desk — mebel.'},
    {s:'«kitob javoni» inglizcha?', v:['bookshop','bookshelf','notebook','bookcase bag'], t:1, izoh:'<b>bookshelf</b> — kitob javoni (tokchasi). bookshop — kitob do‘koni, notebook — daftar.'},
    {s:'«ko‘rpa / adyol» qaysi so‘z?', v:['pillow','blanket','curtain','plant'], t:1, izoh:'<b>blanket</b> /ˈblæŋ.kɪt/ — ko‘rpa, adyol. pillow — yostiq, curtain — parda, plant — o‘simlik.'},
    {s:'Inkor gapni toping.', v:['There is a clock on the wall.','There isn’t a TV in my room.','Is there a mirror?','There are three books.'], t:1, izoh:'<b>There isn’t</b> = there is not — inkor shakl.'},
    T3('Sahnada <b>window</b> (deraza)ni bosing.', 'til-soz', 'nom', ['window'], ['window — deraza', 'boshqa narsa'], '<b>window</b> /ˈwɪn.dəʊ/ — deraza; u orqa devorda, parda yonida.')
  ],
  yordamchi:[
    {s:'There is bilan There are farqi nima?', j:'<i>There is</i> — bitta narsa (birlik) haqida: There is a bed. <i>There are</i> — ko‘p narsa (ko‘plik) haqida: There are two chairs. Sanalmaydigan narsa bilan ham «is»: There is some water.', kalit:['there is','there are','farq']},
    {s:'a va an qachon?', j:'Keyingi so‘z undosh tovush bilan boshlansa — a (a book, a window), unli tovush bilan boshlansa — an (an egg, an apple, an hour — h o‘qilmaydi).', kalit:['a','an','artikl']},
    {s:'Talaffuz tugmasi ishlamayapti', j:'Talaffuz brauzeringizdagi ovoz (speechSynthesis) orqali chiqadi. Kompyuterda inglizcha ovoz o‘rnatilmagan bo‘lsa, «ovoz mavjud emas» yozuvi chiqadi — bu xato emas. Transkripsiyadan foydalaning.', kalit:['talaffuz','ovoz','ishlamayapti']}
  ],
  maqola:[
    {sarlavha:'So‘zni narsa bilan birga eslab qoling', xatboshilar:[
      'Yangi so‘zni lug‘atdan yodlashdan ko‘ra, uni narsaning o‘zi bilan bog‘lab eslash osonroq. Shuning uchun bu darsda xonadagi har bir narsa bosilganda uning inglizcha nomi, talaffuzi va tarjimasi birga chiqadi. Uyingizda ham shunday qiling: karavotga qarab «bed», stolga qarab «desk» deb ayting — so‘z joyi bilan birga xotirada qoladi.',
      'Transkripsiya — so‘zning qanday o‘qilishini ko‘rsatuvchi maxsus belgilar (IPA — Xalqaro fonetik alifbo). Ingliz tilida yozilishi va o‘qilishi ko‘pincha farq qiladi: <i>chair</i> /tʃeər/, <i>wardrobe</i> /ˈwɔː.drəʊb/. Urg‘u belgisi ˈ urg‘uli bo‘g‘in oldidan qo‘yiladi, ː esa cho‘ziq unlini bildiradi.',
      'Darsdagi transkripsiyalar Cambridge lug‘atining Britaniya talaffuzi bo‘yicha berilgan. Amerika talaffuzida ba’zi tovushlar farq qiladi (masalan, <i>r</i> so‘z oxirida aniq o‘qiladi) — ikkalasi ham to‘g‘ri.'
    ]},
    {sarlavha:'There is / There are — «bor» qurilmasi', xatboshilar:[
      'O‘zbek tilida «Xonada karavot bor» deymiz; ingliz tilida buning uchun <i>there is / there are</i> qurilmasi ishlatiladi: <i>There is a bed in the room.</i> Bu yerda <i>there</i> «u yerda» degani emas — u faqat gapni boshlaydi, asl ma’no «bor» so‘zida.',
      'Narsa bitta bo‘lsa <i>is</i>, ko‘p bo‘lsa <i>are</i>: <i>There are three books on the desk.</i> Inkor uchun <i>not</i> qo‘shiladi: <i>There isn’t a TV. There aren’t any pictures.</i> Savolda <i>is/are</i> oldinga chiqadi: <i>Is there a lamp? Are there any plants?</i>',
      'Joy bildiruvchi so‘zlar (predloglar) gapni to‘ldiradi: <i>on</i> — ustida (<i>on the wall</i>), <i>in</i> — ichida (<i>in the wardrobe</i>), <i>next to</i> — yonida (<i>next to the window</i>), <i>under</i> — ostida (<i>under the bed</i>). Ularni 7-sinfdagi «Prepositions of place» darsida 3D da ko‘rasiz.'
    ]},
    {sarlavha:'Artikllar: a, an, the', xatboshilar:[
      '<i>a</i> va <i>an</i> — noaniq artikl, «biror, bitta» ma’nosida, faqat sanaladigan birlik otlar bilan: <i>a chair</i>, <i>an egg</i>. Tanlov keyingi so‘zning birinchi <b>tovushi</b>ga qarab: <i>an hour</i> (h o‘qilmaydi), <i>a university</i> (/juː/ undosh tovush bilan boshlanadi).',
      '<i>the</i> — aniq artikl, suhbatdoshga ma’lum narsa haqida: <i>The lamp is on the desk</i> — aynan shu chiroq. Birinchi marta aytilganda <i>a</i>, keyin <i>the</i>: <i>There is a clock on the wall. The clock is big.</i>',
      'Ko‘plik va sanalmaydigan otlar bilan noaniq artikl ishlatilmaydi: <i>There are books</i> (a books emas), <i>There is furniture</i>. «Bir nechta» ma’nosida <i>some</i> qo‘shiladi: <i>some books, some water</i>.'
    ]}
  ],
  formulalar:[
    ['There is + a/an + birlik ot', 'Xonada … bor (bitta): There is a lamp.'],
    ['There are + ko‘plik ot', 'Xonada … bor (ko‘p): There are two chairs.'],
    ['There isn’t / There aren’t', 'Inkor: There isn’t a TV. There aren’t any plants.'],
    ['Is there …? / Are there …?', 'Savol: Is there a mirror? — Yes, there is.'],
    ['a + undosh, an + unli tovush', 'a bed, a desk · an egg, an hour']
  ],
  qiziqarli:[
    'Ingliz tilida <i>furniture</i> (mebel) sanalmaydi: «two furnitures» deyilmaydi, «two pieces of furniture» deyiladi.',
    'Britaniya ingliz tilida ko‘cha sathidagi qavat <i>ground floor</i>, undan yuqoridagisi <i>first floor</i>; Amerika ingliz tilida ko‘cha sathidagi qavat <i>first floor</i> deb ataladi.',
    '<i>Wardrobe</i> so‘zi dastlab (XIV asr) «kiyim saqlanadigan xona»ni bildirgan; keyin shkafga ko‘chgan (manba: Online Etymology Dictionary).',
    'IPA — Xalqaro fonetik alifbo — 1888-yilda Xalqaro fonetik uyushma tomonidan yaratilgan; u bilan dunyodagi istalgan tilning tovushlarini yozish mumkin.'
  ],
  lugat:[['bed', 'karavot'], ['desk', 'yozuv stoli'], ['chair', 'stul'], ['lamp', 'chiroq'], ['window', 'deraza'], ['door', 'eshik'], ['wall', 'devor'], ['floor', 'pol'], ['bookshelf', 'kitob javoni'], ['wardrobe', 'kiyim javoni'], ['mirror', 'ko‘zgu'], ['carpet', 'gilam'], ['pillow', 'yostiq'], ['blanket', 'ko‘rpa'], ['curtain', 'parda'], ['plant', 'o‘simlik (tuvakda)'], ['picture', 'rasm'], ['clock', 'devor soati'], ['furniture', 'mebel (sanalmaydi)'], ['there is / there are', '… bor']],
  manba:E5 + '; ' + CAM + '; ' + ENGL + '; Online Etymology Dictionary «wardrobe»; International Phonetic Association (1888). Talaffuz — brauzer ovozi (speechSynthesis), ovoz fayllari yo‘q.',
  ishlanma:ish('5-sinf', 'Yangi bilim berish', 'Interaktiv 3D sahna, juftlikda so‘rov-javob, o‘yin «Find it!»',
    ['Xonadagi 20 ta narsaning inglizcha nomi, talaffuzi va «There is / There are» qurilmasini o‘rgatish.', 'Uyni tartibli saqlash, o‘z xonasiga mas’uliyat hissini tarbiyalash.', 'Eshitish va talaffuz ko‘nikmasi, so‘zni narsa bilan bog‘lab eslash qobiliyatini rivojlantirish.'],
    ['20 ta so‘zni to‘g‘ri talaffuz qiladi va tarjima qiladi', '«There is / There are» bilan tasdiq, inkor va savol gap tuzadi', 'a / an artiklini to‘g‘ri tanlaydi', 'O‘z xonasini 5–6 gap bilan tasvirlaydi'],
    ['MAKON sahnasi «My room» (3D xona)', 'Proyektor yoki interaktiv doska', 'Kartochkalar: so‘z — rasm', 'Darslik va lug‘at daftari'],
    [['0–3', '<b>Tashkiliy qism.</b> Greeting: «Good morning! How are you?»', 'Javob beradi.'], ['3–8', '<b>Warm-up.</b> «What is in your room?» — o‘quvchilar bilgan so‘zlarini aytadi.', 'So‘zlarni aytadi.'], ['8–18', '<b>Yangi lug‘at.</b> MAKON da narsalarni bosib, so‘z–talaffuz–tarjimani ko‘rsatadi; xor bilan takrorlatadi.', 'Takrorlaydi, daftarga yozadi.'], ['18–27', '<b>Grammatika.</b> There is / There are; a / an; namuna gaplar sahnada.', 'Gaplar tuzadi.'], ['27–35', '<b>Amaliyot.</b> «Find it!» o‘yini (MAKON amaliyoti) — juftlikda bir-biriga topshiriq beradi.', 'Narsani topadi, gap aytadi.'], ['35–42', '<b>Mustahkamlash.</b> Test; «Is there a … in your room?» so‘rovi.', 'Test va dialog.'], ['42–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['bed', 'karavot'], ['wardrobe', 'kiyim javoni'], ['curtain', 'parda'], ['there is / there are', '… bor']],
    [['«Karavot» inglizcha?', 'bed'], ['There ___ two chairs.', 'are'], ['Unli oldidan qaysi artikl?', 'an'], ['Is there a lamp? — qisqa javob?', 'Yes, there is. / No, there isn’t.']],
    'O‘z xonangizni 6 ta gap bilan tasvirlang (There is / There are bilan); darslikdagi lug‘at mashqi; 10 ta so‘zni talaffuzi bilan yodlang.',
    E5 + '; ' + CAM)
};

/* ================================================================
   2. COLOURS AND NUMBERS — 5-sinf (en-ranglar)
   ================================================================ */
bogla('ingliz', 'Colours and numbers', 'en-ranglar', '11 ta rang, 1–100 sonlar, «What colour is it?» — rangli 3D shakllar');
L['en-ranglar'] = {
  fan:'ingliz', qisqaNom:'Colours & numbers', nom:'Colours and numbers — ranglar va 1 dan 100 gacha sonlar', sinf:'5-sinf',
  qisqa:'5-sinf · Ingliz tili · «Colours and numbers»',
  sahna:'til_en_ranglar',
  kor:{
    sarlavha:'What colour is it? — It’s red.',
    matn:'Sahnada 11 ta rangli kub (red, blue, green, yellow, orange, purple, pink, brown, black, white, grey), o‘rtada bo‘yaladigan shakl (ball, box, star, heart) va o‘ngda son taxtasi. Kubni bosing — shakl o‘sha rangga bo‘yaladi va «It’s a red ball» gapi chiqadi. Son taxtasida −1 / +1 / +10 tugmalari va slayder bilan 1 dan 100 gacha sonlarni so‘z bilan ko‘ring: 17 — seventeen, 42 — forty-two, 100 — one hundred.',
    punktlar:['<b>Savol:</b> <i>What colour is it? — It’s blue.</i> Ko‘plikda: <i>What colour are they? — They’re blue.</i>','<b>Sifat ot oldidan:</b> <i>a red ball</i> (ball red emas)','<b>13–19:</b> -teen (thirteen, fifteen, eighteen); <b>20–90:</b> -ty (twenty, fifty, eighty)','<b>21–99:</b> defis bilan: twenty-one, ninety-nine; <b>100</b> — a hundred / one hundred']
  },
  bolimlar:[
    {sarlavha:'Ranglar', jadval:Object.keys(SZ.rang || {}).map(k=>[SZ.rang[k].en + ' ' + SZ.rang[k].ipa, SZ.rang[k].uz])},
    {sarlavha:'Sonlar (namuna)', jadval:[['1–10', 'one, two, three, four, five, six, seven, eight, nine, ten'], ['11–12', 'eleven, twelve (alohida so‘zlar)'], ['13–19', 'thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen'], ['20–90', 'twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety'], ['21, 35, 99', 'twenty-one, thirty-five, ninety-nine'], ['100', 'a hundred / one hundred'], ['Imlo', 'four → fourteen, lekin forty (u yo‘q); five → fifteen, fifty; eight → eighteen, eighty']]}
  ],
  bosqichlar:[
    {sarlavha:'Asosiy ranglar', matn:'Red (qizil), blue (ko‘k), yellow (sariq) — asosiy ranglar. Kubni bosing: <i>What colour is it? — It’s red.</i>', holat:{rang:'red', shakl:'ball', rejim:'ranglar'}},
    {sarlavha:'Yashil, to‘q sariq, binafsha', matn:'Green, orange, purple. E’tibor bering: <i>orange</i> ham rang, ham meva (apelsin). <i>It’s an orange ball</i> — unli oldidan <i>an</i>.', holat:{rang:'orange'}},
    {sarlavha:'Pushti, jigarrang, kulrang', matn:'Pink, brown, grey (Britaniya imlosi; Amerika imlosi — gray). Qora — black, oq — white.', holat:{rang:'grey'}},
    {sarlavha:'Sifat ot oldidan', matn:'Ingliz tilida rang (sifat) otdan OLDIN keladi: <i>a blue box</i>, <i>a green star</i>. Shaklni almashtiring: ball → box → star → heart.', holat:{rang:'blue', shakl:'box'}},
    {sarlavha:'1 dan 12 gacha', matn:'One, two, three … ten, eleven, twelve. Son taxtasida 7 — seven. Sharchalar sonini sanang: <i>How many balls? — Seven.</i>', holat:{son:7, rejim:'sonlar'}},
    {sarlavha:'13–19: -teen', matn:'Thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen. Urg‘u oxirida: fifTEEN. 15 — <i>fifteen</i> (fiveteen emas!).', holat:{son:15}},
    {sarlavha:'20–100: -ty va defis', matn:'Twenty, thirty, forty (fourty emas!), fifty … ninety. O‘nlik + birlik defis bilan: 42 — forty-two. 100 — one hundred.', holat:{son:42}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Colours and numbers', holat:{rang:'white', shakl:'ball', son:1},
    topshiriqlar:[
      {shart:'Click the <b>red</b> cube. Qizil kubni bosing.', hodisa:'til-rang', kod:"ev.nom==='red' && ev.bosildi", izoh:'To‘g‘ri — <b>red</b> /red/ qizil. <i>It’s a red ball.</i>'},
      {shart:'Click the <b>purple</b> cube. Binafsha rang.', hodisa:'til-rang', kod:"ev.nom==='purple' && ev.bosildi", izoh:'To‘g‘ri — <b>purple</b> /ˈpɜː.pəl/ binafsha.'},
      {shart:'Make the number board show <b>fifteen</b>.', hodisa:'til-son', kod:"ev.son===15", izoh:'To‘g‘ri — <b>15 — fifteen</b> (five + teen, lekin «fif-»).'},
      {shart:'Now show <b>forty-two</b>.', hodisa:'til-son', kod:"ev.son===42", izoh:'To‘g‘ri — <b>42 — forty-two</b>: o‘nlik + defis + birlik.'},
      {shart:'Show <b>one hundred</b>.', hodisa:'til-son', kod:"ev.son===100", izoh:'To‘g‘ri — <b>100 — one hundred</b> (yoki a hundred).'},
      {shart:'Click the <b>grey</b> cube (kulrang).', hodisa:'til-rang', kod:"ev.nom==='grey' && ev.bosildi", izoh:'To‘g‘ri — <b>grey</b> /ɡreɪ/ kulrang (AQSHda gray). Amaliyot tugadi!'}
    ]},
  test:[
    {s:'«What colour is it?» — «It’s ___.» (sariq)', v:['green','yellow','orange','brown'], t:1, izoh:'<b>yellow</b> /ˈjel.əʊ/ — sariq. green — yashil, orange — to‘q sariq, brown — jigarrang.'},
    {s:'15 soni inglizcha?', v:['fiveteen','fifty','fifteen','fiftheen'], t:2, izoh:'<b>fifteen</b> — 15 (five → fif-). fifty — 50.'},
    {s:'«forty» qaysi son?', v:['14','40','44','4'], t:1, izoh:'<b>forty</b> — 40 (fourty emas). 14 — fourteen.'},
    {s:'Gapni to‘g‘ri tuzing: «Bu — ko‘k quti.»', v:['It’s a box blue.','It’s a blue box.','It’s blue a box.','Is it a box blue.'], t:1, izoh:'Sifat otdan oldin: <b>It’s a blue box.</b>'},
    {s:'«purple» ma’nosi?', v:['pushti','binafsha','jigarrang','kulrang'], t:1, izoh:'<b>purple</b> — binafsha. pink — pushti, brown — jigarrang, grey — kulrang.'},
    {s:'99 inglizcha qanday yoziladi?', v:['ninety nine','ninetynine','ninety-nine','nine-ninety'], t:2, izoh:'O‘nlik va birlik orasida defis: <b>ninety-nine</b>.'},
    {s:'Qaysi juftlik to‘g‘ri?', v:['12 — twelf','11 — eleven','13 — threeteen','18 — eightteen'], t:1, izoh:'<b>11 — eleven</b>. 12 — twelve, 13 — thirteen, 18 — eighteen (bitta t).'},
    {s:'Ko‘plikdagi savol qaysi?', v:['What colour is it?','What colour are they?','What colour it is?','What colours is it?'], t:1, izoh:'Ko‘plik: <b>What colour are they? — They’re red.</b>'},
    {s:'«It’s ___ orange ball.»', v:['a','an','the a','—'], t:1, izoh:'<i>orange</i> unli tovush bilan boshlanadi — <b>an</b> orange ball.'},
    {s:'«grey» so‘zining Amerika imlosi?', v:['gray','grei','grae','greey'], t:0, izoh:'Britaniyada <b>grey</b>, AQSHda <b>gray</b> — ikkalasi to‘g‘ri.'},
    T3('Sahnada <b>green</b> (yashil) kubni bosing.', 'til-rang', 'nom', ['green'], ['green — yashil', 'boshqa rang'], '<b>green</b> /ɡriːn/ — yashil.')
  ],
  yordamchi:[
    {s:'Nega 40 — forty, 14 — fourteen?', j:'Bu tarixiy imlo: XVII–XVIII asrlarda «fourty» yozuvi ham uchragan, lekin standart imloda «forty» qolgan. Shunchaki eslab qoling: forty — u harfsiz.', kalit:['forty','fourty','nega']},
    {s:'colour yoki color?', j:'Ikkalasi to‘g‘ri: Britaniya imlosi colour, Amerika imlosi color. Darslikda Britaniya imlosi ishlatiladi.', kalit:['colour','color','imlo']}
  ],
  maqola:[
    {sarlavha:'Ranglar va sifatning o‘rni', xatboshilar:[
      'Rang bildiruvchi so‘zlar — sifatlar. Ingliz tilida sifat doim otdan oldin keladi: <i>a red apple</i>, <i>the blue sky</i>. Bu o‘zbek tiliga o‘xshaydi (qizil olma), lekin fransuz yoki ispan tillaridan farq qiladi (ularda sifat ko‘pincha otdan keyin keladi).',
      'Rang haqida so‘rash: <i>What colour is it?</i> — javob <i>It’s green</i>. Ko‘p narsa haqida: <i>What colour are they? — They’re green.</i> Rang nomi oldidan artikl qo‘yilmaydi (<i>It’s green</i>), lekin ot bilan kelsa qo‘yiladi (<i>It’s a green box</i>).',
      'Rangning darajasini <i>light</i> (och) va <i>dark</i> (to‘q) bilan aytish mumkin: <i>light blue</i> — och ko‘k, <i>dark green</i> — to‘q yashil. Ingliz tilida ko‘k va moviy uchun bitta so‘z — <i>blue</i>; o‘zbek tilidagi «ko‘k» va «zangori» farqi <i>dark blue / light blue</i> bilan beriladi.'
    ]},
    {sarlavha:'Sonlar: uchta guruh', xatboshilar:[
      '1 dan 12 gacha sonlar alohida so‘zlar: <i>one … twelve</i>. <i>Eleven</i> va <i>twelve</i> qadimgi ingliz tilidagi «o‘ndan bitta ortiq», «o‘ndan ikkita ortiq» ma’nosidagi so‘zlardan kelib chiqqan — shuning uchun ular -teen bilan tugamaydi (manba: Online Etymology Dictionary).',
      '13 dan 19 gacha -teen qo‘shimchasi bilan: <i>thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen</i>. Imloga e’tibor: <i>three → thirteen</i>, <i>five → fifteen</i>, <i>eight → eighteen</i> (bitta t). Urg‘u odatda oxirgi bo‘g‘inda: thir-TEEN.',
      'O‘nliklar -ty bilan: <i>twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety</i>; urg‘u birinchi bo‘g‘inda: TWEN-ty. Shuning uchun <i>thirteen</i> va <i>thirty</i> eshitganda urg‘uga qarab farqlanadi. O‘nlik + birlik defis bilan yoziladi: <i>twenty-one, ninety-nine</i>. 100 — <i>a hundred</i> yoki <i>one hundred</i>; 101 — <i>a hundred and one</i> (Britaniya).'
    ]},
    {sarlavha:'Sonlar hayotda: yosh, telefon, narx', xatboshilar:[
      'Yosh: <i>How old are you? — I’m eleven.</i> Telefon raqamlari raqamma-raqam o‘qiladi, 0 — <i>oh</i> yoki <i>zero</i>: 90-123 — <i>nine oh, one two three</i>. Ikkita bir xil raqam — <i>double</i>: 55 — <i>double five</i>.',
      'Narx: <i>How much is it? — It’s five dollars</i>. Sahifa raqami: <i>page twenty-three</i>. Yil: 2026 — <i>twenty twenty-six</i> yoki <i>two thousand and twenty-six</i>.',
      'Sanash (how many?) sanaladigan narsalar bilan: <i>How many balls? — Seven.</i> Sahnadagi son taxtasida 1 dan 10 gacha sonlar sharchalar bilan ham ko‘rsatiladi — sanab tekshiring.'
    ]}
  ],
  formulalar:[
    ['What colour is it? — It’s + rang', 'Rang haqida savol-javob (birlik)'],
    ['What colour are they? — They’re + rang', 'Ko‘plik'],
    ['a/an + rang + ot', 'a red ball, an orange box — sifat otdan oldin'],
    ['13–19 = son + -teen', 'thirteen … nineteen (urg‘u oxirida)'],
    ['20–90 = son + -ty', 'twenty … ninety (urg‘u boshida)'],
    ['o‘nlik-birlik', 'forty-two, ninety-nine (defis bilan)']
  ],
  qiziqarli:[
    '<i>Eleven</i> va <i>twelve</i> qadimgi ingliz tilida «o‘ndan bir ortiq» va «o‘ndan ikki ortiq» ma’nosini bergan (Online Etymology Dictionary).',
    'Britaniya va Amerika imlosi farq qiladi: colour / color, grey / gray — ikkalasi ham to‘g‘ri.',
    '<i>Orange</i> so‘zi avval mevaning nomi bo‘lgan; rang nomi sifatida ingliz tilida XVI asrdan ishlatiladi (Online Etymology Dictionary).',
    'Ingliz tilida «ko‘k» va «moviy» uchun bitta so‘z — blue; farq light blue / dark blue bilan aytiladi.'
  ],
  lugat:[['red', 'qizil'], ['blue', 'ko‘k'], ['green', 'yashil'], ['yellow', 'sariq'], ['orange', 'to‘q sariq'], ['purple', 'binafsha'], ['pink', 'pushti'], ['brown', 'jigarrang'], ['black', 'qora'], ['white', 'oq'], ['grey', 'kulrang'], ['light / dark', 'och / to‘q'], ['eleven, twelve', '11, 12'], ['-teen', '13–19 qo‘shimchasi'], ['-ty', '20–90 qo‘shimchasi'], ['a hundred', '100'], ['How many?', 'Nechta?']],
  manba:E5 + '; ' + CAM + '; ' + ENGL + '; Online Etymology Dictionary «eleven», «twelve», «orange», «forty».',
  ishlanma:ish('5-sinf', 'Yangi bilim berish', 'Interaktiv 3D sahna, xor bilan takrorlash, «Number bingo» o‘yini',
    ['11 ta rang nomi, 1–100 sonlar va «What colour is it?» savol-javobini o‘rgatish.', 'Diqqat, tartib va jamoada ishlash ko‘nikmasini tarbiyalash.', 'Eshitib farqlash (thirteen / thirty) va tez sanash ko‘nikmasini rivojlantirish.'],
    ['11 ta rangni aytadi va yozadi', '1–100 sonlarni o‘qiydi va yozadi (defis bilan)', '«What colour is it? / How many?» savollariga javob beradi', 'Sifatni otdan oldin qo‘yib gap tuzadi'],
    ['MAKON sahnasi «Colours and numbers»', 'Rangli kartochkalar, raqamli kartalar', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Warm-up.</b> Sinfdagi narsalar rangini so‘raydi: «What colour is the door?»', 'Javob beradi.'], ['8–18', '<b>Ranglar.</b> MAKON da kublarni bosib, so‘z–talaffuz; shaklni bo‘yash: «It’s a red ball».', 'Takrorlaydi, gap tuzadi.'], ['18–28', '<b>Sonlar.</b> 1–12, -teen, -ty, defis; son taxtasida misollar; thirteen/thirty farqi.', 'Sonlarni o‘qiydi, yozadi.'], ['28–36', '<b>Amaliyot.</b> MAKON amaliyoti + «Number bingo».', 'Bajaradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['colour', 'rang'], ['purple', 'binafsha'], ['fifteen', '15'], ['forty', '40']],
    [['«Sariq» inglizcha?', 'yellow'], ['15?', 'fifteen'], ['42 qanday yoziladi?', 'forty-two'], ['Sifat otdan oldinmi, keyinmi?', 'oldin: a red ball']],
    'Darslikdagi mashqlar; uydagi 10 ta narsaning rangini inglizcha yozing («The door is brown»); 1 dan 100 gacha o‘nliklarni va 13–19 ni yoddan yozing.',
    E5 + '; ' + CAM)
};


/* ================================================================
   3. AT THE MARKET: FOOD AND PRICES — 6-sinf (en-bozor)
   ================================================================ */
bogla('ingliz', 'At the market: food and prices', 'en-bozor', '3D rasta: 15 mahsulot, countable / uncountable, «How much…? How many…?»');
L['en-bozor'] = {
  fan:'ingliz', qisqaNom:'At the market', nom:'At the market: food and prices — bozorda: oziq-ovqat va narxlar', sinf:'6-sinf',
  qisqa:'6-sinf · Ingliz tili · «At the market» · countable / uncountable',
  sahna:'til_en_bozor',
  kor:{
    sarlavha:'How much is the cheese? — It’s $8 a kilo.',
    matn:'Sahnada bozor rastasi: olma, banan, apelsin, pomidor, kartoshka, sabzi, piyoz, tuxum, tarvuz, uzum — sanaladigan (countable); non, pishloq, sut, guruch, asal — sanalmaydigan (uncountable). Mahsulotni <b>bosing</b>: so‘z, transkripsiya, tarjima, narx yorlig‘i va to‘g‘ri savol: sanaladigan uchun <i>How much are the apples?</i>, sanalmaydigan uchun <i>How much is the milk?</i>. Narxlar namuna, «$» shartli.',
    punktlar:['<b>Countable</b> (sanaladi): an apple → two apples; <i>How many apples?</i>','<b>Uncountable</b> (sanalmaydi): bread, milk, rice — ko‘plik yo‘q; <i>How much milk?</i>','<b>Miqdor so‘zlari:</b> some / any (ikkalasi bilan), many (countable), much (uncountable), a lot of (ikkalasi)','<b>Idish/o‘lchov bilan sanash:</b> a loaf of bread, a litre of milk, a kilo of rice, a jar of honey']
  },
  bolimlar:[
    {sarlavha:'Mahsulotlar (lug‘at va narx — namuna)', jadval:Object.keys(SZ.bozor || {}).map(k=>[SZ.bozor[k].en + ' ' + SZ.bozor[k].ipa, SZ.bozor[k].uz + ' · ' + (SZ.bozor[k].san ? 'countable' : 'uncountable') + ' · ' + SZ.bozor[k].narx])},
    {sarlavha:'Countable va uncountable bilan so‘zlar', jadval:[
      ['a / an', 'faqat countable birlik: an egg, a tomato'],
      ['some', 'tasdiqda, ikkalasi bilan: some apples, some milk'],
      ['any', 'savol va inkorda: Are there any eggs? There isn’t any bread.'],
      ['many / much', 'How many apples? / How much rice?'],
      ['a lot of / lots of', 'ikkalasi bilan: a lot of carrots, a lot of honey'],
      ['a few / a little', 'a few grapes (sanaladi) / a little cheese (sanalmaydi)']
    ]},
    {sarlavha:'Dialog namunasi', jadval:[['Customer', 'Excuse me, how much are the tomatoes?'], ['Seller', 'They’re one dollar a kilo.'], ['Customer', 'Can I have two kilos, please? And how much is the honey?'], ['Seller', 'It’s six dollars a jar.'], ['Customer', 'I’ll take one jar. Here you are.'], ['Seller', 'Thank you. Here’s your change.']]}
  ],
  bosqichlar:[
    {sarlavha:'Bozorga xush kelibsiz', matn:'Rastada 15 xil mahsulot. Har birining narx yorlig‘i bor. Mahsulotni bosib, so‘zni eshiting. Yozuvlar tugmasi inglizcha nomlarni chiqaradi.', holat:{hamma:true, yozuv:true}},
    {sarlavha:'Countable — sanaladigan', matn:'Olma, banan, tuxum … — ularni donalab sanash mumkin: <i>one apple, two apples</i>. Ko‘plik -s / -es bilan: tomato → tomato<b>es</b>, potato → potato<b>es</b>. Savol: <i>How many apples?</i>', holat:{filtr:'countable'}},
    {sarlavha:'Uncountable — sanalmaydigan', matn:'Non, pishloq, sut, guruch, asal — donalab sanalmaydi, ko‘plik shakli yo‘q («milks» yo‘q). Savol: <i>How much milk?</i> Sanash uchun idish yoki o‘lchov: <i>a litre of milk, a loaf of bread</i>.', holat:{filtr:'uncountable'}},
    {sarlavha:'How much is …? (uncountable)', matn:'Sanalmaydigan mahsulot narxi: <i>How much is the cheese? — It’s $8 a kilo.</i> Fe’l birlikda — <b>is</b>.', holat:{predmet:'cheese'}},
    {sarlavha:'How much are …? (countable ko‘plik)', matn:'Sanaladigan ko‘plik narxi: <i>How much are the apples? — They’re $2 a kilo.</i> Fe’l ko‘plikda — <b>are</b>. E’tibor: narx haqida doim <i>How much</i>, hatto countable bo‘lsa ham!', holat:{predmet:'apples'}},
    {sarlavha:'some / any', matn:'Tasdiqda <i>some</i>: <i>I’d like some grapes.</i> Savol va inkorda <i>any</i>: <i>Have you got any honey? — No, we haven’t got any honey today.</i>', holat:{predmet:'grapes'}},
    {sarlavha:'Dialog: bozorda', matn:'<i>Customer: Excuse me, how much is the honey? Seller: It’s six dollars a jar. Customer: I’ll take one, please.</i> Asalni bosib, gapni eshiting.', holat:{predmet:'honey'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Shopping at the market', holat:{hamma:true, yozuv:false},
    topshiriqlar:[
      {shart:'Find the <b>cheese</b>. <i>How much is the cheese?</i>', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.nom==='cheese'", izoh:'To‘g‘ri — <b>cheese</b> /tʃiːz/ pishloq, uncountable: <i>It’s $8 a kilo.</i>'},
      {shart:'Find an <b>uncountable</b> product that you drink.', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.nom==='milk'", izoh:'To‘g‘ri — <b>milk</b> /mɪlk/ sut. <i>How much milk? — A litre.</i>'},
      {shart:'Find a <b>countable</b> product that costs <b>$1 a kilo</b>.', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.sanaladi && ev.narx==='$1 a kilo'", izoh:'To‘g‘ri — <b>tomatoes</b> yoki <b>carrots</b>: <i>They’re one dollar a kilo.</i>'},
      {shart:'Find the product that is sold <b>in a jar</b>.', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.nom==='honey'", izoh:'To‘g‘ri — <b>honey</b> /ˈhʌn.i/ asal: <i>a jar of honey</i>.'},
      {shart:'Find the <b>eggs</b>. <i>How much are ten eggs?</i>', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.nom==='eggs'", izoh:'To‘g‘ri — <b>eggs</b> /eɡz/ tuxum, countable: <i>They’re $2 for ten.</i>'},
      {shart:'Find the <b>bread</b>. <i>A loaf of …</i>', hodisa:'til-soz', kod:"ev.sahna==='bozor' && ev.nom==='bread'", izoh:'To‘g‘ri — <b>bread</b> /bred/ non, uncountable: <i>a loaf of bread</i>. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Qaysi ot sanalmaydi (uncountable)?', v:['apple','egg','rice','carrot'], t:2, izoh:'<b>rice</b> — guruch, sanalmaydi (ko‘pligi yo‘q). Apple, egg, carrot — sanaladi.'},
    {s:'«How ___ apples do you want?»', v:['much','many','a lot','some'], t:1, izoh:'Countable ko‘plik bilan <b>How many</b>.'},
    {s:'«How ___ is the milk?»', v:['many','much','some','any'], t:1, izoh:'Narx haqida doim <b>How much</b>: How much is the milk?'},
    {s:'«tomato» so‘zining ko‘pligi?', v:['tomatos','tomatoes','tomatoies','tomato'], t:1, izoh:'-o bilan tugagan ba’zi otlar -es oladi: <b>tomatoes</b>, potatoes.'},
    {s:'«I’d like ___ bread, please.»', v:['a','an','some','many'], t:2, izoh:'Sanalmaydigan ot bilan tasdiqda <b>some</b>: some bread.'},
    {s:'«Have you got ___ eggs?»', v:['any','much','a','an'], t:0, izoh:'Savolda <b>any</b>: Have you got any eggs?'},
    {s:'«How much are the bananas?» — to‘g‘ri javob?', v:['It’s $1.50 a kilo.','They’re $1.50 a kilo.','There are $1.50.','It is a kilo.'], t:1, izoh:'Ko‘plik (bananas) — <b>They’re</b> $1.50 a kilo.'},
    {s:'«a loaf of ___» — bo‘sh joyni to‘ldiring.', v:['milk','honey','bread','rice'], t:2, izoh:'<b>a loaf of bread</b> — bir buxanka non. a litre of milk, a jar of honey, a kilo of rice.'},
    {s:'«pishloq» inglizcha?', v:['chess','cheese','chips','cherry'], t:1, izoh:'<b>cheese</b> /tʃiːz/ — pishloq. chess — shaxmat, chips — kartoshka fri, cherry — gilos.'},
    {s:'Qaysi gap to‘g‘ri?', v:['There is many milk.','There are a lot of milk.','There is a lot of milk.','There are some milks.'], t:2, izoh:'Milk sanalmaydi: birlik fe’l + a lot of — <b>There is a lot of milk.</b>'},
    T3('Sahnada <b>bread</b> (non)ni bosing.', 'til-soz', 'nom', ['bread'], ['bread — non', 'boshqa mahsulot'], '<b>bread</b> /bred/ — non, sanalmaydi: a loaf of bread.')
  ],
  yordamchi:[
    {s:'Fruit sanaladimi?', j:'<i>Fruit</i> odatda sanalmaydi: «some fruit», «a piece of fruit». Lekin alohida mevalar (apple, banana) sanaladi. «Fruits» turli meva turlari haqida gapirganda ishlatiladi.', kalit:['fruit','sanaladi']},
    {s:'Nega narxda doim «How much»?', j:'«How much» ikki ma’noda: miqdor (sanalmaydigan ot bilan: how much rice?) va narx (how much is it? how much are they?). Narx — pul miqdori, shuning uchun countable bo‘lsa ham «How much are the apples?»', kalit:['how much','narx']},
    {s:'Narxlar haqiqiymi?', j:'Yo‘q, narxlar o‘quv namunasi; «$» belgisi shartli. Haqiqiy narxlar bozor va mamlakatga qarab farq qiladi.', kalit:['narx','haqiqiy']}
  ],
  maqola:[
    {sarlavha:'Countable va uncountable — nega bu muhim?', xatboshilar:[
      'Ingliz tilida otlar ikki guruhga bo‘linadi. Sanaladigan (countable) otlarni donalab sanash mumkin: <i>one apple, two apples, three apples</i>. Ularning birlik va ko‘plik shakli bor, birlikda <i>a / an</i> bilan keladi. Sanalmaydigan (uncountable) otlar — modda, suyuqlik, mavhum tushunchalar: <i>water, milk, rice, bread, cheese, money, information</i>. Ular ko‘plik shaklini olmaydi va <i>a / an</i> bilan kelmaydi.',
      'Bu farq grammatikaga ta’sir qiladi: <i>How many eggs?</i> lekin <i>How much milk?</i>; <i>There are some apples</i> lekin <i>There is some rice</i>; <i>a few carrots</i> lekin <i>a little honey</i>. <i>Some, any, a lot of</i> esa ikkalasi bilan ishlatiladi.',
      'Ba’zi so‘zlar o‘zbek tilida sanalsa ham, ingliz tilida sanalmaydi: <i>bread</i> (non), <i>furniture</i> (mebel), <i>advice</i> (maslahat), <i>news</i> (yangilik). Shuning uchun «a bread» emas, <i>a loaf of bread</i> yoki <i>a piece of bread</i> deyiladi.'
    ]},
    {sarlavha:'Sanalmaydiganni qanday sanaymiz?', xatboshilar:[
      'Idish yoki o‘lchov birligi qo‘shiladi: <i>a bottle of water</i> (bir shisha suv), <i>a litre of milk</i>, <i>a kilo of rice</i>, <i>a jar of honey</i>, <i>a loaf of bread</i>, <i>a piece of cheese</i>, <i>a cup of tea</i>, <i>a bag of flour</i>. Endi o‘lchov so‘zi sanaladi: <i>two litres of milk, three loaves of bread</i> (loaf → loaves).',
      'Bozorda savdolashish uchun shu qurilma kerak: <i>Can I have two kilos of tomatoes and a jar of honey, please?</i> Javob: <i>Here you are. That’s eight dollars.</i>',
      'Ko‘plik yasash qoidalari ham eslab qolinadi: tomato → tomatoes, potato → potatoes (-es), lekin photo → photos; cherry → cherries (-y → -ies); loaf → loaves, knife → knives (-f → -ves).'
    ]},
    {sarlavha:'Bozorda muloqot: so‘rash, narx, to‘lov', xatboshilar:[
      'Suhbat odatda <i>Excuse me</i> bilan boshlanadi. Narxni so‘rash: <i>How much is the cheese? How much are the eggs?</i> Javob: <i>It’s six dollars a kilo. They’re two dollars for ten.</i> «a kilo», «a litre» — «bir kilosi», «bir litri» ma’nosida.',
      'Sotib olish: <i>Can I have …, please? I’d like …, please. I’ll take two kilos.</i> To‘lov: <i>Here you are</i> (mana, oling), <i>Here’s your change</i> (mana qaytimingiz), <i>Keep the change</i> (qaytimi kerak emas).',
      'Ingliz tilida narxlarni aytish: $1.50 — <i>one dollar fifty</i> yoki <i>a dollar fifty</i>; £2.99 — <i>two pounds ninety-nine</i>. Darsdagi narxlar namuna; O‘zbekistonda so‘mda: <i>It’s twenty thousand soums a kilo.</i>'
    ]}
  ],
  formulalar:[
    ['How much is + uncountable / birlik?', 'How much is the honey? — It’s $6 a jar.'],
    ['How much are + ko‘plik?', 'How much are the apples? — They’re $2 a kilo.'],
    ['How many + countable ko‘plik?', 'How many eggs? — Ten.'],
    ['How much + uncountable?', 'How much rice? — A kilo.'],
    ['some (tasdiq) / any (savol, inkor)', 'some bread · any bread?'],
    ['o‘lchov + of + uncountable', 'a loaf of bread, a litre of milk, a jar of honey']
  ],
  qiziqarli:[
    '<i>Bread</i>, <i>furniture</i>, <i>advice</i>, <i>news</i> ingliz tilida sanalmaydi: «an advice» emas, «a piece of advice».',
    '<i>Grapes</i> sanaladi (a grape, grapes), lekin <i>fruit</i> odatda sanalmaydi (some fruit).',
    '<i>Loaf</i> so‘zining ko‘pligi <i>loaves</i>; xuddi shunday knife → knives, leaf → leaves.',
    'Pul ham sanalmaydi: <i>money</i> — «How much money?»; lekin <i>dollar</i>, <i>pound</i> sanaladi: five dollars.'
  ],
  lugat:[['countable', 'sanaladigan ot'], ['uncountable', 'sanalmaydigan ot'], ['How much?', 'Qancha? (narx yoki sanalmaydigan miqdor)'], ['How many?', 'Nechta?'], ['some / any', 'bir oz, bir nechta (tasdiq / savol-inkor)'], ['a loaf of bread', 'bir buxanka non'], ['a jar of honey', 'bir banka asal'], ['a litre of milk', 'bir litr sut'], ['a kilo of', 'bir kilo …'], ['Here you are.', 'Mana, oling.'], ['change', 'qaytim'], ['customer / seller', 'xaridor / sotuvchi']],
  manba:E6 + '; ' + CAM + '; ' + ENGL + '. Narxlar — o‘quv namunasi, haqiqiy emas.',
  ishlanma:ish('6-sinf', 'Yangi bilim berish', 'Interaktiv 3D sahna, rolli o‘yin «Bozorda», juftlikda dialog',
    ['Oziq-ovqat nomlari, countable / uncountable farqi, «How much / How many» va some / any ni o‘rgatish.', 'Muomala madaniyati (Excuse me, please, thank you), tejamkorlikni tarbiyalash.', 'Dialog tuzish, eshitib tushunish va o‘z fikrini ifodalash ko‘nikmasini rivojlantirish.'],
    ['15 ta mahsulot nomini aytadi va countable / uncountable ga ajratadi', '«How much is / are …?» savolini to‘g‘ri tuzadi va javob beradi', 'some / any / many / much ni to‘g‘ri ishlatadi', 'Bozorda 6–8 replikali dialog tuzadi'],
    ['MAKON sahnasi «At the market»', 'Mahsulot rasmlari va narx yorliqlari (qog‘oz)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Warm-up.</b> «What do you buy at the market?»', 'Bilgan so‘zlarini aytadi.'], ['8–18', '<b>Lug‘at.</b> MAKON rastasidagi mahsulotlarni bosib, so‘z–talaffuz; countable / uncountable filtri.', 'Takrorlaydi, jadvalga ajratadi.'], ['18–27', '<b>Grammatika.</b> How much / How many, some / any, o‘lchov so‘zlari.', 'Gaplar tuzadi.'], ['27–36', '<b>Rolli o‘yin.</b> MAKON amaliyoti; juftlikda sotuvchi–xaridor dialogi.', 'Dialog ijro etadi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['countable', 'sanaladigan'], ['uncountable', 'sanalmaydigan'], ['How much is it?', 'Narxi qancha?'], ['a loaf of bread', 'bir buxanka non']],
    [['«rice» sanaladimi?', 'yo‘q — uncountable'], ['How ___ eggs?', 'many'], ['«tomato» ko‘pligi?', 'tomatoes'], ['Savolda some yoki any?', 'any']],
    'Darslikdagi mashqlar; oilangiz uchun bozor ro‘yxatini inglizcha yozing (10 ta mahsulot, miqdori bilan: two kilos of potatoes, a litre of milk …); 6 replikali dialog tuzing.',
    E6 + '; ' + CAM)
};

/* ================================================================
   4. DAILY ROUTINE AND TELLING THE TIME — 6-sinf (en-vaqt)
   ================================================================ */
bogla('ingliz', 'Daily routine and telling the time', 'en-vaqt', '3D soat va 9 ta kundalik ish; Present Simple; o’clock, past, to');
L['en-vaqt'] = {
  fan:'ingliz', qisqaNom:'Daily routine & time', nom:'Daily routine and telling the time — kun tartibi va soatni aytish', sinf:'6-sinf',
  qisqa:'6-sinf · Ingliz tili · «What time is it?» · Present Simple',
  sahna:'til_en_vaqt',
  kor:{
    sarlavha:'I get up at seven o’clock.',
    matn:'Sahnada katta 3D soat va uning atrofida 9 ta kundalik ish: get up, brush my teeth, have breakfast, go to school, have lunch, do my homework, play football, have dinner, go to bed. Ishni <b>bosing</b> — strelkalar o‘sha vaqtga buriladi va gap inglizcha aytiladi: <i>I have breakfast at half past seven.</i> Pastdagi tugmalar bilan vaqtni o‘zgartiring (± 1 soat, ± 5 daqiqa) va «Say the time» bilan eshiting: <i>It’s quarter to nine.</i>',
    punktlar:['<b>Savol:</b> <i>What time is it? / What’s the time?</i> — <i>It’s seven o’clock.</i>','<b>past / to:</b> daqiqa 30 gacha — <i>past</i> (ten past seven = 7:10); 30 dan keyin — <i>to</i> (ten to eight = 7:50)','<b>quarter / half:</b> 7:15 — quarter past seven; 7:30 — half past seven; 7:45 — quarter to eight','<b>Present Simple:</b> I/you/we/they get up; he/she/it get<b>s</b> up — doimiy odat uchun']
  },
  bolimlar:[
    {sarlavha:'Kundalik ishlar (lug‘at)', jadval:Object.keys(SZ.vaqt || {}).map(k=>[SZ.vaqt[k].en + ' ' + SZ.vaqt[k].ipa, SZ.vaqt[k].uz + ' · ' + SZ.vaqt[k].misol])},
    {sarlavha:'Soatni aytish (British)', jadval:[['7:00', 'seven o’clock'], ['7:05', 'five past seven'], ['7:15', 'quarter past seven'], ['7:20', 'twenty past seven'], ['7:30', 'half past seven'], ['7:40', 'twenty to eight'], ['7:45', 'quarter to eight'], ['7:55', 'five to eight'], ['7:03', 'three minutes past seven'], ['Raqam bilan', 'seven fifteen, seven thirty (ikkalasi ham to‘g‘ri)']]},
    {sarlavha:'Present Simple', jadval:[['I / you / we / they', 'get up, go, have, do, play'], ['he / she / it', 'gets up, goes, has, does, plays (-s / -es)'], ['Inkor', 'I don’t get up early. She doesn’t play football.'], ['Savol', 'Do you get up at seven? Does he go to school?'], ['Takrorlik ravishlari', 'always, usually, often, sometimes, never — fe’ldan oldin: I always brush my teeth.']]}
  ],
  bosqichlar:[
    {sarlavha:'o’clock — aniq soat', matn:'Daqiqa strelkasi 12 da bo‘lsa — <i>o’clock</i>: <i>It’s seven o’clock.</i> «I get up at seven o’clock.» Karavotni bosing.', holat:{ish:'get_up'}},
    {sarlavha:'quarter past — chorak o‘tdi', matn:'7:15 — <i>It’s quarter past seven.</i> Daqiqa strelkasi 3 da. «I brush my teeth at quarter past seven.»', holat:{ish:'brush_teeth'}},
    {sarlavha:'half past — yarim', matn:'7:30 — <i>It’s half past seven.</i> O‘zbekchada «sakkiz yarim» desak, ingliz tilida «yetti yarim o‘tdi» — half past <b>seven</b>! «I have breakfast at half past seven.»', holat:{ish:'have_breakfast'}},
    {sarlavha:'past — 30 gacha', matn:'Daqiqa 30 dan kam bo‘lsa <i>past</i> (o‘tdi): 8:10 — <i>ten past eight</i>, 8:20 — <i>twenty past eight</i>. Pastdagi «+ 5 min» bilan sinab ko‘ring.', holat:{soat:8, daqiqa:10}},
    {sarlavha:'to — 30 dan keyin', matn:'Daqiqa 30 dan oshsa keyingi soatga qarab <i>to</i> (qoldi): 8:40 — <i>twenty to nine</i>, 8:45 — <i>quarter to nine</i>, 8:55 — <i>five to nine</i>.', holat:{soat:8, daqiqa:45}},
    {sarlavha:'Tushdan keyin: p.m.', matn:'Soat 12 soatlik: 15:30 — <i>half past three</i> yoki <i>3:30 p.m.</i> / <i>in the afternoon</i>. «I do my homework at half past three.»', holat:{ish:'do_homework'}},
    {sarlavha:'Kun tartibi — Present Simple', matn:'Odat bo‘lgan ishlar Present Simple da: <i>I get up at seven. I go to bed at half past nine.</i> U haqida: <i>She goes to bed at ten.</i> Karavotni (go to bed) bosing.', holat:{ish:'go_to_bed'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'What time is it?', holat:{soat:6, daqiqa:0},
    topshiriqlar:[
      {shart:'Make the clock show <b>seven o’clock</b> (pastdagi tugmalar bilan).', hodisa:'til-vaqt', kod:"ev.soat%12===7 && ev.daqiqa===0", izoh:'To‘g‘ri — <b>It’s seven o’clock.</b>'},
      {shart:'Now show <b>half past seven</b>.', hodisa:'til-vaqt', kod:"ev.soat%12===7 && ev.daqiqa===30", izoh:'To‘g‘ri — <b>half past seven</b> = 7:30.'},
      {shart:'Show <b>quarter to nine</b>.', hodisa:'til-vaqt', kod:"ev.soat%12===8 && ev.daqiqa===45", izoh:'To‘g‘ri — <b>quarter to nine</b> = 8:45 (to‘qqizga chorak qoldi).'},
      {shart:'Show <b>twenty past ten</b>.', hodisa:'til-vaqt', kod:"ev.soat%12===10 && ev.daqiqa===20", izoh:'To‘g‘ri — <b>twenty past ten</b> = 10:20.'},
      {shart:'Click the activity <b>«go to school»</b>. What time is it?', hodisa:'til-vaqt', kod:"ev.ish==='go_to_school' && ev.bosildi", izoh:'To‘g‘ri — <b>I go to school at eight o’clock.</b>'},
      {shart:'Click the activity <b>«play football»</b>.', hodisa:'til-vaqt', kod:"ev.ish==='play_football' && ev.bosildi", izoh:'To‘g‘ri — <b>I play football at five o’clock</b> (5 p.m., in the afternoon). Amaliyot tugadi!'}
    ]},
  test:[
    {s:'7:30 inglizcha?', v:['half past eight','half to seven','half past seven','seven and half'], t:2, izoh:'<b>half past seven</b> — yetti yarim (7:30). O‘zbekchadagi «sakkiz yarim» bilan adashtirmang.'},
    {s:'«quarter to nine» qaysi vaqt?', v:['9:15','8:45','9:45','8:15'], t:1, izoh:'<b>8:45</b> — to‘qqizga chorak qoldi.'},
    {s:'10:10 inglizcha?', v:['ten to ten','ten past ten','ten o’clock ten','ten and ten'], t:1, izoh:'<b>ten past ten</b> — o‘ndan o‘n daqiqa o‘tdi.'},
    {s:'«She ___ up at seven o’clock.»', v:['get','gets','getting','is get'], t:1, izoh:'He/she/it bilan Present Simple da -s: <b>gets</b>.'},
    {s:'«nonushta qilmoq» inglizcha?', v:['have lunch','have dinner','have breakfast','do breakfast'], t:2, izoh:'<b>have breakfast</b> — nonushta qilmoq. lunch — tushlik, dinner — kechki ovqat.'},
    {s:'«What time is it?» — «___ half past three.»', v:['It’s','There is','Is it','They’re'], t:0, izoh:'Vaqt haqida <b>It’s</b> …: It’s half past three.'},
    {s:'Inkor gap qaysi?', v:['He don’t play football.','He doesn’t plays football.','He doesn’t play football.','He not play football.'], t:2, izoh:'He/she bilan <b>doesn’t + fe’l</b> (s siz): He doesn’t play football.'},
    {s:'«I ___ brush my teeth in the morning.» (doim)', v:['never','always','sometimes','not'], t:1, izoh:'«Doim» — <b>always</b>; takrorlik ravishi fe’ldan oldin keladi.'},
    {s:'8:55 inglizcha?', v:['five to nine','five past nine','five to eight','fifty-five past nine'], t:0, izoh:'<b>five to nine</b> — to‘qqizga besh daqiqa qoldi.'},
    {s:'Tushdan keyingi vaqt belgisi?', v:['a.m.','p.m.','o’clock','past'], t:1, izoh:'<b>p.m.</b> — tushdan keyin (12:00–24:00); a.m. — tushgacha.'},
    T3('Sahnada <b>«have breakfast»</b> (nonushta) ishini bosing.', 'til-vaqt', 'ish', ['have_breakfast'], ['have breakfast — nonushta', 'boshqa ish'], '<b>have breakfast</b> — nonushta qilmoq: <i>I have breakfast at half past seven.</i>')
  ],
  yordamchi:[
    {s:'half past seven — 7:30 mi yoki 8:30 mi?', j:'7:30. Ingliz tilida «yettidan yarim o‘tdi» — half past seven. O‘zbekchadagi «sakkiz yarim» (7:30) bilan sonlar farq qiladi — diqqat qiling.', kalit:['half past','yarim']},
    {s:'Raqam bilan aytsam bo‘ladimi?', j:'Ha: seven thirty, eight forty-five — bu ham to‘g‘ri va zamonaviy nutqda keng tarqalgan. Lekin darslikda past / to shakli o‘rganiladi.', kalit:['raqam','seven thirty']},
    {s:'a.m. va p.m. nima?', j:'Lotincha ante meridiem (tushgacha) va post meridiem (tushdan keyin). 7 a.m. — ertalab 7, 7 p.m. — kechki 19:00.', kalit:['a.m.','p.m.']}
  ],
  maqola:[
    {sarlavha:'Soatni ingliz tilida aytish', xatboshilar:[
      'Vaqt haqida so‘rash: <i>What time is it?</i> yoki <i>What’s the time?</i> Javob <i>It’s …</i> bilan boshlanadi. Daqiqa strelkasi 12 da bo‘lsa — <i>o’clock</i>: <i>It’s six o’clock.</i> «O’clock» — <i>of the clock</i> iborasining qisqargan shakli (Online Etymology Dictionary).',
      'Daqiqa 30 gacha bo‘lsa <i>past</i> ishlatiladi — «o‘tdi»: 6:10 — <i>ten past six</i>. 15 daqiqa — <i>quarter</i> (chorak): 6:15 — <i>quarter past six</i>; 30 — <i>half</i>: 6:30 — <i>half past six</i>. Daqiqa 30 dan oshsa keyingi soatga qarab <i>to</i> — «qoldi»: 6:40 — <i>twenty to seven</i>, 6:45 — <i>quarter to seven</i>.',
      'Daqiqa 5 ga bo‘linmasa <i>minutes</i> so‘zi qo‘shiladi: 6:03 — <i>three minutes past six</i>. Zamonaviy nutqda raqamli usul ham keng tarqalgan: <i>six fifteen, six forty-five</i>. Ingliz tilida odatda 12 soatlik hisob; tushgacha <i>a.m.</i>, tushdan keyin <i>p.m.</i>, yoki <i>in the morning / in the afternoon / in the evening / at night</i>.'
    ]},
    {sarlavha:'Present Simple — odat va kun tartibi', xatboshilar:[
      'Har kuni takrorlanadigan ishlar Present Simple zamonida aytiladi: <i>I get up at seven. We have lunch at one.</i> Uchinchi shaxs birlikda (he, she, it) fe’lga -s qo‘shiladi: <i>She gets up. He plays football.</i> -o, -sh, -ch, -ss bilan tugagan fe’llarga -es: <i>goes, does, watches, brushes</i>. <i>have</i> → <i>has</i>.',
      'Inkor <i>don’t / doesn’t</i> bilan: <i>I don’t play football. She doesn’t go to bed late.</i> Savol <i>Do / Does</i> bilan: <i>Do you get up early? Does he have breakfast?</i> Qisqa javob: <i>Yes, I do. / No, he doesn’t.</i>',
      'Takrorlik ravishlari (<i>always, usually, often, sometimes, never</i>) asosiy fe’ldan oldin, <i>be</i> fe’lidan keyin keladi: <i>I always brush my teeth. She is never late.</i> Vaqt bilan <i>at</i> predlogi: <i>at seven o’clock, at half past three</i>; kun qismi bilan <i>in</i>: <i>in the morning</i>; lekin <i>at night</i>.'
    ]},
    {sarlavha:'Kun tartibi va salomatlik', xatboshilar:[
      'Tartibli kun tartibi — sog‘lom hayotning asosi. Jahon sog‘liqni saqlash tashkiloti va ko‘plab milliy tavsiyalarga ko‘ra, 6–13 yoshli bolalar uchun 9–11 soat uyqu, 5–17 yoshlilar uchun kuniga kamida 60 daqiqa jismoniy faollik tavsiya etiladi (WHO, 2020 tavsiyalari — jismoniy faollik; uyqu — National Sleep Foundation, 2015).',
      'Shuning uchun sahnadagi kun tartibida ertalab 7:00 da turish, 17:00 da futbol va 21:30 da uxlashga yotish berilgan — bu namunaviy tartib. O‘z kun tartibingizni inglizcha yozib ko‘ring: <i>I get up at …, I go to school at …, I do my homework at …</i>',
      'Hafta kunlari bilan <i>on</i>: <i>on Monday</i>; «har kuni» — <i>every day</i>; «hafta oxiri» — <i>at the weekend</i> (Britaniya) / <i>on the weekend</i> (AQSH).'
    ]}
  ],
  formulalar:[
    ['It’s + soat + o’clock', 'It’s seven o’clock. (7:00)'],
    ['It’s + daqiqa + past + soat', 'It’s ten past seven. (7:10) — 30 gacha'],
    ['It’s + daqiqa + to + keyingi soat', 'It’s ten to eight. (7:50) — 30 dan keyin'],
    ['quarter past / half past / quarter to', '7:15 / 7:30 / 7:45'],
    ['I/you/we/they + fe’l; he/she/it + fe’l-s', 'I get up. She gets up.'],
    ['don’t / doesn’t + fe’l', 'I don’t play. He doesn’t play.'],
    ['at + vaqt, in the morning, at night', 'at seven, in the afternoon, at night']
  ],
  qiziqarli:[
    '«O’clock» — <i>of the clock</i> iborasining qisqargan shakli (Online Etymology Dictionary).',
    'Londondagi mashhur «Big Ben» aslida minora emas, undagi katta qo‘ng‘iroqning nomi; minora 2012-yildan Elizabeth Tower deb ataladi (UK Parliament sayti).',
    '«Half past seven» — 7:30; o‘zbekcha «sakkiz yarim» bilan bir xil vaqt, lekin boshqa son aytiladi.',
    'Jahon sog‘liqni saqlash tashkiloti 5–17 yoshlilarga kuniga kamida 60 daqiqa jismoniy faollikni tavsiya qiladi (WHO, 2020).'
  ],
  lugat:[['What time is it?', 'Soat necha?'], ['o’clock', 'aniq soat (… da)'], ['past', 'o‘tdi (daqiqa 30 gacha)'], ['to', 'qoldi (daqiqa 30 dan keyin)'], ['quarter', 'chorak (15 daqiqa)'], ['half', 'yarim (30 daqiqa)'], ['a.m. / p.m.', 'tushgacha / tushdan keyin'], ['get up', 'turmoq'], ['brush my teeth', 'tishimni yuvmoq'], ['have breakfast / lunch / dinner', 'nonushta / tushlik / kechki ovqat qilmoq'], ['do my homework', 'uy vazifasini bajarmoq'], ['go to bed', 'uxlashga yotmoq'], ['always / usually / sometimes / never', 'doim / odatda / ba’zan / hech qachon'], ['daily routine', 'kun tartibi']],
  manba:E6 + '; ' + CAM + '; ' + ENGL + '; Online Etymology Dictionary «o’clock»; UK Parliament «Big Ben» (parliament.uk); WHO «Guidelines on physical activity and sedentary behaviour» (2020); National Sleep Foundation (2015) uyqu tavsiyalari.',
  ishlanma:ish('6-sinf', 'Yangi bilim berish', 'Interaktiv 3D soat, juftlikda «What time is it?» o‘yini, kun tartibini aytib berish',
    ['Soatni past / to / quarter / half bilan aytish, kun tartibi lug‘ati va Present Simple ni o‘rgatish.', 'Vaqtni qadrlash, tartibli kun tartibi va sog‘lom turmush tarzini tarbiyalash.', 'Eshitib vaqtni aniqlash, o‘z kuni haqida izchil gapirish ko‘nikmasini rivojlantirish.'],
    ['Soatni 5 daqiqa aniqligida inglizcha aytadi', '9 ta kundalik ishni Present Simple da gapiradi (I / he / she)', 'Inkor va savol gap tuzadi (don’t / doesn’t, Do / Does)', 'O‘z kun tartibini 6–8 gap bilan aytib beradi'],
    ['MAKON sahnasi «Daily routine» (3D soat)', 'Qog‘oz soat modeli (har o‘quvchiga)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b> «What time is it now?»', 'Javob beradi.'], ['3–8', '<b>Warm-up.</b> Qog‘oz soatda o’clock vaqtlarini aytish.', 'Soatni ko‘rsatadi.'], ['8–18', '<b>Soatni aytish.</b> MAKON soatida past / to / quarter / half; ± 5 min tugmalari bilan mashq.', 'Vaqtni aytadi.'], ['18–27', '<b>Kun tartibi va Present Simple.</b> Ishlarni bosib gaplarni eshitish; he/she -s.', 'Gaplar tuzadi.'], ['27–36', '<b>Amaliyot.</b> MAKON amaliyoti; juftlikda «What time do you get up?» so‘rovi.', 'So‘raydi, javob beradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['past / to', 'o‘tdi / qoldi'], ['quarter', 'chorak'], ['half past', 'yarim o‘tdi'], ['daily routine', 'kun tartibi']],
    [['7:45?', 'quarter to eight'], ['8:20?', 'twenty past eight'], ['She ___ (get) up at 7.', 'gets'], ['«Doim» inglizcha?', 'always']],
    'O‘z kun tartibingizni 8 ta gap bilan yozing (vaqt bilan); darslikdagi mashqlar; 10 ta vaqtni qog‘oz soatda ko‘rsatib, inglizcha ayting.',
    E6 + '; ' + CAM)
};


/* ================================================================
   5. PREPOSITIONS OF PLACE — 7-sinf (en-joy)
   ================================================================ */
bogla('ingliz', 'Prepositions of place', 'en-joy', '3D quti, stol va to‘p: in, on, under, next to, between, in front of, behind, above');
L['en-joy'] = {
  fan:'ingliz', qisqaNom:'Prepositions of place', nom:'Prepositions of place — o‘rin predloglari: Where is the ball?', sinf:'7-sinf',
  qisqa:'7-sinf · Ingliz tili · «Where is the ball?» · 3D',
  sahna:'til_en_joy',
  kor:{
    sarlavha:'Where is the ball? — It’s under the table.',
    matn:'Sahnada karton quti, stol va futbol to‘pi. Pastdagi tugmalarni bosing — to‘p o‘sha joyga ko‘chadi va gap chiqadi: <i>The ball is in the box</i> (quti qopqoqlari ochiladi), <i>on the box</i>, <i>under the table</i>, <i>next to the box</i>, <i>between the box and the table</i>, <i>in front of</i>, <i>behind</i>, <i>above</i> (ipda osilgan). Har predlogni bosib talaffuzini eshiting.',
    punktlar:['<b>Savol:</b> <i>Where is the ball? Where are the books?</i>','<b>in</b> — ichida, <b>on</b> — ustida (tegib), <b>under</b> — ostida, <b>above</b> — tepasida (tegmasdan)','<b>next to</b> (= beside) — yonida, <b>between</b> — ikki narsa orasida, <b>in front of</b> — oldida, <b>behind</b> — orqasida','Predlogdan keyin odatda <b>the</b> + ot: <i>under the table</i>']
  },
  bolimlar:[
    {sarlavha:'O‘rin predloglari', jadval:Object.keys(SZ.joy || {}).map(k=>[SZ.joy[k].en + ' ' + SZ.joy[k].ipa, SZ.joy[k].uz + ' · ' + SZ.joy[k].gap])},
    {sarlavha:'on, above, over farqi', jadval:[['on', 'ustida, tegib turadi: The book is on the table.'], ['above', 'tepasida, tegmaydi: The lamp is above the table.'], ['over', 'ustidan (harakat yoki qoplash): The plane flies over the city.'], ['under / below', 'ostida (under — bevosita; below — pastroqda)'], ['opposite', 'ro‘parasida: The bank is opposite the school.'], ['near', 'yaqinida: The school is near my house.']]}
  ],
  bosqichlar:[
    {sarlavha:'in — ichida', matn:'Qopqoqlar ochiladi, to‘p qutining ichida: <i>The ball is in the box.</i> Yopiq joy (quti, xona, sumka) bilan <i>in</i>.', holat:{joy:'in'}},
    {sarlavha:'on — ustida', matn:'To‘p qutining ustida, unga tegib turibdi: <i>The ball is on the box.</i> Yuza bilan tegib tursa — <i>on</i>.', holat:{joy:'on'}},
    {sarlavha:'under — ostida', matn:'To‘p stolning ostida: <i>The ball is under the table.</i>', holat:{joy:'under'}},
    {sarlavha:'above — tepasida (tegmasdan)', matn:'To‘p qutining tepasida havoda: <i>The ball is above the box.</i> Farq: <i>on</i> — tegib, <i>above</i> — tegmasdan.', holat:{joy:'above'}},
    {sarlavha:'next to — yonida', matn:'To‘p qutining yonida: <i>The ball is next to the box.</i> (= beside the box). Ikkisi bir qatorda, orasida hech narsa yo‘q.', holat:{joy:'next_to'}},
    {sarlavha:'between — orasida', matn:'To‘p quti bilan stol orasida: <i>The ball is between the box and the table.</i> Ikki narsa — <i>between A and B</i>.', holat:{joy:'between'}},
    {sarlavha:'in front of / behind', matn:'To‘p qutining oldida: <i>The ball is in front of the box.</i> Orqasida bo‘lsa — <i>behind the box</i>. «Behind» tugmasini bosib solishtiring.', holat:{joy:'in_front_of'}}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Where is the ball?',
    topshiriqlar:[
      {shart:'Sahnaga qarang. Where is the ball?', holat:{joy:'under', yashir:true}, v:['It’s on the table.','It’s under the table.','It’s in the box.','It’s behind the box.'], t:1, izoh:'To‘p stol ostida — <b>under the table</b>.'},
      {shart:'Where is the ball now?', holat:{joy:'in', yashir:true}, v:['It’s in the box.','It’s on the box.','It’s next to the box.','It’s above the box.'], t:0, izoh:'Qopqoqlar ochiq, to‘p ichkarida — <b>in the box</b>.'},
      {shart:'Where is the ball?', holat:{joy:'between', yashir:true}, v:['It’s behind the table.','It’s in front of the box.','It’s between the box and the table.','It’s under the box.'], t:2, izoh:'Quti bilan stol orasida — <b>between the box and the table</b>.'},
      {shart:'Where is the ball?', holat:{joy:'above', yashir:true}, v:['It’s on the box.','It’s above the box.','It’s under the box.','It’s in the box.'], t:1, izoh:'To‘p havoda, qutiga tegmaydi — <b>above the box</b>. Tegib tursa — on.'},
      {shart:'Where is the ball?', holat:{joy:'behind', yashir:true}, v:['It’s in front of the box.','It’s next to the box.','It’s behind the box.','It’s on the box.'], t:2, izoh:'Qutining orqasida — <b>behind the box</b>.'},
      {shart:'Where is the ball?', holat:{joy:'next_to', yashir:true}, v:['It’s next to the box.','It’s between the box and the table.','It’s under the table.','It’s above the box.'], t:0, izoh:'Qutining yonida — <b>next to the box</b> (= beside).'}
    ]},
  test:[
    {s:'«Kitob stol ustida» — to‘g‘ri gap?', v:['The book is in the table.','The book is on the table.','The book is at the table.','The book is above the table.'], t:1, izoh:'Yuzaga tegib tursa — <b>on</b>: The book is on the table.'},
    {s:'«between» ma’nosi?', v:['orqasida','orasida','oldida','ostida'], t:1, izoh:'<b>between</b> — ikki narsa orasida: between the box and the table.'},
    {s:'«The lamp is ___ the table.» (tepasida, tegmaydi)', v:['on','above','under','in'], t:1, izoh:'Tegmasdan tepasida — <b>above</b>.'},
    {s:'«next to» ning sinonimi?', v:['behind','beside','between','below'], t:1, izoh:'<b>beside</b> = next to — yonida.'},
    {s:'«The cat is ___ the box.» (qutining ichida)', v:['on','in','at','by'], t:1, izoh:'Yopiq joy ichida — <b>in</b>.'},
    {s:'«in front of» ning teskarisi?', v:['behind','under','next to','above'], t:0, izoh:'in front of — oldida, <b>behind</b> — orqasida.'},
    {s:'Savolni to‘g‘ri tuzing: «To‘p qayerda?»', v:['Where the ball is?','Where is the ball?','Where ball is?','Is where the ball?'], t:1, izoh:'<b>Where is the ball?</b> — so‘roq so‘z + is + ega.'},
    {s:'«The school is ___ the bank.» (ro‘parasida)', v:['opposite','between','behind','under'], t:0, izoh:'<b>opposite</b> — ro‘parasida, qarshisida.'},
    {s:'«under» ma’nosi?', v:['ustida','ostida','yonida','ichida'], t:1, izoh:'<b>under</b> — ostida, tagida.'},
    {s:'«The ball is between the box ___ the table.»', v:['or','and','with','to'], t:1, izoh:'between A <b>and</b> B.'},
    T3('Sahnada <b>table</b> (stol)ni bosing.', 'til-narsa', 'nom', ['table'], ['table — stol', 'boshqa narsa'], '<b>table</b> /ˈteɪ.bəl/ — stol; to‘p ko‘pincha <i>under the table</i>.')
  ],
  yordamchi:[
    {s:'on bilan above farqi?', j:'on — narsa yuzaga tegib turadi (a book on the table). above — tepasida, lekin tegmaydi (a lamp above the table). over — ustidan o‘tish yoki qoplash ma’nosida (a bridge over the river).', kalit:['on','above','over']},
    {s:'at qachon ishlatiladi?', j:'at — nuqta sifatidagi joy: at the door (eshik oldida), at school, at the bus stop. in — ichida (in the room), on — yuzada (on the wall).', kalit:['at','in','on']}
  ],
  maqola:[
    {sarlavha:'Predlog nima va nega kerak?', xatboshilar:[
      'Predlog (preposition) — otdan oldin kelib, uning boshqa so‘zga munosabatini bildiruvchi yordamchi so‘z. O‘zbek tilida bu vazifani kelishik qo‘shimchalari va ko‘makchilar bajaradi: «stol<b>da</b>», «quti <b>ichida</b>». Ingliz tilida esa so‘z o‘zgarmaydi, oldiga predlog qo‘yiladi: <i>on the table, in the box</i>.',
      'O‘rin predloglari «qayerda?» savoliga javob beradi: <i>Where is the ball? — It’s under the table.</i> Predlogdan keyin odatda aniq artikl bilan ot keladi: <i>in the room, behind the door</i>. Olmosh kelsa, obyekt shaklida: <i>next to me, behind him</i>.',
      'Eng ko‘p ishlatiladigan o‘rin predloglari: <i>in, on, under, above, next to (beside), between, in front of, behind, opposite, near, at</i>. Ularni sahnadagi to‘p bilan ko‘rib, eslab qoling.'
    ]},
    {sarlavha:'Adashtiriladigan juftliklar', xatboshilar:[
      '<i>on</i> va <i>above</i>: ikkalasi «ustida», lekin <i>on</i> — tegib turadi, <i>above</i> — tegmaydi. <i>The picture is on the wall</i> (devorga osilgan, tegib turibdi), <i>The clock is above the door</i> (eshik tepasida).',
      '<i>under</i> va <i>below</i>: <i>under</i> — bevosita ostida (<i>under the table</i>), <i>below</i> — pastroqda, umuman (<i>below sea level</i> — dengiz sathidan past). <i>in front of</i> va <i>opposite</i>: <i>in front of</i> — bir tomonga qaragan holda oldida, <i>opposite</i> — ro‘parasida, yuzma-yuz (ko‘cha narigi tomonida).',
      '<i>between</i> — ikki narsa orasida (<i>between the box and the table</i>), <i>among</i> — ko‘p narsa orasida (<i>among the trees</i>).'
    ]},
    {sarlavha:'Yo‘l va shahar tasvirida', xatboshilar:[
      'O‘rin predloglari yo‘l ko‘rsatishda juda kerak: <i>The bank is next to the post office. The hospital is opposite the park. The café is between the library and the cinema.</i> Bu 9-sinfdagi «In the city» darsida davom etadi.',
      'Xona tasvirida ham: <i>There is a carpet on the floor. The desk is next to the window. My bag is under the chair.</i> O‘z xonangizni shu predloglar bilan tasvirlab ko‘ring — 5-sinfdagi «My room» darsidagi so‘zlar bilan.'
    ]}
  ],
  formulalar:[
    ['Where is + ot? — It’s + predlog + the + ot', 'Where is the ball? — It’s under the table.'],
    ['Where are + ko‘plik? — They’re …', 'Where are the books? — They’re on the shelf.'],
    ['between A and B', 'between the box and the table'],
    ['on (tegib) ≠ above (tegmasdan)', 'on the table / above the table'],
    ['next to = beside', 'next to the box = beside the box']
  ],
  qiziqarli:[
    '«Preposition» so‘zi lotincha <i>prae</i> (oldin) + <i>positio</i> (qo‘yish) — «oldiga qo‘yilgan» so‘z degani.',
    'Ingliz tilida predlog gap oxirida ham kelishi mumkin: <i>What are you looking at?</i> — bu to‘g‘ri va tabiiy.',
    '<i>Between</i> — ikki narsa orasida, <i>among</i> — ko‘p narsa orasida: between two trees, among the trees.',
    'Amerika va Britaniya ingliz tilida ba’zi predloglar farq qiladi: <i>at the weekend</i> (UK) — <i>on the weekend</i> (US).'
  ],
  lugat:[['preposition of place', 'o‘rin predlogi'], ['in', 'ichida'], ['on', 'ustida (tegib)'], ['under', 'ostida'], ['above', 'tepasida (tegmasdan)'], ['next to / beside', 'yonida'], ['between', 'orasida (ikki narsa)'], ['in front of', 'oldida'], ['behind', 'orqasida'], ['opposite', 'ro‘parasida'], ['near', 'yaqinida'], ['among', 'orasida (ko‘p narsa)'], ['Where …?', 'Qayerda …?']],
  manba:E7 + '; ' + CAM + '; ' + ENGL + '; Online Etymology Dictionary «preposition».',
  ishlanma:ish('7-sinf', 'Yangi bilim berish', 'Interaktiv 3D sahna, «Where is …?» o‘yini, sinfdagi narsalar bilan mashq',
    ['8 ta asosiy o‘rin predlogini va «Where is / are …?» savolini o‘rgatish.', 'Diqqat va tartiblilik, sinfdagi narsalarni asrashni tarbiyalash.', 'Fazoviy tasavvur va ingliz tilida joy tasvirlash ko‘nikmasini rivojlantirish.'],
    ['8 ta predlogni ma’nosi bilan aytadi', 'Rasmga qarab «The … is … the …» gapini tuzadi', '«Where is …?» savoliga to‘liq javob beradi', 'on / above, between / among farqini tushuntiradi'],
    ['MAKON sahnasi «Prepositions of place»', 'Quti va to‘p (sinfda jonli ko‘rsatish)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Warm-up.</b> «Where is my pen?» — jonli namoyish.', 'Javob beradi.'], ['8–20', '<b>Yangi mavzu.</b> MAKON da to‘pni ko‘chirib, 8 predlog; on/above farqi.', 'Takrorlaydi, yozadi.'], ['20–28', '<b>Mashq.</b> Sinfdagi narsalar haqida gaplar: «The bag is under the desk».', 'Gaplar tuzadi.'], ['28–36', '<b>Amaliyot.</b> MAKON amaliyoti «Where is the ball?»', 'Javob tanlaydi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['between', 'orasida'], ['behind', 'orqasida'], ['above', 'tepasida'], ['next to', 'yonida']],
    [['«Ostida» inglizcha?', 'under'], ['on bilan above farqi?', 'on — tegib, above — tegmasdan'], ['between A ___ B?', 'and'], ['«Qayerda?»', 'Where?']],
    'O‘z xonangizdagi 8 ta narsaning joyini predloglar bilan yozing; darslikdagi mashqlar; rasm chizib, 5 ta «Where is …?» savoli tuzing.',
    E7 + '; ' + CAM)
};

/* ================================================================
   6. PARTS OF THE BODY AND HEALTH — 8-sinf (en-tana)
   ================================================================ */
bogla('ingliz', 'Parts of the body and health', 'en-tana', '3D figura: 18 ta tana a’zosi; «What’s the matter? — I have a headache»; should / shouldn’t');
L['en-tana'] = {
  fan:'ingliz', qisqaNom:'Body & health', nom:'Parts of the body and health — tana a’zolari va salomatlik', sinf:'8-sinf',
  qisqa:'8-sinf · Ingliz tili · «What’s the matter?» · 3D figura',
  sahna:'til_en_tana',
  kor:{
    sarlavha:'What’s the matter? — I have a headache.',
    matn:'Sahnada soddalashtirilgan 3D odam figurasi (protsedurali, anatomik emas). A’zoni <b>bosing</b> — inglizcha nomi, transkripsiyasi va tarjimasi chiqadi: head, hair, eye, ear, nose, mouth, neck, shoulder, chest, stomach, back, arm, elbow, hand, finger, leg, knee, foot. «What’s the matter?» rejimini yoqing — a’zoni bosganda shikoyat va maslahat dialogi chiqadi: <i>I have a headache. — You should take a painkiller and have a rest.</i>',
    punktlar:['<b>Shikoyat:</b> <i>I have (got) a headache / a stomach ache / a sore throat / a cold / a cough.</i>','<b>Og‘riq:</b> <i>My knee hurts. My feet hurt.</i> (hurt — og‘rimoq)','<b>Maslahat:</b> <i>You should see a doctor. You shouldn’t eat fast food.</i>','<b>Ko‘plik istisnolari:</b> foot → feet, tooth → teeth']
  },
  bolimlar:[
    {sarlavha:'Tana a’zolari (lug‘at)', jadval:Object.keys(SZ.tana || {}).map(k=>[SZ.tana[k].en + ' ' + SZ.tana[k].ipa, SZ.tana[k].uz])},
    {sarlavha:'Shikoyat va maslahat', jadval:[['headache', 'bosh og‘rig‘i — take a painkiller, have a rest'], ['stomach ache', 'qorin og‘rig‘i — don’t eat fast food, drink water'], ['sore throat', 'tomoq og‘rig‘i — drink warm water with honey'], ['toothache', 'tish og‘rig‘i — go to the dentist'], ['cold / cough', 'shamollash / yo‘tal — stay at home, take cough syrup'], ['earache / backache', 'quloq / bel og‘rig‘i — see a doctor'], ['broken leg', 'singan oyoq — go to the hospital (must)'], ['cut finger', 'kesilgan barmoq — wash it, put a plaster on it']]},
    {sarlavha:'should / shouldn’t / must', jadval:[['should + fe’l', 'maslahat: You should drink more water.'], ['shouldn’t + fe’l', 'salbiy maslahat: You shouldn’t go to school today.'], ['must + fe’l', 'zarurat, majburiy: You must go to the hospital.'], ['Savol', 'Should I see a doctor? — Yes, you should.']]}
  ],
  bosqichlar:[
    {sarlavha:'Head — bosh qismlari', matn:'Head, hair, eye (ko‘plik — eyes), ear, nose, mouth. Yozuvlarni yoqib, har birini bosing.', holat:{guruh:'bosh', yozuv:true, dard:false}},
    {sarlavha:'Body — tana', matn:'Neck (bo‘yin), shoulder (yelka), chest (ko‘krak), stomach (qorin), back (bel, orqa).', holat:{guruh:'tana'}},
    {sarlavha:'Arm — qo‘l', matn:'Arm — yelkadan bilakkacha butun qo‘l; hand — panja; elbow — tirsak; finger — barmoq (oyoq barmog‘i — toe).', holat:{guruh:'qol'}},
    {sarlavha:'Leg — oyoq', matn:'Leg — son va boldir; knee — tizza; foot — oyoq panjasi, ko‘pligi <b>feet</b> (foots emas!).', holat:{guruh:'oyoq'}},
    {sarlavha:'What’s the matter? — shikoyat', matn:'Rejim yoqildi. Boshni bosing: <i>I have a headache.</i> Qorinni: <i>I have a stomach ache.</i> Bo‘yinni: <i>I have a sore throat.</i>', holat:{dard:true, qism:'head'}},
    {sarlavha:'hurt — og‘rimoq', matn:'Aniq kasallik nomi bo‘lmasa <i>hurt</i> fe’li: <i>My knee hurts. My feet hurt</i> (ko‘plikda -s yo‘q). Tizzani bosing.', holat:{dard:true, qism:'knee'}},
    {sarlavha:'should / shouldn’t — maslahat', matn:'Do‘stga maslahat: <i>You should see a doctor. You shouldn’t eat fast food.</i> Jiddiy holatda <i>must</i>: <i>You must go to the hospital.</i> Oyoqni bosing.', holat:{dard:true, qism:'leg'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'What’s the matter?', holat:{dard:true, yozuv:false},
    topshiriqlar:[
      {shart:'«I have a <b>headache</b>.» — Qaysi a’zo og‘riyapti? Uni bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='head'", izoh:'To‘g‘ri — <b>head</b> /hed/ bosh. <i>You should have a rest.</i>'},
      {shart:'«I have a <b>sore throat</b>.» — Tomoq qayerda? Bo‘yinni bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='neck'", izoh:'To‘g‘ri — <b>neck</b> /nek/ bo‘yin (throat — tomoq, bo‘yin ichida).'},
      {shart:'«I have a <b>stomach ache</b>.» — A’zoni bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='stomach'", izoh:'To‘g‘ri — <b>stomach</b> /ˈstʌm.ək/ qorin, oshqozon.'},
      {shart:'«My <b>knee</b> hurts.» — Tizzani bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='knee'", izoh:'To‘g‘ri — <b>knee</b> /niː/ tizza (k o‘qilmaydi!).'},
      {shart:'«I have cut my <b>finger</b>.» — Barmoqni bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='finger'", izoh:'To‘g‘ri — <b>finger</b> /ˈfɪŋ.ɡər/ barmoq. <i>You should put a plaster on it.</i>'},
      {shart:'«My <b>feet</b> hurt.» — Oyoq panjasini bosing.', hodisa:'til-soz', kod:"ev.sahna==='tana' && ev.nom==='foot'", izoh:'To‘g‘ri — <b>foot</b> /fʊt/, ko‘pligi <b>feet</b>. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'«foot» so‘zining ko‘pligi?', v:['foots','feets','feet','footes'], t:2, izoh:'Istisno ko‘plik: foot → <b>feet</b>, tooth → teeth.'},
    {s:'«I have a ___.» (bosh og‘rig‘i)', v:['headache','stomach ache','sore throat','cold'], t:0, izoh:'<b>headache</b> /ˈhed.eɪk/ — bosh og‘rig‘i.'},
    {s:'«tizza» inglizcha?', v:['elbow','knee','neck','ankle'], t:1, izoh:'<b>knee</b> /niː/ — tizza. elbow — tirsak, neck — bo‘yin, ankle — to‘piq.'},
    {s:'«You ___ see a doctor.» (maslahat)', v:['should','shouldn’t','can’t','mustn’t'], t:0, izoh:'Maslahat — <b>should</b> + fe’l.'},
    {s:'«My feet ___.» (og‘riyapti)', v:['hurts','hurt','is hurt','hurting'], t:1, izoh:'feet — ko‘plik, fe’l -s siz: My feet <b>hurt</b>. (My knee hurts.)'},
    {s:'«What’s the matter?» ma’nosi?', v:['Nima gap? / Nima bo‘ldi?','Qaysi mavzu?','Soat necha?','Qayerdasan?'], t:0, izoh:'<b>What’s the matter?</b> — Nima bo‘ldi? Sizga nima bo‘ldi? (shikoyatni so‘rash).'},
    {s:'«I have a toothache. You should ___.»', v:['play football','go to the dentist','eat sweets','run'], t:1, izoh:'Tish og‘rig‘ida — <b>go to the dentist</b>.'},
    {s:'«yelka» inglizcha?', v:['shoulder','chest','back','stomach'], t:0, izoh:'<b>shoulder</b> /ˈʃəʊl.dər/ — yelka. chest — ko‘krak, back — bel, stomach — qorin.'},
    {s:'Salbiy maslahat qaysi?', v:['You should drink water.','You shouldn’t eat fast food.','You must go to the hospital.','Should I rest?'], t:1, izoh:'<b>shouldn’t</b> = should not — «qilmasligingiz kerak».'},
    {s:'Jiddiy holat uchun eng kuchli so‘z?', v:['should','could','must','may'], t:2, izoh:'<b>must</b> — majburiy, zarur: You must go to the hospital.'},
    T3('Sahnada <b>knee</b> (tizza)ni bosing.', 'til-soz', 'nom', ['knee'], ['knee — tizza', 'boshqa a’zo'], '<b>knee</b> /niː/ — tizza; oyoqning o‘rtasidagi bo‘g‘im.')
  ],
  yordamchi:[
    {s:'I have yoki I have got?', j:'Ikkalasi to‘g‘ri: I have a headache (umumiy) va I’ve got a headache (Britaniya so‘zlashuvida keng). Savol: Have you got a cold? / Do you have a cold?', kalit:['have got','have']},
    {s:'ache va hurt farqi?', j:'ache — ot, kasallik nomi bilan birikadi: headache, toothache, stomach ache, backache, earache. hurt — fe’l, istalgan a’zo bilan: My leg hurts. hurt ham sifatdosh: I’ve hurt my arm — qo‘limni lat yedim.', kalit:['ache','hurt']},
    {s:'Figura anatomik jihatdan aniqmi?', j:'Yo‘q, bu til darsi uchun soddalashtirilgan protsedurali figura. Anatomiya biologiya darslarida haqiqiy model bilan o‘rganiladi.', kalit:['figura','anatomiya','aniq']}
  ],
  maqola:[
    {sarlavha:'Tana a’zolari: so‘zlar va ko‘plik', xatboshilar:[
      'Tana a’zolari nomlari eng ko‘p ishlatiladigan so‘zlar qatoriga kiradi: ular salomatlik, sport, kiyim va tasvirlash mavzularida kerak. Ko‘pchiligi oddiy ko‘plik oladi (<i>arms, legs, ears</i>), lekin istisnolar bor: <i>foot → feet, tooth → teeth</i>. Juft a’zolar odatda ko‘plikda aytiladi: <i>My eyes are brown. My feet hurt.</i>',
      'Ba’zi so‘zlarda o‘zbek tilidan farq bor: <i>arm</i> — butun qo‘l, <i>hand</i> — faqat panja; <i>leg</i> — oyoq, <i>foot</i> — oyoq panjasi; <i>finger</i> — qo‘l barmog‘i, <i>toe</i> — oyoq barmog‘i; <i>neck</i> — bo‘yin, <i>throat</i> — tomoq (ichkarisi).',
      'Talaffuzda «jim» harflar bor: <i>knee</i> /niː/ (k o‘qilmaydi), <i>stomach</i> /ˈstʌm.ək/ (ch — k), <i>tongue</i> /tʌŋ/ (til).'
    ]},
    {sarlavha:'Shifokorda: shikoyat qilish', xatboshilar:[
      'Shikoyatni so‘rash: <i>What’s the matter? What’s wrong? How do you feel?</i> Javob <i>I have (got) …</i> bilan: <i>I have a headache / a stomach ache / a sore throat / a cold / a cough / a temperature</i> (harorat). Aniq a’zo og‘risa <i>hurt</i>: <i>My back hurts. My feet hurt.</i>',
      '<i>-ache</i> qo‘shimchasi «og‘riq» ma’nosini beradi va ko‘pincha a’zo nomi bilan qo‘shib yoziladi: <i>headache, toothache, backache, earache</i>; <i>stomach ache</i> ko‘pincha alohida yoziladi (ikkala imlo uchraydi). Boshqa foydali iboralar: <i>I feel sick</i> (ko‘nglim ayniyapti), <i>I feel dizzy</i> (boshim aylanyapti), <i>I’ve hurt my arm</i> (qo‘limni lat yedim), <i>I’ve broken my leg</i>.',
      'Shifokor: <i>Let me see. Open your mouth. Take this medicine twice a day. Stay in bed for two days.</i> Dorixona — <i>pharmacy</i> (chemist’s), dori — <i>medicine</i>, tabletka — <i>pill / tablet</i>, plastir — <i>plaster</i>.'
    ]},
    {sarlavha:'Maslahat berish: should, shouldn’t, must', xatboshilar:[
      '<i>Should</i> — modal fe’l, «… qilganingiz ma’qul» ma’nosida maslahat beradi. Undan keyin fe’lning asosiy shakli keladi, -s qo‘shilmaydi: <i>You should see a doctor. She should rest.</i> Inkor — <i>shouldn’t</i>: <i>You shouldn’t go out today.</i> Savol — <i>Should I …?</i>',
      '<i>Must</i> — majburiylik, kuchliroq: <i>You must go to the hospital</i> (albatta). <i>Mustn’t</i> — taqiq: <i>You mustn’t take this medicine with milk.</i> <i>Have to</i> — tashqi majburiyat: <i>I have to take pills every day.</i>',
      'Salomatlik bo‘yicha umumiy maslahatlar inglizcha: <i>You should drink enough water, sleep 8–10 hours, do sport every day and wash your hands before meals.</i> Jahon sog‘liqni saqlash tashkiloti 5–17 yoshlilarga kuniga kamida 60 daqiqa jismoniy faollikni tavsiya qiladi (WHO, 2020).'
    ]}
  ],
  formulalar:[
    ['I have (got) a + kasallik', 'I have a headache. I’ve got a cold.'],
    ['My + a’zo + hurts / hurt', 'My knee hurts. My feet hurt.'],
    ['You should / shouldn’t + fe’l', 'You should rest. You shouldn’t eat sweets.'],
    ['You must + fe’l', 'You must go to the hospital.'],
    ['foot → feet, tooth → teeth', 'istisno ko‘plik']
  ],
  qiziqarli:[
    '<i>Knee</i> va <i>knife</i> so‘zlarida k o‘qilmaydi — bu harf qadimgi ingliz tilida talaffuz qilingan, keyin «jim» bo‘lib qolgan.',
    '<i>Foot</i> bir vaqtning o‘zida uzunlik birligi ham: 1 foot = 30,48 sm (12 inch).',
    '<i>Stomach</i> so‘zidagi «ch» /k/ deb o‘qiladi — yunoncha kelib chiqishi tufayli.',
    'Ingliz tilida «tish og‘rig‘i» uchun bitta so‘z — toothache; «ko‘z og‘rig‘i» uchun esa yo‘q: «My eyes hurt» deyiladi.'
  ],
  lugat:[['head', 'bosh'], ['neck', 'bo‘yin'], ['throat', 'tomoq'], ['shoulder', 'yelka'], ['chest', 'ko‘krak'], ['stomach', 'qorin, oshqozon'], ['back', 'bel, orqa'], ['arm / hand', 'qo‘l / panja'], ['elbow', 'tirsak'], ['finger / toe', 'qo‘l barmog‘i / oyoq barmog‘i'], ['leg / foot (feet)', 'oyoq / oyoq panjasi'], ['knee', 'tizza'], ['headache', 'bosh og‘rig‘i'], ['sore throat', 'tomoq og‘rig‘i'], ['cold', 'shamollash'], ['hurt', 'og‘rimoq; lat yemoq'], ['should / shouldn’t', '… kerak / kerak emas (maslahat)'], ['What’s the matter?', 'Nima bo‘ldi?']],
  manba:E8 + '; ' + CAM + '; ' + ENGL + '; WHO «Guidelines on physical activity and sedentary behaviour» (2020); Online Etymology Dictionary «knee», «stomach». Figura — soddalashtirilgan, anatomik aniqlikka da’vo qilmaydi.',
  ishlanma:ish('8-sinf', 'Yangi bilim berish', 'Interaktiv 3D figura, rolli o‘yin «Shifokorda», juftlikda dialog',
    ['18 ta tana a’zosi nomi, shikoyat iboralari (I have a …, My … hurts) va should / shouldn’t / must ni o‘rgatish.', 'Salomatlikka e’tibor, do‘stga g‘amxo‘rlik va to‘g‘ri maslahat berishni tarbiyalash.', 'Dialog tuzish, vaziyatga mos maslahat tanlash ko‘nikmasini rivojlantirish.'],
    ['18 ta a’zoni ko‘rsatib inglizcha aytadi; foot/feet ni to‘g‘ri ishlatadi', '«What’s the matter? — I have a …» dialogini tuzadi', 'should / shouldn’t / must bilan maslahat beradi', 'Shifokor–bemor rolli o‘yinini ijro etadi'],
    ['MAKON sahnasi «Parts of the body» (3D figura)', 'Rasmli kartochkalar (kasalliklar)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b> «How are you today?»', 'Javob beradi.'], ['3–8', '<b>Warm-up.</b> «Simon says: touch your nose!» o‘yini.', 'Bajaradi.'], ['8–18', '<b>Lug‘at.</b> MAKON figurasida a’zolarni bosib, so‘z–talaffuz; foot/feet.', 'Takrorlaydi, yozadi.'], ['18–27', '<b>Shikoyat va maslahat.</b> «What’s the matter?» rejimi; should / must.', 'Dialog namunasini o‘qiydi.'], ['27–36', '<b>Rolli o‘yin.</b> MAKON amaliyoti; juftlikda shifokor–bemor.', 'Dialog ijro etadi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['headache', 'bosh og‘rig‘i'], ['knee', 'tizza'], ['feet', 'oyoq panjalari'], ['should', '… kerak (maslahat)']],
    [['«foot» ko‘pligi?', 'feet'], ['«Nima bo‘ldi?» inglizcha?', 'What’s the matter?'], ['Tish og‘risa qayerga?', 'to the dentist'], ['Maslahat uchun modal fe’l?', 'should']],
    'Darslikdagi mashqlar; 6 ta shikoyat uchun maslahat yozing (should / shouldn’t); shifokor–bemor dialogini (8 replika) tuzing.',
    E8 + '; ' + CAM)
};

/* ================================================================
   7. IN THE CITY: ASKING FOR DIRECTIONS — 9-sinf (en-shahar)
   ================================================================ */
bogla('ingliz', 'In the city: asking for directions', 'en-shahar', '3D shaharcha: 12 bino, Go straight on / Turn left / Turn right — yo‘l topish amaliyoti');
L['en-shahar'] = {
  fan:'ingliz', qisqaNom:'In the city', nom:'In the city: asking for directions — shaharda yo‘l so‘rash', sinf:'9-sinf',
  qisqa:'9-sinf · Ingliz tili · «How do I get to …?» · 3D shahar',
  sahna:'til_en_shahar',
  kor:{
    sarlavha:'Excuse me, how do I get to the bank?',
    matn:'Sahnada 3D shaharcha: ko‘chalar to‘ri va 12 ta bino — bank, post office, hospital, school, café, library, cinema, supermarket, park, bus stop, police station, pharmacy. Binoni <b>bosing</b> — so‘z, transkripsiya, tarjima va savol: <i>Excuse me, where is the bank?</i> Pastki chap burchakdagi odam — siz; tugmalar bilan yuring: <i>Go straight on</i> (bir kvartal oldinga), <i>Turn left</i>, <i>Turn right</i>. Binoning kirishiga yetganingizda «You are at the …» yozuvi chiqadi.',
    punktlar:['<b>So‘rash:</b> <i>Excuse me, how do I get to the …? / Where is the …? / Is there a … near here?</i>','<b>Yo‘l ko‘rsatish:</b> <i>Go straight on. Turn left / right. Take the first / second turning on the left.</i>','<b>Joylashuv:</b> <i>It’s on the left / on the right. It’s next to / opposite / between …</i>','<b>Minnatdorchilik:</b> <i>Thank you very much! — You’re welcome.</i>']
  },
  bolimlar:[
    {sarlavha:'Shahardagi joylar (lug‘at)', jadval:Object.keys(SZ.shahar || {}).map(k=>[SZ.shahar[k].en + ' ' + SZ.shahar[k].ipa, SZ.shahar[k].uz])},
    {sarlavha:'Yo‘nalish iboralari', jadval:Object.keys(SZ.yonalish || {}).map(k=>[SZ.yonalish[k].en + ' ' + SZ.yonalish[k].ipa, SZ.yonalish[k].uz]).concat([['Take the first turning on the left.', 'Birinchi burilishda chapga buriling.'], ['Go past the bank.', 'Bank yonidan o‘tib keting.'], ['It’s about five minutes’ walk.', 'Piyoda taxminan 5 daqiqa.'], ['Cross the road.', 'Yo‘ldan o‘ting.'], ['You can’t miss it.', 'Adashmaysiz (ko‘zga tashlanadi).']])},
    {sarlavha:'Dialog namunasi', jadval:[['A', 'Excuse me, how do I get to the hospital?'], ['B', 'Go straight on and take the second turning on the right. It’s next to the police station.'], ['A', 'Is it far?'], ['B', 'No, it’s about five minutes’ walk.'], ['A', 'Thank you very much!'], ['B', 'You’re welcome.']]}
  ],
  bosqichlar:[
    {sarlavha:'Shahar xaritasi', matn:'Ko‘chalar to‘ri, 12 ta bino. Siz pastki chap burchakda, shimolga qaragansiz. Binolarni bosib nomlarini eshiting.', holat:{qayta:true, maqsad:null}},
    {sarlavha:'Go straight on — to‘g‘riga', matn:'Tugma odamni bir kvartal oldinga yuradi. <i>Go straight on</i> (= go ahead). Ko‘cha tugasa — «You can’t go that way».', holat:{buyruq:'go_straight'}},
    {sarlavha:'Turn right — o‘ngga buriling', matn:'Odam o‘ngga buriladi (sharqqa). <i>Turn right at the library.</i>', holat:{buyruq:'turn_right'}},
    {sarlavha:'Turn left — chapga buriling', matn:'Chapga burilish. <i>Turn left at the bank.</i> Yo‘nalish: north → west.', holat:{buyruq:'turn_left'}},
    {sarlavha:'It’s on the left / right', matn:'Yetib borgach joylashuvni aytamiz: <i>The bank is on the left. The hospital is next to the police station. The park is opposite the café.</i> Bankni toping.', holat:{bino:'bank'}},
    {sarlavha:'Asking: Excuse me, …', matn:'So‘rash: <i>Excuse me, how do I get to the hospital? / Where is the hospital? / Is there a pharmacy near here?</i> Kasalxonani bosing.', holat:{bino:'hospital'}},
    {sarlavha:'Yo‘lni o‘zingiz toping', matn:'Boshidan boshlang va kutubxonaga (library) boring: <i>Turn right, go straight on.</i> Yetib borsangiz — «You are at the library!»', holat:{qayta:true, maqsad:'library'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Find the way!', holat:{start:[0, 3, 'north'], maqsad:'library'},
    topshiriqlar:[
      {shart:'Click the <b>hospital</b>. (Kasalxonani bosing — qaysi bino ekanini bilib oling.)', hodisa:'til-soz', kod:"ev.sahna==='shahar' && ev.nom==='hospital'", izoh:'To‘g‘ri — <b>hospital</b> /ˈhɒs.pɪ.təl/ — tomida qizil xoch bor.'},
      {shart:'Go to the <b>library</b>: «Turn right, then go straight on.»', hodisa:'til-yol', kod:"ev.yonida && ev.yonida.includes('library')", izoh:'To‘g‘ri — <b>You are at the library!</b> Chap pastdan: o‘ngga burilib, bir kvartal to‘g‘riga.'},
      {shart:'Now go to the <b>bank</b>: «Turn left and go straight on» (uch kvartal).', hodisa:'til-yol', kod:"ev.yonida && ev.yonida.includes('bank')", izoh:'To‘g‘ri — <b>bank</b>: shimolga uch kvartal.'},
      {shart:'Go to the <b>hospital</b>: «Turn right, go straight on twice, turn right, go straight on.»', hodisa:'til-yol', kod:"ev.yonida && ev.yonida.includes('hospital')", izoh:'To‘g‘ri — <b>hospital</b> (next to the police station).'},
      {shart:'Go to the <b>cinema</b>: «Go straight on twice, turn right, go straight on.» (janubga, keyin g‘arbga)', hodisa:'til-yol', kod:"ev.yonida && ev.yonida.includes('cinema')", izoh:'To‘g‘ri — <b>cinema</b> /ˈsɪn.ə.mə/. Amaliyot tugadi — <i>Well done!</i>'}
    ]},
  test:[
    {s:'«Chapga buriling» inglizcha?', v:['Turn right.','Turn left.','Go straight on.','Go back.'], t:1, izoh:'<b>Turn left.</b> — chapga buriling. Turn right — o‘ngga.'},
    {s:'Yo‘l so‘rashda muloyim boshlanish?', v:['Hey, you!','Excuse me, …','Listen!','Where bank?'], t:1, izoh:'<b>Excuse me, …</b> — kechirasiz (muloyim murojaat).'},
    {s:'«How do I ___ to the station?»', v:['go','get','come','take'], t:1, izoh:'<b>How do I get to …?</b> — … ga qanday boraman?'},
    {s:'«post office» ma’nosi?', v:['politsiya','pochta','dorixona','kutubxona'], t:1, izoh:'<b>post office</b> — pochta. police station — politsiya, pharmacy — dorixona, library — kutubxona.'},
    {s:'«Take the ___ turning on the right.» (ikkinchi)', v:['two','second','twice','secondly'], t:1, izoh:'Tartib son: the <b>second</b> turning.'},
    {s:'«Is it far?» — qisqa javob?', v:['No, it isn’t. It’s five minutes’ walk.','Yes, it is near.','No, it is far.','Yes, five minutes.'], t:0, izoh:'<b>No, it isn’t. It’s about five minutes’ walk.</b> — uzoq emas.'},
    {s:'«Thank you very much!» ga javob?', v:['Please.','You’re welcome.','Excuse me.','Sorry.'], t:1, izoh:'<b>You’re welcome.</b> — Arzimaydi.'},
    {s:'«dorixona» inglizcha?', v:['pharmacy','hospital','bakery','butcher’s'], t:0, izoh:'<b>pharmacy</b> /ˈfɑː.mə.si/ (Britaniyada chemist’s ham) — dorixona.'},
    {s:'«The bank is ___ the post office.» (ro‘parasida)', v:['opposite','between','behind','under'], t:0, izoh:'<b>opposite</b> — ro‘parasida, ko‘chaning narigi tomonida.'},
    {s:'«Go ___ the bank and turn left.» (yonidan o‘tib)', v:['past','passed','pass','after'], t:0, izoh:'<b>Go past the bank</b> — bank yonidan o‘tib keting.'},
    T3('Sahnada <b>pharmacy</b> (dorixona)ni bosing.', 'til-soz', 'nom', ['pharmacy'], ['pharmacy — dorixona', 'boshqa bino'], '<b>pharmacy</b> /ˈfɑː.mə.si/ — dorixona; tomida yashil xoch.')
  ],
  yordamchi:[
    {s:'Odam yurmayapti', j:'Odam faqat ko‘cha bo‘ylab yuradi; ko‘cha tugagan bo‘lsa «You can’t go that way» chiqadi — burilib ko‘ring. «Start again» boshlang‘ich joyga qaytaradi.', kalit:['yurmayapti','tugma','yo‘l']},
    {s:'Qaysi tomon shimol?', j:'Ekranning yuqori tomoni — shimol (north). Boshlanishda siz shimolga qaragansiz; «Turn right» sharqqa (east), «Turn left» g‘arbga (west) buradi.', kalit:['shimol','north','tomon']},
    {s:'go straight on va go ahead?', j:'Ikkalasi «to‘g‘riga yuring». Amerika ingliz tilida «go straight» ham deyiladi.', kalit:['straight','ahead']}
  ],
  maqola:[
    {sarlavha:'Yo‘l so‘rash: muloyimlik va aniqlik', xatboshilar:[
      'Notanish shaharda yo‘l so‘rash — ingliz tilidagi eng kerakli vaziyatlardan biri. Suhbat <i>Excuse me</i> bilan boshlanadi: <i>Excuse me, how do I get to the station? / Where is the nearest bank? / Is there a pharmacy near here?</i> <i>Could you tell me the way to …?</i> — yanada muloyim shakl.',
      'Javob odatda buyruq gaplar bilan beriladi: <i>Go straight on. Turn left at the traffic lights. Take the second turning on the right. Go past the supermarket. Cross the road.</i> Oxirida joylashuv: <i>It’s on your left, next to the café. You can’t miss it.</i>',
      'Masofa haqida: <i>Is it far? — No, it’s about five minutes’ walk / It’s two blocks away.</i> Suhbat <i>Thank you very much! — You’re welcome</i> bilan tugaydi.'
    ]},
    {sarlavha:'Shahardagi joylar va ular bilan ishlatiladigan iboralar', xatboshilar:[
      'Joylar: <i>bank, post office, hospital, school, café, library, cinema, supermarket, park, bus stop, police station, pharmacy (chemist’s), railway station, airport, hotel, museum, restaurant, bakery</i>. Ko‘pchiligi bilan <i>at</i> predlogi: <i>at the bus stop, at the bank</i>; bino ichida — <i>in the library</i>.',
      'Britaniya va Amerika ingliz tilida farqlar: <i>chemist’s / pharmacy, cinema / movie theater, underground / subway, town centre / downtown</i>. Darsda Britaniya variantlari asos qilib olingan.',
      'Ko‘chaga oid so‘zlar: <i>street, road, avenue, square</i> (maydon), <i>corner</i> (burchak), <i>crossroads</i> (chorraha), <i>traffic lights</i> (svetofor), <i>zebra crossing</i> (piyodalar o‘tish joyi), <i>roundabout</i> (aylanma yo‘l).'
    ]},
    {sarlavha:'Buyruq gaplar (imperative)', xatboshilar:[
      'Yo‘l ko‘rsatishda fe’lning asosiy shakli egasiz ishlatiladi — bu buyruq gap: <i>Turn left. Go straight on. Cross the road.</i> Inkor — <i>Don’t</i>: <i>Don’t turn right.</i> Muloyimroq qilish uchun <i>please</i> qo‘shiladi.',
      'Tartib sonlar burilishlarni sanashda kerak: <i>the first / second / third turning</i>. <i>Turning</i> — ko‘chadan burilish joyi; <i>on the left / on the right</i> — qaysi tomonda.',
      'Sahnadagi shahar 4×4 chorrahali sxematik to‘r; haqiqiy shaharlar bunday emas, lekin iboralar bir xil. Toshkent metrosi yoki avtobusi haqida ham shu iboralar bilan gapirish mumkin: <i>Take the metro to Chorsu and go straight on.</i>'
    ]}
  ],
  formulalar:[
    ['Excuse me, how do I get to the …?', '… ga qanday boraman?'],
    ['Where is the …? / Is there a … near here?', '… qayerda? / Yaqinda … bormi?'],
    ['Go straight on. Turn left / right.', 'To‘g‘riga. Chapga / o‘ngga buriling.'],
    ['Take the first / second turning on the left.', 'Birinchi / ikkinchi burilishda chapga.'],
    ['It’s on the left / right, next to / opposite …', 'U chapda / o‘ngda, … yonida / ro‘parasida.'],
    ['Thank you! — You’re welcome.', 'Rahmat! — Arzimaydi.']
  ],
  qiziqarli:[
    'London metrosi 1863-yilda ochilgan — dunyodagi eng qadimgi metro; britaniyaliklar uni «the Tube» deb atashadi (Transport for London).',
    'Britaniya va AQSHda ko‘p so‘zlar farq qiladi: chemist’s / pharmacy, cinema / movie theater, underground / subway.',
    '«Excuse me» — e’tibor jalb qilish uchun, «Sorry» — uzr so‘rash uchun: ikkalasini adashtirmang.',
    'Buyuk Britaniyada avtomobillar chap tomonda yuradi, shuning uchun yo‘lni kesib o‘tganda avval o‘ngga qaraladi — Londonda piyodalar uchun «Look right» yozuvlari bor.'
  ],
  lugat:[['bank', 'bank'], ['post office', 'pochta'], ['hospital', 'kasalxona'], ['library', 'kutubxona'], ['cinema', 'kinoteatr'], ['pharmacy / chemist’s', 'dorixona'], ['police station', 'politsiya bo‘limi'], ['bus stop', 'avtobus bekati'], ['Go straight on.', 'To‘g‘riga yuring.'], ['Turn left / right.', 'Chapga / o‘ngga buriling.'], ['turning', 'burilish (joyi)'], ['crossroads', 'chorraha'], ['traffic lights', 'svetofor'], ['opposite', 'ro‘parasida'], ['Is it far?', 'Uzoqmi?'], ['You’re welcome.', 'Arzimaydi.']],
  manba:E9 + '; ' + CAM + '; ' + ENGL + '; Transport for London «London Underground history» (tfl.gov.uk). Shahar to‘ri — sxematik.',
  ishlanma:ish('9-sinf', 'Yangi bilim berish', 'Interaktiv 3D shahar, juftlikda yo‘l ko‘rsatish o‘yini, rolli dialog',
    ['Shahardagi joylar nomlari, yo‘l so‘rash va ko‘rsatish iboralarini, buyruq gaplarni o‘rgatish.', 'Muloyim muloqot, notanish odamga yordam berish madaniyatini tarbiyalash.', 'Fazoviy yo‘nalish, xarita o‘qish va ko‘rsatma berish ko‘nikmasini rivojlantirish.'],
    ['12 ta joy nomini aytadi', '«How do I get to …?» savolini tuzadi va javob beradi', 'Xaritada ko‘rsatma bo‘yicha yo‘l topadi va o‘zi ko‘rsatma beradi', '6–8 replikali dialog ijro etadi'],
    ['MAKON sahnasi «In the city» (3D shahar)', 'Shahar xaritasi (qog‘oz) — har juftlikka', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Warm-up.</b> «What is there in our town?»', 'Joylarni aytadi.'], ['8–18', '<b>Lug‘at va iboralar.</b> MAKON binolarini bosish; Go straight on / Turn left / right.', 'Takrorlaydi, yozadi.'], ['18–28', '<b>Yo‘l topish.</b> MAKON amaliyoti — o‘qituvchi ko‘rsatma beradi, o‘quvchi yuradi.', 'Yo‘lni topadi.'], ['28–36', '<b>Juftlikda.</b> Qog‘oz xaritada bir-biriga yo‘l ko‘rsatish.', 'Dialog tuzadi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['Go straight on.', 'To‘g‘riga yuring.'], ['turning', 'burilish'], ['opposite', 'ro‘parasida'], ['You’re welcome.', 'Arzimaydi.']],
    [['«O‘ngga buriling»?', 'Turn right.'], ['Muloyim boshlanish?', 'Excuse me, …'], ['«Uzoqmi?»', 'Is it far?'], ['«Dorixona»?', 'pharmacy / chemist’s']],
    'Uyingizdan maktabgacha yo‘lni inglizcha 6 ta buyruq gap bilan yozing; darslikdagi mashqlar; yo‘l so‘rash dialogini (8 replika) tuzing.',
    E9 + '; ' + CAM)
};


/* ================================================================
   8. SO‘Z TURKUMLARI — 5-sinf (ot-turkum)
   ================================================================ */
bogla('onatili', 'So‘z turkumlari', 'ot-turkum', 'Interaktiv gaplar: so‘zni bosing — turkumi rangli ochiladi; 9 turkum');
L['ot-turkum'] = {
  fan:'onatili', qisqaNom:'So‘z turkumlari', nom:'So‘z turkumlari: ot, sifat, son, olmosh, fe’l, ravish va yordamchi so‘zlar', sinf:'5-sinf',
  qisqa:'5-sinf · Ona tili · «So‘z turkumlari» · interaktiv gap',
  sahna:'til_ot_turkum',
  kor:{
    sarlavha:'Har bir so‘z — o‘z turkumida',
    matn:'Sahnada to‘rtta gap. So‘zni <b>bosing</b> — u qaysi turkumga kirishi rang bilan ochiladi va savoli ko‘rsatiladi: ot (kim? nima?), sifat (qanday?), son (nechta?), olmosh, fe’l (nima qildi?), ravish (qanday? qachon?), bog‘lovchi, ko‘makchi, undov. Pastdagi rangli yorliqni bossangiz, gapdagi shu turkumga kiruvchi barcha so‘zlar birdaniga belgilanadi.',
    punktlar:['<b>Mustaqil so‘zlar</b> (lug‘aviy ma’nosi bor, gap bo‘lagi bo‘ladi): ot, sifat, son, olmosh, fe’l, ravish','<b>Yordamchi so‘zlar</b> (o‘zi gap bo‘lagi bo‘lmaydi): ko‘makchi, bog‘lovchi, yuklama','<b>Alohida guruh:</b> undov, taqlid so‘zlar, modal so‘zlar','Turkumni aniqlashda <b>savol</b> va <b>ma’no</b> ikkalasi hisobga olinadi: <i>bugun</i> — ravish (qachon?), <i>beshta</i> — son (nechta?)']
  },
  bolimlar:[
    {sarlavha:'Turkumlar va savollari', jadval:Object.keys(SZ.turkum || {}).map(k=>[SZ.turkum[k].nom, SZ.turkum[k].savol + ' — ' + SZ.turkum[k].izoh])},
    {sarlavha:'Sahnadagi gaplar', jadval:(SZ.turkumGap || []).map((g, i)=>[(i + 1) + '-gap', g.m])},
    {sarlavha:'Adashtiradigan holatlar', jadval:[['Sifat / ravish', '<i>tez</i> ot oldida — sifat (tez poyezd), fe’l oldida — ravish (tez yugurdi)'], ['Son / ot', '<i>beshta kitob</i> — son; <i>beshlik</i> (baho) — ot'], ['Olmosh', 'nomlamaydi, ishora qiladi: men, u, bu, kim, hamma'], ['Yordamchi so‘z', '<i>bilan, uchun</i> — ko‘makchi; <i>va, ammo</i> — bog‘lovchi; <i>-mi, -ku</i> — yuklama']]}
  ],
  bosqichlar:[
    {sarlavha:'Ot — kim? nima?', matn:'Shaxs, narsa, joy nomi: <i>Ali, maktab, kitob</i>. 1-gapda uchta ot bor — yorliqni bosib toping.', holat:{gap:0, turkum:'ot'}},
    {sarlavha:'Sifat — qanday?', matn:'Narsaning belgisi: <i>kichkina Ali</i>. Sifat odatda otdan oldin keladi va unga bog‘lanadi.', holat:{gap:0, turkum:'sifat'}},
    {sarlavha:'Son — nechta? nechanchi?', matn:'<i>beshta kitob</i> — sanoq son; <i>beshinchi</i> — tartib son. Son ham otdan oldin keladi.', holat:{gap:0, turkum:'son'}},
    {sarlavha:'Fe’l — nima qildi?', matn:'Harakat yoki holat: <i>o‘qidi, yugurdi, sevamiz</i>. Fe’l odatda gap oxirida — kesim bo‘lib keladi.', holat:{gap:0, turkum:'fel'}},
    {sarlavha:'Ravish — qanday? qachon?', matn:'Harakatning belgisi: <i>bugun</i> (qachon?), <i>tez</i> (qanday?), <i>juda</i> (qay darajada?). 2-gapga o‘tdik.', holat:{gap:1, turkum:'ravish'}},
    {sarlavha:'Olmosh — nomlamaydi, ishora qiladi', matn:'<i>U</i> — kishilik olmoshi (ot o‘rnida), <i>bu</i> — ko‘rsatish olmoshi. 4-gapda ikkita olmosh bor.', holat:{gap:3, turkum:'olmosh'}},
    {sarlavha:'Yordamchi so‘zlar va undov', matn:'<i>va, ammo</i> — bog‘lovchi, <i>bilan</i> — ko‘makchi, <i>Eh</i> — undov. Ular mustaqil ma’noga ega emas, lekin gapni bog‘laydi yoki his bildiradi. 3-gapda bog‘lovchilarni ko‘ring.', holat:{gap:2, turkum:'boglovchi'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'So‘zni turkumiga ajrat', holat:{gap:0, hamma:false},
    topshiriqlar:[
      {shart:'1-gapdagi <b>fe’l</b>ni bosing (nima qildi?).', hodisa:'til-soz', kod:"ev.gap===0 && ev.turkum==='fel' && ev.bosildi", izoh:'To‘g‘ri — <b>o‘qidi</b>: harakatni bildiradi, fe’l.'},
      {shart:'1-gapdagi <b>sifat</b>ni bosing (qanday?).', hodisa:'til-soz', kod:"ev.gap===0 && ev.turkum==='sifat' && ev.bosildi", izoh:'To‘g‘ri — <b>Kichkina</b>: belgini bildiradi, sifat.'},
      {shart:'1-gapdagi <b>son</b>ni bosing (nechta?).', hodisa:'til-soz', kod:"ev.gap===0 && ev.turkum==='son' && ev.bosildi", izoh:'To‘g‘ri — <b>beshta</b>: miqdorni bildiradi, son.'},
      {shart:'Pastdagi tugma bilan <b>2-gap</b>ga o‘ting va <b>olmosh</b>ni bosing.', hodisa:'til-soz', kod:"ev.gap===1 && ev.turkum==='olmosh' && ev.bosildi", izoh:'To‘g‘ri — <b>U</b>: otni nomlamay, unga ishora qiladi — olmosh.'},
      {shart:'2-gapdagi <b>ko‘makchi</b>ni bosing (yordamchi so‘z).', hodisa:'til-soz', kod:"ev.gap===1 && ev.turkum==='komakchi' && ev.bosildi", izoh:'To‘g‘ri — <b>bilan</b>: ot bilan kelib, uni fe’lga bog‘laydi — ko‘makchi.'},
      {shart:'<b>4-gap</b>ga o‘ting va <b>undov</b> so‘zni bosing.', hodisa:'til-soz', kod:"ev.gap===3 && ev.turkum==='undov' && ev.bosildi", izoh:'To‘g‘ri — <b>Eh</b>: his-hayajonni bildiradi, undov. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'«kim? nima?» savoliga javob beradigan turkum?', v:['sifat','ot','fe’l','ravish'], t:1, izoh:'<b>Ot</b> — shaxs, narsa nomi: kim? nima?'},
    {s:'«Ali tez yugurdi» gapida «tez» so‘zi qaysi turkum?', v:['sifat','ravish','ot','son'], t:1, izoh:'Fe’lga bog‘lanib harakat belgisini bildiradi — <b>ravish</b> (qanday yugurdi?). Ot oldida kelsa (tez poyezd) sifat bo‘lardi.'},
    {s:'Qaysi so‘z olmosh?', v:['maktab','go‘zal','biz','sekin'], t:2, izoh:'<b>biz</b> — kishilik olmoshi, otni nomlamay ishora qiladi.'},
    {s:'«beshta» so‘zi?', v:['son','ot','sifat','fe’l'], t:0, izoh:'<b>Son</b> — nechta? savoliga javob beradi.'},
    {s:'Yordamchi so‘z turkumini toping.', v:['ot','fe’l','bog‘lovchi','ravish'], t:2, izoh:'<b>Bog‘lovchi</b> (va, ammo, lekin) — yordamchi so‘z: o‘zi gap bo‘lagi bo‘lmaydi.'},
    {s:'«Eh, qanday go‘zal!» gapida «Eh» —', v:['undov','olmosh','ravish','bog‘lovchi'], t:0, izoh:'<b>Undov</b> — his-hayajonni bildiradi.'},
    {s:'«do‘sti bilan» birikmasida «bilan» —', v:['bog‘lovchi','ko‘makchi','yuklama','ravish'], t:1, izoh:'<b>Ko‘makchi</b> — ot bilan kelib, uni boshqa so‘zga bog‘laydi (bilan, uchun, kabi).'},
    {s:'Qaysi qatorda faqat fe’llar berilgan?', v:['o‘qidi, yugurdi, sevamiz','kitob, maktab, bola','yangi, kichkina, go‘zal','bugun, kecha, tez'], t:0, izoh:'<b>o‘qidi, yugurdi, sevamiz</b> — harakat bildiradi, fe’l.'},
    {s:'Mustaqil so‘z turkumlari nechta?', v:['3','6','9','12'], t:1, izoh:'<b>6 ta</b>: ot, sifat, son, olmosh, fe’l, ravish. Yordamchi: ko‘makchi, bog‘lovchi, yuklama; alohida: undov, taqlid, modal.'},
    {s:'«qachon?» savoliga javob beruvchi so‘z?', v:['bugun','katta','uchta','daftar'], t:0, izoh:'<b>bugun</b> — payt ravishi (qachon?).'},
    T3('Sahnadagi gapda <b>fe’l</b>ni bosing.', 'til-soz', 'turkum', ['fel'], ['fe’l — harakat bildiruvchi so‘z', 'boshqa turkum'], 'Fe’l gap oxirida keladi: <b>o‘qidi</b> — nima qildi?')
  ],
  yordamchi:[
    {s:'Sifat bilan ravishni qanday farqlayman?', j:'Qaysi so‘zga bog‘langaniga qarang: otga bog‘lansa — sifat (tez poyezd), fe’lga bog‘lansa — ravish (tez yugurdi). Ikkalasi «qanday?» deb so‘raladi, lekin ravish harakat belgisini bildiradi.', kalit:['sifat','ravish','farq']},
    {s:'Olmosh nega alohida turkum?', j:'Olmosh narsani nomlamaydi — uning o‘rnida keladi: «Ali keldi» → «U keldi». Shuning uchun ot, sifat, son o‘rnida kelishiga qarab turlari bor: kishilik (men, u), ko‘rsatish (bu, shu), so‘roq (kim, nima), belgilash (hamma), bo‘lishsizlik (hech kim).', kalit:['olmosh','nega']}
  ],
  maqola:[
    {sarlavha:'So‘z turkumi nima?', xatboshilar:[
      'Tildagi so‘zlar ma’nosi, savoli va gapda bajaradigan vazifasiga ko‘ra guruhlarga — so‘z turkumlariga bo‘linadi. Masalan, «kitob», «maktab», «Ali» narsalar va shaxslarni nomlaydi — ular ot; «o‘qidi», «yugurdi» harakatni bildiradi — fe’l. Turkumni bilish gapni to‘g‘ri tuzish va tahlil qilishga yordam beradi.',
      'O‘zbek tilida so‘zlar uch katta guruhga ajratiladi. Mustaqil so‘zlar o‘z lug‘aviy ma’nosiga ega va gap bo‘lagi bo‘lib keladi: ot, sifat, son, olmosh, fe’l, ravish. Yordamchi so‘zlar mustaqil ma’noga ega emas, so‘z va gaplarni bog‘laydi yoki ma’no qo‘shadi: ko‘makchi (bilan, uchun, kabi), bog‘lovchi (va, ammo, yoki, chunki), yuklama (-mi, -ku, faqat, hatto). Alohida guruh: undov (eh, oh), taqlid so‘zlar (shir-shir, dupur-dupur), modal so‘zlar (albatta, ehtimol).',
      'Turkumni aniqlashda ikkita narsa birga qaraladi: so‘zning umumiy ma’nosi (narsa, belgi, miqdor, harakat) va unga beriladigan savol (kim? qanday? nechta? nima qildi?).'
    ]},
    {sarlavha:'Mustaqil so‘z turkumlari', xatboshilar:[
      '<b>Ot</b> — shaxs, narsa, joy, hodisa nomi: <i>o‘quvchi, daryo, Toshkent, bahor</i>. Otlar turlanadi (kelishik), ko‘plik oladi (-lar), egalik qo‘shimchasi oladi (-im, -ing, -i). <b>Sifat</b> — narsaning belgisi: <i>qizil, katta, shirin, aqlli</i>; darajalanadi: <i>kattaroq, eng katta</i>. <b>Son</b> — miqdor va tartib: <i>besh, beshta, beshinchi, yarim</i>.',
      '<b>Olmosh</b> — ot, sifat, son o‘rnida keladi: <i>men, sen, u, biz, bu, shu, kim, nima, hamma, hech kim</i>. <b>Fe’l</b> — harakat va holat: <i>yozmoq, uxlamoq, sevmoq</i>; zamon (o‘tgan, hozirgi, kelasi), shaxs-son va bo‘lishli-bo‘lishsizlik shakllari bor: <i>yozdi, yozyapti, yozadi, yozmadi</i>. <b>Ravish</b> — harakatning belgisi: holat (<i>tez, sekin</i>), payt (<i>bugun, kecha</i>), o‘rin (<i>pastga, uzoqda</i>), daraja (<i>juda, sal</i>).',
      'Gapda bu turkumlar ma’lum bo‘lak vazifasini bajaradi: ot ko‘pincha ega yoki to‘ldiruvchi, sifat — aniqlovchi, fe’l — kesim, ravish — hol. Bu 6-sinfdagi «Gap bo‘laklari» darsida davom etadi.'
    ]},
    {sarlavha:'Yordamchi so‘zlar nega kerak?', xatboshilar:[
      'Yordamchi so‘zlar gapdagi «ko‘prik»lar. Ko‘makchi otdan keyin kelib, uni fe’lga bog‘laydi: <i>do‘sti <b>bilan</b> keldi, vatan <b>uchun</b> kurashdi, ota <b>kabi</b> mehribon</i>. Bog‘lovchi so‘z va gaplarni bog‘laydi: teng bog‘lovchi (<i>va, ammo, lekin, yoki</i>) va ergashtiruvchi (<i>chunki, agar, shuning uchun</i>). Yuklama so‘zga qo‘shimcha ma’no — so‘roq, ta’kid, kuchaytirish — beradi: <i>keldi<b>mi</b>? keldi-<b>ku</b>! <b>faqat</b> sen</i>.',
      'Yordamchi so‘zlar o‘zgarmaydi: ularga ko‘plik, kelishik, zamon qo‘shimchalari qo‘shilmaydi. Shuning uchun ular alohida gap bo‘lagi bo‘lmaydi — o‘zi bog‘langan so‘z bilan birga tahlil qilinadi.',
      'Undov so‘zlar (<i>eh, oh, uraa, voy</i>) his-tuyg‘uni, taqlid so‘zlar (<i>miyov, taq-tuq, yalt-yult</i>) tovush yoki holatga taqlidni bildiradi; ular gapdan vergul bilan ajratiladi: <i>Eh, qanday go‘zal!</i>'
    ]}
  ],
  qiziqarli:[
    'So‘zlarni turkumlarga bo‘lish g‘oyasi qadimgi yunon grammatikasidan (Dionisiy Frakiyalik, mil. av. II asr) kelib chiqqan — unda 8 ta turkum ajratilgan.',
    'O‘zbek tilidagi «tez» so‘zi ot oldida sifat, fe’l oldida ravish bo‘ladi — turkum so‘zning gapdagi o‘rniga ham bog‘liq.',
    'Taqlid so‘zlar har tilda har xil: o‘zbekcha mushuk «miyov» desa, inglizcha «meow», yaponcha «nyan» deydi.',
    'Olmoshlar tilda eng ko‘p ishlatiladigan so‘zlar qatorida: «men», «u», «bu» har kuni yuzlab marta aytiladi.'
  ],
  lugat:[['so‘z turkumi', 'so‘zlarning ma’no, savol va vazifasiga ko‘ra guruhi'], ['mustaqil so‘z', 'lug‘aviy ma’noga ega, gap bo‘lagi bo‘ladigan so‘z'], ['yordamchi so‘z', 'ko‘makchi, bog‘lovchi, yuklama'], ['ot', 'kim? nima? — narsa nomi'], ['sifat', 'qanday? — belgi'], ['son', 'nechta? nechanchi? — miqdor, tartib'], ['olmosh', 'ot, sifat, son o‘rnida keluvchi so‘z'], ['fe’l', 'nima qildi? — harakat, holat'], ['ravish', 'qanday? qachon? qayerda? — harakat belgisi'], ['ko‘makchi', 'bilan, uchun, kabi'], ['bog‘lovchi', 'va, ammo, yoki, chunki'], ['undov', 'his-hayajon so‘zi']],
  manba:O5 + '; «O‘zbek tili grammatikasi» (akademik nashr) — so‘z turkumlari tasnifi; ' + MW + ' «Part of speech», «Dionysius Thrax». Sahnadagi gaplar — o‘quv namunalari.',
  ishlanma:ish('5-sinf', 'Yangi bilim berish', 'Interaktiv gap tahlili, rangli kartochkalar, guruh ishi «Turkum uylari»',
    ['Mustaqil, yordamchi va alohida so‘z turkumlarini, ularning savollarini o‘rgatish.', 'Ona tiliga muhabbat, so‘zga e’tiborli bo‘lishni tarbiyalash.', 'Tahlil qilish, tasniflash va asoslab gapirish ko‘nikmasini rivojlantirish.'],
    ['9 ta turkumni savoli bilan aytadi', 'Gapdagi so‘zlarni turkumlarga ajratadi', 'Sifat va ravishni farqlaydi', 'Yordamchi so‘zlarning vazifasini tushuntiradi'],
    ['MAKON sahnasi «So‘z turkumlari»', 'Rangli kartochkalar (9 rang)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Motivatsiya.</b> «Kitob», «o‘qidi», «chiroyli» so‘zlarini guruhlang — nega?', 'Taxmin aytadi.'], ['8–20', '<b>Yangi mavzu.</b> MAKON da 1-gapni tahlil: ot, sifat, son, fe’l; 2-gap: olmosh, ravish, ko‘makchi.', 'Daftarga jadval tuzadi.'], ['20–28', '<b>Guruh ishi.</b> Har guruh bitta turkum «uyi»: sinfdagi matndan so‘z yig‘adi.', 'So‘z yig‘adi, taqdim qiladi.'], ['28–36', '<b>Amaliyot.</b> MAKON amaliyoti.', 'Bajaradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['ot', 'kim? nima?'], ['sifat', 'qanday?'], ['fe’l', 'nima qildi?'], ['ravish', 'qanday? qachon?']],
    [['«beshta» qaysi turkum?', 'son'], ['«tez yugurdi» — tez?', 'ravish'], ['Yordamchi so‘zlar?', 'ko‘makchi, bog‘lovchi, yuklama'], ['«biz»?', 'olmosh']],
    'Darslikdagi mashqlar; 10 so‘zdan iborat matn tuzib, har so‘z turkumini ustiga yozing; 5 ta ravish va 5 ta sifat bilan gaplar tuzing.',
    O5)
};

/* ================================================================
   9. GAP BO‘LAKLARI — 6-sinf (ot-gap)
   ================================================================ */
bogla('onatili', 'Gap bo‘laklari', 'ot-gap', 'Ega, kesim va ikkinchi darajali bo‘laklar: tagiga chizish, daraxt sxemasi');
L['ot-gap'] = {
  fan:'onatili', qisqaNom:'Gap bo‘laklari', nom:'Gap bo‘laklari: ega, kesim, aniqlovchi, to‘ldiruvchi, hol', sinf:'6-sinf',
  qisqa:'6-sinf · Ona tili · «Gap bo‘laklari» · daraxt sxemasi',
  sahna:'til_ot_gap',
  kor:{
    sarlavha:'Gapning asosi — ega va kesim',
    matn:'Sahnada to‘rtta gap va daraxt sxemasi. So‘zni <b>bosing</b> — u qaysi bo‘lak ekani tagiga chiziladi (ega — bir chiziq, kesim — ikki chiziq, aniqlovchi — to‘lqinli, to‘ldiruvchi — uzuq, hol — nuqta-chiziq) va daraxtda tegishli shox yonadi. Daraxt gapni ikki qismga ajratadi: bosh bo‘laklar (ega, kesim) va ikkinchi darajali bo‘laklar (aniqlovchi, to‘ldiruvchi, hol).',
    punktlar:['<b>Ega</b> — kim? nima? — ish-harakat bajaruvchisi; bosh kelishikda','<b>Kesim</b> — nima qildi? qanday? — ega haqidagi xabar; odatda gap oxirida','<b>Aniqlovchi</b> — qanday? qaysi? kimning? — otni aniqlaydi','<b>To‘ldiruvchi</b> — kimni? nimani? kimga? — harakat qaratilgan narsa; <b>Hol</b> — qachon? qayerda? qanday? — harakatning sharoiti']
  },
  bolimlar:[
    {sarlavha:'Bo‘laklar va savollari', jadval:Object.keys(SZ.bolak || {}).map(k=>[SZ.bolak[k].nom + (SZ.bolak[k].bosh ? ' (bosh)' : ' (ikkinchi darajali)'), SZ.bolak[k].savol + ' — ' + SZ.bolak[k].izoh])},
    {sarlavha:'Tagiga chizish belgilari', jadval:[['Ega', 'bir to‘g‘ri chiziq'], ['Kesim', 'ikki to‘g‘ri chiziq'], ['Aniqlovchi', 'to‘lqinli chiziq'], ['To‘ldiruvchi', 'uzuq chiziq'], ['Hol', 'nuqta-chiziq']]},
    {sarlavha:'Sahnadagi gaplar', jadval:(SZ.bolakGap || []).map((g, i)=>[(i + 1) + '-gap', g.m])}
  ],
  bosqichlar:[
    {sarlavha:'Ega — kim? nima?', matn:'1-gap: <i>Bolalar maktabga bordi.</i> Kim bordi? — <b>Bolalar</b>. Ega bosh kelishikda bo‘ladi, bir chiziq bilan chiziladi.', holat:{gap:0, bolak:'ega'}},
    {sarlavha:'Kesim — nima qildi?', matn:'Bolalar nima qildi? — <b>bordi</b>. Kesim egaga shaxs-sonda mos keladi va odatda gap oxirida turadi; ikki chiziq.', holat:{gap:0, bolak:'kesim'}},
    {sarlavha:'Hol — qayerga? qachon?', matn:'Qayerga bordi? — <b>maktabga</b>: o‘rin holi. 2-gapda <i>kecha</i> — payt holi, <i>bozordan</i> — o‘rin holi. Nuqta-chiziq.', holat:{gap:0, bolak:'hol'}},
    {sarlavha:'To‘ldiruvchi — nimani? kimga?', matn:'2-gap: <i>Shirin olmalarni men kecha bozordan sotib oldim.</i> Nimani sotib oldim? — <b>olmalarni</b>. To‘ldiruvchi tushum, jo‘nalish, chiqish kelishiklarida; uzuq chiziq.', holat:{gap:1, bolak:'toldiruvchi'}},
    {sarlavha:'Aniqlovchi — qanday? qaysi?', matn:'Qanday olmalar? — <b>Shirin</b>. Aniqlovchi otga bog‘lanadi va undan oldin keladi; to‘lqinli chiziq.', holat:{gap:1, bolak:'aniqlovchi'}},
    {sarlavha:'Ega gap o‘rtasida ham bo‘ladi', matn:'2-gapda ega — <b>men</b> — gap o‘rtasida turibdi. Egani joyiga qarab emas, savoliga qarab toping: kim sotib oldi?', holat:{gap:1, bolak:'ega'}},
    {sarlavha:'Bir gapda ikki to‘ldiruvchi', matn:'3-gap: <i>Ustozimiz bizga qiziqarli kitoblarni ko‘rsatdi.</i> Kimga? — <b>bizga</b>; nimani? — <b>kitoblarni</b>. Ikkalasi to‘ldiruvchi; <i>qiziqarli</i> — aniqlovchi.', holat:{gap:2, bolak:'toldiruvchi'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Bo‘lakni top', holat:{gap:0, hamma:false},
    topshiriqlar:[
      {shart:'1-gapda <b>ega</b>ni bosing (kim?).', hodisa:'til-bolak', kod:"ev.gap===0 && ev.bolak==='ega' && ev.bosildi", izoh:'To‘g‘ri — <b>Bolalar</b> — ega.'},
      {shart:'1-gapda <b>kesim</b>ni bosing (nima qildi?).', hodisa:'til-bolak', kod:"ev.gap===0 && ev.bolak==='kesim' && ev.bosildi", izoh:'To‘g‘ri — <b>bordi</b> — kesim.'},
      {shart:'<b>2-gap</b>ga o‘ting va <b>aniqlovchi</b>ni bosing (qanday?).', hodisa:'til-bolak', kod:"ev.gap===1 && ev.bolak==='aniqlovchi' && ev.bosildi", izoh:'To‘g‘ri — <b>Shirin</b> (qanday olmalar?) — aniqlovchi.'},
      {shart:'2-gapda <b>to‘ldiruvchi</b>ni bosing (nimani?).', hodisa:'til-bolak', kod:"ev.gap===1 && ev.bolak==='toldiruvchi' && ev.bosildi", izoh:'To‘g‘ri — <b>olmalarni</b> — to‘ldiruvchi.'},
      {shart:'2-gapda <b>payt holi</b>ni bosing (qachon?).', hodisa:'til-bolak', kod:"ev.gap===1 && ev.bolak==='hol' && ev.soz==='kecha' && ev.bosildi", izoh:'To‘g‘ri — <b>kecha</b> — payt holi.'},
      {shart:'<b>4-gap</b>ga o‘ting va <b>ega</b>ni bosing.', hodisa:'til-bolak', kod:"ev.gap===3 && ev.bolak==='ega' && ev.bosildi", izoh:'To‘g‘ri — <b>quyosh</b> — ega (nima ko‘tarildi?). Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Gapning bosh bo‘laklari?', v:['ega va aniqlovchi','ega va kesim','kesim va hol','to‘ldiruvchi va hol'], t:1, izoh:'<b>Ega va kesim</b> — gapning asosi (grammatik markazi).'},
    {s:'«Bolalar maktabga bordi» gapida «maktabga» —', v:['ega','to‘ldiruvchi','hol','kesim'], t:2, izoh:'Qayerga bordi? — o‘rin <b>holi</b>.'},
    {s:'Kesim qanday chiziq bilan chiziladi?', v:['bir to‘g‘ri chiziq','ikki to‘g‘ri chiziq','to‘lqinli chiziq','uzuq chiziq'], t:1, izoh:'Kesim — <b>ikki chiziq</b>; ega — bir chiziq.'},
    {s:'«Shirin olmalarni oldim» gapida «Shirin» —', v:['aniqlovchi','to‘ldiruvchi','hol','ega'], t:0, izoh:'Qanday olmalar? — <b>aniqlovchi</b>.'},
    {s:'To‘ldiruvchi qaysi savollarga javob beradi?', v:['kim? nima?','qanday? qaysi?','kimni? nimani? kimga?','qachon? qayerda?'], t:2, izoh:'<b>kimni? nimani? kimga? nimadan?</b> — to‘ldiruvchi.'},
    {s:'«Men kecha keldim» gapida «kecha» —', v:['ega','payt holi','to‘ldiruvchi','aniqlovchi'], t:1, izoh:'Qachon keldim? — <b>payt holi</b>.'},
    {s:'Ega qaysi kelishikda bo‘ladi?', v:['tushum','jo‘nalish','bosh','o‘rin-payt'], t:2, izoh:'Ega <b>bosh kelishik</b>da: kim? nima?'},
    {s:'Ikkinchi darajali bo‘lak emas:', v:['aniqlovchi','hol','kesim','to‘ldiruvchi'], t:2, izoh:'<b>Kesim</b> — bosh bo‘lak.'},
    {s:'«Ustozimiz bizga kitob berdi» gapida «bizga» —', v:['ega','hol','to‘ldiruvchi','kesim'], t:2, izoh:'Kimga berdi? — <b>to‘ldiruvchi</b> (jo‘nalish kelishigi).'},
    {s:'Hol qaysi chiziq bilan chiziladi?', v:['to‘lqinli','uzuq','nuqta-chiziq','ikki chiziq'], t:2, izoh:'Hol — <b>nuqta-chiziq</b>.'},
    T3('Sahnadagi gapda <b>kesim</b>ni bosing.', 'til-bolak', 'bolak', ['kesim'], ['kesim — nima qildi?', 'boshqa bo‘lak'], 'Kesim — <b>bordi</b>: gap oxirida, ega haqidagi xabar.')
  ],
  yordamchi:[
    {s:'To‘ldiruvchi bilan holni qanday farqlayman?', j:'To‘ldiruvchi — harakat qaratilgan narsa/shaxs (kimni? nimani? kimga?): kitobni o‘qidi, ukamga berdim. Hol — harakatning sharoiti (qachon? qayerda? qanday? nega?): kecha keldi, maktabga bordi, tez yugurdi. «maktabga» o‘rin holi, chunki qayerga? deb so‘raladi.', kalit:['to‘ldiruvchi','hol','farq']},
    {s:'Ega doim gap boshidami?', j:'Yo‘q. O‘zbek tilida ega odatda boshida, lekin uslubiy maqsadda o‘rtada yoki oxirida ham keladi: «Shirin olmalarni men oldim». Egani joyiga emas, savoliga (kim? nima?) va bosh kelishikda ekaniga qarab toping.', kalit:['ega','boshida','joy']}
  ],
  maqola:[
    {sarlavha:'Gap va uning bo‘laklari', xatboshilar:[
      'Gap — tugallangan fikrni ifodalovchi so‘z yoki so‘zlar birikmasi. Gapdagi so‘zlar o‘zaro bog‘lanib, ma’lum vazifa bajaradi — bular gap bo‘laklari. Bo‘laklar ikki guruhga bo‘linadi: bosh bo‘laklar (ega va kesim) va ikkinchi darajali bo‘laklar (aniqlovchi, to‘ldiruvchi, hol).',
      'Ega va kesim gapning grammatik asosini tashkil qiladi — ularsiz gap bo‘lmaydi: <i>Bolalar bordi.</i> Ikkinchi darajali bo‘laklar gapni kengaytiradi, aniqlashtiradi: <i>Bolalar kecha maktabga bordi.</i> Faqat bosh bo‘laklardan iborat gap — yig‘iq gap, ikkinchi darajali bo‘laklari bor gap — yoyiq gap.',
      'Bo‘lakni aniqlashda savol beriladi: egaga — kim? nima?; kesimga — nima qildi? nima qilyapti? qanday? kim? (ot-kesim); aniqlovchiga — qanday? qaysi? nechta? kimning?; to‘ldiruvchiga — kimni? nimani? kimga? nimadan? kim bilan?; holga — qachon? qayerda? qayerga? qanday? nega?'
    ]},
    {sarlavha:'Bosh bo‘laklar: ega va kesim', xatboshilar:[
      'Ega — gapda ish-harakat bajaruvchisini yoki fikr qaratilgan narsani bildiradi, bosh kelishikda turadi va ko‘pincha ot yoki olmosh bilan ifodalanadi: <i>Quyosh chiqdi. U keldi. O‘qish — baxt.</i> Ega birikma bilan ham ifodalanishi mumkin: <i>Bizning sinf g‘olib bo‘ldi.</i>',
      'Kesim — ega haqidagi xabarni bildiradi. Fe’l-kesim harakatni (<i>bordi, o‘qiyapti</i>), ot-kesim holat yoki belgini bildiradi (<i>Havo sovuq. Akam — shifokor.</i>). Kesim egaga shaxs va sonda mos keladi: <i>men keldim, biz keldik, ular kelishdi</i>.',
      'O‘zbek tilida kesim odatda gap oxirida keladi — bu tilimizning asosiy xususiyatlaridan biri (ega — … — kesim tartibi). Ingliz tilida esa kesim egadan keyin darhol keladi: <i>I read a book</i> — «Men o‘qidim kitobni». Ingliz tili darslaridagi gap tuzilishi bilan solishtiring.'
    ]},
    {sarlavha:'Ikkinchi darajali bo‘laklar', xatboshilar:[
      'Aniqlovchi otga bog‘lanib, uning belgisini, miqdorini yoki egasini bildiradi: <i>shirin olma, uchta kitob, akamning daftari</i>. U sifat, son, olmosh, ot (qaratqich kelishigida) bilan ifodalanadi va aniqlanmishdan oldin keladi.',
      'To‘ldiruvchi fe’lga bog‘lanib, harakat qaratilgan narsa yoki shaxsni bildiradi: <i>kitobni o‘qidi, ukasiga berdi, do‘sti bilan gaplashdi</i>. Vositasiz to‘ldiruvchi tushum kelishigida (nimani?), vositali to‘ldiruvchi jo‘nalish, chiqish kelishiklarida yoki ko‘makchi bilan keladi.',
      'Hol harakatning payti, o‘rni, tarzi, sababi, maqsadini bildiradi: payt holi (<i>kecha, ertalab</i>), o‘rin holi (<i>maktabga, bog‘da</i>), ravish holi (<i>tez, sekin</i>), sabab holi (<i>sovuqdan</i>), maqsad holi (<i>o‘qish uchun</i>). Ko‘pincha ravish yoki o‘rin-payt kelishigidagi ot bilan ifodalanadi.'
    ]}
  ],
  formulalar:[
    ['Ega + (ikkinchi darajali bo‘laklar) + kesim', 'o‘zbek tilida kesim odatda oxirida'],
    ['Ega — kim? nima? (bosh kelishik)', 'bir chiziq'],
    ['Kesim — nima qildi? qanday?', 'ikki chiziq'],
    ['Aniqlovchi — qanday? qaysi? kimning?', 'to‘lqinli chiziq, otdan oldin'],
    ['To‘ldiruvchi — kimni? nimani? kimga?', 'uzuq chiziq'],
    ['Hol — qachon? qayerda? qanday? nega?', 'nuqta-chiziq']
  ],
  qiziqarli:[
    'O‘zbek tilida gap tartibi «ega — to‘ldiruvchi — kesim» (SOV), ingliz tilida «ega — kesim — to‘ldiruvchi» (SVO): dunyo tillarining aksariyati shu ikki turdan biriga kiradi (WALS ma’lumotlari).',
    'Faqat bosh bo‘laklardan iborat gap — yig‘iq gap: «Qor yog‘di»; ikkinchi darajali bo‘laklar qo‘shilsa — yoyiq gap.',
    'Kesim egasiz ham gap bo‘la oladi: «Yomg‘ir yog‘yapti» — ega bor, lekin «Kech bo‘ldi» kabi gaplarda ega tushirilgan.',
    'Tagiga chizish belgilari (bir, ikki, to‘lqinli chiziq) maktab grammatikasida an’anaviy — ular tahlilni ko‘rgazmali qiladi.'
  ],
  lugat:[['gap bo‘lagi', 'gapda ma’lum vazifa bajaruvchi so‘z yoki birikma'], ['bosh bo‘laklar', 'ega va kesim'], ['ikkinchi darajali bo‘laklar', 'aniqlovchi, to‘ldiruvchi, hol'], ['ega', 'kim? nima? — bajaruvchi'], ['kesim', 'ega haqidagi xabar'], ['aniqlovchi', 'otning belgisi'], ['to‘ldiruvchi', 'harakat qaratilgan narsa'], ['hol', 'harakatning payti, o‘rni, tarzi'], ['yig‘iq gap', 'faqat bosh bo‘laklardan iborat gap'], ['yoyiq gap', 'ikkinchi darajali bo‘laklari bor gap'], ['grammatik asos', 'ega + kesim']],
  manba:O6 + '; «O‘zbek tili grammatikasi» (akademik nashr) — sintaksis; WALS (World Atlas of Language Structures) «Order of Subject, Object and Verb». Sahnadagi gaplar — o‘quv namunalari.',
  ishlanma:ish('6-sinf', 'Yangi bilim berish', 'Interaktiv daraxt sxemasi, tagiga chizish mashqi, juftlikda tahlil',
    ['Bosh va ikkinchi darajali bo‘laklarni, ularning savollari va tagiga chizish belgilarini o‘rgatish.', 'Aniqlik, izchillik va mantiqiy fikrlashni tarbiyalash.', 'Gapni sintaktik tahlil qilish va sxema chizish ko‘nikmasini rivojlantirish.'],
    ['5 ta bo‘lakni savoli bilan aytadi', 'Gapdagi bo‘laklarni tagiga chizib ko‘rsatadi', 'Yig‘iq gapni yoyiq gapga aylantiradi', 'To‘ldiruvchi va holni farqlaydi'],
    ['MAKON sahnasi «Gap bo‘laklari»', 'Tarqatma gaplar', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Takrorlash.</b> So‘z turkumlari (5-sinf).', 'Javob beradi.'], ['8–20', '<b>Yangi mavzu.</b> MAKON da 1–2-gaplar: ega, kesim, hol, to‘ldiruvchi, aniqlovchi; daraxt sxemasi.', 'Daftarda tagiga chizadi.'], ['20–28', '<b>Mashq.</b> Tarqatma gaplarni juftlikda tahlil qilish.', 'Tahlil qiladi.'], ['28–36', '<b>Amaliyot.</b> MAKON amaliyoti.', 'Bajaradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['ega', 'kim? nima?'], ['kesim', 'nima qildi?'], ['aniqlovchi', 'qanday? qaysi?'], ['hol', 'qachon? qayerda?']],
    [['Bosh bo‘laklar?', 'ega va kesim'], ['«maktabga» — qaysi bo‘lak?', 'o‘rin holi'], ['Kesim nechta chiziq?', 'ikki'], ['«kitobni» — ?', 'to‘ldiruvchi']],
    'Darslikdagi mashqlar; 5 ta yoyiq gap tuzib, bo‘laklarini tagiga chizing; 3 ta yig‘iq gapni yoyiq gapga aylantiring.',
    O6)
};

/* ================================================================
   10. ALISHER NAVOIY: HAYOTI VA IJODI — 7-sinf (ot-navoiy)
   ================================================================ */
bogla('onatili', 'Alisher Navoiy: hayoti va ijodi', 'ot-navoiy', 'Xronologiya 1441–1501, Xuroson–Movarounnahr xaritasi, «Xamsa» 5 dostoni');
L['ot-navoiy'] = {
  fan:'onatili', qisqaNom:'Alisher Navoiy', nom:'Alisher Navoiy: hayoti va ijodi (1441–1501)', sinf:'7-sinf',
  qisqa:'7-sinf · Adabiyot · «Alisher Navoiy» · xronologiya va xarita',
  sahna:'til_ot_navoiy',
  kor:{
    sarlavha:'Turkiy she’riyatning quyoshi',
    matn:'Alisher Navoiy (1441-yil 9-fevral, Hirot — 1501-yil 3-yanvar, Hirot) — o‘zbek mumtoz adabiyotining asoschisi, shoir, mutafakkir va davlat arbobi. Sahnada uning hayot yo‘li xronologiyasi (11 voqea), Xuroson va Movarounnahrning sxematik xaritasi (Hirot, Samarqand, Mashhad, Astrobod…) hamda «Xamsa»ning besh dostoni kartalari bor. Voqeani, shaharni yoki dostonni <b>bosing</b>.',
    punktlar:['<b>1441–1501</b> — 60 yillik hayot; umrining ko‘p qismi Hirotda, Husayn Boyqaro saroyida','<b>«Xamsa» (1483–1485)</b> — turkiy tilda yozilgan birinchi to‘liq beshlik: 5 doston','<b>«Muhokamat ul-lug‘atayn» (1499)</b> — turkiy til forsiydan kam emasligini isbotlagan asar','<b>Davlat arbobi</b> — amir (vazir), Astrobod hokimi; madrasa, shifoxona, ko‘priklar qurdirgan']
  },
  bolimlar:[
    {sarlavha:'Hayot yo‘li (asosiy sanalar)', jadval:(SZ.navoiy ? SZ.navoiy.voqea : []).map(v=>[v.y, v.s])},
    {sarlavha:'«Xamsa» dostonlari', jadval:(SZ.navoiy ? Object.keys(SZ.navoiy.xamsa).map(k=>[SZ.navoiy.xamsa[k].nom + ' (' + SZ.navoiy.xamsa[k].y + ')', SZ.navoiy.xamsa[k].m]) : [])},
    {sarlavha:'Boshqa asarlari', jadval:[['«Xazoyin ul-maoniy»', '4 devon: «G‘aroyib us-sig‘ar», «Navodir ush-shabob», «Badoye ul-vasat», «Favoyid ul-kibar» (1492–1498)'], ['«Majolis un-nafois»', 'turkiy tildagi birinchi tazkira — 450 dan ortiq shoir haqida (1491; manbalarda 459)'], ['«Lison ut-tayr»', '«Qushlar tili» — falsafiy doston (1498–1499)'], ['«Muhokamat ul-lug‘atayn»', '«Ikki til muhokamasi» (1499)'], ['«Mahbub ul-qulub»', '«Qalblar sevgani» — nasriy-didaktik asar (1500)']]}
  ],
  bosqichlar:[
    {sarlavha:'Hirotda tug‘ildi — 1441', matn:'Navoiy 1441-yil 9-fevralda Hirotda, Temuriylar saroyi xizmatchisi G‘iyosiddin Kichkina oilasida tug‘ildi. Yoshligidan Husayn Boyqaro bilan birga tarbiyalangan.', holat:{voqea:0}},
    {sarlavha:'Mashhad va Samarqand', matn:'1457-yildan Mashhadda, 1465–1469-yillarda Samarqandda tahsil oldi. Xaritada ikkala shahar Hirotdan uzoqda — turli davlatlar hududida.', holat:{voqea:2, shahar:'samarqand'}},
    {sarlavha:'Hirotga qaytish, amir lavozimi', matn:'1469-yilda Husayn Boyqaro Hirot taxtini egallagach, Navoiy qaytib muhrdor, 1472-yilda amir (vazir) bo‘ldi. Madrasa, masjid, shifoxona qurdirdi.', holat:{voqea:4}},
    {sarlavha:'«Xamsa» — 1483–1485', matn:'Ikki yilda besh doston yozildi. Bu — turkiy tilda yaratilgan birinchi to‘liq «Xamsa». Dostonlarni pastdagi kartalardan oching.', holat:{voqea:5, doston:'hayrat'}},
    {sarlavha:'«Farhod va Shirin», «Layli va Majnun»', matn:'Ikki ishqiy doston: Farhod — mehnat va ilm timsoli; Layli va Majnun — fojiali muhabbat. Kartalarni bosib mazmunini o‘qing.', holat:{doston:'farhod'}},
    {sarlavha:'Astrobod hokimi — 1487', matn:'1487–1488-yillarda Navoiy Astrobod viloyatiga hokim etib yuborildi; keyin Hirotga qaytib, ijodga berildi.', holat:{voqea:6, shahar:'astrobod'}},
    {sarlavha:'«Muhokamat ul-lug‘atayn» va vafot', matn:'1499-yilda turkiy va forsiy tillarni qiyoslagan asarini yozdi. 1501-yil 3-yanvarda Hirotda vafot etdi.', holat:{voqea:9}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Navoiy xaritasi va xronologiyasi', holat:{voqea:0},
    topshiriqlar:[
      {shart:'Xaritada Navoiy <b>tug‘ilgan shahar</b>ni bosing.', hodisa:'til-navoiy', kod:"ev.nom==='hirot' && ev.bosildi", izoh:'To‘g‘ri — <b>Hirot</b>: tug‘ilgan va vafot etgan shahri.'},
      {shart:'Navoiy 1465–1469-yillarda <b>tahsil olgan</b> shaharni bosing.', hodisa:'til-navoiy', kod:"ev.nom==='samarqand' && ev.bosildi", izoh:'To‘g‘ri — <b>Samarqand</b>, Fazlulloh Abullays madrasasi.'},
      {shart:'Xronologiyada <b>«Xamsa» yozilgan</b> voqeani bosing.', hodisa:'til-navoiy', kod:"ev.nom==='v5' && ev.bosildi", izoh:'To‘g‘ri — <b>1483–1485</b>: besh doston.'},
      {shart:'«Xamsa» kartalaridan <b>«Farhod va Shirin»</b>ni bosing.', hodisa:'til-navoiy', kod:"ev.nom==='farhod' && ev.bosildi", izoh:'To‘g‘ri — <b>«Farhod va Shirin»</b> (1484): mehnat va sadoqat dostoni.'},
      {shart:'Navoiy <b>hokim bo‘lgan</b> viloyat markazini xaritada bosing.', hodisa:'til-navoiy', kod:"ev.nom==='astrobod' && ev.bosildi", izoh:'To‘g‘ri — <b>Astrobod</b> (1487–1488).'},
      {shart:'Xronologiyada Navoiy <b>vafot etgan</b> yilni bosing.', hodisa:'til-navoiy', kod:"ev.nom==='v10' && ev.bosildi", izoh:'To‘g‘ri — <b>1501-yil 3-yanvar</b>, Hirot. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Alisher Navoiy qachon va qayerda tug‘ilgan?', v:['1441, Hirot','1483, Andijon','1441, Samarqand','1501, Hirot'], t:0, izoh:'<b>1441-yil 9-fevral, Hirot</b>. 1483, Andijon — Bobur.'},
    {s:'«Xamsa» necha dostondan iborat?', v:['3','4','5','7'], t:2, izoh:'«Xamsa» — arabcha «beshlik»: <b>5 doston</b>.'},
    {s:'«Xamsa» qaysi yillarda yozilgan?', v:['1465–1469','1483–1485','1491–1498','1499–1501'], t:1, izoh:'<b>1483–1485</b> — ikki yilda besh doston.'},
    {s:'Qaysi doston «Xamsa»ga kirmaydi?', v:['Hayrat ul-abror','Farhod va Shirin','Lison ut-tayr','Saddi Iskandariy'], t:2, izoh:'<b>«Lison ut-tayr»</b> — alohida falsafiy doston (1498–1499). «Xamsa»: Hayrat ul-abror, Farhod va Shirin, Layli va Majnun, Sab’ai sayyor, Saddi Iskandariy.'},
    {s:'«Muhokamat ul-lug‘atayn» nima haqida?', v:['Qushlar tili','Turkiy va forsiy tillarni qiyoslash','Shoirlar tazkirasi','Iskandar haqida'], t:1, izoh:'<b>«Ikki til muhokamasi»</b> (1499) — turkiy til forsiydan kam emasligini isbotlaydi.'},
    {s:'Navoiy qaysi hukmdor saroyida amir bo‘lgan?', v:['Amir Temur','Ulug‘bek','Husayn Boyqaro','Bobur'], t:2, izoh:'<b>Husayn Boyqaro</b> — Hirot hukmdori (1469–1506), Navoiyning do‘sti.'},
    {s:'Navoiy 1487–1488-yillarda qayerda hokim bo‘lgan?', v:['Samarqand','Astrobod','Mashhad','Balx'], t:1, izoh:'<b>Astrobod</b> (hozirgi Gurgon, Eron).'},
    {s:'«Majolis un-nafois» qanday asar?', v:['doston','tazkira (shoirlar haqida)','devon','tilshunoslik risolasi'], t:1, izoh:'<b>Tazkira</b> — turkiy tildagi birinchi tazkira (1491), 450 dan ortiq shoir haqida.'},
    {s:'Navoiy qachon vafot etgan?', v:['1499','1500','1501','1506'], t:2, izoh:'<b>1501-yil 3-yanvar</b>, Hirot.'},
    {s:'«Xazoyin ul-maoniy» nechta devondan iborat?', v:['2','3','4','5'], t:2, izoh:'<b>4 devon</b>: G‘aroyib us-sig‘ar, Navodir ush-shabob, Badoye ul-vasat, Favoyid ul-kibar.'},
    T3('Xaritada <b>Samarqand</b>ni bosing — Navoiy shu yerda tahsil olgan.', 'til-navoiy', 'nom', ['samarqand'], ['Samarqand', 'boshqa shahar'], '<b>Samarqand</b> — 1465–1469-yillarda Navoiy tahsil olgan shahar, Movarounnahrda.')
  ],
  yordamchi:[
    {s:'Nega Navoiy turkiy tilda yozgani muhim?', j:'XV asrda saroy she’riyati asosan fors tilida edi. Navoiy turkiy (eski o‘zbek) tilida «Xamsa» kabi yirik asarlar yaratib, bu til ham badiiy ijodga to‘la yaroqli ekanini amalda isbotladi; «Muhokamat ul-lug‘atayn»da buni nazariy asosladi.', kalit:['turkiy','nega','muhim']},
    {s:'Navoiy va Foniy — bir kishimi?', j:'Ha. Navoiy turkiy she’rlariga «Navoiy», forsiy she’rlariga «Foniy» taxallusini qo‘ygan. Asl ismi — Nizomiddin Mir Alisher.', kalit:['foniy','taxallus','ism']},
    {s:'Xarita qanchalik aniq?', j:'Xarita sxematik: shaharlar joyi zamonaviy koordinatalar bo‘yicha, hududlar (Xuroson, Movarounnahr) va daryolar taxminiy chizilgan. XV asr siyosiy chegaralari aniq ko‘rsatilmagan.', kalit:['xarita','aniq']}
  ],
  maqola:[
    {sarlavha:'Hayot yo‘li: Hirotdan Hirotgacha', xatboshilar:[
      'Nizomiddin Mir Alisher 1441-yil 9-fevralda Hirotda tug‘ildi. Otasi G‘iyosiddin Kichkina Temuriylar saroyida xizmat qilgan; bo‘lajak shoir bolaligidan she’r yodlab, Husayn Boyqaro bilan birga o‘sdi. 1457-yildan oilasi Mashhadga ko‘chdi, 1465–1469-yillarda Navoiy Samarqandda tahsil oldi.',
      '1469-yilda Husayn Boyqaro Hirot taxtini egallagach, Navoiy poytaxtga qaytib muhrdor, 1472-yilda esa amir — davlatning yuqori lavozimiga tayinlandi. U adolatli boshqaruv, ilm-fan va madaniyat homiysi sifatida tanildi: Hirot va atrofida madrasa, masjid, shifoxona, hammom, ko‘prik va rabotlar qurdirdi (manbalarda 300 ga yaqin inshoot). 1487–1488-yillarda Astrobod hokimi bo‘ldi.',
      'Umrining so‘nggi o‘n yilini asosan ijodga bag‘ishladi: 1490-yillarda devonlar, tazkira, «Lison ut-tayr», «Muhokamat ul-lug‘atayn», «Mahbub ul-qulub» yaratildi. 1501-yil 3-yanvarda Hirotda vafot etdi va o‘zi qurdirgan Qudsiya masjidi yonida dafn qilindi.'
    ]},
    {sarlavha:'«Xamsa» — turkiy tildagi birinchi beshlik', xatboshilar:[
      '«Xamsa» (arabcha «besh») — bir xil sxemadagi besh dostondan iborat asar. Bu an’anani XII asrda Nizomiy Ganjaviy fors tilida boshlagan, keyin Xusrav Dehlaviy davom ettirgan. Navoiy 1483–1485-yillarda turkiy tilda to‘liq «Xamsa» yaratdi — bu adabiyot tarixidagi katta voqea bo‘ldi.',
      'Dostonlar: «Hayrat ul-abror» (1483) — falsafiy-axloqiy maqolatlar; «Farhod va Shirin» (1484) — mehnat, ilm va sadoqat qahramoni Farhod; «Layli va Majnun» (1484) — fojiali muhabbat; «Sab’ai sayyor» (1484) — Bahrom va Dilorom, yetti hikoyat; «Saddi Iskandariy» (1485) — adolatli hukmdor obrazi. Dostonlarning yozilish yillari manbalarda 1483–1485 oralig‘ida turlicha ko‘rsatiladi.',
      'Navoiy Nizomiy syujetlarini takrorlamay, qahramonlarga yangi ma’no berdi: masalan, Farhod Nizomiyda ikkinchi darajali, Navoiyda esa bosh qahramon — hunarmand, olim va jasur yigit.'
    ]},
    {sarlavha:'Til va meros', xatboshilar:[
      '«Muhokamat ul-lug‘atayn» (1499) asarida Navoiy turkiy va forsiy tillarni so‘z boyligi, grammatik imkoniyatlari bo‘yicha qiyoslab, turkiy tilning badiiy ijod uchun boy va nozik ekanini isbotladi. Bu — tilshunoslik tarixidagi ilk qiyosiy asarlardan biri.',
      '«Xazoyin ul-maoniy» (1492–1498) — shoirning to‘rt devonga jamlangan lirikasi: g‘azal, ruboiy, qit’a va boshqa janrlar. «Majolis un-nafois» (1491) — turkiy tildagi birinchi tazkira, zamondosh shoirlar haqida ma’lumotnoma.',
      'Navoiy nomi bugun O‘zbekistonda viloyat, shahar, universitet, teatr va kutubxonalarga berilgan; 9-fevral — shoir tavalludi kuni keng nishonlanadi. Asarlari dunyo tillariga tarjima qilingan; 2021-yilda 580 yilligi xalqaro miqyosda nishonlandi.'
    ]}
  ],
  formulalar:[
    ['1441 — 1501', 'Hayot yillari (Hirot — Hirot), 60 yil'],
    ['1483 — 1485', '«Xamsa»: 5 doston, 2 yil'],
    ['1491 · 1492–1498 · 1499', 'Tazkira · 4 devon · «Muhokamat ul-lug‘atayn»'],
    ['Navoiy (turkiy) / Foniy (forsiy)', 'Ikki taxallus']
  ],
  qiziqarli:[
    'Navoiy forsiy she’rlariga «Foniy» taxallusini qo‘ygan — u ikki tilda ijod qilgan.',
    '«Xamsa»ning umumiy hajmi taxminan 50 ming misra (manbalarda 51–52 ming ham) — bu «Iliada»dan uch baravar katta.',
    'Navoiy Hirotda qurdirgan inshootlar soni manbalarda 300 ga yaqin deb ko‘rsatiladi — madrasa, masjid, shifoxona, ko‘priklar.',
    'Merkuriy sayyorasidagi kraterlardan biri Navoiy nomi bilan atalgan — Xalqaro astronomiya ittifoqi, 2008-yil (MESSENGER missiyasi suratlari asosida; diametri manbalarda 66–69 km).'
  ],
  lugat:[['Xamsa', 'beshlik — besh dostondan iborat asar'], ['doston', 'yirik she’riy asar'], ['devon', 'shoir she’rlari to‘plami'], ['tazkira', 'shoirlar haqida ma’lumotnoma'], ['g‘azal', 'lirik she’r janri (5–12 bayt)'], ['bayt', 'ikki misrali she’r birligi'], ['taxallus', 'shoirning adabiy nomi'], ['amir', 'yuqori davlat lavozimi (vazir)'], ['muhrdor', 'davlat muhrini saqlovchi'], ['Temuriylar', 'Amir Temur avlodlari sulolasi'], ['Xuroson', 'Hirot markazli tarixiy viloyat'], ['Movarounnahr', 'Amudaryo va Sirdaryo oralig‘i']],
  manba:A7 + '; ziyouz.uz «Alisher Navoi (1441–1501)»; ' + MW + ' «Ali-Shir Nava’i», «Khamsa (Nava’i)»; Ohio State University (slaviccenter.osu.edu) «580th anniversary of Alisher Navoi»; NASA/JPL Photojournal PIA12046 «Navoi: An Uncommon Crater Named for the Uzbek Poet» (Merkuriy, IAU 2008). Dostonlarning aniq yillari va inshootlar soni manbalarda turlicha — taxminiy. Xarita sxematik.',
  ishlanma:ish('7-sinf', 'Yangi bilim berish', 'Interaktiv xronologiya va xarita, «Xamsa» kartalari, guruh taqdimoti',
    ['Navoiy hayoti va ijodining asosiy bosqichlari, «Xamsa» tarkibi va ahamiyatini o‘rgatish.', 'Milliy g‘urur, ona tiliga muhabbat, ilm va adolat qadriyatlarini tarbiyalash.', 'Xronologik va xaritaviy fikrlash, asar mazmunini qisqa bayon qilish ko‘nikmasini rivojlantirish.'],
    ['Navoiy hayotining 6–8 asosiy sanasini aytadi', '«Xamsa» dostonlarini nomlaydi va mazmunini qisqa bayon qiladi', 'Xaritada Hirot, Samarqand, Astrobodni ko‘rsatadi', '«Muhokamat ul-lug‘atayn» g‘oyasini tushuntiradi'],
    ['MAKON sahnasi «Alisher Navoiy»', 'Navoiy portreti, «Xamsa» nashri', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Motivatsiya.</b> Navoiydan bir bayt o‘qiladi; «Bu kim?»', 'Fikr aytadi.'], ['8–20', '<b>Hayot yo‘li.</b> MAKON xronologiyasi va xaritasi: Hirot → Mashhad → Samarqand → Hirot → Astrobod.', 'Sanalarni yozadi.'], ['20–30', '<b>«Xamsa».</b> 5 doston kartalari; guruhlar har dostonni taqdim qiladi.', 'Taqdimot qiladi.'], ['30–37', '<b>Amaliyot.</b> MAKON amaliyoti.', 'Bajaradi.'], ['37–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['Xamsa', 'beshlik'], ['tazkira', 'shoirlar haqida kitob'], ['devon', 'she’rlar to‘plami'], ['amir', 'vazir']],
    [['Navoiy qachon tug‘ilgan?', '1441, Hirot'], ['«Xamsa» nechta doston?', '5'], ['Qaysi hukmdor saroyida?', 'Husayn Boyqaro'], ['«Muhokamat ul-lug‘atayn» yili?', '1499']],
    'Darslikdagi mavzuni o‘qish; «Xamsa» dostonlaridan birining mazmunini 8–10 gap bilan yozing; Navoiyning bir g‘azalidan 2 bayt yodlang.',
    A7)
};


/* ================================================================
   11. QO‘SHMA GAPLAR — 8-sinf (ot-qoshma)
   ================================================================ */
bogla('onatili', 'Qo‘shma gaplar', 'ot-qoshma', 'Bog‘langan, ergash gapli va bog‘lovchisiz qo‘shma gaplar — interaktiv yig‘ish');
L['ot-qoshma'] = {
  fan:'onatili', qisqaNom:'Qo‘shma gaplar', nom:'Qo‘shma gaplar: bog‘langan, ergash gapli, bog‘lovchisiz', sinf:'8-sinf',
  qisqa:'8-sinf · Ona tili · «Qo‘shma gap» · interaktiv yig‘ish',
  sahna:'til_ot_qoshma',
  kor:{
    sarlavha:'Ikki sodda gap — bitta qo‘shma gap',
    matn:'Sahnada ikki sodda gap va bog‘lovchi vositalar: <i>va, lekin, yoki, chunki, shuning uchun, agar … -sa, -gach, -sa ham</i> va faqat vergul. Bog‘lovchini <b>bosing</b> — gaplar birikib qo‘shma gap hosil bo‘ladi, uning turi (bog‘langan / ergash gapli / bog‘lovchisiz) va ergash gap ma’nosi (sabab, shart, payt …) ko‘rsatiladi. Bosh gap ko‘k, ergash gap sariq rangda.',
    punktlar:['<b>Qo‘shma gap</b> — ikki yoki undan ortiq sodda gapning mazmun va ohang jihatdan birikuvi','<b>Bog‘langan</b> — teng huquqli qismlar, teng bog‘lovchi: va, ammo, lekin, yoki','<b>Ergash gapli</b> — bosh gap + unga tobe ergash gap: chunki, agar, -gach, -sa ham','<b>Bog‘lovchisiz</b> — faqat ohang va tinish belgisi (vergul, ikki nuqta, tire)']
  },
  bolimlar:[
    {sarlavha:'Bog‘lovchi vositalar va natija', jadval:Object.keys(SZ.qoshma || {}).map(k=>[SZ.qoshma[k].b, SZ.qoshma[k].gap + ' — ' + (SZ.qoshmaTur[SZ.qoshma[k].tur].nom) + (SZ.qoshma[k].tur === 'ergash' ? ' (' + SZ.qoshma[k].mano + ')' : '')])},
    {sarlavha:'Ergash gap turlari (asosiylari)', jadval:[['Sabab', 'chunki, -gani uchun: Chiqmadi, chunki havo sovuq edi.'], ['Shart', 'agar … -sa: Agar yomg‘ir yog‘sa, uyda qolamiz.'], ['Payt', '-gach, -ganda, -guncha: Qo‘ng‘iroq chalingach, dars boshlandi.'], ['To‘siqsiz', '-sa ham, -ganiga qaramay: Charchagan bo‘lsa ham, ishladi.'], ['Natija', 'shuning uchun, shu sababli: Kech qoldi, shuning uchun kirmadi.'], ['Maqsad', '… uchun, deb: Yaxshi o‘qisin deb, unga kitob olib berdim.']]},
    {sarlavha:'Tinish belgilari', jadval:[['Vergul', 'ammo, lekin, chunki, shuning uchun oldidan; ergash gapdan keyin'], ['Vergul qo‘yilmaydi', 'va, yoki bir marta kelganda: Havo ochildi va bolalar chiqdi.'], ['Ikki nuqta / tire', 'bog‘lovchisiz qo‘shma gapda sabab (:) yoki natija (—) ma’nosida']]}
  ],
  bosqichlar:[
    {sarlavha:'Biriktiruv: va', matn:'<i>Havo ochildi va bolalar ko‘chaga chiqdi.</i> Ikki teng gap biriktiruv bog‘lovchisi bilan — bog‘langan qo‘shma gap. «va» oldidan vergul qo‘yilmaydi.', holat:{boglovchi:'va'}},
    {sarlavha:'Zidlov: lekin, ammo, biroq', matn:'<i>Havo sovuq edi, lekin bolalar ko‘chaga chiqdi.</i> Ikkinchi gap birinchisiga zid. Zidlov bog‘lovchisi oldidan vergul qo‘yiladi.', holat:{boglovchi:'lekin'}},
    {sarlavha:'Ayiruv: yoki', matn:'<i>Bolalar ko‘chaga chiqadi yoki uyda o‘tiradi.</i> Ikki holatdan biri — ayiruv. Bu ham bog‘langan qo‘shma gap.', holat:{boglovchi:'yoki'}},
    {sarlavha:'Sabab ergash gap: chunki', matn:'<i>Bolalar ko‘chaga chiqmadi, chunki havo sovuq edi.</i> Endi gaplar teng emas: ikkinchisi birinchisining sababini aytadi — ergash gap. Birinchisi — bosh gap.', holat:{boglovchi:'chunki'}},
    {sarlavha:'Shart ergash gap: agar … -sa', matn:'<i>Agar havo ochilsa, bolalar ko‘chaga chiqadi.</i> Ergash gap (shart) bosh gapdan oldin keladi; -sa shakli va vergul.', holat:{boglovchi:'agar'}},
    {sarlavha:'Payt va to‘siqsiz ergash gaplar', matn:'<i>Havo ochilgach, bolalar chiqdi</i> — payt (-gach). <i>Havo sovuq bo‘lsa ham, bolalar chiqdi</i> — to‘siqsiz (-sa ham): to‘siqqa qaramay harakat bajarildi.', holat:{boglovchi:'gach'}},
    {sarlavha:'Bog‘lovchisiz qo‘shma gap', matn:'<i>Havo ochildi, bolalar ko‘chaga chiqdi.</i> Bog‘lovchi yo‘q — faqat ohang va vergul. Mazmuniga qarab ikki nuqta yoki tire ham qo‘yilishi mumkin.', holat:{boglovchi:'vergul'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Qo‘shma gap yasang', holat:{boglovchi:'va'},
    topshiriqlar:[
      {shart:'<b>Zidlov</b> bog‘lovchisi bilan bog‘langan qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='boglangan' && ev.mano==='zidlov' && ev.bosildi", izoh:'To‘g‘ri — <b>lekin</b>: «Havo sovuq edi, lekin bolalar ko‘chaga chiqdi.»'},
      {shart:'<b>Sabab</b> ergash gapli qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='ergash' && ev.mano==='sabab' && ev.bosildi", izoh:'To‘g‘ri — <b>chunki</b>: ergash gap sababni bildiradi.'},
      {shart:'<b>Shart</b> ergash gapli qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='ergash' && ev.mano==='shart' && ev.bosildi", izoh:'To‘g‘ri — <b>agar … -sa</b>.'},
      {shart:'<b>Payt</b> ergash gapli qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='ergash' && ev.mano==='payt' && ev.bosildi", izoh:'To‘g‘ri — <b>-gach</b>: «Havo ochilgach, bolalar chiqdi.»'},
      {shart:'<b>To‘siqsiz</b> ergash gapli qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='ergash' && ev.mano==='to‘siqsiz' && ev.bosildi", izoh:'To‘g‘ri — <b>-sa ham</b>: to‘siqqa qaramay.'},
      {shart:'<b>Bog‘lovchisiz</b> qo‘shma gap yasang.', hodisa:'til-qoshma', kod:"ev.gtur==='boglovchisiz' && ev.bosildi", izoh:'To‘g‘ri — faqat <b>vergul</b> va ohang. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Qo‘shma gap nima?', v:['bitta sodda gap','ikki yoki undan ortiq sodda gapning birikuvi','faqat uzun gap','ega va kesimdan iborat gap'], t:1, izoh:'<b>Ikki yoki undan ortiq sodda gap</b> mazmun va ohang jihatdan birikadi.'},
    {s:'«Havo sovuq edi, lekin biz sayrga chiqdik» — qanday qo‘shma gap?', v:['ergash gapli','bog‘langan','bog‘lovchisiz','sodda'], t:1, izoh:'<b>Bog‘langan</b> — zidlov bog‘lovchisi (lekin), qismlar teng huquqli.'},
    {s:'«Agar yomg‘ir yog‘sa, uyda qolamiz» — ergash gap turi?', v:['sabab','shart','payt','natija'], t:1, izoh:'<b>Shart</b> ergash gap: agar … -sa.'},
    {s:'Qaysi bog‘lovchi oldidan vergul qo‘yilmaydi?', v:['lekin','chunki','va (bir marta)','ammo'], t:2, izoh:'<b>va</b> bir marta kelganda vergul qo‘yilmaydi; lekin, ammo, chunki oldidan qo‘yiladi.'},
    {s:'«Dars tugagach, uyga ketdik» — ergash gap turi?', v:['payt','sabab','shart','maqsad'], t:0, izoh:'<b>Payt</b> ergash gap: -gach (qachon?).'},
    {s:'Bog‘lovchisiz qo‘shma gapni toping.', v:['Kun isidi va qor eridi.','Kun isidi, qor eridi.','Qor eridi, chunki kun isidi.','Agar kun isisa, qor eriydi.'], t:1, izoh:'<b>Kun isidi, qor eridi.</b> — bog‘lovchi yo‘q, faqat vergul.'},
    {s:'Ergash gapli qo‘shma gapda qismlar …', v:['teng huquqli','biri boshqasiga tobe','bog‘lovchisiz','har doim ikkita'], t:1, izoh:'Ergash gap bosh gapga <b>tobe</b>, uni izohlaydi.'},
    {s:'«Charchagan bo‘lsa ham, ishlashda davom etdi» — ergash gap turi?', v:['shart','to‘siqsiz','sabab','payt'], t:1, izoh:'<b>To‘siqsiz</b>: -sa ham — to‘siqqa qaramay.'},
    {s:'«shuning uchun» qanday ma’no bildiradi?', v:['sabab','natija','shart','payt'], t:1, izoh:'<b>Natija</b>: Kech qoldi, shuning uchun kirmadi.'},
    {s:'Qaysi qatorda faqat teng bog‘lovchilar?', v:['va, ammo, yoki','chunki, agar, -gach','shuning uchun, -sa ham','lekin, chunki, agar'], t:0, izoh:'<b>va, ammo, yoki</b> — teng bog‘lovchilar (biriktiruv, zidlov, ayiruv).'},
    T3('Sahnada <b>zidlov</b> bog‘lovchisi bilan qo‘shma gap yasang (bog‘lovchini bosing).', 'til-qoshma', 'mano', ['zidlov'], ['lekin — zidlov', 'boshqa bog‘lovchi'], '<b>lekin</b> (ammo, biroq) — zidlov bog‘lovchisi: bog‘langan qo‘shma gap.')
  ],
  yordamchi:[
    {s:'Bosh gap bilan ergash gapni qanday ajrataman?', j:'Ergash gap bosh gapga savol beradi va unga tobe: «Chiqmadi (nega?), chunki havo sovuq edi». Ergash gapni olib tashlasangiz, bosh gap mustaqil qoladi: «Bolalar chiqmadi». Ergash gapning o‘zi esa to‘liq fikr bermaydi.', kalit:['bosh gap','ergash gap','ajrat']},
    {s:'Bog‘langan va bog‘lovchisiz farqi?', j:'Ikkalasida qismlar teng; farq — bog‘lovchining bor-yo‘qligi: «Kun isidi va qor eridi» (bog‘langan), «Kun isidi, qor eridi» (bog‘lovchisiz).', kalit:['bog‘langan','bog‘lovchisiz']}
  ],
  maqola:[
    {sarlavha:'Sodda gapdan qo‘shma gapga', xatboshilar:[
      'Sodda gapda bitta grammatik asos (ega + kesim) bo‘ladi: <i>Havo ochildi.</i> Qo‘shma gapda ikki yoki undan ortiq asos bor: <i>Havo ochildi va bolalar ko‘chaga chiqdi.</i> Qismlar mazmunan bog‘liq, bir butun ohang bilan aytiladi va yozuvda bitta gap sifatida rasmiylashadi.',
      'Qo‘shma gapning qismlari qanday bog‘langaniga qarab uch tur ajratiladi: bog‘langan (teng bog‘lovchilar bilan), ergash gapli (ergashtiruvchi bog‘lovchi yoki fe’l shakllari bilan) va bog‘lovchisiz (faqat ohang va tinish belgisi bilan).',
      'Qo‘shma gaplar fikrni aniq va ixcham ifodalaydi: sabab, shart, payt kabi munosabatlar alohida gaplarda emas, bitta gap ichida ko‘rsatiladi. Lekin juda uzun qo‘shma gaplar tushunishni qiyinlashtiradi — me’yor kerak.'
    ]},
    {sarlavha:'Bog‘langan qo‘shma gap', xatboshilar:[
      'Bog‘langan qo‘shma gapda qismlar teng huquqli — birini boshqasidan so‘rab bo‘lmaydi. Ular teng bog‘lovchilar bilan bog‘lanadi: biriktiruv (<i>va, hamda, -u/-yu, ham … ham</i>), zidlov (<i>ammo, lekin, biroq, balki</i>), ayiruv (<i>yoki, yo, goh … goh, dam … dam</i>).',
      'Tinish belgilari: zidlov bog‘lovchilari oldidan doim vergul (<i>…, lekin …</i>); <i>va</i> va <i>yoki</i> bir marta kelganda vergul qo‘yilmaydi, takror kelganda (<i>goh … goh</i>, <i>ham … ham</i>) qo‘yiladi.',
      'Misollar: <i>Qo‘ng‘iroq chalindi va o‘quvchilar sinfga kirdi. Kitob qiziqarli edi, ammo vaqt yetmadi. Yo sen gapir, yo men gapiray.</i>'
    ]},
    {sarlavha:'Ergash gapli qo‘shma gap', xatboshilar:[
      'Bu turda bosh gap va unga tobe ergash gap bo‘ladi. Ergash gap bosh gapdagi biror bo‘lakni izohlaydi yoki uning sababi, sharti, payti, maqsadi, natijasini bildiradi. Bog‘lovchi vositalar: ergashtiruvchi bog‘lovchilar (<i>chunki, agar, shuning uchun, go‘yo, -ki</i>), fe’lning shart (-sa), ravishdosh (-gach, -ganda, -guncha) va sifatdosh shakllari, <i>uchun, sayin, bilan</i> ko‘makchilari.',
      'Ergash gap turlari ma’nosiga ko‘ra: ega, kesim, to‘ldiruvchi, aniqlovchi ergash gaplar (bosh gap bo‘lagini izohlaydi) va payt, o‘rin, sabab, maqsad, shart, to‘siqsiz, natija, ravish, o‘xshatish, miqdor-daraja ergash gaplar. Maktab dasturida eng ko‘p uchraydiganlari: sabab, shart, payt, to‘siqsiz, natija.',
      'Ergash gap bosh gapdan oldin ham, keyin ham kelishi mumkin: <i>Agar havo ochilsa, chiqamiz. / Chiqamiz, agar havo ochilsa.</i> Ikkala holatda ham qismlar vergul bilan ajratiladi.'
    ]}
  ],
  formulalar:[
    ['Sodda gap + va / ammo / yoki + sodda gap', 'bog‘langan qo‘shma gap'],
    ['Bosh gap + chunki + ergash gap', 'sabab ergash gap'],
    ['Agar + ergash gap (-sa), + bosh gap', 'shart ergash gap'],
    ['Ergash gap (-gach / -ganda), + bosh gap', 'payt ergash gap'],
    ['Ergash gap (-sa ham), + bosh gap', 'to‘siqsiz ergash gap'],
    ['Sodda gap, sodda gap', 'bog‘lovchisiz qo‘shma gap']
  ],
  qiziqarli:[
    '«Qo‘shma gap» atamasi o‘zbek tilshunosligida XX asr boshidan qo‘llanadi; undan oldin arab grammatikasi atamalari ishlatilgan.',
    'Bog‘lovchisiz qo‘shma gap badiiy matnda juda ko‘p: u nutqqa tezlik va ohang beradi — «Kun botdi, qush uyasiga qaytdi».',
    'O‘zbek tilida ergash gap ko‘pincha fe’l shakli (-sa, -gach) bilan yasaladi; ingliz tilida esa alohida bog‘lovchi so‘z (if, when, because) kerak.',
    'Eng uzun qo‘shma gaplar huquqiy hujjatlarda uchraydi — bir gap yuzlab so‘zdan iborat bo‘lishi mumkin.'
  ],
  lugat:[['qo‘shma gap', 'ikki va undan ortiq sodda gap birikuvi'], ['grammatik asos', 'ega + kesim'], ['bog‘langan qo‘shma gap', 'teng bog‘lovchili'], ['ergash gapli qo‘shma gap', 'bosh gap + ergash gap'], ['bog‘lovchisiz qo‘shma gap', 'faqat ohang va tinish belgisi bilan'], ['bosh gap', 'mustaqil qism'], ['ergash gap', 'bosh gapga tobe qism'], ['teng bog‘lovchi', 'va, ammo, lekin, yoki'], ['ergashtiruvchi bog‘lovchi', 'chunki, agar, shuning uchun'], ['biriktiruv / zidlov / ayiruv', 'va / lekin / yoki ma’nolari'], ['to‘siqsiz ergash gap', 'to‘siqqa qaramay — -sa ham']],
  manba:O8 + '; «O‘zbek tili grammatikasi» (akademik nashr) — qo‘shma gap sintaksisi. Sahnadagi gaplar — o‘quv namunalari.',
  ishlanma:ish('8-sinf', 'Yangi bilim berish', 'Interaktiv gap yig‘ish, juftlikda gap tuzish, «Bog‘lovchini top» o‘yini',
    ['Qo‘shma gap turlari, bog‘lovchi vositalar va tinish belgilarini o‘rgatish.', 'Fikrni aniq, mantiqiy va ixcham ifodalashga o‘rgatish.', 'Gaplarni o‘zgartirish, sabab-natija munosabatini ko‘rish ko‘nikmasini rivojlantirish.'],
    ['Qo‘shma gapning 3 turini farqlaydi', 'Ergash gapning 5 asosiy turini aniqlaydi', 'Berilgan ikki sodda gapdan turli qo‘shma gaplar yasaydi', 'Tinish belgilarini to‘g‘ri qo‘yadi'],
    ['MAKON sahnasi «Qo‘shma gaplar»', 'Tarqatma sodda gaplar', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Takrorlash.</b> Sodda gap, grammatik asos.', 'Javob beradi.'], ['8–20', '<b>Yangi mavzu.</b> MAKON da bog‘lovchilarni bosib 9 ta qo‘shma gap; turlari.', 'Jadval tuzadi.'], ['20–28', '<b>Mashq.</b> Juftlikda ikki sodda gapdan 4 xil qo‘shma gap yasash.', 'Gaplar tuzadi.'], ['28–36', '<b>Amaliyot.</b> MAKON amaliyoti.', 'Bajaradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['bosh gap', 'mustaqil qism'], ['ergash gap', 'tobe qism'], ['zidlov', 'lekin, ammo'], ['to‘siqsiz', '-sa ham']],
    [['3 tur?', 'bog‘langan, ergash gapli, bog‘lovchisiz'], ['«chunki» — ?', 'sabab ergash gap'], ['«va» oldidan vergul?', 'yo‘q (bir marta)'], ['«-gach» — ?', 'payt']],
    'Darslikdagi mashqlar; «Yomg‘ir yog‘di» va «Biz uyda qoldik» gaplaridan 5 xil qo‘shma gap yasang; badiiy matndan 3 ta qo‘shma gap topib turini aniqlang.',
    O8)
};

/* ================================================================
   12. BOBURNOMA: ANDIJONDAN HINDISTONGACHA — 9-sinf (ot-bobur)
   ================================================================ */
bogla('onatili', 'Boburnoma: Andijondan Hindistongacha', 'ot-bobur', '2D yo‘l xaritasi: Andijon → Samarqand → Kobul → Panipat (1526) → Agra; 10 bosqich');
L['ot-bobur'] = {
  fan:'onatili', qisqaNom:'«Boburnoma»', nom:'«Boburnoma»: Andijondan Hindistongacha (1483–1530)', sinf:'9-sinf',
  qisqa:'9-sinf · Adabiyot · «Boburnoma» · yo‘l xaritasi',
  sahna:'til_ot_bobur',
  kor:{
    sarlavha:'Shoh, shoir va tarixchi — bir shaxs',
    matn:'Zahiriddin Muhammad Bobur (1483-yil 14-fevral, Andijon — 1530-yil 26-dekabr, Agra) — Temuriy shahzoda, Boburiylar davlati asoschisi, shoir va «Boburnoma» muallifi. Sahnada uning yo‘li: Andijon → Samarqand → Toshkent → Kobul → Hirot → Qandahor → Lahor → Panipat → Dehli → Agra. «Keyingi bosqich» tugmasi yo‘lni bosqichma-bosqich chizadi; shaharni <b>bosing</b> — u bilan bog‘liq voqea chiqadi.',
    punktlar:['<b>1483–1494</b> — Andijonda bolalik; 12 yoshida Farg‘ona hukmdori','<b>1497–1501</b> — Samarqand uchun kurash, Shayboniyxondan mag‘lubiyat','<b>1504</b> — Kobul; <b>1526, 21-aprel</b> — Panipat jangi, Boburiylar davlati','<b>«Boburnoma»</b> — eski o‘zbek (chig‘atoy turkiy) tilida yozilgan memuar; 1494–1529-yillar']
  },
  bolimlar:[
    {sarlavha:'Yo‘l bosqichlari', jadval:(SZ.bobur ? SZ.bobur.bosqich : []).map(b=>[b.y, b.s])},
    {sarlavha:'Asarlari', jadval:[['«Boburnoma»', 'memuar-tarixiy asar, eski o‘zbek tilida; 1494–1529-yillar voqealari; fors tiliga 1589-yilda tarjima qilingan'], ['Devon', 'g‘azal, ruboiylar — «Tole’ yo‘q jonimg‘a…» kabi'], ['«Mubayyin»', 'fiqh (shariat qoidalari) haqida she’riy asar (1521)'], ['«Risolai aruz»', 'aruz vazni haqida risola (1523–1525)'], ['«Xatti Boburiy»', 'Bobur ixtiro qilgan yozuv']]},
    {sarlavha:'Panipat jangi — 1526-yil 21-aprel', jadval:[['Tomonlar', 'Bobur — Dehli sultoni Ibrohim Lo‘diy'], ['Qo‘shin', 'Bobur yozishicha, o‘zida 12 ming atrofida, raqibda 100 ming va 1000 fil (raqamlar «Boburnoma»dan, mubolag‘a bo‘lishi mumkin)'], ['Taktika', 'aravalar bilan mustahkamlangan markaz, to‘plar va miltiqlar (tulug‘ma — qanotdan o‘rab olish)'], ['Natija', 'Ibrohim Lo‘diy halok bo‘ldi; Dehli va Agra egallandi']]}
  ],
  bosqichlar:[
    {sarlavha:'Andijon — 1483', matn:'Bobur 1483-yil 14-fevralda Andijonda tug‘ildi. Otasi Umarshayx Mirzo — Farg‘ona hokimi, Amir Temurning evarasi; onasi Qutlug‘ Nigorxonim — Chingiziylar avlodi.', holat:{bosqich:0}},
    {sarlavha:'12 yoshli hukmdor — 1494', matn:'Otasi vafot etgach, 12 yoshida taxtga o‘tirdi. «Boburnoma» shu voqeadan boshlanadi: «Tangri taologa hamd … o‘n ikki yoshta Farg‘ona viloyatida podshoh bo‘ldum».', holat:{bosqich:1}},
    {sarlavha:'Samarqand uchun kurash — 1497–1501', matn:'Buyuk bobosi poytaxtini ikki marta egalladi, ikki marta yo‘qotdi. 1501-yilda Saripul jangida Shayboniyxondan yengilib, Movarounnahrni tark etishga majbur bo‘ldi.', holat:{bosqich:2}},
    {sarlavha:'Kobul — 1504', matn:'Hisor orqali janubga o‘tib, Kobulni egalladi. 20 yildan ortiq Kobul uning poytaxti bo‘ldi; bu yerda bog‘lar yaratdi va she’rlar yozdi.', holat:{bosqich:4}},
    {sarlavha:'Hirot — 1506', matn:'Husayn Boyqaro vafotidan keyin Hirotga bordi. «Boburnoma»da Hirotning go‘zalligi, Navoiy va Behzod davri yodgorliklari tasvirlangan.', holat:{bosqich:5}},
    {sarlavha:'Hindistonga yo‘l — 1522–1524', matn:'Qandahor (1522) va Lahor (1524) egallanib, Hindistonga yo‘l ochildi. Bobur Hindistonga beshta yurish qilganini yozadi.', holat:{bosqich:6}},
    {sarlavha:'Panipat — 1526-yil 21-aprel', matn:'Ibrohim Lo‘diyning ko‘p sonli qo‘shini to‘plar va aravali mudofaa yordamida yengildi. Dehli va Agra egallandi — Boburiylar davlati boshlandi. 1530-yilda Bobur Agrada vafot etdi; vasiyatiga ko‘ra Kobulga dafn etildi.', holat:{bosqich:7}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Bobur yo‘li', holat:{bosqich:0},
    topshiriqlar:[
      {shart:'Xaritada Bobur <b>tug‘ilgan shahar</b>ni bosing.', hodisa:'til-bobur', kod:"ev.nom==='andijon' && ev.bosildi", izoh:'To‘g‘ri — <b>Andijon</b>, 1483-yil 14-fevral.'},
      {shart:'Bobur ikki marta egallab, ikki marta yo‘qotgan shaharni bosing.', hodisa:'til-bobur', kod:"ev.nom==='samarqand' && ev.bosildi", izoh:'To‘g‘ri — <b>Samarqand</b> (1497, 1500–1501).'},
      {shart:'Xronologiyada <b>Kobul egallangan</b> bosqichni bosing.', hodisa:'til-bobur', kod:"ev.nom==='b4' && ev.bosildi", izoh:'To‘g‘ri — <b>1504</b>, Kobul — 20 yildan ortiq poytaxt.'},
      {shart:'1526-yilgi hal qiluvchi jang bo‘lgan joyni xaritada bosing.', hodisa:'til-bobur', kod:"ev.nom==='panipat' && ev.bosildi", izoh:'To‘g‘ri — <b>Panipat</b>, 1526-yil 21-aprel.'},
      {shart:'Bobur vafot etgan shaharni bosing.', hodisa:'til-bobur', kod:"ev.nom==='agra' && ev.bosildi", izoh:'To‘g‘ri — <b>Agra</b>, 1530-yil 26-dekabr.'},
      {shart:'Bobur dafn etilgan shaharni bosing (vasiyatiga ko‘ra).', hodisa:'til-bobur', kod:"ev.nom==='kobul' && ev.bosildi", izoh:'To‘g‘ri — <b>Kobul</b>, Bog‘i Bobur. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Bobur qachon va qayerda tug‘ilgan?', v:['1441, Hirot','1483, Andijon','1483, Samarqand','1494, Kobul'], t:1, izoh:'<b>1483-yil 14-fevral, Andijon</b>.'},
    {s:'Bobur necha yoshida Farg‘ona hukmdori bo‘ldi?', v:['10','12','15','18'], t:1, izoh:'1494-yilda, <b>12 yoshida</b>.'},
    {s:'Bobur 1504-yilda qaysi shaharni egalladi?', v:['Samarqand','Hirot','Kobul','Dehli'], t:2, izoh:'<b>Kobul</b> — 20 yildan ortiq poytaxti.'},
    {s:'Panipat jangi qachon bo‘lgan?', v:['1504','1526','1527','1530'], t:1, izoh:'<b>1526-yil 21-aprel</b>; 1527 — Xonua jangi.'},
    {s:'Panipatda Bobur kimni yengdi?', v:['Shayboniyxon','Ibrohim Lo‘diy','Rano Sango','Husayn Boyqaro'], t:1, izoh:'<b>Ibrohim Lo‘diy</b> — Dehli sultoni. Rano Sango — 1527, Xonua.'},
    {s:'«Boburnoma» qaysi tilda yozilgan?', v:['fors','arab','eski o‘zbek (chig‘atoy turkiy)','hind'], t:2, izoh:'<b>Eski o‘zbek tili</b>da; 1589-yilda fors tiliga tarjima qilingan.'},
    {s:'«Boburnoma» qaysi yillar voqealarini qamrab oladi?', v:['1483–1530','1494–1529','1504–1526','1441–1501'], t:1, izoh:'<b>1494–1529</b> — taxtga o‘tirishdan to umrining oxirigacha (ba’zi yillar tushib qolgan).'},
    {s:'Bobur Samarqandda kimdan yengildi?', v:['Shayboniyxon','Ibrohim Lo‘diy','Husayn Boyqaro','Rano Sango'], t:0, izoh:'<b>Shayboniyxon</b> — 1501, Saripul jangi.'},
    {s:'Bobur qayerda vafot etdi va qayerga dafn etildi?', v:['Agra — Agra','Agra — Kobul','Kobul — Kobul','Dehli — Samarqand'], t:1, izoh:'<b>Agrada</b> vafot etdi (1530), vasiyatiga ko‘ra <b>Kobulga</b> dafn etildi (Bog‘i Bobur).'},
    {s:'Bobur asos solgan davlat?', v:['Shayboniylar','Boburiylar (Buyuk Mo‘g‘ullar)','Temuriylar','Qo‘qon xonligi'], t:1, izoh:'<b>Boburiylar</b> davlati (Yevropa manbalarida «Mughal Empire») — 1526–1857.'},
    T3('Xaritada <b>Andijon</b>ni bosing — Bobur tug‘ilgan shahar.', 'til-bobur', 'nom', ['andijon'], ['Andijon', 'boshqa shahar'], '<b>Andijon</b> — Farg‘ona vodiysi, 1483.')
  ],
  yordamchi:[
    {s:'Nega «Buyuk Mo‘g‘ullar» deyiladi?', j:'Yevropaliklar Boburiylar davlatini «Mughal» (mo‘g‘ul) deb atagan, chunki Bobur ona tomonidan Chingizxon avlodi edi. Bobur o‘zini Temuriy deb bilgan; o‘zbek tarixshunosligida «Boburiylar» atamasi ishlatiladi.', kalit:['mo‘g‘ul','mughal','nega']},
    {s:'Xarita haqiqiy marshrutmi?', j:'Yo‘q, sxematik: shaharlar orasidagi to‘g‘ri chiziqlar bosqichlar tartibini ko‘rsatadi. Haqiqiy yo‘llar tog‘ dovonlari va daryo vodiylari bo‘ylab o‘tgan.', kalit:['xarita','marshrut']},
    {s:'Panipatdagi raqamlar aniqmi?', j:'Raqamlar «Boburnoma»ning o‘zidan (Bobur yozishicha, raqibda 100 ming kishi va 1000 fil). Tarixchilar bu raqamlarni mubolag‘a bo‘lishi mumkin deb hisoblaydi — darsda «Bobur yozishicha» deb beriladi.', kalit:['panipat','raqam','aniq']}
  ],
  maqola:[
    {sarlavha:'Shahzodadan imperatorgacha', xatboshilar:[
      'Zahiriddin Muhammad Bobur 1483-yil 14-fevralda Andijonda tug‘ildi. Otasi Umarshayx Mirzo Farg‘ona hokimi, Amir Temurning evarasi edi. 1494-yilda otasi to‘satdan vafot etgach, 12 yoshli Bobur taxtga o‘tirdi va darhol amakilari hamda qarindoshlari bilan hokimiyat uchun kurashga tortildi.',
      'Yoshligining asosiy orzusi — bobosi poytaxti Samarqandni qaytarish edi. 1497-yilda shaharni egalladi, lekin Andijon qo‘ldan ketgani uchun tashlab chiqdi; 1500-yilda yana egalladi, biroq 1501-yilda Saripul jangida Shayboniyxondan yengildi. Uch yil sarson bo‘lib, 1504-yilda janubga o‘tdi va Kobulni egalladi — bu uning yangi davlatining poytaxti bo‘ldi.',
      '1519-yildan Hindistonga yurishlar boshlandi. 1526-yil 21-aprelda Panipatda Dehli sultoni Ibrohim Lo‘diyni yengib, Dehli va Agrani egalladi; 1527-yil 17-martda Xonuada rajputlar ittifoqini mag‘lub etdi. Shu tariqa Boburiylar davlatiga asos solindi — u 1857-yilgacha mavjud bo‘ldi. Bobur 1530-yil 26-dekabrda Agrada vafot etdi; keyinroq vasiyatiga ko‘ra Kobuldagi sevimli bog‘iga dafn etildi.'
    ]},
    {sarlavha:'«Boburnoma» — asar va manba', xatboshilar:[
      '«Boburnoma» (yoki «Vaqoye») — Boburning eski o‘zbek tilida yozgan memuari. U 1494-yildan 1529-yilgacha bo‘lgan voqealarni o‘z ichiga oladi (ba’zi yillar bayoni saqlanmagan). Asar uch qismga bo‘linadi: Farg‘ona va Movarounnahr, Kobul, Hindiston davrlari.',
      'Asar faqat tarixiy xronika emas: unda shaharlar, tabiat, o‘simlik va hayvonot dunyosi, urf-odatlar, odamlarning fe’l-atvori aniq va samimiy tasvirlangan. Bobur o‘z xatolarini ham yashirmaydi — shuning uchun asar dunyo adabiyotida eng halol avtobiografiyalardan biri sanaladi.',
      '«Boburnoma» 1589-yilda Abdurahim xoni xonon tomonidan fors tiliga, XIX–XX asrlarda ingliz (Leyden–Erskin 1826, Beverij 1922, Takston 1996), fransuz, nemis, rus va boshqa tillarga tarjima qilingan. Bugun u Markaziy Osiyo va Hindiston tarixi bo‘yicha asosiy manbalardan biri.'
    ]},
    {sarlavha:'Bobur — shoir va olim', xatboshilar:[
      'Bobur o‘zbek mumtoz she’riyatida Navoiydan keyingi eng yirik lirik shoirlardan biri. Uning g‘azal va ruboiylari sodda, samimiy tili, vatan sog‘inchi va taqdir haqidagi o‘ylari bilan ajralib turadi: «Tole’ yo‘q jonimg‘a, jismimg‘a sihat…» kabi misralar keng mashhur.',
      'U «Mubayyin» (1521) nomli she’riy fiqh asari, «Risolai aruz» (1523–1525) she’r vazni risolasi va «Xatti Boburiy» deb atalgan yangi yozuvni yaratgan. Tarix, geografiya, botanika, musiqa haqida ham bilimdon bo‘lgan.',
      'Andijonda Bobur nomidagi bog‘ va yodgorlik majmuasi, Toshkentda Bobur ko‘chasi bor; 1993-yildan Bobur xalqaro jamoat fondi uning merosini o‘rganadi. «Boburnoma» o‘zbek maktab dasturida 9-sinfda o‘rganiladi.'
    ]}
  ],
  formulalar:[
    ['1483 → 1494 → 1504 → 1526 → 1530', 'Tug‘ilish → taxt → Kobul → Panipat → vafot'],
    ['Andijon → Samarqand → Kobul → Panipat → Agra', 'Yo‘lning asosiy nuqtalari'],
    ['«Boburnoma»: 1494–1529', 'Memuar qamrab olgan davr'],
    ['Panipat (1526) + Xonua (1527)', 'Boburiylar davlatini mustahkamlagan ikki jang']
  ],
  qiziqarli:[
    'Bobur 12 yoshida hukmdor bo‘lgan — dunyo tarixidagi eng yosh hukmdorlardan biri.',
    '«Boburnoma»da Hindistonning 30 dan ortiq o‘simlik va hayvoni tasvirlangan — Bobur tabiatshunos sifatida ham qiziqarli.',
    'Bobur nomi «yo‘lbars» ma’nosini beradi (forscha «babr»).',
    'Boburning nabirasi Akbar (1556–1605) Boburiylar davlatini eng qudratli davriga olib chiqdi; Tojmahalni esa chevarasi Shoh Jahon qurdirgan (1632–1653).'
  ],
  lugat:[['memuar', 'muallifning o‘z hayoti haqidagi xotira asari'], ['Temuriylar', 'Amir Temur avlodlari'], ['Boburiylar', 'Bobur asos solgan sulola (1526–1857)'], ['Shayboniylar', 'Movarounnahrni egallagan o‘zbek sulolasi'], ['Panipat', 'Dehli yaqinidagi jang maydoni'], ['sulton', 'musulmon hukmdori unvoni'], ['g‘azal', 'lirik she’r janri'], ['ruboiy', 'to‘rt misrali she’r'], ['aruz', 'she’r vazni tizimi'], ['Bog‘i Bobur', 'Kobuldagi Bobur maqbarasi joylashgan bog‘'], ['vasiyat', 'o‘limdan oldingi so‘nggi xohish']],
  manba:A9 + '; ' + MW + ' «Babur», «Baburnama», «First Battle of Panipat», «Battle of Khanwa»; Hektoen International «Babur, the first Mughal emperor»; muslim.uz, orexca.com «Zahiriddin Muhammad Babur». Panipat jangidagi raqamlar — «Boburnoma» ma’lumoti, mubolag‘a ehtimoli bor (taxminiy). Xarita sxematik.',
  ishlanma:ish('9-sinf', 'Yangi bilim berish', 'Interaktiv yo‘l xaritasi, «Boburnoma»dan parcha o‘qish, xronologik jadval',
    ['Bobur hayoti va faoliyatining asosiy bosqichlari, «Boburnoma»ning janri va ahamiyatini o‘rgatish.', 'Irodalilik, halollik, vatan sog‘inchi va ilmga intilish qadriyatlarini tarbiyalash.', 'Xarita va xronologiya bilan ishlash, tarixiy manbani tahlil qilish ko‘nikmasini rivojlantirish.'],
    ['Bobur yo‘lining 8–10 bosqichini sanalari bilan aytadi', '«Boburnoma»ning janri, tili va tarjimalarini biladi', 'Panipat jangining ahamiyatini tushuntiradi', 'Asardan parchani tahlil qiladi'],
    ['MAKON sahnasi «Boburnoma yo‘li»', '«Boburnoma» nashri, Bobur portreti', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Motivatsiya.</b> «12 yoshda podshoh bo‘lsangiz nima qilardingiz?»', 'Fikr aytadi.'], ['8–22', '<b>Yo‘l xaritasi.</b> MAKON da 10 bosqich: Andijon → Agra; har shahar voqeasi.', 'Xronologik jadval tuzadi.'], ['22–30', '<b>«Boburnoma»dan parcha.</b> Andijon yoki Samarqand tasviri o‘qiladi va tahlil qilinadi.', 'O‘qiydi, tahlil qiladi.'], ['30–37', '<b>Amaliyot.</b> MAKON amaliyoti.', 'Bajaradi.'], ['37–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['memuar', 'xotira asari'], ['Boburiylar', 'Bobur sulolasi'], ['Panipat', '1526 jangi'], ['Bog‘i Bobur', 'Kobuldagi maqbara']],
    [['Bobur qachon tug‘ilgan?', '1483, Andijon'], ['Panipat jangi?', '1526-yil 21-aprel'], ['«Boburnoma» tili?', 'eski o‘zbek'], ['Qayerga dafn etilgan?', 'Kobul']],
    'Darslikdagi mavzuni o‘qish; «Boburnoma»dan Andijon tasviri parchasini o‘qib, 5 ta faktni yozing; Bobur yo‘lining xronologik jadvalini tuzing (10 sana).',
    A9)
};

/* ================================================================
   13. ABDULLA QODIRIY, «O‘TKAN KUNLAR» — 10-sinf (ot-qodiriy)
   ================================================================ */
bogla('onatili', 'Abdulla Qodiriy, «O‘tkan kunlar»', 'ot-qodiriy', 'Qahramonlar munosabati sxemasi; XIX asr Toshkent (1865) konteksti; roman 1922–1926');
L['ot-qodiriy'] = {
  fan:'onatili', qisqaNom:'«O‘tkan kunlar»', nom:'Abdulla Qodiriy va «O‘tkan kunlar» — birinchi o‘zbek romani', sinf:'10-sinf',
  qisqa:'10-sinf · Adabiyot · «O‘tkan kunlar» · qahramonlar sxemasi',
  sahna:'til_ot_qodiriy',
  kor:{
    sarlavha:'«O‘tkan kunlar» — o‘zbek romanchiligining boshlanishi',
    matn:'Abdulla Qodiriy (1894–1938) — birinchi o‘zbek romani «O‘tkan kunlar» muallifi. Roman 1919–1920-yillarda yozilgan, 1922–1925-yillarda «Inqilob» jurnalida bosilgan, 1926-yilda kitob bo‘lib chiqqan. Voqealar XIX asr o‘rtalari — Qo‘qon xonligi davridagi Toshkent va Marg‘ilonda, ruslar bosqinidan (1865) oldingi «o‘tkan kunlar»da kechadi. Sahnada qahramonlar munosabati sxemasi: qahramonni <b>bosing</b> — uning aloqalari ajralib chiqadi. Pastda tarixiy kontekst tasmasi.',
    punktlar:['<b>Otabek va Kumush</b> — muhabbat chizig‘i; Yusufbek hoji, O‘zbek oyim — ota-ona; Mirzakarim qutidor — Kumushning otasi','<b>Homid</b> — tuhmat va fitna; <b>Zaynab</b> — majburiy nikoh va rashk; <b>Hasanali</b> — sadoqat','<b>Tarixiy fon:</b> Azizbek isyoni, qipchoq–qorachopon nizosi, Musulmonqul; Toshkentning 1865-yilda Rossiya tomonidan bosib olinishi','<b>Taqdir:</b> Qodiriy 1938-yilda qatag‘on qurboni bo‘ldi, 1956-yilda oqlandi']
  },
  bolimlar:[
    {sarlavha:'Qahramonlar', jadval:(SZ.qodiriy ? Object.keys(SZ.qodiriy.qahramon).map(k=>[SZ.qodiriy.qahramon[k].nom, SZ.qodiriy.qahramon[k].kim]) : [])},
    {sarlavha:'Tarixiy kontekst va roman taqdiri', jadval:(SZ.qodiriy ? SZ.qodiriy.tarix : []).map(t=>[t.y, t.s])},
    {sarlavha:'Qodiriyning asarlari', jadval:[['«Juvonboz», «Baxtsiz kuyov»', '1915 — ilk hikoya va drama'], ['«O‘tkan kunlar»', '1922–1925 jurnalda, 1926 kitob — birinchi o‘zbek romani'], ['«Mehrobdan chayon»', '1929 (manbalarda 1928 ham) — Qo‘qon xoni Xudoyorxon davri'], ['«Obid ketmon»', '1935 — qissa'], ['Hajviy asarlar', '«Mushtum» jurnalida «Julqunboy» taxallusi bilan']]}
  ],
  bosqichlar:[
    {sarlavha:'Otabek — bosh qahramon', matn:'Toshkentlik savdogar yigit, Yusufbek hojining o‘g‘li. Ma’rifatli, adolatli; Marg‘ilonga savdo bilan borib, Kumushni uchratadi. Sxemada uning barcha aloqalarini ko‘ring.', holat:{qahramon:'otabek'}},
    {sarlavha:'Kumush — romanning go‘zal obrazi', matn:'Mirzakarim qutidorning qizi. Otabek bilan muhabbat va nikoh; Homid fitnasi va Zaynab rashki uning fojiali taqdirini belgilaydi.', holat:{qahramon:'kumush'}},
    {sarlavha:'Ota-onalar: Yusufbek hoji va O‘zbek oyim', matn:'Yusufbek hoji — Toshkentning obro‘li kishisi, xalq tinchligi uchun kurashuvchi; O‘zbek oyim — o‘g‘lini toshkentlik qizga uylantirishni talab qiladi — Zaynab shundan paydo bo‘ladi.', holat:{qahramon:'yusufbek'}},
    {sarlavha:'Homid — fitna chizig‘i', matn:'Kumushga uylanmoqchi bo‘lgan Homid Otabek va qutidorga tuhmat uyushtiradi (soxta xat), Sodiq va Jannat bilan birga Kumushni o‘g‘irlashga urinadi; oxirida Otabek qo‘lida halok bo‘ladi.', holat:{qahramon:'homid'}},
    {sarlavha:'Zaynab — majburiy nikoh fojiasi', matn:'Ona talabi bilan Otabekka uzatilgan Zaynab sevilmaydi; rashk uni Kumushni zaharlashga olib keladi. Roman bu bilan ko‘pxotinlilik va majburiy nikohni qoralaydi.', holat:{qahramon:'zaynab'}},
    {sarlavha:'Tarixiy fon: 1847–1853', matn:'Roman «1264-yil hijriy» (taxminan 1847) bilan boshlanadi: Toshkent hokimi Azizbekning Qo‘qonga qarshi isyoni, qipchoq–qorachopon nizosi, Musulmonqul hukmronligi. Yusufbek hoji bu nizolarga qarshi turadi.', holat:{tarix:0, rejim:'tarix'}},
    {sarlavha:'1865 va roman taqdiri', matn:'1865-yilda Toshkent Rossiya imperiyasi tomonidan bosib olindi — roman nomi shu bosqindan oldingi davrga ishora. Roman 1926-yilda kitob bo‘ldi; muallif 1938-yilda otib tashlandi, 1956-yilda oqlandi.', holat:{tarix:2}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Qahramonlar va tarix', holat:{hamma:true},
    topshiriqlar:[
      {shart:'Sxemada <b>Otabekning sevgilisi va xotini</b>ni bosing.', hodisa:'til-qahramon', kod:"ev.nom==='kumush' && ev.bosildi", izoh:'To‘g‘ri — <b>Kumush</b>, Mirzakarim qutidorning qizi.'},
      {shart:'Otabekka <b>tuhmat uyushtirgan</b> qahramonni bosing.', hodisa:'til-qahramon', kod:"ev.nom==='homid' && ev.bosildi", izoh:'To‘g‘ri — <b>Homid</b>: soxta xat, fitna.'},
      {shart:'<b>Kumushni zaharlagan</b> qahramonni bosing.', hodisa:'til-qahramon', kod:"ev.nom==='zaynab' && ev.bosildi", izoh:'To‘g‘ri — <b>Zaynab</b>, Otabekning ikkinchi (majburiy) xotini.'},
      {shart:'Yusufbek hojining <b>sodiq xizmatkori</b>ni bosing.', hodisa:'til-qahramon', kod:"ev.nom==='hasanali' && ev.bosildi", izoh:'To‘g‘ri — <b>Hasanali</b>.'},
      {shart:'Kumushning <b>otasi</b>ni bosing.', hodisa:'til-qahramon', kod:"ev.nom==='qutidor' && ev.bosildi", izoh:'To‘g‘ri — <b>Mirzakarim qutidor</b>, marg‘ilonlik savdogar.'},
      {shart:'Tarix tasmasida <b>Toshkent Rossiya tomonidan bosib olingan</b> yilni bosing.', hodisa:'til-qodiriy-tarix', kod:"ev.yil==='1865' && ev.bosildi", izoh:'To‘g‘ri — <b>1865</b>, general Chernyayev. Amaliyot tugadi!'}
    ]},
  test:[
    {s:'Abdulla Qodiriy qachon va qayerda tug‘ilgan?', v:['1894, Toshkent','1883, Andijon','1894, Marg‘ilon','1938, Toshkent'], t:0, izoh:'<b>1894-yil 10-aprel, Toshkent</b>.'},
    {s:'«O‘tkan kunlar» alohida kitob bo‘lib qachon chiqqan?', v:['1919','1922','1926','1938'], t:2, izoh:'<b>1926</b>; 1922–1925 — «Inqilob» jurnalida.'},
    {s:'Romanning bosh qahramoni?', v:['Homid','Otabek','Yusufbek hoji','Hasanali'], t:1, izoh:'<b>Otabek</b> — toshkentlik savdogar yigit.'},
    {s:'Kumushning otasi kim?', v:['Yusufbek hoji','Mirzakarim qutidor','Azizbek','Musulmonqul'], t:1, izoh:'<b>Mirzakarim qutidor</b> — marg‘ilonlik savdogar.'},
    {s:'Kumushni kim zaharlaydi?', v:['Homid','Zaynab','Jannat','O‘zbek oyim'], t:1, izoh:'<b>Zaynab</b> — rashk tufayli.'},
    {s:'Roman voqealari qaysi davrda kechadi?', v:['XV asr, Temuriylar','XIX asr o‘rtalari, Qo‘qon xonligi','1917-yildan keyin','XVIII asr'], t:1, izoh:'<b>XIX asr o‘rtalari</b> (taxminan 1847-yildan), Qo‘qon xonligi davri, ruslar bosqinidan oldin.'},
    {s:'Toshkent Rossiya imperiyasi tomonidan qachon bosib olingan?', v:['1847','1853','1865','1876'], t:2, izoh:'<b>1865-yil iyun</b> — Chernyayev qo‘shini.'},
    {s:'«O‘tkan kunlar» o‘zbek adabiyotida …', v:['birinchi doston','birinchi roman','birinchi drama','birinchi she’riy to‘plam'], t:1, izoh:'<b>Birinchi o‘zbek romani</b>.'},
    {s:'Qodiriyning hajviy taxallusi?', v:['Navoiy','Julqunboy','Foniy','Mushtum'], t:1, izoh:'<b>Julqunboy</b> — «Mushtum» jurnalidagi hajviy asarlarida.'},
    {s:'Qodiriy qachon qatag‘on qurboni bo‘ldi va qachon oqlandi?', v:['1938 — 1956','1926 — 1938','1937 — 1991','1930 — 1950'], t:0, izoh:'<b>1938-yil 4-oktabrda otilgan, 1956-yilda oqlangan</b>.'},
    T3('Sxemada <b>Otabekning otasi</b>ni bosing.', 'til-qahramon', 'nom', ['yusufbek'], ['Yusufbek hoji', 'boshqa qahramon'], '<b>Yusufbek hoji</b> — Toshkentning obro‘li kishisi, Otabekning otasi.')
  ],
  yordamchi:[
    {s:'Roman nomi nimani anglatadi?', j:'«O‘tkan kunlar» — o‘tib ketgan kunlar: Qodiriy ruslar bosqinidan oldingi Toshkent va Marg‘ilon hayotini, uning yorug‘ va qorong‘u tomonlarini tasvirlaydi. Muallif muqaddimada «tarixning eng kirlik, qora kunlari» deb ham yozadi — o‘zaro nizolar davri.', kalit:['nom','o‘tkan kunlar','ma’no']},
    {s:'Azizbek va Musulmonqul haqiqiy shaxslarmi?', j:'Ha, tarixiy shaxslar: Azizbek — 1840-yillarda Toshkent hokimi, Qo‘qonga qarshi isyon ko‘targan; Musulmonqul — Qo‘qon xonligi mingboshisi, qipchoqlar yetakchisi. Romanda ular badiiy talqin qilingan; sanalar manbalarda taxminiy.', kalit:['azizbek','musulmonqul','tarixiy']},
    {s:'Roman tarjima qilinganmi?', j:'Ha: rus, ingliz (Mark Riz, 2019), nemis, turk va boshqa tillarga. Ingliz tilida «Bygone Days» nomi bilan chiqqan.', kalit:['tarjima','ingliz']}
  ],
  maqola:[
    {sarlavha:'Abdulla Qodiriy — hayoti va taqdiri', xatboshilar:[
      'Abdulla Qodiriy 1894-yil 10-aprelda Toshkentda bog‘bon oilasida tug‘ildi. Eski maktab, rus-tuzem maktabi va madrasada o‘qidi; 1915-yildan hikoya («Juvonboz») va drama («Baxtsiz kuyov») bilan adabiyotga kirib keldi. 1920-yillarda «Mushtum» hajviy jurnalida «Julqunboy» taxallusi bilan o‘tkir felyetonlar yozdi.',
      '1919–1920-yillarda u «O‘tkan kunlar» romanini yozdi — bu o‘zbek adabiyotidagi birinchi roman edi. Asar 1922–1925-yillarda «Inqilob» jurnalida, 1926-yilda alohida kitob holida chiqdi va darhol mashhur bo‘ldi. Keyin «Mehrobdan chayon» (1929) va «Obid ketmon» (1935) yaratildi.',
      '1937-yil oxirida Qodiriy «xalq dushmani» sifatida qamoqqa olindi va 1938-yil 4-oktabrda otib tashlandi. 1956-yilda oqlandi. Bugun Toshkentda uning nomidagi bog‘, uy-muzey bor; 1994-yilda «Alisher Navoiy nomidagi O‘zbekiston Respublikasi Davlat mukofoti» berilgan.'
    ]},
    {sarlavha:'Romanning syujeti va obrazlar tizimi', xatboshilar:[
      'Voqea XIX asr o‘rtalarida boshlanadi: toshkentlik savdogar yigit Otabek Marg‘ilonga borib, qutidor Mirzakarimning qizi Kumushga oshiq bo‘ladi va unga uylanadi. Kumushga ko‘z olaytirgan Homid soxta xat orqali Otabek va qutidorni Toshkent hokimi Azizbekning josuslari deb tuhmat qiladi; ular o‘limdan Yusufbek hojining aralashuvi bilan qutuladi.',
      'Otabekning onasi O‘zbek oyim o‘g‘lini toshkentlik Zaynabga uylantiradi — majburiy ikkinchi nikoh. Homid Kumushni o‘g‘irlashga urinadi va Otabek qo‘lida halok bo‘ladi. Oxirida Kumush Otabekning yonida Toshkentda yashaydi, lekin rashkdan kuygan Zaynab uni zaharlaydi. Otabek yurtini tark etib, keyin jangda halok bo‘ladi.',
      'Obrazlar tizimida ikki qutb bor: ma’rifat, adolat va sadoqat (Otabek, Kumush, Yusufbek hoji, Hasanali) hamda jaholat, fitna, rashk (Homid, Sodiq, Jannat; Zaynab — qurbon va aybdor). Muallif Yusufbek hoji orqali o‘zaro nizolar (qipchoq–qorachopon) va jaholat xalqni zaiflashtirib, bosqinga yo‘l ochganini ko‘rsatadi.'
    ]},
    {sarlavha:'Tarixiy kontekst: Qo‘qon xonligi va 1865', xatboshilar:[
      'Roman «1264-yil hijriy, dalv oyining o‘n yettinchisi» bilan boshlanadi — bu taxminan 1847-yilga to‘g‘ri keladi. Toshkent o‘sha davrda Qo‘qon xonligi tarkibida edi; hokim Azizbek Qo‘qonga qarshi isyon ko‘tardi. Xonlikda o‘troq aholi («qorachopon») bilan ko‘chmanchi qipchoqlar o‘rtasida nizo kuchaygan; qipchoqlar yetakchisi Musulmonqul hokimiyatni qo‘lga olgan, 1852-yilda qipchoqlar qirg‘ini, 1853-yilda Musulmonqulning qatli yuz bergan (sanalar tarixiy adabiyotda shunday ko‘rsatiladi).',
      'Ichki nizolar xonlikni zaiflashtirdi. 1865-yil iyunida general Chernyayev qo‘mondonligidagi Rossiya qo‘shini Toshkentni bosib oldi (manbalarda 15-iyun yoki 28–29-iyun — eski va yangi uslub farqi), 1867-yilda Turkiston general-gubernatorligi tuzildi. Roman nomi — «O‘tkan kunlar» — aynan shu bosqindan oldingi davrga ishora.',
      'Qodiriy tarixiy voqealarni badiiy talqin qiladi: Azizbek, Musulmonqul — real shaxslar, Otabek va Kumush — to‘qima qahramonlar. Shu tufayli asar tarixiy roman janrining o‘zbek adabiyotidagi birinchi namunasi sanaladi.'
    ]}
  ],
  formulalar:[
    ['1894 — 1938 (1956 oqlangan)', 'Qodiriy hayoti va oqlanishi'],
    ['1919–1920 yozildi → 1922–1925 jurnal → 1926 kitob', '«O‘tkan kunlar» taqdiri'],
    ['≈1847 (hijriy 1264) → 1865', 'Roman voqealari davri → Toshkent bosqini'],
    ['Otabek — Kumush — Zaynab — Homid', 'Asosiy konflikt uchburchagi + fitna']
  ],
  qiziqarli:[
    '«O‘tkan kunlar» muallif tirikligida uch marta nashr etilgan; 1926-yilgi birinchi kitob nusxalari bugun bibliografik noyoblik.',
    'Roman ingliz tiliga 2019-yilda Mark Riz tomonidan «Bygone Days» nomi bilan tarjima qilingan.',
    'Qodiriy «Mushtum» jurnalida «Julqunboy» taxallusi bilan yozgan — bu taxallus «yoqasi yulingan bola» ma’nosida hazil edi.',
    'Toshkent 1865-yildan Turkiston o‘lkasining markazi bo‘ldi; 1867-yilda Turkiston general-gubernatorligi tuzildi.'
  ],
  lugat:[['roman', 'yirik nasriy janr — ko‘p qahramonli, keng voqeali asar'], ['tarixiy roman', 'tarixiy davr va shaxslarni badiiy tasvirlovchi roman'], ['syujet', 'voqealar rivoji'], ['obraz', 'badiiy qahramon'], ['konflikt', 'asardagi to‘qnashuv, ziddiyat'], ['qutidor', 'Qo‘qon xonligida xazina qutisini saqlovchi amaldor unvoni; keyin badavlat savdogarlarga ham aytilgan — Kumushning otasi Mirzakarim qutidor'], ['qipchoq–qorachopon', 'ko‘chmanchi va o‘troq aholi o‘rtasidagi nizo'], ['mingboshi', 'Qo‘qon xonligida yuqori lavozim'], ['hijriy', 'islom taqvimi (622-yildan)'], ['qatag‘on', '1937–1938-yillardagi siyosiy ta’qib'], ['felyeton', 'hajviy maqola']],
  manba:A10 + '; ' + MW + ' «O‘tkan kunlar», «Abdulla Qodiriy», «Russian conquest of Central Asia»; ziyouz.uz «Abdulla Qodiriy (1894–1938)»; gov.uz (CIRNS) «Remembering Qodiriy»; AramcoWorld «O‘tkan Kunlar: Bygone Days» (2021). Romanning jurnalda chiqish yillari manbalarda 1922–1925 / 1924–1926 deb ko‘rsatiladi; Toshkent bosqini sanasi — 15 yoki 28–29-iyun (eski/yangi uslub); 1852–1853 sanalar — taxminiy.',
  ishlanma:ish('10-sinf', 'Yangi bilim berish', 'Interaktiv obrazlar sxemasi, matn tahlili, munozara',
    ['Qodiriy hayoti, «O‘tkan kunlar» syujeti, obrazlar tizimi va tarixiy kontekstini o‘rgatish.', 'Adolat, sadoqat, ma’rifat qadriyatlarini; jaholat va fitnaga nafratni tarbiyalash.', 'Badiiy asarni tahlil qilish, obrazlar munosabatini sxemalash, tarix va adabiyotni bog‘lash ko‘nikmasini rivojlantirish.'],
    ['Qodiriy hayotining asosiy sanalarini aytadi', 'Romanning 12 qahramonini va ularning munosabatini sxemada ko‘rsatadi', 'Roman voqealarini tarixiy davr (1847–1865) bilan bog‘laydi', 'Asarning g‘oyasi va janr xususiyatini tushuntiradi'],
    ['MAKON sahnasi «O‘tkan kunlar»', 'Roman matni, Qodiriy portreti', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Motivatsiya.</b> «Nega roman «O‘tkan kunlar» deb nomlangan?»', 'Taxmin aytadi.'], ['8–18', '<b>Muallif va tarix.</b> MAKON tarix tasmasi: 1847 → 1865 → 1894 → 1926 → 1938.', 'Sanalarni yozadi.'], ['18–30', '<b>Obrazlar.</b> Sxemada qahramonlar va aloqalar; ikki qutb.', 'Sxema chizadi.'], ['30–37', '<b>Amaliyot.</b> MAKON amaliyoti; parcha tahlili.', 'Bajaradi.'], ['37–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['roman', 'yirik nasriy janr'], ['qutidor', 'xazina qutisi saqlovchisi unvoni; badavlat savdogar'], ['qatag‘on', 'siyosiy ta’qib'], ['konflikt', 'ziddiyat']],
    [['Qodiriy qachon tug‘ilgan?', '1894, Toshkent'], ['Roman kitob bo‘lgan yil?', '1926'], ['Kumushni kim zaharlaydi?', 'Zaynab'], ['Toshkent bosqini?', '1865']],
    'Romandan Otabek va Kumush uchrashuvi bobini o‘qing; 12 qahramon haqida 1–2 gapli tavsif yozing; «Yusufbek hoji — xalq tinchligi kurashchisi» mavzusida kichik insho.',
    A10)
};

/* ================================================================
   14. NUTQ USLUBLARI — 11-sinf (ot-uslub)
   ================================================================ */
bogla('onatili', 'Nutq uslublari', 'ot-uslub', '5 uslub: badiiy, ilmiy, rasmiy, publitsistik, so‘zlashuv — matn namunalari va «uslubni aniqla»');
L['ot-uslub'] = {
  fan:'onatili', qisqaNom:'Nutq uslublari', nom:'Nutq uslublari: badiiy, ilmiy, rasmiy, publitsistik, so‘zlashuv', sinf:'11-sinf',
  qisqa:'11-sinf · Ona tili · «Nutq uslublari» · matnni aniqlash',
  sahna:'til_ot_uslub',
  kor:{
    sarlavha:'Bir fikr — besh xil uslub',
    matn:'Sahnada beshta uslub kartasi, har birida matn namunasi (o‘quv maqsadida yozilgan). Kartani <b>bosing</b> — uslubga xos so‘z va iboralar matnda belgilanadi, belgilari va qo‘llanish sohasi ko‘rsatiladi. Badiiy uslub obraz va his bilan, ilmiy — atama va aniqlik bilan, rasmiy — qolip iboralar bilan, publitsistik — murojaat va dolzarblik bilan, so‘zlashuv — qisqa, erkin gaplar bilan ajralib turadi.',
    punktlar:['<b>Uslub</b> — nutqning muloqot sohasi va maqsadiga mos ko‘rinishi','<b>Badiiy:</b> obrazlilik, tasviriy vositalar; <b>ilmiy:</b> atama, mantiq, aniqlik','<b>Rasmiy:</b> hujjat qolipi, shaxssizlik; <b>publitsistik:</b> ijtimoiy mavzu, ta’sir, murojaat','<b>So‘zlashuv:</b> oddiy, qisqa, to‘liqsiz gaplar, sheva, undov']
  },
  bolimlar:[
    {sarlavha:'Uslublar va belgilari', jadval:Object.keys(SZ.uslub || {}).map(k=>[SZ.uslub[k].nom + ' (' + SZ.uslub[k].joy + ')', SZ.uslub[k].belgi.join('; ')])},
    {sarlavha:'Bir mazmun — turli uslubda', jadval:[['So‘zlashuv', 'Ertaga yomg‘ir yog‘armish, soyabon olvol.'], ['Ilmiy', 'Ertaga hududda atmosfera yog‘inlari kutilmoqda, ehtimollik 80 %.'], ['Rasmiy', 'Ob-havo sharoiti munosabati bilan tadbir 20-oktabrga ko‘chirilsin.'], ['Publitsistik', 'Yomg‘ir — ne’mat, lekin ko‘chalarimiz unga tayyormi?'], ['Badiiy', 'Osmon kulrang ko‘rpasini yopinib, shaharga sekin yig‘lay boshladi.']]},
    {sarlavha:'Til vositalari', jadval:[['Lug‘at', 'badiiy — sinonim, o‘xshatish; ilmiy — atama; rasmiy — qolip; so‘zlashuv — sheva, undov'], ['Gap tuzilishi', 'ilmiy va rasmiy — murakkab, to‘liq; so‘zlashuv — qisqa, to‘liqsiz'], ['Shaxs', 'badiiy — muallif «men»i; ilmiy va rasmiy — shaxssiz («aniqlandi», «tasdiqlansin»)']]}
  ],
  bosqichlar:[
    {sarlavha:'Badiiy uslub', matn:'Maqsad — ta’sirchan tasvir. Vositalar: o‘xshatish («go‘yo uyg‘ongan boladek»), sifatlash («oltin nurlar»), jonlantirish («daryo yugurib ketdi»). She’r, hikoya, roman tili.', holat:{uslub:'badiiy'}},
    {sarlavha:'Ilmiy uslub', matn:'Maqsad — aniq bilim berish. Atamalar (fotosintez, xloroplast), ta’rif, mantiqiy izchillik, his-tuyg‘u yo‘q. Darslik, maqola, ma’ruza tili.', holat:{uslub:'ilmiy'}},
    {sarlavha:'Rasmiy uslub', matn:'Maqsad — hujjat. Qolip iboralar («so‘rayman», «tasdiqlansin»), sana, imzo, bir ma’nolilik, shaxsiy munosabat yo‘q. Ariza, buyruq, shartnoma, qonun.', holat:{uslub:'rasmiy'}},
    {sarlavha:'Publitsistik uslub', matn:'Maqsad — jamoatchilikka ta’sir. Murojaat («Aziz yurtdoshlar!»), ritorik savol, dolzarb mavzu; ilmiy va badiiy vositalar aralash. Gazeta, nutq, reportaj.', holat:{uslub:'publitsistik'}},
    {sarlavha:'So‘zlashuv uslubi', matn:'Kundalik muloqot: qisqa, to‘liqsiz gaplar («Mayli, beshlarda»), undovlar, sheva, takror; ohang va imo-ishora yordam beradi.', holat:{uslub:'sozlashuv'}},
    {sarlavha:'Taqqoslash', matn:'Bir mazmun («ertaga yomg‘ir») besh uslubda qanday aytiladi — «Qo‘shimcha» bo‘limidagi jadvalga qarang. Uslub so‘z tanlovi, gap tuzilishi va shaxs ifodasida farq qiladi.', holat:{hamma:true}},
    {sarlavha:'Uslubni aniqlash', matn:'Noma’lum matnni o‘qib, uslubini belgilar bo‘yicha aniqlang: atama bormi? murojaat bormi? qolip iboralar bormi? obraz bormi? Amaliyotda 6 ta matn beriladi.', holat:{matn:0}}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Uslubni aniqla',
    topshiriqlar:[
      {shart:'Matnni o‘qing. Bu qaysi uslub?', holat:{matn:0}, v:['Badiiy','Ilmiy','Rasmiy','So‘zlashuv'], t:1, izoh:'Atamalar (vodorod, kislorod, atmosfera bosimi), aniq raqam — <b>ilmiy</b> uslub.'},
      {shart:'Bu qaysi uslub?', holat:{matn:1}, v:['Rasmiy','Ilmiy','So‘zlashuv','Publitsistik'], t:2, izoh:'Dialog, qisqa to‘liqsiz gaplar, «Bor, bor» takrori — <b>so‘zlashuv</b> uslubi.'},
      {shart:'Bu qaysi uslub?', holat:{matn:2}, v:['Badiiy','Rasmiy','Ilmiy','Publitsistik'], t:0, izoh:'O‘xshatish («momiqdek»), jonlantirish — <b>badiiy</b> uslub.'},
      {shart:'Bu qaysi uslub?', holat:{matn:3}, v:['Ilmiy','So‘zlashuv','Publitsistik','Rasmiy'], t:2, izoh:'Murojaat («Hurmatli ota-onalar!»), ijtimoiy mavzu, ta’sir — <b>publitsistik</b> uslub.'},
      {shart:'Bu qaysi uslub?', holat:{matn:4}, v:['Rasmiy','Badiiy','So‘zlashuv','Ilmiy'], t:0, izoh:'Buyruq raqami, sana, «o‘tkazilsin», «Mas’ul» — <b>rasmiy</b> uslub.'},
      {shart:'Bu qaysi uslub?', holat:{matn:5}, v:['Publitsistik','Ilmiy','Badiiy','So‘zlashuv'], t:1, izoh:'Ta’rif, atamalar (magnituda, Rixter shkalasi) — <b>ilmiy</b> uslub.'}
    ]},
  test:[
    {s:'Nutq uslublari nechta?', v:['3','4','5','7'], t:2, izoh:'<b>5 ta</b>: badiiy, ilmiy, rasmiy, publitsistik, so‘zlashuv.'},
    {s:'Atamalar va aniqlik qaysi uslubga xos?', v:['badiiy','ilmiy','so‘zlashuv','publitsistik'], t:1, izoh:'<b>Ilmiy</b> uslub — atama, ta’rif, mantiq.'},
    {s:'Ariza qaysi uslubda yoziladi?', v:['rasmiy','badiiy','publitsistik','ilmiy'], t:0, izoh:'<b>Rasmiy</b> (rasmiy-idoraviy) uslub — hujjatlar.'},
    {s:'«Aziz yurtdoshlar!» murojaati qaysi uslubga xos?', v:['ilmiy','rasmiy','publitsistik','so‘zlashuv'], t:2, izoh:'<b>Publitsistik</b> — jamoatchilikka murojaat, ta’sir.'},
    {s:'O‘xshatish va jonlantirish qaysi uslubning asosiy vositasi?', v:['badiiy','ilmiy','rasmiy','so‘zlashuv'], t:0, izoh:'<b>Badiiy</b> uslub — obrazlilik.'},
    {s:'To‘liqsiz gaplar, undov va sheva so‘zlari ko‘p uchraydigan uslub?', v:['ilmiy','so‘zlashuv','rasmiy','publitsistik'], t:1, izoh:'<b>So‘zlashuv</b> uslubi — kundalik muloqot.'},
    {s:'«Fotosintez — … jarayoni» ta’rifi qaysi uslub?', v:['badiiy','so‘zlashuv','ilmiy','rasmiy'], t:2, izoh:'Ta’rif va atama — <b>ilmiy</b>.'},
    {s:'Gazeta maqolasi va reportaj qaysi uslubda?', v:['publitsistik','rasmiy','badiiy','ilmiy'], t:0, izoh:'<b>Publitsistik</b> uslub — matbuot tili.'},
    {s:'Shaxsiy munosabat yo‘q, qolip iboralar («tasdiqlansin») — bu …', v:['badiiy','rasmiy','so‘zlashuv','publitsistik'], t:1, izoh:'<b>Rasmiy</b> uslub.'},
    {s:'Uslubni aniqlashda nimaga qaraladi?', v:['faqat matn uzunligiga','so‘z tanlovi, gap tuzilishi, maqsad va sohaga','faqat tinish belgilariga','faqat muallif ismiga'], t:1, izoh:'<b>So‘z tanlovi, gap tuzilishi, maqsad va qo‘llanish sohasi</b> — birgalikda.'},
    T3('Sahnada <b>rasmiy uslub</b> kartasini bosing.', 'til-uslub', 'nom', ['rasmiy'], ['Rasmiy uslub (ariza)', 'boshqa uslub'], '<b>Rasmiy uslub</b> — ariza, buyruq: qolip iboralar, sana, imzo.')
  ],
  yordamchi:[
    {s:'Publitsistik bilan badiiyni qanday farqlayman?', j:'Ikkalasida ta’sirchanlik bor, lekin publitsistik uslub real ijtimoiy mavzuni ko‘taradi, o‘quvchiga to‘g‘ridan-to‘g‘ri murojaat qiladi va dalil keltiradi; badiiy uslub to‘qima olam yaratadi, obraz va his orqali ta’sir qiladi.', kalit:['publitsistik','badiiy','farq']},
    {s:'Matn namunalari qayerdan?', j:'Barcha namuna matnlar MAKON uchun o‘quv maqsadida yozilgan — biror asl manbadan ko‘chirilmagan. Rasmiy namunadagi ism va sanalar to‘qima.', kalit:['namuna','manba','matn']}
  ],
  maqola:[
    {sarlavha:'Uslub nima va nega bir necha xil?', xatboshilar:[
      'Biz bir xil fikrni do‘stga, o‘qituvchiga, rasmiy idoraga va gazeta o‘quvchisiga turlicha aytamiz. Nutqning muloqot sohasi, maqsadi va sharoitiga mos ko‘rinishi uslub deyiladi. O‘zbek tilshunosligida beshta asosiy nutq uslubi ajratiladi: so‘zlashuv, ilmiy, rasmiy (rasmiy-idoraviy), publitsistik va badiiy.',
      'Uslub so‘z tanlovida (atama, sheva so‘zi, obrazli ibora), gap tuzilishida (qisqa yoki murakkab), shaxs ifodasida (muallif «men»i yoki shaxssiz) va tinish belgilarida ko‘rinadi. Uslubni to‘g‘ri tanlash — nutq madaniyatining asosi: arizada badiiy ibora, do‘stlar suhbatida esa rasmiy qolip o‘rinsiz.',
      'Uslublar bir-biridan qat’iy devor bilan ajralmagan: publitsistik uslubda ilmiy va badiiy vositalar, badiiy asarda so‘zlashuv tili (qahramonlar nutqi) uchraydi. Shuning uchun uslubni aniqlashda matnning umumiy maqsadi va yetakchi belgilariga qaraladi.'
    ]},
    {sarlavha:'Ilmiy, rasmiy va publitsistik uslublar', xatboshilar:[
      'Ilmiy uslub bilimni aniq yetkazadi: atamalar (fotosintez, magnituda), ta’riflar, raqamlar, mantiqiy izchillik; gaplar to‘liq, ko‘pincha murakkab; his-tuyg‘u ifodalanmaydi. Ko‘rinishlari: darslik, ilmiy maqola, ma’ruza, dissertatsiya.',
      'Rasmiy uslub hujjatlar tili: ariza, buyruq, bayonnoma, shartnoma, qonun. Belgilari — qolip so‘z va iboralar («so‘rayman», «tasdiqlansin», «asosan»), bir ma’nolilik, aniq tuzilma (kimga, kimdan, sana, imzo), shaxsiy munosabatning yo‘qligi. Bu uslubda har so‘z huquqiy ma’noga ega.',
      'Publitsistik uslub jamoatchilik fikriga ta’sir qiladi: gazeta maqolasi, teleko‘rsatuv, notiq nutqi. Belgilari — dolzarb ijtimoiy mavzu, murojaat («Aziz yurtdoshlar!»), ritorik savol, baho beruvchi so‘zlar, ilmiy dalil bilan badiiy obrazning uyg‘unligi.'
    ]},
    {sarlavha:'Badiiy va so‘zlashuv uslublari', xatboshilar:[
      'Badiiy uslub adabiyot tili: she’r, hikoya, roman, drama. Maqsad — ta’sirchan badiiy olam yaratish. Vositalari: o‘xshatish («momiqdek»), sifatlash («oltin nurlar»), jonlantirish («daryo yugurdi»), mubolag‘a, takror, ohang. Muallif ovozi va his-tuyg‘u ochiq ifodalanadi; so‘z tanlovi eng erkin.',
      'So‘zlashuv uslubi kundalik, norasmiy muloqot tili: oila, do‘stlar, bozor. Belgilari — qisqa va to‘liqsiz gaplar («Mayli, beshlarda»), undov va yuklamalar, sheva so‘zlari, takror; ma’noni ohang, imo-ishora, vaziyat to‘ldiradi. Yozma ko‘rinishi — shaxsiy xat, xabar (SMS, messenjer).',
      'Badiiy asarda qahramonlar nutqi ko‘pincha so‘zlashuv uslubida beriladi — bu ularni jonli qiladi. «O‘tkan kunlar»da Otabek va Kumush dialoglari shunday. Uslublarni bilish o‘qishda ham, yozishda ham kerak: insho, maqola, ariza — har biri o‘z uslubida yoziladi.'
    ]}
  ],
  formulalar:[
    ['Uslub = soha + maqsad + til vositalari', 'Uslubni belgilovchi uch omil'],
    ['Badiiy → obraz, his', 'she’r, hikoya, roman'],
    ['Ilmiy → atama, mantiq', 'darslik, maqola'],
    ['Rasmiy → qolip, hujjat', 'ariza, buyruq, shartnoma'],
    ['Publitsistik → murojaat, dolzarblik', 'gazeta, nutq'],
    ['So‘zlashuv → qisqa, erkin', 'suhbat, xat, xabar']
  ],
  qiziqarli:[
    'Bir xil mazmun («ertaga yomg‘ir») beshta uslubda butunlay boshqacha yangraydi — jadvalni «Qo‘shimcha»da ko‘ring.',
    'Qonun matnlarida har so‘z huquqiy ma’noga ega bo‘lgani uchun rasmiy uslub eng «qattiq» uslub: unda sinonim almashtirish ham ma’noni o‘zgartirishi mumkin.',
    'Messenjerdagi xabarlar — so‘zlashuv uslubining yozma ko‘rinishi; unda emoji va qisqartmalar ohang va imo-ishora o‘rnini bosadi.',
    'Publitsistika so‘zi lotincha «publicus» — «jamoatchilik» so‘zidan.'
  ],
  lugat:[['nutq uslubi', 'nutqning soha va maqsadga mos ko‘rinishi'], ['badiiy uslub', 'adabiyot tili — obraz, his'], ['ilmiy uslub', 'fan tili — atama, aniqlik'], ['rasmiy uslub', 'hujjatlar tili — qolip'], ['publitsistik uslub', 'matbuot va nutq tili — ta’sir'], ['so‘zlashuv uslubi', 'kundalik muloqot tili'], ['atama (termin)', 'fanga oid aniq ma’noli so‘z'], ['qolip ibora', 'hujjatlarda takrorlanuvchi tayyor ibora'], ['o‘xshatish', 'bir narsani boshqasiga qiyoslash (-dek, kabi)'], ['jonlantirish', 'jonsiz narsani jonli kabi tasvirlash'], ['ritorik savol', 'javob talab qilmaydigan ta’sirchan savol'], ['to‘liqsiz gap', 'bo‘lagi tushirilgan, vaziyatdan tushuniladigan gap']],
  manba:O11 + '; «O‘zbek tili stilistikasi» (oliy o‘quv yurtlari darsligi) — funksional uslublar tasnifi. Sahnadagi barcha matn namunalari MAKON uchun yozilgan o‘quv namunalari; rasmiy namunadagi ism va sanalar to‘qima.',
  ishlanma:ish('11-sinf', 'Mustahkamlash va yangi bilim', 'Matn tahlili, «uslubni aniqla» o‘yini, bir mazmunni besh uslubda yozish',
    ['Beshta nutq uslubi, ularning belgilari, soha va til vositalarini o‘rgatish.', 'Nutq madaniyati, vaziyatga mos so‘zlashishni tarbiyalash.', 'Matnni tahlil qilish, uslubni aniqlash va turli uslubda yozish ko‘nikmasini rivojlantirish.'],
    ['5 uslubni belgilari bilan sanaydi', 'Noma’lum matnning uslubini asoslab aniqlaydi', 'Bir mazmunni 2–3 uslubda yozadi', 'Ariza va kichik maqola yozadi'],
    ['MAKON sahnasi «Nutq uslublari»', 'Tarqatma matnlar (6 ta)', 'Proyektor', 'Darslik'],
    [['0–3', '<b>Tashkiliy qism.</b>', 'Tinglaydi.'], ['3–8', '<b>Motivatsiya.</b> «Ertaga yomg‘ir» — do‘stga, direktorga, gazetaga qanday aytasiz?', 'Variantlar aytadi.'], ['8–20', '<b>Yangi mavzu.</b> MAKON kartalari: 5 uslub, belgilari matnda.', 'Jadval tuzadi.'], ['20–28', '<b>Mashq.</b> Tarqatma matnlarning uslubini juftlikda aniqlash.', 'Aniqlaydi, asoslaydi.'], ['28–36', '<b>Amaliyot.</b> MAKON «Uslubni aniqla».', 'Bajaradi.'], ['36–43', '<b>Test.</b>', 'Test yechadi.'], ['43–45', '<b>Yakun, uyga vazifa.</b>', 'Yozib oladi.']],
    [['uslub', 'nutq ko‘rinishi'], ['atama', 'fan so‘zi'], ['qolip ibora', 'hujjat iborasi'], ['ritorik savol', 'javobsiz savol']],
    [['Uslublar nechta?', '5'], ['Ariza — qaysi uslub?', 'rasmiy'], ['Atama — qaysi uslub?', 'ilmiy'], ['Murojaat, ritorik savol?', 'publitsistik']],
    '«Maktab bog‘i» mavzusini 3 uslubda (badiiy, ilmiy, publitsistik) 5–6 gapdan yozing; darsdan ozod qilish haqida ariza yozing; gazetadan bir maqola olib, uslubiy belgilarini ko‘rsating.',
    O11)
};


/* ================================================================
   DETAL KARTALARI — MAKON_DETAL.til_* (so‘z lug‘atlari window.MAKON_TIL_SOZ dan)
   ================================================================ */
const enKarta = (turD, sarlavha2, lug, manba)=>{
  DT[turD] = DT[turD] || {};
  Object.keys(lug || {}).forEach(k=>{
    const s = lug[k];
    const jad = [];
    if(s.ipa) jad.push(['Transkripsiya (IPA, UK)', s.ipa]);
    jad.push(['Tarjima', s.uz]);
    if(s.bir) jad.push(['Birlik', s.bir]);
    if(s.san !== undefined) jad.push(['Turi', s.san ? 'countable — sanaladi (How many?)' : 'uncountable — sanalmaydi (How much?)']);
    if(s.narx) jad.push(['Narx (namuna)', s.narx]);
    if(s.s !== undefined) jad.push(['Vaqt', String(s.s) + ':' + String(s.d).padStart(2, '0') + ' — ' + (SZ.vaqtSoz ? SZ.vaqtSoz(s.s, s.d).matn : '')]);
    if(s.gap) jad.push(['Misol', s.gap]);
    if(s.misol) jad.push(['Misol', s.misol]);
    if(s.dard) jad.push(['Shikoyat', s.dard + ' — ' + (s.dardUz || '')]);
    if(s.maslahat) jad.push(['Maslahat', s.maslahat]);
    DT[turD][k] = {nom:s.en, sarlavha2, jadval:jad, matn:'Sahnada «Talaffuz» tugmasi brauzer ovozi bilan o‘qiydi; inglizcha ovoz bo‘lmasa transkripsiyadan foydalaning.', manba};
  });
};
enKarta('til_xona', 'English · My room', SZ.xona, CAM);
enKarta('til_rang', 'English · Colours', SZ.rang, CAM);
Object.keys(SZ.shakl || {}).forEach(k=>{ DT.til_rang['shakl_' + k] = {nom:SZ.shakl[k].en, sarlavha2:'English · Shapes', jadval:[['Transkripsiya', SZ.shakl[k].ipa], ['Tarjima', SZ.shakl[k].uz]], matn:'Sifat otdan oldin: a red ' + SZ.shakl[k].en + '.', manba:CAM}; });
enKarta('til_bozor', 'English · At the market', SZ.bozor, CAM + '. Narxlar — o‘quv namunasi.');
enKarta('til_vaqt', 'English · Daily routine', SZ.vaqt, CAM);
Object.assign(DT.til_vaqt, {
  face:{nom:'clock face', sarlavha2:'English · Clock', jadval:[['Transkripsiya', '/klɒk feɪs/'], ['Tarjima', 'soat siferblati']], matn:'1 dan 12 gacha raqamlar; 60 ta kichik chiziq — daqiqalar. Daqiqa strelkasi 12 da — o’clock, 3 da — quarter past, 6 da — half past, 9 da — quarter to.', manba:CAM},
  hour_hand:{nom:'hour hand', sarlavha2:'English · Clock', jadval:[['Transkripsiya', '/ˈaʊər hænd/'], ['Tarjima', 'soat strelkasi (kalta)']], matn:'Soatni ko‘rsatadi; 12 soatda bir marta to‘liq aylanadi.', manba:CAM},
  minute_hand:{nom:'minute hand', sarlavha2:'English · Clock', jadval:[['Transkripsiya', '/ˈmɪn.ɪt hænd/'], ['Tarjima', 'daqiqa strelkasi (uzun)']], matn:'Daqiqani ko‘rsatadi; bir soatda to‘liq aylanadi.', manba:CAM}
});
enKarta('til_joy', 'English · Prepositions of place', SZ.joy, CAM + '; ' + ENGL);
Object.assign(DT.til_joy, {
  ball:{nom:'ball', sarlavha2:'English · Things', jadval:[['Transkripsiya', '/bɔːl/'], ['Tarjima', 'to‘p'], ['Savol', 'Where is the ball?']], manba:CAM},
  box:{nom:'box', sarlavha2:'English · Things', jadval:[['Transkripsiya', '/bɒks/'], ['Tarjima', 'quti'], ['Misol', 'The ball is in the box.']], manba:CAM},
  table:{nom:'table', sarlavha2:'English · Things', jadval:[['Transkripsiya', '/ˈteɪ.bəl/'], ['Tarjima', 'stol'], ['Misol', 'The ball is under the table.']], manba:CAM}
});
enKarta('til_tana', 'English · Parts of the body', SZ.tana, CAM + '. Figura soddalashtirilgan.');
enKarta('til_shahar', 'English · In the city', SZ.shahar, CAM);
/* ---- ona tili kartalari ---- */
DT.til_turkum = {};
Object.keys(SZ.turkum || {}).forEach(k=>{ const t = SZ.turkum[k]; DT.til_turkum[k] = {nom:t.nom, sarlavha2:'Ona tili · so‘z turkumi', jadval:[['Savoli', t.savol], ['Guruhi', ['boglovchi', 'komakchi'].includes(k) ? 'yordamchi so‘z' : k === 'undov' ? 'alohida guruh' : 'mustaqil so‘z']], matn:t.izoh, manba:O5}; });
DT.til_bolak = {};
Object.keys(SZ.bolak || {}).forEach(k=>{ const b = SZ.bolak[k]; DT.til_bolak[k] = {nom:b.nom, sarlavha2:'Ona tili · gap bo‘lagi', jadval:[['Savoli', b.savol], ['Turi', b.bosh ? 'bosh bo‘lak' : 'ikkinchi darajali bo‘lak'], ['Tagiga chizish', {bir:'bir chiziq', ikki:'ikki chiziq', tolqin:'to‘lqinli chiziq', uzuq:'uzuq chiziq', nuqta:'nuqta-chiziq'}[b.chiziq]]], matn:b.izoh, manba:O6}; });
DT.til_qoshma = {};
Object.keys(SZ.qoshma || {}).forEach(k=>{ const q = SZ.qoshma[k]; DT.til_qoshma[k] = {nom:q.b, sarlavha2:'Ona tili · ' + SZ.qoshmaTur[q.tur].nom, jadval:[['Gap', q.gap], ['Turi', SZ.qoshmaTur[q.tur].nom + (q.tur === 'ergash' ? ' — ' + q.mano + ' ergash gap' : q.tur === 'boglangan' ? ' — ' + q.mano : '')]], matn:q.izoh, manba:O8}; });
DT.til_uslub = {};
Object.keys(SZ.uslub || {}).forEach(k=>{ const u = SZ.uslub[k]; DT.til_uslub[k] = {nom:u.nom, sarlavha2:'Ona tili · nutq uslubi', jadval:[['Qo‘llanadi', u.joy], ['Belgilari', u.belgi.join('; ')]], matn:'Namuna: ' + u.matn, manba:O11 + '. Matn — o‘quv namunasi.'}; });
DT.til_navoiy = {};
if(SZ.navoiy){
  Object.keys(SZ.navoiy.shahar).forEach(k=>{ const s = SZ.navoiy.shahar[k]; DT.til_navoiy[k] = {nom:s.nom, sarlavha2:'Navoiy xaritasi · shahar', jadval:[['Koordinata (hozirgi)', s.lat.toFixed(2) + '° N, ' + s.lon.toFixed(2) + '° E']], matn:s.izoh, manba:A7 + '; ' + MW}; });
  SZ.navoiy.voqea.forEach((v, i)=>{ DT.til_navoiy['v' + i] = {nom:v.y + ' — ' + v.s, sarlavha2:'Navoiy xronologiyasi', jadval:[['Shahar', SZ.navoiy.shahar[v.sh].nom]], matn:v.m, manba:A7 + '; ziyouz.uz; ' + MW + ' «Ali-Shir Nava’i»'}; });
  Object.keys(SZ.navoiy.xamsa).forEach(k=>{ const d = SZ.navoiy.xamsa[k]; DT.til_navoiy[k] = {nom:'«' + d.nom + '»', sarlavha2:'«Xamsa» dostoni', jadval:[['Yozilgan', d.y + ' (taxminiy, manbalarda 1483–1485 oralig‘ida)'], ['Ma’nosi', d.uz || '—']], matn:d.m, manba:A7 + '; ' + MW + ' «Khamsa (Nava’i)»'}; });
}
DT.til_bobur = {};
if(SZ.bobur){
  Object.keys(SZ.bobur.shahar).forEach(k=>{ const s = SZ.bobur.shahar[k]; DT.til_bobur[k] = {nom:s.nom, sarlavha2:'Bobur yo‘li · shahar', jadval:[['Koordinata (hozirgi)', s.lat.toFixed(2) + '° N, ' + s.lon.toFixed(2) + '° E']], matn:s.izoh, manba:A9 + '; ' + MW + ' «Babur»'}; });
  SZ.bobur.bosqich.forEach((b, i)=>{ DT.til_bobur['b' + i] = {nom:b.y + ' — ' + b.s, sarlavha2:'Bobur yo‘li · bosqich', jadval:[['Oxirgi nuqta', SZ.bobur.shahar[b.sh[b.sh.length - 1]].nom]], matn:b.m, manba:A9 + '; ' + MW + ' «Babur», «Baburnama»'}; });
}
DT.til_qodiriy = {};
if(SZ.qodiriy){
  Object.keys(SZ.qodiriy.qahramon).forEach(k=>{ const q = SZ.qodiriy.qahramon[k]; const al = SZ.qodiriy.aloqa.filter(a=>a[0] === k || a[1] === k).map(a=>[SZ.qodiriy.qahramon[a[0] === k ? a[1] : a[0]].nom, a[2]]); DT.til_qodiriy[k] = {nom:q.nom, sarlavha2:'«O‘tkan kunlar» · qahramon', jadval:al, matn:q.kim, manba:A10 + '; ' + MW + ' «O‘tkan kunlar»'}; });
  SZ.qodiriy.tarix.forEach((t, i)=>{ DT.til_qodiriy['t' + i] = {nom:t.y + ' — ' + t.s, sarlavha2:'Tarixiy kontekst', jadval:[], matn:t.m, manba:A10 + '; ' + MW + ' «Russian conquest of Central Asia», «Abdulla Qodiriy»'}; });
}
/* detallar.js MAKON_DETAL ni qaytadan yaratishi mumkin — hozir ham, sahifa yuklangach ham qo‘shiladi */
const qosh = ()=>{ const D = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DT).forEach(k=>{ D[k] = Object.assign(D[k] || {}, DT[k]); }); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
window.MAKON_TIL_DETAL = DT;
})();
