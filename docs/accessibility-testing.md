# Accessibility testing

Target: **WCAG 2.2 Level AA**. The project does **not** claim conformance. Automated tools find
only part of the problems, and several criteria need a person to judge them. This file records
what has been tested, what has not, and the checklist to repeat for every change.

## Pages in scope

`index.html`, `monster-in-data-center.html`, `festival-of-validation.html`,
`star-trek-lost-repository.html`, `about.html`, and the standalone player
`funny/video/index.html`.

## Results to date

### Automated

| Check | Result |
| --- | --- |
| axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice) | 0 violations on all five main pages |
| axe "needs review" items | Remain on every page: `color-contrast` (text over gradients, images, translucent surfaces), and one `link-in-text-block` for the fallback link inside `<video>`. These need a person. |
| html-validate (`html-validate:recommended` with project overrides) | No errors on the five main pages |
| Duplicate IDs | None on any page |
| Internal links, `#anchors`, local images, scripts, styles, captions | All resolve |
| `aria-controls`, `aria-labelledby`, `aria-describedby` targets | All exist |
| Images without `alt` | None |
| `target="_blank"` links without `rel="noopener"` | None |
| Headings | One `h1` per page, no skipped levels, on all five pages |
| Console errors on page load | None |
| Autoplay | None |

The Nu HTML Checker could not be run (it needs Java). Run it, and WAVE, before publishing.

### Keyboard (real key presses in Chrome)

| Check | Pages tested | Result |
| --- | --- | --- |
| Skip link appears on first Tab and moves focus to `main` | K-Drama | Pass |
| Image viewer opens with Enter or Space | C-Drama (Space), Star Trek (Enter), Bobbywood (Enter), K-Drama | Pass |
| Focus moves into the dialog | All four | Pass |
| Tab stays inside the dialog | K-Drama, Star Trek | Pass |
| Escape closes the dialog | All four | Pass |
| Focus returns to the opener | All four | Pass |
| Page scroll lock applied and removed | K-Drama, C-Drama | Pass |
| Tab trap checked with real Tab key presses | K-Drama, Star Trek only | Pass; C-Drama and Bobbywood share the same code but were not tested for the trap |
| Mobile menu: `aria-expanded`, Escape closes and returns focus | K-Drama | Pass |
| Focus lands on the charter when opening `about.html#accessibility-charter` (tested before the nav change, using the old nav link) | From K-Drama | Pass; re-test using the footer link |

### Visual and responsive

| Check | Result |
| --- | --- |
| Reflow at 320 CSS px (equivalent to 400% zoom at 1280px) | No horizontal overflow on all five pages |
| Text spacing (SC 1.4.12: line height 1.5, letter spacing 0.12em, word spacing 0.16em) at 320px | No overflow or clipping after fixes to the C-Drama romance steps and the Bobbywood act header |
| Touch targets in the mobile menu | 44px high |
| Focus ring visible on light and dark surfaces | Checked by eye on the viewer close button and the skip link only; the ring on every other control still needs a check |

## Not yet tested

See the list in the project summary. In short:

- Screen readers (NVDA with Firefox or Chrome, JAWS, VoiceOver on macOS and iOS, TalkBack).
- Real browser zoom at 200% and 400% on a desktop (the 320px test is a proxy).
- Contrast of text over gradients, images, and translucent surfaces (the axe "needs review" items).
- The tab order and viewer behavior on touch devices.
- Trailer: audio description, and description of music and visual action.
- The K-Drama relationship-map text alternative with a screen reader.
- Pronunciation of the `zh-Hans`, `ko`, and `hi` passages with real voices.
- Reduced-motion behavior in a real operating-system setting.
- Windows High Contrast / forced colors.
- Testing with disabled people.

## Checklist for every page or change

Copy this into the pull request.

### Automated

- [ ] axe-core: 0 violations (run on the live page, including with a viewer open)
- [ ] WAVE: errors reviewed; alerts understood
- [ ] HTML validator: no errors
- [ ] No duplicate IDs
- [ ] All internal links and anchors resolve
- [ ] All five shared assets load (3 CSS, 2 JS) and there are no console errors

### Keyboard (no mouse)

- [ ] First Tab shows the skip link; Enter moves focus to `main`
- [ ] Tab order follows the visual order; nothing is skipped or trapped
- [ ] Every control shows a visible focus ring
- [ ] Navigation, including the mobile menu, works; Escape closes the menu
- [ ] Every image viewer opens with Enter and Space, traps Tab, closes with Escape, returns focus
- [ ] Disclosures (`<details>`) open and close with Enter and Space
- [ ] Episode jump links land on the right episode

### Screen reader

- [ ] Page title is unique and describes the page
- [ ] Landmarks: banner, navigation (Site, Footer), main, contentinfo
- [ ] Heading list makes sense: one `h1`, `h2` for sections, `h3` for subsections
- [ ] Link names make sense out of context; external links say "opens in a new tab"
- [ ] Every image has suitable alt text (or `alt=""` if decorative)
- [ ] Tables: caption, column and row headers announced
- [ ] Dialog: name announced, description read, focus inside, closing returns focus
- [ ] Screenplay: speaker, then line; stage directions identified
- [ ] Other-language passages switch voice (`lang`)

### Visual

- [ ] Text 4.5:1, large text and UI components 3:1
- [ ] Links are distinguishable without relying on color
- [ ] Focus ring visible against every background
- [ ] 200% and 400% zoom: no loss of content, no two-direction scrolling (except wide tables and
      code in their own scroll region)
- [ ] Text spacing bookmarklet: nothing clipped or overlapping
- [ ] Narrow (320px), tablet (768px), and desktop widths
- [ ] Long names and dialogue wrap

### Motion and media

- [ ] With `prefers-reduced-motion: reduce`, animation and transitions stop
- [ ] No autoplay; media has captions, a transcript, and (if needed) audio description
- [ ] Nothing flashes more than three times a second

### About page

- [ ] The brand link ("BDD Drama Universe") opens `about.html` from every page
- [ ] The footer Accessibility Charter link opens `about.html#accessibility-charter` from every page
- [ ] The LinkedIn link on `about.html` goes to `https://www.linkedin.com/in/viktoria-muirhead-255a285a/`, has a
      text name, opens in a new tab with `rel="noopener noreferrer"`, and says so
- [ ] No references to the old About popup remain
