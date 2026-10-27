# JT_Office – az S_KIADOK.xlsm webes, telepíthető változata

Office nélkül működik Windowson és Androidon (Chrome / Edge). Telepíthető alkalmazás (PWA), internet nélkül is fut.

- **Cím:** https://jtvilaga.github.io/jt_office/
- **Repó:** https://github.com/JTVilaga/jt_office (nyilvános)
- Korábbi neve **KIADOK** volt (mappa és repó: `sajat`). A belső nevek szándékosan maradtak `kiadok`-ok, lásd lent: „Belső nevek”. A látható nevek (ablakcím, fejléc, mentés- és szinkronfájlok) már JT_Office-ok; a régi `KIADOK_…` nevű mentések és szinkronfájlok ugyanúgy betölthetők.
- A **JT AppKreator** *Új PWA projekt* oldalával készült, és azzal kompatibilis (ld. „JT AppKreator”).

## Mi hova került az Excelből

| Excel                                        | Webes app                                                      |
|----------------------------------------------|----------------------------------------------------------------|
| Auto_Open → naptár                           | **Naptár** – induláskor ez nyílik meg                          |
| FrmNaptar (sárga / narancs / piros napok)    | Naptár: ugyanazok a színek és a szabály                        |
| Kattintás egy napra → H_napló sora           | Kattintás → a nap tartalma a jobb oldali panelen               |
| Jobb klikk → frmEvent (tól–ig)               | Jobb klikk / dupla klikk / hosszú nyomás → Új esemény          |
| s_kiadok lap                                 | **Kiadások** (szűrés, keresés, rendezés, összesítés)           |
| I_VILL, I_GÁZ, … Anna gombok (Module1)       | Sablongombok – az összegük az Adatok oldalon szerkeszthető     |
| Dupla klikk a „fizetve” oszlopon = ma        | „Fizetve ma” gomb                                              |
| H_napló + HNaplo_Feltoltes                   | **Napló** – magától frissül                                    |
| H_napló D oszlop (kézi megjegyzés)           | „+ Megjegyzés” egy naphoz                                      |
| HNaplo_ExportICS + LinkMegnyitasa            | Adatok → ICS export (ugyanazok az UID-k!) + Google link        |
| Gáz, Vill lapok                              | **Mérőórák** (fogyasztás, havi átlag automatikusan)            |
| ASX lap                                      | **Autó**                                                       |
| Restancia                                    | **Restancia** (kipipálható lista)                              |
| HF lap                                       | **Széf** – rejtett, opcionálisan jelszóval titkosítva          |
| HELP lap                                     | **Súgó**                                                       |
| Feltoltes_PS_Inline (rclone → Drive)         | Adatok → automatikus mentés fájlba / mentés megosztással       |

## Fájlok

```
index.html            az oldal váza (fejléc, menü, felugró ablak)
manifest.json         a telepítéshez (név, ikonok, szín)
sw.js                 service worker – offline működés (verziót emelni módosításkor!)
css/app.css           minden stílus (világos + sötét mód)
js/util.js            dátum, formázás, felugró ablak, űrlap, toast
js/store.js           adattárolás (IndexedDB), mentés fájlba, széf titkosítás
js/naplo-adat.js      a H_napló logikája + új esemény / esemény szerkesztés
js/nezet-naptar.js    Naptár nézet
js/nezet-kiadasok.js  Kiadások nézet, sablonok, összesítés
js/nezet-naplo.js     Napló nézet
js/nezet-egyeb.js     Mérőórák, Autó, Restancia, Súgó, „Több” menü
js/nezet-szef.js      Széf
js/nezet-adatok.js    Mentés, betöltés, Excel, ICS, sablonok, telepítés, üdvözlő képernyő
js/ics.js             ICS (Google Naptár) export
js/xlsx-io.js         Excel beolvasás (.xlsm) és export (.xlsx)
js/kuldes.js          Szinkron Quick Share-rel (küldés / fogadás)
js/drive-sync.js      Google Drive szinkron (appDataFolder)
js/app.js             indítás, menü/nézetváltás; az első sora a VERZIO (pl. '1.02')
js/telepites.js       telepítés gomb és iPhone-tipp (a JT AppKreator tette bele)
vendor/xlsx.full.min.js  SheetJS 0.18.5 (Excel-kezelő könyvtár)
ikon/                 alkalmazás ikonok: ikon-192, ikon-512, ikon-maskable-512 (Android), apple-touch-icon (iPhone)
github-JT_OFFICE.bat  feltöltés a GitHubra (verzióemeléssel) – nem kerül fel a GitHubra
verzio.ps1            a VERZIO emelése, a bat hívja – nem kerül fel a GitHubra
.gitignore            ami nem kerülhet fel a GitHubra
```

## Közzététel és frissítés: csak a `github-JT_OFFICE.bat`-tal

A GitHubra **mindig a `github-JT_OFFICE.bat`-tal** tedd fel (dupla kattintás). Kézzel, a GitHub
weboldalán ne tölts fel fájlt.

- **Első futáskor** (nincs `.git` mappa): létrehozza a `jt_office` repót, feltölti a mappát és bekapcsolja
  a GitHub Pages-t. A repó nevénél Enter = `jt_office`, így a cím nem változik.
- **Később:** megemeli a verziót (`verzio.ps1`), összegyűjti a változásokat, kér egy rövid leírást
  (Enter = a verziószám), és feltölti. A Pages pár perc múlva frissül, a telepített app a következő
  indításkor az új verziót kapja.

**A repó nyilvános: az egész mappa felkerül, kivéve amit a `.gitignore` kizár.** Ezért:

- Ebbe a mappába **ne tegyél adatot**: mentést (`.zip`), `kiadok-adatok.json`-t, `JT_Office_…` vagy régi `KIADOK_…` szinkronfájlt,
  `S_KIADOK.xlsm`-et vagy más saját fájlt. A Széf és a jelszavak ezekben vannak.
- A `.gitignore` ezeket kizárja: `kiadok-adatok*`, `*.xlsm`, `*.zip`, `KIADOK_*`, `JT_Office_*`, `github-*.bat`, `verzio.ps1`.
  Ami ennél másképp nevű, az felkerül.
- Ha mégis felkerült valami: a fájl kivétele után a GitHub előzményeiben megmarad. Ilyenkor a repót a
  GitHubon törölni kell (Settings → Danger Zone → Delete this repository), a helyi rejtett `.git` mappát is,
  és a bat-tal újra feltölteni – a cím ugyanaz marad.

Helyi kipróbáláshoz (Pythonnal): ebben a mappában `python -m http.server 8000`,
majd a böngészőben: http://localhost:8000

## Első indítás

1. Nyisd meg az oldalt. Új eszközön a legegyszerűbb: „☁ Google Drive-ról (szinkron)”. Ha nincs még
   Drive-szinkron: „Mentési fájl (kiadok-adatok.json)” → egy mentés a JT_OFFICE mappán **kívülről**,
   vagy az „Excel: S_KIADOK.xlsm” gombbal közvetlenül az xlsm.
2. Telepítés: Windowson a címsor telepítés ikonja, Androidon ⋮ → „Alkalmazás telepítése”.
3. Széf → „Jelszavas védelem” – javasolt bekapcsolni.

## Szinkron Windows ↔ Android – Quick Share (ajánlott)

Szerver és felhő nélkül (`js/kuldes.js`). A fejléc **⇄ Szinkron** gombja:

- **Küldés** – azon az eszközön, ahol utoljára szerkesztettél.
  - Telefon: megosztás menü → Quick Share → a laptop.
  - Windows: a fájl a Letöltésekbe kerül (`JT_Office_PC_ÉÉÉÉ-HH-NN_ÓÓPP.json`) → húzd rá a megnyitott Quick Share ablakára → a telefon.
    (A jobb klikk menü „Küldés Quick Share-rel” pontja Windows 11-en gyakran csak a „További lehetőségek megjelenítése” alatt van, vagy hiányzik.)
- **Fogadás** – a másikon: kiválasztod a kapott fájlt; az app megmutatja, melyik adat az újabb, és szól, ha régebbit töltenél be.
- A narancs pötty a ⇄ gombon: ezen az eszközön van el nem küldött módosítás. Ha a Google Drive szinkron is be van
  kapcsolva, és a módosítás már felkerült a felhőbe, nincs pötty (a másik eszköz onnan letölti).

Windowsra a Google ingyenes **Quick Share** programja kell (Bluetooth + WiFi), Androidon beépített.

## Tartalék: Google Drive szinkron (nem kötelező)

Az app közvetlenül a Google Drive API-val szinkronizál (`js/drive-sync.js`), fájlkezelő és
Google Drive for desktop nélkül. Egyetlen fájl van: `kiadok-adatok.json` a Drive rejtett
**appDataFolder** helyén – csak ez az app látja, a Drive felületén nem jelenik meg.

- Bekapcsolás: Adatok → „Bejelentkezés Google-lel és szinkron bekapcsolása” (mindkét eszközön).
  Új, üres eszközön az üdvözlő képernyőn: „☁ Google Drive-ról (szinkron)”.
- Módosítás után ~2,5 mp-cel feltölt; indításkor és amikor visszatérsz az apphoz, letölti az újabbat.
- Ha mindkét eszközön változott valami szinkron előtt, megkérdezi, melyik maradjon.
- A fejléc ☁ gombja: zöld = szinkronban (utolsó idő), narancs = bejelentkezés kell
  (a Google hozzáférés kb. 1 óráig érvényes), piros = hiba.
- Google Cloud projekt: KIADOK (a neve maradt), OAuth Web client, engedélyezett origin: `https://jtvilaga.github.io`,
  jogosultság: `drive.appdata` (szinkron) és `drive.file` (a teljes mentések mappája – csak az app saját fájljait látja).
  A Client ID a `js/drive-sync.js` elején van (nem titkos).
- **Teljes mentés (.zip):** ha a szinkron be van kapcsolva, a Letöltések mellett a Drive látható
  **JT_Office mentések** mappájába is felkerül. Az utolsó 10 marad meg (`MENTES_DB` a `js/drive-sync.js`-ben),
  a régebbieket az app törli. A `drive.file` engedélyt az első ilyen mentésnél egyszer jóvá kell hagyni.

A kézi mentés (.json letöltés / megosztás / betöltés) biztonsági pillanatképnek megmaradt.

## Módosításkor

1. Módosítsd a fájlokat. A verziót **ne kézzel** emeld.
2. Ha új fájlt adtál hozzá (js, kép), írd be az `sw.js` `FAJLOK` listájába is, különben internet nélkül hiányozni fog.
3. Futtasd a `github-JT_OFFICE.bat`-ot. Ez egyszerre emeli a verziót a `js/app.js`-ben (`const VERZIO = '1.02';`)
   és az `sw.js`-ben (`const VERZIO = 'jtoffice-v1.02';`) – a két számnak egyeznie kell –, és feltölti a GitHubra.

A verzióemelés nélkül a telepített app a régi, gyorsítótárazott fájlokat használná tovább.

Ha egy ikon cserélődik: a telepített app ikonját a Windows csak a gép újraindítása után mutatja újnak
az Asztalon, Androidon pedig újratelepítés kell.

## JT AppKreator

- A kreátor **Projektek → PWA-k** fülén látszik: verzió, GitHub-állapot, utolsó feltöltés. Ehhez a JT_OFFICE
  mappának a megjegyzett PWA-célmappában kell lennie, vagy a „Másik mappa megnézése” gombbal a szülőmappáját kell kiválasztani. Ha a `github-JT_OFFICE.bat` elveszne,
  a kártya „GitHub-bat újraírása” gombja újra kiírja.
- **Android-alkalmazás (APK):** *Új APK projekt*, forrásnak ezt a mappát kell választani. A kreátor a
  `.git` mappát, a `github-*.bat`-ot és a `verzio.ps1`-et nem másolja át. Az APK ikonja a `manifest.json` ikonjaiból készül (a maskable-ből az adaptív ikon).
- Amit a kreátor használ, azt ne nevezd át: `const VERZIO` sor az `app.js`-ben és az `sw.js`-ben,
  `manifest.json`, `ikon/` mappa, `js/telepites.js`.

## Belső nevek: maradjanak `kiadok`

Az átnevezés csak a látható nevet és a mappát érintette. Ezek szándékosan maradtak a régiek, mert
ha megváltoznának, a régi mentések, a Drive-on lévő adat és a többi eszköz nem találná egymást:

- az IndexedDB-adatbázis: `kiadok`
- a mentésfájl jelölése: `app: "KIADOK"`, a fájl: `kiadok-adatok.json` (a Drive-on is)
- a Google-belépés kulcsa: `kiadokDriveToken`

Mivel minden app ugyanazon a címen fut (`jtvilaga.github.io`), a böngésző közös tárat ad nekik. Ha egy
innen telepített appot (pl. a régi `sajat` KIADOK-ot) „minden adat törlésével” távolítasz el, a JT_Office
ezen az eszközön tárolt adatai is törlődhetnek – a Drive-szinkron visszahozza őket.
