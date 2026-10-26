import type { Locale } from './commands';
export { certificates } from './credentials';

// Sources: public/resume.pdf and professional updates supplied on 2026-10-27.
export const skills = {
  'Languages': 'Java, C#, SQL, PL/SQL, JavaScript, TypeScript',
  'Backend & Architecture': 'Spring Boot, Spring, .NET, .NET Core, Apache Kafka, Distributed Systems, Event-Driven Architecture, Microservices, REST APIs, gRPC, Concurrency, Aspect-Oriented Programming, Unit Testing',
  'Databases & Platforms': 'MySQL, MongoDB, Elastic Stack, JBoss EAP',
  'Application Security': 'Secure Coding, Business Logic Security, PCI DSS, Authentication, Encryption, Rate Limiting, hCaptcha',
  'AI-Assisted Engineering': 'Custom AI Agents, Model Context Protocol (MCP), Shared Agent Memory, Cross-IDE Development Tooling, Context & Token Optimization, Claude Digital Worker',
  'Frontend': 'React, Angular, Next.js, HTML, CSS, Bootstrap, jQuery',
};
export const tools = 'Git, Azure DevOps, Toad, Bitbucket, Jenkins, JFrog, SonarQube, AttackFlow, Fortify, Dynatrace';
export const projectLinks = [
  { label: 'VPatient Mobile Application', href: 'https://github.com/VPatient/VPatient' },
  { label: 'VPatient API', href: 'https://github.com/VPatient/VPatientAPI' },
  { label: 'VPatient Demonstration', href: 'https://www.youtube.com/watch?v=PwAyxUButPc' },
];

type Biography = {
  intro: string; about: string; educationLabel: string; education: string; community: string;
  languagesLabel: string; languages: string; toolsLabel: string; certificatesLabel: string;
  awardsLabel: string; award: string; pdfLabel: string; resumeNote: string;
  virtualPatient: string; qualityPool: string; projectsIntro: string; githubIntro: string;
  statsIntro: string; statsLabels: { employers: string; certificates: string; projects: string; gpa: string };
  moreExperience: string; projectTags: { virtualPatient: string[]; qualityPool: string[] };
  experience: { company: string; role: string; period: string; location: string; details: string[] }[];
};

export const biography: Record<Locale, Biography> = {
  tr: {
    intro: 'Java, Spring Boot ve Apache Kafka ile güvenli ödeme sistemleri ve olay odaklı uygulamalar geliştiren bir yazılım mühendisiyim.',
    about: 'Karmaşık problemleri çözmeyi, büyük kod tabanlarını iyileştirmeyi ve diğer ekiplerin de kullanabileceği ortak araçlar geliştirmeyi seviyorum. Geliştirme çalışmalarımın yanında division düzeyinde Kafka uzmanlığı ve AI destekli yazılım güvenliği inisiyatiflerine katkı veriyor, günlük mühendislik çalışmalarını destekleyen ortak AI agent araçları geliştiriyorum.',
    educationLabel: 'Eğitim',
    education: 'Eskişehir Teknik Üniversitesi · Bilgisayar Mühendisliği Lisans · 09/2019 – 06/2023 · GPA: 3.70 · Bölüm birinciliği',
    community: 'Eskişehir Teknik Üniversitesi Yazılım Topluluğu kurucularından ve teknik lideri.',
    languagesLabel: 'Diller', languages: 'Türkçe: ana dil · İngilizce: iki dillilik düzeyi · Almanca: temel düzey',
    toolsLabel: 'Araçlar', certificatesLabel: 'Sertifikalar',
    awardsLabel: 'Ödüller', award: 'OBSS Code Master 2021 · İlk aşama ikinciliği',
    pdfLabel: 'CV indir (PDF, İngilizce)', resumeNote: 'Güncel profilimi, deneyimlerimi ve becerilerimi aşağıda bulabilirsin. İngilizce özgeçmişim PDF olarak da indirilebilir.',
    virtualPatient: 'Eskişehir Osmangazi Üniversitesi Hemşirelik Bölümü öğretim üyeleriyle geliştirilen, hemşirelik öğrencilerine hasta bakımı pratiği kazandırmayı amaçlayan mobil uygulama.',
    qualityPool: 'Ford Otosan iş birliğiyle TÜBİTAK 2209-B kapsamında geliştirilen bitirme projesi. Otomotiv garanti ve kalite süreçleri için yönetim, sınıflandırma ve çözüm öneri platformu; Flask API ve ayarlanmış Random Forest Classifier ile üretim hatalarına çözüm önerileri sunar.',
    projectsIntro: 'Otomotivde kalite yönetimi, sağlıkta uygulamalı eğitim. Gerçek ihtiyaçlar için geliştirilen iki proje.',
    githubIntro: 'Ürettiklerime ve paylaştıklarıma kod tarafından bir bakış.',
    statsIntro: 'Aşağıdaki sayılar özgeçmişimdeki bilgilerden alınmıştır.',
    statsLabels: { employers: 'Çalışılan kurum', certificates: 'Sertifika', projects: 'CV projesi', gpa: 'Lisans not ortalaması' },
    moreExperience: 'Diğer çalışmalar',
    projectTags: { virtualPatient: ['Mobil uygulama', 'Hemşirelik eğitimi'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Yazılım Mühendisi', period: '06/2023 – Günümüz', location: 'Uzaktan, Türkiye', details: [
        'Ödeme mimarisi ve entegrasyonlar: Ödeme geçidine 3D_PAY yanında 3D Model desteği ekledim. Payment Facilitator ortak altyapısına katkı verdim ve bu mimariyle bir banka entegrasyonunu tamamladım.',
        'Uygulama güvenliği: Sanal POS ve ödeme uygulamalarındaki kritik açıkların ve iş mantığı güvenlik risklerinin giderilmesinde çalışıyor, PCI DSS uyumunu destekleyen güvenli geliştirme ve veri koruma önlemleri uyguluyorum.',
        'Büyük ölçekli şifreleme geçişi: Eski ve yeni şifreleme standartlarını destekleyen çift algoritmalı adaptör tasarladım. 30 milyondan fazla hassas kaydın yeniden şifrelenmesine katkı verdim ve üretim sürüm süreçlerini yürüttüm.',
        'Ortak hCaptcha altyapısı: Sanal POS, GarantiPay ve diğer uygulamalar için yeniden kullanılabilir bir entegrasyon kütüphanesi geliştirdim; başka bir ekip de aynı yapıyı değiştirmeden kullandı.',
        'Ortak hız sınırlama: Önbellekli ve önbelleksiz ortamlarda çalışan, birden fazla üretim projesinde kullanılan bir hız sınırlama yapısı tasarlayıp geliştirdim.',
        'Token yönetimi ve eşzamanlılık: AtomicReference, double-checked locking, önbellek, AOP tabanlı yenileme ve tekrar denemelerle eşzamanlı kullanıma güvenli token yaşam döngüsü geliştirdim. Yoğun ödeme akışlarında istek kaybına yol açan yarış koşullarını giderdim.',
        'Apache Kafka uzmanlığı: Division düzeyinde Kafka konu uzmanı olarak görev alıyorum. Servisleri ayrıştırmak ve güvenilirliği artırmak için GarantiPay 2.0 işlem akışlarına Kafka entegre ettim.',
        'Kurumsal inisiyatifler: Konfigürasyon yönetimi standardizasyonu ve yönetişiminde birimimi temsil ettim. Division genelinde AI destekli yazılım güvenliği değerlendirmelerine odaklanan bir inisiyatife katkı veriyorum.',
        'Ortak AI geliştirme araçları: Farklı IDE ve ortamlarda kullanılabilen; özel agentlar, ortak bellek, MCP entegrasyonları, araçlar ve geliştirme kurallarını bir araya getiren bir paket geliştirdim. Bu yapıyı Garanti BBVA Technology içindeki çalışmalarımda da kullanıyorum.',
        'AI destekli geliştirme: Ortak araç paketinden ayrı olarak takımımızın Claude tabanlı digital worker’ıyla geliştirme yapıyorum. AI iş akışlarında bağlam ve token optimizasyonu uyguluyorum.',
        'Platform modernizasyonu: Büyük ödeme uygulamalarında kapsamlı refactoring çalışmalarına, JBoss 8 ve JDK 21 yükseltmelerine katkı veriyorum.',
        'Mobil kimlik doğrulama: ACS akışlarında iOS ve Android için WebOTP ve SMS AutoFill desteği geliştirdim.',
      ] },
      { company: 'Ford Otosan', role: 'Yazılım Geliştirici', period: '10/2021 – 06/2023', location: 'Eskişehir, Türkiye', details: [
        'Yaygın kullanılan kurum içi ASP.NET WebForms uygulamasını .NET 3.5’ten .NET Framework 4.8’e taşıdım.',
        'Farklı uygulama ekiplerinin kullandığı .NET Core çerçeve kütüphaneleri ve ortak bileşenler geliştirdim.',
        'Eskişehir fabrikası ağırlıklı olmak üzere üretim ve Üretimin Uygunluğu (CoP) yönetim sistemlerini analizden yayına kadar geliştirdim.',
        'Quality Pool platformunu birlikte geliştirdim; Flask API ve Random Forest Classifier ile kalite sorunlarına otomatik çözüm önerileri sundum.',
      ] },
      { company: 'Baykar Technology', role: 'Yazılım Mühendisliği Stajyeri', period: '08/2021 – 09/2021', location: 'İstanbul, Türkiye', details: [
        'SİHA sistemlerinin Yer Kontrol Birimleri için ilk kurulum ve doğrulama süreçlerini otomatikleştiren .NET masaüstü uygulaması geliştirdim.',
        'Çalışma zamanları, profiller ve konfigürasyon kurulumlarını otomatikleştirerek insan hatasını ve manuel iş yükünü azalttım.',
      ] },
    ],
  },
  en: {
    intro: 'Software Engineer experienced in building secure payment systems and event-driven applications with Java, Spring Boot, and Apache Kafka.',
    about: 'I enjoy solving complex problems, improving large codebases, and building shared tools that other teams can use. Alongside hands-on development, I contribute to division-level Kafka and AI-assisted security initiatives and build reusable AI agent tooling to support everyday engineering work.',
    educationLabel: 'Education',
    education: 'Eskişehir Technical University · Bachelor’s Degree in Computer Engineering · 09/2019 – 06/2023 · GPA: 3.70 · First in the department',
    community: 'Technical Lead and co-founder of Eskişehir Technical University Software Community.',
    languagesLabel: 'Languages', languages: 'Turkish: native · English: bilingual proficiency · German: elementary proficiency',
    toolsLabel: 'Tools', certificatesLabel: 'Certificates',
    awardsLabel: 'Awards', award: 'OBSS Code Master 2021 · Second place in the first stage',
    pdfLabel: 'Download résumé (PDF, English)', resumeNote: 'Explore my current profile, experience, and skills below. My English résumé is also available as a PDF.',
    virtualPatient: 'A mobile application developed with faculty members of the Nursing Department at Eskişehir Osmangazi University to give nursing students practical experience in patient care.',
    qualityPool: 'A TÜBİTAK 2209-B graduation project in cooperation with Ford Otosan. A management, classification and solution recommendation platform for automotive warranty and quality processes, using a Flask API and a tuned Random Forest Classifier to recommend solutions for manufacturing defects.',
    projectsIntro: 'Quality management in automotive. Practical learning in healthcare. Two projects built around real needs.',
    githubIntro: 'A closer look at what I build and share.',
    statsIntro: 'These figures come from my résumé.',
    statsLabels: { employers: 'Organizations', certificates: 'Certificates', projects: 'Résumé projects', gpa: 'Undergraduate GPA' },
    moreExperience: 'More work',
    projectTags: { virtualPatient: ['Mobile app', 'Nursing education'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Software Engineer', period: '06/2023 – Present', location: 'Remote, Türkiye', details: [
        'Payment Architecture & Integrations: Re-engineered the payment gateway to support 3D Model alongside 3D_PAY. Contributed to shared Payment Facilitator infrastructure and delivered a bank integration using this architecture.',
        'Application Security: Address critical vulnerabilities and business logic security risks across Virtual POS and other payment applications, implementing secure coding and data protection measures to support PCI DSS compliance.',
        'Large-Scale Encryption Migration: Designed a dual-algorithm adapter supporting legacy and new encryption standards. Contributed to batch processing that re-encrypted over 30 million sensitive records and managed production deployment and releases.',
        'Shared hCaptcha Infrastructure: Developed a reusable integration library for Virtual POS, GarantiPay, and other applications, subsequently adopted by another team without modification.',
        'Reusable Rate Limiting: Designed and implemented a shared framework supporting cache-based and cacheless environments, adopted across multiple production projects.',
        'Token Management & Concurrency: Built thread-safe token management with AtomicReference, double-checked locking, caching, AOP-driven renewal, and retries. Resolved race conditions in high-traffic payment processing to prevent request loss.',
        'Apache Kafka Expertise: Serve as a division-level subject matter expert. Integrated Kafka into GarantiPay 2.0 transaction processing to decouple services and improve reliability.',
        'Organizational Initiatives: Represented the unit in configuration management standardization and governance. Contribute to a division-wide initiative focused on AI-assisted software security assessment and review.',
        'Shared AI Development Toolkit: Built a reusable toolkit across IDEs and development environments, combining custom agents, shared memory, MCP integrations, tools, and development rules. Use it in engineering work at Garanti BBVA Technology.',
        'AI-Assisted Delivery: Actively develop with the team’s Claude-based digital worker, separately from the shared toolkit. Apply context and token optimization practices across AI workflows.',
        'Platform Modernization: Contribute to major refactoring efforts and JBoss 8 and JDK 21 upgrades across large enterprise payment codebases.',
        'Mobile Authentication: Implemented WebOTP and SMS AutoFill support in ACS flows for iOS and Android.',
      ] },
      { company: 'Ford Otosan', role: 'Software Developer', period: '10/2021 – 06/2023', location: 'Eskişehir, Türkiye', details: [
        'Migrated a widely used internal ASP.NET WebForms application from .NET 3.5 to .NET Framework 4.8.',
        'Developed .NET Core framework libraries and shared components adopted by multiple application teams.',
        'Developed production and Conformity of Production (CoP) management systems from analysis to deployment, primarily for the Eskişehir plant.',
        'Co-developed Quality Pool with a Flask API and a tuned Random Forest Classifier for automated quality issue solution recommendations.',
      ] },
      { company: 'Baykar Technology', role: 'Software Engineering Intern', period: '08/2021 – 09/2021', location: 'İstanbul, Türkiye', details: [
        'Built a .NET desktop application to automate setup, installation and verification of Ground Control Units for UCAV systems.',
        'Automated runtime, profile and configuration installation to reduce human error and manual operational workload.',
      ] },
    ],
  },
  de: {
    intro: 'Ich entwickle sichere Zahlungssysteme und ereignisgesteuerte Anwendungen mit Java, Spring Boot und Apache Kafka.',
    about: 'Ich löse gerne komplexe Probleme, verbessere große Codebasen und entwickle gemeinsame Werkzeuge für andere Teams. Neben der praktischen Entwicklung bringe ich mich auf Divisionsebene als Kafka-Fachexperte und in Initiativen für KI-gestützte Softwaresicherheit ein. Außerdem entwickle ich wiederverwendbare KI-Agentenwerkzeuge für den Entwicklungsalltag.',
    educationLabel: 'Ausbildung',
    education: 'Eskişehir Technical University · Bachelor in Computer Engineering · 09/2019 – 06/2023 · GPA: 3.70 · Jahrgangsbester des Fachbereichs',
    community: 'Technischer Leiter und Mitgründer der Software Community der Eskişehir Technical University.',
    languagesLabel: 'Sprachen', languages: 'Türkisch: Muttersprache · Englisch: zweisprachige Kompetenz · Deutsch: Grundkenntnisse',
    toolsLabel: 'Werkzeuge', certificatesLabel: 'Zertifikate',
    awardsLabel: 'Auszeichnungen', award: 'OBSS Code Master 2021 · Zweiter Platz in der ersten Runde',
    pdfLabel: 'Lebenslauf herunterladen (PDF, Englisch)', resumeNote: 'Hier findest du mein aktuelles Profil, meine Erfahrung und meine Kenntnisse. Mein englischer Lebenslauf ist auch als PDF verfügbar.',
    virtualPatient: 'Eine mobile Anwendung, entwickelt mit Lehrenden des Fachbereichs Pflege der Eskişehir Osmangazi University, um Pflegestudierenden praktische Erfahrungen in der Patientenversorgung zu ermöglichen.',
    qualityPool: 'Ein TÜBİTAK-2209-B-Abschlussprojekt in Zusammenarbeit mit Ford Otosan. Eine Plattform zur Verwaltung, Klassifizierung und Lösungsempfehlung für Garantie- und Qualitätsprozesse in der Automobilindustrie, mit einer Flask-API und einem abgestimmten Random Forest Classifier für Fertigungsfehler.',
    projectsIntro: 'Qualitätsmanagement in der Automobilindustrie. Praktisches Lernen in der Pflege. Zwei Projekte für konkrete Anforderungen.',
    githubIntro: 'Ein Blick auf den Code, den ich entwickle und teile.',
    statsIntro: 'Diese Zahlen stammen aus meinem Lebenslauf.',
    statsLabels: { employers: 'Organisationen', certificates: 'Zertifikate', projects: 'Lebenslaufprojekte', gpa: 'Studiennotendurchschnitt' },
    moreExperience: 'Weitere Arbeiten',
    projectTags: { virtualPatient: ['Mobile App', 'Pflegeausbildung'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Softwareentwickler', period: '06/2023 – heute', location: 'Remote, Türkiye', details: [
        'Zahlungsarchitektur und Integrationen: Das Gateway um 3D Model neben 3D_PAY erweitert. Zur gemeinsamen Payment-Facilitator-Infrastruktur beigetragen und damit eine Bankintegration umgesetzt.',
        'Anwendungssicherheit: Kritische Schwachstellen und Geschäftslogikrisiken in Virtual POS und Zahlungsanwendungen beheben und sichere Entwicklung sowie Datenschutzmaßnahmen zur Unterstützung der PCI-DSS-Konformität umsetzen.',
        'Verschlüsselungsmigration: Einen Adapter für alte und neue Verschlüsselungsstandards entworfen. Zur erneuten Verschlüsselung von über 30 Millionen sensiblen Datensätzen beigetragen und Produktionsreleases verantwortet.',
        'Gemeinsame hCaptcha-Infrastruktur: Eine wiederverwendbare Integrationsbibliothek für Virtual POS, GarantiPay und weitere Anwendungen entwickelt, die ein anderes Team unverändert übernommen hat.',
        'Wiederverwendbares Rate Limiting: Ein gemeinsames Framework für Umgebungen mit und ohne Cache entwickelt, das in mehreren Produktionsprojekten eingesetzt wird.',
        'Token-Verwaltung und Nebenläufigkeit: Eine threadsichere Token-Verwaltung mit AtomicReference, Double-checked Locking, Caching, AOP-basierter Erneuerung und Wiederholungsversuchen entwickelt. Race Conditions behoben, um Anfrageverluste bei hoher Last zu verhindern.',
        'Apache-Kafka-Expertise: Als Fachexperte auf Divisionsebene tätig. Kafka in GarantiPay 2.0 integriert, um Dienste zu entkoppeln und die Zuverlässigkeit zu verbessern.',
        'Organisationsweite Initiativen: Die Einheit bei Standardisierung und Governance des Konfigurationsmanagements vertreten. An einer divisionsweiten Initiative für KI-gestützte Softwaresicherheitsbewertungen mitwirken.',
        'Gemeinsames KI-Entwicklungstoolkit: Ein wiederverwendbares Toolkit für verschiedene IDEs und Umgebungen mit eigenen Agenten, gemeinsamem Speicher, MCP-Integrationen, Werkzeugen und Entwicklungsregeln entwickelt. Auch bei Garanti BBVA Technology im Einsatz.',
        'KI-gestützte Entwicklung: Zusätzlich zum gemeinsamen Toolkit mit dem Claude-basierten Digital Worker des Teams entwickeln. Kontext- und Token-Optimierung in KI-Arbeitsabläufen anwenden.',
        'Plattformmodernisierung: Zu umfangreichen Refactorings sowie JBoss-8- und JDK-21-Upgrades in großen Codebasen für Zahlungsanwendungen beitragen.',
        'Mobile Authentifizierung: WebOTP und SMS AutoFill in ACS-Abläufe für iOS und Android integriert.',
      ] },
      { company: 'Ford Otosan', role: 'Softwareentwickler', period: '10/2021 – 06/2023', location: 'Eskişehir, Türkiye', details: [
        'Eine häufig genutzte interne ASP.NET-WebForms-Anwendung von .NET 3.5 auf .NET Framework 4.8 migriert.',
        '.NET-Core-Frameworkbibliotheken und gemeinsame Komponenten für mehrere Anwendungsteams entwickelt.',
        'Produktions- und CoP-Verwaltungssysteme von der Analyse bis zur Bereitstellung entwickelt, hauptsächlich für das Werk Eskişehir.',
        'Quality Pool mit einer Flask-API und einem abgestimmten Random Forest Classifier für automatische Lösungsempfehlungen bei Qualitätsproblemen mitentwickelt.',
      ] },
      { company: 'Baykar Technology', role: 'Praktikant in der Softwareentwicklung', period: '08/2021 – 09/2021', location: 'İstanbul, Türkiye', details: [
        'Eine .NET-Desktopanwendung zur automatischen Einrichtung, Installation und Prüfung von Bodenkontrolleinheiten für UCAV-Systeme entwickelt.',
        'Die Installation von Laufzeitumgebungen, Profilen und Konfigurationen automatisiert, um menschliche Fehler und manuellen Aufwand zu reduzieren.',
      ] },
    ],
  },
};
