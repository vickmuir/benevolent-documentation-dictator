# New story template

How to add a new BDD production without reintroducing accessibility problems. Read
[design-system.md](design-system.md) first. The bar to meet is in
[accessibility-testing.md](accessibility-testing.md).

The rule: **share the structure, not the look.** Your story supplies its own palette, fonts,
and layout in its own `<style>`. Everything below is the part that must stay the same.

## 1. Page skeleton

Copy [`star-trek-lost-repository.html`](../star-trek-lost-repository.html) or any story page for
the header and footer markup, then start from this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Story title | Genre</title>
  <!-- Open Graph and Twitter tags, as on the other pages -->
  <!-- Story fonts -->
  <link rel="stylesheet" href="assets/css/bdd-design-system.css">
  <link rel="stylesheet" href="assets/css/bdd-accessibility.css">
  <link rel="stylesheet" href="assets/css/bdd-responsive.css">
  <style>/* story-specific look and feel only */</style>
</head>
<body data-bdd-theme="bdd">
  <a class="bdd-skip-link" href="#main-content">Skip to main content</a>

  <header class="bdd-site-header">
    <nav class="bdd-nav" aria-label="Site"> <!-- shared nav: copy from another page --> </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>Story title</h1>
    <!-- sections -->
  </main>

  <footer class="bdd-footer"> <!-- shared footer: copy from another page --> </footer>

  <script src="assets/js/bdd-accessibility.js" defer></script>
  <script src="assets/js/bdd-components.js" defer></script>
</body>
</html>
```

Checklist for the skeleton:

- [ ] `lang="en"` on `<html>`; a unique `<title>`.
- [ ] Skip link is the first focusable element.
- [ ] The author's name in the byline and the footer credit links to `about.html`.
- [ ] One `<header>` (site), one `<nav aria-label="Site">`, one `<main>`, one `<footer>`.
- [ ] Add the story to the **site nav** (story pills), the **footer nav**, the production list on `about.html`,
      and the README. Update every page, not just the new one.
- [ ] Set `aria-current="page"` on the new story's link in its own nav and footer, and remove it
      from the others.
- [ ] Add a theme to `bdd-design-system.css` (`body[data-bdd-theme="yourtheme"]`) if the shared
      themes do not fit. Keep the same variable names.
- [ ] Do not copy the viewer, menu, or skip-link code into the page. Use the shared files.

## 2. Heading hierarchy

- Exactly one `<h1>`: the story title.
- `<h2>` for every major section (cast, mandate, episodes, screenplay excerpts).
- `<h3>` for subsections (a character, an episode, an act).
- Never skip a level, and never choose a level for its size. If a section needs to look small,
  use the correct level and style it with CSS (`.bdd-h-flat` removes the shared heading decoration
  so your own rule applies).
- Callout boxes with a title ("Essential … Mandate") are `<h2>`, not `<h4>`.

## 3. Images and alt text

- Every `<img>` has an `alt`. Describe what matters to the story, in one or two sentences:
  who, what they are wearing or holding, and the mood. Do not start with "Image of".
- Decorative images (`✨` flourishes, backgrounds) use `alt=""` or are CSS backgrounds.
- If the image is inside a link or button, the alt text is part of that control's name.
- Text that appears inside an image must also appear as real text on the page.
- Diagrams (relationship maps, charts) need a text equivalent, such as a nested list.
  Hide the visual with `aria-hidden="true"` only when the text version is on the page.

## 4. Image viewer and modals

Use the shared viewer. See "Image viewer" in [design-system.md](design-system.md) for the markup.

- The trigger is a real `<button>` containing the `<img>`, not a clickable `<div>` or `<img>`.
- Give it `data-bdd-viewer`, `data-viewer-title`, and `aria-haspopup="dialog"`.
- Do not write a new dialog. If you need a different kind of modal, extend `bdd-components.js`
  and meet the same rules: dialog role and name, focus moves in, Tab is trapped, Escape closes,
  there is a labelled Close button, focus returns to the opener, and it works at 320px and 400%
  zoom.

## 5. Keyboard and focus

- Use `<a>` to go somewhere and `<button>` to do something. Never `div`/`span` with `onclick`.
- Do not set `outline: none`. Do not set `tabindex` greater than 0.
- Expandable content uses `<details>`/`<summary>`, or a `<button aria-expanded>` that controls a
  region with `aria-controls`.
- Anything that appears on hover must also appear on focus, and be dismissible.
- Keep the DOM order the same as the visual order.
- Touch targets are at least 24×24 CSS px (the shared styles use 44px for the menu).

## 6. Screenplay and dialogue

```html
<div class="script-box" role="group" aria-label="Screenplay excerpt: the Lost Repository">
  <p><span class="bdd-sr-only">Stage direction: </span>[Scene: the bridge. Red alert.]</p>
  <dl class="script-dialogue">
    <dt>CAPTAIN BOB</dt>
    <dd>The issue is not the issue.</dd>
  </dl>
</div>
```

- Speaker names are `<dt>`; lines are `<dd>`; stage directions are `<p>` with the visually hidden
  "Stage direction:" prefix.
- Do not use line breaks or color alone to separate speakers.

## 7. Other languages

Wrap every phrase in another language: `<span lang="ko">밥 도사</span>`,
`<span lang="hi">...</span>`, `<span lang="zh-Hans">博先生</span>`. Put it on names too. Add the
English gloss in plain text next to it. If the whole section is in another language, put `lang` on
the section element. Use `lang` on the `<dt>` or `<dd>`, not on a wrapper that also holds English.

## 8. Tables, lists, and episodes

- Data in rows and columns is a `<table>` with `<caption>`, `<th scope="col">`, and
  `<th scope="row">`. Wrap it in `<div class="bdd-table-wrap" data-label="...">`.
- A sequence that matters (laws, steps, episodes) is an `<ol>`; otherwise `<ul>`.
- Long episode lists: give each episode title an `<h3 id="episode-N">` and add a
  `bdd-episode-nav` jump list.
- Character cards: an `<h3>` for the name; the image trigger, quote, and facts follow it.

## 9. Responsive design

- Mobile first. Test at 320, 768, and 1280px.
- Grids: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`. Never `minmax(280px, 1fr)` alone.
- Use `rem` or `em` for text, never fixed `px` heights on text containers.
- Long names and words: `overflow-wrap: anywhere` and `min-width: 0` on flex children.
- No horizontal scroll at 320px except inside a `.bdd-table-wrap`.
- Images: `max-width: 100%; height: auto`.

## 10. Color and motion

- Text 4.5:1, large text and UI parts 3:1. Check every palette color used for text on white.
- Never use color alone for meaning (add text, an icon with a name, or an underline).
- Links in body text are underlined.
- Any animation must be disabled by `prefers-reduced-motion: reduce`. The shared CSS does this for
  `animation` and `transition`; for JavaScript animation, check `matchMedia`.
- No autoplay. No content that moves for more than 5 seconds without a pause control.

## 11. Video and audio

- Captions (`<track kind="captions" srclang="en" label="English" default>` with a `.vtt` file).
  Use `<v Speaker>` tags for speakers.
- A transcript in a `<details class="bdd-disclosure bdd-transcript">` below the video.
- If the visuals carry information that the audio does not, provide an audio description or a
  descriptive transcript. Do not guess at what is in a video: describe what you can see.

## 12. Before you merge

Run the full checklist in [accessibility-testing.md](accessibility-testing.md) and put the results
in the pull request. Do not describe the page as "WCAG compliant" or "conformant" unless the
criteria have been evaluated and recorded.
