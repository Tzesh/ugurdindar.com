import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const input = (page: Page) => page.locator('input[name="command"]');
const scene = (page: Page) => page.getByTestId('secret-scene');
const effect = (page: Page) => page.getByTestId('ambient-effect');
const soundtrack = (page: Page) => page.getByTestId('soundtrack');
const player = (page: Page) => page.locator('audio');
const tracks = { melek: '/audio/send_me_an_angel.mp3', tzesh: '/audio/eiffel_65_blue.mp3' } as const;

async function run(page: Page, command: string) {
  await input(page).fill(command);
  await input(page).press('Enter');
}

async function expectStopped(page: Page) {
  await expect(soundtrack(page)).toHaveCount(0);
  await expect(player(page)).toHaveCount(1);
  expect(await player(page).getAttribute('src')).toBeFalsy();
  await expect(player(page)).toHaveJSProperty('paused', true);
  await expect.poll(() => player(page).evaluate(audio => (audio as HTMLAudioElement).currentTime)).toBe(0);
}

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/.*/, route => route.abort());
});

test('local audio plays for both secrets and Close restores the saved theme', async ({ page }) => {
  const mediaRequests: string[] = [];
  const youtubeRequests: string[] = [];
  page.on('request', request => {
    if (request.resourceType() === 'media') mediaRequests.push(request.url());
    if (/youtube(?:-nocookie)?\.com/.test(request.url())) youtubeRequests.push(request.url());
  });
  await page.goto('/en');
  await expect(player(page)).toHaveCount(1);
  expect(mediaRequests).toEqual([]);
  await page.getByRole('combobox', { name: 'Theme' }).selectOption('aurora');

  for (const mode of ['melek', 'tzesh'] as const) {
    await run(page, `/${mode}`);
    await expect(scene(page)).toHaveAttribute('data-mode', mode);
    await expect(effect(page)).toHaveAttribute('data-effect', mode);
    await expect(soundtrack(page)).toHaveCount(1);
    await expect(soundtrack(page)).toHaveAttribute('src', tracks[mode]);
    await expect(soundtrack(page)).toHaveAttribute('controls', '');
    await expect(soundtrack(page)).toHaveAttribute('loop', '');
    await expect(soundtrack(page)).toHaveAttribute('preload', 'none');
    await expect(soundtrack(page)).toHaveJSProperty('muted', false);
    await expect.poll(() => soundtrack(page).evaluate(audio => (audio as HTMLAudioElement).duration), { timeout: 15_000 }).toBeGreaterThan(1);
    await expect.poll(() => soundtrack(page).evaluate(audio => (audio as HTMLAudioElement).currentTime), { timeout: 15_000 }).toBeGreaterThan(0.1);
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
  }
  await expect(effect(page)).toContainText(/[ﾊﾐﾋｰｳｼﾅ]/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'matrix');
  expect(await page.evaluate(() => localStorage.getItem('portfocli-theme'))).toBe('aurora');
  await page.getByTestId('close-secret').click();
  await expect(scene(page)).toHaveCount(0);
  await expectStopped(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'aurora');
  expect(mediaRequests.every(url => url.startsWith('http://127.0.0.1:3000/audio/'))).toBe(true);
  expect(youtubeRequests).toEqual([]);
});

test('reduced motion, music control and 320px fit remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  await run(page, '/melek');
  await expect(effect(page)).toContainText(/[♥❤♡]/);
  await expect(effect(page).locator('span').first()).toHaveCSS('animation-name', 'none');
  await expect(page.getByTestId('toggle-motion')).toBeHidden();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(effect(page)).toHaveAttribute('data-paused', 'false');
  await page.getByTestId('toggle-motion').click();
  await expect(effect(page)).toHaveAttribute('data-paused', 'true');
  await page.getByTestId('toggle-motion').click();
  await expect(effect(page)).toHaveAttribute('data-paused', 'false');

  const music = page.getByTestId('toggle-music');
  await expect(music).toHaveAttribute('aria-pressed', 'true');
  await music.click();
  await expect(music).toHaveAttribute('aria-pressed', 'false');
  await expect(soundtrack(page)).toHaveJSProperty('paused', true);
  await expect.poll(() => soundtrack(page).evaluate(audio => (audio as HTMLAudioElement).currentTime)).toBe(0);
  await music.click();
  await expect(music).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => soundtrack(page).evaluate(audio => (audio as HTMLAudioElement).currentTime), { timeout: 15_000 }).toBeGreaterThan(0.1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await run(page, '/tzesh');
  await expect(scene(page)).toHaveAttribute('data-mode', 'tzesh');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.getByRole('combobox', { name: 'Theme' }).selectOption('ember');
  await run(page, '/tzesh');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'matrix');
  await page.getByTestId('close-secret').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'ember');
  await expectStopped(page);
  await run(page, '/tzesh');
  await page.reload();
  await expect(scene(page)).toHaveCount(0);
  await expectStopped(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'ember');
});

test('Escape and clear stop audio; repeated commands keep one player', async ({ page }) => {
  await page.goto('/en');
  await run(page, '/melek');
  await run(page, '/melek');
  await expect(scene(page)).toHaveCount(1);
  await expect(soundtrack(page)).toHaveCount(1);
  await expect(player(page)).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(scene(page)).toHaveCount(0);
  await expectStopped(page);

  await run(page, '/tzesh');
  await expect(scene(page)).toHaveAttribute('data-mode', 'tzesh');
  await run(page, 'clear');
  await expect(scene(page)).toHaveCount(0);
  await expectStopped(page);
});

test('a blocked first play can be retried from the music button', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLMediaElement.prototype.play;
    let rejectFirst = true;
    HTMLMediaElement.prototype.play = function () {
      if (rejectFirst) {
        rejectFirst = false;
        return Promise.reject(new DOMException('Playback blocked', 'NotAllowedError'));
      }
      return original.call(this);
    };
  });
  await page.goto('/en');
  await run(page, '/melek');
  const music = page.getByTestId('toggle-music');
  await expect(music).toHaveAttribute('aria-pressed', 'false');
  await expect(soundtrack(page)).toHaveJSProperty('paused', true);
  await music.click();
  await expect(music).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => soundtrack(page).evaluate(audio => (audio as HTMLAudioElement).currentTime), { timeout: 15_000 }).toBeGreaterThan(0.1);
});

test('local MP3 responses support metadata, range requests and exact asset bytes', async ({ request }) => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  for (const filename of ['send_me_an_angel.mp3', 'eiffel_65_blue.mp3']) {
    const path = `/audio/${filename}`;
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('audio/mpeg');
    expect(hash(await response.body())).toBe(hash(await readFile(`public${path}`)));
    const range = await request.get(path, { headers: { Range: 'bytes=0-1023' } });
    expect(range.status()).toBe(206);
    expect(range.headers()['content-range']).toMatch(/^bytes 0-1023\/\d+$/);
    expect((await range.body()).length).toBe(1024);
  }
});
