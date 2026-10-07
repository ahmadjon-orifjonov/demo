/* ALFIRDAVS TM — ma'lumot: mahsulotlar, davlat/hududlar, aloqa sozlamalari.
   Standart (namuna) ma'lumot shu faylda. Panel o'zgartirsa — localStorage da saqlanadi.
   Server ulanganda faqat loadProducts/saveProducts va loadSettings/saveSettings ichini almashtirish kifoya. */
(function () {
  'use strict';
  var KEY_DB = 'alf_db_v2', KEY_SET = 'alf_set_v2';

  var COUNTRIES = [
    { id: 'ru', code: 'RU', name: { uzc: 'Россия', ru: 'Россия', en: 'Russia' }, regions: [
      { id: 'belgorod', name: { uzc: 'Белгород', ru: 'Белгород', en: 'Belgorod' } },
      { id: 'kursk', name: { uzc: 'Курск', ru: 'Курск', en: 'Kursk' } },
      { id: 'penza', name: { uzc: 'Пенза', ru: 'Пенза', en: 'Penza' } }] },
    { id: 'by', code: 'BY', name: { uzc: 'Беларус', ru: 'Беларусь', en: 'Belarus' }, regions: [
      { id: 'minsk', name: { uzc: 'Минск', ru: 'Минск', en: 'Minsk' } },
      { id: 'brest', name: { uzc: 'Брест', ru: 'Брест', en: 'Brest' } },
      { id: 'grodno', name: { uzc: 'Гродно', ru: 'Гродно', en: 'Grodno' } }] },
    { id: 'pl', code: 'PL', name: { uzc: 'Польша', ru: 'Польша', en: 'Poland' }, regions: [
      { id: 'wlkp', name: { uzc: 'Великопольша', ru: 'Великопольша', en: 'Wielkopolska' } },
      { id: 'mazow', name: { uzc: 'Мазовия', ru: 'Мазовия', en: 'Mazowsze' } }] },
    { id: 'in', code: 'IN', name: { uzc: 'Ҳиндистон', ru: 'Индия', en: 'India' }, regions: [
      { id: 'up', name: { uzc: 'Уттар-Прадеш', ru: 'Уттар-Прадеш', en: 'Uttar Pradesh' } },
      { id: 'mh', name: { uzc: 'Маҳараштра', ru: 'Махараштра', en: 'Maharashtra' } }] },
    { id: 'ir', code: 'IR', name: { uzc: 'Эрон', ru: 'Иран', en: 'Iran' }, regions: [
      { id: 'maz', name: { uzc: 'Мозандарон', ru: 'Мазендеран', en: 'Mazandaran' } },
      { id: 'gil', name: { uzc: 'Гилон', ru: 'Гилян', en: 'Gilan' } }] },
    { id: 'tr', code: 'TR', name: { uzc: 'Туркия', ru: 'Турция', en: 'Türkiye' }, regions: [
      { id: 'bolu', name: { uzc: 'Болу', ru: 'Болу', en: 'Bolu' } },
      { id: 'sakarya', name: { uzc: 'Сакарья', ru: 'Сакарья', en: 'Sakarya' } },
      { id: 'manisa', name: { uzc: 'Маниса', ru: 'Маниса', en: 'Manisa' } },
      { id: 'corum', name: { uzc: 'Чорум', ru: 'Чорум', en: 'Çorum' } },
      { id: 'balikesir', name: { uzc: 'Балиқесир', ru: 'Балыкесир', en: 'Balıkesir' } }] },
    { id: 'cn', code: 'CN', name: { uzc: 'Хитой', ru: 'Китай', en: 'China' }, regions: [
      { id: 'shandong', name: { uzc: 'Шандун', ru: 'Шаньдун', en: 'Shandong' } },
      { id: 'liaoning', name: { uzc: 'Ляонин', ru: 'Ляонин', en: 'Liaoning' } }] }
  ];

  /* mahsulot turlari: img — standart surat (bo'lmasa saytda naqshli «quti yorlig'i» chiqadi) */
  var TYPES = [
    { id: 'mmo', img: '', name: { uzc: 'Товуқ ММО', ru: 'Куриный МДМ', en: 'Chicken MDM' }, sub: { uzc: 'Механик ажратилган гўшт', ru: 'Мясо механической обвалки', en: 'Mechanically deboned meat' } },
    { id: 'skin', img: '', name: { uzc: 'Товуқ териси', ru: 'Куриная кожа', en: 'Chicken skin' }, sub: { uzc: 'Музлатилган блок', ru: 'Замороженный блок', en: 'Frozen block' } },
    { id: 'leg', img: '', name: { uzc: 'Товуқ сони', ru: 'Окорочок', en: 'Chicken leg quarters' }, sub: { uzc: 'Бутун сон', ru: 'Окорочок целый', en: 'Whole leg quarter' } },
    { id: 'wing', img: '', name: { uzc: 'Товуқ қаноти', ru: 'Куриное крыло', en: 'Chicken wings' }, sub: { uzc: 'Уч бўғинли', ru: 'Трёхфаланговое', en: '3-joint wings' } },
    { id: 'fillet', img: '', name: { uzc: 'Товуқ филеси', ru: 'Куриное филе', en: 'Chicken breast fillet' }, sub: { uzc: 'Кўкрак филеси', ru: 'Филе грудки', en: 'Breast fillet' } },
    { id: 'offal', img: '', name: { uzc: 'Юрак ва жигар', ru: 'Сердце и печень', en: 'Hearts & livers' }, sub: { uzc: 'Товуқ субпродукти', ru: 'Куриные субпродукты', en: 'Chicken offal' } },
    { id: 'paws', img: '', name: { uzc: 'Товуқ панжаси', ru: 'Куриные лапки', en: 'Chicken paws' }, sub: { uzc: 'Тозаланган', ru: 'Очищенные', en: 'Cleaned' } },
    { id: 'beef', img: '', name: { uzc: 'Мол гўшти', ru: 'Говядина', en: 'Beef' }, sub: { uzc: 'Музлатилган', ru: 'Замороженная', en: 'Frozen' } }
  ];

  function P(id, type, country, region, status, kg, name) {
    return { id: id, type: type, country: country, region: region, status: status, kg: kg, name: name || null, img: '' };
  }
  var BUFFALO = { uzc: 'Буйвол гўшти', ru: 'Мясо буйвола', en: 'Buffalo meat (carabeef)' };
  var PRODUCTS = [
    P('p01', 'mmo', 'pl', 'wlkp', 'in', 20),
    P('p02', 'mmo', 'ru', 'belgorod', 'in', 20),
    P('p03', 'mmo', 'tr', 'bolu', 'way', 20),
    P('p04', 'skin', 'pl', 'mazow', 'in', 10),
    P('p05', 'leg', 'tr', 'manisa', 'in', 15),
    P('p06', 'beef', 'in', 'up', 'in', 20, BUFFALO),
    P('p07', 'skin', 'ru', 'penza', 'way', 10),
    P('p08', 'wing', 'tr', 'corum', 'way', 10),
    P('p09', 'fillet', 'cn', 'shandong', 'in', 12),
    P('p10', 'mmo', 'by', 'minsk', 'in', 20),
    P('p11', 'offal', 'by', 'brest', 'in', 10),
    P('p12', 'fillet', 'ir', 'maz', 'way', 12),
    P('p13', 'skin', 'tr', 'balikesir', 'in', 10),
    P('p14', 'paws', 'cn', 'liaoning', 'way', 10),
    P('p15', 'beef', 'in', 'mh', 'way', 20, BUFFALO),
    P('p16', 'leg', 'ir', 'gil', 'out', 15),
    P('p17', 'skin', 'tr', 'sakarya', 'out', 10),
    P('p18', 'mmo', 'ru', 'kursk', 'out', 20),
    P('p19', 'beef', 'by', 'grodno', 'in', 20)
  ];

  /* aloqa: direktor tasdiqlagan (7-okt kech). Bo'sh maydon saytda ko'rinmaydi. */
  var SETTINGS = {
    phone: '+998 99 905 11 44',          // asosiy: Telegram, WhatsApp, MAX shu raqamda
    phone2: '+998 99 784 11 44',
    tg: '+998999051144',                 // username yoki raqam (t.me/+998...)
    wa: '998999051144',
    max: '+998999051144',                // raqam yoki https:// havola
    instagram: '',                       // username yoki https://instagram.com/...
    addr: { uzc: 'Тошкент, Водник кўчаси 48/60', ru: 'Ташкент, ул. Водник, 48/60', en: '48/60 Vodnik St, Tashkent' },
    mapUrl: 'https://yandex.uz/maps/?text=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C%20%D0%92%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA%2048%2F60',
    addr2: { uzc: 'Самарқанд вилояти, Пастдарғом тумани, Эски Жума МФЙ, 128', ru: 'Самаркандская обл., Пастдаргомский р-н, МСГ Эски Жума, 128', en: '128 Eski Juma, Pastdargom District, Samarkand Region' },
    mapUrl2: 'https://yandex.uz/maps/?text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4%2C%20%D0%9F%D0%B0%D1%81%D1%82%D0%B4%D0%B0%D1%80%D0%B3%D0%BE%D0%BC%2C%20%D0%AD%D1%81%D0%BA%D0%B8%20%D0%96%D1%83%D0%BC%D0%B0%20128',
    hours: { uzc: 'Ду–Шн, 9:00–18:00', ru: 'Пн–Сб, 9:00–18:00', en: 'Mon–Sat, 9:00–18:00' }
  };

  /* ---- normallash (panel va sayt bir xil qoidadan foydalanadi) ---- */
  function digits(v) { return String(v == null ? '' : v).replace(/\D/g, ''); }
  // telefon: '' -> {ok:true, empty:true}; 9 xona -> 998 qo'shiladi; 10–15 xona; harf bo'lsa xato
  function normPhone(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return { ok: true, empty: true, d: '' };
    if (/[^\d\s+()\-.]/.test(s)) return { ok: false };
    var d = digits(s);
    if (d.length === 9) d = '998' + d;
    if (d.length < 10 || d.length > 15) return { ok: false };
    return { ok: true, d: d, text: fmtPhone(d) };
  }
  function fmtPhone(d) {
    if (d.length === 12 && d.indexOf('998') === 0) return '+998 ' + d.slice(3, 5) + ' ' + d.slice(5, 8) + ' ' + d.slice(8, 10) + ' ' + d.slice(10);
    return '+' + d;
  }
  // Telegram: @user, user, t.me/user, telegram.me/user, https://..., raqam -> {kind:'user'|'phone', id, href, text}
  function normTg(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    s = s.replace(/^https?:\/\//i, '').replace(/^(www\.)?(t|telegram)\.me\//i, '').replace(/^@/, '').replace(/[/?#].*$/, '');
    if (/^\+?[\d\s()\-]{9,20}$/.test(s)) { var p = normPhone(s); if (!p.ok || p.empty) return null; return { kind: 'phone', id: p.d, href: 'https://t.me/+' + p.d, text: p.text }; }
    if (!/^[A-Za-z][A-Za-z0-9_]{3,31}$/.test(s)) return null;
    return { kind: 'user', id: s, href: 'https://t.me/' + s, text: '@' + s };
  }
  // faqat http(s) havola (javascript: va boshqalar rad etiladi)
  function safeUrl(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) { if (/^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(s)) s = 'https://' + s; else return null; }
    try { var u = new URL(s); if (u.protocol !== 'http:' && u.protocol !== 'https:') return null; return u.href; } catch (e) { return null; }
  }
  // MAX: raqam (ko'rsatiladi, bosilsa nusxalanadi) yoki https havola
  function normMax(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    if (/^\+?[\d\s()\-]{9,20}$/.test(s)) { var p = normPhone(s); return p.ok && !p.empty ? { kind: 'phone', id: p.d, text: p.text } : null; }
    var u = safeUrl(s); return u ? { kind: 'url', href: u, text: u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') } : null;
  }
  function normIg(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    s = s.replace(/^https?:\/\//i, '').replace(/^(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/[/?#].*$/, '');
    if (!/^[A-Za-z0-9._]{1,30}$/.test(s)) return null;
    return { href: 'https://instagram.com/' + s, text: '@' + s };
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var lastError = '';
  // yozish: muvaffaqiyatsiz bo'lsa sababini eslab qoladi ('quota' — joy tugadi, 'blocked' — brauzer xotirani taqiqlagan)
  function lsSet(k, v) {
    try { localStorage.setItem(k, v); lastError = ''; return true; }
    catch (e) { lastError = (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) ? 'quota' : 'blocked'; return false; }
  }
  function storageOk() { try { var k = '__alf_t'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---- mahsulotlar (davlatlar, hududlar, turlar bilan birga) ---- */
  function defaults() { return { v: 1, countries: clone(COUNTRIES), types: clone(TYPES), products: clone(PRODUCTS) }; }
  function loadProducts() {
    var raw = lsGet(KEY_DB);
    if (raw) {
      try {
        var db = JSON.parse(raw);
        if (db && db.v === 1 && db.products && db.countries) { if (!db.types) db.types = clone(TYPES); return db; }
      } catch (e) {}
    }
    return defaults();
  }
  function saveProducts(db) { return lsSet(KEY_DB, JSON.stringify(db)); }
  function resetProducts() { lsDel(KEY_DB); return defaults(); }

  /* ---- aloqa sozlamalari ---- */
  function loadSettings() {
    var s = clone(SETTINGS), raw = lsGet(KEY_SET);
    if (raw) { try { var o = JSON.parse(raw); for (var k in o) if (Object.prototype.hasOwnProperty.call(s, k)) s[k] = o[k]; } catch (e) {} }
    return s;
  }
  function saveSettings(s) { return lsSet(KEY_SET, JSON.stringify(s)); }
  function resetSettings() { lsDel(KEY_SET); return clone(SETTINGS); }

  window.ALF = {
    loadProducts: loadProducts, saveProducts: saveProducts, resetProducts: resetProducts,
    loadSettings: loadSettings, saveSettings: saveSettings, resetSettings: resetSettings,
    normPhone: normPhone, fmtPhone: fmtPhone, normTg: normTg, normMax: normMax, normIg: normIg, safeUrl: safeUrl,
    storageOk: storageOk, lastError: function () { return lastError; },
    KEYS: { db: KEY_DB, set: KEY_SET }
  };
})();
