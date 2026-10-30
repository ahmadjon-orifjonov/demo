/*
 * Zinapoya — oflayn kesh (service worker). Faqat yig'ilgan web versiyada ro'yxatdan o'tadi (dist/, `DEMO_OCHISH.bat`);
 * dev serverda (`expo start`) index.html dagi skript uni ro'yxatdan o'tkazmaydi, borini o'chiradi.
 * Xavfsiz kontekst kerak: http://localhost — ishlaydi; telefonda LAN http://192.168… — brauzer SW'ni umuman bermaydi (zarari yo'q).
 *
 *  - sahifa (navigate): avval tarmoq, bo'lmasa keshdagi ilova qobig'i — server yopiq bo'lsa ham demo ochiladi;
 *  - /_expo/static/*, /assets/* (nomida xesh — o'zgarmaydi): avval kesh;
 *  - qolgani (manifest, ikonlar): avval tarmoq, bo'lmasa kesh;  /api/*, /__demo/*, Range so'rovlar — tegilmaydi.
 * O'rnatishda qobiq + skriptlar + ularda tilga olingan bo'laklar/shriftlar/ovozlar oldindan keshlanadi (birinchi ochilishdan keyin to'liq oflayn).
 */
const CACHE = 'zinapoya-202610302121';
const B = '/demo/zinapoya';
const IMMUTABLE = /^\/demo\/zinapoya\/(_expo\/static|assets)\//;
const REFS = /["'](\/demo\/zinapoya\/(?:_expo\/static\/[^"'\s]+\.(?:js|css)|assets\/[^"'\s]+\.(?:ttf|otf|woff2?|png|jpe?g|svg|webp|mp3|wav)))["']/g;

const ok = (res) => res && res.ok && res.status === 200 && res.type === 'basic';
/** Javob nusxasini keshga (clone — darhol, tana o'qilmasdan oldin). */
function keep(key, res) {
  if (!ok(res)) return res;
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(key, copy)).catch(() => undefined);
  return res;
}

async function precache() {
  const cache = await caches.open(CACHE);
  const put = async (url) => {
    const res = await fetch(url, { cache: 'no-store' });
    if (ok(res)) await cache.put(url, res.clone());
    return res;
  };
  const shell = await put(B + '/');
  if (!ok(shell)) return;
  const html = await shell.text();
  const urls = new Set([B + '/manifest.json', B + '/ramka.html', B + '/icons/icon-192.png', B + '/icons/icon-512.png']);
  for (const m of html.matchAll(/(?:src|href)="(\/[^"/][^"]*)"/g)) urls.add(m[1]);
  // asosiy skriptlar ichidagi bo'laklar (har ekran alohida .js), shriftlar, ovozlar, rasmlar
  for (const url of [...urls].filter((u) => u.endsWith('.js'))) {
    try {
      const res = await put(url);
      if (ok(res)) for (const m of (await res.text()).matchAll(REFS)) urls.add(m[1]);
    } catch {
      // bitta fayl bo'lmasa ham davom etamiz
    }
  }
  await Promise.all([...urls].map((u) => (cache.match(u).then((hit) => hit || put(u)).catch(() => undefined))));
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(precache().catch(() => undefined));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith(B + '/api/') || url.pathname.startsWith(B + '/__demo/')) return;

  if (req.mode === 'navigate') {
    const key = url.pathname === B + '/ramka.html' ? B + '/ramka.html' : B + '/';
    event.respondWith(
      fetch(req)
        .then((res) => keep(key, res))
        .catch(() => caches.match(key).then((hit) => hit || caches.match(B + '/')).then((hit) => hit || Response.error())),
    );
    return;
  }

  if (IMMUTABLE.test(url.pathname)) {
    event.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => keep(req, res))));
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => keep(req, res))
      .catch(() => caches.match(req).then((hit) => hit || Response.error())),
  );
});
