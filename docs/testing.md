# Testing

Use the README commands. The lockfile pins development tooling. CI uses Node 22 and downloaded Chromium on Linux. Local audit verification used installed Microsoft Edge on Windows with `file:` URLs.

## Coverage

`tests/static.test.cjs` has 11 tests: collection size and one per template for script syntax, unique IDs, fragment targets, document language, reduced-motion declarations, safe new-window links, and absence of remote scripts/eval/innerHTML assignment. These focused constraints are not a general vulnerability scanner or HTML validator.

`tests/browser.test.cjs` includes ten per-template cases and interaction/failure cases, plus a parent test. Checks cover menu visibility/opening/closing, Escape focus, overflow at 320/390/768/1280px, JavaScript-disabled content/navigation, initialization without observers or a canvas context, runtime errors, command boundaries/history/clearing, coursework selection, filter reset, theme persistence, sliders, and chart switching.

`TEMPLATE_ROOT` can point at another collection. The audit ran regressions against files exported from the original commit: all ten menu cases failed and the command case exposed inherited-property lookup. Temporary baseline fixtures are not shipped.

Personalization checks in `tests/personalize.test.cjs` cover all ten outputs, repeated application, escaped names/bios, script syntax, preserved roles/project URLs, invalid URLs/paths, preview mode, overrides, one-folder scope, and validation before writes. Browser checks additionally load all personalized outputs, verify rendered identity/contact fields, and submit personalized terminal contacts. `npm run check` includes these development-tool regressions.

## Manual release checks

Use keyboard alone, screen readers, real touch, zoom, narrow/wide layouts, light/dark preferences, and reduced motion. Verify sample-content honesty, personalized links, resumes, long text, visible focus, contrast, range labels, and chart interpretation. Test Firefox/Safari before claiming support. Verify on the deployed origin.

## Limits

No database/server/authentication tests are appropriate because those systems do not exist. Browser interactions are the integration/E2E boundary. The suite does not measure performance budgets, provide accessibility certification, use visual snapshots, validate host headers, or check live external destinations. Theme persistence on local files varies by browser. Hosted CI execution must be confirmed separately.
