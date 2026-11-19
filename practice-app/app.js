import { defaults, eligible, openSettings } from './settings.js';
import { renderBoard } from './fretboard.js';

// Deliberately a visual-review specimen: no attempt history, scoring totals, or persistence.
const app = document.querySelector('#app');
const announcer = document.querySelector('#announcement');
const sharp = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
const flat = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
const arrow = direction => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}"/></svg>`;
const pick = '<svg class="pick-mark" viewBox="0 0 30 36" fill="none" aria-hidden="true"><path d="M3 5Q15-1 27 5Q31 16 18 32Q15 36 12 32Q-1 16 3 5Z" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v13m5-15v19m5-17v13M7 14h16M8 19h14" stroke="currentColor" stroke-width=".9"/></svg>';
let config = defaults(), snapshot = null, question = null, answerBank = [], queued = false;
let route = 'cabinet', selectedFile = 0, cabinetScroll = 0, cabinetPageScroll = 0, index = 0, resolved = null, hinted = false, sampleAnswered = false;
let autoTimer = null, timerGeneration = 0, settingsOpen = false, pauseDialog = null, boardObserver = null, interrupted = false;
const clone = value => structuredClone(value);
const name = (pitch, spelling = snapshot?.spelling || config.spelling) => spelling === 'flats' ? flat[pitch] : spelling === 'combined' && sharp[pitch] !== flat[pitch] ? `${sharp[pitch]}/${flat[pitch]}` : sharp[pitch];
function announce(text) { announcer.textContent = text; }
function cancelAuto() { clearTimeout(autoTimer); autoTimer = null; timerGeneration++; }
function summary(c = config) { return `${c.strings.length === 6 ? 'All six strings' : `${c.strings.length} string${c.strings.length === 1 ? '' : 's'}`} · ${c.start === 0 && c.open ? 'open–' : `${Math.max(1,c.start)}–`}${c.end} frets · ${c.choices} answers`; }
function masthead() { return `<header class="masthead"><div class="wordmark">${pick}<span>Practice cabinet</span></div><span class="small">A little time with the fretboard.</span></header>`; }
function setFocus(selector) { requestAnimationFrame(() => app.querySelector(selector)?.focus({preventScroll:true})); }

function renderCabinet(focus = false) {
  route = 'cabinet'; cancelAuto(); boardObserver?.disconnect();
  app.innerHTML = `${masthead()}<main class="cabinet-layout"><div class="cabinet-intro"><span class="eyebrow">YOUR GUITAR PRACTICE, FILED.</span><h1>Pull up<br>a little practice.</h1><p>No sign-in. No finish line.<br>Just you, the neck, and the next note.</p><div class="intro-rule"></div><p class="hand-note">One file to start.<br>Room to grow.</p></div><div class="cabinet-area"><div class="drawer"><div class="files-scroll" tabindex="0" role="region" aria-label="Practice files. Scroll vertically or use Previous and Next file.">${[0,1,2,3].map((n) => `<article class="file ${n === selectedFile ? 'active' : ''} ${n ? 'placeholder' : ''}" data-file="${n}" aria-label="${n ? `Future file ${n}` : 'Fretboard naming practice'}" style="--folder:${['#ffffdc','#f0edcf','#e6e7d5','#eae3ca'][n]}"><div class="folder-tab" aria-hidden="true">${n ? '···' : 'FRETBOARD'}</div><div class="folder-face">${n ? '<p>Future feature not yet released</p>' : `<div class="file-label"><span class="eyebrow">A PRACTICE FILE</span><span class="file-number">01</span></div><h2>Fretboard<br>naming practice</h2><p class="file-description">Find your way around the neck, one note at a time.</p><p class="settings-summary">${summary()}<br>Standard tuning · ${config.spelling === 'combined' ? 'combined labels' : config.spelling} · no time limit</p><div class="folder-actions"><button class="primary" data-action="start">Start practice ${arrow('right')}</button><button class="text-button" data-action="settings">Customize</button></div>`}</div></article>`).join('')}</div><div class="drawer-front"><span class="drawer-handle">PRACTICE FILES</span></div></div><nav class="cabinet-navigation" aria-label="Browse files"><button data-action="previous-file">${arrow('left')} Previous file</button><span class="file-counter" aria-live="polite"></span><button data-action="next-file">Next file ${arrow('right')}</button></nav></div></main><p class="local-note">Interface preview · temporary settings · nothing saved or synced</p>`;
  const scroll = app.querySelector('.files-scroll'); scroll.scrollTop = cabinetScroll;
  updateFileControls();
  let scrollFrame;
  scroll.addEventListener('scroll', () => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(() => {
    if (route !== 'cabinet' || !scroll.isConnected) return;
    cabinetScroll = scroll.scrollTop;
    const top = scroll.getBoundingClientRect().top;
    const cards = [...scroll.querySelectorAll('.file')];
    selectedFile = cards.reduce((best, card, n) => Math.abs(card.getBoundingClientRect().top-top-35) < Math.abs(cards[best].getBoundingClientRect().top-top-35) ? n : best, 0);
    updateFileControls();
  }); });
  scroll.addEventListener('keydown', event => {
    if (event.target !== scroll) return;
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault(); goFile(event.key === 'Home' ? 0 : event.key === 'End' ? 3 : selectedFile + (event.key === 'ArrowDown' ? 1 : -1));
    }
  });
  if (focus) { window.scrollTo({top:cabinetPageScroll,behavior:'instant'}); setFocus('[data-action="start"]'); }
}
function updateFileControls() {
  app.querySelector('[data-action="previous-file"]').disabled = selectedFile === 0;
  app.querySelector('[data-action="next-file"]').disabled = selectedFile === 3;
  app.querySelector('.file-counter').textContent = `${selectedFile + 1} of 4`;
  app.querySelectorAll('.file').forEach((card,n) => card.classList.toggle('active', n === selectedFile));
}
function goFile(n) {
  selectedFile = Math.max(0,Math.min(3,n));
  const scroll = app.querySelector('.files-scroll'), card = scroll.querySelector(`[data-file="${selectedFile}"]`);
  scroll.scrollTo({top:scroll.scrollTop + card.getBoundingClientRect().top-scroll.getBoundingClientRect().top-35, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  updateFileControls();
}
function nextSample(kind) {
  cancelAuto(); snapshot = clone(config); queued = false; resolved = null; hinted = false;
  const pool = eligible(snapshot);
  const reference = [{string:6,fret:3},{string:2,fret:1},{string:1,fret:0},{string:5,fret:3}][index++ % 4];
  question = kind === 'open' ? pool.find(p => p.fret === 0) : pool.find(p => p.string === reference.string && p.fret === reference.fret);
  question ||= pool[(index * 7) % pool.length];
  answerBank = snapshot.choices === 12 ? [...Array(12).keys()] : [question.pitch,...[...Array(12).keys()].filter(p=>p!==question.pitch).slice(0,snapshot.choices-1)];
  if (snapshot.choices < 12) answerBank = answerBank.slice(index % answerBank.length).concat(answerBank.slice(0,index % answerBank.length));
  renderPractice(true);
}
function renderPractice(focus = false) {
  route = 'practice';
  const location = `String ${question.string} · ${question.fret === 0 ? 'open' : `fret ${question.fret}`}`;
  const assisted = hinted || (snapshot.labels && question.fret === 0);
  let headline = 'Take your time.', detail = 'Choose the name of the marked note.';
  if (hinted) { headline = 'A little starting point.'; detail = `The open string is ${sharp[({1:64,2:59,3:55,4:50,5:45,6:40}[question.string])%12]}. Move up ${question.fret} semitone${question.fret===1?'':'s'} — one for each fret. This answer is assisted.`; }
  if (resolved) {
    headline = resolved.outcome === 'answer' ? resolved.pitch === question.pitch ? `✓ ${name(question.pitch)} is right.${assisted ? ' With help.' : ''}` : `× Not quite. This is ${name(question.pitch)}.` : resolved.outcome === 'skip' ? `Skipped. This is ${name(question.pitch)}.` : `The note is ${name(question.pitch)}.`;
    detail = `${location}. ${resolved.outcome === 'answer' && resolved.pitch !== question.pitch ? 'Your first answer stays incorrect.' : 'This is a sample question, not a saved result.'}`;
  }
  app.innerHTML = `<main class="practice-shell"><header class="practice-top"><span class="eyebrow">FRETBOARD NAMING PRACTICE</span><div class="practice-top-actions"><button class="quiet-button" data-action="settings">Customize</button><button class="quiet-button" data-action="pause">Pause</button><button class="quiet-button" data-action="end">End session ${arrow('right')}</button></div></header><section class="practice-sheet" aria-label="Sample fretboard question"><header class="question-heading"><div><span class="eyebrow">ONE POSITION. ONE NOTE.</span><h1 tabindex="-1">What note is this?</h1></div><div class="position-label">${location}<small>Standard tuning</small></div></header><div class="board-wrap">${renderBoard(snapshot,question)}</div><div class="board-caption"><span>${snapshot.left ? 'Left-handed view' : 'High string above low string'} · solid line = tested string</span><span>Slide the neck to explore →</span></div><p class="answer-label">${snapshot.choices === 12 ? 'All twelve note names' : `${snapshot.choices} choices · more support`}${assisted ? ' · assisted question' : ''}</p><div class="answers" role="group" aria-label="Note answers">${answerBank.map(p=>`<button class="answer ${name(p).includes('/')?'combined':''} ${resolved && p===question.pitch?'correct':''} ${resolved?.outcome==='answer' && p===resolved.pitch && p!==question.pitch?'wrong':''}" data-pitch="${p}" ${resolved?'disabled':''}>${name(p)}</button>`).join('')}</div><div class="practice-feedback"><div class="feedback-copy" role="status" aria-live="polite"><strong>${headline}</strong><p>${detail}</p></div><div class="feedback-actions">${resolved ? `<button class="primary" data-action="next">Next ${arrow('right')}</button>` : `<button class="text-button" data-action="hint" ${!snapshot.hints || hinted?'disabled':''}>A little help</button><button class="secondary" data-action="skip">Skip ${arrow('right')}</button>`}</div></div></section><div class="below-sheet"><span class="small">Sample question · no results are saved</span>${!resolved ? '<button class="text-button" data-action="reveal">Reveal answer</button>' : ''}${queued?'<span class="queued" role="status">Changes apply to the next question.</span>':''}</div><div class="preview-controls" aria-label="Interface review scenarios"><span>Preview a state:</span><button class="text-button" data-action="sample-open">Open string</button><button class="text-button" data-action="sample-wide">Frets 0–24</button><span>Question selection is illustrative in this milestone.</span></div></main>`;
  boardObserver?.disconnect();
  const board = app.querySelector('.board-scroll');
  const revealTarget = () => {
    if (route !== 'practice' || !board.isConnected) return;
    const scale = board.querySelector('svg').getBoundingClientRect().width / Number(board.querySelector('svg').getAttribute('width'));
    board.scrollLeft = Number(board.dataset.targetX) * scale - board.clientWidth / 2;
  };
  boardObserver = new ResizeObserver(revealTarget);
  boardObserver.observe(board);
  requestAnimationFrame(revealTarget);
  if (focus) { requestAnimationFrame(()=>{if(route==='practice')app.querySelector('.question-heading')?.scrollIntoView({block:'start',behavior:'instant'});}); setFocus(resolved ? '[data-action="next"]' : 'h1'); announce(`${location}. What note is this?`); }
}
function resolve(outcome,pitch = null) {
  if (resolved || settingsOpen || pauseDialog || route !== 'practice') return;
  resolved = {outcome,pitch}; sampleAnswered = true; renderPractice(); setFocus('[data-action="next"]');
  if (outcome==='answer' && pitch===question.pitch && snapshot.auto) {
    const generation = timerGeneration;
    autoTimer = setTimeout(()=>{if(generation===timerGeneration && route==='practice' && !settingsOpen && !pauseDialog)nextSample();},snapshot.delay*1000);
  }
}
function customize(nextConfig = config) {
  cancelAuto(); settingsOpen = true;
  openSettings(nextConfig, {practice:route==='practice',onApply:c=>{
    config=c; settingsOpen=false;
    if(route==='practice'){queued=true;renderPractice();setFocus('[data-action="settings"]');}
    else if(route==='cabinet'){renderCabinet();setFocus('[data-action="settings"]');}
    else {announce('Settings are ready for your next sample session. Return to files to start.');}
    if (interrupted) { interrupted=false; pause(); }
  },onCancel:()=>{settingsOpen=false;if(interrupted){interrupted=false;pause();}}});
}
function pause() {
  if (route!=='practice' || pauseDialog || settingsOpen) return;
  cancelAuto(); const opener=document.activeElement;
  pauseDialog=document.createElement('dialog');pauseDialog.className='pause-dialog';pauseDialog.setAttribute('aria-labelledby','pause-title');
  pauseDialog.innerHTML='<span class="eyebrow">TAKE A BREATHER</span><h2 id="pause-title">Your note can wait.</h2><p>The question stays right here. Resume when you’re ready.</p><div class="pause-actions"><button class="primary" data-resume>Resume practice</button><button class="text-button" data-end>End session</button></div>';
  const finish = end => {pauseDialog.close();pauseDialog.remove();pauseDialog=null;if(end)renderRecap();else if(opener?.isConnected)opener.focus();};
  pauseDialog.addEventListener('cancel',e=>{e.preventDefault();finish(false);});
  pauseDialog.querySelector('[data-resume]').onclick=()=>finish(false);pauseDialog.querySelector('[data-end]').onclick=()=>finish(true);
  document.body.append(pauseDialog);pauseDialog.showModal();
}
function renderRecap(variant=sampleAnswered?'sample':'zero') {
  cancelAuto();boardObserver?.disconnect();route='recap';
  const zero=variant==='zero', low=variant==='few';
  app.innerHTML=`${masthead()}<main class="report-shell"><section class="report-sheet"><header class="report-header"><div><span class="eyebrow">YOUR PRACTICE, ON PAPER</span><h1 tabindex="-1">${zero?'Your practice report.':'A little more familiar.'}</h1><p class="small">${zero?'A sample of the empty-session report.':'An example of the report you’ll get after practice.'}</p><div class="report-meta"><span>${zero?'0':low?'3':'12'} sample questions resolved</span><span>12 choices · sharps</span></div></div><span class="sample-stamp">SAMPLE REPORT<br>NOT YOUR RESULTS</span></header><article class="insight"><span class="insight-number">01</span><div><div class="insight-title">Unassisted first-answer accuracy</div><div class="metric">${zero?'No answers yet':low?'67% <small>· 2 of 3</small>':'75% <small>· 9 of 12</small>'}</div><p>${zero?'An unanswered question is excluded. There’s no accuracy percentage to show.':'Correct first answers without hints or exposed labels, out of every resolved question — including mistakes, assisted answers, reveals, and skips.'}</p><p class="small">Sample performance with 12 answer choices. Multiple-choice success does not establish unaided recall, retention, or playing ability.</p></div></article><article class="insight"><span class="insight-number">02</span><div><div class="insight-title">Typical answer time</div>${zero||low?'<div class="metric">Not enough answers yet</div><p>Answer a few more questions without hints to see your typical response time.</p>':'<div class="metric">3.2 <small>seconds · median of 9 answers</small></div><p>Only unassisted correct first answers qualify. Pauses, settings, and feedback time are excluded.</p>'}<p class="small">${zero?'0':low?'2':'9'} qualifying sample answers. Faster is not necessarily better learning.</p></div></article><article class="insight"><span class="insight-number">03</span><div><div class="insight-title">Suggested next focus</div><div class="metric">${zero?'Start anywhere.':low?'Keep exploring.':'A little time on string 2.'}</div><p>${zero?'No positions covered yet. Start with the settings that feel comfortable.':low?'This sample covers three strings. No string or note has five resolved questions yet, so there isn’t enough evidence to suggest a weaker area.':'B string: 3 of 6 unassisted correct in this sample session. Try a short session focused on this string.'}</p>${!zero&&!low?'<button class="secondary" data-action="focus">Use this focus</button><p class="small">Opens editable settings. Practice starts only when you choose.</p>':''}</div></article><footer class="report-actions"><button class="primary" data-action="files">${arrow('left')} Back to files</button><p class="report-footnote">These numbers are illustrative. The finished game will calculate your report from actual answers.</p></footer></section><div class="preview-controls"><label for="report-variant">Preview report:</label><select id="report-variant"><option value="sample" ${variant==='sample'?'selected':''}>With sample results</option><option value="few" ${low?'selected':''}>Not enough evidence</option><option value="zero" ${zero?'selected':''}>No answers</option></select></div></main>`;
  app.querySelector('#report-variant').onchange=e=>renderRecap(e.target.value);window.scrollTo({top:0,behavior:'instant'});setFocus('h1');
}
app.addEventListener('click',event=>{
  const b=event.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.pitch!==undefined){resolve('answer',Number(b.dataset.pitch));return;}
  switch(b.dataset.action){
    case 'start':cabinetPageScroll=window.scrollY;cabinetScroll=app.querySelector('.files-scroll').scrollTop;sampleAnswered=false;nextSample();break;
    case 'settings':customize();break;
    case 'previous-file':goFile(selectedFile-1);break;
    case 'next-file':goFile(selectedFile+1);break;
    case 'next':nextSample();break;
    case 'hint':hinted=true;renderPractice();setFocus('[data-action="skip"]');break;
    case 'skip':resolve('skip');break;
    case 'reveal':resolve('reveal');break;
    case 'pause':pause();break;
    case 'end':renderRecap();break;
    case 'files':renderCabinet(true);break;
    case 'focus':customize({...config,strings:[2],start:0,end:12,open:true,frets:defaults().frets,notes:defaults().notes});break;
    case 'sample-open':config={...config,start:0,open:true,strings:defaults().strings,frets:defaults().frets,notes:defaults().notes};nextSample('open');break;
    case 'sample-wide':config={...config,start:0,end:24,strings:defaults().strings,frets:defaults().frets,notes:defaults().notes};nextSample();break;
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden && route==='practice'){if(settingsOpen)interrupted=true;else pause();}});
renderCabinet();
