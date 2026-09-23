import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, isSection, locales } from '../../../lib/commands';
import { biography } from '../../../lib/biography';
import { profile } from '../../../lib/profile';
import Terminal from '../../../components/Terminal';

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ section?: string | string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    metadataBase: new URL(profile.siteUrl),
    title: `${profile.name} — ${profile.session}`,
    description: `${profile.title}. ${biography[lang].intro}`,
    alternates: { canonical: `/${lang}`, languages: Object.fromEntries([...locales.map(code => [code, `/${code}`]), ['x-default', '/en']]) },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(lang)) notFound();
  return <Terminal key={lang} locale={lang} initialSection={isSection(query.section) ? query.section : null} />;
}
