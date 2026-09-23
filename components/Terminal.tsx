'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { isSection, isTheme, locales, parseCommand, sections, suggestions, themes, themeUsage, type EasterEgg, type Locale, type Section, type Theme } from '../lib/commands';
import { copy } from '../lib/i18n';
import { profile } from '../lib/profile';
import { biography } from '../lib/biography';
import { showcase } from '../lib/showcase';
import Content from './Content';
import SecretScene, { tracks } from './SecretScene';
import styles from './Terminal.module.css';

type Entry = { id: number; command: string; section?: Section; message?: string };
const languageNames = { tr: 'Türkçe', en: 'English', de: 'Deutsch' };
const sectionIcons: Record<Section, string> = { about: '◎', experience: '↳', skills: '⌘', projects: '◇', github: '⑂', stats: '▥', resume: '↓', contact: '@', help: '?' };

export default function Terminal({ locale, initialSection }: { locale: Locale; initialSection: Section | null }) {
  const t = copy[locale];
  const bio = biography[locale];
  const work = showcase[locale];
  const [entries, setEntries] = useState<Entry[]>(initialSection ? [{ id: 0, command: initialSection, section: initialSection }] : []);
  const [active, setActive] = useState(initialSection);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState(-1);
  const draft = useRef('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [secret, setSecret] = useState<EasterEgg | null>(null);
  const previousTheme = useRef<Theme | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<'section' | 'command' | null>(null);

  function focusCommand() {
    inputRef.current?.scrollIntoView({ block: 'start' });
    inputRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    setReady(true);
    try {
      const stored = localStorage.getItem('portfocli-theme');
      if (isTheme(stored)) setTheme(stored);
    } catch { /* Storage can be disabled; the session still works. */ }
    document.cookie = `portfocli-lang=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const onPopState = () => {
      const section = new URL(window.location.href).searchParams.get('section');
      const valid = isSection(section) ? section : null;
      pendingFocus.current = valid ? 'section' : null;
      setActive(valid);
      setEntries(valid ? [{ id: nextId.current++, command: valid, section: valid }] : []);
      setNotice(valid ? `${t.output}: ${t.labels[valid]}` : t.cleared);
    };
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        focusCommand();
        setShowSuggestions(true);
      }
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onShortcut);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onShortcut);
    };
  }, [locale, t]);

  useEffect(() => { if (ready) document.documentElement.dataset.theme = theme; }, [theme, ready]);

  useEffect(() => {
    if (!secret) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { stopSecret(); focusCommand(); }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [secret, theme]);

  useEffect(() => {
    if (!pendingFocus.current) return;
    const entry = outputRef.current?.lastElementChild as HTMLElement | null;
    if (entry && pendingFocus.current === 'section') {
      entry.scrollIntoView({ block: 'start' });
      const heading = entry.querySelector('h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    if (pendingFocus.current === 'command') focusCommand();
    pendingFocus.current = null;
  }, [entries]);

  function setPreference(value: Theme) {
    if (secret === 'tzesh') previousTheme.current = value;
    setTheme(value);
    try { localStorage.setItem('portfocli-theme', value); } catch { /* Keep the in-memory preference. */ }
  }

  function stopSecret() {
    audioRef.current?.pause();
    audioRef.current?.removeAttribute('src');
    audioRef.current?.load();
    if (secret === 'tzesh' && theme === 'matrix' && previousTheme.current) setTheme(previousTheme.current);
    previousTheme.current = null;
    setSecret(null);
  }

  function activateSecret(value: EasterEgg) {
    const audio = audioRef.current;
    if (audio) {
      if (audio.getAttribute('src') !== tracks[value].src) {
        audio.pause();
        audio.src = tracks[value].src;
      }
      // Start inside the command gesture, before React renders the scene.
      void audio.play().catch(() => { /* Native controls offer a manual fallback. */ });
    }
    if (value === 'tzesh') {
      if (secret !== 'tzesh') previousTheme.current = theme;
      setTheme('matrix');
    } else if (secret === 'tzesh') {
      if (theme === 'matrix' && previousTheme.current) setTheme(previousTheme.current);
      previousTheme.current = null;
    }
    setSecret(value);
  }

  function changeLocale(value: Locale) {
    document.cookie = `portfocli-lang=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.assign(`/${value}${active ? `?section=${active}` : ''}`);
  }

  function append(entry: Omit<Entry, 'id'>) {
    const id = nextId.current++;
    setEntries(previous => [...previous, { ...entry, id }]);
    setNotice(`${t.output} ${id}: ${entry.section ? t.labels[entry.section] : entry.message}`);
  }

  function openSection(section: Section, command = section as string) {
    append({ command, section });
    if (active !== section) window.history.pushState(null, '', `/${locale}?section=${section}`);
    setActive(section);
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, section: Section, command = section as string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    pendingFocus.current = 'section';
    setShowSuggestions(false);
    openSection(section, command);
  }

  function run(value: string) {
    const command = value.trim();
    const result = parseCommand(command);
    if (result.kind === 'empty') return;
    pendingFocus.current = 'command';
    setHistory(previous => [...previous, command]);
    setPosition(-1);
    draft.current = '';
    setInput('');
    setShowSuggestions(false);
    if (result.kind === 'easterEgg') {
      activateSecret(result.value);
      append({ command, message: `${t.secretUnlocked}: /${result.value}` });
    } else if (result.kind === 'section') openSection(result.section, command);
    else if (result.kind === 'clear') {
      stopSecret();
      setEntries([]);
      setActive(null);
      if (active) window.history.pushState(null, '', `/${locale}`);
      setNotice(t.cleared);
    } else if (result.kind === 'theme') {
      if (result.value) setPreference(result.value);
      append({ command, message: `${t.theme} · ${t.current}: ${t.themes[result.value ?? theme]}. ${themeUsage}` });
    } else if (result.kind === 'lang') {
      if (result.value && result.value !== locale) changeLocale(result.value);
      else append({ command, message: `${t.language} · ${t.current}: ${languageNames[locale]}. lang [tr|en|de]` });
    } else append({ command, message: result.kind === 'invalid' ? t.invalid : t.unknown });
  }

  function renderEntry(entry: Entry, index: number) {
    return <section data-testid="entry" key={entry.id} className={styles.entry}>
      <div className={styles.echo}><span aria-hidden="true">❯</span><code>{entry.command}</code><span className={styles.entryNumber} aria-hidden="true">#{String(index + 1).padStart(2, '0')}</span></div>
      {entry.section ? <Content section={entry.section} locale={locale} /> : <div className={styles.content}><p>{entry.message}</p>{(entry.message === t.unknown || entry.message === t.invalid) && <a href={`/${locale}?section=help`} onClick={event => navigate(event, 'help')}>help — {t.labels.help}</a>}</div>}
    </section>;
  }

  const candidates = suggestions(input).slice(0, 5);
  const primary: Section[] = ['about', 'experience', 'projects', 'skills', 'github', 'resume', 'contact'];
  return <div className={styles.page}>
    <a className={styles.skip} href="#content">{t.skip}</a>
    <header className={styles.header}>
      <a className={styles.brand} href={`/${locale}`} aria-label={profile.brand}>
        {profile.logoPath ? <img src={profile.logoPath} alt={profile.brand} width="90" height="28" /> : <><span aria-hidden="true">❯_</span> {profile.brand}<span className={styles.brandDot}>.</span></>}
      </a>
      <div className={styles.sessionName}><span aria-hidden="true">/</span> {profile.session}</div>
      <div className={styles.controls}>
        <button className={styles.commandShortcut} type="button" disabled={!ready} onClick={() => { focusCommand(); setShowSuggestions(true); }} aria-label={t.focusCommand}><span aria-hidden="true">❯_</span><kbd>{t.focusHint}</kbd></button>
        <label><span>{t.language}</span><select aria-label={t.language} value={locale} disabled={!ready} onChange={event => changeLocale(event.target.value as Locale)}>
          {locales.map(code => <option key={code} value={code}>{languageNames[code]}</option>)}
        </select></label>
        <label><span>{t.theme}</span><select aria-label={t.theme} value={theme} disabled={!ready} onChange={event => setPreference(event.target.value as Theme)}>
          {themes.map(value => <option key={value} value={value}>{t.themes[value]}</option>)}
        </select></label>
      </div>
    </header>

    <div className={styles.workspace}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarProfile}><span className={styles.avatar} aria-hidden="true">ud<span>_</span></span><div><strong>{profile.name}</strong><span>@tzesh</span></div></div>
          <div className={styles.sidebarLabel}>{t.explorer}<span aria-hidden="true">−</span></div>
          <nav aria-label={t.navigation} className={styles.navigation}>
            <a href={`/${locale}`} aria-current={!active ? 'page' : undefined}><span className={styles.navIcon} aria-hidden="true">⌂</span>{t.overview}</a>
            {primary.map(section => <a key={section} href={`/${locale}?section=${section}`} onClick={event => navigate(event, section)} aria-current={active === section ? 'page' : undefined}><span className={styles.navIcon} aria-hidden="true">{sectionIcons[section]}</span>{t.labels[section]}<span className={styles.navArrow} aria-hidden="true">↗</span></a>)}
          </nav>
          <div className={styles.secondary}>
            {sections.filter(section => !primary.includes(section)).map(section => <a key={section} href={`/${locale}?section=${section}`} onClick={event => navigate(event, section)} aria-current={active === section ? 'page' : undefined}><span aria-hidden="true">{sectionIcons[section]}</span>{t.labels[section]}</a>)}
          </div>
          <div className={styles.sidebarBottom}>
            <span className={styles.sidebarLabel}>{t.connect}</span>
            <a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a>
            <a href={profile.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
            <a href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
            <p><span className={styles.statusDot} aria-hidden="true" />{profile.location}</p>
          </div>
        </div>
      </aside>

      <main id="content" className={styles.terminal}>
        <div className={styles.titlebar}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span className={styles.sessionLabel}><span aria-hidden="true">⌘</span>{active ? `${active}.md` : 'overview.md'}</span><span className={styles.path}>~/tzesh/portfolio</span><span className={styles.version}>v0.5</span></div>
        <div className={`${styles.welcome} ${entries.length ? styles.compactWelcome : ''}`}>
          <div className={styles.kicker}><span className={styles.statusDot} aria-hidden="true" />{work.eyebrow}</div>
          <h1>{profile.name}<span className={styles.cursor} aria-hidden="true">_</span></h1>
          <p className={styles.headline}>{work.headline}</p>
          <div className={styles.composer}>
            <div className={styles.composerLabel}><span><span className={styles.statusDot} aria-hidden="true" />visitor<span className={styles.promptPath}>@tzesh ~</span></span><button type="button" disabled={!ready} onClick={() => { focusCommand(); setShowSuggestions(true); }} aria-label={t.focusCommand}><kbd>{t.focusHint}</kbd></button></div>
            <form onSubmit={event => { event.preventDefault(); run(input); }}>
              <label htmlFor="command" className={styles.srOnly}>{t.command}</label>
              <span className={styles.prompt} aria-hidden="true">❯</span>
              <input ref={inputRef} id="command" name="command" value={input} disabled={!ready} placeholder={t.placeholder} enterKeyHint="go" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={512}
                onChange={event => { setInput(event.target.value); setPosition(-1); setShowSuggestions(true); }}
                aria-describedby="command-hint"
                onKeyDown={event => {
                  if (event.key === 'Escape') setShowSuggestions(false);
                  if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && history.length) {
                    event.preventDefault();
                    if (position === -1) draft.current = input;
                    const next = event.key === 'ArrowUp' ? Math.min(position + 1, history.length - 1) : Math.max(position - 1, -1);
                    setPosition(next);
                    setInput(next === -1 ? draft.current : history[history.length - 1 - next]);
                    setShowSuggestions(false);
                  }
                }} />
              <button data-testid="run-command" type="submit" disabled={!ready}>{t.run}<span aria-hidden="true"> ↵</span></button>
            </form>
            {showSuggestions && candidates.length > 0 && <div data-testid="suggestions" className={styles.suggestions} aria-label={t.suggestions}>
              <span>{t.suggestions}</span>{candidates.map(command => <button key={command} disabled={!ready} type="button" onClick={() => { setInput(command); setShowSuggestions(false); focusCommand(); }}>{command}</button>)}
            </div>}
            <div className={styles.commandHint} id="command-hint"><span>{t.intro}</span><span>{t.keyboard}</span></div>
            <div className={styles.quickCommands} data-testid="quick-commands" aria-label={t.suggestions}>
              {(['about', 'projects', 'github', 'help'] as const).map(section => {
                const command = section === 'about' ? 'whoami' : section;
                return <a key={section} href={`/${locale}?section=${section}`} onClick={event => navigate(event, section, `/${command}`)}><span aria-hidden="true">/</span>{command}<span aria-hidden="true">↗</span></a>;
              })}
            </div>
            <noscript><p>{t.noJs}</p><div className={styles.secondary}>{locales.map(code => <a key={code} href={`/${code}${active ? `?section=${active}` : ''}`} lang={code}>{languageNames[code]}</a>)}</div></noscript>
          </div>
        </div>

        <SecretScene mode={secret} locale={locale} audioRef={audioRef} onClose={() => { stopSecret(); focusCommand(); }} />

        <div ref={outputRef} data-testid="output" className={styles.output}>
          {entries.length > 1 && <details className={styles.outputHistory} key={`history-${entries.at(-1)?.id}`} data-testid="output-history">
            <summary>{t.previousOutput}<span>{entries.length - 1}</span></summary>
            {entries.slice(0, -1).map(renderEntry)}
          </details>}
          {entries.length > 0 && renderEntry(entries[entries.length - 1], entries.length - 1)}
        </div>

        {entries.length === 0 && <div className={styles.homeDetails}>
          <div className={styles.tags}>{['Spring Boot', '.NET', 'Apache Kafka', t.distributedSystems].map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={`/${locale}?section=experience`} onClick={event => navigate(event, 'experience')}>{t.viewExperience}<span aria-hidden="true"> ↗</span></a>
            <a href={profile.resumePdf} download>{bio.pdfLabel}<span aria-hidden="true"> ↓</span></a>
          </div>
          <div className={styles.highlights}>{work.highlights.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span><p>{item.detail}</p></div>)}</div>
          <div className={styles.sectionHeader}><div><span className={styles.kicker}>{t.sourceNote}</span><h2>{t.selectedWork}</h2></div><span aria-hidden="true">[ 01 — 02 ]</span></div>
          <div className={styles.featuredWork}>{work.cases.map((item, index) => <article key={item.title}>
            <div className={styles.caseMeta}><span>0{index + 1}</span><span>{index === 0 ? 'Garanti BBVA Technology' : 'Ford Otosan'}</span></div>
            <h3>{item.title}</h3><p>{item.description}</p>
            <div className={styles.tags}>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <a href={`/${locale}?section=experience`} onClick={event => navigate(event, 'experience')}>{t.labels.experience}<span aria-hidden="true"> ↗</span></a>
          </article>)}</div>
        </div>}
        <details className={styles.appearance} data-testid="appearance">
          <summary><span className={styles.appearanceIcon} aria-hidden="true">◈</span><span>{t.appearance}<small>{t.appearanceHint}</small></span><span className={styles.paletteDots} aria-hidden="true"><i /><i /><i /></span><span className={styles.currentTheme}>{t.themes[theme]}</span><span className={styles.disclosureArrow} aria-hidden="true">+</span></summary>
          <div className={styles.themeOptions} role="group" aria-label={t.appearance}>
            {themes.map(value => <button key={value} type="button" disabled={!ready} aria-label={t.themes[value]} aria-describedby={`theme-${value}-description`} aria-pressed={theme === value} onClick={() => setPreference(value)}>
              <span className={styles.themePreview} data-preset={value} aria-hidden="true"><i /><i /><i /></span>
              <strong>{t.themes[value]}<span aria-hidden="true">{theme === value ? '✓' : '↗'}</span></strong><small id={`theme-${value}-description`}>{t.themeDescriptions[value]}</small>
            </button>)}
          </div>
        </details>
        <div className={styles.statusbar}><span><span className={styles.statusDot} aria-hidden="true" />{t.ready}</span><span>{locale.toUpperCase()}<span aria-hidden="true"> / </span>UTF-8</span></div>
      </main>
    </div>
    <footer className={styles.footer}><span>{profile.brand} <span aria-hidden="true">/</span> {profile.session}</span><span>{profile.title} · {profile.location}</span></footer>
    <div className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{notice}</div>
  </div>;
}
