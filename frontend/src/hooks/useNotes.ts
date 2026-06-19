import { useState } from "react";
import type { Note } from "../types/notes";

const INITIAL_NOTES: Note[] = [
    {
        id: "1",
        title: "Getting Started",
        content: "Welcome to PersonalNotes.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "React Learning",
        content: "Learn React and TypeScript.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Docker Notes",
        content: "Docker helps standardize development environments.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

    const [selectedNoteId, setSelectedNoteId] = useState<string>(
        INITIAL_NOTES[0]?.id ?? "",
    );

    const selectedNote =
        notes.find((note) => note.id === selectedNoteId) ?? null;

    return {
        notes,
        setNotes,

        selectedNote,
        selectedNoteId,
        setSelectedNoteId,
    };
};