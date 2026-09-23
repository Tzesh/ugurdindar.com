import { expect, test } from '@playwright/test';

const original = { name: 'Tzoptimizer', description: '<img src=x onerror=alert(1)>', stars: 3, fork: false, language: 'TypeScript', url: 'https://evil.example/repo' };
const fork = { name: 'ForkedRepo', description: null, stars: 6, fork: true, language: null, url: 'https://evil.example/fork' };
const snapshot = { publicRepoCount: 2, totalStars: 9, topRepos: [original], repos: [fork, original], contributions: null };

test('GitHub panel shows real API totals, safe repo links, and honest activity fallback', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.route('**/api/github', route => route.fulfill({ json: snapshot }));
  await page.goto('/en?section=github');
  const panel = page.getByTestId('github-panel');
  await expect(panel.getByText('Public repositories', { exact: true })).toBeVisible();
  await expect(panel.getByText('Stars received', { exact: true })).toBeVisible();
  await expect(panel.getByText('9', { exact: true })).toBeVisible();
  await expect(panel.getByRole('heading', { name: 'Tzoptimizer' })).toBeVisible();
  await expect(panel).toContainText('<img src=x onerror=alert(1)>');
  await expect(panel.locator('img[src="x"]')).toHaveCount(0);
  await expect(panel.getByRole('link', { name: /Tzoptimizer/ })).toHaveAttribute('href', 'https://github.com/Tzesh/Tzoptimizer');
  await expect(panel.getByText('The calendar is unavailable here.')).toBeVisible();
  await panel.getByText('All public repositories').click();
  await expect(panel.getByRole('link', { name: 'ForkedRepo' })).toHaveAttribute('href', 'https://github.com/Tzesh/ForkedRepo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('GitHub panel offers retry after an API failure', async ({ page }) => {
  let requests = 0;
  let unavailable = true;
  await page.route('**/api/github', route => {
    requests++;
    return unavailable ? route.fulfill({ status: 503, json: { error: 'github_unavailable' } }) : route.fulfill({ json: snapshot });
  });
  await page.goto('/tr?section=github');
  const panel = page.getByTestId('github-panel');
  await expect(panel.getByRole('alert')).toContainText('Canlı GitHub verileri');
  await expect(panel.getByText('0', { exact: true })).toHaveCount(0);
  const beforeRetry = requests;
  unavailable = false;
  await panel.getByRole('button', { name: 'Tekrar dene' }).click();
  await expect(panel.getByText('Herkese açık depolar', { exact: true })).toBeVisible();
  expect(requests).toBeGreaterThan(beforeRetry);
});

test('contribution calendar shows its real range and can be scrolled with a keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  const start = Date.UTC(2025, 0, 1);
  const contributions = Array.from({ length: 365 }, (_, index) => ({
    date: new Date(start + index * 86_400_000).toISOString().slice(0, 10),
    count: index === 0 ? 2 : 0,
    level: index === 0 ? 1 : 0,
  }));
  await page.route('**/api/github', route => route.fulfill({ json: { ...snapshot, contributions } }));
  await page.goto('/en?section=github');
  const panel = page.getByTestId('github-panel');
  await expect(panel.getByText(/2 visible contributions/)).toBeVisible();
  await expect(panel.getByText(/Jan 1, 2025/)).toBeVisible();
  await expect(panel.getByText(/Dec 31, 2025/)).toBeVisible();
  await expect(panel.getByText('Updates hourly')).toBeVisible();
  await expect(panel.getByText('Less')).toBeVisible();
  await expect(panel.getByText('More')).toBeVisible();
  const calendar = panel.getByRole('region', { name: 'Contribution calendar, horizontally scrollable' });
  await calendar.focus();
  await expect(calendar).toBeFocused();
  expect(await calendar.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  await calendar.press('ArrowRight');
  await expect.poll(() => calendar.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
});
