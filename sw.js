self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('embarway-store').then((cache) => cache.addAll([
            'index.html',
            'logo.jpg',
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});