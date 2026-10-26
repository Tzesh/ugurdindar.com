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
      { value: '30M+', label: 'Hassas kayıt', detail: 'Çift algoritmalı geçişte 30 milyondan fazla kaydın yeniden şifrelenmesini sağlayan toplu işleme uygulamasına katkı verdim.' },
      { value: 'Ortak', label: 'Güvenlik altyapısı', detail: 'Sanal POS ve GarantiPay için başka bir ekibin de değiştirmeden kullandığı hCaptcha kütüphanesi ve farklı projelerde kullanılan hız sınırlama altyapısı geliştirdim.' },
      { value: 'Kafka', label: 'Division düzeyinde uzmanlık', detail: 'Division düzeyinde Kafka konu uzmanıyım; GarantiPay 2.0 işlem akışlarına Kafka entegre ettim.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D Secure ödeme geçidi', description: '3D_PAY modelinin yanında 3D Model desteği ekleyerek banka ve üye iş yeri kimlik doğrulama akışlarını uyarladım.', tags: ['3D Secure', 'Ödeme sistemleri', 'Entegrasyon'] },
      { company: 'Garanti BBVA Technology', title: 'Ortak AI geliştirme araçları', description: 'Farklı IDE ve ortamlarda özel agentları, ortak belleği, MCP entegrasyonlarını ve geliştirme kurallarını bir araya getiren bir paket geliştirdim. Bu yapıyı Garanti BBVA Technology içindeki çalışmalarımda da kullanıyorum.', tags: ['AI agentlar', 'MCP', 'Ortak bellek'] },
      { company: 'Ford Otosan', title: 'Ford Otosan uygulama modernizasyonu', description: 'Yaygın kullanılan kurum içi ASP.NET WebForms uygulamasını .NET 3.5’ten .NET Framework 4.8’e taşıdım ve ekiplerin kullandığı ortak .NET Core bileşenleri geliştirdim.', tags: ['.NET', 'Modernizasyon', 'Ortak bileşenler'] },
    ],
  },
  en: {
    eyebrow: 'SOFTWARE ENGINEER / BURSA',
    headline: 'A software engineer turning complex problems into resilient systems.',
    highlights: [
      { value: '30M+', label: 'Sensitive records', detail: 'Contributed to the batch application that re-encrypted over 30 million records during a dual-algorithm migration.' },
      { value: 'Shared', label: 'Security infrastructure', detail: 'Built an hCaptcha library for Virtual POS and GarantiPay, adopted unchanged by another team, and rate limiting used across production projects.' },
      { value: 'Kafka', label: 'Division-level expertise', detail: 'Serve as a division-level Kafka subject matter expert; integrated Kafka into GarantiPay 2.0 transaction processing.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D Secure payment gateway', description: 'Added 3D Model support alongside 3D_PAY and adapted bank-side and merchant-integrated authentication flows.', tags: ['3D Secure', 'Payments', 'Integration'] },
      { company: 'Garanti BBVA Technology', title: 'Shared AI development toolkit', description: 'Built a reusable toolkit across IDEs and environments with custom agents, shared memory, MCP integrations, and development rules. Use it in engineering work at Garanti BBVA Technology.', tags: ['AI agents', 'MCP', 'Shared memory'] },
      { company: 'Ford Otosan', title: 'Ford Otosan application modernization', description: 'Migrated a widely used internal ASP.NET WebForms application from .NET 3.5 to .NET Framework 4.8 and developed shared .NET Core components for application teams.', tags: ['.NET', 'Modernization', 'Shared components'] },
    ],
  },
  de: {
    eyebrow: 'SOFTWAREENTWICKLER / BURSA',
    headline: 'Softwareentwickler, der komplexe Probleme in zuverlässige Systeme übersetzt.',
    highlights: [
      { value: '30M+', label: 'Sensible Datensätze', detail: 'Zu einer Batch-Anwendung beigetragen, die bei einer Migration mit zwei Algorithmen über 30 Millionen Datensätze neu verschlüsselte.' },
      { value: 'Gemeinsam', label: 'Sicherheitsinfrastruktur', detail: 'Eine hCaptcha-Bibliothek für Virtual POS und GarantiPay entwickelt, die ein anderes Team unverändert übernommen hat, sowie Rate Limiting für mehrere Produktionsprojekte.' },
      { value: 'Kafka', label: 'Expertise auf Divisionsebene', detail: 'Als Kafka-Fachexperte auf Divisionsebene tätig; Kafka in die Transaktionsverarbeitung von GarantiPay 2.0 integriert.' },
    ],
    cases: [
      { company: 'Garanti BBVA Technology', title: '3D-Secure-Zahlungsplattform', description: '3D Model neben 3D_PAY ergänzt und Authentifizierungsabläufe auf Bank- und Händlerseite angepasst.', tags: ['3D Secure', 'Zahlungen', 'Integration'] },
      { company: 'Garanti BBVA Technology', title: 'Gemeinsames KI-Entwicklungstoolkit', description: 'Ein wiederverwendbares Toolkit für verschiedene IDEs und Umgebungen mit eigenen Agenten, gemeinsamem Speicher, MCP-Integrationen und Entwicklungsregeln entwickelt. Auch bei Garanti BBVA Technology im Einsatz.', tags: ['KI-Agenten', 'MCP', 'Gemeinsamer Speicher'] },
      { company: 'Ford Otosan', title: 'Modernisierung bei Ford Otosan', description: 'Eine häufig genutzte interne ASP.NET-WebForms-Anwendung von .NET 3.5 auf .NET Framework 4.8 migriert und gemeinsame .NET-Core-Komponenten für Anwendungsteams entwickelt.', tags: ['.NET', 'Modernisierung', 'Gemeinsame Komponenten'] },
    ],
  },
};
