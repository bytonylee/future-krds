#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { spawnSync } from 'node:child_process';

const target = 'experiment/handsoap-site/index.html';
const reportDir = 'reports/experiment';
await fs.mkdir(reportDir, { recursive: true });

const buildRun = spawnSync('node', ['scripts/build-handsoap-experiment.mjs'], { encoding: 'utf8' });
if (buildRun.status !== 0) {
  console.error(buildRun.stderr || buildRun.stdout);
  process.exit(buildRun.status || 1);
}

const planDoc = `${reportDir}/01-krds-plan.md`;
const transformDoc = `${reportDir}/02-krds-transform.md`;
const improveDoc = `${reportDir}/03-krds-improve.md`;

await fs.writeFile(planDoc, `# KRDS Plan\n\n- Product: Handsoap seller website\n- Initial state: blank page\n- Target: KRDS-like structure and accessibility\n- Required anchors: #krds-skip-link, #wrap.g-wrap, #krds-header, #content, #krds-footer\n- Validation: node scripts/krds-similarity.mjs ${target}\n`, 'utf8');

let html = await fs.readFile(target, 'utf8');

// Transform pass (krds-transform): enforce structural anchors.
const transforms = [
  { test: /id="krds-header"/, add: '<header id="krds-header" class="krds-header">', replace: /<header[^>]*>/ },
  { test: /id="krds-footer"/, add: '<footer id="krds-footer">', replace: /<footer[^>]*>/ },
  { test: /id="container"/, add: '<div id="container">', replace: null }
];
for (const t of transforms) {
  if (!t.test.test(html) && t.replace) html = html.replace(t.replace, t.add);
}
if (!/id="container"/.test(html) && /<main id="content">/.test(html)) {
  html = html.replace('<main id="content">', '<div id="container">\n      <main id="content">');
  html = html.replace('</main>', '</main>\n    </div>');
}
await fs.writeFile(target, html, 'utf8');
await fs.writeFile(transformDoc, `# KRDS Transform\n\n- Applied structure normalization for KRDS anchors.\n- Preserved existing content and behavior.\n- Target file: ${target}\n`, 'utf8');

// Improve loop (krds-improve): apply small auto-fixes until score >= 95.
let final = null;
for (let i = 1; i <= 6; i++) {
  const run = spawnSync('node', ['scripts/krds-similarity.mjs', target], { encoding: 'utf8' });
  const out = run.stdout || run.stderr;
  const report = JSON.parse(out);
  await fs.writeFile(`${reportDir}/score-iteration-${i}.json`, JSON.stringify(report, null, 2));

  if (report.pass) {
    final = report;
    break;
  }

  let next = await fs.readFile(target, 'utf8');
  if (report.summary.failed.includes('nav-aria-label') && /<nav(?![^>]*aria-label)/.test(next)) {
    next = next.replace('<nav', '<nav aria-label="주요 메뉴"');
  }
  if (report.summary.failed.includes('icon-button-has-sr-only') && /class="krds-btn tertiary icon"/.test(next) && !/sr-only/.test(next)) {
    next = next.replace('class="krds-btn tertiary icon">', 'class="krds-btn tertiary icon"><span class="sr-only">아이콘 버튼</span>');
  }
  if (report.summary.failed.includes('meta-description') && !/name="description"/.test(next)) {
    next = next.replace('</head>', '  <meta name="description" content="KRDS aligned experiment page" />\n</head>');
  }
  if (report.summary.failed.includes('skip-link-target-exists') && /id="content"/.test(next) && !/href="#content"/.test(next)) {
    next = next.replace('href="#breadcrumb-home"', 'href="#content"');
  }
  await fs.writeFile(target, next, 'utf8');
}

if (!final) {
  const run = spawnSync('node', ['scripts/krds-similarity.mjs', target], { encoding: 'utf8' });
  final = JSON.parse(run.stdout || run.stderr);
}

await fs.writeFile(improveDoc, `# KRDS Improve\n\n- Iterative hardening run complete.\n- Final score: ${final.score}\n- Threshold: ${final.threshold}\n- Pass: ${final.pass}\n`, 'utf8');
await fs.writeFile(`${reportDir}/final-score.json`, JSON.stringify(final, null, 2));

const coverageRun = spawnSync('node', ['scripts/verify-krds-component-coverage.mjs'], { encoding: 'utf8' });
if (coverageRun.stdout) {
  await fs.writeFile(`${reportDir}/component-coverage-check.json`, coverageRun.stdout);
}
if (coverageRun.status !== 0) {
  console.error(coverageRun.stderr || coverageRun.stdout);
  process.exit(coverageRun.status || 1);
}

console.log(JSON.stringify({ target, finalScore: final.score, pass: final.pass }, null, 2));
process.exit(final.pass ? 0 : 1);
