import { expect, test, type Page } from '@playwright/test';

const themeSelect = (page: Page) => page.getByRole('combobox', { name: /^(Theme|Tema|Design)$/ });
const credentials = (page: Page) => page.getByTestId('output').locator('a[data-credential]');

test('new themes sync studio, select, command, storage and locale', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/en');
  const select = themeSelect(page);
  await expect(select).toBeEnabled();
  const studio = page.getByTestId('appearance');
  await expect(studio).toBeVisible();
  if (!(await studio.evaluate(element => (element as HTMLDetailsElement).open))) await studio.locator('summary').click();
  await studio.getByRole('button', { name: 'Aurora', exact: true }).click();
  await expect(studio.getByRole('button', { name: 'Aurora', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(studio.getByRole('button', { name: 'Aurora', exact: true })).toHaveAccessibleDescription('Violet haze & electric mint');
  await expect(select).toHaveValue('aurora');

  for (const [theme, scheme] of [['aurora', 'dark'], ['ember', 'dark'], ['blueprint', 'light']]) {
    await select.selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('html')).toHaveCSS('color-scheme', scheme);
    expect(await page.evaluate(() => localStorage.getItem('portfocli-theme'))).toBe(theme);
    await page.reload();
    await expect(themeSelect(page)).toHaveValue(theme);
    await page.emulateMedia({ colorScheme: scheme === 'dark' ? 'light' : 'dark' });
    await expect(page.locator('html')).toHaveCSS('color-scheme', scheme);
  }

  await page.getByRole('combobox', { name: 'Language' }).selectOption('de');
  await expect(page).toHaveURL(/\/de$/);
  await expect(themeSelect(page)).toHaveValue('blueprint');
  const input = page.locator('input[name="command"]');
  await input.fill('/theme ember');
  await input.press('Enter');
  await expect(themeSelect(page)).toHaveValue('ember');
  expect(await page.evaluate(() => localStorage.getItem('portfocli-theme'))).toBe('ember');
});

test('experience, projects and skills expose source credential links without JavaScript', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, baseURL: 'http://127.0.0.1:3000' });
    const page = await context.newPage();
    for (const section of ['experience', 'projects', 'skills', 'resume']) {
      await page.goto(`/en?section=${section}`);
      expect(await credentials(page).count(), `${section} lacks a credential link`).toBeGreaterThanOrEqual(1);
      for (const link of await credentials(page).all()) expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
      if (section === 'skills' || section === 'resume') {
        await expect(credentials(page)).toHaveCount(12);
        await expect(credentials(page).filter({ hasText: 'IBM Full Stack Software Developer Assessment' }))
          .toHaveAttribute('href', 'https://www.coursera.org/account/accomplishments/certificate/RD4RTDXYFCXB');
      }
    }
    await context.close();
  }
});

test('new themes and sections fit a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const [locale, theme, section] of [['en', 'aurora', 'experience'], ['tr', 'ember', 'projects'], ['de', 'blueprint', 'skills']]) {
    await page.goto(`/${locale}?section=${section}`);
    await themeSelect(page).selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${locale}/${section}/${theme} overflows`).toBeLessThanOrEqual(320);
  }
});
