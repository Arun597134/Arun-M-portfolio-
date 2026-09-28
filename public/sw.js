const CACHE_NAME = 'arun-portfolio-v2';
const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.svg'
];

// Install: Cache static branding assets only (do NOT cache index.html here to prevent stale chunk lock)
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate: Immediately purge all outdated caches and take control of all clients
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting stale cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First for navigation (HTML) to always load latest Vite bundle hashes
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // 1. Bypass video streaming from Service Worker (avoid Range request 206 failures)
  if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')) {
    return;
  }

  // 2. Navigation requests (Page loads / index.html): NETWORK FIRST
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // If valid response, clone and cache for offline fallback
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache ONLY if completely offline
          return caches.match(e.request).then((res) => res || caches.match('/'));
        })
    );
    return;
  }

  // 3. Stale-while-revalidate for static assets
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && e.request.method === 'GET') {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return networkResponse;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
