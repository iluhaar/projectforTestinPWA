self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
});
var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  '/dolphinio.github.io/',
  '/dolphinio.github.io/index.html',
  '/dolphinio.github.io/main.js',
  '/dolphinio.github.io/style.css',
  '/dolphinio.github.io/image/icons/',
  '/dolphinio.github.io/image/icons/android-icon-36x36.png',
  '/dolphinio.github.io/image/icons/android-icon-48x48.png',
  '/dolphinio.github.io/image/icons/android-icon-72x72.png',
  '/dolphinio.github.io/image/icons/android-icon-96x96.png',
  '/dolphinio.github.io/image/icons/android-icon-144x144.png',
  '/dolphinio.github.io/image/icons/android-icon-192x192.png',
  '/dolphinio.github.io/image/icons/apple-icon-57x57.png',
  '/dolphinio.github.io/image/icons/apple-icon-60x60.png',
  '/dolphinio.github.io/image/icons/apple-icon-72x72.png',
  '/dolphinio.github.io/image/icons/apple-icon-76x76.png',
  '/dolphinio.github.io/image/icons/apple-icon-114x114.png',
  '/dolphinio.github.io/image/icons/apple-icon-120x120.png',
  '/dolphinio.github.io/image/icons/apple-icon-144x144.png',
  '/dolphinio.github.io/image/icons/apple-icon-152x152.png',
  '/dolphinio.github.io/image/icons/apple-icon-180x180.png',
  '/dolphinio.github.io/image/icons/icon512x512.png', 
  '/dolphinio.github.io/image/icons/ms-icon-70x70.png',
  '/dolphinio.github.io/image/icons/ms-icon-144x144.png',
  '/dolphinio.github.io/image/icons/ms-icon-150x150.png',
  '/dolphinio.github.io/image/icons/ms-icon-310x310.png'
];
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });
 
  self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetched resource '+e.request.url);
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
                  return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });