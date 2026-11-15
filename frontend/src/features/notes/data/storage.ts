import type { Note } from "../types/notes";

const LEGACY_NOTES_STORAGE_KEY = "personal-notes";
const LEGACY_DEMO_SESSION_KEY = "personal-notes-demo-session";
const LEGACY_DEMO_ACCOUNTS_KEY = "personal-notes-demo-accounts";
const getNotesStorageKey = (userId: string) => `${LEGACY_NOTES_STORAGE_KEY}:${userId}`;

const isNote = (value: unknown): value is Note => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const note = value as Record<string, unknown>;
    return typeof note.id === "string"
        && typeof note.title === "string"
        && typeof note.content === "string"
        && typeof note.createdAt === "string"
        && typeof note.updatedAt === "string";
};

export const saveNotes = (
    notes: Note[],
    userId: string,
) => {
    localStorage.setItem(
        getNotesStorageKey(userId),
        JSON.stringify(notes),
    );
};

export const getNotesForUser = (userId: string): Note[] => {
    const storageKey = getNotesStorageKey(userId);
    const storedNotes = localStorage.getItem(storageKey);

    if (storedNotes) {
        return parseNotes(storedNotes) ?? [];
    }

    // Preserve notes from both the original local-only flow and the previous demo-auth flow.
    const legacyDemoUserId = getLegacyDemoUserId();
    const legacyKeys = [
        legacyDemoUserId ? getNotesStorageKey(legacyDemoUserId) : null,
        LEGACY_NOTES_STORAGE_KEY,
    ].filter((key): key is string => key !== null);

    for (const legacyKey of legacyKeys) {
        const legacyNotes = localStorage.getItem(legacyKey);
        if (!legacyNotes) {
            continue;
        }

        const notes = parseNotes(legacyNotes);
        if (!notes) {
            continue;
        }

        localStorage.setItem(storageKey, JSON.stringify(notes));
        localStorage.removeItem(legacyKey);
        localStorage.removeItem(LEGACY_DEMO_SESSION_KEY);
        localStorage.removeItem(LEGACY_DEMO_ACCOUNTS_KEY);
        return notes;
    }

    return [];
};

const getLegacyDemoUserId = (): string | null => {
    try {
        const storedSession = localStorage.getItem(LEGACY_DEMO_SESSION_KEY);
        const parsed: unknown = storedSession ? JSON.parse(storedSession) : null;
        if (!parsed || typeof parsed !== "object") {
            return null;
        }

        const userId = (parsed as Record<string, unknown>).id;
        return typeof userId === "string" ? userId : null;
    } catch {
        return null;
    }
};

const parseNotes = (storedNotes: string): Note[] | null => {
    try {
        const parsed: unknown = JSON.parse(storedNotes);
        return Array.isArray(parsed) && parsed.every(isNote) ? parsed : null;
    } catch {
        return null;
    }
};
