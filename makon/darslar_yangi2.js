/* MAKON — yangi darslar (2-to‘plam): tarix (ochiladi), musiqa (yangi fan), astronomiya, fizika, kimyo, biologiya. 6 dars.
   darslar_yangi_fanlar.js dan KEYIN yuklanadi. Sahna turlari: xarita, piano, oy, optika, molekula, biologiya.
   Qoida: faqat manbali fakt; manbalar farq qiladigan joy matnda ochiq aytiladi. */
(function(){
const FAN = window.MAKON_FAN;
if(!FAN || !window.MAKON_DARS) return;
const F = id=>FAN.find(f=>f.id===id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom===nom || x.dars===dars || (eskiNomlar||[]).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};

/* ---------- Musiqa: yangi fan (geometriya va geografiyadan keyin, yopiq fanlardan oldin) ---------- */
if(!F('musiqa')){
  const mus = {id:'musiqa', nom:'Musiqa', rang:'#e8508f', ik:'nota', izoh:'Notalar, oktava, gamma va tovush chastotasi',
    tavsif:'3D pianinoda klavishlarni bosing: har bir nota qanday eshitilishini, uning chastotasini va oktava nima ekanini o‘z qulog‘ingiz bilan tekshiring.',
    mavzular:[
      {nom:'Notalar, oktava va gamma', dars:'musiqa-notalar', qisqa:'Do–Si, diyez, teng temperatsiya, La4 = 440 Hz, Do-major gammasi va akkordi'},
      {nom:'Interval va akkordlar', qisqa:'Keyingi bosqich'},
      {nom:'O‘zbek mumtoz musiqasi: maqomlar', qisqa:'Keyingi bosqich'}
    ]};
  let joy = FAN.length;
  const yi = FAN.findIndex(f=>f.yopiq);
  const oxirgi = Math.max(FAN.findIndex(f=>f.id==='geometriya'), FAN.findIndex(f=>f.id==='geografiya' && !f.yopiq));
  if(oxirgi>=0) joy = oxirgi+1;
  if(yi>=0 && yi<joy) joy = yi;
  FAN.splice(joy, 0, mus);
}

/* ---------- Tarix: ochiladi ---------- */
const tarix = F('tarix');
if(tarix){
  tarix.yopiq = false;
  tarix.izoh = 'Davrlar bo‘yicha o‘zgaradigan xarita';
  tarix.tavsif = 'O‘zbekiston hududi tarixini xaritada kuzating: davrni tanlang, shaharlarni bosing va har bir davlatning yillari, poytaxti hamda muhim voqealari bilan tanishing.';
  tarix.mavzular = [
    {nom:'O‘zbekiston hududidagi davlatlar: Ahamoniylardan mustaqillikkacha', dars:'tarix-davlatlar', qisqa:'8 davr xaritada: yillar, poytaxtlar, hukmdorlar, shaharlar'},
    {nom:'Buyuk Ipak yo‘li', qisqa:'Keyingi bosqich'},
    {nom:'O‘rta asr allomalari', qisqa:'Keyingi bosqich'}
  ];
  const ti = FAN.indexOf(tarix), yi = FAN.findIndex(f=>f.yopiq);
  if(yi>=0 && ti>yi){ FAN.splice(ti,1); FAN.splice(yi,0,tarix); }
}

bogla('astronomiya','Oy va uning fazalari','astro-oy-fazalari','8 faza: Quyosh, Yer va Oy vaziyati; sinodik oy 29,53 kun');
bogla('fizika','Yorug‘likning sinishi va to‘la ichki qaytish','fizika-sinish','Snellius qonuni: suv, shisha, olmos; kritik burchak',['Yorug‘likning sinishi']);
bogla('kimyo','Spirtlar: metanol va etanol','kimyo-spirtlar','Gidroksil guruh, xossalar, metanol zaharliligi');
bogla('biologiya','Qon aylanish tizimi','bio-qon-aylanish','Yurak, katta va kichik qon aylanish doiralari');

const TD = 'O‘zbekiston tarixi darsliklari (6–11-sinf, amaldagi nashrlar)';
const TW = 'Encyclopaedia Britannica va Wikipedia (inglizcha): «Achaemenid Empire», «Sogdia», «Wars of Alexander the Great», «Samanid Empire», «Timurid Empire», «Khanate of Bukhara», «Emirate of Bukhara», «Khanate of Khiva», «Khanate of Kokand», «Russian Turkestan», «Uzbek Soviet Socialist Republic», «History of Uzbekistan»';
const MD = '5–7-sinf «Musiqa madaniyati» darsliklari (O‘zbekiston); Wikipedia (inglizcha): «Piano key frequencies», «Equal temperament», «Octave», «Solfège», «Guido of Arezzo», «A440 (pitch standard)»; ISO 16:1975 (La = 440 Hz)';
const OYM = 'NASA NSSDCA «Moon Fact Sheet» (nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html); NASA Science «Moon Phases»; Wikipedia (inglizcha): «Lunar phase», «Lunar month», «Tidal locking»';
const OPT = 'Fizika darsligi (O‘zbekiston, «Yorug‘lik hodisalari»/optika bo‘limi); E. Hecht «Optics»; refractiveindex.info va Wikipedia (inglizcha): «Refractive index», «Snell’s law», «Total internal reflection», «Ibn Sahl», «Optical fiber»';
const KSP = '10-sinf «Kimyo» (organik kimyo) darsligi (O‘zbekiston) — «Spirtlar» bobi; PubChem: Methanol (CID 887), Ethanol (CID 702); Wikipedia (inglizcha): «Methanol», «Ethanol», «Methanol toxicity»; MSF (Chegara bilmas shifokorlar) «Methanol poisoning» ma’lumotlari';
const QON = '8-sinf «Biologiya (Odam va uning salomatligi)» darsligi — «Qon aylanish» bobi; Wikipedia (inglizcha): «Circulatory system», «Pulmonary circulation», «Systemic circulation», «Heart», «Cardiac output», «William Harvey», «Ibn al-Nafis»; The Royal College of Pathologists «Organ weight table»';

Object.assign(window.MAKON_DARS, {

/* ============ 1. O‘ZBEKISTON HUDUDIDAGI DAVLATLAR ============ */
'tarix-davlatlar': {
  fan:'tarix', qisqaNom:'Davlatlar', nom:'O‘zbekiston hududidagi davlatlar: Ahamoniylardan mustaqillikkacha',
  qisqa:'6–11-sinf · O‘zbekiston tarixi · umumlashtiruvchi dars',
  sahna:'xarita',
  kor:{
    sarlavha:'Bir hudud — ko‘p davr',
    matn:'Hozirgi O‘zbekiston hududi ikki ming besh yuz yildan ortiq vaqt davomida turli davlatlar tarkibida yoki markazida bo‘lgan. Xaritada sakkizta davrni ketma-ket tanlang va davlat chegaralari qanday o‘zgarganini kuzating. Chegaralar sxematik: qadimgi va o‘rta asr davlatlarining aniq chegaralari manbalarda ko‘pincha taxminiy va yildan yilga o‘zgargan. Shaharlarni bosib, ularning tarixi bilan ham tanishing.',
    punktlar:['<b>Qadimgi davr:</b> Ahamoniylar (mil. av. 550–330), Aleksandr yurishi (mil. av. 329–327, u mil. av. 323-yilda vafot etgan)','<b>O‘rta asrlar:</b> Somoniylar (819/875–999), Amir Temur davlati (1370–1405)','<b>Yangi davr:</b> Buxoro, Xiva va Qo‘qon — uch davlat; Turkiston general-gubernatorligi (1867–1917)','<b>XX asr:</b> O‘zbekiston SSR (1924–1991) va mustaqil O‘zbekiston (1991-yil 31-avgustdan)']
  },
  bolimlar:[
    {sarlavha:'Sakkiz davr: qisqa jadval', jadval:[
      ['Ahamoniylar davri','mil. av. 550–330 · markazlar: Pasargada, Suza, Persepol · Hudud: Sug‘d, Baqtriya, Xorazm satrapliklari'],
      ['Aleksandr yurishi','mil. av. 329–327 O‘rta Osiyoda · Marokanda (Samarqand) egallangan · Spitamen qo‘zg‘oloni'],
      ['Somoniylar davlati','819 (yoki 875) – 999 · poytaxt Buxoro · Ismoil Somoniy (892–907)'],
      ['Amir Temur davlati','1370–1405 · poytaxt Samarqand · Temuriylar sulolasi 1507-yilgacha (Hirot) hukm surgan'],
      ['Uch xonlik davri','XVI–XIX asrlar · Buxoro xonligi/amirligi, Xiva xonligi (1511–1920), Qo‘qon xonligi (1709–1876)'],
      ['Turkiston general-gubernatorligi','1867–1917 · markaz Toshkent · Buxoro va Xiva Rossiya protektorati'],
      ['O‘zbekiston SSR','1924–1991 · poytaxt Samarqand (1925–1930), keyin Toshkent'],
      ['Mustaqil O‘zbekiston','1991-yil 31-avgustdan · poytaxt Toshkent · Konstitutsiya 1992-yil 8-dekabr']
    ], matn:'Xaritadagi «uch xonlik» davri umumlashtirib «XVI asr – 1920» deb berilgan: XVI asr boshi — Shayboniylarning Movarounnahrni egallashi, 1920 — Buxoro amirligi va Xiva xonligining tugatilishi. Uchala davlatning aniq yillari har xil — pastdagi jadvalga qarang.'},
    {sarlavha:'Uch davlat: aniq yillar', jadval:[
      ['Buxoro xonligi','1500/1533 – 1785 · Shayboniylar, keyin Ashtarxoniylar (Joniylar) sulolasi · 1533-yildan poytaxt Buxoro'],
      ['Buxoro amirligi','1785–1920 · Mang‘itlar sulolasi · 1868-yildan Rossiya protektorati'],
      ['Xiva xonligi','1511–1920 · Arabshohiylar, keyin Qo‘ng‘irotlar sulolasi · poytaxt dastlab Urganch, XVII asr boshidan Xiva · 1873-yildan Rossiya protektorati'],
      ['Qo‘qon xonligi','1709–1876 · Minglar sulolasi (Shohruhbiy) · 1876-yilda tugatilib, Farg‘ona viloyatiga aylantirilgan']
    ], matn:'Qo‘qon hukmdorlari «xon» unvonini XIX asr boshida (Olimxon davrida) qabul qilgan; undan oldin «biy» unvoni ishlatilgan. Shuning uchun ba’zi manbalar xonlikni 1709-yildan emas, 1798–1805-yillardan boshlaydi.'},
    {sarlavha:'Poytaxtlar qanday almashgan', jadval:[
      ['Mil. av. VI–IV asrlar','Mintaqa markazlari — Marokanda (Samarqand), Baqtra (Balx), Xorazm shaharlari'],
      ['IX–X asrlar','Buxoro — Somoniylar poytaxti'],
      ['XIV–XV asrlar','Samarqand — Amir Temur poytaxti'],
      ['XVI–XX asr boshi','Buxoro, Xiva, Qo‘qon'],
      ['1867–1917','Toshkent — general-gubernatorlik markazi'],
      ['1925–1930','Samarqand — O‘zbekiston SSR poytaxti'],
      ['1930-yildan','Toshkent']
    ]},
    {sarlavha:'XX asr: asosiy sanalar', jadval:[
      ['1918–1924','Turkiston ASSR; 1920–1924 — Buxoro va Xorazm Xalq Sovet Respublikalari'],
      ['1924-yil 27-oktabr','O‘zbekiston SSR tashkil etilgani haqida qaror'],
      ['1936','Qoraqalpog‘iston ASSR O‘zbekiston SSR tarkibiga kiritilgan'],
      ['1991-yil 31-avgust','Davlat mustaqilligi e’lon qilingan; 1-sentabr — Mustaqillik kuni'],
      ['1991-yil 29-dekabr','Mustaqillik bo‘yicha referendum va Prezident saylovi'],
      ['1992-yil 2-mart','BMT a’zoligiga qabul qilingan'],
      ['1992-yil 8-dekabr','Konstitutsiya qabul qilingan; 2023-yil 30-aprel referendumida yangi tahriri qabul qilingan']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Ahamoniylar davri (mil. av. 550–330)', matn:'Kir II asos solgan Ahamoniylar davlati mil. av. VI asrda O‘rta Osiyoning janubiy qismini egallagan. Doro I ning Behistun yozuvida Baqtriya, Sug‘d va Xorazm davlat viloyatlari (satrapliklar) sifatida sanab o‘tilgan. Chegaralar sxematik.', davr:0},
    {sarlavha:'Aleksandr yurishi (mil. av. 329–327)', matn:'Makedoniyalik Aleksandr mil. av. 329-yilda Amudaryodan o‘tib, Marokandani egallagan. Sug‘dda Spitamen boshchiligidagi qarshilik mil. av. 328-yilgacha davom etgan. Aleksandr mil. av. 327-yilda Hindistonga yo‘l olgan, mil. av. 323-yilda Bobilda vafot etgan.', davr:1},
    {sarlavha:'Somoniylar davlati', matn:'Somoniylar dastlab Arab xalifaligi noiblari bo‘lgan: 819-yilda Asad o‘g‘illari Movarounnahr shaharlariga hokim etib tayinlangan, 875-yilda Nasr I butun Movarounnahrga noib bo‘lgan. Ismoil Somoniy (892–907) davrida poytaxt Buxoro bo‘lgan. 999-yilda Buxoroni Qoraxoniylar egallagan. Manbadagi xaritada Shosh (Toshkent) chegarasi taxminiy.', davr:2},
    {sarlavha:'Amir Temur davlati (1370–1405)', matn:'Amir Temur 1370-yilda Balx qurultoyida hukmdor deb e’lon qilingan, poytaxti Samarqand bo‘lgan. U 1405-yil fevralida O‘tror shahrida vafot etgan. Uning avlodlari — Temuriylar Movarounnahrda 1500–1501-yillargacha, Xurosonda (Hirot) 1507-yilgacha hukm surgan.', davr:3, shahar:'samarqand'},
    {sarlavha:'Uch xonlik davri', matn:'XVI asr boshida Shayboniylar Movarounnahrni egallagan. Keyin hududda uchta davlat shakllangan: Buxoro (1785-yildan amirlik), Xiva xonligi (1511-yildan) va Qo‘qon xonligi (1709-yildan). Manbadagi xaritada uch xonlik ajratilmagan — ular bitta hudud sifatida ko‘rsatilgan.', davr:4},
    {sarlavha:'Turkiston general-gubernatorligi (1867–1917)', matn:'1867-yilda Rossiya imperiyasi tarkibida markazi Toshkent bo‘lgan Turkiston general-gubernatorligi tuzilgan. Buxoro amirligi (1868) va Xiva xonligi (1873) protektoratga aylangan, Qo‘qon xonligi 1876-yilda tugatilgan. Xaritada Buxoro amirligi va Xiva xonligi protektorat sifatida alohida chizilmagan.', davr:5, shahar:'toshkent'},
    {sarlavha:'O‘zbekiston SSR (1924–1991)', matn:'1924-yil 27-oktabrda O‘zbekiston SSR tashkil etilgan. Poytaxt 1930-yilgacha Samarqand, keyin Toshkent bo‘lgan. 1936-yilda Qoraqalpog‘iston ASSR respublika tarkibiga kiritilgan. Xaritada rang bilan butun SSSR ko‘rsatilgan; O‘zbekiston SSR — oq uzuq chiziq ichida (hozirgi chegara).', davr:6},
    {sarlavha:'Mustaqil O‘zbekiston (1991-yildan)', matn:'1991-yil 31-avgustda O‘zbekiston Respublikasining davlat mustaqilligi e’lon qilingan. 1992-yil 2-martda BMT a’zoligiga qabul qilingan, 8-dekabrda Konstitutsiya qabul qilingan. Poytaxt — Toshkent.', davr:7, shahar:'toshkent'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Xaritadagi davlat qaysi?',
    topshiriqlar:[
      {shart:'Xaritadagi davlat qaysi?', holat:{davr:3}, v:['Somoniylar davlati','Amir Temur davlati','Qo‘qon xonligi','Ahamoniylar davlati'], t:1, izoh:'Bu <b>Amir Temur davlati</b> (1370–1405), poytaxti Samarqand.'},
      {shart:'Xaritadagi davlatning poytaxti qaysi shahar bo‘lgan?', holat:{davr:2}, v:['Samarqand','Xiva','Buxoro','Toshkent'], t:2, izoh:'Somoniylar davrida, ayniqsa Ismoil Somoniydan boshlab, poytaxt <b>Buxoro</b> bo‘lgan.'},
      {shart:'Xaritada ko‘rsatilgan davr qaysi yillarga to‘g‘ri keladi?', holat:{davr:5}, v:['1500–1868','1867–1917','1924–1991','819–999'], t:1, izoh:'Turkiston general-gubernatorligi <b>1867–1917</b>-yillarda mavjud bo‘lgan, markazi Toshkent.'},
      {shart:'Xaritadagi davrda bu hudud qaysi davlat viloyatlari (satrapliklari) bo‘lgan?', holat:{davr:0}, v:['Arab xalifaligi','Ahamoniylar davlati','Rossiya imperiyasi','Temuriylar davlati'], t:1, izoh:'Sug‘d, Baqtriya va Xorazm <b>Ahamoniylar</b> satrapliklari bo‘lgan — bu Doro I ning Behistun yozuvida qayd etilgan.'},
      {shart:'Xaritadagi davlatning mustaqilligi qachon e’lon qilingan?', holat:{davr:7}, v:['1924-yil 27-oktabr','1992-yil 8-dekabr','1991-yil 31-avgust','1991-yil 29-dekabr'], t:2, izoh:'Mustaqillik <b>1991-yil 31-avgustda</b> e’lon qilingan; 8-dekabr 1992 — Konstitutsiya qabul qilingan kun.'}
    ]},
  test:[
    {s:'Ahamoniylar davlati qaysi yillarda mavjud bo‘lgan?', v:['mil. av. 550–330','mil. av. 329–323','819–999','mil. av. 330–250'], t:0, izoh:'Kir II mil. av. 550-yilda davlatga asos solgan, mil. av. 330-yilda Doro III halok bo‘lgan: <b>mil. av. 550–330</b>.'},
    {s:'Aleksandr yurishi davrida Samarqand qanday atalgan?', v:['Baqtra','Marokanda','Aleksandriya Esxata','Afrosiyob'], t:1, izoh:'Yunon manbalarida Samarqand <b>Marokanda</b> deb atalgan. Afrosiyob — qadimgi shahar xarobalarining keyingi nomi.'},
    {s:'Somoniylar davlatining poytaxti?', v:['Samarqand','Marv','Buxoro','Urganch'], t:2, izoh:'Ismoil Somoniy davridan poytaxt <b>Buxoro</b>.'},
    {s:'Amir Temur qaysi yili hukmdor deb e’lon qilingan?', v:['1336','1370','1405','1402'], t:1, izoh:'<b>1370-yil</b>, Balx qurultoyi. 1336 — tug‘ilgan yili, 1405 — vafot etgan yili.'},
    {s:'Qo‘qon xonligi qachon tugatilgan?', v:['1868','1873','1876','1920'], t:2, izoh:'<b>1876-yilda</b> tugatilib, Farg‘ona viloyatiga aylantirilgan. Buxoro va Xiva esa 1920-yilgacha mavjud bo‘lgan.'},
    {s:'Turkiston general-gubernatorligining markazi qaysi shahar edi?', v:['Samarqand','Toshkent','Qo‘qon','Buxoro'], t:1, izoh:'Markaz — <b>Toshkent</b>.'},
    {s:'O‘zbekiston SSR ning birinchi poytaxti?', v:['Toshkent','Buxoro','Samarqand','Xiva'], t:2, izoh:'1925–1930-yillarda poytaxt <b>Samarqand</b>, 1930-yildan Toshkent.'},
    {s:'Davlatlarning to‘g‘ri xronologik tartibi qaysi?', v:['Somoniylar → Ahamoniylar → Temur davlati','Ahamoniylar → Somoniylar → Temur davlati → Qo‘qon xonligi','Temur davlati → Somoniylar → Qo‘qon xonligi','Ahamoniylar → Temur davlati → Somoniylar'], t:1, izoh:'<b>Ahamoniylar (mil. av. VI asr) → Somoniylar (IX–X) → Temur (XIV–XV) → Qo‘qon (XVIII–XIX)</b>.'}
  ],
  yordamchi:[
    {s:'Nega xaritadagi chegaralar sxematik?', j:'Qadimgi va o‘rta asr davlatlarining chegaralari chiziq bilan belgilanmagan, ko‘pincha urushlar va sulolalar almashishi bilan o‘zgarib turgan. Tarixiy atlaslar ham ularni taxminiy ko‘rsatadi. Shu sababli sahnada chegaralar faqat umumiy tasavvur beradi.', kalit:['chegara','sxematik','xarita']},
    {s:'Somoniylar 819-yilda boshlanganmi yoki 875-yilda?', j:'Ikkala sana ham manbalarda uchraydi. 819-yilda Somonxudotning nabiralari Samarqand, Farg‘ona, Shosh va Hirotga hokim etib tayinlangan. 875-yilda Nasr I butun Movarounnahr noibligini olgan. Shuning uchun ba’zi kitoblar 819, boshqalari 875 sanasini beradi.', kalit:['somoniy','819','875']},
    {s:'Satraplik nima?', j:'Ahamoniylar davlatidagi yirik viloyat; uni shoh tayinlagan satrap boshqargan, viloyat soliq to‘lagan va qo‘shin bergan.', kalit:['satrap']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega xaritada o‘rganamiz?', xatboshilar:[
      'O‘zbekiston hududi Amudaryo va Sirdaryo oralig‘ida, qadimdan dehqonchilik vohalari va karvon yo‘llari kesishgan joyda joylashgan. Yunon manbalarida bu yerlar Sug‘diyona va Baqtriya, arab manbalarida Movarounnahr — «daryoning narigi tomoni» deb atalgan. Shu sababli hudud ko‘p marta turli davlatlar tarkibiga kirgan yoki o‘zi yirik davlatlar markaziga aylangan.',
      'Tarixni faqat sanalar ro‘yxati sifatida yodlash qiyin. Xarita esa ikki savolga birdaniga javob beradi: «qachon?» va «qayerda?». Bu darsda sakkizta davrni ketma-ket ko‘rib chiqamiz va har birida hududni kim boshqargani, markaz qaysi shahar bo‘lgani va qanday muhim voqealar sodir bo‘lganini aniqlaymiz.',
      'Muhim ogohlantirish: sahnadagi chegaralar sxematik. Qadimgi va o‘rta asr davlatlarining chegaralari aniq chiziq bilan belgilanmagan, ular urushlar, meros bo‘linishlari va sulolalar almashishi bilan tez-tez o‘zgargan. Tarixiy atlaslar ham ularni taxminiy tasvirlaydi. Shuning uchun xarita aniq geografik o‘lchov uchun emas, davrlarni solishtirish uchun mo‘ljallangan.'
    ]},
    {sarlavha:'Qadimgi davr: Ahamoniylar va Aleksandr', xatboshilar:[
      'Ahamoniylar davlatiga mil. av. 550-yilda Kir II asos solgan. Keyingi o‘n yilliklarda Ahamoniylar O‘rta Osiyoning janubiy qismini egallagan. Yunon tarixchisi Gerodotning yozishicha, Kir II mil. av. 530-yilda massagetlarga qarshi yurishda halok bo‘lgan. Doro I ning Behistun qoya yozuvida Baqtriya, Sug‘d va Xorazm davlat viloyatlari qatorida tilga olinadi; Persepol saroyi bo‘rtma tasvirlarida esa bu viloyatlardan kelgan elchilar sovg‘a olib kelayotgani tasvirlangan.',
      'Viloyatlar satrapliklar deb atalgan va ularni shoh tayinlagan satraplar boshqargan. Satrapliklar soliq to‘lagan va qo‘shinga askar bergan. Davlat markazlari hozirgi Eron hududida — Pasargada, Suza va Persepolda joylashgan. Mil. av. 330-yilda Doro III halok bo‘lgach, Ahamoniylar davlati tugagan.',
      'Makedoniyalik Aleksandr mil. av. 329-yilda Amudaryodan o‘tib, Sug‘diyonaga kirgan va Marokandani — hozirgi Samarqandni egallagan. Sirdaryo bo‘yida u Aleksandriya Esxata («Eng chekka Aleksandriya») shahriga asos solgan; bu shahar hozirgi Xo‘jand o‘rnida bo‘lgan deb hisoblanadi. Sug‘dda Spitamen boshchiligida qattiq qarshilik ko‘rsatilgan va u mil. av. 328-yilgacha davom etgan.',
      'Mil. av. 327-yilda Aleksandr baqtriyalik Roksanaga uylangan va shu yili Hindistonga yurish boshlagan. U mil. av. 323-yilda Bobilda vafot etgan. Sahnadagi «mil. av. 329–327» oralig‘i Aleksandrning O‘rta Osiyodagi harbiy harakatlarini bildiradi. Keyin hudud Salavkiylar va Yunon-Baqtriya davlati tarkibiga o‘tgan.'
    ]},
    {sarlavha:'Somoniylar va Amir Temur', xatboshilar:[
      'VIII asrda Movarounnahr Arab xalifaligi tarkibiga kirgan. IX asrda mahalliy Somoniylar sulolasi kuchaygan. 819-yilda Somonxudotning nabiralari Samarqand, Farg‘ona, Shosh (Toshkent) va Hirotga hokim etib tayinlangan, 875-yilda Nasr I butun Movarounnahr noibi bo‘lgan. Shu sababli davlat boshlanishi manbalarda 819 yoki 875-yil deb beriladi. Ismoil Somoniy (892–907) davrida poytaxt Buxoro bo‘lgan va davlat Xurosonni ham qamrab olgan.',
      'Somoniylar davrida Buxoro ilm-fan va adabiyot markaziga aylangan. Shoir Rudakiy saroyda ijod qilgan, Ibn Sino 980-yilda Buxoro yaqinidagi Afshona qishlog‘ida tug‘ilgan. X asrda qurilgan Ismoil Somoniy maqbarasi Markaziy Osiyodagi eng qadimiy saqlangan islom me’morchiligi yodgorliklaridan biri. 999-yilda Buxoroni Qoraxoniylar egallagan va Somoniylar davlati amalda tugagan.',
      'Amir Temur 1336-yilda Kesh (Shahrisabz) yaqinidagi Xo‘ja Ilg‘or qishlog‘ida tug‘ilgan. 1370-yilda Balxda o‘tkazilgan qurultoyda hukmdor deb e’lon qilingan va Samarqandni poytaxt qilgan. U To‘xtamishga qarshi (1391, 1395), Hindistonga (1398) yurishlar qilgan, 1402-yilda Anqara yonida Usmonli sultoni Boyazid I qo‘shinini yenggan. Temur 1405-yil fevralida Xitoyga yurish paytida O‘trorda vafot etgan.',
      'Temur davrida Samarqandda Bibixonim masjidi (1399–1404) qurilgan. Uning avlodlari — Temuriylar davrida Ulug‘bek Samarqandda rasadxona va madrasa qurdirgan. Temuriylar sulolasi Movarounnahrda 1500–1501-yillargacha, Xurosonda (Hirot) 1507-yilgacha hukm surgan.'
    ]},
    {sarlavha:'Uch davlat davri', xatboshilar:[
      'XVI asr boshida Muhammad Shayboniyxon boshchiligidagi Shayboniylar Movarounnahrni egallagan: 1500-yilda Samarqand olingan. Buxoro xonligi shunday shakllangan va 1533-yildan poytaxti Buxoro bo‘lgan. Keyinroq hokimiyat Ashtarxoniylar (Joniylar), XVIII asrda Mang‘itlar sulolasiga o‘tgan. 1785-yilda Shohmurod davrida davlat amirlik deb atala boshlagan — Buxoro amirligi 1920-yilgacha mavjud bo‘lgan.',
      'Xorazmda 1511-yilda Arabshohiylar sulolasi mustaqil xonlikka asos solgan. Poytaxt dastlab Urganch bo‘lgan, XVII asr boshida Xivaga ko‘chirilgan (manbalarda aniq yil turlicha beriladi). XIX asrda Qo‘ng‘irotlar sulolasi hukmronlik qilgan. Farg‘ona vodiysida 1709-yilda Shohruhbiy Qo‘qon davlatiga asos solgan; hukmdorlar «xon» unvonini XIX asr boshida, Olimxon davrida qabul qilgan.',
      'Sahnada bu davr umumlashtirib «XVI asr – 1920» deb berilgan: XVI asr boshi — Shayboniylarning Movarounnahrni egallashi, 1920 — Buxoro amirligi va Xiva xonligining tugatilishi. Aslida uch davlatning sanalari har xil: Buxoro 1868-yilda, Xiva xonligi 1873-yilda protektoratga aylangan va ikkalasi 1920-yilgacha saqlangan, Qo‘qon xonligi 1876-yilda tugatilgan. Manbadagi xaritada uch xonlik ajratilmagan — ular bitta hudud sifatida ko‘rsatilgan.'
    ]},
    {sarlavha:'Turkiston general-gubernatorligi va O‘zbekiston SSR', xatboshilar:[
      '1865-yilda Rossiya imperiyasi qo‘shinlari Toshkentni egallagan, 1867-yilda esa markazi Toshkent bo‘lgan Turkiston general-gubernatorligi tuzilgan. Birinchi general-gubernator K. P. fon Kaufman (1867–1882). 1868-yilda Samarqand egallangan va Buxoro amirligi protektoratga aylangan, 1873-yilda Xiva xonligi ham protektorat bo‘lgan, 1876-yilda Qo‘qon xonligi tugatilib, Farg‘ona viloyati tuzilgan. XIX asr oxirida hududga temir yo‘l yetib kelgan.',
      '1917-yildagi inqilobiy o‘zgarishlardan keyin general-gubernatorlik tugagan. 1918-yilda Turkiston ASSR e’lon qilingan, 1920-yilda Buxoro amirligi va Xiva xonligi o‘rnida Buxoro va Xorazm Xalq Sovet Respublikalari tuzilgan. 1924-yil 27-oktabrda milliy-hududiy bo‘linish natijasida O‘zbekiston SSR tashkil etilgan.',
      'O‘zbekiston SSR ning poytaxti 1925–1930-yillarda Samarqand, 1930-yildan Toshkent bo‘lgan. 1936-yilda Qoraqalpog‘iston ASSR respublika tarkibiga kiritilgan. 1966-yil 26-aprelda Toshkentda kuchli zilzila bo‘lgan va shahar markazining katta qismi qayta qurilgan.'
    ]},
    {sarlavha:'Mustaqil O‘zbekiston va ko‘p uchraydigan xatolar', xatboshilar:[
      '1991-yil 31-avgustda O‘zbekiston Respublikasi Oliy Kengashi davlat mustaqilligini e’lon qilgan; 1-sentabr Mustaqillik kuni sifatida nishonlanadi. 1991-yil 29-dekabrda referendum va Prezident saylovi o‘tkazilgan. 1992-yil 2-martda O‘zbekiston BMT a’zoligiga qabul qilingan, 8-dekabrda Konstitutsiya qabul qilingan. 2023-yil 30-aprelda referendum orqali Konstitutsiyaning yangi tahriri qabul qilingan.',
      'Birinchi keng tarqalgan xato — miloddan avvalgi yillarni teskari o‘qish. Mil. av. 550-yil mil. av. 330-yildan oldin keladi: miloddan avvalgi davrda son qancha katta bo‘lsa, voqea shuncha qadimiy. Ikkinchi xato — Amir Temur davlati bilan Temuriylar sulolasini bir xil deb hisoblash: Temur 1405-yilda vafot etgan, sulola esa Xurosonda (Hirot) 1507-yilgacha hukm surgan.',
      'Sanalarni to‘g‘ri hisoblashda yana bir nozik jihat bor: tarixiy xronologiyada «0-yil» yo‘q, mil. av. 1-yildan keyin darhol milodiy 1-yil keladi. Shuning uchun miloddan avvalgi va milodiy sanalar orasidagi farqni topishda ikkala sonni qo‘shib, 1 ayiriladi. Masalan, Aleksandr Marokandani egallagan mil. av. 329-yildan Amir Temur hukmdor deb e’lon qilingan 1370-yilgacha 329 + 1370 − 1 = 1698 yil o‘tgan.',
      'Uchinchi xato — Buxoro xonligi va Buxoro amirligini aralashtirish: amirlik 1785-yildan Mang‘itlar davrida shunday atala boshlagan. To‘rtinchi xato — xaritadagi chegaralarni aniq deb qabul qilish. Sahnadagi chegaralar sxematik, aniq ma’lumot uchun tarixiy atlaslar va darsliklardagi xaritalarni solishtirish kerak.'
    ]}
  ],
  formulalar:[
    ['mil. av. 550 → mil. av. 330','Ahamoniylar: miloddan avvalgi yillar kamayib boradi'],
    ['Davomiylik = 550 − 330 = 220 yil','Miloddan avvalgi ikki sana orasidagi farq'],
    ['mil. av. 329 dan 1991 gacha = 329 + 1991 − 1 = 2319 yil','Milodiy va miloddan avvalgi sana orasida: «0-yil» yo‘qligi sababli 1 ayiriladi'],
    ['XIV asr = 1301–1400-yillar','Asrni aniqlash: yil sonining yuzlar qismi + 1 (00 bilan tugaydigan yillardan tashqari: 1400-yil — XIV asr)']
  ],
  qiziqarli:[
    'Doro I ning Behistun yozuvida (mil. av. VI asr oxiri) Baqtriya, Sug‘d va Xorazm nomlari qayd etilgan — bu O‘zbekiston hududi haqidagi eng qadimgi yozma ma’lumotlardan biri.',
    'Aleksandr Sirdaryo bo‘yida asos solgan shahar «Aleksandriya Esxata», ya’ni «Eng chekka Aleksandriya» deb atalgan.',
    'Buxorodagi Ismoil Somoniy maqbarasi X asrda qurilgan va hozirgacha saqlanib qolgan.',
    '1990-yilda Xivadagi Ichan qal’a O‘zbekistondan birinchi bo‘lib YUNESKO Butunjahon merosi ro‘yxatiga kiritilgan.',
    'O‘zbekiston SSR ning birinchi poytaxti Toshkent emas, Samarqand bo‘lgan (1925–1930).'
  ],
  lugat:[
    ['Satraplik','Ahamoniylar davlatidagi viloyat; satrap boshqargan.'],
    ['Movarounnahr','Arab manbalarida Amudaryo va Sirdaryo oralig‘idagi hudud nomi.'],
    ['Sulola','Hokimiyat avloddan avlodga o‘tgan hukmdorlar oilasi.'],
    ['Qurultoy','Hukmdor saylash yoki muhim masalalarni hal qilish uchun yig‘in.'],
    ['Xonlik','Xon boshqargan davlat.'],
    ['Amirlik','Amir boshqargan davlat; Buxoroda 1785-yildan.'],
    ['Protektorat','Ichki boshqaruvi saqlanib, tashqi siyosati boshqa davlat nazoratida bo‘lgan davlat.'],
    ['General-gubernatorlik','Rossiya imperiyasida bir necha viloyatni birlashtirgan ma’muriy birlik.'],
    ['Mustaqillik','Davlatning ichki va tashqi siyosatini o‘zi belgilashi.'],
    ['Sxematik chegara','Taxminiy, soddalashtirilgan chegara chizig‘i.']
  ],
  manba:TD+'; '+TW+'; Doro I ning Behistun yozuvi (satrapliklar ro‘yxati). Somoniylar boshlanishi manbalarda 819 yoki 875-yil; Qo‘qon xonligi boshlanishi 1709 (davlat) yoki XIX asr boshi (xon unvoni); Xivaning poytaxt bo‘lgan yili turlicha beriladi — matnda ochiq aytilgan.',
  ishlanma:{
    sinf:'8–11-sinf (umumlashtiruvchi takrorlash)', vaqt:'45 daqiqa', tur:'Bilimlarni umumlashtirish va tizimlashtirish', usul:'Interaktiv xarita, «vaqt chizig‘i» tuzish, guruhlarda ishlash',
    maqsad:{talimiy:'O‘zbekiston hududidagi asosiy davlatlarni xronologik tartibda, yillari, poytaxtlari va muhim voqealari bilan umumlashtirish.',
      tarbiyaviy:'Vatan tarixiga hurmat, tarixiy manbaga tanqidiy va faktik yondashuvni tarbiyalash.',
      rivojlantiruvchi:'Xronologik fikrlash, xarita bilan ishlash, turli manbalardagi sanalarni solishtirish ko‘nikmasini rivojlantirish.'},
    natijalar:['8 davrni to‘g‘ri xronologik tartibda joylashtiradi','Har bir davr poytaxti yoki markazini aytadi','Miloddan avvalgi va milodiy sanalar orasidagi farqni hisoblaydi','Manbalarda sanalar nega farq qilishini tushuntiradi'],
    jihozlar:['MAKON sahnasi «Davlatlar xaritasi»','Proyektor yoki interaktiv doska','Vaqt chizig‘i uchun lenta va kartochkalar','Tarixiy atlas','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Samarqand qaysi davlatlarda poytaxt bo‘lgan?» savoli.','Taxmin aytadi.'],
      ['8–25','<b>Xarita bo‘ylab sayohat.</b> MAKON da 8 davrni ketma-ket ochadi, shaharlarni bosadi, chegaralar sxematik ekanini tushuntiradi.','Jadval to‘ldiradi: davr, yillar, markaz, voqea.'],
      ['25–33','<b>Vaqt chizig‘i.</b> Guruhlar kartochkalarni tartiblaydi, mil. av. sanalar bilan ishlaydi.','Guruhda tartiblaydi va himoya qiladi.'],
      ['33–38','<b>Zid sanalar.</b> Somoniylar (819/875), Qo‘qon (1709/XIX asr boshi) misolida manbalarni solishtiradi.','Sabablarini muhokama qiladi.'],
      ['38–43','<b>Mustahkamlash.</b> MAKON «Xaritadagi davlat qaysi?» mashqi va test.','Mashq va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Satraplik','Ahamoniylar viloyati.'],['Sulola','Hukmdorlar oilasi.'],['Protektorat','Tashqi siyosati boshqa davlat nazoratidagi davlat.'],['Amirlik','Amir boshqargan davlat.'],['Movarounnahr','Ikki daryo oralig‘i.']],
    savollar:[['Somoniylar poytaxti?','Buxoro'],['Amir Temur davlati yillari?','1370–1405'],['Turkiston general-gubernatorligi markazi?','Toshkent'],['O‘zbekiston SSR ning 1925–1930-yillardagi poytaxti?','Samarqand'],['Mustaqillik e’lon qilingan sana?','1991-yil 31-avgust']],
    uy:'Darslikdagi tegishli mavzularni takrorlash; (1) 8 davr uchun vaqt chizig‘i chizish; (2) mil. av. 550 va 1370-yil orasida necha yil o‘tganini hisoblash (javob: 1919 yil); (3) o‘z shahringiz yoki viloyatingiz qaysi davrlarda qaysi davlat tarkibida bo‘lganini yozish.',
    manba:TD+'; '+TW
  }
},

/* ============ 2. NOTALAR, OKTAVA VA GAMMA ============ */
'musiqa-notalar': {
  fan:'musiqa', qisqaNom:'Notalar', nom:'Notalar, oktava va gamma',
  qisqa:'5–7-sinf · Musiqa madaniyati · musiqa savodi',
  sahna:'piano',
  kor:{
    sarlavha:'Har bir klavish — aniq chastota',
    matn:'Musiqiy tovush havoning tebranishidir, uning balandligi esa tebranish chastotasi bilan belgilanadi. Pianinoda yettita asosiy nota — Do, Re, Mi, Fa, Sol, La, Si — oq klavishlarda takrorlanib turadi, qora klavishlar esa ular orasidagi yarim tonlarni beradi. Bir oktava yuqoridagi xuddi shu nota chastotasi roppa-rosa ikki marta katta. Klavishlarni bosing, chastotani ko‘ring va Do-major gammasini tinglang.',
    punktlar:['<b>7 ta nota nomi:</b> Do, Re, Mi, Fa, Sol, La (Lya), Si — lotincha C, D, E, F, G, A, B','<b>Oktavada 12 ta yarim ton:</b> 7 oq + 5 qora klavish','<b>Oktava:</b> chastota 2 marta ortadi (La4 = 440 Hz, La5 = 880 Hz)','<b>Teng temperatsiya:</b> f = 440·2^((n − 49)/12), n — pianino klavish raqami']
  },
  bolimlar:[
    {sarlavha:'4-oktava (Do4 – Si4) chastotalari', jadval:[
      ['Do4 (C4) · n = 40','261,63 Hz — «birinchi oktava Do», pianino o‘rtasidagi Do'],
      ['Do#4 (C#4) · n = 41','277,18 Hz'],
      ['Re4 (D4) · n = 42','293,66 Hz'],
      ['Re#4 (D#4) · n = 43','311,13 Hz'],
      ['Mi4 (E4) · n = 44','329,63 Hz'],
      ['Fa4 (F4) · n = 45','349,23 Hz'],
      ['Fa#4 (F#4) · n = 46','369,99 Hz'],
      ['Sol4 (G4) · n = 47','392,00 Hz'],
      ['Sol#4 (G#4) · n = 48','415,30 Hz'],
      ['La4 (A4) · n = 49','440,00 Hz — sozlash etaloni'],
      ['La#4 (A#4) · n = 50','466,16 Hz'],
      ['Si4 (B4) · n = 51','493,88 Hz']
    ], matn:'Qiymatlar teng temperatsiya formulasi bilan 2 xona aniqlikda hisoblangan. 5-oktavadagi har bir nota chastotasi shu jadvaldagidan 2 marta katta: Do5 = 523,25 Hz, Mi5 = 659,26 Hz, La5 = 880 Hz, Si5 = 987,77 Hz.'},
    {sarlavha:'Nota nomlari: uch xil yozuv', jadval:[
      ['Do','C · rus an’anasida «до», italyancha eskicha «Ut»'],
      ['Re','D'],['Mi','E'],['Fa','F'],['Sol','G'],
      ['La (Lya)','A · o‘zbek va rus darsliklarida ko‘pincha «Lya»'],
      ['Si','B · nemis an’anasida «H», «B» esa Si-bemol'],
      ['Diyez (♯)','Notani yarim tonga oshiradi: Do# = Do-diyez'],
      ['Bemol (♭)','Notani yarim tonga pasaytiradi: Re♭ = Do# (teng temperatsiyada bir klavish)']
    ]},
    {sarlavha:'Do-major gammasi va akkordi', jadval:[
      ['Gamma tovushlari','Do – Re – Mi – Fa – Sol – La – Si – Do'],
      ['Qadamlar tuzilishi','ton – ton – yarim ton – ton – ton – ton – yarim ton'],
      ['Yarim ton qayerda?','Mi–Fa va Si–Do orasida: ular orasida qora klavish yo‘q'],
      ['Do-major uch tovushligi (akkord)','Do – Mi – Sol (C – E – G)'],
      ['Akkord chastotalari (4-oktava)','261,63 · 329,63 · 392,00 Hz — nisbati taxminan 4 : 5 : 6'],
      ['Belgilari','Do-majorda diyez ham, bemol ham yo‘q — faqat oq klavishlar']
    ]},
    {sarlavha:'Tovush fizikasi raqamlarda', jadval:[
      ['Yarim ton nisbati','2^(1/12) ≈ 1,0595'],
      ['Oktava nisbati','2 : 1'],
      ['Sof kvinta (Do–Sol) teng temperatsiyada','2^(7/12) ≈ 1,4983 (sof nisbat 3/2 = 1,5)'],
      ['Tovush tezligi havoda (20 °C)','≈343 m/s'],
      ['La4 to‘lqin uzunligi','λ = v/f ≈ 343/440 ≈ 0,78 m'],
      ['Inson eshitish oralig‘i','taxminan 20 Hz – 20 000 Hz (yosh bilan yuqori chegara pasayadi)'],
      ['Standart pianino','88 klavish: La0 (27,5 Hz) dan Do8 (4186 Hz) gacha']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Pianino klaviaturasi', matn:'Oq klavishlar yetti nota nomini takrorlaydi: Do, Re, Mi, Fa, Sol, La, Si. Qora klavishlar ikki va uchtadan guruhlangan. Ikki qora klavishli guruhning chap tomonidagi oq klavish — har doim Do.', nota:'Do4'},
    {sarlavha:'La4 — sozlash etaloni', matn:'La4 chastotasi 440 Hz. Bu qiymat xalqaro standart (ISO 16) sifatida qabul qilingan va orkestrlar shu nota bo‘yicha sozlanadi. Klavishni bosib tinglang.', nota:'La4'},
    {sarlavha:'Oktava', matn:'La5 ni bosing: 880 Hz — La4 dan roppa-rosa 2 marta katta. Quloq ikki tovushni «bir xil nota, faqat balandroq» deb eshitadi. Shu 2 : 1 nisbat oktava deyiladi.', nota:'La5'},
    {sarlavha:'Yarim ton va diyez', matn:'Do4 va Do#4 orasidagi masofa — yarim ton. Teng temperatsiyada har bir yarim ton chastotani 2^(1/12) ≈ 1,0595 marta oshiradi: 261,63 · 1,0595 ≈ 277,18 Hz. 12 ta yarim ton ketma-ket ko‘paytirilsa, roppa-rosa 2 chiqadi.', nota:'Do#4'},
    {sarlavha:'Mi va Fa orasida qora klavish yo‘q', matn:'Mi–Fa va Si–Do juftliklari orasida qora klavish yo‘q, ya’ni ular orasidagi masofa atigi yarim ton. Qolgan qo‘shni oq klavishlar orasida bir ton (ikki yarim ton).', nota:'Mi4'},
    {sarlavha:'Do-major gammasi va akkordi', matn:'«Do-major gammasi» tugmasini bosing: Do–Re–Mi–Fa–Sol–La–Si–Do. Qadamlar: ton, ton, yarim ton, ton, ton, ton, yarim ton. So‘ng «Do-major akkordi» — Do, Mi, Sol birga yangraydi.', nota:'Do5'}
  ],
  amaliyot:{tur:'shart', sarlavha:'Notani chaling',
    topshiriqlar:[
      {shart:'<b>La4</b> notasini chaling — 440 Hz.', hodisa:'nota', kod:"ev.nom==='La' && ev.oktava===4", izoh:'Bu xalqaro sozlash etaloni: <b>La4 = 440 Hz</b>.'},
      {shart:'<b>Mi5</b> ni chaling.', hodisa:'nota', kod:"ev.nom==='Mi' && ev.oktava===5", izoh:'Mi5 ≈ <b>659,26 Hz</b> — Mi4 (329,63 Hz) dan 2 marta katta.'},
      {shart:'Pianino o‘rtasidagi <b>Do4</b> ni toping: ikki qora klavishli guruhning chap tomonidagi oq klavish.', hodisa:'nota', kod:"ev.nom==='Do' && ev.oktava===4", izoh:'Do4 ≈ <b>261,63 Hz</b>, klavish raqami n = 40.'},
      {shart:'Chastotasi <b>800 Hz dan katta</b> bo‘lgan istalgan notani chaling.', hodisa:'nota', kod:"ev.chastota>800", izoh:'Sahnadagi 800 Hz dan yuqori notalar: <b>Sol#5 (830,61), La5 (880), La#5 (932,33), Si5 (987,77)</b>.'},
      {shart:'<b>Fa#4</b> (Fa-diyez) ni chaling — bu qora klavish.', hodisa:'nota', kod:"ev.nom==='Fa#' && ev.oktava===4 && ev.qora", izoh:'Fa#4 ≈ <b>369,99 Hz</b>; Fa va Sol oq klavishlari orasidagi qora klavish.'}
    ]},
  test:[
    {s:'La4 notasining standart chastotasi?', v:['261,63 Hz','400 Hz','440 Hz','880 Hz'], t:2, izoh:'<b>440 Hz</b> (ISO 16). 880 Hz — La5.'},
    {s:'Bir oktava yuqoriga ko‘tarilganda chastota qanday o‘zgaradi?', v:['12 Hz ga ortadi','2 marta ortadi','1,5 marta ortadi','o‘zgarmaydi'], t:1, izoh:'Oktava — chastotalar nisbati <b>2 : 1</b>.'},
    {s:'Bir oktavada nechta yarim ton bor?', v:['7','8','12','5'], t:2, izoh:'<b>12 ta</b>: 7 oq va 5 qora klavish.'},
    {s:'Qaysi juftlik orasida qora klavish yo‘q?', v:['Do–Re','Mi–Fa','Sol–La','La–Si'], t:1, izoh:'<b>Mi–Fa</b> (va Si–Do) — ular orasida yarim ton.'},
    {s:'Do-major uch tovushligi qaysi notalardan iborat?', v:['Do–Re–Mi','Do–Fa–La','Do–Mi–Sol','Re–Fa–La'], t:2, izoh:'<b>Do – Mi – Sol</b> (C – E – G).'},
    {s:'Lotin harfli yozuvda «Sol» qaysi harf?', v:['S','G','F','A'], t:1, izoh:'Do–C, Re–D, Mi–E, Fa–F, <b>Sol–G</b>, La–A, Si–B.'},
    {s:'Teng temperatsiyada qo‘shni yarim tonlar chastotalari nisbati?', v:['2','1,5','2^(1/12) ≈ 1,0595','12'], t:2, izoh:'<b>2^(1/12) ≈ 1,0595</b>; 12 marta ko‘paytirilsa 2 chiqadi.'},
    {s:'Do-major gammasi qadamlari qaysi?', v:['ton-ton-ton-yarim-ton-ton-yarim','ton-ton-yarim-ton-ton-ton-yarim','yarim-ton-ton-ton-yarim-ton-ton','ton-yarim-ton-ton-yarim-ton-ton'], t:1, izoh:'<b>T–T–Y–T–T–T–Y</b>: yarim tonlar Mi–Fa va Si–Do da.'}
  ],
  yordamchi:[
    {s:'Nima uchun «La» ba’zan «Lya» deb yoziladi?', j:'O‘zbek musiqa darsliklarida rus an’anasi ta’sirida «Lya» shakli keng qo‘llanadi, italyan va xalqaro yozuvda esa «La». Ikkalasi bir nota — lotin harfida A.', kalit:['lya','la']},
    {s:'Formuladagi n nima?', j:'n — standart 88 klavishli pianinoda chapdan sanalgan klavish tartib raqami: La0 = 1, Do4 = 40, La4 = 49, Do8 = 88. f = 440·2^((n − 49)/12). Masalan, Do5 uchun n = 52: 440·2^(3/12) ≈ 523,25 Hz.', kalit:['formula','chastota','n']},
    {s:'Teng temperatsiya nima?', j:'Oktavani 12 ta teng nisbatli yarim tonga bo‘lish usuli. Uning afzalligi — istalgan tonallikda bir xil chalish mumkin. Kamchiligi: kvinta va tersiyalar tabiiy (butun sonli) nisbatlardan biroz farq qiladi, masalan kvinta 1,4983 va 1,5.', kalit:['temperatsiya']}
  ],
  maqola:[
    {sarlavha:'Kirish: tovush va nota', xatboshilar:[
      'Har qanday tovush — muhit (masalan, havo) zarralarining tebranishi. Tor, ovoz paychalari yoki karnay membranasi tebranganda havoda bosim to‘lqinlari hosil bo‘ladi va ular qulog‘imizga yetib keladi. Bir soniyadagi tebranishlar soni chastota deyiladi va gersda (Hz) o‘lchanadi. Chastota qancha katta bo‘lsa, tovush shuncha baland (ingichka) eshitiladi.',
      'Musiqada tovush balandligi notalar bilan belgilanadi. Nota — ma’lum balandlikdagi tovushning nomi va yozuvdagi belgisi. Yevropa musiqa an’anasida oktava ichida yettita asosiy nota nomi bor: Do, Re, Mi, Fa, Sol, La, Si. Ular pianinoning oq klavishlarida takrorlanib boradi.',
      'Inson qulog‘i taxminan 20 Hz dan 20 000 Hz gacha bo‘lgan tovushlarni eshitadi, yuqori chegara yosh o‘tgan sari pasayadi. Standart 88 klavishli pianino eng past La0 (27,5 Hz) dan eng baland Do8 (≈4186 Hz) gacha bo‘lgan tovushlarni chiqaradi. Sahnadagi pianino ikki oktavani — Do4 dan Si5 gacha ko‘rsatadi: bu oraliq ko‘p qo‘shiqlar kuylanadigan balandlikka to‘g‘ri keladi.'
    ]},
    {sarlavha:'Nota nomlari qayerdan kelgan?', xatboshilar:[
      'Nota nomlari XI asrda yashagan italiyalik musiqa nazariyotchisi Gvido d’Arestso nomi bilan bog‘liq. U o‘quvchilarga kuylarni tez o‘rgatish uchun lotincha «Ut queant laxis» madhiyasidan foydalangan: madhiyaning har bir qatori bir pog‘ona baland notadan boshlanadi va shu qatorlarning birinchi bo‘g‘inlari — ut, re, mi, fa, sol, la — nota nomlariga aylangan.',
      'Keyinchalik, XVII asrda, qo‘shiq aytishga noqulay «ut» bo‘g‘ini ko‘pchilik mamlakatlarda «do» bilan almashtirilgan. Yettinchi nota «si» ham keyinroq qo‘shilgan; u madhiyadagi «Sancte Iohannes» so‘zlarining bosh harflaridan olingan deb tushuntiriladi. Fransiyada «ut» shakli ba’zan hozir ham uchraydi.',
      'Ingliz va nemis tilli mamlakatlarda notalar lotin harflari bilan yoziladi: C, D, E, F, G, A, B. Bu yozuvda tartib La (A) dan boshlanadi — tarixan eng qadimgi tovush qatori A dan boshlangan. Nemis an’anasida esa Si notasi H harfi bilan, B harfi bilan esa Si-bemol belgilanadi. O‘zbek va rus darsliklarida La notasi ko‘pincha «Lya» deb yoziladi.'
    ]},
    {sarlavha:'Oktava va yarim ton', xatboshilar:[
      'Agar bir notaning chastotasini roppa-rosa ikki marta oshirsak, quloq yangi tovushni «o‘sha nota, faqat balandroq» deb qabul qiladi. Chastotalari 2 : 1 nisbatdagi ikki tovush orasidagi masofa oktava deyiladi. Shuning uchun La4 (440 Hz) va La5 (880 Hz) bir xil nomga ega. Oktava raqami notaning qaysi qatorda ekanini bildiradi: xalqaro yozuvda pianino o‘rtasidagi Do — Do4 (C4).',
      'Pianinoda bir oktava ichida 12 ta klavish bor: 7 ta oq va 5 ta qora. Qo‘shni ikki klavish orasidagi masofa yarim ton, ikki yarim ton esa bir ton deyiladi. Qora klavishlar oq klavish nomiga diyez (♯) yoki bemol (♭) belgisi qo‘shib nomlanadi: Do va Re orasidagi qora klavish — Do-diyez yoki Re-bemol.',
      'E’tibor bering: Mi va Fa, shuningdek Si va Do orasida qora klavish yo‘q. Demak, bu juftliklar orasidagi masofa atigi yarim ton. Qolgan barcha qo‘shni oq klavishlar orasida bir ton. Aynan shu notekislik tufayli qora klavishlar ikkitalik va uchtalik guruhlarga bo‘lingan va pianinoda Do ni oson topish mumkin: u ikki qora klavishli guruhning chap tomonida turadi.'
    ]},
    {sarlavha:'Teng temperatsiya va chastota formulasi', xatboshilar:[
      'Zamonaviy pianinolar teng temperatsiyada sozlanadi: oktava 12 ta teng nisbatli yarim tonga bo‘linadi. Har bir yarim ton chastotani bir xil songa — 2 ning 12-darajali ildiziga ko‘paytiradi: 2^(1/12) ≈ 1,0595. Bu sonni o‘n ikki marta ketma-ket ko‘paytirsak, roppa-rosa 2 chiqadi, ya’ni bir oktava.',
      'Etalon sifatida La4 = 440 Hz olinadi; bu qiymat ISO tomonidan 1955-yilda tavsiya sifatida qabul qilingan va 1975-yilda ISO 16 standarti bilan tasdiqlangan. Standart 88 klavishli pianinoda klavishlarni chapdan 1 dan 88 gacha raqamlasak, La4 — 49-klavish. Istalgan klavish chastotasi f = 440·2^((n − 49)/12) formulasi bilan topiladi. Masalan, Do4 uchun n = 40: f = 440·2^(−9/12) ≈ 261,63 Hz. Mi5 uchun n = 56: f = 440·2^(7/12) ≈ 659,26 Hz.',
      'Teng temperatsiyaning afzalligi — musiqani istalgan notadan (istalgan tonallikda) bir xil sifatda chalish mumkin. Lekin u tabiiy tovush nisbatlaridan biroz farq qiladi: masalan, Do–Sol kvintasi tabiiy holatda 3/2 = 1,5, teng temperatsiyada esa ≈1,4983. Farq juda kichik, lekin tajribali quloq uni sezishi mumkin.',
      'Tovush to‘lqinining uzunligini ham hisoblash mumkin: λ = v/f. Havoda 20 °C da tovush tezligi ≈343 m/s, shuning uchun La4 ning to‘lqin uzunligi ≈343/440 ≈ 0,78 m, La5 niki esa ikki marta qisqa — ≈0,39 m.'
    ]},
    {sarlavha:'Gamma va akkord', xatboshilar:[
      'Gamma — oktava ichidagi notalarning balandlik bo‘yicha ketma-ket joylashuvi. Eng sodda misol Do-major gammasi: Do – Re – Mi – Fa – Sol – La – Si – Do. U faqat oq klavishlardan iborat, ya’ni unda diyez va bemol yo‘q. Qadamlari: ton, ton, yarim ton, ton, ton, ton, yarim ton. Istalgan notadan shu qadamlar bilan yurilsa, o‘sha notaning major gammasi hosil bo‘ladi, lekin unda qora klavishlar ham qatnashadi.',
      'Akkord — bir vaqtda yangraydigan uch yoki undan ortiq tovush. Do-major uch tovushligi Do, Mi va Sol notalaridan tuzilgan. Ularning chastotalari (261,63; 329,63; 392,00 Hz) taxminan 4 : 5 : 6 nisbatda — bunday oddiy nisbatlar quloqqa uyg‘un eshitiladi. Sahnadagi «Do-major akkordi» tugmasi aynan shu uch notani birga chaladi.',
      'O‘zbek mumtoz musiqasi ham boy nazariy merosga ega. Abu Nasr Forobiyning «Katta musiqa kitobi» (Kitob al-musiqa al-kabir) tovush nisbatlari va cholg‘ular haqidagi yirik asar hisoblanadi. O‘zbek va tojik xalqlarining «Shashmaqom» an’anasi YUNESKO ning nomoddiy madaniy meros ro‘yxatiga kiritilgan. Maqomlarning parda tizimi Yevropa teng temperatsiyasidan farq qilishi mumkin.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — oktavani «8 ta nota» deb, chastota farqini esa qo‘shish orqali hisoblash. Oktava nomi lotincha «sakkiz»dan kelgan (Do dan Do gacha 8 ta oq klavish), lekin unda 12 ta yarim ton bor va chastota 2 marta ko‘paytiriladi: La4 = 440 Hz bo‘lsa, La5 = 880 Hz, La6 esa 1320 emas, 1760 Hz.',
      'Ikkinchi xato — har bir oq klavish orasida qora klavish bor deb o‘ylash. Mi–Fa va Si–Do orasida qora klavish yo‘q. Uchinchi xato — Do4 ni pianinoning eng chap Do si deb hisoblash: aslida u o‘rtadagi Do, eng chapdagi Do esa Do1.',
      'To‘rtinchi xato — lotin harflarni alifbo tartibida notalar bilan moslash va A ni Do deb o‘ylash. To‘g‘risi: A — La, B — Si, C — Do. Bu moslikni yodlashning oson usuli: «Do — C, La — A».'
    ]}
  ],
  formulalar:[
    ['f = 440·2^((n − 49)/12)','Pianino n-klavishining chastotasi (teng temperatsiya, La4 = 440 Hz)'],
    ['f(k yarim ton yuqori) = f·2^(k/12)','k yarim tonga ko‘tarish'],
    ['f(oktava yuqori) = 2f','Oktava'],
    ['2^(1/12) ≈ 1,0595','Yarim ton nisbati'],
    ['λ = v / f','To‘lqin uzunligi; havoda v ≈ 343 m/s (20 °C)'],
    ['T = 1 / f','Tebranish davri: La4 uchun ≈2,27 ms']
  ],
  qiziqarli:[
    'Nota nomlari (ut, re, mi, fa, sol, la) XI asrda Gvido d’Arestso foydalangan lotincha madhiya qatorlarining birinchi bo‘g‘inlaridan olingan.',
    'La4 = 440 Hz ISO tomonidan 1955-yilda tavsiya sifatida qabul qilingan va 1975-yilda ISO 16 standarti bilan tasdiqlangan; tarixda sozlash etaloni turli shaharlarda farq qilgan.',
    'Standart pianinoda 88 klavish bor: 52 ta oq va 36 ta qora.',
    'La4 tovushining to‘lqin uzunligi taxminan 78 sm — o‘quvchi partasining uzunligiga yaqin.',
    'Nemis yozuvida B harfi Si-bemolni, H harfi esa Si ni bildiradi — shuning uchun Bax o‘z familiyasini notalar bilan «B–A–C–H» deb yoza olgan.'
  ],
  lugat:[
    ['Nota','Ma’lum balandlikdagi tovush nomi va uning yozuvdagi belgisi.'],
    ['Chastota','Bir soniyadagi tebranishlar soni; gers (Hz) da o‘lchanadi.'],
    ['Oktava','Chastotalari 2 : 1 nisbatdagi ikki bir nomli nota orasidagi masofa.'],
    ['Yarim ton','Pianinodagi qo‘shni ikki klavish orasidagi eng kichik masofa.'],
    ['Ton','Ikki yarim tonga teng masofa.'],
    ['Diyez (♯)','Notani yarim tonga oshirish belgisi.'],
    ['Bemol (♭)','Notani yarim tonga pasaytirish belgisi.'],
    ['Gamma','Oktava ichidagi notalarning ketma-ket qatori.'],
    ['Akkord','Bir vaqtda yangraydigan uch va undan ortiq tovush.'],
    ['Teng temperatsiya','Oktavani 12 ta teng nisbatli yarim tonga bo‘lish usuli.'],
    ['Solfedjio','Notalarni nomlari bilan kuylash mashqi.']
  ],
  manba:MD+'; Abu Nasr Forobiy «Kitob al-musiqa al-kabir»; YUNESKO nomoddiy madaniy meros ro‘yxati («Shashmaqom musiqasi», O‘zbekiston va Tojikiston). «Si» nomining kelib chiqishi va «ut»ning «do» ga almashtirilgan aniq sanasi manbalarda turlicha — shuning uchun umumiy tarzda berildi.',
  ishlanma:{
    sinf:'5–7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv pianino, eshitish tahlili, juftlikda hisoblash',
    maqsad:{talimiy:'Nota nomlari, oktava, yarim ton, diyez va bemol, Do-major gammasi va akkordi tushunchalarini o‘rgatish; nota va chastota bog‘lanishini ko‘rsatish.',
      tarbiyaviy:'Musiqa madaniyatiga, milliy va jahon musiqa merosiga qiziqish uyg‘otish.',
      rivojlantiruvchi:'Musiqiy eshitish, klaviaturada mo‘ljal olish va fanlararo (musiqa–fizika–matematika) fikrlashni rivojlantirish.'},
    natijalar:['Pianinoda istalgan oq va qora klavish nomini aytadi','Oktava va yarim ton tushunchasini chastota orqali tushuntiradi','Do-major gammasini va uch tovushligini chaladi','Solfedjio va lotin harfli nomlarni moslaydi'],
    jihozlar:['MAKON 3D sahnasi «Pianino»','Karnay yoki quloqchin','Proyektor','Klaviatura rasmi tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> La4 va La5 ni chalib: «Bu ikki tovushning nomi nega bir xil?»','Tinglaydi, taxmin qiladi.'],
      ['8–18','<b>Klaviatura.</b> MAKON da oq va qora klavishlar, Do ni topish, nota nomlari, lotin harflari.','Tarqatmaga nomlarni yozadi.'],
      ['18–26','<b>Oktava va yarim ton.</b> Chastotalarni ko‘rsatadi: 440 → 880 Hz; 2^(1/12).','Chastotalarni solishtiradi, Mi–Fa va Si–Do ni topadi.'],
      ['26–34','<b>Gamma va akkord.</b> Do-major gammasi va akkordini tinglash, qadamlar tuzilishi.','Gammani kuylaydi (solfedjio), qadamlarni belgilaydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON «Notani chaling» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Nota','Tovush nomi.'],['Oktava','Chastota 2 marta.'],['Yarim ton','Qo‘shni klavishlar masofasi.'],['Gamma','Notalar qatori.'],['Akkord','Birga yangraydigan tovushlar.']],
    savollar:[['La4 chastotasi?','440 Hz'],['Oktavada nechta yarim ton?','12'],['Qaysi oq klavishlar orasida qora klavish yo‘q?','Mi–Fa, Si–Do'],['Do-major akkordi notalari?','Do, Mi, Sol'],['«G» harfi qaysi nota?','Sol']],
    uy:'Darslikdagi mavzuni o‘qish; (1) Do-major gammasini solfedjio bilan kuylash; (2) La4 = 440 Hz dan foydalanib La3 va La6 chastotasini topish (javob: 220 Hz va 1760 Hz); (3) formulada n = 52 uchun chastotani hisoblash va qaysi nota ekanini aniqlash (javob: ≈523,25 Hz, Do5).',
    manba:MD
  }
},

/* ============ 3. OY FAZALARI ============ */
'astro-oy-fazalari': {
  fan:'astronomiya', qisqaNom:'Oy fazalari', nom:'Oy fazalari',
  qisqa:'5-sinf tabiatshunoslik/geografiya · 9–11-sinf astronomiya asoslari',
  sahna:'oy',
  kor:{
    sarlavha:'Oy shaklini o‘zgartirmaydi — biz uni har xil tomondan ko‘ramiz',
    matn:'Oy o‘zi nur chiqarmaydi, u Quyosh nurini qaytaradi. Oyning har doim yarmi yoritilgan bo‘ladi. Oy Yer atrofida aylanar ekan, biz uning yoritilgan yarmini goh to‘liq, goh qisman, goh umuman ko‘rmaymiz — shu ko‘rinishlar Oy fazalari deyiladi. Sahnada Oyni orbitaning 8 holatiga qo‘ying va o‘ng oynada uning Yerdan qanday ko‘rinishini kuzating.',
    punktlar:['<b>Sinodik oy</b> (fazalar to‘liq takrorlanishi) ≈ <b>29,53 kun</b>','<b>Siderik oy</b> (yulduzlarga nisbatan bir aylanish) ≈ <b>27,32 kun</b>','<b>O‘suvchi</b> fazalarda yoritilgan qism ortadi, <b>kamayuvchi</b> fazalarda kamayadi','Oy Yerga doim <b>bir tomoni</b> bilan qaragan']
  },
  bolimlar:[
    {sarlavha:'8 faza: vaziyat va ko‘rinish', jadval:[
      ['Yangi oy','Oy Quyosh va Yer orasida · yoritilgan tomoni Yerga teskari · ko‘rinmaydi'],
      ['O‘suvchi o‘roq','Yoritilgan qism <50 % va ortib bormoqda · kechqurun g‘arbda ko‘rinadi'],
      ['Birinchi chorak','Yarim disk yoritilgan · Quyosh–Yer–Oy burchagi 90° · tushdan keyin chiqadi, yarim tunda botadi'],
      ['O‘suvchi qavariq','Yoritilgan qism >50 % va ortib bormoqda'],
      ['To‘lin oy','Yer Quyosh va Oy orasida · butun disk yoritilgan · quyosh botganda chiqadi, tong otganda botadi'],
      ['Kamayuvchi qavariq','Yoritilgan qism >50 % va kamayib bormoqda'],
      ['Oxirgi chorak','Yarim disk yoritilgan (boshqa yarmi) · yarim tunda chiqadi, tushda botadi'],
      ['Kamayuvchi o‘roq','Yoritilgan qism <50 % va kamaymoqda · tongda sharqda ko‘rinadi']
    ], matn:'Shimoliy yarimsharda (O‘zbekistonda) o‘suvchi Oyning o‘ng tomoni, kamayuvchi Oyning chap tomoni yoritilgan ko‘rinadi. Janubiy yarimsharda bu teskari. Chiqish va botish vaqtlari taxminiy.'},
    {sarlavha:'Oy raqamlarda', jadval:[
      ['Diametri','≈3 475 km (Yernikining ≈0,27 qismi)'],
      ['Massasi','7,35·10²² kg (Yer massasining ≈0,0123 qismi)'],
      ['Yergacha o‘rtacha masofa','≈384 400 km (perigey ≈363 300 km, apogey ≈405 500 km)'],
      ['Sinodik oy','≈29,53 kun'],
      ['Siderik oy','≈27,32 kun'],
      ['Sirtdagi erkin tushish tezlanishi','≈1,62 m/s² (Yerdagidan ≈6 marta kichik)'],
      ['Orbitaning ekliptikaga qiyaligi','≈5,1°']
    ], matn:'Qiymatlar NASA «Moon Fact Sheet» dan yumaloqlangan.'},
    {sarlavha:'Sinodik va siderik oy farqi', jadval:[
      ['Siderik oy (27,32 kun)','Oy yulduzlarga nisbatan Yer atrofida bir marta to‘liq aylanadi'],
      ['Shu vaqt ichida','Yer Quyosh atrofida ≈27° siljiydi'],
      ['Qo‘shimcha ≈2,2 kun','Oy Quyoshga nisbatan avvalgi vaziyatga kelishi uchun yana yurishi kerak'],
      ['Sinodik oy (29,53 kun)','Bir yangi oydan keyingi yangi oygacha'],
      ['Formula','1/S = 1/T − 1/Y; T = 27,32, Y = 365,26 ⇒ S ≈ 29,53 kun']
    ]},
    {sarlavha:'Fazalar va tutilishlar', jadval:[
      ['Quyosh tutilishi','Faqat yangi oy fazasida bo‘lishi mumkin'],
      ['Oy tutilishi','Faqat to‘lin oy fazasida bo‘lishi mumkin'],
      ['Nega har oy emas?','Oy orbitasi Yer orbitasi tekisligiga ≈5,1° qiya: ko‘pincha Oy Yer soyasining ustidan yoki ostidan o‘tadi'],
      ['Tutilish va faza farqi','Faza — Oyning yoritilgan qismini ko‘rish burchagi; oy tutilishi — Yer soyasining Oyga tushishi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Yarmi doim yoritilgan', matn:'Quyosh nuri chap tomondan tushadi. Yer ham, Oy ham har doim Quyoshga qaragan yarmi bilan yoritilgan. Faza — bu yoritilgan yarmining Yerdan qancha qismi ko‘rinishi.', faza:'birinchi_chorak'},
    {sarlavha:'Yangi oy', matn:'Oy Quyosh bilan Yer orasida. Yoritilgan tomoni Yerga teskari, shuning uchun Oy ko‘rinmaydi; u Quyosh bilan deyarli bir vaqtda chiqib botadi. Quyosh tutilishi faqat shu fazada bo‘lishi mumkin.', faza:'yangi'},
    {sarlavha:'O‘suvchi o‘roq', matn:'Yangi oydan bir necha kun o‘tgach, quyosh botgandan keyin g‘arbda ingichka o‘roq ko‘rinadi. O‘zbekistonda uning o‘ng (Quyosh tomondagi) cheti yoritilgan. Hijriy oylar an’anaviy ravishda shu yangi hilolni kuzatish bilan boshlanadi.', faza:'osuvchi_orak'},
    {sarlavha:'Birinchi chorak', matn:'Yangi oydan ≈7,4 kun o‘tgach Oy orbitaning chorak qismini bosib o‘tadi: diskning yarmi yoritilgan. Oy tushdan keyin chiqadi va kechqurun janub tomonda baland turadi.', faza:'birinchi_chorak'},
    {sarlavha:'To‘lin oy', matn:'Yer Quyosh va Oy orasida. Butun yoritilgan tomon bizga qaragan. To‘lin oy quyosh botishi bilan chiqib, tun bo‘yi ko‘rinadi. Oy tutilishi faqat shu fazada bo‘lishi mumkin.', faza:'tolin'},
    {sarlavha:'Kamayuvchi qavariq', matn:'To‘lin oydan keyin yoritilgan qism kamaya boshlaydi. Endi chap tomon yoritilgan; Oy har kuni o‘rtacha ≈50 daqiqa kechroq chiqadi.', faza:'kamayuvchi_qavariq'},
    {sarlavha:'Oxirgi chorak', matn:'Yana yarim disk yoritilgan, lekin bu safar chap yarmi. Oy yarim tunda chiqadi va tongda janub tomonda ko‘rinadi.', faza:'oxirgi_chorak'},
    {sarlavha:'Kamayuvchi o‘roq va yangi davr', matn:'Tong otishidan oldin sharqda ingichka o‘roq. Bir necha kundan so‘ng yana yangi oy — sikl ≈29,53 kunda takrorlanadi.', faza:'kamayuvchi_orak'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Fazani aniqlang',
    topshiriqlar:[
      {shart:'Sahnadagi holatda Oyning qaysi fazasi?', holat:{faza:'tolin'}, v:['Yangi oy','To‘lin oy','Birinchi chorak','Oxirgi chorak'], t:1, izoh:'Yer Quyosh va Oy orasida — <b>to‘lin oy</b>.'},
      {shart:'Bu holatda Oy Yerdan qanday ko‘rinadi?', holat:{faza:'yangi'}, v:['To‘liq yoritilgan disk','Yarim disk','Deyarli ko‘rinmaydi','Ingichka o‘roq, tongda'], t:2, izoh:'Yangi oyda yoritilgan tomon Yerga teskari — Oy <b>ko‘rinmaydi</b>.'},
      {shart:'Sahnadagi faza qanday ataladi?', holat:{faza:'birinchi_chorak'}, v:['Oxirgi chorak','O‘suvchi o‘roq','Birinchi chorak','O‘suvchi qavariq'], t:2, izoh:'Yarim disk yoritilgan va qism ortib bormoqda — <b>birinchi chorak</b>.'},
      {shart:'Bu fazada Oyni qachon ko‘rish mumkin?', holat:{faza:'kamayuvchi_orak'}, v:['Kechqurun g‘arbda','Tongda sharqda','Tun bo‘yi','Yarim tunda janubda'], t:1, izoh:'Kamayuvchi o‘roq Quyoshdan oldinroq chiqadi — <b>tongda sharqda</b>.'},
      {shart:'Bu fazadan keyin qaysi faza keladi?', holat:{faza:'osuvchi_qavariq'}, v:['To‘lin oy','Birinchi chorak','Yangi oy','Kamayuvchi o‘roq'], t:0, izoh:'O‘suvchi qavariqdan keyin <b>to‘lin oy</b>.'}
    ]},
  test:[
    {s:'Oy fazalari almashinishining sababi?', v:['Yer soyasi Oyga tushadi','Oyning yoritilgan yarmini Yerdan turli burchakda ko‘ramiz','Oy o‘z shaklini o‘zgartiradi','Bulutlar Oyni to‘sadi'], t:1, izoh:'Oyning yarmi doim yoritilgan; biz uni orbitadagi vaziyatga qarab <b>turli burchakdan</b> ko‘ramiz. Yer soyasi — bu oy tutilishi.'},
    {s:'Sinodik oy (fazalar davri) qancha?', v:['27,32 kun','29,53 kun','30 kun','28 kun'], t:1, izoh:'<b>≈29,53 kun</b>. 27,32 kun — siderik oy.'},
    {s:'Quyosh tutilishi qaysi fazada bo‘lishi mumkin?', v:['To‘lin oy','Birinchi chorak','Yangi oy','Oxirgi chorak'], t:2, izoh:'Oy Quyosh va Yer orasida — <b>yangi oy</b>.'},
    {s:'Kechqurun g‘arbda ingichka o‘roq ko‘rindi. Bu qaysi faza?', v:['Kamayuvchi o‘roq','O‘suvchi o‘roq','To‘lin oy','Oxirgi chorak'], t:1, izoh:'Kechqurun g‘arbda — <b>o‘suvchi o‘roq</b>.'},
    {s:'To‘lin oy odatda qachon chiqadi?', v:['Tushda','Yarim tunda','Quyosh botganda','Tong otganda'], t:2, izoh:'Oy Quyoshga qarama-qarshi tomonda: <b>quyosh botganda</b> chiqadi.'},
    {s:'Oydan Yergacha o‘rtacha masofa?', v:['≈38 400 km','≈384 400 km','≈3 844 000 km','≈149,6 mln km'], t:1, izoh:'<b>≈384 400 km</b>. 149,6 mln km — Yer–Quyosh masofasi.'},
    {s:'Nima uchun Oyning har doim bir tomonini ko‘ramiz?', v:['Oy aylanmaydi','Oyning o‘z o‘qi atrofida aylanish davri Yer atrofidagi aylanish davriga teng','Yer Oyni to‘sadi','Oyning orqa tomoni qorong‘i'], t:1, izoh:'Bu <b>sinxron aylanish</b> (tidal locking): ikkala davr ≈27,32 kun.'},
    {s:'Siderik va sinodik oy nega farq qiladi?', v:['Oy orbitasi ellips','Shu vaqtda Yer Quyosh atrofida siljiydi','Oy sekinlashadi','Farq qilmaydi'], t:1, izoh:'Yer Quyosh atrofida siljigani uchun Oy Quyoshga nisbatan avvalgi vaziyatga kelishi uchun <b>≈2,2 kun</b> ko‘proq yuradi.'}
  ],
  yordamchi:[
    {s:'Oy fazasi va oy tutilishi farqi nima?', j:'Faza har oy takrorlanadi va Oyning yoritilgan yarmini qaysi burchakdan ko‘rishimizga bog‘liq. Oy tutilishi esa Yer soyasining Oyga tushishi; u faqat to‘lin oyda va Quyosh, Yer, Oy deyarli bir chiziqda turgandagina bo‘ladi — yiliga bir necha marta yoki umuman bo‘lmasligi mumkin.', kalit:['tutilish','soya']},
    {s:'Oyning «qorong‘i tomoni» bormi?', j:'Oyning Yerdan ko‘rinmaydigan orqa tomoni bor, lekin u doim qorong‘i emas: yangi oy paytida aynan orqa tomon to‘liq yoritilgan bo‘ladi. «Qorong‘i tomon» iborasi aslida «ko‘rinmaydigan tomon» ma’nosida ishlatiladi.', kalit:['qorong','orqa']},
    {s:'O‘suvchi yoki kamayuvchi ekanini qanday bilaman?', j:'Shimoliy yarimsharda: o‘ng tomoni yoritilgan bo‘lsa — o‘suvchi, chap tomoni yoritilgan bo‘lsa — kamayuvchi. Kechqurun g‘arbdagi o‘roq — o‘suvchi, tongda sharqdagi o‘roq — kamayuvchi.', kalit:['osuvchi','kamayuvchi']}
  ],
  maqola:[
    {sarlavha:'Kirish: Oy nega «o‘zgaradi»?', xatboshilar:[
      'Qadimdan odamlar Oyning shakli muntazam o‘zgarishini kuzatib, vaqtni hisoblashda undan foydalangan. «Oy» so‘zi osmon jismini ham, kalendardagi vaqt birligini ham bildirishi bejiz emas. Hijriy kalendar hozir ham Oy fazalariga asoslangan: har bir oy yangi hilol ko‘ringanda boshlanadi.',
      'Oy o‘zi nur chiqarmaydi — u Quyosh nurini qaytaradi. Har qanday shar kabi Oyning ham Quyoshga qaragan yarmi yoritilgan, qarama-qarshi yarmi qorong‘i. Oy Yer atrofida aylanadi va shu aylanish davomida biz uning yoritilgan yarmini turli burchakdan ko‘ramiz. Oyning Yerdan ko‘rinadigan yoritilgan qismi shakli Oy fazasi deyiladi.',
      'Ko‘pchilik fazalarni Yer soyasi Oyga tushishi bilan tushuntiradi. Bu keng tarqalgan xato: Yer soyasi Oyga faqat oy tutilishida tushadi va bu har oy bo‘lmaydi. Fazalarning haqiqiy sababi — Quyosh, Yer va Oyning o‘zaro vaziyati. Sahnada Quyosh nuri bir tomondan tushadi, Oy orbitaning sakkiz holatida ko‘rsatiladi, alohida oynada esa uning Yerdan ko‘rinishi beriladi.'
    ]},
    {sarlavha:'O‘suvchi fazalar', xatboshilar:[
      'Sikl yangi oydan boshlanadi. Bu paytda Oy Quyosh bilan Yer orasida joylashadi va yoritilgan tomoni Yerga teskari qaragan bo‘ladi. Oy Quyosh bilan deyarli birga chiqib botadi va Quyosh nurida ko‘rinmaydi. Oy orbitasi Yer orbitasiga ≈5,1° qiya bo‘lgani uchun odatda u Quyoshning biroz yuqorisidan yoki pastidan o‘tadi; aniq bir chiziqqa tushganda esa Quyosh tutilishi yuz beradi.',
      'Bir-ikki kundan so‘ng quyosh botgandan keyin g‘arbda ingichka o‘roq — hilol paydo bo‘ladi. Bu o‘suvchi o‘roq. O‘zbekistondan qaraganda uning o‘ng, ya’ni Quyosh tomondagi qismi yoritilgan. Har kuni o‘roq kengayib, Oy osmonda Quyoshdan sharq tomonga uzoqlashib boradi.',
      'Yangi oydan taxminan 7,4 kun o‘tgach birinchi chorak keladi: Quyosh, Yer va Oy to‘g‘ri burchak hosil qiladi va biz diskning yarmini yoritilgan holda ko‘ramiz. Nomi «chorak» — chunki Oy orbitaning to‘rtdan birini bosib o‘tgan. Keyin yoritilgan qism yarmidan oshadi: bu o‘suvchi qavariq faza.'
    ]},
    {sarlavha:'To‘lin oy va kamayuvchi fazalar', xatboshilar:[
      'Yangi oydan taxminan 14,8 kun o‘tgach to‘lin oy bo‘ladi. Endi Yer Quyosh va Oy orasida, Oyning butun yoritilgan tomoni bizga qaragan. To‘lin oy Quyoshga qarama-qarshi tomonda bo‘lgani uchun quyosh botishi bilan chiqadi va tong otganda botadi — tun bo‘yi ko‘rinadi. Oy tutilishi faqat shu fazada, Oy Yer soyasidan o‘tganda yuz beradi.',
      'To‘lin oydan so‘ng yoritilgan qism kamaya boshlaydi — kamayuvchi qavariq faza. Endi O‘zbekistondan qaraganda Oyning chap tomoni yoritilgan. Oy har kuni o‘rtacha ≈50 daqiqa kechroq chiqadi, shuning uchun kamayuvchi Oyni kechqurun emas, tunning ikkinchi yarmida va ertalab ko‘proq ko‘ramiz.',
      'Oxirgi chorakda yana yarim disk yoritilgan, lekin bu safar chap yarmi. Oy taxminan yarim tunda chiqadi va tongda janub tomonda baland turadi. So‘ng kamayuvchi o‘roq keladi: uni tong otishidan oldin sharq ufqi ustida ko‘rish mumkin. Bir necha kundan keyin Oy yana Quyosh yoniga keladi va yangi sikl boshlanadi.'
    ]},
    {sarlavha:'Sinodik va siderik oy', xatboshilar:[
      'Oy Yer atrofida yulduzlarga nisbatan bir marta to‘liq aylanishi uchun ≈27,32 kun kerak — bu siderik oy. Biroq fazalar ≈29,53 kunda takrorlanadi — bu sinodik oy. Farqning sababi shundaki, Oy aylanayotgan paytda Yer ham Quyosh atrofida harakatlanadi va 27,32 kunda ≈27° siljiydi.',
      'Oy Quyoshga nisbatan avvalgi vaziyatga, masalan yana yangi oy holatiga kelishi uchun qo‘shimcha taxminan 2,2 kun yurishi kerak. Buni formula bilan ifodalash mumkin: 1/S = 1/T − 1/Y, bu yerda T = 27,32 kun (siderik oy), Y = 365,26 kun (Yerning Quyosh atrofida aylanishi). Hisoblasak, S ≈ 29,53 kun chiqadi.',
      'Oy har kuni orbitada taxminan 12–13° siljiydi, shuning uchun u osmonda yulduzlarga nisbatan g‘arbdan sharqqa qarab harakatlanadi va har kuni o‘rtacha ≈50 daqiqa kechroq chiqadi. Bir sutkada Oy fazasi sezilarli o‘zgaradi: ketma-ket ikki kechqurun kuzatilsa, o‘roq kengayganini yoki toraygani ko‘rinadi. Fazalarni kuzatish kundaligini yuritish bu harakatni o‘z ko‘zingiz bilan tekshirishning eng oddiy usuli.',
      'O‘n ikki sinodik oy ≈354,4 kunni tashkil etadi — bu quyosh yilidan ≈11 kun qisqa. Shu sababli sof oy kalendari bo‘lgan hijriy kalendardagi oylar har yili quyosh kalendariga nisbatan taxminan 10–11 kun oldinga siljiydi.'
    ]},
    {sarlavha:'Oy haqida asosiy ma’lumotlar', xatboshilar:[
      'NASA ma’lumotlariga ko‘ra Oyning diametri ≈3 475 km, ya’ni Yernikining taxminan to‘rtdan biri. Massasi 7,35·10²² kg — Yer massasining ≈1,23 %. Oy sirtida erkin tushish tezlanishi ≈1,62 m/s², bu Yerdagidan taxminan olti marta kichik.',
      'Oydan Yergacha o‘rtacha masofa ≈384 400 km. Orbita ellips shaklida bo‘lgani uchun masofa ≈363 300 km (perigey) dan ≈405 500 km (apogey) gacha o‘zgaradi. Yorug‘lik bu masofani taxminan 1,3 soniyada bosib o‘tadi.',
      'Oyning o‘z o‘qi atrofida aylanish davri Yer atrofida aylanish davriga teng. Bu sinxron aylanish (ingl. tidal locking) deyiladi va Yerning tortishish ta’sirida vujudga kelgan. Natijada Yerdan doim Oyning bir tomoni ko‘rinadi. Orqa tomoni birinchi marta 1959-yilda «Luna-3» zondi olgan suratlarda ko‘rilgan.',
      'Oyni sahnadagi modeldagidek o‘zingiz ham «yasashingiz» mumkin. Qorong‘i xonada bir tomonga lampa qo‘ying — bu Quyosh. Qo‘lingizdagi oq to‘p — Oy, boshingiz esa Yer. To‘pni cho‘zilgan qo‘lda ushlab, o‘z atrofingizda sekin aylansangiz, to‘pning yoritilgan qismi yangi oydan to‘lin oygacha va yana orqaga o‘zgarayotganini ko‘rasiz. To‘p lampa bilan boshingiz orasida bo‘lganda — yangi oy, boshingiz lampa bilan to‘p orasida bo‘lganda — to‘lin oy. Bu tajriba fazalar soya bilan emas, ko‘rish burchagi bilan bog‘liqligini yaqqol ko‘rsatadi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Oy yoritilgan qismining foizi ham faza bilan bog‘liq. Yangi oyda u ≈0 %, choraklarda ≈50 %, to‘lin oyda ≈100 %. O‘roq va qavariq fazalar esa oraliq qiymatlarga to‘g‘ri keladi. Taqvim va astronomik ilovalar odatda aynan shu foizni ko‘rsatadi. E’tibor bering: «birinchi chorak» nomi diskning chorak qismi yoritilganini emas, Oy orbitaning chorak qismini o‘tganini bildiradi — bu paytda diskning yarmi yoritilgan.',
      'Birinchi xato — fazalarni Yer soyasi bilan tushuntirish. Yer soyasi faqat oy tutilishida Oyga tushadi, fazalar esa har oy Quyosh, Yer va Oyning vaziyati tufayli almashadi. Ikkinchi xato — sinodik va siderik oyni chalkashtirish: fazalar davri 29,53 kun, yulduzlarga nisbatan aylanish 27,32 kun.',
      'Uchinchi xato — Oyning «qorong‘i tomoni» doim yoritilmaydi deb o‘ylash. Orqa tomon yangi oy paytida to‘liq yoritilgan bo‘ladi, u faqat Yerdan ko‘rinmaydi. To‘rtinchi xato — o‘suvchi va kamayuvchi o‘roqni chalkashtirish. O‘zbekistonda kechqurun g‘arbda ko‘rinadigan, o‘ng tomoni yoritilgan o‘roq — o‘suvchi; tongda sharqda ko‘rinadigan, chap tomoni yoritilgan o‘roq — kamayuvchi.'
    ]}
  ],
  formulalar:[
    ['1/S = 1/T − 1/Y','Sinodik oy S, siderik oy T, yil Y'],
    ['S ≈ 29,53 kun ; T ≈ 27,32 kun','Sinodik va siderik oy'],
    ['t = d / c ≈ 384 400 km / 300 000 km/s ≈ 1,3 s','Oydan Yergacha yorug‘lik vaqti'],
    ['12 · 29,53 ≈ 354,4 kun','Oy yili (quyosh yilidan ≈11 kun qisqa)'],
    ['g_Oy ≈ 1,62 m/s² ≈ g_Yer / 6','Oydagi erkin tushish tezlanishi']
  ],
  qiziqarli:[
    'Oyning orqa tomoni birinchi marta 1959-yilda «Luna-3» zondi suratlarida ko‘rilgan.',
    'Oydagi og‘irlik Yerdagidan taxminan 6 marta kam: Yerda 60 kg massali odamga ta’sir etuvchi og‘irlik kuchi Oyda ≈97 N bo‘ladi (Yerda ≈589 N).',
    'Quyosh tutilishi faqat yangi oyda, oy tutilishi faqat to‘lin oyda bo‘lishi mumkin — lekin orbita qiyaligi tufayli har oy emas.',
    'Hijriy kalendar oylari Oy fazalariga asoslangani uchun Ramazon oyi har yili taxminan 10–11 kun oldinroq boshlanadi.',
    'Quyosh diametri Oynikidan ≈400 marta katta va Yerdan ≈400 marta uzoq — shu tasodif tufayli ikkalasi osmonda deyarli bir xil o‘lchamda ko‘rinadi.'
  ],
  lugat:[
    ['Oy fazasi','Oyning Yerdan ko‘rinadigan yoritilgan qismi shakli.'],
    ['Yangi oy','Oy Quyosh va Yer orasida; ko‘rinmaydi.'],
    ['To‘lin oy','Yer Quyosh va Oy orasida; butun disk yoritilgan.'],
    ['Chorak','Diskning yarmi yoritilgan faza (birinchi va oxirgi).'],
    ['O‘roq (hilol)','Yoritilgan qismi yarmidan kam faza.'],
    ['Qavariq faza','Yoritilgan qismi yarmidan ko‘p, lekin to‘liq emas.'],
    ['Sinodik oy','Bir xil fazalar orasidagi vaqt, ≈29,53 kun.'],
    ['Siderik oy','Yulduzlarga nisbatan bir aylanish, ≈27,32 kun.'],
    ['Perigey / apogey','Orbitaning Yerga eng yaqin / eng uzoq nuqtasi.'],
    ['Sinxron aylanish','O‘q atrofida va orbita bo‘ylab aylanish davrlari tengligi.']
  ],
  manba:OYM+'; «Luna-3» (1959) — NASA NSSDCA kosmik apparatlar katalogi. Chiqish/botish vaqtlari va faza kunlari o‘rtacha, taxminiy qiymatlar.',
  ishlanma:{
    sinf:'5–11-sinf (tabiatshunoslik, geografiya, astronomiya asoslari)', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D interaktiv model, «lampa–to‘p» tajribasi, kuzatuv kundaligi',
    maqsad:{talimiy:'Oy fazalari sababini, 8 faza nomlari va tartibini, sinodik va siderik oy farqini o‘rgatish.',
      tarbiyaviy:'Osmonni kuzatishga qiziqish, xurofiy tushuntirishlardan ilmiy dalilga o‘tish madaniyati.',
      rivojlantiruvchi:'Fazoviy tasavvur, modelni kuzatuv bilan solishtirish, sabab-oqibat bog‘lanishini aniqlash.'},
    natijalar:['Fazalar sababini Quyosh–Yer–Oy vaziyati orqali tushuntiradi','8 fazani tartib bilan nomlaydi va rasmdan taniydi','Faza va tutilish farqini aytadi','Sinodik va siderik oy qiymatlarini biladi'],
    jihozlar:['MAKON 3D sahnasi «Oy fazalari»','Stol lampasi va oq to‘p (tajriba uchun)','Proyektor','Oy kuzatuv kundaligi tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Oy nega o‘roq bo‘lib qoladi — Yer soyasimi?» savoli.','Fikr bildiradi.'],
      ['8–20','<b>Model.</b> MAKON da Oyni 8 holatga qo‘yadi, Yerdan ko‘rinishini solishtiradi.','Fazalar sxemasini chizadi.'],
      ['20–27','<b>Tajriba.</b> Lampa (Quyosh) va to‘p (Oy): o‘quvchi boshi — Yer.','Fazalarni o‘zi hosil qiladi.'],
      ['27–35','<b>Sinodik va siderik oy, tutilishlar.</b>','Farqni daftarga yozadi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON «Fazani aniqlang» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Faza','Oyning ko‘rinadigan yoritilgan qismi.'],['Yangi oy','Oy ko‘rinmaydi.'],['To‘lin oy','Butun disk yoritilgan.'],['Sinodik oy','≈29,53 kun.'],['Siderik oy','≈27,32 kun.']],
    savollar:[['Fazalar sababi?','Quyosh–Yer–Oy vaziyati'],['Sinodik oy?','≈29,53 kun'],['Quyosh tutilishi qaysi fazada?','Yangi oy'],['Kechqurun g‘arbdagi o‘roq?','O‘suvchi o‘roq'],['Oygacha o‘rtacha masofa?','≈384 400 km']],
    uy:'Darslikdagi mavzuni o‘qish; (1) bir hafta davomida Oyni kuzatib, har kuni shaklini va vaqtini chizish; (2) 1/S = 1/T − 1/Y formulasi bilan S ni hisoblash; (3) keyingi to‘lin oy sanasini taqvimdan topib, bugungi fazani aniqlash.',
    manba:OYM
  }
},

/* ============ 4. YORUG‘LIKNING SINISHI ============ */
'fizika-sinish': {
  fan:'fizika', qisqaNom:'Sinish', nom:'Yorug‘likning sinishi va to‘la ichki qaytish',
  qisqa:'8–9-sinf · Fizika · «Yorug‘lik hodisalari»',
  sahna:'optika',
  kor:{
    sarlavha:'Nur muhit chegarasida yo‘nalishini o‘zgartiradi',
    matn:'Yorug‘lik bir shaffof muhitdan ikkinchisiga o‘tganda uning tezligi o‘zgaradi va nur chegarada yo‘nalishini o‘zgartiradi — bu sinish deyiladi. Sinish burchagi Snellius qonuni bilan hisoblanadi. Nur optik zichroq muhitdan siyrakroq muhitga o‘tayotganda tushish burchagi kritik burchakdan katta bo‘lsa, nur umuman chiqmaydi va to‘liq qaytadi. Lazer nurining burchagini slayder bilan o‘zgartiring, muhitni tanlang va natijani kuzating.',
    punktlar:['<b>Snellius qonuni:</b> n₁·sin α₁ = n₂·sin α₂','Burchaklar <b>normal</b>dan (chegara sirtiga perpendikulyar chiziqdan) o‘lchanadi','<b>Sindirish ko‘rsatkichi:</b> n = c / v (suv 1,33 · shisha ≈1,50 · olmos 2,42)','<b>Kritik burchak:</b> sin α_kr = n₂ / n₁ (n₁ > n₂)']
  },
  bolimlar:[
    {sarlavha:'Muhitlar: sindirish ko‘rsatkichi va kritik burchak', jadval:[
      ['Havo','n ≈ 1,0003 (hisoblarda 1) · v ≈ 299 700 km/s'],
      ['Suv (20 °C)','n = 1,33 · v ≈ 225 000 km/s · havoga kritik burchak ≈48,8°'],
      ['Shisha (oddiy, kron)','n ≈ 1,50 (turiga qarab ≈1,46–1,9) · v ≈ 200 000 km/s · α_kr ≈ 41,8°'],
      ['Olmos','n = 2,42 · v ≈ 124 000 km/s · α_kr ≈ 24,4°']
    ], matn:'Qiymatlar natriyning sariq chizig‘i (to‘lqin uzunligi ≈589 nm) uchun. Aniq ma’lumotnomalarda suv 1,333, olmos 2,417; shisha uchun qiymat uning tarkibiga bog‘liq — sahnada tipik 1,50 olingan.'},
    {sarlavha:'Namunaviy hisob (Snellius qonuni)', jadval:[
      ['Havodan suvga, α₁ = 45°','sin α₂ = 0,707/1,33 ≈ 0,532 ⇒ α₂ ≈ 32,1°'],
      ['Havodan shishaga, α₁ = 30°','sin α₂ = 0,5/1,5 ≈ 0,333 ⇒ α₂ ≈ 19,5°'],
      ['Suvdan havoga, α₁ = 40°','sin α₂ = 1,33·0,643 ≈ 0,855 ⇒ α₂ ≈ 58,7°'],
      ['Shishadan havoga, α₁ = 30°','sin α₂ = 1,5·0,5 = 0,75 ⇒ α₂ ≈ 48,6°'],
      ['Shishadan havoga, α₁ = 45°','1,5·0,707 ≈ 1,06 > 1 ⇒ sinish yo‘q, to‘la ichki qaytish'],
      ['Olmosdan havoga, α₁ = 30°','2,42·0,5 = 1,21 > 1 ⇒ to‘la ichki qaytish']
    ]},
    {sarlavha:'Ikki yo‘nalish farqi', jadval:[
      ['Havodan muhitga (n₁ < n₂)','Nur normalga yaqinlashadi: α₂ < α₁ · sinish har doim bor'],
      ['Muhitdan havoga (n₁ > n₂)','Nur normaldan uzoqlashadi: α₂ > α₁'],
      ['α₁ = α_kr','Singan nur chegara bo‘ylab sirpanadi: α₂ = 90°'],
      ['α₁ > α_kr','To‘la ichki qaytish: nur butunlay muhitga qaytadi'],
      ['α₁ = 0°','Nur sinmaydi, to‘g‘ri o‘tadi (faqat tezligi o‘zgaradi)']
    ]},
    {sarlavha:'Qo‘llanishi', jadval:[
      ['Optik tola','Shisha tolada nur to‘la ichki qaytish bilan uzoq masofaga uzatiladi — internet va aloqa tarmoqlari'],
      ['Olmos yaltirashi','Kichik kritik burchak (≈24,4°) tufayli nur olmos ichida ko‘p marta qaytadi'],
      ['Periskop va binokl prizmalari','Prizmada to‘la ichki qaytish ko‘zgu vazifasini bajaradi'],
      ['Endoskop','Tibbiyotda tola to‘plami orqali tana ichini ko‘rish'],
      ['Suvdagi qoshiq «sinib» ko‘rinishi','Suv–havo chegarasida sinish']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Normal va tushish burchagi', matn:'Nur tushgan nuqtada chegaraga perpendikulyar chiziq — normal. Tushish va sinish burchaklari sirtdan emas, aynan normaldan o‘lchanadi. Havodan suvga 40° burchak bilan nur yuboring.', muhit:'suv', yonalish:'havodan', burchak:40},
    {sarlavha:'Havodan suvga', matn:'Suvda yorug‘lik sekinroq, shuning uchun nur normalga yaqinlashadi. Snellius qonuni: 1·sin 40° = 1,33·sin α₂ ⇒ α₂ ≈ 28,9°. Burchakni o‘zgartirib, α₂ doim α₁ dan kichik ekanini tekshiring.', muhit:'suv', yonalish:'havodan', burchak:40},
    {sarlavha:'Shisha va olmos', matn:'Muhitni almashtiring: bir xil 40° da shishada α₂ ≈ 25,4°, olmosda α₂ ≈ 15,4°. Sindirish ko‘rsatkichi qancha katta bo‘lsa, nur shuncha kuchli sinadi.', muhit:'olmos', yonalish:'havodan', burchak:40},
    {sarlavha:'Suvdan havoga', matn:'Endi nur suvdan chiqadi va normaldan uzoqlashadi: 1,33·sin 40° ≈ 0,855 ⇒ α₂ ≈ 58,7°. Burchakni asta oshiring — singan nur chegaraga yaqinlashib boradi.', muhit:'suv', yonalish:'havoga', burchak:40},
    {sarlavha:'Kritik burchak', matn:'Suv uchun sin α_kr = 1/1,33 ⇒ α_kr ≈ 48,8°. Shu burchakda singan nur chegara bo‘ylab ketadi (α₂ = 90°). 48° va 49° ni solishtiring.', muhit:'suv', yonalish:'havoga', burchak:48},
    {sarlavha:'To‘la ichki qaytish', matn:'Shisha uchun α_kr ≈ 41,8°. Tushish burchagini 50° qiling: singan nur yo‘qoladi, butun yorug‘lik shishaga qaytadi. Optik tolalar aynan shu hodisaga asoslangan.', muhit:'shisha', yonalish:'havoga', burchak:50}
  ],
  amaliyot:{tur:'shart', sarlavha:'Nurni boshqaring',
    topshiriqlar:[
      {shart:'<b>Havodan suvga</b> nur yuboring, tushish burchagi <b>45°</b> bo‘lsin.', hodisa:'sinish', kod:"ev.muhit==='suv' && ev.yonalish==='havodan' && ev.a1===45", izoh:'sin α₂ = sin 45°/1,33 ⇒ <b>α₂ ≈ 32,1°</b>: nur normalga yaqinlashdi.'},
      {shart:'<b>Shishada to‘la ichki qaytishni</b> hosil qiling.', hodisa:'sinish', kod:"ev.muhit==='shisha' && ev.yonalish==='havoga' && ev.tir", izoh:'Shisha uchun kritik burchak <b>≈41,8°</b>; undan katta burchakda nur shishadan chiqmaydi.'},
      {shart:'<b>Olmosdan havoga</b> yo‘nalishda to‘la ichki qaytish bo‘ladigan <b>eng kichik butun</b> burchakni toping.', hodisa:'sinish', kod:"ev.muhit==='olmos' && ev.yonalish==='havoga' && ev.a1===25", izoh:'Olmos uchun α_kr ≈ 24,4°, shuning uchun eng kichik butun burchak — <b>25°</b>.'},
      {shart:'<b>Suvdan havoga</b> chiqqan nurning sinish burchagi <b>60° dan katta</b>, lekin to‘la ichki qaytish <b>bo‘lmasin</b>.', hodisa:'sinish', kod:"ev.muhit==='suv' && ev.yonalish==='havoga' && !ev.tir && ev.a2!==null && ev.a2>60", izoh:'Bu 41°–48° oralig‘ida bajariladi: masalan, 45° da sin α₂ ≈ 0,940 ⇒ <b>α₂ ≈ 70,1°</b>.'},
      {shart:'Nur <b>sinmasdan</b> to‘g‘ri o‘tsin (istalgan muhit).', hodisa:'sinish', kod:"ev.a1===0", izoh:'Nur normal bo‘ylab tushsa (<b>α₁ = 0°</b>), yo‘nalishi o‘zgarmaydi — faqat tezligi o‘zgaradi.'}
    ]},
  test:[
    {s:'Snellius qonuni qaysi?', v:['n₁·cos α₁ = n₂·cos α₂','n₁·sin α₁ = n₂·sin α₂','n₁/sin α₁ = n₂/sin α₂','α₁ = α₂'], t:1, izoh:'<b>n₁·sin α₁ = n₂·sin α₂</b>, burchaklar normaldan o‘lchanadi.'},
    {s:'Tushish burchagi nimadan o‘lchanadi?', v:['Chegara sirtidan','Normaldan','Gorizontdan','Singan nurdan'], t:1, izoh:'Chegaraga perpendikulyar <b>normaldan</b>.'},
    {s:'Suvning sindirish ko‘rsatkichi 1,33. Suvda yorug‘lik tezligi taxminan?', v:['≈400 000 km/s','≈300 000 km/s','≈225 000 km/s','≈133 000 km/s'], t:2, izoh:'v = c/n = 300 000/1,33 ≈ <b>225 000 km/s</b>.'},
    {s:'Nur havodan shishaga o‘tganda qanday sinadi?', v:['Normaldan uzoqlashadi','Normalga yaqinlashadi','Sinmaydi','Doim qaytadi'], t:1, izoh:'Optik zichroq muhitga o‘tishda <b>normalga yaqinlashadi</b>.'},
    {s:'To‘la ichki qaytish qachon bo‘lishi mumkin?', v:['Havodan suvga, istalgan burchakda','Zichroq muhitdan siyrakroqqa, α > α_kr','Siyrakroqdan zichroqqa, α > 45°','Faqat 90° da'], t:1, izoh:'Faqat <b>n₁ > n₂</b> va tushish burchagi kritikdan katta bo‘lsa.'},
    {s:'Shisha (n = 1,50) uchun kritik burchak?', v:['≈24,4°','≈41,8°','≈48,8°','≈60°'], t:1, izoh:'sin α_kr = 1/1,5 ⇒ <b>≈41,8°</b>.'},
    {s:'Qaysi muhitda kritik burchak eng kichik?', v:['Suv','Shisha','Olmos','Hammasida bir xil'], t:2, izoh:'n qancha katta bo‘lsa, α_kr shuncha kichik: <b>olmos ≈24,4°</b>.'},
    {s:'Optik tolada signal qaysi hodisa tufayli uzatiladi?', v:['Dispersiya','Difraksiya','To‘la ichki qaytish','Qutblanish'], t:2, izoh:'Nur tola devorlaridan <b>to‘la ichki qaytish</b> bilan qaytib boradi.'}
  ],
  yordamchi:[
    {s:'Nega shishaning sindirish ko‘rsatkichi aniq emas?', j:'«Shisha» — bitta modda emas: oddiy kron shishada n ≈ 1,52, kvars shishada ≈1,46, og‘ir flint shishada 1,9 gacha bo‘lishi mumkin. Maktab masalalarida ko‘pincha 1,5 olinadi, sahnada ham shunday.', kalit:['shisha','1,5']},
    {s:'Sinish ko‘rsatkichi rangga bog‘liqmi?', j:'Ha, oz bo‘lsa-da. Binafsha nur uchun n qizil nurnikidan biroz katta — shu tufayli prizma oq yorug‘likni ranglarga ajratadi (dispersiya). Shuning uchun jadvallarda qiymat aniq to‘lqin uzunligi, odatda natriyning sariq chizig‘i (≈589 nm) uchun beriladi.', kalit:['rang','dispersiya','589']},
    {s:'Kritik burchak formulasi qayerdan keladi?', j:'Snellius qonunida singan nur burchagi 90° bo‘lsin: n₁·sin α_kr = n₂·sin 90° = n₂. Demak sin α_kr = n₂/n₁. Havo uchun n₂ ≈ 1, shuning uchun sin α_kr = 1/n.', kalit:['kritik']}
  ],
  maqola:[
    {sarlavha:'Kirish: nima uchun qoshiq «sinadi»?', xatboshilar:[
      'Suv to‘ldirilgan stakanga qoshiq solsangiz, u suv sirtida go‘yo sinib qolgandek ko‘rinadi. Hovuz tubi aslidagidan sayozroq tuyuladi, baliqchi esa suv ostidagi baliqni aynan ko‘ringan joyidan emas, biroz pastroqdan nishonga olishi kerak. Bu hodisalarning barchasi bitta sabab — yorug‘likning sinishi bilan bog‘liq.',
      'Yorug‘lik bir jinsli muhitda to‘g‘ri chiziq bo‘ylab tarqaladi. Ammo ikki shaffof muhit chegarasiga yetganda uning bir qismi qaytadi, bir qismi esa ikkinchi muhitga o‘tib, yo‘nalishini o‘zgartiradi. Yo‘nalish o‘zgarishining sababi — yorug‘likning turli muhitlarda turli tezlikda tarqalishi.',
      'Bu darsda sinish qonunini, sindirish ko‘rsatkichini, kritik burchakni va to‘la ichki qaytishni ko‘rib chiqamiz. Sahnada lazer nuri havodan suvga, shishaga yoki olmosga tushadi, teskari rejimda esa muhitdan havoga chiqadi. Burchak slayderini o‘zgartirib, formulalar haqiqatan ishlashini o‘zingiz tekshirasiz.'
    ]},
    {sarlavha:'Normal va burchaklar', xatboshilar:[
      'Sinishni tavsiflash uchun avval burchaklarni to‘g‘ri o‘lchashni o‘rganish kerak. Nur chegaraga tushgan nuqtada chegara sirtiga perpendikulyar chiziq o‘tkaziladi — u normal deyiladi. Tushgan nur bilan normal orasidagi burchak tushish burchagi (α₁), singan nur bilan normal orasidagi burchak esa sinish burchagi (α₂) deyiladi.',
      'Tushgan nur, singan nur va normal bitta tekislikda yotadi. Nur normal bo‘ylab, ya’ni 0° burchak bilan tushsa, u yo‘nalishini o‘zgartirmaydi, faqat tezligi o‘zgaradi. Burchak kattalashgan sari sinish yaqqolroq sezila boshlaydi.',
      'Eng ko‘p uchraydigan xato — burchakni chegara sirtidan o‘lchash. Masalan, nur sirtga nisbatan 30° qiyalikda tushsa, tushish burchagi 30° emas, 90° − 30° = 60° bo‘ladi. Sahnada normal alohida chiziq bilan ko‘rsatilgan.'
    ]},
    {sarlavha:'Sindirish ko‘rsatkichi va Snellius qonuni', xatboshilar:[
      'Muhitning mutlaq sindirish ko‘rsatkichi yorug‘likning vakuumdagi tezligi c ning shu muhitdagi tezligi v ga nisbati: n = c/v. Vakuumda c ≈ 300 000 km/s. Havoda n ≈ 1,0003, shuning uchun hisoblarda uni 1 deb olamiz. Suvda n = 1,33, ya’ni yorug‘lik u yerda ≈225 000 km/s tezlikda tarqaladi; oddiy shishada n ≈ 1,50 va v ≈ 200 000 km/s; olmosda n = 2,42 va v ≈ 124 000 km/s.',
      'Sinish qonuni: n₁·sin α₁ = n₂·sin α₂. U Yevropada gollandiyalik olim Villebrord Snellius nomi bilan ataladi (1621), fransuzcha adabiyotda Dekart qonuni deb ham yuritiladi. Tarixchilar tadqiqotlariga ko‘ra, bu bog‘lanishni X asrda Bag‘dodda ishlagan olim Ibn Sahl ham o‘z risolasida bayon qilgan.',
      'Qonundan muhim xulosa kelib chiqadi: nur optik zichroq (n katta) muhitga o‘tganda normalga yaqinlashadi, optik siyrakroq muhitga o‘tganda normaldan uzoqlashadi. Masalan, havodan suvga 45° bilan tushgan nur uchun sin α₂ = 0,707/1,33 ≈ 0,532, ya’ni α₂ ≈ 32,1°.',
      'Sindirish ko‘rsatkichi yorug‘lik rangiga (to‘lqin uzunligiga) ham biroz bog‘liq, shuning uchun prizma oq yorug‘likni kamalak ranglariga ajratadi. Jadvallarda qiymatlar odatda natriy lampasining sariq nuri (≈589 nm) uchun beriladi.'
    ]},
    {sarlavha:'Kritik burchak va to‘la ichki qaytish', xatboshilar:[
      'Endi nur suvdan havoga chiqayotgan bo‘lsin. U normaldan uzoqlashadi, demak α₂ har doim α₁ dan katta. Tushish burchagini oshirib borsak, sinish burchagi tezroq o‘sadi va qandaydir burchakda 90° ga yetadi — singan nur chegara bo‘ylab sirpanadi. Bu tushish burchagi kritik (chegaraviy) burchak deyiladi.',
      'Snellius qonunida α₂ = 90° deb olsak, sin α_kr = n₂/n₁ kelib chiqadi. Havoga chiqish uchun sin α_kr = 1/n. Suvda α_kr ≈ 48,8°, shishada ≈41,8°, olmosda atigi ≈24,4°. Tushish burchagi kritikdan katta bo‘lsa, formula bo‘yicha sin α₂ birdan katta chiqadi — bunday burchak mavjud emas. Bu holda nur ikkinchi muhitga umuman o‘tmaydi va butunlay birinchi muhitga qaytadi. Hodisa to‘la ichki qaytish deyiladi.',
      'Diqqat: to‘la ichki qaytish faqat nur optik zichroq muhitdan siyrakroq muhitga o‘tayotganda bo‘ladi. Havodan suvga yoki shishaga tushayotgan nur uchun sin α₂ = sin α₁/n doim 1 dan kichik, shuning uchun sinish har qanday burchakda mavjud.'
    ]},
    {sarlavha:'Texnikada va tabiatda', xatboshilar:[
      'Optik tola — ingichka shisha yoki plastmassa ip, uning o‘zagi tashqi qobiqdan kattaroq sindirish ko‘rsatkichiga ega. Nur o‘zak ichida devorlarga kritikdan katta burchak bilan tushib, to‘la ichki qaytish orqali uzoq masofaga deyarli yo‘qotishsiz boradi. Zamonaviy internet va telefon aloqasining asosiy qismi shu tolalar orqali uzatiladi. Tibbiyotdagi endoskoplar ham shu tamoyilda ishlaydi.',
      'Olmosning yaltirashi uning katta sindirish ko‘rsatkichi va kichik kritik burchagi bilan bog‘liq. Zargarlar olmosni shunday qirralaydiki, ichkariga kirgan nur bir necha marta to‘la ichki qaytib, yuqori tomondan chiqadi. Binokl va periskoplarda to‘g‘ri burchakli shisha prizmalar ko‘zgu o‘rnida ishlatiladi: nur prizma yog‘iga 45° bilan tushadi, bu shishaning kritik burchagidan (≈41,8°) katta.',
      'Sinish tabiatda ham ko‘p uchraydi. Quyosh ufqqa yaqin turganda uning nurlari atmosferada sinadi, shuning uchun Quyosh diskini haqiqatda ufq ostiga tushgandan keyin ham bir oz vaqt ko‘ramiz. Issiq asfalt ustidagi «ko‘lmak» — sarob ham havo qatlamlarining harorati va zichligi har xil bo‘lgani tufayli nur yo‘lining egilishi natijasi. Kamalak esa suv tomchilarida sinish, ichki qaytish va dispersiya birgalikda yuz berishidan hosil bo‘ladi.',
      'Suv ostidan yuqoriga qaragan g‘avvos tashqi dunyoni faqat taxminan 97° lik (2·48,8°) konus ichida ko‘radi; bu konusdan tashqarida suv sirti ko‘zgu kabi ko‘rinadi. Bu ham to‘la ichki qaytishning natijasi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Sahnadagi tajribadan yana bir qonuniyatni ko‘rish mumkin. Havodan muhitga yo‘nalishda tushish burchagini 85° gacha oshirsangiz ham, sinish burchagi kritik burchakdan oshmaydi: suvda ≈48,5°, shishada ≈41,6°, olmosda ≈24,3° atrofida qoladi. Bu tasodif emas — yorug‘lik yo‘li qaytuvchan. Muhitdan havoga kritik burchak ostida chiqqan nur chegara bo‘ylab ketadi; aksincha, chegara bo‘ylab deyarli sirpanib tushgan nur muhitda kritik burchakka yaqin burchak bilan sinadi.',
      'Birinchi xato — burchakni sirtdan o‘lchash; har doim normaldan o‘lchang. Ikkinchi xato — sinus o‘rniga burchakning o‘zini proporsional deb olish: n₁·α₁ = n₂·α₂ faqat juda kichik burchaklarda taxminan to‘g‘ri, umumiy holda esa sinuslar ishlatiladi.',
      'Uchinchi xato — to‘la ichki qaytishni havodan suvga o‘tishda ham kutish. Bu hodisa faqat zichroq muhitdan siyrakroq muhitga o‘tishda bo‘ladi. To‘rtinchi xato — kalkulyatorda burchak o‘lchov birligini tekshirmaslik: sin 30° = 0,5 bo‘lishi uchun kalkulyator gradus (DEG) rejimida bo‘lishi kerak.',
      'Beshinchi xato — kritik burchak hisobida sindirish ko‘rsatkichlarini teskari qo‘yish. sin α_kr = n₂/n₁ nisbatida suratda har doim kichik ko‘rsatkich turadi, shuning uchun natija 1 dan kichik chiqadi. Agar kritik burchak hisobida sinus birdan katta chiqsa, ko‘rsatkichlar joyi almashgan. Snellius qonuni bo‘yicha sinish burchagini topishda esa sinusning birdan katta chiqishi to‘la ichki qaytish bo‘lishini bildiradi.'
    ]}
  ],
  formulalar:[
    ['n₁·sin α₁ = n₂·sin α₂','Snellius (sinish) qonuni'],
    ['n = c / v','Mutlaq sindirish ko‘rsatkichi'],
    ['n₂₁ = n₂ / n₁ = v₁ / v₂','Nisbiy sindirish ko‘rsatkichi'],
    ['sin α_kr = n₂ / n₁  (n₁ > n₂)','Kritik burchak'],
    ['sin α_kr = 1 / n','Muhitdan havoga chiqishda kritik burchak'],
    ['α₁ > α_kr ⇒ to‘la ichki qaytish','Sinish yo‘qoladi']
  ],
  qiziqarli:[
    'Olmosda yorug‘lik vakuumdagidan qariyb 2,4 marta sekin — ≈124 000 km/s tezlikda tarqaladi.',
    'Sinish qonunini Yevropada Snellius (1621) va Dekart (1637) bayon qilgan; tarixchilar esa X asr olimi Ibn Sahl risolasida ham shu bog‘lanishni topgan.',
    'Suv ostidagi g‘avvos osmonni taxminan 97° lik «oyna» orqali ko‘radi — undan tashqarida suv sirti ko‘zgudek yaltiraydi.',
    'Optik tolalar orqali ma’lumot yorug‘lik impulslari shaklida uzatiladi va nur tolada to‘la ichki qaytish tufayli ushlab turiladi.',
    'Hovuz tubi aslidan sayozroq ko‘rinadi: tik qaralganda ko‘rinadigan chuqurlik haqiqiy chuqurlikning ≈1/1,33 qismi, ya’ni ≈3/4 qismi.'
  ],
  lugat:[
    ['Sinish','Nurning ikki muhit chegarasida yo‘nalishini o‘zgartirishi.'],
    ['Normal','Nur tushgan nuqtada chegara sirtiga perpendikulyar chiziq.'],
    ['Tushish burchagi','Tushgan nur va normal orasidagi burchak.'],
    ['Sinish burchagi','Singan nur va normal orasidagi burchak.'],
    ['Sindirish ko‘rsatkichi','Vakuumdagi yorug‘lik tezligining muhitdagi tezlikka nisbati, n = c/v.'],
    ['Optik zichroq muhit','Sindirish ko‘rsatkichi kattaroq muhit.'],
    ['Kritik burchak','Singan nur 90° bo‘ladigan tushish burchagi.'],
    ['To‘la ichki qaytish','Kritikdan katta burchakda nurning butunlay qaytishi.'],
    ['Optik tola','Nurni to‘la ichki qaytish bilan uzatuvchi ingichka tola.'],
    ['Dispersiya','Sindirish ko‘rsatkichining to‘lqin uzunligiga bog‘liqligi.']
  ],
  manba:OPT+'. Shisha uchun sindirish ko‘rsatkichi turiga qarab farq qiladi (≈1,46–1,9); sahnada tipik 1,50 olingan. Ibn Sahl haqida — R. Rashed (1990) tadqiqoti asosida Wikipedia «Ibn Sahl».',
  ishlanma:{
    sinf:'8–9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D virtual tajriba, jadval to‘ldirish, juftlikda hisoblash',
    maqsad:{talimiy:'Sinish qonuni, sindirish ko‘rsatkichi, kritik burchak va to‘la ichki qaytish tushunchalarini o‘rgatish.',
      tarbiyaviy:'Tajriba natijasini aniq qayd etish, ilm tarixiga (Ibn Sahl, Snellius) hurmat.',
      rivojlantiruvchi:'Kuzatuvdan qonuniyat chiqarish, trigonometrik hisob va texnik qo‘llanishlarni tahlil qilish.'},
    natijalar:['Tushish va sinish burchaklarini normaldan o‘lchaydi','Snellius qonuni bilan sinish burchagini hisoblaydi','Kritik burchakni topadi va to‘la ichki qaytish shartini aytadi','Optik tola ishlash tamoyilini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Optika»','Proyektor','Stakan suv va qoshiq, lazer ko‘rsatkich (xavfsizlik bilan)','Kalkulyator (DEG rejimi)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> Stakandagi «singan» qoshiq tajribasi.','Kuzatadi, sababini taxmin qiladi.'],
      ['8–20','<b>Sinish qonuni.</b> MAKON da havodan suv/shisha/olmosga nur; normal, burchaklar, n = c/v.','Jadvalga α₁ va α₂ ni yozadi, sinuslar nisbatini hisoblaydi.'],
      ['20–30','<b>Kritik burchak.</b> «Muhitdan havoga» rejimi, burchakni oshirish, to‘la ichki qaytish.','Uch muhit uchun α_kr ni hisoblaydi va sahnada tekshiradi.'],
      ['30–36','<b>Qo‘llanish.</b> Optik tola, olmos, periskop.','Misollar keltiradi.'],
      ['36–42','<b>Mustahkamlash.</b> MAKON «Nurni boshqaring» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Normal','Chegaraga perpendikulyar.'],['Sindirish ko‘rsatkichi','n = c/v.'],['Snellius qonuni','n₁ sin α₁ = n₂ sin α₂.'],['Kritik burchak','sin α_kr = n₂/n₁.'],['To‘la ichki qaytish','α > α_kr da nur qaytadi.']],
    savollar:[['Burchaklar nimadan o‘lchanadi?','Normaldan'],['Suvning sindirish ko‘rsatkichi?','1,33'],['Shisha uchun kritik burchak?','≈41,8°'],['To‘la ichki qaytish sharti?','n₁ > n₂ va α > α_kr'],['Optik tola qaysi hodisaga asoslangan?','To‘la ichki qaytish']],
    uy:'Darslikdagi mavzuni o‘qish; (1) havodan shishaga 60° bilan tushgan nurning sinish burchagini toping (javob: ≈35,3°); (2) n = 1,6 bo‘lgan plastmassa uchun kritik burchakni toping (javob: ≈38,7°); (3) uyda stakan suv va tanga bilan «yo‘qoladigan tanga» tajribasini o‘tkazib, tushuntirish yozing.',
    manba:OPT
  }
},

/* ============ 5. SPIRTLAR ============ */
'kimyo-spirtlar': {
  fan:'kimyo', qisqaNom:'Spirtlar', nom:'Spirtlar: metanol va etanol',
  qisqa:'10-sinf · organik kimyo · «Spirtlar» bobi',
  sahna:'molekula',
  kor:{
    sarlavha:'Uglevodorod + gidroksil guruh',
    matn:'Spirtlar — molekulasida uglevodorod radikaliga bog‘langan bir yoki bir necha gidroksil guruh (–OH) bor organik moddalar. Eng sodda ikki vakil — metanol CH₃OH va etanol C₂H₅OH. Ular tashqi ko‘rinishi va hidi bilan deyarli farq qilmaydi, lekin metanol kuchli zahar. Molekulalarni aylantiring, suv molekulasi bilan solishtiring va –OH guruhini toping.',
    punktlar:['<b>Umumiy formula</b> (bir atomli to‘yingan spirtlar): CₙH₂ₙ₊₁OH','<b>Funksional guruh:</b> gidroksil –OH','<b>Metanol</b> CH₃OH — qaynash harorati 64,7 °C, <b>zaharli</b>','<b>Etanol</b> C₂H₅OH — qaynash harorati 78,4 °C'],
    molekulalar:[['CH3OH','CH₃OH · metanol'],['C2H5OH','C₂H₅OH · etanol'],['H2O','H₂O · suv']]
  },
  bolimlar:[
    {sarlavha:'Metanol va etanol: solishtirish', jadval:[
      ['Formula','CH₃OH · C₂H₅OH'],
      ['Molyar massa','32,04 g/mol · 46,07 g/mol'],
      ['Qaynash harorati','64,7 °C · 78,4 °C'],
      ['Suyuqlanish harorati','−97,6 °C · −114,1 °C'],
      ['Zichlik (20 °C)','≈0,792 g/sm³ · ≈0,789 g/sm³'],
      ['Suvda eruvchanligi','Ikkalasi ham istalgan nisbatda aralashadi'],
      ['Tarixiy nomi','«Yog‘och spirti» · «vino spirti»'],
      ['Organizmga ta’siri','Kuchli zahar: ko‘rlik va o‘lim · Zaharli ta’sirga ega, ko‘p miqdorda o‘limga olib keladi']
    ], matn:'Fizik konstantalar PubChem va CRC ma’lumotnomasidan yumaloqlangan.'},
    {sarlavha:'Nega spirtlar yuqori haroratda qaynaydi?', jadval:[
      ['Metan CH₄ (M = 16)','Qaynash harorati ≈ −161,5 °C'],
      ['Etan C₂H₆ (M = 30)','≈ −88,6 °C'],
      ['Metanol CH₃OH (M = 32)','64,7 °C'],
      ['Suv H₂O (M = 18)','100 °C'],
      ['Sabab','–OH guruhlari molekulalar orasida vodorod bog‘lar hosil qiladi']
    ], matn:'Molyar massasi yaqin etan va metanolning qaynash haroratlari 150 °C dan ko‘proq farq qiladi — bu vodorod bog‘ning ta’siri.'},
    {sarlavha:'Olinishi va kimyoviy xossalari', jadval:[
      ['Metanol sanoatda','CO + 2H₂ → CH₃OH (katalizator, yuqori bosim va harorat)'],
      ['Etanol — bijg‘itish','C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (achitqi fermentlari)'],
      ['Etanol — etilenni gidratlash','C₂H₄ + H₂O → C₂H₅OH (katalizator)'],
      ['Natriy bilan','2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑'],
      ['Yonishi','2CH₃OH + 3O₂ → 2CO₂ + 4H₂O · C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O'],
      ['Degidratlanish','C₂H₅OH → C₂H₄ + H₂O (konsentrlangan H₂SO₄, qizdirish)']
    ]},
    {sarlavha:'Xavfsizlik: metanol zaharliligi', jadval:[
      ['Nima uchun xavfli?','Organizmda formaldegid va chumoli kislotaga aylanadi; ular ko‘ruv nervi va markaziy nerv tizimini shikastlaydi'],
      ['Ko‘rlikka olib kelishi mumkin bo‘lgan miqdor','Chegara bilmas shifokorlar (MSF) ma’lumotiga ko‘ra ≈10 ml toza metanol'],
      ['O‘limga olib kelishi mumkin bo‘lgan miqdor','MSF: ≈30 ml dan; boshqa manbalarda o‘rtacha o‘lim dozasi ≈100 ml atrofida — manbalar farq qiladi'],
      ['Belgilari','Ko‘pincha 12–24 soatdan keyin: ko‘z xiralashishi, bosh og‘rig‘i, ko‘ngil aynishi, nafas buzilishi'],
      ['Nima qilish kerak?','Shubha bo‘lsa darhol 103 ga qo‘ng‘iroq qilish; o‘zicha davolashga urinmaslik'],
      ['Aniqlash','Hidi va ta’mi bo‘yicha etanoldan ajratib bo‘lmaydi']
    ], matn:'Qiymatlar individual va taxminiy: zaharlanish darajasi tana massasi, konsentratsiya va yordam vaqtiga bog‘liq.'}
  ],
  bosqichlar:[
    {sarlavha:'Suv molekulasi', matn:'H₂O da kislorod atomiga ikkita vodorod bog‘langan, molekula burchak shaklida. Spirtlarni suvdan «bitta vodorod o‘rniga uglevodorod radikali qo‘yilgan» modda deb tasavvur qilish mumkin.', mol:'H2O'},
    {sarlavha:'Metanol CH₃OH', matn:'Bitta uglerod atomi uchta vodorod va –OH guruhiga bog‘langan. Uglerod atrofida bog‘lar tetraedrik joylashgan. Kislorod atomini bosing — u vodorod bog‘lar hosil qiladigan markaz.', mol:'CH3OH'},
    {sarlavha:'Metanol — zahar', matn:'Metanol rangsiz, spirt hidli suyuqlik; ko‘rinishi va hidi bo‘yicha etanoldan farq qilmaydi. Juda kam miqdori ham ko‘rlik va o‘limga olib kelishi mumkin. Laboratoriyada u faqat yorliqli idishda saqlanadi.', mol:'CH3OH'},
    {sarlavha:'Etanol C₂H₅OH', matn:'Ikki uglerodli zanjir va –OH guruh. Metanoldan bitta CH₂ guruhga farq qiladi — ular gomologlar. Etanol erituvchi, antiseptik va yoqilg‘i sifatida ishlatiladi.', mol:'C2H5OH'},
    {sarlavha:'Vodorod bog‘ va qaynash harorati', matn:'–OH guruhning vodorodi qo‘shni molekula kislorodiga tortiladi. Shu bog‘lar tufayli metanol 64,7 °C da, etanol 78,4 °C da qaynaydi, molyar massasi yaqin etan esa −88,6 °C da.', mol:'C2H5OH'}
  ],
  amaliyot:{tur:'aniqla', sarlavha:'Moddani aniqlang',
    topshiriqlar:[
      {shart:'Sahnadagi molekula qaysi modda?', holat:{mol:'CH3OH'}, v:['Etanol','Metanol','Metan','Suv'], t:1, izoh:'Bitta uglerod va –OH guruh: <b>metanol CH₃OH</b>.'},
      {shart:'Bu moddaning qaynash harorati taxminan qancha?', holat:{mol:'C2H5OH'}, v:['64,7 °C','100 °C','78,4 °C','−88,6 °C'], t:2, izoh:'Etanol <b>≈78,4 °C</b> da qaynaydi.'},
      {shart:'Sahnadagi molekulaning funksional guruhi qaysi?', holat:{mol:'C2H5OH'}, v:['–COOH (karboksil)','–OH (gidroksil)','–CHO (aldegid)','–NH₂ (amino)'], t:1, izoh:'Spirtlarning funksional guruhi — <b>gidroksil –OH</b>.'},
      {shart:'Sahnadagi moddaning 10 ml ichilishi nimaga olib kelishi mumkin?', holat:{mol:'CH3OH'}, v:['Hech narsa bo‘lmaydi','Faqat yengil bosh og‘rig‘i','Ko‘rlikka','Faqat uyqu kelishiga'], t:2, izoh:'MSF ma’lumotiga ko‘ra ≈10 ml metanol <b>ko‘rlikka</b> olib kelishi mumkin.'},
      {shart:'Sahnadagi molekulaning molyar massasi?', holat:{mol:'CH3OH'}, v:['16 g/mol','32 g/mol','46 g/mol','18 g/mol'], t:1, izoh:'12 + 4·1 + 16 = <b>32 g/mol</b>.'}
    ]},
  test:[
    {s:'Spirtlarning funksional guruhi?', v:['–COOH','–OH','–CHO','–NO₂'], t:1, izoh:'<b>Gidroksil –OH</b>.'},
    {s:'Bir atomli to‘yingan spirtlarning umumiy formulasi?', v:['CₙH₂ₙ','CₙH₂ₙ₊₂','CₙH₂ₙ₊₁OH','CₙH₂ₙ₋₂'], t:2, izoh:'<b>CₙH₂ₙ₊₁OH</b>: n = 1 — metanol, n = 2 — etanol.'},
    {s:'Qaysi spirt kuchli zahar va ko‘rlikka olib kelishi mumkin?', v:['Etanol','Metanol','Glitserin','Hech biri'], t:1, izoh:'<b>Metanol</b> organizmda formaldegid va chumoli kislotaga aylanadi.'},
    {s:'Etanolning molyar massasi?', v:['32 g/mol','46 g/mol','44 g/mol','30 g/mol'], t:1, izoh:'2·12 + 6·1 + 16 = <b>46 g/mol</b>.'},
    {s:'Nima uchun metanol (M = 32) etandan (M = 30) ancha yuqori haroratda qaynaydi?', v:['Molekulasi og‘irroq','Molekulalar orasida vodorod bog‘lar bor','Ionli bog‘ bor','Rangli modda'], t:1, izoh:'–OH guruhlar orasidagi <b>vodorod bog‘lar</b>.'},
    {s:'Etanol natriy bilan reaksiyaga kirishganda qaysi gaz ajraladi?', v:['O₂','CO₂','H₂','CH₄'], t:2, izoh:'2C₂H₅OH + 2Na → 2C₂H₅ONa + <b>H₂↑</b>.'},
    {s:'Glyukozani bijg‘itishda etanol bilan birga nima hosil bo‘ladi?', v:['H₂','CO₂','O₂','CH₄'], t:1, izoh:'C₆H₁₂O₆ → 2C₂H₅OH + 2<b>CO₂</b>.'},
    {s:'Metanol va etanolni hidi yoki ta’mi bo‘yicha ajratish mumkinmi?', v:['Ha, metanol achchiq','Ha, metanol rangli','Yo‘q, sezgi bilan ajratib bo‘lmaydi','Ha, etanol hidsiz'], t:2, izoh:'<b>Yo‘q</b> — shuning uchun noma’lum spirtli suyuqlikni tatib ko‘rish xavfli.'}
  ],
  yordamchi:[
    {s:'Metanol zaharlanishida nima qilish kerak?', j:'Darhol tez yordamni (103) chaqirish. Metanol zaharlanishi faqat shifoxonada maxsus dori va muolajalar bilan davolanadi; belgilar kechikib (ko‘pincha 12–24 soatdan keyin) chiqishi mumkin, shuning uchun o‘zini yaxshi his qilish xavf yo‘qligini bildirmaydi.', kalit:['zahar','metanol','yordam']},
    {s:'Gomologlar nima?', j:'Tuzilishi va xossalari o‘xshash, tarkibi bir yoki bir necha CH₂ guruhga farq qiladigan moddalar. Metanol CH₃OH, etanol C₂H₅OH, propanol C₃H₇OH — spirtlarning gomologik qatori.', kalit:['gomolog']},
    {s:'Spirt bilan ishlashda qanday qoidalar bor?', j:'Spirtlar oson alangalanadi: ochiq olovdan uzoqda, shamollatiladigan joyda ishlash; idishni yorliqsiz qoldirmaslik; laboratoriya moddalarini hech qachon tatib ko‘rmaslik; to‘kilganini darhol artib, qo‘lni yuvish; ko‘zga tushsa ko‘p suv bilan yuvib, o‘qituvchiga xabar berish.', kalit:['xavfsizlik','qoida']}
  ],
  maqola:[
    {sarlavha:'Kirish: spirtlar nima?', xatboshilar:[
      'Kundalik hayotda «spirt» so‘zi ko‘pincha dorixonadagi antiseptik suyuqlikni bildiradi. Kimyoda esa spirtlar — butun bir organik moddalar sinfi. Ularning molekulasida uglevodorod radikaliga bog‘langan gidroksil guruh –OH bor. Aynan shu guruh spirtlarning xossalarini belgilaydi, shuning uchun u funksional guruh deyiladi.',
      'Spirtlarni suv molekulasining hosilasi deb tasavvur qilish qulay: H–O–H dagi bitta vodorod o‘rniga metil CH₃– yoki etil C₂H₅– radikali qo‘yilsa, mos ravishda metanol va etanol hosil bo‘ladi. Sahnada suv, metanol va etanol molekulalarini yonma-yon aylantirib, bu o‘xshashlikni ko‘ring.',
      'Molekulasida bitta –OH guruh bo‘lgan spirtlar bir atomli, ikkita va undan ko‘p bo‘lganlari ko‘p atomli spirtlar deyiladi (masalan, glitserin). Bir atomli to‘yingan spirtlarning umumiy formulasi CₙH₂ₙ₊₁OH. Bu darsda shu qatorning dastlabki ikki vakili — metanol va etanolni o‘rganamiz.'
    ]},
    {sarlavha:'Tuzilishi va vodorod bog‘', xatboshilar:[
      'Metanolda bitta uglerod atomi uchta vodorod atomi va kislorod atomi bilan bog‘langan, kislorod esa o‘z navbatida vodorod bilan bog‘langan. Uglerod atrofidagi to‘rt bog‘ tetraedr uchlariga yo‘nalgan, kislorod atomida esa bog‘lar suvdagidek burchak hosil qiladi. Etanol molekulasida ikki uglerodli zanjir bor; etanol metanoldan bitta CH₂ guruhga farq qiladi, ya’ni ular gomologlardir.',
      'Kislorod vodorodga nisbatan ancha elektrmanfiy, shuning uchun O–H bog‘ qutbli: kislorodda qisman manfiy, vodorodda qisman musbat zaryad yig‘iladi. Bir molekulaning –OH vodorodi qo‘shni molekulaning kislorodiga tortiladi. Bunday molekulalararo tortishish vodorod bog‘ deyiladi.',
      'Vodorod bog‘ spirtlarning fizik xossalarini tushuntiradi. Molyar massasi deyarli bir xil bo‘lgan etan (M = 30) −88,6 °C da qaynaydi, metanol (M = 32) esa 64,7 °C da. Metanol va etanol suv bilan ham vodorod bog‘lar hosil qiladi, shuning uchun suvda istalgan nisbatda eriydi. Uglevodorod zanjiri uzaygan sari suvda eruvchanlik kamayadi.'
    ]},
    {sarlavha:'Metanol', xatboshilar:[
      'Metanol — rangsiz, o‘ziga xos hidli, oson alangalanadigan suyuqlik. U 64,7 °C da qaynaydi, zichligi ≈0,792 g/sm³. Ilgari u yog‘ochni havosiz qizdirib (quruq haydash) olingani uchun «yog‘och spirti» deb atalgan. Hozir sanoatda asosan uglerod oksidi va vodoroddan katalizator ishtirokida, yuqori bosim va haroratda sintez qilinadi: CO + 2H₂ → CH₃OH.',
      'Metanol formaldegid va boshqa organik moddalar ishlab chiqarishda, erituvchi va yoqilg‘i sifatida keng ishlatiladi. Ammo u kuchli zahar. Organizmda metanol fermentlar ta’sirida formaldegidga, keyin chumoli kislotaga aylanadi. Chumoli kislota qonda to‘planib, ko‘ruv nervini va markaziy nerv tizimini shikastlaydi.',
      'Chegara bilmas shifokorlar (MSF) ma’lumotiga ko‘ra, taxminan 10 ml toza metanol ko‘rlikka, 30 ml esa o‘limga olib kelishi mumkin. Ilmiy sharhlarda og‘iz orqali o‘lim dozasi 0,3–1 g/kg deb baholanadi — 65 kg odam uchun ≈20–65 g, ya’ni taxminan 25–80 ml toza metanol. Farq odamlar sezgirligi turlicha ekani, bir vaqtda etanol ichilgani va yordam qancha tez ko‘rsatilganiga bog‘liq. Har ikki holatda ham xulosa bir: juda kam miqdor ham hayot uchun xavfli.',
      'Eng xavfli jihati — metanolni hidi, rangi yoki ta’mi bo‘yicha etanoldan ajratib bo‘lmaydi, zaharlanish belgilari esa ko‘pincha bir necha soatdan keyin paydo bo‘ladi. Shuning uchun noma’lum spirtli suyuqlikni hech qachon ichish yoki tatib ko‘rish mumkin emas; zaharlanishga shubha bo‘lsa, darhol tez yordam chaqiriladi.'
    ]},
    {sarlavha:'Etanol', xatboshilar:[
      'Etanol — rangsiz, o‘ziga xos hidli suyuqlik, 78,4 °C da qaynaydi. U qadimdan shakar saqlovchi moddalarni achitqi yordamida bijg‘itish orqali olinadi: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Sanoatda etanol etilenni katalizator ishtirokida gidratlash yo‘li bilan ham olinadi: C₂H₄ + H₂O → C₂H₅OH.',
      'Etanol muhim erituvchi: undan dori damlamalari, lak va atirlar tayyorlanadi. Tibbiyotda ≈70 % li eritmasi teri va asboblarni zararsizlantirishda ishlatiladi. Ba’zi mamlakatlarda u benzinga qo‘shiladigan bioyoqilg‘i sifatida qo‘llanadi.',
      'Etanol ham organizm uchun zaharli modda. Jahon sog‘liqni saqlash tashkiloti ma’lumotiga ko‘ra, spirtli ichimliklar ko‘plab kasalliklar va jarohatlar xavfini oshiradi, Xalqaro saraton tadqiqotlari agentligi (IARC) esa ularni 1-guruh kanserogenlar qatoriga kiritgan. O‘smir organizmi, ayniqsa rivojlanayotgan miya, etanol ta’siriga sezgirroq.'
    ]},
    {sarlavha:'Kimyoviy xossalari', xatboshilar:[
      'Spirtlar ishqoriy metallar bilan reaksiyaga kirishib, vodorod ajratadi: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑. Bu reaksiya suv bilan natriy reaksiyasiga o‘xshaydi, lekin ancha sokin boradi. Hosil bo‘lgan modda natriy etilat (etoksid) deyiladi.',
      'Spirtlar havoda yonadi. Metanol va etanol deyarli ko‘rinmas, och ko‘kish alanga bilan yonadi — shuning uchun spirt yonayotganini kunduzi sezmaslik mumkin, bu esa qo‘shimcha xavf. Yonish tenglamalari: 2CH₃OH + 3O₂ → 2CO₂ + 4H₂O va C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.',
      'Etanol konsentrlangan sulfat kislota ishtirokida qizdirilsa, suv ajralib eten (etilen) hosil bo‘ladi: C₂H₅OH → C₂H₄ + H₂O. Mis(II) oksid bilan qizdirilganda etanol atsetaldegidga oksidlanadi. Bu reaksiyalar spirtlarni boshqa organik moddalar bilan bog‘laydi.',
      'Spirtlar karbon kislotalar bilan kislota katalizatori ishtirokida qizdirilganda murakkab efirlar hosil qiladi. Masalan, etanol va sirka kislotadan etil atsetat olinadi: CH₃COOH + C₂H₅OH ⇄ CH₃COOC₂H₅ + H₂O. Bu reaksiya esterifikatsiya deyiladi va qaytar boradi. Ko‘plab murakkab efirlar meva hidiga ega bo‘lgani uchun oziq-ovqat va atir sanoatida ishlatiladi. Shunday qilib, spirtlar organik sintezda muhim boshlang‘ich moddalar hisoblanadi.'
    ]},
    {sarlavha:'Xavfsizlik qoidalari va ko‘p uchraydigan xatolar', xatboshilar:[
      'Laboratoriyada spirtlar bilan ishlash qoidalari: ochiq olov va qizdirgichlardan uzoqda ishlash; xonani shamollatish; barcha idishlarga yorliq yopishtirish; moddalarni hech qachon tatib ko‘rmaslik va og‘iz bilan pipetkaga tortmaslik; ko‘zga tushsa, ko‘p miqdordagi suv bilan yuvib, darhol o‘qituvchiga xabar berish. Yonayotgan spirtni suv bilan emas, olovni havodan to‘sib (qopqoq yoki yong‘inga qarshi mato bilan) o‘chirish tavsiya etiladi.',
      'Spirtli suyuqliklar saqlanadigan joyda ham ehtiyot choralari kerak. Ular bolalar qo‘li yetmaydigan joyda, zich yopiladigan, asl yorlig‘i saqlangan idishda turishi lozim. Texnik suyuqliklarni (oyna yuvish suyuqligi, erituvchilar) oziq-ovqat idishlariga, masalan, suv yoki sharbat shishasiga quyish mumkin emas — bunday holatlar tasodifiy zaharlanishning keng tarqalgan sababi hisoblanadi, chunki ba’zi texnik suyuqliklar tarkibida metanol bo‘lishi mumkin.',
      'Birinchi keng tarqalgan xato — spirtlarni ishqorlar deb hisoblash, chunki formulada –OH bor. Aslida spirtlardagi –OH kovalent bog‘langan va suvli eritmada gidroksid ioni hosil qilmaydi; spirt eritmasi indikator rangini o‘zgartirmaydi.',
      'Ikkinchi xato — metanol va etanolni «bir xil spirt» deb o‘ylash. Ularning tuzilishi bitta CH₂ guruhga farq qiladi, lekin organizmga ta’siri butunlay boshqacha. Uchinchi xato — metanolni hidi bo‘yicha aniqlash mumkin deb hisoblash. To‘rtinchi xato — molyar massani hisoblashda –OH dagi vodorodni unutish: etanol C₂H₆O, M = 46 g/mol.'
    ]}
  ],
  formulalar:[
    ['CₙH₂ₙ₊₁OH','Bir atomli to‘yingan spirtlar'],
    ['CO + 2H₂ → CH₃OH','Metanolning sanoatda olinishi'],
    ['C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂','Spirtli bijg‘ish'],
    ['C₂H₄ + H₂O → C₂H₅OH','Etilenni gidratlash'],
    ['2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑','Natriy bilan reaksiya'],
    ['C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O','Etanolning yonishi'],
    ['M(CH₃OH) = 32 ; M(C₂H₅OH) = 46 g/mol','Molyar massalar']
  ],
  qiziqarli:[
    'Metanol ilgari yog‘ochni havosiz qizdirib olingani uchun «yog‘och spirti» deb atalgan.',
    'Metanol va etanol kunduzi deyarli ko‘rinmaydigan och ko‘k alanga bilan yonadi.',
    'Molyar massasi deyarli bir xil etan −88,6 °C da, metanol esa +64,7 °C da qaynaydi — sabab vodorod bog‘lar.',
    'Metanolni hid, rang yoki ta’m bo‘yicha etanoldan ajratib bo‘lmaydi — faqat laboratoriya tahlili bilan.',
    'Dorixonadagi antiseptik spirt odatda ≈70 % li: bu konsentratsiya mikroblarga yaxshi ta’sir qiladi.'
  ],
  lugat:[
    ['Spirt','Uglevodorod radikaliga bog‘langan –OH guruhi bor organik modda.'],
    ['Gidroksil guruh','–OH; spirtlarning funksional guruhi.'],
    ['Funksional guruh','Modda sinfining xossalarini belgilovchi atomlar guruhi.'],
    ['Metanol','CH₃OH; zaharli spirt.'],
    ['Etanol','C₂H₅OH; vino spirti.'],
    ['Gomologlar','Tarkibi CH₂ guruhga farq qiladigan o‘xshash moddalar.'],
    ['Vodorod bog‘','–OH vodorodining qo‘shni molekula elektrmanfiy atomiga tortilishi.'],
    ['Bijg‘ish','Mikroorganizmlar fermentlari ta’sirida shakarning parchalanishi.'],
    ['Gidratlash','Moddaga suv biriktirish reaksiyasi.'],
    ['Antiseptik','Mikroblarni yo‘qotuvchi modda.']
  ],
  manba:KSP+'; Jahon sog‘liqni saqlash tashkiloti (JSST) «Alcohol» ma’lumot varag‘i; IARC Monographs, 100E-jild (spirtli ichimliklar). Metanolning o‘lim dozasi manbalarda farq qiladi (MSF, methanolpoisoning.msf.org: ≈10 ml — ko‘rlik, 30 ml dan — o‘lim; «Estimations of the lethal and exposure doses for representative methanol symptoms in humans», 2017, PMC5625597: 300–1000 mg/kg) — matnda ochiq aytilgan.',
  ishlanma:{
    sinf:'10-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D molekulyar model, solishtirma jadval, xavfsizlik bo‘yicha muhokama',
    maqsad:{talimiy:'Spirtlarning tuzilishi, funksional guruhi, metanol va etanolning xossalari, olinishi va reaksiyalarini o‘rgatish.',
      tarbiyaviy:'Kimyoviy moddalar bilan xavfsiz ishlash madaniyati va sog‘liqqa mas’uliyatli munosabat.',
      rivojlantiruvchi:'Tuzilish va xossa bog‘lanishini tahlil qilish, reaksiya tenglamalarini tuzish ko‘nikmasi.'},
    natijalar:['–OH funksional guruhni modelda ko‘rsatadi','Metanol va etanolning formulasi, molyar massasi va qaynash haroratini aytadi','Vodorod bog‘ orqali qaynash haroratini tushuntiradi','Metanol xavfi va spirt bilan ishlash qoidalarini biladi'],
    jihozlar:['MAKON 3D sahnasi «Molekulalar»','Proyektor','Sharli-sterjenli molekula modellari','Xavfsizlik qoidalari plakati','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Ikki shaffof suyuqlikdan biri zahar — qanday ajratamiz?»','Fikr bildiradi.'],
      ['8–18','<b>Tuzilish.</b> MAKON da H₂O, CH₃OH, C₂H₅OH ni solishtiradi; –OH, gomologlar.','Formulalar va molyar massalarni yozadi.'],
      ['18–26','<b>Fizik xossalar.</b> Vodorod bog‘, qaynash haroratlari jadvali.','Etan va metanolni solishtiradi.'],
      ['26–34','<b>Olinishi va reaksiyalar.</b> Bijg‘ish, gidratlash, Na bilan reaksiya, yonish.','Tenglamalarni tuzadi.'],
      ['34–38','<b>Xavfsizlik.</b> Metanol zaharliligi (manbalar), laboratoriya qoidalari.','Qoidalarni muhokama qiladi.'],
      ['38–43','<b>Mustahkamlash.</b> MAKON «Moddani aniqlang» mashqi va test.','Mashq va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Spirt','–OH guruhli organik modda.'],['Gidroksil','–OH guruh.'],['Gomolog','CH₂ ga farq qiluvchi modda.'],['Vodorod bog‘','Molekulalararo tortishish.'],['Bijg‘ish','Shakarning fermentativ parchalanishi.']],
    savollar:[['Spirtlarning funksional guruhi?','–OH'],['Metanol formulasi?','CH₃OH'],['Etanol molyar massasi?','46 g/mol'],['Qaysi spirt ko‘rlikka olib kelishi mumkin?','Metanol'],['Etanol + Na da qaysi gaz ajraladi?','H₂']],
    uy:'Darslikdagi mavzuni o‘qish; (1) propanol C₃H₇OH ning molyar massasini hisoblash (javob: 60 g/mol); (2) 2 mol etanol to‘liq yonganda necha mol CO₂ hosil bo‘lishini topish (javob: 4 mol); (3) uyda spirtli suyuqliklarni xavfsiz saqlash bo‘yicha 5 ta qoida yozish.',
    manba:KSP
  }
},

/* ============ 6. QON AYLANISH TIZIMI ============ */
'bio-qon-aylanish': {
  fan:'biologiya', qisqaNom:'Qon aylanish', nom:'Qon aylanish tizimi',
  qisqa:'8-sinf · «Odam va uning salomatligi» — Qon aylanish',
  sahna:'biologiya',
  bio:{qatlamlar:{skelet:false, mushak:false, azo:true, qon:true, teri:false}, korinish:'butun'},
  kor:{
    sarlavha:'Yopiq tizim: yurak, tomirlar, qon',
    matn:'Qon aylanish tizimi yurak va qon tomirlaridan iborat. Yurak nasos kabi qonni tomirlarga haydaydi, qon esa hujayralarga kislorod va oziq moddalarni yetkazib, karbonat angidrid va boshqa chiqindilarni olib ketadi. Odamda qon ikkita doira bo‘ylab aylanadi: kichik doira qonni o‘pkada kislorodga boyitadi, katta doira uni butun tanaga tarqatadi. Modelda arteriyalar qizil, venalar ko‘k rangda. A’zolarni bosib, qaysi doiraga bog‘liqligini aniqlang.',
    punktlar:['<b>Yurak</b> — 4 kamerali: 2 bo‘lmacha, 2 qorincha','<b>Kichik doira:</b> o‘ng qorincha → o‘pka arteriyasi → o‘pka → o‘pka venalari → chap bo‘lmacha','<b>Katta doira:</b> chap qorincha → aorta → a’zolar → kovak venalar → o‘ng bo‘lmacha','<b>Arteriya</b> qonni yurakdan olib ketadi, <b>vena</b> yurakka olib keladi']
  },
  bolimlar:[
    {sarlavha:'Ikki qon aylanish doirasi', jadval:[
      ['Kichik (o‘pka) doira — boshlanishi','O‘ng qorincha → o‘pka ustuni (arteriyasi)'],
      ['Kichik doira — gaz almashinuvi','O‘pka alveolalari kapillyarlarida qon O₂ oladi, CO₂ beradi'],
      ['Kichik doira — tugashi','O‘pka venalari → chap bo‘lmacha (arterial qon)'],
      ['Katta (tana) doira — boshlanishi','Chap qorincha → aorta'],
      ['Katta doira — a’zolarda','Arteriyalar → kapillyarlar: to‘qimalarga O₂ va oziq, qonga CO₂'],
      ['Katta doira — tugashi','Yuqori va pastki kovak venalar → o‘ng bo‘lmacha (venoz qon)']
    ], matn:'Diqqat: nom qon tarkibiga emas, yo‘nalishga bog‘liq. O‘pka arteriyasida venoz (kislorodi kam), o‘pka venalarida esa arterial (kislorodga boy) qon oqadi. Modeldagi «arteriya — qizil, vena — ko‘k» ranglash umumiy qoida, bu istisno uchun emas.'},
    {sarlavha:'Yurak tuzilishi', jadval:[
      ['Kameralari','O‘ng va chap bo‘lmacha, o‘ng va chap qorincha'],
      ['Tavaqali klapanlar','O‘ngda uch tavaqali, chapda ikki tavaqali (mitral) klapan — qonni bo‘lmachadan qorinchaga o‘tkazadi'],
      ['Yarim oysimon klapanlar','Aorta va o‘pka ustuni boshida — qonning qorinchaga qaytishiga yo‘l qo‘ymaydi'],
      ['Eng qalin devor','Chap qorincha — qonni butun tanaga haydaydi'],
      ['Joylashuvi','Ko‘krak qafasida, o‘pkalar orasida, o‘rta chiziqdan biroz chapda'],
      ['Massasi (kattalarda)','≈250–350 g; manbalarda jins va tana o‘lchamiga qarab farq qiladi']
    ]},
    {sarlavha:'Raqamlarda (o‘rtacha, sog‘lom kattalar, tinch holat)', jadval:[
      ['Yurak urish soni','daqiqasiga 60–100 marta (ko‘p darsliklarda o‘rtacha 70–75)'],
      ['Bir qisqarishda haydaladigan qon (zarb hajmi)','≈70 ml'],
      ['Daqiqalik hajm','≈5 l/daq (70 ml · 70 zarb ≈ 4,9 l)'],
      ['Qon miqdori','≈5 l (tana massasining ≈7–8 %)'],
      ['Arterial bosim (me’yor)','≈120/80 mm sim. ust. atrofida'],
      ['Aorta diametri','≈2,5 sm'],
      ['Kapillyar diametri','≈5–10 mkm — eritrotsitlar bittalab o‘tadi'],
      ['Eritrotsitning yashash muddati','≈120 kun']
    ], matn:'Qiymatlar yosh, jins, jismoniy tayyorgarlik va holatga qarab o‘zgaradi.'},
    {sarlavha:'A’zolar va qon aylanish', jadval:[
      ['O‘pka','Kichik doira: qon kislorodga boyiydi'],
      ['Miya','Katta doira: tinch holatda yurak daqiqalik hajmining ≈15 % ini oladi'],
      ['Buyrak','Katta doira: qonni filtrlaydi; daqiqalik hajmning ≈20–25 % i'],
      ['Jigar','Ikki manbadan qon oladi: jigar arteriyasi va darvoza venasi (ichak va taloqdan)'],
      ['Ichak va oshqozon','So‘rilgan oziq moddalar darvoza venasi orqali avval jigarga boradi'],
      ['Taloq','Eskirgan eritrotsitlarni parchalaydi; immun a’zo'],
      ['Yurakning o‘zi','Toj (koronar) arteriyalar orqali qon oladi — aortaning boshidan chiqadi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Qon aylanish tizimi butun tanada', matn:'Tomirlar tananing deyarli barcha to‘qimalariga yetib boradi. Modelda arteriyalar qizil, venalar ko‘k rangda. Qon to‘xtovsiz, yopiq tomirlar tizimi ichida aylanadi.', korinish:'butun'},
    {sarlavha:'Yurak — nasos', matn:'Yurak 4 kamerali: o‘ng va chap bo‘lmacha, o‘ng va chap qorincha. Chap va o‘ng yarmi aralashmaydi. Klapanlar qonni faqat bir yo‘nalishda o‘tkazadi. Yurakni bosing.', azo:'yurak', korinish:'kokrak'},
    {sarlavha:'Kichik qon aylanish doirasi', matn:'O‘ng qorincha venoz qonni o‘pka arteriyasiga haydaydi. O‘pka kapillyarlarida qon kislorod olib, CO₂ beradi va o‘pka venalari orqali chap bo‘lmachaga qaytadi.', azo:'opka', korinish:'kokrak'},
    {sarlavha:'Katta doira: aorta va miya', matn:'Chap qorincha arterial qonni aortaga haydaydi. Aortadan chiqqan arteriyalar bosh, qo‘l va tana a’zolariga boradi. Miya tinch holatda yurak haydagan qonning ≈15 % ini oladi.', azo:'miya', korinish:'bosh'},
    {sarlavha:'Jigar va darvoza venasi', matn:'Oshqozon, ichak va taloqdan kelgan qon darvoza venasi orqali avval jigarga boradi. Jigar oziq moddalarni qayta ishlaydi va zararli moddalarni zararsizlantiradi, so‘ng qon pastki kovak venaga quyiladi.', azo:'jigar', korinish:'butun'},
    {sarlavha:'Buyraklar', matn:'Buyraklar yurak daqiqalik hajmining ≈20–25 % ini oladi va qonni filtrlab, siydik hosil qiladi. Tozalangan qon buyrak venalari orqali pastki kovak venaga qaytadi.', azo:'buyrak', korinish:'butun'},
    {sarlavha:'Doira yopiladi', matn:'Tana a’zolaridan yig‘ilgan venoz qon yuqori va pastki kovak venalar orqali o‘ng bo‘lmachaga, u yerdan o‘ng qorinchaga tushadi — va yana kichik doiraga yo‘l oladi.', azo:'yurak', korinish:'kokrak'}
  ],
  amaliyot:{tur:'biologiya', sarlavha:'Qon aylanish a’zolarini toping',
    topshiriqlar:[
      {shart:'Qonni ikkala doiraga haydaydigan <b>nasos</b> a’zoni toping va bosing', azo:'yurak'},
      {shart:'<b>Kichik qon aylanish doirasida</b> qon kislorodga boyiydigan a’zoni bosing', azo:'opka'},
      {shart:'Ichak va oshqozondan <b>darvoza venasi</b> orqali qon keladigan a’zoni bosing', azo:'jigar'},
      {shart:'Katta doirada qonni <b>filtrlab</b>, siydik hosil qiladigan a’zoni bosing', azo:'buyrak'},
      {shart:'<b>Eskirgan eritrotsitlarni</b> parchalaydigan a’zoni bosing', azo:'taloq'},
      {shart:'Tinch holatda yurak haydagan qonning <b>≈15 %</b> ini oladigan a’zoni bosing', azo:'miya'}
    ]},
  test:[
    {s:'Katta qon aylanish doirasi qayerdan boshlanadi?', v:['O‘ng qorinchadan','Chap qorinchadan','O‘ng bo‘lmachadan','Chap bo‘lmachadan'], t:1, izoh:'<b>Chap qorincha</b> → aorta.'},
    {s:'Kichik qon aylanish doirasi qayerda tugaydi?', v:['O‘ng bo‘lmachada','Chap qorinchada','Chap bo‘lmachada','O‘pkada'], t:2, izoh:'O‘pka venalari <b>chap bo‘lmachaga</b> quyiladi.'},
    {s:'O‘pka arteriyasida qanday qon oqadi?', v:['Arterial','Venoz','Aralash','Qon oqmaydi'], t:1, izoh:'<b>Venoz</b>: arteriya nomi yo‘nalishga (yurakdan) bog‘liq, qon tarkibiga emas.'},
    {s:'Arteriyalar qanday tomirlar?', v:['Qonni yurakka olib keladi','Qonni yurakdan olib ketadi','Faqat kislorodli qon tashiydi','Eng ingichka tomirlar'], t:1, izoh:'Arteriyalar qonni <b>yurakdan olib ketadi</b>.'},
    {s:'Odam yuragi nechta kameradan iborat?', v:['2','3','4','5'], t:2, izoh:'<b>4 ta</b>: 2 bo‘lmacha, 2 qorincha.'},
    {s:'Gaz almashinuvi qaysi tomirlarda boradi?', v:['Aortada','Venalarda','Kapillyarlarda','Arteriyalarda'], t:2, izoh:'Devori juda yupqa <b>kapillyarlarda</b>.'},
    {s:'Yurakning qaysi qismi devori eng qalin?', v:['O‘ng bo‘lmacha','Chap bo‘lmacha','O‘ng qorincha','Chap qorincha'], t:3, izoh:'<b>Chap qorincha</b> qonni butun tanaga haydaydi.'},
    {s:'Qon aylanishning ikki doirasini 1628-yilda asarida isbotlagan olim?', v:['Ibn Sino','Uilyam Garvey','Marchello Malpigi','Galen'], t:1, izoh:'<b>Uilyam Garvey</b>, «De Motu Cordis» (1628). Kapillyarlarni 1661-yilda Malpigi kuzatgan.'}
  ],
  yordamchi:[
    {s:'Nega o‘pka arteriyasida venoz qon oqadi?', j:'Tomir nomi qonning tarkibiga emas, oqim yo‘nalishiga qarab beriladi: yurakdan chiqadigan tomir — arteriya, yurakka keladigan tomir — vena. O‘pka arteriyasi o‘ng qorinchadan chiqadi va tanadan qaytgan kislorodi kam qonni o‘pkaga olib boradi.', kalit:['arteriya','vena','opka']},
    {s:'Darvoza venasi nima?', j:'Oshqozon, ichak, taloq va oshqozon osti bezidan qonni to‘plab, jigarga olib boradigan vena. Shu sababli ichakda so‘rilgan moddalar umumiy qon oqimiga tushishidan oldin jigarda qayta ishlanadi.', kalit:['darvoza','jigar']},
    {s:'Puls nima?', j:'Chap qorincha qonni aortaga haydaganda arteriya devorlarining to‘lqinsimon tebranishi. Uni bilak yoki bo‘yindagi yirik arteriya ustida sanash mumkin; puls soni odatda yurak urish soniga teng.', kalit:['puls']}
  ],
  maqola:[
    {sarlavha:'Kirish: nega qon aylanishi kerak?', xatboshilar:[
      'Tanamizdagi har bir hujayra yashashi uchun kislorod va oziq moddalar olishi, hosil bo‘lgan karbonat angidrid va boshqa chiqindilardan xalos bo‘lishi kerak. Bir hujayrali organizmlarda bu moddalar bevosita tashqi muhitdan diffuziya orqali o‘tadi. Odamning trillionlab hujayrasi uchun esa maxsus transport tizimi zarur — bu qon aylanish tizimi.',
      'Qon aylanish tizimi yurak va qon tomirlaridan tashkil topgan. Qon yopiq tomirlar ichida harakatlanadi va hech qayerda to‘qimalarga to‘g‘ridan-to‘g‘ri quyilmaydi. Moddalar almashinuvi eng ingichka tomirlar — kapillyarlarning yupqa devori orqali boradi.',
      'Qon faqat moddalar tashuvchi emas. U tana haroratini teng taqsimlaydi, gormonlarni a’zolarga yetkazadi, leykotsitlar va antitanalar yordamida organizmni himoya qiladi, qon ivishi orqali jarohatdan qon yo‘qotilishining oldini oladi. Sahnadagi modelda a’zolar va tomirlar birgalikda ko‘rsatilgan: arteriyalar qizil, venalar ko‘k rangda.'
    ]},
    {sarlavha:'Yurak — to‘rt kamerali nasos', xatboshilar:[
      'Yurak — ko‘krak qafasida, ikki o‘pka orasida, o‘rta chiziqdan biroz chapda joylashgan mushakli a’zo. Kattalarda uning massasi taxminan 250–350 g; aniq qiymat jins va tana o‘lchamiga bog‘liq bo‘lgani uchun manbalarda turlicha beriladi. Yurak devori asosan maxsus yurak mushagidan iborat va umr bo‘yi charchamasdan qisqaradi.',
      'Yurak to‘rt kameraga bo‘lingan: o‘ng va chap bo‘lmacha hamda o‘ng va chap qorincha. Yurakning o‘ng va chap yarmi to‘siq bilan butunlay ajratilgan, shuning uchun venoz va arterial qon aralashmaydi. Bo‘lmacha va qorincha orasida tavaqali klapanlar (o‘ngda uch tavaqali, chapda ikki tavaqali), qorinchalardan chiqadigan aorta va o‘pka ustuni boshida esa yarim oysimon klapanlar bor. Klapanlar qonni faqat bir tomonga o‘tkazadi.',
      'Chap qorincha devori eng qalin, chunki u qonni butun tanaga haydaydi. Tinch holatda sog‘lom kattalarning yuragi daqiqasiga 60–100 marta uradi va har qisqarishda ≈70 ml qon haydaydi. Bundan daqiqalik hajm kelib chiqadi: 70 ml · 70 ≈ 4,9 l, ya’ni tinch holatda yurak bir daqiqada tanadagi deyarli butun qonni (≈5 l) haydab chiqaradi.',
      'Yurakning o‘zi ham qon bilan ta’minlanishi kerak. Aortaning boshidan chiqadigan toj (koronar) arteriyalar yurak mushagini oziqlantiradi. Bu arteriyalarning torayishi yoki berkilishi yurak xurujiga (infarktga) olib kelishi mumkin.'
    ]},
    {sarlavha:'Kichik qon aylanish doirasi', xatboshilar:[
      'Kichik (o‘pka) doira o‘ng qorinchadan boshlanadi. O‘ng qorincha qisqarganda tanadan qaytgan kislorodi kam, karbonat angidridi ko‘p venoz qon o‘pka ustuniga chiqadi. O‘pka ustuni o‘ng va chap o‘pka arteriyalariga ajraladi, ular o‘pka ichida tobora mayda tomirlarga bo‘linib, alveolalarni o‘rab turgan kapillyarlar to‘riga aylanadi.',
      'Alveola va kapillyar devorlari juda yupqa. Kislorod alveola havosidan qonga, karbonat angidrid qondan alveolaga diffuziya orqali o‘tadi. Kislorod eritrotsitlardagi gemoglobin bilan birikadi va qon arterial qonga aylanadi. So‘ng kapillyarlar yiriklashib, o‘pka venalariga birlashadi; o‘pka venalari arterial qonni chap bo‘lmachaga olib keladi. Kichik doira shu yerda tugaydi.',
      'E’tibor bering: kichik doirada nomlar «teskari» tuyuladi. O‘pka arteriyasida venoz, o‘pka venalarida esa arterial qon oqadi. Sababi, tomirlar qonning tarkibiga qarab emas, yo‘nalishiga qarab nomlanadi: yurakdan chiqadigan tomir — arteriya, yurakka kiradigan tomir — vena.'
    ]},
    {sarlavha:'Katta qon aylanish doirasi', xatboshilar:[
      'Katta (tana) doira chap qorinchadan boshlanadi. Chap qorincha arterial qonni tanadagi eng yirik arteriya — aortaga haydaydi. Aortadan bosh va miyaga, qo‘llarga, ko‘krak va qorin bo‘shlig‘i a’zolariga, oyoqlarga arteriyalar tarmoqlanadi. Arteriyalar mayda arteriolalarga, ular esa kapillyarlarga bo‘linadi.',
      'To‘qimalardagi kapillyarlarda qon hujayralarga kislorod va oziq moddalarni beradi, ulardan karbonat angidrid va chiqindilarni oladi va venoz qonga aylanadi. Kapillyarlar venulalarga, venulalar venalarga birlashadi. Tananing yuqori qismidan qon yuqori kovak venaga, pastki qismidan pastki kovak venaga yig‘iladi va ikkalasi o‘ng bo‘lmachaga quyiladi. Katta doira shu yerda tugaydi va qon yana o‘ng qorinchaga tushib, kichik doiraga yo‘l oladi.',
      'Katta doirada a’zolar qonni turli ulushda oladi. Tinch holatda miya yurak daqiqalik hajmining taxminan 15 % ini, buyraklar ≈20–25 % ini oladi. Jigarning qon bilan ta’minlanishi o‘ziga xos: u jigar arteriyasidan tashqari darvoza venasidan ham qon oladi. Darvoza venasi oshqozon, ichak va taloqdan kelgan qonni jigarga olib boradi, shuning uchun ichakda so‘rilgan moddalar avval jigarda qayta ishlanadi.'
    ]},
    {sarlavha:'Qon tomirlari va kashfiyot tarixi', xatboshilar:[
      'Arteriyalar devori qalin va elastik: ular yurak qisqarganda hosil bo‘ladigan yuqori bosimga chidaydi. Bilakda sezadigan puls — aynan arteriya devorining tebranishi. Venalarda bosim past, devori yupqaroq; qo‘l-oyoq venalarida qonning orqaga oqishiga yo‘l qo‘ymaydigan klapanlar bor. Kapillyarlarning diametri atigi ≈5–10 mkm, eritrotsitlar ular ichidan deyarli bittalab o‘tadi.',
      'Qadimgi yunon-rim shifokori Galen ta’limotiga ko‘ra, qon jigarda hosil bo‘lib, a’zolarda sarflanadi deb hisoblangan. XIII asrda arab shifokori Ibn an-Nafis qon o‘ng qorinchadan chapga o‘pka orqali o‘tishini, ya’ni kichik doirani ta’riflagan. 1628-yilda ingliz shifokori Uilyam Garvey «De Motu Cordis» asarida qonning yopiq doirada aylanishini tajriba va hisob bilan isbotlagan.',
      'Garvey arteriya va venalarni bog‘laydigan tomirlarni ko‘ra olmagan, chunki ular juda ingichka. 1661-yilda italiyalik olim Marchello Malpigi mikroskop ostida qurbaqa o‘pkasida kapillyarlarni kuzatib, qon aylanish zanjirini yakunlagan.',
      'Garveyning asosiy dalillaridan biri oddiy hisob edi: yurak har qisqarishda ma’lum hajmdagi qonni haydaydi, bir soatda esa haydalgan qon miqdori tanadagi barcha qondan ancha ko‘p bo‘ladi. Oziqdan buncha qon har soatda qayta hosil bo‘lishi mumkin emas, demak, qon qayta-qayta aylanib yuradi. Bugungi raqamlar bilan tekshirsak: daqiqasiga ≈5 l, soatiga ≈300 l — tanadagi ≈5 l qondan 60 marta ko‘p.'
    ]},
    {sarlavha:'Sog‘liq va ko‘p uchraydigan xatolar', xatboshilar:[
      'Yurak va tomirlar salomatligi uchun muntazam jismoniy faollik, tuz va yog‘ni me’yorida iste’mol qilish, tamakidan voz kechish muhim. Jahon sog‘liqni saqlash tashkiloti ma’lumotlariga ko‘ra, yurak-qon tomir kasalliklari dunyoda o‘limning yetakchi sababi hisoblanadi. Arterial bosimni vaqti-vaqti bilan o‘lchash xastalikni erta aniqlashga yordam beradi.',
      'Birinchi keng tarqalgan xato — «arteriyada doim kislorodli, venada doim kislorodsiz qon oqadi» deb o‘ylash; o‘pka tomirlari bunga istisno. Ikkinchi xato — katta doirani o‘ng qorinchadan boshlash: katta doira chap qorinchadan, kichik doira o‘ng qorinchadan boshlanadi.',
      'Uchinchi xato — yurakni tananing chap tomonida deb hisoblash: u ko‘krak qafasining o‘rtasida, faqat uchi chap tomonga qaragan. To‘rtinchi xato — venoz qonni «ko‘k» deb o‘ylash. Venoz qon to‘q qizil rangda; venalar teri orqali ko‘kimtir ko‘rinishi yorug‘likning teri va to‘qimalarda yutilishi va sochilishi bilan bog‘liq. Modeldagi ko‘k rang faqat shartli belgi.'
    ]}
  ],
  formulalar:[
    ['Daqiqalik hajm = zarb hajmi × yurak urish soni','≈70 ml × 70 ≈ 4,9 l/daq'],
    ['Kichik doira: o‘ng qorincha → o‘pka arteriyasi → o‘pka → o‘pka venalari → chap bo‘lmacha','O‘pka doirasi'],
    ['Katta doira: chap qorincha → aorta → a’zolar → kovak venalar → o‘ng bo‘lmacha','Tana doirasi'],
    ['Bir kunda urishlar ≈ 70 × 60 × 24 ≈ 100 800','Tinch holatdagi taxminiy hisob'],
    ['Qon hajmi ≈ tana massasi × 0,07 (l/kg)','Masalan, 70 kg → ≈4,9 l']
  ],
  qiziqarli:[
    'Tinch holatda yurak bir daqiqada ≈5 l qon haydaydi — bu tanadagi deyarli barcha qon.',
    'Daqiqasiga 70 marta urgan yurak bir kunda taxminan 100 ming marta qisqaradi.',
    'Ibn an-Nafis XIII asrda, Garveydan qariyb 400 yil oldin, kichik qon aylanish doirasini ta’riflagan.',
    'Kapillyarlar shunchalik ingichkaki (≈5–10 mkm), eritrotsitlar ular ichidan deyarli bittalab o‘tadi.',
    'Venoz qon ko‘k emas, to‘q qizil — venalarning ko‘kimtir ko‘rinishi teri orqali yorug‘lik yutilishi bilan bog‘liq.'
  ],
  lugat:[
    ['Arteriya','Qonni yurakdan a’zolarga olib ketuvchi tomir.'],
    ['Vena','Qonni a’zolardan yurakka olib keluvchi tomir.'],
    ['Kapillyar','Moddalar almashinuvi boradigan eng ingichka tomir.'],
    ['Aorta','Chap qorinchadan chiqadigan eng yirik arteriya.'],
    ['Bo‘lmacha','Qonni qabul qiluvchi yurak kamerasi.'],
    ['Qorincha','Qonni tomirlarga haydovchi yurak kamerasi.'],
    ['Klapan','Qonni bir yo‘nalishda o‘tkazuvchi to‘siq.'],
    ['Arterial qon','Kislorodga boy qon.'],
    ['Venoz qon','Kislorodi kam, CO₂ ga boy qon.'],
    ['Darvoza venasi','Ichak, oshqozon va taloqdan jigarga qon olib boruvchi vena.'],
    ['Puls','Arteriya devorining yurak qisqarishi bilan tebranishi.']
  ],
  manba:QON+'; JSST «Cardiovascular diseases» ma’lumot varag‘i; W. Harvey «Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus» (1628). Yurak massasi va a’zolarning qon ulushi manbalarda farq qiladi — oraliq qiymatlar berildi.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D anatomik model, sxema tuzish, juftlikda «qon tomchisi sayohati»',
    maqsad:{talimiy:'Yurak tuzilishi, arteriya, vena va kapillyarlar, katta va kichik qon aylanish doiralarini o‘rgatish.',
      tarbiyaviy:'Sog‘lom turmush tarziga, yurak salomatligini asrashga ongli munosabat; ilm tarixiga hurmat.',
      rivojlantiruvchi:'Jarayonni ketma-ketlikda tasvirlash, sxema bilan ishlash, istisnolarni tahlil qilish.'},
    natijalar:['Yurak kameralari va klapanlarini ko‘rsatadi','Katta va kichik doira yo‘lini to‘g‘ri tartibda aytadi','Arteriya va venani yo‘nalish bo‘yicha farqlaydi (o‘pka tomirlari istisnosi bilan)','Jigar, buyrak, miya qon ta’minoti xususiyatlarini tushuntiradi'],
    jihozlar:['MAKON 3D sahnasi «Inson tanasi» (a’zolar va qon tomirlar)','Proyektor','Yurak muljaji yoki plakati','Doiralar sxemasi tarqatmasi','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> O‘quvchilar pulsni 15 soniya sanaydi va 4 ga ko‘paytiradi.','Pulsni o‘lchaydi.'],
      ['8–18','<b>Yurak.</b> MAKON da yurak, kameralar, klapanlar; arteriya/vena ranglari.','Yurak sxemasini chizadi.'],
      ['18–30','<b>Ikki doira.</b> Kichik va katta doirani modelda o‘pka, miya, jigar, buyrak orqali kuzatadi.','«Qon tomchisi sayohati» ketma-ketligini yozadi.'],
      ['30–35','<b>Istisno va tarix.</b> O‘pka arteriyasi, Ibn an-Nafis, Garvey, Malpigi.','Savollarga javob beradi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON «Qon aylanish a’zolarini toping» mashqi va test.','Mashq va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Arteriya','Yurakdan olib ketuvchi tomir.'],['Vena','Yurakka olib keluvchi tomir.'],['Kapillyar','Eng ingichka tomir.'],['Aorta','Eng yirik arteriya.'],['Qorincha','Haydovchi kamera.']],
    savollar:[['Katta doira qayerdan boshlanadi?','Chap qorinchadan'],['Kichik doira qayerda tugaydi?','Chap bo‘lmachada'],['O‘pka arteriyasida qanday qon?','Venoz'],['Yurak nechta kamerali?','4'],['Darvoza venasi qonni qayerga olib boradi?','Jigarga']],
    uy:'Darslikdagi mavzuni o‘qish; (1) katta va kichik doira sxemasini rangli chizish; (2) tinch holatda va 20 marta o‘tirib-turgandan keyin pulsni o‘lchab, farqni tushuntirish; (3) yurak urish soni 75, zarb hajmi 70 ml bo‘lsa, daqiqalik hajmni topish (javob: 5,25 l).',
    manba:QON
  }
}
});
})();
