#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const [rootArg, outArg, titleArg] = process.argv.slice(2);
if (!rootArg || !outArg || !titleArg) {
  console.error('Usage: node scripts/generate_file_catalog.mjs <root> <out> <title>');
  process.exit(1);
}

const root = path.resolve(rootArg);
const out = path.resolve(outArg);
const title = titleArg;

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'dist', 'build']);

async function walk(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      files.push(...(await walk(full, base)));
    } else if (e.isFile()) {
      files.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return files;
}

function descFromPath(rel, content) {
  const name = path.basename(rel);
  const ext = path.extname(rel).toLowerCase();
  const dir = path.dirname(rel);

  if (name === 'README.md') return 'Project or module documentation and usage overview.';
  if (name === 'package.json') return 'Node package manifest defining scripts, dependencies, and metadata.';
  if (name === 'LICENSE') return 'Repository license text and usage terms.';
  if (name === 'CONTRIBUTING.md') return 'Contributor workflow and contribution standards.';
  if (name === 'DESIGN.md') return 'Design system guidance and styling rules for generated output.';

  if (ext === '.md') {
    if (/^#\s+/m.test(content)) return 'Markdown documentation with structured headings and project guidance.';
    return 'Markdown documentation for implementation, guidelines, or examples.';
  }
  if (ext === '.json') {
    if (/\"name\"\\s*:|\"scripts\"\\s*:/.test(content)) return 'JSON manifest/config describing package metadata or tooling behavior.';
    return 'Structured configuration or data used by tooling or runtime.';
  }
  if (ext === '.yaml' || ext === '.yml') return 'YAML configuration for linting, pipelines, or specs.';
  if (ext === '.ts') {
    if (/describe\(|it\(/.test(content)) return 'TypeScript automated test file validating expected behavior.';
    return 'TypeScript source implementing CLI, utilities, or core logic.';
  }
  if (ext === '.tsx') return 'TypeScript React component or typed UI module.';
  if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
    if (/module\\.exports|export default|export\\s+\\{/.test(content)) return 'JavaScript module exporting config or runtime behavior.';
    return 'JavaScript source script, config, or runtime module.';
  }
  if (ext === '.html') {
    if (/<form|<button|<input|class=/.test(content)) return 'Static HTML component example demonstrating UI structure and states.';
    return 'Static HTML example or component markup reference.';
  }
  if (ext === '.css' || ext === '.scss') return 'Stylesheet defining component and layout styling.';
  if (ext === '.svg') return 'Vector asset used in UI or documentation.';
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp') return 'Image asset used by documentation or UI examples.';
  if (ext === '.lock') return 'Lockfile pinning exact dependency versions for reproducible installs.';

  if (dir.includes('test') || rel.includes('.test.')) return 'Automated test file validating expected behavior.';
  if (dir.includes('scripts')) return 'Repository automation script for checks, generation, or maintenance.';

  return 'Repository file supporting source code, assets, examples, or tooling.';
}

const files = (await walk(root)).sort();
let output = `# ${title}\n\n`;
output += `- Root: \`${root}\`\n`;
output += `- Total files: **${files.length}**\n\n`;
output += `## Files\n\n`;
for (const rel of files) {
  let sample = '';
  try {
    sample = (await fs.readFile(path.join(root, rel), 'utf8')).slice(0, 1200);
  } catch {
    sample = '';
  }
  output += `- \`${rel}\`: ${descFromPath(rel, sample)}\n`;
}

await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, output, 'utf8');
console.log(`Wrote ${out} (${files.length} files)`);
