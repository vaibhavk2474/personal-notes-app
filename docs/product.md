# Product context

## Purpose

Personal Notes is a small personal note-taking app. The first useful product is a dependable single-user workflow for creating, finding, editing, and deleting plain-text notes.

## Current user workflow

1. Create an account or sign in with an existing account.
2. Open the notes app and see notes stored in this browser.
3. Create a note or select one in the sidebar.
4. Edit its title and plain-text content; changes are saved to browser local storage.
5. Search notes by title, switch between light and dark appearance, or sign out.

## Current scope and constraints

- Account records and sessions are stored in MongoDB. The API verifies passwords and never stores plaintext passwords.
- Notes still live in browser localStorage; they do not sync across devices yet.
- Password recovery is implemented: the forgot-password screen submits a rate-limited request, and existing accounts receive a reset link valid for 30 minutes. Development email is captured by Mailpit. Reset links are single-use, and resetting a password invalidates older sessions across browsers. Email verification and multi-factor authentication are not implemented.
- Notes are separated in local storage by account ID. Notes from the previous browser-only version are assigned to the first account that opens the dashboard.
- Notes are plain text; there is no rich-text document model.
- Data belongs to the browser profile that stored it. Clearing browser storage can remove it.
- The interface is responsive and supports light and dark modes.

## Product principles

- Protect users' note contents and avoid losing edits.
- Keep the core workflow fast and understandable.
- Prefer accessible, responsive UI and clear feedback for actions.
- Add complexity only to meet a clear user need; do not build speculative abstractions.

## Future ideas

Remote note persistence, email verification, tags, favorites, trash, richer editing, exports, and AI assistance are possible future work. They are not commitments or implemented behavior. Decide their scope and data/privacy expectations before implementation.
