#!/usr/bin/env node
import { promises as fs } from 'node:fs';

const componentRoot = 'assets/krds/html/code';
const pagePath = 'experiment/handsoap-site/index.html';
const files = (await fs.readdir(componentRoot))
  .filter((file) => file.endsWith('.html'))
  .sort();
const html = await fs.readFile(pagePath, 'utf8');

const missing = [];
for (const file of files) {
  const component = file.replace(/\.html$/, '');
  const reference = `${componentRoot}/${file}`;
  if (!html.includes(`data-krds-component="${component}"`) || !html.includes(`data-krds-reference="${reference}"`)) {
    missing.push({ component, reference });
  }
}

const result = {
  ok: missing.length === 0,
  totalReferenceComponents: files.length,
  coveredComponents: files.length - missing.length,
  missing
};
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
