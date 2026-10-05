# Deployment and release

## Artifacts and release

No build command exists. Each numbered folder's HTML is a static deployment artifact. Node, tests, and node_modules are development-only. Configuration is edited content/links; there are no database migrations or environment variables.

For common identity/contact fields, edit `profile.json`, preview with `npm run personalize -- --check`, and apply with `npm run personalize` before release. Publish the updated HTML, not the configuration/tooling. Relative resume files must be supplied separately in each selected folder.

1. Personalize truthful content and remove placeholders. Supply an actual resume or change/remove its link.
2. Run installation, static/browser tests, and dependency audit from the README. Manually verify accessibility and intended browser support.
3. Copy chosen HTML/assets to the host's publishing root. For the collection, retain numbered folders and use those URLs; no root landing page exists.
4. For GitHub Pages, select the intended publishing branch/directory in Settings → Pages. Confirm it contains the intended files. Consult [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) for account-specific options.
5. Verify HTTPS, navigation, contacts, resume downloads, theme controls, mobile layout, and browser errors on the hosted origin. Local-file tests do not establish hosted correctness.

## Rollback and operations

Record the published source commit and retain previous HTML/assets. Restore the prior release through the host's ordinary publication process, then verify the served version and caching. No visitor-data migration occurs. Publish resume documents only after reviewing their public information.

CI checks changes but does not deploy. Branch protection, host permissions, domains, security headers, traffic logs, monitoring, and hosted CI completion are not configured/verified by this local audit. Choose licensing terms before offering reuse rights; the audit does not invent a copyright holder or grant a license.
