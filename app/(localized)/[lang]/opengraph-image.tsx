import { ImageResponse } from 'next/og';
import { isLocale } from '../../../lib/commands';
import { profile } from '../../../lib/profile';
import { showcase } from '../../../lib/showcase';

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response('Not found', { status: 404 });
  const copy = showcase[lang];

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: 44, background: '#0a1211', color: '#eef8f3' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid #315047', borderRadius: 24, backgroundImage: 'linear-gradient(125deg, #101d19, #142f26)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '24px 34px', borderBottom: '1px solid #315047', fontSize: 20, color: '#a0b9ae' }}>
          <div style={{ display: 'flex', gap: 9, marginRight: 26 }}>
            {['#e28d83', '#d9bd7e', '#75d5af'].map(color => <div key={color} style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />)}
          </div>
          <span>tzesh@portfolio:~</span>
          <span style={{ marginLeft: 'auto', color: '#7ae5bd' }}>/{lang}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 44px' }}>
          <div style={{ display: 'flex', fontSize: 17, letterSpacing: 3, color: '#7ae5bd' }}>{copy.eyebrow}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, fontSize: 86, fontWeight: 700, letterSpacing: -4 }}>
            {profile.name}<span style={{ color: '#7ae5bd', marginLeft: 8 }}>_</span>
          </div>
          <div style={{ display: 'flex', maxWidth: 910, marginTop: 12, fontSize: 33, lineHeight: 1.4, color: '#b8ccc2' }}>{copy.headline}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 24, fontSize: 22 }}>
            <span style={{ color: '#7ae5bd' }}>{'> whoami'}</span>
            <span>ugurdindar.com</span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
