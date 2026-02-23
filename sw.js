const CACHE_NAME = 'tv-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/privacy.html',
  '/terms.html',
  '/contact.html',
  '/pdf-tools.html',
  '/pdf-editor.html',
  '/image-tools.html',
  '/text-tools.html',
  '/business-tools.html',
  '/bg-remover.html',
  '/image-cleaner.html',
  '/smart-crop.html',
  '/doc-scanner.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
