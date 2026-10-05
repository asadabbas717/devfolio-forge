# Devfolio Forge

Ten independent, single-page developer portfolio templates. Each folder contains one self-contained `index.html` with semantic HTML, inline CSS/SVG, and vanilla JavaScript. Copy a template, replace its demonstration content, and publish it as a static site.

These are frontend templates: career histories, projects, metrics, dashboards, and model scores are demonstrations. There is no backend, authentication, database, contact delivery service, real monitoring, or machine-learning inference.

| Folder | Specialty | Interaction |
|---|---|---|
| 01-software-engineer | Software engineering | Command panel |
| 02-computer-science | Computer science student | Knowledge map |
| 03-fullstack-developer | Full-stack development | Project filters |
| 04-frontend-engineer | Frontend engineering | Theme and design-token controls |
| 05-backend-engineer | Backend engineering | CSS request-flow illustration |
| 06-devops-cloud | DevOps/cloud | CSS pipeline illustration |
| 07-cybersecurity | Defensive security | Simulated command panel |
| 08-ai-machine-learning | AI/ML | Canvas network and simulated scores |
| 09-data-scientist | Data science | SVG chart switching |
| 10-creative-developer | Creative development | Pointer-reactive composition |

## Run and customize

Open any folder's `index.html` in a modern browser. No installation, environment variables, external resources, or build step are needed to view a portfolio. Content and navigation remain available with JavaScript disabled; interactive demonstrations require JavaScript.

Follow the personalization checklist in the chosen file. Replace names, biography, location, education, experience, achievements, and projects with truthful information. Search for `yourusername`, `hello@example.com`, and `resume.pdf`. Resume files are **not included**: supply the file alongside `index.html`, link to a real URL, or remove that link. Replace demo links that currently lead to the contact section. Update titles, descriptions, author, and Open Graph metadata as well as visible content.

### Edit common details once

Edit [profile.json](profile.json), then run:

```sh
npm run personalize -- --check
npm run personalize
```

The first command previews which portfolios would change. The second updates all ten HTML files. Node.js 22+ is required, but this command needs no dependency installation. Supported fields are `name`, `email`, `githubUrl`, `linkedinUrl`, `resumeUrl`, `location`, and `bio`. Initials and first names are derived automatically. Page titles, author/name descriptions, contact links, and local command responses also update. Each template retains its specialty and standalone behavior.

An empty `bio` preserves the existing hero paragraph. Location updates only where a template already has a location field. Resume URLs can be HTTPS URLs or relative paths; the command does not copy a resume into each folder. GitHub/LinkedIn URLs must use HTTPS. Values are validated and escaped as text.

To update only one template:

```sh
npm run personalize -- --portfolio 04-frontend-engineer
```

For different details on specific templates, add overrides under `portfolios` in the same file:

```json
"portfolios": {
  "04-frontend-engineer": {
    "bio": "I build accessible interfaces and design systems.",
    "resumeUrl": "https://example.com/frontend-resume.pdf"
  }
}
```

Run the command again whenever the configuration changes. Managed fields are marked in HTML; keep those markers so future edits work. Direct edits to managed values are replaced on the next run. Projects, project repository URLs, skills, experience, education, and demonstration claims still require manual review. Review the Git diff before publishing; personalization updates existing files rather than creating a second copy.

The frontend template stores only its theme preference under `emma-theme` in local storage. Storage failure falls back to an in-memory theme. Command panels accept predefined local commands; they never execute a shell or send data.

## Engineering checks

Development tooling requires Node.js 22 or newer and npm. Playwright is a development dependency only; it is never shipped to visitors.

```sh
npm ci
npm run check
npx playwright install chromium
npm test
npm audit --audit-level=high
```

On Linux, install browser system dependencies with `npx playwright install --with-deps chromium`. To use installed Microsoft Edge on Windows:

```powershell
$env:BROWSER_CHANNEL = 'msedge'
npm test
```

Static checks validate script syntax, unique IDs, fragment targets, external-link isolation, and basic safety constraints. Browser tests exercise keyboard navigation, responsive widths, JavaScript-disabled content, unavailable browser APIs, command boundaries, filters, themes, and charts. See [testing details](docs/testing.md) for coverage limits.

There is no compilation or generated bundle. HTML files are the deployment artifacts. CI installs the lockfile, runs static/browser checks, and checks dependency advisories; it does not deploy.

## Structure and design

The ten numbered folders are deployable templates. `tests/` contains shared checks, `.github/workflows/quality.yml` defines CI, and `docs/` describes maintenance. Shared runtime files are deliberately avoided so a copied portfolio remains independent. Common behavior is repeated and protected by collection-wide tests. Page-specific controls remain local.

## Deployment

Copy the selected HTML and actual resume/assets to a static host's publication directory. For GitHub Pages, place a chosen template at the publishing root, or publish the collection and use a numbered folder URL. The collection has no root landing page. Confirm HTTPS, nested paths, contacts, and downloads on the deployed site. See [deployment and rollback](docs/deployment.md).

## Maintenance and limitations

Preserve standalone files and existing visual designs. Run checks after markup/style/script changes and verify affected interactions manually with keyboard and touch.

Automated browser verification currently targets Chromium/Edge. Firefox, Safari, real touch devices, screen readers, full contrast review, and hosted deployment need additional verification. These checks are not accessibility certification or proof of production readiness. There is no license file; maintainers must choose licensing terms before distributing reusable open-source templates.

- [Engineering audit and scorecard](ENGINEERING_AUDIT.md)
- [Architecture and current decisions](docs/architecture.md)
- [Testing](docs/testing.md)
- [Security](docs/security.md)
- [Deployment](docs/deployment.md)
