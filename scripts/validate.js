const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'app', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptStart = html.indexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart);
if (scriptStart < 0 || scriptEnd < 0) {
  throw new Error('Expected one inline app script in app/index.html.');
}

const script = html.slice(scriptStart + '<script>'.length, scriptEnd);
new Function(script);

const elements = {};
function stubElement() {
  return {
    value: '',
    classList: { add() {}, remove() {}, toggle() {} },
    style: {},
    textContent: '',
    innerHTML: '',
    addEventListener() {},
    setAttribute() {},
  };
}
const documentStub = {
  addEventListener() {},
  getElementById(id) {
    elements[id] ||= stubElement();
    return elements[id];
  },
  querySelectorAll() {
    return [];
  },
};
const localStorageStub = {
  getItem() {
    return '[]';
  },
  setItem() {},
};
const runtime = Function(
  'document',
  'localStorage',
  `${script}; return { parseBulkProblems, renderTeacherKey, state, mazeDataFromState, encodeSharePayload, decodeSharePayload, renderSamplePicker };`
)(documentStub, localStorageStub);

const bulkSmoke = runtime.parseBulkProblems('2x + 5 = 11 | x = 3 | x = 8 | x = -3 | x = 6\nbad row');
if (bulkSmoke.rows.length !== 1 || bulkSmoke.errors.length !== 1) {
  throw new Error('Bulk parser smoke test failed.');
}
runtime.state.problems = bulkSmoke.rows;
if (!runtime.renderTeacherKey().includes('Teacher Key')) {
  throw new Error('Teacher key smoke test failed.');
}
if (runtime.mazeDataFromState().problems.length !== 1) {
  throw new Error('Maze data snapshot smoke test failed.');
}
const sharedPayload = runtime.decodeSharePayload(runtime.encodeSharePayload(runtime.mazeDataFromState()));
if (!sharedPayload.problems || sharedPayload.problems.length !== 1) {
  throw new Error('Shared link payload smoke test failed.');
}
elements['sample-search'] = stubElement();
elements['sample-category-tabs'] = stubElement();
elements['sample-list'] = stubElement();
elements['sample-count-label'] = stubElement();
runtime.renderSamplePicker();
if (!elements['sample-list'].innerHTML.includes('Factoring Trinomials') || !elements['sample-category-tabs'].innerHTML.includes('Polynomials &amp; Factoring')) {
  throw new Error('Sample picker render smoke test failed.');
}

const requiredMarkers = [
  'data-mode="key"',
  'id="btn-bulk-entry"',
  'id="recent-list"',
  'function renderTeacherKey()',
  'function parseBulkProblems(text)',
  'function saveCurrentToRecent()',
  'function emptyStateMarkup()',
  'id="btn-share"',
  'id="share-student-url"',
  'function loadSharedMazeFromHash()',
  'body.student-view',
  'id="sample-search"',
  'id="sample-category-tabs"',
  'id="sample-list"',
  'const SAMPLE_GROUPS',
];

const missingMarkers = requiredMarkers.filter(marker => !html.includes(marker));
if (missingMarkers.length) {
  throw new Error(`Missing expected feature markers: ${missingMarkers.join(', ')}`);
}
const removedStudentControls = ['id="btn-student-reset"', 'id="btn-exit-student"', 'id="student-bar"'];
const presentStudentControls = removedStudentControls.filter(marker => html.includes(marker));
if (presentStudentControls.length) {
  throw new Error(`Student shared view should stay clean; remove: ${presentStudentControls.join(', ')}`);
}

const sampleStart = html.indexOf('const SAMPLES = {');
const sampleEnd = html.indexOf('\n/* =========================================================================\n   UTIL', sampleStart);
if (sampleStart < 0 || sampleEnd < 0) {
  throw new Error('Could not locate sample catalog.');
}

const { SAMPLES: samples, SAMPLE_GROUPS: sampleGroups } = Function(`${html.slice(sampleStart, sampleEnd)} return { SAMPLES, SAMPLE_GROUPS };`)();
const sampleKeys = Object.keys(samples);
const groupedKeys = sampleGroups.flatMap(group => group.samples);
const duplicateGroupKeys = groupedKeys.filter((key, index) => groupedKeys.indexOf(key) !== index);

const missingSamples = groupedKeys.filter(key => !samples[key]);
const unlistedSamples = sampleKeys.filter(key => !groupedKeys.includes(key));
if (missingSamples.length || unlistedSamples.length || duplicateGroupKeys.length) {
  throw new Error(`Sample catalog mismatch: missing=${missingSamples.join(',')} unlisted=${unlistedSamples.join(',')} duplicates=${duplicateGroupKeys.join(',')}`);
}

const invalidSamples = [];
for (const [key, sample] of Object.entries(samples)) {
  if (!sample.title || !sample.style || !Array.isArray(sample.problems) || sample.problems.length < 3) {
    invalidSamples.push(key);
    continue;
  }

  for (const [index, problem] of sample.problems.entries()) {
    if (!problem.problem || !problem.correctAnswer || !Array.isArray(problem.distractors) || problem.distractors.length < 3) {
      invalidSamples.push(`${key}[${index}]`);
    }
  }
}

if (invalidSamples.length) {
  throw new Error(`Invalid sample data: ${invalidSamples.join(', ')}`);
}

console.log(JSON.stringify({
  scripts: 1,
  samples: sampleKeys.length,
  menuItems: groupedKeys.length,
  sampleGroups: sampleGroups.length,
  featureMarkers: requiredMarkers.length,
  smokeTests: 7,
  issues: 0
}));
