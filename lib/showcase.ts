import type { Locale } from './commands';

type Showcase = {
  eyebrow: string;
  headline: string;
  highlights: { value: string; label: string; detail: string }[];
  cases: { title: string; description: string; tags: string[] }[];
};

// Claims and figures are drawn from the supplied résumé (public/resume.pdf).
export const showcase: Record<Locale, Showcase> = {
  tr: {
    eyebrow: 'YAZILIM MÜHENDİSİ / BURSA',
    headline: 'Karmaşık problemleri güvenilir sistemlere dönüştüren bir yazılım mühendisiyim.',
    highlights: [
      { value: '30M+', label: 'Hassas kayıt', detail: 'Çift algoritmalı geçişte 30 milyondan fazla kaydın yeniden şifrelenmesini sağlayan toplu işleme uygulamasına katkı verdim.' },
      { value: 'Ortak', label: 'Hız sınırlama', detail: 'Önbellekli ve önbelleksiz ortamlarda çalışan, birden fazla üretim projesinde kullanılan ortak bir yapı geliştirdim.' },
      { value: 'Kafka', label: 'Olay odaklı ödeme', detail: 'GarantiPay 2.0 işlem akışlarına Apache Kafka hatları entegre ettim.' },
    ],
    cases: [
      { title: '3D Secure ödeme geçidi', description: '3D_PAY modelinin yanında 3D Model desteği ekleyerek banka ve üye iş yeri kimlik doğrulama akışlarını uyarladım.', tags: ['3D Secure', 'Ödeme sistemleri', 'Entegrasyon'] },
      { title: 'Ford Otosan uygulama modernizasyonu', description: 'Yaygın kullanılan kurum içi ASP.NET WebForms uygulamasını .NET 3.5’ten .NET Framework 4.8’e taşıdım ve ekiplerin kullandığı ortak .NET Core bileşenleri geliştirdim.', tags: ['.NET', 'Modernizasyon', 'Ortak bileşenler'] },
    ],
  },
  en: {
    eyebrow: 'SOFTWARE ENGINEER / BURSA',
    headline: 'A software engineer turning complex problems into resilient systems.',
    highlights: [
      { value: '30M+', label: 'Sensitive records', detail: 'Contributed to the batch application that re-encrypted over 30 million records during a dual-algorithm migration.' },
      { value: 'Shared', label: 'Rate limiting', detail: 'Built a reusable structure for cached and cacheless environments, adopted across multiple production projects.' },
      { value: 'Kafka', label: 'Event-driven payments', detail: 'Integrated Apache Kafka pipelines into GarantiPay 2.0 transaction processing.' },
    ],
    cases: [
      { title: '3D Secure payment gateway', description: 'Added 3D Model support alongside 3D_PAY and adapted bank-side and merchant-integrated authentication flows.', tags: ['3D Secure', 'Payments', 'Integration'] },
      { title: 'Ford Otosan application modernization', description: 'Migrated a widely used internal ASP.NET WebForms application from .NET 3.5 to .NET Framework 4.8 and developed shared .NET Core components for application teams.', tags: ['.NET', 'Modernization', 'Shared components'] },
    ],
  },
  de: {
    eyebrow: 'SOFTWAREENTWICKLER / BURSA',
    headline: 'Softwareentwickler, der komplexe Probleme in zuverlässige Systeme übersetzt.',
    highlights: [
      { value: '30M+', label: 'Sensible Datensätze', detail: 'Zu einer Batch-Anwendung beigetragen, die bei einer Migration mit zwei Algorithmen über 30 Millionen Datensätze neu verschlüsselte.' },
      { value: 'Gemeinsam', label: 'Rate Limiting', detail: 'Eine wiederverwendbare Struktur für Umgebungen mit und ohne Cache entwickelt, die in mehreren Produktionsprojekten eingesetzt wird.' },
      { value: 'Kafka', label: 'Ereignisgesteuerte Zahlungen', detail: 'Apache-Kafka-Pipelines in die Transaktionsverarbeitung von GarantiPay 2.0 integriert.' },
    ],
    cases: [
      { title: '3D-Secure-Zahlungsplattform', description: '3D Model neben 3D_PAY ergänzt und Authentifizierungsabläufe auf Bank- und Händlerseite angepasst.', tags: ['3D Secure', 'Zahlungen', 'Integration'] },
      { title: 'Modernisierung bei Ford Otosan', description: 'Eine häufig genutzte interne ASP.NET-WebForms-Anwendung von .NET 3.5 auf .NET Framework 4.8 migriert und gemeinsame .NET-Core-Komponenten für Anwendungsteams entwickelt.', tags: ['.NET', 'Modernisierung', 'Gemeinsame Komponenten'] },
    ],
  },
};
