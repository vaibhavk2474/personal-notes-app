# Instructions for AI coding tools

Read this file and `docs/architecture.md` before changing code. Read `docs/product.md` when a task changes user-facing behavior. Use `docs/ai-workflow.md` for task and handoff templates. Treat the source code as the truth for implemented behavior; README and roadmap describe the intended direction and may lag behind code.

## Working approach

- Inspect the relevant files and their callers before editing. Do not scan or rewrite unrelated parts of the repository.
- For unclear or broad requests, first summarize the current behavior and propose a small implementation plan. Do not make product decisions that change note behavior without stating the assumption.
- Prefer the smallest complete change. Preserve existing behavior outside the requested scope.
- Keep UI rendering in components, note rules and orchestration in the notes feature, and browser persistence behind the notes data module. Do not add a backend, database, authentication, or dependencies unless the task asks for them.
- Put reusable app-wide code in `frontend/src/shared`; keep note-specific code in `frontend/src/features/notes`.
- Use the MUI theme for colors and typography. Avoid adding new hard-coded palette values or global styles when a theme value or component style is appropriate.
- Keep TypeScript types explicit at feature boundaries. Do not use `any` to bypass a type problem.
- Do not store secrets, credentials, or real personal note contents in source, docs, prompts, or commits.
- Update docs when a change alters architecture, setup, product behavior, or a durable decision. Do not record routine code edits in docs.

## Before finishing

- Review the diff for unrelated changes and accidental file moves.
- For frontend source changes, run `npm run lint` and `npm run build` from `frontend/` when the environment supports it; report commands that could not be run. Do not claim checks passed unless they were run.
- Summarize behavior changes, files or areas touched, checks run, and known limitations.

## Project-specific facts

- This repository currently has a Vite React frontend only. There is no `backend/` directory, API, database, authentication, or cloud sync.
- Notes currently persist in browser `localStorage` and are not shared between browsers or devices.
- The app currently searches note titles, not note bodies.
- See `docs/architecture.md` for the current source map and boundaries.
