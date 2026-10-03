// Oflayn kesh. Fayllar o‘zgarganda VERSION oshiriladi — eski kesh o‘chadi.
// (Ma’lumot tuzilmasi versiyasi index.html ichidagi Data.VERSION — bunga bog‘liq emas.)
const VERSION = 'polypack-v3-11';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];

// Har fayl alohida keshlanadi: bittasi topilmasa ham o‘rnatish to‘xtamaydi.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null))))
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

// Avval tarmoq (yangi versiya darhol keladi), tarmoq yo‘q bo‘lsa — kesh.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        // ?v=... kabi qo‘shimchalar keshni ko‘paytirmasin
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req.url.split('?')[0], copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('index.html')))
  );
});
