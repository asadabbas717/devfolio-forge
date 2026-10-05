# Engineering Audit

Audit date: October 5, 2026. Baseline: initial commit `e49c3a4`. Scope: all ten HTML templates, README, tracked files, initial history, and the development tooling introduced here. The working tree was clean at the start. No repository-specific AGENTS.md was present in the project or its two immediate parent directories.

## Executive Summary

Originally this was a useful portfolio collection with attractive distinct designs, semantic sections, local-only interactions, and no runtime dependencies. Its engineering maturity lagged its presentation: no tests or CI, compressed JavaScript, content hidden behind JavaScript, inaccessible collapsed navigation, and unsupported production-readiness claims.

It now has browser regression protection, a reproducible development lockfile, proportionate CI, deliberate failure behavior, bounded command panels, better keyboard navigation, and accurate maintenance documentation. The single-file distribution model and visual designs are retained. Assessment: **portfolio quality**, with stronger maintenance foundations; not a verified production release or a 10/10 system.

Scores are qualitative reviewer judgments relative to a static template collection, not certification or a coverage calculation. Overall scores weight browser correctness, reliability, accessibility, and change safety. Backend concerns are N/A rather than artificially awarded points.

## Original Score

| Category | Score |
|---|---:|
| Architecture | 7 |
| Code Quality | 5 |
| SOLID / Design | 7 |
| Domain Modeling | N/A |
| Security | 7 |
| Reliability | 4 |
| Testing | 0 |
| Database/Persistence | N/A |
| Performance | 6 |
| Configuration | 8 |
| Dependencies | 8 |
| Logging/Observability | 5 |
| UI/UX Robustness | 5 |
| Accessibility | 5 |
| Documentation | 5 |
| Developer Experience | 5 |
| CI/CD | 0 |
| Deployment/Release | 5 |
| Repository Hygiene | 7 |
| Concurrency / Async | 6 |
| API / Integrations | N/A |
| Git Engineering | 6 |
| Overall | **5.6** |

## Major Problems Found

No P0 issue or apparent tracked secret was identified in the reviewed files/history. There is no authorization or financial data boundary to evaluate.

| Priority | Finding and evidence | Resolution |
|---|---|---|
| P1 | `.reveal` content used opacity zero by default. Disabled scripts or observer failures made important content unreadable. All scripts assumed IntersectionObserver existed. | Visible content defaults and observer fallback in every template; no-JS and unavailable-API browser checks. |
| P1 | Mobile menus hid links through opacity/pointer-events while retaining keyboard focusability. Most templates lacked Escape handling; focus restoration was absent. Original menu regressions failed on all ten pages. | CSS visibility, script-free navigation fallback, Escape focus restoration, outside/link closure, breakpoint reset, skip links. |
| P1 | No test suite or quality gate protected repeated interactions or deployment artifacts. | Shared structural and real-browser tests; lockfile-based CI and dependency advisory gate. |
| P2 | Terminal map lookups accepted inherited names such as `constructor` and `__proto__`. Original software panel rendered a native Object function as a response. This is incorrect dispatch, not evidence of shell execution or prototype pollution. | Own-property checks, text rendering preserved, malicious/prototype command regressions. |
| P2 | Terminal history/input could grow without a deliberate limit. | 200-character input and 100-element output caps. Clear behavior retained. |
| P2 | Creative page lost the poster's positioning context on mobile (`position:static`), allowing its absolute pseudo-element to overflow the root by 16px after an anchor jump at 320px. | `position:relative` within the responsive rule; responsive regression now passes. Cursor positioning is also constrained to the viewport. |
| P2 | AI canvas reset its backing buffer every frame, ran off-screen, and assumed a 2D context was available. | Resize only on dimension changes, visibility/motion lifecycle, null-context fallback independent of score controls. |
| P2 | Theme storage accepted arbitrary saved values. | Validate light/dark; tests for corrupt values and blocked storage. |
| P2 | README claimed production readiness and graceful fallbacks without sufficient implementation or verification. Resume targets referenced missing files. | Rewrite around actual behavior, check commands, scope, placeholders, and release limitations. Resume placeholders remain documented customization requirements. |
| P3 | No ignore rules or explicit newline conventions. | Ignore local tooling/output/secrets; text newline rules. |

## Generated-Code / Engineering-Control Signals

Repeated navigation/observer snippets, densely packed scripts, generic section comments, unsupported maturity claims, placeholder external destinations, and no behavioral tests suggested weak engineering control. These are review signals, not proof of code authorship. Repetition also has a legitimate distribution purpose: each page must work when copied alone. Comments and useful designs were retained; no speculative framework or service layer was introduced.

Git contained one initial commit with all eleven original files. There is insufficient history to assess iterative team review or release discipline. No history was rewritten, commits created, remote settings changed, or publication performed.

## Changes Implemented

- All ten HTML files: content-visible defaults, browser-API fallback, skip-to-main link, reliable collapsed menu visibility/focus, outside-click/Escape/link closure, and breakpoint handling.
- Software/cybersecurity panels: supported-command boundaries and bounded input/output while preserving textContent safety.
- Software page: meaningful initial counter values and immediate final values under reduced motion.
- Frontend page: validate stored theme; optional persistence failure remains nonfatal.
- Computer science/data pages: polite live announcements for changed details/chart title.
- AI page: avoid buffer churn, stop off-screen/hidden animation, react to changed motion preference, tolerate unavailable canvas context.
- Creative page: preserve mobile poster positioning context, constrain cursor, disable custom cursor under reduced motion, require fine pointer for stage movement.
- Add tests, pinned development dependency/lockfile, ignore/newline rules, and read-only CI.
- Replace inflated README and add architecture, testing, security, deployment documentation.

## Architecture

```text
One standalone HTML template
  ├─ static profile content / inline SVG
  ├─ responsive CSS / motion preferences
  └─ local JavaScript → DOM / CSS / canvas
       └─ optional frontend theme preference

Shared development checks → ten independent templates
Static host → HTML and maintainer-supplied assets
```

The dependency direction is intentionally shallow. No network services, database, authentication, orchestration, or artificial repository/service abstractions exist. New decisions, alternatives, and trade-offs are recorded in `docs/architecture.md`; they are current decisions, not invented project history.

## Critical Workflows

| Workflow | Protection / verification |
|---|---|
| Read profile and projects | No-JS content checks on every template; visible defaults. |
| Navigate on mobile / keyboard | Open/close, Escape focus, link closure, hidden-menu visibility, skip link. |
| Resize layouts | Overflow checks at four widths on ten pages; creative poster fix. |
| Browse coursework | Topic click updates real detail text. |
| Filter projects / restore all | Backend filter hides nonmatching cards; reset restores cards. |
| Change theme / reload | Persistence test plus corrupt/blocked-storage cases. |
| Adjust design spacing | Range event updates displayed value. |
| Submit/clear local commands | Real form submission, valid/invalid/prototype/markup inputs, history bound, clear. |
| Adjust simulated ML scores | Range change modifies displayed score; no inference claim. |
| Render network / change motion | Drawing starts, stops under reduced motion and when off-screen; null-context initialization. |
| Switch analytical charts | Bar/scatter selection checks actual generated shapes. |
| Contact / resume | Markup links reviewed; personalization and hosted destination checks required. |
| CSS flow and creative demos | Source reviewed; initialization/overflow checked; exhaustive visual/touch verification remains manual. |

## Testing Strategy

Static tests supply syntax/structural safety checks; browser tests are the integration/E2E layer. There is no isolated business domain requiring artificial unit tests. Tests interact with real rendered controls rather than asserting mocked services or pursuing raw coverage.

Executed locally:

- Original-baseline browser regressions: expected failures on all ten menu cases and inherited command lookup; the parent test also failed. This established defects before accepting fixes.
- `npm run check`: **11 passing tests**.
- `npm test` with installed Edge: **14 passing tests** (parent plus thirteen workflow cases). Local browser tests use `file:` URLs; no hosted deployment was tested.
- `npm ci --ignore-scripts --offline --cache .npm-cache`: successful reproducible installation from the newly fetched cache/lockfile. CI uses ordinary `npm ci`; its Linux execution is not locally verified.
- `npm audit --audit-level=high --cache .npm-cache --fetch-retries=0`: **zero reported vulnerabilities** on October 5, 2026.
- `git diff --check`: successful whitespace check.

The bundled downloaded Chromium executable was not present locally; installed Edge was used through Playwright's supported channel option. CI downloads Chromium and system dependencies following [Playwright's CI guidance](https://playwright.dev/docs/ci). Firefox/Safari, screen readers, full contrast assessment, hosted workflow execution, and deployment headers remain unverified. See `docs/testing.md` for deliberate omissions.

## Security Review

No arbitrary execution, uploads, auth, remote script assets, or server endpoints exist. Safe text sinks and isolated external-window links were already strengths. Own-property dispatch prevents unsupported names from crossing the local command boundary; limits prevent unbounded panel growth. Saved theme values are constrained and dependency checks are reproducible. No telemetry or sensitive logging was added.

Hosting must supply HTTPS and appropriate policies. Inline scripts/styles require reviewed CSP hashes or restructuring before strict CSP adoption. CI uses read-only permissions, but actions reference version tags rather than immutable commit SHAs. This remains a documented supply-chain improvement opportunity. No claim of comprehensive vulnerability scanning is made.

## Data Integrity

There are no financial values, user records, transactions, synchronization, migrations, or server persistence. The only persisted setting is a non-sensitive theme preference, validated against two allowed values. Terminal state is deliberately ephemeral and bounded. Model scores/charts are demonstrations with no business-data integrity contract. Embedded profile information must be reviewed for truthfulness before release.

## Remaining Technical Debt

- Common behavior is copied across ten files; tests mitigate drift but do not remove maintenance cost.
- Legacy compact scripts and CSS are harder to review than formatted source. A broad formatting rewrite was deliberately avoided.
- No full HTML/CSS linting, automated contrast scanner, visual baseline, performance budget, or Firefox/Safari matrix yet.
- Theme control and chart/score accessibility merit manual screen-reader review beyond basic semantics/live announcements.
- CI action SHA pinning and repository branch protection require follow-up.

## Remaining Risks

- Placeholder social/project/email/resume links are not deployable personal information. Missing resume files remain intentional template limitations.
- No license exists; reusable distribution terms are unsettled. This audit does not choose a copyright holder.
- No real hosted release, custom domain, cache/header configuration, or hosted CI completion was verified.
- Real touch behavior, browser-specific storage, prolonged use, and personalized long content may uncover defects beyond the test matrix.
- Continuous decorative CSS animation requires a broader accessibility review; reduced motion is supported but not a certification.
- Advisory databases evolve. Today's clean dependency audit is not a future guarantee.

## Final Score

| Category | Score |
|---|---:|
| Architecture | 8 |
| Code Quality | 6.5 |
| SOLID / Design | 8 |
| Domain Modeling | N/A |
| Security | 8 |
| Reliability | 8 |
| Testing | 8 |
| Database/Persistence | N/A |
| Performance | 7.5 |
| Configuration | 8 |
| Dependencies | 9 |
| Logging/Observability | 5 |
| UI/UX Robustness | 8 |
| Accessibility | 7 |
| Documentation | 9 |
| Developer Experience | 8 |
| CI/CD | 8 |
| Deployment/Release | 7 |
| Repository Hygiene | 8 |
| Concurrency / Async | 8 |
| API / Integrations | N/A |
| Git Engineering | 6 |
| Overall | **7.8** |

Logging scores reflect browser-console diagnostics without error reporting; external telemetry is disproportionate to the current templates. Persistence/API/domain categories are N/A because backend-like project descriptions are fictional examples, not implemented features.

## Recommended Next Steps

1. Personalize one chosen portfolio, resolve resume/contact destinations and licensing, then verify an actual hosted release.
2. Perform screen-reader, contrast, keyboard/zoom, real touch, and Firefox/Safari reviews; add regressions for observed issues.
3. Confirm hosted CI, configure review/branch protections, and pin action revisions according to maintainer policy.
4. Consider formatting or a generator only when maintenance experience demonstrates that its benefits outweigh standalone-distribution costs.

Intentionally unchanged: technologies, visual designs, fictional content clearly labeled as samples, one-file packaging, and Git history. No new backend, database, runtime dependency, deployment integration, invented credentials, or speculative architecture was added.

## Follow-up: shared personalization

The owner subsequently requested a shortcut for editing common identity/contact fields. Added public `profile.json`, a dependency-free Node command, per-folder overrides, preview mode, and durable managed-field annotations in all ten pages. HTML remains standalone; no runtime fetch or duplicated template tree was added. Shared fields update metadata/visible identity, contact links, initials, optional hero bios, existing location fields, and local panel responses. Sample projects, skills, history, role-specific content, and missing resume assets still require manual review. This follow-up extends the original audit's manual configuration workflow; original audit scores/results above describe that audit point in time.
