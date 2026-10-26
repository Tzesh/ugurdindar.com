import type { Locale } from './commands';

type Showcase = {
  eyebrow: string;
  headline: string;
  highlights: { value: string; label: string; detail: string }[];
  cases: { company: string; title: string; description: string; tags: string[] }[];
};

// Sources: public/resume.pdf and professional updates supplied on 2026-10-27.
export const showcase: Record<Locale, Showcase> = {
  tr: {
    eyebrow: 'YAZILIM MÜHENDİSİ / BURSA',
    headline: 'Karmaşık problemleri güvenilir sistemlere dönüştüren bir yazılım mühendisiyim.',
    highlights: [
      { value: '30M+', label: 'Hassas kayıt', detail: 'Eski ve yeni şifreleme standartlarını birlikte destekleyen çift algoritmalı adaptör tasarladım. 30 milyondan fazla hassas kaydın yeniden şifrelenmesine katkı verdim ve üretim sürüm süreçlerini yürüttüm.' },
      { value: 'Ortak', label: 'Güvenlik altyapısı', detail: 'Sanal POS ve GarantiPay için başka bir ekibin de değiştirmeden kullandığı hCaptcha kütüphanesi geliştirdim. Önbellekli ve önbelleksiz çalışan hız sınırlama altyapım farklı üretim projelerinde kullanılıyor.' },
      { value: 'Kafka', label: 'Division düzeyinde uzmanlık', detail: 'Division düzeyinde Kafka konu uzmanı olarak görev alıyorum. GarantiPay 2.0 işlem akışlarında servisleri ayrıştırmak ve güvenilirliği artırmak için Kafka entegrasyonları geliştirdim.' },
      { value: 'AI', label: 'Ortak agent araçları', detail: 'Özel agentlar, ortak bellek, MCP entegrasyonları ve geliştirme kurallarını farklı IDE ve ortamlarda kullanılabilen bir pakette birleştirdim. Bu yapıyı Garanti BBVA Technology içindeki çalışmalarımda da kullanıyorum.' },
      { value: 'Güvenlik', label: 'Ödemeler ve AI inisiyatifi', detail: 'Sanal POS uygulamalarındaki kritik açıkların ve iş mantığı risklerinin giderilmesinde çalışıyorum. Ayrıca division genelinde AI destekli yazılım güvenliği değerlendirmelerine odaklanan bir inisiyatife katkı veriyorum.' },
      { value: 'JDK 21', label: 'Platform modernizasyonu', detail: 'Büyük ödeme uygulamalarında kapsamlı refactoring çalışmalarına, JBoss 8 ve JDK 21 yükseltmelerine katkı veriyorum.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D Secure ödeme geçidi', description: '3D_PAY modelinin yanında 3D Model desteği ekleyerek banka ve üye iş yeri kimlik doğrulama akışlarını uyarladım.', tags: ['3D Secure', 'Ödeme sistemleri', 'Entegrasyon'] },
      { company: 'Garanti BBVA Technology', title: 'Ortak AI geliştirme araçları', description: 'Farklı IDE ve ortamlarda özel agentları, ortak belleği, MCP entegrasyonlarını ve geliştirme kurallarını bir araya getiren bir paket geliştirdim. Bu yapıyı Garanti BBVA Technology içindeki çalışmalarımda da kullanıyorum.', tags: ['AI agentlar', 'MCP', 'Ortak bellek'] },
      { company: 'Garanti BBVA Technology', title: 'Ekipler arası güvenlik kütüphaneleri', description: 'Sanal POS, GarantiPay ve diğer uygulamalara ortak hCaptcha entegrasyonu sağladım; başka bir ekip de aynı yapıyı değiştirmeden kullandı. Farklı önbellek koşullarını destekleyen hız sınırlama yapısını birden fazla üretim projesine kazandırdım.', tags: ['hCaptcha', 'Hız sınırlama', 'Ortak kütüphaneler'] },
      { company: 'Garanti BBVA Technology', title: 'Token yönetimi ve eşzamanlılık', description: 'AtomicReference, double-checked locking, önbellek ve AOP tabanlı yenilemeyle ortak token yaşam döngüsü geliştirdim. Yoğun ödeme akışlarında istek kaybına yol açan yarış koşullarını giderdim.', tags: ['Java', 'Eşzamanlılık', 'AOP'] },
      { company: 'Garanti BBVA Technology', title: 'Büyük ölçekli ödeme modernizasyonu', description: 'Büyük ödeme kod tabanlarında kapsamlı refactoring çalışmalarına, JBoss 8 ve JDK 21 yükseltmelerine katkı veriyorum. Mevcut ödeme altyapılarının bakımını ve platform geçişlerini destekliyorum.', tags: ['JDK 21', 'JBoss 8', 'Refactoring'] },
      { company: 'Garanti BBVA Technology', title: 'AI destekli güvenlik ve geliştirme', description: 'Division genelindeki AI destekli yazılım güvenliği inisiyatifine katkı veriyorum. Geliştirme çalışmalarında ortak agent paketimden ayrı olarak takımımızın Claude tabanlı digital worker’ını kullanıyor, bağlam ve token optimizasyonu uyguluyorum.', tags: ['AI güvenliği', 'Claude digital worker', 'Token optimizasyonu'] },
    ],
  },
  en: {
    eyebrow: 'SOFTWARE ENGINEER / BURSA',
    headline: 'A software engineer turning complex problems into resilient systems.',
    highlights: [
      { value: '30M+', label: 'Sensitive records', detail: 'Designed a dual-algorithm adapter supporting legacy and new encryption standards. Contributed to re-encrypting over 30 million sensitive records and managed production deployment and releases.' },
      { value: 'Shared', label: 'Security infrastructure', detail: 'Built an hCaptcha library for Virtual POS and GarantiPay, adopted unchanged by another team. Developed rate limiting for cache-based and cacheless environments, used across multiple production projects.' },
      { value: 'Kafka', label: 'Division-level expertise', detail: 'Serve as a division-level Apache Kafka subject matter expert. Integrated Kafka into GarantiPay 2.0 transaction processing to decouple services and improve reliability.' },
      { value: 'AI', label: 'Shared agent tooling', detail: 'Built a toolkit combining custom agents, shared memory, MCP integrations, and development rules across IDEs and environments. Use it in engineering work at Garanti BBVA Technology.' },
      { value: 'Security', label: 'Payments & AI initiative', detail: 'Address critical vulnerabilities and business logic risks in Virtual POS applications. Also contribute to a division-wide initiative focused on AI-assisted software security assessment and review.' },
      { value: 'JDK 21', label: 'Platform modernization', detail: 'Contribute to major refactoring efforts and JBoss 8 and JDK 21 upgrades across large enterprise payment codebases.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D Secure payment gateway', description: 'Added 3D Model support alongside 3D_PAY and adapted bank-side and merchant-integrated authentication flows.', tags: ['3D Secure', 'Payments', 'Integration'] },
      { company: 'Garanti BBVA Technology', title: 'Shared AI development toolkit', description: 'Built a reusable toolkit across IDEs and environments with custom agents, shared memory, MCP integrations, and development rules. Use it in engineering work at Garanti BBVA Technology.', tags: ['AI agents', 'MCP', 'Shared memory'] },
      { company: 'Garanti BBVA Technology', title: 'Security libraries across teams', description: 'Delivered shared hCaptcha integration for Virtual POS, GarantiPay, and other applications, with another team adopting the implementation unchanged. Built reusable rate limiting supporting different caching environments across production projects.', tags: ['hCaptcha', 'Rate limiting', 'Shared libraries'] },
      { company: 'Garanti BBVA Technology', title: 'Token management & concurrency', description: 'Built a shared token lifecycle using AtomicReference, double-checked locking, caching, and AOP-driven renewal. Resolved race conditions that caused request loss in high-traffic payment processing.', tags: ['Java', 'Concurrency', 'AOP'] },
      { company: 'Garanti BBVA Technology', title: 'Large-scale payment modernization', description: 'Contribute to major refactoring efforts and JBoss 8 and JDK 21 upgrades across large payment codebases, supporting ongoing maintenance and platform transitions.', tags: ['JDK 21', 'JBoss 8', 'Refactoring'] },
      { company: 'Garanti BBVA Technology', title: 'AI-assisted security & development', description: 'Contribute to a division-wide AI-assisted software security initiative. Separately from my shared agent toolkit, develop with the team’s Claude-based digital worker and apply context and token optimization practices.', tags: ['AI-assisted security', 'Claude digital worker', 'Token optimization'] },
    ],
  },
  de: {
    eyebrow: 'SOFTWAREENTWICKLER / BURSA',
    headline: 'Softwareentwickler, der komplexe Probleme in zuverlässige Systeme übersetzt.',
    highlights: [
      { value: '30M+', label: 'Sensible Datensätze', detail: 'Einen Adapter für alte und neue Verschlüsselungsstandards entworfen. Zur erneuten Verschlüsselung von über 30 Millionen sensiblen Datensätzen beigetragen und Produktionsreleases verantwortet.' },
      { value: 'Gemeinsam', label: 'Sicherheitsinfrastruktur', detail: 'Eine hCaptcha-Bibliothek für Virtual POS und GarantiPay entwickelt, die ein anderes Team unverändert übernommen hat. Rate Limiting für Umgebungen mit und ohne Cache wird in mehreren Produktionsprojekten eingesetzt.' },
      { value: 'Kafka', label: 'Expertise auf Divisionsebene', detail: 'Als Apache-Kafka-Fachexperte auf Divisionsebene tätig. Kafka in GarantiPay 2.0 integriert, um Dienste zu entkoppeln und die Zuverlässigkeit zu verbessern.' },
      { value: 'KI', label: 'Gemeinsame Agentenwerkzeuge', detail: 'Ein Toolkit mit eigenen Agenten, gemeinsamem Speicher, MCP-Integrationen und Entwicklungsregeln für verschiedene IDEs und Umgebungen entwickelt. Auch bei Garanti BBVA Technology im Einsatz.' },
      { value: 'Sicherheit', label: 'Zahlungen und KI-Initiative', detail: 'Kritische Schwachstellen und Geschäftslogikrisiken in Virtual-POS-Anwendungen beheben. Zusätzlich an einer divisionsweiten Initiative für KI-gestützte Softwaresicherheitsbewertungen mitwirken.' },
      { value: 'JDK 21', label: 'Plattformmodernisierung', detail: 'Zu umfangreichen Refactorings sowie JBoss-8- und JDK-21-Upgrades in großen Codebasen für Zahlungsanwendungen beitragen.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D-Secure-Zahlungsplattform', description: '3D Model neben 3D_PAY ergänzt und Authentifizierungsabläufe auf Bank- und Händlerseite angepasst.', tags: ['3D Secure', 'Zahlungen', 'Integration'] },
      { company: 'Garanti BBVA Technology', title: 'Gemeinsames KI-Entwicklungstoolkit', description: 'Ein wiederverwendbares Toolkit für verschiedene IDEs und Umgebungen mit eigenen Agenten, gemeinsamem Speicher, MCP-Integrationen und Entwicklungsregeln entwickelt. Auch bei Garanti BBVA Technology im Einsatz.', tags: ['KI-Agenten', 'MCP', 'Gemeinsamer Speicher'] },
      { company: 'Garanti BBVA Technology', title: 'Teamübergreifende Sicherheitsbibliotheken', description: 'Eine gemeinsame hCaptcha-Integration für Virtual POS, GarantiPay und weitere Anwendungen umgesetzt, die ein anderes Team unverändert übernommen hat. Wiederverwendbares Rate Limiting für unterschiedliche Cache-Umgebungen entwickelt.', tags: ['hCaptcha', 'Rate Limiting', 'Gemeinsame Bibliotheken'] },
      { company: 'Garanti BBVA Technology', title: 'Token-Verwaltung und Nebenläufigkeit', description: 'Einen gemeinsamen Token-Lebenszyklus mit AtomicReference, Double-checked Locking, Caching und AOP-basierter Erneuerung entwickelt. Race Conditions behoben, die bei hoher Last zu Anfrageverlusten führten.', tags: ['Java', 'Nebenläufigkeit', 'AOP'] },
      { company: 'Garanti BBVA Technology', title: 'Modernisierung großer Zahlungsanwendungen', description: 'Zu umfangreichen Refactorings sowie JBoss-8- und JDK-21-Upgrades in großen Codebasen beitragen und die laufende Wartung sowie Plattformwechsel unterstützen.', tags: ['JDK 21', 'JBoss 8', 'Refactoring'] },
      { company: 'Garanti BBVA Technology', title: 'KI-gestützte Sicherheit und Entwicklung', description: 'An einer divisionsweiten Initiative für KI-gestützte Softwaresicherheit mitwirken. Unabhängig vom gemeinsamen Agenten-Toolkit mit dem Claude-basierten Digital Worker des Teams entwickeln und Kontext- sowie Token-Optimierung anwenden.', tags: ['KI-gestützte Sicherheit', 'Claude Digital Worker', 'Token-Optimierung'] },
    ],
  },
};
