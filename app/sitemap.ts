import type { MetadataRoute } from 'next';
import { locales } from '../lib/commands';
import { profile } from '../lib/profile';
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map(lang => [lang, new URL(`/${lang}`, profile.siteUrl).href]));
  return locales.map(lang => ({ url: languages[lang], alternates: { languages } }));
}
