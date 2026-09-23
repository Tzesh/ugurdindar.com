import { notFound } from 'next/navigation';
import { isLocale, locales, themes } from '../../../lib/commands';
import '../../globals.css';

// Only a fixed preference is read; no input is interpreted as code.
const themeScript = `try{var t=localStorage.getItem('portfocli-theme');document.documentElement.dataset.theme=${JSON.stringify(themes)}.includes(t)?t:'system'}catch{}`;

export function generateStaticParams() { return locales.map(lang => ({ lang })); }

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} data-theme="system" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body>{children}</body>
  </html>;
}
