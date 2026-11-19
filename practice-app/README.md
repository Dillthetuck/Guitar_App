# Fretboard practice interface preview

Prepared November 18, 2026 for the visual milestone. This is an interactive design specimen, not the finished game engine.

## Open it

Open `preview.html` in a browser. It is a single offline file with no installation, account, network request, or saved data. The modular source is `index.html`, `style.css`, `app.js`, `settings.js`, and `fretboard.js`.

The connected sample journey is:

1. Browse the four-file cabinet vertically or with Previous/Next controls.
2. Open Customize to review all planned settings and live pool validation.
3. Start practice and try answers, hints, skip/reveal, pause, open strings, or a 0–24 fret board.
4. End the sample session and switch among sample, insufficient-evidence, and zero-answer reports.
5. Return to the same cabinet file.

Question selection and reports are explicitly illustrative. Settings remain in memory only until refresh. No attempt history, persistence, real session timing, balanced sampler, or calculated recap is implemented in this milestone.

## Checks

Run `npm test` for the 16 deterministic music, filtering, and fretboard-rendering checks. The checked browser journey and limitations are recorded in `../INTERFACE-PREVIEW-REVIEW.md`.

