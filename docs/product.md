# Product context

## Purpose

Personal Notes is a small personal note-taking app. The first useful product is a dependable single-user workflow for creating, finding, editing, and deleting plain-text notes.

## Current user workflow

1. Create a local demo account or sign in to one already created in this browser.
2. Open the notes app and see notes stored in this browser.
3. Create a note or select one in the sidebar.
4. Edit its title and plain-text content; changes are saved to browser local storage.
5. Search notes by title, switch between light and dark appearance, or sign out.

## Current scope and constraints

- There are no real user accounts, server persistence, sync, sharing, or collaboration.
- The sign-up/sign-in screens are a UI prototype. They store a demo name/email/session in this browser, discard passwords, and do not verify passwords or provide security.
- Demo notes are separated by local demo account. Notes from the previous browser-only version are assigned to the first demo account that opens the dashboard.
- Notes are plain text; there is no rich-text document model.
- Data belongs to the browser profile that stored it. Clearing browser storage can remove it.
- The interface is responsive and supports light and dark modes.

## Product principles

- Protect users' note contents and avoid losing edits.
- Keep the core workflow fast and understandable.
- Prefer accessible, responsive UI and clear feedback for actions.
- Add complexity only to meet a clear user need; do not build speculative abstractions.

## Future ideas

Authentication, remote persistence, tags, favorites, trash, richer editing, exports, and AI assistance are possible future work. They are not commitments or implemented behavior. Decide their scope and data/privacy expectations before implementation.
