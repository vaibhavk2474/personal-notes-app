# Personal Notes

A personal notes app built with React, TypeScript, Vite, and Material UI. The current version is a browser-only prototype: notes are saved in the browser's local storage. There is no backend or account system yet.

## Current capabilities

- Create, edit, select, search by title, and delete notes.
- Save notes locally in the current browser.
- Switch between light and dark themes.
- Use a responsive sidebar, including a drawer on mobile.
- Show in-app notifications and support keyboard shortcuts.
- Sign up, sign in, and sign out through a local demo flow (not real authentication).

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
cd frontend
npm install
npm run dev
```

The development server prints its local URL. Other available commands are `npm run lint`, `npm run build`, and `npm run preview` (from `frontend/`). Docker Compose can start the frontend with `docker compose up` from the repository root after dependencies are available in the mounted `frontend` directory.

## Repository map

```text
.
├── AGENTS.md                    # Shared instructions for AI coding tools
├── CLAUDE.md                    # Claude Code entry point; points to AGENTS.md
├── docs/
│   ├── architecture.md          # Current structure and boundaries
│   ├── ai-workflow.md            # Prompt and handoff patterns for AI-assisted work
│   ├── product.md               # Product intent and current scope
│   ├── roadmap.md               # Proposed next milestones
│   └── decisions/               # Important choices and their reasons
├── frontend/
│   └── src/
│       ├── app/                 # App entry and top-level providers
│       ├── context/             # Shared theme and notification state
│       ├── features/notes/      # Notes screens, UI, state, types, persistence
│       ├── shared/              # Reusable layout and browser hooks
│       └── theme/               # Central MUI palette, typography, tokens, and theme
└── docker-compose.yml
```

The sign-in UI is a frontend prototype: demo account names/emails and sessions live in this browser, passwords are discarded, and passwords are not verified. Do not use it to protect real data. See [the architecture guide](docs/architecture.md) for boundaries and [the AI instructions](AGENTS.md) before making code changes.

## Product direction

The near-term goal is to make the single-user notes workflow dependable and easy to evolve. Authentication, a server API, database storage, rich text, and collaboration are ideas for later milestones, not current features. Keep future changes small and make product decisions explicit in the issue or task being implemented.
