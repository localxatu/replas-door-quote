/* REPLAS offline cache - generated from exact release files */
const CACHE='replas-door-e5fc006a032a';
const FILES=["./","index.html","style.css","images.js","data.js","catalogue.js","core.js","app.js","icon.svg","icon-192.png","icon-512.png","manifest.webmanifest","docs/abs.pdf","docs/carbon.pdf","docs/composite.pdf","docs/installation.pdf","docs/locks.pdf"];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  try {
    await cache.addAll(FILES.map(p=>new Request(new URL(p,self.registration.scope),{cache:'reload'})));
    await self.skipWaiting();
  } catch(error) {
    await caches.delete(CACHE);
    for(const client of await self.clients.matchAll({includeUncontrolled:true}))client.postMessage({type:'CACHE_ERROR'});
    throw error;
  }
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('replas-door-')&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
  for(const client of await self.clients.matchAll({includeUncontrolled:true}))client.postMessage({type:'READY',version:CACHE});
})()));
self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='STATUS')event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const ready=(await Promise.all(FILES.map(p=>cache.match(new URL(p,self.registration.scope))))).every(Boolean);
    event.source?.postMessage({type:ready?'READY':'CACHE_ERROR',version:CACHE});
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const hit=await cache.match(event.request,{ignoreSearch:true});
    if(hit)return hit;
    try{return await fetch(event.request);}catch(e){return new Response('Nội dung chưa được tải để dùng offline.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});}
  })());
});
