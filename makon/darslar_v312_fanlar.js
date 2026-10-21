/* MAKON v3.12 — yangi fanlar (Matematika, Informatika) va yangi darslarni fanlarga bog'lash.
   Barcha darslar fayllaridan KEYIN, detallar.js dan OLDIN yuklanadi. Dars mazmuni yo'q bo'lsa, mavzu "Keyingi bosqich" bo'lib qoladi. */
(function(){
const FAN = window.MAKON_FAN, D = window.MAKON_DARS;
if(!FAN || !D) return;
const F = id=>FAN.find(f=>f.id === id);
const bogla = (fanId, nom, dars, qisqa)=>{
  const f = F(fanId); if(!f) return;
  f.mavzular = f.mavzular || [];
  const m = f.mavzular.find(x=>x.nom === nom || x.dars === dars);
  const bor = !!D[dars];
  if(m){ if(bor) m.dars = dars; m.nom = nom; if(qisqa) m.qisqa = qisqa; }
  else f.mavzular.unshift(bor ? {nom, dars, qisqa} : {nom, qisqa:'Keyingi bosqich'});
};
const yangiFan = f=>{
  if(F(f.id)) return;
  let joy = FAN.findIndex(x=>x.yopiq);
  if(joy < 0) joy = FAN.length;
  FAN.splice(joy, 0, f);
};
yangiFan({id:'matematika', nom:'Matematika', rang:'#6d8bff', ik:'funksiya', izoh:'Funksiyalar grafigi, algebra, tenglamalar',
  tavsif:'Grafikni o‘zingiz boshqaring: koeffitsiyentlarni surib, parabola qanday o‘zgarishini, ildizlar, uchi va diskriminant qanday bog‘langanini ko‘ring.',
  mavzular:[
    {nom:'Chiziqli funksiya va uning grafigi', qisqa:'Keyingi bosqich'},
    {nom:'Tengsizliklarni grafik usulda yechish', qisqa:'Keyingi bosqich'}
  ]});
yangiFan({id:'informatika', nom:'Informatika', rang:'#36d6a0', ik:'chip', izoh:'Sanoq sistemalari, mantiq, algoritmlar',
  tavsif:'Bitlarni o‘zingiz yoqib-o‘chiring va mantiqiy elementlarni sinab ko‘ring: kompyuter ichida sonlar va qarorlar qanday ifodalanishini ko‘rasiz.',
  mavzular:[
    {nom:'Algoritm va blok-sxemalar', qisqa:'Keyingi bosqich'},
    {nom:'Axborot o‘lchov birliklari', qisqa:'Keyingi bosqich'}
  ]});
bogla('matematika', 'Kvadrat funksiya va parabola', 'algebra-kvadrat', 'y = ax² + bx + c: uchi, ildizlar, diskriminant — jonli grafikda');
bogla('informatika', 'Ikkilik sanoq sistemasi va mantiqiy elementlar', 'info-ikkilik', 'Bit, bayt, o‘nlik ↔ ikkilik, VA / YOKI / EMAS / XOR');
bogla('matematika', 'Chiziqli funksiya va uning grafigi', 'algebra-chiziqli', 'y = kx + b: burchak koeffitsiyenti, o‘qlar bilan kesishish, parallel to‘g‘ri chiziqlar');
bogla('kimyo', 'Davriy jadval: elementlar oilasi', 'kimyo-davriy-jadval', '118 element 3D jadvalda: turkumlar, massa, elektromanfiylik');
})();
