import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const input = (page: Page) => page.locator('input[name="command"]');
const entries = (page: Page) => page.getByTestId('entry');
const language = (page: Page) => page.getByRole('combobox', { name: /^(Language|Dil|Sprache)$/ });
const theme = (page: Page) => page.getByRole('combobox', { name: /^(Theme|Tema|Design)$/ });
const navigation = (page: Page) => page.getByRole('navigation', { name: /^(Main navigation|Ana gezinme|Hauptnavigation)$/ });

test('PDF-sourced profile: three locales, no JavaScript, downloads and mobile reflow', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 640 }, baseURL: 'http://127.0.0.1:3000' });
  const page = await context.newPage();
  for (const [locale, pdfLanguage, education] of [['tr', 'İngilizce', 'Bölüm birinciliği'], ['en', 'English', 'First in the department'], ['de', 'Englisch', 'Jahrgangsbester']]) {
    await page.goto(`/${locale}?section=resume`);
    const output = page.getByTestId('output');
    for (const value of ['Garanti BBVA Technology', 'Ford Otosan', 'Baykar Technology', '06/2023', '10/2021', '08/2021', '3.70', education, 'Apache Kafka', 'OBSS Code Master 2021', 'ScrumInc Scrum Team Member', 'Virtual Patient', 'Quality Pool']) {
      await expect(output).toContainText(value);
    }
    await expect(output).not.toContainText('23/01/2001');
    await expect(output).not.toContainText('Bulgaria');
    await expect(output.getByRole('link', { name: 'mail@ugurdindar.com' })).toHaveAttribute('href', 'mailto:mail@ugurdindar.com');
    await expect(output.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://linkedin.com/in/ugurdindar/');
    await expect(output.getByRole('link', { name: 'GitHub · Tzesh', exact: true })).toHaveAttribute('href', 'https://github.com/Tzesh');
    await expect(output.getByRole('link', { name: 'VPatient API', exact: true })).toHaveAttribute('href', 'https://github.com/VPatient/VPatientAPI');
    const download = output.locator('a[download]');
    await expect(download).toHaveCount(1);
    await expect(download).toContainText(pdfLanguage);
    const response = await context.request.get((await download.getAttribute('href'))!);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/pdf');
    const hash = (data: Buffer) => createHash('sha256').update(data).digest('hex');
    expect(hash(await response.body())).toBe(hash(await readFile('public/resume.pdf')));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await context.close();
});
async function run(page: Page, command: string) {
  await input(page).fill(command);
  await page.getByTestId('run-command').click();
}

for (const [locale, projects, help] of [['en', 'Projects', 'Help'], ['tr', 'Projeler', 'Yardım'], ['de', 'Projekte', 'Hilfe']]) {
  test(`${locale}: direct URL, translated help, metadata and reload`, async ({ page }) => {
    await page.goto(`/${locale}?section=projects`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByTestId('output').getByRole('heading', { name: projects, exact: true }).last()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/${locale}(?:\\?|$)`));
    for (const alternate of ['en', 'tr', 'de']) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${alternate}"]`)).toHaveAttribute('href', new RegExp(`/${alternate}(?:\\?|$)`));
    }
    expect(await page.title()).toBeTruthy();
    await page.reload();
    await expect(page.getByTestId('output').getByRole('heading', { name: projects, exact: true }).last()).toBeVisible();
    await run(page, 'help');
    await expect(entries(page).last().getByRole('heading', { name: help, exact: true })).toBeVisible();
    await expect(entries(page).last()).toContainText('light');
    await expect(entries(page).last()).toContainText('system');
  });
}

test('language switch preserves section and explicit URL overrides saved preference', async ({ page }) => {
  await page.goto('/en?section=projects');
  await language(page).selectOption('tr');
  await expect(page).toHaveURL(/\/tr\?section=projects$/);
  await expect(page.getByTestId('output').getByRole('heading', { name: 'Projeler', exact: true }).last()).toBeVisible();
  await language(page).selectOption('de');
  await expect(page).toHaveURL(/\/de\?section=projects$/);
  await page.goto('/en?section=projects');
  await expect(language(page)).toHaveValue('en');
});

test('root locale uses saved preference before browser language, unsupported falls back to English', async ({ browser }) => {
  for (const [saved, browserLocale, expected] of [['tr', 'de-DE', 'tr'], ['', 'de-DE', 'de'], ['', 'fr-FR', 'en'], ['fr', 'de-DE', 'de']]) {
    const context = await browser.newContext({ locale: browserLocale, baseURL: 'http://127.0.0.1:3000' });
    if (saved) await context.addCookies([{ name: 'portfocli-lang', value: saved, url: 'http://127.0.0.1:3000' }]);
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(new RegExp(`/${expected}/?$`));
    await context.close();
  }
});

test('menu and command share output; history navigation does not execute again', async ({ page }) => {
  await page.goto('/en');
  await navigation(page).getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/section=projects/);
  const sectionContent = () => entries(page).last().locator('div').filter({ has: page.locator('h2') }).first();
  const menuText = await sectionContent().innerText();
  await run(page, 'about');
  await expect(page).toHaveURL(/section=about/);
  const before = await entries(page).count();
  await run(page, 'projects');
  await expect(entries(page)).toHaveCount(before + 1);
  await expect(sectionContent()).toHaveText(menuText, { useInnerText: true });
  await expect(page).toHaveURL(/section=projects/);
  await page.goBack();
  await expect(page).toHaveURL(/section=about/);
  await expect(entries(page).last().getByRole('heading', { name: 'About', exact: true })).toBeVisible();
  await expect(entries(page)).toHaveCount(1);
  await expect(entries(page).last().getByRole('heading', { name: 'About', exact: true })).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL(/section=projects/);
  await expect(entries(page).last().getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  await expect(entries(page)).toHaveCount(1);
  await expect(entries(page).last().getByRole('heading', { name: 'Projects', exact: true })).toBeFocused();
  await input(page).focus();
  await input(page).press('ArrowUp');
  await expect(input(page)).toHaveValue('projects');
  await input(page).press('ArrowUp');
  await expect(input(page)).toHaveValue('about');
  await run(page, 'clear');
  await expect(entries(page)).toHaveCount(0);
});

test('aliases, unknown commands and invalid arguments preserve preferences', async ({ page }) => {
  await page.goto('/tr');
  for (const alias of ['about', 'hakkımda', 'hakkimda', 'über', 'uber']) {
    await run(page, alias);
    await expect(entries(page).last().getByRole('heading', { name: 'Hakkımda', exact: true })).toBeVisible();
  }
  for (const alias of ['projects', 'projeler', 'projekte']) {
    await run(page, alias);
    await expect(entries(page).last().getByRole('heading', { name: 'Projeler', exact: true })).toBeVisible();
  }
  await run(page, 'theme dark');
  await expect(theme(page)).toHaveValue('dark');
  for (const invalid of ['theme invalid', 'theme light extra', 'lang fr', 'lang de extra']) {
    await run(page, invalid);
    await expect(theme(page)).toHaveValue('dark');
    await expect(language(page)).toHaveValue('tr');
    await expect(entries(page).last()).toContainText(/geçersiz|hatalı/i);
  }
  await run(page, 'nonsense');
  await expect(entries(page).last()).toContainText(/yardım|help/i);
  await run(page, 'theme');
  await expect(entries(page).last()).toContainText('Koyu');
  await expect(entries(page).last()).toContainText('system');
  await run(page, 'lang');
  await expect(entries(page).last()).toContainText('tr');
  await expect(entries(page).last()).toContainText('de');
});

test('keyboard history, suggestions, Escape, Tab and brief status notification', async ({ page }) => {
  await page.goto('/en');
  await run(page, 'about');
  await run(page, 'projects');
  await input(page).focus();
  await input(page).press('ArrowUp');
  await expect(input(page)).toHaveValue('projects');
  await input(page).press('ArrowUp');
  await expect(input(page)).toHaveValue('about');
  await input(page).press('ArrowDown');
  await expect(input(page)).toHaveValue('projects');
  await input(page).press('ArrowDown');
  await expect(input(page)).toHaveValue('');
  await input(page).fill('pro');
  await expect(page.getByTestId('suggestions')).toBeVisible();
  await input(page).press('Escape');
  await expect(page.getByTestId('suggestions')).not.toBeVisible();
  await input(page).press('Tab');
  await expect(input(page)).not.toBeFocused();
  await run(page, 'skills');
  await expect(page.getByRole('status')).not.toBeEmpty();
  expect((await page.getByRole('status').innerText()).length).toBeLessThan(200);
});

test('theme control and command persist; system responds to operating system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/en');
  await expect(theme(page)).toHaveValue('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'system');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  const darkBackground = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await expect(page.locator('body')).not.toHaveCSS('background-color', darkBackground);
  await theme(page).selectOption('dark');
  await page.reload();
  await expect(theme(page)).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('portfocli-theme'))).toBe('dark');
  await run(page, 'theme light');
  await expect(theme(page)).toHaveValue('light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await run(page, 'theme system');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'system');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', darkBackground);
});

test('320px reflow, no autofocus, reduced motion and inert command markup', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/de');
  await expect(input(page)).not.toBeFocused();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Uğur Dindar');
  const dialogs: string[] = [];
  page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.dismiss(); });
  await run(page, '<img src=x onerror=alert(1)>' + 'x'.repeat(500));
  await expect(entries(page).last()).toBeVisible();
  expect(dialogs).toEqual([]);
  await expect(page.getByTestId('output').locator('img[src="x"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
});

test('no JavaScript: translated content and semantic navigation remain available; downloads resolve', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:3000' });
  const page = await context.newPage();
  for (const [locale, projects, resume] of [['en', 'Projects', 'Résumé'], ['tr', 'Projeler', 'CV'], ['de', 'Projekte', 'Lebenslauf']]) {
    await page.goto(`/${locale}?section=projects`);
    await expect(page.getByTestId('output').getByRole('heading', { name: projects, exact: true }).last()).toBeVisible();
    await navigation(page).getByRole('link', { name: resume, exact: true }).click();
    await expect(page).toHaveURL(/section=resume/);
    await expect(page.getByTestId('output').getByRole('heading', { name: resume, exact: true }).last()).toBeVisible();
    for (const link of await page.locator('a[download]').all()) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
      const response = await context.request.get(new URL(href!, page.url()).href);
      expect(response.ok()).toBe(true);
    }
  }
  const sitemap = await context.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  for (const locale of ['tr', 'en', 'de']) expect(await sitemap.text()).toContain(`/${locale}`);
  await context.close();
});

test('repeated output produces a fresh brief screen reader notification', async ({ page }) => {
  await page.goto('/en');
  await run(page, 'about');
  const status = page.getByRole('status');
  await expect(status).not.toBeEmpty();
  const firstNotice = await status.innerText();
  await run(page, 'about');
  await expect(entries(page)).toHaveCount(2);
  await expect(status).not.toHaveText(firstNotice);
  expect((await status.innerText()).length).toBeLessThan(200);
});

test('320px help reflows in every locale', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const locale of ['en', 'tr', 'de']) {
    await page.goto(`/${locale}?section=help`);
    await expect(page.getByTestId('output').getByRole('heading', { level: 2 })).toBeVisible();
    const width = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(width.content, `${locale} help exceeds ${width.viewport}px viewport`).toBeLessThanOrEqual(width.viewport);
  }
});
