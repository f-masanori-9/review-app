if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let c={};const r=e=>s(e,t),u={module:{uri:t},exports:c,require:r};a[t]=Promise.all(i.map((e=>u[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2e70e6a0f67eadfa98960d565314a977"},{url:"/_next/static/aumhZxMBKiw07HaIa5eYx/_buildManifest.js",revision:"7ffa1336f55444da0bf144ec8f841352"},{url:"/_next/static/aumhZxMBKiw07HaIa5eYx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-d94ef46e794f5921.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/455-5c0cfdb5dadebfea.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/4bd1b696-ade33a520a1ac04d.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/517-ad4755cea7f928b2.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/53c13509-8e2b0df5da39436d.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/57-8b9bacf39b5c81ad.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/696-d2d6c0f982a9afb8.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/738-65ee6ea690cd5f98.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/795d4814-dbea0363c6cb1ceb.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/8e1d74a4-2bcc6d9eb8194dfa.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/9c4e2130-83856544e0ff68bc.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/_not-found/page-a039aaf06c372cd3.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/account/page-15b3e4cce8018fa4.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/api/%5B...route%5D/route-a1fdba59a4080b47.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-b0779982fa8fbb98.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/layout-00ba9b5dbf80a493.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/login/page-e6f9016ac1b75fab.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/page-a82250e3685971e7.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/vocabularyNotes/page-d320d84f8f069517.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/app/vocabularyNotes/play/page-355647e83f099181.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/c16f53c3-485576cb7c6ff48c.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/main-313f51aca8054a9a.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/main-app-c07d7fa1dda03fae.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-29ebadaebe2fcb3f.js",revision:"aumhZxMBKiw07HaIa5eYx"},{url:"/_next/static/css/04eb395ac849cc68.css",revision:"04eb395ac849cc68"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon192_maskable.png",revision:"37da922018ae6d951095d6ede4c48722"},{url:"/icon512_maskable.png",revision:"c1977bffb936b858f971fbeab63c6869"},{url:"/icon512_rounded.png",revision:"1b7485be77391904bf0d812128e17e63"},{url:"/landing_background.png",revision:"ffb48926277b7739b25410ffad763e9e"},{url:"/landing_backgrounda.png",revision:"c48b30ae0b8daa70de7996cfe1fd9fd4"},{url:"/manifest.json",revision:"e3aefe18e98a1c5cddea0fd0963fefb2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
