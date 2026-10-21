/* MAKON demo — fanlar va darslar mazmuni.
   Qoida: faqat tekshirilgan fakt; demo bo'lmagan mavzu "keyingi bosqich" deb ochiq yoziladi. */
window.MAKON_FAN = [
  {id:'kimyo', nom:'Kimyo', rang:'#2fd0bd', ik:'kolba', izoh:'Molekulalar, reaksiyalar, virtual laboratoriya',
   mavzular:[
     {nom:'Molekulalarning fazoviy tuzilishi', dars:'kimyo-molekula', qisqa:'Suv, karbonat angidrid, metan, ammiak, osh tuzi — 3D da'},
     {nom:'Kimyoviy bog‘ turlari', qisqa:'Kovalent, ionli, metall bog‘'},
     {nom:'Kislota va asoslar', qisqa:'Indikator bilan virtual tajriba'},
     {nom:'Oksidlanish-qaytarilish', qisqa:'Elektron o‘tishini ko‘rish'}
   ]},
  {id:'fizika', nom:'Fizika', rang:'#ffc94d', ik:'chaqmoq', izoh:'Elektr zanjiri, mexanika, optika',
   mavzular:[
     {nom:'Om qonuni: tok, kuchlanish, qarshilik', dars:'fizika-om', qisqa:'Zanjirni yig‘ing, lampani yoqing, tokni o‘lchang'},
     {nom:'Ketma-ket va parallel ulash', qisqa:'Ikki lampa bilan tajriba'},
     {nom:'Yorug‘likning sinishi', qisqa:'Linza va prizma'},
     {nom:'Nyuton qonunlari', qisqa:'Aravacha va qiya tekislik'}
   ]},
  {id:'biologiya', nom:'Biologiya', rang:'#ff6f5c', ik:'yurak', izoh:'Inson anatomiyasi, hujayra, o‘simliklar',
   mavzular:[
     {nom:'Inson tanasining ichki a’zolari', dars:'bio-azolar', qisqa:'Ilmiy 3D model: skelet, mushak, a’zolar, qon tomirlar'},
     {nom:'Qon aylanish tizimi', qisqa:'Katta va kichik doira'},
     {nom:'Hujayra tuzilishi', qisqa:'Organoidlar 3D da'},
     {nom:'Nafas olish tizimi', qisqa:'Havo yo‘li va alveolalar'}
   ]},
  {id:'harbiy', nom:'Chaqiruvga qadar tayyorgarlik', rang:'#9bd35a', ik:'qalqon', izoh:'Qurol tuzilishi, topografiya, birinchi yordam',
   mavzular:[
     {nom:'Avtomatni to‘liq bo‘lmagan qismlarga ajratish', dars:'harbiy-ajratish', qisqa:'Tartibni o‘rganing, ajrating va yig‘ing'},
     {nom:'Topografik xarita va kompas', qisqa:'Azimut bo‘yicha harakat'},
     {nom:'Dastlabki tibbiy yordam', qisqa:'Bog‘lam qo‘yish bosqichlari'},
     {nom:'Fuqaro muhofazasi', qisqa:'Favqulodda vaziyatda harakat'}
   ]},
  {id:'astronomiya', nom:'Astronomiya', rang:'#8079ff', ik:'sayyora', izoh:'Quyosh sistemasi, yulduzlar', yopiq:true},
  {id:'tarix', nom:'Tarix', rang:'#e0a458', ik:'xarita', izoh:'Davrlar bo‘yicha o‘zgaradigan xarita', yopiq:true},
  {id:'geografiya', nom:'Geografiya', rang:'#4fb3ff', ik:'globus', izoh:'Relyef, iqlim, xaritalar', yopiq:true}
];

window.MAKON_DARS = {
  'kimyo-molekula': {
    fan:'kimyo', qisqaNom:'Kimyo', nom:'Molekulalarning fazoviy tuzilishi', sahna:'molekula',
    kor:{
      sarlavha:'Molekula tekis emas — uning shakli bor',
      matn:'Darslikdagi rasm molekulani qog‘ozda tekis ko‘rsatadi. Aslida atomlar fazoda aniq burchak ostida joylashadi va shu shakl moddaning xossasini belgilaydi.',
      punktlar:['<b>H₂O</b> — burchakli, 104,5°','<b>CO₂</b> — chiziqli, 180°','<b>CH₄</b> — tetraedr, 109,5°','<b>NH₃</b> — piramida, 107°','<b>NaCl</b> — ionli kristall panjara'],
      molekulalar:[['H2O','H₂O · suv'],['CO2','CO₂'],['CH4','CH₄ · metan'],['NH3','NH₃ · ammiak'],['NaCl','NaCl · osh tuzi']]
    },
    amaliyot:{
      tur:'kimyo',
      sarlavha:'Molekulani hosil qiling',
      topshiriqlar:[
        {shart:'Suv molekulasini hosil qiling', juft:['H','O'], mol:'H2O'},
        {shart:'Ammiak molekulasini hosil qiling', juft:['H','N'], mol:'NH3'},
        {shart:'Osh tuzini hosil qiling', juft:['Na','Cl'], mol:'NaCl'}
      ]
    },
    test:[
      {s:'Suv molekulasida H–O–H bog‘ burchagi taxminan qancha?', v:['90°','104,5°','109,5°','180°'], t:1,
       izoh:'Kislorod atomidagi <b>ikki bo‘linmagan elektron juftligi</b> bog‘larni bir-biriga yaqinlashtiradi, shuning uchun burchak tetraedrdagidan (109,5°) kichik.'},
      {s:'CO₂ molekulasining shakli qanday?', v:['Burchakli','Chiziqli','Piramida','Tetraedr'], t:1,
       izoh:'Uglerod ikki tomondan kislorod bilan qo‘sh bog‘ hosil qiladi va atomlar <b>bir chiziqda (180°)</b> joylashadi — shuning uchun molekula qutbsiz.'},
      {s:'Metan (CH₄) molekulasining shakli qanday?', v:['Tekis kvadrat','Tetraedr','Piramida','Chiziqli'], t:1,
       izoh:'To‘rt vodorod atomi fazoda bir-biridan eng uzoq joylashadi — <b>tetraedr</b>, burchak 109,5°.'},
      {s:'Osh tuzi (NaCl) kristalida qanday kimyoviy bog‘ bor?', v:['Kovalent qutbsiz','Ionli','Metall','Vodorod'], t:1,
       izoh:'Natriy elektron beradi, xlor oladi: Na⁺ va Cl⁻ ionlari bir-biriga tortiladi — <b>ionli bog‘</b>.'}
    ]
  },

  'fizika-om': {
    fan:'fizika', qisqaNom:'Fizika', nom:'Om qonuni: tok, kuchlanish, qarshilik', sahna:'fizika',
    kor:{
      sarlavha:'Tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional',
      matn:'Zanjirda tok manbai, lampa, rezistor va ampermetr bor. Slayderlarni surib, lampa yorqinligi, rezistor halqalari va ampermetr ko‘rsatkichi qanday o‘zgarishini kuzating.',
      punktlar:['<b>I = U / R</b> — Om qonuni','<b>P = U · I</b> — quvvat, lampa yorqinligi shunga bog‘liq','Ampermetr zanjirga <b>ketma-ket</b> ulanadi','Komponentni bosing — vazifasi chiqadi']
    },
    amaliyot:{
      tur:'fizika',
      sarlavha:'Zanjirni sozlang',
      topshiriqlar:[
        {shart:'Tok kuchi aniq 2 A bo‘lsin', tekshir:'I', qiymat:2},
        {shart:'Tok kuchi aniq 0,5 A bo‘lsin', tekshir:'I', qiymat:.5},
        {shart:'Lampa yorqin yonsin (quvvat 40 Vt dan ko‘p), lekin kuymasin (55 Vt gacha)', tekshir:'P', min:40, max:55}
      ]
    },
    test:[
      {s:'U = 12 V, R = 4 Ω. Tok kuchi qancha?', v:['3 A','48 A','0,33 A','16 A'], t:0,
       izoh:'<b>I = U / R = 12 / 4 = 3 A.</b> 48 — ko‘paytirilgan, 0,33 — teskari bo‘lingan holat.'},
      {s:'Kuchlanish o‘zgarmasa, qarshilik 2 marta oshirilsa tok kuchi qanday o‘zgaradi?', v:['2 marta oshadi','2 marta kamayadi','O‘zgarmaydi','4 marta kamayadi'], t:1,
       izoh:'Tok qarshilikka <b>teskari proporsional</b>: R ikki marta katta bo‘lsa, I ikki marta kichik.'},
      {s:'Ampermetr zanjirga qanday ulanadi?', v:['Ketma-ket','Parallel','Faqat manbaga parallel','Ulanmaydi, masofadan o‘lchaydi'], t:0,
       izoh:'Tok kuchini o‘lchash uchun butun tok ampermetr orqali o‘tishi kerak — <b>ketma-ket</b> ulanadi. Voltmetr esa parallel ulanadi.'},
      {s:'U = 12 V, I = 2 A. Iste’molchining quvvati qancha?', v:['6 Vt','24 Vt','14 Vt','10 Vt'], t:1,
       izoh:'<b>P = U · I = 12 · 2 = 24 Vt.</b>'}
    ]
  },

  'bio-azolar': {
    fan:'biologiya', qisqaNom:'Biologiya', nom:'Inson tanasining ichki a’zolari', sahna:'biologiya',
    kor:{
      sarlavha:'Plakatdan farqi: qatlamlarni o‘zingiz ochasiz',
      matn:'Model ilmiy BodyParts3D bazasidan olingan — haqiqiy inson tanasi tasvirlari asosida qurilgan. Qatlamlarni yoqib-o‘chiring, a’zoni bosing, modelni aylantiring.',
      punktlar:['<b>Skelet → mushaklar → a’zolar → qon tomirlar → teri</b>','A’zoni bosing — ta’rifi chiqadi','O‘ng pastda: ko‘krak, bosh yoki butun tana']
    },
    amaliyot:{
      tur:'biologiya',
      sarlavha:'A’zoni toping',
      topshiriqlar:[
        {shart:'Yurakni toping va bosing', azo:'yurak'},
        {shart:'Jigarni toping va bosing', azo:'jigar'},
        {shart:'O‘pkani toping va bosing', azo:'opka'},
        {shart:'Oshqozonni toping va bosing', azo:'oshqozon'},
        {shart:'Buyrakni toping va bosing (orqa tomondan qarang)', azo:'buyrak'}
      ]
    },
    test:[
      {s:'Gaz almashinuvi o‘pkaning qaysi qismida kechadi?', v:['Bronxlarda','Alveolalarda','Traxeyada','Hiqildoqda'], t:1,
       izoh:'Kislorod qonga va karbonat angidrid qondan <b>alveolalar</b> devori orqali o‘tadi. Traxeya va bronxlar — faqat havo yo‘li.'},
      {s:'Insulin gormonini qaysi a’zo ishlab chiqaradi?', v:['Jigar','Oshqozon osti bezi','Taloq','Buyrak'], t:1,
       izoh:'<b>Oshqozon osti bezi</b> insulin va glyukagon orqali qondagi qand miqdorini boshqaradi.'},
      {s:'Qonni filtrlab, siydik hosil qiladigan a’zo qaysi?', v:['Buyrak','Jigar','Ingichka ichak','Yurak'], t:0,
       izoh:'<b>Buyraklar</b> qonni filtrlaydi va suv-tuz muvozanatini saqlaydi.'},
      {s:'Ozuqa moddalari asosan qayerda qonga so‘riladi?', v:['Oshqozonda','Ingichka ichakda','Yo‘g‘on ichakda','Qizilo‘ngachda'], t:1,
       izoh:'So‘rilishning asosiy qismi <b>ingichka ichakda</b> kechadi; yo‘g‘on ichakda asosan suv so‘riladi.'}
    ]
  },

  'harbiy-ajratish': {
    fan:'harbiy', qisqaNom:'AK · ajratish', nom:'Avtomatni to‘liq bo‘lmagan qismlarga ajratish', sahna:'harbiy', rejimlar:['butun','rentgen','ajrat'],
    kor:{
      sarlavha:'Tartibni avval ekranda o‘rganing',
      matn:'Slayderni suring — qismlar ajratish tartibida birin-ketin chiqadi. Model o‘quv maqsadida soddalashtirilgan: penal va dulo tormozi ko‘rsatilmagan.',
      punktlar:['<b>1.</b> Magazin ajratiladi, patronnikda patron yo‘qligi tekshiriladi','<b>2.</b> Shompol','<b>3.</b> Qopqoq','<b>4.</b> Qaytaruvchi mexanizm','<b>5.</b> Zatvor rami zatvor bilan','<b>6.</b> Gaz trubkasi ustki cevye bilan','Yig‘ish — <b>teskari tartibda</b>']
    },
    amaliyot:{
      tur:'tartib',
      sarlavha:'Tartib bilan ajrating, keyin yig‘ing',
      qismlar:[[1,'Magazin'],[2,'Shompol'],[3,'Qopqoq'],[4,'Qaytaruvchi mexanizm'],[5,'Zatvor rami va zatvor'],[6,'Gaz trubkasi']]
    },
    test:[
      {s:'Qismlarga ajratishda birinchi navbatda nima qilinadi?', v:['Qopqoq ajratiladi','Magazin ajratiladi','Shompol chiqariladi','Zatvor ajratiladi'], t:1,
       izoh:'Avval <b>magazin ajratiladi</b> va patronnikda patron yo‘qligi tekshiriladi — bu xavfsizlik talabi.'},
      {s:'Qopqoqdan keyin qaysi qism ajratiladi?', v:['Gaz trubkasi','Magazin','Qaytaruvchi mexanizm','Shompol'], t:2,
       izoh:'Qopqoq olingach, <b>qaytaruvchi mexanizm</b> ajratiladi; shundan keyingina zatvor ramini chiqarish mumkin.'},
      {s:'Qismlarga ajratilgan avtomat qanday tartibda yig‘iladi?', v:['Ixtiyoriy tartibda','Ajratishga teskari tartibda','Ajratish bilan bir xil tartibda','Avval magazin qo‘yiladi'], t:1,
       izoh:'Yig‘ish <b>ajratishga teskari tartibda</b> bajariladi: oxirgi ajratilgan qism birinchi joyiga qo‘yiladi.'},
      {s:'Qaytaruvchi mexanizmdan keyin nima ajratiladi?', v:['Zatvor rami zatvor bilan','Shompol','Magazin','Qopqoq'], t:0,
       izoh:'Keyingi qadam — <b>zatvor rami zatvor bilan</b>, so‘ng zatvor ramdan ajratiladi.'}
    ]
  }
};

/* O'qituvchi paneli uchun NAMUNA sinf (haqiqiy o'quvchilar emas) */
window.MAKON_NAMUNA = {
  sinf:'8-A sinf',
  oquvchilar:[
    ['Aziza Karimova',   {'kimyo-molekula':4,'fizika-om':4,'bio-azolar':3,'harbiy-ajratish':null}],
    ['Bekzod Tursunov',  {'kimyo-molekula':3,'fizika-om':2,'bio-azolar':4,'harbiy-ajratish':4}],
    ['Dilnoza Rahimova', {'kimyo-molekula':4,'fizika-om':3,'bio-azolar':4,'harbiy-ajratish':null}],
    ['Jasur Aliyev',     {'kimyo-molekula':2,'fizika-om':1,'bio-azolar':3,'harbiy-ajratish':3}],
    ['Madina Yusupova',  {'kimyo-molekula':3,'fizika-om':4,'bio-azolar':null,'harbiy-ajratish':null}],
    ['Otabek Nazarov',   {'kimyo-molekula':null,'fizika-om':2,'bio-azolar':2,'harbiy-ajratish':4}],
    ['Sevara Qodirova',  {'kimyo-molekula':4,'fizika-om':3,'bio-azolar':4,'harbiy-ajratish':2}],
    ['Sherzod Ergashev', {'kimyo-molekula':2,'fizika-om':2,'bio-azolar':3,'harbiy-ajratish':null}]
  ],
  // namuna ballari qaysi test uzunligida yozilgan (v3.13: testlar kengaygan — app3.js hozirgi uzunlikka moslaydi)
  jami:{'kimyo-molekula':4,'fizika-om':4,'bio-azolar':4,'harbiy-ak74':5,'harbiy-granata':5,'harbiy-texnika':5,'harbiy-protivogaz':5},
  // namuna: har testdagi eng ko'p xato qilingan savol indeksi
  xato:{'kimyo-molekula':0,'fizika-om':1,'bio-azolar':3,'harbiy-ajratish':2}
};
