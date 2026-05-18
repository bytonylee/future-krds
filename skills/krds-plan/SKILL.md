---
name: krds-plan
description: Start from initial state and produce a KRDS-compliant implementation plan for website or app UI.
---

# krds-plan

## Purpose

Use this at the beginning of a website or app design/build request to define KRDS-first scope before implementation.

## Inputs

- Product goal and user flows
- Existing screens or blank initial state
- Delivery constraints (time, platform, stack)

## Workflow

1. Identify page/app states: empty, loading, success, error, form-validation.
2. Map each state to KRDS component families from `external/krds-uiux/html/code`.
3. Define semantic structure and accessibility obligations:
   - `lang=ko`, landmarks (`header/nav/main/footer`), skip-link
   - label-control binding, alt text, sr-only labels for icon controls
4. Define style baseline from KRDS patterns:
   - spacing rhythm, typography hierarchy, contrast-safe colors
5. Output a file-level edit plan with exact validation commands.

## Output Contract

- `Scope`
- `State Matrix`
- `KRDS Component Mapping`
- `Accessibility Gates`
- `Files To Change`
- `Validation Commands`

## Done Criteria

Plan is actionable without additional assumptions and includes measurable pass/fail checks.
