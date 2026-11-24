# BDD Accessibility Charter

This is the source text for the charter published at
[`about.html#accessibility-charter`](../about.html#accessibility-charter). If you change one,
change the other.

This charter describes the project's commitment to accessible information and inclusive design.
These are design commitments and ongoing work. They are **not** a claim of formal certification
or conformance.

## Our commitments

1. **Accessibility is part of information design.** It is considered from the first draft, not
   added afterwards.
2. **Essential information is never only in an image or a visual effect.** Images have text
   alternatives, and diagrams have a text equivalent.
3. **Content is understandable through its structure.** Pages use landmarks, a logical heading
   hierarchy, lists, and tables with headers, so the story can be followed without seeing the
   layout.
4. **Everything can be used with a keyboard.** Navigation, image viewers, and expandable content
   work without a mouse, and keyboard focus is always visible.
5. **Interactive elements have accessible names and predictable behavior.** Buttons look and act
   like buttons, links look and act like links, and a dialog moves focus in, keeps it in, and
   returns it when closed.
6. **Text stays readable across devices and zoom levels.** Pages are designed to reflow on small
   screens and when text is enlarged, without hiding content.
7. **Color is never the only way to communicate meaning.** Current page, links, and status are
   also shown with text, shape, or underline.
8. **Multimedia has alternatives.** Video provides captions and a transcript.
9. **Reduced-motion preferences are respected.** Animation and transitions are removed for
   visitors who ask for less motion.
10. **Accessibility is revisited during creation, review, and maintenance.** New stories follow a
    shared template and checklist so improvements are not lost.

## Writing in other languages

Some stories include Chinese, Korean, and Hindi names and phrases. They are marked with the
appropriate `lang` attribute (`zh-Hans`, `ko`, `hi`) so that screen readers can pronounce them
correctly.

## What this charter is, and is not

The target is WCAG 2.2 Level AA. Automated checks and a first round of keyboard review have been
done. Manual testing with screen readers, at high zoom, and with real users is still in
progress. Until the relevant criteria have been fully evaluated, the project does not claim
conformance. See [accessibility-testing.md](accessibility-testing.md) for what has and has not
been tested.

## How the commitments are kept

| Commitment | Where it is implemented |
| --- | --- |
| 3, 4 | Shared header, skip link, landmarks: [design-system.md](design-system.md) |
| 4, 5 | Shared image viewer: `assets/js/bdd-components.js` |
| 4, 6, 7 | Focus, link and button rules: `assets/css/bdd-accessibility.css` |
| 6 | Reflow and table wrappers: `assets/css/bdd-responsive.css` |
| 8 | Captions (`.vtt`) and transcript on the trailer |
| 9 | `prefers-reduced-motion` rules in `bdd-accessibility.css` |
| 10 | [new-story-template.md](new-story-template.md) and the checklist in [accessibility-testing.md](accessibility-testing.md) |
