// Minimal Service Worker to satisfy PWA installation criteria
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('habit-tracker-v1').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './icon.png',
                './manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
