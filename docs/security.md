# Security

No authentication, uploads, credentials, API calls, or server execution exist. All embedded content is public. Never put secrets in HTML, assets, scripts, or history. An environment file cannot make client-side secrets private; none is required.

`profile.json` is public configuration, not a secret store. Personalization validates required strings, HTTPS social URLs, email syntax, and resume paths; it escapes HTML text/attributes and embedded JSON separately. It rejects executable URL schemes, URL credentials, and relative path traversal. Its CLI can select only known portfolio folders. Project URLs/history remain untouched and must be reviewed manually.

Source review found no apparent tracked credentials in current files or the initial commit. This is not an exhaustive secret-scanner attestation. Demo addresses and social links are intentional placeholders.

Command panels render text, use fixed own-property response maps, limit input, and bound DOM history. They cannot execute commands. External new-window links already use `noopener noreferrer`. Theme persistence accepts only light/dark values; unavailable storage is deliberately nonfatal. Application code adds no telemetry or personal-data logging.

Development dependencies are pinned; run `npm audit --audit-level=high`. Advisory results are time-sensitive and not a guarantee. CI permissions are read-only. Consider pinning workflow actions to immutable commits for stronger supply-chain controls.

Use HTTPS and avoid insecure remote assets; see [GitHub HTTPS guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). Strict Content Security Policy requires accommodating inline styles/scripts with reviewed hashes or refactoring; blanket inline blocking breaks these templates. Headers, TLS, access logs, caching, and privacy obligations belong to the selected host. Reassess security when adding analytics, remote integrations, contact delivery, or untrusted HTML.

Use a private channel supplied by the owner for security reports. No reporting address or disclosure SLA is invented by this audit.
