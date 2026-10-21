/* MAKON — virtual fizika laboratoriyasi ma'lumoti (v3.14).
   Zichlik va solishtirma issiqlik sig‘imi — maktab darsliklari jadvallaridagi yaxlitlangan qiymatlar
   (7–8-sinf fizika; ma'lumotnoma qiymatlari bilan solishtirilgan: engineeringtoolbox.com, CRC Handbook).
   Aniq qiymat harorat va navga bog‘liq — ilovada "yaxlitlangan" deb yoziladi. */
window.MAKON_FIZLAB_MALUMOT = {
  g: 9.8, /* N/kg — darslikdagidek; aniqrog‘i 9,81 */
  /* qattiq jismlar: zichlik kg/m³ */
  JISM: {
    pokak:     {nom:'Po‘kak',          rho:240,   rang:'#c89a62', izoh:'po‘kak daraxti po‘stlog‘i; navga qarab 120–240 kg/m³'},
    qaragay:   {nom:'Qarag‘ay yog‘och', rho:400,   rang:'#d8b27a', izoh:'quruq qarag‘ay; namligiga qarab 400–520 kg/m³'},
    muz:       {nom:'Muz',              rho:900,   rang:'#cfeaff', izoh:'0 °C da ≈ 917 kg/m³; darsliklarda 900', shaffof:true},
    parafin:   {nom:'Parafin',          rho:900,   rang:'#f1ead2', izoh:'sham moddasi; 880–920 kg/m³'},
    alyuminiy: {nom:'Alyuminiy',        rho:2700,  rang:'#c9d0d8', metall:true},
    temir:     {nom:'Temir (po‘lat)',   rho:7800,  rang:'#7d8591', metall:true, izoh:'toza temir 7874, po‘lat ≈ 7800 kg/m³'},
    mis:       {nom:'Mis',              rho:8900,  rang:'#c87a4a', metall:true, izoh:'≈ 8960 kg/m³'},
    qorgoshin: {nom:'Qo‘rg‘oshin',      rho:11300, rang:'#6b7079', metall:true, izoh:'≈ 11 340 kg/m³'},
    oltin:     {nom:'Oltin',            rho:19300, rang:'#e9c14a', metall:true, izoh:'≈ 19 320 kg/m³'}
  },
  /* suyuqliklar: zichlik kg/m³ */
  SUYUQ: {
    suv:     {nom:'Suv',             rho:1000,  rang:'#5fb4ff', shaffof:.42, izoh:'toza suv, ≈ 4 °C da 1000; 20 °C da 998 kg/m³'},
    dengiz:  {nom:'Dengiz suvi',     rho:1030,  rang:'#3f9fd9', shaffof:.5,  izoh:'sho‘rligiga qarab 1020–1030 kg/m³'},
    yog:     {nom:'O‘simlik yog‘i',  rho:920,   rang:'#e8c34a', shaffof:.55, izoh:'kungaboqar yog‘i ≈ 915–925 kg/m³'},
    kerosin: {nom:'Kerosin',         rho:800,   rang:'#f3efe0', shaffof:.35, izoh:'navga qarab 780–820 kg/m³'},
    simob:   {nom:'Simob',           rho:13600, rang:'#b9c0c8', shaffof:1,   izoh:'≈ 13 534 kg/m³ (25 °C); bug‘i zaharli — maktabda ishlatilmaydi, faqat virtual', xavf:true}
  },
  /* solishtirma issiqlik sig‘imi J/(kg·°C) */
  ISSIQ: {
    suv:       {nom:'Suv',       c:4200, izoh:'aniqrog‘i 4186 (15 °C)'},
    temir:     {nom:'Temir',     c:460,  izoh:'≈ 450–460'},
    alyuminiy: {nom:'Alyuminiy', c:920,  izoh:'darsliklarda 920; ma’lumotnomada ≈ 900'},
    mis:       {nom:'Mis',       c:400,  izoh:'darsliklarda 400 (380); ma’lumotnomada ≈ 385'},
    qorgoshin: {nom:'Qo‘rg‘oshin', c:140, izoh:'≈ 130'}
  },
  /* erkin tushish tezlanishi, m/s² (NASA Planetary Fact Sheet) */
  SAYYORA: {
    yer:    {nom:'Yer',    g:9.81},
    oy:     {nom:'Oy',     g:1.62},
    mars:   {nom:'Mars',   g:3.71},
    yupiter:{nom:'Yupiter', g:24.79}
  },
  /* Bashorat qiling → Kuzating → Tushuntiring (xato tushunchalar) */
  BASHORAT: {
    arximed: {s:'Bir xil hajmli temir va alyuminiy jism suvga to‘liq botirildi. Qaysi biriga ko‘proq itaruvchi (Arximed) kuch ta’sir qiladi?',
      v:['Temirga — u og‘irroq','Alyuminiyga — u yengilroq','Ikkalasiga teng'], t:2, top:'a2',
      izoh:'Itaruvchi kuch F<sub>A</sub> = ρ<sub>suyuq</sub>·g·V<sub>bot</sub> — jismning massasiga emas, <b>botgan qismining hajmiga</b> va suyuqlik zichligiga bog‘liq. Hajmlar teng — kuchlar ham teng.'},
    simob: {s:'Temir (po‘lat) jism simobga tashlansa nima bo‘ladi?',
      v:['Cho‘kadi — metall og‘ir','Suzadi','Simobda erib ketadi'], t:1, top:'a5',
      izoh:'Temir zichligi (7800) simobnikidan (13 600 kg/m³) kichik — shuning uchun temir simobda <b>suzadi</b>. Jism cho‘kadimi yoki suzadimi — bu “og‘ir-yengil”ga emas, <b>zichliklar nisbatiga</b> bog‘liq.'},
    mayatnik: {s:'Mayatnik sharchasining massasini 2 marta oshirsak, tebranish davri qanday o‘zgaradi?',
      v:['Ortadi — og‘ir sharcha sekin','Kamayadi — og‘ir sharcha tez','O‘zgarmaydi'], t:2, top:'m2',
      izoh:'Matematik mayatnik davri T = 2π√(l/g) — formulada massa yo‘q. Og‘irroq sharchaga kattaroq kuch ta’sir qiladi, lekin uni tezlatish ham shuncha qiyin: ta’sirlar bir-birini yo‘qotadi.'},
    kalor: {s:'300 g 20 °C li suvga 100 g 80 °C li suv quyildi. Aralashma harorati qanday bo‘ladi?',
      v:['Aniq 50 °C — o‘rtachasi','50 °C dan past','50 °C dan yuqori'], t:1, top:'k2',
      izoh:'Issiqlik balansi: c·m₁·(t₁ − θ) = c·m₂·(θ − t₂). Sovuq suv 3 marta ko‘p — θ = (100·80 + 300·20) / 400 = <b>35 °C</b>, sovuq suv haroratiga yaqinroq. O‘rtacha 50 °C faqat massalar teng bo‘lganda chiqadi.'},
    om: {s:'Manba kuchlanishi o‘zgarmaydi. Zanjirdagi rezistor qarshiligini 2 marta oshirsak, tok kuchi qanday o‘zgaradi?',
      v:['O‘zgarmaydi — manba doim bir xil tok beradi','2 marta kamayadi','2 marta ortadi'], t:1, top:'o3',
      izoh:'Om qonuni: I = U / R. Manba zanjirga bir xil <b>kuchlanish</b> beradi, tok kuchi esa zanjir qarshiligiga bog‘liq: U o‘zgarmasa, R 2 marta ortganda I <b>2 marta kamayadi</b>. «Manba doim bir xil tok beradi» — keng tarqalgan xato tushuncha.'},
    linza: {s:'Yig‘uvchi linzadan buyum fokus masofasidan yaqinroq (d < F) qo‘yildi. Tasvir qanday bo‘ladi?',
      v:['Haqiqiy, teskari, kichraygan','Mavhum, to‘g‘ri, kattalashgan','Tasvir umuman hosil bo‘lmaydi'], t:1, top:'l4',
      izoh:'d < F bo‘lsa linzadan chiqqan nurlar <b>tarqaladi</b> — ular haqiqatda kesishmaydi, ko‘z ularning davomini buyum tomonda ko‘radi: tasvir <b>mavhum, to‘g‘ri va kattalashgan</b>. Lupa shunday ishlaydi. Tasvir hosil bo‘lmaydigan holat — faqat d = F.'}
  },
  /* Om qonuni: rezistorlar nominali (Ω) va rangli halqalari (4 halqa: 1-raqam, 2-raqam, ko‘paytuvchi, aniqlik ±5 % — oltin; IEC 60062) */
  REZISTOR: {
    2:  {h:['qizil','qora','oltin']},
    4:  {h:['sariq','qora','oltin']},
    5:  {h:['yashil','qora','oltin']},
    10: {h:['jigarrang','qora','qora']},
    20: {h:['qizil','qora','qora']}
  },
  HALQA_RANG: {qora:'#1b1b1b', jigarrang:'#7a4a1e', qizil:'#d63a2f', sariq:'#f2c230', yashil:'#2f9e4f', oltin:'#c9a13b'},
  /* maktab laboratoriya asboblariga yaqin chegaralar (sxematik): ampermetr 0–3 A, voltmetr 0–15 V; rezistor quvvati 5 W */
  OM_CHEGARA: {I:3, V:15, P:5},
  /* Linza (v3.19): chegaralar sm da; maktab to‘plamidagi linzalar F ≈ 5–30 sm (sxematik diapazon) */
  LINZA: {Fmin:5, Fmax:30, dmin:2, dmax:60},
  TAJRIBA: [
    {id:'arximed', nom:'Arximed kuchi va suzish sharti', sinf:'7-sinf', qisqa:'Dinamometr, suyuqlik, turli jismlar',
     top:[
       {id:'a1', matn:'Temir jismni <b>suvga to‘liq</b> botiring va «O‘lchovni yozish»ni bosing — dinamometr kamroq ko‘rsatadi.'},
       {id:'a2', matn:'Bir xil hajmli <b>temir</b> va <b>alyuminiy</b> jismni suvga to‘liq botirib, ikkalasini yozing. F<sub>A</sub> ni solishtiring.'},
       {id:'a3', matn:'Shu jismni <b>kerosinga</b> to‘liq botirib yozing — itaruvchi kuch suvdagidan kichikmi?'},
       {id:'a4', matn:'Ipni kesib, suvda <b>suzadigan</b> 2 xil jismni toping.'},
       {id:'a5', matn:'Temir jismni <b>simobga</b> tashlang (ipni kesing). Bashoratingiz to‘g‘ri chiqdimi?'}
     ]},
    {id:'mayatnik', nom:'Matematik mayatnik', sinf:'9-sinf', qisqa:'Ip uzunligi, massa, sayyora',
     top:[
       {id:'m1', matn:'Ip uzunligi <b>1 m</b>, Yerda: 10 ta tebranish vaqtini o‘lchang. T ≈ 2 s chiqadimi?'},
       {id:'m2', matn:'Uzunlikni o‘zgartirmay, <b>massani</b> kamida 2 marta o‘zgartirib yana o‘lchang.'},
       {id:'m3', matn:'Ip uzunligini <b>4 marta</b> oshirib (masalan 0,5 → 2 m) o‘lchang — davr necha marta ortdi?'},
       {id:'m4', matn:'Mayatnikni <b>Oyga</b> olib boring va davrni o‘lchang.'},
       {id:'m5', matn:'Amplitudani <b>45°</b> dan katta qilib o‘lchang — davr formuladagidan farq qiladimi?'}
     ]},
    {id:'kalor', nom:'Issiqlik balansi (kalorimetr)', sinf:'8-sinf', qisqa:'Issiq va sovuq suvni aralashtirish',
     top:[
       {id:'k1', matn:'<b>100 g 80 °C</b> li suvni <b>100 g 20 °C</b> li suvga quying. Aralashma harorati?'},
       {id:'k2', matn:'Massalari kamida <b>2 marta farq qiladigan</b> suvlarni aralashtiring — θ qaysi haroratga yaqin?'},
       {id:'k3', matn:'«Metall + suv» rejimida qizdirilgan metallni suvga tushiring. Suv harorati ko‘p o‘zgardimi?'},
       {id:'k4', matn:'Aralashtirishdan <b>oldin</b> θ ni o‘zingiz hisoblab yozing — ±1 °C aniqlikda to‘g‘ri toping.'}
     ]},
    {id:'om', nom:'Om qonuni (elektr zanjiri)', sinf:'8-sinf', qisqa:'Ampermetr, voltmetr, rezistorlar',
     top:[
       {id:'o1', matn:'Kalitni ulang: <b>U = 4,5 V</b>, bitta <b>R = 10 Ω</b> rezistor. Tok kuchini o‘lchab yozing — I = U/R bilan mos keldimi?'},
       {id:'o2', matn:'Rezistorni almashtirmay, kuchlanishni kamida <b>3 xil</b> qiymatda o‘lchang. I(U) grafigi qanday chiziq?'},
       {id:'o3', matn:'Kuchlanishni o‘zgartirmay, qarshilikni <b>2 marta</b> oshirib (yoki kamaytirib) o‘lchang. Tok necha marta o‘zgardi?'},
       {id:'o4', matn:'Ikki rezistorni <b>ketma-ket</b> ulang va voltmetrni avval R₁ ga, keyin R₂ ga ulab o‘lchang: U₁ + U₂ = U mi?'},
       {id:'o5', matn:'Rezistorlarni <b>parallel</b> ulab o‘lchang: umumiy tok har bir tarmoqdagi tokdan kattami?'}
     ]},
    {id:'linza', nom:'Linza va tasvir yasash', sinf:'8-sinf', qisqa:'Yig‘uvchi/sochuvchi linza, 3 nur, 1/F = 1/d + 1/f',
     top:[
       {id:'l1',  matn:'Yig‘uvchi linzada buyumni <b>d = 2F</b> ga qo‘yib yozing: tasvir ham 2F da, teng va teskari bo‘ladimi?'},
       {id:'l2',  matn:'<b>d > 2F</b> holatini yozing — tasvir haqiqiy, teskari, <b>kichraygan</b> (fotoapparat).'},
       {id:'l3',  matn:'<b>F < d < 2F</b> holatini yozing — tasvir haqiqiy, teskari, <b>kattalashgan</b> (proyektor).'},
       {id:'l4',  matn:'<b>d < F</b> holatini yozing — tasvir mavhum, to‘g‘ri, kattalashgan (lupa). Bashoratingiz to‘g‘rimi?'},
       {id:'l5',  matn:'Buyumni aynan <b>d = F</b> ga qo‘yib yozing — nurlar parallel chiqadi, tasvir hosil bo‘lmaydi.'},
       {id:'l6',  matn:'<b>Sochuvchi</b> linzaga o‘tib istalgan d da yozing — tasvir qanday?'},
       {id:'l7',  matn:'Sochuvchi linzada F ni o‘zgartirmay d ni kamida <b>2 marta</b> o‘zgartirib yana yozing — tasvir doim mavhum va kichikmi?'},
       {id:'l8',  matn:'Yig‘uvchi linzada <b>F = 10 sm</b> qilib yozing — optik kuch D = 1/F = 10 dptr.'},
       {id:'l9',  matn:'Bir xil d (d > 2F) da F ni <b>2 marta</b> oshirib (masalan 10 → 20 sm) yozing — f qanday o‘zgardi?'},
       {id:'l10', matn:'Yozishdan <b>oldin</b> f ni formuladan hisoblab kiriting — ±5 % aniqlikda to‘g‘ri toping.'},
       {id:'l11', matn:'Yig‘uvchi linzada haqiqiy tasvir <b>Γ = 2</b> bo‘lgan holatni toping (maslahat: d = 1,5F).'},
       {id:'l12', matn:'<b>d = 3F</b> holatini yozing — f = 1,5F chiqadimi?'},
       {id:'l13', matn:'Lupa rejimida (d < F) kattalashtirish <b>Γ ≥ 3</b> bo‘lgan holatni toping.'},
       {id:'l14', matn:'Mavhum tasvir holatida <b>ekranni qo‘ying</b> — ekranda tasvir chiqadimi?'},
       {id:'l15', matn:'Sochuvchi linzada <b>F = 20 sm</b> (D = −5 dptr) bilan yozing.'},
       {id:'l16', matn:'Bir xil F va d da <b>yig‘uvchi</b> va <b>sochuvchi</b> linza natijasini yozib solishtiring.'}
     ]}
  ]
};
