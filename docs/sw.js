// Офлайн: сайт открывается из кэша, а в фоне подтягивает свежие файлы (новые темы видны со следующего запуска).
const CACHE = 'doza-istoria-v1';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'sync.js', 'firebase-config.js', 'manifest.webmanifest',
  'data/core.js', 'data/topics.js', 'data/peter.js', 'data/ege.js', 'icons/icon.svg', 'icons/icon-192.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const own = url.origin === location.origin, fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!own && !fonts) return; // Firebase, YouTube и прочее идут мимо кэша
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, {ignoreSearch: own});
    const fresh = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || fresh;
  }));
});
