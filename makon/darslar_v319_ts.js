/* MAKON v3.19 — «ts» guruhi: Texnologiya (7) va Tasviriy san’at (7) darslari, yangi fan e’lonlari, detal kartalari va bog‘lash.
   index.html da darslar_v315_kbg.js dan KEYIN yuklanadi; sahnalar — lib/sahna_v319_ts.js (MAKON_SAHNA['ts_*']).
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytilgan; tekshirilmagani «taxminiy».
   Test oxiridagi tur:'3d' savol sahnani `tsUq` holatida quradi (sahna shu maydonni o‘zi o‘qiydi).
   Manba bo‘laklari: ekran\v319_ts\d1.js … d4.js, yig‘ish: node ekran\v319_ts\yig.cjs */
(function(){
const FAN = window.MAKON_FAN, D = window.MAKON_DARS;
if(!FAN || !D) return;
/* ---------- yangi fanlar (yopiq fanlardan oldin) ---------- */
const fanQosh = f=>{ if(FAN.some(x=>x.id === f.id)) return; const yopiqI = FAN.findIndex(x=>x.yopiq); FAN.splice(yopiqI < 0 ? FAN.length : yopiqI, 0, f); };
fanQosh({id:'texnologiya', nom:'Texnologiya', rang:'#7fd1b9', ik:'asbob', izoh:'Materiallar, mexanizmlar, elektr xavfsizligi, robototexnika', tavsif:'Yog‘och va birikmalar, uy elektr tarmog‘i va avtomat, tishli uzatmalar, tikuv mashinasi, 3D modellashtirish va robot qo‘l — hammasi interaktiv 3D da. Xavfsizlik qoidalari rasmiy yo‘riqnomalar bo‘yicha.', mavzular:[]});
/* v3.20c: Tasviriy san'at fani OLIB TASHLANDI (egasi so'rovi) — darslar zaxirada manba/zaxira_v319/darslar_v319_ts_sanat_bilan.js */
/* yangi ikonlar (app3.js → IK ro‘yxatiga ulanadi; 24×24, faqat chiziqlar) */
const IKON = window.MAKON_IKON = window.MAKON_IKON || {};
IKON.asbob = '<path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9"/><path d="M15 3l6 6"/><path d="M3 21l3-3"/>';
IKON.palitra ='<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2.5-1.5H17a4 4 0 0 0 4-4c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>';

const F = id=>FAN.find(f=>f.id === id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom === nom || x.dars === dars || (eskiNomlar || []).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
const ish = (sinf, tur, usul, maq, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba)=>({sinf, vaqt:'45 daqiqa', tur, usul, maqsad:{talimiy:maq[0], tarbiyaviy:maq[1], rivojlantiruvchi:maq[2]}, natijalar, jihozlar, bosqichlar, lugat, savollar, uy, manba});
const T3 = (s, hodisa, kalit, togri, v, izoh)=>({tur:'3d', s, hodisa, kalit, togri, v, t:0, izoh});
const MW = 'Wikipedia (inglizcha)';
const TX5 = '5-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Yog‘ochga ishlov berish» bo‘limi';
const TX6 = '6-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Elektrotexnika ishlari» bo‘limi';
const TX7 = '7-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Mashinashunoslik elementlari» bo‘limi';
const TX8 = '8-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Tikuvchilik» bo‘limi';
const TX9 = '9-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Zamonaviy texnologiyalar» bo‘limi';
const TX10 = '10-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Robototexnika asoslari» bo‘limi';
const TX11 = '11-sinf «Texnologiya» darsligi (O‘zbekiston, amaldagi nashr) — «Loyiha faoliyati» bo‘limi';
const ELEKTR_Q = 'Elektr qurilmalarini o‘rnatish qoidalari (PUE/ПУЭ, 7-nashr, 7.1-bob) va IEC 60364-7-701 (hammom zonalari)';

/* ================================================================
   T1. YOG‘OCH MATERIALLAR VA BIRIKMALAR — 5-sinf
   ================================================================ */
D['tx-yogoch'] = {
  fan:'texnologiya', qisqaNom:'Yog‘och materiallar', nom:'Yog‘och materiallar va birikmalar', sinf:'5-sinf',
  qisqa:'5-sinf · Texnologiya · «Yog‘ochga ishlov berish»',
  sahna:'ts_yogoch',
  tsUq:{korinish:'fanera', ajrat:true},
  kor:{
    sarlavha:'Daraxtdan taxtagacha — va yana taxtadan buyumgacha',
    matn:'G‘o‘lani ko‘ndalang kessak, markazdagi o‘zak atrofida halqalar ko‘rinadi — har bir halqa daraxtning bir yilda o‘sgan qatlami. Tashqarida po‘stloq, uning ostida yupqa kambiy qatlami bor: daraxt aynan shu yerda qalinlashadi. G‘o‘la uzunasiga arralanib taxta, brus, reyka olinadi; yupqa shponlarni yelimlab fanera, qirindini presslab DSP tayyorlanadi. Buyum yig‘ishda detallar mix, shurup, yelim, shkant yoki tirnoqli birikma bilan ulanadi. Sahnada materialni almashtiring va qismlarni bosing.',
    punktlar:['<b>Yillik halqa:</b> bahor-yozda o‘sgan och, kuzda o‘sgan to‘q qatlam — ikkisi birga bir yil','<b>Tilingan materiallar:</b> taxta (kenglik qalinlikdan 2 martadan ko‘p), brus, reyka','<b>Plitalar:</b> fanera — toq sonli shpon qatlamlari ko‘ndalang; DSP — qirindi va smola','<b>Birikmalar:</b> mix, shurup, yelim, shkant, tirnoq — har birining o‘z joyi bor']
  },
  bolimlar:[
    {sarlavha:'Yog‘och materiallar', jadval:[
      ['G‘o‘la','daraxt tanasining shoxlardan tozalangan qismi'],
      ['Taxta','tilingan material: kengligi qalinligidan 2 martadan ko‘p'],
      ['Brus','kengligi qalinligidan 2 martadan ko‘p bo‘lmagan tilingan material'],
      ['Shpon','yupqa (taxminan 1–3 mm) yog‘och varaq — fanera va qoplama uchun'],
      ['Fanera','toq sonli shpon qatlamlari (3, 5, 7…), tolalari ko‘ndalang yelimlangan'],
      ['DSP','yog‘och-qirindili plita: qirindi + sintetik smola, presslangan']
    ]},
    {sarlavha:'Birikma turlari (qachon qaysi biri)', jadval:[
      ['Mix','tez, arzon; qayta ajratish qiyin; chetdan 10–15 mm masofa (yorilmasligi uchun)'],
      ['Shurup','mustahkam, qayta ajratiladi; qattiq yog‘ochda oldindan teshik'],
      ['Yelim (PVA)','ko‘rinmas birikma; qisqichda quritiladi; faqat yelim — uzoq vaqt bosim kerak'],
      ['Shkant','dumaloq yog‘och tayoqcha, yelim bilan; mebelda'],
      ['Tirnoq (ship)','detallar bir-biriga kiradi; qutilar, tortmalar uchun eng mustahkam']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'G‘o‘la kesimi: o‘zak, halqalar, po‘stloq', matn:'Ko‘ndalang kesimda markazda o‘zak, atrofida yillik halqalar, tashqarida po‘stloq. Och qatlam — bahor-yoz, to‘q qatlam — kuz yog‘ochi; ikkisi birga bir yil. Halqalarni sanab daraxt yoshini bilish mumkin.', holat:{korinish:'kesim'}},
    {sarlavha:'Kambiy — daraxt qayerda o‘sadi', matn:'Po‘stloq ostidagi yupqa yashil qatlam — kambiy. Daraxt tanasi aynan shu qatlamda yangi hujayralar hosil qilib qalinlashadi. Po‘stloq atrofidan kesilsa, daraxt qurib qoladi.', holat:{korinish:'kesim'}},
    {sarlavha:'Tilingan materiallar', matn:'G‘o‘la uzunasiga arralanadi: taxta (keng va yupqa), brus (kvadratga yaqin kesim), reyka (yupqa va tor). Yuzadagi chiziqlar — tolalar yo‘nalishi; tolalar bo‘ylab yo‘nish oson, ko‘ndalang arralash qiyinroq.', holat:{korinish:'taxta'}},
    {sarlavha:'Fanera: qatlamlar ko‘ndalang', matn:'Shponlar yelim bilan shunday yopishtiriladiki, har keyingi qatlam tolalari oldingisiga 90° burilgan bo‘ladi. Shu tufayli fanera har tomonga bir xil mustahkam va kam qiyshayadi. Qatlamlar soni toq — tashqi qatlamlar bir yo‘nalishda.', holat:{korinish:'fanera', ajrat:true}},
    {sarlavha:'DSP — qirindidan plita', matn:'Yog‘och qirindilari smola bilan aralashtirilib, issiq presslanadi; ustiga laminat yoki shpon qoplanadi. Arzon va tekis, lekin namdan shishadi va shurupni fanera kabi mahkam ushlamaydi.', holat:{korinish:'dsp'}},
    {sarlavha:'Mix va shurup', matn:'Mix bolg‘a bilan qoqiladi — tez, lekin tolalarni yorishi mumkin, shuning uchun chetdan masofa qoldiriladi. Shurup rezba bilan buraladi: mustahkam ushlaydi va qayta ajratish mumkin.', holat:{korinish:'birikma', birikma:'shurup'}},
    {sarlavha:'Yelim, shkant va tirnoq', matn:'PVA yelim toza yuzalarga yupqa surtiladi, detallar qisqichda qisib quritiladi. Shkant — teshiklarga yelim bilan kiritiladigan tayoqcha. Tirnoqli birikmada yuza katta — qutilar uchun eng mustahkam usul.', holat:{korinish:'birikma', birikma:'tirnoq'}}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Materialni va birikmani aniqlang',
    topshiriqlar:[
      {shart:'Sahnada g‘o‘la kesimi. Och va to‘q qatlamlardan iborat <b>bitta</b> juft nimani bildiradi?', holat:{korinish:'kesim'}, v:['Bir oy o‘sish','Bir yil o‘sish','Bir kun o‘sish','Daraxt turi'], t:1, izoh:'To‘g‘ri. Och (bahor-yoz) va to‘q (kuz) qatlam birga <b>bir yil</b>ni bildiradi — yillik halqa.'},
      {shart:'Sahnadagi plitaning qatlamlari ajratilgan. Bu qaysi material?', holat:{korinish:'fanera', ajrat:true}, v:['DSP','Fanera','Brus','Reyka'], t:1, izoh:'To‘g‘ri — <b>fanera</b>: shpon qatlamlari tolalari ko‘ndalang yelimlangan, soni toq.'},
      {shart:'Sahnadagi plita qirindi va smoladan presslangan. Bu — ?', holat:{korinish:'dsp'}, v:['Fanera','Taxta','DSP','Shpon'], t:2, izoh:'To‘g‘ri — <b>DSP</b> (yog‘och-qirindili plita). Ustida laminat qoplama.'},
      {shart:'Sahnada ko‘rsatilgan birikma qayta ajratib, yana yig‘ish uchun eng qulay. Bu — ?', holat:{korinish:'birikma', birikma:'shurup'}, v:['Yelimli','Shurupli','Mixli','Tirnoqli'], t:1, izoh:'To‘g‘ri — <b>shurup</b> rezba bilan buraladi va buralib chiqariladi; yelimli va tirnoqli birikmani buzmasdan ajratib bo‘lmaydi.'},
      {shart:'Sahnadagi birikmada detallar bir-biriga «tish» bilan kiradi. Qaysi buyum uchun eng mos?', holat:{korinish:'birikma', birikma:'tirnoq'}, v:['Rasm ramkasi','Quti va tortma','Shvabra dastasi','Devor tokchasi'], t:1, izoh:'To‘g‘ri — <b>tirnoqli (shipli)</b> birikma qutilar va tortmalar burchagi uchun: yuza katta, yelim bilan juda mustahkam.'}
    ]},
  test:[
    {s:'Yog‘och kesimidagi bitta och va bitta to‘q qatlam birga nimani bildiradi?', v:['Bir oy','Bir yil','Bir fasl','O‘n yil'], t:1, izoh:'Och qatlam bahor-yozda, to‘q qatlam kuzda o‘sadi — birga <b>bir yil</b> (yillik halqa).'},
    {s:'Daraxt tanasi qaysi qatlam hisobiga qalinlashadi?', v:['O‘zak','Po‘stloq','Kambiy','Yillik halqa'], t:2, izoh:'<b>Kambiy</b> — po‘stloq ostidagi yupqa hosil qiluvchi qatlam; yangi hujayralar shu yerda paydo bo‘ladi.'},
    {s:'Fanera qatlamlari soni odatda qanday bo‘ladi?', v:['Juft','Toq','Faqat 2','Faqat 4'], t:1, izoh:'<b>Toq</b> (3, 5, 7…) — shunda tashqi qatlamlar tolalari bir yo‘nalishda bo‘lib, plita qiyshaymaydi.'},
    {s:'DSP nimadan tayyorlanadi?', v:['Yupqa shponlardan','Qirindi va smoladan','Yaxlit taxtadan','Qog‘ozdan'], t:1, izoh:'DSP — yog‘och <b>qirindisi va sintetik smola</b> aralashmasi, issiq presslangan.'},
    {s:'Tilingan materialning kengligi qalinligidan 2 martadan ko‘p bo‘lsa, u nima deyiladi?', v:['Brus','Taxta','G‘o‘la','Shpon'], t:1, izoh:'<b>Taxta</b> — kengligi qalinligidan 2 martadan ko‘p; brusda bu nisbat 2 dan oshmaydi.'},
    {s:'Qaysi birikmani buzmasdan qayta ajratish eng oson?', v:['Yelimli','Shurupli','Tirnoqli','Shkantli (yelim bilan)'], t:1, izoh:'<b>Shurup</b> buraladi va buralib chiqariladi. Yelim va shkant yelim bilan doimiy birikma beradi.'},
    {s:'Mixni taxta chetiga juda yaqin qoqsak nima bo‘ladi?', v:['Mustahkamroq ushlaydi','Taxta tolalar bo‘ylab yorilishi mumkin','Mix egilmaydi','Hech narsa'], t:1, izoh:'Chetga yaqin qoqilgan mix <b>tolalarni yoradi</b>; shuning uchun chetdan masofa (taxminan 10–15 mm) qoldiriladi.'},
    {s:'PVA yelim bilan birikma qilinganda detallar nima uchun qisqichda ushlab turiladi?', v:['Yelim tezroq sovusin','Yelim qurigunicha yuzalar zich tegib tursin','Detal og‘irlashsin','Rang bersin'], t:1, izoh:'Yelim qurigunicha yuzalar <b>zich tegib turishi</b> kerak — shunda birikma mustahkam bo‘ladi.'},
    {s:'Daraxtning yoshini qanday aniqlash mumkin?', v:['Po‘stloq qalinligidan','Yillik halqalar sonidan','Tananing diametridan','Barglar sonidan'], t:1, izoh:'Ko‘ndalang kesimdagi <b>yillik halqalar soni</b> — daraxt yoshi (taxminan, iqlimga qarab halqa bir yilda bitta).'},
    T3('Sahnada qatlamlarga ajratilgan fanera turibdi. Istalgan <b>shpon qatlamini</b> bosing.', 'ts-yogoch', 'bos', ['qatlam'], ['Fanera qatlami (shpon)', 'boshqa qism'], 'Fanera <b>shpon qatlamlari</b>dan yig‘iladi: har qatlam tolalari oldingisiga ko‘ndalang.')
  ],
  yordamchi:[
    {s:'Fanera va DSP ning farqi nima?', j:'Fanera — yupqa shpon varaqlari yelimlangan plita (qatlamlar ko‘ndalang, soni toq); DSP — qirindi va smola presslangan plita. Fanera mustahkamroq va namga chidamliroq, DSP arzonroq va tekis.', kalit:['fanera','dsp','farq']},
    {s:'Qachon mix, qachon shurup?', j:'Tez va qayta ajratilmaydigan ish (yashik, taxta qoplash) — mix; mustahkam va keyin ajratish mumkin bo‘lgan birikma (mebel, ilgich) — shurup. Qattiq yog‘ochda shurup uchun oldindan ingichka teshik ochiladi.', kalit:['mix','shurup']}
  ],
  maqola:[
    {sarlavha:'Daraxt tanasi ichida nima bor', xatboshilar:[
      'Daraxt tanasini ko‘ndalang kessak, bir nechta zona ko‘rinadi. Markazda o‘zak — eng qadimgi, yumshoq qism. Uning atrofida yillik halqalar: har yili daraxt yangi qatlam o‘stiradi. Bahor va yozda hujayralar katta va devori yupqa bo‘lib, och rangli keng qatlam hosil qiladi; kuzda o‘sish sekinlashadi, hujayralar mayda va zich — to‘q, tor qatlam. Shu ikki qatlam birga bitta yillik halqa.',
      'Tashqarida po‘stloq tanani himoya qiladi. Po‘stloq ostida ko‘zga zo‘rg‘a ko‘rinadigan kambiy qatlami bor — tirik hujayralar shu yerda bo‘linadi: ichkariga yog‘och, tashqariga po‘stloq hosil qiladi. Shuning uchun po‘stlog‘i aylana bo‘ylab shilingan daraxt nobud bo‘ladi: kambiy ochilib qoladi.',
      'Halqalar kengligi yilning ob-havosiga bog‘liq: sernam yilda halqa keng, qurg‘oqchil yilda tor. Olimlar shu halqalar bo‘yicha (dendroxronologiya) o‘tmish iqlimini va yog‘och buyumlarning yoshini aniqlaydi.'
    ]},
    {sarlavha:'G‘o‘ladan materialgacha', xatboshilar:[
      'Kesilgan daraxt shoxlardan tozalanib g‘o‘laga aylanadi. G‘o‘la arra tegirmonida uzunasiga tilinadi: keng va yupqa bo‘laklar — taxta, kesimi kvadratga yaqinlari — brus, yupqa va torlari — reyka. Tilingan material quritiladi: ho‘l yog‘och qurib qisqaradi va qiyshayadi, shuning uchun mebel faqat quruq yog‘ochdan yasaladi.',
      'Yog‘ochni tejash uchun plitalar ixtiro qilingan. Fanera — g‘o‘ladan «archilgan» yupqa shpon varaqlarini yelimlab olinadi; har keyingi qatlam tolalari oldingisiga ko‘ndalang. Natijada plita har tomonga bir xil mustahkam. DSP — tilish chiqindilari va qirindilarni smola bilan presslab olinadi; ustiga laminat yoki shpon qoplanadi. Formaldegid smolasi chiqishi bo‘yicha plitalar sinflarga bo‘linadi; uy va maktab mebeli uchun E1 sinfi tanlanadi (Yevropa me’yori bo‘yicha E1 — 0,124 mg/m³ dan oshmaydi).',
      'O‘zbekistonda duradgorlikda an’anaviy ravishda chinor, yong‘oq, tut va terak yog‘ochi ishlatiladi; yong‘oq — eng qimmatli, naqshli; terak — yengil va arzon (darslik va an’anaviy hunarmandchilik ma’lumotlari).'
    ]},
    {sarlavha:'Birikmalar: nima bilan ulaymiz', xatboshilar:[
      'Mix — eng qadimgi va eng oddiy birikma. U yog‘och tolalarini surib kiradi, shuning uchun tolalar bo‘ylab yorilish xavfi bor; mixni taxta chetidan masofa qoldirib, imkon bo‘lsa biroz qiya qoqish kerak. Mixning uzunligi odatda ustki detal qalinligidan 2–3 marta uzun olinadi (darslik qoidasi).',
      'Shurup rezba bilan buraladi — tolalarni kesib ushlaydi, shuning uchun mixdan mustahkam va kerak bo‘lsa buralib chiqariladi. Qattiq yog‘ochda (yong‘oq, eman) shurupdan yupqaroq teshik oldindan ochiladi — aks holda detal yorilishi yoki shurup sinishi mumkin.',
      'Yelim birikmasi ko‘rinmas va tekis: PVA yelimi ikkala yuzaga yupqa surtilib, detallar qisqichda zich qisib quritiladi. Yelim bilan birga shkant (dumaloq tayoqcha) yoki tirnoqli birikma ishlatilsa, birikma eng mustahkam bo‘ladi — shuning uchun qutilar, tortmalar va stul oyoqlari shunday yig‘iladi.'
    ]},
    {sarlavha:'Xavfsizlik: ustaxonada', xatboshilar:[
      'Yog‘ochga ishlov berishda asosiy qoidalar: arra va iskana faqat o‘zidan narida ishlatiladi; detal verstakda mahkam qisiladi; bolg‘a bilan ishlaganda ko‘z himoya qilinadi, qirindi puflab emas, cho‘tka bilan tozalanadi. Elektr asboblar faqat o‘qituvchi ruxsati va nazorati bilan.',
      'Yelim va lak bilan ishlaganda xona shamollatiladi, qo‘l yuviladi; yelimning tayyorlovchi ko‘rsatmasidagi quritish vaqti saqlanadi.'
    ]}
  ],
  formulalar:[
    ['Yosh ≈ yillik halqalar soni','Ko‘ndalang kesimda (taxminiy)'],
    ['Taxta: b > 2h; brus: b ≤ 2h','b — kenglik, h — qalinlik'],
    ['Fanera qatlamlari = 2k + 1','toq son: 3, 5, 7…'],
    ['L(mix) ≈ (2…3) · h','mix uzunligi ustki detal qalinligiga nisbatan (darslik qoidasi)']
  ],
  qiziqarli:[
    'Dendroxronologiya — yillik halqalar bo‘yicha sana aniqlash fani; eng uzun uzluksiz halqa xronologiyalari ming yillarni qamrab oladi.',
    'Fanera bir xil og‘irlikdagi po‘latdan ba’zi yo‘nalishlarda mustahkamroq ushlaydi — shuning uchun XX asr boshida samolyot korpuslari faneradan yasalgan.',
    'Yong‘oq yog‘ochi naqshi uchun hunarmandlar tomonidan eng qimmat yog‘ochlardan biri hisoblanadi; O‘zbekistonda o‘ymakorlik buyumlari an’anaviy ravishda yong‘oq va chinordan ishlangan.',
    'Mixni qiya qoqish birikmani mustahkamlaydi — ikki qiya mix bir-biriga «ilgak» bo‘ladi.'
  ],
  lugat:[
    ['G‘o‘la','Shoxlardan tozalangan daraxt tanasi.'],
    ['Yillik halqa','Daraxtning bir yilda o‘sgan qatlami (och + to‘q).'],
    ['Kambiy','Po‘stloq ostidagi hosil qiluvchi tirik qatlam.'],
    ['Taxta','Kengligi qalinligidan 2 martadan ko‘p tilingan material.'],
    ['Brus','Kengligi qalinligidan 2 martadan ko‘p bo‘lmagan tilingan material.'],
    ['Shpon','Yupqa yog‘och varaq.'],
    ['Fanera','Ko‘ndalang yelimlangan toq sonli shpon qatlamlari.'],
    ['DSP','Yog‘och-qirindili plita.'],
    ['Shkant','Birikma uchun dumaloq yog‘och tayoqcha.'],
    ['Tirnoqli birikma','Detallar «tishlari» bir-biriga kiradigan birikma.']
  ],
  manba:TX5 + '; ' + MW + ': «Wood», «Dendrochronology», «Plywood», «Particle board» (E1 chegarasi 0,124 mg/m³ — Yevropa EN 13986 bo‘yicha, ikkilamchi manbalardan). Mix uzunligi (2–3 h) va chetdan masofa (10–15 mm) — darslik/amaliy qoida, taxminiy.',
  ishlanma:ish('5-sinf', 'Yangi bilim berish', 'Interaktiv 3D model (kesim, fanera, birikmalar), namunalar bilan ishlash, juftlikda',
    ['Yog‘och tuzilishi (o‘zak, halqa, kambiy, po‘stloq), tilingan materiallar va plitalar, birikma turlarini o‘rgatish.', 'Tabiiy resurslarni tejash, xavfsizlik qoidalariga rioya qilish ko‘nikmasini tarbiyalash.', 'Kuzatish, taqqoslash va materialni vazifaga qarab tanlash ko‘nikmasini rivojlantirish.'],
    ['Kesimdagi qismlarni nomlaydi va yillik halqani tushuntiradi','Taxta, brus, fanera, DSP ni farqlaydi','Birikma turini vazifaga qarab tanlaydi','Xavfsizlik qoidalarini aytadi'],
    ['MAKON sahnasi «Yog‘och materiallar»','Taxta, fanera, DSP namunalari','Mix, shurup, shkant, PVA yelim, qisqich','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Daraxt necha yoshda — qanday bilamiz?»','Taxmin aytadi.'],['8–18','<b>Kesim va kambiy.</b> MAKON da kesim, halqalar; namunada halqalarni sanash.','Halqalarni sanaydi, yozadi.'],['18–28','<b>Materiallar.</b> Taxta/brus/fanera/DSP — sahnada va qo‘lda.','Namunalarni taqqoslaydi, jadval to‘ldiradi.'],['28–36','<b>Birikmalar.</b> Mix, shurup, yelim, shkant, tirnoq — qachon qaysi.','Juftlikda «qaysi birikma» kartochkalarini yechadi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Yillik halqa','Bir yillik o‘sish qatlami.'],['Kambiy','Hosil qiluvchi qatlam.'],['Fanera','Ko‘ndalang shpon qatlamlari.'],['Shkant','Birikma tayoqchasi.']],
    [['Daraxt yoshi qanday aniqlanadi?','Yillik halqalar soni bo‘yicha'],['Fanera qatlamlari soni?','Toq'],['Qayta ajratiladigan birikma?','Shurupli'],['DSP nimadan?','Qirindi va smola']],
    'Darslikdagi savollar; uyda 3 ta yog‘och buyumni topib, materiali (taxta/fanera/DSP) va birikma turini jadvalga yozing.',
    TX5)
};

/* ================================================================
   T2. UY ELEKTR JIHOZLARI VA XAVFSIZLIK — 6-sinf
   ================================================================ */
D['tx-elektr'] = {
  fan:'texnologiya', qisqaNom:'Elektr xavfsizligi', nom:'Uy elektr jihozlari va xavfsizlik', sinf:'6-sinf',
  qisqa:'6-sinf · Texnologiya · «Elektrotexnika ishlari»',
  sahna:'ts_elektr',
  tsUq:{rejim:'avtomat', tok:5},
  kor:{
    sarlavha:'220 volt: foydali, lekin xatoni kechirmaydi',
    matn:'Uy tarmog‘ida kuchlanish 220/230 V, chastota 50 Hz. Tok shchitdagi avtomatik o‘chirgichdan devor ichidagi simlar orqali rozetkaga, undan vilka va kabel orqali jihozga keladi. Avtomat ikki holatda uzadi: ortiqcha yuklanishda bimetall plastina qizib egiladi (sekin), qisqa tutashuvda elektromagnit bir zumda tortadi. Yerga ulash (PE) simi korpusga faza tegib qolsa odamni himoya qiladi. Sahnada tok slayderini oshiring, qisqa tutashuvni ko‘ring, qismlarni bosing.',
    punktlar:['<b>Tarmoq:</b> 220/230 V, 50 Hz (O‘zbekistonda C va F turi rozetkalar)','<b>Avtomat:</b> bimetall (ortiqcha yuk) + elektromagnit (qisqa tutashuv) ajratgichlari','<b>Sim kesimi:</b> yoritish — mis 1,5 mm², rozetkalar — 2,5 mm² (amaldagi qoidalar)','<b>Xavfsizlik:</b> ho‘l qo‘l bilan tegmang, vilkani kabelidan tortmang, ta’mirdan oldin avtomatni o‘chiring']
  },
  bolimlar:[
    {sarlavha:'Tokning odamga ta’siri (50 Hz, taxminiy chegaralar)', jadval:[
      ['≈ 0,5 mA','sezish chegarasi'],
      ['≈ 10 mA','qo‘l o‘zi bo‘shamaydi («qo‘yib yubormaslik» chegarasi, taxminiy)'],
      ['30 mA','UZO (RCD) uzish chegarasi — hayot uchun xavfli tokdan himoya'],
      ['100 mA va undan ko‘p','yurak fibrillyatsiyasi xavfi yuqori (davomiylikka bog‘liq)']
    ]},
    {sarlavha:'Uy tarmog‘i guruhlari (mis sim, amaldagi qoidalar)', jadval:[
      ['Yoritish','1,5 mm², avtomat 10 A'],
      ['Rozetkalar','2,5 mm², avtomat 16 A'],
      ['Elektr plita','6 mm², avtomat 32 A (quvvatga qarab)'],
      ['Hammom','barcha zanjirlar 30 mA UZO orqali; rozetka vannadan ≥ 0,6 m']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Vilka va rozetka', matn:'F turi vilkada ikki dumaloq pin (faza va nol) va yon tomonda yerga ulash kontaktlari bor. Rozetka devor ichidagi L, N va PE simlariga ulanadi. Vilkani faqat korpusidan ushlab sug‘uring — kabeldan tortilsa, sim uzilib ochiq qolishi mumkin.', holat:{rejim:'vilka', tok:5}},
    {sarlavha:'Tok yo‘li: shchitdan jihozgacha', matn:'Sariq nuqtalar — tok. Avtomatdan faza simi (L) orqali rozetkaga, vilka va kabel orqali chiroqqa keladi, nol (N) orqali qaytadi. Yoritish uchun 1,5 mm², rozetkalar uchun 2,5 mm² mis sim.', holat:{rejim:'rozetka', tok:5}},
    {sarlavha:'Avtomat ichida: bimetall va elektromagnit', matn:'Avtomatda ikki ajratgich bor. Bimetall plastina tok oshganda qiziydi va egilib kontaktni ochadi — bu ortiqcha yuklanishdan himoya (sekin). Elektromagnit g‘altagi qisqa tutashuvda yadroni tortib bir zumda uzadi.', holat:{rejim:'avtomat', tok:8}},
    {sarlavha:'Ortiqcha yuklanish', matn:'Bitta rozetkaga isitgich, choynak va dazmol ulansa, tok 16 A dan oshadi: bimetall qiziydi, bir necha soniyadan keyin avtomat uzadi. Slayderni 16 A dan oshirib ko‘ring. Avtomat uzilgan bo‘lsa — avval sababni toping, keyin yoqing.', holat:{rejim:'avtomat', tok:24}},
    {sarlavha:'Qisqa tutashuv', matn:'Faza va nol bevosita tutashsa (izolyatsiya shikastlangan sim), tok yuzlab amperga oshadi. Elektromagnit ajratgich millisekundlarda uzadi — aks holda sim qizib yong‘in chiqadi.', holat:{rejim:'qisqa'}},
    {sarlavha:'Yerga ulash va UZO', matn:'Jihoz korpusiga faza tegib qolsa, PE sim orqali tok yerga oqadi va avtomat/UZO uzadi. UZO (RCD) 30 mA sizib chiqish tokini sezib uzadi — hammom va oshxona zanjirlari uchun majburiy.', holat:{rejim:'yerga', tok:5}},
    {sarlavha:'Jihoz tutab ketsa: ketma-ketlik', matn:'1) Avtomatni o‘chiring; 2) vilkani korpusidan ushlab sug‘uring; 3) kabelni tekshiring; 4) jihozni sovutib, ustaga ko‘rsating; 5) rozetkani tekshiring; 6) faqat shundan keyin avtomatni yoqing. Tok ostidagi odamga qo‘l bilan tegmang — avval tokni o‘chiring.', holat:{rejim:'avtomat', tok:0, uzildi:true}}
  ],
  amaliyot:{tur:'tartib', sarlavha:'Jihoz tutab ketdi — harakatlar tartibi', takror:'ayni',
    shartAjrat:'Elektr jihoz tutab ketdi. Harakatlarni <b>to‘g‘ri tartibda</b> bosing', shartYig:'Endi <b>xotiradan, xuddi shu tartibda</b> takrorlang (mustahkamlash)',
    qismlar:[[1, 'Shchitdagi avtomatni o‘chirish'], [2, 'Vilkani korpusidan ushlab sug‘urish (kabeldan emas)'], [3, 'Kabel va vilkani shikastga tekshirish'], [4, 'Jihozni sovutib, ustaga ko‘rsatish (o‘zi ochmaslik)'], [5, 'Rozetkani kuyish izlariga tekshirish'], [6, 'Sabab bartaraf etilgach avtomatni yoqish']]},
  test:[
    {s:'O‘zbekiston uy elektr tarmog‘ining kuchlanishi va chastotasi?', v:['110 V, 60 Hz','220/230 V, 50 Hz','380 V, 50 Hz','12 V, 50 Hz'], t:1, izoh:'Uy tarmog‘i — <b>220/230 V, 50 Hz</b> (manbalarda 220 V ham, 230 V ham keltiriladi — ikkalasi bir standart doirasida).'},
    {s:'Avtomatik o‘chirgichdagi bimetall plastina nimadan himoya qiladi?', v:['Qisqa tutashuvdan','Ortiqcha yuklanishdan','Chaqmoqdan','Kuchlanish tushishidan'], t:1, izoh:'Bimetall tok oshganda sekin qiziydi va egiladi — <b>ortiqcha yuklanish</b>dan himoya. Qisqa tutashuvni elektromagnit uzadi.'},
    {s:'Qisqa tutashuvda avtomatning qaysi qismi bir zumda ishlaydi?', v:['Bimetall plastina','Elektromagnit ajratgich','Richag','Korpus'], t:1, izoh:'<b>Elektromagnit</b> g‘altagi katta tokda yadroni tortib millisekundlarda uzadi.'},
    {s:'Rozetka guruhi uchun mis simning kesimi (amaldagi qoidalar)?', v:['0,75 mm²','1,5 mm²','2,5 mm²','10 mm²'], t:2, izoh:'Rozetkalar — <b>2,5 mm²</b> mis, avtomat 16 A; yoritish — 1,5 mm², 10 A.'},
    {s:'UZO (RCD) qanday tokda uzadi (hayot himoyasi uchun)?', v:['30 A','30 mA','3 A','300 A'], t:1, izoh:'<b>30 mA</b> sizib chiqish toki — UZO ning odamni himoya qiluvchi chegarasi.'},
    {s:'Vilkani rozetkadan qanday sug‘urish kerak?', v:['Kabeldan tortib','Korpusidan ushlab','Ho‘l qo‘l bilan tez','Pichoq bilan'], t:1, izoh:'Faqat <b>korpusidan</b> ushlab. Kabeldan tortilsa sim uzilib, ochiq qolishi mumkin.'},
    {s:'Odam tok ostida qolsa, birinchi qilinadigan ish?', v:['Qo‘li bilan tortib olish','Tokni o‘chirish (avtomat/vilka)','Suv sepish','Kutish'], t:1, izoh:'Avval <b>tokni o‘chiring</b> — aks holda yordam beruvchi ham tok ostida qoladi. Keyin tez yordam chaqiriladi.'},
    {s:'Hammomda rozetka vannadan qancha masofada bo‘lishi kerak?', v:['Istalgan joyda','Kamida 0,6 m (2-zonadan tashqari), UZO bilan','Vanna ustida','Hammomda rozetka bo‘lmaydi'], t:1, izoh:'IEC 60364-7-701 bo‘yicha rozetka 2-zonadan (vanna chetidan 0,6 m) tashqarida, <b>30 mA UZO</b> bilan. Ba’zi milliy qoidalarda masofa kattaroq (masalan, Buyuk Britaniyada 3 m).'},
    {s:'Yerga ulash (PE) simi nimaga kerak?', v:['Tokni tejash uchun','Korpusga faza tegsa tokni yerga o‘tkazib, himoya uzilishini ta’minlash','Kuchlanishni oshirish','Chiroqni yoqish'], t:1, izoh:'Korpusga faza tegib qolsa, tok <b>PE sim orqali yerga</b> oqadi va avtomat/UZO uzadi — odam emas.'},
    {s:'Avtomat uzilib qoldi. Nima qilish kerak?', v:['Darhol yoqish','Sababni topib bartaraf etish, keyin yoqish','Avtomatni kattaroqqa almashtirish','Simni to‘g‘ridan-to‘g‘ri ulash'], t:1, izoh:'Avval <b>sabab</b> (ortiqcha yuk yoki qisqa tutashuv) topiladi. Kattaroq avtomat qo‘yish — sim yonishiga olib keladi.'},
    T3('Sahnada avtomatning kesimi. Ortiqcha yuklanishda qiziydigan qismni — <b>bimetall plastinani</b> bosing.', 'ts-elektr', 'bos', ['bimetall'], ['Bimetall plastina', 'boshqa qism'], '<b>Bimetall plastina</b> — ikki metall qatlami har xil kengayadi; qizib egiladi va kontaktni ochadi.')
  ],
  yordamchi:[
    {s:'Nega avtomatni kattaroqqa almashtirish mumkin emas?', j:'Avtomat simni himoya qiladi: 2,5 mm² sim uchun 16 A. 25 A avtomat qo‘yilsa, sim 20 A da ham uzilmaydi va qizib, izolyatsiyasi eriydi — yong‘in xavfi.', kalit:['avtomat','kattaroq']},
    {s:'UZO va avtomat farqi?', j:'Avtomat katta tokdan (ortiqcha yuk, qisqa tutashuv) himoya qiladi — simni saqlaydi. UZO esa faza va nol toklari farqini (sizib chiqish, masalan, odam orqali) sezib 30 mA da uzadi — odamni saqlaydi. Ikkalasi birga kerak.', kalit:['uzo','rcd','farq']}
  ],
  maqola:[
    {sarlavha:'Uy tarmog‘i qanday tuzilgan', xatboshilar:[
      'Ko‘chadagi liniyadan uyga ikki (yoki uch) sim kiradi: faza (L) va nol (N), zamonaviy uylarda yerga ulash (PE) ham. Shchitda hisoblagich va avtomatlar turadi; har bir avtomat o‘z guruhini — yoritish, rozetkalar, oshxona, hammom — himoya qiladi. Simlar devor ichida yoki kabel kanalida yotadi va rozetka hamda chiroqlarga keladi.',
      'O‘zbekistonda uy tarmog‘i 220/230 V, 50 Hz; rozetkalar C va F turida (ikki dumaloq pin, F da yerga ulash kontakti bor). Ko‘p manbalar 220 V, ba’zilari 230 V deb yozadi — bu bir xil standart doirasidagi nominal qiymatlar.',
      'Sim kesimi tok bo‘yicha tanlanadi: amaldagi qoidalarda yoritish guruhi uchun mis 1,5 mm² (avtomat 10 A), rozetkalar uchun 2,5 mm² (16 A), elektr plita uchun 6 mm² (32 A) keng qo‘llaniladi. Sim yupqa bo‘lsa, tok uni qizdiradi — izolyatsiya eriydi.'
    ]},
    {sarlavha:'Avtomat ichida nima bor', xatboshilar:[
      'Avtomatik o‘chirgich ikkita «qo‘riqchi»dan iborat. Birinchisi — bimetall plastina: ikki xil metall qatlamidan yasalgan, tok o‘tganda qiziydi va qatlamlar har xil kengaygani uchun egiladi. Tok nominaldan (masalan, 16 A) uzoq vaqt oshib tursa, plastina kontaktni ochadi. Bu — ortiqcha yuklanishdan himoya; u sekin ishlaydi, chunki qisqa muddatli oshish (motor ishga tushganda) xavfli emas.',
      'Ikkinchisi — elektromagnit ajratgich: g‘altak va yadro. Qisqa tutashuvda tok yuzlab amperga oshadi, g‘altak yadroni bir zumda tortib kontaktni ochadi — millisekundlar ichida. Shuning uchun qisqa tutashuvda sim yonib ulgurmaydi.',
      'Avtomat simni himoya qiladi, odamni emas. Odamni UZO (RCD, differensial avtomat) himoya qiladi: u faza va nol orqali o‘tayotgan toklar farqini o‘lchaydi; farq 30 mA ga yetsa (tok odam orqali yerga ketayotgan bo‘lsa), uzadi.'
    ]},
    {sarlavha:'Tok va inson tanasi', xatboshilar:[
      'Tokning xavfi kuchlanishga emas, tana orqali o‘tadigan tok kuchiga va vaqtga bog‘liq. Ko‘p qo‘llanmalarda 50 Hz uchun taxminiy chegaralar keltiriladi: 0,5 mA — sezish, taxminan 10 mA — mushaklar qisqarib qo‘l o‘zi bo‘shamaydi, 30 mA — UZO uzish chegarasi, 100 mA va undan ko‘p — yurak fibrillyatsiyasi xavfi (IEC 60479-1 zonalari asosida; aniq qiymat davomiylik va tana holatiga bog‘liq).',
      'Ho‘l teri qarshiligi quruq teriga qaraganda ancha kichik — shuning uchun ho‘l qo‘l bilan elektr jihozga tegish, hammomda fen ishlatish xavfli. Hammomda rozetka vanna chetidan kamida 0,6 m uzoqda (2-zonadan tashqarida) va 30 mA UZO orqali bo‘lishi kerak (IEC 60364-7-701); ba’zi mamlakat qoidalarida masofa bundan katta.',
      'Odam tok ostida qolsa: unga qo‘l bilan tegmang — avval tokni o‘chiring (avtomat, vilka); iloji bo‘lmasa, quruq yog‘och yoki plastmassa bilan simni uzoqlashtiring; so‘ng tez yordam (103) chaqiring va kerak bo‘lsa yurak-o‘pka reanimatsiyasini boshlang (ERC yo‘riqnomasi).'
    ]},
    {sarlavha:'Uyda xavfsizlik qoidalari', xatboshilar:[
      'Vilkani faqat korpusidan ushlab sug‘uring; shikastlangan kabel va vilkani ishlatmang; bitta rozetkaga bir nechta quvvatli jihoz (isitgich, choynak, dazmol) ulamang; jihozni suv yaqinida ishlatmang; rozetkalarga himoya qopqoq qo‘ying (bolalar uchun).',
      'Ta’mirlash ishlari faqat avtomat o‘chirilgan va kuchlanish yo‘qligi indikator bilan tekshirilgan holda, kattalar nazoratida bajariladi. Jihoz tutab ketsa: avtomatni o‘chiring, vilkani sug‘uring, jihozni ustaga ko‘rsating.'
    ]}
  ],
  formulalar:[
    ['I = P / U','Tok kuchi: P — quvvat (Vt), U — kuchlanish (V). Choynak 2 000 Vt → ≈ 9 A'],
    ['I(jami) = I₁ + I₂ + …','Bitta rozetka guruhidagi jihozlar toklari qo‘shiladi'],
    ['I(jami) > I(avtomat) → uziladi','Bimetall ajratgich (sekin), qisqa tutashuvda elektromagnit (tez)'],
    ['R(teri, quruq) ≫ R(teri, ho‘l)','Ho‘l teri — tok ko‘p, xavf katta']
  ],
  qiziqarli:[
    'O‘zbekistonda rozetkalar C va F («yevropa») turida — vilkada ikki dumaloq pin; F turida yerga ulash kontaktlari bor.',
    'Bimetall plastina avtomatda ham, eski dazmol termostatida ham ishlaydi — ikki metallning har xil kengayishi.',
    'UZO 30 mA ni millisekundlarda sezadi — bu tok odam uchun odatda halokatli emas, shuning uchun u «hayot himoyasi» deyiladi.',
    'Chaqmoqdagi tok o‘n minglab amper — shuning uchun momaqaldiroqda daraxt ostida turish xavfli.'
  ],
  lugat:[
    ['Faza (L)','Kuchlanish ostidagi sim.'],
    ['Nol (N)','Tok qaytadigan sim.'],
    ['Yerga ulash (PE)','Korpusni yer bilan bog‘lovchi himoya simi.'],
    ['Avtomatik o‘chirgich','Ortiqcha yuk va qisqa tutashuvda zanjirni uzuvchi qurilma.'],
    ['Bimetall plastina','Qizib egiladigan ikki metalli plastina.'],
    ['Qisqa tutashuv','Faza va nolning qarshiliksiz tutashishi.'],
    ['UZO (RCD)','Sizib chiqish tokini sezib uzuvchi himoya qurilmasi.'],
    ['Nominal tok','Avtomat uzilmasdan o‘tkazadigan tok (10, 16, 25 A).'],
    ['Izolyatsiya','Simning tok o‘tkazmaydigan qoplamasi.']
  ],
  manba:TX6 + '; ' + ELEKTR_Q + '; IEC 60479-1 (tok ta’siri zonalari — chegaralar taxminiy, ikkilamchi manbalardan); CIA World Factbook (O‘zbekiston: 220 V, 50 Hz, C/F) va WorldStandards (230 V); ERC birinchi yordam yo‘riqnomasi. Sim kesimi/avtomat juftliklari — keng qo‘llaniladigan amaliy qoida (PUE 7.1.1-jadval o‘zgargan — loyihada hisob bilan tasdiqlanadi).',
  ishlanma:ish('6-sinf', 'Yangi bilim berish', 'Interaktiv 3D sxema (vilka, rozetka, avtomat kesimi), muammoli vaziyat, xavfsizlik ketma-ketligi mashqi',
    ['Uy tarmog‘i tuzilishi, avtomat va UZO ishlashi, sim kesimi va xavfsizlik qoidalarini o‘rgatish.', 'Ehtiyotkorlik, qoidaga rioya qilish va mas’uliyatni tarbiyalash.', 'Sabab-oqibatni tahlil qilish, xavfli vaziyatda to‘g‘ri harakat algoritmini qo‘llash ko‘nikmasini rivojlantirish.'],
    ['Tok yo‘lini (shchit → rozetka → jihoz) tushuntiradi','Avtomatning ikki ajratgichini farqlaydi','Sim kesimi va avtomat nominalini mos qo‘yadi','Jihoz tutab ketganda harakat tartibini biladi'],
    ['MAKON sahnasi «Uy elektr tarmog‘i»','Rozetka, vilka, avtomat namunalari (tokdan uzilgan)','Indikator-otvertka','Darslik, xavfsizlik plakati'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Avtomat nega uzildi?» vaziyati.','Taxmin aytadi.'],['8–18','<b>Tok yo‘li va rozetka.</b> MAKON: vilka, rozetka, L/N/PE.','Sxemani daftarga chizadi.'],['18–28','<b>Avtomat ichida.</b> Bimetall va elektromagnit; ortiqcha yuk va qisqa tutashuv.','Slayder bilan sinaydi, kuzatuvni yozadi.'],['28–36','<b>Xavfsizlik.</b> Tok ta’siri, UZO, hammom qoidasi, tutab ketganda tartib.','Ketma-ketlikni tuzadi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti (tartib) va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Avtomat','Zanjirni uzuvchi himoya.'],['Bimetall','Qizib egiladigan plastina.'],['UZO','Sizib chiqish tokidan himoya.'],['PE','Yerga ulash simi.']],
    [['Rozetka guruhi simi?','2,5 mm², 16 A'],['UZO chegarasi?','30 mA'],['Qisqa tutashuvni kim uzadi?','Elektromagnit'],['Tok ostidagi odamga birinchi yordam?','Avval tokni o‘chirish']],
    'Darslikdagi savollar; uydagi shchitni (kattalar bilan) ko‘rib, avtomatlar nominalini va qaysi guruhni himoya qilishini jadvalga yozing (shchitni ochmang, faqat yozuvlarni o‘qing).',
    TX6 + '; ' + ELEKTR_Q)
};

/* ================================================================
   T3. MEXANIK UZATMALAR — 7-sinf
   ================================================================ */
D['tx-uzatma'] = {
  fan:'texnologiya', qisqaNom:'Mexanik uzatmalar', nom:'Mexanik uzatmalar: tishli g‘ildirak, tasma, zanjir', sinf:'7-sinf',
  qisqa:'7-sinf · Texnologiya · «Mashinashunoslik elementlari»',
  sahna:'ts_uzatma',
  tsUq:{rejim:'tishli', z1:12, z2:36, n1:60},
  kor:{
    sarlavha:'Kichik g‘ildirak tez, katta g‘ildirak kuchli',
    matn:'Uzatma — harakatni bir valdan ikkinchisiga o‘tkazuvchi mexanizm. Tishli uzatmada tishlar bir-biriga ilashadi: kichik g‘ildirak (z₁ = 12) bir marta aylanganda katta g‘ildirak (z₂ = 36) uchdan bir marta aylanadi. Uzatish nisbati i = z₂/z₁ = 3: tezlik 3 marta kamayadi, aylantiruvchi moment esa (ishqalanishsiz) 3 marta ortadi. Tasmali va zanjirli uzatmalar uzoq vallarni bog‘laydi. Sahnada z₁, z₂ va n₁ ni o‘zgartiring — animatsiya va hisob darhol yangilanadi.',
    punktlar:['<b>Uzatish nisbati:</b> i = n₁/n₂ = z₂/z₁ (tishli, zanjirli), i = D₂/D₁ (tasmali)','<b>i &gt; 1</b> — pasaytiruvchi (tezlik kamayadi, moment ortadi); <b>i &lt; 1</b> — oshiruvchi','<b>Yo‘nalish:</b> tishli juftlikda g‘ildiraklar qarama-qarshi, tasma va zanjirda — bir xil tomonga aylanadi','<b>Tasma</b> sirpanishi mumkin (himoya!), <b>zanjir</b> va <b>tishli</b> — sirpanmaydi']
  },
  bolimlar:[
    {sarlavha:'Uzatma turlari', jadval:[
      ['Tishli','vallar yaqin; aniq, sirpanmaydi; qarama-qarshi aylanish; moy kerak'],
      ['Tasmali','vallar uzoq; jim ishlaydi; ortiqcha yukda sirpanadi (himoya); i = D₂/D₁'],
      ['Zanjirli','vallar uzoq; sirpanmaydi; velosiped; i = z₂/z₁'],
      ['Chervyakli','katta i (10–100) bir pog‘onada; o‘z-o‘zidan tormozlanadi']
    ]},
    {sarlavha:'Namuna hisoblar (tekshirilgan)', jadval:[
      ['z₁ = 12, z₂ = 36','i = 3; n₁ = 60 → n₂ = 20 ayl/min'],
      ['z₁ = 20, z₂ = 10','i = 0,5; n₂ = 2n₁ — tezlik 2 marta ortadi'],
      ['D₁ = 100 mm, D₂ = 300 mm','tasma: i = 3 (sirpanishsiz)'],
      ['Velosiped: oldingi 48, orqa 16','i = 16/48 = 1/3 — pedal 1 aylansa, g‘ildirak 3 marta'],
      ['Ikki pog‘ona: i₁ = 2, i₂ = 3','umumiy i = i₁ · i₂ = 6']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Tishli juftlik: tishlar ilashadi', matn:'Ikkala g‘ildirakning tishlari bir xil kattalikda (bir xil modul) — shundagina ular ilashadi. Yetaklovchi g‘ildirak (chap, kulrang) aylanganda yetaklanuvchi (o‘ng, sariq) qarama-qarshi tomonga aylanadi. Oq belgilar bo‘yicha aylanishlarni sanang.', holat:{rejim:'tishli', z1:12, z2:36, n1:60}},
    {sarlavha:'Uzatish nisbati i = z₂/z₁', matn:'z₁ = 12, z₂ = 36: kichik g‘ildirak 3 marta aylanganda katta bir marta aylanadi — i = 3. n₁ = 60 ayl/min bo‘lsa, n₂ = 60/3 = 20 ayl/min. Tezlik kamaydi, lekin moment 3 marta ortdi (ishqalanishsiz).', holat:{rejim:'tishli', z1:12, z2:36, n1:60}},
    {sarlavha:'Oshiruvchi uzatma: i < 1', matn:'Endi yetaklovchi katta (z₁ = 30), yetaklanuvchi kichik (z₂ = 10): i = 10/30 ≈ 0,33 — tezlik 3 marta ortadi, moment 3 marta kamayadi. Tegirmon va velosipedda shunday.', holat:{rejim:'tishli', z1:30, z2:10, n1:40}},
    {sarlavha:'Teng g‘ildiraklar: i = 1', matn:'z₁ = z₂ bo‘lsa, i = 1: tezlik o‘zgarmaydi, faqat aylanish yo‘nalishi teskari bo‘ladi va harakat boshqa valga o‘tadi.', holat:{rejim:'tishli', z1:20, z2:20, n1:60}},
    {sarlavha:'Tasmali uzatma', matn:'Ikki shkiv tasma bilan bog‘langan: ikkalasi bir tomonga aylanadi, i = D₂/D₁. Tasma ishqalanish bilan ishlaydi — ortiqcha yukda sirpanadi va mexanizmni sinishdan saqlaydi; lekin aniq hisob uchun yaroqsiz. Shkiv diametrlarini o‘zgartiring.', holat:{rejim:'tasma', z1:12, z2:30, n1:60}},
    {sarlavha:'Zanjirli uzatma', matn:'Zanjir yulduzchalar tishlariga ilashadi — sirpanmaydi, uzoq vallarni bog‘laydi. Velosipedda pedal yulduzchasi 48, orqa g‘ildirak yulduzchasi 16 tishli bo‘lsa, i = 1/3: pedal bir aylansa, g‘ildirak uch marta.', holat:{rejim:'zanjir', z1:36, z2:12, n1:60}},
    {sarlavha:'Ko‘p pog‘onali uzatma', matn:'Katta nisbat kerak bo‘lsa, uzatmalar ketma-ket ulanadi: umumiy i = i₁ · i₂ · …. Masalan, 2 va 3 → 6. Soat mexanizmi, reduktor va avtomobil uzatmalar qutisida shunday.', holat:{rejim:'tishli', z1:10, z2:40, n1:120}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Uzatmani hisoblang va yig‘ing', holat:{rejim:'tishli', z1:20, z2:20, n1:60},
    topshiriqlar:[
      {shart:'Tishli uzatmada <b>i = 2</b> hosil qiling (z₂ = 2·z₁).', hodisa:'ts-uzatma', kod:"ev.rejim==='tishli' && Math.abs(ev.i-2)<1e-6", izoh:'To‘g‘ri — masalan, <b>z₁ = 15, z₂ = 30</b>: tezlik 2 marta kamayadi.'},
      {shart:'<b>Oshiruvchi</b> tishli uzatma yig‘ing: i = 0,5.', hodisa:'ts-uzatma', kod:"ev.rejim==='tishli' && Math.abs(ev.i-0.5)<1e-6", izoh:'To‘g‘ri — <b>z₁ = 2·z₂</b>: yetaklanuvchi 2 marta tez aylanadi.'},
      {shart:'n₁ = 60 ayl/min da yetaklanuvchi val <b>n₂ = 20 ayl/min</b> bilan aylansin (istalgan tur).', hodisa:'ts-uzatma', kod:"ev.n1===60 && Math.abs(ev.n2-20)<1e-6", izoh:'To‘g‘ri — <b>i = 3</b>: masalan z₁ = 12, z₂ = 36.'},
      {shart:'<b>Tasmali</b> uzatmaga o‘ting va D₂/D₁ = 3 qiling.', hodisa:'ts-uzatma', kod:"ev.rejim==='tasma' && Math.abs(ev.i-3)<1e-6", izoh:'To‘g‘ri — tasmali uzatmada <b>i = D₂/D₁</b>; shkivlar bir tomonga aylanadi.'},
      {shart:'Sahnada <b>yetaklanuvchi</b> (o‘ngdagi) g‘ildirak yoki shkivni bosing.', hodisa:'ts-uzatma', kod:"ev.bos==='g2' || ev.bos==='shkiv2' || ev.bos==='yulduz2'", izoh:'To‘g‘ri — yetaklanuvchi g‘ildirak harakatni <b>oladi</b>; yetaklovchi — beradi.'}
    ]},
  test:[
    {s:'Tishli uzatmaning uzatish nisbati qanday hisoblanadi?', v:['i = z₁/z₂','i = z₂/z₁','i = z₁ · z₂','i = z₁ + z₂'], t:1, izoh:'<b>i = z₂/z₁</b> = n₁/n₂ — yetaklanuvchi tishlar soni yetaklovchiga bo‘linadi.'},
    {s:'z₁ = 12, z₂ = 36. Yetaklovchi 60 ayl/min bo‘lsa, yetaklanuvchi?', v:['180 ayl/min','20 ayl/min','60 ayl/min','3 ayl/min'], t:1, izoh:'i = 36/12 = 3; n₂ = 60/3 = <b>20 ayl/min</b>.'},
    {s:'i > 1 bo‘lgan uzatmada nima bo‘ladi?', v:['Tezlik ortadi, moment kamayadi','Tezlik kamayadi, moment ortadi','Ikkalasi ortadi','Hech narsa o‘zgarmaydi'], t:1, izoh:'<b>Pasaytiruvchi</b> uzatma: tezlik i marta kamayadi, moment (ishqalanishsiz) i marta ortadi.'},
    {s:'Tishli juftlikda g‘ildiraklar qaysi tomonga aylanadi?', v:['Bir tomonga','Qarama-qarshi tomonga','Faqat soat mili bo‘yicha','Navbat bilan'], t:1, izoh:'Tashqi ilashishdagi tishli juftlik <b>qarama-qarshi</b> aylanadi; tasma va zanjirda — bir tomonga.'},
    {s:'Qaysi uzatma ortiqcha yukda sirpanib, mexanizmni saqlaydi?', v:['Tishli','Zanjirli','Tasmali','Chervyakli'], t:2, izoh:'<b>Tasma</b> ishqalanish bilan ishlaydi — ortiqcha yukda sirpanadi. Tishli va zanjirli sirpanmaydi.'},
    {s:'Tasmali uzatmada i qanday topiladi?', v:['Shkiv diametrlari nisbati D₂/D₁','Tasma uzunligidan','Tishlar sonidan','Shkiv og‘irligidan'], t:0, izoh:'<b>i = D₂/D₁</b> (sirpanishsiz); tishlar yo‘q.'},
    {s:'Velosipedda pedal yulduzchasi 48, orqa yulduzcha 16 tishli. Pedal 1 marta aylansa, g‘ildirak?', v:['1/3 marta','3 marta','48 marta','16 marta'], t:1, izoh:'i = 16/48 = 1/3 — oshiruvchi: g‘ildirak <b>3 marta</b> aylanadi.'},
    {s:'Ikki pog‘onali reduktorda i₁ = 2, i₂ = 3. Umumiy nisbat?', v:['5','6','1,5','0,5'], t:1, izoh:'Pog‘onalar ketma-ket: i = i₁ · i₂ = <b>6</b>.'},
    {s:'Ikki tishli g‘ildirak ilashishi uchun nima bir xil bo‘lishi shart?', v:['Tishlar soni','Tish kattaligi (modul)','Rangi','Vallar uzunligi'], t:1, izoh:'<b>Modul</b> (tish kattaligi) bir xil bo‘lsagina tishlar bir-biriga kiradi; tishlar soni har xil bo‘lishi mumkin.'},
    T3('Sahnada tishli juftlik. Harakatni <b>oluvchi</b> — yetaklanuvchi (katta, sariq) g‘ildirakni bosing.', 'ts-uzatma', 'bos', ['g2'], ['Yetaklanuvchi g‘ildirak (z₂ = 36)', 'boshqa qism'], 'Yetaklanuvchi g‘ildirak <b>z₂ = 36</b>: i = 36/12 = 3, u 3 marta sekin aylanadi.')
  ],
  yordamchi:[
    {s:'Nega katta g‘ildirak sekin aylanadi?', j:'Ikkala g‘ildirakning tishlari bir xil tezlikda o‘tadi (ilashgan). Katta g‘ildirakda tishlar ko‘p — bir aylanish uchun ko‘proq tish o‘tishi kerak, shuning uchun u z₂/z₁ marta sekin aylanadi.', kalit:['sekin','katta']},
    {s:'Moment nima uchun ortadi?', j:'Quvvat saqlanadi (ishqalanishsiz): P = M·ω. Tezlik ω i marta kamaysa, moment M i marta ortadi. Shuning uchun pasaytiruvchi uzatma og‘ir yukni ko‘taradi.', kalit:['moment','kuch']}
  ],
  maqola:[
    {sarlavha:'Uzatma nima uchun kerak', xatboshilar:[
      'Dvigatel odatda tez aylanadi, lekin g‘ildirak, burg‘u yoki kran barabaniga sekin va kuchli aylanish kerak. Harakatni bir valdan ikkinchisiga, kerakli tezlik va yo‘nalishda o‘tkazuvchi mexanizm uzatma deyiladi. Uzatmalar aylanish tezligini, momentni va yo‘nalishni o‘zgartiradi, ba’zan aylanishni to‘g‘ri chiziqli harakatga aylantiradi (reyka, vint).',
      'Eng muhim ko‘rsatkich — uzatish nisbati i = n₁/n₂: yetaklovchi val tezligining yetaklanuvchi tezligiga nisbati. Tishli va zanjirli uzatmada u tishlar soni orqali: i = z₂/z₁; tasmali uzatmada shkiv diametrlari orqali: i = D₂/D₁ (sirpanishsiz). i > 1 — pasaytiruvchi (reduktor), i < 1 — oshiruvchi (multiplikator).'
    ]},
    {sarlavha:'Tishli, tasmali, zanjirli', xatboshilar:[
      'Tishli uzatma eng aniq: tishlar ilashadi, sirpanish yo‘q. Ilashish uchun ikkala g‘ildirak tishlari bir xil kattalikda (modulda) bo‘lishi shart. Tashqi ilashishda g‘ildiraklar qarama-qarshi aylanadi; vallar yaqin joylashadi; moylash kerak. Soat, reduktor, avtomobil uzatmalar qutisi — tishli.',
      'Tasmali uzatma ishqalanishga tayanadi: tasma shkivlarni o‘rab turadi, ikkalasi bir tomonga aylanadi. U jim ishlaydi, uzoq vallarni bog‘laydi va ortiqcha yukda sirpanib mexanizmni saqlaydi — lekin aynan shu sirpanish aniq hisobga xalaqit beradi. Tishli tasma (generator, printer) bu kamchilikni yo‘qotadi.',
      'Zanjirli uzatma yulduzchalar va zanjirdan iborat: sirpanmaydi, uzoq vallarni bog‘laydi, katta kuchni o‘tkazadi — velosiped, mototsikl, konveyer. Kamchiligi — shovqin va moylash zarurati.'
    ]},
    {sarlavha:'Hisoblash va ko‘p pog‘ona', xatboshilar:[
      'z₁ = 12, z₂ = 36 bo‘lsa, i = 3: yetaklovchi 60 ayl/min da yetaklanuvchi 20 ayl/min. Quvvat saqlangani uchun (P = M·ω) moment 3 marta ortadi — shuning uchun reduktorli dvigatel og‘ir yukni ko‘taradi. Velosipedda esa teskari: pedal yulduzchasi 48, orqa 16 — i = 1/3, g‘ildirak pedaldan 3 marta tez aylanadi.',
      'Bir juftlikda juda katta nisbat olish noqulay (g‘ildirak ulkan bo‘ladi). Shuning uchun uzatmalar ketma-ket ulanadi: umumiy nisbat pog‘onalar nisbatlari ko‘paytmasi, i = i₁ · i₂ · …. Soat mexanizmida bir necha pog‘ona soat milini minut milidan 12 marta sekin aylantiradi.'
    ]}
  ],
  formulalar:[
    ['i = n₁ / n₂','Uzatish nisbati (n — aylanishlar soni, ayl/min)'],
    ['i = z₂ / z₁','Tishli va zanjirli uzatma (z — tishlar soni)'],
    ['i = D₂ / D₁','Tasmali uzatma (sirpanishsiz)'],
    ['n₂ = n₁ / i','Yetaklanuvchi val tezligi'],
    ['M₂ ≈ M₁ · i','Moment (ishqalanishsiz)'],
    ['i = i₁ · i₂ · …','Ko‘p pog‘onali uzatma']
  ],
  qiziqarli:[
    'Antikitera mexanizmi (mil. av. II–I asr, Yunoniston) — o‘nlab bronza tishli g‘ildirakdan iborat qadimgi «hisoblagich»; u Oy va Quyosh holatini ko‘rsatgan.',
    'Velosipeddagi «tezliklar» — aslida har xil tishli yulduzchalar: nisbatni almashtirib, tepalikka chiqishda moment, tekis yo‘lda tezlik olinadi.',
    'Chervyakli uzatma bir pog‘onada 100 gacha nisbat beradi va o‘zi tormozlanadi — lift va shlagbaumlarda ishlatiladi.',
    'Soat mexanizmida minut mili soat milidan aynan 12 marta tez aylanadi — tishli pog‘onalar yig‘indisi i = 12.'
  ],
  lugat:[
    ['Uzatma','Harakatni bir valdan ikkinchisiga o‘tkazuvchi mexanizm.'],
    ['Yetaklovchi','Harakatni beruvchi g‘ildirak/val.'],
    ['Yetaklanuvchi','Harakatni oluvchi g‘ildirak/val.'],
    ['Uzatish nisbati (i)','n₁/n₂ = z₂/z₁.'],
    ['Modul','Tish kattaligini belgilovchi o‘lcham; ilashuvchi g‘ildiraklarda bir xil.'],
    ['Reduktor','Tezlikni pasaytiruvchi uzatma (i > 1).'],
    ['Shkiv','Tasmali uzatma g‘ildiragi.'],
    ['Yulduzcha','Zanjirli uzatma tishli g‘ildiragi.'],
    ['Moment','Aylantiruvchi kuch ta’siri (N·m).']
  ],
  manba:TX7 + '; ' + MW + ': «Gear», «Gear train», «Belt (mechanical)», «Chain drive», «Antikythera mechanism». Hisoblar sahnada formulalar bo‘yicha tekshirilgan.',
  ishlanma:ish('7-sinf', 'Yangi bilim berish', 'Interaktiv 3D uzatma (animatsiya), hisob mashqi, juftlikda',
    ['Uzatma turlari, uzatish nisbati i = z₂/z₁ (D₂/D₁), tezlik va moment o‘zgarishini o‘rgatish.', 'Texnik aniqlik va hisobni tekshirish odatini tarbiyalash.', 'Modelda kuzatib qonuniyatni keltirib chiqarish ko‘nikmasini rivojlantirish.'],
    ['Uzatma turlarini farqlaydi va yo‘nalishini aytadi','i ni tishlar/diametrlar bo‘yicha hisoblaydi','n₂ ni n₁ va i dan topadi','Ko‘p pog‘onali nisbatni hisoblaydi'],
    ['MAKON sahnasi «Mexanik uzatmalar»','Konstruktor tishli g‘ildiraklari yoki velosiped','Darslik, kalkulyator'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Velosiped: pedal bir aylansa, g‘ildirak necha marta?','Taxmin aytadi.'],['8–18','<b>Tishli uzatma.</b> MAKON: z₁, z₂, animatsiya; i = z₂/z₁.','Oq belgi bo‘yicha aylanishlarni sanaydi.'],['18–28','<b>Tasma va zanjir.</b> Yo‘nalish, sirpanish, i = D₂/D₁.','Jadval to‘ldiradi.'],['28–36','<b>Hisob.</b> n₂ = n₁/i; ko‘p pog‘ona.','Masalalar yechadi, sahnada tekshiradi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Uzatish nisbati','n₁/n₂ = z₂/z₁.'],['Reduktor','Pasaytiruvchi uzatma.'],['Shkiv','Tasma g‘ildiragi.'],['Modul','Tish kattaligi.']],
    [['z₁ = 15, z₂ = 45 → i?','3'],['n₁ = 90, i = 3 → n₂?','30 ayl/min'],['Tasmada i qanday?','D₂/D₁'],['Tishli juftlik yo‘nalishi?','Qarama-qarshi']],
    'Darslikdagi masalalar; uyda velosiped yoki qo‘l tegirmonidagi uzatma tishlarini sanab i ni hisoblang.',
    TX7)
};

/* ================================================================
   T4. TIKUV MASHINASI — 8-sinf
   ================================================================ */
D['tx-tikuv'] = {
  fan:'texnologiya', qisqaNom:'Tikuv mashinasi', nom:'Tikuv mashinasi: tuzilishi va ip o‘tkazish', sinf:'8-sinf',
  qisqa:'8-sinf · Texnologiya · «Tikuvchilik»',
  sahna:'ts_tikuv',
  tsUq:{qadam:3, korinish:'butun'},
  kor:{
    sarlavha:'Ikki ip bir-birini mato ichida ilib oladi',
    matn:'Uy tikuv mashinasi ikki ipli (chelnokli) chok tikadi: yuqori ip g‘altakdan ignaga keladi, pastki ip moki ichidagi shpulkada turadi. Igna yuqori ipni mato ostiga olib tushadi, aylanuvchi moki ilgagi halqani ilib, pastki ip atrofidan o‘tkazadi — ikki ip o‘zaro bog‘lanadi. Ip yo‘li 6 qadam: g‘altak → yo‘naltirgich → tortish regulyatori → ip tortuvchi richag → igna bardagi yo‘naltirgich → igna ko‘zi. Sahnada qadamlarni bosing va «Moki» ko‘rinishida ilgak ishini kuzating.',
    punktlar:['<b>Asosiy qismlar:</b> platforma, ustun, yeng, bosh; qo‘l g‘ildiragi, igna, bosim panjasi, igna plastinasi, matoni surgich','<b>Yuqori ip yo‘li:</b> 6 qadam, tartib buzilsa chok sakraydi yoki ip uziladi','<b>Moki va shpulka:</b> pastki ip; chok ikki ip bog‘lanishidan hosil bo‘ladi','<b>Xavfsizlik:</b> barmoqlar ignadan uzoq, mashinani faqat o‘chirilgan holda ipdan o‘tkazish va tozalash']
  },
  bolimlar:[
    {sarlavha:'Mashina qismlari va vazifasi', jadval:[
      ['Qo‘l g‘ildiragi (maxovik)','mexanizmni qo‘lda aylantirish; igna holatini o‘zgartirish'],
      ['Igna va igna bar','yuqori ipni mato ostiga olib tushadi'],
      ['Ip tortuvchi richag','ipni berib-tortib, chokni tortadi'],
      ['Tortish regulyatori','tarelkalar orasidan o‘tgan ip tarangligini sozlaydi'],
      ['Bosim panjasi (lapka)','matoni plastinaga bosib turadi'],
      ['Matoni surgich (tishlar)','matoni har chokdan keyin oldinga suradi'],
      ['Moki va shpulka','pastki ip; ilgak yuqori ip halqasini ilib oladi']
    ]},
    {sarlavha:'Chok nuqsonlari va sabablari (darslik)', jadval:[
      ['Chok sakraydi','igna egilgan/o‘tmas, ip yo‘li noto‘g‘ri'],
      ['Yuqori ip uziladi','tortish juda qattiq, igna noto‘g‘ri o‘rnatilgan'],
      ['Chok ostida ip halqalari','yuqori ip tortish juda bo‘sh'],
      ['Mato yig‘iladi','tortish juda qattiq, surgich holati']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Mashina tuzilishi', matn:'Platforma, ustun (o‘ngda), yeng (gorizontal) va bosh (chapda) — bu asosiy korpus. Boshda igna bar va bosim panjasi, ustunda qo‘l g‘ildiragi, yeng ustida g‘altak ustuni. Qismlarni bosing.', holat:{qadam:0, korinish:'butun', ish:true}},
    {sarlavha:'1–2-qadam: g‘altak va yo‘naltirgich', matn:'Yuqori ip g‘altakdan boshlanadi va yeng ustidagi yo‘naltirgichdan o‘tadi — u ipning yo‘nalishini to‘g‘rilaydi.', holat:{qadam:2, korinish:'butun'}},
    {sarlavha:'3-qadam: tortish regulyatori', matn:'Ip ikki tarelka orasidan o‘tadi; tugma ularni qisadi — ip tarangligi sozlanadi. Juda qattiq bo‘lsa ip uziladi, bo‘sh bo‘lsa chok ostida halqalar hosil bo‘ladi.', holat:{qadam:3, korinish:'butun'}},
    {sarlavha:'4-qadam: ip tortuvchi richag', matn:'Richag yuqoriga ko‘tarilganda ipni tortib chokni mahkamlaydi, pastga tushganda ignaga ip beradi. Ip richag ko‘zidan o‘tkazilmasa, chok hosil bo‘lmaydi.', holat:{qadam:4, korinish:'butun'}},
    {sarlavha:'5–6-qadam: igna bardagi yo‘naltirgich va igna ko‘zi', matn:'Ip igna bardagi yo‘naltirgichdan o‘tib, igna ko‘ziga o‘tkaziladi — ko‘p uy mashinalarida olddan orqaga (mashina modeliga qarang). Igna ko‘zi uchiga yaqin — bu tikuv ignasining oddiy ignadan farqi.', holat:{qadam:6, korinish:'butun'}},
    {sarlavha:'Moki: chok qanday hosil bo‘ladi', matn:'Asos shaffof. Igna yuqori ipni plastina ostiga olib tushadi; igna ko‘tarilganda ip halqa hosil qiladi, aylanuvchi moki ilgagi halqani ilib, shpulka atrofidan o‘tkazadi. Ip tortuvchi richag halqani yuqoriga tortadi — ikki ip mato ichida bog‘lanadi.', holat:{qadam:6, korinish:'moki', ish:true}},
    {sarlavha:'Xavfsizlik', matn:'Ip o‘tkazish, igna almashtirish va tozalashda mashina o‘chirilgan bo‘lsin. Barmoqlar ignadan kamida 5–10 sm uzoqda; matoni tortmang — surgich o‘zi suradi. Ishdan oldin sochni yig‘ing, qo‘l g‘ildiragini faqat o‘zingizga tomon aylantiring (ko‘p mashinalarda).', holat:{qadam:0, korinish:'butun', ish:false}}
  ],
  amaliyot:{tur:'tartib', sarlavha:'Yuqori ipni o‘tkazish tartibi',
    shartAjrat:'Yuqori ip yo‘lining qadamlarini <b>to‘g‘ri tartibda</b> bosing (sahna shu qadamni yoritadi)', shartYig:'Endi <b>teskari tartibda</b> — ipni mashinadan chiqarish (ignadan g‘altakkacha)',
    qismlar:[[1, 'G‘altak (g‘altak ustunida)'], [2, 'Ip yo‘naltirgich (yeng ustida)'], [3, 'Tortish regulyatori tarelkalari'], [4, 'Ip tortuvchi richag ko‘zi'], [5, 'Igna bardagi yo‘naltirgich'], [6, 'Igna ko‘zi']]},
  test:[
    {s:'Uy tikuv mashinasi qanday chok tikadi?', v:['Bir ipli zanjir chok','Ikki ipli (chelnokli) chok','Qo‘l choki','Yelimli chok'], t:1, izoh:'Yuqori ip (g‘altak) va pastki ip (shpulka) mato ichida bog‘lanadi — <b>ikki ipli chelnok choki</b>.'},
    {s:'Pastki ip qayerda turadi?', v:['G‘altakda','Shpulkada (moki ichida)','Ignada','Richagda'], t:1, izoh:'Pastki ip <b>shpulka</b>ga o‘raladi va moki (ilgak) ichiga qo‘yiladi.'},
    {s:'Ip tortuvchi richagning vazifasi?', v:['Matoni surish','Ipni berib-tortib chokni mahkamlash','Ignani ushlash','Tezlikni boshqarish'], t:1, izoh:'<b>Richag</b> pastga tushganda ip beradi, ko‘tarilganda halqani tortib chokni mahkamlaydi.'},
    {s:'Yuqori ip juda qattiq tortilgan bo‘lsa, nima bo‘ladi?', v:['Chok ostida halqalar','Yuqori ip uziladi, mato yig‘iladi','Chok uzayadi','Hech narsa'], t:1, izoh:'Qattiq tortish — <b>ip uziladi</b> yoki mato yig‘iladi; bo‘sh tortish — chok ostida halqalar.'},
    {s:'Yuqori ip yo‘lida tortish regulyatoridan keyin nima keladi?', v:['G‘altak','Ip tortuvchi richag','Igna ko‘zi','Shpulka'], t:1, izoh:'Tartib: g‘altak → yo‘naltirgich → regulyator → <b>richag</b> → igna bardagi yo‘naltirgich → igna.'},
    {s:'Tikuv mashinasi ignasining oddiy ignadan asosiy farqi?', v:['Uzunroq','Ko‘zi uchiga yaqin','Ko‘zi yo‘q','Ikki uchli'], t:1, izoh:'Mashina ignasida <b>ko‘z uchiga yaqin</b> — shunda ip mato ostida halqa hosil qiladi.'},
    {s:'Matoni har chokdan keyin kim suradi?', v:['Tikuvchi qo‘li','Surgich tishlari (plastina ostida)','Igna','G‘altak'], t:1, izoh:'<b>Matoni surgich</b> — plastinadagi tishli reyka. Matoni qo‘l bilan tortish ignani sindiradi.'},
    {s:'Ip o‘tkazish va igna almashtirishda nima shart?', v:['Mashina ishlab tursin','Mashina o‘chirilgan bo‘lsin','Pedal bosilgan bo‘lsin','Chiroq o‘chiq bo‘lsin'], t:1, izoh:'Xavfsizlik: <b>mashina o‘chirilgan</b>, barmoqlar ignadan uzoq.'},
    {s:'Birinchi amaliy ikki ipli (lockstitch) mashina kimga tegishli va patenti qachon?', v:['Thimonnier, 1830 (zanjir chok)','Elias Howe, 1846','Singer, 1900','Edison, 1880'], t:1, izoh:'<b>Elias Howe 1846</b> yilda ikki ipli chok mashinasini patentlagan; Thimonnier 1830 da zanjir chok mashinasini patentlagan; Walter Hunt 1830-yillarda (1832–1834, manbalarda farq qiladi) patentsiz ikki ipli mashina yasagan.'},
    T3('Sahnada ip tarangligini sozlaydigan qismni — <b>tortish regulyatori tarelkalarini</b> bosing.', 'ts-tikuv', 'bos', ['regulyator'], ['Tortish regulyatori', 'boshqa qism'], '<b>Regulyator</b> — ikki tarelka va tugma; tugma qisilsa ip tarangroq o‘tadi.')
  ],
  yordamchi:[
    {s:'Chok nega sakraydi?', j:'Ko‘pincha igna o‘tmas yoki egilgan, yoki yuqori ip yo‘li noto‘g‘ri (richag o‘tkazib yuborilgan). Ignani yangisiga almashtiring va ipni 6 qadam bo‘yicha qayta o‘tkazing.', kalit:['sakraydi','chok']},
    {s:'Shpulkaga ipni qanday o‘rash kerak?', j:'Shpulka g‘altak o‘rash moslamasiga qo‘yiladi, ip bir necha marta qo‘l bilan o‘raladi, keyin mashina (igna bar o‘chirilgan holda) aylantiriladi. Tekis va zich o‘rash kerak — aks holda pastki ip tarangligi notekis bo‘ladi.', kalit:['shpulka','o‘rash']}
  ],
  maqola:[
    {sarlavha:'Tikuv mashinasi tarixi', xatboshilar:[
      'Birinchi ishlaydigan tikuv mashinalaridan birini fransuz tikuvchisi Bartelemi Timonye 1830-yilda patentlagan — u ilgak shaklidagi igna bilan zanjir chok tikardi (ba’zi manbalar 1829 deb yozadi). Tikuvchilar ishsiz qolishdan qo‘rqib, uning ustaxonasini vayron qilishgan.',
      'Amerikalik Uolter Xant 1830-yillarda (manbalarda 1832–1834) ikki ipli chok mashinasini yasagan, lekin patent olmagan. 1846-yilda Elias Xau ko‘zi uchida bo‘lgan igna va plastina ostidagi moki bilan ikki ipli mashinani patentladi. Ayzek Singer 1851-yilda oyoq pedali va uzluksiz tikish imkonini qo‘shib, mashinani ommaviy qildi; patent nizolaridan keyin ixtirochilar «patent birlashmasi» tuzdi.',
      'Bugungi uy mashinalari ham xuddi o‘sha tamoyilda ishlaydi: yuqori ip, pastki ip va ularni bog‘lovchi moki.'
    ]},
    {sarlavha:'Chok qanday hosil bo‘ladi', xatboshilar:[
      'Igna yuqori ipni matodan o‘tkazib plastina ostiga tushiradi. Igna biroz ko‘tarilganda ip mato ostida kichik halqa hosil qiladi. Aynan shu paytda aylanuvchi moki ilgagi halqani ilib oladi va uni shpulka (pastki ip) atrofidan aylantirib o‘tkazadi. So‘ng ip tortuvchi richag yuqori ipni tortib, halqani mato ichiga yig‘adi: ikki ip bir-birini ilgan holda qotadi. Matoni surgich matoni bir chok uzunligiga suradi — va sikl takrorlanadi.',
      'Ikkala ip tarangligi teng bo‘lsa, bog‘lanish nuqtasi mato qalinligining o‘rtasida bo‘ladi — chok ikki tomondan bir xil ko‘rinadi. Yuqori ip juda tarang bo‘lsa, pastki ip ustga chiqadi; bo‘sh bo‘lsa — ostda halqalar.'
    ]},
    {sarlavha:'Ip o‘tkazish tartibi va nuqsonlar', xatboshilar:[
      'Yuqori ip yo‘li ko‘p mashinalarda bir xil mantiqda: g‘altak → yeng ustidagi yo‘naltirgich → tortish regulyatori tarelkalari (ip tarelkalar orasiga kirishi shart) → ip tortuvchi richag ko‘zi → igna bardagi yo‘naltirgich → igna ko‘zi (uy mashinalarining ko‘pida olddan orqaga; modelga qarang). Richag o‘tkazib yuborilsa, mashina chok tikmaydi.',
      'Ko‘p uchraydigan nuqsonlar: chok sakraydi (igna o‘tmas, egilgan yoki noto‘g‘ri o‘rnatilgan), yuqori ip uziladi (tortish juda qattiq, igna ko‘zi o‘tkir qirrali), ostda halqalar (tortish bo‘sh yoki ip tarelkalar orasiga kirmagan), mato yig‘iladi (tortish qattiq). Nuqsonni topishning birinchi qadami — ipni qayta o‘tkazish va ignani almashtirish.'
    ]},
    {sarlavha:'Xavfsizlik va parvarish', xatboshilar:[
      'Ishdan oldin: soch yig‘iladi, keng yenglar shimariladi; mashina atrofi tartibli. Ish vaqtida: barmoqlar ignadan uzoq, matoni tortmaslik, ko‘z — ignada. Ip o‘tkazish, igna almashtirish, moki tozalash — faqat mashina o‘chirilgan holda. Elektr mashina shikastlangan sim bilan ishlatilmaydi.',
      'Parvarish: moki va surgich atrofini cho‘tka bilan tozalash, ko‘rsatilgan nuqtalarni moylash (tayyorlovchi yo‘riqnomasi bo‘yicha), ishdan keyin mashinani yopish.'
    ]}
  ],
  formulalar:[
    ['Chok uzunligi = surgich bir qadami','1 chok — igna bir marta tushib-chiqishi'],
    ['Tarangliklar teng → tugun mato o‘rtasida','Yuqori va pastki ip muvozanati'],
    ['Igna raqami ↔ mato qalinligi','Yupqa mato — ingichka igna (masalan, 70–80), qalin — 100–110 (taxminiy, mashina yo‘riqnomasi)']
  ],
  qiziqarli:[
    'Elias Xau igna ko‘zini uchiga yaqin qo‘yish g‘oyasini tush ko‘rganini aytib bergan deyiladi — bu rivoyat, manbalarda tasdiqlanmagan.',
    'Timonyening ustaxonasini 1831-yilda g‘azablangan tikuvchilar vayron qilgan — ular mashina ishni tortib oladi deb qo‘rqishgan.',
    'Singer kompaniyasi XIX asrdayoq mashinani bo‘lib-bo‘lib to‘lashga sotgan — bu uy texnikasini kreditga sotishning ilk namunalaridan.',
    'Sanoat tikuv mashinalari daqiqasiga bir necha ming chok tikadi — uy mashinasidan bir necha marta tez.'
  ],
  lugat:[
    ['Moki (chelnok)','Pastki ipni ushlab, yuqori ip halqasini iluvchi aylanuvchi ilgak.'],
    ['Shpulka','Pastki ip o‘raladigan kichik g‘altakcha.'],
    ['Ip tortuvchi richag','Ipni berib-tortuvchi tebranuvchi qism.'],
    ['Tortish regulyatori','Ip tarangligini sozlovchi tarelkalar.'],
    ['Bosim panjasi (lapka)','Matoni plastinaga bosib turuvchi qism.'],
    ['Surgich','Matoni oldinga suruvchi tishli reyka.'],
    ['Igna plastinasi','Igna tushadigan teshikli metall plastina.'],
    ['Maxovik','Qo‘l g‘ildiragi.'],
    ['Ikki ipli chok','Yuqori va pastki ip bog‘lanishidan hosil bo‘ladigan chok.']
  ],
  manba:TX8 + '; ' + MW + ': «Sewing machine», «Lockstitch», «Barthélemy Thimonnier», «Elias Howe», «Isaac Singer», «Walter Hunt»; British Library blogi «Sewing machines: who really invented them». Xant mashinasi yili manbalarda 1832–1834, Timonye patenti 1829/1830 — matnda ikkalasi.',
  ishlanma:ish('8-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D mashina (ip yo‘li qadamlari, moki ko‘rinishi), ko‘rsatma, amaliy mashq',
    ['Tikuv mashinasi qismlari, yuqori ip yo‘li, chok hosil bo‘lishi va nuqsonlarini o‘rgatish.', 'Mehnat madaniyati, tartiblilik va xavfsizlik ko‘nikmalarini tarbiyalash.', 'Ketma-ketlikni eslab qolish va texnik nuqsonni tahlil qilish ko‘nikmasini rivojlantirish.'],
    ['Mashina qismlarini nomlaydi','Yuqori ipni 6 qadam bo‘yicha o‘tkazadi','Chok hosil bo‘lishini tushuntiradi','Chok nuqsoni sababini topadi'],
    ['MAKON sahnasi «Tikuv mashinasi»','Tikuv mashinasi, ip, mato bo‘laklari','Darslik, xavfsizlik yo‘riqnomasi'],
    [['0–3','<b>Tashkiliy qism, xavfsizlik.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Ikki ip bir-birini qanday ushlaydi?»','Taxmin aytadi.'],['8–16','<b>Tuzilish.</b> MAKON: qismlar, vazifasi.','Qismlarni bosib nomlaydi.'],['16–26','<b>Ip yo‘li.</b> 6 qadam sahnada, so‘ng haqiqiy mashinada.','Ipni o‘tkazadi (o‘chirilgan mashinada).'],['26–34','<b>Moki.</b> Chok hosil bo‘lishi; nuqsonlar jadvali.','Kuzatadi, jadvalni to‘ldiradi.'],['34–43','<b>Mustahkamlash.</b> MAKON amaliyoti (tartib) va test; to‘g‘ri chok tikish.','Amaliyot, test, chok tikadi.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Moki','Pastki ip ilgagi.'],['Shpulka','Pastki ip g‘altakchasi.'],['Richag','Ipni tortuvchi qism.'],['Regulyator','Taranglik sozlagich.']],
    [['Pastki ip qayerda?','Shpulkada'],['Regulyatordan keyin?','Richag'],['Ip qattiq tortilsa?','Uziladi'],['Igna almashtirishda?','Mashina o‘chirilgan']],
    'Darslikdagi savollar; uyda (kattalar bilan) tikuv mashinasida ip yo‘lini 6 qadam bo‘yicha o‘tkazing va to‘g‘ri chok tiking; nuqson bo‘lsa sababini yozing.',
    TX8)
};


/* ================================================================
   T5. 3D MODELLASHTIRISH ASOSLARI — 9-sinf
   ================================================================ */
D['tx-3d'] = {
  fan:'texnologiya', qisqaNom:'3D modellashtirish', nom:'3D modellashtirish asoslari va 3D printer', sinf:'9-sinf',
  qisqa:'9-sinf · Texnologiya · «Zamonaviy texnologiyalar»',
  sahna:'ts_qurish',
  tsUq:{rejim:'printer', pr:12, prIsh:false},
  kor:{
    sarlavha:'Oddiy shakllardan murakkab buyumgacha',
    matn:'Har qanday 3D model oddiy jismlardan — primitivlardan boshlanadi: quti (parallelepiped), silindr, shar. Ularning o‘lchami (x, y, z bo‘yicha) va joyi beriladi, jismlar birlashtiriladi yoki biridan ikkinchisi «ayiriladi». Tayyor model STL faylga yoziladi, dastur uni qatlamlarga kesadi (slicing), 3D printer qatlamma-qatlam chop etadi. Sahnada «+ Quti/Silindr/Shar» bilan detal qo‘shing, o‘lchamini bering; «3D printer» rejimida chop etishni kuzating.',
    punktlar:['<b>Primitivlar:</b> quti, silindr, shar, konus — o‘lcham va joy bilan','<b>Koordinatalar:</b> x (kenglik), y (balandlik), z (chuqurlik); o‘lcham mm da','<b>Fayl:</b> STL — yuza uchburchaklari; dastur qatlamlarga kesadi','<b>FDM printer:</b> plastik ip (PLA ~190–220 °C) eritilib, 0,1–0,3 mm qatlamlar bilan yotqiziladi']
  },
  bolimlar:[
    {sarlavha:'Modellashtirish bosqichlari', jadval:[
      ['1. Eskiz','qog‘ozda buyum ko‘rinishi va o‘lchamlari'],
      ['2. Primitivlar','quti/silindr/shar — o‘lcham (mm) va joy (x; y; z)'],
      ['3. Yig‘ish','birlashtirish, ayirish (teshik), kesishma'],
      ['4. Eksport','STL (uchburchaklar) yoki OBJ'],
      ['5. Slicing','qatlamlar, to‘ldirish (%), tayanchlar, harorat'],
      ['6. Chop etish','FDM: qatlamma-qatlam; keyin tozalash']
    ]},
    {sarlavha:'3D printer turlari', jadval:[
      ['FDM / FFF','plastik ip eritiladi — maktab va uy printerlari'],
      ['SLA','suyuq smola lazer/nur bilan qotiriladi — aniq, kichik detallar'],
      ['SLS','kukun lazer bilan pishiriladi — sanoat'],
      ['Metall (DMLS)','metall kukun — aviatsiya, tibbiyot']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Primitivlar: quti, silindr, shar', matn:'Uch oddiy jism. Har birining o‘lchami va markazining joyi (x; y; z) bor. Sahnada 1 katak = 5 mm; detalni bosib tanlang, slayderlar bilan o‘zgartiring.', holat:{rejim:'qur', det:[{tur:'quti', w:1.2, h:1, d:1.2, x:-1.3}, {tur:'sil', w:1, h:1.2, x:0}, {tur:'shar', w:1, x:1.3}]}},
    {sarlavha:'O‘lcham va masshtab', matn:'Bitta quti: kenglik 20 mm, balandlik 8 mm, chuqurlik 14 mm. Modelda o‘lchamlar haqiqiy millimetrlarda beriladi — printer aynan shu o‘lchamda chop etadi.', holat:{rejim:'qur', det:[{tur:'quti', w:2, h:.8, d:1.4, x:0}]}},
    {sarlavha:'Stakan: silindr', matn:'Stakan — balandligi diametridan katta silindr (ichini «ayirish» amali bilan bo‘shatish — murakkabroq dasturlarda). Sahnada diametr 12 mm, balandlik 20 mm.', holat:{rejim:'qur', det:[{tur:'sil', w:1.2, h:2, x:0}]}},
    {sarlavha:'Stol: quti + 4 silindr', matn:'Stol usti — yupqa quti; oyoqlar — 4 ta ingichka silindr burchaklarda. Oyoqlar balandligi bir xil, ustki quti ularning ustida (y = oyoq balandligi).', holat:{rejim:'qur', det:[{tur:'quti', w:2.6, h:.2, d:1.6, x:0, y:1.2}, {tur:'sil', w:.2, h:1.2, x:-1.1, z:-.6}, {tur:'sil', w:.2, h:1.2, x:1.1, z:-.6}, {tur:'sil', w:.2, h:1.2, x:-1.1, z:.6}, {tur:'sil', w:.2, h:1.2, x:1.1, z:.6}]}},
    {sarlavha:'Qatlamlarga kesish (slicing)', matn:'Dastur modelni gorizontal qatlamlarga kesadi (odatda 0,1–0,3 mm) va har qatlam uchun ekstruder yo‘lini hisoblaydi. To‘ldirish foizi (infill) ichki panjarani belgilaydi — 20 % ko‘p buyum uchun yetarli.', holat:{rejim:'printer', pr:0, prIsh:false}},
    {sarlavha:'FDM printer ishlamoqda', matn:'Ekstruder qizdirilgan nozul orqali PLA ipini eritib (taxminan 190–220 °C), qatlamni yotqizadi; stol yoki ekstruder bir qatlam balandligiga ko‘tariladi. Stakan pastdan yuqoriga «o‘sadi».', holat:{rejim:'printer', pr:0, prIsh:true}},
    {sarlavha:'Tarix: 1984 — 1989 — bugun', matn:'Chak Xall 1984-yilda stereolitografiya (SLA) patentini topshirdi (1986 da berildi) va STL formatini yaratdi. Skott Kramp FDM usulini 1989-yilda patentladi (ba’zi manbalar: topshirilgan 1988, berilgan 1992) va Stratasys kompaniyasini tuzdi. Bugun FDM printerlar maktab va uylarda.', holat:{rejim:'printer', pr:40, prIsh:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Stakan va stol yig‘ing', holat:{rejim:'qur', toza:true},
    topshiriqlar:[
      {shart:'Sahnaga <b>silindr</b> qo‘shing.', hodisa:'ts-qurish', kod:"ev.turlar.sil>=1", izoh:'To‘g‘ri — silindr qo‘shildi. Endi uni stakanga aylantiramiz.'},
      {shart:'Silindrni <b>stakan</b> qiling: balandligi diametridan kamida 1,5 marta katta bo‘lsin.', hodisa:'ts-qurish', kod:"ev.detallar.some(d=>d.tur==='sil' && d.h>=d.w*1.5-1e-6)", izoh:'To‘g‘ri — <b>balandlik ≥ 1,5·diametr</b>: stakan nisbati.'},
      {shart:'<b>Stol</b> yig‘ing: kamida 1 ta quti (usti) va 4 ta silindr (oyoqlar).', hodisa:'ts-qurish', kod:"ev.turlar.quti>=1 && ev.turlar.sil>=4", izoh:'To‘g‘ri — quti + 4 silindr. Oyoqlarni burchaklarga, qutini ularning ustiga (y) qo‘ying.'},
      {shart:'Stol ustini oyoqlar ustiga ko‘taring: qutining <b>y ≥ 10 mm</b> bo‘lsin.', hodisa:'ts-qurish', kod:"ev.detallar.some(d=>d.tur==='quti' && d.y>=1-1e-6)", izoh:'To‘g‘ri — usti <b>oyoqlar balandligida</b>. Modelda detallar bir-biriga tegib turishi kerak.'},
      {shart:'«3D printer» rejimiga o‘tib, chop etishni <b>oxirigacha</b> kuzating (40 qatlam).', hodisa:'ts-qurish', kod:"ev.rejim==='printer' && ev.tayyor===true", izoh:'To‘g‘ri — <b>40 qatlam</b> yotqizildi: qatlamma-qatlam qurish — additiv texnologiya.'}
    ]},
  test:[
    {s:'3D modellashtirishda «primitiv» nima?', v:['Eng oddiy jism: quti, silindr, shar','Eng murakkab model','Rang','Fayl turi'], t:0, izoh:'<b>Primitivlar</b> — oddiy asos jismlar; murakkab model ulardan yig‘iladi.'},
    {s:'3D koordinatalarda y o‘qi odatda nimani bildiradi (shu sahnada)?', v:['Kenglik','Balandlik','Chuqurlik','Vaqt'], t:1, izoh:'Sahnada x — kenglik, <b>y — balandlik</b>, z — chuqurlik (ba’zi dasturlarda z balandlik — dasturga qarang).'},
    {s:'STL fayl nimani saqlaydi?', v:['Rang va teksturani','Yuzani uchburchaklar to‘plami sifatida','Video','Matnni'], t:1, izoh:'<b>STL</b> — model yuzasi uchburchaklar (mesh) bilan tasvirlanadi; rang yo‘q.'},
    {s:'Slicing nima?', v:['Modelni bo‘yash','Modelni qatlamlarga kesib, printer yo‘lini hisoblash','Modelni kichraytirish','Faylni siqish'], t:1, izoh:'<b>Slicing</b> — qatlamlarga kesish va har qatlam uchun ekstruder yo‘lini hisoblash.'},
    {s:'FDM printerda nima eritiladi?', v:['Metall kukun','Suyuq smola','Plastik ip (filament)','Qog‘oz'], t:2, izoh:'FDM — <b>plastik ip</b> (PLA, ABS) nozulda eritilib yotqiziladi.'},
    {s:'PLA uchun odatiy chop etish harorati?', v:['50–70 °C','190–220 °C','500–600 °C','1 000 °C'], t:1, izoh:'PLA taxminan <b>190–220 °C</b> (manbalarda 180–230 °C); ABS yuqoriroq.'},
    {s:'Qatlam balandligi kichik bo‘lsa (0,1 mm)…', v:['Chop etish tezlashadi','Yuza silliqroq, lekin vaqt ko‘p','Model kattalashadi','Plastik kam ketadi'], t:1, izoh:'Yupqa qatlam — <b>silliq yuza</b>, lekin qatlamlar ko‘p, vaqt uzoq.'},
    {s:'Stereolitografiya (SLA) patentini kim va qachon topshirgan?', v:['Chak Xall, 1984','Skott Kramp, 1989','Tomas Edison, 1880','Ilon Mask, 2010'], t:0, izoh:'<b>Chak Xall 1984</b> (patent 1986 da berilgan); Kramp — FDM, 1989.'},
    {s:'Stakan modelida balandlik 20 mm, diametr 12 mm. Nisbat?', v:['≈ 0,6','≈ 1,67','≈ 3','≈ 12'], t:1, izoh:'20 : 12 ≈ <b>1,67</b> — balandlik diametridan 1,5 martadan ko‘p.'},
    T3('Sahnada 3D printer. Plastikni eritib yotqizadigan qismni — <b>ekstruderni</b> bosing.', 'ts-qurish', 'bos', ['ekstruder'], ['Ekstruder (nozul)', 'boshqa qism'], '<b>Ekstruder</b> — qizdirilgan nozul; ip eritilib qatlam sifatida yotqiziladi.')
  ],
  yordamchi:[
    {s:'Qanday bepul dasturda modellashtirsam bo‘ladi?', j:'Boshlang‘ich uchun brauzerdagi Tinkercad (primitivlar, birlashtirish/ayirish), murakkabroq — FreeCAD yoki Blender (bepul, ochiq kodli). Natija STL ga eksport qilinadi.', kalit:['dastur','tinkercad','blender']},
    {s:'Nega model stolga yopishmaydi?', j:'Stol sovuq yoki iflos, birinchi qatlam juda baland. Stolni spirt bilan tozalang, birinchi qatlam balandligini sozlang, kerak bo‘lsa «brim» (chekka) qo‘shing.', kalit:['yopishmaydi','stol']}
  ],
  maqola:[
    {sarlavha:'3D model nima', xatboshilar:[
      'Kompyuterdagi 3D model — buyumning raqamli shakli. Uni ikki usulda yasash mumkin: oddiy jismlardan yig‘ish (quti, silindr, shar, konus — birlashtirish, ayirish, kesishma) yoki chizma asosida (eskiz chizib, uni «cho‘zish» yoki aylantirish). Maktab darajasida birinchi usul yetarli: masalan, stakan — silindr minus kichikroq silindr; stol — quti va to‘rt silindr.',
      'Har detalning o‘lchami haqiqiy birliklarda (mm) va joyi koordinatalar (x; y; z) bilan beriladi. Model tugagach, STL faylga saqlanadi: unda yuza mayda uchburchaklar bilan ifodalanadi — printer va boshqa dasturlar shu formatni tushunadi.'
    ]},
    {sarlavha:'Qatlamma-qatlam: additiv texnologiya', xatboshilar:[
      'An’anaviy ishlov berishda material olib tashlanadi (arralash, yo‘nish). 3D chop etish esa additiv — material qo‘shiladi. Slicer dasturi modelni gorizontal qatlamlarga kesadi (odatda 0,1–0,3 mm) va har qatlam uchun ekstruder harakat yo‘lini hisoblaydi; ichki hajm to‘liq emas, panjara (infill) bilan to‘ldiriladi — 15–25 % ko‘p buyum uchun yetarli.',
      'FDM (fused deposition modeling) printerida plastik ip — filament — qizdirilgan nozul orqali eritilib yotqiziladi. PLA uchun harorat taxminan 190–220 °C (manbalarda 180–230 °C), stol ba’zan 50–60 °C gacha isitiladi. Osilib turgan qismlar uchun tayanchlar chop etiladi va keyin olib tashlanadi. Tadqiqotlar qatlam qalinligi mustahkamlikka ta’sir qilishini ko‘rsatadi: yupqa qatlam — silliq va ko‘pincha mustahkamroq, lekin vaqt uzoq.',
      'Boshqa usullar: SLA — suyuq smolani nur bilan qotirish (juda aniq), SLS — kukunni lazer bilan pishirish, metall printerlar — aviatsiya va tibbiyot detallari.'
    ]},
    {sarlavha:'Tarix va bugun', xatboshilar:[
      'Birinchi 3D chop etish usullarini 1980-yillarda bir necha olim mustaqil taklif qilgan (Yaponiyada Xideo Kodama, Fransiyada Alen Le Meote guruhi), lekin patent olgan amerikalik Chak Xall bo‘ldi: 1984-yilda topshirilgan stereolitografiya patenti 1986-yilda berildi, u 3D Systems kompaniyasini tuzdi va STL formatini yaratdi; 1988-yilda birinchi tijorat printeri SLA-1 chiqdi.',
      'FDM usulini Skott Kramp ixtiro qildi: patent 1989-yilda (ba’zi manbalar: topshirilgan 1988, berilgan 1992), kompaniya — Stratasys. 2009-yilda FDM patenti muddati tugagach, arzon uy printerlari ommalashdi. Bugun 3D printer protez, tish implanti, samolyot detali, hatto uy devorlarini chop etadi.'
    ]}
  ],
  formulalar:[
    ['Qatlamlar soni = H / h','H — model balandligi, h — qatlam balandligi: 20 mm / 0,2 mm = 100 qatlam'],
    ['V(silindr) = π·r²·H','Stakan hajmi (to‘liq silindr)'],
    ['V(quti) = a·b·c','Parallelepiped hajmi'],
    ['Material ≈ V · infill %','Taxminiy plastik sarfi (devorlar hisobga olinmagan)']
  ],
  qiziqarli:[
    'STL formati 1987-yildan beri deyarli o‘zgarmagan — eng «uzoq umr ko‘rgan» 3D formatlardan biri.',
    'Xalqaro kosmik stansiyada 2014-yildan 3D printer ishlaydi — kerakli asbob Yerdan yuborilmay, joyida chop etiladi.',
    'Dunyodagi ko‘p uy printerlari 0,4 mm nozul ishlatadi — qatlam 0,2 mm bo‘lsa, 20 mm balandlik 100 qatlam.',
    'Ba’zi qurilish printerlari beton bilan bir necha kunda kichik uy devorlarini chop etadi.'
  ],
  lugat:[
    ['Primitiv','Oddiy asos jism (quti, silindr, shar).'],
    ['Koordinatalar','Detal joyini bildiruvchi (x; y; z) sonlar.'],
    ['STL','Yuzani uchburchaklar bilan saqlovchi fayl formati.'],
    ['Slicing','Modelni qatlamlarga kesish.'],
    ['Infill','Ichki to‘ldirish panjarasi, foizda.'],
    ['FDM','Plastik ipni eritib yotqizish usuli.'],
    ['Ekstruder','Ipni eritib chiqaruvchi qizdirilgan nozul.'],
    ['Filament','Printer uchun plastik ip (PLA, ABS, PETG).'],
    ['Tayanch','Osilib turgan qismlar ostiga chop etiladigan vaqtinchalik material.'],
    ['Additiv','Material qo‘shib qurish.']
  ],
  manba:TX9 + '; ' + MW + ': «3D printing», «Stereolithography», «Fused filament fabrication», «STL (file format)»; All3DP va Xometry «History of 3D printing» (Xall 1984/1986, Kramp 1989/1992 — manbalar farq qiladi, ikkalasi matnda); Anycubic PLA harorati (190–220 °C); qatlam balandligi tadqiqotlari (0,1–0,3 mm).',
  ishlanma:ish('9-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Brauzerdagi 3D quruvchi (MAKON), slicing namoyishi, loyiha ishi',
    ['Primitivlar, koordinata va o‘lcham, STL, slicing va FDM chop etish tamoyilini o‘rgatish.', 'Aniqlik, rejali ishlash, texnologik madaniyatni tarbiyalash.', 'Fazoviy tasavvur va loyihalash ko‘nikmasini rivojlantirish.'],
    ['Primitivlardan oddiy buyum yig‘adi','O‘lcham va joyni mm da beradi','Slicing va FDM jarayonini tushuntiradi','3D printer turlarini farqlaydi'],
    ['MAKON sahnasi «3D modellashtirish»','Kompyuter, Tinkercad (bo‘lsa)','3D printer yoki chop etilgan namunalar','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Chop etilgan buyumni ko‘rsatish: «qanday yasalgan?»','Taxmin aytadi.'],['8–18','<b>Primitivlar va o‘lcham.</b> MAKON quruvchi: quti, silindr, shar; koordinatalar.','Stakan va stol yig‘adi.'],['18–28','<b>STL va slicing.</b> Qatlamlar, infill, tayanch.','Qatlamlar sonini hisoblaydi.'],['28–36','<b>FDM printer.</b> Sahnada chop etish; tarix 1984/1989.','Kuzatadi, savollarga javob beradi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Primitiv','Oddiy jism.'],['STL','Uchburchakli fayl.'],['Slicing','Qatlamlarga kesish.'],['FDM','Ipni eritib yotqizish.']],
    [['Stakan qaysi primitivdan?','Silindr'],['20 mm / 0,2 mm = ?','100 qatlam'],['PLA harorati?','≈ 190–220 °C'],['SLA patenti?','Chak Xall, 1984/1986']],
    'Darslikdagi savollar; qog‘ozda kalit ilgichi yoki telefon tagligi eskizini chizib, uni 3–5 primitivga ajrating va o‘lchamlarini (mm) yozing.',
    TX9)
};

/* ================================================================
   T6. ROBOTOTEXNIKA ASOSLARI — 10-sinf
   ================================================================ */
D['tx-robot'] = {
  fan:'texnologiya', qisqaNom:'Robototexnika', nom:'Robototexnika asoslari: sensor va servo', sinf:'10-sinf',
  qisqa:'10-sinf · Texnologiya · «Robototexnika asoslari»',
  sahna:'ts_robot',
  tsUq:{s1:90, s2:70, s3:90, masofa:25},
  kor:{
    sarlavha:'Sez — qaror qil — harakatlan',
    matn:'Har qanday robot uch qismdan iborat: sensorlar (sezadi), boshqaruvchi (qaror qiladi), ijro mexanizmlari (harakatlanadi). Sahnadagi robot qo‘lning uch bo‘g‘inini uchta servo aylantiradi: servo 0–180° burchakka boshqaruv impulsi bilan buriladi. Qisqich ustidagi ultratovush sensori to‘siqgacha masofani tovush impulsining qaytish vaqtidan hisoblaydi. Dastur oddiy: agar masofa < 10 sm — to‘xta, aks holda — harakat. Slayderlarni suring va «Avto rejim»ni yoqing.',
    punktlar:['<b>Servo:</b> 0–180°, boshqaruv — 50 Hz, impuls ≈ 1–2 ms (1,5 ms — o‘rta)','<b>Ultratovush sensori (HC-SR04):</b> 2–400 sm, 40 kHz; s = t·v/2, v ≈ 343 m/s (20 °C)','<b>Mikrokontroller</b> (masalan, Arduino) dasturni bajaradi: o‘qi → solishtir → buyruq ber','<b>Algoritm:</b> agar masofa < chegara → to‘xta; aks holda → harakat']
  },
  bolimlar:[
    {sarlavha:'Robot tarkibi', jadval:[
      ['Sensorlar','masofa (ultratovush, IQ), yorug‘lik, harorat, tugma, kamera'],
      ['Boshqaruvchi','mikrokontroller (Arduino, micro:bit) — dastur bajaradi'],
      ['Ijro mexanizmlari','servo, DC motor, qadam motori, qisqich'],
      ['Ta’minot','batareya, kuchlanish stabilizatori']
    ]},
    {sarlavha:'Servo va sensor ko‘rsatkichlari (SG90, HC-SR04 — datasheet)', jadval:[
      ['Servo burchagi','0–180° (SG90 turi)'],
      ['Boshqaruv impulsi','davr ≈ 20 ms (50 Hz); ≈ 1 ms → 0°, 1,5 ms → 90°, ≈ 2 ms → 180°'],
      ['Servo kuchlanishi','4,8–6 V; moment ≈ 1,8 kg·sm (4,8 V, datasheet)'],
      ['HC-SR04 masofa','2–400 sm, aniqlik ≈ 0,3 sm'],
      ['HC-SR04 chastota','40 kHz ultratovush; trigger impulsi ≥ 10 mks'],
      ['Masofa formulasi','s = t · 343 m/s / 2 (t — echo davomiyligi)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Robot qo‘l: uch bo‘g‘in', matn:'Asos aylanadi (servo 1), yelka ko‘tariladi (servo 2), tirsak bukiladi (servo 3), oxirida qisqich. Slayderlarni suring — bo‘g‘inlar buriladi. Har servo o‘z burchagini mustaqil ushlab turadi.', holat:{s1:90, s2:60, s3:90, qisqich:30, masofa:25, avto:false}},
    {sarlavha:'Servo qanday buriladi', matn:'Servoga har 20 ms da impuls beriladi: ≈ 1 ms → 0°, 1,5 ms → 90°, ≈ 2 ms → 180°. Ichidagi potensiometr haqiqiy burchakni o‘lchaydi, boshqaruv sxemasi farqni yo‘qotguncha motorni aylantiradi — bu teskari aloqa.', holat:{s1:0, s2:60, s3:90, qisqich:30, masofa:25}},
    {sarlavha:'Qisqich — ijro mexanizmi', matn:'Qisqich ham servo bilan ochilib-yopiladi: 0° — yopiq, 180° — ochiq. Buyumni olish uchun bo‘g‘inlar buyum ustiga keltiriladi, so‘ng qisqich yopiladi.', holat:{s1:90, s2:70, s3:110, qisqich:160, masofa:25}},
    {sarlavha:'Ultratovush sensori', matn:'Sensor 40 kHz tovush impulsi yuboradi va aks-sadoni kutadi. Masofa = vaqt · tovush tezligi / 2 (ikki tomonga yo‘l). 20 °C da v ≈ 343 m/s: echo 1 000 mks bo‘lsa, s ≈ 17 sm. Diapazon 2–400 sm.', holat:{s1:90, s2:70, s3:90, qisqich:30, masofa:17}},
    {sarlavha:'Shart: agar masofa < 10 sm → to‘xta', matn:'Dastur har necha millisekundda masofani o‘qiydi va chegara bilan solishtiradi. To‘siqni 10 sm dan yaqin keltiring — LED qizaradi, «to‘xta» holati. Bu — eng oddiy, lekin eng muhim xavfsizlik algoritmi.', holat:{s1:90, s2:70, s3:90, qisqich:30, masofa:8}},
    {sarlavha:'Avto rejim: sez — qaror qil — harakatlan', matn:'«Avto» yoqilganda qo‘l o‘zi harakatlanadi, lekin to‘siq yaqinlashsa to‘xtaydi. Sikl: sensorni o‘qi → shartni tekshir → servolarga buyruq ber → takrorla. Haqiqiy robotlarda shu sikl sekundiga yuzlab marta bajariladi.', holat:{s1:90, s2:70, s3:90, qisqich:30, masofa:30, avto:true}},
    {sarlavha:'Xavfsizlik va cheklovlar', matn:'Servo chegaradan tashqari burchakka buyruq olsa qizib ishdan chiqadi; qo‘l og‘ir yuk ko‘tarmasin (SG90 ≈ 1,8 kg·sm moment). Sensor yumshoq (mato) va qiya yuzalarni yomon ko‘radi — tovush qaytmaydi; shuning uchun muhim joylarda ikki xil sensor ishlatiladi.', holat:{s1:90, s2:60, s3:90, qisqich:30, masofa:25, avto:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Robotni boshqaring', holat:{s1:90, s2:60, s3:90, qisqich:30, masofa:25, avto:false},
    topshiriqlar:[
      {shart:'Asos servosini (servo 1) <b>chap chekka</b> holatga — 30° yoki undan kamga buring.', hodisa:'ts-robot', kod:"ev.s1<=30", izoh:'To‘g‘ri — servo 1 <b>≤ 30°</b>: impuls ≈ 1,1 ms yoki kamroq.'},
      {shart:'Qisqichni <b>to‘liq oching</b>: 150° va undan ko‘p.', hodisa:'ts-robot', kod:"ev.qisqich>=150", izoh:'To‘g‘ri — qisqich <b>ochiq</b>; buyumni olish uchun keyin yopiladi.'},
      {shart:'To‘siqni sensorga <b>10 sm dan yaqin</b> keltiring — robot to‘xtashi kerak.', hodisa:'ts-robot', kod:"ev.masofa<10 && ev.toxta===true", izoh:'To‘g‘ri — <b>masofa &lt; 10 sm → to‘xta</b>: LED qizil.'},
      {shart:'To‘siqni <b>20 sm dan uzoqqa</b> olib, «Avto rejim»ni yoqing — qo‘l harakatlansin.', hodisa:'ts-robot', kod:"ev.masofa>=20 && ev.avto===true && ev.toxta===false", izoh:'To‘g‘ri — yo‘l ochiq, dastur <b>harakat</b> tarmog‘ini bajaradi.'},
      {shart:'Sahnada masofani o‘lchaydigan qismni — <b>sensorni</b> bosing.', hodisa:'ts-robot', kod:"ev.bos==='sensor'", izoh:'To‘g‘ri — <b>ultratovush sensori</b> qisqich ustida: ikki «ko‘z» — biri yuboradi, biri qabul qiladi.'}
    ]},
  test:[
    {s:'Robotning uch asosiy qismi?', v:['Sensor, boshqaruvchi, ijro mexanizmi','Motor, g‘ildirak, batareya','Kamera, ekran, tugma','Qo‘l, oyoq, bosh'], t:0, izoh:'<b>Sensor</b> sezadi, <b>boshqaruvchi</b> qaror qiladi, <b>ijro mexanizmi</b> harakatlanadi.'},
    {s:'SG90 turidagi servo qanday burchak oralig‘ida buriladi?', v:['0–90°','0–180°','0–360°','Cheksiz'], t:1, izoh:'Oddiy servo <b>0–180°</b>; uzluksiz aylanuvchi servo alohida tur.'},
    {s:'Servoga 1,5 ms impuls berilsa, u qaysi holatga boradi?', v:['0°','≈ 90° (o‘rta)','180°','To‘xtaydi'], t:1, izoh:'≈ 1 ms → 0°, <b>1,5 ms → 90°</b>, ≈ 2 ms → 180° (davr 20 ms).'},
    {s:'Ultratovush sensori masofani qanday o‘lchaydi?', v:['Yorug‘lik rangidan','Tovush impulsining qaytish vaqtidan','Haroratdan','Og‘irlikdan'], t:1, izoh:'<b>Echo vaqti</b> · tovush tezligi / 2 — tovush borib qaytadi.'},
    {s:'Echo 2 000 mks davom etdi. Masofa (v = 343 m/s)?', v:['≈ 17 sm','≈ 34 sm','≈ 69 sm','≈ 3,4 m'], t:1, izoh:'s = 0,002 s · 343 m/s / 2 = 0,343 m ≈ <b>34 sm</b>.'},
    {s:'HC-SR04 sensorining o‘lchash diapazoni?', v:['2–400 sm','0–10 m','1–5 mm','10–100 m'], t:0, izoh:'Datasheet: <b>2–400 sm</b>, aniqlik ≈ 0,3 sm.'},
    {s:'«Agar masofa < 10 sm → to‘xta» — bu dasturda nima?', v:['Sikl','Shartli operator (tarmoqlanish)','O‘zgaruvchi','Funksiya nomi'], t:1, izoh:'<b>Shartli operator</b>: shart rost bo‘lsa bir tarmoq, aks holda boshqasi.'},
    {s:'Servo ichidagi potensiometr nima uchun kerak?', v:['Tezlikni oshirish','Haqiqiy burchakni o‘lchab, teskari aloqa berish','Kuchlanishni ko‘tarish','Tovush chiqarish'], t:1, izoh:'Potensiometr <b>burchakni o‘lchaydi</b>; sxema berilgan va haqiqiy burchak farqini yo‘qotadi (teskari aloqa).'},
    {s:'Ultratovush sensori qaysi yuzani yomon «ko‘radi»?', v:['Tekis devor','Yumshoq mato yoki qiya yuza','Metall plastina','Shisha'], t:1, izoh:'<b>Yumshoq va qiya</b> yuzalar tovushni yutadi yoki chetga qaytaradi — echo kelmaydi.'},
    T3('Sahnada robot qo‘l. Masofani o‘lchaydigan <b>ultratovush sensorini</b> bosing.', 'ts-robot', 'bos', ['sensor'], ['Ultratovush sensori (qisqich ustida)', 'boshqa qism'], '<b>Sensor</b> qisqich ustida — ikki silindr: biri 40 kHz impuls yuboradi, biri aks-sadoni qabul qiladi.')
  ],
  yordamchi:[
    {s:'Arduino da servoni qanday burish mumkin?', j:'Servo kutubxonasi: servo.attach(9); servo.write(90); — 9-pinga ulangan servo 90° ga boradi. Kutubxona kerakli impulsni (≈ 1–2 ms, 50 Hz) o‘zi hosil qiladi.', kalit:['arduino','servo','kod']},
    {s:'Masofa formulasi qayerdan?', j:'Tovush sensordan to‘siqqa borib qaytadi — yo‘l ikki marta masofa. s = v·t/2, v ≈ 343 m/s (20 °C). Mikrosekundlarda: s(sm) ≈ t(mks)/58.', kalit:['masofa','formula','58']}
  ],
  maqola:[
    {sarlavha:'Robot nima va u qanday «o‘ylaydi»', xatboshilar:[
      'Robot — atrofni sezib, dastur bo‘yicha qaror qilib, harakatlanadigan mashina. Sezish — sensorlar: masofa, yorug‘lik, harorat, tugma, kamera. Qaror — mikrokontroller: kichik kompyuter (Arduino, micro:bit, Raspberry Pi) dasturni sekundiga yuzlab marta takrorlaydi: sensorni o‘qi, shartni tekshir, buyruq ber. Harakat — ijro mexanizmlari: servo, motor, qisqich, chiroq.',
      'Eng oddiy dastur ham shu uchlikdan iborat: «agar masofa < 10 sm → to‘xta, aks holda → harakat». Bu shartli operator; unga sikl qo‘shilsa (doim takrorla), robotning «hayoti» hosil bo‘ladi.'
    ]},
    {sarlavha:'Servo: burchakni ushlab turuvchi motor', xatboshilar:[
      'Servo — ichida reduktor, potensiometr va boshqaruv sxemasi bo‘lgan motor. Unga davri 20 ms (50 Hz) bo‘lgan impulslar beriladi; impuls kengligi burchakni belgilaydi: taxminan 1 ms — 0°, 1,5 ms — 90°, 2 ms — 180° (SG90 datasheet; ba’zi nusxalarda 0,5–2,4 ms). Potensiometr haqiqiy burchakni o‘lchaydi, sxema berilgan va haqiqiy burchak farqini yo‘qotguncha motorni aylantiradi — bu teskari aloqa (feedback).',
      'SG90 — eng arzon o‘quv servosi: 4,8 V, moment ≈ 1,8 kg·sm (manbalarda 1,2–1,8), tezlik ≈ 0,1 s / 60°. Robot qo‘lda uchta servo uch erkinlik darajasini beradi: asos burilishi, yelka, tirsak; to‘rtinchisi qisqichni ochib-yopadi.'
    ]},
    {sarlavha:'Ultratovush sensori va masofa', xatboshilar:[
      'HC-SR04 sensori 40 kHz li qisqa tovush impulsini yuboradi (trigger ≥ 10 mks) va aks-sado qaytguncha vaqtni o‘lchaydi (echo). Tovush to‘siqqa borib qaytadi, shuning uchun masofa s = v·t/2; 20 °C da v ≈ 343 m/s. Echo 1 000 mks bo‘lsa, s ≈ 17 sm. Diapazon 2–400 sm, aniqlik taxminan 0,3 sm (datasheet).',
      'Sensorning cheklovlari: yumshoq (mato, g‘ovak) yuza tovushni yutadi, qiya yuza chetga qaytaradi — echo kelmaydi; juda yaqin (2 sm dan kam) to‘siq ham o‘lchanmaydi. Shuning uchun muhim tizimlarda ultratovush bilan birga infraqizil yoki lazer sensor ishlatiladi.'
    ]},
    {sarlavha:'Robotlar atrofimizda', xatboshilar:[
      'Sanoat robot qo‘llari avtomobil zavodlarida payvandlaydi va bo‘yaydi; ular o‘sha uch bo‘g‘inli sxemaning kattalashgan, 6 erkinlik darajali shakli. Uy robot-changyutgichi masofa va to‘qnashuv sensorlari bilan yuradi; dron akselerometr va GPS bilan muvozanat saqlaydi.',
      'Maktabda robototexnika — Arduino yoki micro:bit, servo, sensor va biroz kod. Eng muhimi — algoritmik fikrlash: muammoni «sez — qaror qil — harakatlan» qadamlariga bo‘lish.'
    ]}
  ],
  formulalar:[
    ['s = v · t / 2','Ultratovush masofasi: v ≈ 343 m/s (20 °C), t — echo vaqti'],
    ['s(sm) ≈ t(mks) / 58','Amaliy formula (343 m/s dan)'],
    ['Impuls ≈ 1 ms + 1 ms · (α / 180°)','Servo burchagi α ↔ impuls kengligi (taxminiy, SG90)'],
    ['Davr = 20 ms (50 Hz)','Servo boshqaruv signali'],
    ['agar (masofa < 10) to‘xta; aks holda harakat','Shartli operator']
  ],
  qiziqarli:[
    '«Robot» so‘zini chex yozuvchisi Karel Chapek 1920-yilgi «R.U.R.» pyesasida ishlatgan; «robota» — «majburiy mehnat».',
    'Ko‘rshapalaklar va delfinlar ham ultratovush bilan masofa o‘lchaydi — exolokatsiya; HC-SR04 shu tamoyilda.',
    'SG90 servoning og‘irligi ≈ 9 g, shuning uchun nomida «9g» bo‘ladi.',
    'Sanoat robot qo‘llari millimetrning o‘ndan bir ulushi aniqlikda bir xil harakatni millionlab marta takrorlaydi.'
  ],
  lugat:[
    ['Sensor','Atrof-muhit ko‘rsatkichini o‘lchovchi qurilma.'],
    ['Mikrokontroller','Dasturni bajaruvchi kichik kompyuter chipi.'],
    ['Servo','Berilgan burchakni ushlab turuvchi motor.'],
    ['Teskari aloqa','Haqiqiy natijani o‘lchab, boshqaruvni tuzatish.'],
    ['Impuls kengligi (PWM)','Signalning «yoqiq» davomiyligi — servoda burchakni belgilaydi.'],
    ['Ultratovush','Odam eshitmaydigan (> 20 kHz) tovush.'],
    ['Echo','Qaytgan tovush signali.'],
    ['Shartli operator','«Agar … bo‘lsa …» tarmoqlanishi.'],
    ['Erkinlik darajasi','Mexanizmning mustaqil harakat yo‘nalishlari soni.'],
    ['Qisqich (gripper)','Buyumni ushlovchi ijro mexanizmi.']
  ],
  manba:TX10 + '; SG90 datasheet (TowerPro: 4,8 V, 1,8 kg·sm, davr 20 ms, impuls ≈ 1–2 ms; ba’zi nusxalarda 0,5–2,4 ms); HC-SR04 qo‘llanmasi (2–400 sm, 40 kHz, aniqlik 0,3 sm, trigger ≥ 10 mks); tovush tezligi 343 m/s (20 °C) — fizika darsligi; ' + MW + ': «Servomotor», «Ultrasonic transducer», «Robot».',
  ishlanma:ish('10-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D robot qo‘l (servo slayderlari, sensor), algoritm tuzish, guruhda ishlash',
    ['Robot tarkibi, servo boshqaruvi (PWM), ultratovush sensori va shartli algoritmni o‘rgatish.', 'Texnik ijodkorlik, hamkorlik va xavfsiz ishlash madaniyatini tarbiyalash.', 'Algoritmik fikrlash va o‘lchov natijasini hisoblash ko‘nikmasini rivojlantirish.'],
    ['Robotning uch qismini ajratadi','Servo burchagi va impuls bog‘liqligini tushuntiradi','Echo vaqtidan masofani hisoblaydi','«Agar … → to‘xta» algoritmini tuzadi'],
    ['MAKON sahnasi «Robot qo‘l»','Arduino/micro:bit, SG90 servo, HC-SR04 (bo‘lsa)','Darslik, kalkulyator'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Robot-changyutgich devorga nega urilmaydi?','Taxmin aytadi.'],['8–18','<b>Servo.</b> MAKON: uch bo‘g‘in, burchak ↔ impuls.','Slayderlar bilan sinaydi, jadval to‘ldiradi.'],['18–28','<b>Sensor.</b> Ultratovush, s = vt/2; hisob.','Masalalar yechadi.'],['28–36','<b>Algoritm.</b> Shart, sikl; avto rejim.','Blok-sxema chizadi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Servo','Burchak ushlovchi motor.'],['PWM','Impuls kengligi.'],['Echo','Qaytgan signal.'],['Shart','Agar … bo‘lsa.']],
    [['1,5 ms → burchak?','≈ 90°'],['Echo 1 000 mks → masofa?','≈ 17 sm'],['HC-SR04 diapazoni?','2–400 sm'],['Robot uch qismi?','Sensor, boshqaruvchi, ijro']],
    'Darslikdagi savollar; «yo‘ldagi to‘siqdan aylanib o‘tish» algoritmini blok-sxema sifatida chizing (sensor o‘qish, shart, burilish).',
    TX10)
};

/* ================================================================
   T7. LOYIHA: UY ELEKTR TARMOG‘I REJASI — 11-sinf
   ================================================================ */
D['tx-loyiha'] = {
  fan:'texnologiya', qisqaNom:'Elektr tarmog‘i loyihasi', nom:'Loyiha: uy elektr tarmog‘i rejasi', sinf:'11-sinf',
  qisqa:'11-sinf · Texnologiya · «Loyiha faoliyati»',
  sahna:'ts_loyiha',
  tsUq:{asbob:'chiroq', toza:true},
  kor:{
    sarlavha:'Reja qog‘ozda — xavfsizlik devorda',
    matn:'Uy elektr tarmog‘ini loyihalash — qayerga rozetka, chiroq, kalit va shchit qo‘yish, qaysi guruh qanday sim va avtomat bilan ta’minlanishini rejalashtirish. Qoidalar bor: rozetkalar guruhi — mis 2,5 mm² va 16 A avtomat, yoritish — 1,5 mm² va 10 A, elektr plita — 6 mm² va 32 A; hammomda rozetka vanna chetidan kamida 0,6 m (2-zonadan tashqari) va barcha zanjirlar 30 mA UZO orqali. Sahnada asbobni tanlab xonaga bosing; qizil «!» — qoida buzilgan.',
    punktlar:['<b>Shchit:</b> kirish avtomati, UZO, guruh avtomatlari — yo‘lakda, eshikka yaqin','<b>Guruhlar:</b> yoritish 1,5 mm² / 10 A; rozetkalar 2,5 mm² / 16 A; plita 6 mm² / 32 A','<b>Hammom:</b> 0, 1, 2-zonalar; rozetka faqat 2-zonadan tashqarida (≥ 0,6 m), 30 mA UZO','<b>Joylashuv:</b> kalit eshik yonida (≈ 90 sm), rozetka ≈ 30 sm balandlikda, oshxonada ish yuzasi ustida (taxminiy, loyiha standartlariga qarang)']
  },
  bolimlar:[
    {sarlavha:'Guruhlar va himoya (mis sim)', jadval:[
      ['Yoritish','1,5 mm², avtomat 10 A'],
      ['Rozetkalar (xonalar)','2,5 mm², avtomat 16 A'],
      ['Oshxona rozetkalari','2,5 mm², 16 A, alohida guruh'],
      ['Elektr plita','6 mm², 32 A (quvvatga qarab 4–10 mm²)'],
      ['Hammom','alohida guruh, 30 mA UZO majburiy'],
      ['Konditsioner','alohida guruh, 2,5 mm², 16 A']
    ]},
    {sarlavha:'Hammom zonalari (IEC 60364-7-701)', jadval:[
      ['0-zona','vanna/dush ichi — faqat 12 V SELV jihozlar'],
      ['1-zona','vanna ustida 2,25 m gacha — rozetka yo‘q, suv isitgich bo‘lishi mumkin'],
      ['2-zona','1-zonadan 0,6 m — rozetka yo‘q (ba’zi mamlakatlarda soqol mashinasi rozetkasi istisno)'],
      ['2-zonadan tashqari','rozetka mumkin, UZO 30 mA; Buyuk Britaniyada vannadan 3 m talab']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Reja: xonalar va shchit', matn:'Plan 5 xona: yotoqxona, mehmonxona, oshxona, yo‘lak, hammom. Shchit yo‘lakda, kirish eshigiga yaqin — avtomatlarga tez yetish uchun. Avval shchitni qo‘ying.', holat:{asbob:'shit', toza:true, qatlam:'reja'}},
    {sarlavha:'Yoritish guruhi', matn:'Har xonada kamida bitta chiroq va eshik yonida kalit (odatda ≈ 90 sm balandlikda, eshik dastasi tomonida). Yoritish guruhi — 1,5 mm² mis, 10 A avtomat.', holat:{asbob:'chiroq', namuna:true, qatlam:'reja'}},
    {sarlavha:'Rozetkalar guruhi', matn:'Xonalarda rozetkalar ≈ 30 sm balandlikda, har devorda kamida bitta; oshxonada ish yuzasi ustida. Rozetkalar — 2,5 mm², 16 A. Plita uchun alohida 6 mm² liniya va 32 A avtomat.', holat:{asbob:'rozetka', namuna:true, qatlam:'reja'}},
    {sarlavha:'Hammom zonalari', matn:'Vanna atrofida 0,6 m — 2-zona: bu yerda rozetka va kalit bo‘lmaydi. Rozetka 2-zonadan tashqarida, 30 mA UZO orqali; kalit ko‘pincha hammom tashqarisida. Qizil punktir — 2-zona chegarasi.', holat:{asbob:'rozetka', namuna:true, qatlam:'zona'}},
    {sarlavha:'Simlar: shchitdan guruhlarga', matn:'«Simlar» qatlami shchitdan har bir asbobga liniyani ko‘rsatadi (sxematik). Haqiqiy loyihada simlar devor bo‘ylab gorizontal/vertikal yotqiziladi, shift ostidan 15–20 sm (taxminiy, loyiha me’yorlari).', holat:{asbob:'rozetka', namuna:true, qatlam:'sim'}},
    {sarlavha:'Hisob: quvvat va tok', matn:'Oshxonada choynak 2 000 Vt + mikroto‘lqinli pech 1 000 Vt bir rozetka guruhida: I = 3 000 / 220 ≈ 13,6 A — 16 A avtomat yetadi. Isitgich 2 000 Vt qo‘shilsa — 22,7 A: avtomat uziladi; demak, alohida guruh kerak.', holat:{asbob:'rozetka', namuna:true, qatlam:'reja'}},
    {sarlavha:'Loyihani topshirish', matn:'Loyiha hujjati: plan (asboblar belgilari), guruhlar jadvali (sim kesimi, avtomat), kabel uzunligi va smeta. Montaj faqat malakali elektrik tomonidan, avtomat o‘chirilgan holda.', holat:{asbob:'rozetka', namuna:true, qatlam:'sim'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Tarmoqni loyihalang', holat:{asbob:'shit', toza:true, qatlam:'reja'},
    topshiriqlar:[
      {shart:'Taqsimlash <b>shchitini yo‘lakka</b> qo‘ying.', hodisa:'ts-loyiha', kod:"ev.amal==='qoy' && ev.t==='shit' && ev.xona==='yolak'", izoh:'To‘g‘ri — shchit <b>yo‘lakda</b>, kirishga yaqin: avtomatlarga tez yetiladi.'},
      {shart:'<b>Har bir xonaga</b> kamida bitta chiroq qo‘ying (5 xona).', hodisa:'ts-loyiha', kod:"['yotoq','mehmon','oshxona','yolak','hammom'].every(r=>ev.xonalar[r].chiroq>=1)", izoh:'To‘g‘ri — yoritish guruhi: <b>1,5 mm², 10 A</b>.'},
      {shart:'Oshxonaga <b>elektr plita</b> qo‘ying.', hodisa:'ts-loyiha', kod:"ev.xonalar.oshxona.plita>=1", izoh:'To‘g‘ri — plita uchun <b>alohida 6 mm² liniya, 32 A</b>.'},
      {shart:'Hammomga rozetkani <b>vannadan kamida 0,6 m</b> uzoqqa qo‘ying (ogohlantirishsiz).', hodisa:'ts-loyiha', kod:"ev.amal==='qoy' && ev.t==='rozetka' && ev.xona==='hammom' && !ev.ogoh", izoh:'To‘g‘ri — 2-zonadan tashqarida, <b>30 mA UZO</b> bilan.'},
      {shart:'«Simlar» qatlamini yoqib, shchitdan liniyalarni ko‘ring.', hodisa:'ts-loyiha', kod:"ev.amal==='qatlam' && ev.qatlam==='sim'", izoh:'To‘g‘ri — har guruh <b>o‘z avtomati</b>dan chiqadi; qalin pushti — plita (6 mm²).'}
    ]},
  test:[
    {s:'Rozetkalar guruhi uchun mis sim va avtomat?', v:['1,5 mm², 10 A','2,5 mm², 16 A','6 mm², 32 A','0,75 mm², 6 A'], t:1, izoh:'Rozetkalar — <b>2,5 mm², 16 A</b>; yoritish — 1,5 mm², 10 A.'},
    {s:'Elektr plita uchun odatda qanday liniya?', v:['Umumiy rozetka guruhi','Alohida 6 mm², 32 A','Yoritish guruhi','Uzaytirgich'], t:1, izoh:'Plita quvvatli — <b>alohida 6 mm² liniya va 32 A</b> avtomat (quvvatga qarab).'},
    {s:'Hammomda 2-zona qayerda?', v:['Vanna ichi','Vanna ustida 2,25 m','1-zonadan 0,6 m kenglikdagi polosa','Butun hammom'], t:2, izoh:'<b>2-zona</b> — 1-zona chegarasidan 0,6 m; bu yerda rozetka bo‘lmaydi.'},
    {s:'Hammom zanjirlari uchun majburiy himoya?', v:['Faqat avtomat','30 mA UZO','Saqlagich sim','Hech narsa'], t:1, izoh:'IEC 60364-7-701: hammom zanjirlari <b>30 mA UZO</b> orqali.'},
    {s:'Shchitni qayerga qo‘yish maqsadga muvofiq?', v:['Hammomga','Yo‘lakka, kirishga yaqin','Balkonga','Shkaf ichiga, yashirin'], t:1, izoh:'Shchit <b>yo‘lakda, kirishga yaqin</b> — favqulodda holatda tez o‘chiriladi.'},
    {s:'Bir rozetka guruhida choynak (2 000 Vt) va isitgich (2 000 Vt). Tok (220 V)?', v:['≈ 9 A','≈ 18 A','≈ 4 A','≈ 40 A'], t:1, izoh:'I = 4 000 / 220 ≈ <b>18 A</b> — 16 A avtomat uziladi; alohida guruh kerak.'},
    {s:'Kalit odatda qayerga o‘rnatiladi?', v:['Eshik yonida, ≈ 90 sm balandlikda','Pol yaqinida','Shift ostida','Vanna ustida'], t:0, izoh:'<b>Eshik yonida, dasta tomonida</b>, taxminan 90 sm (loyiha standarti, mamlakatga qarab farq qiladi).'},
    {s:'Nima uchun oshxona rozetkalari alohida guruhga olinadi?', v:['Chiroyli ko‘rinishi uchun','Quvvatli jihozlar ko‘p — yuklama katta','Sim tejash uchun','Qoida yo‘q'], t:1, izoh:'Oshxonada <b>quvvatli jihozlar</b> (choynak, pech, muzlatgich) — alohida guruh yuklamani taqsimlaydi.'},
    {s:'Buyuk Britaniya qoidalarida hammom rozetkasi vannadan qancha uzoqda bo‘lishi kerak?', v:['0,6 m','1 m','3 m','Chegara yo‘q'], t:2, izoh:'BS 7671: <b>3 m</b> — IEC minimal 0,6 m (2-zona) dan qattiqroq. Milliy qoidalar farq qiladi.'},
    T3('Sahnada plan. Hammomga <b>chiroq</b> qo‘ying (asbob «Chiroq» tanlangan — hammom ichiga bosing).', 'ts-loyiha', 'xona', ['hammom'], ['Hammom xonasi', 'boshqa xona'], 'Hammomda chiroq <b>nam himoyali</b> (IP44 va undan yuqori) bo‘lishi kerak; 1-zonada — 12 V yoki IPX4+ (milliy qoidaga qarab).')
  ],
  yordamchi:[
    {s:'UZO ni butun uyga bitta qo‘ysam bo‘ladimi?', j:'Mumkin, lekin bitta jihozda sizib chiqish bo‘lsa butun uy o‘chadi. Yaxshisi: hammom va oshxona uchun alohida 30 mA UZO, kirishga 100–300 mA yong‘inga qarshi UZO (loyihachi hisobi bilan).', kalit:['uzo','bitta']},
    {s:'Alyuminiy sim ishlatsam bo‘ladimi?', j:'Zamonaviy qoidalarda uy ichida mis sim tavsiya etiladi; alyuminiy faqat katta kesimlarda (16 mm² dan) kirish liniyalarida. Mis va alyuminiyni bevosita ulash mumkin emas — maxsus klemma kerak.', kalit:['alyuminiy','mis']}
  ],
  maqola:[
    {sarlavha:'Loyiha nimadan boshlanadi', xatboshilar:[
      'Elektr tarmog‘i loyihasi uy rejasidan boshlanadi: har xonada qanday jihozlar bo‘ladi, qayerda televizor, muzlatgich, kir yuvish mashinasi turadi. Shundan rozetka va chiroqlar soni, joyi, so‘ng guruhlar kelib chiqadi. Guruh — bitta avtomat himoya qiladigan liniya: yoritish, xona rozetkalari, oshxona, plita, hammom, konditsioner.',
      'Shchit yo‘lakda, kirish eshigi yonida joylashadi: kirish avtomati, UZO va guruh avtomatlari shu yerda. Favqulodda holatda butun uy bir harakat bilan o‘chiriladi.'
    ]},
    {sarlavha:'Sim kesimi va avtomat', xatboshilar:[
      'Sim kesimi tok bo‘yicha tanlanadi, avtomat esa simni himoya qiladi. Keng qo‘llaniladigan juftliklar: yoritish — mis 1,5 mm² va 10 A; rozetkalar — 2,5 mm² va 16 A; elektr plita — 6 mm² va 32 A (quvvatga qarab 4–10 mm²). Eslatma: Rossiya PUE 7.1.34 bandining mis kesimlariga oid qismi 2017-yilda bekor qilingan; amalda hisob va SP 256 kabi me’yorlar bilan tasdiqlanadi — shuning uchun jadvaldagi qiymatlar amaliy qoida, loyihada hisob bilan tekshiriladi.',
      'Yuklamani hisoblash oddiy: I = P/U. Choynak 2 000 Vt va mikroto‘lqinli pech 1 000 Vt bitta 16 A guruhda — 13,6 A, yetadi; isitgich qo‘shilsa 22,7 A — avtomat uziladi. Demak, quvvatli jihozlar alohida guruhlarga taqsimlanadi.'
    ]},
    {sarlavha:'Hammom: zonalar va UZO', xatboshilar:[
      'IEC 60364-7-701 standarti hammomni zonalarga bo‘ladi: 0-zona — vanna yoki dush ichi (faqat 12 V SELV jihozlar), 1-zona — vanna ustida 2,25 m gacha (rozetka yo‘q), 2-zona — 1-zona chegarasidan 0,6 m (rozetka yo‘q; ba’zi mamlakatlarda soqol mashinasi uchun maxsus rozetka istisno). Rozetka faqat 2-zonadan tashqarida va 30 mA UZO orqali. Buyuk Britaniya qoidalari (BS 7671) qattiqroq — rozetka 1-zonadan 3 m uzoqda.',
      'Hammomdagi chiroq nam himoyali (IP44 va undan yuqori), kalit ko‘pincha eshik tashqarisida. Isitgich, kir yuvish mashinasi — yerga ulangan rozetkaga, UZO bilan.'
    ]},
    {sarlavha:'Loyiha hujjatlari va montaj', xatboshilar:[
      'Loyiha hujjati: plan (shartli belgilar bilan), guruhlar jadvali (sim markasi, kesimi, avtomat nominali, UZO), kabel uzunligi hisobi, smeta. Simlar devor bo‘ylab faqat gorizontal va vertikal yotqiziladi (burchakli emas) — keyinchalik burg‘ulashda simga tegmaslik uchun; shift ostidan taxminan 15–20 sm (loyiha me’yori, taxminiy).',
      'Montaj faqat malakali elektrik tomonidan, avtomat o‘chirilgan va kuchlanish yo‘qligi tekshirilgan holda bajariladi. O‘quvchi loyihasi — qog‘oz va dasturdagi reja; haqiqiy montaj uning vazifasi emas.'
    ]}
  ],
  formulalar:[
    ['I = P / U','Guruh toki: P — jihozlar quvvati yig‘indisi, U = 220 V'],
    ['I(guruh) ≤ I(avtomat) ≤ I(sim)','Avtomat simdan kichik, yuklamadan katta'],
    ['P(oshxona) = 2 000 + 1 000 = 3 000 Vt → 13,6 A','16 A avtomat yetadi'],
    ['L(kabel) ≈ Σ masofa(shchit → asbob) · 1,15','Zaxira bilan (taxminiy)']
  ],
  qiziqarli:[
    'IEC 60364 — dunyodagi ko‘p mamlakatlar elektr qoidalarining asosi; har mamlakat uni o‘z me’yoriga moslaydi (masalan, Britaniyada BS 7671).',
    'Rozetka balandligi ≈ 30 sm va kalit ≈ 90 sm — «yevropa standarti» deb ataladi, lekin bu majburiy me’yor emas, qulaylik an’anasi.',
    'UZO 30 mA ni 0,04 s ichida uzadi — odam tok ta’sirini sezguncha.',
    'Kabel rangi: jigarrang/qora — faza, ko‘k — nol, sariq-yashil — yerga ulash (IEC 60446).'
  ],
  lugat:[
    ['Guruh','Bitta avtomat himoya qiladigan liniya.'],
    ['Shchit','Avtomatlar va UZO joylashgan taqsimlash qutisi.'],
    ['Kesim','Sim o‘tkazgichining ko‘ndalang yuzi, mm².'],
    ['Nominal tok','Avtomat uzmasdan o‘tkazadigan tok.'],
    ['UZO (RCD)','Sizib chiqish tokidan himoya qurilmasi.'],
    ['Zona (hammom)','Suvga yaqinlik bo‘yicha xavfsizlik hududi.'],
    ['IP44','Chang va suv sachrashidan himoya darajasi.'],
    ['SELV','Xavfsiz past kuchlanish (≤ 12 V hammomda).'],
    ['Smeta','Material va ish narxi hisobi.']
  ],
  manba:TX11 + '; ' + ELEKTR_Q + '; BS 7671 (701.512.3 — 3 m qoidasi); electrical-installation.org «Bathroom electrical installation»; IEC 60446 (sim ranglari). Rozetka/kalit balandliklari va shift ostidagi masofa — loyiha amaliyoti, taxminiy.',
  ishlanma:ish('11-sinf', 'Loyiha darsi', 'Interaktiv 2D plan (MAKON), hisob, guruhda loyiha himoyasi',
    ['Uy elektr tarmog‘ini guruhlarga bo‘lish, sim kesimi va avtomatni tanlash, hammom zonalari qoidalarini o‘rgatish.', 'Mas’uliyat, xavfsizlik va loyiha madaniyatini tarbiyalash.', 'Rejalashtirish, hisoblash va qarorni asoslash ko‘nikmasini rivojlantirish.'],
    ['Plan asosida rozetka, chiroq, kalit, shchitni joylashtiradi','Guruhlar jadvalini (kesim, avtomat) tuzadi','Yuklama tokini hisoblaydi','Hammom zonalari qoidasini qo‘llaydi'],
    ['MAKON sahnasi «Elektr tarmog‘i rejasi»','Millimetrli qog‘oz, chizg‘ich','Kalkulyator, darslik, qoidalar jadvali'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Nega avtomat uzilaveradi?» vaziyati.','Taxmin aytadi.'],['8–18','<b>Guruhlar.</b> Sim kesimi, avtomat, I = P/U.','Hisob mashqi.'],['18–28','<b>Plan.</b> MAKON: shchit, chiroq, rozetka, hammom zonalari.','Rejani sahnada tuzadi.'],['28–38','<b>Loyiha.</b> Guruhlar jadvali, kabel uzunligi, smeta.','Guruhda jadval tuzadi.'],['38–43','<b>Himoya.</b> MAKON amaliyoti va test; loyihani asoslash.','Amaliyot, test, taqdimot.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Guruh','Bitta avtomat liniyasi.'],['Kesim','Sim yuzi, mm².'],['UZO','Sizib chiqishdan himoya.'],['Zona','Hammom xavfsizlik hududi.']],
    [['Rozetka guruhi?','2,5 mm², 16 A'],['2-zona kengligi?','0,6 m'],['4 000 Vt → tok?','≈ 18 A'],['Shchit qayerda?','Yo‘lakda, kirishga yaqin']],
    'O‘z uyingiz (yoki namunaviy) rejasini chizib, rozetka/chiroq/kalit/shchitni joylashtiring va guruhlar jadvalini tuzing (kesim, avtomat, UZO); kabel uzunligini taxminan hisoblang.',
    TX11 + '; ' + ELEKTR_Q)
};


const SN5 = '5-sinf «Tasviriy san’at» darsligi (O‘zbekiston, amaldagi nashr) — «Rangshunoslik asoslari» mavzusi';
const SN6 = '6-sinf «Tasviriy san’at» darsligi (O‘zbekiston, amaldagi nashr) — «Perspektiva qonunlari» mavzusi';
const SN7 = '7-sinf «Tasviriy san’at» darsligi (O‘zbekiston, amaldagi nashr) — «Yorug‘soya va hajm» mavzusi';
const SN8 = 'Tasviriy san’at (8-sinf, tanlov/to‘garak dasturi) — «Kompozitsiya asoslari»; darslikdan tashqari manbalar bilan';
const SN9 = 'Tasviriy san’at (9-sinf, tanlov/to‘garak dasturi) — «Amaliy bezak san’ati: girih va islimiy»; O‘zbekiston me’morchiligi manbalari';
const SN10 = 'Tasviriy san’at (10-sinf, tanlov/to‘garak dasturi) — «Portret»; akademik rasm qo‘llanmalari (Loomis uslubidagi taxminiy proporsiyalar)';
const SN11 = 'Tasviriy san’at (11-sinf, tanlov/to‘garak dasturi) — «O‘rta Osiyo miniatyurasi»; Encyclopaedia Iranica, O. Akimushkin (Behzod sanalari)';

/* ================================================================
   S1. RANG DOIRASI VA RANG ARALASHTIRISH — 5-sinf
   ================================================================ */

/* ================================================================
   FANGA BOG‘LASH va fan izohlari
   ================================================================ */
bogla('texnologiya', 'Yog‘och materiallar va birikmalar', 'tx-yogoch', '5-sinf: g‘o‘la kesimi, taxta, fanera, DSP, mix/shurup/yelim');
bogla('texnologiya', 'Uy elektr jihozlari va xavfsizlik', 'tx-elektr', '6-sinf: vilka, rozetka, avtomat, qisqa tutashuv, UZO');
bogla('texnologiya', 'Mexanik uzatmalar', 'tx-uzatma', '7-sinf: tishli, tasmali, zanjirli — i = z₂/z₁ animatsiyasi');
bogla('texnologiya', 'Tikuv mashinasi', 'tx-tikuv', '8-sinf: tuzilishi, 6 qadamli ip yo‘li, moki');
bogla('texnologiya', '3D modellashtirish asoslari', 'tx-3d', '9-sinf: primitivlardan qurish, STL, FDM printer');
bogla('texnologiya', 'Robototexnika asoslari', 'tx-robot', '10-sinf: 3 servoli robot qo‘l, ultratovush sensori, «agar < 10 sm → to‘xta»');
bogla('texnologiya', 'Loyiha: uy elektr tarmog‘i rejasi', 'tx-loyiha', '11-sinf: 2D plan, guruhlar, sim kesimi, hammom zonalari');

/* ======================= DETAL KARTALARI ======================= */
const ITTEN_DET = [
  ['sariq', 'Sariq', 'asosiy', 'binafsha', 'Eng och asosiy rang; issiq guruh boshi. Nyuton spektrida yashil va to‘q sariq orasida.'],
  ['sariq-tosariq', 'Sariq-to‘q sariq', 'uchinchi', 'ko‘k-binafsha', 'Sariq + to‘q sariq; «amber», asal rangi.'],
  ['tosariq', 'To‘q sariq', 'hosila', 'ko‘k', 'Sariq + qizil; eng issiq ranglardan.'],
  ['qizil-tosariq', 'Qizil-to‘q sariq', 'uchinchi', 'ko‘k-yashil', 'Qizil + to‘q sariq; olov, kinovar tusi.'],
  ['qizil', 'Qizil', 'asosiy', 'yashil', 'Asosiy rang; eng kuchli diqqat tortuvchi; qarama-qarshisi yashil.'],
  ['qizil-binafsha', 'Qizil-binafsha', 'uchinchi', 'sariq-yashil', 'Qizil + binafsha; pushti-binafsha (magenta yaqini). Issiq/sovuq chegarasi.'],
  ['binafsha', 'Binafsha', 'hosila', 'sariq', 'Qizil + ko‘k; sovuq guruh boshi; sariqning qarama-qarshisi.'],
  ['kok-binafsha', 'Ko‘k-binafsha', 'uchinchi', 'sariq-to‘q sariq', 'Ko‘k + binafsha; indigo yaqini.'],
  ['kok', 'Ko‘k', 'asosiy', 'to‘q sariq', 'Asosiy rang; eng sovuq; lojuvard (lazurit) bo‘yog‘i shu rang.'],
  ['kok-yashil', 'Ko‘k-yashil', 'uchinchi', 'qizil-to‘q sariq', 'Ko‘k + yashil; feruza, moviy (cyan) yaqini.'],
  ['yashil', 'Yashil', 'hosila', 'qizil', 'Sariq + ko‘k; tabiat rangi; qizilning qarama-qarshisi.'],
  ['sariq-yashil', 'Sariq-yashil', 'uchinchi', 'qizil-binafsha', 'Sariq + yashil; bahor barglari; issiq/sovuq chegarasi.']
];
const DET = {
  ts_yogoch:{
    ozak:{nom:'O‘zak', sarlavha2:'Yog‘och kesimi', jadval:[['Joyi','kesim markazi'],['Xususiyati','eng qadimgi, yumshoq qism']], matn:'O‘zak atrofida birinchi yillik halqalar; mebel uchun o‘zakli qism kamroq qadrlanadi — yorilishga moyil.', manba:TX5},
    halqa:{nom:'Yillik halqalar', sarlavha2:'Yog‘och kesimi', jadval:[['Och qatlam','bahor–yoz yog‘ochi'],['To‘q qatlam','kuz yog‘ochi'],['1 halqa','1 yil']], matn:'Halqalarni sanab daraxt yoshi aniqlanadi; keng halqa — sernam yil, tor — qurg‘oqchil (dendroxronologiya).', manba:TX5 + '; ' + MW + ' «Dendrochronology»'},
    postloq:{nom:'Po‘stloq', sarlavha2:'Yog‘och kesimi', jadval:[['Vazifasi','himoya'],['Ostida','kambiy']], matn:'Po‘stloq tanani qurish, zamburug‘ va hasharotdan himoya qiladi; aylana bo‘ylab shilinsa daraxt nobud bo‘ladi.', manba:TX5},
    kambiy:{nom:'Kambiy', sarlavha2:'Yog‘och kesimi', jadval:[['Joyi','po‘stloq ostida, yupqa'],['Vazifasi','yangi hujayralar hosil qilish']], matn:'Daraxt tanasi kambiy hisobiga qalinlashadi: ichkariga yog‘och, tashqariga po‘stloq.', manba:TX5},
    taxta:{nom:'Taxta', sarlavha2:'Tilingan material', jadval:[['Nisbat','kenglik > 2 · qalinlik'],['Ishlatilishi','mebel, pol, qoplama']], matn:'G‘o‘lani uzunasiga tilib olinadi; ishlatishdan oldin quritiladi.', manba:TX5},
    brus:{nom:'Brus', sarlavha2:'Tilingan material', jadval:[['Nisbat','kenglik ≤ 2 · qalinlik'],['Ishlatilishi','karkas, ustun']], matn:'Kesimi kvadratga yaqin; konstruksiyalarda yuk ko‘taruvchi element.', manba:TX5},
    reyka:{nom:'Reyka', sarlavha2:'Tilingan material', jadval:[['Ko‘rinishi','yupqa, tor'],['Ishlatilishi','ramka, panjara, bezak']], matn:'Taxtadan tilib olinadigan tor material.', manba:TX5},
    qatlam:{nom:'Fanera qatlami (shpon)', sarlavha2:'Plita', jadval:[['Qalinligi','≈ 1–3 mm'],['Yo‘nalishi','har qatlam 90° burilgan'],['Soni','toq: 3, 5, 7…']], matn:'Shponlar yelim bilan ko‘ndalang yopishtiriladi — plita har tomonga bir xil mustahkam.', manba:TX5 + '; ' + MW + ' «Plywood»'},
    dsp:{nom:'DSP — yog‘och-qirindili plita', sarlavha2:'Plita', jadval:[['Tarkibi','qirindi + sintetik smola'],['Sinf','E1 — kam formaldegid'],['Kamchiligi','namdan shishadi']], matn:'Mebelda eng ko‘p ishlatiladi; shurupni fanera kabi mahkam ushlamaydi.', manba:TX5 + '; ' + MW + ' «Particle board»'},
    laminat:{nom:'Laminat qoplama', sarlavha2:'Plita', jadval:[['Nima','qog‘oz-smola yupqa qatlam'],['Vazifasi','himoya va ko‘rinish']], matn:'DSP ustiga presslanadi — nam va tirnalishdan himoya qiladi.', manba:TX5},
    mix:{nom:'Mix', sarlavha2:'Birikma', jadval:[['Usul','bolg‘a bilan qoqiladi'],['Uzunlik','≈ 2–3 · ustki detal qalinligi (taxminiy)'],['Chetdan','≈ 10–15 mm']], matn:'Tez va arzon; tolalarni yorishi mumkin. Qiya qoqilgan juft mix mustahkamroq.', manba:TX5},
    shurup:{nom:'Shurup', sarlavha2:'Birikma', jadval:[['Usul','buraladi'],['Afzalligi','mustahkam, qayta ajratiladi'],['Qattiq yog‘och','oldindan teshik']], matn:'Rezba tolalarni kesib ushlaydi; bosh shakli (yassi, yarim dumaloq) vazifaga qarab.', manba:TX5},
    yelim:{nom:'Yelim qatlami (PVA)', sarlavha2:'Birikma', jadval:[['Surtish','ikkala yuzaga yupqa'],['Qisish','qisqichda, tayyorlovchi ko‘rsatmasi bo‘yicha'],['Ko‘rinishi','ko‘rinmas birikma']], matn:'Toza, quruq yuzalar; to‘liq qurigunicha yuklanmaydi.', manba:TX5},
    shponka:{nom:'Shkant (dumaloq shponka)', sarlavha2:'Birikma', jadval:[['Nima','dumaloq yog‘och tayoqcha'],['Usul','teshikka yelim bilan'],['Qayerda','mebel']], matn:'Ikki detaldagi teshiklar bir-biriga mos bo‘lishi shart — shablon ishlatiladi.', manba:TX5},
    tirnoq:{nom:'Tirnoqli (shipli) birikma', sarlavha2:'Birikma', jadval:[['Nima','detallar «tishlari» bir-biriga kiradi'],['Afzalligi','katta yuza, eng mustahkam'],['Qayerda','quti, tortma']], matn:'Yelim bilan birga ishlatiladi; aniq belgilash va arralash talab qiladi.', manba:TX5}
  },
  ts_elektr:{
    vilka:{nom:'Vilka (shtepsel)', sarlavha2:'Uy elektr tarmog‘i', jadval:[['Tur','C / F (O‘zbekiston)'],['Pinlar','2 dumaloq: L va N'],['F tur','yon yerga ulash kontaktlari']], matn:'Faqat korpusidan ushlab sug‘uriladi; shikastlangan vilka ishlatilmaydi.', manba:TX6 + '; CIA World Factbook'},
    rozetka:{nom:'Rozetka', sarlavha2:'Uy elektr tarmog‘i', jadval:[['Ulanadi','L, N, PE simlariga'],['Guruh','2,5 mm², 16 A'],['Hammomda','vannadan ≥ 0,6 m, UZO 30 mA']], matn:'Bolalar uchun himoya qopqoqli rozetka tavsiya etiladi; kuygan iz — almashtirish belgisi.', manba:ELEKTR_Q},
    avtomat:{nom:'Avtomatik o‘chirgich', sarlavha2:'Himoya', jadval:[['Nominal','10 / 16 / 25 A'],['Ortiqcha yuk','bimetall (sekin)'],['Qisqa tutashuv','elektromagnit (tez)']], matn:'Simni himoya qiladi; nominali sim kesimiga mos bo‘lishi shart.', manba:TX6 + '; ' + MW + ' «Circuit breaker»'},
    richag:{nom:'Avtomat richagi', sarlavha2:'Himoya', jadval:[['Yuqorida','ulangan'],['Pastda','uzilgan']], matn:'Uzilgan avtomatni yoqishdan oldin sabab topiladi.', manba:TX6},
    bimetall:{nom:'Bimetall plastina', sarlavha2:'Issiqlik ajratgich', jadval:[['Tuzilishi','ikki metall qatlami'],['Ishlashi','qizib egiladi, kontaktni ochadi'],['Himoya','ortiqcha yuklanish']], matn:'Metallar har xil kengayadi — plastina tok oshganda egiladi. Vaqt-tok xarakteristikasi: tok qancha katta, shuncha tez.', manba:TX6 + '; ' + MW + ' «Bimetallic strip»'},
    magnit:{nom:'Elektromagnit ajratgich', sarlavha2:'Himoya', jadval:[['Tuzilishi','g‘altak + yadro'],['Ishlashi','katta tokda yadroni tortadi'],['Vaqt','millisekundlar']], matn:'Qisqa tutashuvda tok yuzlab amper — g‘altak bir zumda uzadi.', manba:TX6},
    yer:{nom:'Yerga ulash (PE)', sarlavha2:'Himoya', jadval:[['Rang','sariq-yashil'],['Vazifa','korpusga faza tegsa tokni yerga o‘tkazish'],['Bilan birga','UZO 30 mA']], matn:'Odam emas, sim «yo‘l» bo‘ladi — himoya uziladi.', manba:ELEKTR_Q + '; IEC 60446'},
    faza:{nom:'Faza simi (L)', sarlavha2:'Tarmoq', jadval:[['Rang','jigarrang / qora'],['Kuchlanish','220/230 V yerga nisbatan']], matn:'Kuchlanish ostidagi sim — eng xavfli.', manba:'IEC 60446'},
    nol:{nom:'Nol simi (N)', sarlavha2:'Tarmoq', jadval:[['Rang','ko‘k'],['Vazifa','tok qaytadi']], matn:'Odatda yerga yaqin potensialda, lekin unga ham tegib bo‘lmaydi — nosozlikda kuchlanish bo‘lishi mumkin.', manba:'IEC 60446'},
    kabel:{nom:'Kabel', sarlavha2:'Jihoz', jadval:[['Tekshirish','izolyatsiya butunligi'],['Taqiq','shikastlangan kabel bilan ishlatish']], matn:'Kabel eshik ostida, gilam ostida qisilmasin; isitgich yaqinida erimasin.', manba:TX6},
    lampa:{nom:'Iste’molchi (chiroq)', sarlavha2:'Jihoz', jadval:[['Tok','I = P / U'],['60 Vt lampa','≈ 0,27 A']], matn:'Jihozlar toklari bir guruhda qo‘shiladi — avtomat nominalidan oshmasin.', manba:TX6}
  },
  ts_uzatma:{
    g1:{nom:'Yetaklovchi g‘ildirak (z₁)', sarlavha2:'Tishli uzatma', jadval:[['Vazifa','harakatni beradi'],['Tezlik','n₁']], matn:'Oq belgi bo‘yicha aylanishlarni sanang — i marta ko‘p aylanadi.', manba:TX7},
    g2:{nom:'Yetaklanuvchi g‘ildirak (z₂)', sarlavha2:'Tishli uzatma', jadval:[['Vazifa','harakatni oladi'],['Tezlik','n₂ = n₁ / i'],['Yo‘nalish','yetaklovchiga teskari']], matn:'i = z₂/z₁; z₂ > z₁ bo‘lsa sekinroq, lekin moment katta.', manba:TX7},
    val:{nom:'Val', sarlavha2:'Mashina detali', jadval:[['Vazifa','aylanishni uzatish'],['Bog‘lanish','shponka yoki shlits bilan']], matn:'G‘ildirak valga mahkam o‘rnatiladi — birga aylanadi.', manba:TX7},
    shkiv1:{nom:'Yetaklovchi shkiv (D₁)', sarlavha2:'Tasmali uzatma', jadval:[['Nisbat','i = D₂ / D₁'],['Ishqalanish','tasma bilan']], matn:'Tasma tarang bo‘lishi kerak; bo‘sh tasma sirpanadi.', manba:TX7},
    shkiv2:{nom:'Yetaklanuvchi shkiv (D₂)', sarlavha2:'Tasmali uzatma', jadval:[['Yo‘nalish','yetaklovchi bilan bir xil'],['Tezlik','n₂ = n₁ · D₁ / D₂']], matn:'Katta shkiv — sekin aylanish, katta moment.', manba:TX7},
    tasma:{nom:'Tasma', sarlavha2:'Tasmali uzatma', jadval:[['Afzallik','jim, uzoq vallar, sirpanish-himoya'],['Kamchilik','aniq emas, eskiradi'],['Turlari','yassi, ponasimon, tishli']], matn:'Ortiqcha yukda sirpanib mexanizmni saqlaydi.', manba:TX7 + '; ' + MW + ' «Belt (mechanical)»'},
    yulduz1:{nom:'Yetaklovchi yulduzcha (z₁)', sarlavha2:'Zanjirli uzatma', jadval:[['Nisbat','i = z₂ / z₁'],['Velosiped','pedal yulduzchasi ≈ 48']], matn:'Zanjir tishlarga ilashadi — sirpanmaydi.', manba:TX7},
    yulduz2:{nom:'Yetaklanuvchi yulduzcha (z₂)', sarlavha2:'Zanjirli uzatma', jadval:[['Velosiped','orqa yulduzcha ≈ 16'],['Yo‘nalish','bir xil']], matn:'Kichik orqa yulduzcha — g‘ildirak pedaldan tez aylanadi.', manba:TX7},
    zanjir:{nom:'Zanjir', sarlavha2:'Zanjirli uzatma', jadval:[['Afzallik','sirpanmaydi, katta kuch'],['Kamchilik','shovqin, moylash'],['Qayerda','velosiped, mototsikl, konveyer']], matn:'Zanjir cho‘zilsa yulduzchadan sakraydi — vaqtida tarang qilinadi.', manba:TX7 + '; ' + MW + ' «Chain drive»'}
  },
  ts_tikuv:{
    galtak:{nom:'G‘altak (yuqori ip)', sarlavha2:'Tikuv mashinasi', jadval:[['Qadam','1'],['Joyi','g‘altak ustunida']], matn:'Ip g‘altakdan erkin yechilishi kerak — g‘altak tutqichi bilan.', manba:TX8},
    yonaltirgich:{nom:'Ip yo‘naltirgich', sarlavha2:'Tikuv mashinasi', jadval:[['Qadam','2 va 5'],['Vazifa','ip yo‘nalishini to‘g‘rilash']], matn:'Yo‘naltirgichdan o‘tmagan ip chalkashadi.', manba:TX8},
    regulyator:{nom:'Ip tortilishi regulyatori', sarlavha2:'Tikuv mashinasi', jadval:[['Qadam','3'],['Tuzilishi','ikki tarelka + tugma'],['Qattiq','ip uziladi'],['Bo‘sh','ostda halqalar']], matn:'Ip tarelkalar orasiga kirishi shart; to‘g‘ri taranglikda tugun mato o‘rtasida.', manba:TX8},
    richag:{nom:'Ip tortuvchi richag', sarlavha2:'Tikuv mashinasi', jadval:[['Qadam','4'],['Vazifa','ipni berish va tortish']], matn:'Richag ko‘zidan o‘tkazilmagan ip bilan chok hosil bo‘lmaydi.', manba:TX8},
    igna:{nom:'Igna va igna bar', sarlavha2:'Tikuv mashinasi', jadval:[['Qadam','6'],['Ko‘zi','uchiga yaqin'],['Raqami','mato qalinligiga qarab']], matn:'Egilgan yoki o‘tmas igna chokni sakratadi — almashtiriladi.', manba:TX8},
    pana:{nom:'Bosim panjasi (lapka)', sarlavha2:'Tikuv mashinasi', jadval:[['Vazifa','matoni plastinaga bosish'],['Tikishdan oldin','tushiriladi']], matn:'Panja ko‘tarilgan holda tikilsa, mato surilmaydi va ip chalkashadi.', manba:TX8},
    moki:{nom:'Moki (ilgak) va shpulka', sarlavha2:'Tikuv mashinasi', jadval:[['Pastki ip','shpulkada'],['Ilgak','yuqori ip halqasini iladi'],['Chok','ikki ip bog‘lanadi']], matn:'Moki atrofi muntazam tozalanadi — ip qoldiqlari chokni buzadi.', manba:TX8 + '; ' + MW + ' «Lockstitch»'},
    gildirak:{nom:'Qo‘l g‘ildiragi (maxovik)', sarlavha2:'Tikuv mashinasi', jadval:[['Vazifa','qo‘lda aylantirish'],['Yo‘nalish','o‘zingizga tomon (ko‘p mashinalarda)']], matn:'Igna holatini o‘zgartirish va birinchi chokni qo‘lda bajarish uchun.', manba:TX8},
    plastina:{nom:'Igna plastinasi va surgich', sarlavha2:'Tikuv mashinasi', jadval:[['Surgich','tishli reyka'],['Vazifa','matoni bir chokka surish']], matn:'Matoni qo‘l bilan tortish ignani sindiradi — surgich o‘zi suradi.', manba:TX8},
    korpus:{nom:'Korpus', sarlavha2:'Tikuv mashinasi', jadval:[['Qismlari','platforma, ustun, yeng, bosh']], matn:'Yeng ichida asosiy val, boshda igna bar va richag mexanizmi.', manba:TX8},
    motor:{nom:'Pedal / yuritma', sarlavha2:'Tikuv mashinasi', jadval:[['Elektr','pedal tezlikni boshqaradi'],['Xavfsizlik','ip o‘tkazishda o‘chirilgan']], matn:'Pedalni sekin bosib boshlanadi.', manba:TX8}
  },
  ts_qurish:{
    quti:{nom:'Quti (parallelepiped)', sarlavha2:'Primitiv', jadval:[['O‘lchamlar','kenglik, balandlik, chuqurlik'],['Hajm','a · b · c']], matn:'Stol usti, devor, asos — eng ko‘p ishlatiladigan primitiv.', manba:TX9},
    sil:{nom:'Silindr', sarlavha2:'Primitiv', jadval:[['O‘lchamlar','diametr, balandlik'],['Hajm','π r² h']], matn:'Stakan, oyoq, val — silindrdan; ichini «ayirish» bilan bo‘shatish mumkin.', manba:TX9},
    shar:{nom:'Shar', sarlavha2:'Primitiv', jadval:[['O‘lcham','diametr'],['Hajm','4/3 π r³']], matn:'To‘p, dasta uchi; chop etishda pastki qismi uchun tayanch kerak.', manba:TX9},
    ekstruder:{nom:'Ekstruder (nozul)', sarlavha2:'FDM printer', jadval:[['Harorat','PLA ≈ 190–220 °C'],['Nozul','odatda 0,4 mm'],['Harakat','x, y; stol/ekstruder — z']], matn:'Ipni eritib qatlam sifatida yotqizadi.', manba:TX9 + '; Anycubic PLA qo‘llanmasi'},
    stol:{nom:'Ish stoli (platforma)', sarlavha2:'FDM printer', jadval:[['Isitish','ba’zan 50–60 °C'],['Tozalik','spirt bilan']], matn:'Birinchi qatlam stolga yopishishi — muvaffaqiyat kaliti.', manba:TX9},
    qatlam:{nom:'Qatlamlar', sarlavha2:'FDM printer', jadval:[['Balandlik','0,1–0,3 mm'],['Soni','H / h']], matn:'Yupqa qatlam — silliq yuza, uzoq vaqt; qalin — tez, g‘adir-budur.', manba:TX9},
    plastik:{nom:'Filament (PLA)', sarlavha2:'FDM printer', jadval:[['Diametr','1,75 mm (ko‘p printerlarda)'],['Material','PLA — o‘simlik kraxmalidan, biologik parchalanuvchi']], matn:'PLA eng oson chop etiladi; ABS mustahkamroq, lekin hid va deformatsiya ko‘proq.', manba:TX9 + '; ' + MW + ' «Polylactic acid»'}
  },
  ts_robot:{
    asos:{nom:'Asos (platforma)', sarlavha2:'Robot qo‘l', jadval:[['Servo 1','asos burilishi 0–180°']], matn:'Og‘ir asos — qo‘l ag‘darilmaydi.', manba:TX10},
    servo1:{nom:'Servo 1 — asos', sarlavha2:'Servo (SG90 turi)', jadval:[['Burchak','0–180°'],['Signal','50 Hz, ≈ 1–2 ms'],['Moment','≈ 1,8 kg·sm (4,8 V)']], matn:'Butun qo‘lni gorizontal buradi.', manba:'SG90 datasheet'},
    servo2:{nom:'Servo 2 — yelka', sarlavha2:'Servo', jadval:[['Yuk','eng katta — butun qo‘l og‘irligi'],['Maslahat','kuchliroq servo (MG996 kabi)']], matn:'Yelka servosi eng ko‘p moment talab qiladi.', manba:TX10},
    servo3:{nom:'Servo 3 — tirsak', sarlavha2:'Servo', jadval:[['Vazifa','bilakni bukish']], matn:'Tirsak va yelka birga qisqichni kerakli nuqtaga olib boradi.', manba:TX10},
    qisqich:{nom:'Qisqich (gripper)', sarlavha2:'Ijro mexanizmi', jadval:[['Boshqaruv','servo 0–180°'],['0°','yopiq'],['180°','ochiq']], matn:'Buyumni ezmaslik uchun kuch cheklanadi (tok yoki bosim sensori bilan).', manba:TX10},
    sensor:{nom:'Ultratovush sensori', sarlavha2:'HC-SR04 turi', jadval:[['Diapazon','2–400 sm'],['Chastota','40 kHz'],['Formula','s = t · 343 / 2'],['Aniqlik','≈ 0,3 sm']], matn:'Yumshoq va qiya yuzalarni yomon ko‘radi.', manba:'HC-SR04 qo‘llanmasi'},
    led:{nom:'Holat indikatori (LED)', sarlavha2:'Robot', jadval:[['Yashil','yo‘l ochiq'],['Qizil','masofa < chegara → to‘xta']], matn:'Dastur holatini ko‘rsatadi — nosozlikni topishda yordam beradi.', manba:TX10},
    plata:{nom:'Boshqaruv platasi', sarlavha2:'Mikrokontroller', jadval:[['Misol','Arduino, micro:bit'],['Vazifa','o‘qi → solishtir → buyruq']], matn:'Sikl sekundiga yuzlab marta takrorlanadi.', manba:TX10},
    tosiq:{nom:'To‘siq', sarlavha2:'Sinov obyekti', jadval:[['Masofa','slayder 2–60 sm']], matn:'Qattiq, tekis yuza — eng yaxshi aks-sado.', manba:TX10}
  },
  ts_rang:(function(){ const o = {}; ITTEN_DET.forEach(([k, n, t, q, iz])=>{ o[k] = {nom:n, sarlavha2:'Itten doirasi · ' + t + ' rang', jadval:[['Turi', t], ['Qarama-qarshi', q]], matn:iz, manba:SN5}; }); return o; })(),
  ts_persp:{
    bino1:{nom:'Yaqin bino', sarlavha2:'Perspektiva', jadval:[['Masofa','eng yaqin'],['Ko‘rinishi','eng katta']], matn:'Yaqin buyum katta; chuqurlik qirralari yo‘qolish nuqtasiga.', manba:SN6},
    bino2:{nom:'O‘rta bino', sarlavha2:'Perspektiva', jadval:[['Masofa','o‘rta']], matn:'Uzoqlashgan sari kichrayadi, lekin vertikallar vertikal.', manba:SN6},
    bino3:{nom:'Uzoq bino', sarlavha2:'Perspektiva', jadval:[['Masofa','eng uzoq'],['Ko‘rinishi','kichik, ufqqa yaqin']], matn:'Eng uzoq buyum yo‘qolish nuqtasiga eng yaqin.', manba:SN6},
    bino4:{nom:'Yaqin bino (o‘ng)', sarlavha2:'Perspektiva', jadval:[['Masofa','eng yaqin']], matn:'Chap va o‘ng qatorlar bir nuqtaga yig‘iladi.', manba:SN6},
    bino5:{nom:'O‘rta bino (o‘ng)', sarlavha2:'Perspektiva', jadval:[['Masofa','o‘rta']], matn:'Balandligi katta bo‘lsa ham, uzoqda kichik ko‘rinadi.', manba:SN6},
    bino6:{nom:'Uzoq bino (o‘ng)', sarlavha2:'Perspektiva', jadval:[['Masofa','eng uzoq']], matn:'Ufqqa eng yaqin.', manba:SN6},
    yol:{nom:'Yo‘l', sarlavha2:'Perspektiva', jadval:[['Chetlari','parallel'],['Rasmda','yo‘qolish nuqtasida uchrashadi']], matn:'Oq chiziqlar teng, lekin uzoqlashgan sari zichlashadi.', manba:SN6},
    daraxt:{nom:'Daraxt', sarlavha2:'Perspektiva', jadval:[['Bo‘yi','bir xil'],['Rasmda','uzoqdagi kichik']], matn:'Bir xil bo‘yli buyumlar qatori — kichrayish qoidasi.', manba:SN6}
  },
  ts_yorug:{
    yorug:{nom:'Yorug‘', sarlavha2:'Tonal zona', jadval:[['Qayerda','manbaga qaragan yuza'],['Tus','och']], matn:'Nur to‘g‘ri tushadi; blikdan tashqari eng och zona.', manba:SN7},
    blik:{nom:'Blik', sarlavha2:'Tonal zona', jadval:[['Qayerda','manba aksi'],['Tus','eng och'],['Yuza','silliqda aniq']], matn:'G‘adir-budur yuzada deyarli yo‘q.', manba:SN7},
    yarim:{nom:'Yarim soya', sarlavha2:'Tonal zona', jadval:[['Qayerda','yuza nurga qiya'],['Tus','o‘rta']], matn:'Yorug‘dan soyaga o‘tish; sharda keng, kubda yo‘q.', manba:SN7},
    soya:{nom:'Shaxsiy soya', sarlavha2:'Tonal zona', jadval:[['Qayerda','nur tushmaydigan tomon'],['Tus','to‘q']], matn:'Ichida refleks bor — butunlay qora emas.', manba:SN7},
    refleks:{nom:'Refleks', sarlavha2:'Tonal zona', jadval:[['Qayerda','soyaning pastki cheti'],['Sabab','atrofdan qaytgan nur'],['Qoida','yorug‘dan to‘qroq']], matn:'Rangli yuza yonida refleks shu rangda bo‘ladi.', manba:SN7},
    tushuvchi:{nom:'Tushuvchi soya', sarlavha2:'Tonal zona', jadval:[['Qayerda','manbaga qarama-qarshi tomonda yerda'],['Uzunligi','h / tg β'],['Eng to‘q','buyumga yaqin']], matn:'Chetlari uzoqlashgan sari yumshaydi.', manba:SN7},
    buyum:{nom:'Buyum', sarlavha2:'Qo‘yilma', jadval:[['Shakl','shar / kub / silindr']], matn:'Gips shakllar — akademik rasmning birinchi mashqi.', manba:SN7},
    manba:{nom:'Yorug‘lik manbai', sarlavha2:'Qo‘yilma', jadval:[['Yo‘nalish','slayder 0–360°'],['Balandlik','10–80°']], matn:'Bitta manba — aniq soyalar; bir nechta — murakkab.', manba:SN7}
  },
  ts_komp:{
    quyosh:{nom:'Quyosh', sarlavha2:'Kompozitsiya elementi', jadval:[['Og‘irlik','yorqin — «og‘ir»'],['Joy','kuchli nuqta']], matn:'Yorqin element ko‘zni tortadi — dominant bo‘lishi mumkin.', manba:SN8},
    daraxt:{nom:'Daraxt', sarlavha2:'Kompozitsiya elementi', jadval:[['Og‘irlik','katta, to‘q'],['Vazifa','ramka, qarshi og‘irlik']], matn:'Chetdagi daraxt kadrni «yopadi» va ko‘zni ichkariga qaytaradi.', manba:SN8},
    qayiq:{nom:'Qayiq', sarlavha2:'Kompozitsiya elementi', jadval:[['Harakat','yo‘nalishi oldida bo‘sh joy']], matn:'Harakatdagi obyekt oldida «havo» qoldiriladi.', manba:SN8},
    odam:{nom:'Odam', sarlavha2:'Kompozitsiya elementi', jadval:[['Og‘irlik','kichik, lekin diqqat tortadi'],['Qoida','odam har doim «og‘ir»']], matn:'Kichik figura ham katta daraxtni muvozanatlaydi — ko‘z odamni izlaydi.', manba:SN8},
    ufq:{nom:'Ufq chizig‘i', sarlavha2:'Kompozitsiya', jadval:[['Tavsiya','1/3 yoki 2/3'],['Markazda','rasm ikkiga bo‘linadi']], matn:'Osmon muhim — past ufq; yer muhim — baland.', manba:SN8}
  },
  ts_girih:{
    yulduz6:{nom:'6 burchakli yulduz', sarlavha2:'Girih', jadval:[['Simmetriya','6 o‘q, 60°'],['Davriy','ha — olti burchakli panjara'],['Qurish','aylanada 6 nuqta, bir nuqta tashlab']], matn:'Eng oddiy girih asosi.', manba:SN9},
    yulduz8:{nom:'8 burchakli yulduz', sarlavha2:'Girih', jadval:[['Simmetriya','8 o‘q, 45°'],['Davriy','ha — kvadrat panjara + kichik kvadratlar'],['Qurish','ikki kvadrat 45° burilgan']], matn:'O‘rta Osiyo me’morchiligida eng ko‘p uchraydi.', manba:SN9},
    yulduz10:{nom:'10 burchakli yulduz', sarlavha2:'Girih', jadval:[['Simmetriya','10 o‘q, 36°'],['Davriy','yo‘q — girih kesakchalari bilan'],['Tadqiqot','Lu & Steinhardt, 2007']], matn:'Beshburchak simmetriyasi tekislikni davriy to‘ldirmaydi — kvazikristall tartib.', manba:SN9 + '; Science 315 (2007)'},
    yulduz12:{nom:'12 burchakli yulduz', sarlavha2:'Girih', jadval:[['Simmetriya','12 o‘q, 30°'],['Davriy','ha (6 bilan)']], matn:'Markaziy «gul» sifatida 6 va 8 burchaklilar bilan birga.', manba:SN9}
  },
  ts_portret:{
    bosh:{nom:'Bosh', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Shakl','tuxumsimon'],['Kenglik','≈ 5 ko‘z'],['Balandlik','H']], matn:'Yuqorisi kengroq, iyakka torayadi.', manba:SN10},
    koz:{nom:'Ko‘z', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Chiziq','H / 2'],['Oraliq','1 ko‘z'],['Xato','yuqoriga chizish']], matn:'Ko‘z chizig‘i boshning aynan o‘rtasida.', manba:SN10},
    qosh:{nom:'Qosh', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Chiziq','yuzning yuqori 1/3 chegarasi'],['Quloq','shu chiziqdan boshlanadi']], matn:'Qosh ko‘zdan biroz yuqorida, peshona pastki chegarasi.', manba:SN10},
    burun:{nom:'Burun', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Asosi','yuzning 2/3 chegarasi'],['Kengligi','≈ 1 ko‘z']], matn:'Burun qanotlari ko‘zlar ichki burchaklari ostida.', manba:SN10},
    ogiz:{nom:'Og‘iz', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Chiziq','burun–iyak oralig‘ining yuqori 1/3'],['Burchaklar','qorachiqlar ostida']], matn:'Pastki lab yuqorigidan to‘laroq (odatda).', manba:SN10},
    quloq:{nom:'Quloq', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Joyi','qosh va burun asosi orasida'],['Profilda','bosh markazidan orqada']], matn:'Manbalarda yuqori chegara qosh yoki ko‘z — taxminiy.', manba:SN10},
    soch:{nom:'Soch chizig‘i', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Joyi','tepadan ≈ H / 7'],['Yuz','shu chiziqdan iyakgacha']], matn:'Soch hajmi bosh shaklini aldaydi — bosh suyagi sochdan kichik.', manba:SN10},
    iyak:{nom:'Iyak', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Joyi','eng past nuqta'],['Bo‘yin','iyakdan orqaroqda']], matn:'Jag‘ chizig‘i quloq tagidan iyakka.', manba:SN10},
    boyin:{nom:'Bo‘yin', sarlavha2:'Akademik taxminiy proporsiya', jadval:[['Kenglik','bosh kengligidan tor'],['Yo‘nalish','biroz oldinga qiya']], matn:'Bo‘yinni juda ingichka chizish — keng tarqalgan xato.', manba:SN10}
  },
  ts_behzod:{
    matn:{nom:'Matn kartushi (yuqori)', sarlavha2:'Miniatyura sahifasi', jadval:[['Vazifa','she’r matni'],['Xattot','naqqosh bilan bir ustaxonada']], matn:'Rasm matnni davom ettiradi — sahifa bir butun.', manba:SN11},
    matn2:{nom:'Matn kartushi (pastki)', sarlavha2:'Miniatyura sahifasi', jadval:[['Joyi','rasm ostida']], matn:'Kartushlar rasm chegarasini belgilaydi.', manba:SN11},
    osmon:{nom:'Oltin osmon', sarlavha2:'Miniatyura sahifasi', jadval:[['Rang','zarhal oltin yoki lojuvard'],['Bulutlar','xitoy uslubidagi spiral bulutlar']], matn:'Osmon ramziy — haqiqiy rang emas.', manba:SN11},
    bino:{nom:'Me’moriy ayvon (peshtoq)', sarlavha2:'Miniatyura sahifasi', jadval:[['Tasvir','tekis, bezakli yuza'],['Naqsh','girih, koshin']], matn:'Perspektivasiz — yuqoridan va olddan bir vaqtda.', manba:SN11},
    daraxt:{nom:'Gullagan daraxt', sarlavha2:'Miniatyura sahifasi', jadval:[['Ramz','bahor, hayot'],['Joyi','chekka — kompozitsiya ramkasi']], matn:'Daraxt ko‘pincha ramkadan tashqariga chiqadi.', manba:SN11},
    figuralar:{nom:'Odamlar guruhi', sarlavha2:'Miniatyura sahifasi', jadval:[['Soni','ko‘p, kichik'],['Harakat','aniq imo-ishora'],['Behzod','«hujjatli» aniqlik']], matn:'Har figuraning o‘z ishi bor — qurilish, bazm, suhbat.', manba:SN11},
    hovuz:{nom:'Hovuz / yer', sarlavha2:'Miniatyura sahifasi', jadval:[['Rang','lojuvard ko‘k'],['Joyi','pastda — yaqin reja']], matn:'Yer yuqoriga «ko‘tarilgan» — chuqurlik shunday beriladi.', manba:SN11}
  }
};
const qosh = ()=>{ const DT = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DET).forEach(k=>{ DT[k] = Object.assign(DT[k] || {}, DET[k]); }); };
qosh();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qosh);
})();
