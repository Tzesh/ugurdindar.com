export const locales = ['tr', 'en', 'de'] as const;
export type Locale = typeof locales[number];
export const themes = ['light', 'dark', 'system', 'aurora', 'ember', 'blueprint', 'matrix'] as const;
export type Theme = typeof themes[number];
export type EasterEgg = 'melek' | 'tzesh';
export const themeUsage = `theme [${themes.join('|')}]`;
export const sections = ['about', 'experience', 'skills', 'projects', 'github', 'stats', 'resume', 'contact', 'help'] as const;
export type Section = typeof sections[number];

export const aliases = {
  help: ['help', 'yardım', 'hilfe'],
  about: ['about', 'hakkımda', 'über', 'ueber', 'whoami'],
  experience: ['experience', 'deneyim', 'erfahrung'],
  skills: ['skills', 'yetenekler', 'kenntnisse', 'fähigkeiten', 'faehigkeiten'],
  projects: ['projects', 'projeler', 'projekte'],
  github: ['github'],
  stats: ['stats', 'istatistikler', 'statistiken'],
  resume: ['resume', 'résumé', 'cv', 'özgeçmiş', 'lebenslauf'],
  contact: ['contact', 'iletişim', 'kontakt'],
  clear: ['clear', 'temizle', 'löschen', 'loeschen'],
  theme: ['theme', 'tema', 'design'],
  lang: ['lang', 'dil', 'sprache'],
} as const;
export type Command = keyof typeof aliases;
const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale);
export const isSection = (value: unknown): value is Section => sections.includes(value as Section);
export const isTheme = (value: unknown): value is Theme => themes.includes(value as Theme);
const findCommand = (word: string) => (Object.keys(aliases) as Command[])
  .find(key => aliases[key].some(alias => normalize(alias) === normalize(word)));

type Result = { kind: 'empty' | 'unknown' | 'invalid' | 'clear' }
  | { kind: 'section'; section: Section }
  | { kind: 'theme'; value?: Theme }
  | { kind: 'easterEgg'; value: EasterEgg }
  | { kind: 'lang'; value?: Locale };

export function parseCommand(input: string): Result {
  const [word, ...args] = input.trim().replace(/^\//, '').split(/\s+/);
  if (!word) return { kind: 'empty' };
  const secret = normalize(word);
  if (secret === 'melek' || secret === 'tzesh') return args.length ? { kind: 'invalid' } : { kind: 'easterEgg', value: secret };
  const command = findCommand(word);
  if (!command) return { kind: 'unknown' };
  if (command === 'theme' || command === 'lang') {
    if (args.length === 0) return { kind: command };
    if (args.length !== 1) return { kind: 'invalid' };
    if (command === 'theme' && isTheme(args[0])) return { kind: 'theme', value: args[0] };
    if (command === 'lang' && isLocale(args[0])) return { kind: 'lang', value: args[0] };
    return { kind: 'invalid' };
  }
  if (args.length) return { kind: 'invalid' };
  return command === 'clear' ? { kind: 'clear' } : { kind: 'section', section: command };
}

export function suggestions(input: string): string[] {
  const typed = input.trimStart();
  const slash = typed.startsWith('/') ? '/' : '';
  const query = typed.slice(slash.length);
  if (query.startsWith('/')) return [];
  const argument = query.match(/^(\S+)\s+(\S*)$/);
  if (argument) {
    const command = findCommand(argument[1]);
    const values = command === 'theme' ? themes : command === 'lang' ? locales : [];
    return values.filter(value => value.startsWith(argument[2]))
      .map(value => `${slash}${argument[1]} ${value}`);
  }
  const prefix = normalize(query.trim());
  return (Object.keys(aliases) as Command[])
    .filter(key => aliases[key].some(alias => normalize(alias).startsWith(prefix)))
    .map(key => `${slash}${key}`);
}

export function resolveLocale(saved?: string, browser?: string): Locale {
  if (isLocale(saved)) return saved;
  const preferred = browser?.split(',')[0]?.split(';')[0]?.trim().toLowerCase().split('-')[0];
  return isLocale(preferred) ? preferred : 'en';
}
