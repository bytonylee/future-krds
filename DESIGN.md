---
version: alpha
name: KRDS Public Service Baseline
description: KRDS-focused design baseline for accessible Korean public digital services.
colors:
  primary: "#1D1D1D"
  secondary: "#505A66"
  tertiary: "#0057B8"
  neutral: "#FFFFFF"
  surface: "#F7F8FA"
  danger: "#D92D20"
typography:
  heading-lg:
    fontFamily: Noto Sans KR
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
rounded:
  sm: 4px
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 12px
  alert-critical:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.neutral}"
---

## Overview

KRDS styling prioritizes clarity, consistency, and accessibility for Korean government digital services. Interfaces should remain highly legible, predictable, and task-oriented across desktop and mobile.

## Colors

Use high-contrast neutrals for text and surfaces, with controlled blue for primary actions and red for critical states. Avoid decorative accent overuse.

## Typography

Use Korean-friendly sans-serif typography with disciplined hierarchy and clear spacing to preserve readability for dense policy and service content.

## Layout

Adopt an 8px spacing rhythm and consistent block grouping. Keep forms and tables aligned with clear label and helper text proximity.

## Components

Favor reusable KRDS-aligned components, preserving focus states, validation feedback, and keyboard navigability.

## Do's and Don'ts

Do preserve semantic HTML and explicit labels. Don't introduce visual-only cues without text alternatives.
