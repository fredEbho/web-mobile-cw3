/* eslint-disable */
const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { Plugin: ExpirationPlugin } = workbox.expiration;

const { Plugin: CacheableResponsePlugin } = workbox.cacheableResponse;


precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});

// cache image and render from the cache if it exists or go t the network
registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
        cacheName: "images",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 2 * 24 * 60 * 60, // cache the images for only 2 Days
            }),
        ],
    })
);

