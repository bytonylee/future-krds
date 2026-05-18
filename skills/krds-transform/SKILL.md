---
name: krds-transform
description: Transform an existing website/app theme and structure to KRDS UIUX rules while preserving behavior.
---

# krds-transform

## Purpose

Use this when there is already a website or app, and the task is to migrate its theme and UI structure to KRDS conventions.

## Inputs

- Current HTML/CSS/JS
- Existing UX behavior and IDs/hooks that must remain stable

## Workflow

1. Inventory existing components and interaction states.
2. Build before/after mapping to KRDS component patterns.
3. Replace visual/theme layer with KRDS-aligned tokens and classes.
4. Preserve behavior contracts:
   - IDs, data attributes, analytics hooks, submission targets
5. Re-check accessibility and semantic landmarks.

## Migration Rules

- No broad rewrites outside transformed scope.
- Keep structural anchors and script hooks compatible.
- Provide a change map for each replaced pattern.

## Done Criteria

Resulting UI preserves original functionality and passes KRDS validation rules with explicit evidence.
