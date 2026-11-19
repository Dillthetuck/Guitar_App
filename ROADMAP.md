# Proposed process: prototype to iOS release
This is a planning outline for discussion. It does not commit to a stack, a delivery date, premium pricing, or a complete multi-unit launch.

## 0. Recover and establish the baseline
Review the copied prototype and prior feedback. Separate still-useful code from one-off demo behavior. Confirm Mac/iPhone access, development tools, target devices, available accounts, total versus monthly budget, and desired timeline.
Deliver: baseline inventory, open questions, an agreed process, and decision register.
Gate: Dylan approves the product brief and initial planning scope.

## 1. Define a small release and evidence of value
Recommend initially serving players who know some chord shapes but struggle with notes. Compare that with Dylan's broader beginner-to-triad ambition.
Define the full long-term map, then choose a small launch course and usable app areas: path, lessons, practice, progress, settings. Clearly mark deferred units.
Design the first-use promise, access before signup, placement/skip policy, progress measures, and a small target-player study.
Deliver: release scope, excluded features, user journeys, success/failure criteria, prioritized backlog.
Gate: Dylan approves scope with a reason; do not interpret marketing enthusiasm as evidence of demand.

## 2. Plan curriculum and assessment
Create a prerequisite map: fretboard orientation/open strings → note relationships → natural/accidental notes → intervals → chord construction/triads → inversions and CAGED connections. Exact order and depth need music-pedagogy review and player testing.
Propose a first fretboard unit. The earlier twelve-lesson outline is one candidate, not a settled curriculum.
Each 3–5 minute lesson needs: measurable objective, prerequisite knowledge, brief explanation, guided activity, independent questions, graduated hints, helpful correction, varied recall, recap, and review scheduling rules.
Specify finding versus naming notes; chord/triad construction with multiple valid shapes; interval spelling and enharmonic acceptance; fretboard range, tuning, string numbering, handedness, and accessibility.
Design placement by topic and skipping without falsely awarding mastery. Distinguish hinted/revealed answers from independent answers. Practice should mix encountered topics and weak areas rather than repeat memorized screen patterns.
Deliver: curriculum map, reusable exercise schemas, first lesson scripts, answer fixtures, review policy, future content-authoring/review workflow.
Gate: approve a small teaching slice before bulk lesson generation. Check immediate fresh recall, delayed recall, and eventual real-guitar transfer.

## 3. Establish design, characters, and audio
Explore a few original visual directions: type, colors, spacing, touch targets, navigation, map, cards, feedback, empty/error/offline states. Prototype fast puzzle-to-puzzle flow and comfortable portrait-phone fretboard use.
Define guitar-pick/guitar character personas by genre/vibe; avoid genre stereotypes as teaching facts. Specify animation scope, encouraging copy, reduced motion, sound mute, contrast, screen reader labels, and non-color feedback.
Separate UI success/error sounds from actual note playback. Create an asset specification for real guitar samples: pitch/octave and optional string/fret identifiers, format/size, decay, loudness, ownership, recording environment, and fallback strategy. Do not silently replace the real-guitar preference with synthetic audio.
Deliver: clickable flows, representative screens/states, character sheet, asset list, audio proof of concept.
Gate: Dylan approves visual and sound direction before large asset production.

## 4. Choose architecture and cost model
Compare plausible routes such as native SwiftUI, a cross-platform mobile client, or web-first validation followed by an iOS client. Score existing-code reuse, on-device interaction/audio, offline behavior, accessibility, testing, maintenance, and actual total cost. Verify current official docs before choosing.
Choose deterministic theory rules, declarative lessons, separate lesson state, progress storage, review selection, and versioned content. Define whether a backend is required for the first release; local-first avoids premature account/sync work but needs explicit data-loss and portability messaging.
If using a backend, specify ownership and access for profiles, attempts, progress, streaks, content, and premium entitlements. Plan authentication, authorization, offline conflict handling, migrations, backup/recovery, monitoring, rate limits, and secrets management. A paid entitlement cannot be trusted simply because a client flag says premium.
Identify data actually needed. Consider user age, analytics, consent, deletion, retention, privacy disclosures, tracking/ad SDK tradeoffs, and incident handling; verify applicable obligations before release. Microphone processing is a future scope choice, not an assumed requirement.
Deliver: decision record, system/data diagrams, data flow/threat review, cost ledger, testing/deployment plan.
Gate: Dylan approves architecture and any spending. Apple lists $99/year Developer Program membership; the preferred under-$50 non-token budget cannot cover that standard fee alone. Plan prototype spending separately and confirm any existing membership or applicable waiver before distribution.

## 5. Build one complete vertical slice
Implement the approved shell plus one genuinely taught lesson, real answer rules, feedback, recap, minimal progress persistence, and bounded review.
Prove audio and state boundaries early if included. Test the entire first-use experience rather than building many disconnected screens.
Deliver: playable local build, reproducible setup, meaningful checks, screenshots, known gaps.
Gate: Dylan personally tries it on the intended screen/device and reviews the overall feel; iterate before expanding.

## 6. Expand the first course and return loop
Add only approved lessons through the same content system. Implement endless practice, topic progress, placement/skip behavior, and streaks.
Specify qualifying activity, daily boundary/time zone, duplicate completions, offline sessions, travel, clock changes, inactivity, and recovery. Decide whether freezes/grace exist. Prefer a return experience that encourages learning; lives/hearts remain a product experiment.
Measure useful learning separately from lesson completions and streak length. Define reminders and notification consent without building pressure into every interaction.
Deliver: complete small course, persistence/recovery checks, beta candidate.
Gate: observed usability, timing, recall, and return findings inform expansion; no invented statistics.

## 7. Decide premium and business model
Compare free-with-premium, paid app, and an initially free validation release. Discuss ads, unlimited practice, deeper review/progress, cosmetic benefits, and any lives system later. Do not lock the core learning loop behind accidental frustration.
Model several explicit revenue/cost assumptions: active users, conversion, churn, store fees, refunds, hosting, support, and acquisition. No profit guarantee or inherited pricing from illustrative prior-chat calculations.
If subscriptions enter scope, verify current Apple purchase rules; plan purchase/cancel state, restore, expiration, refunds, offline access, and entitlement validation. Evaluate ad SDK privacy/performance costs before adoption.
Deliver: proposed free/premium boundary, conservative scenarios, tested purchase flow if implemented.
Gate: Dylan approves business choices and all charges.

## 8. Prepare iOS beta and release candidate
Verify current Apple tooling, signing, program enrollment, App Store review requirements, privacy information, age rating, account deletion if applicable, subscription disclosures, rights, and accessibility expectations.
Build and test on actual supported iPhones. Check small displays, interruption/backgrounding, audio routes, silent/mute behavior, offline use, crashes, upgrades, saved-data migrations, and backend outages.
Plan TestFlight where available, feedback intake, support contact, accurate screenshots/descriptions, privacy/support pages, and release rollback/recovery strategy.
Deliver: reproducible release candidate, beta findings/fixes, store materials, release checklist.
Gate: Dylan reviews the working candidate and evidence before public release. “iOS-ready” requires real build/device evidence; App Store approval is external and cannot be promised.

## 9. Launch, learn, and maintain
Start with an honest gameplay demo for Instagram/TikTok and a small feedback cohort. Separate organic outreach from paid acquisition. Agents may draft marketing, but posting/contacting others is not authorized by this handoff.
Track onboarding completion, lesson outcomes, fresh recall, repeat use, crashes, and support issues with minimal necessary data and an agreed privacy model.
Prioritize observed obstacles before adding large curriculum/character systems. Maintain dependencies, platform compatibility, content correctness, backups, security updates, costs, and support.
Deliver: release review, prioritized learning/defect backlog, next bounded milestone.
Gate: Dylan decides whether evidence supports more investment, a revised product, or stopping.

