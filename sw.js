const CACHE_NAME = 'daddy-camp-v11';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName); // FORCE DELETE EVERYTHING
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request)); // TEMPORARILY DISABLE OFFLINE FOR TESTING
});
