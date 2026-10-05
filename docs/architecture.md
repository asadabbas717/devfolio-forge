# Architecture and current decisions

Visitors read a personalized profile, navigate sections, follow links, and interact with local demonstrations. Maintainers edit HTML. Embedded data is demonstration content; the systems described in project cards are not implemented applications.

```text
Browser → one index.html
  ├─ semantic content / inline SVG
  ├─ responsive CSS / reduced-motion rules
  └─ inline JavaScript
       ├─ navigation / section tracking / visibility enhancements
       └─ local controls → DOM / CSS / canvas
            └─ optional localStorage (frontend theme only)

Node checks / Playwright → template files (development only)
```

No templates import one another. No remote scripts/fonts, APIs, sessions, migrations, server configuration, or network retries exist. Mail links delegate to the visitor's mail client.

## Personalization shortcut

`profile.json` → `scripts/personalize.cjs` → marked fields in the existing standalone HTML files. This optional development command needs only Node. Shared values can be overridden by folder; validation/rendering of all selected pages finishes before writes start. Each changed file is replaced through a temporary file. Filesystem failure can interrupt a multi-file update, so inspect the diff and rerun after resolving it. There is no runtime configuration fetch and no duplicate template source tree. Markers remain in the output to support subsequent edits; metadata patterns preserve each page's specialty. This changes the earlier manual-only configuration workflow while retaining independent distribution.

## Current decision: standalone distribution

October 2026: retain one file per template. Shared runtime bundles would reduce duplication but complicate copying and deployment. Independent distribution is an established requirement. Shared behavioral tests protect common features; fixes must still propagate to all ten files. Revisit generation if the collection grows. Some compact legacy script sections remain a readability cost.

## Current decision: content before enhancements

Content is visible by default; observers add classes without gating reading. A local observer fallback initializes controls where IntersectionObserver is absent. Mobile navigation remains usable without scripts, then collapses after initialization. Hidden menus use visibility to leave the tab order; Escape restores focus. Hiding content until JavaScript runs would make animation a reliability dependency.

## Current decision: explicit command boundary

Fixed own-property response maps and textContent protect both local panels. Input is capped at 200 characters and history at 100 elements. No shell integration or command framework is warranted. Discarding excess history is deliberate: these are demonstrations, not durable terminals.

## Current decision: behavioral development tooling

Node's built-in runner provides structural checks; pinned Playwright verifies browser behavior. No runtime framework, bundler, or mechanical TypeScript migration is introduced. Tests protect focus, CSS visibility, local storage, and DOM interactions. Syntax checks are not a general HTML validator or full linter.

## Motion

The AI canvas resizes its backing buffer only when dimensions change, cancels animation off-screen/hidden, and responds to motion preferences. Missing 2D contexts leave score controls usable. Other decorative motion uses CSS reduced-motion rules. The creative cursor is viewport-constrained; stage movement requires a fine pointer and ordinary motion preference.
