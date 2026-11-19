# musictheory.net fretboard exercise analysis

Checked November 6, 2026. Lead-owned public-interface research. Purpose: understand the exercise foundation Dylan likes, not obtain or reproduce proprietary implementation.

## Confirmed product direction

Dylan approved open topic access with a recommended path and optional assessment. His rationale: very low entry friction with a strong pull for daily practice. Access, completed activity and demonstrated knowledge remain separate. This approves a core product rule, not an architecture, reward scheme, visual direction or build milestone.

## Access and sources

Used web retrieval and browser automation to inspect public pages. No musictheory.net developer API was called. No documented public developer API was found in the inspected exercise index, FAQ, legal pages or focused API search. This is not proof that no private/internal API exists.

Documented integration options are customized exercise links and embedding the existing player. The FAQ specifies at least 600 by 600 pixels for embeds; a small phone-native integration is therefore not established by embedding permission. Their source policy says source code is not offered for copying/reverse engineering; no bundles were inspected, decoded or copied. Web Audio API, mentioned in the FAQ, is a browser audio facility, not a public musictheory.net content API.

| Source | What it establishes | Limitation |
|---|---|---|
| [Exercise index](https://www.musictheory.net/exercises) | Four fretboard identification exercise types and access without course locks | Does not describe internal algorithms |
| [Note exercise](https://www.musictheory.net/exercises/fretboard) | Actual note prompts, settings, scoring and actions observed | One narrow scoring trial; no phone/audio/accessibility validation |
| [Interval exercise](https://www.musictheory.net/exercises/fretboard-interval) | Answer types and placement/distance settings | Options inspected; question generation distribution not audited |
| [Scale exercise](https://www.musictheory.net/exercises/fretboard-scale) | Scale choices and key filtering controls | Not every option tested |
| [Chord exercise](https://www.musictheory.net/exercises/fretboard-chord) | Chord-quality choices, difficulty and challenge settings | No full chord-answer correctness audit |
| [FAQ](https://www.musictheory.net/faq) | Custom links, endless practice, challenge/report concepts, audio facility and embedding dimensions | Public documentation; some sections retain older dates; no API documentation found |
| [Legal](https://www.musictheory.net/legal) | Published linking/embedding and source/audio policies | No bespoke permission or integration partnership obtained |

Archived 2012 search results were not used to establish current settings. Current live exercise menus were inspected directly.

## Four exercise families

| Mode | Displayed task and response | Learning operation |
|---|---|---|
| Notes | A marked position; select a note name | Map physical location to pitch/name |
| Intervals | Marked positions; select interval, e.g. major third | Recognize pitch distance across the neck |
| Scales | Marked pattern; select scale type | Recognize interval structure |
| Chords | Marked positions; select chord quality, e.g. major/minor triad | Recognize chord structure |

These are identification exercises. They do not by themselves cover the reverse interaction of naming a target and asking the player to construct/find it. Our proposed find/name mixture adds task variety but is not by itself a proven market advantage.

## Observable common foundation

The shared interaction is: select scope → view marked neck → answer with a labeled button → receive feedback/score → another question. It makes sense as a configurable question bank built around one fretboard renderer. That is a description of behavior and an independent architectural interpretation, not knowledge of their source-code structure or randomization algorithm.

All four live settings menus exposed instrument, tuning, handedness, fret selection, string selection, labels, next-question timing and Challenge Mode. This lets one activity serve different learning scopes. A fretboard can show twelve frets even when eligible questions use a smaller selected set; displayed range and question range should be separate concepts in our design.

Mode-specific settings observed:

- Notes: naming system and note filter.
- Intervals: allowed intervals, button arrangement, string placement and fret-distance limit.
- Scales: permitted scales and a key-signature filtering route.
- Chords: permitted chord qualities and difficulty.
- Challenge panel: time limit, question limit and multiple-attempt option.

The note Actions menu exposed reveal, timer, reset, web settings and progress report. The FAQ documents endless default practice and customizable finite challenges. No exact random selection algorithm, adaptive weakness model, spaced-repetition policy or daily habit mechanic was verified in this review.

## Actual narrow behavior check

The note exercise displayed A string, fret 1. Independent music expectation: A♯/B♭. Research action: deliberately selected C; score became 0/1. Then selected A♯; score became 1/2 (50%), and a subsequent question appeared. This shows immediate correction/retry and attempt-based scoring in that inspected flow. It does not prove first-response mastery tracking, equivalence acceptance for B♭, or behavior in every challenge setting. Audio correctness/latency was not tested.

## Independent foundation we could build

Proposed components, not a claim about musictheory.net's implementation:

1. **Instrument model:** actual open-string pitches including octave; frets increment pitch in semitones. Low E2/A2/D3/G3/B3/E4 are standard guitar tuning.
2. **Exercise definition:** prompt type, eligible strings/frets/notes, allowed answers, hint policy, feedback and stopping rule.
3. **Question generation:** select from valid cases in that definition; avoid impossible or ambiguous questions and unhelpful repetition. Make root/reference explicit for scale/chord tasks where required.
4. **Deterministic grading:** independently checked note relationships and interval/chord/scale rules. Enharmonic and interval-spelling rules must match the prompt rather than accepting all spellings indiscriminately.
5. **Fretboard rendering/input:** consistent strings, nut, frets, markers and highlights; support recognition and target-finding without changing the underlying music model.
6. **Attempt history:** first answer, wrong retries, help/reveal, completion and response timing. Keep assisted correction distinct from unhinted retrieval.
7. **Session selection:** either open-ended practice or a short daily selection, chosen separately from the grader and renderer.

Example independent fixture: A string open A2 → fret 1 A♯2/B♭2 → fret 3 C3. A simple pitch-class calculation suffices for note location, but octave-aware pitches are needed for audio and some intervals. Root-relative pitch patterns such as major triad 0/4/7 can generate exercises; valid voicings, inversions, naming and ambiguity require additional explicit rules. No language model needs to decide whether the note is correct.

## Recommendation for our app

Use an original exercise system with a clean common neck, adjustable practice scope and quick feedback as its foundation. For the approved prototype coverage, constrain the real content to low E/A. Offer both naming a highlighted note and finding a requested note. Keep advanced customization optional; a novice should be able to start from a sensible preset without configuring a control panel.

Layer the teaching/return experience on top: a short explanation when needed, useful correction, a suggested daily session mixing prior weak items and current learning, honest progress and an easy way to choose another topic. The daily selection is a recommendation, not an access gate. Streak/reward details remain proposals; they must not overtake the fretboard or make mistakes expensive.

This combines open utility with guidance, but Echo already offers many overlapping features. Differentiation still needs observed evidence that players can reach useful work more easily and prefer/benefit from the experience. No claim that musictheory.net lacks learning effectiveness, or that our future system will exceed it, follows from this review.

## Boundaries and next planning artifact

No embedding, new app implementation, account creation, publishing, purchasing, proprietary source extraction or audio copying occurred. No new non-token charges initiated. Next useful planning artifact is a plain exercise specification and first-use/daily-return flow, followed by an original fretboard interaction specimen for Dylan's review. Existing visual concepts remain rejected; this research does not approve a replacement aesthetic or production stack.
