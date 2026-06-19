import type { Note } from "../types/notes";

const NOTES_STORAGE_KEY = "personal-notes";

export const saveNotes = (
    notes: Note[],
) => {
    localStorage.setItem(
        NOTES_STORAGE_KEY,
        JSON.stringify(notes),
    );
};

export const getNotes = (): Note[] => {
    const storedNotes =
        localStorage.getItem(
            NOTES_STORAGE_KEY,
        );

    if (!storedNotes) {
        return [];
    }

    try {
        return JSON.parse(storedNotes);
    } catch {
        return [];
    }
};