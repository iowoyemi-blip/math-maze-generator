# Project Instructions

This project is a browser-only math maze generator for high school classroom practice. Teachers can load sample Algebra I topics, enter their own problems and answer choices, print worksheets, or use the maze interactively.

## Priorities

- Keep the app usable as a single static page in `app/index.html`.
- Preserve teacher control over problem text, correct answers, and distractors.
- Keep math notation readable for projection, printing, and student use.
- Prefer reliable worksheet behavior over visual novelty.
- Avoid adding build steps unless there is a clear classroom benefit.

## Before Editing

- Read `README.md` and inspect `app/index.html`.
- Check both worksheet mode and interactive mode when changing maze rendering.
- Preserve import/export compatibility for existing `.json` maze files.
- Do not hardcode one topic as the only supported path; this app should stay topic-flexible.

## Validation

Run these checks before considering migration or app edits complete:

```bash
npm run validate
npm run serve
```

Then open the local app and verify:

- a sample loads successfully
- the maze renders in Grid, Hexagonal, Snaking Path, and Circular styles
- interactive answer clicks advance the path
- deleting or clearing problems returns to the empty state without crashing
- Print / Save as PDF switches to worksheet mode

