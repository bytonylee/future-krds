---
name: krds-improve
description: Polish an existing KRDS-based website/app to maximize rule compliance, accessibility, and consistency.
---

# krds-improve

## Purpose

Use this after initial KRDS implementation to improve quality without changing product behavior.

## Scope

- Website pages and app views already using KRDS-like components
- Markup semantics, a11y correctness, consistency, and maintainability

## Workflow

1. Baseline with KRDS rule scorer and checklist.
2. Fix high-impact gaps first:
   - missing landmarks, skip-link targets, form labels, icon button text
3. Tighten consistency:
   - button hierarchy, table semantics, spacing rhythm, naming alignment
4. Re-run scorer and compare delta.
5. Repeat until threshold is met.

## Required Verification

- All required KRDS rules pass
- Accessibility rule pass rate is 100%
- Similarity score meets target threshold
- No unrelated file changes

## Done Criteria

Website/app quality is demonstrably improved with a rule-by-rule report and final score evidence.
