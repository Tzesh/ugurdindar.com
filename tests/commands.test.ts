import assert from 'node:assert/strict';
import test from 'node:test';
import { parseCommand, suggestions, resolveLocale, themeUsage } from '../lib/commands.ts';

test('all languages and common accentless aliases resolve regardless of UI language', () => {
  for (const value of ['about', 'hakkımda', 'HAKKIMDA', 'hakkimda', 'über', 'uber', 'ueber'])
    assert.deepEqual(parseCommand(value), { kind: 'section', section: 'about' });
  for (const value of ['projects', 'projeler', 'projekte'])
    assert.deepEqual(parseCommand(value), { kind: 'section', section: 'projects' });
  for (const value of ['help', 'yardım', 'yardim', 'hilfe'])
    assert.deepEqual(parseCommand(value), { kind: 'section', section: 'help' });
});

test('only allowed arguments produce an action', () => {
  assert.deepEqual(parseCommand(' theme dark '), { kind: 'theme', value: 'dark' });
  assert.deepEqual(parseCommand('dil de'), { kind: 'lang', value: 'de' });
  assert.deepEqual(parseCommand('theme'), { kind: 'theme' });
  assert.deepEqual(parseCommand('lang'), { kind: 'lang' });
  assert.deepEqual(parseCommand('clear'), { kind: 'clear' });
  for (const value of ['theme blue', 'lang fr', 'theme dark extra', 'lang en extra', 'clear now', 'about x'])
    assert.equal(parseCommand(value).kind, 'invalid', value);
  for (const value of ['<script>alert(1)</script>', 'about;ls', 'https://example.com', 'toString', '__proto__'])
    assert.equal(parseCommand(value).kind, 'unknown', value);
  assert.deepEqual(parseCommand('  '), { kind: 'empty' });
});

test('suggestions are valid canonical commands and support aliases', () => {
  assert.ok(suggestions('hak').includes('about'));
  assert.ok(suggestions('pr').includes('projects'));
  assert.deepEqual(suggestions('nonsense'), []);
});

test('one leading slash and whoami resolve without opening shell syntax', () => {
  assert.deepEqual(parseCommand('/projects'), { kind: 'section', section: 'projects' });
  assert.deepEqual(parseCommand('/theme dark'), { kind: 'theme', value: 'dark' });
  assert.deepEqual(parseCommand('/lang tr'), { kind: 'lang', value: 'tr' });
  assert.deepEqual(parseCommand('whoami'), { kind: 'section', section: 'about' });
  assert.deepEqual(parseCommand('/whoami'), { kind: 'section', section: 'about' });
  assert.deepEqual(parseCommand('/theme'), { kind: 'theme' });
  assert.deepEqual(parseCommand('/lang'), { kind: 'lang' });
  for (const value of ['//projects', '//theme dark', '/projects;ls', '/bin/sh'])
    assert.equal(parseCommand(value).kind, 'unknown', value);
  assert.equal(parseCommand('/theme dark;ls').kind, 'invalid');
});

test('suggestions complete slash commands and preference values with executable text', () => {
  assert.ok(suggestions('who').includes('about'));
  assert.ok(suggestions('/pro').includes('/projects'));
  assert.deepEqual(suggestions('theme d'), ['theme dark']);
  assert.deepEqual(suggestions('/lang t'), ['/lang tr']);
  assert.deepEqual(suggestions('tema li'), ['tema light']);
  assert.deepEqual(suggestions('/theme '), ['/theme light', '/theme dark', '/theme system', '/theme aurora', '/theme ember', '/theme blueprint', '/theme matrix']);
  assert.deepEqual(suggestions('//pro'), []);
  for (const value of ['about', '/projects', 'theme dark', '/lang tr', 'tema light'])
    assert.notEqual(parseCommand(value).kind, 'unknown', value);
});

test('new visual themes parse strictly and appear as executable suggestions', () => {
  assert.equal(themeUsage, 'theme [light|dark|system|aurora|ember|blueprint|matrix]');
  for (const value of ['aurora', 'ember', 'blueprint', 'matrix']) {
    assert.deepEqual(parseCommand(`/theme ${value}`), { kind: 'theme', value });
    assert.deepEqual(suggestions(`theme ${value.slice(0, 2)}`), [`theme ${value}`]);
  }
  for (const value of ['theme ocean', '/theme ember extra', '//theme aurora'])
    assert.notEqual(parseCommand(value).kind, 'theme', value);
});

test('explicit preference then browser language then English', () => {
  assert.equal(resolveLocale('de', 'tr-TR,en;q=0.9'), 'de');
  assert.equal(resolveLocale(undefined, 'tr-TR,en;q=0.9'), 'tr');
  assert.equal(resolveLocale('bad', 'de-DE'), 'de');
  assert.equal(resolveLocale(undefined, 'fr-FR,en;q=0.5'), 'en');
  assert.equal(resolveLocale(undefined, undefined), 'en');
});

test('secret commands are strict and stay out of discovery suggestions', () => {
  for (const value of ['melek', 'tzesh']) {
    assert.deepEqual(parseCommand(`/${value}`), { kind: 'easterEgg', value });
    assert.deepEqual(parseCommand(value.toUpperCase()), { kind: 'easterEgg', value });
    assert.equal(parseCommand(`/${value} extra`).kind, 'invalid');
    assert.equal(parseCommand(`//${value}`).kind, 'unknown');
    assert.ok(!suggestions('').includes(value));
  }
  assert.deepEqual(parseCommand('theme matrix'), { kind: 'theme', value: 'matrix' });
});
