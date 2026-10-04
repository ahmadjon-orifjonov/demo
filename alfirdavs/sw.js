// Oflayn kesh. Fayllar o‘zgarganda VERSION oshiriladi — eski kesh o‘chadi, ilova o‘zi yangilanadi (yoki «Yangi versiya bor» deydi).
// (Ma’lumot tuzilmasi versiyasi index.html ichidagi Data.VERSION — bunga bog‘liq emas.)
const VERSION = 'alfirdavs-10';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'fonts/plex-400.woff2', 'fonts/plex-500.woff2', 'fonts/plex-600.woff2',
  'fonts/plex-ext-400.woff2', 'fonts/plex-ext-500.woff2', 'fonts/plex-ext-600.woff2'];

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
    // Hamma fayl (sahifa ham): avval kesh — darhol ochiladi, tarmoqdan fonda yangilanadi; keshda yo‘q bo‘lsa — tarmoq.
    // Yangi chiqarish sw.js dagi VERSION bilan keladi: yangi SW o‘rnatiladi → controllerchange → ilova «Yangi versiya bor» deydi yoki o‘zi yangilanadi.
    return cached().then(hit => {
      if (hit) { e.waitUntil(fresh.catch(() => null)); return hit; }
      return fresh;
    });
  }));
});
