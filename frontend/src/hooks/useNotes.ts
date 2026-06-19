import { useEffect, useState } from "react";

import type { Note } from "../types/notes";
import {
    getNotes,
    saveNotes,
} from "../utils/storage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const INITIAL_NOTES: Note[] = [
//     {
//         id: "1",
//         title: "Getting Started",
//         content: "Welcome to PersonalNotes.",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     },
//     {
//         id: "2",
//         title: "React Learning",
//         content: "Learn React and TypeScript.",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     },
//     {
//         id: "3",
//         title: "Docker Notes",
//         content:
//             "Docker helps standardize development environments.",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     },
// ];

export const useNotes = () => {
    const initialNotes = getNotes().length
        ? getNotes()
        : [];

    const [notes, setNotes] =
        useState<Note[]>(initialNotes);

    const [selectedNoteId, setSelectedNoteId] =
        useState<string>(() => {
            return initialNotes[0]?.id ?? "";
        });

    const createNote = () => {
        const newNote: Note = {
            id: crypto.randomUUID(),

            title: "Untitled",

            content: "",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),
        };

        setNotes((prev) => [
            newNote,
            ...prev,
        ]);

        setSelectedNoteId(
            newNote.id,
        );
    };

    const updateNote = (
        id: string,
        data: Partial<Note>,
    ) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        ...data,
                        updatedAt:
                            new Date().toISOString(),
                    }
                    : note,
            ),
        );
    };

    const deleteNote = (id: string) => {
        const filteredNotes =
            notes.filter(
                (note) => note.id !== id,
            );

        setNotes(filteredNotes);

        if (
            selectedNoteId === id
        ) {
            setSelectedNoteId(
                filteredNotes[0]?.id ?? "",
            );
        }
    };

    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

    const selectedNote =
        notes.find(
            (note) =>
                note.id ===
                selectedNoteId,
        ) ?? null;

    return {
        notes,
        setNotes,

        selectedNote,
        selectedNoteId,
        setSelectedNoteId,

        createNote,
        updateNote,
        deleteNote,
    };
};