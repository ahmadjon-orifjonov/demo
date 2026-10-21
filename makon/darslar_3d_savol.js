/* MAKON v3.14 — 3D sahnada bosib javob beriladigan test savollari (tur:'3d').
   Maydonlar: s (savol), hodisa (sahna hodisasi turi), kalit (hodisadagi maydon, standart 'nom'),
   togri (qabul qilinadigan qiymatlar), v/t (natija sahifasi uchun: v[0] — to‘g‘ri javob nomi), izoh, qatlamlar (anatomiya).
   Faktlar: NASA Planetary Fact Sheet (Yupiter — eng katta, Neptun — eng uzoq sayyora); IUPAC davriy jadvali
   (17-guruh — galogenlar, 18-guruh — inert gazlar); USGS "Earth's interior" (tashqi yadro — suyuq). */
(function(){
  const D = window.MAKON_DARS;
  const qosh = (id, savollar)=>{ if(D[id]) savollar.forEach(s=>D[id].test.push(Object.assign({tur:'3d', t:0}, s))); };
  qosh('astro-quyosh', [
    {s:'Sahnada Quyosh tizimidagi <b>eng katta sayyorani</b> bosing.', hodisa:'sayyora', togri:['yupiter'], v:['Yupiter', 'boshqa sayyora'],
     izoh:'<b>Yupiter</b> — eng katta sayyora: diametri Yernikidan ≈ 11 marta, massasi qolgan barcha sayyoralarnikidan ≈ 2,5 marta katta.'},
    {s:'Quyoshdan <b>eng uzoqdagi</b> sayyorani bosing.', hodisa:'sayyora', togri:['neptun'], v:['Neptun', 'boshqa sayyora'],
     izoh:'<b>Neptun</b> — Quyoshdan ≈ 30 a.b. uzoqlikda, sakkizinchi sayyora. Pluton 2006 yildan beri mitti sayyora hisoblanadi.'}
  ]);
  qosh('bio-azolar', [
    {s:'Modelda <b>jigarni</b> bosing.', hodisa:'azo', togri:['jigar'], v:['Jigar', 'boshqa a’zo'], qatlamlar:{teri:false, mushak:false, azo:true},
     izoh:'<b>Jigar</b> qorin bo‘shlig‘ining o‘ng yuqori qismida, diafragma ostida joylashgan — eng katta ichki bez.'}
  ]);
  qosh('kimyo-davriy-jadval', [
    {s:'Jadvalda istalgan <b>galogenni</b> bosing.', hodisa:'element', kalit:'g', togri:['17'], v:['17-guruh elementi (F, Cl, Br, I, At, Ts)', 'boshqa guruh elementi'],
     izoh:'Galogenlar — <b>17-guruh</b>: ftor, xlor, brom, yod, astat, tennessin.'},
    {s:'Jadvalda istalgan <b>inert (nodir) gazni</b> bosing.', hodisa:'element', kalit:'g', togri:['18'], v:['18-guruh elementi (He, Ne, Ar, Kr, Xe, Rn, Og)', 'boshqa guruh elementi'],
     izoh:'Nodir gazlar — <b>18-guruh</b>: tashqi elektron qobig‘i to‘lgan, deyarli reaksiyaga kirishmaydi.'}
  ]);
  qosh('geo-yer-tuzilishi', [
    {s:'Yerning <b>suyuq holatdagi</b> qatlamini bosing.', hodisa:'yer-qatlam', togri:['tashqi_yadro'], v:['Tashqi yadro', 'boshqa qatlam'],
     izoh:'<b>Tashqi yadro</b> — suyuq temir-nikel qotishmasi; undagi oqimlar Yerning magnit maydonini hosil qiladi. Ichki yadro esa katta bosim tufayli qattiq.'}
  ]);
})();
