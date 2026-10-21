/* MAKON — virtual kimyo laboratoriyasi: reaktivlar, jihozlar, reaksiya qoidalari, tajriba topshiriqlari.
   Qoida: faqat maktab dasturidagi, manbali reaksiyalar. Model soddalashtirilgan: miqdorlar «qism» (porsiya) bilan o‘lchanadi,
   reaksiya tezligi va issiqlik effekti sifat jihatidan ko‘rsatiladi. Modelga kiritilmagan juftliklar uchun ilova buni ochiq aytadi.
   Xavf belgilari: GHS piktogrammalari (GHS02 alanga, GHS03 oksidlovchi, GHS04 bosim ostidagi gaz, GHS05 yemiruvchi,
   GHS06 zaharli, GHS07 undov, GHS08 sog‘liq uchun xavf, GHS09 atrof-muhit). */
(function(){
const MANBA = '7–9-sinf «Kimyo» darsliklari (O‘zbekiston); RSC Education amaliy tajribalari (edu.rsc.org); xavf belgilari ko‘rsatilgan konsentratsiyadagi eritma uchun — CLP (EU 1272/2008) konsentratsiya chegaralari, CLEAPSS Student Safety Sheets, PubChem «GHS Classification»';

/* tur: suyuq | qattiq | kukun | gaz | indikator.  beradi — bir qism qo‘shilganda idishga tushadigan zarrachalar.
   idishRang — shisha idish rangi (yorug‘likdan saqlanadigan moddalar jigarrang shishada). */
const REAKTIV = {
  suv:{nom:'Distillangan suv', f:'H₂O', tur:'suyuq', rang:'#9fd4ff', shaffof:.18, beradi:{H2O:1}, ghs:[],
    tavsif:'Tuzlardan tozalangan suv. Eritmalarni suyultirish va natriy bilan tajriba uchun.', sinab:['natriy']},
  hcl:{nom:'Xlorid kislota', f:'HCl', izoh:'10 % li eritma', tur:'suyuq', rang:'#e8f0d8', shaffof:.2, beradi:{H2O:1, H:2, Cl:2}, ghs:['GHS07'],
    tavsif:'Rangsiz, o‘tkir hidli kuchli kislota eritmasi. 10 % li eritma teri va ko‘zni ta’sirlantiradi, bug‘i nafas yo‘llarini achishtiradi; konsentrlangan kislota (25 % dan yuqori) kuydiradi — yemiruvchi (GHS05).', sinab:['rux','magniy','marmar','naoh','agno3']},
  h2so4:{nom:'Sulfat kislota', f:'H₂SO₄', izoh:'10 % li (≈1 M) eritma', tur:'suyuq', rang:'#f1ead0', shaffof:.2, beradi:{H2O:1, H:2, SO4:1}, ghs:['GHS07'],
    tavsif:'Rangsiz eritma, teri va ko‘zni ta’sirlantiradi. Konsentrlangan sulfat kislota — og‘ir moysimon suyuqlik, terini qattiq kuydiradi (GHS05); uni suyultirishda kislota suvga oz-ozdan quyiladi — aksincha emas.', sinab:['bacl2','rux','cuo','naoh']},
  naoh:{nom:'Natriy gidroksid', f:'NaOH', izoh:'1 M (≈4 %) eritma', tur:'suyuq', rang:'#dfe9f5', shaffof:.2, beradi:{H2O:1, OH:2}, ghs:['GHS05'], alanga:'Na',
    tavsif:'O‘yuvchi natriy eritmasi — kuchli ishqor. Teri va ko‘z uchun juda xavfli. Teriga tegsa sirpanchiq (sovunsimon) sezgi beradi — bu teri yemirilayotganining belgisi: darhol ko‘p suv bilan yuviladi. Qo‘l bilan ushlanmaydi.', sinab:['fenolftalein','cuso4','fecl3','hcl']},
  nh3aq:{nom:'Ammiakli suv', f:'NH₃·H₂O', izoh:'1 M eritma (ammoniy gidroksid)', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, OH:1, NH3a:1}, ghs:['GHS07'],
    tavsif:'Ammiakning suvdagi eritmasi — kuchsiz asos, o‘tkir hidli. Mis(II) va kumush tuzlari bilan avval cho‘kma beradi, ortiqcha qo‘shilganda cho‘kma erib, kompleks birikma hosil bo‘ladi. AgCl cho‘kmasi suyultirilgan ammiakda eriydi, AgI esa erimaydi — galogenidlarni farqlash usuli. 1 M eritma teri va ko‘zni ta’sirlantiradi (GHS07); konsentrlangan eritma yemiruvchi (GHS05). Faqat yaxshi shamollatiladigan joyda, hidi yelpib hidlanadi.', sinab:['cuso4','agno3','fenolftalein']},
  ohaksuv:{nom:'Ohakli suv', f:'Ca(OH)₂', izoh:'to‘yingan eritma', tur:'suyuq', rang:'#e9f1f4', shaffof:.2, beradi:{H2O:1, Ca2:.5, OH:1}, ghs:[], alanga:'Ca',
    tavsif:'Kalsiy gidroksidning tiniq eritmasi. Karbonat angidridni aniqlash uchun ishlatiladi — CO₂ ta’sirida loyqalanadi. Eritma juda suyuq (0,02 M dan kam) — tasniflanmaydi, lekin ishqoriy (pH ≈ 12,4): ko‘z himoyasi kerak. Qattiq Ca(OH)₂ ko‘zni jiddiy shikastlaydi (GHS05).', sinab:['co2','na2co3','fenolftalein']},
  cuso4:{nom:'Mis(II) sulfat', f:'CuSO₄', izoh:'0,5 M eritma', tur:'suyuq', rang:'#2a86dd', shaffof:.55, beradi:{H2O:1, Cu2:1, SO4:1}, ghs:['GHS05','GHS07','GHS09'], alanga:'Cu',
    tavsif:'Havorang eritma (rangni gidratlangan Cu²⁺ ionlari beradi). Yutilganda zararli, ko‘zni jiddiy shikastlashi mumkin; suv organizmlari uchun juda zaharli — kanalizatsiyaga to‘kilmaydi. (CLEAPSS atrof-muhit belgisini faqat qattiq tuzga qo‘yadi; CLP hisobi bo‘yicha bu konsentratsiyada eritmaga ham tegishli.)', sinab:['naoh','temir','rux','bacl2','na2co3']},
  fecl3:{nom:'Temir(III) xlorid', f:'FeCl₃', izoh:'0,5 M eritma', tur:'suyuq', rang:'#c98a1e', shaffof:.55, beradi:{H2O:1, Fe3:1, Cl:3}, ghs:['GHS05','GHS07'],
    tavsif:'Sariq-jigarrang eritma. Ishqor bilan qo‘ng‘ir cho‘kma beradi — Fe³⁺ ionini aniqlash reaksiyasi.', sinab:['naoh','na2co3','agno3']},
  agno3:{nom:'Kumush nitrat', f:'AgNO₃', izoh:'0,1 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, idishRang:'#5a3414', beradi:{H2O:1, Ag:2}, ghs:['GHS07','GHS09'],
    tavsif:'Rangsiz eritma, yorug‘likda parchalanadi — jigarrang shishada saqlanadi. Terida qora dog‘ qoldiradi. Xlorid ionlari uchun reaktiv. Qattiq tuzi — oksidlovchi va yemiruvchi (GHS03, GHS05); 0,1 M eritmasi ta’sirlantiruvchi.', sinab:['nacl','hcl','mis','naoh']},
  bacl2:{nom:'Bariy xlorid', f:'BaCl₂', izoh:'0,1 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Ba:1, Cl:2}, ghs:[], alanga:'Ba',
    tavsif:'Rangsiz eritma. Sulfat ionlari uchun reaktiv: oq BaSO₄ cho‘kmasi hosil bo‘ladi. Qattiq tuzi yutilganda zaharli (GHS06); 0,1 M eritmasi tasniflanmaydi, lekin ichilmaydi — ishdan so‘ng qo‘l yuviladi.', sinab:['h2so4','cuso4','na2co3']},
  nacl:{nom:'Natriy xlorid', f:'NaCl', izoh:'eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Cl:2}, ghs:[],
    tavsif:'Osh tuzi eritmasi. Kumush nitrat bilan xlorid ioniga sifat reaksiyasini beradi. Alangani sariq rangga bo‘yaydi.', sinab:['agno3','spirtovka'], alanga:'Na'},
  kcl:{nom:'Kaliy xlorid', f:'KCl', izoh:'1 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Cl:1}, ghs:[], alanga:'K',
    tavsif:'Rangsiz eritma. Kaliy ionlari alangani och binafsha (lila) rangga bo‘yaydi. Kaliy xlorid GHS bo‘yicha xavfli deb tasniflanmaydi.', sinab:['spirtovka','agno3']},
  kbr:{nom:'Kaliy bromid', f:'KBr', izoh:'0,1 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Br:2}, ghs:[], alanga:'K',
    tavsif:'Rangsiz eritma. Bromid ionlari kumush nitrat bilan och sariq (krem rang) AgBr cho‘kmasini beradi — galogenid ionlarini farqlashda ishlatiladi. Qattiq tuzi ko‘zni ta’sirlantiradi (GHS07); 0,1 M eritmasi tasniflanmaydi.', sinab:['agno3','nh3aq','spirtovka']},
  ki:{nom:'Kaliy yodid', f:'KI', izoh:'0,1 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Iion:2}, ghs:[], alanga:'K',
    tavsif:'Rangsiz eritma. Yodid ionlari kumush nitrat bilan sariq AgI cho‘kmasini beradi. Oksidlovchilar (vodorod peroksid kislotali muhitda, temir(III) tuzlari) yodidni erkin yodgacha oksidlaydi — eritma sarg‘ish-qo‘ng‘ir tusga kiradi, kraxmal esa ko‘karadi. 0,1 M eritmasi tasniflanmaydi.', sinab:['agno3','h2o2','fecl3','kraxmal']},
  licl:{nom:'Litiy xlorid', f:'LiCl', izoh:'0,5 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Cl:1}, ghs:[], alanga:'Li',
    tavsif:'Rangsiz eritma. Litiy ionlari alangani to‘q qizil (karmin) rangga bo‘yaydi. Qattiq tuzi yutilganda zararli, teri va ko‘zni ta’sirlantiradi (GHS07); 0,5 M eritmasi tasniflanmaydi.', sinab:['spirtovka']},
  cacl2:{nom:'Kalsiy xlorid', f:'CaCl₂', izoh:'0,5 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, Ca2:1, Cl:2}, ghs:[], alanga:'Ca',
    tavsif:'Rangsiz eritma. Kalsiy ionlari alangani g‘isht-qizil rangga bo‘yaydi; karbonat bilan oq CaCO₃ cho‘kmasi beradi. Qattiq tuzi ko‘zni ta’sirlantiradi (GHS07); 0,5 M eritmasi tasniflanmaydi.', sinab:['spirtovka','na2co3']},
  kscn:{nom:'Kaliy rodanid', f:'KSCN', izoh:'0,1 M eritma (kaliy tiotsianat)', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, SCN:1}, ghs:[],
    tavsif:'Rangsiz eritma — temir(III) ionlari uchun reaktiv: qon-qizil rang hosil bo‘ladi. Qattiq tuzi yutilganda, teriga tekkanda va nafas bilan kirganda zararli (GHS07), kislotalar bilan juda zaharli gaz ajratadi, suv organizmlari uchun zararli; 0,1 M eritmasi tasniflanmaydi, lekin kislotalardan alohida saqlanadi.', sinab:['fecl3']},
  kraxmal:{nom:'Kraxmal eritmasi', f:'(C₆H₁₀O₅)ₙ', izoh:'1 % li kleyster', tur:'suyuq', rang:'#eef0ea', shaffof:.3, beradi:{H2O:1, krax:1}, ghs:[],
    tavsif:'Kraxmalni issiq suvda qaynatib tayyorlangan xira, deyarli rangsiz eritma (kleyster). Yod bilan to‘q ko‘k rang beradi — kraxmalga sifat reaksiyasi. Xavfsiz modda.', sinab:['yod']},
  na2co3:{nom:'Natriy karbonat', f:'Na₂CO₃', izoh:'0,5 M eritma', tur:'suyuq', rang:'#eef2f4', shaffof:.2, beradi:{H2O:1, CO3:1}, ghs:[], alanga:'Na',
    tavsif:'Kir yuvish sodasi (kalsinatsiyalangan soda) eritmasi, muhiti ishqoriy (gidroliz). Kislota bilan CO₂ ajratadi. Qattiq tuzi va 0,8 M dan quyuq eritmasi ko‘zni ta’sirlantiradi (GHS07).', sinab:['hcl','ohaksuv','bacl2','cuso4','fenolftalein']},
  h2o2:{nom:'Vodorod peroksid', f:'H₂O₂', izoh:'3 % li eritma', tur:'suyuq', rang:'#eef4f8', shaffof:.18, idishRang:'#5a3414', beradi:{H2O:1, H2O2:2.5}, ghs:[],
    tavsif:'Rangsiz eritma, sekin parchalanadi: 2H₂O₂ → 2H₂O + O₂. Katalizator (MnO₂) reaksiyani keskin tezlashtiradi. 3 % li eritma GHS bo‘yicha tasniflanmaydi; yuqori konsentratsiyalisi — oksidlovchi va yemiruvchi.', sinab:['mno2','kmno4']},
  kmno4:{nom:'Kaliy permanganat', f:'KMnO₄', izoh:'0,02 M eritma', tur:'suyuq', rang:'#7a1fa0', shaffof:.8, idishRang:'#5a3414', beradi:{H2O:1, MnO4:1}, ghs:[],
    tavsif:'To‘q binafsha eritma, kuchli oksidlovchi. Sulfat kislota bilan kislotalangan muhitda vodorod peroksid ta’sirida rangsizlanadi. Xlorid kislota bilan aralashtirilmaydi — zaharli xlor ajraladi! Qattiq kristallari — oksidlovchi, yutilganda zararli, suv muhiti uchun juda zaharli (GHS03, 07, 08, 09); 0,02 M eritmasi tasniflanmaydi, teri va kiyimda jigarrang dog‘ qoldiradi.', sinab:['h2o2','h2so4']},

  fenolftalein:{nom:'Fenolftalein', f:'C₂₀H₁₄O₄', izoh:'0,1 % li spirtli eritma', tur:'indikator', rang:'#f4f4f4', shaffof:.15, beradi:{ind_ff:1}, tomchi:true, ghs:['GHS02'],
    tavsif:'Indikator: kislotali va neytral muhitda rangsiz, ishqoriy muhitda to‘q pushti (malina rang). Eritmasi spirtda — yonuvchan. Qattiq fenolftalein kanserogen deb tasniflangan (GHS08), shuning uchun eritmani faqat o‘qituvchi yoki laborant tayyorlaydi.', sinab:['naoh','ohaksuv','na2co3']},
  lakmus:{nom:'Lakmus', f:'indikator', izoh:'eritma', tur:'indikator', rang:'#7b52ab', shaffof:.6, beradi:{ind_lak:1}, tomchi:true, ghs:[],
    tavsif:'Indikator: kislotali muhitda qizil, neytral muhitda binafsha, ishqoriy muhitda ko‘k.', sinab:['hcl','naoh','suv']},
  metiloranj:{nom:'Metiloranj', f:'C₁₄H₁₄N₃NaO₃S', izoh:'0,1 % li suvli eritma', tur:'indikator', rang:'#f2cf2e', shaffof:.6, beradi:{ind_mo:1}, tomchi:true, ghs:[],
    tavsif:'Indikator: kuchli kislotali muhitda (pH 3,1 dan past) qizil, pH 3,1–4,4 oralig‘ida to‘q sariq, neytral va ishqoriy muhitda sariq. Qattiq holda yutilganda zaharli (GHS06); 0,1 % li suvli eritmasi tasniflanmaydi.', sinab:['hcl','naoh']},

  yod:{nom:'Yod eritmasi', f:'I₂ + KI', izoh:'0,01 M, kaliy yodiddagi suvli eritma', tur:'indikator', rang:'#b8661a', shaffof:.6, idishRang:'#5a3414', beradi:{I2:1}, tomchi:true, ghs:[],
    tavsif:'Sariq-jigarrang eritma: yod suvda yomon eriydi, shuning uchun kaliy yodid eritmasida tayyorlanadi. Kraxmal uchun reaktiv — to‘q ko‘k rang beradi. Qattiq yod yutilganda, teriga tekkanda va nafas bilan kirganda zararli, teri va ko‘zni ta’sirlantiradi, uzoq vaqt ta’sir etsa qalqonsimon bezga zarar yetkazadi, suv organizmlari uchun juda zaharli (GHS07, GHS08, GHS09); 0,01 M eritmasi tasniflanmaydi, lekin terida sariq-jigarrang dog‘ qoldiradi. Dorixonadagi 5 % li spirtli yod eritmasi — boshqa, quyuqroq eritma.', sinab:['kraxmal']},

  rux:{nom:'Rux', f:'Zn', izoh:'granulalar', tur:'qattiq', rang:'#9aa3ad', beradi:{Zn_s:1}, ghs:[],
    tavsif:'Kulrang-ko‘kish metall. Faollik qatorida vodoroddan oldin turadi — kislotalardan vodorodni siqib chiqaradi.', sinab:['hcl','h2so4','cuso4']},
  magniy:{nom:'Magniy', f:'Mg', izoh:'lenta', tur:'qattiq', rang:'#cfd4d8', beradi:{Mg_s:1}, ghs:['GHS02'],
    tavsif:'Yengil kumushrang metall. Kislota bilan shiddatli reaksiyaga kirishadi. Lentasi ko‘zni qamashtiruvchi oq alanga bilan yonadi.', sinab:['hcl','h2so4']},
  temir:{nom:'Temir', f:'Fe', izoh:'mix', tur:'qattiq', rang:'#6f747a', beradi:{Fe_s:1}, ghs:[],
    tavsif:'Kulrang metall. Kislotalar bilan sekin reaksiyaga kirishadi; misni uning tuzi eritmasidan siqib chiqaradi.', sinab:['cuso4','hcl']},
  mis:{nom:'Mis', f:'Cu', izoh:'sim', tur:'qattiq', rang:'#c0622d', beradi:{Cu_s:1}, ghs:[],
    tavsif:'Qizg‘ish metall. Faollik qatorida vodoroddan keyin turadi — xlorid va suyultirilgan sulfat kislotadan vodorodni siqib chiqarmaydi.', sinab:['hcl','agno3']},
  natriy:{nom:'Natriy', f:'Na', izoh:'kerosin ostida', tur:'qattiq', rang:'#d9d6cc', beradi:{Na_s:1}, ghs:['GHS02','GHS05'],
    tavsif:'Yumshoq, juda faol ishqoriy metall. Suv bilan shiddatli reaksiyaga kirishadi, shuning uchun kerosin ostida saqlanadi. Faqat guruch donidek (3–4 mm dan katta bo‘lmagan) bo‘lakcha, faqat toza suvga, faqat o‘qituvchi bajaradi!', sinab:['suv']},
  marmar:{nom:'Marmar', f:'CaCO₃', izoh:'bo‘lakchalar', tur:'qattiq', rang:'#e9e6df', beradi:{CaCO3_s:1}, ghs:[],
    tavsif:'Kalsiy karbonat — marmar, ohaktosh va bo‘rning asosi. Kislota ta’sirida karbonat angidrid ajratadi.', sinab:['hcl']},

  mno2:{nom:'Marganes(IV) oksid', f:'MnO₂', izoh:'kukun', tur:'kukun', rang:'#2b221d', beradi:{MnO2_s:1}, ghs:['GHS07'],
    tavsif:'Qora-jigarrang kukun. Vodorod peroksid parchalanishining katalizatori: o‘zi sarflanmaydi. Yutilganda va nafas bilan kirganda zararli.', sinab:['h2o2']},
  cuo:{nom:'Mis(II) oksid', f:'CuO', izoh:'kukun', tur:'kukun', rang:'#16130f', beradi:{CuO_s:1}, ghs:['GHS09'],
    tavsif:'Qora kukun, asosli oksid. Isitilganda kislotalarda erib, havorang mis tuzi eritmasini hosil qiladi.', sinab:['h2so4']},
  nh4cl:{nom:'Ammoniy xlorid', f:'NH₄Cl', izoh:'kukun (novshadil)', tur:'kukun', rang:'#f3f3ee', beradi:{NH4_s:1}, ghs:['GHS07'],
    tavsif:'Oq kristall kukun (novshadil). Ishqor bilan isitilganda ammiak ajratadi — ammoniy ioniga sifat reaksiyasi. Yutilganda zararli, ko‘zni ta’sirlantiradi (GHS07).', sinab:['naoh','plita','qogoz']},
  soda:{nom:'Natriy gidrokarbonat', f:'NaHCO₃', izoh:'ichimlik sodasi', tur:'kukun', rang:'#f4f4f0', beradi:{NaHCO3_s:1}, ghs:[], alanga:'Na',
    tavsif:'Ichimlik sodasi — oq kukun. Kislota bilan «qaynab», karbonat angidrid ajratadi.', sinab:['hcl']},

  co2:{nom:'Karbonat angidrid', f:'CO₂', izoh:'ballon', tur:'gaz', rang:'#1b1b1d', beradi:{gCO2:.25}, ghs:['GHS04'],
    tavsif:'Rangsiz, havodan og‘ir gaz. Yonishga yordam bermaydi. Ohakli suvni loyqalantiradi. Ballon rangi — qora, yozuvi sariq (GOST 949-73).', sinab:['ohaksuv']},
  o2:{nom:'Kislorod', f:'O₂', izoh:'ballon', tur:'gaz', rang:'#1f6fd6', beradi:{gO2:1}, ghs:['GHS03','GHS04'],
    tavsif:'Rangsiz gaz, yonishni kuchaytiradi: cho‘g‘langan cho‘p kislorodda qayta alangalanadi. Ballon rangi — havorang, yozuvi qora (GOST 949-73).', sinab:['chop']}
};

/* jihozlar. idish:true — ichiga modda solinadigan; sigim — necha qism sig‘adi */
const JIHOZ = {
  stakan:{nom:'Kimyoviy stakan', izoh:'250 ml', idish:true, sigim:10, tavsif:'Issiqqa chidamli shisha stakan: eritmalarni aralashtirish va isitish uchun.'},
  kolba:{nom:'Konussimon kolba', izoh:'250 ml', idish:true, sigim:8, tavsif:'Tor bo‘g‘izli kolba — chayqatganda suyuqlik to‘kilmaydi, gaz uzoqroq saqlanadi.'},
  probirka:{nom:'Probirka shtativda', izoh:'20 ml', idish:true, sigim:4, tavsif:'Kichik miqdordagi sifat reaksiyalari uchun. Shtativ probirkani tik ushlab turadi.'},
  silindr:{nom:'O‘lchov silindri', izoh:'100 ml', idish:true, sigim:6, tavsif:'Suyuqlik hajmini o‘lchash uchun darajalangan silindr. Isitilmaydi!', isitilmaydi:true},
  plita:{nom:'Elektr isitgich', izoh:'isitish plitkasi', tavsif:'Ustiga idish qo‘yib isitiladi. Plitani bosib yoqing yoki o‘chiring; displey plita haroratini ko‘rsatadi.'},
  spirtovka:{nom:'Spirt lampasi', izoh:'spirtovka', alanga:true, tavsif:'Alanga rangi sinovi uchun. Lampani bosib yoqing; reaktivni tanlab yonayotgan lampani bosing — nixrom sim halqa eritmaga botirilib, alangaga tutiladi. Qoidalar: spirt lampasi gugurt bilan yoqiladi, boshqa lampadan yoqilmaydi; qalpoq bilan o‘chiriladi — puflab o‘chirilmaydi; yonib turgan lampa ko‘chirilmaydi; spirt faqat o‘chirilgan va sovigan lampaga quyiladi.'},
  chop:{nom:'Yog‘och cho‘p', izoh:'gazlarni sinash', asbob:true, tavsif:'Yonib turgan cho‘p: vodorod «paq» etib yonadi, CO₂ da o‘chadi. Cho‘g‘langan cho‘p kislorodda qayta alangalanadi. Cho‘pni tanlab, gaz ajralayotgan idishni bosing. Vodorod faqat probirkada sinaladi.'},
  qogoz:{nom:'Universal indikator qog‘ozi', izoh:'muhitni aniqlash', asbob:true, tavsif:'Eritma muhitini rangiga qarab ko‘rsatadi: qizil — kuchli kislotali, yashil — neytral, ko‘k-binafsha — kuchli ishqoriy. Qog‘ozni tanlab, idishni bosing.'}
};

/* Cho‘kma va qattiq moddalar ko‘rinishi */
const QATTIQ = {
  pCuOH2:{nom:'Cu(OH)₂', rang:'#4f9be8'}, pFeOH3:{nom:'Fe(OH)₃', rang:'#8a4a1c'}, pAgCl:{nom:'AgCl', rang:'#f4f4f2'}, pBaSO4:{nom:'BaSO₄', rang:'#fafafa'},
  pCaCO3:{nom:'CaCO₃', rang:'#f6f6f3'}, pBaCO3:{nom:'BaCO₃', rang:'#f6f6f3'}, pCu:{nom:'Cu', rang:'#b5592a', metall:true}, pAg:{nom:'Ag', rang:'#cfd3d6', metall:true},
  pMnO2:{nom:'MnO₂', rang:'#3a2a20'}, pCuO:{nom:'CuO', rang:'#060505'}, pMalaxit:{nom:'Cu₂(OH)₂CO₃', rang:'#4fae8a'}, pAg2O:{nom:'Ag₂O', rang:'#4a3325'},
  pAg2CO3:{nom:'Ag₂CO₃', rang:'#ece6b4'}, pZnOH2:{nom:'Zn(OH)₂', rang:'#f2f4f6'}, pMgOH2:{nom:'Mg(OH)₂', rang:'#f7f7f5'}, pFeOH2:{nom:'Fe(OH)₂', rang:'#8aa585'},
  pAgBr:{nom:'AgBr', rang:'#eee3ad'}, pAgI:{nom:'AgI', rang:'#f0d243'}, pCuI:{nom:'CuI', rang:'#e9e1cf'}
};
const RANGLI_ION = {Cu2:['#2a86dd',1], Fe3:['#c98a1e',1], Fe2:['#a9cfa6',.45], MnO4:['#7a1fa0',2.4], I2:['#c77a22',1.4], IKr:['#12185a',3], FeSCN:['#a0101a',3], CuNH3:['#2436c9',2.6]};

/* Alanga rangi (metall ionlari). rang — ekrandagi taxminiy rang (sRGB). */
const ALANGA = {
  Li:{nom:'Litiy', rang:'#e8203f', soz:'to‘q qizil (karmin)'},
  Na:{nom:'Natriy', rang:'#ffb01f', soz:'yorqin sariq'},
  K:{nom:'Kaliy', rang:'#b58cff', soz:'och binafsha (lila)'},
  Ca:{nom:'Kalsiy', rang:'#ff5a24', soz:'g‘isht-qizil'},
  Cu:{nom:'Mis', rang:'#30d69a', soz:'yashil (ko‘kimtir-yashil)'},
  Ba:{nom:'Bariy', rang:'#b6e05a', soz:'och yashil (sarg‘ish-yashil)'}
};

/* Reaksiya qoidalari — tartib muhim (yuqoridagisi oldin tekshiriladi).
   kerak: sarflanadigan zarrachalar (nisbat), kat: bo‘lishi shart, lekin sarflanmaydi, issiq: faqat isitilganda,
   beradi: mahsulotlar, gaz: ajraladigan gaz, tezlik: sekin|orta|shiddatli, dT: harorat o‘zgarishi (sifat), yoq:true — reaksiya ketmasligi haqidagi karta */
const REAKSIYA = [
  {id:'na_kislota', taqiq:true, kerak:{Na_s:1, H:.01}, nom:'Natriy — faqat toza suvga', kuzatish:'Bu tajriba bajarilmaydi.', izoh:'Natriy kislotalar, tuz va oksidlovchi eritmalari bilan juda shiddatli, portlash xavfi bilan reaksiyaga kirishadi. Maktab laboratoriyasida natriy faqat toza suvga, guruch donidek bo‘lakcha holida solinadi va tajribani faqat o‘qituvchi himoya ekrani ortida bajaradi.'},
  {id:'kmno4_xlorid', taqiq:true, kerak:{MnO4:.01, Cl:.01, H:.01}, nom:'Permanganat + xlorid kislota — taqiqlangan', tenglama:'2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O', kuzatish:'Bu tajriba bajarilmaydi.', izoh:'Kislotali muhitda permanganat xlorid ionlarini zaharli xlor gazigacha oksidlaydi. Shuning uchun permanganat eritmasi faqat suyultirilgan sulfat kislota bilan kislotalanadi.'},
  {id:'neytral', tur:'Neytrallanish', kerak:{H:1, OH:1}, beradi:{}, dT:6, nom:'Kislota + ishqor', tenglama:'H⁺ + OH⁻ → H₂O', kuzatish:'Ko‘zga ko‘rinadigan o‘zgarish yo‘q, idish biroz isiydi. Indikator bo‘lsa — rangi o‘zgaradi.', izoh:'Kislota va ishqor o‘zaro ta’sirlashib tuz va suv hosil qiladi. Reaksiya ekzotermik. Masalan: HCl + NaOH → NaCl + H₂O.'},
  {id:'nh3_kislota', tur:'Neytrallanish', kerak:{NH3a:1, H:1}, beradi:{NH4:1}, dT:3, nom:'Ammiak + kislota', tenglama:'NH₃ + H⁺ → NH₄⁺', kuzatish:'Ko‘zga ko‘rinadigan o‘zgarish yo‘q, ammiak hidi yo‘qoladi. Indikator bo‘lsa — rangi o‘zgaradi.', izoh:'Ammiak — asos: kislota bilan ammoniy tuzini hosil qiladi. Masalan: NH₃ + HCl → NH₄Cl.'},
  {id:'cuoh2_eriydi', tur:'Almashinish', kerak:{pCuOH2:1, H:2}, beradi:{Cu2:1}, nom:'Cu(OH)₂ cho‘kmasi kislotada eriydi', tenglama:'Cu(OH)₂ + 2H⁺ → Cu²⁺ + 2H₂O', kuzatish:'Havorang cho‘kma erib, tiniq havorang eritma hosil bo‘ladi.', izoh:'Erimaydigan asoslar kislotalar bilan reaksiyaga kirishib, tuz va suv hosil qiladi.'},
  {id:'feoh3_eriydi', tur:'Almashinish', kerak:{pFeOH3:1, H:3}, beradi:{Fe3:1}, nom:'Fe(OH)₃ cho‘kmasi kislotada eriydi', tenglama:'Fe(OH)₃ + 3H⁺ → Fe³⁺ + 3H₂O', kuzatish:'Qo‘ng‘ir cho‘kma erib, sarg‘ish eritma hosil bo‘ladi.', izoh:'Erimaydigan asos + kislota → tuz + suv.'},
  {id:'caco3p_kislota', tur:'Almashinish', kerak:{pCaCO3:1, H:2}, beradi:{Ca2:1}, gaz:'CO2', tezlik:'orta', nom:'CaCO₃ cho‘kmasi kislotada eriydi', tenglama:'CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂↑', kuzatish:'Oq cho‘kma gaz pufakchalari ajratib eriydi.', izoh:'Karbonatlar kislotalar ta’sirida parchalanib, karbonat angidrid ajratadi.'},
  {id:'baco3p_kislota', tur:'Almashinish', kerak:{pBaCO3:1, H:2}, beradi:{Ba:1}, gaz:'CO2', tezlik:'orta', nom:'BaCO₃ cho‘kmasi kislotada eriydi', tenglama:'BaCO₃ + 2H⁺ → Ba²⁺ + H₂O + CO₂↑', kuzatish:'Oq cho‘kma gaz ajratib eriydi. (BaSO₄ esa kislotada erimaydi — ikkalasini shunday farqlash mumkin.)', izoh:'Karbonat cho‘kmasi kislotada eriydi, sulfat cho‘kmasi erimaydi.'},
  {id:'karbonat_kislota', tur:'Almashinish', kerak:{CO3:1, H:2}, beradi:{}, gaz:'CO2', tezlik:'shiddatli', nom:'Karbonat + kislota', tenglama:'CO₃²⁻ + 2H⁺ → H₂O + CO₂↑', kuzatish:'Eritma «qaynab», rangsiz gaz shiddat bilan ajraladi.', izoh:'Karbonat ioniga sifat reaksiyasi: kislota ta’sirida CO₂ ajraladi. Masalan: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑.'},
  {id:'marmar_sulfat', yoq:true, kerak:{CaCO3_s:1, H:1, SO4:1}, nom:'Marmar + sulfat kislota: reaksiya tez to‘xtaydi', tenglama:'CaCO₃ + H₂SO₄ → CaSO₄↓ + H₂O + CO₂↑', kuzatish:'Bir nechta pufakcha chiqadi-yu, reaksiya to‘xtab qoladi.', izoh:'Marmar sirti kam eriydigan kalsiy sulfat (gips) qatlami bilan qoplanib, kislota marmarga yeta olmay qoladi. Shuning uchun laboratoriyada CO₂ olishda sulfat emas, xlorid kislota ishlatiladi.'},
  {id:'marmar_kislota', tur:'Almashinish', yoqsa:['SO4'], kerak:{CaCO3_s:1, H:2}, beradi:{Ca2:1}, gaz:'CO2', tezlik:'orta', nom:'Marmar + kislota', tenglama:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑', kuzatish:'Marmar bo‘lakchalari sirtida pufakchalar paydo bo‘ladi, bo‘lakchalar asta eriydi.', izoh:'Laboratoriyada karbonat angidrid olishning asosiy usuli. Yonib turgan cho‘p bilan tekshiring — CO₂ da o‘chadi.'},
  {id:'soda_kislota', tur:'Almashinish', kerak:{NaHCO3_s:1, H:1}, beradi:{}, gaz:'CO2', tezlik:'shiddatli', nom:'Ichimlik sodasi + kislota', tenglama:'NaHCO₃ + HCl → NaCl + H₂O + CO₂↑', kuzatish:'Kukun ko‘piklanib «qaynaydi», gaz shiddat bilan ajraladi.', izoh:'Gidrokarbonatlar ham kislota ta’sirida CO₂ ajratadi — xamirni ko‘tarishda shu reaksiyadan foydalaniladi.'},
  {id:'mg_kislota', tur:'O‘rin olish', kerak:{Mg_s:1, H:2}, beradi:{Mg2:1}, gaz:'H2', tezlik:'shiddatli', dT:22, nom:'Magniy + kislota', tenglama:'Mg + 2HCl → MgCl₂ + H₂↑', kuzatish:'Magniy lentasi shiddatli pufakchalar ajratib tez eriydi, idish sezilarli isiydi.', izoh:'Magniy faollik qatorida ruxdan ancha oldin — reaksiya ruxnikidan tezroq. Gazni yonib turgan cho‘p bilan tekshiring.'},
  {id:'zn_kislota', tur:'O‘rin olish', kerak:{Zn_s:1, H:2}, beradi:{Zn2:1}, gaz:'H2', tezlik:'orta', dT:7, nom:'Rux + kislota', tenglama:'Zn + 2HCl → ZnCl₂ + H₂↑', kuzatish:'Rux granulalari sirtidan rangsiz gaz pufakchalari ajraladi, granulalar asta eriydi.', izoh:'Laboratoriyada vodorod olishning asosiy usuli. Sulfat kislota bilan: Zn + H₂SO₄ → ZnSO₄ + H₂↑. Gazni yonib turgan cho‘p bilan tekshiring.'},
  {id:'fe_kislota', tur:'O‘rin olish', kerak:{Fe_s:1, H:2}, beradi:{Fe2:1}, gaz:'H2', tezlik:'sekin', dT:2, nom:'Temir + kislota', tenglama:'Fe + 2HCl → FeCl₂ + H₂↑', kuzatish:'Mix sirtida sekin-asta mayda pufakchalar paydo bo‘ladi, eritma och yashil tusga kiradi.', izoh:'Temirning faolligi ruxnikidan past (faollik qatorida ruxdan keyin turadi) — reaksiya sekin boradi. Temir(II) tuzi hosil bo‘ladi (Fe³⁺ emas).'},
  {id:'cu_kislota_yoq', yoq:true, kerak:{Cu_s:1, H:1}, nom:'Mis + kislota: reaksiya ketmaydi', tenglama:'Cu + HCl ↛', kuzatish:'Hech qanday o‘zgarish yo‘q: pufakcha ham, rang ham yo‘q.', izoh:'Mis metallarning faollik qatorida vodoroddan keyin turadi, shuning uchun xlorid va suyultirilgan sulfat kislotadan vodorodni siqib chiqara olmaydi.'},
  {id:'na_suv', tur:'O‘rin olish', kerak:{Na_s:1}, kat:['H2O'], beradi:{OH:1}, gaz:'H2', tezlik:'shiddatli', dT:28, nom:'Natriy + suv', tenglama:'2Na + 2H₂O → 2NaOH + H₂↑', kuzatish:'Natriy bo‘lakchasi suyuqlanib yaltiroq sharchaga aylanadi, suv yuzida «yugurib», vishillab gaz ajratadi va tez yo‘qoladi; ba’zan sariq alanga bilan yonadi.', izoh:'Ishqoriy metallar suv bilan shiddatli reaksiyaga kirishib ishqor va vodorod hosil qiladi. Fenolftalein tomizing — eritma pushti bo‘ladi. Haqiqiy tajriba faqat o‘qituvchi tomonidan, himoya ekrani ortida bajariladi.'},
  {id:'agcl', tur:'Almashinish', kerak:{Ag:1, Cl:1}, beradi:{pAgCl:1}, nom:'Xlorid ioniga sifat reaksiyasi', tenglama:'Ag⁺ + Cl⁻ → AgCl↓', kuzatish:'Oq suzmasimon cho‘kma tushadi. U kislotada erimaydi.', izoh:'Kumush nitrat — xlorid ionlari reaktivi. Masalan: NaCl + AgNO₃ → AgCl↓ + NaNO₃. Cho‘kma yorug‘likda asta qorayadi.'},
  {id:'agbr', tur:'Almashinish', kerak:{Ag:1, Br:1}, beradi:{pAgBr:1}, nom:'Bromid ioniga sifat reaksiyasi', tenglama:'Ag⁺ + Br⁻ → AgBr↓', kuzatish:'Och sariq (krem rang) suzmasimon cho‘kma tushadi.', izoh:'Masalan: KBr + AgNO₃ → AgBr↓ + KNO₃. AgBr fotografiyada yorug‘likka sezgir modda sifatida ishlatilgan. Suyultirilgan ammiakda juda oz eriydi — cho‘kma deyarli yo‘qolmaydi; konsentrlangan ammiakda esa eriydi.'},
  {id:'agi', tur:'Almashinish', kerak:{Ag:1, Iion:1}, beradi:{pAgI:1}, nom:'Yodid ioniga sifat reaksiyasi', tenglama:'Ag⁺ + I⁻ → AgI↓', kuzatish:'Sariq suzmasimon cho‘kma tushadi.', izoh:'Masalan: KI + AgNO₃ → AgI↓ + KNO₃. Galogenidlar rangi: AgCl — oq, AgBr — och sariq, AgI — sariq. AgI ammiakda ham erimaydi.'},
  {id:'fe3_yodid', tur:'Oksidlanish-qaytarilish', kerak:{Fe3:2, Iion:2}, beradi:{Fe2:2, I2:1}, tezlik:'orta', nom:'Temir(III) yodidni oksidlaydi', tenglama:'2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂', kuzatish:'Eritma sarg‘ish-qo‘ng‘ir rangga kiradi (erkin yod). Kraxmal qo‘shilsa ko‘karadi.', izoh:'Fe³⁺ — oksidlovchi, I⁻ — qaytaruvchi. Masalan: 2FeCl₃ + 2KI → 2FeCl₂ + I₂ + 2KCl. Ajralgan yod bug‘lari ta’sirlantiradi — tajriba oz miqdorda va shamollatilgan xonada o‘tkaziladi.'},
  {id:'cu_yodid', tur:'Oksidlanish-qaytarilish', kerak:{Cu2:2, Iion:4}, beradi:{pCuI:2, I2:1}, tezlik:'orta', nom:'Mis(II) + yodid', tenglama:'2Cu²⁺ + 4I⁻ → 2CuI↓ + I₂', kuzatish:'Qo‘ng‘ir loyqa hosil bo‘ladi: oq CuI cho‘kmasi ajralib chiqqan yod bilan bo‘yalgan.', izoh:'Mis(II) ioni yodidni yodgacha oksidlaydi, o‘zi mis(I) gacha qaytariladi. Bu reaksiya misni miqdoriy aniqlashda (yodometriya) ishlatiladi. Yod bug‘lari ta’sirlantiradi — oz miqdorda, shamollatilgan xonada.'},
  {id:'baso4', tur:'Almashinish', kerak:{Ba:1, SO4:1}, beradi:{pBaSO4:1}, nom:'Sulfat ioniga sifat reaksiyasi', tenglama:'Ba²⁺ + SO₄²⁻ → BaSO₄↓', kuzatish:'Oq mayda kristall cho‘kma tushadi. U kislotalarda erimaydi.', izoh:'Bariy xlorid — sulfat ionlari reaktivi. Masalan: H₂SO₄ + BaCl₂ → BaSO₄↓ + 2HCl.'},
  {id:'co2_ohak', tur:'Kislotali oksid + ishqor', kerak:{gCO2:1, Ca2:1, OH:2}, beradi:{pCaCO3:1}, nom:'CO₂ + ohakli suv', tenglama:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', kuzatish:'Tiniq ohakli suv loyqalanadi — oq cho‘kma hosil bo‘ladi.', izoh:'Karbonat angidridga sifat reaksiyasi. Nafas bilan chiqarilgan havo ham ohakli suvni loyqalantiradi.'},
  {id:'co2_ishqor', tur:'Kislotali oksid + ishqor', kerak:{gCO2:1, OH:2}, beradi:{CO3:1}, nom:'CO₂ + ishqor', tenglama:'2NaOH + CO₂ → Na₂CO₃ + H₂O', kuzatish:'Ko‘rinadigan o‘zgarish yo‘q: gaz eritmaga yutiladi.', izoh:'Kislotali oksid ishqor bilan tuz va suv hosil qiladi. Shuning uchun ishqor eritmalari ochiq idishda saqlanmaydi.'},
  {id:'co2_ortiqcha', tur:'Birikish', kerak:{gCO2:1, pCaCO3:1}, beradi:{Ca2:1}, nom:'Ortiqcha CO₂: loyqa tiniqlashadi', tenglama:'CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂', kuzatish:'CO₂ yuborish davom ettirilsa, loyqa asta tiniqlashadi.', izoh:'Erimaydigan karbonat eriydigan gidrokarbonatga aylanadi. Tabiatda g‘orlar va stalaktitlar shu jarayon bilan bog‘liq.'},
  {id:'caco3', tur:'Almashinish', kerak:{Ca2:1, CO3:1}, beradi:{pCaCO3:1}, nom:'Kalsiy karbonat cho‘kmasi', tenglama:'Ca²⁺ + CO₃²⁻ → CaCO₃↓', kuzatish:'Oq cho‘kma tushadi.', izoh:'Masalan: Ca(OH)₂ + Na₂CO₃ → CaCO₃↓ + 2NaOH.'},
  {id:'baco3', tur:'Almashinish', kerak:{Ba:1, CO3:1}, beradi:{pBaCO3:1}, nom:'Bariy karbonat cho‘kmasi', tenglama:'Ba²⁺ + CO₃²⁻ → BaCO₃↓', kuzatish:'Oq cho‘kma tushadi. BaSO₄ dan farqi — kislotada eriydi.', izoh:'BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl.'},
  {id:'feoh3_karbonat', tur:'Gidroliz', kerak:{Fe3:2, CO3:3}, beradi:{pFeOH3:2}, gaz:'CO2', tezlik:'orta', nom:'Temir(III) tuzi + karbonat', tenglama:'2FeCl₃ + 3Na₂CO₃ + 3H₂O → 2Fe(OH)₃↓ + 3CO₂↑ + 6NaCl', kuzatish:'Qo‘ng‘ir cho‘kma tushadi va gaz ajraladi.', izoh:'Temir(III) karbonat suvda mavjud bo‘la olmaydi — to‘liq gidrolizlanadi, shuning uchun karbonat emas, gidroksid cho‘kadi.'},
  {id:'malaxit', tur:'Almashinish + gidroliz', kerak:{Cu2:2, CO3:2}, beradi:{pMalaxit:1}, gaz:'CO2', tezlik:'sekin', nom:'Mis(II) tuzi + karbonat', tenglama:'2CuSO₄ + 2Na₂CO₃ + H₂O → Cu₂(OH)₂CO₃↓ + 2Na₂SO₄ + CO₂↑', kuzatish:'Yashil-havorang cho‘kma tushadi, ozroq gaz ajraladi.', izoh:'Asosli mis karbonat — tabiatdagi malaxit minerali tarkibi bilan bir xil.'},
  {id:'ag2co3', tur:'Almashinish', kerak:{Ag:2, CO3:1}, beradi:{pAg2CO3:1}, nom:'Kumush karbonat cho‘kmasi', tenglama:'2Ag⁺ + CO₃²⁻ → Ag₂CO₃↓', kuzatish:'Och sarg‘ish cho‘kma tushadi.', izoh:'2AgNO₃ + Na₂CO₃ → Ag₂CO₃↓ + 2NaNO₃.'},
  {id:'cuoh2', tur:'Almashinish', kerak:{Cu2:1, OH:2}, beradi:{pCuOH2:1}, nom:'Mis(II) gidroksid cho‘kmasi', tenglama:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄', kuzatish:'Havorang iviq cho‘kma tushadi.', izoh:'Erimaydigan asoslar tuz eritmasiga ishqor ta’sir ettirib olinadi. Cho‘kmani isitib ko‘ring — qorayadi.'},
  {id:'feoh3', tur:'Almashinish', kerak:{Fe3:1, OH:3}, beradi:{pFeOH3:1}, nom:'Temir(III) gidroksid cho‘kmasi', tenglama:'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl', kuzatish:'Qo‘ng‘ir (zang rangli) cho‘kma tushadi.', izoh:'Fe³⁺ ioniga sifat reaksiyasi.'},
  {id:'feoh2', tur:'Almashinish', kerak:{Fe2:1, OH:2}, beradi:{pFeOH2:1}, nom:'Temir(II) gidroksid cho‘kmasi', tenglama:'Fe²⁺ + 2OH⁻ → Fe(OH)₂↓', kuzatish:'Kulrang-yashil cho‘kma tushadi; havoda asta qo‘ng‘ir tusga kiradi.', izoh:'Fe(OH)₂ havo kislorodi ta’sirida Fe(OH)₃ ga oksidlanadi: 4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃.'},
  {id:'znoh2', tur:'Almashinish', kerak:{Zn2:1, OH:2}, beradi:{pZnOH2:1}, nom:'Rux gidroksid cho‘kmasi', tenglama:'Zn²⁺ + 2OH⁻ → Zn(OH)₂↓', kuzatish:'Oq iviq cho‘kma tushadi.', izoh:'Zn(OH)₂ — amfoter gidroksid: ortiqcha ishqorda ham, kislotada ham eriydi (ortiqcha ishqorda erishi bu modelda ko‘rsatilmagan).'},
  {id:'mgoh2', tur:'Almashinish', kerak:{Mg2:1, OH:2}, beradi:{pMgOH2:1}, nom:'Magniy gidroksid cho‘kmasi', tenglama:'Mg²⁺ + 2OH⁻ → Mg(OH)₂↓', kuzatish:'Oq cho‘kma tushadi.', izoh:'Magniy gidroksid — suvda kam eriydigan asos.'},
  {id:'ag2o', tur:'Almashinish', kerak:{Ag:2, OH:2}, beradi:{pAg2O:1}, nom:'Kumush nitrat + ishqor', tenglama:'2AgNO₃ + 2NaOH → Ag₂O↓ + 2NaNO₃ + H₂O', kuzatish:'To‘q jigarrang cho‘kma tushadi.', izoh:'Kumush gidroksid beqaror — hosil bo‘lishi bilan kumush(I) oksid va suvga parchalanadi.'},
  {id:'cu_ammiak', tur:'Kompleks hosil bo‘lishi', kerak:{pCuOH2:1, NH3a:4}, yoqsa:['Cu2'], beradi:{CuNH3:1, OH:2}, nom:'Mis(II) ammiakati', tenglama:'Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻', kuzatish:'Ortiqcha ammiakli suvda havorang cho‘kma eriydi, eritma to‘q ko‘k (ko‘k-binafsha) rangga kiradi.', izoh:'Avval ammiak ishqor kabi Cu(OH)₂ cho‘kmasini beradi, ortig‘i esa uni tetraamminmis(II) kompleks ioniga aylantiradi. Mis(II) ioniga sezgir sifat reaksiyasi.'},
  {id:'ag_ammiak', tur:'Kompleks hosil bo‘lishi', kerak:{pAg2O:1, NH3a:4}, yoqsa:['Ag'], beradi:{AgNH3:2, OH:2}, nom:'Kumush ammiakati', tenglama:'Ag₂O + 4NH₃ + H₂O → 2[Ag(NH₃)₂]⁺ + 2OH⁻', kuzatish:'Ortiqcha ammiakli suvda jigarrang cho‘kma erib, tiniq rangsiz eritma hosil bo‘ladi.', izoh:'Diamminkumush ioni hosil bo‘ladi. Bu eritma «kumush ko‘zgu» reaksiyasida (aldegidlarni aniqlash) ishlatiladi. Uni saqlab qo‘yib bo‘lmaydi — tez orada tayyorlanib, ishlatiladi.'},
  {id:'agcl_ammiak', tur:'Kompleks hosil bo‘lishi', kerak:{pAgCl:1, NH3a:2}, yoqsa:['Ag'], beradi:{AgNH3:1, Cl:1}, nom:'AgCl ammiakda eriydi', tenglama:'AgCl + 2NH₃ → [Ag(NH₃)₂]⁺ + Cl⁻', kuzatish:'Oq cho‘kma ammiakli suvda eriydi — eritma tiniqlashadi.', izoh:'Xloridni bromid va yodiddan farqlash usuli: AgCl suyultirilgan ammiakda eriydi, AgBr juda oz eriydi (cho‘kma qoladi), AgI esa umuman erimaydi.'},
  {id:'agbr_ammiak_yoq', yoq:true, tur:'Kuzatuv', kerak:{pAgBr:1, NH3a:1}, nom:'AgBr ammiakda erimadi', kuzatish:'Och sariq cho‘kma suyultirilgan ammiakli suvda deyarli erimaydi — juda oz qismi eriydi.', izoh:'AgBr suyultirilgan ammiakda juda oz eriydi (cho‘kma ko‘rinishida qoladi), konsentrlangan ammiakda esa eriydi. AgCl esa suyultirilganida ham eriydi.'},
  {id:'agi_ammiak_yoq', yoq:true, tur:'Kuzatuv', kerak:{pAgI:1, NH3a:1}, nom:'AgI ammiakda erimaydi', kuzatish:'Sariq cho‘kma ammiakli suvda erimaydi.', izoh:'AgI — kumush galogenidlarining eng kam eriydigani; konsentrlangan ammiakda ham erimaydi.'},
  {id:'fe_cu', tur:'O‘rin olish', kerak:{Fe_s:1, Cu2:1}, beradi:{Fe2:1, pCu:1}, tezlik:'sekin', nom:'Temir misni siqib chiqaradi', tenglama:'Fe + CuSO₄ → FeSO₄ + Cu↓', kuzatish:'Mix sirti qizg‘ish mis qatlami bilan qoplanadi, eritmaning havorang tusi asta och yashilga o‘tadi.', izoh:'Faolroq metall kamroq faol metallni uning tuzi eritmasidan siqib chiqaradi.'},
  {id:'zn_cu', tur:'O‘rin olish', kerak:{Zn_s:1, Cu2:1}, beradi:{Zn2:1, pCu:1}, tezlik:'sekin', dT:4, nom:'Rux misni siqib chiqaradi', tenglama:'Zn + CuSO₄ → ZnSO₄ + Cu↓', kuzatish:'Rux sirti qizg‘ish-qo‘ng‘ir g‘ovak mis bilan qoplanadi, eritma rangsizlanadi.', izoh:'Rux faollik qatorida misdan oldin turadi.'},
  {id:'mg_cu', tur:'O‘rin olish', kerak:{Mg_s:1, Cu2:1}, beradi:{Mg2:1, pCu:1}, tezlik:'orta', dT:8, nom:'Magniy misni siqib chiqaradi', tenglama:'Mg + CuSO₄ → MgSO₄ + Cu↓', kuzatish:'Magniy sirtida qizg‘ish mis ajraladi, eritma rangsizlanadi; biroz pufakcha ham ko‘rinishi mumkin.', izoh:'Pufakchalar — mis(II) sulfat eritmasi gidroliz tufayli kuchsiz kislotali bo‘lgani uchun ajraladigan vodorod.'},
  {id:'cu_ag', tur:'O‘rin olish', kerak:{Cu_s:1, Ag:2}, beradi:{Cu2:1, pAg:2}, tezlik:'sekin', nom:'Mis kumushni siqib chiqaradi', tenglama:'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓', kuzatish:'Mis sim kumushrang ignasimon kristallar bilan qoplanadi («kumush daraxti»), eritma asta havorang tusga kiradi.', izoh:'Mis kumushdan faolroq. Eritmaning havorang bo‘lishi — Cu²⁺ ionlari hosil bo‘lganidan.'},
  {id:'zn_ag', tur:'O‘rin olish', kerak:{Zn_s:1, Ag:2}, beradi:{Zn2:1, pAg:2}, tezlik:'sekin', nom:'Rux kumushni siqib chiqaradi', tenglama:'Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag↓', kuzatish:'Rux sirti kulrang-kumushrang qatlam bilan qoplanadi.', izoh:'Rux faollik qatorida kumushdan ancha oldin turadi.'},
  {id:'fe_ag', tur:'O‘rin olish', kerak:{Fe_s:1, Ag:2}, beradi:{Fe2:1, pAg:2}, tezlik:'sekin', nom:'Temir kumushni siqib chiqaradi', tenglama:'Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag↓', kuzatish:'Mix sirti kumushrang qatlam bilan qoplanadi.', izoh:'Temir kumushdan faolroq metall. Ortiqcha kumush nitratda Fe²⁺ qisman Fe³⁺ gacha oksidlanadi.'},
  {id:'kmno4_h2o2_kislota', tur:'Oksidlanish-qaytarilish', kerak:{MnO4:1, H2O2:2.5, H:3}, beradi:{Mn2:1}, gaz:'O2', tezlik:'shiddatli', nom:'Permanganat + peroksid (kislotali muhit)', tenglama:'2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → 2MnSO₄ + K₂SO₄ + 5O₂↑ + 8H₂O', kuzatish:'Binafsha eritma juda tez rangsizlanadi, gaz shiddat bilan ajraladi.', izoh:'Kislotali muhitda MnO₄⁻ deyarli rangsiz Mn²⁺ gacha qaytariladi; vodorod peroksid bu yerda qaytaruvchi. Muhit faqat suyultirilgan sulfat kislota bilan kislotalanadi. Gazni cho‘g‘langan cho‘p bilan tekshiring.'},
  {id:'kmno4_h2o2', tur:'Oksidlanish-qaytarilish', kerak:{MnO4:1, H2O2:1.5}, beradi:{pMnO2:1, OH:1}, gaz:'O2', tezlik:'shiddatli', nom:'Permanganat + peroksid (neytral muhit)', tenglama:'2KMnO₄ + 3H₂O₂ → 2MnO₂↓ + 2KOH + 3O₂↑ + 2H₂O', kuzatish:'Binafsha rang yo‘qoladi, jigarrang cho‘kma tushadi, gaz ajraladi.', izoh:'Neytral muhitda permanganat faqat MnO₂ gacha qaytariladi — mahsulot muhitga bog‘liq.'},
  {id:'ki_h2o2', tur:'Oksidlanish-qaytarilish', kerak:{Iion:2, H2O2:1, H:2}, beradi:{I2:1}, tezlik:'sekin', nom:'Vodorod peroksid yodidni oksidlaydi', tenglama:'2I⁻ + H₂O₂ + 2H⁺ → I₂ + 2H₂O', kuzatish:'Rangsiz eritma asta sarg‘ish, so‘ng qo‘ng‘ir tusga kiradi — erkin yod ajraladi.', izoh:'Kislotali muhitda H₂O₂ oksidlovchi. Masalan: 2KI + H₂O₂ + H₂SO₄ → I₂ + K₂SO₄ + 2H₂O. Kraxmal qo‘shilsa — to‘q ko‘k rang. Reaksiya tezligi kislotalik va konsentratsiyaga bog‘liq. Erkin yod bug‘lari ta’sirlantiradi: oz miqdorda, shamollatilgan xonada yoki mo‘rili shkafda bajariladi.'},
  {id:'h2o2_mno2', tur:'Parchalanish (kataliz)', kerak:{H2O2:2.5}, kat:['MnO2_s'], beradi:{}, gaz:'O2', tezlik:'shiddatli', dT:9, nom:'Vodorod peroksidning katalitik parchalanishi', tenglama:'2H₂O₂ → 2H₂O + O₂↑  (katalizator MnO₂)', kuzatish:'Qora kukun solinishi bilan eritma shiddatli ko‘piklanadi; kukun esa sarflanmaydi.', izoh:'Katalizator reaksiyani tezlashtiradi, lekin o‘zi sarflanmaydi. Cho‘g‘langan cho‘pni yaqinlashtiring — kislorodda qayta alangalanadi.'},
  {id:'h2o2_pmno2', tur:'Parchalanish (kataliz)', kerak:{H2O2:2.5}, kat:['pMnO2'], beradi:{}, gaz:'O2', tezlik:'shiddatli', dT:9, nom:'Vodorod peroksidning katalitik parchalanishi', tenglama:'2H₂O₂ → 2H₂O + O₂↑  (katalizator MnO₂)', kuzatish:'Hosil bo‘lgan MnO₂ cho‘kmasi ortiqcha peroksidni parchalaydi — ko‘piklanish davom etadi.', izoh:'Reaksiya mahsuloti (MnO₂) o‘zi katalizator vazifasini bajaradi.'},
  {id:'cuoh2_isitish', tur:'Parchalanish', issiq:true, kerak:{pCuOH2:1}, beradi:{pCuO:1}, nom:'Cu(OH)₂ isitilganda parchalanadi', tenglama:'Cu(OH)₂ → CuO + H₂O  (t°)', kuzatish:'Havorang cho‘kma isitilganda qorayadi.', izoh:'Erimaydigan asoslar qizdirilganda oksid va suvga parchalanadi. Qora modda — mis(II) oksid.'},
  {id:'cuo_kislota', tur:'Almashinish', issiq:true, kerak:{CuO_s:1, H:2}, beradi:{Cu2:1}, nom:'Mis(II) oksid + kislota', tenglama:'CuO + H₂SO₄ → CuSO₄ + H₂O  (t°)', kuzatish:'Qora kukun isitilganda eriydi, eritma havorang tusga kiradi.', izoh:'Asosli oksid + kislota → tuz + suv. Sovuqda reaksiya juda sekin — isitish kerak.'},
  {id:'pcuo_kislota', tur:'Almashinish', issiq:true, kerak:{pCuO:1, H:2}, beradi:{Cu2:1}, nom:'Mis(II) oksid + kislota', tenglama:'CuO + 2H⁺ → Cu²⁺ + H₂O  (t°)', kuzatish:'Qora cho‘kma isitilganda eriydi, eritma havorang bo‘ladi.', izoh:'Asosli oksid + kislota → tuz + suv.'},
  {id:'fe_scn', tur:'Sifat reaksiyasi', kerak:{Fe3:1, SCN:1}, beradi:{FeSCN:1}, nom:'Temir(III) ioniga sifat reaksiyasi', tenglama:'Fe³⁺ + SCN⁻ ⇄ [Fe(SCN)]²⁺', kuzatish:'Sariq eritma bir zumda qon-qizil rangga kiradi.', izoh:'Juda sezgir reaksiya — Fe³⁺ ning izlari ham aniqlanadi. Umumiy yozilishi: FeCl₃ + 3KSCN ⇄ Fe(SCN)₃ + 3KCl. Toza temir(II) ionlari bu rangni bermaydi (havoda qisman oksidlangan eritma och pushti tus berishi mumkin).'},
  {id:'fescn_ishqor', tur:'Almashinish', kerak:{FeSCN:1, OH:3}, beradi:{pFeOH3:1, SCN:1}, nom:'Ishqor qon-qizil rangni yo‘qotadi', tenglama:'[Fe(SCN)]²⁺ + 3OH⁻ → Fe(OH)₃↓ + SCN⁻', kuzatish:'Qizil rang yo‘qoladi, qo‘ng‘ir cho‘kma tushadi.', izoh:'Fe(OH)₃ juda kam eriydi, shuning uchun ishqor temir(III) ionlarini kompleksdan tortib olib, cho‘kmaga o‘tkazadi.'},
  {id:'yod_kraxmal', tur:'Sifat reaksiyasi', sovuq:true, kerak:{I2:1, krax:1}, beradi:{IKr:1}, nom:'Kraxmalga sifat reaksiyasi', tenglama:'kraxmal + I₂ (KI eritmasida — I₃⁻) → to‘q ko‘k birikma', kuzatish:'Eritma to‘q ko‘k, deyarli qora rangga kiradi.', izoh:'Yod (kaliy yodid eritmasida I₃⁻ ionlari holida) kraxmal tarkibidagi amiloza spirali ichiga joylashib, to‘q ko‘k rang beradi. Bu usul bilan kraxmal ham, yod ham aniqlanadi: kartoshka yoki non kesimiga yod tomizilsa ham ko‘karadi.'},
  {id:'yod_kraxmal_issiq', tur:'Fizik o‘zgarish', issiq:true, kerak:{IKr:1}, beradi:{I2:1, krax:1}, nom:'Isitilganda ko‘k rang yo‘qoladi', tenglama:'yod-kraxmal birikmasi ⇄ kraxmal + I₂  (t°)', kuzatish:'Qizdirilganda to‘q ko‘k rang yo‘qolib, eritma och sarg‘ish bo‘ladi. Sovitilganda ko‘k rang qaytadi.', izoh:'Qizdirilganda amiloza spirali yoyiladi va yod undan chiqadi. Sovuganda birikma qayta hosil bo‘ladi — jarayon qaytar.'},
  {id:'nh4_ishqor', tur:'Almashinish', issiq:true, kerak:{NH4_s:1, OH:1}, beradi:{}, gaz:'NH3', tezlik:'orta', nom:'Ammoniy tuzi + ishqor (isitilganda)', tenglama:'NH₄Cl + NaOH → NaCl + NH₃↑ + H₂O  (t°)', kuzatish:'Isitilganda o‘tkir hidli rangsiz gaz ajraladi. Idish og‘ziga tutilgan ho‘l indikator qog‘ozi ko‘karadi.', izoh:'Ammoniy ioniga sifat reaksiyasi va ammiak olish usuli (maktab laboratoriyasida ko‘pincha NH₄Cl va Ca(OH)₂ aralashmasi qizdiriladi). Ammiak hidi idishga engashib emas, qo‘l bilan yelpib hidlanadi. Tajriba oz miqdorda (probirkada) yoki mo‘rili shkafda, yaxshi shamollatiladigan xonada o‘tkaziladi — ko‘p miqdordagi ammiak nafas yo‘llarini kuydiradi.'},
  {id:'nh4_sovuq', yoq:true, sovuq:true, kerak:{NH4_s:1, OH:.5}, nom:'Ammoniy tuzi + ishqor: sovuqda sezilarsiz', tenglama:'NH₄⁺ + OH⁻ → NH₃↑ + H₂O  (sovuqda sekin)', kuzatish:'Ko‘zga ko‘rinadigan o‘zgarish deyarli yo‘q, kuchsiz ammiak hidi sezilishi mumkin.', izoh:'Ammiakni ajratib olish uchun aralashma isitiladi: idishni elektr isitgich ustiga qo‘yib, plitani yoqing.'},
  {id:'alanga_Li', alanga:'Li', tur:'Alanga rangi', nom:'Litiy ionlari: to‘q qizil alanga', tenglama:'Li⁺ → alanga to‘q qizil (karmin)', kuzatish:'Sim halqa alangaga tutilishi bilan alanga to‘q qizil rangga kiradi.', izoh:'Qizdirilganda atomdagi elektronlar yuqori energiya darajasiga o‘tadi, qaytishda har bir element o‘ziga xos rangdagi yorug‘lik chiqaradi. Mushakbozlik ranglari shunga asoslangan.'},
  {id:'alanga_Na', alanga:'Na', tur:'Alanga rangi', nom:'Natriy ionlari: sariq alanga', tenglama:'Na⁺ → alanga yorqin sariq (λ ≈ 589 nm)', kuzatish:'Alanga yorqin sariq rangga kiradi va uzoq saqlanadi.', izoh:'Natriy juda sezgir: uning izlari ham alangani sariq qiladi va boshqa ranglarni to‘sib qo‘yadi. Shuning uchun sim halqa har sinovdan oldin xlorid kislotada yuvilib, alangada qizdiriladi. Ba’zi ko‘cha chiroqlarining sarg‘ish-to‘q sariq nuri ham natriy bug‘idan (natriy lampalari).'},
  {id:'alanga_K', alanga:'K', tur:'Alanga rangi', nom:'Kaliy ionlari: och binafsha alanga', tenglama:'K⁺ → alanga och binafsha (lila)', kuzatish:'Alanga och binafsha tusga kiradi. Rang kuchsiz — natriy aralashmasi bo‘lsa, sariq rang uni yopib qo‘yadi.', izoh:'Kaliy rangini aniq ko‘rish uchun alangaga ko‘k kobalt shishasi orqali qaraladi: shisha natriyning sariq nurini yutadi.'},
  {id:'alanga_Ca', alanga:'Ca', tur:'Alanga rangi', nom:'Kalsiy ionlari: g‘isht-qizil alanga', tenglama:'Ca²⁺ → alanga g‘isht-qizil', kuzatish:'Alanga g‘isht-qizil (to‘q sariq-qizil) rangga kiradi.', izoh:'Kalsiy rangi litiynikiga qaraganda sarg‘ishroq — ularni shu farq bilan ajratish mumkin. Kalsiy alangasida rangni asosan alangada hosil bo‘ladigan CaCl va CaOH molekulalari chiqaradi.'},
  {id:'alanga_Cu', alanga:'Cu', tur:'Alanga rangi', nom:'Mis ionlari: yashil alanga', tenglama:'Cu²⁺ → alanga yashil (ko‘kimtir-yashil)', kuzatish:'Alanga yashil, chetlari ko‘kimtir rangga kiradi.', izoh:'Mis birikmalari alangani yashilga bo‘yaydi; mis xloridda rang ko‘kimtirroq bo‘ladi.'},
  {id:'alanga_Ba', alanga:'Ba', tur:'Alanga rangi', nom:'Bariy ionlari: och yashil alanga', tenglama:'Ba²⁺ → alanga och yashil (sarg‘ish-yashil)', kuzatish:'Alanga och, sarg‘ish-yashil tusga kiradi.', izoh:'Bariy tuzlari zaharli — sinovdan so‘ng qo‘l yuviladi. Rangni asosan alangada hosil bo‘ladigan BaCl va BaOH molekulalari chiqaradi. Mushakbozlikdagi yashil rang bariy birikmalaridan olinadi.'},
  {id:'cuo_sovuq', yoq:true, sovuq:true, kerak:{CuO_s:1, H:1}, nom:'Mis(II) oksid sovuq kislotada', tenglama:'CuO + H₂SO₄ → (sovuqda juda sekin)', kuzatish:'Sezilarli o‘zgarish yo‘q — qora kukun idish tubida turibdi.', izoh:'Reaksiya ketishi uchun aralashmani isitish kerak: idishni elektr isitgichga qo‘yib, plitani yoqing.'}
];

/* Gaz sinovlari (yog‘och cho‘p bilan) */
const GAZ = {
  H2:{nom:'Vodorod', f:'H₂', sinov:'Yonib turgan cho‘p yaqinlashtirilganda gaz xarakterli «paq» etgan tovush bilan yonadi.', tenglama:'2H₂ + O₂ → 2H₂O', xulosa:'Bu — vodorod. Haqiqiy laboratoriyada vodorod faqat probirka miqyosida sinaladi: havo bilan aralashmasi portlovchi, katta idishga alanga tutilmaydi.'},
  O2:{nom:'Kislorod', f:'O₂', sinov:'Cho‘g‘langan cho‘p idish og‘ziga tutilganda qayta alangalanadi.', tenglama:'C + O₂ → CO₂', xulosa:'Bu — kislorod: u yonishni kuchaytiradi.'},
  CO2:{nom:'Karbonat angidrid', f:'CO₂', sinov:'Yonib turgan cho‘p idishga tushirilganda o‘chadi.', tenglama:'', xulosa:'Bu — karbonat angidrid: u yonishga yordam bermaydi. Aniq isboti — ohakli suvning loyqalanishi.'}
};

/* Tajriba topshiriqlari. Qadam sharti: hodisa obyektini tekshiradi.
   Hodisalar: {tur:'quyish', reaktiv}, {tur:'reaksiya', id}, {tur:'sinov', gaz}, {tur:'indikator', ind, rang}, {tur:'muhit', muhit}, {tur:'isitish'} */
const TOPSHIRIQ = [
  {id:'vodorod', nom:'Vodorod olish va uni aniqlash', sinf:'7–8-sinf', kerak:['probirka','hcl','rux','chop'],
    qadamlar:[
      {matn:'Javondan <b>probirka</b>, <b>xlorid kislota</b>, <b>rux</b> va <b>yog‘och cho‘p</b>ni patnisga oling; probirkani stolga qo‘ying.', shart:"ev.tur==='joylash' && ev.idish"},
      {matn:'Probirkaga <b>xlorid kislota</b> quying, so‘ng <b>rux</b> granulasini soling.', shart:"ev.tur==='reaksiya' && ev.id==='zn_kislota'"},
      {matn:'<b>Cho‘p</b>ni tanlab, gaz ajralayotgan probirkani bosing — alanga probirka og‘ziga tutiladi.', shart:"ev.tur==='sinov' && ev.gaz==='H2'"}
    ], xulosa:'Rux kislotadan vodorodni siqib chiqardi: Zn + 2HCl → ZnCl₂ + H₂↑. Vodorod «paq» etib yonishi bilan aniqlanadi. Bu sinov faqat probirka miqyosida o‘tkaziladi.'},
  {id:'neytrallanish', nom:'Neytrallanish reaksiyasi', sinf:'8-sinf', kerak:['stakan','naoh','fenolftalein','hcl'],
    qadamlar:[
      {matn:'Stakanga <b>natriy gidroksid</b> eritmasidan quying va <b>fenolftalein</b> tomizing.', shart:"ev.tur==='indikator' && ev.ind==='ff' && ev.rang==='pushti'"},
      {matn:'Eritma rangsizlanguncha oz-ozdan <b>xlorid kislota</b> qo‘shing.', shart:"ev.tur==='indikator' && ev.ind==='ff' && ev.rang==='rangsiz'"}
    ], xulosa:'Ishqor to‘liq neytrallanganda fenolftalein rangsizlanadi: NaOH + HCl → NaCl + H₂O.'},
  {id:'chokma', nom:'Erimaydigan asos olish va uni parchalash', sinf:'8-sinf', kerak:['stakan','cuso4','naoh','plita'],
    qadamlar:[
      {matn:'Stakanga <b>mis(II) sulfat</b> eritmasini, so‘ng <b>natriy gidroksid</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='cuoh2'"},
      {matn:'Stakanni <b>elektr isitgich</b> ustiga qo‘ying, haroratni <b>100 °C</b> ga qo‘yib yoqing — isitilganda cho‘kma qorayadi (ilovada eritma ≥ 70 °C bo‘lganda).', shart:"ev.tur==='reaksiya' && ev.id==='cuoh2_isitish'"}
    ], xulosa:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄; isitilganda Cu(OH)₂ → CuO + H₂O — havorang cho‘kma qoraydi.'},
  {id:'ionlar', nom:'Xlorid va sulfat ionlarini aniqlash', sinf:'8–9-sinf', kerak:['probirka','nacl','agno3','h2so4','bacl2'],
    qadamlar:[
      {matn:'Birinchi idishga <b>natriy xlorid</b> eritmasi, so‘ng <b>kumush nitrat</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='agcl'"},
      {matn:'Ikkinchi (toza) idishga <b>sulfat kislota</b>, so‘ng <b>bariy xlorid</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='baso4'"}
    ], xulosa:'Ag⁺ + Cl⁻ → AgCl↓ (oq suzmasimon); Ba²⁺ + SO₄²⁻ → BaSO₄↓ (oq kristall). Ikkala cho‘kma ham kislotada erimaydi.'},
  {id:'co2', nom:'Karbonat angidrid olish va uni aniqlash', sinf:'7–8-sinf', kerak:['kolba','marmar','hcl','chop','stakan','ohaksuv','co2'],
    qadamlar:[
      {matn:'Kolbaga <b>marmar</b> bo‘lakchalari soling va <b>xlorid kislota</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='marmar_kislota'"},
      {matn:'<b>Cho‘p</b> bilan gazni tekshiring.', shart:"ev.tur==='sinov' && ev.gaz==='CO2'"},
      {matn:'Boshqa idishga <b>ohakli suv</b> quyib, unga ballondan <b>CO₂</b> yuboring.', shart:"ev.tur==='reaksiya' && ev.id==='co2_ohak'"}
    ], xulosa:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. CO₂ yonishga yordam bermaydi va ohakli suvni loyqalantiradi.'},
  {id:'faollik', nom:'Metallarning faollik qatori', sinf:'8–9-sinf', kerak:['stakan','cuso4','temir','hcl','mis'],
    qadamlar:[
      {matn:'Stakanga <b>mis(II) sulfat</b> eritmasini quyib, unga <b>temir mix</b> soling.', shart:"ev.tur==='reaksiya' && ev.id==='fe_cu'"},
      {matn:'Boshqa (toza) idishga <b>xlorid kislota</b> quyib, <b>mis sim</b> soling — nima bo‘ladi?', shart:"ev.tur==='reaksiya' && ev.id==='cu_kislota_yoq'"}
    ], xulosa:'Temir misdan faolroq — uni tuzidan siqib chiqaradi. Mis esa vodoroddan keyin turadi — kislota bilan reaksiyaga kirishmaydi.'},
  {id:'katalizator', nom:'Katalizator: kislorod olish', sinf:'7–8-sinf', kerak:['kolba','h2o2','mno2','chop'],
    qadamlar:[
      {matn:'Kolbaga <b>vodorod peroksid</b> quying va kuzating: o‘zgarish bormi?', shart:"ev.tur==='quyish' && ev.reaktiv==='h2o2'"},
      {matn:'Endi bir chimdim <b>marganes(IV) oksid</b> soling.', shart:"ev.tur==='reaksiya' && ev.id==='h2o2_mno2'"},
      {matn:'<b>Cho‘p</b> bilan gazni tekshiring.', shart:"ev.tur==='sinov' && ev.gaz==='O2'"}
    ], xulosa:'2H₂O₂ → 2H₂O + O₂↑. MnO₂ reaksiyani tezlashtirdi, o‘zi esa sarflanmadi — u katalizator.'},
  {id:'natriy', nom:'Natriyning suv bilan reaksiyasi', sinf:'9-sinf · faqat o‘qituvchi namoyishi', kerak:['stakan','suv','fenolftalein','natriy'],
    qadamlar:[
      {matn:'Stakanga <b>distillangan suv</b> quying va <b>fenolftalein</b> tomizing.', shart:"ev.tur==='quyish' && ev.reaktiv==='fenolftalein'"},
      {matn:'Suvga <b>natriy</b> bo‘lakchasini soling.', shart:"ev.tur==='reaksiya' && ev.id==='na_suv'"}
    ], xulosa:'2Na + 2H₂O → 2NaOH + H₂↑. Hosil bo‘lgan ishqor fenolftaleinni pushti rangga bo‘yaydi.'},
  {id:'alanga', nom:'Alanga rangi bo‘yicha metall ionlarini aniqlash', sinf:'9-sinf', kerak:['spirtovka','nacl','kcl','cuso4'],
    qadamlar:[
      {matn:'<b>Spirt lampasi</b>ni stolga qo‘ying va uni bosib yoqing.', shart:"ev.tur==='alanga_yoq'"},
      {matn:'<b>Natriy xlorid</b>ni tanlab, yonayotgan lampani bosing — sim halqa alangaga tutiladi.', shart:"ev.tur==='alanga' && ev.ion==='Na'"},
      {matn:'Endi <b>kaliy xlorid</b>ni sinang. Rang natriynikidan qanday farq qiladi?', shart:"ev.tur==='alanga' && ev.ion==='K'"},
      {matn:'<b>Mis(II) sulfat</b> eritmasini sinang.', shart:"ev.tur==='alanga' && ev.ion==='Cu'"}
    ], xulosa:'Har bir metall ioni alangani o‘ziga xos rangga bo‘yaydi: Na⁺ — sariq, K⁺ — och binafsha, Cu²⁺ — yashil (Li⁺ — to‘q qizil, Ca²⁺ — g‘isht-qizil, Ba²⁺ — och yashil). Bu usul bilan moddaning tarkibidagi metallni aniqlash mumkin.'},
  {id:'ammiak', nom:'Ammiak olish va uni aniqlash', sinf:'8-sinf', kerak:['kolba','nh4cl','naoh','plita','qogoz'],
    qadamlar:[
      {matn:'Kolbaga <b>ammoniy xlorid</b> soling va <b>natriy gidroksid</b> eritmasini quying.', shart:"ev.tur==='reaksiya' && (ev.id==='nh4_sovuq' || ev.id==='nh4_ishqor')"},
      {matn:'Kolbani <b>elektr isitgich</b> ustiga qo‘yib, <b>100 °C</b> da yoqing — isitilganda ammiak ajraladi (ilovada eritma ≥ 70 °C bo‘lganda).', shart:"ev.tur==='reaksiya' && ev.id==='nh4_ishqor'"},
      {matn:'<b>Indikator qog‘ozi</b>ni tanlab, kolbani bosing — ho‘llangan qog‘oz idish og‘ziga tutiladi.', shart:"ev.tur==='sinov' && ev.gaz==='NH3'"}
    ], xulosa:'NH₄Cl + NaOH → NaCl + NH₃↑ + H₂O (t°). Ammiak ho‘l indikator qog‘ozini ko‘kartiradi — uning suvdagi eritmasi ishqoriy xossaga ega.'},
  {id:'kraxmal', nom:'Kraxmalni yod bilan aniqlash', sinf:'8-sinf (kimyo) · biologiya', kerak:['stakan','kraxmal','yod','plita'],
    qadamlar:[
      {matn:'Stakanga <b>kraxmal eritmasi</b> quying va <b>yod eritmasi</b> tomizing.', shart:"ev.tur==='reaksiya' && ev.id==='yod_kraxmal'"},
      {matn:'Stakanni <b>isitgich</b>ga qo‘yib, <b>100 °C</b> da yoqing — isitilganda rang nima bo‘ladi? (ilovada eritma ≥ 70 °C)', shart:"ev.tur==='reaksiya' && ev.id==='yod_kraxmal_issiq'"},
      {matn:'Stakanni isitgichdan oling (yoki plitani o‘chiring) va sovishini kuting (ilovada 70 °C dan past).', shart:"ev.tur==='reaksiya' && ev.id==='yod_kraxmal'"}
    ], xulosa:'Yod kraxmal bilan to‘q ko‘k birikma hosil qiladi. Qizdirilganda rang yo‘qoladi, sovuganda qaytadi — jarayon qaytar.'},
  {id:'temir_ioni', nom:'Temir(III) ionini aniqlash', sinf:'9-sinf', kerak:['probirka','fecl3','kscn','naoh'],
    qadamlar:[
      {matn:'Probirkaga <b>temir(III) xlorid</b> eritmasini quyib, <b>kaliy rodanid</b> qo‘shing.', shart:"ev.tur==='reaksiya' && ev.id==='fe_scn'"},
      {matn:'Toza idishda <b>temir(III) xlorid</b>ga <b>natriy gidroksid</b> quying — ikkinchi sifat reaksiyasi.', shart:"ev.tur==='reaksiya' && ev.id==='feoh3'"}
    ], xulosa:'Fe³⁺ ionini ikki usulda aniqlash mumkin: rodanid bilan qon-qizil rang va ishqor bilan qo‘ng‘ir Fe(OH)₃ cho‘kmasi.'},
  {id:'galogenid', nom:'Galogenid ionlarini aniqlash', sinf:'9-sinf', kerak:['probirka','nacl','kbr','ki','agno3','nh3aq'],
    qadamlar:[
      {matn:'Birinchi probirkaga <b>natriy xlorid</b>, so‘ng <b>kumush nitrat</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='agcl'"},
      {matn:'Ikkinchi probirkaga <b>kaliy bromid</b>, so‘ng <b>kumush nitrat</b> quying.', shart:"ev.tur==='reaksiya' && ev.id==='agbr'"},
      {matn:'Uchinchi probirkaga <b>kaliy yodid</b>, so‘ng <b>kumush nitrat</b> quying. Uch cho‘kma rangini solishtiring.', shart:"ev.tur==='reaksiya' && ev.id==='agi'"},
      {matn:'Oq AgCl cho‘kmali probirkaga <b>ammiakli suv</b> qo‘shing (2 marta) — cho‘kma eriydimi?', shart:"ev.tur==='reaksiya' && ev.id==='agcl_ammiak'"}
    ], xulosa:'Ag⁺ bilan: Cl⁻ — oq AgCl, Br⁻ — och sariq AgBr, I⁻ — sariq AgI. AgCl suyultirilgan ammiakda eriydi, AgBr juda oz eriydi, AgI esa umuman erimaydi.'},
  {id:'ammiakat', nom:'Mis(II) ning ammiakli kompleksi', sinf:'9-sinf', kerak:['probirka','cuso4','nh3aq'],
    qadamlar:[
      {matn:'Probirkaga <b>mis(II) sulfat</b> eritmasini quying, so‘ng <b>ammiakli suv</b>ni bir marta qo‘shing — nima tushdi?', shart:"ev.tur==='reaksiya' && ev.id==='cuoh2'"},
      {matn:'<b>Ammiakli suv</b>ni yana 2–3 marta qo‘shing va rangni kuzating.', shart:"ev.tur==='reaksiya' && ev.id==='cu_ammiak'"}
    ], xulosa:'Oz ammiak Cu(OH)₂ havorang cho‘kmasini beradi; ortig‘i uni to‘q ko‘k [Cu(NH₃)₄]²⁺ kompleks ioniga aylantiradi.'},
  {id:'yodid', nom:'Yodidning oksidlanishi va yodni aniqlash', sinf:'9-sinf', kerak:['probirka','ki','h2so4','h2o2','kraxmal'],
    qadamlar:[
      {matn:'Probirkaga <b>kaliy yodid</b> va <b>sulfat kislota</b> quying.', shart:"ev.tur==='quyish' && ev.reaktiv==='h2so4'"},
      {matn:'<b>Vodorod peroksid</b> qo‘shing — eritma rangi qanday o‘zgaradi?', shart:"ev.tur==='reaksiya' && ev.id==='ki_h2o2'"},
      {matn:'<b>Kraxmal eritmasi</b>ni qo‘shing — ajralgan yodni aniqlang.', shart:"ev.tur==='reaksiya' && ev.id==='yod_kraxmal'"}
    ], xulosa:'Kislotali muhitda H₂O₂ yodidni erkin yodgacha oksidlaydi (2I⁻ + H₂O₂ + 2H⁺ → I₂ + 2H₂O); yod kraxmal bilan to‘q ko‘k rang beradi.'}
];

window.MAKON_LAB_MALUMOT = {REAKTIV, JIHOZ, QATTIQ, RANGLI_ION, ALANGA, REAKSIYA, GAZ, TOPSHIRIQ, MANBA,
  TUR:[['suyuq','Suyuqliklar','#38bdf8'],['indikator','Indikatorlar','#e879f9'],['qattiq','Qattiq moddalar','#f59e0b'],['kukun','Kukunlar','#a3a3a3'],['gaz','Gazlar','#34d399'],['jihoz','Jihozlar','#8b7bff']]};
})();
