const C='fm-v3',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin)return;
 if(r.mode=='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put('index.html',c));return x}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{const c=y.clone();caches.open(C).then(k=>k.put(r,c));return y})))});
