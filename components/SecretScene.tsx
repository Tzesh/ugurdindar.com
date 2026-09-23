'use client';

import { useEffect, useState, type CSSProperties, type RefObject } from 'react';
import type { EasterEgg, Locale } from '../lib/commands';
import styles from './SecretScene.module.css';

export const tracks = {
  melek: { src: '/audio/send_me_an_angel.mp3', artist: 'Real Life', title: "Send Me an Angel ’89" },
  tzesh: { src: '/audio/eiffel_65_blue.mp3', artist: 'Eiffel 65', title: 'Blue (Da Ba Dee)' },
};
const messages = {
  en: { unlocked: 'Secret unlocked', melek: 'A little love in the terminal.', tzesh: 'Welcome to the other side.', pause: 'Pause effects', resume: 'Resume effects', stop: 'Stop music', play: 'Play music', close: 'Close mode', hint: 'If sound does not start, press play in the player.', error: 'The audio file could not be loaded. Try playing it again.', reduced: 'Motion reduced to match your device settings.' },
  tr: { unlocked: 'Gizli komut bulundu', melek: 'Terminale biraz sevgi.', tzesh: 'Diğer tarafa hoş geldin.', pause: 'Efektleri duraklat', resume: 'Efektleri sürdür', stop: 'Müziği durdur', play: 'Müziği çal', close: 'Modu kapat', hint: 'Ses başlamazsa oynatıcıdaki oynat düğmesine bas.', error: 'Ses dosyası yüklenemedi. Yeniden oynatmayı dene.', reduced: 'Cihaz tercihine göre hareket azaltıldı.' },
  de: { unlocked: 'Geheimnis entdeckt', melek: 'Ein wenig Liebe im Terminal.', tzesh: 'Willkommen auf der anderen Seite.', pause: 'Effekte pausieren', resume: 'Effekte fortsetzen', stop: 'Musik stoppen', play: 'Musik abspielen', close: 'Modus schließen', hint: 'Falls kein Ton startet, drücke Play im Player.', error: 'Die Audiodatei konnte nicht geladen werden. Versuche es erneut.', reduced: 'Bewegung gemäß Geräteeinstellung reduziert.' },
};
const glyphs = ['ﾊﾐﾋｰｳｼﾅﾓ01ﾆｻﾜﾂﾃﾗﾘ10ﾎﾏｹﾒ', '01ﾘﾃﾒﾓﾆﾄﾁﾈﾍﾏﾑｳｼ10ﾅﾓｾﾘ', 'ﾈﾇﾌｴﾔﾖ01ｼﾒﾓﾘﾂｷｸｹｺ10ﾀﾃﾄ'];

export default function SecretScene({ mode, locale, audioRef, onClose }: { mode: EasterEgg | null; locale: Locale; audioRef: RefObject<HTMLAudioElement | null>; onClose: () => void }) {
  const [paused, setPaused] = useState(false);
  const [music, setMusic] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = messages[locale];
  const track = tracks[mode ?? 'melek'];

  useEffect(() => { setPaused(false); }, [mode]);
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
      audio?.removeAttribute('src');
      audio?.load();
    };
  }, [audioRef]);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); audio.currentTime = 0; }
    else {
      if (audio.error) audio.load();
      void audio.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
    }
  }

  return <>
    {mode && <div className={styles.ambient} data-testid="ambient-effect" data-effect={mode} data-paused={paused} aria-hidden="true">
      {Array.from({ length: mode === 'melek' ? 24 : 36 }, (_, index) => <span key={index} style={{
        '--x': `${(index * 37 + 3) % 100}%`, '--duration': `${8 + index % 9}s`,
        '--delay': `${-index * 1.7}s`, '--size': `${18 + index % 5 * 5}px`,
        '--drift': `${index % 2 ? 65 : -65}px`, '--rest': `${(index * 29) % 90}%`,
      } as CSSProperties}>{mode === 'melek' ? (index % 3 ? '♡' : '♥') : glyphs[index % glyphs.length]}</span>)}
    </div>}
    <section hidden={!mode} className={styles.scene} data-testid={mode ? 'secret-scene' : undefined} data-mode={mode} aria-label={mode ? `/${mode}` : undefined}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>{t.unlocked} <code>/{mode}</code></span>
        <h2><span aria-hidden="true">{mode === 'melek' ? '♡' : '❯_'}</span> {mode && t[mode]}</h2>
        <p className={styles.track}>{track.artist}<strong>{track.title}</strong></p>
        <div className={styles.controls}>
          <button data-testid="toggle-motion" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? t.resume : t.pause}</button>
          <button data-testid="toggle-music" type="button" aria-pressed={music} onClick={toggleMusic}>{music ? t.stop : t.play}</button>
          <button data-testid="close-secret" type="button" onClick={onClose}>{t.close}<span aria-hidden="true"> ×</span></button>
        </div>
        <p className={styles.reduced}>{t.reduced}</p>
      </div>
      <div className={styles.soundtrack}>
        <audio ref={audioRef} data-testid={mode ? 'soundtrack' : undefined} aria-label={`${track.artist} — ${track.title}`} controls loop preload="none"
          onPlay={() => setMusic(true)} onPause={() => setMusic(false)} onEmptied={() => setMusic(false)}
          onLoadStart={() => setFailed(false)} onError={() => { setFailed(true); setMusic(false); }} />
        <p role={failed ? 'alert' : undefined}>{failed ? t.error : t.hint}</p>
      </div>
    </section>
  </>;
}
