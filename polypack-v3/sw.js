// Oflayn kesh. Fayllar o‘zgarganda VERSION oshiriladi — eski kesh o‘chadi, ilova o‘zi yangilanadi (yoki «Yangi versiya bor» deydi).
// (Ma’lumot tuzilmasi versiyasi index.html ichidagi Data.VERSION — bunga bog‘liq emas.)
const VERSION = 'polypack-v4-29';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'fonts/golos-text-latin-wght-normal.woff2', 'fonts/golos-text-latin-ext-wght-normal.woff2',
  'fonts/golos-text-cyrillic-wght-normal.woff2', 'fonts/golos-text-cyrillic-ext-wght-normal.woff2', 'lang/ru.json',
  'fonts/golos-raqam-400.woff2', 'fonts/golos-raqam-500.woff2', 'fonts/golos-raqam-600.woff2', 'fonts/golos-raqam-700.woff2'];
const PAGE_WAIT = 2500; // sahifa uchun tarmoqni shuncha ms kutamiz, keyin keshdagi nusxa ochiladi

// Har fayl alohida keshlanadi: bittasi topilmasa ham o‘rnatish to‘xtamaydi.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.all(FILES.map(f => c.add(new Request(f, { cache: 'reload' })).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const key = req.url.split('?')[0].split('#')[0]; // ?v=... kabi qo‘shimchalar keshni ko‘paytirmasin
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  e.respondWith(caches.open(VERSION).then(cache => {
    const cached = () => cache.match(key).then(hit => hit || (isPage ? cache.match('index.html') : undefined));
    const fresh = fetch(isPage ? new Request(req.url, { cache: 'no-cache' }) : req)
      .then(res => { if (res.ok) cache.put(key, res.clone()); return res; });
    if (isPage) {
      // Sahifa: avval tarmoq — yangi versiya birinchi ochilishdayoq ko‘rinadi. Tarmoq sekin yoki yo‘q bo‘lsa — keshdagi nusxa.
      const late = new Promise(done => setTimeout(done, PAGE_WAIT)).then(cached);
      e.waitUntil(fresh.catch(() => null)); // kech kelsa ham kesh yangilansin
      return Promise.race([fresh.catch(() => undefined), late])
        .then(res => res || cached())
        .then(res => res || fresh);
    }
    // Shrift, ikon, manifest: avval kesh (darhol), tarmoqdan esa fonda yangilanadi; keshda yo‘q bo‘lsa — tarmoq.
    return cached().then(hit => {
      if (hit) { e.waitUntil(fresh.catch(() => null)); return hit; }
      return fresh;
    });
  }));
});

// Bildirishnoma bosilganda: ochiq oyna bo‘lsa — unga o‘tib, kerakli buyurtmani ochadi; bo‘lmasa — yangi oynada ochadi.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const win = list.find(c => 'focus' in c);
    if (win) { win.postMessage({ go: url }); return win.focus(); }
    return self.clients.openWindow(url);
  }));
});
