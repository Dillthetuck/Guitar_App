# Agent-led working model

## Lead and specialist roles
The lead agent maintains the roadmap, resolves dependencies and disagreements, integrates work, and owns the final evidence. Specialist roles are reusable assignments, not a requirement to maintain seven simultaneous agents.

| Role | Bounded responsibility | Required output |
|---|---|---|
| Curriculum / music correctness | Prerequisites, explanations, answer rules, hints, assessment | Lesson specification and independently checked answer fixtures |
| Product / learning research | Target-user questions, competitor comparison, test protocols | Evidence with limitations and a decision recommendation |
| UX / visual / character design | Original style, flow, accessibility, character personas | Reviewable screens and assets with states |
| Client implementation | Lesson engine, fretboard, navigation, local state, audio | Usable slice plus meaningful tests |
| Backend / security | Data boundaries, auth, persistence, entitlements, operations | Architecture choices, threat review, failure/recovery plan |
| Independent QA / release | Adversarial cases, physical-device checks, iOS readiness | Reproducible findings and pass/fail evidence |

Start with the lead and two bounded specialists for the first planning pass, subject to environment capacity. Reuse roles in later passes. Give each task scope, inputs, deliverable, acceptance criteria, file ownership, and a stop condition. Parallelize independent reading/review; serialize conflicting edits and integration. Reviewers must inspect the actual artifact, not merely echo its author's summary.

## Efficient use of ChatGPT and Gemini
Use the tools and subscription access actually available. Check entitlements and billing before selecting integrations; do not assume a consumer subscription funds API requests or enables automatic cross-provider agent orchestration.

Keep one authoritative brief and decision log. Give specialists the necessary subset of context and request concise results. Use deterministic calculations/tests for notes, dates, and scoring. Avoid repeated whole-project rereads or multiple agents researching the same question. Escalate ambiguous decisions and serious review findings rather than applying maximum effort to every task.

Dylan wants both ecosystems used efficiently. Gemini can provide a bounded independent architecture/curriculum critique at consequential milestones through an available authenticated integration or a manual prompt handoff. A provider/tool-access check must precede automation; unavailability should be disclosed, not simulated. No specific model versions or new paid API usage are selected here.

OpenAI's documentation notes that subagent workflows add model/tool work and can consume more tokens than comparable single-agent work. Therefore use parallel agents for clear value, not as a proxy for quality.

## Major human checkpoints
1. Product scope, learner promise, success evidence, and first release boundary.
2. Curriculum direction and first polished lesson.
3. Visual identity, characters, navigation, and sound direction.
4. Architecture, data/privacy model, costs, and iOS route.
5. Working end-to-end prototype, actual learning/usability findings, and revisions.
6. Beta readiness, monetization choice, and release readiness.

Combine related reviews where sensible. These are proposed gates to agree on, not six automatic approvals. Final launch/public release is itself a major checkpoint; prepare the release candidate before asking.

## Nightly work contract
Before starting a run, record:
- The already approved milestone and specific tasks for this run.
- Files/areas allowed to change and responsibilities for each active agent.
- Expected behavior, acceptance checks, and evidence to save.
- A bounded time/task/token allowance where tools expose it; if exact tokens are unavailable, use task/time limits and disclose that limitation.
- No new non-token spending; tools, access, and build environment already available.
- Assumptions the agent may make, decisions reserved to Dylan, and stop conditions.

During the run: work in recoverable changes; integrate in small increments; run meaningful checks; fix reproducible defects in scope. After two unsuccessful attempts at the same unresolved failure, diagnose and document instead of burning the entire run on blind retries. Stop dependent work when a major unapproved decision, unavailable credential, unexpected charge, destructive migration, or exhausted run budget blocks it. Continue useful independent approved tasks.

Morning report: what changed; how to open/play it; screenshots or device evidence where available; tests passed/failed; known issues and untested areas; spending incurred; usage if available; exact next decision. A paused/failed build is an honest result. An overnight schedule or durable runner must be explicitly set up later; a kickoff prompt alone does not create one.

## Verification
Test correctness against independent music fixtures, not only values calculated by the same engine. Cover normal completion, mistakes, repeated taps, hint/reveal state, leaving/resuming, and corrupted/missing saves. Later cover time zones/streak boundaries, offline sync, cross-user authorization, and subscription failure/restore cases when those features exist.

Record expected versus observed behavior. Use actual narrow-screen/physical-phone evidence for touch and audio, and real participants for lesson timing, fresh recall, return behavior, and guitar transfer. Automated checks complement Dylan's visual review and player testing; they cannot substitute for them.

