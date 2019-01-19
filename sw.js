let staticCache = 'restaurant-cache-v1';
let urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/sw_registration.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];


/**
 * SW Installatioon
 */
self.addEventListener('install', function(event) {
	event.waitUntil(
        caches.open(staticCache)
        .then(function(cache) {
            console.log('Opened cache');
			return cache.addAll(urlsToCache);
        })
    );
});


/**
 * SW Activation
 */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-cache-') &&
                        cacheName != staticCache;
                }).map(function(cacheName) {
                    console.log('Cache Updated');
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


/**
 * Offline Fetching
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            console.log('Fecthed cache');
            return response || fetch(event.request);
        })
    );
});