from pathlib import Path
import hashlib,re,zipfile,json

ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist' if (ROOT/'dist'/'core.js').exists() else ROOT
files=['index.html','style.css','images.js','data.js','catalogue.js','core.js','app.js','icon.svg','icon-192.png','icon-512.png','manifest.webmanifest','logo-replas.png']
files += sorted(str(p.relative_to(DIST)) for p in (DIST/'docs').glob('*.pdf'))
fingerprint=hashlib.sha256(b''.join((DIST/p).read_bytes() for p in files)+Path(__file__).read_bytes()).hexdigest()[:12]
sw="""/* REPLAS offline cache - generated from exact release files */
const CACHE='replas-door-VERSION';
const FILES=FILES_JSON;
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
""".replace('VERSION',fingerprint).replace('FILES_JSON',json.dumps(['./']+files,separators=(',',':')))
(DIST/'sw.js').write_text(sw)
# Standalone HTML uses the same exact calculation engine, catalogue and photos.
html=(DIST/'index.html').read_text()
html=re.sub(r'\s*<link[^>]+(?:rel="icon"|rel="apple-touch-icon"|rel="manifest")[^>]*>','',html)
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(DIST/'style.css').read_text()+'</style>')
html=html.replace('<script src="images.js"></script>','<script>window.REPLAS_STANDALONE=true;</script><script src="images.js"></script>')
for p in ['images.js','data.js','catalogue.js','core.js','app.js']:
    source=(DIST/p).read_text().replace('</','<\\/')
    html=html.replace('<script src="'+p+'"></script>','<script>'+source+'</script>')
html=html.replace('</head>','<style>.source-links{display:none}</style></head>')
out=ROOT.parent/'output';out.mkdir(exist_ok=True)
(out/'REPLAS_Bao_Gia_Offline.html').write_text(html)
with zipfile.ZipFile(out/'REPLAS_Bao_Gia_Web.zip','w',zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for p in files+['sw.js']:
        z.write(DIST/p,p)
    z.write(ROOT/'HUONG_DAN.txt','HUONG_DAN.txt')
    z.write(ROOT/'README.md','README.md')
    z.write(ROOT/'build.py','build.py')
    z.write(ROOT/'tests'/'calculation.test.cjs','tests/calculation.test.cjs')
print(json.dumps({'cache':fingerprint,'files':len(files)+5,'standalone_bytes':len(html.encode()),'zip_bytes':(out/'REPLAS_Bao_Gia_Web.zip').stat().st_size},ensure_ascii=False))
