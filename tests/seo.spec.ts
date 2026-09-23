import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';

const origin = 'https://ugurdindar.com';
const locales = { en: 'en_US', tr: 'tr_TR', de: 'de_DE' } as const;
const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function head(html: string) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  expect(match, 'metadata must be present in the initial HTML head').not.toBeNull();
  return match![1];
}

function attribute(tag: string, name: string) {
  return tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1];
}

function meta(htmlHead: string, kind: 'name' | 'property', key: string) {
  const tag = (htmlHead.match(/<meta\b[^>]*>/gi) ?? []).find(value => attribute(value, kind) === key);
  expect(tag, `missing ${key} metadata`).toBeTruthy();
  const value = attribute(tag!, 'content');
  expect(value, `empty ${key} metadata`).toBeTruthy();
  return value!;
}

function link(htmlHead: string, rel: string, path: string) {
  return (htmlHead.match(/<link\b[^>]*>/gi) ?? []).find(tag =>
    attribute(tag, 'rel') === rel && new URL(attribute(tag, 'href') ?? '/', origin).pathname === path);
}

test('social crawlers receive complete locale metadata in the initial head', async ({ request }) => {
  const root = await request.get('/', {
    maxRedirects: 0, headers: { 'user-agent': 'facebookexternalhit/1.1', 'accept-language': 'de-DE' },
  });
  expect(root.status()).toBeGreaterThanOrEqual(300);
  expect(root.status()).toBeLessThan(400);
  expect(new URL(root.headers().location, origin).pathname).toBe('/de');

  const cases = [
    ['facebookexternalhit/1.1', '/en', 'en'],
    ['Twitterbot/1.0', '/tr', 'tr'],
    ['LinkedInBot/1.0', '/de', 'de'],
    ['WhatsApp/2.23.20', '/en?section=projects', 'en'],
  ] as const;
  for (const [agent, path, locale] of cases) {
    const response = await request.get(path, { headers: { 'user-agent': agent } });
    expect(response.status(), `${agent} ${path}`).toBe(200);
    const htmlHead = head(await response.text());
    const canonical = `${origin}/${locale}`;
    expect(attribute(link(htmlHead, 'canonical', `/${locale}`)!, 'href')).toBe(canonical);
    expect(meta(htmlHead, 'property', 'og:type')).toBe('website');
    expect(meta(htmlHead, 'property', 'og:url')).toBe(canonical);
    expect(meta(htmlHead, 'property', 'og:site_name')).toBe('PortfoCLI');
    expect(meta(htmlHead, 'property', 'og:locale')).toBe(locales[locale]);
    expect(meta(htmlHead, 'name', 'twitter:card')).toBe('summary_large_image');
    expect(meta(htmlHead, 'name', 'twitter:title')).toBe(meta(htmlHead, 'property', 'og:title'));
    expect(meta(htmlHead, 'name', 'twitter:description')).toBe(meta(htmlHead, 'property', 'og:description'));
    const image = new URL(meta(htmlHead, 'property', 'og:image'));
    expect(image.origin).toBe(origin);
    expect(image.pathname.startsWith(`/${locale}/opengraph-image`)).toBe(true);
    expect(meta(htmlHead, 'name', 'twitter:image')).toBe(image.href);
    expect(meta(htmlHead, 'property', 'og:image:width')).toBe('1200');
    expect(meta(htmlHead, 'property', 'og:image:height')).toBe('630');
    expect(link(htmlHead, 'describedby', '/llms.txt')).toBeTruthy();
  }
});

test('each locale social image resolves to a distinct 1200×630 PNG', async ({ request }) => {
  const hashes = new Set<string>();
  for (const locale of Object.keys(locales)) {
    const page = await request.get(`/${locale}`, { headers: { 'user-agent': 'facebookexternalhit/1.1' } });
    const image = new URL(meta(head(await page.text()), 'property', 'og:image'));
    const response = await request.get(`${image.pathname}${image.search}`);
    expect(response.status(), image.href).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const bytes = await response.body();
    expect(bytes.subarray(0, 8).equals(png)).toBe(true);
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    hashes.add(createHash('sha256').update(bytes).digest('hex'));
  }
  expect(hashes.size).toBe(3);
});

test('robots, sitemap, llms discovery and native icons resolve', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/User-agent:\s*\*[\s\S]*Allow:\s*\/[\s\S]*Sitemap:\s*https:\/\/ugurdindar\.com\/sitemap\.xml/i);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  for (const locale of Object.keys(locales)) expect(await sitemap.text()).toContain(`${origin}/${locale}`);

  const llms = await request.get('/llms.txt');
  expect(llms.status()).toBe(200);
  expect(llms.headers()['content-type']).toContain('text/plain');
  const discovery = await llms.text();
  for (const path of ['/en', '/tr', '/de', '/resume.pdf']) expect(discovery).toContain(`${origin}${path}`);

  const htmlHead = head(await (await request.get('/en')).text());
  for (const [path, rel] of [['/favicon.ico', 'icon'], ['/icon.svg', 'icon'], ['/apple-icon.png', 'apple-touch-icon']]) {
    expect(link(htmlHead, rel, path), `${path} missing from head`).toBeTruthy();
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const bytes = await response.body();
    if (path.endsWith('.png')) expect(bytes.subarray(0, 8).equals(png)).toBe(true);
    if (path.endsWith('.ico')) expect(bytes.subarray(0, 4)).toEqual(Buffer.from([0, 0, 1, 0]));
    if (path.endsWith('.svg')) expect(bytes.toString()).toMatch(/<svg(?:\s|>)/i);
  }
});
