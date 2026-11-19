/** Paper-neck renderer for the interface preview. No grading or session state. */
const OPEN_NAMES = ['E', 'B', 'G', 'D', 'A', 'E'];
const MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);

function integer(value, fallback, min, max) {
  const number = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new RangeError(`Expected an integer from ${min} to ${max}.`);
  }
  return number;
}

/** Stable, readable geometry. Mirroring changes x coordinates, never string order. */
export function boardGeometry(config = {}, target = { string: 6, fret: 1 }) {
  const start = integer(config.start, 0, 0, 24);
  const end = integer(config.end, 12, 0, 24);
  if (start > end) throw new RangeError('The first fret must not exceed the last fret.');
  const string = integer(target.string, 6, 1, 6);
  const fret = integer(target.fret, 1, 0, 24);
  const open = start === 0 && config.open !== false;
  const first = Math.max(1, start);
  const frets = Array.from({ length: Math.max(0, end - first + 1) }, (_, i) => first + i);
  if (!(fret === 0 ? open : frets.includes(fret))) {
    throw new RangeError('The highlighted position must be visible on the board.');
  }
  const neckStart = open ? 108 : 72;
  const edges = [neckStart];
  // A gentle taper evokes the instrument while keeping every cell at least 54px wide.
  frets.forEach((_, i) => edges.push(edges.at(-1) + 54 + Math.min(18, frets.length - i - 1) * 1.5));
  const neckEnd = Math.max(neckStart + 40, edges.at(-1));
  const width = neckEnd + 24;
  const x = value => config.left ? width - value : value;
  const centers = frets.map((_, i) => x((edges[i] + edges[i + 1]) / 2));
  const targetX = fret === 0 ? x(78) : centers[frets.indexOf(fret)];
  return { start, end, string, fret, open, frets, edges, centers, neckStart, neckEnd, width, x, targetX, targetY: 31 + (string - 1) * 34 };
}

export function renderBoard(config = {}, target = { string: 6, fret: 1 }) {
  const g = boardGeometry(config, target);
  const { x, width } = g;
  const n = value => Number(value.toFixed(2));
  const blue = 'var(--blue, #2479af)';
  const ink = 'var(--ink, #15537a)';
  const paper = 'var(--paper, #ffffdc)';
  const label = `Guitar neck. String 1 is high, string 6 is low. Target: string ${g.string}, ${g.fret === 0 ? 'open' : `fret ${g.fret}`}. ${config.left ? 'Left-handed view. ' : ''}Use left and right arrow keys to scroll the board.`;
  const line = `fill="none" stroke="${blue}" stroke-linecap="round" stroke-linejoin="round"`;
  const text = `fill="${ink}" text-anchor="middle" font-family="'Chalkboard SE', 'Bradley Hand', system-ui, sans-serif" font-size="13"`;
  let svg = `<path d="M${n(x(g.neckStart))} 14 Q${n(x((g.neckStart + g.neckEnd) / 2))} 12 ${n(x(g.neckEnd))} 14 L${n(x(g.neckEnd))} 218 Q${n(x((g.neckStart + g.neckEnd) / 2))} 220 ${n(x(g.neckStart))} 217 Z" fill="${blue}" fill-opacity=".025" stroke="${blue}" stroke-opacity=".48" stroke-width="1.2"/>`;
  if (g.start <= 1) {
    svg += `<path class="board-nut" d="M${n(x(g.neckStart))} 13 L${n(x(g.neckStart))} 218" ${line} stroke-width="7"/>`;
  } else {
    // A cut-off neck is not a new nut: retain a thin boundary and two break strokes.
    svg += `<path class="board-crop" d="M${n(x(g.neckStart))} 14 L${n(x(g.neckStart))} 218 M${n(x(g.neckStart - 4))} 9 l${config.left ? -8 : 8} 10 M${n(x(g.neckStart + 2))} 9 l${config.left ? -8 : 8} 10" ${line} stroke-width="1.2"/>`;
  }
  for (let i = 1; i < g.edges.length; i++) {
    const px = x(g.edges[i]);
    svg += `<path class="board-fret" d="M${n(px)} 14 Q${n(px + .6)} 116 ${n(px)} 218" ${line} stroke-width="1.35"/>`;
  }
  g.frets.forEach((fret, i) => {
    const cx = n(g.centers[i]);
    if (config.markers !== false && MARKERS.has(fret)) {
      const ys = fret === 12 || fret === 24 ? [82, 150] : [116];
      for (const cy of ys) svg += `<circle class="board-position-marker" data-marker-fret="${fret}" cx="${cx}" cy="${cy}" r="4.5" fill="${blue}" opacity=".27"/>`;
    }
    if (config.numbers !== false) svg += `<text ${text} x="${cx}" y="243">${fret}</text>`;
  });
  for (let string = 1; string <= 6; string++) {
    const y = 31 + (string - 1) * 34;
    const active = string === g.string;
    svg += `<path class="board-string${active ? ' is-tested' : ''}" data-string="${string}" d="M${n(x(g.open ? 57 : 48))} ${y} Q${n(x(width * .55))} ${y + .3} ${n(x(g.neckEnd))} ${y}" ${line} stroke-width="${n(1 + (string - 1) * .47)}" ${active ? '' : 'stroke-dasharray="7 7"'} opacity="${active ? 1 : .48}"/>`;
    svg += `<text ${text} font-weight="${active ? 700 : 400}" x="${n(x(23))}" y="${y + 4}">${string}</text>`;
    if (config.labels) {
      svg += `<text ${text} class="board-tuning-label" x="${n(x(44))}" y="${y + 4}" stroke="${paper}" stroke-width="4" paint-order="stroke">${OPEN_NAMES[string - 1]}</text>`;
    }
  }
  svg += `<text ${text} x="${n(x(23))}" y="12" font-size="9">high</text><text ${text} x="${n(x(23))}" y="224" font-size="9">low</text>`;
  if (g.open) svg += `<text ${text} x="${n(x(78))}" y="243" font-size="12">open</text>`;
  svg += `<circle class="board-target" data-target="true" cx="${n(g.targetX)}" cy="${g.targetY}" r="15" fill="var(--yellow, #efe871)" stroke="${blue}" stroke-width="2.3"/><circle cx="${n(g.targetX)}" cy="${g.targetY}" r="3" fill="${blue}"/>`;
  return `<div class="board-scroll" tabindex="0" role="region" aria-label="${label}" data-target-x="${n(g.targetX)}" style="overflow-x:auto;overscroll-behavior-x:contain;max-width:100%;padding-block:4px 8px;scrollbar-color:${blue} ${paper};"><svg class="fretboard" xmlns="http://www.w3.org/2000/svg" width="${width}" height="258" viewBox="0 0 ${width} 258" aria-hidden="true" focusable="false" style="display:block;min-width:${width}px;width:100%;height:258px;">${svg}</svg></div>`;
}
