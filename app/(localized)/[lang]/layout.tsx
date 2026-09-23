import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, themes } from '../../../lib/commands';
import { profile } from '../../../lib/profile';
import '../../globals.css';

export const metadata: Metadata = { metadataBase: new URL(profile.siteUrl) };

// Only a fixed preference is read; no input is interpreted as code.
const themeScript = `try{var t=localStorage.getItem('portfocli-theme');document.documentElement.dataset.theme=${JSON.stringify(themes)}.includes(t)?t:'system'}catch{}`;

export function generateStaticParams() { return locales.map(lang => ({ lang })); }

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} data-theme="system" suppressHydrationWarning>
    <head><link rel="describedby" href="/llms.txt" type="text/plain" /><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body>{children}</body>
  </html>;
}
