import type { Locale } from './commands';
export { certificates } from './credentials';

// Source: resume.pdf supplied on 2026-09-07. Summaries preserve its dates and claims.
export const skills = {
  'Front-end': 'HTML, CSS, JavaScript, TypeScript, React, Angular, Next, Bootstrap, jQuery',
  'Back-end': 'Spring, Spring Boot, .NET, .NET Core, PL/SQL, MySQL, MongoDB, Aspect Oriented Programming, RESTful & gRPC APIs, Microservices, Unit Testing, Elastic Stack, Apache Kafka',
};
export const tools = 'Git, Azure DevOps, Toad, Bitbucket, Jenkins, JFrog, SonarQube, AttackFlow, Fortify, Dynatrace';
export const projectLinks = [
  { label: 'VPatient Mobile Application', href: 'https://github.com/VPatient/VPatient' },
  { label: 'VPatient API', href: 'https://github.com/VPatient/VPatientAPI' },
  { label: 'VPatient Demonstration', href: 'https://www.youtube.com/watch?v=PwAyxUButPc' },
];

type Biography = {
  intro: string; about: string; educationLabel: string; education: string; community: string;
  languagesLabel: string; languages: string; toolsLabel: string; interpersonalLabel: string;
  interpersonal: string; otherLabel: string; other: string; certificatesLabel: string;
  awardsLabel: string; award: string; pdfLabel: string; resumeNote: string;
  virtualPatient: string; qualityPool: string; projectsIntro: string; githubIntro: string;
  statsIntro: string; statsLabels: { employers: string; certificates: string; projects: string; gpa: string };
  moreExperience: string; projectTags: { virtualPatient: string[]; qualityPool: string[] };
  experience: { company: string; role: string; period: string; location: string; details: string[] }[];
};

export const biography: Record<Locale, Biography> = {
  tr: {
    intro: 'Olay odaklı dağıtık sistemler, güvenli ödemeler ve üretim operasyonları için yazılımlar üzerinde çalışan bir yazılım mühendisiyim.',
    about: 'Eşzamanlı kullanıma güvenli bir token yaşam döngüsü tasarladım; 30 milyondan fazla hassas kaydın yeniden şifrelenmesine katkı verdim. Hata toleransına, güvenli geliştirmeye ve ekipler arası açık iletişime önem veriyorum.',
    educationLabel: 'Eğitim',
    education: 'Eskişehir Teknik Üniversitesi · Bilgisayar Mühendisliği Lisans · 09/2019 – 06/2023 · GPA: 3.70 · Bölüm birinciliği',
    community: 'Eskişehir Teknik Üniversitesi Yazılım Topluluğu kurucularından ve teknik lideri.',
    languagesLabel: 'Diller', languages: 'Türkçe: ana dil · İngilizce: iki dillilik düzeyi · Almanca: temel düzey',
    toolsLabel: 'Araçlar', interpersonalLabel: 'Kişiler arası beceriler',
    interpersonal: 'İletişim, takım çalışması, organizasyon, eleştirel düşünme, dakiklik, problem çözme',
    otherLabel: 'Diğer', other: 'Rekabetçi programlama', certificatesLabel: 'Sertifikalar',
    awardsLabel: 'Ödüller', award: 'OBSS Code Master 2021 · İlk aşama ikinciliği',
    pdfLabel: 'CV indir (PDF, İngilizce)', resumeNote: 'Aşağıdaki bilgiler İngilizce özgeçmişin özetidir. Tam belgeyi PDF olarak indirebilirsin.',
    virtualPatient: 'Eskişehir Osmangazi Üniversitesi Hemşirelik Bölümü öğretim üyeleriyle geliştirilen, hemşirelik öğrencilerine hasta bakımı pratiği kazandırmayı amaçlayan mobil uygulama.',
    qualityPool: 'Ford Otosan iş birliğiyle TÜBİTAK 2209-B kapsamında geliştirilen bitirme projesi. Otomotiv garanti ve kalite süreçleri için yönetim, sınıflandırma ve çözüm öneri platformu; Flask API ve ayarlanmış Random Forest Classifier ile üretim hatalarına çözüm önerileri sunar.',
    projectsIntro: 'Otomotivde kalite yönetimi, sağlıkta uygulamalı eğitim. Gerçek ihtiyaçlar için geliştirilen iki proje.',
    githubIntro: 'Ürettiklerime ve paylaştıklarıma kod tarafından bir bakış.',
    statsIntro: 'Aşağıdaki sayılar özgeçmişimdeki bilgilerden alınmıştır.',
    statsLabels: { employers: 'Çalışılan kurum', certificates: 'Sertifika', projects: 'CV projesi', gpa: 'Lisans not ortalaması' },
    moreExperience: 'Diğer çalışmalar',
    projectTags: { virtualPatient: ['Mobil uygulama', 'Hemşirelik eğitimi'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Yazılım Mühendisi', period: '06/2023', location: 'Uzaktan, Türkiye', details: [
        'Ödeme geçidi altyapısına mevcut 3D_PAY modelinin yanında 3D Model desteği ekledim; banka ve üye iş yeri kimlik doğrulama akışlarını uyarladım.',
        'Önbellekli ve önbelleksiz ortamlarda çalışan, birden fazla üretim projesinde kullanılan ortak hız sınırlama yapısını tasarlayıp geliştirdim.',
        'XSS, CRLF ve SQL Injection önlemlerinin yanında iş mantığı güvenlik katmanları ve PCI-DSS uyumlu veri işleme uyguladım.',
        'Konfigürasyon yönetiminde birim temsilcisi olarak görev aldım; güvenlik ve gençlere yönelik bankacılık girişimlerine katıldım.',
        'Kriptografik geçiş için çift algoritmalı adaptör tasarladım; 30 milyondan fazla hassas kaydın yeniden şifrelenmesini sağlayan toplu işleme uygulamasına katkı verdim ve üretim sürüm süreçlerini yürüttüm.',
        'Double-checked locking, AtomicReference, süre sonu politikaları ve AOP tabanlı yenilemeyle eşzamanlı kullanıma güvenli, yüksek erişilebilirlikli token yaşam döngüsü geliştirdim.',
        'Payment Facilitator ortak altyapısına katkı verdim ve bu mimariyle bir banka entegrasyonunu tamamladım.',
        '2 ms altındaki yoğun işlem aralıklarında istek kaybına yol açan nadir yarış koşullarını giderdim.',
        'ACS kimlik doğrulama akışına WebOTP ve SMS AutoFill desteği ekledim.',
        'GarantiPay 2.0 işlem akışlarına Apache Kafka hatları entegre ettim.',
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
    intro: 'I am a software engineer working across event-driven distributed systems, secure payments, and software for manufacturing operations.',
    about: 'I designed a thread-safe token lifecycle and contributed to re-encrypting more than 30 million sensitive records. I value fault tolerance, secure engineering, and clear communication across teams.',
    educationLabel: 'Education',
    education: 'Eskişehir Technical University · Bachelor’s Degree in Computer Engineering · 09/2019 – 06/2023 · GPA: 3.70 · First in the department',
    community: 'Technical Lead and co-founder of Eskişehir Technical University Software Community.',
    languagesLabel: 'Languages', languages: 'Turkish: native · English: bilingual proficiency · German: elementary proficiency',
    toolsLabel: 'Tools', interpersonalLabel: 'Interpersonal skills',
    interpersonal: 'Communication, teamwork, organization, critical thinking, punctuality, problem solving',
    otherLabel: 'Other', other: 'Competitive programming', certificatesLabel: 'Certificates',
    awardsLabel: 'Awards', award: 'OBSS Code Master 2021 · Second place in the first stage',
    pdfLabel: 'Download résumé (PDF, English)', resumeNote: 'The information below summarizes the English résumé. Download the PDF for the complete document.',
    virtualPatient: 'A mobile application developed with faculty members of the Nursing Department at Eskişehir Osmangazi University to give nursing students practical experience in patient care.',
    qualityPool: 'A TÜBİTAK 2209-B graduation project in cooperation with Ford Otosan. A management, classification and solution recommendation platform for automotive warranty and quality processes, using a Flask API and a tuned Random Forest Classifier to recommend solutions for manufacturing defects.',
    projectsIntro: 'Quality management in automotive. Practical learning in healthcare. Two projects built around real needs.',
    githubIntro: 'A closer look at what I build and share.',
    statsIntro: 'These figures come from my résumé.',
    statsLabels: { employers: 'Organizations', certificates: 'Certificates', projects: 'Résumé projects', gpa: 'Undergraduate GPA' },
    moreExperience: 'More work',
    projectTags: { virtualPatient: ['Mobile app', 'Nursing education'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Software Engineer', period: '06/2023', location: 'Remote, Türkiye', details: [
        'Re-engineered the payment gateway to support 3D Model alongside 3D_PAY, adapting bank-side and merchant-integrated authentication flows.',
        'Designed and implemented a reusable rate limiting framework for cached and cacheless environments, adopted across multiple production projects.',
        'Implemented business logic security layers alongside XSS, CRLF and SQL Injection defenses and PCI-DSS-compliant data handling.',
        'Served as Unit Representative for configuration management and participated in security and youth banking initiatives.',
        'Designed a dual-algorithm adapter for a cryptographic migration, contributed to batch re-encryption of over 30 million sensitive records, and drove production release management.',
        'Built a thread-safe, highly available token lifecycle using double-checked locking, AtomicReference, expiry policies and AOP-driven renewals.',
        'Contributed to shared Payment Facilitator infrastructure and delivered a full bank integration using it.',
        'Resolved rare race conditions causing request loss during sub-2ms high-traffic processing windows.',
        'Added WebOTP and SMS AutoFill support to ACS authentication flows.',
        'Integrated Apache Kafka pipelines into GarantiPay 2.0 transaction processing.',
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
    intro: 'Ich arbeite als Softwareentwickler an ereignisgesteuerten verteilten Systemen, sicheren Zahlungen und Software für Fertigungsabläufe.',
    about: 'Ich habe einen threadsicheren Token-Lebenszyklus entwickelt und zur erneuten Verschlüsselung von über 30 Millionen sensiblen Datensätzen beigetragen. Fehlertoleranz, sichere Entwicklung und klare Kommunikation zwischen Teams prägen meine Arbeit.',
    educationLabel: 'Ausbildung',
    education: 'Eskişehir Technical University · Bachelor in Computer Engineering · 09/2019 – 06/2023 · GPA: 3.70 · Jahrgangsbester des Fachbereichs',
    community: 'Technischer Leiter und Mitgründer der Software Community der Eskişehir Technical University.',
    languagesLabel: 'Sprachen', languages: 'Türkisch: Muttersprache · Englisch: zweisprachige Kompetenz · Deutsch: Grundkenntnisse',
    toolsLabel: 'Werkzeuge', interpersonalLabel: 'Soziale Kompetenzen',
    interpersonal: 'Kommunikation, Teamarbeit, Organisation, kritisches Denken, Pünktlichkeit, Problemlösung',
    otherLabel: 'Weitere Kenntnisse', other: 'Wettbewerbsprogrammierung', certificatesLabel: 'Zertifikate',
    awardsLabel: 'Auszeichnungen', award: 'OBSS Code Master 2021 · Zweiter Platz in der ersten Runde',
    pdfLabel: 'Lebenslauf herunterladen (PDF, Englisch)', resumeNote: 'Die folgenden Angaben fassen den englischen Lebenslauf zusammen. Das vollständige Dokument steht als PDF bereit.',
    virtualPatient: 'Eine mobile Anwendung, entwickelt mit Lehrenden des Fachbereichs Pflege der Eskişehir Osmangazi University, um Pflegestudierenden praktische Erfahrungen in der Patientenversorgung zu ermöglichen.',
    qualityPool: 'Ein TÜBİTAK-2209-B-Abschlussprojekt in Zusammenarbeit mit Ford Otosan. Eine Plattform zur Verwaltung, Klassifizierung und Lösungsempfehlung für Garantie- und Qualitätsprozesse in der Automobilindustrie, mit einer Flask-API und einem abgestimmten Random Forest Classifier für Fertigungsfehler.',
    projectsIntro: 'Qualitätsmanagement in der Automobilindustrie. Praktisches Lernen in der Pflege. Zwei Projekte für konkrete Anforderungen.',
    githubIntro: 'Ein Blick auf den Code, den ich entwickle und teile.',
    statsIntro: 'Diese Zahlen stammen aus meinem Lebenslauf.',
    statsLabels: { employers: 'Organisationen', certificates: 'Zertifikate', projects: 'Lebenslaufprojekte', gpa: 'Studiennotendurchschnitt' },
    moreExperience: 'Weitere Arbeiten',
    projectTags: { virtualPatient: ['Mobile App', 'Pflegeausbildung'], qualityPool: ['TÜBİTAK 2209-B', 'Flask', 'Random Forest'] },
    experience: [
      { company: 'Garanti BBVA Technology', role: 'Softwareentwickler', period: '06/2023', location: 'Remote, Türkiye', details: [
        'Die Zahlungsinfrastruktur um 3D Model neben 3D_PAY erweitert und bankseitige sowie händlerintegrierte Authentifizierungsabläufe angepasst.',
        'Ein wiederverwendbares Rate-Limiting-Framework für Umgebungen mit und ohne Cache entwickelt, das in mehreren Produktionsprojekten eingesetzt wird.',
        'Sicherheitsschichten für Geschäftslogik sowie Schutz vor XSS, CRLF und SQL Injection und PCI-DSS-konforme Datenverarbeitung umgesetzt.',
        'Die Einheit im Konfigurationsmanagement vertreten und an Sicherheits- und Jugendbanking-Initiativen mitgewirkt.',
        'Einen Adapter für zwei Verschlüsselungsalgorithmen entworfen, zur erneuten Verschlüsselung von über 30 Millionen sensiblen Datensätzen beigetragen und Produktionsreleases verantwortet.',
        'Einen threadsicheren, hochverfügbaren Token-Lebenszyklus mit Double-checked Locking, AtomicReference, Ablaufregeln und AOP-basierter Erneuerung entwickelt.',
        'Zur gemeinsamen Payment-Facilitator-Infrastruktur beigetragen und damit eine vollständige Bankintegration umgesetzt.',
        'Seltene Race Conditions behoben, die bei hoher Last in Verarbeitungsfenstern unter 2 ms zu Anfrageverlusten führten.',
        'WebOTP und SMS AutoFill in ACS-Authentifizierungsabläufe integriert.',
        'Apache-Kafka-Pipelines in die Transaktionsverarbeitung von GarantiPay 2.0 integriert.',
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
