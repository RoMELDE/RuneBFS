var __wpo = {"assets":{"main":["./data.1064a0fda8706e1e7521.js","./jsondata0.7bbefe8a5eb2b462fef3.js","./main.27956dfc7cbe9b607ea7.css","./main.3698f3210e1abf25ac6d.js","./vendors~view.68f18fbf77927e354bd4.js","./view.df66f806deba1ae02be9.js","./5.0775ff87266945a39d20.js","./6.a0677f025ca7838bd554.js","./7.0d6429847e4898deafe6.js","./8.c9263d8d442b9aabf8bf.js","./9.c3ff580f5c2a9ba8cab2.js","./","./manifest.f13d8841a529c2e17dc402b7b0556651.json","./icon_1024x1024.061bd04a8a2f4fb1b3e901fc6410e3f9.png","./icon_512x512.3853c960f004b490c4efeb6cba620c8f.png","./icon_384x384.c7283f5cb07c82e07eac6d3a0591894c.png","./icon_256x256.75234123f590c460c79a86bc2fd026ad.png","./icon_192x192.41c303ce165873ef88d1c8d8ccb7c2b4.png","./icon_128x128.ae28fd32f0465b6501d66a5548b4d27d.png","./icon_96x96.487be35bdaae7d04736566629653d5db.png"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"b50b23c32e43a9d4f76e4efbfa7f75ddbb7f32f1":"./data.1064a0fda8706e1e7521.js","60bc138206fa02fe7b244cc30aa7d29eb6e6b606":"./jsondata0.7bbefe8a5eb2b462fef3.js","9802932add791d3a71d65486f550a0e58ddf2988":"./main.27956dfc7cbe9b607ea7.css","ae84c33e01365e2fffcaf4347b9fa0363e67689f":"./main.3698f3210e1abf25ac6d.js","0fb6502ebe9eeedef0d79c441241319b106ff395":"./vendors~view.68f18fbf77927e354bd4.js","0a5e529aacc53ea4342b86a93551237989e7b385":"./view.df66f806deba1ae02be9.js","46aa9b7a3a3e86b0865651548d50fd9bfde1d0f3":"./5.0775ff87266945a39d20.js","0309dcb15960c110375178614cee96392ec078eb":"./6.a0677f025ca7838bd554.js","d463c1dfd4873eaae319bd86febca1017e803d0f":"./7.0d6429847e4898deafe6.js","5e58a669143423b9c2285817d6216f1f2a565308":"./8.c9263d8d442b9aabf8bf.js","5c6a13a30592bdf6640995a109e8d66f2bbceadd":"./9.c3ff580f5c2a9ba8cab2.js","e725300244d328f7fd0fc3a8b0bd4aafd0c3c607":"./","5ff88a26230cc69ed98fb4528721dfeba07b49d5":"./manifest.f13d8841a529c2e17dc402b7b0556651.json","f049a37a0d70747c4a28a39c6c4b2c10c4c6e820":"./icon_1024x1024.061bd04a8a2f4fb1b3e901fc6410e3f9.png","33fb10740f3bc8efc1bd2c98ceee4a8a0a12b8a9":"./icon_512x512.3853c960f004b490c4efeb6cba620c8f.png","0396c77cdc8e7e74a21a569bb8809107ef7491b5":"./icon_384x384.c7283f5cb07c82e07eac6d3a0591894c.png","6bb0c34f10151f18981ef0d6886cf529504da522":"./icon_256x256.75234123f590c460c79a86bc2fd026ad.png","832aa39c1a24f7d86f4bf404f33857326f4e919f":"./icon_192x192.41c303ce165873ef88d1c8d8ccb7c2b4.png","0b7606927dc68034b10a2bca1b19f9e860ca0089":"./icon_128x128.ae28fd32f0465b6501d66a5548b4d27d.png","f9695b95d61a29e84d2a74d1b11a75cf9a5ecf6a":"./icon_96x96.487be35bdaae7d04736566629653d5db.png"},"strategy":"changed","responseStrategy":"cache-first","version":"2019-6-16 11:58:24","name":"webpack-offline:ROMEL_RuneBFS","pluginVersion":"5.0.7","relativePaths":true};

!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var r,i,o;if(r=ExtendableEvent.prototype.waitUntil,i=FetchEvent.prototype.respondWith,o=new WeakMap,ExtendableEvent.prototype.waitUntil=function(e){var n=this,t=o.get(n);if(!t)return t=[Promise.resolve(e)],o.set(n,t),r.call(n,Promise.resolve().then(function e(){var r=t.length;return Promise.all(t.map(function(e){return e.catch(function(){})})).then(function(){return t.length!=r?e():(o.delete(n),Promise.all(t))})}));t.push(Promise.resolve(e))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),i.call(this,e)},void 0===a)var a=!1;function u(e,n){return caches.match(e,{cacheName:n}).then(function(t){return c(t)?t:s(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function c(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function s(e){return c(e)?Promise.resolve(e):("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function f(e,n){n.forEach(function(e){})}!function(e,n){var t=n.cacheMaps,r=n.navigationPreload,i=e.strategy,o=e.responseStrategy,a=e.assets,c=e.hashesMap,l=e.externals,h=e.prefetchRequest||{credentials:"same-origin",mode:"cors"},d=e.name,p=e.version,v=d+":"+p,m=d+"$preload",g="__offline_webpack__data";Object.keys(a).forEach(function(e){a[e]=a[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===l.indexOf(e)&&(n.search=""),n.toString()})}),c=Object.keys(c).reduce(function(e,n){var t=new URL(c[n],location);return t.search="",t.hash="",e[n]=t.toString(),e},{}),l=l.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()});var y=[].concat(a.main,a.additional,a.optional);function w(n){var t=a[n];return caches.open(v).then(function(r){return x(r,t,{bust:e.version,request:h,failAll:"main"===n})}).then(function(){f(0,t)}).catch(function(e){throw e})}function P(n){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&0!==(t=e[n]).indexOf(d););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(g,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}}).then(function(t){if(!t)return w(n);var r=t[0],i=t[1],o=t[2],u=o.hashmap,s=o.version;if(!o.hashmap||s===e.version)return w(n);var l=Object.keys(u).map(function(e){return u[e]}),d=i.map(function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()}),p=a[n],m=[],g=p.filter(function(e){return-1===d.indexOf(e)||-1===l.indexOf(e)});Object.keys(c).forEach(function(e){var n=c[e];if(-1!==p.indexOf(n)&&-1===g.indexOf(n)&&-1===m.indexOf(n)){var t=u[e];t&&-1!==d.indexOf(t)?m.push([t,n]):g.push(n)}}),f(0,g),f(0,m);var y=Promise.all(m.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(v).then(function(t){var r=y.then(function(e){return Promise.all(e.map(function(e){return t.put(e[0],e[1])}))});return Promise.all([r,x(t,g,{bust:e.version,request:h,failAll:"main"===n,deleteFirst:"main"!==n})])})})}function b(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(d)&&0!==e.indexOf(v))return caches.delete(e)});return Promise.all(n)})}function O(){return caches.open(v).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:c}));return n.put(new URL(g,location).toString(),t)})}self.addEventListener("install",function(e){var n=void 0;n="changed"===i?P("main"):w("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){var n=function(){if(!a.additional.length)return Promise.resolve();return("changed"===i?P("additional"):w("additional")).catch(function(e){})}();n=(n=(n=n.then(O)).then(b)).then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),r&&self.registration.navigationPreload&&(n=Promise.all([n,self.registration.navigationPreload.enable()])),e.waitUntil(n)}),self.addEventListener("fetch",function(e){if("GET"===e.request.method&&("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode)){var n=new URL(e.request.url);n.hash="";var i=n.toString();-1===l.indexOf(i)&&(n.search="",i=n.toString());var a=-1!==y.indexOf(i),c=i;if(!a){var s=function(e){var n=e.url,r=new URL(n),i=void 0;i=function(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}(e)?"navigate":r.origin===location.origin?"same-origin":"cross-origin";for(var o=0;o<t.length;o++){var a=t[o];if(a&&(!a.requestTypes||-1!==a.requestTypes.indexOf(i))){var u=void 0;if((u="function"==typeof a.match?a.match(r,e):n.replace(a.match,a.to))&&u!==n)return u}}}(e.request);s&&(c=s,a=!0)}if(a){var f=void 0;f="network-first"===o?function(e,n,t){return R(e).then(function(e){if(e.ok)return e;throw e}).catch(function(e){return u(t,v).then(function(n){if(n)return n;if(e instanceof Response)return e;throw e})})}(e,0,c):function(e,n,t){return function(e){if(r&&"function"==typeof r.map&&e.preloadResponse&&"navigate"===e.request.mode){var n=r.map(new URL(e.request.url),e.request);n&&function(e,n){var t=new URL(e,location),r=n.preloadResponse;q.set(r,{url:t,response:r});var i=function(){return q.has(r)},o=r.then(function(e){if(e&&i()){var n=e.clone();return caches.open(m).then(function(e){if(i())return e.put(t,n).then(function(){if(!i())return caches.open(m).then(function(e){return e.delete(t)})})})}});n.waitUntil(o)}(n,e)}}(e),u(t,v).then(function(r){return r||fetch(e.request).then(function(r){return r.ok?(t===n&&(i=r.clone(),o=caches.open(v).then(function(e){return e.put(n,i)}).then(function(){}),e.waitUntil(o)),r):r;var i,o})})}(e,i,c),e.respondWith(f)}else{if("navigate"===e.request.mode&&!0===r)return void e.respondWith(R(e));if(r){var h=function(e){var n=new URL(e.request.url);if(self.registration.navigationPreload&&r&&r.test&&r.test(n,e.request)){var t=function(e){if(q){var n=void 0,t=void 0;return q.forEach(function(r,i){r.url.href===e.href&&(n=r.response,t=i)}),n?(q.delete(t),n):void 0}}(n),i=e.request;return t?(e.waitUntil(caches.open(m).then(function(e){return e.delete(i)})),t):u(i,m).then(function(n){return n&&e.waitUntil(caches.open(m).then(function(e){return e.delete(i)})),n||fetch(e.request)})}}(e);if(h)return void e.respondWith(h)}}}}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}});var q=new Map;function x(e,n,t){n=n.slice();var r=t.bust,i=!1!==t.failAll,o=!0===t.deleteFirst,a=t.request||{credentials:"omit",mode:"cors"},u=Promise.resolve();return o&&(u=Promise.all(n.map(function(n){return e.delete(n).catch(function(){})}))),Promise.all(n.map(function(e){var n,t,i;return r&&(t=r,i=-1!==(n=e).indexOf("?"),e=n+(i?"&":"?")+"__uncache="+encodeURIComponent(t)),fetch(e,a).then(s).then(function(e){return e.ok?{response:e}:{error:!0}},function(){return{error:!0}})})).then(function(t){return i&&t.some(function(e){return e.error})?Promise.reject(new Error("Wrong response status")):(i||(t=t.filter(function(e,t){return!e.error||(n.splice(t,1),!1)})),u.then(function(){var r=t.map(function(t,r){var i=t.response;return e.put(n[r],i)});return Promise.all(r)}))})}function R(e){return e.preloadResponse&&!0===r?e.preloadResponse.then(function(n){return n||fetch(e.request)}):fetch(e.request)}}(__wpo,{loaders:{},cacheMaps:[{match:function(e){if(e.pathname!==location.pathname)return new URL("/RuneBFS/",location)},to:null,requestTypes:["navigate"]}],navigationPreload:!1}),e.exports=t(1)},function(e,n){}]);