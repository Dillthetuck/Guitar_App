# Recovered prototype

## Primary reference
Prior chat: “Scout Guitar Learning Competitors”
Thread ID: 01a1a72f-2cdc-7293-b2ad-504dcbb14a7f
Source files: /Users/dylan/Documents/ChatGPT/IS 111/fret-trail-prototype
Working title: Fret Trail — Find your C
Built November 4, 2026; recovered November 5.

[Previously published playtest](https://fret-trail-dylan-c-notes.dylantuck05.chatgpt.site)
The prior chat reports successful publication. Availability of that live URL was not rechecked for this handoff. Copied local files are the portable reference.

## Run
Open prototype/dist/index.html in a browser. There is no dependency installation or build step. Files: index.html, style.css, lesson.js, app.js. The original README is copied alongside dist.

## Actual behavior
A playful path with one playable lesson; intervals and triads appear as future content.
Standard tuning; all six strings and frets 1–12 visible, high E above low E.
Guided order: low E → A → D → G → B → high E → combined challenge.
Only the active string is selectable during guided rounds.
A wrong answer reveals the closest landmark at fret 3, 5, or 7. Requested hints then reveal adjacent B/C-sharp, then C. A/G landmark hints already reveal C.
Revealing C never advances by itself: the learner still taps it.
The combined challenge requires all six C positions; solved strings lock, wrong answers preserve correct selections.
Correct C frets from low to high: 8, 3, 10, 5, 1, 8.
The lesson has an exit confirmation and completion recap.

## Deliberate limitations
No audio, sign-in, persistent progress, real streaks, premium, backend, analytics, placement, or review scheduling. Refresh resets the attempt. No native iOS project. Existing guitar-shaped branding is a reference, not an approved character system.

The original README reports assistant checks of lesson logic, hints, completion, and mobile layout. Those are historical assistant checks, not fresh checks or Dylan/participant evidence. Real-phone comfort, learning transfer, delayed recall, and market demand remain unverified.

The last prior-chat response proposed expanding this into one fretboard course with a complete app shell and twelve lessons. That is an assistant proposal, not a completed build or approval of every lesson.

## Earlier coursework
context/historical-coursework contains the original culture-first charter and the Chapter 10 power-chord brief. They explain the evolution and limitations of the old assignment, not the current release scope. The power-chord exercise is a different prototype; its code was not selected as the product baseline.

