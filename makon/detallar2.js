/* MAKON — detal kartalari (2-to‘plam): tarix xaritasi, pianino, Oy fazalari, optika.
   detallar.js dan KEYIN yuklanadi. Qoida: faqat manbali fakt; manbalar farq qiladigan joyda izoh beriladi.
   Tuzilish: MAKON_DETAL[sahna][kalit] = {nom, sarlavha2, jadval:[[k,v]], matn, manba}. */
(function(){
const D = window.MAKON_DETAL = window.MAKON_DETAL || {};
const q = (k,o)=>{ D[k] = Object.assign(D[k]||{}, o); };

const TAR = 'O‘zbekiston tarixi darsliklari (6–11-sinf); Encyclopaedia Britannica; Wikipedia (inglizcha) tegishli maqolalar';
const UNESCO = 'YUNESKO Butunjahon merosi markazi (whc.unesco.org/en/statesparties/uz)';
const MUS = 'Wikipedia (inglizcha): «Piano key frequencies», «Solfège», «Letter notation»; ISO 16:1975 (La4 = 440 Hz); 5–7-sinf «Musiqa madaniyati» darsliklari';
const OYM = 'NASA NSSDCA «Moon Fact Sheet», «Earth Fact Sheet», «Sun Fact Sheet»; NASA Science «Moon Phases»';
const OPT = 'refractiveindex.info; E. Hecht «Optics»; Wikipedia (inglizcha): «Refractive index», «Total internal reflection», «Snell’s law»; Fizika darsligi (optika bo‘limi)';
const nota = (nom, lotin, f4, f5, izoh)=>({nom:nom+' ('+lotin+')', sarlavha2:'Oq klavish · Do-major gammasining pog‘onasi',
  jadval:[['Solfedjio nomi',nom],['Lotin harfi',lotin],[nom+'4 chastotasi',f4+' Hz'],[nom+'5 chastotasi',f5+' Hz'],['Oktava nisbati','2 : 1']],
  matn:izoh, manba:MUS});

/* ================= TARIX: DAVRLAR ================= */
q('davr',{
  '0':{nom:'Ahamoniylar davri', sarlavha2:'mil. av. 550–330 · qadimgi davr',
    jadval:[['Yillar','mil. av. 550–330'],['Markazlar','Pasargada, Suza, Persepol (hozirgi Eron hududi)'],['Hukmdorlar','Kir II (asoschi), Doro I, … Doro III'],['O‘zbekiston hududida','Sug‘d, Baqtriya, Xorazm satrapliklari'],['Muhim voqealar','Kir II mil. av. 530-yilda massagetlarga qarshi yurishda halok bo‘lgan (Gerodot); Behistun yozuvida satrapliklar ro‘yxati']],
    matn:'Ahamoniylar davlatining viloyatlari satrapliklar deb atalgan, ular soliq to‘lagan va qo‘shinga askar bergan. Mil. av. 330-yilda Doro III halok bo‘lgach, davlat tugagan. Xaritadagi chegaralar sxematik.',
    manba:TAR+'; Doro I ning Behistun yozuvi'},
  '1':{nom:'Aleksandr yurishi', sarlavha2:'mil. av. 329–327 · O‘rta Osiyodagi yurish',
    jadval:[['Yillar','mil. av. 329 (Amudaryodan o‘tish) – 327 (Hindistonga yo‘l olish); vafoti — mil. av. 323'],['Hukmdor','Makedoniyalik Aleksandr'],['Egallangan shahar','Marokanda (Samarqand)'],['Asos solingan shahar','Aleksandriya Esxata (hozirgi Xo‘jand o‘rnida deb hisoblanadi)'],['Muhim voqealar','Spitamen boshchiligidagi qarshilik (mil. av. 329–328); Roksanaga uylanish (mil. av. 327)']],
    matn:'Aleksandr mil. av. 327-yilda Hindistonga yo‘l olgan va mil. av. 323-yilda Bobilda vafot etgan. Undan keyin hudud Salavkiylar, so‘ng Yunon-Baqtriya davlati tarkibiga o‘tgan. Sahnadagi oraliq (mil. av. 329–327) — Aleksandrning O‘rta Osiyodagi yurishi.',
    manba:TAR+' («Wars of Alexander the Great», «Spitamenes», «Alexandria Eschate»)'},
  '2':{nom:'Somoniylar davlati', sarlavha2:'819 (yoki 875) – 999 · o‘rta asrlar',
    jadval:[['Yillar','819/875 – 999'],['Poytaxt','Buxoro (Ismoil Somoniy davridan)'],['Hukmdorlar','Nasr I, Ismoil Somoniy (892–907), Nasr II va boshqalar'],['Muhim voqealar','875 — Nasr I Movarounnahr noibi; 999 — Buxoroni Qoraxoniylar egallagan'],['Madaniyat','Rudakiy ijodi; Ibn Sino 980-yilda Afshonada tug‘ilgan; Ismoil Somoniy maqbarasi (X asr)']],
    matn:'Boshlanish sanasi manbalarda turlicha: 819-yilda Somoniylar Movarounnahr shaharlariga hokim etib tayinlangan, 875-yilda Nasr I butun Movarounnahr noibi bo‘lgan. Xaritadagi chegaralar sxematik; manbadagi xaritada Shosh (Toshkent) chegarasi taxminiy.',
    manba:TAR+' («Samanid Empire», «Isma’il ibn Ahmad»)'},
  '3':{nom:'Amir Temur davlati', sarlavha2:'1370–1405 · o‘rta asrlar',
    jadval:[['Yillar','1370–1405'],['Poytaxt','Samarqand'],['Hukmdor','Amir Temur (1336–1405); keyin Temuriylar sulolasi (Hirotda 1507-yilgacha)'],['Muhim voqealar','1370 — Balx qurultoyi; 1391 va 1395 — To‘xtamishga qarshi yurishlar; 1402 — Anqara jangi'],['Me’morchilik','Bibixonim masjidi (1399–1404), Go‘ri Amir']],
    matn:'Amir Temur 1405-yil fevralida O‘trorda vafot etgan. Uning nabirasi Ulug‘bek Samarqandda rasadxona va madrasa qurdirgan. Xaritadagi chegaralar sxematik: davlat hududi yurishlar davomida tez o‘zgargan.',
    manba:TAR+' («Timur», «Timurid Empire»)'},
  '4':{nom:'Uch xonlik davri', sarlavha2:'XVI asr – 1920 · Buxoro, Xiva, Qo‘qon',
    jadval:[['Buxoro xonligi / amirligi','1500/1533–1785 xonlik; 1785–1920 amirlik (Mang‘itlar)'],['Xiva xonligi','1511–1920 · poytaxt dastlab Urganch, XVII asr boshidan Xiva'],['Qo‘qon xonligi','1709–1876 · Minglar sulolasi'],['Sahnadagi oraliq','XVI asr boshi — Shayboniylar Movarounnahrni egallashi; 1920 — Buxoro amirligi va Xiva xonligi tugatilishi'],['Muhim voqealar','1868 va 1873 — Buxoro va Xiva Rossiya protektorati; 1876 — Qo‘qon xonligi tugatilgan']],
    matn:'Uch davlatning sanalari bir xil emas; sahnadagi «XVI asr – 1920» oralig‘i umumlashtirilgan. Manbadagi xaritada uch xonlik ajratilmagan — ular bitta hudud sifatida ko‘rsatilgan. Qo‘qon hukmdorlari «xon» unvonini XIX asr boshida qabul qilgan, shuning uchun ba’zi manbalar xonlikni shu davrdan boshlaydi.',
    manba:TAR+' («Khanate of Bukhara», «Emirate of Bukhara», «Khanate of Khiva», «Khanate of Kokand»)'},
  '5':{nom:'Turkiston general-gubernatorligi', sarlavha2:'1867–1917 · Rossiya imperiyasi tarkibida',
    jadval:[['Yillar','1867–1917'],['Markaz','Toshkent'],['Birinchi general-gubernator','K. P. fon Kaufman (1867–1882)'],['Protektoratlar','Buxoro amirligi (1868), Xiva xonligi (1873)'],['Muhim voqealar','1865 — Toshkent egallangan; 1876 — Farg‘ona viloyati tuzilgan; XIX asr oxiri — temir yo‘l']],
    matn:'General-gubernatorlik Rossiya imperiyasining ma’muriy birligi bo‘lgan. 1917-yildagi o‘zgarishlardan keyin tugagan, 1918-yilda Turkiston ASSR e’lon qilingan. Xaritada Buxoro amirligi va Xiva xonligi protektorat sifatida alohida chizilmagan.',
    manba:TAR+' («Russian Turkestan», «Konstantin von Kaufman»)'},
  '6':{nom:'O‘zbekiston SSR', sarlavha2:'1924–1991 · SSSR tarkibida',
    jadval:[['Yillar','1924-yil 27-oktabr – 1991-yil 31-avgust'],['Poytaxt','Samarqand (1925–1930), Toshkent (1930-yildan)'],['Tarkibi','1936-yildan Qoraqalpog‘iston ASSR'],['Oldingi tuzilmalar','Turkiston ASSR (1918–1924), Buxoro va Xorazm XSR (1920–1924)'],['Muhim voqealar','1966-yil 26-aprel — Toshkent zilzilasi']],
    matn:'O‘zbekiston SSR milliy-hududiy bo‘linish natijasida tuzilgan. Chegaralar keyinchalik ham bir necha marta o‘zgargan. Xaritada rang bilan butun SSSR ko‘rsatilgan; O‘zbekiston SSR — oq uzuq chiziq ichida (hozirgi chegara).',
    manba:TAR+' («Uzbek Soviet Socialist Republic»)'},
  '7':{nom:'Mustaqil O‘zbekiston', sarlavha2:'1991-yildan · O‘zbekiston Respublikasi',
    jadval:[['Mustaqillik','1991-yil 31-avgust (1-sentabr — Mustaqillik kuni)'],['Poytaxt','Toshkent'],['BMT a’zoligi','1992-yil 2-mart'],['Konstitutsiya','1992-yil 8-dekabr; yangi tahriri 2023-yil 30-aprel referendumida qabul qilingan'],['Ma’muriy tuzilishi','Qoraqalpog‘iston Respublikasi, 12 viloyat, Toshkent shahri']],
    matn:'1991-yil 29-dekabrda mustaqillik bo‘yicha referendum va Prezident saylovi o‘tkazilgan. Davlat chegarasi xaritada sxematik ko‘rsatilgan.',
    manba:TAR+'; BMT a’zo davlatlar ro‘yxati (un.org)'}
});

/* ================= TARIX: SHAHARLAR ================= */
q('shahar',{
  toshkent:{nom:'Toshkent', sarlavha2:'O‘zbekiston poytaxti',
    jadval:[['Qadimgi nomlari','Choch, Shosh, Binkat (manbalarda)'],['Yoshi','2009-yilda 2200 yilligi nishonlangan (YUNESKO qo‘llab-quvvatlagan yubileylar ro‘yxatida)'],['Poytaxt maqomi','Turkiston general-gubernatorligi markazi (1867); O‘zbekiston SSR poytaxti (1930); mustaqil O‘zbekiston poytaxti'],['YUNESKO Butunjahon merosi','Ro‘yxatda alohida obyekt sifatida yo‘q'],['Muhim voqea','1966-yil 26-aprel — kuchli zilzila, shahar markazi qayta qurilgan']],
    matn:'«Toshkent» nomi XI asr manbalarida (Beruniy, Mahmud Koshg‘ariy) uchraydi. Shahar Buyuk Ipak yo‘lidagi Choch vohasi markazi bo‘lgan. Yoshi arxeologik ma’lumotlarga asoslangan va taxminiy.',
    manba:TAR+' («Tashkent»); YUNESKO Bosh konferensiyasi 34-sessiyasi (2007) — 2008–2009-yillar yubileylari ro‘yxati'},
  samarqand:{nom:'Samarqand', sarlavha2:'Amir Temur poytaxti · YUNESKO merosi',
    jadval:[['Qadimgi nomi','Marokanda (yunon manbalarida); qadimgi shahar xarobalari — Afrosiyob'],['Yoshi','2007-yilda 2750 yilligi nishonlangan; YUNESKO: mil. av. VII asrda asos solingan'],['Poytaxt bo‘lgan','Amir Temur davlati (1370–1405), O‘zbekiston SSR (1925–1930)'],['YUNESKO Butunjahon merosi','«Samarqand — madaniyatlar chorrahasi», 2001'],['Yodgorliklar','Registon (Ulug‘bek, Sherdor, Tillakori madrasalari), Bibixonim, Shohi Zinda, Go‘ri Amir']],
    matn:'Samarqand mil. av. 329-yilda Aleksandr tomonidan egallangan. Temur va Temuriylar davrida ilm-fan va me’morchilik markaziga aylangan; Ulug‘bek rasadxonasi XV asrda shu yerda qurilgan.',
    manba:UNESCO+' («Samarkand – Crossroads of Cultures»); YUNESKO Bosh konferensiyasi 33-sessiyasi (2005) — 2750 yillik yubiley tasdiqlangan, 2007-yil 25–30-avgustda nishonlangan (RFE/RL, 2007); '+TAR},
  buxoro:{nom:'Buxoro', sarlavha2:'Somoniylar poytaxti · YUNESKO merosi',
    jadval:[['Yoshi','1997-yilda 2500 yilligi nishonlangan; YUNESKO: 2000 yildan ortiq uzluksiz aholi yashagan shahar'],['Poytaxt bo‘lgan','Somoniylar davlati (IX–X asr); Buxoro xonligi (1533-yildan) va amirligi (1920-yilgacha)'],['YUNESKO Butunjahon merosi','«Buxoroning tarixiy markazi», 1993'],['Yodgorliklar','Ismoil Somoniy maqbarasi (X asr), Kalon minorasi (1127), Ark qal’asi, Poi Kalon majmuasi'],['Allomalar','Ibn Sino Buxoro yaqinidagi Afshonada tug‘ilgan (980)']],
    matn:'Buxoro Somoniylar davrida ilm va adabiyot markazi bo‘lgan. Ismoil Somoniy maqbarasi Markaziy Osiyodagi eng qadimgi saqlangan islom me’morchiligi yodgorliklaridan biri hisoblanadi.',
    manba:UNESCO+' («Historic Centre of Bukhara»); '+TAR},
  xiva:{nom:'Xiva', sarlavha2:'Xiva xonligi poytaxti · YUNESKO merosi',
    jadval:[['Yoshi','1997-yilda 2500 yilligi nishonlangan'],['Poytaxt bo‘lgan','Xiva xonligi (XVII asr boshidan 1920-yilgacha; aniq yil manbalarda turlicha)'],['YUNESKO Butunjahon merosi','«Ichan qal’a», 1990 — O‘zbekistondan ro‘yxatga kiritilgan birinchi obyekt'],['Yodgorliklar','Ko‘hna Ark, Kalta Minor (1850-yillar, tugallanmagan), Islomxo‘ja minorasi (XX asr boshi), Tosh hovli saroyi, Juma masjidi'],['Ichan qal’a devori','Uzunligi ≈2,2 km; balandligi joyiga qarab 8–10 m, asosining qalinligi 8 m gacha']],
    matn:'Ichan qal’a — Xivaning devor bilan o‘ralgan ichki shahri. YUNESKO ma’lumotiga ko‘ra, juda qadimiy yodgorliklar kam saqlangan, ammo Ichan qal’a o‘rta osiyo islom me’morchiligining yaxlit saqlangan namunasi; saqlangan binolarning ko‘pi XVIII–XIX asrlarga oid.',
    manba:UNESCO+' («Itchan Kala»); '+TAR+'; devor o‘lchamlari: Turkestan Travel «Walls of Ichan Kala in Khiva» (turizm manbasi, taxminiy)'}
});

/* ================= MUSIQA: NOTALAR ================= */
q('nota',{
  do:nota('Do','C','261,63','523,25','Do-major gammasining birinchi pog‘onasi (toniki). Pianinoda ikki qora klavishli guruhning chap tomonida turadi. Do4 — pianino o‘rtasidagi Do, 88 klavishli pianinoda 40-klavish. Eskicha nomi «Ut».'),
  re:nota('Re','D','293,66','587,33','Gammaning II pog‘onasi. Do dan bir ton yuqori. Ikki qora klavish orasidagi oq klavish.'),
  mi:nota('Mi','E','329,63','659,26','Gammaning III pog‘onasi. Mi va Fa orasida qora klavish yo‘q — ular orasidagi masofa yarim ton. Do-major akkordining o‘rta tovushi.'),
  fa:nota('Fa','F','349,23','698,46','Gammaning IV pog‘onasi. Uch qora klavishli guruhning chap tomonida turadi; Mi dan faqat yarim ton yuqori.'),
  sol:nota('Sol','G','392,00','783,99','Gammaning V pog‘onasi (dominanta). Do–Sol oralig‘i — sof kvinta: teng temperatsiyada chastotalar nisbati ≈1,4983 (tabiiy nisbat 3/2). Do-major akkordining yuqori tovushi.'),
  la:nota('La','A','440,00','880,00','Gammaning VI pog‘onasi. La4 = 440 Hz — xalqaro sozlash etaloni (ISO 16). O‘zbek va rus darsliklarida ko‘pincha «Lya» deb yoziladi; 88 klavishli pianinoda 49-klavish.'),
  si:nota('Si','B','493,88','987,77','Gammaning VII pog‘onasi. Si va Do orasida qora klavish yo‘q (yarim ton). Nemis an’anasida Si «H» harfi bilan, «B» esa Si-bemol bilan belgilanadi.')
});

/* ================= OY FAZALARI ================= */
q('oy',{
  yangi:{nom:'Yangi oy', sarlavha2:'Faza 1/8 · yoritilganlik ≈0 %',
    jadval:[['Vaziyat','Oy Quyosh va Yer orasida'],['Yerdan ko‘rinishi','Ko‘rinmaydi (yoritilgan tomoni Yerga teskari)'],['Chiqishi / botishi','Quyosh bilan deyarli birga'],['Yangi oydan keyin','0 kun'],['Tutilish','Quyosh tutilishi faqat shu fazada bo‘lishi mumkin']],
    matn:'Oy orbitasi ≈5,1° qiya bo‘lgani uchun odatda Oy Quyoshning biroz yuqorisidan yoki pastidan o‘tadi, shuning uchun har yangi oyda tutilish bo‘lmaydi.', manba:OYM},
  osuvchi_orak:{nom:'O‘suvchi o‘roq', sarlavha2:'Faza 2/8 · yoritilganlik <50 %, ortmoqda',
    jadval:[['Vaziyat','Oy Quyoshdan sharq tomonga siljigan'],['Yerdan ko‘rinishi (shimoliy yarimshar)','O‘ng tomoni yoritilgan ingichka o‘roq'],['Qachon ko‘rinadi','Quyosh botgandan keyin g‘arbda'],['Yangi oydan keyin','taxminan 1–6 kun']],
    matn:'Yangi hilol — hijriy kalendarda oy boshini belgilash uchun an’anaviy kuzatiladigan faza.', manba:OYM},
  birinchi_chorak:{nom:'Birinchi chorak', sarlavha2:'Faza 3/8 · yoritilganlik ≈50 %',
    jadval:[['Vaziyat','Quyosh–Yer–Oy burchagi ≈90°'],['Yerdan ko‘rinishi (shimoliy yarimshar)','O‘ng yarmi yoritilgan'],['Chiqishi / botishi','Taxminan tushda chiqadi, yarim tunda botadi'],['Yangi oydan keyin','≈7,4 kun']],
    matn:'«Chorak» nomi Oy orbitaning to‘rtdan birini bosib o‘tganini bildiradi, diskning to‘rtdan biri yoritilganini emas.', manba:OYM},
  osuvchi_qavariq:{nom:'O‘suvchi qavariq', sarlavha2:'Faza 4/8 · yoritilganlik >50 %, ortmoqda',
    jadval:[['Vaziyat','Oy Quyoshga qarama-qarshi tomonga yaqinlashmoqda'],['Yerdan ko‘rinishi','Diskning katta qismi, o‘ng tomondan yoritilgan'],['Qachon ko‘rinadi','Tushdan keyin chiqib, kechqurun va tunning birinchi yarmida'],['Yangi oydan keyin','taxminan 8–14 kun']],
    matn:'Bir necha kundan so‘ng to‘lin oy bo‘ladi.', manba:OYM},
  tolin:{nom:'To‘lin oy', sarlavha2:'Faza 5/8 · yoritilganlik ≈100 %',
    jadval:[['Vaziyat','Yer Quyosh va Oy orasida'],['Yerdan ko‘rinishi','Butun disk yoritilgan'],['Chiqishi / botishi','Quyosh botganda chiqadi, tong otganda botadi'],['Yangi oydan keyin','≈14,8 kun'],['Tutilish','Oy tutilishi faqat shu fazada bo‘lishi mumkin']],
    matn:'To‘lin oy tun bo‘yi ko‘rinadi. Oy tutilishi — Yer soyasining Oyga tushishi; u fazadan farqli ravishda har oy bo‘lmaydi.', manba:OYM},
  kamayuvchi_qavariq:{nom:'Kamayuvchi qavariq', sarlavha2:'Faza 6/8 · yoritilganlik >50 %, kamaymoqda',
    jadval:[['Vaziyat','Oy to‘lin holatdan oxirgi chorakka qarab'],['Yerdan ko‘rinishi (shimoliy yarimshar)','Chap tomondan yoritilgan'],['Qachon ko‘rinadi','Kechqurundan keyin chiqib, tunda va ertalab'],['Yangi oydan keyin','taxminan 16–21 kun']],
    matn:'Oy har kuni o‘rtacha ≈50 daqiqa kechroq chiqadi.', manba:OYM},
  oxirgi_chorak:{nom:'Oxirgi chorak', sarlavha2:'Faza 7/8 · yoritilganlik ≈50 %',
    jadval:[['Vaziyat','Quyosh–Yer–Oy burchagi ≈90° (boshqa tomonda)'],['Yerdan ko‘rinishi (shimoliy yarimshar)','Chap yarmi yoritilgan'],['Chiqishi / botishi','Taxminan yarim tunda chiqadi, tushda botadi'],['Yangi oydan keyin','≈22,1 kun']],
    matn:'Tongda Oy janub tomonda baland ko‘rinadi.', manba:OYM},
  kamayuvchi_orak:{nom:'Kamayuvchi o‘roq', sarlavha2:'Faza 8/8 · yoritilganlik <50 %, kamaymoqda',
    jadval:[['Vaziyat','Oy yana Quyosh yoniga yaqinlashmoqda'],['Yerdan ko‘rinishi (shimoliy yarimshar)','Chap tomoni yoritilgan ingichka o‘roq'],['Qachon ko‘rinadi','Tong otishidan oldin sharqda'],['Yangi oydan keyin','taxminan 23–29 kun']],
    matn:'Bir necha kundan so‘ng yana yangi oy — sikl ≈29,53 kunda takrorlanadi.', manba:OYM},
  oy:{nom:'Oy', sarlavha2:'Yerning tabiiy yo‘ldoshi',
    jadval:[['Diametri','≈3 475 km (Yernikining ≈0,27 qismi)'],['Massasi','7,35·10²² kg (Yer = 1 bo‘lsa ≈0,0123)'],['Yergacha o‘rtacha masofa','≈384 400 km (perigey ≈363 300 km, apogey ≈405 500 km)'],['Sinodik oy (fazalar davri)','≈29,53 kun'],['Siderik oy (yulduzlarga nisbatan)','≈27,32 kun'],['Erkin tushish tezlanishi','≈1,62 m/s² (Yerdagidan ≈6 marta kichik)'],['Orbitaning ekliptikaga qiyaligi','≈5,1°']],
    matn:'Oy o‘zi nur chiqarmaydi — Quyosh nurini qaytaradi va doim yarmi yoritilgan bo‘ladi. O‘z o‘qi atrofida aylanish davri orbital davriga teng, shuning uchun Yerga doim bir tomoni bilan qaragan.', manba:OYM},
  yer:{nom:'Yer', sarlavha2:'Kuzatuvchi joylashgan sayyora',
    jadval:[['O‘rtacha diametri','≈12 742 km'],['Oyga nisbatan','Diametri ≈3,7 marta, massasi ≈81 marta katta'],['Quyosh atrofida aylanishi','≈365,26 kun (siderik yil)'],['O‘z o‘qi atrofida','≈23 soat 56 daq (yulduz sutkasi)'],['Fazalar uchun ahamiyati','Oy siklida Yer Quyosh atrofida ≈29° siljiydi — sinodik oy siderik oydan uzun']],
    matn:'Oy fazalarini Yerdan turib kuzatamiz. Shimoliy va janubiy yarimsharlardan qaraganda o‘roqning yoritilgan tomoni teskari ko‘rinadi.', manba:OYM},
  quyosh:{nom:'Quyosh', sarlavha2:'Oyni yorituvchi yulduz',
    jadval:[['Yergacha o‘rtacha masofa','≈149,6 mln km (Oygachadan ≈390 marta uzoq)'],['Diametri','≈1 392 000 km (Oynikidan ≈400 marta katta)'],['Yorug‘lik yetib kelishi','≈8 daq 20 s'],['Fazalar uchun ahamiyati','Har doim Oyning Quyoshga qaragan yarmi yoritilgan']],
    matn:'Quyosh Oydan ≈400 marta katta va Yerdan taxminan shuncha marta uzoq, shuning uchun ikkalasi osmonda deyarli bir xil o‘lchamda ko‘rinadi — to‘liq Quyosh tutilishi shu tufayli mumkin.', manba:OYM}
});

/* ================= OPTIKA ================= */
q('optika',{
  havo:{nom:'Havo', sarlavha2:'Optik siyrak muhit · n ≈ 1',
    jadval:[['Sindirish ko‘rsatkichi','≈1,0003 (normal sharoit, ≈589 nm); hisoblarda 1'],['Yorug‘lik tezligi','≈299 700 km/s'],['Kritik burchak','Yo‘q — havodan zichroq muhitga o‘tishda to‘la ichki qaytish bo‘lmaydi']],
    matn:'Havoning sindirish ko‘rsatkichi vakuumnikidan juda oz farq qiladi. Ammo harorat va zichlik o‘zgarishi sarob kabi hodisalarni keltirib chiqarishi mumkin.', manba:OPT},
  suv:{nom:'Suv', sarlavha2:'n = 1,33 (20 °C, ≈589 nm)',
    jadval:[['Sindirish ko‘rsatkichi','1,33 (aniqroq 1,333)'],['Yorug‘lik tezligi','≈225 000 km/s'],['Havoga chiqishda kritik burchak','≈48,8°'],['Misol','Havodan 45° da tushgan nur ≈32,1° da sinadi']],
    matn:'Suvda nur sinishi tufayli hovuz tubi sayozroq, suvga solingan qoshiq «singan» ko‘rinadi. Suv ostidan qaraganda tashqi dunyo ≈97° lik konus ichida ko‘rinadi.', manba:OPT},
  shisha:{nom:'Shisha', sarlavha2:'n ≈ 1,50 (sahnada; turiga qarab farq qiladi)',
    jadval:[['Sindirish ko‘rsatkichi','≈1,50; kron shisha ≈1,52, kvars ≈1,46, og‘ir flint 1,9 gacha'],['Yorug‘lik tezligi (n = 1,50)','≈200 000 km/s'],['Havoga chiqishda kritik burchak','≈41,8°'],['Qo‘llanishi','Linza, prizma, optik tola, binokl va periskop prizmalari']],
    matn:'45° li to‘g‘ri burchakli shisha prizmada nur to‘la ichki qaytadi, chunki 45° kritik burchakdan (≈41,8°) katta — prizma ko‘zgu vazifasini bajaradi.', manba:OPT},
  olmos:{nom:'Olmos', sarlavha2:'n = 2,42 (≈589 nm)',
    jadval:[['Sindirish ko‘rsatkichi','2,42 (aniqroq 2,417)'],['Yorug‘lik tezligi','≈124 000 km/s'],['Havoga chiqishda kritik burchak','≈24,4°'],['Tarkibi','Sof uglerod (C), kristall panjarali']],
    matn:'Kichik kritik burchak tufayli olmosga kirgan nur ichida ko‘p marta to‘la ichki qaytadi. Zargarlar qirralarni shunday kesadiki, nur yuqori tomondan chiqib, olmos yaltiraydi.', manba:OPT},
  lazer:{nom:'Lazer nuri', sarlavha2:'Ingichka, yo‘naltirilgan yorug‘lik dastasi',
    jadval:[['Xususiyati','Deyarli parallel, bir rangli (monoxromatik) nur'],['Tajribadagi roli','Nurning yo‘lini aniq ko‘rish va burchakni o‘lchash'],['Rang va n','Sindirish ko‘rsatkichi to‘lqin uzunligiga biroz bog‘liq (dispersiya)'],['Xavfsizlik','Lazer nurini hech qachon ko‘zga yoki ko‘zguga qaratmang']],
    matn:'Maktab tajribalarida kam quvvatli lazer ko‘rsatkichlari ishlatiladi. Hatto ular ham ko‘zga to‘g‘ridan-to‘g‘ri tushsa, ko‘z to‘r pardasiga zarar yetkazishi mumkin.', manba:OPT+'; lazer xavfsizligi — IEC 60825-1 sinflari'},
  normal:{nom:'Normal', sarlavha2:'Chegaraga perpendikulyar chiziq',
    jadval:[['Ta’rifi','Nur tushgan nuqtada ikki muhit chegarasiga perpendikulyar chiziq'],['Nima uchun kerak','Tushish, qaytish va sinish burchaklari normaldan o‘lchanadi'],['α₁ = 0°','Nur normal bo‘ylab tushadi va sinmaydi'],['Qoida','Tushgan nur, singan nur va normal bir tekislikda yotadi']],
    matn:'Keng tarqalgan xato — burchakni chegara sirtidan o‘lchash. Nur sirtga 30° qiyalikda tushsa, tushish burchagi 60° bo‘ladi.', manba:OPT}
});

})();
