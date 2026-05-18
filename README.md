# Future KRDS Skill

[English](./README.md) | [한국어](./README.ko.md)

![Version](https://img.shields.io/badge/version-0.0.1-333333?style=flat-square)
![KRDS UIUX](https://img.shields.io/badge/KRDS_UIUX-v1.1.0-0057B8?style=flat-square)
![Components](https://img.shields.io/badge/components-74%2F74-0F7B3A?style=flat-square)
![Similarity](https://img.shields.io/badge/similarity-100%25-0F7B3A?style=flat-square)
[![License](https://img.shields.io/badge/license-KRDS_terms_%2B_ISC-yellow?style=flat-square)](./LICENSE)

Navigation: [What It Is](#what-it-is) | [What Is KRDS](#what-is-krds) |
[Skills](#included-skills) | [Install](#installation) | [Usage](#usage) |
[Experiment](#experiment) | [License](#license)

Future KRDS Skill is a Codex skill bundle and validation harness for building
KRDS-aligned websites and app views. It turns the KRDS HTML Component Kit into a
repeatable agent workflow: plan the interface, transform the UI into KRDS rules,
improve it through rule-based validation, and keep evidence in reports.

This repository includes a working experiment: a handsoap landing page generated
from the KRDS workflow and validated against the KRDS homepage structure and
local KRDS rules.

## What It Is

Future KRDS Skill contains three skills and a hardening system:

1. **`krds-plan`** starts a website or app design process from an initial state.
2. **`krds-transform`** takes an existing website/app and rethemes it to KRDS UIUX rules.
3. **`krds-improve`** checks whether the result fits KRDS rules, then iterates until it passes.

The harness is modeled after the quality-loop idea of
[`desloppify`](https://github.com/peteromallet/desloppify): scan, score,
prioritize, fix, and verify. Here the score is KRDS-specific rather than general
code quality.

## What Is KRDS

KRDS means **Korea Design System**. It is a design system for Korean digital
government services, created to support convenience, consistency, accessibility,
and usability across public websites and applications.

Reference sources:

- Official KRDS website: [krds.go.kr](https://www.krds.go.kr)
- KRDS introduction: [About KRDS](https://www.krds.go.kr/html/eng/utility/utility_01.html)
- KRDS Korean introduction: [KRDS 소개](https://www.krds.go.kr/html/site/utility/utility_01.html)
- KRDS HTML Component Kit repository: [KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux)
- KRDS HTML components: [Component summary](https://www.krds.go.kr/html/site/component/component_summary.html)
- KRDS copyright page: [저작권](https://www.krds.go.kr/html/site/utility/utility_06.html)

The upstream `krds-uiux` package describes itself as an HTML Component Kit for
applying the design system consistently. The package metadata currently declares
version `1.1.0` and license `ISC`, while the upstream README also states that the
package follows the terms of the Korea Digital Government Design System (KRDS).

## Included Skills

### `krds-plan`

Use this before building. It defines the page/app states, component mapping,
accessibility gates, file scope, and validation commands.

### `krds-transform`

Use this when an original website or app already exists. It preserves behavior
while changing structure, classes, and theme direction to KRDS conventions.

### `krds-improve`

Use this after a first implementation. It runs the scorer, checks KRDS rule fit,
fixes gaps, and repeats until the page passes the threshold.

## Repository Layout

- `skills/krds-plan`: planning workflow for new KRDS pages/apps.
- `skills/krds-transform`: migration workflow for existing websites/apps.
- `skills/krds-improve`: hardening workflow for KRDS rule compliance.
- `scripts/`: build, scoring, component coverage, and validation scripts.
- `experiment/handsoap-site`: generated KRDS handsoap landing page.
- `reports/experiment`: validation results and screenshots.
- `assets/krds`: local mirror of KRDS UIUX assets used by the harness.
- `references/krds`: local KRDS reference mirror.
- `resources/krds`: manifest and verifier notes.

## Installation

### Install as Codex skills

From this repository:

```bash
mkdir -p ~/.codex/skills
cp -R skills/krds-plan ~/.codex/skills/
cp -R skills/krds-transform ~/.codex/skills/
cp -R skills/krds-improve ~/.codex/skills/
```

Restart Codex after copying the skills.

### Install from GitHub

If published under `bytonylee/future-krds`, install with:

```bash
npx skills add bytonylee/future-krds
```

Or use the full Git URL:

```bash
npx skills add https://github.com/bytonylee/future-krds.git
```

### Install KRDS UIUX package separately

For application projects that need the upstream package:

```bash
npm install krds-uiux
```

This repository keeps a local KRDS mirror for validation and examples, but real
projects should follow the official KRDS documentation and package guidance.

## Usage

### Plan a new KRDS page

```text
$krds-plan
Create a Korean public-service landing page for a handsoap seller.
Start from a blank state, map the content to KRDS components, and define validation gates.
```

### Transform an existing site

```text
$krds-transform
This existing product page works, but the visual system is generic.
Keep the content and form behavior, but change the structure and theme to KRDS UIUX rules.
```

### Improve a KRDS implementation

```text
$krds-improve
Audit this website against the KRDS component rules, accessibility gates,
and similarity scorer. Keep improving until there are no failed rules and the score is over 95.
```

### Full workflow prompt

```text
Use krds-plan, krds-transform, and krds-improve.
Create an experiment handsoap landing page using every KRDS component reference in assets/krds/html/code.
Compare it with https://www.krds.go.kr/html/site/index.html and keep iterating until the score is over 95 with no failed rules.
```

## Experiment

The current experiment is here:

- Page: [`experiment/handsoap-site/index.html`](./experiment/handsoap-site/index.html)
- Styles: [`experiment/handsoap-site/styles.css`](./experiment/handsoap-site/styles.css)
- Final score: [`reports/experiment/final-score.json`](./reports/experiment/final-score.json)
- Component coverage: [`reports/experiment/component-coverage-check.json`](./reports/experiment/component-coverage-check.json)
- Screenshot: [`reports/experiment/screenshots/handsoap-header-to-footer.png`](./reports/experiment/screenshots/handsoap-header-to-footer.png)

Run the build and validation:

```bash
node scripts/build-handsoap-experiment.mjs
node scripts/verify-krds-component-coverage.mjs
node scripts/krds-similarity.mjs experiment/handsoap-site/index.html
node scripts/validate-krds.mjs
```

Run the full hardening loop:

```bash
node scripts/krds-desloppify.mjs
```

Current verified result:

- KRDS component references covered: `74/74`
- Similarity score: `100`
- Threshold: `>95`
- Failed rules: `0`

## License

This repository is a third-party skill and harness. It is not an official KRDS
project.

KRDS-related assets and references come from the upstream
[KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux) repository and the
official [KRDS website](https://www.krds.go.kr). The upstream package metadata
states `ISC`, and the upstream README states that the package follows the terms
of the Korea Digital Government Design System (KRDS). See [LICENSE](./LICENSE)
and the official [KRDS copyright page](https://www.krds.go.kr/html/site/utility/utility_06.html).

[Back to top](#future-krds-skill)
