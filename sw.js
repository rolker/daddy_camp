const CACHE_NAME = 'daddy-camp-v10';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/assets/base_boy.svg',
    '/assets/base_girl.svg',
    '/assets/face/face1.svg',
    '/assets/face/face2.svg',
    '/assets/face/face3.svg',
    '/assets/face/face4.svg',
    '/assets/hair/hair1.svg',
    '/assets/hair/hair2.svg',
    '/assets/hair/hair3.svg',
    '/assets/hair/hair4.svg',
    '/assets/hair/hair5.svg',
    '/assets/hair/hair6.svg',
    '/assets/hair/hair7.svg',
    '/assets/shirt/shirt1.svg',
    '/assets/shirt/shirt2.svg',
    '/assets/shirt/shirt3.svg',
    '/assets/pants/pants1.svg',
    '/assets/pants/pants2.svg',
    '/assets/pants/pants3.svg'
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
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
