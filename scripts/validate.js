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

const sampleStart = html.indexOf('const SAMPLES = {');
const sampleEnd = html.indexOf('\n};\n\n/* =========================================================================\n   UTIL', sampleStart);
if (sampleStart < 0 || sampleEnd < 0) {
  throw new Error('Could not locate SAMPLES object.');
}

const samples = Function(`${html.slice(sampleStart, sampleEnd + 4)} return SAMPLES;`)();
const sampleKeys = Object.keys(samples);
const dropdownKeys = [...html.matchAll(/data-sample="([^"]+)"/g)]
  .map(match => match[1])
  .filter(key => key !== 'blank');

const missingSamples = dropdownKeys.filter(key => !samples[key]);
const unlistedSamples = sampleKeys.filter(key => !dropdownKeys.includes(key));
if (missingSamples.length || unlistedSamples.length) {
  throw new Error(`Sample menu mismatch: missing=${missingSamples.join(',')} unlisted=${unlistedSamples.join(',')}`);
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
  menuItems: dropdownKeys.length,
  issues: 0
}));

