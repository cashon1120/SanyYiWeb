"use strict";var precacheConfig=[["/index.html","c81bc6a32ac5382b38d6af64d7eb9729"],["/static/css/main.03942f4a.css","6c82714031e921f5b14887fe6bf105e5"],["/static/js/0.fd684909.chunk.js","13d0b93576486c4580d77dee70b7279d"],["/static/js/1.cd3866c5.chunk.js","41aba59e2ad140d207d098f1cef8657f"],["/static/js/10.a64df376.chunk.js","051e0afb41f8ab24ce0e044b94f322a2"],["/static/js/11.57f93f31.chunk.js","fd2496fe0c958e1be19a3da51a1e64f9"],["/static/js/12.bb1f1748.chunk.js","aa9eabf374011c5deb425c4fc9271021"],["/static/js/13.51cb7d69.chunk.js","bbb5c6b9b7722ea880e48227de5ea844"],["/static/js/14.c86c1504.chunk.js","7dbf7ad4d909591eed9c73a5f7ffcf66"],["/static/js/15.059561ce.chunk.js","18811f935545c39cd057577fcec2fdad"],["/static/js/16.e4f26134.chunk.js","0a020d34ea88454346c7ac27e9e72a4a"],["/static/js/17.8a9b6c10.chunk.js","f75336b7f2f703a275a5d427bab675af"],["/static/js/18.9c154a75.chunk.js","f79a7e84b82a71c66cec3548fb628140"],["/static/js/19.bb687cc7.chunk.js","04c2caeb4be1355ef81cc781926d13c2"],["/static/js/2.9327da5e.chunk.js","510f3d0c2bde99980bcb189e8ac7ffb3"],["/static/js/20.d10f3109.chunk.js","5f23d4f898788884dfe9a2b646fa922b"],["/static/js/3.5bebc400.chunk.js","2689817cd1210ecf64fb6c19f66b3413"],["/static/js/4.3f84a09a.chunk.js","86059b210a55eae35a29eecf7856c2cf"],["/static/js/5.91da60ba.chunk.js","82f394d3dc59c6443c3ca9fb0e2f43df"],["/static/js/6.ac18e7f3.chunk.js","005c5bbe8ec8cada1361437a3267c26d"],["/static/js/7.fbb26db2.chunk.js","0e76719860fac8d5058d08bbbaa141c7"],["/static/js/8.e8bd4afb.chunk.js","ae92b25666736777c3fb0bf816f6a5e0"],["/static/js/9.24d40324.chunk.js","ef81c8a40c42fc8649097eed88de293e"],["/static/media/banner.c1837ebd.jpg","c1837ebdb0f5fea54db65ea229f68800"],["/static/media/index_banner.cafca3d1.jpg","cafca3d11abce60351a2efda8c6c0a18"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});