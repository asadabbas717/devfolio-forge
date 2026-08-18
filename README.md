# Developer Portfolio Collection

A collection of ten original, production-ready, single-page developer portfolio concepts built with semantic HTML, modern CSS, inline SVG, and vanilla JavaScript. Every portfolio is completely self-contained in one `index.html` file and can be opened directly in a browser or deployed with GitHub Pages without a build step.

> **Important:** The names, education, experience, certifications, statistics, and project details in these templates are demonstration content. Replace them with truthful personal information before publishing.

## Portfolio Overview

| # | Portfolio | Specialty | Design Style | Signature Feature |
|---|---|---|---|---|
| 01 | Software Engineer | General software engineering | Dark navy SaaS / engineering UI | Interactive developer command panel |
| 02 | Computer Science | CS student / academic | Light research notebook aesthetic | Interactive coursework knowledge map |
| 03 | Full-Stack Developer | Product engineering | Energetic startup gradients | Project filters + architecture cards |
| 04 | Frontend Engineer | UI engineering | Premium minimal / typography-led | Interactive design-system playground |
| 05 | Backend Engineer | APIs / systems | Dark technical dashboard | Animated request-to-database flow |
| 06 | DevOps & Cloud | Infrastructure / SRE | Cloud monitoring dashboard | Animated CI/CD pipeline |
| 07 | Cybersecurity | Defensive security | SOC-inspired dark interface | Safe simulated monitoring terminal |
| 08 | AI / ML Engineer | Machine learning | Research-lab visual system | Animated neural-network canvas |
| 09 | Data Scientist | Analytics / statistics | Clean data dashboard | Interactive native SVG charts |
| 10 | Creative Developer | Experimental frontend | Editorial / creative coding | Pointer-reactive visual composition |

## Technologies Demonstrated

- HTML5 semantic structure
- CSS custom properties and design tokens
- CSS Grid and Flexbox
- Responsive layouts with `clamp()` and media queries
- Vanilla JavaScript DOM manipulation
- Intersection Observer API
- Accessible mobile navigation
- Keyboard and focus states
- Reduced-motion support
- Inline SVG and lightweight visualizations
- Local storage for theme preferences where appropriate
- Progressive enhancement and graceful fallbacks
- GitHub Pages compatible deployment

## Features Across the Collection

The ten projects intentionally use different visual systems and interaction patterns. Across the collection you will find responsive navigation, scroll progress, project filtering, animated statistics, terminal simulations, architecture diagrams, CI/CD flows, SVG data visualizations, theme controls, reveal-on-scroll effects, copy-to-clipboard actions, accessible accordions, and pointer-reactive creative effects.

No framework, package manager, build tool, backend, database, API key, or local server is required.

## Folder Structure

```text
developer-portfolio-collection/
│
├── README.md
├── 01-software-engineer/
│   └── index.html
├── 02-computer-science/
│   └── index.html
├── 03-fullstack-developer/
│   └── index.html
├── 04-frontend-engineer/
│   └── index.html
├── 05-backend-engineer/
│   └── index.html
├── 06-devops-cloud/
│   └── index.html
├── 07-cybersecurity/
│   └── index.html
├── 08-ai-machine-learning/
│   └── index.html
├── 09-data-scientist/
│   └── index.html
└── 10-creative-developer/
    └── index.html
```

## Run Locally

No installation is required.

1. Clone or download this repository.
2. Open any project folder.
3. Double-click its `index.html`, or drag the file into a browser.

Example:

```bash
cd developer-portfolio-collection/01-software-engineer
```

Then open `index.html` in your browser.

## Customize a Portfolio

Each HTML file contains a **PERSONALIZATION CHECKLIST** near the top. Before publishing, replace the demonstration content with your own truthful details.

Typical items to update:

- Name and professional title
- Biography and value proposition
- Email address
- GitHub and LinkedIn URLs
- Resume link
- Location
- Skills
- Projects and repository links
- Experience
- Education
- Certifications and statistics

Search each file for `yourusername`, `hello@example.com`, and `resume.pdf` to quickly find common editable links.

## Deploy with GitHub Pages

### Option A — Publish one portfolio as its own repository

1. Create a new GitHub repository.
2. Copy the chosen portfolio's `index.html` into the repository root.
3. Commit and push the file to the `main` branch.
4. Open the repository **Settings**.
5. Open **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select `main` and `/root`.
8. Save the settings.
9. Open the generated GitHub Pages URL after deployment completes.

Suggested standalone repository names:

```text
software-engineer-portfolio
cs-student-portfolio
fullstack-developer-portfolio
frontend-engineer-portfolio
backend-engineer-portfolio
devops-cloud-portfolio
cybersecurity-portfolio
ai-ml-portfolio
data-scientist-portfolio
creative-developer-portfolio
```

### Option B — Keep the complete collection together

You can publish the whole collection in one repository and link directly to each folder. GitHub Pages can serve nested `index.html` files, so each project becomes reachable at a path similar to:

```text
https://yourusername.github.io/developer-portfolio-collection/01-software-engineer/
```

## Screenshots

Add screenshots after customizing the templates. A simple convention is:

```text
screenshots/
├── 01-software-engineer-preview.png
├── 02-computer-science-preview.png
├── 03-fullstack-developer-preview.png
└── ...
```

Then add a preview gallery to this README using standard Markdown image syntax.

## GitHub Profile Value

This repository is designed to make the underlying frontend skills visible in code review. It demonstrates:

- semantic page structure
- responsive interface engineering
- reusable CSS token systems
- component-like styling without a framework
- accessible interaction design
- DOM events and state handling
- observers and animation control
- native SVG / canvas-style visualization techniques
- performance-aware dependency choices
- maintainable organization inside single-file constraints

## Contributing

Contributions are welcome when they improve accessibility, browser compatibility, performance, documentation, or introduce a genuinely different portfolio concept.

Before opening a pull request:

1. Keep projects dependency-free.
2. Preserve the one-file-per-portfolio requirement.
3. Test at common mobile and desktop widths.
4. Avoid copying commercial templates or branded interfaces.
5. Ensure sample credentials and achievements are clearly demonstration data.

## License

Choose a license before publishing publicly. The MIT License is a common option for reusable frontend templates. If you use MIT, add a root `LICENSE` file containing the official MIT License text and your chosen copyright holder/year.

## 404 Guidance

GitHub Pages serves folder routes correctly when the folder contains `index.html`. If a manually entered route returns a 404, confirm that the folder name matches the repository path exactly and that Pages is publishing from the correct branch and root directory.

## Suggested Standalone Repository Metadata

### 01 — Software Engineer

- **Repository:** `software-engineer-portfolio`
- **Description:** A responsive software engineering portfolio with a dark SaaS-inspired UI, project case studies, engineering metrics, and a vanilla JavaScript command panel.
- **Topics:** `html`, `css`, `javascript`, `portfolio`, `software-engineering`, `responsive-design`, `frontend`, `github-pages`, `accessibility`
- **Screenshot:** `software-engineer-preview.png`

### 02 — Computer Science Student

- **Repository:** `cs-student-portfolio`
- **Description:** An academic-meets-modern computer science student portfolio featuring coursework, projects, research interests, and an interactive knowledge map.
- **Topics:** `html`, `css`, `javascript`, `portfolio`, `computer-science`, `student-portfolio`, `algorithms`, `responsive-design`, `github-pages`
- **Screenshot:** `cs-student-preview.png`

### 03 — Full-Stack Developer

- **Repository:** `fullstack-developer-portfolio`
- **Description:** An energetic one-page full-stack developer portfolio with project filtering, architecture visuals, responsive layouts, and vanilla JavaScript interactions.
- **Topics:** `html`, `css`, `javascript`, `fullstack`, `portfolio`, `web-development`, `responsive-design`, `frontend`, `github-pages`
- **Screenshot:** `fullstack-developer-preview.png`

### 04 — Frontend Engineer

- **Repository:** `frontend-engineer-portfolio`
- **Description:** A premium frontend engineering portfolio focused on accessibility, design systems, responsive UI, performance, and an interactive token playground.
- **Topics:** `html`, `css`, `javascript`, `frontend`, `portfolio`, `design-system`, `accessibility`, `responsive-design`, `github-pages`
- **Screenshot:** `frontend-engineer-preview.png`

### 05 — Backend Engineer

- **Repository:** `backend-engineer-portfolio`
- **Description:** A technical backend engineering portfolio with API projects, system statistics, terminal-inspired UI, and an animated request architecture diagram.
- **Topics:** `html`, `css`, `javascript`, `backend`, `portfolio`, `api`, `system-design`, `responsive-design`, `github-pages`
- **Screenshot:** `backend-engineer-preview.png`

### 06 — DevOps & Cloud Engineer

- **Repository:** `devops-cloud-portfolio`
- **Description:** A cloud-dashboard-inspired DevOps portfolio featuring infrastructure projects, monitoring visuals, and a CSS/JavaScript CI/CD pipeline simulation.
- **Topics:** `html`, `css`, `javascript`, `devops`, `cloud`, `portfolio`, `cicd`, `responsive-design`, `github-pages`
- **Screenshot:** `devops-cloud-preview.png`

### 07 — Cybersecurity Engineer

- **Repository:** `cybersecurity-portfolio`
- **Description:** A defensive cybersecurity portfolio with safe security-lab projects, SOC-inspired visuals, responsible-disclosure guidance, and a simulated analyst terminal.
- **Topics:** `html`, `css`, `javascript`, `cybersecurity`, `portfolio`, `defensive-security`, `security`, `responsive-design`, `github-pages`
- **Screenshot:** `cybersecurity-preview.png`

### 08 — AI / ML Engineer

- **Repository:** `ai-ml-portfolio`
- **Description:** A futuristic AI/ML engineering portfolio with applied machine-learning projects, experiment controls, and a dependency-free neural-network canvas visualization.
- **Topics:** `html`, `css`, `javascript`, `machine-learning`, `ai`, `portfolio`, `data-visualization`, `responsive-design`, `github-pages`
- **Screenshot:** `ai-ml-preview.png`

### 09 — Data Scientist

- **Repository:** `data-scientist-portfolio`
- **Description:** A clean data science portfolio featuring analytics projects, business KPI layouts, and interactive native SVG trend, bar, and scatter charts.
- **Topics:** `html`, `css`, `javascript`, `data-science`, `analytics`, `portfolio`, `svg`, `data-visualization`, `github-pages`
- **Screenshot:** `data-scientist-preview.png`

### 10 — Creative Developer

- **Repository:** `creative-developer-portfolio`
- **Description:** An experimental creative developer portfolio combining bold editorial layouts, pointer-reactive interaction, motion, responsive design, and accessible fallbacks.
- **Topics:** `html`, `css`, `javascript`, `creative-coding`, `portfolio`, `interactive`, `frontend`, `responsive-design`, `github-pages`
- **Screenshot:** `creative-developer-preview.png`
