# PortfoCLI

Uğur Dindar için Codex CLI esintili, komutlarla veya bağlantılarla gezilen portföy. Çalışma alanı gezinmesi, CV’ye dayalı mühendislik örnekleri ve doğrudan PDF indirme sunar. Next.js App Router, React, TypeScript ve CSS Modules kullanır. Komutlar yalnızca önceden tanımlı eylemleri açar.

## Yerelde çalıştırma

Node.js 22.18+ ve npm gerekir.

```sh
npm ci
npm run dev
```

http://127.0.0.1:3000 adresini açın. Production kontrolü:

```sh
npm run typecheck
npm test
npm run build
npm run start
```

Tarayıcı testleri production build üzerinde çalışır; sunucu yoksa test komutu başlatır:

```sh
npx playwright install chromium webkit
npm run test:e2e
```

## Düzenleme

- `lib/profile.ts`: kimlik, site adresi, isteğe bağlı logo yolu. Logoyu `public/` altına ekleyip `/logo.svg` gibi yerel yol verin. `siteUrl`, canonical ve sitemap kaynağıdır; şu an yerel adres kullanır.
- `lib/biography.ts`: sağlanan CV’den alınan TR/EN/DE tanıtım, deneyim, eğitim, yetenek, sertifika ve proje özetleri. Bölümler ve CV özeti aynı veriyi kullanır.
- `lib/showcase.ts`: açılıştaki TR/EN/DE uzmanlık başlığı, üç deneyim kanıtı ve iki mühendislik çalışması. Yalnızca CV’deki bilgilere dayanır.
- `lib/credentials.ts`: PDF’deki 12 sertifikanın adı, sağlayıcısı, doğrudan belge bağlantısı ve konu kategorisi. Deneyim ve projelerde ilgili eğitimler, yeteneklerde tüm sertifikalar gösterilir.
- `public/resume.pdf`: kullanıcının sağladığı değişmemiş İngilizce PDF. Yenilemek için yeni dosyayı bu yola kopyalayın ve `lib/biography.ts` içeriğini üç dilde güncelleyin.
- `lib/i18n.ts`: TR/EN/DE arayüz ve yardım metinleri.
- `lib/commands.ts`: izinli komutlar, üç dilde takma adlar ve argüman doğrulaması.
- `components/Content.tsx`: menü ve komutların ortak bölüm görünümü.
- `app/globals.css` ve `components/Terminal.module.css`: renkler ve duyarlı terminal düzeni.

Bölümler `/tr?section=projects` gibi URL’lerle açılır. Dil değişimi açık bölümü korur. Kök URL önce geçerli `portfocli-lang` cookie’sini, ardından tarayıcının birincil dilini kullanır; desteklenmeyen dil İngilizce olur. Tema tercihi `portfocli-theme` localStorage anahtarında saklanır; sistem modu CSS medya sorgusuyla işletim sistemini izler. Depolama engelliyse mevcut oturum çalışmaya devam eder.

`help` tüm komutları gösterir. `/projects` gibi isteğe bağlı `/` öneki ve `whoami` desteklenir. `theme light|dark|system|aurora|ember|blueprint|matrix` ve `lang tr|en|de` tercihleri değiştirir; öneriler bu komutların değerlerini de tamamlar. `Ctrl/⌘ K` komut alanına odaklanır. Tab normal klavye gezinmesini korur; ↑/↓ geçmişi dolaşır. Takma adlar her arayüz dilinde geçerlidir. Oturum çıktısı/geçmişi yenilemede saklanmaz; geri/ileri gezinme ilgili bölümün görünümünü açar. JavaScript kapalıyken bölüm bağlantıları, deneyim ayrıntıları, sertifika bağlantıları ve PDF indirme çalışır.

## Görünüm ve temalar

Görünüm stüdyosu veya üstteki tema seçici aynı tercihi değiştirir. Aurora mor/mint, Ember bakır/antrasit, Blueprint kobalt/teknik çizim, Matrix yeşil fosfor kimliğine sahiptir. Açık, koyu ve sistem seçenekleri de korunur. Seçim sayfa yenilemesi ve dil geçişlerinde saklanır; sistem ayarı yalnızca `system` seçiliyken izlenir.

Yeni tema eklemek için `lib/commands.ts` içindeki `themes` listesine bir ad, `lib/i18n.ts` içindeki üç dil sözlüğüne isim/açıklama ve `app/globals.css` içine aynı adla bir token grubu ekleyin. Stüdyo önizlemesi `Terminal.module.css` içindeki `data-preset` seçicileriyle özelleştirilir. Komut önerileri, açılıştaki tercih doğrulaması ve seçici aynı tema listesini kullanır; bileşenler renk, yazı tipi ve köşe değişkenlerini paylaşır.

Proje kapakları gerçek uygulama ekran görüntüsü olarak sunulmayan kavramsal SVG çizimleridir. Kart geçişleri ve çıktı animasyonu işletim sisteminin azaltılmış hareket tercihini izler. Sertifika bağlantıları PDF’deki belge adresleridir; üçüncü taraf sitelerin erişim koşulları kendilerine aittir.

## Güncel kapsam

24 Eylül 2026 geliştirmesi, mevcut SP-2026-01/02 temeli üzerinde portföyü bir çalışma alanına dönüştürür: masaüstünde yan gezinme, mobilde yatay gezinme, yedi tema, ilk ekranda belirgin komut girişi, doğrudan CV indirme ve dokunulabilir hızlı komutlar. Menüden açılan bölümün başlığına odaklanılır; komut çalıştırıldığında giriş görünür kalır. Son komutun çıktısı girişin hemen altında görünür; önceki çıktılar açılır geçmişte saklanır. Yeni komut geçmiş panelini kapatır. Mobilde klavye kendiliğinden açılmaz, giriş yazı boyutu en az 16 px ve komut/menü kontrollerinin dokunma yüksekliği en az 44 px tutulur. Uzun deneyim listeleri doğal açılır ayrıntılarla okunur.

Projelerde CV’de belgelenen Quality Pool ve Virtual Patient gösterilir. GitHub bölümü canlı herkese açık repo sayısını, toplam yıldızları, en çok yıldız alan üç özgün repoyu, tam repo listesini ve katkı takvimini sunar; profil ve VPatient kaynak bağlantıları JavaScript kapalıyken de erişilebilir. İstatistikler CV’deki kurum, sertifika ve proje sayılarıyla not ortalamasını gösterir; canlı GitHub ölçümü değildir. Garanti kaydı yalnız 06/2023 olarak korunur. 30M+ kayıt ifadesi toplu yeniden şifreleme uygulamasına katkıyı anlatır; performans veya tek başına sahiplik iddiası eklenmez.

Sonraki içerik adımları: SpringBootTemplate/Tzoptimizer için gerçek kaynak bağlantıları ve proje açıklamaları sağlandığında eklemek; seçilen projeler için problem, katkı, teknik karar ve sonuçları anlatan ayrıntılı vaka sayfaları hazırlamak. GitHub verileri artık ayrı bir açık kaynak vitrini olarak sunulur. Ortam değişkeni, token ve yeni bağımlılık gerekmez.

Önceki sprint kanıtları ve açık manuel kontroller `.developer-toolpack/planning/` altında tutulur. Güncel regresyonlar `tests/commands.test.ts`, `tests/terminal.spec.ts`, `tests/portfolio.spec.ts`, `tests/appearance.spec.ts` ve `tests/mobile-command.spec.ts`, `tests/easter-eggs.spec.ts`, `tests/github.test.ts` ve `tests/github.spec.ts` içindedir. WebKit emülasyonu gerçek mobil Safari doğrulaması yerine geçmez. Yayın öncesinde `profile.siteUrl` gerçek alan adına ayarlanmalıdır. Commit, push, yayınlama ve deployment yapılmamıştır.


## Gizli komutlar ve müzik

`/melek` uçuşan kalpleri ve Real Life — Send Me an Angel ’89 kaydını açar. `/tzesh` dijital yağmuru, Matrix temasını ve Eiffel 65 — Blue (Da Ba Dee) orijinal videosunu açar. Komutlar yardım/öneri listesinde gösterilmez. Efektler duraklatılabilir; müzik düğmesi sesi durdurup parçayı başa alır. Escape, modu kapatma veya `clear` efektleri kaldırır, ses kaynağını boşaltır ve oynatıcıyı gizler. Matrix modu kalıcı tercihi değiştirmez; çıkış veya yenileme önceki temayı geri getirir. Mod açıkken elle seçilen başka tema korunur. Azaltılmış hareket tercihinde animasyon yerine durağan süslemeler gösterilir.

Şarkılar kullanıcının sağladığı MP3 dosyalarından çalınır: `public/audio/send_me_an_angel.mp3` (`/melek`) ve `public/audio/eiffel_65_blue.mp3` (`/tzesh`). İlk açılışta ses dosyaları indirilmez; tek bir yerel `<audio>` öğesi komutun kullanıcı etkileşimi sırasında başlatılır. Mod değişiminde aynı oynatıcı yeni parçaya geçer. Yerel kontroller oynat/duraklat, zaman ve ses ayarlarını sunar; otomatik oynatma engellenirse oynat düğmesi kullanılabilir. Dosya hataları üç dilde gösterilir. YouTube bağlantısı veya gömülü video kullanılmaz. Sahne `components/SecretScene.tsx` ve kendi CSS modülündedir.

## GitHub verileri

`app/api/github/route.ts` yalnız Tzesh hesabına ait veriyi sunar. `lib/github.ts`, GitHub REST API’sindeki tüm herkese açık repo sayfalarını (sayfa başına 100; en fazla 20 sayfa) toplar; eksik sonuçları toplam gibi göstermez. Repo toplamı ve yıldızlar fork’ları içerir; ilk üç yalnız özgün repolardan seçilir. İstekler zaman aşımıyla sınırlıdır ve sunucu verisi bir saat önbelleğe alınır. Token gerekmez.

Katkı takvimi GitHub’ın kendi herkese açık takviminden yalnız tarih, katkı sayısı ve seviye alanları okunarak oluşturulur. Ham HTML gösterilmez. Takvim biçimi değişirse repo verileri korunur ve GitHub’daki etkinlik bağlantısı sunulur. API sorunu olduğunda sahte sıfırlar yerine tekrar deneme durumu gösterilir. `components/GithubPanel.tsx` bu verileri üç dilde sunar; yerel, deterministik testler dış servisin durumuna bağımlı değildir.
