# Math Maze Generator

A static classroom app for building printable or interactive math mazes. It is designed for Algebra I practice, but the problem editor can support any topic that can be entered as math text.

## What It Does

- Loads ready-made Algebra I sample sets.
- Lets teachers add, edit, duplicate, reorder, and delete problems.
- Stores each problem with one correct answer and three distractors.
- Renders the maze in multiple visual styles.
- Supports an interactive mode where students click answer paths.
- Supports a worksheet mode for printing or saving as PDF.
- Exports and imports maze files as JSON.

## Teacher Workflow

1. Open the app.
2. Load a sample or start blank.
3. Edit the title, subtitle, problems, correct answers, and distractors.
4. Choose a maze style.
5. Use `Print / Save as PDF` for paper use, or leave the app in interactive mode for screen use.
6. Use `Export` if you want to reuse or revise the same maze later.

## Project Structure

- `app/index.html` is the complete publishable app.
- `.github/workflows/pages.yml` deploys the `app/` folder to GitHub Pages.
- `AGENTS.md` records the project-specific Codex instructions.

## Local Checks

```bash
npm run validate
npm run serve
```

The app has no build step. The validation script checks the inline JavaScript syntax and sample-data consistency.

