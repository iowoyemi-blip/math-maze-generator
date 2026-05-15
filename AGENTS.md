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
- Preserve browser-only recent-maze storage; do not require accounts or external databases.
- Keep shared maze links serverless; maze data should remain encoded in the URL unless a future backend is explicitly requested.
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
- Teacher Key mode shows highlighted correct paths and an answer list
- Bulk entry accepts `problem | correct answer | wrong 1 | wrong 2 | wrong 3`
- Recent Mazes can restore, copy, and delete a saved maze
- Share Links generates both a student link and a teacher edit link
- sample categories, search, and sample counts stay in sync with the sample data
- Student links open cleanly with teacher controls hidden, no reset/teacher-view toolbar, and interactive mode active
- deleting or clearing problems returns to the empty state without crashing
- Print / Save as PDF switches to worksheet mode
