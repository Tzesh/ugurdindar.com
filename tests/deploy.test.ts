import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

type Container = { image: string; running: boolean };
type Event = { tool: string; args: string[] };
type State = { scenario: string; containers: Record<string, Container>; events: Event[] };

const fakeCommand = `#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const statePath = process.env.FAKE_DEPLOY_STATE;
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const tool = path.basename(process.argv[1]);
const args = process.argv.slice(2);
state.events.push({ tool, args });
const save = () => fs.writeFileSync(statePath, JSON.stringify(state));
const fail = () => { save(); process.exit(1); };
if (tool === 'curl') { save(); process.exit(0); }
const name = args.at(-1);
switch (args[0]) {
  case 'rm':
    if (!state.containers[name]) fail();
    delete state.containers[name];
    break;
  case 'run': {
    const container = args[args.indexOf('--name') + 1];
    state.containers[container] = { image: name, running: true };
    console.log('fake-id');
    break;
  }
  case 'inspect':
    if (!state.containers[name]) fail();
    if (args.includes('--format')) console.log(
      state.scenario === 'candidate-fails' && name.endsWith('-candidate') ||
      state.scenario === 'promoted-fails' && name === 'ugurdindar.com' && state.containers[name].image === 'new-image'
        ? 'unhealthy' : 'healthy');
    break;
  case 'container':
    if (!state.containers[name]) fail();
    break;
  case 'port':
    console.log('127.0.0.1:49152');
    break;
  case 'rename':
    state.containers[args[2]] = state.containers[args[1]];
    delete state.containers[args[1]];
    break;
  case 'stop':
    state.containers[name].running = false;
    break;
  case 'start':
    state.containers[name].running = true;
    break;
  case 'logs':
  case 'tag':
    break;
  default:
    fail();
}
save();
`;

async function deploy(scenario: string, port = '8080') {
  const directory = await mkdtemp(join(tmpdir(), 'portfocli-deploy-'));
  const statePath = join(directory, 'state.json');
  const initial: State = {
    scenario, containers: { 'ugurdindar.com': { image: 'old-image', running: true } }, events: [],
  };
  try {
    await writeFile(statePath, JSON.stringify(initial));
    for (const tool of ['docker', 'curl']) await writeFile(join(directory, tool), fakeCommand, { mode: 0o755 });
    const result = spawnSync('bash', ['.github/scripts/deploy.sh'], {
      cwd: process.cwd(), encoding: 'utf8', timeout: 10_000,
      env: { ...process.env, PATH: `${directory}:${process.env.PATH}`, FAKE_DEPLOY_STATE: statePath, PORT: port, DEPLOY_IMAGE: 'new-image' },
    });
    return { result, state: JSON.parse(await readFile(statePath, 'utf8')) as State };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

const docker = (event: Event, command: string, name?: string) => event.tool === 'docker' && event.args[0] === command && (!name || event.args.includes(name));

test('failed candidate leaves the current container running', async () => {
  const { result, state } = await deploy('candidate-fails');
  assert.notEqual(result.status, 0);
  assert.deepEqual(state.containers, { 'ugurdindar.com': { image: 'old-image', running: true } });
  assert.ok(state.events.some(event => docker(event, 'run', 'ugurdindar.com-candidate')));
  assert.ok(!state.events.some(event => docker(event, 'rename') || docker(event, 'stop')));
  assert.ok(!state.events.some(event => event.tool === 'curl'));
});

test('failed promoted container restores the old one', async () => {
  const { result, state } = await deploy('promoted-fails');
  assert.notEqual(result.status, 0);
  assert.deepEqual(state.containers, { 'ugurdindar.com': { image: 'old-image', running: true } });
  const events = state.events;
  const positions = [
    events.findIndex(event => docker(event, 'rename', 'ugurdindar.com-previous')),
    events.findIndex(event => docker(event, 'stop', 'ugurdindar.com-previous')),
    events.findIndex(event => docker(event, 'run', 'ugurdindar.com')),
    events.findIndex(event => docker(event, 'rm', 'ugurdindar.com')),
    events.findIndex(event => docker(event, 'start', 'ugurdindar.com')),
  ];
  assert.ok(positions.every(index => index >= 0));
  assert.ok(positions.every((index, at) => at === 0 || index > positions[at - 1]));
  assert.equal(state.events.filter(event => event.tool === 'curl').length, 1);
});

test('successful promotion retains the stopped previous container', async () => {
  const { result, state } = await deploy('success');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(state.containers, {
    'ugurdindar.com': { image: 'new-image', running: true },
    'ugurdindar.com-previous': { image: 'old-image', running: false },
  });
  const events = state.events;
  const candidateCheck = events.findIndex(event => event.tool === 'curl' && event.args.includes('http://127.0.0.1:49152/en'));
  const rename = events.findIndex(event => docker(event, 'rename', 'ugurdindar.com-previous'));
  const productionCheck = events.findIndex(event => event.tool === 'curl' && event.args.includes('http://127.0.0.1:8080/en'));
  const tag = events.findIndex(event => docker(event, 'tag', 'ugurdindar.com:latest'));
  assert.ok(candidateCheck >= 0 && candidateCheck < rename && rename < productionCheck && productionCheck < tag);
  assert.equal(events.filter(event => event.tool === 'curl').length, 2);
});

test('invalid port exits before touching Docker', async () => {
  const { result, state } = await deploy('success', '0');
  assert.notEqual(result.status, 0);
  assert.deepEqual(state.events, []);
  assert.deepEqual(state.containers, { 'ugurdindar.com': { image: 'old-image', running: true } });
});
