# Living product specification

Started November 5, 2026. Owner: lead agent. Status: initial planning proposal; no product implementation approved.

## Current priority: Echo competitor discovery

Dylan rejected both design specimens for an AI-created feel and weak fretboard presentation, then explicitly pivoted to competitor discovery before further design/build work. Public assessment is in ECHO-COMPETITOR-DEBRIEF.md; his submitted hands-on notes are synthesized in ECHO-PLAYTEST-NOTES.md. On November 6 he approved open topic access with a recommended path and optional assessment, emphasizing low entry friction and daily practice. His musictheory.net exercise reference is analyzed in MUSICTHEORY-FRETBOARD-ANALYSIS.md. Earlier low-E/A coverage remains recorded; revised scope/date, visuals and implementation remain pending.

## Authority and evidence

Dylan requested kickoff planning using KICKOFF-PROMPT.md. Its recommendations and the older assistant's roadmap remain proposals. Confirmed preferences are recorded in VISION.md and DECISIONS.md; this document does not convert them into launch requirements. Historical coursework is context only.

Lead owns integration and edits. Two bounded read-only specialists reviewed learning/product risks and technical routes. No Gemini review has occurred. Check authenticated access and billing before a later bounded Gemini critique; use a manual handoff if unavailable. No API or subscription entitlement is assumed.

## Confirmed learner and proposed promise

Design/orientation update November 6: portrait navigation and landscape exercises are selected. Supplied textured minimalist line-art references and palette govern the next visual exploration; warmer colors represent harder exercise levels. See VISUAL-DIRECTION.md. Final screens/assets and feel still require review.

Dylan initially selected chord-shape players who want to locate/name fretboard notes. He has now clarified that the product must also teach learners who do not know notes, with optional guided routes for each exercise area and open endless practice. See TOPIC-LEARNING-MODEL.md. This expands the required entry support, not the approved prototype's topic breadth or a full beginner playing course. Proposed promise: build a usable mental map in short visual sessions away from a guitar. Strong players retain direct access to available practice without beginner-course locks.

## Proposed first release versus first build

First release candidate: one small fretboard-notes course; path, lesson, practice, progress and settings; local saved progress; a simple learning-based streak; real-guitar audio with mute once recording/rights and playback are validated. No exact lesson count yet. Topic skip is allowed without awarding mastery; a broad placement test waits for broader content.

First build, after the full planning gates: one complete teaching slice with fresh independent assessment, bounded review and saved progress. Use it to validate interaction, sound and learning before producing the full notes course.

Specialist reconciliation: the learning reviewer recommends a still smaller pilot focused on natural notes on low E/A, useful for chord roots; the technical reviewer favors web-first validation. Lead recommends low E/A as the first pilot candidate within the eventual notes-course release, rather than calling that pilot a complete six-string course. Compare it with six-string C as a representative lesson during the curriculum checkpoint. Neither option nor a five/twelve-lesson count is approved. At a 390-pixel viewport the present CSS implies fret targets roughly 25 pixels wide; this is a source-based estimate requiring physical touch verification.

Defer intervals, triads, CAGED, ear training, accounts, sync, subscriptions, ad SDKs, social features, notifications and a large character cast. This narrows the initial audience and does not yet validate willingness to pay. Premium remains an explicit later decision before public launch, not a permanent free commitment.

## Proposed planning checkpoints

1. **Scope and evidence:** learner, first-use promise, notes-course boundary, target devices, time/budget and recruited-player study. Compare hands-on substitutes before asserting differentiation.
2. **Teaching and assessment:** prerequisite map, representative lesson scripts, find/name activities, answer fixtures, hint provenance, fresh/delayed recall, review selection and topic skip. Decide the course boundary before bulk lessons.
3. **Experience:** phone fretboard interaction alternatives, quick transitions, path/practice/progress/settings flow, original pick characters and visual options, real-guitar sample proof, accessibility and offline/error states. Dylan approves visual direction and overall feel.
4. **Architecture and operations:** compare web-first, SwiftUI and cross-platform against actual devices and learning slice. Choose content/state/data boundaries, local storage and migration/recovery, backend need, privacy/security, audio pipeline and costs. Independently critique the proposed choice before approval.
5. **Build approval:** concrete first-slice acceptance criteria, ownership, checks, review gates and bounded overnight contract. Full planning and Dylan's approval precede implementation.
6. **Evidence and expansion:** Dylan walkthrough and real-player timing/recall/transfer, then approve course expansion and return-loop/streak rules. Completion and streak length are separate from learning.
7. **Beta, business and release:** decide premium/free boundary, purchase handling if relevant, real-device checks, iOS distribution and current privacy/store requirements. Prepare support/marketing materials; organic gameplay first is a proposal. No posting or outreach authorization is implied.
8. **Maintenance:** named owner, content correction, dependency/platform updates, saved-data migrations, incident/support response, monthly cost review, and evidence-driven next investment.

## Curriculum and learning state proposals

Long-term prerequisite candidate: orientation/open strings → chromatic relationships → fretboard notes → intervals → chord construction/triads → inversions/CAGED connections. Test the sequence rather than assuming it is optimal.

Every lesson specification should state one objective, prerequisites, short explanation, guided work, independent varied questions, graduated help, correction, recap and review rule. Define tuning, orientation, fret range, open notes and enharmonic acceptance explicitly. Future chord exercises must accept all valid answers allowed by the prompt.

Store per-attempt outcomes: completion, independent first response, wrong attempts, help/reveal exposure and question context. A hint that contains the answer is a reveal regardless of its stage number. Neither a completion badge nor an immediate repeated challenge is a mastery claim. Transfer requires actual guitar evidence.

Practice should select encountered concepts and weak items, mix finding with naming, vary order/context, and retain a useful fallback when evidence is sparse. Specify deterministic scheduling and scoring before implementation; no runtime language model grades notes.

## Technical recommendation pending inventory

Use the existing web prototype for validation of the teaching/interaction concept; do not automatically select it as the shipping iOS architecture. Decide the production route after the phone interaction and audio proof. Local-first is the default proposal because accounts/sync are not necessary to test learning; it requires honest data-loss limits and a recovery/export decision.

Native SwiftUI offers a direct iOS route but rewrites the existing UI. Cross-platform is more compelling if Android is an actual near-term requirement; it introduces another toolchain. Web-first reuses the current artifact and is quick to share, but native audio, accessibility and eventual distribution still need proof. No route or vendor is approved.

Security/privacy planning: inventory only needed data; no credentials in the client; validate saves and version content; review device-loss/deletion behavior. Decide intended ages, analytics, consent and retention before choosing services. Verify current applicable obligations before release. Any future backend needs per-user authorization, recovery and abuse controls; premium needs trusted entitlement validation.

## Current baseline and limitations

Actual source: four static files, deterministic pitch-class helpers, one C lesson and path placeholders; ephemeral state, no audio/backend/account/streak. Reuse visual/concept work and some fixtures; current lesson view/state logic is tightly coupled and C-specific.

Fresh specialist checks: JS syntax; independently specified C locations, adjacent notes and row order passed. Full Xcode is not configured at the inspected location: active developer directory is CommandLineTools and xcodebuild cannot report a full Xcode version. This is an environment observation, not a judgment about Dylan's development ability.

Fresh browser inspection was blocked because the browser does not allow file URLs. No workaround attempted. No fresh visual, physical-device, audio or participant test was completed. Existing README browser results remain historical. No learning or demand evidence is claimed.

Main risks: narrow phone fret targets; hint leakage; recognition of repeated positions mistaken for recall; scope expansion; unverified player return/demand. Apple membership is now explicitly separate from the validation budget, but still requires purchase approval. Broader curriculum and monetization compound risk before the core loop is demonstrated.

## Pending checkpoint

Dylan selected the notes-focused learner/outcome and low-E/A prototype coverage. His rationale is to lock down feel/design with a small curriculum sample before adding content. Budget is under $50 total until validation with Apple membership separate. Test devices: MacBook Air and iPhone 11; no Developer membership. Target is prototype complete by end of next week, provisionally November 15, 2026. See PROTOTYPE-TARGET.md for proposed acceptance and LESSON-AND-EXPERIENCE.md for the next planning draft. Exact lesson packaging, visual/architecture decisions and implementation approval remain pending.
