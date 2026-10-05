const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');
const { Script } = require('node:vm');
const { validate, render, personalize } = require('../scripts/personalize.cjs');
const root = join(__dirname, '..');
const config = { ...require('../profile.json'), name: 'Jamie — O\'Neil <$&>', email: 'jamie@example.org', githubUrl: 'https://github.com/jamie', linkedinUrl: 'https://www.linkedin.com/in/jamie', resumeUrl: 'assets/my-resume.pdf', location: 'Lahore & Remote', bio: 'I build <useful> things. $&', portfolios: {} };

test('all templates personalize safely and repeatedly without losing roles or projects', () => {
  for (const folder of readdirSync(root).filter(name => /^\d\d-/.test(name))) {
    const source = readFileSync(join(root, folder, 'index.html'), 'utf8');
    const profile = validate(config);
    const html = render(source, profile);
    assert.equal(render(html, profile), html, `${folder}: not idempotent`);
    assert.match(html, /Jamie — O&#39;Neil &lt;\$&amp;&gt;/);
    assert.match(html, /href="mailto:jamie@example.org"/);
    assert.match(html, /href="https:\/\/github.com\/jamie"/);
    assert.match(html, /I build &lt;useful&gt; things\. \$&amp;/);
    assert.ok(html.includes(source.match(/data-profile-role="([^"]*)"/)[1]));
    assert.equal((html.match(/https:\/\/github.com\/yourusername\//g) || []).length, (source.match(/https:\/\/github.com\/yourusername\//g) || []).length, 'sample project URLs changed');
    for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(script[1]);
    const next = render(html, validate({ ...config, name: '</script><script>alert(1)</script>', bio: '<img src=x onerror=alert(1)>' }));
    assert.equal((next.match(/<script>/g) || []).length, 1, 'injected script');
    assert.doesNotMatch(next, /<img src=x/);
  }
});

test('rejects executable links, malformed fields, credentials and traversal', () => {
  for (const overrides of [{ email: 'bad' }, { name: '' }, { githubUrl: 'javascript:alert(1)' }, { linkedinUrl: 'https://u:p@example.org' }, { resumeUrl: '../secret.pdf' }, { resumeUrl: '%2e%2e/secret.pdf' }, { resumeUrl: '%2e%2e%5csecret.pdf' }, { resumeUrl: 'data:text/html,bad' }]) {
    assert.throws(() => validate({ ...config, ...overrides }));
  }
});

test('preview, one-page scope, overrides and validation before writes', () => {
  const temporary = mkdtempSync(join(tmpdir(), 'devfolio-personalize-'));
  try {
    const folders = ['01-software-engineer', '02-computer-science'];
    for (const folder of folders) {
      mkdirSync(join(temporary, folder));
      writeFileSync(join(temporary, folder, 'index.html'), readFileSync(join(root, folder, 'index.html')));
    }
    const original = readFileSync(join(temporary, folders[0], 'index.html'), 'utf8');
    assert.equal(personalize({ root: temporary, config, check: true }).length, 2);
    assert.equal(readFileSync(join(temporary, folders[0], 'index.html'), 'utf8'), original);
    assert.throws(() => personalize({ root: temporary, config: { ...config, portfolios: { [folders[1]]: { email: 'bad' } } } }));
    assert.equal(readFileSync(join(temporary, folders[0], 'index.html'), 'utf8'), original);
    const overrides = { ...config, portfolios: { [folders[0]]: { name: 'Taylor Smith' } } };
    assert.deepEqual(personalize({ root: temporary, config: overrides, portfolio: folders[0] }), [folders[0]]);
    assert.match(readFileSync(join(temporary, folders[0], 'index.html'), 'utf8'), /Taylor Smith/);
    assert.deepEqual(personalize({ root: temporary, config: overrides, portfolio: folders[0] }), []);
    assert.throws(() => personalize({ root: temporary, config: { ...config, typo: true } }));
    assert.throws(() => personalize({ root: temporary, config, portfolio: '../elsewhere' }));
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
