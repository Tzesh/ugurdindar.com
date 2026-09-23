import { expect, test, type Page } from '@playwright/test';

const command = (page: Page) => page.locator('input[name="command"]');
const composer = (page: Page) => command(page).locator('xpath=ancestor::form/..');

test('command input and Run fit the first 320×640 screen in every locale', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const locale of ['en', 'tr', 'de']) for (const section of ['', '?section=projects']) {
    await page.goto(`/${locale}${section}`);
    await expect(command(page)).toBeEnabled();
    await expect(command(page)).not.toBeFocused();
    for (const element of [command(page), page.getByTestId('run-command')]) {
      const box = await element.boundingBox();
      expect(box, `${locale}${section}: control is hidden`).not.toBeNull();
      expect(box!.x, `${locale}${section}: control starts offscreen`).toBeGreaterThanOrEqual(0);
      expect(box!.y, `${locale}${section}: control starts below screen`).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width, `${locale}${section}: control exceeds width`).toBeLessThanOrEqual(320);
      expect(box!.y + box!.height, `${locale}${section}: control exceeds height`).toBeLessThanOrEqual(640);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${locale}${section}: horizontal overflow`).toBeLessThanOrEqual(320);
  }
});

test('Projects quick command is a real link and focuses its output heading', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/en');
  const link = page.getByTestId('quick-commands').locator('a[href="/en?section=projects"]');
  await expect(link).toContainText('/projects');
  await link.click();
  await expect(page).toHaveURL(/\/en\?section=projects$/);
  const heading = page.getByTestId('entry').last().getByRole('heading', { name: 'Projects', level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
});

test('repeated keyboard commands keep the latest output directly below the composer', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  const history = page.getByTestId('output-history');
  for (const [index, [typed, heading]] of [['/projects', 'Projects'], ['/experience', 'Experience'], ['/projects', 'Projects']].entries()) {
    await command(page).fill(typed);
    await command(page).press('Enter');
    const latest = page.getByTestId('entry').last();
    const latestHeading = latest.getByRole('heading', { name: heading, level: 2 });
    await expect(latestHeading).toBeVisible();
    await expect(latestHeading).toBeInViewport();
    await expect.poll(async () => {
      const inputBox = await composer(page).boundingBox();
      const outputBox = await latest.boundingBox();
      if (!inputBox || !outputBox) return false;
      const gap = outputBox.y - (inputBox.y + inputBox.height);
      return gap >= -1 && gap <= 112;
    }, { message: `${typed}: latest output should sit directly below the composer` }).toBe(true);
    if (index === 1) {
      await expect(history).not.toHaveAttribute('open', '');
      await history.locator(':scope > summary').click();
      await expect(history.getByRole('heading', { name: 'Projects', level: 2 })).toBeVisible();
    }
    if (index === 2) {
      await expect(history).not.toHaveAttribute('open', '');
      await history.locator(':scope > summary').click();
      await expect(history.getByRole('heading', { name: 'Experience', level: 2 })).toBeVisible();
    }
  }
  await command(page).fill('clear');
  await command(page).press('Enter');
  await expect(page.getByTestId('entry')).toHaveCount(0);
  await expect(history).toHaveCount(0);
});
