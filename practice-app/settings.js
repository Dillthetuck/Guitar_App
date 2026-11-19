/** Interface-preview settings. Drafts are memory-only; no learner data is read or written. */
const ALL_STRINGS = [1, 2, 3, 4, 5, 6];
const ALL_FRETS = Array.from({ length: 25 }, (_, i) => i);
const ALL_NOTES = Array.from({ length: 12 }, (_, i) => i);
const NATURALS = [0, 2, 4, 5, 7, 9, 11];
const SHARPS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const FLATS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
const MIDI = { 1: 64, 2: 59, 3: 55, 4: 50, 5: 45, 6: 40 };
const copy = value => JSON.parse(JSON.stringify(value));

export function defaults() {
  return {
    start: 0, end: 12, open: true, left: false, numbers: true, markers: true,
    labels: false, strings: [...ALL_STRINGS], frets: [...ALL_FRETS],
    notes: [...ALL_NOTES], choices: 12, spelling: 'sharps', auto: false,
    delay: 1.5, hints: true, review: false,
  };
}

/** Finite intersection: no random selection and no retry loop. */
export function eligible(config) {
  if (!Number.isInteger(config.start) || !Number.isInteger(config.end)
    || config.start < 0 || config.end > 24 || config.start > config.end) return [];
  const strings = new Set(config.strings);
  const frets = new Set(config.frets);
  const notes = new Set(config.notes);
  const result = [];
  for (const string of ALL_STRINGS) {
    if (!strings.has(string)) continue;
    for (let fret = config.start; fret <= config.end; fret++) {
      if (!frets.has(fret) || (fret === 0 && !config.open)) continue;
      const pitch = (MIDI[string] + fret) % 12;
      if (notes.has(pitch)) result.push({ string, fret, pitch });
    }
  }
  return result;
}

function noteName(pitch, spelling) {
  if (spelling === 'flats') return FLATS[pitch];
  if (spelling === 'combined' && SHARPS[pitch] !== FLATS[pitch]) return `${SHARPS[pitch]}/${FLATS[pitch]}`;
  return SHARPS[pitch];
}

/** The browser's modal dialog supplies focus containment and background inertness. */
export function openSettings(config, { onApply = () => {}, onCancel = () => {}, practice = false } = {}) {
  let draft = { ...defaults(), ...copy(config) };
  const opener = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'settings-dialog';
  dialog.setAttribute('aria-labelledby', 'settings-title');
  let finished = false;

  const check = (key, title, description = '') => `<label class="check-row"><input type="checkbox" name="${key}" ${draft[key] ? 'checked' : ''}><span>${title}${description ? `<small class="small">${description}</small>` : ''}</span></label>`;
  const chips = (key, values, label) => `<div class="chip-grid" data-group="${key}" role="group" aria-label="${label}">${values.map(value => `<button type="button" class="chip" data-toggle="${key}" data-value="${value}" aria-pressed="${draft[key].includes(value)}">${key === 'notes' ? noteName(value, draft.spelling) : key === 'frets' && value === 0 ? 'Open' : value}</button>`).join('')}</div>`;
  const shortcuts = key => `<div class="filter-actions"><button type="button" class="text-button" data-filter="${key}" data-set="all">Select all</button><button type="button" class="text-button" data-filter="${key}" data-set="clear">Clear</button></div>`;

  function render() {
    dialog.innerHTML = `
      <header class="settings-header"><div><span class="eyebrow">MAKE IT YOUR PRACTICE</span><h2 id="settings-title">Customize</h2></div><button type="button" class="text-button" data-action="cancel" aria-label="Close settings without applying">Close ×</button></header>
      <div class="settings-scroll">
        <p class="small preview-settings-note">Interface preview. Settings stay only until this page is refreshed. ${practice ? 'Apply queues changes for the next sample question.' : 'Apply changes the practice preview.'}</p>
        <section aria-labelledby="board-settings-title"><h3 class="section-heading" id="board-settings-title">Board</h3><p class="small">Standard six-string tuning. Choose what the neck shows here, then choose what can be tested below.</p>
          <div class="field-row"><label>First visible fret<input name="start" type="number" min="0" max="24" step="1" value="${draft.start}"></label><label>Last visible fret<input name="end" type="number" min="0" max="24" step="1" value="${draft.end}"></label></div>
          <p class="small" data-board-count></p>
          ${check('open', 'Include open strings', 'Open targets also require fret 0 in the visible range and question pool.')}
          ${check('left', 'Left-handed view', 'Mirror the neck horizontally; string 1 stays at the top.')}
          ${check('numbers', 'Show fret numbers')}
          ${check('markers', 'Show position markers')}
          ${check('labels', 'Show tuning labels', 'An open-string answer with its tuning label visible counts as assisted.')}
        </section>
        <section aria-labelledby="pool-settings-title"><h3 class="section-heading" id="pool-settings-title">Question pool</h3><p class="small">Strings, frets, and notes must all match. Changing a filter never changes the answer count.</p>
          <fieldset><legend>Strings <span class="small">1 is high · 6 is low</span></legend>${shortcuts('strings')}${chips('strings', ALL_STRINGS, 'Strings to test')}</fieldset>
          <fieldset><legend>Frets to test</legend>${shortcuts('frets')}${chips('frets', ALL_FRETS, 'Frets to test')}<p class="small" data-outside-note></p></fieldset>
          <fieldset><legend>Target notes</legend>${shortcuts('notes')}<div class="filter-actions"><button type="button" class="text-button" data-filter="notes" data-set="naturals">Natural notes</button><button type="button" class="text-button" data-filter="notes" data-set="accidentals">Accidental notes</button></div>${chips('notes', ALL_NOTES, 'Pitch classes to test')}</fieldset>
          <button type="button" class="text-button" data-action="reset-filters">Reset filters</button>
        </section>
        <section aria-labelledby="answers-settings-title"><h3 class="section-heading" id="answers-settings-title">Answers &amp; spelling</h3>
          <div class="field-row"><label>Answer choices<select name="choices">${Array.from({ length: 11 }, (_, i) => i + 2).map(n => `<option value="${n}" ${draft.choices === n ? 'selected' : ''}>${n === 12 ? 'All 12' : n}</option>`).join('')}</select></label>
          <label>Note labels<select name="spelling"><option value="sharps" ${draft.spelling === 'sharps' ? 'selected' : ''}>Sharps · C♯</option><option value="flats" ${draft.spelling === 'flats' ? 'selected' : ''}>Flats · D♭</option><option value="combined" ${draft.spelling === 'combined' ? 'selected' : ''}>Combined · C♯/D♭</option></select></label></div>
          <p class="small">Fewer choices provide more support. Other notes can still appear as answers, even when you practice only one target note. Spelling changes labels, not pitch identity.</p>
        </section>
        <section aria-labelledby="behavior-settings-title"><h3 class="section-heading" id="behavior-settings-title">Practice behavior</h3>
          ${check('auto', 'Advance automatically after correct answers', 'Wrong answers always wait for Next.')}
          <label class="delay-label">Auto-advance delay <span data-delay-label></span><input name="delay" type="range" min="0.5" max="5" step="0.5" value="${draft.delay}"></label>
          ${check('hints', 'Allow requested hints')}
          ${check('review', 'Extra review of missed positions', 'Optional review stays within your selected pool. Otherwise, practice is balanced.')}
          <p class="small">The preview demonstrates these controls; production timing and balanced review are part of the next milestone. No session limit or countdown.</p>
        </section>
        <section aria-labelledby="data-settings-title"><h3 class="section-heading" id="data-settings-title">Local data</h3><p class="small">This interface preview stores nothing. Refreshing clears its temporary settings. In the full version, data will stay in this browser and will not sync across devices.</p><button type="button" class="secondary" disabled>Reset local data</button><p class="small">Available with saved settings and session history in the full version.</p><button type="button" class="text-button" data-action="defaults">Reset settings to defaults</button><p class="small">Restores every setting in this draft. Apply to use the defaults, or Cancel to keep your current settings.</p></section>
      </div>
      <footer class="settings-footer"><div class="settings-status" role="status" aria-live="polite" aria-atomic="true"></div><div class="settings-footer-actions"><button type="button" class="secondary" data-action="cancel">Cancel</button><button type="button" class="primary" data-action="apply">Apply${practice ? ' for next question' : ''}</button></div></footer>`;
    update();
  }

  function update() {
    const validRange = Number.isInteger(draft.start) && Number.isInteger(draft.end) && draft.start >= 0 && draft.end <= 24 && draft.start <= draft.end;
    const pool = eligible(draft);
    const fretted = validRange ? Math.max(0, draft.end - Math.max(1, draft.start) + 1) : 0;
    dialog.querySelector('[data-board-count]').textContent = validRange ? `${fretted} fretted positions displayed per string${draft.start === 0 && draft.open ? ' + a separate open-string area' : ' · no open-string area'}.` : 'Use whole fret numbers from 0 to 24, with the first no higher than the last.';
    const outside = draft.frets.filter(f => f < draft.start || f > draft.end || (f === 0 && !draft.open)).length;
    dialog.querySelector('[data-outside-note]').textContent = outside ? `${outside} selected fret${outside === 1 ? ' is' : 's are'} outside the active board range or excluded open area. Those selections are kept but cannot become questions.` : 'Every selected fret is within the active board range.';
    const status = dialog.querySelector('.settings-status');
    status.dataset.valid = String(pool.length > 0);
    status.textContent = !validRange ? 'Check your visible fret range before applying.' : pool.length === 0 ? 'No eligible positions. Your string, fret, and note filters do not overlap. Change a filter or use Reset filters.' : pool.length === 1 ? '1 eligible position. The same position will repeat.' : `${pool.length} eligible string/fret positions.`;
    dialog.querySelector('[data-action="apply"]').disabled = !validRange || pool.length === 0;
    dialog.querySelector('[data-delay-label]').textContent = `${draft.delay} seconds`;
    dialog.querySelector('[name="delay"]').disabled = !draft.auto;
    for (const chip of dialog.querySelectorAll('[data-toggle]')) {
      const key = chip.dataset.toggle, value = Number(chip.dataset.value);
      chip.setAttribute('aria-pressed', String(draft[key].includes(value)));
      if (key === 'notes') chip.textContent = noteName(value, draft.spelling);
      if (key === 'frets') {
        const inactive = value < draft.start || value > draft.end || (value === 0 && !draft.open);
        chip.dataset.outside = String(inactive);
        chip.setAttribute('aria-label', `${value === 0 ? 'Open string' : `Fret ${value}`}${inactive ? ', outside active board' : ''}`);
      }
    }
  }

  function finish(apply) {
    if (finished || (apply && !eligible(draft).length)) return;
    finished = true;
    dialog.close();
    dialog.remove();
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    if (apply) onApply(copy(draft)); else onCancel();
  }

  dialog.addEventListener('input', event => {
    const field = event.target;
    if (!field.name) return;
    draft[field.name] = field.type === 'checkbox' ? field.checked : ['start', 'end', 'choices', 'delay'].includes(field.name) ? (field.value === '' ? NaN : Number(field.value)) : field.value;
    update();
  });
  dialog.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.toggle) {
      const key = button.dataset.toggle, value = Number(button.dataset.value);
      draft[key] = draft[key].includes(value) ? draft[key].filter(v => v !== value) : [...draft[key], value].sort((a, b) => a - b);
      update();
    } else if (button.dataset.filter) {
      const key = button.dataset.filter;
      const values = key === 'strings' ? ALL_STRINGS : key === 'frets' ? ALL_FRETS : ALL_NOTES;
      draft[key] = button.dataset.set === 'clear' ? [] : button.dataset.set === 'naturals' ? [...NATURALS] : button.dataset.set === 'accidentals' ? ALL_NOTES.filter(n => !NATURALS.includes(n)) : [...values];
      update();
    } else if (button.dataset.action === 'reset-filters') {
      draft.strings = [...ALL_STRINGS]; draft.frets = [...ALL_FRETS]; draft.notes = [...ALL_NOTES];
      update();
    } else if (button.dataset.action === 'defaults') {
      draft = defaults(); render(); dialog.querySelector('[name="start"]').focus();
    } else if (button.dataset.action === 'cancel') finish(false);
    else if (button.dataset.action === 'apply') finish(true);
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); finish(false); });
  render();
  document.body.append(dialog);
  dialog.showModal();
  dialog.querySelector('[data-action="cancel"]').focus();
  return dialog;
}
