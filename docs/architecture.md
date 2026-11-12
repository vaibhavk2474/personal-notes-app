# Architecture and code map

This describes the repository as it exists today. Update it when boundaries or data flow change.

## Runtime

- `frontend/` is a React 19 + TypeScript application built and served by Vite.
- Material UI supplies components and theming.
- `frontend/src/main.tsx` mounts the app; `frontend/src/app/providers/AppProviders.tsx` composes notification and theme providers.
- `frontend/src/App.tsx` selects the current notes dashboard.
- The repository has no server application, API, or database.

## Source ownership

- `frontend/src/app/`: application composition and top-level providers.
- `frontend/src/features/notes/`: notes dashboard, editor, sidebar, notes state, note type, local persistence, and date formatting.
- `frontend/src/shared/`: reusable layout and general responsive/keyboard hooks.
- `frontend/src/context/`: shared theme mode/sidebar state and notification state.
- `frontend/src/theme/`: palette, typography, shared design tokens, and MUI theme creation. Use MUI semantic palette values (`primary`, `background`, `text`, `divider`) in UI components so palette changes remain centralized.
- `frontend/public/`: static assets.

## Current notes data flow

The dashboard calls `useNotes` for selection and CRUD operations. The hook reads and writes notes via `features/notes/data/storage.ts`, which serializes them to `localStorage`. The selected note is passed to the editor; the filtered list and callbacks are passed to the sidebar. Search filtering currently happens in the dashboard and matches titles only.

Keep persistence behind the feature's data boundary. If a server is introduced later, define an explicit repository/API boundary and migrate callers deliberately rather than putting fetch calls into visual components. Plan a migration for existing local notes before replacing local storage.

## UI and appearance

The MUI theme is assembled in `frontend/src/theme/theme.ts` from `colors.ts`, `typography.ts`, and `tokens.ts`. Components should use semantic theme values. Put app-wide dimensions and reusable design decisions in the theme or token module instead of scattering literal colors, typography, or layout constants. Page composition belongs in feature pages; reusable shell layout belongs in `shared/layouts`.

## Change guidance

- A note behavior change belongs in `features/notes` and should have a clear owner (state/domain logic, data access, or UI).
- Shared behavior should move to `shared/` only after it is genuinely used across features or is clearly app-wide.
- For a new persistence mechanism, first define expected failure/loading behavior, offline expectations, and local-data migration.
- For a visual redesign, preserve note actions and keyboard/accessibility behavior while changing page composition and theme values.
- Avoid broad restructuring and new dependencies without a concrete need.
