/* eslint-disable */
const { precacheAndRoute, cleanupOutdatedCaches } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { Plugin: ExpirationPlugin } = workbox.expiration;

const { Plugin: CacheableResponsePlugin } = workbox.cacheableResponse;
// import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// import {  ExpirationPlugin } from 'workbox-expiration';

console.log(precacheAndRoute)

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});


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

registerRoute(
    ({ url }) => url.pathname.startsWith("https://web-mobile-cw2.onrender.com/"),
    new StaleWhileRevalidate()
);
