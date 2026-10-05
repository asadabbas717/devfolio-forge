const { readFileSync, writeFileSync, renameSync, unlinkSync, readdirSync } = require('node:fs');
const { join, resolve } = require('node:path');

const fields = ['name', 'email', 'githubUrl', 'linkedinUrl', 'resumeUrl', 'location', 'bio'];
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const safeJson = value => JSON.stringify(value).replace(/[<>&/\u2028\u2029]/g, char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);

function validate(profile) {
  for (const field of fields) {
    if (typeof profile[field] !== 'string' || profile[field].length > (field === 'bio' ? 2000 : 300)) throw new Error(`Invalid ${field}: expected a short string.`);
    if (field !== 'bio' && !profile[field].trim()) throw new Error(`${field} cannot be empty.`);
    if (/[\u0000-\u001f\u007f]/.test(profile[field])) throw new Error(`${field} cannot contain control characters.`);
  }
  if (!/^[^\s@<>"?&#]+@[^\s@<>"?&#]+\.[^\s@<>"?&#]+$/.test(profile.email)) throw new Error('Invalid email address.');
  for (const field of ['githubUrl', 'linkedinUrl']) {
    let url;
    try { url = new URL(profile[field]); } catch { throw new Error(`Invalid ${field}: use a complete HTTPS URL.`); }
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`${field} must be HTTPS without credentials.`);
  }
  // Resumes may be hosted HTTPS URLs or relative files; reject executable schemes and traversal.
  const resume = profile.resumeUrl;
  if (/^https:/i.test(resume)) {
    const url = new URL(resume);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Invalid resume URL.');
  } else if (/[:\\?#<>\u0000-\u001f]/.test(decodeURIComponent(resume)) || resume.startsWith('/') || decodeURIComponent(resume).startsWith('/') || decodeURIComponent(resume).split('/').some(part => part === '..')) {
    throw new Error('resumeUrl must be an HTTPS URL or a relative file path without traversal.');
  }
  const words = profile.name.trim().split(/\s+/);
  return {
    ...profile,
    firstName: words[0],
    homeLabel: `${profile.name} home`,
    initials: [words[0], ...(words.length > 1 ? [words.at(-1)] : [])].map(word => word.match(/[\p{L}\p{N}]/u)?.[0] || 'P').join('').toUpperCase(),
    githubLabel: profile.githubUrl.replace(/^https:\/\//, '').replace(/\/$/, ''),
    linkedinLabel: profile.linkedinUrl.replace(/^https:\/\//, '').replace(/\/$/, ''),
    githubUsername: new URL(profile.githubUrl).pathname.split('/').filter(Boolean)[0] || '',
    linkedinUsername: new URL(profile.linkedinUrl).pathname.split('/').filter(Boolean).at(-1) || ''
  };
}

function render(html, profile) {
  const get = key => {
    if (!Object.hasOwn(profile, key)) throw new Error(`Unknown managed field: ${key}`);
    return profile[key];
  };
  html = html.replace(/<!--profile:(\w+)-->[\s\S]*?<!--\/profile:\1-->/g, (match, key) => `<!--profile:${key}-->${escapeHtml(get(key))}<!--/profile:${key}-->`);
  html = html.replace(/<[^>]+\bdata-profile-(href|content|aria-label|text)="([^"]+)"[^>]*>/g, (tag, attribute, key) => {
    if (attribute === 'text') return tag;
    let value = get(key);
    if (attribute === 'href' && key === 'email') value = `mailto:${value}`;
    // Match actual attributes, never the data-profile annotation itself.
    return tag.replace(new RegExp(`(?<=\\s)${attribute}="[^"]*"`), () => `${attribute}="${escapeHtml(value)}"`);
  });
  html = html.replace(/<title data-profile-text="name" data-profile-role="([^"]*)">[\s\S]*?<\/title>/g, (match, role) => match.replace(/>[\s\S]*?<\/title>/, () => `>${escapeHtml(profile.name)} — ${role}</title>`));
  html = html.replace(/<meta\b[^>]*data-profile-description="([^"]*)"[^>]*>/g, (tag, pattern) => {
    const description = pattern.replace('{{name}}', escapeHtml(profile.name));
    return tag.replace(/(?<=\s)content="[^"]*"/, () => `content="${description}"`);
  });
  html = html.replace(/<p\b[^>]*data-profile-text="bio"[^>]*>[\s\S]*?<\/p>/g, match => profile.bio ? match.replace(/>[\s\S]*?<\/p>/, () => `>${escapeHtml(profile.bio)}</p>`) : match);
  html = html.replace(/\/\*profile:initials\*\/[\s\S]*?\/\*\/profile:initials\*\//g, () => `/*profile:initials*/${safeJson(profile.initials)}/*/profile:initials*/`);
  html = html.replace(/\/\*profile:data\*\/[\s\S]*?\/\*\/profile:data\*\//g, () => `/*profile:data*/${safeJson({ name: profile.name, email: profile.email, githubUrl: profile.githubUrl, linkedinUrl: profile.linkedinUrl, resumeUrl: profile.resumeUrl })}/*/profile:data*/`);
  return html;
}

function personalize({ root, config, portfolio, check = false }) {
  const folders = readdirSync(root).filter(folder => /^\d\d-/.test(folder));
  const allowed = new Set([...fields, 'portfolios']);
  for (const key of Object.keys(config)) if (!allowed.has(key)) throw new Error(`Unknown profile field: ${key}`);
  if (!config.portfolios || typeof config.portfolios !== 'object' || Array.isArray(config.portfolios)) throw new Error('portfolios must be an object.');
  for (const [folder, overrides] of Object.entries(config.portfolios)) {
    if (!folders.includes(folder)) throw new Error(`Unknown portfolio: ${folder}`);
    if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) throw new Error(`Invalid overrides for ${folder}`);
    for (const field of Object.keys(overrides)) if (!fields.includes(field)) throw new Error(`Unknown override: ${field}`);
  }
  if (portfolio && !folders.includes(portfolio)) throw new Error(`Unknown portfolio: ${portfolio}`);
  const selected = portfolio ? [portfolio] : folders;
  // Validate and render every selected page before writing anything.
  const changes = selected.map(folder => {
    const profile = validate({ ...config, ...config.portfolios[folder] });
    const path = join(root, folder, 'index.html');
    const original = readFileSync(path, 'utf8');
    if (!original.includes('<!--profile:name-->')) throw new Error(`Missing managed fields: ${folder}`);
    return { folder, path, original, updated: render(original, profile) };
  }).filter(change => change.original !== change.updated);
  if (!check) for (const change of changes) {
    const temporary = `${change.path}.personalize.tmp`;
    let created = false;
    try {
      writeFileSync(temporary, change.updated, { encoding: 'utf8', flag: 'wx' });
      created = true;
      renameSync(temporary, change.path);
    } finally { if (created) try { unlinkSync(temporary); } catch (error) { if (error.code !== 'ENOENT') throw error; } }
  }
  return changes.map(change => change.folder);
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    let check = false, portfolio;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--check') check = true;
      else if (args[i] === '--portfolio' && args[i + 1]) portfolio = args[++i];
      else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
    }
    const root = resolve(__dirname, '..');
    const config = JSON.parse(readFileSync(join(root, 'profile.json'), 'utf8').replace(/^\uFEFF/, ''));
    const changed = personalize({ root, config, portfolio, check });
    console.log(`${check ? 'Would update' : 'Updated'} ${changed.length} portfolio(s)${changed.length ? ': ' + changed.join(', ') : '.'}`);
  } catch (error) { console.error(`Personalization failed: ${error.message}`); process.exitCode = 1; }
}

module.exports = { validate, render, personalize };
