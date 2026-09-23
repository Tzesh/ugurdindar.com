import type { Locale, Section, Theme } from './commands';

type Copy = {
  labels: Record<Section, string>;
  language: string; theme: string; themes: Record<Theme, string>;
  appearance: string; appearanceHint: string; themeDescriptions: Record<Theme, string>;
  relatedLearning: string; viewCredential: string; credentialsIntro: string; learningLabel: string;
  experienceIntro: string; skillsIntro: string; projectArchive: string; conceptVisual: string;
  secretUnlocked: string; previousOutput: string; navigation: string; command: string; run: string; placeholder: string; suggestions: string;
  skip: string; ready: string; intro: string; tip: string; keyboard: string; session: string;
  unavailable: string; githubMissing: string; resumeMissing: string; projectsMissing: string;
  unknown: string; invalid: string; cleared: string; updated: string; current: string; output: string;
  help: string; clear: string; themeHelp: string; langHelp: string; noJs: string;
  explorer: string; overview: string; selectedWork: string; viewExperience: string;
  focusCommand: string; focusHint: string; sourceNote: string; connect: string; distributedSystems: string;
};
export const copy: Record<Locale, Copy> = {
  en: {
    appearance: 'Appearance studio', appearanceHint: 'Your workspace. Your atmosphere.',
    themeDescriptions: { system: 'Follow your device', light: 'Quiet, warm, editorial', dark: 'The terminal original', aurora: 'Violet haze & electric mint', ember: 'Copper glow & warm charcoal', blueprint: 'Cobalt ink & precision grids', matrix: 'Green phosphor & digital rain' },
    relatedLearning: 'Related learning', viewCredential: 'View credential', credentialsIntro: 'A growing toolkit. Backed by learning you can explore.', learningLabel: 'Continuous learning',
    experienceIntro: 'From manufacturing systems to the infrastructure behind everyday payments.', skillsIntro: 'The tools I build with. The thinking that connects them.', projectArchive: 'SELECTED PROJECTS / 02', conceptVisual: 'Concept illustration',
    explorer: 'Workspace', overview: 'Overview', selectedWork: 'Selected engineering work', viewExperience: 'Explore experience',
    focusCommand: 'Focus command input', focusHint: 'Ctrl / ⌘ K', sourceNote: 'From my professional experience', connect: 'Find me online', distributedSystems: 'Distributed systems',
    labels: { about: 'About', experience: 'Experience', skills: 'Skills', projects: 'Projects', github: 'GitHub', stats: 'Statistics', resume: 'Résumé', contact: 'Contact', help: 'Help' },
    language: 'Language', theme: 'Theme', themes: { light: 'Light', dark: 'Dark', system: 'System', aurora: 'Aurora', ember: 'Ember', blueprint: 'Blueprint', matrix: 'Matrix' },
    secretUnlocked: 'Secret unlocked', previousOutput: 'Previous output', navigation: 'Main navigation', command: 'Command', run: 'Run', placeholder: 'Type a command…', suggestions: 'Suggestions',
    skip: 'Skip to content', ready: 'Ready to explore', intro: 'Explore my profile with a command or a click.',
    tip: 'A command line for the curious. A portfolio for everyone.', keyboard: '↑ ↓ history · Esc dismiss · Tab navigate · Ctrl/⌘ K command', session: 'Portfolio session',
    unavailable: 'This section is waiting for verified profile content.',
    githubMissing: 'GitHub data is not available yet.', resumeMissing: 'The verified résumé and English PDF have not been added yet.',
    projectsMissing: 'Project descriptions and links will be added after verification.',
    unknown: 'Unknown command. Try help or one of the suggestions.', invalid: 'Invalid arguments. Your preferences have not changed. See help for valid values.',
    cleared: 'Output cleared.', updated: 'Updated', current: 'Current', output: 'Output added',
    help: 'Choose a section or enter a command such as /projects or whoami. The / prefix is optional. English, Turkish and German aliases work in every language.',
    clear: 'Clear the output', themeHelp: 'View or change the theme', langHelp: 'View or change the language',
    noJs: 'Command controls require JavaScript. All sections remain available through the links above.',
  },
  tr: {
    appearance: 'Görünüm stüdyosu', appearanceHint: 'Senin çalışma alanın. Senin atmosferin.',
    themeDescriptions: { system: 'Cihazına uyum sağlar', light: 'Sade, sıcak, ferah', dark: 'Klasik terminal ruhu', aurora: 'Mor ışık & elektrik yeşili', ember: 'Bakır ışıltı & sıcak antrasit', blueprint: 'Kobalt mürekkep & teknik çizgiler', matrix: 'Yeşil fosfor & dijital yağmur' },
    relatedLearning: 'İlgili eğitimler', viewCredential: 'Sertifikayı görüntüle', credentialsIntro: 'Öğrenerek genişleyen bir araç kutusu. Belgeleriyle birlikte.', learningLabel: 'Sürekli öğrenme',
    experienceIntro: 'Üretim sistemlerinden günlük ödemelerin arkasındaki altyapıya.', skillsIntro: 'Üretirken kullandığım araçlar. Onları birleştiren yaklaşım.', projectArchive: 'SEÇİLİ PROJELER / 02', conceptVisual: 'Kavramsal çizim',
    explorer: 'Çalışma alanı', overview: 'Genel bakış', selectedWork: 'Öne çıkan mühendislik çalışmaları', viewExperience: 'Deneyimi keşfet',
    focusCommand: 'Komut alanına git', focusHint: 'Ctrl / ⌘ K', sourceNote: 'Mesleki deneyimimden', connect: 'Bağlantılar', distributedSystems: 'Dağıtık sistemler',
    labels: { about: 'Hakkımda', experience: 'Deneyim', skills: 'Yetenekler', projects: 'Projeler', github: 'GitHub', stats: 'İstatistikler', resume: 'CV', contact: 'İletişim', help: 'Yardım' },
    language: 'Dil', theme: 'Tema', themes: { light: 'Açık', dark: 'Koyu', system: 'Sistem', aurora: 'Aurora', ember: 'Ember', blueprint: 'Blueprint', matrix: 'Matrix' },
    secretUnlocked: 'Gizli komut bulundu', previousOutput: 'Önceki çıktılar', navigation: 'Ana gezinme', command: 'Komut', run: 'Çalıştır', placeholder: 'Bir komut yaz…', suggestions: 'Öneriler',
    skip: 'İçeriğe geç', ready: 'Keşfetmeye hazır', intro: 'Profilimi komut yazarak veya tıklayarak keşfet.',
    tip: 'Meraklısına komut satırı. Herkese açık bir portföy.', keyboard: '↑ ↓ geçmiş · Esc kapat · Tab gezin · Ctrl/⌘ K komut', session: 'Portföy oturumu',
    unavailable: 'Bu bölüm doğrulanmış profil içeriğini bekliyor.', githubMissing: 'GitHub verileri henüz erişilebilir değil.',
    resumeMissing: 'Doğrulanmış CV ve İngilizce PDF henüz eklenmedi.', projectsMissing: 'Proje açıklamaları ve bağlantıları doğrulandıktan sonra eklenecek.',
    unknown: 'Bilinmeyen komut. help veya önerilen komutlardan birini dene.', invalid: 'Geçersiz argümanlar. Tercihlerin değişmedi. Geçerli değerler için help yaz.',
    cleared: 'Çıktı temizlendi.', updated: 'Güncellendi', current: 'Geçerli', output: 'Çıktı eklendi',
    help: 'Bir bölüm seç veya /projects ya da whoami gibi bir komut yaz. / öneki isteğe bağlıdır. İngilizce, Türkçe ve Almanca karşılıklar her dilde çalışır.',
    clear: 'Çıktıyı temizle', themeHelp: 'Temayı göster veya değiştir', langHelp: 'Dili göster veya değiştir',
    noJs: 'Komut kontrolleri JavaScript gerektirir. Bütün bölümlere yukarıdaki bağlantılardan erişebilirsin.',
  },
  de: {
    appearance: 'Designstudio', appearanceHint: 'Dein Arbeitsbereich. Deine Atmosphäre.',
    themeDescriptions: { system: 'Folgt deinem Gerät', light: 'Ruhig, warm, klar', dark: 'Das Terminal-Original', aurora: 'Violetter Schimmer & Mint', ember: 'Kupferglanz & warme Kohle', blueprint: 'Kobaltblau & präzise Raster', matrix: 'Grüner Phosphor & digitaler Regen' },
    relatedLearning: 'Passende Weiterbildungen', viewCredential: 'Zertifikat ansehen', credentialsIntro: 'Ein wachsender Werkzeugkasten. Mit nachvollziehbarer Weiterbildung.', learningLabel: 'Kontinuierliches Lernen',
    experienceIntro: 'Von Fertigungssystemen zur Infrastruktur hinter alltäglichen Zahlungen.', skillsIntro: 'Die Werkzeuge meiner Arbeit. Das Denken, das sie verbindet.', projectArchive: 'AUSGEWÄHLTE PROJEKTE / 02', conceptVisual: 'Konzeptillustration',
    explorer: 'Arbeitsbereich', overview: 'Übersicht', selectedWork: 'Ausgewählte Entwicklungsarbeit', viewExperience: 'Erfahrung entdecken',
    focusCommand: 'Befehlseingabe fokussieren', focusHint: 'Ctrl / ⌘ K', sourceNote: 'Aus meiner Berufserfahrung', connect: 'Online finden', distributedSystems: 'Verteilte Systeme',
    labels: { about: 'Über mich', experience: 'Erfahrung', skills: 'Kenntnisse', projects: 'Projekte', github: 'GitHub', stats: 'Statistiken', resume: 'Lebenslauf', contact: 'Kontakt', help: 'Hilfe' },
    language: 'Sprache', theme: 'Design', themes: { light: 'Hell', dark: 'Dunkel', system: 'System', aurora: 'Aurora', ember: 'Ember', blueprint: 'Blueprint', matrix: 'Matrix' },
    secretUnlocked: 'Geheimnis entdeckt', previousOutput: 'Bisherige Ausgaben', navigation: 'Hauptnavigation', command: 'Befehl', run: 'Ausführen', placeholder: 'Befehl eingeben…', suggestions: 'Vorschläge',
    skip: 'Zum Inhalt springen', ready: 'Bereit zum Entdecken', intro: 'Entdecke mein Profil per Befehl oder Klick.',
    tip: 'Eine Kommandozeile für Neugierige. Ein Portfolio für alle.', keyboard: '↑ ↓ Verlauf · Esc schließen · Tab navigieren · Ctrl/⌘ K Befehl', session: 'Portfolio-Sitzung',
    unavailable: 'Dieser Bereich wartet auf bestätigte Profilinhalte.', githubMissing: 'GitHub-Daten sind noch nicht verfügbar.',
    resumeMissing: 'Der bestätigte Lebenslauf und die englische PDF wurden noch nicht hinzugefügt.', projectsMissing: 'Projektbeschreibungen und Links werden nach der Prüfung ergänzt.',
    unknown: 'Unbekannter Befehl. Versuche help oder einen der Vorschläge.', invalid: 'Ungültige Argumente. Deine Einstellungen bleiben unverändert. Gültige Werte findest du mit help.',
    cleared: 'Ausgabe gelöscht.', updated: 'Aktualisiert', current: 'Aktuell', output: 'Ausgabe hinzugefügt',
    help: 'Wähle einen Bereich oder gib einen Befehl wie /projects oder whoami ein. Das Präfix / ist optional. Englische, türkische und deutsche Varianten funktionieren in jeder Sprache.',
    clear: 'Ausgabe löschen', themeHelp: 'Design anzeigen oder ändern', langHelp: 'Sprache anzeigen oder ändern',
    noJs: 'Die Befehlssteuerung benötigt JavaScript. Alle Bereiche bleiben über die Links oben erreichbar.',
  },
};
