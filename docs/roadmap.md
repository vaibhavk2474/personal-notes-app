# Suggested roadmap

This is a proposed sequence, not a promise. Choose work based on user needs and keep each milestone small.

## 1. Account access and password recovery

- Implemented: registration, sign-in, sign-out, session restore/expiry, and password recovery.
- Local reset email is captured by Mailpit; production SMTP settings are configurable, but a production email provider still needs to be chosen and configured before deployment.
- Email verification remains a separate future feature.

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
