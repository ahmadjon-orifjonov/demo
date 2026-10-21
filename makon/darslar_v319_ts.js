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
fanQosh({id:'sanat', nom:'Tasviriy san’at', rang:'#ff8fab', ik:'palitra', izoh:'Rang, perspektiva, yorug‘lik, kompozitsiya, girih, portret, miniatyura', tavsif:'Itten rang doirasi va RGB, chiziqli perspektiva 3D ko‘chada, yorug‘lik-soya 3D da, oltin kesim, Registon girih generatori, portret proporsiyalari va Behzod miniatyurasi tahlili.', mavzular:[]});
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
D['sn-rang'] = {
  fan:'sanat', qisqaNom:'Rang doirasi', nom:'Rang doirasi va rang aralashtirish', sinf:'5-sinf',
  qisqa:'5-sinf · Tasviriy san’at · «Rangshunoslik asoslari»',
  sahna:'ts_rang',
  tsUq:{rejim:'doira', qatlam:'hammasi', tanl:null},
  kor:{
    sarlavha:'Uch rangdan — butun doira',
    matn:'Bo‘yoqda uch asosiy rang bor: sariq, qizil va ko‘k — ularni boshqa ranglardan aralashtirib bo‘lmaydi. Ikkitasini aralashtirsak hosila ranglar chiqadi: to‘q sariq, yashil, binafsha; asosiy va hosila aralashsa — oltita uchinchi darajali rang. Shunday qilib 12 rangli Itten doirasi hosil bo‘ladi. Doirada qarama-qarshi turgan ranglar bir-birini kuchaytiradi, yonma-yonlari — uyg‘un. Muhim farq: ekranda ranglar nurdan yig‘iladi (RGB) — qizil, yashil, ko‘k nur birga oq beradi, bo‘yoqlar esa qo‘ng‘ir-qora. Doirani bosing, bo‘yoqlarni aralashtiring, RGB ni sinang.',
    punktlar:['<b>Asosiy (RYB):</b> sariq, qizil, ko‘k — aralashtirib hosil qilib bo‘lmaydi','<b>Hosila:</b> to‘q sariq (sariq + qizil), yashil (sariq + ko‘k), binafsha (qizil + ko‘k)','<b>Issiq / sovuq:</b> sariq–qizil tomoni issiq, ko‘k–yashil tomoni sovuq','<b>RGB (nur):</b> qizil + yashil + ko‘k = oq; ekran va proyektor shunday ishlaydi']
  },
  bolimlar:[
    {sarlavha:'Itten doirasi — 12 rang', jadval:[
      ['Asosiy (3)','sariq, qizil, ko‘k'],
      ['Hosila (3)','to‘q sariq, yashil, binafsha — ikki asosiy teng aralashmasi'],
      ['Uchinchi darajali (6)','sariq-to‘q sariq, qizil-to‘q sariq, qizil-binafsha, ko‘k-binafsha, ko‘k-yashil, sariq-yashil'],
      ['Qarama-qarshi (komplementar)','doirada qarshi: qizil–yashil, sariq–binafsha, ko‘k–to‘q sariq'],
      ['Issiq / sovuq','sariq…qizil-binafsha — issiq; binafsha…sariq-yashil — sovuq (chegarasi shartli)']
    ]},
    {sarlavha:'Uch rang tizimi', jadval:[
      ['RYB (bo‘yoq, rassomlik)','sariq, qizil, ko‘k; hammasi birga — qo‘ng‘ir-qora'],
      ['CMY(K) (bosmaxona)','moviy (cyan), pushti (magenta), sariq (+ qora)'],
      ['RGB (nur, ekran)','qizil, yashil, ko‘k; hammasi birga — oq'],
      ['Farq','bo‘yoq nurni yutadi (ayiradi), nur qo‘shiladi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Uch asosiy rang', matn:'Sariq, qizil, ko‘k — doiradagi uchburchak uchlari. Ularni boshqa bo‘yoqlardan aralashtirib hosil qilib bo‘lmaydi, lekin ulardan qolgan ranglar olinadi.', holat:{rejim:'doira', qatlam:'asosiy', tanl:'qizil'}},
    {sarlavha:'Hosila ranglar', matn:'Ikki asosiy rang teng aralashsa: sariq + qizil = to‘q sariq, sariq + ko‘k = yashil, qizil + ko‘k = binafsha. Doirada ular asosiylar orasida turadi.', holat:{rejim:'doira', qatlam:'hosila', tanl:'yashil'}},
    {sarlavha:'12 rang: uchinchi darajali', matn:'Asosiy va yonidagi hosila aralashsa, oltita oraliq rang chiqadi: masalan, sariq + to‘q sariq = sariq-to‘q sariq. Itten doirasi shu 12 rangdan iborat.', holat:{rejim:'doira', qatlam:'hammasi', tanl:'sariq-tosariq'}},
    {sarlavha:'Qarama-qarshi ranglar', matn:'Doirada bir-biriga qarshi turgan juftlik: qizil–yashil, sariq–binafsha, ko‘k–to‘q sariq. Yonma-yon qo‘yilsa ikkalasi ham yorqinroq ko‘rinadi; bo‘yoq sifatida aralashsa — kulrang-qo‘ng‘ir.', holat:{rejim:'doira', qatlam:'hammasi', tanl:'kok'}},
    {sarlavha:'Issiq va sovuq ranglar', matn:'Sariqdan qizil-binafshagacha — issiq (olov, quyosh); binafshadan sariq-yashilgacha — sovuq (suv, muz). Issiq ranglar oldinga «chiqadi», sovuqlar uzoqlashadi — rassomlar buni chuqurlik uchun ishlatadi.', holat:{rejim:'doira', qatlam:'issiq', tanl:null}},
    {sarlavha:'Bo‘yoqlarni aralashtirish (RYB)', matn:'«Aralashtirish» rejimida doirada ikki rangni bosing. Asosiylar aralashmasi hosila beradi; uzoq ranglar (masalan, qizil + yashil) xira qo‘ng‘ir chiqadi — bo‘yoq nurni yutadi.', holat:{rejim:'aral', a:'sariq', b:'kok'}},
    {sarlavha:'RGB: nur qo‘shiladi', matn:'Ekran piksellari qizil, yashil va ko‘k nurdan iborat. Qizil + yashil nur = sariq, yashil + ko‘k = moviy, qizil + ko‘k = pushti, uchalasi = oq. Bo‘yoqda esa uchala asosiy aralashsa qora-qo‘ng‘ir — shuning uchun RYB va RGB bir xil emas.', holat:{rejim:'rgb', rgb:{r:255, g:0, b:0, r2:0, g2:255, b2:0}}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Ranglarni toping va aralashtiring', holat:{rejim:'aral', qatlam:'hammasi', a:null, b:null},
    topshiriqlar:[
      {shart:'Ikki asosiy bo‘yoqni aralashtirib <b>yashil</b> hosil qiling.', hodisa:'ts-rang', kod:"ev.rejim==='aral' && ev.natija==='yashil'", izoh:'To‘g‘ri — <b>sariq + ko‘k = yashil</b>.'},
      {shart:'Endi <b>to‘q sariq</b> rang hosil qiling.', hodisa:'ts-rang', kod:"ev.rejim==='aral' && ev.natija==='tosariq'", izoh:'To‘g‘ri — <b>sariq + qizil = to‘q sariq</b>.'},
      {shart:'<b>Binafsha</b> rangni hosil qiling.', hodisa:'ts-rang', kod:"ev.rejim==='aral' && ev.natija==='binafsha'", izoh:'To‘g‘ri — <b>qizil + ko‘k = binafsha</b>.'},
      {shart:'«Doira» rejimiga o‘tib, <b>yashilga qarama-qarshi</b> rangni bosing.', hodisa:'ts-rang', kod:"ev.rejim==='doira' && ev.bos==='qizil'", izoh:'To‘g‘ri — yashilning qarama-qarshisi <b>qizil</b>: doirada ro‘parada.'},
      {shart:'«RGB» rejimida ikki nurni shunday sozlangki, natija <b>sariq</b> (#FFFF00) bo‘lsin.', hodisa:'ts-rang', kod:"ev.rejim==='rgb' && ev.natija==='#ffff00'", izoh:'To‘g‘ri — <b>qizil nur + yashil nur = sariq</b>; bo‘yoqda bunday emas.'}
    ]},
  test:[
    {s:'Bo‘yoqdagi (RYB) uch asosiy rang?', v:['Qizil, yashil, ko‘k','Sariq, qizil, ko‘k','Sariq, qizil, yashil','Oq, qora, kulrang'], t:1, izoh:'Rassomlik tizimida asosiy ranglar — <b>sariq, qizil, ko‘k</b>; qizil-yashil-ko‘k — nur (RGB) uchun.'},
    {s:'Sariq va ko‘k bo‘yoq aralashsa?', v:['To‘q sariq','Yashil','Binafsha','Qo‘ng‘ir'], t:1, izoh:'<b>Sariq + ko‘k = yashil</b> — hosila rang.'},
    {s:'Qizil va ko‘k bo‘yoq aralashsa?', v:['Yashil','Binafsha','To‘q sariq','Oq'], t:1, izoh:'<b>Qizil + ko‘k = binafsha</b>.'},
    {s:'Itten doirasida nechta rang bor?', v:['3','6','12','24'], t:2, izoh:'<b>12</b>: 3 asosiy + 3 hosila + 6 uchinchi darajali.'},
    {s:'Sariqqa qarama-qarshi rang?', v:['Qizil','Yashil','Binafsha','Ko‘k'], t:2, izoh:'Doirada sariq ro‘parasida <b>binafsha</b>.'},
    {s:'Qaysi ranglar «issiq» hisoblanadi?', v:['Ko‘k, moviy','Sariq, to‘q sariq, qizil','Yashil, binafsha','Oq, qora'], t:1, izoh:'<b>Sariq, to‘q sariq, qizil</b> — olov va quyosh ranglari; ko‘k va yashil — sovuq.'},
    {s:'Ekranda qizil, yashil va ko‘k nur birga qanday rang beradi?', v:['Qora','Oq','Qo‘ng‘ir','Kulrang'], t:1, izoh:'Nur qo‘shiladi: <b>R + G + B = oq</b>. Bo‘yoqda esa uch asosiy aralashsa qora-qo‘ng‘ir.'},
    {s:'Qizil nur va yashil nur birga?', v:['Qo‘ng‘ir','Sariq','Binafsha','Qora'], t:1, izoh:'RGB da <b>qizil + yashil = sariq</b> — bo‘yoqdagi qoidaga teskari ko‘rinadi, chunki nur qo‘shiladi.'},
    {s:'Qarama-qarshi ranglar yonma-yon qo‘yilsa nima bo‘ladi?', v:['Ikkalasi xiralashadi','Ikkalasi yorqinroq ko‘rinadi','Bir xil bo‘lib qoladi','Ko‘rinmaydi'], t:1, izoh:'Komplementar kontrast: <b>ikkalasi kuchayadi</b> — rassomlar diqqatni jalb qilish uchun ishlatadi.'},
    {s:'Oq nurni prizma orqali spektrga ajratib, 7 rang deb ta’riflagan olim?', v:['Isaak Nyuton','Iogannes Itten','Leonardo da Vinchi','Pifagor'], t:0, izoh:'<b>Nyuton</b> 1666-yildagi tajribalari (nashri 1672, «Opticks» 1704) — spektrda 7 rang.'},
    T3('Sahnadagi doirada <b>qizilga qarama-qarshi</b> rangni bosing.', 'ts-rang', 'bos', ['yashil'], ['Yashil', 'boshqa rang'], 'Qizilning komplementari — <b>yashil</b>: doirada ro‘parada, yonma-yon qo‘yilsa ikkalasi yorqinroq.')
  ],
  yordamchi:[
    {s:'Nega bo‘yoqda qizil + yashil qo‘ng‘ir, nurda esa sariq?', j:'Bo‘yoq nurni yutadi: qizil bo‘yoq yashil nurni yutadi, yashil bo‘yoq qizilni — ikkalasi birga deyarli hamma nurni yutib qo‘ng‘ir beradi. Nur esa qo‘shiladi: qizil nur + yashil nur ko‘zga sariq bo‘lib ko‘rinadi.', kalit:['nega','qo‘ng‘ir','nur']},
    {s:'Jigarrang qanday hosil qilinadi?', j:'To‘q sariqqa ozgina ko‘k (yoki qizilga yashil) qo‘shing — qarama-qarshi ranglar aralashmasi xira, jigarrang beradi. Oq bilan ochroq, qora bilan to‘qroq tus olinadi.', kalit:['jigarrang','qo‘ng‘ir']}
  ],
  maqola:[
    {sarlavha:'Rang qayerdan keladi', xatboshilar:[
      'Isaak Nyuton 1666-yilda oq quyosh nurini prizma orqali o‘tkazib, uni ranglar tasmasiga — spektrga ajratdi va yetti rangni nomladi: qizil, to‘q sariq, sariq, yashil, moviy, ko‘k, binafsha. Natijalarini 1672-yilda Qirollik jamiyatiga yozdi, to‘liq bayonini 1704-yilda «Opticks» kitobida chop etdi. Rang — nurning xususiyati; buyumlar nurning bir qismini yutib, qolganini qaytaradi, biz qaytganini ko‘ramiz.',
      'Shu sababli bo‘yoq va nur har xil «qoida» bo‘yicha aralashadi. Bo‘yoq nurni yutadi (ayiruvchi aralashish): qancha ko‘p bo‘yoq, shuncha ko‘p nur yutiladi, uch asosiy bo‘yoq birga qo‘ng‘ir-qora beradi. Nur qo‘shiladi (qo‘shuvchi aralashish): qizil, yashil va ko‘k nur birga oq beradi — ekran piksellari shunday.'
    ]},
    {sarlavha:'Itten doirasi', xatboshilar:[
      'Shveytsariyalik rassom va Bauhaus o‘qituvchisi Iogannes Itten 12 rangli doirani ommalashtirdi; u ranglar haqidagi ta’limotini «Rang san’ati» kitobida bayon qilgan. Doira markazida uch asosiy rang (sariq, qizil, ko‘k) uchburchagi, atrofida uch hosila (to‘q sariq, yashil, binafsha), tashqi halqada 12 rang: asosiy va hosilalar orasida oltita uchinchi darajali rang.',
      'Doira rassomga rang uyg‘unligini topishga yordam beradi: yonma-yon ranglar (analog) — tinch, uyg‘un; ro‘paradagi ranglar (komplementar) — kuchli kontrast; uchburchak uchlari (triada) — muvozanatli yorqin palitra. Issiq ranglar (sariqdan qizil-binafshagacha) oldinga chiqadi, sovuq ranglar (ko‘k, yashil) uzoqlashadi.',
      'Itten doirasi — rassomlik uchun qulay model, lekin fizik jihatdan aniq emas: masalan, nemis bosmachi Xarald Kyuppers Itten komplementarlari aralashmasi kulrang emas, qo‘ng‘ir berishini tanqid qilgan. Bosmaxonada aniqroq CMY (moviy, pushti, sariq) tizimi ishlatiladi.'
    ]},
    {sarlavha:'Rang aralashtirish amaliyoti', xatboshilar:[
      'Akvarel va guashda ranglar palitrada aralashtiriladi: ikki asosiy rang teng nisbatda — toza hosila; nisbat o‘zgarsa — oraliq tuslar (sariq ko‘proq — sariq-yashil). Oq qo‘shilsa rang ochiladi (tint), qora qo‘shilsa to‘qlashadi (shade), kulrang — xiralashadi (tone).',
      'Qarama-qarshi ranglarni ozgina aralashtirib tabiiy, xira tuslar — jigarrang, zaytun, kulrang-ko‘k olinadi; aynan shular tabiatdagi soya va yer ranglarini beradi. Yorqin ranglar yonida ozgina xira rang bo‘lsa, kompozitsiya «nafas oladi».'
    ]}
  ],
  formulalar:[
    ['Sariq + Qizil = To‘q sariq','Hosila rang (RYB)'],
    ['Sariq + Ko‘k = Yashil','Hosila rang (RYB)'],
    ['Qizil + Ko‘k = Binafsha','Hosila rang (RYB)'],
    ['R + G + B = Oq','Nur qo‘shiladi (RGB)'],
    ['R + G = Sariq, G + B = Moviy, R + B = Pushti','RGB juftliklar'],
    ['Komplementar = doirada 180°','12 rangda: 6 ta qadam narida']
  ],
  qiziqarli:[
    'Nyuton dastlab spektrda 5 rang ko‘rgan, keyin musiqa oktavasidagi 7 notaga moslab to‘q sariq va indigoni qo‘shgan — «yetti rang» shundan.',
    'Ekrandagi har piksel — uchta mayda chiroq (qizil, yashil, ko‘k); ularning yorqinligi 0 dan 255 gacha — shuning uchun «16 million rang».',
    'Bosmaxona 4 bo‘yoq ishlatadi: moviy, pushti, sariq va qora (CMYK) — rangli jurnal rasmi mayda nuqtalardan iborat.',
    'Ko‘k rang bo‘yog‘i — lojuvard (lazurit) — O‘rta asrlarda oltindan qimmat bo‘lgan; Behzod miniatyuralaridagi ko‘k ana shu toshdan.'
  ],
  lugat:[
    ['Asosiy ranglar','Boshqalardan aralashtirib olinmaydigan ranglar: sariq, qizil, ko‘k (bo‘yoqda).'],
    ['Hosila ranglar','Ikki asosiy rang aralashmasi: to‘q sariq, yashil, binafsha.'],
    ['Uchinchi darajali','Asosiy + yonidagi hosila.'],
    ['Rang doirasi','Ranglarni halqa bo‘ylab tartiblagan sxema.'],
    ['Komplementar','Doirada qarama-qarshi turgan ranglar.'],
    ['Issiq / sovuq ranglar','Sariq-qizil tomon / ko‘k-yashil tomon.'],
    ['Spektr','Oq nur ajralgan ranglar tasmasi.'],
    ['RGB','Qizil-yashil-ko‘k nur tizimi (ekran).'],
    ['CMYK','Bosmaxona bo‘yoq tizimi.'],
    ['Tus (tint/shade)','Rangga oq yoki qora qo‘shilgan holati.']
  ],
  manba:SN5 + '; ' + MW + ': «Color wheel», «Johannes Itten», «Primary color», «Additive color», «Subtractive color», «Opticks»; Kembrij universiteti kutubxonasi (Nyuton 1666/1672/1704). Itten doirasidagi uchinchi darajali ranglar nomlari manbalarda biroz farq qiladi — sahnada keng tarqalgan nomlar.',
  ishlanma:ish('5-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv rang doirasi (MAKON), akvarel bilan aralashtirish mashqi',
    ['Asosiy, hosila, uchinchi darajali ranglar, komplementar juftliklar, issiq/sovuq ranglar va RGB–RYB farqini o‘rgatish.', 'Estetik did, rangni his qilish va tozalikni tarbiyalash.', 'Kuzatish, taqqoslash va rang uyg‘unligini tanlash ko‘nikmasini rivojlantirish.'],
    ['Asosiy va hosila ranglarni nomlaydi','Ikki bo‘yoqdan hosila rang oladi','Komplementar juftlikni doirada topadi','Nur va bo‘yoq aralashuvi farqini aytadi'],
    ['MAKON sahnasi «Rang doirasi»','Akvarel/guash, qog‘oz, mo‘yqalam, palitra, suv idishi','Darslik, rang doirasi plakati'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> «Uch bo‘yoqdan nechta rang chiqadi?»','Taxmin aytadi.'],['8–16','<b>Asosiy va hosila.</b> MAKON doirasi; aralashtirish rejimi.','Sahnada aralashtiradi, daftarga yozadi.'],['16–28','<b>Amaliy ish.</b> Akvarel bilan 3 hosila rang va 2 uchinchi darajali rang olish.','Qog‘ozda rang doirasi bo‘laklarini bo‘yaydi.'],['28–36','<b>Komplementar, issiq/sovuq, RGB.</b> Sahnada; ekran pikseli haqida.','Juftliklarni topadi.'],['36–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Asosiy rang','Aralashtirib olinmaydigan.'],['Hosila','Ikki asosiy aralashmasi.'],['Komplementar','Qarama-qarshi.'],['RGB','Nur tizimi.']],
    [['Sariq + ko‘k?','Yashil'],['Sariqqa qarama-qarshi?','Binafsha'],['R + G + B (nur)?','Oq'],['Issiq ranglar?','Sariq, to‘q sariq, qizil']],
    'Darslikdagi mashqlar; akvarel bilan 12 rangli doira chizing; uydagi 5 buyum rangini doiradagi nom bilan yozing (issiq/sovuq deb belgilang).',
    SN5)
};

/* ================================================================
   S2. CHIZIQLI PERSPEKTIVA — 6-sinf
   ================================================================ */
D['sn-perspektiva'] = {
  fan:'sanat', qisqaNom:'Perspektiva', nom:'Chiziqli perspektiva', sinf:'6-sinf',
  qisqa:'6-sinf · Tasviriy san’at · «Perspektiva qonunlari»',
  sahna:'ts_persp',
  tsUq:{rejim:'bir', ufq:'orta', chiziq:false},
  kor:{
    sarlavha:'Parallel chiziqlar ufqda uchrashadi',
    matn:'Uzoqlashgan buyumlar kichrayadi, yo‘l chetlari esa bir nuqtada «uchrashadi» — bu chiziqli perspektiva. Ufq chizig‘i doim ko‘zimiz balandligida; unga qarab ketgan parallel chiziqlar ufqdagi yo‘qolish nuqtasida yig‘iladi. Buyumga to‘g‘ridan qarasak — bitta nuqta (frontal perspektiva), burchakdan qarasak — ufqda ikkita nuqta (burchakli). Sahnada 3D ko‘chani ko‘ring: sariq punktir — ufq, rangli chiziqlar bino qirralaridan yo‘qolish nuqtasiga boradi. Ufq balandligini o‘zgartiring.',
    punktlar:['<b>Ufq chizig‘i</b> — ko‘z balandligida; past ufq — buyumlar ulkan, baland ufq — «qush nuqtai nazari»','<b>Yo‘qolish nuqtasi</b> — ufqda; chuqurlikka ketgan parallel chiziqlar unda uchrashadi','<b>1 nuqtali:</b> buyumning bir tomoni bizga parallel; <b>2 nuqtali:</b> burchak bizga qaragan','<b>Qoida:</b> uzoqdagi buyum kichik, yaqindagi katta; vertikal chiziqlar vertikal qoladi (1 va 2 nuqtali perspektivada)']
  },
  bolimlar:[
    {sarlavha:'Perspektiva turlari', jadval:[
      ['Frontal (1 nuqtali)','buyumning yuzi bizga parallel; chuqurlik chiziqlari bitta nuqtaga'],
      ['Burchakli (2 nuqtali)','buyumning burchagi bizga qaragan; ikki yo‘qolish nuqtasi ufqda'],
      ['3 nuqtali','juda baland yoki past rakurs: vertikallar ham yig‘iladi (osmono‘par bino)'],
      ['Havo perspektivasi','uzoqdagi buyum xira, ko‘kimtir, kontrast kam — chiziqli emas, rang bilan']
    ]},
    {sarlavha:'Tarix', jadval:[
      ['≈ 1413–1420','Filippo Brunelleschi — Florensiyada perspektiva tajribasi (sana manbalarda farq qiladi)'],
      ['1435','Leon Battista Alberti «De pictura» — perspektiva qoidalarini birinchi yozib qoldirgan'],
      ['XV–XVI asr','Pyero della Francheska, Leonardo, Dyurer — perspektivani rivojlantirdi'],
      ['Sharq miniatyurasi','chiziqli perspektivasiz, «yuqoridan» tekis kompozitsiya — boshqa tizim']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Ufq — ko‘z balandligi', matn:'Sariq punktir — ufq chizig‘i. U doim kuzatuvchi ko‘zi balandligida: o‘tirsangiz pasayadi, tepalikka chiqsangiz ko‘tariladi. Hozir odam ko‘zi balandligi (≈ 1,6 m).', holat:{rejim:'bir', ufq:'orta', chiziq:true}},
    {sarlavha:'Yo‘qolish nuqtasi', matn:'Yo‘l chetlari, bino qirralari — hammasi bir nuqtaga yig‘iladi. Bu yo‘qolish nuqtasi ufqda, to‘g‘ri qarshimizda. Uzoqdagi binolar kichik va nuqtaga yaqin.', holat:{rejim:'bir', ufq:'orta', chiziq:true}},
    {sarlavha:'Past ufq', matn:'Kuzatuvchi yerga yaqin («qurbaqa nuqtai nazari»): ufq pastda, binolar ulkan ko‘rinadi, tomlar ko‘rinmaydi. Monumental tasvirlarda shu rakurs ishlatiladi.', holat:{rejim:'bir', ufq:'past', chiziq:true}},
    {sarlavha:'Baland ufq', matn:'Kuzatuvchi balandda («qush nuqtai nazari»): ufq yuqorida, yo‘l va tomlar ko‘proq ko‘rinadi, binolar pastda qoladi.', holat:{rejim:'bir', ufq:'baland', chiziq:true}},
    {sarlavha:'Ikki nuqtali perspektiva', matn:'Ko‘chaga burchakdan qaradik: binolarning ikki tomoni ko‘rinadi, har tomon qirralari o‘z yo‘qolish nuqtasiga — ufqning chap va o‘ng tomoniga ketadi. Vertikal qirralar vertikal qoladi.', holat:{rejim:'ikki', ufq:'orta', chiziq:true}},
    {sarlavha:'Chiziqlarsiz: ko‘z o‘zi topadi', matn:'Yordamchi chiziqlarni o‘chirdik. Endi o‘zingiz toping: ufq qayerda, chiziqlar qayerga yig‘iladi? Rasm chizganda avval ufq va yo‘qolish nuqtasi engil chiziladi, keyin buyumlar.', holat:{rejim:'ikki', ufq:'orta', chiziq:false}}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Perspektivani aniqlang',
    topshiriqlar:[
      {shart:'Sahnadagi ko‘chaga qarang. Bu qaysi perspektiva?', holat:{rejim:'bir', ufq:'orta', chiziq:false}, v:['1 nuqtali (frontal)','2 nuqtali (burchakli)','3 nuqtali','Havo perspektivasi'], t:0, izoh:'To‘g‘ri — binolar yuzi bizga parallel, chuqurlik chiziqlari <b>bitta nuqtaga</b> yig‘iladi.'},
      {shart:'Endi ko‘chaga qarang: binolarning ikki tomoni ko‘rinadi. Yo‘qolish nuqtalari nechta?', holat:{rejim:'ikki', ufq:'orta', chiziq:false}, v:['1','2','3','Yo‘q'], t:1, izoh:'To‘g‘ri — burchakli perspektiva: <b>ikki nuqta</b>, ikkalasi ufqda.'},
      {shart:'Sahnada ufq qayerda va kuzatuvchi qanday turibdi?', holat:{rejim:'bir', ufq:'past', chiziq:true}, v:['Ufq pastda — kuzatuvchi yerga yaqin','Ufq yuqorida — kuzatuvchi balandda','Ufq markazda — o‘tirgan','Ufq yo‘q'], t:0, izoh:'To‘g‘ri — <b>past ufq</b>: «qurbaqa nuqtai nazari», binolar ulkan.'},
      {shart:'Sahnada ufq yuqorida. Bu rakurs qanday ataladi?', holat:{rejim:'bir', ufq:'baland', chiziq:true}, v:['Qurbaqa nuqtai nazari','Qush nuqtai nazari','Frontal','Profil'], t:1, izoh:'To‘g‘ri — <b>qush nuqtai nazari</b>: tomlar va yo‘l ko‘proq ko‘rinadi.'},
      {shart:'Sahnadagi 2 nuqtali perspektivada binolarning vertikal qirralari qanday?', holat:{rejim:'ikki', ufq:'orta', chiziq:true}, v:['Yo‘qolish nuqtasiga yig‘iladi','Vertikal qoladi','Gorizontal bo‘ladi','Egri'], t:1, izoh:'To‘g‘ri — 1 va 2 nuqtali perspektivada <b>vertikallar vertikal qoladi</b>; faqat 3 nuqtalida yig‘iladi.'}
    ]},
  test:[
    {s:'Ufq chizig‘i rasmda qayerda joylashadi?', v:['Doim rasm markazida','Kuzatuvchi ko‘zi balandligida','Rasmning yuqori chetida','Yerda'], t:1, izoh:'Ufq — <b>ko‘z balandligi</b>; kuzatuvchi ko‘tarilsa ufq ham ko‘tariladi.'},
    {s:'Chuqurlikka ketgan parallel chiziqlar qayerda uchrashadi?', v:['Rasm burchagida','Ufqdagi yo‘qolish nuqtasida','Hech qayerda','Rasm pastida'], t:1, izoh:'<b>Yo‘qolish nuqtasi</b> ufqda — chuqurlik chiziqlari unda yig‘iladi.'},
    {s:'Buyumning yuzi bizga parallel. Bu qaysi perspektiva?', v:['1 nuqtali (frontal)','2 nuqtali','3 nuqtali','Havo'], t:0, izoh:'<b>Frontal</b> — bitta yo‘qolish nuqtasi, to‘g‘ri qarshida.'},
    {s:'2 nuqtali perspektivada yo‘qolish nuqtalari qayerda?', v:['Biri ufqda, biri osmonda','Ikkalasi ufqda, chap va o‘ngda','Ikkalasi markazda','Yerda'], t:1, izoh:'Ikkala nuqta <b>ufqda</b>: buyumning chap tomoni chapdagisiga, o‘ng tomoni o‘ngdagisiga.'},
    {s:'Ufq past bo‘lsa, binolar qanday ko‘rinadi?', v:['Kichik, tomlari ko‘rinadi','Ulkan, tomlari ko‘rinmaydi','O‘zgarmaydi','Teskari'], t:1, izoh:'<b>Past ufq</b> — «qurbaqa nuqtai nazari»: buyumlar monumental ko‘rinadi.'},
    {s:'Uzoqdagi tog‘larning ko‘kimtir va xira ko‘rinishi qaysi perspektiva?', v:['Chiziqli','Havo (rang) perspektivasi','3 nuqtali','Frontal'], t:1, izoh:'<b>Havo perspektivasi</b> — masofa oshgani sari kontrast kamayadi, rang ko‘kka tortadi.'},
    {s:'Perspektiva qoidalarini birinchi bo‘lib yozma bayon qilgan asar?', v:['Alberti «De pictura», 1435','Nyuton «Opticks», 1704','Itten «Rang san’ati»','Vitruviy «Me’morchilik»'], t:0, izoh:'<b>Alberti, «De pictura» (1435)</b>; Brunelleschi tajribalari (≈ 1413–1420) yozilmagan.'},
    {s:'1 va 2 nuqtali perspektivada vertikal chiziqlar qanday chiziladi?', v:['Yo‘qolish nuqtasiga','Vertikal, parallel','Gorizontal','Egri'], t:1, izoh:'<b>Vertikal qoladi</b>; vertikallar faqat 3 nuqtali (juda baland/past rakurs) perspektivada yig‘iladi.'},
    {s:'Rasm chizishda birinchi qaysi chiziq engil chiziladi?', v:['Buyum soyasi','Ufq chizig‘i va yo‘qolish nuqtasi','Detallar','Ramka'], t:1, izoh:'Avval <b>ufq va yo‘qolish nuqtasi</b>, keyin buyumlarning chuqurlik chiziqlari.'},
    T3('Sahnada ko‘cha. Ufqqa eng yaqin — <b>eng uzoqdagi</b> binoni bosing.', 'ts-persp', 'joy', ['uzoq'], ['Eng uzoqdagi bino', 'boshqa bino'], 'Eng uzoq bino <b>eng kichik</b> va yo‘qolish nuqtasiga eng yaqin — perspektiva qoidasi.')
  ],
  yordamchi:[
    {s:'Ufqni rasmda qayerga qo‘yay?', j:'Markazdan yuqoriroq yoki pastroq — markazda bo‘lsa rasm «ikki bo‘linadi». Osmon muhim bo‘lsa, ufq pastroq; yer va yo‘l muhim bo‘lsa — balandroq (uchdan bir qoidasi).', kalit:['ufq','qayerga']},
    {s:'Odamlar rasmda qanday kichrayadi?', j:'Hamma bir xil bo‘yli odamlarning boshi (tekis yerda) ufq chizig‘ida bo‘ladi, oyoqlari esa uzoqlashgani sari ufqqa yaqinlashadi. Shuning uchun uzoqdagi odam kichik, lekin boshi o‘sha balandlikda.', kalit:['odam','kichrayadi']}
  ],
  maqola:[
    {sarlavha:'Perspektiva kashfiyoti', xatboshilar:[
      'Qadimgi va o‘rta asr rasmlarida uzoqdagi buyumlar ko‘pincha yaqindagilar bilan bir xil kattalikda chizilgan — muhimi kattaroq edi. XV asr boshida Florensiyada me’mor Filippo Brunelleschi mashhur tajriba o‘tkazdi: Florensiya baptisteriysini perspektivada chizib, rasmdagi teshik va ko‘zgu orqali haqiqiy bino bilan solishtirishni taklif qildi. Tajriba sanasi manbalarda 1413 dan 1420 gacha farq qiladi.',
      'Brunelleschi qoidalarni yozmagan. Buni 1435-yilda Leon Battista Alberti «De pictura» («Rasm haqida») risolasida qildi: ufq chizig‘i, yo‘qolish nuqtasi, chuqurlik chiziqlari (ortogonallar). Shundan keyin Pyero della Francheska, Leonardo da Vinchi va Albrext Dyurer perspektivani geometriya fani darajasiga ko‘tardi.'
    ]},
    {sarlavha:'Qoidalar: ufq, nuqta, kichrayish', xatboshilar:[
      'Ufq chizig‘i — kuzatuvchi ko‘zi balandligidagi gorizontal chiziq. Tekis yerda turgan barcha bir xil bo‘yli odamlarning ko‘zi ufqda bo‘ladi — qanchalik uzoq bo‘lmasin. Kuzatuvchi o‘tirsa ufq pasayadi (buyumlar ulkan — «qurbaqa nuqtai nazari»), balandga chiqsa ko‘tariladi («qush nuqtai nazari»).',
      'Chuqurlikka ketgan parallel chiziqlar — yo‘l chetlari, bino qirralari, relslar — ufqdagi bitta nuqtada uchrashadi: yo‘qolish nuqtasi. Buyum yuzi bizga parallel bo‘lsa nuqta bitta (frontal perspektiva); burchagi bizga qaragan bo‘lsa ikki tomon ikki nuqtaga ketadi (burchakli perspektiva), ikkalasi ham ufqda. Vertikal chiziqlar bu ikki holda vertikal qoladi; faqat juda baland yoki past rakursda (osmono‘par bino tagidan) ular ham yig‘iladi — 3 nuqtali perspektiva.',
      'Uzoqlashgan buyum kichrayadi, lekin proporsiyasi saqlanadi; teng bo‘laklar (ustunlar, derazalar) uzoqlashgan sari zichlashadi. Bu qonuniyatlar sahnadagi 3D ko‘chada bevosita ko‘rinadi.'
    ]},
    {sarlavha:'Havo perspektivasi va Sharq miniatyurasi', xatboshilar:[
      'Chiziqli perspektivadan tashqari havo (rang) perspektivasi bor: masofa oshgani sari havo qatlami buyumni xiralashtiradi, kontrast kamayadi, rang ko‘kka tortadi. Leonardo buni manzaralarida ongli qo‘llagan. Rasmda uzoq tog‘lar och ko‘k, yaqin daraxt to‘q yashil chiziladi.',
      'Sharq, jumladan Hirot miniatyurasi chiziqli perspektivadan foydalanmagan: kompozitsiya tekis, «yuqoridan» qaralgan, uzoqdagi narsa rasmning yuqori qismiga joylashtirilgan. Bu — xato emas, boshqa tasvir tizimi; Behzod darsida u batafsil ko‘riladi.'
    ]}
  ],
  formulalar:[
    ['Ufq = ko‘z balandligi','Kuzatuvchi ko‘tarilsa — ufq ko‘tariladi'],
    ['h(rasm) ∝ 1 / d','Buyum tasviri balandligi masofaga teskari (taxminiy)'],
    ['1 nuqta: yuza ∥ kuzatuvchi','Frontal perspektiva'],
    ['2 nuqta: burchak → kuzatuvchi','Burchakli perspektiva, ikkala nuqta ufqda']
  ],
  qiziqarli:[
    'Brunelleschi tajribasida tomosha qiluvchi rasm orqasidagi teshikdan qarab, ko‘zguda aksini ko‘rgan — rasm bilan haqiqiy bino bir xil ko‘ringan.',
    'Leonardo da Vinchining «Oxirgi kechlik» freskasida barcha chuqurlik chiziqlari Isoning boshidagi bitta nuqtaga yig‘iladi.',
    'Temir yo‘l relslari ufqda «tutashgandek» ko‘rinadi — bu yo‘qolish nuqtasining eng oddiy misoli.',
    'Ko‘cha rassomlari (3D asfalt rasmlari) perspektivani teskari qo‘llab, faqat bitta nuqtadan qaralganda «chuqurlik» hosil qiladi — anamorfoz.'
  ],
  lugat:[
    ['Perspektiva','Fazoviy chuqurlikni tekislikda tasvirlash tizimi.'],
    ['Ufq chizig‘i','Ko‘z balandligidagi gorizontal chiziq.'],
    ['Yo‘qolish nuqtasi','Parallel chiziqlar uchrashadigan ufqdagi nuqta.'],
    ['Frontal perspektiva','Bir yo‘qolish nuqtali.'],
    ['Burchakli perspektiva','Ikki yo‘qolish nuqtali.'],
    ['Rakurs','Kuzatuvchining buyumga nisbatan holati.'],
    ['Qush / qurbaqa nuqtai nazari','Baland / past rakurs.'],
    ['Havo perspektivasi','Masofa bilan rang va kontrastning xiralashuvi.'],
    ['Ortogonal','Yo‘qolish nuqtasiga ketuvchi chuqurlik chizig‘i.']
  ],
  manba:SN6 + '; ' + MW + ': «Perspective (graphical)», «Filippo Brunelleschi», «De pictura»; Smarthistory «Linear perspective: Brunelleschi’s experiment»; MacTutor «Mathematics and art — perspective». Brunelleschi tajribasi sanasi manbalarda 1413–1420 — matnda oraliq.',
  ishlanma:ish('6-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D ko‘cha (ufq, yo‘qolish nuqtalari), chizma mashqi',
    ['Ufq chizig‘i, yo‘qolish nuqtasi, 1 va 2 nuqtali perspektiva qoidalarini o‘rgatish.', 'Kuzatuvchanlik va aniqlikni tarbiyalash.', 'Fazoviy tasavvur va chizmada chuqurlik berish ko‘nikmasini rivojlantirish.'],
    ['Ufq va yo‘qolish nuqtasini rasmda topadi','1 va 2 nuqtali perspektivani farqlaydi','Ufq balandligi ta’sirini tushuntiradi','Oddiy ko‘cha/xonani perspektivada chizadi'],
    ['MAKON sahnasi «Chiziqli perspektiva»','Qog‘oz, qalam, chizg‘ich','Darslik, perspektivali rasm reproduksiyalari'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Relslar ufqda nega tutashadi?','Taxmin aytadi.'],['8–18','<b>Ufq va nuqta.</b> MAKON: 1 nuqtali, ufq balandligi.','Kuzatadi, daftarga sxema chizadi.'],['18–26','<b>2 nuqtali.</b> Burchakli perspektiva, vertikallar.','Farqni jadvalga yozadi.'],['26–38','<b>Amaliy ish.</b> Qog‘ozda 1 nuqtali ko‘cha (ufq, nuqta, 3 bino).','Chizadi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Ufq','Ko‘z balandligi chizig‘i.'],['Yo‘qolish nuqtasi','Chiziqlar uchrashadigan nuqta.'],['Frontal','1 nuqtali.'],['Burchakli','2 nuqtali.']],
    [['Ufq qayerda?','Ko‘z balandligida'],['Yuza parallel bo‘lsa — nuqta nechta?','1'],['Past ufqda binolar?','Ulkan'],['Vertikal chiziqlar (2 nuqtali)?','Vertikal qoladi']],
    'Darslikdagi mashqlar; o‘z xonangizni 1 nuqtali perspektivada chizing (ufq, yo‘qolish nuqtasi, 3–4 buyum).',
    SN6)
};

/* ================================================================
   S3. YORUG‘LIK, SOYA VA HAJM — 7-sinf
   ================================================================ */
D['sn-yorugluk'] = {
  fan:'sanat', qisqaNom:'Yorug‘lik va soya', nom:'Yorug‘lik, soya va hajm', sinf:'7-sinf',
  qisqa:'7-sinf · Tasviriy san’at · «Yorug‘soya va hajm»',
  sahna:'ts_yorug',
  tsUq:{shakl:'shar', az:40, bal:45, yorliq:true},
  kor:{
    sarlavha:'Hajm — yorug‘likdan soyagacha o‘tish',
    matn:'Qog‘ozdagi doira sharga faqat yorug‘soya bilan aylanadi. Yorug‘lik manbaiga qaragan yuza — yorug‘; eng yorug‘ nuqta — blik; yuza burilgan sari yarim soya; nur tushmaydigan tomon — shaxsiy soya; soya ichida atrofdan qaytgan nur — refleks; buyum yerga tashlagan soya — tushuvchi soya. Sahnada manbani aylantiring va ko‘taring: zonalar va tushuvchi soya o‘zgaradi. Shar, kub va silindrni solishtiring.',
    punktlar:['<b>Tonal zonalar:</b> blik → yorug‘ → yarim soya → shaxsiy soya → refleks','<b>Tushuvchi soya</b> manbaga qarama-qarshi tomonda; manba past bo‘lsa — uzun, baland bo‘lsa — qisqa','<b>Shar</b> — zonalar silliq o‘tadi; <b>kub</b> — har yoq bir tusda, keskin chegara; <b>silindr</b> — ikkalasining oralig‘i','<b>Refleks</b> hech qachon yorug‘dan yorqin bo‘lmaydi — ko‘p uchraydigan xato']
  },
  bolimlar:[
    {sarlavha:'Yorug‘soya elementlari', jadval:[
      ['Blik','manba aksi — eng yorug‘ kichik nuqta (silliq yuzada aniq, g‘adir-budurda xira)'],
      ['Yorug‘','nur to‘g‘ri tushgan yuza'],
      ['Yarim soya','yuza nurga qiya — o‘tish zonasi'],
      ['Shaxsiy soya','buyumning nur tushmaydigan tomoni'],
      ['Refleks','soyaga atrofdagi yuzalardan qaytgan nur; yorug‘dan doim to‘qroq'],
      ['Tushuvchi soya','buyum boshqa yuzaga tashlagan soya; buyumga yaqin joyi eng to‘q va aniq']
    ]},
    {sarlavha:'Manba va soya', jadval:[
      ['Manba past (20°)','tushuvchi soya uzun, shaxsiy soya katta'],
      ['Manba baland (70°)','tushuvchi soya qisqa, buyum ostida'],
      ['Manba yon (90° yonlama)','hajm eng yaxshi ko‘rinadi — akademik qo‘yilma'],
      ['Manba old (frontal)','hajm yassilanadi — soyalar deyarli ko‘rinmaydi'],
      ['Manba orqa (kontrajur)','siluet, chetlarda yorug‘ hoshiya']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Shar: zonalar silliq o‘tadi', matn:'Manba chap-yuqorida. Sharda blik, yorug‘, yarim soya, shaxsiy soya va refleks bir-biriga silliq o‘tadi — chegara yo‘q. Rangli belgilar zonalarni ko‘rsatadi, bosing.', holat:{shakl:'shar', az:40, bal:45, yorliq:true}},
    {sarlavha:'Tushuvchi soya', matn:'Shar yerga soya tashlaydi — manbaga qarama-qarshi tomonga. Sharga yaqin joyi eng to‘q va aniq, uzoqlashgan sari ochroq va yumshoq. Soya shakli buyum va yuza shakliga bog‘liq.', holat:{shakl:'shar', az:40, bal:45, yorliq:true}},
    {sarlavha:'Manba past: soya uzayadi', matn:'Manbani 20° ga tushirdik — tushuvchi soya cho‘zildi, shaxsiy soya sharning yarmidan ko‘pini egalladi. Quyosh botayotganda ham shunday.', holat:{shakl:'shar', az:40, bal:20, yorliq:true}},
    {sarlavha:'Manba baland: soya qisqaradi', matn:'Manba 75° da — soya sharning ostida, qisqa. Peshin quyoshi. Hajm yomonroq ko‘rinadi, chunki yon yuzalar bir xil yoritiladi.', holat:{shakl:'shar', az:40, bal:75, yorliq:true}},
    {sarlavha:'Kub: har yoq bir tusda', matn:'Kubda zonalar o‘tmaydi — har yoq o‘z tusida: yuqori yoq eng yorug‘, manbaga qaragan yon yoq yorug‘roq, qarshi yoq soyada. Qirralar keskin chegara. Refleks soyadagi yoqning pastida.', holat:{shakl:'kub', az:40, bal:45, yorliq:true}},
    {sarlavha:'Silindr: ikkalasi birga', matn:'Silindrning yon yuzasi sharga o‘xshab silliq o‘tadi (vertikal polosalar: yorug‘ — yarim soya — soya — refleks), yuqori yoqi esa kub kabi bir tusda.', holat:{shakl:'silindr', az:40, bal:45, yorliq:true}},
    {sarlavha:'Manba orqadan: kontrajur', matn:'Manbani orqaga (200°) o‘tkazdik — buyum siluetga aylandi, faqat chetlarida yorug‘ hoshiya, tushuvchi soya bizga qarab tushadi. Rassomlar dramatik effekt uchun ishlatadi.', holat:{shakl:'shar', az:200, bal:30, yorliq:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Yorug‘likni boshqaring', holat:{shakl:'shar', az:40, bal:45, yorliq:true},
    topshiriqlar:[
      {shart:'Sahnada <b>tushuvchi soya</b> belgisini bosing.', hodisa:'ts-yorug', kod:"ev.bos==='tushuvchi'", izoh:'To‘g‘ri — tushuvchi soya <b>manbaga qarama-qarshi</b> tomonda, buyum ostidan boshlanadi.'},
      {shart:'Manbani pasaytiring (balandlik <b>≤ 20°</b>) — soya uzaysin.', hodisa:'ts-yorug', kod:"ev.bal<=20", izoh:'To‘g‘ri — past manba: <b>uzun soya</b>, katta shaxsiy soya (botayotgan quyosh).'},
      {shart:'Manbani ko‘taring (balandlik <b>≥ 70°</b>) — soya qisqarsin.', hodisa:'ts-yorug', kod:"ev.bal>=70", izoh:'To‘g‘ri — baland manba: <b>qisqa soya</b> buyum ostida (peshin).'},
      {shart:'<b>Kub</b>ni tanlang va soyadagi yoqdagi <b>refleks</b> belgisini bosing.', hodisa:'ts-yorug', kod:"ev.shakl==='kub' && ev.bos==='refleks'", izoh:'To‘g‘ri — <b>refleks</b> — soyadagi yoqqa yerdan qaytgan nur; yorug‘dan doim to‘qroq.'},
      {shart:'Sharga qaytib, eng yorug‘ nuqta — <b>blik</b>ni bosing.', hodisa:'ts-yorug', kod:"ev.shakl==='shar' && ev.bos==='blik'", izoh:'To‘g‘ri — <b>blik</b> — manbaning yuzadagi aksi; silliq yuzada aniq, g‘adir-budurda deyarli yo‘q.'}
    ]},
  test:[
    {s:'Buyumning nur tushmaydigan tomoni nima deyiladi?', v:['Blik','Shaxsiy soya','Tushuvchi soya','Refleks'], t:1, izoh:'<b>Shaxsiy soya</b> — buyumning o‘zidagi soya; tushuvchi soya — boshqa yuzadagi.'},
    {s:'Refleks nima?', v:['Eng yorug‘ nuqta','Soyaga atrofdan qaytgan nur','Buyum tashlagan soya','Manba'], t:1, izoh:'<b>Refleks</b> — soya ichida yerdan yoki devordan qaytgan nur; yorug‘dan to‘qroq.'},
    {s:'Manba pastga tushsa tushuvchi soya qanday o‘zgaradi?', v:['Qisqaradi','Uzayadi','Yo‘qoladi','Rangi o‘zgaradi'], t:1, izoh:'Past manba — <b>uzun soya</b> (kechki quyosh).'},
    {s:'Tushuvchi soyaning eng to‘q joyi qayerda?', v:['Buyumdan uzoqda','Buyumga yaqin joyda','O‘rtasida','Hamma joyda bir xil'], t:1, izoh:'<b>Buyumga yaqin</b> — u yerda atrofdan nur kam tushadi; uzoqlashgan sari ochroq, chetlari yumshoq.'},
    {s:'Qaysi shaklda tonal zonalar keskin chegara bilan ajraladi?', v:['Shar','Kub','Silindr (yon yuza)','Tuxum'], t:1, izoh:'<b>Kub</b> — har yoq bir tusda, qirralar chegara; sharda zonalar silliq o‘tadi.'},
    {s:'Blik qanday yuzada eng aniq ko‘rinadi?', v:['G‘adir-budur','Silliq, yaltiroq','Matoda','Qog‘ozda'], t:1, izoh:'<b>Silliq yuza</b> manbani aks ettiradi — blik aniq; g‘adir-budurda nur sochiladi.'},
    {s:'Ko‘p uchraydigan xato: refleksni…', v:['Juda to‘q chizish','Yorug‘dan yorqin chizish','Chizmaslik','Qora chizish'], t:1, izoh:'Refleks <b>hech qachon yorug‘dan yorqin bo‘lmaydi</b> — aks holda hajm buziladi.'},
    {s:'Hajmni eng yaxshi ko‘rsatadigan yoritish?', v:['Old (frontal)','Yon (45–90°), biroz yuqoridan','Orqa (kontrajur)','Pastdan'], t:1, izoh:'<b>Yon-yuqori</b> yoritish — barcha zonalar ko‘rinadi; frontal yassilaydi, kontrajur siluet beradi.'},
    {s:'Manba orqada bo‘lsa (kontrajur) buyum qanday ko‘rinadi?', v:['To‘liq yorug‘','Siluet, chetlarida yorug‘ hoshiya','Soyasiz','Ko‘rinmaydi'], t:1, izoh:'<b>Kontrajur</b> — buyum qorong‘i siluet, chetlarida yorug‘ chiziq.'},
    T3('Sahnadagi sharda soyaga atrofdan qaytgan nur zonasi — <b>refleksni</b> bosing.', 'ts-yorug', 'bos', ['refleks'], ['Refleks (soyaning pastki qismi)', 'boshqa zona'], '<b>Refleks</b> shaxsiy soyaning pastki chetida — yerdan qaytgan nur; yorug‘dan to‘qroq.')
  ],
  yordamchi:[
    {s:'Soya qanday yo‘nalishda chiziladi?', j:'Manbadan buyum orqali o‘tgan chiziq davomida — manbaga qarama-qarshi tomonda. Manba chapda bo‘lsa, soya o‘ngda. Uzunligi manba balandligiga bog‘liq: past manba — uzun soya.', kalit:['soya','yo‘nalish']},
    {s:'Qalam bilan nechta tus kerak?', j:'Boshlang‘ich uchun 5 tus yetarli: blik (qog‘oz oq), yorug‘ (engil), yarim soya (o‘rta), soya (to‘q), refleks (soyadan sal ochroq). Tushuvchi soya buyum yonida eng to‘q.', kalit:['tus','qalam','nechta']}
  ],
  maqola:[
    {sarlavha:'Yorug‘lik hajmni «chizadi»', xatboshilar:[
      'Biz buyum shaklini uning yuzasidagi yorug‘lik taqsimotidan bilamiz. Nur manbaga qaragan yuzani yoritadi, qiya yuzani kamroq, orqa yuzani umuman yoritmaydi. Rassom aynan shu taqsimotni qog‘ozga ko‘chiradi — va doira sharga, kvadrat kubga aylanadi. Shuning uchun akademik rasmda avval gips shakllar (shar, kub, silindr, konus) chiziladi: ularda yorug‘soya qonunlari toza ko‘rinadi.',
      'Tonal zonalar tartibi: blik (manbaning aksi, eng yorug‘), yorug‘, yarim soya (o‘tish), shaxsiy soya (nur tushmaydi), refleks (soyaga atrofdan qaytgan nur). Buyum atrofdagi yuzaga tushuvchi soya tashlaydi — manbaga qarama-qarshi tomonda. Refleks va tushuvchi soyani to‘g‘ri berish rasmga «havo» beradi.'
    ]},
    {sarlavha:'Shar, kub, silindr', xatboshilar:[
      'Sharda yuza uzluksiz buriladi, shuning uchun zonalar silliq, chegarasiz o‘tadi — «yumshoq» yorug‘soya. Kubda har yoq tekis va o‘z burchagida — har yoq bir tusda, qirralar keskin chegara; yuqori yoq odatda eng yorug‘ (manba yuqorida). Silindr ikkalasini birlashtiradi: yon yuzada vertikal polosalar silliq o‘tadi, yuqori doira yoq bir tusda.',
      'Manba holati hamma narsani o‘zgartiradi. Yon-yuqoridan (45–60°) yoritish barcha zonalarni ko‘rsatadi — akademik qo‘yilma. Frontal yoritish hajmni yassilaydi (shuning uchun blits bilan olingan surat tekis ko‘rinadi). Orqadan yoritish (kontrajur) siluet beradi. Past manba uzun dramatik soya, baland manba — qisqa, buyum ostida.'
    ]},
    {sarlavha:'Tarixdan: kiaroskuro', xatboshilar:[
      'Uyg‘onish davri rassomlari yorug‘soyani hajm vositasi sifatida o‘rgandilar; Leonardo «sfumato» — tutunday yumshoq o‘tishlar bilan mashhur. XVII asrda Karavadjo keskin yorug‘lik va chuqur soya kontrastini — kiaroskuro (italyancha «yorug‘-qorong‘i») — dramatik vosita qildi; Rembrandt portretlarida yorug‘lik yuzni qorong‘ilikdan «sug‘urib oladi».',
      'Bugun yorug‘soya qonunlari fotografiya, kino va 3D grafikada ham ishlaydi: sahnadagi 3D shar aynan shu fizik qonunlar bo‘yicha hisoblanadi — soya xaritasi tushuvchi soyani, yuza normali va manba yo‘nalishi orasidagi burchak yorug‘-soya o‘tishini beradi.'
    ]}
  ],
  formulalar:[
    ['Yoritilganlik ∝ cos α','α — nur va yuza normali orasidagi burchak (Lambert qonuni)'],
    ['L(soya) = h / tg β','Tushuvchi soya uzunligi: h — buyum balandligi, β — manba balandlik burchagi'],
    ['Tus tartibi: blik > yorug‘ > yarim soya > refleks > soya','Yorqinlik bo‘yicha (refleks yorug‘dan to‘q)']
  ],
  qiziqarli:[
    'Oyning fazalari — sharga tushgan yorug‘soyaning eng katta misoli: yarim oy chegarasi (terminator) — yarim soya zonasi.',
    '«Sfumato» — Leonardo usuli: chegarasiz, tutunday o‘tishlar; «Mona Liza» lablari shunday chizilgan.',
    'Quyosh soati — tushuvchi soya uzunligi va yo‘nalishi kun davomida o‘zgarishiga asoslangan qadimgi asbob.',
    'Fotografiyada «Rembrandt yorug‘ligi» — yuzning soyadagi yonog‘ida kichik yorug‘ uchburchak hosil qiluvchi yoritish.'
  ],
  lugat:[
    ['Yorug‘soya','Buyumdagi yorug‘lik va soya taqsimoti.'],
    ['Blik','Manbaning yuzadagi aksi, eng yorug‘ nuqta.'],
    ['Yarim soya','Yorug‘dan soyaga o‘tish zonasi.'],
    ['Shaxsiy soya','Buyumning nur tushmaydigan tomoni.'],
    ['Refleks','Soyaga atrofdan qaytgan nur.'],
    ['Tushuvchi soya','Buyum boshqa yuzaga tashlagan soya.'],
    ['Kontrajur','Manba buyum orqasida bo‘lgan yoritish.'],
    ['Kiaroskuro','Keskin yorug‘-qorong‘i kontrasti usuli.'],
    ['Sfumato','Chegarasiz yumshoq o‘tishlar usuli.'],
    ['Tus (ton)','Yorqinlik darajasi.']
  ],
  manba:SN7 + '; ' + MW + ': «Chiaroscuro», «Sfumato», «Shading», «Lambert’s cosine law»; akademik rasm qo‘llanmalari (gips shakllar). Sahnadagi soya — three.js soya xaritasi (fizik soddalashtirish).',
  ishlanma:ish('7-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D yorug‘lik sahnasi (MAKON), gips shar/kub bilan natyurmort, qalam mashqi',
    ['Tonal zonalar (blik, yorug‘, yarim soya, soya, refleks, tushuvchi soya) va manba holati ta’sirini o‘rgatish.', 'Sabr, kuzatuvchanlik va mehnatsevarlikni tarbiyalash.', 'Hajmni tus bilan ifodalash ko‘nikmasini rivojlantirish.'],
    ['6 ta yorug‘soya elementini buyumda ko‘rsatadi','Manba holatidan soya yo‘nalishi va uzunligini aytadi','Shar, kub, silindrdagi farqni tushuntiradi','Qalamda sharni 5 tusda chizadi'],
    ['MAKON sahnasi «Yorug‘lik va soya»','Gips shar/kub, stol chirog‘i','Qog‘oz, qalam (HB, 2B, 4B), o‘chirg‘ich','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Doira qachon sharga aylanadi?','Taxmin aytadi.'],['8–16','<b>Zonalar.</b> MAKON: shar, belgilar; manba balandligi.','Kuzatadi, zonalarni nomlaydi.'],['16–22','<b>Kub va silindr.</b> Farqlar; kontrajur.','Jadval to‘ldiradi.'],['22–38','<b>Amaliy ish.</b> Chiroq bilan gips shar: qalamda 5 tus + tushuvchi soya.','Chizadi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Blik','Eng yorug‘ nuqta.'],['Refleks','Qaytgan nur.'],['Tushuvchi soya','Yerdagi soya.'],['Kontrajur','Orqadan yoritish.']],
    [['Shaxsiy va tushuvchi soya farqi?','Buyumda / boshqa yuzada'],['Manba past — soya?','Uzun'],['Refleks yorug‘dan?','To‘qroq'],['Kubda zonalar?','Har yoq bir tusda']],
    'Darslikdagi mashqlar; uyda stol chirog‘i bilan olma yoki to‘pni qalamda chizing (5 tus va tushuvchi soya); manbani ko‘chirib ikkinchi variant.',
    SN7)
};

/* ================================================================
   S4. KOMPOZITSIYA VA OLTIN KESIM — 8-sinf
   ================================================================ */
D['sn-kompozitsiya'] = {
  fan:'sanat', qisqaNom:'Kompozitsiya', nom:'Kompozitsiya va oltin kesim', sinf:'8-sinf',
  qisqa:'8-sinf · Tasviriy san’at · «Kompozitsiya asoslari»',
  sahna:'ts_komp',
  tsUq:{tor:'uchdan', ufq:.33, ob:[{k:'quyosh', x:.667, y:.667}, {k:'daraxt', x:.12, y:.45}, {k:'qayiq', x:.5, y:.2}, {k:'odam', x:.88, y:.25}]},
  kor:{
    sarlavha:'Nimani qayerga qo‘yish — kompozitsiya',
    matn:'Kompozitsiya — rasmda elementlarni joylashtirish san’ati. Asosiy obyekt kadr markazida bo‘lsa, rasm «qotib» qoladi; uni chiziqlar kesishgan kuchli nuqtaga surilsa, ko‘z rasm bo‘ylab sayr qiladi. Uchdan bir qoidasi kadrni 3×3 ga bo‘ladi — 4 kuchli nuqta. Oltin kesim esa 1 : 1,618 nisbati — tomonni 0,382 va 0,618 ulushga bo‘ladi; nuqtalari uchdan bir nuqtalariga yaqin, lekin markazga biroz yaqinroq. Sahnada quyosh, daraxt, qayiq va odamni sudrang; ufqni markazdan siljiting; to‘rlarni almashtiring.',
    punktlar:['<b>Uchdan bir qoidasi:</b> kadr 3×3; muhim obyekt chiziqda yoki kesishgan nuqtada','<b>Oltin kesim:</b> φ = (1 + √5)/2 ≈ 1,618; tomon 0,382 : 0,618 ga bo‘linadi','<b>Ufq</b> markazda emas — pastki yoki yuqori uchdan birda','<b>Muvozanat va ritm:</b> og‘ir element bir tomonda bo‘lsa, boshqa tomonda kichik «qarshi og‘irlik»']
  },
  bolimlar:[
    {sarlavha:'Kompozitsiya vositalari', jadval:[
      ['Markaz (dominant)','ko‘z birinchi tushadigan asosiy element'],
      ['Muvozanat','simmetrik (tinch) yoki asimmetrik (dinamik) og‘irlik taqsimoti'],
      ['Ritm','elementlarning takrorlanishi (daraxtlar qatori, to‘lqinlar)'],
      ['Kontrast','katta–kichik, yorug‘–to‘q, issiq–sovuq'],
      ['Yo‘naltiruvchi chiziqlar','yo‘l, daryo, qarash — ko‘zni markazga olib boradi'],
      ['Bo‘sh joy','«havo» — obyekt qaragan tomonda ko‘proq joy']
    ]},
    {sarlavha:'Nisbatlar', jadval:[
      ['Uchdan bir','0,333 va 0,667 — qulay taxminiy qoida (nomi 1797, J. T. Smith; hozirgi ma’noda XX asrdan)'],
      ['Oltin kesim','0,382 va 0,618; φ ≈ 1,618; Fibonachchi sonlari nisbati (1, 1, 2, 3, 5, 8, 13…) φ ga intiladi'],
      ['Oltin spiral','oltin to‘rtburchakdan kvadratlar ajratib hosil bo‘lgan chorak yoylar'],
      ['Ufq','1/3 (yer muhim) yoki 2/3 (osmon muhim) balandlikda']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Markazda — zerikarli', matn:'Hamma obyekt markazda, ufq o‘rtada: rasm ikkiga bo‘linib, «qotib» qoldi. Ko‘z sayr qilmaydi. Buni hozir tuzatamiz.', holat:{tor:'yoq', ufq:.5, ob:[{k:'quyosh', x:.5, y:.5}, {k:'daraxt', x:.44, y:.5}, {k:'qayiq', x:.56, y:.5}, {k:'odam', x:.62, y:.5}]}},
    {sarlavha:'Uchdan bir to‘ri', matn:'Kadr 3×3 ga bo‘lindi; chiziqlar kesishgan 4 nuqta — kuchli nuqtalar. Quyosh yuqori-o‘ng nuqtada, qayiq pastki-chap nuqtada — rasm «nafas oldi». Ufq pastki chiziqda.', holat:{tor:'uchdan', ufq:.33, ob:[{k:'quyosh', x:.667, y:.667}, {k:'daraxt', x:.12, y:.45}, {k:'qayiq', x:.333, y:.2}, {k:'odam', x:.88, y:.25}]}},
    {sarlavha:'Ufq — qayerda', matn:'Osmon va quyosh muhim bo‘lsa ufqni pastga (1/3), yer va qayiq muhim bo‘lsa — yuqoriga (2/3) qo‘yamiz. Hozir ufq yuqori chiziqda: yer va daraxtlar bosh rolda.', holat:{tor:'uchdan', ufq:.667, ob:[{k:'quyosh', x:.667, y:.85}, {k:'daraxt', x:.333, y:.55}, {k:'qayiq', x:.667, y:.4}, {k:'odam', x:.2, y:.3}]}},
    {sarlavha:'Oltin kesim', matn:'Sariq chiziqlar tomonni 0,382 : 0,618 ga bo‘ladi — uchdan birga yaqin, lekin markazga biroz yaqinroq. Nisbat φ ≈ 1,618 tabiatda (chig‘anoq, gul) va me’morchilikda uchraydi. Quyosh oltin nuqtada.', holat:{tor:'oltin', ufq:.382, ob:[{k:'quyosh', x:.618, y:.618}, {k:'daraxt', x:.15, y:.45}, {k:'qayiq', x:.382, y:.22}, {k:'odam', x:.85, y:.25}]}},
    {sarlavha:'Oltin spiral', matn:'Oltin to‘rtburchakdan kvadrat ajratsak, qolgani yana oltin to‘rtburchak; har kvadratga chorak yoy chizsak — spiral. Ko‘z spiral bo‘ylab markazga «oqadi»; asosiy obyekt spiral markazida.', holat:{tor:'spiral', ufq:.4, ob:[{k:'quyosh', x:.62, y:.62}, {k:'daraxt', x:.12, y:.5}, {k:'qayiq', x:.75, y:.3}, {k:'odam', x:.9, y:.22}]}},
    {sarlavha:'Muvozanat: og‘ir va yengil', matn:'Katta daraxt chapda — «og‘ir». Uni o‘ngdagi kichik odam va qayiq muvozanatlaydi: tarozidagi kabi, kichik yuk uzoqroqda tursa, katta yukni ko‘taradi. Asimmetrik muvozanat — dinamik.', holat:{tor:'uchdan', ufq:.36, ob:[{k:'daraxt', x:.25, y:.5}, {k:'odam', x:.85, y:.3}, {k:'qayiq', x:.72, y:.22}, {k:'quyosh', x:.667, y:.75}]}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Kompozitsiya tuzing', holat:{tor:'uchdan', ufq:.5, ob:[{k:'quyosh', x:.5, y:.5}, {k:'daraxt', x:.4, y:.5}, {k:'qayiq', x:.6, y:.5}, {k:'odam', x:.7, y:.5}]},
    topshiriqlar:[
      {shart:'Quyoshni uchdan bir to‘rining <b>kuchli nuqtasiga</b> sudrab qo‘ying.', hodisa:'ts-komp', kod:"ev.amal==='sur' && ev.obyekt==='quyosh' && ev.uchdanNuqta===true", izoh:'To‘g‘ri — quyosh <b>chiziqlar kesishgan nuqtada</b>; oq halqa buni tasdiqlaydi.'},
      {shart:'Ufqni markazdan <b>uchdan bir</b> chizig‘iga (pastki yoki yuqori) siljiting.', hodisa:'ts-komp', kod:"ev.amal==='ufq' && ev.ufqUchdan===true", izoh:'To‘g‘ri — ufq <b>1/3 yoki 2/3</b> da: rasm ikkiga bo‘linmaydi.'},
      {shart:'Qayiqni ham <b>boshqa kuchli nuqtaga</b> qo‘ying (quyosh bilan diagonal bo‘lsin).', hodisa:'ts-komp', kod:"ev.amal==='sur' && ev.obyekt==='qayiq' && ev.uchdanNuqta===true", izoh:'To‘g‘ri — ikki obyekt <b>diagonal</b> kuchli nuqtalarda: dinamik muvozanat.'},
      {shart:'«Oltin kesim» to‘rini yoqing.', hodisa:'ts-komp', kod:"ev.amal==='tor' && ev.tor==='oltin'", izoh:'To‘g‘ri — sariq chiziqlar <b>0,382 va 0,618</b> da; nuqtalar uchdan birga yaqin.'},
      {shart:'Odamni <b>oltin kesim nuqtasiga</b> qo‘ying.', hodisa:'ts-komp', kod:"ev.amal==='sur' && ev.obyekt==='odam' && ev.oltinNuqta===true", izoh:'To‘g‘ri — <b>oltin nuqta</b>: φ ≈ 1,618 nisbati.'}
    ]},
  test:[
    {s:'Uchdan bir qoidasida kadr qanday bo‘linadi?', v:['2×2','3×3','4×4','Diagonal'], t:1, izoh:'<b>3×3</b> — ikki gorizontal, ikki vertikal chiziq; 4 kesishish nuqtasi.'},
    {s:'Oltin kesim nisbati?', v:['≈ 1,414','≈ 1,618','≈ 2','≈ 3,14'], t:1, izoh:'φ = (1 + √5)/2 ≈ <b>1,618</b>; tomon 0,382 : 0,618 ga bo‘linadi.'},
    {s:'Asosiy obyektni kadr markaziga qo‘yish odatda…', v:['Eng yaxshi usul','Rasmni statik, «qotgan» qiladi','Qoidaga majburiy','Ko‘zni sayr qildiradi'], t:1, izoh:'Markaz — <b>statik</b>; kuchli nuqtalar ko‘zni harakatga keltiradi (simmetrik kompozitsiya istisno).'},
    {s:'Ufqni qayerga qo‘yish tavsiya etiladi?', v:['Aniq o‘rtaga','Pastki yoki yuqori uchdan birga','Eng tepaga','Ufq chizilmaydi'], t:1, izoh:'<b>1/3 yoki 2/3</b> — osmon yoki yer muhimligiga qarab; o‘rtada rasm ikkiga bo‘linadi.'},
    {s:'Fibonachchi sonlari qatori?', v:['1, 2, 4, 8, 16','1, 1, 2, 3, 5, 8, 13','1, 3, 5, 7, 9','2, 3, 5, 7, 11'], t:1, izoh:'<b>1, 1, 2, 3, 5, 8, 13…</b> — har son oldingi ikkitasining yig‘indisi; qo‘shni sonlar nisbati φ ga intiladi.'},
    {s:'Asimmetrik muvozanat nima?', v:['Ikki tomon bir xil','Katta elementni kichik, lekin uzoqroq element muvozanatlaydi','Hamma narsa markazda','Muvozanat yo‘q'], t:1, izoh:'Tarozi kabi: <b>kichik yuk uzoqroqda</b> katta yukni muvozanatlaydi — dinamik kompozitsiya.'},
    {s:'Harakatdagi obyekt (chopayotgan odam) qaragan tomonda…', v:['Joy qoldirilmaydi','Ko‘proq bo‘sh joy qoldiriladi','Boshqa obyekt qo‘yiladi','Kadr chegarasi'], t:1, izoh:'Obyekt oldida <b>«havo»</b> — ko‘z harakat yo‘nalishiga ergashadi; chegaraga tiralsa — noqulay.'},
    {s:'«Uchdan bir qoidasi» iborasi birinchi marta qachon yozilgan?', v:['1435 (Alberti)','1797 (J. T. Smith)','1900','1950'], t:1, izoh:'<b>1797</b>, Jon Tomas Smit — lekin u yorug‘-qorong‘i muvozanati haqida; hozirgi to‘r ma’nosi XX asrda.'},
    {s:'Ritm kompozitsiyada nima?', v:['Rang','Elementlarning takrorlanishi','Rasm o‘lchami','Ramka'], t:1, izoh:'<b>Ritm</b> — takror (daraxtlar qatori, to‘lqinlar); ko‘zni yo‘naltiradi.'},
    T3('Sahnada <b>kuchli nuqtada</b> turgan obyektni (oq halqali) bosing.', 'ts-komp', 'obyekt', ['quyosh'], ['Quyosh (yuqori-o‘ng nuqta)', 'boshqa obyekt'], 'Quyosh <b>uchdan bir nuqtasida</b>: (2/3; 2/3) — oq halqa tasdiqlaydi.')
  ],
  yordamchi:[
    {s:'Oltin kesim va uchdan bir — qaysi biri to‘g‘ri?', j:'Ikkalasi ham taxminiy qo‘llanma: uchdan bir — 0,333, oltin — 0,382; nuqtalar bir-biriga yaqin. Ko‘p rassom va fotograflar uchdan birni qulay deb biladi; oltin kesim markazga sal yaqinroq. Qoida emas, maslahat — muhim narsa muvozanat va ma’no.', kalit:['oltin','uchdan','qaysi']},
    {s:'Simmetrik kompozitsiya yomonmi?', j:'Yo‘q — tinchlik, ulug‘vorlik, me’morchilik (masjid peshtoqi) uchun simmetriya mos. Dinamik, hikoyali rasm uchun asimmetriya yaxshi. Maqsadga qarab tanlanadi.', kalit:['simmetrik','yomon']}
  ],
  maqola:[
    {sarlavha:'Kompozitsiya nima', xatboshilar:[
      'Lotincha «compositio» — tuzish, joylashtirish. Kompozitsiya — rasm elementlarini shunday joylashtirishki, ko‘z asosiy narsani darhol topsin va rasm bo‘ylab qulay sayr qilsin. Vositalari: dominant (asosiy element), muvozanat, ritm, kontrast, yo‘naltiruvchi chiziqlar, bo‘sh joy.',
      'Eng oddiy maslahat — asosiy obyektni markazga qo‘ymaslik: markazdagi obyekt rasmni ikkiga bo‘lib, statik qiladi. Uni biroz chetga, kadrni uchga bo‘luvchi chiziqlar kesishgan nuqtaga surilsa, atrofda «havo» paydo bo‘ladi va ko‘z harakatlanadi. Ufq ham o‘rtada emas: osmon muhim bo‘lsa pastroq, yer muhim bo‘lsa balandroq.'
    ]},
    {sarlavha:'Uchdan bir va oltin kesim', xatboshilar:[
      '«Uchdan bir qoidasi» iborasi 1797-yilda ingliz rassomi Jon Tomas Smitning «Qishloq manzaralari haqida mulohazalar» kitobida paydo bo‘lgan, lekin u yorug‘ va qorong‘i maydonlar nisbati (2:1) haqida yozgan edi; bugungi 3×3 to‘r ma’nosi XX asr fotografiyasida shakllangan. Shunga qaramay, qoida sodda va foydali: kadr uchga bo‘linadi, muhim elementlar chiziqlarda yoki 4 nuqtada.',
      'Oltin kesim — matematik nisbat: kesma shunday bo‘linadiki, butun katta qismga nisbati katta qismning kichikka nisbatiga teng; bu son φ = (1 + √5)/2 ≈ 1,618. Tomon 0,382 : 0,618 ulushga bo‘linadi — uchdan birga yaqin, markazga sal yaqinroq. Fibonachchi sonlari (1, 1, 2, 3, 5, 8, 13…) qo‘shni nisbati φ ga intiladi; oltin to‘rtburchakdan kvadratlar ajratib, chorak yoylar bilan oltin spiral chiziladi. Oltin kesimni Uyg‘onish davri rassomlari va me’morlari qadrlagan; lekin «barcha buyuk rasmlar oltin kesimda» degan da’vo ko‘pincha asossiz — bu vosita, qonun emas.'
    ]},
    {sarlavha:'Muvozanat, ritm, bo‘sh joy', xatboshilar:[
      'Muvozanat tarozidek ishlaydi: katta, to‘q yoki yorqin element «og‘ir»; uni qarama-qarshi tomonda kichikroq, lekin markazdan uzoqroq element muvozanatlaydi. Simmetrik muvozanat tinch va ulug‘vor (peshtoq, portret), asimmetrik — jonli va hikoyali (manzara, janr sahnasi).',
      'Ritm — takror: daraxtlar qatori, to‘lqinlar, ustunlar; ko‘zni yo‘naltiradi va rasmga musiqa beradi. Yo‘naltiruvchi chiziqlar (yo‘l, daryo, odamning qarashi) ko‘zni dominantga olib boradi. Harakatdagi yoki qarab turgan obyekt oldida bo‘sh joy qoldiriladi — aks holda u «devorga tiralib» qoladi. Sahnadagi obyektlarni surib, shu qoidalarni o‘zingiz tekshiring.'
    ]}
  ],
  formulalar:[
    ['φ = (1 + √5) / 2 ≈ 1,618','Oltin kesim soni'],
    ['a / b = (a + b) / a = φ','Oltin nisbat ta’rifi (a > b)'],
    ['0,618 va 0,382','Tomonning oltin bo‘linish ulushlari (1/φ va 1 − 1/φ)'],
    ['1/3 va 2/3','Uchdan bir qoidasi chiziqlari'],
    ['F(n) = F(n−1) + F(n−2)','Fibonachchi: 1, 1, 2, 3, 5, 8, 13… ; F(n+1)/F(n) → φ']
  ],
  qiziqarli:[
    'Oltin kesim belgisi φ (fi) — yunon haykaltaroshi Fidiy nomidan (XX asr boshida kiritilgan).',
    'Nautilus chig‘anog‘i ko‘pincha «oltin spiral» deb ko‘rsatiladi, lekin o‘lchovlar uning nisbati φ dan farq qilishini ko‘rsatadi — go‘zal, lekin aniq emas.',
    'Fotograf Maykl Friman uchdan bir qoidasini «eng yomon kompozitsion maslahat» deb tanqid qilgan — qoida emas, boshlang‘ich nuqta.',
    'Kino kadri 16:9, fotosurat 3:2, rasm — istalgan; kompozitsiya qoidalari formatdan qat’i nazar ishlaydi.'
  ],
  lugat:[
    ['Kompozitsiya','Elementlarni joylashtirish va bog‘lash.'],
    ['Dominant','Asosiy, ko‘z birinchi tushadigan element.'],
    ['Kuchli nuqta','To‘r chiziqlari kesishgan joy.'],
    ['Uchdan bir qoidasi','Kadrni 3×3 ga bo‘lish.'],
    ['Oltin kesim','1 : 1,618 nisbati.'],
    ['Oltin spiral','Oltin to‘rtburchak kvadratlaridagi yoylar.'],
    ['Muvozanat','Og‘irliklarning tenglashuvi.'],
    ['Ritm','Elementlar takrori.'],
    ['Yo‘naltiruvchi chiziq','Ko‘zni olib boruvchi chiziq.'],
    ['Fibonachchi sonlari','Har biri oldingi ikkisining yig‘indisi bo‘lgan qator.']
  ],
  manba:SN8 + '; ' + MW + ': «Rule of thirds», «Golden ratio», «Fibonacci sequence», «Composition (visual arts)»; J. T. Smith «Remarks on Rural Scenery» (1797) — Wikipedia va B&H «Who wrote the rule of thirds» orqali. Oltin kesim va san’at bog‘liqligi haqidagi ko‘p da’volar tasdiqlanmagan — matnda aytilgan.',
  ishlanma:ish('8-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv kadr (MAKON), eskizlar, reproduksiyalar tahlili',
    ['Kompozitsiya vositalari, uchdan bir qoidasi, oltin kesim va muvozanatni o‘rgatish.', 'Estetik did va tanqidiy qarashni tarbiyalash.', 'Elementlarni ongli joylashtirish va asoslash ko‘nikmasini rivojlantirish.'],
    ['Kuchli nuqtalarni kadrda topadi','Ufqni maqsadga qarab joylashtiradi','Oltin kesim nisbatini hisoblaydi','Eskizda muvozanat va ritm yaratadi'],
    ['MAKON sahnasi «Kompozitsiya»','Qog‘oz, qalam, 3×3 to‘rli shaffof plyonka','Reproduksiyalar (manzara, natyurmort)','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Ikki surat: markazda va kuchli nuqtada — qaysi yaxshi?','Fikr bildiradi.'],['8–18','<b>Uchdan bir va ufq.</b> MAKON: obyektlarni surish.','Sahnada kompozitsiya tuzadi.'],['18–26','<b>Oltin kesim va spiral.</b> φ, Fibonachchi.','Hisoblaydi, to‘rni chizadi.'],['26–38','<b>Amaliy ish.</b> 3 ta eskiz: markazda, uchdan birda, oltin kesimda.','Eskiz chizadi, solishtiradi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Kuchli nuqta','To‘r kesishishi.'],['Oltin kesim','1 : 1,618.'],['Dominant','Asosiy element.'],['Ritm','Takror.']],
    [['φ ≈ ?','1,618'],['Kadr 3×3 — nuqtalar?','4'],['Ufq qayerda?','1/3 yoki 2/3'],['Fibonachchi: 5, 8, keyin?','13']],
    'Darslikdagi mashqlar; 3 ta reproduksiyada (yoki o‘z suratingizda) 3×3 to‘r chizib, dominant va kuchli nuqtalarni belgilang; biror kompozitsiyani «yaxshilab» qayta chizing.',
    SN8)
};


/* ================================================================
   S5. GIRIH VA ISLIMIY NAQSH — 9-sinf
   ================================================================ */
D['sn-girih'] = {
  fan:'sanat', qisqaNom:'Girih', nom:'Girih va islimiy naqsh', sinf:'9-sinf',
  qisqa:'9-sinf · Tasviriy san’at · «Amaliy bezak san’ati»',
  sahna:'ts_girih',
  tsUq:{n:6, k:.55, takror:false, sim:true},
  kor:{
    sarlavha:'Sirkul va chizg‘ich bilan cheksiz naqsh',
    matn:'Girih — O‘rta Osiyo va Sharq me’morchiligidagi geometrik naqsh: chiziqlar to‘ridan yulduz va ko‘pburchaklar hosil bo‘ladi; islimiy esa o‘simlik — barg, novda, gul naqshi. Registon madrasalari va Shohi Zinda maqbaralarida ikkisi birga: koshin, sirkor g‘isht va o‘yma ganchda. Girih asosi — aylanaga ichki chizilgan muntazam ko‘pburchak: 6, 8, 10, 12 burchakli yulduzlar. 6 va 8 (va 12) burchakli yulduzlar tekislikni davriy to‘ldiradi, 10 burchakli — yo‘q: u murakkab, takrorlanmas kesishmalar beradi. Sahnada burchaklar sonini, ichki radiusni, rang palitrasini o‘zgartiring; «Takrorlash» — naqsh tekislikni qanday to‘ldirishini ko‘rsatadi.',
    punktlar:['<b>Girih</b> — geometrik to‘r; <b>islimiy</b> — o‘simlik naqshi; ko‘pincha birga','<b>Simmetriya:</b> n burchakli yulduz 360°/n burilishda o‘ziga mos keladi, n ta simmetriya o‘qi','<b>Davriylik:</b> 3, 4, 6 (va 8, 12 kombinatsiyada) — tekislikni to‘ldiradi; 5 va 10 — davriy emas','<b>Manzillar:</b> Registon (Ulug‘bek madrasasi 1417–1420, Sherdor 1619–1636, Tillakori 1646–1660), Shohi Zinda (asosan XIV–XV asr)']
  },
  bolimlar:[
    {sarlavha:'Naqsh turlari', jadval:[
      ['Girih','chiziqlar to‘ridan yulduz va ko‘pburchaklar; sirkul-chizg‘ich bilan quriladi'],
      ['Islimiy','o‘simlik novdalari, barg, gul; egri chiziqlar, girih orasini to‘ldiradi'],
      ['Xattotlik (kitoba)','peshtoq va gumbazdagi yozuvlar — ko‘pincha kufiy, suls'],
      ['Koshin / mozaika','sirlangan sopol bo‘laklari (lojuvard ko‘k, feruza, oq, sariq)'],
      ['Ganch o‘ymakorligi','ichki devor va shiftlardagi oq ganch naqsh']
    ]},
    {sarlavha:'Registon va Shohi Zinda (sanalar manbali)', jadval:[
      ['Ulug‘bek madrasasi','1417–1420 (ba’zi manbalar 1421); peshtoqida yulduzli girih'],
      ['Sherdor madrasasi','1619–1636, Yalangto‘sh Bahodir buyurtmasi; peshtoqida sher-quyosh tasviri'],
      ['Tillakori madrasasi','1646–1660; masjid ichida zarhal («tillakori» — oltin bilan ishlangan)'],
      ['Shohi Zinda','maqbaralar majmuasi; eng qadimgi qismlar Qoraxoniylar davri, asosiy maqbaralar 1350 dan keyin, Temuriylar davri'],
      ['Shodimulk Oqo maqbarasi','1372, Temurning jiyani (singlisi Turkon Oqoning qizi) uchun; koshin va sirkor terrakota']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Olti burchakli yulduz', matn:'Aylanaga 6 nuqta teng qo‘yilib, bir nuqta tashlab tutashtirilsa — olti burchakli yulduz. 6 ta simmetriya o‘qi, 60° burilishda o‘ziga mos keladi. Eng oddiy va eng keng tarqalgan girih asosi.', holat:{n:6, k:.55, takror:false, sim:true}},
    {sarlavha:'Sakkiz burchakli yulduz', matn:'8 nuqta, 45° burilish simmetriyasi. Ikki kvadratni 45° ga burib ustma-ust qo‘ysangiz, sakkiz burchakli yulduz hosil bo‘ladi — O‘rta Osiyo me’morchiligida juda ko‘p uchraydi.', holat:{n:8, k:.55, takror:false, sim:true}},
    {sarlavha:'Ichki radius — yulduz «o‘tkirligi»', matn:'Ichki nuqtalar radiusini kamaytiring — yulduz nurlari o‘tkirlashadi; oshiring — ko‘pburchakka yaqinlashadi. Ustalar bu nisbatni naqsh zichligiga qarab tanlagan.', holat:{n:8, k:.35, takror:false, sim:false}},
    {sarlavha:'Takrorlash: tekislikni to‘ldirish', matn:'6 burchakli yulduzlar olti burchakli panjara bo‘ylab, 8 burchaklilar kvadrat panjara bo‘ylab (orasida kichik kvadratlar) tekislikni bo‘shliqsiz to‘ldiradi — davriy naqsh. Devor istalgancha davom etadi.', holat:{n:8, k:.55, takror:true, sim:false}},
    {sarlavha:'O‘n burchakli: davriy emas', matn:'10 burchakli yulduz (beshburchak simmetriyasi) tekislikni oddiy takror bilan to‘ldirmaydi. Ustalar uni «girih kesakchalari» — beshta maxsus ko‘pburchak bilan terganlar. 2007-yilda Lu va Staynxardt (Science) bunday naqshlar kvazikristall tartibga yaqinligini ko‘rsatdi.', holat:{n:10, k:.55, takror:true, sim:false}},
    {sarlavha:'Ranglar: Registon va Shohi Zinda', matn:'Registon koshinlari — lojuvard (to‘q ko‘k), feruza, oq va sariq-oltin; Shohi Zindada feruza va ko‘k ustun. Terrakota — sirlanmagan sopol. Palitrani almashtiring.', holat:{n:8, k:.55, takror:true, sim:false, pal:'shohizinda'}},
    {sarlavha:'12 burchakli yulduz', matn:'12 nuqta — 30° burilish. Markaziy katta yulduz atrofida 6 va 8 burchaklilar bilan birga murakkab «gul» hosil qiladi. Ustalar bitta aylana va chizg‘ich bilan shunday to‘rlarni qurganlar.', holat:{n:12, k:.6, takror:false, sim:true, pal:'registon'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Naqsh generatori', holat:{n:6, k:.55, takror:false, sim:false, pal:'registon'},
    topshiriqlar:[
      {shart:'<b>8 burchakli</b> yulduzni tanlab, «Takrorlash»ni yoqing — kvadrat panjara ko‘rinsin.', hodisa:'ts-girih', kod:"ev.n===8 && ev.takror===true", izoh:'To‘g‘ri — 8 burchakli yulduzlar <b>kvadrat panjara</b> bo‘ylab, orasida kichik kvadratlar.'},
      {shart:'<b>6 burchakli</b> yulduzda «Simmetriya o‘qlari»ni yoqing. O‘qlar soni nechta?', hodisa:'ts-girih', kod:"ev.n===6 && ev.sim===true", izoh:'To‘g‘ri — <b>6 ta o‘q</b>, burilish 60°.'},
      {shart:'Ichki radiusni <b>40 % yoki kamroq</b> qiling — yulduz o‘tkirlashsin.', hodisa:'ts-girih', kod:"ev.k<=0.4", izoh:'To‘g‘ri — kichik ichki radius: <b>o‘tkir nurlar</b>.'},
      {shart:'<b>10 burchakli</b> yulduzga o‘ting va takrorlashni ko‘ring.', hodisa:'ts-girih', kod:"ev.n===10 && ev.takror===true", izoh:'To‘g‘ri — 10 burchakli <b>davriy to‘ldirmaydi</b>: rozetkalar maxsus kesakchalar bilan ulanadi.'},
      {shart:'Palitrani <b>«Shohi Zinda»</b> ga almashtiring.', hodisa:'ts-girih', kod:"ev.pal==='shohizinda'", izoh:'To‘g‘ri — <b>feruza va ko‘k</b> — Shohi Zinda koshinlari rangi.'}
    ]},
  test:[
    {s:'Girih nima?', v:['O‘simlik naqshi','Geometrik chiziqlar to‘ri naqshi','Yozuv','Haykal'], t:1, izoh:'<b>Girih</b> — geometrik naqsh; o‘simlik naqshi — <b>islimiy</b>.'},
    {s:'8 burchakli yulduz necha gradus burilishda o‘ziga mos keladi?', v:['30°','45°','60°','90°'], t:1, izoh:'360° / 8 = <b>45°</b>.'},
    {s:'Qaysi yulduz tekislikni oddiy takror bilan to‘ldirmaydi?', v:['6 burchakli','8 burchakli','10 burchakli','4 burchakli'], t:2, izoh:'<b>10 burchakli</b> (beshburchak simmetriyasi) davriy emas — maxsus kesakchalar kerak.'},
    {s:'Ulug‘bek madrasasi qachon qurilgan?', v:['1417–1420','1619–1636','1646–1660','1372'], t:0, izoh:'<b>1417–1420</b> (ba’zi manbalar 1421); Sherdor 1619–1636, Tillakori 1646–1660.'},
    {s:'«Tillakori» so‘zining ma’nosi?', v:['Ko‘k gumbaz','Oltin bilan ishlangan','Sherli','Yulduzli'], t:1, izoh:'<b>Tillakori</b> — zarhal, oltin bilan bezatilgan (masjid ichi).'},
    {s:'Sherdor madrasasi buyurtmachisi?', v:['Amir Temur','Ulug‘bek','Yalangto‘sh Bahodir','Bobur'], t:2, izoh:'<b>Yalangto‘sh Bahodir</b>, Samarqand hokimi — Sherdor (1619–1636) va Tillakori.'},
    {s:'Lojuvard ko‘k rang koshinda qaysi tosh/pigmentdan?', v:['Malaxit','Lazurit','Kinovar','Oxra'], t:1, izoh:'<b>Lazurit</b> (lojuvard) — to‘q ko‘k; miniatyurada ham eng qimmat bo‘yoq.'},
    {s:'2007-yilda Lu va Staynxardt girih haqida nimani ko‘rsatdi?', v:['Girih faqat XX asrda paydo bo‘lgan','O‘rta asr girihlari kvazikristall tartibga yaqin, 5 «girih kesakchasi» bilan terilgan','Girih faqat 4 burchakli','Girih bo‘yoq bilan chizilgan'], t:1, izoh:'Science (2007): beshta <b>girih kesakchasi</b> bilan terilgan naqshlar Penrouz tipidagi <b>kvazikristall</b> tartibga yaqin.'},
    {s:'Shohi Zindadagi Shodimulk Oqo maqbarasi qachon va kim uchun?', v:['1372, Temurning jiyani','1420, Ulug‘bek','1636, Yalangto‘sh','1100, Qoraxoniylar'], t:0, izoh:'<b>1372</b>, Temurning singlisi Turkon Oqoning qizi Shodimulk Oqo uchun (onasi qurdirgan, 1383-yilda o‘zi ham shu yerga dafn etilgan); koshin va sirkor terrakota.'},
    T3('Sahnadagi yulduzni bosing va simmetriya o‘qlari sonini tekshiring (6 burchakli).', 'ts-girih', 'bos', ['yulduz6'], ['6 burchakli yulduz — 6 o‘q', 'boshqa'], '<b>6 burchakli</b> yulduz: 6 simmetriya o‘qi, 60° burilish; olti burchakli panjara bo‘ylab tekislikni to‘ldiradi.')
  ],
  yordamchi:[
    {s:'Sirkul bilan 8 burchakli yulduzni qanday chizaman?', j:'Aylana chizing, ikki perpendikulyar diametr o‘tkazing (4 nuqta), ularning burchaklarini teng bo‘lib yana 4 nuqta oling (jami 8). Har nuqtani 3 nuqta narigisiga tutashtiring — yulduz {8/3}; yoki ikki kvadratni 45° burib chizing.', kalit:['sirkul','8','chizaman']},
    {s:'Girih va islimiy qanday birga ishlatiladi?', j:'Girih — «skelet»: yulduz va ko‘pburchaklar to‘ri; uning ichidagi bo‘shliqlar islimiy — novda va barglar bilan to‘ldiriladi. Registon peshtoqlarida shunday: yirik girih, orasida mayda islimiy.', kalit:['islimiy','birga']}
  ],
  maqola:[
    {sarlavha:'Girih — geometriya san’ati', xatboshilar:[
      'Islom me’morchiligida tirik mavjudot tasviri cheklangani uchun ustalar geometriya va o‘simlik naqshida mukammallikka erishdilar. Girih (forscha «tugun») — aylana, chizg‘ich va sirkul bilan qurilgan chiziqlar to‘ri; kesishmalar yulduz va ko‘pburchaklar hosil qiladi. Asosi — aylanaga ichki chizilgan muntazam ko‘pburchak: 6, 8, 10, 12 burchakli yulduzlar.',
      'Matematik jihatdan girih — simmetriya darsligi: n burchakli yulduz 360°/n burilishda o‘ziga mos keladi va n ta ko‘zgu o‘qiga ega. 3, 4 va 6 burchakli (hamda 8 va 12 kombinatsiyada) naqshlar tekislikni davriy to‘ldiradi; 5 va 10 burchaklilar — yo‘q. Shunga qaramay ustalar 10 burchakli yulduzli naqshlarni beshta maxsus ko‘pburchak — «girih kesakchalari» bilan terganlar. 2007-yilda fiziklar Piter Lu va Pol Staynxardt (Science) bunday naqshlar, masalan Isfahondagi Darbi Imom (1453), kvazikristall (Penrouz tipidagi) tartibga yaqinligini ko‘rsatdi; Istanbuldagi Topqopi o‘rami (XV asr) kesakchalar chizmalarini saqlagan.'
    ]},
    {sarlavha:'Islimiy, koshin va ganch', xatboshilar:[
      'Islimiy — o‘simlik naqshi: egri novdalar, barglar, gullar (gul, lola, anor) ritmik takrorlanadi va girih bo‘shliqlarini to‘ldiradi. Girih — qat’iy, islimiy — jonli; ikkisi birga devorni «to‘qima»ga aylantiradi. Uchinchi element — xattotlik: peshtoq va gumbazlardagi kufiy va suls yozuvlari.',
      'Materiallar: koshin (sirlangan sopol plitalar), mozaika (sirlangan sopol bo‘laklaridan terilgan), sirkor g‘isht, o‘yma terrakota, ichki devorlarda oq ganch o‘ymakorligi va zarhal. Ranglar — lojuvard (to‘q ko‘k), feruza, oq, sariq, yashil; ko‘k gumbazlar Samarqand ramziga aylangan.'
    ]},
    {sarlavha:'Registon va Shohi Zinda', xatboshilar:[
      'Samarqand Registoni — uch madrasa: Ulug‘bek madrasasi (1417–1420; ba’zi manbalar 1421 deb yozadi), Sherdor (1619–1636, Samarqand hokimi Yalangto‘sh Bahodir buyurtmasi) va Tillakori (1646–1660; masjid ichi zarhal). Ulug‘bek madrasasi peshtoqida yulduzli girih — astronom hukmdorga mos; Sherdorda esa girih bilan birga sher-quyosh tasviri.',
      'Shohi Zinda — maqbaralar ko‘chasi: eng qadimgi qismlar Qoraxoniylar davriga borib taqaladi, asosiy maqbaralar 1350-yildan keyin, Temur va Temuriylar davrida qurilgan; masalan, Shodimulk Oqo maqbarasi (1372) deyarli butunlay koshin va sirkor terrakota bilan qoplangan. Ko‘p koshinlar XX–XXI asrlarda ta’mirlangan (2005-yildagi ta’mir tanqidga ham uchragan) — asl va yangi qismlarni farqlash muhim.'
    ]}
  ],
  formulalar:[
    ['Burilish burchagi = 360° / n','n burchakli yulduz simmetriyasi'],
    ['Simmetriya o‘qlari = n','Muntazam yulduz / ko‘pburchak'],
    ['Yulduz {n/m}','n nuqta, har m-nuqta tutashtiriladi (masalan, {8/3})'],
    ['Davriy: n ∈ {3, 4, 6}','Tekislikni muntazam ko‘pburchak bilan to‘ldirish (kristallografik cheklov)']
  ],
  qiziqarli:[
    '«Girih» forscha «tugun» degani — chiziqlar tugunday kesishadi.',
    'Girih kesakchalari (2007) 1970-yillardagi Penrouz plitkalaridan 5 asr oldin ishlatilgan.',
    'Topqopi o‘rami — 30 metrga yaqin uzunlikdagi XV asr chizmalar to‘plami; ustalar «qo‘llanmasi».',
    'Samarqand ko‘k gumbazlari rangi — mis va kobalt sirlari; shuning uchun asrlar davomida o‘chmagan.'
  ],
  lugat:[
    ['Girih','Geometrik chiziqlar to‘ri naqshi.'],
    ['Islimiy','O‘simlik (novda, barg, gul) naqshi.'],
    ['Simmetriya o‘qi','Shaklni ko‘zgudek ikkiga bo‘luvchi chiziq.'],
    ['Burilish simmetriyasi','Shaklning burilganda o‘ziga mos kelishi.'],
    ['Davriy naqsh','Takror bilan tekislikni to‘ldiruvchi naqsh.'],
    ['Kvazikristall','Davriy bo‘lmagan, lekin tartibli tuzilma.'],
    ['Koshin','Sirlangan sopol plita.'],
    ['Mozaika','Bo‘laklardan terilgan tasvir.'],
    ['Peshtoq','Binoning bezakli kirish ravoqi.'],
    ['Ganch','Oq gips asosidagi o‘ymakorlik materiali.']
  ],
  manba:SN9 + '; ' + MW + ': «Girih», «Girih tiles», «Registan», «Shah-i-Zinda»; Lu & Steinhardt, Science 315 (2007) 1106; Leiden universiteti Iran-Turan loyihasi (Shohi Zinda sanalari); eurasia.travel, famous-historic-buildings (Registon sanalari — bir-biriga mos). Ulug‘bek madrasasi tugash yili 1420/1421 — ikkalasi matnda.',
  ishlanma:ish('9-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Naqsh generatori (MAKON), sirkul-chizg‘ich bilan qurish, me’morchilik suratlari',
    ['Girih va islimiy, yulduz simmetriyasi, davriy/davriy bo‘lmagan naqsh, Registon va Shohi Zinda tarixini o‘rgatish.', 'Milliy me’rosga hurmat va ehtiyotkorlikni tarbiyalash.', 'Geometrik qurish va simmetriyani ko‘rish ko‘nikmasini rivojlantirish.'],
    ['Girih va islimiyni farqlaydi','n burchakli yulduz simmetriyasini aytadi','Sirkul bilan 6 va 8 burchakli yulduz quradi','Registon madrasalari sanalarini biladi'],
    ['MAKON sahnasi «Girih generatori»','Sirkul, chizg‘ich, qog‘oz, rangli qalam','Registon va Shohi Zinda suratlari','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Registon peshtoqi surati: «nechta yulduz, qanday burchak?»','Sanaydi, taxmin aytadi.'],['8–16','<b>Yulduz va simmetriya.</b> MAKON: 6, 8, 10, 12; o‘qlar.','Kuzatadi, jadval to‘ldiradi.'],['16–24','<b>Davriylik.</b> Takrorlash; 10 burchakli muammosi, girih kesakchalari.','Munozara.'],['24–38','<b>Amaliy ish.</b> Sirkul bilan 8 burchakli yulduz va atrof naqshi, bo‘yash.','Chizadi, bo‘yaydi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Girih','Geometrik naqsh.'],['Islimiy','O‘simlik naqshi.'],['Simmetriya o‘qi','Ko‘zgu chizig‘i.'],['Koshin','Sirli sopol.']],
    [['8 burchakli yulduz burilishi?','45°'],['Davriy emas — qaysi?','10 burchakli'],['Ulug‘bek madrasasi?','1417–1420'],['Islimiy nima?','O‘simlik naqshi']],
    'Darslikdagi mashqlar; sirkul bilan 6 burchakli yulduzlar panjarasini (kamida 7 yulduz) chizib, Registon ranglarida bo‘yang; orasini islimiy bilan to‘ldiring.',
    SN9)
};

/* ================================================================
   S6. PORTRET PROPORSIYALARI — 10-sinf
   ================================================================ */
D['sn-portret'] = {
  fan:'sanat', qisqaNom:'Portret', nom:'Portret proporsiyalari', sinf:'10-sinf',
  qisqa:'10-sinf · Tasviriy san’at · «Portret»',
  sahna:'ts_portret',
  tsUq:{korinish:'old', chiziq:false, bolim:'koz'},
  kor:{
    sarlavha:'Ko‘z — boshning o‘rtasida',
    matn:'Portretdagi eng ko‘p xato — ko‘zni juda yuqoriga chizish. Aslida ko‘z chizig‘i bosh balandligining o‘rtasida: iyakdan bosh tepasigacha teng ikkiga bo‘linadi. Yuz (soch chizig‘idan iyakgacha) taxminan uch teng qismga bo‘linadi: soch–qosh, qosh–burun asosi, burun–iyak; og‘iz pastki qismning yuqori uchdan birida; quloq qosh va burun asosi orasida. Bosh kengligi — taxminan 5 ko‘z kengligi, ko‘zlar orasi — 1 ko‘z. Bu akademik taxminiy qoidalar (Loomis uslubi) — har bir odam yuzi farq qiladi, lekin boshlash uchun ishonchli tayanch. Sahnadagi 3D boshni aylantiring, chiziqlarni yoqing, qismlarni bosing.',
    punktlar:['<b>Ko‘z chizig‘i</b> = bosh balandligining ½ (akademik taxminiy)','<b>Yuz 3 qism:</b> soch chizig‘i → qosh → burun asosi → iyak — taxminan teng','<b>Kenglik:</b> bosh ≈ 5 ko‘z; ko‘zlar orasi ≈ 1 ko‘z; burun kengligi ≈ 1 ko‘z','<b>Quloq:</b> qosh chizig‘i va burun asosi orasida; <b>og‘iz:</b> burun–iyak oralig‘ining yuqori ⅓ da']
  },
  bolimlar:[
    {sarlavha:'Akademik taxminiy proporsiyalar (old ko‘rinish)', jadval:[
      ['Ko‘z chizig‘i','bosh balandligining yarmida'],
      ['Soch chizig‘i','bosh tepasidan ≈ 1/7 bosh balandligi pastda (taxminiy)'],
      ['Qosh','yuzning yuqori uchdan biri chegarasi'],
      ['Burun asosi','yuzning ikkinchi uchdan biri chegarasi'],
      ['Og‘iz','burun asosi va iyak orasining yuqori uchdan birida'],
      ['Quloq','yuqorisi qoshda, pasti burun asosida (manbalarda biroz farq)'],
      ['Bosh kengligi','≈ 5 ko‘z; ko‘zlar orasi 1 ko‘z; og‘iz burchaklari qorachiqlar ostida']
    ]},
    {sarlavha:'Ko‘rinishlar', jadval:[
      ['Old (anfas)','simmetrik; o‘rta chiziq vertikal'],
      ['Yon (profil)','bosh chuqurligi balandligiga yaqin; quloq bosh markazidan orqada'],
      ['¾ burilish','o‘rta chiziq egri; uzoqdagi ko‘z torroq va yaqinroq — perspektiva'],
      ['Yuqoridan / pastdan','ko‘z chizig‘i egriladi; proporsiyalar perspektivada o‘zgaradi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Ko‘z chizig‘i — yarmida', matn:'Sariq chiziqlar — yo‘l-yo‘riq. Qizil chiziq ko‘z chizig‘ini ko‘rsatadi: u iyak va bosh tepasi orasining aynan o‘rtasida. Bosh tepasidagi soch hajmi ko‘pincha ko‘zni aldaydi — shuning uchun yangi boshlovchilar ko‘zni yuqoriga chizadi.', holat:{korinish:'old', chiziq:true, bolim:'koz'}},
    {sarlavha:'Yuz — uch teng qism', matn:'Soch chizig‘idan qoshgacha, qoshdan burun asosigacha, burun asosidan iyakgacha — taxminan teng. Qosh chizig‘i yuqori qism chegarasi.', holat:{korinish:'old', chiziq:true, bolim:'qosh'}},
    {sarlavha:'Burun va og‘iz', matn:'Burun asosi — ikkinchi uchdan bir chegarasi; kengligi taxminan bir ko‘z. Og‘iz chizig‘i burun asosi va iyak orasining yuqori uchdan birida; og‘iz burchaklari qorachiqlar ostida.', holat:{korinish:'old', chiziq:true, bolim:'burun'}},
    {sarlavha:'Besh ko‘z kengligi', matn:'Old ko‘rinishda bosh kengligi taxminan 5 ko‘z: chetdan ko‘zgacha — 1, ko‘z — 1, ko‘zlar orasi — 1, ko‘z — 1, ko‘zdan chetgacha — 1. Kichik belgilar ko‘z chizig‘ida shuni ko‘rsatadi.', holat:{korinish:'old', chiziq:true, bolim:'koz'}},
    {sarlavha:'Quloq — yondan', matn:'Yon ko‘rinishda quloq bosh markazidan orqada, qosh va burun asosi orasida joylashadi. Bosh chuqurligi (peshonadan ensagacha) balandligiga yaqin — profilni tor chizish xato.', holat:{korinish:'yon', chiziq:true, bolim:'quloq'}},
    {sarlavha:'¾ burilish', matn:'Eng ko‘p chiziladigan rakurs. O‘rta chiziq egri bo‘ladi, uzoqdagi ko‘z torroq va burunga yaqinroq ko‘rinadi — bu perspektiva. Ko‘z chizig‘i baribir boshning o‘rtasida.', holat:{korinish:'yarim', chiziq:true, bolim:'koz'}},
    {sarlavha:'Qoida — tayanch, qonun emas', matn:'Haqiqiy yuzlar farq qiladi: ko‘zlar yaqin yoki uzoq, peshona baland yoki past. Rassom avval akademik sxemani chizadi, keyin modelga qarab farqlarni kiritadi — portretning o‘xshashligi aynan shu farqlarda.', holat:{korinish:'old', chiziq:false, bolim:'bosh'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Proporsiyalarni toping', holat:{korinish:'old', chiziq:true, bolim:'bosh'},
    topshiriqlar:[
      {shart:'Bosh balandligining <b>yarmida</b> joylashgan qismni bosing.', hodisa:'ts-portret', kod:"ev.bos==='koz'", izoh:'To‘g‘ri — <b>ko‘z</b>: iyak va bosh tepasi orasining o‘rtasida.'},
      {shart:'Burun asosi va iyak orasining <b>yuqori uchdan birida</b> joylashgan qismni bosing.', hodisa:'ts-portret', kod:"ev.bos==='ogiz'", izoh:'To‘g‘ri — <b>og‘iz</b>; burchaklari qorachiqlar ostida.'},
      {shart:'«Yondan» ko‘rinishga o‘tib, qosh va burun asosi orasidagi qismni — <b>quloqni</b> bosing.', hodisa:'ts-portret', kod:"ev.korinish==='yon' && ev.bos==='quloq'", izoh:'To‘g‘ri — <b>quloq</b> bosh markazidan orqada, qosh–burun oralig‘ida.'},
      {shart:'«Olddan» qaytib, kengligi taxminan <b>bir ko‘z</b>ga teng bo‘lgan qismni — <b>burunni</b> bosing.', hodisa:'ts-portret', kod:"ev.korinish==='old' && ev.bos==='burun'", izoh:'To‘g‘ri — burun asosi kengligi ≈ <b>1 ko‘z</b>, ko‘zlar orasiga teng.'},
      {shart:'«¾ burilish» ko‘rinishini tanlang.', hodisa:'ts-portret', kod:"ev.korinish==='yarim'", izoh:'To‘g‘ri — ¾ da <b>o‘rta chiziq egri</b>, uzoqdagi ko‘z torroq — perspektiva.'}
    ]},
  test:[
    {s:'Ko‘z chizig‘i boshning qaysi qismida (akademik sxema)?', v:['Yuqori uchdan birida','Yarmida','Pastki uchdan birida','Soch chizig‘ida'], t:1, izoh:'<b>Yarmida</b> — eng ko‘p xato uni yuqoriga chizish.'},
    {s:'Yuz (soch chizig‘idan iyakgacha) nechta teng qismga bo‘linadi?', v:['2','3','4','5'], t:1, izoh:'<b>3</b>: soch–qosh, qosh–burun asosi, burun–iyak (taxminiy).'},
    {s:'Bosh kengligi taxminan necha ko‘z kengligiga teng?', v:['3','4','5','7'], t:2, izoh:'<b>5 ko‘z</b>: chet–ko‘z–oraliq–ko‘z–chet.'},
    {s:'Ko‘zlar orasidagi masofa?', v:['Yarim ko‘z','Bir ko‘z','Ikki ko‘z','Uch ko‘z'], t:1, izoh:'<b>Bir ko‘z</b> kengligi (akademik taxminiy).'},
    {s:'Quloq qaysi chiziqlar orasida?', v:['Soch chizig‘i va qosh','Qosh va burun asosi','Burun va og‘iz','Og‘iz va iyak'], t:1, izoh:'<b>Qosh va burun asosi</b> orasida (ba’zi manbalar: pasti burun asosida).'},
    {s:'Og‘iz chizig‘i qayerda?', v:['Burun asosi va iyak orasining yuqori ⅓ da','Aniq o‘rtada','Iyakka yaqin','Burunga tegib'], t:0, izoh:'<b>Yuqori uchdan birida</b>; burchaklari qorachiqlar ostida.'},
    {s:'¾ burilishda uzoqdagi ko‘z qanday ko‘rinadi?', v:['Kattaroq','Torroq va burunga yaqinroq','O‘zgarmaydi','Ko‘rinmaydi'], t:1, izoh:'Perspektiva: <b>torroq, burunga yaqinroq</b>; o‘rta chiziq egri.'},
    {s:'Profilda boshning chuqurligi (peshona–ensa) balandligiga nisbatan?', v:['Ancha kichik','Taxminan teng','Ikki marta katta','Nol'], t:1, izoh:'<b>Taxminan teng</b> — profilni tor chizish keng tarqalgan xato.'},
    {s:'Bu proporsiyalar qanday qoida?', v:['Aniq anatomik qonun','Akademik taxminiy tayanch — har yuz farq qiladi','Faqat bolalar uchun','Faqat haykaltaroshlik uchun'], t:1, izoh:'<b>Akademik taxminiy</b> (Loomis uslubi): boshlash uchun sxema, keyin modelga qarab tuzatiladi.'},
    T3('Sahnadagi boshda bosh balandligining <b>yarmida</b> joylashgan qismni bosing.', 'ts-portret', 'bos', ['koz'], ['Ko‘z', 'boshqa qism'], '<b>Ko‘z chizig‘i</b> iyak va bosh tepasi orasining o‘rtasida — akademik taxminiy qoida.')
  ],
  yordamchi:[
    {s:'Bola yuzi proporsiyalari ham shundaymi?', j:'Yo‘q: bolada peshona katta, ko‘z chizig‘i yarmidan pastroq, ko‘zlar nisbatan katta va bir-biridan uzoq, iyak kichik. Yosh oshgan sari ko‘z chizig‘i yarmiga ko‘tariladi.', kalit:['bola','yuz']},
    {s:'Portret nega o‘xshamaydi?', j:'Ko‘pincha proporsiya xatosi: ko‘z yuqorida, quloq kichik yoki noto‘g‘ri joyda, bosh profilda tor. Avval sxema chiziqlarini engil chizing, keyin modelning farqlarini (ko‘zlar oralig‘i, peshona) o‘lchab kiriting.', kalit:['o‘xshamaydi','portret']}
  ],
  maqola:[
    {sarlavha:'Nega sxema kerak', xatboshilar:[
      'Yuz — eng ko‘p ko‘rgan narsamiz, shuning uchun undagi eng kichik xato ham darhol seziladi. Portret chizishda rassomlar avval umumiy sxemani — bosh shakli va asosiy chiziqlarni — engil chizadi, keyin modelga qarab aniqlashtiradi. Sxema «qonun» emas: u o‘rtacha, akademik taxminiy proporsiyalar; har bir odamning yuzi undan farq qiladi va aynan shu farqlar portretni o‘xshash qiladi.',
      'Ko‘p amerikalik va yevropalik rasm qo‘llanmalari (masalan, Endryu Lumis kitoblari) shu sxemani beradi: ko‘z chizig‘i bosh balandligining yarmida; yuz soch chizig‘idan iyakgacha uch teng qism; bosh kengligi besh ko‘z. Manbalar ba’zi mayda joylarda farq qiladi (quloqning yuqori chegarasi qoshda yoki ko‘zda) — bu ham «taxminiy» ekanini ko‘rsatadi.'
    ]},
    {sarlavha:'Old ko‘rinish: chiziqlar', xatboshilar:[
      'Bosh tuxumsimon: yuqorisi kengroq, iyakka torayadi. Vertikal o‘rta chiziq simmetriyani beradi. Gorizontal chiziqlar: ko‘z — yarmida; soch chizig‘i bosh tepasidan taxminan 1/7 pastda; qosh — yuzning yuqori uchdan biri chegarasi; burun asosi — ikkinchi chegara; og‘iz — burun va iyak orasining yuqori uchdan birida.',
      'Kenglik bo‘yicha: bosh ≈ 5 ko‘z, ko‘zlar orasi 1 ko‘z, burun asosi kengligi ≈ 1 ko‘z (ko‘zlar ichki burchaklari ostida), og‘iz burchaklari qorachiqlar ostida. Quloq qosh va burun asosi orasida. Bo‘yin iyakdan orqaroqda boshlanadi va bosh kengligidan tor.'
    ]},
    {sarlavha:'Profil va ¾ burilish', xatboshilar:[
      'Profilda bosh chuqurligi (peshonadan ensagacha) balandligiga yaqin — yangi boshlovchilar ensani «kesib» qo‘yadi. Quloq bosh markazidan orqada, qosh–burun oralig‘ida; jag‘ chizig‘i quloq tagidan iyakka tushadi. Burun yuzdan oldinga chiqadi, lab va iyak undan orqada.',
      '¾ burilish — eng tabiiy va eng ko‘p ishlatiladigan rakurs. O‘rta chiziq egri bo‘ladi, uzoqdagi ko‘z torroq va burunga yaqinroq ko‘rinadi, burun qisman uzoqdagi yonoqni yopadi. Gorizontal chiziqlar (ko‘z, burun, og‘iz) bosh bilan birga buriladi, lekin bir-biriga parallel qoladi. Yuqoridan yoki pastdan qaralganda bu chiziqlar egriladi — sahnada boshni aylantirib ko‘ring.'
    ]}
  ],
  formulalar:[
    ['Ko‘z chizig‘i = H / 2','H — bosh balandligi (iyakdan tepagacha), akademik taxminiy'],
    ['Yuz = 3 teng qism','soch chizig‘i → qosh → burun asosi → iyak'],
    ['Bosh kengligi ≈ 5 · ko‘z','old ko‘rinish'],
    ['Soch chizig‘i ≈ tepadan H/7','taxminiy'],
    ['Og‘iz = burun asosidan (burun–iyak)/3','yuqori uchdan bir']
  ],
  qiziqarli:[
    'Leonardo da Vinchi yuz proporsiyalarini o‘lchab yozib qoldirgan; uning «Vitruviy odami» tana nisbatlariga bag‘ishlangan.',
    'Bola yuzida ko‘zlar nisbatan katta va past — shuning uchun multfilm qahramonlari «bolacha» chizilganda ko‘zlar katta qilinadi.',
    'Odam yuzi hech qachon to‘liq simmetrik emas; ikki chap yarmidan yig‘ilgan yuz begona ko‘rinadi.',
    'Qadimgi Misr rassomlari boshni 18 katakli to‘rda chizgan — proporsiya sxemasi 4 ming yildan beri ishlatiladi.'
  ],
  lugat:[
    ['Proporsiya','Qismlarning bir-biriga nisbati.'],
    ['Anfas','Old ko‘rinish.'],
    ['Profil','Yon ko‘rinish.'],
    ['¾ burilish','Old va yon orasidagi rakurs.'],
    ['Ko‘z chizig‘i','Ko‘zlar orqali o‘tuvchi gorizontal.'],
    ['Soch chizig‘i','Peshona va soch chegarasi.'],
    ['O‘rta chiziq','Yuz simmetriya o‘qi.'],
    ['Akademik sxema','O‘rtacha, taxminiy proporsiyalar to‘plami.'],
    ['Rakurs','Qarash burchagi.']
  ],
  manba:SN10 + '; thedrawingsource.com «Proportions of the face»; 21-draw.com (Loomis uslubi); ' + MW + ': «Andrew Loomis», «Facial proportions». Quloq chegarasi manbalarda farq qiladi (qosh–burun / ko‘z–burun) — matnda «taxminiy». Sahnadagi bosh — protsedurali soddalashtirilgan model, anatomik aniq emas.',
  ishlanma:ish('10-sinf', 'Yangi bilim berish va amaliy mashg‘ulot', 'Interaktiv 3D bosh (MAKON), sxema chizish, model (sinfdosh) bilan tekshirish',
    ['Akademik taxminiy bosh proporsiyalari (ko‘z — ½, yuz — 3 qism, 5 ko‘z) va rakurslarni o‘rgatish.', 'Diqqat, sabr va odam individualligiga hurmatni tarbiyalash.', 'O‘lchash, taqqoslash va sxemadan individual portretga o‘tish ko‘nikmasini rivojlantirish.'],
    ['Ko‘z, qosh, burun, og‘iz, quloq chiziqlarini sxemada joylashtiradi','5 ko‘z kengligi qoidasini qo‘llaydi','Profil va ¾ farqini tushuntiradi','Sxemani modelga moslab tuzatadi'],
    ['MAKON sahnasi «Portret proporsiyalari»','Qog‘oz, qalam, chizg‘ich','Ko‘zgu yoki sinfdosh-model','Darslik, portret reproduksiyalari'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Ikki chizma: ko‘z yuqorida va yarmida — qaysi to‘g‘ri?','Taxmin aytadi.'],['8–18','<b>Sxema.</b> MAKON: ko‘z ½, yuz 3 qism, 5 ko‘z; quloq.','Daftarga sxema chizadi.'],['18–24','<b>Rakurslar.</b> Profil, ¾; perspektiva.','Kuzatadi.'],['24–38','<b>Amaliy ish.</b> Sxema asosida sinfdosh portreti (chiziqli).','Chizadi, o‘lchab tuzatadi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Ko‘z chizig‘i','Bosh yarmi.'],['Anfas','Old ko‘rinish.'],['Profil','Yon ko‘rinish.'],['Sxema','Taxminiy proporsiyalar.']],
    [['Ko‘z qayerda?','Bosh balandligining yarmida'],['Bosh kengligi?','≈ 5 ko‘z'],['Quloq qayerda?','Qosh–burun oralig‘ida'],['Yuz necha qism?','3']],
    'Darslikdagi mashqlar; ko‘zgu oldida o‘z yuzingizni o‘lchab (ko‘z kengligi birligida) sxemadan farqlarini yozing; avtoportret eskizi.',
    SN10)
};

/* ================================================================
   S7. KAMOLIDDIN BEHZOD VA MINIATYURA — 11-sinf
   ================================================================ */
D['sn-behzod'] = {
  fan:'sanat', qisqaNom:'Behzod', nom:'Kamoliddin Behzod va miniatyura', sinf:'11-sinf',
  qisqa:'11-sinf · Tasviriy san’at · «O‘rta Osiyo miniatyurasi»',
  sahna:'ts_behzod',
  tsUq:{rejim:'sxema', tanl:null},
  kor:{
    sarlavha:'Kitob sahifasidagi butun dunyo',
    matn:'Miniatyura — qo‘lyozma kitobdagi rasm. XV asr Hirotida, Temuriylar — Husayn Boyqaro va Alisher Navoiy homiyligida Hirot maktabi gullab-yashnadi; uning eng mashhur ustasi Kamoliddin Behzod (taxminan 1455–1460 — 1535–1536). Miniatyura chiziqli perspektivasiz: makon tekis «qatlamlar» bilan, yuqoridan qaragandek beriladi; ranglar tiniq mineral bo‘yoqlar va oltin; matn kartushlari rasm bilan bir butun. Sahnada sxematik qayta chizma (asl asar ko‘chirilmagan): bloklarni bosing, ko‘z harakati, ranglar va hayot yo‘lini ko‘ring.',
    punktlar:['<b>Hirot maktabi</b> — XV asr, Temuriylar; Behzod 1486 dan kitobxona ustaxonasini boshqargan (manba: Wikipedia)','<b>Kompozitsiya:</b> tekis qatlamlar, ko‘p nuqtali «yuqoridan» qarash, diagonal harakat, matn kartushlari','<b>Ranglar:</b> lojuvard (lazurit), kinovar, malaxit, zarhal oltin — mineral pigmentlar','<b>Sanalar manbalarda farq qiladi:</b> tug‘ilgan 1455–1460, vafoti 1535–1536 — matnda ikkalasi']
  },
  bolimlar:[
    {sarlavha:'Behzod: hayot yo‘li (manbali)', jadval:[
      ['Tug‘ilish','Hirot, taxminan 1455–1460 (Wikipedia: c. 1455–1460; Akimushkin: 1457–58 — taxminiy)'],
      ['Ustozi','Mirak Naqqosh (Hirot kitobxonasi boshlig‘i); homiylar — Husayn Boyqaro, Alisher Navoiy'],
      ['1488–1489','Sa’diyning «Bo‘ston»iga 4 ta imzolangan miniatyura (Qohira milliy kutubxonasi nusxasi)'],
      ['1506','Husayn Boyqaro vafoti; 1510 — Hirot Safaviylar qo‘liga'],
      ['≈ 1522','Tabrizga (Shoh Ismoil I farmoni bilan); Safaviylar shoh kitobxonasi boshlig‘i (sana — ilmiy taxmin)'],
      ['Vafoti','1535–1536 (xronogramma 942 h.; Britannica: ≈ 1536?)']
    ]},
    {sarlavha:'Miniatyura xususiyatlari', jadval:[
      ['Makon','chiziqli perspektivasiz; rejalar pastdan yuqoriga — uzoqdagi narsa yuqorida'],
      ['Yorug‘lik','soyasiz, tekis ranglar; hajm kontur va rang bilan'],
      ['Odamlar','kichik, ko‘p figurali guruhlar; harakat va imo-ishora aniq'],
      ['Me’morchilik','peshtoq, ayvon, girih — tekis bezakli yuzalar'],
      ['Matn','kartushlar (jadvallar) rasm ichida — xattotlik va rasm birga']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Sahifa va bloklar', matn:'Sxematik qayta chizma: sahifa, ichki ramka, matn kartushlari (yuqori va pastki), oltin osmon, me’moriy ayvon, daraxt, odamlar guruhi, hovuz. Bu — tipik Hirot sahifasi tuzilishi, asl asar nusxasi emas. Bloklarni bosing.', holat:{rejim:'sxema', tanl:null}},
    {sarlavha:'Matn va rasm — bir butun', matn:'Miniatyura kitob uchun chizilgan: matn kartushlari rasm ichida, rasm matnni davom ettiradi. Xattot va naqqosh bitta ustaxonada (kitobxonada) ishlagan.', holat:{rejim:'sxema', tanl:'matn'}},
    {sarlavha:'Makon: pastdan yuqoriga', matn:'Chiziqli perspektiva yo‘q: yaqin narsalar pastda, uzoqdagilar yuqorida, hammasi bir xil aniqlikda. Ayvon tekis, yuqoridan qaragandek; odamlar bir-birini yopmaydi.', holat:{rejim:'sxema', tanl:'bino'}},
    {sarlavha:'Ko‘z harakati — diagonal', matn:'Kompozitsiya ko‘zni pastki chapdan yuqori o‘ngga, so‘ng chapga olib boradi — zigzag. Behzod ko‘p figurali sahnalarda harakatni shunday «rejissyorlik» qilgan.', holat:{rejim:'oqim', tanl:null}},
    {sarlavha:'Ranglar: mineral va oltin', matn:'Lojuvard (lazurit) ko‘k, kinovar qizil, malaxit yashil, oq qo‘rg‘oshin, zarhal oltin osmon. Bo‘yoqlar tiniq, soyasiz; kontrast juftliklar (ko‘k–oltin, qizil–yashil) yonma-yon.', holat:{rejim:'rang', tanl:null}},
    {sarlavha:'Behzodning hayot yo‘li', matn:'Hirotda tug‘ilgan (≈ 1455–1460), Mirak Naqqosh shogirdi; 1488–1489 «Bo‘ston» miniatyuralari; 1506 Boyqaro vafoti, 1510 Safaviylar; ≈ 1522 Tabriz, shoh kitobxonasi; vafoti 1535–1536. Sanalar manbalarda farq qiladi.', holat:{rejim:'tarix', tanl:null}},
    {sarlavha:'Meros', matn:'Behzod uslubi Tabriz, Buxoro va Mo‘g‘ul (Hindiston) maktablariga ta’sir qildi. O‘zbekistonda uning nomi bilan Milliy rassomlik va dizayn instituti ataladi; miniatyura an’anasi bugun ham davom etadi.', holat:{rejim:'sxema', tanl:'figuralar'}}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Miniatyurani tahlil qiling',
    topshiriqlar:[
      {shart:'Sahnadagi sxemaga qarang. Uzoqdagi narsalar qayerda joylashgan?', holat:{rejim:'sxema', tanl:null}, v:['Pastda, katta','Yuqorida, bir xil aniqlikda','Ko‘rinmaydi','Ufqdagi nuqtada'], t:1, izoh:'To‘g‘ri — miniatyurada <b>uzoqdagi narsa yuqorida</b>, chiziqli perspektiva yo‘q.'},
      {shart:'Qizil strelkalar nimani ko‘rsatadi?', holat:{rejim:'oqim', tanl:null}, v:['Yorug‘lik yo‘nalishini','Ko‘z harakati — diagonal kompozitsiyani','Shamolni','Matn o‘qilishini'], t:1, izoh:'To‘g‘ri — <b>ko‘z harakati</b>: pastki chapdan yuqoriga zigzag.'},
      {shart:'Palitradagi to‘q ko‘k rang qaysi mineraldan?', holat:{rejim:'rang', tanl:null}, v:['Malaxit','Lazurit (lojuvard)','Kinovar','Oxra'], t:1, izoh:'To‘g‘ri — <b>lazurit</b>; O‘rta asrlarda oltindan qimmat bo‘lgan.'},
      {shart:'Hayot yo‘lida 1488–1489 bilan bog‘liq voqea?', holat:{rejim:'tarix', tanl:null}, v:['Tabrizga ko‘chish','Sa’diy «Bo‘ston»iga miniatyuralar','Vafoti','Tug‘ilishi'], t:1, izoh:'To‘g‘ri — <b>«Bo‘ston»</b> miniatyuralari (Qohira nusxasi), 4 tasi imzolangan.'},
      {shart:'Sahifadagi matn kartushlari rasmga nisbatan qanday?', holat:{rejim:'sxema', tanl:'matn'}, v:['Alohida, rasmdan tashqarida','Rasm bilan bir butun kompozitsiya','Yo‘q','Faqat orqa tomonda'], t:1, izoh:'To‘g‘ri — miniatyura <b>kitob sahifasi</b>: matn va rasm bir butun.'}
    ]},
  test:[
    {s:'Kamoliddin Behzod qaysi shaharda yetishgan?', v:['Samarqand','Hirot','Buxoro','Toshkent'], t:1, izoh:'<b>Hirot</b> — Temuriylar poytaxti, Hirot miniatyura maktabi.'},
    {s:'Behzodning tug‘ilgan yili manbalarda qanday?', v:['Aniq 1450','Taxminan 1455–1460','Aniq 1500','1400'], t:1, izoh:'<b>Taxminan 1455–1460</b> — aniq sana noma’lum (Akimushkin: 1457–58).'},
    {s:'Behzodning homiylari?', v:['Husayn Boyqaro va Alisher Navoiy','Amir Temur','Bobur','Ulug‘bek'], t:0, izoh:'<b>Husayn Boyqaro va Navoiy</b> — Hirot madaniy muhiti; Temur va Ulug‘bek undan oldin yashagan.'},
    {s:'1488–1489 yillardagi mashhur ishi?', v:['«Boburnoma» rasmlari','Sa’diy «Bo‘ston»iga miniatyuralar','Registon naqshlari','Portret galereyasi'], t:1, izoh:'<b>«Bo‘ston»</b> (Qohira milliy kutubxonasi) — 4 ta imzolangan miniatyura.'},
    {s:'Behzod taxminan 1522-yildan qayerda ishlagan?', v:['Qohira','Tabriz (Safaviylar kitobxonasi)','Dehli','Istanbul'], t:1, izoh:'<b>Tabriz</b> — Safaviylar shoh kitobxonasi boshlig‘i (1522, Shoh Ismoil I farmoni — ilmiy taxmin; Tahmasp I 1524-yildan shoh).'},
    {s:'Miniatyurada makon qanday beriladi?', v:['Chiziqli perspektiva bilan','Tekis qatlamlar, uzoqdagi narsa yuqorida','Faqat soya bilan','Fotografik'], t:1, izoh:'<b>Tekis qatlamlar</b>, «yuqoridan» qarash; chiziqli perspektiva yo‘q.'},
    {s:'Miniatyurada ranglar qanday?', v:['Soyali, xira','Tiniq, soyasiz, mineral bo‘yoqlar va oltin','Faqat qora-oq','Akvarel'], t:1, izoh:'<b>Tiniq mineral pigmentlar</b> (lazurit, kinovar, malaxit) va zarhal; soya yo‘q.'},
    {s:'Behzod vafot etgan yil (manbalar)?', v:['1500','1535–1536','1600','1480'], t:1, izoh:'<b>1535–1536</b> — xronogramma 942 h. (Britannica: ≈ 1536?).'},
    {s:'Hirot maktabi qaysi sulola davrida gullagan?', v:['Qoraxoniylar','Temuriylar','Shayboniylar','Mang‘itlar'], t:1, izoh:'<b>Temuriylar</b> (XV asr); 1510 dan Hirot Safaviylar qo‘lida.'},
    T3('Sahnadagi sxemada <b>me’moriy ayvon</b> (peshtoq) blokini bosing.', 'ts-behzod', 'bos', ['bino'], ['Me’moriy ayvon', 'boshqa blok'], 'Miniatyurada me’morchilik <b>tekis, bezakli yuza</b> — girih va koshinlar bilan; ayvon ko‘pincha yuqori o‘ngda.')
  ],
  yordamchi:[
    {s:'Nega sahnada asl asar yo‘q?', j:'Behzod miniatyuralari muzey mulki va rasmlari turli litsenziyalarda; MAKON faqat protsedurali va ochiq materiallardan foydalanadi. Shuning uchun kompozitsiya sxematik qayta chizilgan — darslik yoki muzey saytida asl asarni ko‘ring.', kalit:['asl','yo‘q','nega']},
    {s:'Behzodga ishonchli tegishli asarlar qaysi?', j:'Imzolangan ishlar kam: «Bo‘ston» (1488–89, Qohira) miniatyuralari eng ishonchli. Ko‘p asarlar unga uslub bo‘yicha nisbat beriladi; olimlar (masalan, O. Akimushkin) atributsiya masalalarini muhokama qiladi.', kalit:['asar','ishonchli']}
  ],
  maqola:[
    {sarlavha:'Miniatyura — kitob san’ati', xatboshilar:[
      'Miniatyura («minium» — qizil qo‘rg‘oshin bo‘yog‘i so‘zidan) — qo‘lyozma kitobdagi rasm. Sharqda u xattotlik, muqova va naqsh bilan birga «kitob san’ati»ni tashkil qilgan; barchasi hukmdor kitobxonasi — ustaxona-kutubxonada yaratilgan. Rasm matnni tasvirlaydi, lekin oddiy illyustratsiya emas: o‘z kompozitsion qonunlariga ega.',
      'Bu qonunlar Yevropa Uyg‘onish davri perspektivasidan farq qiladi: makon tekis qatlamlar bilan, yuqoridan qaragandek beriladi — yaqin narsa pastda, uzoqdagi yuqorida, hammasi bir xil aniqlikda; yorug‘lik va soya yo‘q, hajm rang va kontur bilan; odamlar kichik, ko‘p, harakatlari aniq; me’morchilik — tekis bezakli yuzalar. Matn kartushlari rasm ichida — sahifa bir butun.'
    ]},
    {sarlavha:'Hirot maktabi va Behzod', xatboshilar:[
      'XV asrda Temuriylar poytaxti Hirot Sharq madaniyatining markazi bo‘ldi. Husayn Boyqaro (hukmronligi 1469–1506) va uning vaziri, shoir Alisher Navoiy homiyligida kitobxona ustaxonasi ishladi; uni Mirak Naqqosh boshqargan. Shu ustaxonada Kamoliddin Behzod yetishdi — tug‘ilgan yili aniq emas, manbalar taxminan 1455–1460 deydi (Akimushkin xronogrammadan 1457–58 chiqaradi). Wikipedia ma’lumotiga ko‘ra, u 1486-yildan ustaxonani boshqargan.',
      'Eng ishonchli asarlari — Sa’diyning «Bo‘ston» qo‘lyozmasiga 1488–1489 (893–894 h.) yillarda chizilgan va imzolangan to‘rt miniatyura (Qohira milliy kutubxonasi). Unga «Zafarnoma» miniatyuralari, Husayn Boyqaro va Shayboniyxon portretlari ham nisbat beriladi. 1506-yilda Boyqaro vafot etdi, 1510-yilda Hirot Safaviylar qo‘liga o‘tdi. 1510–1522 yillardagi hayoti manbalarda qorong‘i; taxminan 1522-yilda Shoh Ismoil I farmoni bilan Tabrizga chaqirtirilib, shoh kitobxonasiga boshchilik qilgan deb hisoblanadi (Tahmasp I 1524-yildan shoh). Vafoti — 1535–1536 (xronogramma 942 h.; ba’zi manbalar 1537).'
    ]},
    {sarlavha:'Uslub: kompozitsiya va rang', xatboshilar:[
      'Behzod ko‘p figurali sahnalarni (qurilish, bazm, jang, hammom) jonli, deyarli «hujjatli» aniqlikda chizgan: har odamning o‘z ishi, imo-ishorasi bor. Kompozitsiya ko‘zni diagonal yoki zigzag bo‘ylab olib yuradi; me’morchilik va daraxtlar sahnani «ramkalaydi». Ranglar — tiniq mineral pigmentlar: lojuvard (lazurit) ko‘k, kinovar qizil, malaxit yashil, oq qo‘rg‘oshin; osmon ko‘pincha zarhal oltin.',
      'Uning uslubi Tabriz, Buxoro va keyinchalik Mo‘g‘ul (Hindiston) miniatyura maktablariga ta’sir qildi. Bugun O‘zbekistonda Kamoliddin Behzod nomidagi Milliy rassomlik va dizayn instituti faoliyat yuritadi; miniatyura an’anasi Toshkent va Samarqand ustalarida davom etmoqda. Sahnadagi sxema — asl asar nusxasi emas, kompozitsiya tamoyillarini ko‘rsatuvchi qayta chizma.'
    ]}
  ],
  formulalar:[
    ['Yaqin → pastda, uzoq → yuqorida','Miniatyura makoni (chiziqli perspektivasiz)'],
    ['Matn + rasm = sahifa','Kartushlar kompozitsiya qismi'],
    ['Ko‘k–oltin, qizil–yashil','Kontrast juftliklar yonma-yon']
  ],
  qiziqarli:[
    'Lazurit Badaxshondan (Afg‘oniston) qazib olingan; undan tayyorlangan ultramarin bo‘yog‘i Yevropada ham oltindan qimmat bo‘lgan.',
    'Miniatyura mo‘yqalami bir necha tuk — mushuk yoki sincap junidan; ustalar lupasiz millimetrdan kichik detallarni chizgan.',
    'Behzodga nisbat beriladigan Shayboniyxon portreti — O‘rta Osiyo miniatyurasidagi eng mashhur «portret»lardan biri.',
    'Alisher Navoiy «Majolis un-nafois»da Hirot rassomlari, jumladan Behzod haqida yozgan — zamondosh guvohlik.'
  ],
  lugat:[
    ['Miniatyura','Qo‘lyozma kitobdagi rasm.'],
    ['Kitobxona','Hukmdor kutubxonasi va kitob ustaxonasi.'],
    ['Naqqosh','Rassom, naqsh ustasi.'],
    ['Kartush','Rasm ichidagi matn jadvali.'],
    ['Peshtoq','Bezakli kirish ravoqi.'],
    ['Lojuvard','Lazuritdan olingan ko‘k bo‘yoq.'],
    ['Kinovar','Qizil mineral bo‘yoq (simob sulfidi).'],
    ['Zarhal','Oltin bilan bezash.'],
    ['Xronogramma','Harflar son qiymatidan sana chiqaruvchi yozuv.'],
    ['Atributsiya','Asarni muallifga nisbat berish.']
  ],
  manba:SN11 + '; ' + MW + ': «Kamāl ud-Dīn Behzād» (c. 1455–1460 — 1535/36; 1486 ustaxona; 1522 Tabriz); O. F. Akimushkin, «Письменные памятники Востока» 2(7), 2001 (942 h., 1457–58, 1488–89 «Bo‘ston»); Encyclopaedia Iranica «Behzād»; sanat.orexca.com. Sanalar manbalarda farq qiladi — matnda ikkalasi; sahnadagi tasvir sxematik, asl asar ko‘chirilmagan.',
  ishlanma:ish('11-sinf', 'Yangi bilim berish va tahlil darsi', 'Sxematik kompozitsiya tahlili (MAKON), reproduksiyalar (darslik/muzey sayti), munozara',
    ['Hirot miniatyura maktabi, Behzod hayoti va uslubi, miniatyura kompozitsiya tamoyillarini o‘rgatish.', 'Milliy madaniy merosga hurmat va manbaga tanqidiy yondashuvni tarbiyalash.', 'San’at asarini tahlil qilish va asoslab gapirish ko‘nikmasini rivojlantirish.'],
    ['Behzod hayotining asosiy sanalarini (manbali) aytadi','Miniatyura makon va rang xususiyatlarini tushuntiradi','Kompozitsiya sxemasini (bloklar, ko‘z harakati) chizadi','Asl asar va sxematik tahlilni farqlaydi'],
    ['MAKON sahnasi «Behzod va miniatyura»','Darslikdagi reproduksiyalar, muzey saytlari','Qog‘oz, qalam, rangli qalam','Darslik'],
    [['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],['3–8','<b>Motivatsiya.</b> Reproduksiya: «perspektiva qayerda?»','Taxmin aytadi.'],['8–18','<b>Hirot va Behzod.</b> MAKON: hayot yo‘li; manbalar farqi.','Sanalarni yozadi.'],['18–28','<b>Kompozitsiya.</b> Sxema, ko‘z harakati, ranglar.','Reproduksiyada bloklarni topadi.'],['28–38','<b>Amaliy ish.</b> Reproduksiyaning kompozitsiya sxemasini chizish (bloklar + strelkalar).','Chizadi, tushuntiradi.'],['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    [['Miniatyura','Kitob rasmi.'],['Kitobxona','Ustaxona-kutubxona.'],['Kartush','Matn jadvali.'],['Lojuvard','Lazurit ko‘k.']],
    [['Behzod qayerda yetishgan?','Hirot'],['«Bo‘ston» miniatyuralari?','1488–1489'],['Uzoqdagi narsa qayerda?','Yuqorida'],['Vafoti?','1535–1536']],
    'Darslikdagi savollar; muzey saytidan (yoki darslikdan) bitta Hirot miniatyurasini tanlab, kompozitsiya sxemasini (bloklar, ko‘z harakati, 5 asosiy rang) chizing va 5 gap bilan tahlil yozing.',
    SN11)
};

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
bogla('sanat', 'Rang doirasi va rang aralashtirish', 'sn-rang', '5-sinf: Itten 12 rang, RYB va RGB farqi');
bogla('sanat', 'Chiziqli perspektiva', 'sn-perspektiva', '6-sinf: 3D ko‘cha, ufq, 1 va 2 nuqtali');
bogla('sanat', 'Yorug‘lik, soya va hajm', 'sn-yorugluk', '7-sinf: shar/kub/silindr, manba slayderi, soya zonalari');
bogla('sanat', 'Kompozitsiya va oltin kesim', 'sn-kompozitsiya', '8-sinf: uchdan bir, φ = 1,618, interaktiv kadr');
bogla('sanat', 'Girih va islimiy naqsh', 'sn-girih', '9-sinf: 6/8/10/12 burchakli yulduz generatori, Registon');
bogla('sanat', 'Portret proporsiyalari', 'sn-portret', '10-sinf: 3D bosh, ko‘z — ½, 5 ko‘z kengligi (akademik taxminiy)');
bogla('sanat', 'Kamoliddin Behzod va miniatyura', 'sn-behzod', '11-sinf: sxematik kompozitsiya tahlili, Hirot maktabi');

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
