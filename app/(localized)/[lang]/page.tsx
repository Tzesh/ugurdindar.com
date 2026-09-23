import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, isSection, locales } from '../../../lib/commands';
import { biography } from '../../../lib/biography';
import { profile } from '../../../lib/profile';
import Terminal from '../../../components/Terminal';

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ section?: string | string[] }> };
const socialLocales = { en: 'en_US', tr: 'tr_TR', de: 'de_DE' };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = `${profile.name} — ${profile.session}`;
  const description = `${profile.title}. ${biography[lang].intro}`;
  return {
    title,
    description,
    alternates: { canonical: `/${lang}`, languages: Object.fromEntries([...locales.map(code => [code, `/${code}`]), ['x-default', '/en']]) },
    openGraph: {
      type: 'website', title, description, url: `/${lang}`, siteName: profile.session,
      locale: socialLocales[lang], alternateLocale: locales.filter(code => code !== lang).map(code => socialLocales[code]),
    },
    twitter: {
      card: 'summary_large_image', title, description,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(lang)) notFound();
  return <Terminal key={lang} locale={lang} initialSection={isSection(query.section) ? query.section : null} />;
}
