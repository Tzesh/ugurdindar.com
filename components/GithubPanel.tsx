'use client';

import { useEffect, useId, useState } from 'react';
import type { Locale } from '../lib/commands';
import type { GithubPortfolio, GithubRepo } from '../lib/github';
import styles from './GithubPanel.module.css';

const profileUrl = 'https://github.com/Tzesh';
const repoUrl = (name: string) => `${profileUrl}/${encodeURIComponent(name)}`;
const labels = {
  en: {
    heading: 'Public work on GitHub', loading: 'Loading public repositories…', error: 'Live GitHub data is unavailable right now.', retry: 'Try again',
    publicRepos: 'Public repositories', stars: 'Stars received', top: 'Most starred original repositories',
    rankingNote: 'Totals and the full list include forks. The top three exclude forks.', all: 'All public repositories', fork: 'Fork',
    noDescription: 'No description on GitHub.', activity: 'Contribution activity', activityLink: 'View contribution activity on GitHub',
    activityUnavailable: 'The calendar is unavailable here. View contribution activity on GitHub.', visibleContributions: 'visible contributions', days: 'days',
    updatesHourly: 'Updates hourly', low: 'Less', high: 'More', calendarScroll: 'Contribution calendar, horizontally scrollable',
  },
  tr: {
    heading: 'GitHub’daki açık çalışmalar', loading: 'Açık depolar yükleniyor…', error: 'Canlı GitHub verileri şu anda alınamıyor.', retry: 'Tekrar dene',
    publicRepos: 'Herkese açık depolar', stars: 'Alınan yıldızlar', top: 'En çok yıldız alan özgün depolar',
    rankingNote: 'Toplamlara ve tam listeye çatallar dahildir. İlk üç sıralamasında çatallar yoktur.', all: 'Tüm açık depolar', fork: 'Çatal',
    noDescription: 'GitHub’da açıklama yok.', activity: 'Katkı etkinliği', activityLink: 'GitHub’da katkı etkinliğini görüntüle',
    activityUnavailable: 'Takvim burada gösterilemiyor. Katkı etkinliğini GitHub’da görüntüle.', visibleContributions: 'görünen katkı', days: 'gün',
    updatesHourly: 'Saatlik güncellenir', low: 'Az', high: 'Çok', calendarScroll: 'Katkı takvimi, yatay kaydırılabilir',
  },
  de: {
    heading: 'Öffentliche Arbeit auf GitHub', loading: 'Öffentliche Repositories werden geladen…', error: 'Live-Daten von GitHub sind derzeit nicht verfügbar.', retry: 'Erneut versuchen',
    publicRepos: 'Öffentliche Repositories', stars: 'Erhaltene Sterne', top: 'Beliebteste eigene Repositories',
    rankingNote: 'Summen und Gesamtliste enthalten Forks. Die Top Drei enthalten keine Forks.', all: 'Alle öffentlichen Repositories', fork: 'Fork',
    noDescription: 'Keine Beschreibung auf GitHub.', activity: 'Beitragsaktivität', activityLink: 'Beitragsaktivität auf GitHub ansehen',
    activityUnavailable: 'Der Kalender ist hier nicht verfügbar. Beitragsaktivität auf GitHub ansehen.', visibleContributions: 'sichtbare Beiträge', days: 'Tage',
    updatesHourly: 'Stündliche Aktualisierung', low: 'Weniger', high: 'Mehr', calendarScroll: 'Beitragskalender, horizontal scrollbar',
  },
} as const;

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: GithubPortfolio };

function RepoCard({ repo, locale }: { repo: GithubRepo; locale: Locale }) {
  const t = labels[locale];
  return <article className={styles.repoCard}>
    <div className={styles.repoMeta}><span>{repo.language ?? 'GitHub'}</span><span aria-label={`${repo.stars} ${t.stars}`}>★ {repo.stars}</span></div>
    <h4><a href={repoUrl(repo.name)} target="_blank" rel="noopener noreferrer">{repo.name}<span aria-hidden="true"> ↗</span></a></h4>
    <p>{repo.description ?? t.noDescription}</p>
  </article>;
}

export default function GithubPanel({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const headingId = useId();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    fetch('/api/github', { signal: controller.signal, cache: 'no-store' })
      .then(async response => {
        if (!response.ok) throw new Error('GitHub unavailable');
        const data = await response.json() as GithubPortfolio;
        if (!Array.isArray(data.repos) || !Array.isArray(data.topRepos)
          || !Number.isSafeInteger(data.publicRepoCount) || !Number.isSafeInteger(data.totalStars)) {
          throw new Error('Invalid GitHub response');
        }
        if (!controller.signal.aborted) setState({ status: 'ready', data });
      })
      .catch(() => { if (!controller.signal.aborted) setState({ status: 'error' }); });
    return () => controller.abort();
  }, [attempt]);

  const format = new Intl.NumberFormat(locale);
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const data = state.status === 'ready' ? state.data : null;
  const days = data?.contributions;
  const blanks = days?.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const contributionCount = days?.reduce((sum, day) => sum + day.count, 0);

  return <section className={styles.panel} aria-labelledby={headingId} data-testid="github-panel">
    <div className={styles.header}><div><span className={styles.eyebrow}>GITHUB / TZESH</span><h3 id={headingId}>{t.heading}</h3></div><a href={profileUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
    {state.status === 'loading' && <p role="status">{t.loading}</p>}
    {state.status === 'error' && <div role="alert" className={styles.error}><p>{t.error}</p><button type="button" onClick={() => setAttempt(value => value + 1)}>{t.retry}</button></div>}
    {data && <>
      <dl className={styles.metrics}>
        <div><dt>{t.publicRepos}</dt><dd>{format.format(data.publicRepoCount)}</dd></div>
        <div><dt>{t.stars}</dt><dd>{format.format(data.totalStars)}</dd></div>
      </dl>
      <p className={styles.updateNote}>{t.updatesHourly}</p>
      <div className={styles.sectionTitle}><h4>{t.top}</h4><p>{t.rankingNote}</p></div>
      <div className={styles.topRepos}>{data.topRepos.map(repo => <RepoCard key={repo.name} repo={repo} locale={locale} />)}</div>
      <details className={styles.allRepos}><summary>{t.all} <span>{format.format(data.publicRepoCount)}</span></summary>
        <ul>{data.repos.map(repo => <li key={repo.name}><a href={repoUrl(repo.name)} target="_blank" rel="noopener noreferrer">{repo.name}</a>{repo.fork && <small>{t.fork}</small>}<span>★ {format.format(repo.stars)}</span></li>)}</ul>
      </details>
      <div className={styles.activity}>
        <div className={styles.activityHeading}><h4>{t.activity}</h4><a href={profileUrl} target="_blank" rel="noopener noreferrer">{t.activityLink} ↗</a></div>
        {days?.length ? <>
          <p className={styles.activitySummary}>{dateFormat.format(new Date(`${days[0].date}T00:00:00Z`))} – {dateFormat.format(new Date(`${days.at(-1)!.date}T00:00:00Z`))} · {format.format(contributionCount ?? 0)} {t.visibleContributions}</p>
          <div className={styles.calendarViewport} role="region" tabIndex={0} aria-label={t.calendarScroll}><div className={styles.calendar} role="img" aria-label={`${format.format(contributionCount ?? 0)} ${t.visibleContributions}, ${format.format(days.length)} ${t.days}`}>
            {Array.from({ length: blanks }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
            {days.map(day => <span key={day.date} data-level={day.level} title={`${day.date}: ${format.format(day.count)}`} aria-hidden="true" />)}
          </div></div>
          <div className={styles.legend}><span>{t.low}</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} aria-hidden="true" />)}<span>{t.high}</span></div>
        </> : <p>{t.activityUnavailable}</p>}
      </div>
    </>}
  </section>;
}
