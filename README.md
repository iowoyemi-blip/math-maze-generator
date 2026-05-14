# Math Maze Generator

A static classroom app for building printable or interactive math mazes. It is designed for Algebra I practice, but the problem editor can support any topic that can be entered as math text.

## What It Does

- Loads ready-made Algebra I sample sets.
- Lets teachers add, edit, duplicate, reorder, and delete problems.
- Stores each problem with one correct answer and three distractors.
- Renders the maze in multiple visual styles.
- Supports an interactive mode where students click answer paths.
- Supports a worksheet mode for printing or saving as PDF.
- Supports a teacher key mode with the solved path and a printable answer list.
- Supports bulk problem entry with pipe-separated rows.
- Auto-saves recent mazes in the teacher's browser for restore, copy, or delete.
- Exports and imports maze files as JSON.

## Teacher Workflow

1. Open the app.
2. Load a sample or start blank.
3. Edit the title, subtitle, problems, correct answers, and distractors.
4. Choose a maze style.
5. Use `Bulk` to paste many rows at once when building from a typed list.
6. Use `Teacher Key` when you need a solved path and answer list.
7. Use `Print / Save as PDF` for paper use, or leave the app in interactive mode for screen use.
8. Use `Export` if you want a portable backup file. Recent mazes are also saved automatically in the browser.

## Bulk Entry Format

Paste one problem per line:

```text
problem | correct answer | wrong 1 | wrong 2 | wrong 3
```

Example:

```text
2x + 5 = 11 | x = 3 | x = 8 | x = -3 | x = 6
x^2 + 8x + 12 | (x+6)(x+2) | (x+3)(x+4) | (x+8)(x+1) | (x-6)(x-2)
```

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
