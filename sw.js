const CACHE_NAME = 'habit-tracker-v2';
const ASSETS = [
    './',
    './index.html',
    './icon.png',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    // Force new SW to enter waiting state immediately
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    // Clean up old caches immediately
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of all pages immediately
    );
});

self.addEventListener('fetch', (e) => {
    // Network First, fallback to Cache (better for active development updates)
    // Or Stale-While-Revalidate. For now, let's stick to Cache First but relying on SW update to refresh index.html
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
