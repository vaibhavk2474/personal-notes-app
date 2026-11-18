# Architecture and code map

This describes the repository as it exists today. Update it when boundaries or data flow change.

## Runtime

- `frontend/` is a React 19 + TypeScript application built and served by Vite.
- `backend/` is an Express 5 + TypeScript API. Mongoose stores accounts and reset tokens in MongoDB; `connect-mongo` stores server sessions there.
- Material UI supplies components and theming.
- `frontend/src/main.tsx` mounts the app; `frontend/src/app/providers/AppProviders.tsx` composes auth, notification, and theme providers.
- `frontend/src/App.tsx` defines guest-only sign-up/sign-in/forgot-password routes, a public reset-password route, and a session-protected notes route.
- `docker-compose.yml` runs the frontend, API, MongoDB, and Mailpit for local development.

## Source ownership

- `frontend/src/app/`: application composition and top-level providers.
- `frontend/src/features/auth/`: sign-up, sign-in, forgot-password, and reset-password screens; route guards; auth context; and the API client. UI components do not access session storage directly.
- `backend/src/modules/auth/`: the authentication feature, organized by responsibility. `auth.routes.ts` maps endpoints and rate limits, `auth.controller.ts` handles HTTP input/output and sessions, `auth.service.ts` holds authentication and password-reset rules, and `auth.repository.ts` owns persistence queries. Feature models live in `models/`; the reset-email SMTP adapter lives in `email/`. Reset tokens are random, stored as hashes, expire after 30 minutes, and are consumed once.
- `backend/src/config/` and `backend/src/db/`: shared runtime configuration and database connection setup. `backend/src/types/` contains Express session type extensions.
- Secrets are supplied through the ignored `backend/.env` file.
- `frontend/src/features/notes/`: notes dashboard, editor, sidebar, notes state, note type, local persistence, and date formatting.
- `frontend/src/shared/`: reusable layout and general responsive/keyboard hooks.
- `frontend/src/context/`: shared theme mode/sidebar state and notification state.
- `frontend/src/theme/`: palette, typography, shared design tokens, and MUI theme creation. Use MUI semantic palette values (`primary`, `background`, `text`, `divider`) in UI components so palette changes remain centralized.
- `frontend/public/`: static assets.

## Authentication and account-recovery flow

The frontend calls `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`, `/api/auth/forgot-password`, and `/api/auth/reset-password` through Vite's `/api` proxy. The API validates input, normalizes email addresses, hashes passwords with Argon2id, and returns only the account ID, name, and email. Login and registration regenerate the session ID to prevent session fixation. Rate limits apply to registration, login, and both password-reset endpoints.

Express stores a user ID, sign-in time, and session version in the MongoDB-backed session. The browser receives a signed, HttpOnly, SameSite=Lax cookie, marked Secure in production. The server enforces a 7-day idle timeout and a 30-day absolute timeout. Protected requests compare the session version with the user's current version; resetting a password increments that version, rejecting all older sessions. While a signed-in user is active, the frontend checks `/me` at most once every five minutes to keep the idle cookie/store expiry current and notice expired sessions. MongoDB's TTL index removes expired session records. Mutating auth endpoints require the configured same origin; authentication does not use localStorage tokens.

Password-reset requests use a random 256-bit token stored only as a SHA-256 hash with a 30-minute expiry. The request endpoint returns the same response whether the email belongs to an account or not. Development reset emails are captured by Mailpit at `http://localhost:8025`. The reset-password endpoint checks expiry and atomically consumes a token before changing the Argon2id password hash. Reset tokens are single-use, and other outstanding reset tokens for that account are removed after a successful reset. Production mail uses SMTP environment variables and requires TLS when using STARTTLS.

## Current notes data flow

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
