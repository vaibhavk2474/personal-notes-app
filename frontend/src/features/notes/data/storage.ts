import type { Note } from "../types/notes";

const LEGACY_NOTES_STORAGE_KEY = "personal-notes";
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

    // Assign existing browser-only notes to the first demo account that opens them.
    const legacyNotes = localStorage.getItem(LEGACY_NOTES_STORAGE_KEY);
    if (!legacyNotes) {
        return [];
    }

    const notes = parseNotes(legacyNotes);
    if (!notes) {
        return [];
    }

    localStorage.setItem(storageKey, JSON.stringify(notes));
    localStorage.removeItem(LEGACY_NOTES_STORAGE_KEY);
    return notes;
};

const parseNotes = (storedNotes: string): Note[] | null => {
    try {
        const parsed: unknown = JSON.parse(storedNotes);
        return Array.isArray(parsed) && parsed.every(isNote) ? parsed : null;
    } catch {
        return null;
    }
};
