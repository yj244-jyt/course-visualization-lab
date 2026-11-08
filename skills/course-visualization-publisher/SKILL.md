---
name: course-visualization-publisher
description: Create, test, catalog, and publish interactive visual explanations for course concepts in the user's Course Visualization Lab. Use when the user asks to visualize, animate, or interactively explain coursework and wants the result added to the reusable learning site. Do not use for unrelated websites or static diagrams.
---

# Course Visualization Publisher

Turn one course question into a focused interactive explainer and add it to the Course Visualization Lab.

## Workflow

1. Identify the learner's exact conceptual confusion. Design the interaction around that confusion, not around a broad chapter summary.
2. Inspect the repository and read [references/site-contract.md](references/site-contract.md) before adding or publishing an explainer.
3. Create a standalone, responsive HTML explainer under `visualizations/<slug>/index.html`. Prefer direct manipulation, step-through animation, and parameter controls when they reveal the concept. Keep formulas paired with the visible state they describe.
4. Make conceptual distinctions explicit when two coordinate systems, domains, representations, or units are easy to confuse. Never imply that a frequency-domain coordinate is a spatial pixel location.
5. Add or update the catalog entry with `scripts/add_visualization.py`. Do not hand-edit generated catalog ordering when the script can do it deterministically.
6. Verify desktop and mobile rendering, keyboard operation, nonblank canvases or SVGs, and the primary interaction. Check that labels do not overlap and that reduced-motion users can still understand the explainer.
7. Commit and publish only when the user has asked to update the external site. Confirm GitHub authentication immediately before remote mutations. Push to `main`, then verify the Pages deployment and live URL.

## Design requirements

- The first screen is the working explainer, not a marketing page.
- Use a quiet course-tool interface with a clear title, compact controls, stable dimensions, and no decorative gradients or floating ornament.
- Preserve mathematical correctness. State units, array shape changes, transform conventions, centering operations, and clipping behavior when they matter.
- Use theme-aware colors and pair color with text or shape. Support widths down to 320 px.
- Avoid explanatory walls of text inside the interface. Use short labels that update with the current animation state.

## Scope and safety

- Reuse the existing repository and catalog unless the user explicitly requests a new one.
- Never create repositories, enable hosting, push commits, or modify an existing published item without user authorization for that external change.
- Keep one explainer focused on one learning question. Add a separate catalog item when a new concept requires a substantially different mental model or interaction.
