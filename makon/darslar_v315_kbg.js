/* MAKON v3.15 — «kbg» guruhi: 10 ta yangi dars (kimyo 2, biologiya 3, geografiya 5) + detal kartalari MAKON_DETAL.kbg_*.
   index.html da detallar2.js dan KEYIN yuklanadi; sahnalar: lib/sahna_v315_kbg.js (MAKON_SAHNA['kbg_*']).
   Qoida: faqat manbali fakt; manbalar farq qilsa — matnda ikkalasi; tekshirilmagani «taxminiy», sxematik model — «sxematik».
   Fayl ekran\v315_kbg\parts\*.js bo‘laklaridan yig‘ilgan (yig.py). */
(function(){
const FAN = window.MAKON_FAN;
if(!FAN || !window.MAKON_DARS) return;
const D = window.MAKON_DARS;
const F = id=>FAN.find(f=>f.id===id);
const bogla = (fanId, nom, dars, qisqa, eskiNomlar)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom===nom || x.dars===dars || (eskiNomlar||[]).includes(x.nom));
  if(m){ m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.push({nom, dars, qisqa});
};
const DT = {};

/* ===== kimyo-kislota-asos ===== */
(function(){
const KM8 = '8-sinf «Kimyo» darsligi (O‘zbekiston, amaldagi nashr) — «Kislotalar, asoslar, tuzlar», «Elektrolitik dissotsilanish» boblari';
const PHW = 'Wikipedia (inglizcha): «pH» (en.wikipedia.org/wiki/PH), «pH indicator» (en.wikipedia.org/wiki/PH_indicator), «Neutralization (chemistry)», «Søren Peder Lauritz Sørensen», «Svante Arrhenius»';
const LIB = 'LibreTexts Chemistry «Acid-Base Indicators» (chem.libretexts.org); US EPA «What is pH?» (epa.gov/goldkingmine/what-ph); USGS «pH and Water» (usgs.gov)';
const CLP = 'CLEAPSS Student Safety Sheets 20 «Hydrochloric acid» va 31 «Sodium hydroxide» (science.cleapss.org.uk, 2022)';

bogla('kimyo', 'Kislota va asoslar', 'kimyo-kislota-asos', 'pH shkalasi, indikatorlar, neytrallanish — tomchilab qo‘shing va rangni kuzating', ['Kislota va asoslar']);

D['kimyo-kislota-asos'] = {
  fan:'kimyo', qisqaNom:'Kislota va asoslar', nom:'Kislotalar, asoslar va tuzlar: pH va neytrallanish',
  qisqa:'8-sinf · Kimyo · virtual stakan, 4 indikator, pH shkalasi, ionlar',
  sinf:'8-sinf',
  sahna:'kbg_kislota',
  kor:{
    sarlavha:'Muhit qanday bo‘ladi: kislotali, neytral yoki ishqoriy?',
    matn:'Stakanda 50 mL distillangan suv va indikator bor. Unga 0,1 M xlorid kislota (HCl) yoki 0,1 M natriy gidroksid (NaOH) eritmasidan qo‘shing: pH-metr qiymati, indikator rangi va stakandagi ionlar o‘zgaradi. Kislota suvda H⁺ ionlarini, ishqor esa OH⁻ ionlarini beradi. Ular uchrashsa suv hosil bo‘ladi — bu neytrallanish reaksiyasi, eritmada esa tuz (NaCl) ionlari qoladi. Orqadagi pH shkalasi bloklarini bosing — har bir qiymatga kundalik hayotdan misollar chiqadi.',
    punktlar:[
      '<b>Kislota</b> — suvda dissotsilanib H⁺ (aniqrog‘i H₃O⁺) ionlarini hosil qiladigan modda: HCl → H⁺ + Cl⁻',
      '<b>Asos (ishqor)</b> — suvda OH⁻ ionlarini hosil qiladigan modda: NaOH → Na⁺ + OH⁻',
      '<b>pH</b> = −lg[H⁺]; 25 °C da pH < 7 — kislotali, pH = 7 — neytral, pH > 7 — ishqoriy muhit',
      '<b>Neytrallanish:</b> HCl + NaOH → NaCl + H₂O; ionli ko‘rinishi H⁺ + OH⁻ → H₂O'
    ]
  },
  bolimlar:[
    {sarlavha:'Moddalar sinflari: qisqa jadval', jadval:[
      ['Kislota','H⁺ beradi; tarkibi: vodorod + kislota qoldig‘i (HCl, H₂SO₄, HNO₃, H₃PO₄)'],
      ['Asos','OH⁻ guruhli: metall + gidroksil guruh (NaOH, KOH, Ca(OH)₂, Cu(OH)₂)'],
      ['Ishqor','Suvda eriydigan asos (NaOH, KOH, Ca(OH)₂ — oz eriydi)'],
      ['Tuz','Metall kationi + kislota qoldig‘i anioni (NaCl, CuSO₄, KNO₃, CaCO₃)']
    ], matn:'Asoslarning hammasi ham ishqor emas: masalan, mis(II) gidroksid Cu(OH)₂ suvda deyarli erimaydi, shuning uchun u asos, lekin ishqor emas.'},
    {sarlavha:'Indikatorlar va ularning rangi', jadval:[
      ['Fenolftalein','kislotali va neytral muhitda rangsiz; pH ≈ 8,2 dan (ba’zi manbalarda 8,3) malina rangga kiradi (10 gacha to‘liq). Juda kuchli ishqoriy muhitda (pH ≈ 13 dan yuqori) yana rangsizlanishi mumkin'],
      ['Metilzarg‘aldoq','pH < 3,1 — qizil, 3,1–4,4 — to‘q sariq (o‘tish), pH > 4,4 — sariq'],
      ['Lakmus','pH ≈ 4,5 dan past — qizil, 4,5–8,3 — binafsha (o‘tish), 8,3 dan yuqori — ko‘k. Sahnada soddalashtirilgan: 5 va 8 chegaralari'],
      ['Universal indikator','bir necha indikator aralashmasi: kuchli kislotada qizil → to‘q sariq → sariq → neytralda yashil → ko‘k → kuchli ishqorda binafsha (ranglar ishlab chiqaruvchiga qarab biroz farq qiladi)']
    ], matn:'O‘tish oraliqlari manbaga, indikator konsentratsiyasiga va haroratga qarab biroz farq qiladi (LibreTexts, Wikipedia «pH indicator»).'},
    {sarlavha:'Kundalik hayotda pH (taxminiy qiymatlar)', jadval:[
      ['Oshqozon shirasi','1,5–3,5'],
      ['Limon sharbati','≈ 2 (2–2,6)'],
      ['Sirka (5 %)','2,4–3,4'],
      ['Qora qahva','≈ 5'],
      ['Ifloslanmagan yomg‘ir suvi','≈ 5,6 (havodagi CO₂ erigani uchun)'],
      ['Sof suv (25 °C)','7,0'],
      ['Odam qoni','7,35–7,45'],
      ['Dengiz suvi','≈ 8,1 (8,0–8,2)'],
      ['Ichimlik sodasi eritmasi','≈ 8,3'],
      ['Ohak suvi (to‘yingan Ca(OH)₂)','≈ 12,4']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Toza suv: neytral muhit', matn:'Stakanda 50 mL distillangan suv va universal indikator. pH-metr 7,00 ni ko‘rsatadi, indikator — yashil. Sof suvda H⁺ va OH⁻ ionlari juda kam va teng: 25 °C da har biri 10⁻⁷ mol/L. Amalda ochiq turgan distillangan suv havodan CO₂ yutib, pH ≈ 5,6–6 gacha tushishi mumkin — model ideal suvni ko‘rsatadi.', holat:{qayta:true, indikator:'universal', ionlar:true, tanla:'ph7'}},
    {sarlavha:'Kislota qo‘shamiz: H⁺ ionlari', matn:'Xlorid kislota suvda to‘liq dissotsilanadi: HCl → H⁺ + Cl⁻. Eritmada H⁺ ionlari (qizil sharchalar) ko‘payadi, pH 7 dan pastga tushadi, universal indikator qizaradi. pH = 2 da [H⁺] = 0,01 mol/L — bu neytral suvdagidan 100 000 marta ko‘p.', holat:{indikator:'universal', ionlar:true, ph:2, tanla:'ph2'}},
    {sarlavha:'Ishqor qo‘shamiz: OH⁻ ionlari', matn:'Natriy gidroksid suvda: NaOH → Na⁺ + OH⁻. OH⁻ ionlari (ko‘k sharchalar) ko‘payadi, pH 7 dan yuqori, universal indikator ko‘k-binafsha bo‘ladi. pH = 12 da [OH⁻] = 0,01 mol/L.', holat:{indikator:'universal', ionlar:true, ph:12, tanla:'ph12'}},
    {sarlavha:'Neytrallanish: H⁺ + OH⁻ → H₂O', matn:'Kislotali eritmaga ishqor tomizsak, H⁺ va OH⁻ ionlari uchrashib suv molekulasini hosil qiladi. Teng miqdordagi (mol) kislota va ishqor qo‘shilganda pH = 7 bo‘ladi, eritmada faqat Na⁺ va Cl⁻ — osh tuzi ionlari qoladi. Masalan, 5 mL 0,1 M HCl ni aynan 5 mL 0,1 M NaOH neytrallaydi (0,5 mmol ga 0,5 mmol).', holat:{indikator:'universal', ionlar:true, ph:7, tanla:'ph7'}},
    {sarlavha:'Fenolftalein: ishqorni «ushlaydi»', matn:'Fenolftalein kislotali va neytral muhitda rangsiz, pH ≈ 8,2 dan yuqorida malina rangga kiradi. Shuning uchun u ishqorni aniqlashda qulay: rangsiz eritmaga bir tomchi ishqor qo‘shilishi bilan pushti rang paydo bo‘ladi.', holat:{indikator:'fenolftalein', ionlar:false, ph:10, tanla:'ph10'}},
    {sarlavha:'Metilzarg‘aldoq va lakmus', matn:'Metilzarg‘aldoq kislotani yaxshi ko‘rsatadi: pH < 3,1 da qizil, 4,4 dan yuqorida sariq. Lakmus eng qadimgi indikatorlardan: kislotada qizil, ishqorda ko‘k. Bitta indikator butun shkalani ko‘rsatmaydi — shuning uchun universal indikator bir necha indikator aralashmasidan tayyorlanadi.', holat:{indikator:'metilzargaldoq', ionlar:false, ph:2.5, tanla:'ph3'}},
    {sarlavha:'pH shkalasi: har qadam — 10 marta', matn:'pH logarifmik kattalik: pH 1 birlikka kamaysa, H⁺ konsentratsiyasi 10 marta ortadi. Limon sharbati (pH ≈ 2) qahvadan (pH ≈ 5) taxminan 1 000 marta kislotaliroq. Qonning pH 7,35–7,45 oralig‘ida saqlanadi — bu organizm uchun hayotiy muhim. Shkala bloklarini bosib, misollar bilan tanishing.', holat:{indikator:'universal', ionlar:true, ph:7.4, tanla:'ph7'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Virtual titrlash: muhitni boshqaring', holat:{qayta:true, indikator:'universal', ionlar:true},
    topshiriqlar:[
      {shart:'Stakandagi suvga <b>xlorid kislota</b> qo‘shib, eritmani kuchli kislotali qiling: <b>pH 3 dan past</b>.', hodisa:'kbg-ph', kod:"ev.ph<3", izoh:'To‘g‘ri — pH 3 dan past. 1 mL 0,1 M HCl ning o‘zi 50 mL suvda pH ≈ 2,7 beradi.'},
      {shart:'Endi <b>NaOH</b> qo‘shib neytrallang: pH <b>6,5–7,5</b> oralig‘iga keltiring (kislota ham, ishqor ham qo‘shilgan bo‘lsin).', hodisa:'kbg-ph', kod:"ev.muhit==='neytral'&&ev.kislota>0&&ev.ishqor>0", izoh:'To‘g‘ri — neytrallanish: H⁺ + OH⁻ → H₂O. Kislota va ishqor hajmi teng bo‘lsa (konsentratsiyalar bir xil), pH = 7.'},
      {shart:'<b>Fenolftalein</b> indikatorini tanlang va eritmani <b>malina rangga</b> kiriting.', hodisa:'kbg-ph', kod:"ev.indikator==='fenolftalein'&&ev.ph>=8.2", izoh:'To‘g‘ri — fenolftalein pH ≈ 8,2 dan yuqorida malina rangga kiradi: muhit ishqoriy.'},
      {shart:'<b>Metilzarg‘aldoq</b>ni tanlang va eritmani <b>qizil</b> rangga kiriting.', hodisa:'kbg-ph', kod:"ev.indikator==='metilzargaldoq'&&ev.ph<3.1", izoh:'To‘g‘ri — metilzarg‘aldoq pH < 3,1 da qizil. Demak, eritma kuchli kislotali.'},
      {shart:'Stakanda ishqorga xos ionni — <b>gidroksid ionini (OH⁻)</b> bosing (kerak bo‘lsa, avval NaOH qo‘shing va «Ionlar»ni yoqing).', hodisa:'kbg-kislota', kod:"ev.nom==='OH'", izoh:'To‘g‘ri — OH⁻ ioni. Aynan u eritmaga ishqoriy xossa beradi.'},
      {shart:'pH shkalasida <b>odam qonining</b> pH iga eng yaqin blokni bosing (7,35–7,45).', hodisa:'kbg-kislota', kod:"ev.nom==='ph7'", izoh:'To‘g‘ri — qon pH i 7,35–7,45: neytraldan biroz ishqoriy tomonda.'}
    ]},
  test:[
    {s:'Qaysi modda suvda dissotsilanib H⁺ ionlarini hosil qiladi?', v:['NaOH','HCl','NaCl','Ca(OH)₂'], t:1, izoh:'<b>HCl</b> — xlorid kislota: HCl → H⁺ + Cl⁻. NaOH va Ca(OH)₂ — asoslar, NaCl — tuz.'},
    {s:'25 °C da neytral muhitning pH qiymati qancha?', v:['0','7','10','14'], t:1, izoh:'Neytral muhitda <b>pH = 7</b>: [H⁺] = [OH⁻] = 10⁻⁷ mol/L.'},
    {s:'pH = 3 bo‘lgan eritma pH = 5 bo‘lgan eritmadan necha marta kislotaliroq (H⁺ konsentratsiyasi bo‘yicha)?', v:['2 marta','20 marta','100 marta','1000 marta'], t:2, izoh:'pH farqi 2 birlik → [H⁺] farqi 10² = <b>100 marta</b>.'},
    {s:'Fenolftalein ishqoriy muhitda qanday rangga kiradi?', v:['Qizil','Ko‘k','Malina (pushti)','Sariq'], t:2, izoh:'Fenolftalein kislotali va neytral muhitda rangsiz, ishqoriy muhitda (pH ≈ 8,2 dan yuqori) — <b>malina (pushti)</b>.'},
    {s:'Metilzarg‘aldoq kuchli kislotali muhitda (pH < 3,1) qanday rangda bo‘ladi?', v:['Sariq','Qizil','Rangsiz','Yashil'], t:1, izoh:'Metilzarg‘aldoq pH < 3,1 da <b>qizil</b>, 3,1–4,4 da to‘q sariq, 4,4 dan yuqorida sariq.'},
    {s:'Neytrallanish reaksiyasining ionli tenglamasi qaysi?', v:['Na⁺ + Cl⁻ → NaCl','H⁺ + OH⁻ → H₂O','2H⁺ + 2e⁻ → H₂','H₂O → H⁺ + OH⁻'], t:1, izoh:'Mohiyati: <b>H⁺ + OH⁻ → H₂O</b>. Na⁺ va Cl⁻ ionlari reaksiyada qatnashmaydi — eritmada qoladi.'},
    {s:'HCl + NaOH → ? + H₂O. Hosil bo‘ladigan tuzni toping.', v:['NaCl','NaClO','Na₂O','HClO'], t:0, izoh:'Xlorid kislota va natriy gidroksid <b>NaCl</b> (osh tuzi) va suv hosil qiladi.'},
    {s:'Quyidagilardan qaysi biri ishqor (suvda eriydigan asos)?', v:['Cu(OH)₂','Fe(OH)₃','KOH','H₂SO₄'], t:2, izoh:'<b>KOH</b> suvda yaxshi eriydi — ishqor. Cu(OH)₂ va Fe(OH)₃ — erimaydigan asoslar, H₂SO₄ — kislota.'},
    {s:'Odam qonining normal pH oralig‘i qaysi?', v:['6,35–6,45','7,00–7,05','7,35–7,45','8,35–8,45'], t:2, izoh:'Qon pH i <b>7,35–7,45</b> — biroz ishqoriy; bu oraliqdan chiqish sog‘liq uchun xavfli.'},
    {s:'50 mL 0,1 M HCl ni to‘liq neytrallash uchun 0,1 M NaOH dan qancha kerak?', v:['25 mL','50 mL','100 mL','5 mL'], t:1, izoh:'n(HCl) = 0,1 · 0,05 = 0,005 mol; NaOH ham 0,005 mol kerak → V = 0,005 / 0,1 = 0,05 L = <b>50 mL</b>.'},
    {s:'Suyultirilgan kislota tayyorlashda to‘g‘ri tartib qaysi?', v:['Kislotaga suv quyiladi','Suvga kislota oz-ozdan quyiladi','Ikkalasi bir vaqtda quyiladi','Tartibning ahamiyati yo‘q'], t:1, izoh:'<b>Suvga kislota oz-ozdan quyiladi</b> (aralashtirib turib). Aksincha qilinsa, kuchli qizish sababli eritma sachrashi mumkin — ayniqsa konsentrlangan sulfat kislotada.'},
    {s:'pH tushunchasini 1909-yilda kim kiritgan?', v:['S. Arrenius','S. P. L. Syorensen','D. I. Mendeleyev','A. Lavuazye'], t:1, izoh:'Daniyalik biokimyogar <b>S. P. L. Syorensen</b> (Karlsberg laboratoriyasi, Kopengagen) 1909-yilda. Arrenius esa elektrolitik dissotsilanish nazariyasi muallifi (1887; Nobel mukofoti 1903).'},
    {tur:'3d', s:'Sahnadagi pH shkalasida <b>neytral muhitga</b> mos blokni bosing.', hodisa:'kbg-kislota', kalit:'nom', togri:['ph7'], v:['pH 7 bloki','boshqa blok yoki qism'], t:0,
      izoh:'<b>pH 7</b> — 25 °C da neytral muhit: [H⁺] = [OH⁻]. Undan chapda — kislotali, o‘ngda — ishqoriy muhit.'},
    {tur:'3d', s:'pH shkalasida <b>oshqozon shirasiga</b> (pH ≈ 1,5–3,5) mos keladigan istalgan blokni bosing.', hodisa:'kbg-kislota', kalit:'nom', togri:['ph1','ph2','ph3'], v:['pH 1, 2 yoki 3 bloki','boshqa blok yoki qism'], t:0,
      izoh:'Oshqozon shirasi tarkibida xlorid kislota bor, uning pH i <b>1,5–3,5</b> — kuchli kislotali muhit.'}
  ],
  yordamchi:[
    {s:'Nega pH 7 dan past bo‘lsa kislotali?', j:'Suvda doim oz miqdorda H⁺ va OH⁻ ionlari bor. 25 °C da ularning konsentratsiyalari ko‘paytmasi o‘zgarmas: [H⁺]·[OH⁻] = 10⁻¹⁴. Sof suvda ikkalasi teng — 10⁻⁷ mol/L, ya’ni pH = 7. Kislota qo‘shilsa H⁺ ko‘payadi, pH kamayadi (7 dan past); ishqor qo‘shilsa OH⁻ ko‘payadi, H⁺ kamayadi va pH 7 dan oshadi.', kalit:['ph','7','neytral','nega']},
    {s:'Kislotani tatib ko‘rsa bo‘ladimi?', j:'Yo‘q! Laboratoriyada hech qanday moddani tatib ko‘rish, hidlash uchun to‘g‘ridan-to‘g‘ri burunga yaqinlashtirish mumkin emas. Muhitni faqat indikator yoki pH-metr bilan aniqlang. Oziq-ovqatdagi kislotalar (limon, sirka) ham laboratoriya idishida bo‘lsa — reaktiv hisoblanadi.', kalit:['tatib','xavfsiz','ta’m','xavfsizlik']},
    {s:'Kislota terimga tegsa nima qilaman?', j:'Darhol o‘qituvchiga ayting. Kiyimni yeching, suyuqlikni quruq mato bilan tez arting va joyni kamida 20 daqiqa oqib turgan sovuq suv bilan yuving (CLEAPSS, 2022; eski qo‘llanmalarda 10–15 daqiqa). Ko‘zga tushsa — ko‘zni ochiq ushlab, kamida 20 daqiqa yuving va tibbiy yordam chaqiring. Ishqor ko‘z uchun kislotadan ham xavfliroq.', kalit:['teri','ko‘z','tegsa','birinchi yordam','kuydi']}
  ],
  maqola:[
    {sarlavha:'Kislotalar va asoslar: ta’rif', xatboshilar:[
      'Kislotalar kundalik hayotda juda ko‘p uchraydi: limon va olmadagi organik kislotalar, sirkadagi sirka kislota, oshqozon shirasidagi xlorid kislota, akkumulyatordagi sulfat kislota. Ularning umumiy xossasi — nordon ta’m (laboratoriyada tatib ko‘rilmaydi!), indikator rangini o‘zgartirish, faol metallar bilan vodorod ajratish va asoslar bilan reaksiyaga kirishish.',
      'Shved olimi Svante Arrenius elektrolitik dissotsilanish nazariyasini yaratgan (asosiy maqolasi 1887-yil; 1903-yilda Nobel mukofoti). Unga ko‘ra, kislota — suvda dissotsilanib vodorod kationi H⁺ ni hosil qiladigan modda: HCl → H⁺ + Cl⁻. Aslida H⁺ ioni suvda erkin yurmaydi — u suv molekulasiga birikib gidroksoniy ioni H₃O⁺ ni hosil qiladi. Maktab kursida qisqalik uchun H⁺ deb yoziladi.',
      'Asos — metall atomi va bir yoki bir necha gidroksil guruh (OH) dan tashkil topgan murakkab modda. Suvda eriydigan asoslar ishqorlar deyiladi: NaOH (o‘yuvchi natriy), KOH (o‘yuvchi kaliy), Ca(OH)₂ (so‘ndirilgan ohak — oz eriydi). Ishqor suvda gidroksid ionlarini beradi: NaOH → Na⁺ + OH⁻. Ishqor eritmalari qo‘lda sovunga o‘xshash sirpanchiq his beradi — bu ular teri yog‘lari va oqsillarini parchalayotganidan darak, ya’ni xavfli belgi.'
    ]},
    {sarlavha:'pH shkalasi va indikatorlar', xatboshilar:[
      '1909-yilda daniyalik biokimyogar Syoren Syorensen Kopengagendagi Karlsberg laboratoriyasida fermentlarni o‘rganar ekan, H⁺ konsentratsiyasini qulay ifodalash uchun pH kattaligini kiritgan: pH = −lg[H⁺]. Masalan, [H⁺] = 0,001 mol/L bo‘lsa, pH = 3. Shkala odatda 0 dan 14 gacha chiziladi, lekin juda konsentrlangan eritmalarda pH 0 dan kichik yoki 14 dan katta ham bo‘lishi mumkin.',
      'Suvning o‘zi ham juda oz dissotsilanadi: H₂O ⇄ H⁺ + OH⁻. 25 °C da [H⁺]·[OH⁻] = 10⁻¹⁴ (suvning ion ko‘paytmasi). Shu sababli pH + pOH = 14. Agar pH = 12 bo‘lsa, pOH = 2, ya’ni [OH⁻] = 0,01 mol/L. Harorat o‘zgarsa bu ko‘paytma ham o‘zgaradi — shuning uchun «neytral = 7» qoidasi aniq 25 °C uchun.',
      'Indikator — muhitga qarab rangini o‘zgartiradigan modda. Fenolftalein kislotali va neytral muhitda rangsiz, ishqoriy muhitda (pH ≈ 8,2 dan) malina rangda. Metilzarg‘aldoq pH 3,1 dan past qizil, 4,4 dan yuqori sariq. Lakmus kislotada qizil, ishqorda ko‘k. Universal indikator bir necha indikator aralashmasi bo‘lib, butun shkala bo‘ylab rangini qizildan binafshagacha o‘zgartiradi. Aniq qiymatni pH-metr — shisha elektrodli asbob o‘lchaydi.',
      'Tabiatda ham indikatorlar bor: qizil karam sharbati kislotada qizil, ishqorda yashil-sariq rangga kiradi (antotsianlar tufayli). Gortenziya gullari tuproq kislotaliligiga qarab ko‘k yoki pushti bo‘lishi ma’lum (rang tuproqdagi alyuminiy bilan ham bog‘liq).'
    ]},
    {sarlavha:'Neytrallanish va tuzlar', xatboshilar:[
      'Kislota va asos o‘zaro ta’sirlashib tuz va suv hosil qiladi — bu neytrallanish reaksiyasi: HCl + NaOH → NaCl + H₂O. Ionli ko‘rinishda: H⁺ + Cl⁻ + Na⁺ + OH⁻ → Na⁺ + Cl⁻ + H₂O. Reaksiyada qatnashmagan Na⁺ va Cl⁻ ionlari qisqartirilsa, qisqa ionli tenglama qoladi: H⁺ + OH⁻ → H₂O. Reaksiya issiqlik chiqaradi (ekzotermik).',
      'Kuchli kislota va kuchli ishqor ekvivalent miqdorda olinsa, eritma neytral bo‘ladi. Hisob sodda: n = c · V. Masalan, 20 mL 0,1 M HCl da 0,002 mol H⁺ bor, uni 0,002 mol NaOH — ya’ni 20 mL 0,1 M NaOH neytrallaydi. Laboratoriyada konsentratsiyasi noma’lum eritmani shu tarzda aniqlash titrlash deyiladi: byuretkadan ishqor tomchilab qo‘shiladi, indikator rangi o‘zgargan paytda (ekvivalentlik nuqtasi yaqinida) qo‘shish to‘xtatiladi.',
      'Tuz — metall kationi va kislota qoldig‘idan iborat modda: NaCl (osh tuzi), CaCO₃ (bo‘r, marmar), CuSO₄ (mis kuporosi), KNO₃ (kaliyli selitra). Tuzlar neytrallanishdan tashqari metallning kislota bilan, oksidlarning o‘zaro va boshqa reaksiyalarida ham hosil bo‘ladi. Ba’zi tuzlarning eritmasi neytral emas: ichimlik sodasi (NaHCO₃) eritmasi biroz ishqoriy, pH ≈ 8,3.'
    ]},
    {sarlavha:'Hayotda va tabiatda pH', xatboshilar:[
      'Organizmda pH qat’iy nazorat qilinadi: qon pH i 7,35–7,45 oralig‘ida saqlanadi, oshqozon shirasi esa kuchli kislotali (pH 1,5–3,5) — u mikroblarni o‘ldiradi va pepsin fermenti ishlashi uchun muhit yaratadi. Oshqozon kislotasi ortiqcha bo‘lsa, shifokor tavsiyasi bilan antatsid dorilar (masalan, magniy gidroksid suspenziyasi, pH ≈ 10,5) ishlatiladi — bu ham neytrallanish.',
      'Ifloslanmagan yomg‘ir suvi biroz kislotali — pH ≈ 5,6, chunki havodagi CO₂ erib, kuchsiz karbonat kislota hosil qiladi. Zavod va avtomobillardan chiqqan oltingugurt va azot oksidlari yomg‘irni yanada kislotali qiladi — «kislotali yomg‘ir» o‘rmonlar, ko‘llar va tosh yodgorliklarga zarar yetkazadi.',
      'Dehqonchilikda tuproq pH i muhim: ko‘pchilik ekinlar neytralga yaqin tuproqni yaxshi ko‘radi. Kislotali tuproqqa ohak solinadi (ohaklash), sho‘rxok-ishqoriy tuproqlarga gips solinishi mumkin. Dengiz suvining pH i ≈ 8,1; okean atmosferadan CO₂ yutgani sari u sekin pasaymoqda — bu «okean kislotalanishi» deyiladi.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — «pH 14 dan katta bo‘lmaydi» deb o‘ylash. 0–14 — faqat odatiy shkala; masalan, konsentrlangan xlorid kislotada pH manfiy bo‘lishi mumkin. Ikkinchi xato — pH ni chiziqli deb hisoblash: pH 4 eritma pH 5 eritmadan 2 marta emas, 10 marta kislotaliroq.',
      'Uchinchi xato — har qanday asosni ishqor deyish: Cu(OH)₂, Fe(OH)₃ suvda erimaydi, ular ishqor emas. To‘rtinchi xato — kislotani suyultirishda suvni kislotaga quyish. Qoida: <b>suvga kislota</b> quyiladi, oz-ozdan, aralashtirib turib.'
    ]}
  ],
  formulalar:[
    ['pH = −lg[H⁺]','Vodorod ko‘rsatkichi; [H⁺] — mol/L'],
    ['[H⁺] = 10^(−pH)','Masalan, pH = 3 → [H⁺] = 0,001 mol/L'],
    ['[H⁺]·[OH⁻] = 10⁻¹⁴ (25 °C)','Suvning ion ko‘paytmasi; pH + pOH = 14'],
    ['H⁺ + OH⁻ → H₂O','Neytrallanishning qisqa ionli tenglamasi'],
    ['n = c · V','Modda miqdori (mol) = konsentratsiya (mol/L) × hajm (L)'],
    ['c(kislota)·V(kislota) = c(ishqor)·V(ishqor)','Bir asosli kuchli kislota va bir kislotali kuchli ishqorning ekvivalentlik sharti'],
    ['50 mL suv + 1 mL 0,1 M HCl: [H⁺] = 0,1·1/51 ≈ 0,00196 M → pH ≈ 2,71','Sahnadagi birinchi tomchi hisobi']
  ],
  qiziqarli:[
    '«pH» belgisini 1909-yilda Syorensen pivo zavodi (Karlsberg) laboratoriyasida kiritgan. «p» harfi nimani anglatishi haqida turli fikrlar bor (masalan, «potensial» yoki «kuch»).',
    'Qizil karam sharbati — uyda tayyorlanadigan indikator: kislotada qizil, neytralda binafsha, ishqorda yashil-sariq.',
    'Oshqozon devorini o‘z kislotasidan qalin shilliq qavat himoya qiladi.',
    'Ifloslanmagan yomg‘ir ham kislotali — pH ≈ 5,6: havodagi CO₂ tomchida erib karbonat kislota hosil qiladi.',
    'Chumoli chaqqanda og‘riq qisman chumoli kislotasi (HCOOH) tufayli; bu kislotaning nomi ham chumolidan olingan (lotincha formica — chumoli).',
    'pH 7 eritma pH 2 eritmadan 100 000 marta kam H⁺ ionli: har bir birlik — 10 marta.'
  ],
  lugat:[
    ['Kislota','Suvda H⁺ ionlarini hosil qiluvchi modda (HCl, H₂SO₄, HNO₃).'],
    ['Asos','Metall va gidroksil guruh(lar)dan iborat modda (NaOH, Cu(OH)₂).'],
    ['Ishqor','Suvda eriydigan asos; eritmada OH⁻ ionlari beradi.'],
    ['Tuz','Metall kationi va kislota qoldig‘idan tashkil topgan modda.'],
    ['Dissotsilanish','Elektrolitning suvda ionlarga ajralishi.'],
    ['Indikator','Muhitga qarab rangini o‘zgartiradigan modda.'],
    ['pH','Vodorod ko‘rsatkichi: −lg[H⁺].'],
    ['pH-metr','pH ni shisha elektrod yordamida o‘lchaydigan asbob.'],
    ['Neytrallanish','Kislota va asosdan tuz va suv hosil bo‘lishi.'],
    ['Titrlash','Eritma konsentratsiyasini ma’lum eritmani tomchilab qo‘shib aniqlash usuli.'],
    ['Ekvivalentlik nuqtasi','Kislota va ishqor miqdorlari teng bo‘lgan payt.'],
    ['Gidroksoniy ioni','H₃O⁺ — suvdagi H⁺ ning haqiqiy ko‘rinishi.'],
    ['Byuretka','Hajmni aniq o‘lchab tomchilab quyish uchun jo‘mrakli shisha naycha.']
  ],
  xavfsizlik:[
    'Kislota va ishqorlar bilan faqat <b>himoya ko‘zoynagi</b>da ishlang (konsentrlangan eritmalar bilan — yopiq ko‘zoynak) va o‘qituvchi nazoratida. Eng kichik konsentratsiya va hajmdan foydalaning.',
    'Suyultirishda <b>suvga kislota</b> quyiladi — oz-ozdan, aralashtirib turib. Kislotaga suv quyish mumkin emas: kuchli qizish sachrashga olib keladi.',
    'Hech qanday reaktivni <b>tatib ko‘rmang</b>, og‘iz bilan pipetkaga tortmang, hidini to‘g‘ridan-to‘g‘ri hidlamang.',
    'Ko‘zga tushsa: ko‘zni ochiq tutib, <b>kamida 20 daqiqa</b> sekin oqayotgan suv bilan yuving va tibbiy yordam chaqiring (CLEAPSS, 2022; eski qo‘llanmalarda 10–15 daqiqa deyiladi). Ishqor ko‘z uchun ayniqsa xavfli.',
    'Teriga tegsa: ifloslangan kiyimni yeching, quruq mato bilan tez arting va <b>kamida 20 daqiqa</b> oqar suv bilan yuving. Yutib yuborilsa — faqat og‘izni suv bilan chaying, qustirmang, tibbiy yordam chaqiring.',
    'GHS/CLEAPSS: 0,1 M HCl (2,7 M dan past) xavfli deb tasniflanmaydi, lekin ko‘z va teriga zarar yetkazishi mumkin; NaOH 0,5 M dan past — ta’sirlovchi (IRRITANT), 0,5 M va undan yuqori — o‘yuvchi (KORROZIV). To‘kilgan kislota soda bilan neytrallanib, ko‘p suv bilan yuviladi.'
  ],
  manba:KM8+'; '+PHW+'; '+LIB+'; '+CLP+'. Manbalar farqi: fenolftalein o‘tish boshi 8,2 yoki 8,3; lakmus 4,5–8,3 (sahnada soddalashtirilgan 5–8); oqartiruvchi pH 12,5 yoki 13; kundalik moddalarning pH i taxminiy.',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (virtual tajriba)', usul:'Virtual stakan va pH-metr, indikatorlar bilan tajriba, juftlikda hisoblash, muammoli savol',
    maqsad:{talimiy:'Kislota, asos (ishqor) va tuz tushunchalarini, pH shkalasini, indikatorlarning rangini va neytrallanish reaksiyasini o‘rganish; oddiy hisob n = c·V ni bajarish.',
      tarbiyaviy:'Laboratoriyada xavfsizlik madaniyatini, kimyoviy moddalarga mas’uliyatli munosabatni tarbiyalash.',
      rivojlantiruvchi:'Kuzatish, bashorat qilish va natijani tekshirish, logarifmik shkalani tushunish, jadval va grafik bilan ishlash ko‘nikmasini rivojlantirish.'},
    natijalar:['Kislota, asos, ishqor va tuzga misol keltiradi','pH qiymatiga qarab muhitni aniqlaydi','4 ta indikatorning rangini ayta oladi','Neytrallanish tenglamasini molekulyar va ionli ko‘rinishda yozadi','Kislota bilan ishlash xavfsizlik qoidalarini biladi'],
    jihozlar:['MAKON sahnasi «Kislota va asoslar» (virtual stakan, pH-metr, pH shkalasi)','Proyektor yoki interaktiv doska','Namoyish uchun (o‘qituvchi bajaradi): suyultirilgan HCl va NaOH (0,1 M), fenolftalein, universal indikator qog‘ozi, himoya ko‘zoynaklari','Qizil karam sharbati (ixtiyoriy)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b> Xavfsizlik qoidalarini eslatish.','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Nega limon nordon, sovun esa sirpanchiq?» Kundalik moddalar ro‘yxati bo‘yicha taxmin.','Moddalarni «kislotali/ishqoriy» deb taxminan ajratadi.'],
      ['8–20','<b>Virtual tajriba.</b> MAKON da suvga HCl, keyin NaOH qo‘shadi; pH-metr, indikator va ionlarni kuzatadi. H⁺ va OH⁻ ionlarini tushuntiradi.','Kuzatuv jadvalini to‘ldiradi (qo‘shilgan hajm — pH — rang).'],
      ['20–28','<b>Indikatorlar.</b> Fenolftalein, metilzarg‘aldoq, lakmus, universal indikatorni almashtirib ko‘rsatadi; haqiqiy namoyish (fenolftalein + NaOH).','Har indikator ranglarini jadvalga yozadi.'],
      ['28–35','<b>Neytrallanish va hisob.</b> HCl + NaOH → NaCl + H₂O; n = c·V masalasi.','Juftlikda masala yechadi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON amaliyoti «Virtual titrlash» va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Kislota','H⁺ beradi.'],['Ishqor','Suvda eriydigan asos, OH⁻ beradi.'],['Tuz','Metall + kislota qoldig‘i.'],['pH','−lg[H⁺].'],['Indikator','Muhitga qarab rang o‘zgartiruvchi modda.'],['Neytrallanish','Kislota + asos → tuz + suv.']],
    savollar:[['Neytral muhitda pH qancha?','7 (25 °C da)'],['Fenolftalein ishqorda qanday rangga kiradi?','Malina (pushti)'],['Neytrallanishning ionli tenglamasi?','H⁺ + OH⁻ → H₂O'],['pH 2 va pH 4 eritmalar necha marta farq qiladi?','100 marta'],['Suyultirishda nima nimaga quyiladi?','Suvga kislota']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) uydagi 5 ta moddani (limon, sirka, choy, sovunli suv, soda eritmasi) kislotali/neytral/ishqoriy deb jadvalga yozish (tatib ko‘rmasdan — jadval asosida!); (2) masala: 30 mL 0,2 M HCl ni neytrallash uchun 0,1 M NaOH dan qancha kerak? (javob: 60 mL); (3) ixtiyoriy: kattalar yordamida qizil karam indikatorini tayyorlab, rang o‘zgarishini chizish.',
    manba:KM8+'; '+PHW+'; '+CLP
  }
};

const W = 'Wikipedia (inglizcha)';
const phK = (ph, nom, sar, jad, matn)=>({nom, sarlavha2:sar, jadval:[['pH',String(ph)],['[H⁺], mol/L','10⁻'+['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¹⁰','¹¹','¹²','¹³','¹⁴'][ph]+(ph===0?' = 1':'')],['Muhit', ph<7 ? 'kislotali' : ph===7 ? 'neytral' : 'ishqoriy']].concat(jad), matn, manba:LIB+'; '+PHW+'. Kundalik moddalarning qiymatlari taxminiy.'});
DT.kbg_kislota = {
  stakan:{nom:'Kimyoviy stakan (eritma)', sarlavha2:'Laboratoriya idishi · 100 mL',
    jadval:[['Boshlang‘ich tarkib','50 mL distillangan suv + indikator'],['Qo‘shiladigan reaktivlar','0,1 M HCl va 0,1 M NaOH'],['Harorat (model)','25 °C']],
    matn:'Stakan issiqqa chidamli shishadan (borosilikat) yasaladi. Undagi eritma rangi indikatorga va pH ga bog‘liq. Modelda pH kuchli kislota va kuchli ishqor aralashmasi uchun aniq hisoblanadi: [H⁺]·[OH⁻] = 10⁻¹⁴.',
    manba:KM8+'; '+LIB},
  phmetr:{nom:'pH-metr', sarlavha2:'O‘lchov asbobi · shisha elektrod',
    jadval:[['O‘lchaydi','Eritmaning pH qiymatini (odatda 0,01 aniqlikda)'],['Ishlash asosi','Shisha elektrod potensiali H⁺ konsentratsiyasiga bog‘liq'],['Kalibrlash','Ma’lum pH li bufer eritmalar bilan (masalan, 4, 7, 10)']],
    matn:'pH-metr indikatorga qaraganda aniqroq: rangni ko‘z bilan baholash shart emas. Elektrod har o‘lchovdan keyin distillangan suv bilan chayiladi.',
    manba:W+' «pH meter»; '+LIB},
  tomizgich_kislota:{nom:'Xlorid kislota, HCl (0,1 M)', sarlavha2:'Kuchli kislota · tomizgich',
    jadval:[['Formula','HCl (vodorod xloridning suvdagi eritmasi)'],['Dissotsilanish','HCl → H⁺ + Cl⁻ (to‘liq)'],['0,1 M eritma pH i','≈ 1'],['Xavf (CLEAPSS)','2,7 M dan past — tasniflanmaydi, lekin ko‘z va teriga zarar yetkazishi mumkin']],
    matn:'Xlorid kislota oshqozon shirasi tarkibida ham bor. Konsentrlangan kislota (≈ 36 %) o‘yuvchi va HCl gazini chiqaradi — faqat mo‘rili shkafda. Sahnada har tugma 1 yoki 5 mL qo‘shadi.',
    manba:CLP+'; '+W+' «Hydrochloric acid»'},
  tomizgich_ishqor:{nom:'Natriy gidroksid, NaOH (0,1 M)', sarlavha2:'Ishqor · tomizgich',
    jadval:[['Formula','NaOH (o‘yuvchi natriy)'],['Dissotsilanish','NaOH → Na⁺ + OH⁻ (to‘liq)'],['0,1 M eritma pH i','≈ 13'],['Xavf (CLEAPSS)','0,5 M dan past — ta’sirlovchi; 0,5 M va undan yuqori — o‘yuvchi']],
    matn:'Ishqorlar ko‘z uchun ayniqsa xavfli: to‘qimani chuqur shikastlaydi. Qattiq NaOH havodan namlik va CO₂ yutadi, shuning uchun zich yopiq idishda saqlanadi.',
    manba:CLP+'; '+W+' «Sodium hydroxide»'},
  H:{nom:'Vodorod kationi, H⁺ (H₃O⁺)', sarlavha2:'Ion · kislotalik manbai',
    jadval:[['Zaryadi','+1'],['Suvdagi haqiqiy ko‘rinishi','H₃O⁺ — gidroksoniy ioni'],['Qayerdan','Kislota dissotsilanishidan: HCl → H⁺ + Cl⁻'],['Sahnada','qizil sharcha']],
    matn:'H⁺ — elektronini yo‘qotgan vodorod atomi, ya’ni yakka proton. U suv molekulasiga darhol birikadi: H⁺ + H₂O → H₃O⁺. Eritmada H⁺ qancha ko‘p bo‘lsa, pH shuncha kichik.',
    manba:PHW+'; '+KM8},
  OH:{nom:'Gidroksid ioni, OH⁻', sarlavha2:'Ion · ishqoriylik manbai',
    jadval:[['Zaryadi','−1'],['Tarkibi','kislorod + vodorod'],['Qayerdan','Ishqor dissotsilanishidan: NaOH → Na⁺ + OH⁻'],['Sahnada','ko‘k sharcha']],
    matn:'OH⁻ ionlari H⁺ bilan uchrashsa suv hosil bo‘ladi: H⁺ + OH⁻ → H₂O. Eritmada OH⁻ ko‘p bo‘lsa, muhit ishqoriy (pH > 7).',
    manba:KM8+'; '+W+' «Hydroxide»'},
  Na:{nom:'Natriy kationi, Na⁺', sarlavha2:'Ion · «kuzatuvchi» ion',
    jadval:[['Zaryadi','+1'],['Qayerdan','NaOH dan'],['Neytrallanishda','qatnashmaydi — eritmada qoladi'],['Sahnada','binafsha sharcha']],
    matn:'Na⁺ va Cl⁻ ionlari neytrallanish reaksiyasida o‘zgarmaydi — ular «kuzatuvchi» ionlar. Suv bug‘latilsa, ular osh tuzi NaCl kristallarini hosil qiladi.',
    manba:KM8+'; '+W+' «Spectator ion»'},
  Cl:{nom:'Xlorid anioni, Cl⁻', sarlavha2:'Ion · kislota qoldig‘i',
    jadval:[['Zaryadi','−1'],['Qayerdan','HCl dan'],['Neytrallanishda','qatnashmaydi — eritmada qoladi'],['Sahnada','yashil sharcha']],
    matn:'Cl⁻ — xlorid kislotaning kislota qoldig‘i. Uni kumush nitrat eritmasi bilan aniqlash mumkin: oq cho‘kma AgCl tushadi.',
    manba:KM8+'; '+W+' «Chloride»'},
  H2O:{nom:'Suv molekulasi, H₂O', sarlavha2:'Neytrallanish mahsuloti',
    jadval:[['Hosil bo‘lishi','H⁺ + OH⁻ → H₂O'],['Issiqlik','Reaksiya ekzotermik — eritma biroz isiydi'],['Suvning dissotsilanishi','juda kuchsiz: 25 °C da [H⁺] = [OH⁻] = 10⁻⁷ mol/L']],
    matn:'Neytrallanish — teskari jarayon: suvning o‘zi juda oz miqdorda ionlarga ajraladi, H⁺ va OH⁻ esa uchrashib yana suvga aylanadi. Shuning uchun sof suvda ham ikkala ion ozgina bor.',
    manba:PHW+'; '+KM8},
  ph0:phK(0,'pH 0 — juda kuchli kislotali','pH shkalasi',[['Misol','1 M HCl (pH ≈ 0)'],['Misol','akkumulyator kislotasi (pH < 1, taxminiy)']],'Bunday eritmalar o‘yuvchi. pH 0 da [H⁺] = 1 mol/L — sof suvdagidan 10 million marta ko‘p.'),
  ph1:phK(1,'pH 1 — kuchli kislotali','pH shkalasi',[['Misol','0,1 M HCl (pH ≈ 1)'],['Misol','oshqozon shirasi (1,5–3,5)']],'Sahnadagi tomizgichdagi 0,1 M xlorid kislotaning o‘zi pH ≈ 1 ga ega.'),
  ph2:phK(2,'pH 2 — kislotali','pH shkalasi',[['Misol','limon sharbati (≈ 2; 2–2,6)'],['Misol','sirka (2,4–3,4)']],'Limon nordonligi limon kislotasidan. Sirkada sirka kislota (CH₃COOH) bor.'),
  ph3:phK(3,'pH 3 — kislotali','pH shkalasi',[['Misol','sirka (yuqori chegarasi), olma va apelsin sharbati (≈ 3–4, taxminiy)'],['Misol','gazli ichimliklar (≈ 2,5–3,5, taxminiy)']],'Kislotali ichimliklar tish emalini yemiradi — ichgandan keyin og‘izni suv bilan chayish foydali.'),
  ph4:phK(4,'pH 4 — kuchsiz kislotali','pH shkalasi',[['Misol','pomidor sharbati (≈ 4, taxminiy)'],['Misol','kislotali yomg‘ir (5,6 dan past, ko‘pincha 4–5)']],'Metilzarg‘aldoq pH 4,4 dan yuqorida sariq, pastida to‘q sariq-qizil.'),
  ph5:phK(5,'pH 5 — kuchsiz kislotali','pH shkalasi',[['Misol','qora qahva (≈ 5)'],['Misol','ifloslanmagan yomg‘ir (≈ 5,6)']],'Yomg‘ir havodagi CO₂ ni eritib, kuchsiz karbonat kislota hosil qiladi — shuning uchun toza yomg‘ir ham biroz kislotali.'),
  ph6:phK(6,'pH 6 — juda kuchsiz kislotali','pH shkalasi',[['Misol','sut (≈ 6,5–6,8, taxminiy)'],['Misol','havoda turgan distillangan suv (≈ 5,6–6)']],'Sut neytralga juda yaqin. Achigan sut (qatiq) sut kislota tufayli ancha kislotali bo‘ladi.'),
  ph7:phK(7,'pH 7 — neytral','pH shkalasi',[['Misol','sof suv (25 °C)'],['Yaqin misol','odam qoni — 7,35–7,45 (biroz ishqoriy)']],'Neytral muhitda H⁺ va OH⁻ teng: har biri 10⁻⁷ mol/L. Universal indikator yashil, fenolftalein rangsiz, lakmus binafsha.'),
  ph8:phK(8,'pH 8 — kuchsiz ishqoriy','pH shkalasi',[['Misol','dengiz suvi (≈ 8,1)'],['Misol','ichimlik sodasi eritmasi (≈ 8,3)']],'Fenolftalein taxminan 8,2 dan (ba’zi manbalarda 8,3) pushti rangga kira boshlaydi.'),
  ph9:phK(9,'pH 9 — ishqoriy','pH shkalasi',[['Misol','tish pastasi (≈ 9, taxminiy)'],['Misol','bura eritmasi (≈ 9, taxminiy)']],'Ishqoriy muhitda universal indikator ko‘k rangga kiradi.'),
  ph10:phK(10,'pH 10 — ishqoriy','pH shkalasi',[['Misol','sovunli suv (≈ 9–10, taxminiy)'],['Misol','magniy gidroksid suspenziyasi (≈ 10,5)']],'Magniy gidroksid suspenziyasi oshqozon kislotasini neytrallovchi dori (antatsid) sifatida ishlatiladi.'),
  ph11:phK(11,'pH 11 — kuchli ishqoriy','pH shkalasi',[['Misol','maishiy ammiak eritmasi (≈ 11–11,5)']],'Ammiak eritmasi o‘tkir hidli; bug‘ini hidlash xavfli — ko‘z va nafas yo‘llarini ta’sirlaydi.'),
  ph12:phK(12,'pH 12 — kuchli ishqoriy','pH shkalasi',[['Misol','ohak suvi — to‘yingan Ca(OH)₂ (≈ 12,4)']],'Ohak suvi CO₂ bilan loyqalanadi (CaCO₃ cho‘kmasi) — karbonat angidridni aniqlash reaksiyasi.'),
  ph13:phK(13,'pH 13 — juda kuchli ishqoriy','pH shkalasi',[['Misol','0,1 M NaOH (≈ 13)'],['Misol','oqartiruvchi (gipoxloritli) vosita (manbalarda 12,5 yoki 13)']],'Oqartiruvchini kislotali tozalagich bilan aralashtirish mumkin emas — zaharli xlor gazi ajraladi.'),
  ph14:phK(14,'pH 14 — o‘ta kuchli ishqoriy','pH shkalasi',[['Misol','1 M NaOH (≈ 14)']],'Bunday eritma o‘yuvchi: teri va ko‘zni jiddiy kuydiradi. Faqat yopiq ko‘zoynak va qo‘lqopda ishlanadi.')
};
})();


/* ===== kimyo-oksidlanish ===== */
(function(){
const KM9 = '9-sinf «Kimyo» darsligi (O‘zbekiston, amaldagi nashr) — «Oksidlanish-qaytarilish reaksiyalari», «Metallarning elektrokimyoviy kuchlanishlar qatori», «Galvanik element» mavzulari';
const OXW = 'Wikipedia (inglizcha): «Redox» (en.wikipedia.org/wiki/Redox), «Oxidation state», «Daniell cell» (en.wikipedia.org/wiki/Daniell_cell), «Standard electrode potential (data page)», «Salt bridge», «Voltaic pile», «John Frederic Daniell»';
const LBO = 'LibreTexts Chemistry «Galvanic Cells», «Standard Reduction Potentials» (chem.libretexts.org); Nobel mukofoti rasmiy sayti — kimyo 2019 (nobelprize.org/prizes/chemistry/2019)';
const CLP = 'CLEAPSS Student Safety Sheets (science.cleapss.org.uk, 2022) — mis(II) sulfat, rux birikmalari';

bogla('kimyo', 'Oksidlanish-qaytarilish', 'kimyo-oksidlanish', 'Elektron o‘tishini ko‘ring: Zn + Cu²⁺ va Daniell galvanik elementi (1,10 V)', ['Oksidlanish-qaytarilish']);

D['kimyo-oksidlanish'] = {
  fan:'kimyo', qisqaNom:'Oksidlanish-qaytarilish', nom:'Oksidlanish-qaytarilish reaksiyalari va galvanik element',
  qisqa:'9-sinf · Kimyo · elektron o‘tishi, oksidlanish darajasi, Daniell elementi',
  sinf:'9-sinf',
  sahna:'kbg_oksidlanish',
  kor:{
    sarlavha:'Elektronlar qayerga ketadi?',
    matn:'Mis(II) sulfatning ko‘k eritmasiga rux plastinka tushirilsa, plastinka qizg‘ish mis bilan qoplanadi, eritma esa asta-sekin rangsizlanadi. Sabab — elektronlar o‘tishi: har bir rux atomi 2 ta elektron berib Zn²⁺ ioniga aylanadi (oksidlanadi), mis ionlari Cu²⁺ bu elektronlarni olib mis atomiga aylanadi (qaytariladi). Yondagi kattalashtirilgan ko‘rinishda buni atomlar darajasida kuzating. Keyin «Daniell elementi» rejimida xuddi shu reaksiyani ikki idishga ajratamiz — elektronlar sim orqali o‘tadi va ampermetr strelkasi og‘adi: kimyoviy energiya elektr energiyasiga aylanadi.',
    punktlar:[
      '<b>Oksidlanish</b> — elektron berish, oksidlanish darajasi ortadi: Zn⁰ − 2e⁻ → Zn⁺²',
      '<b>Qaytarilish</b> — elektron olish, oksidlanish darajasi kamayadi: Cu⁺² + 2e⁻ → Cu⁰',
      '<b>Qaytaruvchi</b> — elektron beradigan zarracha (Zn), <b>oksidlovchi</b> — elektron oladigan zarracha (Cu²⁺)',
      '<b>Daniell elementi</b> (J. F. Daniell, 1836): Zn | ZnSO₄ || CuSO₄ | Cu, standart EYuK = 1,10 V (25 °C, 1 M eritmalar)'
    ]
  },
  bolimlar:[
    {sarlavha:'Oksidlanish darajasini aniqlash qoidalari', jadval:[
      ['Oddiy moddalar','0 (Zn, Cu, H₂, O₂, Cl₂)'],
      ['Kislorod','odatda −2 (peroksidlarda −1, OF₂ da +2)'],
      ['Vodorod','odatda +1 (metall gidridlarida, masalan NaH da −1)'],
      ['I va II guruh metallari','birikmalarda +1 va +2'],
      ['Molekula','oksidlanish darajalari yig‘indisi 0; murakkab ionda — ion zaryadiga teng']
    ], matn:'Masalan, H₂SO₄ da: 2·(+1) + x + 4·(−2) = 0 → x = +6 (oltingugurt). KMnO₄ da marganes +7.'},
    {sarlavha:'Standart elektrod potensiallari (25 °C, E°, V)', jadval:[
      ['Li⁺/Li','−3,04'],
      ['Mg²⁺/Mg','−2,37'],
      ['Zn²⁺/Zn','−0,76'],
      ['Fe²⁺/Fe','−0,44'],
      ['2H⁺/H₂','0,00 (standart vodorod elektrodi)'],
      ['Cu²⁺/Cu','+0,34'],
      ['Ag⁺/Ag','+0,80']
    ], matn:'Potensiali manfiyroq metall kuchliroq qaytaruvchi: u o‘zidan o‘ngdagi metall ionlarini eritmadan siqib chiqaradi. Shuning uchun Zn eritmadan Cu ni siqib chiqaradi, Cu esa Zn ni siqib chiqara olmaydi. Galvanik elementning EYuK i: E = E°(katod) − E°(anod) = 0,34 − (−0,76) = 1,10 V.'},
    {sarlavha:'Daniell elementi qismlari', jadval:[
      ['Anod (−)','rux elektrodi ZnSO₄ eritmasida — oksidlanish: Zn → Zn²⁺ + 2e⁻'],
      ['Katod (+)','mis elektrodi CuSO₄ eritmasida — qaytarilish: Cu²⁺ + 2e⁻ → Cu'],
      ['Tashqi zanjir','elektronlar sim orqali anoddan katodga (− dan + ga) oqadi'],
      ['Tuz ko‘prigi','KNO₃ (yoki KCl) eritmasi: anionlar anod tomonga, kationlar katod tomonga harakatlanib, zaryadlarni muvozanatlaydi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Tajriba: rux mis kuporosi eritmasida', matn:'Ko‘k rangli CuSO₄ eritmasiga rux plastinka tushiramiz. Ko‘k rangni gidratlangan Cu²⁺ ionlari beradi. Oksidlanish darajalari yozuvi yoqilgan: plastinkadagi Zn — 0, eritmadagi Cu — +2. Sulfat ionlari SO₄²⁻ reaksiyada o‘zgarmaydi.', holat:{rejim:'plastinka', p:0, belgi:true}},
    {sarlavha:'Elektronlar o‘tishi', matn:'Kattalashtirilgan ko‘rinishda rux atomi 2 ta elektron (sariq uchqunlar) beradi va Zn²⁺ ioni sifatida eritmaga o‘tadi — bu oksidlanish. Elektronlarni plastinka sirtiga yaqinlashgan Cu²⁺ ioni oladi va mis atomiga aylanib plastinkaga o‘tiradi — bu qaytarilish. Ikkala jarayon bir vaqtda sodir bo‘ladi: berilgan elektronlar soni = olingan elektronlar soni.', holat:{rejim:'plastinka', p:0.45, belgi:true}},
    {sarlavha:'Natija: mis qoplami va rangsiz eritma', matn:'Reaksiya oxirida plastinka qizg‘ish-jigarrang mis bilan qoplanadi, eritma rangsizlanadi — unda endi ZnSO₄ (rangsiz) bor. Umumiy tenglama: Zn + CuSO₄ → ZnSO₄ + Cu. Qisqa ionli: Zn + Cu²⁺ → Zn²⁺ + Cu. Zn — qaytaruvchi, Cu²⁺ — oksidlovchi.', holat:{rejim:'plastinka', p:1, belgi:true}},
    {sarlavha:'Reaksiyani ikkiga ajratamiz: Daniell elementi', matn:'Endi rux ZnSO₄ eritmasida, mis esa CuSO₄ eritmasida, alohida idishlarda turibdi. Ular sim (kalit va ampermetr orqali) va tuz ko‘prigi bilan tutashtirilgan, elektrodlarga voltmetr ulangan. Kalit ochiq — zanjir uzuq, tok yo‘q, ampermetr 0 ni ko‘rsatadi. Voltmetr esa tok olinmaganda ham elementning EYuK ini ko‘rsatadi: standart sharoitda 1,10 V.', holat:{rejim:'element', yoq:false, kopri:true, belgi:true}},
    {sarlavha:'Zanjir yopildi: elektronlar sim orqali', matn:'Kalit yopilganda anodda rux oksidlanadi (Zn → Zn²⁺ + 2e⁻), elektronlar tashqi sim orqali − qutbdan (rux) + qutbga (mis) oqadi — ampermetr strelkasi og‘adi. Katodda Cu²⁺ + 2e⁻ → Cu. Tuz ko‘prigidagi anionlar (NO₃⁻) anod idishiga, kationlar (K⁺) katod idishiga siljib, eritmalarni elektroneytral saqlaydi.', holat:{rejim:'element', yoq:true, kopri:true, belgi:true}},
    {sarlavha:'Tuz ko‘prigi olib tashlansa', matn:'Ko‘prik olinsa ichki zanjir uziladi: anod idishida musbat zaryad (Zn²⁺), katod idishida manfiy zaryad (ortiqcha SO₄²⁻) to‘planib qolib, elektronlar oqimini darhol to‘xtatadi. Ampermetr strelkasi nolga qaytadi, voltmetr ham 0 ni ko‘rsatadi. Demak, galvanik element ishlashi uchun ham tashqi (elektronlar), ham ichki (ionlar) zanjir kerak.', holat:{rejim:'element', yoq:true, kopri:false, belgi:true}},
    {sarlavha:'Kimyoviy energiyadan elektr energiyasiga', matn:'Galvanik elementda oksidlanish va qaytarilish fazoda ajratilgan, shuning uchun elektronlar foydali ish bajaradi. Batareyalar, akkumulyatorlar, telefonlardagi litiy-ion akkumulyatorlar ham shu tamoyilda ishlaydi. Daniell elementi XIX asrda telegraf uchun keng ishlatilgan va volt birligini belgilashda asos bo‘lgan.', holat:{rejim:'element', yoq:true, kopri:true, belgi:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Elektron o‘tishini boshqaring', holat:{rejim:'plastinka', p:0, belgi:true},
    topshiriqlar:[
      {shart:'Reaksiyada <b>qaytaruvchi</b> bo‘lgan zarrachani — elektron beradigan <b>rux atomini (Zn)</b> bosing.', hodisa:'kbg-oks', kod:"ev.nom==='zn'", izoh:'To‘g‘ri — rux atomi elektron beradi (Zn⁰ − 2e⁻ → Zn⁺²), ya’ni oksidlanadi. U — qaytaruvchi.'},
      {shart:'Endi <b>oksidlovchi</b>ni — elektron oladigan ionni bosing.', hodisa:'kbg-oks', kod:"ev.nom==='cu2'", izoh:'To‘g‘ri — Cu²⁺ ioni elektron oladi (Cu⁺² + 2e⁻ → Cu⁰), qaytariladi. U — oksidlovchi.'},
      {shart:'<b>Daniell elementi</b> rejimiga o‘ting va kalitni yopib, zanjirdan <b>tok o‘tkazing</b>.', hodisa:'kbg-oks-holat', kod:"ev.rejim==='element'&&ev.tok", izoh:'To‘g‘ri — zanjir yopiq, tuz ko‘prigi joyida: elektronlar Zn dan Cu ga oqmoqda, ampermetr tok borligini ko‘rsatdi.'},
      {shart:'Galvanik elementda <b>oksidlanish sodir bo‘ladigan elektrodni</b> bosing.', hodisa:'kbg-oks', kod:"ev.nom==='anod'", izoh:'To‘g‘ri — anod (rux elektrodi). Galvanik elementda anod manfiy qutb: undan elektronlar tashqi zanjirga chiqadi.'},
      {shart:'Kalit yopiq holda <b>tuz ko‘prigini olib tashlang</b> va tok to‘xtashini kuzating.', hodisa:'kbg-oks-holat', kod:"ev.rejim==='element'&&ev.yopiq&&!ev.kopri", izoh:'To‘g‘ri — ko‘priksiz ichki zanjir uziladi, eritmalarda zaryad to‘planib, elektronlar oqimi to‘xtaydi.'},
      {shart:'Oxirgi topshiriq: <b>qaytarilish</b> sodir bo‘ladigan elektrodni bosing.', hodisa:'kbg-oks', kod:"ev.nom==='katod'", izoh:'To‘g‘ri — katod (mis elektrodi): Cu²⁺ + 2e⁻ → Cu. Galvanik elementda katod musbat qutb.'}
    ]},
  test:[
    {s:'Oksidlanish — bu…', v:['elektron olish','elektron berish','proton olish','neytron berish'], t:1, izoh:'Oksidlanish — <b>elektron berish</b>; bunda oksidlanish darajasi ortadi.'},
    {s:'Zn + CuSO₄ → ZnSO₄ + Cu reaksiyasida oksidlovchi qaysi?', v:['Zn','Cu²⁺','SO₄²⁻','Zn²⁺'], t:1, izoh:'Oksidlovchi — elektron oladigan zarracha: <b>Cu²⁺</b> (+2 → 0). Zn — qaytaruvchi, SO₄²⁻ reaksiyada o‘zgarmaydi.'},
    {s:'H₂SO₄ da oltingugurtning oksidlanish darajasi qancha?', v:['+4','+6','−2','+2'], t:1, izoh:'2·(+1) + x + 4·(−2) = 0 → x = <b>+6</b>.'},
    {s:'KMnO₄ da marganesning oksidlanish darajasi qancha?', v:['+2','+4','+6','+7'], t:3, izoh:'(+1) + x + 4·(−2) = 0 → x = <b>+7</b>.'},
    {s:'Oddiy moddalarda (masalan, Cu, O₂) elementlarning oksidlanish darajasi qancha?', v:['0','+1','−1','+2'], t:0, izoh:'Oddiy moddada atomlar bir xil, elektron siljimaydi — oksidlanish darajasi <b>0</b>.'},
    {s:'Daniell elementining standart EYuK i (25 °C, 1 M eritmalar) qancha?', v:['0,34 V','0,76 V','1,10 V','1,50 V'], t:2, izoh:'E = 0,34 − (−0,76) = <b>1,10 V</b>.'},
    {s:'Galvanik elementda elektronlar tashqi zanjirda qayerdan qayerga oqadi?', v:['Katoddan anodga','Anoddan (−) katodga (+)','Tuz ko‘prigi orqali','Oqmaydi'], t:1, izoh:'Elektronlar <b>anoddan (−) katodga (+)</b> — Daniell elementida ruxdan misga — sim orqali oqadi. Tuz ko‘prigidan ionlar o‘tadi, elektronlar emas.'},
    {s:'Tuz ko‘prigining vazifasi nima?', v:['Elektronlarni o‘tkazish','Ionlar harakati orqali eritmalarni elektroneytral saqlash','Eritmani isitish','Misni eritish'], t:1, izoh:'Tuz ko‘prigi <b>ionlar harakati orqali eritmalarni elektroneytral saqlaydi</b> va ichki zanjirni yopadi.'},
    {s:'Qaysi metall mis(II) sulfat eritmasidan misni siqib chiqara OLMAYDI?', v:['Rux','Temir','Magniy','Kumush'], t:3, izoh:'<b>Kumush</b>ning potensiali (+0,80 V) misnikidan (+0,34 V) musbatroq — u kuchsizroq qaytaruvchi. Zn, Fe, Mg misni siqib chiqaradi.'},
    {s:'Daniell elementini kim va qachon ixtiro qilgan?', v:['A. Volta, 1800','J. F. Daniell, 1836','M. Faradey, 1831','L. Galvani, 1791'], t:1, izoh:'Britaniyalik kimyogar <b>J. F. Daniell, 1836</b>. Volta ustuni 1800-yilda yaratilgan (Qirollik jamiyatiga 20-mart kungi maktub).'},
    {s:'Cu⁺² + 2e⁻ → Cu⁰ jarayoni qanday ataladi?', v:['Oksidlanish','Qaytarilish','Dissotsilanish','Neytrallanish'], t:1, izoh:'Elektron olindi, daraja +2 dan 0 ga kamaydi — <b>qaytarilish</b>.'},
    {s:'Rux plastinka CuSO₄ eritmasida uzoq tursa, eritma rangi qanday o‘zgaradi?', v:['Ko‘kroq bo‘ladi','Rangsizlanadi','Qizaradi','Yashil bo‘ladi'], t:1, izoh:'Ko‘k Cu²⁺ ionlari rangsiz Zn²⁺ bilan almashadi — eritma <b>rangsizlanadi</b>.'},
    {tur:'3d', s:'Daniell elementi rejimida <b>oksidlanish sodir bo‘ladigan elektrodni (anodni)</b> bosing.', hodisa:'kbg-oks', kalit:'nom', togri:['anod'], v:['Rux elektrodi — anod','boshqa qism'], t:0, qatlamlar:{rejim:'element'},
      izoh:'<b>Anod — rux elektrodi</b>: Zn → Zn²⁺ + 2e⁻. Galvanik elementda u manfiy qutb.'}
  ],
  yordamchi:[
    {s:'Oksidlanish va qaytarilishni qanday eslab qolaman?', j:'Elektron manfiy zaryadli. Uni BERGAN atomning zaryadi (oksidlanish darajasi) ORTADI — bu oksidlanish. Elektron OLGAN atomning darajasi KAMAYADI — bu qaytarilish. Elektron beruvchi — qaytaruvchi, oluvchi — oksidlovchi. Ikkala jarayon doim birga boradi.', kalit:['eslab','oksidlanish','qaytarilish','farq']},
    {s:'Nega elektronlar ruxdan misga oqadi, aksincha emas?', j:'Ruxning standart potensiali (−0,76 V) misnikidan (+0,34 V) ancha manfiy: rux elektronlarni osonroq beradi. Shuning uchun rux anod (−), mis katod (+) bo‘ladi va elektronlar tashqi sim orqali ruxdan misga oqadi. Farq 1,10 V — elementning kuchlanishi.', kalit:['nega','yo‘nalish','oqim','rux','mis']},
    {s:'Batareya «tugashi» nimani anglatadi?', j:'Galvanik elementda reaktivlar sarflanadi: Daniell elementida rux eriydi, eritmadagi Cu²⁺ tugaydi. Reaksiya muvozanatga yaqinlashgani sari kuchlanish pasayadi. Akkumulyatorda esa tashqi tok bilan reaksiyani teskari yo‘nalishda o‘tkazib, qayta zaryadlash mumkin.', kalit:['batareya','tugash','akkumulyator','zaryad']}
  ],
  maqola:[
    {sarlavha:'Oksidlanish-qaytarilish nima?', xatboshilar:[
      'Dastlab «oksidlanish» deb faqat moddaning kislorod bilan birikishi aytilgan: temirning zanglashi, ko‘mirning yonishi. Keyinchalik kimyogarlar bu jarayonlarning mohiyati elektronlar o‘tishida ekanini tushunishdi. Bugun oksidlanish — atom, ion yoki molekulaning elektron berishi, qaytarilish esa elektron olishi deb ta’riflanadi.',
      'Elektronlar yo‘qolmaydi va yo‘qdan paydo bo‘lmaydi: bir zarracha bergan elektronlarni boshqasi oladi. Shuning uchun oksidlanish va qaytarilish doim bir vaqtda sodir bo‘ladi — bunday reaksiyalar oksidlanish-qaytarilish reaksiyalari (OQR) deyiladi. Elektron beradigan modda qaytaruvchi (o‘zi oksidlanadi), elektron oladigan modda oksidlovchi (o‘zi qaytariladi).',
      'Oddiy misol: Zn + CuSO₄ → ZnSO₄ + Cu. Rux atomi 2 elektron beradi: Zn⁰ − 2e⁻ → Zn⁺². Mis ioni ularni oladi: Cu⁺² + 2e⁻ → Cu⁰. Sulfat ioni reaksiyada o‘zgarmaydi. Tajribada rux plastinka mis bilan qoplanadi, ko‘k eritma rangsizlanadi.'
    ]},
    {sarlavha:'Oksidlanish darajasi', xatboshilar:[
      'Oksidlanish darajasi — atom birikmada barcha bog‘lari ionli deb faraz qilinganda ega bo‘ladigan shartli zaryad. U elektronlar qaysi atomga siljiganini hisoblashga yordam beradi. Oddiy moddalarda daraja 0; kislorod odatda −2, vodorod odatda +1; molekuladagi darajalar yig‘indisi nolga, ionda esa ion zaryadiga teng.',
      'Masalan, H₂SO₄ da oltingugurt +6, SO₂ da +4, H₂S da −2. Bir element turli birikmalarda turli darajaga ega bo‘lishi mumkin. Eng yuqori darajadagi atom faqat oksidlovchi (masalan, KMnO₄ dagi Mn⁺⁷), eng quyi darajadagisi faqat qaytaruvchi (H₂S dagi S⁻²), oraliq darajadagisi esa ikkalasi ham bo‘lishi mumkin.',
      'Reaksiya tenglamasini tenglashtirishda elektron balans usuli qo‘llanadi: qaytaruvchi bergan elektronlar soni oksidlovchi olgan elektronlar soniga teng bo‘lishi kerak. Masalan, 2Al + 3CuCl₂ → 2AlCl₃ + 3Cu: har bir Al 3 e⁻ beradi, har bir Cu²⁺ 2 e⁻ oladi; eng kichik umumiy karrali 6 — shuning uchun 2 Al va 3 Cu.'
    ]},
    {sarlavha:'Galvanik element: Daniell tajribasi', xatboshilar:[
      'Italiyalik fizik Alessandro Volta 1800-yilda rux va mis (yoki kumush) disklarini sho‘r suvga ho‘llangan mato bilan navbatma-navbat taxlab, birinchi uzluksiz tok manbaini — «Volta ustuni»ni yaratgan (Qirollik jamiyatiga 1800-yil 20-martdagi maktubida tasvirlagan). Uning kamchiligi — tok tez kamayib ketardi: mis sirtida vodorod pufakchalari to‘planardi.',
      'Britaniyalik kimyogar va meteorolog Jon Frederik Daniell 1836-yilda bu muammoni hal qilgan: rux va misni har biri o‘z tuzi eritmasiga (ZnSO₄ va CuSO₄) joylab, ularni g‘ovak to‘siq bilan ajratgan. Endi misda vodorod emas, mis ajralardi va kuchlanish barqaror bo‘lardi. Daniell elementi XIX asrda telegraf tarmoqlarida keng ishlatilgan; 1860-yillarda elektr birliklarini belgilashda uning kuchlanishi (≈ 1,1 V) volt birligiga asos bo‘lgan.',
      'Maktab laboratoriyasida g‘ovak to‘siq o‘rniga ko‘pincha tuz ko‘prigi ishlatiladi — KNO₃ yoki KCl eritmasi bilan to‘ldirilgan U-naycha yoki shimdirilgan filtr qog‘oz tasmasi. Anodda (rux) oksidlanish, katodda (mis) qaytarilish boradi; elektronlar tashqi sim orqali anoddan katodga oqadi, ionlar esa ko‘prik orqali harakatlanadi. Standart sharoitda (25 °C, 1 M eritmalar) element kuchlanishi E = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = 0,34 − (−0,76) = 1,10 V.'
    ]},
    {sarlavha:'Hayotda oksidlanish-qaytarilish', xatboshilar:[
      'Batareyalar va akkumulyatorlar — galvanik elementlar. Avtomobil akkumulyatorida qo‘rg‘oshin va qo‘rg‘oshin(IV) oksid sulfat kislotada ishlaydi. Telefon va elektromobillardagi litiy-ion akkumulyatorlar yaratilgani uchun 2019-yilda J. Gudinaf, M. S. Uittingem va A. Yoshinoga kimyo bo‘yicha Nobel mukofoti berilgan.',
      'Metallar korroziyasi ham OQR: temir kislorod va namlik ta’sirida oksidlanib zanglaydi. Himoya usullari: bo‘yash, moylash, ruxlash (temirni rux bilan qoplash — rux faolroq bo‘lgani uchun avval o‘zi oksidlanadi), «protektor» — kema korpusiga faol metall bo‘laklarini mahkamlash.',
      'Tirik organizmda ham OQR muhim: nafas olishda glyukoza oksidlanadi, kislorod qaytariladi va energiya ajraladi; fotosintezda esa aksincha, suv oksidlanib kislorod ajraladi, CO₂ qaytarilib organik moddaga aylanadi. Metallurgiyada rudalardan metall olish — qaytarilish jarayoni (masalan, domna pechida temir oksidi uglerod(II) oksid bilan qaytariladi).'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — «oksidlanish faqat kislorod bilan bo‘ladi» deb o‘ylash. Zn + CuSO₄ reaksiyasida kislorod qatnashmaydi, lekin bu oksidlanish-qaytarilish. Ikkinchi xato — oksidlovchi va qaytaruvchini almashtirish: oksidlovchi o‘zi QAYTARILADI (elektron oladi).',
      'Uchinchi xato — elektronlar tuz ko‘prigidan o‘tadi deb o‘ylash: eritmada elektronlar erkin harakatlanmaydi, ko‘prikdan ionlar o‘tadi. To‘rtinchi xato — galvanik elementda anodni «+» deb yozish: galvanik elementda anod manfiy (−), katod musbat (+); elektroliz jarayonida esa belgilari teskari.'
    ]}
  ],
  formulalar:[
    ['Zn⁰ − 2e⁻ → Zn⁺²','Oksidlanish (anod, qaytaruvchi)'],
    ['Cu⁺² + 2e⁻ → Cu⁰','Qaytarilish (katod, oksidlovchi)'],
    ['Zn + Cu²⁺ → Zn²⁺ + Cu','Umumiy qisqa ionli tenglama'],
    ['E = E°(katod) − E°(anod) = 0,34 − (−0,76) = 1,10 V','Daniell elementining standart EYuK i'],
    ['ΔG° = −n·F·E° = −2 · 96 485 · 1,10 ≈ −212 kJ/mol','Reaksiyaning Gibbs energiyasi (manfiy — o‘z-o‘zidan boradi); F — Faradey doimiysi'],
    ['Σ oksidlanish darajalari = 0 (molekula) yoki = ion zaryadi','Darajani hisoblash qoidasi']
  ],
  qiziqarli:[
    'Volta 1800-yilda ixtirosini Qirollik jamiyati prezidenti Jozef Benksga yozgan maktubida tasvirlagan — bu birinchi uzluksiz tok manbai edi.',
    'Kuchlanish birligi «volt» Alessandro Volta sharafiga nomlangan; 1860-yillarda elektr birliklarini belgilashda Daniell elementining kuchlanishi asos qilingan.',
    'Ozodlik haykali (Nyu-York) mis qoplamasining yashil rangi — misning uzoq yillik oksidlanishi natijasida hosil bo‘lgan patina.',
    'Temirni rux bilan qoplash (ruxlash) uni hatto qoplama tirnalganda ham himoya qiladi: faolroq rux o‘zi oksidlanadi.',
    'Litiy-ion akkumulyatorlar uchun 2019-yilda kimyo bo‘yicha Nobel mukofoti berilgan (Gudinaf, Uittingem, Yoshino).',
    'Olma kesilganda qorayishi ham oksidlanish: fermentlar ishtirokida mevadagi moddalar havo kislorodi bilan oksidlanadi.'
  ],
  lugat:[
    ['Oksidlanish','Elektron berish; oksidlanish darajasi ortadi.'],
    ['Qaytarilish','Elektron olish; oksidlanish darajasi kamayadi.'],
    ['Oksidlovchi','Elektron oluvchi zarracha (o‘zi qaytariladi).'],
    ['Qaytaruvchi','Elektron beruvchi zarracha (o‘zi oksidlanadi).'],
    ['Oksidlanish darajasi','Atomning birikmadagi shartli zaryadi.'],
    ['Galvanik element','Kimyoviy energiyani elektr energiyasiga aylantiruvchi qurilma.'],
    ['Anod','Oksidlanish boradigan elektrod (galvanik elementda −).'],
    ['Katod','Qaytarilish boradigan elektrod (galvanik elementda +).'],
    ['Tuz ko‘prigi','Eritmalarni tutashtirib, ionlar o‘tishini ta’minlovchi naycha.'],
    ['EYuK','Elektr yurituvchi kuch — elementning kuchlanishi (V).'],
    ['Standart elektrod potensiali','25 °C, 1 M eritmada vodorod elektrodiga nisbatan o‘lchangan potensial.'],
    ['Elektron balans','Berilgan va olingan elektronlarni tenglashtirish usuli.'],
    ['Korroziya','Metallning muhit ta’sirida oksidlanib yemirilishi.']
  ],
  xavfsizlik:[
    'Mis(II) sulfat eritmasi yutilsa zararli, ko‘z va teriga ta’sir qiladi; atrof-muhit (suv organizmlari) uchun xavfli — rakovinaga to‘kilmaydi, maxsus idishga yig‘iladi.',
    'Tajribalarda <b>himoya ko‘zoynagi</b> taqiladi; eritmalar bilan ishlagandan keyin qo‘l yuviladi. Hech qanday reaktivni tatib ko‘rmang.',
    'Ko‘z yoki teriga tushsa — kamida 20 daqiqa oqar suv bilan yuving va o‘qituvchiga ayting (CLEAPSS, 2022; eski qo‘llanmalarda 10–15 daqiqa).',
    'Batareyalarni ochmang, qisqa tutashtirmang va olovga tashlamang; ishlatilgan batareyalar maxsus yig‘ish joyiga topshiriladi.'
  ],
  manba:KM9+'; '+OXW+'; '+LBO+'; '+CLP+'. Standart potensiallar 25 °C uchun (ma’lumotnomalarda 0,01 V gacha farq bo‘lishi mumkin). Daniellning g‘ovak to‘siq turi va birinchi nashr sanalari manbalarda biroz farq qiladi (1836 — ixtiro yili).',
  ishlanma:{
    sinf:'9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (virtual tajriba + model)', usul:'3D model (atomlar darajasida), virtual galvanik element, elektron balans mashqi, juftlikda ishlash',
    maqsad:{talimiy:'Oksidlanish, qaytarilish, oksidlovchi, qaytaruvchi, oksidlanish darajasi tushunchalarini va galvanik elementning ishlash tamoyilini o‘rganish.',
      tarbiyaviy:'Batareyalardan to‘g‘ri foydalanish va ularni to‘g‘ri utilizatsiya qilishga, tabiatni asrashga mas’uliyatni tarbiyalash.',
      rivojlantiruvchi:'Makro kuzatuvni (rang o‘zgarishi) mikro darajadagi tushuntirish (elektronlar) bilan bog‘lash, model asosida fikrlash ko‘nikmasini rivojlantirish.'},
    natijalar:['Oksidlanish darajasini hisoblaydi','Reaksiyada oksidlovchi va qaytaruvchini aniqlaydi','Zn + CuSO₄ reaksiyasini elektron balans bilan yozadi','Daniell elementining anodi, katodi va tuz ko‘prigi vazifasini tushuntiradi','EYuK ni standart potensiallardan hisoblaydi'],
    jihozlar:['MAKON sahnasi «Oksidlanish-qaytarilish» (plastinka va Daniell elementi)','Proyektor yoki interaktiv doska','Namoyish (o‘qituvchi): CuSO₄ eritmasi, rux granula yoki plastinka, probirka, himoya ko‘zoynagi','Ixtiyoriy: limon + rux va mis tasmasidan «meva batareyasi», multimetr','Darslik, standart potensiallar jadvali'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Telefon batareyasida tok qayerdan keladi?» Rux plastinkani CuSO₄ ga tushirish namoyishi.','Kuzatadi, farazini aytadi.'],
      ['8–18','<b>Mikro daraja.</b> MAKON da elektronlar o‘tishini ko‘rsatadi; oksidlanish/qaytarilish ta’riflari; oksidlanish darajasini aniqlash qoidalari.','Daftarga yozadi, misollarda darajani hisoblaydi.'],
      ['18–28','<b>Daniell elementi.</b> Rejimni almashtiradi: kalit, ampermetr, voltmetr, tuz ko‘prigi. Elektronlar va ionlar yo‘nalishini muhokama qiladi.','Sxemani chizadi, yo‘nalishlarni belgilaydi.'],
      ['28–35','<b>Hisob.</b> EYuK = 0,34 − (−0,76); elektron balans mashqi (2Al + 3CuCl₂).','Juftlikda yechadi.'],
      ['35–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Oksidlanish','Elektron berish.'],['Qaytarilish','Elektron olish.'],['Oksidlovchi','Elektron oluvchi.'],['Qaytaruvchi','Elektron beruvchi.'],['Anod','Oksidlanish elektrodi.'],['Katod','Qaytarilish elektrodi.']],
    savollar:[['Zn + CuSO₄ reaksiyasida qaytaruvchi?','Zn'],['KMnO₄ da Mn ning darajasi?','+7'],['Daniell elementining standart EYuK i?','1,10 V'],['Elektronlar tashqi zanjirda qayerga oqadi?','Anoddan (−) katodga (+)'],['Tuz ko‘prigi nima uchun kerak?','Ionlar o‘tib, eritmalar elektroneytral qoladi']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) HNO₃, SO₂, NH₃, K₂Cr₂O₇ da azot, oltingugurt va xromning oksidlanish darajasini topish (javob: +5, +4, −3, +6); (2) Mg | MgSO₄ || CuSO₄ | Cu elementining standart EYuK ini hisoblash (javob: 0,34 − (−2,37) = 2,71 V); (3) uydagi 3 ta oksidlanish misolini (zanglash, olma qorayishi, yonish) yozish.',
    manba:KM9+'; '+OXW+'; '+LBO
  }
};

const W = 'Wikipedia (inglizcha)';
DT.kbg_oksidlanish = {
  zn:{nom:'Rux atomi, Zn⁰ (plastinka)', sarlavha2:'Qaytaruvchi · oksidlanadi',
    jadval:[['Oksidlanish darajasi','0 → +2'],['Jarayon','Zn − 2e⁻ → Zn²⁺'],['E°(Zn²⁺/Zn)','−0,76 V'],['Rangi','kumushsimon-kulrang metall']],
    matn:'Rux misdan faolroq metall: elektronlarini osonroq beradi. Shuning uchun u mis ionlarini eritmadan siqib chiqaradi, o‘zi esa Zn²⁺ ioni sifatida eritmaga o‘tadi — plastinka asta-sekin yupqalashadi.',
    manba:OXW+'; '+KM9},
  zn2:{nom:'Rux ioni, Zn²⁺', sarlavha2:'Oksidlanish mahsuloti',
    jadval:[['Zaryadi','+2'],['Hosil bo‘lishi','Zn − 2e⁻ → Zn²⁺'],['Eritmadagi rangi','rangsiz']],
    matn:'Zn²⁺ ionlari rangsiz, shuning uchun reaksiya oxirida eritma (ZnSO₄) rangsizlanadi. Rux ioni ortiq elektron qabul qilmaydi — bu reaksiyada u oxirgi mahsulot.',
    manba:KM9+'; '+W+' «Zinc sulfate»'},
  cu2:{nom:'Mis(II) ioni, Cu²⁺', sarlavha2:'Oksidlovchi · qaytariladi',
    jadval:[['Oksidlanish darajasi','+2 → 0'],['Jarayon','Cu²⁺ + 2e⁻ → Cu'],['E°(Cu²⁺/Cu)','+0,34 V'],['Eritmadagi rangi','ko‘k (gidratlangan ion [Cu(H₂O)₆]²⁺)']],
    matn:'CuSO₄ eritmasining ko‘k rangi suv molekulalari bilan o‘ralgan Cu²⁺ ionlaridan. Ular kamaygan sari rang oqaradi — bu reaksiya borishini ko‘z bilan kuzatish imkonini beradi.',
    manba:OXW+'; '+W+' «Copper(II) sulfate»'},
  cu:{nom:'Mis atomi, Cu⁰', sarlavha2:'Qaytarilish mahsuloti',
    jadval:[['Oksidlanish darajasi','0'],['Qayerda','rux plastinka sirtida qoplam'],['Rangi','qizg‘ish-jigarrang (mayda kukun holida qoramtir)']],
    matn:'Ajralgan mis rux sirtida g‘ovak qoplam hosil qiladi. Uni chayib quritib, rangini ko‘rish mumkin. Mis — elektr o‘tkazuvchanligi yuqori metall (simlar uchun asosiy material).',
    manba:KM9+'; '+W+' «Copper»'},
  elektron:{nom:'Elektron, e⁻', sarlavha2:'Zaryad tashuvchi',
    jadval:[['Zaryadi','−1 (−1,602·10⁻¹⁹ C)'],['OQR da','qaytaruvchidan oksidlovchiga o‘tadi'],['Galvanik elementda','tashqi sim orqali anoddan (−) katodga (+)']],
    matn:'Plastinkada elektronlar rux atomidan to‘g‘ridan-to‘g‘ri tegib turgan Cu²⁺ ioniga o‘tadi — energiya issiqlik sifatida ajraladi. Galvanik elementda esa elektronlar sim orqali yuradi va foydali ish bajarishi mumkin (ampermetr tokni qayd etadi).',
    manba:OXW},
  so4:{nom:'Sulfat ioni, SO₄²⁻', sarlavha2:'«Kuzatuvchi» ion',
    jadval:[['Zaryadi','−2'],['Oltingugurt darajasi','+6'],['Reaksiyada','o‘zgarmaydi']],
    matn:'Sulfat ionlari reaksiyadan oldin CuSO₄ tarkibida, keyin ZnSO₄ tarkibida bo‘ladi — ular elektron bermaydi ham, olmaydi ham. Shuning uchun qisqa ionli tenglamada yozilmaydi.',
    manba:KM9},
  eritma:{nom:'Mis(II) sulfat eritmasi, CuSO₄', sarlavha2:'Reaksiya muhiti',
    jadval:[['Boshida','ko‘k rangli (Cu²⁺)'],['Oxirida','deyarli rangsiz (ZnSO₄)'],['Umumiy tenglama','Zn + CuSO₄ → ZnSO₄ + Cu'],['Xavf','yutilsa zararli; suv organizmlari uchun zaharli']],
    matn:'Mis kuporosi (CuSO₄·5H₂O) qishloq xo‘jaligida zamburug‘ kasalliklariga qarshi (Bordo suyuqligi) ishlatiladi. Laboratoriya chiqindisi rakovinaga to‘kilmaydi.',
    manba:CLP+'; '+W+' «Copper(II) sulfate»'},
  anod:{nom:'Anod — rux elektrodi (−)', sarlavha2:'Daniell elementi · oksidlanish',
    jadval:[['Jarayon','Zn → Zn²⁺ + 2e⁻'],['Qutbi','manfiy (−)'],['Eritma','ZnSO₄'],['Vaqt o‘tishi bilan','elektrod massasi kamayadi']],
    matn:'Galvanik elementda oksidlanish boradigan elektrod — anod. U elektronlarni tashqi zanjirga beradi, shuning uchun manfiy qutb. Elektrolizda esa anod musbat qutbga ulanadi — belgilarni adashtirmang.',
    manba:OXW+'; '+LBO},
  katod:{nom:'Katod — mis elektrodi (+)', sarlavha2:'Daniell elementi · qaytarilish',
    jadval:[['Jarayon','Cu²⁺ + 2e⁻ → Cu'],['Qutbi','musbat (+)'],['Eritma','CuSO₄'],['Vaqt o‘tishi bilan','elektrodga mis o‘tiradi, massasi ortadi']],
    matn:'Elektronlar sim orqali katodga keladi va u yerda eritmadagi Cu²⁺ ionlarini qaytaradi. CuSO₄ eritmasining ko‘k rangi asta-sekin oqaradi.',
    manba:OXW+'; '+LBO},
  kopri:{nom:'Tuz ko‘prigi (KNO₃)', sarlavha2:'Ichki zanjir · ionlar yo‘li',
    jadval:[['Tarkibi','KNO₃ (yoki KCl) eritmasi, agar-agar yoki shimdirilgan qog‘oz'],['Anionlar (NO₃⁻)','anod idishiga siljiydi'],['Kationlar (K⁺)','katod idishiga siljiydi'],['Olinsa','tok to‘xtaydi']],
    matn:'Anod idishida Zn²⁺ ko‘payib, katod idishida Cu²⁺ kamayib boradi. Ko‘prik ionlari bu zaryad nomutanosibligini to‘ldiradi. Daniellning asl elementida ko‘prik o‘rniga g‘ovak to‘siq ishlatilgan.',
    manba:W+' «Salt bridge», «Daniell cell»; '+LBO},
  voltmetr:{nom:'Voltmetr', sarlavha2:'O‘lchov asbobi',
    jadval:[['Ko‘rsatkich (standart sharoit)','1,10 V — tuz ko‘prigi joyida bo‘lsa (kalit ochiq bo‘lsa ham)'],['Ko‘prik olinsa','0 V — zanjir uzilgan'],['Hisob','0,34 − (−0,76) = 1,10 V'],['Ulanishi','elektrodlarga parallel']],
    matn:'Haqiqiy tajribada kuchlanish konsentratsiya, harorat va elektrodlar sirtiga qarab 1,10 V dan biroz farq qilishi mumkin. Tok olinganda ichki qarshilik tufayli qisqichlardagi kuchlanish kamayadi.',
    manba:OXW+'; '+LBO},
  kalit:{nom:'Kalit (uzgich)', sarlavha2:'Tashqi zanjir',
    jadval:[['Ochiq','zanjir uzuq — elektronlar oqmaydi, reaksiya deyarli to‘xtaydi'],['Yopiq','elektronlar Zn → Cu yo‘nalishida oqadi, ampermetr strelkasi og‘adi']],
    matn:'Galvanik elementda reaksiya faqat tashqi zanjir yopiq bo‘lganda sezilarli boradi — «batareya» ishlatilmasa, u sekin sarflanadi.',
    manba:LBO},
  ampermetr:{nom:'Ampermetr (milliampermetr)', sarlavha2:'Tashqi zanjir · tokni qayd etadi',
    jadval:[['Ulanishi','zanjirga ketma-ket'],['Strelka og‘adi','kalit yopiq va tuz ko‘prigi joyida bo‘lganda'],['Nega lampa emas?','Daniell elementining ichki qarshiligi katta — tok kichik (milliamperlar), oddiy lampani yoqishga yetmasligi mumkin']],
    matn:'Ampermetr (yoki sezgir galvanometr) zanjirdan tok o‘tayotganini ko‘rsatadi. Tok faqat ikkala zanjir — tashqi (sim, elektronlar) va ichki (tuz ko‘prigi, ionlar) — yopiq bo‘lganda o‘tadi. Kuchliroq tok uchun bir necha element ketma-ket yoki parallel ulanadi.',
    manba:LBO+'; '+W+' «Daniell cell», «Galvanometer»'},
  znso4:{nom:'Rux sulfat eritmasi, ZnSO₄', sarlavha2:'Anod idishi',
    jadval:[['Rangi','rangsiz'],['Standart sharoitda','1 M'],['Ish davomida','Zn²⁺ konsentratsiyasi ortadi']],
    matn:'Anoddan eritmaga Zn²⁺ ionlari o‘tib turadi. Ortiqcha musbat zaryadni tuz ko‘prigidan kelgan NO₃⁻ anionlari muvozanatlaydi.',
    manba:OXW+'; '+W+' «Zinc sulfate»'},
  cuso4:{nom:'Mis(II) sulfat eritmasi, CuSO₄', sarlavha2:'Katod idishi',
    jadval:[['Rangi','ko‘k'],['Standart sharoitda','1 M'],['Ish davomida','Cu²⁺ kamayadi — rang oqaradi']],
    matn:'Katodda Cu²⁺ ionlari misga aylanadi. Qolgan SO₄²⁻ ionlarining manfiy zaryadini ko‘prikdan kelgan K⁺ kationlari muvozanatlaydi.',
    manba:OXW+'; '+W+' «Copper(II) sulfate»'}
};
})();


/* ===== bio-fotosintez ===== */
(function(){
const FM = 'Wikipedia (inglizcha): «Photosynthesis» (en.wikipedia.org/wiki/Photosynthesis), «Leaf» (en.wikipedia.org/wiki/Leaf), «Stoma» (en.wikipedia.org/wiki/Stoma), «Chloroplast» (en.wikipedia.org/wiki/Chloroplast), «Calvin cycle», «Jan Ingenhousz»';
const FD = '6-sinf «Biologiya (Botanika)» darsligi (O‘zbekiston, amaldagi nashr) — «Barg», «Fotosintez» mavzulari; Britannica «Photosynthesis» (britannica.com/science/photosynthesis)';

bogla('biologiya', 'Barg tuzilishi va fotosintez', 'bio-fotosintez', 'Barg kesimi 3D da: og‘izcha, xloroplast, yorug‘lik va CO₂ ta’siri');

D['bio-fotosintez'] = {
  fan:'biologiya', qisqaNom:'Fotosintez', nom:'Barg tuzilishi va fotosintez',
  qisqa:'6-sinf · Botanika · barg kesimi va fotosintez',
  sinf:'6-sinf',
  sahna:'kbg_fotosintez',
  kor:{
    sarlavha:'Barg — o‘simlikning «oshxonasi»',
    matn:'Yashil barg yorug‘lik energiyasi yordamida karbonat angidrid (CO₂) va suvdan (H₂O) organik modda — glyukoza hosil qiladi va havoga kislorod (O₂) chiqaradi. Bu jarayon fotosintez deyiladi va xloroplastlarda boradi. Sahnada barg ko‘ndalang kesimini ko‘ring: to‘qimalarni bosing, yorug‘lik slayderini suring, og‘izchalarni yoping yoki oching — fotosintez tezligi qanday o‘zgarishini kuzating. Tezlik — nisbiy birlikdagi sxematik model, aniq o‘lchov emas.',
    punktlar:[
      '<b>Tenglama:</b> 6CO₂ + 6H₂O → (yorug‘lik, xlorofill) → C₆H₁₂O₆ + 6O₂',
      '<b>Qayerda:</b> barg etining (ustunsimon va bulutsimon to‘qima) hujayralaridagi xloroplastlarda',
      '<b>Kirish-chiqish:</b> CO₂ va O₂ — og‘izchalar orqali, suv — ksilema orqali, qand — floema orqali',
      '<b>Omillar:</b> yorug‘lik, CO₂ miqdori, harorat, suv; og‘izcha yopilsa CO₂ kirmaydi'
    ]
  },
  bolimlar:[
    {sarlavha:'Barg kesimi: yuqoridan pastga', jadval:[
      ['Kutikula','mumsimon parda — suv bug‘lanishini kamaytiradi'],
      ['Ustki epiderma','rangsiz, zich joylashgan hujayralar — himoya, yorug‘likni o‘tkazadi'],
      ['Ustunsimon to‘qima','cho‘ziq hujayralar, xloroplastlar eng ko‘p — fotosintezning asosiy joyi'],
      ['Bulutsimon to‘qima','yumaloq hujayralar, oralarida havo bo‘shliqlari — gaz almashinuvi'],
      ['O‘tkazuvchi tutam (tomir)','ksilema — suv va mineral tuzlar yuqoriga; floema — qand barcha a’zolarga'],
      ['Ostki epiderma','ko‘p o‘simliklarda og‘izchalarning asosiy qismi shu yerda']
    ], matn:'Ikki pallali o‘simliklarning ko‘pida og‘izchalar bargning ostki tomonida ko‘proq bo‘ladi; ko‘p daraxtlarda — faqat ostki tomonda (Wikipedia «Stoma»).'},
    {sarlavha:'Fotosintezning ikki bosqichi', jadval:[
      ['Yorug‘lik bosqichi','tilakoid membranalarida: xlorofill yorug‘likni yutadi, suv parchalanadi, O₂ ajraladi, energiya ATF va NADF·H ko‘rinishida to‘planadi'],
      ['Qorong‘ilik (yorug‘likka bog‘liq bo‘lmagan) bosqichi','stromada — Kalvin sikli: CO₂ biriktirilib, uglevod hosil bo‘ladi']
    ], matn:'«Qorong‘ilik bosqichi» — shartli nom: bu reaksiyalar yorug‘likda ham boradi, faqat yorug‘likni bevosita talab qilmaydi.'},
    {sarlavha:'Fotosintezga ta’sir qiluvchi omillar', jadval:[
      ['Yorug‘lik','tezlik avval tez o‘sadi, keyin to‘yinadi (boshqa omil cheklaydi)'],
      ['CO₂','havoda taxminan 0,04 % (≈ 420 ppm, 2020-yillar); issiqxonada oshirilsa tezlik ortadi'],
      ['Harorat','fermentlar ishlaydi: juda past va juda yuqori haroratda sekinlashadi'],
      ['Suv','suv tanqisligida og‘izchalar yopiladi — CO₂ kirmay qoladi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Barg ko‘ndalang kesimi', matn:'Bargni ko‘ndalang kesib, mikroskopda ko‘rsak, bir necha qatlam ko‘rinadi: kutikula, ustki epiderma, barg eti (ustunsimon va bulutsimon to‘qima), o‘tkazuvchi tutam va ostki epiderma. Qatlamlarni bosib, har birining vazifasini o‘qing.', holat:{rejim:'barg', oqim:false, yoruglik:60, co2:'normal', ogiz:true}},
    {sarlavha:'Ustunsimon to‘qima va xloroplastlar', matn:'Ustki epiderma ostidagi cho‘ziq hujayralar tik joylashgan — yorug‘lik ular bo‘ylab chuqur kiradi. Bu hujayralarda xloroplastlar eng ko‘p. Xloroplastdagi yashil pigment — xlorofill — asosan qizil va ko‘k nurni yutadi, yashil nurni qaytaradi, shuning uchun barg yashil ko‘rinadi.', holat:{rejim:'barg', oqim:false, yoruglik:80}},
    {sarlavha:'Og‘izchalar: gaz eshiklari', matn:'Ostki epidermadagi og‘izcha ikki loviyasimon qo‘riqlovchi hujayradan iborat. Ular suvga to‘lsa, og‘izcha ochiladi; suv kamaysa — yopiladi. Og‘izcha orqali CO₂ kiradi, O₂ va suv bug‘i chiqadi.', holat:{rejim:'barg', oqim:true, ogiz:true, yoruglik:60}},
    {sarlavha:'Moddalar oqimi', matn:'Suv ildizdan poya orqali ksilema bo‘ylab bargga keladi. Havo bo‘shliqlari orqali CO₂ hujayralarga yetadi. Hosil bo‘lgan qand floema orqali ildiz, meva va o‘sayotgan qismlarga tashiladi, kislorod og‘izchadan chiqadi.', holat:{rejim:'barg', oqim:true, yoruglik:90, co2:'normal', ogiz:true}},
    {sarlavha:'Xloroplast ichida', matn:'Xloroplast — ikki membranali organoid. Ichida tilakoidlar taxlanib granalarni hosil qiladi; ular orasidagi suyuqlik — stroma. Yorug‘lik bosqichi tilakoid membranalarida, CO₂ ni biriktirish (Kalvin sikli) stromada boradi. Ortiqcha qand kraxmal donalari ko‘rinishida to‘planadi.', holat:{rejim:'xloroplast'}},
    {sarlavha:'Yorug‘lik va tezlik', matn:'Yorug‘lik slayderini 0 dan 100 % gacha suring. Qorong‘ida fotosintez to‘xtaydi. Yorug‘lik ortgani sari tezlik oshadi, lekin keyin sekinlashib to‘yinadi — endi CO₂ yoki harorat cheklovchi omil bo‘ladi. Grafik — nisbiy birlikdagi sxematik model.', holat:{rejim:'barg', oqim:true, yoruglik:20, co2:'normal', ogiz:true}},
    {sarlavha:'CO₂ va og‘izchalar', matn:'CO₂ ni «yuqori» qiling — tezlik yana ortadi (issiqxonalarda shu usul qo‘llaniladi). Endi og‘izchalarni yoping: CO₂ kirmaydi, tezlik keskin tushadi. Issiq, quruq kunda o‘simlik suvni tejash uchun og‘izchalarini yopadi va fotosintez sekinlashadi.', holat:{rejim:'barg', oqim:true, yoruglik:100, co2:'yuqori', ogiz:false}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Barg laboratoriyasi', holat:{rejim:'barg', oqim:true, yoruglik:20, co2:'normal', ogiz:true},
    topshiriqlar:[
      {shart:'Barg kesimida gazlar kiradigan va chiqadigan <b>og‘izchani</b> bosing.', hodisa:'kbg-foto', kod:"ev.nom==='ogizcha'||ev.nom==='qoriqlovchi'", izoh:'To‘g‘ri — <b>og‘izcha</b> ostki epidermada, uni ikki qo‘riqlovchi hujayra ochib-yopadi.'},
      {shart:'Ildizdan suv olib keladigan to‘qimani — <b>ksilemani</b> bosing.', hodisa:'kbg-foto', kod:"ev.nom==='ksilema'", izoh:'To‘g‘ri — <b>ksilema</b> (yog‘ochlik) suv va mineral tuzlarni yuqoriga o‘tkazadi.'},
      {shart:'Yorug‘likni <b>80 % yoki undan ko‘p</b> qiling (og‘izchalar ochiq bo‘lsin).', hodisa:'kbg-foto-tezlik', kod:"ev.yoruglik>=80&&ev.ogiz===true", izoh:'Yorug‘lik ko‘paydi — fotosintez tezligi oshdi, lekin 100 % ga yaqinlashganda o‘sish sekinlashadi (to‘yinish).'},
      {shart:'CO₂ miqdorini <b>yuqori</b> qiling.', hodisa:'kbg-foto-tezlik', kod:"ev.co2==='yuqori'&&ev.ogiz===true", izoh:'CO₂ ko‘payganda tezlik yana ortdi — issiqxonalarda havoga CO₂ qo‘shish shunga asoslangan.'},
      {shart:'Endi <b>og‘izchalarni yoping</b> — quruq, issiq kunni tasavvur qiling.', hodisa:'kbg-foto-tezlik', kod:"ev.ogiz===false", izoh:'Og‘izcha yopildi — CO₂ kirmaydi, tezlik keskin kamaydi. O‘simlik suvni tejaydi, lekin kam oziqlanadi.'},
      {shart:'Yorug‘likni <b>0 %</b> ga tushiring (tun).', hodisa:'kbg-foto-tezlik', kod:"ev.yoruglik===0", izoh:'Qorong‘ida fotosintez to‘xtaydi (tezlik 0), nafas olish esa kechayu kunduz davom etadi.'}
    ]},
  test:[
    {s:'Fotosintez hujayraning qaysi organoidida boradi?', v:['Mitoxondriya','Xloroplast','Ribosoma','Vakuola'], t:1, izoh:'<b>Xloroplast</b> — yashil plastida; unda xlorofill bor. Mitoxondriyada esa nafas olish (energiya ajralishi) boradi.'},
    {s:'Fotosintezda havoga qaysi gaz chiqariladi?', v:['Karbonat angidrid','Azot','Kislorod','Vodorod'], t:2, izoh:'<b>Kislorod</b>: u suv molekulalarining parchalanishidan hosil bo‘ladi. CO₂ esa, aksincha, yutiladi.'},
    {s:'Fotosintezning umumiy tenglamasi qaysi?', v:['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂','2H₂ + O₂ → 2H₂O','CO₂ + H₂O → H₂CO₃'], t:1, izoh:'<b>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</b> (yorug‘lik va xlorofill ishtirokida). Birinchi variant — nafas olishning umumiy tenglamasi.'},
    {s:'Barg etining qaysi to‘qimasida xloroplastlar eng ko‘p?', v:['Ustki epiderma','Bulutsimon to‘qima','Ustunsimon to‘qima','Kutikula'], t:2, izoh:'<b>Ustunsimon to‘qima</b> — yorug‘likka yaqin, tik joylashgan cho‘ziq hujayralar; fotosintezning asosiy joyi.'},
    {s:'Og‘izchani nima ochib-yopadi?', v:['Kutikula','Ikki qo‘riqlovchi hujayra','Ksilema','Floema'], t:1, izoh:'<b>Ikki qo‘riqlovchi hujayra</b>: suvga to‘lsa bukiladi va og‘izcha ochiladi, suv kamaysa yopiladi.'},
    {s:'Bargga suv qaysi to‘qima orqali keladi?', v:['Floema','Ksilema','Epiderma','Kutikula'], t:1, izoh:'<b>Ksilema</b> (yog‘ochlik) — suv va mineral tuzlarni ildizdan yuqoriga o‘tkazadi; floema esa qandni tashiydi.'},
    {s:'Barg nima uchun yashil ko‘rinadi?', v:['Xlorofill yashil nurni ko‘proq qaytaradi','Xlorofill yashil nurni to‘liq yutadi','Kutikula yashil rangda','Barg suvi yashil'], t:0, izoh:'<b>Xlorofill yashil nurni ko‘proq qaytaradi</b> — u asosan qizil va ko‘k nurni yutadi.'},
    {s:'Yorug‘lik bosqichi xloroplastning qayerida boradi?', v:['Stromada','Tilakoid membranalarida','Tashqi membranada','Kraxmal donasida'], t:1, izoh:'<b>Tilakoid membranalarida</b> — xlorofill shu yerda. CO₂ ni biriktirish (Kalvin sikli) esa stromada boradi.'},
    {s:'O‘simlik uchun yorug‘lik zarurligini 1779-yilda tajribada ko‘rsatgan olim kim?', v:['Jozef Pristli','Yan Ingenxauz','Robert Guk','Charlz Darvin'], t:1, izoh:'<b>Yan Ingenxauz</b> (1779): o‘simlik havoni faqat yorug‘likda «tozalashini» (kislorod chiqarishini) isbotlagan. Pristli 1771-yilda o‘simlik havoni «tiklashini» ko‘rgan.'},
    {s:'Og‘izchalar yopilsa, fotosintez nima uchun sekinlashadi?', v:['Suv kirmaydi','CO₂ kirmaydi','Yorug‘lik kirmaydi','Xlorofill parchalanadi'], t:1, izoh:'<b>CO₂ kirmaydi</b> — karbonat angidrid bargga faqat og‘izchalar orqali kiradi.'},
    {s:'Yorug‘lik juda kuchli bo‘lganda tezlik nega boshqa oshmaydi?', v:['Barg quriydi','Boshqa omil (CO₂, harorat) cheklovchi bo‘lib qoladi','Xloroplast yo‘qoladi','Kislorod tugaydi'], t:1, izoh:'<b>Boshqa omil (CO₂, harorat) cheklovchi bo‘lib qoladi</b> — egri chiziq to‘yinadi.'},
    {s:'Fotosintezda hosil bo‘lgan qand o‘simlik bo‘ylab qaysi to‘qima orqali tashiladi?', v:['Ksilema','Floema','Kutikula','Og‘izcha'], t:1, izoh:'<b>Floema</b> (lub) — organik moddalarni barglardan ildiz, meva va o‘sayotgan qismlarga o‘tkazadi.'},
    {tur:'3d', s:'Barg kesimida CO₂ kiradigan <b>og‘izchani</b> (yoki uning qo‘riqlovchi hujayrasini) bosing.', hodisa:'kbg-foto', kalit:'nom', togri:['ogizcha','qoriqlovchi'], v:['Og‘izcha (qo‘riqlovchi hujayralar)','boshqa to‘qima'], t:0,
     izoh:'<b>Og‘izcha</b> ostki epidermada joylashgan: ikki qo‘riqlovchi hujayra orasidagi teshik orqali CO₂ kiradi, O₂ va suv bug‘i chiqadi.'}
  ],
  yordamchi:[
    {s:'O‘simlik kechasi nafas oladimi?', j:'Ha. O‘simlik kechayu kunduz nafas oladi: kislorod yutib, CO₂ chiqaradi. Kunduzi fotosintez nafas olishdan kuchliroq bo‘lgani uchun o‘simlik umuman olganda kislorod chiqaradi; qorong‘ida esa faqat nafas olish qoladi.', kalit:['kecha','nafas','tun']},
    {s:'Nega barg kuzda sarg‘ayadi?', j:'Kuzda kun qisqaradi va salqinlashadi, o‘simlik xlorofillni parchalab, undagi moddalarni zaxiraga oladi. Xlorofill yo‘qolgach, bargdagi sariq-to‘q sariq pigmentlar (karotinoidlar) ko‘rinib qoladi.', kalit:['kuz','sariq','rang']},
    {s:'Sahnadagi tezlik raqamlari haqiqiy o‘lchovmi?', j:'Yo‘q. Bu nisbiy birlikdagi sxematik model: u faqat bog‘liqlik shaklini ko‘rsatadi — yorug‘lik ortsa tezlik o‘sib, keyin to‘yinadi; CO₂ ko‘paysa ortadi; og‘izcha yopilsa keskin tushadi. Haqiqiy qiymat o‘simlik turi, harorat va boshqa sharoitlarga bog‘liq.', kalit:['tezlik','raqam','model','haqiqiy']}
  ],
  maqola:[
    {sarlavha:'Barg — oziq tayyorlaydigan a’zo', xatboshilar:[
      'Hayvonlar tayyor organik moddalar bilan oziqlanadi, yashil o‘simliklar esa ularni o‘zi yaratadi. Buning uchun o‘simlikka yorug‘lik, havodagi karbonat angidrid va ildiz orqali olingan suv kerak. Organik moddaning asosiy qismi bargda hosil bo‘ladi, shuning uchun bargni o‘simlikning «oshxonasi» deyishadi.',
      'Barg yupqa va keng — bu yorug‘likni ko‘p tutish uchun qulay. Barg plastinkasi ichida tomirlar — o‘tkazuvchi tutamlar joylashgan: ular bargni poya bilan bog‘laydi va bir vaqtning o‘zida uni skelet kabi tutib turadi.',
      'Fotosintez natijasida Yer atmosferasidagi kislorod ta’minlanadi va deyarli barcha oziq zanjirlarining boshlang‘ich organik moddasi hosil bo‘ladi. Biz yeydigan non, meva va sabzavotlar — bevosita, go‘sht va sut esa bilvosita fotosintez mahsulidir.'
    ]},
    {sarlavha:'Barg ichki tuzilishi', xatboshilar:[
      'Bargning ustki va ostki yuzasini epiderma qoplaydi. Epiderma hujayralari rangsiz va zich joylashgan; ular yorug‘likni o‘tkazadi va ichki to‘qimalarni himoya qiladi. Ustki epiderma ustida mumsimon kutikula bor — u suv bug‘lanishini kamaytiradi.',
      'Epidermalar orasida barg eti — mezofill joylashgan. Uning yuqori qismi ustunsimon to‘qima: cho‘ziq hujayralar bir-biriga zich tik turadi va xloroplastlarga boy. Pastki qismi bulutsimon to‘qima: hujayralar yumaloq, tartibsiz joylashgan, oralarida havo bo‘shliqlari bor. Bu bo‘shliqlar orqali CO₂ hujayralarga yetib boradi.',
      'Barg etida o‘tkazuvchi tutamlar (tomirlar) o‘tadi. Tutamning yuqori qismidagi ksilema (yog‘ochlik) suv va mineral tuzlarni keltiradi, pastki qismidagi floema (lub) esa hosil bo‘lgan qandni olib ketadi.',
      'Ostki epidermada og‘izchalar ko‘p. Ikki pallali o‘simliklarda ular odatda ostki tomonda ko‘proq, ko‘p daraxtlarda faqat ostki tomonda bo‘ladi; bir pallalilarda ikkala tomonda ham deyarli teng bo‘lishi mumkin. Og‘izchaning uzunligi turga qarab taxminan 10–80 mikrometr.'
    ]},
    {sarlavha:'Fotosintez qanday boradi?', xatboshilar:[
      'Fotosintezning umumiy tenglamasi: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Jarayon uchun yorug‘lik energiyasi va xlorofill zarur. Xlorofill asosan qizil va ko‘k nurni yutadi.',
      'Birinchi — yorug‘lik bosqichi tilakoid membranalarida boradi. Yorug‘lik energiyasi hisobiga suv molekulalari parchalanadi, kislorod ajralib chiqadi, energiya esa ATF va NADF·H molekulalarida to‘planadi. Demak, havoga chiqadigan kislorod suvdan olinadi, CO₂ dan emas.',
      'Ikkinchi bosqich stromada boradi (Kalvin sikli). Bu yerda to‘plangan energiya hisobiga CO₂ biriktiriladi va uglevodlar hosil bo‘ladi. Glyukoza keyin saxarozaga aylanib floema orqali tashiladi yoki kraxmal sifatida zaxiraga olinadi.',
      'O‘simliklar odatda tushgan yorug‘lik energiyasining atigi 3–6 % ini kimyoviy energiyaga aylantiradi (sharoitga qarab 0,1 % dan 8 % gacha). Qolgan energiya qaytadi, o‘tib ketadi yoki issiqlikka aylanadi.'
    ]},
    {sarlavha:'Omillar va tarixiy tajribalar', xatboshilar:[
      'Fotosintez tezligiga yorug‘lik, CO₂ miqdori, harorat va suv ta’sir qiladi. Yorug‘lik ortgan sari tezlik avval tez oshadi, so‘ng o‘sish sekinlashadi: endi boshqa omil «cheklovchi» bo‘lib qoladi. Issiqxonalarda havoga CO₂ qo‘shib, hosildorlik oshiriladi. Suv yetishmasa, o‘simlik og‘izchalarini yopadi — suv tejaladi, lekin CO₂ kirmaydi.',
      'Ingliz olimi Jozef Pristli 1771-yilda yopiq idishda sham yonib o‘chgan havoni yalpiz novdasi «tiklashini» kuzatgan. Golland shifokori Yan Ingenxauz 1779-yilda bu faqat yorug‘likda va faqat o‘simlikning yashil qismlari bilan sodir bo‘lishini ko‘rsatgan.',
      'Maktab tajribasi: suv o‘tini (elodeya) suvli probirkaga solib, yorug‘likka qo‘ysak, barglardan pufakchalar (kislorod) chiqadi. Lampa yaqinlashtirilsa, pufakchalar ko‘payadi. Kraxmal hosil bo‘lishini esa yod eritmasi bilan tekshirish mumkin: kraxmal bor joy ko‘k-qora bo‘ladi (xavfsizlik: bargni issiq spirtda rangsizlantirish faqat o‘qituvchi nazoratida, ochiq olovdan uzoqda — suv hammomida bajariladi).',
      'Ko‘p uchraydigan xatolar: «o‘simlik faqat kunduzi nafas oladi» — noto‘g‘ri, nafas olish doimiy; «kislorod CO₂ dan ajraladi» — noto‘g‘ri, u suvdan ajraladi; «barg hamma nurni yutadi» — noto‘g‘ri, yashil nur ko‘proq qaytadi.'
    ]}
  ],
  formulalar:[
    ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂','Fotosintezning umumiy tenglamasi (yorug‘lik, xlorofill)'],
    ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energiya','Nafas olish — teskari jarayon (mitoxondriyada)'],
    ['2H₂O → 4H⁺ + 4e⁻ + O₂','Yorug‘lik bosqichida suvning parchalanishi (fotoliz)'],
    ['Tezlik (model) = 70 · f(yorug‘lik) · f(CO₂) · f(og‘izcha)','Sahnadagi sxematik model, nisbiy birlik; f(L) = 1,25·L / (L + 25)']
  ],
  qiziqarli:[
    'Xloroplastlar bir necha milliard yil oldin eukariot hujayraga kirib qolgan sianobakteriyadan kelib chiqqan deb hisoblanadi (endosimbioz); ularning o‘z halqasimon DNKsi bor.',
    'Bitta mezofill hujayrasida bir nechta dan 100 tagacha xloroplast bo‘lishi mumkin (masalan, bug‘doy va arabidopsisda — 100 tagacha).',
    'Ko‘p daraxtlarning barglarida og‘izchalar faqat ostki tomonda joylashgan — bu to‘g‘ridan-to‘g‘ri quyosh ostida suv yo‘qotishni kamaytiradi.',
    'Kuzgi sariq rang yangi paydo bo‘lmaydi: karotinoidlar yozda ham bargda bo‘ladi, faqat xlorofill ularni yashirib turadi.',
    'O‘simliklar odatda yorug‘lik energiyasining atigi 3–6 % ini kimyoviy energiyaga aylantiradi.'
  ],
  lugat:[
    ['Fotosintez','Yorug‘lik energiyasi hisobiga CO₂ va suvdan organik modda hosil bo‘lishi, O₂ ajralishi.'],
    ['Xlorofill','Xloroplastdagi yashil pigment; yorug‘likni yutadi.'],
    ['Xloroplast','Fotosintez boradigan ikki membranali yashil organoid.'],
    ['Mezofill (barg eti)','Epidermalar orasidagi ustunsimon va bulutsimon to‘qima.'],
    ['Epiderma','Bargni qoplovchi himoya to‘qimasi.'],
    ['Kutikula','Epiderma ustidagi mumsimon parda.'],
    ['Og‘izcha','Ikki qo‘riqlovchi hujayra orasidagi teshik — gaz almashinuvi va bug‘lanish yo‘li.'],
    ['Ksilema','Suv va mineral tuzlarni yuqoriga o‘tkazuvchi to‘qima (yog‘ochlik).'],
    ['Floema','Organik moddalarni tashuvchi to‘qima (lub).'],
    ['Tilakoid','Xloroplast ichidagi yassi membrana xaltachasi; taxlami — grana.'],
    ['Stroma','Xloroplastning ichki suyuqligi; Kalvin sikli shu yerda.'],
    ['Cheklovchi omil','Jarayon tezligini hozir eng ko‘p cheklayotgan omil.']
  ],
  manba:FD+'; '+FM+'. Og‘izcha o‘lchami 10–80 µm, samaradorlik 3–6 % — Wikipedia «Stoma», «Photosynthesis»; Pristli 1771, Ingenhauz 1779 — Wikipedia «Photosynthesis», «Jan Ingenhousz». Sahnadagi tezlik — nisbiy birlikdagi sxematik model.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (3D model + virtual tajriba)', usul:'3D barg kesimi, virtual tajriba (omillarni o‘zgartirish), juftlikda ishlash, grafik chizish',
    maqsad:{talimiy:'Bargning ichki tuzilishi, fotosintez jarayoni, uning tenglamasi va fotosintezga ta’sir qiluvchi omillarni o‘rganish.',
      tarbiyaviy:'Yashil o‘simliklarning hayotdagi o‘rnini anglash, tabiatni asrashga undash.',
      rivojlantiruvchi:'Tajriba natijasini tahlil qilish, bog‘liqlikni grafikda ko‘rsatish, xulosa chiqarish ko‘nikmasini rivojlantirish.'},
    natijalar:['Barg kesimidagi 6 ta qatlamni ko‘rsatadi va vazifasini aytadi','Fotosintez tenglamasini yozadi','Og‘izcha, ksilema va floema vazifasini tushuntiradi','Yorug‘lik, CO₂, og‘izcha holatining ta’sirini tajribada aniqlaydi','Nafas olish va fotosintezni taqqoslaydi'],
    jihozlar:['MAKON sahnasi «Barg kesimi va fotosintez»','Proyektor yoki interaktiv doska','Mikroskop va tayyor barg kesimi preparati (bo‘lsa)','Elodeya, probirka, stol lampasi (namoyish uchun)','Tarqatma: «omil — tezlik» jadvali'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Katta daraxtning massasi qayerdan keladi — tuproqdanmi?» muammoli savoli.','Taxmin aytadi.'],
      ['8–20','<b>Barg tuzilishi.</b> MAKON da barg kesimi: qatlamlarni ketma-ket bosib tushuntiradi; mikroskop preparati bilan solishtiradi.','Qatlamlar sxemasini daftarga chizadi.'],
      ['20–28','<b>Fotosintez.</b> Tenglamani yozadi, moddalar oqimini (CO₂, H₂O, O₂, qand) sahnada ko‘rsatadi; xloroplast ichini ochadi.','Tenglamani yozadi, strelkali sxema tuzadi.'],
      ['28–37','<b>Virtual tajriba.</b> Juftliklar yorug‘lik 0, 25, 50, 75, 100 % da tezlikni yozib, grafik chizadi; og‘izcha va CO₂ ta’sirini tekshiradi.','Jadval to‘ldiradi, grafik chizadi, xulosa aytadi.'],
      ['37–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Fotosintez','Yorug‘likda organik modda hosil bo‘lishi.'],['Xlorofill','Yashil pigment.'],['Og‘izcha','Gaz almashinuvi teshigi.'],['Ksilema','Suv o‘tkazuvchi to‘qima.'],['Floema','Qand tashuvchi to‘qima.']],
    savollar:[['Fotosintez tenglamasini yozing.','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'],['Xloroplast eng ko‘p to‘qima?','Ustunsimon to‘qima'],['CO₂ bargga qayerdan kiradi?','Og‘izchalar orqali'],['Ajraladigan kislorod qaysi moddadan olinadi?','Suvdan'],['Fotosintezga ta’sir qiluvchi 3 ta omil?','Yorug‘lik, CO₂, harorat (yana — suv)']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) barg kesimi sxemasini chizib, qatlamlarni belgilash; (2) sahnadagi model bo‘yicha yorug‘lik 0–100 % uchun tezlik grafigini chizish; (3) uyda xona o‘simligining bir bargini 2 kun qora qog‘oz bilan qisman yopib, farqni kuzatish (kraxmal sinovi faqat maktabda, o‘qituvchi bilan).',
    manba:FD+'; '+FM
  }
};

const S = 'Wikipedia (inglizcha)';
DT.kbg_fotosintez = {
  kutikula:{nom:'Kutikula', sarlavha2:'Barg · himoya qatlami', jadval:[['Tarkibi','mum va kutin'],['Joyi','ustki (va ostki) epiderma ustida'],['Vazifasi','suv bug‘lanishini kamaytiradi, mikroblardan himoya']], matn:'Cho‘l o‘simliklarida kutikula ayniqsa qalin bo‘ladi — suv tejaladi. Kutikula yorug‘likni o‘tkazadi.', manba:S+' «Plant cuticle»; '+FD},
  ust_epiderma:{nom:'Ustki epiderma', sarlavha2:'Barg · qoplovchi to‘qima', jadval:[['Hujayralari','rangsiz, zich, bir qavat'],['Xloroplast','deyarli yo‘q (qo‘riqlovchi hujayralardan tashqari)'],['Vazifasi','himoya, yorug‘likni ichkariga o‘tkazish']], matn:'Epiderma hujayralari tiniq bo‘lgani uchun yorug‘lik ichkaridagi ustunsimon to‘qimaga yetib boradi.', manba:S+' «Leaf», «Epidermis (botany)»'},
  ustunsimon:{nom:'Ustunsimon to‘qima', sarlavha2:'Barg eti · fotosintezning asosiy joyi', jadval:[['Hujayralari','cho‘ziq, tik, zich joylashgan'],['Xloroplastlar','eng ko‘p (hujayrada 100 tagacha bo‘lishi mumkin — turga qarab)'],['Joyi','ustki epiderma ostida']], matn:'Hujayralarning tik joylashuvi yorug‘likning chuqur kirishiga yordam beradi. Kuchli yorug‘likda xloroplastlar hujayra devori bo‘ylab «qirrasi bilan» turib, ortiqcha nurdan himoyalanadi.', manba:S+' «Palisade cell», «Chloroplast»'},
  bulutsimon:{nom:'Bulutsimon to‘qima', sarlavha2:'Barg eti · gaz almashinuvi', jadval:[['Hujayralari','yumaloq, tartibsiz joylashgan'],['Oralig‘i','katta havo bo‘shliqlari'],['Vazifasi','fotosintez (kamroq), gazlar harakati']], matn:'Og‘izchadan kirgan CO₂ havo bo‘shliqlari orqali barcha hujayralarga tarqaladi, O₂ va suv bug‘i esa shu yo‘l bilan chiqadi.', manba:S+' «Leaf» (Mesophyll)'},
  havo:{nom:'Havo bo‘shliqlari', sarlavha2:'Barg eti · hujayralararo bo‘shliq', jadval:[['Tarkibi','CO₂, O₂, suv bug‘i'],['Bog‘liqligi','og‘izchalar bilan tutashgan']], matn:'Bo‘shliqlar hujayralarning nam yuzasiga gaz yetkazib beradi: CO₂ suvda erib hujayraga kiradi.', manba:S+' «Leaf»'},
  ksilema:{nom:'Ksilema (yog‘ochlik)', sarlavha2:'O‘tkazuvchi tutam · suv yo‘li', jadval:[['Tashiydi','suv va mineral tuzlar'],['Yo‘nalish','ildizdan yuqoriga'],['Hujayralari','o‘lik naychalar (traxeya, traxeidlar)']], matn:'Bargda ksilema tomirning ustki qismida joylashadi. Suvning yuqoriga ko‘tarilishida bargdan bug‘lanish (transpiratsiya) «tortuvchi kuch» vazifasini bajaradi.', manba:S+' «Xylem», «Transpiration»'},
  floema:{nom:'Floema (lub)', sarlavha2:'O‘tkazuvchi tutam · qand yo‘li', jadval:[['Tashiydi','organik moddalar (asosan saxaroza)'],['Yo‘nalish','bargdan boshqa a’zolarga (ildiz, meva, kurtak)'],['Hujayralari','tirik elaksimon naychalar va yo‘ldosh hujayralar']], matn:'Glyukoza bargda saxarozaga aylantirilib, floema orqali tashiladi.', manba:S+' «Phloem»'},
  ost_epiderma:{nom:'Ostki epiderma', sarlavha2:'Barg · og‘izchalar qatlami', jadval:[['Xususiyati','og‘izchalar ko‘p (ikki pallalilarda)'],['Ko‘p daraxtlarda','og‘izchalar faqat ostki tomonda']], matn:'Og‘izchalarning soya tomonda bo‘lishi bug‘lanishni kamaytiradi.', manba:S+' «Stoma»'},
  ogizcha:{nom:'Og‘izcha (stoma)', sarlavha2:'Barg · gaz eshigi', jadval:[['Tuzilishi','ikki qo‘riqlovchi hujayra orasidagi teshik'],['O‘lchami','uzunligi taxminan 10–80 µm (turga qarab)'],['Orqali o‘tadi','CO₂ kiradi; O₂ va suv bug‘i chiqadi']], matn:'O‘simlik CO₂ olmoqchi bo‘lsa, albatta suv yo‘qotadi — og‘izcha ikki vazifa o‘rtasida muvozanat saqlaydi. Og‘izchalar zichligi turga qarab juda farq qiladi (taxminan 1 mm² da o‘nlab — bir necha yuz).', manba:S+' «Stoma»; stomata zichligi — taxminiy (turlarga qarab)'},
  qoriqlovchi:{nom:'Qo‘riqlovchi hujayralar', sarlavha2:'Og‘izcha · ochib-yopuvchi', jadval:[['Soni','har og‘izchada 2 ta'],['Shakli','loviyasimon (bug‘doydoshlarda — gantelsimon)'],['Xloroplast','bor (epiderma hujayralaridan farqli)']], matn:'Hujayralar suvga to‘lsa (turgor oshsa), qalin ichki devori tufayli bukiladi va og‘izcha ochiladi; suv kamaysa, yopiladi.', manba:S+' «Guard cell»'},
  xloroplast:{nom:'Xloroplast', sarlavha2:'Organoid · fotosintez joyi', jadval:[['Membrana','ikki qavat'],['Ichida','tilakoidlar (granalar), stroma, o‘z DNKsi, ribosomalar'],['Pigment','xlorofill a va b, karotinoidlar']], matn:'Xloroplast sianobakteriyadan kelib chiqqan deb hisoblanadi (endosimbioz nazariyasi). «Xloroplast» rejimini tanlab, ichini ko‘ring.', manba:S+' «Chloroplast»'},
  yoruglik:{nom:'Yorug‘lik', sarlavha2:'Fotosintez · energiya manbai', jadval:[['Yutiladi','asosan qizil va ko‘k nurlar'],['Qaytariladi','yashil nur ko‘proq'],['Samaradorlik','odatda 3–6 %']], matn:'Yorug‘lik bo‘lmasa, fotosintez to‘xtaydi. Juda kuchli yorug‘likda tezlik to‘yinadi.', manba:S+' «Photosynthesis»'},
  co2:{nom:'Karbonat angidrid (CO₂)', sarlavha2:'Fotosintez · xomashyo', jadval:[['Havoda','taxminan 0,04 % (≈ 420 ppm, 2020-yillar)'],['Kirish yo‘li','og‘izchalar'],['Ishlatiladi','Kalvin siklida (stromada)']], matn:'Glyukozadagi uglerod atomlari havodagi CO₂ dan olinadi. Issiqxonalarda CO₂ qo‘shib, hosil oshiriladi.', manba:'NOAA Global Monitoring Laboratory (gml.noaa.gov/ccgg/trends); '+S+' «Photosynthesis»'},
  o2:{nom:'Kislorod (O₂)', sarlavha2:'Fotosintez · mahsulot', jadval:[['Manbai','suvning parchalanishi (yorug‘lik bosqichi)'],['Chiqish yo‘li','og‘izchalar'],['Havoda','taxminan 21 %']], matn:'Atmosferadagi kislorod asosan fotosintez tufayli hosil bo‘lgan va saqlanadi.', manba:S+' «Photosynthesis», «Atmosphere of Earth»'},
  h2o:{nom:'Suv (H₂O)', sarlavha2:'Fotosintez · xomashyo', jadval:[['Kirish yo‘li','ildiz → poya → ksilema → barg'],['Taqdiri','kichik qismi fotosintezga, katta qismi bug‘lanadi (transpiratsiya)']], matn:'Suvdan ajralgan kislorod havoga chiqadi, vodorod esa organik modda hosil bo‘lishiga sarflanadi.', manba:S+' «Photosynthesis», «Transpiration»'},
  qand:{nom:'Qand (glyukoza → saxaroza)', sarlavha2:'Fotosintez · organik mahsulot', jadval:[['Formula','glyukoza C₆H₁₂O₆'],['Tashilishi','saxaroza ko‘rinishida floema orqali'],['Zaxira','kraxmal (bargda, ildiz va urug‘da)']], matn:'Qand o‘simlik uchun energiya manbai va qurilish materiali (sellyuloza, kraxmal) hisoblanadi.', manba:S+' «Photosynthesis», «Phloem»'},
  xl_membrana:{nom:'Xloroplast membranalari', sarlavha2:'Xloroplast · qobiq', jadval:[['Qavatlar','tashqi va ichki membrana'],['Vazifasi','moddalar kirish-chiqishini boshqaradi']], matn:'Qo‘sh membrana — endosimbioz nazariyasining dalillaridan biri.', manba:S+' «Chloroplast»'},
  grana:{nom:'Grana', sarlavha2:'Xloroplast · tilakoid taxlami', jadval:[['Tuzilishi','tanga kabi taxlangan tilakoidlar'],['Vazifasi','yorug‘lik bosqichi']], matn:'Granalar o‘zaro stroma tilakoidlari (lamellalar) bilan bog‘langan.', manba:S+' «Thylakoid», «Chloroplast»'},
  tilakoid:{nom:'Tilakoid', sarlavha2:'Xloroplast · yorug‘lik bosqichi joyi', jadval:[['Membranasida','xlorofill, fotosistemalar, ATF-sintaza'],['Jarayon','suv parchalanishi, O₂ ajralishi, ATF hosil bo‘lishi']], matn:'Tilakoid — yassi membrana xaltachasi; ularning ko‘pligi yorug‘lik yutadigan yuzani oshiradi.', manba:S+' «Thylakoid»'},
  stroma:{nom:'Stroma', sarlavha2:'Xloroplast · ichki suyuqlik', jadval:[['Jarayon','Kalvin sikli — CO₂ biriktirilishi'],['Tarkibi','fermentlar (jumladan, RuBisCO), DNK, ribosomalar']], matn:'Stromada yorug‘lik bosqichida to‘plangan ATF va NADF·H energiyasi hisobiga uglevod hosil bo‘ladi.', manba:S+' «Calvin cycle», «Chloroplast»'},
  kraxmal:{nom:'Kraxmal donasi', sarlavha2:'Xloroplast · zaxira', jadval:[['Nima','glyukozadan tuzilgan polisaxarid'],['Aniqlash','yod eritmasi bilan ko‘k-qora rang']], matn:'Kunduzi to‘plangan kraxmal kechasi parchalanib, qand ko‘rinishida tashib ketiladi.', manba:S+' «Starch»; '+FD}
};
})();


/* ===== bio-hujayra ===== */
(function(){
const HM = 'Wikipedia (inglizcha): «Cell (biology)», «Cell theory», «Cell nucleus», «Mitochondrion», «Ribosome», «Endoplasmic reticulum», «Golgi apparatus», «Lysosome», «Centriole», «Vacuole», «Chloroplast», «Cell wall» (en.wikipedia.org)';
const HD = '9-sinf «Biologiya (Sitologiya va genetika asoslari)» darsligi (O‘zbekiston, amaldagi nashr) — «Hujayra haqidagi ta’limot», «Hujayra organoidlari»; 5–6-sinf «Botanika» (o‘simlik hujayrasi bilan birinchi tanishuv); Britannica «Cell» (britannica.com/science/cell-biology)';

bogla('biologiya', 'Hujayra tuzilishi', 'bio-hujayra', 'Hayvon va o‘simlik hujayrasi 3D kesimda: 14 ta organoid', ['Hujayra tuzilishi']);

D['bio-hujayra'] = {
  fan:'biologiya', qisqaNom:'Hujayra', nom:'Hayvon va o‘simlik hujayrasi tuzilishi',
  qisqa:'9-sinf · Sitologiya asoslari · organoidlar 3D kesimda',
  sinf:'9-sinf',
  sahna:'kbg_hujayra',
  kor:{
    sarlavha:'Hayotning eng kichik birligi — hujayra',
    matn:'Barcha tirik organizmlar hujayralardan tuzilgan. Eukariot hujayra ichida vazifalari bo‘lingan «kichik a’zolar» — organoidlar ishlaydi: yadro irsiy axborotni saqlaydi, mitoxondriya energiya beradi, ribosomalar oqsil yig‘adi, Golji apparati mahsulotni «qadoqlaydi». Sahnada chorak qismi kesib olingan 3D hujayrani ko‘ring, organoidlarni bosib ma’lumot kartasini oching va hayvon hamda o‘simlik hujayrasini almashtirib solishtiring. Model sxematik: o‘lchamlar nisbati aniq emas.',
    punktlar:[
      '<b>Uch asosiy qism:</b> hujayra membranasi, sitoplazma (organoidlar bilan), yadro',
      '<b>Faqat o‘simlikda:</b> sellyulozali hujayra devori, katta markaziy vakuola, xloroplastlar',
      '<b>Faqat hayvonda (yuksak o‘simliklarda yo‘q):</b> sentriolalar (hujayra markazi)',
      '<b>Hujayra nazariyasi:</b> M. Shleyden va T. Shvann (1838–1839), R. Virxov «har bir hujayra — hujayradan» (1855)'
    ]
  },
  bolimlar:[
    {sarlavha:'Hayvon va o‘simlik hujayrasi: taqqoslash', jadval:[
      ['Hujayra devori','o‘simlikda — bor (sellyuloza); hayvonda — yo‘q'],
      ['Shakli','o‘simlikda — ko‘pincha burchakli, doimiy; hayvonda — turli, o‘zgaruvchan'],
      ['Vakuola','o‘simlikda — katta markaziy (hajmning 30–80 %); hayvonda — mayda, vaqtinchalik'],
      ['Plastidalar','o‘simlikda — xloroplast, xromoplast, leykoplast; hayvonda — yo‘q'],
      ['Sentriolalar','hayvonda — bor; yuksak o‘simliklarda — yo‘q'],
      ['Zaxira uglevod','o‘simlikda — kraxmal; hayvonda — glikogen']
    ]},
    {sarlavha:'Organoidlar guruhlari', jadval:[
      ['Ikki membranali','yadro (yadro qobig‘i), mitoxondriya, xloroplast'],
      ['Bir membranali','EPT, Golji apparati, lizosoma, vakuola'],
      ['Membranasiz','ribosoma, sentriolalar (hujayra markazi)']
    ], matn:'Ikki membranali mitoxondriya va xloroplastlarning o‘z DNKsi va ribosomalari bor — ular qadimgi bakteriyalardan kelib chiqqan deb hisoblanadi (endosimbioz nazariyasi).'},
    {sarlavha:'O‘lchamlar (taxminiy)', jadval:[
      ['Hayvon hujayrasi','odatda 10–30 µm (turiga qarab juda farq qiladi)'],
      ['Yadro (odam hujayrasida)','diametri ≈ 6 µm'],
      ['Mitoxondriya','ko‘ndalang kesimi 0,75–3 µm² (uzunligi bir necha µm)'],
      ['Ribosoma (eukariot, 80S)','25–30 nm']
    ], matn:'1 µm (mikrometr) = 0,001 mm; 1 nm (nanometr) = 0,001 µm. Ribosomani faqat elektron mikroskopda ko‘rish mumkin.'}
  ],
  bosqichlar:[
    {sarlavha:'Hujayraning umumiy ko‘rinishi', matn:'Hujayra membrana bilan o‘ralgan. Ichini yarim suyuq sitoplazma to‘ldiradi, unda organoidlar joylashgan. Eng yirik organoid — yadro. Modelning chorak qismi kesib olingan — ichini ko‘rish uchun sichqoncha bilan aylantiring.', holat:{tur:'hayvon', kesim:true, organoid:null}},
    {sarlavha:'Membrana va sitoplazma', matn:'Hujayra membranasi (plazmolemma) — ikki qavat lipid va oqsillardan iborat yupqa parda. U tanlab o‘tkazadi: ba’zi moddalarni kiritadi, boshqalarini chiqarmaydi. Sitoplazma organoidlarni birlashtiradi, unda ko‘p kimyoviy reaksiyalar boradi.', holat:{tur:'hayvon', organoid:'membrana'}},
    {sarlavha:'Yadro — boshqaruv markazi', matn:'Yadro qo‘sh membranali qobiq bilan o‘ralgan, qobiqda teshiklar (poralar) bor. Ichida xromatin — DNK va oqsillar, hamda yadrocha joylashgan. Yadrochada ribosoma qismlari yig‘iladi. Yadroni birinchi bo‘lib 1831-yilda Robert Braun batafsil tasvirlagan.', holat:{tur:'hayvon', organoid:'yadro'}},
    {sarlavha:'Oqsil «konveyeri»: ribosoma → EPT → Golji', matn:'Ribosomalar oqsil yig‘adi. Donador EPT yuzasida ribosomalar o‘tirgan — tayyor oqsil EPT kanallari bo‘ylab Golji apparatiga boradi. Golji apparati oqsilni «saralaydi va qadoqlaydi», pufakchalarda hujayradan chiqaradi yoki lizosomalar hosil qiladi. Silliq EPT yog‘lar va uglevodlar sintezida qatnashadi.', holat:{tur:'hayvon', organoid:'golji'}},
    {sarlavha:'Mitoxondriya — energiya stansiyasi', matn:'Mitoxondriya ikki membranali; ichki membranasi burmalar — kristalar hosil qiladi. Bu yerda organik moddalar kislorod ishtirokida parchalanib, ATF — hujayraning «energiya valyutasi» — hosil bo‘ladi. Jigar hujayrasida mitoxondriyalar 2000 dan ortiq bo‘lishi mumkin.', holat:{tur:'hayvon', organoid:'mitoxondriya'}},
    {sarlavha:'O‘simlik hujayrasi', matn:'O‘simlik hujayrasini tanlang. Tashqarida qalin sellyulozali devor, ichkarida katta markaziy vakuola (hujayra shirasi bilan) va yashil xloroplastlar ko‘rinadi. Vakuola hujayra hajmining 30 % dan ko‘pini, ba’zan 80 % gacha qismini egallaydi va turgor bosimini hosil qiladi.', holat:{tur:'osimlik', organoid:'vakuola'}},
    {sarlavha:'Xloroplast va devor', matn:'Xloroplastlarda fotosintez boradi — ular faqat o‘simliklarning yashil qismlarida bo‘ladi. Hujayra devori shaklni saqlaydi va himoya qiladi; qo‘shni hujayralar devordagi teshikchalar (plazmodesmalar) orqali bog‘lanadi. Sentriolalar esa yuksak o‘simliklarda yo‘q.', holat:{tur:'osimlik', organoid:'xloroplast'}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Organoidlarni toping', holat:{tur:'hayvon', kesim:true, organoid:null},
    topshiriqlar:[
      {shart:'Irsiy axborot saqlanadigan organoid — <b>yadroni</b> bosing.', hodisa:'kbg-hujayra', kod:"ev.nom==='yadro'", izoh:'To‘g‘ri — <b>yadro</b>. Undagi xromatin DNKdan iborat.'},
      {shart:'ATF hosil qiluvchi «energiya stansiyasi» — <b>mitoxondriyani</b> bosing.', hodisa:'kbg-hujayra', kod:"ev.nom==='mitoxondriya'", izoh:'To‘g‘ri — <b>mitoxondriya</b>. Ichki membranasi kristalar hosil qiladi.'},
      {shart:'Oqsillarni saralab, pufakchalarga «qadoqlaydigan» organoidni bosing.', hodisa:'kbg-hujayra', kod:"ev.nom==='golji'", izoh:'To‘g‘ri — <b>Golji apparati</b> (1898-yilda K. Golji tasvirlagan).'},
      {shart:'Endi <b>o‘simlik hujayrasiga</b> o‘ting.', hodisa:'kbg-hujayra-tur', kod:"ev.hujayra==='osimlik'", izoh:'O‘simlik hujayrasi ochildi — devor, markaziy vakuola va xloroplastlarni toping.'},
      {shart:'O‘simlik hujayrasiga shakl beruvchi sellyulozali <b>hujayra devorini</b> bosing.', hodisa:'kbg-hujayra', kod:"ev.nom==='devor'", izoh:'To‘g‘ri — <b>hujayra devori</b>. Hayvon hujayrasida u yo‘q.'},
      {shart:'Hujayra shirasi to‘plangan <b>markaziy vakuolani</b> bosing.', hodisa:'kbg-hujayra', kod:"ev.nom==='vakuola'", izoh:'To‘g‘ri — <b>vakuola</b>: hajmning 30–80 % i, turgor bosimini hosil qiladi.'}
    ]},
  test:[
    {s:'Hujayraning «energiya stansiyasi» deb qaysi organoid ataladi?', v:['Ribosoma','Mitoxondriya','Golji apparati','Lizosoma'], t:1, izoh:'<b>Mitoxondriya</b> — ATF hosil qiladi. Ribosoma oqsil yig‘adi, lizosoma hazm qiladi.'},
    {s:'Qaysi organoid faqat o‘simlik hujayrasiga xos?', v:['Mitoxondriya','Ribosoma','Xloroplast','Yadro'], t:2, izoh:'<b>Xloroplast</b> — fotosintez organoidi. Qolganlari ikkala hujayrada ham bor.'},
    {s:'Oqsil sintezi qayerda boradi?', v:['Ribosomalarda','Lizosomalarda','Vakuolada','Hujayra devorida'], t:0, izoh:'<b>Ribosomalarda</b> — ular sitoplazmada erkin yoki donador EPT yuzasida joylashadi.'},
    {s:'O‘simlik hujayrasi devori asosan qaysi moddadan tuzilgan?', v:['Glikogen','Sellyuloza','Xitin','Oqsil'], t:1, izoh:'<b>Sellyuloza</b>. Xitin — zamburug‘lar devori va hasharotlar qoplamida uchraydi.'},
    {s:'Yadrocha qanday vazifani bajaradi?', v:['ATF hosil qiladi','Ribosoma qismlarini yig‘adi','Fotosintez qiladi','Moddalarni hazm qiladi'], t:1, izoh:'<b>Ribosoma qismlarini yig‘adi</b> — rRNK shu yerda sintezlanadi.'},
    {s:'Hazm fermentlari bo‘lgan bir membranali organoid qaysi?', v:['Lizosoma','Mitoxondriya','Sentriola','Xloroplast'], t:0, izoh:'<b>Lizosoma</b> — ichida 60 dan ortiq ferment, muhiti kislotali (pH ≈ 4,5–5,0).'},
    {s:'Qaysi organoid ikki membranali EMAS?', v:['Mitoxondriya','Xloroplast','Golji apparati','Yadro'], t:2, izoh:'<b>Golji apparati</b> — bir membranali. Yadro, mitoxondriya va xloroplast ikki membranali.'},
    {s:'Yuzasida ribosomalar joylashgan EPT qanday ataladi?', v:['Silliq EPT','Donador (g‘adir-budur) EPT','Golji EPT','Yadro EPT'], t:1, izoh:'<b>Donador (g‘adir-budur) EPT</b> — oqsil sintezi va tashilishi; silliq EPT — yog‘ va uglevod sintezi.'},
    {s:'Sentriolalar qaysi jarayonda qatnashadi?', v:['Fotosintezda','Hujayra bo‘linishida (bo‘linish urchug‘i)','Nafas olishda','Oqsilni qadoqlashda'], t:1, izoh:'<b>Hujayra bo‘linishida (bo‘linish urchug‘i)</b> — hujayra markazi shu vazifani bajaradi; yuksak o‘simliklarda sentriola yo‘q.'},
    {s:'«Har bir hujayra — hujayradan» (Omnis cellula e cellula) qoidasini kim ilgari surgan?', v:['Robert Guk','Rudolf Virxov','Teodor Shvann','Robert Braun'], t:1, izoh:'<b>Rudolf Virxov</b> (1855). Guk 1665-yilda «hujayra» atamasini kiritgan, Braun 1831-yilda yadroni tasvirlagan.'},
    {s:'O‘simlik hujayrasida turgor bosimini asosan nima hosil qiladi?', v:['Markaziy vakuola','Ribosoma','Sentriola','Lizosoma'], t:0, izoh:'<b>Markaziy vakuola</b> — hujayra shirasi devorga bosim beradi; suv yetmasa o‘simlik so‘liydi.'},
    {tur:'3d', s:'O‘simlik hujayrasida <b>fotosintez boradigan organoidni</b> bosing.', hodisa:'kbg-hujayra', kalit:'nom', togri:['xloroplast'], v:['Xloroplast','boshqa organoid'], t:0, qatlamlar:{tur:'osimlik'},
     izoh:'<b>Xloroplast</b> — ikki membranali yashil plastida; ichida xlorofill, tilakoidlar va stroma bor.'}
  ],
  yordamchi:[
    {s:'Nega hayvon hujayrasida devor yo‘q?', j:'Hayvonlar harakatlanadi, hujayralari shaklini o‘zgartira olishi kerak (masalan, oq qon tanachalari). Tanani ichki yoki tashqi skelet tutib turadi. O‘simlik esa qimirlamaydi, uning shakli va mustahkamligini hujayra devorlari va turgor bosimi ta’minlaydi.', kalit:['devor','hayvon','nega']},
    {s:'Qizil qon tanachasida yadro bormi?', j:'Odam va sutemizuvchilarning yetilgan eritrotsitlarida yadro ham, mitoxondriya ham yo‘q — shu tufayli ular ko‘proq gemoglobin sig‘diradi va o‘zi tashiyotgan kislorodni sarflamaydi.', kalit:['eritrotsit','qon','yadro']},
    {s:'Modeldagi o‘lchamlar to‘g‘rimi?', j:'Yo‘q, model sxematik. Haqiqatda ribosomalar juda mayda (25–30 nm), yadro esa ≈ 6 µm — 200 martadan ko‘p katta. Organoidlar soni ham kamaytirilgan: bitta hujayrada millionlab ribosoma, yuzlab–minglab mitoxondriya bo‘lishi mumkin.', kalit:['olcham','model','haqiqiy','nisbat']}
  ],
  maqola:[
    {sarlavha:'Hujayraning kashf etilishi va hujayra nazariyasi', xatboshilar:[
      '1665-yilda ingliz olimi Robert Guk o‘zi yasagan mikroskopda po‘kak kesimini ko‘rib, uni asalari uyasiga o‘xshatgan va kataklarni «hujayra» (cell) deb atagan. Aslida u tirik hujayralarni emas, ularning bo‘sh devorlarini ko‘rgan. Golland ustasi Antoni van Levenguk 1670-yillardan boshlab o‘z linzalari bilan bir hujayrali organizmlar, qon tanachalari va boshqa tirik hujayralarni kuzatgan.',
      '1831-yilda shotland botanigi Robert Braun o‘simlik hujayralarida yadroni tasvirlagan. 1838–1839-yillarda nemis olimlari botanik Mattias Shleyden va zoolog Teodor Shvann barcha o‘simlik va hayvonlar hujayralardan tuzilgan degan xulosaga kelgan (manbalarda Shleyden ishi 1838, Shvann ishi 1839 deb beriladi). 1855-yilda Rudolf Virxov «Omnis cellula e cellula» — har bir hujayra faqat hujayradan paydo bo‘ladi, degan qoidani qo‘shgan.',
      'Hozirgi hujayra nazariyasining asosiy qoidalari: barcha tirik organizmlar hujayralardan tuzilgan; hujayra — tiriklikning tuzilish va vazifa birligi; hujayralar bo‘linish orqali ko‘payadi; hujayralarda irsiy axborot DNKda saqlanadi.'
    ]},
    {sarlavha:'Hujayraning asosiy qismlari', xatboshilar:[
      'Hujayra membranasi (plazmolemma) — ikki qavat lipid molekulalari va ularga botgan oqsillardan iborat. U hujayrani tashqi muhitdan ajratadi va tanlab o‘tkazadi: suv, kislorod oson o‘tadi, ionlar va yirik molekulalar maxsus oqsillar yordamida o‘tkaziladi.',
      'Sitoplazma — membrana ichidagi yarim suyuq muhit. Unda organoidlar, zaxira moddalar tomchilari joylashgan va hujayra skeleti — oqsil iplari tarmog‘i bor. Sitoplazma doimo harakatda bo‘ladi (o‘simlik hujayralarida xloroplastlarning aylanib yurishini mikroskopda ko‘rish mumkin).',
      'Yadro — eng yirik organoid (odam hujayralarida diametri taxminan 6 µm). Uni qo‘sh membranali yadro qobig‘i o‘rab turadi; qobiqdagi minglab poralar orqali yadro va sitoplazma moddalar almashadi. Yadro ichida xromatin (DNK va oqsillar) va bir yoki bir nechta yadrocha bor. Bo‘linish vaqtida xromatin zichlashib, xromosomalarga aylanadi.'
    ]},
    {sarlavha:'Organoidlar: kim nima ishlaydi?', xatboshilar:[
      'Ribosomalar — membranasiz mayda donachalar (eukariotlarda 25–30 nm, 80S). Ular DNK dan kelgan axborot bo‘yicha aminokislotalardan oqsil yig‘adi. 1950-yillarda Jorj Palade elektron mikroskopda kashf etgan.',
      'Endoplazmatik to‘r (EPT) — sitoplazma bo‘ylab tarqalgan kanal va xaltachalar tizimi. Donador EPT yuzasida ribosomalar joylashgan: u oqsillarni sintezlab, tashib beradi. Silliq EPT yog‘lar, ba’zi uglevodlar sintezida va zararli moddalarni zararsizlantirishda qatnashadi.',
      'Golji apparati — yassi xaltachalar taxlami (1898-yilda italyan olimi Kamillo Golji tasvirlagan). EPT dan kelgan moddalar shu yerda o‘zgartiriladi, saralanadi va pufakchalarga joylanib, hujayradan chiqariladi. Golji apparatida lizosomalar ham hosil bo‘ladi.',
      'Lizosomalar — hazm fermentlari bor pufakchalar (60 dan ortiq ferment, ichki muhiti kislotali, pH ≈ 4,5–5,0). Ular hujayraga kirgan zarrachalarni va eskirgan organoidlarni parchalaydi. Lizosomani 1950-yillarda Kristian de Dyuv kashf etgan (Nobel mukofoti, 1974).',
      'Mitoxondriyalar — ikki membranali organoidlar, ichki membranasi kristalar hosil qiladi. Ularda kislorod ishtirokida nafas olish boradi va ATF hosil bo‘ladi. Mitoxondriyaning o‘z DNKsi bor (odamda 16 569 juft nukleotid, 37 gen) va u asosan ona orqali o‘tadi.',
      'Hujayra markazi (sentriolalar) — hayvon hujayrasida ikki silindrsimon tanacha; hujayra bo‘linishida bo‘linish urchug‘ini hosil qilishda qatnashadi.'
    ]},
    {sarlavha:'O‘simlik hujayrasining xususiyatlari va ko‘p uchraydigan xatolar', xatboshilar:[
      'O‘simlik hujayrasini membrana ustidan sellyulozali hujayra devori o‘rab turadi. Devor shaklni saqlaydi, himoya qiladi va suv ko‘p kirganda hujayraning yorilishiga yo‘l qo‘ymaydi. Qo‘shni hujayralar devordagi ingichka kanalchalar — plazmodesmalar orqali tutashadi.',
      'Yetilgan o‘simlik hujayrasida odatda bitta katta markaziy vakuola bo‘ladi. U hajmning 30 % dan ko‘pini, ba’zi hujayralarda 80 % gacha qismini egallaydi. Vakuola membranasi — tonoplast, ichidagi suyuqlik — hujayra shirasi (suv, tuzlar, qand, pigmentlar). Vakuola devorga ichkaridan bosim — turgor — beradi; suv yetmasa turgor pasayadi va o‘simlik so‘liydi.',
      'Plastidalar: yashil xloroplastlar (fotosintez), rangli xromoplastlar (gul va mevalarning sariq, qizil rangi) va rangsiz leykoplastlar (kraxmal zaxirasi, masalan kartoshkada).',
      'Ko‘p uchraydigan xatolar: «o‘simlik hujayrasida mitoxondriya yo‘q» — noto‘g‘ri, o‘simlik ham nafas oladi va mitoxondriyasi bor; «hujayra devori va membrana — bir narsa» — noto‘g‘ri, devor membrananing tashqarisida joylashgan; «barcha o‘simlik hujayralarida xloroplast bor» — noto‘g‘ri, masalan ildiz hujayralarida xloroplast bo‘lmaydi.'
    ]}
  ],
  formulalar:[
    ['1 mm = 1 000 µm; 1 µm = 1 000 nm','Hujayra o‘lchov birliklari'],
    ['Kattalashtirish = okulyar × obyektiv (masalan, 10 × 40 = 400 marta)','Yorug‘lik mikroskopida umumiy kattalashtirish'],
    ['Haqiqiy o‘lcham = rasmdagi o‘lcham / kattalashtirish','Masalan: 12 mm / 400 = 0,03 mm = 30 µm'],
    ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energiya (ATF)','Mitoxondriyada boradigan nafas olishning umumiy tenglamasi']
  ],
  qiziqarli:[
    'Robert Guk 1665-yilda «Micrographia» kitobida po‘kak hujayralarini tasvirlagan — u ko‘rgan narsa aslida o‘lik hujayralarning bo‘sh devorlari edi.',
    'Jigar hujayrasida 2000 dan ortiq mitoxondriya bo‘lishi mumkin, yetilgan eritrotsitda esa birorta ham yo‘q.',
    'Odam yadrosi qobig‘ida 3000–4000 ta pora bor.',
    'Mitoxondriya DNKsi asosan onadan o‘tadi — shu sababli olimlar uni ona tomonidagi ajdodlarni o‘rganishda ishlatadi.',
    'O‘simlik hujayrasidagi markaziy vakuola ba’zan hujayra hajmining 80 % gacha qismini egallaydi.'
  ],
  lugat:[
    ['Hujayra','Tiriklikning eng kichik tuzilish va vazifa birligi.'],
    ['Organoid','Hujayradagi muayyan vazifani bajaruvchi doimiy tuzilma.'],
    ['Eukariot','Hujayrasida shakllangan yadrosi bor organizm.'],
    ['Prokariot','Hujayrasida shakllangan yadro yo‘q organizm (bakteriyalar).'],
    ['Membrana (plazmolemma)','Hujayrani o‘rab turuvchi tanlab o‘tkazuvchi parda.'],
    ['Sitoplazma','Membrana ichidagi yarim suyuq muhit.'],
    ['Xromatin','Yadrodagi DNK va oqsillar majmuasi.'],
    ['EPT','Endoplazmatik to‘r — kanal va xaltachalar tizimi.'],
    ['ATF','Hujayraning universal energiya tashuvchi molekulasi.'],
    ['Turgor','Hujayra shirasining devorga beradigan bosimi.'],
    ['Plastida','O‘simlik organoidlari: xloroplast, xromoplast, leykoplast.'],
    ['Endosimbioz','Mitoxondriya va xloroplast qadimgi bakteriyalardan kelib chiqqan degan nazariya.']
  ],
  manba:HD+'; '+HM+'. Sanalar: Guk 1665, Braun 1831, Shleyden 1838 / Shvann 1839 (Wikipedia umumlashtirib 1839 deydi), Virxov 1855, Golji 1898, de Dyuv — Nobel 1974. Yadro ≈ 6 µm, ribosoma 25–30 nm, mitoxondriya 0,75–3 µm², vakuola 30–80 % — Wikipedia tegishli maqolalari. Model sxematik (o‘lcham nisbatlari aniq emas).',
  ishlanma:{
    sinf:'9-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (3D model bilan)', usul:'3D kesim model, taqqoslash jadvali, «organoid — vazifa» o‘yini, mikroskop bilan ishlash',
    maqsad:{talimiy:'Eukariot hujayraning tuzilishi, asosiy organoidlar va ularning vazifalari, hayvon va o‘simlik hujayralarining farqlarini o‘rganish.',
      tarbiyaviy:'Tirik tabiatning birligi va murakkabligiga hurmat, ilmiy dunyoqarashni tarbiyalash.',
      rivojlantiruvchi:'Taqqoslash, tuzilish va vazifani bog‘lash, mikroskop bilan ishlash ko‘nikmasini rivojlantirish.'},
    natijalar:['Hujayraning 3 asosiy qismini aytadi','10 ta organoidni modelda topadi va vazifasini tushuntiradi','Hayvon va o‘simlik hujayrasini kamida 5 belgi bo‘yicha taqqoslaydi','Organoidlarni membranasi bo‘yicha guruhlaydi','Hujayra nazariyasi qoidalarini aytadi'],
    jihozlar:['MAKON sahnasi «Hujayra tuzilishi»','Proyektor yoki interaktiv doska','Mikroskop, piyoz po‘sti preparati, yod eritmasi (o‘qituvchi nazoratida)','Tarqatma: taqqoslash jadvali','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Agar hujayra zavod bo‘lsa — uning direktori, elektr stansiyasi va omborxonasi kim?» savoli.','Taxmin aytadi.'],
      ['8–22','<b>Organoidlar.</b> MAKON da kesilgan hujayrani aylantirib, organoidlarni ketma-ket bosadi: yadro → ribosoma → EPT → Golji → lizosoma → mitoxondriya.','«Organoid — vazifa» jadvalini to‘ldiradi.'],
      ['22–30','<b>O‘simlik hujayrasi.</b> Turni almashtiradi: devor, vakuola, xloroplast; sentriola yo‘qligi.','Taqqoslash jadvalini to‘ldiradi.'],
      ['30–37','<b>Amaliy ish.</b> Piyoz po‘sti preparatini mikroskopda ko‘radi (devor, yadro, vakuola).','Preparat tayyorlaydi, rasm chizadi.'],
      ['37–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Organoid','Hujayradagi doimiy tuzilma.'],['Mitoxondriya','ATF hosil qiluvchi organoid.'],['Ribosoma','Oqsil sintezi joyi.'],['Vakuola','Hujayra shirasi to‘plangan bo‘shliq.'],['Turgor','Hujayra ichki bosimi.']],
    savollar:[['Hujayraning 3 asosiy qismi?','Membrana, sitoplazma, yadro'],['Faqat o‘simlikka xos 3 tuzilma?','Devor, markaziy vakuola, xloroplast'],['Ikki membranali organoidlar?','Yadro, mitoxondriya, xloroplast'],['Oqsil qayerda sintezlanadi?','Ribosomalarda'],['Virxov qoidasi?','Har bir hujayra — hujayradan (1855)']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) hayvon va o‘simlik hujayrasi rasmini chizib, organoidlarni belgilash; (2) «Hujayra — shahar» o‘xshatishi bo‘yicha 8 ta organoidga shahar obyektini moslash (masalan, mitoxondriya — elektr stansiya); (3) mikroskopda 400 marta kattalashtirilgan hujayra rasmda 12 mm bo‘lsa, haqiqiy o‘lchamini hisoblash (javob: 30 µm).',
    manba:HD+'; '+HM
  }
};

const W = 'Wikipedia (inglizcha)';
DT.kbg_hujayra = {
  membrana:{nom:'Hujayra membranasi (plazmolemma)', sarlavha2:'Barcha hujayralarda', jadval:[['Tuzilishi','ikki qavat lipid + oqsillar'],['Xususiyati','tanlab o‘tkazuvchanlik'],['Qalinligi','taxminan 7–10 nm (taxminiy)']], matn:'Membrana hujayrani tashqi muhitdan ajratadi, moddalar kirishi va chiqishini boshqaradi, qo‘shni hujayralar bilan aloqani ta’minlaydi.', manba:W+' «Cell membrane»'},
  sitoplazma:{nom:'Sitoplazma', sarlavha2:'Hujayraning ichki muhiti', jadval:[['Tarkibi','suv (asosiy qismi), oqsillar, tuzlar, organoidlar'],['Xususiyati','doimiy harakatda']], matn:'Sitoplazmada ko‘p kimyoviy reaksiyalar boradi, hujayra skeleti organoidlarni joyida ushlab turadi.', manba:W+' «Cytoplasm»'},
  yadro:{nom:'Yadro', sarlavha2:'Ikki membranali · boshqaruv markazi', jadval:[['Diametri','≈ 6 µm (odam hujayrasida)'],['Ichida','xromatin (DNK), yadrocha, yadro shirasi'],['Qobig‘ida','3000–4000 pora (sutemizuvchilarda)'],['Tasvirlagan','Robert Braun, 1831']], matn:'Yadro irsiy axborotni saqlaydi va hujayra faoliyatini boshqaradi. Bo‘linishda xromatin xromosomalarga aylanadi.', manba:W+' «Cell nucleus»'},
  yadrocha:{nom:'Yadrocha', sarlavha2:'Yadro ichida · membranasiz', jadval:[['Vazifasi','rRNK sintezi va ribosoma qismlarini yig‘ish'],['Soni','bir yoki bir nechta']], matn:'Oqsilni ko‘p sintezlaydigan hujayralarda yadrocha yirikroq bo‘ladi.', manba:W+' «Nucleolus», «Cell nucleus»'},
  mitoxondriya:{nom:'Mitoxondriya', sarlavha2:'Ikki membranali · energiya stansiyasi', jadval:[['Vazifasi','nafas olish, ATF hosil qilish'],['Ichki membrana','kristalar (burmalar)'],['O‘z DNKsi','odamda 16 569 juft nukleotid, 37 gen'],['Soni','jigar hujayrasida 2000 dan ortiq; eritrotsitda yo‘q']], matn:'Mitoxondriya qadimgi aerob bakteriyadan kelib chiqqan deb hisoblanadi. Uning DNKsi asosan onadan o‘tadi.', manba:W+' «Mitochondrion»'},
  ribosoma:{nom:'Ribosoma', sarlavha2:'Membranasiz · oqsil fabrikasi', jadval:[['O‘lchami','25–30 nm (eukariotlarda, 80S)'],['Qismlari','katta (60S) va kichik (40S) bo‘lakcha'],['Joyi','sitoplazmada erkin yoki donador EPT da'],['Kashf etgan','Jorj Palade, 1950-yillar']], matn:'Ribosoma iRNKdagi axborot bo‘yicha aminokislotalarni zanjirga bog‘lab, oqsil yig‘adi. Bakteriyalarda ribosoma kichikroq (70S, ≈ 20 nm).', manba:W+' «Ribosome»'},
  ept_donador:{nom:'Donador (g‘adir-budur) EPT', sarlavha2:'Bir membranali · oqsil yo‘li', jadval:[['Yuzasida','ribosomalar'],['Vazifasi','oqsil sintezi va tashilishi'],['Bog‘liqligi','yadro qobig‘i bilan tutashgan']], matn:'Tayyor oqsillar EPT kanallari bo‘ylab Golji apparatiga jo‘natiladi.', manba:W+' «Endoplasmic reticulum»'},
  ept_silliq:{nom:'Silliq EPT', sarlavha2:'Bir membranali · yog‘ sintezi', jadval:[['Yuzasida','ribosoma yo‘q'],['Vazifasi','lipid va ba’zi uglevodlar sintezi, zararli moddalarni zararsizlantirish']], matn:'Jigar hujayralarida silliq EPT ko‘p — u dori va zaharlarni zararsizlantirishda qatnashadi.', manba:W+' «Endoplasmic reticulum»'},
  golji:{nom:'Golji apparati', sarlavha2:'Bir membranali · «qadoqlash sexi»', jadval:[['Tuzilishi','yassi xaltachalar taxlami va pufakchalar'],['Vazifasi','moddalarni o‘zgartirish, saralash, chiqarish; lizosoma hosil qilish'],['Tasvirlagan','Kamillo Golji, 1898']], matn:'Bez hujayralarida (masalan, fermentlar chiqaradigan) Golji apparati ayniqsa rivojlangan.', manba:W+' «Golgi apparatus»'},
  lizosoma:{nom:'Lizosoma', sarlavha2:'Bir membranali · hazm pufakchasi', jadval:[['Ichida','60 dan ortiq hazm fermenti'],['Muhit','kislotali, pH ≈ 4,5–5,0'],['Kashf etgan','Kristian de Dyuv (1950-yillar; Nobel 1974)']], matn:'Lizosoma hujayraga kirgan zarrachalarni va eskirgan organoidlarni parchalaydi.', manba:W+' «Lysosome»'},
  sentriola:{nom:'Sentriolalar (hujayra markazi)', sarlavha2:'Membranasiz · faqat hayvon hujayrasida', jadval:[['Tuzilishi','bir-biriga tik ikki silindr (mikronaychalar)'],['Vazifasi','bo‘linish urchug‘i hosil bo‘lishida qatnashadi'],['O‘simlikda','yuksak o‘simliklarda yo‘q']], matn:'Sentriolalar kiprik va xivchinlar asosi (bazal tanacha) sifatida ham xizmat qiladi.', manba:W+' «Centriole»'},
  devor:{nom:'Hujayra devori', sarlavha2:'Faqat o‘simlik (va zamburug‘, bakteriya) hujayrasida', jadval:[['O‘simlikda tarkibi','asosan sellyuloza'],['Vazifasi','shakl, mustahkamlik, himoya'],['Aloqa','plazmodesmalar orqali']], matn:'Devor membrananing tashqarisida joylashadi. Zamburug‘larda devor xitindan, bakteriyalarda — boshqa moddalardan tuzilgan.', manba:W+' «Cell wall»'},
  vakuola:{nom:'Markaziy vakuola', sarlavha2:'Bir membranali (tonoplast) · o‘simlik hujayrasida', jadval:[['Hajmi','hujayraning 30 % dan ko‘pi, ba’zan 80 % gacha'],['Ichida','hujayra shirasi: suv, tuzlar, qand, pigmentlar'],['Vazifasi','turgor bosimi, zaxira, chiqindilar']], matn:'Qizil lavlagi va binafsha gul rangini ko‘pincha vakuoladagi pigmentlar (antotsianlar) beradi.', manba:W+' «Vacuole»'},
  xloroplast:{nom:'Xloroplast', sarlavha2:'Ikki membranali · faqat o‘simlik hujayrasida', jadval:[['Vazifasi','fotosintez'],['Ichida','tilakoidlar (granalar), stroma, DNK, ribosomalar'],['Soni','hujayrada bittadan 100 tagacha (turga qarab)']], matn:'Xloroplast sianobakteriyadan kelib chiqqan deb hisoblanadi. U faqat o‘simlikning yashil qismlarida bo‘ladi.', manba:W+' «Chloroplast»'}
};
})();


/* ===== bio-dnk ===== */
(function(){
const NM = 'Wikipedia (inglizcha): «DNA» (en.wikipedia.org/wiki/DNA), «Nucleic acid double helix», «Photo 51», «Chargaff’s rules», «DNA replication», «Meselson–Stahl experiment», «Human genome», «Friedrich Miescher»';
const ND = '9-sinf «Biologiya (Sitologiya va genetika asoslari)» va 10-sinf «Biologiya» darsliklari (O‘zbekiston, amaldagi nashrlar) — «Nuklein kislotalar», «DNK replikatsiyasi», «Irsiyat» mavzulari; Watson J. D., Crick F. H. C. «A Structure for Deoxyribose Nucleic Acid», Nature 171, 737–738 (1953-yil 25-aprel); NHGRI (genome.gov)';

bogla('biologiya', 'DNK tuzilishi va irsiyat', 'bio-dnk', 'Qo‘sh spiral, komplementarlik, replikatsiya — 3D animatsiyada');

D['bio-dnk'] = {
  fan:'biologiya', qisqaNom:'DNK', nom:'DNK tuzilishi va irsiyat',
  qisqa:'9–10-sinf · Sitologiya va genetika asoslari · qo‘sh spiral',
  sinf:'9–10-sinf',
  sahna:'kbg_dnk',
  kor:{
    sarlavha:'Hayot «yo‘riqnomasi» — DNK qo‘sh spirali',
    matn:'DNK (dezoksiribonuklein kislota) — barcha hujayrali organizmlarda irsiy axborotni saqlovchi va avloddan avlodga o‘tkazuvchi molekula. U ikki zanjirdan iborat bo‘lib, ular o‘ng tomonga buralgan qo‘sh spiral hosil qiladi. Zanjirlar azotli asoslar orqali bog‘lanadi: adenin (A) doim timin (T) bilan, guanin (G) doim sitozin (C) bilan juftlashadi. Sahnada spiralni aylantiring, asoslarni bosing, bitta nukleotidni kattalashtirib ko‘ring va replikatsiya — DNK nusxalanishini kuzating. Model sxematik: atomlar ko‘rsatilmagan.',
    punktlar:[
      '<b>Monomeri:</b> nukleotid = fosfat + dezoksiriboza (qand) + azotli asos (A, T, G yoki C)',
      '<b>Komplementarlik:</b> A = T (2 ta vodorod bog‘), G ≡ C (3 ta vodorod bog‘)',
      '<b>O‘lchami (B-shakl):</b> diametri ≈ 2 nm; bir o‘ramda ≈ 10 juft (aniqroq 10,5), o‘ram qadami ≈ 3,4 nm (aniqroq 3,32 nm)',
      '<b>Kashfiyot:</b> Uotson va Krik modeli — «Nature», 1953-yil 25-aprel; R. Franklin va R. Gosling rentgen surati «Photo 51» — 1952-yil may'
    ]
  },
  bolimlar:[
    {sarlavha:'To‘rt azotli asos', jadval:[
      ['Adenin (A)','purin (ikki halqali); juftlashadi — T bilan, 2 vodorod bog‘'],
      ['Timin (T)','pirimidin (bir halqali); juftlashadi — A bilan; RNKda o‘rniga urasil (U)'],
      ['Guanin (G)','purin; juftlashadi — C bilan, 3 vodorod bog‘'],
      ['Sitozin (C)','pirimidin; juftlashadi — G bilan']
    ], matn:'Har juftda bitta purin va bitta pirimidin bor — shuning uchun spiral diametri butun uzunlik bo‘ylab bir xil.'},
    {sarlavha:'DNK va RNK', jadval:[
      ['Qand','DNK — dezoksiriboza; RNK — riboza'],
      ['Asoslar','DNK — A, T, G, C; RNK — A, U, G, C'],
      ['Zanjirlar','DNK — odatda ikki zanjirli; RNK — odatda bir zanjirli'],
      ['Vazifasi','DNK — axborotni saqlash; RNK — axborotni oqsil sinteziga yetkazish (iRNK, tRNK, rRNK)']
    ]},
    {sarlavha:'Odam genomi: raqamlarda', jadval:[
      ['Juft nukleotidlar (gaploid to‘plam)','taxminan 3,1 milliard'],
      ['Xromosomalar (somatik hujayrada)','46 ta (23 juft)'],
      ['Oqsil kodlovchi genlar','taxminan 19 000–20 000'],
      ['Oqsil kodlovchi qism','genomning atigi 1–2 % i'],
      ['Mitoxondriya DNKsi','16 569 juft nukleotid, 37 gen']
    ], matn:'«Inson genomi» loyihasi 2003-yilda asosan yakunlangan; to‘liq («teshiksiz») ketma-ketlik T2T konsorsiumi tomonidan 2022-yilda e’lon qilingan.'}
  ],
  bosqichlar:[
    {sarlavha:'Qo‘sh spiral', matn:'DNK ikki zanjirdan iborat, ular bir-biri atrofida o‘ng tomonga buralgan — bu B-shakl deyiladi. Spiral diametri taxminan 2 nm. Tashqi tomonda fosfat–qand «skeleti», ichkarida — narvon pog‘onalari kabi azotli asoslar juftlari.', holat:{rejim:'spiral', belgi:false}},
    {sarlavha:'Komplementar juftlar', matn:'Harflarni yoqing. A har doim T bilan, G har doim C bilan juftlashadi. A–T juftida 2 ta, G–C juftida 3 ta vodorod bog‘ bor — shuning uchun G–C ga boy qismlar mustahkamroq. Bu qoida komplementarlik deyiladi.', holat:{rejim:'spiral', belgi:true}},
    {sarlavha:'Nukleotid — DNK g‘ishtchasi', matn:'Bitta nukleotid uch qismdan tuzilgan: fosfat qoldig‘i, besh uglerodli qand — dezoksiriboza va azotli asos. Qo‘shni nukleotidlar fosfat va qand orqali zanjirga bog‘lanadi, asos esa ichkariga qaraydi.', holat:{rejim:'nukleotid'}},
    {sarlavha:'Zanjirlarning yo‘nalishi', matn:'Ikki zanjir qarama-qarshi yo‘nalgan (antiparallel): biri 5′→3′, ikkinchisi 3′→5′. Sahnadagi yuqori zanjir: 5′-ATGCGTACCTGAGCATTGCA-3′. Komplementar zanjirni o‘zingiz yozing: 3′-TACGCATGGACTCGTAACGT-5′.', holat:{rejim:'spiral', belgi:true}},
    {sarlavha:'Replikatsiya boshlanadi', matn:'Hujayra bo‘linishidan oldin DNK nusxalanadi. Helikaza fermenti vodorod bog‘larni uzib, zanjirlarni «zamok» kabi ochadi — replikatsiya vilkasi hosil bo‘ladi.', holat:{rejim:'replikatsiya', p:0.25}},
    {sarlavha:'DNK polimeraza ishlaydi', matn:'Har bir eski (ona) zanjir andoza bo‘ladi: DNK polimeraza unga komplementar erkin nukleotidlarni qo‘shib, yangi zanjir quradi (faqat 5′→3′ yo‘nalishda). Xatolar tekshirib tuzatiladi — natijada taxminan milliard nukleotidga bittadan kam xato qoladi.', holat:{rejim:'replikatsiya', p:0.6}},
    {sarlavha:'Ikki bir xil molekula', matn:'Natijada ikki bir xil DNK hosil bo‘ladi, har birida bitta eski va bitta yangi zanjir bor — replikatsiya yarim konservativ. Buni 1958-yilda M. Meselson va F. Stal og‘ir azot izotopi (¹⁵N) bilan tajribada isbotlagan. Shu tufayli irsiy axborot bo‘linishda ikkala hujayraga aniq o‘tadi.', holat:{rejim:'replikatsiya', p:1}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Komplementarlik va replikatsiya', holat:{rejim:'spiral', belgi:true},
    topshiriqlar:[
      {shart:'<b>Adeninga (A)</b> komplementar asosni bosing.', hodisa:'kbg-dnk', kod:"ev.nom==='T'", izoh:'To‘g‘ri — <b>timin (T)</b>: A va T orasida 2 ta vodorod bog‘.'},
      {shart:'3 ta vodorod bog‘ bilan bog‘lanadigan juftdan <b>istalgan asosni</b> bosing.', hodisa:'kbg-dnk', kod:"ev.nom==='G'||ev.nom==='C'", izoh:'To‘g‘ri — <b>G–C juft</b> 3 ta vodorod bog‘ bilan bog‘lanadi, shuning uchun mustahkamroq.'},
      {shart:'Zanjir «skeleti»dagi <b>fosfat qoldig‘ini</b> bosing.', hodisa:'kbg-dnk', kod:"ev.nom==='fosfat'", izoh:'To‘g‘ri — <b>fosfat</b> qo‘shni nukleotidlarning qandlarini bog‘laydi.'},
      {shart:'Replikatsiya rejimini oching va jarayonni <b>oxirigacha</b> (100 %) yetkazing.', hodisa:'kbg-dnk-holat', kod:"ev.rejim==='replikatsiya'&&ev.p>=0.99", izoh:'Ikki bir xil DNK molekulasi hosil bo‘ldi — har birida bitta eski va bitta yangi zanjir.'},
      {shart:'Qo‘sh spiralni ochuvchi fermentni — <b>helikazani</b> bosing.', hodisa:'kbg-dnk', kod:"ev.nom==='helikaza'", izoh:'To‘g‘ri — <b>helikaza</b> juftlar orasidagi vodorod bog‘larni uzadi.'},
      {shart:'Endi <b>yangi sintezlangan zanjirni</b> bosing.', hodisa:'kbg-dnk', kod:"ev.nom==='yangi_zanjir'", izoh:'To‘g‘ri — <b>yangi zanjir</b> ona zanjirga komplementar qurilgan.'}
    ]},
  test:[
    {s:'DNK monomeri nima?', v:['Aminokislota','Nukleotid','Glyukoza','Yog‘ kislota'], t:1, izoh:'<b>Nukleotid</b> — fosfat, dezoksiriboza va azotli asosdan tuzilgan. Aminokislota — oqsil monomeri.'},
    {s:'DNKda adenin qaysi asos bilan juftlashadi?', v:['Guanin','Sitozin','Timin','Urasil'], t:2, izoh:'<b>Timin</b> bilan (2 ta vodorod bog‘). Urasil faqat RNKda uchraydi.'},
    {s:'G–C juftida nechta vodorod bog‘ bor?', v:['1','2','3','4'], t:2, izoh:'<b>3</b> ta; A–T juftida esa 2 ta.'},
    {s:'DNK tarkibidagi qand qaysi?', v:['Riboza','Dezoksiriboza','Glyukoza','Saxaroza'], t:1, izoh:'<b>Dezoksiriboza</b> (besh uglerodli). RNKda — riboza.'},
    {s:'DNK qo‘sh spirali modelini 1953-yilda kim e’lon qilgan?', v:['Mendel','Uotson va Krik','Meselson va Stal','Miesher'], t:1, izoh:'<b>Uotson va Krik</b> — «Nature», 1953-yil 25-aprel. Ular R. Franklin va R. Gosling olgan rentgen suratiga («Photo 51», 1952) tayangan.'},
    {s:'Bir zanjir 5′-ATGC-3′ bo‘lsa, komplementar zanjir qanday?', v:['3′-TACG-5′','3′-ATGC-5′','3′-UACG-5′','3′-GCAT-5′'], t:0, izoh:'<b>3′-TACG-5′</b>: A→T, T→A, G→C, C→G; zanjirlar antiparallel. U (urasil) DNKda bo‘lmaydi.'},
    {s:'DNKda adenin 30 % bo‘lsa, guanin necha foiz?', v:['30 %','20 %','40 %','70 %'], t:1, izoh:'<b>20 %</b>: A = T = 30 %, demak G + C = 40 %, G = C = 20 % (Chargaff qoidasi).'},
    {s:'Qo‘sh spiralni ochib, vodorod bog‘larni uzadigan ferment qaysi?', v:['DNK polimeraza','Helikaza','Ligaza','Amilaza'], t:1, izoh:'<b>Helikaza</b>. DNK polimeraza yangi zanjir quradi, ligaza bo‘laklarni ulaydi, amilaza esa kraxmalni parchalaydi.'},
    {s:'Replikatsiya nega «yarim konservativ» deyiladi?', v:['Yarmi nusxalanmaydi','Har yangi molekulada bitta eski va bitta yangi zanjir bo‘ladi','Faqat bitta zanjir nusxalanadi','Yangi molekulalar ikki barobar kichik'], t:1, izoh:'<b>Har yangi molekulada bitta eski va bitta yangi zanjir bo‘ladi</b> — Meselson va Stal tajribasi (1958).'},
    {s:'Odam somatik hujayrasida nechta xromosoma bor?', v:['23','44','46','48'], t:2, izoh:'<b>46</b> ta (23 juft); jinsiy hujayralarda — 23 ta.'},
    {s:'Odam gaploid genomida taxminan nechta juft nukleotid bor?', v:['3,1 million','3,1 milliard','31 milliard','310 ming'], t:1, izoh:'<b>3,1 milliard</b> atrofida (GRCh38 ma’lumotnoma genomi bo‘yicha).'},
    {s:'B-shakl DNK spiralining diametri taxminan qancha?', v:['2 nm','20 nm','2 µm','0,2 mm'], t:0, izoh:'<b>2 nm</b> atrofida (aniqroq ≈ 2,37 nm). Uni faqat elektron mikroskop yoki rentgen tahlili bilan o‘rganish mumkin.'},
    {tur:'3d', s:'Spiralda <b>sitozinga (C) komplementar</b> asosni bosing.', hodisa:'kbg-dnk', kalit:'nom', togri:['G'], v:['Guanin (G)','boshqa qism'], t:0,
     izoh:'<b>Guanin (G)</b> — sitozin bilan 3 ta vodorod bog‘ orqali juftlashadi.'}
  ],
  yordamchi:[
    {s:'DNK qancha uzun?', j:'Bitta odam hujayrasidagi barcha DNK molekulalarini cho‘zib ulasak, taxminan 2 metr chiqadi (taxminiy baho). U diametri ≈ 6 µm bo‘lgan yadroga oqsillar (gistonlar) atrofiga o‘ralib, zichlashgan holda joylashadi.', kalit:['uzun','metr','uzunlik']},
    {s:'Gen nima?', j:'Gen — DNKning muayyan oqsil yoki RNK tuzilishi haqidagi axborotni saqlovchi bo‘lagi. Odamda oqsil kodlovchi genlar taxminan 19–20 ming; ular genomning atigi 1–2 % ini tashkil qiladi, qolgan qismi boshqaruv va boshqa vazifalarga ega yoki vazifasi hali to‘liq o‘rganilmagan.', kalit:['gen','nima']},
    {s:'Nega 10 va 10,5, 3,4 va 3,32 — ikki xil raqam?', j:'Maktab darsliklarida Uotson–Krik modelining yaxlitlangan qiymatlari beriladi: bir o‘ramda 10 juft, qadami 3,4 nm. Keyingi aniq o‘lchovlar (eritmadagi B-DNK) bo‘yicha bir o‘ramda taxminan 10,5 juft, qadami ≈ 3,32 nm. Ikkalasi ham to‘g‘ri — biri yaxlitlangan, biri aniqroq.', kalit:['10,5','3,4','farq','raqam']}
  ],
  maqola:[
    {sarlavha:'DNK qanday kashf etilgan?', xatboshilar:[
      '1869-yilda shveytsariyalik olim Fridrix Misher oq qon tanachalari yadrosidan fosforga boy yangi modda ajratib olib, uni «nuklein» deb atagan (maqolasi 1871-yilda chop etilgan). Bu DNKning birinchi ajratib olinishi edi, lekin uning irsiyatdagi o‘rni hali ma’lum emasdi.',
      '1940-yillar oxiri — 1950-yillar boshida Ervin Chargaff turli organizmlar DNKsida adenin miqdori timinga, guanin miqdori esa sitozinga teng ekanini aniqlagan (Chargaff qoidasi). Masalan, odam DNKsida taxminan A 29,3 %, T 30,0 %, G 20,7 %, C 20,0 %.',
      '1952-yil may oyida King’s kolleji (London) da Rozalind Franklin rahbarligida Reymond Gosling DNK tolalarining rentgen suratini oldi — mashhur «Photo 51». Undagi «X» shaklidagi naqsh molekulaning spiral ekanini ko‘rsatgan.',
      '1953-yil 25-aprelda Jeyms Uotson va Frensis Krik «Nature» jurnalida DNK qo‘sh spirali modelini e’lon qildi; shu sonda Uilkins va Franklin guruhlarining maqolalari ham chiqqan. 1962-yilda Uotson, Krik va Uilkins Nobel mukofotini olgan; Franklin 1958-yilda vafot etgani uchun mukofotga kiritilmagan (Nobel mukofoti vafotidan keyin berilmaydi).'
    ]},
    {sarlavha:'Qo‘sh spiral tuzilishi', xatboshilar:[
      'DNK — polimer: uning monomeri nukleotid. Har bir nukleotid fosfat qoldig‘i, dezoksiriboza qandi va to‘rt azotli asosdan biridan tuzilgan: adenin (A), timin (T), guanin (G), sitozin (C). Nukleotidlar bir-birining qandi va fosfati orqali bog‘lanib, uzun zanjir hosil qiladi.',
      'Ikki zanjir bir-biriga qarama-qarshi yo‘nalgan (antiparallel) va o‘ng tomonga buralgan. Tashqi tomonda fosfat–qand skeleti, ichkarida asoslar juftlari joylashadi. Juftlar vodorod bog‘lar bilan ushlanadi: A–T orasida 2 ta, G–C orasida 3 ta.',
      'Hujayralardagi asosiy B-shakl DNKning diametri taxminan 2 nm (aniqroq 2,37 nm). Maktab darsliklarida bir o‘ramda 10 juft va o‘ram qadami 3,4 nm deb beriladi (Uotson–Krik modeli); aniqroq o‘lchovlarda bir o‘ramda taxminan 10,5 juft, qadami ≈ 3,32 nm, qo‘shni juftlar orasi ≈ 0,33 nm.',
      'Komplementarlik qoidasidan muhim xulosa chiqadi: bir zanjirning ketma-ketligini bilsak, ikkinchisini aniq yoza olamiz. Masalan, 5′-ATGC-3′ zanjiriga 3′-TACG-5′ zanjiri mos keladi. Shu sababli ikki zanjirli DNKda A = T va G = C (Chargaff qoidasi).'
    ]},
    {sarlavha:'Replikatsiya — DNKning o‘zini nusxalashi', xatboshilar:[
      'Hujayra bo‘linishidan oldin DNK ikki hissa ko‘payishi kerak. Avval helikaza fermenti asoslar orasidagi vodorod bog‘larni uzib, zanjirlarni ajratadi — replikatsiya vilkasi hosil bo‘ladi.',
      'Keyin DNK polimeraza har bir eski zanjirni andoza qilib, unga komplementar erkin nukleotidlarni qo‘shadi. Polimeraza faqat 5′→3′ yo‘nalishda qura oladi, shuning uchun bir zanjir uzluksiz (yetakchi), ikkinchisi esa qisqa bo‘laklar — Okazaki bo‘laklari bilan (orqada qoluvchi zanjir) quriladi; bo‘laklarni ligaza fermenti ulaydi.',
      'Polimeraza o‘z ishini tekshiradi va xatolarni tuzatadi; boshqa tuzatish tizimlari bilan birga yakuniy xatolik milliard nukleotidga bittadan kam bo‘ladi. Ichak tayoqchasida replikatsiya tezligi 37 °C da sekundiga taxminan 750 nukleotid.',
      '1958-yilda Metyu Meselson va Franklin Stal bakteriyalarni avval og‘ir azot (¹⁵N) li, keyin oddiy azot (¹⁴N) li muhitda o‘stirib, har yangi DNK molekulasi bitta eski va bitta yangi zanjirdan iborat ekanini isbotlagan — replikatsiya yarim konservativ.'
    ]},
    {sarlavha:'DNK va irsiyat', xatboshilar:[
      'DNKdagi nukleotidlar ketma-ketligi — irsiy axborot. Uning oqsil tuzilishi haqidagi bo‘lagi gen deyiladi. Axborot avval iRNKga ko‘chiriladi (transkripsiya), so‘ng ribosomada oqsilga aylantiriladi (translyatsiya). Uchta ketma-ket nukleotid (triplet, kodon) bitta aminokislotani belgilaydi.',
      'Eukariotlarda DNK yadroda gistonlar atrofiga o‘ralib, xromatin hosil qiladi; bo‘linish vaqtida u zichlashib, xromosomalarga aylanadi. Odam somatik hujayrasida 46 ta (23 juft) xromosoma bor, jinsiy hujayralarda — 23 ta. Otadan va onadan bittadan to‘plam kelgani uchun farzand ikkala ota-onaga o‘xshaydi.',
      'Odam gaploid genomida taxminan 3,1 milliard juft nukleotid bor, oqsil kodlovchi genlar esa taxminan 19–20 ming. «Inson genomi» loyihasi 2003-yilda asosan yakunlangan, to‘liq ketma-ketlik 2022-yilda e’lon qilingan.',
      'Ko‘p uchraydigan xatolar: «DNKda urasil bor» — yo‘q, urasil RNKda; «A G bilan juftlashadi» — yo‘q, A faqat T bilan, G faqat C bilan; «replikatsiyada bitta butunlay yangi va bitta butunlay eski molekula chiqadi» — yo‘q, har birida bittadan eski va yangi zanjir bo‘ladi.'
    ]}
  ],
  formulalar:[
    ['A = T; G = C; A + G = T + C','Chargaff qoidasi (ikki zanjirli DNK)'],
    ['%A + %T + %G + %C = 100 %','Masalan, A = 30 % → T = 30 %, G = C = (100 − 60) / 2 = 20 %'],
    ['Vodorod bog‘lar soni = 2·(A–T juftlar) + 3·(G–C juftlar)','Sahnadagi 20 juft: 10·2 + 10·3 = 50 ta'],
    ['DNK uzunligi ≈ juftlar soni × 0,34 nm','Masalan, 20 juft ≈ 6,8 nm (aniqroq 0,332 nm bilan ≈ 6,6 nm)'],
    ['O‘ramlar soni = juftlar soni / 10 (aniqroq / 10,5)','20 juft ≈ 2 o‘ram']
  ],
  qiziqarli:[
    'Fridrix Misher DNKni birinchi marta 1869-yilda jarohat bog‘ichlaridagi yiring hujayralaridan ajratib olgan.',
    '«Photo 51» ni 1952-yil 2-mayda R. Franklin rahbarligida R. Gosling olgan — bu surat qo‘sh spiral modeli uchun muhim dalil bo‘lgan.',
    'Uotson va Krikning 1953-yilgi maqolasi atigi bir sahifadan sal ko‘proq (Nature 171, 737–738-betlar).',
    'Bitta odam hujayrasidagi DNKni cho‘zib ulasak, taxminan 2 metr chiqadi (taxminiy baho).',
    'Ichak tayoqchasi DNKsini sekundiga taxminan 750 nukleotid tezlikda nusxalaydi.',
    'Odam genomining atigi 1–2 % i oqsillarni kodlaydi.'
  ],
  lugat:[
    ['DNK','Dezoksiribonuklein kislota — irsiy axborot tashuvchi molekula.'],
    ['Nukleotid','DNK monomeri: fosfat + dezoksiriboza + azotli asos.'],
    ['Azotli asos','Adenin, timin, guanin, sitozin (RNKda timin o‘rniga urasil).'],
    ['Komplementarlik','Asoslarning qat’iy juftlashuvi: A–T, G–C.'],
    ['Antiparallel','Ikki zanjirning qarama-qarshi yo‘nalishi (5′→3′ va 3′→5′).'],
    ['Replikatsiya','DNKning o‘zini nusxalashi.'],
    ['Helikaza','Qo‘sh spiralni ochuvchi ferment.'],
    ['DNK polimeraza','Yangi zanjirni quruvchi ferment.'],
    ['Yarim konservativ','Har yangi molekulada bitta eski va bitta yangi zanjir bo‘lishi.'],
    ['Gen','Muayyan oqsil yoki RNK haqidagi axborotni saqlovchi DNK bo‘lagi.'],
    ['Xromosoma','Bo‘linishda zichlashgan DNK va oqsillar majmuasi.'],
    ['Genom','Organizmning butun irsiy axboroti.']
  ],
  manba:ND+'; '+NM+'. Farqlar: bir o‘ramda 10 juft va qadam 3,4 nm (darslik, Uotson–Krik modeli) — aniqroq 10,5 juft va 3,32 nm (Wikipedia «Nucleic acid double helix»); diametri ≈ 2 nm (aniqroq 2,37 nm); Chargaff qoidasi 1940-yillar oxiri — 1952 (manbalarda turlicha). «Bir hujayradagi DNK ≈ 2 m» — keng tarqalgan taxminiy baho.',
  ishlanma:{
    sinf:'9–10-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (3D model + masala yechish)', usul:'3D spiral model, komplementar zanjir yozish, Chargaff masalalari, juftlikda ishlash',
    maqsad:{talimiy:'DNK tuzilishi, nukleotid tarkibi, komplementarlik qoidasi va replikatsiya mexanizmini o‘rganish; irsiyatdagi o‘rnini tushunish.',
      tarbiyaviy:'Olimlar hamkorligi va ilmiy halollik (Franklin misolida) qadrini anglash.',
      rivojlantiruvchi:'Model asosida fikrlash, komplementar zanjir tuzish va foiz masalalarini yechish ko‘nikmasini rivojlantirish.'},
    natijalar:['Nukleotid tarkibini aytadi','Berilgan zanjirga komplementar zanjir yozadi','Chargaff qoidasi bo‘yicha foiz masalasini yechadi','Replikatsiya bosqichlari va fermentlarini tushuntiradi','DNK va RNK farqini aytadi'],
    jihozlar:['MAKON sahnasi «DNK tuzilishi va irsiyat»','Proyektor yoki interaktiv doska','Rangli qog‘oz tasmalar yoki konstruktor (DNK maketi uchun)','Tarqatma: masalalar varag‘i','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Nega farzand ota-onasiga o‘xshaydi? Axborot qayerda va qanday yozilgan?»','Fikr bildiradi.'],
      ['8–20','<b>DNK tuzilishi.</b> MAKON da spiral, nukleotid rejimlari; kashfiyot tarixi (Misher, Chargaff, Franklin, Uotson–Krik).','Nukleotid sxemasini chizadi.'],
      ['20–28','<b>Komplementarlik.</b> Sahnadagi zanjirga komplementar zanjir yozish, vodorod bog‘larni sanash.','Juftlikda zanjir yozadi va tekshiradi.'],
      ['28–36','<b>Replikatsiya.</b> Animatsiyani bosqichma-bosqich ko‘rsatadi: helikaza, polimeraza, yarim konservativlik (Meselson–Stal).','Bosqichlarni tartiblaydi.'],
      ['36–43','<b>Mustahkamlash.</b> Chargaff masalasi, MAKON amaliyoti va test.','Masala, amaliyot, test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Nukleotid','DNK monomeri.'],['Komplementarlik','A–T, G–C juftlashuvi.'],['Replikatsiya','DNK nusxalanishi.'],['Helikaza','Spiralni ochuvchi ferment.'],['Gen','Irsiy axborot birligi.']],
    savollar:[['Nukleotid qanday qismlardan tuzilgan?','Fosfat, dezoksiriboza, azotli asos'],['A–T va G–C juftlarida nechtadan vodorod bog‘?','2 va 3'],['DNKda C = 15 % bo‘lsa, A necha foiz?','35 %'],['Qo‘sh spiral modeli qachon e’lon qilingan?','1953-yil (Uotson va Krik)'],['Replikatsiya nega yarim konservativ?','Har yangi molekulada bitta eski zanjir saqlanadi']],
    uy:'Darslikdagi tegishli mavzuni o‘qish; (1) 5′-GATTACAGC-3′ zanjiriga komplementar zanjirni yozish (javob: 3′-CTAATGTCG-5′) va vodorod bog‘larni sanash (5 ta A–T juft · 2 + 4 ta G–C juft · 3 = 22); (2) DNKda G = 22 % bo‘lsa, qolgan asoslar foizini topish (C = 22 %, A = T = 28 %); (3) rangli qog‘ozdan 10 juftli DNK maketini yasash.',
    manba:ND+'; '+NM
  }
};

const W = 'Wikipedia (inglizcha)';
DT.kbg_dnk = {
  A:{nom:'Adenin (A)', sarlavha2:'Azotli asos · purin', jadval:[['Tuzilishi','ikki halqali (purin)'],['Juftlashadi','timin (T) bilan'],['Vodorod bog‘','2 ta'],['Odam DNKsida','≈ 29,3 %']], matn:'Adenin ATF (hujayra energiya tashuvchisi) tarkibiga ham kiradi. RNKda adenin urasil (U) bilan juftlashadi.', manba:W+' «Adenine», «Chargaff’s rules»'},
  T:{nom:'Timin (T)', sarlavha2:'Azotli asos · pirimidin', jadval:[['Tuzilishi','bir halqali (pirimidin)'],['Juftlashadi','adenin (A) bilan'],['Vodorod bog‘','2 ta'],['Faqat','DNKda (RNKda o‘rniga urasil)']], matn:'Timin va urasil tuzilishi o‘xshash: timinda qo‘shimcha metil guruh bor.', manba:W+' «Thymine»'},
  G:{nom:'Guanin (G)', sarlavha2:'Azotli asos · purin', jadval:[['Tuzilishi','ikki halqali (purin)'],['Juftlashadi','sitozin (C) bilan'],['Vodorod bog‘','3 ta'],['Odam DNKsida','≈ 20,7 %']], matn:'G–C juftlari 3 ta vodorod bog‘ tufayli A–T juftlaridan mustahkamroq.', manba:W+' «Guanine», «Chargaff’s rules»'},
  C:{nom:'Sitozin (C)', sarlavha2:'Azotli asos · pirimidin', jadval:[['Tuzilishi','bir halqali (pirimidin)'],['Juftlashadi','guanin (G) bilan'],['Vodorod bog‘','3 ta'],['Odam DNKsida','≈ 20,0 %']], matn:'Sitozin DNKda ham, RNKda ham uchraydi.', manba:W+' «Cytosine»'},
  fosfat:{nom:'Fosfat qoldig‘i', sarlavha2:'Nukleotid · skelet qismi', jadval:[['Joyi','spiralning tashqi tomoni'],['Vazifasi','qo‘shni nukleotidlarning qandlarini bog‘laydi (fosfodiefir bog‘)'],['Zaryadi','manfiy']], matn:'Fosfatlar tufayli DNK manfiy zaryadlangan va kislotali xossaga ega («nuklein kislota» nomi shundan). Misher nukleinning fosforga boyligini birinchi bo‘lib qayd etgan.', manba:W+' «DNA», «Friedrich Miescher»'},
  dezoksiriboza:{nom:'Dezoksiriboza', sarlavha2:'Nukleotid · besh uglerodli qand', jadval:[['Formula','C₅H₁₀O₄'],['Farqi','ribozadan bitta kislorod atomi kam (2′ holatda)'],['Bog‘lanadi','fosfat va azotli asos bilan']], matn:'Uglerod atomlari 1′ dan 5′ gacha raqamlanadi — zanjir uchlari shu sababli 5′ va 3′ deb ataladi.', manba:W+' «Deoxyribose»'},
  vodorod:{nom:'Vodorod bog‘lar', sarlavha2:'Juftlar orasidagi bog‘', jadval:[['A–T','2 ta'],['G–C','3 ta'],['Xususiyati','kuchsiz — replikatsiyada oson uziladi']], matn:'Har bir vodorod bog‘ kuchsiz, lekin millionlab bog‘ birga molekulani mustahkam tutadi. Qizdirilganda (≈ 90 °C atrofida) zanjirlar ajraladi — PZR usuli shunga asoslangan.', manba:W+' «Base pair», «Polymerase chain reaction»'},
  helikaza:{nom:'Helikaza', sarlavha2:'Replikatsiya fermenti', jadval:[['Vazifasi','qo‘sh spiralni ochadi, vodorod bog‘larni uzadi'],['Natija','replikatsiya vilkasi'],['Energiya','ATF hisobiga ishlaydi']], matn:'Helikaza «zamok»ni ochgandek harakatlanadi; ochilgan zanjirlar qayta birikmasligi uchun maxsus oqsillar ularni ushlab turadi.', manba:W+' «Helicase», «DNA replication»'},
  polimeraza:{nom:'DNK polimeraza', sarlavha2:'Replikatsiya fermenti', jadval:[['Vazifasi','andozaga komplementar yangi zanjir quradi'],['Yo‘nalish','faqat 5′→3′'],['Aniqlik','tuzatish bilan — milliard nukleotidga < 1 xato'],['Tezlik (E. coli)','≈ 750 nukleotid/s']], matn:'Orqada qoluvchi zanjir qisqa Okazaki bo‘laklari bilan quriladi, ularni ligaza ulaydi.', manba:W+' «DNA polymerase», «DNA replication»'},
  ona_zanjir:{nom:'Ona (eski) zanjir', sarlavha2:'Replikatsiya · andoza', jadval:[['Vazifasi','yangi zanjir uchun andoza'],['Taqdiri','yangi molekulada saqlanib qoladi']], matn:'Har yangi DNK molekulasi bitta ona zanjirni saqlaydi — replikatsiya yarim konservativ (Meselson va Stal, 1958).', manba:W+' «Meselson–Stahl experiment»'},
  yangi_zanjir:{nom:'Yangi (qiz) zanjir', sarlavha2:'Replikatsiya · mahsulot', jadval:[['Qurilishi','ona zanjirga komplementar'],['Quruvchi','DNK polimeraza'],['Yo‘nalish','5′→3′']], matn:'Yangi zanjir ketma-ketligi ona zanjirga komplementar, demak u ajratilgan ikkinchi eski zanjirning aynan nusxasi.', manba:W+' «DNA replication»'}
};
})();


/* ===== geo-relyef ===== */
bogla('geografiya', 'Relyef va tog‘ hosil bo‘lishi', 'geo-relyef', 'Plitalar to‘qnashuvi, burmalar, subduksiya, gorizontallar — 3D blok-diagrammada', ['Relyef va tog‘ hosil bo‘lishi']);
D['geo-relyef'] = {
  fan:'geografiya', qisqaNom:'Relyef', nom:'Relyef va tog‘ hosil bo‘lishi',
  qisqa:'6-sinf · Geografiya · litosfera va relyef',
  sinf:'6-sinf',
  sahna:'kbg_relyef',
  kor:{
    sarlavha:'Tog‘lar qanday paydo bo‘ladi?',
    matn:'Relyef — Yer yuzasidagi barcha notekisliklar: tog‘lar, tekisliklar, vodiylar, botiqlar. Ularni ichki kuchlar (litosfera plitalarining harakati, vulqonlar, zilzilalar) va tashqi kuchlar (suv, shamol, muzlik, harorat o‘zgarishi) birgalikda yaratadi. Bu 3D blok-diagrammada ikki materik plitasi to‘qnashib, cho‘kindi qatlamlar burmalanishini, okean plitasi materik ostiga botib, vulqonli tog‘lar paydo bo‘lishini ko‘rasiz. Oxirida tog‘ relyefi xaritada gorizontallar bilan qanday tasvirlanishini o‘rganasiz. Model sxematik: masshtab va tezliklar soddalashtirilgan.',
    punktlar:[
      '<b>Ichki kuchlar:</b> plitalar harakati, burmalanish, yoriqlar, vulqonizm — relyefni ko‘taradi va yaratadi',
      '<b>Tashqi kuchlar:</b> daryo, shamol, muzlik va nurash — relyefni yemiradi va tekislaydi',
      '<b>Burmali tog‘lar:</b> Himolay — Hindiston va Yevrosiyo plitalarining to‘qnashuvi (taxminan 50 mln yil oldin boshlangan)',
      '<b>Gorizontal:</b> xaritada bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq'
    ]
  },
  bolimlar:[
    {sarlavha:'Relyef shakllari: balandlik bo‘yicha', jadval:[
      ['Botiq','dengiz sathidan past quruqlik (masalan, O‘lik dengiz sohili, Turfon botig‘i)'],
      ['Pasttekislik','0–200 m (Turon pasttekisligi, Amazonka pasttekisligi)'],
      ['Qir (tepalik)','200–500 m'],
      ['Yassitog‘lik (plato)','500 m dan baland, usti nisbatan tekis (Ustyurt ham plato deb ataladi, lekin balandligi asosan 200–300 m atrofida — taxminiy)'],
      ['Past tog‘lar','1 000 m gacha'],
      ['O‘rtacha tog‘lar','1 000–2 000 m (ba’zi darsliklarda 3 000 m gacha)'],
      ['Baland tog‘lar','2 000 m dan (ba’zi darsliklarda 3 000 m dan) baland: Himolay, Pomir, Tyan-Shan']
    ], matn:'Chegara raqamlari turli darsliklarda biroz farq qiladi — ikkala variant ham ko‘rsatilgan. Tekisliklar va tog‘lar mutlaq balandlik bo‘yicha ajratiladi.'},
    {sarlavha:'Tog‘lar kelib chiqishiga ko‘ra', jadval:[
      ['Burmali tog‘lar','qatlamlar siqilib burmalanadi: Himolay, Alp tog‘lari'],
      ['Palaxsali tog‘lar','yer po‘sti yoriqlar bo‘ylab bo‘laklarga bo‘linib, ba’zilari ko‘tariladi (gorst), ba’zilari cho‘kadi (graben)'],
      ['Burmali-palaxsali (qayta tiklangan) tog‘lar','qadimgi yemirilgan burmali tog‘lar yangi harakatlarda palaxsalar bo‘lib qayta ko‘tarilgan: Tyan-Shan, Pomir-Oloy tizmalari'],
      ['Vulqonli tog‘lar','lava va kul to‘planishidan: And tog‘laridagi vulqonlar, Fudziyama, Kilimanjaro']
    ]},
    {sarlavha:'Plitalar chegaralari', jadval:[
      ['Materik + materik (to‘qnashuv)','burmali tog‘lar, kuchli zilzilalar — Himolay'],
      ['Okean + materik (subduksiya)','chuqur okean novi, vulqonli tog‘lar — And tog‘lari va Peru–Chili novi'],
      ['Okean + okean','orol yoylari va novlar — Mariana novi (Chellenjer chuqurligi ≈ 10 935 m)'],
      ['Uzoqlashuv','o‘rta okean tizmalari, rift vodiylari — Sharqiy Afrika rifti']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Blok-diagramma: qatlamlar va plitalar', matn:'Kesimda cho‘kindi jinslar qatlam-qatlam yotibdi: ular millionlab yillar davomida suv tubida to‘plangan. Qatlamlar ostida — litosfera plitalari, ular esa qisman erigan, sekin oquvchi astenosfera ustida suzadi. Hozircha plitalar bir-biridan uzoqda (t = 0).', holat:{rejim:'toqnash', t:0}},
    {sarlavha:'To‘qnashuv boshlanadi', matn:'Plitalar yiliga bir necha santimetr tezlik bilan yaqinlashadi. Hindiston va Yevrosiyo plitalari hozir ham yiliga taxminan 4–5 sm yaqinlashmoqda. Qatlamlar siqilib, egila boshlaydi.', holat:{rejim:'toqnash', t:.45}},
    {sarlavha:'Burmalar: antiklinal va sinklinal', matn:'Siqilish davom etganda qatlamlar to‘lqinsimon burmalarga aylanadi. Yuqoriga bukilgan burma — <b>antiklinal</b>, pastga bukilgani — <b>sinklinal</b>. Burmalar ko‘tarilib burmali tog‘ tizmasini hosil qiladi. Antiklinal va sinklinalni bosib ko‘ring.', holat:{rejim:'toqnash', t:1}},
    {sarlavha:'Subduksiya: okean plitasi botadi', matn:'Og‘irroq okean plitasi yengilroq materik plitasi ostiga botadi. Botish joyida chuqur okean <b>novi</b> hosil bo‘ladi. Chuqurlikda plita qiziydi, undan ajralgan suv mantiya jinslarini eritib <b>magma</b> hosil qiladi; magma yuqoriga ko‘tarilib vulqonli tog‘larni yaratadi — And tog‘lari shunday paydo bo‘lgan.', holat:{rejim:'subduksiya', t:1}},
    {sarlavha:'Tog‘ relyefi va gorizontallar', matn:'Endi tayyor tog‘ relyefini ko‘ramiz. Har bir chiziq — <b>gorizontal</b>: bir xil balandlikdagi nuqtalarni tutashtiradi. Ranglar balandlikni bildiradi: yashil — past, sariq va jigarrang — o‘rtacha, oq — eng baland joylar.', holat:{rejim:'gorizontal', oraliq:200, yuqoridan:false}},
    {sarlavha:'Xarita ko‘rinishi: yuqoridan', matn:'Yuqoridan qaraganda relyef tekis xaritaga aylanadi, balandlikni faqat gorizontallar ko‘rsatadi. Gorizontallar <b>zich</b> joylashgan joyda yonbag‘ir <b>tik</b>, siyrak joyda — <b>qiya</b>. Yopiq kichik halqa — cho‘qqi.', holat:{rejim:'gorizontal', oraliq:200, yuqoridan:true}},
    {sarlavha:'Gorizontal oralig‘ini o‘zgartirish', matn:'Oraliq 100 m bo‘lsa chiziqlar ko‘p va relyef batafsil, 500 m bo‘lsa chiziqlar kam va xarita soddaroq. Topografik xaritalarda oraliq masshtabga qarab tanlanadi.', holat:{rejim:'gorizontal', oraliq:100, yuqoridan:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Tog‘ hosil qiling va xaritani o‘qing', holat:{rejim:'toqnash', t:0},
    topshiriqlar:[
      {shart:'Jarayon slayderini oxirigacha suring — ikki materik plitasi <b>to‘liq to‘qnashsin</b> (t ≥ 0,9).', hodisa:'kbg-relyef-holat', kod:"ev.rejim==='toqnash'&&ev.t>=0.9", izoh:'To‘g‘ri — qatlamlar siqilib, burmali tog‘ tizmasi ko‘tarildi.'},
      {shart:'Yuqoriga bukilgan burmani — <b>antiklinalni</b> bosing.', hodisa:'kbg-relyef', kod:"ev.nom==='antiklinal'", izoh:'To‘g‘ri — <b>antiklinal</b>: qatlamlar gumbazdek yuqoriga egilgan, markazida eng qadimgi jinslar.'},
      {shart:'<b>Subduksiya</b> rejimiga o‘ting va okean plitasi botadigan <b>chuqur novni</b> bosing.', hodisa:'kbg-relyef', kod:"ev.rejim==='subduksiya'&&ev.nom==='novi'", izoh:'To‘g‘ri — chuqur okean novi. Eng chuquri — Mariana novidagi Chellenjer chuqurligi (≈ 10 935 m).'},
      {shart:'Subduksiya zonasida erigan jins — <b>magmani</b> bosing.', hodisa:'kbg-relyef', kod:"ev.nom==='magma'", izoh:'To‘g‘ri — magma yuqoriga ko‘tarilib vulqonli tog‘larni hosil qiladi.'},
      {shart:'<b>Gorizontallar</b> rejimiga o‘ting va <b>yuqoridan</b> (xarita) ko‘rinishini yoqing.', hodisa:'kbg-relyef-holat', kod:"ev.rejim==='gorizontal'&&ev.yuqoridan===true", izoh:'To‘g‘ri — endi relyef tekis xaritadagidek, balandlikni faqat chiziqlar ko‘rsatadi.'},
      {shart:'Gorizontallar eng zich joylashgan joyni — <b>tik yonbag‘irni</b> bosing.', hodisa:'kbg-relyef', kod:"ev.nom==='tik'", izoh:'To‘g‘ri — chiziqlar zich bo‘lsa, qisqa masofada balandlik tez o‘zgaradi, ya’ni yonbag‘ir tik.'}
    ]},
  test:[
    {s:'Relyefni yaratuvchi <b>ichki</b> kuchlarga qaysi biri kiradi?', v:['Daryo eroziyasi','Shamol','Litosfera plitalarining harakati','Muzlik'], t:2, izoh:'<b>Litosfera plitalarining harakati</b> — ichki kuch. Daryo, shamol va muzlik — tashqi kuchlar, ular relyefni yemiradi va tekislaydi.'},
    {s:'Qatlamlarning yuqoriga (gumbazsimon) bukilgan burmasi qanday ataladi?', v:['Sinklinal','Antiklinal','Graben','Nov'], t:1, izoh:'<b>Antiklinal</b> — yuqoriga bukilgan burma; sinklinal — pastga bukilgan burma.'},
    {s:'Himolay tog‘lari qaysi plitalarning to‘qnashuvidan paydo bo‘lgan?', v:['Tinch okean va Shimoliy Amerika','Afrika va Yevrosiyo','Hindiston va Yevrosiyo','Naska va Janubiy Amerika'], t:2, izoh:'<b>Hindiston va Yevrosiyo</b> plitalari. To‘qnashuv taxminan 50 mln yil oldin boshlangan va hozir ham davom etmoqda (yiliga ≈ 4–5 sm yaqinlashuv).'},
    {s:'Okean plitasi materik plitasi ostiga botishi nima deb ataladi?', v:['Subduksiya','Burmalanish','Nurash','Rift'], t:0, izoh:'<b>Subduksiya</b>. Bunday joyda chuqur okean novi va vulqonli tog‘lar hosil bo‘ladi (And tog‘lari).'},
    {s:'2020-yilda Xitoy va Nepal e’lon qilgan Everest (Jomolungma) balandligi qancha?', v:['8 848,86 m','8 611 m','8 848 m','8 850 m'], t:0, izoh:'<b>8 848,86 m</b> — 2020-yil 8-dekabrda e’lon qilingan. Avvalgi rasmiy qiymat 8 848 m edi; 8 611 m — K2 cho‘qqisi.'},
    {s:'Pasttekislik qaysi mutlaq balandlik oralig‘ida bo‘ladi?', v:['0–200 m','200–500 m','500–1 000 m','1 000–2 000 m'], t:0, izoh:'<b>0–200 m</b>. 200–500 m — qirlar, 500 m dan baland tekis yuzalar — yassitog‘liklar.'},
    {s:'Xaritada gorizontallar juda zich joylashgan bo‘lsa, yonbag‘ir qanday?', v:['Qiya','Tik','Tekis','Botiq'], t:1, izoh:'<b>Tik</b>. Zich chiziqlar qisqa masofada balandlik tez o‘zgarishini bildiradi.'},
    {s:'Tyan-Shan va Pomir-Oloy tog‘lari kelib chiqishiga ko‘ra qanday tog‘lar?', v:['Vulqonli','Faqat burmali','Burmali-palaxsali (qayta tiklangan)','Muzlik tog‘lari'], t:2, izoh:'<b>Burmali-palaxsali (qayta tiklangan)</b>: qadimgi burmali tog‘lar yemirilgan, so‘ng yangi harakatlarda palaxsalar bo‘lib qayta ko‘tarilgan.'},
    {s:'O‘zbekistonning eng baland nuqtasi — Hazrati Sulton cho‘qqisi qaysi tizmada?', v:['Chatqol','Hisor','Nurota','Qurama'], t:1, izoh:'<b>Hisor</b> tizmasida, balandligi 4 643 m (Surxondaryo viloyati, Tojikiston chegarasida).'},
    {s:'And tog‘lari qanday jarayon natijasida paydo bo‘lgan?', v:['Ikki materik plitasi to‘qnashuvi','Okean plitasining materik ostiga botishi','Plitalarning uzoqlashuvi','Muzlik yemirishi'], t:1, izoh:'<b>Okean plitasining materik ostiga botishi</b> (Naska plitasi Janubiy Amerika plitasi ostiga). Eng baland cho‘qqisi — Akonkagua, 6 961 m.'},
    {s:'Gorizontal nima?', v:['Bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq','Daryo o‘zani','Ikki davlat chegarasi','Bir xil haroratli nuqtalar chizig‘i'], t:0, izoh:'<b>Bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq</b>. Bir xil harorat chizig‘i esa izoterma deyiladi.'},
    {s:'Eng chuqur okean novi qaysi?', v:['Peru–Chili novi','Puerto-Riko novi','Mariana novi','Yava novi'], t:2, izoh:'<b>Mariana novi</b> (Tinch okean): Chellenjer chuqurligi ≈ 10 935 m (2021-yilgi aniqlash; eski manbalarda 11 000 m dan ortiq qiymatlar ham uchraydi).'},
    {tur:'3d', s:'Blok-diagrammada yuqoriga bukilgan burmani — <b>antiklinalni</b> bosing.', hodisa:'kbg-relyef', kalit:'nom', togri:['antiklinal'], v:['Antiklinal','boshqa qism'], t:0,
     izoh:'<b>Antiklinal</b> — qatlamlar gumbazsimon yuqoriga bukilgan burma. Pastga bukilgan burma — sinklinal.'}
  ],
  yordamchi:[
    {s:'Tog‘lar hozir ham o‘syaptimi?', j:'Ha. Masalan, Himolay hududida Hindiston va Yevrosiyo plitalari yiliga taxminan 4–5 sm yaqinlashadi va tog‘lar ba’zi joylarda yiliga bir necha millimetr ko‘tariladi. Shu bilan birga tashqi kuchlar — muzliklar, daryolar, nurash — ularni doim yemiradi. Balandlik shu ikki jarayon muvozanatiga bog‘liq.', kalit:['o‘s','hozir','ko‘taril','himolay']},
    {s:'Antiklinal va sinklinalni qanday farqlayman?', j:'Antiklinal — yuqoriga, gumbazdek bukilgan burma («A» harfining uchi kabi). Sinklinal — pastga, tog‘oradek bukilgan burma. Yemirilgan antiklinalning markazida eng qadimgi qatlamlar ochilib qoladi.', kalit:['antiklinal','sinklinal','burma','farq']},
    {s:'Gorizontal bo‘yicha balandlikni qanday aniqlayman?', j:'Har bir gorizontal yonida balandlik yozilgan bo‘ladi (masalan, 200, 400, 600 m). Nuqta ikki chiziq orasida bo‘lsa, balandlik ular orasida. Chiziqlar zich — yonbag‘ir tik, siyrak — qiya. Kichik yopiq halqa — cho‘qqi yoki botiq; botiqni ko‘rsatish uchun chiziqqa pastga qaragan kichik shtrix (bergshtrix) qo‘yiladi.', kalit:['gorizontal','balandlik','xarita','aniqla']}
  ],
  maqola:[
    {sarlavha:'Relyef va uni yaratuvchi kuchlar', xatboshilar:[
      'Relyef deb Yer yuzasidagi barcha notekisliklar majmuiga aytiladi: tog‘lar va tekisliklar, vodiylar va botiqlar, okean tubidagi tizmalar va novlar. Relyef bir joyda qotib qolmagan — u millionlab yillar davomida sekin, lekin to‘xtovsiz o‘zgaradi.',
      'Relyefni ikki guruh kuchlar shakllantiradi. <b>Ichki kuchlar</b> Yer ichidagi issiqlik energiyasi hisobiga ishlaydi: litosfera plitalari harakatlanadi, jinslar burmalanadi va yoriladi, magma ko‘tariladi, zilzilalar sodir bo‘ladi. Ular asosan relyefni ko‘taradi va yirik shakllarni — tog‘ tizmalari, okean novlari, tekisliklarni yaratadi.',
      '<b>Tashqi kuchlar</b> Quyosh energiyasi va og‘irlik kuchi hisobiga ishlaydi: harorat o‘zgarishi jinslarni nuratadi, daryolar vodiylar o‘yadi, shamol qumni uchirib barxanlar hosil qiladi, muzliklar tog‘ yonbag‘irlarini yo‘nadi. Ular baland joylarni yemirib, past joylarni cho‘kindilar bilan to‘ldiradi — ya’ni relyefni tekislashga intiladi.'
    ]},
    {sarlavha:'Litosfera plitalari va burmali tog‘lar', xatboshilar:[
      'Litosfera — Yerning qattiq qobig‘i (yer po‘sti va mantiyaning eng yuqori qismi). U bir necha yirik va ko‘plab mayda plitalarga bo‘lingan. Plitalar ostidagi qisman erigan, plastik holatdagi qatlam — astenosfera ustida yiliga bir necha santimetr tezlikda siljiydi. Bu juda sekin: taxminan tirnoq o‘sishi tezligiga yaqin.',
      'Ikki materik plitasi to‘qnashganda ularning hech biri chuqurga bota olmaydi — materik po‘sti yengil. Shunda chekkalardagi cho‘kindi qatlamlar siqiladi, burmalanadi va bir-birining ustiga suriladi. Yuqoriga bukilgan burmalar — antiklinallar, pastga bukilganlari — sinklinallar. Shu tarzda burmali tog‘lar ko‘tariladi.',
      'Eng yorqin misol — Himolay. Hindiston plitasi taxminan 50 mln yil oldin Yevrosiyo bilan to‘qnasha boshlagan va hozir ham shimolga siljiyapti: ikki plita yiliga taxminan 4–5 sm yaqinlashadi. Natijada dunyoning eng baland cho‘qqisi Everest (Jomolungma) paydo bo‘lgan — 2020-yilda Xitoy va Nepal uning balandligini 8 848,86 m deb e’lon qilgan. Himolay cho‘qqilarida okean tubida hosil bo‘lgan ohaktoshlar va dengiz jonivorlarining qoldiqlari topiladi.'
    ]},
    {sarlavha:'Subduksiya, novlar va vulqonli tog‘lar', xatboshilar:[
      'Okean po‘sti materik po‘stidan og‘irroq (zichroq). Shuning uchun okean va materik plitalari to‘qnashganda okean plitasi materik ostiga botadi — bu jarayon subduksiya deb ataladi. Botish joyida okean tubida uzun va chuqur novlar hosil bo‘ladi.',
      'Botayotgan plita 100 km atrofidagi chuqurlikka yetganda undan suv ajraladi. Bu suv ustidagi mantiya jinslarining erish haroratini pasaytiradi va magma hosil bo‘ladi. Magma yuzaga ko‘tarilib, materik chekkasida vulqonlar zanjirini yaratadi. Janubiy Amerikaning g‘arbiy chekkasidagi And tog‘lari shunday paydo bo‘lgan: ular taxminan 8 900 km ga cho‘zilgan, eng baland cho‘qqisi Akonkagua — 6 961 m.',
      'Ikki okean plitasi to‘qnashganda ham subduksiya bo‘ladi va vulqonli orollar yoylari hosil bo‘ladi (Yaponiya, Mariana orollari). Mariana novidagi Chellenjer chuqurligi — Yerdagi eng chuqur joy: 2021-yilgi aniqlash bo‘yicha taxminan 10 935 m (eski o‘lchovlarda 11 000 m dan ortiq qiymatlar ham berilgan).'
    ]},
    {sarlavha:'O‘zbekiston tog‘lari: Tyan-Shan va Pomir-Oloy', xatboshilar:[
      'O‘zbekiston hududining taxminan beshdan to‘rt qismini tekisliklar egallaydi — asosan Turon pasttekisligi va Qizilqum. Sharq va janubi-sharqda esa Tyan-Shan va Pomir-Oloy tog‘ tizimlarining g‘arbiy tizmalari joylashgan. Tyan-Shan umuman olganda taxminan 2 500 km ga cho‘zilgan.',
      'Respublikadagi Tyan-Shan tizmalari — Chatqol, Qurama, Piskom, Ugom. Chatqol tizmasining eng baland cho‘qqisi Avletim — 4 503 m (Qirg‘iziston hududida); Toshkent viloyatidagi mashhur Katta Chimyon cho‘qqisi taxminan 3 309 m. Pomir-Oloy tizimiga Turkiston, Zarafshon va Hisor tizmalari kiradi. O‘zbekistonning eng baland nuqtasi — Hisor tizmasidagi Hazrati Sulton cho‘qqisi, 4 643 m.',
      'Bu tog‘lar kelib chiqishiga ko‘ra burmali-palaxsali, ya’ni «qayta tiklangan» tog‘lardir. Ular dastlab juda qadimda burmali tog‘lar sifatida paydo bo‘lgan, keyin deyarli tekislangacha yemirilgan. So‘nggi o‘n millionlab yillarda Hindiston plitasining Yevrosiyoga bosimi ta’sirida yer po‘sti yoriqlar bo‘ylab palaxsalarga bo‘linib, qayta ko‘tarilgan. Shu sababli bu hududda hozir ham zilzilalar tez-tez bo‘ladi.'
    ]},
    {sarlavha:'Relyefni xaritada tasvirlash: gorizontallar', xatboshilar:[
      'Tekis qog‘ozda tog‘ning shaklini ko‘rsatish uchun gorizontallar ishlatiladi. Gorizontal — bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq. Tasavvur qiling: tog‘ni har 100 m da gorizontal tekisliklar bilan kesib, kesim chiziqlarini yuqoridan qog‘ozga tushirdik — shu chiziqlar gorizontallar bo‘ladi.',
      'Ikki qo‘shni gorizontal orasidagi balandlik farqi — kesim oralig‘i — bitta xaritada doim bir xil. Chiziqlar zich joylashgan joyda yonbag‘ir tik, siyrak joyda qiya. Kichik yopiq halqa cho‘qqini yoki botiqni bildiradi. Mutlaq balandlik dengiz sathidan hisoblanadi (O‘zbekiston va MDH xaritalarida — Boltiq dengizi sathidan), nisbiy balandlik esa bir nuqtaning boshqa nuqtadan qancha balandligini ko‘rsatadi.',
      'Ko‘p xaritalarda gorizontallar orasi rang bilan ham bo‘yaladi (gipsometrik shkala): pasttekisliklar yashil, qirlar va yassitog‘liklar sariq, tog‘lar jigarrang, eng baland cho‘qqilar oq yoki binafsha. Bu darsdagi 3D modelda ham shu usul qo‘llangan.'
    ]}
  ],
  formulalar:[
    ['Nisbiy balandlik = h(A) − h(B)','Masalan, cho‘qqi 3 309 m, vodiy 1 600 m: 3 309 − 1 600 = 1 709 m'],
    ['Gorizontallar soni ≈ (h_max − h_min) / kesim oralig‘i','2 500 m li tog‘, oraliq 200 m: 2 500 / 200 ≈ 12 ta chiziq'],
    ['Nishablik ≈ Δh / masofa','200 m balandlik farqi 1 km da: 200 / 1 000 = 0,2 (20 %)'],
    ['Siljish = tezlik × vaqt','5 sm/yil × 1 000 000 yil = 5 000 000 sm = 50 km']
  ],
  qiziqarli:[
    'Everest cho‘qqisidagi jinslar tarkibida qadimgi dengiz jonivorlarining qoldiqlari bor — bu jinslar bir vaqtlar okean tubida hosil bo‘lgan.',
    'Chellenjer chuqurligiga Everestni «qo‘ysak», uning cho‘qqisi suv ostida taxminan 2 km chuqurlikda qolardi.',
    'Plitalar harakatini sezish uchun yuzlab yil kerak emas: GPS qabul qiluvchilari ularning yillik bir necha santimetrlik siljishini bevosita o‘lchaydi.',
    'Toshkent viloyatidagi Chimyon — Chatqol tizmasining tarmog‘i; Katta Chimyon cho‘qqisi taxminan 3 309 m.',
    'O‘zbekiston hududining taxminan beshdan to‘rt qismi tekislik, qolgani tog‘ va tog‘ oldi hududlari.'
  ],
  lugat:[
    ['Relyef','Yer yuzasidagi barcha notekisliklar majmui.'],
    ['Litosfera','Yerning qattiq tashqi qobig‘i: yer po‘sti va mantiyaning yuqori qismi.'],
    ['Astenosfera','Litosfera ostidagi qisman erigan, plastik qatlam.'],
    ['Litosfera plitasi','Litosferaning chuqur yoriqlar bilan ajralgan yirik bo‘lagi.'],
    ['Burma','Qatlamlarning siqilishdan bukilishi.'],
    ['Antiklinal','Yuqoriga (gumbazsimon) bukilgan burma.'],
    ['Sinklinal','Pastga (tog‘orasimon) bukilgan burma.'],
    ['Subduksiya','Bir plitaning ikkinchisi ostiga botishi.'],
    ['Okean novi','Subduksiya joyidagi uzun va chuqur okean botig‘i.'],
    ['Gorst va graben','Yoriqlar bo‘ylab ko‘tarilgan va cho‘kkan palaxsalar.'],
    ['Gorizontal','Bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq.'],
    ['Mutlaq balandlik','Joyning dengiz sathidan balandligi.'],
    ['Nisbiy balandlik','Bir nuqtaning boshqa nuqtadan balandligi.']
  ],
  manba:'5–6-sinf «Geografiya» darsliklari (O‘zbekiston, amaldagi nashrlar); USGS «This Dynamic Earth» (pubs.usgs.gov/gip/dynamic); USGS «Seismicity of the Earth 1900–2010: Himalaya and vicinity» (Hindiston–Yevrosiyo yaqinlashuvi 40–50 mm/yil); Kathmandu Post, 2020-12-08 (Everest 8 848,86 m); Greenaway va boshq., 2021, Deep-Sea Research I (Chellenjer chuqurligi 10 935 ± 6 m); Wikipedia (inglizcha): «Andes» (8 900 km, Akonkagua 6 961 m), «Khazret Sultan» (4 643 m), «Chatkal Range» (Avletim 4 503 m), «Chimgan»; Britannica «Tien Shan» (≈ 2 500 km); gov.uz «Geografik joylashuv» (tekisliklar ≈ 4/5). Manbalar farqi: tog‘lar balandlik chegarasi (2 000 yoki 3 000 m), Chellenjer chuqurligi (10 935 m yoki eski 11 000 m dan ortiq) — matnda ikkalasi.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D blok-diagramma, muammoli savol, juftlikda xarita o‘qish',
    maqsad:{talimiy:'Relyefni yaratuvchi ichki va tashqi kuchlarni, burmali va vulqonli tog‘larning hosil bo‘lishini, gorizontallar yordamida relyefni tasvirlashni o‘rganish.',
      tarbiyaviy:'Ona yurt tabiatiga qiziqish, tabiat hodisalarini ilmiy tushuntirishga intilishni tarbiyalash.',
      rivojlantiruvchi:'Fazoviy tasavvur, sabab-oqibat bog‘lash va topografik xaritani o‘qish ko‘nikmasini rivojlantirish.'},
    natijalar:['Ichki va tashqi kuchlarga 2 tadan misol keltiradi','Antiklinal va sinklinalni modelda ko‘rsatadi','Himolay va And tog‘larining hosil bo‘lishini solishtiradi','Gorizontallar bo‘yicha tik va qiya yonbag‘irni aniqlaydi','O‘zbekistondagi tog‘ tizmalarini va eng baland nuqtani aytadi'],
    jihozlar:['MAKON sahnasi «Relyef va tog‘ hosil bo‘lishi» (3D blok-diagramma)','Proyektor yoki interaktiv doska','O‘zbekiston tabiiy xaritasi','Rangli plastilin qatlamlari (burma modeli uchun)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Nega Himolay cho‘qqisida dengiz chig‘anoqlari topiladi?» — muammoli savol.','Taxmin aytadi.'],
      ['8–20','<b>3D blok-diagramma.</b> MAKON da to‘qnashuv (t = 0 → 1), antiklinal va sinklinalni bosib ko‘rsatadi; subduksiya rejimida nov va magmani tushuntiradi.','Kuzatadi, daftarga chizma chizadi.'],
      ['20–26','<b>Plastilin tajribasi.</b> 3–4 rangli plastilin qatlamini ikki tomondan siqish — burmalar hosil bo‘ladi.','Juftlikda tajriba o‘tkazadi.'],
      ['26–34','<b>Gorizontallar.</b> «Yuqoridan» ko‘rinishda zich va siyrak chiziqlarni solishtiradi; O‘zbekiston xaritasida Hisor va Chatqol tizmalarini topadi.','Xaritani o‘qiydi, balandlikni aniqlaydi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Antiklinal','Yuqoriga bukilgan burma.'],['Sinklinal','Pastga bukilgan burma.'],['Subduksiya','Plitaning boshqa plita ostiga botishi.'],['Gorizontal','Bir xil balandlik chizig‘i.'],['Astenosfera','Plastik mantiya qatlami.']],
    savollar:[['Himolay qaysi plitalar to‘qnashuvidan paydo bo‘lgan?','Hindiston va Yevrosiyo'],['And tog‘lari qanday hosil bo‘lgan?','Okean plitasining materik ostiga botishi (subduksiya)'],['O‘zbekistonning eng baland nuqtasi?','Hazrati Sulton, 4 643 m (Hisor tizmasi)'],['Gorizontallar zich bo‘lsa, yonbag‘ir qanday?','Tik'],['Everest balandligi (2020)?','8 848,86 m']],
    uy:'Darslikdagi mavzuni o‘qish; (1) antiklinal va sinklinal chizmasini chizib, izohlash; (2) xayoliy tog‘ uchun 100 m oraliqli gorizontallar chizish (bir yonbag‘ri tik, ikkinchisi qiya bo‘lsin); (3) cho‘qqi 3 309 m, vodiy 1 250 m bo‘lsa, nisbiy balandlikni hisoblash (javob: 2 059 m).',
    manba:'5–6-sinf «Geografiya» darsliklari; USGS «This Dynamic Earth»; Britannica «Tien Shan»'
  }
};
DT.kbg_relyef = {
  plita:{nom:'Litosfera plitasi', sarlavha2:'Relyef · ichki kuchlar',
    jadval:[['Tarkibi','Yer po‘sti + mantiyaning yuqori qismi'],['Qalinligi','okean ostida ≈ 70–100 km gacha, materiklar ostida ≈ 100–200 km (taxminiy)'],['Tezligi','yiliga bir necha sm'],['Yirik plitalar','Tinch okean, Yevrosiyo, Afrika, Shimoliy va Janubiy Amerika, Hind-Avstraliya, Antarktida']],
    matn:'Plitalar astenosfera ustida sekin siljiydi. Ularning chegaralarida tog‘lar ko‘tariladi, zilzilalar va vulqonlar ko‘p bo‘ladi. Modelda ikki materik plitasi to‘qnashmoqda.',
    manba:'USGS «This Dynamic Earth»'},
  antiklinal:{nom:'Antiklinal', sarlavha2:'Burma · yuqoriga bukilgan',
    jadval:[['Shakli','gumbazsimon, yuqoriga qavariq'],['Markazida','eng qadimgi qatlamlar'],['Hosil bo‘lishi','qatlamlar yon tomondan siqilganda'],['Ahamiyati','antiklinallarda neft va gaz ko‘p to‘planadi']],
    matn:'Antiklinal yemirilganda uning markazida eng qadimgi jinslar ochilib qoladi. Neft va gaz yengil bo‘lgani uchun antiklinallarning yuqori qismida, o‘tkazmaydigan qatlam ostida to‘planadi.',
    manba:'5–6-sinf «Geografiya» darsliklari; Britannica «Anticline»'},
  sinklinal:{nom:'Sinklinal', sarlavha2:'Burma · pastga bukilgan',
    jadval:[['Shakli','tog‘orasimon, pastga botiq'],['Markazida','eng yosh qatlamlar'],['Juftligi','antiklinallar bilan navbatlashib keladi']],
    matn:'Burmali tog‘larda antiklinal va sinklinallar to‘lqindek navbatlashadi. Relyefda sinklinal har doim ham vodiy bo‘lavermaydi: tashqi kuchlar ba’zan antiklinalni tezroq yemiradi.',
    manba:'Britannica «Syncline»'},
  choqqi:{nom:'Cho‘qqi', sarlavha2:'Relyef shakli',
    jadval:[['Ta’rifi','tog‘ yoki tepalikning eng baland nuqtasi'],['Xaritada','eng ichki yopiq gorizontal halqa, balandlik belgisi bilan'],['Dunyoda eng balandi','Everest (Jomolungma) — 8 848,86 m (2020)'],['O‘zbekistonda eng balandi','Hazrati Sulton — 4 643 m (Hisor tizmasi)']],
    matn:'Cho‘qqilar balandligi dengiz sathidan (mutlaq balandlik) o‘lchanadi. Everestning yangi balandligi Nepal va Xitoy o‘lchovchilarining GPS va trigonometrik o‘lchovlari asosida 2020-yil 8-dekabrda e’lon qilingan.',
    manba:'Kathmandu Post (2020-12-08); Wikipedia «Khazret Sultan»'},
  qatlam:{nom:'Cho‘kindi qatlamlar', sarlavha2:'Tog‘ jinslari',
    jadval:[['Hosil bo‘lishi','suv tubida qum, gil, ohak zarralari to‘planib, zichlashadi'],['Jinslar','qumtosh, gilli slanets, ohaktosh, konglomerat'],['Yotishi','dastlab gorizontal, pastdagisi qadimiyroq']],
    matn:'Qatlamlar dastlab tekis yotadi. Agar ular egilgan yoki yorilgan bo‘lsa — demak, keyinchalik ichki kuchlar ta’sir qilgan. Qatlamlar Yer tarixining «kitob sahifalari» deb ataladi.',
    manba:'5–6-sinf «Geografiya» darsliklari'},
  astenosfera:{nom:'Astenosfera', sarlavha2:'Yuqori mantiya',
    jadval:[['Joyi','litosfera ostida, taxminan 100–350 km chuqurlikda (taxminiy)'],['Holati','qisman erigan, plastik — juda sekin oqadi'],['Ahamiyati','plitalar uning ustida siljiydi']],
    matn:'Astenosferadagi moddaning sekin harakati va plitalarning o‘z og‘irligi bilan botishi plitalarni harakatga keltiruvchi asosiy kuchlar hisoblanadi.',
    manba:'USGS «This Dynamic Earth»; Britannica «Asthenosphere»'},
  okean_plita:{nom:'Okean plitasi', sarlavha2:'Subduksiya · botuvchi plita',
    jadval:[['Po‘sti','bazalt, qalinligi ≈ 5–10 km'],['Zichligi','materik po‘stidan katta'],['Taqdiri','subduksiya zonasida mantiyaga botadi']],
    matn:'Okean po‘sti zich va nisbatan yosh (eng qadimgi qismlari ham taxminan 180–200 mln yildan oshmaydi, taxminiy). U o‘rta okean tizmalarida hosil bo‘lib, novlarda yo‘q bo‘ladi.',
    manba:'USGS «This Dynamic Earth»'},
  materik_plita:{nom:'Materik plitasi', sarlavha2:'Subduksiya · ustki plita',
    jadval:[['Po‘sti','granit qatlami bor, qalinligi ≈ 30–70 km'],['Zichligi','okean po‘stidan kichik — botmaydi'],['Chekkasida','vulqonli tog‘lar (And)']],
    matn:'Materik po‘sti yengil bo‘lgani uchun mantiyaga botmaydi. Shu sababli ikki materik to‘qnashganda burmali tog‘lar, okean bilan to‘qnashganda esa subduksiya bo‘ladi.',
    manba:'USGS «This Dynamic Earth»'},
  novi:{nom:'Chuqur okean novi', sarlavha2:'Subduksiya zonasi',
    jadval:[['Eng chuqur','Mariana novi, Chellenjer chuqurligi ≈ 10 935 m (2021)'],['Boshqa misol','Peru–Chili (Atakama) novi — And tog‘lari yonida'],['Hosil bo‘lishi','okean plitasi botayotgan joyda']],
    matn:'Novlar okean tubidagi eng chuqur joylar. Chellenjer chuqurligining 2021-yilgi aniqlashi 10 935 ± 6 m; eski o‘lchovlarda 11 000 m dan ortiq qiymatlar ham berilgan.',
    manba:'Greenaway va boshq., 2021 (NOAA repozitoriysi); Britannica «Challenger Deep»'},
  vulqon:{nom:'Vulqonli tog‘lar', sarlavha2:'Subduksiya · magma yuzaga chiqadi',
    jadval:[['Misol','And tog‘lari vulqonlari; Ohos-del-Salado — eng baland vulqon, ≈ 6 893 m'],['Joylashuvi','novga parallel, materik ichida 100–300 km (taxminiy)'],['Tinch okean halqasi','dunyo vulqonlarining ≈ 75 %']],
    matn:'Subduksiya zonalari ustida vulqonlar zanjir bo‘lib joylashadi. Tinch okeanni o‘rab turgan bunday zanjir «Olovli halqa» deb ataladi.',
    manba:'National Geographic «Ring of Fire»; Wikipedia «Ojos del Salado»'},
  magma:{nom:'Magma', sarlavha2:'Erigan tog‘ jinsi',
    jadval:[['Hosil bo‘lishi','botgan plitadan ajralgan suv mantiya jinsining erish haroratini pasaytiradi'],['Harorati','lava holida ≈ 700–1 200 °C'],['Yuzada','lava deb ataladi']],
    matn:'Magma atrofidagi jinslardan yengil bo‘lgani uchun yuqoriga ko‘tariladi. Bir qismi yer ostida qotib intruziv jinslarni (granit), yuzaga chiqqan qismi esa vulqon jinslarini (bazalt, andezit) hosil qiladi.',
    manba:'Britannica «Lava»; USGS «This Dynamic Earth»'},
  vodiy:{nom:'Vodiy', sarlavha2:'Relyef shakli · tashqi kuchlar',
    jadval:[['Ta’rifi','tog‘lar orasidagi cho‘ziq past joy'],['Hosil qiluvchi','daryo (V shaklli), muzlik (U shaklli), tektonik cho‘kish'],['Xaritada','gorizontallar balandga qarab «V» bo‘lib qayrilgan joy']],
    matn:'Daryo vodiysini gorizontallar bo‘yicha oson topish mumkin: chiziqlar daryo yuqori oqimi tomon o‘tkir burchak hosil qiladi. O‘zbekistondagi eng yirik tog‘lararo botiq — Farg‘ona vodiysi.',
    manba:'5–6-sinf «Geografiya» darsliklari'},
  gorizontal:{nom:'Gorizontal', sarlavha2:'Relyefni xaritada tasvirlash',
    jadval:[['Ta’rifi','bir xil mutlaq balandlikdagi nuqtalarni tutashtiruvchi chiziq'],['Kesim oralig‘i','qo‘shni chiziqlar orasidagi balandlik farqi (xaritada bir xil)'],['Bergshtrix','nishab qaysi tomonga pasayishini ko‘rsatuvchi kichik chiziqcha']],
    matn:'Gorizontallar hech qachon kesishmaydi (osilib turgan qoyadan tashqari) va doim yopiq bo‘ladi — ba’zan xarita chegarasidan tashqarida yopiladi.',
    manba:'5–6-sinf «Geografiya» darsliklari; topografiya qo‘llanmalari'},
  tik:{nom:'Tik yonbag‘ir', sarlavha2:'Gorizontallar zich',
    jadval:[['Belgisi','chiziqlar bir-biriga juda yaqin'],['Ma’nosi','qisqa masofada balandlik tez o‘zgaradi'],['Xavf','ko‘chki, tosh qulashi ehtimoli yuqori']],
    matn:'Sayohatchilar xaritada zich gorizontallarni ko‘rib, yo‘lni qiyaroq yonbag‘irdan tanlaydi.',
    manba:'5–6-sinf «Geografiya» darsliklari'},
  qiya:{nom:'Qiya (yotiq) yonbag‘ir', sarlavha2:'Gorizontallar siyrak',
    jadval:[['Belgisi','chiziqlar orasi keng'],['Ma’nosi','balandlik sekin o‘zgaradi'],['Foydalanish','yo‘l, dalalar, yaylovlar uchun qulay']],
    matn:'Tog‘ oldi qiya tekisliklari (adirlar) dehqonchilik va chorvachilik uchun qulay — O‘zbekistonda ko‘plab bog‘lar shunday joylarda.',
    manba:'5–6-sinf «Geografiya» darsliklari'}
};


/* ===== geo-vulqon ===== */
bogla('geografiya', 'Vulqonlar va zilzilalar', 'geo-vulqon', 'Kesilgan vulqon, otilish, seysmik to‘lqinlar va seysmograf; zilzilada xavfsizlik');
D['geo-vulqon'] = {
  fan:'geografiya', qisqaNom:'Vulqon va zilzila', nom:'Vulqonlar va zilzilalar',
  qisqa:'6-sinf · Geografiya · litosferadagi ichki jarayonlar',
  sinf:'6-sinf',
  sahna:'kbg_vulqon',
  kor:{
    sarlavha:'Yer ichidagi kuchlar yuzaga chiqqanda',
    matn:'Vulqon va zilzila — Yer ichki energiyasining eng yorqin ko‘rinishlari. Ular asosan litosfera plitalarining chegaralarida uchraydi. Bu darsda yarmi kesilgan vulqon ichiga qaraysiz: magma o‘chog‘idan jerlo orqali kraterga ko‘tarilgan magma lava, kul va vulqon bombalari bo‘lib otiladi. Keyin zilzila modelida yoriq bo‘ylab siljish, o‘choq (gipotsentr) va epitsentr, P- va S-to‘lqinlar tarqalishini hamda seysmograf yozuvini kuzatasiz. Oxirida zilzila paytida o‘zingizni qanday himoya qilishni o‘rganasiz. Model sxematik.',
    punktlar:[
      '<b>Vulqon:</b> magma yuzaga chiqadigan joy; dunyoda ≈ 1 350 ta potensial faol vulqon bor (okean ostidagilardan tashqari, USGS)',
      '<b>Zilzila:</b> yer po‘stidagi yoriq bo‘ylab to‘satdan siljish natijasidagi silkinish',
      '<b>Toshkent zilzilasi:</b> 1966-yil 26-aprel, mahalliy vaqt 05:23, o‘choq chuqurligi 3–8 km',
      '<b>Xavfsizlik:</b> silkinish paytida — «yerga cho‘king, pana qiling, ushlab turing»'
    ]
  },
  bolimlar:[
    {sarlavha:'Vulqon qismlari', jadval:[
      ['Magma o‘chog‘i','yer ostidagi erigan jins to‘plangan joy'],
      ['Jerlo (kanal)','magma yuzaga ko‘tariladigan yo‘l'],
      ['Krater','vulqon tepasidagi kosasimon chuqurlik'],
      ['Konus','lava va kul qatlamlaridan tuzilgan tog‘'],
      ['Yon krater','asosiy jerlodan ajralgan yon kanal chiqishi'],
      ['Dayka','qatlamlarni kesib o‘tgan, qotgan magma «devori»']
    ]},
    {sarlavha:'Vulqon turlari', jadval:[
      ['Faoliyatiga ko‘ra','harakatdagi (faol), uyqudagi (so‘nmagan, lekin uzoq otilmagan), so‘ngan'],
      ['Stratovulqon (qatlamli)','tik konus, lava va kul navbatlashadi: Fudziyama, Vezuviy, Klyuchevskaya Sopka'],
      ['Qalqonsimon','suyuq bazalt lavasidan keng, yotiq: Mauna-Loa, Kilauea (Gavayi)'],
      ['Shlak konusi','kichik, bo‘sh g‘ovak jinslardan']
    ]},
    {sarlavha:'Seysmik to‘lqinlar', jadval:[
      ['P-to‘lqin (bo‘ylama)','eng tez; yer po‘stining qattiq jinslarida ≈ 5–7 km/s (manbalarda 3–6,5 km/s ham); qattiq, suyuq va gazda tarqaladi'],
      ['S-to‘lqin (ko‘ndalang)','sekinroq; qattiq jinslarda ≈ 3–4 km/s (manbalarda 1,5–3,8 km/s); suyuqlikda tarqalmaydi'],
      ['Sirt to‘lqinlari','eng sekin, lekin eng ko‘p vayronagarchilik keltiradi']
    ], matn:'Seysmik tezliklar jins turiga qarab o‘zgaradi — jadvaldagi oraliqlar taxminiy, manbalarda biroz farq qiladi.'},
    {sarlavha:'Magnituda va ball', jadval:[
      ['Magnituda','zilzilada ajralgan energiya o‘lchovi; bitta zilzila — bitta qiymat. Richter shkalasi 1935-yilda taklif etilgan; hozir asosan moment magnitudasi (Mw)'],
      ['+1 magnituda','energiya ≈ 32 marta (10^1,5) ko‘p'],
      ['Intensivlik (ball)','joydagi silkinish kuchi; O‘zbekistonda 12 ballik MSK-64 shkalasi; epitsentrdan uzoqlashgan sari kamayadi']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Vulqon ichiga qarash', matn:'Vulqonning yarmi kesilgan. Chuqurlikda — <b>magma o‘chog‘i</b>. Undan <b>jerlo</b> (kanal) yuqoriga — <b>kraterga</b> olib chiqadi. Konus lava va kul qatlamlaridan tuzilgan: bu stratovulqon. Qismlarni bosib ko‘ring.', holat:{rejim:'vulqon', otilish:false}},
    {sarlavha:'Otilish', matn:'Magmadagi gazlar (asosan suv bug‘i va karbonat angidrid) bosim oshganda magmani yuqoriga itaradi. Kraterdan kul buluti, vulqon bombalari chiqadi, yonbag‘ir bo‘ylab <b>lava</b> oqadi. Lava harorati ≈ 700–1 200 °C.', holat:{rejim:'vulqon', otilish:true}},
    {sarlavha:'Yon krater va daykalar', matn:'Magma har doim ham asosiy jerlodan chiqmaydi: yoriqlar bo‘ylab yon tomonga yo‘l ochib, <b>yon krater</b> hosil qiladi. Yer ostida qotgan magma devorlari — <b>daykalar</b>. Vulqon otilishi tugagach, magma kanalda qotib qoladi.', holat:{rejim:'vulqon', otilish:false}},
    {sarlavha:'Zilzila: yoriq va o‘choq', matn:'Yer po‘stida kuchlanish to‘planib, jinslar <b>yoriq</b> bo‘ylab to‘satdan siljiydi. Siljish boshlangan joy — <b>gipotsentr</b> (o‘choq), uning ustidagi yer yuzasi nuqtasi — <b>epitsentr</b>. Epitsentrda silkinish eng kuchli bo‘ladi.', holat:{rejim:'zilzila', magnituda:5}},
    {sarlavha:'P- va S-to‘lqinlar', matn:'O‘choqdan har tomonga to‘lqinlar tarqaladi. Birinchi bo‘lib tez <b>P-to‘lqinlar</b>, keyin sekinroq <b>S-to‘lqinlar</b> yetib keladi; yuzada <b>sirt to‘lqinlari</b> uylarni silkitadi. Seysmograf yozuvida P va S orasidagi vaqt stansiyadan epitsentrgacha masofani ko‘rsatadi.', holat:{rejim:'zilzila', magnituda:6, tolqin:true}},
    {sarlavha:'Magnituda: har birlik ≈ 32 marta', matn:'Magnituda 1 birlikka oshsa, ajralgan energiya taxminan 32 marta, 2 birlikka oshsa — taxminan 1 000 marta ortadi. Magnitudani 8 ga qo‘yib, to‘lqinlarni kuzating: amplituda ancha katta.', holat:{rejim:'zilzila', magnituda:8, tolqin:true}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Vulqon va zilzilani boshqaring', holat:{rejim:'vulqon', otilish:false, magnituda:5},
    topshiriqlar:[
      {shart:'Erigan jins to‘plangan joy — <b>magma o‘chog‘ini</b> bosing.', hodisa:'kbg-vulqon', kod:"ev.nom==='magma_ochogi'", izoh:'To‘g‘ri — <b>magma o‘chog‘i</b>. Bu yerdan magma jerlo orqali yuqoriga ko‘tariladi.'},
      {shart:'Vulqonni <b>otilishga</b> keltiring.', hodisa:'kbg-vulqon-holat', kod:"ev.rejim==='vulqon'&&ev.otilish===true", izoh:'To‘g‘ri — gaz bosimi magmani itarib chiqardi: kul buluti, bombalar va lava oqimi.'},
      {shart:'Vulqon tepasidagi kosasimon chuqurlik — <b>kraterni</b> bosing.', hodisa:'kbg-vulqon', kod:"ev.nom==='krater'", izoh:'To‘g‘ri — <b>krater</b>. Uning diametri bir necha o‘n metrdan bir necha kilometrgacha bo‘ladi.'},
      {shart:'<b>Zilzila</b> rejimiga o‘ting va zilzila o‘chog‘ini — <b>gipotsentrni</b> bosing.', hodisa:'kbg-vulqon', kod:"ev.rejim==='zilzila'&&ev.nom==='gipotsentr'", izoh:'To‘g‘ri — <b>gipotsentr</b>: siljish boshlangan yer ostidagi nuqta. 1966-yilgi Toshkent zilzilasida u atigi 3–8 km chuqurlikda bo‘lgan.'},
      {shart:'Magnitudani <b>7 yoki undan katta</b> qilib, zilzilani boshlang.', hodisa:'kbg-zilzila', kod:"ev.magnituda>=7", izoh:'To‘g‘ri — 7 magnitudali zilzila 5 magnitudalidan taxminan 1 000 marta ko‘p energiya ajratadi.'},
      {shart:'Silkinish eng kuchli bo‘ladigan yer yuzasi nuqtasi — <b>epitsentrni</b> bosing.', hodisa:'kbg-vulqon', kod:"ev.nom==='epitsentr'", izoh:'To‘g‘ri — <b>epitsentr</b> gipotsentrning to‘g‘ri ustida joylashgan.'}
    ]},
  test:[
    {s:'Yer ostidagi erigan jins yuzaga chiqqach qanday ataladi?', v:['Magma','Lava','Tuf','Pemza'], t:1, izoh:'<b>Lava</b>. Yer ostida u magma deyiladi; lava harorati ≈ 700–1 200 °C.'},
    {s:'Vulqon tepasidagi kosasimon chuqurlik nima?', v:['Jerlo','Dayka','Krater','Magma o‘chog‘i'], t:2, izoh:'<b>Krater</b>. Jerlo — magma ko‘tariladigan kanal, dayka — qotgan magma devori.'},
    {s:'Zilzila o‘chog‘ining ustidagi yer yuzasi nuqtasi nima deb ataladi?', v:['Gipotsentr','Epitsentr','Krater','Seysmograf'], t:1, izoh:'<b>Epitsentr</b>. Gipotsentr — yer ostidagi o‘choqning o‘zi.'},
    {s:'Qaysi seysmik to‘lqinlar eng tez tarqaladi va stansiyaga birinchi yetib keladi?', v:['S-to‘lqinlar','Sirt to‘lqinlari','P-to‘lqinlar','Barcha to‘lqinlar bir vaqtda'], t:2, izoh:'<b>P-to‘lqinlar</b> (bo‘ylama). S-to‘lqinlar sekinroq, sirt to‘lqinlari eng sekin.'},
    {s:'Magnituda 1 birlikka oshsa, ajralgan energiya taxminan necha marta ortadi?', v:['2 marta','10 marta','32 marta','100 marta'], t:2, izoh:'Taxminan <b>32 marta</b> (10^1,5). Seysmograf yozuvidagi amplituda esa 10 marta ortadi.'},
    {s:'1966-yilgi Toshkent zilzilasi qaysi kuni sodir bo‘lgan?', v:['1966-yil 26-aprel','1966-yil 9-may','1976-yil 8-aprel','1984-yil 20-mart'], t:0, izoh:'<b>1966-yil 26-aprel</b>, mahalliy vaqt 05:23. 1976 va 1984-yillardagi sanalar — Gazli zilzilalari.'},
    {s:'Toshkent zilzilasi magnitudasi unchalik katta bo‘lmasa ham (≈ 5,2), nega kuchli vayronagarchilik keltirgan?', v:['O‘choq juda sayoz — 3–8 km chuqurlikda, to‘g‘ri shahar ostida bo‘lgan','Vulqon otilishi bilan birga bo‘lgan','Tsunami kelgan','Qishda bo‘lgan'], t:0, izoh:'<b>O‘choq juda sayoz — 3–8 km chuqurlikda, to‘g‘ri shahar ostida bo‘lgan</b>. Shuning uchun markazda silkinish MSK-64 bo‘yicha 8–9 ballga yetgan.'},
    {s:'Dunyo vulqonlarining taxminan 75 % i qayerda joylashgan?', v:['Alp–Himolay mintaqasida','Tinch okean «Olovli halqasi»da','Afrika riftida','Arktikada'], t:1, izoh:'<b>Tinch okean «Olovli halqasi»da</b> — u dunyo zilzilalarining ≈ 90 % iga ham to‘g‘ri keladi.'},
    {s:'Zilzila paytida bino ichida bo‘lsangiz, eng to‘g‘ri harakat qaysi?', v:['Darhol tashqariga yugurish','Liftga tushib pastga chiqish','Yerga cho‘kish, mustahkam stol ostiga pana qilish va ushlab turish','Deraza oldida turish'], t:2, izoh:'<b>Yerga cho‘kish, mustahkam stol ostiga pana qilish va ushlab turish</b> («Drop, Cover, Hold On»). Silkinish paytida yugurish, liftdan foydalanish va deraza yonida turish xavfli.'},
    {s:'Magnituda bilan intensivlik (ball) farqi nimada?', v:['Farqi yo‘q','Magnituda — ajralgan energiya, ball — ma’lum joydagi silkinish kuchi','Ball — energiya, magnituda — vayronagarchilik','Magnituda faqat vulqonlar uchun'], t:1, izoh:'<b>Magnituda — ajralgan energiya, ball — ma’lum joydagi silkinish kuchi</b>. Bitta zilzilaning magnitudasi bitta, ballari esa joyga qarab turlicha.'},
    {s:'Qaysi vulqon qalqonsimon vulqonga misol?', v:['Fudziyama','Vezuviy','Mauna-Loa','Klyuchevskaya Sopka'], t:2, izoh:'<b>Mauna-Loa</b> (Gavayi) — suyuq bazalt lavasidan hosil bo‘lgan keng, yotiq vulqon. Qolganlari — stratovulqonlar.'},
    {s:'Mil. 79-yilda Pompey shahrini ko‘mib yuborgan vulqon qaysi?', v:['Etna','Vezuviy','Tambora','Krakatau'], t:1, izoh:'<b>Vezuviy</b> (Italiya). Tambora — 1815-yil (Indoneziya), Krakatau — 1883-yil.'},
    {tur:'3d', s:'Kesilgan vulqonda <b>magma o‘chog‘ini</b> bosing.', hodisa:'kbg-vulqon', kalit:'nom', togri:['magma_ochogi'], v:['Magma o‘chog‘i','boshqa qism'], t:0,
     izoh:'<b>Magma o‘chog‘i</b> — vulqon ostidagi erigan jins to‘plangan joy; magma undan jerlo orqali kraterga ko‘tariladi.'}
  ],
  yordamchi:[
    {s:'O‘zbekistonda vulqon bormi?', j:'Hozir O‘zbekistonda faol vulqon yo‘q. Lekin respublika seysmik faol hududda joylashgan: Tyan-Shan va Pomir-Oloy tog‘lari hozir ham ko‘tarilmoqda, shuning uchun zilzilalar bo‘lib turadi (1966 — Toshkent, 1976 va 1984 — Gazli). Qurama tog‘lari kabi joylarda juda qadimgi vulqon faoliyatidan qolgan jinslar uchraydi.', kalit:['o‘zbekiston','vulqon','bormi']},
    {s:'Zilzilani oldindan aytib bo‘ladimi?', j:'Aniq vaqti va joyini oldindan aytib bo‘lmaydi. Olimlar xavfli hududlarni va u yerda kutiladigan kuchni (seysmik xavf xaritalari) baholaydi. Shuning uchun binolarni zilzilaga chidamli qurish va xavfsizlik qoidalarini o‘rganish eng muhim himoya hisoblanadi. 1966-yildagi zilziladan keyin Toshkentda Seysmologiya instituti tashkil etilgan.', kalit:['oldindan','bashorat','aytib']},
    {s:'Epitsentrgacha masofani qanday topish mumkin?', j:'Seysmogrammada P-to‘lqin va S-to‘lqin yetib kelgan vaqtlar farqini o‘lchang. Yer po‘stida taxminan har 1 soniya farq ≈ 8 km masofaga to‘g‘ri keladi (P ≈ 6 km/s, S ≈ 3,5 km/s bo‘lsa). Uch stansiyadan olingan masofalar bo‘yicha xaritada uchta aylana chizilsa, ular kesishgan joy — epitsentr.', kalit:['masofa','epitsentr','topish','seysmograf']}
  ],
  xavfsizlik:[
    '<b>Silkinish paytida bino ichida:</b> yerga cho‘king, mustahkam stol ostiga pana qiling (yoki boshingiz va bo‘yningizni qo‘llaringiz bilan yoping), silkinish tugaguncha ushlab turing.',
    'Deraza, oyna, shkaf va osilgan buyumlardan uzoq turing. Silkinish paytida zinaga va tashqariga yugurmang — qulayotgan oyna va g‘ishtlar xavfli. <b>Liftdan foydalanmang.</b>',
    'Eski qo‘llanmalarda «eshik romida turing» deyilgan; zamonaviy binolarda eshik romi xavfsizroq emas va uchib kelgan buyumlardan himoya qilmaydi.',
    '<b>Tashqarida:</b> bino, daraxt, elektr simlari va ustunlardan uzoq ochiq joyga o‘ting va yerga cho‘king.',
    '<b>Silkinishdan keyin:</b> xotirjam chiqing, gaz va elektrni o‘chiring (iloji bo‘lsa), takroriy silkinishlarga (aftershoklarga) tayyor turing, favqulodda xizmatlar (101, 103, 112) ko‘rsatmasiga amal qiling.'
  ],
  maqola:[
    {sarlavha:'Vulqon qanday tuzilgan va nega otiladi', xatboshilar:[
      'Vulqon — magma yer yuzasiga chiqadigan joy va shu magmadan hosil bo‘lgan tog‘. Yer ostida, odatda bir necha kilometr chuqurlikda <b>magma o‘chog‘i</b> joylashadi. Magma atrofidagi qattiq jinslardan yengil bo‘lgani uchun yuqoriga intiladi va yoriqlar orqali <b>jerlo</b> — vulqon kanalini hosil qiladi. Kanal yuzaga <b>krater</b> bilan tugaydi.',
      'Magma tarkibida erigan gazlar — asosan suv bug‘i, karbonat angidrid va oltingugurt birikmalari bor. Magma ko‘tarilgan sari bosim kamayadi, gazlar ajralib pufakchalar hosil qiladi — xuddi ochilgan gazli ichimlikdagidek. Magma quyuq (yopishqoq) bo‘lsa, gaz chiqa olmay bosim to‘planadi va portlovchi otilish bo‘ladi: kul buluti, vulqon bombalari, qaynoq piroklastik oqimlar. Suyuq bazalt magmasi esa sokinroq, lava oqimi bilan otiladi.',
      'Yuzaga chiqqan magma <b>lava</b> deb ataladi, uning harorati 700–1 200 °C atrofida. Lava va kul qatlamlari navbatlashib to‘planishidan tik konusli <b>stratovulqonlar</b> paydo bo‘ladi (Fudziyama, Vezuviy). Suyuq lavadan keng, yotiq <b>qalqonsimon</b> vulqonlar hosil bo‘ladi (Gavayidagi Mauna-Loa).'
    ]},
    {sarlavha:'Vulqonlar qayerda joylashgan', xatboshilar:[
      'USGS ma’lumotiga ko‘ra, dunyoda okean ostidagilardan tashqari taxminan 1 350 ta potensial faol vulqon bor, ulardan 500 ga yaqini so‘nggi 100 yilda otilgan. Ular tasodifiy emas, asosan litosfera plitalarining chegaralarida joylashgan.',
      'Tinch okeanni o‘rab turgan «Olovli halqa»ga dunyo vulqonlarining taxminan 75 % i va zilzilalarining taxminan 90 % i to‘g‘ri keladi. Bu yerda okean plitalari boshqa plitalar ostiga botadi (subduksiya): Yaponiya, Kamchatka, Alyaska, And tog‘lari. Kamchatkadagi Klyuchevskaya Sopka — Yevrosiyodagi eng baland faol vulqon (≈ 4 750 m, manbalarda qiymat biroz farq qiladi).',
      'Vulqonlar plitalar uzoqlashadigan joylarda ham bor — Islandiya o‘rta Atlantika tizmasining ustida joylashgan. Ba’zi vulqonlar plita o‘rtasida, mantiyadagi «issiq nuqta» ustida paydo bo‘ladi — Gavayi orollari shunday hosil bo‘lgan.',
      'Tarixdagi mashhur otilishlar: mil. 79-yilda Vezuviy Pompey shahrini kul ostida qoldirgan; 1815-yilda Indoneziyadagi Tambora otilishi shunchalik kuchli bo‘lganki, keyingi 1816-yil Yevropa va Shimoliy Amerikada «yozsiz yil» deb nom olgan; 1883-yilda Krakatau otilishi dunyoning narigi chekkasida ham eshitilgan.'
    ]},
    {sarlavha:'Zilzila: o‘choq, epitsentr va seysmik to‘lqinlar', xatboshilar:[
      'Litosfera plitalari harakatlanganda yer po‘stidagi jinslar egiladi va ularda kuchlanish to‘planadi. Kuchlanish jinslarning mustahkamligidan oshganda ular <b>yoriq</b> (tektonik uzilma) bo‘ylab bir zumda siljiydi — to‘plangan energiya to‘lqinlar ko‘rinishida ajraladi. Siljish boshlangan yer ostidagi joy <b>gipotsentr</b> (o‘choq), uning to‘g‘ri ustidagi yer yuzasi nuqtasi <b>epitsentr</b> deb ataladi.',
      'O‘choqdan uch xil to‘lqin tarqaladi. <b>P-to‘lqinlar</b> (bo‘ylama) — jinslarni siqib-cho‘zib tarqaladi, eng tez va stansiyaga birinchi keladi. <b>S-to‘lqinlar</b> (ko‘ndalang) — jinslarni yon tomonga siljitadi, sekinroq va suyuqlikda tarqalmaydi. Yer yuzasi bo‘ylab tarqaladigan <b>sirt to‘lqinlari</b> eng sekin, lekin binolarni eng ko‘p vayron qiladi.',
      'Seysmograf — tebranishlarni yozib oluvchi asbob. Seysmogrammada P va S to‘lqinlar kelgan vaqtlar farqi qancha katta bo‘lsa, epitsentr shuncha uzoqda. Yer po‘stida har 1 soniya farq taxminan 8 km ga to‘g‘ri keladi. Uchta stansiya ma’lumoti bo‘yicha epitsentr aniq topiladi.',
      'Zilzila kuchi ikki xil o‘lchanadi. <b>Magnituda</b> — ajralgan energiya o‘lchovi (1935-yilda Ch. Rixter shkalasi taklif etilgan, hozir asosan moment magnitudasi ishlatiladi). Magnituda 1 birlikka oshsa, energiya taxminan 32 marta ortadi. <b>Intensivlik</b> esa ma’lum joydagi silkinish oqibatlarini ballarda baholaydi — O‘zbekistonda 12 ballik MSK-64 shkalasi qo‘llanadi.'
    ]},
    {sarlavha:'O‘zbekistondagi zilzilalar: Toshkent (1966) va Gazli', xatboshilar:[
      'O‘zbekiston seysmik faol hududda joylashgan: Tyan-Shan va Pomir-Oloy tog‘lari hanuz ko‘tarilmoqda. 1966-yil 26-aprel kuni mahalliy vaqt bilan soat 05:23 da (ba’zi manbalarda 05:22) Toshkentda kuchli zilzila bo‘lgan. Uning magnitudasi taxminan 5,2 (manbalarda 5,1–5,3), lekin o‘chog‘i juda sayoz — 3–8 km chuqurlikda, to‘g‘ridan-to‘g‘ri shahar markazi ostida bo‘lgan. Shu sababli epitsentrda silkinish MSK-64 shkalasi bo‘yicha 8–9 ballga yetgan.',
      'Zilzila natijasida shaharning katta qismi — asosan eski paxsa va g‘isht uylar vayron bo‘lgan, 200–300 ming kishi boshpanasiz qolgan. Rasmiy ma’lumotda 15 kishi halok bo‘lgani aytilgan; ayrim tadqiqotchilar haqiqiy son ancha ko‘p bo‘lgan deb hisoblaydi (200 gacha va undan ortiq baholar bor). Kuchli silkinishlar oylar davomida takrorlangan.',
      'Shahar qisqa muddatda qayta qurilgan: 1970-yilgacha 100 mingga yaqin yangi uy barpo etilgan. 1966-yilda O‘zbekiston Fanlar akademiyasi Seysmologiya instituti tashkil etilgan. 1976-yilda epitsentr joyida «Mardlik» yodgorligi o‘rnatilgan. Buxoro viloyatidagi Gazli yaqinida 1976-yil 8-aprel va 17-mayda hamda 1984-yil 20-martda (Grinvich vaqti bo‘yicha 19-mart kechasi) Ms ≈ 7 magnitudali zilzilalar bo‘lgan.'
    ]},
    {sarlavha:'Zilzila paytida qanday harakat qilish kerak', xatboshilar:[
      'Zamonaviy xalqaro tavsiya — <b>«Yerga cho‘king, pana qiling, ushlab turing»</b> (ingliz tilida «Drop, Cover, Hold On»). Silkinish boshlanishi bilan yerga cho‘king, mustahkam stol ostiga kiring yoki boshingiz va bo‘yningizni qo‘llaringiz bilan yoping va silkinish tugaguncha stol oyog‘ini ushlab turing.',
      'Silkinish paytida tashqariga yugurmang: harakatlanayotgan yerda yiqilish, binodan tushayotgan oyna va g‘ishtlardan jarohatlanish xavfi katta. Liftdan foydalanmang, deraza va og‘ir shkaflardan uzoqlashing. Eski qo‘llanmalarda eshik romida turish tavsiya qilingan, lekin zamonaviy binolarda eshik romi xavfsizroq emas.',
      'Tashqarida bo‘lsangiz — binolar, daraxtlar, elektr simlaridan uzoq ochiq joyga o‘ting. Silkinish tugagach, xotirjam binodan chiqing, takroriy silkinishlarga tayyor turing, yaradorlarga yordam bering va favqulodda xizmatlar ko‘rsatmalariga amal qiling. Maktablarda muntazam o‘quv mashg‘ulotlari o‘tkazish hayotni saqlashning eng yaxshi usuli.'
    ]}
  ],
  formulalar:[
    ['d ≈ Δt · (v_P · v_S) / (v_P − v_S)','Epitsentrgacha masofa; v_P = 6 km/s, v_S = 3,5 km/s bo‘lsa d ≈ 8,4 · Δt (km)'],
    ['Δt = 10 s → d ≈ 8,4 · 10 ≈ 84 km','Seysmogrammada S-to‘lqin P dan 10 s keyin kelgan (sxematik misol)'],
    ['E₂ / E₁ ≈ 32^(M₂ − M₁)','Magnituda farqi bo‘yicha energiya nisbati: 7 va 5 → 32² ≈ 1 000 marta'],
    ['A₂ / A₁ = 10^(M₂ − M₁)','Seysmograf amplitudasi: +1 magnituda → 10 marta katta tebranish'],
    ['t = s / v','To‘lqinning yetib kelish vaqti: 60 km ni P-to‘lqin 60 / 6 = 10 s da bosib o‘tadi']
  ],
  qiziqarli:[
    'Gavayidagi Mauna-Loa — hajmi bo‘yicha Yerdagi eng yirik faol vulqonlardan biri; uning asosi okean tubida.',
    '1815-yilgi Tambora otilishidan keyin atmosferaga chiqqan kul va gazlar Quyosh nurini to‘sib, 1816-yilni «yozsiz yil»ga aylantirgan.',
    'Dunyodagi eng baland vulqon — And tog‘laridagi Ohos-del-Salado (≈ 6 893 m).',
    'Toshkentdagi «Mardlik» yodgorligi (1976) zilzila epitsentri joyida o‘rnatilgan; soat siferblati 05:24 ni ko‘rsatadi (yodgorlikdagi vaqt rasmiy vaqtdan biroz farq qiladi).',
    'Zilzila paytida hayvonlar ko‘pincha P-to‘lqinni odamlardan oldin sezadi — ular kuchli S-to‘lqindan bir necha soniya oldin bezovta bo‘ladi.'
  ],
  lugat:[
    ['Vulqon','Magma yer yuzasiga chiqadigan joy va shundan hosil bo‘lgan tog‘.'],
    ['Magma','Yer ostidagi erigan tog‘ jinsi.'],
    ['Lava','Yer yuzasiga chiqqan magma.'],
    ['Krater','Vulqon tepasidagi kosasimon chuqurlik.'],
    ['Jerlo','Magma ko‘tariladigan vulqon kanali.'],
    ['Dayka','Qatlamlarni kesib o‘tgan qotgan magma devori.'],
    ['Zilzila','Yer po‘stining to‘satdan siljishidan kelib chiqqan silkinish.'],
    ['Gipotsentr','Zilzila o‘chog‘i — siljish boshlangan yer ostidagi joy.'],
    ['Epitsentr','Gipotsentr ustidagi yer yuzasi nuqtasi.'],
    ['Seysmograf','Yer tebranishlarini yozib oluvchi asbob.'],
    ['Magnituda','Zilzilada ajralgan energiya o‘lchovi.'],
    ['Intensivlik (ball)','Ma’lum joydagi silkinish kuchi.'],
    ['Aftershok','Asosiy zilziladan keyingi takroriy silkinish.']
  ],
  manba:'5–6-sinf «Geografiya» darsliklari (O‘zbekiston, amaldagi nashrlar); USGS «About Volcanoes» (≈ 1 350 potensial faol vulqon, ≈ 500 tasi so‘nggi 100 yilda); USGS «Earthquake Magnitude, Energy Release, and Shaking Intensity» (+1 magnituda ≈ 32 marta energiya); Earle «Physical Geology», 9.1 (seysmik tezliklar); Britannica «Lava» (700–1 200 °C); National Geographic «Ring of Fire» (75 % vulqon, 90 % zilzila); Wikipedia (inglizcha): «1966 Tashkent earthquake» (05:23, Mw 5,1–5,3, chuqurlik 3–8 km, MSK VIII–IX, rasmiy 15 halok, 200–300 ming uysiz), «Gazli earthquakes» va BSSA 75(5):1465 (1976, 1984, Ms 7,0), «Ojos del Salado», «Klyuchevskaya Sopka»; Great ShakeOut / Earthquake Country Alliance «Drop, Cover, and Hold On». Manbalar farqi: Toshkent zilzilasi vaqti 05:22 yoki 05:23, magnituda 5,1–5,3, halok bo‘lganlar 15 (rasmiy) yoki 200 gacha (baholar); seysmik tezliklar — oraliqlar.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D kesilgan model, seysmogramma bilan ishlash, amaliy xavfsizlik mashqi',
    maqsad:{talimiy:'Vulqon tuzilishi va otilish sabablarini, zilzila o‘chog‘i, epitsentr, seysmik to‘lqinlar, magnituda va intensivlik tushunchalarini o‘rganish.',
      tarbiyaviy:'Favqulodda vaziyatda o‘zini va boshqalarni himoya qilishga mas’uliyat, 1966-yil fojiasidan keyin shaharni tiklagan insonlarga hurmat tarbiyalash.',
      rivojlantiruvchi:'Model bilan ishlash, seysmogramma bo‘yicha oddiy hisob-kitob, tez va to‘g‘ri qaror qabul qilish ko‘nikmasini rivojlantirish.'},
    natijalar:['Vulqonning 5 qismini modelda ko‘rsatadi','Gipotsentr va epitsentrni farqlaydi','P- va S-to‘lqinlarni solishtiradi','Magnituda va ballni farqlaydi','«Yerga cho‘k, pana qil, ushlab tur» qoidasini bajarib ko‘rsatadi'],
    jihozlar:['MAKON sahnasi «Vulqonlar va zilzilalar»','Proyektor yoki interaktiv doska','Dunyo tabiiy xaritasi (Olovli halqa)','Seysmogramma namunasi (tarqatma)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–7','<b>Motivatsiya.</b> Toshkentdagi «Mardlik» yodgorligi surati: «Soat nega 5 dan oshganini ko‘rsatadi?»','Taxmin aytadi.'],
      ['7–17','<b>Vulqon.</b> MAKON da kesilgan vulqon qismlari, otilish; stratovulqon va qalqonsimon vulqonni solishtirish; Olovli halqa xaritada.','Qismlarni bosib nomlaydi, daftarga chizadi.'],
      ['17–27','<b>Zilzila.</b> Yoriq, gipotsentr, epitsentr; P/S to‘lqinlar; magnituda slayderi. Seysmogramma bo‘yicha masofani hisoblash (Δt·8 km).','Hisoblaydi, natijani aytadi.'],
      ['27–33','<b>Toshkent 1966 va Gazli.</b> Faktlar, manbalar farqi (vaqt, halok bo‘lganlar soni).','Tinglaydi, savol beradi.'],
      ['33–38','<b>Xavfsizlik mashqi.</b> «Yerga cho‘k, pana qil, ushlab tur» — sinfda bajarib ko‘rish; evakuatsiya yo‘li.','Mashqni bajaradi.'],
      ['38–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Gipotsentr','Zilzila o‘chog‘i.'],['Epitsentr','O‘choq ustidagi yuza nuqtasi.'],['Magnituda','Ajralgan energiya o‘lchovi.'],['Lava','Yuzaga chiqqan magma.'],['Krater','Vulqon tepasidagi chuqurlik.']],
    savollar:[['Toshkent zilzilasi sanasi?','1966-yil 26-aprel, 05:23'],['Qaysi to‘lqin eng tez?','P-to‘lqin'],['+1 magnituda energiyani necha marta oshiradi?','≈ 32 marta'],['Olovli halqada vulqonlarning necha foizi?','≈ 75 %'],['Zilzila paytida bino ichida nima qilinadi?','Yerga cho‘kish, pana qilish, ushlab turish']],
    uy:'Darslikdagi mavzuni o‘qish; (1) kesilgan vulqon chizmasini chizib, 6 qismini belgilash; (2) S-to‘lqin P-to‘lqindan 15 s keyin kelgan bo‘lsa, epitsentrgacha masofani hisoblash (javob: ≈ 15 · 8,4 ≈ 126 km); (3) oila bilan uydagi «xavfsiz joylar» va evakuatsiya rejasini tuzish.',
    manba:'5–6-sinf «Geografiya» darsliklari; USGS; Great ShakeOut «Drop, Cover, Hold On»; Wikipedia «1966 Tashkent earthquake»'
  }
};
DT.kbg_vulqon = {
  magma_ochogi:{nom:'Magma o‘chog‘i', sarlavha2:'Vulqon · yer ostidagi qism',
    jadval:[['Joyi','odatda bir necha km chuqurlikda (taxminiy)'],['Tarkibi','erigan jins, kristallar va erigan gazlar'],['Vazifasi','vulqonni magma bilan ta’minlaydi']],
    matn:'Magma o‘chog‘ida bosim oshib borsa, magma jerlo orqali ko‘tariladi. Olimlar o‘choq to‘lishini yer yuzasining biroz ko‘tarilishi va mayda zilzilalar orqali kuzatadi.',
    manba:'USGS «About Volcanoes»'},
  jerlo:{nom:'Jerlo (vulqon kanali)', sarlavha2:'Vulqon · magma yo‘li',
    jadval:[['Ta’rifi','magma o‘chog‘idan kraterga olib chiquvchi kanal'],['Otilishdan keyin','magma kanalda qotib, «tiqin» hosil qiladi']],
    matn:'Qotib qolgan tiqin keyingi otilishda gaz bosimi bilan portlab chiqishi mumkin — shuning uchun uzoq «uxlagan» vulqonlar ba’zan juda kuchli otiladi.',
    manba:'5–6-sinf «Geografiya» darsliklari'},
  krater:{nom:'Krater', sarlavha2:'Vulqon tepasi',
    jadval:[['Shakli','kosasimon yoki voronkasimon chuqurlik'],['O‘lchami','bir necha o‘n m dan bir necha km gacha'],['Kaldera','cho‘kish natijasida hosil bo‘lgan juda katta krater']],
    matn:'Ba’zi so‘ngan vulqonlarning kraterida ko‘l hosil bo‘ladi. Katta otilishdan keyin vulqon tepasi cho‘kib, kilometrlab keladigan kaldera paydo bo‘lishi mumkin.',
    manba:'Britannica «Crater», «Caldera»'},
  konus:{nom:'Vulqon konusi', sarlavha2:'Stratovulqon qatlamlari',
    jadval:[['Tuzilishi','lava va kul (tefra) qatlamlari navbatlashadi'],['Misollar','Fudziyama, Vezuviy, Klyuchevskaya Sopka']],
    matn:'Har bir otilish konusga yangi qatlam qo‘shadi, shuning uchun stratovulqonlar asrlar davomida o‘sadi. Kesimda bu qatlamlar daraxt yillik halqalariga o‘xshaydi.',
    manba:'USGS «About Volcanoes»'},
  lava:{nom:'Lava', sarlavha2:'Yuzaga chiqqan magma',
    jadval:[['Harorati','≈ 700–1 200 °C'],['Bazalt lavasi','suyuq, uzoqqa oqadi'],['Riolit/andezit lavasi','quyuq, sekin oqadi']],
    matn:'Lava qotib vulqon jinslarini hosil qiladi: bazalt, andezit, pemza (g‘ovak, suvda suzadi), obsidian (vulqon shishasi).',
    manba:'Britannica «Lava»'},
  kul:{nom:'Vulqon kuli va bombalar', sarlavha2:'Portlovchi otilish',
    jadval:[['Kul','diametri 2 mm dan kichik jins va shisha bo‘lakchalari'],['Bombalar','havoda qotgan yirik lava bo‘laklari'],['Xavfi','samolyot dvigatellari, nafas yo‘llari, tomlar qulashi']],
    matn:'Kul buluti o‘nlab kilometr balandlikka ko‘tarilib, shamol bilan minglab kilometrga tarqalishi mumkin. 1815-yilgi Tambora otilishidan keyin 1816-yil «yozsiz yil» bo‘lgan.',
    manba:'USGS Volcano Hazards Program; Wikipedia «1815 eruption of Mount Tambora»'},
  yon_krater:{nom:'Yon krater', sarlavha2:'Parazit konus',
    jadval:[['Hosil bo‘lishi','magma asosiy kanaldan yon yoriq bo‘ylab chiqadi'],['Misol','Etna yonbag‘irlarida yuzlab yon konuslar bor']],
    matn:'Yon kraterlar ko‘pincha kichik shlak konuslari ko‘rinishida bo‘ladi va yonbag‘irdagi qishloqlar uchun kutilmagan xavf tug‘diradi.',
    manba:'Britannica «Mount Etna»'},
  dayka:{nom:'Dayka', sarlavha2:'Qotgan magma devori',
    jadval:[['Ta’rifi','qatlamlarni kesib o‘tgan, yoriqda qotgan magma'],['Sill','qatlamlar orasida gorizontal qotgan magma']],
    matn:'Atrofidagi yumshoq jinslar yemirilgach, mustahkam daykalar yer yuzasida devorlardek ochilib qoladi.',
    manba:'Britannica «Dike»'},
  gipotsentr:{nom:'Gipotsentr (zilzila o‘chog‘i)', sarlavha2:'Zilzila · yer ostida',
    jadval:[['Ta’rifi','yoriq bo‘ylab siljish boshlangan joy'],['Sayoz','0–70 km'],['Toshkent, 1966','3–8 km — juda sayoz']],
    matn:'O‘choq qancha sayoz bo‘lsa, yuzadagi silkinish shuncha kuchli bo‘ladi. Shuning uchun o‘rtacha magnitudali Toshkent zilzilasi katta vayronagarchilik keltirgan.',
    manba:'Wikipedia «1966 Tashkent earthquake»; USGS'},
  epitsentr:{nom:'Epitsentr', sarlavha2:'Zilzila · yer yuzasi',
    jadval:[['Ta’rifi','gipotsentrning to‘g‘ri ustidagi yuza nuqtasi'],['Silkinish','odatda eng kuchli'],['Toshkent, 1966','41°10′ sh.k., 69°08′ sh.u. — shahar markazi']],
    matn:'Epitsentr kamida uchta seysmik stansiya ma’lumoti bo‘yicha aniqlanadi. Toshkentda epitsentr joyida 1976-yilda «Mardlik» yodgorligi o‘rnatilgan.',
    manba:'Wikipedia «1966 Tashkent earthquake»'},
  yoriq:{nom:'Yoriq (tektonik uzilma)', sarlavha2:'Zilzila manbai',
    jadval:[['Ta’rifi','jinslar siljiydigan yoriq tekisligi'],['Turlari','tushuvchi, ko‘taruvchi (surilma), yon siljish'],['Misol','San-Andreas yorig‘i (AQSh)']],
    matn:'Yoriq ikki tomonidagi jinslar ishqalanish tufayli «tiqilib» turadi. Kuchlanish to‘planib, bir zumda bo‘shalganda zilzila bo‘ladi.',
    manba:'USGS «Earthquake Glossary»'},
  p_tolqin:{nom:'P-to‘lqin', sarlavha2:'Birlamchi (bo‘ylama) to‘lqin',
    jadval:[['Tezligi','qattiq jinslarda ≈ 5–7 km/s (taxminiy; manbalarda 3–6,5 km/s ham)'],['Harakati','siqilish–cho‘zilish, to‘lqin yo‘nalishida'],['Muhit','qattiq, suyuq va gazda tarqaladi']],
    matn:'P-to‘lqin eng tez bo‘lgani uchun stansiyaga birinchi keladi. Zamonaviy «erta ogohlantirish» tizimlari P-to‘lqinni sezib, kuchli S-to‘lqin kelishidan bir necha soniya oldin signal beradi.',
    manba:'Earle «Physical Geology» 9.1; USGS'},
  s_tolqin:{nom:'S-to‘lqin', sarlavha2:'Ikkilamchi (ko‘ndalang) to‘lqin',
    jadval:[['Tezligi','qattiq jinslarda ≈ 3–4 km/s (manbalarda 1,5–3,8 km/s)'],['Harakati','to‘lqin yo‘nalishiga ko‘ndalang'],['Muhit','suyuqlikda tarqalmaydi']],
    matn:'S-to‘lqinlar Yerning tashqi yadrosidan o‘tmaydi — shundan olimlar tashqi yadro suyuq ekanini aniqlagan.',
    manba:'Earle «Physical Geology» 9.1'},
  sirt_tolqin:{nom:'Sirt to‘lqinlari', sarlavha2:'Eng vayronkor to‘lqinlar',
    jadval:[['Tezligi','eng sekin'],['Turlari','Lyav va Reley to‘lqinlari'],['Ta’siri','yer yuzasini to‘lqinsimon silkitadi']],
    matn:'Sirt to‘lqinlari eng oxirida keladi, lekin amplitudasi katta va davomli bo‘lgani uchun binolarni eng ko‘p shikastlaydi.',
    manba:'USGS «Earthquake Glossary»'},
  seysmograf:{nom:'Seysmograf', sarlavha2:'Tebranishni yozuvchi asbob',
    jadval:[['Yozuvi','seysmogramma'],['Birinchi keladi','P-to‘lqin, keyin S va sirt to‘lqinlari'],['Masofa','Δt(S−P) × ≈ 8 km (yer po‘stida, taxminiy)']],
    matn:'Seysmogrammadagi eng katta tebranish amplitudasi bo‘yicha magnituda hisoblanadi. O‘zbekistonda seysmik stansiyalar tarmog‘i Fanlar akademiyasi Seysmologiya instituti tomonidan yuritiladi.',
    manba:'USGS; Wikipedia «1966 Tashkent earthquake» (Seysmologiya instituti, 1966)'}
};


/* ===== geo-suv-aylanishi ===== */
bogla('geografiya', 'Suvning tabiatda aylanishi (gidrosfera)', 'geo-suv-aylanishi', 'Bug‘lanish, kondensatsiya, yog‘in, oqim, sizilish — 3D manzarada; Yer suvlari taqsimoti');
D['geo-suv-aylanishi'] = {
  fan:'geografiya', qisqaNom:'Suv aylanishi', nom:'Suvning tabiatda aylanishi (gidrosfera)',
  qisqa:'6-sinf · Geografiya · gidrosfera',
  sinf:'6-sinf',
  sahna:'kbg_suv',
  kor:{
    sarlavha:'Bitta tomchining uzoq sayohati',
    matn:'Gidrosfera — Yerning suv qobig‘i: okean va dengizlar, daryo va ko‘llar, muzliklar, yer osti suvlari va havodagi suv bug‘i. Bu suvlar bir-biridan ajralgan emas — ular to‘xtovsiz aylanib turadi. Quyosh issiqligi okean suvini bug‘latadi, bug‘ yuqorida sovib bulutga aylanadi, bulutdan yomg‘ir va qor yog‘adi, suv daryolar va yer osti orqali yana okeanga qaytadi. 3D manzarada har bir jarayonni alohida yoqib ko‘ring, obyektlarni bosib ma’lumot oling. Model sxematik.',
    punktlar:[
      '<b>Okeanlar:</b> Yerdagi barcha suvning ≈ 96,5 % i (USGS)',
      '<b>Chuchuk suv:</b> jami suvning atigi ≈ 2,5 % i, uning ≈ 68,7 % i muzliklarda, ≈ 30,1 % i yer ostida',
      '<b>Harakatlantiruvchi kuchlar:</b> Quyosh energiyasi (bug‘lanish) va og‘irlik kuchi (yog‘in, oqim)',
      '<b>Havodagi suv:</b> bug‘ molekulasi atmosferada o‘rtacha ≈ 9 kun turadi'
    ]
  },
  bolimlar:[
    {sarlavha:'Yerdagi suv qayerda? (USGS)', jadval:[
      ['Okean va dengizlar','≈ 96,5 % (≈ 1 338 mln km³)'],
      ['Muzliklar va doimiy qor','≈ 1,74 % jami suvning; chuchuk suvning ≈ 68,7 % i'],
      ['Chuchuk yer osti suvlari','≈ 0,76 % jami suvning; chuchuk suvning ≈ 30,1 % i'],
      ['Chuchuk ko‘llar','≈ 91 000 km³'],
      ['Atmosfera','≈ 12 900 km³'],
      ['Daryolar','≈ 2 120 km³']
    ], matn:'Jami suv hajmi ≈ 1 386 mln km³. Ko‘l va daryolardagi chuchuk suv jami suvning juda kichik ulushi, lekin odamlar kundalik suvning katta qismini aynan shulardan oladi.'},
    {sarlavha:'Aylanish jarayonlari', jadval:[
      ['Bug‘lanish','suv yuzasidan bug‘ga aylanish; atmosferaga tushadigan namlikning ≈ 90 % i (manbalarda 86 %) okeanlardan'],
      ['Transpiratsiya','o‘simliklar barglari orqali suv bug‘latishi; atmosfera namligining ≈ 10 % i'],
      ['Kondensatsiya','bug‘ sovib mayda tomchilarga aylanishi — bulut, tuman, shudring'],
      ['Yog‘in','yomg‘ir, qor, do‘l'],
      ['Yer usti oqimi','suvning yonbag‘ir bo‘ylab daryolarga oqishi'],
      ['Sizilish (infiltratsiya)','suvning tuproqqa singishi'],
      ['Yer osti oqimi','yer osti suvlarining sekin harakati, buloq va daryolarni to‘ydiradi']
    ]},
    {sarlavha:'Katta va kichik aylanish', jadval:[
      ['Kichik (okean) aylanish','okeandan bug‘langan suv yana okean ustiga yog‘adi'],
      ['Katta aylanish','okean bug‘i quruqlikka o‘tadi, yog‘adi va daryolar orqali okeanga qaytadi'],
      ['Ichki (quruqlik) aylanish','ichki berk havzalarda: suv quruqlikda bug‘lanib, yana quruqlikka yog‘adi (Orol havzasi)']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'Manzara: suv qayerlarda?', matn:'Manzarada okean, tog‘ muzliklari, ko‘l, daryo, o‘rmon va yer osti suvlari bor. Yerdagi suvning ≈ 96,5 % i okeanlarda. Obyektlarni bosib ko‘ring — har birida qancha suv borligi kartada.', holat:{jarayon:null, harorat:20}},
    {sarlavha:'Bug‘lanish', matn:'Quyosh okean yuzasini isitadi va suv bug‘ga aylanadi. Tuz bug‘lanmaydi — shuning uchun bug‘ va undan hosil bo‘ladigan yomg‘ir chuchuk. Atmosferaga tushadigan namlikning ≈ 90 % i okean va dengizlardan bug‘lanadi.', holat:{jarayon:'buglanish', harorat:25}},
    {sarlavha:'Transpiratsiya', matn:'O‘simliklar ildizlari bilan suv shimib, barglaridagi og‘izchalar orqali bug‘latadi. Bu transpiratsiya deb ataladi va atmosfera namligining ≈ 10 % ini beradi.', holat:{jarayon:'transpiratsiya', harorat:25}},
    {sarlavha:'Kondensatsiya: bulut hosil bo‘ladi', matn:'Iliq nam havo ko‘tarilgan sari soviydi. Sovuq havo kamroq bug‘ saqlay oladi, ortiqcha bug‘ chang zarralari atrofida mayda tomchilarga aylanadi — <b>bulut</b> paydo bo‘ladi. Shamol bulutlarni quruqlik ustiga olib keladi.', holat:{jarayon:'kondensatsiya', harorat:20}},
    {sarlavha:'Yog‘in: yomg‘ir va qor', matn:'Bulutdagi tomchilar qo‘shilib yiriklashadi va og‘irlik kuchi ta’sirida tushadi. Tog‘larda havo tez soviydi, shuning uchun yog‘in ko‘p: O‘zbekiston tekisliklarida yiliga ≈ 100–200 mm, tog‘larda esa ancha ko‘p yog‘in tushadi. Balandda yog‘in qor bo‘lib yog‘ib, muzliklarni to‘ydiradi.', holat:{jarayon:'yogin', harorat:10}},
    {sarlavha:'Oqim va sizilish', matn:'Yoqqan suvning bir qismi yonbag‘ir bo‘ylab daryolarga oqadi (<b>yer usti oqimi</b>), bir qismi tuproqqa <b>siziladi</b> va yer osti suvlarini to‘ldiradi. Muzlik va qor erib, yozda daryolarni suv bilan ta’minlaydi — Amudaryo va Sirdaryo shunday to‘yinadi.', holat:{jarayon:'oqim', harorat:20}},
    {sarlavha:'Yer osti oqimi va qaytish', matn:'Yer osti suvlari juda sekin harakatlanadi va buloqlar hamda daryolar orqali yana yuzaga chiqadi. Oxir-oqibat suv okeanga qaytadi — aylanish yopildi. Harorat slayderini oshirib ko‘ring: iliq havoda bug‘lanish tezlashadi.', holat:{jarayon:'yer_osti', harorat:30}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Suv aylanishini kuzating', holat:{jarayon:null, harorat:20},
    topshiriqlar:[
      {shart:'Atmosferaga eng ko‘p bug‘ beradigan manbani — <b>okeanni</b> bosing.', hodisa:'kbg-suv', kod:"ev.nom==='okean'", izoh:'To‘g‘ri — atmosferadagi namlikning ≈ 90 % i okean va dengizlardan bug‘lanadi.'},
      {shart:'Bug‘ sovib tomchilarga aylanadigan jarayonni — <b>kondensatsiyani</b> tanlang.', hodisa:'kbg-suv-holat', kod:"ev.jarayon==='kondensatsiya'", izoh:'To‘g‘ri — <b>kondensatsiya</b> natijasida bulutlar hosil bo‘ladi.'},
      {shart:'Yerdagi <b>chuchuk suvning eng katta zaxirasini</b> bosing.', hodisa:'kbg-suv', kod:"ev.nom==='muzlik'", izoh:'To‘g‘ri — muzlik va doimiy qorlarda chuchuk suvning ≈ 68,7 % i bor.'},
      {shart:'O‘simliklar orqali suv bug‘lanishini ko‘rsatadigan obyektni — <b>daraxtni</b> bosing.', hodisa:'kbg-suv', kod:"ev.nom==='daraxt'", izoh:'To‘g‘ri — bu <b>transpiratsiya</b>: atmosfera namligining ≈ 10 % i.'},
      {shart:'Haroratni <b>30 °C yoki undan yuqori</b> qiling — bug‘lanish qanday o‘zgaradi?', hodisa:'kbg-suv-holat', kod:"ev.harorat>=30", izoh:'To‘g‘ri — iliq havoda suv tezroq bug‘lanadi va havo ko‘proq bug‘ saqlay oladi.'},
      {shart:'Chuchuk suvning ikkinchi katta zaxirasi — <b>yer osti suvlarini</b> bosing.', hodisa:'kbg-suv', kod:"ev.nom==='yer_osti'", izoh:'To‘g‘ri — chuchuk suvning ≈ 30,1 % i yer ostida.'}
    ]},
  test:[
    {s:'Yerdagi barcha suvning qancha qismi okean va dengizlarda?', v:['≈ 50 %','≈ 71 %','≈ 96,5 %','≈ 2,5 %'], t:2, izoh:'<b>≈ 96,5 %</b> (USGS). 71 % — okeanlar egallagan Yer yuzasi ulushi, 2,5 % — chuchuk suv ulushi.'},
    {s:'Chuchuk suvning eng katta qismi qayerda?', v:['Daryolarda','Ko‘llarda','Muzliklar va doimiy qorlarda','Atmosferada'], t:2, izoh:'<b>Muzliklar va doimiy qorlarda</b> — chuchuk suvning ≈ 68,7 % i. Yer osti suvlarida ≈ 30,1 %.'},
    {s:'Bug‘ sovib mayda tomchilarga aylanishi nima deb ataladi?', v:['Bug‘lanish','Kondensatsiya','Sizilish','Transpiratsiya'], t:1, izoh:'<b>Kondensatsiya</b>: bulut, tuman va shudring shunday hosil bo‘ladi.'},
    {s:'O‘simliklar barglari orqali suv bug‘latishi qanday ataladi?', v:['Transpiratsiya','Infiltratsiya','Kondensatsiya','Yog‘in'], t:0, izoh:'<b>Transpiratsiya</b> — atmosfera namligining taxminan 10 % i shu yo‘l bilan keladi.'},
    {s:'Suv aylanishini harakatga keltiruvchi asosiy energiya manbai nima?', v:['Yer ichki issiqligi','Quyosh energiyasi','Shamol energiyasi','Oy tortishi'], t:1, izoh:'<b>Quyosh energiyasi</b> suvni bug‘latadi; og‘irlik kuchi esa yog‘in va oqimni ta’minlaydi.'},
    {s:'Okean suvi sho‘r, nega yomg‘ir chuchuk?', v:['Tuz bulutda eriydi','Bug‘lanishda tuz suvda qoladi, faqat suv bug‘ga aylanadi','Yomg‘ir tog‘dan keladi','Tuz shamolda uchib ketadi'], t:1, izoh:'<b>Bug‘lanishda tuz suvda qoladi, faqat suv bug‘ga aylanadi</b>. Shu sababli bug‘ va undan hosil bo‘lgan yog‘in chuchuk.'},
    {s:'Suv bug‘i molekulasi atmosferada o‘rtacha qancha turadi?', v:['≈ 9 kun','≈ 1 soat','≈ 1 yil','≈ 100 yil'], t:0, izoh:'<b>≈ 9 kun</b> (USGS; ba’zi manbalarda ≈ 10 kun). Shu sababli ob-havo tez o‘zgaradi.'},
    {s:'Suvning tuproqqa singishi qanday ataladi?', v:['Sizilish (infiltratsiya)','Yer usti oqimi','Kondensatsiya','Sublimatsiya'], t:0, izoh:'<b>Sizilish (infiltratsiya)</b>. Singgan suv yer osti suvlarini to‘ldiradi.'},
    {s:'Amudaryo va Sirdaryo asosan qanday suvlar hisobiga to‘yinadi?', v:['Faqat yomg‘ir suvlari','Tog‘ muzliklari va qor erishidan','Dengiz suvidan','Faqat yer osti suvlaridan'], t:1, izoh:'<b>Tog‘ muzliklari va qor erishidan</b> — Pomir va Tyan-Shan tog‘laridan; shuning uchun ular yozda eng sersuv bo‘ladi.'},
    {s:'Okeandan bug‘langan suv quruqlikka yog‘ib, daryolar orqali okeanga qaytsa, bu qanday aylanish?', v:['Kichik aylanish','Katta aylanish','Ichki aylanish','Yopiq aylanish'], t:1, izoh:'<b>Katta aylanish</b>. Kichik aylanishda suv okeandan bug‘lanib yana okeanga yog‘adi.'},
    {s:'Harorat oshsa, bug‘lanish qanday o‘zgaradi?', v:['Kamayadi','O‘zgarmaydi','Tezlashadi','To‘xtaydi'], t:2, izoh:'<b>Tezlashadi</b>: iliq suv molekulalari tezroq bug‘ga o‘tadi, iliq havo esa ko‘proq bug‘ saqlay oladi (har 1 °C ga taxminan 7 %).'},
    {tur:'3d', s:'Manzarada <b>kondensatsiya</b> natijasida hosil bo‘lgan obyektni bosing.', hodisa:'kbg-suv', kalit:'nom', togri:['bulut'], v:['Bulut','boshqa obyekt'], t:0,
     izoh:'<b>Bulut</b> — sovigan bug‘dan hosil bo‘lgan juda mayda suv tomchilari yoki muz kristallari to‘plami.'}
  ],
  yordamchi:[
    {s:'Suv aylanishida suv yo‘qoladimi?', j:'Yo‘q. Yerdagi suvning umumiy miqdori deyarli o‘zgarmaydi — u faqat holatini (suyuq, bug‘, muz) va joyini o‘zgartiradi. Shuning uchun siz bugun ichgan suv molekulalari ming yillar oldin muzlikda yoki okeanda bo‘lgan bo‘lishi mumkin.', kalit:['yo‘qol','miqdor','o‘zgar']},
    {s:'Nega tog‘larda yog‘in ko‘p?', j:'Nam havo tog‘ yonbag‘ri bo‘ylab ko‘tarilganda soviydi, bug‘ kondensatsiyalanib bulut va yog‘in hosil bo‘ladi. Shuning uchun shamolga qaragan yonbag‘irlarda yog‘in ko‘p, tog‘ ortidagi tekisliklarda esa kam. O‘zbekiston tekisliklarida yiliga ≈ 100–200 mm, tog‘larda esa bir necha barobar ko‘p yog‘in tushadi.', kalit:['tog‘','yog‘in','ko‘p']},
    {s:'Suvni qanday tejash mumkin?', j:'Tomchilatib sug‘orish, oqib turgan jo‘mrakni tuzatish, idishni oqar suv ostida emas, to‘ldirilgan idishda yuvish, tish yuvayotganda jo‘mrakni yopish. O‘zbekistonda suvning katta qismi sug‘orishga sarflanadi, shuning uchun qishloq xo‘jaligida tejamkor usullar ayniqsa muhim.', kalit:['tejash','tejam','suv']}
  ],
  maqola:[
    {sarlavha:'Gidrosfera: Yerning suv qobig‘i', xatboshilar:[
      'Gidrosfera — Yerdagi barcha suvlar majmui: okean va dengizlar, daryo va ko‘llar, botqoqliklar, muzliklar va doimiy qorlar, yer osti suvlari hamda atmosferadagi suv bug‘i. Okeanlar Yer yuzasining taxminan 71 % ini egallaydi.',
      'AQSh Geologiya xizmati (USGS) ma’lumotiga ko‘ra, Yerdagi jami suv hajmi taxminan 1 386 mln km³. Uning ≈ 96,5 % i okean va dengizlardagi sho‘r suv. Chuchuk suv jami suvning atigi ≈ 2,5 % ini tashkil qiladi. Shu chuchuk suvning ham ≈ 68,7 % i Antarktida, Grenlandiya va tog‘ muzliklarida muz holatida, ≈ 30,1 % i yer ostida. Ko‘l, daryo va havodagi chuchuk suv ulushi juda kichik — taxminan 1 % atrofida.',
      'Demak, odamlar bevosita foydalanadigan suv — daryo va ko‘llar — sayyora suvining juda kichik qismi. Shuning uchun toza chuchuk suvni asrash butun insoniyat uchun muhim vazifa.'
    ]},
    {sarlavha:'Suv qanday aylanadi', xatboshilar:[
      'Suv aylanishining «dvigateli» — Quyosh. Uning issiqligi okean, dengiz, ko‘l va tuproq yuzasidan suvni bug‘latadi. Atmosferaga tushadigan namlikning taxminan 90 % i (ba’zi manbalarda 86 %) okean va dengizlardan bug‘lanadi. Qolgan qismini asosan o‘simliklar beradi: ular ildizlari bilan suv shimib, barglaridagi og‘izchalar orqali bug‘latadi — bu <b>transpiratsiya</b>.',
      'Nam havo ko‘tarilgan sari soviydi. Sovuq havo kamroq bug‘ saqlay oladi, shuning uchun ortiqcha bug‘ chang, tuz va qurum zarralari atrofida mayda tomchilarga yoki muz kristallariga aylanadi — bu <b>kondensatsiya</b>. Milliardlab tomchilar birgalikda bulutni hosil qiladi. Tomchilar birlashib yiriklashganda og‘irlik kuchi ularni yomg‘ir, qor yoki do‘l ko‘rinishida pastga tushiradi — bu <b>yog‘in</b>.',
      'Yerga tushgan suvning bir qismi darhol bug‘lanadi, bir qismi yonbag‘irlar bo‘ylab daryo va ko‘llarga oqadi (<b>yer usti oqimi</b>), bir qismi tuproqqa singadi (<b>sizilish</b>, infiltratsiya) va yer osti suvlarini to‘ldiradi. Yer osti suvlari juda sekin harakatlanib, buloqlar orqali yuzaga chiqadi yoki daryolarni to‘yintiradi. Oxir-oqibat suv okeanga qaytadi va aylanish qaytadan boshlanadi.',
      'Suv aylanishning turli bo‘g‘inlarida turlicha vaqt qoladi: atmosferada o‘rtacha 9 kun atrofida, daryoda bir necha hafta, katta ko‘llarda o‘nlab yil, chuqur yer osti suvlari va Antarktida muzida esa ming yillab (oxirgi raqamlar taxminiy).'
    ]},
    {sarlavha:'O‘zbekistonda suv aylanishi', xatboshilar:[
      'O‘zbekiston okeandan juda uzoqda joylashgan va iqlimi quruq. Tekisliklarda yillik yog‘in ≈ 100–200 mm (ba’zi joylarda 300 mm gacha), bug‘lanish imkoniyati esa bundan bir necha barobar katta. Shuning uchun cho‘llarda daryolar deyarli hosil bo‘lmaydi.',
      'Asosiy suv manbalari — tog‘lar. Pomir va Tyan-Shan tog‘lariga g‘arbdan kelgan nam havo massalari ko‘tarilib, ko‘p yog‘in tashlaydi, balandda u qor va muz bo‘lib to‘planadi. Yozda muzlik va qorlar erib, Amudaryo va Sirdaryoni suv bilan ta’minlaydi. Shu sababli bu daryolar eng sersuv davri — yoz, ya’ni sug‘orish kerak bo‘lgan payt.',
      'Orol dengizi havzasi — ichki berk havza: bu yerdagi daryolar okeanga yetib bormaydi. Suv tog‘lardan tekisliklarga oqadi, sug‘orishga sarflanadi va bug‘lanadi. XX asrning ikkinchi yarmida daryolar suvining ko‘p qismi sug‘orishga olingani uchun Orol dengizi keskin qurigan — bu suv aylanishiga inson aralashuvining eng mashhur misoli.'
    ]},
    {sarlavha:'Suv aylanishining ahamiyati va inson ta’siri', xatboshilar:[
      'Suv aylanishi quruqlikni chuchuk suv bilan ta’minlaydi, iqlimni yumshatadi va issiqlikni ekvatordan qutblarga tashiydi: bug‘lanishda yutilgan issiqlik kondensatsiyada boshqa joyda ajraladi. U relyefni ham o‘zgartiradi — daryolar vodiy o‘yadi, muzliklar tog‘larni yo‘nadi.',
      'Inson suv aylanishiga katta ta’sir ko‘rsatadi: suv omborlari quradi, daryo suvini sug‘orishga oladi, o‘rmonlarni kesadi, shaharlarni asfalt bilan qoplaydi (suv tuproqqa singmay, tez oqib ketadi). Harorat ko‘tarilishi bilan bug‘lanish kuchayadi va tog‘ muzliklari qisqaradi — bu Markaziy Osiyo daryolari uchun muhim muammo.',
      'Har birimiz suvni tejash orqali hissa qo‘shishimiz mumkin: tomchilatib sug‘orish, oqayotgan jo‘mraklarni tuzatish, suvni ifloslantirmaslik. Toza suv — cheksiz emas, u doim aylanib turadi, lekin ifloslangan suvni tozalash qimmat va qiyin.'
    ]}
  ],
  formulalar:[
    ['Yog‘in = Bug‘lanish + Oqim','Quruqlikdagi uzoq muddatli suv balansi (sxematik): bug‘lanishga o‘simliklar transpiratsiyasi ham kiradi, oqim — yer usti va yer osti oqimi; qisqa davrda zaxira o‘zgarishi ham qo‘shiladi'],
    ['Chuchuk suv ≈ 1 386 mln km³ × 0,025 ≈ 35 mln km³','Jami suvning 2,5 % i'],
    ['Muzliklar ulushi ≈ 2,5 % × 0,687 ≈ 1,7 %','Jami suvga nisbatan (USGS: 1,74 %)'],
    ['Atmosfera ulushi = 12 900 / 1 386 000 000 ≈ 0,001 %','Havodagi suv bug‘i jami suvning juda kichik qismi'],
    ['1 mm yog‘in = 1 m² ga 1 litr suv','200 mm yillik yog‘in → har m² ga 200 L']
  ],
  qiziqarli:[
    'Agar Yerdagi barcha suvni bir sharga yig‘sak, uning diametri taxminan 1 385 km bo‘lardi (USGS rasmi).',
    'Bulutdagi bitta tomchi juda kichik — yomg‘ir tomchisi hosil bo‘lishi uchun millionlab bulut tomchilari birlashishi kerak.',
    'Chuchuk suvning ≈ 68,7 % i muz holatida — asosan Antarktida va Grenlandiyada.',
    'Bir yetuk daraxt issiq kunda yuzlab litr suvni barglari orqali bug‘latishi mumkin (daraxt turiga qarab — taxminiy).',
    'Suv bug‘i molekulasi havoda o‘rtacha 9 kun atrofida turadi — ob-havo tez almashishining sabablaridan biri.'
  ],
  lugat:[
    ['Gidrosfera','Yerning suv qobig‘i — barcha suvlar majmui.'],
    ['Bug‘lanish','Suvning suyuq holatdan bug‘ga o‘tishi.'],
    ['Transpiratsiya','O‘simliklarning barglari orqali suv bug‘latishi.'],
    ['Kondensatsiya','Bug‘ning sovib suyuq tomchilarga aylanishi.'],
    ['Yog‘in','Atmosferadan tushadigan suv: yomg‘ir, qor, do‘l.'],
    ['Sizilish (infiltratsiya)','Suvning tuproq va jinslarga singishi.'],
    ['Yer usti oqimi','Suvning yer yuzasi bo‘ylab daryo va ko‘llarga oqishi.'],
    ['Yer osti suvlari','Tuproq va tog‘ jinslari g‘ovaklaridagi suv.'],
    ['Muzlik','Qorning to‘planib zichlashishidan hosil bo‘lgan harakatlanuvchi muz massasi.'],
    ['Suv ayirg‘ich','Ikki daryo havzasini ajratib turuvchi baland chiziq.'],
    ['Berk havza','Suvi okeanga oqib chiqmaydigan havza (Orol havzasi).']
  ],
  manba:'5–6-sinf «Geografiya» darsliklari (O‘zbekiston, amaldagi nashrlar); USGS Water Science School: «Where is Earth’s Water?» (96,5 %; 2,5 %; muzliklar 68,7 %; yer osti 30,1 %; ko‘llar 91 000 km³, atmosfera 12 900 km³, daryolar 2 120 km³), «How Much Water is There on Earth?» (≈ 1 386 mln km³), «The Atmosphere and the Water Cycle» (≈ 9 kun; ≈ 10 % transpiratsiya), «Oceans and Seas and the Water Cycle» (≈ 90 % bug‘lanish okeanlardan); Wikipedia «Water cycle» (86 %); Britannica «Uzbekistan», Wikipedia «Geography of Uzbekistan» (yog‘in, daryolarning muzlik va qor bilan to‘yinishi). Manbalar farqi: okeanlardan bug‘lanish ulushi 86 % yoki ≈ 90 %; atmosferada turish vaqti ≈ 9 yoki ≈ 10 kun — matnda ikkalasi.',
  ishlanma:{
    sinf:'6-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D manzara, «tomchining sayohati» hikoyasi, guruhlarda sxema tuzish',
    maqsad:{talimiy:'Gidrosfera tarkibi, suvning Yerdagi taqsimoti va suv aylanishining bosqichlarini (bug‘lanish, transpiratsiya, kondensatsiya, yog‘in, oqim, sizilish) o‘rganish.',
      tarbiyaviy:'Suvni tejash va asrashga mas’uliyatli munosabatni, Orol muammosiga befarq bo‘lmaslikni tarbiyalash.',
      rivojlantiruvchi:'Jarayonlarni ketma-ket bog‘lash, foizlar bilan ishlash, sxema tuzish ko‘nikmasini rivojlantirish.'},
    natijalar:['Suv aylanishining 6–7 bosqichini tartib bilan aytadi','Yerdagi suv taqsimotini foizlarda izohlaydi','Katta va kichik aylanishni farqlaydi','Amudaryo va Sirdaryo nega yozda sersuv ekanini tushuntiradi','Suvni tejashning 3 usulini taklif qiladi'],
    jihozlar:['MAKON sahnasi «Suvning tabiatda aylanishi»','Proyektor yoki interaktiv doska','Tajriba: shaffof idish, issiq suv, ustiga muzli likopcha («mini-bulut»)','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Motivatsiya.</b> «Bugun ichgan suvingiz qayerlarda bo‘lgan bo‘lishi mumkin?»','Taxmin aytadi.'],
      ['8–20','<b>3D manzara.</b> MAKON da jarayonlarni ketma-ket yoqadi: bug‘lanish → transpiratsiya → kondensatsiya → yog‘in → oqim → sizilish → yer osti oqimi. Obyektlarni bosib, suv taqsimotini muhokama qiladi.','Kuzatadi, daftarga sxema chizadi.'],
      ['20–27','<b>Tajriba «mini-bulut».</b> Issiq suvli idish ustiga muzli likopcha — likopcha ostida tomchilar hosil bo‘ladi.','Kuzatadi, kondensatsiyani izohlaydi.'],
      ['27–34','<b>O‘zbekiston misoli.</b> Tog‘ muzliklari, Amudaryo va Sirdaryo, Orol havzasi — berk havza.','Guruhda «tomchining sayohati» sxemasini tuzadi.'],
      ['34–42','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['42–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Gidrosfera','Yerning suv qobig‘i.'],['Kondensatsiya','Bug‘ning tomchiga aylanishi.'],['Transpiratsiya','O‘simliklar orqali bug‘lanish.'],['Infiltratsiya','Suvning tuproqqa singishi.'],['Berk havza','Okeanga chiqmaydigan havza.']],
    savollar:[['Okeanlarda suvning necha foizi?','≈ 96,5 %'],['Chuchuk suvning eng katta zaxirasi?','Muzliklar (≈ 68,7 %)'],['Bulut qanday jarayonda hosil bo‘ladi?','Kondensatsiya'],['Suv aylanishining energiya manbai?','Quyosh'],['Amudaryo nega yozda sersuv?','Tog‘ muzliklari va qor eriydi']],
    uy:'Darslikdagi mavzuni o‘qish; (1) «Men — suv tomchisi» mavzusida 6–8 gapli hikoya (kamida 5 jarayon nomi bilan); (2) yillik yog‘in 150 mm bo‘lsa, 1 gektar (10 000 m²) maydonga necha litr suv tushishini hisoblash (javob: 150 × 10 000 = 1 500 000 L); (3) uyda bir kunda suvni tejashning 3 usulini sinab ko‘rish.',
    manba:'5–6-sinf «Geografiya» darsliklari; USGS Water Science School'
  }
};
DT.kbg_suv = {
  okean:{nom:'Okean', sarlavha2:'Gidrosfera · asosiy suv zaxirasi',
    jadval:[['Ulushi','Yerdagi suvning ≈ 96,5 %'],['Hajmi','≈ 1 338 mln km³'],['Yuzasi','Yer yuzasining ≈ 71 %'],['Bug‘lanish','atmosfera namligining ≈ 90 % i (manbalarda 86 %)']],
    matn:'Okean suv aylanishining asosiy manbai: Quyosh uning yuzasini isitib, har yili juda katta hajmdagi suvni bug‘latadi. Bug‘langan suvning ko‘p qismi yana okean ustiga yog‘adi, ≈ 10 % i quruqlikka o‘tadi.',
    manba:'USGS «Where is Earth’s Water?», «Oceans and Seas and the Water Cycle»'},
  bulut:{nom:'Bulut', sarlavha2:'Kondensatsiya natijasi',
    jadval:[['Tarkibi','juda mayda suv tomchilari va/yoki muz kristallari'],['Hosil bo‘lishi','ko‘tarilgan nam havo soviganda bug‘ kondensatsiyalanadi'],['Yadrolar','chang, tuz, qurum zarralari']],
    matn:'Bulut tomchilari shunchalik kichikki, ular havo oqimida muallaq turadi. Tomchilar birlashib yiriklashgandagina yomg‘ir yog‘adi.',
    manba:'USGS «Condensation and the Water Cycle»'},
  yomgir:{nom:'Yog‘in (yomg‘ir va qor)', sarlavha2:'Suvning quruqlikka qaytishi',
    jadval:[['Turlari','yomg‘ir, qor, do‘l, qor aralash yomg‘ir'],['O‘lchanishi','mm da: 1 mm = 1 m² ga 1 L'],['O‘zbekiston tekisliklari','yiliga ≈ 100–200 mm (ba’zi joylarda 300 mm gacha)']],
    matn:'Tog‘larda nam havo ko‘tarilib tez soviydi, shuning uchun yog‘in tekisliklardagidan bir necha barobar ko‘p. Balandda yog‘in qor bo‘lib muzliklarni to‘ydiradi.',
    manba:'Britannica «Uzbekistan»; Wikipedia «Geography of Uzbekistan»'},
  muzlik:{nom:'Muzlik va doimiy qor', sarlavha2:'Chuchuk suvning eng katta zaxirasi',
    jadval:[['Chuchuk suvdagi ulushi','≈ 68,7 %'],['Jami suvdagi ulushi','≈ 1,74 %'],['Asosiy joylari','Antarktida, Grenlandiya, baland tog‘lar']],
    matn:'Pomir va Tyan-Shan muzliklari Markaziy Osiyoning «suv minoralari»: yozda erib, Amudaryo va Sirdaryoni to‘yintiradi. Harorat ko‘tarilishi bilan ko‘plab tog‘ muzliklari qisqarmoqda.',
    manba:'USGS «Where is Earth’s Water?»; VOA «Melting glaciers, drying sea highlight Central Asia’s water woes»'},
  daryo:{nom:'Daryo', sarlavha2:'Yer usti oqimi',
    jadval:[['Daryolardagi suv','≈ 2 120 km³ — jami suvning juda kichik ulushi'],['To‘yinishi','yomg‘ir, qor, muzlik, yer osti suvlari'],['O‘zbekistonda','Amudaryo, Sirdaryo, Zarafshon — asosan muzlik va qor suvlari']],
    matn:'Daryodagi suv tez almashadi — bir necha hafta ichida. Shu sababli daryo suvi aylanishning eng «tez» bo‘g‘inlaridan biri.',
    manba:'USGS «Where is Earth’s Water?»; Britannica «Amu Darya»'},
  kol:{nom:'Ko‘l', sarlavha2:'Yer usti suvi',
    jadval:[['Chuchuk ko‘llar','≈ 91 000 km³'],['Oqar ko‘l','daryo kirib, daryo chiqadi — chuchuk'],['Oqmas ko‘l','suv bug‘lanadi — ko‘pincha sho‘r']],
    matn:'Oqmas ko‘llarda suv faqat bug‘lanish orqali chiqib ketadi, tuzlar esa qoladi — shuning uchun ular sho‘rlanadi. Orol dengizi ham oqmas ko‘l.',
    manba:'USGS «Where is Earth’s Water?»'},
  yer_osti:{nom:'Yer osti suvlari', sarlavha2:'Chuchuk suvning ikkinchi zaxirasi',
    jadval:[['Chuchuk suvdagi ulushi','≈ 30,1 %'],['Hajmi','≈ 10,5 mln km³ (chuchuk)'],['To‘yinishi','sizilish (infiltratsiya)'],['Chiqishi','buloq, quduq, daryo tubi']],
    matn:'Yer osti suvlari g‘ovak jinslar (qum, shag‘al) orasida to‘planadi va juda sekin harakatlanadi. Chuqur yer osti suvlari ming yillar davomida yangilanmasligi mumkin (taxminiy), shuning uchun ularni isrof qilish xavfli.',
    manba:'USGS «Where is Earth’s Water?»'},
  daraxt:{nom:'O‘simliklar (transpiratsiya)', sarlavha2:'Tirik «nasos»',
    jadval:[['Ulushi','atmosfera namligining ≈ 10 %'],['Yo‘li','ildiz → poya → barg → og‘izchalar → havo'],['Ta’siri','havoni namlaydi va sovitadi']],
    matn:'O‘rmonlar ustida transpiratsiya tufayli havo namroq bo‘ladi va yog‘in ko‘payishi mumkin. O‘rmonlar kesilsa, tuproqqa suv kam singadi va oqim tezlashadi.',
    manba:'USGS «Evapotranspiration and the Water Cycle»'},
  quyosh:{nom:'Quyosh', sarlavha2:'Suv aylanishining dvigateli',
    jadval:[['Vazifasi','suvni bug‘latish uchun energiya beradi'],['Ikkinchi kuch','og‘irlik kuchi — yog‘in va oqim'],['Harorat','iliq havo ko‘proq bug‘ saqlaydi (har 1 °C ga ≈ 7 %, taxminiy)']],
    matn:'Bug‘lanishda suv issiqlikni yutadi, kondensatsiyada esa bu issiqlik havoga qaytadi. Shu tarzda suv aylanishi issiqlikni tropiklardan yuqori kengliklarga tashiydi.',
    manba:'USGS «Evaporation and the Water Cycle»; Britannica «Hydrosphere — The water cycle»'}
};


/* ===== geo-iqlim ===== */
bogla('geografiya', 'Iqlim mintaqalari', 'geo-iqlim', 'Globusda 7 iqlim mintaqasi, Quyosh nuri burchagi va kenglik: nega ekvatorda issiq, qutbda sovuq', ['Iqlim mintaqalari']);
(function(){
const IQM = 'B. P. Alisov tasnifi: Alisov B. P. «Klimat SSSR» (1956) va «Klimaticheskie oblasti zarubejnyx stran» (1950); Shaw, Saito, Yamamoto (2023) «Update of global maps of Alisov’s climate classification», Progress in Earth and Planetary Science 10:19 (doi.org/10.1186/s40645-023-00547-1)';
const IQD = '7-sinf «Geografiya» (Materiklar va okeanlar tabiiy geografiyasi) darsligi — «Iqlim mintaqalari» mavzusi (O‘zbekiston, amaldagi nashr)';
const IQA = 'Quyosh og‘ishi va Yer o‘qi qiyaligi 23,44°: NASA Earth Fact Sheet (nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html); peshin balandligi formulasi — astronomiya va geografiya darsliklari; Toshkent kengligi 41°18′ sh.k.';
const IQR = 'WMO Weather and Climate Extremes Archive (wmo.asu.edu): +56,7 °C Death Valley, 1913-yil 10-iyul; −89,2 °C Vostok stansiyasi, 1983-yil 21-iyul';
const UZI = 'O‘zbekiston iqlimi: uz.wikipedia.org/wiki/Oʻzbekiston_iqlimi (O‘zgidromet ma’lumotlari asosida)';

D['geo-iqlim'] = {
  fan:'geografiya', qisqaNom:'Iqlim mintaqalari', nom:'Iqlim mintaqalari',
  qisqa:'7-sinf · Materiklar va okeanlar tabiiy geografiyasi · globus darsi',
  sinf:'7-sinf',
  sahna:'kbg_iqlim',
  kor:{
    sarlavha:'Nega ekvatorda doim yoz, qutbda esa doim qish?',
    matn:'Yer shari yuzasi kenglik bo‘ylab bir necha iqlim mintaqasiga bo‘linadi. Asosiy sabab — Quyosh nurining tushish burchagi: ekvatorda nur deyarli tik tushadi va kichik yuzani kuchli isitadi, qutblarga yaqinlashgan sari nur qiya tushib, katta yuzaga «yoyiladi». Mintaqalarni havo massalari aniqlaydi: qaysi havo yil bo‘yi yoki fasllarga qarab hukmron bo‘lsa, iqlim shunday bo‘ladi. Globusda mintaqani bosing, kenglik slayderini suring va oyni almashtiring — Quyoshning peshin balandligi qanday o‘zgarishini kuzating. Globusdagi mintaqa chegaralari SXEMATIK: aslida ular to‘g‘ri chiziq emas, materik va okeanlar ta’sirida egilgan.',
    punktlar:[
      '<b>7 ta mintaqa:</b> 4 asosiy (ekvatorial, tropik, mo‘tadil, arktik/antarktik) va 3 oraliq (subekvatorial, subtropik, subarktik/subantarktik) — B. P. Alisov tasnifi',
      '<b>Asosiy sabab:</b> Quyosh nurining tushish burchagi — peshin balandligi h = 90° − |φ − δ|',
      '<b>Asosiy mintaqada</b> yil bo‘yi bitta havo massasi, <b>oraliq mintaqada</b> — yozda bir, qishda boshqa havo massasi hukmron',
      '<b>Toshkent (41,3° sh.k.):</b> iyunda Quyosh peshinda ≈ 72° balandlikda, dekabrda ≈ 25°'
    ]
  },
  bolimlar:[
    {sarlavha:'Mintaqalar va havo massalari', jadval:[
      ['Ekvatorial','Yil bo‘yi ekvatorial havo: issiq va nam, deyarli har kuni kuchli jala'],
      ['Subekvatorial','Yozda ekvatorial (yomg‘irli fasl), qishda tropik havo (quruq fasl) — mussonlar'],
      ['Tropik','Yil bo‘yi tropik havo: materiklar ichi va g‘arbiy qirg‘oqlarda yirik cho‘llar (Sahroi Kabir)'],
      ['Subtropik','Yozda tropik havo (issiq, quruq), qishda mo‘tadil havo (salqin, yomg‘irli)'],
      ['Mo‘tadil','Yil bo‘yi mo‘tadil havo: to‘rt fasl aniq, g‘arbiy shamollar'],
      ['Subarktik / subantarktik','Yozda mo‘tadil, qishda arktik (antarktik) havo: qisqa salqin yoz, uzun sovuq qish'],
      ['Arktik / antarktik','Yil bo‘yi arktik (antarktik) havo: muz cho‘llari, doimiy sovuq']
    ], matn:'Ekvatorial mintaqa bitta, qolgan oltitasi shimoliy va janubiy yarimsharda takrorlanadi — jami 13 ta mintaqa zonasi. Sahnadagi kengliklar (0–5°, 5–20°, 20–30°, 30–40°, 40–65°, 65–70°, 70–90°) o‘quv uchun ideallashtirilgan, sxematik chegaralardir.'},
    {sarlavha:'Kenglik va Quyosh balandligi (peshin, sxematik hisob)', jadval:[
      ['Ekvator (0°)','mart va sentabr: 90° · iyun: 66,6° · dekabr: 66,6°'],
      ['Termiz (37,2° sh.k.)','mart: 52,8° · iyun: 76,2° · dekabr: 29,4°'],
      ['Toshkent (41,3° sh.k.)','mart: 48,7° · iyun: 72,1° · dekabr: 25,3°'],
      ['Nukus (42,5° sh.k.)','mart: 47,5° · iyun: 70,9° · dekabr: 24,1°'],
      ['Shimoliy qutb doirasi (66,56°)','iyun: 46,9° · dekabr: 0° (peshinda ham Quyosh ufqda)'],
      ['Shimoliy qutb (90°)','iyun: 23,4° (qutb kuni) · dekabr: Quyosh chiqmaydi (qutb tuni)']
    ], matn:'Hisob: h = 90° − |φ − δ|, bu yerda φ — joy kengligi (janubiy kenglik manfiy), δ — Quyosh og‘ishi: 21-mart va 23-sentabr atrofida 0°, 21-iyun atrofida +23,44°, 22-dekabr atrofida −23,44°. Atmosferadagi nur sinishi hisobga olinmagan.'}
  ],
  bosqichlar:[
    {sarlavha:'Yer shari va iqlim mintaqalari', matn:'Globusda rangli belbog‘lar — iqlim mintaqalari. Ekvator bo‘ylab ekvatorial mintaqa, undan har ikki tomonga navbat bilan subekvatorial, tropik, subtropik, mo‘tadil, subarktik va qutb mintaqalari joylashgan. Mintaqani bosing — ma’lumot kartasi chiqadi. Chegaralar sxematik.', holat:{oy:'mart', kenglik:0, mintaqa:null}},
    {sarlavha:'Ekvator: nur tik tushadi', matn:'Kun-tun tengligi kunlari (21-mart, 23-sentabr) peshinda Quyosh ekvatorda roppa-rosa zenitda turadi: h = 90°. Nur dastasi eng kichik yuzaga tushadi — har bir kvadrat metr eng ko‘p issiqlik oladi. Shuning uchun ekvatorial mintaqada yil bo‘yi issiq (≈ +24…+28 °C) va havo ko‘tarilib, deyarli har kuni jala yog‘adi.', holat:{oy:'mart', kenglik:0, mintaqa:'ekvatorial'}},
    {sarlavha:'Tropiklar va cho‘llar', matn:'Iyunda Quyosh Shimoliy tropikda (23,44° sh.k.) zenitda turadi. Tropik mintaqada yil bo‘yi quruq tropik havo hukmron: ekvatorda ko‘tarilgan havo shu kengliklarda pastga tushadi, isiydi va bulut hosil bo‘lmaydi. Natijada dunyoning eng katta cho‘llari — Sahroi Kabir, Arabiston, Avstraliya cho‘llari shu mintaqada.', holat:{oy:'iyun', kenglik:23.44, mintaqa:'tropik'}},
    {sarlavha:'Oraliq mintaqalar: havo fasl bilan almashadi', matn:'Subekvatorial, subtropik va subarktik mintaqalarda havo massasi faslga qarab almashadi. Masalan, subtropik mintaqada yozda issiq quruq tropik havo, qishda salqin nam mo‘tadil havo keladi — O‘rta yer dengizi bo‘yida yoz quruq, qish yomg‘irli.', holat:{oy:'iyun', kenglik:35, mintaqa:'subtropik'}},
    {sarlavha:'Toshkent: yoz va qish farqi', matn:'Toshkent 41,3° sh.k. da joylashgan. Iyunda peshin Quyoshi ≈ 72° balandlikda, dekabrda esa atigi ≈ 25°. Qishda nur dastasi 2,3 marta katta yuzaga yoyiladi va kun qisqa — shuning uchun qish sovuq. Ko‘pchilik darsliklarda O‘zbekiston mo‘tadil mintaqaning janubiy qismida deb beriladi; janubiy hududlarida subtropik xususiyatlar bor.', holat:{oy:'dekabr', kenglik:41.3, mintaqa:'motadil'}},
    {sarlavha:'Qutblar: qutb kuni va qutb tuni', matn:'Qutb doiralaridan (66,56°) qutbgacha Quyosh qishda bir necha kun va oylab chiqmaydi (qutb tuni), yozda botmaydi (qutb kuni). Lekin yozda ham u past turadi: Shimoliy qutbda iyunda peshin balandligi atigi ≈ 23°. Muz va qor nurning katta qismini qaytaradi — arktik va antarktik mintaqalar yil bo‘yi sovuq.', holat:{oy:'dekabr', kenglik:75, mintaqa:'arktik'}},
    {sarlavha:'Janubiy yarimshar — fasllar teskari', matn:'Dekabrda Quyosh Janubiy tropikda (23,44° j.k.) zenitda turadi: janubiy yarimsharda yoz, shimoliyda qish. Mintaqalar ekvatorga nisbatan ko‘zgudagidek takrorlanadi: janubda subantarktik va antarktik mintaqalar bor.', holat:{oy:'dekabr', kenglik:-23.44, mintaqa:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Quyosh balandligini o‘lchang', holat:{oy:'mart', kenglik:0, mintaqa:null},
    topshiriqlar:[
      {shart:'Globusda <b>ekvatorial mintaqani</b> bosing.', hodisa:'kbg-iqlim', kod:"ev.nom==='ekvatorial'", izoh:'To‘g‘ri — <b>ekvatorial mintaqa</b>: yil bo‘yi issiq va nam ekvatorial havo.'},
      {shart:'Oyni <b>iyun</b> qiling va kenglik slayderini <b>Toshkentga</b> (41° atrofi) qo‘ying.', hodisa:'kbg-iqlim-holat', kod:"ev.oy==='iyun'&&ev.kenglik>=40.5&&ev.kenglik<=42", izoh:'To‘g‘ri. Iyunda Toshkentda peshin Quyoshi ≈ <b>72°</b> balandlikda: h = 90° − |41,3° − 23,44°| ≈ 72,1°.'},
      {shart:'Endi oyni <b>dekabr</b> qiling (Toshkent kengligida qoling). Quyosh qanchalik pasaydi?', hodisa:'kbg-iqlim-holat', kod:"ev.oy==='dekabr'&&ev.kenglik>=40.5&&ev.kenglik<=42", izoh:'To‘g‘ri. Dekabrda h ≈ <b>25°</b>: nur dastasi yuzasi 1/sin 25° ≈ 2,3 marta kattalashadi — shuning uchun qish sovuq.'},
      {shart:'Iyunda Quyosh <b>zenitda</b> (h ≈ 90°) turadigan kenglikni toping.', hodisa:'kbg-iqlim-holat', kod:"ev.oy==='iyun'&&ev.h>=89.4", izoh:'To‘g‘ri — <b>Shimoliy tropik</b> (≈ 23,4° sh.k.). 21-iyun atrofida Quyosh aynan shu kenglikda tik turadi.'},
      {shart:'Dekabrda peshinda ham Quyosh chiqmaydigan (<b>qutb tuni</b>) kenglikni toping.', hodisa:'kbg-iqlim-holat', kod:"ev.oy==='dekabr'&&ev.h<=0", izoh:'To‘g‘ri — <b>Shimoliy qutb doirasidan (66,56°) shimolda</b> dekabrda qutb tuni bo‘ladi.'},
      {shart:'<b>Janubiy yarimshardagi subtropik</b> mintaqani bosing.', hodisa:'kbg-iqlim', kod:"ev.nom==='subtropik'&&ev.yarim==='j'", izoh:'To‘g‘ri. Janubiy yarimsharning subtropik mintaqasida Kap-Taun, Sidney, Buenos-Ayres joylashgan.'}
    ]},
  test:[
    {s:'Iqlim mintaqalarining hosil bo‘lishiga eng asosiy sabab nima?', v:['Okean oqimlari','Quyosh nurining tushish burchagi kenglik bo‘yicha o‘zgarishi','Tog‘larning balandligi','Yerning Quyosh atrofida aylanish tezligi'], t:1, izoh:'<b>Quyosh nurining tushish burchagi</b>: ekvatorda nur tik tushadi, qutblarga tomon qiyalashadi. Okean oqimlari va relyef mintaqalar ichidagi farqlarni kuchaytiradi, xolos.'},
    {s:'B. P. Alisov tasnifida nechta asosiy iqlim mintaqasi bor?', v:['3 ta','4 ta','7 ta','13 ta'], t:1, izoh:'<b>4 ta</b> asosiy: ekvatorial, tropik, mo‘tadil, arktik (antarktik). Oraliq mintaqalar bilan birga 7 tur, ikki yarimsharda jami 13 zona.'},
    {s:'Qaysi mintaqa oraliq (o‘tkinchi) mintaqa hisoblanadi?', v:['Tropik','Mo‘tadil','Subtropik','Ekvatorial'], t:2, izoh:'<b>Subtropik</b> — oraliq mintaqa: yozda tropik, qishda mo‘tadil havo hukmron. Tropik, mo‘tadil va ekvatorial — asosiy mintaqalar.'},
    {s:'Oraliq mintaqaning asosiy belgisi qaysi?', v:['Yil bo‘yi bitta havo massasi hukmron','Havo massalari faslga qarab almashadi','U faqat okeanlar ustida bo‘ladi','Unda yog‘in umuman yog‘maydi'], t:1, izoh:'Oraliq mintaqalarda <b>havo massalari faslga qarab almashadi</b>: yozda janubiy (issiqroq), qishda shimoliy (sovuqroq) mintaqa havosi keladi.'},
    {s:'Dunyodagi eng katta issiq cho‘llar (Sahroi Kabir, Arabiston) asosan qaysi mintaqada?', v:['Ekvatorial','Tropik','Mo‘tadil','Subarktik'], t:1, izoh:'<b>Tropik</b> mintaqada yil bo‘yi quruq tropik havo: pastga tushayotgan havo isiydi va bulut hosil bo‘lmaydi.'},
    {s:'Peshin paytida Quyosh balandligi formulasi qaysi? (φ — kenglik, δ — Quyosh og‘ishi)', v:['h = 90° − |φ − δ|','h = φ + δ','h = 90° + φ','h = 180° − φ'], t:0, izoh:'<b>h = 90° − |φ − δ|</b>. Masalan, Toshkentda (φ = 41,3°) iyunda (δ = +23,44°): 90° − 17,9° ≈ 72,1°.'},
    {s:'Toshkentda (41,3° sh.k.) 22-dekabr atrofida peshin Quyoshi taxminan qancha balandlikda?', v:['≈ 72°','≈ 49°','≈ 25°','≈ 0°'], t:2, izoh:'<b>≈ 25°</b>: 90° − |41,3° − (−23,44°)| = 90° − 64,7° ≈ 25,3°. 72° — iyundagi, 49° — kun-tun tengligidagi qiymat.'},
    {s:'21-iyun atrofida peshinda Quyosh qaysi chiziq ustida zenitda turadi?', v:['Ekvator','Shimoliy tropik (23,44° sh.k.)','Janubiy tropik (23,44° j.k.)','Shimoliy qutb doirasi'], t:1, izoh:'<b>Shimoliy tropik (23,44° sh.k.)</b>. Dekabrda — Janubiy tropik, mart va sentabrda — ekvator.'},
    {s:'Nega qutblarga yaqinlashgan sari sovuqroq bo‘ladi?', v:['Qutblar Quyoshdan uzoqroqda','Nur qiya tushib, katta yuzaga yoyiladi va har m² kam issiqlik oladi','Qutblarda havo zichroq','Qutblarda Quyosh umuman chiqmaydi'], t:1, izoh:'<b>Nur qiya tushib, katta yuzaga yoyiladi</b>: yuzaga tushadigan energiya taxminan sin h ga proporsional. Qutb va ekvatorning Quyoshgacha masofasidagi farq sezilarsiz.'},
    {s:'Qutb tuni qaysi kengliklarda kuzatiladi?', v:['Tropiklar orasida','Qutb doiralaridan (≈ 66,56°) qutbgacha','Faqat ekvatorda','30°–40° kengliklarda'], t:1, izoh:'<b>Qutb doiralaridan qutbgacha</b>: 66,56° = 90° − 23,44°. Qutbning o‘zida qutb tuni taxminan yarim yil davom etadi.'},
    {s:'O‘rta yer dengizi bo‘yidagi «yozi issiq-quruq, qishi yomg‘irli» iqlim qaysi mintaqaga xos?', v:['Subtropik','Subekvatorial','Subarktik','Ekvatorial'], t:0, izoh:'<b>Subtropik</b> mintaqaning g‘arbiy qirg‘oqlariga xos (O‘rta yer dengizi iqlimi): yozda tropik, qishda mo‘tadil havo keladi.'},
    {s:'Mussonli, yozi yomg‘irli va qishi quruq iqlim qaysi mintaqada ko‘p uchraydi?', v:['Arktik','Subekvatorial','Tropik','Mo‘tadil'], t:1, izoh:'<b>Subekvatorial</b> mintaqada yozda nam ekvatorial havo (yomg‘irli fasl), qishda quruq tropik havo keladi — Hindiston, Indoxitoy mussonlari.'},
    {s:'Yerda qayd etilgan eng past havo harorati (−89,2 °C) qaysi mintaqada o‘lchangan?', v:['Arktik','Antarktik','Subarktik','Mo‘tadil'], t:1, izoh:'<b>Antarktik</b> mintaqada — Antarktidadagi Vostok stansiyasida, 1983-yil 21-iyulda (WMO arxivi).'},
    {tur:'3d', s:'Globusda <b>ekvator bo‘ylab</b> joylashgan iqlim mintaqasini bosing.', hodisa:'kbg-iqlim', kalit:'nom', togri:['ekvatorial'], v:['Ekvatorial mintaqa','boshqa mintaqa'], t:0,
     izoh:'<b>Ekvatorial mintaqa</b> — ekvator atrofidagi belbog‘: yil bo‘yi issiq, nam, deyarli har kuni jala.'},
    {tur:'3d', s:'Globusda <b>Shimoliy yarimsharning mo‘tadil mintaqasini</b> bosing (Yevropa va Rossiyaning katta qismi shu yerda).', hodisa:'kbg-iqlim', kalit:'nom', togri:['motadil'], v:['Mo‘tadil mintaqa','boshqa mintaqa'], t:0,
     izoh:'<b>Mo‘tadil mintaqa</b> — yil bo‘yi mo‘tadil havo, to‘rt fasl aniq ajraladi. Sahnada u 40°–65° kengliklar orasida (sxematik).'}
  ],
  yordamchi:[
    {s:'Yoz Quyosh Yerga yaqinlashgani uchun issiq bo‘ladimi?', j:'Yo‘q. Yer Quyoshga yanvar boshida eng yaqin (perigeliy), iyul boshida eng uzoq bo‘ladi — shunda ham shimoliy yarimsharda iyulda yoz. Fasllar va mintaqalarning sababi — Yer o‘qining 23,44° qiyaligi va shu tufayli nur tushish burchagining o‘zgarishi.', kalit:['yaqin','uzoq','masofa','fasl']},
    {s:'Mintaqa chegaralari nega sahnada to‘g‘ri chiziq?', j:'Bu o‘quv sxemasi. Haqiqiy xaritada chegaralar egri: sovuq va iliq oqimlar, materik ichki qismlari, tog‘lar ularni janubga yoki shimolga suradi. Masalan, Yevropada iliq Golfstrim tufayli mo‘tadil mintaqa ancha shimolgacha cho‘ziladi.', kalit:['chegara','chiziq','sxema','egri']},
    {s:'O‘zbekiston qaysi iqlim mintaqasida?', j:'Ko‘pchilik darsliklarda — mo‘tadil mintaqaning janubiy qismida; janubiy hududlari (Surxondaryo) iqlimi subtropik xususiyatlarga ega (manbalarda turlicha beriladi). Iqlim keskin kontinental: yozi issiq va quruq, qishi nisbatan sovuq, yog‘in kam.', kalit:['o‘zbekiston','toshkent','qaysi']}
  ],
  maqola:[
    {sarlavha:'Kirish: iqlim nima va u nimaga bog‘liq?', xatboshilar:[
      'Ob-havo — atmosferaning ayni paytdagi holati: bugun yomg‘ir yog‘yaptimi, shamol qanday. Iqlim esa ko‘p yillik (odatda 30 yillik) o‘rtacha va takrorlanadigan ob-havo rejimi. Toshkentda bir kun yozda salqin bo‘lishi mumkin, lekin iqlimi — yozi issiq va quruq.',
      'Iqlimni belgilovchi omillar: geografik kenglik (Quyosh nurining burchagi), havo massalarining harakati, okean va materikning joylashuvi, okean oqimlari, relyef va joyning dengiz sathidan balandligi. Ulardan eng asosiysi — kenglik: u Quyoshdan keladigan issiqlik miqdorini belgilaydi.',
      'Iqlimni bir xil bo‘lgan kenglik bo‘ylab cho‘zilgan keng belbog‘lar iqlim mintaqalari deb ataladi. O‘zbekiston va MDH maktablarida sovet klimatologi Boris Pavlovich Alisov taklif qilgan tasnif qo‘llanadi: u mintaqalarni hukmron havo massalariga qarab ajratadi.'
    ]},
    {sarlavha:'Quyosh nurining burchagi', xatboshilar:[
      'Tasavvur qiling: qo‘l chirog‘ini devorga tik tutsangiz, dog‘ kichik va yorqin; qiya tutsangiz, dog‘ cho‘zilib, xira bo‘ladi. Quyosh nurlari ham xuddi shunday: tik tushsa, energiya kichik yuzaga to‘planadi; qiya tushsa — katta yuzaga yoyiladi. Nur dastasi yoyiladigan yuza 1/sin h marta katta bo‘ladi (h — Quyosh balandligi).',
      'Peshin paytida Quyosh balandligi h = 90° − |φ − δ| formulasi bilan hisoblanadi. φ — joy kengligi, δ — Quyosh og‘ishi (Quyosh qaysi kenglik ustida zenitda turgani). Yer o‘qi 23,44° qiya bo‘lgani uchun δ yil davomida −23,44° dan +23,44° gacha o‘zgaradi.',
      'Toshkent misolida: iyunda h ≈ 72°, nur yuzasi 1/sin 72° ≈ 1,05 marta kattalashadi; dekabrda h ≈ 25°, yuza ≈ 2,3 marta kattalashadi. Qishda kun ham qisqa. Shu ikki sabab tufayli qish sovuq, yoz issiq bo‘ladi.',
      'Keng tarqalgan xato — «yozda Yer Quyoshga yaqinroq». Aslida Yer Quyoshga yanvar boshida eng yaqin keladi. Masofa farqi (≈ 3 %) iqlimga nur burchagi va kun uzunligiga qaraganda juda kam ta’sir qiladi.'
    ]},
    {sarlavha:'Asosiy mintaqalar', xatboshilar:[
      'Ekvatorial mintaqa ekvator atrofida joylashgan. Bu yerda yil bo‘yi issiq va nam ekvatorial havo hukmron: o‘rtacha harorat taxminan +24…+28 °C, fasllar deyarli farq qilmaydi. Kuchli isigan havo yuqoriga ko‘tarilib, sovuydi va har kuni tushdan keyin jala yog‘adi. Amazoniya, Kongo havzasi, Indoneziya — nam ekvatorial o‘rmonlar o‘lkasi.',
      'Tropik mintaqalar (shimoliy va janubiy) yil bo‘yi quruq tropik havo ta’sirida. Ekvatorda ko‘tarilgan havo shu kengliklarda pastga tushadi, siqilib isiydi va bulutlar hosil bo‘lmaydi. Natijada Sahroi Kabir, Arabiston, Kalahari, Avstraliya cho‘llari paydo bo‘lgan. Yerdagi eng yuqori o‘lchangan harorat (+56,7 °C, Death Valley, 1913-yil, WMO) ham quruq issiq cho‘lda qayd etilgan.',
      'Mo‘tadil mintaqalar yil bo‘yi mo‘tadil havo massalari ta’sirida. Bu yerda to‘rt fasl aniq ajraladi, g‘arbiy shamollar ustun. Okean yaqinidagi g‘arbiy qirg‘oqlarda iqlim yumshoq va nam, materik ichkarisida — keskin kontinental, sharqiy qirg‘oqlarda — mussonli.',
      'Arktik va antarktik mintaqalar qutb atrofida. Yil bo‘yi sovuq, quruq qutb havosi; qor va muz nurning katta qismini qaytaradi. Yerdagi eng past o‘lchangan harorat — −89,2 °C Antarktidadagi Vostok stansiyasida (1983-yil 21-iyul, WMO).'
    ]},
    {sarlavha:'Oraliq mintaqalar va O‘zbekiston', xatboshilar:[
      'Oraliq mintaqalarda havo massasi fasl bilan almashadi, chunki Quyosh zenit nuqtasi bilan birga havo massalari chegaralari ham yozda shimolga, qishda janubga suriladi. Subekvatorial mintaqada yozda nam ekvatorial havo (yomg‘irli fasl), qishda quruq tropik havo keladi — Hindistonning mussonli iqlimi shunday.',
      'Subtropik mintaqada yozda tropik, qishda mo‘tadil havo hukmron. G‘arbiy qirg‘oqlarda O‘rta yer dengizi iqlimi (yozi quruq, qishi yomg‘irli), sharqiy qirg‘oqlarda mussonli, materik ichida kontinental subtropik iqlim uchraydi. Subarktik mintaqada yoz qisqa va salqin (mo‘tadil havo), qish uzun va qattiq (arktik havo) — bu tundra o‘lkasi.',
      'O‘zbekiston 37°–45° sh.k. orasida, Yevrosiyo materigining ichkarisida, okeanlardan uzoqda joylashgan. Ko‘pchilik darsliklarda u mo‘tadil mintaqaning janubiy qismida deb beriladi, janubiy hududlari subtropik xususiyatlarga ega. Iqlimi keskin kontinental: iyulda o‘rtacha +26 °C (shimol) dan +30 °C (janub) gacha, Termizda eng yuqori harorat +50 °C, Ustyurtda eng past −38 °C qayd etilgan; tekisliklarda yog‘in yiliga ≈ 100 mm atrofida, tog‘ yonbag‘irlarida 800–900 mm gacha (O‘zgidromet ma’lumotlari bo‘yicha).'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — mintaqalarni faqat haroratga qarab ajratish. Alisov tasnifida asosiy mezon — havo massasi. Masalan, tropik mintaqada ham okean qirg‘og‘ida nam iqlim uchrashi mumkin.',
      'Ikkinchi xato — mintaqa chegaralarini kenglik chizig‘i deb tasavvur qilish. Sahnadagi chegaralar sxematik; haqiqiy xaritada ular oqimlar va relyef ta’sirida egilgan. Uchinchi xato — iqlim mintaqasi bilan tabiat zonasini (masalan, cho‘l, dasht) bir narsa deb bilish: bitta iqlim mintaqasida bir necha tabiat zonasi bo‘lishi mumkin.'
    ]}
  ],
  formulalar:[
    ['h = 90° − |φ − δ|','Peshin paytidagi Quyosh balandligi (φ — kenglik, δ — Quyosh og‘ishi; natija manfiy bo‘lsa — Quyosh chiqmaydi)'],
    ['S = S₀ / sin h','Nur dastasi yoyiladigan yuza: h kichik bo‘lsa, yuza katta, har m² ga kam energiya'],
    ['δ: 21-mart ≈ 0°, 21-iyun ≈ +23,44°, 23-sentabr ≈ 0°, 22-dekabr ≈ −23,44°','Quyosh og‘ishining yil davomida o‘zgarishi'],
    ['Qutb doirasi: 90° − 23,44° = 66,56°','Qutb kuni va qutb tuni chegarasi'],
    ['Toshkent, iyun: 90° − |41,3° − 23,44°| ≈ 72,1°','Namuna hisob; dekabrda: 90° − 64,7° ≈ 25,3°']
  ],
  qiziqarli:[
    'Yerda o‘lchangan eng past harorat — −89,2 °C (Vostok stansiyasi, Antarktida, 1983-yil 21-iyul), eng yuqorisi — +56,7 °C (Death Valley, AQSH, 1913-yil 10-iyul) — WMO arxivi.',
    'Yer Quyoshga yanvar boshida eng yaqin keladi — ya’ni shimoliy yarimsharda eng yaqin paytda qish bo‘ladi.',
    'Shimoliy qutbda Quyosh yil davomida taxminan yarim yil chiqmaydi va yarim yil botmaydi.',
    'Termizda +50 °C gacha issiqlik qayd etilgan — bu O‘zbekistondagi eng yuqori harorat.',
    '«Tropik» so‘zi yunoncha «burilish» ma’nosidan: Quyosh zenit nuqtasi tropik chizig‘iga yetgach, orqaga «buriladi».'
  ],
  lugat:[
    ['Iqlim','Joyning ko‘p yillik o‘rtacha ob-havo rejimi.'],
    ['Ob-havo','Atmosferaning ayni paytdagi holati.'],
    ['Havo massasi','Harorati va namligi bir xil bo‘lgan katta havo hajmi.'],
    ['Iqlim mintaqasi','Iqlimi o‘xshash, kenglik bo‘ylab cho‘zilgan belbog‘.'],
    ['Asosiy mintaqa','Yil bo‘yi bitta havo massasi hukmron bo‘lgan mintaqa.'],
    ['Oraliq mintaqa','Havo massasi faslga qarab almashadigan mintaqa (sub- qo‘shimchali).'],
    ['Quyosh balandligi','Quyosh bilan ufq orasidagi burchak.'],
    ['Zenit','Kuzatuvchining tepasidagi nuqta (h = 90°).'],
    ['Tropik','23,44° kenglik chizig‘i — Quyosh zenitda turadigan eng chekka kenglik.'],
    ['Qutb doirasi','66,56° kenglik — qutb kuni va qutb tuni chegarasi.'],
    ['Musson','Faslga qarab yo‘nalishini o‘zgartiradigan shamol.'],
    ['Kontinental iqlim','Okeandan uzoq, yoz-qish farqi katta, yog‘in kam iqlim.']
  ],
  manba:IQD+'; '+IQM+'; '+IQA+'; '+IQR+'; '+UZI+'. Mintaqa chegaralari sahnada sxematik (0–5°, 5–20°, 20–30°, 30–40°, 40–65°, 65–70°, 70–90° — o‘quv uchun ideallashtirilgan); ekvatorial mintaqa harorati +24…+28 °C — umumlashtirilgan (taxminiy); O‘zbekistonning mintaqa bo‘yicha o‘rni manbalarda turlicha.',
  ishlanma:{
    sinf:'7-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish', usul:'3D globus, qo‘l chirog‘i tajribasi, juftlikda hisoblash, klaster',
    maqsad:{talimiy:'Iqlim mintaqalari, ularning hosil bo‘lish sababi (Quyosh nuri burchagi, havo massalari), asosiy va oraliq mintaqalar farqini o‘rganish; peshin Quyosh balandligini hisoblashni o‘rgatish.',
      tarbiyaviy:'Tabiatdagi sabab-oqibat bog‘lanishlariga qiziqish, ona yurt iqlimini bilish va tabiatga ehtiyotkor munosabatni tarbiyalash.',
      rivojlantiruvchi:'Model bilan ishlash, formula yordamida hisoblash, taqqoslash va xulosa chiqarish ko‘nikmasini rivojlantirish.'},
    natijalar:['7 ta iqlim mintaqasini tartib bilan aytadi va globusda ko‘rsatadi','Asosiy va oraliq mintaqa farqini tushuntiradi','h = 90° − |φ − δ| bo‘yicha Toshkent uchun peshin balandligini hisoblaydi','Qutb kuni/tuni qayerda bo‘lishini tushuntiradi','O‘zbekiston iqlimini tavsiflaydi'],
    jihozlar:['MAKON sahnasi «Iqlim mintaqalari» (globus)','Qo‘l chirog‘i va katakli qog‘oz (nur dog‘i tajribasi)','Dunyo iqlim xaritasi (atlas)','Tarqatma: mintaqalar jadvali','Kalkulyator'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Muammoli savol.</b> «Nega Toshkentda iyulda +40 °C, yanvarda esa sovuq?» Qo‘l chirog‘ini qog‘ozga tik va qiya tutib, dog‘ yuzasini solishtirish.','Kataklarni sanaydi, taxmin aytadi.'],
      ['8–20','<b>Globus bilan ishlash.</b> MAKON da 7 bosqichni ochadi: mintaqalar, ekvator, tropiklar, oraliq mintaqalar, Toshkent, qutblar, janubiy yarimshar. Chegaralar sxematik ekanini aytadi.','Mintaqalar jadvalini to‘ldiradi.'],
      ['20–30','<b>Hisoblash.</b> h = 90° − |φ − δ| formulasi; Toshkent, Termiz, Nukus uchun iyun va dekabr qiymatlari.','Juftlikda hisoblaydi, globusda tekshiradi.'],
      ['30–37','<b>Klaster.</b> «Havo massasi → mintaqa → tabiat» sxemasini tuzish; O‘zbekiston iqlimi.','Guruhda klaster chizadi.'],
      ['37–43','<b>Mustahkamlash.</b> MAKON amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Havo massasi','Xossalari bir xil katta havo hajmi.'],['Asosiy mintaqa','Yil bo‘yi bitta havo massasi.'],['Oraliq mintaqa','Havo massasi fasl bilan almashadi.'],['Zenit','Tepadagi nuqta, h = 90°.'],['Qutb doirasi','66,56° kenglik.']],
    savollar:[['Asosiy mintaqalar nechta?','4 ta'],['Iyunda Quyosh qaysi kenglikda zenitda?','23,44° sh.k. (Shimoliy tropik)'],['Toshkentda dekabr peshin balandligi?','≈ 25°'],['Sahroi Kabir qaysi mintaqada?','Tropik'],['Qutb doirasi kengligi?','66,56°']],
    uy:'Darslikdagi mavzuni o‘qish; (1) o‘z shahringiz kengligini atlasdan topib, 21-mart, 21-iyun va 22-dekabr uchun peshin Quyosh balandligini hisoblang; (2) kontur xaritaga 7 mintaqani rang bilan belgilang; (3) «Men — havo massasi» mavzusida qisqa hikoya yozing.',
    manba:IQD+'; '+IQM+'; '+IQA
  }
};

const Q = '(sahnadagi kenglik chegarasi sxematik)';
DT.kbg_iqlim = {
  ekvatorial:{nom:'Ekvatorial mintaqa', sarlavha2:'Asosiy mintaqa · ekvator atrofi',
    jadval:[['Havo massasi','Yil bo‘yi ekvatorial havo'],['Harorat','Yil bo‘yi ≈ +24…+28 °C, fasllar deyarli yo‘q (taxminiy)'],['Yog‘in','Juda ko‘p, deyarli har kuni jala'],['Sahnada','0°–5° '+Q],['Misollar','Amazoniya, Kongo havzasi, Indoneziya']],
    matn:'Kuchli isigan nam havo yuqoriga ko‘tarilib sovuydi va bulutlar hosil bo‘ladi — shuning uchun ekvatorda yomg‘ir ko‘p. Bu yerda nam doimiy yashil ekvatorial o‘rmonlar o‘sadi.',
    manba:IQM+'; '+IQD},
  subekvatorial:{nom:'Subekvatorial mintaqa', sarlavha2:'Oraliq mintaqa · ikkala yarimsharda',
    jadval:[['Yozda','Nam ekvatorial havo — yomg‘irli fasl'],['Qishda','Quruq tropik havo — quruq fasl'],['Shamollar','Mussonlar'],['Sahnada','5°–20° '+Q],['Misollar','Hindiston, Indoxitoy, Afrika savannalari, Braziliya tog‘ligi']],
    matn:'Yil ikki faslga — yomg‘irli va quruq faslga bo‘linadi. Savannalar va o‘zgaruvchan nam o‘rmonlar shu mintaqaga xos.',
    manba:IQM+'; '+IQD},
  tropik:{nom:'Tropik mintaqa', sarlavha2:'Asosiy mintaqa · ikkala yarimsharda',
    jadval:[['Havo massasi','Yil bo‘yi tropik havo'],['Yog‘in','Materik ichi va g‘arbiy qirg‘oqlarda juda kam'],['Sahnada','20°–30° '+Q],['Misollar','Sahroi Kabir, Arabiston, Kalahari, Avstraliya cho‘llari'],['Rekord','+56,7 °C — Death Valley, 1913 (WMO)']],
    matn:'Ekvatorda ko‘tarilgan havo tropik kengliklarda pastga tushadi, siqilib isiydi va bulut hosil bo‘lmaydi. Sharqiy qirg‘oqlarda esa okeandan passatlar nam keltiradi.',
    manba:IQM+'; '+IQR},
  subtropik:{nom:'Subtropik mintaqa', sarlavha2:'Oraliq mintaqa · ikkala yarimsharda',
    jadval:[['Yozda','Tropik havo — issiq, quruq'],['Qishda','Mo‘tadil havo — salqin, yomg‘irli'],['Turlari','O‘rta yer dengizi (g‘arb), mussonli (sharq), kontinental (ichkari)'],['Sahnada','30°–40° '+Q],['Misollar','O‘rta yer dengizi bo‘yi, Kaliforniya, Kap-Taun, Sidney']],
    matn:'O‘rta yer dengizi iqlimida yoz quruq, qish yomg‘irli — zaytun va uzum shu iqlimga moslashgan. O‘zbekistonning janubiy hududlari iqlimi subtropik xususiyatlarga ega (manbalarda turlicha).',
    manba:IQM+'; '+IQD},
  motadil:{nom:'Mo‘tadil mintaqa', sarlavha2:'Asosiy mintaqa · ikkala yarimsharda',
    jadval:[['Havo massasi','Yil bo‘yi mo‘tadil havo'],['Fasllar','To‘rt fasl aniq ajraladi'],['Shamollar','G‘arbiy shamollar ustun'],['Sahnada','40°–65° '+Q],['Turlari','Dengiz (g‘arb), kontinental (ichkari), mussonli (sharq)']],
    matn:'Shimoliy yarimsharda mo‘tadil mintaqa eng keng maydonni egallaydi: Yevropa, Rossiyaning katta qismi, Qozog‘iston, Kanada janubi. Ko‘pchilik darsliklarda O‘zbekiston shu mintaqaning janubiy qismida deb beriladi; iqlimi keskin kontinental.',
    manba:IQM+'; '+UZI},
  subarktik:{nom:'Subarktik mintaqa', sarlavha2:'Oraliq mintaqa · shimoliy yarimshar',
    jadval:[['Yozda','Mo‘tadil havo — qisqa, salqin yoz'],['Qishda','Arktik havo — uzun, qattiq qish'],['Tabiat','Tundra va o‘rmon-tundra'],['Sahnada','65°–70° '+Q],['Misollar','Alyaska shimoli, Kanada shimoli, Rossiya shimoli']],
    matn:'Yoz qisqa bo‘lgani uchun yer ostidagi muzloq (abadiy muzloq) yozda ham to‘liq erimaydi. O‘simliklar past bo‘yli: moxlar, lishayniklar, pakana tol va qayin.',
    manba:IQM+'; '+IQD},
  arktik:{nom:'Arktik mintaqa', sarlavha2:'Asosiy mintaqa · Shimoliy qutb atrofi',
    jadval:[['Havo massasi','Yil bo‘yi arktik havo'],['Harorat','Yil bo‘yi sovuq, qish juda qattiq'],['Hodisalar','Qutb kuni va qutb tuni'],['Sahnada','70°–90° sh.k. '+Q],['Misollar','Grenlandiya, Shimoliy Muz okeani orollari']],
    matn:'Qor va muz Quyosh nurining katta qismini qaytaradi, shuning uchun yozda ham havo kam isiydi. Qutbda Quyosh taxminan yarim yil chiqmaydi va yarim yil botmaydi.',
    manba:IQM+'; '+IQA},
  subantarktik:{nom:'Subantarktik mintaqa', sarlavha2:'Oraliq mintaqa · janubiy yarimshar',
    jadval:[['Yozda','Mo‘tadil havo'],['Qishda','Antarktik havo'],['Joyi','Asosan Janubiy okean ustida'],['Sahnada','65°–70° j.k. '+Q]],
    matn:'Janubiy yarimsharda bu kengliklarda deyarli quruqlik yo‘q — mintaqa asosan okean ustida. Kuchli g‘arbiy shamollar va bo‘ronlar xos.',
    manba:IQM},
  antarktik:{nom:'Antarktik mintaqa', sarlavha2:'Asosiy mintaqa · Antarktida',
    jadval:[['Havo massasi','Yil bo‘yi antarktik havo'],['Rekord','−89,2 °C — Vostok stansiyasi, 1983-yil 21-iyul (WMO)'],['Muz qatlami','Antarktida deyarli butunlay muz bilan qoplangan'],['Sahnada','70°–90° j.k. '+Q]],
    matn:'Antarktida — Yerdagi eng sovuq, eng shamolli va eng baland o‘rtacha balandlikka ega materik. Qalin muz qatlami Quyosh nurining ko‘p qismini qaytaradi.',
    manba:IQM+'; '+IQR}
};
})();


/* ===== geo-ozbekiston ===== */
bogla('geografiya', 'O‘zbekiston tabiiy geografiyasi', 'geo-ozbekiston', '3D relyef xarita: tog‘lar, cho‘llar, daryolar, Orol dengizi — 1960 va hozir', ['O‘zbekiston tabiiy xaritasi']);
(function(){
const UZD = '8-sinf «O‘zbekiston tabiiy geografiyasi» darsligi (O‘zbekiston, amaldagi nashr)';
const UZW = 'Oʻzbekiston geografiyasi (uz.wikipedia.org/wiki/Oʻzbekiston_geografiyasi); Geography of Uzbekistan (en.wikipedia.org/wiki/Geography_of_Uzbekistan — CIA World Factbook ma’lumotlari)';
const UZC = 'O‘zbekistonning geografik o‘rni, chegaralari va maydoni (geografiya.uz/ozbekiston-tabiiy-geografiyasi/11739-...)';
const UZI = 'Oʻzbekiston iqlimi (uz.wikipedia.org/wiki/Oʻzbekiston_iqlimi, O‘zgidromet ma’lumotlari asosida)';
const ORL = 'Wikipedia (inglizcha) «Aral Sea» (en.wikipedia.org/wiki/Aral_Sea); NASA Earth Observatory «World of Change: Shrinking Aral Sea» (earthobservatory.nasa.gov/world-of-change/AralSea)';
const DRY = 'O‘zME / uzpedia.uz «Amudaryo»; Wikipedia (inglizcha) «Amu Darya», «Syr Darya», «Zarafshon (river)»';
const ALP = 'Wikipedia (o‘zbekcha) «Alpomish (choʻqqi)» (uz.wikipedia.org/wiki/Alpomish_(choʻqqi)); zamon.uz, 2024-yil 25-iyul — alpinistlar ko‘tarilishi';
const XRT = 'Xarita: balandliklar — NOAA ETOPO1 (jamoat mulki, 0,1° to‘r), chegaralar, daryolar, ko‘llar — Natural Earth (naturalearthdata.com, jamoat mulki); Zarafshon chizig‘i va balandlik bo‘rttirilishi — SXEMATIK';

D['geo-ozbekiston'] = {
  fan:'geografiya', qisqaNom:'O‘zbekiston tabiati', nom:'O‘zbekiston tabiiy geografiyasi',
  qisqa:'8-sinf · O‘zbekiston tabiiy geografiyasi · 3D relyef xarita',
  sinf:'8-sinf',
  sahna:'kbg_ozbekiston',
  kor:{
    sarlavha:'Tekislik, tog‘ va voha yurti',
    matn:'O‘zbekiston Markaziy Osiyoning markazida, Amudaryo va Sirdaryo oralig‘ida joylashgan. Hududining katta qismi — Turon pasttekisligidagi cho‘llar (Qizilqum, Ustyurt), sharqi va janubi-sharqi — Tyan-Shan va Pomir-Oloy tog‘ tizmalari. Hayot asosan daryo vodiylari va vohalarda: Farg‘ona vodiysi, Zarafshon, Toshkent, Xorazm vohalari. 3D xaritada relyefni aylantiring, tog‘ va cho‘llarni bosing, daryolarni ajrating va Orol dengizining 1960-yildagi va hozirgi qirg‘og‘ini solishtiring. Balandliklar bo‘rttirilgan — xarita sxematik.',
    punktlar:[
      '<b>Maydoni:</b> 448,9 ming km² (O‘zbekiston manbalari; CIA World Factbook — 447,4 ming km²)',
      '<b>Eng baland nuqta:</b> darsliklarda Hazrati Sulton (4 643 m, Hisor tizmasi); 2023-yilgi GPS o‘lchovi bo‘yicha 6 km janubdagi Alpomish cho‘qqisi (4 668 m) balandroq',
      '<b>Eng past nuqta:</b> Mingbuloq botig‘i (Qizilqum) — dengiz sathidan −12 m (ba’zi manbalarda −12,8 m)',
      '<b>Ikki karra dengizga chiqa olmaydigan</b> davlat: qo‘shnilarining hech biri ham okeanga chiqmaydi (dunyoda bunday davlat ikkita — O‘zbekiston va Lixtenshteyn)'
    ]
  },
  bolimlar:[
    {sarlavha:'Geografik o‘rni va chegaralari', jadval:[
      ['Kengliklar','37°11′ sh.k. (Termiz yaqini) — 45°36′ sh.k. (Ustyurtning shimoli-sharqi)'],
      ['Uzunliklar','56°00′ sh.u. (Ustyurt) — 73°10′ sh.u. (Farg‘ona vodiysining sharqi)'],
      ['O‘lchamlari','g‘arbdan sharqqa ≈ 1 400 km, shimoldan janubga ≈ 925 km (boshqa manbalarda 1 425 va 930 km)'],
      ['Chegara uzunligi','6 221 km: Qozog‘iston 2 203, Turkmaniston 1 621, Tojikiston 1 161, Qirg‘iziston 1 099, Afg‘oniston 137 km (CIA World Factbook)'],
      ['Maxsus holat','Ikki karra dengizga chiqa olmaydigan davlat (ikkinchisi — Lixtenshteyn)']
    ]},
    {sarlavha:'Relyef: rekordlar va yirik shakllar', jadval:[
      ['Tekisliklar','Turon pasttekisligi: Qizilqum (≈ 298–300 ming km², qismi Qozog‘iston va Turkmanistonda), Ustyurt platosi (≈ 200 ming km²)'],
      ['Tog‘lar','G‘arbiy Tyan-Shan (Chotqol, Qurama, Piskom, Ugom), Pomir-Oloy tizmalari (Hisor, Zarafshon, Turkiston), Nurota tog‘lari'],
      ['Eng baland','Hazrati Sulton 4 643 m (darsliklar); Alpomish 4 668 m (2023, GPS o‘lchovi)'],
      ['Eng past','Mingbuloq botig‘i −12 m (ba’zi manbalarda −12,8 m)'],
      ['Botiqlar','Farg‘ona vodiysi — tog‘lar bilan o‘ralgan botiq (≈ 22 ming km², taxminiy)']
    ], matn:'Balandlik farqi — 4 650 m dan ortiq. Hududning katta qismi (taxminan to‘rtdan uch qismidan ko‘prog‘i) tekislik; manbalarda cho‘llar ulushi ≈ 80 % deb beriladi (taxminiy).'},
    {sarlavha:'Daryolar va Orol dengizi', jadval:[
      ['Amudaryo','Panj va Vaxsh qo‘shilishidan hosil bo‘ladi; uzunligi Vaxjir–Vohondaryo boshlanishi bilan 2 540 km (O‘zME), inglizcha manbalarda 2 400 km'],
      ['Sirdaryo','Norin va Qoradaryo Farg‘ona vodiysida qo‘shilib hosil qiladi; 2 212 km (o‘zbek manbalari), inglizcha manbalarda ≈ 2 256 km'],
      ['Zarafshon','877 km; Zarafshon muzligidan boshlanadi, Panjakent, Samarqand, Buxoro yonidan oqib, Qorako‘ldan keyin cho‘lda tugaydi'],
      ['Orol, 1960','68 ming km², sath 53,4 m, hajmi ≈ 1 100 km³ — dunyodagi 4-katta ko‘l'],
      ['Orol, hozir','1987-yilda ikkiga bo‘lingan; 2005 — Ko‘korol to‘g‘oni; 2014 — Katta Orolning sharqiy havzasi to‘liq qurigan; 2018: Kichik Orol ≈ 3,1 ming km², Katta Orol ≈ 5,2 ming km²']
    ]},
    {sarlavha:'Iqlim (qisqacha)', jadval:[
      ['Turi','Keskin kontinental, quruq'],
      ['Iyul','o‘rtacha +26 °C (shimol) … +30 °C (janub); Termizda eng yuqori +50 °C'],
      ['Yanvar','o‘rtacha −8 °C (shimol) … 0 °C (janub); Ustyurtda eng past −38 °C'],
      ['Yog‘in','cho‘llarda ≈ 100 mm/yil, tog‘ oldlarida 300–550 mm, g‘arbiy yonbag‘irlarda 800–900 mm gacha'],
      ['Quyoshli soatlar','yiliga 2 500–3 100 soat']
    ]}
  ],
  bosqichlar:[
    {sarlavha:'O‘zbekiston xaritada', matn:'Mamlakat 37°11′–45°36′ sh.k. va 56°00′–73°10′ sh.u. orasida joylashgan. Uning beshta qo‘shnisi — Qozog‘iston, Qirg‘iziston, Tojikiston, Afg‘oniston va Turkmaniston — ham okeanga chiqmaydi. Shuning uchun O‘zbekiston ikki karra dengizga chiqa olmaydigan davlat. Relyefni aylantirib ko‘ring: g‘arbda tekis, sharqda tog‘li.', holat:{rejim:'relyef', belgi:'toshkent'}},
    {sarlavha:'Turon pasttekisligi: Qizilqum va Ustyurt', matn:'Hududning katta qismini Turon pasttekisligi egallaydi. Amudaryo va Sirdaryo oralig‘idagi Qizilqum — O‘rta Osiyodagi eng katta cho‘llardan biri (≈ 300 ming km²). Uning ichida qoldiq past tog‘lar va botiqlar bor; eng past nuqta — Mingbuloq botig‘i (−12 m). G‘arbda Ustyurt platosi tik jarlar (chinklar) bilan tugaydi.', holat:{rejim:'relyef', belgi:'qizilqum'}},
    {sarlavha:'Tog‘lar: Tyan-Shan va Pomir-Oloy', matn:'Shimoli-sharqda G‘arbiy Tyan-Shan tizmalari — Chotqol, Qurama, Piskom, Ugom. Janubi-sharqda Pomir-Oloy tizmalari — Turkiston, Zarafshon, Hisor. Hisor tizmasidagi Hazrati Sulton (4 643 m) darsliklarda eng baland nuqta deb beriladi; 2023-yilgi GPS o‘lchovi bo‘yicha undan 6 km janubdagi Alpomish cho‘qqisi (4 668 m) balandroq ekani aniqlangan.', holat:{rejim:'relyef', belgi:'hazrati_sulton'}},
    {sarlavha:'Farg‘ona vodiysi', matn:'Farg‘ona vodiysi — shimoldan Tyan-Shan, janubdan Oloy tog‘lari bilan o‘ralgan botiq. Tog‘lar sovuq shamollardan to‘sadi, daryolar esa suv keltiradi — shuning uchun vodiy mamlakatning eng zich yashaydigan dehqonchilik o‘lkasi. Sirdaryo shu yerda Norin va Qoradaryo qo‘shilishidan hosil bo‘ladi.', holat:{rejim:'relyef', belgi:'fargona'}},
    {sarlavha:'Daryolar: Amudaryo, Sirdaryo, Zarafshon', matn:'Ikki eng yirik daryo tog‘lardagi qor va muzliklardan to‘yinadi va cho‘l orqali Orolga oqqan. Amudaryo (2 540 km, boshlanishi bilan) — Markaziy Osiyoning eng serob daryosi; Sirdaryo (2 212 km) — eng uzuni. Zarafshon (877 km) Samarqand va Buxoro vohalarini sug‘oradi, lekin hozir Amudaryoga yetib bormaydi. «Suvlar» rejimida daryolar ajratilgan.', holat:{rejim:'suvlar', belgi:'amudaryo'}},
    {sarlavha:'Orol dengizi: 1960 va hozir', matn:'1960-yilda Orol maydoni 68 ming km² bo‘lgan — dunyodagi to‘rtinchi eng katta ko‘l. Daryolar suvi sug‘orishga olingach, dengiz tez qisqargan: 1987-yilda ikkiga bo‘lingan, 2014-yilda Katta Orolning sharqiy havzasi butunlay qurigan. Qurigan tubida Orolqum cho‘li paydo bo‘ldi. «Orol» rejimida 1960 va hozirgi qirg‘oqni almashtiring.', holat:{rejim:'orol', orol:'1960', belgi:'orol'}},
    {sarlavha:'Xulosa: tabiat va inson', matn:'O‘zbekiston tabiati qarama-qarshiliklardan iborat: −12 m dan 4 600 m dan ortiq balandlikkacha, cho‘l va muzliklar, quruq tekislik va serob tog‘ daryolari. Suv — eng qimmatli boylik; uni tejash va Orol bo‘yida hayotni tiklash (saksovul ekish, Kichik Orolni saqlab qolish) — bugungi asosiy vazifalardan.', holat:{rejim:'orol', orol:'hozir', belgi:null}}
  ],
  amaliyot:{tur:'shart', sarlavha:'Xaritada toping', holat:{rejim:'relyef', orol:'1960', belgi:null},
    topshiriqlar:[
      {shart:'Amudaryo va Sirdaryo oralig‘idagi eng katta cho‘l — <b>Qizilqumni</b> bosing.', hodisa:'kbg-uz', kod:"ev.nom==='qizilqum'", izoh:'To‘g‘ri — <b>Qizilqum</b>. Maydoni ≈ 300 ming km², bir qismi Qozog‘iston va Turkmanistonda.'},
      {shart:'Darsliklarda eng baland nuqta deb berilgan <b>Hazrati Sulton</b> cho‘qqisini toping (Hisor tizmasi, janubi-sharq).', hodisa:'kbg-uz', kod:"ev.nom==='hazrati_sulton'", izoh:'To‘g‘ri — <b>Hazrati Sulton, 4 643 m</b>. Yangi o‘lchovga ko‘ra 6 km janubdagi Alpomish (4 668 m) balandroq.'},
      {shart:'Tog‘lar bilan o‘ralgan, eng zich aholili <b>Farg‘ona vodiysini</b> bosing.', hodisa:'kbg-uz', kod:"ev.nom==='fargona'", izoh:'To‘g‘ri — <b>Farg‘ona vodiysi</b>. Sirdaryo shu yerda Norin va Qoradaryodan hosil bo‘ladi.'},
      {shart:'Mamlakatning janubiy chegarasi bo‘ylab oqadigan <b>Amudaryoni</b> bosing.', hodisa:'kbg-uz', kod:"ev.nom==='amudaryo'", izoh:'To‘g‘ri — <b>Amudaryo</b>. Termiz yaqinida Afg‘oniston bilan chegara shu daryo bo‘ylab o‘tadi.'},
      {shart:'Orol dengizining <b>hozirgi</b> qirg‘og‘ini ko‘rsating (1960 → hozir).', hodisa:'kbg-uz-holat', kod:"ev.orol==='hozir'", izoh:'To‘g‘ri. 1960-yildagi 68 ming km² dan hozir faqat bir necha ming km² qolgan: Kichik Orol va Katta Orolning g‘arbiy qismi.'},
      {shart:'Poytaxt — <b>Toshkent</b> shahrini toping.', hodisa:'kbg-uz', kod:"ev.nom==='toshkent'", izoh:'To‘g‘ri — <b>Toshkent</b>, Chirchiq vohasida, 41°18′ sh.k.'}
    ]},
  test:[
    {s:'O‘zbekiston maydoni taxminan qancha?', v:['148,9 ming km²','448,9 ming km²','948,9 ming km²','2 724,9 ming km²'], t:1, izoh:'<b>448,9 ming km²</b> (O‘zbekiston manbalari; CIA World Factbook — 447,4 ming km²). 2 724,9 ming km² — Qozog‘iston maydoni.'},
    {s:'Nega O‘zbekiston «ikki karra dengizga chiqa olmaydigan» davlat deyiladi?', v:['Unda ikkita ko‘l bor','O‘zi ham, barcha qo‘shnilari ham okeanga chiqmaydi','U ikki okeandan teng uzoqlikda','Ikki daryo dengizga yetmaydi'], t:1, izoh:'<b>O‘zi ham, barcha qo‘shnilari ham okeanga chiqmaydi</b>. Bunday davlat dunyoda ikkita: O‘zbekiston va Lixtenshteyn.'},
    {s:'Qaysi davlat O‘zbekiston bilan chegaradosh EMAS?', v:['Turkmaniston','Afg‘oniston','Eron','Qirg‘iziston'], t:2, izoh:'<b>Eron</b> bilan chegara yo‘q. Qo‘shnilar: Qozog‘iston, Qirg‘iziston, Tojikiston, Afg‘oniston, Turkmaniston.'},
    {s:'O‘zbekiston bilan eng uzun chegaraga ega qo‘shni qaysi?', v:['Qozog‘iston','Afg‘oniston','Tojikiston','Qirg‘iziston'], t:0, izoh:'<b>Qozog‘iston</b> — 2 203 km. Eng qisqasi — Afg‘oniston (137 km) (CIA World Factbook).'},
    {s:'O‘zbekistonning eng past nuqtasi qaysi?', v:['Orol dengizi tubi','Mingbuloq botig‘i','Farg‘ona vodiysi','Sariqamish ko‘li'], t:1, izoh:'<b>Mingbuloq botig‘i</b> (Qizilqum) — −12 m (ba’zi manbalarda −12,8 m).'},
    {s:'Darsliklarda O‘zbekistonning eng baland nuqtasi deb berilgan Hazrati Sulton cho‘qqisi qaysi tizmada?', v:['Chotqol','Hisor','Nurota','Qurama'], t:1, izoh:'<b>Hisor</b> tizmasida (4 643 m, Surxondaryo viloyati). 2023-yilda o‘lchangan Alpomish (4 668 m) ham shu tizmada.'},
    {s:'Qaysi tog‘ tizmalari G‘arbiy Tyan-Shanga kiradi?', v:['Hisor va Zarafshon','Chotqol va Qurama','Nurota va Turkiston','Ustyurt va Qizilqum'], t:1, izoh:'<b>Chotqol va Qurama</b> (shuningdek Piskom, Ugom). Hisor, Zarafshon, Turkiston — Pomir-Oloy tizmalari.'},
    {s:'Sirdaryo qaysi ikki daryoning qo‘shilishidan hosil bo‘ladi?', v:['Panj va Vaxsh','Norin va Qoradaryo','Chirchiq va Ohangaron','Zarafshon va Qashqadaryo'], t:1, izoh:'<b>Norin va Qoradaryo</b> — Farg‘ona vodiysida. Panj va Vaxsh esa Amudaryoni hosil qiladi.'},
    {s:'Zarafshon daryosi hozir qayerda tugaydi?', v:['Orol dengiziga quyiladi','Amudaryoga quyiladi','Qorako‘ldan keyin cho‘lda sug‘orishga sarflanib tugaydi','Sirdaryoga quyiladi'], t:2, izoh:'<b>Qorako‘ldan keyin cho‘lda</b> — suvi sug‘orishga sarflanadi va Amudaryoga yetib bormaydi.'},
    {s:'1960-yilda Orol dengizining maydoni qancha bo‘lgan?', v:['≈ 8 ming km²','≈ 28 ming km²','≈ 68 ming km²','≈ 168 ming km²'], t:2, izoh:'<b>≈ 68 ming km²</b> — dunyodagi to‘rtinchi eng katta ko‘l. 2018-yilda ikki qismi birgalikda ≈ 8,3 ming km².'},
    {s:'Orol dengizining qurishiga asosiy sabab nima?', v:['Zilzilalar','Amudaryo va Sirdaryo suvining sug‘orishga olinishi','Dengizning okeanga oqib ketishi','Yog‘inlar ko‘payishi'], t:1, izoh:'<b>Daryolar suvining sug‘orishga olinishi</b>: 1960-yillardan boshlab paxta va sholi dalalari uchun suv katta miqdorda olinib, dengizga deyarli yetmay qolgan.'},
    {s:'O‘zbekistonda qayd etilgan eng yuqori harorat (+50 °C) qaysi shaharda kuzatilgan?', v:['Nukus','Toshkent','Termiz','Samarqand'], t:2, izoh:'<b>Termiz</b>da — mamlakatning eng janubiy va eng issiq joylaridan biri. Eng past harorat (−38 °C) Ustyurtda.'},
    {tur:'3d', s:'Xaritada <b>Qizilqum</b> cho‘lini bosing.', hodisa:'kbg-uz', kalit:'nom', togri:['qizilqum'], v:['Qizilqum','boshqa joy'], t:0,
     izoh:'<b>Qizilqum</b> — Amudaryo va Sirdaryo oralig‘idagi ulkan cho‘l (≈ 300 ming km²).'},
    {tur:'3d', s:'Xaritada <b>Orol dengizini</b> bosing.', hodisa:'kbg-uz', kalit:'nom', togri:['orol'], v:['Orol dengizi','boshqa joy'], t:0,
     izoh:'<b>Orol dengizi</b> — mamlakatning shimoli-g‘arbida, Qoraqalpog‘iston va Qozog‘iston chegarasida. 1960-yildan beri maydoni bir necha barobar qisqargan.'}
  ],
  yordamchi:[
    {s:'Eng baland nuqta — Hazrati Sultonmi yoki Alpomishmi?', j:'Darsliklarda Hazrati Sulton (4 643 m) beriladi. 2023-yilda MIT tadqiqotchisi Erik Gilbertson GPS bilan o‘lchab, undan 6 km janubdagi cho‘qqi (Alpomish) ≈ 25 m balandroq — taxminan 4 668 m chiqqanini e’lon qilgan (dala o‘lchovi; natija o‘lchash usuliga bog‘liq); 2024-yil iyulida o‘zbek alpinistlari unga ko‘tarilgan. Rasmiy darsliklar hali yangilanmagan bo‘lishi mumkin — ikkala qiymatni biling.', kalit:['baland','hazrati','alpomish','cho‘qqi']},
    {s:'Nega daryolar uzunligi manbalarda har xil?', j:'Uzunlik daryoning qayeridan boshlab o‘lchanishiga bog‘liq. Amudaryo Panj va Vaxsh qo‘shilgan joydan hisoblansa qisqaroq, Panjning boshi (Vaxjir–Vohondaryo) bilan hisoblansa 2 540 km. Sirdaryo — 2 212 km, lekin Norin boshidan hisoblansa ancha uzun. Bundan tashqari, daryo o‘zani vaqt o‘tishi bilan o‘zgaradi.', kalit:['uzunlik','daryo','farq','amudaryo','sirdaryo']},
    {s:'Xaritadagi balandliklar aniqmi?', j:'Balandliklar NOAA ETOPO1 ma’lumotidan olingan (to‘r qadami ≈ 0,1°, ya’ni ≈ 10 km), shuning uchun alohida cho‘qqilar tekislanib ketgan. Bundan tashqari, tog‘lar ko‘rinishi uchun balandlik bo‘rttirilgan. Xarita sxematik — aniq raqamlar uchun darslik va jadvallarga qarang.', kalit:['aniq','balandlik','xarita','sxema']}
  ],
  maqola:[
    {sarlavha:'Geografik o‘rni', xatboshilar:[
      'O‘zbekiston Markaziy Osiyoning markaziy qismida, Amudaryo va Sirdaryo daryolari oralig‘ida joylashgan. Uning eng shimoliy nuqtasi Ustyurtning shimoli-sharqida (45°36′ sh.k.), eng janubiysi Termiz yaqinida (37°11′ sh.k.), eng g‘arbiysi Ustyurtda (56°00′ sh.u.), eng sharqiysi Farg‘ona vodiysining sharqida (73°10′ sh.u.). G‘arbdan sharqqa ≈ 1 400 km, shimoldan janubga ≈ 925 km cho‘zilgan (boshqa manbalarda 1 425 va 930 km).',
      'Maydoni 448,9 ming km² (CIA World Factbook bo‘yicha 447,4 ming km²). Chegaralarning umumiy uzunligi 6 221 km: Qozog‘iston bilan 2 203 km, Turkmaniston bilan 1 621 km, Tojikiston bilan 1 161 km, Qirg‘iziston bilan 1 099 km, Afg‘oniston bilan 137 km.',
      'O‘zbekiston ham, uning barcha qo‘shnilari ham dunyo okeaniga chiqmaydi. Bunday «ikki karra dengizga chiqa olmaydigan» davlatlar dunyoda ikkita: O‘zbekiston va Yevropadagi Lixtenshteyn. Okeandan uzoqligi iqlimning keskin kontinental va quruq bo‘lishiga asosiy sababdir.'
    ]},
    {sarlavha:'Relyef: tekisliklar va tog‘lar', xatboshilar:[
      'Hududning katta qismini Turon pasttekisligining tekisliklari egallaydi. Amudaryo va Sirdaryo oralig‘ida Qizilqum cho‘li yastanib yotadi (≈ 298–300 ming km², bir qismi Qozog‘iston va Turkmanistonda). Qizilqum ichida qoldiq past tog‘lar (Tomdi, Quljuqtov va boshqalar) va botiqlar bor. Mamlakatning eng past nuqtasi — Mingbuloq botig‘i dengiz sathidan 12 m past (ba’zi manbalarda −12,8 m).',
      'Shimoli-g‘arbda, Orol va Kaspiy oralig‘ida Ustyurt platosi joylashgan (≈ 200 ming km², katta qismi Qozog‘iston va Turkmanistonda). U atrofidagi tekisliklardan tik jarlar — chinklar bilan ajralib turadi. Ustyurt — mamlakatning eng sovuq joylaridan biri: bu yerda −38 °C qayd etilgan.',
      'Sharq va janubi-sharqda tog‘lar: G‘arbiy Tyan-Shan tizmalari (Chotqol, Qurama, Piskom, Ugom) va Pomir-Oloy tizmalari (Turkiston, Zarafshon, Hisor). Piskom tizmasidagi Beshtor cho‘qqisi 4 299 m (ba’zi manbalarda 4 291 m). Hisor tizmasidagi Hazrati Sulton cho‘qqisi (4 643 m) uzoq vaqt eng baland nuqta hisoblangan; 2023-yilgi GPS o‘lchoviga ko‘ra 6 km janubdagi Alpomish cho‘qqisi 4 668 m bilan undan balandroq.',
      'Markazda, Qizilqum va Zarafshon vodiysi oralig‘ida, Nurota tog‘lari joylashgan (eng baland nuqtasi Hayotboshi, 2 169 m). Farg‘ona vodiysi — har tomondan tog‘lar bilan o‘ralgan tektonik botiq; tog‘lar uni sovuq shamollardan to‘sadi.'
    ]},
    {sarlavha:'Iqlim va ichki suvlar', xatboshilar:[
      'Iqlim keskin kontinental va quruq. Iyulda o‘rtacha harorat shimolda +26 °C, janubda +30 °C; Termizda +50 °C gacha ko‘tarilgan. Yanvarda shimolda o‘rtacha −8 °C, janubda 0 °C atrofida. Yog‘in kam: cho‘llarda yiliga ≈ 100 mm, tog‘ oldlarida 300–550 mm, tog‘larning nam havoga ro‘para g‘arbiy yonbag‘irlarida 800–900 mm gacha. Yog‘inning asosiy qismi qish va bahorda yog‘adi (O‘zgidromet ma’lumotlari).',
      'Daryolar asosan tog‘lardagi qor va muzliklardan to‘yinadi, shuning uchun eng ko‘p suv yozning boshida — qor va muz eriganda keladi. Amudaryo Panj va Vaxsh qo‘shilishidan hosil bo‘ladi; uning uzunligi Vaxjir–Vohondaryo boshlanishi bilan 2 540 km (inglizcha manbalarda 2 400 km). Sirdaryo Farg‘ona vodiysida Norin va Qoradaryo qo‘shilishidan hosil bo‘ladi; uzunligi 2 212 km (inglizcha manbalarda ≈ 2 256 km).',
      'Zarafshon (877 km) Zarafshon muzligidan boshlanib, Tojikistondagi Panjakent, so‘ng Samarqand va Buxoro yonidan oqib o‘tadi va Qorako‘ldan keyin cho‘lda sug‘orishga sarflanib tugaydi — Amudaryoga yetib bormaydi. Daryolardan ko‘plab kanallar chiqarilgan; vohalar shu suv hisobiga yashaydi.'
    ]},
    {sarlavha:'Orol fojiasi', xatboshilar:[
      '1960-yilda Orol dengizining maydoni 68 ming km², suv sathi 53,4 m, hajmi ≈ 1 100 km³ bo‘lgan — u dunyodagi to‘rtinchi eng katta ko‘l edi. Uni Amudaryo (janubdan) va Sirdaryo (shimoldan) suv bilan ta’minlagan.',
      '1960-yillardan boshlab daryolar suvi paxta va sholi dalalarini sug‘orishga keng olina boshladi, dengizga yetib boradigan suv keskin kamaydi. Dengiz 1987-yilda Kichik (shimoliy) va Katta (janubiy) Orolga bo‘lingan. 2005-yilda Qozog‘istonda Ko‘korol to‘g‘oni qurilib, Kichik Orol sathi qisman tiklandi. 2014-yil avgustida Katta Orolning sharqiy havzasi butunlay qurigan (NASA sun’iy yo‘ldosh suratlari).',
      '2018-yilda Kichik Orol maydoni ≈ 3,1 ming km², Katta Orolniki ≈ 5,2 ming km² bo‘lgan. Qurigan dengiz tubida Orolqum cho‘li paydo bo‘ldi; undan ko‘tarilgan tuz va chang Orol bo‘yi aholisi salomatligi va dehqonchiligiga zarar yetkazadi. Hozir qurigan tubga saksovul va boshqa cho‘l o‘simliklari ekilmoqda.'
    ]},
    {sarlavha:'Ko‘p uchraydigan xatolar', xatboshilar:[
      'Birinchi xato — O‘zbekistonni «tog‘li mamlakat» deb bilish. Aslida hududning katta qismi tekislik va cho‘l; tog‘lar sharq va janubi-sharqda. Ikkinchi xato — daryo uzunliklarini bitta aniq raqam deb yodlash: manbalar daryoni qayerdan o‘lchashga qarab turli raqam beradi.',
      'Uchinchi xato — eng baland nuqta haqida faqat bitta javobni bilish. Darsliklarda Hazrati Sulton (4 643 m), yangi o‘lchovda Alpomish (4 668 m). To‘rtinchi xato — 3D xaritadagi balandliklarni aniq deb qabul qilish: ular bo‘rttirilgan va ≈ 10 km li to‘r bilan soddalashtirilgan.'
    ]}
  ],
  formulalar:[
    ['4 668 − (−12) = 4 680 m','Eng baland va eng past nuqtalar farqi (Hazrati Sulton bo‘yicha: 4 643 + 12 = 4 655 m)'],
    ['68 000 : 8 300 ≈ 8,2','Orol maydoni 1960-yildan 2018-yilgacha taxminan 8 marta kichraygan'],
    ['2 203 + 1 621 + 1 161 + 1 099 + 137 = 6 221 km','Chegaralar uzunligi yig‘indisi'],
    ['45°36′ − 37°11′ = 8°25′ ≈ 8,4°; 8,4 × 111 km ≈ 935 km','Kengliklar farqidan shimol–janub o‘lchamini baholash'],
    ['Masshtab: 1 : 10 000 000 → 1 sm = 100 km','Xaritada masofani o‘lchash']
  ],
  qiziqarli:[
    'O‘zbekiston va Lixtenshteyn — dunyodagi ikki karra dengizga chiqa olmaydigan yagona davlatlar.',
    'Alpomish cho‘qqisiga o‘zbek alpinistlari birinchi marta 2024-yil iyulida ko‘tarilib, unga «Yangi O‘zbekiston» nomini berishni taklif qilgan (taklif rasmiy emas).',
    '1960-yilda Orol dengizi dunyodagi to‘rtinchi eng katta ko‘l bo‘lgan; hozir uning o‘rnida Orolqum cho‘li.',
    'Zarafshon nomi forschadan «oltin sochuvchi» deb tarjima qilinadi — yuqori oqimidagi oltinli qumlar tufayli; qadimgi yunonlar uni Politimet deb atagan.',
    'Mamlakatda yiliga 2 500–3 100 soat quyoshli vaqt bo‘ladi.'
  ],
  lugat:[
    ['Pasttekislik','Dengiz sathidan 200 m gacha balandlikdagi tekislik.'],
    ['Plato','Atrofidan tik jarlar bilan ajralgan baland tekislik.'],
    ['Chink','Ustyurt platosining tik jarliklari.'],
    ['Botiq','Atrofidan past joy; ba’zan dengiz sathidan ham past.'],
    ['Tizma','Bir yo‘nalishda cho‘zilgan tog‘lar qatori.'],
    ['Vodiy','Tog‘lar orasidagi cho‘ziq past joy, odatda daryo bo‘yida.'],
    ['Voha','Cho‘l yoki quruq joyda suv bor, yashil hudud.'],
    ['Muzlik','Tog‘ va qutblarda to‘planib, sekin harakatlanadigan muz massasi.'],
    ['Delta','Daryo quyilish joyida ko‘p tarmoqqa bo‘lingan cho‘kindi yerlar.'],
    ['Kontinental iqlim','Okeandan uzoq, yoz-qish farqi katta, quruq iqlim.'],
    ['Gipsometrik rang','Xaritada balandlikni rang bilan ko‘rsatish (yashil — past, jigarrang — baland).'],
    ['Orolqum','Orol dengizining qurigan tubida paydo bo‘lgan cho‘l.']
  ],
  manba:UZD+'; '+UZW+'; '+UZC+'; '+UZI+'; '+DRY+'; '+ORL+'; '+ALP+'; '+XRT+'. Manbalar farqi: maydoni 448,9 / 447,4 ming km²; eng baland nuqta 4 643 m (Hazrati Sulton) / 4 668 m (Alpomish, 2023); Mingbuloq −12 / −12,8 m; Amudaryo 2 540 / 2 400 km; Sirdaryo 2 212 / ≈ 2 256 km; o‘lchamlar 1 400 × 925 / 1 425 × 930 km; Beshtor 4 299 / 4 291 m. Taxminiy: Farg‘ona vodiysi maydoni (≈ 22 ming km²), cho‘llar ulushi (≈ 80 %).',
  ishlanma:{
    sinf:'8-sinf', vaqt:'45 daqiqa', tur:'Yangi bilim berish (xarita bilan ishlash)', usul:'3D relyef xarita, kontur xarita, guruhlarda «ekspeditsiya», muammoli savol',
    maqsad:{talimiy:'O‘zbekistonning geografik o‘rni, chegaralari, relyefining yirik shakllari, asosiy daryolari va Orol muammosini o‘rganish.',
      tarbiyaviy:'Vatan tabiatiga muhabbat, suvni tejash va ekologik mas’uliyatni tarbiyalash.',
      rivojlantiruvchi:'Xarita o‘qish, manbalardagi raqamlarni solishtirish, sabab-oqibat bog‘lash ko‘nikmasini rivojlantirish.'},
    natijalar:['O‘zbekistonning chekka nuqtalari va qo‘shnilarini aytadi','Xaritada Qizilqum, Ustyurt, Farg‘ona vodiysi, asosiy tog‘ tizmalarini ko‘rsatadi','Eng baland va eng past nuqtalarni (manbalar farqi bilan) aytadi','Amudaryo, Sirdaryo, Zarafshonni xaritada ko‘rsatadi','Orol dengizi qurishi sabab va oqibatlarini tushuntiradi'],
    jihozlar:['MAKON sahnasi «O‘zbekiston tabiiy geografiyasi» (3D relyef xarita)','O‘zbekiston tabiiy xaritasi (atlas)','Kontur xarita va rangli qalamlar','Tarqatma: «ekspeditsiya kundaligi»','Darslik'],
    bosqichlar:[
      ['0–3','<b>Tashkiliy qism.</b>','Tinglaydi.'],
      ['3–8','<b>Muammoli savol.</b> «Nega aholining katta qismi hududning kichik qismida — vodiy va vohalarda yashaydi?»','Taxmin aytadi.'],
      ['8–20','<b>3D xarita bo‘ylab sayohat.</b> MAKON da bosqichlar: geografik o‘rin → Qizilqum va Ustyurt → tog‘lar → Farg‘ona vodiysi → daryolar → Orol. Balandliklar bo‘rttirilganini aytadi.','Kundalikka obyekt va raqamlarni yozadi.'],
      ['20–30','<b>Guruhlarda «ekspeditsiya».</b> 4 guruh: cho‘l, tog‘, daryo, Orol — har biri 3 fakt va 1 muammo topadi.','Guruhda ishlaydi, taqdim etadi.'],
      ['30–36','<b>Manbalarni solishtirish.</b> Hazrati Sulton / Alpomish, daryo uzunliklari — nega raqamlar farq qiladi?','Muhokama qiladi.'],
      ['36–43','<b>Mustahkamlash.</b> MAKON «Xaritada toping» amaliyoti va test.','Amaliyot va test.'],
      ['43–45','<b>Yakun, uyga vazifa.</b>','Yozib oladi.']],
    lugat:[['Plato','Tik jarlar bilan ajralgan baland tekislik.'],['Botiq','Atrofidan past joy.'],['Tizma','Bir yo‘nalishdagi tog‘lar qatori.'],['Voha','Cho‘ldagi suvli yashil hudud.'],['Orolqum','Orolning qurigan tubidagi cho‘l.']],
    savollar:[['O‘zbekiston maydoni?','448,9 ming km²'],['Eng past nuqta?','Mingbuloq botig‘i, −12 m'],['Sirdaryo qaysi daryolardan hosil bo‘ladi?','Norin va Qoradaryo'],['Orol 1960-yildagi maydoni?','≈ 68 ming km²'],['Qo‘shni davlatlar soni?','5 ta']],
    uy:'Darslikdagi mavzuni o‘qish; (1) kontur xaritaga chekka nuqtalar, Qizilqum, Ustyurt, Farg‘ona vodiysi, 5 ta tog‘ tizmasi, Amudaryo, Sirdaryo, Zarafshon va Orolni tushiring; (2) eng baland va eng past nuqtalar farqini ikkala qiymat bo‘yicha hisoblang (4 680 m va 4 655 m); (3) «Orolni qanday qutqarish mumkin?» mavzusida 5–7 gaplik fikr yozing.',
    manba:UZD+'; '+UZW+'; '+ORL
  }
};

DT.kbg_ozbekiston = {
  qizilqum:{nom:'Qizilqum cho‘li', sarlavha2:'Turon pasttekisligi · Amudaryo va Sirdaryo oralig‘i',
    jadval:[['Maydoni','≈ 298–300 ming km² (qismi Qozog‘iston va Turkmanistonda)'],['Relyefi','Qumli tekislik, qoldiq past tog‘lar (Tomdi, Quljuqtov), botiqlar'],['Eng past nuqta','Mingbuloq botig‘i, −12 m'],['O‘simliklari','Saksovul, quyonsuyak, cherkez (taxminiy ro‘yxat)']],
    matn:'Qizilqum — O‘rta Osiyodagi eng katta cho‘llardan biri. Uning bag‘rida oltin, uran va boshqa foydali qazilmalar konlari bor (masalan, Muruntov oltin koni). Nomi «qizil qum» degani.',
    manba:UZW+'; '+UZD},
  ustyurt:{nom:'Ustyurt platosi', sarlavha2:'Shimoli-g‘arb · Orol va Kaspiy oralig‘i',
    jadval:[['Maydoni','≈ 200 ming km² (asosan Qozog‘iston va Turkmanistonda)'],['Chegaralari','Chinklar — atrofidan tik jarlar'],['Iqlimi','Eng sovuq joylardan: −38 °C qayd etilgan'],['Chekka nuqtalar','O‘zbekistonning eng shimoliy (45°36′) va eng g‘arbiy (56°00′) nuqtalari']],
    matn:'Ustyurt — toshloq, gilli plato; aholisi juda siyrak. Orol dengizi qurigach, uning sharqiy chinki endi qurigan dengiz tubi — Orolqumga qarab turadi.',
    manba:UZW+'; '+UZC+'; '+UZI},
  fargona:{nom:'Farg‘ona vodiysi', sarlavha2:'Sharq · tog‘lar bilan o‘ralgan botiq',
    jadval:[['Maydoni','≈ 22 ming km² (taxminiy)'],['O‘rab turgan tog‘lar','Shimoldan Tyan-Shan (Chotqol, Qurama), janubdan Oloy va Turkiston tizmalari'],['Daryo','Sirdaryo shu yerda Norin va Qoradaryodan hosil bo‘ladi'],['Davlatlar','O‘zbekiston, Qirg‘iziston, Tojikiston']],
    matn:'Vodiy tog‘lar bilan o‘ralgani uchun sovuq shimoliy shamollardan himoyalangan; unumdor tuproq va daryolar suvi uni mamlakatning eng zich aholili dehqonchilik o‘lkasiga aylantirgan. Yog‘in kam — yiliga 100–300 mm, shuning uchun dehqonchilik sug‘orishga asoslangan.',
    manba:UZW+'; '+UZD},
  turon:{nom:'Turon pasttekisligi', sarlavha2:'O‘rta Osiyoning keng tekisligi',
    jadval:[['O‘rni','O‘zbekistonning markazi va g‘arbi, Turkmaniston, Qozog‘iston janubi'],['Tarkibi','Qizilqum, Qoraqum, Ustyurt, daryo deltalari'],['Balandligi','asosan 200 m gacha, qoldiq tog‘lar bundan baland']],
    matn:'Turon pasttekisligi O‘zbekiston hududining katta qismini egallaydi. Bu yerdagi iqlim juda quruq, hayot faqat daryo bo‘ylari va vohalarda (Xorazm, Buxoro) rivojlangan.',
    manba:UZD+'; '+UZW},
  tyanshan:{nom:'G‘arbiy Tyan-Shan', sarlavha2:'Shimoli-sharqiy tog‘lar',
    jadval:[['Tizmalar','Chotqol, Qurama, Piskom, Ugom'],['Beshtor cho‘qqisi','4 299 m (ba’zi manbalarda 4 291 m), Piskom tizmasi'],['Daryolar','Chirchiq, Ohangaron, Piskom, Chotqol'],['Qo‘riqlash','Chotqol biosfera qo‘riqxonasi, Ugom-Chotqol milliy bog‘i']],
    matn:'G‘arbiy Tyan-Shan tog‘lari Toshkent vohasini suv bilan ta’minlaydi: Chirchiq daryosida Chorvoq suv ombori qurilgan. Tog‘larning g‘arbiy yonbag‘irlariga nam havo tushib, eng ko‘p yog‘in shu yerlarda yog‘adi.',
    manba:'Wikipedia (o‘zbekcha) «Piskom tizmasi»; Wikipedia (inglizcha) «Mount Beshtor»; '+UZD},
  hisor:{nom:'Hisor tizmasi', sarlavha2:'Janubi-sharq · Pomir-Oloy',
    jadval:[['O‘rni','Surxondaryo va Qashqadaryo viloyatlari, Tojikiston chegarasi'],['Cho‘qqilari','Hazrati Sulton 4 643 m, Alpomish 4 668 m (2023 o‘lchovi)'],['Daryolar','Surxondaryo, Qashqadaryo irmoqlari'],['Qo‘riqlash','Hisor davlat qo‘riqxonasi']],
    matn:'Hisor tizmasi — O‘zbekistondagi eng baland tog‘lar. Unda muzliklar, chuqur daralar va g‘orlar bor.',
    manba:ALP+'; '+UZD},
  zarafshon_t:{nom:'Zarafshon tizmasi', sarlavha2:'Pomir-Oloy · Zarafshon va Qashqadaryo vodiylari oralig‘i',
    jadval:[['O‘rni','Zarafshon vodiysidan janubda (Samarqand–Qashqadaryo)'],['Davomi','Sharqiy qismi Tojikistonda'],['Ahamiyati','Samarqand vohasini janubdan o‘rab turadi']],
    matn:'Zarafshon tizmasi Zarafshon va Qashqadaryo havzalarini ajratib turadi. Uning O‘zbekistondagi g‘arbiy qismi pastroq; tog‘ oldlarida bog‘dorchilik va lalmi dehqonchilik rivojlangan.',
    manba:UZD},
  turkiston_t:{nom:'Turkiston tizmasi', sarlavha2:'Pomir-Oloy · Zarafshon vodiysidan shimolda',
    jadval:[['O‘rni','Asosan Tojikiston va Qirg‘iziston chegarasida; g‘arbiy uchi Jizzax viloyatida'],['Zarafshon muzligi','Turkiston va Zarafshon tizmalari tutashgan joyda'],['Ahamiyati','Zarafshon daryosi shu yerdan boshlanadi']],
    matn:'Zarafshon muzligi Turkiston va Zarafshon tizmalari tutashgan joyda joylashgan — Zarafshon daryosi shu muzlikdan boshlanadi.',
    manba:DRY+'; '+UZD},
  nurota:{nom:'Nurota tog‘lari', sarlavha2:'Markaz · Qizilqum va Zarafshon vodiysi oralig‘i',
    jadval:[['Eng baland nuqta','Hayotboshi, 2 169 m'],['O‘rni','Jizzax, Navoiy, Samarqand viloyatlari'],['Qo‘riqlash','Nurota davlat qo‘riqxonasi (Severtsov qo‘yi — arxar)'],['Yaqinida','Aydar-Arnasoy ko‘llar tizimi']],
    matn:'Nurota tog‘lari Qizilqum cho‘li ichkarisiga kirib borgan past tog‘lar. Nurota shahridagi Chashma buloqlari qadimdan mashhur.',
    manba:'meros.uz «Nurota tog‘lari»; '+UZD},
  hazrati_sulton:{nom:'Hazrati Sulton cho‘qqisi', sarlavha2:'Hisor tizmasi · 4 643 m',
    jadval:[['Balandligi','4 643 m (darsliklarda — eng baland nuqta)'],['Joyi','Surxondaryo viloyati, Tojikiston chegarasi yaqini'],['Alpomish','6 km janubda, 4 668 m — 2023-yil GPS o‘lchovi (E. Gilbertson), ≈ 25 ± 8 m balandroq'],['Birinchi ko‘tarilish (Alpomish)','o‘zbek alpinistlari, 2024-yil iyul']],
    matn:'Sovet davrida o‘tkazilgan o‘lchovlarda Hazrati Sulton eng baland nuqta deb qabul qilingan. 2023-yildagi o‘lchov undan janubdagi cho‘qqi balandroq ekanini ko‘rsatdi; unga Alpomish nomi berilgan. Alpinistlar «Yangi O‘zbekiston» nomini taklif qilgan (rasmiy emas). Xaritada belgi Hisor tizmasining eng baland qismida, sxematik.',
    manba:ALP+'; '+UZW},
  mingbuloq:{nom:'Mingbuloq botig‘i', sarlavha2:'Qizilqum · eng past nuqta',
    jadval:[['Balandligi','−12 m (ba’zi manbalarda −12,8 m)'],['Joyi','Qizilqum, Navoiy viloyati'],['Turi','Berk botiq, sho‘rxoklar bilan']],
    matn:'Mingbuloq — O‘zbekistonning dengiz sathidan past yagona yirik joyi. Inglizcha manbalarda eng past nuqta sifatida ba’zan boshqa joy (Sariqamish ko‘li atrofi) ham ko‘rsatiladi — manbalar farq qiladi.',
    manba:UZW+'; '+UZD},
  amudaryo:{nom:'Amudaryo', sarlavha2:'Markaziy Osiyoning eng serob daryosi',
    jadval:[['Hosil bo‘lishi','Panj va Vaxsh qo‘shilishidan'],['Uzunligi','2 540 km (Vaxjir–Vohondaryo boshlanishi bilan, O‘zME); inglizcha manbalarda 2 400 km'],['Havzasi','≈ 465 ming km² (O‘zME); inglizcha manbalarda ≈ 535 ming km²'],['Suv oqimi','Karki yaqinida ko‘p yillik o‘rtacha ≈ 68,1 km³/yil (1926–1973)'],['Quyilishi','Orol dengiziga; hozir ko‘p yillarda yetib bormaydi']],
    matn:'Amudaryo Termiz yaqinida Afg‘oniston bilan chegara bo‘ylab oqadi, so‘ng Qoraqum va Qizilqum orasidan o‘tib, Xorazm va Qoraqalpog‘iston vohalarini sug‘oradi. Qadimgi yunonlar uni Oks deb atagan.',
    manba:DRY},
  sirdaryo:{nom:'Sirdaryo', sarlavha2:'Markaziy Osiyoning eng uzun daryosi',
    jadval:[['Hosil bo‘lishi','Norin va Qoradaryo qo‘shilishidan (Farg‘ona vodiysi)'],['Uzunligi','2 212 km (o‘zbek manbalari); inglizcha manbalarda ≈ 2 256 km'],['Havzasi','inglizcha manbalarda 800 ming km² dan ortiq'],['Quyilishi','Kichik Orolga (Qozog‘iston)']],
    matn:'Sirdaryo Farg‘ona vodiysidan chiqib, Mirzacho‘l chetidan o‘tadi va Qozog‘iston hududi orqali Kichik Orolga quyiladi. Qadimgi yunonlar uni Yaksart deb atagan.',
    manba:DRY},
  zarafshon:{nom:'Zarafshon daryosi', sarlavha2:'Samarqand va Buxoro vohalari daryosi',
    jadval:[['Uzunligi','877 km'],['Boshlanishi','Zarafshon muzligi (Turkiston va Zarafshon tizmalari tutashgan joy)'],['Havzasi','≈ 17,7 ming km²'],['Tugashi','Qorako‘ldan keyin cho‘lda; Amudaryoga yetib bormaydi']],
    matn:'Nomi forschadan «oltin sochuvchi»; qadimgi yunonlar uni Politimet deb atagan. Xaritadagi Zarafshon chizig‘i sxematik (asosiy shaharlar orqali chizilgan).',
    manba:DRY},
  orol:{nom:'Orol dengizi', sarlavha2:'Qurib borayotgan ko‘l-dengiz',
    jadval:[['1960','68 ming km², sath 53,4 m, hajm ≈ 1 100 km³ — dunyodagi 4-katta ko‘l'],['1987','Kichik va Katta Orolga bo‘lingan'],['2005','Ko‘korol to‘g‘oni (Qozog‘iston) — Kichik Orol qisman tiklandi'],['2014','Katta Orolning sharqiy havzasi to‘liq qurigan'],['2018','Kichik ≈ 3,1 ming km², Katta ≈ 5,2 ming km²']],
    matn:'Asosiy sabab — Amudaryo va Sirdaryo suvining sug‘orishga olinishi. Qurigan tubda Orolqum cho‘li paydo bo‘ldi; undan ko‘tarilgan tuzli chang atrofdagi aholi salomatligi va yerlarga zarar yetkazadi. Xaritada 1960-yillar qirg‘og‘i — Natural Earth «historic lakes», hozirgisi — Natural Earth ko‘llari (sxematik).',
    manba:ORL},
  toshkent:{nom:'Toshkent', sarlavha2:'Poytaxt · Chirchiq vohasi',
    jadval:[['Koordinatalari','41°18′ sh.k., 69°16′ sh.u.'],['Joyi','Chirchiq daryosi vohasi, G‘arbiy Tyan-Shan etagi'],['Qadimgi nomi','Shosh, Choch, Binkat']],
    matn:'Toshkent tog‘lardan tushadigan Chirchiq va Ohangaron daryolari suvi hisobiga voha shahar sifatida rivojlangan.',
    manba:UZD+'; '+UZW},
  samarqand:{nom:'Samarqand', sarlavha2:'Zarafshon vodiysi',
    jadval:[['Joyi','Zarafshon daryosining chap sohili yaqinida'],['YUNESKO','«Samarqand — madaniyatlar chorrahasi», 2001'],['Tabiati','Janubdan Zarafshon tizmasi etagi']],
    matn:'Samarqand vohasi Zarafshon suvi bilan sug‘oriladi; Darg‘om kanali qadimdan shaharni suv bilan ta’minlagan.',
    manba:'YUNESKO (whc.unesco.org/en/list/603); '+DRY},
  buxoro:{nom:'Buxoro', sarlavha2:'Zarafshon quyi oqimi vohasi',
    jadval:[['Joyi','Zarafshon quyi oqimi, Qizilqumning janubi-g‘arbiy chekkasi'],['YUNESKO','Buxoro tarixiy markazi, 1993'],['Suv','Zarafshon va Amu-Buxoro kanali']],
    matn:'Buxoro vohasi cho‘l ichidagi yirik voha. Zarafshon suvi yetmagani uchun Amudaryodan kanal orqali qo‘shimcha suv keltiriladi.',
    manba:'YUNESKO (whc.unesco.org/en/list/602); '+DRY},
  nukus:{nom:'Nukus', sarlavha2:'Qoraqalpog‘iston Respublikasi poytaxti',
    jadval:[['Joyi','Amudaryoning quyi oqimi, delta yaqini'],['Muzey','I. V. Savitskiy nomidagi san’at muzeyi (1966)'],['Muammo','Orol bo‘yi ekologik inqirozi hududida']],
    matn:'Nukus Amudaryo deltasi yaqinida joylashgan; Orol qurigach, bu yerda iqlim yanada quruq va kontinental bo‘lib qolgan, chang-tuz bo‘ronlari ko‘paygan (taxminiy baho).',
    manba:UZD+'; '+ORL},
  termiz:{nom:'Termiz', sarlavha2:'Eng janubiy shahar · Amudaryo bo‘yi',
    jadval:[['Joyi','Amudaryoning o‘ng sohili, Afg‘oniston chegarasi'],['Rekord','+50 °C — O‘zbekistondagi eng yuqori harorat'],['Chekka nuqta','Yaqinida eng janubiy nuqta (37°11′ sh.k.)']],
    matn:'Termiz — mamlakatning eng issiq shahri; yozi uzun va jazirama. Qadimda Amudaryodan o‘tish joyi va buddaviylik markazi bo‘lgan.',
    manba:UZI+'; '+UZC}
};
})();


/* detal kartalari: detallar.js MAKON_DETAL ni qayta yaratishi mumkin — shuning uchun hozir ham, DOM tayyor bo‘lganda ham qo‘shiladi */
const qoshDT = ()=>{ const M = window.MAKON_DETAL = window.MAKON_DETAL || {}; Object.keys(DT).forEach(k=>{ M[k] = Object.assign(M[k] || {}, DT[k]); }); };
qoshDT();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qoshDT);
window.MAKON_KBG_DETAL = DT;
})();
