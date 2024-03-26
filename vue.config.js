/* eslint-disable */

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      runtimeCaching: [{
        // Routing via a matchCallback function:
        urlPattern: ({request, url}) =>  request.destination === "image",
        handler: 'StaleWhileRevalidate'
      },
        {
          urlPattern: ({ request, url }) => url.origin === 'https://web-mobile-cw2.onrender.com' && url.pathname === '/lessons' ,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache'
          }
        }
      ],
    }}
})
