const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const root = process.env.TEMPLATE_ROOT || join(__dirname, '..');
const folders = readdirSync(root).filter(name => /^\d\d-/.test(name));

test('portfolio browser workflows', async t => {
  const browser = await chromium.launch(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {});
  t.after(() => browser.close());
  for (const folder of folders) {
    await t.test(`${folder}: mobile navigation, desktop layout, degraded browser`, async () => {
      const url = pathToFileURL(join(root, folder, 'index.html')).href;
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        await page.goto(url);
        assert.equal(await page.locator('#navLinks').evaluate(el => getComputedStyle(el).visibility), 'hidden');
        const menu = page.locator('#menuBtn, #menu');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await page.locator('#navLinks a').first().focus();
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.ok(await menu.evaluate(el => document.activeElement === el));
        await menu.click();
        await page.locator('#navLinks a').first().click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        for (const width of [320, 390, 768, 1280]) {
          await page.setViewportSize({ width, height: 900 });
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow at ${width}`);
        }
        await page.close();
        const fallback = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
        try {
          await fallback.goto(url);
          assert.ok(await fallback.locator('#navLinks').isVisible());
          assert.equal(await fallback.locator('.reveal').first().evaluate(el => getComputedStyle(el).opacity), '1');
        } finally { await fallback.close(); }
        const degraded = await browser.newPage({ reducedMotion: 'reduce' });
        try {
          await degraded.addInitScript(() => { window.IntersectionObserver = undefined; HTMLCanvasElement.prototype.getContext = () => null; });
          degraded.on('pageerror', error => errors.push(error.message));
          await degraded.goto(url);
          assert.equal(await degraded.locator('#year').textContent(), String(new Date().getFullYear()));
        } finally { await degraded.close(); }
        assert.deepEqual(errors, []);
      } finally { if (!page.isClosed()) await page.close(); }
    });
  }
  await t.test('local controls and safe command boundaries', async () => {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const open = folder => page.goto(pathToFileURL(join(root, folder, 'index.html')).href);
    try {
      for (const folder of ['01-software-engineer', '07-cybersecurity']) {
        await open(folder);
        for (const command of ['help', 'constructor', '__proto__', '<img src=x onerror=alert(1)>']) {
          await page.locator('#terminalInput').fill(command);
          await page.locator('#terminalForm').evaluate(el => el.requestSubmit());
        }
        assert.equal(await page.locator('#terminalOutput img').count(), 0);
        assert.match(await page.locator('#terminalOutput').textContent(), /Unknown command: constructor|Unsupported command: constructor/);
        await page.evaluate(() => { for (let i=0;i<80;i++) { document.getElementById('terminalInput').value='help'; document.getElementById('terminalForm').requestSubmit(); } });
        assert.ok(await page.locator('#terminalOutput > *').count() <= 100);
        await page.locator('[data-command="clear"]').click();
        assert.equal(await page.locator('#terminalOutput > *').count(), 0);
      }
      await open('02-computer-science');
      await page.locator('[data-topic="systems"]').click();
      assert.match(await page.locator('#knowledgeDetail').textContent(), /Operating Systems/);
      await open('03-fullstack-developer');
      await page.locator('[data-filter="backend"]').click();
      assert.ok(await page.locator('.project.hidden').count() > 0);
      await page.locator('[data-filter="all"]').click();
      assert.equal(await page.locator('.project.hidden').count(), 0);
      await open('04-frontend-engineer');
      await page.locator('#themeBtn').click();
      const theme = await page.locator('html').getAttribute('data-theme');
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      await page.locator('#spaceRange').evaluate(el => { el.value='40'; el.dispatchEvent(new Event('input')); });
      assert.equal(await page.locator('#spaceOut').textContent(), '40px');
      await open('08-ai-machine-learning');
      const initial = await page.locator('#accText').textContent();
      await page.locator('#dataRange').evaluate(el => { el.value='100'; el.dispatchEvent(new Event('input')); });
      assert.notEqual(await page.locator('#accText').textContent(), initial);
      await open('09-data-scientist');
      await page.locator('[data-view="bars"]').click();
      assert.equal(await page.locator('#dataChart rect').count(), 5);
      await page.locator('[data-view="scatter"]').click();
      assert.equal(await page.locator('#dataChart circle').count(), 13);
      assert.deepEqual(errors, []);
    } finally { await page.close(); }
  });
  await t.test('theme storage failure and corrupt preference are nonfatal', async () => {
    for (const mode of ['blocked', 'corrupt']) {
      const page = await browser.newPage({ colorScheme: 'dark', reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        await page.addInitScript(mode => {
          if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('unavailable'); } });
          else localStorage.setItem('emma-theme', 'invalid');
        }, mode);
        await page.goto(pathToFileURL(join(root, '04-frontend-engineer/index.html')).href);
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
        await page.locator('#themeBtn').click();
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
        assert.equal(await page.locator('#year').textContent(), String(new Date().getFullYear()));
        assert.deepEqual(errors, []);
      } finally { await page.close(); }
    }
  });
  await t.test('network animation stops off-screen and on reduced motion', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
    try {
      await page.addInitScript(() => {
        window.networkDraws = 0;
        const arc = CanvasRenderingContext2D.prototype.arc;
        CanvasRenderingContext2D.prototype.arc = function(...args) { window.networkDraws++; return arc.apply(this, args); };
      });
      await page.goto(pathToFileURL(join(root, '08-ai-machine-learning/index.html')).href);
      await page.waitForFunction(() => window.networkDraws > 18);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(100);
      const reducedCount = await page.evaluate(() => window.networkDraws);
      await page.waitForTimeout(100);
      assert.equal(await page.evaluate(() => window.networkDraws), reducedCount);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForFunction(count => window.networkDraws > count, reducedCount);
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const hiddenCount = await page.evaluate(() => window.networkDraws);
      await page.waitForTimeout(100);
      assert.equal(await page.evaluate(() => window.networkDraws), hiddenCount);
    } finally { await page.close(); }
  });
  await t.test('personalized pages show shared details and run safely', async () => {
    const { render, validate } = require('../scripts/personalize.cjs');
    const { readFileSync } = require('node:fs');
    const profile = validate({ ...require('../profile.json'), name: 'Jamie O\'Neil </script> $&', email: 'jamie@example.org', githubUrl: 'https://github.com/jamie', linkedinUrl: 'https://www.linkedin.com/in/jamie', bio: 'Building useful <interfaces>.' });
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      for (const folder of folders) {
        // Serve the generated standalone document in a real page; no external resources exist.
        await page.goto('about:blank');
        await page.setContent(render(readFileSync(join(root, folder, 'index.html'), 'utf8'), profile));
        assert.match(await page.title(), /Jamie O'Neil <\/script> \$& —/);
        assert.ok((await page.locator('h1').textContent()).includes(profile.name));
        assert.equal(await page.locator('meta[name="author"]').getAttribute('content'), profile.name);
        assert.equal(await page.locator('[data-profile-href="email"]').first().getAttribute('href'), 'mailto:jamie@example.org');
        assert.equal(await page.locator('[data-profile-text="bio"]').textContent(), profile.bio);
        if (await page.locator('#terminalForm').count()) {
          await page.locator('#terminalInput').fill('contact');
          await page.locator('#terminalForm').evaluate(el => el.requestSubmit());
          assert.match(await page.locator('#terminalOutput').textContent(), /jamie@example.org/);
        }
      }
      assert.deepEqual(errors, []);
    } finally { await page.close(); }
  });
});
