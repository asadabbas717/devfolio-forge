const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const { Script } = require('node:vm');
const root = join(__dirname, '..');
const portfolios = readdirSync(root).filter(name => /^\d\d-/.test(name));

test('collection contains ten independent templates', () => assert.equal(portfolios.length, 10));
for (const folder of portfolios) {
  test(`${folder}: executable scripts and valid local navigation`, () => {
    const html = readFileSync(join(root, folder, 'index.html'), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'duplicate IDs');
    for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `missing ${match[1]}`);
    for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(match[1], { filename: folder });
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
    assert.doesNotMatch(html, /<script\b[^>]*src=|\beval\s*\(|\binnerHTML\s*=/);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /prefers-reduced-motion/);
  });
}
