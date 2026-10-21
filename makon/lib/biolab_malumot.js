/* MAKON — virtual biologiya laboratoriyasi (mikroskop) ma'lumoti (v3.19, guruh bl).
   O‘lchamlar — manbalar bilan solishtirilgan (ma'lumot kartalarida ko‘rsatilgan). Ko‘pchilik qiymat
   diapazon ko‘rinishida; ilovadagi chizma «sxematik, o‘lchamlar manbaga yaqin» deb yoziladi.
   Tuzilma: OKULYAR, OBYEKTIV, FN (ko‘rish maydoni soni), MIKROMETR, QISM (mikroskop qismlari),
   PREPARAT (preparatlar + qismlari), TOPSHIRIQ, XAVFSIZLIK, QOIDA. */
window.MAKON_BIOLAB_MALUMOT = {
  OKULYAR: 10,
  OBYEKTIV: [4, 10, 40],
  /* Okulyar ko‘rish maydoni soni (field number) — maktab okulyarlarida odatda 18 mm.
     Ko‘rish maydoni diametri = FN / obyektiv: ×4 → 4,5 mm; ×10 → 1,8 mm; ×40 → 0,45 mm. */
  FN: 18,
  /* Okulyar mikrometr: 10 mm shkala, 100 bo‘linma. Bo‘linma qiymati = 0,1 mm / obyektiv:
     ×4 → 25 mkm; ×10 → 10 mkm; ×40 → 2,5 mkm (obyekt-mikrometr bilan kalibrlangan deb olinadi). */
  MIKROMETR: {bolinma:100, uzunlik:10},
  /* Fokus: makro-vint 0–100 (qo‘pol), mikro-vint 0–100 (aniq, 1 bo‘linma = qo‘polning 1/10 qismi).
     Har obyektivning o‘z fokus nuqtasi va chuqurligi bor (parfokal — ×4 da fokuslansa ×10 da deyarli tiniq). */
  FOKUS: {4:{nuqta:60, chuqur:4}, 10:{nuqta:64, chuqur:1.6}, 40:{nuqta:65.5, chuqur:.5}},
  /* mikroskop qismlari — bosilganda karta (izoh sxemaga mos) */
  QISM: {
    okulyar:   {nom:'Okulyar', sarlavha2:'Ko‘zga yaqin linza — ×10', matn:'Obyektiv hosil qilgan oraliq tasvirni yana kattalashtiradi. Maktab mikroskoplarida odatda ×10 (ba’zan ×15). Okulyarga ko‘rish maydoni soni yoziladi (masalan 18 mm) — ko‘rinadigan doira diametri shu songa bog‘liq.', jadval:[['Kattalashtirish','×10'],['Ko‘rish maydoni soni (FN)','18 mm (odatiy)'],['Umumiy kattalashtirish','okulyar × obyektiv']], manba:'Botany 130 Microscope manual (botit.botany.wisc.edu); Pearson A&P microscopy study guide'},
    tubus:     {nom:'Tubus', sarlavha2:'Okulyar va obyektivni bog‘lovchi nay', matn:'Yorug‘lik obyektivdan okulyargacha tubus ichida boradi. Maktab mikroskopida tubus uzunligi standart (160 mm) — obyektivlar shunga hisoblangan.', jadval:[['Standart uzunlik','160 mm (an’anaviy)']], manba:'Microscope manual (botit.botany.wisc.edu)'},
    revolver:  {nom:'Revolver', sarlavha2:'Obyektivlarni almashtiruvchi aylanma qism', matn:'Revolverni burab kerakli obyektivni tubus o‘qiga keltirasiz — «shiq» etib o‘rniga tushadi. Obyektivni almashtirganda preparat stolchasiga qaramang: ×40 obyektiv shishaga juda yaqin keladi.', jadval:[['Obyektivlar','×4 · ×10 · ×40']], manba:'School microscope handouts (txcte.org)'},
    obyektiv:  {nom:'Obyektivlar', sarlavha2:'×4 (kichik), ×10 (o‘rta), ×40 (katta)', matn:'Preparatga eng yaqin linzalar tizimi. Obyektiv kattalashtirishi oshgani sari ko‘rish maydoni toraya­di va fokus chuqurligi kamayadi — shuning uchun ×40 da faqat mikro-vint ishlatiladi. Kuzatishni doim ×4 dan boshlang.', jadval:[['×4','ko‘rish maydoni ≈ 4,5 mm'],['×10','≈ 1,8 mm'],['×40','≈ 0,45 mm (FN 18 mm okulyar bilan)']], manba:'FOV = FN / obyektiv (everycalculators.com; Pearson study guide — taxminan 5 / 2 / 0,5 mm)'},
    stolcha:   {nom:'Predmet stolchasi', sarlavha2:'Preparat qo‘yiladigan tekislik', matn:'O‘rtasida yorug‘lik o‘tadigan teshik, ikki tomonida preparatni ushlab turuvchi qisqichlar. Preparat qisqich ostiga shunday qo‘yiladiki, obyekt teshik ustida tursin.', jadval:[['Qisqichlar','2 ta'],['Buyum oynasi','76 × 26 mm (standart)']], manba:'ISO 8037-1 (buyum oynasi 76×26 mm)'},
    diafragma: {nom:'Diafragma', sarlavha2:'Yorug‘lik dastasini toraytiradi', matn:'Stolcha ostidagi disk yoki iris diafragma: teshik kichraysa tasvir kontrasti ortadi, lekin xiraroq bo‘ladi. Shaffof preparatlar (piyoz po‘sti, elodeya) uchun diafragmani biroz yopish foydali.', jadval:[['Ta’siri','kontrast ↑, yorug‘lik ↓']], manba:'Microscope manual (botit.botany.wisc.edu)'},
    kozgu:     {nom:'Ko‘zgu / yoritgich', sarlavha2:'Yorug‘likni preparatga yo‘naltiradi', matn:'Eski mikroskoplarda ko‘zgu (botiq tomoni kuchsiz yorug‘likda), zamonaviylarida LED yoritgich. Ko‘zguni hech qachon to‘g‘ridan-to‘g‘ri quyoshga qaratmang — ko‘z kuyadi.', jadval:[['Xavfsizlik','quyosh nuri — taqiq']], manba:'School microscope handouts (txcte.org; tiu.edu.iq lab 2)'},
    makro:     {nom:'Makro-vint (qo‘pol fokus)', sarlavha2:'Tubusni tez ko‘taradi-tushiradi', matn:'Faqat ×4 va ×10 obyektivlar bilan ishlatiladi. Fokuslash qoidasi: yon tomondan qarab obyektivni preparatga yaqinlashtiring, so‘ng okulyarga qarab tubusni asta KO‘TARING — shunda obyektiv shishaga urilmaydi.', jadval:[['Ruxsat','×4, ×10'],['Taqiq','×40 da ishlatilmaydi']], manba:'Lab handouts: coarse adjustment only with scanning/low power (txcte.org; macmillanusa appendix F)'},
    mikro:     {nom:'Mikro-vint (aniq fokus)', sarlavha2:'Juda kichik siljish — ×40 uchun', matn:'Katta kattalashtirishda fokus chuqurligi yupqa: mikro-vintning bir bo‘linmasi tasvirni tiniq qiladi. Qalin preparatda mikro-vint bilan «qavatma-qavat» ko‘rib chiqiladi.', jadval:[['Ruxsat','hamma obyektivda; ×40 da — faqat shu']], manba:'Lab handouts (txcte.org)'},
    shtativ:   {nom:'Shtativ (tutqich)', sarlavha2:'Mikroskopni shu yerdan ushlaysiz', matn:'Mikroskop ikki qo‘lda ko‘tariladi: bir qo‘l shtativda, ikkinchisi asos ostida. Stol ustida sudrab emas, ko‘tarib ko‘chiriladi.', jadval:[['Ko‘tarish','2 qo‘l: shtativ + asos']], manba:'School microscope handouts (txcte.org; wsbctc)'},
    asos:      {nom:'Asos', sarlavha2:'Og‘ir tag — barqarorlik', matn:'Mikroskop stol chetidan kamida 10 sm ichkarida turadi. Ishdan so‘ng: ×4 obyektiv o‘rniga qo‘yiladi, stolcha pastga tushiriladi, g‘ilof yopiladi.', jadval:[['Ish oxiri','×4 · stolcha pastda · g‘ilof']], manba:'School microscope handouts (txcte.org)'}
  },
  /* preparatlar. olcham — mkm (manba bilan); qismlar — bosilganda karta.
     tayyorlash — to‘g‘ri tartib (ilovada aralashtirib beriladi). */
  PREPARAT: [
    {id:'piyoz', nom:'Piyoz po‘sti epidermisi', lotin:'Allium cepa', sinf:'5-sinf', rang:'#e9c46a', qisqa:'O‘simlik hujayrasi: devor, yadro, vakuola',
      tayyor:false, boyash:'yod',
      tayyorlash:[
        'Toza buyum oynasiga pipetka bilan 1–2 tomchi suv tomizing',
        'Piyoz qavatining ichki tomonidan pinset bilan yupqa shaffof parda (epidermis) ajrating',
        'Pardani suv tomchisiga tekis yoying (buralmasin)',
        'Ustiga 1 tomchi yod eritmasi tomizing — yadro va sitoplazma bo‘yaladi',
        'Qoplag‘ich oynachani qiya qo‘yib asta tushiring — havo pufakchasi qolmasin',
        'Ortiqcha suyuqlikni filtr qog‘ozi bilan chetdan tortib oling'
      ],
      olcham:[['Hujayra uzunligi','200–300 mkm'],['Hujayra kengligi','≈ 80 mkm'],['Yadro','≈ 15–20 mkm (sxematik)'],['Shakl','to‘rtburchak, g‘isht terilgandek']],
      tavsif:'Piyoz qavatining ichki yuzasidagi bir qavat hujayralar. Hujayra devori tiniq ko‘rinadi, yadro — yod bilan bo‘yalgach sariq-jigarrang; katta markaziy vakuola hujayraning asosiy hajmini egallaydi, sitoplazma devor bo‘ylab yupqa qatlam. Xloroplast yo‘q (po‘st yorug‘likda emas).',
      manba:'A-level measuring cells (o‘rtacha 212–262 mkm, kengligi ≈ 82 mkm); Biologiya 5-sinf darsligi, laboratoriya ishi «Piyoz po‘sti hujayrasini o‘rganish»',
      qismlar:{
        devor:{nom:'Hujayra devori', sarlavha2:'Sellyulozadan, qattiq', matn:'O‘simlik hujayrasiga shakl beradi va himoya qiladi. Mikroskopda ikki qo‘shni hujayra devori bitta qalin chiziq bo‘lib ko‘rinadi.', jadval:[['Tarkibi','sellyuloza'],['Ko‘rinishi','tiniq ikki qavat chiziq']], manba:'Biologiya 5-sinf'},
        yadro:{nom:'Yadro', sarlavha2:'Irsiy axborot saqlanadi', matn:'Yod bilan bo‘yalmasa deyarli ko‘rinmaydi (shaffof). Bo‘yalgach sariq-jigarrang dumaloq tana, ichida 1–2 yadrocha.', jadval:[['O‘lchami','≈ 15–20 mkm (sxematik)'],['Bo‘yash','yod → sariq-jigarrang']], manba:'Biologiya 5-sinf; Lugol eritmasi yadroni bo‘yaydi (laboratoriya yo‘riqnomalari)'},
        vakuola:{nom:'Vakuola', sarlavha2:'Hujayra shirasi bilan to‘lgan bo‘shliq', matn:'Yetuk o‘simlik hujayrasida bitta katta markaziy vakuola — hujayra hajmining 80–90 % gacha. Turgor (taranglik) shu yerda hosil bo‘ladi.', jadval:[['Tarkibi','suv, qand, tuzlar']], manba:'Biologiya 5-sinf'},
        sitoplazma:{nom:'Sitoplazma', sarlavha2:'Devor bo‘ylab yupqa qatlam', matn:'Tirik hujayrada organoidlar shu yerda. Piyoz epidermisida vakuola katta bo‘lgani uchun sitoplazma devorga siqilgan.', jadval:[], manba:'Biologiya 5-sinf'}
      }},
    {id:'qon', nom:'Odam qoni (surtma)', lotin:'Homo sapiens', sinf:'8-sinf', rang:'#e5484d', qisqa:'Eritrotsit, leykotsit, trombotsit',
      tayyor:true, boyash:'romanovskiy',
      tayyorlash:[
        'Buyum oynasi chetiga 1 tomchi qon tomiziladi (tayyor preparat — mikroskop to‘plamidan)',
        'Ikkinchi oyna qirrasi bilan tomchi yupqa qilib surtiladi',
        'Surtma havoda quritiladi va spirt bilan fiksatsiya qilinadi',
        'Romanovskiy–Gimza bo‘yog‘i bilan bo‘yaladi, yuviladi va quritiladi'
      ],
      olcham:[['Eritrotsit diametri','7–8 mkm (o‘rtacha ≈ 7,5–7,7)'],['Eritrotsit qalinligi','≈ 2 mkm'],['Leykotsit','7–20 mkm (limfotsit 7–10, neytrofil 10–12, monotsit ≈ 20)'],['Trombotsit','2–4 mkm'],['Nisbat','≈ 1 leykotsit : 600–700 eritrotsit (ilovada sxematik)']],
      tavsif:'Eritrotsitlar — yadrosiz, ikki tomoni botiq disk, o‘rtasi ochroq ko‘rinadi; gemoglobin tufayli qizg‘ish. Leykotsitlar kam, yadrosi binafsha bo‘yaladi (segmentli yoki dumaloq). Trombotsitlar — mayda bo‘lakchalar, to‘plam-to‘plam. Maktabda tayyor bo‘yalgan preparat ishlatiladi: qon bilan ishlash faqat o‘qituvchi nazoratida.',
      manba:'YSMU histology atlas (eritrotsit o‘rtacha 7,7 mkm, qalinligi 1,9 mkm); Aberdeen histology review; Biologiya 8-sinf',
      qismlar:{
        eritrotsit:{nom:'Eritrotsit', sarlavha2:'Qizil qon tanachasi', matn:'Yadrosiz, ikki tomoni botiq disk. Gemoglobin kislorodni tashiydi. Umri ≈ 120 kun. 1 mm³ qonda 4,5–5 million.', jadval:[['Diametri','7–8 mkm'],['Yadro','yo‘q (yetuk)'],['Soni','4,5–5 mln / mm³']], manba:'Biologiya 8-sinf; YSMU histology'},
        leykotsit:{nom:'Leykotsit', sarlavha2:'Oq qon tanachasi — himoya', matn:'Yadroli, eritrotsitdan katta. Turlari: neytrofil (segmentli yadro), limfotsit (katta dumaloq yadro), monotsit (eng katta). Fagotsitoz va immunitet.', jadval:[['O‘lchami','7–20 mkm'],['Soni','4–9 ming / mm³']], manba:'Biologiya 8-sinf; Aberdeen histology review'},
        trombotsit:{nom:'Trombotsit', sarlavha2:'Qon plastinkasi — ivish', matn:'Megakariotsit bo‘lakchalari, yadrosiz. Qon tomiri shikastlanganda yopishib tiqin hosil qiladi.', jadval:[['O‘lchami','2–4 mkm'],['Soni','180–320 ming / mm³']], manba:'Biologiya 8-sinf'}
      }},
    {id:'ogizcha', nom:'Barg og‘izchalari (ustitsa)', lotin:'Tradescantia / Vicia faba epidermisi', sinf:'6-sinf', rang:'#5fd38d', qisqa:'Yopuvchi hujayralar, og‘izcha yorig‘i',
      tayyor:false, boyash:null,
      tayyorlash:[
        'Buyum oynasiga 1 tomchi suv tomizing',
        'Barg pastki tomonidan pinset bilan yupqa po‘st (epidermis) ajrating',
        'Po‘stni suv tomchisiga tekis yoying',
        'Qoplag‘ich oynacha bilan qiya qilib yoping',
        'Ortiqcha suvni filtr qog‘ozi bilan oling'
      ],
      olcham:[['Yopuvchi hujayra uzunligi','10–45 mkm (Vicia faba ≈ 45 × 30)'],['Og‘izcha yorig‘i','ochiqda 10–40 mkm'],['Epidermis hujayrasi','50–150 mkm, to‘lqinsimon devorli']],
      tavsif:'Barg epidermisi — shaffof, to‘lqinsimon devorli hujayralar (xloroplastsiz). Orasida loviyasimon ikki yopuvchi hujayra — ularda xloroplast bor — va o‘rtasida og‘izcha yorig‘i. Yorug‘lik va suv ko‘p bo‘lsa yopuvchi hujayralar turgor bilan bukilib yoriq ochiladi; suv tanqisligida yopiladi. Gaz almashinuvi va transpiratsiya shu orqali.',
      manba:'CSB/SJU Plant Physiology stoma lab (Vicia faba yopuvchi hujayra ≈ 45 × 30 mkm); biologynotesonline (10–80 mkm, ochiq 10–40 mkm); Biologiya 6-sinf',
      qismlar:{
        yopuvchi:{nom:'Yopuvchi hujayra', sarlavha2:'Loviyasimon, xloroplastli', matn:'Ikki yopuvchi hujayra og‘izchani hosil qiladi. Ichki (yoriqqa qaragan) devori qalinroq — suv olganda hujayra bukiladi va yoriq ochiladi.', jadval:[['Uzunligi','10–45 mkm'],['Xloroplast','bor (epidermisda yagona)']], manba:'Biologiya 6-sinf; CSB/SJU stoma lab'},
        yoriq:{nom:'Og‘izcha yorig‘i', sarlavha2:'Gaz almashinuv teshigi', matn:'Bu yerdan CO₂ kiradi, O₂ va suv bug‘i chiqadi. Kunduzi ochiq, kechasi va qurg‘oqchilikda yopiq.', jadval:[['Kengligi','ochiqda 10–40 mkm']], manba:'Biologiya 6-sinf'},
        epidermis:{nom:'Epidermis hujayrasi', sarlavha2:'Shaffof qoplovchi hujayra', matn:'Xloroplastsiz — yorug‘lik ichki to‘qimaga o‘tsin. Devorlari to‘lqinsimon, bir-biriga mahkam birikkan.', jadval:[['O‘lchami','50–150 mkm (sxematik)']], manba:'Biologiya 6-sinf'}
      }},
    {id:'elodeya', nom:'Elodeya bargi', lotin:'Elodea canadensis', sinf:'6-sinf', rang:'#3fbf6f', qisqa:'Xloroplastlar va sitoplazma oqimi',
      tayyor:false, boyash:null,
      tayyorlash:[
        'Buyum oynasiga 1 tomchi suv (akvarium suvi) tomizing',
        'Elodeya novdasi uchidan yosh bargni pinset bilan uzing',
        'Bargni suv tomchisiga qo‘ying — u ikki qavat hujayradan iborat, kesish shart emas',
        'Qoplag‘ich oynacha bilan qiya qilib yoping',
        'Yorug‘likda 5–10 daqiqa turgach oqim tezlashadi'
      ],
      olcham:[['Hujayra','50–130 × 20–30 mkm'],['Xloroplast','≈ 5 mkm'],['Oqim tezligi','≈ 10–30 mkm/s (ilovada sxematik)']],
      tavsif:'Yupqa barg — hujayralar to‘g‘ridan-to‘g‘ri ko‘rinadi. Har hujayrada o‘nlab yashil xloroplast; ×40 da ular sitoplazma bilan birga devor bo‘ylab aylanib oqayotganini (sikloz) ko‘rish mumkin. Oqim yorug‘lik va haroratda tezlashadi.',
      manba:'Exploratorium Elodea explorations (hujayra ≈ 50 × 25 mkm; xloroplast ≈ 5 mkm); Carolina Labsheets; Biologiya 6-sinf',
      qismlar:{
        xloroplast:{nom:'Xloroplast', sarlavha2:'Fotosintez organoidi', matn:'Xlorofill tufayli yashil. Elodeyada linzasimon, ≈ 5 mkm. Sitoplazma oqimi bilan hujayra bo‘ylab harakatlanadi.', jadval:[['O‘lchami','≈ 5 mkm'],['Soni','hujayrada o‘nlab']], manba:'Exploratorium; Biologiya 6-sinf'},
        oqim:{nom:'Sitoplazma oqimi (sikloz)', sarlavha2:'Xloroplastlar devor bo‘ylab aylanadi', matn:'Sitoskelet (aktin iplari) bo‘ylab miozin «motorlari» organoidlarni tortadi. Yorug‘lik va iliqlikda tezlashadi, sovuqda to‘xtaydi.', jadval:[['Mexanizm','aktin–miozin'],['Ko‘rinadi','×40 da, 1–2 daqiqa kuzatib']], manba:'Leiden University review (cytoplasmic streaming); Exploratorium'},
        devor:{nom:'Hujayra devori', sarlavha2:'To‘rtburchak katakchalar', matn:'Elodeya hujayralari uzunchoq to‘rtburchak, devorlari tiniq chiziq bo‘lib ko‘rinadi.', jadval:[['Hujayra','50–130 × 20–30 mkm']], manba:'Exploratorium'}
      }},
    {id:'tufelka', nom:'Infuzoriya-tufelka', lotin:'Paramecium caudatum', sinf:'7-sinf', rang:'#9bd1ff', qisqa:'Bir hujayrali hayvon: kiprikchalar, vakuolalar',
      tayyor:false, boyash:null,
      tayyorlash:[
        'Pichan damlamasidan (5–7 kunlik) pipetka bilan 1 tomchi oling',
        'Tomchini buyum oynasiga qo‘ying',
        'Tufelkalar sekinlashsin uchun ozgina paxta tolasi qo‘shing',
        'Qoplag‘ich oynacha bilan yoping (bosmang — hujayra eziladi)'
      ],
      olcham:[['Uzunligi','170–330 mkm (odatda 200–300)'],['Kiprikcha','≈ 10–12 mkm (ko‘plab)'],['Qisqaruvchi vakuola','2 ta, yulduzsimon kanalli']],
      tavsif:'Tufelka (oyoq kiyimi) shaklidagi bir hujayrali organizm. Butun tanasi kiprikchalar bilan qoplangan — ular bilan suzadi va oziqni og‘iz chuqurchasiga haydaydi. Ichida katta va kichik yadro, hazm vakuolalari va 2 ta qisqaruvchi vakuola (ortiqcha suvni chiqaradi). ×4 da harakatlanayotgan nuqtalar, ×10 da shakli, ×40 da ichki tuzilishi ko‘rinadi.',
      manba:'Wikipedia: Paramecium caudatum (170–330 mkm); freshwaterbiodiversity.org.bd; Biologiya 7-sinf',
      qismlar:{
        kiprik:{nom:'Kiprikchalar', sarlavha2:'Harakat va oziqlanish', matn:'Tana yuzasida minglab mayda kiprikcha to‘lqinsimon uradi: tufelka spiral bo‘ylab suzadi va oziqni og‘izga yo‘naltiradi.', jadval:[['Uzunligi','≈ 10–12 mkm']], manba:'Biologiya 7-sinf'},
        qvakuola:{nom:'Qisqaruvchi vakuola', sarlavha2:'Ortiqcha suvni chiqaradi', matn:'Ikki uchda bittadan; yulduzsimon kanallar suvni yig‘adi, vakuola qisqarib tashqariga chiqaradi (osmotik boshqaruv).', jadval:[['Soni','2'],['Qisqarish','har 10–20 s (sxematik)']], manba:'Biologiya 7-sinf'},
        yadro:{nom:'Katta va kichik yadro', sarlavha2:'Makronukleus va mikronukleus', matn:'Katta yadro — kundalik hayot faoliyatini boshqaradi, kichik yadro — ko‘payish (konyugatsiya) uchun.', jadval:[['Katta yadro','loviyasimon, markazda']], manba:'Biologiya 7-sinf'},
        ogiz:{nom:'Og‘iz chuqurchasi', sarlavha2:'Oziq shu yerdan kiradi', matn:'Tananing yon tomonidagi chuqurcha; oxirida hazm vakuolasi hosil bo‘ladi.', jadval:[], manba:'Biologiya 7-sinf'}
      }},
    {id:'bakteriya', nom:'Bakteriyalar (shartli)', lotin:'Escherichia coli, Bacillus', sinf:'7-sinf', rang:'#c7a0ff', qisqa:'Tayoqchasimon va sharsimon; ichki tuzilish ko‘rinmaydi',
      tayyor:true, boyash:'metilen',
      tayyorlash:[
        'Tayyor fiksatsiyalangan preparat (mikroskop to‘plamidan) olinadi',
        'Metilen ko‘ki bilan bo‘yalgan — hujayralar ko‘k ko‘rinadi',
        'Qoplag‘ich oynacha ostida ko‘riladi'
      ],
      olcham:[['E. coli','≈ 2 × 0,5 mkm (1–4 × 0,25–1)'],['Kokk (sharsimon)','≈ 1 mkm'],['Batsilla','3–8 × 1 mkm']],
      tavsif:'Yorug‘lik mikroskopida ×400 kattalashtirishda bakteriya faqat mayda tayoqcha yoki nuqta ko‘rinishida — ichki tuzilishi (nukleoid, ribosoma) ko‘rinmaydi: ularni ko‘rish uchun ×1000 (immersion) yoki elektron mikroskop kerak. Shu sababli preparat «shartli»: shakl va o‘lchamni ko‘rsatadi. Tirik bakteriyalar bilan maktabda ishlanmaydi.',
      manba:'BioNumbers 117344 (E. coli 1,78 ± 0,54 × 0,49 mkm, SEM); scaleofuniverse (≈ 2 × 0,5 mkm); Biologiya 7-sinf',
      qismlar:{
        tayoqcha:{nom:'Tayoqchasimon bakteriya (batsilla)', sarlavha2:'Prokariot hujayra', matn:'Yadro yo‘q — DNK sitoplazmada (nukleoid). Devor, membrana, ribosoma. Yorug‘lik mikroskopida ichi ko‘rinmaydi.', jadval:[['O‘lchami','≈ 2 × 0,5 mkm (E. coli)']], manba:'BioNumbers; Biologiya 7-sinf'},
        kokk:{nom:'Sharsimon bakteriya (kokk)', sarlavha2:'Zanjir yoki uzum shodasi bo‘lib', matn:'Streptokokk — zanjir, stafilokokk — shoda. O‘lchami ≈ 1 mkm.', jadval:[['O‘lchami','≈ 1 mkm']], manba:'Biologiya 7-sinf'}
      }}
  ],
  /* topshiriqlar: tur — bajarilish mexanizmi (ilovada tekshiriladi) */
  TOPSHIRIQ: [
    {id:'b1',  nom:'Mikroskop qismlari', sinf:'5-sinf', matn:'«Mikroskop» sxemasida <b>5 ta</b> qismni bosib kartasini o‘qing: okulyar, obyektiv, predmet stolchasi, makro-vint, ko‘zgu.'},
    {id:'b2',  nom:'Preparat tayyorlash', sinf:'5-sinf', matn:'Javondan <b>piyoz po‘sti</b>ni tanlab, tayyorlash qadamlarini <b>to‘g‘ri tartibda</b> bosing.'},
    {id:'b3',  nom:'Kichik kattalashtirish', sinf:'5-sinf', matn:'Piyoz po‘stini <b>×4</b> obyektivda makro-vint bilan tiniq fokuslang (tiniqlik ≥ 90 %).'},
    {id:'b4',  nom:'Yadroni toping', sinf:'5-sinf', matn:'Piyoz preparatini <b>yod</b> bilan bo‘yab, <b>×10</b> da hujayra <b>yadrosini</b> bosing.'},
    {id:'b5',  nom:'Kattalashtirish hisobi', sinf:'5-sinf', matn:'Okulyar ×10, obyektiv ×40 bo‘lsa umumiy kattalashtirish qancha? Javobni «Hisob» qatoriga yozing.'},
    {id:'b6',  nom:'Hujayrani o‘lchash', sinf:'6-sinf', matn:'<b>Okulyar mikrometr</b>ni yoqib, piyoz hujayrasi <b>uzunligini</b> ×10 da o‘lchang (bo‘linmalar sonini kiriting).'},
    {id:'b7',  nom:'Eritrotsit o‘lchami', sinf:'8-sinf', matn:'Qon surtmasida <b>×40</b> da eritrotsit diametrini mikrometr bilan o‘lchang (≈ 7,5 mkm).'},
    {id:'b8',  nom:'Qonning shaklli elementlari', sinf:'8-sinf', matn:'Qon surtmasida <b>eritrotsit</b>, <b>leykotsit</b> va <b>trombotsit</b>ni topib bosing (×40).'},
    {id:'b9',  nom:'Og‘izcha tuzilishi', sinf:'6-sinf', matn:'Barg epidermisida <b>yopuvchi hujayra</b> va <b>og‘izcha yorig‘i</b>ni toping (×40).'},
    {id:'b10', nom:'Sitoplazma oqimi', sinf:'6-sinf', matn:'Elodeya bargini ×40 da tiniq fokuslab <b>10 soniya</b> kuzating, so‘ng harakatlanayotgan <b>xloroplast</b>ni bosing.'},
    {id:'b11', nom:'Tufelka', sinf:'7-sinf', matn:'Tufelkani ×10 da toping, ×40 da <b>qisqaruvchi vakuola</b> yoki <b>yadro</b>sini bosing.'},
    {id:'b12', nom:'Bakteriya chegarasi', sinf:'7-sinf', matn:'Bakteriya preparatini ×40 da fokuslang va «Hisob» qatoriga ×40 obyektivdagi <b>ko‘rish maydoni</b> diametrini mm da yozing (FN 18 mm).'},
    {id:'b13', nom:'Xavfsiz fokuslash', sinf:'5-sinf', matn:'Istalgan preparatda <b>×40</b> ga o‘tgach makro-vintga tegmasdan, faqat <b>mikro-vint</b> bilan tiniq fokuslang.'},
    {id:'b14', nom:'Uchta preparat', sinf:'7-sinf', matn:'Kamida <b>3 xil</b> preparatni tiniq ko‘rib, har birida 1 ta qismni bosing — «Daftar»da kashfiyotlar yig‘iladi.'}
  ],
  /* «Hisob» qatori javoblari (b5, b12) */
  HISOB: {b5:{javob:400, chegara:0, izoh:'10 × 40 = 400 marta'}, b12:{javob:.45, chegara:.03, izoh:'18 mm / 40 = 0,45 mm'}},
  XAVFSIZLIK: [
    'Mikroskopni ikki qo‘lda ko‘taring: biri shtativda, ikkinchisi asos ostida.',
    'Kuzatishni har doim ×4 dan boshlang; ×40 da faqat mikro-vint.',
    'Makro-vint bilan tubusni tushirganda yon tomondan qarang — obyektiv shishaga urilmasin.',
    'Buyum va qoplag‘ich oynachalar yupqa — sinsa qo‘lni kesadi: chetidan ushlang, singanini qo‘l bilan yig‘mang.',
    'Yod eritmasi terini va kiyimni bo‘yaydi, ko‘zga tushsa achishtiradi: tomchi bilan ishlang, ko‘zga tegsa ko‘p suv bilan yuving.',
    'Ko‘zguni quyoshga qaratmang. Qon va tirik bakteriyalar — faqat tayyor preparatda, o‘qituvchi nazoratida.',
    'Ish oxirida: ×4 obyektiv o‘rnida, stolcha pastda, preparat olingan, mikroskop g‘ilofda.'
  ],
  QOIDA_MANBA:'School microscope handouts (txcte.org «Using a Microscope»; tiu.edu.iq Lab 2; wsbctc); Biologiya 5-sinf darsligi'
};
