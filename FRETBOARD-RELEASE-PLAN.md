# Configurable fretboard practice — implementation plan

November 18, 2026. Owner: accountable lead. Status: plan approved by Dylan; interface milestone complete and awaiting his visual decision. Authoritative request preserved in context/briefs/2026-11-18-fretboard-release-request.txt. Full game implementation remains behind the visual gate.

## Release boundary

Confirmed by the new request: no-account paper cabinet → configurable six-string note naming → unlimited questions → real recap with exactly three insights → same cabinet position. The cabinet replaces the lesson-path home for this release. Earlier low-E/A teaching scope remains historical and does not constrain this exercise. Only Fretboard naming practice works; three proposed placeholder folders display only “Future feature not yet released.” No lessons, achievements, subscriptions, audio, microphone, social features, cloud analytics, backend, deployment, or spending.

Proposed defaults from Dylan's brief: standard tuning; all six strings; open through fret 12; all pitch classes; 12 answers; sharp labels; unlimited/manual Next; no timer; hints available; balanced randomized positions. Recommendation: adopt these unchanged. Standard tuning is the only tuning in this release; no custom tuning editor is implied.

## Baseline and reuse

- Read the eight requested project documents and inspected both code baselines. The accepted landscape HTML is separate from prototype/dist. Preserve both unchanged.
- Accepted specimen: blue SVG neck on pale paper, subtle line displacement, progressive string weights, solid tested/dashed other strings, nut, numbered frets, warm target, compact feedback. Reuse its visual construction, adapted to arbitrary ranges and stable geometry.
- Do not reuse its six-question loop, hardcoded pitch table, retry-until-correct grading, host widget state, three-answer bank, or responsive rule hiding frets. Those violate this release's requirements.
- Older prototype: useful deterministic pitch arithmetic and C-position fixtures, but lesson navigation, hints, feedback scoring, and always-visible tuning labels are unsuitable for the new app.
- Reference currently imports Google fonts. Recommend system functional fonts and an available local expressive heading fallback for the review; assess appearance before choosing bundled licensed fonts. No external font dependency required.
- Fresh browser inspection was attempted but local-file navigation was blocked by browser policy. Source inspection is complete; actual appearance/behavior must be rechecked at the interface milestone through an authorized preview. Historical browser checks are documented in LANDSCAPE-CONCEPT-REVIEW.md and are not new test evidence.

## Recommended implementation

Create an isolated practice-app/ folder with plain HTML, CSS, and JavaScript modules, served locally for review. This fits the existing small dependency-free app and one exercise; a substantial UI framework, service, or native project adds no necessary capability here. Use SVG for the neck, semantic HTML for buttons/forms/reports. Use built-in JavaScript test facilities where available; inspect installed tooling before choosing browser automation. No packages or vendors are committed by this plan.

| Responsibility | Proposed module | Contract |
| --- | --- | --- |
| Cabinet | cabinet.js | Native vertical scroll, proximity snap, selection/scroll/focus restoration |
| Neck | fretboard.js | Pure position geometry plus rendering; never controls grading |
| Music | music.js | MIDI→pitch class and independent sharp/flat/combined labels |
| Settings | config.js, settings.js | Draft/validate/apply; pool counts; separate view and question filters |
| Selection | selection.js | Shuffle bags, boundary-repeat avoidance, explicit review mode |
| Session | session.js | State transitions, immutable question snapshots, event guards |
| Attempts | attempts.js | Exactly one resolved record per question ID |
| Statistics | statistics.js | Accuracy, qualifying median, evidence-based focus |
| Persistence | storage.js | Versioned validation, checkpoints, bounded history, graceful failure |
| Integration | app.js | Route/view composition, announcements, focus and interruption events |

Lead owns integration and edits. Bounded read-only music/session and interface reviews inform planning. During implementation, independent QA receives the actual app and tests; reviewers do not approve Dylan's visual gate. No Gemini involvement is claimed.

## Interface milestone: concrete review scope

Build only after plan approval. A clearly marked “Interface preview — sample questions and report” connects four states:

1. Cabinet: quiet drawer frame, four vertically browsable paper folders, visible tabs/edges, active face fully readable, labeled Previous/Next controls with finite ends. Working file has the exact title/description, settings summary, Start practice and Customize. Placeholder content remains exact and has no pretend actions.
2. Settings: grouped Board, Question pool, Answers & spelling, Practice behavior, Local data. Mobile full-height sheet with fixed Cancel/Apply and independently scrollable contents; desktop side panel. Show empty-pool and one-position states. Use representative controls visibly; identify any preview-only behavior rather than imply production persistence.
3. Question: “What note is this?”, one target ring, neutral string numbers/high-low cues, all 12 answer buttons, hint/skip/reveal/Next and persistent End session. Show representative correct, wrong and paused states. Horizontal scrolling preserves readable fret cells on portrait screens. Target scrolling never moves focus.
4. Recap: small paper report with explicitly synthetic counts and exactly three insight cards, plus Back to files. Include zero-answer and insufficient-data variants for review.

Review portrait cabinet and portrait/landscape practice, reduced motion, visible focus, enlarged text, settings focus restoration and cabinet return position. The reviewed artifact is deliberately a design specimen, not the finished game. Stop before full engine work for Dylan's visual decision.

## Precise behavior to implement after visual approval

### Board and pool

String identity is 6→1 with MIDI 40,45,50,55,59,64; display order is 1→6. Left-handed view mirrors horizontal geometry only, not string identity or pitch arithmetic. For visible lower bounds above zero, draw a cropped-neck boundary, never a fake nut. Open area exists only when zero is visible and included. Show fretted position count separately from open area. Marker frets: 3,5,7,9,12,15,17,19,21,24; double marks at 12 and 24. Maintain readable minimum spacing and horizontal overflow rather than shrink or silently hide selected frets.

Visible interval, open inclusion, selected strings, selected frets and pitch classes all intersect. Preserve draft selection values outside the visible range but count only eligible positions; clearly explain inactive selections. Integer ranges 0–24, start≤end. No eligible positions disables Apply, explains the conflict and offers Reset filters without replacing the last valid settings. One eligible position is valid with a repetition notice. Reset filters proposes all strings/frets/pitches within the current board; Reset to defaults resets all settings, never history.

Answer count is independent of target-note filters. With 12 use stable chromatic order; with 2–11 randomly order correct pitch plus unique distractors drawn from the other 11 classes. Labels are presentation only; combined enharmonic names share one button. No target pitch appears in visible or accessibility labels before feedback, except explicit assistance. Optional tuning labels mark open-string questions assisted from the outset.

Balanced mode shuffles the finite eligible pool, visits each once, then reshuffles with a boundary swap to prevent immediate repetition when possible. No retry-until-valid loops. Proposed optional extra-review policy: insert at most one missed-position review after every three regular positions; review positions must remain eligible; regular bag coverage continues. Snapshot review origin on attempts and label this mode distinctly.

### State, timing and recording

Main states: cabinet, active question, feedback, paused, settings, recap. Settings holds a return state and a draft; paused holds a resumable state. Every active question owns a frozen configuration and answer bank. Apply persists valid future settings and displays “Changes apply to the next question”; current grading, hint availability and bank remain unchanged. Rebuild the sampling bag on the next question when pool/selection settings change.

First answer locks input synchronously, emits one attempt, then shows feedback. Wrong answers stay wrong, reveal the correct note/location in feedback (never inside the target ring) and require explicit Next even in auto mode. Hint marks support but does not resolve; reveal or skip resolves once with its own outcome. Ending excludes any unanswered current question (including hint-only), while preserving already resolved feedback. A hinted answer is resolved when submitted and is included in the accuracy denominator.

Proposed automatic delay: 1.5 seconds, adjustable 0.5–5 seconds. Bind each scheduled advance to session/question IDs and a generation token. Cancel on pause, settings, end and replacement. Never advance a wrong response or a different question through a stale callback.

Use accumulated monotonic active-time segments, not elapsed wall-clock subtraction. Question timing stops at submission/reveal/skip; no feedback/transition time enters answer speed. Session active duration includes foreground practice/feedback but excludes settings, dialogs and pauses. Visibility loss or page interruption enters paused; returning requires explicit Resume. Restoration also starts paused. Store accumulated time, not a monotonic timestamp from a former page.

Record session/question IDs, string/fret, target pitch, submitted pitch or skip/reveal, correct-first flag, assistance reasons, choice bank/count, spelling, full relevant config, review origin and active response milliseconds. Upsert by question ID; commit session by session ID. Commit attempts and checkpoint together in one versioned storage envelope. Restoring feedback cannot produce a second attempt. Checkpoint after state changes and periodically while actively answering; disclose that a sudden crash may lose the last short timing segment.

### Recap

1. Unassisted correct first answers / all resolved questions, raw counts and percentage. Include wrong/assisted/revealed/skipped outcomes in denominator. Break down mixed choice counts and actual assistance/support configuration inside the same card. Describe multiple-choice performance without claiming recall, retention or guitar transfer.
2. Median active time of unassisted correct first answers only; require ≥5 and show n. Otherwise use the exact requested fallback. Speed is descriptive, not a learning score.
3. Compare eligible string and pitch groups with ≥5 resolved questions; recommend the lowest unassisted-correct proportion only when it contains unsuccessful outcomes. Proposed ties: larger sample, then string before pitch, then numeric identity. Show numerator/denominator and “based on this session.” Otherwise report truthful coverage, including zero-answer state. Use this focus opens editable settings for the next session and never launches it; validate against all remaining filters.

Independent synthetic fixture: eight resolved questions with five unassisted correct times [1000,2000,3000,4000,9000] ms, one wrong, one hinted correct, one skip gives 5/8 = 62.5%, median 3000 ms, n=5. An untouched ninth question changes none of those values. Separate fixtures cover reveal, labels, mixed support, group ties, and n=4 fallback.

### Browser-local data

Use a new namespaced schema; do not touch old keys or learner data. Store settings, one active checkpoint, and proposed last 20 completed-session attempt histories with compact older summaries bounded to 100 sessions. Keep the active session unlimited: if detailed records exceed storage capacity, continue in memory with an honest persistence warning rather than end practice or silently discard current results. Final storage limits and stress behavior must be checked; quota is not guaranteed.

Validate types, enums, ranges, IDs, duplicates and derived pitch/choice consistency on read. Corrupt/unknown-version data is not silently overwritten; fall back to safe in-memory defaults and explain recovery/reset. Unavailable storage does not crash play. Show “Data stays in this browser. Clearing browser storage can remove it. It does not sync across devices.” Local-data reset needs an explicit confirmation naming settings/history/checkpoint, and affects only this app's namespace. Settings reset is a separate action.

## Milestones and acceptance evidence

| Gate | Ready for Dylan | Required decision |
| --- | --- | --- |
| 1: Plan, approved November 18 | Scope, reuse assessment, architecture, defaults and tests in this document | Dylan approved: “ok I aprove, Go” |
| 2: Interface, ready | Interactive sample journey, actual screenshots, browser observations and gaps in INTERFACE-PREVIEW-REVIEW.md | Accept cabinet/settings/recap feel and authorize full game milestone |
| 3: Game acceptance | Real unlimited game, configuration, persistence, three computed insights, actual tests and walkthrough | Accept finished experience or specify in-scope revisions |

No new date or overnight allowance is inferred. Each milestone stops at its named human gate. Ordinary fixes inside an approved milestone continue autonomously. Public release remains separate.

Verification after build: independent known-note fixtures in the original request (including all C positions and fret 12/24 octave repeats); enharmonic equivalence; unique/correct answer banks; filter intersections, empty/single pools; balanced coverage and boundary repeats; deliberate review behavior; no open-answer leakage; duplicate events/stale timers; hint/wrong/reveal/skip/end accounting; queued settings; clock exclusion; refresh/resume; corrupt/denied/quota storage; idempotent save; zero/low-data and exactly-three-card recap; cabinet navigation/return; portrait/landscape, 0–24 overflow, mirroring and cropped neck; keyboard/focus/reduced motion/enlargement. Real iPhone checks remain Dylan/device evidence, never inferred from viewport simulation. No learning outcome inferred from interface tests.

Current evidence: document and source inspection, plus completed independent music/session and interface source reviews. Both recommend replacing the specimen engine while preserving instrument styling. Integrated findings: atomic attempt/checkpoint envelope, explicit hint-only end behavior, horizontal-only mirroring, no target-ring answer text, and no fabricated weakness for perfect groups. No new app, screenshots, runtime tests, purchases or public deployment. Browser reference inspection blocked as noted above.
