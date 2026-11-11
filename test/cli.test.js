import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(projectRoot, 'src', 'index.js');

function runCli(args, input = '') {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: projectRoot,
    encoding: 'utf8',
    input,
    timeout: 10_000
  });
}

test('help lists the terminal and file-edit commands', () => {
  const result = runCli(['help']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /edit <task>/);
  assert.match(result.stdout, /run <command>/);
});

test('chat startup displays the app version', () => {
  const result = runCli(['chat'], 'exit\n');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /MY_CODE_OG CLI v0\.0\.1/);
});

test('denying a terminal command prevents it from running', () => {
  const result = runCli(
    ['run', `node -e "process.stdout.write('COMMAND_EXECUTED')"`],
    'deny\n'
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Denied; command was not run\./);
  assert.match(result.stdout, /\[ ALLOW \].*\[ DENY \]/);
  assert.equal(result.stdout.split(/\r?\n/).includes('COMMAND_EXECUTED'), false);
});

test('allowing a terminal command runs it', () => {
  const result = runCli(['run', 'node --version'], 'allow\n');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /v\d+\.\d+\.\d+/);
  assert.match(result.stdout, /Command completed successfully/);
});
