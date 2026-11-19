import test from 'node:test';
import assert from 'node:assert/strict';
import { defaults, eligible } from './settings.js';
import { boardGeometry, renderBoard } from './fretboard.js';

// Expected pitches are independent named-note fixtures, not recomputed with MIDI.
const KNOWN_NOTES = [
  { string: 6, fret: 0, pitch: 4 }, // Low E: E
  { string: 6, fret: 1, pitch: 5 }, // Low E: F
  { string: 6, fret: 8, pitch: 0 }, // Low E: C
  { string: 5, fret: 3, pitch: 0 }, // A: C
  { string: 4, fret: 10, pitch: 0 }, // D: C
  { string: 3, fret: 5, pitch: 0 }, // G: C
  { string: 2, fret: 1, pitch: 0 }, // B: C
  { string: 1, fret: 8, pitch: 0 }, // High E: C
];

test('known guitar-note fixtures match the eligible pool', () => {
  const pool = eligible(defaults());
  for (const expected of KNOWN_NOTES) {
    assert.deepEqual(pool.find(p => p.string === expected.string && p.fret === expected.fret), expected);
  }
});

test('each string repeats its known open pitch at frets 12 and 24', () => {
  const openPitches = [4, 11, 7, 2, 9, 4]; // strings 1→6, E B G D A E
  const pool = eligible({ ...defaults(), end: 24 });
  openPitches.forEach((pitch, index) => {
    for (const fret of [0, 12, 24]) {
      assert.deepEqual(pool.find(p => p.string === index + 1 && p.fret === fret), { string: index + 1, fret, pitch });
    }
  });
});

test('default pool contains every one of 78 unique positions', () => {
  const pool = eligible(defaults());
  assert.equal(pool.length, 78);
  assert.equal(new Set(pool.map(p => `${p.string}:${p.fret}`)).size, 78);
});

test('empty and conflicting filter intersections remain empty', () => {
  for (const key of ['strings', 'frets', 'notes']) assert.deepEqual(eligible({ ...defaults(), [key]: [] }), []);
  assert.deepEqual(eligible({ ...defaults(), strings: [6], frets: [1], notes: [0] }), []); // Low E fret 1 is F, not C.
  assert.deepEqual(eligible({ ...defaults(), start: 8, end: 3 }), []);
  assert.deepEqual(eligible({ ...defaults(), start: .5 }), []);
  assert.deepEqual(eligible({ ...defaults(), end: 25 }), []);
});

test('a one-position pool is valid and does not reduce answer settings', () => {
  const config = { ...defaults(), strings: [2], frets: [1], notes: [0] };
  assert.deepEqual(eligible(config), [{ string: 2, fret: 1, pitch: 0 }]);
  assert.equal(config.choices, 12);
});

test('string, fret, visible range and pitch filters all intersect', () => {
  assert.deepEqual(eligible({ ...defaults(), strings: [1, 2, 5, 6], frets: [1, 3, 8], notes: [0], start: 2, end: 8 }), [
    { string: 1, fret: 8, pitch: 0 },
    { string: 5, fret: 3, pitch: 0 },
    { string: 6, fret: 8, pitch: 0 },
  ]);
});

test('open questions require visible zero, inclusion and selected zero', () => {
  assert.equal(eligible({ ...defaults(), end: 0 }).length, 6);
  for (const changed of [{ open: false }, { start: 1 }, { frets: [1, 2, 3] }]) {
    assert.ok(eligible({ ...defaults(), ...changed }).every(p => p.fret > 0));
  }
});

test('changing sharp/flat/combined display never changes pitch identity', () => {
  const expected = eligible(defaults());
  assert.deepEqual(eligible({ ...defaults(), spelling: 'flats' }), expected);
  assert.deepEqual(eligible({ ...defaults(), spelling: 'combined' }), expected);
});

test('draft default arrays are independent and eligible does not mutate settings', () => {
  const first = defaults(), second = defaults();
  first.strings.pop(); first.notes.pop(); first.frets.pop();
  assert.equal(second.strings.length, 6);
  assert.equal(second.notes.length, 12);
  assert.equal(second.frets.length, 25);
  const before = JSON.stringify(second);
  eligible(second);
  assert.equal(JSON.stringify(second), before);
});

test('mirroring reverses horizontal positions and preserves musical string order', () => {
  for (const target of [{ string: 1, fret: 0 }, { string: 2, fret: 1 }, { string: 6, fret: 24 }]) {
    const right = boardGeometry({ end: 24 }, target);
    const left = boardGeometry({ end: 24, left: true }, target);
    assert.equal(right.targetX + left.targetX, right.width);
    assert.equal(right.targetY, left.targetY);
  }
  assert.ok(boardGeometry({}, { string: 1, fret: 1 }).targetY < boardGeometry({}, { string: 6, fret: 1 }).targetY);
});

test('all fret spaces remain at least 54px and targets are inside the right space', () => {
  for (const config of [{ start: 0, end: 24 }, { start: 8, end: 12 }, { start: 24, end: 24 }]) {
    const board = boardGeometry(config, { string: 4, fret: config.end });
    for (let i = 1; i < board.edges.length; i++) assert.ok(board.edges[i] - board.edges[i - 1] >= 54);
    assert.ok(board.targetX > board.edges.at(-2));
    assert.ok(board.targetX < board.edges.at(-1));
  }
});

test('only the tested string is solid; thickness increases toward low string', () => {
  const markup = renderBoard({ end: 24 }, { string: 4, fret: 10 });
  const strings = [...markup.matchAll(/<path class="board-string[^>]+>/g)].map(m => m[0]);
  assert.equal(strings.length, 6);
  assert.equal(strings.filter(s => !s.includes('stroke-dasharray')).length, 1);
  assert.ok(strings[3].includes('is-tested'));
  const widths = strings.map(s => Number(s.match(/stroke-width="([\d.]+)"/)[1]));
  assert.ok(widths.every((width, i) => i === 0 || width > widths[i - 1]));
});

test('position markers use correct frets and double 12/24 markers', () => {
  const markup = renderBoard({ end: 24 }, { string: 6, fret: 24 });
  const markers = [...markup.matchAll(/data-marker-fret="(\d+)"/g)].map(m => Number(m[1]));
  assert.deepEqual(markers, [3, 5, 7, 9, 12, 12, 15, 17, 19, 21, 24, 24]);
  assert.ok(!renderBoard({ end: 24, markers: false }, { string: 6, fret: 24 }).includes('board-position-marker'));
});

test('open question exposes location without note names or answer text in target', () => {
  const markup = renderBoard({}, { string: 1, fret: 0 });
  assert.ok(markup.includes('Target: string 1, open.'));
  assert.equal((markup.match(/data-target="true"/g) || []).length, 1);
  assert.ok(!markup.includes('board-tuning-label'));
  assert.ok(!/<text[^>]*>\s*[A-G](?:♯|♭)?\s*<\/text>/.test(markup));
  assert.ok(/class="board-target"[^>]*\/>/.test(markup));
  assert.ok(!/Target:[^"]*\b(?:E|B|G|D|A)\b/.test(markup));
});

test('cropped ranges have no false nut and no phantom open area', () => {
  const markup = renderBoard({ start: 8, end: 12 }, { string: 6, fret: 8 });
  assert.ok(markup.includes('board-crop'));
  assert.ok(!markup.includes('board-nut'));
  assert.ok(!/>open<\/text>/.test(markup));
  assert.throws(() => renderBoard({ start: 8, end: 12 }, { string: 6, fret: 0 }), RangeError);
  assert.throws(() => renderBoard({ open: false }, { string: 1, fret: 0 }), RangeError);
});

test('tuning labels and fret numbers can be independently toggled', () => {
  const markup = renderBoard({ labels: true, numbers: false }, { string: 4, fret: 10 });
  assert.equal((markup.match(/class="board-tuning-label"/g) || []).length, 6);
  assert.ok(!/<text[^>]*y="243">\d+<\/text>/.test(markup));
});
