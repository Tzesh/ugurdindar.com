import { expect, test } from '@playwright/test';

test('landing shows verified proof and PDF; projects and all locales fit 320px', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByText('30M+', { exact: true })).toBeVisible();
  await expect(page.locator('a[download][href="/resume.pdf"]')).toBeVisible();

  await page.goto('/en?section=projects');
  const projects = page.getByTestId('output');
  await expect(projects).toContainText('Virtual Patient');
  await expect(projects).toContainText('Quality Pool');
  await expect(projects).not.toContainText(/SpringBootTemplate|Tzoptimizer|after verification|not included in the supplied résumé/i);

  await page.setViewportSize({ width: 320, height: 640 });
  for (const locale of ['en', 'tr', 'de']) {
    await page.goto(`/${locale}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${locale} landing overflows`).toBeLessThanOrEqual(320);
  }
});

test('keyboard shortcut, slash command and command suggestions work', async ({ page }) => {
  await page.goto('/en');
  const input = page.locator('input[name="command"]');
  await expect(input).toBeEnabled();
  await page.keyboard.press('Control+k');
  await expect(input).toBeFocused();
  await input.fill('/projects');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/en\?section=projects$/);
  await expect(input).toBeFocused();
  await input.fill('/resume');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/en\?section=resume$/);
  await expect(input).toBeFocused();
  await expect(input).toBeInViewport();
  await input.fill('theme d');
  const suggestion = page.getByTestId('suggestions').getByRole('button', { name: 'theme dark', exact: true });
  await expect(suggestion).toBeVisible();
  await suggestion.click();
  await expect(input).toHaveValue('theme dark');
  await expect(input).toBeFocused();
});

test('main navigation brings Experience heading into focus', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Experience' }).click();
  await expect(page).toHaveURL(/\/en\?section=experience$/);
  const heading = page.getByTestId('entry').last().getByRole('heading', { name: 'Experience', level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
  expect(await heading.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('statistics and GitHub show verified profile content', async ({ page }) => {
  await page.goto('/en?section=stats');
  const stats = page.getByTestId('output');
  for (const [label, value] of [['Organizations', '3'], ['Certificates', '12'], ['Résumé projects', '2'], ['Undergraduate GPA', '3.70']]) {
    await expect(stats.getByText(label, { exact: true }).locator('..').getByText(value, { exact: true })).toBeVisible();
  }
  await expect(stats).not.toContainText(/not available yet|waiting for verified/i);

  await page.goto('/en?section=github');
  const github = page.getByTestId('output');
  const profileLink = github.getByRole('link', { name: 'GitHub · Tzesh', exact: true });
  await expect(profileLink).toBeVisible();
  await expect(profileLink).toHaveAttribute('href', 'https://github.com/Tzesh');
  await expect(github.locator('a[href="https://github.com/VPatient/VPatientAPI"]')).toBeVisible();
  await expect(github).not.toContainText(/not available yet|waiting for verified/i);
});
