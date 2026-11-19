# Confirmed visual direction and exercise orientation

November 6, 2026. Owner: lead. Dylan supplied palette and style references and chose portrait navigation with landscape exercises. This confirms a direction for design work; actual screens, typeface, final graphics and overall feel still require his review. Product implementation remains behind the planning gate.

## User-supplied references

Original images are preserved unchanged in context/design-references/:

- line-style-blue.png: blue, softly irregular linework on a very pale yellow background.
- palette-yellow.png, palette-orange.png, palette-red-orange.png: three solid warmer swatches.
- line-style-black.png: minimalist continuous-line drawing reference.
- guitar-note-style-reference.png: additional blue guitar/music-note drawing on pale yellow. Stronger guitar-specific reference; not automatically designated as an app icon or final logo.

Dylan said he will supply more specific graphics later. Treat drawings as style references; do not trace, publish or present them as newly created original assets. No animal-mascot direction is inferred from the earlier abstract references. Guitar/pick characters remain the stated preference.

## Confirmed choices

- Palette and preferred style come from the supplied references.
- Typography and lines should carry a textured, minimalist line-art character.
- Navigation is portrait; exercises are landscape. Dylan says rotating would feel natural.
- Exercise levels progress from light yellow through yellow/orange to red-orange.
- On clarification Dylan selected **harder exercise levels**, rather than progress through each lesson, as the meaning of the color progression.

Keep availability separate from level color: an advanced red-orange exercise is accessible if implemented, regardless of completed beginner material. Color is not a mastery badge, prerequisite lock or payment status.

## Proposed visual application

Use a quiet pale-yellow foundation with expressive blue linework, generous space and controlled texture. The guitar/music-note reference suggests how music-specific illustration can carry personality without filling every area with rewards or characters. Final illustration/asset choice remains open.

Preserve the instrument's visual structure: recognizable nut, strings, frets, markers and clear active positions. Add slight stroke irregularity/texture without moving fret geometry or making tap targets irregular. Interactive target sizes are independent of the drawn mark. Do not blur text or shake/jitter the board to create a handmade effect.

Typography should share the handmade/printed character. Recommend texture most clearly in headings and restrained texture in small functional text, with readable note names, fret numbers, accidentals and instructions. Check E/F, B/8, sharp/natural/flat distinctions before choosing any font. No typeface, license or font purchase is selected.

Use color progression for level accents, frames or controlled background areas. Label levels in text, so color is not the only cue. Do not turn the whole screen red-orange on a wrong answer or make advanced levels look like error states. Provide explicit words/symbols for correctness.

Exact number of levels, their names, curriculum mapping, dark mode and the extent of each color's coverage remain design proposals. The four visible palette stages do not require exactly four lessons, four exercise types or a fixed mapping of Notes/Intervals/Scales/Chords.

## Orientation behavior to specify and verify

Portrait navigation opens a landscape exercise layout, then returns to the prior portrait navigation state on exit. Preserve the current question, help and progress across rotation and interruptions. Do not equate landscape preference with permission to discard accessible controls or require a browser orientation-lock feature that has not been verified.

An original landscape fretboard specimen is the next visual review artifact. Verify it on iPhone 11, including horizontal/vertical safe areas, answer buttons, help, readable correction and exit. Browser/platform orientation behavior and a usable fallback remain architecture/QA questions; no orientation-lock implementation is approved here.

## Palette sampling and checks

The supplied swatches use an embedded Display P3 profile (confirmed by native image metadata inspection). Raw encoded RGB values must not be mislabeled as sRGB hex colors. The original profiled files remain authoritative. Recorded raw Display P3 samples: yellow RGB 239/232/113, orange 239/175/90, red-orange 233/125/82; the first blue-line reference's predominant pale background is 255/255/220. These are source-profile coordinates, not final sRGB design tokens. Native conversion was also sampled, but exact cross-surface implementation colors need a rendered check before acceptance. No source images were altered.

Future review must check contrast, small-text clarity, fretboard geometry, touch accuracy, texture at actual screen size, feedback distinguishability and level labels. No screenshot approval, physical-device evidence, accessibility result or final visual acceptance has occurred for this new direction.

Review update November 6: Dylan accepted the landscape specimen's visual/interaction direction (“looks super good and works well”), requesting dashed inactive strings. The change was applied and browser-checked. This supersedes the pending specimen-feedback statement above; physical-device and full-app acceptance remain outstanding. Tested string stays solid; non-tested strings are dashed.
