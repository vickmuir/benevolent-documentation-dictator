# BDD design system

The BDD site is a set of distinct productions. The design system shares **structure and
accessibility behavior**, not appearance. Each story keeps its own palette, fonts, and layout in
its page `<style>` block.

## Files

| File | Purpose |
| --- | --- |
| `assets/css/bdd-design-system.css` | Tokens, per-story themes, skip link, header and navigation, footer, image dialog, disclosure and transcript, episode jump list |
| `assets/css/bdd-accessibility.css` | Focus rings, link and button states, viewer triggers, reduced motion, forced colors |
| `assets/css/bdd-responsive.css` | Breakpoints, navigation collapse, reflow, table wrappers |
| `assets/js/bdd-accessibility.js` | Adds `bdd-js` to `<html>`, mobile menu toggle, scrollable table regions, focus on hash targets |
| `assets/js/bdd-components.js` | The image viewer (native `<dialog>`) |

Load order on every page: design-system, accessibility, responsive, then the page's own
`<style>`. Scripts use `defer` and go at the end of `<body>`.

## Themes

Set on `<body>`:

| Page | `data-bdd-theme` |
| --- | --- |
| `index.html` | `cdrama` |
| `monster-in-data-center.html` | `kdrama` |
| `festival-of-validation.html` | `bobbywood` |
| `star-trek-lost-repository.html` | `trek` |
| `about.html` | `bdd` |

A theme changes the nav, footer, dialog, and focus accent colors. It does not change layout.

## Tokens

All tokens are CSS custom properties on `:root` with the `--bdd-` prefix.

- **Typography:** `--bdd-font-body`, `--bdd-font-mono`, `--bdd-text-xs` to `--bdd-text-3xl`,
  `--bdd-leading-body`, `--bdd-leading-tight`.
- **Spacing:** `--bdd-space-1` to `--bdd-space-8`.
- **Widths:** `--bdd-content-width`, `--bdd-prose-width`.
- **Borders and radii:** `--bdd-border-width`, `--bdd-radius-sm|md|lg|pill`.
- **Focus:** `--bdd-focus-inner`, `--bdd-focus-outer`, `--bdd-focus-width`, `--bdd-focus-offset`.
  Focus uses a two-tone ring so it is visible on both light and dark surfaces.
- **Links and status:** `--bdd-link`, `--bdd-link-hover`, `--bdd-ok`, `--bdd-warn`, `--bdd-danger`.
- **Targets:** `--bdd-target-min` (44px) for touch targets.
- **Motion:** `--bdd-motion-fast`, `--bdd-motion-base`. Under reduced motion all animation and
  transition durations are forced to near zero and smooth scrolling is turned off.
- **Palettes:** `--bdd-cdrama`, `--bdd-kdrama`, `--bdd-bobbywood`, `--bdd-trek` and their `-deep`
  variants, plus `--bdd-gold`.
- **Navigation, footer and dialog:** `--bdd-nav-*`, `--bdd-footer-*`, `--bdd-dialog-*`.

### Breakpoints

Custom properties cannot be used in media queries, so these values are repeated in
`bdd-responsive.css`:

| Name | Width | Effect |
| --- | --- | --- |
| nav | 860px | Navigation collapses to a menu button (only when JavaScript is running) |
| md | 768px | Container padding and grids tighten |
| sm | 520px | Cards go single-column; tables scroll inside a wrapper |

Grids must use `minmax(min(100%, Npx), 1fr)`, not `minmax(Npx, 1fr)`, or they overflow at 320px.

### Contrast

Targets: 4.5:1 for normal text, 3:1 for large text and meaningful UI components. When a story
palette color fails on white, darken it for text use only (for example `#946c00` for gold text,
`#a8174f` for pink text). Check any new color with axe and a contrast tool.

## Components

### Skip link, header, navigation

```html
<a class="bdd-skip-link" href="#main-content">Skip to main content</a>
<header class="bdd-site-header">
  <nav class="bdd-nav" aria-label="Site"> ... </nav>
</header>
```

The current page link has `aria-current="page"`. The menu button has `aria-expanded` and
`aria-controls`. Escape closes the menu and returns focus to the button.
The brand link ("BDD Drama Universe") goes to `about.html`, and the list holds the four stories.
The footer navigation lists the four stories (the C-Drama link is titled "The Rise of the
Benevolent Documentation Dictator") and the Accessibility Charter (`about.html#accessibility-charter`).
There is no separate Home or About item: the author's name in the byline and the footer credit
links to `about.html`. The brand link carries `aria-current="page"` on `about.html`.

### Main

```html
<main id="main-content" tabindex="-1"> ... </main>
```

`tabindex="-1"` lets the skip link move focus into `main`.

### Footer

`<footer class="bdd-footer">` with a credit line (the author's name links to `about.html`) and a
`<nav aria-label="Footer">` listing the four stories and the Accessibility Charter. The footer
is identical on every page apart from the story credit and `aria-current`.

### Image viewer

```html
<button type="button" class="bdd-viewer-trigger" data-bdd-viewer aria-haspopup="dialog"
        data-viewer-title="Master Bob, Sage of the Scroll Repository"
        data-viewer-desc="Optional caption or quote"
        data-viewer-native="밥 도사" data-viewer-native-lang="ko"
        data-viewer-src="funny/larger.png">
  <img src="funny/MasterBob.png" alt="Master Bob in flowing azure robes holding a scroll">
  <span class="bdd-sr-only">Enlarge image</span>
</button>
```

| Attribute | Required | Meaning |
| --- | --- | --- |
| `data-bdd-viewer` | yes | Marks the trigger |
| `data-viewer-title` | yes | Dialog accessible name and visible title |
| `data-viewer-desc` | no | Caption, used as the dialog description |
| `data-viewer-native`, `data-viewer-native-lang` | no | Non-English name shown in a `lang` span |
| `data-viewer-src` | no | Larger image; defaults to the thumbnail source |

Behavior (verified with real key presses on all four story pages):

- Enter or Space opens it. It uses native `<dialog>.showModal()`, so it has dialog semantics and
  the page behind is inert.
- Focus moves to the Close button. Tab and Shift+Tab stay inside.
- Escape, the Close button, or a click outside closes it.
- Focus returns to the trigger. Page scrolling is locked while open.
- The dialog scrolls on small screens and at high zoom.

Do not build a one-off lightbox. Use this component.

### Disclosure and transcript

Use native `<details class="bdd-disclosure"><summary>…</summary>…</details>`. No script is needed.
For transcripts add `bdd-transcript` and mark speakers with `bdd-transcript__speaker`.

### Tables

Wrap wide tables:

```html
<div class="bdd-table-wrap" data-label="Waterfall tracker"><table> … </table></div>
```

`bdd-accessibility.js` makes the wrapper a focusable `role="region"` with the `data-label` as its
name, only when it actually scrolls. Every table needs a `<caption>`, `<th scope="col">` for column
headers, and `<th scope="row">` for row headers.

### Episode jump list

`<nav class="bdd-episode-nav" aria-labelledby="bdd-episode-nav-label">` with a visible label
(`<p class="bdd-episode-nav__label" id="bdd-episode-nav-label">Jump to an episode</p>`) and an
`<ol class="bdd-episode-nav__list" role="list">` of links to `#episode-N`. Each episode title is an `<h3 id="episode-N">`.

### Screenplay

```html
<div class="script-box" role="group" aria-label="Screenplay excerpt: the waterfall">
  <p><span class="bdd-sr-only">Stage direction: </span>[Scene: …]</p>
  <dl class="script-dialogue">
    <dt>MASTER BOB</dt>
    <dd>Requirements come and go.</dd>
  </dl>
</div>
```

Stage directions are paragraphs, speakers are `<dt>`, lines are `<dd>`.

### Utilities

- `.bdd-sr-only`: visually hidden text for screen readers.
- `.bdd-h-flat`: removes the shared section-heading decoration (top margin, left border and
  padding) so a heading at the correct level keeps the story's own look. Use it, and your own CSS,
  instead of choosing a heading level for how it looks.
- `.bdd-external`: marks an external link; always pair with visually hidden "(opens in a new tab)".
  The LinkedIn profile is linked twice, both on `about.html` (the creator card button and the
  charter's feedback note). It is not in the footer or on the story pages.

## Behavior rules

- **Reduced motion:** transitions and animations are removed or shortened under
  `prefers-reduced-motion: reduce`. Smooth scrolling is disabled.
- **Forced colors:** focus and borders use system colors.
- **Focus:** never use `outline: none` without a replacement. The shared focus ring is defined with
  `:where()` so story CSS can override color but not remove it by accident.
- **No autoplay.** Media starts only when the visitor starts it.
