import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { skills } from '../content/skills.mjs';

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    result.push(...(entry.isDirectory() ? await files(path) : [path]));
  }
  return result;
}
const htmlFiles = (await files('dist')).filter(path => path.endsWith('.html'));

test('every upstream skill has a bilingual guide and the exact original download', async () => {
  const originals = (await readdir('content/upstream')).filter(name => name.endsWith('.md'));
  assert.equal(skills.length, 14);
  assert.equal(new Set(skills.map(skill => skill.id)).size, 14);
  assert.deepEqual(skills.map(skill => `${skill.id}.md`).sort(), originals.sort());
  assert.equal(htmlFiles.length, 15);
  for (const skill of skills) {
    for (const value of [skill.title, skill.short, skill.intro, skill.when, skill.rule, skill.mistake, skill.example, ...skill.steps]) {
      assert.equal(value.length, 2);
      assert.ok(value[0].length > 0);
      assert.match(value[1], /[\u3400-\u9fff]/);
    }
    assert.equal(await readFile(`dist/upstream/${skill.id}.md`, 'utf8'), await readFile(`content/upstream/${skill.id}.md`, 'utf8'));
  }
});

test('all generated relative links, assets, and section anchors resolve under a project subpath', async () => {
  const origin = 'https://example.test/superpower-explained/';
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const current = new URL(file.slice(resolve('dist').length + 1), origin);
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(reference, current);
      if (url.origin !== new URL(origin).origin) continue;
      assert.ok(url.pathname.startsWith('/superpower-explained/'), `${file}: ${reference} escapes project path`);
      const target = resolve('dist', url.pathname.slice('/superpower-explained/'.length));
      assert.ok((await stat(target)).isFile(), `${file}: missing ${reference}`);
      if (url.hash) assert.ok((await readFile(target, 'utf8')).includes(`id="${url.hash.slice(1)}"`), `${file}: missing anchor ${reference}`);
    }
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `${file}: expected one primary heading`);
    assert.ok(html.includes('lang="zh-CN"'));
  }
});

test('source references and license retain attribution to the pinned upstream', async () => {
  const metadata = JSON.parse(await readFile('content/source.json', 'utf8'));
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    assert.ok(html.includes(metadata.commit));
    assert.ok(html.includes('Jesse Vincent'));
    assert.ok(!html.includes('href="https://github.com/obra/superpowers/blob/main/'));
  }
  assert.match(await readFile('dist/LICENSE-upstream.txt', 'utf8'), /Copyright \(c\) 2025 Jesse Vincent/);
});
