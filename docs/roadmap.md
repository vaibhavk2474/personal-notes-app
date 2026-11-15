# Suggested roadmap

This is a proposed sequence, not a promise. Choose work based on user needs and keep each milestone small.

## 1. Keep account access dependable

- Finish exercising registration, login, logout, and server-side session expiry.
- Add password recovery and email verification only when an email-delivery provider is chosen.

## 2. Move notes to the account database

- Build authenticated note CRUD endpoints with ownership checks on every query.
- Connect the existing notes repository to the API.
- Migrate browser notes safely and preserve a way to recover from a failed migration.
- Add focused tests for ownership and data migration.

## 3. Improve everyday usability

- Decide whether search should include note content.
- Add accessible labels, empty states, and keyboard behavior where useful.
- Refine the editor experience based on actual usage.

## 4. Add larger features deliberately

Tags, favorites, trash, rich text, attachments, export, and AI assistance each need a user story, data model decision, privacy review, and a small implementation plan. Do not add them all as one rewrite.
