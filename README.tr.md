# PortfoCLI

[English](README.md) · [Türkçe](README.tr.md)

Uğur Dindar için Next.js App Router, React, TypeScript ve CSS Modules ile geliştirilmiş terminal esintili portföy. Bağlantılarla veya komut alanıyla gezilebilir; komutlar yalnızca önceden tanımlanmış portföy işlemlerini çalıştırır, kabuk kodu çalıştırmaz.

**Canlı site:** [ugurdindar.com](https://ugurdindar.com)

## Keşfedin

- İngilizce, Türkçe ve Almanca dillerinde gezinin. `/tr?section=projects` gibi bölüm adresleri paylaşılabilir.
- Hakkımda, Deneyim, Yetenekler, Projeler, GitHub, İstatistikler, CV ve İletişim bölümlerini gezinme bağlantılarından veya komut alanından açın. `/projects`, `whoami` ve `help` komutlarını deneyin. Tek bir `/` öneki isteğe bağlıdır. `Ctrl/⌘ K` komut alanına odaklanır; ↑/↓ önceki komutları getirir.
- Görünüm stüdyosundan veya `theme aurora` komutuyla açık, koyu, sistem, aurora, ember, blueprint ve matrix temalarından birini seçin. Dili `lang tr`, `lang en` veya `lang de` ile değiştirin. Tema tercihi yerel olarak saklanır.
- CV’ye dayalı deneyimi, proje örneklerini ve bağlantılı sertifikaları inceleyin; orijinal PDF CV’yi CV bölümünden indirin.
- Herkese açık GitHub repo sayısını, toplam yıldızları, en çok yıldız alan üç özgün repoyu, tüm repo listesini ve katkı etkinliğini görün. GitHub verileri yaklaşık saatlik güncellenir. Veri yüklenemezse uydurma sayılar yerine yeniden deneme ve doğrudan profil bağlantısı sunulur.
- Yerel MP3 dosyalarıyla isteğe bağlı görsel sahneler açan `/melek` ve `/tzesh` komutlarını keşfedin. Ses, yerel oynatıcı kontrollerini kullanır ve kullanıcı etkileşimiyle başlar.

Arayüz klavye gezinmesini, azaltılmış hareket tercihini ve dar ekranları destekler. JavaScript kapalıyken temel bölüm bağlantıları, sertifika bağlantıları ve PDF kullanılabilir.

## Yerelde çalıştırma

Node.js 22.18+ ve npm gerekir. GitHub token’ı gerekmez.

```sh
npm ci
npm run dev
```

[http://127.0.0.1:3000](http://127.0.0.1:3000) adresini açın. Üretim kontrolleri:

```sh
npm run typecheck
npm test
npm run build
```

Tarayıcı testleri üretim derlemesini kullanır ve gerekirse sunucusunu başlatır:

```sh
npx playwright install chromium webkit
npm run test:e2e
```

## Portföy içeriğini güncelleme

- `lib/profile.ts` kimlik ve canonical site adresini içerir; `public/resume.pdf` indirilen CV’dir.
- `lib/biography.ts`, `lib/showcase.ts` ve `lib/credentials.ts` CV’ye dayalı metinleri, örnekleri ve sertifika bağlantılarını içerir. Bilgiler değiştiğinde üç dili de güncelleyin.
- `lib/i18n.ts` arayüz metinlerini; `lib/commands.ts` izinli komutları, takma adları, dilleri ve temaları tanımlar.
- `components/Content.tsx` bölümleri gösterir. `app/globals.css` ve `components/Terminal.module.css` temaları ve duyarlı düzeni tanımlar.
- `components/GithubPanel.tsx`, `lib/github.ts` ve `app/api/github/route.ts` herkese açık GitHub görünümünü sağlar. Sabit hesap Tzesh’dir; repo ve yıldız toplamları fork’ları içerir, ilk üç sıralaması ise fork’ları dışarıda bırakır.

## Keşfedilebilirlik ve paylaşım

Sitede favicon, [robots.txt](https://ugurdindar.com/robots.txt) ve doğrulanmış portföy kaynaklarına bağlantı veren Markdown biçiminde [llms.txt](https://ugurdindar.com/llms.txt) bulunur. Sonuncusu isteğe bağlı bir keşif önerisini izler; arama sıralaması veya yapay zekâ sistemlerine dahil olma garantisi vermez. Dile özel sosyal önizleme kartları `/en/opengraph-image`, `/tr/opengraph-image` ve `/de/opengraph-image` adreslerindedir.

## Yayınlama

Üretim hedefi [ugurdindar.com](https://ugurdindar.com). Yayınlama düzeni, konteyner içinde `0.0.0.0:3000` adresini dinleyen çok aşamalı bir standalone Docker imajı kullanır. GitHub üzerinde çalışan CI, pull request’leri ve ana dalı denetler; self-hosted runner, ana dala gönderimlerde veya elle başlatıldığında yayınlar. Sunucu portu `PORT` secret’ından alınır; yayınlama sağlık kontrolü ve hata durumunda geri alma içerir.
