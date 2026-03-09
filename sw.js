const CACHE_NAME = 'daddy-camp-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/assets/base_boy.svg',
    '/assets/base_girl.svg',
    '/assets/hair/hair1.svg',
    '/assets/hair/hair2.svg',
    '/assets/hair/hair3.svg',
    '/assets/shirt/shirt1.svg',
    '/assets/shirt/shirt2.svg',
    '/assets/shirt/shirt3.svg',
    '/assets/pants/pants1.svg',
    '/assets/pants/pants2.svg',
    '/assets/pants/pants3.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
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
