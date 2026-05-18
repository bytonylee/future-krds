#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checks = [];

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function countFiles(dir) {
  const skip = new Set(['.git', 'node_modules', 'dist', 'build']);
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    let n = 0;
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (skip.has(e.name)) continue;
        n += await walk(full);
      } else if (e.isFile()) {
        n += 1;
      }
    }
    return n;
  }
  return walk(dir);
}

function addCheck(name, pass, detail) {
  checks.push({ name, pass, detail });
}

const requiredPaths = [
  'external/krds-uiux',
  'assets/krds',
  'references/krds',
  'skills/krds-plan/SKILL.md',
  'skills/krds-improve/SKILL.md',
  'skills/krds-transform/SKILL.md',
  'reports/krds-uiux-files.md',
  'reports/design-md-files.md',
  'resources/krds/test-verifiers.md',
  'DESIGN.md',
  'experiment/handsoap-site/index.html',
  'scripts/krds-desloppify.mjs',
  'scripts/krds-similarity.mjs',
  'scripts/build-handsoap-experiment.mjs',
  'scripts/verify-krds-component-coverage.mjs',
  'reports/experiment/final-score.json',
  'reports/experiment/component-coverage-check.json'
];

for (const p of requiredPaths) {
  addCheck(`exists:${p}`, await exists(path.join(root, p)), p);
}

const srcCount = await countFiles(path.join(root, 'external/krds-uiux'));
const assetCount = await countFiles(path.join(root, 'assets/krds'));
const refCount = await countFiles(path.join(root, 'references/krds'));
addCheck('mirror:assets matches source count', srcCount === assetCount, `${srcCount} vs ${assetCount}`);
addCheck('mirror:references matches source count', srcCount === refCount, `${srcCount} vs ${refCount}`);

const designText = await fs.readFile(path.join(root, 'DESIGN.md'), 'utf8');
const designSections = ['## Overview', '## Colors', '## Typography', '## Layout', '## Components'];
for (const section of designSections) {
  addCheck(`design section:${section}`, designText.includes(section), section);
}

const verifiers = await fs.readFile(path.join(root, 'resources/krds/test-verifiers.md'), 'utf8');
addCheck('verifier report contains explicit result', /No automated test verifiers were found/.test(verifiers), 'explicit none-found statement');

const planSkill = await fs.readFile(path.join(root, 'skills/krds-plan/SKILL.md'), 'utf8');
const transformSkill = await fs.readFile(path.join(root, 'skills/krds-transform/SKILL.md'), 'utf8');
const improveSkill = await fs.readFile(path.join(root, 'skills/krds-improve/SKILL.md'), 'utf8');
addCheck('krds-plan covers initial-state workflow', /initial state/i.test(planSkill), 'initial state coverage');
addCheck('krds-plan covers website or app scope', /website|app/i.test(planSkill), 'website/app coverage');
addCheck('krds-transform covers theme change workflow', /theme/i.test(transformSkill), 'theme transformation coverage');
addCheck('krds-improve covers compliance scoring', /score|threshold|rule/i.test(improveSkill), 'scoring-driven improvement coverage');

const similarityRun = spawnSync('node', ['scripts/krds-similarity.mjs', 'experiment/handsoap-site/index.html'], { encoding: 'utf8' });
if (similarityRun.status === 0 || similarityRun.stdout) {
  const similarity = JSON.parse(similarityRun.stdout || '{}');
  addCheck('experiment similarity >= 95', Number(similarity.score || 0) >= 95, String(similarity.score));
  addCheck('experiment similarity has no failed rules', Array.isArray(similarity.summary?.failed) && similarity.summary.failed.length === 0, JSON.stringify(similarity.summary?.failed || []));
} else {
  addCheck('experiment similarity >= 95', false, similarityRun.stderr || 'similarity run failed');
  addCheck('experiment similarity has no failed rules', false, similarityRun.stderr || 'similarity run failed');
}

const coverageRun = spawnSync('node', ['scripts/verify-krds-component-coverage.mjs'], { encoding: 'utf8' });
if (coverageRun.status === 0 || coverageRun.stdout) {
  const coverage = JSON.parse(coverageRun.stdout || '{}');
  addCheck('experiment covers all KRDS component references', coverage.ok === true && coverage.coveredComponents === coverage.totalReferenceComponents, `${coverage.coveredComponents}/${coverage.totalReferenceComponents}`);
} else {
  addCheck('experiment covers all KRDS component references', false, coverageRun.stderr || 'coverage run failed');
}

const failed = checks.filter((c) => !c.pass);
const result = {
  ok: failed.length === 0,
  summary: {
    total: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length
  },
  checks
};

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
