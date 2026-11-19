# Fret Trail — Find your C

Standalone playtest prototype, November 4, 2026. The earlier Chapter 10 submission is unchanged.

## Run locally

Open dist/index.html directly, or serve dist with a static HTTP server. There are no dependencies, accounts, audio, analytics, or application-level network requests. Refresh resets the lesson.

## Lesson

Standard tuning, high E at the top. Guided order: low E, A, D, G, B, high E, followed by all six. Frets 1–12 remain visible and open-string notes are labeled. Only the current string is enabled until the final round.

Correct C positions, low to high: 8, 3, 10, 5, 1, 8.

A mistake reveals the nearest landmark among frets 3, 5, 7. Further hints are requested explicitly: adjacent B/C-sharp, then C itself. On A and G, the landmark is already C. Even after revelation, the player must tap C. In the final round, wrong taps do not remove correct answers; each solved string locks to prevent duplicate counting. Players can restart guided practice if stuck.

## Assistant verification

- JavaScript syntax checks passed.
- Independent expected-position checks passed for all C positions, adjacent B/C-sharp notes, and nearest landmarks.
- Browser: no login before lesson; only current string enabled; wrong low E answer revealed B at fret 7; explicit adjacent/reveal hint stages; revelation did not advance automatically.
- Browser: completed six guided rounds; final round enabled all strings; wrong final answer did not advance; finish unavailable after five C notes and available after six; completion recap showed 8/3/10/5/1/8.
- Visual browser inspection at desktop width and in a 390-pixel iframe: all six strings and 12 frets fit; no horizontal fretboard scrolling.

These are assistant-run checks, not Dylan's or participant observations. Real-phone touch comfort and learning effectiveness remain untested. No claim of independent mastery is made. No playtest data is saved by the app; hosting may keep ordinary access logs.

## Suggested participant observation

Give the link without a walkthrough. Observe whether the person starts, understands which string is active, finds and uses hints, completes the lesson, and can locate a C afterward without the same hint. Ask what felt confusing and whether they would choose another lesson. Record actual observations separately.
