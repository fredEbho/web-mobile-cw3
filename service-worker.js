if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),d={module:{uri:o},exports:t,require:c};s[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"web-mobile-cw3"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.4a1ad728.css",revision:null},{url:"/icon.png",revision:"7676155efec287aaaa1b78ea9a79120d"},{url:"/index.html",revision:"a0da116d27dd320fe5a5514cc03edd4d"},{url:"/js/app.685a0eac.js",revision:null},{url:"/js/chunk-vendors.7e8d3445.js",revision:null},{url:"/manifest.json",revision:"dba6aaa0d4ffe4144cbf8ce4ead88d5d"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
