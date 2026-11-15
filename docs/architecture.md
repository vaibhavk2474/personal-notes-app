# Architecture and code map

This describes the repository as it exists today. Update it when boundaries or data flow change.

## Runtime

- `frontend/` is a React 19 + TypeScript application built and served by Vite.
- `backend/` is an Express 5 + TypeScript API. Mongoose stores user accounts in MongoDB.
- Material UI supplies components and theming.
- `frontend/src/main.tsx` mounts the app; `frontend/src/app/providers/AppProviders.tsx` composes auth, notification, and theme providers.
- `frontend/src/App.tsx` defines guest-only sign-up/sign-in routes and a session-protected notes route.
- `docker-compose.yml` runs the frontend, API, and local MongoDB for development.

## Source ownership

- `frontend/src/app/`: application composition and top-level providers.
- `frontend/src/features/auth/`: sign-up/sign-in screens, route guards, auth context, and the API client. UI components do not access session storage directly.
- `backend/src/auth/`: account registration, login, session validation, and logout endpoints.
- `backend/src/users/`: MongoDB account schema. The password hash is excluded from ordinary model queries.
- `backend/src/config/`: validated runtime configuration. Secrets are supplied through the ignored `backend/.env` file.
- `frontend/src/features/notes/`: notes dashboard, editor, sidebar, notes state, note type, local persistence, and date formatting.
- `frontend/src/shared/`: reusable layout and general responsive/keyboard hooks.
- `frontend/src/context/`: shared theme mode/sidebar state and notification state.
- `frontend/src/theme/`: palette, typography, shared design tokens, and MUI theme creation. Use MUI semantic palette values (`primary`, `background`, `text`, `divider`) in UI components so palette changes remain centralized.
- `frontend/public/`: static assets.

## Current notes data flow

The frontend calls `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, and `/api/auth/logout` through Vite's `/api` proxy. The API validates input, normalizes email addresses, hashes passwords with Argon2id, and returns only the account ID, name, and email. Login and registration regenerate the session ID to prevent session fixation. A rate limiter applies to registration and login.

Express stores only a user ID and sign-in time in the MongoDB-backed session. The browser receives a signed, HttpOnly, SameSite=Lax cookie, marked Secure in production. The server enforces a 7-day idle timeout and a 30-day absolute timeout. While a signed-in user is active, the frontend checks `/me` at most once every five minutes to keep the idle cookie/store expiry current and notice expired sessions. MongoDB's TTL index removes expired session records. Mutating auth endpoints require the configured same origin; authentication does not use localStorage tokens.

Notes remain in browser localStorage, under a key containing the authenticated account ID. Existing notes under the old `personal-notes` key are moved to the first account that opens the dashboard. This is still browser-local storage; it does not sync notes across devices and is not a substitute for server-side ownership checks. Moving notes to an authenticated API and database is a separate next milestone.

The dashboard calls `useNotes` for selection and CRUD operations. The hook reads and writes notes via `features/notes/data/storage.ts`, which serializes them to `localStorage`. The selected note is passed to the editor; the filtered list and callbacks are passed to the sidebar. Search filtering currently happens in the dashboard and matches titles only.

Keep notes persistence behind the feature's data boundary. When notes move to the server, define an API-backed repository and migrate existing local notes deliberately rather than putting fetch calls into visual components.

## UI and appearance

The MUI theme is assembled in `frontend/src/theme/theme.ts` from `colors.ts`, `typography.ts`, and `tokens.ts`. Components should use semantic theme values. Put app-wide dimensions and reusable design decisions in the theme or token module instead of scattering literal colors, typography, or layout constants. Page composition belongs in feature pages; reusable shell layout belongs in `shared/layouts`.

## Change guidance

- A note behavior change belongs in `features/notes` and should have a clear owner (state/domain logic, data access, or UI).
- Shared behavior should move to `shared/` only after it is genuinely used across features or is clearly app-wide.
- For a new persistence mechanism, first define expected failure/loading behavior, offline expectations, and local-data migration.
- For a visual redesign, preserve note actions and keyboard/accessibility behavior while changing page composition and theme values.
- Avoid broad restructuring and new dependencies without a concrete need.
