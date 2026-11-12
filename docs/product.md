# Product context

## Purpose

Personal Notes is a small personal note-taking app. The first useful product is a dependable single-user workflow for creating, finding, editing, and deleting plain-text notes.

## Current user workflow

1. Open the app and see the notes available in this browser.
2. Create a note or select one in the sidebar.
3. Edit its title and plain-text content; changes are saved to browser local storage.
4. Search notes by title and switch the app between light and dark appearance.

## Current scope and constraints

- There are no user accounts, server persistence, sync, sharing, or collaboration.
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
