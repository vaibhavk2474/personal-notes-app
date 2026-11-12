# Suggested roadmap

This is a proposed sequence, not a promise. Choose work based on user needs and keep each milestone small.

## 1. Stabilize the current browser-only workflow

- Correct feedback messages and action edge cases.
- Define behavior for empty titles, deleting the selected note, and searching.
- Handle storage read/write failures clearly and avoid losing edits.
- Add focused tests for important note rules and regressions.

## 2. Improve everyday usability

- Decide whether search should include note content.
- Add accessible labels, empty states, and keyboard behavior where useful.
- Refine the editor experience based on actual usage.

## 3. Decide whether remote accounts are needed

Only if cross-device access or multiple users are a real requirement, design authentication, API, database, privacy, backups, and migration from local storage before implementation.

## 4. Add larger features deliberately

Tags, favorites, trash, rich text, attachments, export, and AI assistance each need a user story, data model decision, privacy review, and a small implementation plan. Do not add them all as one rewrite.
