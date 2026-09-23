export type GithubRepo = {
  name: string;
  description: string | null;
  stars: number;
  fork: boolean;
  language: string | null;
  url: string;
};

export type ContributionDay = { date: string; count: number; level: number };
export type GithubPortfolio = {
  publicRepoCount: number;
  totalStars: number;
  topRepos: GithubRepo[];
  repos: GithubRepo[];
  contributions: ContributionDay[] | null;
};

const USER = 'Tzesh';
const PAGE_SIZE = 100;
const MAX_PAGES = 20;
const HOUR = 3600;
type GithubFetch = (url: string, init?: RequestInit & { next?: { revalidate: number } }) => Promise<Response>;

function parseRepo(value: unknown): GithubRepo {
  if (!value || typeof value !== 'object') throw new Error('Invalid GitHub repository');
  const item = value as Record<string, unknown>;
  const owner = item.owner as Record<string, unknown> | null;
  if (typeof item.name !== 'string' || !/^[A-Za-z0-9_.-]{1,100}$/.test(item.name)
    || typeof owner?.login !== 'string' || owner.login.toLowerCase() !== USER.toLowerCase()
    || item.private !== false || typeof item.fork !== 'boolean'
    || !Number.isSafeInteger(item.stargazers_count) || (item.stargazers_count as number) < 0
    || !(item.description === null || typeof item.description === 'string')
    || !(item.language === null || typeof item.language === 'string')) {
    throw new Error('Invalid GitHub repository');
  }
  return {
    name: item.name,
    description: item.description as string | null,
    stars: item.stargazers_count as number,
    fork: item.fork,
    language: item.language as string | null,
    url: `https://github.com/${USER}/${encodeURIComponent(item.name)}`,
  };
}

function attribute(tag: string, name: string): string | null {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? null;
}

export function parseContributionCalendar(html: string): ContributionDay[] | null {
  if (html.length > 1_000_000) return null;
  const days: ContributionDay[] = [];
  const cells = html.matchAll(/<td\b([^>]*)><\/td>\s*<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g);
  for (const [, cell, tooltip, text] of cells) {
    if (!attribute(cell, 'class')?.split(/\s+/).includes('ContributionCalendar-day')) continue;
    const date = attribute(cell, 'data-date');
    const rawLevel = attribute(cell, 'data-level');
    const level = Number(rawLevel);
    const id = attribute(cell, 'id');
    const count = /^No contributions? on\b/.test(text.trim()) ? 0
      : Number(text.trim().match(/^([\d,]+) contributions? on\b/)?.[1]?.replaceAll(',', ''));
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)
      || !Number.isFinite(Date.parse(`${date}T00:00:00Z`))
      || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
      || rawLevel === null || !Number.isInteger(level) || level < 0 || level > 4
      || !Number.isSafeInteger(count) || count < 0
      || !id || attribute(tooltip, 'for') !== id) return null;
    days.push({ date, count, level });
  }
  if (days.length < 300 || days.length > 372 || new Set(days.map(day => day.date)).size !== days.length) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  for (let index = 1; index < days.length; index++) {
    if (Date.parse(days[index].date) - Date.parse(days[index - 1].date) !== 86_400_000) return null;
  }
  return days;
}

async function loadContributions(fetcher: GithubFetch): Promise<ContributionDay[] | null> {
  try {
    const response = await fetcher(`https://github.com/users/${USER}/contributions`, {
      headers: { Accept: 'text/html', 'User-Agent': 'PortfoCLI' },
      next: { revalidate: HOUR },
      signal: AbortSignal.timeout(7000),
    });
    return response.ok ? parseContributionCalendar(await response.text()) : null;
  } catch {
    return null;
  }
}

export async function loadGithubPortfolio(fetcher: GithubFetch = fetch): Promise<GithubPortfolio> {
  const signal = AbortSignal.timeout(15000);
  const repos: GithubRepo[] = [];
  let complete = false;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await fetcher(`https://api.github.com/users/${USER}/repos?type=owner&per_page=${PAGE_SIZE}&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'PortfoCLI' },
      next: { revalidate: HOUR },
      signal,
    });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || payload.length > PAGE_SIZE) throw new Error('Invalid GitHub response');
    repos.push(...payload.map(parseRepo));
    if (payload.length < PAGE_SIZE) { complete = true; break; }
  }
  if (!complete || new Set(repos.map(repo => repo.name.toLowerCase())).size !== repos.length) {
    throw new Error('Incomplete GitHub repository list');
  }
  const ranked = [...repos].sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));
  return {
    publicRepoCount: repos.length,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    topRepos: ranked.filter(repo => !repo.fork).slice(0, 3),
    repos: ranked,
    contributions: await loadContributions(fetcher),
  };
}
