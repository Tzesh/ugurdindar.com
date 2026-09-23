import assert from 'node:assert/strict';
import test from 'node:test';
import { loadGithubPortfolio, parseContributionCalendar } from '../lib/github.ts';

const repo = (name: string, stars = 0, fork = false) => ({
  name, description: `${name} description`, stargazers_count: stars, fork,
  language: 'TypeScript', private: false, owner: { login: 'Tzesh' },
  html_url: 'https://untrusted.example/ignored',
});

test('aggregates every public repo page, received stars, and top original repos', async () => {
  const first = Array.from({ length: 100 }, (_, index) => repo(`repo-${index}`, index === 0 ? 8 : 0));
  const second = [repo('second', 5), repo('popular-fork', 100, true)];
  const urls: string[] = [];
  const fetcher = (async (url: string) => {
    urls.push(url);
    if (url.includes('/contributions')) return new Response('', { status: 503 });
    return Response.json(/[?&]page=1(?:&|$)/.test(url) ? first : second);
  }) as typeof fetch;
  const result = await loadGithubPortfolio(fetcher);
  assert.equal(result.publicRepoCount, 102);
  assert.equal(result.totalStars, 113);
  assert.deepEqual(result.topRepos.map(item => item.name), ['repo-0', 'second', 'repo-1']);
  assert.equal(result.repos.find(item => item.name === 'second')?.url, 'https://github.com/Tzesh/second');
  assert.equal(result.contributions, null);
  assert.equal(urls.filter(url => url.includes('/repos?')).length, 2);
});

test('fails the whole snapshot if a later page fails or a repository is invalid', async () => {
  const first = Array.from({ length: 100 }, (_, index) => repo(`repo-${index}`));
  const laterFailure = (async (url: string) => new Response(/[?&]page=1(?:&|$)/.test(url) ? JSON.stringify(first) : 'unavailable', {
    status: /[?&]page=1(?:&|$)/.test(url) ? 200 : 503,
    headers: { 'Content-Type': 'application/json' },
  })) as typeof fetch;
  await assert.rejects(loadGithubPortfolio(laterFailure));

  const invalid = (async () => Response.json([repo('<script>', 7)])) as typeof fetch;
  await assert.rejects(loadGithubPortfolio(invalid));
});

test('reads only dated GitHub contribution cells and rejects incomplete markup', () => {
  const start = Date.UTC(2025, 0, 1);
  const html = Array.from({ length: 365 }, (_, index) => {
    const date = new Date(start + index * 86_400_000).toISOString().slice(0, 10);
    const count = index === 0 ? 2 : 0;
    const level = index === 0 ? 1 : 0;
    const label = count ? '2 contributions on January 1st.' : 'No contributions on January 2nd.';
    return `<td class="ContributionCalendar-day" data-level="${level}" id="day-${index}" data-date="${date}"></td><tool-tip for="day-${index}">${label}</tool-tip>`;
  }).join('');
  const days = parseContributionCalendar(html);
  assert.equal(days?.length, 365);
  assert.deepEqual(days?.[0], { date: '2025-01-01', count: 2, level: 1 });
  assert.equal(parseContributionCalendar(html.slice(0, 1000)), null);
  assert.equal(parseContributionCalendar(html.replace('data-level="1"', 'data-level="9"')), null);
  assert.equal(parseContributionCalendar(html.replace('data-date="2025-01-03"', 'data-date="2026-01-03"')), null);
});
