#!/usr/bin/env node
import { promises as fs } from 'node:fs';

const [candidatePath, referencePath = '/tmp/krds-index.html'] = process.argv.slice(2);
if (!candidatePath) {
  console.error('Usage: node scripts/krds-similarity.mjs <candidate-html> [reference-html]');
  process.exit(1);
}

const ruleset = JSON.parse(await fs.readFile('scripts/krds-ruleset.json', 'utf8'));
const candidate = await fs.readFile(candidatePath, 'utf8');
const reference = await fs.readFile(referencePath, 'utf8');

function has(re, text) {
  return re.test(text);
}

function extractClasses(text) {
  const set = new Set();
  for (const m of text.matchAll(/class\s*=\s*"([^"]+)"/g)) {
    for (const cls of m[1].split(/\s+/)) {
      if (cls) set.add(cls.trim());
    }
  }
  return set;
}

const checks = [];
const add = (name, pass, weight = 1) => checks.push({ name, pass, weight });

add('doctype', has(/<!DOCTYPE html>/i, candidate), 2);
add('lang-ko', has(/<html[^>]*lang="ko"/i, candidate), 2);

for (const meta of ruleset.requiredMeta) {
  if (meta === 'charset') add('meta-charset', has(/<meta[^>]*charset=/i, candidate), 1);
  if (meta === 'viewport') add('meta-viewport', has(/<meta[^>]*name="viewport"/i, candidate), 1);
  if (meta === 'description') add('meta-description', has(/<meta[^>]*name="description"/i, candidate), 1);
}

for (const lm of ruleset.requiredLandmarks) {
  add(`landmark-${lm}`, has(new RegExp(`<${lm}[^>]*>`, 'i'), candidate), 2);
}

const selectorRegex = {
  '#krds-skip-link': /id="krds-skip-link"/i,
  '#wrap.g-wrap': /id="wrap"[^>]*class="[^"]*g-wrap/i,
  '#krds-masthead': /id="krds-masthead"/i,
  '#krds-header': /id="krds-header"/i,
  '#container': /id="container"/i,
  '#content': /id="content"/i,
  '#krds-footer': /id="krds-footer"/i
};
for (const sel of ruleset.requiredSelectors) {
  add(`selector-${sel}`, has(selectorRegex[sel], candidate), 3);
}

for (const cls of ruleset.requiredClassPatterns) {
  add(`class-${cls}`, new RegExp(`class="[^"]*${cls}`).test(candidate), 2);
}

add('skip-link-target-exists', /href="#content"/.test(candidate) && /id="content"/.test(candidate), 3);
add('form-input-has-label', /<label[^>]*for="[^"]+"/i.test(candidate) && /<input[^>]*id="[^"]+"/i.test(candidate), 3);
add('icon-button-has-sr-only', /<button[^>]*icon[^>]*>[\s\S]*sr-only[\s\S]*<\/button>/i.test(candidate), 2);
add('image-has-alt', /<img[^>]*alt="[^"]+"/i.test(candidate), 2);
add('nav-aria-label', /<nav[^>]*aria-label="[^"]+"/i.test(candidate), 2);
add('table-semantic', /<table[\s\S]*<thead[\s\S]*<tbody/i.test(candidate), 2);

// Reference-profile similarity using KRDS class prefix coverage.
const refClasses = [...extractClasses(reference)].filter((c) => c.startsWith('krds-'));
const candClasses = extractClasses(candidate);
const covered = refClasses.filter((c) => candClasses.has(c)).length;
const prefixCoverage = refClasses.length === 0 ? 1 : covered / refClasses.length;
add('krds-class-prefix-coverage>=0.10', prefixCoverage >= 0.1, 1);

const totalWeight = checks.reduce((n, c) => n + c.weight, 0);
const passedWeight = checks.reduce((n, c) => n + (c.pass ? c.weight : 0), 0);
const score = Number(((passedWeight / totalWeight) * 100).toFixed(2));

const report = {
  score,
  threshold: 95,
  pass: score >= 95,
  summary: {
    totalChecks: checks.length,
    passed: checks.filter((c) => c.pass).length,
    failed: checks.filter((c) => !c.pass).map((c) => c.name)
  },
  checks,
  reference: {
    krdsPrefixedClassCount: refClasses.length,
    krdsPrefixedClassCoverage: Number(prefixCoverage.toFixed(4))
  }
};

console.log(JSON.stringify(report, null, 2));
process.exit(report.pass ? 0 : 1);
