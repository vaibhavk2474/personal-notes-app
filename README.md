# Personal Notes

A personal notes app built with React, TypeScript, Vite, Material UI, Node.js, Express, and MongoDB. Users can create accounts and sign in. Notes are still stored in the current browser; database-backed note syncing is the next milestone.

## Current capabilities

- Sign up, sign in, restore a session after refresh, and sign out.
- Store account records and server sessions in MongoDB.
- Hash passwords with Argon2id; the original password is never stored.
- Request password-reset emails and set a new password using the expiring link; local email is captured by Mailpit during development.
- Keep notes in browser storage, separated by account ID.
- Create, read, edit, delete, and search notes by title.
- Use a responsive layout and light/dark themes.

Password recovery works through a single-use, 30-minute reset link. Development emails are captured by Mailpit. Email verification and remote note sync are not implemented.

## Run the full app locally

Requirements: Docker Desktop with Compose. The API and frontend images install their own Node dependencies.

1. Copy the backend environment template:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

2. Generate a local session secret:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
   ```

   Open `backend/.env` and replace the `SESSION_SECRET` placeholder with that value. Do not commit `backend/.env`; Git ignores it.

3. Start the frontend, API, MongoDB, and Mailpit email catcher:

   ```powershell
   docker compose up --build
   ```

4. Open `http://localhost:5173`, create an account, sign out, and sign back in.
5. To try password recovery, use **Forgot password?** on the sign-in page, then open `http://localhost:8025` to inspect the captured email. Mailpit does not deliver it to a real inbox. The reset link expires after 30 minutes and can be used once.

Stop the services with `docker compose down`. The MongoDB named volume keeps data between runs. `docker compose down -v` deletes that local database.

For frontend-only lint and build commands, run `npm run lint` or `npm run build` from `frontend/`. For backend compilation, run `npm run build` from `backend/`.

## Session behavior

The browser receives an HttpOnly session cookie; the session itself is stored in MongoDB. Sessions expire after 7 days without an API request or after 30 days from sign-in, whichever comes first. Signing out invalidates that session. Resetting a password invalidates older sessions across browsers.

## Repository map

```text
.
├── AGENTS.md
├── backend/
│   ├── src/auth/          # Registration, login, sessions, and password recovery
│   ├── src/email/         # SMTP email delivery
│   ├── src/users/         # MongoDB user model
│   ├── .env.example       # Local backend configuration template
│   └── Dockerfile
├── docs/                  # Product, architecture, roadmap, AI workflow
├── frontend/src/
│   ├── app/               # App composition and providers
│   ├── features/auth/     # Auth screens, API client, context, and route guards
│   ├── features/notes/    # Notes UI, state, and browser persistence
│   ├── shared/            # Reusable layout and hooks
│   └── theme/             # Palette, typography, and design tokens
└── docker-compose.yml     # Frontend, API, MongoDB, and local Mailpit email catcher
```

See [architecture](docs/architecture.md), [product context](docs/product.md), and [AI workflow](docs/ai-workflow.md) before making broad changes.
