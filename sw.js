// Service worker – offline működéshez. A JT App kreátor készítette.
// FONTOS: ha bármelyik fájlt módosítod, emeld meg a VERZIO értékét (az app-update.bat ezt megteszi),
// különben a telepített app a régi fájlokat használja tovább.

const VERZIO = 'jtoffice-v1.05';

const FAJLOK = [
  './',
  'README.md',
  'css/app.css',
  'ikon/apple-touch-icon.png',
  'ikon/ikon-192.png',
  'ikon/ikon-512.png',
  'ikon/ikon-maskable-512.png',
  'index.html',
  'js/app.js',
  'js/drive-sync.js',
  'js/ics.js',
  'js/kuldes.js',
  'js/naplo-adat.js',
  'js/nezet-adatok.js',
  'js/nezet-egyeb.js',
  'js/nezet-kiadasok.js',
  'js/nezet-naplo.js',
  'js/nezet-naptar.js',
  'js/nezet-szef.js',
  'js/store.js',
  'js/telepites.js',
  'js/util.js',
  'js/xlsx-io.js',
  'manifest.json',
  'vendor/xlsx.full.min.js'
];

// Telepítéskor: minden fájl a gyorsítótárba.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERZIO).then(c => c.addAll(FAJLOK)));
  self.skipWaiting();
});

// Aktiváláskor: a régi verziók gyorsítótárának törlése.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(kulcsok =>
      Promise.all(kulcsok.filter(k => k !== VERZIO).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Kéréskor: előbb a gyorsítótár, ha nincs benne, akkor a hálózat.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(talalat => talalat || fetch(e.request))
  );
});
