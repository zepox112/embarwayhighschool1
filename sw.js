// Jina la Cache (Badilisha v1 kuwa v2 ukitaka kusasisha website baadaye)
const CACHE_NAME = 'embarway-store-v1';

// Orodha ya mafaili muhimu yatakayofanya kazi hata kukiwa hakuna internet
const assets = [
    'index.html',
    'logo.jpg',
    'manifest.json'
];

// 1. Hatua ya Install: Inahifadhi mafaili kwenye cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Inahifadhi mafaili...');
            return cache.addAll(assets);
        })
    );
    // Inalazimisha Service Worker mpya kuchukua nafasi mara moja
    self.skipWaiting();
});

// 2. Hatua ya Activate: Inafuta cache za zamani
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Inafuta cache ya zamani...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. Hatua ya Fetch: Inaruhusu App kufunguka bila internet (Offline support)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Kama faili lipo kwenye cache, litumie, la sivyo nenda mtandaoni
            return response || fetch(e.request);
        })
    );
});