# Cabinet and fretboard interface review

November 18, 2026. Status: ready for Dylan's visual decision. This is the second major gate in `FRETBOARD-RELEASE-PLAN.md`; the full game milestone is not yet authorized.

## Ready to review

The standalone artifact is `practice-app/preview.html`. It connects the complete proposed visual journey: paper file cabinet → complete settings sheet → representative naming questions and feedback → report with exactly three sample insight cards → same cabinet file. Every screen is visibly labeled as an interface preview, and no sample results are presented as Dylan's data.

The cabinet uses four vertically stacked paper files with tabs, overlapping edges, restrained shadows, a drawer frame, finite Previous/Next controls, and the required exact placeholder text. Only Fretboard naming practice has actions. The accepted pale-paper/blue-ink neck direction carries into the practice screen: high E above low E, one solid tested string, five dashed strings, progressive string thickness, nut, frets, markers, neutral string numbers, target ring, and stable geometry.

Customize includes Board, Question pool, Answers and spelling, Practice behavior, and Local data. It uses a full-height modal sheet on narrow screens and a side panel on larger screens. Draft controls have a live eligible-position count, empty-intersection explanation with disabled Apply, one-position repetition notice, separate target and answer settings, and fixed Cancel/Apply controls. Applying during a question queues changes for the next sample question.

The report shows exactly three insight cards and switchable representative states: normal sample evidence, insufficient evidence, and zero answers. All statistics are stamped SAMPLE REPORT / NOT YOUR RESULTS. The practice and report logic is deliberately illustrative; it does not save attempts or calculate real metrics.

## Actual checks

- Modular JavaScript parsed; the offline `preview.html` was regenerated from the checked source.
- `npm test`: 16 passed, 0 failed. Tests cover the required known-note fixtures, fret 12/24 repeats, empty/single/intersected pools, spelling-independent pitch identity, mirroring, minimum fret spacing, string emphasis/thickness, position markers, open-note leakage, cropped ranges, and display toggles.
- Browser: cabinet, settings, question, wrong/correct feedback, queued settings, hint/pause, recap, and return-to-files states were exercised.
- Empty string filters disabled Apply with a plain-language conflict. A valid one-position pool enabled Apply and displayed the repetition notice.
- A first wrong answer locked all 12 controls and remained incorrect after the correct note was revealed. The current sharp answer bank stayed frozen when combined spelling was queued; combined labels appeared on the next question.
- Pause required Resume. A source-review defect allowing settings/background interruptions to bypass Resume was fixed, as were stale render callbacks during fast transitions.
- Open-string accessibility text announced string and open position without the answer. The target ring contained no note name.
- A 0–24 board measured 1,819 pixels inside board-only horizontal scrolling; the page itself did not acquire horizontal overflow. Fret 24 showed two position markers and exactly one tested string was solid.
- Browser viewports checked: narrow portrait around 320 pixels, portrait around 390 pixels, and landscape 736 × 414. Twelve combined-label answer controls measured about 89 × 48 pixels at the portrait check. The settings footer remained visible while its content scrolled.
- Cabinet keyboard Home/End reached finite first/fourth files and correctly disabled Previous/Next at endpoints. Native dialog behavior contained focus and Escape cancelled back to the opener.
- Screenshots saved in `practice-app/screenshots/` for cabinet, settings, question desktop/portrait/landscape, and recap desktop/portrait.

## Corrections made during review

Fixed the clipped first folder tab, settings-footer structure, narrow cabinet height, zero-answer recap heading, target centering after resize, return scroll preservation, explicit Resume after backgrounding settings, and route guards for deferred callbacks.

## Limits

This is browser evidence, not a physical iPhone 11 check or evidence of player learning. Text-enlargement and a full screen-reader audit remain unperformed. The review uses local system fonts, so final letterforms may vary by platform. Persistence, session restoration, idempotent attempt saving, real timing, balanced sampling, delayed auto-advance guards, local-data reset, and computed statistics belong to the next milestone.

## Lead recommendation and decision

Recommendation: accept this cabinet, settings, practice, and report direction for the full game milestone. Preserve the quiet cabinet, strong fretboard hierarchy, blue ink/pale paper palette, and explicit sample/report honesty. Continue refining spacing and type while implementing real behavior rather than adding characters or decoration in this release.

Decision needed from Dylan: approve this overall interface feel and authorize the full game milestone, or identify the visual changes that must be made first. Record his actual response and rationale in `DECISIONS.md`; do not infer approval from silence.

