import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { resolveLocale } from '../../lib/commands';

export default async function Entry() {
  const [jar, request] = await Promise.all([cookies(), headers()]);
  redirect(`/${resolveLocale(jar.get('portfocli-lang')?.value, request.get('accept-language') ?? undefined)}`);
}
